# ZecAgent

**Track:** Infrastructure

**Team:** aliiqbal24

**Repository:** https://github.com/aliiqbal24/ZecAgent

**Documentation:** https://github.com/aliiqbal24/ZecAgent/blob/main/QUICKSTART.md

**npm install path:**

```bash
npx --yes zecagent@latest init --connect codex
```

## What it is

ZecAgent is a local MCP wallet and agent payment approval layer funded by shielded ZEC. It lets coding agents prepare verified payments while the user keeps local policy, dashboard approval, wallet control, spend limits, receipts, and confirmation checks.

The project is designed for agentic purchase flows where an agent researches a merchant, invoice, recipient, amount, and payment options, then prepares one policy-gated payment request. ZecAgent chooses a direct shielded ZEC route when a shielded-capable Zcash address is available, or a managed CrossPay route for supported non-ZEC crypto invoices.

## Why it matters

Agents can already research, shop, and operate software. The unsafe part is letting them move money. ZecAgent provides a narrow local payment interface where agents can prepare a payment, but policy, routing, approval, submission, and receipt tracking remain explicit and auditable.

It is built around private ZEC funding, shielded-capable address checks, local approval by default, and conservative payment state reporting. Agents are expected to report payments as pending, submitted, failed, or receipted rather than assuming completion.

## How it uses the Zcash network

ZecAgent creates or resumes a local Zcash wallet, prints a shielded ZEC receive address, tracks local wallet balance, and submits payments through the configured local wallet only after policy and user approval allow it.

Direct transfers require shielded-capable Zcash recipient addresses such as Unified Addresses, Sapling addresses, or testnet equivalents. Transparent-only `t1` and `t3` addresses are intentionally blocked for direct agent transfers.

For CrossPay routes, the local app remains non-custodial. The managed gateway brokers asset discovery, quotes, provider status, and deposit notification while the local wallet sends shielded ZEC only after the user approves the quoted route.

## Features

- MCP tools for agentic payments, direct shielded ZEC transfers, CrossPay asset discovery, CrossPay transfer preparation, and wallet state inspection.
- Local dashboard approval before funds move by default.
- Per-transaction, daily, and monthly spend limits.
- Shielded-capable Zcash address validation.
- Managed CrossPay fallback for supported crypto-denominated invoices when no shielded ZEC address is available.
- Receipt storage, confirmation tracking, and explicit failure reporting.
- Public npm packages for end-user installation without cloning or building from source.

## Setup

Install Node.js 20 or newer, then run:

```bash
npx --yes zecagent@latest init --connect codex
```

Use `--connect claude` for Claude Code, or `--connect all` for both Codex and Claude Code.

The init command installs the managed wallet dependency, creates or resumes the local wallet, prints a recovery seed and shielded ZEC receive address, writes MCP configuration, and starts the local dashboard and MCP HTTP server.

After funding the printed shielded ZEC address, restart the agent environment and ask the agent to prepare a payment with verified merchant or invoice evidence. Fresh installs require dashboard approval for every payment.

## Verification

The published ZecAgent repo currently passes:

```bash
npm test
npm run typecheck
npm run build
```

The test suite uses fake wallets/providers and does not submit real ZEC payments.

## License

MIT. Open source.
