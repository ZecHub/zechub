# Itifaki Iliyohifadhiwa, Mwisho kwa Mwisho
##### Utafiti wa awali kutoka [Annkkitaaa](https://github.com/Annkkitaaa)

! [ alt maandishi](image-27.png)

### Kuunganisha kila kipande katika moja ya kibinafsi Zcash shughuli

> **Series:** *Zcash kutoka Kanuni za Kwanza* . **Kifungu cha 6.
> Wasikilizaji: wageni ambao wamesoma vifungu vya 0 hadi 5.
> ** Nini wewe kuondoka na: ** kamili, sahihi mfano wa akili ya ulinzi Zcash shughuli, na kila dhana kutoka mfululizo katika nafasi yake sahihi, Na kila kitanzi kutoka Kifungu 0 kufungwa.

Tulianza, katika [Kifungu cha 0](article-0-shielded-transaction.md), with a paradox and a story about sealed envelopes on a public board. Then we spent five articles building the parts: finite fields, elliptic curves, commitments, Merkle trees, and zero-knowledge proofs. Now we put them together and watch a real private payment work, start to finish.

---

## 1. Kwa nini unapaswa kuhangaikia jambo hilo?

Kila mmoja, kila kipande umejifunza ni wajanja. Lakini *uchawi* wa Zcash uko katika jinsi wanavyoingiliana. Nullifier peke yake haitoi faragha. Kujitolea peke yake hakuzuii udanganyifu. Uthibitisho peke yake hauonyeshi chochote muhimu. Ni **mkusanyiko** ambao hubadilisha sehemu tano kuwa pesa ambazo ni za kibinafsi na za kuaminika wakati huo huo.

Makala hii ni mkutano. Mwisho, hukumu *"mtandao kuthibitisha shughuli haiwezi kuona"* kujisikia si kama paradox lakini kama matokeo ya wazi ya sehemu tayari kuelewa.

---

## 2. Mchoro uliokusanywa tena

Hapa ni mfululizo mzima katika ukurasa mmoja, iliyowekwa ramani kutoka hadithi ya Kifungu 0 kwa mashine halisi.

Makala 0 kipengele cha hadithi sehemu halisi iliyojengwa kutoka
|---|---|---|
Pesa ndani ya bahasha. **Kumbuka** (thamani, mpokeaji, randomness) encoded kama mambo uwanja (Art 1)
Envelope iliyofungwa na isiyo wazi. **Note commitment** Pedersen / Sinsemilla commitment (Art 2, 3)
Bodi ya umma ** Kumbuka mti wa kujitolea ** (anchor = mizizi yake) Mti wa Merkle unaoongezeka (Sanaa 4)
ishara tupu ** Nullifier ** ZK-kirafiki hash ya kumbuka + siri muhimu (Art 2, 3)
"Pesa ndani ni sawa na pesa nje" ** dhamira ya thamani + usawa kuangalia ** homomorphic Pedersen ahadi (Art 2, 3)
Zk-SNARK juu ya mzunguko wa hesabu (Art 5)
"Ni wewe tu unayeweza kusoma bahasha yako" **Ujumbe uliofichwa + funguo za kutazama** encryption + uongozi wa ufunguo (makala hii)

---

## 3. Funguo zinatoka wapi?

Kila kitu mtumiaji anaweza kufanya mtiririko kutoka siri moja, ** kutumia ufunguo **, kwa njia ya uongozi moja ya njia moja (kila mshale ni derivation irreversible, ukarimu wa mitego katika vifungu 2 na 3):

! [ alt maandishi](image-32.png)

Mambo mawili yenye kustahili kuangaliwa, yote mawili matokeo ya makala za awali:

- Kugawanyika hukuwezesha kutoa ** ufunguo wa kutazama ** (sema, kwa mkaguzi) ambayo inaonyesha shughuli zako ** bila ** kutoa nguvu ya kutumia. Faragha ni ya kuchagua, sio yote-au-hakuna.
- Kila derivation ni ** one-way **: kushikilia ufunguo viewing kamwe inaruhusu mtu yeyote kupata ufunguzi wa matumizi, hasa elliptic-curve mtego kutoka Ibara ya 2 kufanya kazi yake.

