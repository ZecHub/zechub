# ⚡ ZClash — 1v1 Quiz Duels Powered by Zcash

**Hackathon Category:** Games  
**Builder:** jerydam  
**Repo:** https://github.com/jerydam/Zclash  
**Demo Video:** [VIDEO_LINK — share in #zechub Discord too]  
**Live App:** https://zclash.vercel.app  
**License:** MIT  

---

## What Is ZClash?

ZClash is a peer-to-peer quiz dueling platform where players stake ZEC, answer fast, and the winner takes the full pool. No house edge. No middleman. Just skill, speed, and Zcash.

---

## How It Uses Zcash Mainnet

ZClash uses **live Zcash t-addresses** as the escrow and settlement layer for every duel:

- Each match generates a **unique Zcash t-address** to hold both players' stakes
- Both players send ZEC directly to that escrow address before the game starts
- Stakes are **verified on-chain** via `zcashd` / `zebrad` RPC before the match begins
- At game end, the **winner automatically receives the full pool** — no manual claim
- Ties trigger automatic refunds to both wallets
- Emergency refunds return stakes if a game expires without starting
- Built on Zcash's privacy-first philosophy — no KYC, no identity required, just a t-address

---

## How a Duel Works

```
1. Creator sets topic + stake amount
   ↓
2. Fresh escrow t-address generated for the duel
   ↓
3. Challenger joins and sees the escrow address
   ↓
4. Both players send ZEC to the escrow address
   ↓
5. Stakes verified on-chain via zcashd / zebrad
   ↓
6. Game starts — 3 rounds, AI questions, live scoring
   ↓
7. Game ends — winner auto-receives full pool
   (tie → both get refunded)
```

---

## Core Features

**Duel System**
- Public Lobby — browse and join open challenges from any player
- Private Invite — challenge a specific wallet address directly
- Stake Negotiation — propose and counter-offer stake amounts before the game starts
- Unique escrow t-address per duel, visible to both players before staking
- Auto-settlement on game end; tie refunds handled automatically
- 60-second forfeit grace period for disconnected players

**Quiz Engine**
- 3 rounds: Easy → Medium → Hard
- AI-generated questions (Kimi K2 → Gemini → Groq fallback chain)
- Speed-based scoring: `500 (base) + 500 × (time_remaining / time_limit)`
- Any topic — crypto, history, science, sports, pop culture
- Max score: 15,000 points across 15 questions

**Rankings & Tiers**

| Tier | Wins | Badge |
|---|---|---|
| Droplet | 0–100 | 💧 |
| Drizzle | 101–200 | 🌧️ |
| Downpour | 201–300 | ⛈️ |
| Torrent | 301–400 | 🌊 |
| Flood | 401+ | 🏆 |

Live leaderboard with rank delta, win rate display, and direct challenge buttons.

**Player Profiles**
- Zcash t-address as primary identifier
- Custom username and avatar
- Full match history with ZEC earnings
- Online/offline presence tracking

---

## Security Model

- **No private key custody** — players send ZEC directly to escrow addresses
- **Transparent escrow** — every escrow address is visible to both players before staking
- **No EVM risk** — no Solidity, no ABI exploits, no reentrancy attacks; escrow is managed server-side
- Emergency refunds if a game expires without starting
- No KYC or personal data collected — only Zcash t-addresses

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, Tailwind CSS, TypeScript |
| Backend | FastAPI, Python, asyncpg |
| Database | Supabase (PostgreSQL) |
| Real-Time | WebSockets (FastAPI native) |
| AI | Kimi K2 via OpenRouter → Gemini → Groq |
| Blockchain | Zcash (t-addresses, zcashd / zebrad RPC) |
| Deployment | Render (backend), Vercel (frontend) |

---

## Setup & Running Locally

### Prerequisites
- Python 3.11+
- Node 18+
- Access to a `zcashd` or `zebrad` RPC node

### Backend
```bash
git clone https://github.com/jerydam/Zclash
cd Zclash/backend
cp .env.example .env   # fill in your keys
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd Zclash/frontend
cp .env.example .env.local
npm install
npm run dev
```

### Required Environment Variables
```env
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
DATABASE_URL=
ZCASH_RPC_URL=
ZCASH_RPC_USER=
ZCASH_RPC_PASSWORD=
ZCASH_FEE_RECIPIENT=
KIMI_API_KEY=
GEMINI_API_KEY=
GROQ_API_KEY=
```

---

## Roadmap

- [x] 1v1 staked duels with ZEC escrow
- [x] AI question generation (Kimi, Gemini, Groq)
- [x] Real-time WebSocket gameplay
- [x] Public lobby + private invites
- [x] Rankings, tiers, and leaderboard
- [x] Stake negotiation flow
- [ ] Shielded ZEC support (z-addresses)
- [ ] Tournament mode (bracket-style)
- [ ] Mobile app (React Native)
- [ ] Zebrad migration (zcashd deprecation)
- [ ] Spectator mode

---

## Links

| | |
|---|---|
| GitHub | https://github.com/jerydam/Zclash |
| Live App | https://zclash.vercel.app|
| Leaderboard | https://zclash.vercel.app/ranks |


| Builder (Discord) | [jerydam_0] |
