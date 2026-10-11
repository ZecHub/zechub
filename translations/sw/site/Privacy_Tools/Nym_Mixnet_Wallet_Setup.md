<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Trafiki ya Pochi ya Zcash kupitia Nym Mixnet

> Ilithibitishwa mara ya mwisho: Septemba 29, 2026

Miamala iliyolindwa na Zcash hulinda data ya miamala kwenye mnyororo, lakini pochi bado huwasiliana kupitia mtandao. Wachunguzi wa mtandao wanaweza kujifunza metadata kama vile anwani yako ya IP, pochi yako inapounganishwa, na miundombinu gani inapowasiliana nayo.

Nym inaongeza safu tofauti ya faragha na mtandao. Kufikia Septemba 2026, mbinu bora inategemea pochi:

1. **Pendelea muunganisho asilia wa Nym wa pochi wakati upo.**
2. Vinginevyo, tumia hali ya **kiwango cha mfumo NymVPN Mixnet** ili trafiki ya mtandao wa pochi ipitishwe kupitia Nym bila kutegemea usaidizi wa proksi mahususi wa pochi.

Kwa usuli wa jumla wa VPN na dVPN, tazama [VPN na dVPN](./VPN_and_DVPN.md).

## Kile ambacho Nym anaongeza — na kile ambacho haongezeki

Malipo ya Zcash yaliyolindwa na kifaa cha faragha cha mtandao hutatua matatizo tofauti:

- **Zcash yaliyolindwa** hulinda maelezo ya muamala kwenye mnyororo.
- **Uelekezaji wa mtandao wa Nym** umeundwa ili kupunguza uwezekano wa kuunganishwa kati ya utambulisho wako halisi wa mtandao na trafiki ya pochi inayopokea huduma.
- Sehemu inayofikiwa kupitia handaki ya NymVPN ya kiwango cha mfumo inapaswa kuona njia ya kutoka ya Nym badala ya anwani yako ya IP ya nyumbani/simu ya mkononi.

Mixnet ya Nym hutumia hops nyingi, kuchanganya pakiti, ucheleweshaji bila mpangilio, trafiki ya kufunika, na usimbaji fiche wa kitunguu ili kupunguza uvujaji wa metadata ya mtandao.

Nym hailindi dhidi ya kifaa kilichoathiriwa, programu hasidi ya pochi, misemo ya urejeshaji iliyofichuliwa, utambulisho unaofichua kupitia akaunti za kubadilishana, au upotevu wa faragha unaosababishwa na shughuli za uwazi Zcash.

## Usaidizi wa Native Nym: tumia hii kwanza inapopatikana

Nym alitangaza mnamo Septemba 24, 2026 kwamba kazi yake ya Ruzuku ya Jumuiya Zcash imekamilika na usaidizi wa asili wa mchanganyiko wa mtandao unasafirishwa katika pochi halisi za Zcash.

### Pochi Zingo!

Zingo PC inajumuisha usafiri asilia wa Nym. Zingo Mobile pia husafirisha Mixnet Mode kwenye iOS na Android kwa kutumia proksi ya ndani ya programu ya Nym.

Tabia ya sasa iliyoandikwa na Zingo:

- Kidhibiti cha Nym kiko chini ya **Mipangilio → Nym Mixnet**.
- Kutuma malipo hupitishwa kupitia mtandao wa mchanganyiko.
- Usafirishaji wa uhamiaji Ironwood hufuata njia ile ile ya kutuma iliyolindwa.
- Maombi ya bei ZEC pia hupitishwa kupitia mtandao mchanganyiko.
- Utumaji hushindwa kufungwa huku Nym ikiwa imewashwa: ikiwa usafirishaji wa mixnet haupatikani, malipo hayatatumwa kimya kimya kupitia clearnet.
- **Usawazishaji wa mnyororo kwa sasa haupitishwi kupitia mtandao wa mchanganyiko** katika Zingo PC. Vizuizi vichache, maswali ya ubatilishaji, uchukuaji wa miamala, trafiki ya mempool, na ukaguzi wa afya ya seva bado hutumia muunganisho wa kawaida wa seva.

Tofauti hiyo ni muhimu: Muunganisho asilia Zingo's unalinda njia ya utangazaji yenye muunganisho wa hali ya juu zaidi, lakini bado si handaki la mtandao wa vifaa kamili.

Ikiwa mfumo wako wa vitisho pia unahitaji kuficha trafiki ya usawazishaji kutoka kwa seva, tumia handaki ya faragha ya kiwango cha mfumo kama vile NymVPN pamoja na kuelewa ucheleweshaji na ugumu wa ziada unaoletwa na mfumo huu.

