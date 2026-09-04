import mongoose, { Document, Schema } from 'mongoose';

export interface IPricingPlan extends Document {
  name: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'one-time';
  features: string[];
  highlighted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const pricingPlanSchema = new Schema<IPricingPlan>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
    billingCycle: { type: String, required: true },
    features: [{ type: String }],
    highlighted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IPricingPlan>('PricingPlan', pricingPlanSchema);
