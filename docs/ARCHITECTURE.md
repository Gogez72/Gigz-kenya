# GigzKe Application Architecture

## High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE LAYER                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐              ┌──────────────────┐         │
│  │  Worker Portal   │              │ Customer Portal  │         │
│  │  (Next.js)       │              │  (Next.js)       │         │
│  │                  │              │                  │         │
│  │ • Dashboard      │              │ • Create Gigs    │         │
│  │ • Browse Gigs    │              │ • Track Orders   │         │
│  │ • Earnings       │              │ • Payments       │         │
│  │ • Profile        │              │ • Reviews        │         │
│  └──────────────────┘              └──────────────────┘         │
│           │                                  │                   │
└───────────┼──────────────────────────────────┼───────────────────┘
            │                                  │
            │         HTTP/REST API            │
            │                                  │
┌───────────▼──────────────────────────────────▼───────────────────┐
│                    API LAYER (Express.js)                        │
├───────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    ROUTES & CONTROLLERS                     │ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │                                                              │ │
│  │  Auth Routes          Gig Routes           Payment Routes   │ │
│  │  ├─ POST /signup      ├─ POST /gigs        ├─ POST /pay    │ │
│  │  ├─ POST /login       ├─ GET /gigs         ├─ GET /txns    │ │
│  │  ├─ POST /logout      ├─ GET /gigs/:id     └─ POST /payout │ │
│  │  └─ POST /refresh     ├─ PUT /gigs/:id                     │ │
│  │                       ├─ POST /bids                         │ │
│  │  Worker Routes        └─ GET /bids/:id                     │ │
│  │  ├─ GET /profile                                            │ │
│  │  ├─ PUT /profile      Review Routes                         │ │
│  │  ├─ GET /earnings     ├─ POST /reviews                     │ │
│  │  └─ GET /dashboard    └─ GET /reviews/:id                  │ │
│  │                                                              │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    MIDDLEWARE LAYER                         │ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │  • JWT Auth         • Error Handler   • Request Validator   │ │
│  │  • CORS             • Logging         • Rate Limiter        │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                    │
└────────────┬────────────────────────────────────────────────┬─────┘
             │                                                │
             │                                                │
┌────────────▼────────────────────┐          ┌───────────────▼─────┐
│   DATABASE LAYER (PostgreSQL)   │          │  EXTERNAL SERVICES  │
├─────────────────────────────────┤          ├─────────────────────┤
│                                 │          │                     │
│  ┌─────────────────────────────┐│          │  Till Provider API  │
│  │  • users                    ││          │  (Payment Gateway)  │
│  │  • worker_profiles          ││          │                     │
│  │  • till_credentials         ││          │  Email Service      │
│  │  • gigs                     ││          │  (Notifications)    │
│  │  • gig_bids                 ││          │                     │
│  │  • transactions             ││          │  (M-Pesa API)       │
│  │  • worker_earnings          ││          │  (Future)           │
│  │  • reviews                  ││          │                     │
│  │  • ratings                  ││          │                     │
│  └─────────────────────────────┘│          │                     │
│                                 │          └─────────────────────┘
└─────────────────────────────────┘
```

---

## Frontend Structure (Next.js)

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── gigs/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/page.tsx
│   │   │   └── create/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── earnings/page.tsx
│   │   └── settings/page.tsx
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   └── api/[...]/route.ts
├── components/
│   ├── auth/
│   ├── gigs/
│   ├── dashboard/
│   ├── profile/
│   ├── earnings/
│   ├── reviews/
│   ├── common/
│   └── layout/
├── hooks/
├── context/
├── services/
├── store/
├── utils/
├── styles/
├── public/
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## Backend Structure (Express.js)

```
backend/
├── config/
│   ├── database.js
│   ├── jwt.js
│   └── env.js
├── models/
│   ├── User.js
│   ├── Worker.js
│   ├── Gig.js
│   ├── Bid.js
│   ├── Transaction.js
│   ├── Review.js
│   ├── TillCredential.js
│   └── WorkerEarnings.js
├── routes/
│   ├── auth.routes.js
│   ├── workers.routes.js
│   ├── gigs.routes.js
│   ├── bids.routes.js
│   ├── payments.routes.js
│   ├── reviews.routes.js
│   └── index.js
├── controllers/
│   ├── authController.js
│   ├── workerController.js
│   ├── gigController.js
│   ├── bidController.js
│   ├── paymentController.js
│   ├── reviewController.js
│   └── dashboardController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── validator.js
│   ├── logger.js
│   ├── rateLimiter.js
│   └── cors.js
├── services/
│   ├── authService.js
│   ├── gigService.js
│   ├── paymentService.js
│   ├── tillService.js
│   ├── emailService.js
│   ├── workerService.js
│   └── reviewService.js
├── utils/
├── migrations/
├── tests/
├── server.js
└── package.json
```

---

## User Types & Permissions

| User Type | Can Do | Cannot Do |
|-----------|--------|----------|
| **Worker** | Browse gigs, Bid, View earnings, Add till credentials, Receive ratings | Create gigs, Trigger payments |
| **Customer** | Create gigs, Accept bids, Initiate payments, Leave reviews | Place bids, Access worker earnings |
| **Admin** | View all users, Monitor transactions, Resolve disputes, Manage till credentials | (Admin portal: Future Phase 2) |

---

## Data Flow Examples

### 1. Worker Registration → Till Setup
```
SignupForm → POST /auth/signup → Hash password → Create user → JWT token → Till Setup Form → POST /workers/till-credentials → Dashboard ✓
```

### 2. Customer Creates Gig → Worker Bids
```
CreateGigForm → POST /gigs → GET /gigs (browse) → Place Bid → POST /bids → Bid submitted ✓
```

### 3. Gig Completion → Payment → Payout
```
Mark complete → POST /payments → Till API → Transaction saved → Automated payout → Worker receives ✓
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|  
| Frontend | Next.js 14, React 18, Tailwind | User interfaces |
| State | Zustand, Context API | Global state |
| API Client | Axios | HTTP requests |
| Backend | Node.js, Express | REST API |
| Database | PostgreSQL | Data persistence |
| Auth | JWT, bcryptjs | Security |
| Payment | Till API (MVP), M-Pesa (Future) | Payments |
| Hosting | Vercel, Railway/Heroku | Deployment |

---

**This is your MVP framework. Ready to build!** 🚀
