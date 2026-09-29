<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST & Kiwango cha Kuweka kwa ZEC Shielded

> Kwa maelezo kamili ya cryptographic wa itifaki FROST, angalia makala. [Ukurasa wa kiufundi FROST](FROST.md).

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

| Hali | Kwa nini utunzaji wa kizingiti husaidia |
|-----------|----------------------------|
| **DAO au hazina ya timu** | Hakuna msimamizi mmoja anayeweza kutoa pesa peke yake; inahitaji makubaliano |
| **Mbadilishaji au mlinzi** | Husambaza hatari kuu katika maeneo ya usalama au wafanyakazi |
| **Hifadhi ya kibinafsi ya baridi (pamoja na familia inayoaminika)** | 2 kati ya 3 kati yenu + wanafamilia wawili — kufa au kupoteza ufikiaji, fedha hazipotei |
| **Escrow** | Mnunuzi, muuzaji, na msuluhishi kila mmoja ana hisa; fedha hutolewa wakati wawili wanapokubaliana |
| **Utoaji wa ruzuku yenye thamani kubwa** | ZCG-style: unahitaji watia saini wengi huru kabla ya kulipa |
| **Usimamizi wa ufunguo wa msanidi programu** | Zuia tishio la ndani - hakuna mhandisi hata mmoja anayeweza kuondoa mfuko wa itifaki |

Labda ** hauitaji** uhifadhi wa kizingiti kwa mkoba wa kibinafsi unaodhibiti peke yako, kiasi kidogo, au hali ambapo usimamizi ulioongezwa juu ya gharama huzidi kupunguza hatari.

---

## Inatofautianaje na ishara nyingi zenye kuonekana wazi?

Zcash kwa muda mrefu imekuwa ikiunga mkono ishara nyingi za uwazi  funguo kadhaa zinazohitajika kutumia kutoka anwani ya t. Lakini saini nyeti ina gharama kubwa ya faragha: ** muundo wa saini, ufunguo wote wa umma na wasaini wote wanaonekana kwenye blockchain**.

FROST hutatua hili kwa kufanya kazi ndani ya bwawa la ulinzi:

| | Ishara nyingi za uwazi | Kizingiti cha FROST (kilichofunikwa) |
|--|---------------------|--------------------------|
| Bwawa la kuogelea | Uwazi (umma) | Orchard (iliyofunikwa) |
| Wasaini wanaonekana kwenye mnyororo | Ndiyo — funguo zote za umma zimefichuliwa | Hapana — haitofautiani na matumizi ya mtu mmoja aliyesaini |
| Kiasi kinachoonekana | Ndiyo | No |
| Uratibu unahitajika | Hati ya mnyororo | Duru ya mawasiliano nje ya mnyororo |
| Faragha | Hakuna | Faragha iliyolindwa kikamilifu |

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

### Ywallet FROST Demo
Ywallet alikuwa mapema FROST demo ushirikiano, kutembea kwa njia ya katika [Ywallet FROST Demo mwongozo](/guides/Ywallet_FROST_Demo). Ywallet ni tena iimarishwe na haitakuwa updated kwa Ironwood, hivyo kusoma mwongozo kama background badala ya kitu cha kukimbia leo. Zkool, kutoka developer huo, ni mrithi kudumishwa na orodha FROST multisig kati ya makala yake.

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

| Usanidi | Ustahimilivu | Hatari |
|-------|-----------|------|
| 1-of-1 | Hakuna ustahimilivu — sehemu moja ya kushindwa | Hasara ya ufunguo = hasara ya kudumu |
| 2-of-2 | Lazima uwe na watia saini wote wawili — hakuna uvumilivu wa makosa | Moja haipatikani = fedha zilizogandishwa |
| 2-of-3 | Kipande kimoja kinaweza kupotea au kutopatikana | Kiwango cha chini cha usalama kuliko 3 kati ya 5 |
| 3-of-5 | Vipande viwili vinaweza kupotea; usalama imara | Uratibu zaidi wa gharama za uendeshaji |
| 3-of-7 | Daraja la kitaasisi; huvumilia kushindwa mara mbili | Gharama kubwa ya uratibu |

hatua ya kuanzia vitendo kwa timu zaidi: ** 2-ya-3** (kuweza kukabiliana, ushirikiano mdogo) au ** 3-ya-5** (taasisi, usalama wa juu).

---

## Kurasa Zinazohusiana

- [FROST  Ufundi wa Kuzama kwa Kina](FROST.md)  maelezo ya usiri wa itifaki (DKG, saini raundi, uthibitisho usalama)
- [Ywallet FROST Demo Mwongozo](/guides/Ywallet_FROST_Demo)  background, Ywallet ni tena iimarishwe
- [Kuangalia funguo za kuvinjari](Viewing_Keys.md)  kusoma tu kupata anwani za ulinzi (mchanganyiko wa kuhifadhi kizingiti)
- [Zcash Shielded Mali za fedha](Zcash_Shielded_Assets.md)  FROST pia ni muhimu miundombinu kwa ajili ya ZSA utoaji

## Rasilimali

- [Karatasi ya utafiti wa FROST (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST rasimu ya kiwango (rasimu-irtf-cfrg-frozen)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST utekelezaji](https://frost.zfnd.org)
- [Chelsea Komlo  Nini ni Saini ya Kiwango cha Threshold? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase  Threshold Digital Signatures (Signature za Kijitabu cha Simu ya Mlango)](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST  imara Async Schnorr Threshold Signatures (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
