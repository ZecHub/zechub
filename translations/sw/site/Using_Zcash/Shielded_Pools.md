<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Mabwawa ya Thamani 

## Kwa Ufupi

- Zcash kwa sasa ina **mabwawa 5 ya thamani**: Sprout (ya zamani), Sapling, Orchard (ya matumizi pekee), Ironwood, na Uwazi.
- **Ironwood** ndilo bwawa kuu la sasa la faragha [shielded pool], linalotumika tangu uboreshaji wa NU6.3 tarehe 28 Julai 2026.
- **Orchard** sasa ni **ya matumizi pekee**: thamani mpya haiwezi kuingia humo, na fedha zilizopo huhamishwa kwenda Ironwood.
- **Sapling** (anwani za z zinazoanza kwa `zs`) bado inaungwa mkono kwa upana na inaendelea kulinda kiasi kikubwa cha ZEC cha faragha.
- Anwani za **Uwazi** (t...) hazitoi faragha ya miamala na hufanya kazi kwa namna inayofanana na Bitcoin.
- **Sprout** ni bwawa la zamani la faragha ambalo limeondolewa katika matumizi hai.
- Uhamishaji kutoka Orchard kwenda Ironwood **unaendelea** na hukaguliwa hadharani na turnstile.
- Kwa dhamana imara zaidi za faragha, watumiaji wanapaswa kuendelea kupendelea miamala ya **faragha-kwa-faragha (z → z)** kila inapowezekana.


<br/>

## Kuelewa Mabwawa ya Thamani ya Zcash

Zcash hutenganisha fedha katika mifumo tofauti ya uhasibu inayojulikana kama mabwawa ya thamani. Kila bwawa lina kanuni zake za kriptografia na sifa za faragha, huku itifaki ikifuatilia jumla ya thamani inayosogea kati yake.

Leo, mtandao una mabwawa matano makuu ya thamani:

- Uwazi — Ya umma na inaonekana kikamilifu on-chain.
- Sapling — Bwawa la kwanza la kisasa la faragha lililotumiwa kwa upana, ambalo bado linafanya kazi.
- Orchard — Bwawa kuu la awali la faragha, ambalo sasa ni la matumizi pekee.
- Ironwood — Bwawa kuu la sasa la faragha, lililoanzishwa na NU6.3.
- Sprout — Bwawa asili la faragha lililoanzishwa pamoja na Zcash mwaka 2016.
  


Kadiri Zcash inavyoendelea kubadilika, mabwawa mapya ya faragha yanaweza kuanzishwa ili kuboresha usalama, faragha, urahisi wa matumizi, na uwezo wa ukaguzi huku yakidumisha uoanifu na fedha zilizopo.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Kielelezo 1: Chati inayoonyesha mabwawa matatu ya faragha (Sprout, Sapling na Orchard) hadi 29 Oktoba 2025, kabla ya Ironwood kuanzishwa

<br/>

## Mabwawa ya Faragha 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Bwawa la Ironwood</h3>

Ironwood ndilo bwawa kuu la sasa la faragha. Liliamilishwa tarehe 28 Julai 2026 katika block 3,428,143 kama sehemu ya uboreshaji wa mtandao wa NU6.3, na ndipo thamani mpya ya faragha sasa huhifadhiwa.

Lipo kwa sababu dosari iligunduliwa katika mfumo wa uthibitishaji wa Orchard mwezi Mei 2026. Hakuna ushahidi kuwa dosari hiyo iliwahi kutumiwa vibaya, lakini hitilafu hiyo ilimaanisha kuwa usahihi wa akiba ya faragha haungeweza kuthibitishwa kwa kutumia mathibitisho pekee. Badala ya kurekebisha mfumo uliopo, mtandao uliunda bwawa jipya lenye mzunguko uliorekebishwa na kuhamisha thamani kupitia turnstile inayohesabu kila sarafu hadharani. Uhasibu huo ndio unaorejesha dhamana kwamba akiba ya faragha inaungwa mkono kikamilifu.

