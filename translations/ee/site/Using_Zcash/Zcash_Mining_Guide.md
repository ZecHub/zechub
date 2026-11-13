<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zcash_Mining_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Nukuku [Mining] Ƒe Mɔfiame: Nɔƒo kple Nukuku Ƒe Gaƒuƒoƒo kple Wò Ŋutɔ ƒe Mɔ̃nuwo

> Tsɔ wò GPU alo ASIC ƒo ƒu kple nukuku ƒe gaƒuƒoƒo aɖe, ma dɔa kple nukula [miners] bubuwo, eye nàxɔ ZEC fetuwo edziedzi, ke menye be nàlala ƒe geɖe hafi akpɔ gaɖoɖowo ƒuƒoƒe [block] ɖeka le wò ɖokui si o.

## TL;DR

* Zcash zãa Equihash ƒe dɔwɔwɔ ƒe ɖaseɖigbalɛ (proof of work). ASIC mɔ̃wo koe le dziɖum le network la dzi, eyata GPU-wo nye na ame siwo wɔa nukuku (mining) abe modzakaɖeɖe ene kple na dodokpɔ koŋ.
* Nukuku wò ɖeka ŋutɔ mekpɔa gaɖoɖowo ƒuƒoƒe (block) zi geɖe o ne wò mɔ̃wo le sue. Gaƒuƒoƒo (pool) ƒoa ame geɖewo ƒe hashrate nu ƒu eye wòxea wò akpa le gaɖoɖowo ƒuƒoƒe ɖesiaɖe si wòkpɔ me na wò.
* Nu etɔ̃ hiã wò: Zcash gakotoku (wallet) ƒe gaɖoƒe ƒe dzesi (address) na fexexe, nukuku mɔ̃wo, kple nukuku ƒe software (alo ASIC la ƒe ɖoɖowo ƒuƒopé (dashboard) si le eme xoxo).
* Gaƒuƒoƒowo to vovo le adzɔ (fee) (abe 0-2% ene), fexexe ƒe mɔnu (PPLNS, PPS+), fexexe sue kekeake, kple server la ƒe nɔƒe me.
* Kpɔ viɖe si le eme gbã: elektrik ƒe home, mɔ̃wo ƒe home, kple ZEC ƒe home ye ɖoa kpe edzi be nukuku ana viɖe wò hã loo alo menana o.
* Mɔ si sesẽ wu: wɔ wò ŋutɔ wò Zebra ɣaɣla dzesi ŋɔŋlɔ (node) eye nàwɔ nukuku to eƒe `getblocktemplate` RPC dzi.

## Nyamenyawo ƒe Ɖeɖefia Vevitɔ

Nukuku [mining] nye ale si wowɔa Zcash gaɖoɖowo ƒuƒoƒe [block] yeyewo. Nukulawo [miners] ƒua du be yewoaɖe Equihash ƒe nya sesẽ aɖe. Ame si gbã ke ɖe eƒe mɔ si sɔ la tsɔa gaɖoɖowo ƒuƒoƒe si kplɔe ɖo kpena ɖe eŋu, eye wòxɔa gaɖoɖowo ƒuƒoƒe ƒe fetu. Ne hashrate (ŋusẽ si nèzãna tsɔ kua nu) si nètsɔ kpe ɖe eŋu sɔ gbɔ ɖe edzi la, zi geɖe wòanyo be nàɖu dzi. Gake le egbe ƒe network la gbɔ la, mɔ̃ ɖeka si le aƒeme mate ŋu aɖu dzi le eɖokui si kloe o.

Nukuku ƒe gaƒuƒoƒo (mining pool) ɖɔa nya sia ɖo. Gaƒuƒoƒo la naa dɔ ƒe akpa suesueawo nukula ɖe sia ɖe, eye woyɔa wo be shares (akpawo). Share ɖe sia ɖe si wolɔ̃ ɖo la ɖenɛ fiana be èna hashrate (akɔntaŋutete). Ne ame aɖe le gaƒuƒoƒo la me ke gaɖoɖowo ƒuƒoƒe aɖe ŋu la, woma fetu la ɖe shares ƒe agbɔsɔsɔ nu, eye woxea fe na wò le eɖokui si ne wò ga si le asiwò wu gaƒuƒoƒo la ƒe sue
 si wòbia.

Ɖoɖowɔwɔ la mama ɖe akpa atɔ̃ me, eye míaƒo nu tso wo dometɔ ɖesiaɖe ŋu afɔ ɖeka ɖeka le ete:

