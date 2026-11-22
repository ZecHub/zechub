<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Network_Sustainability_Mechanism.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Utaratibu wa Uendelevu wa Mtandao (NSM)

> NSM imekuwa sehemu ya makubaliano ya Zcash tangu [NU7](./NU7.md) ilipoamilishwa kwenye Mainnet katika block ya 3,543,405, tarehe 6 Novemba 2026. Ada zinawekwa kando sasa; kurejeshwa kwa wachimbaji kutaanza kwenye block ya 8,939,664 (inatarajiwa karibu Februari 2031).

Utajifunza: kile kinachofanywa na Utaratibu wa Uendelevu wa Mtandao, kiasi cha ada za kila block kinachoondolewa, mahali ambapo ZEC hiyo huenda, lini na kwa kasi gani hurudi kama zawadi za block, na kwa nini kikomo cha milioni 21 na ratiba ya kupunguzwa kwa nusu havijabadilika.

Utaratibu wa Uendelevu wa Mtandao (NSM) ni seti ya kanuni za makubaliano zinazoondoa baadhi ya ZEC kwenye mzunguko na kuwalipa wachimbaji baadaye, kwa awamu katika kipindi cha miaka mingi. NU7 ilizindua sehemu mbili zake: [ZIP 235](https://zips.z.cash/zip-0235), inayoondoa 60% ya ada za miamala za kila block kwenye mzunguko, na [ZIP 237](https://zips.z.cash/zip-0237), inayorejesha ZEC iliyoondolewa juu ya ruzuku ya kawaida ya block kwa kutumia mkunjo laini. Zote ziliamilishwa na [ZIP 259](https://zips.z.cash/zip-0259).

Kwa nini hili ni muhimu. Zcash hulipia usalama wake kwa ZEC mpya katika kila block, na ruzuku hiyo hupunguzwa kwa nusu takribani kila baada ya miaka minne. Ruzuku hiyo inapokuwa ndogo, wachimbaji hulazimika kutegemea ada zaidi. NSM ni hatua ya kwanza kuelekea wakati huo ujao: inaweka akiba ya sehemu ya ada za leo na kuwalipa wachimbaji wa baadaye, bila kuongeza kikomo cha usambazaji na bila kubadilisha ratiba ya kupunguzwa kwa nusu ambayo watu tayari wanaitegemea.

## Kwa ufupi

- **Uondoaji ([ZIP 235](https://zips.z.cash/zip-0235)):** katika kila block, 60% ya jumla ya ada za miamala (ikizungushwa kwenda chini, kwa manufaa ya mchimbaji) huondolewa kwenye mzunguko. Mchimbaji hubakiza 40% iliyosalia.
- **Salio la Thamani la NSM:** jumla ya ZEC iliyoondolewa kwenye mzunguko na ambayo bado haijarejeshwa, ikihesabiwa mfululizo na kuwekwa wazi kwa umma. Ni hali ya makubaliano, si bwawa ambalo mtu yeyote anaweza kutumia fedha zake.
- **Chanzo cha salio:** kwenye NU7, salio lilianza kwa **368.58445520 ZEC**, zawadi za block na ada ambazo wachimbaji wa mwanzo hawakudai kabla ya NU6.
- **Kurejesha ([ZIP 237](https://zips.z.cash/zip-0237)):** kuanzia block ya **8,939,664**, kila block huongeza sehemu isiyobadilika (0.00001375%) ya salio kwenye ruzuku ya block. Hivyo, takribani nusu ya salio hulipwa katika kila kipindi cha miaka minne cha kupunguzwa kwa nusu.
- **Mambo yanayobaki vilevile:** ratiba ya kupunguzwa kwa nusu na kikomo cha juu cha ZEC milioni 21. Ikiwa salio litafika sifuri, utoaji hufuata ratiba ya zamani kikamilifu.

## Mfano wa kuona

Fikiria mtungi wa akiba ulio karibu na kaunta ya malipo. Kila block inapochimbwa, 60% ya bakshishi (ada) huwekwa kwenye mtungi badala ya kwenda mfukoni mwa mchimbaji. Hakuna anayeweza kutoa fedha kwenye mtungi kwa mkono. Kuanzia 2031, sehemu ndogo isiyobadilika ya chochote kilicho ndani ya mtungi huongezwa kwenye zawadi ya kila block, hivyo mtungi humwagika polepole: takribani nusu yake kila baada ya miaka minne, kwa mdundo uleule wa kupunguzwa kwa nusu.

## Jinsi uondoaji unavyofanya kazi (ZIP 235)

- Kanuni hii hutumika kwa kila block, si kwa kila muamala. Kwa block yenye jumla ya ada `F` (katika zatoshi), kiasi kinachoondolewa ni `floor(6 × F / 10)` na mchimbaji anaweza kudai `F` ukiondoa kiasi hicho.
- Kukusanya na kuzungusha hufanywa mara moja kwa block nzima na daima kwa manufaa ya mchimbaji. Kuzungusha kwa kila muamala kungeondoa chini ya 60% kwa jumla (ada mbili za zatoshi 1 zingechangia 0 kila moja).
- Mfano: block ambayo miamala yake inalipa zatoshi 50,000 (0.0005 ZEC) kama ada huondoa zatoshi 30,000 na kumlipa mchimbaji 20,000. Block yenye ada za zatoshi 15 huondoa 9 na kumlipa mchimbaji 6.
- Hakuna sehemu ya muamala inayohitajika. Kila node hukokotoa kiasi hicho kutokana na ada ambazo tayari inathibitisha, na [ZIP 236](https://zips.z.cash/zip-0236) huhakikisha muamala wa coinbase unadai kiasi halisi anachostahili mchimbaji, ili mchimbaji asiweze kuondoa chini ya kiasi hicho wala kudai zaidi.
- Kiwango: ZIP 235 ilikadiria kuwa, kutokana na miamala ya kabla ya NU7, ada ni takribani ZEC 370 kwa mwaka, hivyo karibu ZEC 222 huondolewa kila mwaka. Ada ni ndogo zikilinganishwa na ruzuku ya block kwa sasa, ndiyo maana waandishi walitarajia athari ndogo kwa wachimbaji.

## Jinsi kurejesha kunavyofanya kazi (ZIP 237)

- **Salio.** `NSMValueBalance` huanza na ZEC 368.58445520 (zatoshi 36,858,445,520) wakati wa uamilishaji wa NU7. Kila block huongeza kile kilichoondolewa na ZIP 235 na kutoa kiasi kilichorejeshwa. Block ambayo ingefanya salio kuwa hasi si halali.
- **Chanzo cha salio la mwanzo.** Kabla ya NU6, muamala wa coinbase ungeweza kudai chini ya zawadi kamili ya block na ada zake. Katika block 2,726,400 za kwanza za mnyororo, wachimbaji waliacha ZEC 368.58445520 bila kuidai: ruzuku iliyopangwa kufikia urefu huo ilikuwa ZEC 15,750,000, na usambazaji uliotolewa ulikuwa ZEC 15,749,631.41554480. ZIP 237 huweka thamani hiyo kwenye NSM ili ilipwe badala ya kupotea.
- **Hakuna kurejesha hadi block ya 8,939,664.** Kati ya NU7 na urefu huo, salio huongezeka tu.
- **Fomula.** Kuanzia block ya 8,939,664, ruzuku ya kila block hupata nyongeza ya `ceiling(0.0000001375 × NSMValueBalance)`, inayokokotolewa kutokana na salio baada ya block iliyotangulia. Sehemu hiyo ni `floor(LN2_SCALED / HalvingInterval) / 10^10` = 1375 / 10,000,000,000, huku muda wa kupunguzwa kwa nusu baada ya NU7 ukiwa block 5,040,000.
- **Kwa nini sehemu hiyo ilichaguliwa.** `(1 − 0.0000001375)^5,040,000 ≈ 0.5`, hivyo ikiwa hakuna kitu kipya kinachoondolewa, takribani nusu ya salio hurejeshwa katika kila kipindi cha kupunguzwa kwa nusu. Huu ni upungufu wa kiongezeko unaotumika kwa salio la NSM pekee, juu ya hatua za kupunguzwa kwa nusu ambazo hazijabadilishwa.
- **Mfano wa hesabu.** Ikiwa salio lingekuwa bado ni lile la mwanzo la ZEC 368.58 tu kwenye block ya 8,939,664, block ya kwanza ingerejesha zatoshi 5,069 (takribani ZEC 0.00005), karibu ZEC 0.175 kwa siku kwa kiwango cha block 3,456 kwa siku. Kiasi halisi kitakuwa kikubwa zaidi kwa ada zitakazoondolewa kufikia wakati huo.
- **Kwa nini block ya 8,939,664.** ZIP 237 huichagua kwa kanuni isiyobadilika, bila kutegemea kiasi kilichoondolewa: ni block ya kwanza baada ya kupunguzwa kwa nusu kwa mara ya tatu (block ya 6,132,390, inayotarajiwa karibu Novemba 2028) ambapo sehemu ya NSM ikitumika kwa ZEC zote ambazo bado hazijapangiwa kutolewa ingelipa chini ya ruzuku ya kawaida ya block (ZEC 0.26041666 katika kipindi hicho). Kura za wenye NU7 na jumuiya hazikufikia wingi wa pamoja kuhusu lini kurejesha kunapaswa kuanza, kwa hiyo ZIP 259 hutumia hatua hii ya kuvuka kiwango.

## Mambo ambayo hayakubadilika

- **Ratiba ya kupunguzwa kwa nusu.** ZIP 237 huhifadhi hatua za kupunguzwa kwa nusu za kila baada ya miaka minne. Pendekezo mbadala lililokataliwa, [ZIP 234](https://zips.z.cash/zip-0234), lingezibadilisha kwa mkunjo laini wa utoaji; kura za Agosti na Septemba 2026 za NU7 ziliuliza kama kupunguzwa kwa nusu kuhifadhiwe au utoaji ulainishwe, na NU7 ilizindua muundo unaohifadhi kupunguzwa kwa nusu.
- **Kikomo cha usambazaji.** Jumla ya Usambazaji Uliotolewa na Salio la Thamani la NSM huongezeka kwa kiasi sawa na ruzuku ya block iliyopangwa katika kila block, hivyo utoaji hauwezi kamwe kuzidi kikomo. Kwa hakika, kikomo kilipungua kidogo: kuzungusha kwa ZIP 218 kwa ruzuku baada ya NU7 kulipunguza jumla ya utoaji kwa takribani ZEC 0.50, na NSM hairudishi kiasi hicho kilichopungua.
- **Uondoaji wa hiari.** [ZIP 233](https://zips.z.cash/zip-0233), ambao ungemruhusu mtu yeyote kutuma ZEC kwenye NSM kwa kutumia sehemu maalum ya muamala, haukuzinduliwa katika NU7. Leo ada ndizo chanzo pekee cha uondoaji. ZIP 237 huruhusu ZIP za baadaye kuongeza vyanzo vingine.
- **Faragha.** Salio na ruzuku ya ziada hukokotolewa kutokana na thamani ambazo tayari ziko wazi kwa umma, kwa hiyo NSM haifichui chochote kipya kuhusu miamala.

## Makosa ya kawaida

- **“60% ya ada huchomwa.”** Si kabisa. Tofauti na kuchoma sarafu (kulinganisha kwa kawaida ni EIP-1559 ya Ethereum), ZEC iliyoondolewa hufuatiliwa na kurejeshwa kwa wachimbaji wa baadaye.
- **“NSM huchapisha ZEC za ziada.”** Hapana. Hurejesha tu thamani iliyoondolewa au ambayo haikuwahi kudaiwa; jumla ya utoaji hubaki chini ya kikomo kilichopo.
- **“Kurejesha kumeanza.”** Bado. Hadi block ya 8,939,664, salio hujikusanya tu.
- **“NSM ni mfuko unaodhibitiwa na mtu fulani.”** Hapana. Ni nambari katika hali ya makubaliano, na thamani hutoka humo tu kupitia fomula ya ruzuku ya block.
- **“Kupunguzwa kwa nusu kumeondolewa.”** Hapana. Huo ulikuwa muundo wa ZIP 234, ambao NU7 haukuzindua.

## Istilahi

| Istilahi | Maana kwa lugha rahisi |
|---|---|
| Network Sustainability Mechanism (NSM) | Kanuni za makubaliano zinazoondoa ZEC kwenye mzunguko na kuwarejeshea wachimbaji baadaye |
| NSM Value Balance | Jumla ya ZEC iliyoondolewa kwenye mzunguko (au ambayo haikuwahi kudaiwa) na bado haijarejeshwa, ikihesabiwa mfululizo na kuwekwa wazi kwa umma |
| Removal from circulation | Kutoa ZEC kwenye usambazaji uliotolewa na kuziweka katika Salio la Thamani la NSM; tangu NU7, hiki ni 60% ya ada za kila block |
| Reissuance | Kulipa ZEC kutoka kwenye Salio la Thamani la NSM kama ruzuku ya ziada ya block, kuanzia block ya 8,939,664 |
| Issued Supply | ZEC zote katika mabwawa ya thamani ya mnyororo; haujumuishi Salio la Thamani la NSM |
| Block subsidy | ZEC mpya zinazoundwa katika kila block, zikigawanywa kati ya mchimbaji na mikondo ya mfuko wa maendeleo |
| Halving interval | Idadi ya block kati ya vipindi vya kupunguzwa kwa nusu: 5,040,000 tangu NU7 (takribani miaka minne kwa block za sekunde 25) |

## Maswali yanayoulizwa mara kwa mara

**Kiasi gani kiko kwenye NSM leo?** Salio la mwanzo la ZEC 368.58445520 pamoja na 60% ya ada za kila block tangu block ya 3,543,405. Hii ni hali ya makubaliano inayofuatiliwa na kila full node.

**Nani hupokea ZEC zinaporejeshwa?** Huongezwa kwenye ruzuku ya block, kwa hiyo hugawanywa kwa njia ileile: mikondo ya mfuko wa maendeleo hupokea asilimia yake isiyobadilika ya jumla ya ruzuku (iliyopangwa pamoja na iliyorejeshwa), na mchimbaji hupata iliyobaki.

**Kurejesha kunaanza lini?** Kwenye block ya 8,939,664 ya Mainnet, kunakotarajiwa karibu Februari 2031 ikiwa wastani wa muda wa block utabaki sekunde 25. Kwenye Testnet, urefu huo hufuata kanuni ileile kuanzia urefu wa uamilishaji wa NU7 wa Testnet.

**Je, ada zitaongezeka kwa sababu ya NSM?** Hapana. Inabadilisha mahali ada zinapoenda, si kiasi ambacho muamala hulipa.

**Je, mgawanyo wa 60/40 unaweza kubadilika?** Ni kupitia ZIP ya baadaye na uboreshaji wa mtandao pekee. ZIP 235 inasema kuwa mgawanyo huo unaweza kuangaliwa upya ikiwa ada zitaongezeka, kwa mfano pale ada zitakapozidi ruzuku ya block.

## Jaribu kuelewa kwako

1. Miamala ya block inalipa zatoshi 100,000 kama ada. Mchimbaji hubakiza kiasi gani?
2. Salio la mwanzo la NSM lilitoka wapi?
3. Ikiwa hakuna kitu kipya kinachoondolewa, takribani sehemu gani ya salio la NSM hurejeshwa katika kila kipindi cha kupunguzwa kwa nusu?
4. Kwa nini kurejesha hakusukumi jumla ya utoaji kuzidi ZEC milioni 21?

Majibu: (1) zatoshi 40,000; zatoshi 60,000 huondolewa; (2) zawadi za block na ada ambazo miamala ya coinbase haikudai kabla ya NU6, ZEC 368.58445520; (3) takribani nusu; (4) kurejesha hulipa tu thamani iliyoondolewa au ambayo haikuwahi kudaiwa, kwa hiyo jumla ya usambazaji uliotolewa na salio la NSM huongezeka kwa kiasi sawa na ruzuku iliyopangwa katika kila block.

### Nyenzo

[ZIP 235: Ondoa 60% ya Ada za Miamala kwenye Mzunguko](https://zips.z.cash/zip-0235)

[ZIP 237: Utaratibu wa Uendelevu wa Mtandao: Utoaji Unaohifadhi Kupunguzwa kwa Nusu](https://zips.z.cash/zip-0237)

[ZIP 259: Utekelezaji wa Uboreshaji wa Mtandao wa NU7](https://zips.z.cash/zip-0259)

[ZIP 234: Utaratibu wa Uendelevu wa Mtandao: Kulainisha Utoaji (haujazinduliwa)](https://zips.z.cash/zip-0234)

[ZIP 233: Utaratibu wa Uendelevu wa Mtandao: Kuondoa Fedha kwenye Mzunguko (haujazinduliwa)](https://zips.z.cash/zip-0233)

[ZIP 236: Block zinapaswa kuwa na salio sahihi kabisa](https://zips.z.cash/zip-0236)

## Kurasa zinazohusiana

| Ukurasa | Sababu ya uhusiano |
|---|---|
| [NU7](./NU7.md) | uboreshaji wa mtandao ulioamilisha NSM |
| [Zcash Sera ya Fedha](../start-here/zcash-monetary-policy) | ratiba ya kupunguzwa kwa nusu na kikomo cha usambazaji ambavyo NSM huhifadhi |
| [Mabadiliko Halisi Yanayosababishwa na Block za Sekunde 25](../research/what-25-second-blocks-actually-change) | kwa nini ruzuku na kipindi cha kupunguzwa kwa nusu vilibadilika kwenye NU7 |
| [Mfuko wa Maendeleo](../start-here/development-fund) | jinsi ruzuku ya block inavyogawanywa |
| [Miamala](../using-zcash/transactions) | jinsi ada za miamala zinavyowekwa |

---
