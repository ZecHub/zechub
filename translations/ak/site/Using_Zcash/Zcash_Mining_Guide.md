# Zcash Mining Guide: Wo de wo ho bɛ ka mining pool mu wɔ hardware a w'ankasa wowɔ so.

## Nkɔanim nsɛm

Zcash (ZEC) yɛ cryptocurrency a ɛtwe adwene si ahobanbɔ so na ɛde Equihash proof-of-work algorithm di dwuma ma nnwumakuo. Nkonyaayi wɔ zcash mu no, wɔde kɔmputa ahoɔden boa ano sɛ wobedi nsɛnnennen ho dwuma, de agye adwuma atom, na w'agye network no nkwa ama wo anya ZEC akatua bi. Ɛnam sɛnea ɛyɛ den fa kwan no nti wɔnnka nkyerɛ nnipa bebree mma wonnyɛ monomono nhwehwɛde. Sɛ wode wo tumi ka afoforo nsa a, ɛno ne ɔkwan pa ara a wobɛfa so anya mfaso bere nyinaa.

This guide focuses on mining Zcash using personal hardware (e.g., a home PC with GPUs or entry-level ASICs). Note that while GPUs can still mine Zcash, ASICs are far more efficient and profitable in 2026 due to network difficulty. Always check current profitability using tools like WhatToMine.com, as factors like electricity costs, hardware prices, and ZEC value affect viability. Mining may not be profitable for everyone; research local regulations and energy rates (aim for < $0.08/kWh).


## Ahwehwɛde ahorow

