![alt text](image-1.png)
# Ironwood: Ịgosipụta na Enweghị Ike Ịmepụta Ego Adịgboroja

### Otu Zcash si zaa ahụhụ site na proof igwe nyochara

> **Usoro isiokwu:** *Nyocha Ọdịdị* · **Nkebi 3 n'ime 3**
> **Ndị e lekwasịrị anya:** ndị ọhụrụ. Nkebi 1 na 2 kọwara nyocha ọdịdị na ahụhụ Orchard; mmechi a na-egosi ka echiche abụọ ahụ si zukọta n'ime usoro dị adị. A ga-echetara ihe niile dị mkpa ka anyị na-aga.
> **Ihe ị ga-enweta:** nghọta ziri ezi banyere ihe Zcash gosipụtara n'ezie gbasara pool ọhụrụ ya nke “Ironwood”, otú e si hazie proof ahụ, ihe ọ gụnyere na ihe ọ naghị agụnye, otú e si kwụsị pool ochie n'enweghị nsogbu, na ihe mere nke a ji egosi ụkpụrụ ọhụrụ maka iwulite ego cryptographic.

Na Nkebi 1, anyị mụtara ihe ọ pụtara *igosipụta* na usoro ziri ezi. Na Nkebi 2, anyị hụrụ ezigbo ntụpọ nke ule achọpụtaghị ruo afọ anọ, ịba ụba elliptic-curve nke enweghị mgbochi zuru ezu nke gaara ekwe ka e mepụta ego adịgboroja na-adịghị ahụ anya n'enweghị njedebe. Isiokwu a bụ ihe ngwọta ya: otu Zcash si zaghachi ọ bụghị naanị site na mmezi, kama site na proof igwe nyochara na ụdị ahụhụ ahụ dum apụọla.

---

## 1. Gịnị mere ị ga-eji lekọta nke a?

Mgbe ahụhụ na-etinye ego n'ihe ize ndụ, azịza a na-ahụkarị bụ idozi ya ma gaa n'ihu. Zcash mere ihe karịrị nke ahụ. N'akụkụ pool nke e chebere echebe [shielded] ọhụrụ a kpọrọ **Ironwood**, nke malitere ọrụ na Julaị 28, 2026, ndị injinia ya bipụtara **proof mgbakọ na mwepụ igwe nyochara**, nke nwere **theorem karịrị 2,700** e dere n'ime onye enyemaka proof [proof assistant] **Lean**, na-egosi na pool ọhụrụ ahụ enweghị ike ịmepụta mkpụrụ ego adịgboroja n'okpuru echiche e kwuru. Proof ahụ bụ nke ọha, dị na ebe nchekwa open-source `ironwood`, ma were ndị otu atọ nke ndị nchọpụta na ndị cryptographer ihe karịrị otu ọnwa imecha.

Nke a dị mkpa karịa Zcash. Ọ bụ otu n'ime ngosipụta kacha doo anya n'ụwa n'ezie na ị nwere ike iwere usoro ego na-arụ ọrụ, dee kpọmkwem ihe “enweghị ego adịgboroja” pụtara, ma *gosipụta* ya, kama ịtụ anya na ule gị zuru oke. Ọ na-eme nkwa ka ọ bụrụ theorem.

---

## 2. Echiche bụ isi: gosi nkọwapụta ahụ, kpochapụ ụdị ahụhụ ahụ

Nkebi 2 kwụsịrị n'echiche mere ka nke a kwe omume. Cheta ya, n'ihi na ihe niile ebe a dabere na ya:

> Ahụhụ imepụta ego adịgboroja nke *a na-enweghị ike ịchọpụta* nwere ike ịdị naanị n'ime **nkọwapụta [specification]** protocol, bụ nkọwa mgbakọ na mwepụ nke ihe circuit ga-amanye. Ihe ọ bụla a pụrụ ịchọpụta ga-apụta n'ịza ajụjụ ọha. Ya mere, igosipụta na nkọwapụta ahụ ziri ezi na-ekpochapụ ụdị ahụhụ imepụta ego adịgboroja zoro ezo dum n'otu oge.

