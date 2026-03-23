# Zero to Zero Knowledge: Mnemonic Seed Phrases

**Series:** Zero to Zero Knowledge

Mnemonic seed phrases underpin one of the most important aspects of cryptocurrency - **self-custody**.  
Today we learn how a seed phrase is generated and used in wallets.

---

## What are Mnemonic Seed Phrases?

Recovery phrases are defined by the **BIP-39** specification, the most common type of recovery phrase used today.

The creation of recovery phrases starts by generating **randomness**. More entropy means higher security. **128 bits** of entropy is considered sufficient for most users.

![Seed phrase concept](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

Depending on the length of initial entropy, the recovery phrase will be **12 to 24 words** long.

---

## Step-by-Step: How a 12-Word Seed Phrase is Generated

### 1. Generate Entropy
We start by generating **128 bits** of entropy.

### 2. Add Checksum
We hash the entropy using **SHA256**. The first few bits of this hash become the checksum.  
This gives us a unique fingerprint for our entropy.

![Entropy + Checksum diagram](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. Split into 11-bit chunks
The total 132 bits (128 entropy + 4 checksum) are separated into chunks of 11 bits.

### 4. Map to Wordlist
Each 11-bit sequence is converted to a decimal number (0-2047).  
BIP-39 wordlists contain exactly **2048 words** (English, Spanish, Chinese, etc.).

These numbers are used to find the corresponding word in the wordlist.

![Word mapping example](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

**Result:** We now have a secure, human-readable 12-word recovery phrase!

---

## From Recovery Phrase -> Seed -> Payment Addresses

Using the recovery phrase, a wallet can generate keys to create payment addresses and different wallet accounts.

Keys generated are **deterministic** - the same input always produces the same output.

### Seed Generation
The wallet seed is derived from the mnemonic phrase using a **Key Derivation Function (KDF)**:

- In **Bitcoin**: PBKDF2  
- In **Zcash**: Blake2b-256/512

This produces a **64-byte (512-bit)** seed.

![Seed to master keys](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### Master Keys
The seed is split into two 32-byte sequences:
- **Master Spending Key**
- **Master Chain Code**

These are used in **Hierarchical Deterministic (HD) Wallets** for child key derivation.

---

## Zcash Specific Features (ZIP-32)

In Zcash, **viewing authority** or **spending authority** can be delegated independently for sub-trees without compromising the master seed.

**ZIP-32** defines the hierarchical deterministic key generation standard adapted for Zcash's privacy features.

From an **Expanded Spending Key** we derive:
- Full Viewing Key
- Incoming Viewing Key
- Set of payment addresses

Different derivation mechanisms produce external addresses suitable for giving out to senders across shielded pools (Sapling & Orchard).

![Zcash key derivation hierarchy](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

Zcash also supports **internal addresses** for wallet operations such as Auto-Shielding.

---

## Resources

- [ZIP-32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032)  
- [Zcash Protocol Specification (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Shielded-by-default wallets overview](https://zechub.wiki)

---

**Original Thread by ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*This page was compiled from the original Zero to Zero Knowledge thread for the ZecHub wiki.*
