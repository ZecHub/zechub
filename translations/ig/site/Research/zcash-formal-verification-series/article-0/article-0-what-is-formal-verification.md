![alt text](image-1.png)
# Gịnị Bụ Nnyocha Nkwenye Iwu [Formal Verification]?

### Otu esi egosi na mmemme ziri ezi, kama naanị inwe olileanya na ọ dị otu a

> **Usoro isiokwu:** *Usoro Nnyocha Nkwenye Iwu* · **Nkebi 1 n'ime 3**
> **Ndị e lekwasịrị anya:** ndị mbido kpamkpam. A naghị ewere na ị maara mgbakọ na mwepụ, mmemme kọmputa, ma ọ bụ cryptography.
> **Ihe ị ga-eji pụọ:** nghọta doro anya banyere ihe ọ pụtara *igosipụta* na software ziri ezi, ihe mere nke a ji dị nnọọ iche na ịnwale ya, ihe proof igwe nyochara bụ, na oke ziri ezi (na nke e ji ezi obi kwuo) nke ụdị proof dị otu a nwere ike ikwe nkwa.

A na-atụkwasị ọtụtụ software obi n'ihi na a *nwalerela* ha: anyị na-agba ha n'ọtụtụ ntinye ma na-ekiri otú ha si arụ ọrụ. Nnyocha nkwenye iwu na-ajụ ajụjụ siri ike karịa. Anyị nwere ike *igosipụta*, n'ịdị n'aka nke mgbakọ na mwepụ, na usoro na-eme ihe kwesịrị ekwesị maka **ntinye ọ bụla** o nwere ike inweta, gụnyere ndị ọ dịghị onye chepụtara ịnwale? Edemede a na-ewulite echiche ahụ malite na isi ya. Mmalite bụ nghọta, enweghị akara mgbakọ na mwepụ ruo mgbe ha dị mkpa.

---

## 1. Gịnị mere ị ga-eji lekọta nke a?

Nke a bụ akụkọ mere n'ezie, ọ bụkwa ihe kpatara usoro isiokwu a ji dị.

