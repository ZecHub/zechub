# Ntinye nke zcashd na Akash site na Console

Guide for deploying a zcashd Zcash full node (Electric Coin Co implementation) using [Akash Console](https://console.akash.network)N'okpuru ebe a bụ nkuzi vidiyo. Enwere ike ịchọta nduzi miri emi n'okpuru.

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


## Ihe Ị Na-etinye n'Ọrụ

Nchịkọta zcashd zuru ezu nke ga-eme:

-> Mmekọrịta dum Zcash blockchain (350GB+ maka mainnet, ~ 40GB maka testnet)

-> Ọnụ ego ruru $ 15 / ọnwa dabere na ọnụahịa akara ngosi AKT

-> Were ọtụtụ awa ruo ụbọchị iji mekọrịta kpamkpam

-> Jiri 4 vCPUs, 16GB RAM, 350GB nchekwa (mainnet) ma ọ bụ 2 vCPU, 8GB RAM , 50GB (testnet)

-> Download cryptographic parameters on first run (~ 2GB, otu oge)

**zcashd vs Zebra:**

-> zcashd bụ mmejuputa mbụ nke Zcash site na Electric Coin Co.

-> Zebra bụ mmejuputa ọzọ nke Zcash Foundation

-> Ha abụọ dakọtara na netwọk Zcash

-> zcashd nwere atụmatụ ndị ọzọ (igwupụta, obere akpa, Insight Explorer API)

-> Jiri zcashd ma ọ bụrụ na ịchọrọ ọrụ akpa ego ma ọ bụ RPC API kpọmkwem


### ** Ihe dị mkpa: Port Mapping na Akash **

When you expose a port on Akash (e.g., port 8233 for zcashd P2P), it **does NOT bind to that exact port** on the provider's public IP. Instead, the provider assigns a random high port (like 31234 or 42567) and reverse-proxies it to your container's port 8233.

This is by design - providers run multiple deployments, and they'd have conflicts if everyone tried to use port 8233 directly.

** Ihe nke a pụtara nye gị:**

-> Ị hazie ọdụ ụgbọ mmiri 8233 na SDL (zcashd si ọkọlọtọ P2P n'ọdụ ụgbọ mmiri)

-> Akash na-enye gị URI dị ka *provider.com:31234*

-> Ndị ọzọ Zcash nodes jikọọ gị na * provider.com:31234*

-> N'ime akpa gị, zcashd ka na-ege ntị na 8233


A na-edozi nke a na akpaghị aka. Jiri URI nke Akash nyere gị.

## Ihe ndị a chọrọ

-> ** Keplr Wallet ** nchọgharị ndọtị arụnyere (Chrome/Brave/Firefox)

-> ** AKT tokens ** - Nweta 50-100 AKT site na mgbanwe (Coinbase, Kraken, Osmosis)

-> **5 nkeji** iji pịa site na UI Njikwa


## Nzọụkwụ 1: Jikọọ obere akpa gị

-> Go to [https://console.akash.network](https://console.akash.network)

-> Pịa **"Jikọọ obere akpa"** n'elu aka nri

-> Họrọ ** Keplr ** (ma ọ bụ obere akpa Cosmos kachasị amasị gị)

-> Kwado njikọ ahụ mgbe Keplr gbapụta


AKT gị ga-apụta n'elu aka nri. Ọ bụrụ na ọ bụ efu, buru ụzọ tinye ego n'akpa gị.

## Nzọụkwụ 2: Mepụta Ntinye

-> Pịa **"Deploy"** bọtịnụ (nnukwu bọtịnụ na-acha anụnụ anụnụ, n'etiti peeji)

-> Họrọ **"Wụpụta ndebiri gị"** (ma ọ bụ gafere ozugbo na-ebugote SDL)

### Nhọrọ A: Bulite SDL File (Atụ aro)

[![Wụnye na Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Nhọrọ B: Jiri SDL Editor

Ọ bụrụ na ịchọrọ iji aka tinye SDL:

-> Detuo ọdịnaya nke *zcashd-akash.yml*

-> Tinye n'ime SDL nchịkọta akụkọ

-> Gbanwee dịka ọ dị mkpa (lee ngalaba nhazi n'okpuru)

-> Pịa **"Mepụta Ntinye"**


## Nzọụkwụ 3: Nyochaa ma kwado ego

Kọmpụta ga-egosi gị:

-> **Nkwụnye ego ntinye**: ~ 5 AKT (ị ga-enweta nke a mgbe ị mechiri ntinye)

-> ** Atụmatụ ọnụahịa **: Dabere na ọnụahịa SDL gị


Pịa **"Kweere"** ma bịanye aka na azụmahịa ahụ na Keplr.

## Nzọụkwụ nke Anọ: Họrọ Onye Ga Na-elekọta Gị

Mgbe ~ 30 sekọnd, ị ga-ahụ ọnụahịa site n'aka ndị na-enye ọrụ.

-> ** Ọnụahịa kwa ngọngọ ** (na AKT ma ọ bụ USDC)

-> **Atụmatụ ego a na-akwụ kwa ọnwa**

-> **Nkọwa nke onye na-eweta ọrụ** (oge ọrụ, mpaghara, wdg.)


**Unu ahọrọla nke kacha ọnụ ala.** Lelee:

-> Oge % (gbalịa maka > 95%)

-> Mpaghara (dị nso na gị = oge dị mma, mana ọ baghị uru maka blockchain nodes)

-> Ọnọdụ nyocha (akara ahịhịa ndụ = ntụkwasị obi karịa)


Pịa **"Nabata Onyinye"** na onye na-eweta ọrụ ị họọrọ ma banye na Keplr.

## Nzọụkwụ 5: Chere maka Ntinye

Ihe njikwa ga:

-> Mepụta nkwekọrịta mgbazinye na onye na-eweta ọrụ ị họọrọ

-> Zipu manifesto (na-agwa onye na-eweta ihe ọ ga-agba ọsọ)

-> Malite akpa gị


Nke a na-ewe 1-2 nkeji. Ị ga-ahụ mmelite ọnọdụ na UI.

## Nzọụkwụ 6: Nyochaa Ọ Na-agba ọsọ

Ozugbo e depụtara ya, ị ga-ahụ:

-> **Ọrụ** taabụ: Na-egosi gị *zcashd* ọrụ na ọnọdụ

-> ** Logs ** taabụ: Live logs si gị zcashd ọnụ

-> **Leases** taabụ: Nkọwa banyere nkenye ọnọdụ gị (DSEQ, onye na-eweta, ụgwọ)


### Lelee Ihe Ndekọ

Pịa na ** Logs ** ma ị ga-ahụ zcashd na-amalite:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Mgba ọsọ mbụ ga-ebudata zcash-params (~ 2GB).** Nke a bụ ọrụ otu oge ma were 5-10 nkeji dabere na bandwidth onye na-eweta ya. Ntinyeghachi ndị ọzọ ga-agafe nke a.

Mmekọrịta ga-ewe ** awa ruo ụbọchị ** dabere na netwọk. Lelee maka:

-> Ịbawanye elu nke blocks

-> Njikọ ndị ọgbọ (kwesịrị ịbụ 10-30 ndị ọgbọ)

-> Enweghị mmejọ ugboro ugboro


## Nzọụkwụ 7: Nweta Adreesị Node gị

Pịa na **Leases** taabụ, mgbe ahụ **URIs**.

Ị ga-ahụ ihe dị ka:

```
zcashd-8233: provider-hostname.com:31234
```

Nke a bụ ọnụ gị ** njedebe P2P ọha. Ọnụ ndị ọzọ Zcash ga-ejikọ gị na adreesị a.

**Note the port mapping:** You configured port 8233 in the SDL, but Akash assigned it to a different public port (31234 in this example). This is normal - see the "Port Mapping on Akash" section at the top if this confuses you. Your node is accessible at whatever port Akash shows here, not necessarily 8233.

If you enabled RPC (commented out by default in the SDL), you'll also see the RPC endpoint here with its own mapped port.

## Nhọrọ nhazi

### Ịgbanwee gaa na Testnet

SDL bụ ndabara na Mainnet. Iji jiri Testnet kama:

-> ** Gbanwee netwọk na ngalaba * env *: **

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> ** Melite ọdụ ụgbọ mmiri ekpughere ** na ngalaba * kpughere *:

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

-> **Nhọrọ: Ọnụahịa dị ala** na *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> note lowering prices may filter our providers form bidding. experiement with this value, or use the provider endpiont to check if they would bid. (review provider api documentation)

### Kwado RPC Access

A na-agbanyụ RPC site na ndabara maka nchekwa. Iji mee ya:

**MGBE: Tinye nzere siri ike.** zcashd RPC na-eziga aha njirimara / paswọọdụ site na HTTP (ọ bụghị HTTPS). Naanị kpughee RPC ma ọ bụrụ na ị ghọtara ihe nchebe.

-> Uncomment na ngalaba * env *:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Uncomment RPC n'ọdụ ụgbọ mmiri na * kpughere *:

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

**Warning**: If you set *global: true* for RPC, you're exposing it to the internet with basic auth. This is a bad idea. Use *global: false* and access RPC through Akash's internal network or set up a secure tunnel.

**Port mapping reminder**: Even if you expose RPC globally, Akash will map it to a random high port (not 8232/18232). Check the URIs in your deployment to see the actual public endpoint. For *global: false* (recommended), the RPC endpoint is only accessible within the Akash deployment network, not from the public internet.

### Kpọtụrụ ndị na-emepụta ihe

Transaction index allows you to query any transaction by its ID via RPC. Uses more storage (~ 20% increase).

Uncomment na *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Ịdọ aka ná ntị**: Ime ka txindex dị na node synced dị ugbu a na-achọ re-indexing dum blockchain, nke na-ewe awa.

### Kwado Insight Explorer

Insight Explorer na-enye ndị ọzọ REST API endpoints maka blockchain data (bara uru maka ngọngọ explorers).

Uncomment na *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Nke a na-eme ka txindex rụọ ọrụ na-akpaghị aka ma gbakwunye usoro RPC ndị ọzọ.

### Kwado Prometheus Metrics

Iji kpochapụ metrics maka nlekota:

-> Uncomment na * env *:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Uncomment metrics n'ọdụ ụgbọ mmiri na * kpughere *:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Mmetụta ga-adị na http://yourendpoint:9969/metrics n'ụdị Prometheus.

### Gbanwee ihe onwunwe/ọnụahịa

Ọ bụrụ na ị naghị enweta ọnụ ahịa ma ọ bụ chọọ ịkwalite ọnụahịa:

**Maka ndị na-enye ọrụ dị ala**, belata na ngalaba *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (nke kacha nta maka ezi uche sync ọsọ)

-> Ebe nchekwa: * nha: 12Gi * (nke kacha nta maka nkwụsi ike)

-> Nchekwa: * size: 120Gi * (nke kacha nta maka mainnet)


** Iji dọta ọnụ ahịa ndị ọzọ **, mụbaa na *profiles.placement.akash.pricing*:

-> Mainnet: Gbalịa *ego: 15000* uakt/block

-> Testnet: Gbalịa * ego: 7500* uakt/block


A na-edozi ụkpụrụ SDL dị elu. Ọtụtụ ndị na-enye ọrụ ga-akwụ ụgwọ dị ala.

## Ịmelite Ntinye Aka Gị

Mkpa ịgbanwe nhazi mgbe e deployed?

-> Gaa na ** My Deployments ** na Console

-> Chọta nkesa zcashd gị

-> Pịa **"Mgbanwe Mmelite"**

-> Dezie SDL

-> Pịa **"Mmelite"** ma kwado na Keplr


**Cheta**: Imelite ga-amaliteghachi akpa gị. Akụkụ ahụ ga-ebido site na ọnọdụ echekwara ya (nchekwa na-adịgide adịgide), ma na-atụ anya 1-2 nkeji nke nkwụsị.

## Nlekota

### Site na Console

-> **Logs tab**: Live container logs

-> **Shell tab**: Nweta shei n'ime akpa (bara uru maka debugging)

-> ** Ihe omume tab **: Ihe omume Kubernetes (ọ na-abaghị uru ọ gwụla ma ihe mebiri emebi)


### Site na RPC (ma ọ bụrụ na enyere ya)

Ọ bụrụ na ị kwadoro RPC, ị nwere ike ịjụ ọnụ gị dịka zcashd zuru oke (n'ihi na ọ bụ!)

### zcash-cli Nhọrọ ọzọ

Ọ bụrụ na ị nwere ohere shell site na Console, ị nwere ike iji *zcash-cli* ozugbo:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Ịkwụsị Ọrụ Gị

Mgbe i mechara maọbụ chọọ ịkwụsị ịkwụ ụgwọ:

-> Gaa na ** My Deployments **

-> Chọta nkesa zcashd gị

-> Pịa **"Mechie Ntinye"**

-> Kwado ma banye na Keplr


Your 5 AKT deposit will be refunded. **Persistent storage** should be preserved by the provider, but don't rely on it - treat it like any other cloud provider.

## Nchọpụta nsogbu

### Njehie "ego ezughi oke"

Ị chọkwuru AKT. Weta ego n'akpa Keplr gị.

### Enweghị ọnụahịa na-egosi

Ma ọ bụ:

-> Ọnụahịa gị dị oke ala (mụbaa *ego* na SDL)

-> Ihe ndị ị chọrọ maka ihe onwunwe dị oke elu maka ndị na-eweta ọrụ (belata CPU / ebe nchekwa / nchekwa)

-> Chere ogologo oge (mgbe ụfọdụ ọ na-ewe 60-90 sekọnd maka ọnụahịa ịpụta)


### Ntinye na "na-echere"

Onye na-enye ọrụ nwere ike ịnwe nsogbu. Mechie nkesa ma nwalee onye na-eweta ọrụ ọzọ.

### Ihe ndekọ zcashd na-egosi "Ọ dịghị ndị ọgbọ jikọtara"

This is normal for the first few minutes. zcashd will discover peers automatically. If it persists after 10+ minutes, you might have a networking issue (unlikely on Akash).

### Njehie "N'ime ebe nchekwa" na ndekọ

I jirila RAM dị ọnụ ala. Mechie nkesa ma weghachite ma ọ dịkarịa ala 12Gi ebe nchekwa (16Gi na-atụ aro).

### Mmekọrịta na-ewe ogologo oge

Kọwaa "ruo mgbe ebighị ebi":

-> ** Oge awa **: Ọ dị mma

-> **Days**: Ọ dịkwa mma maka mainnet site na ncha

-> **Izu**: Ihe adịghị mma, lelee ndekọ maka njehie


### "Njehie na-enweta zcash-params"

The provider might have network issues or slow bandwidth. This usually resolves itself. If it persists for more than 30 minutes, try redeploying to a different provider.

### Nsogbu nkwenye RPC

-> Lelee na * ZCASHD_RPCUSER * na *ZCASHD _ RPCPASSWORD * na-setịpụrụ n'ụzọ ziri ezi

-> Nyochaa na ị na-eji ọdụ ụgbọ mmiri ziri ezi (8232 maka mainnet, 18232 n'ihi na testnet)

-> Cheta ọdụ ụgbọ mmiri na-maped site Akash - iji URI si gị nkenye ọnọdụ, bụghị 8232 ozugbo


## Njikwa ego

Nyochaa mmefu gị na Console:

-> ** My Deployments ** -> Your deployment -> Na-egosi "Ego kwa ọnwa" atụmatụ

-> Akaụntụ Keplr gị ga-ebelata ka oge na-aga


Mgbe nguzo gị na-agwụ, Akash ga-emechi ntinye gị. ** Tinye obere akpa gị oge niile ** ma ọ bụ melite ọkwa.

### Ibelata Ụgwọ Ndị A Na-akwụ

-> **Jiri Testnet** maka ule na-abụghị nke mmepụta (50% dị ọnụ ala)

-> ** Obere CPU / ebe nchekwa ** ma ọ bụrụ na ịchọghị ngwa ngwa

-> **Họrọ ndị na-eweta ego dị ọnụ ala** (ọ bụghị mgbe niile ka ọ dị mma - ihe gbasara oge)

-> **Jiri USDC kama AKT** ma ọ bụrụ na AKT price bụ volatile (chọrọ SDL ịnye ọnụahịa mgbanwe)

-> ** Gbanyụọ txindex ** ma ọ bụrụ na ị na-adịghị mkpa ya (azọpụta ~ 20% nchekwa)


### Ihe Ndị Ọzọ A Na-enweta

**Akash Console**: [Onye na-eme ihe nkiri]https://console.akash.network](https://console.akash.network)

**Akash Docs**:https://akash.network/docs/](https://akash.network/docs/)

** Ndị na-enyocha Zcash **: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Agha**: [https://discord.akash.network](https://discord.akash.network) (maka nsogbu ndị na-eweta ọrụ)

## Ihe Ndị E Kwuru ná Ngwụcha

- ** Ihe nchekwa na-adịgide adịgide.** Emela * na-anọgide: ezi* ma ọ bụ jiri * beta2 * klas. Jiri * beta3 *.
- **Nhazi oge mbụ dị nwayọ.** Nwee ndidi. Nke a bụ ihe nkịtị maka blockchain nodes.
- ** Na-eme ka ego gị dị.** Ntinye aka na-emechi mgbe AKT gwụrụ gị.
- **Backups aren't automatic.** If you care about the data, assume it can disappear and plan accordingly.
- **Nchebe RPC dị oke mkpa.** Ekpughela RPC na ịntanetị na-enweghị usoro nchekwa kwesịrị ekwesị.
- **zcash-params are cached.** First run downloads ~2GB of cryptographic parameters. This is normal and only happens once.
