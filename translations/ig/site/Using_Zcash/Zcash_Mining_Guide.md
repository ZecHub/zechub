<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zcash_Mining_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# Zcash Ntuziaka Ịgwụputa: Isonyere Pool Ịgwụputa Site na Ngwaike Nkeonwe

> Duo GPU gị ma ọ bụ ASIC gị gaa n'otu pool, kesaa ọrụ ahụ na ndị ọzọ na-egwụputa [miners], ma nweta ịkwụ ụgwọ ZEC na-adịgide adịgide kama ichere ọtụtụ afọ maka block nke unu ga-egwụputa naanị gị.

## TL;DR

* Zcash na-eji proof of work nke Equihash. ASICs na-achị network ahụ, ya mere a na-ejikarị GPUs eme ihe ntụrụndụ na nnwale.
* Ịgwụputa (mining) naanị gị anaghị ahụkarị block mgbe ngwá ọrụ (tools) gị dị ntakịrị. Pool na-ejikọta hashrate ma na-akwụ gị òkè nke block ọ bụla ọ chọtara.
* Ị chọrọ ihe atọ: Adreesị akpa ego (address) nke e-akpa ego (wallet) Zcash maka ịnata ego, ngwaike ịgwụputa, na sọftụwia ịgwụputa (ma ọ bụ dashboard nke ASIC wuru n'ime ya).
* Pools dị iche site n'ugwo (fee) (ihe dị ka 0-2%), ụzọ ịkwụ ụgwọ (PPLNS, PPS+), opekempe ego a na-akwụ, na ebe sava dị.
* Buru ụzọ lelee uru ọ ga-eweta: ọnụahịa ọkụ eletrik, ọnụahịa ngwaike, na ọnụahịa ZEC na-ekpebi ma ịgwụputa ọ ga-aba uru ma ọlị.
* Ụzọ dị elu: gbaa node Zebra nke gị ma gwụputa site na RPC `getblocktemplate` ya.

## Nkọwa Isi

Ịgwụputa [mining] bụ ụzọ e si emepụta block Zcash ọhụrụ. Ndị na-egwụputa [miners] na-asọ mpi idozi mgbagwoju anya Equihash; onye mbụ nwetara azịza ziri ezi na-agbakwunye block na-esote ma nweta ụgwọ ọrụ block ahụ. Ka hashrate (ike mgbakọ) Unu na-enye na-abawanye, ka Unu na-emeri ugboro ugboro, mana n'ihe gbasara network nke taa, otu igwe ịgwụputa nọ n'ụlọ agaghị enwe ike imeri n'onwe ya ọ fọrọ obere ka ọ bụrụ mgbe ọ bụla.

Mining pool na-edozi nke a. Pool ahụ na-enye onye na-egwụputa ọ bụla obere akụkụ ọrụ a na-akpọ shares. Share ọ bụla a nabatara na-egosi na Unu nyere aka n'ike hashrate. Mgbe onye ọ bụla nọ na pool ahụ chọtara block, a na-ekewa ụgwọ ọrụ ahụ dịka shares si dị, a na-akwụkwa Unu ụgwọ na-akpaghị aka ozugbo ego dị n'akaụntụ Unu gafere ego kacha nta pool ahụ kwadoro.

Nhazi a nwere akụkụ ise, nke a kọwara nzọụkwụ site na nzọụkwụ n'okpuru:

1. Adreesị akpa ego nke e-akpa ego (wallet address) iji nata ụgwọ a na-akwụ gị.
2. Ngwaike (hardware): GPU n'ime kọmputa (PC), ma ọ bụ Equihash ASIC.
3. Akaụntụ pool (ma ọ bụ naanị Adreesị akpa ego gị, maka pool ndị na-achọghị ndebanye aha).
4. Ngwanrọ ịgwụputa (mining software) e duziri gaa na sava stratum nke pool ahụ, nwere `YOUR_ADDRESS.WORKER_NAME` dịka aha onye ọrụ.
5. Nlekota: shares a nabatara, hashrate, okpomọkụ na ego fọdụrụ a na-akwụbeghị.

## Okwu Mmalite

Zcash (ZEC) bụ cryptocurrency lekwasịrị anya na Nzuzo [privacy] nke na-eji algọridim Equihash proof-of-work maka ịgwụputa [mining]. Ịgwụputa Zcash gụnyere iji ike mgbakọ dozie nsogbu mgbakọ na mwepụ dị mgbagwoju anya, kwado azụmahia [transactions], ma chekwaa netwọk n'ọnọdụ ụgwọ ọrụ ZEC. N'ihi oke ihe isi ike netwọk ahụ, a naghị akwado ịgwụputa naanị gị maka ọtụtụ ndị ọrụ. Isonyere pool ịgwụputa bụ ụzọ kacha mma isi nweta ụgwọ ọrụ na-adịgide adịgide site n'ijikọta ike hash gị na nke ndị ọzọ.

Ntuziaka a lekwasịrị anya n'ịgwụputa Zcash site na ngwaike nkeonwe (dịka ọmụmaatụ, PC ụlọ nwere GPU ma ọ bụ ASIC nke ọkwa mbido). Mara na ọ bụ ezie na GPU ka nwere ike ịgwụputa Zcash, ASIC na-arụ ọrụ nke ọma karị ma na-erite uru karị na 2026 n'ihi ihe isi ike netwọk. Na-enyocha uru dị ugbu a mgbe niile site na ngwá ọrụ [tools] dịka WhatToMine.com, n'ihi na ihe dịka ụgwọ ọkụ eletrik, ọnụahịa ngwaike, na uru ZEC na-emetụta ma ọ ga-ekwe omume. Ịgwụputa nwere ike ọ gaghị aba onye ọ bụla uru; nyochaa iwu mpaghara na ọnụego ike (gbalịa ịnọ n'okpuru $0.08/kWh).


