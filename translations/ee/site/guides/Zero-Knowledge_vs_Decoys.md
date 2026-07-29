<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zero Sidzedze vs Decoy si wotu ɖe Systems dzi

"Cryptocurrency ɖea wò gazazã ƒe dɔwɔnawo katã ɖe go na dukɔa elabena ele abe Twitter ene na wò Gadzraɖoƒe ƒe akɔnta eye esia nye nya gã aɖe si gbɔ wòle be woakpɔ to xɔse le kɔsɔkɔsɔ ƒe adzamenyawo me." - Ian Miers le [Devcon4 dzi](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Wode dzesi crypto-dɔ aɖewo le woƒe mɔnu siwo tsia dzi ɖe adzamenyawo ŋu ta. Zcash xɔ ŋkɔ le Zero Knowledge Proofs (ZK) zazã me tsɔ kpɔa asitsatsa ƒe ga homewo kple adrɛswo ta. Monero to vovo le eƒe Decoy-si wotu ɖe sender obfuscation zazã tsɔ kpe ɖe encryption ɖoɖo bubuwo ŋu be wòaɖo zãla ƒe adzamenyawo gbɔ le blockchain la dzi.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png" alt="" width="400" height="300"/>
</a>


## ZK Kpeɖodziwo kple Decoy Based Systems gɔmesese

Zero Knowledge Proofs nye nya ɣaɣlawo ƒe ɖoɖo siwo ɖea mɔ na akpa ɖeka (nudokpɔla) be wòaɖe nya aɖe ƒe nyateƒenyenye afia akpa bubu (amesi ɖo kpe edzi) evɔ maɖe *nyatakaka aɖeke si le ete tso nyagbɔgblɔa ŋutɔ ŋu* afia o. Le Zcash ƒe nyawo me la, wozãa ZK kpeɖodziwo tsɔ ɖoa ​​kpe asitsatsa aɖe ƒe nyateƒenyenye dzi evɔ womeɖea asitsatsa ŋuti nyatakakawo abe SENDER, RECEIVER alo transaction AMOUNT ene fiana o. 

**Esia kpɔa egbɔ be wokpɔa zãla ƒe nyatakakawo ta elabena asitsatsa la gakpɔtɔ nye nya ɣaɣla esime wogale kpeɖodzi nam kokoko. Wotrɔ asi le mɔ̃ɖaŋununya sia ŋu be wòakpɔ egbɔ be ganyawo ƒe nya ɣaɣlawo le Zcash network la dzi.**

Le Decoy-siwo wotu ɖe ɖoɖowo dzi abe [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), wotsɔa asitsatsa geɖe ƒoa ƒui si wɔnɛ be wòsesẽna alo wòsesẽna be woakpɔ ga tsoƒe ŋutɔŋutɔ kple afisi wòayi. Algorithm la to decoy inputs kple outputs vɛ le asitsatsa me hã zãa encryption of the addresses used as inputs & zã Range kpeɖodziwo tsɔ ɖo kpe ga home si wotsɔ yi teƒe bubu dzi be woate ŋu azãe. 

Mɔnu sia doa viviti ɖe asitsatsa ƒe mɔa dzi. Decoy inputs zazã na wòsesẽna na amesiame si le blockchain la me dzrom be wòade dzesi amesi ɖoe ɖa, amesi xɔe, alo adzɔnu ƒe ga home ŋutɔŋutɔ. 

**De dzesii Vevietɔ**: Mɔnu sia si wotsɔ kpɔa asitsatsa ta le kɔsɔkɔsɔ me la gaɖea nusiwo wotsɔ de eme (siwo wotsɔ nya ɣaɣlawo ŋlɔ) fiana tẽe na zãla ƒe asitsatsa katã. Woateŋu aƒo metadata abe *FLOW OF TRANSACTIONS* si le zãla vovovowo dome le network la dzi nu ƒu kokoko. Ne futɔ aɖe kpɔa gome vevie le asitsatsa wɔwɔ me le network la dzi la, eɖea ŋkɔ na ezãla bubuwo ƒe decoy inputs nyuie. 


## Viɖe siwo le ZK ŋu wu Decoy Based Systems

Zcash kple Monero siaa nye cryptocurrencies siwo tsia dzi ɖe adzamenyawo ŋu, gake woɖoa ame ŋutɔ ƒe nyawo gbɔ le mɔ vovovowo nu. 

Viɖe aɖewo siwo le Zcash ƒe zero-knowledge proofs (ZK) ŋu wu Monero ƒe decoy system lae nye esi:

1) **Nyaɖeɖefia Tiatia**: Ne woɖo Zcash ZK ƒe nɔnɔme la, tiatia le ezãlawo si be woaɖe asitsatsa ŋuti nyatakakawo afia ame aɖewo koŋ [Xlẽ ECC Blog le Nyaɖeɖefia Tiatia ŋu](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). Le Zcash me la, adzɔnuwɔna siwo wokpɔ ta na ƒe nya ɣaɣlawo ɖea mɔ na ame ɖekaɖekawo be woatia nyatakaka siwo tso asitɔtrɔ aɖe koŋ me. Tsɔ kpe ɖe eŋu la, woate ŋu ana nukpɔkpɔ ƒe safui aɖe be wòaɖe asitsatsa siwo katã do ƒome kple adrɛs aɖe koŋ si wokpɔ ta na la afia. Nɔnɔme sia ɖea mɔ be woawɔ ɖe sewo dzi eye woate ŋu adzro wo me evɔ womagblẽ nu le kɔmpiutadziɖoɖoa ƒe adzamenyawo katã ŋu o. 

