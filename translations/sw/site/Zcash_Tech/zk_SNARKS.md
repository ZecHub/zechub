<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP & ZK-SNARKS

## TL;DR

- **ZK-SNARKs** = Zero-Maarifa Muhimu Non-Interactive hoja ya maarifa
- Wanaruhusu mtu mmoja ** kuthibitisha wanajua kitu fulani ** bila kufunua habari yenyewe
- Zcash hutumia ZK-SNARKs kuthibitisha shughuli ni halali (kiasi sahihi, unspent pembejeo) ** bila kufunua mtumaji, mpokeaji, au kiasi**
- "Succinct" ina maana uthibitisho ni ndogo na haraka kuthibitisha hata kwa taarifa tata
- bwawa Orchard inatumia Halo 2, ZK-SNARK mfumo na ** hakuna kuaminika kuanzisha required**

---

## Uthibitisho Ni Nini?

Uthibitisho ni msingi wa hesabu zote. uthibitisho ni madai au theorem wewe ni kujaribu kuthibitisha & mfululizo wa derivations alifanya kutangaza theorem imekuwa kuthibitishwa. kwa mfano. pembe zote katika pembe tatu jumla ya 180 ° inaweza kujitegemea checked na mtu yeyote (verifier).

** Uthibitisho ** 

Prov ---> hufanya madai ---> Verifier Chagua ---> Kubali / Kukataa 

(Wote prober na verifier ni algorithms)

Katika sayansi ya kompyuta neno kwa ajili ya uthibitisho ufanisi verifiable ni NP ushahidi. ushahidi huu mfupi inaweza kuthibitishwa katika polynomial wakati. wazo pana kuwa "Kuna ufumbuzi wa theorem & ni kupita juu ya kuthibitisha ili kuangalia ni"


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


Katika NP-lugha = masharti mawili lazima kushikilia: 

Ukamilifu: madai ya kweli yatakubaliwa na verifier (inaruhusu kuthibitisha waaminifu kufikia uthibitisho)

Usahihi: madai ya uwongo watakuwa na hakuna ushahidi (kwa wote cheating proving mkakati watakuwa hawawezi kuthibitisha usahihi wa madai sahihi).


### Maingiliano & Probabalistic Uthibitisho

** Maingiliano **: Badala ya kusoma tu uthibitisho, verifier inashirikiana na prover nyuma na mbele juu ya raundi kadhaa za ujumbe.

** Randomness **: maombi ya Verifier kwa prover ni randomized na prover lazima kuwa na uwezo wa kujibu kwa usahihi kwa kila mmoja. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


Kutumia mwingiliano na randomness pamoja inawezekana kuthibitisha madai kwa verifier kipofu katika Probabilistic Polynomial Time (PPT). 

Je, Interactive uthibitisho ufanisi kuthibitisha zaidi ya uthibitishaji NP?

NP uthibitisho dhidi ya IP uthibitishaji:

Taarifa ya NP IP
|--------------|-----------|--------|
NP: Ndiyo.
CO-NP hapana ndiyo.
#P: hapana. Ndiyo.
PSPACE: hapana ndiyo.


NP - Kuna ufumbuzi wa taarifa

CO-NP - Kuthibitisha hakuna ufumbuzi kwa taarifa

#P - Kuhesabu jinsi wengi ufumbuzi zipo kwa taarifa

PSPACE - Kuthibitisha mpito wa taarifa tofauti

### Ujuzi wa Zero ni nini?

What a verifier can compute after an interaction is identical to what they could prove prior. The interaction over multiple rounds between the prover & verifier has not increased the computional power of the verifier.

** Paradigm Simulation **

Jaribio hili lipo katika cryptography. Inawasilisha "Real View" & "Simulated View". 

Real View: historia zote iwezekanavyo ya mwingiliano kati ya Prover & Verifier (P, V)

Simulated View: Verifier simulates mwingiliano wote iwezekanavyo kati ya Prover & Verifier 

<a href="">
    <img width="850" height="397" alt="simulation1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

Polynomial-wakati wa kutofautisha hufanya jaribio la kuamua kama wao ni kuangalia katika mtazamo halisi au simulated na maombi sampuli kutoka wote mara kwa mara.

The two views are said to be "computationally indistinguishable" if for all distinguisger algorithms/strategies, even after receiving a polynomial number of samples from real or simulated, the probability is >1/2. 

**Zero-Maarifa hoja za maarifa**

