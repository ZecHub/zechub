# What are Zcash TEX addresses

ZCash TEX addresses represent a unique type of receiving address. To send funds to a TEX address, they must first come from Transparent Addresses. Importantly, it’s not possible to send funds directly from a Shielded Address to a TEX address. In practical terms, you’ll need to transfer funds from your Shielded Balance to one of your Transparent Addresses and then onward to the recipient’s TEX address. The technical proposal for TEX addresses is outlined in Zcash [ZIP 320](https://zips.z.cash/zip-0320), which defines an address type exclusively for receiving funds from Transparent Addresses.

## Why do TEXs exist?
The Binance cryptocurrency exchange has a requirement that funds sent to their deposit addresses must originate from source addresses that can be easily identified using on-chain information. The solution proposed by developer and community member @hanh, was to create a wallet oriented solution, the Transparent-Source-Only Addresses, or TEX. This allows for the possibility of rejecting funds by sending them back to one of the source addresses if necessary. The purpose is to establish a standardized transparent address encoding and aims to prevent accidental shielded spends when sending funds to such addresses.

![TEX](https://github.com/user-attachments/assets/ac322d40-a8de-4260-a842-3226afc2bdc6)

## When do I need a TEX address

Technically, you need a TEX address when you are to send funds to a party, mainly a centralized exchange, that only supports funds coming from a transparent source. With a TEX, a user's wallet has the possibilty to "understand" that all the funds sent to that address **must** be transparent, and exclude every shielded value from being sent to said address.

That way, if an exchange like Binance _rejects_ the sent value, it has the necessary means to return said value back to the address it came from. It also helps entities like Binance to comply with the laws and regulations imposed by governments or other authorities.

Although a TEX is not broadly needed, and maybe not every Zcash user will require to use one, it is recommended that every app or wallet in the Zcash ecosystem includes support for this address type, to maximize compatibilty between the different apps and services inside the ecosystem.

## Exchanges that support this type of address
Currently, [Binance](https://www.binance.com/) is the only Centralized Exchange supporting and offering TEX addresses. However, experience between users has been random, with some getting a TEX assigned right away, and others not being able to get one, being _stuck_ with their current t1 transparent address.

Hopefully this will change soon, and other CEXs will start offering TEXs when necessary.
