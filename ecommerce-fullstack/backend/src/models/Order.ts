import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface ITrackingInfo {
  status: string;
  location: string;
  timestamp: Date;
  description?: string;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'online' | 'cod';
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentDetails?: {
    method: 'gpay' | 'phonepe' | 'paytm' | 'upi' | 'card';
    transactionId?: string;
  };
  otp?: string;
  otpVerified: boolean;
  otpExpires?: Date;
  trackingInfo: ITrackingInfo[];
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  cancellationReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  }
});

const trackingInfoSchema = new Schema<ITrackingInfo>({
  status: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  description: String
});

const orderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    required: true,
    min: [0, 'Total cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    name: {
      type: String,
      required: [true, 'Shipping name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Please enter a valid phone number']
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^[1-9][0-9]{5}$/, 'Please enter a valid pincode']
    }
  },
  paymentMethod: {
    type: String,
    enum: ['online', 'cod'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentDetails: {
    method: {
      type: String,
      enum: ['gpay', 'phonepe', 'paytm', 'upi', 'card']
    },
    transactionId: String
  },
  otp: String,
  otpVerified: {
    type: Boolean,
    default: false
  },
  otpExpires: Date,
  trackingInfo: [trackingInfoSchema],
  estimatedDelivery: Date,
  actualDelivery: Date,
  cancellationReason: String,
  notes: String
}, {
  timestamps: true
});

// Indexes for better performance
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'shippingAddress.pincode': 1 });

// Auto-populate product details
orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'items.product',
    select: 'name price images category'
  }).populate({
    path: 'userId',
    select: 'name email phone'
  });
  next();
});

export default mongoose.model<IOrder>('Order', orderSchema);