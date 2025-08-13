import { Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';
import { sendOTPEmail, sendOrderStatusEmail } from '../utils/email';

// Create new order
export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { items, shippingAddress, paymentMethod, paymentDetails } = req.body;
    const userId = req.user?._id;

    // Validate and calculate total
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`
        });
      }

      if (!product.inStock || product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${product.name}`
        });
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create order
    const order = await Order.create({
      userId,
      items: orderItems,
      total,
      shippingAddress,
      paymentMethod,
      paymentDetails,
      otp,
      otpExpires,
      trackingInfo: [{
        status: 'Order Placed',
        location: 'Processing Center',
        timestamp: new Date(),
        description: 'Your order has been received and is being processed'
      }]
    });

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }

    // Send OTP email
    try {
      await sendOTPEmail(req.user?.email || '', otp, order._id.toString());
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully. OTP sent to your email.',
      order: {
        id: order._id,
        total: order.total,
        status: order.status,
        trackingInfo: order.trackingInfo
      }
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order'
    });
  }
};

// Verify OTP
export const verifyOTP = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId, otp } = req.body;
    const userId = req.user?._id;

    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.otpVerified) {
      return res.status(400).json({
        success: false,
        message: 'Order already verified'
      });
    }

    if (!order.otp || order.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    if (order.otpExpires && order.otpExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired'
      });
    }

    // Update order
    order.otpVerified = true;
    order.status = 'confirmed';
    order.trackingInfo.push({
      status: 'Order Confirmed',
      location: 'Processing Center',
      timestamp: new Date(),
      description: 'Your order has been confirmed and is being prepared for shipment'
    });

    await order.save();

    // Send confirmation email
    try {
      await sendOrderStatusEmail(
        req.user?.email || '',
        order._id.toString(),
        'confirmed',
        order.trackingInfo[order.trackingInfo.length - 1]
      );
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    res.json({
      success: true,
      message: 'Order verified successfully',
      order: {
        id: order._id,
        status: order.status,
        trackingInfo: order.trackingInfo
      }
    });
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to verify OTP'
    });
  }
};

// Get user orders
export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('items.product', 'name images price category');

    const total = await Order.countDocuments({ userId });

    res.json({
      success: true,
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get orders'
    });
  }
};

// Get order by ID
export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    const userId = req.user?._id;

    const order = await Order.findOne({ _id: orderId, userId })
      .populate('items.product', 'name images price category');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error: any) {
    console.error('Get order by ID error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get order'
    });
  }
};

// Cancel order
export const cancelOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;
    const userId = req.user?._id;

    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled'
      });
    }

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.quantity } },
        { new: true }
      );
    }

    // Update order
    order.status = 'cancelled';
    order.cancellationReason = reason;
    order.trackingInfo.push({
      status: 'Order Cancelled',
      location: 'System',
      timestamp: new Date(),
      description: reason || 'Order cancelled by user'
    });

    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      order: {
        id: order._id,
        status: order.status,
        trackingInfo: order.trackingInfo
      }
    });
  } catch (error: any) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to cancel order'
    });
  }
};

// Admin: Get all orders
export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('items.product', 'name images price category')
      .populate('userId', 'name email phone');

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get orders'
    });
  }
};

// Admin: Update order status
export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status, location, description } = req.body;

    const order = await Order.findById(orderId).populate('userId', 'email name');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order status and tracking
    order.status = status;
    order.trackingInfo.push({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      location: location || 'Processing Center',
      timestamp: new Date(),
      description: description || `Order status updated to ${status}`
    });

    if (status === 'delivered') {
      order.actualDelivery = new Date();
    }

    await order.save();

    // Send status update email
    try {
      const userEmail = (order.userId as any)?.email;
      if (userEmail) {
        await sendOrderStatusEmail(
          userEmail,
          order._id.toString(),
          status,
          order.trackingInfo[order.trackingInfo.length - 1]
        );
      }
    } catch (emailError) {
      console.error('Failed to send status update email:', emailError);
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: {
        id: order._id,
        status: order.status,
        trackingInfo: order.trackingInfo
      }
    });
  } catch (error: any) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update order status'
    });
  }
};