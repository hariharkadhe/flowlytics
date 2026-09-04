# Flowlytics

> A full-stack SaaS productivity and team analytics platform for remote and hybrid teams — built with Next.js, Express, MongoDB, and TypeScript.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Express](https://img.shields.io/badge/Express-4-green?logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![JWT](https://img.shields.io/badge/JWT-Auth-orange?logo=jsonwebtokens)
![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

**Live Demo:** [flowmetrics-harihar.vercel.app](https://flowmetrics-harihar.vercel.app)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [Application Workflow](#application-workflow)
- [System Architecture](#system-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Authentication and Authorization](#authentication-and-authorization)
- [Database Architecture](#database-architecture)
- [Dynamic Pricing Workflow](#dynamic-pricing-workflow)
- [Blog Workflow](#blog-workflow)
- [API Documentation](#api-documentation)
- [Validation and Rate Limiting](#validation-and-rate-limiting)
- [Security](#security)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Testing Checklist](#testing-checklist)
- [Future Scope](#future-scope)
- [Interview Summary](#interview-summary)

---

## Project Overview

**Flowlytics** is a full-stack SaaS platform designed to help remote and hybrid engineering teams understand their productivity, workload distribution, and project progress. The platform provides a modern public-facing marketing website with dynamic pricing and blog content, backed by a secure admin dashboard for content management.

The project demonstrates a complete production-grade architecture: a **Next.js** frontend communicating with an **Express.js** REST API backend, both connected to a **MongoDB Atlas** cloud database. Authentication is handled through **JWT tokens**, with role-based authorization separating visitor, user, and admin access levels.

The application also deploys as a unified Next.js application on **Vercel**, with the backend logic mirrored as Next.js API Routes — demonstrating knowledge of both traditional REST servers and modern serverless architectures.

---

## Problem Statement

Remote and hybrid teams face critical challenges:

- **Difficulty tracking workload** — Managers cannot easily see who is overloaded and who has capacity.
- **Lack of visibility into productivity** — Without office presence, teams need data to understand output and effort.
- **Difficulty monitoring project progress** — Distributed work makes it hard to track milestones and blockers.
- **Difficulty making data-driven decisions** — Without analytics, decisions are based on gut feeling rather than evidence.

**Flowlytics addresses these problems** by providing a centralized analytics platform where teams can measure what truly matters — impact, cycle time, and workload balance — rather than counting hours or lines of code.

---

## Key Features

### Public Website
- Modern responsive landing page with hero, testimonials, and CTA sections
- **Dynamic pricing cards** pulled live from MongoDB (not hardcoded)
- Interactive plan selection with custom checkout modal
- Public blog with article listing and full detail pages
- Responsive design for mobile, tablet, and desktop
- SEO-optimized with proper meta tags and semantic HTML

### Admin Dashboard
- Secure JWT-based admin login
- **Pricing management** — Full CRUD (Create, Read, Update, Delete)
- **Blog management** — Create/edit with TipTap rich text editor
- Draft/publish workflow for blog posts
- Featured content toggle for blog and pricing
- Protected routes with auth guard

### Backend (Express.js)
- RESTful API with clean route/controller/model separation
- MongoDB Atlas with Mongoose ODM
- JWT authentication with bcrypt password hashing
- Role-based authorization (ADMIN / USER)
- Zod schema validation on all write endpoints
- Rate limiting on login and write operations
- CORS configuration
- Centralized error handling

---

## User Roles

| Role    | Permissions                                                    |
|---------|----------------------------------------------------------------|
| Visitor | View landing page, browse pricing plans, read published blogs  |
| User    | (Future) Access authenticated user dashboard and analytics     |
| Admin   | Full CRUD on pricing plans and blog posts via admin dashboard  |

### Authentication vs. Authorization

- **Authentication** = *Who are you?* — Verified via email + password, JWT token issued.
- **Authorization** = *What are you allowed to do?* — JWT decoded, role checked, ADMIN role required for protected operations.

---

## Application Workflow

### Visitor Workflow

```
Visitor
  |
Landing Page (/)
  |
Hero Section - "Measure Impact, Not Hours"
  |
Testimonials Section
  |
Dynamic Pricing Section (fetched from MongoDB)
  |
Select Plan - Checkout Modal
  |
Blog Page (/blog)
  |
Click Article - /blog/[slug]
  |
Read Full Article
```

### Admin Workflow

```
Admin
  |
/admin/login
  |
POST /api/auth/login (email + password)
  |
bcrypt password verification
  |
JWT token generated and stored in browser
  |
/admin (Dashboard)
  |
JWT sent with every request (Authorization header)
  |
Authentication middleware verifies JWT
  |
requireRole('ADMIN') checks user role
  |
Zod validates request body
  |
Controller executes business logic
  |
Mongoose writes to MongoDB
  |
Response returned - Admin UI updated
```

---

## System Architecture

```mermaid
flowchart TD
    Visitor["Visitor"] --> Frontend["Next.js Frontend on Vercel"]
    Admin["Admin"] --> Frontend

    Frontend -->|"API Calls"| APIRoutes["Next.js API Routes"]
    Frontend -->|"Local Dev"| Express["Express REST API"]

    Express --> Auth["JWT Authentication"]
    APIRoutes --> Auth

    Auth --> Role["Role-Based Authorization"]
    Role --> Validation["Zod Validation"]
    Validation --> RateLimit["Rate Limiting"]

    RateLimit --> DB[("MongoDB Atlas")]

    DB --> Pricing["Pricing Plans"]
    DB --> Blog["Blog Posts"]
    DB --> Users["Users"]
```

**Layer responsibilities:**
- **Frontend** — UI rendering, routing, form handling, API communication
- **Express API** — Traditional REST server for local development
- **Next.js API Routes** — Serverless functions for Vercel deployment
- **JWT Auth** — Stateless authentication via Bearer tokens
- **Role Authorization** — ADMIN-only access to write operations
- **Zod Validation** — Runtime schema validation on all inputs
- **Rate Limiting** — Protects login (5 req/15 min) and writes (100 req/hr)
- **MongoDB Atlas** — Cloud-hosted document database

---

## Frontend Architecture

**Next.js 16 + TypeScript + Tailwind CSS + App Router**

### Key Design Decisions:
- **App Router** — File-based routing with layouts and nested routes
- **Reusable components** — Navbar, Footer, AdminLayout, TipTapEditor
- **Centralized API client** — All API calls go through lib/api.ts with Axios interceptors for automatic JWT injection
- **Dynamic routing** — Blog detail pages use /blog/[slug] for SEO-friendly URLs
- **Admin auth guard** — AdminLayout component checks for token and redirects unauthorized users
- **Form handling** — React Hook Form + Zod resolver for frontend validation
- **Loading/error states** — All data-fetching pages handle loading and error states

### Frontend Directory Structure

```
frontend/src/
├── app/
│   ├── layout.tsx              # Root layout with Navbar + Footer
│   ├── page.tsx                # Landing page (hero, pricing, testimonials)
│   ├── blog/
│   │   ├── page.tsx            # Blog listing page
│   │   └── [slug]/page.tsx     # Blog detail page
│   ├── admin/
│   │   ├── layout.tsx          # Admin auth guard layout
│   │   ├── page.tsx            # Admin dashboard
│   │   ├── login/page.tsx      # Admin login form
│   │   ├── pricing/page.tsx    # Pricing CRUD page
│   │   └── blog/page.tsx       # Blog CRUD page
│   └── api/                    # Next.js API routes (serverless)
│       ├── auth/login/route.ts
│       ├── auth/me/route.ts
│       ├── pricing/route.ts
│       ├── pricing/[id]/route.ts
│       ├── blog/route.ts
│       ├── blog/[id]/route.ts
│       ├── blog/public/route.ts
│       ├── blog/public/[slug]/route.ts
│       └── seed/route.ts
├── components/
│   ├── Navbar.tsx              # Public navigation bar
│   ├── Footer.tsx              # Public footer
│   ├── AdminLayout.tsx         # Admin sidebar + auth check
│   └── TipTapEditor.tsx        # Rich text editor component
├── lib/
│   ├── api.ts                  # Axios client with JWT interceptor
│   ├── auth.ts                 # JWT sign/verify utilities
│   └── db.ts                   # Mongoose connection with caching
└── models/
    ├── User.ts                 # User model (serverless)
    ├── PricingPlan.ts          # Pricing model (serverless)
    └── BlogPost.ts             # Blog model (serverless)
```

---

## Backend Architecture

**Express.js + TypeScript + Mongoose**

The Express backend follows a clean layered architecture:

```
Route --> Middleware --> Controller --> Mongoose Model --> MongoDB
```

### Layer Details:
- **Routes** — Define HTTP methods and endpoint paths, apply middleware chain
- **Middleware** — protect (JWT auth), requireRole (authorization), validate (Zod), rate limiters
- **Controllers** — Handle request/response, execute business logic
- **Models** — Mongoose schemas defining document structure and methods
- **Schemas** — Zod validation schemas for request body validation
- **Utils** — JWT token generation helper

### Backend Directory Structure

```
backend/src/
├── config/
│   └── db.ts                   # MongoDB connection
├── controllers/
│   ├── authController.ts       # Login, GetMe handlers
│   ├── pricingController.ts    # Pricing CRUD handlers
│   └── blogController.ts       # Blog CRUD handlers
├── middleware/
│   ├── authMiddleware.ts       # JWT protect + requireRole
│   ├── rateLimiter.ts          # Login + write rate limiters
│   └── validate.ts             # Zod validation middleware
├── models/
│   ├── User.ts                 # User schema + interface
│   ├── PricingPlan.ts          # Pricing schema + interface
│   └── BlogPost.ts             # Blog schema + interface
├── routes/
│   ├── authRoutes.ts           # /api/auth routes
│   ├── pricingRoutes.ts        # /api/pricing routes
│   └── blogRoutes.ts           # /api/blog routes
├── schemas/
│   ├── authSchemas.ts          # Login validation
│   ├── pricingSchemas.ts       # Pricing validation
│   └── blogSchemas.ts          # Blog validation
├── seed/
│   └── seed.ts                 # Database seed script
├── utils/
│   └── generateToken.ts        # JWT token helper
├── server.ts                   # Express app entry point
└── tsconfig.json
```

---

## Authentication and Authorization

```mermaid
sequenceDiagram
    participant Admin
    participant Frontend
    participant API
    participant DB

    Admin->>Frontend: Enter email + password
    Frontend->>API: POST /api/auth/login
    API->>DB: Find user by email
    DB-->>API: User document
    API->>API: bcrypt.compare password with hash
    API-->>Frontend: JWT token + user data
    Frontend->>Frontend: Store token in localStorage

    Note over Frontend,API: Subsequent requests include JWT

    Frontend->>API: GET /api/pricing with Authorization Bearer token
    API->>API: jwt.verify token
    API->>API: Check role equals ADMIN
    API->>DB: Perform CRUD operation
    DB-->>API: Result
    API-->>Frontend: JSON response
    Frontend->>Frontend: Update UI
```

### Security Flow Details:
- **Password hashing** — bcrypt with 10 salt rounds (on user creation)
- **JWT generation** — Signed with JWT_SECRET, expires in 7 days
- **JWT verification** — protect middleware decodes token, attaches req.user
- **Role check** — requireRole('ADMIN') returns 403 Forbidden if role does not match
- **401 Unauthorized** — Returned when no token or invalid token is provided
- **403 Forbidden** — Returned when authenticated but insufficient permissions

---

## Database Architecture

```
MongoDB Atlas (Cloud)
|
├── users
│   └── User documents
├── pricingplans
│   └── PricingPlan documents
└── blogposts
    └── BlogPost documents
```

### User Model

| Field      | Type     | Description                       |
|------------|----------|-----------------------------------|
| name       | String   | User display name                 |
| email      | String   | Unique email address              |
| password   | String   | bcrypt-hashed password            |
| role       | String   | ADMIN or USER                     |
| createdAt  | Date     | Auto-generated timestamp          |
| updatedAt  | Date     | Auto-updated timestamp            |

### PricingPlan Model

| Field        | Type       | Description                                          |
|--------------|------------|------------------------------------------------------|
| name         | String     | Plan name (e.g. Starter, Pro, Business)              |
| price        | Number     | Plan price                                           |
| currency     | String     | Currency code (default: USD)                         |
| billingCycle | String     | monthly, yearly, or one-time                         |
| features     | String[]   | **Repeatable nested array** of feature descriptions  |
| highlighted  | Boolean    | Controls the Most Popular badge in UI                |
| createdAt    | Date       | Auto-generated timestamp                             |
| updatedAt    | Date       | Auto-updated timestamp                               |

> **features[]** is the key repeatable/nested field — it allows admins to dynamically add or remove an arbitrary number of features per plan without schema changes. This demonstrates clean structuring of nested data as required by the problem statement.

> **highlighted** is a Boolean that controls which plan card appears visually emphasized with a blue border and Most Popular badge — driven by data, not hardcoded logic.

### BlogPost Model

| Field       | Type     | Description                                    |
|-------------|----------|------------------------------------------------|
| title       | String   | Article title                                  |
| slug        | String   | URL-friendly unique identifier                 |
| excerpt     | String   | Short description for cards                    |
| content     | String   | Full HTML content (from TipTap editor)         |
| thumbnail   | String   | Optional thumbnail URL                         |
| author      | String   | Author name                                    |
| publishedAt | Date     | Publication date                               |
| featured    | Boolean  | Marks as hero featured article                 |
| status      | String   | draft or published                             |
| createdAt   | Date     | Auto-generated timestamp                       |
| updatedAt   | Date     | Auto-updated timestamp                         |

> **Draft/Published behavior:** Only posts with status published are returned by the public API. Draft posts are only visible in the admin dashboard. This allows admins to prepare content before making it live.

---

## Dynamic Pricing Workflow

```
Admin creates/edits a pricing plan in /admin/pricing
  |
Frontend form collects: name, price, billingCycle, features[], highlighted
  |
Zod validates the request body
  |
JWT + ADMIN role verified
  |
Mongoose saves to MongoDB Atlas
  |
Visitor loads landing page (/)
  |
GET /api/pricing fetches all plans, sorted by order
  |
Next.js renders dynamic pricing cards
  |
Card with highlighted: true gets blue border + Most Popular badge
```

The frontend **never hardcodes** plan data — it always fetches from the database. Creating a new plan in the admin panel makes it instantly appear on the public landing page.

---

## Blog Workflow

```
Admin opens /admin/blog and clicks Create New Post
  |
TipTap rich text editor for content
  |
Set title, slug, excerpt, author
  |
Choose status: draft or published
  |
Toggle featured for hero placement
  |
Save to MongoDB
  |
Public API (GET /api/blog/public) returns only published posts
  |
/blog page renders article cards
  |
Click article and navigate to /blog/[slug] which renders full content
  |
Featured post appears as a large hero card at the top
```

**Key behaviors:**
- Rich text editing via TipTap (headings, bold, italic, links)
- Drafts are hidden from the public but visible in admin
- Featured toggle controls hero placement on the blog listing page
- Dynamic slug routing provides SEO-friendly URLs
- Missing slugs return a proper error state

---

## API Documentation

### Authentication

| Method | Endpoint          | Access        | Description              |
|--------|-------------------|---------------|--------------------------|
| POST   | /api/auth/login   | Public        | Login with email/password |
| GET    | /api/auth/me      | Authenticated | Get current user profile  |

### Pricing Plans

| Method | Endpoint            | Access | Description               |
|--------|---------------------|--------|---------------------------|
| GET    | /api/pricing        | Public | Get all pricing plans      |
| GET    | /api/pricing/:id    | Public | Get single pricing plan    |
| POST   | /api/pricing        | Admin  | Create new pricing plan    |
| PUT    | /api/pricing/:id    | Admin  | Update pricing plan        |
| DELETE | /api/pricing/:id    | Admin  | Delete pricing plan        |

### Blog Posts

| Method | Endpoint                | Access | Description                   |
|--------|-------------------------|--------|-------------------------------|
| GET    | /api/blog/public        | Public | Get all published blog posts  |
| GET    | /api/blog/public/:slug  | Public | Get published post by slug    |
| GET    | /api/blog               | Admin  | Get all posts (incl. drafts)  |
| GET    | /api/blog/:id           | Admin  | Get single post by ID         |
| POST   | /api/blog               | Admin  | Create new blog post          |
| PUT    | /api/blog/:id           | Admin  | Update blog post              |
| DELETE | /api/blog/:id           | Admin  | Delete blog post              |

### Seed

| Method | Endpoint      | Access | Description                    |
|--------|---------------|--------|--------------------------------|
| GET    | /api/seed     | Public | Seed database with sample data |

---

## Validation and Rate Limiting

### Zod Validation

All write endpoints validate incoming data using **Zod** schemas before processing:

- **Login** — Validates email format and password presence
- **Pricing** — Validates name (string), price (number), billingCycle (enum), features (string array)
- **Blog** — Validates title, slug, content, author, status (enum)

Frontend validation (React Hook Form + Zod) provides instant feedback, but **backend validation protects the API** regardless of client.

### Rate Limiting

Rate limiting is implemented via express-rate-limit:

| Limiter        | Window     | Max Requests | Applied To            |
|----------------|------------|-------------|-----------------------|
| loginLimiter   | 15 minutes | 5 requests  | POST /api/auth/login  |
| writeLimiter   | 1 hour     | 100 requests| All POST/PUT/DELETE   |

Exceeding the limit returns 429 Too Many Requests with a descriptive error message.

---

## Security

| Measure                    | Implementation                                               |
|----------------------------|--------------------------------------------------------------|
| Password hashing           | bcrypt with 10 salt rounds                                   |
| Authentication             | JWT Bearer tokens (7-day expiry)                             |
| Authorization              | Role-based (ADMIN / USER) middleware                         |
| Input validation           | Zod schemas on all write endpoints                           |
| Rate limiting              | Login: 5 req/15 min, Writes: 100 req/hr                     |
| CORS                       | Configured to allow frontend origin                          |
| Environment variables      | Secrets stored in .env / Vercel env vars (never committed)   |
| Protected admin APIs       | protect + requireRole ADMIN middleware chain                 |
| Safe error responses       | Generic error messages, no stack traces in production        |

---

## Technology Stack

| Category           | Technology              |
|--------------------|-------------------------|
| Frontend           | Next.js 16 (App Router) |
| Language           | TypeScript              |
| Styling            | Tailwind CSS            |
| Backend            | Node.js + Express       |
| Database           | MongoDB Atlas           |
| ODM                | Mongoose                |
| Authentication     | JWT (jsonwebtoken)      |
| Password Hashing   | bcryptjs                |
| Validation         | Zod                     |
| Form Handling      | React Hook Form         |
| Rate Limiting      | express-rate-limit      |
| Rich Text Editor   | TipTap                  |
| HTTP Client        | Axios                   |
| Deployment         | Vercel                  |
| Version Control    | Git + GitHub            |

---

## Project Structure

```
flowlytics/
├── backend/
│   ├── src/
│   │   ├── config/db.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── blogController.ts
│   │   │   └── pricingController.ts
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts
│   │   │   ├── rateLimiter.ts
│   │   │   └── validate.ts
│   │   ├── models/
│   │   │   ├── BlogPost.ts
│   │   │   ├── PricingPlan.ts
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── blogRoutes.ts
│   │   │   └── pricingRoutes.ts
│   │   ├── schemas/
│   │   │   ├── authSchemas.ts
│   │   │   ├── blogSchemas.ts
│   │   │   └── pricingSchemas.ts
│   │   ├── seed/seed.ts
│   │   ├── utils/generateToken.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── admin/
│   │   │   ├── blog/
│   │   │   └── api/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   └── TipTapEditor.tsx
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   ├── auth.ts
│   │   │   └── db.ts
│   │   └── models/
│   ├── package.json
│   └── tsconfig.json
│
├── render.yaml
├── LICENSE
├── .gitignore
└── README.md
```

---

## Installation and Setup

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Git

### Clone

```bash
git clone https://github.com/hariharkadhe/flowlytics.git
cd flowlytics
```

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```

---

## Environment Variables

### Backend (backend/.env)

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flowmetrics
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend (frontend/.env.local)

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flowmetrics
JWT_SECRET=your_jwt_secret_here
```

| Variable           | Description                                  |
|--------------------|----------------------------------------------|
| PORT               | Backend server port (default: 5000)          |
| MONGODB_URI        | MongoDB Atlas connection string              |
| JWT_SECRET         | Secret key for signing JWT tokens            |
| CLIENT_URL         | Frontend URL for CORS configuration          |
| NODE_ENV           | development or production                    |

> Never commit .env files. Use .env.example as reference.

---

## Running the Project

### Option 1: Separate Backend + Frontend (Local Development)

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Express server starts at http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# Next.js starts at http://localhost:3000
```

### Option 2: Frontend Only (Vercel-style)

```bash
cd frontend
npm run dev
# Next.js API routes serve as the backend
# Everything runs at http://localhost:3000
```

### Seed the Database

```bash
# Option A: Visit in browser
# http://localhost:3000/api/seed

# Option B: Backend seed script
cd backend
npx tsx src/seed/seed.ts
```

### Default Admin Credentials

| Field    | Value              |
|----------|--------------------|
| Email    | admin@example.com  |
| Password | Admin@12345        |

---

## Deployment

```
GitHub Repository
       |
       ├──── Vercel ──────────┐
       │   Next.js Frontend   │
       │   + API Routes       │
       │   (Serverless)       │
       │                      │
       └──── Render ──────────┘
           Express Backend
           (Optional, local dev)
                    |
                    v
             MongoDB Atlas
          (Cloud Database)
```

### Current Deployment

| Component  | Platform       | URL                                                                      |
|------------|----------------|--------------------------------------------------------------------------|
| Frontend   | Vercel         | [flowmetrics-harihar.vercel.app](https://flowmetrics-harihar.vercel.app) |
| Database   | MongoDB Atlas  | Cloud-hosted cluster                                                     |
| Backend    | Local / Render | Express server for local development                                     |

### Deploy Your Own

1. Fork the repository
2. Import to Vercel — set Root Directory to frontend
3. Add environment variables (MONGODB_URI, JWT_SECRET)
4. Deploy — visit /api/seed to populate data

---

## Testing Checklist

### Authentication
- [x] Valid login with correct credentials
- [x] Invalid login rejected with error message
- [x] JWT verification on protected routes
- [x] Protected routes redirect without token

### Authorization
- [x] Admin can CRUD pricing plans
- [x] Admin can CRUD blog posts
- [x] Non-admin cannot access admin APIs (403)
- [x] Unauthenticated writes rejected (401)

### Pricing
- [x] Create new pricing plan
- [x] Read all pricing plans (public)
- [x] Update pricing plan details
- [x] Delete pricing plan
- [x] Dynamic features[] array
- [x] Highlighted Boolean controls UI badge
- [x] Plans render dynamically on landing page

### Blog
- [x] Create new blog post with TipTap
- [x] Update blog post content
- [x] Delete blog post
- [x] Draft posts hidden from public
- [x] Published posts visible on /blog
- [x] Featured post shown as hero card
- [x] Dynamic /blog/[slug] routing

### Security
- [x] Zod validation on all inputs
- [x] Rate limiting on login and writes
- [x] bcrypt password hashing
- [x] Role-based authorization middleware

---

## Future Scope

These features are **not currently implemented** but represent realistic next steps:

- Real-time analytics dashboard — Team productivity metrics and charts
- User registration and onboarding — Public signup flow for team members
- GitHub/Jira/Slack integrations — Import work data automatically
- Advanced analytics — Cycle time, velocity, workload distribution charts
- AI-powered insights — Smart recommendations based on team patterns
- Notifications — Email and in-app alerts for reports and milestones
- Custom reports — Exportable PDF/CSV productivity reports
- Stripe subscription system — Payment processing for pricing plans
- Dark mode — Theme toggle for the entire application

---

## Interview Summary

### How I Explain Flowlytics in an Interview

> **"Flowlytics is a full-stack SaaS platform I built for team productivity analytics.** The public website features a responsive landing page with dynamic pricing and a blog — all content is managed through a secure admin dashboard.
>
> **I chose Next.js** for the frontend because it provides both static rendering for public pages and dynamic routing for the blog. The App Router gives clean file-based routing.
>
> **Express.js** serves as the traditional REST API backend with a clean separation of routes, controllers, middleware, and models. I also mirrored the API as Next.js API Routes for serverless deployment on Vercel — demonstrating knowledge of both architectures.
>
> **MongoDB** was chosen because the data is document-oriented — pricing plans have a nested features[] array that can grow dynamically without schema migrations.
>
> **Authentication** uses JWT tokens with bcrypt-hashed passwords. The protect middleware verifies tokens, and requireRole('ADMIN') handles authorization — returning 401 for missing tokens and 403 for insufficient permissions.
>
> **Zod** validates all incoming data on the backend, providing type-safe runtime validation. **Rate limiting** protects the login endpoint (5 requests per 15 minutes) and write operations (100 per hour).
>
> The pricing section is fully dynamic — the admin creates plans with an arbitrary features list, and the frontend renders them live from the database. The highlighted: true flag controls which plan gets the Most Popular badge.
>
> The blog system supports draft/publish workflow, featured articles, and rich text editing via TipTap — with only published posts visible to the public through a separate API endpoint."

---

## Author

**Harihar Kadhe**

- GitHub: [@hariharkadhe](https://github.com/hariharkadhe)

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
