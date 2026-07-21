<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Post-Quantum Usalama katika Zcash

## TL;DR

- Kompyuta za quantum ni hatari ya siku zijazo kwa sababu zinaweza kuvunja baadhi ya ufunguo wa umma unaotumiwa na blockchains leo.
- "Post-quantum" inamaanisha cryptography ambayo inafanya kazi kwenye kompyuta za kawaida lakini imeundwa kupinga mashambulizi kutoka kwa kompyuta za quantum za baadaye.
- Zcash si kikamilifu baada ya quantum leo.
- Shielded Zcash hupunguza kiasi cha data ya shughuli za umma ambazo washambuliaji wa baadaye wanaweza kusoma, lakini matumizi ya kulindwa sio sawa na upinzani kamili wa quantum.
- Zcash inaandaa kupitia utafiti, ZIPs, na mapendekezo ya kuboresha kama vile ZIP 2005 na Mradi wa Tachyon.
- Uhamiaji salama wa baada ya quantum lazima ulinde fedha, faragha, pochi, kubadilishana, na sheria za makubaliano kwa wakati mmoja.

## Kompyuta za Quantum Ni Nini?

Kompyuta ya kawaida huhifadhi habari kama bits. `0` or `1`.

Kompyuta ya quantum hutumia bits za quantum, zinazoitwa qubits. Qubits zinaweza kutumiwa na algorithms maalum ambazo husuluhisha matatizo fulani ya hesabu kwa kasi zaidi kuliko kompyuta za kawaida.

That does not mean a quantum computer is faster at everything. The risk is specific. Some cryptography depends on math problems that are very hard for normal computers but much easier for a large enough quantum computer.

Kwa blockchains, mfano muhimu zaidi ni cryptography ya ufunguo wa umma. Funguo za umma na saini hutumiwa kuthibitisha kuwa mtumiaji anaruhusiwa kutumia sarafu.

## Kwa Nini Blockchains Ni Muhimu

Blockchains kutumia cryptography kwa kazi kadhaa tofauti:

Chombo cha cryptographic. Kinachofanya. Athari ya Quantum.
| --- | --- | --- |
Mikataba ya digital kuthibitisha mmiliki mamlaka ya kutumia hatari kubwa kwa kawaida elliptic-curve mifumo
Hash kazi. Kujenga anwani, ahadi, miti Merkle, na changamoto. Hatari ya chini, lakini usalama pembezoni jambo.
Ushahidi zero-ujuzi kuthibitisha ulinzi shughuli ni halali bila kufunua maelezo inategemea mfumo wa ushahidi na dhana.
Mkataba muhimu. Husaidia pochi encrypt maelezo data kwa wapokeaji. Inahitaji ukaguzi makini chini ya mfano quantum tishio.

Kompyuta ya quantum yenye nguvu ya kutosha inaweza kuhatarisha mifumo mingi ya saini inayotumiwa leo, kutia ndani saini za mviringo wa elliptic. Hii ni muhimu kwa sababu saini ndiyo inayojulisha mtandao kwamba shughuli iliidhinishwa na ufunguo sahihi.

Hash kazi ni tofauti. algorithm Grover inaweza kuharakisha nguvu mbaya search, lakini haina kuvunja kazi hash katika njia moja kwa moja sawa. kiasi kikubwa cha usalama inaweza kusaidia.

## Post-Quantum Cryptography Ni Nini?

Post-quantum cryptography ni cryptographic iliyoundwa kubaki salama dhidi ya kompyuta zote mbili za kawaida na kompyuta za quantum za baadaye.

Haimaanishi kwamba cryptography inatumia kompyuta quantum. Ina maana mfumo ni msingi juu ya matatizo tofauti ngumu ya hisabati.

Mnamo 2024, NIST ilitoa viwango vya kwanza vya mwisho vya baada ya quantum:

- ** ML-KEM ** kwa msingi taasisi
- ** ML-DSA ** kwa saini digital
- **SLH-DSA** kwa hash-msingi saini digital

Viwango hivi ni hatua kubwa, lakini blockchain haiwezi tu kubadilishana algorithm moja kwa nyingine usiku mmoja. Kanuni za makubaliano, pochi, pochi za vifaa, saizi ya manunuzi, ada, na faragha zote zinapaswa kuzingatiwa.

## Jinsi Quantum Hatari Inavyoonekana On-Chain

Njia rahisi ya kufikiri juu ya hatari ni:

1. Mtumiaji inajenga jozi muhimu.
2. ufunguo wa umma au saini data inaweza kuonekana kwenye mnyororo.
3. Mshambuliaji quantum baadaye inaweza kuwa na uwezo wa kutumia kwamba nyenzo ya umma kujifunza ufunguo binafsi.
4. Ikiwa bado fedha zinadhibitiwa na ufunguo huo, huenda zikawa hatarini.

