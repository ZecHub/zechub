
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Akụ Zcash Echebe

## TL;DR

Zcash Shielded Assets (ZSA) bụ ndọtị usoro iwu a chọrọ nke ga-ekwe ka akụ ** ndị ọzọ karịa ZEC**  stablecoins, akara ngosi ọchịchị, ma ọ bụ ihe onwunwe omenala ọ bụla na -ebi n'ime ọdọ mmiri echekwara nke Zcash, ya na onye zitere ya, onye natara ya, yana ego ahụ.

- ** Ihe ọ bụ:** Ụdị ERC-20 omenala, ma echekwara ya na ndabara.
- **Onye na-ewu ya:** [QEDIT](https://qed-it.com/), n'okpuru onyinye sitere na Zcash Foundation, na mmekorita ya na Electric Coin Company.
- **Otu esi akọwa ya:** [ZIP 226  Ihe e dere n'ala ala peeji](https://zips.z.cash/zip-0226) (na-ebufe na ọkụ) tinyere ya. [ZIP 227 (mkpọka)](https://zips.z.cash/zip-0227) (mgbapụta).
- **Ọnọdụ:** adịghị ndụ na mainnet. A haziri usoro ZSA maka nkesa na Network Upgrade 7 (NU7).
- ** Fees:** always paid in ZEC, irrespective of the asset being moved. Ego a na-akwụ mgbe niile bụ ego ndị dị n'obodo ahụ.

---

## Nkọwa nke isi ihe dị na ya.

Zcash Shielded Assets (ZSA) bụ nkwalite a na-atụ aro maka usoro iwu Zcash nke ga - eme ka okike, nyefe, ma gbaa akụ omenala n'agbụ Zcash.

Ọ bụrụ na ị maara usoro ahụ, ọ ga-enyere gị aka. [ERC-20 (Ebe E Si Nweta Ego)](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) akara ngosi na Ethereum blockchain, ZSAs bụ maka Zcash dị ka ERC-20 tokens bụ maka Ethereum.

Zcash Shielded Assets ga-eme ka e nwee ike ịmepụta akara ngosi omenala na blockchain nke Zcash, si otú ahụ kwe ka ndị ọzọ karịa ihe ncheta. [ZEC](/guides/using-zec-privately) iji rite uru site na amaghị aha na nzuzo nke azụmahịa echekwara na Zcash blockchain.

Otu ihe dị mkpa nke ZSA ga-abụ inyefe stablecoins na protocol Zcash. Stablecoin bụ cryptocurrencies ndị jikọtara ọnụ ahịa ha na ego fiat, dịka US Dollar ma ọ bụ Euro. Ugbu a, ụfọdụ n'ime ụdị nkwụsịtụ kachasị agbasa ozi ọma bụ ERC-20 tokens dị ka: [USDC (mkpụrụ ego)](https://www.circle.com/en/usdc) na nke a: [Dai (n'asụsụ Bekee)](https://docs.makerdao.com/).

Ihe ọzọ enwere ike iji ZSA mee bụ maka inye akara njikwa. Dịka ọmụmaatụ, Zechub (onye na-ebipụta wiki a) bụ Decentralized Autonomous Organization (DAO) ma nwee ike ịmepụta ma nye ndị otu ya ZSA ka ha votu na atụmatụ na mkpebi ọchịchị.

A na-emepe ZSA site n'aka ndị ọrụ: [QEDIT](https://qed-it.com/), n'okpuru nnukwu onyinye sitere na Ụlọ Ọrụ Na-ahụ Maka Mmekọ Ihe Ọmụma nke United States . [Zcash Foundation](/zcash-organizations/zcash-foundation) na mmekorita ya na ndị ọrụ ahụike. [Electric Coin Company](/zcash-organizations/electric-coin-company)Ebe ọ bụ na a ka na-arụ ọrụ nke ọma, a ga-ebipụta mmelite ndị ọhụrụ n'elu. [eriri a.](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) nke Zcash forum. The [ZSA arịrịọ onyinye ego](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) site na QEDIT dị na ebe nrụọrụ weebụ Zcash Foundation.

---

## Ihe Anya / Ntụle

### Envelopu ahụ e mechiri emechi .

Were azụmahịa Zcash echekwara dị ka envelopu a na-ekpuchi ekpochi, nke emechiri emechi n'ime igbe akwụkwọ ozi ọha. Onye ọ bụla nwere ike ịhụ na e zigara ya. Ọ dịghị onye nwere ike ịlele onye zitere ya, maọbụ ihe dị n'etiti  na envelopụ niile yiri ibe ha.

Taa, envelopu dị na netwọkụ Zcash nwere ike ibu naanị otu ihe: ZEC.

ZSA does not change the envelope. It changes **what is allowed inside it**. After ZSA, the same sealed envelope could carry a stablecoin, a DAO governance token, or a company loyalty point — and from the outside it would still look exactly like every other envelope on the network.

Otu ihe dị mkpa ka anyị buru n'uche bụ: ** a na-eji ZEC akwụ ụgwọ nzipu ozi mgbe nile, n'agbanyeghị ihe e dere n'ime envelopu ahụ.

### Ihe onye si n'èzí na-ekiri ihe ndị a pụrụ ịhụ

| Onye na-ekiri ihe nwere ike ịhụ... | ERC-20 na Ethereum | ZSA na Zcash |
| --- | --- | --- |
| Onye zitere ya | Ọha | Ekpuchiri |
| Onye natara ya | Ọha | Ekpuchiri |
| Ego ole ka e bufere | Ọha | Ekpuchiri |
| Nhazi nkeonwe | Ọha | Ekpuchiri |
| Mkpokọta ọkọnọ nke ihe onwunwe ahụ | Ọha | **Ọha — n'amaghị ama** |
| Ego a na-akwụ ụgwọ ahụ na ya | ETH | ZEC |

### Ihe mere ahịrị ọkọnọ abụghị ahụhụ

Ahịrị abụọ dị n'okpuru tebụl bụ ebe ZSA na-adọrọ mmasị.

ZIP 227 na-eme ka ** mbipụta nke ihe ngosi doro anya, yabụ enwere ike ịchọta ọnụọgụ ego ọ bụla. Ihe onwunwe ndị mmadụ n'otu n' otu na ịkwụ ụgwọ dị iche iche ga - anọgide na nzuzo; ọnụ ọgụgụ zuru ezu nke akara aka adịghị adị.

Maka onye na-ewepụta ego, njikọta ahụ bụ isi kama ịbụ nkwekọrịta. Enwere ike inyocha ihe ndị echekwara megide ọkọnọ a ga - enyochakwa n'ihu ọha, ebe ndị mmadụ na - eji akara ngosi eme ka nguzozi ha na ịkwụ ụgwọ maka onwe ha.

### Otu akụ, otu njirimara.

Akụ ọ bụla na-enweta ** Asset Identifier** pụrụ iche, nke sitere na igodo mbipụta onye bipụtara ya yana nkọwa ederede banyere akụ ahụ. Ndị na -ewepụ ihe abụọ dị iche enweghị ike ịmepụta otu njirimara ahụ, ma ịkpụ ego ma ọ bụ ịgbanwe akụrụngwa chọrọ ikike cryptographic site n'aka onye nyere ha akwụkwọ ozi. N'okwu envelopu: onye ọ bụla nwere ike izipu envelopụ, mana naanị mint nke nweere onwe ya nwere ike ibipụta karịa ya.

---

## Ịbanye n'Okpuru Mmiri Dị Omimi

### Ihe ngosi ZSA na Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

** Na-agba ọsọ ngosi maka onwe gị!**

Kpoo ebe nchekwa zcash-tx: [https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Zcash Improvement Proposals (ZIPs) Ihe ndị a chọrọ imezi

- [ZIP 226  Ihe e dere n'ala ala peeji](https://zips.z.cash/zip-0226): Nyefe na Ọkụ nke Akụrụngwa Zcash Echebe
- [ZIP 227 (mkpọka)](https://zips.z.cash/zip-0227): Mwepụta nke Zcash Shielded Assets
- [ZIP 230 Ụlọ ọrụ](https://zips.z.cash/zip-0230): Ụdị Mmekọrịta Version 6

> ** Ihe edeturu na ZIP 230:** A kagbuola ZIP 230, a gaghịkwa etinye ya. N'oge ugbu a, akọwapụtara ụdị azụmahịa 6 site n'aka onye ọrụ nke abụọ (onye ahịa) iji mee ka usoro ahụ dị mfe maka ndị mmadụ niile ma ọ bụ ihe omume ha nwere ike ime mgbe ụfọdụ. [ZIP 229  Ihe e dere n'asụsụ Bekee](https://zips.z.cash/zip-0229). Lee ọkwa dị n'elu nke akwụkwọ ahụ. [ZIP 230 Ụlọ ọrụ](https://zips.z.cash/zip-0230) peeji nke.

ZIP 226 defines the OrchardZSA protocol — an extension of the Orchard protocol that carries the transfer and burn of custom assets. ZIP 227 defines how those assets are created in the first place, and must only be implemented alongside ZIP 226.

### ZSA Onyinye onyinye

ZSA maka Shielded Assets (ZSA/UDA) bụ nke ndị ụlọọrụ ahụ tụpụtara. [QEDIT](https://qed-it.com/) otu iji wuo akụ na-echebe ihe niile n'elu Zcash blockchain. A na -akpọkarị ndị a dị ka Akụrụngwa akọwapụtara onye ọrụ (UDA) ma ọ bụ dịka Ihe onwunwe echedoro nke Zcash (ZSA).

Site n'atụmatụ a, ndị otu na-arụ ọrụ na ụlọọrụ ahụ. [QEDIT](https://qed-it.com/) atụmatụ iji weta DeFi na usoro okike Zcash ma, n'otu oge ahụ, mee ka o kwe omume iji teknụzụ nzuzo kachasị mma n'ime usoro okirikiri nke DeFi dị ugbu a. N'ajụjụ ọnụ ndị otu jụrụ ajụjụ, obodo wee zaa ya: [generic shielded assets (ZSA/UDA) bụ ihe kachasị achọ n'oge a.](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

A na-eji usoro ndị a eme ihe n'ụzọ kwekọrọ na nke mbụ. [Zcash Improvement Proposal (ZIP) Nkwupụta Mmezi](https://zips.z.cash/zip-0000) nkọwapụta ma kọwaa ya na ZIP 226 & ZIP227.

1. [ZIP 226  Ihe e dere n'ala ala peeji](https://zips.z.cash/zip-0226): Nyefe na Ọkụ nke Akụrụngwa Zcash Echebe
2. [ZIP 227 (mkpọka)](https://zips.z.cash/zip-0227): Mwepụta nke Zcash Shielded Assets

---

## Ihe Ndị A Pụrụ Ime n'Ọrụ Ahụ

** Ọ bụrụ na i nwere ma ọ bụ jiri ZEC**

- A na-akọwa ZSAs dị ka ndọtị nke Orchard ("OrchardZSA"), yabụ ha ga - ekekọrịta igwe mkpuchi ZEC ejirila. Obere akpa gị ga - achọ nkwado doro anya maka ZSA tupu ọ nwee ike ijide ma ọ bụ zipu ha.
- Ị ga-achọ mgbe ụfọdụ ZEC n'aka. A na-akwụ ụgwọ maka ịnyefe ma nyefee ZSA na ZEC, ọ bụghị ihe onwunwe ahụ n'onwe ya.
- Onweghị ihe gbanwere na azụmahịa ZEC gị dị ugbu a.

** Ọ bụrụ na ị bụ onye nwere ike inye ego  a stablecoin, DAO, ụlọ ọrụ**

- Ịnye akụ chọrọ ikike nke crypto jikọtara ya na igodo nnyefe, n'ihi ya naanị ị nwere ike ịme ma ọ bụ gbanwee àgwà nke ihe onwunwe gị.
- Ihe onwunwe gị na-ekesa ihe a ga - enyocha n'ihu ọha ebe ndị ọrụ gị nwere ike ịkwụ ụgwọ ma nyefee ya. Maka onye nyere iwu, nke a bụkarị ngwakọta zuru oke achọrọ.
- Otu azụmahịa nke ịnyefe nwere ike ịmepụta ihe karịrị otu akụ n'otu oge.

** Maka usoro okike**

- Because every ZSA fee is denominated in ZEC, activity in any future asset issued on Zcash creates demand for ZEC itself.

---

## Ihe Ndị A Na-emekarịhie Emeghị

| Nkwenye a na-ekwenyekarị | Gịnị bụ eziokwu? |
| --- | --- |
| "A na-eme ZSAs na Zcash taa." | Ha abụghị. A na-ahazi ZSA ka ọ banye na Network Upgrade 7 (NU7) ma a ka na-enyocha ma na-anwale ya. |
| "ZSA na-eweta nkwekọrịta amamihe nye Zcash." | ZSA na-akọwapụta mwepụta, nnyefe na ọkụ nke ihe onwunwe. Ọ bụghị nkwekọrịta a na-eme atụmatụ maka ebumnuche izugbe. |
| "Ị nwere ike ịkwụ ụgwọ ZSA na akara ZSA n'onwe ya." | A na-akwụ ụgwọ na ZEC. |
| "Ọ bụrụ na e chebere ya, ọkọnọ ihe nrịbama ahụ aghaghị ịbụ ihe nzuzo." | ZIP 227 na-eme ka mwepụta ahụ doo anya n'ebumnobi, ya mere enwere ike ịchọpụta nnyefe nke ihe onwunwe ọ bụla n'ihu ọha. Nha na nnyefe na-anọgide na nzuzo; nnyefe ahụ anaghị adị. |
| "ZIP 230 bụ usoro azụmahịa nke ụdị 6 ugbu a." | A napụrụ ZIP 230. A na-akọwa ụdị nke 6 ugbu a site na ZIP 229. |

---

## Peeji ndị metụtara ya

- [Halo](/zcash-tech/halo)  usoro ihe omimi n'azụ Orchard, protocol ZSA na-agbatị
- [Zk-SNARKs](/zcash-tech/zk-snarks)  ihe akaebe nke enweghị ihe ọmụma na-ekwe ka a chọpụta nnyefe echekwara n'enweghị ekpughere ya.
- [Ọdọ Mmiri Ndị E Chebere Echiche Ha Na Ya](/using-zcash/shielded-pools)  ebe ZSA ga-ebi n'akụkụ ZEC.
- [Ihe ndị e mere eme](/using-zcash/transactions)  otu esi etinye azụmahịa Zcash ọnụ.
- [Zebra Full Node (Nọmba zuru ezu)](/zcash-tech/zebra-full-node)  mmejuputa iwu nke ejiri mee ihe na ZSA ngosi dị n'elu
