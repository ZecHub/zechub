# Jinsi ya kuendesha Zebra kwenye Mtandao wa Akash

Mwongozo wa hatua kwa hatua wa kusambaza full node ya Zebra Zcash ukitumia [Konsoli ya Akash](https://console.akash.network).

### Unachosambaza

Full node ya Zebra ambayo:

-> Itasawazisha blockchain yote ya Zcash (100GB+ kwa mainnet, ~40GB kwa testnet)

-> Itagharimu takriban $15/mwezi kutegemea bei za tokeni za AKT

-> Itachukua saa kadhaa hadi siku kusawazisha kikamilifu

-> Itatumia vCPU 4, RAM 16GB, hifadhi 350GB (mainnet) au vCPU 2, RAM 8GB, 50GB (testnet)


### Muhimu: Uwekaji Ramani wa Port kwenye Akash

Unapofichua port kwenye Akash (kwa mfano, port 8233 kwa P2P ya Zebra), **HAIFUNGIWI kwenye port hiyo kamili** kwenye IP ya umma ya mtoa huduma. Badala yake, mtoa huduma hukupatia port ya juu ya nasibu (kama 31234 au 42567) na huiunganisha kupitia reverse proxy kwenye port 8233 ya kontena lako.

Hii imeundwa hivi kwa makusudi - watoa huduma huendesha usambazaji mwingi, na kungekuwa na migongano ikiwa kila mtu angejaribu kutumia port 8233 moja kwa moja.

**Hii ina maana gani kwako:**

-> Unasanidi port 8233 katika SDL (port ya kawaida ya P2P ya Zebra)

-> Akash hukupa URI kama *provider.com:31234*

-> Node nyingine za Zcash huunganishwa nawe kupitia *provider.com:31234*

-> Ndani ya kontena lako, Zebra bado husikiliza kwenye 8233


Hili hushughulikiwa kiotomatiki. Tumia tu URI ambayo Akash inakupa.

### Mahitaji ya Awali

1. Kiendelezi cha kivinjari cha **Keplr Wallet** kimesakinishwa (Chrome/Brave/Firefox)
2. **Tokeni za AKT** - Pata AKT 50-100 kutoka kwenye soko la kubadilishana sarafu [exchange] (Coinbase, Kraken, Osmosis)
3. **Dakika 5** za kubofya kwenye kiolesura cha Konsoli

#### Hatua ya 1: Unganisha Pochi Yako

-> Nenda kwenye [https://console.akash.network](https://console.akash.network)

-> Bofya **“Unganisha Pochi”** kwenye sehemu ya juu kulia

-> Chagua **Keplr** (au pochi yako ya Cosmos unayoipendelea)

-> Idhinisha muunganisho Keplr itakapojitokeza


Salio lako la AKT linapaswa kuonekana sehemu ya juu kulia. Ikiwa ni sifuri, ongeza salio kwenye pochi yako kwanza.

#### Hatua ya 2: Unda Usambazaji

-> Bofya kitufe cha **“Sambaza”** (kitufe kikubwa cha bluu, katikati ya ukurasa)

-> Chagua **“Jenga kiolezo chako”** (au ruka moja kwa moja hadi kupakia SDL)


##### Chaguo A: Pakia Faili la SDL (Linapendekezwa)

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Chaguo B: Tumia Kihariri cha SDL

Ikiwa unataka kunakili mwenyewe [SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Nakili maudhui ya *zebra-akash.yml*

-> Bandika kwenye kihariri cha SDL

-> Rekebisha inapohitajika (tazama sehemu ya usanidi hapa chini)

-> Bofya **“Unda Usambazaji”**


#### Hatua ya 3: Kagua na Idhinisha Amana

Konsoli itakuonyesha:

-> **Amana ya usambazaji**: ~5 AKT (utarejeshewa hii utakapofunga usambazaji)

-> **Gharama inayokadiriwa**: Kulingana na bei yako ya SDL

Bofya **“Idhinisha”** na utie sahihi kwenye muamala [transaction] katika Keplr.

#### Hatua ya 4: Chagua Mtoa Huduma

Baada ya ~ sekunde 30, utaona zabuni kutoka kwa watoa huduma. Kila zabuni huonyesha:

-> **Bei kwa block** (katika AKT au USDC)

-> **Gharama ya kila mwezi inayokadiriwa**

-> **Maelezo ya mtoa huduma** (muda wa upatikanaji, eneo, n.k.)


**Usichague tu iliyo nafuu zaidi.** Kagua:

-> Asilimia ya muda wa upatikanaji (lenga > 95%)

-> Eneo (karibu nawe = muda mfupi zaidi wa kusubiri, lakini si muhimu sana kwa node za blockchain)

-> Hali ya ukaguzi (alama ya tiki ya kijani = ya kuaminika zaidi)


Bofya **“Kubali Zabuni”** kwa mtoa huduma uliyemchagua na utie sahihi katika Keplr.

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

```bash
zebra-8233: provider-hostname.com:31234
```

Hii ni **endpoint ya umma ya P2P** ya node yako. Node nyingine za Zcash zitaunganishwa nawe kwenye anwani hii.

**Tambua uwekaji ramani wa port:** Ulisanidi port 8233 katika SDL, lakini Akash iliipangia port tofauti ya umma (31234 katika mfano huu). Hii ni kawaida - tazama sehemu ya “Uwekaji Ramani wa Port kwenye Akash” hapo juu ikiwa hili linakuchanganya. Node yako inaweza kufikiwa kwenye port yoyote ambayo Akash inaonyesha hapa, si lazima 8233.

Ikiwa uliwezesha RPC (imewekwa kama maoni kwa chaguomsingi katika SDL), utaona pia endpoint ya RPC hapa pamoja na port yake yenyewe iliyowekwa ramani.

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

**Kikumbusho cha uwekaji ramani wa port**: Hata ukifichua RPC kimataifa, Akash itaiweka kwenye port ya juu ya nasibu (si 8232/18232). Kagua URI katika usambazaji wako ili kuona endpoint halisi ya umma. Kwa *global: false* (inayopendekezwa), endpoint ya RPC inaweza kufikiwa tu ndani ya mtandao wa usambazaji wa Akash, si kutoka kwenye intaneti ya umma.

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

-> Bofya **“Sasisha”** na uidhinishe katika Keplr

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

-> Thibitisha na utie sahihi katika Keplr

Amana yako ya AKT 5 itarejeshwa. **Hifadhi endelevu** inapaswa kuhifadhiwa na mtoa huduma, lakini usiitegemee - ichukulie kama mtoa huduma mwingine yeyote wa wingu.

### Utatuzi wa Hitilafu

#### Hitilafu ya “Fedha hazitoshi”

Unahitaji AKT zaidi. Weka salio kwenye pochi yako ya Keplr.

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

Fuatilia matumizi yako katika Konsoli:

-> **Usambazaji Wangu** -> Usambazaji wako -> Huonyesha makadirio ya “Gharama kwa mwezi”

-> Salio la pochi yako ya Keplr litapungua kadiri muda unavyopita


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

**Konsoli ya Akash**: [https://console.akash.network](https://console.akash.network)

**Nyaraka za Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Nyaraka za Zebra**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Vichunguzi vya Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Discord ya Akash**: [https://discord.akash.network](https://discord.akash.network) (kwa matatizo ya mtoa huduma)
