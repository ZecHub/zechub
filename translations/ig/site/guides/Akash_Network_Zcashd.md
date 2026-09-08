# Ịnyefe zcashd na Akash site n'aka Console

> ** Echefuola. Esola ntuziaka a iji tinye ọnụ ị na-ezube iji.**
>
> zcashd reached its automatic End-of-Support halt on July 18, 2026. A zcashd node deployed today will not sync to the chain tip, so the deployment costs money every month and produces nothing.
>
> Tinye Zebra kama: [Esi agba ọsọ Zebra na Akash Network](/guides/akash-network-zebra), nke na-ekpuchi otu ọrụ Akash Console ma chọọ ihe dịka ụzọ atọ n'ime diski. Ọ bụrụ na ị na-ebugharị ntọala dị, lee Ntuziaka Nhazi . [zcashd na Zebra na Zallet ntughari nduzi.](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> A na-edebe ibe a dịka ihe ndekọ akụkọ banyere nkesa zcashd.

Guide for deploying a zcashd Zcash full node (Electric Coin Co implementation) using [Akash Console (Nke a na-akpọ)](https://console.akash.network)N'okpuru ebe a bụ nkuzi vidiyo. Enwere ike ịchọta nduzi miri emi n'okpuru.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
    loading="lazy"
  />
</div>


## Ihe Ị Na-eme Ka Ọ Dị Mkpa

Nchịkọta zcashd zuru ezu nke ga-eme:

-> Mmekọrịta dum Zcash blockchain (350GB+ maka mainnet, ~ 40GB maka testnet)

-> Ọnụ ego ruru $ 15 / ọnwa dabere na ọnụahịa akara ngosi AKT.

-> Were ọtụtụ awa ruo ụbọchị iji mekọrịta kpamkpam

-> Jiri 4 vCPUs, 16GB RAM, 350GB nchekwa (mainnet) ma ọ bụ 2 vCPU, 8GB RAM , 50GB (testnet)

-> Nbudata ihe nzuzo nke cryptographic na mbụ (~ 2GB, otu oge)

**zcashd vs Zebra:**

-> zcashd bụ mmejuputa mbụ nke Zcash site na Electric Coin Co, kwụsịrị kemgbe July 18, 2026

-> Zebra, site na Zcash Foundation, bụ ọnụ zuru oke eji eme ihe taa.

-> Naanị Zebra na-agbaso agbụ nke ugbu a; otu zcashd node enweghị ike iru n'isi ya

-> e jirila obere akpa zcashd dochie ya. [Zallet](/using-zcash/zallet-quick-reference-guide)

-> Jiri zcashd ma ọ bụrụ na ịchọrọ ọrụ akpa ego ma ọ bụ RPC API kpọmkwem


### **Mkpa: Imepụta ọdụ ụgbọ mmiri na Akash**

When you expose a port on Akash (e.g., port 8233 for zcashd P2P), it **does NOT bind to that exact port** on the provider's public IP. Instead, the provider assigns a random high port (like 31234 or 42567) and reverse-proxies it to your container's port 8233.

This is by design - providers run multiple deployments, and they'd have conflicts if everyone tried to use port 8233 directly.

** Ihe nke a pụtara nye gị:**

-> Ị hazie ọdụ ụgbọ mmiri 8233 na SDL (zcashd si ọkọlọtọ P2P n'ọdụ ụgbọ mmiri)

-> Akash na-enye gị URI dị ka *provider.com:31234*

-> Ndị ọzọ Zcash nodes jikọọ gị na * provider.com:31234*

-> N'ime akpa gị, zcashd ka na-ege ntị 8233


A na-edozi nke a n'onwe ya. Jiri URI Akash nyere gị mee ihe.

## Ihe ndị a chọrọ iji mee ya bụ:

-> ** Keplr Wallet** ihe nchọgharị mgbakwunye arụnyere (Chrome/Brave/Firefox)

-> ** AKT tokens** - Nweta 50-100 AKT site na mgbanwe (Coinbase, Kraken, Osmosis)

-> ** 5 nkeji** iji pịa site na UI Njikwa


## Nzọụkwụ 1: Jikọọ obere akpa gị

-> Go to [https://console.akash.network](https://console.akash.network)

-> Pịa **"Jikọọ obere akpa ego"** n'elu aka nri.

-> Họrọ ** Keplr** (ma ọ bụ obere akpa Cosmos gị kachasị mma)

-> Kwado njikọ ahụ mgbe Keplr gbapụta


AKT gị kwesịrị ịpụta n'elu aka nri. Ọ bụrụ na ọ bụ efu, buru ụzọ tinye ego gị n'akpa uwe.

## Nzọụkwụ 2: Mepụta Ntinye aka

-> Pịa **"Deploy"** bọtịnụ (nnukwu acha anụnụ anụnụ button, center nke page)

-> Họrọ ** "Mee ndebiri gị"** (ma ọ bụ wepu ozugbo na-ebugote SDL)

### Nhọrọ A: Bulite SDL File (Atụ aro)

> ** bọtịnụ a deploys a kwụsịrị ọnụ.** Ọ na-akwụ ụgwọ megide gị AKT itule maka otu node nke nwere ike sync. Jiri ihe ahụ [Onye ndu Zebra](/guides/akash-network-zebra) kama nke ahụ.

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Nhọrọ B: Jiri SDL Editor

Ọ bụrụ na ịchọrọ iji aka tinye SDL:

-> Detuo ọdịnaya nke * zcashd-akash.yml*

-> Tinye na SDL nchịkọta akụkọ

-> Gbanwee dị ka mkpa (lee nhazi ngalaba n'okpuru)

-> Pịa **"Mepụta Ntinye aka"**


## Nzọụkwụ 3: Nyochaa ma kwado nkwụnye ego ahụ .

Ihe ngosi ga-egosi gị:

-> **Nkwụnye ego ntinye**: ~ 5 AKT (ị ga-enweta nke a mgbe ị mechiri nkenye ọnọdụ)

-> **Echere na ọnụahịa**: Dabere na gị SDL ịnye ọnụahịa.


Pịa **"Kweere"** ma debanye azụmahịa ahụ na Keplr.

## Nke Anọ: Họrọ Onye Ga-enye Gị Ihe Ndị Na-akpa Mkpa n'Ụlọ Unu

Mgbe ~ 30 sekọnd, ị ga-ahụ ọnụahịa site n'aka ndị na enye ọrụ. Ọnụ ego ọ bụla gosipụtara:

-> ** Ọnụahịa kwa ngọngọ** (na AKT ma ọ bụ USDC)

-> **Atụmatụ ego a na-akwụ kwa ọnwa**

-> **Nkọwa nke onye na-enye ọrụ** (oge oge, mpaghara, wdg.)


**Adịla na-ahọrọ ndị dị ọnụ ala.** Lelee:

-> Oge % (gbalịa maka > 95%)

-> Mpaghara (dị nso na gị = oge dị mma, ma ọ dịghị mkpa maka ọnụ ọgụgụ nke blockchain)

-> Ọnọdụ nyocha (akara ahịhịa ndụ = ntụkwasị obi karịa)


Pịa **"Nabata Onyinye ahụ"** na onye ọrụ ị họọrọ ma banye Keplr.

## Nzọụkwụ 5: Chere maka nkenye ọnọdụ

Ihe njikwa ga:

-> Mepụta nkwekọrịta mgbazinye na onye ọrụ ị họọrọ

-> Zipu ihe ngosi (na-agwa onye na-enye ọrụ ihe ị ga - agba ọsọ)

-> Malite akpa gị


Nke a na-ewe 1-2 nkeji. Ị ga-ahụ mmelite ọnọdụ n'ime UI.

## Nzọụkwụ 6: Nyochaa Ọ Na-agba ọsọ

Ozugbo e depụtara ya, ị ga-ahụ:

-> **Ọrụ** taabụ: Na-egosi gị *zcashd* ọrụ na ọnọdụ

-> ** Logs tab: Live log si gị zcashd ọnụ

-> **Leases** taabụ: Nkọwa banyere gị nkenye ọnọdụ (DSEQ, na-eweta, eri)


### Lelee Ihe Ndekọ ahụ .

Pịa na ** Logs** ma ị ga-ahụ zcashd amalite:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Mgba ọsọ mbụ ga-ebudata zcash-params (~ 2GB).** Nke a bụ ọrụ otu oge ma were 5-10 nkeji dabere na bandwidth onye na-eweta. Ntinye ọzọ ndị ọzọ ga-agafe nke a.

Mmekọrịta ga-ewe ** awa ruo ụbọchị** dabere na netwọk. Lelee maka:

-> Ịbawanye elu nke blocks

-> Njikọ ndị ọgbọ (kwesịrị ịbụ 10-30 ibe)

-> Enweghị mmejọ ugboro ugboro


## Nzọụkwụ 7: Nweta Adreesị Node gị

Pịa na taabụ **Leases**, mgbe ahụ **URIs**.

Ị ga-ahụ ihe dị ka:

```
zcashd-8233: provider-hostname.com:31234
```

Nke a bụ ọnụ gị ** njedebe P2P ọha. Ọnụ ndị ọzọ Zcash ga-ejikọ gị na adreesị a.

**Note the port mapping:** You configured port 8233 in the SDL, but Akash assigned it to a different public port (31234 in this example). This is normal - see the "Port Mapping on Akash" section at the top if this confuses you. Your node is accessible at whatever port Akash shows here, not necessarily 8233.

Ọ bụrụ na ị kwadoro RPC (kwuru site na ndabara na SDL), ị ga-ahụkwa njedebe nke RPC ebe a nwere ọdụ ụgbọ mmiri ya.

## Nhọrọ nhazi

### Ịgbanwe gaa na Testnet

SDL na-agbanye aka n'ime Mainnet. Iji jiri Testnet kama:

-> ** Gbanwee netwọk na ngalaba * env:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> ** Melite ọdụ ụgbọ mmiri ekpughere** na ngalaba * kpughee:

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

-> ** Nhọrọ: Belata ihe onwunwe** maka Testnet na *profiles.compute.zcashd.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> ** Nhọrọ: Ọnụahịa dị ala karịa na profaịlụ.ebe a ga-etinye ya,akash.ọnụego*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> Cheta na-agbadata ahịa nwere ike iyo anyị enye ụdị bidding. ahụmahụ a uru, ma ọ bụ jiri eweta endpiont iji chọpụta ma ha ga-enye (nyochaa eweta API akwụkwọ)

### Kwado RPC Access

RPC bụ nkwarụ maka nchekwa. Iji mee ka ọ rụọ ọrụ:

**KWESỊRỊ: Tinye nzere siri ike.** zcashd RPC na-eziga aha njirimara / paswọọdụ site na HTTP (ọ bụghị HTTPS). Naanị kpughee RPC ma ọ bụrụ na ị ghọtara ihe nchebe.

-> Uncomment na ngalaba * env:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Uncomment na RPC n'ọdụ ụgbọ mmiri * kpughere*:

   ** Maka Mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   ** Maka Testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Ịdọ aka ná ntị**: Ọ bụrụ na ịtọlite *global: true* maka RPC, ị ga-ekpughe ya n'ịntanetị site na isi edemede. Nke a bụ echiche ọjọọ. Jiri *glonal: false* ma nweta RPC site na netwọkụ nke Akash ma ọ bụ mepụta oghere echekwara.

** Ihe ncheta nke mapping ọdụ ụgbọ mmiri: Ọbụna ma ọ bụrụ na ị kpughere RPC n'ụwa niile, Akash ga-atụ ya gaa n'ọdụ ụgbọ elu dị elu (ọ bụghị 8232/18232). Lelee URI gị iji hụ njedebe ọha mmadụ. Maka * ụwa dum: ụgha* (akwadoro), a pụrụ ịnweta njedebe RPC naanị n'ime netwọk nkesa Akash, ọ bụghị site na ịntanetị ọhaneze.

### Kpọtụrụ ndị na- eme ihe ngosi .

Nhazi azụmahịa na-enye gị ohere ịjụ ajụjụ ọ bụla site n'aka ID ya site na RPC. Na -eji nchekwa karịa (~ 20% mmụba).

Uncomment na *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Ịdọ aka ná ntị**: Ịnye txindex na otu node synced dị mkpa ka ị degharịa blockchain dum, nke ga-ewe ọtụtụ awa.

### Kwado onye nyocha Insight Explorer

Insight Explorer na-enye ndị ọzọ REST API endpoints maka data blockchain (bara uru maka block explorers).

Uncomment na *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Nke a na-eme ka txindex rụọ ọrụ ma tinye usoro RPC ọzọ.

### Kwado Metrics Prometheus

Iji kpochapụ metrics maka nlekota:

-> Uncomment na * env:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Uncomment metrics n'ọdụ ụgbọ mmiri na * kpughere*:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Metrics ga-adị na: http://yourendpoint:9969/metrics na usoro Prometheus.

### Gbanwee Akụrụngwa/Ịnye ọnụahịa

Ọ bụrụ na ị naghị enweta ọnụahịa ma ọ bụ chọọ ịkwalite ego:

** Maka ndị na-enye ọrụ dị ala**, belata ngalaba *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (nke kacha nta maka ezi uche sync ọsọ)

-> Ncheta: * size: 12Gi* (nke kacha nta maka nkwụsi ike)

-> Nchekwa: * size: 120Gi* (nke kacha nta maka mainnet)


** Iji dọta ọnụ ahịa ndị ọzọ**, mụbaa na *profiles.placement.akash.pricing*:

-> Mainnet: Gbalịa * ego: 15000* uakt/block

-> Testnet: Gbalịa * ego: 7500* uakt/block


A na-edozi ụkpụrụ SDL dị elu. Ọtụtụ ndị na - enye ha ga - arịọ obere ego karịa nke ahụ.

## Ịmelite Ntinye Aka Gị

Mkpa ịgbanwe nhazi mgbe e deployed?

-> Gaa na ** My Deployments** n'ime Njikwa

-> Chọta gị zcashd nkenye ọnọdụ

-> Pịa **"Mgbanwe Mmelite"**

-> Dezie SDL ahụ

-> Pịa **"Mgbanwe"** ma kwado na Keplr


**Cheta**: Imelite ga-amaliteghachi akpa gị. Akụkụ ahụ ga - amalite site na ọnọdụ echekwara ya (nchekwa nchekwa), mana atụ anya 1-2 nkeji nke nkwụsị oge.

## Nlekota oru

### Site na Console

-> **Logs tab**: Live container logs (ndekọ ihe ndị dị ndụ)

-> **Shell tab**: Nweta shei n'ime akpa (bara uru maka debugging)

-> **Ihe omume tab**: Ihe ndị Kubernetes (ọtụtụ na-abaghị uru ọ gwụla ma ihe mebiri)


### Site na RPC (ma ọ bụrụ na enyere ya)

Ọ bụrụ na ị kwadoro RPC, ịnwere ike ịjụ ọnụ gị dịka zcashd zuru oke (n'ihi na ọ bụ!)

### zcash-cli Nhọrọ ọzọ

Ọ bụrụ na ị nwere ohere shell site na Console, ịnwere ike iji *zcash-cli* ozugbo:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Ịkwụsị Ọrụ Gị

Mgbe ị kwụsịrị maọbụ chọọ ịkwụsị akwụ ụgwọ:

-> Gaa na ** My Deployments**

-> Chọta gị zcashd nkenye ọnọdụ

-> Pịa **"Mechie Ntinye aka"**

-> Kwado ma banye na Keplr


A ga-akwụghachi gị ego nkwụnye ego AKT 5 gị. ** Nchekwa na-adịgide adịgide** kwesịrị ịchekwa onye ọrụ ahụ, mana adaberekwala ya - jiri ya dị ka ndị ọzọ na-enye igwe ojii ọ bụla.

## Nchọpụta nsogbu

### "Ego ezughi oke" njehie.

Ị chọkwuru AKT. Zụlite akpa ego Keplr gị.

### Enweghị ọnụ ahịa na-egosi.

Ma ọ bụ:

-> Ọnụahịa gị dị oke ala (mụbaa * ego* na SDL)

-> Ihe ndị ị chọrọ maka ihe onwunwe dị oke elu maka ndị na-enye ọrụ (belata CPU / ebe nchekwa / nchekwa)

-> Chere ogologo oge (mgbe ụfọdụ na-ewe 60-90 sekọnd maka ọnụahịa ịpụta)


### Ntinye na "na-echere"

Onye na enye ya nwere ike inwe nsogbu. Mechie nkenye ma nwalee onye ọzọ nyere ọrụ.

### Ihe ndekọ zcashd na-egosi "Ọ dịghị ndị ọgbọ jikọtara"

Ebe ọ bụ na njedebe nke nkwado kwụsịrị na July 18, 2026, nke a bụ ọnọdụ echere mgbe niile kama ịbịakwute oge mmalite, ma enweghị ọnụ ọgụgụ ichere ma ọ bụ redistribution ga-edozi ya. Ntinye [Zebra](/guides/akash-network-zebra) kama nke ahụ.

### Njehie "N'echeta" na ndekọ

I jirila RAM dị ọnụ ala mechie nkesa ahụ ma tinyegharịa ya na ọ dịkarịa ala 12Gi ebe nchekwa (16Gi akwadoro).

### Nhazi na-ewe oge dị ukwuu.

Kọwaa ihe "ruo mgbe ebighị ebi" pụtara:

-> ** Oge awa**: Ọ dị mma.

-> **Days**: Ọ dịkwa mma maka mainnet site na ncha.

-> **Izu**: Ihe adịghị mma, lelee ndekọ maka njehie.


### "Njehie na-enweta zcash-params"

Onye na enye ya nwere ike inwe nsogbu netwọk ma ọ bụ nwayọ bandwidth. Nke a ga-edozi onwe ya. Ọ bụrụ na ọ dịgide ruo ihe karịrị nkeji 30, gbalịa ịnyefe onye ọrụ ọzọ.

### Nsogbu nkwenye RPC

-> Lelee na *ZCASHD_RPCUSER* na * ZCASHD _ RPCPASSWORD* ka edoziri nke ọma.

-> Nyochaa na ị na-eji ọdụ ụgbọ mmiri ziri ezi (8232 maka mainnet, 18232 n'ihi testnet)

-> Cheta ọdụ ụgbọ mmiri na-maped site Akash - iji URI si gị nkenye ọnọdụ, bụghị 8232 ozugbo


## Njikwa ego

Nyochaa mmefu gị na Console:

-> ** My Deployments** -> Your deployment -> Na-egosi "Ego kwa ọnwa" atụmatụ.

-> Nkwụnye ego Keplr gị ga-ebelata ka oge na-aga.


Mgbe ego gị gwụrụ, Akash ga-emechi nkenye gi. ** Tinye obere akpa gị oge niile** ma ọ bụ melite ọkwa.

### Ịbelata Ụgwọ Ndị A Na-akwụ Maka Ya

-> **Jiri Testnet** maka ule na-abụghị nke mmepụta (50% dị ọnụ ala)

-> ** CPU / ebe nchekwa dị ala** ma ọ bụrụ na ịchọghị ngwa sync ọsọ ọsọ

-> **Họrọ ndị na-enye ego dị ọnụ ala** (ọ bụghị mgbe niile ka ọ maara ihe - oge ọrụ)

-> **Jiri USDC kama AKT** ma ọ bụrụ na ọnụahịa nke AKT bụ volatile (chọrọ mgbanwe SDL ịnye ọnụahịa)

-> ** Gbanyụọ txindex** ma ọ bụrụ na ị dịghị mkpa ya (azọpụta ~ 20% nchekwa)


### Ihe Ndị Ọzọ E Nwere Ike Iji Nyere Anyị Aka

**Akash Console**: Ọ bụ ihe a na-akpọ ya. [https://console.akash.network](https://console.akash.network)

** Akash Docs**: Onye na-eme ihe nkiri a bụ onye isi. [https://akash.network/docs/](https://akash.network/docs/)

** Ndị na-enyocha Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: Onye na-agba egwu, onye na-egwu egwú. [https://discord.akash.network](https://discord.akash.network) (maka nsogbu ndị na-enye ọrụ)

## Ihe Ndị E Kwuru ná Ngwụcha

- ** Ihe nchekwa na-adịgide adịgide.** Emela ka * nọgidere: ezi ma ọ bụ jiri klas beta2 mee ihe. Jiri * beta3*.
- **Mmemme mbụ na-adị nwayọ.** Nwee ndidi. Nke a bụ ihe dị mma maka ọnụ ọgụgụ blockchain.
- **Jide ego gị.** Ntinye aka na-emechi onwe ya mgbe AKT gwụrụ.
- ** Ndabere abụghị akpaka.** Ọ bụrụ na ị hụrụ data n'anya, chee na ọ nwere ike ikpochapụ ma mee atụmatụ dịka.
- **Nchebe RPC dị oke mkpa.** Ekpughela RPC na ịntanetị n'enweghị usoro nchekwa kwesịrị ekwesị.
- **zcash-params na echekwa.** Mbụ ọsọ downloads ~ 2GB nke cryptographic parameters. Nke a bụ nkịtị ma naanị otu ugboro emee.
