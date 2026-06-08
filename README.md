# DSA Sheet — Full Stack MERN Application

A structured DSA (Data Structures & Algorithms) practice tracker built with **Next.js + Express + MongoDB**. Students can track their progress across topics, access curated YouTube tutorials, practice problems, and reference articles — all in one place.

---

## Live Demo

| Service | URL |
|---|---|
| Frontend (AWS Amplify) | _Add your Amplify URL here_ |
| Backend (AWS Elastic Beanstalk) | _Add your EB URL here_ |

---

## Features

- **Secure Authentication** — Register/Login with JWT + bcrypt password hashing
- **12 DSA Topics** — Arrays, Sorting, Strings, Linked List, Stack, Queue, Trees, Heaps, Graphs, DP, Backtracking, Tries
- **83+ Problems** — Sourced from Apna College's DSA curriculum
- **Per-problem Links** — YouTube tutorial, LeetCode/GFG practice, article reference
- **Difficulty Badges** — Easy / Medium / Tough color-coded tags
- **Progress Tracker** — Checkbox per problem, persisted to DB, resumes on next login
- **Overall Progress Bar** — Live X/Y completed counter across all topics

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB Atlas (M0 free tier) |
| Auth | JWT + bcryptjs |
| Deployment | AWS Amplify (FE) + AWS Elastic Beanstalk (BE) |

---

## Project Structure

```
sde-sheet/
├── client/                         # Next.js 14 frontend
│   ├── src/
│   │   ├── app/                    # App Router pages
│   │   │   ├── (auth)/login/
│   │   │   ├── (auth)/register/
│   │   │   └── sheet/
│   │   └── modules/                # Feature modules
│   │       ├── auth/               # Login, Register, AuthContext, useAuth
│   │       ├── sheet/              # SheetPage, TopicCard, ProblemRow, hooks
│   │       └── shared/             # Navbar, Spinner, ProtectedPage, axios
│   ├── next.config.js
│   └── package.json
│
├── server/                         # Express backend
│   ├── modules/                    # Feature modules
│   │   ├── auth/                   # model, controller, service, routes, validation
│   │   ├── topics/                 # model, controller, service, routes
│   │   ├── problems/               # model, controller, service, routes
│   │   └── progress/               # model, controller, service, routes
│   ├── middleware/auth.middleware.js
│   ├── config/db.js
│   ├── seed/seedData.js
│   ├── server.js
│   └── package.json
│
├── REQUIREMENTS.md
├── IMPLEMENTATION_PLAN.md
├── DEPLOYMENT.md
└── COST_CALCULATION.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free M0 cluster)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd sde-sheet
```

### 2. Setup the Backend

```bash
cd server
npm install

# Copy and fill in environment variables
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/dsasheet
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:3000
NODE_ENV=development
```

Seed the database:

```bash
npm run seed
```

Start the server:

```bash
npm run dev     # development (nodemon)
npm start       # production
```

Server runs at `http://localhost:5000`

### 3. Setup the Frontend

```bash
cd client
npm install

# Copy env file (no changes needed for local dev)
cp .env.local.example .env.local
```

Start the Next.js dev server:

```bash
npm run dev
```

App runs at `http://localhost:3000`

> In development, `/api/*` requests are automatically proxied to `localhost:5000` via `next.config.js` rewrites — no CORS issues.

---

## API Reference

All routes except `/api/auth/*` require `Authorization: Bearer <token>` header.

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | No | Register new user |
| `POST` | `/api/auth/login` | No | Login, returns JWT |
| `GET` | `/api/auth/me` | Yes | Get current user |
| `GET` | `/api/topics` | Yes | Get all topics with nested problems |
| `GET` | `/api/problems?topicId=` | Yes | Get problems for a topic |
| `GET` | `/api/progress` | Yes | Get completed problem IDs for current user |
| `POST` | `/api/progress` | Yes | Mark a problem as done `{ problemId }` |
| `DELETE` | `/api/progress/:problemId` | Yes | Unmark a problem |

---

## DSA Topics Covered

| # | Topic | Problems | Source |
|---|---|---|---|
| 1 | Arrays | 11 | Apna College |
| 2 | Sorting Algorithms | 6 | Apna College |
| 3 | Strings | 8 | Apna College |
| 4 | Linked List | 8 | Apna College |
| 5 | Stack | 6 | Apna College |
| 6 | Queue | 5 | Apna College |
| 7 | Trees | 9 | Apna College |
| 8 | Heaps & Priority Queue | 5 | Apna College |
| 9 | Graphs | 8 | Apna College |
| 10 | Dynamic Programming | 9 | Apna College |
| 11 | Backtracking | 5 | Apna College |
| 12 | Tries | 3 | Apna College |
| **Total** | | **83 problems** | |

YouTube content sourced from: [Apna College — Java + DSA Playlist](https://www.youtube.com/playlist?list=PLfqMkj8hPVVdQlKMLmlE2GCFrjFT15dkc)

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full step-by-step AWS deployment guide.

**Quick summary:**
1. Deploy backend to **AWS Elastic Beanstalk** (Node.js, t2.micro free tier)
2. Deploy frontend to **AWS Amplify** (native Next.js SSR support)
3. Database on **MongoDB Atlas M0** (free forever)

**Estimated AWS cost: $0/month** on free tier — see [COST_CALCULATION.md](./COST_CALCULATION.md).

---

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Express server port (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `JWT_EXPIRES_IN` | JWT expiry duration (e.g. `7d`) |
| `CLIENT_ORIGIN` | Frontend URL for CORS (e.g. Amplify URL) |

### Client (`client/.env.production`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend URL (Elastic Beanstalk URL in production) |

---

## Scripts

### Server

```bash
npm run dev     # Start with nodemon (hot reload)
npm start       # Start for production
npm run seed    # Seed DSA topics and problems into MongoDB
```

### Client

```bash
npm run dev     # Start Next.js dev server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

---

## Deliverables

- [x] Complete project source code
- [ ] Live AWS deployment link _(add after deployment)_
- [ ] 2–3 minute screen recording explaining the project

---

## Documentation

| File | Description |
|---|---|
| [REQUIREMENTS.md](./REQUIREMENTS.md) | Full feature requirements with acceptance criteria |
| [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) | Tech stack, folder structure, dev phases |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Step-by-step AWS deployment guide |
| [COST_CALCULATION.md](./COST_CALCULATION.md) | AWS cost breakdown and free-tier analysis |
