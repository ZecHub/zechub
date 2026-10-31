# Usainishaji Baridi wa Faragha [Shielded Cold Signing]

> **Wazo kuu:** Pochi saidizi [companion wallet] huona kila kitu kinachohitajika kujenga na kufuatilia muamala wa faragha [shielded transaction]. Hardware wallet pekee ndiyo hushikilia mamlaka ya kuidhinisha utumiaji wa pesa. Mgawanyo huo ndiyo kiini kizima cha usainishaji baridi wa faragha.

Kuweka fedha katika hali ya faragha katika Zcash kunahusisha kuhamisha fedha kutoka anwani ya uwazi [transparent address] ya umma hadi anwani ya faragha, na kuficha maelezo ya muamala kwa kutumia vipengele vya faragha [privacy] vya Zcash.

### Nini hubadilika unapoweka ZEC katika hali ya faragha?

Kwa muamala wa uwazi wa Zcash, taarifa kama vile:

- anwani ya mtumaji
- anwani ya mpokeaji
- kiasi kilichohamishwa

zinaweza kuonekana kwenye blockchain.

Unapoweka ZEC katika hali ya faragha, fedha zako huhamia katika bwawa la faragha [private pool] (kama vile Ironwood). Blockchain inaweza kuthibitisha kwamba muamala ni halali bila kufichua maelezo yako binafsi ya muamala. Tangu uboreshaji wa mtandao [network upgrade] wa NU6.3 tarehe 28 Julai 2026, fedha mpya zinazowekwa katika hali ya faragha huingia katika bwawa la Ironwood kwa kuwa bwawa la zamani la Orchard halikubali tena amana mpya lakini bado linaruhusu utoaji wa fedha.

### Vipengele vya Muamala wa Faragha

### 1. Dokezo [Note] (Rekodi ya Salio la Faragha)

Dokezo ni rekodi ya faragha ya kriptografia inayowakilisha kiasi cha ZEC ambacho hakijatumika na kinamilikiwa na mtumiaji.

Tofauti na blockchain ya umma, ambako salio huorodheshwa kwa maandishi wazi, dokezo la faragha husimba thamani na maelezo ya umiliki ili waangalizi wa on-chain wasiweze kuona ni nani anamiliki fedha hizo.

Wakati wa kuanzisha muamala, pochi saidizi huchanganua daftari, hutambua madokezo ya mtumiaji ambayo hayajatumika, na huchagua madokezo yatakayotumika.

### 2. Nullifier (Mbinu ya Kugundua Matumizi Mara Mbili)

Kwa sababu maelezo ya dokezo yamefichwa katika daftari la umma, mtandao unahitaji mbinu ya kugundua matumizi mara mbili bila kufichua ni dokezo gani linatumika.

Nullifier ni alama ya kipekee ya kriptografia inayotokana na dokezo mahususi. Dokezo linapotumika, nullifier yake huchapishwa kwenye blockchain.

Mtandao huthibitisha kwamba nullifier haijarekodiwa hapo awali. Ikiwa haijarekodiwa, matumizi yanaweza kukubaliwa. Jambo muhimu ni kwamba mwangalizi wa nje hawezi kutumia nullifier kubaini dokezo mahususi lililotokana nayo.

Pochi saidizi hutokana na na huunda nullifier inayofaa kama sehemu ya kukusanya data ya muamala.

## Funguo

Funguo ni vipande vya taarifa za kriptografia vinavyodhibiti ufikiaji wa fedha zako na kuruhusu pochi yako kutekeleza shughuli kama kupokea, kutazama, na kutumia ZEC.

Pochi hushikilia funguo kadhaa tofauti, kila moja ikitimiza kusudi tofauti, sawa na jinsi akaunti moja inaweza kuwa na stakabadhi tofauti za ufikiaji wa kusoma dhidi ya ufikiaji wa kuandika.

Funguo ni muhimu katika uhusiano kati ya pochi saidizi na hardware wallet, kwa sababu funguo tofauti hutimiza madhumuni tofauti, na ni moja tu inayohitaji kubaki imefungiwa kwa usalama.

Ni muhimu kujua kwamba kila bwawa la faragha hujenga funguo zake kama mti wa utokaji, ambako mishale huelekeza kutoka kipengele hadi chochote kinachoweza kutolewa kutoka kwake. Watumiaji wanaotaka kupokea malipo ya faragha lazima wawe na anwani ya malipo ya faragha, ambayo hutengenezwa kutoka ufunguo wa kutumia pesa [spending key].

### Mpangilio wa funguo

**1. Ufunguo wa kutumia pesa**

Huu ndio ufunguo nyeti zaidi kwa usalama. Hutoa uwezo wa kriptografia wa kuidhinisha matumizi ya ZEC.

Huu ndio ufunguo unaorejelewa kila mara kauli “hardware wallet hushikilia ufunguo” inapotokea mahali pengine katika ripoti hii.

Katika usanifu wa usainishaji baridi, ufunguo wa kutumia pesa huhifadhiwa ndani ya hardware wallet na haufichuliwi kamwe kwa pochi saidizi. Pochi saidizi haipaswi kuhitaji kumiliki ufunguo huu hata kidogo.

Katika Sapling na Orchard zote mbili, mipangilio ya funguo hupata mamlaka ya kutumia pesa na uwezo wa kutazama kama matawi mawili tofauti kutoka ufunguo mkuu wa kutumia pesa:

