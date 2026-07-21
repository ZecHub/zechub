# ZBounty

**Private Work. Private Rewards.**

ZBounty is a privacy-first bounty marketplace powered by Zcash Mainnet. It allows individuals, DAOs, and open-source communities to post tasks, fund rewards in ZEC, and pay contributors privately through shielded transactions. 

The platform introduces the **Privacy Score**, a metric from 0-100 that evaluates how privately a bounty was funded and paid, gamifying privacy and showcasing the real-world utility of Zcash shielded transactions.

## Zcash Mainnet Integration

ZBounty leverages the Zcash Mainnet to facilitate secure and private transactions. Our integration features:

- **Shielded Transactions**: Payouts are executed as shielded transactions (z-to-z) ensuring the privacy of both the bounty creator and the recipient.
- **Zingo CLI & Lightwalletd**: In production mode (`USE_MOCK_ZCASH=false`), the backend interacts with the Zcash network via Zingo CLI and a connected lightwalletd server, enabling fast synchronization and reliable transaction broadcasting.
- **Real-Time Balances**: Using gRPC connections, the platform queries active light nodes (like Zcash Zebra) to fetch accurate, real-time balances for transparent and shielded addresses down to 8 decimal places (Zatoshis).

## Tech Stack
- **Frontend**: Next.js 15, React, TypeScript, TailwindCSS, Shadcn UI, Framer Motion
- **Backend**: Node.js, Express, TypeScript, MongoDB Atlas
- **Blockchain**: Zcash Mainnet (via Zingo CLI integration / Lightwalletd)

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm
- MongoDB URI (local or Atlas)
- Zingo CLI (for production shielded transactions, can be mocked via `.env`)

### 1. Clone & Install
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env` in both `frontend/` and `backend/` directories.

In `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zbounty
JWT_SECRET=your_jwt_secret
USE_MOCK_ZCASH=true # Set to false to interact with real Zingo CLI
```

### 3. Run Locally (Without Docker)

Start Backend:
```bash
cd backend
npx nodemon src/server.ts
```

Start Frontend:
```bash
cd frontend
npm run dev
```

## Usage Notes

ZBounty provides an end-to-end workflow for creating and fulfilling privacy-focused bounties. Here is a typical flow:

1. **Connect Wallet**: Click "Connect Wallet" on the landing page to authenticate your session.
2. **Create Bounty**: Click "Post a Bounty". Fill in details and select "Shielded Deposit" to boost your initial Privacy Score.
3. **Escrow Funds**: Simulate depositing ZEC to the backend escrow. The Bounty Status will change to Open.
4. **Submit Work**: Navigate to the Bounty Details page and submit a link to your work (e.g., GitHub URL).
5. **Shielded Payout**: As the bounty creator, select the winning submission from your Dashboard and trigger a shielded payout. 
6. **Privacy Score**: Watch the Privacy Score animate to `100/100` and unlock the **"Privacy Champion"** gold badge!

## API Documentation

- `POST /api/auth/login`: Login with Wallet Address.
- `GET /api/bounties`: Fetch all bounties.
- `POST /api/bounties`: Create a new bounty.
- `POST /api/bounties/:id/fund`: Confirm deposit and update privacy score.
- `POST /api/bounties/:id/payout`: Execute shielded transaction and release funds.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built for the 2026 ZecHub Hackathon.