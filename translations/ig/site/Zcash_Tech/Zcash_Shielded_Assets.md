
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Akụ Zcash Chebere

## TL;DR

Zcash Shielded Assets (ZSA) bụ usoro a tụrụ aro nke ga-ekwe ka akụ **na-abụghị ZEC** — stablecoins, governance tokens, ma ọ bụ ihe onwunwe ọ bụla e ji aka rụọ — biri n'ime ọdọ mmiri Zcash's, ebe onye zitere ya, onye natara ya, na ego ahụ ga-anọ n'ime nzuzo.

- **Ihe ọ bụ:** Akụrụngwa omenala ERC-20, mana echekwara ya site na ndabara.
- **Ònye na-ewu ya:** [QEDIT](https://qed-it.com/), n'okpuru onyinye sitere na Zcash Foundation, na mmekorita ya na Electric Coin Company.
- **Otu esi kọwaa ya:** [ZIP 226](https://zips.z.cash/zip-0226) (nyefe ma gbaa ọkụ) yana [ZIP 227](https://zips.z.cash/zip-0227) (mwepụta).
- **Ọnọdụ:** anaghị adị na mainnet ma ọ bụghị akụkụ nke Network Upgrade 7 (NU7). [ZIP 259](https://zips.z.cash/zip-0259), nke depụtara ihe niile NU7 na-etinye, anaghị etinye ZIP 226 ma ọ bụ ZIP 227, e dobebeghịkwa ụbọchị mmalite ZSA.
- **Ụgwọ:** A na-akwụ ụgwọ mgbe niile na ZEC, n'agbanyeghị ihe onwunwe ahụ a na-akwaga.

---

## Nkọwa Isi

Zcash Shielded Assets (ZSA) bụ atụmatụ maka imeziwanye usoro Zcash nke ga-eme ka e nwee ike ịmepụta, nyefee, na ịgba akụ omenala na usoro Zcash.

Ọ bụrụ na ị maara nke ọma [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) ọkọlọtọ akara ngosi na blockchain Ethereum, ZSAs dị na Zcash dịka akara ngosi ERC-20 dị na Ethereum.

Zcash Shielded Assets ga-enye ohere ịmepụta ihe nrịbama omenala na Zcash blockchain, si otú a na-enye ohere maka ihe nrịbama ndị ọzọ na-abụghị [ZEC](/guides/using-zec-privately) iji rite uru site na nzuzo na nzuzo nke azụmahịa echekwara na Zcash blockchain.

Otu isi ihe nwere ike ime iji ZSAs bụ iwepụta stablecoins na usoro Zcash. Stablecoins bụ ego dijitalụ nke na-atụnye uru ha na ego fiat, dị ka Dollar US ma ọ bụ Euro. Ugbu a, ụfọdụ n'ime stablecoins kacha agbasa bụ ihe ngosi ERC-20 dịka [USDC](https://www.circle.com/en/usdc) na [Daị](https://docs.makerdao.com/).

Ojiji ọzọ nke ZSA ga-abụ maka iwepụta akara nchịkwa. Dịka ọmụmaatụ, ZecHub (onye bipụtara wiki a) bụ otu Decentralized Autonomous Organization (DAO) ma nwee ike ịmepụta ma nye ndị otu ya ZSA maka ịtụ vootu na atụmatụ na mkpebi ọchịchị.

A na-emepụta ZSA site na [QEDIT](https://qed-it.com/), n'okpuru nnukwu onyinye sitere n'aka [Zcash Foundation](/zcash-organizations/zcash-foundation) na mmekorita ya na [Electric Coin Company](/zcash-organizations/electric-coin-company)Ebe ọ bụ na a ka na-emepe ọrụ a nke ọma, a na-etinye mmelite na [eriri a](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) nke ogbako Zcash [Ngwa onyinye ZSA](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) site na QEDIT dị na weebụsaịtị onyinye Zcash Foundation.

---

## Anya / Ihe atụ

### Envelopu ahụ e mechiri emechi

Chee echiche banyere azụmahịa Zcash nke e ji ihe mkpuchi kpuchie dị ka envelopu nkịtị e tinyere n'ime igbe ozi ọha. Onye ọ bụla nwere ike ịhụ na e tinyere envelopu. Ọ dịghị onye nwere ike ịhụ onye zitere ya, onye na-anakọta ya, ma ọ bụ ihe dị n'ime ya - envelopu ọ bụla na-adịkwa ka nke ọ bụla ọzọ.

Taa, envelopu dị na netwọk Zcash nwere ike ibu naanị otu ihe: ZEC.

ZSA anaghị agbanwe envelopu ahụ. Ọ na-agbanwe **ihe a na-ekwe ka ọ dị n'ime ya**. Mgbe ZSA gasịrị, envelopu ahụ e mechiri emechi nwere ike ibu stablecoin, akara nchịkwa DAO, ma ọ bụ ebe iguzosi ike n'ihe ụlọ ọrụ - site n'èzí ọ ka ga-adị ka envelopu ọ bụla ọzọ dị na netwọk ahụ.

Otu nkọwa dị mkpa ka a mara: **a na-akwụ ụgwọ ozi mgbe niile na ZEC**, n'agbanyeghị ihe dị n'ime envelopu ahụ.

### Ihe onye na-ekiri ihe na mpụga nwere ike ịhụ

| Onye na-ekiri ihe nwere ike ịhụ... | ERC-20 na Ethereum | ZSA na Zcash |
| --- | --- | --- |
| Onye zitere ya | Ọha | Ekpuchiri |
| Onye natara ya | Ọha | Ekpuchiri |
| Ego ole ka e bufere | Ọha | Ekpuchiri |
| Nhazi nkeonwe | Ọha | Ekpuchiri |
| Mkpokọta ọkọnọ nke ihe onwunwe ahụ | Ọha | **Ọha — n'amaghị ama** |
| Ego a na-akwụ ụgwọ ahụ na ya | ETH | ZEC |

### Ihe kpatara ahịrị ọkọnọ anaghị abụ nsogbu

Ahịrị abụọ dị n'okpuru tebụl ahụ bụ ebe ZSA na-adọrọ mmasị.

ZIP 227 na-eme ka **ntinye ego doro anya**, ka e wee nwee ike ịchọpụta nnyefe nke akụ ọ bụla n'usoro. Ego nke onye ọ bụla na ụgwọ nke onye ọ bụla na-anọgide na nzuzo; ọnụọgụgụ niile nke tokens dị adị adịghị.

Maka onye na-ewepụta stablecoin, njikọta ahụ bụ isi ihe kama nkwekọrịta. Enwere ike inyocha ego echekwara site na ngwaahịa a na-enyocha n'ihu ọha, ebe ndị mmadụ na-eji ihe nrịbama ahụ na-edebe ego ha na ụgwọ ha nye onwe ha.

### Otu ihe onwunwe, otu njirimara

Akụ ọ bụla na-enweta **Asset Identifier** pụrụ iche, nke sitere na igodo mwepụta nke onye nyere ya yana nkọwa ederede nke akụ ahụ. Ndị na-enye abụọ dị iche iche enweghị ike ịmepụta otu njirimara ahụ, ịkpụpụta ma ọ bụ ịgbanwe akụ ahụ chọrọ ikike nzuzo site n'aka onye nyere ya. N'okwu envelopu: onye ọ bụla nwere ike itinye envelopu, mana naanị mint nke nwere akụ enyere nwere ike ibipụta karịa ya.

---

## Mmiri miri emi

### Ngosipụta ZSA na Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Gbaa ngosi ahụ maka onwe gị!**

Mechie ebe nchekwa zcash-tx-tool: [https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Atụmatụ Mmezi Zcash (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Nnyefe na Ọkụ nke Akụ Zcash Chebere
- [ZIP 227](https://zips.z.cash/zip-0227): Mwepụta nke Akụ Zcash Chebere
- [ZIP 230](https://zips.z.cash/zip-0230)Ụdị nke 6 Usoro Azụmahịa

> **Rịba ama na ZIP 230:** E wepụrụ ZIP 230 kemgbe ahụ, agaghịkwa etinye ya n'ọrụ. A na-akọwapụta ụdị azụmahịa nke 6 ugbu a site na [ZIP 229](https://zips.z.cash/zip-0229)Lee ọkwa dị n'elu nke [ZIP 230](https://zips.z.cash/zip-0230) peeji.

ZIP 226 na-akọwa usoro OrchardZSA — ndọtị nke usoro Orchard nke na-ebufe ma gbaa akụ omenala. ZIP 227 na-akọwa otu esi emepụta akụ ndị ahụ na mbụ, a ga-etinyerịrị ya naanị na ZIP 226.

### Atụmatụ Enyemaka ZSA

E gosipụtara atụmatụ ZSA maka Akụ̀ Nchekwa (ZSA/UDA) site n'aka ndị otu ahụ [QEDIT](https://qed-it.com/) otu iji wulite akụ nchekwa nkịtị na blockchain Zcash. A na-akpọkarị ndị a Akụ Akọwapụta Onye Ọrụ (UDA) ma ọ bụ Zcash Shielded Assets (ZSA).

Site na atụmatụ a, ndị otu ahụ nọ na [QEDIT](https://qed-it.com/) atụmatụ iweta DeFi na gburugburu Zcash ma, n'otu oge ahụ, mee ka ojiji nke teknụzụ nzuzo kacha mma n'ime gburugburu DeFi dị ugbu a kwe omume. Na nyocha ntuli aka, ndị otu ahụ jụrụ, obodo ahụ wee zaa nke ahụ [ihe onwunwe nchekwa izugbe (ZSA/UDA) bụ atụmatụ kachasị achọ ugbu a](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Atụmatụ ndị a kwekọrọ na teknụzụ [Atụmatụ Mmezi Zcash (ZIP)](https://zips.z.cash/zip-0000) nkọwapụta na akọwapụtara na ZIP 226 na ZIP 227.

1. [ZIP 226](https://zips.z.cash/zip-0226): Nnyefe na Ọkụ nke Akụ Zcash Chebere
2. [ZIP 227](https://zips.z.cash/zip-0227): Mwepụta nke Akụ Zcash Chebere

---

## Mmetụta Bara Uru

**Ọ bụrụ na ị jide maọbụ jiri ZEC**

- A na-akọwa ZSAs dị ka ndọtị nke Orchard ("OrchardZSA"), yabụ ha ga-ekerịta igwe nchekwa ZEC ejirila. Akpa gị ga-achọ nkwado ZSA doro anya tupu o nwee ike ijide ma ọ bụ ziga ha.
- Ị ga-achọ ụfọdụ ZEC n'aka mgbe niile. A na-akwụ ụgwọ maka ịnyefe na ịnyefe ZSA na ZEC, ọ bụghị n'ime ihe onwunwe ahụ n'onwe ya.
- Ọ dịghị ihe ọ bụla gbasara azụmahịa ZEC gị dị ugbu a gbanwere.

**Ọ bụrụ na ị bụ onye nwere ike inye — stablecoin, DAO, ụlọ ọrụ**

- Inye ihe onwunwe chọrọ ikike nzuzo nke ejikọtara na igodo mwepụta, yabụ naanị gị nwere ike ịmepụta ma ọ bụ gbanwee njirimara nke ihe onwunwe gị.
- A na-enyocha ọnụọgụgụ ihe onwunwe gị n'ihu ọha ebe a naghị enyocha ego na nnyefe nke ndị ọrụ gị. Maka onye na-enye ọrụ a na-achịkwa, nke a na-abụkarị njikọta kpọmkwem achọrọ.
- Otu azụmahịa mwepụta nwere ike ịmepụta ihe karịrị otu ihe onwunwe n'otu oge.

**Maka gburugburu ebe obibi**

- Ebe ọ bụ na a na-akpọ ụgwọ ZSA ọ bụla na ZEC, ọrụ dị na akụ ọ bụla a ga-enye n'ọdịnihu na Zcash na-eme ka a chọọ ZEC n'onwe ya.

---

## Mmejọ Ndị A Na-emekarị

| Nkwenye a na-ekwenyekarị | Gịnị bụ eziokwu? |
| --- | --- |
| "A na-eme ZSAs na Zcash taa." | Ha abụghị. ZSA abụghị akụkụ nke Network Upgrade 7 (NU7), nke [ZIP 259](https://zips.z.cash/zip-0259) na-akọwapụta na-enweghị ZIP 226 ma ọ bụ ZIP 227, a ka na-enyocha ma na-anwale ya. |
| "ZSA na-eweta nkwekọrịta amamihe nye Zcash." | ZSA na-akọwapụta mwepụta, nnyefe na ọkụ nke ihe onwunwe. Ọ bụghị nkwekọrịta a na-eme atụmatụ maka ebumnuche izugbe. |
| "Ị nwere ike ịkwụ ụgwọ ZSA na akara ZSA n'onwe ya." | A na-akwụ ụgwọ na ZEC. |
| "Ọ bụrụ na e chebere ya, ọkọnọ ihe nrịbama ahụ aghaghị ịbụ ihe nzuzo." | ZIP 227 na-eme ka mwepụta ahụ doo anya n'ebumnobi, ya mere enwere ike ịchọpụta nnyefe nke ihe onwunwe ọ bụla n'ihu ọha. Nha na nnyefe na-anọgide na nzuzo; nnyefe ahụ anaghị adị. |
| "ZIP 230 bụ usoro azụmahịa nke ụdị 6 ugbu a." | A napụrụ ZIP 230. A na-akọwa ụdị nke 6 ugbu a site na ZIP 229. |

---

## Peeji ndị metụtara ya

- [Halo](/zcash-tech/halo) - usoro ihe akaebe dị n'azụ Orchard, usoro ZSA na-agbatị
- [zk-SNARKs](/zcash-tech/zk-snarks) — ihe akaebe efu nke na-ekwe ka a chọpụta mbufe echekwara n'enweghị ekpughe ya
- [Ọdọ Mmiri E Kpuchiri Ekpuchi](/using-zcash/shielded-pools) — ebe ZSA ga-ebi n'akụkụ ZEC
- [Azụmahịa](/using-zcash/transactions) - otu esi ejikọta azụmahịa Zcash
- [Zebra zuru oke](/zcash-tech/zebra-full-node) — mmejuputa node ejiri mee ihe na ngosi ZSA dị n'elu
