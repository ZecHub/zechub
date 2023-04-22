# Viewing Keys

Shielded addresses enable users to transact while revealing as little information as possible on the Zcash blockchain. What happens when you need to disclose sensitive information around a shielded Zcash transaction to a specific party? Every shielded address includes a viewing key. Viewing keys were introduced in [ZIP 310](https://zips.z.cash/zip-0310) and added to the protocol in the Sapling network upgrade. Viewing keys are a crucial part of Zcash as they allow users to selectively disclose information about transactions.

### Why use a viewing key?

Why would a user ever want to do this? From Electric Coin Co.'s blog on the matter...

*- An exchange wants to detect when a customer deposits ZEC to a shielded address, while keeping the “spend authority” keys on secure hardware (e.g., HSMs). The exchange could generate an incoming viewing key and load it onto an Internet-connected “detection” node, while the spending key remains on the more secure system.*

*- A custodian needs to provide visibility of their Zcash holdings to auditors. The custodian may generate a full viewing key for each of their shielded addresses and share that key with their auditor. The auditor will be able to verify the balance of those addresses and review past transaction activity to and from those addresses.* 

*- An exchange may need to conduct due diligence checks on a customer who makes deposits from a shielded address. The exchange could request the customer’s viewing key for their shielded address and use it to review the customer’s shielded transaction activity as part of these enhanced due diligence procedures.*

### How to find your viewing key

#### zcashd

* List all known addresses using ` ./zcash-cli listaddresses`

* Then issue the following command for either UA's or Sapling shielded addresses

  `./zcash-cli z_exportviewingkey "<UA or Z address>"`

#### ywallet

* On the top right corner select "Backup", Authenticate your phone, then simply copy your viewing key that is displayed.

### How to use your viewing key

#### zcashd

* Use the following with any vkey or ukey: 

`./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000`

#### ywallet

* In the top right corner, select "Account", click on "+" in the bottom right corner to add and import your viewing key to add your 'read-only' account.

![myViewKey](https://user-images.githubusercontent.com/81990132/208585568-46065002-6682-4ff4-ae8b-d206205b5d9b.png)


#### zcashblockexplorer.com

* Simply point your browser to [here](https://zcashblockexplorer.com/vk) and wait for the results! note: this result is now on the zcashblockexplorer node and thus you're trusting this info with the owners of zcashblockexplorer.com

### Resources

While a great technology, it's recommended that you use viewing keys on an as needed basis.

Check out this tutorial on viewing keys. A list of resources on the subject is below if you want to dive deeper:

- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
