<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>
# FROST


## Kwa ufupi

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) ni sahihi ya kizingiti na itifaki ya utengenezaji wa funguo uliosambazwa: watia sahihi kadhaa kila mmoja hushikilia sehemu ya ufunguo binafsi wa pamoja, na idadi ya kizingiti kati yao lazima ishirikiane ili kutengeneza sahihi moja.
* Kwa kuwa matokeo ni sahihi moja ya Schnorr, muamala [transaction] unaofanywa kwa njia hii huonekana kama muamala wa kawaida kwenye mtandao.
* Inahitaji duru chache za mawasiliano, inaweza kutekelezwa kwa sambamba, na inaweza kutambua na kumwondoa mshiriki mwenye tabia isiyofaa.
* Kwa Zcash, hii inamaanisha kuwa FROST huwezesha wahusika wengi waliotawanyika kijiografia kudhibiti mamlaka ya kutumia ya ZEC za faragha [shielded] — muhimu kwa uhifadhi, escrow, huduma zisizohifadhiwa na mtu mwingine, na Zcash Shielded Assets (ZSA).
* Iliundwa na Chelsea Komlo (Chuo Kikuu cha Waterloo, Zcash Foundation) na Ian Goldberg (Chuo Kikuu cha Waterloo).

## Maelezo ya Msingi

### Sahihi ya Schnorr ni nini?

Sahihi ya kidijitali ya Schnorr ni mkusanyiko wa algoriti: (KeyGen, Sign, Verify).

Sahihi za Schnorr zina faida kadhaa. Faida moja muhimu ni kwamba funguo nyingi zinapotumiwa kutia sahihi ujumbe uleule, sahihi zinazotokana zinaweza kuunganishwa kuwa sahihi moja. Hii inaweza kupunguza kwa kiasi kikubwa ukubwa wa malipo [payments] ya multisig na miamala mingine inayohusiana na multisig.

### FROST ni nini?

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*Iliundwa na Chelsea Komlo (Chuo Kikuu cha Waterloo, Zcash Foundation) na Ian Goldberg (Chuo Kikuu cha Waterloo).*

FROST ni sahihi ya kizingiti na itifaki ya utengenezaji wa funguo uliosambazwa inayohitaji duru chache za mawasiliano na inaweza kutekelezwa kwa sambamba. Itifaki ya FROST ni toleo la kizingiti la mpango wa sahihi wa Schnorr.

Tofauti na sahihi katika mazingira ya mhusika mmoja, sahihi za kizingiti zinahitaji ushirikiano kati ya idadi ya kizingiti ya watia sahihi, ambao kila mmoja hushikilia sehemu ya ufunguo binafsi wa pamoja.

