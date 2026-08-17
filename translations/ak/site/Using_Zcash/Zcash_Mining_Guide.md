# Zcash Mining Guide: Sɛ wode Ankorankoro Hardware bɛka Mining Pool ho

## Nnianimu

Zcash (ZEC) yɛ cryptocurrency a ɛtwe adwene si kokoamsɛm so a ɛde Equihash proof-of-work algorithm di dwuma ma mining. Mining Zcash hwehwɛ sɛ wɔde kɔmputa tumi di dwuma de di akontaabu mu haw ahorow a ɛyɛ den ho dwuma, wɔma nkitahodi ahorow no yɛ nokware, na wɔbɔ netɛw no ho ban de sesa ZEC akatua. Esiane sɛ network no yɛ den kɛse nti, wɔmfa solo mining nkamfo mma wɔn a wɔde di dwuma dodow no ara. Sɛ wode wo ho hyɛ mining pool mu a, ɛyɛ ɔkwan a eye sen biara a wobɛfa so anya akatua a ɛkɔ so daa denam wo hash tumi a wode bɛka afoforo ho no so.

Saa akwankyerɛ yi twe adwene si Zcash a wɔde ankorankoro hardware di dwuma so (e.g., ofie PC a ɛwɔ GPUs anaa entry-level ASICs). Hyɛ no nsow sɛ bere a GPUs da so ara tumi tu Zcash no, ASICs yɛ adwuma yiye koraa na mfaso wɔ so wɔ afe 2026 mu esiane ntwamutam a ɛyɛ den nti. Bere nyinaa fa nnwinnade te sɛ WhatToMine.com hwɛ mfaso a ɛwɔ hɔ mprempren, efisɛ nneɛma te sɛ anyinam ahoɔden ho ka, hardware bo, ne ZEC bo ka sɛnea ɛbɛyɛ yiye. Ebia mfaso remma obiara a wotu fagude; nhwehwɛmu mpɔtam hɔ mmara ne ahoɔden dodow (bɔ mmɔden sɛ wubenya < $0.08/kWh).


## Ahwehwɛde ahorow

### Hardware a wɔde yɛ nneɛma
- **GPU Mining (Wɔkamfo Ankorankoro Nhyehyɛe Ma Wɔn a Wɔafi Ase):**
  - NVIDIA anaa AMD GPU ahorow a anyɛ yiye koraa no ɛwɔ 4GB VRAM (e.g., NVIDIA GTX 1070, RTX 3060; AMD RX 580 anaa nea eye sen saa).
  - Motherboard a ɛne no hyia, PSU a ɛdɔɔso (anyɛ yiye koraa no 750W ma GPU ahorow pii), ne onwini pa a ɛbɛma ayɛ hyew dodo.
  - Multi-GPU rigs abu so ma hash rates a eye (e.g., 6x GPUs tumi nya 1-2 kSol/s).
- **ASIC Mining (Ɛyɛ adwuma yiye nanso ɛho ka yɛ kɛse):**
  - ASIC ahorow a ɛne Equihash hyia te sɛ Bitmain Antminer Z15 (420 kSol/s) anaa Innosilicon A9 (50 kSol/s).
  - Eyinom yɛ den, ɛyɛ hyew, na ɛgye ahoɔden pii (e.g., 1500W+); a ɛfata ma mmeae a wɔahyira so. Kɔtɔ fi mmeae a agye din te sɛ Bitmain.com anaa wɔn a wɔtɔn nneɛma foforo (Blockware Mining).
- **General:** Intanɛt a ɛyɛ den, kɔmputa a wɔde hyehyɛ/hwɛ so. ASICs di ntwamutam no so (~13 GSol/s total hashrate wɔ 2026 mu), ɛma GPU mining nyɛ akansi kɛse nanso ɛda so ara yɛ yiye ma wɔn a wɔpɛ anigyede.

### Software
- **Adwumayɛ Nhyehyɛe:** Windows 10/11, Linux (Ubuntu kamfo kyerɛ sɛ ɛnyɛ den).
- **Software a wɔde tu fagude:**
  - Wɔ GPU ahorow ho: lolMiner (ɛboa AMD/NVIDIA), GMiner, anaa miniZ (ɛde n’adwene si NVIDIA so). Twe fi GitHub repos a ɛyɛ aban de (e.g., github.com/Lolliedieb/lolMiner-releases).
  - Wɔ ASICs ho: Fa firmware/dashboard a wɔahyɛ no yɛfo no di dwuma (e.g., Bitmain wɛb interface).
