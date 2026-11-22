# Otu esi agba Zebra na Akash Network

Ntuziaka nzọụkwụ-site-nzọụkwụ maka ibuga full node Zebra Zcash na Akash.

### Ihe Ị Na-ebuga

full node Zebra nke ga-eme:

-> Mmekọrịta blockchain Zcash dum (100GB+ maka mainnet, ~40GB maka testnet)

-> Na-efu ihe dị ka $15/ọnwa dabere na ọnụahịa token AKT

-> Were ọtụtụ awa ruo ụbọchị iji mee mmekọrịta zuru ezu

-> Jiri 4 vCPU, RAM 16GB, nchekwa 350GB (mainnet) ma ọ bụ 2 vCPU, RAM 8GB, 50GB (testnet)


Ụdị awesome-akash na-arapara ugbu a na **Zebra 7.0.0** (ọ bụghị `:latest`). Ọ na-eme ka Prometheus (`9999`) na ahụike (`8080`) rụọ ọrụ n'ime ime, JSON-RPC n'ime ime maka **lightwalletd** dị n'otu ebe na gRPC **9067**, yana ọkọlọtọ njirimara `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`.

Maka node Mainnet e bepụrụ ka ọ dị ngwa karịa, lee [Otu esi arụ ọrụ Zakura na Akash](/guides/akash-network-zakura). Maka dashboard Regtest a ga-atụfu, lee [Otú a ka Zakura kwuru na Akash](/guides/thus-spoke-zakura-akash).

### Otu Akash si ebipụta ọdụ ụgbọ mmiri

Nọmba ndị dị na SDL (`port` / `as`) bụ **ọdụ ụgbọ mmiri akpa**. Zebra ka na-ege ntị na **8233**, lightwalletd na **9067**, ebe nlele ahụike na **8080**. Nọmba ndị a bụ maka usoro ahụ na ọrụ ndị ọzọ nọ n’otu deployment (`zebra:8232`).

Ha **abụghị** ọdụ ụgbọ mmiri dị na IP ọha onye na-eweta ọrụ.

**Nke ndabara (ndebiri a):** enweghị IP pụrụ iche. Maka ikpughe TCP `global: true` ọ bụla, onye na-eweta ọrụ na-ejikọta **ọdụ ụgbọ mmiri dị elu nke a họpụtara na mberede** dị n’otu host ọtụtụ mmadụ na-ekerịta na ọdụ ụgbọ mmiri container gị. Mgbe oge mgbazinye gwụrụ, Console/Air **Leases → URIs** na-edepụta ebe njedebe ndị ahụ n’ezie, dịka ọmụmaatụ:

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Ndị ọgbọ na e-akpa ego na-eji **uru host:port ndị ahụ**. Detuo URI nke expose ị chọrọ (P2P vs lightwalletd). Ọ bụrụ na ị tọọ `ZEBRA_NETWORK__EXTERNAL_ADDR`, tọọ ya ka ọ bụrụ URI P2P nke e mapịrị (`provider.example:31482`), ọ bụghị `…:8233`.

**HTTP** (`as: 80` na `http_options`, nke a na-eji na dashboard Thus Spoke): ọtụtụ ndị na-enye ọrụ na-ebipụta **aha nnabata ingress** (ọtụtụ mgbe na 80/443) kama iji ọdụ TCP na-enweghị usoro. Mepee URI maka ọrụ ahụ na ihe nchọgharị.

**Nke dị n'ime** (`global: false` ma ọ bụ `to: service: lightwalletd`): DNS nke cluster naanị (`zebra:8232`). Enweghị URI ọha.

**IP ndị e kenyere naanị ha** (`endpoints` / `kind: ip` na SDL) bụ **ihe mgbakwunye dị oke ọnụ**. Ha nwere ike ịdo IP ọha n'otu ebe, ma mgbe ụfọdụ dozie ọdụ ụgbọ mmiri `as` dị na IP ahụ. Ụdị ndebiri ndị a anaghị arịọ maka ya. Ọ bụrụ na ịchọrọ `host:8233` kwụsiri ike, tinyekwa ya n'onwe gị ma emechaa; tụọ anya ụgwọ mgbakwunye na ndị na-enye ọrụ ole na ole ga-etinye ọnụahịa.

