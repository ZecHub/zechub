<a href="https://github.com/zechub/zechub/edit/main/site/zcash-use-case/Run_a_Private_Community_Treasury.md" target="_blank"><img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/></a>


# Run a Private Community Treasury with Zcash

Community treasuries — funds managed collectively by a group for shared goals — are a cornerstone of decentralized organizations, DAOs, open-source projects, and grassroots movements. But managing a treasury on a transparent blockchain exposes every decision, every payment, and every participant's financial activity to the world.

Zcash enables communities to manage their treasury privately while maintaining the accountability and transparency that members need. This guide shows you how to set up and operate a private community treasury using Zcash's shielded transaction capabilities.

---

## Why Communities Need Private Treasuries

### The Problem with Transparent Treasuries

When a community treasury operates on a transparent blockchain (like Ethereum or Bitcoin):

- **Every expenditure is public** — Anyone can see exactly how much was paid, to whom, and when
- **Contributors are exposed** — Donors' identities and contribution amounts are visible
- **Negotiation disadvantage** — Vendors and partners can see your total budget and spending patterns
- **Targeting risk** — Large treasury balances on public blockchains make communities targets for attacks
- **Member privacy** — Individual members' financial relationships with the treasury are exposed

### How Zcash Solves These Problems

- **Shielded treasury balance** — Total funds are invisible to outsiders
- **Private expenditures** — Payments to vendors, contributors, and grantees are not publicly traceable
- **Private contributions** — Donations to the treasury are shielded
- **Internal accountability** — Treasury managers and members with access can see all transactions
- **Protection from targeting** — No one can see how much the treasury holds

### Use Cases

- **DAO treasuries** — Decentralized autonomous organizations managing community funds
- **Open-source project funding** — Grants and bounties for developers
- **Community grants programs** — Distributing funds to members for projects
- **Mutual aid networks** — Pooling and distributing resources within a community
- **Political organizations** — Fundraising and spending in jurisdictions where financial privacy is important
- **Cooperative businesses** — Shared financial management among members

---

## Step 1: Multi-Signature Setup

A community treasury should never be controlled by a single person. Multi-signature (multisig) arrangements ensure that no individual can unilaterally move funds.

### Understanding Multisig for Zcash

Unlike Bitcoin's native multisig, Zcash doesn't have a built-in multisig protocol for shielded addresses. However, there are several approaches to achieve multisig-like security:

### Approach A: Shared Wallet with Policy (Recommended for Small Groups)