1. Gakotoku ƒe gaɖoƒe ƒe dzesi [address] si dzi nàxɔ fetuwo ɖo.
2. Mɔ̃wo [Hardware]: GPU siwo le kɔmpiuta me, alo Equihash ASIC.
3. Akɔnta le gaƒuƒoƒo [pool] me (alo wò gaɖoƒe ƒe dzesi ko, na gaƒuƒoƒo siwo mebia be nàŋlɔ wò ŋkɔ ɖi o).
4. Nukuku [mining] ƒe software si wotrɔ ɖo ɖe gaƒuƒoƒo la ƒe stratum server ŋu, eye `YOUR_ADDRESS.WORKER_NAME` nye zãla ƒe ŋkɔ.
5. Nukpɔkpɔ ɖe dɔwɔwɔ ŋu: shares siwo woxɔ, hashrate, dzoxɔxɔ kple ga si womexe haɖe o.

## Gɔmedzedze

Zcash (ZEC) nye crypto ga si ƒe ɣaɣla [privacy] le ŋgɔ, eye wò zãna Equihash dɔwɔmɔ si woyɔna proof-of-work le nukuku me. Nukuku Zcash fia be woazã akɔnta ƒe ŋusẽ atsɔ aɖo matematiki ƒe kuxi sesẽwo, akaka gaɖoɖowo [transactions] ɖe edzi, eye woaɖe network la ƒe dzideƒo na le ZEC ƒe fetuwo ta. Esi network la ƒe sesẽ le dzi ŋutɔ ta la, womedi be zãla geɖewo nɔ nukuku wɔnɔ ɖeka o. Nɔnɔ kple nukuku ƒe gaƒuƒoƒo nye mɔ nyuitɔ be nàxɔ fetu si le dzi ɖe edzi to wò hash ŋusẽ tsɔtsɔ kple ame bubuwo tɔ ƒoƒo me.

Mɔfiame sia ƒe ta nye be woanuku Zcash kple ame ŋutɔ ƒe mɔ̃nuwo (le kpɔɖeŋu me, aƒeme PC si me GPUwo le alo ASIC siwo ƒe asi medze ŋutɔ o). De dzesi be togbɔ be GPUwo ate ŋu anuku Zcash ha, ASICwo wɔnɔ nyuie wu eye woxɔa vi geɖe le 2026 me le network la ƒe sesẽ ta. Na kpɔa nugbegbe si le fifia me tso dɔwɔnuwo abe WhatToMine.com ene zãm, elabena nu abe elektrik ƒe asi, mɔ̃nu ƒe asi, kple ZEC ƒe asixɔxɔ ene doa asi le nu si ate ŋu awɔ dɔ la me. Nukuku mate ŋu axɔ vi na ame sia ame o; di nya tso wò nuto ƒe sewo kple energia ƒe asiwo ŋuti (di be wòanye < $0.08/kWh).


## Nu Siwo Hiã

### Mɔ̃nuwo
- **GPU Nukuku (Ame Ŋutɔ Ƒe Ɖoɖo Si Woaɖo Ɖe Amegãwo Ŋu):**
  - NVIDIA alo AMD GPUwo siwo ƒe VRAM le 4GB alo wu (le kpɔɖeŋu me, NVIDIA GTX 1070, RTX 3060; AMD RX 580 alo si wu eya).
  - Motherboard si wɔa dɔ kple eŋu, PSU si ɖe edzi (le 750W alo wu na GPU geɖewo), kple hame nyui be dzɔdzɔ geɖe magbugbɔ mɔ̃nuwo o.
  - GPU geɖe ƒe rigwo menye nudzɔdzɔ o na hash rate nyui (le kpɔɖeŋu me, GPU 6 ate ŋu axɔ 1-2 kSol/s).
- **ASIC Nukuku (Ewɔa Dɔ Nyuie Ke Eƒe Asi Le Dzi):**
  - ASIC siwo wɔa dɔ kple Equihash abe Bitmain Antminer Z15 (420 kSol/s) alo Innosilicon A9 (50 kSol/s) ene.
  - Esiawo ƒoa gbe ŋutɔ, womea dzo ŋutɔ, eye wozãa ŋusẽ geɖe (le kpɔɖeŋu me, 1500W+); wòle be woazã wo le teƒe si ɖe ɖe eŋu. Ƒle wo tso teƒe siwo ŋu wòka ɖe edzi abe Bitmain.com alo ame siwo dzra wo (Blockware Mining) ene.
