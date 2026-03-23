# Zero to Zero Knowledge: Transparent vs Shielded Transactions & Unified Addresses

**Series:** Zero to Zero Knowledge

If you are learning about Zcash for the first time you will find there are two types of transactions available: **Transparent** and **Shielded**.  

Today we learn about them & cover one of the new features in the #Zcash ecosystem, **Unified Addresses**.

---

## Transparent vs Shielded Transactions

- **Transparent Transactions** use **t-addresses** (Base58 encoded). Everything is publicly visible - just like Bitcoin.  
- **Shielded Transactions** use addresses encoded for the **Sapling** or **Orchard** pools. These hide sender, receiver, and amount using zero-knowledge proofs.

**Shielded Transaction** refers to any transaction with addresses encoded for Sapling/Orchard pools.

![Transparent vs Shielded intro](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

**Unified Addresses (UAs)** are designed to **unify** shielded or transparent transactions into a single address.

---

## Address Types in Zcash

There are 3 types of address in use:

1. **(T) Transparent** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

The number of characters (and therefore QR code size) increases with each type.

![Address types comparison](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![QR code size comparison](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## How Unified Addresses Work

Addresses and keys are encoded as a byte sequence (**Raw Encoding**).  
A **Receiver Encoding** includes all necessary information to transfer an asset using a specific protocol.

The raw encoding of a Unified Address is a combination of encodings (typecode, length, addr) of receivers:

- UA: `0x03`  
- Sapling: `0x02`  
- Transparent: `0x01`  

**Important**: There must be **at least one shielded payment address** in every UA. (Sprout addresses are no longer supported after the Canopy upgrade.)

![UA encoding structure](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Full specification: **[ZIP-316: Unified Addresses](https://zips.z.cash/zip-0316)**

---

## Benefits of Unified Addresses

- **Easier for exchanges** - They can now support shielded deposits/withdrawals more safely.  
- **Future-proof** - New shielded pools can be added without breaking wallets.  
- **Shielded-by-Default** - Every UA contains at least one shielded address, so privacy is always available.

This is a fundamental shift that is already helping more ZEC move into the shielded pool.

---

## Orchard Transactions & Actions

Orchard introduced a new concept called **Actions**:

- They reduce leakage of metadata by using a **single anchor** for all Actions in a transaction.  
- They merge the fields of (V4) Spend + Output into a single value commitment.  
- This enables performance optimisations of the Halo2 proof system.

Daira explains Anchor positions (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Value Balance & Privacy

In some cases (e.g. cross-pool transactions) amounts may be visible to an outside observer. However, `valueBalanceSapling` and `valueBalanceOrchard` use **homomorphic commitments** to prove the total ZEC in shielded pools and prevent counterfeiting.

Read more: [Defense Against Counterfeiting in Shielded Pools](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Future Improvements

The ECC team is working on new RPC methods in `zcashd` (replacing `z_sendmany`) that will let users preview and accept/reject a proposed transaction based on its privacy characteristics.

---

## Recommendation

Try the latest version of **YWallet**!  
It already shows a "Transaction Plan" on screen before you hit send, helping you make more private choices.

Great article on transaction privacy: https://medium.com/@hanh.huynh/

---

**Original Thread by ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*This page was compiled from the original Zero to Zero Knowledge thread for the ZecHub wiki.*
