# Ìtọ́sọ́nà Ìwakùsà Zcash: Dídarapọ̀ mọ́ Adágún Ìwakùsà pẹ̀lú Ohun Èlò Tí A Fi Ń Ṣe Ara Ẹni

## Ifihan

Zcash (ZEC) jẹ́ ètò ìpamọ́ tí ó ní ìpamọ́ tí ó ń lo ìlànà ìṣàfihàn iṣẹ́ Equihash fún iwakusa. Wíwa Zcash níí ṣe pẹ̀lú lílo agbára ìṣirò láti yanjú àwọn ìṣòro ìṣirò dídíjú, fífàṣẹ sí àwọn ìṣòwò, àti dídáàbò bo nẹ́tíwọ́ọ̀kì ní pàṣípààrọ̀ fún àwọn èrè ZEC. Nítorí ìṣòro gíga ti nẹ́tíwọ́ọ̀kì náà, a kò gbani nímọ̀ràn iwakusa nìkan fún ọ̀pọ̀lọpọ̀ àwọn olùlò. Dídapọ̀ mọ́ adágún iwakusa ni ọ̀nà tí ó dára jùlọ láti jèrè èrè déédé nípa sísopọ̀ agbára hash rẹ pọ̀ mọ́ àwọn ẹlòmíràn.

Ìtọ́sọ́nà yìí dojúkọ wíwá Zcash nípa lílo ohun èlò ìṣiṣẹ́ ara ẹni (fún àpẹẹrẹ, kọ̀ǹpútà ilé pẹ̀lú GPU tàbí ASICs ìpele ìpele). Ṣàkíyèsí pé bó tilẹ̀ jẹ́ pé GPU ṣì lè wa Zcash, ASICs ṣì ń ṣiṣẹ́ dáadáa jù àti èrè ní ọdún 2026 nítorí ìṣòro nẹ́tíwọ́ọ̀kì. Máa ṣàyẹ̀wò èrè lọ́wọ́lọ́wọ́ nípa lílo àwọn irinṣẹ́ bíi WhatToMine.com, nítorí pé àwọn nǹkan bíi owó iná mànàmáná, iye owó ohun èlò, àti iye ZEC ní ipa lórí bí ó ṣe lè ṣeé ṣe. Wíwá lè má jẹ́ èrè fún gbogbo ènìyàn; ṣe ìwádìí lórí àwọn òfin àdúgbò àti ìwọ̀n agbára (fojúsùn fún < $0.08/kWh).


## Awọn ibeere

### Hardware
- **Iwakusa GPU (Iṣeto ti ara ẹni ti a ṣeduro fun awọn olubere):**
  - NVIDIA tabi AMD GPUs pẹlu o kere ju 4GB VRAM (fun apẹẹrẹ, NVIDIA GTX 1070, RTX 3060; AMD RX 580 tabi dara julọ).
  - Modabọọdu ti o baamu, PSU to (o kere ju 750W fun ọpọlọpọ awọn GPU), ati itutu ti o dara lati dena ilora pupọju.
  - Àwọn ẹ̀rọ ìṣiṣẹ́ oní-GPU púpọ̀ wọ́pọ̀ fún àwọn ìwọ̀n hash tó dára jù (fún àpẹẹrẹ, 6x GPUs lè ṣe àṣeyọrí 1-2 kSol/s).
- **Iwakusa ASIC (O munadoko diẹ sii ṣugbọn o ni iye owo giga):**
  - Àwọn ASIC tí ó bá Equihash mu bíi Bitmain Antminer Z15 (420 kSol/s) tàbí Innosilicon A9 (50 kSol/s).
  - Àwọn wọ̀nyí máa ń pariwo, wọ́n máa ń gbóná sí i, wọ́n sì máa ń lo agbára púpọ̀ sí i (fún àpẹẹrẹ, 1500W+); ó yẹ fún àwọn ibi tí a yà sọ́tọ̀. Ra láti ọ̀dọ̀ àwọn orísun tó ní orúkọ rere bíi Bitmain.com tàbí àwọn olùtajà (Blockware Mining).
- **Gbogbogbo:** Intanẹẹti to duro ṣinṣin, kọmputa fun eto/abojuto. Awọn ASICs ni o bori nẹtiwọọki naa (~13 GSol/s lapapọ hashrate ni ọdun 2026), eyi ti o mu ki iwakusa GPU dinku idije ṣugbọn o tun ṣee ṣe fun awọn ololufẹ.

