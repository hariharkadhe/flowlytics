import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';

// Public endpoints
export const getBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await BlogPost.find({ status: 'published' }).sort({ featured: -1, publishedAt: -1, createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getBlogPostBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, status: 'published' });
    if (post) {
      res.json({ success: true, data: post });
    } else {
      res.status(404).json({ success: false, message: 'Blog post not found' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin endpoints
export const getAdminBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAdminBlogPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post) {
      res.json({ success: true, data: post });
    } else {
      res.status(404).json({ success: false, message: 'Blog post not found' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body.status === 'published' && !req.body.publishedAt) {
      req.body.publishedAt = new Date();
    }
    const post = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: 'Slug already exists' });
      return;
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body.status === 'published' && !req.body.publishedAt) {
      req.body.publishedAt = new Date();
    }
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (post) {
      res.json({ success: true, data: post });
    } else {
      res.status(404).json({ success: false, message: 'Blog post not found' });
    }
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: 'Slug already exists' });
      return;
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (post) {
      res.json({ success: true, message: 'Blog post removed' });
    } else {
      res.status(404).json({ success: false, message: 'Blog post not found' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
