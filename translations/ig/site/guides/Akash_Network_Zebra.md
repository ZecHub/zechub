# Otu esi agba Zebra na Akash Network

Ntuziaka nzọụkwụ-site-nzọụkwụ maka ibuga full node Zebra Zcash site n'iji [Akash Console](https://console.akash.network).

### Ihe Ị Na-ebuga

full node Zebra nke ga-eme:

-> Mmekọrịta blockchain Zcash dum (100GB+ maka mainnet, ~40GB maka testnet)

-> Na-efu ihe dị ka $15/ọnwa dabere na ọnụahịa token AKT

-> Were ọtụtụ awa ruo ụbọchị iji mee mmekọrịta zuru ezu

-> Jiri 4 vCPU, RAM 16GB, nchekwa 350GB (mainnet) ma ọ bụ 2 vCPU, RAM 8GB, 50GB (testnet)


### Ihe Dị Mkpa: Nkụnye ọdụ ụgbọ mmiri na Akash

Mgbe ị kpughere ọdụ ụgbọ mmiri na Akash (dịka ọmụmaatụ, ọdụ 8233 maka Zebra P2P), ọ **NAGHỊ ejikọta na kpọmkwem ọdụ ahụ** na IP ọha nke onye na-eweta ọrụ. Kama nke ahụ, onye na-eweta ọrụ na-ekenye ọdụ dị elu na-enweghị usoro (dịka 31234 ma ọ bụ 42567) wee jiri reverse-proxy jikọta ya na ọdụ 8233 nke container gị.

E mere nke a kpọmkwem otú ahụ - ndị na-eweta ọrụ na-agba ọtụtụ deployment, ha ga-enwe esemokwu ma ọ bụrụ na onye ọ bụla nwaa iji ọdụ 8233 ozugbo.

**Ihe nke a pụtara nye gị:**

-> Ị na-ahazi ọdụ 8233 na SDL (ọdụ P2P ọkọlọtọ nke Zebra)

-> Akash na-enye gị URI dịka *provider.com:31234*

-> node Zcash ndị ọzọ na-ejikọta gị na *provider.com:31234*

-> N'ime container gị, Zebra ka na-ege ntị na 8233


A na-ahazi nke a na-akpaghị aka. Naanị jiri URI Akash nyere gị.

### Ihe Achọrọ Tupu Ịmalite

1. Etinyela mgbatị ihe nchọgharị **Keplr Wallet** (Chrome/Brave/Firefox)
2. **token AKT** - Nweta AKT 50-100 site na exchange (Coinbase, Kraken, Osmosis)
3. **Nkeji 5** iji pịa site na UI Console

#### Nzọụkwụ 1: Jikọọ e-akpa ego Gị

