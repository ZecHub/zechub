![alt text](image-1.png)
# Njehie Orchard: Mgbe Sistemụ Proof Nwere Oghere

### Otu ahịrị mgbakọ na mwepụ nke e mechiri emechi ezughị ezu pụrụ isi mepụta ego a na-adịghị ahụ anya na-enweghị oke

> **Usoro isiokwu:** *Usoro Nyocha Nhazi* · **Akụkụ 2 n'ime 3**
> **Ndị e dere ya maka:** ndị mbido. Akụkụ 1 kọwara nyocha nhazi; ebe a, anyị zutere ezigbo njehie nke mere ka ọ dị ngwa ngwa. A kọwara ihe niile dị mkpa site na mmalite.
> **Ihe ị ga-enweta:** nghọta dị mfe ma zie ezi banyere otu sistemụ cryptographic proof nwere ike isi nwee oghere na soundness, ihe njehie "Orchard" nke Zcash bụ kpọmkwem, ihe mere ụdị njehie a ji nwee ike izo ọtụtụ afọ, na ihe mere o ji mee na mbụ.

N’Akụkụ 1, anyị kwuru na ule nwere ike igosi ịdị adị nke njehie ma ọ dịghị mgbe ọ pụrụ igosi enweghị ha, nakwa na njehie kachasị ize ndụ na-adị n’ime *nkowapụta* sistemụ, ya bụ, mgbakọ na mwepụ dị n’okpuru ya. Edemede a bụ ọmụmụ ikpe. N’afọ 2026, a chọpụtara ntụpọ n’ime pool nke e chebere echebe Orchard nke Zcash nke pụrụ ikwe ka onye mwakpo mepụta ego adịgboroja na-enweghị oke n’uzo a na-adịghị ahụ anya. Ọ lanarịrị afọ anọ na nyocha ugboro ugboro. Ịghọta ya, na ndị bu ya ụzọ, bụ mkpali kacha doo anya maka igosi na sistemụ ziri ezi.

---

## 1. Gịnị mere ị ga-eji lekọta ya?

Zcash bụ cryptocurrency nwere usoro nzuzo. N’ime pool ya nke e chebere echebe, a na-ezo ego, ndị zitere, na ndị natara Azụmahia. A na-emepụta Nzuzo a site n’iji **zero-knowledge proofs**: cryptographic proofs na-egosi na Azụmahia na-erube isi n’iwu niile, n’enweghị ikpughe ọdịnaya Azụmahia ahụ.

Nhazi ahụ nwere akụkụ abụọ. N’akwụkwọ ndekọ Oha dịka nke Bitcoin, ọ bụrụ na mmadụ eme ego site n’ihe efu, ọnụọgụ ndị toro eto ga-ahụ mmadụ niile, network ahụ nwekwara ike ijide ya ma weghachite ya azụ. N’ime pool nke e chebere echebe, a na-ezo ọnụọgụ ndị ahụ n’ụzọ e ji mee ya. Ya mere, ọ bụrụ na sistemụ proof n’onwe ya nwere ntụpọ nke na-ekwe ka Azụmahia na-adịghị irè yie nke irè, ịmepụta ego adịgboroja ahụ ga-abụ **ihe a na-apụghị ịchọpụta**. Ị pụghị ịhụ ya site n’ile akwụkwọ ndekọ ahụ, n’ihi na e mere ka akwụkwọ ndekọ ahụ ghara ido anya n’amaghị ama.

Nke ahụ bụ kpọmkwem ihe ize ndụ nke pụtara n’ime Orchard. Iji ghọta ya, anyị kwesịrị ileba anya n’ihe zero-knowledge proof na-enyocha n’ezie.

---

## 2. Nghọta: proof dị naanị mma dịka ndepụta nlele ya

Chee onye ọrụ ókèala nke ga-anabata ndị njem n’enweghị ịhụ akwụkwọ ha kpọmkwem. Kama nke ahụ, onye njem ọ bụla na-ejuputa **ndepụta nlele**, onye ọrụ ahụ na-anabatakwa onye ọ bụla akararị ihe niile dị na ndepụta ahụ. A haziri ndepụta ahụ ka *naanị onye njem ziri ezi nwere ike ịkara igbe ọ bụla.*

