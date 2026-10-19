<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nym Mixnet amaghị aha maka Zcash

> Nkwenye ikpeazụ: Ọktoba 18, 2026

Ọdọ mmiri ndị e ji Zcash kpuchie na-ezochi ego, ndị na-eziga, na ndị nnata n'usoro. Ha anaghị ezochi ụzọ netwọk dị n'etiti obere akpa na sava lightwallet. Mixnet Nym's na-agbakwụnye na nchekwa netwọk na-efu. Site na Ọktoba 2026, njikọta ahụ dị ndụ na obere akpa mmepụta (Zingo, Zkool).

Isi mmalite: [Otu Nym si etinye aha na obere akpa Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 Ọktoba 2026).

## Ihe echekwara

Nym na-agbaji ngwugwu azụmahịa (nke na-abụkarị 7–15 KB nke data mmefu na ihe akaebe ZK) n'ime ngwugwu Sphinx ma na-ebuga ha site na mixnet. Nke a:

- Na-ezochi IP nke onye zitere ya na sava lightwallet
- Na-agwakọta okporo ụzọ ahụ na okporo ụzọ Nym ndị ọzọ
- Na-enye ihe dị ka bit iri na asaa nke entropy na ntọala ndabara, yana aha njirimara e hotara n'elu ndị ọrụ 100,000

Ịkwụ ụgwọ na arịrịọ ọnụahịa na Zingo v7 na-agbaso ụzọ a site na ndabara.

## Ihe a na-echebeghị

Mmekọrịta nke usoro a, ajụjụ ndị na-emebi ihe, ịchọta azụmahịa, na okporo ụzọ mempool na-eji njikọ indexer nkịtị ugbu a. Metadata ọkwa ngwaọrụ ma ọ bụ ọkwa ngwa dị n'èzí ngwugwu agwakọtara dịkwa n'èzí oke Nym's.

Ọ bụrụ na ụdị ihe iyi egwu gị chọrọ izochi okporo ụzọ mmekọrịta, jikọta obere akpa mixnet na ọkwa sistemụ NymVPN. Lee [Nym VPN](/guides/nym-vpn).

## Obere akpa

| Obere akpa | Ọnọdụ | Ihe ndetu |
| --- | --- | --- |
| Zingo v7 | Dị ndụ, ndabara | `makers run-cli` ngwugwu `nym-proxy`Oge ahụ na-amalite na-anọghị n'ịntanetị; `--online`, `--remember-online`, or `--server` na-enye nkwenye. |
| Zkool | Ndụ | Njikọta mixnet nke ndị obodo. |
| Ndị ọzọ | Site na NymVPN | Mee obere akpa ahụ site na usoro Mixnet dị larịị sistemụ. |

Nkọwa ntọala maka ụzọ ọkwa obere akpa dị na [Ụzọ Zcash Wallet Traffic Gafee Nym Mixnet](/guides/nym-mixnet-wallet-setup).

## Mgbanwe azụmaahịa

Mgbasa ozi Nym-routed aga nwayọ nwayọ karịa clearnet (~3.4 s). Tor dị ngwa ngwa (~3.7×) mana ọ na-eji iyi FIFO na-agwakọtaghị, yabụ onye mmegide zuru ụwa ọnụ ka nwere ike ijikọ. Ịbawanye ntọala onye ọrụ Nym nke a na-ekerịta na-eme ka aha njirimara dịkwuo mma karịa itinye oge ọzọ.

## Ịdị ọcha nke ngwa-oyi akwa: nym-swizzle-zcash

Nchedo oyi akwa netwọk ezughị. Ọbụlagodi na mixnet ma ọ bụ VPN zuru oke, sava lightwallet ka nwere ike ijikọ nnọkọ site na ilele ụkpụrụ oyi akwa ngwa:

- Nchịkọta isi mmalite ọrụ: mmekọrịta ndị ahịa malitegharịa site na kpọmkwem `previous end + 1`, yabụ sava ahụ nwere ike ịhazi nnọkọ site na ogologo blọk naanị ya.
- Mmekọrịta-wee-zipu: Mmekọrịta obere akpa ego ozugbo tupu agbasa ozi, na-ahapụ sava ahụ ka ọ kọwaa azụmahịa ahụ na nnọkọ mmekọrịta gara aga.

Ihe [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) Igbe ahụ na-emejuputa iwu ịdị ọcha Zcash-specific nke na-eleba anya n'ihe abụọ ahụ `nym-swizzle` ihe ndị mbụ dị mkpa n'ime amụma maara ihe gbasara agbụ ígwè maka ndị ahịa dị mfe.

**Akara nhazi nke ọnụọgụgụ.** A na-agbasa arịrịọ gaa na grid netwọk zuru oke nwere mkpụrụ ndụ dị ka ụbọchị. A na-agbakọta mmalite ahụ ma mechie njedebe ya. Oke ya bụ ihe a kapịrị ọnụ, na-arị elu, ma na-ekewapụ. Nyocha nhazi na-anọ n'ime oke ahụ ka a ghara ikpughe ebe mmalite ọrụ kpọmkwem. Amaghị aha sitere na nkpọkọ (ọtụtụ obere akpa ego na-ewepụta otu ókèala) kama mkpọtụ.

**Mgbasa ozi agbachiri agbachi.** A na-egbu oge izipu azụmahịa site na nkesa exponential (nkezi blọk 144 ≈ awa 3, mkpuchi blọk 576 ≈ awa 12) nke kwekọrọ na nhazi oge mbufe ZIP 318. Nkwụsịtụ gafere oge usoro nkịtị, yabụ a na-anọgide na-eme usoro. A na-ewu azụmahịa ahụ naanị n'oge ọkụ megide ntụnye ọhụrụ. Mmekọrịta na mgbasa ozi kwesịrị iji sava dị iche iche.

Igbe ahụ na-ekpughe `BlockSource` na `TxBroadcaster` àgwà, na-achịkọta maka `wasm32-unknown-unknown`, ọ nweghịkwa nchịkọta netwọk nke ya. Lee [Akwụkwọ Nym](https://nym.com/docs/developers/swizzle/zcash) maka API zuru oke na ihe atụ.

## Isi mmalite

- [Otu Nym si etinye aha na obere akpa Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 Ọktoba 2026
- [nym-swizzle-zcash: Amụma Ịdị ọcha maka Ndị Ahịa Zcash Light](https://nym.com/docs/developers/swizzle/zcash) — Akwụkwọ Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Ụzọ Zcash Wallet Traffic Gafee Nym Mixnet](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
