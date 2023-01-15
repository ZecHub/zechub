# Frequently asked Questions

A list of topics with the most frequently asked questions about Zcash. For troubleshooting the Zcash client, please see [troubleshooting documentation](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

## What is Zcash?

Zcash is a digital currency with fast and confidential with low fees. Privacy is the central feature of Zcash. It has pioneered the use zero-knowledge proofs to protect users information by encrypting all transactions. There are several wallets you can download for instant, mobile, secure & private payments.

[Mobile Wallets](https://z.cash/wallets/)


## How can I acquire Zcash?

You can buy ZEC from cryptocurrency [exchanges](https://z.cash/exchanges). You can also purchase Zcash directly from another person in a peer-to-peer way. Use caution when exchanging with services and individuals that you are not familiar with. You can also acquire Zcash by mining Zcash. 


## What is the difference between Zcash & other cryptocurrencies?

Zcash is fundamentally more private than other cryptocurrencies such as Bitcoin or Ethereum. Zcash supports fast block times (75 seconds), low fees (default 0.0001 ZEC) and has regular upgrade schedules, which means this protocol is highly adaptable. A key feature is the optional privacy. Users are able to select whether a transaction is made on the Transparent or Shielded part of the blockchain. For more information see [here](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html)

## How is the Zcash protocol governed?

As a protocol, Zcash is governed by the Zcash Improvement Proposal process. The ZIP process provides an open venue and structure for collectively evaluating changes to Zcash. Anyone can submit a draft ZIP. Draft ZIPs are debated by the community at large, then accepted or rejected by the ZIP editors. Currently there are two ZIP editors — [Daira Hopwood](https://twitter.com/feministPLT) represents the Electric Coin Company and [Deirdre Connolly](https://twitter.com/durumcrustulum) represents the Zcash Foundation. Decisions from the ZIP process are written into the Zcash specification, as well as the software that runs the network. The changes are “ratified” on-chain when the majority of the network adopts the upgrade and doesn’t break consensus. 

## Where is my Transaction?

First read [our article](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629) on block explorers. Then check with [Zcash block explorer](https://zcashblockexplorer.com) noting that all transactions expire by default after ~25 minutes/20 blocks and funds are returned to the original sending address. 

If your transaction expires, the best thing to do is to try your transaction again with some possible modifications.

There may be various reasons why your transaction is not included in a block:

+ Loss of connectivity

+ Transaction fee too low

+ Network overload

+ Too many transparent inputs (transaction size too large)


We suggest trying your transaction again with:

+ Try again with a better connection


+ Use the standard fee (0.00001 ZEC)

+ Try again later, or increase the fee for high priority transactions

+ Use a minimal amount of inputs to limit the size, or increase the fee for large transactions



## Is Zcash really Private?

Yes, Zcash enables complete privacy for users by encrypting sender, amount and recipient data within single-signature transactions published to its public blockchain ledger, specifically for transactions involving shielded addresses. 

Zcash does not: encrypt data for multisignature, protect against correlations made with public transactions (for example, when Zcash is traded to/from another cryptocurrency) or obfuscate IP addresses. Further reading here: [A Shielded Ecosystem](https://electriccoin.co/blog/shielded-ecosystem)

___


## A few common misconceptions

+ Zcash has a backdoor?

  No, neither Zcash nor any other cryptographic algorithms or software we've made contains a backdoor, and they never will. 


+ Zcash is controlled by corporate interests?

   Incorrect. While Zcash has partnered with large companies and banks for research and outreach programs we remain committed to achieving its goal of    economic freedom & resiliency through decentralisation. Zcash has several organisations that retain a level of autonomy & therefore are not beholden to any single party. Instead working in together to promote self-custody of assets, funding independent node implementations and leading in regulatory education around defending digital privacy and protecting human rights. 




+ Zcash has limited privacy compared to other privacy coins
   
    No, the privacy gained from a privacy coin like Monero is reliant on it's use of decoys that obfuscate the source and destination of transactions. The transaction data is still accessible however. If an adversary were to spend enough time & resources monitoring the chain this type of privacy can be defeated. Zcash encrypts all transaction data and the same method of attack would not work. All transactions are indistinguishable within the shielded pool and therefore Zcash has a larger privacy set than any other digital currency. 

   [more information](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)