Gịnị mere ọ bụ “naanị n'ime nkọwapụta”? N'ihi na block [block] ọ bụla na-edekọ ọdịnaya zuru ezu nke Azụmahia [transaction] ọ bụla ruo mgbe ebighị ebi, tinyere proof ya. Ọ bụrụ na *software* nabatara Azụmahia ọjọọ n'ụzọ na-ezighị ezi, onye ọ bụla nwere ike iji software e doziri megharịa akụkọ gara aga wee hụ ya. Ihe akaebe ahụ na-adịgide adịgide ma bụrụ nke ọha. Naanị ntụpọ dị na *mgbakọ na mwepụ* dị n'okpuru nwere ike izo ruo mgbe ebighị ebi, n'ihi na enweghị “ụdị ziri ezi” a ga-eji tụnyere ya ọzọ. Nke ahụ bụ ntụpọ nyocha ọdịdị lekwasịrị anya.

Ule na-enyocha *omume n'itinye atụ*, ahụhụ Orchard zoro onwe ya kpọmkwem n'ihi na enweghị input atụ rutere ya. Proof gbasara nkọwapụta ahụ na-ekpuchi input **niile** n'otu oge, tinyere ọnọdụ nsọtụ ndị mmadụ agaghị eche ịnwale. Nke ahụ bụ naanị ụdị nkwa siri ike ga-ezuru iji jiri obi ike kwụsị ntụpọ na-adịghị ahụ anya dị afọ anọ.

![alt text](image-2.png)

---

## 3. Ihe kpọmkwem egosipụtara

Proof ahụ na-eguzobe otu njirimara bụ isi, nke ewuru n'elu njirimara miri emi dị n'okpuru ya.

### Izu oke nguzozi [Balance integrity] (isi okwu)

> **Izu oke nguzozi:** uru zoro ezo echekwara na pool nke e chebere echebe anaghị agafe uru ọha net nke batara na ya.

