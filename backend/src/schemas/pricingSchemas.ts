import { z } from 'zod';

export const createPricingSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    price: z.number({ required_error: 'Price is required' }).min(0, 'Price must be non-negative'),
    currency: z.string().default('USD'),
    billingCycle: z.enum(['monthly', 'yearly', 'one-time'], { required_error: 'Billing cycle is required' }),
    features: z.array(z.string().min(1, 'Feature string must not be empty')).default([]),
    highlighted: z.boolean().default(false),
  }),
});

export const updatePricingSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().min(0).optional(),
    currency: z.string().optional(),
    billingCycle: z.enum(['monthly', 'yearly', 'one-time']).optional(),
    features: z.array(z.string().min(1)).optional(),
    highlighted: z.boolean().optional(),
  }),
});
