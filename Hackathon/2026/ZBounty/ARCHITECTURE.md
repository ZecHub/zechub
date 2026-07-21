# ZBounty — Architecture Documentation

> Privacy-First Bounty Marketplace Powered by Zcash
> ZecHub 2026 Hackathon — Track: Accounting / Games

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [System Architecture](#2-system-architecture)
3. [Bounty Workflow & Privacy Score](#3-bounty-workflow--privacy-score)
4. [Tech Stack](#4-tech-stack)
5. [Project Structure](#5-project-structure)
6. [Database Schema (MongoDB)](#6-database-schema-mongodb)
7. [Zcash Integration Layer](#7-zcash-integration-layer)
8. [API Reference](#8-api-reference)
9. [Security & Escrow Model](#9-security--escrow-model)
10. [Environment Variables](#10-environment-variables)
11. [Deployment](#11-deployment)

---

## 1. Project Overview

ZBounty is an end-to-end bounty marketplace designed to facilitate private, secure payments for open-source work, DAOs, and freelancers. By leveraging Zcash shielded transactions, ZBounty ensures that both the funding source and the recipient's identity remain completely confidential.

### Core Design Principles

- **Default Privacy** — All payouts are executed via shielded transactions (z-to-z) by default.
- **Gamification** — The "Privacy Score" (0-100) incentivizes users to adopt maximum privacy practices.
- **Real-Time Data** — Direct gRPC connection to Lightwalletd for sub-second balance updates down to 8 decimal places (Zatoshis).
- **Extensible Escrow** — Currently operated via a trusted backend wallet, architected for a future transition to FROST threshold signatures.

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER (Next.js)                     │
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │
│  │  Landing Page    │  │  Bounty Board    │  │  User Dashboard  │   │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘   │
│           │                     │                     │             │
│           │ REST API            │                     │ gRPC proxy  │
└───────────┼─────────────────────┼─────────────────────┼─────────────┘
            │                     │                     │
            ▼                     ▼                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     ZBOUNTY BACKEND (Node.js/Express)               │
│                                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ ┌─────────────┐ │
│  │ Auth Routes │  │ Bounty Routes│  │ Escrow Logic│ │ Zcash Routes│ │
│  └──────┬──────┘  └──────┬───────┘  └──────┬──────┘ └──────┬──────┘ │
│         │                │                 │               │        │
└─────────┼────────────────┼─────────────────┼───────────────┼────────┘
          │                │                 │               │
          ▼                ▼                 ▼               ▼
┌──────────────────┐    ┌───────────────────────────────────────────┐
│   MongoDB Atlas  │    │         Zcash Network Layer               │
│                  │    │                                           │
│  • users         │    │  ┌──────────────┐  ┌──────────────────┐   │
│  • bounties      │    │  │  Zingo CLI   │  │  Lightwalletd    │   │
│  • submissions   │    │  │  (Tx Engine) │  │  (gRPC / Zebra)  │   │
└──────────────────┘    │  └──────┬───────┘  └────────┬─────────┘   │
                        │         │                   │             │
                        │     Zcash Mainnet ────────────────────────┘
```

---

## 3. Bounty Workflow & Privacy Score

### 3.1 High-Level Flow

1. **Authentication:** User connects their Zcash address (transparent or shielded) to create a session.
2. **Creation:** Bounty creator posts a task, specifying the reward and selecting the deposit method.
3. **Escrow:** Creator deposits funds to the backend escrow wallet. Bounty becomes `Open`.
4. **Contribution:** Developer submits a PR link or proof of work via the dashboard.
5. **Payout:** Creator approves the submission. The backend triggers the Zingo CLI to execute a shielded transaction to the developer.
6. **Gamification:** The system calculates the transaction's privacy metrics and awards a Privacy Score.

### 3.2 The Privacy Score Matrix

The Privacy Score evaluates how securely the lifecycle of the bounty was handled:

| Deposit Method | Payout Method | Privacy Score | Badge Unlocked |
|----------------|---------------|---------------|----------------|
| Transparent (t)| Transparent(t)| **0 / 100**   | None           |
| Transparent (t)| Shielded (z)  | **50 / 100**  | Privacy Novice |
| Shielded (z)   | Transparent(t)| **50 / 100**  | Privacy Novice |
| Shielded (z)   | Shielded (z)  | **100 / 100** | **Privacy Champion!** |

---

## 4. Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend | **Next.js 15 (React)** | Server-side rendering, App Router, optimal performance. |
| Styling & UI | **TailwindCSS + Framer Motion** | Rapid styling with smooth micro-animations for gamification. |
| Backend | **Node.js + Express** | Lightweight, robust API layer for managing escrow and DB connections. |
| Language | **TypeScript** | End-to-end type safety between MongoDB models and Next.js frontend. |
| Database | **MongoDB Atlas (Mongoose)** | Flexible document structure for bounties and dynamic user profiles. |
| Blockchain Tx | **Zingo CLI** | Executes shielded transactions securely from the backend server. |
| Blockchain Read | **Lightwalletd (gRPC)** | High-speed, real-time fetching of ZEC balances and block heights. |

---

## 5. Project Structure

```
zbounty/
│
├── frontend/                     # Next.js Application
│   ├── src/
│   │   ├── app/                  # App Router Pages
│   │   │   ├── page.tsx          # Landing Page
│   │   │   ├── dashboard/        # Creator/Hunter Dashboard
│   │   │   ├── bounty/           # Bounty details & submission
│   │   │   └── settings/         # Wallet connection & profile
│   │   ├── components/           # Reusable UI (Shadcn + Custom)
│   │   └── lib/                  # Frontend utilities, API fetchers
│   ├── public/
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                      # Node.js Express API
│   ├── src/
│   │   ├── controllers/          # Business logic (auth, bounties, payouts)
│   │   ├── models/               # Mongoose DB schemas
│   │   ├── routes/               # Express router definitions
│   │   ├── utils/                # Lightwalletd gRPC client, Address validators
│   │   └── server.ts             # Express entry point
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
└── ARCHITECTURE.md               # This file
```

---

## 6. Database Schema (MongoDB)

### 6.1 `Users`
Stores authentication data and earned gamification badges.
```typescript
{
  _id: ObjectId,
  wallet_address: string,     // Indexed unique, primary auth identifier
  address_type: string,       // 'transparent', 'sapling', 'orchard', 'unified'
  username: string,
  badges: string[],           // e.g. ["privacy_champion"]
  created_at: Date
}
```

### 6.2 `Bounties`
Tracks the escrow lifecycle and privacy score of a task.
```typescript
{
  _id: ObjectId,
  creator_id: ObjectId,       // Ref -> Users
  title: string,
  description: string,
  reward_amount: number,      // in ZEC (float)
  status: string,             // 'draft', 'open', 'review', 'completed'
  deposit_type: string,       // 'shielded' | 'transparent'
  payout_type: string,        // 'shielded' | 'transparent'
  privacy_score: number,      // 0, 50, or 100
  winner_id: ObjectId | null,
  created_at: Date
}
```

### 6.3 `Submissions`
Tracks work submitted by contributors.
```typescript
{
  _id: ObjectId,
  bounty_id: ObjectId,        // Ref -> Bounties
  contributor_id: ObjectId,   // Ref -> Users
  proof_url: string,          // Link to GitHub PR, Figma, etc.
  status: string,             // 'pending', 'accepted', 'rejected'
  submitted_at: Date
}
```

---

## 7. Zcash Integration Layer

ZBounty interacts with the Zcash network using a dual-approach to optimize speed and security:

1. **Reads (gRPC via Lightwalletd):** 
   - The backend connects directly to a Zcash Zebra node via Lightwalletd using gRPC.
   - This bypasses slow REST APIs and allows the frontend to stream real-time, highly accurate balances (down to 8 decimal places) to the user dashboard instantly.
   
2. **Writes (Zingo CLI):**
   - For executing payouts, the backend wraps the Zingo CLI in a child process.
   - When a payout is triggered, the Node.js server executes a `zingo-cli send` command, signing and broadcasting the shielded transaction.
   - *Mock Mode:* In development (`USE_MOCK_ZCASH=true`), the backend bypasses the CLI and simulates a successful transaction hash for faster testing.

---

## 8. API Reference

#### **Auth & Users**
- `POST /api/auth/login` - Authenticate via wallet address.
- `GET /api/users/:id` - Fetch user profile and badges.

#### **Bounties**
- `GET /api/bounties` - List all open bounties.
- `POST /api/bounties` - Create a new bounty.
- `POST /api/bounties/:id/fund` - Confirm deposit (Escrow).
- `POST /api/bounties/:id/payout` - Trigger Zingo CLI to send a shielded tx to the winner.

#### **Zcash Real-Time**
- `GET /api/zcash/balance/:address` - Proxy gRPC request to fetch live balance.
- `POST /api/zcash/validate` - Ensure address format is valid (t, z, or u).

---

## 9. Security & Escrow Model

### Current Escrow Model (Hackathon Prototype)
For the MVP, ZBounty utilizes a **Custodial Escrow**. 
- The ZBounty backend manages a server-side Zcash wallet (via Zingo CLI).
- Bounty creators deposit funds into this server wallet.
- The server wallet programmatically sends funds to the contributor upon approval.

### Future Architecture: FROST / Multi-sig
To eliminate the custodial risk, future versions of ZBounty will implement **FROST (Flexible Round-Optimized Schnorr Threshold signatures)**. 
- The escrow will be a multi-sig address controlled 2-of-3 by the Creator, the Contributor, and ZBounty (as an arbitrator).
- Payouts will not require the platform to ever hold private keys to user funds.

---

## 10. Environment Variables

```bash
# backend/.env

# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/zbounty

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# Zcash Integration
USE_MOCK_ZCASH=true                 # Set to false in production
LIGHTWALLETD_URL=mainnet.lightwalletd.com:9067
ZINGO_WALLET_DIR=/path/to/server/wallet
```

---

## 11. Deployment

### Recommended Topology

```
Frontend    → Vercel (Next.js serverless functions)
Backend API → Render / Railway (Node.js Docker container)
Database    → MongoDB Atlas (Dedicated Cluster)
Zcash Node  → DigitalOcean Droplet (Zebra + Lightwalletd + Zingo CLI)
```

By isolating the Zcash Node components on a dedicated VPS, the backend API can scale independently without having to sync the blockchain on every instance spin-up.

---

*ZBounty — Private Work. Private Rewards.*
