# Zcash Banguko RedBridge

Zcash Avalanche RedBridge ni daraja lililotengwa ambalo huwezesha ushirikiano kati ya blockchain za Zcash (ZEC) na Avalanche (AVAX). Daraja hili limeundwa ili kuwezesha uhamishaji wa ZEC bila mshono kwenye blockchain ya Avalanche, kwa kutumia njia za juu za uzalishaji, ada za chini, na utaratibu rafiki kwa mazingira wa Avalanche huku likihifadhi vipengele vinavyozingatia faragha vya Zcash.

RedBridge inasaidia aina mbalimbali za matumizi, ikiwa ni pamoja na fedha za mnyororo wa kati (DeFi), miamala ya kibinafsi, na ugawanaji wa ukwasi, na kuwawezesha wamiliki wa Zcash kupata ufikiaji mpana wa mfumo ikolojia wa Avalanche. Daraja hili linaendeshwa kupitia seti ya nodi za mnyororo wa kati na oracle, inayojulikana kama **ZavaX**, ambayo inahakikisha uhamishaji wa data unaoaminika na uthibitishaji wa bei kati ya Zcash na Avalanche.

### Vipengele Muhimu

Uhifadhi wa Faragha Uwezekano wa Kushirikiana: Huruhusu watumiaji wa Zcash kudumisha faragha wanapotumia programu za DeFi kwenye Avalanche.
Oracle Iliyogatuliwa ZavaX: Huunganisha mfumo wa oracle ili kuhakikisha data sahihi ya bei ya ZEC/AVAX, ikiruhusu shughuli za mnyororo mtambuka zisizoaminika.
Inaweza Kupanuliwa na Rafiki kwa Mazingira: Hutumia mfumo wa makubaliano ya Maporomoko ya theluji, kutoa miamala ya kasi ya juu yenye athari ndogo kwa mazingira.
Usaidizi kwa DeFi na DApps: Wamiliki wa Zcash sasa wanaweza kushiriki katika mifumo mbalimbali ya DeFi kwenye Avalanche bila kuathiri faragha.

### Vipengele vya Kiufundi

