# Gịnị Bụ Adreesị Zcash TEX?

Adreesị Zcash TEX na-anọchite anya ụdị adreesị nnata pụrụ iche. Akara maka "Transparent Exchange" address, ọ bụ ** Unique** , Unified-type (bech32m) encoding nke otu p2pkh Transparent address . 

Nanị ebumnuche ya bụ ịgwa obere akpa dakọtara iji mee azụmahịa Transparent-Only (T -> T). 

The logic is as follows: Upon detecting a TEX Address, a compatible wallet decodes it to obtain the Transparent receiver it contains. The wallet then sends the required funds for the tx from the Shielded pool to a seperate, user-controlled, ephemeral Transparent address (Z -> T). It then sends those funds to the decoded Transparent receiver of the TEX address (T -> T).  

A na-akọwapụta atụmatụ teknụzụ maka adreesị TEX n'ime Zcash . [ZIP 320 Ọ dịghị onye na-eme ya.](https://zips.z.cash/zip-0320), nke na-akọwa ụdị adreesị nanị maka ịnata ego site n'aka Adreesị Transparent.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)


Ọ bụ ezie na adreesị TEX abụghị nke a nabatara n'ọtụtụ ebe, ndị ọrụ Zcash nwere ike ịchọ ka ha jiri ya mee ihe.

## Olee Mgbe M Kwesịrị Ịnweta Adreesị Ozi TEX ?

### Ị **Chọrọ** adreesị TEX mgbe ị na-ezipụ ego gaa n'adres Transparent site na iji obere akpa nke anaghị akwado izipu ozugbo na adres Transparent. 
Certain wallets simply don't allow for sending directly to a Transparent address and **the recipient may not provide a TEX equivalent**. So, **Converting** from a Transparent to a TEX address may be required at times. This can be achieved manually by running the reference implementation outlined in [zip-320 (mkpụrụ akwụkwọ)](https://zips.z.cash/zip-0320#reference-implementation).

### Ị Chọrọ adreesị TEX mgbe ị na-eziga ego gaa n'otu mgbanwe nke ** chọrọ ka ego ndị ahụ si isi mmalite doro anya. 
Ka ọ dị ugbu a, [Binance](https://www.binance.com/) bụ naanị Central Exchange na-eji adreesị TEX (na ha bụ isi ihe kpatara okike nke TEX). 
Adreesị TEX na-agwa obere akpa dakọtara na ego niile ezigara n'adres ahụ ga-abụ ihe doro anya ma wepụ uru ọ bụla echekwara site na iziga ya.
Ọ bụrụ na mgbanwe dị ka Binance jụrụ uru ezitere, ọ nwere ụzọ ndị dị mkpa iji weghachite ọnụ ahịa ahụ azụ n'adres o si bịa. O nyekwara aka ụlọ ọrụ dịka Binance ịgbaso iwu na ụkpụrụ nke gọọmentị ma ọ bụ ikike ndị ọzọ nyere.


## Kedu obere akpa ego na-akwado adreesị TEX?

Ị nwere ike ịhụ ndepụta kachasị ọhụrụ na anyị . [obere akpa ego](https://zechub.wiki/wallets) Jiri **TEX Address Filter.**