---

## 4. Kutumia noti: madai manne

Kutumia noti binafsi, lazima kushawishi mtandao wa mambo manne mara moja ** bila kufunua noti, thamani yake, nafasi yake, au utambulisho wako.** Kila madai ni kuridhika na sehemu ambayo tayari kujua.

! [ alt maandishi](image-31.png)

Uthibitisho hufunua ** hakuna ** ya ukweli wa msingi (ambayo kumbuka, ambaye muhimu, nini thamani). Inaonyesha tu kwamba * madai yote manne ni kweli.* Hiyo ni hila nzima ya Zcash iliyohifadhiwa, iliyoonyeshwa kwenye mchoro mmoja.

---

## 5. Mbinu ya kusawazisha thamani (malipo tuliyohifadhi)

Nyuma katika vifungu 2 na 3 sisi alibainisha kuwa ahadi Pedersen ** kuongeza up **: ahadi ya `v_1` pamoja na ahadi ya `v_2` ni ahadi ya `v_1 + v_2`Hapa ni ambapo kwamba hulipa.

Kila kuingia na pato noti hubeba ** dhamana ya thamani **: ahadi Pedersen `v.G + r.H` Ambayo huficha kiasi chake. `v`Kwa sababu hizi kuongeza, mtandao unaweza mahesabu:

```
(sum of input value commitments) − (sum of output value commitments)
```

Kama shughuli ni uwiano (hakuna fedha kuundwa au kuharibiwa), `v` sehemu kufuta kabisa, kuacha tu ahadi ya ** thamani sifuri **, kipofu na randomness mabaki. mtumaji inathibitisha wanajua kwamba randomness leftover kwa kuzalisha saini ndogo aitwaye ** kusaini kisheria.** sahihi halali kisheria inawezekana tu wakati maadili kweli usawa, ** bado si kiasi moja ilifunuliwa.**

> Hii ni mfano safi katika mfululizo mzima wa * kwa nini * sisi zinahitajika homomorphic, ahadi curve-msingi. "fedha katika sawa fedha nje" utawala ni kutekelezwa na ** kuongeza bahasha muhuri pamoja ** na kuangalia mihuri matokeo kwa sifuri.

---

## 6. Mkataba kamili, unatazamwa mwisho hadi mwisho

Hebu kukusanyika Alice kulipa Bob. Tutatumia Sapling ya wazi "kutumia upande / pato upande" muundo kama mfano wa kufundisha.

** Shughuli ya ulinzi huunganisha aina mbili za maelezo: **

Gharama maelezo (matumizi ya kumbuka) pato maelezo (kuunda kumbuka).
|---|---|
-- dhamira ya thamani ya uingizaji -- dhamiri ya thamani wa pato.
❖ Kiunzi cha mhimili kinachothibitisha dhidi ya (mzizi wa mti) ❖ ahadi mpya ya noti (karatasi mpya)
---- na **nullifier** ya noti alitumia ---- ufunguo ephemeral kwa ajili ya encryption.
-- ufunguo wa umma uliobadilishwa kwa nasibu + saini ya idhini ya matumizi -- -- barua iliyofichwa (nakala ya siri kwa mpokeaji)
∙∙∙k-SNARK kuthibitisha madai manne ∙ a-k- SNARC kuthibitisha matokeo ni vizuri umbo ∙

Pamoja na moja ** kisheria saini ** juu ya mfuko mzima, kutekeleza thamani ya usawa (Sehemu ya 5).

! [ alt maandishi](image-30.png)