**Oracle ya ZavaX Iliyogatuliwa**
Maelezo: Oracle ya ZavaX ni muhimu kwa daraja, ikitoa mipasho ya bei ya mnyororo mtambuka na kuwezesha ubadilishaji usioaminika wa ZEC hadi AVAX.
[Kiungo cha Oracle](https://zavax-oracle.red.dev)

**Mkataba wa Daraja la Mnyororo Mtambuka**
Maelezo: Usanifu mahiri wa mikataba unaounga mkono daraja la Zcash Avalanche, kushughulikia amana, ubadilishaji, na uondoaji wa ZEC.

**Ujumuishaji wa Tabaka la Faragha**
Maelezo: Huhakikisha kwamba vipengele vya faragha vya Zcash vinahifadhiwa katika mchakato mzima wa kuunganisha, na hivyo kuruhusu miamala ya kibinafsi ya mnyororo mtambuka.

## Matoleo na Nyaraka

**Daraja la Zcash Elastic Subnet kwenye Banguko**: [Pendekezo la Ruzuku](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
Hapa chini kuna matokeo muhimu na rasilimali za kiufundi zilizokamilishwa kwa ajili ya mradi wa Zcash Avalanche RedBridge:

Inayoweza Kutolewa 1.1: PoC ya Awali inayounga mkono kuuliza miamala ya testnet Zcash kutoka kwa mtandao mdogo wa Avalanche wa testnet na CLI, iliyochapishwa kwenye Github na kwa mtandao mdogo wa nodi moja kwenye mtandao wa Avalanche. https://github.com/red-dev-inc/zavax-oracle

Inayoweza Kutolewa 2.1: [Usanifu wa majengo](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### Hatua Muhimu 3 Machi 31, 2024

Deliverable 3.1 is complete, presenting our analysis on adopting FROST over BLS for threshold signatures in the ZavaX bridge. This shift leverages audited libraries from the Zcash Foundation and facilitates better integration and security. https://github.com/ZcashFoundation/frost

Ubunifu wa 3.2 UX na UI unaoweza kutolewa kwa ajili ya GUI umekamilika, ukielezea maboresho yetu ya usalama kwa mtandao mdogo wa ZavaX Oracle, unaoungwa mkono na matokeo ya majaribio ya kupenya. Kwa maelezo zaidi, ikiwa ni pamoja na usanidi wa seva na matokeo ya majaribio [Tathmini ya Usalama](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[Ripoti ya Ukaguzi](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
Zaidi ya hayo, timu ilibadilisha jina kutoka ZavaX hadi redbridge na kubadilisha tokeni yetu ya kuweka kutoka ZAX hadi RBR.

### Hatua Muhimu 4 Aprili 30, 2024
Inayoweza kutolewa 4.1 Utekelezaji kamili wa mtandao wa majaribio wa Zcash na Avalanche, ukiwa na Subnet ya kithibitishaji 3, ukiwa na usaidizi wa CLI

### Hatua Muhimu 5 Mei 31, 2024
Kielelezo cha 5.1 kinachoweza kutolewa: ujumuishaji wa daraja kwenye Core au Webapp

Hatua Muhimu 6 Juni 30, 2024
Inayoweza Kutolewa 6.1 Kufaulu kwa ukaguzi wa programu
Inayoweza kutolewa 6.2 Kuchapisha msimbo chanzo uliokaguliwa kwa hifadhi ya umma ya Github

Angalia [Jalada la Github](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)
  
Kwa maelezo zaidi ya kiufundi, watumiaji wanahimizwa kupitia hazina na nyaraka za mradi wa RedBridge ili [chunguza](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/) maelezo mahususi ya ujumuishaji, mifumo ya majaribio, na itifaki za usalama.


![img1](/content-images/b8c5d267-1711-458a-8a32-1df9d56fae8a-a93ff66932.webp)


* Matoleo: 
Katika robo ya kwanza ya mwaka 2025, timu ilitangaza uzinduzi wa [tovuti ya onyesho la red·bridge](https://redbridge-demo.red.dev/index.html), ambapo mtu yeyote anaweza kujaribu uzoefu wa mtumiaji, kutoa maoni, na kupendekeza maboresho. Pia hutumika kama njia rahisi ya kuwatambulisha watu wasio wa kiufundi kwenye mradi huo.

* Timu ilitumia Zebra kwa toleo la mwisho la red·bridge. Ili kuijaribu, waliboresha nodi mbili kati ya tatu katika blockchain yao ya majaribio, ZavaX Oracle, ambayo inaendesha kwenye mtandao wa majaribio wa Fuji wa Avalanche. Nodi ya mwisho iliboreshwa kwa mafanikio, sasa [Zavax Oracle](https://web.archive.org/web/20260823181644/https://zavax-oracle.red.dev/) sasa inaendesha Zebra!

* Katika robo ya kwanza ya 2025, tovuti ya red.bridge iliwekwa msimbo ili kutoa mitazamo minne kutoka nyekundu, Giza, Mwanga, na Zebra tofauti na toleo la awali, ambalo lilikuwa nyekundu.

* Another point is that the team will activate the red·bridge L1 live on the Avalanche mainnet in December 2025. Initially, it will serve as an oracle for the Zcash blockchain and then, soon after, for Bitcoin as well. Wherein, each request will cost 0.001 AVAX in gas token. This build will enable any L1 or smart contract on Avalanche to inexpensively query data from Zcash and Bitcoin in a decentralized manner.

* Katika robo ya pili, timu iliwasilisha hatua muhimu ya ACP-77 (inayojulikana kama Avalanche9000) kwa Wakfu wa Avalanche ili kufanya uendeshaji wa mlinzi wa daraja la red.bridge mapema na uwe nafuu zaidi kwa kila mtu. Hapo awali, wathibitishaji walihitaji kuweka dau la takriban AVAX 2000; hata hivyo, kwa gharama za Avalanche9000, wathibitishaji walihitaji AVAX 1 pekee (mwezi). Zaidi ya hayo, hatua hii muhimu pia inakamilisha mpango wa kutumia utekelezaji wa FROST wa ZF, ambao unampa kila Guardian sehemu ya kusaini kwa udhibiti salama na uliosambazwa wa pochi ya daraja.

* Kufikia robo ya kwanza na robo ya pili ya 2026, red.bridge ingeandaa tokeni yake ya RBR (zamani ZAX) kwa wanajamii wa Zcash na Avalanche. Kulingana na mwanzilishi wa red.dev, wataandaa mtandao wa majaribio wenye motisha ambapo watumiaji watapata nafasi ya kupata RBR huku wakisaidia kujaribu daraja.


