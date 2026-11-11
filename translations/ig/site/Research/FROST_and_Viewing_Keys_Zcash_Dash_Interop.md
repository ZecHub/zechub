# FROST & Viewing Keys: Nchịkọta Nnyocha Mmekọrịta Zcash/Dash

*Edebere maka ZecHub · E degharịrị ya 27 Septemba 2026 · E tinyere ebe isi okwu nkwado maka nkwupụta niile*

## Nchịkọta nchịkwa

ZecHub welitere ajụjụ a mgbe ọ gbakwụnyere Azụmahia nke e chebere echebe DASH dị ka nhọrọ onyinye wiki: à ga-enwe ike ịtụgharị viewing keys nke ụdị Zcash, ma ọ bụ signature oke FROST, gaa na Dash?

Nnyocha ahụ gbanwere usoro e si ele ya anya. Viewing keys abụghị ajụjụ mepere emepe — Dash etinyela pool nke e chebere echebe [Zcash Orchard](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) n'ime Evolution chain ya, na usoro nhazi igodo Orchard nwere viewing keys site na nhazi ya. Dash's [roadmap](https://www.dash.org/roadmap/) na-etinye ha maka mpughe nye onye nyocha na irube isi n’Iwu Njem. E tinyela ọkara ahụ n’ọrụ, ọ bụghị echiche naanị.

**FROST bụ ebe ọdịiche n’ezie dị.** Dash na-agba BLS signature oke site na [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), mana ndị a na-eje ozi consensus n’ogo netwọkụ — ChainLocks na InstantSend. [ZIP 312](https://zips.z.cash/zip-0312) na-elekwasị anya n’ihe dị iche: nnabata imefu ego nke ọtụtụ mmadụ kwekọrịtara maka otu akaụntụ nke e chebere echebe nke obere ìgwè ndị ji igodo n’otu n’otu nwere. Ha abụọ anaghị anọchi ibe ha. Ebe ZIP 312 ka bụ **Draft**, enweghị mmejuputa ntụaka n’otu chain ọ bụla a ga-ebufe, ya mere nke a ga-abụ ọrụ ọhụrụ n’agbanyeghị akụkụ ga-ewu ya.

---

## Usoro oge: ihe mere ntụnyere a ji bụrụ ihe pụrụ iche ugbu a

Ihe omume abụọ metụtara pool e chebere echebe mere n’ime izu ole na ole n’etiti 2026.

**Zcash si na Orchard pụọ.** Onye nchọpụta Taylor Hornby kpughere adịghị ike circuit dị na Orchard nke a pụrụ iji bulie ọnụọgụ akụ n’amaghị ama. Zcash zara site n’ịgbalite **Ironwood (NU6.3)** na **28 Julaị 2026**, ma webata pool ọhụrụ e chebere echebe nke nwere usoro mbugharị turnstile.

**Dash batara na Orchard.** Dash kwupụtara atụmatụ ahụ na [19 Febrụwarị 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — *“Anyị na-atụ anya na anyị ga-enwe ike iwepụta mbufe e chebere echebe n’oge adịghị anya, dabere n’ụzọ kwesịrị ekwesị na nyocha nchekwa na nyocha koodu ọzọ.”* Dash's [roadmap](https://www.dash.org/roadmap/) depụtara Shielded Balances dị ka ihe **emechara na Julaị 2026** site na Dash Platform **v4.0**, na Dash bipụtara [*“Azụmahia e chebere echebe amalitela na Dash Evolution mainnet”*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) na **4 Ọgọọst 2026**.

> **Ndetu gbasara usoro.** Ụfọdụ akụkọ tinyeela ịgbalite mainnet Dash na 17 Julaị 2026, nke ga-eme ka ọ bụrụ tupu Ironwood. Ụbọchị ahụ yiri ka o sitere n’akụkọ mgbasa ozi banyere ọkwa ahụ kama ịbụ ịgbalite ya. N’ebe isi mmalite nke Dash n’onwe ya dị, emechara atụmatụ ahụ na Julaị ma kpọsa na ọ dị ndụ na 4 Ọgọọst — mgbe Ironwood gasịrị. Chain abụọ ahụ gbakọrọ n’ime izu ole na ole; usoro ziri ezi dabere n’akara ngosi a gụrụ, nchịkọta a anaghị ekwu na otu dị tupu nke ọzọ.

N’ụzọ dị oke mkpa, Dash eketaghị ntụpọ ahụ. Ọkwa ha doro anya: *“anyị mejuputara ụdị Orchard nke enweghị ntụpọ mmụba a maara. Ụdị gara aga nwere ntụpọ a pụrụ iji bulie akụ Zcash n’amaghị ama.”*

Ya mere Dash ugbu a na-agba fork emeziworo nke cryptography nke Zcash n’onwe ya siri na ya pụọ n’ogo ntọala, ebe pool ọgbọ ọzọ Zcash (Ironwood) na usoro nnabata imefu ego ọgbọ ọzọ (FROST) ka dị ọhụrụ n’ọrụ ma ka bụ Draft n’otu n’otu.

---

## Viewing keys: etinyelarị n’ọrụ, ọ bụghị oghere nyocha

Pool e chebere echebe Dash bụ [Orchard](https://zips.z.cash/zip-0224), nke e wuru n’elu Halo 2 zk-SNARKs nke na-achọghị trusted setup. Usoro nhazi igodo Orchard na-enwe Full Viewing Keys na Incoming Viewing Keys kemgbe mbụ dịka akụkụ nke nhazi ya, ọ bụghị ihe agbakwunyere — ya mere ike ahụ bịara na koodu, ọ bụghị dịka mbugharị chain ọ bụla ga-akparịta ụka.

Roadmap Dash na-ekwu nzube ahụ kpọmkwem:

> *“N’adịghị ka usoro Nzuzo iwu kwadoro nke chere nsogbu iwepu na exchange na esemokwu usoro iwu ihu, Shielded Balances na-akwado Mpughe ahọpụtara site na view keys — na-enye ndị ọrụ na azụmahịa ohere ịkekọrịta nkọwa Azụmahia na ndị nyocha ma ọ bụ irube isi n’ihe Iwu Njem chọrọ mgbe ọ dị mkpa, na-emebighị Nzuzo maka ojiji kwa ụbọchị.”*

Nleba anya abụọ kwesiri idekọ:

**Dash na-edobe viewing keys n’akụkụ Ojiji mmepụta doro anya karịa ebe ngwaọrụ Zcash n’onwe ya ruru.** Ngwaọrụ mpughe Kwụọ ụhwọ nke Zcash ka nọkarị na nnwale ma bụrụ ihe onye ọrụ họọrọ n’ofe e-akpa ego. Dash na-ewepụta view keys dịka atụmatụ irube isi nke nwere Ojiji akpọrọ aha, na chain nke na-enyekwa mmezi kpebisiri ike nke ihe dị ka otu sekọnd na mmekọrịta e-akpa ego nke ihe dị ka sekọnd iri abụọ dịka ọkwa ya si kwuo.

**Ihe mepere emepe bụ mgbanwe ndakọrịta, ọ bụghị ike.** Ọ bara uru ileba anya ma mmejuputa viewing key Dash ga-anọgide dakọtara n’ụdị waya nke viewing key Zcash Orchard ka chain abụọ ahụ na-etolite n’adabereghị na ibe ha. Ọ bụ ajụjụ nlekota, ọ bụghị ọrụ nyocha.

---

## Nwepụta igodo: atụnyere Zcash na Dash

Akụkụ a na-aza ajụjụ onye nyocha kpọmkwem. Azịza dị mkpirikpi bụ na osisi igodo *e chebere echebe* fọrọ nke nta ka ha yie n’ihi na e kesara koodu ahụ — ọdịiche bara uru dị n’otú chain ọ bụla si **gbanye mgbọrọgwụ** osisi ahụ n’ime oghere igodo e-akpa ego ya, na n’ihe ọzọ dị n’oghere ahụ.

### Zcash

Zcash na-eji [ZIP 32, *E-akpa ego Hierarchical Deterministic e chebere echebe*](https://zips.z.cash/zip-0032), nke ọnọdụ ya bụ **Final**. Kama itinye igodo e chebere echebe n’ime otu osisi BIP 32, ZIP 32 na-enye pool ọ bụla e chebere echebe master key nke ya na ụzọ nke ya:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose` ka edobere na `32'` (0x80000020) dịka BIP 43 si dị, na `coin_type` na-agbaso SLIP 44, ebe testnet niile na-ekekọrịta index `1`.

N’ime akaụntụ Orchard, usoro nhazi ahụ na-aga naanị n’otu ụzọ — ọkwa ọ bụla nwere ike iwepụta ihe niile dị n’okpuru ya ma ọ nweghị ihe dị n’elu ya:

| Igodo | Ihe ọ pụrụ ime | Ihe ọ na-ewepụta |
|---|---|---|
| Spending key | Mefuo note | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Nye ikike imefu ego | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Hụ Kwụọ ụhwọ na-abata **na** nke na-apụ | IVK, OVK |
| Incoming Viewing Key | Hụ naanị Kwụọ ụhwọ na-abata | Adreesị akpa ego dịgasị iche |
| Outgoing Viewing Key | Nweta nkọwa Kwụọ ụhwọ na-apụ ọzọ | — |
| Diversified address | Nata | — |

Orchard mere ka nke a dị mfe ma e jiri ya tụnyere Sapling: dịka [Orchard Book](https://zcash.github.io/orchard/design/keys.html) si kwuo, e wepụrụ igodo nzuzo nullifier `nsk`, `nk` ghọrọ ihe dị n’ubi kama ịbụ ebe dị n’akụkụ curve, ma ugbu a a na-ewepụta `ovk` site na full viewing key kama ijide ya iche.

N’elu nke a dị [ZIP 316, *Adreesị akpa ego jikọtara ọnụ na Unified Viewing Keys*](https://zips.z.cash/zip-0316) — Revision 0 Active, Revision 1 Withdrawn, Revision 2 Draft — nke na-achịkọta igodo kwa pool n’ime **Unified Full Viewing Key** (“na-ejikọta ọtụtụ Full Viewing Key… Items”) na **Unified Incoming Viewing Key**. Ọdịiche onye mmepụta e-akpa ego ga-asọpụrụ: UFVK na-ekpughe ọrụ na-abata na nke na-apụ, UIVK na-ekpughe naanị nke na-abata.

### Dash

Dash na-agbanye ihe niile n’osisi BIP 32 a na-ahụkarị, nke nwere ụdị ego SLIP 44 `5'`, ma gbakwunye mgbatị nwepụta igodo abụọ nke ya.

[DIP-0009, *Ụzọ Nwepụta Atụmatụ*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html) na-etinye ọkwa **atụmatụ** nke na-ekewa oghere igodo site n’ọrụ pụrụ iche nke ego:

```
m / purpose' / coin_type' / feature' / *
```

ebe `purpose` ka edobere na `9'` (0x80000009), na `coin_type` na `5'` (0x80000005). Ebumnuche DIP ahụ kwuru bụ ikewapụ — *“ọ pụrụ ịdị mma idobe ego agwakọtara n’ụzọ a kewapụrụ na ego a na-agwakọtaghị.”*

[DIP-0014, *Nwepụta Igodo Agbatịpụtara site na Integer Enweghị Akara nke 256-bit*](https://github.com/dashpay/dips/blob/master/dip-0014.md) na-aga n’ihu, na-ebuli oke index 31-bit BIP 32 ka akụkụ ụzọ wee nwee ike iburu uru 256-bit zuru ezu. Nke ahụ na-enye ohere maka ụzọ sitere na njirimara dịka:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

ebe akụkụ abụọ ikpeazụ bụ hash njirimara onye ọrụ. Zcash enweghị ihe kwekọrọ na ya: ZIP 32 enweghị echiche iwepụta ụzọ igodo site na njirimara onye ọzọ.

### Ebe ha abụọ si dị iche n’ezie

**Osisi nta e chebere echebe bụ otu.** Igodo e chebere echebe Dash bụ igodo Orchard, n’ihi na pool e chebere echebe Dash bụ Orchard. Onye mmepụta e-akpa ego na-akwaga n’etiti ha abụọ na-arụ ọrụ n’otu nhazi sitere n’igodo ego gaa na viewing key.

**Ịgbanye mgbọrọgwụ dị iche.** Zcash na-ekewapụ pool ọ bụla e chebere echebe n’okpuru master key nke ya nwere nzube `32'`. Dash na-ekonye atụmatụ e chebere echebe n’otu osisi jikọtara ọnụ n’okpuru nzube `9'`, n’akụkụ atụmatụ ọ bụla ọzọ. Nkewa Zcash bụ site na pool cryptography; nke Dash bụ site na atụmatụ ngwaahịa.

**Oghere igodo Dash nwere ihe oghere Zcash enweghị: ngalaba BLS dị iche.** Igodo ndị ọrụ Masternode, igodo ntuli aka, na igodo quorum nke LLMQs na-eji bụ igodo BLS, ọ bụghị igodo ezinụlọ Schnorr, ma ha dị kpamkpam n’èzí osisi BIP 32 akọwara n’elu. Nke a bụ kpọmkwem ebe mbinye aka oke dị ugbu a nke Dash dị — na kpọmkwem ihe mere na ọ naghị ejikọta na nnabata imefu ego Orchard, dịka akụkụ na-esote si depụta.

**Nwepụta ejikọtara na njirimara bụ naanị nke Dash.** Ụzọ 256-bit DIP-0014 dị iji wepụta igodo site na mmekọrịta dị n’etiti njirimara. Nke ahụ bụ echiche Dash Platform nke enweghị ihe kwekọrọ na Zcash, ọ bụkwa ihe atụ kachasị doo anya na atụmatụ nwepụta abụọ ahụ kewara ụzọ n’ama ụma, ọ bụghị na mberede.

*Lee Figure 1 maka atụmatụ ịgbanye mgbọrọgwụ abụọ ahụ na-abịakọta n’osisi nta Orchard kesara.*

---

## FROST: ajụjụ mepere emepe n’ezie

Dash nwere usoro signature oke toro eto na **LLMQs dabere na BLS** (Long-Living Masternode Quorums), nke eji maka ChainLocks, InstantSend, na consensus validator Dash Platform.

[ZIP 312, *FROST maka Spend Authorization Multisignatures*](https://zips.z.cash/zip-0312), nke ọnọdụ ya bụ **Draft**, na-eme ihe ọzọ. Ọ na-eme ka signature nnabata imefu ego dabere na Schnorr nke Sapling na Orchard kọwaralarị — **RedJubjub** na **RedPallas** n’otu n’otu — bụrụ nke ọtụtụ mmadụ ga-ekwenyerịrị, nke mere na, dịka nhazi ZIP si dị, *“ndị ọrụ na ọrụ ndị ọzọ na-ekekọrịta nlekọta e-akpa ego, ma ọ bụ ìgwè mmadụ na-ejikwa ego kesara”* nwere ike ịchọ nkwado oke dịka 2-of-3 tupu imefu ego. A na-ahazi ya dịka atụmatụ **e-akpa ego** ZIP: ọ na-emepụta signature dakọtara na nnabata imefu ego dị ugbu a kama ịgbanwe consensus. Ọ na-edobe ọrụ Coordinator, nke ZIP jụrụ iwepụ, ma kwurịta ma mmepụta igodo nke onye a tụkwasịrị obi na mmepụta igodo kesara.

Ọdịiche dị mkpa, na ihe kpatara na ndị a abụghị ndị dochie ibe ha:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Usoro signature | BLS | Schnorr — RedJubjub / RedPallas |
| Onye na-abanye signature | Quorum nke masternodes | Obere ìgwè ndị ji igodo n’otu n’otu |
| Ihe a na-enye ikike | Eziokwu netwọkụ: mkpọchi block, mkpọchi Azụmahia | Imefu ego site n’otu akaụntụ e chebere echebe |
| Ọkwa | Consensus | E-akpa ego |
| Oghere igodo | Ngalaba BLS dị iche | Igodo nnabata imefu ego Orchard/Sapling |
| Ọnọdụ | Etinyelarị n’ọrụ | Draft, enweghị mmejuputa ntụaka |

Inwe BLS signature oke Dash apụtaghị na o nwere, ma ọ bụ na ọ chọrọ, FROST. Mana ọ pụtara na ndị injinia Dash nwere ahụmịhe n’ime ụlọ gbasara mbinye aka oke, mmepụta igodo kesara, na nhazi quorum — ahụmịhe a pụrụ ibufe n’ezie ma ọ bụrụ na ha ahọrọ iwulite nke a.

*Lee Figure 2 maka ihe usoro ọ bụla na-abanye signature n’elu ya n’ezie.*

### Ihe FROST dị na fork Dash Orchard ga-achọ, na nyocha mbụ

1. **Emume DKG na mbinye signature FROST n’elu RedPallas**, usoro nnabata imefu ego Orchard — ụdị Schnorr dị n’elu curve Pallas. Nke a dị iche na, ọ dịghịkwa ebelata n’ime, BLS DKG dị ugbu a Dash maka LLMQs.
2. **Nkwado e-akpa ego na UX maka mbinye signature nke ọtụtụ mmadụ na otu akaụntụ e chebere echebe**, nke bụ usoro mmekọrịta dị iche na ngwaọrụ masternode-quorum ma chọọ ihe kwekọrọ na Coordinator.
3. **Mkpebi banyere ọkwa.** O yikarịrị ka ọ ga-adị n’ogo e-akpa ego naanị, ebe ZIP 312 nwere oke dịka atụmatụ e-akpa ego n’elu primitives dị ugbu a kama ịbụ mgbanwe consensus — mana a ghaghị ikwenye nke a kpọmkwem megide fork Dash Orchard, ọ bụghị iche na ọ bụ otú ahụ n’ihi oke Zcash.

---

## Nkwado

**Viewing keys — dekọọ ha, enwela nyocha.** E tinyelarị ike ahụ n’ọrụ na chain abụọ ahụ. Ndetu wiki dị mkpirikpi nke na-edekọ na pool e chebere echebe Dash gụnyere view keys, ma jikọta roadmap Dash, na-egbochi ndị na-ege ntị ZecHub iche na ọ ka bụ echiche naanị. Soro ndakọrịta wire-format ka chain abụọ ahụ na-etolite.

**FROST — ezigbo ohere, mana upstream egbochila ya.** Ọ dabere na ZIP 312 iru mmejuputa ntụaka, ma ọ bụ Dash ịhọrọ iwu ya n’otu oge. ZecHub enweghị ike ime ka ọ dị ngwa kpọmkwem.

**Nzọụkwụ ọzọ bara uru kacha elu bụ mkparịta ụka, ọ bụghị nyocha desk ọzọ.** Ndị ga-ewu nke a dị mfe iru. Shielded Labs na-akwọ ZIP 312; ndị otu injinia Dash ejirila nkwado zaghachi usoro “e si na Zcash gbaziri” gbasara njikọta Orchard. Eriri mkparịta ụka n’etiti obodo abụọ ahụ ga-ekpughe ihe karịa ntụgharị ọgụgụ ọzọ, nchịkọta a eruola oke nke ebe isi mmalite ọha nwere ike idozi.

---

## Figures

**Figure 1 — Ịgbanye mgbọrọgwụ nke nwepụta igodo: Zcash ZIP 32 na Dash DIP-0009/0014, na-abịakọta n’osisi nta Orchard kesara.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Figure 2 — Ihe usoro oke ọ bụla na-abanye signature n’elu ya: quorum masternode na-akwado eziokwu netwọkụ, megide ìgwè ndị ji igodo na-enye ikike otu mmefu e chebere echebe.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Ebe isi mmalite

**Zcash — protocol**
- [ZIP 32: E-akpa ego Hierarchical Deterministic e chebere echebe](https://zips.z.cash/zip-0032) — ọnọdụ Final
- [ZIP 224: Protocol e chebere echebe Orchard](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST maka Spend Authorization Multisignatures](https://zips.z.cash/zip-0312) — ọnọdụ Draft
- [ZIP 316: Adreesị akpa ego jikọtara ọnụ na Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [The Orchard Book — Igodo na adreesị akpa ego](https://zcash.github.io/orchard/design/keys.html)
- [Nkọwapụta Protocol Zcash](https://zips.z.cash/protocol/protocol.pdf) — akụkụ igodo, §5.6.4

**Dash — protocol na ọkwa**
- [Azụmahia e chebere echebe amalitela na Dash Evolution mainnet](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 Ọgọọst 2026
- [Dash Na-agbakwunye Azụmahia e chebere echebe na Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 Febrụwarị 2026
- [Dash Roadmap](https://www.dash.org/roadmap/) — Shielded Balances, emechara na Julaị 2026, Platform v4.0; emelitere 12 Septemba 2026
- [DIP-0009: Ụzọ Nwepụta Atụmatụ](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Nwepụta Igodo Agbatịpụtara site na Integer Enweghị Akara nke 256-bit](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Dash Ndekọ Core — Masternode Quorums (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [dashpay/dips repository](https://github.com/dashpay/dips)

**Akụkọ e mere n’oge ahụ**
- [Dash wepụtara teknụzụ Zcash Orchard n’ime nkwalite Nzuzo](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash Webatara Nzuzo Zcash Orchard na Evolution Chain maka Azụmahia e chebere echebe](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*E nyochara ebe isi mmalite na 27 Septemba 2026. Dash Platform na ZIP 312 na-agagharị; a ghaghị nyochaghachi ọnụ ọgụgụ na ọnọdụ tupu ebipụta ya ọzọ.*