[Sahihi za Kizingiti ni Nini? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Kwa hiyo, kutengeneza sahihi katika mazingira ya kizingiti huleta mzigo wa ziada kutokana na duru za mtandao kati ya watia sahihi, na hivyo kuwa gharama kubwa wakati sehemu za siri zinahifadhiwa kwenye vifaa vyenye uwezo mdogo wa mtandao au uratibu unapofanyika kupitia mitandao isiyotegemewa.

Mzigo wa ziada wa mtandao wakati wa shughuli za kutia sahihi hupunguzwa kwa kutumia mbinu mpya inayolinda dhidi ya mashambulizi ya kughushi na inayoweza kutumika pia kwa mipango mingine.

FROST huboresha itifaki za sahihi za kizingiti kwa kuruhusu idadi isiyo na kikomo ya shughuli za kutia sahihi kutekelezwa kwa usalama kwa sambamba (concurrency).

Inaweza kutumika kama itifaki ya duru 2, ambapo watia sahihi hutuma na kupokea jumla ya ujumbe 2, au kama itifaki iliyoboreshwa ya kutia sahihi ya duru moja yenye hatua ya uchakataji wa awali.

FROST hupata maboresho yake ya ufanisi kwa sehemu kwa kuruhusu itifaki kusitishwa kunapokuwa na mshiriki mwenye tabia isiyofaa, ambaye hutambuliwa na kutengwa na shughuli za baadaye.

Mathibitisho ya usalama yanayoonyesha kwamba FROST ni salama dhidi ya mashambulizi ya ujumbe uliochaguliwa, kwa kudhani kwamba tatizo la logariti tofauti ni gumu, na kwamba mshambulizi anadhibiti washiriki wachache kuliko kizingiti, yametolewa [hapa](https://eprint.iacr.org/2020/852.pdf#page=16).

### FROST hufanyaje kazi?

Itifaki ya FROST ina vipengele 2 muhimu:

Kwanza, washiriki n hutekeleza itifaki ya utengenezaji wa funguo uliosambazwa (DKG) ili kutengeneza ufunguo wa pamoja wa uthibitishaji. Mwishoni, kila mshiriki hupata sehemu ya ufunguo binafsi wa siri na sehemu ya ufunguo wa umma wa uthibitishaji.

Baadaye, washiriki wowote t kati ya n wanaweza kutekeleza itifaki ya kutia sahihi ya kizingiti ili kwa pamoja kutengeneza sahihi halali ya Schnorr.

<a href="">
    <img src="/content-images/1634081807-frost-flexible-round-optimize-3697a713d9.webp" alt="" width="400" height="300"/>
</a>

## Taswira / Mfano

Fikiria FROST kama sanduku la amana salama linalofunguka tu wakati washikaji kadhaa wa funguo walioidhinishwa wanageuza funguo zao pamoja — lakini si kila mshikaji wa ufunguo anahitajika; idadi maalumu tu inatosha (kwa mfano, washikaji wowote 3 kati ya 5). Sanduku linapofunguliwa, mtazamaji wa nje hawezi kujua ni washikaji gani wa funguo waliokuja, au hata kwamba zaidi ya mmoja alihusika. Kwa namna hiyo hiyo, kikundi kinaweza kuidhinisha kwa pamoja muamala wa Zcash huku mtandao ukiona sahihi moja tu yenye mwonekano wa kawaida.

## Uchambuzi wa Kina

**Utengenezaji wa funguo uliosambazwa (DKG)**

Lengo la awamu hii ni kutengeneza sehemu za ufunguo siri za muda mrefu na ufunguo wa pamoja wa uthibitishaji. Awamu hii hutekelezwa na washiriki n.

FROST hujenga awamu yake ya utengenezaji wa funguo juu ya DKG ya Pedersen (GJKR03), ambayo hutumia ugawaji wa siri wa Shamir na mipango ya ugawaji wa siri unaoweza kuthibitishwa ya Feldman kama taratibu za ziada. Aidha, kila mshiriki lazima athibitishe ujuzi wa siri yake mwenyewe kwa kutuma thibitisho la maarifa sifuri [zero-knowledge proof] kwa washiriki wengine, ambalo lenyewe ni sahihi ya Schnorr. Hatua hii ya ziada hulinda dhidi ya mashambulizi ya rogue-key wakati t ≥ n/2.

Mwishoni mwa itifaki ya DKG, ufunguo wa pamoja wa uthibitishaji vk hutengenezwa. Kila mshiriki Pᵢ hushikilia thamani (i, skᵢ ) ambayo ni sehemu yake ya siri ya muda mrefu na sehemu ya ufunguo wa uthibitishaji vkᵢ = skᵢ *G. Sehemu ya ufunguo wa uthibitishaji vkᵢ ya mshiriki Pᵢ hutumiwa na washiriki wengine kuthibitisha usahihi wa sehemu za sahihi za Pᵢ wakati wa awamu ya kutia sahihi, huku ufunguo wa uthibitishaji vk ukiutumiwa na wahusika wa nje kuthibitisha sahihi zinazotolewa na kikundi.

**Kutia Sahihi kwa Kizingiti**

Awamu hii hujenga juu ya mbinu zinazojulikana zinazotumia ugawaji wa siri wa kujumlisha na ubadilishaji wa sehemu ili kutengeneza nonce kwa kila sahihi bila mwingiliano. Pia hutumia mbinu za kufunga ili kuepuka mashambulizi ya kughushi yanayojulikana bila kupunguza utekelezaji wa sambamba.

Katika hatua ya uchakataji wa awali, kila mshiriki huandaa idadi maalumu ya jozi za nukta za Elliptic Curve (EC) kwa matumizi ya baadaye. Hatua hii hutekelezwa mara moja katika awamu nyingi za kutia sahihi kwa kizingiti.

<a href="">
    <img src="/content-images/preprocess-5cbb14f892.webp" alt="" width="400" height="300"/>
</a>

Duru ya 1 ya Kutia Sahihi: Kila mshiriki Pᵢ huanza kwa kutengeneza jozi moja binafsi ya nonce (dᵢ, eᵢ) na jozi inayolingana ya nukta za EC (Dᵢ, Eᵢ), kisha hutangaza jozi hii ya nukta kwa washiriki wengine wote. Kila mshiriki huhifadhi jozi hizi za nukta za EC kwa matumizi ya baadaye. Duru za 2 na 3 za kutia sahihi ndizo shughuli halisi ambazo washiriki t kati ya n hushirikiana kutengeneza sahihi halali ya Schnorr.

Duru ya 2 ya Kutia Sahihi: Washiriki hufanya kazi pamoja kutengeneza sahihi halali ya Schnorr. Mbinu kuu ya duru hii ni ugawaji wa siri wa kujumlisha wa t kati ya t.

Hatua hii huzuia mashambulizi ya kughushi kwa sababu washambulizi hawawezi kuunganisha sehemu za sahihi katika shughuli tofauti za kutia sahihi au kubadilisha mpangilio wa watia sahihi au nukta zilizochapishwa kwa kila mtia sahihi.

<a href="">
    <img src="/content-images/sign-402794d36a.webp" alt="" width="400" height="300"/>
</a>

Baada ya kukokotoa changamoto c, kila mshiriki anaweza kukokotoa jibu zᵢ kwa kutumia nonce za matumizi ya mara moja na sehemu za siri za muda mrefu, ambazo ni sehemu za siri za Shamir za t kati ya n (digrii t-1) za ufunguo wa muda mrefu wa kikundi. Mwishoni mwa duru ya 2 ya kutia sahihi, kila mshiriki hutangaza zᵢ kwa washiriki wengine.

[Soma waraka kamili](https://eprint.iacr.org/2020/852.pdf)

### Matumizi ya FROST katika mfumo mpana wa ikolojia

**FROST katika [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Ili kuboresha ufanisi wa mifumo ya kutia sahihi kwa kizingiti ya Coinbase, walitengeneza toleo la FROST. Utekelezaji huu wa Coinbase hufanya mabadiliko madogo kutoka rasimu asili ya FROST.

Walichagua kutotumia jukumu la mkusanyaji wa sahihi. Badala yake, kila mshiriki ni mkusanyaji wa sahihi. Muundo huu ni salama zaidi: washiriki wote katika itifaki huthibitisha ukokotoaji wa wengine, na hivyo kufikia kiwango cha juu zaidi cha usalama na kupunguza hatari. Hatua ya uchakataji wa awali ya mara moja pia iliondolewa ili kuharakisha utekelezaji, huku duru ya tatu ya kutia sahihi ikitumiwa badala yake.

---

**[ROAST](https://eprint.iacr.org/2022/550.pdf) na Blockstream**

Uboreshaji mahususi wa matumizi wa FROST unapendekezwa kutumiwa kwenye [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) kwa Bitcoin.

“ROAST ni kifuniko rahisi kinachozunguka mipango ya sahihi za kizingiti kama FROST. Inahakikisha kwamba akidi ya watia sahihi waaminifu, kwa mfano, watendaji wa Liquid, inaweza daima kupata sahihi halali hata kunapokuwa na watia sahihi wanaovuruga wakati miunganisho ya mtandao ina latency ya juu kwa kiwango chochote.”

---

**FROST katika IETF**

Internet Engineering Task Force, iliyoanzishwa mwaka 1986, ni shirika kuu la maendeleo ya viwango kwa ajili ya Intaneti. IETF hutengeneza viwango vya hiari ambavyo mara nyingi hupitishwa na watumiaji wa Intaneti, waendeshaji wa mitandao, na wauzaji wa vifaa, na kusaidia kuunda mwelekeo wa Intaneti.

Toleo la 11 la FROST (lahaja ya duru 2) [limewasilishwa kwa IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Hii ni hatua muhimu kuelekea tathmini kamili ya FROST kama kiwango kipya cha mpango wa sahihi za kizingiti kwa matumizi katika Intaneti yote, kwenye vifaa vya hardware, na kwa huduma nyingine katika miaka ijayo.


## Athari za Kivitendo

Ndiyo, kabisa. Kuanzishwa kwa FROST katika Zcash kutaruhusu wahusika wengi, waliotawanyika kijiografia, kudhibiti mamlaka ya kutumia ya ZEC za faragha. Miamala inayotangazwa kwa kutumia mpango huu wa sahihi haitatofautishwa na miamala mingine kwenye mtandao, ikidumisha upinzani thabiti dhidi ya ufuatiliaji wa malipo na kupunguza kiasi cha data ya blockchain kinachopatikana kwa uchambuzi.

Kwa vitendo, hii huwezesha programu mbalimbali mpya kujengwa kwenye mtandao, kuanzia watoa huduma wa escrow hadi huduma nyingine zisizohifadhiwa na mtu mwingine.

FROST pia itakuwa sehemu muhimu katika utoaji na usimamizi salama wa Zcash Shielded Assets (ZSA), ikiwezesha usimamizi salama zaidi wa mamlaka ya kutumia ndani ya mashirika ya maendeleo na wahifadhi ZEC kama masoko ya kubadilishana sarafu [exchanges], huku ikitoa uwezo huu pia kwa watumiaji wa Zcash.

## Makosa ya Kawaida

**Kuchanganya FROST na multisig ya jadi ya on-chain**. Multisig ya jadi inaweza kufichua watia sahihi wengi au sahihi nyingi on-chain. FROST hutengeneza sahihi moja ya Schnorr iliyojumlishwa, hivyo muamala hautofautishwi na muamala wenye sahihi moja.

**Kudhani kuwa idadi ndogo kuliko kizingiti inaweza kutia sahihi**. Idadi ya kizingiti pekee (t kati ya n) ya washiriki wanaotenda pamoja inaweza kutengeneza sahihi halali; kikundi chochote kidogo zaidi hakiwezi.

**Kudhani kuwa FROST huficha kila kitu off-chain**. FROST hulinda sahihi ya on-chain, lakini uratibu kati ya watia sahihi bado hufanyika off-chain na huhitaji vidhibiti vyake vya faragha na usalama.


## Kurasa Zinazohusiana

- [Halo](/zcash-tech/halo) — mfumo wa thibitisho usiohitaji kuaminiana, unaojirudia, unaotumika katika bwawa la Zcash la faragha la Orchard.
- [Funguo za Kutazama](/zcash-tech/viewing-keys) — selective disclosure kwa miamala ya faragha.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ambapo FROST husaidia kusimamia mamlaka ya kutumia/kutoa.
- [Usawazishaji wa Pochi wa Zcash](/zcash-tech/zcash-wallet-syncing) — sehemu nyingine kuu ya miundombinu ya faragha ya Zcash.


## Kujifunza Zaidi

[Coinbase Makala - Sahihi za Kizingiti](https://www.coinbase.com/blog/threshold-digital-signatures)

[Ugawaji wa Siri wa Shamir - Maelezo na Mfano](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Video Fupi kuhusu Sahihi za Kidijitali za Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