## Ihe Achọrọ

### Ngwaike
- **Ịgwụputa GPU (Nhazi Nkeonwe Akwadoro Maka Ndị Mbido):**
  - NVIDIA ma ọ bụ AMD GPU nwere opekata mpe 4GB VRAM (dịka ọmụmaatụ, NVIDIA GTX 1070, RTX 3060; AMD RX 580 ma ọ bụ nke ka mma).
  - Motherboard dakọtara, PSU zuru ezu (opekata mpe 750W maka ọtụtụ GPU), na ezigbo sistemụ oyi iji gbochie ikpo oke ọkụ.
  - Rigs ọtụtụ GPU bụ ihe a na-ahụkarị maka ọnụego hash ka mma (dịka ọmụmaatụ, GPU 6x nwere ike iru 1-2 kSol/s).
- **Ịgwụputa ASIC (Na-arụ Ọrụ Nke Ọma Karị Mana Ọnụahịa Ya Dị Elu):**
  - ASIC dakọtara na Equihash dịka Bitmain Antminer Z15 (420 kSol/s) ma ọ bụ Innosilicon A9 (50 kSol/s).
  - Ndị a na-eme mkpọtụ karị, na-ekpo ọkụ karị, ma na-eri ike karịa (dịka ọmụmaatụ, 1500W+); ha dabara maka ebe pụrụ iche. Zụta n'aka ebe a tụkwasịrị obi dịka Bitmain.com ma ọ bụ ndị na-eregharị (Blockware Mining).
- **N'ozuzu:** Ịntanetị kwụsiri ike, kọmputa maka nhazi/nleba anya. ASIC na-achị netwọk ahụ (~13 GSol/s mkpokọta ọnụego hash na 2026), na-eme ka ịgwụputa GPU ghara ịsọ mpi nke ukwuu mana ka ga-ekwe omume maka ndị na-eme ya dịka ihe ntụrụndụ.

