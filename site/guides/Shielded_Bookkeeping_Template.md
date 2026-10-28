<a href="https://github.com/zechub/zechub/edit/main/site/guides/Shielded_Bookkeeping_Template.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Shielded Transaction Bookkeeping Template

[Download the customizable CSV template](./Shielded_Bookkeeping_Template.csv). It can be opened in spreadsheet software or imported into an accounting workflow. The columns are a bookkeeping layout, not a wallet's official export schema.

> **Synthetic example data only.** Every name, invoice, transaction ID, date, amount, memo, and rate in the downloadable CSV is invented for illustration. The `SYNTHETIC-TXID-*` values are not valid transaction IDs. Replace or remove the example rows before use.

This guide shows how to normalize shielded wallet exports, match receipts to invoices, record memos and fees, and keep internal wallet movements separate from business income and expenses. Wallet versions and export fields change; retain the original export and check the current wallet documentation before relying on any field mapping.

## Protect wallet and business data

- Never put a seed phrase, spending key, or viewing key in this spreadsheet. A viewing key can expose transaction history; see [Exporting Transaction History from a Viewing Key](/guides/viewing-key-transaction-export) and [Viewing Keys](/zcash-tech/viewing-keys).
- Shielded transactions do not publicly reveal the sender or recipient. A memo may identify an invoice, but it is optional and is not proof of who paid.
- Memos and invoice references can contain customer or other confidential information. Keep the workbook and original exports access-controlled and encrypted; do not upload them to an online converter or shared spreadsheet unless that is appropriate for your records.
- Import memo and other free-text columns as text in spreadsheet software. Treat text from a wallet export as data, not as a spreadsheet formula.

## 1. Export and preserve the source

Export the relevant account and date range from your wallet. Keep an unchanged, dated copy of each original export, then do bookkeeping in a separate copy of the template. Record the wallet, account, export date, and source file in `wallet_account`, `source_export`, and `evidence_reference`.

ZODL and Zallet do not necessarily provide the same fields or file format:

