import express from 'express';
import {
  createOrder,
  verifyOTP,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// User routes
router.post('/', protect, createOrder);
router.post('/verify-otp', protect, verifyOTP);
router.get('/my-orders', protect, getUserOrders);
router.get('/:orderId', protect, getOrderById);
router.patch('/:orderId/cancel', protect, cancelOrder);

// Admin routes
router.get('/', protect, authorize('admin'), getAllOrders);
router.patch('/:orderId/status', protect, authorize('admin'), updateOrderStatus);

export default router;