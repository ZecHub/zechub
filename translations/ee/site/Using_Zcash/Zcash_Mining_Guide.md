# Zcash Mining Guide: Tomenukuƒe ƒe Ƒuƒoƒo kple Ame ŋutɔ ƒe Dɔwɔnuwo

## Kpɔkplɔyiɖeme

Zcash (ZEC) nye cryptocurrency si léa ŋku ɖe adzamenyawo ŋu si zãa Equihash proof-of-work algorithm hena tomenukuƒe. Zcash tomenukuƒe bia be woazã akɔntabubu ƒe ŋusẽ atsɔ akpɔ akɔntabubu ƒe kuxi sesẽwo gbɔ, aɖo kpe asitsatsa dzi, eye woakpɔ network la ta ɖe ZEC teƒeɖoɖowo teƒe. Le network la ƒe sesẽ ta la, womekafu solo mining na ezãla akpa gãtɔ o. Tomenukuƒe aɖe me nɔnɔ nye mɔ nyuitɔ si dzi nàto akpɔ teƒeɖoɖo ɣesiaɣi to wò hash ŋusẽ tsɔtsɔ ƒo ƒu kple ame bubuwo me.

Mɔfiame sia ku ɖe Zcash kuku ŋu to ame ŋutɔ ƒe xɔtunuwo zazã me (le kpɔɖeŋu me, aƒeme PC si me GPUwo le alo ASIC siwo le gɔmedzedzea me). De dzesii be togbɔ be GPUwo ateŋu aku Zcash, ASICwo wɔa dɔ nyuie wu eye wokpɔa viɖe le ƒe 2026 me le network ƒe sesẽ ta. Kpɔ viɖe si li fifia ɖa ɣesiaɣi to dɔwɔnuwo abe WhatToMine.com zazã me, elabena nusiwo abe elektrikŋusẽ ƒe asi, xɔtunuwo ƒe asiwo, kple ZEC ƒe asixɔxɔ kpɔa ŋusẽ ɖe alesi woate ŋu awɔ dɔe dzi. Ðewohĩ tomenukuƒewo maɖe vi na amesiame o; numekuku le nutoa me ƒe sededewo kple ŋusẽ ƒe agbɔsɔsɔme ŋu (ɖoe be yeaxɔ < $0.08/kWh).


## Nudidiwo

### Hardware ƒe dɔwɔnuwo
- **GPU Mining (Ame ŋutɔ ƒe Ðoɖowɔwɔ si Wokafu na Gɔmedzelawo):**
  - NVIDIA alo AMD GPU siwo si VRAM 4GB ya teti le (le kpɔɖeŋu me, NVIDIA GTX 1070, RTX 3060; AMD RX 580 alo esi nyo wu).
  - Motherboard si sɔ, PSU si sɔ (750W ya teti na GPU geɖe), kple fafa nyui be wòaxe mɔ ɖe dzoxɔxɔ si gbɔ eme nu.
  - Multi-GPU rigs bɔ na hash ƒe agbɔsɔsɔme nyuitɔ (le kpɔɖeŋu me, 6x GPUs ateŋu aɖo 1-2 kSol/s gbɔ).
- **ASIC Tomenukuƒe (Ewɔa dɔ nyuie wu gake eƒe asi lolo wu):**
  - ASIC siwo sɔ kple Equihash abe Bitmain Antminer Z15 (420 kSol/s) alo Innosilicon A9 (50 kSol/s) ene.
  - Esiawo sesẽna wu, woxɔa dzo wu, eye woxɔa ŋusẽ geɖe wu (le kpɔɖeŋu me, 1500W+); si sɔ na teƒe siwo woɖo ɖi koŋ. Ƒle nu tso teƒe siwo ŋu ŋkɔ le abe Bitmain.com alo nudzralawo (Blockware Mining).
- **General:** Internet si li ke, kɔmpiuta si wotsɔ ɖoa ɖoɖowɔwɔ/dzikpɔkpɔ. ASICs ɖua network la dzi (~13 GSol/s total hashrate le ƒe 2026 me), si wɔe be GPU tomenukuku meganye hoʋiʋli boo o gake egate ŋu dzɔna na modzakaɖelawo.

