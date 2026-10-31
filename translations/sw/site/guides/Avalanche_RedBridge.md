# Zcash Avalanche RedBridge

Daraja la Zcash Avalanche RedBridge ni daraja lililogatuliwa [decentralized bridge] linalowezesha ushirikiano kati ya blockchain za Zcash (ZEC) na Avalanche (AVAX). Daraja hili limeundwa kuwezesha uhamishaji usio na vikwazo wa ZEC hadi kwenye blockchain ya Avalanche, likitumia uwezo mkubwa wa uchakataji, ada ndogo, na mifumo ya makubaliano [consensus] inayozingatia mazingira ya Avalanche huku likihifadhi vipengele vinavyolenga faragha [privacy] vya Zcash.

RedBridge inaunga mkono matumizi [use cases] mbalimbali, ikiwemo fedha zilizogatuliwa za cross-chain (DeFi), miamala ya faragha, na ugawanaji wa ukwasi, ikiwapa wamiliki wa Zcash ufikivu mpana zaidi wa mfumo wa Avalanche. Daraja hili linaendeshwa kupitia seti ya node zilizogatuliwa na oracle, inayojulikana kama **ZavaX**, inayohakikisha uhamishaji wa data unaotegemewa na uthibitishaji wa bei kati ya Zcash na Avalanche.

### Vipengele Vikuu

Ushirikiano Unaohifadhi Faragha: Huruhusu watumiaji wa Zcash kudumisha faragha wanapotumia programu za DeFi kwenye Avalanche.
Oracle Iliyogatuliwa ZavaX: Huunganisha mfumo wa oracle ili kuhakikisha data sahihi ya bei ya ZEC/AVAX, na kuruhusu shughuli za cross-chain zisizohitaji kuaminiana.
Unaoweza Kupanuliwa na Unaozingatia Mazingira: Hutumia modeli ya makubaliano ya Avalanche, ikitoa miamala ya kasi kubwa yenye athari ndogo kwa mazingira.
Msaada kwa DeFi na DApps: Wamiliki wa Zcash sasa wanaweza kushiriki katika majukwaa mbalimbali ya DeFi kwenye Avalanche bila kuathiri faragha.

### Vipengele vya Kiufundi

