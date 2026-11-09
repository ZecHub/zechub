<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Proof nke e chebere echebe [shielded] nke Kwụọ ụhwọ [payment] na mkpughe Kwụọ ụgwọ

## Nchịkọta

- ID Azụmahia [transaction] na-achọpụta Azụmahia, mana ọ naghị ekpughe onye nnata nke e chebere echebe, ego, ma ọ bụ memo.
- E mere mkpughe Kwụọ ụgwọ iji mee ka onye zitere ya gosi nkọwa ahọpụtara nke otu Kwụọ ụgwọ na-ekpugheghị akụkọ e-akpa ego [wallet] ya ndị ọzọ.
- Viewing key [viewing key] na-enye ohere ịgụ na-adịgide adịgide maka Adreesị akpa ego [address] ma ọ bụ akaụntụ. Jiri ya maka nyocha na-aga n'ihu, ọ bụghị maka esemokwu nke otu Kwụọ ụgwọ.
- Mkpughe Kwụọ ụgwọ enweghị ike igosi na enyere ngwongwo, mata mmadụ n'onwe ya, weghachite Kwụọ ụgwọ, ma ọ bụ dochie nyocha nkwenye.
- [ZIP 311](https://zips.z.cash/zip-0311) ka bụ **Draft**. Ederede ya ugbu a ahapụghị nkwado Orchard, nkwado ntinye Oha [transparent], nzobe ederede [encryption], ịnye ụdị, na iwu nhụta onye ọrụ ka e mechaa.

## Ihe kpatara ID Azụmahia anaghị ezuru

Onye ọ bụla nwere ike inyocha nkọwa ọha nke Kwụọ ụgwọ Zcash Oha. Ihe nchọgharị block [block] nwere ike igosi Adreesị akpa ego ya, ego ya, na ọnọdụ nkwenye ya.

Kwụọ ụgwọ nke e chebere echebe na-arụ ọrụ n'ụzọ dị iche. Chain [chain] na-egosi na Azụmahia soro iwu Zcash, mana ọ naghị ebipụta onye zitere nke e chebere echebe, onye nnata, ego, ma ọ bụ memo. Ikekọrịta ID Azụmahia nwere ike igosi na a gwupụtara Azụmahia, mana ọ nweghị ike igosi onye ahịa ma ọ bụ onye nke atọ Kwụọ ụgwọ nzuzo dị n'ime ya.

Nke a na-ebute nsogbu bara uru. Onye ahịa nwere ike ịdị mkpa idozi esemokwu ya na onye na-ere ahịa, exchange [exchange] nwere ike ịdị mkpa igosi na ọ haziri mwepụ ego, ma ọ bụ onye nyere onyinye nwere ike ịchọ igosi otu onyinye. Ikekọrịta viewing key zuru ezu ga-ekpughe karịa ihe nke ọ bụla n'ime ọnọdụ ndị a chọrọ.

[ZIP 311: Zcash Mkpughe Kwụọ ụgwọ](https://zips.z.cash/zip-0311) na-atụ aro azịza dị warara karị: kpughee ma kwadoo ozi ahọpụtara sitere n'otu Azụmahia.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](/content-images/payment-disclosure-proof-flow-208c033e06.webp)

## Otu mkpughe Kwụọ ụgwọ si arụ ọrụ

Usoro bụ isi bụ:

1. Onye nkwenye na-enye onye zitere ya ihe ịma aka pụrụ iche ma ọ bụ ntụaka, mgbe proof [proof] mmekọrịta dabara adaba.
2. Onye zitere ya na-ahọrọ Azụmahia na mpụta nke e chebere echebe ma ọ bụ mpụta ndị a ga-ekpughe.
3. Ngwanrọ e-akpa ego kwekọrọ na-emepụta mkpughe Kwụọ ụgwọ jikọtara na Azụmahia ahụ na, dịka nhọrọ, ihe ịma aka ahụ.
4. Onye zitere ya na-enye onye nkwenye mkpughe ahụ.
5. Onye nkwenye na-enweta ezigbo Azụmahia ahụ n'aka node [node] ntụkwasị obi Zcash, na-enyocha na a gwupụtara ya, ma na-akwado mkpughe ahụ megide ya.
6. Nsonaazụ ziri ezi na-akwado naanị nkwupụta dị na mkpughe ahụ.

Nhazi ZIP nke Sapling na-eji igodo cipher na-apụ apụ weghachite mpụta ọ bụla ahọpụtara. Nke a nwere ike ikpughe onye nnata mpụta ahụ, ego, na memo. Ọ chọkwara proof ikike imefu maka opekata mpe otu ntinye Azụmahia, ya mere onye hụrụ Azụmahia ahụ naanị enweghị ike ịmepụta mkpughe ziri ezi dịka a ga-asị na ọ zitere ya.

Mkpughe Kwụọ ụgwọ Sapling agaghị ekpughe Adreesị akpa ego onye zitere ya. Ikike imefu nwere ike ịchịkwa ọtụtụ Adreesị dị iche iche, yabụ igosi njikwa nke mmefu anaghị amata otu Adreesị na-akpaghị aka. ZIP 311 gụnyere proof Adreesị nhọrọ maka ọnọdụ ebe ijikọta proof na Adreesị onye zitere amaara dị mkpa.

## Mkpughe Kwụọ ụgwọ ka ọ bụ viewing key?

| Usoro | Ojiji [use case] kacha mma | Ihe ọ na-ekpughe | Ohere na-adịgide adịgide? | E jikọtara ya na Kwụọ ụgwọ n'ụzọ cryptographic? |
| --- | --- | --- | --- | --- |
| Transaction ID | Ịlele na a gwupụtara Azụmahia | Data Azụmahia ọha na nkwenye | Mba | Ee, mana nkọwa Kwụọ ụgwọ nke e chebere echebe na-anọgide zoro ezo |
| Screenshot or receipt | Idebe ndekọ na-enweghị usoro | Ihe ọ bụla onye zitere ya họọrọ igosi | Mba | Mba; enwere ike dezie onyonyo ahụ |
| Payment disclosure | Igosi nkọwa ahọpụtara nke otu Kwụọ ụgwọ | Mpụta Azụmahia ahọpụtara na proof onye zitere ma ọ bụ ihe ịma aka ọ bụla etinyere | Mba, mana enwere ike idetuo proof e kesara | Ee |
| Incoming Viewing Key | Ileba anya na Kwụọ ụgwọ akaụntụ natara | Ọrụ mbata igodo ahụ kpuchiri | Ee | Ọ na-emepe Kwụọ ụgwọ mbata kwekọrọ |
| Full Viewing Key | Ịza ajụjụ ego ma ọ bụ inyocha akaụntụ | Ọrụ mbata na mpụta, ego, memo, na nguzozi igodo ahụ kpuchiri | Ee | Ọ na-emepe ọrụ akaụntụ kwekọrọ |

Jiri mkpughe kacha nta na-aza ajụjụ ahụ. Esemokwu onye na-ere ahịa gbasara otu Kwụọ ụgwọ anaghị akwadokarị ohere maka Kwụọ ụgwọ niile dị n'akaụntụ. Onye na-ahụ maka ndekọ ego ga-enyocha oge mkpesa zuru ezu nwere ike ịchọ viewing key kama.

Ọ dịghị nke ọ bụla n'ime usoro ndị a na-enye ikike imefu ego. Ekekọrịtala Mkpuru mgbake [seed phrase], Igodo ego [spending key], igodo nzuzo, ma ọ bụ ndabere e-akpa ego dịka proof Kwụọ ụgwọ.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](/content-images/payment-disclosure-scope-0585cdc075.webp)

## Kedu ihe m nwere ike iji taa?

Ọ dịghị e-akpa ego ugbu a a kọwara ebe a dịka nke na-emejuputa mmepụta ma ọ bụ nkwenye mkpughe Kwụọ ụgwọ ZIP 311. ZIP ka bụ draft ma depụta mmejuputa ntụaka ya dịka "TBD." Ngwá ọrụ [tools] ndị a a na-elekọta ka nwere ike inyere onye zitere, onye nnata, ma ọ bụ onye nyocha enyere ikike inyocha ndekọ dị taa:

| Ngwa | Ihe bara uru taa maka | Oke dị mkpa |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Ịlele metadata Azụmahia zuru ezu, ego, ntinye na mpụta pool [pool], na memo; ibubata Unified ma ọ bụ Sapling viewing key n'ime akaụntụ naanị-nlele | Ọ naghị akpọsa mmepụta ma ọ bụ nkwenye mkpughe ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Ịtụle akụkọ Azụmahia nke e chebere echebe na memo; ibubata Unified Full Viewing Key n'ọnọdụ naanị-agụ | Ndekọ e-akpa ego ma ọ bụ akaụntụ naanị-agụ abụghị mkpughe Kwụọ ụgwọ nwere oke ahọpụtara |
| [Zallet](https://zcash.github.io/zallet/) | Usoro ọrụ onye na-arụ ọrụ jiri `z_viewtransaction`, `z_exportviewingkey`, na `z_importviewingkey` | Ngwanrọ Beta; RPC viewing-key na Azụmahia ya bụ ndekọ sara mbara ma ọ bụ nke mpaghara, ọ bụghị proof ZIP 311 |

Jiri e-akpa ego zitere ma ọ bụ natara Kwụọ ụgwọ ahụ mbụ. Lelee nkọwa Azụmahia ya, memo, ID Azụmahia, na nkwenye, mesịa gwa akụkụ nke ọzọ ka ọ tụnyere nkọwa ndị ahụ na ndekọ nke ya. Etinyela e-akpa ego ọhụrụ ma tinye Mkpuru mgbake naanị iji mepụta ihe akaebe. Ọ bụrụ na onye nyocha chọrọ ọhụhụ na-adịgide adịgide, tụlee akaụntụ naanị-nlele kwekọrọ ma ghọta oke viewing key tupu ịkekọrịta ya.

Ngwa ndị a bụ ụzọ ọzọ bara uru maka ịlele ndekọ, ọ bụghị proof na mkpughe Kwụọ ụgwọ ọkọlọtọ dị. Nseta ihuenyo nwere ike inyere ndị mmadụ tụnyere ndekọ, mana a na-edezi ya ma ọ bụghị proof cryptographic.

## Ebe mkpughe Kwụọ ụgwọ na-arụ ọrụ

### Esemokwu onye na-ere ahịa

Onye ahịa nwere ike igosi na e zigara ego kpọmkwem na Adreesị akpa ego nke e chebere echebe nke onye na-ere ahịa. Proof ahụ anaghị egosi na enyere ngwongwo, na a ji ụgwọ nkwụghachi, ma ọ bụ na onye na-egosi ya nwere njirimara iwu kpọmkwem. Ajụjụ ndị ahụ ka dabere na ndekọ ịtụ na nkwekọrịta akụkụ ndị ahụ.

### Mwepụ ego nke e chebere echebe

ZIP 311 depụtara mwepụ ego nke e chebere echebe dịka Ojiji e lekwasịrị anya: exchange ga-egosi onye nnata na ego na-ebipụtaghị nkọwa ndị ahụ on-chain [on-chain]. Proof ntinye Oha ya ka emechabeghị, yabụ nke a abụghị usoro ọrụ ọkọlọtọ zuru ezu ugbu a. Onye ahịa ga-enyochakwa ọnọdụ nkwenye Azụmahia n'onwe ya.

### Onyinye

Onye nyere onyinye ma ọ bụ mkpọsa nwere ike igosi otu onyinye kpọmkwem ebe Kwụọ ụgwọ ndị na-enweghị njikọ na-anọgide nzuzo. Ibipụta mkpughe ahụ na-eme ka nkọwa ahọpụtara ya bụrụ ọha nye onye ọ bụla natara otu, yabụ ọwa nkwenye nzuzo dị nchebe karịa mgbe proof ọha adịghị mkpa.

### Ịza ajụjụ ego

Jiri mkpughe Kwụọ ụgwọ mgbe onye na-ahụ maka ndekọ ego chọrọ ihe akaebe maka otu Azụmahia. Jiri viewing key kacha warara dabara mgbe onye na-ahụ maka ndekọ ego chọrọ ohere na-adịgide adịgide maka ọtụtụ Azụmahia ma ọ bụ oge mkpesa zuru ezu.

## Usoro ọrụ na-echekwa Nzuzo [privacy]

ZIP 311 abụghị ọkọlọtọ e-akpa ego emechara nke a pụrụ ibuga n'ebe nile. Mgbe ngwá ọrụ onye zitere na onye nkwenye kwekọrọ dị, jiri ndepụta nlele a:

1. **Kwado ndakọrịta mbụ.** Ngwá ọrụ abụọ ahụ ga-akwado otu usoro mkpughe na pool nke e chebere echebe Kwụọ ụgwọ ji.
2. **Dozie nsogbu nkịtị mbụ.** Lelee mmekọrịta e-akpa ego, ID Azụmahia, ọnụ ọgụgụ nkwenye, ọnọdụ njedebe oge, na ndekọ onye nnata tupu ikpughe nkọwa nzuzo.
3. **Rịọ ihe ịma aka.** Maka esemokwu, onye nkwenye kwesịrị inye nọmba ịtụ ọhụrụ ma ọ bụ ihe ịma aka enweghị usoro ka mkpughe ahụ jikọọ na arịrịọ ahụ.
4. **Họrọ naanị mpụta dị mkpa.** Etinyela mpụta ndị na-enweghị njikọ sitere n'otu Azụmahia.
5. **Lelee ubi ọ bụla a ga-ekpughe.** Lelee onye nnata, ego, memo, proof Adreesị onye zitere, na ihe ịma aka tupu mbupụ.
6. **Kekọrịta site n'ọwa nzuzo.** Mkpughe abụghị Igodo ego nzuzo, mana onye ọ bụla natara ya nwere ike idowe ma ọ bụ kesaa ozi ọ na-ekpughe.
7. **Kwenye megide chain.** Onye nkwenye ga-ebudata Azụmahia ahụ kpọmkwem site na node ntụkwasị obi, kwado na ọ dị na netwọk na block e bu n'obi, mesịa kwado mkpughe ahụ.
8. **Dekọọ nsonaazụ, ọ bụghị nzuzo ndị ọzọ.** Debe naanị ihe usoro esemokwu, mwepụ ego, onyinye, ma ọ bụ ịza ajụjụ ego chọrọ.

Ọ bụrụ na e-akpa ego enweghị ike ịmepụta mkpughe, ejikwala viewing key zuru ezu dochie ya n'agụghị oke ya sara mbara na nke na-adịgide adịgide. Jụọ ma onye nnata nwere ike ikwenye Kwụọ ụgwọ sitere na ndekọ e-akpa ego nke ya ma ọ bụ nabata ndekọ na-adịghị akpata nnukwu ihe ize ndụ kama.

## Ihe mkpughe ziri ezi anaghị egosi

Nkwenye gara nke ọma anaghị egosi:

- Na Azụmahia nwere nkwenye zuru ezu maka iwu ihe ize ndụ nke onye nkwenye
- Na nhazigharị chain enweghị ike iwepụ Azụmahia nso nso a
- Na enyere ngwongwo ma ọ bụ ọrụ
- Na achọrọ nkwụghachi ma ọ bụ nkwụghachi ụgwọ
- Na onye zitere ya na-achịkwa Adreesị akpa ego kpọmkwem, ma e wezụga ma ọ bụrụ na etinyere proof Adreesị dabara adaba
- Na onye na-egosi mkpughe ahụ nwere njirimara e kwuru n'ụwa n'ezie
- Na mpụta ekpugheghị, Azụmahia ndị ọzọ, ma ọ bụ nguzozi e-akpa ego nwere uru pụrụ iche
- Na mkpughe ahụ na-anọgide nzuzo mgbe ekesara ya

Onye nkwenye ga-enyocha nsonye chain na ọnọdụ nkwenye iche. Usoro nkwenye ZIP 311 na-eche na onye kpọrọ ya enwetala Azụmahia a gwupụtara na elu block ya.

## Oke ugbu a

Were ZIP 311 dịka ọkọlọtọ a tụrụ aro, ọ bụghị dịka nkwa na e-akpa ego ugbu a nwere bọtịnụ **Prove payment** na-arụ ọrụ.

Draft ahụ ugbu a na-akọwa mmefu na mpụta Sapling, mana ka nwere ihe emechabeghị maka Orchard, ntinye Oha, nzobe ederede mkpughe, ịnye ụdị, na otu e-akpa ego kwesịrị isi gosi ọkwa izi ezi dị iche iche. A na-edepụtakwa mmejuputa ntụaka ya dịka "TBD." Dịka e dere ya, ọ naghị akọwa mkpughe Kwụọ ụgwọ maka Kwụọ ụgwọ Orchard ma ọ bụ Ironwood.

Onye zitere ya nwekwara ike ghara ikpughe mpụta ma ọ bụrụ na e jiri ụma mepụta Azụmahia ahụ na-enweghị outgoing viewing key maka mpụta ahụ. ZIP 311 na-echekwa nhọrọ Nzuzo ahụ kama imepụta ụzọ mgbake ọhụrụ.

Akwụkwọ ochie na-akọwa iwu nnwale `z_getpaymentdisclosure` na `z_validatepaymentdisclosure` n'ime `zcashd`. Iwu ndị ahụ kwadoro naanị **mpụta Sprout JoinSplit**, ọ bụghị nhazi Sapling dị na ZIP 311, e wepụrụkwa ha. `zcashd` ruru nkwụsị End-of-Support ikpeazụ ya na Julaị 2026. Ejila ntụziaka ochie ahụ dịka ntuziaka maka ego ugbu a.

Ọghọm ndị a anaghị eme ka echiche ahụ ghara ịba uru. Ha na-akọwa ihe kpatara nduzi nlezianya ga-eji kewaa ụkpụrụ Nzuzo na Ojiji na ngwanrọ dị njikere maka ndị ọrụ nkịtị.

## Ajụjụ a na-ajụkarị

### Enwere m ike igosi Kwụọ ụgwọ nke e chebere echebe naanị na ID Azụmahia?

Mba. ID ahụ nwere ike ịchọpụta Azụmahia na ọnọdụ nkwenye ya, mana onye nnata nke e chebere echebe, ego, na memo abụghị ọha.

### Mkpughe Kwụọ ụgwọ ọ bụ otu ihe na viewing key?

Mba. Mkpughe nwere oke na nkọwa ahọpụtara nke otu Azụmahia. Viewing key nwere ike ikpughe ọrụ kwekọrọ maka Adreesị akpa ego ma ọ bụ akaụntụ ka oge na-aga.

### Onye nnata nwere ike ịmepụta proof onye zitere?

Ọ bụghị n'okpuru nhazi ZIP 311. Mkpughe ziri ezi ga-egosi ikike imefu maka opekata mpe otu ntinye. Onye nnata nwere ike ikwenye Kwụọ ụgwọ site na ndekọ e-akpa ego nke ya, mana nke ahụ bụ nkwupụta dị iche.

### Enwere m ike ịkagbu mkpughe mgbe ekesara ya?

Mba. Ọ naghị enye ohere akaụntụ n'ọdịnihu dịka viewing key, mana enwere ike idetuo data ekpughere na proof. Kekọrịta ya nlezianya dịka ndekọ ego nzuzo ọ bụla.

### Nkwenye ọ na-ebufe ma ọ bụ kpọchie ZEC ọ bụla?

Mba. Ịmepụta ma ọ bụ ikwenye mkpughe anaghị emefu, akwụghachi, kpọnwụọ, ma ọ bụ weghachite ego.

### Kedu ihe m ga-eji taa ma ọ bụrụ na e-akpa ego m enweghị atụmatụ mkpughe?

Bido na ndekọ e-akpa ego onye nnata, ID Azụmahia na ọnọdụ nkwenye, ntụaka akwụkwọ ọnụahịa dị na memo ezoro ezo, ma ọ bụ nnata ọzọ akụkụ abụọ nabatara. Jiri viewing key naanị mgbe nnukwu oke ya dị mkpa n'ezie ma ghọta ya.

## Akụrụngwa

- [ZIP 311: Zcash Mkpughe Kwụọ ụgwọ](https://zips.z.cash/zip-0311) - nhazi draft, ihe achọrọ, usoro nkwenye, na echiche Nzuzo
- [ZIP 310: Njirimara Nche nke Sapling Viewing Keys](https://zips.z.cash/zip-0310) - ihe viewing key na-ekpughe na nkwa ha na-enye
- [ZIP 304: Sapling Signature Adreesị](https://zips.z.cash/zip-0304) - usoro proof Adreesị nhọrọ a kpọtụrụ na ZIP 311
- [Zcash nkọwapụta protocol](https://zips.z.cash/protocol/protocol.pdf) - Sapling Nzobe ederede note [note], outgoing viewing keys, na ikike imefu
- [Akwụkwọ mkpughe Kwụọ ụgwọ zcashd echekwara](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - mmejuputa akụkọ ihe mere eme naanị Sprout, ọ bụghị nduzi ugbu a
- [zcashd atụmatụ e wepụrụ](https://zcash.github.io/zcash/user/deprecation.html) - ọnọdụ iwu mkpughe nnwale ochie

## Peeji ndị metụtara

- [Azụmahia](/using-zcash/transactions) - Kwụọ ụgwọ nke e chebere echebe, nkwenye, na nchọpụta nsogbu Azụmahia
- [Viewing keys](/zcash-tech/viewing-keys) - ohere naanị-agụ na-adịgide adịgide na nhọrọ mbupụ ugbu a
- [Ihe ihe nchọgharị block pụrụ ịhụ](/zcash-tech/what-a-block-explorer-can-see) - ubi Azụmahia ọha na nzuzo
- [Idobe ndekọ na ZEC nke e chebere echebe](/zcash-use-cases/keeping-records-with-shielded-zec) - ịza ajụjụ ego na-ebipụtaghị akụkọ e-akpa ego
