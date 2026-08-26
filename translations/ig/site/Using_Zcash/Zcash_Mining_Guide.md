# Zcash Mining Guide: Ịbanye na Ngwuputa Ọdụdọ Na Ngwaọrụ Onwe Onye

## Okwu Mmalite

Zcash (ZEC) is a privacy-focused cryptocurrency that uses the Equihash proof-of-work algorithm for mining. Mining Zcash involves using computational power to solve complex mathematical problems, validating transactions, and securing the network in exchange for ZEC rewards. Due to the network's high difficulty, solo mining is not recommended for most users. Joining a mining pool is the best way to earn consistent rewards by combining your hash power with others.

This guide focuses on mining Zcash using personal hardware (e.g., a home PC with GPUs or entry-level ASICs). Note that while GPUs can still mine Zcash, ASICs are far more efficient and profitable in 2026 due to network difficulty. Always check current profitability using tools like WhatToMine.com, as factors like electricity costs, hardware prices, and ZEC value affect viability. Mining may not be profitable for everyone; research local regulations and energy rates (aim for < $0.08/kWh).


## Ihe ndị a chọrọ

### Akụrụngwa akụrụngwa
- **GPU Mining (Nhazi nkeonwe akwadoro maka ndị mbido):**
  - NVIDIA ma ọ bụ AMD GPUs na dịkarịa ala 4GB VRAM (dịka, NVIDia GTX 1070, RTX 3060; AMD RX 580 ma ọ̄ bụ ka mma).
  - A motherboard dakọtara, PSU zuru ezu (opekata mpe 750W maka ọtụtụ GPU), na ezigbo jụrụ iji gbochie ikpo oke ọkụ.
  - Multi-GPU rigs bụ ihe a na-ahụkarị maka ọnụego hash ka mma (dịka ọmụmaatụ, 6x GPU nwere ike nweta 1-2 kSol / s).
- ** ASIC Mining (Ọdịmma Karịa Ma Ọnụ Ahịa Dị Elu):**
  - Equihash-dakọtara ASICs dị ka Bitmain Antminer Z15 (420 kSol / s) ma ọ bụ Innosilicon A9 (50 kSOL / s).
  - Ndị a na-ada ụda, ọkụ karị ma jiri ike karịa (dịka 1500W +); adabara maka oghere ndị raara onwe ha nye. Zụta site n'aka ebe ama ama dịka Bitmain.com ma ọ bụ resellers (Blockware Mining).
- **General:** Stable internet, a computer for setup/monitoring. ASICs na-achịkwa netwọkụ (~13 GSol / s hashrate zuru ezu na 2026), na -eme ka GPU mining ghara ịsọ mpi mana ọ ga - ekwe omume maka ndị nwere mmasị.