Na 2022, cryptocurrency nke lekwasịrị anya na Nzuzo [privacy] Zcash wepụtara pool nke e chebere echebe ọhụrụ a kpọrọ Orchard, nke mere ka ndị mmadụ nwee ike ime azụmahịa ebe e zoro ego ole ha ji eme ya. Ruo afọ anọ, ọ rụrụ ọrụ nke ọma n'enweghị mmejọ ma gafee nyocha ndị ọkachamara ugboro ugboro. Mgbe ahụ, na Mee 2026, onye nchọpụta nchekwa nke ji nlezianya tụlee mgbakọ na mwepụ dị n'okpuru ya (site n'enyemaka ngwaọrụ AI) chọpụtara otu ebe **a naghị amanye nke ọma** n'ime mgbakọ na mwepụ nke usoro ahụ. Otu oghere ahụ nwere ike ime ka onye mwakpo mepụta ego adịgboroja na-enweghị oke, ma n'ihi na e zoro ego ole ha bụ, ọ dịghị onye ga-ahụ na nke a mere. Mmejọ ahụ anọwo ebe ahụ oge niile.

Ọ bụghị ịnwale ka chọpụtara ya. Nnwale ọ bụla agafewo ruo afọ anọ. Ọ bụ mmadụ *tụlere mgbakọ na mwepụ ahụ* ka chọpụtara ya. Mgbe ndị otu ahụ doziri ya, ha emeghị naanị patch wee gaa n'ihu. Ha dere **proof mgbakọ na mwepụ nke igwe nyochara**, nke nwere ihe karịrị theorems 2,700 n'otu n'otu, na-egosi na nke nọchiri ya enweghị ike ịnwe ụdị mmejọ ahụ ma ọlị.

Nke a bụ nnyocha nkwenye iwu, nke a bụkwa ihe ọ na-enye gị: ọ bụghị …anyị nwara ọtụtụ ọnọdụ, ha wee rụọ ọrụ…, kama …anyị gosiri na ọ dị irè n'ọnọdụ ọ bụla…. Maka usoro ebe otu ọnọdụ a na-ahụghị nwere ike ibute ọdachi (ego, ụgbọelu, ngwaọrụ ahụike, cryptography), ọdịiche ahụ bụ ihe niile.

Onye ọkà mmụta sayensị kọmputa Edsger Dijkstra nyere ntụpọ nzuzo dị n'ịnwale aha ọtụtụ iri afọ gara aga, ma ọ ka bụ eziokwu:

> **Ịnwale nwere ike igosi na bugs dị, mana ọ gaghị egosi na ha adịghị.**

Ọ bụrụ na nnwale agafe, ihe ị mụtara bụ na usoro ahụ na-arụ ọrụ *na ntinye ahụ*. Ị mụtaghị ihe ọ bụla gbasara ntinye ndị ị nwaghị, ma bugs dị ize ndụ fọrọ nke nta ka ha bụrụ ndị dị n'ọnọdụ ndị ọ dịghị onye nwara.

---

## 2. Nghọta mbụ: ilele ụzọ ọnụ ụzọ na igosi na ụlọ ahụ ziri ezi

Cheedị na ị na-ahụ maka ụlọ nwere otu puku ọnụ ụzọ, ọrụ gị bụ ikwe nkwa na a kpọchiri ọnụ ụzọ niile n'abalị.

- **Ụzọ ịnwale:** jee gburugburu ma nwalee ụfọdụ ọnụ ụzọ. Nwale iri ise, otu narị, ma ọ bụ narị ise. Ọnụ ụzọ ọ bụla i nwara akpọchiri, ya mere ntụkwasị obi gị na-abawanye. Mana ị nwabeghị ha niile, otu ọnụ ụzọ na-akpọchighị nwere ike ịbụ nke ị mafere.
- **Ụzọ nnyocha nkwenye iwu:** nyochaa *usoro mkpọchi ahụ n'onwe ya* ma gosi, site n'otú e siri chepụta ya, na ịpị bọtịnụ …kpọchie… ga-eme ka ọnụ ụzọ ọ bụla kpọchie. Ugbu a, ọ dịghị mkpa ịnwale ọnụ ụzọ nke ọ bụla. I gosila na *ọ dịghị ọnụ ụzọ ọ bụla nwere ike ịhapụ na-akpọchighị*, n'ihi na usoro ahụ na-eme ka nke ahụ ghara ikwe omume.

Ọdịiche ahụ dị n'etiti **ịhọrọ ụfọdụ ihe dị adị ma nyochaa ha** na **igosipụta njirimara nke atụmatụ ahụ**. Ịnwale na-ahọrọ ụfọdụ. Nnyocha nkwenye iwu na-egosi. Nke ahụ bụ echiche dum, ihe ọ bụla ọzọ bụ ngwaọrụ maka ime ya n'ụzọ siri ike.

![alt text](image-2.png)

---

## 3. Ogidi atọ nke nnyocha nkwenye iwu ọ bụla

Nnyocha nkwenye iwu ọ bụla, n'agbanyeghị ogo ọ dị elu, bụ kpọmkwem ihe atọ ka e ji wuo ya. Ghọta ndị a nke ọma, ihe fọdụrụ bụ nkọwa.

| Ogidi | Ihe ọ pụtara n'ụzọ dị mfe | Ọmụmaatụ ụlọ |
|---|---|---|
| **Nkọwapụta** | Okwu doro anya nke ihe …ziri ezi… *pụtara* | …A ga-akpọchi ọnụ ụzọ ọ bụla n'abalị… |
| **Usoro** | Ihe ahụ a na-enyocha n'ezie (mmemme, sekit, protocol) | Ụlọ ahụ na usoro mkpọchi ya |
| **Proof** | Arụmụka siri ike na usoro ahụ na-emezu nkọwapụta mgbe niile | Ngosipụta ezi uche na ịpị …kpọchie… na-akpọchi ọnụ ụzọ niile |

Ihe nke anọ, nke dị jụụ karị, na-eme ka ihe niile bụrụ nke a pụrụ ịtụkwasị obi:

- **Onye nyocha igwe.** Ọ bụghị mmadụ na-ede proof ahụ ka e ji anya lelee ya naanị. A na-enye ya mmemme (a **proof assistant**, nke a na-akpọkwa **theorem prover**) nke na-enyocha *nzọụkwụ ezi uche ọ bụla*. Mmadụ nwere ike ikwu ihe na-enweghị ihe akaebe ma ọ bụ mehie obere mmejọ; igwe agaghị anabata nzọụkwụ na-esoghị n'ụzọ kpọmkwem. Nke a bụ ihe mere anyị ji asị na nsonaazụ ya bụ **nke igwe nyochara**.

![alt text](image-3.png)

Ụfọdụ proof assistants ị nwere ike ịnụ aha ha gụnyere **Lean**, **Rocq** (nke bụbu Coq), na **Isabelle**. N'ezie, ha bụ engines pụrụ iche siri ike nke na-enyocha ezi uche. E dere proof Zcash dị n'akụkọ mmalite anyị na **Lean**. N'ụzọ pụtara ìhè, a na-eji ụdị AI ọgbara ọhụrụ enyere aka *ide* proofs ndị a, ebe ụmụ mmadụ na-eduzi ha; nke a emeela ka ọrụ ndị na-ewerebu afọ daa ruo izu ole na ole. Igwe ahụ ka na-enyocha nzọụkwụ ọ bụla, ya mere mmụba ọsọ ahụ anaghị ebelata n'aka ọ bụla.

---

## 4. Ihe proof bụ n'ezie

Okwu …proof… nwere ike ịdị egwu, ya mere ka anyị mee ka ọ dị mfe site n'ọrụ atụ doro anya ma a pụrụ inyocha. Enweghị cryptography, naanị mgbakọ ụlọ akwụkwọ.

**Nkwupụta:** maka ọnụọgụ zuru ezu ọ bụla `n`, nchikọta `0 + 1 + 2 + ... + n` hà `n(n+1)/2`.

Ị nwere ike *ịnwale* nke a. `n = 5` na-enye `0+1+2+3+4+5 = 15`, na `5 × 6 / 2 = 15`. ✓ Ha kwekọrọ. Nwale `n = 10`: nchikọta ya bụ `55`, usoro ahụ na-enye `10 × 11 / 2 = 55`. ✓ (A gbakọọla ma kwado ihe ndị a; n'ezie nkwupụta a na-adị irè maka `n` ọ bụla site na 0 ruo 999 mgbe a nyochara ya ozugbo.)

Mana ịnwale ụkpụrụ, ọbụna otu puku n'ime ha, agaghị eru …maka ọnụọgụ zuru ezu **ọ bụla**…. Ha enweghị njedebe. **Proof** na-emechi oghere na-enweghị njedebe ahụ site n'ọrụ nwere njedebe, na-eji usoro a na-akpọ **induction**:

1. **Ikpe Base:** maka `n = 0`, nchikọta ahụ bụ naanị `0`, usoro ahụ na-enye `0 × 1 / 2 = 0`. Ha kwekọrọ. ✓
2. **Nzọụkwụ induction:** *chee na* usoro ahụ dị irè maka ọnụọgụ ụfọdụ `k`. Ugbu a tinye ọnụọgụ na-esote, `k+1`. Nchikọta ruo `k+1` bụ `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Otu ahịrị algebra na-ahazigharị nke a ka ọ bụrụ `(k+1)(k+2)/2`, nke bụ kpọmkwem usoro ahụ mgbe `k+1` nọchiri `k`. ✓

Ebe ọ bụ na ọ dị irè na mmalite (0), ma nzọụkwụ ọ bụla na-ebuga ya n'ọnụọgụ na-esote, ọ dị irè maka ọnụọgụ zuru ezu **niile**, ruo mgbe ebighị ebi, site n'otu arụmụka nwere njedebe. Nke ahụ bụ proof. Proof assistant na-eme kpọmkwem ụdị echiche a, mana ọ na-eji usoro igwe achọpụta na nzọụkwụ ọ bụla, gụnyere …otu ahịrị algebra ahụ…, na-esite n'ezie n'ihe bu ya ụzọ.

> Echiche dị mkpa ị ga-anabata: proof na-atụgharị …ọnọdụ na-enweghị njedebe… ka ọ bụrụ **arụmụka nwere njedebe, a pụrụ inyocha**. Nke ahụ bụ ike pụrụ iche ịnwale na-enweghị n'usoro ya.

---

## 5. Ebe bugs na-adị n'ezie

Nnyocha nkwenye iwu dị ike n'akụkụ ụfọdụ n'ihi nghọta doro anya banyere *ebe* bugs si apụta na mbụ. Mmejọ ọ bụla n'usoro na-enyocha iwu na-esite n'otu n'ime ebe atọ:

| Isi iyi bug | Ihe ọ pụtara | Anyị nwere ike iji proof wepụ ya? |
|---|---|---|
| **Nkọwapụta** | Mgbakọ na mwepụ ma ọ bụ iwu n'onwe ha ezighi ezi (ọnọdụ furu efu, nkọwa na-adịghị mma) | **Ee**, ozugbo; nke a bụ ebe nnyocha nkwenye iwu na-arụ ọrụ kacha mma |
| **Mmejuputa** | Code anaghị eme nkọwapụta ziri ezi n'eziokwu | N'akụkụ ụfọdụ; mgbe ụfọdụ ọdịda ndị a na-ahapụ ihe akaebe a pụrụ ịchọpụta |
| **Echiche a dabere na ya dara ada** | Ihe usoro dum dabere na ya ghọrọ ihe na-adịghị ezi | Mba; echiche ndị ahụ bụ ntọala a na-apụghị ibelata |

Nhazi a dị mkpa karịa ka ọ dị ka ọ bụ, Nkebi 2 na 3 daberekwa na ya. Bugs kachasị omimi ma dị ize ndụ, ndị nwere ike izo ruo mgbe ebighị ebi, na-adịkarị na **nkọwapụta**: nkọwa mgbakọ na mwepụ nke ihe usoro ahụ kwesịrị ime. Nkọwapụta ahụ bụkwa kpọmkwem ihe proof igwe nyochara nwere ike nyochaa ozugbo, n'ọnọdụ niile n'otu oge. Nke a bụ ihe mere mgbalị siri ike nke nnyocha nkwenye iwu ji elekwasị anya ebe ahụ mbụ.

![alt text](image-4.png)

---

## 6. Ndụmọdụ kacha mkpa n'ọrụ a dum

Nnyocha nkwenye iwu dị ike, mana nkwa ya doro anya, aghọtahie ya na-eduhie ndị mmadụ. Ya mere, kwuo ya nke ọma:

> **Proof na-ekwe nkwa na *usoro* na-emezu *nkọwapụta*, n'okpuru *echiche ndị ekwuru*. Ọ dịghị ihe ọzọ.**

Nsonaazụ anọ na-esite na nke a, nke ọ bụla dịkwa mkpa:

- **Ọ bụrụ na nkọwapụta ezighi ezi, proof ahụ abaghị uru.** Ọ bụrụ na i gosipụta …ọnụ ụzọ ọ bụla na-akpọchi… ma ihe achọrọ n'ezie bụ …windo *ọ bụla* na-akpọchi…, ị gosila ihe na-ezighi ezi n'ụzọ zuru oke. Nnyocha nkwenye na-enyocha na i wuru *ihe i kọwapụtara*, ọ bụghị na i kọwapụtara ihe kwesịrị ekwesị.
- **Ọ bụrụ na e kwuru nkọwa n'ụzọ nwere obere mmejọ, nkwa ahụ na-adị warara n'enweghị mkpọtụ.** Proof gbasara nkọwa …balance… nwere ntakịrị mmejọ nwere ike igosi ihe na-erughị ka i chere, ebe ọ ka na-agafe nyocha ọ bụla. Nke a bụ ihe mere nkọwa ndị dị n'obi nnyocha nkwenye ji kwesị ịdị mkpụmkpụ, ọkọlọtọ, ma ndị mmadụ nwee ike nyochaa ha n'ihu ọha.
- **Ọ bụrụ na echiche ndị e dabere na ha ada ada, nkwa ahụ na-akwụsị ịdị irè.** Proofs na-adabere n'echiche (…akụrụngwa mkpọchi adịghị agbaji n'anụ ahụ…). Ọ bụrụ na echiche ahụ ezighi ezi n'ezi ụwa, nkwubi okwu ahụ ekwesịghị ịdị irè.
- **Ọ pụtaghị …enweghị bugs mgbe ọ bụla….** Ọ pụtara …enweghị bugs nke ụdị nkọwapụta a wepụrụ, ma ọ bụrụ na echiche ndị a dị irè…. Nke a bụ nkwupụta warara, nke e ji ezi obi kwuo, ma baa uru karịa nke ukwuu.

Kama ime ka nnyocha nkwenye iwu ghara ịdị ike, izi ezi a bụ ike ya. Ọ na-agwa gị *kpọmkwem* ihe ị na-enweta. Dị ka anyị ga-ahụ na Nkebi 3, ndị otu Zcash ikwu oke na echiche ha n'ụzọ doro anya (…anyị gosiri ịdị mma nke supply, n'okpuru echiche ndị a akpọrọ aha, ọ bụghịkwa Nzuzo…) bụ ihe atụ nke ezi obi ahụ.

![alt text](image-5.png)

---

## 7. Nkwupụta eziokwu

Iji mee ka nke a dị mfe ịgụ, anyị mere ka ihe ụfọdụ dị mfe. A na-ede ezigbo nkọwapụta n'asụsụ iwu doro anya, ọ bụghị n'ahịrịokwu Bekee; e nwere ọtụtụ *ụdị* nnyocha nkwenye iwu (interactive theorem proving, model checking, ụzọ dabere na SMT) dabara nsogbu dị iche iche; ide proofs ndị a ka bụ ọrụ chọrọ nka na mgbalị, ọbụna mgbe AI na-enyere aka. Anyị hapụkwara otu proof assistant si anọchi ezi uche n'ime ya. Ọ dịghị nke ọ bụla n'ime ihe ndị a na-agbanwe isi ihe ahụ: nkọwapụta, usoro, na proof igwe nyochara nke na-egosi na ha kwekọrọ, n'okpuru echiche ndị ekwuru. Anyị ga-alaghachi na nkọwa ndị ahụ mgbe ha dị anyị mkpa.

---

## 8. Nchịkọta

- **Ịnwale** na-ahọrọ ntinye ụfọdụ ma nwee ike igosi na bug dị, ma ọ gaghị egosi na bugs adịghị. Bugs dị ize ndụ na-ezo n'ọnọdụ ndị ọ dịghị onye họrọ ịnwale.
- **Nnyocha nkwenye iwu** na-egosi na njirimara dị irè maka ọnọdụ **ọ bụla** o nwere ike ime, n'arụmụka nwere njedebe a pụrụ inyocha.
- Nnyocha nkwenye ọ bụla nwere ogidi atọ: **nkọwapụta** (ihe ziri ezi pụtara), **usoro** (ihe a nyochara), na **proof** na-egosi na ha kwekọrọ, tinyere **proof assistant** (dịka **Lean**) nke igwe na-eji enyocha nzọụkwụ ọ bụla.
- **Proof** (dịka ọmụmaatụ, site na **induction**) na-achịkọta ọnọdụ na-enweghị njedebe ka ọ bụrụ otu arụmụka nwere njedebe.
- Bugs na-adị na **nkọwapụta**, **mmejuputa**, ma ọ bụ **echiche dara ada**. Nnyocha nkwenye iwu na-elekwasị nkọwapụta anya ozugbo, nke bụ ebe bugs kasị omimi ma zoro ezo na-adịkarị.
- Nkwa ahụ doro anya: usoro ahụ na-emezu **nkọwapụta ahụ**, n'okpuru **echiche ndị ekwuru**. Nkọwapụta na-ezighi ezi, nkọwa ekwuru n'ụzọ na-adịghị mma, ma ọ bụ echiche dara ada na-eme ka ọ ghara ịdị irè, ọ pụtaghịkwa …enweghị bugs mgbe ọ bụla….

---

## Nkọwa okwu

| Okwu | Ihe ọ pụtara n'ụzọ dị mfe |
|---|---|
| **Formal verification** | Igosipụta, site na mgbakọ na mwepụ, na usoro na-emezu nkọwapụta maka ọnọdụ niile |
| **Specification** | Okwu doro anya nke ihe …omume ziri ezi… pụtara |
| **System** | Mmemme, sekit, ma ọ bụ protocol n'ezie a na-enyocha |
| **Proof** | Usoro nwere njedebe nke nzọụkwụ ezi uche na-egosi nkwupụta maka ọnọdụ niile |
| **Proof assistant / theorem prover** | Software (Lean, Rocq, Isabelle) nke na-enyocha nzọụkwụ ọ bụla nke proof |
| **Machine-checked** | Kọmputa nyochara ya nzọụkwụ site na nzọụkwụ, ọ bụghị naanị site n'ịgụ mmadụ |
| **Induction** | Usoro proof: ọ dị irè na mmalite, nzọụkwụ ọ bụla na-ebuga ya n'ọnọdụ na-esote |
| **Assumption** | Ọnọdụ proof dabere na ya; ọ bụrụ na ọ bụ ụgha, nkwa ahụ nwere ike ghara ịdị irè |

---

## Ajụjụ a na-ajụkarị

**Nnyocha nkwenye iwu ọ na-anọchi ịnwale?**
Mba. Ha na-akwado ibe ha. Ịnwale na-achọpụta nsogbu bara uru na echiche na-ezighi ezi n'ụzọ dị ọnụ ala; nnyocha nkwenye na-ewepụ klas bugs dum nke ịnwale nwere ike ghara ịhọrọ mgbe ọ bụla.

**Ọ bụrụ na ọ dị ike otú a, gịnị mere na a naghị eme nnyocha nkwenye iwu maka ihe niile?**
Ọ dị ọnụ ahịa ma na-achọ nka pụrụ iche, n'agbanyeghị na enyemaka AI na-ebelata ọnụ ahịa ahụ. A na-edobe ya maka usoro ebe bug na-adịkarịghị ga-ebute ọdachi, nke bụ kpọmkwem ebe ọnụ ahịa ya na-akwụ ụgwọ.

**Usoro e mere nnyocha nkwenye iwu maka ya ọ ka nwere ike ada ada?**
Ee, ọ bụrụ na nkọwapụta ezighi ezi, e kwuru nkọwa n'ụzọ na-adịghị mma, echiche adịghị irè, ma ọ bụ ọdịda ahụ dị n'èzí ihe e kọwapụtara. Proof ahụ na-ekpuchi naanị ihe ọ na-ekwu na ọ na-ekpuchi.

**Proof igwe nyochara ọ na-adị ntụkwasị obi karịa nke mmadụ mere?**
Maka proofs buru ibu ma gbagwojuru anya, n'ozuzu ee. Igwe agaghị eleghara obere oghere anya ma ọ bụ nakwere okwu enweghị ihe akaebe, n'agbanyeghị na ọ ka na-atụkwasị nkọwapụta na nkọwa e nyere ya obi.

**Ọ bụrụ na AI na-enyere aka ide proof, gịnị mere anyị ga-eji tụkwasị ya obi?**
N'ihi na proof assistant na-enyocha nzọụkwụ ọ bụla n'usoro igwe. AI na-atụ aro nzọụkwụ; igwe na-achọpụta ha. A na-ajụ naanị nzọụkwụ na-ezighi ezi, ya mere AI na-eme ka ọrụ ahụ dị ngwa n'ebelataghị nkwa ahụ.

---

### Nwale nghọta gị

I gosipụtara na software ụlọ akụ …anaghị ekwe ka balance akaụntụ gaa n'okpuru efu…. Otu afọ gachara, ego ka na-efu. Olee otu ihe abụọ ahụ nwere ike isi bụrụ eziokwu n'otu oge? *(Azịza dị n'okpuru.)*

<details><summary>Azịza</summary>

Proof ahụ kwere nkwa kpọmkwem otu njirimara: balances anaghị aga n'okpuru efu. Ego nwere ike ifu n'ụzọ njirimara ahụ na-adịghị ekwu maka ya, dịka bug na-ebuga ego n'akaụntụ na-ezighi ezi (nke ka na-adịghị n'okpuru efu), ma ọ bụ mmejọ n'akụkụ usoro a na-akọwapụtaghị mgbe ọ bụla. Nnyocha nkwenye ahụ mere kpọmkwem ihe o kwere nkwa, ọ dịghịkwa ihe ọzọ. Nke a bụ ndụmọdụ Nkebi 6 na-arụ ọrụ: proof na-ekpuchi nkọwapụta, ọ bụghị echiche ọ bụla a pụrụ iche n'echiche banyere …ihe ziri ezi….
</details>

---

### Ihe na-esote

**Nkebi 2 · Bug Orchard:** anyị ga-atụgharị ugbu a n'akụkọ 2026 n'ezie n'uju. Usoro Nzuzo zoro ego ole e ji eme azụmahịa site na cryptographic proofs, ma otu ahịrị a naghị amanye nke ọma n'ime mgbakọ na mwepụ ya pụtara na a pụrụ ime ka proofs ndị ahụ kwuo ụgha, nke na-ekwe ka e mee ego adịgboroja a na-apụghị ịhụ anya na-enweghị oke. Anyị ga-ahụ kpọmkwem ihe …sekit a naghị amanye nke ọma… pụtara, ihe mere klas bug a ji nwee ike izo ruo mgbe ebighị ebi, na ihe mere ọ ji mee ihe karịrị otu ugboro.

*Ọ bụ akụkụ nke* Formal Verification *series maka [ZecHub](https://zechub.org).*
