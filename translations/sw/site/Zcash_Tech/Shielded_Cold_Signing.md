# Uwekaji Sahihi wa Kibaridi wa Faragha

> **Wazo kuu:** Pochi saidizi huona kila kitu kinachohitajika ili kuunda na kufuatilia muamala wa faragha. Hardware wallet pekee ndiyo hushikilia mamlaka ya kuidhinisha matumizi ya pesa. Mgawanyo huo ndio lengo lote la uwekaji sahihi wa kibaridi wa faragha.

Kuweka faragha katika Zcash kunahusisha kuhamisha fedha kutoka anwani ya umma, ya uwazi hadi anwani ya faragha, iliyofichwa, huku maelezo ya muamala yakifichwa kwa kutumia vipengele vya faragha vya Zcash.

### Ni nini hubadilika unapoweka ZEC kwenye faragha?

Katika muamala wa uwazi wa Zcash, taarifa kama vile:

- anwani ya mtumaji
- anwani ya mpokeaji
- kiasi kilichohamishwa

zinaweza kuonekana kwenye blockchain.

Unapoweka ZEC kwenye faragha, fedha zako huhamishiwa kwenye bwawa la faragha (kama vile Ironwood). Blockchain inaweza kuthibitisha kwamba muamala ni halali bila kufichua maelezo ya faragha ya muamala wako. Tangu uboreshaji wa NU6.3 tarehe 28 Julai 2026, fedha mpya zilizowekwa kwenye faragha huingia kwenye bwawa la Ironwood, kwa kuwa bwawa la zamani la Orchard halikubali tena amana mpya lakini bado huruhusu utoaji wa fedha.

### Vipengele vya Muamala wa Faragha

### 1. Dokezo (Rekodi ya Salio la Faragha)

Dokezo ni rekodi ya faragha ya kriptografia inayowakilisha kiasi cha ZEC ambacho hakijatumika, na kinachomilikiwa na mtumiaji.

Tofauti na blockchain ya umma, ambamo salio huorodheshwa kwa maandishi yanayosomeka wazi, dokezo la faragha husimba thamani na maelezo ya umiliki ili waangalizi wa on-chain wasiweze kuona ni nani anayemiliki fedha hizo.

Mtumiaji anapoanzisha muamala, pochi saidizi huchanganua daftari la leja, hubaini madokezo ya mtumiaji ambayo hayajatumika, na kuchagua madokezo yatakayotumika.

### 2. Nullifier (Utaratibu wa Kugundua Matumizi Mara Mbili)

Kwa kuwa maelezo ya dokezo yamefichwa kutoka kwenye daftari la leja la umma, mtandao unahitaji utaratibu wa kugundua matumizi mara mbili bila kufichua ni dokezo gani linalotumika.

Nullifier ni alama ya kipekee ya kriptografia inayotokana na dokezo mahususi. Dokezo linapotumika, nullifier yake huchapishwa kwenye blockchain.

Mtandao huthibitisha kwamba nullifier hiyo haijarekodiwa awali. Ikiwa haijarekodiwa, matumizi hayo yanaweza kukubaliwa. Jambo la msingi ni kwamba mwangalizi wa nje hawezi kutumia nullifier kubaini dokezo mahususi ilikotoka.

Pochi saidizi hutokana na nullifier inayofaa na kuijenga kama sehemu ya kuandaa data ya muamala.

## Funguo

Funguo ni vipande vya taarifa za kriptografia vinavyodhibiti ufikiaji wa fedha zako na kuruhusu pochi yako kufanya shughuli kama vile kupokea, kutazama na kutumia ZEC.

Pochi huwa na funguo kadhaa tofauti, kila moja ikiwa na kazi yake, kama vile akaunti moja inavyoweza kuwa na vitambulisho tofauti vya ufikiaji wa kusoma na kuandika.

Funguo ni muhimu katika uhusiano kati ya pochi saidizi na hardware wallet, kwa sababu funguo tofauti hutumikia madhumuni tofauti, na ni ufunguo mmoja tu unaohitaji kuwekwa sehemu iliyofungwa.

Ni muhimu kujua kwamba kila bwawa la faragha huunda funguo zake kama mti wa utokaji, ambapo mishale huonyesha kutoka kipengele kimoja hadi kile kinachoweza kutolewa kutoka kwake. Watumiaji wanaotaka kupokea malipo ya faragha lazima wawe na anwani ya malipo ya faragha, ambayo hutengenezwa kutoka kwa ufunguo wa kutumia pesa.

### Daraja la funguo

**1. Ufunguo wa kutumia pesa**

Huu ndio ufunguo nyeti zaidi kwa usalama. Hutoa uwezo wa kriptografia wa kuidhinisha matumizi ya ZEC.

Huu ndio ufunguo unaorejelewa kila mahali pengine katika ripoti hii panapotajwa kwamba “hardware wallet ina ufunguo.”

Katika usanifu wa uwekaji sahihi wa kibaridi, ufunguo wa kutumia pesa huwekwa ndani ya hardware wallet na hauonyeshwi kamwe kwa pochi saidizi. Pochi saidizi haipaswi kuhitaji kuwa na ufunguo huu hata kidogo.

Katika Sapling na Orchard, madaraja ya funguo hutoa mamlaka ya kutumia pesa na uwezo wa kutazama kama matawi mawili tofauti kutoka kwenye ufunguo wa msingi wa kutumia pesa:

