# Akpa zcashd ɖe Akash to Console dzi

> **Woɖe eƒe dzi. Mègatsɔ mɔfia sia azɔ akpa ɣaɣla dzesi ŋɔŋlɔ si nèdi be yeazã o.**
>
> zcashd va ɖo eƒe End-of-Support ƒe tɔtrɔ le July 18, 2026. zcashd ɣaɣla dzesi ŋɔŋlɔ si woakpa egbea la masync kple ɖoɖonu ƒe nuwuwu o, eyata akpaɖeɖe la axɔ ga wò le ƒe sia ƒe ƒe dzi eye masɔ nu aɖeke o.
>
> Kpɔ **Zebra** ɖe ete: [Aleke nàwɔ Zebra le Akash Network dzi](/guides/akash-network-zebra), si ƒe Akash Console ƒe dɔwɔmɔe nye ma ke eye wòhia disk ƒe akpa etɔ̃lia ko. Ne èle akpaɖeɖe si li xoxo dometɔ miaɖe teƒe, kpɔ [zcashd ɖo Zebra kple Zallet ƒe miaɖe teƒe mɔfia](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Woɖe axa sia ɖe anyi abe zcashd akpaɖeɖe ƒe blema ƒe ŋkɔdzi ene.

Mɔfia na zcashd Zcash ɣaɣla dzesi ŋɔŋlɔ blibo (Electric Coin Co ƒe dɔwɔwɔ) ƒe akpaɖeɖe kple [Akash Console](https://console.akash.network). Video ƒe mɔfia aɖe le ete. Mɔfia si kpɔ nu me tsɔ wu le ete.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Nu Si Nèle Akpa Dom

zcashd ɣaɣla dzesi ŋɔŋlɔ blibo si ana:

-> Wòasync Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu katã (350GB+ na mainnet, ~ 40GB na testnet)

-> Wòaxɔ ga abe $15/leɣi ene, le AKT token ƒe asiwo ŋu

-> Wòaxɔ gaƒoƒo geɖe va se ɖe ŋkeke geɖe ŋu hafi wòasync blibo

-> Wòazã 4 vCPUs, 16GB RAM, 350GB nuɖoƒe (mainnet) alo 2 vCPUs, 8GB RAM, 50GB (testnet)

-> Wòatsɔ cryptographic parameters aɖo le zi gbãtɔ si wòawɔ dɔ la (~ 2GB, zi ɖeka ko)

**zcashd kple Zebra:**

-> zcashd nye Zcash ɣaɣla dzesi ŋɔŋlɔ ƒe dɔwɔwɔ gbãtɔ si Electric Coin Co wɔ, si tɔ le July 18, 2026 me

-> Zebra, tso Zcash Foundation gbɔ, nye ɣaɣla dzesi ŋɔŋlɔ blibo si woɖe le dɔ me egbea

-> Zebra ko yɔna ɖoɖonu si li fifia; zcashd ɣaɣla dzesi ŋɔŋlɔ mate ŋu aɖo nuwuwu o

-> Woɖe zcashd ƒe gakotoku teƒe kple [Zallet](/using-zcash/zallet-quick-reference-guide)

-> Zã zcashd ne gakotoku ƒe dɔwɔwɔ alo RPC APIs aɖe le wò hia


### **Nuxɔxlɔ̃ ƒe nu: Port ƒe Map wɔwɔ le Akash**

Ne nèɖe port aɖe fia le Akash (kpɔɖeŋu, port 8233 na zcashd P2P), e**meblɔ be wòawɔ bind ɖe port ma tututɛ le provider ƒe public IP dzi o**. Le teƒe ma, provider la atsɔ port kɔkɔe aɖe si le dziƒe (abe 31234 alo 42567 ene) ana eye wòawɔ reverse-proxy na wò container ƒe port 8233.

Wole esia wɔm kple ta - providers wɔna akpaɖeɖe geɖe, eye ƒomevi akanɔ wo dome ne ame katã di be yeazã port 8233 tẽ.

**Nu si esia gblɔ na wò:**

-> Nàɖo port 8233 le SDL me (zcashd ƒe P2P port si woɖo ɖe eŋu)

-> Akash ana URI si abe *provider.com:31234* ene na wò

-> Zcash ɣaɣla dzesi ŋɔŋlɔ bubuwo atsɔ wɔnɔ ɖe wò ŋu le *provider.com:31234*

-> Le wò container me, zcashd gale 8233 ƒoƒo


Woɖo esia ɖe eme le eɖokui si. Zã URI si Akash na wò ko.

## Nu Si Woahiã Hafi

-> **Keplr Wallet** browser ƒe extension si wòɖo (Chrome/Brave/Firefox)

-> **AKT tokens** - Xɔ AKT 50-100 tso gatrɔƒe aɖe gbɔ (Coinbase, Kraken, Osmosis)

-> **Minuti 5** be nàtsɔ atsi le Console UI me


## Afɔ 1: Ɖo Wò Gakotoku Ƒo

-> Yi ɖe [https://console.akash.network](https://console.akash.network)

-> Zi **"Ɖo Gakotoku Ƒo"** le dzesiƒe si le gome ɖe mia ƒe dzi

-> Tia **Keplr** (alo Cosmos gakotoku si nèlɔ̃ wu)

-> Ɖe mɔ na connection la ne Keplr do goe


Wò AKT ƒe balance ana eɖe fia le gome ɖe mia ƒe dzi. Ne e nye zero la, yi nàtsɔ ga ade wò gakotoku me gbã.

## Afɔ 2: Wɔ Akpaɖeɖe

-> Zi **"Akpa"** button (button blue gã si le axa la ƒe titina)

-> Tia **"Wɔ wò template"** (alo dzo tẽ ɖe SDL ƒe upload me)

### Mɔ A: Ɖo SDL Fael Ɖe Eme (Si Woɖo Afi)

> **Button sia akpa ɣaɣla dzesi ŋɔŋlɔ si tɔ.** Wòaxɔ wò AKT balance ƒe ga na ɣaɣla dzesi ŋɔŋlɔ si mate ŋu async o. Zã [Zebra mɔfia](/guides/akash-network-zebra) ɖe ete.

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Mɔ B: Zã SDL ƒe Editor

Ne nèdi be yéaɖe SDL la ɖe eme kple asi:

-> Ɖe nu siwo katã le *zcashd-akash.yml* me

-> Ɖe ewo ɖe SDL editor la me

-> Trɔe ale si wòhiã (kpɔ configuration ƒe akpa si le ete)

-> Zi **"Wɔ Akpaɖeɖe"**


## Afɔ 3: Kpɔe ɖa Eye Ɖe Mɔ na Deposit

Console la afia na wò:

-> **Akpaɖeɖe ƒe deposit**: ~ 5 AKT (nàxɔe atrɔe ne nètu akpaɖeɖe la)

-> **Ga si woabu be wòaxɔ**: Le wò SDL ƒe asiwo ŋu


Zi **"Ɖe Mɔ"** eye nàsign gaɖoɖo la le Keplr me.

## Afɔ 4: Tia Provider Aɖe

Le sekondi 30 vɛ la, nàkpɔ bids tso providers gbɔ. Bid ɖe sia ɖe afia:

-> **Ga na gaɖoɖowo ƒuƒoƒe ɖe sia ɖe** (le AKT alo USDC me)

-> **Leɣi ɖeka ƒe ga si woabu**

-> **Provider ƒe nyatakaka** (uptime, region, kple bubuwo)


**Mègatia si me xɔa ga o ko.** Kpɔ:

-> Uptime % (di be wòanye > 95%)

-> Region (si te ɖe wò ŋu wu la ana latency nyo, gake esia mexɔ asi geɖe na blockchain ɣaɣla dzesi ŋɔŋlɔwo o)

-> Audited status (dzesi xexlẽ si le gbegbe = woate ŋu axɔe dzi wu)


Zi **"Xɔ Bid"** le provider si nètia la dzi eye nàsign le Keplr me.

## Afɔ 5: Lala na Akpaɖeɖe

Console la awɔ:

-> Wòawɔ lease kple provider si nètia

-> Wòaɖo manifest la ɖe eŋu (si gblɔ na provider la nu si wòawɔ)

-> Wòadze wò container gɔme


Esia axɔ minuti 1-2. Nàkpɔ status ƒe yeyewo le UI me.

## Afɔ 6: Kpɔ Be Ewɔ Dɔ

Ne woɖe akpa la vɔ, nàkpɔ:

-> **Services** tab: Efia wò *zcashd* service kple status

-> **Logs** tab: Logs siwo tso wò zcashd ɣaɣla dzesi ŋɔŋlɔ gbɔ le yi yi

-> **Leases** tab: Nyatakaka tso wò akpaɖeɖe ŋu (DSEQ, provider, ga)


### Kpɔ Logs

Zi **Logs** eye ele be nàkpɔ zcashd le gɔmedzedze:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Dɔwɔwɔ gbãtɔ aɖo zcash-params (~2GB).** Esia nye dɔ si woawɔ zi ɖeka ko eye wòaxɔ minuti 5-10, le provider ƒe bandwidth ŋu. Gɔmedzedze siwo akpɔe ɖo la adzo tso esia ŋu.

Sync la axɔ **gaƒoƒo geɖe va se ɖe ŋkeke geɖe ŋu**, le network la ŋu. Kpɔ be:

-> Gaɖoɖowo ƒuƒoƒe ƒe teƒewo le dzi yina

-> Peer ƒe connectionwo (ele be peers 10-30 nanɔ)

-> Vodada siwo megbugbɔ o


## Afɔ 7: Xɔ Wò Ƒe Ɣaɣla Dzesi Ŋɔŋlɔ Ƒe Gaɖoƒe Ƒe Dzesi

Zi **Leases** tab, eye nàzi **URIs**.

Nàkpɔ nu si abe esia ene:

```
zcashd-8233: provider-hostname.com:31234
```

Esia nye wò ɣaɣla dzesi ŋɔŋlɔ ƒe **public P2P endpoint**. Zcash ɣaɣla dzesi ŋɔŋlɔ bubuwo akɔ ɖe wò ŋu le gaɖoƒe ƒe dzesi sia.

**De dzesidzeŋu le port ƒe map wɔwɔ ŋu:** Nèɖo port 8233 le SDL me, gake Akash de eƒe teƒe kple public port bubu (31234 le kpɔɖeŋu sia me). Esia menye vodada o - kpɔ "Port ƒe Map wɔwɔ le Akash" ƒe akpa si le dzime ne esia wɔ nu na wò o. Wò ɣaɣla dzesi ŋɔŋlɔ ate ŋu awɔ dɔ le port ɖe sia ɖe si Akash fia le afi sia, menye 8233 dzɔdzɔe o.

Ne nèɖe mɔ na RPC (woŋlɔe ɖe anyi le SDL me le gɔmedzedze me), nàkpɔ RPC endpoint la hã le afi sia kple eya ŋutɔ ƒe port si woade eŋu.

## Ɖoɖowɔwɔ Ƒe Tiaɖewo

### Trɔ ɖe Testnet Dzi

SDL la ƒe default nye Mainnet. Be nàzã Testnet ɖe ete:

-> **Trɔ network le *env* ƒe akpa me:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> **Trɔ port si woɖe fia** le *expose* ƒe akpa me:

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

-> **Ne èdi la: Ɖe resources dzi le Testnet ta** le *profiles.compute.zcashd.resources* me:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Ne èdi la: Ɖe asiwo dzi** le *profiles.placement.akash.pricing* me:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> Nudzɔdzɔe be asiwo ƒe ɖeɖe anye provider aɖewo magate ŋu ade bid o. Ɖe asi ɖe value sia ŋu nàkpɔ, alo zã provider endpoint be nàkpɔ ne woade bid. (Kpɔ provider API ƒe nukuŋuti nyatakakawo)

### Ɖe Mɔ na RPC ƒe Mɔkeke

Woɖe mɔ na RPC o le gɔmedzedze me le dedie ta. Be nàɖe mɔ nɛ:

**Vevi ŋutɔ: Ɖo credentials sesẽ.** zcashd RPC na username/password ƒe yi yi to HTTP (menye HTTPS o) dzi. Mèɖe RPC fia o negbe menye wòse dedie ƒe vevie gɔme o.

-> Ɖe comment le *env* ƒe akpa me:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Ɖe comment le RPC port la ŋu le *expose* me:

   **Na Mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Na Testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Nuxlɔ̃:** Ne nèɖo *global: true* na RPC, nèle eɖem fia na internet kple basic auth. Esia menyo o. Zã *global: false* eye nàva RPC to Akash ƒe internal network dzi alo nàɖo secure tunnel aɖe.

**Port ƒe map wɔwɔ ƒe dzesidzeŋu:** Togbɔ be nèɖe RPC fia globally hã, Akash ade port kɔkɔe aɖe si le dziƒe (menye 8232/18232 o) eŋu. Kpɔ URIs le wò akpaɖeɖe me be nàkpɔ public endpoint tututɛ. Na *global: false* (si woɖo afi), RPC endpoint la ate ŋu awɔ dɔ le Akash ƒe akpaɖeɖe network ko me, menye tso public internet dzi o.

### Ɖe Mɔ na Transaction Ƒe Index

Gaɖoɖo ƒe index na wò mɔ be nàbia gaɖoɖo ɖe sia ɖe kple eƒe ID to RPC dzi. Wòazã nuɖoƒe geɖe (~ 20% ƒe dziɖeɖe).

Ɖe comment le *env* me:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Nuxlɔ̃:** Ne nèɖe mɔ na txindex le ɣaɣla dzesi ŋɔŋlɔ si sync vɔ xoxo dzi la, ele be woawɔ index na gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu katã ake, si axɔ gaƒoƒo geɖe.

### Ɖe Mɔ na Insight Explorer

Insight Explorer na REST API endpoints bubuwo na blockchain ƒe nyatakakawo (wòanɔ nyuie na gaɖoɖowo ƒuƒoƒe ƒe explorers).

Ɖe comment le *env* me:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Esia aɖe mɔ na txindex le eɖokui si eye wòaɖe RPC methods bubuwo kpe ɖe eŋu.

### Ɖe Mɔ na Prometheus Ƒe Metrics

Be nàtsɔ metrics akpɔ nu le monitoring ta:

-> Ɖe comment le *env* me:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Ɖe comment le metrics ƒe port la ŋu le *expose* me:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Metricswo anɔ http://yourendpoint:9969/metrics le Prometheus format me.

### Trɔ Resources/Asiwo

Ne bids mele vava o alo nèdi be yèawɔ cost optimization:

**Na providers siwo ƒe spec menɔ dzi o**, ɖe le *profiles.compute.zcashd.resources* ƒe akpa me:

-> CPU: *units: 2* (minimum na sync ƒe speed si nyo)

-> Memory: *size: 12Gi* (minimum na stability)

-> Storage: *size: 120Gi* (minimum na mainnet)


**Be nàhe bids geɖe**, ɖe le *profiles.placement.akash.pricing* me:

-> Mainnet: Kpɔ *amount: 15000* uakt/block

-> Testnet: Kpɔ *amount: 7500* uakt/block


Woɖo SDL ƒe valueswo ɖe dzi kple nukpɔkpɔ. Providers geɖe ade bid si le ete wu.

## Trɔ Wò Akpaɖeɖe

Èhia be nàtrɔ configuration le akpaɖeɖe megbe?

-> Yi ɖe **My Deployments** le Console me

-> Di wò zcashd akpaɖeɖe

-> Zi **"Trɔ Akpaɖeɖe"**

-> Trɔ SDL la

-> Zi **"Trɔ"** eye nàɖe mɔ le Keplr me


**Dzesidzeŋu:** Trɔtrɔ la adze wò container gɔme ake. Ɣaɣla dzesi ŋɔŋlɔ la agayi edzi tso eƒe state si woɖe ɖo (persistent storage) me, gake bu minuti 1-2 ƒe dɔmadzi.

## Kpɔ Dɔwɔwɔ Ŋu

### To Console Dzi

-> **Logs tab**: Container ƒe logs siwo le yi yi

-> **Shell tab**: Xɔ shell le container la me (wònye nu nyui na debugging)

-> **Events tab**: Kubernetes ƒe events (eŋuti menye naɖeke o ne nu aɖeke mesi vɔ o)


### To RPC Dzi (Ne Woɖe Mɔ Nɛ)

Ne nèɖe mɔ na RPC, àte ŋu abia wò ɣaɣla dzesi ŋɔŋlɔ la abe zcashd ɣaɣla dzesi ŋɔŋlɔ blibo siwo katã ene (elabena enye ema!)

### zcash-cli Ƒe Mɔ Bubu

Ne wòle shell ƒe mɔkeke to Console dzi, àte ŋu azã *zcash-cli* tẽ:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Tu Wò Akpaɖeɖe

Ne wowɔ vɔ alo nèdi be nàtsi gaƒeƒe:

-> Yi ɖe **My Deployments**

-> Di wò zcashd akpaɖeɖe

-> Zi **"Tu Akpaɖeɖe"**

-> Ɖo kpe ɖe eŋu eye nàsign le Keplr me


Woatrɔ wò 5 AKT deposit na wò. Ele be provider la na **Persistent storage** la nanɔ, gake mèkɔ ɖe edzi o - kpɔe abe cloud provider bubu ɖe sia ɖe ene.

## Kpekpeɖeŋu Na Kuxiwo

### "Ga mesɔ o" ƒe vodada

AKT geɖe le wò hia. Ɖe ga ɖe wò Keplr gakotoku me.

### Bids mele ɖe fia o

Eya alo:

-> Wò asiwo le ete akpa (ɖe *amount* le SDL me dzi)

-> Wò resources ƒe hiãhiãwo le dzi akpa na providers siwo li (ɖe CPU/memory/storage dzi)

-> Lala akpa aɖe (ɣeaɣi aɖewo wòxɔa sekondi 60-90 hafi bids ana eɖe fia)


### Akpaɖeɖe la tsi le "pending"

Ɖewohĩ provider la le kuxi me. Tu akpaɖeɖe la eye nàkpɔ provider bubu aɖe.

### zcashd logs fia "Peers aɖeke meɖo ƒo o"

Tso End-of-Support ƒe tɔtrɔ le July 18, 2026 me la, esia nye nɔnɔ siwoɖo be wòanɔ tegbee, menye gɔmedzedze ƒe mememenu o, eye lala alo akpaɖeɖe yeye aɖeke mate ŋu awɔe nyuie o. Kpɔ [Zebra](/guides/akash-network-zebra) ɖe ete.

### "Memory do vɔ" ƒe vodadawo le logs me

Nèdi be yeanɔ cheap le RAM ŋu. Tu akpaɖeɖe la eye nàkpɔe ake kple memory 12Gi le esi woatsɔe ko (16Gi woɖo afi).

### Sync le xɔm ɣeyiɣi didi ŋutɔ

Ɖe "ɣeyiɣi didi ŋutɔ" gɔme:

-> **Gaƒoƒo geɖe**: Esia menye vodada o

-> **Ŋkeke geɖe**: Esia hã menye vodada o na mainnet tso gɔmedzedze

-> **Kwasiɖa geɖe**: Nu aɖe mesɔ o, kpɔ logs na vodadawo


### "Vodada le zcash-params xɔxɔ me"

Ɖewohĩ provider la ƒe network le kuxi me alo eƒe bandwidth mele dzi o. Zi geɖe, esia wɔa eɖokui nyuie. Ne wòle edzi na minuti 30 wu la, kpɔ be nàkpɔe ake le provider bubu aɖe gbɔ.

### RPC ƒe authentication ƒe vodadawo

-> Kpɔ be woɖo `ZCASHD_RPCUSER` kple `ZCASHD_RPCPASSWORD` ɖe eme nyuie

-> Kpɔ be nèzã port si sɔ (8232 na mainnet, 18232 na testnet)

-> Ɖo ŋku edzi be Akash wɔa map na ports - zã URI si le wò akpaɖeɖe me, menye 8232 tẽ o


## Ga Ƒe Kpɔkpɔ

Kpɔ wò gaƒeƒe ŋu le Console me:

-> **My Deployments** -> Wò akpaɖeɖe -> Efia "Leɣi ƒe ga" ƒe estimate

-> Wò Keplr gakotoku ƒe balance aɖe le yi yi ɣeaɣi me


Ne wò balance va le ete la, Akash atu wò akpaɖeɖe le eɖokui si. **Ɖe ga ɖe wò gakotoku me zi geɖe** alo wɔ alerts.

### Aleke Nàɖe Ga Dzi

-> **Zã Testnet** na testing si menye production ƒe ta o (wòxɔ ga do 50% le ete)

-> **Ɖe CPU/memory dzi** ne sync ƒe speed le wò hia o

-> **Tia providers siwo xɔa ga do** (menye ɣeaɣi sia ɣeaɣi nu nyui o - uptime le vevie)

-> **Zã USDC le AKT teƒe** ne AKT ƒe asi le trɔtrɔ geɖe (wòhia SDL ƒe pricing ƒe trɔtrɔ)

-> **Tu txindex** ne mehia wò o (esĩa ~ 20% ƒe nuɖoƒe)


### Nuŋkuɖeɖe Bubuwo

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash ƒe Nukuŋuti Nyatakakawo**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash ƒe Explorers**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (na provider ƒe kuxiwo)

## Nuŋkɔŋkɔ Ƒe Dzesidzeŋuwo

- **Persistent storage le vevie.** Mègato *persistent: true* ŋu o alo nàzã *beta2* class o. Zã *beta3*.
- **Sync ƒe gɔmedzedze le blewu.** Miɖe asi. Esia menye vodada o na blockchain ɣaɣla dzesi ŋɔŋlɔwo.
- **Na wò gakotoku nanɔ kple ga.** Akpaɖeɖewo atu le eɖokui si ne AKT do vɔ.
- **Backups mewɔa eɖokui si o.** Ne data la le vevie na wò la, bu be wòate ŋu abu eye nàɖo ɖe eŋu.
- **RPC ƒe dedie le vevie ŋutɔ.** Mèɖe RPC fia na internet meɖe dedie ƒe mɔnyuiwo o.
- **Woɖoa zcash-params ɖe cache me.** Dɔwɔwɔ gbãtɔ aɖo cryptographic parameters ~2GB. Esia menye vodada o eye wòdzɔa zi ɖeka ko.
