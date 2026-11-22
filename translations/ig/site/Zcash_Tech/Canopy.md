<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopy malitere ịrụ ọrụ na Zcash mainnet na block 1,046,400 (November 18, 2020 UTC).

Ihe ị ga-amụta: otu Zcash siri gaa n'ihu na-akwado mmepe nke ya mgbe ụgwọ ndị malitere ya kwụsịrị, na otu Canopy siri guzobe nkewa ego nke network upgrade ndị sochirinụ ka na-ewukwasị n'elu ya.

Canopy bụ network upgrade nke ise nke Zcash, a na-akpọkwa ya Network Upgrade 4 (NU4). E tinyere ya n'ọrụ site na [ZIP 251](https://zips.z.cash/zip-0251), ọ malitekwara ịrụ ọrụ na mainnet block 1,046,400 na November 18, 2020 (UTC), n'otu oge ahụ na halving mbụ nke ụgwọ block nke Zcash. Canopy bụkarị network upgrade gbasara Gọọmentị [governance] na ego. Ọ kwụsịrị ụgwọ mbụ nke ndị malitere ọrụ ahụ ma malite Development Fund [Development Fund] ọhụrụ nke Zcash, nke na-akwụ Electric Coin Company, Zcash Foundation, na ndị natara ikike [grant] nọọrọ onwe ha. Atụmatụ dị n'azụ ego ahụ sitere n'usoro Gọọmentị obodo gbatịrị agbatị na 2019.

Ihe kpatara nke a ji dị mkpa. Zcash na-akwado mmepe nke ya site n'ụgwọ block, n'ihi na o nweghị ụlọ ọrụ n'azụ ya. E debere ụgwọ ndị malitere ọrụ ahụ, nke kwụrụ ụgwọ maka afọ mbụ ya, ka ọ kwụsị na halving mbụ. Canopy bụ ihe nọchiri ya: ọ duziri akụkụ e debere nke ụgwọ block ọ bụla n'ime Development Fund ma kpebie ndị ga-anata ya. Network upgrade ndị sochirinụ mezigharịrị usoro ahụ, ruo [NU6.1](../zcash-tech/nu6-1).