Nke a bụ njirimara mgbochi imepụta ego adịgboroja n'asụsụ dị mfe. Ego nwere ike ịbanye na pool nke e chebere echebe (nke a na-ahụ n'ihu ọha) wee pụta na ya (nke a na-ahụ n'ihu ọha), mana n'ime ya, ebe e zoro ego, enweghị uru a ga-akpọpụta n'enweghị ihe. Ka anyị jiri obere ledger [ledger] (mgbakọ egosiri) mee ka ọ doo anya:

- **Azụmahia eziokwu:** input ruru `5 + 3 = 8` na-emepụta output ruru `4 + 4 = 8`. Uru batara hà uru pụtara. Izu oke nguzozi dị. ✓
- **Mgbalị imepụta ego adịgboroja:** otu input ahụ ruru `8`, mana output nke `4 + 4 + 2 = 10`. Nke ahụ ga-emepụta nkeji `2` n'enweghị ihe. Izu oke nguzozi **machibidoro** nke a: pool ahụ agaghị akwụpụta karịa ihe batara na ya. ✗

Izu oke nguzozi bụ nkwupụta mgbakọ na mwepụ na ọnọdụ nke abụọ enweghị ike ịmepụta Azụmahia bara uru.

### Izu oke ihe ọmụma [Knowledge soundness] (igwe dị n'okpuru)

Iji kwe nkwa izu oke nguzozi, ndị nchọpụta ga-ebu ụzọ gosi njirimara miri emi ma dị aghụghọ gbasara usoro zero-knowledge proof n'onwe ya. Izu oke nkịtị (nke Nkebi 2 kwuru dịka “naanị nkwupụta eziokwu nwere witness”) ghọrọ na ọ *ezughị* maka pool nke e chebere echebe, n'ihi ihe na-adọrọ mmasị: ebe Azụmahia zoro ezo nwere ike ịnwe ihe ọ bụla, ihe fọrọ nke nta ka ọ bụrụ nkwupụta niile n'ụzọ teknụzụ *nwere* witness. Ya mere, ndị nchọpụta gosipụtara njirimara siri ike karị:

> **Izu oke ihe ọmụma:** onye ọ bụla nwere ike imepụta proof Azụmahia bara uru ga-enwe *n'ezie* witness bara uru, ya bụ, mkpụrụ ego n'ezie, ewepụtara n'ụzọ ziri ezi, n'ebe Adreesị akpa ego [address] ziri ezi.

Ngwá ọrụ [tools] ọdịdị eji eme nke a bụ **extractor**: usoro nke, e nyere prover ọ bụla nwere ike ime ka verifier kweta, nwere ike ịpụta witness n'ezie n'aka ya. Ọ bụrụ na e nwere ike ịpụta witness mgbe niile, prover na-eme ka e kweta ga-enwerịrị nke ahụ n'ezie. N'asụsụ Nkebi 2, izu oke ihe ọmụma bụ nkwa ọdịdị na **enweghị oghere izu oke [soundness gap]**, enweghị mgbochi furu efu nke ga-ekwe ka nkwupụta ụgha gafee. Ọ bụ kpọmkwem njirimara nke *enweghị ya* bụ ahụhụ Orchard. Igosipụta na ọ dị, maka prover niile nwere ike ịdị, bụ ihe na-emechi ụzọ ahụ kpamkpam.

![alt text](image-3.png)

---

## 4. Otu e si wuo proof ahụ

Nyocha ahụ bụ nnukwu mgbalị mmadụ, ọ bụghị nsonaazụ ịpị otu bọtịnụ:

- E dere ya n'ime onye enyemaka proof **Lean** (site na Nkebi 1: igwe na-enyocha nzọụkwụ ezi uche ọ bụla).
- O nwere **theorem karịrị 2,700**, nke ọha nwere ike ịhụ na ebe nchekwa `ironwood`.
- Ndị otu **atọ** nke ndị nchọpụta na ndị cryptographer mepụtara ya n'ime **ihe karịrị otu ọnwa**, tinyere ọrụ Project Tachyon's Tal Derei duru, na onyinye Gregor Mitscha-Baude nke zkSecurity na Daira-Emma Hopwood nke Zcash Open Development Lab, yana proof izu oke yiri ya nọọrọ onwe ya nke ndị cryptographer ndị ọzọ mere.

Iji tụlee njirimara ahụ, ụdị Lean ahụ na-akọwa **ledger** zuru ezu dịka ndepụta Azụmahia, nke ọ bụla na-ebu omume ya, uru ọha ọ kwupụtara, na signature [signature] ya. Predicate ndị nchọpụta kpọrọ **ValidLedger** na-edegharị iwu consensus [consensus] nke network ozugbo: witness nke omume ọ bụla ga-emezu ọnọdụ achọrọ, spend-marker (nullifier [nullifier]) ọ bụla agaghị apụta ugboro abụọ, ọnọdụ osisi ọ bụla e zoro aka na ya ga-abụrịrị nke usoro ahụ rutere n'eziokwu, na signature ọ bụla ga-enwerịrị nkwenye. Theorem ndị ahụ na-atụle **ledger niile** bara uru. Ahịrị ahụ, “ledger niile bara uru,” bụ isi ihe: ọ bụghị atụ, kama ha niile, set buru ibu nke ihe ọ bụla onye mwakpo n'ezie nwere ike ikpokọta.

A na-achịkọta nsonaazụ izu oke nguzozi site na theorem dị iche iche nke ọkwa ledger, nke nke ọ bụla na-egosi na e mechiela otu ụzọ isi emepụta ego adịgboroja: na spend ọ bụla kwekọrọ na output dị adị gara aga, na a na-echekwa uru zuru ezu, na note [note] anataara na-anọgide na-enwe ike ime spend ma enweghị ike izuru ya, nakwa na spending chọrọ ikike kwesịrị ekwesị. Otu akụkụ dị iche, **binding signature**, na-ejikọta uru zoro ezo nke Azụmahia ọ bụla na ego ọha ọ kwupụtara, ya mere ịza ajụjụ zoro ezo na nke ọha enweghị ike ịdị iche nwayọọ nwayọọ.

---

## 5. Ebe mgbakọ na mwepụ zutere software

Ajụjụ aghụghọ ma kwụ ọtọ bụ nke a: proof ahụ gbasara ụdị mgbakọ na mwepụ, mana network na-agba code Rust. Kedu ka anyị si mara na code ahụ kwekọrọ na ụdị ahụ?

Ndị otu ahụ sere oke nlezianya ha kpọrọ **fingerprint** verifier. N'elu oke ahụ, proof Lean na-atụle verifier dịka ihe mgbakọ na mwepụ ziri ezi. N'okpuru ya ka implementation Rust nkịtị dị. Arụmụka bụ isi ahụ dị ka nke Nkebi 2:

> Ụzọ ọ bụla software n'ezie nwere ike isi dị iche na ụdị egosipụtara ga-abụ ahụhụ *implementation*, ahụhụ implementation nwekwara ike ịmepụta naanị imepụta ego adịgboroja *a pụrụ ịchọpụta*, n'ihi na a na-edekọ proof ọ bụla anabatara ruo mgbe ebighị ebi ma enwere ike iji software e doziri megharịa ya.

Ya mere, proof na-ahụ maka ụdị a na-enweghị ike ịchọpụta (nkọwapụta), ndekọ ọha na-adịgide adịgide na-ahụkwa maka ụdị a pụrụ ịchọpụta (implementation). N'etiti ha, enweghị ebe ahụhụ imepụta ego adịgboroja *a na-enweghị ike ịchọpụta* ga-ezo. Ndị otu ahụ nyochakwara ya, site n'ịgba verifier n'ezie ma kwado na ọ na-emepụta fingerprint ahụ kpọmkwem n'ọnọdụ e jidere.

---

## 6. Ịdọ aka ná ntị kacha mkpa: “n'okpuru echiche e kwuru”

Nkebi 1 kwusiri ike na proof na-ekwe nkwa na usoro ahụ na-emezu nkọwapụta *n'okpuru echiche e kwuru*, ọ pụtaghịkwa “enweghị ahụhụ ọ bụla mgbe ọ bụla.” Ndị otu Zcash kọwara nke a n'ụzọ ziri ezi nke ukwuu, akwụkwọ mmụta kwụ ọtọ kwesịkwara ime otu ahụ.

Proof ahụ na-ebute nchekwa Ironwood n'otu obere set nke echiche ọkọlọtọ, akpọrọ aha nke ọma. Karịsịa, izu oke ya dabere na isi ike nke **nsogbu logarithm pụrụ iche [discrete logarithm problem]** na elliptic curve Ironwood ji (echiche a mụọla nke ọma, ebe mwakpo kacha mma a maara ga-achọ ihe dịka arụmọrụ `2^126`, nke karịrị mgbakọ ọ bụla a pụrụ ime), tinyere echiche nhazi ọkọlọtọ maka hash function. Oke abụọ kwesịrị ikwu n'ụzọ doro anya:

- **Ọ dị irè n'okpuru echiche cryptographic ndị ahụ.** Ọ bụrụ na e bibie echiche bụ isi, nkwa ahụ ga-akwụsị. Nke a bụ ihe a na-ahụkarị ma a pụghị izere ya; ihe fọrọ nke nta ka ọ bụrụ cryptography niile a na-eji dabere n'echiche ndị dị otú ahụ.
- **Ọ na-ekpuchi izu oke nguzozi, ọ bụghị Nzuzo [privacy].** Proof ahụ gbasara izu oke supply (enweghị ego adịgboroja). Ọ naghị ekwu na ọ gosipụtara nkwa Nzuzo pụrụ iche nke pool ahụ, nke bụ njirimara dị iche nwere arụmụka dị iche.

Kama ime ka ihe rụpụtara ghara ịdị ike, ịkpọ oke ndị a aha bụ ihe na-eme ka a tụkwasị ya obi. Nkwupụta ahụ ziri ezi: *n'okpuru echiche cryptographic ọkọlọtọ, pool a enweghị ike ịmepụta mkpụrụ ego adịgboroja a na-enweghị ike ịchọpụta.* Nke a bụ theorem, ọ bụghị olileanya, a na-ekwupụtakwa oke ya n'ihu ọha.

![alt text](image-4.png)

---

## 7. Ịkwụsị pool ochie n'enweghị nsogbu: turnstile

Igosipụta na pool *ọhụrụ* ziri ezi ka na-ahapụ ajụjụ: gịnị gbasara pool Orchard *ochie*, ebe ntụpọ ahụ biri afọ anọ? Ị nweghị ike ikpughe akụkọ gara aga zoro ezo. Mana ị nwere ike ịmachi ọdịnihu ya.

Zcash webatara usoro a kpọrọ **turnstile**. Iwu ahụ dị mfe ma dị ike:

> Uru nwere ike isi na pool ochie pụta naanị ruo n'ogo uru e kwadoro na ọ batara na ya.

Ebe ọ bụ na ego na-abanye ma na-apụta n'ime pool nke e chebere echebe na-ahụ anya n'ihu ọha (naanị ọrụ *n'ime* ya ka zoro ezo), turnstile na-ahapụ network dum ileba anya na ọ dịghị ihe na-apụta karịa ihe ọ bụla batara. Ọ bụrụ na e mepụtara mkpụrụ ego adịgboroja n'ime pool ochie, ha ga-erute oke a ma ghara ịpụta. Ka ego eziokwu na-apụ ma enweghị oke uru apụta, obodo na-enweta nnukwu ihe akaebe ọha na-egosi na ejighị ntụpọ ahụ eme ihe. Ọ bụ ihe kacha nso na nyocha supply pool nzuzo n'emebighị Nzuzo ya, ọ na-emekwa ka izu oke supply dịkwuo nso na ụdị Oha [transparent] nke chain dịka Bitcoin, mgbe ọ na-echekwa Nzuzo Zcash.

![alt text](image-5.png)

Ironwood n'onwe ya na-ejikwa circuit proof e doziri, na-amalite ọhụrụ na pool efu, ma na-agbakwụnye nchedo maka ọdịnihu (tinyere ndokwa ka ego nọgide nwee ike ịnapụta ma ọ bụrụ na kọmputa quantum n'ọdịnihu eyie cryptography taa egwu). Ọrụ ọhụrụ nke e chebere echebe na-agafe ugbu a na Ironwood, ebe a machibidoro pool Orchard ochie naanị na withdrawals.

---

## 8. Nnukwu foto: cryptography nwere nnukwu nkwenye

Ironwood bụ akụkụ nke mgbanwe sara mbara n'otú Zcash si ewu. Mgbalị scaling [scaling] ọgbọ ọzọ ya (nhazi a kpọrọ **Tachyon**, nke ewuru n'elu proof recursive na toolkit a kpọrọ **Ragu**) na-etolite n'okpuru nkà ihe ọmụma a na-akpọ mgbe ụfọdụ **cryptography nwere nnukwu nkwenye [high-assurance cryptography]**: ile nyocha ọdịdị igwe nyochara anya ọ bụghị dị ka ihe a ga-eme emechaa, kama dị ka akụkụ ọkọlọtọ nke iwepụta usoro cryptographic ọhụrụ.

