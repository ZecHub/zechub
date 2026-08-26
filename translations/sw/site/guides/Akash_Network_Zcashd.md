# Kupeleka zcashd kwa Akash kupitia Console

> ** Deprecated. Je, si kufuata mwongozo huu kupeleka node wewe ni nia ya kutumia.**
>
> zcashd alifikia moja kwa moja Mwisho wa Support kusimamishwa Julai 18, 2026. node zcashD kupelekwa leo si kulandanisha na ncha ya mnyororo, hivyo utoaji gharama fedha kila mwezi na inazalisha chochote.
>
> Kupeleka ** Zebra** badala yake: [Jinsi ya kuendesha Zebra kwenye Mtandao Akash](/guides/akash-network-zebra), ambayo inashughulikia huo Akash Console kazi mtiririko na mahitaji takriban theluthi moja ya disk. Kama wewe ni kusonga kuanzisha zilizopo, angalia [zcashd kwa Zebra na Zallet uhamiaji mwongozo](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Ukurasa huu ni uliofanyika kama rekodi ya kihistoria wa kupelekwa zcashd.

Guide for deploying a zcashd Zcash full node (Electric Coin Co implementation) using [Kifaa cha Akash Console](https://console.akash.network)Hapa ni mafunzo ya video chini. mwongozo zaidi katika kina inaweza kupatikana hapa chini.

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


## Unachoweka Mahali pa Kazi

full zcashd node ambayo itakuwa:

-> Sync nzima Zcash blockchain (350GB + kwa mainnet, ~ 40GB kwa testnet)

-> Gharama takriban $ 15 / mwezi kulingana na bei AKT ishara

-> Kuchukua masaa kadhaa kwa siku ili usawazishe kikamilifu

-> Matumizi 4 vCPUs, 16GB RAM, 350GB kuhifadhi (mainnet) au 2 vCPU, 8GB RAM , 50GB (testnet)

-> Download cryptographic vigezo juu ya kukimbia kwanza (~ 2GB, moja wakati)

** zcashd dhidi ya Zebra:**

-> zcashd ilikuwa uanzishaji wa node ya Zcash asili na Electric Coin Co, iliyosimamishwa tangu Julai 18, 2026

-> Zebra, kutoka Zcash Foundation, ni node kamili katika matumizi ya leo

-> Zebra tu ifuatavyo mlolongo wa sasa; node zcashd hawezi kufikia ncha

-> mkoba zcashd ya imekuwa kubadilishwa na [Zallet (Kifungu cha kulia)](/using-zcash/zallet-quick-reference-guide)

-> Tumia zcashd kama unahitaji mfuko wa fedha utendaji au maalum RPC APIs


### ** Muhimu: Port Mapping juu ya Akash**

When you expose a port on Akash (e.g., port 8233 for zcashd P2P), it **does NOT bind to that exact port** on the provider's public IP. Instead, the provider assigns a random high port (like 31234 or 42567) and reverse-proxies it to your container's port 8233.

Hii ni kwa kubuni - watoa kukimbia kupelekwa nyingi, na wao d kuwa migogoro kama kila mtu alijaribu kutumia bandari 8233 moja kwa moja.

** Hii inamaanisha nini kwako:**

-> Wewe Configure bandari 8233 katika SDL (zcashd ya kiwango P2P bandari)

-> Akash inakupa URI kama * mtoa huduma.com:31234*

-> nodes nyingine Zcash kuungana na wewe katika * mtoa huduma.com:31234*

-> Ndani ya chombo yako, zcashd bado anasikiliza juu 8233


Hii ni kushughulikiwa moja kwa moja. Tu kutumia URI kwamba Akash inakupa.

## Mahitaji ya awali

-> ** Keplr Wallet** kivinjari kupanua imewekwa (Chrome/Brave/Firefox)

-> ** AKT ishara** - Kupata 50-100 AKT kutoka kubadilishana (Coinbase, Kraken, Osmosis)

-> ** Dakika 5** kubonyeza kupitia UI Console


## Hatua ya 1: Kuunganisha mkoba wako

-> Go to [https://console.akash.network](https://console.akash.network)

-> Bonyeza **"Kuunganisha Wallet"** katika haki ya juu

-> Chagua ** Keplr** (au Cosmos yako favorite mkoba)

-> Kubali uhusiano wakati Keplr pops up


Akiba yako ya AKT inapaswa kuonekana juu kulia. Kama ni sifuri, kwenda fedha mkoba wako kwanza.

## Hatua ya 2: Kujenga kupelekwa

-> Click **"Kupanga"** kifungo (kubwa bluu button, katikati ya ukurasa)

-> Chagua **"Kujenga template yako"** (au kuruka moja kwa moja uploading SDL)

### Chaguo A: Upload SDL File (Ilipendekeza)

> ** Kitufe hiki deploys node kusimamishwa.** Ni bili dhidi ya AKT yako usawa kwa ajili ya Node kwamba hawezi kulandanisha. Matumizi ya [Mwongozo wa Zebra](/guides/akash-network-zebra) badala yake.

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Chaguo B: Tumia SDL Mhariri

Kama unataka kushikamana SDL manually:

-> Nakili yaliyomo ya * zcashd-akash.yml*

-> Weka katika mhariri SDL

-> Kurekebisha kama inahitajika (tazama sehemu ya Configuration chini)

-> Click **"Kujenga kupelekwa"**


## Hatua ya 3: Kuchunguza na Kuidhinisha Amana

Console atakuonyesha:

-> ** Deposit kupelekwa**: ~ 5 AKT (unaweza kupata hii nyuma wakati wewe kufunga utoaji)

-> **Makadirio ya gharama**: Kulingana na SDL yako bei.


Bonyeza ** "Kubali"** na saini shughuli katika Keplr.

## Hatua ya 4: Chagua Mtunzaji wa Afya Yako

Baada ya ~ sekunde 30, utaona zabuni kutoka kwa watoa. Kila zabuni inaonyesha:

-> ** Bei kwa kila block** (katika AKT au USDC)

-> **Kikadirio cha gharama ya kila mwezi**

-> **Mtoa maelezo** (uptime, mkoa, nk)


**Usichague tu ya bei rahisi.** Angalia:

-> Uptime % (njia ya kwa > 95%)

-> Mkoa (karibu na wewe = bora latency, lakini haina jambo kubwa kwa blockchain nodes)

-> hali ya ukaguzi (kijani checkmark = zaidi kuaminika)


Bonyeza **"Kubali Bid"** juu ya mtoa huduma yako kuchaguliwa na ishara katika Keplr.

## Hatua 5: Kusubiri kwa ajili ya kupelekwa

Kiweko itakuwa:

-> Kujenga kukodisha na mtoa huduma yako kuchaguliwa

-> Tuma orodha (huambia mtoa nini kukimbia)

-> Kuanza chombo yako


Hii inachukua dakika 1-2. Utaona updates hali katika UI.

## Hatua ya 6: Thibitisha Ni Running

Mara baada ya kupelekwa, utaona:

-> ** Huduma** tab: Inaonyesha huduma yako * zcashd* na hali ya

-> ** Logs** tab: Live kumbukumbu kutoka node yako zcashd

-> ** Leases** tab: Maelezo kuhusu kupelekwa yako (DSEQ, mtoa huduma, gharama)


### Angalia Matangazo ya Mkutano wa Mawasiliano

Bonyeza juu ya ** Logs** na unapaswa kuona zcashd kuanza up:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Kuanza kwanza itakuwa download zcash-params (~ 2GB).** Hii ni mara moja ya operesheni na inachukua 5-10 dakika kutegemea mtoa bandwidth. baadae restarts skip hii.

Sync itachukua ** masaa kwa siku** kulingana na mtandao. Angalia:

-> Kuongeza block urefu

-> Peer uhusiano (lazima 10-30 wenzao)

-> Hakuna makosa ya kurudia-rudia


## Hatua ya 7: Kupata anwani yako Node ya

Bonyeza kwenye ** Leases** tab, kisha ** URI's.

Utaona kitu kama:

```
zcashd-8233: provider-hostname.com:31234
```

Hii ni node yako ya ** umma P2P mwisho hatua. nodes nyingine Zcash itakuwa kuungana na wewe katika anwani hii.

** Angalia ramani bandari:** Umeweka bandari 8233 katika SDL, lakini Akash aliiweka kwa tofauti ya umma port (31234 katika mfano huu). Hii ni kawaida - angalia "Port Mapping juu ya Akash" sehemu hapo juu kama hii confuses wewe. node yako inapatikana kwenye yoyote bandari Akash inaonyesha hapa, si lazima 8233.

Kama umewezesha RPC (commented nje default katika SDL), utaona pia mwisho wa RPC hapa na bandari yake mwenyewe mapped.

## Chaguzi Configuration

### Kubadili kwa Testnet

SDL default kwa Mainnet. kutumia Testnet badala yake:

-> ** Kubadilisha mtandao katika * env* sehemu:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> ** Sasisha bandari wazi** katika * expose* sehemu:

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

-> ** Hiari: Kupunguza rasilimali** kwa Testnet katika *profiles.compute.zcashd.resources*:

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

> kumbuka kupunguza bei inaweza kuchuja watoa wetu fomu ya zabuni. uzoefu na thamani hii, au kutumia mtoa mwisho kwa kuangalia kama wangeweza kutoa (mapitio ya wasambazaji API nyaraka)

### Kuwezesha RPC Access

RPC ni walemavu kwa default kwa ajili ya usalama. Ili kuwezesha:

** CRITICAL: Kuweka nguvu sifa.** zcashd RPC transmits jina la mtumiaji / password juu ya HTTP (si HTTPS). Tu wazi RPC kama wewe kuelewa usalama athari.

-> Uncomment katika * env* sehemu:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Uncomment bandari RPC katika * wazi*:

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

**Warning**: If you set *global: true* for RPC, you're exposing it to the internet with basic auth. This is a bad idea. Use *global: false* and access RPC through Akash's internal network or set up a secure tunnel.

** Port ramani kukumbusha**: Hata kama wewe yatangaza RPC kimataifa, Akash itakuwa ramani yake kwa random juu bandari (si 8232/18232). Angalia URIs katika kupelekwa yako kuona mwisho halisi ya umma. Kwa * global: uongo* (ilipendekezwa), mwisho wa RPC ni kupatikana tu ndani ya mtandao wa utoaji akashi, si kutoka internet za umma.

### Kuwezesha Index Transaction

Utaftaji wa shughuli inaruhusu wewe kuuliza yoyote ya manunuzi kwa ID yake kupitia RPC. Hutumia kuhifadhi zaidi (~ 20% ongezeko).

Uncomment katika *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

** Onyo**: kuwezesha txindex kwenye node iliyopo ya usawazishaji inahitaji re-kuorodhesha blockchain nzima, ambayo inachukua masaa.

### Kuwezesha Insight Explorer

Insight Explorer hutoa ziada REST API mwisho kwa data blockchain (faida ya block explorers).

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

-> Uncomment metrics bandari katika * wazi*:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Metrics itakuwa inapatikana katika: http://yourendpoint:9969/metrics katika muundo wa Prometheus.

### Kurekebisha rasilimali/kuweka bei

Kama wewe si kupata zabuni au unataka kuboresha gharama:

** Kwa watoa huduma chini ya vipimo**, kupunguza katika *profiles.compute.zcashd.resources* sehemu:

-> CPU: * vitengo: 2* (kiwango cha chini kwa ajili ya kasi ya usawazishaji wa busara)

-> Kumbukumbu: * ukubwa: 12Gi* (kiwango cha chini kwa ajili ya utulivu)

-> Hifadhi: * ukubwa: 120Gi* (kiwango cha chini kwa mainnet)


**Kuvuna bei zaidi**, ongezeko la *profiles.placement.akash.pricing*:

-> Mainnet: Jaribu * kiasi: 15000* uakt/block

-> Testnet: Jaribu * kiasi: 7500* uakt/block


SDL maadili ni kuweka juu conservatively. watoa wengi bid chini.

## Kuboresha Utoaji Wako wa Kazi ya Kujitolea

Unahitaji kubadilisha Configuration baada ya kupelekwa?

-> Nenda kwa ** My Deployments** katika Console

-> Kupata kupelekwa yako zcashd

-> Click **"Update kupelekwa"**

-> Hariri SDL

-> Click **"Update"** na kupitisha katika Keplr


** Kumbuka**: Upyaji itaanza tena chombo yako. node itakuwa kuendelea kutoka hali yake kuhifadhiwa (kuendelea uhifadhi), lakini kutarajia 1-2 dakika ya downtime.

## Ufuatiliaji

### Kupitia Console

-> ** Tab Logs**: kuishi vyombo vya kumbukumbu

-> ** Tab Shell**: Kupata shell ndani ya chombo (faida kwa ajili ya debugging)

-> ** Matukio tab**: Kubernetes matukio (zaidi ya bure isipokuwa kitu ni kuvunjwa)


### Kupitia RPC (ikiwa imewezeshwa)

Kama wewe kuwezeshwa RPC, unaweza kuuliza node yako kama kawaida zcashd full Node (kwa sababu ni!)

### zcash-cli mbadala

Kama una access ya shell kupitia Console, unaweza kutumia *zcash-cli* moja kwa moja:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Kufunga kupelekwa kwako

Wakati wewe ni kufanyika au unataka kuacha kulipa:

-> Nenda kwa ** Usanidi Wangu**

-> Kupata kupelekwa yako zcashd

-> Click **"Funga kupelekwa"**

-> Thibitisha na saini katika Keplr


Akaunti yako ya 5 AKT itarejeshwa. ** Hifadhi endelevu** inapaswa kuhifadhiwa na mtoa huduma, lakini usitegemee - kutibu kama mtoaji mwingine wowote wa wingu.

## Kutatua matatizo

### "Fedha za kutosha" kosa

Unahitaji AKT zaidi. Fedha mkoba wako Keplr.

### Hakuna zabuni zinazoonekana juu ya

Ama:

-> Bei yako ni ya chini sana (ongezea * kiasi cha* katika SDL)

-> Mahitaji yako rasilimali ni kubwa mno kwa watoa inapatikana (kupunguza CPU / kumbukumbu / kuhifadhi)

-> Kusubiri muda mrefu (wakati mwingine inachukua 60-90 sekunde kwa ajili ya zabuni kuonekana)


### Utekelezaji kukwama katika "kusubiri"

Mtoa huduma inaweza kuwa na matatizo. Kufunga kupelekwa na kujaribu mtoa mwingine.

### zcashd kumbukumbu kuonyesha "Hakuna wenzao kushikamana"

Tangu mwisho wa msaada kusimamishwa Julai 18, 2026, hii ni hali ya kudumu inayotarajiwa badala ya kuchelewesha kuanza, na hakuna kiasi cha kusubiri au kupelekwa tena kitakosa. Kupeleka [Zebra](/guides/akash-network-zebra) badala yake.

### "Kutoka nje ya kumbukumbu" makosa katika magogo

Wewe cheaped nje juu ya RAM. Kufunga kupelekwa na redeploy kwa angalau 12Gi kumbukumbu (16Gi ilipendekeza).

### Sync ni kuchukua milele

Eleza maana ya "kwa milele":

-> **Masaa**: Kawaida

-> ** Siku**: Pia kawaida kwa mainnet kutoka mwanzo

-> ** Wiki**: Kitu ni makosa, kuangalia kumbukumbu kwa ajili ya makosa


### "Kosa kupata zcash-params"

Mtoa huduma anaweza kuwa na matatizo ya mtandao au bandwidth polepole. Hii kawaida hutatua yenyewe. Kama inaendelea kwa zaidi ya dakika 30, jaribu redploying mtoa tofauti.

### Kushindwa kwa uthibitishaji wa RPC

-> Angalia kwamba * ZCASHD_RPCUSER* na * Z CASHD_ RPCPASSWORD * ni kuweka kwa usahihi

-> Angalia wewe ni kutumia bandari sahihi (8232 kwa mainnet, 18232 testnet)

-> Kumbuka bandari ni ramani na Akash - kutumia URI kutoka kupelekwa yako, si 8232 moja kwa moja


## Usimamizi wa Gharama

Kufuatilia matumizi yako katika Console:

-> ** My Deployments** -> yako kupelekwa -> Inaonyesha "Gharama kwa mwezi" makadirio ya

-> yako Keplr mkoba salio itapungua baada ya muda


Wakati usawa wako ni mdogo, Akash itafunga moja kwa moja kupelekwa kwako. ** Ongeza mkoba wako mara kwa mara** au weka arifu.

### Kupunguza Gharama

-> ** Matumizi Testnet** kwa ajili ya upimaji yasiyo ya uzalishaji (50% nafuu)

-> ** Chini CPU / kumbukumbu** kama huna haja ya haraka sync

-> ** Chagua watoa huduma wa bei rahisi** (sio kila wakati busara - masuala ya uptime)

-> **Tumia USDC badala ya AKT** kama bei AKT ni tete (inahitaji SDL mabadiliko ya bei)

-> ** Disable txindex** kama huna haja yake (Anaokoa ~ 20% ya kuhifadhi)


### Rasilimali za ziada

**Kidhibiti cha Akash**: [https://console.akash.network](https://console.akash.network)

** Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

** Zcash Explorers**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Mzozo**: [https://discord.akash.network](https://discord.akash.network) (kwa masuala ya mtoa huduma)

## Maelezo ya Mwisho

- ** Matatizo ya kuhifadhi kudumu.** Usikose * persistent: true* au kutumia darasa la beta2. Tumia *beta3*.
- ** awali usawazishaji ni polepole.** Kuwa na subira. Hii ni ya kawaida kwa nodes blockchain.
- ** Weka mkoba wako fedha.** Utekelezaji auto-kufunga wakati wewe kukimbia nje ya AKT.
- ** Backup si moja kwa moja.** Kama wewe huduma kuhusu data, kudhani inaweza kutoweka na mpango ipasavyo.
- ** Usalama wa RPC ni muhimu.** Usitumie mtandao bila hatua za usalama zinazofaa.
- ** zcash-params ni cached.** Run ya kwanza downloads ~ 2GB wa cryptographic vigezo. Hii ni kawaida na hutokea mara moja tu.
