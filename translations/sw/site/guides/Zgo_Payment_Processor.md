<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Kichakataji cha Malipo cha ZGo: Kupokea Zcash Bila Uhifadhi wa Mtu Mwingine

ZGo ni kichakataji cha malipo kisichohifadhiwa na mtu mwingine kwa ajili ya Zcash. Mteja hulipa kwa ZEC kutoka pochi yake mwenyewe, ZGo hufuatilia blockchain ya Zcash kwa ajili ya muamala, na fedha huwasili moja kwa moja katika pochi ya mfanyabiashara kupitia uhamisho wa faragha. ZGo haishikilii kamwe fedha katikati ya mchakato.

Mwongozo huu unaeleza jinsi mtiririko wa malipo unavyofanya kazi, jinsi ya kusanidi akaunti, na jinsi ya kuunganisha ZGo na Xero pamoja na WooCommerce. Pia unashughulikia makosa mawili yanayosababisha matatizo mengi ya usanidi wa mara ya kwanza.

## Katika ukurasa huu

1. [Kwa nini utumie ZGo](#why-use-zgo)
2. [Jinsi ZGo inavyofanya kazi](#how-zgo-works)
3. [Kusanidi akaunti](#setting-up-an-account)
4. [ZGo na Xero](#zgo-with-xero)
5. [ZGo na WooCommerce](#zgo-with-woocommerce)
6. [Vipengele](#features)
7. [Makosa ya kawaida](#common-mistakes)
8. [Hitimisho](#conclusion)
9. [Rasilimali](#resources)

## Kwa nini utumie ZGo

Vichakataji vingi vya malipo ya sarafu za kidijitali vinahifadhiwa na mtu mwingine. Fedha kwanza huingia katika akaunti ya kichakataji na hutumwa kwa mfanyabiashara baadaye, jambo linalomaanisha kwamba mhusika wa tatu hudhibiti fedha kwa muda na anaweza kuzizuia, kuzichelewesha, au kuripoti kuzihusu.

ZGo hutumia mkabala kinyume. Malipo [Payments] husafiri kutoka kwenye pochi ya mteja [wallet] moja kwa moja hadi pochi ya mfanyabiashara kupitia muamala wa faragha [shielded transaction] wa Zcash. Kichakataji huzalisha tu ankara na kufuatilia blockchain [blockchain] ili kupata uthibitisho. Hakuna salio la mpatanishi, hakuna mchakato wa utoaji, wala mtu wa tatu anayeweza kuchelewesha ukamilishaji.

Kwa mfanyabiashara, hili linamaanisha mambo matatu ya vitendo: udhibiti kamili wa ZEC zinazoingia, faragha ya miamala ya faragha kwa chaguo-msingi, na kutomtegemea mtoa huduma wa kati kubaki mtandaoni au mwenye uwezo wa kulipa madeni.

## Jinsi ZGo inavyofanya kazi

Mtiririko wa malipo ni uleule bila kujali kama ZGo inatumiwa kivyake, kupitia Xero, au kupitia WooCommerce:

1. Mfanyabiashara huzalisha ombi la malipo katika ZGo, ambalo huonekana kama msimbo wa QR wenye kiasi, kitambulisho cha ankara, na anwani ya kupokea ya Zcash.
2. Mteja husoma QR kwa pochi ya Zcash (Orchard, Sapling, na aina za anwani za uwazi zote zinaungwa mkono kwenye programu-jalizi ya WordPress) na kuidhinisha malipo.
3. Muamala hutangazwa kwenye mtandao wa Zcash kama uhamisho wa faragha kutoka pochi ya mteja hadi pochi ya mfanyabiashara.
4. ZGo hufuatilia blockchain ya Zcash kwa ajili ya muamala.
5. Baada ya uthibitisho tano, ZGo hutia alama malipo kuwa yamekamilika na kuarifu muunganisho wowote uliounganishwa (Xero, WooCommerce, au webhook).

Kizingiti cha uthibitisho tano ndicho namba muhimu. Kitu chochote kabla yake ni malipo yanayoendelea, si malipo yaliyopokelewa. Utekelezaji wa oda, masasisho ya hesabu ya bidhaa, na kitendo chochote kisichoweza kubatilishwa kwa upande wa mfanyabiashara vinapaswa kusubiri hatua ya 5.

ZGo hufanya kazi katika kivinjari chochote cha kisasa kwenye kompyuta au simu ya mkononi, bila usakinishaji kwa upande wowote. Mteja anahitaji pochi ya Zcash; mfanyabiashara anahitaji pochi ya Zcash na akaunti ya ZGo.

<img width="672" height="378" alt="ZGo ombi la malipo na muhtasari wa ufuatiliaji wa blockchain" src="/content-images/de50885b-b068-4157-bbda-0981ca23efc8-a00a274776.webp" />

## Kusanidi akaunti

Ili kuunda akaunti ya ZGo, pochi ya Zcash yenye kiasi kidogo cha ZEC inahitajika. Salio hilo dogo la ZEC hufidia ada ya on-chain kwa muamala wa kuanzisha akaunti. Pochi yoyote kubwa ya Zcash inafaa kwa hili; tazama [ZecHub Pochi](https://zechub.wiki/wallets) kwa chaguo za sasa.

Usanidi wa msingi:

1. Fungua [zgo.cash](https://zgo.cash/) katika kivinjari.
2. Unda akaunti ukitumia pochi ya Zcash inayodhibitiwa na mfanyabiashara. Pochi hii lazima ihifadhi funguo. Anwani ya kuweka amana katika soko la kubadilishana sarafu haitafanya kazi (tazama [Makosa ya kawaida](#common-mistakes)).
3. Thibitisha pochi kwa kutuma muamala mdogo wa kuanzisha.
4. Sanidi anwani ya kupokea. Malipo yote yanayochakatwa kupitia akaunti hii yatawasili katika pochi hii.

Baada ya akaunti kuwashwa, mfanyabiashara huyo huyo anaweza kutumia ZGo kwa malipo ya mara moja (msimbo mmoja wa QR katika tukio la muda mfupi) au kuiunganisha katika usanidi wa kudumu kupitia Xero au WooCommerce.

## ZGo na Xero

[Xero](https://www.xero.com/) ni jukwaa la uhasibu la wingu linalotumiwa na biashara nyingi ndogo na za kati. Muunganisho wa ZGo–Xero humruhusu mfanyabiashara kutoa ankara katika Xero, mteja kuilipia kwa ZEC, na Xero kutia alama ankara kuwa imelipwa kiotomatiki mara muamala unapothibitishwa.

Jinsi inavyofanya kazi:

1. Mfanyabiashara huunda ankara katika Xero kama kawaida.
2. ZGo huambatisha chaguo la malipo la Zcash kwenye ankara.
3. Mteja hulipa kwa ZEC kupitia pochi yake.
4. ZGo hufuatilia [Zcash blockchain](https://z.cash/) kwa ajili ya muamala.
5. Baada ya uthibitisho tano, ZGo huripoti malipo kwa Xero, ambayo hutia alama ankara kuwa imesuluhishwa.

ZEC huwasili katika pochi ya mfanyabiashara, si katika akaunti yoyote inayodhibitiwa na ZGo au Xero. Rekodi ya uhasibu katika Xero husalia ikilingana kiotomatiki na ukamilishaji wa on-chain.

Kwa usanidi wa mara ya kwanza, fuata mwongozo maalumu: [Usanidi wa Muunganisho wa Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo na WooCommerce

Kwa maduka ya mtandaoni yanayotumia [WooCommerce](https://woocommerce.com/) na [WordPress](https://wordpress.org/), ZGo hutoa programu-jalizi maalumu. Programu-jalizi huongeza Zcash kama mbinu ya malipo wakati wa kukamilisha ununuzi na hushughulikia hali ya oda kiotomatiki malipo yanapothibitishwa.

<img width="672" height="378" alt="ZGo mtiririko wa ukamilishaji wa ununuzi na oda wa programu-jalizi ya WooCommerce" src="/content-images/55a791bb-1947-4f55-b5b9-55083be8ed49-2bc8d2571e.webp" />

Mtiririko wa mwanzo hadi mwisho ndani ya duka la WooCommerce:

1. Mteja hufika kwenye ukamilishaji wa ununuzi na kuchagua Zcash kama mbinu ya malipo.
2. Programu-jalizi huzalisha ombi la malipo na kuonyesha msimbo wa QR kwenye ukurasa wa ukamilishaji wa ununuzi.
3. Mteja hulipa kutoka kwenye pochi yake.
4. Muamala hutangazwa kwenye mtandao wa Zcash na ZGo huanza kuufuatilia.
5. Baada ya uthibitisho tano, ZGo huripoti malipo kuwa yamekamilika kwa programu-jalizi.
6. Programu-jalizi hutia alama oda ya WooCommerce kuwa imelipwa na kusasisha hifadhidata ya oda.

Oda hulipwa tu hatua ya 6 inapokamilika. Hali za awali (kutangazwa, uthibitisho wa kwanza) zinaweza kuonyeshwa kwa mteja kama “malipo yamepokelewa, yanasubiri uthibitisho,” lakini hesabu ya bidhaa, utekelezaji wa oda, na otomatiki yoyote ya hatua zinazofuata vinapaswa kusubiri hali ya mwisho.

Programu-jalizi pia husakinisha dashibodi ya kiutawala ndani ya WordPress, ambapo mfanyabiashara anaweza kufuatilia oda na malipo ya ZEC yanayoingia pamoja na mwonekano wa kawaida wa oda ya WooCommerce. Programu-jalizi inaunga mkono aina zote za sasa za anwani za Zcash: Orchard, Sapling, na Uwazi. Wateja wanaolipa kutoka pochi yoyote inayotii viwango wanaweza kukamilisha muamala.

## Vipengele

**Isiyohifadhiwa na mtu mwingine.** Malipo husafiri moja kwa moja kutoka pochi ya mteja hadi pochi ya mfanyabiashara kupitia miamala ya faragha. ZGo haishikilii kamwe fedha katikati ya mchakato, na mfanyabiashara hubaki na udhibiti kamili wakati wote.

**Utekelezaji unaonyumbulika.** ZGo inaweza kutumika kwa alasiri moja katika soko la muda mfupi, kwa usanidi wa kudumu wa mahali pa mauzo, au kama mfumo wa nyuma wa duka la mtandaoni kupitia miunganisho ya Xero au WooCommerce.

**Inayotegemea kivinjari.** Hakuna usakinishaji kwa upande wa mteja au mfanyabiashara. ZGo hufanya kazi katika kivinjari chochote cha kisasa kwenye kompyuta au simu ya mkononi.

**Ulinganifu wa pochi.** Pochi kuu za Zcash, zikiwemo zile zinazounga mkono aina za anwani za Orchard, Sapling, na Uwazi, zinaweza kulipa ankara ya ZGo bila usanidi wa ziada kwa upande wa mteja.

**Miunganisho.** Miunganisho ya moja kwa moja na Xero (uhasibu) na WooCommerce (biashara ya kielektroniki) hushughulikia mitiririko miwili ya kazi ya kawaida zaidi ya wafanyabiashara bila usanidi wa ziada.

## Makosa ya kawaida

**Kuchukulia oda kuwa imelipwa kabla ya uthibitisho tano.** Muamala uliotangazwa si sawa na malipo yaliyothibitishwa. Muamala bado unaweza kushindwa kuthibitishwa au kubadilishwa. Ni baada tu ya uthibitisho tano ambapo ZGo huripoti malipo kuwa yamekamilika, na hapo tu ndipo oda inapaswa kutiwa alama kuwa imelipwa katika mifumo inayofuata. Ikiwa mfanyabiashara atasanidi hesabu ya bidhaa au utekelezaji wa oda kuanzishwa na tukio la kutangazwa, malipo ya ulaghai au yaliyoshindikana yatasababisha hasara halisi.

**Kuelekeza ZGo kwenye anwani ya kuweka amana ya soko la kubadilishana sarafu.** Inaonekana kama anwani ya Zcash, lakini anwani za kuweka amana za soko la kubadilishana sarafu hudhibitiwa na soko hilo, si mfanyabiashara. Soko la kubadilishana sarafu hushikilia funguo, jambo linalomaanisha kwamba linashikilia fedha, na hilo linabatilisha sababu ya kutumia kichakataji kisichohifadhiwa na mtu mwingine. Anwani ya pochi iliyosanidiwa katika ZGo lazima iwe ya pochi ambayo maneno ya kurejesha pochi yake yanadhibitiwa moja kwa moja na mfanyabiashara.

**Kuchukulia ZGo kama pochi.** ZGo ni kichakataji cha malipo, si pochi. Haihifadhi funguo, haishikilii salio, wala hairuhusu mfanyabiashara kutumia fedha. Pochi tofauti ya Zcash inayodhibitiwa na mfanyabiashara inahitajika ili kupokea fedha ambazo ZGo huelekeza.

## Hitimisho

ZGo huwapa wafanyabiashara njia ya kupokea malipo ya Zcash bila kuacha udhibiti, bila kutegemea mpatanishi, na bila kufichua maelezo ya muamala kwenye mnyororo wa umma. Miunganisho miwili (Xero na WooCommerce) hushughulikia mitiririko ya kazi ya kawaida zaidi ya wafanyabiashara; kwa kila kitu kingine, ZGo inaweza kutumika kivyake kutoka kivinjari chochote.

Kwa usanidi, njia ni fupi: pata pochi ya Zcash, unda akaunti katika [zgo.cash](https://zgo.cash/), kisha anza kuzalisha maombi ya malipo moja kwa moja au sakinisha muunganisho unaohusika.

## Rasilimali

- [Tovuti rasmi ya ZGo](https://zgo.cash/)
- [Mwongozo wa Usanidi wa Muunganisho wa Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) na [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Ukurasa wa nyumbani wa mradi wa Zcash](https://z.cash/)
- [ZecHub Pochi](https://zechub.wiki/wallets), orodha ya pochi za Zcash zinazolingana
- [Muhtasari wa Vichakataji vya Malipo vya ZecHub](https://zechub.wiki/payment-processors), ZGo katika muktadha wa chaguo nyingine za malipo ya Zcash
- [Programu-jalizi ya BTCPayServer Zcash](https://zechub.wiki/guides/btcpayserver-zcash-plugin), mwongozo unaohusiana wa ZecHub kwa mbadala unaojikaribisha wenyewe
