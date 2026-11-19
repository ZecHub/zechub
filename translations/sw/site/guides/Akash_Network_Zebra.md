# Jinsi ya kuendesha Zebra kwenye Mtandao wa Akash

Mwongozo wa hatua kwa hatua wa kusambaza full node ya Zebra Zcash kwenye Akash.

### Unachosambaza

Full node ya Zebra ambayo:

-> Itasawazisha blockchain yote ya Zcash (100GB+ kwa mainnet, ~40GB kwa testnet)

-> Itagharimu takriban $15/mwezi kutegemea bei za tokeni za AKT

-> Itachukua saa kadhaa hadi siku kusawazisha kikamilifu

-> Itatumia vCPU 4, RAM 16GB, hifadhi 350GB (mainnet) au vCPU 2, RAM 8GB, 50GB (testnet)


Kiolezo cha awesome-akash sasa kimebana **Zebra 7.0.0** (kamwe `:latest`). Huwasha Prometheus (`9999`) na health (`8080`) ndani, JSON-RPC ndani kwa ajili ya **lightwalletd** iliyo kwenye eneo moja kupitia gRPC **9067**, na alama za vipengele `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`.

Kwa node ya Mainnet iliyopunguzwa na inayofanya kazi kwa kasi zaidi, tazama [Jinsi ya kuendesha Zakura kwenye Akash](/guides/akash-network-zakura). Kwa dashibodi ya Regtest inayoweza kutupwa, tazama [Hivyo ndivyo ilivyosemwa Zakura kwenye Akash](/guides/thus-spoke-zakura-akash).

### Jinsi Akash huchapisha porti

Nambari zilizo kwenye SDL (`port` / `as`) ni **milango ya kontena**. Zebra bado inasikiliza kwenye **8233**, lightwalletd kwenye **9067**, na ukaguzi wa afya kwenye **8080**. Nambari hizo ni za mchakato na huduma nyingine zilizo kwenye deployment hiyo hiyo (`zebra:8232`).

Hizo **si** port za IP ya umma ya mtoa huduma.

**Chaguomsingi (kiolezo hiki):** hakuna IP maalumu. Kwa kila `global: true` TCP inayowekwa wazi, mtoa huduma huelekeza **mlango wa juu uliochaguliwa nasibu** kwenye seva pangishi inayoshirikiwa hadi kwenye mlango wa kontena lako. Muda wa ukodishaji ukiisha, **Leases → URIs** katika Console/Air huorodhesha sehemu halisi za mwisho, kwa mfano:

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Vifaa vinavyounganishwa na pochi hutumia thamani hizo za host:port. Nakili URI ya expose unayotaka kutumia (P2P dhidi ya lightwalletd). Ukiweka `ZEBRA_NETWORK__EXTERNAL_ADDR`, iweke kwenye URI ya P2P iliyounganishwa (`provider.example:31482`), si `…:8233`.

**HTTP** (`as: 80` yenye `http_options`, inayotumika kwenye dashibodi ya Thus Spoke): watoa huduma wengi huchapisha **jina la host la ingress** (mara nyingi kwenye 80/443) badala ya port ya TCP isiyobainishwa. Fungua URI ya huduma hiyo kwenye kivinjari.

**Ya ndani** (`global: false` au `to: service: lightwalletd`): DNS ya cluster pekee (`zebra:8232`). Hakuna URI ya umma.

**Anwani za IP zilizotengwa** (`endpoints` / `kind: ip` katika SDL) ni **nyongeza ya gharama ya juu**. Zinaweza kuhusisha anwani ya IP ya umma na wakati mwingine porti ya `as` kwenye anwani hiyo ya IP. Violezo hivi **haviombi** anwani hiyo. Iongeze mwenyewe baadaye ukitaka `host:8233` thabiti; tarajia gharama ya ziada na watoa huduma wachache wa zabuni.

### Tovuti ipi ya kutumia (malipo)

SDL ni ile ile. Akash Kiolesura cha wavuti hutofautiana katika **jinsi unavyolipa**.

