<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Network_Sustainability_Mechanism.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie ibe a"/>
</a>

# Usoro Ịkwado Ịga n’ihu nke Netwọk (NSM)

> NSM bụ akụkụ nke consensus Zcash kemgbe [NU7](./NU7.md) rụrụ ọrụ na Mainnet block 3,543,405 na Nọvemba 6, 2026. A na-ewepụta ugwo ugbu a; ịkwụghachi ha ndị na-egwụputa ga-amalite na block 8,939,664 (a na-atụ anya ya n’ihe dị ka Febụwarị 2031).

Ihe ị ga-amụta: ihe Usoro Ịkwado Ịga n’ihu nke Netwọk na-eme, ego ole n’ime ugwo block ọ bụla ọ na-ewepụ, ebe ZEC ahụ na-aga, mgbe na n’ogo ole ọ na-alọghachi dịka ụgwọ ọrụ block, na ihe mere oke 21 nde na usoro halving anaghị agbanwe.

Usoro Ịkwado Ịga n’ihu nke Netwọk (NSM) bụ usoro iwu consensus nke na-ewepụ ụfọdụ ZEC n’ime mgbasa ma kwụghachi ya ndị na-egwụputa ma emechaa, nwayọọ nwayọọ n’ime ọtụtụ afọ. NU7 tinyere akụkụ abụọ ya n’ọrụ: [ZIP 235](https://zips.z.cash/zip-0235), nke na-ewepụ 60% nke ugwo azụmahịa niile dị na block ọ bụla n’ime mgbasa, na [ZIP 237](https://zips.z.cash/zip-0237), nke na-akwụghachi ZEC e wepụrụ, n’elu nkwado block nkịtị, site n’usoro na-arị elu nwayọọ nwayọọ. [ZIP 259](https://zips.z.cash/zip-0259) mere ka ha abụọ malite ọrụ.

Ihe mere nke a ji dị mkpa. Zcash na-akwụ ụgwọ nchekwa ya site na ZEC ọhụrụ na block ọ bụla, nkwado ahụ na-adịkwa ọkara ihe dị ka kwa afọ anọ. Mgbe ọ dị ntakịrị, ndị na-egwụputa ga-adaberekarị n’ugwo. NSM bụ nzọụkwụ mbụ iji kwadebe maka ọdịnihu ahụ: ọ na-echekwa akụkụ nke ugwo taa ma kwụọ ha ndị na-egwụputa n’ọdịnihu, n’ebughị oke ọkọnọ elu ma ọ bụ gbanwee usoro halving ndị mmadụ dabere na ya.

## TL;DR

- **Iwepụ ([ZIP 235](https://zips.z.cash/zip-0235)):** na block ọ bụla, 60% nke ngụkọta ugwo azụmahịa (a na-agbada ọnụ ọgụgụ ma ọ bụrụ na e nwere ihe fọdụrụ, nke na-abara onye na-egwụputa uru) na-apụ n’ime mgbasa. Onye na-egwụputa na-edebe 40% fọdụrụ.
- **Ntụle Uru NSM:** ngụkọta ọha na-agbakọta ZEC e wepụrụ n’ime mgbasa ma a kwụghachibeghị. Ọ bụ ọnọdụ consensus, ọ bụghị pool onye ọ bụla nwere ike isi na ya mefuo ego.
- **Ego mmalite:** na NU7, ngụkọta ahụ malitere na **368.58445520 ZEC**, ụgwọ ọrụ block na ugwo ndị na-egwụputa mbụ hapụrụ n’enweghị nkwupụta tupu NU6.
- **Ịkwụghachi ([ZIP 237](https://zips.z.cash/zip-0237)):** site na block **8,939,664**, block ọ bụla na-agbakwunye akụkụ a kapịrị ọnụ (0.00001375%) nke ngụkọta ahụ na nkwado block. Nke a na-akwụghachi ihe dị ka ọkara nke ngụkọta ahụ n’oge halving nke afọ anọ ọ bụla.
- **Ihe ndị na-agbanweghi:** usoro halving, na oke ZEC nde 21 dị ka oke kachasị. Ọ bụrụ na ngụkọta ahụ ruru efu, mwepụta ego ga-agbaso kpọmkwem usoro ochie ahụ.

## Ntụnyere anya

Chee echiche banyere ite nchekwa ego dị n’akụkụ ebe a na-akwụ ụgwọ. Oge ọ bụla a gwụpụtara block, 60% nke ego e nyere dị ka ekele (ugwo) na-abanye n’ite ahụ kama ịbanye n’akpa onye na-egwụputa. Ọ dịghị onye nwere ike iji aka ya wepụta ego n’ite ahụ. Malite n’afọ 2031, a ga-agbakwunye obere akụkụ a kapịrị ọnụ nke ego dị n’ite ahụ na ụgwọ ọrụ block ọ bụla, ya mere ite ahụ ga-eji nwayọọ nwayọọ tọgbọ chakoo: ihe dị ka ọkara ya kwa afọ anọ, n’otu usoro ahụ dị ka halving.

## Otu iwepụ si arụ ọrụ (ZIP 235)

- Iwu a na-emetụta block ọ bụla, ọ bụghị azụmahịa ọ bụla. Maka block nwere ngụkọta ugwo `F` (na zatoshi), ego a na-ewepụ bụ `floor(6 × F / 10)`, onye na-egwụputa nwekwara ike ịnata `F` wepụ ego ahụ.
- A na-eme ka ọnụ ọgụgụ daba otu ugboro maka block ahụ dum, mgbe niilekwa n’ụzọ na-abara onye na-egwụputa uru. Ime ya n’otu azụmahịa n’otu azụmahịa ga-ewepụ ihe na-erughị 60% ma jikọta ha niile (ugwo zatoshi 1 abụọ ga-enye 0 nke ọ bụla).
- Ọmụmaatụ: block nke azụmahịa ya kwụrụ ugwo 50,000 zatoshi (0.0005 ZEC) ga-ewepụ 30,000 zatoshi ma kwụọ onye na-egwụputa 20,000. Block nwere ugwo 15 zatoshi ga-ewepụ 9 ma kwụọ onye na-egwụputa 6.
- Ọ dịghị mkpa itinye ubi pụrụ iche n’ime azụmahịa. Node ọ bụla na-agbakọ ego ahụ site n’ugwo ọ na-enyocha ugbua, [ZIP 236](https://zips.z.cash/zip-0236) na-emekwa ka azụmahịa coinbase kwuo kpọmkwem ego onye na-egwụputa kwesịrị ịnata, nke mere na onye na-egwụputa enweghị ike iwepụ ihe na-erughị nke a ma ọ bụ ịnata karịa ya.
- Ọnụọgụ: ZIP 235 mere atụmatụ, site na okporo ụzọ azụmahịa tupu NU7, na ihe dị ka 370 ZEC nke ugwo kwa afọ; ya mere a ga-ewepụ ihe dị ka 222 ZEC kwa afọ. Ugwo dị ntakịrị ma e jiri ya tụnyere nkwado block taa, nke mere ndị dere ya ji tụọ anya na mmetụta ọ ga-enwe n’ahụ ndị na-egwụputa ga-adị ntakịrị.

## Otu ịkwụghachi si arụ ọrụ (ZIP 237)

- **Ngụkọta ahụ.** `NSMValueBalance` na-amalite na 368.58445520 ZEC (36,858,445,520 zatoshi) mgbe NU7 malitere ọrụ. Block ọ bụla na-agbakwunye ihe ZIP 235 wepụrụ ma wepụ ihe a kwụghachiri. Block ga-eme ka ngụkọta ahụ dị n’okpuru efu bụ ihe na-adịghị arụ ọrụ.
- **Ebe ego mmalite si bịa.** Tupu NU6, azụmahịa coinbase nwere ike ịnata ihe na-erughị ụgwọ ọrụ block na ugwo ya niile. N’ime block 2,726,400 mbụ nke chain ahụ, ndị na-egwụputa hapụrụ 368.58445520 ZEC n’enweghị nkwupụta: nkwado e mere atụmatụ ruo n’ogo block ahụ bụ 15,750,000 ZEC, ebe ego e wepụtara bụ 15,749,631.41554480 ZEC. ZIP 237 na-etinye uru ahụ n’ime NSM ka a kwụọ ya kama ka ọ laa n’iyi.
- **Ọ dịghị ịkwụghachi ruo block 8,939,664.** N’agbata NU7 na ogo ahụ, ngụkọta ahụ na-abawanye naanị.
- **Usoro ngụkọta.** Site na block 8,939,664, a na-agbakwunye `ceiling(0.0000001375 × NSMValueBalance)` na nkwado block ọ bụla, a na-agbakọkwa ya site na ngụkọta ahụ mgbe block bu ya ụzọ gasịrị. Akụkụ ahụ bụ `floor(LN2_SCALED / HalvingInterval) / 10^10` = 1375 / 10,000,000,000, yana oge halving NU7 nke block 5,040,000.
- **Ihe mere e ji họrọ akụkụ ahụ.** `(1 − 0.0000001375)^5,040,000 ≈ 0.5`, ya mere, ọ bụrụ na e wepụghị ihe ọhụrụ, a ga-akwụghachi ihe dị ka ọkara nke ngụkọta ahụ n’oge halving ọ bụla. Ọ bụ mbelata na-abawanye n’usoro exponential, nke metụtara naanị ngụkọta NSM, tinyere usoro halving ndị na-agbanweghi.
- **Ọmụmaatụ zuru ezu.** Ọ bụrụ na ngụkọta ahụ ka bụ naanị ego mmalite 368.58 ZEC na block 8,939,664, block mbụ ga-akwụghachi 5,069 zatoshi (ihe dị ka 0.00005 ZEC), ya bụ ihe dị ka 0.175 ZEC kwa ụbọchị ma e nwee block 3,456 kwa ụbọchị. Ọnụọgụ n’ezie ga-adị elu karịa nke a site n’ugwo ọ bụla e wepụrụ ruo mgbe ahụ.
- **Ihe mere e ji họrọ block 8,939,664.** ZIP 237 na-ahọrọ ya site n’iwu a kapịrị ọnụ, nke na-adabereghị n’ego ole e wepụrụ n’ezie: ọ bụ block mbụ mgbe halving nke atọ gasịrị (block 6,132,390, a na-atụ anya ya n’ihe dị ka Nọvemba 2028) nke akụkụ NSM e tinyere n’ihe ZEC niile a na-emeghị atụmatụ iwepụta ga-akwụ ihe na-erughị nkwado block nkịtị (0.26041666 ZEC n’oge ahụ). Ntuli aka ndị NU7 maka ndị ji mkpụrụ ego na ndị obodo enweghị ike iru ọtụtụ ndị kwenyere n’otu oge ịmalite ịkwụghachi, ya mere ZIP 259 ji oge ngafe a.

## Ihe ndị na-agbanweghi

- **Usoro halving.** ZIP 237 na-edobe usoro halving nke afọ anọ. Nhọrọ a jụrụ, [ZIP 234](https://zips.z.cash/zip-0234), ga-eji usoro mwepụta ego na-adị larịị dochie ha; ntuli aka Ọgọst na Septemba 2026 NU7 jụrụ ma a ga-edobe halving ka ọ dị ma ọ bụ mee ka mwepụta ego dị larịị, NU7 wee wepụta atụmatụ na-echekwa usoro halving.
- **Oke ọkọnọ.** Ngụkọta Ego Ewepụtara tinyere Ntụle Uru NSM na-abawanye kpọmkwem site n’ego nkwado block e mere atụmatụ maka block ọ bụla, ya mere ego e wepụtara enweghị ike ịgafe oke ahụ. N’ezie, oke ahụ belatara ntakịrị: ime ka ọnụ ọgụgụ nkwado ZIP 218 dabaa mgbe NU7 gasịrị belatara ngụkọta ego a ga-ewepụta ihe dị ka 0.50 ZEC, NSM anaghị akwụghachikwa ụkọ ahụ.
- **Iwepụ n’afọ ofufo.** [ZIP 233](https://zips.z.cash/zip-0233), nke ga-eme ka onye ọ bụla nwee ike iziga ZEC n’ime NSM site n’ubi azụmahịa doro anya, etinyeghị n’ọrụ na NU7. Taa, ugwo bụ naanị ebe ego a na-ewepụ si abịa. ZIP 237 na-enye ohere ka ZIP ndị ga-abịa n’ọdịnihu tinye ebe ndị ọzọ.
- **Nzuzo.** A na-agbakọ ngụkọta ahụ na nkwado mgbakwunye site n’ụkpụrụ ndị ọha amaworị, ya mere NSM anaghị ekpughe ihe ọhụrụ gbasara azụmahịa.

## Mmejọ ndị a na-emekarị

- **“A na-akpọcha 60% nke ugwo.”** Ọ bụghị kpamkpam. N’adịghị ka ego a kpọchara ọkụ (a na-ejikarị EIP-1559 nke Ethereum atụnyere ya), a na-edekọ ZEC e wepụrụ ma kwụghachi ya ndị na-egwụputa n’ọdịnihu.
- **“NSM na-ebipụta ZEC ọzọ.”** Mba. Ọ na-akwụghachi naanị uru e wepụrụ ma ọ bụ nke a na-azọpụtaghị; ngụkọta ego e wepụtara na-anọ n’okpuru oke dị ugbu a.
- **“Ịkwụghachi amalitela.”** Ọ kabeghị. Ruo block 8,939,664, ngụkọta ahụ na-agbakọta naanị.
- **“NSM bụ ego mmadụ na-achịkwa.”** Mba. Ọ bụ ọnụọgụ dị n’ọnọdụ consensus, uru na-esikwa na ya pụta naanị site n’usoro nkwado block.
- **“E nwekwaghị halving.”** Mba. Nke ahụ bụ atụmatụ ZIP 234, nke NU7 etinyeghị n’ọrụ.

## Nkọwa okwu

| Okwu | Ihe ọ pụtara n’asụsụ dị mfe |
|---|---|
| Network Sustainability Mechanism (NSM) | Iwu consensus ndị na-ewepụ ZEC n’ime mgbasa ma kwụghachi ya ndị na-egwụputa ma emechaa |
| NSM Value Balance | Ngụkọta ọha na-agbakọta ZEC e wepụrụ n’ime mgbasa (ma ọ bụ nke a na-azọpụtaghị) ma a kwụghachibeghị |
| Removal from circulation | Iwepụta ZEC n’ime ego e wepụtara tinye ya na Ntụle Uru NSM; kemgbe NU7, nke a bụ 60% nke ugwo block ọ bụla |
| Reissuance | Ịkwụghachi ZEC site na Ntụle Uru NSM ka ọ pụta dị ka nkwado block mgbakwunye, malite na block 8,939,664 |
| Issued Supply | ZEC niile dị n’ime ọdọ mmiri uru nke chain; ọ naghị agụnye Ntụle Uru NSM |
| Block subsidy | ZEC ọhụrụ a na-emepụta na block ọ bụla, nke a na-ekesa n’etiti onye na-egwụputa na usoro ego mmepe |
| Halving interval | Ọnụ ọgụgụ block dị n’agbata halving: 5,040,000 kemgbe NU7 (ihe dị ka afọ anọ ma e nwee block kwa sekọnd 25) |

## Ajụjụ ndị a na-ajụkarị

**Ego ole dị na NSM ugbu a?** Ego mmalite 368.58445520 ZEC tinyere 60% nke ugwo block ọ bụla kemgbe block 3,543,405. Ọ bụ ọnọdụ consensus nke full node ọ bụla na-edekọ.

**Ònye na-enweta ZEC a kwụghachiri?** A na-agbakwunye ya na nkwado block, ya mere a na-ekesa ya otu ụzọ ahụ: usoro ego mmepe na-enweta pasentị a kapịrị ọnụ n’ime nkwado niile (nke e mere atụmatụ tinyere nke a kwụghachiri), onye na-egwụputa ewere nke fọdụrụ.

**Olee mgbe ịkwụghachi ga-amalite?** Na block 8,939,664 na Mainnet; a na-atụ anya ya n’ihe dị ka Febụwarị 2031 ma ọ bụrụ na nkezi oge block anọgide na sekọnd 25. Na Testnet, ogo ahụ na-agbaso otu iwu ahụ site n’ogo mmalite NU7 nke Testnet.

**Ugwo ọ ga-arị elu n’ihi NSM?** Mba. Ọ na-agbanwe ebe ugwo na-aga, ọ bụghị ego azụmahịa na-akwụ.

**A pụrụ ịgbanwe nkewa 60/40?** Naanị site na ZIP na network upgrade n’ọdịnihu. ZIP 235 kwuru na a pụrụ ileghachi nkewa ahụ anya ma ọ bụrụ na ugwo abawanye, dịka mgbe ugwo gafere nkwado block.

## Nwalee nghọta gị

1. Azụmahịa dị na block na-akwụ ugwo 100,000 zatoshi. Ego ole ka onye na-egwụputa na-edebe?
2. Ebee ka ego mmalite NSM si bịa?
3. Ihe dị ka akụkụ ole nke ngụkọta NSM ka a na-akwụghachi n’oge halving ọ bụla ma ọ bụrụ na e wepụghị ihe ọhụrụ?
4. Gịnị mere ịkwụghachi anaghị eme ka ngụkọta ego e wepụtara gafee ZEC nde 21?

Azịza: (1) 40,000 zatoshi; a na-ewepụ 60,000; (2) ụgwọ ọrụ block na ugwo azụmahịa coinbase hapụrụ n’enweghị nkwupụta tupu NU6, 368.58445520 ZEC; (3) ihe dị ka ọkara; (4) ịkwụghachi na-akwụ naanị uru e wepụrụ ma ọ bụ nke a na-azọpụtaghị, ya mere ego e wepụtara tinyere ngụkọta NSM na-abawanye kpọmkwem site na nkwado e mere atụmatụ maka block ọ bụla.

### Ihe ndị ọzọ

[ZIP 235: Wepụ 60% nke Ugwo Azụmahịa n’ime Mgbasa](https://zips.z.cash/zip-0235)

[ZIP 237: Usoro Ịkwado Ịga n’ihu nke Netwọk: Mwepụta Ego Na-echekwa Halving](https://zips.z.cash/zip-0237)

[ZIP 259: Ime ka NU7 Network Upgrade Malite Ọrụ](https://zips.z.cash/zip-0259)

[ZIP 234: Usoro Ịkwado Ịga n’ihu nke Netwọk: Ime ka Mwepụta Ego Dị Larịị (etinyeghị n’ọrụ)](https://zips.z.cash/zip-0234)

[ZIP 233: Usoro Ịkwado Ịga n’ihu nke Netwọk: Iwepụ Ego n’ime Mgbasa (etinyeghị n’ọrụ)](https://zips.z.cash/zip-0233)

[ZIP 236: Block kwesịrị ịha nhata kpọmkwem](https://zips.z.cash/zip-0236)

## Ibe ndị metụtara ya

| Ibe | Ihe mere o ji metụta ya |
|---|---|
| [NU7](./NU7.md) | network upgrade mere ka NSM malite ọrụ |
| [Zcash Iwu Ego](../start-here/zcash-monetary-policy) | usoro halving na oke ọkọnọ NSM na-echekwa |
| [Ihe Block nke Sekọnd 25 Na-agbanwe N’ezie](../research/what-25-second-blocks-actually-change) | ihe mere nkwado na oge halving ji gbanwee na NU7 |
| [Ego Mmepe](../start-here/development-fund) | otú e si ekesa nkwado block |
| [Azụmahịa](../using-zcash/transactions) | otu esi ahazi ugwo azụmahịa |

---