Ugbu a, were ya na otu igbe dị mkpa efu n’ime ndepụta ahụ, dịka, “paspọtụ agwụbeghị.” Ihe fọrọ nke nta ka ọ bụrụ mmadụ niile ka na-ejuputa ya n’eziokwu, ọ dịghịkwa ihe dị ka ọ dị njọ. Ma onye nwere paspọtụ agwụla nwekwara ike ịkara igbe niile fọdụrụ wee gafee nke ọma. Sistemụ ahụ dị ka ọ dị mma n’iji ya eme ihe kwa ụbọchị. Oghere ahụ dị mkpa naanị nye onye chọrọ ya kpọmkwem.

Zero-knowledge proof na-arụ ọrụ dịka ndepụta nlele ahụ. Ọ naghị ekpughe nkọwa nzuzo; ọ na-enyocha na ha mezuru otu ọnọdụ ndị e debere. Ọ bụrụkwa na ahapụrụ otu ọnọdụ dị mkpa n’amaghị ama, ụfọdụ ntinye na-adịghị irè nwekwara ike ịgafe, ebe ihe niile na-adịgide ka ọ na-adị.

Ka anyị mee ka “ndepụta ọnọdụ” doo anya, n’ihi na ebe ahụ bụ kpọmkwem ebe njehie ahụ dị.

---

## 3. Mgbakọ na mwepụ: circuits, constraints, na soundness

N’okpuru ihe niile, a na-etinye okwu “Azụmahia a ziri ezi” n’ime **circuit**: nchịkọta ọnọdụ mgbakọ na mwepụ a kapịrị ọnụ, nke a na-akpọ **constraints**, ndị e dere dịka arụmarụ n’elu ọnụọgụ. Iji mee proof ziri ezi, prover ga-enye ụkpụrụ nzuzo (nke a na-akpọ **witness**) na-emezu *constraint* ọ bụla. Proof ahụ na-eme ka verifier kwenye na witness dị otu a dị, n’enweghị ikpughe ya.

Njirimara anyị chọrọ n’aka sistemụ a nwere aha:

> **Soundness:** ọ ga-abụrịrị ihe na-agaghị ekwe omume ime proof ziri ezi maka okwu *ụgha*. Naanị okwu eziokwu kwesịrị inwe witnesses na-emezu constraints niile.

Soundness bụ nkwa megide ime ego adịgboroja. Ọ bụrụ na soundness dị, proof ziri ezi pụtara n’ezie na “Azụmahia dị adị nke na-erube iwu isi emeela.” Ọ bụrụ na soundness nwere oghere, proof ziri ezi nwere ike ọ gaghị apụta ihe ọ bụla.

### Ihe constraint furu efu na-eme (ihe atụ enyochala)

Constraints na-achọkarị ịmanye uru ka ọ dị mfe. Otu ihe atụ a na-ahụkarị: ịmanye uru `b` ka ọ bụrụ naanị **bit** otu, ya bụ, `0` ma ọ bụ `1`. Ụzọ ọkọlọtọ e si eme nke a bụ otu constraint:

```
b × (b − 1) = 0
```

Gịnị mere o ji arụ ọrụ? Ngwaahịa bụ efu naanị mgbe otu n’ime ihe mejupụtara ya bụ efu. Ya mere `b × (b − 1) = 0` na-amanye `b = 0` ma ọ bụ `b = 1`, ọ dịghịkwa ihe ọzọ. Mgbe a nyochara uru ọ bụla site na 0 ruo 16 (na mgbakọ na mwepụ nke na-alaghachi n’azụ na 17), *naanị* uru ndị na-emezu ya bụ **0 na 1** kpọmkwem. ✓

Ugbu a, were ya na ahapụrụ ahịrị ahụ n’ime circuit **n’amaghị ama**. Na mberede, `b` enweghị constraint. Prover na-adịghị akwụwa aka ọtọ nwere ike idobe `b` ka ọ bụrụ `5`, ma ọ bụ `9`, ma ọ bụ ihe ọ bụla, ma ka na-emezu constraints ndị fọdụrụ. Otu ahịrị ahụ furu efu bụ **oghere soundness**: okwu ụgha enweela witnesses na-emezu ihe achọrọ.