Trace the privacy: the network checked the anchor, checked the nullifier was fresh, verified the proof, and verified balance. It accepted a valid payment **having learned no amount, no address, and not which note was spent.** Meanwhile the spent note's **nullifier** (its death) and Bob's new **commitment** (his note's birth) sit in two different public structures with no visible link between them, the severed link from Article 0.

---

## 7. Kufunga kila kitanzi kutoka Kifungu 0

Makala ya 0 kwa makusudi kufungua maswali. Hapa ni wote, imefungwa.

◯ Mzunguko uliofunguliwa katika Kifungu cha 0 ◯ Kufungwa na ◯
|---|---|
Jinsi gani bahasha iliyofungwa lakini haiwezi kupigwa iwezekanavyo? Ahadi: kujificha kutoka kwa hali ya kutokuwa na mpango, kuunganisha kutoka kwa upinzani wa mgongano / mlango wa shimo la curve (Art 3)
Funguo na mapishi ya siri hutoka wapi?  Arithmetic ya uwanja na elliptic-curve scalar multiplication (Art 1, 2) 
"Bodi" ni nini hasa? Mti wa Merkle unaozidi wa ahadi za maelezo; mzizi wake ni nanga (Sanaa ya 4)
Kwa nini haiwezi ishara tupu kuwa wanaohusishwa na bahasha yake? Nullifier ni hash keyed kuhifadhiwa katika seti tofauti kutoka ahadi (Art 2, 3, 4)
Jinsi gani unaweza kuthibitisha uhalali bila kufunua chochote? A zk-SNARK juu ya mzunguko arithmetic encoding madai yote manne (Art 5)
 Mpokeaji anajuaje kwamba wamelipwa?  Barua imefichwa kwa anwani yake; wanajaribu kuifungua kwa kutumia ufunguo wa kutazama (makala hii) 
Jinsi ni "fedha katika = fedha nje" kutekelezwa binafsi? Homomorphic thamani ahadi + saini ya kisheria (Sec 5)

Tofauti kutoka ukurasa wa kwanza, * kuthibitisha kile huwezi kuona *, sasa ni kutatuliwa kabisa. Mtandao kuthibitisha ** madai kuhusu data siri **, kamwe data yenyewe.

---

## 8. Sapling vs Orchard, in one breath

Tulifundisha kwa muundo wa Sapling kwa sababu mgawanyiko wake ni wazi zaidi. Ubunifu wa sasa, ** Orchard **, unasafisha badala ya kuchukua nafasi ya mawazo haya:

| | **Sapling** | **Orchard** |
|---|---|---|
▪ Kitengo cha shughuli ▪ maelezo tofauti ya ** Gharama ** na ** Matokeo ** ** vitendo vya umoja ** (kila moja hutumia + pato moja)
Mfumo wa uthibitisho Groth16 (mpangilio wa kuaminika) Halo 2 (hakuna muundo wa kuaminiwa)
Kurves BLS12-381 + Jubjub Pallas / Vesta (Pasta)
Kujitolea hash Pedersen Sinsemilla

Kila dhana katika makala hii hubeba moja kwa moja; Orchard hasa bundles kutumia-na-output pamoja na swaps katika mfumo ushahidi bila sherehe. nguzo tano ni unchanged.

---

## 9. Mtu anayetoa taarifa kwa unyoofu

This is the most complete picture in the series, but still a model. We compressed the exact field encodings of a note, the precise key-derivation formulas, the re-randomization of spend keys, diversified addresses, memo fields, fee handling, the difference between value commitments and note commitments in full detail, and the precise role of each signature. We also presented one canonical flow; real transactions can carry many spends and outputs at once and may mix transparent and shielded parts. The authoritative source is the Zcash Protocol Specification. What you now hold is the correct shape; the specification fills in every measurement.

---

## 10. Muhtasari

- shughuli Shielded interlocks wote sehemu tano: ** kumbuka ** (thamani), ** ahadi yake ** katika ** kumbukeni mti ahadi **, ** annuller ** ili kuzuia matumizi mara mbili, ** thamani ahadi ** kwa ajili ya usawa, na **zk-SNARK ** kuunganisha yote pamoja.
- Gharama inathibitisha madai manne kwa wakati mmoja, noti ipo, wewe ni mamlaka, annuller yake ni sahihi, na thamani mizani, katika ujuzi sifuri, kufunua hakuna ukweli wa msingi.
- **Usawa wa thamani** ni kutekelezwa na **kuongeza ahadi homomorphic** na kuangalia wao muhuri kwa sifuri, kupitia **kushikamana saini**, bila kiasi disclosed.
- Uwezo wa mtumiaji hutoka kwa ufunguo mmoja wa kutumia kupitia uongozi wa njia moja, kuwezesha kufungua ufunguoo ambao hufunua bila kutoa nguvu ya kutumia.
- Mtandao huo **huhakikisha madai kuhusu data zilizofichwa**, na kutatua utata wa kuthibitisha-dhidi ya faragha kutoka Kifungu cha 0.
- ** Orchard ** refines ** Sapling ** (Unified Vitendo, Halo 2 bila kuaminiwa kuanzisha, curves Pasta, Sinsemilla) bila kubadilisha nguzo tano.

---

## Orodha ya maneno

Neno. Maana ya Kiingereza ya kawaida.
|---|---|
** ufunguo wa matumizi ** siri moja ya mizizi ambayo funguo zote za mtumiaji zinatokana.
** Kuangalia ufunguo ** Inaonyesha shughuli yako kwa mmiliki bila kuruhusu yao kutumia.
Sehemu ya tx ambayo hutumia noti (nullifier, anchor, proof)
Sehemu ya tx ambayo inajenga kumbuka (kujitolea, ciphertext, uthibitisho)
** kitendo (Orchard) ** kitengo umoja kufanya moja ya matumizi na moja ya pato pamoja.
** dhamana thamani ** homomorphic Pedersen dhamana kwa kiasi.
Saini inayoonyesha usawa wa thamani bila kuzifunua.
** Anchor ** Mzizi mti kutumia inathibitisha uanachama dhidi ya
** majaribio decryption ** mpokeaji kupima ahadi mpya ya kupata maelezo maana kwa ajili yao.

---

## FAQ

**Je, mtandao umewahi kuona kiasi au ni nani aliyemlipa nani?**
La. Inathibitisha uthibitisho, freshness ya annuller, nanga, na saini ya kisheria. Maadili yote binafsi kubaki siri.

** Ni nini kinachonizuia kutumia noti mara mbili? **
Nullifier. matumizi ya kuchapisha ni; mtandao inakatalia mbali yoyote nullifier tayari katika seti nultifier. kumbuka sawa daima inazalisha nullifer sawa.

** Jinsi gani unaweza salio kuchunguzwa kama kiasi ni siri? **
Value commitments add up homomorphically; a balanced transaction's commitments cancel to a commitment of zero, which the binding signature proves.

Je, ninaweza kuthibitisha shughuli zangu kwa mkaguzi bila kutoa udhibiti?
Ndio, toa ufunguo wa kuangalia, unafunua shughuli zako zilizofichwa lakini hauwezi kuidhinisha matumizi, shukrani kwa uongozi wa ufunguzi wa njia moja.

**Je, Sapling imepitwa na wakati sasa Orchard ipo?**
Wote wawili wamekuwepo kwenye mtandao; Orchard ni muundo wa sasa. Dhana zinashirikiwa, kwa hivyo kuelewa moja inakupa nyingine.

---

### Jaribu ufahamu wako wa ndani

A friend says: "Since the proof hides the amount, a thief could just claim their outputs are worth more than their inputs and print free money." Using Section 5, explain in two sentences why this fails. *(Answer below.)*

<details><summary>Answer</summary>

The amounts are hidden, but each is wrapped in a homomorphic value commitment, and the network adds all input commitments and subtracts all output commitments; if the hidden values didn't balance, the result would not seal to zero and **no valid binding signature could be produced.** The thief can hide *how much*, but cannot make unbalanced values pass the balance check, so printing free money is impossible without revealing nothing yet still being caught by the arithmetic.
</details>

---

### Mfululizo, kamili

Sasa umesafiri kutoka paradox moja hadi malipo kamili ya kibinafsi:

! [ alt maandishi](https://github.com/user-attachments/assets/cd8bbb40-57b8-4854-b9cf-97f2485d126a)


From here, the natural next arc goes deeper: the inner workings of Groth16 and Halo 2, trusted-setup ceremonies, the Sapling and Orchard circuits in detail, key derivation and diversified addresses, and the protocol's evolution across network upgrades. But the foundation is now in place, and every one of those topics has a home to attach to.

* Sehemu ya * Zcash kutoka Kanuni za Kwanza * mfululizo kwa [ZecHub](https://zechub.org). Leseni CC BY-SA 4.0.*
