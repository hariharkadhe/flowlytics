import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import PricingPlan from '../models/PricingPlan';
import BlogPost from '../models/BlogPost';
import connectDB from '../config/db';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear DB
    await User.deleteMany();
    await PricingPlan.deleteMany();
    await BlogPost.deleteMany();

    // Create Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@12345', salt);
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    });

    // Create Pricing Plans
    await PricingPlan.insertMany([
      {
        name: 'Starter',
        price: 9,
        currency: 'USD',
        billingCycle: 'monthly',
        features: ['5 projects', 'Basic analytics', 'Email reports'],
        highlighted: false,
      },
      {
        name: 'Pro',
        price: 29,
        currency: 'USD',
        billingCycle: 'monthly',
        features: ['Unlimited projects', 'Advanced analytics', 'Team reports'],
        highlighted: true,
      },
      {
        name: 'Business',
        price: 99,
        currency: 'USD',
        billingCycle: 'monthly',
        features: ['Everything in Pro', 'Custom integrations', '24/7 Support'],
        highlighted: false,
      },
    ]);

    // Create Blog Posts
    await BlogPost.insertMany([
      {
        title: 'How Remote Teams Improve Productivity',
        slug: 'how-remote-teams-improve-productivity',
        excerpt: 'Discover the secrets to keeping remote teams engaged and highly productive.',
        content: '<h2>The Rise of Remote Work</h2><p>Remote work is here to stay...</p>',
        author: 'Sarah Jenkins',
        status: 'published',
        publishedAt: new Date(),
        featured: true,
      },
      {
        title: 'Understanding Workload vs. Effort',
        slug: 'understanding-workload-vs-effort',
        excerpt: 'Learn why measuring effort is more important than tracking hours.',
        content: '<h2>Workload Management</h2><p>Managing workload is key to preventing burnout...</p>',
        author: 'David Smith',
        status: 'published',
        publishedAt: new Date(),
        featured: false,
      },
      {
        title: '5 Metrics Every Engineering Team Needs',
        slug: '5-metrics-engineering-teams',
        excerpt: 'The top 5 metrics that high-performing engineering teams track.',
        content: '<h2>Key Metrics</h2><ul><li>Cycle Time</li><li>Deployment Frequency</li></ul>',
        author: 'Alex Chen',
        status: 'published',
        publishedAt: new Date(),
        featured: false,
      },
      {
        title: 'The Future of Async Communication',
        slug: 'future-of-async-communication',
        excerpt: 'Why async is the future of deep work and team productivity.',
        content: '<h2>Async Work</h2><p>Async communication allows for deep, uninterrupted work...</p>',
        author: 'Maria Garcia',
        status: 'published',
        publishedAt: new Date(),
        featured: false,
      },
      {
        title: 'Top 10 Productivity Tools in 2026',
        slug: 'top-10-productivity-tools-2026',
        excerpt: 'A comprehensive review of the best tools to improve your workflow.',
        content: '<h2>Top Tools</h2><p>These tools will help you achieve more in less time...</p>',
        author: 'John Doe',
        status: 'draft',
        featured: false,
      },
    ]);

    console.log('Data Seeded Successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