Vyanzo:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym anaripoti kwamba **Zkool** sasa inasaidia kuunganisha kwenye miundombinu ya Zcash RPC kupitia mtandao mchanganyiko wa Nym kwa kutumia toggle asilia.

Zkool ndiye mrithi wa YWallet. Mradi wake pia unaunga mkono huduma za uwakilishi wa Tor na onion kwa miunganisho ya seva Zcash.

Pendelea chaguo asilia Zkool's Nym kuliko kujaribu kulazimisha YWallet ya zamani ijengwe kupitia njia ya proksi isiyo na hati.

Vyanzo:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet pia ina njia za usafiri zinazojulikana na Nym. Utekelezaji wake wa sasa unaunga mkono uwasilishaji wa miamala inayotoka kupitia mtandao wa Nym na njia tofauti ya Nym dVPN kwa ajili ya usawazishaji wa vizuizi vidogo. Zichukulie hizi kama ulinzi tofauti badala ya kudhani kila ombi la pochi hutumia mtandao wa mix kiotomatiki.

Vyanzo:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### ZODL

Kwa sasa ZODL ina **Tor Protection** iliyojengewa ndani, si muunganisho wa asili wa Nym ulioelezwa hapo juu kwa Zingo, Zkool, na Nozy.

Kipengele cha ZODL cha Tor kinaweza kuhamisha uwasilishaji wa miamala, urejeshaji wa data ya miamala, maombi ya kiwango cha ubadilishaji, na simu za API za wahusika wengine kupitia Tor. Nym alisema mnamo Septemba 24, 2026 kwamba bado iko kwenye mazungumzo hai na timu ya ZODL kuhusu ujumuishaji mpana wa mixnet.

Kwa ZODL leo, tumia mojawapo ya:

- Ulinzi wa Tor ulioandikwa na ZODL, au
- NymVPN ya kiwango cha mfumo ikiwa lengo lako ni kuelekeza trafiki ya jumla ya kifaa cha pochi kupitia Nym.

Usidhani Tor na Nym ni usafiri unaoweza kubadilishwa ndani ya pochi kwa sababu tu zote mbili ni mitandao ya faragha.

Mipangilio ya ZODL Tor:

**Zaidi → Vipengele vya Kina → Beta: Ulinzi wa Tor → Wezesha → Hifadhi mabadiliko**

Vyanzo:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Fallback: NymVPN ya kiwango cha mfumo

Hii ndiyo chaguo la Nym linalofaa zaidi kwa sababu haihitaji pochi kuelewa mipangilio ya proksi mahususi ya Nym.

### 1. Sakinisha NymVPN

Pakua NymVPN pekee kutoka kwa tovuti rasmi ya Nym au duka rasmi la jukwaa:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN inasaidia Android, iOS, Linux, Windows, na macOS.

### 2. Chagua hali ya Mixnet

NymVPN hufichua **Hali ya Haraka**, njia ya dVPN ya hop 2 iliyoboreshwa kwa ajili ya kupunguza muda wa kusubiri, na **Hali ya Mixnet**, njia ya mixnet ya hop 5 iliyoboreshwa kwa ajili ya ulinzi imara wa metadata ya mtandao. Kwa shughuli nyeti ya pochi, chagua hali ya Mixnet na usubiri hadi mteja aripoti kwamba muunganisho umeanzishwa kabla ya kufungua au kuburudisha pochi.

### 3. Acha pochi kwenye mipangilio ya kawaida ya mtandao

Wakati mfumo wa uendeshaji tayari unapitisha trafiki kupitia NymVPN, pochi nyingi hazihitaji mipangilio maalum ya proksi.

Fungua pochi kawaida na uiruhusu ilandanishwe.

Ikiwa NymVPN itaonyesha utengano wa handaki kwenye mfumo wako, thibitisha kwamba pochi imejumuishwa kwenye handaki iliyolindwa**, haijawekwa kwenye orodha ya kukwepa au kutengwa.

### 4. Thibitisha handaki kabla ya kutumia pochi

Ukaguzi rahisi wa kiwango cha mfumo:

1. Tenganisha NymVPN.
2. Tembelea huduma ya ukaguzi wa IP ya umma, au ukiwa kwenye kompyuta ya mezani:

   ```bash
   curl https://api.ipify.org
   ```

3. Rekodi IP inayoonekana.
4. Unganisha NymVPN katika hali ya Mixnet.
5. Rudia hundi.

IP inayoonekana ya umma inapaswa kubadilika.

Hii inathibitisha handaki ya mfumo. **Haithibitishi** kwamba kila ombi linalotolewa na pochi fulani hufuata njia ile ile ikiwa programu au mfumo wa uendeshaji una sheria maalum za uelekezaji.

Kwa uhakika zaidi kwenye kompyuta ya mezani:

