<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST & Kiwango cha Kuweka kwa ZEC Shielded

> Kwa maelezo kamili ya cryptographic wa itifaki FROST, angalia [FROST ukurasa kiufundi]](FROST.md).

Ulinzi wa kizingiti cha FROST unaendelea kuja katika mazungumzo ya Zcash  ilikuwa wimbo bora kwenye ZecHub Hackathon 2026  lakini dhana hiyo haijaelezewa kila wakati kwa lugha rahisi. Ukurasa huu unashughulikia inamaanisha nini, unapohitaji kweli, biashara-offs, na ni zana zipi zinaunga mkono leo.

---

## TL;DR

- ** FROST** inaruhusu kundi la wamiliki wa ufunguo kudhibiti pamoja anwani ya Zcash iliyohifadhiwa bila mtu yeyote mmoja anayemiliki kitufe cha kibinafsi kamili.
- Kiwango cha **t-ya n** kinamaanisha: watu t lazima watumie saini kutumia; yoyote ya 1 au chini haiwezi kuhamisha fedha peke yake.
- Shughuli kuangalia kama yoyote nyingine kulindwa shughuli  hakuna on-mnyororo alama ya kuashiria kwamba kizingiti kusaini ilitumika.
- Hii ni tofauti kabisa na wazi multisig (ambayo ni ya umma kwenye mnyororo na Zcash kwa muda mrefu imekuwa ikiunga mkono)  FROST inafanya kazi ndani ya dimbwi la kulindwa.
- Ni muhimu kwa DAOs, kubadilishana, huduma za uhifadhi wa mali, akiba ya pamoja na hazina timu  popote hatua moja kuu kushindwa ni kukubalika.

---

## FROST ni nini katika lugha ya kawaida?

Fikiria washirika watatu wa biashara kila kushikilia kipande cha ufunguo. Kutumia kutoka mkoba wao pamoja, yoyote mbili ya tatu lazima kukubaliana na co-kutia saini. shughuli yanayotokana inaonekana sawa kwa mtu binafsi kawaida kutuma  hakuna mtazamaji anaweza kusema kutokana blockchain kwamba watu wengi walikuwa kushiriki.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) is the cryptographic protocol that makes this possible for shielded Zcash. It was created by Chelsea Komlo (University of Waterloo / Zcash Foundation) and Ian Goldberg.

Mali muhimu:

- **Threshold**: only t-of-n signers need to participate (e.g. 2-of-3, 3-of-5)
- ** Shielded**: kazi ndani ya Orchard faragha pool  kiasi, mtumaji na mpokeaji kukaa binafsi
- ** Haiwezi kutofautishwa**: saini ya mwisho inaonekana kama shughuli nyingine yoyote iliyohifadhiwa na Zcash.
- **Non-matayarisho**: hakuna chama moja milele ana ufunguo kamili  hata mratibu

---

## Ni wakati gani unapaswa kutumia haki ya kulea watoto?

Kiwango cha kuhifadhi ina maana wakati ** kupoteza ufunguo mmoja au mtu mmoja haipaswi kumaanisha kupoteza fedha**.

Hali. Kwa nini udhibiti wa kizingiti husaidia?
|-----------|----------------------------|
** DAO au timu hazina** Hakuna admin moja inaweza drain fedha unilaterally; inahitaji makubaliano.
** Kubadilishana au custodian**. Inasambaza hatari muhimu katika maeneo ya usalama au wafanyakazi.
** Kihifadhi cha kibinafsi baridi (na familia ya kuaminika) ** 2-ya-3 kati yenu + wanafamilia wawili  kufa au kupoteza upatikanaji, fedha si waliopotea.
** Escrow** Mnunuzi, muuzaji na mratibu kila mmoja ana hisa; fedha kutolewa wakati wawili kukubaliana.
** Kiwango cha juu ya kutoa ruzuku** ZCG-style: inahitaji saini nyingi huru kabla ya kulipa nje.
 ** Developer muhimu usimamizi** kuzuia tishio la ndani hakuna mhandisi mmoja anaweza kuondoa mfuko itifaki.