Blockchains uwazi kufichua mengi ya habari kwa kubuni. Anwani, kiasi, na shughuli viungo ni umma. Public muhimu vifaa pia inaweza kuwa inayoonekana wakati sarafu zinatumiwa.

Hii ni moja ya sababu anwani reuse ni madhara. Reuse inatoa waangalizi data zaidi kuungana leo na inatoa washambuliaji baadaye zaidi ya vifaa vya kihistoria kuchambua.

## Kuna Tofauti Gani Kuhusu Zcash?

Zcash inasaidia shughuli za uwazi na za ulinzi.

Uwazi Zcash kazi zaidi kama Bitcoin-style umma blockchain matumizi. anwani, kiasi, na mahusiano ya manunuzi ni kuonekana.

Shielded Zcash ni tofauti. shughuli Shielded kutumia zero-maarifa uthibitisho hivyo mtandao unaweza kuthibitisha kwamba shughuli anafuata sheria bila kufunua mtumaji, mpokeaji, au kiasi.

Hii inatoa Zcash faida muhimu faragha:

- Takwimu chache za shughuli zinachapishwa kwa kila mtu kuona.
- Watumiaji kuepuka kujenga malipo ya umma grafu wakati wao kukaa kulindwa.
- Watazamaji wa baadaye wana historia ndogo ya kifedha ya umma kuchambua.
- Selective kutoa taarifa inaweza kutokea kwa njia ya kuangalia funguo badala ya umma-kwa-default rekodi.

Lakini walinzi Zcash si moja kwa moja baada ya quantum. mifereji walinzi bado hutegemea dhana cryptographic. kutumia idhini, kumbuka ahadi, nullifiers, mifumo ya uthibitisho, encryption, na funguo mkoba wote wanahitaji ukaguzi makini.

Toleo fupi:

> Matumizi Shielded inapunguza mfiduo umma, lakini Zcash bado mahitaji ya uangalifu baada ya quantum upgrades.

## Zcash Hatari Ramani

Eneo. Ufafanuzi wa mwanzoni. Wasiwasi wa baada ya quantum.
| --- | --- | --- |
Anwani za uwazi anwani za umma na grafu ya manunuzi ya umma hatari sawa na blockchains nyingine uwazi.
◯ Kutumia idhini ◯ Uthibitisho kwamba mtumiaji anaruhusiwa kutumia ◯ Mipango ya saini inaweza kuhitaji kubadilishwa au kuhamishwa
❖ Maelezo yaliyohifadhiwa ❖ Rekodi za faragha za thamani ndani ya mabwawa yaliyohifadhi ❖ Baadhi ya vipengele vinaweza kuhitaji mawazo mapya au zana za kurejesha
zk-SNARKs. uthibitisho kwamba shughuli shielded ni halali. ushahidi-mfumo dhana haja ya ukaguzi
│ Wallets scanning │ Jinsi wallets kupata na decrypt noti kupokea │ makubaliano muhimu na noti encryption haja ya mapitio │
Kuhamia. Kuhamisha fedha kwa cryptography salama. Lazima kuepuka wote kupoteza fedha na uvujaji faragha.

## Jinsi Zcash Inavyojitayarisha

### Zcash Ina Mchakato wa Kuboresha Mtandao

Zcash imebadilisha cryptography yake kabla. Sapling alifanya shughuli ulinzi rahisi kutumia. NU5 ilianzisha Orchard, Unified Anwani, na Halo 2.

Hii ni muhimu kwa sababu baada ya quantum utayari si moja-line programu patch. Inahitaji uratibu wa mtandao upgrades, mkoba mabadiliko, ukaguzi, na muda kwa ajili ya watumiaji kuhamia.

Upgrades Zcash uliopita kuonyesha kwamba mazingira ina uzoefu kusonga kutoka cryptography zamani kuelekea miundo mpya.

### Halo na Orchard Zilipunguza Dhana za Zamani

Halo 2 ni kutumika kwa Orchard, Zcash ya kisasa ulinzi bwawa. Uboreshaji mmoja muhimu ni kwamba Halo kuondolewa haja ya kuaminika kuanzisha kwa mfumo wa ushahidi Orchard.

Hiyo si kitu sawa na usalama baada ya quantum. Ni bado ni muhimu kwa sababu inaonyesha Zcash unaweza kuchukua nafasi ya vitalu kuu cryptographic ujenzi wakati miundo bora zinapatikana.

### ZIP 2005 Inazingatia Quantum Recoverability

ZIP 2005 inaitwa "Orchard Quantum Recoverability". Inapendekeza mabadiliko yaliyokusudiwa kusaidia watumiaji wa Orchard kupona au kuhamia fedha ikiwa mashambulio ya quantum dhidi ya dhana za zamani yanakuwa ya vitendo.