### Ngwanrọ
- **Sistemụ Ọrụ:** Windows 10/11, Linux (a na-akwado Ubuntu maka nkwụsi ike).
- **Ngwanrọ Ịgwụputa:**
  - Maka GPU: lolMiner (na-akwado AMD/NVIDIA), GMiner, ma ọ bụ miniZ (lekwasịrị anya na NVIDIA). Budata site na repos GitHub gọọmentị (dịka ọmụmaatụ, github.com/Lolliedieb/lolMiner-releases).
  - Maka ASIC: Jiri firmware/dashboard arụnyere nke onye nrụpụta (dịka ọmụmaatụ, web interface Bitmain).
- **E-akpa ego [wallet]:** E-akpa ego Zcash maka ịnata nkwụghachi. Ndị akwadoro:
  - Nke e chebere echebe [shielded] (nkeonwe): ZODL Wallet, Zingo (Mobile/Desktop), Zkool (mobile/desktop).
  - Oha [transparent] (dị mfe mana nzuzo ya dị ntakịrị): Edge Wallet, Zecwallet Lite.
  - Budata site na [wallets](https://zechub.wiki/wallets). Mepụta adreesị nke e chebere echebe (na-amalite na 'zs') maka Nzuzo ma ọ bụrụ na pool ahụ kwadoro ya.

### Ndị Ọzọ
- Eletrik: Gbakọọ ụgwọ. GPU na-eji 150-300W kwa kaadị; ASIC 1000W+.
- Antivirus: Gbanyụọ ya mgbe ị na-ahazi n'ihi na ọ nwere ike ịkọwa ndị miners dịka ihe egwu.

## Ntuziaka Nzọụkwụ-site-na-Nzọụkwụ Maka Isonyere Pool Ịgwụputa

### Nzọụkwụ 1: Hazie E-akpa ego Zcash Gị
1. Budata ma wụnye e-akpa ego site na webụsaịtị Zcash gọọmentị [wallets](https://zechub.wiki/wallets).
2. Mepụta e-akpa ego ọhụrụ ma chekwaa Mkpuru mgbake [seed phrase] gị nke ọma.
3. Mepụta adreesị nnata (ọkacha mma nke e chebere echebe maka Nzuzo). Detuo ya, dịka ọmụmaatụ, `zs1exampleaddress...`.
4. Ọ bụrụ na ị na-eji adreesị Oha (na-amalite na 't'), ọ dị mfe karị mana ọ na-enye Nzuzo dị ntakịrị.

### Nzọụkwụ 2: Kwadebe Ngwaike Gị
- Maka GPU:
  1. Wụnye GPU n'ime PC gị ma melite draịvụ (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Mee overclock ma ọ bụrụ na ị nwere ahụmahụ (jiri MSI Afterburner maka nkwụsi ike; gbado anya na +100-200 core clock, -500 memory maka arụmọrụ).
- Maka ASIC:
  1. Jikọọ ASIC na ọkụ eletrik na Ethernet.
  2. Chọta IP address ya site na ngwá ọrụ dịka Advanced IP Scanner ma ọ bụ app onye nrụpụta.
  3. Mepee web dashboard (dịka ọmụmaatụ, tinye IP n'ime browser, nbanye ndabara: root/root maka Bitmain).

**Ịdọ aka ná ntị:** Hụ na ikuku na-abanye nke ọma; ịgwụputa na-emepụta okpomọkụ. Malite obere iji nwalee.

### Nzọụkwụ 3: Họrọ ma Soro Pool Ịgwụputa
Pool ịgwụputa na-ekesa ọrụ ma kesaa ụgwọ ọrụ dabere na ọnụego hash ị nyere. Họrọ dabere na ugwo [fee] (0-2%), obere nkwụghachi (0.01-0.1 ZEC), ọnọdụ (ping dị ala), na ntụkwasị obi.

**Pool Ndị Akwadoro (Dabere na Ọnụego Hash, Ugwo, na Nyocha):**
- **2Miners (zec.2miners.com)**: ugwo 1%, nkwụghachi PPLNS, na-akwado GPU/ASIC/NiceHash. Ọnụego hash dị elu (~1.17 GSol/s), sava ndị a pụrụ ịtụkwasị obi.
- **F2Pool (zec.f2pool.com)**: ugwo 2%, nkwụghachi PPS+, nkwado ọtụtụ mkpụrụ ego. Nnukwu pool (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: ugwo 2% (PPS+), dashboard dị mfe iji, sava zuru ụwa ọnụ.
- **AntPool (zec.antpool.com)**: ugwo 1%, sitere na Bitmain, dị mma maka ASIC (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Pool ịgwụputa Zcash ọkachamara nke Foundry Digital. Ọ na-eji nkwụghachi PPLNS, na-enye nleba anya ụgwọ ọrụ Oha na nkwado ọkwa ụlọ ọrụ. Ọ kacha dabara ndị miners ASIC ụlọ ọrụ na ndị buru ibu; ọ chọrọ nkwenye akaụntụ.
- **Sovright (mining.sovright.com)**: Pool Zcash e wuru na Stratum V2, nke na-agba ugbu a dịka testnet ọhaneze. Enwebeghị nkwụghachi ZEC dị ndụ, yabụ were ya dịka ụzọ iji nwalee nhazi gị karịa ịbụ isi mmalite ego. Lee ngalaba pụrụ iche dị n'okpuru maka nkọwa.
- Ndị ọzọ: Kryptex Pool, Luxor (lelee poolwatch.io/coin/zcash maka ọnụ ọgụgụ ozugbo).

1. Gaa na webụsaịtị pool ahụ ma mepụta akaụntụ (email ma ọ bụ enweghị ndebanye aha maka ụfọdụ dịka 2Miners).
2. Tinye adreesị e-akpa ego Zcash gị na ntọala maka nkwụghachi.
3. Detuo sava stratum pool ahụ (dịka ọmụmaatụ, zec.2miners.com:1010) na port.

### Nzọụkwụ 4: Wụnye ma Hazie Ngwanrọ Ịgwụputa
- Maka GPU (Ihe Nlereanya: lolMiner na Windows/Linux):
  1. Budata lolMiner site na GitHub (ụdị kachasị ọhụrụ, dịka ọmụmaatụ, 1.88).
  2. Wepụ ya n'ime folda.
  3. Mepụta faịlụ batch (start.bat) nwere nhazi:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Dochie `YOUR_WALLET_ADDRESS` na adreesị ZEC gị.
     - `WORKER_NAME`: Aha maka rig gị (dịka ọmụmaatụ, Rig1).
     - Maka sava EU: eu.zec.2miners.com:1010.
  4. Gbaa faịlụ batch ahụ. Ọ ga-ejikọ na pool ma malite ịgwụputa.
- Maka ASIC (Ihe Nlereanya: Bitmain Antminer):
  1. Banye na web dashboard.
  2. Gaa na Miner Configuration.
  3. Tinye nkọwa pool:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Aha onye ọrụ: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Okwuntughe: x (ma ọ bụ hapụ ya ka ọ ghara ịdị).
  4. Chekwaa ma malitegharịa miner.
- Maka ngwanrọ ndị ọzọ (dịka ọmụmaatụ, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Nnwale:** Gbaa ya maka nkeji 10-15; lelee console maka shares anabatara na ọnụego hash.

### Nzọụkwụ 5: Malite Ịgwụputa ma Nyochaa
1. Mepee miner: ọ ga-ejikọ na pool ma malite izipu shares.
2. Nyochaa site na:
   - Dashboard pool: Tinye adreesị e-akpa ego gị iji hụ ọnụego hash, ego na-akwụghị, na ọnụ ọgụgụ.
   - Console ngwanrọ: Lelee maka njehie, okpomọkụ (debe ya n'okpuru ogo 80 C).
   - Ngwá ọrụ: Jiri HiveOS ma ọ bụ SimpleMining OS maka ijikwa rig n'ebe dị anya.
3. Nkwụghachi: Ọtụtụ pool na-akwụ na-akpaghị aka mgbe ị ruru opekatampe (dịka ọmụmaatụ, 0.05 ZEC). Lelee iwu pool.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


### Nleba anya Foundry Zcash Pool

Maka ndị ọrụ pool Foundry Zcash:

- Nyochaa arụmọrụ onye na-egwụputa (miner) site na dashboard nke Foundry pool.
- Lelee:
  - Ndị ọrụ (workers) na-arụ ọrụ
  - Hashrate a kọrọ akụkọ ya
  - Shares a nabatara
  - Ụgwọ ọrụ a tụrụ anya ya
  - Ọnọdụ ịkwụ ụgwọ (payout)

Ebe ọ bụ na Foundry na-eji ụdị ụgwọ ọrụ PPLNS, ụgwọ ọrụ ịgwụputa (mining) na-adabere n'òkè (shares) e nyere n'ime oge ụgwọ ọrụ nke pool ahụ, ọ bụghị naanị na hashrate nke oge ahụ.

Usoro nlekota a na-atụ aro:
- Tụlee hashrate dị na ASIC dashboard na hashrate nke Foundry kọrọ.
- Nyochaa shares a jụrụ, shares ochie (stale shares), ma ọ bụ njikọ na-adịghị kwụsiri ike.
- Nọgide na-enwe njikọ network kwụsiri ike, n'ihi na oge network adịghị na-ebelata shares e zitere na ụgwọ ọrụ nwere ike ịbịa.

## Sovright: Pool Testnet na Netwọk Relay

Sovright (sovright.com) na-agba pool ịgwụputa Stratum V2 na netwọk relay block dị iche. Ha na-arụ ọrụ dị iche iche, yabụ a kọwara ha iche iche n'okpuru.

### Pool Ịgwụputa (mining.sovright.com)

Pool Sovright na-agba na testnet Zcash ọhaneze (NU6, Stratum V2), ọ bụghị mainnet. Testnet anaghị akwụ ezigbo ZEC. Jiri ya nwalee nhazi miner gị, ọ bụghị iji nweta ego.

- Ọ dịghị akaụntụ achọrọ iji malite. Tụọ CPU ma ọ bụ ASIC Equihash miner gị gaa pool ahụ, shares gị ga-apụta na dashboard dị ndụ.
- Sovright na-ebipụtakwa proxy Stratum V2 open source maka ndị miners chọrọ ịhọrọ block templates nke ha kama ịnara naanị ọrụ pool:

  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Tụọ onye na-egwụputa gị (miner) n'ebe proxy ahụ kama ịtụ ya ozugbo na pool:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  site n'iji aha worker dị ka `yourname.rig1`.
- Peeji Oha (transparency) nke Sovright na-ekwupụta iwu …gụnye ihe niile… maka Azụmahia (transaction) nke e chebere echebe (shielded), n'adịghị ka ụfọdụ pool ndị na-ewepụ ha. Block ọ bụla na-enweta nkwenye e debanyere aka (signed attestation) ka e nwee ike inyocha iwu ahụ n'onwe ya.
- Mepụta akaụntụ na mining.sovright.com (banye site na Google ma ọ bụ email) iji soro ndị worker nke gị kama data ihe atụ dị na dashboard.

### Netwọk Relay (relay.sovright.com)

Sovright na-agba netwọk relay block ọhaneze iche na Zcash mainnet. Mgbe pool chọtara block, ọsọ block ahụ si ruo netwọk ndị ọzọ na-ekpebi ugboro ole a ga-eme ya orphaned, nke pụtara na ọ tufuru asọmpi mgbasa ma furu ụgwọ ọrụ ya. Relay ahụ na-ebufe blocks gafee mpaghara anọ site na compact block relay nwere forward error correction.

Dashboard ọhaneze na-egosi mmetụta ya ozugbo: mpaghara jikọtara na relay na-ahụ blocks ọhụrụ n'ime ihe na-erughị ọkara oge peer to peer gossip nkịtị na-ewe, dashboard ahụ na-esokwa ọnụego orphan netwọk dị ndụ.

Nke a bụ akụrụngwa maka ndị na-arụ pool, ọ bụghị ndị miners n'otu n'otu. Repository open source `mining-infra` nke Sovright na-edepụta gateway relay `submitblock` maka ịgbasa blocks achọtara n'ime mesh ọsọ karịa P2P nke mbụ. Iji jikọọ, kpọtụrụ Sovright ozugbo (support@sovright.com) maka adreesị peer relay na auth key.


## Ịgwụputa megide node Zebra nke gị

Ihe niile dị n'elu na-atụ miner gị gaa pool onye ọzọ. Ụzọ ọzọ bụ ịgba node n'onwe gị ma mee ka ngwanrọ ịgwụputa gị jụọ ya maka ọrụ. Ebe zcashd kwụsịrị na 18 Julaị 2026, nke ahụ pụtara [Zebra](/zcash-tech/zebra-full-node), node ngalaba a na-ekpuchi.

Ọrụ Zebra dị ntakịrị ma doo anya: ọ na-ewu block templates ma nabata blocks edoziworo n'elu interface RPC ya. Ngwanrọ ịgwụputa na-arụ hashing, ma ịkekọrịta ụgwọ ọrụ n'etiti ọtụtụ miners bụ ọrụ ngwanrọ pool. Ma ịgwụputa naanị gị ọ ga-achọta block dabere na òkè gị nke ọnụego hash netwọk, nke ngalaba a anaghị agbalị ịtụle. Nke ahụ bụ ihe mere okwu mmalite ibe a anaghị akwado ịgwụputa naanị gị maka ọtụtụ ndị ọrụ.

Nzọụkwụ ndị a na-agbaso ibe abụọ nke Zebra Book, [Ịgwụputa Zcash na Zebra](https://zebra.zfnd.org/user/mining.html) na [Ịgwụputa na Zebra n'ime Docker](https://zebra.zfnd.org/user/mining-docker.html), dịka ha dị na 8 Ọktoba 2026. Aha igodo na ndabara na-agbanwe n'etiti releases, yabụ lelee Book tupu ịdabere na nke ọ bụla.

### Tọọ adreesị na-anata ụgwọ ọrụ

Mepụta faịlụ config nwere ntọala ndabara, wee dezie ya:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Achọrọ adreesị miner ([Book: Adreesị miner](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra na-anabata adreesị Oha P2PKH ma ọ bụ P2SH, adreesị Sapling, ma ọ bụ Unified Address. Maka Unified Address nwere karịa otu receiver, Book na-ekwu na Zebra na-akwụ otu receiver, “na-ahọrọ Orchard, mgbe ahụ Sapling, mgbe ahụ Oha”.

Igodo nhọrọ abụọ na-aga n'otu ngalaba `[mining]`:

| Igodo | Ihe ọ na-eme | Oke |
|---|---|---|
| `extra_coinbase_data` | Na-agbakwunye tag Oha, dịka aha pool, na coinbase input nke block ọ bụla ị na-egwupụta, mgbe marker nke Zebra ([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) gachara | 86 bytes. Karịa nke ahụ, “Zebra jụrụ ịmalite” |
| `miner_memo` | Na-etinye memo nke e chebere echebe na output ụgwọ ọrụ. N'adịghị ka `extra_coinbase_data`, ọ bụghị Oha: naanị onye nwere viewing key [viewing key] maka adreesị nnata nwere ike ịgụ ya ([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 bytes. Ọ na-arụ ọrụ naanị mgbe ụgwọ ọrụ gara receiver nke e chebere echebe. Site na adreesị Oha, ọ “nwere enweghị mmetụta nwayọọ” |

### Mepee port RPC

Ngwanrọ ịgwụputa na-agwa Zebra okwu n'elu JSON-RPC, nke na-anọgide na-adịghị arụ ọrụ ruo mgbe ị nyere ya adreesị ọ ga-ege ntị na ya ([Book: ngalaba RPC](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 bụ port RPC ọkọlọtọ na Mainnet. `127.0.0.1` na-eme ka port ahụ ruo naanị site n'otu igwe ahụ.

Kemgbe Zebra 2.0.0, cookie na-echebe port RPC, usoro yiri nke zcashd ji. Zebra na-ede cookie mgbe RPC endpoint malitere ma hichapụ ya mgbe ọ kwụsịrị. Site na ndabara, faịlụ ahụ nọ na cache directory Zebra, dịka ọmụmaatụ `/home/user/.cache/zebra/.cookie` na Linux, ma nwee otu ahịrị:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` na-ebuga faịlụ ahụ. `rpc.enable_cookie_auth = false` na-agbanyụ nyocha ahụ, ya na naanị authentication port RPC nwere: ihe ọ bụla nwere ike iru port ahụ nwere ike ịkpọ ya.

### Malite Zebra ma kwe ka ọ sync

```bash
zebrad
```

Zebra na-agụ config sitere n'ebe ndabara. Nyefee `-c /path/to/zebrad.toml` iji jiri faịlụ ọzọ. Chere ka sync gwụ. Log na-egosi `sync_percent=100.000%` mgbe ọ gwụchara ([Book: Ịgba zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Full Node](/zcash-tech/zebra-full-node) na-ekpuchi ngwaike na ohere diski.

### Jiri getblocktemplate nyochaa ya

`getblocktemplate` bụ oku ngwanrọ ịgwụputa na-eme iji nweta ọrụ, yabụ ọ bụkwa nnwale kachasị ngwa ([Book: Ịnwale nhazi ahụ](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Tinye ọdịnaya faịlụ cookie gị n'ọnọdụ `__cookie__:PASSWORD`:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Nhazi na-arụ ọrụ na-eweghachite object `result` nwere fields miner chọrọ, tinyere `previousblockhash`, `coinbasetxn`, `target` na `height`. Ọ bụrụ na ị tọpụtara `extra_coinbase_data`, Book na-akọwa otu esi achọta tag gị n'ime `coinbasetxn.data`.

### Tụọ ngwanrọ ịgwụputa gị gaa na ya

Nye ngwanrọ ịgwụputa ma ọ bụ pool gị RPC endpoint, `127.0.0.1:8232`, na aha onye ọrụ na okwuntughe sitere na cookie. Book na-ekwu na Zebra “na-akwado usoro RPC ndị a chọrọ iji gbaa ọtụtụ ngwanrọ pool ịgwụputa” ([Book: Gbaa pool ịgwụputa](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Ihe ndekọ abụọ sitere na Book tupu ịhọrọ ngwanrọ:

- **s-nomp bụ naanị maka nnwale.** Book kpọrọ nhazi s-nomp ya “experimental” ma kwuo na s-nomp “adịghị dakọtara na NU5, yabụ ụfọdụ ọrụ ịgwụputa agbanyụrụ”. Ntuziaka [Testnet](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) ya na-agbakwụnye na s-nomp “emelitebeghị ya n'ihu ọha maka NU5 ma ọ bụ network upgrades ndị na-esote” ma tụọ miners mmepụta gaa na ngwanrọ pool na-akwado upgrades dị ugbu a.
- **Zebra na-ebunye stack emebere.** Repository Zebra nwere nhazi Compose Docker n'ime [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) nke na-amalite Zebra yana pool ịgwụputa na, ọ bụrụ na ị rịọrọ ya, CPU miner. Pool dị n'ime ya bụ s-nomp ma ọ na-amalite na Testnet ma ọ bụrụ na ị gbanweghị ya, yabụ were ya dịka ụzọ isi mụta akụkụ ndị na-agagharị.

### Ụzọ Docker

Ụzọ Book kacha mkpirikpi bụ image `zfnd/zebra` Docker, nke e si na environment variables nyefee adreesị na port RPC ([Book: Ịgwụputa na Zebra n'ime Docker](https://zebra.zfnd.org/user/mining-docker.html)). Iwu dị n'okpuru bụ nke Book nwere otu mgbanwe: ọ na-ebipụta port RPC naanị na loopback address host, yabụ igwe ndị ọzọ enweghị ike iru ya.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Nke a na-amalite node Mainnet, na-ebipụta port P2P (8233) na host Docker, ma na-eme ka port RPC (8232) ruo naanị site na host n'onwe ya. Bipụta cookie site na:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Debe `0.0.0.0` n'ime `ZEBRA_RPC__LISTEN_ADDR`.** Nke ahụ bụ adreesị Zebra na-ege ntị na ya n'ime container. Docker na-ebufe port e bipụtara gaa network interface nke container n'onwe ya, yabụ Zebra na-ege ntị na `127.0.0.1` n'ime container agaghị anata njikọ ahụ, ọbụna site na host. `127.0.0.1:` dị n'ihu `-p` bụ ihe na-eme ka port ahụ ghara ịpụta na netwọk.
- **Iwu Book** na-ebipụta port RPC site na `-p 8232:8232`, nke na-emepe ya na network interface ọ bụla nke host.
- **Iji mee omume na Testnet**, tinye `-e ZEBRA_NETWORK__NETWORK="Testnet"`, tọọ `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, bipụta `-p 18233:18233` na `-p 127.0.0.1:18232:18232`, ma nye adreesị Testnet. Adreesị Mainnet na-egbochi Zebra ịmalite na Testnet, ma nke ọzọ kwa.

Ịkwụ ndị miners ụgwọ na ijikwa e-akpa ego anọghị n'ime ngalaba a. Maka akụkụ e-akpa ego, lee [Zallet](/zcash-tech/zallet).

## Atụmatụ na Omume Kachasị Mma
- **Uru:** Jiri calculators dịka whattomine.com/coins/166-zec-equihash. Ihe atụ: RTX 3060 (~300 Sol/s) na-enweta ~0.001 ZEC/ụbọchị na $50/ZEC, wepụ ~$0.50 eletrik.
- **Nzuzo:** Jiri pools nke e chebere echebe ma ọ bụrụ na ha dị; zere iji adreesị ọzọ.
- **Nchekwa:** Jiri okwuntughe siri ike; gbanye 2FA na pools/e-akpa ego. Ekekọrịtala private keys.
- **Idozi Nsogbu:** Ọ bụrụ na shares adịghị, lelee firewall, antivirus, ma ọ bụ config ezighi ezi. Soro forums dịka forum.zcashcommunity.com ma ọ bụ Reddit r/zec.
- **Nhọrọ Ndị Ọzọ:** Ọ bụrụ na ọ naghị aba uru, tụlee cloud mining ma ọ bụ Mkpọchi ego dijitalụ [staking] nke mkpụrụ ego ndị ọzọ.
- **Ihe Banyere Gburugburu Ebe Obibi:** Ịgwụputa na-eri ike; jiri isi mmalite a na-emegharị emegharị ma ọ bụrụ na o kwere omume.
- **Mmelite:** Zcash nwere ike ịgbanwe (dịka ọmụmaatụ, mgbanwe PoS nwere ike ime); lelee z.cash maka akụkọ.