Labda ** hauitaji** uhifadhi wa kizingiti kwa mkoba wa kibinafsi unaodhibiti peke yako, kiasi kidogo, au hali ambapo usimamizi ulioongezwa juu ya gharama huzidi kupunguza hatari.

---

## Inatofautianaje na ishara nyingi zenye kuonekana wazi?

Zcash kwa muda mrefu imekuwa ikiunga mkono ishara nyingi za uwazi  funguo kadhaa zinazohitajika kutumia kutoka anwani ya t. Lakini saini nyeti ina gharama kubwa ya faragha: ** muundo wa saini, ufunguo wote wa umma na wasaini wote wanaonekana kwenye blockchain**.

FROST hutatua hili kwa kufanya kazi ndani ya bwawa la ulinzi:

| | Transparent multisig | FROST threshold (shielded) |
|--|---------------------|--------------------------|
| Pool | Transparent (public) | Orchard (shielded) |
 Signers inayoonekana kwenye mnyororo. Ndiyo  wote funguo za umma wazi. No  indistinguishable kutoka matumizi moja-msaini
Kiasi kinachoonekana Ndiyo Hapana.
Ushirikiano unahitajika. On-chain script off-chain round of communication.
Faragha. Hakuna faragha kamili ya kulindwa.

---

## Mabadilishano na vizuizi

FROST ni nguvu, lakini inakuja na biashara halisi-offs unapaswa kuelewa kabla ya kutumia:

### Ushirikiano juu ya gharama za nje
Signers lazima kuwa online wakati huo huo (au karibu hivyo) kukamilisha kusaini raundi. Kama t signers yako ni kuenea katika maeneo ya muda au uhusiano unreliable, matumizi inahitaji uratibu kwamba mkoba solo haina.

### Hakuna kusaini kama quorum haipatikani
Kama kutosha keyholders ni unaopatikana (mgonjwa, kusafiri, unresponsive), fedha ni muda usioweza kutumika. Chagua kizingiti yako na kushiriki hesabu kwa makini  2-ya-3 ni zaidi ya kuhimili kuliko 2-ya-2.

### Sherehe ya kizazi cha ufunguo
Kuanzisha FROST inahitaji kusambazwa muhimu kizazi (DKG) sherehe ambapo washiriki wote n ni online pamoja. Hii ni tukio moja, lakini lazima kufanyika kwa makini  kama washiriki wanahatarishwa wakati DKG, usalama umeharibiwa.

### Vifaa vya kazi bado vinaendelea kukomaa.
FROST kwa Zcash ulinzi ni mpya. IETF kiwango (rasimu-irtf-cfrg-baridi) ni kukomaa, lakini mkoba ushirikiano ni mdogo. Kutarajia baadhi makali mbaya ikilinganishwa na standard moja muhimu mfuko wa fedha.

### Ugumu wa kufufua
Kupoteza shard si mwisho wa dunia (hiyo ni hatua ya kizingiti), lakini mipango ahueni lazima kumbukumbu mapema. Nani ana backups? Nini kinatokea kama vipande mbili kupotea wakati huo huo? Je, kuna mtu yeyote ambaye anaweza kufanya Backup kwa ajili yake mwenyewe na kupata data kutoka kwenye kompyuta yako?

---

## Nani ni kujenga na FROST juu ya Zcash?

### Zcash Foundation  frost.zfnd.org
Zcash Foundation imewasilisha uanzishaji wa kazi ya FROST na tovuti ya onyesho. Hii ni utekelezaji wa kumbukumbu uliotumiwa kwa upimaji na maendeleo.

### YWallet FROST Demo
YWallet (high-utendaji Zcash mkoba) ina mapema FROST demo ushirikiano. Angalia [YWallet Frost Demo mwongozo](/guides/Ywallet_FROST_Demo) kwa ajili ya hatua-kwa-hatua maelekezo.

### ZecHub Hackathon 2026  Miradi ya Barabara za FROST

Uwanja wa FROST ulikuwa na ushindani mkubwa katika ZecHub Hackathon 2026. Miradi mashuhuri:

- ** ZecVault**  2-ya-3 kulindwa escrow iliyotatuliwa kwenye mainnet (kiwango cha FROST)
- ** Msimamizi**  kizingiti cha ulinzi kwa Zcash iliyohifadhiwa na UX inayoelekezwa kwenye urejeshaji.