- **ZODL:** the repository's [viewing-key export guide](/guides/viewing-key-transaction-export) documents its tax CSV as covering the previous calendar year and providing dates, amounts, fees, and a tag, but not transaction IDs, memos, or addresses; it also skips shielding transactions. Treat it as a limited summary, not a complete transaction ledger. Leave absent fields blank and use other records or an appropriate transaction-history export to fill gaps; do not invent a txid or memo.
- **Zallet:** the [viewing-key export guide](/guides/viewing-key-transaction-export) describes `z_listtransactions` as detailed but experimental and notes current viewing-key limitations. RPCs and their semantics can change while Zallet is in beta. Follow the current [Zallet documentation](https://zcash.github.io/zallet/) and note the exact RPC/export and version in `source_export`. Do not assume its output is a ready-made accounting CSV.

The template is a normalized ledger, not a format-specific importer. Map only fields whose meaning you have checked:

| Wallet export field (names vary) | Template column | Check before copying |
|---|---|---|
| Transaction ID / txid | `transaction_id` | Blank if unavailable; never fabricate an ID. |
| Timestamp / date | `date_utc` | Convert to UTC and mark the result with `Z`. If the source timezone is unknown, note the ambiguity instead of labeling the timestamp UTC. |
| Block height | `block_height` | Blank for unconfirmed or unavailable transactions. |
| Status / confirmations | `confirmation_status` | Preserve pending, confirmed, expired, or the wallet's actual status. |
| Kind / category | `transaction_type` and `direction` | Classify from the wallet's documented meaning; a wallet label is not automatically an accounting category. |
| Amount / value | `amount_zec` or `net_wallet_change_zec` | Check whether it means payment amount, account net change, or an amount including the fee. Do not copy one value into both columns without checking. |
| Fee | `network_fee_zatoshis_paid_by_wallet` | Record the amount paid by this wallet only, in zatoshis. Blank means unknown or not provided; `0` means verified zero. |
| Memo / message | `memo` | Copy only when available and relevant; preserve its text privately. |

Use one row per transaction per wallet account. `record_id` is your own stable bookkeeping identifier and can be used when an export has no transaction ID. Keep raw source files so every normalized value can be traced back.

## 2. Match incoming payments to invoices

1. Start with a confirmed incoming transaction. Enter its date, amount, account, source, and transaction ID if available.
2. Compare the payment against open invoices using amount, timing, invoice records, and any customer communication. Record the match in `invoice_id`, `counterparty`, `accounting_category`, and `evidence_reference`.
3. If the memo contains an invoice number, use it as a lead, then verify it against your invoice register. A shielded payment does not provide a public sender address, and a memo is not authenticated proof of identity.
4. If you cannot confidently identify the payer, mark the item for review in `reconciled` and describe what remains unresolved in `notes`. Do not force a match based only on a similar amount.

For example, a memo such as `INV-1042` may help locate an invoice, but should not replace checking your own invoice and payment records. The sample CSV's invoice and memo values are synthetic.

## 3. Record transaction memos

Copy a memo only from an export that actually includes it. Wallet exports may omit memos, return them separately, or expose only memos your viewing authority can decrypt. Do not infer that a blank memo means there was no memo on-chain.

Use `memo` for the actual relevant memo text and `business_purpose` for your own bookkeeping explanation. Keep these separate: a sender-supplied memo is not the same as your accounting classification. If you maintain a public-facing ledger or share records outside the finance team, consider replacing memo text with a restricted evidence reference.

## 4. Log fees without double-counting

Zcash fees are paid in ZEC. The conventional fee mechanism in [ZIP 317](https://zips.z.cash/zip-0317) is based on transaction logical actions: the marginal fee is **5,000 zatoshis per logical action**, with a **two-action grace threshold**. The conventional calculation is:

```text
conventional fee (zatoshis) = 5,000 × max(2, logical actions)
ZEC = zatoshis ÷ 100,000,000
```

So the conventional fee starts at 10,000 zatoshis (0.0001 ZEC); more complex transactions can cost more. ZIP 317's applicable revision and the wallet's fee policy matter, and users may override wallet behavior. This calculation is a reference for checking and understanding a fee, **not a replacement for the actual fee reported by the wallet**. For bookkeeping, record the actual fee paid by your wallet in `network_fee_zatoshis_paid_by_wallet`; leave it blank if unavailable and verify it from a trustworthy source rather than filling in the estimate.

Use `amount_zec` for the payment amount before the sender's fee, and `net_wallet_change_zec` for the signed change in that wallet's balance. For an outgoing payment, the latter may include the fee (for example, a 0.0725 ZEC payment plus a 10,000-zatoshi fee reduces the balance by 0.0726 ZEC). Do not add the fee again to that net balance change. If your accounting system records fees as a separate expense, split them into a separate journal entry exactly once.

On an incoming payment, the recipient normally does not pay the sender's transaction fee. Do not record the sender's fee as a cost of the receiving wallet. A blank fee is not the same as a zero fee.

## 5. Separate business activity from wallet movements

- **Revenue / expense:** classify the underlying business payment and link its invoice or receipt.
- **Self-transfer:** when you move ZEC between wallets you own, record the transfer consistently on both sides if tracking wallet balances. It is not new revenue or an expense. Account for any fee paid once.
- **Shielding:** moving your own ZEC into a shielded pool is an internal movement, not a sale or customer receipt. The shielded balance may not be visible in every export or account total. Confirm whether the wallet reports a net account change or separate pool legs before reconciling.
- **Pending or expired transaction:** keep the wallet's status and do not treat an unconfirmed outgoing payment as settled without following your accounting policy.

Do not sum `amount_zec` across internal-transfer rows as income. Reconcile the wallet balance using `net_wallet_change_zec`, taking care not to count both sides of a self-transfer as business activity.

## 6. Add fiat values and review

When your accounting policy requires a fiat value, record the currency, rate per ZEC, converted `fiat_amount`, and the rate source used on the transaction date. Keep enough precision for the ZEC amount and fee; round only according to your bookkeeping policy. The CSV's example rates are synthetic and are not price data.

Before closing a period:

- Check that every source transaction in scope is accounted for, including shielding and other internal movements.
- Reconcile opening balance + signed wallet changes to the closing balance for each tracked wallet.
- Investigate missing fees, duplicate transaction IDs, unmatched receipts, pending items, and unexplained balance differences.
- Confirm that fees and internal transfers have not been counted twice.
- Preserve the original exports, exchange-rate evidence, invoices, and receipts with access controls appropriate to the data.

This template is for record organization, not tax, accounting, or legal advice. Treatment of digital-asset receipts, fees, transfers, and valuations depends on jurisdiction and accounting policy; consult a qualified professional.

## CSV column reference

| Column | Use |
|---|---|
| `record_id` | Your stable row identifier, especially when a source has no transaction ID. |
| `transaction_id`, `date_utc`, `block_height`, `confirmation_status` | Transaction identity, timing, and state as supplied by the wallet. |
| `wallet_account`, `source_export` | Account and exact export/RPC plus version used. |
| `transaction_type`, `direction` | Normalized activity and whether it is an inflow, outflow, or internal movement. |
| `counterparty`, `invoice_id`, `memo` | Reconciliation details; may be blank and should be protected as private data. |
| `amount_zec` | Positive magnitude of the payment or movement, excluding the fee. |
| `network_fee_zatoshis_paid_by_wallet` | Actual integer fee paid by this wallet in zatoshis; blank if unknown. |
| `net_wallet_change_zec` | Signed balance change for this wallet, with a fee included when it affects the wallet balance. |
| `accounting_category`, `business_purpose` | Your classifications and explanatory notes, not wallet-provided facts. |
| `fiat_currency`, `fiat_rate_per_zec`, `fiat_amount`, `fiat_rate_source` | Optional valuation fields and source for the rate. |
| `evidence_reference`, `reconciled`, `notes` | Supporting records, review state, and unresolved questions. |

The example rows are not an official ZODL or Zallet export, accounting advice, or real transaction history. Remove them before entering actual records.

## Related

- [Exporting Transaction History from a Viewing Key](/guides/viewing-key-transaction-export)
- [Zallet](/zcash-tech/zallet)
- [Zcash transaction fees](/using-zcash/transactions)