### Akụrụngwa kọmputa
- ** Sistemụ arụmọrụ:** Windows 10/11, Linux (Ubuntu na-atụ aro maka nkwụsi ike).
- ** Ngwuputa Software:**
  - Maka GPUs: lolMiner (na-akwado AMD/NVIDIA), GMiner, ma ọ bụ miniZ (n'ilekwasị anya na NVIDIA). Download site n'aka ndị ọrụ GitHub repositories (dịka ọmụmaatụ, github.com/Lolliedieb/lolMiner-releases)
  - Maka ASICs: Jiri onye nrụpụta wuru na firmware / dashboard (dịka ọmụmaatụ, Bitmain si web interface).
- ** Wallet:** Akpa ego Zcash iji nata ịkwụ ụgwọ. Na-atụ aro ya:
  - Echebe (nkeonwe): Zodl Wallet, Zingo (Mobile/Desktop) YWallet (mobile/desktop).
  - Ihe na-enweghị ihe ọ bụla (dị mfe ma obere nzuzo): Edge Wallet, Zecwallet Lite.
  - Nbudata site na ebe a: [obere akpa ego](https://zechub.wiki/wallets). Mepụta adreesị echedoro (na-amalite na 'zs') maka nzuzo ma ọ bụrụ na ọdọ mmiri ahụ kwadoro ya.

### Ndị ọzọ
- Eletrik: Gbakọọ ụgwọ. GPU na-eji 150-300W kwa kaadị; ASICs 1000W+.
- Antivirus: Gbanyụọ ya n'oge nhazi ka ọ nwere ike ịkpata ndị na-egwu akụ dịka ihe iyi egwu.

## Ntuziaka Nzọụkwụ-site-nzọụkwụ Iji Jikọọ na Mmiri Ngwuputa Mmanụ Ala

### Nzọụkwụ 1: Tọọ obere akpa Zcash gị
1. Budata ma wụnye obere akpa site na ebe nrụọrụ weebụ Zcash. [obere akpa ego](https://zechub.wiki/wallets).
2. Mepụta obere akpa ego ọhụrụ ma chekwaa mkpụrụ okwu gị n'ụzọ dị nchebe.
3. Nweta adreesị nnata (ọkacha mma maka nzuzo). Dee ya, dịka ọmụmaatụ: `zs1exampleaddress...`.
4. Ọ bụrụ na iji adreesị doro anya (na-amalite site 't'), ọ dị mfe ma nye obere nzuzo.

### Nke Abụọ: Kwadebe Ihe Ndị Ị Ga-eji Na-arụ Ọrụ n'Ụlọ Gị
- Maka GPU:
  1. Wụnye GPUs na PC gị ma melite ndị ọkwọ ụgbọala (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. N'elu elekere ma ọ bụrụ na enwetara (jiri MSI Afterburner maka nkwụsi ike; gbado anya +100-200 isi elekere, -500 ebe nchekwa maka arụmọrụ).
- Maka ASICs:
  1. Jikọọ ASIC na ike na Ethernet.
  2. Chọta adreesị IP ya site na iji ngwá ọrụ dịka Advanced IP Scanner ma ọ bụ ngwa nke onye nrụpụta.
  3. Nweta dashboard weebụ (dịka, tinye IP na ihe nchọgharị ahụ, nbanye ndabara: mgbọrọgwụ / mgbọrọkpụ maka Bitmain).

**Iwu:** Gbaa mbọ hụ na ikuku ruru eru; igwupụta ihe ọkụkụ na-emepụta okpomọkụ. Malite obere iji nwalee ya.

### Nzọụkwụ 3: Họrọ ma sonyere na ọdọ mmiri Ngwuputa
Igwe mmiri na-ekesa ọrụ ma kesaa ụgwọ ọrụ dabere na hashrate gị. Họrọ dabere na ego (0-2%), ịkwụ ụgwọ kacha nta (0.01-0.1 ZEC), ọnọdụ (obere ping) yana ntụkwasị obi.

**Nkwado ndị a tụrụ aro (Dabere na Hashrate, Ụgwọ, na Nyocha):**
- **2Miners (zec.2miners.com)**: 1% ụgwọ, PPLNS ịkwụ ụgwọ, na-akwado GPU / ASIC / NiceHash. High hashrate (~ 1.17 GSol/s), ndị ọrụ a pụrụ ịdabere na ya.
- **F2Pool (zec.f2pool.com)**: 2% ụgwọ, PPS + ịkwụ ụgwọ, nkwado ọtụtụ mkpụrụ ego. Nnukwu ọdọ mmiri (~2.57 GSol / s).
- **ViaBTC (zec.viabtc.com)**: 2% ụgwọ (PPS +), onye ọrụ enyi na enyi dashboard, sava ụwa niile.
- **AntPool (zec.antpool.com)**: 1% ụgwọ, site Bitmain, dị mma maka ASICs (~ 494 MSol / s).
- ** Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool)**: Professional Zcash mining pool by Foundry Digital . Na -eji PPLNS ịkwụ ụgwọ, na -enye nsuso mmeghachi omume nke ọma yana nkwado ụlọ ọrụ. Ezigbo mma maka ndị ọrụ ASIC na nnukwu igwe; chọrọ nyocha akaụntụ.
- **Sovright (mining.sovright.com)**: A Zcash ọdọ mmiri wuru na Stratum V2, ugbu a na-agba ọsọ dị ka ọha testnet. Ọ dịghị ndụ ZEC payouts ma, otú emeso ya dị ka ụzọ nwalee gị ntọlite kama ego isi iyi. Lee raara onwe ngalaba n'okpuru maka nkọwa.
- Ndị ọzọ: Kryptex Pool, Luxor (lelee poolwatch.io/coin/zcash maka ọnụ ọgụgụ oge).

1. Gaa na ebe nrụọrụ weebụ ọdọ mmiri ma mepụta akaụntụ (email ma ọ bụ enweghị ndebanye aha maka ụfọdụ dị ka 2Miners).
2. Tinye adreesị obere akpa Zcash gị na ntọala maka ịkwụ ụgwọ.
3. Rịba ama ihe nkesa stratum nke ọdọ mmiri (dịka, zec.2miners.com:1010) na ọdụ ụgbọ mmiri ahụ.

### Nzọụkwụ 4: Wụnye na Hazie Ngwuputa Software
- Maka GPU (Ihe Nlereanya: lolMiner na Windows/Linux):
  1. Budata lolMiner site na GitHub (ụdị kachasị ọhụrụ, dịka 1.88).
  2. Wepụ na folda.
  3. Mepụta faịlụ batch (start.bat) na nhazi:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Dochie ya . `YOUR_WALLET_ADDRESS` na adreesị ZEC gị.
     - `WORKER_NAME`: Aha maka rig gị (dịka, Rig1).
     - Maka EU sava: eu.zec.2miners.com:1010.
  4. Gbaa faịlụ batch ahụ, ọ ga-ejikọ na ọdọ mmiri ma malite igwupụta akụ.
- Maka ASICs (Ihe Nlereanya: Bitmain Antminer):
  1. Banye na dashboard weebụ.
  2. Gaa na Nhazi Miner.
  3. Tinye nkọwapụta ọdọ mmiri:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Aha njirimara: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Okwuntughe: x (ma ọ bụ oghere).
  4. Chekwaa ma malitegharịa onye na-egwu ihe.
- Maka ndị ọzọ software (eg, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Ule:** Na-agba ọsọ maka 10-15 nkeji; lelee njikwa maka òkè na hashrate a nabatara.

### Nzọụkwụ 5: Malite Igwupụta na Nyochaa
1. Bido onye na-egwu ala: ọ ga - ejikọ ya na ọdọ mmiri wee bido itinye òkè.
2. Nyochaa site na:
   - Pool dashboard: Tinye adreesị obere akpa gị iji hụ hashrate, nguzozi akwụghị ụgwọ na stats.
   - Ihe ngwanrọ: Lelee maka njehie, okpomọkụ (dobe < 80 degrees C).
   - Ngwaọrụ: Jiri HiveOS ma ọ bụ SimpleMining OS maka njikwa rig dịpụrụ adịpụ.
3. Ịkwụ Ụgwọ: Ihe ka ọtụtụ n'ụyọkọ ego ndị a na-akwụ ụgwọ ha ozugbo i ruru ihe dị ala (dịka, 0.05 ZEC).

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet Pool na Relay Network

Sovright (sovright.com) na-agba ọsọ Stratum V2 mining pool and a separate block relay network Ha nwere ọrụ dị iche, ya mere ha kpuchiri nkewa n'okpuru ebe a.

### Mining Pool (mining.sovright.com)

Ebe Sovright na-agba ọsọ n'elu Zcash testnet (NU6, Stratum V2), ọ bụghị mainnet. Testnet anaghị akwụ ezigbo ụgwọ ZEC. Jiri ya iji nwalee nhazi nke onye ọrụ gị, ọ bụghị ịkpata ego.

- Enweghị akaụntụ achọrọ ịmalite. Gosi CPU ma ọ bụ ASIC Equihash miner na ọdọ mmiri ahụ, òkè gị ga-apụta n'elu dashboard dị ndụ.
- Sovright na-ebipụtakwa ihe nnọchiteanya Stratum V2 mepere emepe maka ndị ọrụ mọnk chọrọ ịhọrọ ndebiri nke ha kama ịnara naanị ebe a:

### Nlekota Foundry Zcash Pool

Maka ndị ọrụ Zcash Pool nke Foundry:

- Nyochaa arụmọrụ ndị na-egwu ala site n'igbe mmiri nke Foundry.
- Lelee:
  - Ndị ọrụ na-arụsi ọrụ ike
  - Akuko hashrate a kọrọ akụkọ ya
  - Eke ndị a nabatara
  - Ihe a na-atụ anya inweta n'aka ha
  - Ọnọdụ ịkwụ ụgwọ

N'ihi na Foundry jiri ihe nlele ụgwọ ọrụ PPLNS, ụgwọ ọrụ igwupụta akụ dabere na mbak enyere aka karịa windo onyinye ọdọ mmiri kama ịbụ naanị hashrate ozugbo.

Usoro nlekota oru akwadoro:
- Tụlee ASIC dashboard hashrate na Foundry kọrọ hashrate.
- Nyochaa òkè ndị a jụrụ ajụ, nke ochie ma ọ bụ njikọ ejighị n'aka.
- Debe njikọ netwọkụ kwụsiri ike n'ihi na nkwụsị oge belata òkè ndị a tụrụ aro yana ụgwọ ọrụ nwere ike.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Tinye onye na-egwu gị n'ebe proxy nọ kama igwu mmiri ozugbo:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  iji aha onye ọrụ dịka: `yourname.rig1`.
- Peeji nke nghọta Sovright na-ekwu maka iwu "gụnyere niile" maka azụmahịa echekwara, n'adịghị ka ụfọdụ ọdọ mmiri ndị na -enyocha ha. Nke ọ bụla ga - enweta akwụkwọ akaebe edepụtara ya ka enwere ike ịlele usoro ahụ n'adabereghị onwe gị.
- Mepụta akaụntụ na mining.sovright.com (Google ma ọ bụ email banye) iji soro ndị ọrụ gị kama ịlele data dashboard ahụ.

### Nkwado Network (relay.sovright.com)

Sovright separately runs a public block relay network on Zcash mainnet. When a pool finds a block, how fast that block reaches the rest of the network determines how often it gets orphaned, meaning it loses the propagation race and the reward for it is lost. The relay forwards blocks across four regions using compact block relay with forward error correction.

The public dashboard shows the effect live: relay-connected regions see new blocks in well under half the time plain peer to peer gossip takes, and the dashboard tracks the network's live orphan rate.

Nke a bụ akụrụngwa maka ndị na-arụ ọrụ ọdọ mmiri, ọ bụghị onye ọ bụla n'ime ha. Sovright si oghe isi iyi `mining-infra` akwụkwọ nchekwa a `submitblock` relay gateway maka fanning hụrụ blocks n'ime ntupu ngwa ngwa karịa P2P. Iji jikọọ, kpọtụrụ Sovright ozugbo (support@sovright.com) maka adreesị ibe na-agagharị agagharị na igodo edemede.


## Atụmatụ na Omume Ndị Kasị Mma
- ** Uru:** Jiri ihe mgbako dị ka whattomine.com/coins/166-zec-equihash Ihe Nlereanya: RTX 3060 (~ 300 Sol / s) na - enweta ~ 0.001 ZEC kwa ụbọchị $ 50 / ZEC, gbanyụọ ọkụ eletrik ~ $.50 .
- **Nzuzo:** Jiri ọdọ mmiri ndị e chebere ma ọ bụrụ na ha dị; zere iji adreesị eme ihe ọzọ.
- **Nche:** Jiri okwuntughe siri ike; mee ka 2FA na ọdọ mmiri / wallets. Ejila igodo nzuzo eme ihe.
- **Idozi nsogbu:** Ọ bụrụ na enweghị òkè, lelee firewall, antivirus ma ọ bụ config ezighi ezi. Jikọọ forums dị ka forum.zcashcommunity.com or Reddit r/zec .
- ** Nhọrọ:** Ọ bụrụ na ọ bụghị uru, tụlee igwe ojii ma ọ bụ itinye ego ndị ọzọ.
- **Ihe banyere gburugburu ebe obibi:** Igwe na-eji ike eme ihe; jiri isi mmalite ndị a pụrụ imeghari emegharị ma ọ bụrụ na o kwere omume.
- ** Mmelite:** Zcash nwere ike imepe (dịka, mgbanwe PoS); lelee z.cash maka akụkọ ọhụrụ.
