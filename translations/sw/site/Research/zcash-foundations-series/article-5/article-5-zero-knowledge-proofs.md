# Uthibitisho wa Ujuzi-Zero: Kuthibitisha Wewe ni haki bila kusema kwa nini
##### Utafiti wa awali kutoka [Annkkitaaa](https://github.com/Annkkitaaa)

! [ alt maandishi](image-23.png)

### Pazia ambalo huruhusu ulimwengu kuthibitisha kile ambacho hakiwezi kamwe kuona

> **Series:** *Zcash kutoka Kanuni za Kwanza* . **Kifungu cha 5 . Zero-Ujuzi Ushuhuda**
> Sisi kuteka juu ya kila makala ya awali (maeneo ya mwisho, curves, ahadi, Merkle miti), lakini kila wazo ni alikumbuka kama tunahitaji.
> ** Nini wewe kuondoka na: ** intuitive, uelewa sahihi wa nini zero-maarifa ushahidi ni, dhamana tatu hufanya, jinsi kauli arbitrary kupata kuthibitishwa, na nini nguvu Zcash ya Sapling na Orchard.

Hii ndiyo makala ambayo mfululizo mzima umekuwa ukielekea.](article-0-shielded-transaction.md) onward we kept saying a payment is validated "behind a curtain," proven correct while revealing nothing. A zero-knowledge proof is that curtain. It's the piece that finally resolves the paradox we opened with: *how can the public verify a transaction it isn't allowed to see?*

---

## 1. Kwa nini unapaswa kuhangaikia jambo hilo?

Kumbuka utata katika moyo wa Zcash:

- blockchain ni kuaminika kwa sababu ni ** umma verifiable **.
- Malipo ya Zcash ni ** binafsi kabisa **: kiasi, mtumaji, mpokeaji, yote yaliyofichwa.

Hii inaonekana kuhusisha kila mmoja. uthibitisho inaonekana * inahitaji * kuangalia. faragha * inakataza * kutafuta. kama huwezi kupatanisha yao, huwezi kuwa na fedha binafsi kwamba mtu yeyote matumaini.

A ** zero-maarifa ushahidi (ZKP) ** ni upatanisho. Inaruhusu ** prover ** kumshawishi ** verifier ** kwamba taarifa ni kweli ** bila kufunua chochote zaidi ya ukweli kwamba ni kweli.** Hakuna kiasi. Hakuna vitambulisho. Hakuna kumbuka. Tu: * "kila kitu hapa hutii sheria. "* Hebu kujenga intuition kabla ya mashine yoyote.

---

## 2. Intuition: uthibitisho tatu wa kila siku

Uthibitisho unajua password, bila kusema ni.** Tovuti inaweza kuthibitisha unajua nenosiri lako kwa kuangalia wewe kufungua kitu ambacho tu password kufungua, kamwe kuona password yenyewe. Unaweza kuthibitisha * maarifa * bila * ufunuo *.

**The colour-blind friend and two balls.** You hold a red ball and a green ball that look identical to your colour-blind friend. You want to convince him they're *different colours* without telling him which is which. He hides both behind his back, optionally swaps them, and shows you one. You say whether he swapped. If the balls really differ, you're always right. If they were identical, you'd be guessing, right only half the time. After 20 rounds, your unbroken streak convinces him they differ, yet he never learns which ball is red. **He's convinced of a fact while learning nothing else.** That is zero knowledge in miniature.

**The cave.** A ring-shaped cave has a magic door at the back that opens only with a secret word. You claim to know the word. To prove it without revealing it: a verifier waits outside while you walk in and picks the left or right passage at random. The verifier then shouts which side they want you to come *out* from. If you really know the Word, you can always comply (you can open the door to change sides if needed). If you're bluffing, you may only come out the right side by luck, 50/50 each round. Repeat 20 times and a bluffer's odds of surviving are less than one in a million.

Hadithi hiyo ya pango inaonyesha kwa utulivu dhamana tatu ambazo kila uthibitisho wa ujuzi wa sifuri lazima ufanye.

---

## 3. Dhamana tatu

! [ alt maandishi](image-24.png)

