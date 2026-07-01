<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# What a block explorer can see on Zcash

## TL;DR

- On Bitcoin, a block explorer shows everything: sender, receiver, and amount.
- On Zcash, that is only true for transparent (t-address) activity.
- An explorer can see money enter and leave the shielded pool, but not what happens inside it.
- Fully shielded (z to z) transactions reveal no sender, no receiver, and no amount.
- Any public "shield rate" figure is a floor, because fully private activity is invisible from outside.

---

## Two address types

Zcash has two kinds of addresses.

A **transparent address** starts with `t` and works like a Bitcoin address. Balances and payments are public.

A **shielded address** starts with `z` and is protected by zero-knowledge proofs. The network can confirm a shielded payment is valid without revealing the sender, the receiver, or the amount.

Because there are two types, value can move in four ways: transparent to transparent (t to t), transparent to shielded (t to z, called shielding), shielded to transparent (z to t, called deshielding), and shielded to shielded (z to z, fully private).

## What an explorer can see

A public explorer such as [Blockchair](https://blockchair.com/zcash) can clearly read:

- Any fully transparent (t to t) payment, end to end.
- Money entering the shielded pool (the transparent side and the amount).
- Money leaving the shielded pool (the transparent side and the amount).
- The total ZEC held in each shielded pool, which is public so the network can prove no coins were created from nothing.

In short, the edges of the shielded pool are visible. You can watch value cross in and out.

## What an explorer cannot see

A public explorer cannot read:

- Fully shielded (z to z) transactions. The sender, receiver, and amount stay hidden.
- The sender or receiver behind any shielded payment.
- The balance of an individual shielded address.
- What happens to funds once they are inside the pool.

Query the raw data and the shielded sender and receiver fields come back empty. The explorer is not hiding this by choice. It was never on the public chain in readable form. The information is encrypted, and only someone with the right viewing key can read it.

## Why it matters

**Your privacy comes from the cryptography, not from trusting a company.** A data provider cannot look inside a shielded transaction even if it wants to.

**Public shield-rate numbers undercount privacy.** Researchers can only measure what crosses the public boundary, so the real amount of private activity is at least what they report, and usually more.

**A bigger shielded pool protects everyone.** The more people who use shielded addresses, the larger the crowd any single private payment hides in. Using a shielded address helps protect you and everyone else in the pool.

## Put it into practice

- Use a wallet that defaults to shielded addresses, such as [Zashi](https://electriccoin.co/zashi/) or [Ywallet](https://ywallet.app/).
- When you receive ZEC at a transparent address, move it into a shielded address before you spend it.
- Pay to shielded addresses where you can. Every transparent payment is fully public; a shielded one is not.

## Resources

- [Zcash: privacy and security recommendations](https://z.cash/support/security/privacy-security-recommendations/)
- [A shielded ecosystem (Electric Coin Company)](https://electriccoin.co/blog/shielded-ecosystem/)
- [How Zcash technology works](https://z.cash/technology/)
- [Blockchair Zcash explorer](https://blockchair.com/zcash)

## Related pages

- [Zcash basics](/start-here/what-is-zec-and-zcash)
- [Wallets](/using-zcash/wallets)
- [Shielded pools](/using-zcash/shielded-pools)
- [ZK-SNARKs](/zcash-tech/zk-snarks)

---

*If you would like to add or suggest edits to this wiki page, please head to the [ZecHub GitHub repo](https://github.com/ZecHub/zechub) and submit a pull request.*
