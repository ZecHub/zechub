<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Akụrụngwa Onye Mmepụta

Ihe ndị ị chọrọ iji wuo na Zcash, nke a chịkọtara site n'ihe onye ọ bụla bụ maka kama edepụtara ya n'otu ikpo.

Zcashd, nke na-agba ọsọ netwọkụ maka ọtụtụ akụkọ ihe mere eme ya, ruru njedebe ndụ ya na 18 July 2026 na ngọngọ dị elu 3417100, yana ọnụ ọ bụla a gbanwere agbanwe ga -emechi n'ogologo ahụ ma jụ ịmaliteghachi. Ntuziaka edere maka zcashd bụ akụkọ ntolite ugbu a kama ịbụ ebe mbido, yabụ edepụtara ibe a gburugburu ihe dochie anya ya.

## Ihe ndị dị n'elu na-egosi otu ihe.

 Layer  Ihe ị ga-eji bido na ya 
|:--|:--|:--|
 Full node: Zebra ma ọ bụ Zakura. [Akwụkwọ Zebra ahụ](https://zebra.zfnd.org/), [zakura.com (n'asụsụ Igbo)](https://zakura.com/) |
 Full node wallet. Zallet, na beta. [Akwụkwọ Zallet ahụ .](https://zcash.github.io/zallet/) |
Ihe nkesa obere akpa ọkụ. Zaino ma ọ bụ lightwalletd. [Zaino (nwa nwanyị)](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Wallet libraries | The librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
Ngwaọrụ mkpanaka. Android na iOS SDKs. [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS (n'asụsụ Bekee)](https://github.com/zcash/zcash-swift-wallet-sdk) |
Nkọwapụta: Usoro nhazi usoro na ZIPs. [zip.z.cash (ego)](https://zips.z.cash) |

## Nọmba ndị dị na ya

Otu ọnụ na-akwado nkwekọrịta ma jide agbụ. E nwere mmejuputa abụọ a zụlitere nke ọma.

[Zebra](/zcash-tech/zebra-full-node) bụ Zcash Foundation's node, nke e dere na Rust, ọ bụkwa ya ka ọtụtụ ndị nduzi ugbu a chere. [Akwụkwọ Zebra ahụ](https://zebra.zfnd.org/) na-ekpuchi wụnye ya ma rụọ ọrụ, nakwa ndị ọzọ. [ebe nchekwa data](https://github.com/ZcashFoundation/zebra) bụ ebe mmepe na-eme.

[Zakura (n'asụsụ Igbo)](/zcash-tech/zakura-node) is a newer node, described by its authors as a "consensus-compatible Zcash full node, built for scale", with faster sync, block pruning and a zcashd compatibility mode. It is led by Sean Bowe, a Zcash cofounder, and Dev Ojha. It is open source under Apache 2.0 at [zakura-core/zakura (nke a na-akpọ 'Zakura' n'asụsụ Igbo)](https://github.com/zakura-core/zakura).

ZecHub nwere a [Nọmba zuru ezu](/zcash-tech/full-nodes) peeji nke na-ekpuchi ahia n'etiti ha.

## Akpa ego zuru oke nke node ahụ

zcashd gbakọtara obere akpa ego na ọnụ ahụ. Akpaego a apụla, ma [Zallet](https://github.com/zcash/zallet) bụ ihe nnọchianya. Akwụkwọ Zallet na-akọwa ya dị ka "akpa ego Zcash zuru oke nke edere na Rust" a na -ewu dịka onye ga -anọchite anya akpa zcashd".

Gụọ ịdọ aka ná ntị nche tupu ịdabere na ya. Zallet nọ na beta, "a nyochaghi nke ọma", imebi mgbanwe nwere ike ịme n'oge ọ bụla, chọrọ ka ihichapụ ma mepụta akpa ego gị Zallet ", a kabeghịkwa usoro zcashd RPC niile.

Ọ bụrụ na ị na-akpụ akpụ ẹdude ntọlite gafee, ZecHub nwere a [ntuziaka mbugharị site na zcashd gaa Zebra na Zallet.](/guides/migration-guide-zcashd-to-zebrad-zallet) na a [Zallet ngwa-ngwa ntụaka.](/using-zcash/zallet-quick-reference-guide).

## Ndị na-enye ihe ntanetị akpa ego dị mfe

Ọtụtụ obere akpa anaghị agba ọsọ. Ha na-agwa onye nkesa nke na-ejide agbụ ma nyeghachi ya echiche kọmpat banyere ya.

[lightwalletd](https://github.com/zcash/lightwalletd) bụ ọrụ mbụ, nke e dere na Go, akọwapụtara dị ka "ọrụ azụ-azụ nke na-enye interface bandwidth arụmọrụ maka Zcash blockchain". [Zaino (nwa nwanyị)](/zcash-tech/zaino) bụ ihe ọhụrụ indexer, e dere na Rust, ma gụọ site na onye nyocha zuru ezu kama ibute akwụkwọ nke ya.

Ihe ahụ bụ: [Usoro Nkwado Ndị Ahịa Dị Mfe](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) akwụkwọ na-ekpuchi protocol onwe ya. The [Lightwallet Nodes (Nọmba nke obere akpa ego)](/zcash-tech/lightwallet-nodes) peeji na-ekpuchi ihe ndị a sava nwere ike ma ghara ịhụ banyere onye ọrụ, nke bara uru ịghọta tupu ị họrọ otu.

## Ịmepụta obere akpa ego

Ọtụtụ ọrụ ego na-eme n'ime igbe nchara dị n'okpuru. [librustzcash](https://github.com/zcash/librustzcash), nke SDKs mobile na ọtụtụ desktọọpụ wallets wuru. A na-edepụta igbe ọ bụla n'elu akwụkwọ ozi dị mkpa maka nchekwa data ha, ma nwee ike ịnweta ya site na iji ihe nchọgharị weebụ . [akwụkwọ.rs](https://docs.rs).

 Igbe: Ihe ọ bụ maka.
|:--|:--|
 zcash_client_backend "API maka ịmepụta ndị ahịa Zcash na-ekpuchi", gụnyere nhazi oge na azụmahịa.
 zcash_client_sqlite "Onye ahịa Zcash dị mfe nke dabeere na SQLite", nchekwa nchekwa maka n'elu"
 zcash_keys "Zcash igodo na adreesị njikwa"
 zcash_primitives "Rust mmejuputa nke Zcash primitives"
 zcash_protocol "Zcash protocol network constants and value types" (Ụdị na-adịgide adịgide nke netwọkụ Zcash)
 Orchard "Ọnụahịa azụmahịa nke a na-echebe"
 sapling-crypto "Ọbá akwụkwọ Cryptographic maka Zcash Sapling"
 pczt "Ngwaọrụ maka ịrụ ọrụ na azụmahịa Zcash e mepụtara nke ọma", eji ya eme ihe maka ngwaike na ntinye aka ọtụtụ ngwaọrụ.
 zip321  arịrịọ ịkwụ ụgwọ URI, dị ka akọwapụtara na ZIP 321 

Maka mobile, ndị na-ahụ maka ihe nkiri. [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) na ndị ọzọ. [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) a na-akpọbu ebe nchekwa iOS ZcashLightClientKit, ya mere njikọ ndị okenye na isiokwu jiri aha ahụ.

## Nkọwapụta na cryptography

Ihe ahụ bụ: [nkọwapụta protocol](https://zips.z.cash/protocol/protocol.pdf) bụ ikike na etu Zcash si arụ ọrụ, gụnyere: [adreesị na igodo nzuzo.](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIPs (nkwado ndị na-eme ihe)](https://zips.z.cash) na-egosi ihe ndị e mere atụmatụ ha ga-eme ma ọ bụ nke a kagburu. Mgbanwe dị iche iche a na-enwe n'otu oge ahụ, nakwa mgbanwe ndị ọzọ a chọrọ ime ná ngwụsị afọ gara aga, socha ebe niile ZecHub nọ mee nchọpụta maka ya. [Nwelite netwọkụ](/start-here/network-upgrades) peeji nke.

Maka ihe nzuzo dị n'okpuru, gụọ [Akwụkwọ Halo2 Book](https://zcash.github.io/halo2/index.html) na nke a: [Akwụkwọ Bekee a na-akpọ The Orchard Book.](https://zcash.github.io/orchard/), na ndị a: [halo2 (ihe na-acha anụnụ anụnụ)](https://docs.rs/halo2_proofs/latest/halo2_proofs/) na nke a: [ubi mkpụrụ osisi](https://docs.rs/orchard/latest/orchard/) igbe dọkụmentị n'akụkụ. [The FROST Book](https://frost.zfnd.org/) na-ekpuchi ihe nkesa, ZecHub nwere a [FROST (nke a na-akpọ)](/zcash-tech/frost) peeji nke.

## Nnyocha nyocha

Testnet bụ usoro dị iche na mkpụrụ ego enweghị uru, akpọrọ TAZ. Ma Zebra ma Zakura nwere ike ịgba ọsọ megide ya, ndị ọzọ ga-abụkwa onye isi nke ụlọ ọrụ ahụ. [akwụkwọ ntuziaka ule netiti.](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) na-ekpuchi nhazi nke node.

[testnet.zcashexplorer.app (n'asụsụ Igbo)](https://testnet.zcashexplorer.app/) bụ a na-arụ ọrụ testnet ngọngọ explorer, na a mainnet counterpart n'oge [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Getting TAZ is the awkward part. Public faucets appear and disappear, and the ones linked from older documentation were not responding when this page was written. The reliable route is to ask in the Zcash R&D Discord, which is what the Zcash documentation itself suggests.

## Akwụkwọ ndekọ ahụ dum

[Akwụkwọ Zcash](https://zcash.readthedocs.io/en/latest/) bụ ka ọ bụrụ isi mmalite kachasị, na-ekpuchi echiche nke usoro iwu, njikọta na igwupụta. Gụọ ya nlezianya ụfọdụ. Ọ dị iche megide zcashd, yabụ akụkụ ya kọwara otu ọnụ nke anaghịzi agba ọsọ, ebe ngalaba protocol na ndị ahịa ọkụ nọgidere bara uru. [Ihe Egwu Ngwa Zcash Wallet App Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) nke bi n'ebe ahụ kwesịrị ịgụ tupu emebe ihe ọ bụla na-emetụ nzuzo onye ọrụ.

Ọ bụrụ na ị bụ ọhụrụ ka blockchains n'ozuzu, [Ịmụta Bitcoin nke Ọma](https://github.com/bitcoinbook/bitcoinbook) bụ ihe a na-emekarị maka isi ihe ndị ahụ, ọ dịkwa n'efu ịgụ ya kpamkpam. Ọ naghị ekpuchi azụmahịa echekwara.

## Ngwaọrụ ndị ọzọ na-emepụta ihe ekwuola.

[Arti na-ekwu, sị:](https://docs.rs/arti/latest/arti/) bụ mmejuputa Rust nke Tor, eji zcash_client_backend iji mee ka okporo ụzọ akpa ego. [Ọkpụkpụ azụ](https://github.com/tailscale/tailscale) na-abịa maka ijikọ ọnụ ị na-agba onwe gị. [warp2 (nke abụọ)](https://github.com/hhanh00/warp2) bụ ngwa ngwa Hanh na-emejuputa, ọ bụ ezie na emelitebeghị ya kemgbe 2023.

## Obodo na ihe omume

Ihe ahụ bụ: [Zcash R&D Discord](https://discord.gg/6AK7keWFaK) bụ ebe a na-atụle usoro iwu na mmepe wallet, yana ihe ndị ọzọ. [Nzukọ Obodo Zcash Forum](https://forum.zcashcommunity.com/) na-ebu ogologo oge atụmatụ ma kwado eri.

Nsonaazụ hackathon ndị na-adịbeghị anya bụ ezigbo ihe osise nke ihe ndị mmadụ na-ewu: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) na ndị ọzọ. [Zypherpunk Hackathon 2025 (Nkeji nke 2025)](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Akwụsịrị ego ndị a na-akwụ ụgwọ ha.

E debere ha n'ihi na isiokwu ndị ochie jikọtara ya, nakwa maka na ọ ka bụ ihe e ji ama etu ọnụ ahụ lara ezumike nká si akpa agwa. Amalitela ebe a.

[Akwụkwọ Zcashd ahụ .](https://zcash.github.io/zcash/) na ndị ọzọ. [zcashd RPC ntụaka](https://zcash.github.io/rpc/) akwụkwọ software na ruru [ngwụcha ndụ ya.](https://zcash.github.io/zcash/user/end-of-life.html) na July 2026. The [zcash/zcash](https://github.com/zcash/zcash) a na-echekwa nchekwa data.

Ọ bụrụ na ị nwere akụ iji tinye, ma ọ bụ hụ ihe ebe a nke ga-agwụla oge, mepee nsogbu ma ọ bụkwanụ rịọ arịrịọ. Ndị otu anaghị enwe ike idobe ihe niile ugbu a, yana ịkọwapụta ihe ị zutere na -enyere aka iduzi ndị nduzi ahụ.

**Emelitere ikpeazụ:** Ọgọstụ 2026
