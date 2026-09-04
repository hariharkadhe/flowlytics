import express from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  getAdminBlogPosts,
  getAdminBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogController';
import { protect, requireRole } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';
import { writeLimiter } from '../middleware/rateLimiter';
import { createBlogSchema, updateBlogSchema } from '../schemas/blogSchemas';

const router = express.Router();

// Public routes
router.get('/public', getBlogPosts);
router.get('/public/:slug', getBlogPostBySlug);

// Admin routes
router.route('/')
  .get(protect, requireRole('ADMIN'), getAdminBlogPosts)
  .post(protect, requireRole('ADMIN'), writeLimiter, validate(createBlogSchema), createBlogPost);

router.route('/:id')
  .get(protect, requireRole('ADMIN'), getAdminBlogPostById)
  .put(protect, requireRole('ADMIN'), writeLimiter, validate(updateBlogSchema), updateBlogPost)
  .delete(protect, requireRole('ADMIN'), writeLimiter, deleteBlogPost);

export default router;
