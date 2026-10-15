# Mwongozo wa Uchimbaji Zcash: Kujiunga na Dimbwi la Uchimbaji Madini kwa Kutumia Vifaa vya Kibinafsi

## Utangulizi

Zcash (ZEC) ni sarafu ya kidijitali inayozingatia faragha ambayo hutumia algoriti ya uthibitisho wa kazi ya Equihash kwa uchimbaji madini. Uchimbaji madini Zcash inahusisha kutumia nguvu ya kompyuta kutatua matatizo magumu ya hisabati, kuthibitisha miamala, na kulinda mtandao badala ya zawadi za ZEC. Kwa sababu ya ugumu mkubwa wa mtandao, uchimbaji madini peke yako haupendekezwi kwa watumiaji wengi. Kujiunga na kundi la uchimbaji madini ndiyo njia bora ya kupata zawadi thabiti kwa kuchanganya nguvu yako ya hashi na wengine.

Mwongozo huu unazingatia uchimbaji wa Zcash kwa kutumia vifaa vya kibinafsi (km., Kompyuta ya nyumbani yenye GPU au ASIC za kiwango cha kwanza). Kumbuka kwamba ingawa GPU bado zinaweza kuchimba Zcash, ASIC zina ufanisi zaidi na zina faida zaidi mwaka wa 2026 kutokana na ugumu wa mtandao. Daima angalia faida ya sasa kwa kutumia zana kama WhatToMine.com, kwani mambo kama vile gharama za umeme, bei za vifaa, na thamani ya ZEC huathiri uwezo wa kuishi. Uchimbaji huenda usiwe na faida kwa kila mtu; tafiti kanuni za ndani na viwango vya nishati (lengo la < $0.08/kWh).


## Mahitaji

### Vifaa
- **Uchimbaji wa GPU (Usanidi Binafsi Unaopendekezwa kwa Wanaoanza):**
  - GPU za NVIDIA au AMD zenye angalau 4GB VRAM (km, NVIDIA GTX 1070, RTX 3060; AMD RX 580 au zaidi).
  - Motherboard inayooana, PSU ya kutosha (angalau 750W kwa GPU nyingi), na upoezaji mzuri ili kuzuia joto kupita kiasi.
  - Rigi za GPU nyingi ni za kawaida kwa viwango bora vya hash (km, GPU 6x zinaweza kufikia 1-2 kSol/s).
- **Uchimbaji wa ASIC (Ufanisi Zaidi Lakini Gharama ya Juu):**
  - ASIC zinazoendana na Equihash kama vile Bitmain Antminer Z15 (420 kSol/s) au Innosilicon A9 (50 kSol/s).
  - Hizi zina sauti kubwa, zina joto zaidi, na hutumia nguvu zaidi (km, 1500W+); zinafaa kwa nafasi maalum. Nunua kutoka kwa vyanzo vinavyoaminika kama Bitmain.com au wauzaji wengine (Blockware Mining).
- **Jumla:** Intaneti thabiti, kompyuta ya kuanzisha/kufuatilia. ASIC zinatawala mtandao (jumla ya hashrate ya GSol/s ~13 mwaka wa 2026), na kufanya uchimbaji wa GPU usiwe wa ushindani lakini bado unawezekana kwa wanaopenda burudani.

### Programu
- **Mfumo Uendeshaji:** Windows 10/11, Linux (Ubuntu inapendekezwa kwa uthabiti).
- **Programu ya Uchimbaji Madini:**
  - Kwa GPU: lolMiner (inaunga mkono AMD/NVIDIA), GMiner, au miniZ (inayolenga NVIDIA). Pakua kutoka kwa hifadhi rasmi GitHub (km, github.com/Lolliedieb/lolMiner-releases).
  - Kwa ASIC: Tumia programu dhibiti/dashibodi iliyojengewa ndani ya mtengenezaji (km, kiolesura cha wavuti cha Bitmain).
