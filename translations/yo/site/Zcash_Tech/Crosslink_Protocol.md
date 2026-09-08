<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àdéhùn Ìsopọ̀-ọmọlépọ̀ (Crosslink Protocol)

## TL;DR

* Àmúlò Crosslink jẹ àbá tí a ṣe fún ìpele Proof-of-Work/Proof- of Stake (PoW/PoS) ti Zcash. Ó so PoW pọ̀ pẹlú ìlànà Byzantine Fault Tolerance (BFT), èyí tó ń mú kí ìdánilójú pé ó di òpin báwọn ìgbà tí PoW tàbí PoS wà nípamọ́ láìséwu.
* Hybrid PoS ṣafihan awọn notaries ti o ṣe idaniloju awọn bulọọki da lori ZEC  ni ibẹrẹ iduro, nigbamii yan da lori zEC.
* Crosslink ni ifọkansi lati pese awọn iwe-iṣowo meji: ** iforukọsilẹ ti o pari (LOG_fin)** fun aabo yiyi pada, ati pe ** ile-iṣẹ idaduro kekere (LO G ba) ** eyiti o faagun rẹ nipasẹ ko ju * L* bulọọki lọ.
* A **Awọn ipo aabo** activates ti o ba awọn pari ledger falls sile nipa diẹ ẹ sii ju *L* bulọọki: PoW tesiwaju, ṣugbọn ọrọ-aje ise pauses titi oro ni won yanju.
* Ni akoko, awọn olutọtọ PoS yoo gba ipin ti n dagba sii ninu ẹsan, dinku owo-ori awọn oniwakiri PoW; ilana naa ṣafihan awọn ayipada laiyara.
* Àkọsílẹ̀ náà ni Shielded Labs ń ṣe, pẹlú ìwé ìrìnnà fún dídípò Crosslink 2* sínú alágbàṣe Zebra ti Zcash.

## Àlàyé Ìpilẹ̀ṣẹ̀

### Ìfilọ: Zcash Hybrid PoS ati awọn Crosslink Protocol

The Crosslink Protocol is a landmark development in Zcash evolution, steering it towards a **Hybrid Proof-of-Stake (PoS)** and **Proof-of-Work (PoW)** model. Traditional PoW, while reliable for ensuring network security, faces criticism for energy consumption and centralization risks associated with industrial mining. Crosslink introduces a hybrid system, merging the proven robustness of PoW with the efficiency and governance advantages of PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

This transition aligns with global trends in blockchain innovation, where projects are shifting to environmentally sustainable and decentralized mechanisms. Crosslinks' dual consensus model ensures Zcash maintains its strong cryptographic privacy guarantees while evolving to meet contemporary challenges.

Àbá Proof-of-Stake (PoS) jẹ́ àdàkọ ti a ṣe láti da ẹ̀rí iṣẹ́ pọ̀ pẹ̀lú PoS, tí ó ní ìlépa lati yanjú àwọn àìlera bí 51% ìjà nígbàtí o ń tọ́jú ìdásílẹ̀ àti dín ìlò agbára kù. Hybrid PoS ṣafihan awọn notaries tó fọwọsi bulọọki dá lórí ZEC tí wọ́n fi okùn sí i. Ẹrọ yìí ni wọn ṣe fún títún ètò aabo pápá ati fífi ìdíwòdìyẹsẹ mú ọ̀nà mu, èyí sì n pèsè ọ̀kan mìíràn díẹ̀ lọ́lá ju ìlànà PoW lásán lọ.

### Kí nìdí Hybrid PoS/PoW bi akọkọ igbeyewo?

* O ṣe ilọsiwaju si PoS mimọ.
* O mu ki iwakusa ati awọn ọran lilo staking ni akoko kanna ati agbelebu ilolupo eda abemi.
* Ó ń dín àwọn ìṣòro ààbò tó ṣeé ṣe pẹ̀lú ìlànà PoS kù títí tí yóò fi ní ìfọkànbalẹ̀ àti ìdánilójú.
* Ọ̀nà tí wọ́n gbà ń ṣe é ni Ethereum in Production fi hàn.

