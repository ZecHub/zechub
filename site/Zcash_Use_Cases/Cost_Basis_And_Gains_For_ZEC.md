# Understanding cost-basis and gains for ZEC

> **This is educational information, not tax or accounting advice.** Tax rules differ widely between countries and change over time. For your own situation, speak to a qualified tax professional or your local tax authority. This page explains the general concepts so you can have a more informed conversation.

## TL;DR

When you receive ZEC and later send or sell it, many tax systems treat that as a taxable event with a gain or a loss. Working out that gain means knowing two numbers: what the ZEC was worth when you got it (its **cost-basis**), and what it was worth when you let it go (the **proceeds**). Because shielded Zcash keeps amounts and dates private and off any public price feed, the responsibility for recording the price at each moment falls on you. This page explains the core concepts and points to a practical way to keep the records.

## Why this matters for ZEC holders

Most tax authorities that have published guidance treat cryptocurrency as property rather than as money. Under that treatment, simply holding ZEC is usually not a taxable event, but *disposing* of it often is. A disposal can include selling ZEC for fiat, swapping it for another asset, or in some jurisdictions spending it on goods and services.

Zcash adds one wrinkle that transparent chains do not have. On a public chain, anyone can look up the historical record of a transaction. With shielded ZEC, the amount, sender, and receiver are encrypted, which is the whole point. That privacy is a feature, but it means the data a tax calculation needs is not sitting on a public explorer waiting to be pulled. You hold that information, so you are the one who has to capture it at the time, while you still remember the details.

## The simplest case: when there is nothing to calculate

The section above hides a simple corollary worth stating plainly. If holding ZEC is usually not a taxable event and only disposing of it is, then the simplest possible position is the one where you never dispose at all. ZEC that you acquire and simply keep, without selling, swapping, or spending it, generally creates no realised gain and therefore nothing to compute. One unit of ZEC is still one unit of ZEC. There is a secondary point here too: value that stays in the shielded pool rather than being moved out also keeps contributing to the network's privacy set, which is good for everyone using shielded Zcash.

It would be dishonest, though, to present "just never sell" as practical advice for everyone. For many people, converting some ZEC to local currency is not optional. In places where the surrounding infrastructure for spending or earning in crypto is still thin, people need to cover real costs and are effectively forced to sell at some point. That reality does not disappear because it is inconvenient for a tax calculation. And the workarounds that promise to unlock value without selling, such as borrowing against your holdings through a lending protocol, carry their own risks that can be larger than the tax they help defer; they are not a free way around a disposal and should not be treated as one.

So the honest takeaway is twofold. Not transacting is genuinely the cleanest path from a record-keeping and tax standpoint, and it is worth knowing that the option exists. But most people will dispose of some ZEC eventually, which is exactly why the rest of this page is here: to make that case as understandable and well-recorded as the simple one.

## The two numbers behind every gain

A realised gain or loss comes from comparing two values.

**Cost-basis** is what the ZEC was worth at the moment it came into your hands, usually its fair market value in your local currency on that date, plus any acquisition fees. If you bought ZEC on an exchange, the cost-basis is roughly what you paid. If you were paid in ZEC for work, the cost-basis is generally the market value on the day you received it (and that same value is often counted as income at that point too).

**Proceeds** is what the ZEC was worth at the moment you disposed of it, again in your local currency, less any disposal fees.

The gain or loss is simply the proceeds minus the cost-basis. If the proceeds are higher, you have a gain. If they are lower, you have a loss, which in many systems can offset other gains.

A short illustration, using round numbers for clarity only. Suppose you received 1 ZEC when it was worth 200 of your local currency, and later sent it when it was worth 250. The cost-basis is 200, the proceeds are 250, and the gain is 50. The actual figures and rules that apply to you will depend on your jurisdiction.

## Matching what you spent: FIFO, LIFO, and average cost

