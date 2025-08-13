import { Response } from 'express';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';

// Get all products with filtering and pagination
export const getProducts = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    
    if (req.query.category) {
      filter.category = new RegExp(req.query.category as string, 'i');
    }
    
    if (req.query.search) {
      filter.$text = { $search: req.query.search as string };
    }
    
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice as string);
      if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice as string);
    }
    
    if (req.query.inStock === 'true') {
      filter.inStock = true;
      filter.stock = { $gt: 0 };
    }
    
    if (req.query.featured === 'true') {
      filter.isFeatured = true;
    }
    
    if (req.query.new === 'true') {
      filter.isNew = true;
    }

    // Build sort object
    let sort: any = { createdAt: -1 };
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price_asc':
          sort = { price: 1 };
          break;
        case 'price_desc':
          sort = { price: -1 };
          break;
        case 'rating':
          sort = { rating: -1 };
          break;
        case 'newest':
          sort = { createdAt: -1 };
          break;
        case 'name':
          sort = { name: 1 };
          break;
      }
    }

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-seo'); // Exclude SEO data from public API

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get products'
    });
  }
};

// Get product by ID
export const getProductById = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error: any) {
    console.error('Get product by ID error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get product'
    });
  }
};

// Get categories
export const getCategories = async (req: AuthRequest, res: Response) => {
  try {
    const categories = await Product.distinct('category');
    
    res.json({
      success: true,
      categories
    });
  } catch (error: any) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get categories'
    });
  }
};

// Admin: Create product
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const productData = req.body;
    
    const product = await Product.create(productData);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error: any) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create product'
    });
  }
};

// Admin: Update product
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    
    const product = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error: any) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update product'
    });
  }
};

// Admin: Delete product
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete product'
    });
  }
};

// Admin: Update stock
export const updateStock = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const { stock } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      productId,
      { 
        stock,
        inStock: stock > 0
      },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Stock updated successfully',
      product: {
        id: product._id,
        name: product.name,
        stock: product.stock,
        inStock: product.inStock
      }
    });
  } catch (error: any) {
    console.error('Update stock error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update stock'
    });
  }
};

// Search products
export const searchProducts = async (req: AuthRequest, res: Response) => {
  try {
    const { q } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const searchRegex = new RegExp(q as string, 'i');
    const filter = {
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { tags: { $in: [searchRegex] } },
        { features: { $in: [searchRegex] } }
      ]
    };
    
    const products = await Product.find(filter)
      .sort({ rating: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-seo');
    
    const total = await Product.countDocuments(filter);
    
    res.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      query: q
    });
  } catch (error: any) {
    console.error('Search products error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to search products'
    });
  }
};