Recoverability si sawa na usalama kamili baada ya quantum. Ni nyembamba na bado ni muhimu:

- Usalama kamili wa baada ya quantum hujaribu kuzuia mashambulizi ya Quantum yasifanye kazi.
- Recoverability inatoa watumiaji waaminifu njia bora kama cryptography zamani inakuwa salama.

Kwa wanaoanza, fikiria hii kama mpango wa dharura ya kuondoka. Haina kuchukua nafasi ya jengo lote, lakini inasaidia watu kuondoka chumba zamani salama kama kufuli zamani inakuwa dhaifu.

### Mradi wa Tachyon Unatazamia Maboresho Makubwa ya Itifaki

Mradi Tachyon ni mapendekezo Zcash kuboresha ililenga kiwango, usawazishaji, na ukuaji wa hali. tovuti yake ya umma anasema pendekezo inalenga kupunguza shughuli, kupunguza ukuaji hali ya kuthibitisha, na kupata full baada ya quantum faragha kama athari upande.

Because Tachyon is a proposal, it still depends on engineering work, review, and community approval before activation. It is best understood as part of Zcash's active research and upgrade direction, not as a feature that users already have today.

### Utafiti na Viwango Vinabadilika

The wider cryptography world is also moving. NIST's post-quantum standards give implementers stronger building blocks for signatures and key establishment. Zero-knowledge researchers continue to study proof systems that can hold up under quantum assumptions.

Zcash inaweza kufaidika kutokana na kazi hiyo, lakini bado ina kuendana na blockchain kuhifadhi faragha.

## Inawezekana Baadaye Upgrade Mbinu

### Baada ya Quantum Gharama idhini

Zcash inaweza hatimaye haja ya kutumia idhini ambayo haina kutegemea quantum-dhaifu saini mifumo.

Hii inaweza kutumia saini baada ya quantum, saini mseto, au kubuni nyingine. kubuni mseto anatumia wote classical na baada ya Quantum ukaguzi wakati wa kipindi cha mpito, hivyo mfumo haitegemei tu dhana moja.

Changamoto ni ukubwa na gharama. saini baada ya quantum inaweza kuwa kubwa kuliko saini ya leo, ambayo huathiri ukubwa wa shughuli, bandwidth, ada, mkononi pochi, na mkoba vifaa.

### Anwani Mpya Na Fomati Muhimu

New cryptography mara nyingi inahitaji funguo mpya na anwani. Watumiaji ingekuwa haja ya wazi uhamiaji njia kutoka umbizo la zamani kwa umbizo salama.

Uhamiaji lazima kuwa rahisi katika pochi. watumiaji wengi haipaswi kuwa na kuelewa kila cryptographic undani kukaa salama.

### Kuhamia Nchi Nyingine Ili Kulinda Faragha

Uhamiaji ni nyeti hasa kwa Zcash. Kama watumiaji wengi hoja fedha kutoka mabwawa ya zamani kwa mabwawa mpya katika mifumo ya wazi, uhamiaji yenyewe inaweza kuvuja habari.

Mpango mzuri wa uhamiaji unahitaji kulinda:

- Fedha za watumiaji
- Faragha ya mtumiaji
- Upatanifu wa mkoba
- Msaada wa kubadilishana
- Vifaa mkoba msaada
- Usalama wa makubaliano ya mtandao

### Baada ya Quantum uthibitisho System Review

Kubadilisha saini haitoshi. kubuni ulinzi wa Zcash pia inategemea ushahidi sifuri-ujuzi na ahadi.

Kazi ya baadaye inaweza kuhitaji kupitia upya au kubadilisha:

- zk-SNARK dhana
- Mahusiano ya polynomial
- Fiat-Shamir changamoto hashes
- Kumbuka ahadi
- Nullifier ujenzi
- Merkle mti dhana
- Kumbuka encryption na mtazamo-ufunguo tabia

Baadhi ya vipengele inaweza kuwa kukubalika na vigezo kusahihishwa. vipengele vingine vinaweza kuhitaji miundo mpya.

## Mifano ya Mwanzoni

### Mfano wa 1: Kufungwa kwa Kioo cha Kale

Hebu wazia sanduku lenye kufuli lililo imara leo. Chombo kipya kitakachotengenezwa wakati ujao huenda kikafungua kufuli hilo la zamani haraka.

Post-quantum cryptography ni kama kubadilisha lock na kubuni kwamba chombo kipya si inatarajiwa kuvunja.

Kwa blockchain, badala ya kufuli ni vigumu kwa sababu kila mkoba, node, kubadilishana, na kifaa vifaa lazima kuelewa kubuni mpya.

### Mfano 2: Sanduku la Kupokea la Umma

