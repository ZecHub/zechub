# Zcash Kudo Ŋuti Mɔfiagbalẽ: Akɔdzedze le Adzɔnu Siwo Wozãna Le Gakuxi Me Kple Ame Ðokui ƒe Dzɔdzɔmenuwo me

## Ŋgɔdonyawo

Zcash (ZEC) nye cryptocurrency si ƒe nuŋɔŋlɔwo le ɣaɣla eye wòzãa Equihash proof-of-work algorithm na tomenuku. Tomenuwɔwɔe nye be woazã kɔmpiuta ŋuti ŋusẽ atsɔ akpɔ akɔntabubu me kuxi sesẽ aɖewo gbɔ, awɔ numedzadzraɖoƒewo ŋu dɔ nyuie ahana mɔ̃ɖaŋunu siwo dzi woate ŋu ato ana woaxɔ ZEC teƒeɖoɖo la nanɔ dedie. Le esi womedea aɖaŋu o ɖe ame ɖeka ɖeɖe to tomenukpɔkpɔ ta la, womeɖea kuku nɛ be wòawɔ esia kple amewo katã o. Mɔ nyuitɔ si nàto adi viɖewoe enye be yeanɔ ha dom ne ètsɔ yeƒe hash ŋutete kpe ɖe bubuwo tɔ ŋui.

This guide focuses on mining Zcash using personal hardware (e.g., a home PC with GPUs or entry-level ASICs). Note that while GPUs can still mine Zcash, ASICs are far more efficient and profitable in 2026 due to network difficulty. Always check current profitability using tools like WhatToMine.com, as factors like electricity costs, hardware prices, and ZEC value affect viability. Mining may not be profitable for everyone; research local regulations and energy rates (aim for < $0.08/kWh).


## Nya Siwo Woabia tso Ame Sia Me

### Kɔmpiutawo
- **GPU-dɔwɔƒe (Ameɖokui ƒe ɖoɖo si woade dzi ƒo na ame siwo dze egɔme):**
  - NVIDIA alo AMD GPU siwo si VRAM ƒe agbɔsɔme 4GB le (le kpɔɖeŋu me, NVIDIYA GTX 1070, RTX 3060; AMD RX 580 alo esi nyo wu).
  - Anyinagbatata si wɔa dɔ kple wo nɔewo, PSU (si ƒe ŋusẽ nye 750W ya teti ne GPU geɖewo li) eye wònana be dzoxɔxɔ nu yina yi ŋgɔ.
  - Multi-GPU rigs nye nu si bɔ be woana hash ratewo nanɔ nyuie wu (le kpɔɖeŋu me, 6x GPU ate ŋu ana 1-2 kSol/s).
- ** ASIC-kpo (Eŋu Dɔ Wɔna Nyuie Wu Gake Egblẽa Ga Geɖe):**
  - Equihash-sɔna ASIC abe Bitmain Antminer Z15 (420 kSol/s) alo Innosilicon A9 (50 kSul/s).
  - Woƒlea wo le afisiwo ŋu wodea bubui abe Bitmain.com alo nudzralawo (Blockware Mining).
- **Gbe sia gbe:** Internet si li ke, kɔmpiuta na ɖoɖowo/dzidzenu. ASICs ɖu dzi le internet (~13 GSol / s hashrate katã le 2026 me), eye GPU mining medoa ŋgɔ o gake egakpɔtɔ nye nusi ate ŋu awɔ ame siwo lɔ̃a nu siawo wɔwɔ la hã.

### Kɔmpiutaɖoɖowo
- **Dɔwɔmɔnu:** Windows 10/11, Linux (woɖo Ubuntu ɖe anyi be wòanɔ te).
- **Aɖaŋunu siwo wotsɔ wɔa tomenuku:**
  - Le GPUwo gome la: lolMiner (kpe ɖe AMD/NVIDIA ŋu), GMiner, alo miniZ (si le NVIDIA dzi). Download tso official GitHub repositories me.
  - Ne ASICwo li la: Zã dɔwɔɖoɖo si wowɔ ɖe mɔ̃a me/dashboard (le kpɔɖeŋu me, Bitmain ƒe internet-ʋunu).
