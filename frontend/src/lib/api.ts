import axios from "axios";

const API_URL = typeof window !== "undefined" 
  ? "/api" 
  : process.env.NEXT_PUBLIC_API_URL || "/api";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: any) => (await api.post("/auth/login", data)).data;
export const getMe = async () => (await api.get("/auth/me")).data;
export const getPricingPlans = async () => (await api.get("/pricing")).data;
export const getPricingPlanById = async (id: string) => (await api.get(`/pricing/${id}`)).data;
export const createPricingPlan = async (data: any) => (await api.post("/pricing", data)).data;
export const updatePricingPlan = async (id: string, data: any) => (await api.put(`/pricing/${id}`, data)).data;
export const deletePricingPlan = async (id: string) => (await api.delete(`/pricing/${id}`)).data;
export const getPublicBlogPosts = async () => (await api.get("/blog/public")).data;
export const getPublicBlogPostBySlug = async (slug: string) => (await api.get(`/blog/public/${slug}`)).data;
export const getAdminBlogPosts = async () => (await api.get("/blog")).data;
export const getAdminBlogPostById = async (id: string) => (await api.get(`/blog/${id}`)).data;
export const createBlogPost = async (data: any) => (await api.post("/blog", data)).data;
export const updateBlogPost = async (id: string, data: any) => (await api.put(`/blog/${id}`, data)).data;
export const deleteBlogPost = async (id: string) => (await api.delete(`/blog/${id}`)).data;