![Before Canopy the founders reward funded development and was set to end at the first halving. After Canopy the Development Fund takes 20 percent of each block reward and runs to the second halving in 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## Ego mmepe

Canopy kwụsịrị ụgwọ mbụ nke ndị malitere ọrụ ahụ ma jiri Development Fund nke Zcash dochie ya. Mgbanwe ahụ mere n'otu block ahụ na halving mbụ nke Zcash, mgbe ụgwọ block dara site na 6.25 ZEC ruo 3.125 ZEC. Ya mere, ndị na-egwụputa [miners] hụrụ ka e belatara ụgwọ ha ọkara n'otu ụbọchị ahụ akụkụ ọhụrụ nke obere ụgwọ ahụ malitere ịga n'ime mmepe.

E debere ego ahụ ka ọ rụọ ọrụ afọ anọ, site na halving mbụ a na November 2020 ruo halving nke abụọ na 2024. Edepụtara amụma ekwenyere na ya dịka [ZIP 1014](https://zips.z.cash/zip-1014). Usoro consensus [consensus] nke na-ebugharị ego ahụ n'ezie bụ usoro funding stream: [ZIP 207](https://zips.z.cash/zip-0207) webatara ụzọ zuru oke iji duzie akụkụ nke subsidy block gaa n'aka ndị natara akọwapụtara, ebe [ZIP 214](https://zips.z.cash/zip-0214) debere iwu kpọmkwem na Adreesị akpa ego ndị nnata maka Development Fund.

## Otu e si ekewa ego ahụ

Development Fund na-ewere pasent 20 nke ụgwọ block ọ bụla. Ndị na-egwụputa na-edobe pasent 80 fọdụrụ. A na-ekewa pasent 20 ahụ ụzọ atọ, dịka ZIP 1014 siri dị.

1. Pasent 35 gaa na Project Bootstrap, nzukọ nne nke Electric Coin Company.
2. Pasent 25 gaa na Zcash Foundation.
3. Pasent 40 gaa na Major Grants, nke na-akwado ọrụ nọọrọ onwe ya ma Zcash Foundation na-elekọta ya. Major Grants mechara ghọọ Zcash Community Grants (ZCG).

Mgbe e jiri ụgwọ block niile tụọ ya kama naanị ego ahụ, oke ndị a ghọrọ pasent 7 maka Electric Coin Company, pasent 5 maka Zcash Foundation, na pasent 8 maka Major Grants. Ụzọ abụọ a e si akọwa ya na-enye otu ọnụọgụ ahụ.

![The Development Fund is 20 percent of each block reward, split 35 percent to Bootstrap and the Electric Coin Company, 25 percent to the Zcash Foundation, and 40 percent to Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Mgbanwe pool nke Sprout

Canopy malitekwara ịkwụsị pool nke e chebere echebe [shielded] kacha ochie. Sprout bụ pool nke e chebere echebe mbụ nke Zcash, ma Canopy malitere ibelata ya site na [ZIP 211](https://zips.z.cash/zip-0211).

Site n'oge Canopy malitere ịrụ ọrụ, enweghị ike itinye uru ọhụrụ n'ime pool Sprout. N'asụsụ teknụzụ, ubi vpub_old nke JoinSplit ọ bụla ga-abụrịrị efu. A ka nwere ike iwepụ ego dịlarị na Sprout, yabụ enweghị onye a na-egbochi, mana pool ahụ nwere ike ịdalata naanị site ugbu a gawa. Nke a bụ nzọụkwụ mbụ iji mesịa kwụsị pool Sprout ochie ma họrọ pool ndị ọhụrụ nke e chebere echebe.

![Before Canopy, value could both enter and leave the Sprout pool. After Canopy, no new value can enter but withdrawals are still allowed](/content-images/canopy-sprout-pool-f5166aa049.webp)

## Ihe mgbakwunye teknụzụ

N'akụkụ mgbanwe ego, Canopy bu ZIP teknụzụ abụọ pere mpe. [ZIP 212](https://zips.z.cash/zip-0212) gbanwere otú onye nnata si amepụta ihe nzuzo ephemeral nke Sapling, site n'ịmepụta ya n'okwu nkịtị note [note]. [ZIP 215](https://zips.z.cash/zip-0215) depụtara iwu doro anya maka ịkwado signatures [signatures] Ed25519, ka node ọ bụla kwekọrịta kpọmkwem signatures ndị a na-ewere dị ka ndị ziri ezi.

## Nchịkọta dị mkpirikpi (TL;DR)

- Canopy (NU4) malitere ọrụ na block 1,046,400 nke mainnet (November 18, 2020 UTC). Ọ bụ otu block ahụ ka halving mbụ nke Zcash mere, nke belatara ụgwọ block site na 6.25 ruo 3.125 ZEC.
- Ọ kwụsịrị founders reward ma guzobe Zcash Development Fund: 20% nke ụgwọ block ọ bụla ruo afọ 4, ruo halving nke abụọ na 2024 (iwu ZIP 1014; usoro ZIP 207/214).
- E kewara 20% nke ego ahụ otu a: 35% gaara Bootstrap (Electric Coin Company), 25% gaara Zcash Foundation, na 40% gaara Major Grants, nke e mesịrị mara dị ka Zcash Community Grants.
- Ọ mechiri pool Sprout ka ọ ghara ịnabata uru ọhụrụ (ZIP 211). Ego ọhụrụ enweghị ike ịbanye n'ime ya, mana a ka nwere ike iwepụ ego n'ime ya.
- ZIP 2 nke metụtara teknụzụ sokwa ya: ZIP 212 (ihe nzuzo nwa oge [ephemeral secret] nke Sapling e nwetara site na ederede doro anya nke note ahụ) na ZIP 215 (iwu doro anya maka nkwado Ed25519).

## Nkọwa Isi

Zcash na-akwado mmepe nke ya site n'ụgwọ ọrụ block [block rewards] n'ihi na ọ dịghị ụlọ ọrụ kwụ n'azụ ya. Ụgwọ ọrụ ndị guzobere ya [founders reward] kwụrụ ụgwọ afọ ndị mbụ ma e mere atụmatụ ka ọ kwụsị na halving mbụ, ya mere ihe ga-anọchi ya ga-adịrịrị tupu oge ahụ eruo. Canopy bụ ihe ahụ nọchiri ya: ZIP 207 webatara usoro izugbe nke iyi ego [funding stream] nke na-eduga otu akụkụ nke enyemaka block [block subsidy] gaa n'Adreesị akpa ego [address] ndị nnata a kapịrị ọnụ, ma ZIP 214 debere iwu na Adreesị akpa ego ndị a kapịrị ọnụ maka Ego Mmepe [Development Fund]. Mgbe a tụnyere ha na ụgwọ ọrụ niile kama naanị ego ahụ, òkè ndị ahụ bụ 7% ECC, 5% Zcash Foundation, na 8% Major Grants — otu ọnụọgụ ndị ahụ a kọwara n'ụzọ abụọ.

Canopy malitekwara ịla ezumike nká Sprout, pool nke e chebere echebe (shielded) kacha ochie nke Zcash: site n'oge ọ malitere ịrụ ọrụ, ubi vpub_old nke JoinSplit ọ bụla ga-abụrịrị efu, ya mere uru nwere ike isi na Sprout pụọ ma ọ gaghị alaghachi ya ọzọ.

## Ihe atụ a na-ahụ anya

Canopy bụ oge mgbe usoro ụgwọ ọnwa ndị guzobere ụlọ ọrụ ọhụrụ (startup) kwụsịrị, ma iwu ntọala (constitution) welie ọchịchị: site na block ahụ gaa n'ihu, a na-edebe cent 20 n'ime dollar ọ bụla netwọk ahụ na-emepụta maka nlekọta, a na-ekekọrịta ya 35/25/40 n'etiti ngalaba atọ. N'otu oge ahụ, a na-emechi ụlọ nkwakọba ihe ochie (Sprout) ka ọ ghara ịnabata ihe ọhụrụ: onye ọ bụla ka nwere ike iwepụta ngwongwo ya, mana ọ dịghị ihe ọhụrụ a ga-etinye n'ime ya.

## Nleba Anya Miri Emi

Funding stream a bụ consensus na-eme ka a na-agbaso ya, ọ bụghị ntụkwasị obi: node na-ajụ block ọ bụla nke coinbase ya na-adịghị akwụ ndị nnata akọwapụtara òkè ha akọwapụtara. E ji ebumnuche mee ka Canopy daa na block nke halving, nke mere na ndị na-egwụputa hụrụ ka ụgwọ ọrụ ha belatara ọkara n'otu oge ahụ òkè ọhụrụ nke ụgwọ ọrụ ahụ belatara malitere ịga n'ọrụ mmepe. ZIP 212 gbanwere otú e si enweta ihe nzuzo nwa oge (ephemeral secret) nke Sapling (site na plaintext nke note), ZIP 215 dekwara iwu nnabata Ed25519 doro anya ka node ọ bụla nwee ike ịnwapụta signature n'otu ụzọ ahụ. Mgbanwe ndị a dị ntakịrị, mana ha wepụrụ ụdị ihe niile na-eme ka consensus ghara idoụ anya.

## Mmejọ ndị a na-emekarị

- **Iche na Canopy bụ halving n'onwe ya.** Ha kerịtara otu block mmalite, mana ha bụ mgbanwe dị iche iche: ZIP 251 (Canopy) na usoro mwepụta ego (issuance schedule).
- **Ịgụ 20% ahụ dị ka ihe e wepụrụ n'òkè ọhụrụ nke ndị na-egwụputa.** Ndị na-egwụputa (miners) jigidere 80%; ego ahụ (fund) na-ewere 20% nke ụgwọ ọrụ block (block reward).
- **Iche na e kpochiri ma ọ bụ bibie ego Sprout.** Ọ ka ga-ekwe omume ịwepụ ego. Naanị itinye ego ọhụrụ kwụsịrị.
- **Iwere "35/25/40 nke ego ahụ" na "7/5/8 nke ụgwọ ọrụ ahụ" dị ka nkewa dị iche iche.** Ha bụ otu ọnụọgụ ahụ, mana a tụrụ ha n'ihe ndabere dị iche iche.
- **Ịkpọ Canopy nkwalite cryptography.** Ọ bụ isi ihe gbasara Gọọmentị (governance) na iwu ego (monetary policy). ZIP ndị ọrụ nka bụ naanị obere mgbanwe.

## Nkọwa okwu

| Okwu | Ihe ọ pụtara n'asụsụ dị mfe |
|---|---|
| Founders reward | Usoro ego mbụ nke kwụrụ maka mmepe mbụ nke Zcash, nke e mere atụmatụ ka ọ kwụsị na halving mbụ |
| Development Fund | Oke pasent 20 nke ụgwọ block ọ bụla nke Canopy duziri gaa na mmepe, nke ga-adị ruo halving nke abụọ |
| Block reward (subsidy) | ZEC ọhụrụ a na-emepụta ma na-akwụ mgbe a na-egwụputa block ọ bụla |
| Halving | Ihe omume e mere atụmatụ ya nke a na-ebipụ ụgwọ block ọkara |
| Funding stream | Usoro consensus (ZIP 207) nke na-eduga akụkụ nke subsidy block gaa na Adreesị akpa ego ndị nnata akọwapụtara |
| Sprout pool | Pool mbụ nke e chebere echebe nke Zcash, nke Canopy kwụsịrị ịnabata uru ọhụrụ n'ime ya |

## Ajụjụ a na-ajụkarị

Canopy ọ na-agbanwe ZEC m ma ọ bụ Nzuzo [privacy] m? Ee e. Canopy gbasara otu e si akwado mmepe ego, tinyere iwu teknụzụ ole na ole. Ego gị na Azụmahia [transaction] gị ndị e chebere echebe anaghị emetụta.

Canopy ọ belatara ụgwọ block? Canopy malitere ịrụ ọrụ n'otu block ahụ na halving mbụ nke Zcash, nke belatara ụgwọ ahụ site na 6.25 ZEC ruo 3.125 ZEC. Halving bụ akụkụ nke amụma ego nke Zcash. Ọrụ Canopy bụ ikpebi otú e si eji akụkụ nke obere ụgwọ ahụ.

Gịnị ka Development Fund bụ maka ya? Ọ na-akwado ndị na-ewu Zcash. Ego ahụ na-aga na Electric Coin Company (site na Project Bootstrap), Zcash Foundation, na Major Grants, nke na-akwado ọrụ nọọrọ onwe ya.

Enwere m ike ka na-eji ego dị na pool Sprout? Ee. Ị ka nwere ike iwepụ ego dịlarị na Sprout. Naanị na ị gaghị enwe ike itinye uru ọhụrụ n'ime ya mgbe Canopy gasịrị.

Development Fund ọ ga-adịgide adịgide? Ee e. E debere ya ka ọ rụọ ọrụ afọ anọ, site na halving mbụ na November 2020 ruo halving nke abụọ na 2024, iji nye obodo oge ịhụ ka ọ si arụ ọrụ tupu ha atụleghachi ya.

Kedu ka Canopy si metụta NU6 na NU6.1? Canopy guzobere nkewa ego ụzọ atọ na usoro funding stream. Network upgrade ndị sochirinụ, gụnyere NU6 na NU6.1, tụleghachiri ma gbanwee Development Fund e wuru n'elu ntọala ahụ.

## Nwale nghọta gị

Canopy malitere ịrụ ọrụ kpọmkwem n'otu block ahụ na halving mbụ nke Zcash. Gịnị mere e ji họrọ oge ahụ, gịnịkwa gaara eme ego mmepe ma ọ bụrụ na Canopy anọghị?

<details>
<summary>Azịza</summary>

E mere atụmatụ ka ụgwọ mbụ nke ndị malitere ọrụ ahụ kwụsị na halving mbụ. Enweghị Canopy, ụgwọ block niile pere mpe mgbe halving gaara agakwuru ndị na-egwụputa, na-ahapụ enweghị ego n'ogo protocol maka mmepe. Canopy jiri Development Fund dochie ụgwọ ndị malitere ọrụ ahụ kpọmkwem na block ahụ, ya mere ego gara n'ihu n'enweghị oghere.
</details>

### Akụrụngwa

[ZIP 251: Ntinye n'ọrụ network upgrade nke Canopy](https://zips.z.cash/zip-0251)

[ZIP 1014: Ihiwe Dev Fund maka ECC, ZF, na Major Grants](https://zips.z.cash/zip-1014)

[ZIP 207: Funding Streams](https://zips.z.cash/zip-0207)

[ZIP 214: Iwu consensus maka Development Fund nke Zcash](https://zips.z.cash/zip-0214)

[ZIP 211: Ịkwụsị itinye uru ọhụrụ na Chain Value Pool nke Sprout](https://zips.z.cash/zip-0211)

[Canopy Network Upgrade](https://z.cash/upgrade/canopy/)

### Hụkwa

[Zcash Network Upgrades](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Zcash Amụma ego](../start-here/zcash-monetary-policy)

[Pool ndị e chebere echebe](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash Gọọmentị](../zcash-community/zcash-governance)

---

## Peeji Ndị Metụtara Ya

- [Sprout](./Sprout.md) — pool Canopy mechiri ka ọ ghara ịnabata ego ọhụrụ e tinyere n'ime ya
- [Heartwood](./Heartwood.md) — upgrade gara aga n'usoro a
- [NU5](./NU5.md) — upgrade na-esote, nke malitere Orchard
- [NU6.1](./NU6_1.md) — nkwalite kacha ọhụrụ e mere n'ụzọ e si akwado mmepe ego

Usoro: [Ndepụta Network Upgrades](../start-here/network-upgrades) · Nke gara aga: [Heartwood](../zcash-tech/heartwood) · Nke na-abịa: [NU5](../zcash-tech/nu5)