Dhamana katika hadithi ya pango katika Zcash
|---|---|---|
** Ukamilifu **. Kama unajua neno, wewe daima kuondoka upande wa kulia. Transaction halali daima inazalisha ushahidi kukubalika.
** Usawa **. bluffer ni hawakupata na uwezekano mkubwa. shughuli ya udanganyifu (fedha bandia, mara mbili matumizi) hawezi kuzalisha ushahidi kukubalika.
Mtandao kamwe hujifunza kiasi, anwani, au ambayo kumbuka.

Kama yoyote ya haya inashindwa, mfumo kuvunja: hakuna ukamilifu na watumiaji waaminifu kupata kukataliwa; hakuna soundness na forgers kuchapisha fedha; hakuna sifuri-ujuzi na faragha evaporates.

---

## 4. Kutoka pango hadi * taarifa yoyote: mizunguko na mashahidi

Pango inathibitisha ukweli mmoja cute. Zcash inahitaji kuthibitisha taarifa tajiri: * "Najua noti unspent katika mti, mimi nina mamlaka ya kutumia, nullifier yake ni mahesabu kwa usahihi, na pembejeo yangu sawa matokeo yangu". * Jinsi gani sisi kupata kutoka mipira na mapango kwa kuwa?

Daraja ni wazo ambalo linaunganisha mfululizo huu wote pamoja:

> ** Taarifa yoyote unaweza kuthibitisha na hesabu inaweza kuandikwa upya kama mzunguko hisabati:** mtandao wa kuongeza na kuzidisha juu ya uwanja wa mwisho (Kifungu cha 1).

Fikiria mzunguko kama orodha ya vikwazo arithmetic kwamba ni * wote kuridhika tu kama taarifa ni kweli.* pembejeo binafsi kwamba kufanya kila kitu kuangalia nje, kumbuka yako, ufunguo wako, njia Merkle, ni kuitwa ** shahidi.**

! [ alt maandishi](image-25.png)

This is why we spent Article 1 on finite fields and Article 3 on ZK-friendly hashes: the circuit speaks field arithmetic, so every operation inside the statement (including hashing and the Merkle climb of Article 4) has to be expressed that way. The cheaper each operation is to express, the smaller and faster the proof.

---

## 5. Kufanya ni vitendo: yasiyo ya maingiliano na mafupi

Pango alihitaji raundi nyingi za kurudi na kurudi. Hiyo si vitendo kwa blockchain, ambapo uthibitisho lazima posted mara moja na checked na kila mtu, milele. Upgrades mbili kurekebisha hii.

**Non-interactive (Fiat-Shamir wazo).** Badala ya kuishi verifier shouting random changamoto, prover inazalisha "challenges random" wenyewe kwa *hashing* yao mwenyewe ushahidi-hivi. Kwa sababu hash nzuri ni unpredictable (Kifungu cha 3), prover hawezi kupika changamoto katika neema yao. mazungumzo chatty collapses katika ** moja ya kujitegemea zilizomo uthibitisho ** mtu yeyote anaweza kuangalia baadaye, bila mwingiliano.

**Succinct.** Mifumo bora kufanya ushahidi **ndogo na haraka kuthibitisha, bila kujali jinsi kubwa kauli ni.** Hii ni kweli kushangaza sehemu.

> A Groth16 uthibitisho (mfumo Sapling anatumia) ni takribani ** 192 baiti ** na kuthibitisha katika milliseconds, * kama taarifa inathibitisha ni ndogo au kubwa. * Baiti mia chache wanaweza kuthibitisha mahesabu kuhusisha maelfu mengi ya vikwazo.

Weka hayo pamoja na utapata kifupi utakachoona kila mahali:

> **zk-SNARK** = **z**zero-k**knowledge **S**uccinct **N**on-interactive **AR**argument ya **K**knows. Zero-knowledg (hafunui chochote), succinct (ndogo na haraka), non-interactive (pigo moja), hoja ya maarifa (mtoaji kweli * anajua * shahidi halali).

---

## 6. Tatizo moja: kuaminiana