Ironwood hutumia tena modeli ya Action ya Orchard na mathibitisho ya Halo 2, hivyo hufanya kazi kwa namna ileile kila siku. Kuna mambo mawili mapya: miamala hutumia muundo wa v6, na madokezo ya Ironwood **yanaweza kurejeshwa kwa quantum** chini ya [ZIP 2005](https://zips.z.cash/zip-2005), ikimaanisha kuwa rekodi ya on-chain ya sarafu hubaki inayoweza kurejeshwa ikiwa kompyuta ya quantum ya baadaye itavunja kriptografia ya leo. Hii ni njia ya urejeshaji, si upinzani dhidi ya quantum, na haitumiki kwa mabwawa ya zamani.

Huhitaji anwani mpya. Anwani zilizounganishwa hujumuisha vipokezi kadhaa, na pochi huchagua bwawa sahihi kwa niaba yako.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Bwawa la Orchard</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Kielelezo 2: Chati inayoonyesha bwawa la Orchard hadi 29 Oktoba 2025, kabla ya Ironwood kuanzishwa

<br/>

Bwawa la Faragha la Orchard liliamilishwa tarehe 31 Mei 2022 kama sehemu ya uboreshaji wa mtandao wa NU5. Orchard ilianzisha itifaki mpya ya faragha iliyoondoa hitaji la usanidi unaoaminika [trusted setup] na ikawa bwawa kuu la faragha linalotumiwa na Unified Addresses (UAs).

Orchard iliboresha kwa kiasi kikubwa urahisi wa matumizi, ufanisi, na faragha kwa kupunguza uvujaji wa metadata ya miamala na kuanzisha modeli ya miamala inayonyumbulika zaidi inayotegemea Actions badala ya pembejeo na matokeo ya jadi ya faragha.

Tangu uboreshaji wa Ironwood ulipoamilishwa tarehe 28 Julai 2026, **Orchard ni ya matumizi pekee**. Thamani mpya haiwezi kuingia katika bwawa hilo. Fedha zilizohifadhiwa humo bado zinaweza kutumiwa, na zinahamishwa kwenda Ironwood kupitia turnstile. Pochi hushughulikia hili kwa niaba yako, ingawa nyingi hukupa udhibiti fulani wa kasi yake. Kila uhamisho kutoka Orchard huonyesha kiasi chake kwenye blockchain, kwa hiyo namna pochi inavyogawa na kupanga muda wa uhamishaji ni muhimu kwa faragha.

Ikiwa unamiliki fedha za Orchard, angalia [Ironwood](/zcash-tech/ironwood) ili kujua maana ya uhamishaji huo kiutendaji.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Bwawa la Sapling</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Kielelezo 3: Chati inayoonyesha bwawa la Sapling hadi 29 Oktoba 2025, kabla ya Ironwood kuanzishwa

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) ulikuwa uboreshaji wa itifaki ya Zcash ulioanzishwa tarehe 28 Oktoba 2018. Ni maboresho makubwa dhidi ya toleo la awali lililojulikana kama Sprout, ambalo lilikuwa na vikwazo fulani katika faragha, ufanisi na urahisi wa matumizi. 

Baadhi ya maboresho hayo yanajumuisha utendaji ulioboreshwa wa anwani za faragha, funguo za kutazama zilizoboreshwa ili kuwawezesha watumiaji kuona miamala inayoingia na kutoka bila kufichua funguo zao binafsi, na funguo huru za maarifa sifuri [zero-knowledge] kwa hardware wallet wakati wa sahihi ya muamala. 

Zcash Sapling huwawezesha watumiaji kutekeleza miamala ya faragha katika sekunde chache ikilinganishwa na muda mrefu uliokuwa ukihitajika katika Mfululizo wa Sprout. 

Kuficha muamala huimarisha faragha, na kufanya isiwezekane kwa wahusika wengine kuunganisha miamala na kubaini kiasi cha ZEC kinachohamishwa. Sapling pia huboresha urahisi wa matumizi kwa kupunguza mahitaji ya kihesabu ya kutengeneza miamala ya faragha, na hivyo kuifanya ipatikane zaidi kwa watumiaji.

Anwani za pochi ya Sapling huanza kwa "zs" na hili linaweza kuonekana katika Pochi zote za Faragha za Zcash zinazoungwa mkono (Zkool, Pochi ya Zingo, Nighthawk n.k.) ambazo zina anwani za Sapling zilizojengewa ndani. Zcash Sapling inawakilisha maendeleo makubwa ya kiteknolojia katika faragha na ufanisi wa miamala, jambo linalofanya Zcash kuwa sarafu ya kidijitali ya vitendo na yenye ufanisi kwa watumiaji wanaothamini faragha na usalama.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Bwawa la Sprout</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Kielelezo 4: Chati inayoonyesha bwawa la Sprout hadi 29 Oktoba 2025, kabla ya Ironwood kuanzishwa