### Sɔƒtwɛ
- **Dɔwɔɖoɖo:** Windows 10/11, Linux (Ubuntu kafui be wòali ke).
- **Tomenukuƒe ƒe Kɔmpiutadziɖoɖo:**
  - Le GPUwo gome la: lolMiner (doa alɔ AMD/NVIDIA), GMiner, alo miniZ (NVIDIA-si ƒe susu nɔa eŋu). Wɔ eƒe kɔpi tso GitHub teƒe siwo dziɖuɖua ɖo (le kpɔɖeŋu me, github.com/Lolliedieb/lolMiner-releases).
  - Le ASICwo gome la: Zã adzɔnuwɔƒea ƒe firmware/dashboard si wotu ɖe eme (le kpɔɖeŋu me, Bitmain ƒe web interface).
- **Gakotoku:** Zcash gakotoku si woatsɔ axɔ fetu. Doe ɖa:
  - Wokpɔ ta (ame ŋutɔ tɔ): ZODL Gakotoku, Zingo (Asitelefon/Dɔwɔƒe), Zkool (asitelefon/kplɔ̃).
  - Nusi me kɔ (ele bɔbɔe wu gake menye ame ŋutɔ tɔ o): Edge Wallet, Zecwallet Lite.
  - Wɔ eƒe kɔpi tso [gakotokuwo](https://zechub.wiki/wallets). Wɔ adrɛs si wokpɔ ta na (edzea egɔme kple 'zs') hena adzamenyawo ne ta la do alɔe.

### Bubu
- Elektrikŋusẽ: Bu gazazãwo ƒe akɔnta. GPUwo zãa 150-300W le kaɖi ɖeka dzi; ASIC-wo ƒe 1000W+.
- Antivirus: Trɔ asi le eŋu le ɖoɖowɔwɔ me elabena ate ŋu ade dzesi tomenukulawo be wonye ŋɔdzinuwo.

## Afɔɖeɖe ɖesiaɖe ƒe Mɔfiame si Ku Ðe Tomenukuƒe ƒe Ðekawɔwɔ Ŋu

### Afɔɖeɖe 1: Ðo Wò Zcash Gakotoku
1. Wɔ gakotoku aɖe ƒe kɔpi eye nàdae ɖe wò kɔmpiuta dzi tso Zcash nyatakakadzraɖoƒe si dziɖuɖua da asi ɖo [gakotokuwo](https://zechub.wiki/wallets).
2. Wɔ gakotoku yeye eye nàwɔ wò nuku ƒe nyagbea ƒe kɔpi dedie.
3. Wɔ adrɛs si nàxɔ (anyo wu be woakpɔ eta hena ame ŋutɔ ƒe nyawo tsɔtsɔ aɣla). De dzesii ɖi, le kpɔɖeŋu me, `zs1exampleaddress...`.
4. Ne adrɛs si me kɔ zãm (edze egɔme kple 't') la, ele bɔbɔe wu gake menaa ame ŋutɔ ƒe nyawo tsɔtsɔ aɣla fũu o.

### Afɔɖeɖe 2: Dzra Wò Hardware Ðo
- Le GPUwo gome la:
  1. De GPUwo wò PC me eye nàwɔ ʋukulawo yeyee (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Overclock ne nuteƒekpɔkpɔ (zã MSI Afterburner hena liƒo; taɖodzinu na +100-200 core clock, -500 memory hena dɔwɔwɔ nyuie).
- Le ASIC-wo gome la:
  1. Do ka kple ASIC la ɖe elektrikŋusẽ kple Ethernet ŋu.
  2. Di eƒe IP adrɛs to dɔwɔnu abe Advanced IP Scanner alo ewɔla ƒe dɔwɔnu ene zazã me.
  3. Ge ɖe web dashboard la me (le kpɔɖeŋu me, ŋlɔ IP ɖe browser me, gege ɖe eme gbãtɔ: root/root na Bitmain).

**Nuxlɔ̃ame:** Kpɔ egbɔ be ya nyui le eme; tomenukuƒewo naa dzoxɔxɔ dona. Dze egɔme tso sue dzi be nàdoe kpɔ.

### Afɔɖeɖe 3: Tia Tomenukuƒe aɖe eye nàwɔ ɖeka kplii
Tomenukuƒewo maa dɔwɔwɔ eye woama teƒeɖoɖowo ɖe wò hashrate si nèdzɔ nu. Tiae ɖe fetu (0-2%), fexexe suetɔ kekeake (0.01-0.1 ZEC), teƒe si nèle (ping si le sue), kple kakaɖedzi nu.

**Tadeaguƒe Siwo Wokafu (Wotue Ðe Hashrate, Fewo, Kple Numetotowo Dzi):**
- **2Miners (zec.2miners.com)**: 1% fetu, PPLNS fexexe, doa alɔ GPU / ASIC / NiceHash. Hashrate si kɔkɔ (~1.17 GSol/s), dɔwɔƒe siwo ŋu kakaɖedzi le.
- **F2Pool (zec.f2pool.com)**: 2% fetu, PPS + fexexe, ga geɖe ƒe kpekpeɖeŋu. Ta gã aɖe (~ 2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 2% fetu (PPS +), zãla-xɔlɔ̃wɔwɔ dashboard, xexeame katã ƒe dɔwɔƒewo.
- **AntPool (zec.antpool.com)**: 1% ƒe fetu, tso Bitmain gbɔ, enyo na ASICwo (~ 494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Zcash tomenukuƒe si nye dɔnyala bibi si Foundry Digital wɔ. Ezãa PPLNS ƒe fexexe, naa teƒeɖoɖowo yometiti le gaglãgbe kple dɔwɔƒe ƒe ɖoƒe ƒe kpekpeɖeŋu. Esɔ nyuie wu na ASIC tomenukulawo le dɔwɔƒewo kple gãwo; bia be woaɖo kpe akɔntabubua dzi.
- **Sovright (mining.sovright.com)**: Zcash ta si wotu ɖe Stratum V2 dzi, si le dɔ wɔm fifia abe dutoƒo dodokpɔmɔ̃ ene. ZEC fexexe aɖeke mele agbe haɖe o, eyata bu eŋu be enye mɔnu si dzi nàto ado wò ɖoɖoa kpɔ tsɔ wu be wòanye gakpɔkpɔtsoƒe. Kpɔ akpa si woɖo ɖi le ete hena numeɖeɖe bubuwo.
- Bubuwo: Kryptex Pool, Luxor (kpɔ poolwatch.io/coin/zcash hena ɣeyiɣi ŋutɔŋutɔ ƒe akɔntabubuwo).

1. Yi ta la ƒe nyatakakadzraɖoƒea eye nàwɔ akɔnta (email alo ame aɖewo abe 2Miners ene ƒe ŋkɔ ŋɔŋlɔ aɖeke meli o).
2. Tsɔ wò Zcash gakotoku ƒe adrɛs kpe ɖe fexexe ƒe ɖoɖowo ŋu.
3. De dzesi ta la ƒe stratum server (le kpɔɖeŋu me, zec.2miners.com:1010) kple port.

### Afɔɖeɖe 4: De Tomenukuƒea ƒe Kɔmpiutadziɖoɖowo De Dɔwɔɖoɖowo Me eye Nàwɔ Wo Ðoɖo Ðe Eŋu
- Le GPUwo gome (Kpɔɖeŋu: lolMiner le Windows/Linux):
  1. Wɔ lolMiner ƒe kɔpi tso GitHub (ƒe yeyetɔ, le kpɔɖeŋu me, 1.88).
  2. Tsɔe yi agbalẽdzraɖoƒe aɖe.
  3. Wɔ batch file (start.bat) kple ɖoɖowɔɖi:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Ɖo eteƒe `YOUR_WALLET_ADDRESS` kple wò ZEC adrɛs.
     - `WORKER_NAME`: Ŋkɔ na wò rig (le kpɔɖeŋu me, Rig1).
     - Le EU ƒe dɔwɔƒewo gome la: eu.zec.2miners.com:1010.
  4. Tsɔ batch file la ƒu du. Aƒo ka kple ta la eye wòadze tomenukudɔ gɔme.
- Le ASICwo gome (Kpɔɖeŋu: Bitmain Antminer):
  1. Ge ɖe web dashboard la me.
  2. Yi Miner ƒe Ðoɖowɔɖi gbɔ.
  3. Tsɔ ta la ŋuti nyatakakawo kpee:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Zãla ƒe ŋkɔ: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Nyagbe ɣaɣla: x (alo ƒuƒlu).
  4. Dzra tomenukuƒea ɖo eye nàgbugbɔ adze egɔme.
- Le kɔmpiutadziɖoɖo bubuwo gome (le kpɔɖeŋu me, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Dodokpɔ:** Duƒuƒu hena miniti 10-15; kpɔ console hena gomekpɔkpɔ siwo dzi woda asi ɖo kple hashrate.

### Afɔɖeɖe 5: Dze Tomenukudɔ gɔme eye nàlé ŋku ɖe eŋu
1. Dze tomenukuƒea gɔme: ado ka kple ta la eye wòadze gomekpɔkpɔwo ɖoɖo ɖa gɔme.
2. Kpɔ egbɔ to:
   - Pool dashboard: Ŋlɔ wò gakotoku ƒe adrɛs be nàkpɔ hashrate, ga si womexe o, kple akɔntabubuwo.
   - Kɔmpiutadziɖoɖo ƒe mɔ̃: Kpɔ vodadawo ɖa, dzoxɔxɔ (na < 80 degrees C).
   - Dɔwɔnuwo: Zã HiveOS alo SimpleMining OS hena adzɔge rig dzikpɔkpɔ.
3. Fexexe: Ta akpa gãtɔ xea fe le wo ɖokui si ne èɖo suetɔ gbɔ (le kpɔɖeŋu me, 0.05 ZEC). Kpɔ tadeaguƒea ƒe sewo ɖa.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet Ta kple Relay Network

Sovright (sovright.com) wɔa Stratum V2 tomenukuƒe kple block relay network si le vovo. Wowɔa dɔ vovovowo, eyata woƒo nu tso wo ŋu ɖe vovo le ete.

### Tomenukuƒe (mining.sovright.com)

Sovright's ta la zɔna le dutoƒo Zcash testnet (NU6, Stratum V2) dzi, ke menye mainnet dzi o. Testnet la mexea ZEC. Zãe nàtsɔ ado wò tomenukulawo ƒe ɖoɖoa kpɔ, ke menye be nàkpɔ ga o.

- Womehiã akɔntabubu aɖeke hafi woadze egɔme o. Fia asi CPU alo ASIC Equihash tomenukulawo le ta la gbɔ eye wò gomekpɔkpɔwo adze le live dashboard dzi.
- Sovright ta Stratum V2 proxy si le ʋuʋu ɖi hã na tomenukulawo siwo di be yewoatia yewo ŋutɔ yewoƒe block templates tsɔ wu be yewoaxɔ ta la ƒe dɔwo ko:

### Kpɔkpɔ Foundry Zcash Pool

Le Foundry Zcash Pool zãlawo gome la:

- Lé ŋku ɖe tomenukulawo ƒe dɔwɔwɔ ŋu to Foundry pool dashboard dzi.
- Le ŋku ɖe eŋu:
  - Dɔwɔla siwo doa vevie nu
  - Hashrate si ŋu woka nya ta le
  - Gome siwo dzi woda asi ɖo
  - Teƒeɖoɖo siwo wobu be woakpɔ
  - Fexexe ƒe nɔnɔme

Esi Foundry zãa PPLNS ƒe teƒeɖoɖo ƒe kpɔɖeŋu ta la, tomenukuƒewo ƒe teƒeɖoɖowo nɔ te ɖe gome siwo wodzɔ le ta la ƒe teƒeɖoɖo fesre dzi tsɔ wu be woanɔ te ɖe hashrate si wowɔ enumake dzi ɖeɖeko dzi.

Mɔnu siwo wokafu be woalé ŋku ɖe nu ŋu:
- Tsɔ ASIC dashboard hashrate sɔ kple hashrate si Foundry ka nya ta.
- Ku nu me tso gome siwo wogbe, gome siwo do xoxo, alo kadodo ƒe malikenyenye ŋu.
- Lé network ƒe kadodo si li ke me ɖe asi elabena dɔmawɔmawɔ ɖea gome siwo woɖo ɖa kple teƒeɖoɖo siwo ate ŋu ado tso eme dzi kpɔtɔna.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Fia asi wò tomenukulawo ɖe teƒea teƒenɔla tsɔ wu be nàfia asi ta la tẽ:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  dɔwɔla ƒe ŋkɔ zazã abe `yourname.rig1`.
- Sovright's gaglãgbe ƒe axa gblɔ be "de wo katã eme" ƒe ɖoɖo aɖe na asitsatsa siwo wokpɔ ta na, to vovo na tadeaguƒe aɖewo siwo ɖea wo ɖa. Block ɖesiaɖe xɔa ɖaseɖiɖi si wode asi ale be woate ŋu alé ŋku ɖe ɖoɖoa ŋu le wo ɖokui si.
- Wɔ akɔnta le mining.sovright.com (Google alo email ge ɖe eme) be nàlé ŋku ɖe wò ŋutɔ wò dɔwɔlawo ŋu ɖe kpɔɖeŋu dashboard nyatakakawo teƒe.

### Relay ƒe Nyatakakadzraɖoƒe (relay.sovright.com)

Sovright wɔa dutoƒo block relay network ɖe vovo le Zcash mainnet dzi. Ne ta aɖe ke ɖe block ŋu la, alesi block ma ɖoa network la ƒe akpa mamlɛa kabakabae ye afia zi nenie wòazu tsyɔ̃evi, si fia be ebu kaka ƒe duɖimekekea eye fetu si wòaxɔ ɖe eta la bu. Relay la tsɔa blockwo yia ŋgɔ le nuto ene me to compact block relay kple ŋgɔgbe vodada ɖɔɖɔɖo zazã me.

Dutoƒo dashboard la ɖea ŋusẽkpɔɖeamedzia fiana le agbe: nuto siwo do ƒome kple relay kpɔa block yeyewo le ɣeyiɣi si me hatiwo ƒe nyatoƒoetoto dzrowo xɔna ƒe afã teti me, eye dashboard la léa ŋku ɖe network la ƒe tsyɔ̃evi siwo le agbe ƒe agbɔsɔsɔme ŋu.

Esia nye xɔtuɖaŋu na tadeagulawo, ke menye tomenukulawo ɖekaɖeka o. Sovright's dzɔtsoƒe si le ʋuʋu ɖi `mining-infra` nudzraɖoƒe ƒe nuŋlɔɖiwo a `submitblock` relay gateway na fanning kpɔ blocks ɖe mesh la me kabakaba wu native P2P. Be nàdo ka la, te ɖe Sovright ŋu tẽ (support@sovright.com) hena relay peer adrɛswo kple auth key.


## Tomenukuƒe ɖe wò ŋutɔ wò Zebra node ŋu

Nusianu si le etame la fia asi wò tomenukulawo ɖe ame bubu ƒe ta. Mɔ bubue nye be wò ŋutɔ nàwɔ node aɖe eye nàna wò tomenukuƒe ƒe kɔmpiutadziɖoɖoa nabia tso esi be wòawɔ dɔ. Esi zcashd tɔ le 18 July 2026 dzi ta la, ema fia be [Zebra](/zcash-tech/zebra-full-node), node si ŋu akpa sia ƒo nu tsoe.

Zebra's akpa le sue eye wòle tẽ: etua block templates eye wòxɔa block siwo wokpɔ gbɔ to eƒe RPC interface dzi. Tomenukuƒe ƒe kɔmpiutadziɖoɖowoe wɔa hashing la, eye teƒeɖoɖowo mama le tomenukulawo dometɔ geɖe dome nye pool software ƒe dɔ. Ne tomenukuƒe ɖeɖeko akpɔ mɔxenu aɖe gbeɖeka la, enɔ te ɖe wò gomekpɔkpɔ le network la ƒe hash rate me dzi, si akpa sia medze agbagba be yeabu akɔnta o. Esia tae axa sia ƒe ŋgɔdonya mekafu solo mining na ezãla akpa gãtɔ o.

Afɔɖeɖeawo kplɔ Zebra Book ƒe axa eve ɖo, [Zcash kple Zebra](https://zebra.zfnd.org/user/mining.html) kple [Tomenukuƒe kple Zebra le Docker](https://zebra.zfnd.org/user/mining-docker.html), abe alesi wonɔ le 8 October 2026. Ŋkɔ veviwo kple nusiwo woɖo ɖi la trɔna le esiwo woɖe ɖe go dome, eyata lé ŋku ɖe Agbalẽa ŋu hafi nàɖo ŋu ɖe ɖeka ŋu.

### Ðo adrɛs si axɔ teƒeɖoɖoa

Wɔ ɖoɖowɔɖi ƒe faɛl si me ɖoɖo gbãtɔawo le, emegbe nàtrɔ asi le eŋu:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Wobia tomenukulawo ƒe adrɛs ([Agbalẽ: Tomenukulawo ƒe adrɛs](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra xɔa P2PKH alo P2SH adrɛs si me kɔ, Sapling adrɛs, alo Unified Address. Le Unified Address, Agbalẽa gblɔ be Zebra xea fe na xɔla ɖeka, "elɔ̃a Orchard, emegbe Sapling, emegbe transparent".

Safui eve siwo woate ŋu awɔ le wo ɖokui si la yia ɖeka me `[mining]` akpa:

| Asafui | Nusi wòwɔna | Seɖoƒe li na |
|---|---|---|
| `extra_coinbase_data` | Tsɔ dutoƒo tag, abe pool ŋkɔ ene, kpena ɖe coinbase input si le block ɖesiaɖe si nèku la ŋu, le Zebra's dzesi ([Agbalẽ](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 ƒe byte. Le esia ta la, "Zebra gbe be yemadze egɔme o" |
| `miner_memo` | Tsɔ nuŋlɔɖi si wotsɔ akpoxɔnu wɔe kpena ɖe teƒeɖoɖoa ƒe emetsonua ŋu. To vovo na ema `extra_coinbase_data` menye dutoƒoe wònye o: amesi si nukpɔkpɔ ƒe safui le na adrɛs si xɔe koe ate ŋu axlẽe ([Agbalẽ](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 ƒe byte. Ne teƒeɖoɖoa yi na amesi xɔ akpoxɔnu ko hafi wòwɔa dɔ. Ne adrɛs si me kɔ la "le ɖoɖoezizi me mekpɔa ŋusẽ aɖeke ɖe edzi o" |

### Ʋu RPC ʋɔtrua

Mining software ƒoa nu kple Zebra to JSON-RPC dzi, si nɔa anyi vaseɖe esime nèna adrɛse be wòase le ([Agbalẽ: RPC ƒe akpa aɖe](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 nye RPC ʋɔtru si wozãna ɖaa le Mainnet dzi. `127.0.0.1` nana be mɔ̃ ɖeka ma ke dzi koe woate ŋu aɖo melidzeƒea.

Esi wònye Zebra 2.0.0 ta la, cookie kpɔa RPC ʋɔtrua ta, si nye mɔnu si sɔ kple esi zcashd zã. Zebra ŋlɔa kuki la ne RPC ƒe nuwuƒe dze egɔme eye wòtutunɛ ne etɔ. Le gɔmedzedzea me la, faɛl la nɔa Zebra's cache directory me, le kpɔɖeŋu me `/home/user/.cache/zebra/.cookie` le Linux, eye wòléa fli ɖeka ɖe asi:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` ʋua faɛl la. `rpc.enable_cookie_auth = false` tsia dzesidea, eye wòtsɔa kpeɖodzi ɖeka kolia si le RPC ʋɔtrua si: nusianu si ateŋu aɖo ʋɔtrua gbɔ ateŋu ayɔe emegbe.

### Dze Zebra gɔme eye nàna wòawɔ ɖeka

```bash
zebrad
```

Zebra xlẽa config la tso teƒe si woɖoe ɖo. To eme `-c /path/to/zebrad.toml` be nàzã faɛl bubu. Lala be sync la nawu enu. Nuŋlɔɖia ɖee fia `sync_percent=100.000%` ne ewɔe be ([Agbalẽ: Zebra si le du dzi](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Node Bliboe](/zcash-tech/zebra-full-node) ƒoa nu tso hardware kple disk ƒe teƒe ŋu.

### Kpɔe ɖa kple getblocktemplate

`getblocktemplate` nye kaƒoƒo si tomenukuƒe ƒe kɔmpiutadziɖoɖowo wɔna be woakpɔ dɔ, eyata enye dodokpɔ si wowɔna kabakaba wu hã ([Agbalẽ: Dodokpɔ le ɖoɖoa ŋu](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Tsɔ wò cookie file me nyawo de.. `__cookie__:PASSWORD`:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Setup si le dɔ wɔm trɔna a `result` tsi tre ɖe agble siwo tomenukulawo hiã ŋu, le wo dome `previousblockhash`, `coinbasetxn`, `target` kple `height`. Ne èɖoe `extra_coinbase_data`, Agbalẽa ɖe alesi nàwɔ ake ɖe wò tag la ŋu me `coinbasetxn.data`.

### Fia asi wò tomenukuƒe ƒe kɔmpiutadziɖoɖoa ɖe eŋu

Na wò tomenukuƒe alo pool ƒe kɔmpiutadziɖoɖoa nanye RPC ƒe nuwuƒe, `127.0.0.1:8232`, kple zãla ƒe ŋkɔ kple nyagbe si tso cookie la me. Agbalẽa gblɔ be Zebra "doa alɔ RPC mɔnu siwo hiã be woatsɔ awɔ tomenukuƒe ƒe kɔmpiuta dɔwɔɖoɖo akpa gãtɔ" ([Agbalẽ: Du tomenukuƒe aɖe](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Nu eve siwo nàŋlɔ tso Agbalẽa me hafi atia kɔmpiutadziɖoɖowo:

- **s-nomp nye dodokpɔ ɖeɖeko tɔ.** Agbalẽa yɔ eƒe s-nomp ɖoɖoa be "dodokpɔ" eye wògblɔ be s-nomp "mewɔ ɖeka kple NU5, eyata wotu tomenukudɔ aɖewo nuwɔametɔe". Enye [Testnet ƒe mɔfiame](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) egblɔ kpee be s-nomp "mewɔ yeye le se nu na NU5 alo emegbe network ƒe tɔtrɔwo o" eye wòfia asi nuwɔwɔ tomenukulawo be woaƒo kɔmpiutadziɖoɖo siwo doa alɔ tɔtrɔ siwo li fifia nu ƒu.
- **Zebra ɖoa stack si wowɔ xoxo la ɖa.** Zebra nudzraɖoƒea ƒe Docker Compose ɖoɖo le [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) si dzea Zebra gɔme ɖekae kple tomenukuƒe aɖe eye ne èbiae la, CPU tomenukuƒe. Ta si le eme la nye s-nomp eye wòdzea egɔme tso Testnet dzi negbe ɖe nètrɔe, eyata bu eŋu abe mɔnu si dzi nàto asrɔ̃ akpa siwo le ʋuʋum ene.

### Docker ƒe mɔa

Agbalẽa ƒe mɔ kpuitɔ kekeakee nye.. `zfnd/zebra` Docker nɔnɔmetata, kple adrɛs kple RPC ʋɔtrua si wotsɔ yi abe nuto ƒe tɔtrɔwo ene ([Agbalẽ: Tomenukuƒe kple Zebra le Docker](https://zebra.zfnd.org/user/mining-docker.html)). Sedede si le ete la nye Agbalẽa tɔ kple tɔtrɔ ɖeka: etaa RPC ʋɔtrua ɖe host ƒe loopback adrɛs ɖeɖeko dzi, eyata mɔ̃ bubuwo mateŋu aɖo egbɔ o.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Esia dzea Mainnet node gɔme, taa P2P ʋɔtru (8233) ɖe Docker host la dzi, eye wònana RPC port (8232) la gbɔ ɖoɖo tso host la ŋutɔ gbɔ ko. Ta cookie la kple:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Le aɖe asi `0.0.0.0` in `ZEBRA_RPC__LISTEN_ADDR`.** Emae nye adrɛs si dzi Zebra ɖoa to le nugoe la me. Docker ɖoa ʋɔtru si wota ɖe nugoe la ŋutɔ ƒe network ƒe ŋgɔdonya, eyata Zebra aɖe le to ɖom `127.0.0.1` le nugoe me maxɔ kadodoa o, tso amedzroxɔla gɔ̃ hã gbɔ. The `127.0.0.1:` le ŋgɔ `-p` nye nusi nana melidzeƒea meganɔa network la dzi o.
- **Agbalẽa ƒe sedede** ta RPC ʋɔtrua kple `-p 8232:8232`, si ʋunɛ le host la ƒe network interface ɖesiaɖe dzi.
- **To practise on Testnet**, add `-e ZEBRA_NETWORK__NETWORK="Testnet"`, set `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, publish `-p 18233:18233` and `-p 127.0.0.1:18232:18232`, and give a Testnet address. A Mainnet address stops Zebra from starting on Testnet, and the other way round.

Tomenukulawo ƒe fexexe kple gakotokua ŋudɔwɔwɔ le akpa sia godo. Ne èdi gakotokua ƒe akpaa la, kpɔ [Zallet](/zcash-tech/zallet).

## Aɖaŋuɖoɖowo Kple Nuwɔna Nyuitɔwo
- **Viɖekpɔkpɔ:** Zã akɔntabubumɔ̃wo abe whattomine.com/coins/166-zec-equihash ene. Kpɔɖeŋu: RTX 3060 (~300 Sol/s) xɔa ~0.001 ZEC/day le $50/ZEC, woɖe ~$0.50 elektrikŋusẽ ɖa.
- **Adzamenyawo:** Zã tadeaguƒe siwo wokpɔ ta na ne woli; ƒo asa na adrɛswo gbugbɔgazã.
- **Dedienɔnɔ:** Zã nyagbe sesẽwo; na 2FA nawɔ dɔ le tadeaguƒewo/gakotokuwo dzi. Mègatsɔ ame ŋutɔ ƒe safuiwo ma gbeɖe o.
- **Kuxiwo gbɔkpɔkpɔ:** Ne gome aɖeke mele eme o la, kpɔ dzodoƒe, antivirus, alo config si mesɔ o. Wɔ ɖeka kple nyamedzroƒewo abe forum.zcashcommunity.com alo Reddit r/zec.
- **Nu bubu siwo woate ŋu azã:** Ne viɖe aɖeke mele eŋu o la, bu alilikpo me tomenukuku alo gaku bubuwo dede afɔku me ŋu.
- **Nutoa Me De dzesii:** Tomenukuƒewo xɔa ŋusẽ; zã nu yeyewo tsoƒe ne anya wɔ.
- **Nu yeyewo:** Zcash ate ŋu atrɔ (le kpɔɖeŋu me, PoS ƒe tɔtrɔ si ate ŋu adzɔ); kpɔ z.cash hena nyadzɔdzɔwo.