Hakuna chakula cha mchana bure. wengi SNARKs haja ya mara moja ** kuanzisha ** ambayo inazalisha vigezo umma kwa ajili ya mzunguko. kuanzisha inazalishwa siri randomness kama byproduct, na siri hiyo lazima ** kuharibiwa.** Kama mtu yeyote kushikiliwa, wangeweza bandia ushahidi, yaani, ** bandia fedha ** (ingawa, muhimu, bado * hawakuweza * kuvunja faragha).

Siri hii iliyobaki ina jina la utani ** taka zenye sumu. * Ili kuiondoa salama, Zcash iliendesha sherehe za vyama vingi ambapo washiriki wengi huru kila mmoja alichangia nasibu; kwa muda mrefu kama * hata moja * iliharibu kipande chao kwa uaminifu, taka yenye sumu haiwezi kupatikana.

! [ alt maandishi](image-26.png)

Mifumo mpya kuondoa mahitaji haya kabisa, ambayo ni moja ya sababu kubwa Zcash maendeleo mfumo wake ushahidi baada ya muda.

---

## 7. Ambapo hii anaishi katika Zcash

Design. Proof system. Trusted setup? Built on.
|---|---|---|---|
**Sprout** (mwanzoni) mapema zk-SNARK. Ndiyo, sherehe ya awali.
** Sapling ** ** Groth16 ** ** Ndiyo (ya pande nyingi "Nguvu za Tau" + Sapling sherehe) ** BLS12-381 ** (Kifungu 2)
**Orchard** (sasa) **Halo 2** **No Trusted Setup** **Pallas / Vesta** (Kifungu cha 2)

The march from Sprout to Sapling to Orchard is largely a story about proofs getting smaller, faster, and shedding the trusted setup. **Halo 2**, used by Orchard, needs no ceremony at all and is built to support *recursion* (proofs that verify other proofs), which is why Orchard uses the Pallas/Vesta **cycle** of curves from Article 2: each curve is tuned to verify proofs written over the other.

Hii hufunga kitanzi kubwa kutoka Kifungu 0. "nyuma ya pazia" uchawi ni **zk-SNARK**: inathibitisha shughuli yako inakidhi mzunguko wa hesabu encoding sheria zote, wakati akifunua kitu lakini moja kidogo "halali".

---

## 8. Mtu anayetoa taarifa kwa uaminifu

Zero-knowledge proofs are a deep field and we stayed at intuition level on purpose. We didn't define the precise probability bounds in soundness, the exact form of an arithmetic circuit (R1CS, PLONKish, and so on), how polynomials and commitments turn a circuit into a short proof, or the real internals of Groth16 and Halo 2. The cave is an *interactive* proof; production systems are non-interactive and far more intricate. None of that changes the core: prove a circuit is satisfied by a secret witness, completely, soundly, and revealing nothing. The machinery is a whole series of its own.

---

## 9. Muhtasari

- Uthibitisho wa ujuzi wa sifuri huruhusu kuthibitisha kumshawishi mkaguzi kuwa taarifa ni kweli wakati haidhihirishi kitu kingine chochote, kutatua utata wa kuthibitisha dhidi ya faragha.
- Ni lazima kukidhi dhamana tatu: ** ukamilifu ** (taarifa ya kweli kushawishi), ** soundness ** (matamshi ya uongo hawezi), na ** sifuri-ujuzi ** (verifier anajifunza tu "ni kweli").
- Taarifa ya hiari kuwa ** arithmetic circuits ** juu ya uwanja wa mwisho; siri pembejeo kwamba kuridhisha mzunguko ni ** shahidi ** Hii ni kwa nini mashamba ya mwisho na ZK-kirafiki hashes mattered.
- ** Fiat-Shamir ** hufanya uthibitisho ** yasiyo ya maingiliano ** (pigo moja); mifumo bora pia ni ** succinct ** (uthibitisho wa Groth16 ni kuhusu ** 192 bytes ** na inathibitisha katika milliseconds bila kujali ukubwa wa taarifa). Pamoja: **zk-SNARK **.
- Baadhi SNARKs haja ya ** kuaminiwa kuanzisha ** ambao mabaki ** taka sumu ** lazima kuharibiwa (kupitia sherehe mbalimbali chama); maelewano ingekuwa kuruhusu forging fedha lakini ** si ** kuvunja faragha.
- **Sapling** hutumia **Groth16** (mpangilio wa kuaminika, BLS12-381); **Orchard** hutumika **Halo 2** (hakuna mpangilio wa kuaminiwa, Pallas / Vesta, rafiki wa kurudia).