Ezi uche ya na-adọrọ mmasị. Cryptography dị n'ọkpụkpụ teknụzụ bụ kpọmkwem ebe nghọta mmadụ na-esighi ike, ebe ọnọdụ nsọtụ dị aghụghọ a na-anwalebeghị nwere ike zoo ọtụtụ afọ, dịka Orchard gosiri. Igosipụta nkọwapụta ahụ bụ otu usoro nwere ike iru “input niile kwere omume” ma mechie oghere ndị ahụ site n'ọrụ owuwu. Ndị otu ahụ egosila na ha bu n'obi ịgbatị nyocha a n'ihu ka oge na-aga, ruo implementation na karịa ya. Tụọ anya ịhụ ka a nabata ọkwa a n'ọtụtụ ebe, n'ime na karịa Zcash.

---

## 9. Nkwupụta ịdọ aka ná ntị kwụ ọtọ

Anyị mere ka ihe dị mfe iji mee ka ọ doo anya. Mmepe Lean n'ezie zuru ezu karịa eserese ebe a, nwere nkọwa ziri ezi nke omume, nkwupụta, commitment [commitment], nullifier, na signature; “izu oke nguzozi” na “izu oke ihe ọmụma” nwere nkọwa ọdịdị kpọmkwem anyị kwuru naanị n'okwu; mbelata gaa n'isi ike discrete-log na-agafe ọtụtụ ụdị etiti (ụdị algebraic nke prover na ụdị random-oracle nke hash) anyị chịkọtara dị ka “echiche ọkọlọtọ”; anyị kọwakwara fingerprint na turnstile n'ọkwa echiche. Ọ dịghị nke ọ bụla n'ime nke a na-agbanwe akụkọ bụ isi: nkọwapụta nke “enweghị imepụta ego adịgboroja,” proof igwe nyochara gbasara ledger niile bara uru, nkwupụta doro anya na kwụ ọtọ banyere oke na echiche, yana ịkwụsị pool nwere ntụpọ n'enweghị nsogbu. Maka nkọwa nwere ikike, lelee akwụkwọ nyocha Project Tachyon bipụtara na ebe nchekwa proof `ironwood`.