### Coinbase
Coinbase kujengwa uzalishaji FROST utekelezaji kwa mifumo yao ya saini kizingiti (kwa Bitcoin), na marekebisho ambayo kuondoa hatua preprocessing na kusambaza aggregator jukumu kati ya washiriki wote. uzoefu wao inathibitisha Frost usalama mfano katika kiwango cha uzalishi.

---

## Jinsi kikao cha ishara kinavyofanya kazi (kiliyorahisishwa)

1. ** Kuweka (mara moja):** Washiriki wote n kukimbia kusambazwa muhimu kizazi (DKG) sherehe. Kila anapata binafsi Shard; umegawanyika ufunguo wa umma ni inayotokana na hakuna chama anajua kamili ya siri.

2. ** Kuratibu wa saini:** Wakati matumizi inahitajika, mratibu (ambaye anaweza kuwa mmoja wa wasaini) hukusanya ahadi kutoka kwa washiriki ambao wako tayari kusaini.

3. **Round 1:** Kila saini kushiriki inazalisha nonce na matangazo ya ahadi (umma, si nyeti).

4. ** raundi ya 2:** Kila saini kushiriki mahesabu yao sehemu sahihi kwa kutumia shard zao binafsi na matangazo yake.

5. ** Jumla:** Mratibu huunganisha saini za sehemu katika moja ya mwisho Schnorr signature  indistinguishable on-mnyororo kutoka kwa saini single-party.

6. ** Broadcast:** shughuli ni matangazo kwa mtandao Zcash kama kawaida.

Kama signature yoyote hutuma sahihi mbaya sehemu, itifaki huwatambua na mimba (wao ni kutengwa kutoka vikao baadaye). uratibu kinachotokea nje ya mnyororo  blockchain anaona tu shughuli mwisho.

---

## Kuchagua vigezo yako kizingiti

Kuweka. Ujasiri. Hatari.
|-------|-----------|------|
◯ 1-of-1 Hakuna uwezo wa kukabiliana na hali ya kutofaulu. Kupoteza ufunguo = kupotea kabisa.
 2-ya-2  Lazima kuwa na saini zote mbili  hakuna kuvumilia makosa. moja haipatikani = fedha waliohifadhiwa.
| 2-of-3 | One shard can be lost or unavailable | Lower security margin than 3-of-5 |
Sehemu mbili zinaweza kupotea; usalama mkubwa. Ushirikiano zaidi juu ya kichwa.
3 ya 7 kiwango cha taasisi; huvumilia kushindwa mara mbili gharama kubwa za uratibu.

hatua ya kuanzia vitendo kwa timu zaidi: ** 2-ya-3** (kuweza kukabiliana, ushirikiano mdogo) au ** 3-ya-5** (taasisi, usalama wa juu).

---

## Kurasa Zinazohusiana

- [FROST — Technical Deep Dive](FROST.md)  maelezo ya usiri wa itifaki (DKG, saini raundi, uthibitisho usalama)
- [YWallet FROST Demo Mwongozo](/guides/Ywallet_FROST_Demo)  hatua kwa hatua mikono-juu demo
- [FROST Demo (frostdemo)](/guides/frostdemo)  Zcash Foundation demo kutembea kwa njia ya
- [Kuona funguo za]](Viewing_Keys.md)  kusoma tu kupata anwani za ulinzi (mchanganyiko wa kuhifadhi kizingiti)
- [Zcash Shielded Mali ya](Zcash_Shielded_Assets.md)  FROST pia ni muhimu miundombinu kwa ajili ya ZSA utoaji

## Rasilimali

- [Karatasi ya utafiti wa FROST (Komlo & Goldberg, 2020) ]](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST rasimu ya kiwango (rasimu-irtf-cfrg-frozen) ]](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST utekelezaji]](https://frost.zfnd.org)
- [Chelsea Komlo  Nini ni Saini ya Kiwango cha Threshold? (Zcon3) ]](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase  Threshold Digital Signatures] (Mfumo wa sarafu ya msingi)](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROST  imara Async Schnorr Threshold Signatures (Blockstream) ]](https://eprint.iacr.org/2022/550.pdf)
