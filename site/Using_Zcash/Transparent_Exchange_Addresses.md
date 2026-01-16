# What Are Zcash TEX Addresses?

Zcash TEX addresses represent a unique type of receiving address. An acronym for "Transparent Exchange" address, it is a **Unique**, Unified-type (bech32m) encoding of a single p2pkh Transparent address. 

Its sole purpose is to inform a compatible wallet to make a Transparent-Only (T -> T) transaction. 

The logic is as follows: Upon detecting a TEX Address, a compatible wallet decodes it to obtain the Transparent receiver it contains. The wallet then sends the required funds for the tx from the Shielded pool to a seperate, user-controlled, ephemeral Transparent address (Z -> T). It then sends those funds to the decoded Transparent receiver of the TEX address (T -> T).  

The technical proposal for TEX addresses is outlined in Zcash [ZIP 320](https://zips.z.cash/zip-0320), which defines an address type exclusively for receiving funds from Transparent Addresses.

![TEX](https://i.ibb.co/8m7HPqV/ZashiTex.png)


Although TEX addresses not are broadly adopted, Zcash users may be required to use them eventually.

## When Do I Need a TEX Address

### You **Need** a TEX address when sending funds to a Transparent address using a wallet that does not support sending directly to a Transparent address. 
Certain wallets simply don't allow for sending directly to a Transparent address and **the recipient may not provide a TEX equivalent**. So, **Converting** from a Transparent to a TEX address may be required at times. This can be achieved manually by running the reference implementation outlined in zip-320. A hosted instance of a **Transparent-to-TEX-Converter** can be found [HERE](https://690e9524c66a3ecac5d54eff--jade-brioche-873777.netlify.app/).

### You Need a TEX address when sending funds to a centralized exchange that **REQUIRES those funds come from a Transparent source**. 
Currently, [Binance](https://www.binance.com/) is the only Centralized Exchange using TEX addresses (and they are the primary reason for TEX creation). 
TEX addresses inform a compatible wallet that all the funds sent to that address must be transparent and exclude every shielded value from being sent to said address.
If an exchange like Binance rejects the sent value, it has the necessary means to return that value back to the address it came from. It also helps entities like Binance to comply with the laws and regulations imposed by governments or other authorities.


## Which wallets support TEX Addresses?

You can view the most up to date list on our [wallets](https://zechub.wiki/wallets) page. Use the **TEX Address Filter.**
