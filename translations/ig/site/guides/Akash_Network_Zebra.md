# Otu esi agba ọsọ Zebra na Akash Network

Ntuziaka nzọụkwụ-site-nzọụkwụ maka itinye Zebra Zcash full node iji [Akash Console](https://console.akash.network).

### Ihe Ị Na-etinye n'Ọrụ

Ogwe Zebra zuru ezu nke ga-eme:

-> Mmekọrịta dum Zcash blockchain (100GB+ maka mainnet, ~40GB maka testnet)

-> Ọnụ ego ruru $ 15 / ọnwa dabere na ọnụahịa akara ngosi AKT

-> Were ọtụtụ awa ruo ụbọchị iji mekọrịta kpamkpam

-> Jiri 4 vCPUs, 16GB RAM, 350GB nchekwa (mainnet) ma ọ bụ 2 vCPU, 8GB RAM , 50GB (testnet)


### Ihe dị mkpa: Imepụta ọdụ ụgbọ mmiri na Akash

When you expose a port on Akash (e.g., port 8233 for Zebra P2P), it **does NOT bind to that exact port** on the provider's public IP. Instead, the provider assigns a random high port (like 31234 or 42567) and reverse-proxies it to your container's port 8233.

This is by design - providers run multiple deployments, and they'd have conflicts if everyone tried to use port 8233 directly.

** Ihe nke a pụtara nye gị:**

-> Ị hazie ọdụ ụgbọ mmiri 8233 na SDL (Zebra si ọkọlọtọ P2P n'ọdụ ụgbọ mmiri)

-> Akash na-enye gị URI dị ka *provider.com:31234*

-> Ndị ọzọ Zcash nodes jikọọ gị na * provider.com:31234*

-> N'ime akpa gị, Zebra ka na-ege ntị na 8233


A na-edozi nke a na akpaghị aka. Jiri URI nke Akash nyere gị.

### Ihe ndị a chọrọ

1. **Keplr Wallet** ihe nchọgharị mgbakwunye arụnyere (Chrome/Brave/Firefox)
2. ** AKT tokens ** - Nweta 50-100 AKT site na mgbanwe (Coinbase, Kraken, Osmosis)
3. ** 5 nkeji ** iji pịa site na UI Njikwa

#### Nzọụkwụ 1: Jikọọ obere akpa gị

-> Go to [https://console.akash.network](https://console.akash.network)

-> Pịa **"Jikọọ obere akpa"** n'elu aka nri

-> Họrọ ** Keplr ** (ma ọ bụ obere akpa Cosmos kachasị amasị gị)

-> Kwado njikọ ahụ mgbe Keplr gbapụta


AKT gị ga-apụta n'elu aka nri. Ọ bụrụ na ọ bụ efu, buru ụzọ tinye ego n'akpa gị.

#### Nzọụkwụ 2: Mepụta Ntinye

-> Pịa **"Deploy"** bọtịnụ (nnukwu bọtịnụ na-acha anụnụ anụnụ, n'etiti peeji)

-> Họrọ **"Wụpụta ndebiri gị"** (ma ọ bụ gafere ozugbo na-ebugote SDL)


##### Nhọrọ A: Bulite SDL File (Atụ aro)

[![Wụnye na Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Nhọrọ B: Jiri SDL Editor

Ọ bụrụ na ịchọrọ iji aka tinye [SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Detuo ọdịnaya nke *zebra-akash.yml*

-> Tinye n'ime SDL nchịkọta akụkọ

-> Gbanwee dịka ọ dị mkpa (lee ngalaba nhazi n'okpuru)

-> Pịa **"Mepụta Ntinye"**


#### Nzọụkwụ 3: Nyochaa ma kwado ego

Kọmpụta ga-egosi gị:

-> **Nkwụnye ego ntinye**: ~ 5 AKT (ị ga-enweta nke a mgbe ị mechiri ntinye)

-> ** Atụmatụ ọnụahịa **: Dabere na ọnụahịa SDL gị

Pịa **"Kweere"** ma bịanye aka na azụmahịa ahụ na Keplr.

#### Nzọụkwụ nke Anọ: Họrọ Onye Ga Na-elekọta Gị

Mgbe ~ 30 sekọnd, ị ga-ahụ ọnụahịa site n'aka ndị na-enye ọrụ.

-> ** Ọnụahịa kwa ngọngọ ** (na AKT ma ọ bụ USDC)

-> **Atụmatụ ego a na-akwụ kwa ọnwa**

-> **Nkọwa nke onye na-eweta ọrụ** (oge ọrụ, mpaghara, wdg.)


**Unu ahọrọla nke kacha ọnụ ala.** Lelee:

-> Oge % (gbalịa maka > 95%)

-> Mpaghara (dị nso na gị = oge dị mma, mana ọ baghị uru maka blockchain nodes)

-> Ọnọdụ nyocha (akara ahịhịa ndụ = ntụkwasị obi karịa)


Pịa **"Nabata Onyinye"** na onye na-eweta ọrụ ị họọrọ ma banye na Keplr.

#### Nzọụkwụ 5: Chere maka Ntinye

Ihe njikwa ga:

-> Mepụta nkwekọrịta mgbazinye na onye na-eweta ọrụ ị họọrọ

-> Zipu manifesto (na-agwa onye na-eweta ihe ọ ga-agba ọsọ)

-> Malite akpa gị

Nke a na-ewe 1-2 nkeji. Ị ga-ahụ mmelite ọnọdụ na UI.

#### Nzọụkwụ 6: Nyochaa Ọ Na-agba ọsọ

Ozugbo e depụtara ya, ị ga-ahụ:

-> **Ọrụ** taabụ: Na-egosi ọrụ *zebra* gị na ọnọdụ

-> ** Logs ** taabụ: Live container logs

-> **Leases** taabụ: Nkọwa banyere nkenye ọnọdụ gị (DSEQ, onye na-eweta, ụgwọ)


##### Lelee Ihe Ndekọ

Pịa na ** Logs ** ma ị ga-ahụ Zebra na-amalite:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Mmekọrịta ga-ewe ** awa ruo ụbọchị ** dabere na netwọk. Lelee maka:

-> Ịbawanye elu nke blocks

-> Njikọ ndị ọgbọ (kwesịrị ịbụ 10-30 ndị ọgbọ)

-> Enweghị mmejọ ugboro ugboro


#### Nzọụkwụ 7: Nweta Adreesị Node gị

Pịa na **Leases** taabụ, mgbe ahụ **URIs**.

Ị ga-ahụ ihe dị ka:

```bash
zebra-8233: provider-hostname.com:31234
```

Nke a bụ ọnụ gị ** njedebe P2P ọha. Ọnụ ndị ọzọ Zcash ga-ejikọ gị na adreesị a.

**Note the port mapping:** You configured port 8233 in the SDL, but Akash assigned it to a different public port (31234 in this example). This is normal - see the "Port Mapping on Akash" section at the top if this confuses you. Your node is accessible at whatever port Akash shows here, not necessarily 8233.

If you enabled RPC (commented out by default in the SDL), you'll also see the RPC endpoint here with its own mapped port.

### Nhọrọ nhazi

#### Ịgbanwee gaa na Testnet

SDL bụ ndabara na Mainnet. Iji jiri Testnet kama:

-> **Kọwaa Mainnet config** na ngalaba *env*:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Uncomment Testnet config**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
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

-> ** Nhọrọ: Belata ihe onwunwe** maka Testnet na *profiles.compute.zebra.resources*:

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

#### Kwado RPC Access

A na-agbanyụ RPC site na ndabara maka nchekwa. Iji mee ya:

** Maka Mainnet:**

-> Uncomment na ngalaba * env *:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Uncomment na Mainnet RPC n'ọdụ ụgbọ mmiri na * kpughere *:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

** Maka Testnet:**

-> Uncomment na ngalaba * env *:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Uncomment Testnet RPC n'ọdụ ụgbọ mmiri na * kpughere *:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Warning**: If you set *global: true* for RPC, you're exposing it to the internet. Zebra uses cookie auth by default, but still - don't do this unless you know what you're doing.

**Port mapping reminder**: Even if you expose RPC globally, Akash will map it to a random high port (not 8232/18232). Check the URIs in your deployment to see the actual public endpoint. For *global: false* (recommended), the RPC endpoint is only accessible within the Akash deployment network, not from the public internet.

#### Kwado Metrics (Prometheus)

Iji kpochapụ metrics maka nlekota:

-> Uncomment na * env *:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Uncomment metrics n'ọdụ ụgbọ mmiri na * kpughere *:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Gbanwee ihe onwunwe/ọnụahịa

Ọ bụrụ na ị naghị enweta ọnụ ahịa ma ọ bụ chọọ ịkwalite ọnụahịa:

** Maka ndị na-enye ọrụ dị ala**, belata na ngalaba *profiles.compute.zebra.resources*:

-> CPU: *units: 2* (nke kacha nta maka ezi uche sync ọsọ)

-> Ebe nchekwa: * nha: 12Gi * (nke kacha nta maka nkwụsi ike)

-> Nchekwa: * size: 120Gi * (nke kacha nta maka mainnet)

** Iji dọta ọnụ ahịa ndị ọzọ **, mụbaa na *profiles.placement.akash.pricing*:

-> Mainnet: Gbalịa *ego: 1000000* uakt/block

-> Testnet: Gbalịa *ego: 1000000* uakt/block

### Ịmelite Ntinye Aka Gị

Mkpa ịgbanwe nhazi mgbe e deployed?

-> Gaa na ** My Deployments ** na Console

-> Chọta Zebra gị

-> Pịa **"Mgbanwe Mmelite"**

-> Dezie SDL

-> Pịa **"Mmelite"** ma kwado na Keplr

**Cheta**: Imelite ga-amaliteghachi akpa gị. Akụkụ ahụ ga-ebido site na ọnọdụ echekwara ya (nchekwa na-adịgide adịgide), ma na-atụ anya 1-2 nkeji nke nkwụsị.

### Nlekota

#### Site na Console

-> **Logs tab**: Live container logs

-> **Shell tab**: Nweta shei n'ime akpa (bara uru maka debugging)

-> ** Ihe omume tab **: Ihe omume Kubernetes (ọ na-abaghị uru ọ gwụla ma ihe mebiri emebi)


#### Site na RPC (ma ọ bụrụ na enyere ya)

Ọ bụrụ na ị kwadoro RPC, ị nwere ike ịjụ ọnụ gị dị ka ọnụ zuru oke zebrad (n'ihi na ọ bụ!)

### Ịkwụsị Ọrụ Gị

Mgbe i mechara maọbụ chọọ ịkwụsị ịkwụ ụgwọ:

-> Gaa na ** My Deployments **

-> Chọta Zebra gị

-> Pịa **"Mechie Ntinye"**

-> Kwado ma banye na Keplr

Your 5 AKT deposit will be refunded. **Persistent storage** should be preserved by the provider, but don't rely on it - treat it like any other cloud provider.

### Nchọpụta nsogbu

#### Njehie "ego ezughi oke"

Ị chọkwuru AKT. Weta ego n'akpa Keplr gị.

#### Enweghị ọnụahịa na-egosi

Ma ọ bụ:

-> Ọnụahịa gị dị oke ala (mụbaa *ego* na SDL)

-> Ihe ndị ị chọrọ maka ihe onwunwe dị oke elu maka ndị na-eweta ọrụ (belata CPU / ebe nchekwa / nchekwa)

-> Chere ogologo oge (mgbe ụfọdụ ọ na-ewe 60-90 sekọnd maka ọnụahịa ịpụta)


#### Ntinye na "na-echere"

Onye na-enye ọrụ nwere ike ịnwe nsogbu. Mechie nkesa ma nwalee onye na-eweta ọrụ ọzọ.

#### Ihe ndekọ Zebra na-egosi "Ọ dịghị ndị ọgbọ jikọtara"

This is normal for the first few minutes. Zebra will discover peers automatically. If it persists after 10+ minutes, you might have a networking issue (unlikely on Akash).

#### Njehie "N'ime ebe nchekwa" na ndekọ

I jirila RAM dị ọnụ ala. Mechie nkesa ma weghachite ma ọ dịkarịa ala 12Gi ebe nchekwa (16Gi na-atụ aro).

#### Mmekọrịta na-ewe ogologo oge

Kọwaa "ruo mgbe ebighị ebi":

-> ** Oge awa **: Ọ dị mma

-> **Days**: Ọ dịkwa mma maka mainnet site na ncha

-> **Izu**: Ihe adịghị mma, lelee ndekọ maka njehie


### Njikwa ego

Nyochaa mmefu gị na Console:

-> ** My Deployments ** -> Your deployment -> Na-egosi "Ego kwa ọnwa" atụmatụ

-> Akaụntụ Keplr gị ga-ebelata ka oge na-aga


Mgbe nguzo gị na-agwụ, Akash ga-emechi ntinye gị. ** Tinye obere akpa gị oge niile ** ma ọ bụ melite ọkwa.

#### Ibelata Ụgwọ Ndị A Na-akwụ

-> **Jiri Testnet** maka ule na-abụghị nke mmepụta (50% dị ọnụ ala)

-> ** Obere CPU / ebe nchekwa ** ma ọ bụrụ na ịchọghị ngwa ngwa

-> **Họrọ ndị na-eweta ego dị ọnụ ala** (ọ bụghị mgbe niile ka ọ dị mma - ihe gbasara oge)


### Mainnet vs Testnet

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

Malite na Testnet ma ọ bụrụ na ị na-anwale usoro ntinye. Lee "Switching to Testnet" ngalaba n'elu maka nhazi.

### Ihe Ndị Ọzọ A Na-enweta

**Akash Console**: [Onye na-eme ihe nkiri]https://console.akash.network](https://console.akash.network)

**Akash Docs**:https://akash.network/docs/](https://akash.network/docs/)

** Zebra Docs **:https://zebra.zfnd.org/](https://zebra.zfnd.org/)

** Ndị na-enyocha Zcash **: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Agha**: [https://discord.akash.network](https://discord.akash.network) (maka nsogbu ndị na-eweta ọrụ)