### Dwumadie ahwehwɛde
- **GPU Mining (Personal Setup a wɔhyɛ ho nkuran ma wɔn a w'ɔde firi aseɛ):**
  - NVIDIA anaa AMD GPUs a εwכ 4GB VRAM (te sε, NVIDIAN GTX 1070, RTX 3060; AMD RX 580 anaasε nea yε sen saa).
  - motherboard a ɛne no bɔ mu, PSU (at least 750W for multiple GPUs), ne ahumudwo pa de siw ɔhyew ano kwan.
  - Multi-GPU rigs yɛ ade a wɔtaa de di dwuma ma hash rates pa (sɛ nhwɛso, 6x GPU bɛtumi anya 1-2 kSol/s).
- ASIC Mining (More Efficient but Higher Cost):** Ɔyɛ a, na ne boɔ yɛ den paa.
  - ASICs a ɛne Equihash di nsɛ te sɛ Bitmain Antminer Z15 (420 kSol/s) anaa Innosilicon A9 (50 kSel/s).
  - Saa nneɛma yi yɛ dede, ɛyɛ hyew na etumi de anyinam ahoɔden bebree di dwuma (te sɛ 1500W+); wɔfata baabi a wɔde ato hɔ.Tɔ firi mmeae bi te sε Bitmain.com anaa resellers (Blockware Mining).
- **Nsɛmti:** Stable internet, kɔmputa a wɔde siesie/hwɛ so. ASICs di network no mu (~13 GSol/s total hashrate wɔ 2026), na ɛma GPU mining yɛ nea entumi ntɔ akan nanso ɛtumi ba ho ma wɔn a wɔpɛ sɛ wɔyɛ bi nyinaa.

### Dwumadibea dwumadi
- **Nneɛma a wɔyɛ no:** Windows 10/11, Linux (Ubuntu ho hia ma ahobammɔ).
- ** Mining Software:** (Mining) dwumadie a wɔde yɛ adwuma wɔ aberɛ mu.
  - Sɛ yɛ de GPU di dwuma a: lolMiner (ɔboa AMD/NVIDIA), GMiner, anaa miniZ (n'ani da NVIDIA so). Twe firi official GitHub repositories hɔ.
  - ASICs: Fa adwumakuo no firmware/dashboard a w'abɔ mu (te sɛ, Bitmain wɛb interface) di dwuma.
- ** Akwanhosan:** Zcash akwanhosan a wɔde gye sika. Wɔhyɛ ho nkuran sɛ:
  - Akwan a wɔfa so bɔ ho ban (private): Zashi Wallet, Zingo (Mobile/Desktop) YWallet (mobile/desktop).
  - Transparent (mfeɛ nanso ɛnyɛ so): Edge Wallet, Zecwallet Lite.
  - Twe firi [nsaban] so.](https://zechub.wiki/wallets). Yɛ address a w'atwe no afiri ho (ɛfiri ase wɔ 'zs') ma wo ahofadi sɛ pool no bɛboa ama ayɛ saa.

### Emu bi ne:
- Anyinam ahoɔden: Sesa ka. GPUs de 150-300W di dwuma wɔ kar biara ho; ASICs 1000W+.
- Antivirus: Deactivate wɔ setup mu, efiri sɛ ɛbɛtumi ama miners no ayɛ asiane.

## Akwankyerɛ a Ɛfa Nkɔsoɔ Ho Ma Obi De Ne Ho Hyɛ Aguadifo Kuw Bi Mu

### Akwantu 1: Siesie Wo Zcash Kɔntaktir no
1. Twe na fa wo sika nkrataa krataa firi Zcash wɛbsaet no so [nkrataafa](https://zechub.wiki/wallets).
2. Yɛ wallet foforɔ na fa wo asɛmfua a wode di dwuma no to hɔ.
3. Yɛ address a wɔde rebɛgye (ɛfata sɛ wɔkora so ma wɔn ho ahofadi). Twerɛ no, te sԑ: `zs1exampleaddress...`.
4. Sɛ wode address a ɛnkyerɛ obiara (ɛfiri ase wɔ 't'), ɛyɛ tiawa nanso ɛmma no ahobammɔ.

### Nea Ɛto so Abien: Siesie Wo Dwumadibea no Akwankyerɛ
- GPUs ho no:
  1. SƐ W'ayi GPUs adi wɔ wo PC mu na woresane de drivers no ayɛ adwuma (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Overclock sε wonya osuahu (fa MSI Afterburner di dwuma ma ahobͻden; fa +100-200 core clock, -500 memory si w'ani so).
- ASICs: no ho anohyeto biara nni hɔ.
  1. Fa ASIC no kɔ tumi ne Ethernet mu.
  2. Hwehwɛ ne IP address a wode dwumadie bi te sɛ Advanced IP Scanner anaa afiri no yɛ app.
  3. Kɔ web dashboard no mu (s.e., fa IP hyɛ browser, default login: root/root ma Bitmain).

**Ntoaso:** Ma mframa pa ntwam; abɛɛfo mfiri de hyew ba. Fi ase nketewa na sɔ hwɛ.

### Anammɔn 3: Paw na fa wo ho ka adwuma a wɔyɛ wɔ abomu no mu bi
Mining pools kyekyɛ adwuma ne akatua a egyina wo hashrate so. Wopɛ no wɔ kaade (0-2%), sika kakra (0.01-0.1 ZEC), bea (low ping) ɛne nokwaredi mu.

**Nneɛma a wɔhyɛ ho nkuran (a egyina Hashrate, Fees ne Reviews so):**
- 2Miners (zec.2miners.com) **: 1% ka, PPLNS tua ho aka, boa GPU/ASIC/NiceHash. Hight hashrate (~1.17 GSol/s), servers a wɔgye di.
- F2Pool (zec.f2pool.com) **: 2% fee, PPS+ payout, multi-coin support. Large pool (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 2% kabea (PPS+), paneɛ a ɛyɛ den sɛ wobɛfa, wiase nyinaa servers.
- AntPool (zec.antpool.com) **: 1% fee, from Bitmain, good for ASICs (~494 MSol/s).
- **Sovright (mining.sovright.com)**: A Zcash pool built on Stratum V2, currently running as a public testnet. No live ZEC payouts yet, so treat it as a way to test your setup rather than an earnings source. See the dedicated section below for details.
- Ebinom nso: Kryptex Pool, Luxor (hwɛ poolwatch.io/coin/zcash na nya real-time statistics).

1. Kɔ pool no wɛbsaet na yɛ account (email anaa registration biara mma ebinom te sɛ 2Miners).
2. Fa wo Zcash akwantufo address ka nea wobɛtumi de atua no ho.
3. Hwε no nsow sε, nea ne ho kyere nkatabo a w'atwe (s.e., zec.2miners.com:1010) na port so.

### Anammɔn 4: Fa Mining Software no si hɔ na yɛ ho nhyehyɛe
- Wɔ GPUs ho (Sample: lolMiner wɔ Windows/Linux so):
  1. Twe lolMiner firi GitHub (n'afidie a etwa to, s.e., 1.88).
  2. Fa kɔ foldere mu.
  3. Yɛ batch file (start.bat) a configuration wɔ mu:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Siesie no bio `YOUR_WALLET_ADDRESS` wo ZEC address no so.
     - `WORKER_NAME`: wo rig no din (s.ɛ., Rig1).
     - Sɛ EU servers: eu.zec.2miners.com:1010.
  4. Bɔ fael no mu, na ɛbɛfa akɔ pool no mu ma afi ase atu.
- ASICs (Example: Bitmain Antminer):
  1. Kɔ wɛb so dashboard no mu.
  2. Kɔ Miner Nhyehyɛe no so.
  3. Fa mmoa ho nsɛm ka:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME (Ɔwԑn Aban Ahyehyԑde)
     - Krataafa: x (anaa biribi a wonhyehyɛɛ).
  4. Fa sika kɔkɔɔ no na san hyɛ adwuma a wɔyɛ wɔ abopae mu no ase.
- Wɔ dwumadie ahodoɔ bi mu (te sɛ, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

SƆ EYI HWƐ:** Kɔ so di dwuma simma 10-15; hwɛ console no sɛ wogye kyɛfa ne hashrate a w'agye ato mu.

### Anammɔn 5: Bue Mining ne Monitor
1. Hyɛ miner no ma ɔnkɔ so: ɔbɛka nhomanim ho na wafi ase de nkontaabu aba.
2. Hwɛ so wɔ:
   - Pool dashboard: Fa wo wallet address na hu hashrate, unpaid balance ne stats.
   - Software console: Hwɛ mfomso, hyew (hwɛ na < 80 deg C).
   - Nkrataa a w'atwe afiri abɛɛfo afidie so: Fa HiveOS anaa SimpleMining OS di dwuma de hwɛ mfiri no yie.
3. Payouts: Most pools pay automatically when you reach the minimum (e.g., 0.05 ZEC). Check pool rules.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet Pool ne Relay Network (Nneɛma a wɔde yɛ nhwehwɛmu)

Sovright (sovright.com) yɛ Stratum V2 mining pool ne ɔfã bi a wɔfa so de kɔma afoforo no, na wɔn nyinaa kura adwuma ahorow mu nti wɔde nsɛm yi to hɔ ma yɛn ase ha.

### Mining Pool (mining.sovright.com)

Sovright's pool runs on a public Zcash testnet (NU6, Stratum V2), not mainnet. The testnet does not pay out real ZEC. Use it to test your miner configuration, not to earn.

- Wonnhia account biara ansa na woatumi afi ase. Fa CPU anaa ASIC Equihash miner no fa pool ho, na w'akɔntaabu bɛyi ne ho adi wɔ dashboard a ɛwɔ hɔ ankasa so.
- Sovright nso tintim aberɛ a w'atumi de Stratum V2 proxy ma miners no sɛ wɔn ankasa bɛpaw block templates mmom sen sɛ wɔbɛfa pool adwuma:
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Fa wo miner no si ɔfoforɔ so, na ɛnyɛ pool no ankasa:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  de adwuma no din te sɛ: `yourname.rig1`.
- Sovright transparency page no kyerɛ sɛ "fa nyinaa ka ho" nhyehyɛeɛ wɔ dwumadie a wɔde banbɔ ano, ɛnte saa te sε nkontaabu bi a wɔntoto mu. Ɔfese biara nya adanseɛ a wɔatwerɛ ase de ma wotumi hwɛ mmara no so faako.
- Yɛ account wɔ mining.sovright.com (Google anaa email sign in) na w'atumi adi wo ankasa adwumayɛfo akyi sen sɛ wode data a ɛwɔ dashboard no mu bɛhwɛ wɔn so.

### Relay Network (relay.sovright.com)

Sovright separately runs a public block relay network on Zcash mainnet. When a pool finds a block, how fast that block reaches the rest of the network determines how often it gets orphaned, meaning it loses the propagation race and the reward for it is lost. The relay forwards blocks across four regions using compact block relay with forward error correction.

Aban dashboard no da nsunsuanso a ɛwɔ hɔ ankasa adi: mmeae bi wɔ relay-connection na ɛhwɛ sɛ blocks foforo bɛba ntɛmntɛm sen bere a wɔn ho nnipa di nkitaho, ne nea ɛkyerɛkyerɛ network no mu ma wohu sԑ saa aman yi yɛ ayisaa.

Saa nhyehyeԑ yi yε ma wɔn a wɔyε pools no, na ɛnyɛ ankorankoro. Sovright's open source `mining-infra` a) nkrataa ahodoɔ a w'akyerɛw no mu. `submitblock` relay gateway ma fanning a wohu blocks wɔ mesh mu ntɛm sen native P2P. Sɛ wo ne Sovright bedi nkitaho tẽẽ (support@sovright.com) ama relay peer addresses ɛne auth key no.


## Afotu ne Nneyɛe Pa a Wobɛtumi Ayɛ
- Wode w'ani bɛhwɛ sɛ wo nsa bɛka sika a, wobɛhu sε wode saa ka no. Fa calculator te sε whattomine.com/coins/166-zec-equihash di dwuma. SƐ nhwɛso: RTX 3060 (~300 Sol/s) nya ~0.001 ZEC da biara wɔ $50/ZEC mu, minus ~$0.50 anyinam ahoɔden so.
- **Kasa mu nsɛm:** Fa adan a wɔabɔ ho ban di dwuma; kwati sɛ wobɛsan de address adi dwuma bio.
- ** Security:** Fa password a ano yɛ den di dwuma; ma 2FA kwan wɔ pools/wallets so. Nfa private keys nka ho da.
- ** Nsεnkyerεmu:** Sɛ wonnya nkitahodie biara a, sεε w'ahwehwԑ firewall no mu yie anaa antivirus no so yiye. fa wo ho ka forums te sɛ forum.zcashcommunity.com or Reddit r/zec.
- **Nneɛma foforo:** Sɛ w'ani nnye ho a, susuw cloud mining anaa sika afoforo a wobɛtumi de adi dwuma.
- **Nsɛm a ɛfa ewiase ho:** Mining de anyinam ahoɔden yɛ adwuma; fa nneɛma foforo di dwuma sɛ ɛbɛyɛ yiye.
- **Nneɛma a asesa:** Zcash betumi anya nkɔso (te sɛ, PoS nsakrae); hwɛ z.cash na hu nsɛm foforo.