If you only ever acquired ZEC once, the calculation above is all you need. In real life people acquire ZEC many times at different prices, then spend or sell part of it. When you dispose of some ZEC, which acquisition does it "come from"? You cannot tell physically, because one unit of ZEC is identical to another, so accounting uses a rule. Three common rules are:

**First in, first out (FIFO).** You treat the oldest ZEC you acquired as the first that leaves. This is the most widely accepted method and is the default or the requirement in many places.

**Last in, first out (LIFO).** You treat the most recently acquired ZEC as the first that leaves. Some jurisdictions allow this, others do not.

**Average cost.** You blend all your acquisitions into a single average price per unit and use that average for each disposal. Several countries use a form of averaging.

These methods can produce different gain figures from the exact same set of transactions, which is why the choice matters and why your jurisdiction may dictate which one you are allowed to use. The point here is only to understand that the methods exist and that they are not interchangeable for tax purposes.

## Holding period

Many tax systems care not only about the size of a gain but about how long you held the asset before disposing of it. A common pattern is that assets held beyond some threshold are treated differently from assets held only briefly. The threshold and the treatment vary by country, so rather than assume any particular rule, it is enough to record the acquisition date and the disposal date for each lot. The number of days between them is the holding period, and your tax professional can tell you what it means where you live.

## The Zcash-specific challenge: capturing price at the time

Here is the part that is unique to private money. To compute cost-basis and proceeds you need the market price of ZEC at the moment of each receipt and each disposal. On a transparent chain you can often reconstruct this after the fact from public data. With shielded ZEC the on-chain data is encrypted, so the cleanest source of truth is your own record made at the time.

In practice that means, for each transaction, capturing a few things while they are fresh: the date, whether ZEC came in or went out, the amount, and the market price in your local currency on that date. A short note on the purpose of the transaction is also useful, and Zcash gives you a natural place to store that, the encrypted memo, which is covered in the companion guide below.

You can record the price manually from a reputable price source for the relevant date, or use software that fetches historical daily prices for you. If you use an automated source, it is worth keeping the option to override a figure by hand, since a single wrong price quietly distorts every later calculation.

## Keeping the records in practice

The concepts above only help if the underlying records exist. A workable habit is to maintain a simple running log, one row per transaction, with: date, direction (received or sent), amount of ZEC, the local-currency price on that date, a reference or purpose, and the resulting cost-basis or proceeds once you compute it. A spreadsheet is enough for most individuals, and it is also the format an accountant will happily work from.

Two things make this far easier on Zcash specifically. First, memos let you attach the purpose of a payment (an invoice number, a category) directly to the transaction, so your log is not relying on memory. Second, viewing keys let you, or an accountant you choose, review the full history of your shielded activity read-only, without ever exposing the spending key. Both of these are covered in the companion guide, [Keeping records with shielded ZEC](https://zechub.wiki/zcash-use-cases/keeping-records-with-shielded-zec).

If your activity is heavy, dedicated accounting tooling can read your transaction history from a viewing key and apply a chosen cost-basis method automatically. Whatever tool you use, the principle is the same: the figures are only as good as the prices and dates you captured at the time.

## A note on honesty and limits

No method on this page should be read as a way to reduce a tax bill or as a statement of what any system requires. The methods are descriptions of how the arithmetic is commonly done, not recommendations. The right method, the right holding-period treatment, and whether a given action is even a taxable event all depend on where you live. Treat any number you produce yourself as an estimate to discuss with a professional, not a filed figure.

## Further reading

- [Keeping records with shielded ZEC](https://zechub.wiki/zcash-use-cases/keeping-records-with-shielded-zec) — memos as a ledger, reviewing your own history, and sharing read-only access with an accountant
- [Memos](https://zechub.wiki/using-zcash/memos) — how encrypted memos work
- [Viewing keys](https://zechub.wiki/zcash-tech/viewing-keys) — read-only access and selective disclosure
- [Transactions](https://zechub.wiki/using-zcash/transactions) — how Zcash transactions are structured