---

## 10. Nchịkọta

- Zcash zara ahụhụ Orchard ọ bụghị naanị site na mmezi kama site na **proof igwe nyochara** (theorem **karịrị 2,700** n'ime **Lean**, nke ọha nwere ike ịhụ) maka pool **Ironwood** ọhụrụ ya.
- Proof ahụ na-eguzobe **izu oke nguzozi** (pool anaghị akwụpụta uru karịa ihe batara na ya n'ihu ọha), nke e wuru n'elu **izu oke ihe ọmụma** (proof bara uru chọrọ ka prover nwee witness n'ezie, nke a na-ekwenye site na **extractor**). Izu oke ihe ọmụma bụ kpọmkwem njirimara nke oghere ya bụ ahụhụ Orchard.
- Ọ na-atụle **ledger niile bara uru**, ọ bụghị ọnọdụ atụpụtara, nke bụ ihe na-emechi ụdị ahụhụ imepụta ego adịgboroja zoro ezo nke ule na-ahụghị.
- A na-eji oke **fingerprint** elekọta oghere mgbakọ na mwepụ-na-software: proof na-ewepụ ahụhụ ndị a na-enweghị ike ịchọpụta, ọpụpụ implementation ọ bụla ga-abụkwa nke **a pụrụ ịchọpụta** n'ime ndekọ ọha na-adịgide adịgide.
- A kọwara nkwa ahụ kpọmkwem: ọ dị irè n'okpuru **isi ike discrete-log na echiche hash ọkọlọtọ**, ọ na-ekpuchikwa **imepụta ego adịgboroja, ọ bụghị Nzuzo**. Ịkwụ ọtọ a bụ uru, ọ bụghị adịghị ike.
- **Turnstile** na-akwụsị pool ochie n'enweghị nsogbu site n'ịmachi ihe na-apụta na deposit e nwere ike ikwenye, na-ekpughe ego adịgboroja ọ bụla ma na-ewulite ihe akaebe ọha nke izu oke supply.
- Ironwood na-egosipụta ntụgharị gaa na **cryptography nwere nnukwu nkwenye**, ebe nyocha ọdịdị bụ akụkụ ọkọlọtọ nke iwulite ego cryptographic ọhụrụ.

---

## Nkọwa okwu

| Okwu | Nkọwa dị mfe n'asụsụ Bekee |
|---|---|
| **Ironwood** | pool ọhụrụ nke e chebere echebe Zcash (2026), nke dochiri pool Orchard nwere ntụpọ |
| **Balance integrity** | Pool anaghị akwụpụta uru karịa uru batara na ya n'ihu ọha |
| **Knowledge soundness** | Proof bara uru chọrọ ka prover nwee witness n'ezie |
| **Extractor** | Usoro na-ewepụta witness n'aka prover ọ bụla na-eme ka e kweta |
| **Lean** | Onye enyemaka proof ejiri igwe nyochaa nyocha ahụ |
| **ValidLedger** | Ụdị ọdịdị nke iwu consensus theorem na-atụle |
| **Fingerprint** | Oke dị n'etiti mgbakọ na mwepụ egosipụtara na software Rust na-arụ ọrụ |
| **Under stated assumptions** | Proof ahụ dị irè ma ọ bụrụ na echiche cryptographic akpọrọ aha dị irè |
| **Turnstile** | Iwu na-amachi ihe na-apụta na pool na deposit e nwere ike ikwenye |
| **High-assurance cryptography** | Iwulite crypto na nyocha ọdịdị dịka nzọụkwụ ọkọlọtọ |

---

## Ajụjụ a na-ajụkarị

**Proof ahụ ọ pụtara na Ironwood enweghị ahụhụ?**
Mba, ọ naghị ekwukwa nke ahụ. Ọ na-egosi otu njirimara kpọmkwem, izu oke nguzozi, n'okpuru echiche e kwuru. Nke ahụ na-ewepụ imepụta ego adịgboroja a na-enweghị ike ịchọpụta, ọ bụghị ahụhụ niile a pụrụ iche n'echiche.

**Proof ahụ ọ na-ekwe nkwa na Azụmahia m bụ nke Nzuzo?**
Mba. Nyocha ahụ na-ekpuchi izu oke supply (enweghị ego adịgboroja), ọ bụghị nkwa Nzuzo pụrụ iche nke pool ahụ. A na-arụrịta ụka maka ndị ahụ n'ụzọ dị iche.

**Gịnị mere a ga-eji tụkwasị proof mmadụ (na AI) dere obi?**
N'ihi na igwe nyochara ya. Onye enyemaka proof Lean na-ekwenye nzọụkwụ ọ bụla n'ụzọ igwe, ya mere ntụkwasị obi dabere na nkọwapụta na echiche akpọrọ aha, ọ bụghị na nlekọta mmadụ ma ọ bụ AI n'ime nzọụkwụ ọ bụla.

**Gịnị na-eme mkpụrụ ego ka dị na pool Orchard ochie?**
Enwere ike ịwepụ ha, mana naanị ruo n'ogo ego batara na ya nke a pụrụ ikwenye, nke turnstile na-amanye. Nke a na-echekwa ma izu oke supply ma na-enye aka igosi na ejighị ntụpọ ochie ahụ eme ihe.

**Nke a ọ bụ njedebe nke akụkọ a?**
Ọ bụ nnukwu nzọụkwụ, ọ bụghị akara njedebe. A na-ewu nhazi ọdịnihu Zcash (Tachyon, ya na toolkit Ragu) na nyocha ọdịdị dịka omume ọkọlọtọ, na-agbatị ụzọ a n'ihu.

---

### Nwalee nghọta gị

Onye kwuru, sị: “Ebe ọ bụ na Ironwood enyochala n'ụdị ọdịdị, ugbu a ọ gaghị ekwe omume ka ihe ọ bụla mebie Zcash.” N'iji echiche sitere na akụkụ atọ niile, nye ihe abụọ dị iche mere nkwupụta ahụ ji sie ike karịa ka o kwesịrị. *(Azịza dị n'okpuru.)*

<details><summary>Azịza</summary>

Nke mbụ, proof ahụ na-ekpuchi otu njirimara *kpọmkwem* (izu oke nguzozi) n'okpuru *echiche e kwuru* (isi ike discrete-log na nhazi hash ọkọlọtọ). Ọ bụrụ na e bibie echiche cryptographic, ma ọ bụ ọ bụrụ na nsogbu bilitere n'èzí ihe e kwuru (dịka ọmụmaatụ na Nzuzo, na software e-akpa ego [wallet], ma ọ bụ n'ime akụkụ a na-egosibeghị), proof ahụ anaghị ekwu ihe ọ bụla gbasara ya. Nke abụọ, nyocha ọdịdị na-ekwe nkwa na usoro ahụ na-emezu *nkọwapụta e dere*; ọ bụrụ na nkọwapụta ahụ n'onwe ya ejighị otu ezigbo mkpa, proof ahụ ga-eji ntụkwasị obi kwado ihe na-ezighi ezi. Isi abụọ ahụ bụ ịdọ aka ná ntị Nkebi 1 ekwughachiri: proof ziri ezi ma nwere oke, dị ike kpọmkwem n'ihi na oke ya kwụ ọtọ, ọ bụghị nkwa zuru ebe niile na ọ dịghị ihe ga-emebi mgbe ọ bụla.
</details>

---

### Usoro isiokwu ahụ, zuru ezu

N'ime akụkụ atọ, anyị si n'echiche zuru ụwa ọnụ gaa n'ọrụ dị ndụ: ihe ọ pụtara **igosipụta** na software ziri ezi kama ịnwale ya (Nkebi 1), otú circuit enweghị mgbochi zuru ezu n'ezie gaara esi mepụta ego na-adịghị ahụ anya (Nkebi 2), na otú proof igwe nyochara nke **izu oke nguzozi** si kwụsị ụdị ahụhụ ahụ kpamkpam (Nkebi 3). Ihe jikọrọ ha bụ otu nkwa kwụ ọtọ: ọ bụghị “enweghị ahụhụ mgbe ọ bụla,” kama “njirimara a kpọmkwem dị n'ọnọdụ ọ bụla, n'okpuru echiche e kwuru.” Maka ego na-ezo ego nke ya, nkwa ahụ bụ kpọmkwem nke kwesịrị igosipụta.

*Akụkụ nke* Formal Verification  *usoro isiokwu maka [ZecHub](https://zechub.org).*
