import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth APIs
export const login = async (data: any) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Pricing APIs
export const getPricingPlans = async () => {
  const response = await api.get('/pricing');
  return response.data;
};

export const getPricingPlanById = async (id: string) => {
  const response = await api.get(`/pricing/${id}`);
  return response.data;
};

export const createPricingPlan = async (data: any) => {
  const response = await api.post('/pricing', data);
  return response.data;
};

export const updatePricingPlan = async (id: string, data: any) => {
  const response = await api.put(`/pricing/${id}`, data);
  return response.data;
};

export const deletePricingPlan = async (id: string) => {
  const response = await api.delete(`/pricing/${id}`);
  return response.data;
};

// Blog APIs
export const getPublicBlogPosts = async () => {
  const response = await api.get('/blog/public');
  return response.data;
};

export const getPublicBlogPostBySlug = async (slug: string) => {
  const response = await api.get(`/blog/public/${slug}`);
  return response.data;
};

export const getAdminBlogPosts = async () => {
  const response = await api.get('/blog');
  return response.data;
};

export const getAdminBlogPostById = async (id: string) => {
  const response = await api.get(`/blog/${id}`);
  return response.data;
};

export const createBlogPost = async (data: any) => {
  const response = await api.post('/blog', data);
  return response.data;
};

export const updateBlogPost = async (id: string, data: any) => {
  const response = await api.put(`/blog/${id}`, data);
  return response.data;
};

export const deleteBlogPost = async (id: string) => {
  const response = await api.delete(`/blog/${id}`);
  return response.data;
};