Sprout ilikuwa itifaki ya kwanza kabisa ya faragha ya maarifa sifuri iliyo wazi na bila ruhusa [permissionless] kuzinduliwa. Ilizinduliwa tarehe 28 Oktoba 2016.

Anwani za Sprout hutambuliwa kwa herufi zake mbili za kwanza, ambazo daima ni "zc". Iliitwa "Sprout" kwa kusudi kuu la kusisitiza kuwa programu hiyo ilikuwa blockchain changa, inayochipua na yenye uwezo mkubwa wa kukua na kuwa wazi kwa maendeleo. 

Sprout ilitumiwa kama kifaa cha awali kwa [Zcash uchimbaji wa kuanza polepole](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), ambao ulileta usambazaji wa ZEC na zawadi za block kwa wachimbaji. 

Kadiri mfumo wa ikolojia wa Zcash ulivyoendelea kupanuka pamoja na ongezeko la miamala ya faragha, ilibainika kuwa Mfululizo wa Zcash Sprout ulikuwa na mipaka na usio na ufanisi katika faragha ya mtumiaji, kupanua uwezo wa miamala na uchakataji. Hii ilisababisha marekebisho ya mtandao na Uboreshaji wa Sapling. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Bwawa la Uwazi</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Kielelezo 5: Chati inayoonyesha bwawa la Uwazi hadi 29 Oktoba 2025, kabla ya Ironwood kuanzishwa

<br/>

Bwawa la Uwazi la Zcash halina faragha. Anwani za pochi za uwazi kwenye Zcash huanza kwa herufi "t"; faragha ni ndogo sana unapotumia aina hii ya anwani kwa miamala.

Miamala ya uwazi katika Zcash inafanana na miamala ya Bitcoin, inayounga mkono miamala ya sahihi nyingi na kutumia anwani za kawaida za umma.

Uwazi wa Zcash hutumiwa zaidi na masoko ya kati ya kubadilishana sarafu ili kuhakikisha kuna uwazi wa juu na uthibitisho wa mtandao wakati wa kutuma na kupokea ZEC kati ya watumiaji.

Pia ni muhimu kutambua kuwa, ingawa anwani za Faragha za Zcash hutoa faragha ya juu wakati wa miamala, zinahitaji rasilimali zaidi za kihesabu kuchakata miamala. Kwa hiyo, baadhi ya watumiaji wanaweza kutumia anwani za Uwazi kwa miamala isiyohitaji kiwango kilekile cha faragha.

<br/>

## Mbinu Inayopendekezwa ya Uhamishaji wa Bwawa

Inapohusu kuzingatia kiwango cha juu cha faragha wakati wa muamala kwenye Mtandao wa Zcash, inapendekezwa ufuate mbinu zifuatazo;

Miamala inayofanyika kati ya pochi za "z hadi z" kwenye blockchain ya Zcash kwa kawaida ni ya faragha na wakati mwingine huitwa Muamala wa Faragha kutokana na kiwango cha juu cha faragha kinachotolewa. Kwa kawaida hii ndiyo njia bora na inayopendekezwa zaidi ya kutuma na kupokea $ZEC pale faragha inapohitajika. 

---

Unapotuma ZEC kutoka "anwani ya Z" kwenda "anwani ya T", hii huashiria muamala wa kuondoa faragha. Katika aina hii ya muamala, kiwango cha faragha si cha juu kila wakati kwa kuwa baadhi ya taarifa zitaonekana kwenye blockchain kutokana na kutuma ZEC kwenye Anwani ya Uwazi. Muamala wa kuondoa faragha haupendekezwi kila wakati pale faragha ya juu inapohitajika. 

---

Kuhamisha ZEC kutoka Anwani ya Uwazi (anwani ya T) kwenda anwani ya Z hujulikana kama kuweka faragha. Katika aina hii ya muamala, kiwango cha faragha si cha juu kila wakati ikilinganishwa na muamala wa z-z, lakini pia inapendekezwa pale faragha inapohitajika. 

---

Kutuma ZEC kutoka Anwani ya Uwazi (anwani ya T) kwenda Anwani nyingine ya Uwazi (anwani ya T) kwenye Mtandao wa Zcash (muamala wa T-T) kunafanana sana na muamala wa Bitcoin, na ndiyo sababu miamala ya T-T kwenye Zcash huitwa miamala ya Umma kwa sababu maelezo ya muamala ya mtumaji na mpokeaji huonekana kwa umma, jambo linalofanya kiwango cha faragha kuwa kidogo sana katika muamala huo. 

