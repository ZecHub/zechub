# Itọsọna iwakusa Zcash: Darapọ mọ adagun iwakusa pẹlu ohun elo ara ẹni

## Ìfilọ́lẹ̀

Zcash (ZEC) is a privacy-focused cryptocurrency that uses the Equihash proof-of-work algorithm for mining. Mining Zcash involves using computational power to solve complex mathematical problems, validating transactions, and securing the network in exchange for ZEC rewards. Due to the network's high difficulty, solo mining is not recommended for most users. Joining a mining pool is the best way to earn consistent rewards by combining your hash power with others.

This guide focuses on mining Zcash using personal hardware (e.g., a home PC with GPUs or entry-level ASICs). Note that while GPUs can still mine Zcash, ASICs are far more efficient and profitable in 2026 due to network difficulty. Always check current profitability using tools like WhatToMine.com, as factors like electricity costs, hardware prices, and ZEC value affect viability. Mining may not be profitable for everyone; research local regulations and energy rates (aim for < $0.08/kWh).


## Àwọn ohun tí a béèrè

### Àwọn ohun èlò
- **GPU Mining (Personal Setup ti a ṣe iṣeduro fun awọn olubere):**
  - NVIDIA tabi AMD GPUs pẹlu o kere ju 4GB VRAM (e.g., Nvidia GTX 1070, RTX 3060; AMD RX 580 tabi dara julọ).
  - A compatible motherboard, sufficient PSU (at least 750W for multiple GPUs), and good cooling to prevent overheating.
  - Awọn iru ẹrọ pupọ-GPU jẹ wọpọ fun awọn oṣuwọn hash ti o dara julọ (fun apẹẹrẹ, awọn GPU 6x le ṣaṣeyọri 1-2 kSol / s).
- **Iṣẹ́-ìwakùsà ASIC (Iṣẹ́ tó dára jùlọ ṣùgbọ́n Iye owó tó ga jùlọ):**
  - Awọn ASIC ti o ni ibamu pẹlu Equihash bii Bitmain Antminer Z15 (420 kSol / s) tabi Innosilicon A9 (50 kSul / s).
  - These are louder, hotter, and consume more power (e.g., 1500W+); suitable for dedicated spaces. Buy from reputable sources like Bitmain.com or resellers (Blockware Mining).
- **Gbogbogbo:** Ayika intanẹẹti, kọnputa fun iṣeto / ibojuwo. ASICs jẹ gaba lori nẹtiwọọki (~ 13 GSol / s lapapọ hashrate ni 2026), ṣiṣe iwakusa GPU kere si ifigagbaga ṣugbọn tun ṣee ṣe fun awọn onijakidijagan.

### Ẹrọ-ìmọ̀
- **Operating System:** Windows 10/11, Linux (Ubuntu ti a ṣe iṣeduro fun iduroṣinṣin).
- ** Ètò Ìwakùsà:**
  - Fun awọn GPU: lolMiner (o ṣe atilẹyin AMD/NVIDIA), GMiner, tabi miniZ (ti o ni idojukọ NVIDIA). Ṣe igbasilẹ lati awọn ibi ipamọ GitHub osise (fun apẹẹrẹ, github.com/Lolliedieb/lolMiner-releases).
  - Fun ASICs: Lo awọn olupese ti a ṣe sinu firmware / dasibodu (e.g., Bitmain ká ayelujara wiwo).
