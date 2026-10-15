# Zcash Mining Guide: Sɛ wode Ankorankoro Hardware bɛka Mining Pool ho

## Nnianimu

Zcash (ZEC) yɛ cryptocurrency a ɛtwe adwene si kokoamsɛm so a ɛde Equihash proof-of-work algorithm di dwuma ma mining. Mining Zcash hwehwɛ sɛ wɔde kɔmputa tumi di dwuma de di akontaabu mu haw ahorow a ɛyɛ den ho dwuma, wɔma nkitahodi ahorow no yɛ nokware, na wɔbɔ netɛw no ho ban de sesa ZEC akatua. Esiane sɛ network no yɛ den kɛse nti, wɔmfa solo mining nkamfo mma wɔn a wɔde di dwuma dodow no ara. Sɛ wode wo ho hyɛ mining pool mu a, ɛyɛ ɔkwan a eye sen biara a wobɛfa so anya akatua a ɛkɔ so daa denam wo hash tumi a wode bɛka afoforo ho no so.

Saa akwankyerɛ yi twe adwene si Zcash a wɔde ankorankoro hardware di dwuma so (sɛ nhwɛso no, ofie PC a ɛwɔ GPUs anaa entry-level ASICs). Hyɛ no nsow sɛ bere a GPUs da so ara tumi tu Zcash, ASICs yɛ adwuma yiye koraa na mfaso wɔ so wɔ afe 2026 mu esiane ntwamutam a ɛyɛ den nti. Bere nyinaa fa nnwinnade te sɛ WhatToMine.com hwɛ mfaso a ɛwɔ hɔ mprempren, efisɛ nneɛma te sɛ anyinam ahoɔden ho ka, hardware bo, ne ZEC bo ka sɛnea ɛbɛyɛ yiye. Ebia mfaso remma obiara a wotu fagude; nhwehwɛmu mpɔtam hɔ mmara ne ahoɔden dodow (bɔ mmɔden sɛ wubenya < $0.08/kWh).


## Ahwehwɛde ahorow

### Hardware a wɔde yɛ nneɛma
- **GPU Mining (Wɔkamfo Ankorankoro Nhyehyɛe Ma Wɔn a Wɔafi Ase):**
  - NVIDIA anaa AMD GPU ahorow a anyɛ yiye koraa no ɛwɔ 4GB VRAM (sɛ nhwɛso no, NVIDIA GTX 1070, RTX 3060; AMD RX 580 anaa nea eye sen saa).
  - Motherboard a ɛne no hyia, PSU a ɛdɔɔso (anyɛ yiye koraa no 750W ma GPU ahorow pii), ne onwini pa a ɛbɛma ayɛ hyew dodo.
  - Multi-GPU rigs abu so ma hash rates a eye (sɛ nhwɛso no, 6x GPUs tumi nya 1-2 kSol/s).
- **ASIC Mining (Ɛyɛ adwuma yiye nanso ɛho ka yɛ kɛse):**
  - ASIC ahorow a ɛne Equihash hyia te sɛ Bitmain Antminer Z15 (420 kSol/s) anaa Innosilicon A9 (50 kSol/s).
  - Eyinom yɛ den, ɛyɛ hyew, na ɛgye ahoɔden pii (sɛ nhwɛso no, 1500W+); a ɛfata ma mmeae a wɔahyira so. Kɔtɔ fi mmeae a agye din te sɛ Bitmain.com anaa wɔn a wɔtɔn nneɛma foforo (Blockware Mining).
- **General:** Intanɛt a ɛyɛ den, kɔmputa a wɔde hyehyɛ/hwɛ so. ASICs di ntwamutam no so (~13 GSol/s total hashrate wɔ 2026 mu), ɛma GPU mining nyɛ akansi kɛse nanso ɛda so ara yɛ yiye ma wɔn a wɔpɛ anigyede.

### Software
- **Adwumayɛ Nhyehyɛe:** Windows 10/11, Linux (Ubuntu kamfo kyerɛ sɛ ɛnyɛ den).
- **Software a wɔde tu fagude:**
  - Wɔ GPU ahorow ho: lolMiner (ɛboa AMD/NVIDIA), GMiner, anaa miniZ (ɛde n’adwene si NVIDIA so). Twe fi GitHub repos a ɛyɛ aban de (sɛ nhwɛso no, github.com/Lolliedieb/lolMiner-releases).
  - Wɔ ASICs ho: Fa firmware/dashboard a wɔde ahyɛ mu no di dwuma (sɛ nhwɛso no, Bitmain wɛb interface).
