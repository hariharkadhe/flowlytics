import mongoose, { Schema } from "mongoose";

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  featured: { type: Boolean, default: false },
  publishedAt: { type: Date },
}, { timestamps: true });

export const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
