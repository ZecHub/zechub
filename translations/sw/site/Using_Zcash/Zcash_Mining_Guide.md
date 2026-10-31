# Zcash Mwongozo wa Uchimbaji [Mining]: Kujiunga na Bwawa la Uchimbaji kwa Vifaa Binafsi

## Utangulizi

Zcash (ZEC) ni sarafu-fiche inayolenga faragha na inayotumia algoriti ya uthibitisho wa kazi ya Equihash kwa uchimbaji. Uchimbaji wa Zcash unahusisha kutumia nguvu ya kimahesabu kutatua matatizo changamani ya kihisabati, kuthibitisha miamala [transactions], na kulinda mtandao kwa kubadilishana na zawadi za ZEC. Kwa sababu ya ugumu mkubwa wa mtandao, uchimbaji wa peke yako haupendekezwi kwa watumiaji wengi. Kujiunga na bwawa la uchimbaji ndiyo njia bora ya kupata zawadi thabiti kwa kuunganisha nguvu yako ya hash na ya wengine.

Mwongozo huu unaangazia uchimbaji wa Zcash kwa kutumia vifaa binafsi (kwa mfano, PC ya nyumbani yenye GPU au ASIC za kiwango cha kuanzia). Kumbuka kwamba ingawa GPU bado zinaweza kuchimba Zcash, ASIC zina ufanisi na faida kubwa zaidi mwaka 2026 kutokana na ugumu wa mtandao. Daima angalia faida ya sasa kwa kutumia vifaa kama WhatToMine.com, kwani vipengele kama gharama za umeme, bei za vifaa, na thamani ya ZEC huathiri uwezekano wa kutekelezeka. Uchimbaji huenda usiwe na faida kwa kila mtu; chunguza kanuni za eneo lako na viwango vya nishati (lenga < $0.08/kWh).


## Mahitaji

### Vifaa
- **Uchimbaji kwa GPU (Mpangilio Binafsi Unaopendekezwa kwa Wanaoanza):**
  - GPU za NVIDIA au AMD zenye angalau 4GB VRAM (kwa mfano, NVIDIA GTX 1070, RTX 3060; AMD RX 580 au bora zaidi).
  - Motherboard inayooana, PSU ya kutosha (angalau 750W kwa GPU nyingi), na mfumo mzuri wa kupooza ili kuzuia joto kupita kiasi.
  - Rigi zenye GPU nyingi ni za kawaida kwa viwango bora vya hash (kwa mfano, GPU 6 zinaweza kufikia 1-2 kSol/s).
- **Uchimbaji kwa ASIC (Una Ufanisi Zaidi Lakini Gharama Kubwa):**
  - ASIC zinazooana na Equihash kama Bitmain Antminer Z15 (420 kSol/s) au Innosilicon A9 (50 kSol/s).
  - Hizi zina kelele zaidi, joto zaidi, na hutumia nishati zaidi (kwa mfano, 1500W+); zinafaa kwa maeneo maalumu. Nunua kutoka vyanzo vinavyoaminika kama Bitmain.com au wauzaji tena (Blockware Mining).
- **Kwa Ujumla:** Intaneti thabiti, kompyuta ya usanidi/ufuatiliaji. ASIC zinatawala mtandao (~13 GSol/s jumla ya kiwango cha hash mwaka 2026), hivyo kufanya uchimbaji kwa GPU ushindane kwa kiwango kidogo lakini bado uwezekane kwa wanaoufanya kama burudani.

### Programu
- **Mfumo wa Uendeshaji:** Windows 10/11, Linux (Ubuntu inapendekezwa kwa uthabiti).
- **Programu ya Uchimbaji:**
  - Kwa GPU: lolMiner (inaauni AMD/NVIDIA), GMiner, au miniZ (inayolenga NVIDIA). Pakua kutoka hazina rasmi za GitHub (kwa mfano, github.com/Lolliedieb/lolMiner-releases).
  - Kwa ASIC: Tumia firmware/dashibodi iliyojengewa ndani ya mtengenezaji (kwa mfano, kiolesura cha wavuti cha Bitmain).