- **Le Ƒomevi Blibo Me:** Internet si le dzideƒo, kple kɔmpiuta na ɖoɖo/kpɔkpɔ. ASICwo le network la dzi (~13 GSol/s ƒe hashrate blibo le 2026 me), esia wɔe be GPU nukuku menye dzidzɔ geɖe o ke wògale bubuɖeka wɔwɔ ƒe mɔ na ame siwo lɔ̃e.

### Software
- **Dɔwɔ Ƒe Ƒoƒe:** Windows 10/11, Linux (Ubuntu woaɖo ŋu na dzideƒo).
- **Nukuku Ƒe Software:**
  - Na GPUwo: lolMiner (wɔa dɔ kple AMD/NVIDIA), GMiner, alo miniZ (NVIDIA ŋu wɔnɔ). Ɖe eƒe official GitHub repo wo me (le kpɔɖeŋu me, github.com/Lolliedieb/lolMiner-releases).
  - Na ASICwo: Zã manufacturer la ŋutɔ ƒe firmware/dashboard si wotu ɖe eme (le kpɔɖeŋu me, Bitmain ƒe web interface).
- **Gakotoku [wallet]:** Zcash gakotoku be nàxɔ fetuwo. Esiwo woaɖo ŋu:
  - Ɣaɣla [Shielded] (si le ɣaɣla me): ZODL Wallet, Zingo (Mobile/Desktop), Zkool (mobile/desktop).
  - Nuwo ƒe ʋuʋuɖi [Transparent] (bɔbɔe ke ɣaɣla medze o): Edge Wallet, Zecwallet Lite.
  - Ɖe wo tso [wallets](https://zechub.wiki/wallets). Wɔ ɣaɣla gaɖoƒe ƒe dzesi [address] si dze egɔme kple 'zs' na ɣaɣla ne gaƒuƒoƒo la wɔa dɔ kple ema.

### Bubuwo
- Elektrik: Bui asiwo. GPUwo zãa 150-300W na card ɖeka; ASICwo 1000W+.
- Antivirus: Ɖe le teƒe le ɖoɖo ƒe ɣeyiɣi me elabena ate ŋu awɔ dzesi be nukulawo nye afɔɖe.

## Afɔɖeɖe Ƒe Mɔfiame Na Nukuku Ƒe Gaƒuƒoƒo Ƒe Nɔnɔ

### Afɔɖe 1: Ɖo Wò Zcash Gakotoku Ɖe Anyi
1. Ɖe eye nàtsɔ gakotoku tso official Zcash website [wallets](https://zechub.wiki/wallets).
2. Wɔ gakotoku yeye eye nàdzra wò gadzraɖoɖi nya [seed phrase] ɖe teƒe dedie.
3. Wɔ dzesi si wòaxɔa nu (enye nyuitɔ be wòanye ɣaɣla na ɣaɣla). Ŋlɔe ɖi, le kpɔɖeŋu me, `zs1exampleaddress...`.
4. Ne èzã nuwo ƒe ʋuʋuɖi dzesi si dze egɔme kple 't' la, eŋutɔ bɔbɔe gã wu ke ɣaɣla si le eme sɔ gbɔ.

### Afɔɖe 2: Dzra Wò Mɔ̃nuwo Ɖo
- Na GPUwo:
  1. Ɖo GPUwo ɖe wò PC me eye nàtrɔ driverwo yeyee (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Dze edzi ne ènyae nyuie (zã MSI Afterburner na dzideƒo; di be core clock nadze edzi kple +100-200, memory nadze ɖe -500 na dɔwɔ nyui).
- Na ASICwo:
  1. Ɖo ASIC la ɖe ŋusẽ kple Ethernet.
  2. Di eƒe IP gaɖoƒe ƒe dzesi kple dɔwɔnu abe Advanced IP Scanner alo manufacturer la ƒe app ene.
  3. Ʋu web dashboard la (le kpɔɖeŋu me, ŋlɔ IP la ɖe browser me, login si wòde eme le gɔmedzedze nye: root/root na Bitmain).

**Nuxlɔ̃ame:** Kpɔe be ya adze nyuie; nukuku wɔa dzo. Dze egɔme kple nu sue be nàte eŋu akpɔ.

### Afɔɖe 3: Ti Eye Nàƒo Ɖe Nukuku Ƒe Gaƒuƒoƒo Ŋu
Nukuku ƒe gaƒuƒoƒowo maa dɔ mawo eye woma fetuwo ɖe hash rate si wònye wò tɔ la nu. Ti wo ɖe adzɔ [fee] (0-2%), fetu si woanaxɔ katã vi (0.01-0.1 ZEC), nɔƒe (ping si me gbɔ), kple wɔnɔƒe ŋu.

**Gaƒuƒoƒo Siwo Woaɖo Ŋu (Wotso Hashrate, Adzɔ, Kple Nudzodzro Ŋu):**
- **2Miners (zec.2miners.com)**: 1% adzɔ, PPLNS fetu, wɔa dɔ kple GPU/ASIC/NiceHash. Hashrate le dzi (~1.17 GSol/s), serverwo le dzideƒo.
- **F2Pool (zec.f2pool.com)**: 2% adzɔ, PPS+ fetu, coin geɖe ƒe kpekpeɖeŋu. Gaƒuƒoƒo gã (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 2% adzɔ (PPS+), ɖoɖowo ƒuƒopé si bɔbɔe na zãla, serverwo le xexeame blibo me.
- **AntPool (zec.antpool.com)**: 1% adzɔ, tso Bitmain gbɔ, nyo na ASICwo (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Zcash ƒe nukuku ƒe gaƒuƒoƒo si wɔnɔa dɔ kple amedzrowo le Foundry Digital gbɔ. Ezãa PPLNS fetuwo, eye wònaa fetuwo ƒe kpɔkpɔ si le ʋuʋuɖi me kple kpekpeɖeŋu si nyo na dzikpɔkpɔ. Wònyo ŋutɔ na ASIC nukulawo siwo wɔnɔa dɔ le dzidzime kple hame gãwo; wòhia account ƒe kakaɖedzi.
- **Sovright (mining.sovright.com)**: Zcash ƒe gaƒuƒoƒo si wotu ɖe Stratum V2 dzi, si le public testnet dzi fifia. ZEC ƒe fetu vavã aɖeke mele o haɖe, eyata zãe abe mɔ si woaɖe wò ɖoɖo ate eŋu kpɔ ene, menye abe ga xɔxɔ ƒe teƒe ene o. Kpɔ akpa si tututu le ete na nyawo.
- Bubuwo: Kryptex Pool, Luxor (kpɔ poolwatch.io/coin/zcash na statistik siwo le fifia).

1. Yi gaƒuƒoƒo la ƒe website dzi eye nàwɔ account (email alo registration aɖeke mele na ɖewo abe 2Miners ene).
2. Ɖo wò Zcash gakotoku ƒe dzesi ɖe settings me na fetuwo.
3. Ŋlɔ gaƒuƒoƒo la ƒe stratum server (le kpɔɖeŋu me, zec.2miners.com:1010) kple port ɖi.

### Afɔɖe 4: Ɖe Eye Nàɖo Nukuku Ƒe Software Ɖe Anyi
- Na GPUwo (Kpɔɖeŋu: lolMiner le Windows/Linux):
  1. Ɖe lolMiner tso GitHub (version yeye, le kpɔɖeŋu me, 1.88).
  2. Ʋu eƒe filewo ɖe folder aɖe me.
  3. Wɔ batch file (start.bat) kple ɖoɖo sia:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Trɔ `YOUR_WALLET_ADDRESS` ɖe wò ZEC dzesi.
     - `WORKER_NAME`: Ŋkɔ na wò rig (le kpɔɖeŋu me, Rig1).
     - Na EU serverwo: eu.zec.2miners.com:1010.
  4. Ƒo batch file la. Eɖo ɖe gaƒuƒoƒo la ŋu eye wòadze nukuku gɔme.
- Na ASICwo (Kpɔɖeŋu: Bitmain Antminer):
  1. Ge ɖe web dashboard la me.
  2. Yi Miner Configuration.
  3. Tsɔ gaƒuƒoƒo ƒe nyawo ɖe eme:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (alo mele).
  4. Dzra ɖoɖo la ɖo eye nàgbugbɔ nukula la.
- Na software bubuwo (le kpɔɖeŋu me, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Tetee:** Ƒo dɔ le minuti 10-15; kpɔ console la me na share siwo woxɔ kple hashrate.

### Afɔɖe 5: Dze Nukuku Gɔme Eye Nàkpɔe
1. Ƒo nukula la: woaɖo ɖe gaƒuƒoƒo la ŋu eye woaɖe asi adzro sharewo.
2. Kpɔe to:
   - Gaƒuƒoƒo ƒe ɖoɖowo ƒuƒopé: Ŋlɔ wò gakotoku ƒe dzesi be nàkpɔ hashrate, balance si menaxɔ o, kple statistikwo.
   - Software ƒe console: Le ŋku ɖe vodadawo, dzɔdzɔ (nàwɔe be wòanɔ < 80 degrees C).
   - Dɔwɔnuwo [Tools]: Zã HiveOS alo SimpleMining OS na rig ƒe kpɔkpɔ tso didime.
3. Fetuwo: Gaƒuƒoƒo geɖe maa wo ɖokui ƒe mɔ nu ne èva ɖo fetu si le vi la (le kpɔɖeŋu me, 0.05 ZEC). Kpɔ gaƒuƒoƒo la ƒe sewo.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


### Foundry Zcash gaƒuƒoƒo kpɔkpɔ

Na Foundry Zcash gaƒuƒoƒo zãlawo:

- Kpɔ nukula [miner] ƒe dɔwɔwɔ ɖa to Foundry gaƒuƒoƒo [pool] ƒe ɖoɖowo ƒuƒopé [dashboard] dzi.
- Kpɔ nu siawo ɖa:
  - Dɔwɔla siwo le dɔ wɔm (active workers)
  - Hashrate si wogblɔ (hashrate nye ŋusẽ si mɔ̃ zãna tsɔ wɔa akɔntabubu)
  - Shares siwo woxɔ
  - Fetu si wobu be yeakpɔ
  - Gaxexe ƒe nɔnɔme

Esi Foundry zãa PPLNS fetu ƒe ɖoɖo ta la, nukuku ƒe fetuwo nɔ te ɖe akpa siwo nukula aɖe na le gaƒuƒoƒo la ƒe fetu ƒe ɣeyiɣi me dzi, ke menye ɖe hashrate si le eŋu fifi ko dzi o.

Nukpɔkpɔ ƒe mɔnu siwo wodo ɖe ŋgɔ:
- Tsɔ hashrate (ŋusẽ si mɔ̃ la tsɔna wɔa akɔntabubu) si le ASIC ƒe ɖoɖowo ƒuƒopé (dashboard) dzi la sɔ kple hashrate si Foundry ɖe fia.
- Dzro shares siwo wogbe, shares xoxowo, alo kadodo ƒe tetotsotso me.
- Na wò network kadodo nanɔ te sesĩe, elabena ɣeyiɣi si kadodo mele o la ɖea shares siwo nèɖo ɖa kple fetu siwo àte ŋu axɔ la dzi kpɔtɔna.

## Sovright: Testnet Ƒe Gaƒuƒoƒo Kple Block Ƒe Relay Network

Sovright (sovright.com) wɔa Stratum V2 nukuku ƒe gaƒuƒoƒo kple block relay network si le ɖe eŋu. Wɔa dɔ vovovo, eyata woɖe wo me ɖe eŋu le ete.

### Nukuku Ƒe Gaƒuƒoƒo (mining.sovright.com)

Sovright ƒe gaƒuƒoƒo la le Zcash ƒe public testnet (NU6, Stratum V2) dzi, menye mainnet o. Testnet la memaa ZEC vavã o. Zãe be nàte wò nukula ƒe ɖoɖo ŋu kpɔ, menye be nàxɔ ga o.

- Account aɖeke mehia be woaɖe asi adze gɔme o. Ɖo CPU alo ASIC Equihash nukula ɖe gaƒuƒoƒo la ŋu eye wò sharewo adzɔ ɖe dashboard si le agbe me.
- Sovright hã doa Stratum V2 proxy si open source la ɖe go na nukulawo siwo di be woati wo ŋutɔ ƒe block templatewo ɖe tsɔtsɔ ƒe teƒe be woaxɔ gaƒuƒoƒo la ƒe dɔwo ko:

  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Fia wò nukula ɖe proxy la gbɔ le esi teƒe be nàfiae ɖe gaƒuƒoƒo la gbɔ tẽ:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  zã dɔwɔla ŋkɔ (worker name) abe `yourname.rig1` ene.
- Sovright ƒe nuwo ƒe ʋuʋuɖi (transparency) axa gblɔ be yewo léa "include all" (wo katã xɔxɔ) ɖoɖo me ɖe asi na ɣaɣla gaɖoɖowo (shielded transactions), si to vovo na gaƒuƒoƒo aɖewo siwo ɖea wo ɖa. Wotrea asi ɖe ɖaseɖiɖi dzi na gaɖoɖowo ƒuƒoƒe (block) ɖesiaɖe ale be ame sia ame ate ŋu adzro ɖoɖo la me le eɖokui si.
- Wɔ akɔnta le mining.sovright.com (ge ɖe eme kple Google alo email) be nàte ŋu akpɔ wò ŋutɔ wò dɔwɔlawo ƒe nuwɔwɔ ɖa le kpɔɖeŋu nyatakaka siwo le ɖoɖowo ƒuƒopé (dashboard) la dzi teƒe.

### Relay Network (relay.sovright.com)

Sovright wɔa public block relay network le Zcash mainnet dzi hã le ɖe eŋu. Ne gaƒuƒoƒo aɖe kpɔ block aɖe la, ale si block ma va ɖo network la ƒe akpa bubuwo gbɔ kaba ɖea eŋu be wòaɖe eƒe akpa le eŋu aɖeke o, si fia be edze edzi le propagation ƒe hoho la me eye fetu si le eŋu la bui. Relay la naa blockwo tso region ene me to compact block relay kple forward error correction.

Public dashboard la fia eƒe wɔwɔ le agbe me: region siwo ɖo ɖe relay la ŋu kpɔa block yeye le ɣeyiɣi si me nye pɛtɛɛ wu peer to peer gossip ƒe ɣeyiɣi ƒe afã, eye dashboard la lɔ̃a network la ƒe orphan rate si le agbe me.

Esia nye infrastructure na gaƒuƒoƒo ƒe amegãwo, menye na nukula ɖekaɖekawo o. Sovright ƒe open source `mining-infra` repository ɖe `submitblock` relay gateway si doa block si woekpɔ ɖe mesh la me kaba wu native P2P la ƒe nu. Be nàɖo ɖe eŋu la, ka ɖe Sovright ŋu tẽ (support@sovright.com) na relay peer ƒe gaɖoƒe ƒe dzesiwo kple auth key.


## Nukuku ɖe wò ŋutɔ ƒe Zebra ɣaɣla dzesi ŋɔŋlɔ [node] ŋu

Nu siwo katã le etame la ɖo wò nukula ɖe ame bubu ƒe gaƒuƒoƒo ŋu. Mɔ bubu la nye be nàwɔ node wò ŋutɔ eye nàwɔe be wò nukuku ƒe software nabi dɔ tso egbɔ. Esi zcashd tɔ ɖe 18 July 2026 la, ema fia be [Zebra](/zcash-tech/zebra-full-node), eye node siae akpa sia ɖe eŋu.

Zebra ƒe akpa sue eye wòle kpuie: ewɔa block templatewo eye wòxɔa block si woɖo nu le eƒe RPC interface dzi. Nukuku ƒe softwaree wɔa hashing la, eye be woama fetuwo na nukula geɖewo nye pool software ƒe dɔ. Be nukuku wɔnɔ ɖeka akpɔ block aɖe kpɔa ɖe wò akpa le network la ƒe hash rate me ŋu, si akpa sia metoa ŋku bui o. Esia tae nye be mɔgɔmeɖeɖe si le axa sia gɔme medi nukuku wɔnɔ ɖeka na zãla geɖewo o.

Afɔɖewo do ŋku Zebra Book ƒe axa eve, [Mining Zcash with Zebra](https://zebra.zfnd.org/user/mining.html) kple [Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html), abe ale si wonɔ le 8 October 2026 ene. Key ƒe ŋkɔwo kple defaultwo trɔna le release vovovowo dome, eyata kpɔ Book la hafi nàɖo ŋku ɖe ɖeka ŋu.

### Ɖo dzesi si axɔ fetu la ɖe anyi

Wɔ config file kple default settings, eye nàtrɔe:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Nukula ƒe dzesi hiã ([Book: Miner address](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra xɔa transparent P2PKH alo P2SH dzesi, Sapling dzesi, alo Unified Address. Na Unified Address si me receiver geɖe le la, Book la gblɔ be Zebra maa fetu ɖe receiver ɖeka ko, "ewɔa ŋgɔ na Orchard, eye Sapling va gbɔ, eye transparent va mlɔeba".

Key eve siwo menye tilili o ɖo ɖe `[mining]` akpa ma ke me:

| Key | Nu si ewɔ | Kakaɖedzi |
|---|---|---|
| `extra_coinbase_data` | Etsɔ tag si le ʋuʋuɖi me, abe pool ƒe ŋkɔ ene, ɖe coinbase input ƒe block sia sia si nènuku me, le Zebra ƒe marker ŋutɔ ([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) megbe | Byte 86. Ne wòva le ema wu la, "Zebra gbe be yeaɖe asi adze gɔme" |
| `miner_memo` | Etsɔ ɣaɣla nya kpui [memo] ɖe fetu ƒe output la ŋu. To vovototo na `extra_coinbase_data`, menye nu si le ʋuʋuɖi me o: ame si si nukpɔsafui [viewing key] na dzesi si xɔa nu la ko ate ŋu axlẽe ([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)) | Byte 512. Ewɔa dɔ ne fetu la yi ɖe ɣaɣla receiver gbɔ ko. Ne nuwo ƒe ʋuʋuɖi dzesi le la, "ewɔa naneke le ɣaɣla me o" |

### Ʋu RPC port la

Nukuku ƒe software doa ƒo kple Zebra to JSON-RPC, si menɔa dɔ wɔm o va se ɖe esime nàtsɔ gaɖoƒe ƒe dzesi si woaɖo to ɖo eŋu ([Book: RPC section](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 nye RPC port si woɖo ɖe Mainnet dzi. `127.0.0.1` léa port la ɖe mɔ si wɔa be machine ma ke ko wòaɖo eŋu.

Tso Zebra 2.0.0 me la, cookie aɖe ɖea RPC port la, mɔ si sɔ kple esi zcashd zã. Zebra ŋlɔa cookie la ne RPC endpoint la dze gɔme eye wòtutui ne wòwɔ dɔ. Le default me la, file la le Zebra ƒe cache ƒe folder me, le kpɔɖeŋu me, `/home/user/.cache/zebra/.cookie` le Linux, eye line ɖeka ko le eme:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` trɔa file la ƒe teƒe. `rpc.enable_cookie_auth = false` dea kpekpeɖeŋu la le teƒe, eye kple ema la, authentication ɖeka si RPC port la si hã ɖe le teƒe: nu sia nu si ate ŋu ava ɖo port la ŋu ate ŋu ayɔe.

### Ɖe Zebra Gɔme Eye Nàle Eƒe Sync Ƒe Nu

```bash
zebrad
```

Zebra xlẽa config la tso teƒe si woɖo le default me. Tsɔ `-c /path/to/zebrad.toml` be nàzã file bubu. Le sync la ƒe nu va se ɖe esime wòava nu. Log la afia `sync_percent=100.000%` ne wòwu ([Book: Running zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Full Node](/zcash-tech/zebra-full-node) ɖe mɔ̃nuwo kple disk ƒe teƒe ŋu.

### Kpɔe kple getblocktemplate

`getblocktemplate` nye yɔyɔ si nukuku ƒe software wɔna be wòaxɔ dɔ, eyata enye tetee si kaba wu ([Book: Testing the setup](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Ɖo nu si le wò cookie file me ɖe `__cookie__:PASSWORD` ƒe teƒe:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Ɖoɖo si wɔa dɔ trɔa `result` object aɖe gbɔ kple field siwo nukula hia, siwo me `previousblockhash`, `coinbasetxn`, `target` kple `height` le. Ne nèɖo `extra_coinbase_data` ɖe anyi la, Book la ɖe mɔ si nàto akpɔ wò tag le `coinbasetxn.data` me.

### Ɖo wò nukuku ƒe software ɖe eŋu

Na wò nukuku alo pool software la RPC endpoint, `127.0.0.1:8232`, kple zãla ƒe ŋkɔ kple password si le cookie la me. Book la gblɔ be Zebra "kpɔa RPC mɔ siwo hiã be woatsɔ awɔ nukuku ƒe pool software geɖe" ([Book: Run a mining pool](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Nya eve tso Book la me hafi nàtia software:

- **s-nomp nye na tetee ko.** Book la yɔ eƒe s-nomp ɖoɖo be "experimental" eye wògblɔ be s-nomp "mewɔa dɔ kple NU5 o, eyata nukuku ƒe dɔwɔwɔ ɖewo mele dɔ wɔm o". Eƒe [Testnet guide](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) hã tsɔ kpe ɖe eŋu be s-nomp "womeyɔe yeyee official na NU5 alo network upgrade siwo va emegbe o" eye wòɖo production nukulawo ɖe pool software siwo wɔa dɔ kple upgrade siwo le fifia ŋu.
- **Zebra tsɔ stack si woɖo ɖe anyi vɔ gɔme.** Zebra repository la si Docker Compose ɖoɖo le [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining), si dea Zebra gɔme kple nukuku ƒe pool aɖe, eye ne èbia la, CPU nukula aɖe. Pool si le eme nye s-nomp eye wòdzea gɔme le Testnet dzi ne mètrɔe o, eyata bui be enye mɔ si nàsrɔ akpa vovovowo.

### Docker Ƒe Mɔ

Book la ƒe mɔ si sɔ kpuie nye `zfnd/zebra` Docker image, kple dzesi la kple RPC port si woɖo ɖe environment variablewo me ([Book: Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html)). Command si le ete la nye Book la tɔ kple trɔtrɔ ɖeka: edoa RPC port la ɖe host la ƒe loopback gaɖoƒe ƒe dzesi ko dzi, ale be machine bubuwo mate ŋu aɖo eŋu o.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Esia dea Mainnet node aɖe gɔme, wònaa P2P port (8233) le Docker host la dzi, eye wòwɔa be RPC port (8232) nakpɔa mɔ tso host la ŋutɔ gbɔ ko. Ta cookie la ɖe go kple:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Lé `0.0.0.0` le `ZEBRA_RPC__LISTEN_ADDR` me.** Emae nye gaɖoƒe ƒe dzesi si Zebra ɖoa to le container la me. Docker doa port si woɖe go ɖe container la ŋutɔ ƒe network interface ŋu, eyata Zebra si toa to le `127.0.0.1` me le container la me maxɔ kadodo la o, ne wòtso host la gbɔ hã. `127.0.0.1:` si le `-p` ƒe ŋgɔe léa port la ɖe network la ŋu.
- **Book la ƒe command** doa RPC port la ɖe go kple `-p 8232:8232`, si ʋuae ɖe host la ƒe network interface gbogbo ŋu.
- **Be nàwɔ practice le Testnet dzi**, tsɔ `-e ZEBRA_NETWORK__NETWORK="Testnet"` kpee, ɖo `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, na `-p 18233:18233` kple `-p 127.0.0.1:18232:18232` nava go, eye nàtsɔ Testnet dzesi. Mainnet dzesi aɖe wɔa be Zebra madze gɔme le Testnet dzi o, eye wòmegbe hã nenema.

Nukula ƒe fetu mama kple gakotoku ƒe kpɔkpɔ mele akpa sia me o. Na gakotoku ƒe akpa la, kpɔ [Zallet](/zcash-tech/zallet).

## Aɖaŋu Kple Mɔ Nyuiwo
- **Asixɔxɔ:** Zã calculatorwo abe whattomine.com/coins/166-zec-equihash ene. Kpɔɖeŋu: RTX 3060 (~300 Sol/s) xɔa ~0.001 ZEC/ŋkeke le $50/ZEC, le elektrik ƒe ~$0.50 megbe.
- **Ɣaɣla:** Zã ɣaɣla poolwo ne woto; mègaɖe dzesiwo zã akɔ o.
- **Dedienɔnɔ:** Zã password sesẽ; ɖe 2FA ɖe poolwo/gakotokuwɔwo ŋu. Mègaɖe private keywo fia gbeɖe o.
- **Kuxi Ƒe Ɖɔɖɔ:** Ne share aɖeke mele o la, kpɔ firewall, antivirus, alo config si mesɔ o. Ƒo kple forumwo abe forum.zcashcommunity.com alo Reddit r/zec ene.
- **Mɔ Bubuwo:** Ne asixɔxɔ mele o la, bu cloud mining alo coin bubuwo ƒe ga ƒuƒoƒo [staking] ŋu.
- **Xexea Ƒe Nudzesi:** Nukuku zãa energia; zã energia si woyɔna renewable ne wòte ŋu.
- **Yeyeɖoɖowo:** Zcash ate ŋu atrɔ (le kpɔɖeŋu me, PoS ƒe trɔtrɔ si ate ŋu ava); kpɔ z.cash na nyanyuiwo.