### Sọfitiwia
- **Ẹ̀rọ Ìṣiṣẹ́:** Windows 10/11, Linux (Ubuntu ni a ṣeduro fun iduroṣinṣin).
- **Sọ́fítíwọ́ọ̀tì Ìwakùsà:**
  - Fún àwọn GPU: lolMiner (ó ń ṣe àtìlẹ́yìn fún AMD/NVIDIA), GMiner, tàbí miniZ (tí a fojú sí NVIDIA). Ṣe ìgbàsílẹ̀ láti ibi ìpamọ́ GitHub (fún àpẹẹrẹ, github.com/Lolliedieb/lolMiner-releases).
  - Fún àwọn ASICs: Lo firmware/dashboard tí a ṣe sínú rẹ̀ (fún àpẹẹrẹ, ojú-ọ̀nà wẹ́ẹ̀bù Bitmain).
- Àpò owó **Àpò owó:** Àpò owó Zcash kan láti gba owó tí a san. Àmọ̀ràn:
  - Ààbò (ìkọ̀kọ̀): Àpò ìpamọ́ ZODL, Zingo (Fóònù alágbéká/Ojú-iṣẹ́), Zkool (fóònù alágbéká/ojú-iṣẹ́).
  - Àṣírí (ó rọrùn ṣùgbọ́n kò fi bẹ́ẹ̀ jẹ́ ti àdáni): Edge Wallet, Zecwallet Lite.
  - Ṣe igbasilẹ lati [àwọn àpò owó](https://zechub.wiki/wallets). Ṣẹ̀dá àdírẹ́sì ààbò kan (bẹ̀rẹ̀ pẹ̀lú 'zs') fún ìpamọ́ tí adágún náà bá gbà á.

### Òmíràn
- Ina mọnamọna: Ṣírò iye owo. Awọn GPU nlo 150-300W fun kaadi kan; awọn ASICs 1000W+.
- Àrùn Àrùn: Má ṣe dáwọ́ dúró nígbà tí a bá ń ṣètò rẹ̀ nítorí ó lè fi àwọn awakùsà hàn gẹ́gẹ́ bí ewu.

## Ìtọ́sọ́nà Ìgbésẹ̀-ní-Ìgbésẹ̀ sí Dídárapọ̀ mọ́ Adágún Ìwakùsà kan

### Igbesẹ 1: Ṣeto Apamọwọ Zcash Rẹ
1. Gba lati ayelujara ati fi apamọwọ kan sori ẹrọ lati oju opo wẹẹbu Zcash osise [àwọn àpò owó](https://zechub.wiki/wallets).
2. Ṣẹ̀dá àpò owó tuntun kan kí o sì fi àpò owó rẹ sípò ní ààbò.
3. Ṣẹ̀dá àdírẹ́sì ìgbàwọlé (ó dára kí a dáàbò bò ó fún ìpamọ́). Ṣàkíyèsí rẹ̀, fún àpẹẹrẹ, `zs1exampleaddress...`.
4. Tí o bá ń lo àdírẹ́sì tó ṣe kedere (tí ó bẹ̀rẹ̀ pẹ̀lú 't'), ó rọrùn jù ṣùgbọ́n kò ní ìpamọ́ púpọ̀.

### Igbesẹ 2: Mura Ohun elo Rẹ silẹ
- Fún àwọn GPU:
  1. Fi awọn GPU sori ẹrọ ninu PC rẹ ki o si mu awọn awakọ imudojuiwọn (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Overclock tí ó bá ní ìrírí (lo MSI Afterburner fún ìdúróṣinṣin; fojúsùn fún +100-200 mojuto aago, -500 ìrántí fún ìṣiṣẹ́).
- Fún àwọn ASIC:
  1. So ASIC pọ mọ agbara ati Ethernet.
  2. Wa adiresi IP rẹ nipa lilo irinṣẹ bii Advanced IP Scanner tabi app olupese.
  3. Wọlé sí ojú-ọ̀nà wẹ́ẹ̀bù (fún àpẹẹrẹ, tẹ IP sínú ẹ̀rọ aṣàwárí, ìwọlé àìyípadà: root/root fún Bitmain).

**Ìkìlọ̀:** Rí i dájú pé afẹ́fẹ́ ń yọ́ dáadáa; ìwakùsà ń mú ooru jáde. Bẹ̀rẹ̀ díẹ̀ láti dán an wò.

### Igbese 3: Yan ki o si darapọ mọ Adagun Iwakusa kan
Àwọn adágún iwakusa máa ń pín iṣẹ́, wọ́n sì máa ń pín èrè nípa lílo hashrate tí o fi kún un. Yan ní ìbámu pẹ̀lú owó tí a gbà (0-2%), iye owó tí ó kéré jù (0.01-0.1 ZEC), ibi tí a wà (ping tí ó kéré), àti ìgbẹ́kẹ̀lé.

**Awọn Adagun ti a ṣeduro (Da lori Hashrate, Awọn idiyele, ati Awọn Atunyẹwo):**
- **2Miners (zec.2miners.com)**: Owó 1%, ìsanwó PPLNS, ń ṣe àtìlẹ́yìn fún GPU/ASIC/NiceHash. Hashrate gíga (~1.17 GSol/s), àwọn olupin tí ó ṣeé gbẹ́kẹ̀lé.
- **F2Pool (zec.f2pool.com)**: Owó 2%, PPS+ ìsanwó, àtìlẹ́yìn owó púpọ̀. Adágún ńlá (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 2% owo (PPS+), dasibodu ti o rọrun lati lo, awọn olupin agbaye.
- **AntPool (zec.antpool.com)**: 1% owó, láti Bitmain, ó dára fún ASICs (~494 MSol/s).
- **Adágún Zcash Foundry (foundrydigital.com/foundry-zcash-pool/)**: Adágún iwakusa Zcash ọ̀jọ̀gbọ́n láti ọwọ́ Foundry Digital. Ó ń lo àwọn ìsanwó PPLNS, ó ń fúnni ní ìtọ́pinpin èrè tí ó ṣe kedere àti ìtìlẹ́yìn ìpele ilé-iṣẹ́. Ó dára jùlọ fún àwọn awakùsa ASIC tí wọ́n wà ní ilé-iṣẹ́ àti àwọn tí wọ́n ń ṣe iṣẹ́ ńlá; ó nílò ìfìdíkalẹ̀ àkọọ́lẹ̀.
- **Sovright (mining.sovright.com)**: Adagun Zcash kan tí a kọ́ sórí Stratum V2, tí ó ń ṣiṣẹ́ gẹ́gẹ́ bí ẹ̀rọ ìdánwò gbogbogbòò lọ́wọ́lọ́wọ́. Kò sí ìsanwó ZEC lásìkò yìí, nítorí náà, ṣe é gẹ́gẹ́ bí ọ̀nà láti dán ètò rẹ wò dípò orísun owó tí ó ń wọlé. Wo apá tí a yà sọ́tọ̀ ní ìsàlẹ̀ fún àwọn ẹ̀kúnrẹ́rẹ́ àlàyé.
- Àwọn mìíràn: Kryptex Pool, Luxor (ṣàyẹ̀wò poolwatch.io/coin/zcash fún àwọn ìṣirò àkókò gidi).

1. Ṣèbẹ̀wò sí ojú-òpó wẹ́ẹ̀bù adágún náà kí o sì ṣẹ̀dá àkọọ́lẹ̀ kan (ìmeeli tàbí ìforúkọsílẹ̀ fún àwọn kan bíi 2Miners kò gbọdọ̀ sí).
2. Fi àdírẹ́sì àpò Zcash rẹ kún àwọn ètò fún ìsanwó.
3. Ṣàkíyèsí olupin stratum ti adagun-odo naa (fun apẹẹrẹ, zec.2miners.com:1010) ati ibudo.

### Igbesẹ 4: Fi sori ẹrọ ati tunto Sọfitiwia Iwakusa
- Fún àwọn GPU (Àpẹẹrẹ: lolMiner lórí Windows/Linux):
  1. Ṣe igbasilẹ lolMiner lati GitHub (ẹya tuntun, fun apẹẹrẹ, 1.88).
  2. Yọ jade si folda kan.
  3. Ṣẹ̀dá fáìlì ìpele kan (start.bat) pẹ̀lú ìṣètò:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Rọpo `YOUR_WALLET_ADDRESS` pẹlu adirẹsi ZEC rẹ.
     - `WORKER_NAME`: Orúkọ fún ẹ̀rọ rẹ (fún àpẹẹrẹ, Rig1).
     - Fún àwọn olupin EU: eu.zec.2miners.com:1010.
  4. Ṣíṣe fáìlì ìpele náà. Yóò so mọ́ adágún náà, yóò sì bẹ̀rẹ̀ sí í wakùsà.
- Fún àwọn ASIC (Àpẹẹrẹ: Bitmain Antminer):
  1. Wọlé sínú ojú-òpó wẹ́ẹ̀bù.
  2. Lọ sí Ìṣètò Miner.
  3. Fi awọn alaye adagun-odo kun:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Orúkọ orúkọ: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Ọ̀rọ̀ìpamọ́: x (tàbí òfo).
  4. Fipamọ ki o tun bẹrẹ ẹrọ iwakusa naa.
- Fun awọn sọfitiwia miiran (fun apẹẹrẹ, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Idanwo:** Ṣiṣẹ fun iṣẹju 10-15; ṣayẹwo console fun awọn ipin ti a gba ati hashrate.

### Igbesẹ 5: Bẹrẹ iwakusa ati Abojuto
1. Ṣíṣẹ́ olùdarí náà: yóò so mọ́ adágún náà, yóò sì bẹ̀rẹ̀ sí í fi àwọn ìpín sílẹ̀.
2. Atẹle nipasẹ:
   - Dásíbọ́ọ̀dù adágún omi: Tẹ àdírẹ́sì àpò owó rẹ láti rí hashrate, ìwọ́ntúnwọ̀nsì tí a kò san, àti àwọn ìṣirò.
   - Sọ́fítíwọ́ọ̀tì kọ́ńsófì: Ṣọ́ra fún àṣìṣe, iwọ̀n otútù (pa < 80 degrees C).
   - Àwọn irinṣẹ́: Lo HiveOS tàbí SimpleMining OS fún ìṣàkóso àwọn ohun èlò ìṣiṣẹ́ láti ọ̀nà jíjìn.
3. Àwọn ìsanwó: Ọ̀pọ̀lọpọ̀ àwọn adágún omi máa ń sanwó láìfọwọ́sí nígbà tí o bá dé ìwọ̀n tó kéré jùlọ (fún àpẹẹrẹ, 0.05 ZEC). Ṣàyẹ̀wò àwọn òfin adágún omi.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Adágún Testnet àti Nẹ́tíwọ́ọ̀kì Relay

Sovright (sovright.com) n ṣiṣẹ adagun iwakusa Stratum V2 ati nẹtiwọọki relay bulọọki lọtọ. Wọn n ṣe awọn iṣẹ oriṣiriṣi, nitorinaa a bo wọn lọtọ ni isalẹ.

### Adágún Ìwakùsà (mining.sovright.com)

Adagun omi Sovright's n ṣiṣẹ lori Zcash testnet gbogbogbo (NU6, Stratum V2), kii ṣe mainnet. Testnet ko sanwo ZEC. Lo o lati ṣe idanwo iṣeto iwakusa rẹ, kii ṣe lati jo'gun.

- Kò sí àkọọ́lẹ̀ tó nílò láti bẹ̀rẹ̀. Tọ́ka sí CPU tàbí ASIC Equihash miner sí adágún náà, àwọn ìpín rẹ yóò sì hàn lórí dashboard aláàyè.
- Sovright tun ṣe atẹjade aṣoju Stratum V2 ti o ṣii fun awọn awakusa ti o fẹ lati yan awọn awoṣe bulọọki tiwọn dipo ki wọn kan gba iṣẹ adagun-odo naa:

### Abojuto Foundry Zcash Adagun

Fún àwọn olùlò Foundry Zcash Pool:

- Ṣe àkíyèsí iṣẹ́ àwọn awakùsà nípasẹ̀ dasibodu adágún Foundry.
- Ṣàyẹ̀wò:
  - Àwọn òṣìṣẹ́ tó ń ṣiṣẹ́
  - Hashrate tí a ròyìn
  - Àwọn ìpín tí a gbà
  - Àwọn èrè tí a ṣírò
  - Ipò ìsanwó

Nítorí pé Foundry ń lo àpẹẹrẹ ẹ̀bùn PPLNS, àwọn èrè ìwakùsà sinmi lórí àwọn ìpín tí a ti fi kún èrè adágún náà dípò hashrate lẹ́sẹ̀kẹsẹ̀ nìkan.

Àwọn ìlànà ìtọ́jú tí a gbaniníyànjú:
- Ṣe afiwe hashrate dashboard ASIC pẹlu hashrate ti Foundry royin.
- Ṣe ìwádìí lórí àwọn ìpín tí a kọ̀ sílẹ̀, àwọn ìpín tí ó ti pẹ́, tàbí àìdúróṣinṣin ìsopọ̀.
- Ṣetọju isopọ nẹtiwọọki ti o duro ṣinṣin nitori akoko isinmi dinku awọn ipin ti a fi silẹ ati awọn ere ti o ṣeeṣe.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Tọ́ka sí olùwakùsà rẹ sí ibi ìṣàfihàn dípò adágún náà tààrà:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  lilo orukọ oṣiṣẹ bii `yourname.rig1`.
- Ojú ìwé ìṣípayá Sovright's sọ ìlànà "fi gbogbo nǹkan kún" fún àwọn ìṣòwò tí a dáàbò bò, láìdàbí àwọn adágún kan tí ó ń yọ wọ́n kúrò. Búlọ́ọ̀kì kọ̀ọ̀kan gba ẹ̀rí tí a fọwọ́ sí kí a lè ṣàyẹ̀wò ìlànà náà fúnra rẹ̀.
- Ṣẹ̀dá àkọọ́lẹ̀ kan ní mining.sovright.com (Google tàbí fi ìmeeli wọlé) láti tọ́pasẹ̀ àwọn òṣìṣẹ́ rẹ dípò àpẹẹrẹ dátà dashboard.

### Nẹ́tíwọ́ọ̀kì Ìyípadà (relay.sovright.com)

Sovright lọtọ̀ọtọ̀ lo nẹ́tíwọ́ọ̀kì ìyípadà gbogbogbòò lórí Zcash mainnet. Nígbà tí adágún bá rí bọ́ọ̀lù kan, bí bọ́ọ̀lù náà ṣe yára dé ìyókù nẹ́tíwọ́ọ̀kì náà ló ń pinnu ìgbà tí ó máa di aláìníbaba, èyí túmọ̀ sí wípé ó máa pàdánù ìdíje ìdàgbàsókè àti èrè fún un tí a ó fi pàdánù. Ìyípadà síwájú ń dí àwọn agbègbè mẹ́rin lọ́wọ́ nípa lílo ìyípadà bọ́ọ̀lù kékeré pẹ̀lú àtúnṣe àṣìṣe síwájú.

Dásíbọ̀ọ̀dù gbogbogbòò fi ipa rẹ̀ hàn ní tààràtà: àwọn agbègbè tí a so pọ̀ mọ́ relay rí àwọn bulọọki tuntun ní ìdajì àkókò tí ọ̀rọ̀ àfojúsùn alátakò kan-sí-ọ̀kan ń gbà, àti dásíbọ̀ọ̀dù náà ń tọ́pasẹ̀ iye àwọn ọmọ aláìníbaba tí ń bẹ ní nẹ́tíwọ́ọ̀kì náà.

Èyí jẹ́ ètò ìṣiṣẹ́ fún àwọn olùṣiṣẹ́ adágún omi, kìí ṣe fún àwọn awakùsà kọ̀ọ̀kan. Orísun ìta gbangba Sovright's `mining-infra` awọn iwe ipamọ a `submitblock` ẹnu ọ̀nà ìgbékalẹ̀ fún fífẹ́ẹ́rẹ́ rí àwọn bulọ́ọ̀kì sínú àwọ̀n náà kíákíá ju P2P ìbílẹ̀ lọ. Láti sopọ̀ mọ́ra, kan sí Sovright tààrà (support@sovright.com) fún àwọn àdírẹ́sì ẹgbẹ́ ìgbékalẹ̀ àti kọ́kọ́rọ́ àṣẹ.


## Iwakusa lodi si node Zebra tirẹ

Gbogbo ohun tí ó wà lókè yìí tọ́ka sí awakùsà rẹ sí adágún ẹlòmíràn. Ọ̀nà kejì ni láti ṣiṣẹ́ nódù kan fúnra rẹ kí o sì jẹ́ kí sọ́fítíwọ́ọ̀kì iwakùsà rẹ béèrè fún iṣẹ́. Níwọ́n ìgbà tí zcashd ti dáwọ́ dúró ní ọjọ́ kejìdínlógún oṣù keje ọdún 2026, ìyẹn túmọ̀ sí pé [Zebra](/zcash-tech/zebra-full-node), nódù náà ni apá yìí bo.

Apá Zebra's kéré, ó sì ṣe pàtó: ó ń kọ́ àwọn àwòṣe block, ó sì ń gba àwọn block tí a ti yanjú lórí ìsopọ̀ RPC rẹ̀. Softwarẹ iwakusa ni a ń ṣe hashing náà, àti pínpín èrè láàrín ọ̀pọ̀lọpọ̀ àwọn awakusa jẹ́ iṣẹ́ pool softwarẹ. Yálà iwakusa nìkan rí block kan sinmi lórí ìpín rẹ nínú iye hash ti nẹ́tíwọ́ọ̀kì náà, èyí tí apá yìí kò gbìyànjú láti ṣe àyẹ̀wò rẹ̀. Ìdí nìyí tí ìfihàn sí ojú ìwé yìí kò fi dámọ̀ràn iwakusa nìkan fún ọ̀pọ̀lọpọ̀ àwọn olùlò.

Àwọn ìgbésẹ̀ náà tẹ̀lé ojú ìwé Zebra Book méjì, [Iwakusa Zcash pẹlu Zebra](https://zebra.zfnd.org/user/mining.html) àti [Iwakusa pẹlu Zebra ni Docker](https://zebra.zfnd.org/user/mining-docker.html), gẹ́gẹ́ bí wọ́n ṣe dúró ní ọjọ́ kẹjọ oṣù kẹwàá ọdún 2026. Àwọn orúkọ pàtàkì àti àìṣeéyípadà máa ń yípadà láàárín àwọn ìtẹ̀jáde, nítorí náà ṣàyẹ̀wò ìwé náà kí o tó gbẹ́kẹ̀lé ọ̀kan.

### Ṣètò àdírẹ́sì tí ó gba ẹ̀bùn náà

Ṣẹda faili atunto pẹlu awọn eto aiyipada, lẹhinna ṣatunkọ rẹ:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

A nilo adirẹsi oluwakusa ([Ìwé: Àdírẹ́sì awakùsà](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra gba àdírẹ́sì P2PKH tàbí P2SH tí ó ṣe kedere, àdírẹ́sì Sapling, tàbí Unified Address. Fún Unified Address tí ó ní ju olùgbà kan lọ, Ìwé náà sọ pé Zebra san owó olùgbà kan ṣoṣo, “ó fẹ́ràn Orchard, lẹ́yìn náà Sapling, lẹ́yìn náà ó ṣe kedere”.

Awọn bọtini aṣayan meji lọ sinu kanna `[mining]` apakan:

| Kọ́kọ́rọ́ | Ohun tí ó ṣe | Ààlà |
|---|---|---|
| `extra_coinbase_data` | Ó ń fi àmì gbogbogbò, bíi orúkọ adágún, kún ìtẹ̀sí owó coinbase ti gbogbo búlọ́ọ̀kì tí o bá ń wa, lẹ́yìn àmì Zebra's fúnra rẹ̀ ([Ṣe ìwé](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 baiti. Lókè èyí, "Zebra kọ̀ láti bẹ̀rẹ̀" |
| `miner_memo` | Ó so àkọsílẹ̀ ààbò mọ́ èrè tí a rí `extra_coinbase_data` kìí ṣe gbogbo ènìyàn: ẹni tí ó ní kọ́kọ́rọ́ ìwoye fún àdírẹ́sì ìgbàwọlé nìkan ni ó lè kà á ([Ṣe ìwé](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 baiti. Ó máa ń ṣiṣẹ́ nígbà tí èrè náà bá lọ sí ọ̀dọ̀ olùgbà tí a dáàbò bò. Pẹ̀lú àdírẹ́sì tí ó ṣe kedere, "kò ní ipa kankan ní ìdákẹ́jẹ́ẹ́" |

### Ṣii ibudo RPC

Sọ́fítíwọ́ọ̀tì iwakusa ń bá Zebra sọ̀rọ̀ nípa JSON-RPC, èyí tí kò ní sí níbẹ̀ títí tí o fi fún un ní àdírẹ́sì láti gbọ́ lórí ([Ìwé: Apá RPC](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 ni ibudo RPC boṣewa lori Mainnet. `127.0.0.1` n jẹ ki ibudo naa le de ọdọ lati inu ẹrọ kanna nikan.

Nítorí pé Zebra 2.0.0 kúkì kan ń dáàbò bo ibudo RPC, ọ̀nà kan tí ó jọ èyí zcashd lò. Zebra máa ń kọ kúkì náà nígbà tí RPC bá bẹ̀rẹ̀ sí í parí, ó sì máa ń pa á rẹ́ nígbà tí wọ́n bá ti ń pa á. Fún àpẹẹrẹ, fáìlì náà wà nínú àkójọ ìpamọ́ Zebra's, `/home/user/.cache/zebra/.cookie` lórí Linux, ó sì ní ìlà kan:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` gbe faili naa. `rpc.enable_cookie_auth = false` pa àyẹ̀wò náà, pẹ̀lú rẹ̀ ni ìjẹ́rìísí kan ṣoṣo tí ibudo RPC ní: ohunkóhun tí ó bá lè dé ibudo náà lè pè é.

### Bẹ̀rẹ̀ Zebra kí o sì jẹ́ kí ó ṣiṣẹ́pọ̀

```bash
zebrad
```

Zebra n ka iṣeto naa lati ipo aiyipada `-c /path/to/zebrad.toml` láti lo fáìlì mìíràn. Dúró fún ìṣiṣẹ́pọ̀ náà láti parí. Àkọsílẹ̀ náà fihàn `sync_percent=100.000%` nígbà tí ó bá ní ([Ìwé: Àwọn abilà tí ń sáré](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Kún Node Àmì Zebra](/zcash-tech/zebra-full-node) bo aaye hardware ati disk.

### Ṣe àyẹ̀wò rẹ̀ pẹ̀lú getblocktemplate

`getblocktemplate` Ǹjẹ́ ìpè tí sọ́fítíwè ìwakùsà ń ṣe láti gba iṣẹ́ ni, nítorí náà ó tún jẹ́ ìdánwò tó yára jùlọ ([Ìwé: Idanwo iṣeto naa](https://zebra.zfnd.org/user/mining.html#testing-the-setup)) Fi àwọn àkóónú fáìlì kúkì rẹ sí ipò `__cookie__:PASSWORD`:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Eto iṣiṣẹ kan n pada a `result` tako àwọn oko tí awakùsà kan nílò, lára wọn `previousblockhash`, `coinbasetxn`, `target` àti `height`Tí o bá ṣètò `extra_coinbase_data`Ìwé náà ṣàlàyé bí a ṣe lè rí àmì rẹ nínú rẹ̀ `coinbasetxn.data`.

### Tọ́ka sí sọ́fítíwọ́ọ̀kì iwakusa rẹ sí i

Fun software iwakusa tabi adagun-odo rẹ ni opin RPC, `127.0.0.1:8232`, àti orúkọ olùlò àti ọ̀rọ̀ìpamọ́ láti inú kúkì náà. Ìwé náà sọ pé Zebra "ń ṣe àtìlẹ́yìn fún àwọn ọ̀nà RPC tí a nílò láti ṣiṣẹ́ ọ̀pọ̀lọpọ̀ sọ́fítíwọ́ọ̀dù adágún iwakusa" ([Ìwé: Ṣíṣe adágún iwakusa kan](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Àkọsílẹ̀ méjì láti inú Ìwé náà kí o tó yan software:

- **s-nomp wà fún ìdánwò nìkan.** Ìwé náà pe ètò s-nomp rẹ̀ ní "àyẹ̀wò" ó sì sọ pé s-nomp "kò bá NU5, nítorí náà àwọn iṣẹ́ iwakusa kan ti di aláìlera" [Ìtọ́sọ́nà àwọ̀n ìdánwò](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) fi kún un pé s-nomp "kò tíì ṣe àtúnṣe ní ìfọwọ́sowọ́pọ̀ fún àwọn àtúnṣe nẹ́tíwọ́ọ̀kì NU5 tàbí àwọn àtúnṣe tó tẹ̀lé e" ó sì tọ́ka sí àwọn awakùsà iṣẹ́-ṣíṣe láti kó àwọn sọ́fítíwọ́ọ̀kì tó ń ṣe àtìlẹ́yìn fún àwọn àtúnṣe tó wà lọ́wọ́lọ́wọ́.
- **Zebra n fi àkójọpọ̀ tí a ti ṣe tán ránṣẹ́.** Ibi ìpamọ́ Zebra ní ètò Docker Compose nínú [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) èyí tí ó bẹ̀rẹ̀ Zebra pẹ̀lú adágún iwakusa kan, tí o bá sì béèrè fún un, adágún CPU kan. Adágún inú rẹ̀ jẹ́ s-nomp ó sì bẹ̀rẹ̀ lórí Testnet àyàfi tí o bá yí i padà, nítorí náà, ṣe é gẹ́gẹ́ bí ọ̀nà láti kọ́ àwọn ẹ̀yà tí ń gbéra.

### Ọ̀nà Docker

Ọ̀nà tó kúrú jùlọ nínú ìwé ni `zfnd/zebra` Àwòrán Docker, pẹ̀lú àdírẹ́sì àti ibùdó RPC tí a gbé kalẹ̀ gẹ́gẹ́ bí àwọn oníyípadà àyíká ([Ìwé: Iwakusa pẹ̀lú Zebra ní Docker](https://zebra.zfnd.org/user/mining-docker.html)Àṣẹ tó wà ní ìsàlẹ̀ yìí jẹ́ ti Ìwé pẹ̀lú àyípadà kan: ó ń tẹ ibudo RPC jáde lórí àdírẹ́sì loopback ti olùgbàlejò nìkan, kí àwọn ẹ̀rọ míràn má baà lè dé ibẹ̀.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Èyí máa ń bẹ̀rẹ̀ Mainnet node, ó máa ń tẹ ibudo P2P (8233) jáde lórí olùgbàlejò Docker, ó sì máa ń jẹ́ kí ibudo RPC (8232) ṣeé dé ọ̀dọ̀ olùgbàlejò fúnra rẹ̀ nìkan. Tẹ̀ kúkì náà pẹ̀lú:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Pa mọ́ `0.0.0.0` in `ZEBRA_RPC__LISTEN_ADDR`.** Àdírẹ́sì tí Zebra ń gbọ́ nínú àpótí náà nìyẹn. Docker ń fi ibùdó tí a tẹ̀ jáde sí ojú ọ̀nà ìsopọ̀ nẹ́tíwọ́ọ̀kì àpótí náà, nítorí náà Zebra ń gbọ́ lórí rẹ̀ `127.0.0.1` inú àpótí náà kò ní gba ìsopọ̀ náà, kódà láti ọ̀dọ̀ olùgbàlejò náà `127.0.0.1:` niwaju ti `-p` ni ohun ti o n da ibudo duro kuro ni nẹtiwọọki.
- **Àṣẹ Ìwé** ń tẹ̀síwájú ibudo RPC pẹ̀lú `-p 8232:8232`, èyí tí ó ṣí i lórí gbogbo ìsopọ̀ nẹ́tíwọ́ọ̀kì ti olùgbàlejò náà.
- **To practise on Testnet**, add `-e ZEBRA_NETWORK__NETWORK="Testnet"`, set `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, publish `-p 18233:18233` and `-p 127.0.0.1:18232:18232`, and give a Testnet address. A Mainnet address stops Zebra from starting on Testnet, and the other way round.

Sanwó fún àwọn awakùsà àti bí a ṣe ń tọ́jú àpò owó náà wà níta apá yìí. Fún apá àpò owó náà, wo [Zallet](/zcash-tech/zallet).

## Àwọn ìmọ̀ràn àti àwọn ìlànà tó dára jùlọ
- **Èrè:** Lo àwọn ẹ̀rọ ìṣirò bíi whattomine.com/coins/166-zec-equihash. Àpẹẹrẹ: RTX 3060 (~300 Sol/s) kan ń gba ~0.001 ZEC/day ní $50/ZEC, tí a kò fi mọ iná mànàmáná ~0.50.
- **Ìpamọ́:** Lo àwọn adágún tí a dáàbò bò tí ó bá wà; yẹra fún àtúnlo àwọn àdírẹ́sì.
- **Ààbò:** Lo àwọn ọ̀rọ̀ ìpamọ́ tó lágbára; mú kí 2FA ṣiṣẹ́ lórí àwọn adágún/àpò owó. Má ṣe pín àwọn kọ́kọ́rọ́ ìkọ̀kọ̀ láé.
- **Ṣíṣe àtúnṣe ìṣòro:** Tí kò bá sí ìpínkiri, ṣàyẹ̀wò firewall, antivirus, tàbí ìṣètò tí kò tọ́. Dára pọ̀ mọ́ àwọn ìgbìmọ̀ bíi forum.zcashcommunity.com tàbí Reddit r/zec.
- **Àwọn Àǹfààní mìíràn:** Tí kò bá jẹ́ èrè, ronú nípa wíwakùsà ìkùukùu tàbí fífi àwọn owó mìíràn sí orí ìkànnì.
- **Àkíyèsí Àyíká:** Iwakusa máa ń lo agbára; lo àwọn orísun tí a lè tún ṣe tí ó bá ṣeé ṣe.
- **Àwọn àtúnṣe:** Zcash lè yípadà (fún àpẹẹrẹ, ìyípadà PoS tó ṣeé ṣe); ṣàyẹ̀wò z.cash fún ìròyìn.
