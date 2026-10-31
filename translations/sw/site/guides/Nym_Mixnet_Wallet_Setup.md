<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Haririhttps://github.com/ZecHub/zechub/pull/2238t Ukurasa"/>
</a>

# Elekeza Trafiki ya Pochi ya Zcash Kupitia Mixnet ya Nym

> Ilithibitishwa mwisho: Septemba 29, 2026

Miamala ya faragha ya Zcash hulinda data ya muamala on-chain, lakini pochi bado huwasiliana kupitia mtandao. Waangalizi wa mtandao wanaweza kujifunza metadata kama vile anwani yako ya IP, wakati pochi yako inaunganishwa, na miundombinu inayowasiliana nayo.

Nym huongeza safu tofauti ya faragha ya mtandao. Kufikia Septemba 2026, mbinu bora hutegemea pochi:

1. **Pendelea ujumuishaji asilia wa Nym wa pochi unapopatikana.**
2. Vinginevyo, tumia **hali ya Mixnet ya NymVPN katika kiwango cha mfumo** ili trafiki ya mtandao ya pochi ielekezwe kupitia Nym bila kutegemea usaidizi wa proksi mahususi wa pochi.

Kwa maelezo ya jumla kuhusu VPN na dVPN, tazama [VPN & dVPN](./VPN_and_DVPN.md).

## Kile ambacho Nym huongeza — na kile ambacho haiongezi

Malipo ya faragha ya Zcash na kifaa cha faragha ya mtandao hutatua matatizo tofauti:

- **Mabwawa ya faragha ya Zcash** hulinda maelezo ya muamala on-chain.
- **Uelekezaji wa mixnet wa Nym** umeundwa kupunguza uwezekano wa kuhusisha utambulisho wako halisi wa mtandao na huduma inayopokea trafiki ya pochi.
- Lengwa linalofikiwa kupitia handaki la NymVPN katika kiwango cha mfumo linapaswa kuona njia ya kutoka ya Nym badala ya IP yako ya nyumbani/simu.

Mixnet ya Nym hutumia hatua nyingi, uchanganyaji wa pakiti, ucheleweshaji wa nasibu, trafiki funiko, na usimbaji fiche wa onion ili kupunguza uvujaji wa metadata ya mtandao.

Nym hailindi dhidi ya kifaa kilichodukuliwa, programu hasidi ya pochi, vishazi vya urejeshaji vilivyofichuliwa, utambulisho unaoufichua kupitia akaunti za soko la kubadilishana sarafu, au upotevu wa faragha unaosababishwa na shughuli za Zcash za uwazi.

## Usaidizi asilia wa Nym: tumia huu kwanza unapopatikana

Nym ilitangaza Septemba 24, 2026 kwamba kazi yake ya Ruzuku ya Jumuiya ya Zcash imekamilika na usaidizi asilia wa mixnet unatumwa katika pochi halisi za Zcash.

### Pochi ya Zingo!

Zingo PC inajumuisha usafirishaji asilia wa Nym. Zingo Mobile pia hutoa Hali ya Mixnet kwenye iOS na Android kwa kutumia proksi ya Nym ndani ya programu.

Tabia ya sasa iliyoandikwa na Zingo:

- Kidhibiti cha Nym kinapatikana chini ya **Mipangilio → Mixnet ya Nym**.
- Kutuma malipo huelekezwa kupitia mixnet.
- Usambazaji wa uhamishaji wa Ironwood hufuata njia hiyo hiyo ya utumaji iliyolindwa.
- Maombi ya bei ya ZEC pia huelekezwa kupitia mixnet.
- Kutuma hushindwa kwa kufungwa huku Nym imewashwa: ikiwa usafirishaji wa mixnet haupatikani, malipo hayatumiwi kimyakimya kupitia clearnet.
- **Usawazishaji wa mnyororo kwa sasa hauelekezwi kupitia mixnet** katika Zingo PC. Block fupi, hoja za nullifier, upakuaji wa miamala, trafiki ya mempool, na ukaguzi wa afya ya seva bado hutumia muunganisho wa kawaida wa seva.

Tofauti hiyo ni muhimu: ujumuishaji asilia wa Zingo hulinda njia ya utangazaji yenye uwezekano mkubwa zaidi wa kuhusishwa, lakini bado si handaki kamili la mtandao wa kifaa.

Ikiwa muundo wako wa vitisho pia unahitaji kuficha trafiki ya usawazishaji kutoka kwa seva, tumia handaki la faragha katika kiwango cha mfumo kama NymVPN pamoja na kuelewa ucheleweshaji na utata wa ziada unaoletwa na hili.

Vyanzo:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym inaripoti kuwa **Zkool** sasa inasaidia kuunganisha kwenye miundombinu ya RPC ya Zcash kupitia mixnet ya Nym kwa kutumia kigeuzi asilia.

