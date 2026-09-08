# Zcash Madini Guide: Kujiunga na madini Pool kwa vifaa binafsi

## Utangulizi wa Kitabu cha Mwanzo

Zcash (ZEC) is a privacy-focused cryptocurrency that uses the Equihash proof-of-work algorithm for mining. Mining Zcash involves using computational power to solve complex mathematical problems, validating transactions, and securing the network in exchange for ZEC rewards. Due to the network's high difficulty, solo mining is not recommended for most users. Joining a mining pool is the best way to earn consistent rewards by combining your hash power with others.

This guide focuses on mining Zcash using personal hardware (e.g., a home PC with GPUs or entry-level ASICs). Note that while GPUs can still mine Zcash, ASICs are far more efficient and profitable in 2026 due to network difficulty. Always check current profitability using tools like WhatToMine.com, as factors like electricity costs, hardware prices, and ZEC value affect viability. Mining may not be profitable for everyone; research local regulations and energy rates (aim for < $0.08/kWh).


## Mahitaji

### Vifaa vya vifaa
- **GPU Mining (Personal Setup Ilipendekeza kwa Kompyuta):**
  - NVIDIA au AMD GPUs na angalau 4GB VRAM (kwa mfano, NVIDI GTX 1070, RTX 3060; AMD RX 580 au bora).
  - A sambamba motherboard, kutosha PSU (angalau 750W kwa GPU nyingi), na baridi nzuri ili kuzuia overheating.
  - Multi-GPU rigs ni ya kawaida kwa ajili bora hash viwango (kwa mfano, 6x GPU inaweza kufikia 1-2 kSol / s).
- ** ASIC Mining (Ufanisi zaidi lakini Gharama ya juu):**
  - Equihash-ambatana ASICs kama Bitmain Antminer Z15 (420 kSol / s) au Innosilicon A9 (50 kSOL / s).
  - Hizi ni kubwa, moto zaidi na hutumia nguvu zaidi (kwa mfano 1500W +); yanafaa kwa ajili ya nafasi za kujitolea. Kununua kutoka vyanzo reputable kama Bitmain.com au resellers (Blockware Mining).
- **General:** Internet imara, kompyuta kwa ajili ya kuanzisha / ufuatiliaji. ASICs kutawala mtandao (~ 13 GSol/s jumla hashrate katika 2026), na kufanya GPU madini chini ushindani lakini bado inawezekana kwa hobbyists.

### Programu ya kompyuta
- ** Mfumo wa uendeshaji:** Windows 10/11, Linux (Ubuntu ilipendekeza kwa utulivu).
- ** Mining Programu:**
  - Kwa GPU: lolMiner (inasaidia AMD / NVIDIA), GMiner, au miniZ (NVIDIA-ililenga). Pakua kutoka kwa repos rasmi ya GitHub (kwa mfano, github.com/Lolliedieb/lolMiner-releases).
  - Kwa ASICs: Tumia firmware kujengwa katika / dashibodi ya mtengenezaji (kwa mfano, Bitmain wa mtandao interface).