1. **Create a dedicated treasury wallet** — Use Ywallet or ZecWallet Lite
2. **Share the recovery phrase** among trusted members (e.g., 3-of-5 arrangement)
   - Split the 24-word seed phrase into shares using [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing)
   - Tools like [SLIP-39](https://slips.livecoin.net/slip-0039) support this natively
   - Each member holds a portion; a threshold (e.g., 3 of 5) is needed to reconstruct
3. **Establish governance rules** — Document how many signatures/approvals are needed for different transaction sizes
4. **Designate a transaction initiator** — One person prepares transactions; others review and approve before the seed phrase is reconstructed for signing

### Approach B: Hardware Wallet Multisig

For larger treasuries:

1. **Use multiple hardware wallets** — Each core member holds one hardware wallet (Trezor or Ledger) that supports Zcash
2. **Set up a policy** requiring multiple hardware wallet approvals for any outgoing transaction
3. **Trezor Model T** and **Ledger Nano X** both support Zcash
4. Transactions require physical access to multiple devices, providing strong security

### Approach C: Smart Contract Treasury (Advanced)

For communities building on Zcash's ecosystem:

1. **Use a smart contract platform** that supports Zcash (when available)
2. **Deploy a multisig contract** with defined governance rules
3. **Automate approval workflows** through on-chain voting

### Implementing Shamir's Secret Sharing

1. Choose a tool that implements SLIP-39:
   - [Trezor Suite](https://trezor.io/trezor-suite/) — Built-in support
   - [Ian Coleman's SLIP-39 tool](https://iancoleman.io/slip39/) — Online (use offline for security)
2. Generate shares with your desired threshold (e.g., 3-of-5)
3. Distribute shares to trusted members
4. Store each share securely
5. To access funds, the required number of members must combine their shares

---

## Step 2: Proposal and Voting Process

A private treasury needs a transparent (to members) governance process for deciding how to spend funds.

### Creating a Proposal

A standard treasury proposal should include:

1. **Proposal title** — Clear and descriptive
2. **Requestor** — Who is requesting the funds
3. **Amount** — How much ZEC is requested
4. **Purpose** — What the funds will be used for
5. **Timeline** — When the funds are needed
6. **Deliverables** — What the community gets in return
7. **Budget breakdown** — Detailed cost breakdown

### Proposal Template

```
PROPOSAL: [Title]
─────────────────────────────────────
Requestor: [Name/Pseudonym]
Amount Requested: [X.XX ZEC] (≈ $[USD])
Purpose: [Description]
Timeline: [Start date] to [End date]
Deliverables:
  - [Deliverable 1]
  - [Deliverable 2]
  - [Deliverable 3]

Budget Breakdown:
  - Item 1: [Amount]
  - Item 2: [Amount]
  - Total: [Total Amount]

Wallet Address: [zs1...] (shielded)
─────────────────────────────────────
```

### Voting Mechanisms

#### Option A: Simple Majority Vote

- Each member gets one vote
- Simple majority (>50%) approves the proposal
- Use a secure voting platform:
  - [Snapshot](https://snapshot.org/) — Off-chain voting (public but cheap)
  - Encrypted messaging polls (Signal, Matrix)
  - Dedicated governance platforms

#### Option B: Quadratic Voting

- Members receive voting credits
- Cost of additional votes increases quadratically
- Prevents whale dominance while allowing strong opinions to carry more weight

#### Option C: Delegation

- Members delegate voting power to trusted representatives
- Representatives vote on behalf of their delegators
- Delegators can reclaim their voting power at any time

### Voting Workflow

1. **Proposal submission** — Requestor submits proposal to the community forum
2. **Discussion period** — Community discusses for a set period (e.g., 7 days)
3. **Voting period** — Members vote for a set period (e.g., 3 days)
4. **Result announcement** — Results are published to the community
5. **Execution** — If approved, treasury managers process the payment

---

## Step 3: Fund Distribution

Once a proposal is approved, the treasury managers need to distribute funds privately.

### Payment Process

1. **Verify approval** — Confirm the proposal passed the vote
2. **Request the recipient's shielded address** — Must be a z-address (zs1 or u1)
3. **Verify the address** — Cross-check with the proposal and confirm with the recipient
4. **Reconstruct the wallet** (if using Shamir's Secret Sharing):
   - Gather the required number of seed phrase shares
   - Reconstruct the full seed phrase in a secure environment
   - Perform the transaction
   - Securely delete the reconstructed phrase
5. **Send the payment** — Use your wallet to send the approved amount
6. **Record the transaction** — Log the txid, amount, and purpose in the community's private records
7. **Notify the community** — Announce that the payment was processed (without necessarily revealing amounts publicly)

### Batch Payments

For efficiency when multiple proposals are approved:

1. **Batch all approved payments** into a single session
2. **Reconstruct the wallet once** (if using Shamir's Secret Sharing)
3. **Send all payments** in sequence
4. **Securely destroy** the reconstructed seed phrase
5. **Record all transactions** in the private ledger

### Milestone-Based Payments

For larger grants or contracts:

1. **Split the total amount** into milestone payments
2. **Define clear deliverables** for each milestone
3. **Release each payment** only after the previous milestone is verified
4. **Use unique addresses** for each milestone payment

---

## Step 4: Balancing Transparency and Privacy

A community treasury needs internal transparency (members can see what's happening) while maintaining external privacy (outsiders cannot).

### Internal Transparency Tools

1. **Shared private ledger** — A document (encrypted) that all members can access, recording:
   - All incoming contributions
   - All outgoing payments
   - Current balance
   - Proposal outcomes

2. **Regular financial reports** — Monthly or quarterly summaries shared with members:
   - Total income during the period
   - Total expenditures
   - Category breakdown of spending
   - Current treasury balance

3. **Audit process** — Periodic audits by a trusted member or external auditor:
   - Verify that the wallet balance matches the ledger
   - Confirm all payments were properly authorized
   - Report findings to the community

### External Privacy

What the public sees:
- ❌ Treasury balance
- ❌ Individual transactions
- ❌ Contributor identities
- ❌ Recipient identities
- ❌ Payment amounts

What community members see:
- ✅ Full transaction history
- ✅ Current balance
- ✅ All proposal details
- ✅ All voting results

### Publishing Transparency Reports

Consider publishing a **transparency report** that shows:
- Number of proposals received
- Number of proposals approved/rejected
- Total funds distributed (without individual breakdowns)
- Categories of spending
- Impact metrics (projects funded, people helped, etc.)

This demonstrates accountability without compromising privacy.

---

## Step 5: Security for Community Treasuries

Treasury security is paramount — you're protecting not just your own funds, but the community's collective resources.

### Operational Security

1. **Use dedicated devices** for treasury management
2. **Enable full-disk encryption** on all devices that access the wallet
3. **Use strong, unique passwords** for all accounts
4. **Enable two-factor authentication** on all related accounts
5. **Regular security audits** — Periodically review access controls and procedures

### Access Control

- **Define roles clearly** — Who can propose, who can vote, who can execute transactions
- **Rotate access periodically** — Don't let the same people hold access indefinitely
- **Have an emergency procedure** — What happens if a key member becomes unavailable?
- **Document everything** — Clear procedures prevent disputes and confusion

### Emergency Procedures

1. **Member departure** — Process for redistributing seed phrase shares when a member leaves
2. **Compromised wallet** — Procedure for moving funds to a new wallet if security is breached
3. **Disputed transaction** — Process for handling disagreements about authorized spending
4. **Legal compliance** — Understanding your jurisdiction's requirements for community funds

### Insurance and Recovery

For large treasuries:
- Consider **crypto insurance** options if available in your jurisdiction
- Maintain **offline backups** of all critical information
- Have a **succession plan** for key roles
- Consider **professional custody** services for very large amounts

---

## External Resources

- [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) — Secret sharing scheme
- [SLIP-39 Specification](https://slips.livecoin.net/slip-0039) — Shamir backup standard
- [Trezor Suite](https://trezor.io/trezor-suite/) — Hardware wallet with SLIP-39 support
- [Snapshot](https://snapshot.org/) — Governance voting platform
- [BTCPay Server](https://btcpayserver.org/) — Can be adapted for treasury payments
- [Zcash Foundation Grants](https://grants.zfnd.org/) — Example of community grant program
- [Ywallet](https://ywallet.app/) — Recommended wallet for treasury management

---

## What's Next?

The final guide in this journey covers the most demanding privacy setup: **journalists and high-risk individuals** who need the strongest possible financial privacy to protect their sources and their safety.

→ **[Step 6: Journalist Privacy Setup](Journalist_Privacy_Setup.md)**