data ya blockchain ya uwazi ni kama kuweka kila risiti katika sanduku la umma milele. Hata kama hakuna mtu anaweza kusoma kila muundo leo, zana za baadaye zinaweza kujifunza zaidi baadaye.

Shielded Zcash anajaribu kuepuka kuchapisha risiti hizo katika nafasi ya kwanza. Hiyo husaidia faragha ya muda mrefu, lakini kufuli kulinda mfumo ulinzi bado ina kuwa upya kwa ajili ya baadaye quantum.

### Mfano wa 3: Mpango wa Kuondoka

Uwezo wa kupona ni kama kupanga njia ya kutoka kabla ya moto kutokea. Unatumaini kwamba hautaihitaji, lakini ni salama zaidi kuipanga mapema kuliko wakati wa dharura.

ZIP 2005 inafaa wazo hili kwa maelezo ya Orchard.

## Kile Ambacho Watumiaji Wanaweza Kufanya Leo

Watumiaji hawana haja ya hofu. kubwa umma quantum kompyuta uwezo wa kuvunja kupelekwa blockchain cryptography hazipatikani leo.

Mazoea mazuri bado husaidia:

- Upendeleo kulindwa Zcash matumizi wakati inawezekana.
- Epuka kutumia tena anwani.
- Hakikisha una habari za karibuni kuhusu pesa zako.
- Fuata matangazo ya kuboresha mtandao wa Zcash.
- Watch kwa ZIPs na mkoba mwongozo kuhusu recoverability au uhamiaji.
- Usifikiri shughuli ya uwazi ni binafsi.
- Usihamishe fedha kulingana na uvumi; subiri mwongozo wazi kutoka kwa watengenezaji wa Zcash wanaoaminika na timu za mkoba.

## Magumu

Upgrades baada ya quantum ni vigumu kwa kila blockchain.

Changamoto za kawaida ni:

- Funguo na saini kubwa zaidi
- Mikataba mikubwa
- Gharama za juu za uthibitisho
- Zaidi matumizi ya bandwidth
- Ukaguzi mpya wa usalama
- Vifaa mkoba msaada
- Kazi ya mkononi mkoba
- Kubadilishana na kuhifadhi ushirikiano
- Uvujaji wa faragha wakati wa uhamiaji
- Makubaliano ya Jumuiya juu ya mabadiliko ya makubaliano

Kwa Zcash, sehemu ngumu sio tu kuweka sarafu zinazotumika. Sehemu ngumu ni kutunza sarafu zinazoweza kutumiwa wakati wa kuhifadhi faragha ambayo inafanya Zcash tofauti.

## Muhtasari

Kompyuta quantum inaweza hatimaye kutishia baadhi ya cryptography kutumika na blockchains. Post-quantum cryptology ni jibu kwa muda mrefu, lakini ni lazima kupelekwa kwa uangalifu.

Zcash ni si kikamilifu baada ya quantum leo. Hata hivyo, Zcash ina nguvu muhimu: shughuli shielded kupunguza yatokanayo umma, mtandao ina historia ya upgrades cryptographic, na utafiti wa sasa kama vile ZIP 2005 na Mradi Tachyon tayari lengo la hatari quantum baadaye.

Kwa Kompyuta, wazo kuu ni rahisi: faragha leo hupunguza data ya baadaye ya mfiduo, na upgrades makini inaweza kusaidia Zcash hoja kuelekea nguvu quantum-era usalama bila kutoa dhabihu usability.

## Kurasa Zinazohusiana

- [Vidimbwi vya Kuhifadhiwa](/using-zcash/shielded-pools) - Jinsi Zcash ulinzi shughuli kulinda maelezo ya shughuli
- [Halo](/zcash-tech/halo) - Zcash ya uthibitisho mfumo bila kuaminiwa kuanzisha
- [ZKP & ZK-SNARKS](/zcash-tech/zk-snarks) - Jinsi zero-ujuzi uthibitisho kazi katika Zcash
- [Kuona funguo](/zcash-tech/viewing-keys) - Jinsi ya kuchagua kutoa taarifa kazi kwa ajili ya walinzi Zcash
- [Zcash Shielded Mali](/zcash-tech/zcash-shielded-assets) - Futures kulindwa mali na binafsi mali msaada
- [Usiri kama Kanuni ya Msingi](/privacy/privacy-as-a-core-principle) - Kwa nini masuala ya faragha ya kifedha

## Marejeo

- [NIST: Kwanza mwisho baada ya quantum encryption viwango](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [NIST Post-Quantum Cryptography Mradi](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Mradi wa Tachyon](https://tachyon.z.cash/)
- [Zcash Itifaki Specification](https://zips.z.cash/protocol/protocol.pdf)
- [Kitabu cha Halo 2](https://zcash.github.io/halo2/)