### Kí ni Crosslink jẹ́?

The Crosslink protocol is a proposed design for Zcash's hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. It integrates PoW with a Byzantine Fault Tolerance (BFT) protocol, enabling assured finality as long as either PoW or PoS remains secure. The design aims to strengthen network security and decentralization by incorporating staked validation while maintaining miner participation. A key feature of the proposal, called Crosslink 2, simplifies the architecture by unifying BFT proposers and miners. This streamlined approach minimizes structural changes and allows the use of a "dummy" BFT layer, making it easier to prototype and deploy while maintaining high-security standards.

The implementation plan includes a roadmap with estimated engineering costs for integrating Crosslink 2* into Zcash's Zebra client. This phased deployment focuses on balancing stakeholder incentives, reducing disruption, and aligning with Zcash goals for scalability, usability, and decentralization. Growing confidence in the protocol's robust security properties further solidifies its potential as a key step in Zcash evolution. By addressing energy efficiency and enhancing consensus mechanisms, Crosslink offers a forward-looking solution to evolving blockchain challenges. For more details, refer to the [Àkójọ GitHub](https://github.com/ShieldedLabs/crosslink-deployment) àti àwọn [Àjọ Ìgbìmọ̀ Zcash Forum](https://forum.zcashcommunity.com).

### Àwọn Àfojúsùn àti Ìlépa Crosslink

A ṣe apẹrẹ Ilana Crosslink lati koju awọn ibi-afẹde iṣakoso pupọ pataki fun ọjọ iwaju Zcash:

1. **Ipa-ipinlẹ**:
   * Nípa fífi PoS kún, Zcash dín ìgbẹ́kẹ̀lé lórí ohun èlò tí a ṣe fún PoW (ASICs) kù, èyí tó sábà máa ń kó agbára ìṣàmúlò jọ láàárín àwọn oníṣẹ́-ṣiṣe ńláńlá díẹ̀.
   * PoS gba ikopa lati agbegbe ti o gbooro, nibiti awọn oniwun owo ṣe idogo dukia wọn lati ni aabo nẹtiwọọki naa, ṣiṣe idaniloju ifọkanbalẹ pinpin diẹ sii.
   * Nípa fífi ìfọwọ́sílẹ̀ tí ó nípìn-ín nínú ṣe, àgbékalẹ̀ náà rí i dájú pé àwọn olùkópa ètò ọrọ̀ ajé ń kó ipa tó lágbára nínú àdéhùn, èyí sì dín bí wọ́n ti gbẹkẹle iṣẹ́ iwakusa kù.
2. **Ìdarí tí ó dára sí i**:
   * Coinholders gain voting rights through staking, enabling them to influence decisions about network upgrades, funding allocations, and ecosystem priorities. This democratic mechanism aligns the protocol's evolution with community interests.
3. **Ìlówó tó ń mú kí agbára lò**:
   * Transitioning partially to PoS significantly lowers energy demands, aligning Zcash with global sustainability initiatives. PoS is inherently less resource-intensive compared to the computationally heavy PoW. Hybrid systems aim to lower energy use compared to PoW-only systems while maintaining high security.
4. **Awọn eto-ọrọ ati Idagbasoke Iṣowo**:
   * Ajọpọ PoW ati PoS ṣe iyatọ awọn iwuri eto-ọrọ fun awọn olukopa nẹtiwọọki, ni idaniloju aabo to lagbara laisi igbẹkẹle pupọ lori ilana kan.
   * Staking tun ṣe afihan awoṣe ere ti o ni asọtẹlẹ fun awọn olukopa, ṣiṣẹda imọran ifamọra fun awọn oludokoowo igba pipẹ.
5. **Ilọsiwaju Aabo**: Crosslink ni ifọkansi lati mu agbara ti nẹtiwọọki pọ si lodi si awọn ikolu atunse ẹwọn nipa sisopọ PoS lẹgbẹẹ PoW.

## Ìran / Àfiwé

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Think of a parcel service that issues two different documents for the same delivery. The first is a tracking scan: it appears quickly, tells you where the parcel most likely is, and is occasionally corrected. The second is a signed delivery receipt: it arrives later, but once it exists nobody disputes it.

Ìwé tí kò ní ìjáfara tó pọ̀ jù ni ìwé àyèwò ìṣẹ̀lẹ̀, èyí tá a fi ń mọ ibi téèyàn ti ṣe nǹkan àti àkọsílẹ̀ náà. Àwọn méjèèjì ló sì ṣàpèjúwe àwọn ohun kan náà; ìyàtọ̀ wà nínú bí wọ́n ṣe tètè fara hàn àtàwọn ọ̀nà táwọn èèyàn gbà gba ẹ̀rí wọn.

Ọ̀nà Ààbò ni ohun tí ilé ìpamọ́ máa ń ṣe nígbàtí àwọn àkáǹtì tó fọwọ́ sí bá dáwọ́ dídé dúró bí àwárí sì ti ń pọ̀. Àwọn páálí ṣì ń rìn káàkiri inú ilé náà  ṣùgbọ́n ọ́fíìsì ò san owó fún wón nítorí wípé wọ́n fi ojúwòrán yà á sókè títí dìgbà táwọn aláṣẹ yóò dé.

## Wọlé Lọ Jìnnà

### Ààbò àti Ìlépa Iṣẹ́-ìṣe ti Crosslink

Àgbékalẹ̀ Crosslink ní láti pèsè oríṣi ìwé àkọsílẹ̀ méjì fún Zcash: àgbékalẹ̀ tí ó parí (LOG_fin) àti èyí tó pẹ́ díẹ̀ jù lọ (LO G ba). A ṣe é kí á lè wà láàyè, kó sì dáàbò bò àwọn ìsọfúnni.

Igbimọ-iṣowo ti o kere ju n fa ifunni ipari nipasẹ ko si diẹ sii ju awọn bulọọki * L *. O ṣe idaniloju aabo atunṣe labẹ ilana blockchain nikan ati ṣetọju idaduro ati ailewu kii buru julọ ju awoṣe Zcash tẹlẹ lọ. Ni apẹrẹ Crosslink 2* ti a sọ di mimọ, iwe ifowopamọ idadoro kekere jẹ simplifies idagbasoke ati gbigba nipa ṣiṣẹ bi pq kan PoW okun .

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Àyè Ìmúṣẹ àti Ọ̀nà Aàbò (Limited Availability and Safety Mode)

Crosslink ṣe àgbéyẹ̀wò àwọn ewu tó jẹ mọ́ ìwé àkọsílẹ̀ tí ó ní ìmúrasílẹ̀ díẹ̀, èyí sì ń dáàbò bo ètò náà. Èyí ni kò jé kí àìṣe bára mu wáyé bí irú ti ìṣirò òǹkà orí kọǹpútà tàbí ìdánilójú nípa ìdáhùn ìgbàdígbà láti ọwọ́ àwọn olùfúnni-níṣẹ́. Àṣà Ìdáàbòbò máa n ṣiṣẹ nígbàtí iwe àkọsílé parí bá fi ẹyọ *L* ju iye kan lọ sílẹ̀. Ní àkókò yìí, blockchain yóò tẹsiwaju pẹlú iṣẹ PoW (ìdásílẹ̀ ààbò), ṣùgbọ́n ìgbésè ọròjà á dúró títí aáwọ̀ yíi yoo fi yanjú. Ẹ̀rọ yìí wà fún gbígba ara rẹ padà kúrò nínú ipò pàtó bíi lílo ogun ńlá lákòókò tí wọ́n ń ṣètìlẹyìn sí ìlànà atúnpadà sẹ́yìn lórí ìbáwí ìjọba.

### Àwọn Àlàyé Ìmọ̀ Iṣé́ àti Bí Wọ́n Ṣe Ń Ṣiṣẹ́ Lára Rèé

Àdéhùn Crosslink ni a ti n ṣe idagbasoke ati gbe jade nipasẹ Shielded Labs ni ifowosowopo pẹlu awọn alabaṣepọ eto-aye pataki bi Zodl. Imuse ilana naa pẹlu:

* Ṣiṣeto awọn ilana idaduro ailewu fun awọn olukopa PoS.
* Ṣiṣatunṣe eto ẹsan lati ṣe iwontunwonsi awọn idilọwọ laarin awọn oniwakiri ati awọn ti o ni ipa.
* Rii daju pe o ni ibamu si ẹhin ati iriri olumulo ti ko ni idiwọ lakoko iyipada.
* Eto Notary: Ilana naa ṣafikun awọn notari ti o fọwọsi lori bulọọki. Ni akọkọ, a lo awọn notaries static, iyipada si eto onigbọwọ nibiti wọn yan awọn notarii daadaa ZEC.
* Àlàyé Ìṣiṣẹ́: Ifilọlẹ̀ Crosslink gba àtúnṣe sí ìlànà ìfohùnmọ̀sọ̀rọ Zcash, títí kan yíyan ètò pínpín ìpín àti títún àwọn òfin àdéhùn nẹtiwọki ṣe láti ṣètìléyìn fún àmúlùmálà èrò orí.
* Ifilọlẹ ni ipele: A yoo ṣe ilana naa ni awọn ipo lati rii daju iduroṣinṣin nẹtiwọki ati adaṣe agbegbe. Awọn ipele akọkọ fojusi lori imuse imọ-ẹrọ, atẹle nipasẹ iṣọpọ ijọba fun yiyan awọn notaries.

O le ṣawari awọn alaye imọ-ẹrọ ati tọpinpin ilọsiwaju rẹ nipasẹ Awọn ọna kika Iṣakoso. [Àkójọ Ìmúgbòòrò Crosslink lórí GitHub](https://github.com/ShieldedLabs/crosslink-deployment).

## Àwọn Ohun Tó Lè Yọrí sí Lóòótọ́

### Ipa lori Owó-ìdókòwò Àwọn Olùgbèrú PoW

Crosslink mọ ipa ipilẹ ti awọn oniwakiri PoW ni idagbasoke Zcash lakoko igbaradi fun iyipada laiyara:

* **Iye owo ẹsan ti o dinku**:
  * Ni akoko, awọn olutọtọ PoS yoo gba ipin ti o pọ si ninu ẹsan, dinku owo-ori ti awọn oniṣẹ miners. Iyipada yii ṣe afihan ipa idinku ti PoW ni awoṣe idapọmọra.
* Ìyípadà Òdodo:
  * Àkọsílẹ̀ náà ṣafihan àwọn àyípadà ní pẹrẹu, tí ó ń rí i dájú pé àwọn tó n wa owó lókè-òkun ni àkókò to láti ṣe ìmúṣẹ tàbí kí wọ́n ṣàwárí ipa tuntun nínú ètò ìṣètò Zcash, bí yípò sí dídínwó tabi fífi kún iṣẹ́ mìíràn ti ẹ̀rọ.
* **Ipa Awọn Ewu Iṣọkan**:
  * PoS staking pools ti wa ni a še lati se idiwọ ifojusi agbara, ipese kere awọn ẹrọ orin kan anfani lati kopa lori dogba. yi gbogbo-ni ona counteres lọwọlọwọ ifọkansi ri ninu ASIC orisun iwakusa.
* PoW miners will experience reduced revenue as part of the block reward is reallocated to PoS validators. This reallocation ensures a balanced incentive system, rewarding both miners and stakers for securing the network.
* A ti gbero iyipada ni igbesẹ lati dinku ipa ọrọ-aje lori awọn oniṣẹ iwakusa lakoko igbega ikopa awọn oniduro.

Ọna ìfọwọ́sowọ́pọ̀ méjì yìí ń fún ìgbésẹ̀ Zcash ní agbára sí àṣírí, àtidúróṣinṣin àti dídásílẹ̀-sípò, tí ó sì fi í ṣe olórí tó máa wojú ọjọ́ iwájú nínú ẹ̀ka blockchain.

## Àwọn Àṣìṣe Tó Máa Ń Ṣẹlẹ̀ Lóde Òní

**Kìkà Crosslink gẹ́gẹ́ bí ìlànà ìfọwọ̀sí tó ń ṣiṣẹ́**. Ojúewé yìí ṣàpèjúwe àbá tí a dá sílẹ̀ pẹlú ètò ìdásílẹ̀ ní ìgbésẹ̀-gbesẹ̀ kan. Ṣíṣe é nílò àwọn ayipada sí òfin ìfọkansi Zcash, èyí ni ohun ti ìwé ìrìnnà àti iṣẹ́ isọdọkan Zebra wà fún.

** Ifá pé PoS yípò ìwakùsà**. Crosslink jẹ́ àdàkọ: Ìṣẹ̀dá àwọn ẹyọ PoW ńlọ pẹlú ìdánimọ tí ó wà nídìí rẹ̀. Kódà nínú Àṣètò Aàbò, blockchain tẹsiwaju iṣẹ́ PoW nígbàtí ìgbòkègbodò ọrọ̀ ajé bá dáwọ́ dúró.

**Tíṣe "ìparẹ̀" gẹ́gẹ́ bí ìmúdájú tó yá jù**. Àkọsílẹ̀ tí a ṣe parí ni wọ́n dá fún àkókò dídákẹ́ jẹ́ nǹkan bíi méjì ti àtẹ Zcash tòní láti fi mú ìdánilójú àwọn ẹyọ-àdìpò kan náà ṣẹ. Ohun tí ó ńfi kún un ni ètò ìdápadà, kì í ṣe iyara  ìwé àkọọ́lẹ̀ pẹpẹ -titi o dín kù ní ojú ìwòye yíyára kánkán.

**Ṣíṣipò àwọn ìwé àkọsílẹ̀ méjì**. LOG_ba kìí ṣe àlàfo ọ̀tọ̀: ó ń mú kí iwe-ìwé tí a ti parí pọ̀ sí *L* ìdìpọ̀, àti nínú ètò Crosslink 2*, ó ṣiṣẹ́ bí ẹyọ PoW kan.

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Zebra Ìkànnì Pípéye](/zcash-tech/zebra-full-node)  oníbàárà tí a ń gbèrò láti kó Crosslink 2* jọ.
- [Àwọn Ìkànnì Pípéye](/zcash-tech/full-nodes)  bi awọn nodu ṣe jẹrisi ofin ifọkanbalẹ loni, ṣaaju eyikeyi iyipada igbẹkẹle idapọmọra.
- [Àwọn Àtúnṣe sí Ìpínlẹ̀ Nẹ́tàkì](/start-here/network-upgrades)  bí àwọn àyípadà ìlànà ìfohùnṣòótọ́ ṣe dé sí ẹ̀ka Zcash.
- [Ìṣèlú owó Zcash](/start-here/zcash-monetary-policy)  ìmúra èrè àdìpò tí Crosslink yóò pín.

## Àwọn Owó Àfikún

- Àwọn ìlàlóye láti ọ̀dọ́: [Àjọ Ìgbìmọ̀ Zcash - Àwọn ìjíròrò lórí Crosslink](https://forum.zcashcommunity.com)
- Àwọn àtúnṣe tí ó wà nípamọ́: [Electric Coin Company Blog](https://electriccoin.co)
- Ìfojúsọ́nà sí ìmúgbòòrò: [Ìdí tí PoS Àdàpọ̀ fi ṣe pàtàkì fún Zcash](https://forum.zcashcommunity.com)

  Àlàyé:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       gba Àwòrán-ìwòyí ní kíkún (FullScreen)
       loading="lazy"
     />
</div>
