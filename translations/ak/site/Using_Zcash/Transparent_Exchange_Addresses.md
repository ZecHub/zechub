# Dɛn ne Zcash TEX Address?

Zcash TEX address yɛ ɔbrafo adrɛs soronko bi. ɛyɛ abodin a ɛkyerɛ "Transparent Exchange" address, na ɛno ne Unified-type (bech32m) encoding of an single p2pkh Transparent address. 

Ne botae ne sɛ ɛbɛka akyerɛ wallet a ɛne no di nsɛ ama ayɛ Transparent-Only (T -> T) transaction. 

The logic is as follows: Upon detecting a TEX Address, a compatible wallet decodes it to obtain the Transparent receiver it contains. The wallet then sends the required funds for the tx from the Shielded pool to a seperate, user-controlled, ephemeral Transparent address (Z -> T). It then sends those funds to the decoded Transparent receiver of the TEX address (T -> T).  

TEX address ho technical proposal no wɔ Zcash mu. [ZIP 320](https://zips.z.cash/zip-0320), a ɛkyerɛ address type de gye sika fi Transparent Addresses nko ara.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)


Although TEX addresses not are broadly adopted, Zcash users may be required to use them eventually.

## Bere Bɛn na Mehia TEX Address?

### Wo hia TEX address bere a wode sika resoma akɔ baabi wɔ Transparent no, na wore de wallet bi adi dwuma a ɛnni kwan sɛ wɔde fa adansedie biara kɔ hɔ. 
Ebinom ntumi mfa nkrataa nkɔma obi wɔ address a w'atwe no afiri mu, na saa ara nso na wɔntumi mma nea ɔretwerɛ ne ho krataa biara nkyerɛ sɛ TEX. Enti ɛtɔ da bi a ɛbɛhia sε wobɛyɛ conversion afi Transparent akɔ TEX adiresi so. Wobɛtumi ayɛ eyi manually denam reference implementation a yɛakyerɛw wom yi akyi kwan so: [adansedie krataa-320](https://zips.z.cash/zip-0320#reference-implementation).

### Wo hia TEX address bere a wo resoma sika akɔ central exchange so no. Ɛhwehwɛ sɛ saa sika yi fi baabi a w'atumi ahu mu ba**. 
Seesei, [Binance](https://www.binance.com/) Ɛyɛ Centralised Exchange a ɛdi dwuma wɔ TEX address mu (na ɛno ne ade titiriw ntia wɔde bɔɔ TEX). 
TEX address kyerɛ portfolios a ɛne no bɔ mu sɛ sika biara a wɔde kɔ saa adrɛs yi so no, ɛsɛsɛ wɔhwɛ ma emu da hɔ na ɛmma obiara ntumi mfa biribi a w'atumi de asie ho nto dwa.
Sɛ exchange te sɛ Binance po akatua a wɔde asende no, ɛwɔ akwan pa de saa boɔ yi san kɔ address a ɛfi bae so. Ɛsan boa entities te sɛ binance ma wodi mmara ne nhyehyeɛ ahorow a aban anaa atumfoɔ afoforo ahyɛ ho dwuma no akyi.


## Dwumadi krataa bɛn na ɛboa TEX Address?

Wobɛtumi ahu yɛn nsɛm a ɛresan aba wɔ wo din mu no so. [nkotoku no](https://zechub.wiki/wallets) Fa adrɛs Filter no di dwuma.