- kukagua mchakato wa pochi kwa kutumia kifuatiliaji cha mtandao cha mfumo endeshi,
- hakikisha hakuna kizuizi cha handaki iliyogawanyika,
- thibitisha mabadiliko yanayotarajiwa ya tabia ya pochi ikiwa NymVPN itakatika.

Usichapishe picha za skrini zenye anwani za pochi, salio, vitambulisho vya miamala, anwani za IP, au nyenzo za kurejesha data wakati wa kutatua matatizo.

## Hali ya proksi NymVPN dApp / pochi

NymVPN pia huonyesha hali ya proksi ya programu na pochi kwa kutumia SOCKS5 / RPC kupitia mtandao mchanganyiko.

Nyaraka za usanidi wa umma za Nym zinaonyesha hili hasa kwa usanidi wa RPC wa mtindo wa Ethereum. Ni muhimu kwa programu inayounga mkono waziwazi njia ya proksi/RPC inayolingana, lakini haipaswi kudhaniwa kuwa inafanya kazi na kila pochi ya Zcash.

Tumia njia hii tu wakati hati ya pochi yenyewe inathibitisha usaidizi wa proksi au RPC unaoendana.

Vinginevyo, napendelea:

- muunganisho asilia wa Nym wa pochi, au
- system-level NymVPN.

## Utendaji na mabadiliko ya muda wa kuisha

Mixnets hubadilishana kimakusudi kasi kwa ajili ya ulinzi imara wa metadata.

Tarajia athari inayowezekana kwa:

- Usawazishaji wa awali wa pochi,
- usawazishaji mkubwa wa upatanishi,
- maswali ya historia ya miamala,
- Muda wa RPC kuisha,
- Simu za API za wahusika wengine.

Mwongozo wa vitendo:

- Anza na mipangilio chaguo-msingi ya Nym.
- Tarajia usawazishaji wa kwanza au usawazishaji mrefu wa muda mfupi utachukua muda mrefu zaidi.
- Jaribu tena kusubiri muda kabla ya kudhoofisha mipangilio ya faragha.
- Epuka kubadilisha mara kwa mara hali za faragha mara moja kabla ya muamala nyeti.
- Ukitumia njia ya haraka zaidi kwa ajili ya usawazishaji wa wingi, elewa kwamba miundombinu iliyoguswa inaweza kuona utambulisho wako halisi wa mtandao wakati huo.
- Kwa Zingo PC haswa, kumbuka kwamba usafiri wake asilia wa Nym kwa sasa unalinda utafutaji wa utumaji na bei, huku usawazishaji ukibaki moja kwa moja.

## Mambo ya kuzingatia kwenye simu

Kwenye Android na iOS, nafasi ya VPN ya mfumo endeshi kwa kawaida ndiyo njia rahisi zaidi ya kuelekeza trafiki ya jumla ya pochi kupitia NymVPN: unganisha NymVPN kwanza, kisha fungua pochi.

Ikiwa kizuia matangazo kingine cha VPN, ngome, au VPN cha ndani tayari kinachukua kiolesura cha VPN cha mfumo, bidhaa hizo mbili huenda zisiweze kufanya kazi kwa wakati mmoja. Thibitisha hali ya VPN ya mfumo endeshi kabla ya kudhani pochi imelindwa.

## Orodha ya kuangalia ya mfumo wa vitisho

Kabla ya kutegemea mpangilio, uliza:

- Je, ninatumia anwani za Zcash zilizolindwa inapobidi?
- Je, pochi yangu ina usaidizi wa asili wa Nym?
- Ikiwa ndivyo, ni trafiki gani hasa ambayo ujumuishaji huo wa asili unalinda?
- Ikiwa ninahitaji huduma pana zaidi, je, NymVPN imeunganishwa kabla ya pochi kuanza shughuli za mtandao?
- Je, pochi imetengwa na sheria ya kugawanya handaki?
- Je, ninategemea hali ya proksi ambayo pochi hiyo inarekodiwa?
- Je, ninavujisha utambulisho kupitia kubadilishana, kipindi cha kivinjari, API ya mtu wa tatu, au anwani inayoeleweka?
- Je, niko tayari kwa ajili ya usawazishaji wa polepole na muda wa kuisha mara kwa mara?

## Vyanzo

- Nym: Nym mixnet sasa inatumika kwenye pochi za Zcash, Septemba 24, 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Tabia ya Zingo PC Nym: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Usafiri wa Zingo Mobile Nym: https://github.com/zingolabs/zingo-mobile
- Hifadhi ya Zkool: https://github.com/hhanh00/zkool2
- Kazi ya usafiri ya NozyWallet Nym: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Ulinzi wa ZODL Tor: https://support.zodl.com/article/17-enabling-tor-protection