Itifaki ya maingiliano (P, V) ni zero-ujuzi kama kuna simulator (algorithm) kama kwamba kwa kila probablity polynomial-wakati verifier (wakati theorem ni sahihi), uwezekano usambazaji kuamua halisi kutoka simulated mtazamo ni computationally indistinguishable. 

Maingiliano itifaki ni muhimu wakati kuna mmoja verifier. Mfano itakuwa mkaguzi wa kodi katika zero-ujuzi 'uthibitisho wa kodi' maombi.

## SNARK ni nini?

**Succinct Non-Interactive Hoja ya Maarifa**

Ufafanuzi mpana - uthibitisho mfupi kwamba taarifa ni ya kweli. uthibitishaji lazima iwe fupi na haraka kuthibitisha. Katika SNARKS ujumbe mmoja hutumwa kutoka Prover kwa Verifier. verifier kisha unaweza kuchagua kukubali au kukataa. 

mfano wa taarifa: "Najua ujumbe (m) kama kwamba SHA256(m) = 0"

Katika zk-SNARK ushahidi inaonyesha kitu chochote kuhusu ujumbe (m).

** Polynomials **: Jumla ya maneno yenye mara kwa mara (kama vile 1,2,3), variables (kama x,y,z), na exponents ya variables ( kama vile x2, y3). 

mfano: "3x2 + 8x + 17"

**Arithmetic Circuit**: A model for computing polynomials. More generally it can be defined as a Directed Acyclic Graph on which at each node of the graph an arithmetic operation is performed. The circuit consists of addition gates, multiplication gates and some constant gates. In the same way Boolean circuits carry bits in wires, Arithmetic circuits carry integers.


<a href="">
<img width="785" height="368" alt="circuit1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

Katika mfano huu, prover anataka kumshawishi verifier kwamba anajua ufumbuzi wa mzunguko arithmetic. 

** Mahusiano **: Kwa kufanya hivyo, prover kuweka maadili yote (binafsi na umma) kuhusishwa na mzunguko katika ahadi. ahadi kuficha pembejeo zao kwa kutumia kazi ambayo pato ni irreversible.

Sha256 ni mfano mmoja wa kazi ya hashing ambayo inaweza kutumika katika mpango wa ahadi.

After the prover commits to the values, the commitments are sent to verifier (being confident they are unable to uncover any of the original values). The prover is then able to show to the verifier knowledge of each of the values on the nodes of the graph. 

** Fiat-Shamir kubadilisha**

To make the protocol *non-interactive* the prover generates randomness (used for the hidden challenge) on behalf of the verifier using a cryptographic hash function. This is known as the random oracle. The prover can then send a single message to the verifier who can then check it is correct. 

Ili kuunda SNARK ambayo inaweza kutumika kwa nyaya za jumla vitu viwili vinahitajika:

Kazi ya ahadi mpango: inaruhusu committer kujitolea kwa polynomial na mfululizo mfupi ambayo inaweza kutumika na verifier kuthibitisha madai tathmini ya ahadi polynominal.

Polynomial maingiliano oracle: Verifier anauliza prover (algorithm) kufungua ahadi zote katika pointi mbalimbali ya uchaguzi wao kwa kutumia polynominal ahadi mpango & hundi utambulisho inashikilia kweli kati yao.

Mpangilio

Utaratibu wa kuanzisha husaidia verifier kwa muhtasari wa mzunguko na pato la vigezo vya umma. 

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

** Aina ya kabla ya usindikaji kuanzisha **:

Trusted Setup per circuit - Ni kukimbia mara moja kwa mzunguko. Je, ni maalum kwa mstari & randomness siri (Common Reference String) lazima kuwekwa siri + kuharibiwa. 

Kuweka compressed katika njia hii ina maana prover uaminifu anaweza kuthibitisha taarifa za uongo. 

Trusted lakini Universal Setup - tu ina kukimbia kuaminiwa kuanzisha mara moja na ni uwezo wa kisha deterministically preprocess nyaya nyingi. 

Uwazi Setup (No Trusted Setup) - preprocessing algorithm haina kutumia yoyote siri randomness wakati wote. 


