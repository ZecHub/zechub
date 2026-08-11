# Private information retrieval

## TL;DR

- Private information retrieval, or PIR, lets a device fetch one item from a server's database without the server learning which item was asked for
- Zcash needs this because a private wallet cannot ask a server which transactions are its own without giving itself away
- Today wallets download and scan far more data than they need, which is a major reason syncing is slow
- PIR would let a wallet fetch only its own data privately, removing that bottleneck while keeping privacy intact
- It is an active research area for Zcash, powerful in theory, and being made practical for real wallets

<br/>

## Who is this for

- Anyone who has wondered how a private wallet finds its own coins without leaking which ones
- Newcomers who keep seeing PIR mentioned alongside Zcash scaling work
- Readers who want the concept first and the cryptography underneath it second

<br/>

## The problem PIR solves for Zcash

Zcash hides who a transaction is for. That privacy creates an awkward question: if the network cannot see which transactions belong to you, how does your own wallet find them?

Today the answer is blunt. A wallet cannot ask a server which transactions are mine, because that question would reveal exactly what Zcash is trying to hide. So instead the wallet downloads a large amount of data and tests each item locally to see what belongs to it. It works, and it preserves privacy, but it is slow and heavy. This scanning is one of the main reasons wallet syncing can feel sluggish.

The ideal would be a way for a wallet to ask a server for precisely its own data, and receive it, without the server ever learning what was requested. That is exactly what private information retrieval provides.

<br/>

## What PIR is

Private information retrieval is a cryptographic method that lets a client read one entry from a server's database without revealing to the server which entry it read.

Imagine a library where you can receive the exact book you want, but the librarian never learns which book they handed you. You get your item, and your interest stays private. PIR is the mathematical version of that idea, applied to any database.

The concept has been studied in cryptography for decades. It was first introduced in 1995 by Chor, Goldreich, Kushilevitz, and Sudan, who described the multiple server approach, and the first single server version followed in 1997 from Kushilevitz and Ostrovsky. It is not something Zcash invented, it is an established field that Zcash is now applying to a real and stubborn problem.

<br/>

## How PIR works, at a first level

There are two broad ways to build PIR, and the difference matters.

The first uses multiple servers. The client sends each of several servers a piece of the query, and combines their answers locally. No single server sees enough to learn what was requested. This is efficient, but it depends on the servers not colluding with each other, which is hard to guarantee in the real world.

The second uses a single server and clever cryptography instead of multiple parties. Here the client relies on a special tool called homomorphic encryption, and this is the direction most useful for real deployments, because it does not need multiple non-colluding servers.

<br/>

## The mechanism: homomorphic encryption

Homomorphic encryption is a kind of encryption that lets a server compute on data while it stays encrypted. The server produces a correct encrypted answer without ever seeing the underlying values.

Here is the idea behind single-server PIR built this way. The client wants item number three out of a list. It builds a query that is, in effect, an encrypted yes for position three and an encrypted no for every other position. To the server, this query is just meaningless noise, it cannot tell which position holds the yes.

The server then combines its database with this encrypted query using the special properties of homomorphic encryption, multiplying each stored item by the matching encrypted yes or no and adding the results together. What comes out is a single encrypted package that contains exactly the item the client wanted, and nothing reveals which one it was. The client decrypts that package and reads its item. The server has answered the question without ever knowing the question.

A stronger version, called symmetric PIR, adds a second guarantee: the client learns only the item it asked for and nothing about any other entry in the database. That protects the database as well as the client.

<br/>

## A closer look for technical readers

Modern single-server schemes are built on lattice cryptography, most commonly the learning with errors assumption. The client's query is a vector of ciphertexts, an encryption of one at the target index and zero elsewhere, and the encryption is additively homomorphic, so the server can add ciphertexts and multiply them by plaintext database entries without decrypting.

The server treats the database as a matrix, applies the encrypted selection vector, and returns a single ciphertext that decrypts to the wanted row. Because the query is indistinguishable from random noise, the server gains no information about the index.

The historic obstacle has always been cost. Naively, the server must touch every entry in the database for each query, which is expensive in computation, and the ciphertexts are large, which is expensive in bandwidth. Recent research attacks this with preprocessing, schemes such as SimplePIR and FrodoPIR let the server prepare the database ahead of time and hand each client a small hint, pushing much of the work into an offline phase so that live queries become fast. A useful side benefit is that lattice-based constructions are also considered resistant to quantum attacks, which aligns with Zcash's wider move toward post-quantum privacy.

<br/>

## PIR in Zcash

PIR is part of the effort to make Zcash both private and fast at scale.

The wallet scanning bottleneck described earlier is the target. Work at the Valar Group is developing private information retrieval techniques so that a wallet can fetch its own data from a server without the server learning which entries were requested. One concrete application is checking nullifiers privately. A nullifier is a unique marker published when a note is spent, which stops the same funds being spent twice. A wallet often needs to check whether a given nullifier has appeared yet, in other words whether a note is still unspent, and doing that through a server today can leak which note is being asked about. Private information retrieval lets the wallet ask that question without revealing which nullifier it cares about. This sits alongside other scaling work, including Project Tachyon and new node software, aimed at removing the performance limits that hold back private wallets today.

It is important to be honest about the stage. This is active research and engineering, not a finished, shipped feature. The concept is well established and the direction is set, but making PIR efficient enough for everyday wallets on ordinary devices is exactly the hard part being worked on now.

<br/>

## Common misconceptions

- PIR hides which item you requested, it does not necessarily hide that you contacted the server at all, network-level metadata is a separate concern
- PIR is not unique to Zcash, it is a general cryptographic tool that Zcash is applying to wallet privacy
- Faster syncing from PIR is a goal in progress, not a feature already present in wallets
- Downloading everything and scanning locally, the current approach, is private but slow, PIR aims to keep the privacy while removing the slowness

<br/>

## Related pages

- [Zcash Wallet Syncing](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - why syncing works the way it does today
- [Lightwallet Nodes](https://zechub.wiki/zcash-tech/lightwallet-nodes) - the light client model PIR would improve
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - the other major cryptographic tool behind Zcash privacy
- [Post-Quantum Security](https://zechub.wiki/zcash-tech/post-quantum-security) - why lattice-based methods matter for the future