- **Gbɔla:** Gadzɛ si nye Zcash be woaxe fe na ame. Wode dzi ƒo nɛ be:
  - Akɔntabubuwo: Zashi Wallet, Zingo (Aʋatɔa/Dɔwɔƒea) YWallet (aʋatɔe/dɔwɔƒe).
  - Eʋe (ese bɔbɔe gake ame ƒe susu mele edzi o): Edge Wallet, Zecwallet Lite.
  - Download from [wallets] (Mawudɔdrɔ̃wo)](https://zechub.wiki/wallets)Ne ƒumeha la lɔ̃ ɖe edzi la, ke wɔ adrɛs si dzi woada ɖo (si dzea egɔme kple 'zs') be wòakpɔ ame ƒe dedienɔnɔ ta.

### Bubuwo
- Elektrikŋusẽ: Bu akɔnta le eŋu. GPU zãa 150-300W ɖe ka ɖeka ŋu; ASIC ya zãa 1000W kple edzivɔ.
- Antivirus: Ƒo nu le eŋu ne èle edzram elabena ate ŋu ana be ame siwo wɔa dɔ tso tomenuku me la nazu ŋɔdzinuwo.

## Mɔfiame si Na Woate Ŋu Ade Kpo Ame Le Adzɔnu Siwo Wodzrana Ðo Me la me Toƒe Godoo

### Afɔɖeɖe 1: Ðo Wò Zcash Gadzɛwo Nu
1. Wɔ ga si le Zcash ƒe nyatakakadzraɖoƒe la dzi [ga siwo le internet dzi] eye nàde wo.](https://zechub.wiki/wallets).
2. Wɔ gaɖaka yeye eye nàdzra wò nyagbe gbãtɔa ɖo nyuie.
3. Wɔ adrɛs si woaɖo ɖe ame (woaɖee be wòanye esi dzi womate ŋu akpɔ o). Ŋlɔe ɖi, le kpɔɖeŋu me: `zs1exampleaddress...`.
4. Ne èzã adrɛs si me nyawo le gaglã (si dzea egɔme kple 't') la, enɔa bɔbɔe wu gake ameŋkumemakpɔmakpɔa dzi aɖe kpɔtɔ.

### Afɔɖeɖe 2: Dzra Ðo Ðe Wò Dɔwɔnuwo Ŋu
- Le GPUwo gome:
  1. Ðo GPUwo ɖe wò PC dzi eye nàtrɔ asi le mɔ̃ɖaŋunu siwo nèzãna ŋu (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Ne èkpɔe be ele bɔbɔe wu la, zãa MSI Afterburner hena eƒe anyinɔnɔ; dze agbagba nàzã +100-200 core clock (dzidzime gaƒoƒo), -500 memory na wòadze edzi).
- Ne ASICwo:
  1. Tsɔ ASIC la de elektrikmɔ̃wo kple Ethernet dzi.
  2. Zã dɔwɔnu aɖe abe Advanced IP Scanner alo dɔwɔƒe si wɔ kɔmpiutaa ƒe mɔ̃ɖaŋunuwo la nàtsɔ adi eƒe Internet Address (IP) adrɛs.
  3. Ʋu nyatakakadzraɖoƒea (le kpɔɖeŋu me, de IP le browser la me; login: root/root na Bitmain).

** Nuxlɔ̃ame:** Kpɔ egbɔ be ya me kɔ nyuie; tomenuku nana dzoxɔxɔ nɔa anyi. Dze egɔme le sue aɖe ko nu ne èle dodokpɔa wɔm.

### Afɔɖeɖe 3: Tia Kple De Agadoƒe Siwo Woade Dɔ Wɔwɔe La Me
Mining poolwo ma dɔ kple teƒeɖoɖo ɖe nu siwo nèwɔ la dzi. Tiae le fe si woxe (0-2%), ga home sue (0.01-0.1 ZEC), afisi (dzidzɔdɔme ʋɛ) li, kple kakaɖedzi ta.

**Aƒle siwo woxlɔ̃ nu le (siwo wotu ɖe Hashrate, Fees kple Review dzi):**
- **2Miners (zec.2miners.com)**: 1% fee, PPLNS payout, GPU/ASIC/NiceHash support. High hashrate (~1.17 GSol/s), reliable servers.
- **F2Pool (zec.f2pool.com)**: 2% fee, PPS+ payout, multi-coin support. Large pool (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 2% fexeɖoɖowo (PPS+), asitelefon ƒe dɔwɔƒe si me ame geɖe ate ŋu awɔ nu le bɔbɔe, kple xexeame katã dzi subɔlawo.
- **AntPool (zec.antpool.com)**: 1% fee, tso Bitmain gbɔ, eye wòsɔ na ASICs (~494 MSol/s).
- **Sovright (mining.sovright.com)**: Zcash ƒuta si wotu ɖe Stratum V2 dzi, eye wòle dɔ wɔm fifia abe ame sia ame ƒe numetotoƒe ene. Womele asi kpem le ZEC ŋu o ya ta bu eŋu be enye mɔ aɖe si nu nàto adzro wò ɖoɖowo me ke menye viɖe tso egbɔ o. Kpɔ akpa si wotsɔ ɖo anyi la le ete hena numeɖeɖe bubuwo.
- Bubuwo: Kryptex Pool, Luxor (kpɔ poolwatch.io/coin/zcash hena nyatakaka siwo le ɣeyiɣi ŋutɔŋutɔ me).

1. Yi ƒuƒoƒoa ƒe nyatakakadzraɖoƒea eye nàŋlɔ ŋkɔ ɖe edzi (e-mail alo màde dzesi ame aɖeke le 2Miners me o).
2. Tsɔ wò Zcash gaɖaka ƒe adrɛs de asi na fewo ɖoɖo me.
3. De dzesi ƒuƒoƒoa ƒe stratum server (le kpɔɖeŋu me, zec.2miners.com:1010) kple port la.

### Afɔɖeɖe 4: Ðo Kɔmpiuta Siwo Wozãna Le Adzɔnuwɔwɔ Ðe Mɔ̃ɖaŋunu Ŋu Kple Etsɔme Ði
- Le GPUwo gome (Kpɔɖeŋu: lolMiner le Windows/Linux dzi):
  1. Download lolMiner tso GitHub (nu yeye, eg 1.88).
  2. Ðe agbalẽvi aɖe me.
  3. Wɔ ɖoɖowo ƒe ƒuƒoƒo (start.bat) kple nuɖoanyi:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Ɖo eteƒe nɛ `YOUR_WALLET_ADDRESS` kple wò ZEC ƒe adrɛs.
     - `WORKER_NAME`: Wò ʋuʋu ƒe ŋkɔ (le kpɔɖeŋu me, Rig1).
     - Ne EU-subɔlawo le: eu.zec.2miners.com:1010.
  4. Ne èdze dɔ la, aƒo ka kple tsimɔ si me wole eye wòadze tomenuku gɔme.
- Le ASICwo (Kpɔɖeŋu: Bitmain Antminer):
  1. Yi Internet dzi dɔwɔƒea.
  2. Yi Miner ƒe Ðoɖowɔƒe.
  3. De ha ƒe nyatakakawo:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Ameŋkɔ: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Ŋkɔ: x (alo ƒuƒlu).
  4. Dzra tomenukulaa ɖo eye nàdze egɔme ake.
- Le kɔmpiutaɖoɖo bubuwo (le kpɔɖeŋu me, GMiner) gome la:
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Tsɔ dodokpɔ:** Zɔ miniti 10-15; kpɔ console dzi be woxɔ sharewo kple hashrate.

### Afɔɖeɖe 5: Dze Agado Kple Ŋkuléle Ðe Eŋu gɔme
1. Ʋu tomenukulaa: atsɔe ade ha kple ƒuƒoƒoa eye wòadze asiɖoɖowo ɖoɖo gɔme.
2. Kpɔa nu dzi to:
   - Pool dashboard: Ŋlɔ wò gaƒoƒomɔ̃ ƒe adrɛs be nàkpɔ hashrate, akpedada si womexe o kple akɔntabubuwo.
   - Kɔdada: Kpɔ nyuie be naneke megblẽ le eŋu o, eye na eƒe dzoxɔxɔ nanɔ < 80°C.
   - dɔwɔnu: Zã HiveOS alo SimpleMining OS na mɔ̃ɖaŋudɔwɔƒe ƒe dɔdzikpɔlawo.
3. Ðɔɖɔɖo: Ne èƒo ga si wòle be nàxe la ta (le kpɔɖeŋu me, 0.05 ZEC) le dɔwɔƒe akpa gãtɔ la, woxea fe na wò enumake. Kpɔ ɖoɖo siwo dzi wowɔa dɔ ɖo ŋu nyawo ɖa.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet Pool kple Relay Network

Sovright (sovright.com) wɔa Stratum V2 mining pool kple block relay network si le vovo la ŋu dɔwo, eyata woƒo nu tso wo ŋu ɖe akpa sia akpa le ete.

### Mining Pool (mining.sovright.com)

Sovright ƒe ha la le Zcash testnet (NU6, Stratum V2) dzi, menye mainet o. Testnet maxe ga na ame si nye ZEC ŋutɔŋutɔ o. Zãe nàtsɔ ado wò tomenukuwo kpɔ ko ke menye be nànɔ fe kpɔm ɖe edzi o.

- Mehiã be nàŋlɔ ŋkɔ ɖe asitelefon dzi hafi adze dɔ gɔme o. Tsɔ CPU alo ASIC Equihash ƒe gaŋutidɔwɔƒe ɖo ha la me eye wò dɔwɔɖuiwo ava dze le video aɖe si woada ɖi ŋutɔŋutɔ dzi.
- Sovright hã ta Stratum V2 ƒe open source proxy na tomenukula siwo di be yewoatia yewoƒe block templates tsɔ wu be woaxɔ pool la ƒe dɔwo ko:
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Tsɔ wò tomenukula ƒe asi ɖo ameɖokuisi la dzi tsɔ wu be nàtsɔ eƒe asi aɖo tsimɔ si le tsia me tẽe:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  ame aɖe ƒe ŋkɔ zazã abe: `yourname.rig1`.
- Sovright ƒe nyatakakawo le eƒe nuŋɔŋlɔ me gblɔ be "ade ame sia ame" si nye ɖoɖo na asitsatsa siwo ŋu wotrɔ asi le, to vovo na esiwo ɖea wo ɖa. Woŋlɔa ŋkɔ ɖe blɔka ɖesiaɖe dzi ale be woate ŋu adzro ɖoɖoawo me akpɔe nyuie.
- Wɔ dɔdzesi le mining.sovright.com (Google alo email sign in) be nàkpɔ wò dɔwɔlawo teƒe tsɔ wu numedzesiwo ƒe nyatakakawo kpɔkpɔ ɖe dashboard dzi.

### Ɖoɖowɔƒe (relay.sovright.com)

Sovright zãa dutoƒonugaƒo si nye block relay network le Zcash mainnet dzi. Ne ame aɖe kpɔ blɔk la, alesi wòna eƒe numegbe ɖo na nudzraɖoƒea ƒe akpa mamlɛawoe kpɔa alesi enuenu woagblẽ nu le eŋui; esia fia be ele agbe dome eye teƒeɖoɖo hã bu ɖe edzi. Etsɔme sia tsɔa blowo yia ŋgɔ to nuto ene me kple compact block reley kpakple forward error correction.

Ame sia ame si le nyatakakadzraɖoƒea kpɔa alesi nuwo va yii tẽe: nuto siwo dzi kadodowo nɔna kple wo nɔewo la kpɔa mɔxenu yeyewo kaba wu ɣeyiɣi si amewo zãna tsɔ ƒoa nu tso woƒe ƒometɔwo ŋu, eye dɔwɔƒegãa léa ŋku ɖe ale si gbegbe Internet-ʋunu aɖe gblẽ ƒe agbɔsɔsɔme sɔ gbɔ.

Esia nye mɔ̃ɖaŋunu siwo le ƒuƒoƒowo me la ƒe dɔlawo tɔ, ke menye tomenukula ɖekaɖekawoe o. Sovright ƒe kɔmpiuta si ŋu wotrɔ asi le be wòasɔ na amesiame lae nye esia. `mining-infra` agbalẽdzraɖoƒe ƒe nuŋlɔɖiwo a. `submitblock` relay gateway na fanning found blocks ɖe mesh me wu native P2P. Ne nàdi be yeado ka kple Sovright tẽe (support@sovright.com) hena relay peer addresswo kpakple auth key la xɔxɔ.


## Aɖaŋuɖoɖowo Kple Nu Siwo Wowɔna Nyuie Wu
- **Fetu:** Zã akɔntabubuwo abe whattomine.com/coins/166-zec-equihash ene. Kpɔɖeŋu: RTX 3060 (~300 Sol/s) xɔa ~0.001 ZEC / ŋkeke le $50/ZEC, minus ~$0.50 elektrikŋusẽ.
- ** Ame Ŋuti Nyawo:** Zã nu siwo ŋu wotrɔ asi le be woagblẽ nuwo ɖi o ne wole asiwò; mègazã adrɛs mawo ake o.
- ** Dedienɔnɔ:** Zã nyagbe sesẽwo; na 2FA le ƒuƒoƒo/aʋakpa dzi. Mègaƒo nu tso wò private keys ŋu o.
- ** Kuxia gbɔ kpɔnu:** Ne share aɖeke meli o la, kpɔ firewall alo antivirus ƒe ɖoɖowo dzi. De forum siwo nye forum.zcashcommunity.com kple Reddit r/zec dome.
- **Mɔ bubuwo:** Ne viɖe mele eŋu o la, bu alesi woadze cloud mining alo adzra ga bubu ɖo ŋu.
- **Amegbetɔmenɔnɔ Ŋuti Nya:** Kudowo tutu gblẽa elektrikŋusẽ dome; ne anya wɔ la, zã mɔ siwo dzi woate ŋu ato awɔ nu yeyewoe.
- ** Nuxexlẽ:** Zcash ate ŋu atrɔ (le kpɔɖeŋu me, nu si woate ŋu awɔ le teƒea ƒe tɔtrɔ); kpɔ z.cash be nàkpɔ nyatakaka yeyewo hã.
