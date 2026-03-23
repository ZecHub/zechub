# Zero to Zero Knowledge: Trusted Execution Environments (TEEs)

**Series:** Zero to Zero Knowledge

Zero to Zero Knowledge is back with a new topic!  
This week we explore **Trusted Execution Environments (TEEs)** - how they are used in privacy coins and other blockchain applications.

![Trusted Execution Environments intro](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## TEEs and Blockchains: Complementary Properties

Blockchains and TEEs have very complementary strengths:

- **Blockchains** guarantee availability, state persistence, and allow public verification of the entire state - but they have limited computation power.  
- **TEEs** can perform intensive computational tasks privately - but lack native state persistence.

Together they can create powerful privacy-preserving systems.

---

## Secret Network: TEE-Powered Privacy

**Secret Network** leverages TEE technology (specifically Intel SGX) to perform computation on encrypted inputs, outputs, and state.

Every validator node runs Intel SGX chips. The consensus and computation layers are combined:

- Transactions are processed inside secure enclaves.  
- Data is only decrypted **inside the TEE**.

This is different from Zcash, which uses **zero-knowledge proofs** for privacy. In Zcash, shielded transactions are broadcast and validated publicly with no additional data revealed to the network. Zcash Shielded Assets follow the same principle.

![Secret Network TEE diagram](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

For a detailed explanation of how TEEs are implemented on Secret Network, read this excellent article by @l_woetzel:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## How Secret Network Secures Keys and State

- The network's **consensus encryption seed** is stored inside each validator's TEE.  
- Contracts use unique unforgeable encryption keys.  
- Secret contracts run on the Cosmos SDK compute module but support encrypted inputs/outputs and state.

---

## Remote Attestation

**Remote Attestation** is the process of proving that an enclave is running in a genuine secure hardware environment.

It allows a remote party to verify:
- The correct application is running  
- The application has not been tampered with  
- It is executing securely inside an Intel SGX enclave

![Remote Attestation explanation](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

Enclaves also contain private signing and attestation keys that cannot be accessed from outside.

![Enclave key protection](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## Data Sealing

Since enclaves are stateless, data must sometimes be stored outside in untrusted memory.  

**Data Sealing** encrypts data inside the enclave using a key derived from the CPU. The encrypted block can only be unsealed on the **same system**.

![Data Sealing diagram](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Oasis Network

**Oasis Network** also uses TEEs through its confidential ParaTime (e.g. Sapphire and Cipher).

Encrypted data enters the TEE along with the smart contract. It is decrypted, processed, and re-encrypted before leaving the enclave.

![Oasis Network TEE flow](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## TEEs in Proof-of-Stake Networks

Many Proof-of-Stake blockchains (including Secret and Oasis) use **Tendermint** as their consensus framework.

For PoS validators:
- Keys must be managed securely and never exposed in plaintext.  
- Validators must stay online (downtime penalties apply).  
- Signing conflicting messages can lead to slashing.

**TEEs** are ideal for securely generating and using validator keys.

![Tendermint & PoS security](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## Zcash and Proof-of-Stake Research

Zcash is actively researching a migration to Proof-of-Stake.

- Read the research: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Watch this segment from a Zcash Foundation Community Call explaining different PoS designs and their privacy implications:
- 
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ&t=2742s"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**Original Thread by ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*This page was compiled from the original Zero to Zero Knowledge thread for the ZecHub wiki. Perfect for HackMD or direct upload to the repo.*