- **Pochi:** Pochi ya Zcash ya kupokea malipo. Imependekezwa:
  - Iliyolindwa (ya faragha): Pochi ya ZODL, Zingo (Simu/Kompyuta), Zkool (simu/kompyuta).
  - Uwazi (rahisi lakini si wa faragha): Edge Wallet, Zecwallet Lite.
  - Pakua kutoka [pochi](https://zechub.wiki/wallets)Tengeneza anwani iliyolindwa (huanza na 'zs') kwa ajili ya faragha ikiwa bwawa la kuogelea linaiunga mkono.

### Nyingine
- Umeme: Hesabu gharama. GPU hutumia 150-300W kwa kila kadi; ASIC 1000W+.
- Antivirusi: Zima wakati wa usanidi kwani inaweza kuashiria wachimbaji kama vitisho.

## Mwongozo wa Hatua kwa Hatua wa Kujiunga na Bwawa la Uchimbaji Madini

### Hatua ya 1: Sanidi Pochi Yako Zcash
1. Pakua na usakinishe pochi kutoka kwa tovuti rasmi Zcash [pochi](https://zechub.wiki/wallets).
2. Unda pochi mpya na uhifadhi nakala rudufu ya kifungu chako cha mbegu kwa usalama.
3. Tengeneza anwani ya kupokea (ikiwezekana iliyolindwa kwa ajili ya faragha). Iandike, k.m., `zs1exampleaddress...`.
4. Ukitumia anwani inayoonekana wazi (huanza na 't'), ni rahisi lakini hutoa faragha kidogo.

### Hatua ya 2: Tayarisha Vifaa Vyako
- Kwa GPU:
  1. Sakinisha GPU kwenye PC yako na usasishe madereva (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Saa ya ziada ikiwa una uzoefu (tumia MSI Afterburner kwa uthabiti; lenga saa ya msingi ya +100-200, kumbukumbu ya -500 kwa ufanisi).
- Kwa ASIC:
  1. Unganisha ASIC kwenye umeme na Ethaneti.
  2. Tafuta anwani yake ya IP kwa kutumia kifaa kama vile Kichanganuzi cha IP cha Kinachoendelea au programu ya mtengenezaji.
  3. Fikia dashibodi ya wavuti (km, ingiza IP katika kivinjari, kuingia chaguo-msingi: mzizi/mzizi wa Bitmain).

**Onyo:** Hakikisha uingizaji hewa mzuri; uchimbaji hutoa joto. Anza kidogo ili kujaribu.

### Hatua ya 3: Chagua na Ujiunge na Dimbwi la Uchimbaji Madini
Mabwawa ya uchimbaji madini husambaza kazi na kushiriki zawadi kulingana na kiwango chako cha hashra kilichochangiwa. Chagua kulingana na ada (0-2%), kiwango cha chini cha malipo (0.01-0.1 ZEC), eneo (ping ya chini), na uaminifu.

**Mabwawa Yanayopendekezwa (Kulingana na Hashrate, Ada, na Mapitio):**
- **2Miners (zec.2miners.com)**: Ada ya 1%, malipo ya PPLNS, inasaidia GPU/ASIC/NiceHash. Kiwango cha juu cha kasi (~1.17 GSol/s), seva zinazoaminika.
- **F2Pool (zec.f2pool.com)**: Ada ya 2%, malipo ya PPS+, usaidizi wa sarafu nyingi. Bwawa kubwa la kuogelea (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: Ada ya 2% (PPS+), dashibodi rahisi kutumia, seva za kimataifa.
- **AntPool (zec.antpool.com)**: Ada ya 1%, kutoka Bitmain, nzuri kwa ASICs (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Bwawa la kitaalamu la uchimbaji madini Zcash kutoka Foundry Digital. Inatumia malipo ya PPLNS, inatoa ufuatiliaji wa zawadi kwa uwazi na usaidizi wa kiwango cha biashara. Inafaa zaidi kwa wachimbaji wa ASIC wa taasisi na wakubwa; inahitaji uthibitishaji wa akaunti.
- **Sovright (mining.sovright.com)**: Bwawa la Zcash lililojengwa kwenye Stratum V2, ambalo kwa sasa linaendeshwa kama mtandao wa majaribio wa umma. Hakuna malipo ya moja kwa moja ZEC bado, kwa hivyo ichukulie kama njia ya kujaribu usanidi wako badala ya chanzo cha mapato. Tazama sehemu maalum hapa chini kwa maelezo zaidi.
- Nyingine: Kryptex Pool, Luxor (angalia poolwatch.io/coin/zcash kwa takwimu za wakati halisi).

1. Tembelea tovuti ya bwawa la kuogelea na ufungue akaunti (barua pepe au usijisajili kwa baadhi kama 2Miners).
2. Ongeza anwani yako ya pochi ya Zcash katika mipangilio ya malipo.
3. Kumbuka seva ya tabaka ya bwawa (km, zec.2miners.com:1010) na lango.

### Hatua ya 4: Sakinisha na Usanidi Programu ya Uchimbaji Madini
- Kwa GPU (Mfano: lolMiner kwenye Windows/Linux):
  1. Pakua lolMiner kutoka GitHub (toleo jipya zaidi, k.m., 1.88).
  2. Dondoo kwenye folda.
  3. Unda faili ya kundi (start.bat) yenye usanidi:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Badilisha `YOUR_WALLET_ADDRESS` na anwani yako ZEC.
     - `WORKER_NAME`: Jina la kifaa chako (km. Rig1).
     - Kwa seva za EU: eu.zec.2miners.com:1010.
  4. Endesha faili ya kundi. Itaunganishwa kwenye bwawa na kuanza kuchimba.
- Kwa ASIC (Mfano: Bitmain Antminer):
  1. Ingia kwenye dashibodi ya wavuti.
  2. Nenda kwenye Usanidi wa Miner.
  3. Ongeza maelezo ya bwawa la kuogelea:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Jina la mtumiaji: YOUR_WALLET_ADdress.WORKER_NAME
     - Nenosiri: x (au tupu).
  4. Hifadhi na uwashe upya mchimbaji.
- Kwa programu nyingine (km, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Jaribio:** Endesha kwa dakika 10-15; angalia kiweko cha dashibodi kwa hisa zinazokubalika na kiwango cha hashra.

### Hatua ya 5: Anza Kuchimba na Kufuatilia
1. Anzisha mchimbaji: itaunganishwa kwenye bwawa la kuogelea na kuanza kuwasilisha hisa.
2. Kifuatiliaji kupitia:
   - Dashibodi ya bwawa la kuogelea: Ingiza anwani yako ya pochi ili kuona hashrate, salio lisilolipwa, na takwimu.
   - Kiweko cha programu: Angalia hitilafu, halijoto (weka chini ya nyuzi joto 80 Selsiasi).
   - Zana: Tumia HiveOS au SimpleMining OS kwa usimamizi wa vifaa vya mbali.
3. Malipo: Mabwawa mengi hulipa kiotomatiki unapofikia kiwango cha chini kabisa (km, 0.05 ZEC). Angalia sheria za bwawa.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Mtandao wa Bwawa la Testnet na Relay

Sovright (sovright.com) inaendesha bwawa la uchimbaji madini la Stratum V2 na mtandao tofauti wa kupokezana vizuizi. Wanafanya kazi tofauti, kwa hivyo wamefunikwa kando hapa chini.

### Bwawa la Uchimbaji Madini (mining.sovright.com)

Bwawa Sovright's linaendeshwa kwenye mtandao wa majaribio Zcash wa umma (NU6, Stratum V2), sio mtandao mkuu. Mtandao wa majaribio haulipi ZEC. Itumie kujaribu usanidi wa wachimbaji wako, sio kupata pesa.

- Hakuna akaunti inayohitajika kuanza. Elekeza CPU au ASIC Equihash mgodini kwenye bwawa la kuogelea na hisa zako zitaonekana kwenye dashibodi ya moja kwa moja.
- Sovright pia huchapisha proksi huria ya Stratum V2 kwa wachimbaji ambao wanataka kuchagua templeti zao za block badala ya kuchukua tu kazi za bwawa:

### Ufuatiliaji wa Uvumbuzi wa Zcash Pool

Kwa watumiaji wa Foundry Zcash Pool:

- Fuatilia utendaji wa wachimbaji madini kupitia dashibodi ya bwawa la Foundry.
- Angalia:
  - Wafanyakazi wanaofanya kazi
  - Kiwango cha hash kilichoripotiwa
  - Hisa zilizokubaliwa
  - Zawadi zilizokadiriwa
  - Hali ya malipo

Kwa sababu Foundry hutumia mfumo wa zawadi wa PPLNS, zawadi za uchimbaji hutegemea hisa zilizochangiwa katika dirisha la zawadi la bwawa badala ya hashrate ya papo hapo pekee.

Mbinu za ufuatiliaji zilizopendekezwa:
- Linganisha hashrate ya dashibodi ya ASIC na hashrate iliyoripotiwa na Foundry.
- Chunguza hisa zilizokataliwa, hisa zilizopitwa na wakati, au kutokuwa na utulivu wa muunganisho.
- Dumisha muunganisho thabiti wa mtandao kwa sababu muda wa kutofanya kazi hupunguza hisa zilizowasilishwa na zawadi zinazowezekana.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Mwelekeze mchimbaji wako kwenye proksi badala ya bwawa moja kwa moja:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  kutumia jina la mfanyakazi kama `yourname.rig1`.
- Ukurasa wa uwazi Sovright's unasema sera ya "jumuisha yote" kwa miamala iliyolindwa, tofauti na baadhi ya mabwawa yanayoichuja. Kila kizuizi hupata uthibitisho uliosainiwa ili sera iweze kukaguliwa kwa kujitegemea.
- Fungua akaunti katika mining.sovright.com (ingia kwa Google au barua pepe) ili kufuatilia wafanyakazi wako mwenyewe badala ya data ya dashibodi ya mfano.

### Mtandao wa Relay (relay.sovright.com)

Sovright huendesha mtandao wa upokeaji wa vitalu vya umma kwenye mtandao mkuu wa Zcash kando. Bwawa linapopata vitalu, kasi ya vitalu hivyo kufikia sehemu nyingine ya mtandao huamua ni mara ngapi vinakuwa yatima, ikimaanisha kuwa vinapoteza mbio za uenezaji na zawadi yake hupotea. Usambazaji wa mbele wa vitalu huzuia katika maeneo manne kwa kutumia upokeaji wa vitalu vidogo vyenye marekebisho ya hitilafu ya mbele.

Dashibodi ya umma inaonyesha athari moja kwa moja: maeneo yaliyounganishwa na relay huona vizuizi vipya katika muda usiozidi nusu ya muda ambao uvumi wa rika kwa rika huchukua, na dashibodi hufuatilia kiwango cha walemavu wa mtandao.

Hii ni miundombinu kwa waendeshaji wa bwawa la kuogelea, si wachimbaji binafsi. Chanzo huria Sovright's `mining-infra` hati za hifadhi `submitblock` Lango la kupokezana kwa ajili ya kupeperusha lilipata vizuizi kwenye matundu haraka kuliko P2P asilia. Ili kuunganisha, wasiliana na Sovright moja kwa moja (support@sovright.com) kwa anwani rika za kupokezana na ufunguo wa uidhinishaji.


## Uchimbaji dhidi ya nodi yako mwenyewe Zebra

Kila kitu hapo juu kinamwelekezea mchimbaji wako kwenye bwawa la mtu mwingine. Njia nyingine ni kuendesha nodi mwenyewe na kuiomba programu yako ya uchimbaji ifanye kazi. Kwa kuwa zcashd ilisimama tarehe 18 Julai 2026, hiyo ina maana kwamba [Zebra](/zcash-tech/zebra-full-node), nodi ambayo sehemu hii inashughulikia.

Sehemu Zebra's ni ndogo na mahususi: hujenga templeti za vitalu na hukubali vitalu vilivyotatuliwa kupitia kiolesura chake cha RPC. Uhamisho hufanywa na programu ya uchimbaji, na kushiriki zawadi kati ya wachimbaji kadhaa ni kazi ya programu ya pool. Ikiwa uchimbaji pekee hupata vitalu inategemea sehemu yako ya kiwango cha hash cha mtandao, ambacho sehemu hii haijaribu kukadiria. Ndiyo maana utangulizi wa ukurasa huu haupendekezi uchimbaji wa pekee kwa watumiaji wengi.

Hatua hizo zinafuata kurasa mbili za Kitabu cha Zebra, [Kuchimba Zcash na Zebra](https://zebra.zfnd.org/user/mining.html) na [Uchimbaji wa madini na Zebra katika Docker](https://zebra.zfnd.org/user/mining-docker.html), kama zilivyotokea tarehe 8 Oktoba 2026. Majina muhimu na chaguo-msingi hubadilika kati ya matoleo, kwa hivyo angalia Kitabu kabla ya kutegemea kimoja.

### Weka anwani inayopokea zawadi

Unda faili ya usanidi yenye mipangilio chaguo-msingi, kisha uihariri:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Anwani ya mchimbaji inahitajika ([Kitabu: Anwani ya wachimbaji madini](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra hukubali anwani ya P2PKH au P2SH inayoeleweka, anwani Sapling, au Unified Address. Kwa Unified Address yenye zaidi ya mpokeaji mmoja, Kitabu kinasema Zebra humlipa mpokeaji mmoja, "akipendelea Orchard, kisha Sapling, kisha inayoeleweka".

Funguo mbili za hiari huenda sawa `[mining]` sehemu:

| Ufunguo | Inafanya nini | Kikomo |
|---|---|---|
| `extra_coinbase_data` | Huongeza lebo ya umma, kama vile jina la bwawa, kwenye ingizo la coinbase la kila kizuizi unachochimba, baada ya alama Zebra's mwenyewe ([Kitabu](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | Baiti 86. Juu ya hapo, "Zebra anakataa kuanza" |
| `miner_memo` | Huambatanisha memo iliyolindwa kwenye matokeo ya zawadi. Tofauti na `extra_coinbase_data` Sio ya umma: ni mtu mwenye ufunguo wa kutazama anwani ya kupokea pekee anayeweza kuisoma ([Kitabu](https://zebra.zfnd.org/user/mining.html#miner-memo)) | Baiti 512. Inafanya kazi tu wakati zawadi inapoenda kwa mpokeaji aliyelindwa. Kwa anwani iliyo wazi "haina athari kimya kimya" |

### Fungua mlango wa RPC

Programu ya uchimbaji madini inazungumza na Zebra kuhusu JSON-RPC, ambayo hukaa kimya hadi utakapompa anwani ya kusikiliza ([Kitabu: Sehemu ya RPC](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 ni mlango wa kawaida wa RPC kwenye Mainnet. `127.0.0.1` huweka mlango unaoweza kufikiwa kutoka kwa mashine moja pekee.

Kwa kuwa Zebra 2.0.0, kidakuzi hulinda mlango wa RPC, mbinu inayofanana na ile iliyotumiwa zcashd. Zebra huandika kidakuzi wakati sehemu ya mwisho ya RPC inapoanza na kuifuta wakati wa kuzima. Kwa chaguo-msingi faili huwekwa kwenye saraka ya akiba Zebra's, kwa mfano `/home/user/.cache/zebra/.cookie` kwenye Linux, na inashikilia mstari mmoja:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` huhamisha faili. `rpc.enable_cookie_auth = false` Huzima hundi, na kwa hiyo uthibitishaji pekee ambao mlango wa RPC una: chochote kinachoweza kufikia mlango kinaweza kuiita.

### Anza Zebra na uiache isawazishe

```bash
zebrad
```

Zebra husoma usanidi kutoka eneo chaguo-msingi `-c /path/to/zebrad.toml` kutumia faili nyingine. Subiri usawazishaji ukamilike. Kumbukumbu inaonekana `sync_percent=100.000%` wakati ina ([Kitabu: Mbio za pundamilia](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Kifundo Kamili cha Zebra](/zcash-tech/zebra-full-node) hufunika vifaa na nafasi ya diski.

### Iangalie kwa kutumia getblocktemplate

`getblocktemplate` Je, programu ya kuchimba simu hufanya ili kupata kazi, kwa hivyo pia ni jaribio la haraka zaidi ([Kitabu: Kujaribu usanidi](https://zebra.zfnd.org/user/mining.html#testing-the-setup)Weka yaliyomo kwenye faili yako ya vidakuzi mahali pa `__cookie__:PASSWORD`:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Mpangilio unaofanya kazi unarudisha `result` kupinga mashamba ambayo mchimbaji madini anahitaji, miongoni mwa hayo `previousblockhash`, `coinbasetxn`, `target` na `height`. Ukiweka `extra_coinbase_data`Kitabu kinaelezea jinsi ya kupata lebo yako katika `coinbasetxn.data`.

### Elekeza programu yako ya uchimbaji kwenye hilo

Ipe programu yako ya uchimbaji madini au bwawa la kuogelea sehemu ya mwisho ya RPC, `127.0.0.1:8232`, na jina la mtumiaji na nenosiri kutoka kwa kidakuzi. Kitabu kinasema Zebra "inaunga mkono mbinu za RPC zinazohitajika kuendesha programu nyingi za uchimbaji madini" ([Kitabu: Endesha bwawa la kuchimba madini](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Maelezo mawili kutoka Kitabu kabla ya kuchagua programu:

- **s-nomp ni ya majaribio pekee.** Kitabu hiki kinaita usanidi wake wa s-nomp "majaribio" na kinasema s-nomp "haioani na NU5, kwa hivyo baadhi ya kazi za uchimbaji zimezimwa" [Mwongozo wa Testnet](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) anaongeza kwamba s-nomp "haijasasishwa rasmi kwa ajili ya uboreshaji wa mtandao NU5 au wa baadaye" na anawaelekeza wachimbaji wa uzalishaji kuunganisha programu inayounga mkono uboreshaji wa sasa.
- **Zebra husafirisha rundo lililotengenezwa tayari.** Hifadhi ya Zebra ina usanidi wa Docker Compose ndani [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) Hiyo huanzisha Zebra pamoja na bwawa la kuchimba madini na, ukiiomba, mchimbaji wa CPU. Bwawa lililo ndani yake ni s-nomp na huanza kwenye Testnet isipokuwa utalibadilisha, kwa hivyo lichukulie kama njia ya kujifunza sehemu zinazosogea.

### Njia Docker

Njia fupi zaidi ya Kitabu ni `zfnd/zebra` Picha Docker, yenye anwani na mlango wa RPC uliopitishwa kama vigezo vya mazingira ([Kitabu: Uchimbaji wa Madini na Zebra katika Docker](https://zebra.zfnd.org/user/mining-docker.html)Amri iliyo hapa chini ni ya Kitabu yenye mabadiliko moja: huchapisha mlango wa RPC kwenye anwani ya kurudi nyuma ya mwenyeji pekee, kwa hivyo mashine zingine haziwezi kuufikia.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Hii huanzisha nodi ya Mainnet, huchapisha lango la P2P (8233) kwenye seva pangishi Docker, na hufanya lango la RPC (8232) liweze kufikiwa kutoka kwa seva pangishi yenyewe pekee. Chapisha kidakuzi kwa:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Weka `0.0.0.0` in `ZEBRA_RPC__LISTEN_ADDR`.** Hiyo ndiyo anwani ambayo Zebra husikiliza ndani ya kontena. Docker husambaza mlango uliochapishwa kwenye kiolesura cha mtandao cha kontena, hivyo Zebra husikiliza `127.0.0.1` ndani ya chombo haingepokea muunganisho, hata kutoka kwa mwenyeji `127.0.0.1:` mbele ya `-p` ndicho kinachozuia lango kutoka kwa mtandao.
- **Amri ya Kitabu** huchapisha mlango wa RPC kwa kutumia `-p 8232:8232`, ambayo huifungua kwenye kila kiolesura cha mtandao cha mwenyeji.
- **To practise on Testnet**, add `-e ZEBRA_NETWORK__NETWORK="Testnet"`, set `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, publish `-p 18233:18233` and `-p 127.0.0.1:18232:18232`, and give a Testnet address. A Mainnet address stops Zebra from starting on Testnet, and the other way round.

Kulipa wachimbaji na kushughulikia pochi ziko nje ya sehemu hii. Kwa upande wa pochi, tazama [Zallet](/zcash-tech/zallet).

## Vidokezo na Mbinu Bora
- **Faida:** Tumia vikokotoo kama whattomine.com/coins/166-zec-equihash. Mfano: RTX 3060 (~300 Sol/s) hupata ~0.001 ZEC/day kwa $50/ZEC, ukiondoa ~$0.50 ya umeme.
- **Faragha:** Tumia mabwawa ya kuogelea yenye ulinzi ikiwa yanapatikana; epuka kutumia anwani tena.
- **Usalama:** Tumia manenosiri thabiti; wezesha 2FA kwenye mabwawa/pochi. Kamwe usishiriki funguo za faragha.
- **Kutatua matatizo:** Ikiwa hakuna ushiriki, angalia ngome, antivirus, au usanidi usiofaa. Jiunge na mijadala kama vile forum.zcashcommunity.com au Reddit r/zec.
- **Njia Mbadala:** Ikiwa haina faida, fikiria kuchimba madini kwa wingu au kuweka sarafu zingine kwenye dau.
- **Dokezo la Mazingira:** Uchimbaji madini hutumia nishati; tumia vyanzo mbadala ikiwezekana.
- **Masasisho:** Zcash inaweza kubadilika (km, mabadiliko ya PoS yanayowezekana); angalia z.cash kwa habari.
