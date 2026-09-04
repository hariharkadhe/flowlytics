import express from 'express';
import {
  getPricingPlans,
  getPricingPlanById,
  createPricingPlan,
  updatePricingPlan,
  deletePricingPlan,
} from '../controllers/pricingController';
import { protect, requireRole } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';
import { writeLimiter } from '../middleware/rateLimiter';
import { createPricingSchema, updatePricingSchema } from '../schemas/pricingSchemas';

const router = express.Router();

router.route('/')
  .get(getPricingPlans)
  .post(protect, requireRole('ADMIN'), writeLimiter, validate(createPricingSchema), createPricingPlan);

router.route('/:id')
  .get(getPricingPlanById)
  .put(protect, requireRole('ADMIN'), writeLimiter, validate(updatePricingSchema), updatePricingPlan)
  .delete(protect, requireRole('ADMIN'), writeLimiter, deletePricingPlan);

export default router;