- **Pochi [wallet]:** Pochi ya Zcash ya kupokea malipo. Zinazopendekezwa:
  - Ya faragha [shielded] (binafsi): Pochi ya ZODL, Zingo (Simu/Eneo-kazi), Zkool (simu/eneo-kazi).
  - Ya uwazi [transparent] (rahisi zaidi lakini yenye faragha ndogo): Edge Wallet, Zecwallet Lite.
  - Pakua kutoka [wallets](https://zechub.wiki/wallets). Tengeneza anwani ya faragha (huanza na 'zs') kwa faragha ikiwa bwawa linaiauni.

### Mengine
- Umeme: Hesabu gharama. GPU hutumia 150-300W kwa kila kadi; ASIC 1000W+.
- Kingavirusi: Izime wakati wa usanidi kwani huenda ikatambua wachimbaji kama vitisho.

## Mwongozo wa Hatua kwa Hatua wa Kujiunga na Bwawa la Uchimbaji

### Hatua ya 1: Sanidi Pochi Yako ya Zcash
1. Pakua na usakinishe pochi kutoka tovuti rasmi ya Zcash [wallets](https://zechub.wiki/wallets).
2. Unda pochi mpya na uhifadhi maneno yako ya kurejesha pochi [seed phrase] kwa usalama.
3. Tengeneza anwani ya kupokea (ikiwezekana ya faragha kwa ajili ya faragha). Iandike, kwa mfano, `zs1exampleaddress...`.
4. Ikiwa unatumia anwani ya uwazi (huanza na 't'), ni rahisi zaidi lakini hutoa faragha ndogo.

### Hatua ya 2: Andaa Vifaa Vyako
- Kwa GPU:
  1. Sakinisha GPU kwenye PC yako na usasishe viendeshi (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Ongeza kasi ikiwa una uzoefu (tumia MSI Afterburner kwa uthabiti; lenga +100-200 core clock, -500 memory kwa ufanisi).
- Kwa ASIC:
  1. Unganisha ASIC kwenye umeme na Ethernet.
  2. Tafuta anwani yake ya IP kwa kutumia kifaa kama Advanced IP Scanner au programu ya mtengenezaji.
  3. Fikia dashibodi ya wavuti (kwa mfano, ingiza IP katika kivinjari, kuingia kwa chaguo-msingi: root/root kwa Bitmain).

**Onyo:** Hakikisha uingizaji hewa unaofaa; uchimbaji huzalisha joto. Anza kwa kiwango kidogo ili kupima.

### Hatua ya 3: Chagua na Ujiunge na Bwawa la Uchimbaji
Mabwawa ya uchimbaji husambaza kazi na kugawana zawadi kulingana na kiwango chako cha hash ulichotoa. Chagua kwa kuzingatia ada [fee] (0-2%), kiwango cha chini cha malipo (0.01-0.1 ZEC), eneo (ping ya chini), na kutegemewa.

**Mabwawa Yanayopendekezwa (Kulingana na Kiwango cha Hash, Ada, na Maoni):**
- **2Miners (zec.2miners.com)**: Ada ya 1%, malipo ya PPLNS, yanaauni GPU/ASIC/NiceHash. Kiwango kikubwa cha hash (~1.17 GSol/s), seva za kuaminika.
- **F2Pool (zec.f2pool.com)**: Ada ya 2%, malipo ya PPS+, usaidizi wa sarafu nyingi. Bwawa kubwa (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: Ada ya 2% (PPS+), dashibodi inayofaa mtumiaji, seva za kimataifa.
- **AntPool (zec.antpool.com)**: Ada ya 1%, kutoka Bitmain, nzuri kwa ASIC (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Bwawa la kitaalamu la uchimbaji wa Zcash kutoka Foundry Digital. Hutumia malipo ya PPLNS, hutoa ufuatiliaji wa wazi wa zawadi na usaidizi wa kiwango cha shirika. Linafaa zaidi kwa wachimbaji wa ASIC wa taasisi na wa kiwango kikubwa; linahitaji uthibitishaji wa akaunti.
- **Sovright (mining.sovright.com)**: Bwawa la Zcash lililojengwa kwenye Stratum V2, kwa sasa linaendeshwa kama testnet ya umma. Bado hakuna malipo halisi ya ZEC, kwa hiyo lichukulie kama njia ya kujaribu usanidi wako badala ya chanzo cha mapato. Tazama sehemu maalumu hapa chini kwa maelezo.
- Mengine: Kryptex Pool, Luxor (angalia poolwatch.io/coin/zcash kwa takwimu za wakati halisi).

1. Tembelea tovuti ya bwawa na unda akaunti (barua pepe au bila usajili kwa baadhi kama 2Miners).
2. Ongeza anwani yako ya pochi ya Zcash katika mipangilio ya malipo.
3. Andika seva ya stratum ya bwawa (kwa mfano, zec.2miners.com:1010) na porti.

### Hatua ya 4: Sakinisha na Sanidi Programu ya Uchimbaji
- Kwa GPU (Mfano: lolMiner kwenye Windows/Linux):
  1. Pakua lolMiner kutoka GitHub (toleo la karibuni, kwa mfano, 1.88).
  2. Toa faili katika folda.
  3. Unda faili ya batch (start.bat) yenye usanidi:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Badilisha `YOUR_WALLET_ADDRESS` kwa anwani yako ya ZEC.
     - `WORKER_NAME`: Jina la rigi yako (kwa mfano, Rig1).
     - Kwa seva za EU: eu.zec.2miners.com:1010.
  4. Endesha faili ya batch. Itaunganishwa na bwawa na kuanza uchimbaji.
- Kwa ASIC (Mfano: Bitmain Antminer):
  1. Ingia katika dashibodi ya wavuti.
  2. Nenda kwenye Miner Configuration.
  3. Ongeza maelezo ya bwawa:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Jina la mtumiaji: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Nenosiri: x (au acha wazi).
  4. Hifadhi na uwashe upya mchimbaji.
- Kwa programu nyingine (kwa mfano, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Jaribio:** Endesha kwa dakika 10-15; angalia konsoli kwa shares zilizokubaliwa na kiwango cha hash.

### Hatua ya 5: Anza Uchimbaji na Ufuatilie
1. Anzisha mchimbaji: ataunganishwa na bwawa na kuanza kutuma shares.
2. Fuatilia kupitia:
   - Dashibodi ya bwawa: Ingiza anwani yako ya pochi ili kuona kiwango cha hash, salio lisilolipwa, na takwimu.
   - Konsoli ya programu: Angalia hitilafu, halijoto (iwe < nyuzi 80 C).
   - Vifaa: Tumia HiveOS au SimpleMining OS kwa usimamizi wa rigi kwa mbali.
3. Malipo: Mabwawa mengi hulipa kiotomatiki unapofikia kiwango cha chini (kwa mfano, 0.05 ZEC). Angalia kanuni za bwawa.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Bwawa la Testnet na Mtandao wa Relay

Sovright (sovright.com) huendesha bwawa la uchimbaji la Stratum V2 na mtandao tofauti wa relay wa block. Hufanya kazi tofauti, kwa hiyo yanaelezewa kando hapa chini.

### Bwawa la Uchimbaji (mining.sovright.com)

Bwawa la Sovright huendeshwa kwenye testnet ya umma ya Zcash (NU6, Stratum V2), si mainnet. Testnet hailipi ZEC halisi. Litumie kupima usanidi wako wa mchimbaji, si kupata mapato.

- Hakuna akaunti inayohitajika ili kuanza. Elekeza mchimbaji wa CPU au ASIC wa Equihash kwenye bwawa na shares zako zitaonekana kwenye dashibodi ya moja kwa moja.
- Sovright pia huchapisha proksi ya Stratum V2 yenye msimbo wazi kwa wachimbaji wanaotaka kuchagua templeti zao za block badala ya kupokea tu kazi za bwawa:

### Kufuatilia Bwawa la Foundry Zcash

Kwa watumiaji wa Bwawa la Foundry Zcash:

- Fuatilia utendaji wa mchimbaji kupitia dashibodi ya bwawa la Foundry.
- Angalia:
  - Wafanyakazi wanaotumika
  - Kiwango cha hash kilichoripotiwa
  - Shares zilizokubaliwa
  - Zawadi zinazokadiriwa
  - Hali ya malipo

Kwa sababu Foundry hutumia muundo wa zawadi wa PPLNS, zawadi za uchimbaji hutegemea shares zilizotolewa katika dirisha la zawadi la bwawa badala ya kiwango cha hash cha wakati huo pekee.

Mbinu zinazopendekezwa za ufuatiliaji:
- Linganisha kiwango cha hash cha dashibodi ya ASIC na kiwango cha hash kinachoripotiwa na Foundry.
- Chunguza shares zilizokataliwa, shares zilizopitwa na wakati, au uthabiti wa muunganisho.
- Dumisha muunganisho thabiti wa mtandao kwa sababu muda wa kutofanya kazi hupunguza shares zinazotumwa na zawadi zinazowezekana.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Elekeza mchimbaji wako kwenye proksi badala ya bwawa moja kwa moja:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  kwa kutumia jina la mfanyakazi kama `yourname.rig1`.
- Ukurasa wa uwazi wa Sovright unasema sera ya “jumuisha zote” kwa miamala ya faragha, tofauti na baadhi ya mabwawa yanayozichuja. Kila block hupata uthibitisho uliotiwa sahihi ili sera iweze kuchunguzwa kwa kujitegemea.
- Unda akaunti katika mining.sovright.com (ingia kwa Google au barua pepe) ili kufuatilia wafanyakazi wako badala ya data ya dashibodi ya mfano.

### Mtandao wa Relay (relay.sovright.com)

Sovright huendesha pia mtandao wa umma wa relay wa block kwenye mainnet ya Zcash. Bwawa linapopata block, kasi ambayo block hiyo hufika kwenye mtandao uliosalia huamua mara ngapi inakuwa orphaned, yaani inapoteza mbio za uenezaji na zawadi yake hupotea. Relay hutuma block katika maeneo manne kwa kutumia relay ya block iliyoshikamana yenye marekebisho ya hitilafu ya mbele.

Dashibodi ya umma huonyesha athari hii moja kwa moja: maeneo yaliyounganishwa na relay huona block mpya kwa chini sana ya nusu ya muda ambao mawasiliano ya kawaida ya peer to peer huchukua, na dashibodi hufuatilia kiwango cha sasa cha orphan cha mtandao.

Hii ni miundombinu kwa waendeshaji wa mabwawa, si wachimbaji binafsi. Hazina ya msimbo wazi ya Sovright `mining-infra` inaandika gateway ya relay ya `submitblock` ya kuingiza block zilizopatikana kwenye mesh kwa kasi zaidi kuliko P2P asilia. Ili kuunganisha, wasiliana na Sovright moja kwa moja (support@sovright.com) kwa anwani za peer za relay na ufunguo wa uthibitishaji.


## Uchimbaji dhidi ya node yako mwenyewe ya Zebra

Kila kitu hapo juu huelekeza mchimbaji wako kwenye bwawa la mtu mwingine. Njia nyingine ni kuendesha node mwenyewe na programu yako ya uchimbaji iombe kazi kutoka humo. Kwa kuwa zcashd ilisimama tarehe 18 Julai 2026, hilo linamaanisha [Zebra](/zcash-tech/zebra-full-node), node inayoshughulikiwa katika sehemu hii.

Sehemu ya Zebra ni ndogo na mahususi: huunda templeti za block na hukubali block zilizotatuliwa kupitia kiolesura chake cha RPC. Uwekaji hash hufanywa na programu ya uchimbaji, na kugawana zawadi kati ya wachimbaji kadhaa ni kazi ya programu ya bwawa. Kama uchimbaji wa peke yako utapata block hutegemea sehemu yako ya kiwango cha hash cha mtandao, jambo ambalo sehemu hii haijaribu kukadiria. Hiyo ndiyo sababu utangulizi wa ukurasa huu haupendekezi uchimbaji wa peke yako kwa watumiaji wengi.

Hatua hizi zinafuata kurasa mbili za Kitabu cha Zebra, [Uchimbaji Zcash kwa kutumia Zebra](https://zebra.zfnd.org/user/mining.html) na [Uchimbaji kwa kutumia Zebra katika Docker](https://zebra.zfnd.org/user/mining-docker.html), jinsi zilivyokuwa tarehe 8 Oktoba 2026. Majina ya funguo na mipangilio chaguo-msingi hubadilika kati ya matoleo, kwa hiyo angalia Kitabu kabla ya kutegemea mojawapo.

### Weka anwani inayopokea zawadi

Unda faili ya usanidi kwa mipangilio chaguo-msingi, kisha irekebishe:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Anwani ya mchimbaji inahitajika ([Kitabu: Anwani ya mchimbaji](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra hukubali anwani ya uwazi ya P2PKH au P2SH, anwani ya Sapling, au Anwani Iliyounganishwa. Kwa Anwani Iliyounganishwa yenye kipokezi zaidi ya kimoja, Kitabu kinasema Zebra hulipa kipokezi kimoja, “ikipendelea Orchard, kisha Sapling, kisha uwazi”.

Funguo mbili za hiari huenda katika sehemu ileile ya `[mining]`:

| Ufunguo | Inachofanya | Kikomo |
|---|---|---|
| `extra_coinbase_data` | Huongeza lebo ya umma, kama jina la bwawa, kwenye ingizo la coinbase la kila block unayochimba, baada ya alama ya Zebra yenyewe ([Kitabu](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | Baiti 86. Zaidi ya hapo, “Zebra hukataa kuanza” |
| `miner_memo` | Huambatisha ujumbe wa faragha kwenye towe la zawadi. Tofauti na `extra_coinbase_data`, si wa umma: ni mtu mwenye ufunguo wa kutazama [viewing key] wa anwani inayopokea pekee anayeweza kuusoma ([Kitabu](https://zebra.zfnd.org/user/mining.html#miner-memo)) | Baiti 512. Hufanya kazi tu zawadi inapokwenda kwa kipokezi cha faragha. Kwa anwani ya uwazi “kimya kimya haina athari” |

### Fungua porti ya RPC

Programu ya uchimbaji huzungumza na Zebra kupitia JSON-RPC, ambayo hubaki imezimwa hadi uipe anwani ya kusikiliza ([Kitabu: Sehemu ya RPC](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 ndiyo porti ya kawaida ya RPC kwenye Mainnet. `127.0.0.1` huweka porti ifikiwe kutoka mashine hiyo hiyo pekee.

Tangu Zebra 2.0.0, cookie hulinda porti ya RPC, mbinu inayofanana na ile iliyotumiwa na zcashd. Zebra huandika cookie endpoint ya RPC inapoanza na kuifuta inapozimwa. Kwa chaguo-msingi faili iko katika saraka ya cache ya Zebra, kwa mfano `/home/user/.cache/zebra/.cookie` kwenye Linux, na ina mstari mmoja:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` huhamisha faili. `rpc.enable_cookie_auth = false` huzima ukaguzi, na pamoja nao uthibitishaji pekee ambao porti ya RPC inao: chochote kinachoweza kufikia porti kinaweza kuiita.

### Anzisha Zebra na uiruhusu isawazishe

```bash
zebrad
```

Zebra husoma usanidi kutoka eneo chaguo-msingi. Pitisha `-c /path/to/zebrad.toml` kutumia faili nyingine. Subiri usawazishaji ukamilike. Logi huonyesha `sync_percent=100.000%` inapokamilika ([Kitabu: Kuendesha zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Full Node](/zcash-tech/zebra-full-node) hufunika vifaa na nafasi ya diski.

### Ikague kwa getblocktemplate

`getblocktemplate` ndiyo wito ambao programu ya uchimbaji hutoa kupata kazi, kwa hiyo pia ni jaribio la haraka zaidi ([Kitabu: Kujaribu usanidi](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Weka maudhui ya faili yako ya cookie mahali pa `__cookie__:PASSWORD`:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Usanidi unaofanya kazi hurudisha kitu cha `result` chenye sehemu ambazo mchimbaji anahitaji, zikiwemo `previousblockhash`, `coinbasetxn`, `target` na `height`. Ukiweka `extra_coinbase_data`, Kitabu kinaeleza jinsi ya kupata lebo yako katika `coinbasetxn.data`.

### Elekeza programu yako ya uchimbaji kwake

Ipe programu yako ya uchimbaji au ya bwawa endpoint ya RPC, `127.0.0.1:8232`, pamoja na jina la mtumiaji na nenosiri kutoka kwenye cookie. Kitabu kinasema Zebra “inaauni mbinu za RPC zinazohitajika kuendesha programu nyingi za bwawa la uchimbaji” ([Kitabu: Endesha bwawa la uchimbaji](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Maelezo mawili kutoka Kitabu kabla ya kuchagua programu:

- **s-nomp ni ya majaribio pekee.** Kitabu huita usanidi wake wa s-nomp “wa majaribio” na kusema s-nomp “haiendani na NU5, hivyo baadhi ya kazi za uchimbaji zimezimwa”. Mwongozo wake wa [Testnet](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) unaongeza kwamba s-nomp “haijasasishwa rasmi kwa NU5 au maboresho ya mtandao ya baadaye” na huwaelekeza wachimbaji wa uzalishaji kwenye programu ya bwawa inayounga mkono maboresho ya sasa.
- **Zebra husafirisha mkusanyiko ulio tayari kutumika.** Hazina ya Zebra ina usanidi wa Docker Compose katika [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) unaoanzisha Zebra pamoja na bwawa la uchimbaji na, ukiomba, mchimbaji wa CPU. Bwawa lililomo ni s-nomp na huanza kwenye Testnet isipokuwa ulifanye mabadiliko, hivyo lichukulie kama njia ya kujifunza sehemu zinazobadilika.

### Njia ya Docker

Njia fupi zaidi ya Kitabu ni picha ya `zfnd/zebra` Docker, yenye anwani na porti ya RPC kupitishwa kama vigeu vya mazingira ([Kitabu: Uchimbaji kwa kutumia Zebra katika Docker](https://zebra.zfnd.org/user/mining-docker.html)). Amri iliyo hapa chini ni ya Kitabu ikiwa na badiliko moja: huchapisha porti ya RPC kwenye anwani ya loopback ya mwenyeji pekee, ili mashine nyingine zisiweze kuifikia.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Hii huanzisha node ya Mainnet, huchapisha porti ya P2P (8233) kwenye mwenyeji wa Docker, na hufanya porti ya RPC (8232) ifikiwe kutoka kwa mwenyeji mwenyewe pekee. Chapisha cookie kwa:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Weka `0.0.0.0` katika `ZEBRA_RPC__LISTEN_ADDR`.** Hiyo ndiyo anwani ambayo Zebra husikiliza ndani ya kontena. Docker hutuma porti iliyochapishwa kwenye kiolesura cha mtandao cha kontena lenyewe, hivyo Zebra inayosikiliza kwenye `127.0.0.1` ndani ya kontena haingepokea muunganisho huo, hata kutoka kwa mwenyeji. `127.0.0.1:` iliyo mbele ya `-p` ndiyo inayoweka porti nje ya mtandao.
- **Amri ya Kitabu** huchapisha porti ya RPC kwa `-p 8232:8232`, ambayo huifungua kwenye kila kiolesura cha mtandao cha mwenyeji.
- **Kufanya mazoezi kwenye Testnet**, ongeza `-e ZEBRA_NETWORK__NETWORK="Testnet"`, weka `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, chapisha `-p 18233:18233` na `-p 127.0.0.1:18232:18232`, na utoe anwani ya Testnet. Anwani ya Mainnet huizuia Zebra kuanza kwenye Testnet, na vivyo hivyo kinyume chake.

Kulipa wachimbaji na kushughulikia pochi viko nje ya sehemu hii. Kwa upande wa pochi, tazama [Zallet](/zcash-tech/zallet).

## Vidokezo na Mbinu Bora
- **Faida:** Tumia vikokotoo kama whattomine.com/coins/166-zec-equihash. Mfano: RTX 3060 (~300 Sol/s) hupata ~0.001 ZEC/siku kwa $50/ZEC, ukiondoa takriban $0.50 za umeme.
- **Faragha:** Tumia mabwawa ya faragha ikiwa yanapatikana; epuka kutumia tena anwani.
- **Usalama:** Tumia manenosiri madhubuti; washa 2FA kwenye mabwawa/pochi. Kamwe usishiriki funguo binafsi.
- **Utatuzi wa Matatizo:** Ikiwa hakuna shares, angalia firewall, kingavirusi, au usanidi usio sahihi. Jiunge na majukwaa kama forum.zcashcommunity.com au Reddit r/zec.
- **Mbadala:** Ikiwa hakuna faida, zingatia uchimbaji wa wingu au kuweka sarafu [staking] za sarafu nyingine.
- **Dokezo la Kimazingira:** Uchimbaji hutumia nishati; tumia vyanzo vinavyorejesheka ikiwezekana.
- **Masasisho:** Zcash huenda ikabadilika (kwa mfano, uwezekano wa kuhamia PoS); angalia z.cash kwa habari.
