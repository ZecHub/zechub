<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mining and staking privacy

Your miner payout and your finalizer are not the same thing. The chain never links them. That is useful, and it is easy to waste.

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:20px 0;">
  <div style="border-radius:12px;padding:16px;background:#ecfdf5;border:1px solid #a7f3d0;">
    <div style="font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:#047857;">Miner</div>
    <div style="font-size:18px;font-weight:650;margin-top:4px;">Transparent payout</div>
    <div style="margin-top:6px;color:#065f46;">Coinbase pays a Zcash address. A t-address history is public.</div>
  </div>
  <div style="border-radius:12px;padding:16px;background:#eff6ff;border:1px solid #bfdbfe;">
    <div style="font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:#1d4ed8;">Finalizer</div>
    <div style="font-size:18px;font-weight:650;margin-top:4px;">zfinv1 key</div>
    <div style="margin-top:6px;color:#1e3a8a;">An ed25519 key. It signs votes. It is not a Zcash address.</div>
  </div>
  <div style="border-radius:12px;padding:16px;background:#fff7ed;border:1px solid #fed7aa;">
    <div style="font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:#c2410c;">Bond</div>
    <div style="font-size:18px;font-weight:650;margin-top:4px;">Shielded stake</div>
    <div style="margin-top:6px;color:#9a3412;">Lives in the staking pool. Names a target finalizer.</div>
  </div>
</div>

## The order that matters

<div style="border-radius:12px;padding:16px 18px;background:#f8fafc;border:1px solid #e2e8f0;margin:16px 0;">
  <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-weight:650;">
    <span style="background:#0f766e;color:white;border-radius:999px;padding:4px 10px;">1 Mine</span>
    <span style="color:#94a3b8;">→</span>
    <span style="background:#1d4ed8;color:white;border-radius:999px;padding:4px 10px;">2 Shield</span>
    <span style="color:#94a3b8;">→</span>
    <span style="background:#b45309;color:white;border-radius:999px;padding:4px 10px;">3 Bond</span>
  </div>
  <p style="margin:10px 0 0;">Skip the shield and the private step never happens. A bond does not erase a transparent coinbase.</p>
</div>

## What is public

| Thing | Public? | Why |
|---|---|---|
| Miner t-address and coinbase history | Yes | Normal transparent outputs |
| Finalizer key and zfinv1 | Yes, once on the roster | It has to be, to verify votes |
| Voting power and reward bank | Yes | Published against the finalizer key |
| Which transparent address funded a bond | No, after a shield | The bond spends shielded notes |
| Link from your miner to your finalizer | Not on chain | Nothing in the protocol writes it |

## Stake to yourself, or to someone else

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin:16px 0;">
  <div style="border-radius:12px;padding:16px;border:1px solid #e2e8f0;">
    <div style="font-weight:650;">Bond to your own finalizer</div>
    <p style="margin:8px 0 0;">Simplest. You keep the operator role and the bond. An observer still cannot prove the t-address and the zfinv1 are one person from chain data alone.</p>
  </div>
  <div style="border-radius:12px;padding:16px;border:1px solid #f59e0b;background:#fffbeb;">
    <div style="font-weight:650;">Bond to another member</div>
    <p style="margin:8px 0 0;">The voting power shows under their key. They earn the 10% active-finalizer commission. You keep the 90% that accrues on the bond. This is the pattern that breaks the obvious guess.</p>
  </div>
</div>

A group can mine on separate payout addresses, shield, and bond across members. That makes “this miner is this finalizer” much harder to claim. It does not hide who the finalizers are, and it does not hide the mining.

## What this does not do

<div style="border-radius:12px;padding:14px 16px;background:#fef2f2;border:1px solid #fecaca;margin:16px 0;">
  <div style="font-weight:650;color:#b91c1c;">Not hidden</div>
  <ul style="margin:8px 0 0;">
    <li>Who the finalizers are</li>
    <li>How much voting power each one has</li>
    <li>Your transparent mining history</li>
    <li>A link you create off-chain: one IP, one payout pattern, one operator</li>
  </ul>
</div>

The target zfinv1 is inside the staking action. Privacy here is about the source of the funds, not about hiding the destination key.

## Short version

Mine. Shield. Then bond. The miner address and the finalizer key stay unrelated unless you connect them yourself.