- ** Wallet:** Zcash mkoba kupokea payouts. Ilipendekeza:
  - Shielded (binafsi): Zodl Wallet, Zingo (Simu ya Mkono / Desktop) YWallet (simu za mkononi / desktop).
  - Uwazi (rahisi lakini chini ya faragha): Edge Wallet, Zecwallet Lite.
  - Pakua kutoka kwa: [pochi za fedha](https://zechub.wiki/wallets). Kuzalisha anwani ulinzi (huanza na 'zs') kwa faragha kama bwawa inasaidia yake.

### Nyingine
- Umeme: Hesabu gharama. GPUs kutumia 150-300W kwa kadi; ASICs 1000W + .
- Antivirus: Disable wakati wa kuanzisha kama inaweza bendera wachimbaji kama vitisho.

## Mwongozo wa Hatua kwa hatua ya kujiunga na Dimbwi la Uchimbaji Madini

### Hatua ya 1: Kuanzisha yako Zcash Wallet
1. Download na kufunga mkoba kutoka tovuti rasmi Zcash [pochi za fedha](https://zechub.wiki/wallets).
2. Kujenga mkoba mpya na salama nyuma ya neno lako mbegu.
3. Kuzalisha anwani ya kupokea (ikiwezekana kulindwa kwa faragha). Andika chini, kwa mfano: `zs1exampleaddress...`.
4. Kama kutumia anwani ya uwazi (huanza na 't'), ni rahisi lakini inatoa faragha kidogo.

### Hatua ya 2: Tayarisha Vifaa Vyako vya Kusaidia Kujifunza Lugha
- Kwa GPUs:
  1. Kufunga GPU katika PC yako na update madereva (NVIDIA: GeForce Uzoefu; AMD: Radeon Programu).
  2. Overclock kama uzoefu (kutumia MSI Afterburner kwa utulivu; lengo la + 100-200 msingi saa, -500 kumbukumbu ya ufanisi).
- Kwa ASICs:
  1. Kuunganisha ASIC kwa nguvu na Ethernet.
  2. Kupata anwani yake IP kwa kutumia chombo kama Advanced IP Scanner au programu ya mtengenezaji.
  3. Kupata mtandao dashibodi (kwa mfano, kuingia IP katika browser, default login: mizizi / mzizi kwa Bitmain).

** Onyo:** Kuhakikisha uingizaji hewa sahihi; uchimbaji hutoa joto. Kuanza ndogo kwa mtihani.

### Hatua ya 3: Chagua na kujiunga Madini Pool
Madini ya kuchimba madini hugawanya kazi na kushiriki thawabu kulingana na kiwango chako cha mchango. Chagua kwa msingi wa ada (0-2%), malipo ya chini (0.01-0.1 ZEC), eneo (ping ndogo), na kuegemea.

**Vipande vilivyopendekezwa (Kulingana na Hashrate, Ada, na Mapitio):**
- **2Miners (zec.2miners.com)**: 1% ada, PPLNS payout, inasaidia GPU / ASIC / NiceHash. High hashrate (~ 1.17 GSol/s), seva ya kuaminika.
- **F2Pool (zec.f2pool.com)**: 2% ada, PPS + malipo, msaada wa sarafu nyingi. Hifadhi kubwa (~2.57 GSol / s).
- ** ViaBTC (zec.viabtc.com)**: 2% ada (PPS +), dashboard ya urafiki wa mtumiaji, seva za ulimwengu.
- ** AntPool (zec.antpool.com)**: 1% ada, kutoka Bitmain, nzuri kwa ASICs (~ 494 MSol / s).
- ** Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool)**: Professional Zcash madini pool na Foundry Digital. Matumizi PPLNS payouts, inatoa uwazi malipo kufuatilia na biashara daraja la msaada. Bora inafaa kwa ajili ya taasisi na kubwa ASIC wachimbaji; inahitaji akaunti uthibitisho.
- **Sovright (mining.sovright.com)**: Zcash pool kujengwa juu ya Stratum V2, sasa mbio kama testnet umma. Hakuna kuishi ZEC payouts bado, hivyo kutibu ni njia ya mtihani kuanzisha yako badala ya chanzo mapato. Angalia sehemu maalum chini kwa maelezo zaidi.
- Wengine: Kryptex Pool, Luxor (angalia poolwatch.io/coin/zcash kwa takwimu za wakati halisi).

1. Tembelea tovuti ya bwawa na kuunda akaunti (barua pepe au hakuna usajili kwa baadhi kama 2Miners).
2. Ongeza anwani yako ya mkoba wa Zcash katika mipangilio kwa malipo.
3. Kumbuka strati ya seva pool (kwa mfano, zec.2miners.com:1010) na bandari.

### Hatua ya 4: Sakinisha na Configure Mining Software
- Kwa GPUs (Mfano: lolMiner juu ya Windows / Linux):
  1. Download lolMiner kutoka GitHub (toleo la karibuni, kwa mfano 1.88).
  2. Dondoo kwenye folda.
  3. Kujenga kundi faili (start.bat) na Configuration:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Badilisha `YOUR_WALLET_ADDRESS` na anwani yako ZEC.
     - `WORKER_NAME`: Jina kwa rig yako (kwa mfano, Rig1).
     - Kwa seva EU: eu.zec.2miners.com:1010.
  4. Run faili kundi. Itakuwa kuunganisha kwa bwawa na kuanza madini.
- Kwa ASICs (Mfano: Bitmain Antminer):
  1. Kuingia katika dashibodi ya mtandao.
  2. Nenda kwa Configuration Miner.
  3. Ongeza maelezo ya hifadhi:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Jina la mtumiaji: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Neno la siri: x (au tupu).
  4. Hifadhi na kuanzisha upya mchimbaji.
- Kwa programu nyingine (kwa mfano, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

** Jaribio:** Run kwa dakika 10-15; kuangalia console kwa ajili ya hisa kukubalika na hashrate.

### Hatua ya 5: Kuanza Uchimbaji na kufuatilia
1. Kuzindua mchimbaji: itakuwa kuunganisha kwa bwawa na kuanza kuwasilisha hisa.
2. Fuatilia kupitia:
   - Dashibodi ya pool: Ingiza anwani yako mkoba kuona hashrate, salio kulipwa na takwimu.
   - Programu console: Watch kwa makosa, joto (kuweka < 80 digrii C).
   - Vyombo: Tumia HiveOS au SimpleMining OS kwa ajili ya usimamizi rig mbali.
3. Malipo: Mashirika mengi ya kutoa pesa hulipa moja kwa moja unapofika kiwango cha chini (kwa mfano, ZEC 0.05).

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet Pool na Relay Network

Sovright (sovright.com) anaendesha Stratum V2 madini pool na tofauti block relay mtandao. Wao kufanya kazi mbalimbali, hivyo wao ni kufunikwa kando chini.

### Madini Pool (mining.sovright.com)

Hifadhi ya Sovright inaendesha kwenye mtandao wa jaribio la umma Zcash (NU6, Stratum V2), sio mainnet. Mtandao wa majaribio haulipi ZEC halisi. Itumie kujaribu usanidi wako wa madini, si kupata pesa.

- Hakuna akaunti inahitajika kuanza. Point CPU au ASIC Equihash mchimbaji katika bwawa na hisa yako kuonekana juu ya dashibodi kuishi.
- Sovright pia kuchapisha chanzo wazi Stratum V2 wakala kwa wachimbaji ambao wanataka kuchagua violezo yao wenyewe kuzuia badala ya kuchukua tu kazi bwawa:

### Ufuatiliaji Foundry Zcash Pool

Kwa watumiaji Foundry Zcash Pool:

- Monitor madini utendaji kupitia Foundry dashibodi pool.
- Angalia:
  - Wafanyakazi wa kazi ya nje
  - Imearifiwa hashrate
  - Hisa zilizokubaliwa
  - Matokeo ya makadirio
  - Hali ya malipo

Kwa sababu Foundry anatumia PPLNS malipo mfano, madini zawadi hutegemea hisa kuchangia juu ya daraja la tuzo dirisha badala hashrate papo peke yake.

Mapendekezo ya ufuatiliaji:
- Linganisha ASIC dashibodi hashrate na Foundry taarifa hashrate.
- Kuchunguza kukataliwa hisa, hisa stale, au uhusiano ukosefu wa utulivu.
- Kudumisha uhusiano wa mtandao imara kwa sababu downtime hupunguza hisa zilizowasilishwa na tuzo zinazowezekana.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Kuelekeza mchimbaji wako katika wakala badala ya bwawa moja kwa moja:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  kutumia jina la mfanyakazi kama vile: `yourname.rig1`.
- Ukurasa wa uwazi Sovright inasema "kujumuisha wote" sera kwa ajili ya shughuli ulinzi, tofauti na baadhi ya mabwawa ambayo kuchuja yao nje. Kila block anapata saini uthibitisho hivyo sera inaweza kuwa checked kujitegemea.
- Kujenga akaunti katika mining.sovright.com (Google au barua pepe kuingia) kufuatilia wafanyakazi wako mwenyewe badala ya sampuli dashibodi data.

### Mtandao wa Relay (relay.sovright.com)

Sovright hutengeneza mtandao wa umma wa relay ya block kwenye Zcash mainnet. Wakati pool inapata block, jinsi haraka ambayo block inafikia kwa wengine wa mtandao huamua ni mara ngapi inakuwa yatima, ikimaanisha kupoteza mbio za kueneza na thawabu yake imepotea. Reli inaendelea kuzuia katika mikoa minne kutumia compact block relay na marekebisho ya kosa mbele.

Dashibodi ya umma inaonyesha athari moja kwa moja: mikoa iliyounganishwa na relay huona vitalu vipya chini ya nusu wakati wa kejeli za kawaida, na dashibodi inachunguza kiwango cha mayatima halisi.

Hii ni miundombinu kwa ajili ya waendeshaji pool, si wachimba madini binafsi. chanzo Sovright wazi `mining-infra` kumbukumbu nyaraka a `submitblock` relay gateway kwa fanning kupatikana vitalu katika matundu haraka kuliko asili P2P. Kuunganisha, wasiliana Sovright moja kwa moja (support@sovright.com) kwa anwani ya peer relays na ufunguo wa auth.


## Madokezo na Mazoea Bora Zaidi
- ** Faida:** Tumia calculators kama whattomine.com/coins/166-zec-equihash Mfano: RTX 3060 (~ 300 Sol / s) anapata ~ 0.001 ZEC / siku kwa $ 50 / ZEC, minus ~ $0.50 umeme.
- ** Faragha:** Tumia mabwawa ya ulinzi ikiwa inapatikana; epuka kutumia tena anwani.
- ** Usalama:** Tumia nywila kali; kuwezesha 2FA kwenye makundi/pochi. Kamwe usishiriki funguo za kibinafsi.
- ** Kutatua matatizo:** Kama hakuna hisa, angalia firewall, antivirus au config makosa. Kujiunga vikao kama forum.zcashcommunity.com au Reddit r/zec.
- ** Mbadala:** Kama faida, kufikiria wingu madini au staking sarafu nyingine.
- ** Mazingira Kumbuka:** Uchimbaji hutumia nishati; kutumia vyanzo vya upya kama inawezekana.
- **Updates:** Zcash inaweza kuendeleza (kwa mfano, uwezekano wa PoS shift); kuangalia z.cash kwa habari.
