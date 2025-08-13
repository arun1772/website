import express from 'express';
import {
  getProducts,
  getProductById,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  searchProducts
} from '../controllers/productController';
import { protect, authorize, optionalAuth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getProducts);
router.get('/search', optionalAuth, searchProducts);
router.get('/categories', getCategories);
router.get('/:productId', optionalAuth, getProductById);

// Admin routes
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:productId', protect, authorize('admin'), updateProduct);
router.delete('/:productId', protect, authorize('admin'), deleteProduct);
router.patch('/:productId/stock', protect, authorize('admin'), updateStock);

export default router;