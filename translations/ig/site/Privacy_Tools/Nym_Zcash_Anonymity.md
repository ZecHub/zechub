<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nym Mixnet Amaghị aha [Anonymity] maka Zcash

> E nyochara ikpeazụ: Ọktoba 18, 2026

Zcash pool nke e chebere echebe [shielded] na-ezo ego ole, ndị zitere, na ndị natara on-chain. Ha anaghị ezo ụzọ netwọk dị n'etiti e-akpa ego [wallet] na sava lightwallet. Mixnet nke Nym na-agbakwunye nchedo oyi akwa netwọk ahụ na-efu. Ruo Ọktoba 2026, njikọta ahụ na-arụ ọrụ n'ime e-akpa ego mmepụta (Zingo, Zkool).

Isi mmalite: [Otu Nym si agbakwunye amaghị aha na e-akpa ego Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 Ọktoba 2026).

## Ihe e chebere

Nym na-ekewa ngwugwu Azụmahia [transaction] (nke na-adịkarị 7–15 KB nke data mmefu na proof [proof] ZK) n'ime ngwugwu Sphinx ma na-eziga ha site na mixnet. Nke a:

- Na-ezo IP onye zitere n'aka sava lightwallet
- Na-agwakọta okporo ụzọ ya na okporo ụzọ Nym ndị ọzọ
- Na-enye ihe dị ka bits 17 nke entropi [entropy] na ntọala ndabara, yana otu amaghị aha a kpọtụrụ aha nke karịrị ndị ọrụ 100,000

Kwụọ ụhwọ [payment] na arịrịọ ọnụahịa n'ime Zingo v7 na-agbaso ụzọ a na ndabara.

## Ihe anaghị echebe

Mmekọrịta chain [chain], ajụjụ nullifier [nullifier], mbudata Azụmahia, na okporo ụzọ mempool na-eji njikọ indexer nkịtị ugbu a. Metadata nke ọkwa ngwaọrụ ma ọ bụ ọkwa ngwa n'èzí ngwugwu agwakọtara nọkwa n'èzí oke ọrụ Nym.

Ọ bụrụ na ụdị iyi egwu gị chọrọ izo okporo ụzọ mmekọrịta, jikọta e-akpa ego mixnet nke ime na NymVPN nke ọkwa sistemụ. Lee [Nym VPN](/guides/nym-vpn).

## E-akpa ego

| E-akpa ego | Ọnọdụ | Ihe edeturu |
| --- | --- | --- |
| Zingo v7 | Na-arụ ọrụ, ndabara | `makers run-cli` na-agụnye `nym-proxy`. Oge ọrụ na-amalite na-anọghị n'ịntanetị; `--online`, `--remember-online`, ma ọ bụ `--server` na-enye nkwenye. |
| Zkool | Na-arụ ọrụ | Njikọta mixnet nke ime. |
| Ndị ọzọ | Site na NymVPN | Ziga e-akpa ego ahụ site na ọnọdụ Mixnet nke ọkwa sistemụ. |

Nkọwa nhazi maka ụzọ ọkwa e-akpa ego dị na [Ziga okporo ụzọ e-akpa ego Zcash n'elu Mixnet Nym](/guides/nym-mixnet-wallet-setup).

## Ọnọdụ mgbanwe

Mgbasa ozi a zigaara site na Nym ji ihe dị ka ugboro 12.5 nwayọọ karịa clearnet (~3.4 s). Tor dị ngwa karịa (~3.7×) mana ọ na-eji iyi FIFO na-enweghị ịgwakọta, ya mere onye mmegide zuru ụwa ọnụ ka nwere ike ijikọ ha. Ịmụba ọnụ ọgụgụ ndị ọrụ Nym nkekọ na-eme ka amaghị aha bawanye nke ọma karịa ịgbakwunye igbu oge ọzọ.

## Ịdị ọcha [hygiene] nke ọkwa ngwa: nym-swizzle-zcash

Nchedo oyi akwa netwọk ezughị. Ọbụna ma mixnet ma ọ bụ VPN zuru oke, sava lightwallet ka nwere ike ijikọ oge ọrụ site n'ịhụ ụkpụrụ ọkwa ngwa:

- Ịjikọ ebe ịga n'ihu: ndị ahịa na-amaliteghachi mmekọrịta kpọmkwem site na `previous end + 1`, ya mere sava ahụ nwere ike ijikọ oge ọrụ site n'ịdị elu block naanị ya.
- Mmekọrịta wee ziga: e-akpa ego na-emekọrịta ozugbo tupu ha agbasa Azụmahia, nke na-eme ka sava ahụ kwuo na Azụmahia ahụ sitere n'oge mmekọrịta gara aga.

Crate [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) na-etinye atumatu ịdị ọcha kpọmkwem maka Zcash nke na-edozi ha abụọ. Ọ na-akwakọba primitives `nym-swizzle` izugbe n'ime atumatu maara chain maka light client [light client].

**Oke mmekọrịta e kewara ọkwa [Quantised sync ranges].** A na-agbasawanye arịrịọ n'ime grid netwọk dum nwere sel hà ụbọchị. A na-eme ka mmalite gbadaa ma mee ka njedebe gbagoo. Oke ndị a bụ nke a na-ekpebi n'ihu, na-arị elu, ma ghara ịdaba n'otu ebe. Nlele reorg na-anọ n'ime oke a gbasawanyere ka a ghara ikpughe ebe ịga n'ihu kpọmkwem. Amaghị aha na-esite na nkukota (ọtụtụ e-akpa ego na-ewepụta otu ókèala) karịa mkpọtụ.

**Mgbasa ozi ekewapụrụ.** A na-egbu oge iziga Azụmahia site na nkesa exponential (nkezi blocks 144 ≈ awa 3, oke blocks 576 ≈ awa 12) dabara na nhazi mbufe ZIP 318. Igbu oge karịrị ogologo ndụ usoro a na-ahụkarị, ya mere a na-echekwa nhazi oge. A na-ewu Azụmahia naanị n'oge iziga ya megide tip ọhụrụ. Mmekọrịta na mgbasa ozi kwesịrị iji sava dị iche iche.

Crate ahụ na-ekpughe traits `BlockSource` na `TxBroadcaster`, na-agbakọta maka `wasm32-unknown-unknown`, ọ nweghịkwa stack netwọk nke ya. Lee dọkụmenti [Nym](https://nym.com/docs/developers/swizzle/zcash) maka API zuru ezu na atụ.

## Isi mmalite

- [Otu Nym si agbakwunye amaghị aha na e-akpa ego Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 Ọktoba 2026
- [nym-swizzle-zcash: Atumatu Ịdị Ọcha maka Light Clients Zcash](https://nym.com/docs/developers/swizzle/zcash) — Dọkụmenti Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Ziga okporo ụzọ e-akpa ego Zcash n'elu Mixnet Nym](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