### Saịtị nke a ga-eji (Kwụọ ụhwọ)

SDL ahụ ka bụ otu. Web UI Akash abụọ ahụ dị iche n’ụzọ e si Kwụọ ụhwọ.

| Saịtị | Kwụọ ụhwọ | E-akpa ego |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Ịkwụ ụgwọ ọdịnala n'ịntanetị (kaadị / ụzọ ịkwụ ụgwọ fiat Console na-enye) | Akaụntụ Console |
| [air.akash.network](https://air.akash.network) | Ịkwụ ụgwọ Akash chain nke aka ya (AKT / ACT) | **Keplr** |

Jiri **Air** mgbe ịchọrọ ịkwụ ụgwọ na Keplr na chain. Jiri **Console** mgbe ịchọrọ usoro ịkwụ ụgwọ webụ nke a na-emekarị. Atụla anya ka Keplr dozie ụgwọ na Console n’ụzọ nkịtị.

### Ihe Achọrọ Tupu Ịmalite

**Ọ bụrụ na ịkwụ ụgwọ na Console (nlele ịkwụ ụgwọ na weebụ)**

1. Akaụntụ Console na [console.akash.network](https://console.akash.network)
2. Ụzọ Kwụọ ụhwọ nke Console UI na-anabata
3. Nkeji ole na ole n'ime UI

**Ọ bụrụ na ịkwụ ụgwọ na Air (nke e wuru n’ime ya Akash / Keplr)**

1. **Keplr** ndọtị ihe nchọgharị (Chrome/Brave/Firefox)
2. **AKT / ACT** dị na Keplr maka nkwụnye ego na mgbazinye (site na exchange ma ọ bụ IBC)
3. Mepee [air.akash.network](https://air.akash.network)

#### Nzọụkwụ 1: Jikọọ

**Console (ịkwụ ụgwọ web)**

-> Gaa na [https://console.akash.network](https://console.akash.network)

-> Banye / mezue usoro akaụntụ Console

Jiri checkout UI gosiri gị (ọ bụghị Keplr on-chain)

**Air (Kwụọ ụhwọ Akash nke ala ya)**

-> Gaa na [https://air.akash.network](https://air.akash.network)

-> Pịa **"Jikọọ e-akpa ego"**

-> Họrọ **Keplr** ma kwado njikọ ahụ

-> Kwenye na ego AKT/ACT dị na gị ezuru maka ego nkwụnye ego yana ụgwọ mgbazinye

#### Nzọụkwụ 2: Mepụta Deployment

-> Pịa **"Deploy"**

-> Họrọ **"Wuo template gị"** (ma ọ bụ gaa ozugbo n'itinye SDL)


##### Nhọrọ A: Bulite Faịlụ SDL (A Tụrụ Aro)

**Ịkwụ ụgwọ na Web (Console)**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Kwụọ ụhwọ nke Akash sitere na ya na Keplr (Air)**

[Mepee ndebiri a na Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Nhọrọ B: Jiri SDL Editor

Ọ bụrụ na ịchọrọ iji aka mado [SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Detuo ọdịnaya nke *zebra-akash.yml*

-> Mado ya n'ime SDL editor

-> Gbanwee dịka ọ dị mkpa (lee ngalaba nhazi dị n'okpuru)

-> Pịa **"Mepụta Deployment"**


#### Nzọụkwụ 3: Nyochaa ma Kwado Deposit

UI ga-egosi gị:

-> **Deposit deployment**: ~5 AKT (ị ga-enwetaghachi nke a mgbe ị mechiri deployment)

-> **Ọnụ ego e mere atụmatụ**: Dabere na ọnụahịa SDL gị

Na **Air**, pịa **"Kwado"** wee banye **Keplr**. Na **Console**, mezue ịkwụ ụgwọ na web dịka UI gosiri.

#### Nzọụkwụ 4: Họrọ Onye Na-eweta Ọrụ

Mgbe ihe dị ka sekọnd 30 gachara, ị ga-ahụ bid sitere n'aka ndị na-eweta ọrụ. Bid ọ bụla na-egosi:

-> **Ọnụahịa kwa block** (na AKT ma ọ bụ USDC)

-> **Ọnụ ego a tụrụ anya kwa ọnwa**

-> **Nkọwa onye na-eweta ọrụ** (oge ọ na-arụ ọrụ, mpaghara, wdg.)


**Ekwela ka ị họrọ naanị nke dị ọnụ ala karịa.** Lelee:

-> % oge ọ na-arụ ọrụ (gbalịa ka ọ karịrị 95%)

-> Mpaghara (nke dị gị nso = latency ka mma, mana ọ naghị emetụta node blockchain nke ukwuu)

-> Ọnọdụ enyochara (akara nlele ndụ ndụ = ntụkwasị obi ka ukwuu)


Pịa **"Nabata onyinye"** na ndị na-eweta ọrụ ị họọrọ. Na Air, banye Keplr. Na Console, jiri usoro ịkwụ ụgwọ webụ gosi nkwenye.

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

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

Ahịrị nke ọ bụla bụ otu `global: true` ekpughere. Aha ahụ gụnyere ọdụ ụgbọ mmiri SDL `as` (8233, 9067). Nọmba dị n’azụ aha nnabata bụ **ọdụ ụgbọ mmiri onye na-eweta ọrụ mapụtara**, nke a na-ekenye n’oge mgbazinye. Node Zcash ndị ọzọ na-akpọ `provider-hostname.com:31482`. E-akpa ego kọmpat na-eji URI lightwalletd (TLS agbanyụghị ya ma ọ bụrụ na unu ejighị aka unu mechie TLS).

Akpa ahụ ka na-ege ntị na 8233 / 9067. Adreesị ọha bụ URI mgbe niile, ma ọ bụrụ na ị tinyeghị IP pụrụ iche ma emechaa (nke adịghị na ndebiri a).

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

Ọ bụrụ na i jiri `global: true` kpughee RPC, adreesị ọha ka bụ **lease URI** (`host:&lt;random-high-port&gt;`), ọ bụghị `host:8232`. Site na `global: false` (ndezi a), RPC na-anọgide na network mbunye (`zebra:8232` maka lightwalletd). Mgbazinye IP pụrụ iche bụ nhọrọ a na-akwụ ụgwọ iche, ọ dịghịkwa na SDL.

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

-> Pịa **"Melite"** (Air: banye na Keplr; Console: kwenye usoro ịkwụ ụgwọ weebụ)

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

-> Kwenye (Air: banye na Keplr; Console: kwenye na UI Console)

A ga-eweghachite deposit AKT 5 gị. **Nchekwa na-adịgide adịgide** kwesịrị ka onye na-eweta ọrụ chekwaa ya, mana atụkwasịla ya obi - were ya dịka onye na-eweta cloud ọ bụla ọzọ.

### Idozi Nsogbu

#### Njehie "Insufficient funds"

N'On Air, tinye ego na Keplr site na AKT/ACT. Na Console, jiri Ntinye ego tinye ego na ụzọ Kwụọ ụhwọ Console.

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

Soro mmefu ego unu na Console ma ọ bụ Air:

-> **My Deployments** -> Deployment gị -> Na-egosi atụmatụ "Cost per month"

-> Ikuku: nguzozi AKT/ACT gị Keplr na-ebelata ka oge na-aga. Console: nguzozi Kwụọ ụhwọ gị na Console na-ebelata.

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

**Console Akash** (ịkwụ ụgwọ na webụ): [https://console.akash.network](https://console.akash.network)

**Akash Air** (AKT/ACT nke ala + Keplr): [https://air.akash.network](https://air.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Docs Zebra**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Explorers Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (maka nsogbu onye na-eweta ọrụ)