- **Wallet:** Zcash sika kotoku a wɔde gye sika a wotua. Susu ma:
  - Wɔabɔ ho ban (ankorankoro): Zodl Sikakorabea, Zingo (Mobile/Desktop) YWallet (mobile/desktop).
  - Ɛyɛ nea ɛda adi pefee (ɛyɛ mmerɛw nanso ɛnyɛ kokoam de): Edge Wallet, Zecwallet Lite.
  - Twe fi [sika kotoku](https://zechub.wiki/wallets). Yɛ address a wɔabɔ ho ban (ɛhyɛ aseɛ wɔ 'zs') ma kokoamsɛm sɛ pool no boa a.

### Foforɔ
- Ɛlektrik: Bu ɛka a wɔbɔ ho akontaa. GPU ahorow de 150-300W di dwuma wɔ kaad biara mu; ASICs 1000W + na ɛwɔ hɔ.
- Antivirus: Disable bere a woreyɛ nhyehyɛe efisɛ ebetumi ahyɛ miners frankaa sɛ ahunahuna.

## Akwankyerɛ a Ɛfa Anamɔn biara Ho a Ɛfa Ho a Wobɛka Mining Pool Ho

### Anamɔn 1: Siesie Wo Zcash Wallet
1. Twe na fa sika kotoku bi fi Zcash wɛbsaet a ɛyɛ aban de no so [sika kotoku](https://zechub.wiki/wallets).
2. Yɛ sika kotoku foforo na fa wo aba kasasin no sie yiye.
3. Yɛ address a wogye (ɛbɛyɛ papa sɛ wɔabɔ ho ban ama kokoamsɛm). Hyɛ no nsow, s.e., . `zs1exampleaddress...`.
4. Sɛ wode address a ɛda adi pefee redi dwuma (ɛhyɛ aseɛ wɔ 't') a, ɛyɛ mmerɛ nanso ɛmma kokoamsɛm pii.

### Anamɔn 2: Siesie Wo Hardware no
- Wɔ GPU ahorow ho no:
  1. Fa GPU ahorow hyɛ wo PC mu na fa draiver ahorow no foforo (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Overclock sɛ wowɔ osuahu a (fa MSI Afterburner di dwuma ma ɛyɛ den; fa w’ani si so sɛ +100-200 core clock, -500 memory ma efficiency).
- Wɔ ASIC ahorow ho no:
  1. Fa ASIC no bata tumi ne Ethernet ho.
  2. Hwehwɛ ne IP address denam adwinnade te sɛ Advanced IP Scanner anaa nea ɔyɛe no app so.
  3. Kɔ wɛb dashboard no so (e.g., hyɛ IP wɔ brawsa mu, default login: root/root ma Bitmain).

**Kɔkɔbɔ:** Hwɛ sɛ mframa pa bɛkɔ mu; a wotu fagude no ma ɔhyew ba. Fi ase ketewaa bi sɔ hwɛ.

### Anamɔn 3: Paw na Kɔka Mining Pool bi ho
Mining pools kyekyɛ adwuma na wɔkyɛ akatua a egyina wo hashrate a wode ama no so. Paw gyina sika a wotua (0-2%), sikatua a ɛba fam koraa (0.01-0.1 ZEC), beae (ping a ɛba fam), ne ahotoso so.

**Atare a Wɔkamfo Kyerɛ (Egyina Hashrate, Fees, ne Nhwehwɛmu so):**
- **2Miners (zec.2miners.com)**: 1% ka, PPLNS akatua, boa GPU / ASIC / NiceHash. Hashrate a ɛkorɔn (~1.17 GSol/s), server ahorow a wotumi de ho to so.
- **F2Pool (zec.f2pool.com)**: 2% ka, PPS + akatua, sika pii mmoa. Ɔtare kɛse (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 2% fee (PPS +), dashboard a ɛyɛ mmerɛw sɛ wode bedi dwuma, wiase nyinaa server ahorow.
- **AntPool (zec.antpool.com)**: 1% fee, fi Bitmain, eye ma ASICs (~ 494 MSol / s).
- **Sovright (mining.sovright.com)**: Zcash pool a wɔasi wɔ Stratum V2 so, mprempren ɛreyɛ adwuma sɛ ɔmanfo testnet. No live ZEC payouts yet, enti fa no sɛ ɔkwan a wobɛfa so asɔ wo nhyehyɛe ahwɛ sen sɛ ɛbɛyɛ sika a wonya fibea. Hwɛ ɔfã a wɔahyira so wɔ ase hɔ no na woanya nsɛm no mu nsɛm.
- Afoforo: Kryptex Pool, Luxor (hwɛ poolwatch.io/coin/zcash na woanya bere ankasa mu akontaabu).

1. Kɔ pool no wɛbsaet na yɛ akontaabu (email anaasɛ wonkyerɛw wɔn din mma ebinom te sɛ 2Miners).
2. Fa wo Zcash sika kotoku address ka nhyehyɛe a wode tua sika no ho.
3. Hyɛ pool no stratum server (e.g., zec.2miners.com:1010) ne port no nsow.

### Anamɔn 4: Install na Hyehyɛ Mining Software
- Wɔ GPU ahorow ho (Nhwɛso: lolMiner wɔ Windows/Linux so):
  1. Twe lolMiner fi GitHub (nsɛm a aba foforo, s.e., 1.88).
  2. Yi fi mu kɔ folda bi mu.
  3. Yɛ batch fael (start.bat) a ɛwɔ nhyehyeɛ:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Hyɛ anan mu `YOUR_WALLET_ADDRESS` ne wo ZEC address no.
     - `WORKER_NAME`: Edin a wɔde frɛ wo rig (e.g., Rig1).
     - Wɔ EU server ahorow ho: eu.zec.2miners.com:1010.
  4. Fa batch fael no tu mmirika. Ɛbɛka ɔtare no ho na afi ase atu.
- Wɔ ASIC ahorow ho (Nhwɛso: Bitmain Antminer):
  1. Kɔ wɛb dashboard no mu.
  2. Kɔ Miner Nsiesiei no so.
  3. Fa pool ho nsɛm ka ho:
     - URL: stratum + tcp://zec.2miners.com: 1010. Ɔde ne nsa kyerɛɛ ne so
     - Ɔdefoɔ din: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (anaasɛ ɛnyɛ hwee).
  4. Sie na san boot miner no.
- Sɛ wopɛ softwea afoforo (e.g., GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Sɔhwɛ:** Tu mmirika simma 10-15; hwɛ console sɛ wogye kyɛfa ne hashrate.

### Anamɔn 5: Fi ase Mining na Monitor
1. Launch the miner: ɛbɛka pool no ho na afi ase de kyɛfa akɔma.
2. Monitor via:
   - Pool dashboard: Hyehyɛ wo sika kotoku address na hwɛ hashrate, sika a wontuae, ne akontaabu.
   - Software console: Hwɛ mfomso, ɔhyew (ma < 80 degrees C).
   - Nnwinnade: Fa HiveOS anaa SimpleMining OS di dwuma ma akyirikyiri rig sohwɛ.
3. Akatua: Pool dodow no ara tua ho ka ara kwa bere a woadu nea esua koraa (e.g., 0.05 ZEC). Hwɛ pool ho mmara.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet Pool ne Relay Ntrɛwmu

Sovright (sovright.com) yɛ Stratum V2 mining pool ne block relay network a ɛyɛ soronko. Wɔyɛ nnwuma ahorow, enti wɔaka ho asɛm wɔ ɔkwan soronko so wɔ ase hɔ.

### Ɔtare a Wɔde Tu Fam (mining.sovright.com) .

Sovright pool no tu mmirika wɔ ɔmanfo Zcash testnet (NU6, Stratum V2), ɛnyɛ mainnet so. Testnet no ntua ZEC ankasa. Fa di dwuma de sɔ wo miner nhyehyɛe no hwɛ, na ɛnyɛ sɛ wubenya sika.

- Ɛho nhia sɛ wɔde akontaabu biara fi ase. Twe adwene si CPU anaa ASIC Equihash miner bi so wɔ pool no so na wo kyɛfa no bɛda adi wɔ live dashboard so.
- Sovright nso tintim open source Stratum V2 proxy ma miners a wɔpɛ sɛ wɔpaw wɔn ankasa block templates sen sɛ wɔbɛfa pool no nnwuma kɛkɛ:
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Twe wo miner no kyerɛ proxy no mmom sen sɛ wobɛtwe adwene asi ɔtare no so tẽẽ:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  ɔde odwumayɛni din te sɛ `yourname.rig1`.
- Sovright transparency krataafa no ka "include all" nhyehyeɛ ma shielded transactions, ɛnte sɛ pools bi a ɛyiyi mu. Block biara nya adansedie a wɔde wɔn nsa ahyɛ aseɛ sɛdeɛ ɛbɛyɛ a wɔbɛtumi ahwɛ nhyehyɛeɛ no mu wɔ wɔn ankasa mu.
- Yɛ akonta wɔ mining.sovright.com (Google anaa email sign in) na di w’ankasa adwumayɛfo akyi sen sɛ wobɛdi nhwɛsoɔ dashboard data no akyi.

### Relay Ntrɛwmu (relay.sovright.com) .

Sovright soronko yɛ ɔmanfoɔ block relay network wɔ Zcash mainnet so. Sɛ ɔtare bi nya block bi a, sɛnea saa block no du ntɛmntɛm no na ɛkyerɛ mpɛn dodow a ɛbɛyɛ nyisaa, a ɛkyerɛ sɛ ɛhwere ntrɛwmu mmirikatu no na akatua a ɛwɔ ho no ayera. Relay no de blocks kɔ anim wɔ mpɔtam anan mu denam compact block relay a ɛwɔ anim mfomso nteɛso so.

Ɔmanfoɔ dashboard no kyerɛ nkɛntɛnsoɔ no live: relay-connected regions hu blocks foforɔ wɔ berɛ a plain peer to peer gossip gye no nnu fã koraa, na dashboard no di network no live orphan rate akyi.

Eyi yɛ nhyehyɛe a wɔde yɛ adwuma ma wɔn a wɔyɛ atare, na ɛnyɛ ankorankoro a wotu fagude. Sovright no yɛ obi a ɔde ne ho ahyɛ mu `mining-infra` akoraeɛ nkrataa a `submitblock` relay gateway ma fanning huu blocks kɔ mesh no mu ntɛmntɛm sen native P2P. Sɛ wopɛ sɛ wo ne Sovright di nkitaho tẽẽ (support@sovright.com) na woanya relay peer address ne auth key.


## Afotu ne Nneyɛe Pa
- **Mfaso:** Fa akontaabu mfiri te sɛ whattomine.com/coins/166-zec-equihash di dwuma. Nhwɛsoɔ: RTX 3060 (~300 Sol/s) nya ~0.001 ZEC/da wɔ $50/ZEC, a wɔayi ~$0.50 anyinam ahoɔden afiri mu.
- **Kokoamsɛm:** Fa shielded pools di dwuma sɛ ɛwɔ hɔ a; kwati sɛ wobɛsan de address ahorow adi dwuma bio.
- **Ahobanbɔ:** Fa asɛmfua a ɛyɛ den di dwuma; ma 2FA nyɛ adwuma wɔ pools/wallets so. Mfa kokoam safe nkyɛ da.
- **Ɔhaw ano aduru:** Sɛ kyɛfa biara nni hɔ a, hwɛ firewall, antivirus, anaa config a ɛnteɛ. Kɔka nhyiamu te sɛ forum.zcashcommunity.com anaa Reddit r/zec ho.
- **Alternatives:** Sɛ mfaso nni so a, susuw cloud mining anaasɛ staking sika afoforo.
- **Nneɛma a Atwa Yɛn Ho Ahyia Ho Nsɛm:** Tumi a wotu no gye ahoɔden; fa nneɛma a wɔyɛ no foforo di dwuma sɛ ɛbɛyɛ yiye a.
- **Nsakraeɛ:** Zcash betumi adan (e.g., PoS nsakraeɛ a ɛbɛtumi aba); hwɛ z.cash mu na woanya nsɛm ho amanneɛbɔ.
