# Itọsọna Iwakọ-owo Zcash: Ṣiṣẹpọ Apapo iwakọ pẹlu Ẹrọ ti ara ẹni

## Ìfilọ́lẹ̀

Zcash (ZEC) jẹ́ owó-ìpamọ̀ tí ó ńlo Equihash proof-of-work algorithm fún ìwakùsà. Ìwakùsá Zcash ní nínú lílò agbára ìṣirò láti yanjú àwọn ìṣòro kàkàkí dídíjú, fífi ìdánilójú ṣe àdàkọ àti pípèsè ẹ̀kúnrẹ́rẹ́ ọ̀nà náà láìsí ìdíwọ́n nítorí èrè ZEC. Nítorí àìríkanṣe tó ga ti nẹtiwùkì yìí, a kò gbà kí o máa dáwọ́ ara rẹ lọ sídìí iṣẹ́ iwakúsà nìkan fún èyí to pọju lára àwọn oníṣẹ́. Lílọ sínú ẹgbẹ́ òṣìṣé́ ni ọna tí ó dára jùlọ láti jèrè èrè déédéé nípa sísopọ agbára hash rẹ pẹlú àwọn ẹlòmíràn.

This guide focuses on mining Zcash using personal hardware (e.g., a home PC with GPUs or entry-level ASICs). Note that while GPUs can still mine Zcash, ASICs are far more efficient and profitable in 2026 due to network difficulty. Always check current profitability using tools like WhatToMine.com, as factors like electricity costs, hardware prices, and ZEC value affect viability. Mining may not be profitable for everyone; research local regulations and energy rates (aim for < $0.08/kWh).


## Àwọn ohun tí a béèrè

### Ohun èlò ìkọ̀rọ̀
- **GPU Mining (Ìtòlẹ́sẹẹsẹ ti ara ẹni tí a ṣeduro fún àwọn tó ń bẹ̀rẹ̀):**
  - NVIDIA tabi AMD GPUs pẹlu o kere ju 4GB VRAM (fun apẹẹrẹ, NVIDia GTX 1070, RTX 3060; AMD RX 580 tabi dara julọ).
  - Aabo ti o ni ibamu, PSU to (o kere ju 750W fun awọn GPU pupọ), ati itutu daradara lati yago fun ooru.
  - Awọn ẹrọ-GPU pupọ jẹ wọpọ fun awọn oṣuwọn hash ti o dara julọ (fun apẹẹrẹ, 6x GPU le ṣaṣeyọri 1-2 kSol / s).
- **Iṣẹ́-ìwakùsà ASIC (Ohun tó dára jùlọ ṣùgbọ́n ó náwó púpọ̀ sí i):**
  - Awọn ASIC ti o ni ibamu pẹlu Equihash bii Bitmain Antminer Z15 (420 kSol / s) tabi Innosilicon A9 (50 kSul / s).
  - Àwọn wọ̀nyí ló dún jù, tí ó gbóná ju àti pé wọn ń lo agbára púpọ (fún àpẹrẹ 1500W+); èyí tó dára fún àwọn àyè pàtó. Ra láti ibi ìwúlò bí Bitmain.com tàbí àwọn olùtajà (Blockware Mining).
- **Gbogbogbo:** Ayika intanẹẹti, kọnputa fun iṣeto / ibojuwo. ASICs jẹ gaba lori nẹtiwọọki (~ 13 GSol/s lapapọ hashrate ni 2026), ṣiṣe iwakusa GPU kere si idije ṣugbọn tun ṣee ṣe fun awọn onijakidijagan.

### Ètò orí kọ̀ǹpútà
- **Iṣẹ ṣiṣe:** Windows 10/11, Linux (Ubuntu ti a ṣe iṣeduro fun iduroṣinṣin).
- ** Ètò Ìwakùsà:**
  - Fun awọn GPU: lolMiner (o ṣe atilẹyin AMD / NVIDIA), GMiner, tabi miniZ (ti o ni idojukọ lori NVIDYA). Ṣe igbasilẹ lati ọdọ GitHub repositories osise (fun apẹẹrẹ, github.com/Lolliedieb/lolMiner-releases)
  - Fun ASICs: Lo awọn olupese ká itumọ ti o wa ni inu firmware / dasibodu (fun apẹẹrẹ, Bitmain ká ayelujara wiwo).