** Aina ya SNARK ushahidi constructions **:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Inahitaji Trusted Setup lakini ina uthibitisho mfupi sana ambayo inaweza kuthibitishwa haraka.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/ [Plonk](https://cryptocurrencywiki.org/PLONK): Universal Trusted Kuweka.

[MNYAMA](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Hakuna Trusted Setup lakini kuzalisha uthibitisho kidogo zaidi au inaweza kuchukua muda mrefu kwa ajili ya kuthibitisha kukimbia. 

SNARKS ni muhimu wakati verifiers nyingi zinahitajika kama vile blockchain kama Zcash au zk-Rollup kama vile [Aztec](https://docs.aztec.network) hivyo kwamba mbalimbali kuthibitisha nodes hawana kuingiliana juu ya raundi kadhaa na kila uthibitisho. 

## Jinsi ni zk-SNARK ya kutekelezwa katika Zcash?

Kwa ujumla zero-ujuzi uthibitisho ni chombo cha kutekeleza tabia ya uaminifu katika itifaki bila kufunua taarifa yoyote. 

Zcash is a public blockchain that facilitates private transactions. zk-SNARK's are used to prove that a private transaction is valid within the network consensus rules without revealing any other details about the transaction. 

[Video ya Kueleza]](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Katika hotuba hii Ariel Gabizon hutoa maelezo ya Zcash Note Commitment Tree, Blind Polynomial Evaluation & Homomorphically Hidden Challenges na jinsi zinavyotekelezwa kwenye mtandao. 

Soma kitabu [Halo2](https://zcash.github.io/halo2/index.html) kwa habari zaidi.

## Nyingine Zero-Ujuzi Maombi 

zk-SNARKS kutoa faida kadhaa katika aina mbalimbali ya maombi tofauti.

** Scalability **: Hii ni mafanikio kwa 'Outsourcing Computation'. Hakuna mahitaji madhubuti kwa zero-maarifa kwa mlolongo L1 kuthibitisha kazi ya huduma nje ya mlolango. shughuli si lazima binafsi juu ya zk-EVM.

Faida ya uthibitisho msingi Rollup (zk-Rollup) huduma ni mchakato kundi la mamia / maelfu ya shughuli & L1 ni uwezo wa kuthibitisha ushahidi succinct kwamba shughuli zote walikuwa kusindika kwa usahihi, kupanua mtandao shughuli throughput na sababu ya 100 au 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


** Interoperability **: Hii ni mafanikio juu ya zk-Bridge na 'kufunga' mali kwenye chanzo cha mnyororo na kuthibitisha kwa mlolongo wa lengo mali kuwa imefungwa (uthibitisho wa makubaliano).

**Utii**: Miradi kama vile [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) ni uwezo wa kuthibitisha kwamba shughuli binafsi ni kwa mujibu wa sheria za benki ya ndani bila kufichua maelezo ya shughuli. 

**Kupambana na habari potofu**: Miongoni mwa mifano kadhaa nje ya blockchain & cryptocurrency, matumizi ya kizazi cha uthibitisho kwenye picha ambazo zimeshughulikiwa na vyombo vya habari & vyombo vya kijamii ili kuwezesha watazamaji kuthibitisha chanzo cha picha na shughuli zote zilizofanywa juu yake. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Kujifunza Zaidi: 

[Zero-Maarifa Bibliography - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK's na Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 na SNARKs bila Confident Setups - Sean Bowe juu ya maabara Dystopia](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Zero maarifa uthibitisho na Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Interactive Zero-Ujuzi uthibitisho - Chainlink makala](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Mada ya 1: Utangulizi na Historia ya ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Ufafanuzi Rahisi wa Circuits Arithmetic - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Uwezekano wa kupanuka ni wa kuchosha, faragha imekufa: ZK-Proofs, Ni nzuri kwa nini?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Kurasa Zinazohusiana

- [Vidimbwi vya Kuhifadhiwa](/using-zcash/shielded-pools)  Jinsi ZK-SNARKs ni kutumika katika hifadhi Zcash thamani
- [Halo](/zcash-tech/halo)  Zcash's ZK-SNARK mfumo ambao unaondoa kuaminika mipangilio
- [Post Quantum Usalama katika Zcash](/zcash-tech/post-quantum-security) - Jinsi ya baadaye quantum hatari kuhusiana na Zcash cryptography
- [Zcash Shielded Mali](/zcash-tech/zcash-shielded-assets)  ZSAs kujengwa juu ya teknolojia ZK-SNARK
- [Ni nini ZEC na Zcash](/start-here/what-is-zec-and-zcash)  Utangulizi wa Zcash na mfano wake wa faragha
- [Usiri kama Kanuni ya Msingi](/privacy/privacy-as-a-core-principle)  Kwa nini faragha ya kifedha ni muhimu
