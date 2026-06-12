# GigzKe - Kenya's Gig Worker Empowerment Ecosystem

GigzKe is a hybrid marketplace and incubator platform designed to empower Kenya's gig economy workers by providing not just gig opportunities, but also financial tools, credentialing, and community support.

## Vision

Instead of being just a marketplace (connecting A to B), GigzKe is an **Empowerment Ecosystem** that solves real pain points for Kenyan gig workers:
- **Financial Literacy & Safety**: Gig savings/insurance wallet integrated with till numbers (M-Pesa later)
- **Credentialing**: Portable, verifiable worker portfolios
- **Community Support**: Worker forums, pricing tips, and accountability

## Current Phase: MVP (Phase 1)

### MVP Features (Till Number Based):
1. **Worker Registration & Auth** - Simple signup with till credential setup
2. **Gig Listings** - Handyman, Delivery, Digital Admin, Home Services
3. **Till Payment Integration** - Direct till-to-wallet settlements
4. **Worker Earnings Dashboard** - Track gigs, earnings, and payouts
5. **Basic Ratings & Reviews** - Build trust on the platform

### Future Phases:
- M-Pesa API integration
- Gig Savings Wallet
- Worker Credentialing System
- Community Forum & Knowledge Sharing

## Tech Stack

- **Frontend**: Next.js 14+ (React)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **Payment**: Till Number Integration (MVP), M-Pesa API (Future)
- **Hosting**: (TBD - Vercel for frontend, Railway/Heroku for backend)

## Project Structure

```
GigzKe/
├── frontend/              # Next.js React app
│   ├── app/
│   ├── components/
│   ├── pages/
│   └── public/
├── backend/               # Express.js API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── config/
├── database/              # PostgreSQL schemas & migrations
│   └── migrations/
├── docs/                  # API documentation & guides
└── .github/               # GitHub workflows & templates
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Git

### Installation

1. Clone the repo:
```bash
git clone https://github.com/Gogez72/Gigz-kenya.git
cd Gigz-kenya
```

2. Install dependencies:
```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

3. Set up environment variables (see `.env.example` files in each directory)

4. Run database migrations:
```bash
cd ../database && npm run migrate
```

5. Start development servers:
```bash
# In frontend directory
npm run dev

# In another terminal, in backend directory
npm run dev
```

## Documentation

- [Architecture & Framework](docs/ARCHITECTURE.md) - System design and component structure
- [MVP Roadmap](docs/MVP_ROADMAP.md) - Phase 1 sprint breakdown
- [API Documentation](docs/API.md) - Endpoint reference (coming soon)
- [Contributing Guide](CONTRIBUTING.md) - How to contribute

## License

MIT License - See LICENSE.md

## Contact

- GitHub: [@Gogez72](https://github.com/Gogez72)
- Issues & Feedback: [GitHub Issues](https://github.com/Gogez72/Gigz-kenya/issues)

---

**Let's empower Kenya's gig workers!** 🚀