---

## Orodha ya maneno

Neno. Maana ya Kiingereza ya kawaida.
|---|---|
** Ushahidi wa ujuzi wa sifuri**. Kushawishi mtu taarifa ni kweli wakati akifunua kitu kingine chochote.
** prover / verifier **: Mtu anayefanya uthibitisho / mtu anayehakikisha.
** Ukamilifu ** Taarifa za kweli daima zinakubaliwa (kutoka kwa mhakiki mwaminifu)
Maelezo ya uongo yanakataliwa (walaghai hawawezi kushinda isipokuwa kwa bahati)
**Shahidi**. Maelezo ya siri ambayo hufanya taarifa kweli.
** mzunguko Arithmetic **. Taarifa rewritten kama kuongeza na kuzidisha juu ya uwanja wa mwisho.
** Non-interactive (Fiat-Shamir) ** One-shots ushahidi hakuna haja ya kuishi nyuma na mbele.
**Succinct** The ushahidi ni ndogo na haraka kuthibitisha bila kujali ukubwa wa taarifa.
**zk-SNARK** Zero-maarifa Muhtasari Non-interactive hoja ya maarifa.
** Trusted kuanzisha / sumu taka ** One-time parameter kizazi ambayo mabaki siri lazima kuharibiwa.

---

## FAQ

** Ikiwa uthibitisho haufunui chochote, ni jinsi gani kuuchunguza kunaweza kumaanisha chochote? **
Kwa sababu hesabu imepangwa ili *tu* shahidi halisi, halali anaweza kutoa uthibitisho wa kupitisha. Kupitisha hundi yenyewe ni ushahidi, hakuna ufunuo unaohitajika.

** Je, mtu anaweza bandia ushahidi? **
Uthabiti hufanya hii kuwa haiwezekani isipokuwa SNARK ambayo uanzishaji wake wa kuaminika ulihifadhiwa taka zenye sumu; hiyo ndiyo sababu sherehe za kuiharibu zina umuhimu.

** Je, kuvunjika Configuration Trusted kuvuja data yangu binafsi? **
La. Itaruhusu mshambuliaji bandia * mpya * fedha, lakini haina ** si ** yatangaza kiasi, anwani, au noti. faragha na soundness ni dhamana tofauti.

**Kwa nini Zcash ilibadilisha mifumo ya uthibitisho kwa muda?**
Kupata ndogo, uthibitisho kasi na, na Halo 2, kuondoa kuaminika kuanzisha kabisa na kuwezesha recursion.

---

### Jaribu ufahamu wako wa ndani

Katika pango, kwa nini ni muhimu kwamba verifier huchagua upande wa kuondoka * baada ya * prover tayari kutembea ndani, badala ya kutangaza kabla? * Jibu chini. *

<details><summary>Answer</summary>

If the verifier announced the side first, a bluffer who doesn't know the word could simply walk into that side from the start and stroll back out, never needing the door. Choosing *after* the prover commits to a passage forces a bluffer to rely on luck (50/50 per round), which is what makes repeated rounds convincing. This "commit first, then be challenged" ordering is exactly what Fiat-Shamir preserves by deriving the challenge from a hash of the prover's already-committed proof.
</details>

---

### Ni nini kinachofuata

** Kifungu cha 6 . itifaki Shielded, mwisho hadi mwisho: ** finale. sisi kuchukua kila kipande, maelezo, ahadi, mti wa dhamana maelezo, nullifiers, thamani ya usawa, na zero-maarifa ushahidi, na kukusanyika Zcash kamili Shielded manunuzi, kufunga kila kitanzi moja kufunguliwa nyuma katika Kifungu 0.

* Sehemu ya * Zcash kutoka Kanuni za Kwanza * mfululizo kwa [ZecHub](https://zechub.org). Leseni CC BY-SA 4.0.*
