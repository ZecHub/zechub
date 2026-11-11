<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>


# Ngwá ọrụ [Resources] Onye mmepụta [Developer]

Ngwá ọrụ ndị ị chọrọ iji wuo ihe na Zcash, ekewara ha dabere n'ihe nke ọ bụla ji arụ ọrụ kama idepụta ha n'otu ikpo.

Nchịkọta teknụzụ ahụ gbanwere nke ukwuu n'afọ 2026. zcashd, nke na-agba netwọk [network] ahụ n'ọtụtụ akụkọ ndụ ya, rutere ngwụcha ndụ ya na 18 Julaị 2026 n'ịdị elu block 3417100, node ọ bụla a na-agbanweghị emechiri n'ịdị elu ahụ ma ga-ajụ ịmalite ọzọ. Nduzi e dere maka zcashd bụzi akụkọ ihe mere eme kama ịbụ ebe a ga-amalite, ya mere a haziri peeji a gburugburu ihe dochiri ya.

## Nchịkọta teknụzụ ahụ n'ile anya

| Oyi akwa | Ihe ị ga-eji | Malite na |
|:--|:--|:--|
| Full node | Zebra ma ọ bụ Zakura | [Akwụkwọ Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| E-akpa ego [wallet] full node | Zallet, nọ na beta | [Akwụkwọ Zallet](https://zcash.github.io/zallet/) |
| Sava e-akpa ego light | Zaino ma ọ bụ lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Ọbá akwụkwọ e-akpa ego | Crates librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Mkpanaaka | SDKs Android na iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Nkọwapụta | Nkọwapụta protocol na ZIPs | [zips.z.cash](https://zips.z.cash) |

## Nodes

Node na-enyocha consensus ma na-edobe chain. E nwere mmejuputa abụọ a ka na-emepụta nke ọma.

[Zebra](/zcash-tech/zebra-full-node) bụ node nke Zcash Foundation, edere ya na Rust, ma bụrụkwa nke ọtụtụ nduzi na-eche ugbu a. [Akwụkwọ Zebra](https://zebra.zfnd.org/) na-akọwa otu esi wụnye ma gbaa ya, ebe [repository](https://github.com/ZcashFoundation/zebra) bụ ebe mmepe na-eme.

[Zakura](/zcash-tech/zakura-node) bụ node ọhụrụ, nke ndị dere ya kọwara dịka “full node Zcash kwekọrọ na consensus, nke e wuru maka ogo”, nwere sync ngwa ngwa, ịkpụchapụ block na ọnọdụ ndakọrịta zcashd. Ọ bụ Sean Bowe, onye na-arụkọ Zcash, na Dev Ojha na-edu ya. Ọ bụ open source n'okpuru Apache 2.0 na [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub nwere peeji [Full Nodes](/zcash-tech/full-nodes) nke na-akọwa ọdịiche dị n'etiti ha.

## E-akpa ego full node

zcashd jikọtara e-akpa ego na node. E-akpa ego ahụ adịkwaghị, ma [Zallet](https://github.com/zcash/zallet) bụ ihe dochiri ya. Akwụkwọ Zallet kọwara ya dịka “e-akpa ego Zcash full-node e dere na Rust” nke “a na-ewu dịka ihe dochiri e-akpa ego zcashd”.

Gụọ ịdọ aka ná ntị gbasara nchekwa tupu ịdabere na ya. Zallet nọ na beta, “enyochabeghị ya nke ọma”, mgbanwe na-emebi emebi “nwere ike ime n'oge ọ bụla, chọrọ ka ị hichapụ ma mepụta ọzọ e-akpa ego Zallet gị”, ọ bụghịkwa ụzọ RPC zcashd ọ bụla ka e bugorola.

Ọ bụrụ na ị na-ebufe nhazi dị adị, ZecHub nwere nduzi [mbufe site na zcashd gaa na Zebra na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) yana ntụaka ngwa ngwa [Zallet](/using-zcash/zallet-quick-reference-guide).

## Sava e-akpa ego light

Ọtụtụ e-akpa ego anaghị agba node. Ha na-agwa sava na-edobe chain okwu, nke na-eweghachikwara ha nlele kọmpat nke ya.

[lightwalletd](https://github.com/zcash/lightwalletd) bụ ọrụ mbụ, edere na Go, nke akọwara dịka “ọrụ backend na-enye ihu ọma na-echekwa bandwidth nye blockchain Zcash”. [Zaino](/zcash-tech/zaino) bụ indexer ọhụrụ, edere na Rust, ma na-agụ site na full validator kama iburu nke ya nke chain.

Akwụkwọ [Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) na-akọwa protocol ahụ n'onwe ya. Peeji [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) na-akọwa ihe sava ndị a nwere ike ịhụ na ihe ha na-enweghị ike ịhụ gbasara onye ọrụ, nke kwesịrị ka a ghọta tupu ịhọrọ otu.

## Iwulite e-akpa ego

Ọtụtụ ọrụ e-akpa ego na-eme na crates Rust dị n'okpuru [librustzcash](https://github.com/zcash/librustzcash), nke SDK mkpanaaka na ọtụtụ e-akpa ego desktọpụ na-ewukwasị. A na-edepụta crate ọ bụla na [docs.rs](https://docs.rs).

| Crate | Ihe ọ bụ maka ya |
|:--|:--|
| zcash_client_backend | “APIs maka imepụta light clients Zcash nke e chebere echebe [shielded]”, gụnyere sync na iwu Azụmahia [transaction] |
| zcash_client_sqlite | “Light client Zcash dabere na SQLite”, oyi akwa nchekwa maka nke dị n'elu |
| zcash_keys | “Njikwa igodo na Adreesị akpa ego [address] Zcash” |
| zcash_primitives | “Mmejuputa Rust nke primitives Zcash” |
| zcash_protocol | “Constants netwọk protocol Zcash na ụdị uru” |
| orchard | “Protocol Azụmahia nke e chebere echebe Orchard” |
| sapling-crypto | “Ọbá akwụkwọ cryptographic maka Zcash Sapling” |
| pczt | “Ngwá ọrụ maka ịrụ ọrụ na Azụmahia Zcash e mepụtara akụkụ ụfọdụ”, eji maka hardware na ịbinye signature n'ọtụtụ ngwaọrụ |
| zip321 | URIs arịrịọ Kwụọ ụhwọ [payment], dịka e kwuru na ZIP 321 |

Maka mkpanaaka, SDK [Android](https://github.com/zcash/zcash-android-wallet-sdk) na [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) na-ekpuchi ọbá akwụkwọ ndị ahụ. A na-akpọbu repository iOS ahụ ZcashLightClientKit, ya mere njikọ na isiokwu ochie na-eji aha ahụ.

## Nkọwapụta na cryptography

[Nkọwapụta protocol](https://zips.z.cash/protocol/protocol.pdf) bụ ikike kacha elu gbasara otu Zcash si arụ ọrụ, gụnyere [nkowa Adreesị akpa ego na igodo](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIPs](https://zips.z.cash) bụ ebe a na-atụpụta ma na-akọwapụta mgbanwe, index ahụ na-egosikwa nke bụ drafts na nke bụ final. Mgbanwe consensus na-apụta na network upgrade, ZecHub na-esochikwa ndị ahụ na peeji [Network Upgrades](/start-here/network-upgrades).

Maka cryptography dị n'okpuru, gụọ [Akwụkwọ halo2](https://zcash.github.io/halo2/index.html) na [Akwụkwọ Orchard](https://zcash.github.io/orchard/), tinyere docs crate [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) na [orchard](https://docs.rs/orchard/latest/orchard/). [Akwụkwọ FROST](https://frost.zfnd.org/) na-akọwa signatures n'ọkwa, ZecHub nwekwara peeji [FROST](/zcash-tech/frost).

## Testnet

Testnet bụ chain dị iche nwere mkpụrụ ego [coins] na-enweghị uru, nke a na-akpọ TAZ. Ma Zebra na Zakura nwere ike ịgba megide ya, nduzi [testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) na-akọwakwa nhazi node.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) bụ block explorer testnet na-arụ ọrụ, nke nwere nke mainnet kwekọrọ na ya na [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Inweta TAZ bụ akụkụ siri ike, n'ihi na faucets ejikọrọ na akwụkwọ ochie akwụsịla ịza. [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) bụ faucet obodo na-agba “node, e-akpa ego na onye na-egwụputa [miner] nke ya”, na-akwụ “ntapụ z2z nke e chebere echebe”, ma jiri “proof [proof] ọrụ ihe nchọgharị kama onye na-enye captcha” chekwaa arịrịọ. Ọ bụ open source n'okpuru MIT. Ọ bụrụ na ọ naghị adị, jụọ na Zcash R&D Discord, nke bụ ihe akwụkwọ Zcash n'onwe ya tụrụ aro.

## Akwụkwọ nkuzi izugbe

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) ka bụ otu ebe kasị saa mbara, na-ekpuchi echiche protocol, njikọta na ịgwụputa [mining]. Jiri nlezianya gụọ ya. E debere ụdị ya dabere na zcashd, ya mere akụkụ ụfọdụ ya na-akọwa node na-adịghị agba ọzọ, ebe akụkụ protocol na light client ka bara uru. [Ihe Nlereanya Egwu App E-akpa ego Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) dị ebe ahụ kwesịrị ịgụ tupu ịmepụta ihe ọ bụla metụtara Nzuzo [privacy] onye ọrụ.

Ọ bụrụ na ị bụ onye ọhụrụ na blockchains n'ozuzu, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) bụ nkwado a na-enyekarị maka ntọala ha na-ekekọrịta, ọ bụkwa n'efu ịgụ ya dum. Ọ naghị ekpuchi Azụmahia nke e chebere echebe.

## Ngwá ọrụ ndị ọzọ ndị onye mmepụta kwuru maka ha

[Arti](https://docs.rs/arti/latest/arti/) bụ mmejuputa Rust nke Tor, nke zcash_client_backend ji eziga okporo ụzọ e-akpa ego. [Tailscale](https://github.com/tailscale/tailscale) na-apụta maka ijikọta na node ị na-agba n'onwe gị. [warp2](https://github.com/hhanh00/warp2) bụ mmejuputa sync ngwa ngwa nke Hanh, n'agbanyeghị na emelitebeghị ya kemgbe 2023.

## Obodo na mmemme

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) bụ ebe a na-atụle mmepe protocol na e-akpa ego, ebe [Zcash Community Forum](https://forum.zcashcommunity.com/) na-eburu atụmatụ ogologo na eriri nkwado.

Nsonaazụ hackathon ndị na-adịbeghị anya bụ ezigbo ihe osise nke ihe ndị mmadụ na-ewu: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) na [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Akụrụngwa a kwụsịrị

Edobere ha n'ihi na isiokwu ochie na-ejikọ ha, nakwa n'ihi na ha ka bụ ntụaka maka otu node ahụ a kwụsịrị si akpa àgwà. Amaliterela ebe a.

[Akwụkwọ zcashd](https://zcash.github.io/zcash/) na ntụaka RPC [zcashd](https://zcash.github.io/rpc/) na-edepụta software rutere [ngwụcha ndụ](https://zcash.github.io/zcash/user/end-of-life.html) na Julaị 2026. Repository [zcash/zcash](https://github.com/zcash/zcash) ka edebere.

Ọ bụrụ na ị nwere akụrụngwa ị ga-agbakwunye, ma ọ bụ hụ ihe ebe a nke ochiela, mepee issue ma ọ bụ pull request. Ndị otu anaghị enwe ike mgbe niile idebe ihe niile n'oge, ịkọkwa ihe ị zutere na-enyere aka iduzi nduzi ndị ahụ.

**Emelitere ikpeazụ:** Ọgọọst 2026