**ZavaX Oracle Iliyogatuliwa**
Maelezo: ZavaX Oracle ni muhimu kwa daraja, ikitoa milisho ya bei za cross-chain na kuwezesha ubadilishaji wa ZEC kuwa AVAX usiohitaji kuaminiana.
[Kiungo cha Oracle](https://zavax-oracle.red.dev)

**Mkataba wa Daraja la Cross-Chain**
Maelezo: Usanifu wa mkataba mahiri [smart contract] unaounga mkono daraja la Zcash Avalanche, ukishughulikia amana, ubadilishaji, na utoaji wa ZEC.

**Ujumuishaji wa Tabaka la Faragha**
Maelezo: Huhakikisha kuwa vipengele vya faragha vya Zcash vinahifadhiwa katika mchakato mzima wa kuunganisha madaraja, na kuruhusu miamala ya faragha ya cross-chain.

## Vitu Vilivyowasilishwa na Nyaraka

**Daraja la Elastic Subnet la Zcash kwenye Avalanche**: [Pendekezo la Ruzuku](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
Hapa chini kuna vitu vikuu vilivyowasilishwa na rasilimali za kiufundi zilizokamilishwa kwa mradi wa Zcash Avalanche RedBridge:

Kitu Kilichowasilishwa 1.1: PoC ya awali inayounga mkono kuuliza miamala ya Zcash ya testnet kutoka subnet ya Avalanche ya testnet kwa CLI, iliyochapishwa kwenye GitHub na yenye subnet ya node moja kwenye testnet ya Avalanche. https://github.com/red-dev-inc/zavax-oracle

Kitu Kilichowasilishwa 2.1: [Usanifu](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### Hatua ya 3 Machi 31, 2024

Kitu Kilichowasilishwa 3.1 kimekamilika, kikiwasilisha uchanganuzi wetu wa kutumia FROST badala ya BLS kwa sahihi za kizingiti katika daraja la ZavaX. Mabadiliko haya yanatumia maktaba zilizokaguliwa kutoka kwa Zcash Foundation na kuwezesha ujumuishaji na usalama bora. https://github.com/ZcashFoundation/frost

Kitu Kilichowasilishwa 3.2 Muundo wa UX na UI wa GUI umekamilika, ukieleza maboresho yetu ya usalama kwa subnet ya ZavaX Oracle, yanayoungwa mkono na matokeo ya majaribio ya kupenya. Kwa maelezo zaidi, ikiwemo usanidi wa seva na matokeo ya majaribio [Tathmini ya Usalama](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[Ripoti ya Ukaguzi](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
Aidha, timu ilibadilisha chapa kutoka ZavaX hadi redbridge na kubadilisha tokeni yake ya kuweka sarafu [staking] kutoka ZAX hadi RBR.

### Hatua ya 4 Aprili 30, 2024
Kitu Kilichowasilishwa 4.1 Utekelezaji unaofanya kazi kikamilifu kwenye testnet za Zcash na Avalanche, wenye Subnet ya validator 3, pamoja na msaada wa CLI

### Hatua ya 5 Mei 31, 2024
Kitu Kilichowasilishwa 5.1 GUI: ujumuishaji wa daraja kwenye Core au Webapp

Hatua ya 6 Juni 30, 2024
Kitu Kilichowasilishwa 6.1 Kupita kwa mafanikio ukaguzi wa programu
Kitu Kilichowasilishwa 6.2 Kuchapisha msimbo wa chanzo uliokaguliwa kwenye repo ya umma ya GitHub

Tazama repo ya [GitHub](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)
  
Kwa maelezo zaidi ya kiufundi, watumiaji wanahimizwa kukagua hazina na nyaraka za mradi wa RedBridge ili [kuchunguza](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/) maelezo mahususi ya ujumuishaji, mifumo ya majaribio, na itifaki za usalama.


![img1](/content-images/b8c5d267-1711-458a-8a32-1df9d56fae8a-a93ff66932.webp)


* Vitu vilivyowasilishwa: 
Katika Q1 ya 2025, timu ilitangaza uzinduzi wa tovuti ya onyesho ya [red·bridge](https://redbridge-demo.red.dev/index.html), ambapo mtu yeyote anaweza kujaribu uzoefu wa mtumiaji, kutoa maoni, na kupendekeza maboresho. Pia hutumika kama njia rahisi ya kuwatambulisha watu wasio wa kiufundi kwa mradi.

* Timu ilitumia Zebra kwa toleo la mwisho la red·bridge. Ili kulijaribu, waliboresha node mbili kati ya tatu katika blockchain yao ya majaribio, ZavaX Oracle, ambayo inaendeshwa kwenye testnet ya Fuji ya Avalanche. Node ya mwisho iliboreshwa kwa mafanikio, sasa [ZavaX Oracle](https://web.archive.org/web/20260823181644/https://zavax-oracle.red.dev/) sasa inaendeshwa kwenye Zebra!

* Katika Q1 ya 2025, tovuti ya red.bridge iliandikwa ili kutoa mitazamo minne: red, Dark, Light, na Zebra, tofauti na toleo la awali, lililokuwa red.

* Jambo lingine ni kwamba timu itawasha L1 ya red·bridge moja kwa moja kwenye mainnet ya Avalanche mnamo Desemba 2025. Mwanzoni, itatumika kama oracle kwa blockchain ya Zcash na kisha, muda mfupi baadaye, kwa Bitcoin pia. Hivyo, kila ombi litagharimu 0.001 AVAX katika tokeni ya gas. Ujenzi huu utawezesha L1 au mkataba mahiri wowote kwenye Avalanche kuuliza data kutoka Zcash na Bitcoin kwa gharama nafuu kwa njia iliyogatuliwa.

* Katika Q2, timu iliwasilisha hatua muhimu ya ACP-77 (inayojulikana kama Avalanche9000) kwa Avalanche Foundation ili kufanya uendeshaji wa guardian wa red.bridge uwe wa mapema zaidi na wa gharama nafuu kwa kila mtu. Mwanzoni, validator walihitaji kuweka sarafu takriban 2000 AVAX; hata hivyo, kwa gharama za Avalanche9000, validator walihitaji AVAX 1 pekee (kwa mwezi). Aidha, hatua hii muhimu pia inakamilisha mpango wa kutumia utekelezaji wa FROST wa ZF, unaompa kila Guardian sehemu ya kusaini kwa udhibiti salama, uliosambazwa wa pochi ya daraja.

* Q1 na Q2 za 2026 zitakapowadia, red.bridge itaandaa airdrop ya tokeni yake ya RBR (hapo awali ZAX) kwa wanajamii wa Zcash na Avalanche. Kulingana na mwanzilishi wa red.dev, wataandaa testnet yenye motisha ambapo watumiaji watapata fursa ya kupata RBR huku wakisaidia kujaribu daraja.