- **Wọ́ọ̀lì:** Wọ́ọ̀lì Zcash láti gba àwọn ìsanwó.
  - Ti a fi bo (ti ara ẹni): Zashi Wallet, Zingo (Mobile/Desktop) YWallet (mobile/desktop).
  - Aṣayan ti o ni imọlẹ (o rọrun ṣugbọn o kere si ikọkọ): Edge Wallet, Zecwallet Lite.
  - Ṣe igbasilẹ lati [awọn apamọwọ]](https://zechub.wiki/wallets). Ṣẹda adirẹsi ti o ni aabo (ti o bẹrẹ pẹlu 'zs') fun asiri ti o ba jẹ pe adagun ṣe atilẹyin fun u.

### Àwọn mìíràn
- Agbara: Ṣe iṣiro awọn idiyele. Awọn GPU lo 150-300W fun kaadi kan; ASICs 1000W+.
- Antivirus: Dínà rèé nígbà ìmúrasílẹ̀ nítorí ó lè fi àmì àwọn miners gẹ́gẹ́ bí ìhalẹ̀mọ́ni.

## Àwọn Ìtọ́ni Tó Wà Níbàámu Pẹ̀lú Ọ̀nà Tí Wọ́n Gbà Ń Ṣiṣẹ́ Ìwakùsà

### Ìgbésẹ̀ 1: Ṣeto Àpamọ́ Zcash Rẹ
1. Ṣe igbasilẹ ki o si fi apamọwọ sori ẹrọ lati oju opo wẹẹbu osise Zcash [awọn apamọwọ](https://zechub.wiki/wallets).
2. Ṣẹda apamọwọ tuntun ki o ṣe afẹyinti gbolohun ọrọ irugbin rẹ ni aabo.
3. Ṣẹda adirẹsi gbigba (ti o dara julọ ti o ni aabo fun asiri). `zs1exampleaddress...`.
4. If using a transparent address (starts with 't'), it's simpler but offers less privacy.

### Ìgbésẹ̀ Kejì: Múra Sílẹ̀ fún Iṣẹ́ Náà
- Fun awọn GPU:
  1. Fi GPUs sori PC rẹ ki o ṣe imudojuiwọn awọn awakọ (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Ifọwọsi ti o ba ni iriri (lo MSI Afterburner fun iduroṣinṣin; ṣe ifọkansi fun +100-200 aago ipilẹ, -500 iranti fun ṣiṣe).
- Fun awọn ASIC:
  1. So ASIC pọ̀ mọ́ agbára àti Ethernet.
  2. Wá adirẹsi IP rẹ nípa lílo ọ̀nà bíi Advanced IP Scanner tàbí ohun èlò tí olùṣèdá ṣe.
  3. Wiwọle si pẹpẹ oju-iwe ayelujara (fun apẹẹrẹ, tẹ IP sinu aṣàwákiri, iwọle aiyipada: root/root fun Bitmain).

**Ìkìlọ̀:** Rí i dájú pé ó ní afẹ́fẹ́ tó yẹ; ìwakùsà máa ń mú ooru jáde.

### Ìgbésẹ̀ Kẹta: Yan Àwùjọ Àwọn Tó Ń Ṣiṣẹ́ Ìwakùsà, Kó O sì Darapọ̀ Mọ́ Wọn
Awọn adagun iwakusa pin iṣẹ ati pin awọn ere ti o da lori hashrate ti o ṣe alabapin. Yan da lori awọn idiyele (0-2%), isanwo ti o kere ju (0.01-0.1 ZEC), ipo (ping kekere), ati igbẹkẹle.

**Awọn apoti ti a ṣe iṣeduro (Da lori Hashrate, Awọn idiyele, ati Awọn atunyẹwo):**
- **2Miners (zec.2miners.com) **: 1% owó, PPLNS ìsanwó, atilẹyin GPU/ASIC/NiceHash. High hashrate (~1.17 GSol/s), gbẹkẹle awọn olupin.
- **F2Pool (zec.f2pool.com) **: 2% owó, PPS+ ìsanwó, ìtìlẹ́yìn fún ọ̀pọ̀ ẹyọ owó. Àgbá ńlá (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com) **: 2% owó (PPS+), àlẹmọ tí ó rọrùn láti lò, àwọn sérùpù àgbáyé.
- **AntPool (zec.antpool.com) **: 1% owo, lati Bitmain, ti o dara fun ASICs (~ 494 MSol / s).
- Àwọn míràn: Kryptex Pool, Luxor (wo poolwatch.io/coin/zcash fún ìṣirò ojú-ọjọ́).

1. Lọ si oju opo wẹẹbu ti adagun ati ṣẹda akọọlẹ kan (imeeli tabi ko si iforukọsilẹ fun diẹ ninu awọn bii 2Miners).
2. Ṣafikun adirẹsi apamọwọ Zcash rẹ ninu awọn eto fun awọn sisanwo.
3. Ṣe akiyesi olupin stratum ti adagun (fun apẹẹrẹ, zec.2miners.com:1010) ati ibudo.

### Igbesẹ 4: Fi sori ẹrọ ati Ṣeto Sọfitiwia iwakusa
- Fun awọn GPU (Awọn apẹẹrẹ: lolMiner lori Windows / Linux):
  1. Ṣe igbasilẹ lolMiner lati GitHub (àtúnṣe tuntun, fun apẹẹrẹ, 1.88).
  2. Yíyọ sí àpamọ́ kan.
  3. Ṣẹ̀dá fáìlì ìdìpọ̀ (start.bat) pẹ̀lú ìṣètò:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Yípò `YOUR_WALLET_ADDRESS` pẹlu adirẹsi ZEC rẹ.
     - `WORKER_NAME`: Orúkọ fún èbúté rẹ (bíi, Èbúté 1).
     - Fun awọn olupin EU: eu.zec.2miners.com:1010.
  4. Ṣiṣẹ faili ìdìpọ̀, yóò so pọ̀ mọ́ adágún náà yóò sì bẹ̀rẹ̀ ìwakùsà.
- Fun awọn ASIC (Awọn apẹẹrẹ: Bitmain Antminer):
  1. Wọlé sínú àlàfo orí ayélujára.
  2. Lọ sí Àtòjọ Miner.
  3. Ṣafikun awọn alaye apapọ:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Orúkọ oníṣe: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Ọ̀rọ̀-ìfiwọlé: x (tàbí òfo).
  4. Fipamọ ki o tun bẹrẹ ẹrọ iwakusa.
- Fun awọn software miiran (fun apẹẹrẹ, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Idánwò:** Ṣiṣẹ fun iṣẹju 10-15; ṣayẹwo console fun awọn pinpin ti a gba ati hashrate.

### Igbesẹ 5: Bẹrẹ Iwakiri ati Ṣayẹwo
1. Ṣii ẹrọ iwakusa: ó máa so pọ̀ mọ́ àgbá náà, yóò sì bẹ̀rẹ̀ sí fi àwọn ìpín sílẹ̀.
2. Ṣiṣayẹwo nipasẹ:
   - Àkọlé àwòrán: Fi adirẹsi àpamọ́ rẹ wọlé láti rí iye owó tí a kò san, àlàfo tí a ò san, àti ìsọfúnni.
   - Ẹrọ-ìpèsè: Ṣọ́ra fún àṣìṣe, iwọn otutu (pa < 80 degrees C).
   - Awọn irinṣẹ: Lo HiveOS tabi SimpleMining OS fun iṣakoso rig latọna jijin.
3. Owó tó o máa san: Ọ̀pọ̀ jù lọ àwọn ilé ìfowópamọ́ ló máa ń san gbèsè náà fún ọ ní tààràtà nígbà tó o bá dé ìwọ̀n tó kéré jù lọ (bíi, 0.05 ZEC).

   
[Ìtòlẹ́sẹẹsẹ Ìtọjú Ìwakùsà Zcash](https://raw.githubusercontent.com/ZecHub/zechub/aac601cf85076960d334f4c841867a646a5a2f29/assets/images/zcashMining.jpg)


## Àwọn Ìmọ̀ràn àti Ìlànà Tó Dára Jù Lọ
- Àpẹẹrẹ: RTX 3060 (~300 Sol/s) ń gba ~0.001 ZEC/ọjọ́ ní $50/ZEC, dínkù ~$0.50 iná mànàmáná.
- ** Ìpamọ́:** Lo àwọn ibi ìwèé tí a fi ààbò ṣe bí ó bá wà; yẹra fún lílo àdírẹ́ẹ̀sì padà.
- **Security:** Use strong passwords; enable 2FA on pools/wallets. Never share private keys.
- **Iṣakoso iṣoro:** Ti ko ba si awọn pinpin, ṣayẹwo firewall, antivirus, tabi iṣeto ti ko tọ. Darapọ mọ awọn apejọ bi forum.zcashcommunity.com tabi Reddit r/zec.
- **Awọn ọna miiran:** Ti ko ba ni ere, ro iwakusa awọsanma tabi fifi awọn owó miiran.
- ** Àkíyèsí nípa àyíká:** Iṣẹ́ ìwakùsà máa ń gba agbára; lo àwọn ohun àmúṣọrọ̀ tó ṣeé tún ṣe.
- ** Awọn imudojuiwọn:** Zcash le dagbasoke (fun apẹẹrẹ, iyipada PoS ti o ṣeeṣe); ṣayẹwo z.cash fun awọn iroyin.