- **Wọ́léètì:** Wọọlì Zcash láti gba owó. Àbájáde rẹ̀ ni pé:
  - Shielded (private): Zodl Wallet, Zingo (Mobile/Desktop) YWallet (mobile/desktop).
  - Àwòdì tí ó ṣe kedere (ó rọrùn jùlọ ṣùgbọ́n kò ní ìpamọ̀ tó pọ̀): Edge Wallet, Zecwallet Lite.
  - Ṣe igbasilẹ lati: [àwọn àpò owó](https://zechub.wiki/wallets). Ṣẹda adirẹsi ti o ni aabo (ti bẹrẹ pẹlu 'zs') fun asiri bi ikọkọ ba ṣe atilẹyin rẹ.

### Àwọn mìíràn
- Omi-ọmọ: Ṣiro awọn idiyele. Awọn GPU lo 150-300W fun kaadi kan; ASICs 1000W+.
- Antivirus: Díná rẹ̀ nígbà ìmúrasílẹ̀ nítorí ó lè fi àmì àwọn miners hàn bí ewu.

## Àwọn Ohun Tó Lè Mú Kí O Di Òṣìṣẹ́ Iwakùsà Kan - Ìtọ́ni Nípa Bí Wọ́n Ṣe Ń Ṣiwọ́ Pọ̀ síbi tí wọ́n Ti Ń Wa Irin-Iṣẹ́

### Igbesẹ 1: Ṣeto Wọ́lìtì Zcash Rẹ
1. Ṣe igbasilẹ ki o fi apamọwọ kan sori ẹrọ lati oju opo wẹẹbu osise Zcash [àwọn àpò owó](https://zechub.wiki/wallets).
2. Ṣẹda apamọwọ tuntun ki o ṣe afẹyinti gbolohun ọrọ irugbin rẹ ni aabo.
3. Ṣẹda adirẹsi gbigba (ti o dara julọ fun aabo aṣiri). Kọ ọ silẹ, gẹgẹbi: `zs1exampleaddress...`.
4. Bí o bá lo adirẹsi tí ó ṣe kedere (tí yóò bẹ̀rẹ̀ pẹ̀lú 't'), èyí rọrùn jùlọ ṣùgbọ́n kò ní fúnni láyè ìpamọ́.

### Ìgbésẹ̀ Kejì: Múra Sílẹ̀ fún Iṣẹ́ Náà
- Fun awọn GPU:
  1. Fi GPUs sori PC rẹ ki o ṣe imudojuiwọn awọn awakọ (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Ifá bá ní ìrírí (lo MSI Afterburner fún ìdúróṣinṣin; gbìyànjú láti rí +100-200 core clock, -500 memory for efficiency).
- Fun awọn ASIC:
  1. So ASIC mọ́ agbára àti Ethernet.
  2. Wá adirẹsi IP rẹ nípa lílo ohun èlò bíi Advanced IP Scanner tàbí app ti olùṣe.
  3. Wọlé sí àtẹ ìsọfúnni orí ayélujára (bí àpẹẹrẹ, tẹ IP sínú aṣàwákiri, wíwọlé-sí láìsí: root/root fún Bitmain).

**Ìkìlọ̀:** Rọ́jú kí o rí i pé ó ní afẹfẹ tó dára; ìwakùsà máa ń mú ooru jáde. Bẹrẹ kékeré láti dán an wò.

### Ìgbésẹ̀ 3: Yan Àwùjọ Àwọn Tó Ń Ṣiṣẹ́ Iwakùsà, Kó O sì Darapọ̀ Mọ́ Wọn
Awọn adagun iwakusa pin iṣẹ ati awọn ẹbun ipin ti o da lori hashrate rẹ. Yan ni ibamu si owo-ori (0-2%), isanwo to kere julọ (0.01-0.1 ZEC), ipo (ping kekere) ati igbẹkẹle .

**Awọn apoti ti a ṣe iṣeduro (Da lori Hashrate, Awọn idiyele ati awọn atunyẹwo):**
- **2Miners (zec.2miners.com)**: 1% owó, PPLNS ìsanwó, atilẹyin GPU/ASIC/NiceHash. High hashrate (~1.17 GSol/s), gbẹkẹle awọn olupin .
- **F2Pool (zec.f2pool.com)**: 2% owó, PPS+ ìsanwó, atilẹyin owo-owo pupọ. Àgbá ńlá (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 2% owó-ìdílé (PPS+), àtẹ tí ó rọrùn láti lò, àwọn séràfẹẹsù kárí ayé.
- **AntPool (zec.antpool.com)**: 1% owó, láti Bitmain, ó dára fún ASICs (~494 MSol/s).
- **Sovright (mining.sovright.com)**: A Zcash pool built on Stratum V2, currently running as a public testnet. No live ZEC payouts yet, so treat it as a way to test your setup rather than an earnings source. Wo abala ti o wa ni isalẹ fun awọn alaye. O le lo Bitcoin lati ṣe idanwo rẹ ati ki o gba owo-owo nipasẹ lilo wọn bi ohun elo kan ninu iṣowo iṣura tabi iṣẹ ṣiṣe titaja.
- Àwọn míràn: Kryptex Pool, Luxor (wo poolwatch.io/coin/zcash fún àwọn ìṣirò ojú-ọjọ́).

1. Lọ si oju opo wẹẹbu ti adagun ati ṣẹda akọọlẹ kan (imeeli tabi ko ni iforukọsilẹ fun diẹ ninu awọn bii 2Miners).
2. Fi adirẹsi àpamọ́ Zcash rẹ kún ìtòlẹ́sẹẹsẹ fún àwọn owó-sanwó.
3. Ṣe akiyesi olupin stratum ti adagun (fun apẹẹrẹ, zec.2miners.com:1010) ati ibudo.

### Igbesẹ 4: Fi sori ẹrọ ati Ṣeto Sọfitiwia iwakusa
- Fun awọn GPU (Awọn apẹẹrẹ: lolMiner lori Windows / Linux):
  1. Ṣe igbasilẹ lolMiner lati GitHub (àtúnṣe tuntun, fun apẹẹrẹ 1.88).
  2. Ṣàkópọ̀ sí àpamọ́ kan.
  3. Ṣẹda faili ìdìpọ̀ (start.bat) pẹlú ìṣètò:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Gbépò rẹ̀ padà. `YOUR_WALLET_ADDRESS` pẹ̀lú àdírẹ́sì ZEC rẹ.
     - `WORKER_NAME`: Orúkọ fún ẹ̀rọ ìdáná rẹ (bíi, Ètò Ìdáná 1).
     - Fun awọn olupin EU: eu.zec.2miners.com:1010.
  4. Ṣiṣẹ faili ìdìpọ̀. Ó máa so pọ̀ mọ́ adágún náà, yóò sì bẹ̀rẹ̀ sí í wa nǹkan jáde nínú rẹ̀.
- Fun awọn ASIC (Awọn apẹẹrẹ: Bitmain Antminer):
  1. Wọlé sínú àtẹ ìsọfúnni orí ayélujára.
  2. Lọ sí Àṣètò Olùgbìn.
  3. Fi àlàyé ìsọ̀rí kún un:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Orúkọ oníṣe: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Ọrọìwòye: x (tàbí òfo).
  4. Fipamọ ati tun bẹrẹ ẹrọ iwakusa.
- Fun awọn software miiran (fun apẹẹrẹ, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Idánwò:** Ṣiṣẹ fun iṣẹju 10-15; ṣayẹwo console fun awọn pinpin ti a gba ati hashrate.

### Igbesẹ 5: Bẹrẹ iwakusa ati Ṣayẹwo
1. Ṣíṣẹ́ aládúrà: yóò so pọ̀ mọ́ àgbá náà, á sì bẹ̀rẹ̀ sí fi àwọn ìpín ránṣẹ́.
2. Ṣiṣayẹwo nipasẹ:
   - Àkọlé àwòrán: Fi adirẹsi àpò rẹ wọle láti wo hashrate, ìdìbò tí kò sanwó àti àwọn ìṣírò.
   - Ẹrọ-ìmọ̀ràn: Ṣọ́ra fún àṣìṣe, iwọn otutu (pa < 80 degrees C).
   - Awọn irinṣẹ: Lo HiveOS tabi SimpleMining OS fun iṣakoso rig latọna jijin.
3. Owó tó o máa san: Ọ̀pọ̀ jù lọ àwọn ilé ìfowópamọ́ ló ń fún ẹ ní owó náà fúnra wọn nígbà tí iye tẹ́ni kan fẹ́ fi ra nǹkan bá ti dín kù (bíi 0.05 ZEC).

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet Pool ati Awọn nẹtiwọọki Relay

Sovright (sovright.com) n ṣiṣẹ Stratum V2 mining pool ati a lọtọ block relay network. Wọn ṣe awọn iṣẹ oriṣiriṣi, nitorinaa wọn bo ni ọtọtọ ni isalẹ.

### Ìkópa ìwakùsà (mining.sovright.com)

Àgbájọ Sovright ń ṣiṣẹ́ lórí àwo n Zcash testnet (NU6, Stratum V2), kì í ṣe mainnet. Awon àwo Nẹtiwọki kò san owó fún ojúlówó ZEC. Lo o láti dán ìsopọ̀ àwọn òṣìṣẹ́-kángun rẹ wò, kìíṣe kí ó lè jèrè.

- Kò sí ìkànnì tí ó pọn dandan láti bẹ̀rẹ̀. Fi CPU tàbí ASIC Equihash miner hàn ní ibi ìṣùpọ̀ náà àti àwọn ìpín rẹ yóò farahan lórí àtẹ́lẹwọ́ kan tó wà láàyè.
- Sovright tun ṣe atẹjade orisun ṣiṣi Stratum V2 aṣoju fun awọn oniwakiri ti o fẹ lati yan awọn awoṣe bulọọki tirẹ dipo ki wọn gba iṣẹ adagun:
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Ṣe itọka iwakusa rẹ si aṣoju dipo adagun taara:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  lílo orúkọ òṣìṣẹ́ bíi: `yourname.rig1`.
- Ojúewé ìwífún-ohun tí Sovright fi ṣe àlàyé ní ìlànà "include all" fún àwọn ìṣòwò tó ni ìdènà, kò dàbí àwọn agbófinró kan ti wọn máa ń yọ wọ́n. Ẹ̀ka kọ̀ọ̀kan gba ìwé ẹrí tí a fọwọsi kí ètò náà lè yẹra lọ́nà aládàáṣiṣẹ́tọ̀.
- Ṣẹda àkọọlẹ kan ni mining.sovright.com (Google tabi wọlé imeeli) lati tọpinpin awọn oṣiṣẹ tirẹ dipo data dasibodu apẹẹrẹ naa.

### Àjọ tí ó ń ṣe àtúnyẹ̀wò (relay.sovright.com)

Sovright separately runs a public block relay network on Zcash mainnet. When a pool finds a block, how fast that block reaches the rest of the network determines how often it gets orphaned, meaning it loses the propagation race and the reward for it is lost. The relay forwards blocks across four regions using compact block relay with forward error correction.

Àkọlé ìsọfúnni fún gbogbo ènìyàn fi ipa hàn ní tààràtà: àwọn agbègbè tí ó so pọ̀ mọ́ àtúnṣe rí àwùjọ tuntun nínú àkókò tó kéré ju ìdá méjì lọ ti ìròyìn ọ̀rọ̀-ìbínúnijẹ ojúgbà sí ojúgba, àti pé àkọlé náà ń tọpinpin iye ìgbà tí a kò tíì lò lára ẹ̀rọ àjọlò.

Eyi jẹ amayederun fun awọn oniṣẹ apapọ, kii ṣe olutọpa kọọkan. orisun ṣiṣi Sovright ni `mining-infra` àwọn ìwé ìpamọ́ a `submitblock` relay gateway fún fanning rí blocks sínú ìpo ju àbínibí P2P. láti so, kàn sí Sovright ní tààràtà (support@sovright.com) fún àwọn àdírẹ́sì ẹlẹgbẹ tí ó ń ránṣẹ àti kókó ìṣàmúlò kan.


## Àwọn Ìmọ̀ràn àti Ohun Tó Yẹ Kó O Máa Ṣe
- **Owo-ori:** Lo awọn iṣiro bi whattomine.com/coins/166-zec-equihash Àpẹẹrẹ: RTX 3060 (~ 300 Sol / s) n gba ~ 0.001 ZEC fun ọjọ kan ni $ 50 / ZEC, din owo ina mọnamọna ti o to $ 0.50.
- ** Ìpamọ́:** Lo àwọn ibi ìwẹ̀ tí a fi ààbò bo bí ó bá wà; yẹra fún lílo àdírésì padà.
- ** Ààbò:** Lo àwọn ọ̀rọ̀-ìfipamọ́ tó lágbára; jẹ kí 2FA ṣiṣẹ lórí ìsopọ/àwọn àpò. Má ṣe pínpín kókó ìdánimọ̀ rẹ.
- **Iṣakoso iṣoro:** Ti ko ba si awọn pinpin, ṣayẹwo firewall, antivirus, tabi ṣiṣi aṣiṣe. Darapọ mọ apejọ bi forum.zcashcommunity.com tabi Reddit r/zec .
- **Ohun míì:** Bí kò bá lówó, ronú nípa ìwakùsà àwọsánmà tàbí gbígbé owó mìíràn.
- **Àmì àyíká:** Iṣẹ́ ìwakùsà máa ń lo agbára; tó bá ṣeé ṣe, ẹ wá àwọn ohun àmúṣọrọ̀ tí a lè mú padà bọ̀ sípò.
- ** Awọn imudojuiwọn:** Zcash le dagbasoke (fun apẹẹrẹ, iyipada PoS ti o ṣeeṣe); ṣayẹwo z.cash fun awọn iroyin.