- **Sapling:** Ufunguo mpana wa kutumia pesa (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) hutoa funguo zinazoidhinisha mathibitisho (𝑎𝑘,𝑛𝑠𝑘) na funguo kamili za kutazama (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘), ambazo nazo hutoa funguo za kutazama zinazoingia (𝑖𝑣𝑘) na anwani zilizotofautishwa.
- **Orchard:** Ufunguo wa msingi wa kutumia pesa (𝑠𝑘) hugawanyika moja kwa moja na kuwa ufunguo unaoidhinisha matumizi (𝑎𝑠𝑘) na ufunguo kamili wa kutazama (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Mgawanyo huu wa kimuundo hutoa msingi rasmi wa kriptografia wa kutenga funguo kwenye hardware. Pochi husafirisha tawi la kutazama (UFVK) hadi kwenye kompyuta mwenyeji kwa ajili ya kusawazisha salio na kuunda miamala, huku tawi linaloidhinisha matumizi likibaki limefungwa kabisa kwenye kifaa.

Utokaji wa funguo hufanyika katika mwelekeo mmoja tu. Hii ina maana kwamba funguo za kutazama haziwezi kutenduliwa ili kuunda upya mamlaka ya kutumia pesa. Kutoweza kutenduliwa huku kwa kriptografia hufanya usafirishaji wa Full Viewing Key ya Pamoja (UFVK) kuwa salama, kwa sababu hutoa mwonekano kamili wa pochi bila kufichua siri za matumizi ya pesa zilizo kwenye kifaa.

**2. Funguo za kutazama**

Zcash hutenganisha uwezo wa kuona shughuli za faragha na uwezo wa kuzitumia. Ufunguo wa kutazama huruhusu pochi au mhusika mwingine aliyeidhinishwa kuona taarifa kuhusu miamala ya faragha bila kumpa mamlaka ya kutumia pesa.

- **Full Viewing Key (FVK), iliyofungwa katika Full Viewing Key ya Pamoja (UFVK):** Hutolewa kimakusudi kutoka kwa ufunguo wa kutumia pesa. Huruhusu programu kugundua na kusimbua shughuli za faragha za pochi, na hivyo kutambua miamala. Pia huruhusu programu kukokotoa salio bila kuweza kuidhinisha matumizi ya pesa. Inaeleweka vyema kama chimbuko la ufunguo wa kutumia pesa lenye faragha ndogo zaidi, wala si nakala dhaifu ya seed.

Full Viewing Key (FVK) hutoa mwonekano kamili wa kusoma pekee huku ikidumisha utengano mkali wa kiusalama. Kwa kusimbua maandishi fiche ya madokezo yanayoingia na kutoka (kupitia kipengele chake cha ufunguo wa kutazama miamala inayotoka), pochi saidizi iliyo na FVK pekee inaweza kuonyesha historia kamili ya miamala yenye lebo, badala ya kuonyesha salio linalobadilika tu.

Anwani nyingi za malipo zilizotofautishwa na zisizoweza kuhusishwa hutumia FVK na ufunguo wa kutazama unaoingia (IVK) uleule, hivyo kuruhusu utengenezaji wa anwani zisizo na kikomo bila kuongeza mzigo wa kuchanganua blockchain.

Utengano huu wa kiutendaji ndio msingi wa taratibu za uwekaji sahihi wa kibaridi. Uchanganuzaji endelevu wa mnyororo, ufuatiliaji wa historia na usimamizi wa anwani hukabidhiwa kwa programu kwenye kompyuta mwenyeji, huku mamlaka ya kutumia pesa ikibaki imetengwa kwenye kifaa cha hardware.

![Key derivation diagrams](/content-images/key-derivation-diagrams.webp)

### Tofauti muhimu: UFVK dhidi ya ufunguo wa kutumia pesa

> **UFVK inaweza kushirikiwa. Ufunguo wa kutumia pesa lazima ubaki kwenye hardware wallet.**
>
> Pochi saidizi hutumia ufunguo wa kutazama kufuatilia pochi, kugundua fedha zinazoingia, kutambua madokezo na kusaidia kuandaa miamala. Haina ufunguo wa faragha unaohitajika kuidhinisha matumizi ya pesa.

Kama ilivyotajwa awali, utengano wa funguo ndio msingi wa usanifu wa uwekaji sahihi wa kibaridi.

Pochi saidizi inaweza kufanya sehemu kubwa ya kazi inayohitajika kuandaa muamala bila kuwa na udhibiti wowote juu ya fedha. Hardware wallet inahitaji tu kupokea muamala ulioandaliwa na kufanya shughuli ya mwisho ya kuweka sahihi.

Watengenezaji wa hardware wallet hawahitaji kubuni utengano huu wenyewe. Muundo wa funguo wa Zcash tayari hutenganisha uwezo wa kutazama na mamlaka ya kutumia pesa katika kiwango cha itifaki. Watengenezaji hujenga tu vipengele vyao vya kuweka sahihi na kusafirisha data juu ya muundo huo uliopo. Itifaki huruhusu taarifa kama vile anwani ya faragha au ufunguo kamili wa kutazama kutolewa kutoka kwa ufunguo wa kutumia pesa, huku ufunguo wenyewe wa kutumia pesa ukibaki kuwa wa faragha. Hivyo, hardware wallet kama vile Ledger, Keystone na Hito zinaweza kuipa programu saidizi taarifa za kutazama inayohitaji bila kamwe kufichua ufunguo wa faragha unaoweza kutumia fedha.

### Pochi saidizi hufanya nini hasa kwa kutumia taarifa za funguo

Kwa kutumia taarifa za ufunguo wa kutazama, pochi saidizi inaweza:

- kutambua fedha na madokezo yako
- kubaini madokezo yanayoweza kutumika
- kutoa au kutambua anwani husika
- kuunda muamala
- kuzalisha au kuratibu mathibitisho yanayohitajika
- kuandaa muamala kwa ajili ya kuweka sahihi

Ni muhimu kujua kwamba kuhitaji kuunda muamala si sawa na kuhitaji ufunguo wa faragha wa kutumia pesa. Utenganisho huo ni mojawapo ya mawazo makuu ya usalama yanayowezesha kuunganisha hardware wallet.

## Uundaji na Uidhinishaji wa Muamala wa Faragha

Hizi ndizo taratibu zinazohusika katika kuunda na kuidhinisha muamala. Kwa ufupi, taratibu hizi zinaeleza kile ambacho pochi hufanya hasa kwa kutumia data hiyo kutuma pesa:

### Uundaji wa Muamala (Kuunda Muamala wa Faragha)

Uundaji wa muamala ni mchakato wa kukusanya taarifa zinazohitajika ili kuunda muamala halali wa Zcash kutokana na malipo ambayo mtumiaji anakusudia kufanya.

Mchakato wa uundaji wa muamala hukusanya madokezo yaliyochaguliwa, wapokeaji, kiasi, ada, nullifiers na data nyingine za muamala zinazohitajika, kisha kuviweka katika muundo wa muamala. Kwa miamala ya faragha, pia huandaa taarifa zinazohitajika ili kuzalisha mathibitisho ya maarifa sifuri na sahihi zinazohitajika.

Kwa kawaida pochi saidizi ndiyo hufanya hatua hii. Hu

- Chagua madokezo yatakayotumika
- Bainisha pembejeo na matokeo ya muamala
- Kokotoa thamani zinazohitajika
- Andaa data ya muamala itakayothibitishwa na kutiwa sahihi baadaye.

Katika usanidi wa uwekaji sahihi wa kibaridi, data ya muamala inayotokana na hatua hii inaweza kufungwa ndani ya PCZT na kupelekwa kwenye hardware wallet kwa hatua muhimu ya kiusalama ya kuweka sahihi.

### Kuthibitisha (Kuonyesha Uhalali wa Itifaki)

Kuthibitisha kunarejelea uzalishaji wa mathibitisho ya maarifa sifuri (kama vile Halo 2 au Groth16) yanayoonyesha kwamba muamala unafuata kanuni za itifaki ya Zcash.

Thibitisho husaidia mtandao kuhakikisha kwamba:

- Mtumiaji anayetumia pesa ameidhinishwa kutumia madokezo
- Madokezo hayo yapo kweli
- Nullifiers zinazohusika ni za kipekee
- Jumla ya pembejeo ni sawa na jumla ya matokeo pamoja na ada.

Hufanya yote haya bila kufichua maelezo yoyote ya faragha yaliyo msingi wake.

Uzalishaji wa mathibitisho huhitaji sana uwezo wa kompyuta. Kukabidhi jukumu hili kwa kifaa saidizi huzuia hardware wallet kusimama au kuishiwa na kumbukumbu.

### Kuweka Sahihi (Kuidhinisha Matumizi ya Pesa)

Kuweka sahihi ni tofauti kabisa na kuthibitisha. Sahihi ya kidijitali hufanya kazi kama muhuri dhahiri wa idhini unaotolewa na mwenye ufunguo wa faragha.

Ingawa thibitisho la maarifa sifuri huthibitisha uhalali wa muamala, sahihi ya kidijitali huthibitisha mamlaka ya kutumia pesa. Sahihi huthibitisha kwamba mmiliki halisi anakubali vigezo maalumu vya uhamisho.

Kuweka sahihi hakuhitaji uwezo mkubwa wa kompyuta, hivyo kunafaa kwa hardware wallet.

### Uwekaji sahihi wa kibaridi wa faragha ni nini?

Uwekaji sahihi wa kibaridi wa faragha ni njia ya kuidhinisha muamala wa faragha wa Zcash huku funguo za faragha za kutumia pesa zikitengwa na pochi saidizi iliyounganishwa kwenye intaneti. Muamala unaweza kuundwa na kuandaliwa kwenye kompyuta iliyo mtandaoni, huku hardware wallet tofauti, iliyowekwa nje ya mtandao au kutengwa kwa njia nyingine, ikitumia funguo zake zilizolindwa kuidhinisha muamala.

Mchakato unaweza kufupishwa hivi:

![Shielded cold signing process](/content-images/cold-signing-process.webp)

Pochi saidizi hutuma vigezo vya muamala vilivyopangwa kwa kifaa cha hardware, ambacho hutia sahihi taarifa hiyo ndani yake bila kamwe kuachia ufunguo wa faragha wa kutumia pesa kwa kompyuta mwenyeji.

## Pochi Saidizi na Hardware Wallets

Miamala ya faragha inaweza kuhusisha pochi saidizi na hardware wallet, huku kila moja ikitimiza jukumu tofauti.

### Pochi saidizi

Pochi saidizi ni nini?

Pochi saidizi huendeshwa kwenye kompyuta au kifaa cha mkononi na hufanya kazi nyingi zinazohusika katika kuunda muamala, kama vile:

- Kuchagua madokezo yatakayotumika
- Kuunda muamala
- Kukokotoa data ya muamala inayohitajika
- Kuratibu uzalishaji wa mathibitisho ya maarifa sifuri yanayohitajika.

### Kwa nini pochi saidizi ni muhimu?

Pochi saidizi hushughulikia mchakato wa kuunda muamala, lakini kompyuta ikipata programu hasidi, mshambuliaji anaweza:

- kuona unachofanya,
- kurekebisha muamala ambao haujatiwa sahihi,
- kujaribu kukudanganya ili uidhinishe jambo fulani.

Pochi saidizi haihitaji kufikia ufunguo wa faragha uliohifadhiwa kwenye hardware wallet. Kwa hiyo, inaweza kushughulikia uundaji wa muamala na kazi nyingine za kikompyuta huku hardware wallet ikiwa mpaka wa usalama wa ufunguo wa faragha.

### Hardware wallet

Hardware wallet ni kifaa halisi kilicho nje ya mtandao ambacho hutenga funguo zako za faragha kutoka kwenye simu au kompyuta zilizounganishwa, na kufanya kazi kama hifadhi salama ya mali zako za kripto.

### Kwa nini hardware wallet ni muhimu?

Kompyuta yako ikipata programu hasidi, mshambuliaji anaweza:

- kuona unachofanya,
- kurekebisha muamala ambao haujatiwa sahihi,
- kujaribu kukudanganya ili uidhinishe jambo fulani.

Ufunguo wa faragha hauwezi kutolewa tu kutoka kwenye hardware wallet, hivyo kifaa hicho kinaweza kuwa mpaka wa usalama.

Picha: uwezo wa pochi saidizi dhidi ya hardware wallet

Utengano kati ya pochi hizi mbili ni muhimu hasa kwa miamala ya faragha, kwa sababu ni changamano zaidi kuliko miamala ya uwazi na huhusisha vipengele kama vile madokezo ya faragha, nullifiers, commitments, mathibitisho ya maarifa sifuri na sahihi za miamala.

Haiwezekani kwa vitendo kwa hardware wallet kufanya shughuli zote za kikompyuta. Badala yake, pochi saidizi huandaa muamala na kuipa hardware wallet taarifa zinazohitajika kwa ajili ya kuweka sahihi, huku ufunguo wa faragha wa kutumia pesa ukiendelea kutengwa ndani ya kifaa cha hardware.

## Kutenganisha Funguo

> Kutenganisha funguo kunamaanisha kwamba funguo za siri zinazoweza kuidhinisha matumizi ya pesa haziondoki kwenye hardware wallet. Pochi saidizi inaweza kuandaa muamala; haiwezi kuutia sahihi.

Kutenganisha funguo kunahusu kuweka funguo za siri zinazohitajika kuidhinisha muamala kando na pochi saidizi na kifaa kinachoiendesha. Katika usanidi wa kutia sahihi miamala ya faragha bila muunganisho wa intaneti, pochi saidizi inaweza kuunda muamala na kuratibu mathibitisho yanayohitajika, huku hardware wallet ikitenga funguo nyeti za siri za kutumia pesa.

Ikiwa kompyuta au simu saidizi imeathiriwa, mshambulizi anaweza kuingiliana na muamala kabla ya kutiwa sahihi, lakini kwa hakika hawezi kutoa ufunguo wa siri kutoka kwenye hardware wallet. Kwa hiyo, ufunguo hubaki ndani ya mpaka wa usalama wa kifaa cha maunzi.

Utengano huu huruhusu pochi saidizi kuunda miamala na kutekeleza kazi za kimahesabu bila kuipa ufikiaji wa moja kwa moja wa nyenzo za ufunguo zinazohitajika kuidhinisha muamala.

![Key isolation](/content-images/key-isolation.webp)

Tofauti muhimu ya kuelewa ni kwamba “ufunguo wa kutazama” haumaanishi programu inapokea toleo dhaifu zaidi la seed.

Katika Zcash, Full Viewing Key (FVK/UFVK) hutokana kimakusudi na ufunguo wa kutumia pesa na humpa mwenye kuushikilia uwezo wa kugundua na kufungua shughuli husika za faragha, lakini si kuidhinisha matumizi ya pesa. FVK ni toleo linalohitaji usiri mdogo zaidi linalotokana na ufunguo wa kutumia pesa.

**Tahadhari moja muhimu kuhusu faragha:**

Kwa hiyo, inapaswa kufahamika kwamba programu haiwezi kuiba pesa kwa kutumia UFVK pekee, lakini inaweza kuona shughuli za faragha za pochi.

Ndiyo maana ni sahihi zaidi kueleza kwamba programu saidizi ina *mamlaka ya kutazama*, badala ya kusema tu kwamba ina “taarifa za umma.”

Njia rahisi zaidi ya kueleza wazo zima ni kwamba pochi saidizi hupata nyenzo za kutosha za ufunguo kujua kinachotendeka kwenye pochi, lakini si za kutosha kuidhinisha kinachotendeka kwa pesa za pochi. Hata hivyo, hardware wallet hutenga mamlaka ya kutumia pesa na kuitumia tu mtumiaji anapoidhinisha muamala.

Huo ndio msingi wa muundo wa kutenganisha funguo katika miundo hii ya hardware wallet ya Zcash ya faragha, na muundo huohuo unaonekana, katika utekelezaji mbalimbali, kwenye Ledger, Keystone, na Hito ambazo zitajadiliwa hivi karibuni.

## PCZT

PCZT humaanisha Muamala wa Zcash Ulioundwa kwa Sehemu. Ni kifurushi kinachobeba muamala wa Zcash na taarifa zinazohitajika kuukamilisha kutoka hatua moja hadi nyingine.

Ni fomati sanifu ya muamala wa Zcash wakati muamala bado unaundwa. Huruhusu washiriki au vifaa mbalimbali kutekeleza sehemu mbalimbali za mchakato wa kuunda muamala na kupitisha muamala uliokamilishwa kwa sehemu baina yao.

Kuunda muamala ni jambo changamano zaidi kuliko kutia sahihi uhamisho rahisi wa umma katika itifaki za sarafu za maarifa sifuri kama vile Zcash. Miamala ya faragha huhitaji mathibitisho ya maarifa sifuri yanayohitaji nguvu kubwa ya kimahesabu, kama yale yanayotengenezwa kwa kutumia Halo 2 au Groth16. Kwa hiyo, vifaa vyenye nguvu ndogo kama hardware wallet huenda vikakosa kumbukumbu na uwezo wa uchakataji wa kushughulikia mtiririko mzima wa muamala.

PCZT hushughulikia changamoto kadhaa kuu katika usanifu wa sarafu fiche za faragha. PCZT ni fomati sanifu ya data ya kati inayogawa uundaji wa muamala katika majukumu ya moduli huru. Huruhusu kompyuta saidizi yenye nguvu kushughulikia ukusanyaji wa muamala na utengenezaji wa mathibitisho, huku hardware wallet isiyo mtandaoni ikizuiwa kutekeleza uidhinishaji na utiaji sahihi pekee.

### Vikwazo vya Vifaa na Hifadhi Baridi

Ingawa hardware wallet hutoa mazingira salama ya kulinda funguo za siri za kutumia pesa, kwa kawaida zina RAM, nguvu ya kompyuta na uwezo wa kuhamisha data ulio mdogo ikilinganishwa na kompyuta saidizi. Vikwazo hivi huzifanya zisiweze kwa vitendo kutengeneza mathibitisho ya maarifa sifuri yanayohitaji nguvu kubwa ya kimahesabu au kudumisha hali kamili ya muamala inayohitajika wakati wa kuunda muamala.

Kwa hiyo, pochi saidizi inaweza kushughulikia kazi zinazohitaji nguvu kubwa ya kimahesabu, huku hardware wallet ikijikita katika kazi muhimu kwa usalama ya kuidhinisha muamala kwa funguo zake za kutumia pesa zilizolindwa.

Hili linakufanya ujiulize: ikiwa kifaa kina vikwazo hivi, kinawezaje bado kufanya *uthibitishaji wa kutosha* ili kiaminike?

Kwa ufupi, hardware wallet haiwezi kupokea thamani yoyote kutoka kwa kompyuta saidizi na kuitia sahihi. Inahitaji taarifa za kutosha kuthibitisha kwamba thamani inayotiwa sahihi inalingana na muamala ambao mtumiaji anakusudia kuidhinisha. Hili huleta changamoto ya kupata uwiano, kwa sababu kifaa lazima kichanganue na kuthibitisha vya kutosha ili kulinda mchakato wa utiaji sahihi, huku kikifanya kazi ndani ya mipaka mikali ya kumbukumbu, uchakataji, ukubwa wa firmware na uchangamano wa utekelezaji.

Ushughulikiaji wa Orchard PCZT wa Ledger ni mfano wa changamoto hii. Unaonyesha kwamba uchanganuzi maalumu unaotegemea circuit unaweza kurahisisha utekelezaji kwenye vifaa vyenye vikwazo, lakini pia unaweza kuhitaji mabadiliko ya firmware wakati miundo ya miamala au circuit zinazotumika zinabadilika.

Juhudi mbili zinazoendelea zinaonyesha njia tofauti za kukabiliana na kikwazo hiki.

Pendekezo la utafiti kuhusu mfumo wa uthibitishaji unaotumia muda usiobadilika kabisa, unaofaa kwa usanifu wa hardware wallet za chanzo huria na kompyuta za kawaida, liliwasilishwa katika Ruzuku #423. Lengo lilikuwa kuchunguza miundombinu ya kriptografia inayoweza kutekelezwa kwa usalama katika mazingira kama C au Rust huku ikipunguza uchangamano na mzigo wa matengenezo ya usaidizi wa Zcash ya faragha.

Hata hivyo, njia mbadala inawakilishwa na **Zcash SeedSigner** inayopendekezwa, ambayo ni kifaa cha kutia sahihi cha chanzo huria, kilichotenganishwa na intaneti na kujengwa kwa vipengele vya bei nafuu vinavyopatikana kwa urahisi. Mtiririko wake wa kazi unaopendekezwa huweka kompyuta saidizi kando na kifaa cha kutia sahihi, na kupitisha PCZT kupitia pengo la hewa kwa ajili ya uthibitishaji na utiaji sahihi kwenye kifaa.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Kwa pamoja, njia hizi zinaonyesha changamoto pana ya uhandisi iliyo nyuma ya hardware wallet za faragha: uundaji wa miamala na uthibitishaji vinaweza kufanyika nje ya kifaa muhimu kwa usalama, lakini kifaa cha kutia sahihi bado kinahitaji taarifa na uwezo wa kutosha wa uthibitishaji ili kuidhinisha muamala unaotokana nao kwa usalama.

### PCZT Huwezesha Usanifu wa Mgawanyo wa Majukumu

Kiwango cha Muamala wa Zcash Ulioundwa kwa Sehemu (PCZT) ni muundo rasmi wa data unaounganisha pochi saidizi na hardware wallet.

Pochi saidizi inaweza kuchagua madokezo, kukokotoa nullifier na kutengeneza thibitisho la maarifa sifuri yenyewe. Hili linawezekana kwa sababu taarifa zinazohitajika kwa hatua hizi, zikiwemo ufunguo unaotumiwa kukokotoa nullifier, hutokana na ufunguo wa kutazama badala ya kitu chochote kinachohusiana na mamlaka ya kutumia pesa. Kisha pochi saidizi huweka vipengele hivi kwenye kontena la PCZT.

PCZT hukabidhiwa kwa hardware wallet, ambayo husoma muktadha wa muamala (kama vile kiasi na anwani za wapokeaji), hutumia funguo zake za kutumia pesa zilizolindwa kutia sahihi, kisha hukabidhi PCZT iliyosasishwa kwa kifaa saidizi.

Muundo huu huweka mpaka mkali wa usalama: maunzi yenye nguvu ya kompyuta ya upande wa mwenyeji yanaweza kufanya hesabu changamano za maarifa sifuri bila kuhitaji ufikiaji wa funguo za kutumia pesa, huku vifaa vya hifadhi baridi vyenye nguvu ndogo vikiweza kuhakikisha usalama wa kifedha bila kuhitaji kukokotoa kriptografia nzito.

### Makubaliano ya Faragha ya Mthibitishaji

Ingawa kukabidhi utengenezaji wa mathibitisho ya maarifa sifuri kwa pochi saidizi au mthibitishaji mwingine hutenga funguo za kutumia pesa, bado kunahitaji mthibitishaji afikie taarifa nyeti za muamala, kama vile thamani za madokezo, anwani za wapokeaji na commitments.

PCZT hudumisha utengano wa usanifu kwa kuhakikisha kwamba taarifa hizi zinaweza kutolewa kwa ajili ya uthibitishaji bila kuhamisha funguo za siri za kutumia pesa zinazohitajika kwa uidhinishaji.

Hili huhakikisha kwamba mamlaka ya kuthibitisha imetenganishwa na mamlaka ya kutumia pesa. Mthibitishaji anaweza kutengeneza mathibitisho yanayohitaji nguvu kubwa ya kimahesabu bila kupata mamlaka ya kriptografia ya kutumia pesa za mtumiaji.

### Ushirikiano wa PCZT

Kadiri PCZT inavyokuwa sehemu muhimu ya mtiririko wa kazi wa hardware wallet za Zcash, utiaji sahihi wa saini nyingi na utiaji sahihi uliotenganishwa na intaneti, ushirikiano kati ya utekelezaji huru unazidi kuwa muhimu.

Pendekezo la Juni 2026 la AngryDavee lilibainisha kwamba utekelezaji wa PCZT tayari ulikuwepo katika miradi ikiwemo Ledger, Keystone, Hito, OneKey, na utekelezaji rejea katika librustzcash. Hata hivyo, pendekezo hilo lilibainisha ukosefu wa majaribio ya pamoja ya kuthibitisha kwamba utekelezaji huu hutafsiri PCZT kwa namna inayolingana.

Suluhisho lililopendekezwa lilikuwa seti ya majaribio ya ushirikiano ya chanzo huria yenye data sanifu za majaribio ya PCZT na majaribio ya utekelezaji mbalimbali yanayohusu mtiririko mzima wa uundaji → utiaji sahihi → ukamilishaji. Pia lilipendekeza kupima mipaka ya majukumu kama vile Combiner, ambapo taarifa zilizotiwa sahihi kwa sehemu kutoka kwa watiaji sahihi mbalimbali zinaweza kuunganishwa kabla muamala haujakamilishwa.

Hili lina umuhimu hasa kwa hardware wallet kwa sababu PCZT huruhusu kutenganisha uundaji wa muamala na utiaji sahihi: pochi saidizi inaweza kuunda muamala na kuandaa PCZT, huku kifaa cha maunzi kikipokea taarifa zinazohitajika za utiaji sahihi na kutekeleza hatua ya utiaji sahihi muhimu kwa usalama.

Pendekezo hilo halikutekelezwa kwa sababu Zcash Community Grants iliamua kutoendelea na ruzuku baada ya kulipitia pendekezo na kuzingatia maoni ya jamii. Kwa hiyo, seti ya majaribio ya utekelezaji mbalimbali iliyopendekezwa haikutengenezwa kupitia ruzuku hii. Hivyo, ni jibu lililopendekezwa kwa changamoto ya ushirikiano wa PCZT iliyotambuliwa, wala si kiwango kilichopo sasa katika Zcash.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### Mzunguko wa Maisha wa PCZT

| # | Hatua | Maelezo |
|---|---|---|
| 1 | Muundaji | Huanzisha PCZT kwa metadata ya jumla ya muamala, ikiwemo matoleo ya miamala, vitambulisho vya matawi ya makubaliano na alama za mabwawa. |
| 2 | Mjenzi | Huongeza kwenye muamala ingizo na matokeo yaliyokusudiwa katika mabwawa ya uwazi, Sapling, Orchard, au Ironwood. |
| 3 | Mkamilishaji wa Ingizo na Matokeo | Hutangaza kwamba seti ya maingizo na matokeo imekamilika, hukokotoa funguo za sahihi za kufunga, na hutia sahihi matumizi bandia pale inapohitajika. |
| 4 | Kisawazishaji | Huambatisha data za muktadha zinazohitajika kwa washiriki watakaofuata, kama vile funguo kamili za kutazama, anchors na witnesses za Merkle. |
| 5 | Mthibitishaji na Mtiaji Sahihi | Hutengeneza mathibitisho ya maarifa sifuri na kutia sahihi kwa kriptografia. Katika matoleo ya kisasa ya PCZT, kazi hizi mbili ni huru kabisa na zinaweza kufanyika kwa kufuatana au kwa wakati mmoja. |
| 6 | Kiunganishi | Huunganisha kwa utaratibu matukio mengi ya PCZT ikiwa vifaa mbalimbali vinafanyia kazi vipengele tofauti vya muamala mmoja kwa wakati mmoja. Kanuni za kuunganisha huhitaji utatuzi madhubuti wa migongano ili kuzuia upotevu wa data usiotarajiwa. |
| 7 | Mkamilishaji na Mtoaji wa Matumizi | Huthibitisha vipengele vyote vya kriptografia vinavyohitajika, huondoa metadata ya muktadha wa kati na kutoa muamala wa Zcash uliokamilishwa tayari kutangazwa kwenye mtandao. |

## Utekelezaji Halisi wa Hardware Wallet

### Muhtasari

| Kifaa   | Pochi saidizi hupokea nini              | Kinachobaki kwenye kifaa          | Usafirishaji      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / FVK ya Orchard, anwani            | Mamlaka ya kutumia pesa                | USB / BLE      |
| Keystone | UFVK + Anwani Iliyounganishwa                   | Seed / funguo za kutumia pesa              | QR (isiyounganishwa na intaneti)|
| Hito     | UFVK, Anwani Iliyounganishwa, alama ya kidole ya seed  | Seed na funguo za siri za kutumia pesa    | QR / ya ndani     |


Utekelezaji kadhaa wa hardware wallet umetengenezwa ili kuchunguza jinsi miamala ya faragha ya Zcash inavyoweza kuungwa mkono huku funguo nyeti za kutumia pesa zikitengwa na pochi saidizi. Ledger, Keystone, na Hito zinawakilisha njia tofauti za kuunganisha ulinzi wa funguo kwa maunzi na mtiririko wa kazi wa muamala wa Zcash.

![Real world hardware wallet implementations](/content-images/hardware-wallet-implementations.webp)

Ili kuelewa jinsi zinavyolinda pesa za faragha, ni muhimu kutofautisha funguo za kutumia pesa na funguo za kutazama. Kwa vifaa vyote vitatu, mgawanyo unafuata muundo uleule:

| Kifaa | Kile ambacho programu saidizi inaweza kupokea | Kinachobaki kimelindwa kwenye kifaa |
|---|---|---|
| Ledger | UFVK / FVK ya Orchard, anwani na taarifa za umma | Mamlaka ya kutumia pesa / nyenzo za ufunguo wa siri |
| Keystone | UFVK + Anwani Iliyounganishwa | Seed / funguo za kutumia pesa |
| Hito | UFVK, Anwani Iliyounganishwa, alama ya kidole ya seed na taarifa za mtandao | Seed na funguo za siri za kutumia pesa |

### Ledger kama Mazingira ya Utiaji Sahihi kwa Maunzi

Ledger ni kampuni ya hardware wallet. Vifaa vyake vimejengwa kwa kutumia Secure Element, chipu maalumu iliyoundwa kushikilia nyenzo za ufunguo wa siri na kuzitenga kimwili na sehemu nyingine za kifaa, pamoja na chochote kilichounganishwa nacho. Secure Element hiyo ndiyo sababu kuu inayofanya kifaa cha Ledger kiaminike kwa hifadhi baridi. Hii inamaanisha kwamba hata kompyuta au simu iliyochomekwa kwenye kifaa ikiathiriwa, funguo zilizo ndani ya Secure Element haziwezi kutolewa.

Hata hivyo, kifaa cha Ledger peke yake hakina programu ya kushughulikia sarafu yoyote mahususi ya kidijitali. Kinahitaji kusakinishiwa programu inayojua jinsi ya kushughulikia kriptografia mahususi ya sarafu hiyo.

Kwa hiyo, kifaa cha Ledger hakina programu ya kushughulikia sarafu yoyote mahususi ya kidijitali, hivyo kinahitaji programu inayojua kriptografia ya sarafu hiyo. Kwa Zcash, kumekuwa na vizazi viwili:

- Programu asilia ya “Zcash Shielded” iliyoundwa na Zondax, iliyotumiwa pamoja na pochi saidizi kama vile Zkool na itakayoondolewa tarehe 5 Novemba 2026, na
- Programu mpya zaidi ya Zcash ya Ledger, (3.9.4+), inayotumiwa moja kwa moja na Ledger Wallet Desktop 4.21+ kwa Ironwood ZEC za faragha.

Muundo wa kutenganisha funguo ulio hapa chini unatumika kwa zote mbili.

Zkool ni pochi saidizi kwenye simu au kompyuta yako inayowasiliana na programu hiyo. Huunda muamala na kuutuma kwa Ledger; kisha programu ya Zondax kwenye kifaa huutia sahihi na kutuma sahihi hiyo kurudi.

Kwa hiyo, Zondax ni programu inayoendeshwa kwenye maunzi, huku Zkool ikiwa programu inayoendeshwa nje yake na kutumia programu ya Zondax kuwasiliana na kifaa.

### Nini Hutoka Kwenye Ledger?

Programu ya Zcash ya Ledger ina kipengele maalumu cha kuhamisha ufunguo wa kutazama wa pochi, ambao huruhusu programu kuona salio na miamala bila kuweza kutumia pesa.

Kipengele hiki kinaweza kutoa mojawapo ya vitu viwili:

- Full Viewing Key Iliyounganishwa (UFVK), ambayo ni ufunguo kamili wa kutazama unaojumuisha mabwawa yote ya faragha ya Zcash kwa pamoja, au
- Orchard Full Viewing Key (FVK)

Vyovyote vile, kinachotolewa ni ufunguo wa kutazama pekee. Haijalishi unaomba toleo gani, kipengele hiki hakiwezi kutoa taarifa moja ambayo ingemwezesha mtu kuhamisha pesa, yaani ufunguo wa kutumia pesa.

Hata hivyo, huo ndio msingi wa muundo wake: umeundwa ili kitu pekee unachoweza kuhamisha kiwe salama kukabidhi kwa programu saidizi.

Mpangilio wa ngazi za funguo wa Zcash umeundwa hivi kwamba kwa kila bwawa la faragha, ufunguo wa kutumia pesa hutokeza vitu viwili tofauti:

- Ufunguo unaoidhinisha matumizi ya pesa, na
- Ufunguo kamili wa kutazama

Kisha FVK inaweza kutoa uwezo mwingine wa kutazama, lakini njia hiyo ya utoaji haielekei kamwe kwenye mamlaka ya kutumia pesa. Mara ufunguo unapogawanyika kuelekea upande wa kutazama wa ngazi hiyo, hubaki huko na hauwezi kutumiwa kuunda upya ufunguo wa mamlaka ya kutumia pesa ulioutoa.

Ironwood hufuata muundo huohuo kwa sababu hutumia tena muundo wa msingi wa funguo na madokezo wa Orchard. Hata hivyo, ni bwawa tofauti katika kiwango cha makubaliano, lenye mti wake wa commitment na seti yake ya nullifier. Hii inamaanisha kwamba UFVK kwa kweli ni mkusanyiko wa funguo za kutazama za kila bwawa (la uwazi, Sapling, Orchard, na sasa Ironwood), wala si ufunguo mmoja usiogawanyika.

UFVK iliyohamishwa kabla ya Ironwood kuanza kutumika haitajumuisha ufunguo wa kutazama wa Ironwood, kwa sababu bwawa hilo lilikuwa bado halipo. Hii ndiyo sababu pochi zilihitaji kusasishwa ili zitambue na kutoa UFVK zinazoweza kutumia Ironwood baada ya uboreshaji wa NU6.3.

### Kinachobaki kwenye Ledger?

Mamlaka ya kutumia pesa hubaki kwenye kifaa.

Ledger Signer hupokea muamala/PCZT kutoka kwa mwenyeji na kutengeneza sahihi ya kuidhinisha matumizi ya pesa kulingana na bwawa ambalo muamala unatumia (bwawa la Ironwood, kwa sababu muunganisho wa sasa wa Ledger unaunga mkono Ironwood pekee). Kisha sahihi hutengenezwa kwenye kifaa, na mwenyeji hupokea sahihi pekee, wala si ufunguo wa siri wa kutumia pesa.

Hili pia linaendana na muundo wa jumla wa usalama wa Ledger. Secure Element yake hutenga nyenzo za ufunguo wa siri, na mahitaji ya usalama wa programu ya Ledger yanakataza waziwazi programu kufichua siri hizo kwa mwenyeji.

Kithibitishaji cha Ledger kinaweza kuhamisha FVK/UFVK na kwa wakati huohuo kutia sahihi miamala kivyake. Uwezo huu wawili hutolewa kupitia vipengele tofauti, wala haujaunganishwa kuwa kimoja.

### Hilo Lina Maana Gani Kiutendaji?

Tuseme Ledger yako ina ZEC 10.

Pochi saidizi inaweza kuwa na UFVK na hivyo kubaini: “Pochi hii imepokea ZEC 10.” Inaweza kuchanganua na kuonyesha miamala na salio.

Lakini mtu akihatarisha usalama wa pochi saidizi, UFVK pekee haimpi uwezo wa kutengeneza sahihi ya kuidhinisha matumizi ya pesa.

Lengo la sahihi tofauti ya kuidhinisha matumizi ya pesa ni kuwezesha vifaa vyenye vikwazo kama hardware wallet kuidhinisha matumizi ya pesa za faragha bila kuhitaji kutengeneza thibitisho kamili la zk-SNARK vyenyewe.

### Programu ya Zondax Ledger; upande wa hardware wallet

#### Zondax ni Nini?

Zondax ni kampuni ya nje ya ukuzaji programu iliyounda programu ya Zcash Ledger. Hii ndiyo programu halisi ya firmware inayoendeshwa kwenye maunzi ya Ledger na kuwezesha kifaa kuelewa na kuchakata miamala ya Zcash.

Zondax ni msanidi programu wa nje. Maunzi ya Ledger hayana uwezo wa kiasili wa kuchakata miamala ya Zcash, na uwezo huo hutokana kabisa na programu ya Zondax.

### Utekelezaji Asilia wa Zcash Ledger

Hazina ya programu ya Zcash ya Ledger ya Zondax ina programu inayoendeshwa kwenye kifaa cha Ledger. Hapo awali, programu hiyo ililenga miamala ya faragha ya Sapling, kabla ya Orchard kuwepo kama bwawa kuu la faragha la Zcash. Kwa hiyo, usaidizi wa Sapling ndio kiwango cha juu cha kile ambacho kifaa cha Ledger kingeweza kufanya kwa ZEC za faragha.

Usanifu wake unaonyesha utengano huo: upande wa mwenyeji/saidizi huandaa taarifa za muamala, huku Ledger ikishughulikia utendakazi nyeti wa funguo na utiaji sahihi.

Hata katika toleo hili la awali kabisa la usaidizi wa hardware wallet ya Zcash, kanuni kuu za usanifu zilikuwa tayari zimewekwa: uundaji na uthibitishaji upande wa mwenyeji, kisha utiaji sahihi uliotengwa kwenye kifaa.

### Mabadiliko Kuelekea Orchard

Kazi ya Ledger ilielekea kwenye Orchard + PCZT. Huu ulikuwa mabadiliko makubwa, wala si sasisho dogo, kwa sababu Orchard hutumia mfumo tofauti wa uthibitishaji (Halo 2, badala ya Groth16 ya Sapling) na muundo tofauti wa dokezo na ufunguo. Kwa hiyo, kupanua firmware iliyotengenezwa kwa ajili ya Sapling pekee ili iweze kushughulikia utiaji sahihi wa Orchard kulihitaji msingi mpya wa kriptografia upande wa kifaa, wala si marekebisho ya firmware tu.

Hata hivyo, Zcash ilipoelekea kwenye Ironwood, Zondax na Ledger zilibadili mwelekeo wa ukuzaji programu ili kuunga mkono Ironwood moja kwa moja, badala ya kukamilisha utekelezaji wa Orchard pekee kisha kuubuni upya kwa ajili ya Ironwood. Hii ni hatua nyingine katika mabadiliko ya utekelezaji wa Ledger, kwa kuwa Ironwood hujengwa juu ya usanifu wa kriptografia wa Orchard huku ikianzisha bwawa tofauti la faragha na mabadiliko ya ziada ya itifaki.

### Kinachotendeka Ndani ya Programu Hii ya Ledger

Mtiririko unaotokana na hili unaelezwa hivi:

1. Mwenyeji huunda PCZT.
2. Mwenyeji hutuma taarifa husika za muamala kwenye kifaa cha Ledger.
3. Kifaa hutengeneza sahihi za kuidhinisha matumizi ya pesa za Orchard.
4. Mwenyeji hushughulikia kila kitu kinachofuata, ikiwemo sahihi ya kufunga na ukusanyaji wa mwisho wa muamala.

Programu inayoendeshwa ndani ya Ledger haioni wala kutoa chochote zaidi ya sahihi yenyewe ya kuidhinisha matumizi ya pesa. Kazi zote zinazohitaji nguvu kubwa ya kimahesabu au data nyingi (uthibitishaji, kufunga, ukusanyaji) hubaki kwa mwenyeji, ambapo si lazima aaminiwe na nyenzo za ufunguo.

### Muunganisho wa Asili wa Faragha wa Ledger; Ledger Wallet Desktop

Muunganisho wa hivi karibuni wa Zcash wa Ledger unatoa mfano halisi wa jinsi uundaji wa muamala wa faragha na utiaji sahihi muhimu kwa usalama unavyoweza kutenganishwa kati ya programu saidizi na hardware wallet.

Kwa kutumia Ledger Wallet Desktop 4.21+ na programu ya kifaa cha Zcash 3.9.4+, watumiaji wanaweza kutuma na kupokea Ironwood ZEC za faragha moja kwa moja kupitia Ledger Wallet Desktop. Muunganisho huu unaunga mkono uhamisho wa faragha kwenda faragha, kuhamisha kutoka bwawa la uwazi kwenda bwawa la faragha, kuhamisha kutoka bwawa la faragha kwenda bwawa la uwazi, anwani za kupokea za faragha na jumbe. Miamala huthibitishwa na kutiwa sahihi kwenye kifaa cha Ledger badala ya kutegemea tu taarifa zinazoonyeshwa na kompyuta.

Sehemu muhimu ya usanifu huu ni kutenganisha uwezo wa kutazama na kutumia pesa. Wakati wa kusawazisha salio la faragha, Ledger huhamisha Full Viewing Key Iliyounganishwa (UFVK), ambayo huhifadhiwa ndani ya kompyuta. UFVK huruhusu Ledger Wallet Desktop kugundua miamala husika ya faragha na kubaini salio la pochi, lakini haitoi mamlaka ya kutumia pesa. Mamlaka ya kutumia pesa muhimu kwa usalama hubaki kwenye kifaa cha Ledger, ambacho hutekeleza hatua ya mwisho ya utiaji sahihi. Hili huweka mpaka ulio wazi kati ya kompyuta, inayosimamia hali ya pochi na kuunda miamala, na kifaa cha maunzi, kinacholinda uwezo unaohitajika kuidhinisha matumizi ya pesa.

Hata hivyo, muunganisho wa sasa unahusu Ironwood pekee. Hauonyeshi wala kusimamia pesa za Orchard au Sapling kupitia Ledger Wallet Desktop. Hili lina umuhimu wa kihistoria kwa sababu ukuzaji wa awali wa Zcash wa Ledger ulihusishwa na usaidizi wa faragha wa Orchard kabla utekelezaji haujabadilika kuelekea itifaki ya Ironwood.

Mabadiliko haya pia yanaonyesha umuhimu wa ulinganifu wa funguo na akaunti. Ledger ina programu ya zamani ya “Zcash Shielded” iliyoundwa na Zondax na iliyotumiwa na miunganisho kama vile YWallet na zkool, ambayo sasa inaondolewa. Kwa sababu programu hiyo ya zamani ilitumia utaratibu tofauti wa utoaji wa akaunti za faragha, akaunti zake za Sapling haziwezi kuundwa upya moja kwa moja na programu mpya ya Ledger.

Kwa hiyo, muunganisho huu unaonyesha maendeleo yaliyopatikana na vikwazo vilivyobaki katika usaidizi wa hardware wallet za faragha. Sasa Ledger inaweza kutoa matumizi kamili ya Ironwood, ambapo programu saidizi hushughulikia usawazishaji wa pochi na maandalizi ya miamala huku kifaa cha maunzi kikiendelea kuwa mpaka wa usalama wa matumizi ya pesa.

Wakati huohuo, ulinganifu wa akaunti za zamani, usaidizi wa mabwawa mahususi ya faragha pekee, mipaka ya ukubwa wa miamala kwenye vifaa, vikwazo vya mifumo, pamoja na vikwazo vya kimahesabu na vya firmware vinavyohusika katika kuchanganua na kuthibitisha miamala ya faragha vinaonyesha kwamba usaidizi wa hardware wallet kwa Zcash hutegemea si uwezo wa itifaki pekee, bali pia usanifu na rasilimali za kila utekelezaji mahususi.

### Zkool + Ledger — Kutumia Programu Rasmi ya Zondax

Kama mrithi wa Ywallet, Zkool ilirithi lengo la utiaji sahihi wa faragha bila muunganisho wa intaneti, lakini ikafuata njia tofauti ya kulifikia. Njia hiyo iliathiriwa moja kwa moja na ukweli kwamba kriptografia pekee haiufanyi muunganisho utumike ikiwa programu ya kutia sahihi haiwezi kusambazwa kwa usalama.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Matumizi ya Zkool ya Programu ya Zondax

Zkool ilielekea kutumia programu rasmi ya Zcash ya Ledger, iliyoundwa na Zondax, badala ya programu ya Ledger ya Ywallet iliyoachwa. Badala ya kudumisha programu maalumu ambayo duka la Ledger halingekubali, Zkool ilijengwa juu ya programu ambayo tayari ilikuwa imekubaliwa na kusambazwa kupitia mfumo wa Ledger wenyewe.

Mabadiliko hayo yalimaanisha kwamba watumiaji hawakuhitaji tena kutegemea kusakinisha programu maalumu ya Ledger ambayo haikuwa na sahihi ili kutumia muunganisho huu, kwa sababu programu ya Zondax ilisambazwa rasmi kupitia mfumo wa Ledger.

Ledger iliweka tarehe 5 Novemba 2026 kuwa mwisho wa usaidizi kwa programu hii ya zamani ya Zcash Shielded, inapokuwa inaiondoa. Zkool ilijitayarisha kwa hilo: [toleo la 6.30.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.30.0) (12 Septemba 2026) liliongeza usaidizi kwa programu rasmi mpya ya Zcash ya Ledger pamoja na ile ya Zondax. Unapounda akaunti ya Ledger, sasa Zkool hukuuliza kifaa kinaendesha programu gani (Rasmi au Zondax). Akaunti ya programu Rasmi inajumuisha mabwawa ya uwazi na Ironwood: Zkool inaweza kuingiza UFVK yake kutoka kwenye kifaa na kutia sahihi miamala ya v6 kwa kutumia programu Rasmi. Akaunti ya programu ya Zondax hubakiza usanidi wa zamani wa uwazi + Sapling ([zkool2#1242](https://github.com/hhanh00/zkool2/pull/1242)).

### Mabwawa ya Faragha Yanayotumika

Kulingana na msanidi programu wa Ywallet, muunganisho wa Zkool na Ledger ulitumia programu rasmi ya Ledger iliyotengenezwa na Zondax na kusaidia miamala ya Zcash ya uwazi na ya faragha. Hata hivyo, usaidizi wake kwa miamala ya faragha ulikuwa na mipaka ya Sapling na haukuunga mkono Orchard, pamoja na mipaka mingine ya muunganisho kama kikomo cha ingizo na matokeo matano kwa kila aina na kutokuwepo kwa uoanifu wa Ledger Live.

Kizuizi hiki kilionyesha wigo wa utekelezaji wa Zondax Ledger wa wakati huo. Kazi ya awali ya Zondax ya Ledger ilitoa usaidizi wa Sapling, na toleo lake lililofuata la mwaka 2024 la programu ya Zcash Shielded Ledger mwanzoni halikujumuisha Orchard na Anwani Zilizounganishwa. Kwa hiyo, muunganisho uliojengwa kuzunguka programu hiyo ulirithi uwezo na vikwazo vya utekelezaji wa hardware wallet ulioutegemea.

Hali hiyo iliendelea kubadilika baada ya kutolewa kwa programu mahususi ya Zcash Shielded Ledger mnamo Novemba 2024. Zondax ilisema kuwa programu hiyo ilitolewa rasmi kupitia Ledger Live na baadaye ikachapisha mwongozo wa ujumuishaji pamoja na vifurushi vya Rust na JavaScript ili kuwezesha pochi nyingine kuunganishwa nayo. Hata hivyo, wakati wa uzinduzi, programu hiyo iliwasiliana na Zecwallet Lite Desktop pekee, huku ujumuishaji mpana zaidi wa pochi ukiendelea kutengenezwa.

Hatua iliyofuata ilikuwa uundaji wa programu mpya zaidi ya Zcash ya Rust ya Ledger. Kufikia Juni 2026, Ledger iliripoti kuwa kushiriki UFVK na utengenezaji wa Anwani Iliyounganishwa ya Orchard ulikuwa umetekelezwa, huku kusaini miamala ya Orchard na ClearSign vikiwa bado vinaendelezwa. Ledger pia ilisema kuwa kazi hiyo ingeendelea katika njia ya Ironwood kadiri itifaki ilivyobadilika.

Baadaye, Ironwood ilihitaji masasisho katika mfumo ikolojia wa pochi za Zcash. Zkool ilitoa usaidizi wa kuhamia kutoka Orchard kwenda Ironwood kuanzia toleo la 6.24.0, na ikaendelea kuboresha mchakato wa uhamishaji na wa miamala katika matoleo yaliyofuata. Kwa upande mwingine, Ledger iliunganisha utiaji sahihi wa PCZT v2 katika programu yake mpya mnamo Julai 27, ingawa utekelezaji huo ulikuwa bado haujakamilisha ukaguzi wa Ledger na utoaji wa Ledger Live kufikia Agosti 20. Hatua hiyo imetolewa tangu wakati huo, na Wallet Desktop 4.21+ ya Ledger sasa inatoa usaidizi wa asili wa Ironwood moja kwa moja.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Kwa hivyo, mabadiliko haya yanaeleweka vyema zaidi kama maendeleo kadhaa yanayohusiana, badala ya uboreshaji mmoja kutoka Zondax hadi Ironwood: utekelezaji wa awali uliolenga Sapling wa Zondax, Zcash Shielded Ledger App ya mwaka 2024, programu mpya zaidi ya Ledger Rust yenye usaidizi wa Orchard na PCZT, muunganisho asilia wa Ledger katika Ledger Wallet Desktop, na masasisho sambamba ya pochi kama Zkool kadiri mfumo ikolojia ulivyohamia kwenye Ironwood.

### Usaidizi wa sasa wa vifaa na mifumo ya Ledger kwa Zcash

Usaidizi wa Zcash kwenye Ledger hutegemea

- Muundo wa kifaa
- Programu iliyosakinishwa
- Jukwaa linalotumiwa kukidhibiti na,
- Ikiwa muamala ni wa uwazi au wa faragha.

Kufikia 21 Julai 2026 (sasisho la mwisho la Ledger), programu ya Shielded ya Zcash inaungwa mkono kwenye Nano S Plus, Stax na Flex, lakini bado si kwenye Nano X au Nano Gen5.

Nano X na miundo mingine yote isipokuwa Nano S ya awali bado inaweza kutumia programu ya kawaida ya Zcash. Programu hii inasaidia miamala ya uwazi na kutumia fedha za faragha kulipa anwani za uwazi (kuondoa faragha), lakini haiungi mkono utiaji sahihi wa miamala ya faragha kwenda ya faragha. Nano S ya awali haiungi mkono programu yoyote kati ya hizo, kwa sababu Ledger inapunguza usaidizi kwa kifaa hicho na programu yake ya hivi karibuni ya Zcash haipatikani humo. Vifaa huunganishwa na Wallet ya Ledger (hapo awali Ledger Live), programu saidizi ya Ledger, inayopatikana kwenye kompyuta za mezani za Windows, macOS na Linux, na kwenye simu za iOS na Android.

Ledger imeongeza Zcash za faragha za asili kwenye Wallet Desktop ya Ledger, zilizojengwa kwenye bwawa la Ironwood, na hivyo kuondoa hitaji la pochi saidizi tofauti. ZEC za faragha bado haziungwi mkono kwenye programu ya simu ya Ledger ya iOS na Android, ingawa usaidizi wa simu umepangwa kutolewa baadaye.

Nje ya programu ya Ledger yenyewe, matumizi ya miamala ya faragha hutegemea pochi saidizi inayooana na mifumo yake inayoungwa mkono. Ledger inapoendelea kupanua usaidizi wa Ironwood, uoanifu hutegemea muundo wa kifaa, programu dhibiti, toleo la programu na mfumo endeshi. Kwa hiyo, usaidizi wa jumla wa Zcash hauhakikishi uoanifu kila mara.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### Kutia sahihi bila muunganisho wa mtandao kwa YWallet; mbinu ya awali

Ywallet ni pochi saidizi iliyo tofauti na Ledger na Zondax, ambayo ilifuata njia yake ya kuwezesha utiaji sahihi wa miamala ya faragha bila muunganisho wa mtandao.

Ywallet ni muhimu kihistoria kwa sababu ilichunguza utiaji sahihi wa miamala ya Zcash bila muunganisho wa mtandao. Hii ilimaanisha kuwa kifaa cha kutia sahihi kingeweza kutenganishwa na pochi ya mtandaoni.

Ili kutekeleza usanifu huo kwenye vifaa vya Ledger, Ywallet ilitengeneza programu yake ya Ledger, ambayo ni programu ya umiliki na ni tofauti na programu ya Zondax iliyojadiliwa katika sehemu iliyotangulia. Hii ilimaanisha kuwa Ywallet haikutegemea utekelezaji uliokuwepo wa Sapling wa Zondax; ilikuwa na programu dhibiti yake iliyotekeleza upande wa kutia sahihi wa muunganisho huo.

### Kwa nini muunganisho huo ulikuwa muhimu

Kuwa na kriptografia na msimbo wa kutia sahihi hakutoshi. Muunganisho wa pochi ya vifaa si suala la kriptografia pekee; pia ni suala lisiloepukika la usambazaji na majukwaa. Kwa kiwango cha chini, unahusisha:

- Kuidhinisha na kusambaza programu — ikiwa duka rasmi la programu la mtengenezaji wa kifaa litakubali na kusambaza programu hiyo
- Usalama wa programu dhibiti na programu — ikiwa programu inatimiza masharti ya usalama ya mtengenezaji ya kushughulikia nyenzo za funguo
- Itifaki za mawasiliano — jinsi pochi saidizi na kifaa vinavyobadilishana data ya muamala
- Uoanifu na pochi — ikiwa miundo ya data na mtiririko wa programu ya kutia sahihi vinaendana na matarajio ya pochi saidizi
- Mabwawa ya faragha yanayoungwa mkono — ni yapi kati ya Sapling, Orchard na sasa Ironwood ambayo programu inaweza kutia sahihi

Programu ya umiliki ya Ledger ya Ywallet ilitimiza mahitaji ya kriptografia na usanifu; ingeweza kutia sahihi miamala ya Zcash ya faragha, lakini haikukubaliwa kwenye duka rasmi la programu la Ledger.

### Kuhama kutoka kwenye programu ya umiliki ya Ledger

Kwa kuwa programu hiyo haikukubaliwa rasmi, Ywallet ingelazimika kuwaomba watumiaji wasakinishe programu dhibiti isiyotiwa sahihi ili kuitumia. Hili lingekuwa punguzo halisi la usalama kwa watumiaji, na Ywallet iliamua kutowaomba wafanye hivyo. Kwa hiyo, Ywallet hatimaye iliacha muunganisho huo badala ya kufuata njia hiyo.

Badala ya kufufua programu ya umiliki, maendeleo ya baadaye kupitia Zkool, mrithi wa Ywallet, yalielekea kwenye programu rasmi ya Ledger iliyotengenezwa na Zondax. Hii ilimaanisha kuacha utekelezaji maalumu uliokataliwa na kutumia utekelezaji sanifu ambao tayari ulikubaliwa katika mfumo wa usambazaji wa Ledger. Mabadiliko hayo hatimaye yaliwezesha tena muunganisho wa Ledger kufanya kazi.

### Urithi wa Ywallet

Hata baada ya Ywallet yenyewe kujiondoa katika maendeleo ya kazi, mtengenezaji wake Hanh, ambaye pia ni mwanachama wa ZCG, aliendelea kuwa sauti muhimu katika mfumo ikolojia. Hili lilionekana hasa wakati uhamishaji wa Ironwood ulipoibua taarifa za matatizo kuhusu fedha zilizoonekana kutoweka.

**ZODL: Mtumiaji halisi alikosa kuona fedha baada ya uhamishaji wa Orchard → Ironwood**

Mtumiaji mmoja, Jmo0615, aliripoti kuwa fedha zilizokuwa zikionekana awali kwenye pochi yake ya ZODL hazikuonekana tena baada ya uhamishaji kutoka Orchard kwenda Ironwood. Alisema kuwa alikuwa amerejesha seed ya awali, akaweka pochi upya na kuirejesha, kisha akaruhusu toleo la 3.14.1 (1) la ZODL kusawazisha kikamilifu. Pia alithibitisha kuwa hakuna hardware wallet ya Keystone iliyohusika.

Haijathibitishwa kuwa fedha hizo zilipotea kweli. Badala yake, inashukiwa kuwa huenda kulikuwa na tatizo la ugunduzi wa pochi au uhamishaji, ambapo fedha zilizokuwa zikionekana awali hazikuonyeshwa tena baada ya kuhamia Ironwood. Fedha zisizogunduliwa au zisizoonyeshwa hazipaswi kuelezwa moja kwa moja kuwa zimepotea kabisa. Tofauti hii ni muhimu katika kuelewa matatizo ya uhamishaji.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: “Madokezo yaliyofungwa” yanaweza kueleza kwa nini fedha zinaonekana kutopatikana**

Kipengele kingine muhimu cha pochi za faragha ni jinsi hali ya pochi inavyoweza kuathiri fedha ambazo mtumiaji anaweza kutumia kweli. Hanh alieleza kuwa mtumiaji anaweza kufunga dokezo kimakosa kupitia udhibiti wa sarafu, kipengele kinachowaruhusu watumiaji kuchagua wenyewe madokezo yatakayotumiwa kulipa. Katika hali hii, dokezo linaweza bado kuwepo kwenye pochi lakini likatiwa alama kuwa halipatikani kwa matumizi.

Hili linaonyesha tofauti muhimu wakati wa kuchunguza matatizo ya pochi. Kiasi cha ZEC kilichopo kwenye pochi si lazima kiwe sawa na kiasi kinachoweza kutumiwa kwa sasa. Mambo kama vile uteuzi wa madokezo, usawazishaji, hali ya uhamishaji, urejeshaji wa pochi na mipangilio ya udhibiti wa sarafu yanaweza kuathiri salio linaloonyeshwa au linaloweza kutumika. Kwa hiyo, taarifa za “fedha zilizopotea” zinapaswa kutofautisha kwa makini fedha ambazo hazigunduliwi au kuonyeshwa, fedha zinazogunduliwa lakini hazipatikani kwa matumizi, na fedha zilizopotea kweli.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**Keystone ni nini?**

Keystone ni hardware wallet isiyounganishwa na mtandao. Kifaa chake cha kutia sahihi hakina muunganisho wa moja kwa moja wa waya au pasiwaya na programu saidizi wakati wa kutia sahihi kwenyewe; badala yake, huwasiliana kwa kutumia misimbo ya QR. Hapa kimeunganishwa na Zashi (sasa kimepewa jina jipya la Zodl), pochi saidizi ya asili ya Zcash. Muunganiko huo unaonyesha kanuni ya kutenga funguo kwa uwazi wa pekee na kuifanya iwe rahisi kufuatilia.

**Mtiririko wa Keystone/Zashi**

Muunganisho wa Zcash wa Keystone na Zashi unaonyesha utengano huu kwa uwazi zaidi. Unapounganisha Keystone na Zashi, Unified Full Viewing Key huhamishwa kutoka Keystone kwenda Zashi.

Kwa hiyo, mtiririko ni:

![Keystone and Zashi viewing flow](/content-images/keystone-zashi-viewing-flow.webp)

**Zashi inaweza kufanya nini kwa kutumia UFVK?**

Zashi inaweza kuitumia:

- Kutambua miamala ya faragha inayoingia
- Kubaini salio
- Kupata taarifa kuhusu shughuli za faragha

Lakini haiwezi kutumia fedha kwa sababu tu ina UFVK.

UFVK ni “uwezo wa kutazama” unaoruhusu kujua salio na miamala, lakini hauruhusu kutumia fedha.

### Ni nini kinachobaki ndani ya Keystone?

Seed na mamlaka ya kutumia fedha hubaki kwenye Keystone. Zashi haipokei seed, ufunguo wa kutumia pesa au ufunguo binafsi wa kuidhinisha matumizi. Hupokea UFVK, taarifa za anwani na taarifa zinazohitajika kwa utendaji wa kutazama pekee.

Sehemu hizi mbili zikijumuishwa, picha kamili inabainika. Taarifa zinazotoka kwenye kifaa, kama vile UFVK, anwani na taarifa za kutazama pekee, zinatosha kuiwezesha Zashi kufuatilia akaunti, lakini hakuna kinachotoka kwenye kifaa kinachoweza kutumiwa kuhamisha fedha kutoka humo.

Ndiyo maana muunganisho wa Zashi na Keystone unaweza kutoa hifadhi ya fedha za faragha bila muunganisho wa mtandao. Programu ya pochi inaweza kufuatilia akaunti bila kuwa na mamlaka inayohitajika kutumia fedha zake. Muunganisho huo ulizinduliwa mahsusi ili kuwezesha hifadhi ya ZEC za faragha bila muunganisho wa mtandao.

Unapotaka kutumia fedha:

![Keystone and Zashi spending flow](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito hufuata mfumo wa kutenga funguo unaofanana sana na wa Keystone, lakini utekelezaji wake ni mpya zaidi. Badala ya kuunganishwa na pochi saidizi iliyopo kama Zashi, Hito huja na pochi yake ya Android, na mchakato wa kusanidi akaunti kati ya kifaa cha pochi ya vifaa na programu hiyo ya Android umeelezwa katika hatua za maendeleo za Hito.

**Kusanidi akaunti: programu ya Hito hupokea nini?**

Pochi ya Android hutumia:

- Unified Full Viewing Key (UFVK)
- Unified Address
- Alama ya kidole ya seed ya ZIP-32
- Taarifa za mtandao

wakati wa kusanidi akaunti ya kifaa cha hardware wallet.

Kumbuka kuwa programu ya Android haipokei kamwe seed ya hardware wallet au funguo zake binafsi za kutumia pesa.

![Hito onboarding](/content-images/hito-onboarding.webp)

**Programu ya Hito hupata nini?**

Taarifa zilizoorodheshwa za kusanidi akaunti ni pamoja na:

- UFVK
- Unified Address
- Alama ya kidole ya seed ya ZIP-32
- Mtandao

UFVK huipa pochi ya Android taarifa zinazohitajika kuendesha akaunti kama pochi inayoweza kutazama, bila kupokea seed. Alama ya kidole ya seed ni kitambulisho chenye urefu usiobadilika kinachotokana na seed, na hutumika kutambua akaunti. Si seed yenyewe wala haitoi uwezo wowote wa kutumia fedha. Ndiyo maana kuwepo kwake hakupingani na dai la “haipokei kamwe seed” lililotajwa hapo juu.

**Ni nini kinachobaki kwenye Hito?**

Seed halisi, funguo binafsi za kutumia pesa na mamlaka ya kutia sahihi hubaki kwenye kifaa cha hardware wallet. Kisha Hito hutia sahihi bila muunganisho wa mtandao.

Hatua ya sasa ya Hito inasema kuwa mchakato mzima wa kuunda, kuhamisha, kutia sahihi bila muunganisho wa mtandao na kuingiza tena unafanya kazi. Unatumia usafirishaji wa BLE na uhamishaji wa QR wa BBQr wa PCZT iliyotiwa sahihi.

Mchakato huo unastahili kutajwa wazi kwa kuwa unaonyesha mzunguko kamili ulioelezwa awali katika ripoti hii: pochi ya Android huunda PCZT isiyotiwa sahihi na kuihamisha kwenda Hito; Hito huitia sahihi bila muunganisho wa mtandao kwa kutumia nyenzo zake za funguo zilizotengwa; kisha PCZT iliyotiwa sahihi huingizwa tena kwenye pochi ya Android.

Seed au ufunguo wa kutumia pesa hauvuki mpaka huo kuelekea upande wowote wakati wowote.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## Orchard hadi Ironwood: Mageuzi ya Usaidizi wa Pochi za Vifaa

Orchard ni bwawa la faragha ndani ya itifaki ya Zcash linalowawezesha watumiaji kuhifadhi na kufanya miamala ya ZEC kwa faragha iliyoimarishwa. Lilianzishwa katika Uboreshaji wa Mtandao wa 5 (NU5), Orchard hutumia mfumo wa uthibitishaji wa Halo 2 na usanifu mpya wa kriptografia ili kusaidia miamala ya faragha bila kufichua taarifa nyeti za muamala, kama vile mtumaji, mpokeaji au kiasi.

Ironwood ni bwawa la faragha lililoanzishwa katika uboreshaji wa mtandao wa Zcash wa NU6.3, kama mrithi wa bwawa la Orchard. Linatumia itifaki ya kriptografia ya Orchard huku likileta mabadiliko yaliyoundwa kuboresha usalama wa muda mrefu wa fedha za faragha, yakiwemo uwezekano wa kurejesha fedha iwapo kompyuta za quantum zitavunja mifumo ya sasa na uhakikisho imara zaidi kuhusu uadilifu wa ugavi.

Mwanzoni, ni muhimu kufafanua kuwa Ironwood haikubadilisha itifaki ya Orchard na kuweka mfumo mpya kabisa wa kriptografia. Ironwood ilianzishwa kama bwawa jipya la faragha lililojengwa kwa kutumia itifaki iliyokuwepo ya Orchard. Hii inamaanisha kuwa zina muundo sawa wa Action, mfumo sawa wa uthibitishaji wa Halo 2, na miundo sawa ya madokezo na funguo.

Ironwood lina mti wake wa commitment za madokezo, seti ya nullifier, anchor na bwawa la thamani, kwa hiyo katika kiwango cha makubaliano ni bwawa tofauti kabisa. Lakini kwa upande wa kriptografia, ni upanuzi wa Orchard badala ya kujengwa upya.

Liliundwa kwa njia hii ili:

1. **Kuhakikisha uadilifu wa ugavi.** Mnamo Mei 29, 2026, mtafiti wa usalama Taylor Hornby alifichua kwa faragha dosari muhimu ya uthabiti katika mfumo wa uthibitisho wa maarifa sifuri wa Orchard, ambayo ingeweza kuruhusu ZEC ghushi kuundwa bila kuacha alama yoyote ya on-chain. Kwa kuwa data ya miamala ya Orchard ni ya faragha, hakuna anayeweza kuthibitisha kwa kujitegemea kuwa hakuna ZEC ghushi iliyoundwa kabla ya marekebisho. Kufunga bwawa la zamani na kuanzisha jipya likiwa na salio sifuri hutatua tatizo hilo kwa njia ambayo kurekebisha Orchard bila kulibadilisha kusingeweza.
2. **Kuhakikisha uwezekano wa kurejesha fedha iwapo kompyuta za quantum zitavunja mifumo ya sasa.** Ironwood iliundwa ili fedha zake ziweze kushiriki katika utaratibu wa kurejesha fedha wa baadaye iwapo dhana za msingi za logaritimu za pekee zitavunjwa.
3. **Kupunguza mabadiliko ya utekelezaji.** Badala ya kubuni itifaki mpya kabisa ya faragha, usanifu uliothibitishwa wa Orchard ulitumiwa tena. Hii ilimaanisha kuwa kazi ndogo zaidi ya kuandika kuanzia mwanzo ilihitajika kwa msimbo mpya wa miamala, uthibitishaji, pochi na hardware wallet.

### Ratiba ya matukio ya umma

- Mei 29: Udhaifu wa Orchard unafichuliwa.
- Juni: Miamala ya Orchard inazuiwa kwa muda huku marekebisho ya awali yakisambazwa kupitia NU6.2. Mnamo Juni 12, msanidi programu mkuu analenga Julai 21 kwa uboreshaji kamili; baadaye tarehe hiyo inasogezwa kwa wiki moja. Hoja ya jamii ilitolewa kuwa wamiliki wa Keystone wangehamia mwisho, kisha msanidi programu mkuu akajibu kuwa Keystone ingeunga mkono Ironwood kuanzia siku ya kwanza, huku firmware ikilenga Julai 3, kutegemea kukamilishwa kwa thamani za sahihi na mabadiliko ya API ya Orchard kutoka Zcash core.
- Mapema Julai: NU6.3 inafika testnet; Zebra 6.0.0 inatolewa Julai 10.
- Julai 27–28: Kazi ya sahihi ya Ironwood PCZT v2 ya Ledger inaunganishwa kwenye tawi la ujumuishaji. Ironwood (NU6.3) inaanza kutumika Julai 28 kwenye block 3,428,143, na kufunga bwawa la awali la Orchard nyuma ya turnstile inayoweka kikomo cha kiasi cha ZEC kinachoweza kutoka Orchard, kwa kiasi kilichowekwa humo kihalali, huku ikianzisha muundo mpya wa muamala.

Zebra inakuwa node inayohitajika, kwa kuwa zcashd haiungi mkono kanuni mpya za makubaliano. Anwani hazibadiliki kwa sababu Ironwood hutumia tena muundo wa mpokeaji wa Orchard, kwa hiyo pochi huelekeza anwani zilizopo kwenye bwawa jipya kiotomatiki. Pochi zinahitaji utendaji wa uhamishaji, kwa kuwa wamiliki lazima hatimaye wahamishe fedha za Orchard kwenda Ironwood, na makubaliano sasa yanazuia kabisa matokeo mapya yanayopokea Orchard.

### Mabadiliko ya kiufundi

Miundo ya miamala ilibadilika kutoka toleo la 5 hadi la 6, kwa hiyo muamala mmoja unaweza kuwa na kipengele cha Ironwood pamoja na vipengele vilivyokuwepo vya Sapling/Orchard/uwazi. PCZT ilipanuliwa sambamba:

- Usimbaji ulitoka PCZT v1 hadi v2.
- Kifurushi tofauti cha Ironwood sasa kipo pamoja na vile vya Sapling na Orchard.
- Miamala ya v6 na sighash mpya ya v6 vinaungwa mkono.
- Maandishi wazi ya dokezo yalipata toleo jipya (V3).

Mabadiliko ya sighash ni muhimu zaidi hasa kwa hardware wallet. Katika v6, anchor za Orchard na Ironwood hazijumuishwi kwenye heshi ya sahihi na hutumiwa tu kuhesabu digest ya data ya uidhinishaji. Hayo ni mabadiliko halisi ya firmware, si kuongeza tu nambari ya toleo. Kifaa lazima kitekeleze sighash mpya kwa usahihi na kijihesabie chenyewe badala ya kuamini dai la programu saidizi kuhusu kile kinachoidhinisha.

Mkataba wa utenganishaji wenyewe haukubadilika: kifaa bado hurejesha sahihi ya idhini ya matumizi pekee, kamwe `alpha`, na hakitoi sahihi ya binding; seva pangishi bado hushughulikia uthibitishaji na kila kitu kingine.

Hata hivyo, kanuni moja ya watia sahihi ilibadilika katika v6: matumizi ya kujaza nafasi kwa madokezo bandia hutiwa sahihi na IO Finalizer badala ya kifaa, kwa kuwa kifaa hakiwezi kuyathibitisha dhidi ya data halisi ya dokezo. Jukumu la Signer la kifaa huyaruka badala ya kuombwa kutia sahihi kitu ambacho hakiwezi kukikagua. Ada zinazoonyeshwa sasa pia hujumlisha salio la thamani la Orchard na Ironwood, kwa kuwa muamala wa v6 unaweza kutumia fedha kutoka bwawa lolote kati ya hayo mawili ndani ya muamala huo huo.

Kuhesabu salio la bwawa kwa usahihi kuna umuhimu wa vitendo, si wa kinadharia tu. Hitilafu ya hivi majuzi katika pochi ya Zcash ya Brave ni mfano mzuri: hesabu yake ya ada ilidhani kuwa pembejeo zote za faragha zilikuwa za bwawa la zamani la Orchard, na kusababisha vitendo kurudiwa na makadirio yasiyo sahihi ya ada kila muamala ulipohusisha Ironwood. Hii ndiyo aina hasa ya hitilafu ambayo kanuni ya “jihesabie mwenyewe upya, usimwamini seva pangishi” inayotumika kwenye utiaji sahihi wa hardware wallet inakusudiwa kugundua. Pochi saidizi ilikosea kuhesabu salio la bwawa, na ni kifaa pekee kinachokagua hesabu zake kwa kujitegemea ambacho kingeweza kutambua hilo kabla ya kuidhinisha sahihi.

### Hali ya kila mtia sahihi

**Ledger imebadilisha kabisa hali.** Mnamo Septemba 23, 2026, Ledger ilitoa usaidizi asilia wa faragha wa Zcash ndani ya Ledger Wallet Desktop, bila kuhitaji tena programu saidizi tofauti. Ufunguo wako wa kutumia pesa unabaki kwenye kifaa, kompyuta huhesabu muamala, nawe huidhinisha kila kitu kwenye skrini kabla hakijatiwa sahihi. Inasaidia Ironwood pekee, si mabwawa ya zamani ya Orchard au Sapling. Kikwazo ni kwamba programu ya zamani ya “Zcash Shielded” iliyoundwa na Zondax, ambayo ilihitaji pochi saidizi kama Zkool ili kufanya kazi, inasitishwa. Ledger iliweka Novemba 5, 2026 kuwa tarehe ya kuondoa programu hiyo ya zamani kwenye upatikanaji, kwa hiyo fedha ambazo bado zinahifadhiwa kupitia programu hiyo zinapaswa kuhamishwa hadi kwenye akaunti ya programu mpya.

**Keystone iko katika hali nzuri.** Firmware 3.0.2 iliongeza usaidizi kamili wa Ironwood mwezi Julai, na firmware 3.2.2 (Novemba 11, 2026) iliongeza usaidizi wa NU7 kwenye matoleo ya Web3 na Cypherpunk ([maelezo ya toleo](https://github.com/KeystoneHQ/keystone3-firmware/releases/tag/3.2.2)). Kwa kuwa NU7 inatumika kwenye Mainnet, sasisha hadi toleo la 3.2.2 au jipya zaidi kabla ya kutia sahihi.

**Hito imepiga hatua zaidi ya mafanikio ya awali ya testnet.** Ilifanikiwa kutia sahihi na kuwasilisha muamala wake wa kwanza halisi wa Orchard kwenda Ironwood kwenye hardware halisi (awali kwenye testnet). Masasisho yaliyofuata yalithibitisha mtiririko wa mainnet (Ironwood→Ironwood, Ironwood→Transparent, na mingine) kwenye hardware ya uzalishaji. Firmware thabiti na toleo pana zaidi bado vinaendelea kutayarishwa.

**Zkool hufanya kazi na programu zote mbili za Ledger.** Programu ya Zondax ndiyo inayositishwa kwenye Ledger. Zkool, ambayo ilitegemea programu hiyo kuwasiliana na vifaa vya Ledger, ilihamia kabla ya tarehe ya mwisho: tangu [6.30.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.30.0) (Septemba 12, 2026), pia hufanya kazi na programu rasmi mpya ya Zcash ya Ledger, ikiingiza UFVK kutoka kwenye kifaa na kutia sahihi miamala ya v6 (Ironwood), na bado inaunga mkono akaunti za programu ya Zondax. Matoleo yaliyofuata yaliendelea kufanya kazi kupitia njia ya Ledger (toleo la 6.32.0 huingiza akaunti za Ledger kupitia API ya GraphQL ya Zkool, na toleo la 6.36.0 lilirekebisha hitilafu ya programu kufungwa ilipopokea majibu mafupi ya Ledger). Kwa hiyo Zkool bado ni chaguo kwa watumiaji wa Ledger wanaotaka kutumia pochi saidizi badala ya Ledger Wallet Desktop.

Uhamishaji wenyewe una athari kubwa zaidi. Kwa kuwa kiasi kinachovuka mabwawa kiko wazi kwa umma, pochi hugawa uhamishaji katika madhehebu ya kawaida kwa muda badala ya kuhamisha salio lote kwa mkupuo mmoja unaoonekana; hii inamaanisha kuwa miamala mingi inahitaji kutiwa sahihi kwa kila uhamishaji, na ndiyo sababu hasa utiaji sahihi wa kundi la PCZT ulikuwa muhimu sana kwa hardware wallet.

Kazi ya firmware ya Ledger pia ilikumbana na mipaka ya vifaa: matumizi halisi ya dokezo yangeweza kufikia makumi ya maelfu ya miito ya mfumo wa kriptografia ndani ya amri moja, na kuamsha kifuatiliaji cha kifaa. Marekebisho yalipeleka hesabu za uga kwenye programu na kuhitaji hali ya muda inayoshirikiwa kutoshea ndani ya mipaka ya stack ya Nano X.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### Mageuzi kwa muhtasari wa picha moja

![The evolution in one picture](/content-images/orchard-to-ironwood-evolution.webp)