Masoko mengi ya kati ya kubadilishana sarafu hutumia Anwani ya Uwazi ("anwani ya T) yanapofanya miamala kwenye blockchain ya Zcash, lakini aina hii ya muamala (T-T) haitakuwa na sifa zozote za faragha.

<br/>

## Uhamishaji Kutoka Orchard Kwenda Ironwood

Uhamishaji unafanyika sasa. Orchard imefungwa kwa amana mpya, na thamani iliyobaki humo inahamishwa kwenda Ironwood muamala mmoja baada ya mwingine. Unaweza kufuatilia jumla kwenye [ironwood.live](https://ironwood.live/).

Maana yake hutegemea mahali fedha zako zilipo:

1. **Shughuli mpya za faragha** huingia kwenye Ironwood kiotomatiki. Hakuna cha kufanya.
2. **Fedha zilizopo za Orchard** zinahitaji kuhamishwa. Pochi zinazotunzwa hufanya hili kwa niaba yako, kwa kawaida kwa hatua badala ya mara moja.
3. **Sapling haiathiriki** na bado inapokea fedha. Ni Orchard pekee iliyofungwa.
4. **Turnstile huhesabu kila kitu** kinachovuka kati ya mabwawa, jambo linalothibitisha kuwa hakuna sarafu iliyoundwa njiani.

> **Onyo moja muhimu la faragha.** Turnstile huchapisha *kiasi* kinachovuka kati ya mabwawa, pamoja na urefu wa block. Mtumaji na mpokeaji hubaki wamefichwa kama kawaida, lakini kiasi cha kipekee kinaweza kuunganishwa nawe. Hii ndiyo sababu pochi huhamisha fedha kwa hatua kwa kutumia madhehebu ya kawaida badala ya kuhamisha salio lako kwa mkupuo mmoja unaotambulika. Acha pochi yako iamue kasi yake, na fikiria kutumia Tor au VPN ili IP yako isihusishwe na kiasi unachohamisha.

Angalia [Ironwood](/zcash-tech/ironwood) kwa uboreshaji wenyewe, na [The Turnstile](/zcash-tech/the-turnstile) kwa jinsi uhasibu unavyofanya kazi.

<br/>

## Makosa ya Kawaida ya Kuepuka

- **Kutuma kutoka t-address kwenda t-address** — ni ya umma kikamilifu, hakuna faragha. Daima weka fedha katika faragha kwanza.
- **Kudhani kuwa Orchard bado inapokea fedha** — ni ya matumizi pekee tangu 28 Julai 2026. Thamani inaweza kutoka, lakini hakuna mpya inayoingia
- **Kuchanganya Sapling na anwani zilizounganishwa** — anwani za Sapling huanza kwa `zs`. Anwani zilizounganishwa huanza kwa `u1` na hujumuisha vipokezi kadhaa, hivyo bwawa ambamo malipo yako huingia hutegemea vipokezi ambavyo anwani hiyo ina
- **Kuacha fedha katika bwawa la Sprout** — Sprout imeondolewa kwa miaka mingi; hamisha fedha hizo kutoka humo
- **Kutarajia uhamishaji usionekane kabisa** — kiasi kinachovuka turnstile ni cha umma, ingawa mtumaji na mpokeaji si wa umma
- **Kudhani t → z (kuweka faragha) ni faragha kikamilifu** — tendo la kuweka faragha lenyewe linaonekana on-chain; yaliyomo hayaonekani

---

## Kurasa Zinazohusiana

- [Ironwood](/zcash-tech/ironwood) — Uboreshaji uliounda bwawa la sasa
- [The Turnstile](/zcash-tech/the-turnstile) — Jinsi thamani inayosogea kati ya mabwawa inavyokaguliwa
- [Pochi](/using-zcash/wallets) — Pochi zipi zinatunzwa na ziko tayari kwa Ironwood
- [Miamala](/using-zcash/transactions) — Jinsi ya kutuma miamala ya faragha
- [Kununua ZEC](/using-zcash/buying-zec) — Kupata ZEC kabla ya kuitumia katika mabwawa
- [zk-SNARKs](/zcash-tech/zk-snarks) — Msingi wa kriptografia wa mabwawa ya faragha
- [ZEC ni nini na Zcash](/start-here/what-is-zec-and-zcash) — Maelezo ya msingi kuhusu faragha ya Zcash