| Tovuti | Malipo | Pochi |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Malipo ya kawaida ya wavuti (kadi / njia za malipo ya fiat zinazotolewa na Console) | Akaunti ya Console |
| [air.akash.network](https://air.akash.network) | Malipo asilia ya Akash mnyororo (AKT / ACT) | **Keplr** |

Tumia **Air** unapotaka kulipa kwa kutumia Keplr on-chain. Tumia **Console** unapotaka mtiririko wa kawaida wa malipo ya wavuti. Usitarajie malipo ya moja kwa moja ya Keplr kwenye Console.

### Mahitaji ya Awali

**Ikiwa unalipa kwenye Console (malipo ya wavuti)**

1. Akaunti ya Console katika [console.akash.network](https://console.akash.network)
2. Njia ya malipo inayokubaliwa na kiolesura cha Console
3. Dakika chache kwenye kiolesura

**Ukilipa kwa kutumia Air (asili Akash / Keplr)**

1. Kiendelezi cha kivinjari **Keplr** (Chrome/Brave/Firefox)
2. **AKT / ACT** katika Keplr kwa ajili ya kuweka amana na kukodisha (kutoka kwenye soko la kubadilishana sarafu au IBC)
3. Fungua [air.akash.network](https://air.akash.network)

#### Hatua ya 1: Unganisha

**Dashibodi (malipo ya wavuti)**

-> Nenda kwenye [https://console.akash.network](https://console.akash.network)

-> Ingia / kamilisha mchakato wa akaunti ya Console

Tumia chaguo la malipo ambalo kiolesura kinawasilisha (si Keplr on-chain)

**Air (malipo asilia ya Akash)**

-> Nenda kwenye [https://air.akash.network](https://air.akash.network)

-> Bofya **“Unganisha Pochi”**

-> Chagua **Keplr** na uidhinishe muunganisho

-> Thibitisha kuwa salio lako la AKT/ACT linatosha kwa amana pamoja na ukodishaji

#### Hatua ya 2: Unda Usambazaji

-> Bofya **“Deploy”**

-> Chagua **“Jenga kiolezo chako”** (au ruka moja kwa moja hadi kupakia SDL)


##### Chaguo A: Pakia Faili la SDL (Linapendekezwa)

**Malipo ya wavuti (Console)**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Malipo asilia ya Akash kwa kutumia Keplr (Air)**

[Fungua kiolezo hiki kwenye Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Chaguo B: Tumia Kihariri cha SDL

Ikiwa unataka kunakili mwenyewe [SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Nakili maudhui ya *zebra-akash.yml*

-> Bandika kwenye kihariri cha SDL

-> Rekebisha inapohitajika (tazama sehemu ya usanidi hapa chini)

-> Bofya **“Unda Usambazaji”**


#### Hatua ya 3: Kagua na Idhinisha Amana

Kiolesura kitakuonyesha:

-> **Amana ya usambazaji**: ~5 AKT (utarejeshewa hii utakapofunga usambazaji)

-> **Gharama inayokadiriwa**: Kulingana na bei yako ya SDL

Kwenye **Air**, bofya **“Approve”** na uingie kwenye **Keplr**. Kwenye **Console**, kamilisha malipo ya wavuti yanayoonyeshwa kwenye kiolesura.

#### Hatua ya 4: Chagua Mtoa Huduma

Baada ya ~ sekunde 30, utaona zabuni kutoka kwa watoa huduma. Kila zabuni huonyesha:

-> **Bei kwa block** (katika AKT au USDC)

-> **Gharama ya kila mwezi inayokadiriwa**

-> **Maelezo ya mtoa huduma** (muda wa upatikanaji, eneo, n.k.)


**Usichague tu iliyo nafuu zaidi.** Kagua:

-> Asilimia ya muda wa upatikanaji (lenga > 95%)

-> Eneo (karibu nawe = muda mfupi zaidi wa kusubiri, lakini si muhimu sana kwa node za blockchain)

-> Hali ya ukaguzi (alama ya tiki ya kijani = ya kuaminika zaidi)


Bofya **“Kubali Zabuni”** kwenye mtoa huduma uliyemchagua. Kwenye Air, ingia Keplr. Kwenye Console, thibitisha kupitia mtiririko wa malipo wa wavuti.

#### Hatua ya 5: Subiri Usambazaji

Konsoli itafanya yafuatayo:

-> Kuunda ukodishaji na mtoa huduma uliyemchagua

-> Kutuma manifest (humwelekeza mtoa huduma cha kuendesha)

-> Kuwasha kontena lako

Hii huchukua dakika 1-2. Utaona masasisho ya hali kwenye kiolesura.

#### Hatua ya 6: Thibitisha Kwamba Inaendesha

Baada ya kusambazwa, utaona:

-> Kichupo cha **Huduma**: Huonyesha huduma yako ya *zebra* pamoja na hali yake

-> Kichupo cha **Kumbukumbu**: Kumbukumbu za moja kwa moja za kontena

-> Kichupo cha **Ukodishaji**: Maelezo kuhusu usambazaji wako (DSEQ, mtoa huduma, gharama)


##### Kagua Kumbukumbu

Bofya **Kumbukumbu** na unapaswa kuona Zebra ikianza:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Usawazishaji utachukua **saa hadi siku** kutegemea mtandao. Angalia:

-> Urefu wa block unaoongezeka

-> Miunganisho ya peer (inapaswa kuwa peer 10-30)

-> Kutokuwepo kwa hitilafu zinazojirudia


#### Hatua ya 7: Pata Anwani ya Node Yako

Bofya kichupo cha **Ukodishaji**, kisha **URI**.

Utaona kitu kama hiki:

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

Kila mstari ni `global: true` inayofichuliwa. Jina linajumuisha porti ya SDL `as` (8233, 9067). Nambari inayofuata jina la seva ni **porti iliyopangiwa na mtoa huduma**, inayotolewa wakati wa kukodisha. Node nyingine za Zcash huwasiliana na `provider-hostname.com:31482`. Pochi ndogo hutumia URI ya lightwalletd (TLS imezimwa isipokuwa ukisimamia mwisho wa TLS mwenyewe).

Kontena bado inasikiliza kwenye 8233 / 9067. Anwani ya umma daima ni URI, isipokuwa baadaye uongeze IP maalum (haipo kwenye kiolezo hiki).

### Chaguo za Usanidi

#### Kubadilisha hadi Testnet

SDL hutumia Mainnet kwa chaguomsingi. Ili kutumia Testnet badala yake:

-> **Weka kama maoni usanidi wa Mainnet** katika sehemu ya *env*:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Ondoa maoni kwenye usanidi wa Testnet**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> **Sasisha port iliyofichuliwa** katika sehemu ya *expose*:

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **Hiari: Punguza rasilimali** kwa Testnet katika *profiles.compute.zebra.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Hiari: Punguza bei** katika *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### Wezesha Ufikiaji wa RPC

RPC imezimwa kwa chaguomsingi kwa usalama. Ili kuiwezesha:

**Kwa Mainnet:**

-> Ondoa maoni katika sehemu ya *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Ondoa maoni kwenye port ya RPC ya Mainnet katika *expose*:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Kwa Testnet:**

-> Ondoa maoni katika sehemu ya *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Ondoa maoni kwenye port ya RPC ya Testnet katika *expose*:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Onyo**: Ukiweka *global: true* kwa RPC, unaifichua kwenye intaneti. Zebra hutumia uthibitishaji wa cookie kwa chaguomsingi, lakini bado - usifanye hivi isipokuwa unajua unachofanya.

Ikiwa utaweka RPC wazi kwa kutumia `global: true`, anwani ya umma bado ni **URI ya ukodishaji** (`host:&lt;random-high-port&gt;`), wala si `host:8232`. Kwa kutumia `global: false` (kiolezo hiki), RPC hubaki kwenye mtandao wa deployment (`zebra:8232` kwa ajili ya lightwalletd). Ukodishaji wa IP maalum ni chaguo tofauti la kulipia na haujajumuishwa kwenye SDL.

#### Wezesha Vipimo (Prometheus)

Ili kukusanya vipimo vya ufuatiliaji:

-> Ondoa maoni katika *env*:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Ondoa maoni kwenye port ya vipimo katika *expose*:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Rekebisha Rasilimali/Bei

Ikiwa hupati zabuni au unataka kuboresha gharama:

**Kwa watoa huduma wenye vipimo vya chini**, punguza katika sehemu ya *profiles.compute.zebra.resources*:

-> CPU: *units: 2* (kiwango cha chini kwa kasi inayofaa ya usawazishaji)

-> Kumbukumbu: *size: 12Gi* (kiwango cha chini kwa uthabiti)

-> Hifadhi: *size: 120Gi* (kiwango cha chini kwa mainnet)

**Ili kuvutia zabuni zaidi**, ongeza katika *profiles.placement.akash.pricing*:

-> Mainnet: Jaribu *amount: 1000000* uakt/block

-> Testnet: Jaribu *amount: 1000000* uakt/block

### Kusasisha Usambazaji Wako

Je, unahitaji kubadilisha usanidi baada ya kusambaza?

-> Nenda kwenye **Usambazaji Wangu** katika Konsoli

-> Tafuta usambazaji wako wa Zebra

-> Bofya **“Sasisha Usambazaji”**

-> Hariri SDL

-> Bofya **“Sasisha”** (Air: ingia Keplr; Console: thibitisha mtiririko wa malipo wa wavuti)

**Kumbuka**: Kusasisha kutaanzisha upya kontena lako. Node itaendelea kutoka hali yake iliyohifadhiwa (hifadhi endelevu), lakini tarajia dakika 1-2 za kutopatikana.

### Ufuatiliaji

#### Kupitia Konsoli

-> **Kichupo cha kumbukumbu**: Kumbukumbu za moja kwa moja za kontena

-> **Kichupo cha shell**: Pata shell ndani ya kontena (muhimu kwa utatuzi wa hitilafu)

-> **Kichupo cha matukio**: Matukio ya Kubernetes (kwa kiasi kikubwa hayana faida isipokuwa kuna kitu kimeharibika)


#### Kupitia RPC (ikiwa imewezeshwa)

Ikiwa uliwezesha RPC, unaweza kuuliza node yako kama full node ya kawaida ya zebrad (kwa sababu ndivyo ilivyo!)

### Kufunga Usambazaji Wako

Ukimaliza au unataka kuacha kulipa:

-> Nenda kwenye **Usambazaji Wangu**

-> Tafuta usambazaji wako wa Zebra

-> Bofya **“Funga Usambazaji”**

-> Thibitisha (Air: ingia kwenye akaunti Keplr; Console: thibitisha kwenye kiolesura cha Console)

Amana yako ya AKT 5 itarejeshwa. **Hifadhi endelevu** inapaswa kuhifadhiwa na mtoa huduma, lakini usiitegemee - ichukulie kama mtoa huduma mwingine yeyote wa wingu.

### Utatuzi wa Hitilafu

#### Hitilafu ya “Fedha hazitoshi”

Kwenye On Air, weka fedha kwenye Keplr kwa kutumia AKT/ACT. Kwenye Console, ongeza salio kwenye njia ya malipo ya Console.

#### Hakuna zabuni zinazoonekana

Huenda:

-> Bei yako ni ndogo sana (ongeza *amount* katika SDL)

-> Mahitaji yako ya rasilimali ni makubwa sana kwa watoa huduma wanaopatikana (punguza CPU/kumbukumbu/hifadhi)

-> Subiri zaidi (wakati mwingine huchukua sekunde 60-90 kwa zabuni kuonekana)


#### Usambazaji umekwama kwenye “unasubiri”

Huenda mtoa huduma ana matatizo. Funga usambazaji na ujaribu mtoa huduma tofauti.

#### Kumbukumbu za Zebra zinaonyesha “Hakuna peer waliounganishwa”

Hii ni kawaida kwa dakika chache za kwanza. Zebra itagundua peer kiotomatiki. Ikiendelea baada ya dakika 10+, huenda una tatizo la mtandao (jambo lisilo la kawaida kwenye Akash).

#### Hitilafu za “Kumbukumbu haitoshi” katika kumbukumbu

Ulipunguza RAM kupita kiasi. Funga usambazaji na usambaze tena ukiwa na angalau kumbukumbu 12Gi (16Gi inapendekezwa).

#### Usawazishaji unachukua muda mrefu sana

Fafanua “muda mrefu sana”:

-> **Saa**: Kawaida

-> **Siku**: Pia ni kawaida kwa mainnet kuanzia mwanzo

-> **Wiki**: Kuna tatizo, kagua kumbukumbu kwa hitilafu


### Usimamizi wa Gharama

Fuatilia matumizi yako kwenye Console au Air:

-> **Usambazaji Wangu** -> Usambazaji wako -> Huonyesha makadirio ya “Gharama kwa mwezi”

-> Air: Salio lako la AKT/ACT katika Keplr hupungua kadiri muda unavyopita. Console: Salio lako la malipo la Console hupungua.

Salio lako litakapopungua, Akash itafunga usambazaji wako kiotomatiki. **Ongeza salio kwenye pochi yako mara kwa mara** au weka arifa.

#### Kupunguza Gharama

-> **Tumia Testnet** kwa majaribio yasiyo ya uzalishaji (nafuu kwa 50%)

-> **Punguza CPU/kumbukumbu** ikiwa huhitaji usawazishaji wa haraka

-> **Chagua watoa huduma wa bei nafuu** (si busara kila wakati - muda wa upatikanaji ni muhimu)


### Mainnet dhidi ya Testnet

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

Anza na Testnet ikiwa unajaribu tu mchakato wa usambazaji. Tazama sehemu ya “Kubadilisha hadi Testnet” hapo juu kwa usanidi.

### Rasilimali za Ziada

**Akash Console** (malipo ya wavuti): [https://console.akash.network](https://console.akash.network)

**Akash Air** (AKT/ACT asilia + Keplr): [https://air.akash.network](https://air.akash.network)

**Nyaraka za Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Nyaraka za Zebra**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Vichunguzi vya Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Discord ya Akash**: [https://discord.akash.network](https://discord.akash.network) (kwa matatizo ya mtoa huduma)
