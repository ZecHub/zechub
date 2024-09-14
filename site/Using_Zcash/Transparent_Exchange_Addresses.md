# What are Zcash TEX addresses?

ZCash TEX addresses represent a unique type of receiving address. To send funds to a TEX address, they must first come from Transparent Addresses. Importantly, it is not possible to send funds directly from a Shielded Address to a TEX address. In practical terms, you will need to transfer funds from your Shielded Balance to one of your Transparent Addresses and then onward to the recipients TEX address. 

Upon detecting a TEX Address, Zashi wallet is able to send funds from the shielded pool to an ephemeral (temporary transparent address) to then automatically deposit into the TEX Address. 

The technical proposal for TEX addresses is outlined in Zcash [ZIP 320](https://zips.z.cash/zip-0320), which defines an address type exclusively for receiving funds from Transparent Addresses.

![TEX](https://i.ibb.co/8m7HPqV/ZashiTex.png)

## When do I need a TEX address

You need a TEX address when you are to send funds to a centralized exchange, that only supports funds coming from a **transparent source**. 

With a TEX, a user's wallet has the possibilty to "understand" that all the funds sent to that address must be transparent, and exclude every shielded value from being sent to said address.

That way, if an exchange like Binance rejects the sent value, it has the necessary means to return said value back to the address it came from. It also helps entities like Binance to comply with the laws and regulations imposed by governments or other authorities.

Although a TEX is not broadly needed, and maybe not every Zcash user will require to use one, it is recommended that every app or wallet in the Zcash ecosystem includes support for this address type, to maximize compatibilty between the different apps and services inside the ecosystem.


## Which wallets support TEX Addresses?

You can view the most up to date list on our [wallets](https://zechub.wiki/wallets) page. Use the **TEX Address Filter.**

## Exchanges that support this type of address
Currently, [Binance](https://www.binance.com/) is the only Centralized Exchange supporting and offering TEX addresses. However, experience between users has been random, with some getting a TEX assigned right away, and others not being able to get one, being stuck with their current t1 transparent address.

