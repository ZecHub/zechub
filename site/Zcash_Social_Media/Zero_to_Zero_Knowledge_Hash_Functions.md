# Zero to Zero Knowledge: Hash Functions

**Series Introduction**  
Welcome to a new series: **Zero to Zero Knowledge**!  

In this series we will learn the fundamentals on a wide range of technologies that go into our privacy-preserving protocols.

---

## Part 1: Hash Functions

Today we start with **Hash Functions** - a key piece of cryptography used in blockchains. Later in this series we'll cover some topics that rely on their properties.

### What is a Hash Function?

Hash Functions take an input of any length and produce an output of a fixed length.

- **Message to be hashed** = Input  
- **The algorithm that is used** = Hash Function  
- **Resulting output** = Hash Value  


![Hash Function diagram](https://pbs.twimg.com/media/Fn_NkFHXgAEtgse.png)

### Try it yourself!

Let's get a hands-on understanding using this tool!  
Enter any arbitrary text to produce a fixed-length output. Observe how the output varies depending on the different hashing algorithm.

**Try it out:** https://cryptii.com/pipes/hash-function

---

### Properties of Cryptographic Hash Functions

Cryptographic Hash Functions must have these **3 properties**:

1. **One-way** - It should be infeasible to reverse a hash function  
2. **Collision Resistant** - Two different inputs must not hash to the same output  
3. **Deterministic** - For any input, a hash function must always give the same result

---

### Common Hash Functions

There are several classes of Hash Functions. Some examples:

- Secure Hashing Algorithm (**SHA-3**)  
- Message Digest Algorithm 5 (**MD5**)  
- **BLAKE2b** - Used in Zcash key derivation

**An introduction to BLAKE2 by Zooko**: https://www.zfnd.org/blog/blake2/

---

### Real-World Uses of Hash Functions

#### 1. Integrity Hashing (Data Integrity Checks)
Data integrity checks are an example of "Integrity Hashing". They are used to generate checksums on data files and provide assurance of correctness to a user.

![Integrity Hashing example](https://pbs.twimg.com/media/Fn_Or0MWIAI6sgx.png)

#### 2. Merkle Trees (Hash Trees)
A **hash tree** or **Merkle tree** is composed of branches and leaf nodes that are labelled with the cryptographic hash of a data block.

![Merkle Tree diagram](https://pbs.twimg.com/media/Fn_O7ndWIAY5PA-.jpg)

Merkle trees are an example of a **cryptographic commitment scheme**. The tree Root is seen as a commitment and leaf nodes proven to be part of the original commitment.

They verify data stored or transferred on P2P networks, ensuring data received from peers is unaltered.

#### 3. Note Commitment Tree in Zcash
In Zcash **Sapling** & **Orchard** shielded pools, the **Note Commitment Tree** is used to verify transactions are valid against consensus while perfectly hiding the sender, recipient & amounts consumed.

#### 4. Signature Hash (Bitcoin-style blocks)
**SHA256** is an example of a "Signature hash" used to enforce immutability of each block in the Bitcoin chain. Miners use the hash of previous block + A hash of all transactions in the current block (hashMerkleRoot) + Timestamp + random value / network difficulty for new blocks.

![SHA256 block diagram](https://pbs.twimg.com/media/Fn_PaVZXoAApHPf.jpg)

#### 5. Equihash (Zcash Mining)
**Equihash** is the hashing algorithm used in mining Zcash. It's also used by networks such as Komodo & Horizen.

**Original Zcash Blog on Equihash**: https://electriccoin.co/blog/equihash/

---

### Further Reading

To build a greater understanding of the different types of hash functions and their associated uses, this is an excellent resource:  
https://en.wikipedia.org/wiki/Hash_function

---

**Thread by ZecHub (@ZecHub)**  
Original X thread: https://x.com/ZecHub/status/1621240109663227906  

---

*This page was compiled from the original Zero to Zero Knowledge thread for the ZecHub wiki. Perfect for HackMD or direct upload to the repo.*
