# Jinsi ya kuendesha Zebra juu ya Mtandao Akash

Hatua kwa hatua mwongozo wa kupeleka Zebra Zcash full node kutumia [Akash Console](https://console.akash.network).

### Unachofanya

full Zebra node ambayo itakuwa:

-> Sync nzima Zcash blockchain (100GB + kwa mainnet, ~ 40GB kwa testnet)

-> Gharama takriban $ 15 / mwezi kulingana na bei AKT ishara

-> Kuchukua masaa kadhaa kwa siku kabisa kulandanisha

-> Matumizi 4 vCPUs, 16GB RAM, 350GB kuhifadhi (mainnet) au 2 vCPU, 8GB RAM , 50GB (testnet)


### Muhimu: Ramani ya Bandari kwenye Akash

When you expose a port on Akash (e.g., port 8233 for Zebra P2P), it **does NOT bind to that exact port** on the provider's public IP. Instead, the provider assigns a random high port (like 31234 or 42567) and reverse-proxies it to your container's port 8233.

Hii ni kwa kubuni - watoa kukimbia kupelekwa nyingi, na wao d kuwa na migogoro kama kila mtu alijaribu kutumia bandari 8233 moja kwa moja.

** Hii inamaanisha nini kwako:**

-> Wewe Configure bandari 8233 katika SDL (kiwango Zebra ya P2P bandari)

-> Akash inakupa URI kama * mtoa huduma.com:31234*

-> nodes nyingine Zcash kuungana na wewe katika * mtoa huduma.com:31234*

-> Ndani ya chombo yako, Zebra bado anasikiliza kwenye 8233


Hii ni kushughulikiwa moja kwa moja. Tu kutumia URI kwamba Akash inakupa.

### Mahitaji ya awali

1. ** Keplr Wallet ** kiendelezi kivinjari imewekwa (Chrome/Brave/Firefox)
2. Kupata 50-100 AKT kutoka kubadilishana (Coinbase, Kraken, Osmosis)
3. ** Dakika 5 ** kubonyeza kupitia UI Console

#### Hatua ya 1: Kuunganisha mkoba wako

-> Go to [https://console.akash.network](https://console.akash.network)

-> Bonyeza **"Kuunganisha Wallet"** juu kulia

-> Chagua ** Keplr ** (au Cosmos yako favorite mkoba)

-> Kuidhinisha uhusiano wakati Keplr pops up


Akiba yako ya AKT inapaswa kuonekana juu kulia. Kama ni sifuri, kwenda fedha mkoba wako kwanza.

#### Hatua ya 2: Kujenga kupelekwa

-> Bonyeza **"Kupeleka"** kifungo (kubwa bluu kifungo, katikati ya ukurasa)

-> Chagua **"Kujenga template yako"** (au kuruka moja kwa moja kwa uploading SDL)


##### Chaguo A: Upload SDL faili (Ilipendekeza)

[!] Kuweka juu ya Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Chaguo B: Tumia SDL Mhariri

Kama unataka kuweka manually [SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Nakili yaliyomo ya *zebra-akash.yml*

-> Weka katika mhariri SDL

-> Kurekebisha kama inahitajika (tazama sehemu Configuration chini)

-> Bonyeza **"Kuunda kupelekwa"**


#### Hatua ya 3: Tathmini na Kuidhinisha Amana

Console atakuonyesha:

-> ** Deposit kupelekwa **: ~ 5 AKT (kupata hii nyuma wakati wewe kufunga kupelekwa)

-> **Makadirio ya gharama**: Kulingana na SDL yako bei

Bonyeza ** "Kukubali"** na saini shughuli katika Keplr.

#### Hatua ya 4: Chagua Mtunzaji

Baada ya ~ sekunde 30, utaona zabuni kutoka kwa watoa. Kila zabuni inaonyesha:

-> ** Bei kwa kila block** (katika AKT au USDC)

-> **Makadirio ya gharama ya kila mwezi**

-> **Utoaji maelezo** (uptime, mkoa, nk)


**Usichague tu ya bei rahisi.** Angalia:

-> Uptime % (njia kwa ajili ya > 95%)

-> Mkoa (karibu na wewe = latency bora, lakini haijalishi sana kwa nodes blockchain)

-> Hali ya ukaguzi (kijani checkmark = zaidi ya kuaminika)


Bonyeza **"Kubali Bid"** juu ya mtoa huduma yako kuchaguliwa na ishara katika Keplr.

#### Hatua 5: Kusubiri kwa ajili ya kupelekwa

Console itakuwa:

-> Kujenga kukodisha na mtoa huduma yako mteule

-> Tuma orodha (huambia mtoa nini kukimbia)

-> Kuanza chombo yako

Hii inachukua dakika 1-2. Utaona updates hali katika UI.

#### Hatua ya 6: Thibitisha Ni Running

Mara baada ya kupelekwa, utaona:

-> ** Huduma ** tab: Inaonyesha huduma yako * zebra * na hali

-> ** Logs ** tab: kuishi chombo kumbukumbu

-> ** Leases ** tab: Maelezo kuhusu kupelekwa yako (DSEQ, mtoa huduma, gharama)


##### Angalia Matangazo

Bonyeza juu ya ** Logs ** na unapaswa kuona Zebra kuanza up:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Sync itachukua ** masaa kwa siku ** kulingana na mtandao. Angalia kwa:

-> Kuongeza block urefu

-> Peer uhusiano (lazima 10-30 wenzao)

-> Hakuna makosa kurudia


#### Hatua ya 7: Kupata anwani yako Node ya

Bonyeza kwenye ** Leases ** tab, kisha ** URI **.

Utaona kitu kama:

```bash
zebra-8233: provider-hostname.com:31234
```

Hii ni node yako ya ** umma P2P mwisho hatua **. nodes nyingine Zcash itakuwa kuungana na wewe katika anwani hii.

**Note the port mapping:** You configured port 8233 in the SDL, but Akash assigned it to a different public port (31234 in this example). This is normal - see the "Port Mapping on Akash" section at the top if this confuses you. Your node is accessible at whatever port Akash shows here, not necessarily 8233.

Kama wewe kuwezeshwa RPC (commented nje default katika SDL), utaona pia RPC mwisho hapa na yake mwenyewe ramani bandari.

### Chaguzi Configuration

#### Kubadilisha kwa Testnet

SDL default kwa Mainnet. kutumia Testnet badala yake:

-> ** maoni nje Mainnet config ** katika * env * sehemu:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> ** Uncomment Testnet config**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> ** Sasisha bandari wazi ** katika sehemu ya * wazi *:

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

-> ** Hiari: Kupunguza rasilimali ** kwa Testnet katika *profiles.compute.zebra.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> ** Hiari: Bei ya chini** katika *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### Kuwezesha RPC Access

RPC ni walemavu kwa default kwa ajili ya usalama. Kuwezesha ni:

** Kwa Mainnet:**

-> Uncomment katika * env * sehemu:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Uncomment Mainnet RPC bandari katika * wazi *:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

** Kwa Testnet:**

-> Uncomment katika * env * sehemu:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Uncomment Testnet RPC bandari katika * wazi *:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

** Onyo **: Kama kuweka * kimataifa: kweli * kwa RPC, wewe ni wazi kwa mtandao. Zebra anatumia kuki uthibitishaji kwa default, lakini bado - si kufanya hili isipokuwa unajua nini unafanya.

** Port ramani kukumbusha **: Hata kama wewe yatangaza RPC kimataifa, Akash itakuwa ramani yake kwa random high bandari (si 8232/18232). Angalia URIs katika kupelekwa yako kuona mwisho halisi ya umma. Kwa * kimataifa: uongo * (ilipendekezwa), mwisho RPC ni tu kupatikana ndani ya mtandao wa kupelekwa Akash, si kutoka mtandao wa umma.

#### Kuwezesha Metrics (Prometheus)

Kwa scrape metrics kwa ufuatiliaji:

-> Uncomment katika *env*:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Uncomment metrics bandari katika * wazi *:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Kurekebisha rasilimali/kuweka bei

Kama wewe si kupata zabuni au unataka kuboresha gharama:

** Kwa watoa huduma ya chini-spec**, kupunguza katika *profiles.compute.zebra.resources* sehemu:

-> CPU: * vitengo: 2 * (kiwango cha chini kwa ajili ya kasi ya usawazishaji busara)

-> Kumbukumbu: * ukubwa: 12Gi * (kiwango cha chini kwa ajili ya utulivu)

-> Hifadhi: * ukubwa: 120Gi * (kiwango cha chini kwa mainnet)

** Ili kuvutia zabuni zaidi **, ongezeko la *profiles.placement.akash.pricing*:

-> Mainnet: Jaribu * kiasi: 1000000* uakt/block

-> Testnet: Jaribu * kiasi: 1000000* uakt/block

### Kusasisha Utoaji Wako

Unahitaji kubadilisha Configuration baada ya kupelekwa?

-> Nenda kwa ** My Deployments ** katika Console

-> Kupata kupelekwa yako Zebra

-> Bonyeza **"Update kupelekwa"**

-> Hariri SDL

-> Click **"Update"** na kupitisha katika Keplr

** Kumbuka **: Upyaji itaanza tena chombo yako. node itaanza kutoka hali yake kuhifadhiwa (kuendelea kuhifadhi), lakini kutarajia 1-2 dakika ya downtime.

### Ufuatiliaji

#### Kupitia Console

-> **Logs tab**: Kuishi chombo kumbukumbu

-> ** Shell tab **: Kupata shell ndani ya chombo (faida kwa ajili ya debugging)

-> ** Matukio tab **: Kubernetes matukio (zaidi ya bure isipokuwa kitu ni kuvunjwa)


#### Kupitia RPC (ikiwa imewezeshwa)

Kama wewe kuwezeshwa RPC, unaweza kuuliza node yako kama kawaida zebrad full node (kwa sababu ni!)

### Kufunga kupelekwa kwako

Unapomaliza au unataka kuacha kulipa:

-> Nenda kwa ** Usanidi Wangu **

-> Kupata kupelekwa yako Zebra

-> Bonyeza **"Funga kupelekwa"**

-> Thibitisha na saini katika Keplr

Amana yako ya 5 AKT itarejeshwa. ** Hifadhi ya kudumu ** inapaswa kuhifadhiwa na mtoa huduma, lakini usitegemee - kutibu kama mtoaji mwingine yeyote wa wingu.

### Kutatua matatizo

#### "Fedha za kutosha" kosa

Unahitaji AKT zaidi. Fedha mkoba wako Keplr.

#### Hakuna zabuni zinazoonekana

Ama:

-> bei yako ni ya chini sana (kuongezeka * kiasi * katika SDL)

-> Mahitaji yako rasilimali ni kubwa mno kwa watoa inapatikana (kupunguza CPU / kumbukumbu / kuhifadhi)

-> Kusubiri muda mrefu (wakati mwingine inachukua 60-90 sekunde kwa ajili ya zabuni kuonekana)


#### Utekelezaji kukwama katika "kusubiri"

Mtoa huduma inaweza kuwa na matatizo. Kufunga kupelekwa na kujaribu mtoa huduma tofauti.

#### Kumbukumbu za Zebra zinaonyesha "Hakuna wenzao waliounganishwa"

Hii ni ya kawaida kwa dakika chache za kwanza. Zebra itakuwa kugundua wenzao moja kwa moja. Kama inaendelea baada ya 10+ dakika, unaweza kuwa na mtandao suala (sio uwezekano juu ya Akash).

#### "Kutoka nje ya kumbukumbu" makosa katika magogo

Wewe cheaped nje juu ya RAM. Kufunga kupelekwa na redeploy na angalau 12Gi kumbukumbu (16Gi ilipendekeza).

#### Sync inachukua milele

Eleza maana ya neno "milele":

-> **Masaa**: Kawaida

-> **Days**: Pia kawaida kwa mainnet kutoka mwanzo

-> ** Wiki **: Kitu ni makosa, kuangalia kumbukumbu kwa makosa


### Usimamizi wa Gharama

Kufuatilia matumizi yako katika Console:

-> ** My Deployments ** -> yako kupelekwa -> Inaonyesha "Gharama kwa mwezi" makadirio

-> yako Keplr mkoba salio itapungua baada ya muda


Wakati usawa wako ni mdogo, Akash itafunga moja kwa moja kupelekwa kwako. ** Ongeza mkoba wako mara kwa mara ** au weka arifu.

#### Kupunguza Gharama

-> ** Matumizi Testnet ** kwa ajili ya upimaji yasiyo ya uzalishaji (50% nafuu)

-> ** Chini CPU / kumbukumbu ** kama huna haja ya haraka sync

-> ** Chagua watoa huduma wa bei nafuu** (sio kila wakati busara - masuala ya uptime)


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

Anza na Testnet kama wewe ni tu kupima mchakato wa kupelekwa. Angalia "Kubadilisha kwa Testnet" sehemu hapo juu kwa ajili ya Configuration.

### Rasilimali za ziada

**Kidhibiti cha Akash**:https://console.akash.network](https://console.akash.network)

** Akash Docs **: [https://akash.network/docs/](https://akash.network/docs/)

** Zebra Docs **: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

** Zcash Explorers **: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Mzozo**: [https://discord.akash.network](https://discord.akash.network) (kwa masuala ya mtoa huduma)

