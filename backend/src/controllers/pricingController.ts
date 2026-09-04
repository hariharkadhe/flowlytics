import { Request, Response } from 'express';
import PricingPlan from '../models/PricingPlan';

export const getPricingPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const plans = await PricingPlan.find({}).sort({ price: 1 });
    res.json({ success: true, data: plans });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getPricingPlanById = async (req: Request, res: Response): Promise<void> => {
  try {
    const plan = await PricingPlan.findById(req.params.id);
    if (plan) {
      res.json({ success: true, data: plan });
    } else {
      res.status(404).json({ success: false, message: 'Pricing plan not found' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createPricingPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const plan = await PricingPlan.create(req.body);
    res.status(201).json({ success: true, data: plan });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updatePricingPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const plan = await PricingPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (plan) {
      res.json({ success: true, data: plan });
    } else {
      res.status(404).json({ success: false, message: 'Pricing plan not found' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deletePricingPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const plan = await PricingPlan.findByIdAndDelete(req.params.id);
    if (plan) {
      res.json({ success: true, message: 'Pricing plan removed' });
    } else {
      res.status(404).json({ success: false, message: 'Pricing plan not found' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