Zkool ndiye mrithi anayetunzwa kikamilifu wa YWallet. Mradi wake pia unasaidia proksi ya Tor na huduma za onion kwa miunganisho ya seva ya Zcash.

Pendelea chaguo asilia la Zkool la Nym kuliko kujaribu kulazimisha toleo la zamani la YWallet kupitia njia ya proksi isiyoandikwa.

Vyanzo:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet pia ina njia za usafirishaji zinazotambua Nym. Utekelezaji wake wa sasa unasaidia kuelekeza uwasilishaji wa miamala inayotoka kupitia mixnet ya Nym na njia tofauti ya dVPN ya Nym kwa usawazishaji wa block fupi. Zichukulie hizi kama kinga tofauti badala ya kudhani kuwa kila ombi la pochi hutumia mixnet kiotomatiki.

Vyanzo:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl kwa sasa ina **Ulinzi wa Tor** uliojengwa ndani, ambao si sawa na ujumuishaji asilia wa Nym ulioelezwa hapo juu kwa Zingo, Zkool, na Nozy.

Kipengele cha Zodl cha Tor kinaweza kuelekeza uwasilishaji wa miamala, urejeshaji wa data ya miamala, maombi ya viwango vya ubadilishaji, na maombi ya API za wahusika wengine kupitia Tor. Nym ilisema Septemba 24, 2026 kwamba bado iko katika mazungumzo ya dhati na timu ya Zodl kuhusu ujumuishaji mpana wa mixnet.

Kwa Zodl leo, tumia ama:

- Ulinzi wa Zodl wa Tor ulioandikwa, au
- NymVPN katika kiwango cha mfumo ikiwa lengo lako ni kuelekeza trafiki ya jumla ya kifaa cha pochi kupitia Nym.

Usidhanie kuwa Tor na Nym ni njia za usafirishaji zinazoweza kubadilishana ndani ya pochi kwa sababu tu zote ni mitandao ya faragha.

Mipangilio ya Zodl ya Tor:

**Zaidi → Vipengele vya Kina → Beta: Ulinzi wa Tor → Washa → Hifadhi mabadiliko**

Vyanzo:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Njia mbadala: NymVPN katika kiwango cha mfumo

Hili ndilo chaguo la Nym linalooana kwa upana zaidi kwa sababu halihitaji pochi kuelewa mipangilio ya proksi mahususi ya Nym.

### 1. Sakinisha NymVPN

Pakua NymVPN tu kutoka kwenye tovuti rasmi ya Nym au duka rasmi la mfumo:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN inasaidia Android, iOS, Linux, Windows, na macOS.

### 2. Chagua hali ya Mixnet

NymVPN hutoa **Hali ya haraka**, njia ya dVPN yenye hatua 2 iliyoboreshwa kwa ucheleweshaji mdogo, na **Hali ya Mixnet**, njia ya mixnet yenye hatua 5 iliyoboreshwa kwa ulinzi thabiti zaidi wa metadata ya mtandao. Kwa shughuli nyeti za pochi, chagua Hali ya Mixnet na usubiri hadi programu iripoti kuwa muunganisho umeanzishwa kabla ya kufungua au kusasisha pochi.

### 3. Acha pochi kwenye mipangilio ya kawaida ya mtandao

Wakati mfumo wa uendeshaji tayari unaelekeza trafiki kupitia NymVPN, pochi nyingi hazihitaji mipangilio maalum ya proksi.

Fungua pochi kama kawaida na uiruhusu isawazishe.

Ikiwa NymVPN hutoa mgawanyo wa handaki kwenye mfumo wako, thibitisha kuwa pochi **imejumuishwa katika handaki lililolindwa**, na haijawekwa kwenye orodha ya kupitwa au kutengwa.

### 4. Thibitisha handaki kabla ya kutumia pochi

Ukaguzi rahisi katika kiwango cha mfumo:

1. Tenganisha NymVPN.
2. Tembelea huduma ya umma ya kukagua IP, au kwenye kompyuta ya mezani endesha:

   ```bash
   curl https://api.ipify.org
   ```

3. Rekodi IP inayoonekana.
4. Unganisha NymVPN katika Hali ya Mixnet.
5. Rudia ukaguzi.

IP ya umma inayoonekana inapaswa kubadilika.

Hili linathibitisha handaki la mfumo. **Halithibitishi** kuwa kila ombi linalofanywa na pochi fulani hufuata njia hiyo hiyo ikiwa programu au mfumo wa uendeshaji una kanuni maalum za uelekezaji.

Kwa uhakika zaidi kwenye kompyuta ya mezani:

