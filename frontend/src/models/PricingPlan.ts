import mongoose, { Schema } from "mongoose";

const PricingPlanSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  billingCycle: { type: String, default: "monthly" },
  features: [{ type: String }],
  highlighted: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const PricingPlan = mongoose.models.PricingPlan || mongoose.model("PricingPlan", PricingPlanSchema);