Nke a abụghị echiche efu. A chọpụtara constraint boolean furu efu nke ụdị a kpọmkwem n’ime nhazi mbụ nke e chebere echebe nke Zcash, Sprout, n’oge mmepe, e dozikwara ya tupu mmalite. Ịhapụ constraints ezughị ezu bụ otu n’ime mmejọ a na-ahụkarị ma dị ize ndụ n’iwulite circuits ndị a.

![alt text](image-2.png)

Nke a bụ ọdịdị niile nke njehie Orchard, n’ọ̀tụ̀tụ̀ dị nta. Ugbu a, ka anyị gaa n’ihe mere n’eziokwu.

---

## 4. Ihe njehie Orchard bụ n’ezie

A na-ewu proofs nke e chebere echebe nke Zcash n’elu **elliptic curves**, ihe mgbakọ na mwepụ nke enwere ike ijikọta isi ihe ha na “ịmụba” ha site n’ọnụọgụ, arụmọrụ ndị circuit kwesịrị iji constraints manye. Circuit ahụ nwere ngwaọrụ na-eme **elliptic-curve multiplication** ma na-enyocha na e mere ya nke ọma.

Dịka mkpughe nke Shielded Labs na onye nyocha Taylor Hornby siri kwuo, ntụpọ Orchard bụ kpọmkwem nke a:

> Otu **element nke circuit Orchard nke constraint ya ezughị ezu** mere ka o kwe omume itinye **ntinye ụgha ọ bụla n’ime elliptic-curve multiplication, ma mee ka nlele multiplication ahụ ka gafee.**

N’okwu dị mfe, ndepụta nlele nke circuit ahụ enweghị igbe ndị kwesịịrị ịkpọchi multiplication ahụ n’ọnọdụ ya. N’ihi oghere ahụ, onye mwakpo maara nke ọma pụrụ iwulite proof Azụmahia nke sistemụ ga-anabata n’agbanyeghị na Azụmahia ahụ kere uru site n’ihe efu. Nke ahụ bụ **ime ego adịgboroja**, ma n’ihi na a na-ezo ego dị n’ime pool nke e chebere echebe, ọ ga-abụ **ihe a na-apụghị ịchọpụta** site n’akwụkwọ ndekọ ahụ. Ndị otu Tachyon mechara kọwaa otu ntụpọ ahụ n’ọkwa koodu dịka ahịrị furu efu n’ime circuit nke ji nwayọọ gbaghaa arụmarụ ndị dị n’okpuru.

Myirịta dị n’etiti ya na akụkọ ndepụta nlele anyị bụ nke ziri ezi:

| Akụkọ ndepụta nlele | Njehie Orchard |
|---|---|
| Igbe “paspọtụ agwụbeghị” furu efu | Constraint furu efu n’elu elliptic-curve multiplication |
| Onye njem nwere paspọtụ agwụla gafere agbanyeghị | Ntinye ụgha ọ bụla na-agafe nlele multiplication |
| Ọ dịghị ihe metụtara ndị ọzọ, yabụ ihe ọ bụla adịghị ka ọ dị njọ | Azụmahia nkịtị rụrụ ọrụ nke ọma, na-ezo ntụpọ ahụ |
| Naanị onye na-achọ ya ka na-achọta oghere ahụ | Ọ chọrọ ka ọkachamara kpachaara anya nyochaa mgbakọ na mwepụ circuit ahụ |

Iji mee ka ịdị njọ ya doo anya: onye nyocha ahụ, site n’enyemaka AI, dere *exploit zuru ezu na-arụ ọrụ* ma kwado n’ime network ule dị n’ógbè na ọ mepụtara mkpụrụ ego adịgboroja na-enweghị oke, nke a na-apụghị ịchọpụta. Nke a bụ ntụpọ dị adị ma nwee ike irigbu, ọ bụghị naanị nchegbu echiche.

---

