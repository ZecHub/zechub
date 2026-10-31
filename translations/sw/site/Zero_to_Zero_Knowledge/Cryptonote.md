# Zero to Zero Knowledge: Itifaki ya CryptoNote

**Mfululizo:** Zero to Zero Knowledge

Jambo la kuvutia leo!  
Itifaki ya **CryptoNote** huwezesha faragha ya on-chain [on-chain privacy] iliyo imara. Leo tunajifunza vipengele vyake vyote muhimu na jinsi ambavyo imetekelezwa na miradi kadhaa mashuhuri ya faragha.

![CryptoNote intro](/content-images/FrXr5P8WIAAvx36-88db0c8250.webp)

---

## Usuli

Whitepaper asili ya CryptoNote ilichapishwa kwa jina bandia **“Nicolas van Saberhagen”**.  

**Bytecoin** ilikuwa sarafu-fiche ya kwanza kutekeleza itifaki hiyo. Mradi unaojulikana zaidi unaoitumia leo ni **Monero (XMR)**. Pia umetumika katika TurtleCoin, Aeon, na mingine kadhaa.

---

## Vipengele Msingi vya CryptoNote

Itifaki ya CryptoNote hutoa vipengele vitatu vikuu:

1. **Kutofuatilika [Untraceability] na kutoweza kuhusishwa [Unlinkability]** kwa miamala [transactions]
2. **Uthibitisho wa Kazi wa Kiusawa [Egalitarian Proof of Work]** (unaokinza ASIC) 
3. **Utoaji unaobadilika [Dynamic emission]**

---

## 1. Kutofuatilika - Sahihi za Mviringo

Kutofuatilika hufikiwa hasa kwa kutumia **Sahihi za Mviringo [Ring Signatures]**.

Unapotuma muamala, ufunguo wako halisi wa umma huchanganywa na funguo kadhaa za chambo (hiyo “mviringo”) - zote zikiwa na kiasi sawa cha sarafu. Hili hufanya iwe vigumu sana kubaini ni nani hasa aliyetuma sarafu hizo.

**Ukubwa wa mviringo** huathiri kwa kiasi kikubwa seti ya kutokujulikana. Miviringo mikubwa hutoa faragha bora zaidi.

![Ring Signatures explanation](/content-images/FrXteGHXgAANE0F-f11593a0d9.webp)

**Ulinganisho na Zcash**:  
Seti ya kutokujulikana ya Zcash ni jumla ya miamala yote *iliyowahi* kufanywa katika bwawa la faragha husika (kubwa zaidi kuliko ukubwa wa kawaida wa mviringo wa CryptoNote).

---

## Ring CT (Miamala ya Siri)

Muundo wa **Ring CT** uliimarisha sana faragha katika sarafu zinazotegemea CryptoNote.

Badala ya kuficha mtumaji pekee, Ring CT pia **huficha kiasi cha muamala** kati ya mtumaji na mpokeaji.

![Ring CT diagram](/content-images/FrXuivgWYAAze7B-260071c1b3.webp)

Hutumia:
- Kriptografia ya Mikunjo ya Duaradufu
- Commitment za Pedersen
- Usimbaji fiche wa Homomorphic

**Mathibitisho [Proofs]** hutumiwa kuonyesha kwamba kiasi ni kikubwa kuliko 0 na kiko ndani ya viwango halali **bila kufichua thamani halisi**.

**Anwani Fiche [Stealth Addresses]** pia huongeza anwani za matumizi ya mara moja kwa mpokeaji.

![Stealth Addresses + Proofs](/content-images/FrXut5aWAAMhuRb-f3ce8ea3fd.webp)

---

## 2. Uthibitisho wa Kazi wa Kiusawa (ePoW)

CryptoNote inalenga kuunda mfumo wa uchimbaji wenye usawa zaidi kwa kuwa sugu dhidi ya ASIC.

Inatumia algoriti ya **CryptoNight** (kazi inayohitaji kumbukumbu nyingi). Tofauti na SHA256 ya Bitcoin, CryptoNight imeundwa kupunguza pengo kati ya wachimbaji wa CPU, GPU, na ASIC.

**Hatua za CryptoNight:**
1. Anzisha eneo kubwa la kumbukumbu (scratchpad) kwa data ya nasibu-bandia
2. Fanya operesheni nyingi za kusoma/kuandika kwenye scratchpad
3. Fanya hash ya scratchpad nzima ili kutoa thamani ya mwisho

![CryptoNight mining](/content-images/FrXvNs3XsAA37LG-5779657f5c.webp)

(Kumbuka: Monero tangu wakati huo imeacha kutumia CryptoNight na kuhamia algoriti nyingine.)

---

## 3. Utoaji Unaobadilika

Badala ya matukio ya ghafla ya kupunguzwa kwa nusu [halving] (kama Bitcoin), CryptoNote hutumia **zawadi ya block inayopungua polepole**.

Hii huunda mkunjo wa utoaji ulio laini zaidi kadiri muda unavyopita.

![Dynamic emission curve](/content-images/FrXv8wpXoAEjUxW-e2bbaebced.webp)

**Muunganiko wa Zcash**:  
Wasanidi programu wa Zcash wamejadili kutekeleza mkunjo wa utoaji ulio laini zaidi siku zijazo, huenda kupitia “Mfuko wa Urithi wa Zcash”.

---

## Hitimisho

CryptoNote imethibitisha kuwa mbinu imara na iliyojaribiwa sana kwa faragha ya on-chain. Ubunifu wake mwingi umeathiri mfumo mpana wa sarafu za faragha.

Baadhi ya watafiti wanaamini kwamba vipengele vya CryptoNote vinaweza hatimaye kuunganishwa na mabwawa ya faragha ya maarifa sifuri [zero-knowledge] yasiyohitaji uaminifu.

---

**Mfululizo Asili wa ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*Ukurasa huu ulikusanywa kutoka kwenye mfululizo asili wa Zero to Zero Knowledge kwa ajili ya wiki ya ZecHub.*