Togbɔ be Monero ƒe decoy algorithm (ring signature) kpena ɖe ameŋunyatakakawo nana ŋu hã la, menaa *tiatia* ɖeɖefia le mɔ ma ke nu o.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png" alt="" width="400" height="80"/>
</a>


2) **Nukpɔkpɔ si woate ŋu atia**: Zcash ɖea mɔ na ezãlawo be woatiae le asitsatsa siwo me kɔ (siwo menye ame ŋutɔ tɔ o) kple esiwo wokpɔ ta na (siwo menye ame ŋutɔ tɔ o) dome. Esia fia be Zcash naa mɔnukpɔkpɔ ezãlawo be woana woƒe ganyawo ŋuti nyatakakawo nanɔ ɣaɣla (woakpɔ wo ta) alo woana woadze le gaglãgbe eye woadze le dutoƒo abe blockchain bubu akpa gãtɔ ene abe alesi woɖe eme le [Zcash ƒe nyatakakadzraɖoƒe si dziɖuɖua da asi ɖo ene](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). Ameŋunyatakaka sia si wotia be yeawɔ la ɖea mɔ na asitɔtrɔ geɖe wu kple asitsatsa/habɔbɔ ƒe zazã ƒe nɔnɔme siwo sɔ, elabena asitsatsa aɖewo ate ŋu abia be ame ŋutɔ ƒe nyawo nanɔ ʋɛ wu hafi dukɔa nalé ŋku ɖe eŋu, evɔ bubuwo ya kpɔa viɖe tso ameŋunyatakaka siwo nyo wu me.


3) **Ŋkɔmaɖemaɖe ƒe Ðoɖo**: [Ŋkɔmaɖemaɖe ƒe ɖoɖo](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/) ƒe zero sidzedze shielded pools ƒo ƒu nye asitsatsa siwo katã *dzɔ kpɔ*. Esia lolo ŋutɔ wu kɔsɔkɔsɔ ƒe mɔnu bubu akpa gãtɔ hena asitsatsa ƒe kadodomanɔamesi gbɔ ɖoɖo. De dzesii: esia ku ɖe asitsatsa siwo le ta si wokpɔ ta na ɖeka me ko ŋu.

Ameflunu zazã dzia ŋkɔmaɖemaɖe ƒe ɖoɖoa ɖe edzi nyateƒe. Ke hã mɔnu sia nɔ te ɖe *nyateƒe* zãla siwo le network la dzi ƒe xexlẽme dzi bliboe. 

4) **No Trusted Setup**: Zcash ƒe Sprout & Sapling ɖoɖoa zã akɔntabubu si me ame geɖe le si woyɔna be "ɖoɖowɔwɔ ƒe kɔnu si dzi woka ɖo". NU5 ƒe dodoɖeŋgɔ nyitsɔ laa mehiã Kakaɖedzi aɖeke le zero sidzedze nutome ƒe ɖoɖoa ƒe blibonyenye ŋu o. [Xlẽ ECC Blog le NU5 dzi](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Nyatakakawo ƒe Adzamenyawo**: [zk-SNARK mɔ̃ɖaŋununya](https://wiki.zechub.xyz/zcash-technology) si wozãna le Zcash ƒe tadeaguƒe siwo wotsɔ akpoxɔnu wɔe me ɖea mɔ na dedienɔnɔ si dzi ɖe edzi ŋutɔ na ezãlawo. Metadata ƒe sisi le kɔsɔkɔsɔ dzi dzi ɖeɖe kpɔtɔ fia be ezãlawo le dedie tso futɔwo abe amesiwo ate ŋu anye kɔmpiutadzidzelawo alo dziɖuɖuha siwo tea ame ɖe anyi ene gbɔ. 

Nudzɔdzɔ geɖewo li siwo me wode dzesi nudzodzoewo le Monero ƒe decoy selection algorithm me. Ŋutete nɔ vodada siawo ŋu be woaɖe gazazã siwo zãlawo zãna afia le nyatakaka aɖe si tso [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero). 


Kpuie ko la, nusi le vevie wu ŋutɔŋutɔe nye be woaɖe zãlawo ƒe nyatakakawo kple nyatakakawo ƒe dodo dzi akpɔtɔ alo aɖe wo ɖa abe alesi Zooko ɖe eme le [Orchid (priv8) AMA ƒe live session me ene](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png" alt="" width="400" height="200"/>
</a>


____

***Nufiame ƒe Kadodowo***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/



