# Viewing Keys

What happens when you need to disclose information around a shielded Zcash transaction to a specific party? You use a viewing key.

Viewing keys were introduced in [ZIP 310](https://zips.z.cash/zip-0310) and added to the protocol in the Sapling network upgrade.

Shielded addresses enable users to transact while revealing as little information as possible on the Zcash blockchain. But, viewing keys are a crucial part of Zcash as they allow users to selectively disclose information about transactions.

## Why use a viewing key?

Why would a user ever want to do this? From Electric Coin Co.'s blog on the matter...

*- An exchange wants to detect when a customer deposits ZEC to a shielded address, while keeping the “spend authority” keys on secure hardware (e.g., HSMs). The exchange could generate an incoming viewing key and load it onto an Internet-connected “detection” node, while the spending key remains on the more secure system.*

*- A custodian needs to provide visibility of their Zcash holdings to auditors. The custodian may generate a full viewing key for each of their shielded addresses and share that key with their auditor. The auditor will be able to verify the balance of those addresses and review past transaction activity to and from those addresses.* 

*- An exchange may need to conduct due diligence checks on a customer who makes deposits from a shielded address. The exchange could request the customer’s viewing key for their shielded address and use it to review the customer’s shielded transaction activity as part of these enhanced due diligence procedures.*

### Resources

While a great technology, it's recommended that you use viewing keys on an as needed basis.

Check out this tutorial on viewing keys. A list of resources on the subject is below if you want to dive deeper:

- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
