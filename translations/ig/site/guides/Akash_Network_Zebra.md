# Esi agba ọsọ Zebra na Akash Network

Ntuziaka nzọụkwụ site na ntinye maka ikesa Zebra Zcash zuru oke iji jiri ya mee ihe. [Akash Console (Nke a na-akpọ)](https://console.akash.network).

### Ihe Ị Na-eme Ka Ọ Dị Mkpa

Nọmba Zebra zuru ezu nke ga-eme:

-> Mmekọrịta dum Zcash blockchain (100GB+ maka mainnet, ~40GB maka testnet)

-> Ọnụ ego ruru $ 15 / ọnwa dabere na ọnụahịa akara ngosi AKT.

-> Were ọtụtụ awa ruo ụbọchị iji mekọrịta kpamkpam

-> Jiri 4 vCPUs, 16GB RAM, 350GB nchekwa (mainnet) ma ọ bụ 2 vCPU, 8GB RAM , 50GB (testnet)


### Ihe dị mkpa: Ịkọpụta ọdụ ụgbọ mmiri na Akash

When you expose a port on Akash (e.g., port 8233 for Zebra P2P), it **does NOT bind to that exact port** on the provider's public IP. Instead, the provider assigns a random high port (like 31234 or 42567) and reverse-proxies it to your container's port 8233.

This is by design - providers run multiple deployments, and they'd have conflicts if everyone tried to use port 8233 directly.

** Ihe nke a pụtara nye gị:**

-> Ị hazie ọdụ ụgbọ mmiri 8233 na SDL (Zebra si ọkọlọtọ P2P n'ọdụ ụgbọ mmiri)

-> Akash na-enye gị URI dị ka *provider.com:31234*

-> Ndị ọzọ Zcash nodes jikọọ gị na * provider.com:31234*

-> N'ime akpa gị, Zebra ka na-ege ntị n'igwe 8233


A na-edozi nke a n'onwe ya. Jiri URI Akash nyere gị mee ihe.

### Ihe ndị a chọrọ iji mee ya bụ:

1. **Keplr Wallet** ihe nchọgharị mgbakwunye arụnyere (Chrome/Brave/Firefox)
2. ** AKT tokens** - Nweta 50-100 AKT site na mgbanwe (Coinbase, Kraken, Osmosis)
3. **Minute 5** iji pịa site na UI Njikwa

#### Nzọụkwụ 1: Jikọọ obere akpa gị

-> Go to [https://console.akash.network](https://console.akash.network)

-> Pịa **"Jikọọ obere akpa ego"** n'elu aka nri.

-> Họrọ ** Keplr** (ma ọ bụ obere akpa Cosmos gị kachasị mma)

-> Kwado njikọ ahụ mgbe Keplr gbapụta


AKT gị kwesịrị ịpụta n'elu aka nri. Ọ bụrụ na ọ bụ efu, buru ụzọ tinye ego gị n'akpa uwe.

#### Nzọụkwụ 2: Mepụta Ntinye aka

-> Pịa **"Deploy"** bọtịnụ (nnukwu acha anụnụ anụnụ button, center nke page)

-> Họrọ ** "Mee ndebiri gị"** (ma ọ bụ wepu ozugbo na-ebugote SDL)


##### Nhọrọ A: Bulite SDL File (Atụ aro)

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Nhọrọ B: Jiri SDL Editor

Ọ bụrụ na ịchọrọ iji aka tinye ya [SDL ahụ.](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Detuo ọdịnaya nke *zebra-akash.yml*

-> Tinye na SDL nchịkọta akụkọ

-> Gbanwee dị ka mkpa (lee nhazi ngalaba n'okpuru)

-> Pịa **"Mepụta Ntinye aka"**


#### Nzọụkwụ 3: Nyochaa ma kwado nkwụnye ego ahụ .

Ihe ngosi ga-egosi gị:

-> **Nkwụnye ego ntinye**: ~ 5 AKT (ị ga-enweta nke a mgbe ị mechiri nkenye ọnọdụ)

-> **Echere na ọnụahịa**: Dabere na gị SDL ịnye ọnụahịa.

Pịa **"Kweere"** ma debanye azụmahịa ahụ na Keplr.

#### Nke Anọ: Họrọ Onye Ga-enye Gị Ihe Ndị Na-akpa Mkpa n'Ụlọ Unu

Mgbe ~ 30 sekọnd, ị ga-ahụ ọnụahịa site n'aka ndị na enye ọrụ. Ọnụ ego ọ bụla gosipụtara:

-> ** Ọnụahịa kwa ngọngọ** (na AKT ma ọ bụ USDC)

-> **Atụmatụ ego a na-akwụ kwa ọnwa**

-> **Nkọwa nke onye na-enye ọrụ** (oge oge, mpaghara, wdg.)


**Adịla na-ahọrọ ndị dị ọnụ ala.** Lelee:

-> Oge % (gbalịa maka > 95%)

-> Mpaghara (dị nso na gị = oge dị mma, ma ọ dịghị mkpa maka ọnụ ọgụgụ nke blockchain)

-> Ọnọdụ nyocha (akara ahịhịa ndụ = ntụkwasị obi karịa)


Pịa **"Nabata Onyinye ahụ"** na onye ọrụ ị họọrọ ma banye Keplr.

#### Nzọụkwụ 5: Chere maka nkenye ọnọdụ

Ihe njikwa ga:

-> Mepụta nkwekọrịta mgbazinye na onye ọrụ ị họọrọ

-> Zipu ihe ngosi (na-agwa onye na-enye ọrụ ihe ị ga - agba ọsọ)

-> Malite akpa gị

Nke a na-ewe 1-2 nkeji. Ị ga-ahụ mmelite ọnọdụ n'ime UI.

#### Nzọụkwụ 6: Nyochaa Ọ Na-agba ọsọ

Ozugbo e depụtara ya, ị ga-ahụ:

-> **Ọrụ** taabụ: Na-egosi ọrụ *zebra* gị na ọnọdụ ya.

-> ** Logs** taabụ: Live akpa logs

-> **Leases** taabụ: Nkọwa banyere gị nkenye ọnọdụ (DSEQ, na-eweta, eri)


##### Lelee Ihe Ndekọ ahụ .

Pịa na ** Logs** ma ị ga-ahụ Zebra ka ọ malitere:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Mmekọrịta ga-ewe ** awa ruo ụbọchị** dabere na netwọk. Lelee maka:

-> Ịbawanye elu nke blocks

-> Njikọ ndị ọgbọ (kwesịrị ịbụ 10-30 ibe)

-> Enweghị mmejọ ugboro ugboro


#### Nzọụkwụ 7: Nweta Adreesị Node gị

Pịa na taabụ **Leases**, mgbe ahụ **URIs**.

Ị ga-ahụ ihe dị ka:

```bash
zebra-8233: provider-hostname.com:31234
```

Nke a bụ ọnụ gị ** njedebe P2P ọha. Ọnụ ndị ọzọ Zcash ga-ejikọ gị na adreesị a.

**Note the port mapping:** You configured port 8233 in the SDL, but Akash assigned it to a different public port (31234 in this example). This is normal - see the "Port Mapping on Akash" section at the top if this confuses you. Your node is accessible at whatever port Akash shows here, not necessarily 8233.

Ọ bụrụ na ị kwadoro RPC (kwuru site na ndabara na SDL), ị ga-ahụkwa njedebe nke RPC ebe a nwere ọdụ ụgbọ mmiri ya.

### Nhọrọ nhazi

#### Ịgbanwe gaa na Testnet

SDL na-agbanye aka n'ime Mainnet. Iji jiri Testnet kama:

-> **Kọwaa Mainnet config** na ngalaba *env*:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Uncomment Testnet config**: Ihe na-eme ka ọ dị mma.

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
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

-> ** Nhọrọ: Belata ihe onwunwe** maka Testnet na *profiles.compute.zebra.resources*:

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

#### Kwado RPC Access

RPC bụ nkwarụ maka nchekwa. Iji mee ka ọ rụọ ọrụ:

** Maka Mainnet:**

-> Uncomment na ngalaba * env:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Uncomment na Mainnet RPC n'ọdụ ụgbọ mmiri * kpughere*:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

** Maka Testnet:**

-> Uncomment na ngalaba * env:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Uncomment na Testnet RPC n'ọdụ ụgbọ mmiri * kpughere*:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Ịdọ aka ná ntị**: Ọ bụrụ na ịtọlite *global: true* maka RPC, ị ga-ekpughe ya n'ịntanetị. Zebra jiri kuki auth dịka ndabara, mana ka - emela nke a ọ gwụla ma ị maara ihe ị na-eme.

** Ihe ncheta nke mapping ọdụ ụgbọ mmiri: Ọbụna ma ọ bụrụ na ị kpughere RPC n'ụwa niile, Akash ga-atụ ya gaa n'ọdụ ụgbọ elu dị elu (ọ bụghị 8232/18232). Lelee URI gị iji hụ njedebe ọha mmadụ. Maka * ụwa dum: ụgha* (akwadoro), a pụrụ ịnweta njedebe RPC naanị n'ime netwọk nkesa Akash, ọ bụghị site na ịntanetị ọhaneze.

#### Kpọgharia Metrics (Prometheus)

Iji kpochapụ metrics maka nlekota:

-> Uncomment na * env:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Uncomment metrics n'ọdụ ụgbọ mmiri na * kpughere*:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Gbanwee Akụrụngwa/Ịnye ọnụahịa

Ọ bụrụ na ị naghị enweta ọnụahịa ma ọ bụ chọọ ịkwalite ego:

** Maka ndị na-enye ọrụ dị ala**, belata ngalaba *profiles.compute.zebra.resources*:

-> CPU: *units: 2* (nke kacha nta maka ezi uche sync ọsọ)

-> Ncheta: * size: 12Gi* (nke kacha nta maka nkwụsi ike)

-> Nchekwa: * size: 120Gi* (nke kacha nta maka mainnet)

** Iji dọta ọnụ ahịa ndị ọzọ**, mụbaa na *profiles.placement.akash.pricing*:

-> Mainnet: Gbalịa * ego: 1000000* uakt/block

-> Testnet: Gbalịa * ego: 1000000* uakt/block

### Ịmelite Ntinye Aka Gị

Mkpa ịgbanwe nhazi mgbe e deployed?

-> Gaa na ** My Deployments** n'ime Njikwa

-> Chọta Zebra gị na-arụ ọrụ

-> Pịa **"Mgbanwe Mmelite"**

-> Dezie SDL ahụ

-> Pịa **"Mgbanwe"** ma kwado na Keplr

**Cheta**: Imelite ga-amaliteghachi akpa gị. Akụkụ ahụ ga - amalite site na ọnọdụ echekwara ya (nchekwa nchekwa), mana atụ anya 1-2 nkeji nke nkwụsị oge.

### Nlekota oru

#### Site na Console

-> **Logs tab**: Live container logs (ndekọ ihe ndị dị ndụ)

-> **Shell tab**: Nweta shei n'ime akpa (bara uru maka debugging)

-> **Ihe omume tab**: Ihe ndị Kubernetes (ọtụtụ na-abaghị uru ọ gwụla ma ihe mebiri)


#### Site na RPC (ma ọ bụrụ na enyere ya)

Ọ bụrụ na ị kwadoro RPC, ịnwere ike ịjụ ọnụ gị dịka ebe zuru oke zebrad (n'ihi na ọ bụ!)

### Ịkwụsị Ọrụ Gị

Mgbe ị kwụsịrị maọbụ chọọ ịkwụsị akwụ ụgwọ:

-> Gaa na ** My Deployments**

-> Chọta Zebra gị na-arụ ọrụ

-> Pịa **"Mechie Ntinye aka"**

-> Kwado ma banye na Keplr

A ga-akwụghachi gị ego nkwụnye ego AKT 5 gị. ** Nchekwa na-adịgide adịgide** kwesịrị ịchekwa onye ọrụ ahụ, mana adaberekwala ya - jiri ya dị ka ndị ọzọ na-enye igwe ojii ọ bụla.

### Nchọpụta nsogbu

#### "Ego ezughi oke" njehie.

Ị chọkwuru AKT. Zụlite akpa ego Keplr gị.

#### Enweghị ọnụ ahịa na-egosi.

Ma ọ bụ:

-> Ọnụahịa gị dị oke ala (mụbaa * ego* na SDL)

-> Ihe ndị ị chọrọ maka ihe onwunwe dị oke elu maka ndị na-enye ọrụ (belata CPU / ebe nchekwa / nchekwa)

-> Chere ogologo oge (mgbe ụfọdụ na-ewe 60-90 sekọnd maka ọnụahịa ịpụta)


#### Ntinye na "na-echere"

Onye na enye ya nwere ike inwe nsogbu. Mechie nkenye ma nwalee onye ọzọ nyere ọrụ.

#### Ihe ndekọ Zebra na-egosi "Ọ dịghị ndị ọgbọ jikọtara"

Nke a bụ ihe dị mma maka nkeji ole na ole mbụ. Zebra ga-achọpụta ndị ọgbọ ya n'onwe gị. Ọ bụrụ na ọ ka nọgidere mgbe 10+ nkeji, ị nwere ike ịnwe nsogbu netwọk (enweghị atụ na Akash).

#### Njehie "N'echeta" na ndekọ

I jirila RAM dị ọnụ ala mechie nkesa ahụ ma tinyegharịa ya na ọ dịkarịa ala 12Gi ebe nchekwa (16Gi akwadoro).

#### Nhazi na-ewe oge dị ukwuu.

Kọwaa ihe "ruo mgbe ebighị ebi" pụtara:

-> ** Oge awa**: Ọ dị mma.

-> **Days**: Ọ dịkwa mma maka mainnet site na ncha.

-> **Izu**: Ihe adịghị mma, lelee ndekọ maka njehie.


### Njikwa ego

Nyochaa mmefu gị na Console:

-> ** My Deployments** -> Your deployment -> Na-egosi "Ego kwa ọnwa" atụmatụ.

-> Nkwụnye ego Keplr gị ga-ebelata ka oge na-aga.


Mgbe ego gị gwụrụ, Akash ga-emechi nkenye gi. ** Tinye obere akpa gị oge niile** ma ọ bụ melite ọkwa.

#### Ịbelata Ụgwọ Ndị A Na-akwụ Maka Ya

-> **Jiri Testnet** maka ule na-abụghị nke mmepụta (50% dị ọnụ ala)

-> ** CPU / ebe nchekwa dị ala** ma ọ bụrụ na ịchọghị ngwa sync ọsọ ọsọ

-> **Họrọ ndị na-enye ego dị ọnụ ala** (ọ bụghị mgbe niile ka ọ maara ihe - oge ọrụ)


### Mainnet vs Testnet (Njikọ Nnọọ na Nnyocha)

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

Malite na Testnet ma ọ bụrụ naanị ị na-anwale usoro nkesa ahụ. Lee "Switching to Testnet" ngalaba dị n'elu maka nhazi.

### Ihe Ndị Ọzọ E Nwere Ike Iji Nyere Anyị Aka

**Akash Console**: Ọ bụ ihe a na-akpọ ya. [https://console.akash.network](https://console.akash.network)

** Akash Docs**: Onye na-eme ihe nkiri a bụ onye isi. [https://akash.network/docs/](https://akash.network/docs/)

** Zebra Docs**: Ọ bụ ihe na-atọ ụtọ. [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

** Ndị na-enyocha Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: Onye na-agba egwu, onye na-egwu egwú. [https://discord.akash.network](https://discord.akash.network) (maka nsogbu ndị na-enye ọrụ)

