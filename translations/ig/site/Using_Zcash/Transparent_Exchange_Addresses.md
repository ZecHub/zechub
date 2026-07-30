# Gịnị Bụ Adreesị Zcash TEX?

Adreesị Zcash TEX na-anọchite anya ụdị adreesị nnata pụrụ iche. Akara maka "Transparent Exchange" address, ọ bụ ** Unique **, Unified-type (bech32m) encoding nke otu p2pkh Transparent address. 

Nanị ebumnuche ya bụ ịgwa obere akpa dakọtara iji mee azụmahịa Transparent-Only (T -> T). 

The logic is as follows: Upon detecting a TEX Address, a compatible wallet decodes it to obtain the Transparent receiver it contains. The wallet then sends the required funds for the tx from the Shielded pool to a seperate, user-controlled, ephemeral Transparent address (Z -> T). It then sends those funds to the decoded Transparent receiver of the TEX address (T -> T).  

A na-akọwapụta atụmatụ teknụzụ maka adreesị TEX na Zcash [ZIP 320](https://zips.z.cash/zip-0320), nke na-akọwa ụdị adreesị nanị maka ịnata ego site na Adreesị Transparent.

[TEX](https://i.ibb.co/8m7HPqV/ZashiTex.png)


Ọ bụ ezie na adreesị TEX anaghị anabata nke ọma, ndị ọrụ Zcash nwere ike ịchọ ka ha jiri ha mee ihe n'ikpeazụ.

## Olee Mgbe M Kwesịrị Inweta Adreesị TEX

### You **Need** a TEX address when sending funds to a Transparent address using a wallet that does not support sending directly to a Transparent address. 
Certain wallets simply don't allow for sending directly to a Transparent address and **the recipient may not provide a TEX equivalent**. So, **Converting** from a Transparent to a TEX address may be required at times. This can be achieved manually by running the reference implementation outlined in zip-320. A hosted instance of a **Transparent-to-TEX-Converter** can be found [HERE](https://690e9524c66a3ecac5d54eff--jade-brioche-873777.netlify.app/).

### You Need a TEX address when sending funds to a centralized exchange that **REQUIRES those funds come from a Transparent source**. 
Ugbu a, [Binance](https://www.binance.com/) bụ naanị Central Exchange na-eji adreesị TEX (na ha bụ isi ihe kpatara okike TEX). 
TEX addresses inform a compatible wallet that all the funds sent to that address must be transparent and exclude every shielded value from being sent to said address.
If an exchange like Binance rejects the sent value, it has the necessary means to return that value back to the address it came from. It also helps entities like Binance to comply with the laws and regulations imposed by governments or other authorities.


## Kedu obere akpa ego na-akwado adreesị TEX?

Ị nwere ike ịhụ ndepụta kachasị ọhụrụ na [wallets](https://zechub.wiki/wallets) peeji. Jiri **TEX Address Filter.**