- **Sapling:** Ufunguo uliopanuliwa wa kutumia pesa (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) hutoa funguo za kuidhinisha thibitisho [proof-authorizing keys] (𝑎𝑘,𝑛𝑠𝑘) na funguo kamili za kutazama [full viewing keys] (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘), ambazo baadaye hutoa funguo za kutazama zinazoingia [incoming viewing keys] (𝑖𝑣𝑘) na anwani mbalimbali.
- **Orchard:** Ufunguo mkuu wa kutumia pesa (𝑠𝑘) hujigawa moja kwa moja kuwa ufunguo wa kuidhinisha matumizi (𝑎𝑠𝑘) na ufunguo kamili wa kutazama (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Mgawanyo huu wa kimuundo hutoa msingi rasmi wa kriptografia wa kutenga funguo za vifaa, ambapo pochi husafirisha tawi la kutazama (UFVK) hadi kompyuta mwenyeji kwa ajili ya kusawazisha salio na kujenga miamala, huku ikihifadhi tawi la kuidhinisha matumizi likiwa limefungwa kabisa kwenye kifaa.

Utokaji wa funguo huelekea upande mmoja kwa ukamilifu. Hii inamaanisha funguo za kutazama haziwezi kurejeshwa ili kujenga upya mamlaka ya kutumia pesa. Kutorejesheka huko kwa kriptografia hufanya kusafirisha Unified Full Viewing Key (UFVK) kuwa salama kwa sababu kunatoa mwonekano kamili wa pochi bila kufichua siri za kutumia pesa zilizo kwenye kifaa.

**2. Funguo za kutazama**

Zcash hutenganisha uwezo wa kuona shughuli za faragha na uwezo wa kuzitumia. Ufunguo wa kutazama huruhusu pochi au mhusika mwingine aliyeidhinishwa kutazama taarifa kuhusu miamala ya faragha bila kutoa mamlaka ya kutumia pesa.

- **Full Viewing Key (FVK), iliyofungwa kama Unified Full Viewing Key (UFVK):** Hupatikana kimakusudi kutoka ufunguo wa kutumia pesa, na huruhusu programu kutambua na kufumbua shughuli za faragha za pochi, na hivyo kubaini miamala. Pia huruhusu programu kuhesabu salio bila kuwa na uwezo wa kuidhinisha matumizi. Inaelezewa vyema kama utokaji usio wa faragha sana wa ufunguo wa kutumia pesa, si nakala dhaifu ya seed.

Full Viewing Key (FVK) hutoa mwonekano kamili wa kusoma pekee huku ikidumisha utenganishaji mkali wa usalama. Kwa kufumbua maandishi yaliyosimbwa ya madokezo yanayoingia na yanayotoka (kupitia kipengele chake cha ufunguo wa kutazama unaotoka), pochi saidizi yenye FVK pekee inaweza kuonyesha historia kamili ya muamala yenye lebo badala ya salio linaloendelea tu.

Anwani nyingi za malipo mbalimbali zisizoweza kuhusishwa [unlinkable] hushiriki FVK moja na ufunguo wa kutazama unaoingia (IVK), zikihudumia uundaji wa anwani usio na kikomo bila kuongeza mzigo wa kuchanganua blockchain.

Utenganishaji huu wa kiutendaji huunda msingi wa mtiririko wa kazi wa usainishaji baridi. Uchanganuzi wote unaoendelea wa mnyororo [chain], ufuatiliaji wa historia, na usimamizi wa anwani huhamishiwa kwenye programu ya mwenyeji, huku mamlaka ya kutumia pesa yakibaki yametengwa kwenye kifaa cha hardware.

![Key derivation diagrams](/content-images/key-derivation-diagrams.webp)

### Tofauti muhimu: UFVK dhidi ya ufunguo wa kutumia pesa

> **UFVK inaweza kushirikiwa. Ufunguo wa kutumia pesa lazima ubaki kwenye hardware wallet.**
>
> Pochi saidizi hutumia ufunguo wa kutazama kufuatilia pochi, kugundua fedha zinazoingia, kutambua madokezo, na kusaidia kuandaa miamala. Haina ufunguo binafsi unaohitajika kuidhinisha matumizi.

Kama ilivyoelezwa awali, utenganishaji wa funguo ndio msingi wa usanifu wa usainishaji baridi.

Pochi saidizi inaweza kufanya kazi nyingi zinazohitajika kuandaa muamala bila kamwe kuwa na udhibiti wa fedha. Hardware wallet inahitaji tu kupokea muamala uliotayarishwa na kutekeleza operesheni ya mwisho ya kusaini.

Watengenezaji wa hardware wallet hawahitaji kubuni utenganishaji huu wao wenyewe. Muundo wa funguo wa Zcash tayari hutenganisha uwezo wa kutazama na mamlaka ya kutumia pesa katika kiwango cha itifaki, na watengenezaji hujenga tu kazi zao za kusaini na kusafirisha juu ya muundo huo uliopo. Itifaki huruhusu taarifa kama anwani ya faragha au ufunguo kamili wa kutazama kutolewa kutoka ufunguo wa kutumia pesa, huku ufunguo wa kutumia pesa wenyewe ukibaki binafsi, na hivyo kufanya iwezekane kwa hardware wallet kama Ledger, Keystone, na Hito kuipa programu saidizi taarifa ya kutazama inayohitaji bila kamwe kufichua ufunguo binafsi unaoweza kutumia fedha.

### Pochi saidizi hufanya nini hasa kwa taarifa za funguo

Kwa kutumia nyenzo za ufunguo wa kutazama, pochi saidizi inaweza:

- kutambua fedha na madokezo yako
- kubaini madokezo yanayoweza kutumika
- kupata au kutambua anwani husika
- kujenga muamala
- kutengeneza au kuratibu mathibitisho [proofs] yanayohitajika
- kuandaa muamala kwa ajili ya kusainiwa

Ni muhimu kujua kwamba kuhitaji kujenga muamala si sawa na kuhitaji ufunguo binafsi wa kutumia pesa. Utenganishaji huo ni mojawapo ya mawazo ya msingi ya usalama yanayounga mkono ujumuishaji wa hardware wallet.

## Ujenzi na Uidhinishaji wa Muamala wa Faragha

Hizi ni taratibu zinazohusika katika kuunda na kuidhinisha muamala. Kwa maneno rahisi, taratibu hizi ndizo pochi hufanya hasa kwa data hiyo kutuma fedha:

### Ujenzi wa Muamala (Kukusanya Muamala wa Faragha)

Ujenzi wa muamala ni mchakato wa kukusanya taarifa zinazohitajika kuunda muamala halali wa Zcash kutoka malipo yaliyokusudiwa na mtumiaji.

Mchakato wa ujenzi wa muamala huunganisha madokezo yaliyochaguliwa, wapokeaji, kiasi, ada [fees], nullifier, na data nyingine ya muamala inayohitajika katika muundo wa muamala. Kwa miamala ya faragha, pia huandaa taarifa zinazohitajika kwa utengenezaji wa mathibitisho ya maarifa sifuri [zero knowledge] na sahihi [signatures] zinazohitajika.

Kwa kawaida pochi saidizi hutekeleza hatua hii. Hufanya yafuatayo:

- Huchagua madokezo yatakayotumika
- Hubaini ingizo na matokeo ya muamala
- Hukokotoa thamani zinazohitajika
- Huandaa data ya muamala ambayo baadaye itathibitishwa na kusainiwa.

Katika mpangilio wa usainishaji baridi, data ya muamala inayotokana inaweza kufungwa katika PCZT na kupitishwa kwa hardware wallet kwa hatua muhimu kwa usalama ya kusaini.

### Uthibitishaji (Kuonyesha Uhalali wa Itifaki)

Uthibitishaji hurejelea utengenezaji wa mathibitisho ya maarifa sifuri (kama vile Halo 2 au Groth16) yanayoonyesha kwamba muamala unafuata kanuni za itifaki ya Zcash.

Thibitisho husaidia mtandao kuhakikisha kwamba:

- Mtumiaji anayetumia pesa ameidhinishwa kutumia madokezo
- Madokezo yapo kweli
- Nullifier zinazolingana ni za kipekee
- Jumla ya ingizo ni sawa na jumla ya matokeo pamoja na ada.

Hufanya yote haya bila kufichua maelezo yoyote ya msingi ya binafsi.

Utengenezaji wa thibitisho huhitaji uwezo mkubwa wa kompyuta. Kuhamisha jukumu hili kwa kifaa saidizi huzuia hardware wallet kusita au kuishiwa na kumbukumbu.

### Kusaini (Kuadhibisha Matumizi)

Kusaini ni tofauti kimsingi na uthibitishaji. Sahihi ya kidijitali hutenda kama alama dhahiri ya uidhinishaji inayozalishwa na mmiliki wa ufunguo binafsi.

Wakati thibitisho la maarifa sifuri huthibitisha uhalali wa muamala, sahihi ya kidijitali huthibitisha mamlaka ya kutumia pesa. Sahihi huthibitisha kwamba mmiliki halisi anaidhinisha vigezo mahususi vya uhamisho.

Kusaini kunahitaji uwezo mdogo wa kompyuta, na hivyo kufaa kwa hardware wallet.

### Usainishaji baridi wa faragha ni nini?

Usainishaji baridi wa faragha ni mbinu ya kuidhinisha muamala wa faragha wa Zcash huku ukihifadhi funguo binafsi za kutumia pesa zikiwa zimetengwa na pochi saidizi iliyounganishwa na intaneti. Muamala unaweza kujengwa na kuandaliwa kwenye kompyuta iliyo mtandaoni, huku hardware wallet tofauti, inayowekwa nje ya mtandao au kutengwa kwa njia nyingine, ikitumia funguo zake zilizolindwa kuidhinisha muamala.

Mchakato unaweza kurahisishwa kama ifuatavyo:

![Shielded cold signing process](/content-images/cold-signing-process.webp)

Pochi saidizi hutuma vigezo vilivyopangwa vya muamala kwenye kifaa cha hardware, ambacho husaini mzigo wa data ndani yake bila kamwe kutoa ufunguo binafsi wa kutumia pesa kwa mashine mwenyeji.

## Pochi Saidizi na Hardware Wallet

Miamala ya faragha inaweza kuhusisha pochi saidizi na hardware wallet, kila moja ikitimiza kazi tofauti.

### Pochi Saidizi

Pochi saidizi ni nini?

Pochi saidizi huendeshwa kwenye kompyuta au kifaa cha mkononi na hufanya kazi nyingi zinazohusika katika kuunda muamala, kama vile:

- Kuchagua madokezo yatakayotumika
- Kujenga muamala
- Kukokotoa data ya muamala inayohitajika
- Kuratibu utengenezaji wa mathibitisho ya maarifa sifuri yanayohitajika.

### Kwa nini pochi saidizi ni muhimu?

Pochi saidizi hushughulikia mchakato wa kuunda muamala, lakini kompyuta ikipata programu hasidi, mshambulizi anaweza:

- kuona unachofanya,
- kurekebisha muamala ambao haujasainiwa,
- kujaribu kukudanganya uidhinishe kitu fulani.

Pochi saidizi haihitaji kuwa na ufikiaji wa ufunguo binafsi uliohifadhiwa kwenye hardware wallet, kwa hiyo inaweza kushughulikia ujenzi wa muamala na kazi nyingine za kikokotozi huku hardware wallet ikitoa mpaka wa usalama kwa ufunguo binafsi.

### Hardware Wallet

Hardware wallet ni kifaa halisi kisicho mtandaoni kinachotenga funguo zako binafsi na simu au kompyuta zilizounganishwa, kikitenda kama hifadhi salama ya mali zako za kripto.

### Kwa nini hardware wallet ni muhimu?

Kompyuta yako ikipata programu hasidi, mshambulizi anaweza:

- kuona unachofanya,
- kurekebisha muamala ambao haujasainiwa,
- kujaribu kukudanganya uidhinishe kitu fulani.

Ufunguo binafsi hauwezi kutolewa tu kutoka hardware wallet, kwa hiyo kifaa kinaweza kutenda kama mpaka wa usalama.

Picha ya uwezo wa pochi saidizi dhidi ya hardware

Utenganishaji kati ya pochi hizi mbili ni muhimu hasa kwa miamala ya faragha kwa sababu ni changamano zaidi kuliko miamala ya uwazi na huhusisha vipengele kama madokezo ya faragha, nullifier, commitment, mathibitisho ya maarifa sifuri, na sahihi za miamala.

Isingekuwa halisi kwa hardware wallet kutekeleza kila operesheni ya kikokotozi. Badala yake, pochi saidizi huandaa muamala na kutoa taarifa zinazohitajika kwa hardware wallet kwa ajili ya kusaini, huku ufunguo binafsi wa kutumia pesa ukibaki umetengwa ndani ya kifaa cha hardware.

## Utenganishaji wa Funguo

> Utenganishaji wa funguo unamaanisha kwamba funguo binafsi zinazoweza kuidhinisha matumizi ya pesa haziondoki kamwe kwenye hardware wallet. Programu msaidizi inaweza kuandaa muamala; haiwezi kuutia sahihi.

Utenganishaji wa funguo hurejelea kutenga funguo binafsi zinazohitajika kuidhinisha muamala kutoka kwenye pochi msaidizi na kifaa kinachoendesha pochi hiyo. Katika usanidi wa utiaji sahihi wa baridi wa faragha [shielded], pochi msaidizi inaweza kuunda muamala na kuratibu mathibitisho yanayohitajika, huku hardware wallet ikidumisha funguo nyeti binafsi za kutumia pesa zikiwa zimetengwa.

Ikiwa kompyuta au simu ya msaidizi itaathiriwa, mshambulizi anaweza kuweza kuingiliana na muamala kabla haujatiwa sahihi, lakini kwa hali bora hawezi kutoa ufunguo binafsi kutoka kwenye hardware wallet. Kwa hiyo, ufunguo hubaki ndani ya mpaka wa usalama wa kifaa cha hardware.

Utenganishaji huu huruhusu pochi msaidizi kutekeleza uundaji wa miamala na kazi za kimahesabu bila kuipa ufikiaji wa moja kwa moja wa nyenzo za funguo zinazohitajika kuidhinisha muamala.

![Key isolation](/content-images/key-isolation.webp)

Tofauti muhimu ya kuelewa ni kwamba “ufunguo wa kutazama [viewing key]” haimaanishi programu inapokea toleo dhaifu la seed.

Katika Zcash, Full Viewing Key (FVK/UFVK) hutolewa kimakusudi kutoka kwenye ufunguo wa kutumia pesa na humpa mmiliki uwezo wa kugundua na kusimbua shughuli husika za faragha, lakini si kuidhinisha matumizi ya pesa. FVK ni kitoleo kisicho cha siri sana cha ufunguo wa kutumia pesa.

**Tahadhari moja muhimu kuhusu faragha:**

Kwa hiyo inapaswa kujulikana kwamba programu haiwezi kuiba fedha kwa UFVK pekee, lakini inaweza kuona shughuli binafsi za faragha za pochi.

Ndiyo maana ni sahihi zaidi kueleza programu msaidizi kuwa ina *mamlaka ya kutazama*, badala ya kusema tu ina “taarifa za umma.”

Njia rahisi zaidi ya kueleza wazo lote ni kwamba pochi msaidizi hupata nyenzo za funguo za kutosha kujua kinachoendelea kwenye pochi, lakini si nyenzo za funguo za kutosha kuidhinisha kinachotokea kwa fedha za pochi. Hata hivyo, hardware wallet huhifadhi mamlaka ya kutumia pesa yakiwa yametengwa na huyatumia tu mtumiaji anapoidhinisha muamala.

Huu ndio muundo msingi wa utenganishaji wa funguo unaotumika katika miundo hii ya hardware wallet za faragha za Zcash, na ni muundo huohuo unaojitokeza, utekelezaji kwa utekelezaji, katika Ledger, Keystone, na Hito ambazo zitafunikwa hivi karibuni.

## PCZT

PCZT inamaanisha Muamala wa Zcash Ulioundwa kwa Sehemu. Ni kifurushi kinachobeba muamala wa Zcash na taarifa zinazohitajika kuukamilisha kutoka hatua moja hadi nyingine.

Ni umbizo sanifu la muamala wa Zcash wakati muamala huo bado unaundwa. Huwaruhusu washiriki au vifaa tofauti kutekeleza sehemu tofauti za mchakato wa kuunda muamala na kupitisha muamala uliokamilishwa kwa sehemu kati yao.

Kuunda muamala ni changamano zaidi kwa kiasi kikubwa kuliko kutia sahihi uhamisho rahisi wa umma katika itifaki za sarafu za kidijitali za maarifa sifuri [zero-knowledge] kama Zcash. Miamala ya faragha huhitaji mathibitisho ya maarifa sifuri yenye matumizi makubwa ya hesabu, kama yale yanayotengenezwa kwa kutumia Halo 2 au Groth16. Kwa hiyo, vifaa vyenye nguvu ndogo kama hardware wallet vinaweza kukosa kumbukumbu na uwezo wa uchakataji wa kushughulikia mchakato mzima wa muamala.

Kuanzishwa kwa PCZT kunatatua changamoto kadhaa kuu katika usanifu wa crypto ya faragha. PCZT ni umbizo sanifu la data ya kati linalogawanya uundaji wa muamala katika majukumu huru ya moduli. Huiruhusu kompyuta msaidizi yenye nguvu kushughulikia uunganishaji wa muamala na utengenezaji wa thibitisho, huku ikiiwekea hardware wallet isiyo mtandaoni jukumu la uidhinishaji na utiaji sahihi pekee.

### Vikwazo vya Hardware na Hifadhi Baridi

Ingawa hardware wallet hutoa mazingira salama ya kulinda funguo binafsi za kutumia pesa, kwa kawaida zina RAM, nguvu ya kompyuta, na uwezo wa kuhamisha data ulio mdogo ikilinganishwa na kompyuta wasaidizi. Vikwazo hivi hufanya isiwe ya vitendo kwao kutekeleza utengenezaji wa thibitisho la maarifa sifuri lenye matumizi makubwa ya hesabu au kudumisha hali kamili ya muamala inayohitajika wakati wa mchakato wa uundaji wa muamala.

Kwa hiyo, pochi msaidizi inaweza kushughulikia kazi zinazohitaji nguvu kubwa za kompyuta, huku hardware wallet ikibaki ikilenga operesheni muhimu kwa usalama ya kuidhinisha muamala kwa funguo zake za kutumia pesa zilizolindwa.

Hii inakufanya ujiulize, ikiwa kifaa kina vikwazo hivi, kinawezaje bado kufanya uthibitishaji wa *kutosha* ili kiaminike?

Kwa ufupi, hardware wallet haiwezi kukubali thamani holela kutoka kwenye kompyuta msaidizi na kuitia sahihi. Inahitaji taarifa za kutosha kuthibitisha kuwa thamani inayotiwa sahihi inalingana na muamala ambao mtumiaji anakusudia kuidhinisha. Hili huleta uwiano mgumu kwa sababu kifaa lazima kitekeleze uchanganuzi na uthibitishaji wa kutosha kulinda mchakato wa kutia sahihi, huku kikifanya kazi ndani ya mipaka mikali ya kumbukumbu, hesabu, ukubwa wa firmware, na uchangamano wa utekelezaji.

Ushughulikiaji wa Ledger wa Orchard PCZT ni mfano wa changamoto hii, ukionyesha kwamba uchanganuzi maalumu unaotegemea circuit unaweza kufanya utekelezaji udhibitiwe zaidi kwenye vifaa vyenye vikwazo, lakini unaweza pia kuhitaji mabadiliko ya firmware miundo ya miamala au circuits zinazotumika inapobadilika.

Juhudi mbili zinazoendelea zinaonyesha majibu tofauti kwa kizuizi hiki.

Pendekezo la utafiti kuhusu mfumo kamili wa uthibitishaji wa wakati thabiti unaofaa kwa usanifu wa hardware wallet wa chanzo huria na kompyuta za kawaida lilitolewa katika Ruzuku #423. Lengo lilikuwa kuchunguza miundombinu ya kriptografia inayoweza kutekelezwa kwa usalama katika mazingira kama C au Rust huku ikipunguza changamano na mzigo wa matengenezo wa usaidizi wa Zcash wa faragha.

Hata hivyo, mbinu mbadala inawakilishwa na **Zcash SeedSigner** inayopendekezwa, ambayo ni kitia sahihi cha chanzo huria, kisichounganishwa na mtandao, kilichoundwa kwa vipengele vya bei nafuu vinavyopatikana kwa urahisi. Mtiririko wake wa kazi unaopendekezwa hutenganisha kompyuta msaidizi na kifaa cha kutia sahihi, ukipitisha PCZT katika pengo la hewa kwa uthibitishaji na utiaji sahihi kwenye kifaa.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Kwa pamoja, mbinu hizi zinaonyesha changamoto pana ya uhandisi nyuma ya hardware wallet za faragha: uundaji wa muamala na uthibitishaji unaweza kufanyika nje ya kifaa muhimu kwa usalama, lakini kitia sahihi lazima bado kiwe na taarifa na uwezo wa uthibitishaji wa kutosha ili kuidhinisha muamala unaotokana kwa usalama.

### PCZT Huwezesha Usanifu Uliogawanywa

Kiwango cha Muamala wa Zcash Ulioundwa kwa Sehemu (PCZT) ni muundo rasmi wa data unaounganisha pochi msaidizi na hardware wallet.

Pochi msaidizi inaweza kushughulikia uteuzi wa madokezo [notes], kukokotoa nullifier, na kutengeneza thibitisho la maarifa sifuri peke yake. Hili linawezekana kwa sababu taarifa zinazohitajika kwa hatua hizi, ikiwemo ufunguo unaotumiwa kutoa nullifier, hutoka kwenye ufunguo wa kutazama badala ya kitu chochote kinachohusiana na mamlaka ya kutumia pesa. Kisha pochi msaidizi hufunga vipengele hivi kwenye kontena la PCZT.

PCZT hukabidhiwa kwa hardware wallet, ambayo husoma muktadha wa muamala (kama vile kiasi na anwani za wapokeaji), hutia sahihi kwa kutumia funguo zake za kutumia pesa zilizolindwa, na kurudisha PCZT iliyosasishwa kwenye kifaa msaidizi.

Muundo huu huweka mpaka mkali wa usalama: hardware ya mwenyeji yenye nguvu inaweza kutekeleza hesabu changamano za maarifa sifuri bila kuhitaji ufikiaji wa funguo za kutumia pesa, huku vifaa vya hifadhi baridi vyenye nguvu ndogo vikiweza kutekeleza usalama wa kifedha bila kuhitaji kukokotoa kriptografia nzito.

### Maafikiano ya Faragha ya Prover

Ingawa kukabidhi utengenezaji wa thibitisho la maarifa sifuri kwa pochi msaidizi au prover nyingine huweka funguo za kutumia pesa zikiwa zimetengwa, bado kunahitaji prover kufikia taarifa nyeti za muamala, kama vile thamani za dokezo, anwani za wapokeaji, na commitment.

PCZT hudumisha utenganishaji wa usanifu kwa kuhakikisha taarifa hizi zinaweza kutolewa kwa uthibitishaji bila kuhamisha funguo binafsi za kutumia pesa zinazohitajika kwa uidhinishaji.

Hii huhakikisha mamlaka ya uthibitishaji yanatenganishwa na mamlaka ya kutumia pesa. Prover inaweza kutekeleza utengenezaji wa thibitisho wenye matumizi makubwa ya hesabu bila kupata mamlaka ya kriptografia ya kutumia fedha za mtumiaji.

### Uwezo wa Kushirikiana wa PCZT

Kadiri PCZT inavyokuwa sehemu muhimu ya mtiririko wa kazi wa hardware wallet za Zcash, utiaji sahihi wa saini nyingi, na utiaji sahihi usio na muunganisho wa mtandao, uwezo wa kushirikiana kati ya utekelezaji huru unazidi kuwa muhimu.

Pendekezo la Juni 2026 la AngryDavee lilibainisha kwamba utekelezaji wa PCZT tayari ulikuwepo katika miradi ikiwemo Ledger, Keystone, Hito, OneKey, na utekelezaji rejeleo katika librustzcash. Hata hivyo, pendekezo hilo lilibainisha ukosefu wa majaribio ya pamoja ya kuthibitisha kwamba utekelezaji huu hutafsiri PCZT kwa njia thabiti.

Suluhisho lililopendekezwa lilikuwa seti ya majaribio ya uwezo wa kushirikiana ya chanzo huria yenye vektor za majaribio ya kikanoni za PCZT na majaribio ya utekelezaji mtambuka yanayofunika mtiririko kamili wa kuunda → kutia sahihi → kukamilisha. Pia lilipendekeza kujaribu mipaka ya majukumu kama Combiner, ambapo taarifa zilizotiwa sahihi kwa sehemu kutoka kwa watia sahihi tofauti zinaweza kuunganishwa kabla muamala haujakamilishwa.

Hili ni muhimu hasa kwa hardware wallet kwa sababu PCZT huruhusu uundaji wa muamala na utiaji sahihi kutenganishwa: pochi msaidizi inaweza kuunda muamala na kuandaa PCZT, huku kifaa cha hardware kikipokea taarifa inayohitajika ya utiaji sahihi na kutekeleza operesheni muhimu kwa usalama ya kutia sahihi.

Pendekezo halikutekelezwa kwa sababu Zcash Community Grants iliamua kutoendelea na ruzuku baada ya kupitia pendekezo hilo na kuzingatia maoni ya jumuiya. Kwa hiyo, seti ya majaribio ya utekelezaji mtambuka iliyopendekezwa haikuundwa kupitia ruzuku hii. Kwa hiyo ni jibu lililopendekezwa kwa changamoto iliyotambuliwa ya uwezo wa kushirikiana wa PCZT, wala si kiwango kinachopatikana sasa katika Zcash.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### Mzunguko wa Maisha wa PCZT

| # | Hatua | Maelezo |
|---|---|---|
| 1 | Muundaji | Huanzisha PCZT kwa metadata ya muamala ya kimataifa, ikiwemo matoleo ya muamala, vitambulisho vya tawi la makubaliano, na alama za bwawa. |
| 2 | Mjengaji | Hujaza muamala kwa ingizo na toleo lengwa katika mabwawa ya uwazi, Sapling, Orchard, au Ironwood. |
| 3 | Kithibitishaji cha Mwisho cha IO | Hutangaza seti ya ingizo na toleo kuwa kamili, hukokotoa funguo za sahihi za kuunganisha, na kutia sahihi matumizi ya pesa ya majaribio inapohitajika. |
| 4 | Kisasishaji | Huambatisha data ya muktadha inayohitajika kwa washiriki wanaofuata, kama vile funguo kamili za kutazama, anchors, na mashahidi wa Merkle. |
| 5 | Prover na Mtia Sahihi | Hutekeleza utengenezaji wa thibitisho la maarifa sifuri na utiaji sahihi wa kriptografia. Katika matoleo ya kisasa ya PCZT, kazi hizi mbili ni huru kabisa na zinaweza kufanyika kwa mfuatano au sambamba. |
| 6 | Combiner | Huunganisha matukio mengi ya PCZT kwa njia bainifu ikiwa vifaa tofauti vinafanyia kazi vipengele vya muamala mmoja kwa wakati mmoja. Sheria za kuunganisha zinahitaji utatuzi mkali wa migongano ili kuzuia upotevu wa data usiokusudiwa. |
| 7 | Kithibitishaji cha Mwisho cha Matumizi ya Pesa na Kitoa | Huthibitisha vipengele vyote vya kriptografia vinavyohitajika, huondoa metadata ya muktadha wa kati, na hutoa muamala wa Zcash uliokamilishwa tayari kutangazwa kwenye mtandao. |

## Utekelezaji wa Hardware Wallet katika Ulimwengu Halisi

### Kwa mtazamo

| Kifaa   | Kile anachopokea msaidizi              | Kile kinachobaki kwenye kifaa          | Usafirishaji      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / Orchard FVK, anwani            | Mamlaka ya kutumia pesa                | USB / BLE      |
| Keystone | UFVK + Anwani Iliyounganishwa                   | Seed / funguo za kutumia pesa              | QR (isiyounganishwa na mtandao)|
| Hito     | UFVK, Anwani Iliyounganishwa, alama ya kidole ya seed  | Seed na funguo binafsi za kutumia pesa    | QR / ndani     |


Utekelezaji kadhaa wa hardware wallet umetengenezwa kuchunguza jinsi miamala ya faragha ya Zcash inavyoweza kutumika huku funguo nyeti za kutumia pesa zikiwekwa mbali na pochi msaidizi. Ledger, Keystone, na Hito zinawakilisha mbinu tofauti za kuunganisha ulinzi wa funguo unaotegemea hardware na mtiririko wa kazi wa muamala wa Zcash.

![Real world hardware wallet implementations](/content-images/hardware-wallet-implementations.webp)

Ili kuelewa jinsi zinavyolinda fedha za faragha, ni muhimu kutofautisha funguo za kutumia pesa na funguo za kutazama. Katika zote tatu, mgawanyo unafuata muundo uleule:

| Kifaa | Kile ambacho programu msaidizi inaweza kupokea | Kile kinachobaki kimehifadhiwa kwenye kifaa |
|---|---|---|
| Ledger | UFVK / Orchard FVK, anwani na taarifa za umma | Mamlaka ya kutumia pesa / nyenzo binafsi za funguo |
| Keystone | UFVK + Anwani Iliyounganishwa | Seed / funguo za kutumia pesa |
| Hito | UFVK, Anwani Iliyounganishwa, alama ya kidole ya seed na taarifa za mtandao | Seed na funguo binafsi za kutumia pesa |

### Ledger kama Mazingira ya Hardware ya Kutia Sahihi

Ledger ni kampuni ya hardware wallet. Vifaa vyake hujengwa kuzunguka Secure Element, chip maalumu iliyoundwa kushikilia nyenzo binafsi za funguo na kuziweka zimetengwa kimwili na sehemu nyingine za kifaa, pamoja na chochote kilichounganishwa nacho. Secure Element hiyo ndiyo sababu kuu inayofanya kifaa cha Ledger kiaminke kwa hifadhi baridi. Hii inamaanisha hata kama kompyuta au simu iliyounganishwa nacho imeathiriwa, funguo zilizo ndani ya Secure Element haziwezi kutolewa.

Hata hivyo, kifaa cha Ledger chenyewe ni tupu kuhusu sarafu yoyote mahususi ya kidijitali. Kinahitaji programu iliyosakinishwa inayojua jinsi ya kushughulikia kriptografia mahususi ya sarafu hiyo.

Kifaa cha Ledger ni tupu kuhusu sarafu yoyote mahususi ya kidijitali, kwa hiyo kinahitaji programu inayojua kriptografia ya sarafu hiyo. Kwa Zcash kumekuwa na vizazi viwili:

- Programu asili ya “Zcash Shielded” iliyoundwa na Zondax, iliyotumiwa na pochi wasaidizi kama Zkool na inayoondolewa tarehe 5 Novemba 2026, na
- Programu mpya ya Zcash ya Ledger (3.9.4+), inayotumiwa moja kwa moja na Ledger Wallet Desktop 4.21+ kwa Ironwood za faragha za ZEC.

Muundo wa utenganishaji wa funguo ulio hapa chini unatumika kwa zote mbili.

Zkool ni pochi msaidizi kwenye simu au kompyuta yako inayowasiliana na programu hiyo. Huunda muamala, huutuma kwa Ledger, programu ya Zondax kwenye kifaa kisha huitia sahihi na kurudisha sahihi hiyo.

Kwa hiyo Zondax ni programu inayoendeshwa kwenye hardware, Zkool ni programu inayoendeshwa nje yake na kutumia programu ya Zondax kuwasiliana na kifaa.

### Nini hutoka kwenye Ledger?

Programu ya Zcash ya Ledger inajumuisha kazi mahususi ya kuhamisha ufunguo wa kutazama wa pochi, ambao ni ufunguo unaoruhusu programu kuona salio na miamala bila kuweza kutumia chochote.

Kazi hii inaweza kurejesha mojawapo ya vitu viwili:

- Full Viewing Key Iliyounganishwa ya Kutazama (UFVK), ambayo ni ufunguo kamili wa kutazama unaofunika mabwawa yote ya faragha ya Zcash kwa wakati mmoja, au
- Orchard Full Viewing Key (FVK)

Vyovyote vile, kinachotoka daima ni ufunguo wa kutazama pekee. Bila kujali toleo unaloomba, kazi hii haina njia ya kurejesha kipande kimoja cha taarifa ambacho kingemruhusu mtu kuhamisha fedha, yaani ufunguo wa kutumia pesa.

Hilo ndilo lengo lote la jinsi ilivyojengwa: imeundwa hivi kwamba kitu pekee inachoweza kuhamisha ni kitu salama cha kuipa programu msaidizi.

Daraja la funguo la Zcash limeundwa hivi kwamba kwa kila bwawa la faragha, ufunguo wa kutumia pesa hutoa vitu viwili tofauti:

- Ufunguo wa kuidhinisha matumizi ya pesa, na
- Ufunguo kamili wa kutazama

Kisha FVK inaweza kutoa uwezo zaidi unaohusiana na kutazama, lakini hakuna wakati njia hiyo ya utoaji hurudi kwenye mamlaka ya kutumia pesa. Mara ufunguo unapoingia katika upande wa kutazama wa daraja hilo, hubaki huko na hauwezi kutumiwa kujenga upya ufunguo wa mamlaka ya kutumia pesa ulioutoa.

Ironwood hufuata muundo huu huu, kwa kuwa hutumia upya uundaji wa msingi wa funguo na madokezo wa Orchard. Hata hivyo, ni bwawa tofauti katika kiwango cha makubaliano, likiwa na mti wake wa commitment na seti ya nullifier. Hii ina maana UFVK kwa kweli ni mkusanyiko wa funguo za kutazama za kila bwawa (uwazi, Sapling, Orchard, na sasa Ironwood), si ufunguo mmoja tambarare.

UFVK iliyohamishwa kabla ya Ironwood kuamilishwa haitajumuisha ufunguo wa kutazama wa Ironwood, kwa sababu bwawa hilo halikuwepo bado. Hii ndiyo sababu pochi zilihitaji kusasishwa kutambua na kutoa UFVK zinazoweza kutumia Ironwood baada ya uboreshaji wa NU6.3.

### Nini hubaki kwenye Ledger?

Mamlaka ya kutumia pesa hubaki kwenye kifaa.

Mtia Sahihi wa Ledger hupokea muamala/PCZT kutoka kwa mwenyeji na hutengeneza sahihi ya uidhinishaji wa matumizi ya pesa kulingana na bwawa ambamo muamala unatumia pesa (bwawa la Ironwood kwa sababu muunganisho wa sasa wa Ledger unaauni Ironwood pekee). Kisha sahihi hiyo hutengenezwa kwenye kifaa, na mwenyeji hupokea sahihi pekee, si ufunguo binafsi wa kutumia pesa.

Hili pia linaendana na muundo wa jumla wa usalama wa Ledger. Secure Element yake hutenga nyenzo binafsi za funguo, na mahitaji ya usalama wa programu ya Ledger yanakataza mahususi programu kufichua siri hizo kwa mwenyeji.

Mtia sahihi wa Ledger anaweza kuhamisha FVK/UFVK huku akitia sahihi miamala kivyake. Uwezo huu miwili hutolewa kupitia kazi tofauti, wala haijaunganishwa katika moja.

### Hilo linamaanisha nini kwa vitendo?

Tuseme Ledger yako ina ZEC 10.

Pochi msaidizi inaweza kuwa na UFVK na kwa hiyo kubaini: “Pochi hii imepokea ZEC 10.” Inaweza kuchanganua na kuonyesha miamala na salio.

Lakini mtu akiathiri pochi msaidizi, UFVK pekee haiwapi uwezo wa kuunda sahihi ya uidhinishaji wa matumizi ya pesa.

Madhumuni ya sahihi tofauti ya uidhinishaji wa matumizi ya pesa ni kuwezesha vifaa vyenye vikwazo kama hardware wallet kuidhinisha matumizi ya pesa ya faragha bila kutekeleza thibitisho kamili la zk-SNARK vyenyewe.

### Programu ya Zondax Ledger; upande wa hardware wallet

#### Zondax ni nini?

Zondax ni kampuni huru ya maendeleo iliyounda programu ya Ledger Zcash. Ni programu halisi ya firmware inayoendeshwa kwenye hardware ya Ledger na kukipa kifaa uwezo wa kuelewa na kushughulikia miamala ya Zcash hapo awali.

Zondax ni msanidi programu wa nje. Hardware ya Ledger haina uwezo wa asili wa kushughulikia miamala ya Zcash, na uwezo huo unatokana kabisa na programu ya Zondax.

### Utekelezaji asili wa Zcash Ledger

Hifadhi ya programu ya Ledger Zcash ya Zondax ndiyo programu inayoendeshwa kwenye kifaa cha Ledger. Programu hiyo hapo awali ililenga miamala ya faragha ya Sapling, kabla Orchard haijakuwepo kama bwawa kuu la faragha la Zcash, kwa hiyo usaidizi wa Sapling ndio ulikuwa upeo wa kile ambacho kifaa cha Ledger kingeweza kufanya kwa ZEC za faragha.

Usanifu wake unaonyesha utenganishaji huu, huku upande wa mwenyeji/msaidizi ukiandaa taarifa za muamala na Ledger ikishughulikia operesheni nyeti za funguo na utiaji sahihi.

Hata katika toleo hili la kwanza kabisa la usaidizi wa hardware wallet wa Zcash, kanuni kuu—uundaji na uthibitishaji kwenye mwenyeji, kisha utiaji sahihi uliotengwa kwenye kifaa—tayari zilikuwa muundo uliokusudiwa.

### Mageuzi kuelekea Orchard

Kazi ya Ledger ilielekea Orchard + PCZT. Haya yalikuwa mabadiliko yenye maana, si sasisho dogo, kwa kuwa Orchard hutumia mfumo tofauti wa uthibitishaji (Halo 2, dhidi ya Groth16 ya Sapling) na uundaji tofauti wa dokezo na ufunguo, kwa hiyo kupanua firmware ya Sapling pekee kushughulikia utiaji sahihi wa Orchard kulihitaji msingi mpya wa kriptografia upande wa kifaa, si kiraka cha firmware tu.

Hata hivyo, kadiri Zcash ilivyoelekea Ironwood, Zondax na Ledger zilihamisha mwelekeo wao wa maendeleo kuelekea kuunga mkono Ironwood moja kwa moja, badala ya kukamilisha utekelezaji wa Orchard ili baadaye kuuunda upya kwa ajili ya Ironwood. Hii inawakilisha hatua zaidi katika mageuzi ya utekelezaji wa Ledger, kwani Ironwood hujenga juu ya usanifu wa kriptografia wa Orchard huku ikianzisha bwawa tofauti la faragha na mabadiliko ya ziada ya itifaki.

### Kinachotokea ndani ya programu hii ya Ledger

Mtiririko unaotokana unaelezwa kama:

1. Mwenyeji huunda PCZT.
2. Mwenyeji hutuma taarifa husika za muamala kwenye kifaa cha Ledger.
3. Kifaa hutengeneza sahihi za uidhinishaji wa matumizi ya pesa za Orchard.
4. Mwenyeji hushughulikia kila kitu kinachofuata, ikiwemo sahihi ya kuunganisha na uunganishaji wa mwisho wa muamala.

Programu inayoendeshwa ndani ya Ledger haioni wala haitengenezi chochote zaidi ya sahihi ya uidhinishaji wa matumizi ya pesa yenyewe, na kazi zote nzito kimahesabu au zinazohitaji data nyingi (uthibitishaji, kuunganisha, uunganishaji) hubaki kwenye mwenyeji, ambako hauhitaji kuaminiwa kwa nyenzo za funguo.

### Muunganisho asili wa faragha wa Ledger; Ledger Wallet Desktop

Muunganisho wa hivi karibuni wa Zcash wa Ledger hutoa mfano halisi wa jinsi uundaji wa muamala wa faragha na utiaji sahihi muhimu kwa usalama vinaweza kutenganishwa kati ya programu msaidizi na hardware wallet.

Kwa Ledger Wallet Desktop 4.21+ na programu ya kifaa cha Zcash 3.9.4+, watumiaji wanaweza kutuma na kupokea Ironwood za faragha za ZEC moja kwa moja kupitia Ledger Wallet Desktop. Muunganisho huu unaauni uhamisho wa faragha-kwa-faragha, kuweka fedha kwenye bwawa la faragha kutoka bwawa la uwazi, kutoa fedha kutoka bwawa la faragha kwenda bwawa la uwazi, anwani za kupokea za faragha, na jumbe. Miamala huthibitishwa na kutiwa sahihi kwenye kifaa cha Ledger badala ya kutegemea pekee taarifa zinazoonyeshwa na kompyuta.

Sehemu muhimu ya usanifu huu ni utenganishaji wa uwezo wa kutazama na kutumia pesa. Wakati wa usawazishaji wa salio la faragha, Ledger huhamisha Full Viewing Key Iliyounganishwa ya Kutazama (UFVK), ambayo huhifadhiwa ndani ya kompyuta. UFVK huwezesha Ledger Wallet Desktop kugundua miamala husika ya faragha na kubaini salio la pochi, lakini haitoi mamlaka ya kutumia fedha. Mamlaka muhimu kwa usalama ya kutumia pesa hubaki kwenye kifaa cha Ledger, kinachotekeleza operesheni ya mwisho ya kutia sahihi. Hii huweka mpaka wazi kati ya kompyuta, inayosimamia hali ya pochi na kuunda miamala, na kifaa cha hardware, kinacholinda uwezo unaohitajika kuidhinisha matumizi ya pesa.

Hata hivyo, muunganisho wa sasa ni wa Ironwood pekee. Hauonyeshi wala hausimamii fedha za Orchard au Sapling kupitia Ledger Wallet Desktop. Hili ni muhimu kihistoria kwa sababu maendeleo ya awali ya Ledger ya Zcash yalihusishwa na usaidizi wa faragha wa Orchard kabla utekelezaji haujaelekea itifaki ya Ironwood.

Mpito huo pia unaonyesha umuhimu wa uoanifu wa funguo na akaunti. Ledger ina programu ya zamani ya “Zcash Shielded” iliyotengenezwa na Zondax na kutumiwa na miunganisho kama YWallet na zkool, ambayo sasa inaondolewa. Kwa sababu programu hiyo ya zamani ilitumia mpango tofauti wa utoaji wa akaunti za faragha, akaunti zake za Sapling haziwezi kutolewa tena kwa urahisi na programu mpya ya Ledger.

Kwa hiyo muunganisho huu unaonyesha maendeleo na vikwazo vilivyosalia vya usaidizi wa hardware wallet za faragha. Ledger sasa inaweza kutoa uzoefu kamili wa Ironwood ambapo programu msaidizi hushughulikia usawazishaji wa pochi na utayarishaji wa muamala huku kifaa cha hardware kikibaki kuwa mpaka wa usalama wa matumizi ya pesa.

Wakati huohuo, uoanifu wa kihistoria wa akaunti, usaidizi wa mabwawa mahususi ya faragha pekee, mipaka ya ukubwa wa miamala ya hardware, vikwazo vya majukwaa, na vikwazo vya kimahesabu na firmware vinavyohusika katika kuchanganua na kuthibitisha miamala ya faragha vinaonyesha kwamba usaidizi wa hardware wallet kwa Zcash hautegemei tu uwezo wa itifaki, bali pia muundo na rasilimali za kila utekelezaji binafsi.

### Zkool + Ledger — kutumia programu rasmi ya Zondax

Kama mrithi wa Ywallet, Zkool ilirithi lengo la utiaji sahihi wa baridi wa faragha lakini ikachukua njia tofauti kulifikia, njia iliyoundwa moja kwa moja na ukweli kwamba kriptografia pekee haifanyi muunganisho uweze kutumiwa ikiwa programu ya utiaji sahihi haiwezi kusambazwa kwa usalama.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Matumizi ya Zkool ya programu ya Zondax

Zkool ilielekea kutumia programu rasmi ya Ledger Zcash iliyotengenezwa na Zondax, badala ya programu yake ya umiliki ya Ledger iliyoachwa ya Ywallet. Badala ya kudumisha programu maalumu ambayo duka la Ledger lisingekubali, Zkool ilijenga juu ya programu ambayo tayari ilikubaliwa na kusambazwa kupitia mazingira ya Ledger yenyewe.

Mabadiliko hayo yalimaanisha watumiaji hawakuhitaji tena kutegemea kusakinisha programu maalumu ya Ledger isiyotiwa sahihi ili kutumia muunganisho huu, kwa kuwa programu ya Zondax ilisambazwa rasmi kupitia mazingira ya Ledger.

Hata hivyo, muunganisho huu unakabiliwa na mabadiliko muhimu tarehe 5 Novemba 2026, wakati usaidizi wa programu ya zamani ya Zcash Shielded umepangwa kukoma huku Ledger ikiiondoa. Kwa sababu muunganisho wa Zkool wa Ledger hutegemea programu hii, mabadiliko hayo huibua maswali kuhusu upatikanaji wa baadaye wa muunganisho uliopo. Athari halisi kwa Zkool inategemea ikiwa inaweza kuendelea kutumia programu ya zamani nje ya Ledger Wallet au kuhamia mbadala unaooana.

### Mabwawa ya faragha yanayoungwa mkono

Kulingana na msanidi programu wa Ywallet, muunganisho wa Ledger wa Zkool ulitumia programu rasmi ya Ledger iliyotengenezwa na Zondax na uliauni Zcash za uwazi na za faragha. Hata hivyo, usaidizi wake wa faragha ulikuwa mdogo kwa Sapling na haukuunga mkono Orchard, pamoja na vikwazo vingine vya muunganisho kama idadi ya juu ya ingizo na toleo tano za kila aina na kutokuwepo kwa uoanifu wa Ledger Live.

Kizuizi hiki kiliakisi upeo wa utekelezaji wa msingi wa Zondax Ledger wakati huo. Kazi ya awali ya Zondax kuhusu Ledger ilitoa usaidizi wa Sapling, na utoaji wake uliofuata wa 2024 wa programu ya Zcash Shielded Ledger mwanzoni haukujumuisha Orchard na Unified Addresses. Kwa hiyo, ujumuishaji ulioundwa kuzunguka programu hiyo ulirithi uwezo na vikwazo vya utekelezaji wa hardware wallet ulioutegemea.

Hali hiyo baadaye ilibadilika kwa kutolewa kwa App maalumu ya Zcash Shielded Ledger mnamo Novemba 2024. Zondax ilisema kwamba programu hiyo ilikuwa imetolewa rasmi kupitia Ledger Live na baadaye kuchapisha mwongozo wa ujumuishaji pamoja na vifurushi vya Rust na JavaScript ili kuwezesha pochi nyingine kuunganishwa nayo. Hata hivyo, wakati wa uzinduzi, programu hiyo iliwasiliana pekee na Zecwallet Lite Desktop, huku ujumuishaji mpana zaidi wa pochi ukiwa bado unatengenezwa.

Hatua iliyofuata ilikuwa uundaji wa programu mpya ya Ledger inayotegemea Rust Zcash. Kufikia Juni 2026, Ledger iliripoti kuwa ushirikishaji wa UFVK na utengenezaji wa Unified Address wa Orchard ulikuwa umetekelezwa, huku utiaji sahihi wa miamala wa Orchard na ClearSign ukiwa bado unatengenezwa. Ledger pia ilisema kuwa kazi hiyo ingeendelea kwenye mkondo wa Ironwood kadiri itifaki ilivyobadilika.

Ironwood baadaye ilihitaji masasisho katika mfumo ikolojia wa pochi wa Zcash. Zkool ilitoa usaidizi wa uhamishaji kutoka Orchard hadi Ironwood kuanzia toleo la 6.24.0, na kuendelea kuboresha uhamishaji na mkondo wa miamala katika matoleo yaliyofuata. Ledger, kwa upande mwingine, iliunganisha utiaji sahihi wa PCZT v2 katika programu yake mpya mnamo Julai 27, ingawa utekelezaji huo ulikuwa bado haujakamilisha ukaguzi wa Ledger na uzinduzi wa Ledger Live kufikia Agosti 20; hatua hiyo muhimu tangu wakati huo imetolewa, huku Ledger Wallet Desktop 4.21+ sasa ikitoa usaidizi wa asili wa Ironwood moja kwa moja.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Kwa hiyo, mageuzi haya yanaeleweka vyema si kama uboreshaji mmoja kutoka Zondax hadi Ironwood, bali kama maendeleo kadhaa yanayohusiana: utekelezaji wa awali wa Sapling ulioelekezwa kwenye Zondax, App ya 2024 ya Zcash Shielded Ledger, programu mpya ya Ledger Rust yenye usaidizi wa Orchard na PCZT, ujumuishaji wa asili wa Ledger wenyewe katika Ledger Wallet Desktop, na masasisho sambamba kwa pochi kama Zkool kadiri mfumo ikolojia ulivyohamia kwenye Ironwood.

### Usaidizi wa sasa wa kifaa na jukwaa wa Ledger kwa Zcash

Usaidizi wa Zcash kwenye Ledger hutegemea

- Muundo wa kifaa
- Programu iliyosakinishwa
- Jukwaa linalotumiwa kuisimamia, na
- Iwapo muamala ni wa uwazi au wa faragha.

Kufikia 21 Julai 2026 (sasisho la mwisho la Ledger), programu ya Zcash Shielded inasaidiwa kwenye Nano S Plus, Stax, na Flex, lakini bado si kwenye Nano X au Nano Gen5.

Nano X na miundo mingine isipokuwa Nano S ya awali bado inaweza kutumia programu ya kawaida ya Zcash, ambayo inasaidia miamala ya uwazi na matumizi ya fedha za faragha kwenda anwani za uwazi (kuondoa faragha), lakini si utiaji sahihi kutoka faragha hadi faragha. Nano S ya awali haiungi mkono programu yoyote kati ya hizi, kwa sababu Ledger inaondoa hatua kwa hatua usaidizi wa kifaa hicho na programu yake ya hivi karibuni ya Zcash haipatikani kwenye kifaa hicho. Vifaa huunganishwa na Ledger Wallet (zamani Ledger Live), programu saidizi ya Ledger, inayopatikana kwenye kompyuta mezani kwa Windows, macOS na Linux, na kwenye vifaa vya mkononi kwa iOS na Android.

Ledger imeongeza Zcash ya asili ya faragha kwenye Ledger Wallet Desktop, iliyojengwa kwenye bwawa la Ironwood, jambo linaloondoa haja ya pochi saidizi tofauti. ZEC ya faragha bado haijaungwa mkono kwenye programu ya mkononi ya Ledger kwa iOS na Android, ingawa usaidizi wa mkononi umepangwa kwa toleo la baadaye.

Nje ya programu ya Ledger yenyewe, matumizi ya faragha hutegemea pochi saidizi inayooana na majukwaa inayoyaunga mkono. Kadiri Ledger inavyoendelea kupanua usaidizi wa Ironwood, uoanifu hutegemea muundo wa kifaa, firmware, toleo la programu, na mfumo wa uendeshaji, hivyo usaidizi wa jumla wa Zcash hauhakikishi lazima uoanifu.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### Utiaji sahihi baridi wa YWallet; mbinu ya awali

Ywallet ni pochi saidizi, tofauti na Ledger na Zondax, ambayo ilifuata mkondo wake yenyewe kuelekea utiaji sahihi baridi wa faragha.

Ywallet ni muhimu kihistoria kwa sababu ilichunguza utiaji sahihi baridi kwa Zcash, ikimaanisha kuwa kifaa cha kutia sahihi kingeweza kuwekwa tofauti na pochi ya mtandaoni.

Ili kutekeleza usanifu huo kwenye vifaa vya Ledger, Ywallet iliunda programu yake yenyewe ya Ledger, programu ya umiliki, tofauti na programu ya Zondax iliyofunikwa katika sehemu iliyotangulia. Hii ilimaanisha kuwa Ywallet haikutegemea utekelezaji uliopo wa Zondax wa Sapling; ilikuwa na firmware yake yenyewe inayotekeleza upande wa kutia sahihi wa uhusiano huo.

### Kwa nini ujumuishaji ulikuwa muhimu

Kuwa na kriptografia na msimbo wa kutia sahihi haitoshi. Ujumuishaji wa hardware wallet si tatizo la kriptografia pekee; pia ni tatizo lisiloepukika la usambazaji na jukwaa. Kwa kiwango cha chini, unahusisha:

- Uidhinishaji/usambazaji wa programu — iwapo duka rasmi la programu la mtengenezaji wa vifaa litakubali na kusambaza programu hiyo
- Usalama wa firmware/programu — iwapo programu inatimiza mahitaji ya usalama ya mtengenezaji kwa kushughulikia nyenzo za funguo
- Itifaki za mawasiliano — jinsi pochi saidizi na kifaa zinavyobadilishana data za miamala kwa hakika
- Uoanifu na pochi — iwapo miundo ya data na mtiririko wa programu ya kutia sahihi vinalingana na yale ambayo pochi saidizi inatarajia
- Mabwawa ya faragha yanayoungwa mkono — ni yapi kati ya Sapling, Orchard, (na sasa Ironwood) ambayo programu inaweza kutia sahihi kwa hakika

Programu ya umiliki ya Ywallet ya Ledger ilitimiza mahitaji ya kriptografia na usanifu; ingeweza kutia sahihi miamala ya faragha ya Zcash, lakini haikukubaliwa katika duka rasmi la programu la Ledger.

### Mpito kutoka programu ya umiliki ya Ledger

Kwa sababu programu hiyo haikukubaliwa rasmi, Ywallet ingelazimika kuwaomba watumiaji wasakinishe firmware isiyotiwa sahihi ili kuitumia; hili ni punguzo halisi la usalama kwa watumiaji, na Ywallet ilichagua kutowaomba hilo. Kwa hiyo, Ywallet hatimaye iliacha ujumuishaji huo mahususi badala ya kufuata mkondo huo.

Badala ya kufufua programu ya umiliki, maendeleo ya baadaye (kupitia Zkool, mrithi wa Ywallet) yalielekea kwenye programu ya Zondax iliyoundwa rasmi na Ledger, yakibadilisha utekelezaji maalumu uliokataliwa kwa ule uliosanifishwa ambao tayari ulikubaliwa katika mfumo ikolojia wa usambazaji wa Ledger. Mabadiliko hayo ndiyo hatimaye yalifanya ujumuishaji unaofanya kazi wa Ledger uwezekane tena.

### Urithi wa Ywallet

Hata baada ya Ywallet yenyewe kujiondoa kwenye maendeleo ya kazi, mtayarishi wake, Hanh ambaye pia ni mwanachama wa ZCG, aliendelea kuwa sauti muhimu katika mfumo ikolojia, hasa wakati uhamishaji wa Ironwood ulipoibua matatizo yaliyoripotiwa kuhusu fedha zilizoonekana kutoweka.

**ZODL: mtumiaji halisi alipitia fedha zilizokosekana baada ya uhamishaji wa Orchard → Ironwood**

Mtumiaji, Jmo0615, aliripoti kuwa fedha ambazo hapo awali zilionekana katika pochi yake ya ZODL hazikuonekana tena baada ya uhamishaji kutoka Orchard hadi Ironwood. Alisema kwamba alikuwa amerejesha seed ya awali, akaweka upya na kurejesha pochi, na kuruhusu ZODL toleo 3.14.1 (1) kusawazisha kikamilifu. Pia alithibitisha kwamba hakuna hardware wallet ya Keystone iliyohusika.

Haijathibitishwa kwamba fedha hizo zilipotea kweli. Badala yake, inashukiwa kuwa ni tatizo linalohusiana na ugunduzi wa pochi au uhamishaji, ambapo fedha zilizoonekana hapo awali hazikuonyeshwa tena baada ya mpito kwenda Ironwood. Fedha ambazo hazigunduliwi au kuonyeshwa hazipaswi kuelezewa moja kwa moja kuwa zimepotea kabisa, na tofauti hii ni muhimu wakati wa kuelewa matatizo ya uhamishaji.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: “madokezo yaliyofungwa” yanaweza kueleza fedha zinazoonekana kutopatikana**

Kipengele kingine muhimu cha pochi za faragha ni jinsi hali ya pochi inavyoweza kuathiri fedha ambazo mtumiaji anaweza kutumia kwa hakika. Hanh alieleza kwamba mtumiaji anaweza kufunga dokezo kimakosa kupitia udhibiti wa sarafu, kipengele kinachowawezesha watumiaji kuchagua wenyewe madokezo yanayotumika kwa matumizi. Katika hali hii, dokezo linaweza bado kuwepo kwenye pochi lakini likawekwa alama kuwa halipatikani kwa matumizi.

Hili linaangazia tofauti muhimu wakati wa kuchunguza matatizo ya pochi. Kiasi cha ZEC kilichopo kwenye pochi si sawa kila wakati na kiasi kinachopatikana kwa sasa kutumika. Vipengele kama uteuzi wa dokezo, usawazishaji, hali ya uhamishaji, urejeshaji wa pochi, na mipangilio ya udhibiti wa sarafu vinaweza kuathiri salio linaloonyeshwa au linaloweza kutumika. Kwa hiyo, ripoti za “fedha zilizokosekana” zinapaswa kutofautishwa kwa makini kati ya fedha ambazo hazigunduliwi au kuonyeshwa, fedha zinazogunduliwa lakini hazipatikani kwa matumizi, na fedha ambazo kwa kweli zimepotea.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**Keystone ni nini?**

Keystone ni hardware wallet iliyotenganishwa na mtandao. Kifaa chake cha kutia sahihi hakina muunganisho wa moja kwa moja wa waya au pasiwaya na programu saidizi wakati wa mchakato wa kutia sahihi wenyewe, bali huwasiliana kupitia misimbo ya QR. Hapa imeunganishwa na Zashi (sasa imepewa chapa mpya Zodl), pochi saidizi ya asili ya Zcash, na muunganiko huo huifanya kanuni ya kutenganisha funguo iwe wazi kwa namna isiyo ya kawaida na rahisi kufuatilia.

**Mtiririko wa Keystone/Zashi**

Ujumuishaji wa Keystone wa Zcash na Zashi hufanya utenganishaji huu uwe wazi zaidi. Unapounganisha Keystone na Zashi, Unified Full Viewing Key huhamishwa kutoka Keystone hadi Zashi.

Kwa hiyo, mtiririko ni:

![Keystone and Zashi viewing flow](/content-images/keystone-zashi-viewing-flow.webp)

**Zashi inaweza kufanya nini kwa UFVK?**

Zashi inaweza kuitumia ili:

- Kutambua miamala ya faragha inayoingia
- Kuamua salio
- Kupata taarifa kuhusu shughuli za faragha

Lakini haiwezi kutumia fedha kwa sababu tu ina UFVK.

UFVK ni “uwezo wa kutazama” unaoruhusu kujua salio na miamala lakini hauruhusu matumizi.

### Ni nini kinachosalia ndani ya Keystone?

Seed/mamlaka ya kutumia pesa husalia kwenye Keystone. Zashi haipokei seed, ufunguo wa kutumia pesa, au ufunguo binafsi wa uidhinishaji wa matumizi. Inapokea UFVK, taarifa za anwani, na taarifa zinazohitajika kwa utendeshaji wa kutazama pekee.

Kwa pamoja, nusu hizi mbili hukamilisha picha. Kinachoondoka kwenye kifaa, kama UFVK, anwani, na taarifa za kutazama pekee, kinatosha kwa Zashi kufuatilia akaunti, lakini hakuna kinachoondoka kwenye kifaa kinachotosha kuhamisha fedha kutoka humo.

Hii ndiyo sababu ujumuishaji wa Zashi na Keystone unaweza kutoa hifadhi baridi ya faragha. Programu ya pochi inaweza kufuatilia akaunti bila kuwa na mamlaka yanayohitajika kutumia fedha kutoka humo. Ujumuishaji huo ulizinduliwa mahsusi kuwezesha hifadhi baridi ya ZEC ya faragha.

Unapotaka kutumia fedha:

![Keystone and Zashi spending flow](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito hufuata mfano wa kutenganisha funguo unaofanana sana na wa Keystone, lakini utekelezaji wake ni mpya zaidi. Badala ya kuunganishwa na pochi saidizi iliyopo kama Zashi, Hito hutolewa pamoja na pochi yake ya Android, na mchakato wa kuanza kutumia kati ya kifaa cha hardware na programu hiyo ya Android umeandikwa katika hatua muhimu za maendeleo za Hito.

**Kuanza kutumia: kile programu ya Hito inapokea**

Pochi ya Android hutumia:

- Unified Full Viewing Key (UFVK)
- Unified Address
- Alama ya kidole ya seed ya ZIP-32
- Taarifa za mtandao

wakati wa kuanzisha akaunti ya hardware.

Kumbuka kwamba programu ya Android haipokei kamwe seed ya hardware wallet au funguo binafsi za kutumia pesa.

![Hito onboarding](/content-images/hito-onboarding.webp)

**Programu ya Hito hupata nini?**

Taarifa za kuanza kutumia zilizoandikwa zinajumuisha:

- UFVK
- Unified Address
- Alama ya kidole ya seed ya ZIP-32
- Mtandao

UFVK huipa pochi ya Android taarifa inazohitaji kuendesha akaunti kama pochi yenye uwezo wa kutazama bila kupokea seed. Alama ya kidole ya seed ni kitambulishi cha urefu maalumu kinachotokana na seed, kinachotumiwa kutambua akaunti ni ipi; si seed yenyewe na hakitoi uwezo wowote wa kutumia fedha, ndiyo sababu uwepo wake haupingani na dai la “haipokei kamwe seed” lililo hapo juu.

**Ni nini kinachosalia kwenye Hito?**

Seed halisi, funguo binafsi za kutumia pesa, na mamlaka ya kutia sahihi husalia kwenye kifaa cha hardware. Kisha Hito hutia sahihi bila mtandao.

Hatua muhimu ya sasa ya Hito inasema kwamba mtiririko mzima wa kuunda, kusafirisha, kutia sahihi bila mtandao, na kuingiza umekamilika kufanya kazi, ukiwa na usafirishaji wa BLE na usafirishaji wa QR wa BBQr wa PCZT iliyotiwa sahihi.

Mtiririko huo unastahili kutajwa wazi, kwa kuwa ni mfano mahususi wa mzunguko kamili uliojadiliwa awali katika ripoti hii: pochi ya Android huunda PCZT isiyotiwa sahihi, huisafirisha hadi Hito, Hito hutia sahihi bila mtandao kwa nyenzo zake za funguo zilizotengwa, na PCZT iliyotiwa sahihi huingizwa tena kwenye pochi ya Android.

Hakuna wakati seed au ufunguo wa kutumia pesa huvuka mpaka huo katika mwelekeo wowote.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## Orchard hadi Ironwood: Mageuzi ya Usaidizi wa Hardware Wallet

Orchard ni bwawa la faragha [shielded pool] katika itifaki ya Zcash linalowawezesha watumiaji kuhifadhi na kufanya miamala ya ZEC kwa faragha iliyoimarishwa. Ilipoanzishwa katika Uboreshaji wa Mtandao [Network Upgrade] 5 (NU5), Orchard hutumia mfumo wa uthibitishaji [proving system] wa Halo 2 na usanifu wa kriptografia ulioundwa upya ili kusaidia miamala ya faragha bila kufichua taarifa nyeti za muamala kama vile mtumaji, mpokeaji, au kiasi.

Ironwood ni bwawa la faragha lililoanzishwa katika uboreshaji wa mtandao wa Zcash NU6.3 kama mrithi wa bwawa la Orchard. Hutumia itifaki ya kriptografia ya Orchard huku ikileta mabadiliko yaliyoundwa kuboresha usalama wa muda mrefu wa fedha za faragha, ikijumuisha urejeshaji wa quantum na uhakikisho thabiti zaidi kuhusu uadilifu wa ugavi.

Mwanzoni, ni muhimu kufafanua kwamba Ironwood haikubadilisha itifaki ya Orchard kwa mfumo mpya kabisa wa kriptografia. Ironwood ilianzishwa kama bwawa jipya la faragha lililojengwa kutoka itifaki iliyopo ya Orchard. Hii inamaanisha zina muundo sawa wa Action, mfumo sawa wa uthibitishaji wa Halo 2, pamoja na miundo sawa ya dokezo na funguo.

Ironwood ina mti wake wa commitment za madokezo, seti ya nullifier, anchor, na bwawa la thamani, hivyo katika kiwango cha makubaliano [consensus] ni bwawa tofauti kikweli. Lakini kwa upande wa kriptografia, ni upanuzi wa Orchard badala ya kujengwa upya.

Iliundwa kwa namna hii ili:

1. **Uadilifu wa ugavi.** Mnamo Mei 29, 2026, mtafiti wa usalama Taylor Hornby alifichua kwa faragha dosari muhimu ya uthabiti katika mfumo wa uthibitisho wa maarifa sifuri [zero-knowledge proof] wa Orchard, ambayo ingeweza kuruhusu ZEC bandia kuundwa bila kuacha alama on-chain. Kwa sababu data ya miamala ya Orchard ni ya faragha, hakuna anayeweza kuthibitisha kwa kujitegemea kwamba hakuna ZEC bandia iliyoundwa kabla ya marekebisho. Kufunga bwawa la zamani na kuanzisha jipya lenye sifuri hutatua tatizo hilo kwa namna ambayo kurekebisha Orchard palepale kusingeweza.
2. **Kuhakikisha urejeshaji wa Quantum.** Ironwood iliundwa ili fedha zake ziweze kushiriki katika utaratibu wa urejeshaji wa baadaye ikiwa dhana za msingi za discrete log zitavunjwa.
3. **Kupunguza mabadiliko ya utekelezaji.** Badala ya kubuni itifaki mpya kabisa ya faragha, usanifu uliothibitishwa wa Orchard ulitumiwa tena. Hii ilimaanisha kuwa msimbo mpya mchache zaidi wa miamala, uthibitishaji, pochi [wallet], na hardware wallet ulihitajika kuandikwa kutoka mwanzo.

### Ratiba ya umma

- Mei 29: Udhaifu wa Orchard unafichuliwa.
- Juni: Miamala ya Orchard inazuiwa kwa muda huku marekebisho ya awali yakitolewa kupitia NU6.2. Mnamo Juni 12, msanidi programu mkuu analenga Julai 21 kwa uboreshaji kamili; baadaye unachelewa kwa wiki moja. Wasiwasi wa jumuiya ulitolewa kwamba wamiliki wa Keystone wangekuwa wa mwisho kuhama, kisha msanidi programu mkuu akajibu kwamba Keystone ingeunga mkono Ironwood tangu siku ya kwanza, huku firmware ikilengwa kutolewa Julai 3, ikisubiri constants za kusaini zilizokamilishwa na mabadiliko ya API ya Orchard kutoka msingi wa Zcash.
- Mapema Julai: NU6.3 inafikia testnet; Zebra 6.0.0 inatolewa Julai 10.
- Julai 27–28: Kazi ya kusaini ya Ledger ya Ironwood PCZT v2 inaunganishwa katika tawi la ujumuishaji. Ironwood (NU6.3) inaanzishwa Julai 28 kwenye block 3,428,143, ikifunga bwawa asilia la Orchard nyuma ya turnstile inayoweka kikomo cha kiasi cha ZEC kinachoweza kutoka Orchard kuwa kiasi kilichowekwa humo kihalali, na kuanzisha muundo mpya wa muamala.

Zebra inakuwa node inayohitajika, kwa kuwa zcashd haiungi mkono kanuni mpya za makubaliano. Anwani hazibadiliki kwa sababu Ironwood hutumia tena muundo wa kipokezi wa Orchard, hivyo pochi huelekeza anwani zilizopo kwenye bwawa jipya kiotomatiki. Hata hivyo, pochi zinahitaji utendakazi wa uhamishaji, kwa kuwa fedha za Orchard lazima hatimaye zihamishwe hadi Ironwood na wamiliki wake, na matokeo mapya yanayopokea Orchard sasa yamezuiwa kabisa na makubaliano.

### Nini kilibadilika kiufundi

Miundo ya miamala ilihama kutoka toleo la 5 hadi toleo la 6, hivyo muamala mmoja unaweza kubeba kipengele cha Ironwood pamoja na vipengele vilivyopo vya Sapling/Orchard/uwazi. PCZT ilipanuliwa kwa hatua:

- Usimbaji ulihama kutoka PCZT v1 hadi v2.
- Bundle tofauti ya Ironwood sasa ipo sambamba na zile za Sapling na Orchard.
- Miamala ya v6 na sighash mpya ya v6 zinaungwa mkono.
- Maandishi wazi ya madokezo yalipata toleo jipya (V3).

Mabadiliko ya sighash ni muhimu zaidi hasa kwa hardware wallet. Katika v6, anchor za Orchard na Ironwood hazijumuishwi katika hash ya sahihi na huchangia tu digest ya data ya uidhinishaji. Haya ni mabadiliko halisi ya firmware, si ongezeko la toleo tu. Kifaa lazima kitekeleze sighash mpya kwa usahihi na kiihesabu upya chenyewe badala ya kuamini kile ambacho programu shirikishi inadai kwamba kinaidhinisha.

Mkataba wa utenganishaji wenyewe haukubadilika: kifaa bado hurejesha tu sahihi ya uidhinishaji wa matumizi, kamwe `alpha`, na kamwe hakitoi sahihi ya binding; host pia bado hushughulikia uthibitishaji na kila kitu kingine.

Hata hivyo, kanuni moja ya mtia sahihi ilibadilika kwa v6: matumizi ya kujaza dummy husainiwa na IO Finalizer badala ya kifaa, kwa kuwa kifaa hakina njia ya kuyathibitisha dhidi ya data halisi ya dokezo. Jukumu la Signer la kifaa huyaruka badala ya kuombwa kusaini kitu ambacho hakiwezi kukikagua. Ada zinazoonyeshwa sasa pia hujumlisha salio zote mbili za thamani za Orchard na Ironwood, kwa kuwa muamala wa v6 unaweza kutumia kutoka mabwawa yote mawili katika muamala mmoja.

Kupata hesabu hiyo ya bwawa kwa usahihi ni muhimu kiutendaji, si kinadharia tu. Hitilafu ya hivi karibuni katika pochi ya Brave ya Zcash ni mfano muhimu: hesabu yake ya ada ilidhani kwamba ingizo zote za faragha zilikuwa za bwawa la urithi la Orchard, na kusababisha actions zilizorudiwa na makadirio yasiyo sahihi ya ada kila muamala ulipohusisha Ironwood. Hilo ndilo hasa aina ya kosa ambalo kanuni ya “jihesabie upya mwenyewe, usiamini host” inayotumika katika kusaini kwa hardware wallet ipo kuligundua. Pochi shirikishi ilikosea hesabu ya bwawa na kifaa pekee kinachokagua hesabu zake chenyewe kingelitambua hilo kabla ya kutia sahihi.

### Hali ya kila mtia sahihi

**Ledger imebadilisha taswira nzima.** Mnamo Septemba 23, 2026, Ledger ilitoa usaidizi asilia wa Zcash ya faragha moja kwa moja ndani ya Ledger Wallet Desktop, bila kuhitaji tena programu shirikishi tofauti. Ufunguo wako wa kutumia pesa [spending key] hubaki kwenye kifaa, kompyuta hufanya hesabu za muamala, na huidhinisha kila kitu kwenye skrini kabla hakijasainiwa. Inaunga mkono Ironwood pekee, si mabwawa ya zamani ya Orchard au Sapling. Hasara ni kwamba programu ya urithi ya “Zcash Shielded” iliyojengwa na Zondax, ambayo ilihitaji pochi shirikishi kama Zkool ili kufanya kazi, inasitishwa. Ledger inaondoa programu hiyo ya zamani katika upatikanaji mnamo Novemba 5, hivyo yeyote anayeitumia bado anahitaji kuhamisha fedha zake kabla ya hapo.

**Keystone iko katika hali nzuri.** Firmware 3.0.2 iliongeza usaidizi kamili wa Ironwood mnamo Julai, na hilo bado ndilo hitaji thabiti la sasa. Hata hivyo, toleo hilo au jipya zaidi linahitajika ili kusaini chochote.

**Hito imepiga hatua zaidi ya hatua ya awali ya testnet.** Ilifanikiwa kusaini na kuwasilisha muamala wake wa kwanza halisi wa Orchard-hadi-Ironwood kwenye hardware halisi (hapo awali kwenye testnet). Sasisho zilizofuata zilithibitisha mitiririko ya mainnet (Ironwood→Ironwood, Ironwood→Uwazi, na mingineyo) kwenye hardware ya uzalishaji. Firmware thabiti na utolewaji mpana zaidi bado vinaendelea.

Zondax na Zkool kwa sasa ziko katika hali ya mabadiliko. Programu ya Zondax ndiyo inayostaafishwa kwenye Ledger. Zkool, ambayo ilitegemea programu hiyo kuwasiliana na vifaa vya Ledger, haijaonyesha kitakachotokea kwa jukumu hilo mara programu ya zamani itakapotoweka. Haijulikani ikiwa itabaki muhimu kwa watumiaji wa Ledger siku zijazo, au kama mustakabali wake uko hasa katika vifaa vingine.

Uhamishaji wenyewe ndio athari kubwa zaidi. Kwa sababu kiasi kinachovuka mabwawa kinaonekana hadharani, pochi hueneza uhamisho katika madhehebu ya kawaida kwa muda badala ya kuhamisha salio katika sehemu moja inayoonekana, jambo linalomaanisha miamala mingi ya kusaini kwa kila uhamishaji, na ndiyo sababu kusaini kwa kundi [batch signing] kwa PCZT kulikuwa muhimu sana kwa hardware wallet.

Kazi ya firmware ya Ledger pia ilikumbana na mipaka ya hardware: matumizi halisi ya dokezo yangeweza kufikia makumi ya maelfu ya syscalls za kriptografia katika amri moja, na kuamsha watchdog ya kifaa. Marekebisho yalihamisha arithmetic ya field hadi kwenye programu na kuhitaji hali ya pamoja ya scratch ili kutoshea ndani ya vikwazo vya stack ya Nano X.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### Mageuzi katika picha moja

![The evolution in one picture](/content-images/orchard-to-ironwood-evolution.webp)
