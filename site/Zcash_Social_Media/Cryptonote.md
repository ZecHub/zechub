# Zero to Zero Knowledge: CryptoNote Protocol

**Series:** Zero to Zero Knowledge

An interesting one today!  
The **CryptoNote** protocol enables strong on-chain privacy. Today we learn all of its key features and how it has been implemented by several notable privacy projects.

![CryptoNote intro](/content-images/FrXr5P8WIAAvx36-88db0c8250.webp)

---

## Background

The original CryptoNote whitepaper was published under the pseudonym **"Nicolas van Saberhagen"**.  

**Bytecoin** was the first cryptocurrency to implement the protocol. The most well-known project using it today is **Monero (XMR)**. It has also been used in TurtleCoin, Aeon, and several others.

---

## Core Features of CryptoNote

The CryptoNote Protocol provides three main features:

1. **Untraceability and Unlinkability** of transactions
2. **Egalitarian Proof of Work** (ASIC resistant) 
3. **Dynamic emission**

---

## 1. Untraceability - Ring Signatures

Untraceability is primarily achieved using **Ring Signatures**.

When sending a transaction, your real public key is mixed with several decoy keys (the "ring") - all containing the same amount of coins. This makes it extremely difficult to determine who actually sent the coins.

**Ring size** significantly affects the anonymity set. Larger rings provide better privacy.

![Ring Signatures explanation](/content-images/FrXteGHXgAANE0F-f11593a0d9.webp)

**Comparison with Zcash**:  
Zcash’s anonymity set is the total number of transactions *ever* made in a given shielded pool (much larger than typical CryptoNote ring sizes).

---

## Ring CT (Confidential Transactions)

The **Ring CT** model greatly improved privacy in CryptoNote-based coins.

Instead of only hiding the sender, Ring CT also **obfuscates the transaction amounts** between sender and recipient.

![Ring CT diagram](/content-images/FrXuivgWYAAze7B-260071c1b3.webp)

It uses:
- Elliptic Curve Cryptography
- Pedersen Commitments
- Homomorphic Encryption

**Proofs** are used to show that the amount is greater than 0 and within valid ranges **without revealing the actual values**.

**Stealth Addresses** also add one-time use addresses for the recipient.

![Stealth Addresses + Proofs](/content-images/FrXut5aWAAMhuRb-f3ce8ea3fd.webp)

---

## 2. Egalitarian Proof of Work (ePoW)

CryptoNote aims to create a fairer mining system by being resistant to ASICs.

It uses the **CryptoNight** algorithm (a memory-hard function). Unlike Bitcoin’s SHA256, CryptoNight is designed to close the gap between CPU, GPU, and ASIC miners.

**CryptoNight steps:**
1. Initialize a large area of memory (scratchpad) with pseudorandom data
2. Perform numerous read/write operations on the scratchpad
3. Hash the entire scratchpad to produce the final value

![CryptoNight mining](/content-images/FrXvNs3XsAA37LG-5779657f5c.webp)

(Note: Monero has since moved away from CryptoNight to other algorithms.)

---

## 3. Dynamic Emission

Instead of sudden halving events (like Bitcoin), CryptoNote uses a **smoothly decreasing block reward**.

This creates a much smoother emission curve over time.

![Dynamic emission curve](/content-images/FrXv8wpXoAEjUxW-e2bbaebced.webp)

**Zcash Connection**:  
Zcash developers have discussed implementing a smoother emission curve in the future, potentially through a "Zcash Posterity Fund".

---

## Conclusion

CryptoNote has proven to be a strong and battle-tested approach to on-chain privacy. Many of its innovations have influenced the broader privacy coin ecosystem.

Some researchers believe CryptoNote features could eventually be combined with trustless zero-knowledge shielded pools.

---

**Original Thread by ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*This page was compiled from the original Zero to Zero Knowledge thread for the ZecHub wiki.*