## 5. Ihe mere o ji zoo afọ anọ

Njehie ahụ biri n’ime Orchard site n’oge e mere ka ọ rụọ ọrụ n’ime **Mee 2022** ruo mmezi mberede n’ime **Juun 2026**, gafee nyocha ọkachamara ugboro ugboro nke ụfọdụ cryptographers kacha mma n’ụwa. Olee otu?

N’ihi na, dịka Akụkụ 1 dọrọ aka ná ntị, **ule na-ahọrọ ụfọdụ ikpe, ebe ntụpọ a biri n’ime ikpe onye ọ bụla na-ahọrọghị.** Azụmahia nkịtị anaghị eji constraint furu efu ahụ, yabụ ule ọ bụla gafere, ụbọchị ọ bụla nke ọrụ nkịtị yikwara enweghị ntụpọ. Enwere ike iru ntụpọ ahụ naanị site n’ịkpacha anya wulite witness pụrụ iche kpọmkwem maka oghere ahụ. N’ikpeazụ, a chọpụtara ya ọ bụghị site n’ịgba ule kama site n’*ịtụgharị uche banyere mgbakọ na mwepụ circuit ahụ*.

Nchọpụta ahụ n’onwe ya bụ ihe ịrịba ama nke ebe nchekwa na-aga. N’Ọnwa Eprel 2026, Shielded Labs kpọrọ onye nyocha nchekwa **Taylor Hornby** kpọmkwem ka ọ chọọ ụdị ntụpọ a. N’oge na-adịghị anya mgbe e wepụtara frontier AI model ọhụrụ (Anthropic's Claude Opus 4.8) n’ikpeazụ Mee 2026, Hornby jiri ya, tinyere harness nyocha omenala na usoro ọdịnala, mee nyocha lekwasịrị anya na circuit Orchard. N’ụbọchị **Mee 29, 2026**, nyocha ahụ chọpụtara vulnerability ahụ.

Eziokwu abụọ doro anya sitere na mkpughe ahụ kwesịịrị ikwupụta n’ụzọ kwụ ọtọ:

- Ndị otu ahụ ahụghị **ihe akaebe** na e jirila njehie ahụ mee ihe, ha weere na o yighị ka e jirila ya mee ihe na mbụ (ọ gabigala ọtụtụ afọ nke nyocha ọkachamara, a chọpụtakwara ya site n’ọrụ white-hat kpachaara anya). Ma ọdịdị nke ntụpọ *a na-apụghị ịchọpụta* pụtara na akwụkwọ ndekọ naanị ya enweghị ike igosi kpamkpam na ọ dịghị mgbe o mere.
- Nchọpụta ahụ kpatara nnukwu ọgba aghara, tinyere ọdịda dị nkọ n’ọnụ ahịa akụ ahụ, kpọmkwem n’ihi na *ohere* nke ime ego adịgboroja ezoro ezo dị oke njọ nye ego.

![alt text](image-3.png)

---

## 6. Nke a abụghị oge mbụ

Njehie Orchard so n’ezinụlọ njehie na-alaghachi ugboro ugboro, ịhụ ezinụlọ ahụ bụ ihe na-eme ka nyocha nhazi ghara ịdị ka nhọrọ kama ihe a na-apụghị izere. Njehie ime ego adịgboroja na-esite mgbe niile n’otu n’ime ebe atọ (taxonomi sitere n’Akụkụ 1): **nkowapụta** (mgbakọ na mwepụ n’onwe ya), **mmejuputa** (koodu anaghị eso mgbakọ na mwepụ ziri ezi), ma ọ bụ **echiche dara ada**. Nke kachasị mkpa:

> Njehie ime ego adịgboroja bụ **ihe a na-apụghị ịchọpụta** naanị ma ọ bụrụ na ọ dị n’ime **nkowapụta**. Njehie mmejuputa na-ahapụ ihe akaebe ọha na-adịgide adịgide, n’ihi na block ọ bụla na-edekọ ọdịnaya zuru ezu nke Azụmahia ọ bụla, yabụ ịgaghachi akụkọ ihe mere eme site na software e deziri ga-ekpughe Azụmahia ọ bụla koodu nwere njehie nakweere n’ụzọ na-ezighị ezi.

Akụkọ nke Zcash n’onwe ya na-egosi usoro a:

| Njehie (afọ) | Ebe o si | A pụrụ ịchọpụta? |
|---|---|---|
| Njehie Zerocash commitment (2016, tupu mmalite) | Nkowapụta (hash e belatara mebiri njirimara binding) | Enweghị ike ịchọpụta |
| Njehie soundness trusted setup (2018) | Nkowapụta (mmejọ dị n’akwụkwọ zk-SNARK dị n’okpuru) | Enweghị ike ịchọpụta |
| Nkukota query sistemụ proving (2025) | Nkowapụta (nlele furu efu n’ime sistemụ proof) | Enwere ike ịchọpụta |
| Njehie validation curve-subgroup (2016) | Mmejuputa (nlele subgroup furu efu) | Enwere ike ịchọpụta |
| **Multiplication Orchard nke constraint ya ezughị ezu (2026)** | **Nkowapụta (circuit)** | **Enweghị ike ịchọpụta** |

Ihe jikọrọ ha pụtara ìhè: ntụpọ ndị nwere ike izo ruo mgbe ebighị ebi bụ ndị dị n’ime mgbakọ na mwepụ. Nke ahụ bụ kpọmkwem ụdị proof igwe nyochara nke nkowapụta nwere ike iwepu, maka ikpe niile n’otu mgbe. Ule na nyocha na-ahọrọ ihe atụ; naanị igosi mgbakọ na mwepụ na-ekpuchi ntinye ọ bụla.

---

## 7. Nzaghachi

Ndị onye mmepụta nke Zcash mere ngwa ngwa n’usoro:

1. **Mmezi mberede (ka ọ na-erule Juun 1-2, 2026).** N’ime ụbọchị ole na ole mgbe mkpughe gasịrị, network upgrade mberede mechiri oge vulnerability ahụ, tinye constraints furu efu ka mgbakọ na mwepụ circuit ahụ dịzie na soundness ọzọ.
2. **Mmalite ọhụrụ, a pụrụ igosi (“Ironwood,” nke arụpụtara na Julaị 28, 2026).** Kama ịtụkwasị ụdị pool ochie e meziri obi ruo mgbe ebighị ebi, obodo ahụ malitere pool ọhụrụ nke e chebere echebe, Ironwood, dabere na circuit e deziri ma malite n’ụzọ dị ọcha, tinyere proof ziri ezi nke igwe nyochara.

Nzọụkwụ nke abụọ ahụ bụ ebe nyocha nhazi batara n’akụkọ a, ọ bụkwa isiokwu Akụkụ 3. Nghọta ndị otu ahụ tinyere n’ọrụ kwesịrị ka e buru ụzọ hụ, n’ihi na ọ na-ejikọta usoro isiokwu a niile:

> Njehie ime ego adịgboroja *a na-apụghị ịchọpụta* nwere ike ịdị naanị n’ime **nkowapụta** protocol. Ya mere, ọ bụrụ na ị pụrụ **igosi na nkowapụta ahụ** ewepụla ime ego adịgboroja, ị na-ewepu ezinụlọ njehie niile zoro ebe a afọ anọ.

Nke ahụ bụ kpọmkwem echiche ogidi nke mbụ sitere n’Akụkụ 1: nyochaa nkowapụta ahụ, ị mechiekwa oghere nke ule enweghị ike imechi.

---

## 8. Nkwupụta eziokwu

Anyị mere ka ihe dị mfe n’amaghị ama. Circuit nke bụ eziokwu nwere ọtụtụ narị mpaghara na ọtụtụ puku constraints, ntụpọ n’ezie dịkwa mgbagwoju anya karịa otu nlele bit furu efu; anyị jiri nlele bit n’ihi na ọ na-egosi *ụdị* circuit constraint ya ezughị ezu kpọmkwem, nakwa n’ihi na mmejọ ahụ kpọmkwem dị adị n’akụkọ Zcash. Njehie Orchard kpọmkwem bụ elliptic-curve multiplication nke constraint ya ezughị ezu, dịka e kwuru n’ime mkpughe gọọmenti. Anyị mekwara ka usoro oge mkpughe na mmezi dị mkpirikpi. Maka nkọwa teknụzụ nwere ikike, lee mkpughe Shielded Labs na ederede Project Tachyon.

---

## 9. Nchịkọta

- Pool nke e chebere echebe nke Zcash na-ezo ego site n’iji **zero-knowledge proofs**, yabụ ntụpọ n’ime proofs ndị ahụ pụrụ ime ka **ime ego adịgboroja a na-adịghị ahụ anya** kwe omume.
- Sistemụ proof na-enyocha **circuit** a kapịrị ọnụ nke **constraints**; njirimara ya dị oke mkpa bụ **soundness**: naanị okwu eziokwu kwesịrị inwe **witness** na-emezu ihe achọrọ.
- **Constraint furu efu** na-emepụta **oghere soundness**, na-ekwe ka okwu ụgha gafee. (Ihe egwuregwu enyochala: `b(b−1)=0` na-amanye `b` ka ọ bụrụ 0 ma ọ bụ 1; hapụ ya, `b` nwekwara ike ịbụ ihe ọ bụla. Otu ụdị njehie a kpọmkwem dị adị n’akụkọ Zcash.)
- **Njehie Orchard** bụ **elliptic-curve multiplication nke constraint ya ezughị ezu**: ntinye ụgha ọ bụla nwere ike ịgafe nlele multiplication ahụ, na-eme ka ime ego adịgboroja na-enweghị oke, nke a na-apụghị ịchọpụta kwe omume. E gosipụtara exploit na-arụ ọrụ n’ime network ule.
- Ọ zoro **afọ anọ** (Mee 2022 ruo Juun 2026) n’ihi na ule na-ahọrọ ikpe ma ọ dịghị mgbe ha họọrọ ya; a chọpụtara ya site n’ịtụgharị uche banyere mgbakọ na mwepụ, site n’enyemaka AI, n’ụbọchị Mee 29, 2026.
- Ime ego adịgboroja a na-apụghị ịchọpụta nwere ike ịdị naanị n’ime **nkowapụta**, Zcash ahụla ezinụlọ njehie a na mbụ. Zcash zara ya site na mmezi mberede na pool ọhụrụ e nyochara n’usoro nhazi, **Ironwood**, nke bụ isiokwu Akụkụ 3.

---

## Nkọwa okwu

| Okwu | Ihe ọ pụtara n’asụsụ dị mfe |
|---|---|
| **Shielded pool** | Usoro nzuzo nke Zcash ebe a na-ezo ego na ndị so na ya |
| **Zero-knowledge proof** | Proof na-egosi na okwu zoro ezo ziri ezi, n’ekpugheghị ihe ọzọ |
| **Circuit** | Nchịkọta ọnọdụ mgbakọ na mwepụ a kapịrị ọnụ nke Azụmahia ziri ezi ga-emezurịrị |
| **Constraint** | Otu ọnọdụ (arụmarụ) dị n’ime circuit |
| **Witness** | Uru nzuzo ndị na-emezu constraints |
| **Soundness** | Nkwa na naanị okwu eziokwu nwere ike ịmepụta proof ziri ezi |
| **Soundness gap** | Constraint furu efu nke na-ekwe ka okwu ụgha gafee |
| **Under-constrained** | Circuit nke ọnọdụ dị mkpa furu efu, mgbọrọgwụ njehie Orchard |
| **Detectable / undetectable** | Ma irigbu ya ga-ahapụ ihe akaebe n’akwụkwọ ndekọ ọha ma ọ bụ na ọ gaghị ahapụ |

---

## Ajụjụ a na-ajụkarị

**E mepụtara Zcash adịgboroja n’ezie?**  
Ahụghị ihe akaebe na e jirila ya mee ihe, ndị otu ahụ weere na o yighị ka e jiri ya mee ihe. Ma ebe ntụpọ ahụ agaghị enwe ike ịchọpụta site n’akwụkwọ ndekọ, akwụkwọ ndekọ naanị ya enweghị ike igosi kpamkpam na ọ dịghị mgbe o mere, nke mere nzaghachi ahụ ji zuo oke.

**Gịnị mere izo ego ji eme ka njehie ka njọ?**  
N’ime chain Oha, mkpụrụ ego e mepụtara na-apụta ìhè, a pụkwara ijide ma weghachite ha azụ. Mgbe e zoro ego maka Nzuzo, njehie ime ego adịgboroja anaghị emepụta ihe ọ bụla a na-ahụ anya na-adịghị nkịtị, yabụ o nwere ike ịdịgide n’enweghị onye hụrụ ya.

**Gịnị mere ọtụtụ afọ nke nyocha anaghị ejide ya?**  
Nnyocha na ule na-enyochakarị omume n’ime ikpe ndị yiri nke eziokwu. Njehie a pụtara naanị n’okpuru ntinye a kpachaara anya rụọ, pụrụ iche, nke lekwasịrị anya n’ọnọdụ mgbakọ na mwepụ pụrụ iche, nke nyocha nkịtị anaghị eji. A chọpụtara ya site n’ịtụgharị uche lekwasịrị anya n’ime circuit, ọ bụghị site n’ule.

**Otu constraint furu efu ò zuru ezu n’ezie?**  
Ee. Sistemụ proof dị naanị ike dịka constraints ya zuru ezu. Otu ọnọdụ dị mkpa ahapụrụ ezuru iji kwe ka okwu na-adịghị irè gafee.

**Kedu ọrụ AI rụrụ?**  
Onye nyocha jiri frontier AI model, tinyere harness omenala na usoro ọdịnala, nyochaa mgbakọ na mwepụ circuit ahụ ma chọta ntụpọ ahụ. A na-eji AIwanye eme ihe n’akụkụ abụọ nke nchekwa, nke bụ akụkụ nke ihe mere igosi na sistemụ ziri ezi ji dị oke mkpa ugbu a.

---

### Nwale nghọta gị

Were ya na Azụmahia e chebere echebe kwesịịrị igosi “ego batara hà ego pụtara,” ma circuit chefuo itinye constraint n’otu uru mmepụta. Gịnị ka prover na-adịghị akwụwa aka ọtọ nwere ike ime, gịnịkwa mere akwụkwọ ndekọ ọha ga-adị ka ọ dị nkịtị kpamkpam? *(Azịza dị n’okpuru.)*

<details><summary>Azịza</summary>

Ebe output ahụ enweghị constraint, prover ahụ nwere ike idobe ya ka ọ karịa ka ntinye dị adị nwere ike ikwe, ma si otú a kee uru site n’ihe efu, ya bụ ego adịgboroja. Proof ahụ ka ga-enyocha nke ọma, n’ihi na constraint furu efu bụ naanị ihe gaara ejide enweghị nha ahụ. Ma ebe pool nke e chebere echebe na-ezo ego, akwụkwọ ndekọ ahụ na-egosi naanị na “Azụmahia ziri ezi emeela,” na-enweghị enweghị nha a na-ahụ anya iji kpalite mkpu. Aghụghọ ahụ dị adị ma a naghị ahụ ya, nke bụ kpọmkwem ihe mere soundness nke circuit ji dị oke mkpa, na ihe mere a ga-eji gosi ya kama ịnwale ya.
</details>

---

### Ihe na-esote

**Akụkụ 3 · Ironwood:** mmezi ahụ abụghị naanị patch. Ndị injinia Zcash wuru pool ọhụrụ nke e chebere echebe wee tinye ya proof mgbakọ na mwepụ igwe nyochara, karịrị theorems 2,700 e dere n’ime Lean proof assistant, na ọ nweghị ike ịmepụta ego adịgboroja n’okpuru echiche ndị e kwuru. Anyị ga-ahụ ihe “balance integrity” na “knowledge soundness” pụtara, ihe proof ahụ na-ekpuchi na ihe ọ na-adịghị ekpuchi, na otu e si kwụsị pool ochie n’enweghị nsogbu.

*Akụkụ nke usoro* Formal Verification *maka [ZecHub](https://zechub.org).*