- **Wallet:** Zcash sika kotoku a wɔde gye sika a wotua. Susu ma:
  - Wɔabɔ ho ban (ankorankoro): ZODL Sikakorabea, Zingo (Mobile/Desktop), Zkool (mobile/desktop).
  - Ɛyɛ nea ɛda adi pefee (ɛyɛ mmerɛw nanso ɛnyɛ kokoam de): Edge Wallet, Zecwallet Lite.
  - Twe fi [sika kotoku](https://zechub.wiki/wallets). Yɛ address a wɔabɔ ho ban (ɛhyɛ aseɛ wɔ 'zs') ma kokoamsɛm sɛ pool no boa a.

### Foforɔ
- Ɛlektrik: Bu ɛka a wɔbɔ ho akontaa. GPU ahorow de 150-300W di dwuma wɔ kaad biara mu; ASICs 1000W + na ɛwɔ hɔ.
- Antivirus: Disable bere a woreyɛ nhyehyɛe efisɛ ebetumi ahyɛ miners frankaa sɛ ahunahuna.

## Akwankyerɛ a Ɛfa Anamɔn biara Ho a Ɛfa Ho a Wobɛka Mining Pool Ho

### Anamɔn 1: Siesie Wo Zcash Wallet
1. Twe na fa sika kotoku bi fi Zcash wɛbsaet a ɛyɛ aban de no so [sika kotoku](https://zechub.wiki/wallets).
2. Yɛ sika kotoku foforo na fa wo aba kasasin no sie yiye.
3. Yɛ address a wogye (ɛbɛyɛ papa sɛ wɔabɔ ho ban ama kokoamsɛm). Hyɛ no nsow, s.e., `zs1exampleaddress...`.
4. Sɛ wode address a ɛda adi (fi ase wɔ 't') redi dwuma a, ɛyɛ mmerɛw nanso ɛmma kokoamsɛm pii.

### Anamɔn 2: Siesie Wo Hardware no
- Wɔ GPU ahorow ho no:
  1. Fa GPU ahorow hyɛ wo PC mu na fa draiver ahorow no foforo (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Overclock sɛ wowɔ osuahu a (fa MSI Afterburner di dwuma ma ɛyɛ den; fa w’ani si so sɛ +100-200 core clock, -500 memory ma efficiency).
- Wɔ ASIC ahorow ho no:
  1. Fa ASIC no bata tumi ne Ethernet ho.
  2. Hwehwɛ ne IP address denam adwinnade te sɛ Advanced IP Scanner anaa nea ɔyɛe no app so.
  3. Kɔ wɛb dashboard no so (sɛ nhwɛso no, hyɛ IP wɔ brawsa mu, default login: root/root ma Bitmain).

**Kɔkɔbɔ:** Hwɛ sɛ mframa pa bɛkɔ mu; a wotu fagude no ma ɔhyew ba. Fi ase ketewaa bi sɔ hwɛ.

### Anamɔn 3: Paw na Kɔka Mining Pool bi ho
Mining pools kyekyɛ adwuma na wɔkyɛ akatua a egyina wo hashrate a wode ama no so. Paw gyina sika a wotua (0-2%), sikatua a ɛba fam koraa (0.01-0.1 ZEC), beae (ping a ɛba fam), ne ahotoso so.

**Atare a Wɔkamfo Kyerɛ (Egyina Hashrate, Fees, ne Nhwehwɛmu so):**
- **2Miners (zec.2miners.com)**: 1% ka, PPLNS akatua, boa GPU / ASIC / NiceHash. Hashrate a ɛkorɔn (~1.17 GSol/s), server ahorow a wotumi de ho to so.
- **F2Pool (zec.f2pool.com)**: 2% ka, PPS + akatua, sika pii mmoa. Ɔtare kɛse (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 2% fee (PPS +), dashboard a ɛyɛ mmerɛw sɛ wode bedi dwuma, wiase nyinaa server ahorow.
- **AntPool (zec.antpool.com)**: 1% fee, fi Bitmain, eye ma ASICs (~ 494 MSol / s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Zcash a wotu fagude a wɔyɛ adwumaden a Foundry Digital yɛe. Ɔde PPLNS sikatua di dwuma, de akatua akyi di a ɛda adi pefee ne adwumayɛbea-grade mmoa ma. Ɛfata yiye ma ahyehyɛde ne akɛse ASIC a wotu fagude; hwehwɛ sɛ wɔyɛ akontaabu no mu nokware.
- **Sovright (mining.sovright.com)**: Zcash pool a wɔasi wɔ Stratum V2 so, mprempren ɛreyɛ adwuma sɛ ɔmanfo testnet. No live ZEC payouts yet, enti fa no sɛ ɔkwan a wobɛfa so asɔ wo nhyehyɛe ahwɛ sen sɛ ɛbɛyɛ sika a wonya fibea. Hwɛ ɔfã a wɔahyira so wɔ ase hɔ no na woanya nsɛm no mu nsɛm.
- Afoforo: Kryptex Pool, Luxor (hwɛ poolwatch.io/coin/zcash na woanya bere ankasa mu akontaabu).

1. Kɔ pool no wɛbsaet hɔ na yɛ akontaabu (email anaasɛ wonkyerɛw wɔn din mma ebinom te sɛ 2Miners).
2. Fa wo Zcash sika kotoku address ka nhyehyɛe a wode tua sika no ho.
3. Hyɛ pool no stratum server (sɛ nhwɛso no, zec.2miners.com:1010) ne port no nsow.

### Anamɔn 4: Install na Hyehyɛ Mining Software
- Wɔ GPU ahorow ho (Nhwɛso: lolMiner wɔ Windows/Linux):
  1. Twe lolMiner fi GitHub (nsɛm a aba foforo, s.e., 1.88).
  2. Yi fi mu kɔ folda bi mu.
  3. Yɛ batch fael (start.bat) a ɛwɔ nhyehyeɛ:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Hyɛ anan mu `YOUR_WALLET_ADDRESS` ne wo ZEC address no.
     - `WORKER_NAME`: Edin a wɔde frɛ wo rig (sɛ nhwɛso no, Rig1).
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
- Sɛ wopɛ softwea afoforo (sɛ nhwɛso no, GMiner):
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
3. Akatua: Pool dodow no ara tua ho ka ara kwa bere a woadu nea esua koraa (sɛ nhwɛso no, 0.05 ZEC). Hwɛ pool ho mmara.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet Pool ne Relay Ntrɛwmu

Sovright (sovright.com) yɛ Stratum V2 mining pool ne block relay network a ɛyɛ soronko. Wɔyɛ nnwuma ahorow, enti wɔaka ho asɛm wɔ ɔkwan soronko so wɔ ase hɔ.

### Ɔtare a Wɔde Tu Fam (mining.sovright.com)

Sovright's pool no tu mmirika wɔ ɔmanfo Zcash testnet (NU6, Stratum V2), ɛnyɛ mainnet so. Testnet no ntua ZEC. Fa di dwuma de sɔ wo miner nhyehyɛe no hwɛ, na ɛnyɛ sɛ wubenya sika.

- Ɛho nhia sɛ wɔde akontaabu biara fi ase. Twe adwene si CPU anaa ASIC Equihash miner bi so wɔ pool no so na wo kyɛfa no bɛda adi wɔ live dashboard so.
- Sovright nso tintim open source Stratum V2 proxy ma miners a wɔpɛ sɛ wɔpaw wɔn ankasa block templates sen sɛ wɔbɛfa pool no nnwuma kɛkɛ:

### Nneɛma a Wɔde Hwɛ Foundry Zcash Pool so

Wɔ Foundry Zcash Pool dwumadiefoɔ fam no:

- Hwɛ miner adwumayɛ denam Foundry pool dashboard no so.
- Hwɛ:
  - Adwumayɛfo a wɔyɛ nnam
  - Hashrate a wɔbɔɔ ho amanneɛ
  - Kyɛfa a wogye tom
  - Akatua a wɔabu akontaa
  - Payout tebea

Esiane sɛ Foundry de PPLNS akatua nhwɛsoɔ di dwuma nti, akatua a wɔde tu fagudeɛ no gyina kyɛfa a wɔde ma wɔ pool no akatua mfɛnsere so sene sɛ ɛbɛyɛ hashrate ntɛm ara nko ara.

Nneyɛe a wɔkamfo kyerɛ sɛ wɔmfa nhwɛ nneɛma so:
- Fa ASIC dashboard hashrate toto Foundry amanneɛbɔ hashrate ho.
- Hwehwɛ kyɛfa a wɔapow, kyɛfa a ayɛ dedaw, anaa nkitahodi a entumi nnyina mu.
- Kura ntwamutam nkitahodi a ɛyɛ den mu efisɛ bere a wɔde yɛ adwuma no brɛ kyɛfa a wɔde amena ne akatua a ebetumi aba no ase.
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
- Sovright's transparency krataafa no ka "include all" nhyehyeɛ ma shielded transactions, ɛnte sɛ pools bi a ɛyiyi mu. Block biara nya adansedie a wɔde wɔn nsa ahyɛ aseɛ sɛdeɛ ɛbɛyɛ a wɔbɛtumi ahwɛ nhyehyɛeɛ no mu wɔ wɔn ankasa mu.
- Yɛ akonta wɔ mining.sovright.com (Google anaa email sign in) na di w’ankasa adwumayɛfo akyi sen sɛ wobɛdi nhwɛsoɔ dashboard data no akyi.

### Relay Ntrɛwmu (relay.sovright.com)

Sovright soronko yɛ ɔmanfoɔ block relay network wɔ Zcash mainnet so. Sɛ ɔtare bi nya block bi a, sɛnea saa block no du ntɛmntɛm no na ɛkyerɛ mpɛn dodow a ɛbɛyɛ nyisaa, a ɛkyerɛ sɛ ɛhwere ntrɛwmu mmirikatu no na akatua a ɛwɔ ho no ayera. Relay no de blocks kɔ anim wɔ mpɔtam anan mu denam compact block relay a ɛwɔ anim mfomso nteɛso so.

Ɔmanfoɔ dashboard no kyerɛ nkɛntɛnsoɔ no live: relay-connected regions hu blocks foforɔ wɔ bere a plain peer to peer gossip gye no nnu fã koraa, na dashboard no di network no live orphan rate akyi.

Eyi yɛ nhyehyɛe a wɔde yɛ adwuma ma wɔn a wɔyɛ atare, na ɛnyɛ ankorankoro a wotu fagude. Sovright's obi a ɔde ne ho ahyɛ mu `mining-infra` akoraeɛ nkrataa a `submitblock` relay gateway ma fanning huu blocks kɔ mesh no mu ntɛmntɛm sen native P2P. Sɛ wopɛ sɛ wo ne Sovright di nkitaho tẽẽ (support@sovright.com) na woanya relay peer address ne auth key.


## Mining tia w’ankasa Zebra node

Biribiara a ɛwɔ atifi hɔ no kyerɛ wo miner no kyerɛ obi foforo ɔtare. Ɔkwan foforo ne sɛ w’ankasa wobɛma node bi ayɛ adwuma na woama wo mining software no abisa no sɛ ɔnyɛ adwuma. Esiane sɛ zcashd gyaee wɔ 18 July 2026 nti, ɛno kyerɛ sɛ [Zebra](/zcash-tech/zebra-full-node), node a ɔfã yi ka ho asɛm no.

Zebra's fã no sua na ɛyɛ pɔtee: ɛkyekye block templates na ɛgye blocks a wɔasiesie no tom wɔ ne RPC interface so. Wɔnam mining software so na ɛyɛ hashing no, na akatua a wɔkyɛ wɔ miners pii ntam no yɛ pool software adwuma. Sɛ́ ebia mining nkutoo benya block da bi no gyina wo kyɛfa wɔ network no hash rate mu, a ɔfã yi mmɔ mmɔden sɛ ebebu ho akontaa. Ɛno nti na nnianim asɛm a ɛwɔ krataafa yi so no nkamfo solo mining mma wɔn a wɔde di dwuma dodow no ara.

Anamɔn no di Zebra Nhoma nkratafa abien akyi, [Mining Zcash ne Zebra](https://zebra.zfnd.org/user/mining.html) ne [Mining ne Zebra wɔ Docker](https://zebra.zfnd.org/user/mining-docker.html), sɛnea na wɔgyinaa hɔ wɔ 8 Ɔkɔtɔberɛ 2026. Edin titire ne defaults sesa wɔ releases ntam, enti hwɛ Nwoma no ansa na wode wo ho ato baako so.

### Fa address a wobenya akatua no si hɔ

Yɛ config fael a ɛwɔ default nhyehyɛe no, afei sesa no:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Wɔhwehwɛ sɛ wonya address a ɔde tu fagude ([Nhoma: Miner address](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra gye P2PKH anaa P2SH address a ɛda adi pefee, Sapling address, anaa Unified Address. Sɛ wopɛ Unified Address a ɛwɔ receiver bɛboro baako a, Nhoma no ka sɛ Zebra tua receiver baako, "ɔpɛ Orchard, afei Sapling, afei transparent".

Safoa abien a wubetumi apaw no kɔ ade koro no ara mu `[mining]` ɔfa:

| Safoa | Nea ɛyɛ | To anohyeto |
|---|---|---|
| `extra_coinbase_data` | Ɔde ɔmanfoɔ tag, te sɛ pool din, ka coinbase input a ɛwɔ block biara a wobɛtu mu, wɔ Zebra's ankasa marker ([Nwomasua](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 baiti. Nea ɛboro saa no, "Zebra pow sɛ obefi ase" |
| `miner_memo` | Fa memo a wɔabɔ ho ban bata akatua a wɔde ba no ho. Nea ɛnte sɛ `extra_coinbase_data` ɛnyɛ baguam de: obi a ɔwɔ safoa a ɔde hwɛ address a ogye no nkutoo na obetumi akenkan ([Nwomasua](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 baiti. Ɛyɛ adwuma bere a akatua no kɔ obi a wagye kyɛm nkyɛn nkutoo. Na address a ɛda adi pefee no "komm nni nkɛntɛnso biara" |

### Bue RPC hyɛn gyinabea no

Mining software ne Zebra kasa wɔ JSON-RPC so, a ɛtra hɔ kosi sɛ wobɛma no address a obetie wɔ ([Nhoma: RPC ɔfã](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 yɛ RPC hyɛn gyinabea a ɛwɔ Mainnet so. `127.0.0.1` ma wotumi fi afiri koro no ara nkutoo so du hyɛn gyinabea no.

Esiane sɛ Zebra 2.0.0 nti kuki bɔ RPC port no ho ban, ɔkwan a ɛte sɛ nea zcashd de di dwuma no. Zebra kyerɛw kuki no bere a RPC awiei no afi ase na ɛpopa bere a wɔato mu no. Sɛnea wɔahyɛ no fael no te Zebra's cache directory mu, sɛ nhwɛso no `/home/user/.cache/zebra/.cookie` wɔ Linux, na ɛkura nkyerɛwde biako:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` de fael no kɔ baabi foforo. `rpc.enable_cookie_auth = false` dum check no, na ɛne no nko ara authentication a RPC port no wɔ: biribiara a ɛbɛtumi adu port no afei ɛbɛtumi afrɛ no.

### Fi ase Zebra na ma ɛnyɛ sync

```bash
zebrad
```

Zebra kenkan config no fi beae a wɔahyɛ da ayɛ no. Twam `-c /path/to/zebrad.toml` sɛ wode fael foforo bedi dwuma. Twɛn ma sync no nwie. Log no kyerɛ `sync_percent=100.000%` bere a ɛwɔ ([Nhoma: Ɔsebɔ a wotu mmirika](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Full Node a Ɛyɛ Fɛ](/zcash-tech/zebra-full-node) kata hardware ne disk space so.

### Hwɛ no wɔ getblocktemplate so

`getblocktemplate` ne frɛ a mining software yɛ na ama woanya adwuma, enti ɛno nso yɛ sɔhwɛ a ɛyɛ ntɛm sen biara ([Nhoma: Nsiesiei no a wɔsɔ hwɛ](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Fa wo cookie fael no mu nsɛm si ananmu `__cookie__:PASSWORD`:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Setup a ɛyɛ adwuma san de a `result` kasa tia mfuw a obi a otu fam hia, a ɛka ho `previousblockhash`, `coinbasetxn`, `target` ne `height`. Sɛ wode si hɔ a `extra_coinbase_data`, Nhoma no kyerɛkyerɛ sɛnea wubehu wo tag no mu `coinbasetxn.data`.

### Fa wo mining software no kyerɛ so

Ma wo mining anaa pool software no RPC awiei, `127.0.0.1:8232`, ne nea ɔde di dwuma no din ne ne password a efi kuki no mu. Nhoma no ka sɛ Zebra "boa RPC akwan a ehia na wɔde ayɛ mining pool software dodow no ara" ([Nhoma: Tu mmirika wɔ ɔtare bi a wotu fagude mu](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Nsɛm abien a wobɛkyerɛw afi Nhoma no mu ansa na woapaw software:

- **s-nomp yɛ sɔhwɛ nko ara.** Nhoma no frɛ ne s-nomp nhyehyɛe no "sɔhwɛ" na ɛka sɛ s-nomp "ne NU5, enti wɔagyae mining dwumadie binom". Ɛyɛ [Testnet akwankyerɛ](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) de ka ho sɛ s-nomp "wɔnyɛɛ no foforo wɔ aban kwan so mma NU5 anaa akyiri yi network upgrades" na ɛkyerɛ production miners sɛ wɔmfa pool software a ɛboa mprempren upgrades no ano.
- **Zebra de stack a wɔasiesie no mena.** Zebra akoraeɛ no wɔ Docker Compose nhyehyeɛ wɔ mu [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) ɛno na ɛhyɛ Zebra ase bom ne mining pool na, sɛ wobisa a, CPU miner. Pool a ɛwɔ mu no yɛ s-nomp na ɛfiri aseɛ wɔ Testnet so gye sɛ wosesa, enti fa no sɛ ɔkwan a wobɛfa so asua afã a ɛkɔ so no.

### Docker kwan no

Nhoma no kwan tiawa ne.. `zfnd/zebra` Docker mfonini, a address ne RPC port no twam sɛ nneɛma a atwa yɛn ho ahyia ([Nhoma: Mining ne Zebra wɔ Docker](https://zebra.zfnd.org/user/mining-docker.html)). Ahyɛdeɛ a ɛwɔ aseɛ ha no yɛ Book's a ɛwɔ nsakraeɛ baako: ɛtintim RPC port no wɔ host no loopback address nko ara so, enti mfiri foforɔ ntumi nkɔ hɔ.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Wei hyɛ Mainnet node ase, tintim P2P port (8233) wɔ Docker host no so, na ɛma RPC port (8232) no yɛ nea wotumi du fi host no ankasa nkutoo so. Print cookie no ne:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Kora `0.0.0.0` in `ZEBRA_RPC__LISTEN_ADDR`.** Ɛno ne address a Zebra tie wɔ ade a wɔde gu mu no mu. Docker de port a wɔatintim kɔ container no ankasa network interface so, enti Zebra bi retie `127.0.0.1` wɔ container no mu no rennye nkitahodi no, mpo mfi host no hɔ. No `127.0.0.1:` wɔ anim `-p` ne nea ɛma hyɛn gyinabea no nkɔ network no so.
- **Nwoma no ahyɛdeɛ** tintim RPC port no ne `-p 8232:8232`, a ɛbue no wɔ host no network interface biara so.
- **To practise on Testnet**, add `-e ZEBRA_NETWORK__NETWORK="Testnet"`, set `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, publish `-p 18233:18233` and `-p 127.0.0.1:18232:18232`, and give a Testnet address. A Mainnet address stops Zebra from starting on Testnet, and the other way round.

Akatua a wotua ma wɔn a wotu fagude no ne sika kotoku no a wodi ho dwuma no nni ɔfã yi akyi. Sɛ wopɛ sika kotoku no fã a, hwɛ [Zallet](/zcash-tech/zallet).

## Afotu ne Nneyɛe Pa
- **Mfaso:** Fa akontaabu mfiri te sɛ whattomine.com/coins/166-zec-equihash di dwuma. Nhwɛsoɔ: RTX 3060 (~300 Sol/s) nya ~0.001 ZEC/day wɔ $50/ZEC, a wɔayi ~$0.50 anyinam ahoɔden afiri mu.
- **Kokoamsɛm:** Fa shielded pools di dwuma sɛ ɛwɔ hɔ a; kwati sɛ wobɛsan de address ahorow adi dwuma bio.
- **Ahobanbɔ:** Fa asɛmfua a ɛyɛ den di dwuma; ma 2FA nyɛ adwuma wɔ pools/wallets so. Mfa kokoam safe nkyɛ da.
- **Ɔhaw ano aduru:** Sɛ kyɛfa biara nni hɔ a, hwɛ firewall, antivirus, anaa config a ɛnteɛ. Kɔka nhyiamu te sɛ forum.zcashcommunity.com anaa Reddit r/zec ho.
- **Akwan foforo:** Sɛ mfaso nni so a, susuw cloud mining anaasɛ staking sika afoforo ho.
- **Nneɛma a Atwa Yɛn Ho Ahyia Ho Nsɛm:** Tumi a wotu no gye ahoɔden; fa nneɛma a wɔyɛ no foforo di dwuma sɛ ɛbɛyɛ yiye a.
- **Nsakrae:** Zcash betumi adan (sɛ nhwɛso no, PoS nsakrae a ebetumi aba); hwɛ z.cash mu na woanya nsɛm ho amanneɛbɔ.
