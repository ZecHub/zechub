# Keeping records with shielded ZEC

## TL;DR

- Shielded funds are private, but you can still keep clean, complete financial records
- Memos act as line items in your ledger, such as an invoice number or what a payment was for
- A viewing key lets you, or someone you choose like an accountant, review your history without making it public
- You can total income and spending for any period, which is what you need for reporting or tax
- None of this weakens your privacy, because you decide who sees what

<br/>

## Who is this for?

- Freelancers and small businesses paid in ZEC
- Anyone who needs to keep books while staying private
- People preparing records for an accountant or for tax

<br/>

## The challenge

Privacy and record keeping can feel like opposites. If your transactions are shielded, the amounts and addresses are hidden from the public, so how do you keep proper books or show your income to an accountant?

With Zcash this is a false tradeoff. Shielded transactions hide your activity from everyone by default, but Zcash also gives you tools to disclose your own records to the people who need them, on your terms. You stay private to the world and open to your accountant at the same time.

<br/>

## Memos are your ledger

Every shielded (z to z) transaction can carry an encrypted [memo](/using-zcash/memos). For record keeping, the memo is where you write what the payment was for: an invoice number, a client name, a project code, or a short note like "March rent".

Because the memo travels with the transaction and is only readable by the parties involved, it becomes a private line item in your books. When you or your client include a clear memo on each payment, your transaction history turns into a usable ledger instead of a list of amounts with no context.

A simple habit: agree with clients to always include the invoice number in the memo. Later, matching payments to invoices becomes straightforward.

<br/>

## Reviewing your own history

To keep books, you need to see your own activity. Your wallet holds the keys that decrypt your shielded transactions, so your wallet can show you the full picture: dates, amounts, which were received, which were sent, and the memos attached.

This is the part the public cannot see, but you can, because the data is yours. Reviewing your history regularly, rather than at year end, keeps your records accurate and makes mistakes easier to catch.

<br/>

## Sharing records with an accountant

When you need someone else to see your shielded activity, such as an accountant or auditor, you do not have to hand over your spending keys or make anything public. You share a [viewing key](/zcash-tech/viewing-keys).

A full viewing key is read only. It lets the holder see incoming and outgoing transactions for an address, including amounts and memos, but it never lets them move your funds. That makes it the safe thing to give an accountant. They get exactly the visibility they need, your money stays under your control, and the rest of the world still sees nothing.

This is called selective disclosure, and it is one of the practical reasons shielded Zcash works for honest bookkeeping rather than against it.

<br/>

## Totaling for a period

For most reporting, you need totals over a span of time: how much you received this quarter, how much you sent, your net position. Since you can review your own full history, you can add these up for any period you choose, a month, a quarter, or a year.

Keeping memos consistent makes this easier, because you can group payments by what they were for, not just by date and amount.

<br/>

## A note on tax

Tax rules differ by country and change over time, so this is general information and not tax advice. In many places, receiving or disposing of cryptocurrency can have tax consequences, and you may be expected to keep records of what you received, when, and its value at the time.

The good news is that shielded Zcash does not stop you from meeting these obligations. You can keep complete private records, total them for the period your tax authority requires, and disclose them to an accountant or tax authority using a viewing key, without making your activity public. If you are unsure what your obligations are, speak to a qualified professional in your country.

<br/>

## Common mistakes to avoid

- Skipping memos, which leaves you with amounts and no context at year end
- Reusing one address for everything, which makes it harder to separate clients or purposes
- Waiting until tax season to review a year of history instead of keeping records as you go
- Sharing a spending key when a read only viewing key is all an accountant needs

<br/>

## Related pages

- [Memos](/using-zcash/memos) - how encrypted memos work
- [Viewing Keys](/zcash-tech/viewing-keys) - how to export and share read only access
- [Freelancer Privacy Setup](/zcash-use-cases/freelance-privacy-setup) - receiving income privately, the step before keeping records
