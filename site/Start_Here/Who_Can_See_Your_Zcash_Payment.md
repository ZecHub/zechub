<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Who Can See Your Zcash Payment?

## TL;DR

- Zcash gives you **two kinds of address**: transparent (`t`) and shielded (`z` or `u`).
- How much the public sees depends on which kinds your payment moves between.
- Only a **shielded to shielded** payment hides the sender, the recipient, and the amount.
- A shielded address is not one key. It is a small set of keys, and you can hand out **read-only access without giving away the ability to spend**.
- A viewing key **cannot be taken back** once you share it.

---

## The one thing to understand first

On most blockchains there is no choice to make. Everything you send is public, forever, to anyone who looks.

Zcash gives you a choice instead. That choice is made twice: **once when you pick which address to send to, and once when you decide who gets a key to read your history.**

The picture below covers both.

![Zcash key types and what a block explorer can see for each of the four transaction paths](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/who-can-see-your-zcash-payment.png)

---

## Choice one: which address

Every Zcash payment moves between two addresses, and each can be transparent or shielded. That gives four paths, and each leaks a different amount.

The pattern is simpler than it looks: **whatever touches a transparent address becomes public.** A payment that stays inside the shielded pool the whole way reveals nothing but the fee.

This matters most when you withdraw from an exchange. Many exchanges only send to transparent addresses, so the withdrawal is public. Shield the funds yourself once they arrive, before you spend them.

For a deeper look at exactly what an explorer reads, see [What a block explorer can see](/zcash-tech/what-a-block-explorer-can-see).

---

## Choice two: who gets a key

Privacy that you can never lift is not useful. Sometimes you need to prove something to an accountant, an auditor, or a tax office. Zcash handles this without asking you to give up control.

**Spending key.** Sees everything and moves funds. This is the money. It stays with you and is never shared with anyone, for any reason.

**Full viewing key.** Read-only. Shows incoming and outgoing activity and balances, but cannot spend a single zatoshi. This is what you hand to an auditor or accountant.

**Incoming viewing key.** Narrower still: it shows only payments arriving. An exchange or a merchant can run this to confirm your deposit landed, while the spending key stays on hardware that never touches the internet.

The order matters. Give the narrowest key that does the job, not the widest one you happen to have.

---

## The part beginners miss

**A viewing key cannot be revoked.** There is no "undo share" button. Once someone has it, they can read that address for as long as it exists. If you need to cut access off, you move your funds to a new address.

**Fees are public even in a fully shielded payment.** The amount is hidden; the fee is not.

**Public is permanent.** Anything the chain shows today, it shows in twenty years. Deciding to shield a payment *after* you sent it is not a thing you can do.

---

## Put it into practice

- Use a wallet that shields by default, such as [Zashi](https://electriccoin.co/zashi/) or [Ywallet](https://ywallet.app/).
- Shield funds as soon as they arrive from an exchange, before spending.
- Pay to shielded addresses whenever the receiver supports one.
- Before sharing a viewing key, ask which key is the smallest one that answers the question being asked.

---

## Resources

- [Explaining viewing keys (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [Selective disclosure and viewing keys (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: Viewing keys](https://zips.z.cash/zip-0310)
- [How Zcash technology works](https://z.cash/technology/)

## Related pages

- [Zcash basics](/start-here/what-is-zec-and-zcash)
- [Zcash new user guide](/start-here/new-user-guide)
- [What a block explorer can see](/zcash-tech/what-a-block-explorer-can-see)
- [Viewing keys](/zcash-tech/viewing-keys)
- [Transactions](/using-zcash/transactions)

---

*If you would like to add or suggest edits to this wiki page, please head to the [ZecHub GitHub repo](https://github.com/ZecHub/zechub) and submit a pull request.*