-> Gaa na [https://console.akash.network](https://console.akash.network)

-> Pịa **"Jikọọ e-akpa ego"** n'elu aka nri

-> Họrọ **Keplr** (ma ọ bụ e-akpa ego Cosmos masịrị gị)

-> Kwado njikọ ahụ mgbe Keplr pụtara


Nha AKT gị kwesịrị ịpụta n'elu aka nri. Ọ bụrụ na ọ bụ efu, buru ụzọ tinye ego n'e-akpa ego gị.

#### Nzọụkwụ 2: Mepụta Deployment

-> Pịa bọtịnụ **"Deploy"** (nnukwu bọtịnụ anụnụ, n'etiti ibe)

-> Họrọ **"Wuo template gị"** (ma ọ bụ gaa ozugbo n'itinye SDL)


##### Nhọrọ A: Bulite Faịlụ SDL (A Tụrụ Aro)

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Nhọrọ B: Jiri SDL Editor

Ọ bụrụ na ịchọrọ iji aka mado [SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Detuo ọdịnaya nke *zebra-akash.yml*

-> Mado ya n'ime SDL editor

-> Gbanwee dịka ọ dị mkpa (lee ngalaba nhazi dị n'okpuru)

-> Pịa **"Mepụta Deployment"**


#### Nzọụkwụ 3: Nyochaa ma Kwado Deposit

Console ga-egosi gị:

-> **Deposit deployment**: ~5 AKT (ị ga-enwetaghachi nke a mgbe ị mechiri deployment)

-> **Ọnụ ego e mere atụmatụ**: Dabere na ọnụahịa SDL gị

Pịa **"Kwado"** wee bịanye aka na Azụmahia ahụ na Keplr.

#### Nzọụkwụ 4: Họrọ Onye Na-eweta Ọrụ

Mgbe ihe dị ka sekọnd 30 gachara, ị ga-ahụ bid sitere n'aka ndị na-eweta ọrụ. Bid ọ bụla na-egosi:

-> **Ọnụahịa kwa block** (na AKT ma ọ bụ USDC)

-> **Ọnụ ego a tụrụ anya kwa ọnwa**

-> **Nkọwa onye na-eweta ọrụ** (oge ọ na-arụ ọrụ, mpaghara, wdg.)


**Ekwela ka ị họrọ naanị nke dị ọnụ ala karịa.** Lelee:

-> % oge ọ na-arụ ọrụ (gbalịa ka ọ karịrị 95%)

-> Mpaghara (nke dị gị nso = latency ka mma, mana ọ naghị emetụta node blockchain nke ukwuu)

-> Ọnọdụ enyochara (akara nlele ndụ ndụ = ntụkwasị obi ka ukwuu)


Pịa **"Nabata Bid"** n'aka onye na-eweta ọrụ ị họọrọ wee bịanye aka na Keplr.

#### Nzọụkwụ 5: Chere Ka Deployment Gaa N'ihu

Console ga-eme:

-> Mepụta lease na onye na-eweta ọrụ ị họọrọ

-> Zipu manifest (ọ na-agwa onye na-eweta ọrụ ihe ọ ga-agba)

-> Malite container gị

Nke a na-ewe nkeji 1-2. Ị ga-ahụ mmelite ọnọdụ na UI.

#### Nzọụkwụ 6: Nyochaa Na Ọ Na-agba

Ozugbo e bugara ya, ị ga-ahụ:

-> Taabụ **Services**: Na-egosi ọrụ *zebra* gị na ọnọdụ ya

-> Taabụ **Logs**: Log container dị ndụ

-> Taabụ **Leases**: Nkọwa gbasara deployment gị (DSEQ, onye na-eweta ọrụ, ọnụ ego)


##### Lelee Logs

Pịa **Logs** ma ị kwesịrị ịhụ Zebra ka ọ na-amalite:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Mmekọrịta ahụ ga-ewe **awa ruo ụbọchị** dabere na netwọk. Lelee maka:

-> Ogologo block na-abawanye

-> Njikọ peer (kwesịrị ịbụ peer 10-30)

-> Enweghị njehie na-eme ugboro ugboro


#### Nzọụkwụ 7: Nweta Adreesị akpa ego node Gị

Pịa taabụ **Leases**, wee pịa **URIs**.

Ị ga-ahụ ihe dịka:

```bash
zebra-8233: provider-hostname.com:31234
```

Nke a bụ **endpoint P2P ọha** nke node gị. node Zcash ndị ọzọ ga-ejikọta gị na Adreesị akpa ego a.

**Rịba ama nkụnye ọdụ ụgbọ mmiri:** Ị haziri ọdụ 8233 na SDL, mana Akash kenyere ya ọdụ ọha ọzọ (31234 na ihe atụ a). Nke a bụ ihe nkịtị - lee ngalaba "Nkụnye ọdụ ụgbọ mmiri na Akash" dị n'elu ma ọ bụrụ na nke a agbagwoju gị anya. A na-enweta node gị na ọdụ ọ bụla Akash gosiri ebe a, ọ bụghị n'ezie 8233.

Ọ bụrụ na ị kwadoro RPC (a kpọchiri ya na mbụ na SDL), ị ga-ahụkwa endpoint RPC ebe a yana ọdụ ekenyere ya.

### Nhọrọ Nhazi

#### Ịgbanwe gaa na Testnet

SDL na-eji Mainnet dị ka ndabara. Iji jiri Testnet kama:

-> **Kwụsị Mainnet config** na ngalaba *env*:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Wepụ akara nkwụsị na Testnet config**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> **Melite ọdụ a kpughere** na ngalaba *expose*:

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

-> **Nhọrọ: Belata akụrụngwa** maka Testnet na *profiles.compute.zebra.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Nhọrọ: Wedata ọnụahịa** na *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### Kwado Nnweta RPC

A kwụsịrị RPC na ndabara maka nchekwa. Iji kwado ya:

**Maka Mainnet:**

-> Wepụ akara nkwụsị na ngalaba *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Wepụ akara nkwụsị na ọdụ RPC Mainnet na *expose*:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Maka Testnet:**

-> Wepụ akara nkwụsị na ngalaba *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Wepụ akara nkwụsị na ọdụ RPC Testnet na *expose*:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Ịdọ aka ná ntị**: Ọ bụrụ na ị tọọ *global: true* maka RPC, ị na-ekpughe ya n'ịntanetị. Zebra na-eji cookie auth na ndabara, mana ka o sina dị - emela nke a ma ọ bụrụ na ị maghị ihe ị na-eme.

**Nchetara nkụnye ọdụ ụgbọ mmiri**: Ọbụna ma ọ bụrụ na ị kpughere RPC n'ụwa niile, Akash ga-akụnye ya na ọdụ dị elu na-enweghị usoro (ọ bụghị 8232/18232). Lelee URIs na deployment gị iji hụ endpoint ọha n'ezie. Maka *global: false* (a tụrụ aro), endpoint RPC na-adị naanị n'ime netwọk deployment Akash, ọ bụghị site n'ịntanetị ọha.

#### Kwado Metrics (Prometheus)

Iji nakọta metrics maka nlekota:

-> Wepụ akara nkwụsị na *env*:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Wepụ akara nkwụsị na ọdụ metrics na *expose*:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Gbanwee Akụrụngwa/Ọnụahịa

Ọ bụrụ na ị naghị enweta bid ma ọ bụ ịchọrọ ibelata ọnụ ego:

**Maka ndị na-eweta ọrụ nwere nkọwa ala**, belata na ngalaba *profiles.compute.zebra.resources*:

-> CPU: *units: 2* (opekata mpe maka ọsọ mmekọrịta ezi uche dị na ya)

-> Memory: *size: 12Gi* (opekata mpe maka ịdị n'otu)

-> Storage: *size: 120Gi* (opekata mpe maka mainnet)

**Iji dọta bid ndị ọzọ**, bawanye na *profiles.placement.akash.pricing*:

-> Mainnet: Nwaa *amount: 1000000* uakt/block

-> Testnet: Nwaa *amount: 1000000* uakt/block

### Imelite Deployment Gị

Ị chọrọ ịgbanwe nhazi mgbe ibugara ya?

-> Gaa na **My Deployments** na Console

-> Chọta deployment Zebra gị

-> Pịa **"Update Deployment"**

-> Dezie SDL

-> Pịa **"Update"** wee kwado na Keplr

**Rịba ama**: Imelite ga-amaliteghachi container gị. node ga-aga n'ihu site n'ọnọdụ echekwara ya (nchekwa na-adịgide adịgide), mana tụrụ anya nkeji 1-2 nke downtime.

### Nlekota

#### Site na Console

-> **Taabụ Logs**: Log container dị ndụ

-> **Taabụ Shell**: Nweta shell n'ime container (bara uru maka debugging)

-> **Taabụ Events**: Ihe omume Kubernetes (ọtụtụ anaghị aba uru ma ọ bụrụ na ihe emebighị)


#### Site na RPC (ọ bụrụ na akwadoro)

Ọ bụrụ na ị kwadoro RPC, ị nwere ike ịjụ node gị dịka full node zebrad nkịtị (n'ihi na ọ bụ otu!)

### Imechi Deployment Gị

Mgbe ị mechara ma ọ bụ chọọ ịkwụsị ịkwụ ụgwọ:

-> Gaa na **My Deployments**

-> Chọta deployment Zebra gị

-> Pịa **"Close Deployment"**

-> Kwenye wee bịanye aka na Keplr

A ga-eweghachite deposit AKT 5 gị. **Nchekwa na-adịgide adịgide** kwesịrị ka onye na-eweta ọrụ chekwaa ya, mana atụkwasịla ya obi - were ya dịka onye na-eweta cloud ọ bụla ọzọ.

### Idozi Nsogbu

#### Njehie "Insufficient funds"

Ị chọrọ AKT ọzọ. Tinye ego n'e-akpa ego Keplr gị.

#### Enweghị bid na-apụta

Ma ọ bụ:

-> Ọnụahịa gị dị ala nke ukwuu (bawanye *amount* na SDL)

-> Ihe akụrụngwa ị chọrọ dị elu nke ukwuu maka ndị na-eweta ọrụ dị (belata CPU/memory/storage)

-> Chere ogologo oge (mgbe ụfọdụ ọ na-ewe sekọnd 60-90 ka bid pụta)


#### Deployment rapaara na "pending"

Onye na-eweta ọrụ nwere ike inwe nsogbu. Mechie deployment ahụ wee nwaa onye na-eweta ọrụ ọzọ.

#### Log Zebra na-egosi "No peers connected"

Nke a bụ ihe nkịtị n'ime nkeji ole na ole mbụ. Zebra ga-achọpụta peer na-akpaghị aka. Ọ bụrụ na ọ gaa n'ihu mgbe nkeji 10+ gachara, ị nwere ike inwe nsogbu netwọk (nke na-adịkarịghị na Akash).

#### Njehie "Out of memory" na log

Ị chekwara ego nke ukwuu na RAM. Mechie deployment ahụ wee bugharịa ọzọ jiri ma ọ dịkarịa ala memory 12Gi (a tụrụ aro 16Gi).

#### Mmekọrịta na-ewe ogologo oge

Kọwaa "ogologo oge":

-> **Awa**: Nkịtị

-> **Ụbọchị**: Ọzọkwa nkịtị maka mainnet site na mmalite

-> **Izu**: Ihe adịghị mma, lelee log maka njehie


### Njikwa Ọnụ Ego

Lelee mmefu gị na Console:

-> **My Deployments** -> Deployment gị -> Na-egosi atụmatụ "Cost per month"

-> Nha e-akpa ego Keplr gị ga-ebelata ka oge na-aga


Mgbe nha gị belatara, Akash ga-emechi deployment gị na-akpaghị aka. **Na-etinye ego n'e-akpa ego gị mgbe ụfọdụ** ma ọ bụ hazie alerts.

#### Ibelata Ọnụ Ego

-> **Jiri Testnet** maka nnwale na-abụghị mmepụta (50% dị ọnụ ala)

-> **Belata CPU/memory** ma ọ bụrụ na ị chọghị mmekọrịta ngwa ngwa

-> **Họrọ ndị na-eweta ọrụ dị ọnụ ala** (ọ bụghị mgbe niile ihe amamihe dị na ya - oge ọ na-arụ ọrụ dị mkpa)


### Mainnet megide Testnet

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

Malite na Testnet ma ọ bụrụ na ị na-anwale naanị usoro deployment. Lee ngalaba "Ịgbanwe gaa na Testnet" dị n'elu maka nhazi.

### Akụrụngwa Ndị Ọzọ

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Docs Zebra**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Explorers Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (maka nsogbu onye na-eweta ọrụ)
