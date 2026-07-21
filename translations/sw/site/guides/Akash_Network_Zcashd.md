# Kupeleka zcashd kwa Akash kupitia Console

Guide for deploying a zcashd Zcash full node (Electric Coin Co implementation) using [Akash Console](https://console.akash.network)Hapa ni mafunzo ya video chini. mwongozo zaidi ya kina inaweza kupatikana chini.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>


## Unachofanya

full zcashd node ambayo itakuwa:

-> Sync nzima Zcash blockchain (350GB + kwa mainnet, ~ 40GB kwa testnet)

-> Gharama takriban $ 15 / mwezi kulingana na bei AKT ishara

-> Kuchukua masaa kadhaa kwa siku kabisa kulandanisha

-> Matumizi 4 vCPUs, 16GB RAM, 350GB kuhifadhi (mainnet) au 2 vCPU, 8GB RAM , 50GB (testnet)

-> Download cryptographic vigezo juu ya kukimbia kwanza (~ 2GB, mara moja)

** zcashd dhidi ya Zebra:**

-> zcashd ni awali Zcash node utekelezaji na Electric Coin Co

-> Zebra ni utekelezaji mbadala wa Zcash Foundation

-> Wote ni sambamba na mtandao Zcash

-> zcashd ina makala zaidi (mining, mkoba, Insight Explorer API)

-> Tumia zcashd kama unahitaji mfuko wa fedha utendaji au maalum RPC APIs


### ** Muhimu: Port Mapping juu ya Akash **

When you expose a port on Akash (e.g., port 8233 for zcashd P2P), it **does NOT bind to that exact port** on the provider's public IP. Instead, the provider assigns a random high port (like 31234 or 42567) and reverse-proxies it to your container's port 8233.

Hii ni kwa kubuni - watoa kukimbia kupelekwa nyingi, na wao d kuwa na migogoro kama kila mtu alijaribu kutumia bandari 8233 moja kwa moja.

** Hii inamaanisha nini kwako:**

-> Wewe Configure bandari 8233 katika SDL (zcashd ya kiwango P2P bandari)

-> Akash inakupa URI kama * mtoa huduma.com:31234*

-> nodes nyingine Zcash kuungana na wewe katika * mtoa huduma.com:31234*

-> Ndani ya chombo yako, zcashd bado anasikiliza juu ya 8233


Hii ni kushughulikiwa moja kwa moja. Tu kutumia URI kwamba Akash inakupa.

## Mahitaji ya awali

-> ** Keplr Wallet ** browser ugani imewekwa (Chrome/Brave/Firefox)

-> ** AKT ishara ** - Kupata 50-100 AKT kutoka kubadilishana (Coinbase, Kraken, Osmosis)

-> ** Dakika 5 ** bonyeza kupitia UI Console


## Hatua ya 1: Kuunganisha mkoba wako

-> Go to [https://console.akash.network](https://console.akash.network)

-> Bonyeza **"Kuunganisha Wallet"** juu kulia

-> Chagua ** Keplr ** (au Cosmos yako favorite mkoba)

-> Kuidhinisha uhusiano wakati Keplr pops up


Akiba yako ya AKT inapaswa kuonekana juu kulia. Kama ni sifuri, kwenda fedha mkoba wako kwanza.

## Hatua ya 2: Kujenga kupelekwa

-> Bonyeza **"Kupeleka"** kifungo (kubwa bluu kifungo, katikati ya ukurasa)

-> Chagua **"Kujenga template yako"** (au kuruka moja kwa moja kwa uploading SDL)

### Chaguo A: Upload SDL File (Ilipendekeza)

[!] Kuweka juu ya Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Chaguo B: Tumia SDL Mhariri

Kama unataka kuweka SDL manually:

-> Nakili yaliyomo ya * zcashd-akash.yml *

-> Weka katika mhariri SDL

-> Kurekebisha kama inahitajika (tazama sehemu Configuration chini)

-> Bonyeza **"Kuunda kupelekwa"**


## Hatua ya 3: Tathmini na Kuidhinisha Amana

Console atakuonyesha:

-> ** Deposit kupelekwa **: ~ 5 AKT (kupata hii nyuma wakati wewe kufunga kupelekwa)

-> **Makadirio ya gharama**: Kulingana na SDL yako bei


Bonyeza ** "Kukubali"** na saini shughuli katika Keplr.

## Hatua ya 4: Chagua Mtunzaji

Baada ya ~ sekunde 30, utaona zabuni kutoka kwa watoa. Kila zabuni inaonyesha:

-> ** Bei kwa kila block** (katika AKT au USDC)

-> **Makadirio ya gharama ya kila mwezi**

-> **Utoaji maelezo** (uptime, mkoa, nk)


**Usichague tu ya bei rahisi.** Angalia:

-> Uptime % (njia kwa ajili ya > 95%)

-> Mkoa (karibu na wewe = latency bora, lakini haijalishi sana kwa nodes blockchain)

-> Hali ya ukaguzi (kijani checkmark = zaidi ya kuaminika)


Bonyeza **"Kubali Bid"** juu ya mtoa huduma yako kuchaguliwa na ishara katika Keplr.

## Hatua 5: Kusubiri kwa ajili ya kupelekwa

Console itakuwa:

-> Kujenga kukodisha na mtoa huduma yako mteule

-> Tuma orodha (huambia mtoa nini kukimbia)

-> Kuanza chombo yako


Hii inachukua dakika 1-2. Utaona updates hali katika UI.

## Hatua ya 6: Thibitisha Ni Running

Mara baada ya kupelekwa, utaona:

-> ** Huduma ** tab: Inaonyesha huduma yako * zcashd * na hali

-> ** Logs ** tab: Live kumbukumbu kutoka node yako zcashd

-> ** Leases ** tab: Maelezo kuhusu kupelekwa yako (DSEQ, mtoa huduma, gharama)


### Angalia Matangazo

Bonyeza juu ya ** Logs ** na unapaswa kuona zcashd kuanza up:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

** Kwanza kukimbia itakuwa download zcash-params (~ 2GB).** Hii ni mara moja operesheni na inachukua 5-10 dakika kutegemea mtoa bandwidth. baadae restarts itakuwa ruka hii.

Sync itachukua ** masaa kwa siku ** kulingana na mtandao. Angalia kwa:

-> Kuongeza block urefu

-> Peer uhusiano (lazima 10-30 wenzao)

-> Hakuna makosa kurudia


## Hatua ya 7: Kupata anwani yako Node ya

Bonyeza kwenye ** Leases ** tab, kisha ** URI **.

Utaona kitu kama:

```
zcashd-8233: provider-hostname.com:31234
```

Hii ni node yako ya ** umma P2P mwisho hatua **. nodes nyingine Zcash itakuwa kuungana na wewe katika anwani hii.

**Note the port mapping:** You configured port 8233 in the SDL, but Akash assigned it to a different public port (31234 in this example). This is normal - see the "Port Mapping on Akash" section at the top if this confuses you. Your node is accessible at whatever port Akash shows here, not necessarily 8233.

Kama wewe kuwezeshwa RPC (commented nje default katika SDL), utaona pia RPC mwisho hapa na yake mwenyewe ramani bandari.

## Chaguzi Configuration

### Kubadilisha kwa Testnet

SDL default kwa Mainnet. kutumia Testnet badala yake:

-> ** Kubadilisha mtandao katika * env * sehemu: **

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
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

-> ** Hiari: Kupunguza rasilimali ** kwa Testnet katika *profiles.compute.zcashd.resources*:

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

> kumbuka kupunguza bei inaweza kuchuja watoa wetu fomu ya zabuni. uzoefu na thamani hii, au kutumia mtoa mwisho kwa kuangalia kama wangeweza zabuni (ukaguzi mtoa API nyaraka)

### Kuwezesha RPC Access

RPC ni walemavu kwa default kwa ajili ya usalama. Kuwezesha ni:

** CRITICAL: Kuweka nguvu sifa.** zcashd RPC transmits jina la mtumiaji / password juu ya HTTP (si HTTPS). Tu wazi RPC kama wewe kuelewa usalama athari.

-> Uncomment katika * env * sehemu:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Uncomment bandari RPC katika * wazi *:

   ** Kwa Mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   ** Kwa Testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

** Tahadhari **: Kama kuweka * kimataifa: kweli * kwa RPC, wewe ni wazi kwa mtandao na auth msingi. Hii ni wazo mbaya. Matumizi ya * global: uongo * na kupata RPC kupitia mtandao wa ndani Akash ya au kuanzisha handaki salama.

** Port ramani kukumbusha **: Hata kama wewe yatangaza RPC kimataifa, Akash itakuwa ramani yake kwa random high bandari (si 8232/18232). Angalia URIs katika kupelekwa yako kuona mwisho halisi ya umma. Kwa * kimataifa: uongo * (ilipendekezwa), mwisho RPC ni tu kupatikana ndani ya mtandao wa kupelekwa Akash, si kutoka mtandao wa umma.

### Kuwezesha Transaction Index

Mkataba index utapata kuuliza shughuli yoyote kwa ID yake kupitia RPC.

Uncomment katika *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

** Onyo **: kuwezesha txindex kwenye node iliyopo ya usawazishaji inahitaji re-indexing blockchain nzima, ambayo inachukua masaa.

### Kuwezesha Insight Explorer

Insight Explorer hutoa ziada REST API mwisho kwa data blockchain (faida kwa ajili ya block explorers).

Uncomment katika *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Hii moja kwa moja inawezesha txindex na anaongeza mbinu za ziada RPC.

### Kuwezesha Prometheus Metrics

Kwa scrape metrics kwa ufuatiliaji:

-> Uncomment katika *env*:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Uncomment metrics bandari katika * wazi *:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Metrics itakuwa inapatikana katika http://yourendpoint:9969/metrics katika muundo wa Prometheus.

### Kurekebisha rasilimali/kuweka bei

Kama wewe si kupata zabuni au unataka kuboresha gharama:

** Kwa watoa huduma chini-spec**, kupunguza katika *profiles.compute.zcashd.resources* sehemu:

-> CPU: * vitengo: 2 * (kiwango cha chini kwa ajili ya kasi ya usawazishaji busara)

-> Kumbukumbu: * ukubwa: 12Gi * (kiwango cha chini kwa ajili ya utulivu)

-> Hifadhi: * ukubwa: 120Gi * (kiwango cha chini kwa mainnet)


** Ili kuvutia zabuni zaidi **, ongezeko la *profiles.placement.akash.pricing*:

-> Mainnet: Jaribu * kiasi: 15000* uakt/block

-> Testnet: Jaribu * kiasi: 7500 * uakt / block


SDL maadili ni kuweka kihafidhina juu. watoa wengi bid chini.

## Kusasisha Utoaji Wako

Unahitaji kubadilisha Configuration baada ya kupelekwa?

-> Nenda kwa ** My Deployments ** katika Console

-> Kupata utekelezaji wako zcashd

-> Bonyeza **"Update kupelekwa"**

-> Hariri SDL

-> Click **"Update"** na kupitisha katika Keplr


** Kumbuka **: Upyaji itaanza tena chombo yako. node itaanza kutoka hali yake kuhifadhiwa (kuendelea kuhifadhi), lakini kutarajia 1-2 dakika ya downtime.

## Ufuatiliaji

### Kupitia Console

-> **Logs tab**: Kuishi chombo kumbukumbu

-> ** Shell tab **: Kupata shell ndani ya chombo (faida kwa ajili ya debugging)

-> ** Matukio tab **: Kubernetes matukio (zaidi ya bure isipokuwa kitu ni kuvunjwa)


### Kupitia RPC (ikiwa imewezeshwa)

Kama wewe kuwezeshwa RPC, unaweza kuuliza node yako kama kawaida zcashd full node (kwa sababu ni!)

### zcash-cli mbadala

Kama una shell upatikanaji kupitia Console, unaweza kutumia * zcash-cli * moja kwa moja:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Kufunga kupelekwa kwako

Unapomaliza au unataka kuacha kulipa:

-> Nenda kwa ** Usanidi Wangu **

-> Kupata utekelezaji wako zcashd

-> Bonyeza **"Funga kupelekwa"**

-> Thibitisha na saini katika Keplr


Amana yako ya 5 AKT itarejeshwa. ** Hifadhi ya kudumu ** inapaswa kuhifadhiwa na mtoa huduma, lakini usitegemee - kutibu kama mtoaji mwingine yeyote wa wingu.

## Kutatua matatizo

### "Fedha za kutosha" kosa

Unahitaji AKT zaidi. Fedha mkoba wako Keplr.

### Hakuna zabuni zinazoonekana

Ama:

-> bei yako ni ya chini sana (kuongezeka * kiasi * katika SDL)

-> Mahitaji yako rasilimali ni kubwa mno kwa watoa inapatikana (kupunguza CPU / kumbukumbu / kuhifadhi)

-> Kusubiri muda mrefu (wakati mwingine inachukua 60-90 sekunde kwa ajili ya zabuni kuonekana)


### Utekelezaji kukwama katika "kusubiri"

Mtoa huduma inaweza kuwa na matatizo. Kufunga kupelekwa na kujaribu mtoa huduma tofauti.

### zcashd kumbukumbu kuonyesha "Hakuna wenzao kushikamana"

Hii ni ya kawaida kwa dakika chache za kwanza. zcashd itakuwa kugundua wenzao moja kwa moja. Kama inaendelea baada ya 10+ dakika, unaweza kuwa na mtandao suala (sio uwezekano juu ya Akash).

### "Kutoka nje ya kumbukumbu" makosa katika magogo

Wewe cheaped nje juu ya RAM. Kufunga kupelekwa na redeploy na angalau 12Gi kumbukumbu (16Gi ilipendekeza).

### Sync inachukua milele

Eleza maana ya neno "milele":

-> **Masaa**: Kawaida

-> **Days**: Pia kawaida kwa mainnet kutoka mwanzo

-> ** Wiki **: Kitu ni makosa, kuangalia kumbukumbu kwa makosa


### "Kosa kupata zcash-params"

Mtoa huduma anaweza kuwa na masuala ya mtandao au bandwidth polepole. Hii kawaida hutatua yenyewe. Kama inaendelea kwa zaidi ya 30 dakika, jaribu redeploying kwa mtoa huduma tofauti.

### Kushindwa kwa uthibitishaji wa RPC

-> Angalia kwamba * ZCASHD_RPCUSER * na * Z CASHD_ RPCPASSWORD * ni kuweka kwa usahihi

-> Kuhakikisha unatumia bandari sahihi (8232 kwa mainnet, 18232 testnet)

-> Kumbuka bandari ni ramani na Akash - kutumia URI kutoka kupelekwa yako, si 8232 moja kwa moja


## Usimamizi wa Gharama

Kufuatilia matumizi yako katika Console:

-> ** My Deployments ** -> yako kupelekwa -> Inaonyesha "Gharama kwa mwezi" makadirio

-> yako Keplr mkoba salio itapungua baada ya muda


Wakati usawa wako ni mdogo, Akash itafunga moja kwa moja kupelekwa kwako. ** Ongeza mkoba wako mara kwa mara ** au weka arifu.

### Kupunguza Gharama

-> ** Matumizi Testnet ** kwa ajili ya upimaji yasiyo ya uzalishaji (50% nafuu)

-> ** Chini CPU / kumbukumbu ** kama huna haja ya haraka sync

-> ** Chagua watoa huduma wa bei nafuu** (sio kila wakati busara - masuala ya uptime)

-> **Tumia USDC badala ya AKT** kama AKT bei ni tete (inahitaji SDL mabadiliko ya bei)

-> ** Disable txindex ** kama huna haja yake (Anaokoa ~ 20% ya kuhifadhi)


### Rasilimali za ziada

**Kidhibiti cha Akash**:https://console.akash.network](https://console.akash.network)

** Akash Docs **: [https://akash.network/docs/](https://akash.network/docs/)

** Zcash Explorers **: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Mzozo**: [https://discord.akash.network](https://discord.akash.network) (kwa masuala ya mtoa huduma)

## Maelezo ya Mwisho

- ** Matatizo ya kuhifadhi ya kudumu.** Usikose * kudumu: kweli * au kutumia * darasa la beta2 *. Tumia * beta3 *.
- **Usawazishaji wa awali ni polepole.** Kuwa na subira. Hii ni ya kawaida kwa nodes blockchain.
- ** Weka mkoba wako unafadhiliwa.** Utoaji hufungwa kiotomatiki wakati unatumia AKT.
- **Backups si moja kwa moja.** Kama wewe huduma kuhusu data, kudhani inaweza kutoweka na mpango ipasavyo.
- **Usalama wa RPC ni muhimu.** Usifunue RPC kwenye mtandao bila hatua sahihi za usalama.
- ** zcash-params ni cached.** Kwanza kukimbia downloads ~ 2GB ya cryptographic vigezo. Hii ni ya kawaida na tu hutokea mara moja.