- kagua mchakato wa pochi kwa kutumia kifuatiliaji cha mtandao cha mfumo wa uendeshaji,
- thibitisha kuwa hakuna kutengwa kwa mgawanyo wa handaki,
- thibitisha kuwa tabia inayotarajiwa ya pochi hubadilika ikiwa NymVPN imetenganishwa.

Usichapishe picha za skrini zenye anwani za pochi, salio, vitambulisho vya miamala, anwani za IP, au nyenzo za urejeshaji wakati wa kutatua hitilafu.

## Hali ya proksi ya dApp / pochi ya NymVPN

NymVPN pia hutoa hali ya proksi ya programu na pochi kwa kutumia uelekezaji wa SOCKS5 / RPC kupitia mixnet.

Nyaraka za umma za usanidi za Nym zinaonyesha hili hasa kwa usanidi wa RPC wa mtindo wa Ethereum. Ni muhimu kwa programu inayounga mkono kwa wazi njia ya jumla inayooana ya proksi/RPC, lakini **haipaswi** kudhaniwa kuwa inafanya kazi kwa kila pochi ya Zcash.

Tumia njia hii tu wakati nyaraka za pochi zenyewe zinathibitisha usaidizi wa proksi au RPC unaooana.

Vinginevyo, pendelea:

- ujumuishaji asilia wa Nym wa pochi, au
- NymVPN katika kiwango cha mfumo.

## Mabadilishano ya utendaji na muda wa kuisha

Mixnet kwa makusudi hubadilisha kasi kwa ulinzi thabiti zaidi wa metadata.

Tarajia athari zinazowezekana kwa:

- usawazishaji wa awali wa pochi,
- usawazishaji mkubwa wa kufidia,
- hoja za historia ya miamala,
- muda wa kuisha wa RPC,
- maombi ya API za wahusika wengine.

Mwongozo wa vitendo:

- Anza kwa mipangilio chaguomsingi ya Nym.
- Tarajia usawazishaji wa kwanza au usawazishaji mrefu wa kufidia kuchukua muda zaidi.
- Jaribu tena baada ya muda wa kuisha kabla ya kudhoofisha mipangilio ya faragha.
- Epuka kubadilisha hali za faragha mara kwa mara kabla tu ya muamala nyeti.
- Ikiwa unatumia njia ya haraka zaidi kwa usawazishaji mkubwa, elewa kwamba miundombinu inayowasiliana inaweza kuona utambulisho wako halisi wa mtandao katika kipindi hicho.
- Kwa Zingo PC hasa, kumbuka kuwa usafirishaji wake asilia wa Nym kwa sasa hulinda utumaji na utafutaji wa bei, huku usawazishaji ukiendelea kuwa wa moja kwa moja.

## Masuala ya vifaa vya mkononi

Kwenye Android na iOS, nafasi ya VPN ya mfumo wa uendeshaji kwa kawaida ndiyo njia rahisi zaidi ya kuelekeza trafiki ya jumla ya pochi kupitia NymVPN: unganisha NymVPN kwanza, kisha fungua pochi.

Ikiwa VPN nyingine, ngome, au kizuizi cha matangazo kinachotumia VPN ya ndani tayari kinatumia kiolesura cha VPN cha mfumo, bidhaa hizo mbili huenda zisiweze kufanya kazi kwa wakati mmoja. Thibitisha hali ya VPN ya mfumo wa uendeshaji kabla ya kudhani kuwa pochi imelindwa.

## Orodha ya ukaguzi wa muundo wa vitisho

Kabla ya kutegemea usanidi huu, jiulize:

- Je, ninatumia anwani za faragha za Zcash inapofaa?
- Je, pochi yangu ina usaidizi asilia wa Nym?
- Ikiwa ndiyo, ujumuishaji huo asilia hulinda trafiki gani hasa?
- Ikiwa ninahitaji ulinzi mpana zaidi, je, NymVPN imeunganishwa kabla ya pochi kuanza shughuli za mtandao?
- Je, pochi imetengwa na kanuni ya mgawanyo wa handaki?
- Je, ninategemea hali ya proksi ambayo pochi inaandika kwa hakika?
- Je, ninavuja utambulisho kupitia soko la kubadilishana sarafu, kipindi cha kivinjari, API ya mhusika mwingine, au anwani ya uwazi?
- Je, niko tayari kwa usawazishaji wa polepole na muda wa kuisha wa mara kwa mara?

## Vyanzo

- Nym: Mixnet ya Nym sasa inapatikana katika pochi za Zcash, Septemba 24, 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Tabia ya Zingo PC Nym: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Usafirishaji wa Zingo Mobile wa Nym: https://github.com/zingolabs/zingo-mobile
- Hifadhi ya Zkool: https://github.com/hhanh00/zkool2
- Kazi ya usafirishaji ya NozyWallet Nym: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Ulinzi wa Zodl Tor: https://support.zodl.com/article/17-enabling-tor-protection
