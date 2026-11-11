# Ịnyefe zcashd na Akash site na Console

> **Agwụla ojiji. Esokwala ntuziaka a iji nyefe node ị na-achọ iji.**
>
> zcashd rutere nkwụsị Nkwụsị-Nkwado ya na-akpaghị aka na Julaị 18, 2026. Node zcashd e nyefere taa agaghị emekọrịta na njedebe chain, ya mere nnyefe ahụ na-efu ego kwa ọnwa ma ghara ịmepụta ihe ọ bụla.
>
> Nyefee **Zebra** kama: [Otu esi agba Zebra na Akash Network](/guides/akash-network-zebra), nke na-ekpuchi otu usoro Akash Console ahụ ma chọọ ihe dị ka otu ụzọ n'ụzọ atọ nke diski. Ọ bụrụ na ị na-ebufe nhazi dị adị, lee ntuziaka mbufe [zcashd gaa Zebra na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> A na-edobe ibe a dịka ndekọ akụkọ ihe mere eme nke nnyefe zcashd.

Ntuziaka maka inyefe full node zcashd Zcash (mmejuputa Electric Coin Co) site na [Akash Console](https://console.akash.network). Lee nkuzi vidio dị n'okpuru. A pụkwara ịhụ ntuziaka zuru ezu karị n'okpuru.

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


## Ihe Ị Na-enye

Full node zcashd nke ga-eme:

-> Mekọrịta blockchain Zcash dum (350GB+ maka mainnet, ~ 40GB maka testnet)

-> Na-efu ihe dị ka $15/ọnwa dabere na ọnụahịa token AKT

-> Were ọtụtụ awa ruo ụbọchị iji mekọrịta kpamkpam

-> Jiri 4 vCPU, 16GB RAM, nchekwa 350GB (mainnet) ma ọ bụ 2 vCPU, 8GB RAM, 50GB (testnet)

-> Budata paramenta kriptogafik na mbido mbụ (~ 2GB, otu ugboro)

**zcashd megide Zebra:**

-> zcashd bụ mmejuputa node Zcash mbụ nke Electric Coin Co, nke kwụsịrị kemgbe Julaị 18, 2026

-> Zebra, sitere na Zcash Foundation, bụ full node a na-eji taa

-> Naanị Zebra na-agbaso chain dị ugbu a; node zcashd enweghị ike iru njedebe

-> E-akpa ego zcashd ejirila [Zallet](/using-zcash/zallet-quick-reference-guide) dochie

-> Jiri zcashd ma ọ bụrụ na ị chọrọ ọrụ e-akpa ego ma ọ bụ API RPC pụrụ iche


### **Dị Mkpa: Nhazi Ọdụ ụgbọ mmiri na Akash**

Mgbe ị kpughere ọdụ ụgbọ mmiri na Akash (dịka ọmụmaatụ, ọdụ 8233 maka P2P zcashd), ọ **adịghị ejikọ na kpọmkwem ọdụ ahụ** na IP ọha nke onye na-eweta ya. Kama, onye na-eweta ya na-ekenye ọdụ dị elu na-enweghị usoro (dịka 31234 ma ọ bụ 42567) ma jiri reverse-proxy jikọọ ya na ọdụ 8233 nke container gị.

Nke a bụ atụmatụ e mere nke ọma - ndị na-eweta ya na-agba ọtụtụ nnyefe, ha ga-enwe esemokwu ma ọ bụrụ na onye ọ bụla anwaa iji ọdụ 8233 ozugbo.

**Ihe nke a pụtara nye gị:**

-> Ị na-ahazi ọdụ 8233 na SDL (ọdụ P2P ọkọlọtọ nke zcashd)

-> Akash na-enye gị URI dịka *provider.com:31234*

-> Node Zcash ndị ọzọ na-ejikọ na gị na *provider.com:31234*

-> N'ime container gị, zcashd ka na-ege ntị na 8233


A na-elekọta nke a na-akpaghị aka. Jiri naanị URI Akash nyere gị.

## Ihe Ndị A Chọrọ Tupu Ebidoro

-> Agbatị ihe nchọgharị **Keplr Wallet** arụnyere (Chrome/Brave/Firefox)

-> **Token AKT** - Nweta 50-100 AKT n'aka exchange (Coinbase, Kraken, Osmosis)

-> **Nkeji 5** iji pịa na UI Console


## Nzọụkwụ 1: Jikọọ E-akpa Ego Gị

-> Gaa na [https://console.akash.network](https://console.akash.network)

-> Pịa **"Connect Wallet"** n'akụkụ aka nri elu

-> Họrọ **Keplr** (ma ọ bụ e-akpa ego Cosmos ị họọrọ)

-> Kwenye njikọ ahụ mgbe Keplr pụtara


Nguzozi AKT gị kwesịrị igosi n'akụkụ aka nri elu. Ọ bụrụ na ọ bụ efu, buru ụzọ tinye ego n'ime e-akpa ego gị.

## Nzọụkwụ 2: Mepụta Nnyefe

-> Pịa bọtịnụ **"Deploy"** (nnukwu bọtịnụ anụnụ, etiti ibe)

-> Họrọ **"Build your template"** (ma ọ bụ gaa ozugbo ibugo SDL)

### Nhọrọ A: Bulite Faịlụ SDL (Akwadoro)

> **Bọtịnụ a na-enye node kwụsịrị.** Ọ na-akwụ ụgwọ site na nguzozi AKT gị maka node nke enweghị ike imekọrịta. Jiri ntuziaka [Zebra](/guides/akash-network-zebra) kama.

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Nhọrọ B: Jiri SDL Editor

Ọ bụrụ na ịchọrọ iji aka gị mado SDL:

-> Detuo ọdịnaya *zcashd-akash.yml*

-> Mado ya n'ime SDL editor

-> Gbanwee dịka ọ dị mkpa (lee ngalaba nhazi dị n'okpuru)

-> Pịa **"Create Deployment"**


## Nzọụkwụ 3: Lelee ma Kwenye Nkwụnye Ego

Console ga-egosi gị:

-> **Nkwụnye ego nnyefe**: ~ 5 AKT (ị ga-enweta nke a azụ mgbe ị mechiri nnyefe ahụ)

-> **Ọnụ ego a tụrụ anya ya**: Dabere na ọnụahịa SDL gị


Pịa **"Approve"** ma bịanye aka na Azụmahia ahụ na Keplr.

## Nzọụkwụ 4: Họrọ Onye Na-eweta

Mgbe ~ 30 sekọnd gasịrị, ị ga-ahụ bids sitere n'aka ndị na-eweta. Bid ọ bụla na-egosi:

-> **Ọnụahịa kwa block** (na AKT ma ọ bụ USDC)

-> **Ọnụ ego kwa ọnwa a tụrụ anya ya**

-> **Nkọwa onye na-eweta** (oge ọrụ, mpaghara, wdg.)


**Ahọkwala naanị nke dị ọnụ ala.** Lelee:

-> % oge ọrụ (gbaa mbọ karịrị 95%)

-> Mpaghara (nke dị gị nso = latency ka mma, ma ọ dịghị mkpa nke ukwuu maka node blockchain)

-> Ọnọdụ enyochara (akara nlele ndụ ndụ = a pụrụ ịtụkwasị obi karịa)


Pịa **"Accept Bid"** n'ebe onye na-eweta ị họọrọ nọ ma bịanye aka na Keplr.

## Nzọụkwụ 5: Chere Nnyefe

Console ga-eme:

-> Mepụta lease na onye na-eweta ị họọrọ

-> Ziga manifest (na-agwa onye na-eweta ihe ọ ga-agba)

-> Malite container gị


Nke a na-ewe nkeji 1-2. Ị ga-ahụ mmelite ọkwa na UI.

## Nzọụkwụ 6: Nyochaa na Ọ Na-agba

Ozugbo e nyefere ya, ị ga-ahụ:

-> Taabụ **Services**: Na-egosi ọrụ *zcashd* gị na ọkwa

-> Taabụ **Logs**: Log dị ndụ sitere na node zcashd gị

-> Taabụ **Leases**: Nkọwa gbasara nnyefe gị (DSEQ, onye na-eweta, ọnụ ego)


### Lelee Logs

Pịa **Logs**, ị ga-ahụ zcashd ka ọ na-amalite:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Mbido mbụ ga-ebudata zcash-params (~2GB).** Nke a bụ ọrụ otu ugboro ma were nkeji 5-10 dabere na bandwidth onye na-eweta. Mmalite ọzọ ga-amapụ nke a.

Mmekọrịta ahụ ga-ewe **ọtụtụ awa ruo ụbọchị** dabere na netwọk. Lezie anya maka:

-> Ọdị elu block na-abawanye

-> Njikọ peer (kwesịrị ịbụ peer 10-30)

-> Enweghị njehie na-emegharị


## Nzọụkwụ 7: Nweta Adreesị Node Gị

Pịa taabụ **Leases**, mesịa **URIs**.

Ị ga-ahụ ihe dịka:

```
zcashd-8233: provider-hostname.com:31234
```

Nke a bụ **ebe njedebe P2P ọha** node gị. Node Zcash ndị ọzọ ga-ejikọ na gị na Adreesị akpa ego a.

**Rịba ama nhazi ọdụ ụgbọ mmiri:** Ị haziri ọdụ 8233 na SDL, mana Akash kenyere ya ọdụ ọha dị iche (31234 n'ihe atụ a). Nke a bụ ihe nkịtị - lee ngalaba "Nhazi Ọdụ ụgbọ mmiri na Akash" dị n'elu ma ọ bụrụ na nke a na-agbagwoju gị anya. Node gị nwere ike iru na ọdụ ọ bụla Akash gosiri ebe a, ọ bụghị n'ezie 8233.

Ọ bụrụ na ị mere RPC ka ọ rụọ ọrụ (a gbanwere ya na ndabara na SDL), ị ga-ahụkwa ebe njedebe RPC ebe a, nke nwere ọdụ ya e kenyesiri.

## Nhọrọ Nhazi

### Ịgbanwe gaa na Testnet

SDL na-eji Mainnet dịka ndabara. Iji Testnet kama:

-> **Gbanwee netwọk na ngalaba *env*:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> **Melite ọdụ ekpughere** na ngalaba *expose*:

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

-> **Nhọrọ: Belata akụrụngwa** maka Testnet na *profiles.compute.zcashd.resources*:

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

> note lowering prices may filter our providers form bidding. experiement with this value, or use the provider endpiont to check if they would bid. (review provider api documentation)

### Mee Nnweta RPC Ka Ọ Rụọ Ọrụ

A na-agbanyụ RPC na ndabara maka nchekwa. Iji mee ka ọ rụọ ọrụ:

**DỊ MKPA: Tọọ nzere siri ike.** RPC zcashd na-eziga aha njirimara/password site na HTTP (ọ bụghị HTTPS). Kpughee RPC naanị ma ọ bụrụ na ị ghọtara ihe nchekwa metụtara ya.

-> Wepụ nkọwa na ngalaba *env*:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Wepụ nkọwa nke ọdụ RPC na *expose*:

   **Maka Mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Maka Testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Ịdọ aka ná ntị**: Ọ bụrụ na ị tọọ *global: true* maka RPC, ị na-ekpughe ya n'ịntanetị site na basic auth. Nke a bụ echiche ọjọọ. Jiri *global: false* ma nweta RPC site na netwọk ime Akash, ma ọ bụ hazie tunnel echekwara.

**Ncheta nhazi ọdụ ụgbọ mmiri**: Ọbụna ma ọ bụrụ na ị kpughere RPC n'ụwa niile, Akash ga-edobe ya n'ọdụ dị elu na-enweghị usoro (ọ bụghị 8232/18232). Lelee URIs na nnyefe gị iji hụ ebe njedebe ọha n'ezie. Maka *global: false* (akwadoro), ebe njedebe RPC nwere ike iru naanị n'ime netwọk nnyefe Akash, ọ bụghị site na ịntanetị ọha.

### Mee Transaction Index Ka Ọ Rụọ Ọrụ

Ndepụta Azụmahia na-enye gị ohere iji RPC jụọ Azụmahia ọ bụla site na ID ya. Ọ na-eji nchekwa karịa (~ mmụba 20%).

Wepụ nkọwa na *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Ịdọ aka ná ntị**: Ịgbanye txindex na node mekọrịtara adịworị chọrọ ịdepụta blockchain dum ọzọ, nke na-ewe ọtụtụ awa.

### Mee Insight Explorer Ka Ọ Rụọ Ọrụ

Insight Explorer na-enye ebe njedebe REST API ndị ọzọ maka data blockchain (bara uru maka ndị na-enyocha block).

Wepụ nkọwa na *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Nke a na-agbanye txindex na-akpaghị aka ma tinye usoro RPC ndị ọzọ.

### Mee Prometheus Metrics Ka Ọ Rụọ Ọrụ

Iji kpokọta metrics maka nlekota:

-> Wepụ nkọwa na *env*:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Wepụ nkọwa nke ọdụ metrics na *expose*:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Metrics ga-adị na http://yourendpoint:9969/metrics n'ụdị Prometheus.

### Gbanwee Akụrụngwa/Ọnụahịa

Ọ bụrụ na ị naghị enweta bids ma ọ bụ na ịchọrọ imezi ọnụ ego:

**Maka ndị na-eweta nwere nkọwa dị ala**, belata na ngalaba *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (opekata mpe maka ọsọ mmekọrịta kwesịrị ekwesị)

-> Ebe nchekwa: *size: 12Gi* (opekata mpe maka nkwụsi ike)

-> Nchekwa: *size: 120Gi* (opekata mpe maka mainnet)


**Iji dọta bids karịa**, bulie na *profiles.placement.akash.pricing*:

-> Mainnet: Nwaa *amount: 15000* uakt/block

-> Testnet: Nwaa *amount: 7500* uakt/block


E debere ụkpụrụ SDL n'ogo dị elu nlezianya. Ọtụtụ ndị na-eweta ga-enye bid dị ala.

## Imelite Nnyefe Gị

Ị chọrọ ịgbanwe nhazi mgbe i nyefechara?

-> Gaa na **My Deployments** na Console

-> Chọta nnyefe zcashd gị

-> Pịa **"Update Deployment"**

-> Dezie SDL

-> Pịa **"Update"** ma kwado ya na Keplr


**Rịba ama**: Imelite ga-amalite container gị ọzọ. Node ga-aga n'ihu site n'ọnọdụ echekwara ya (nchekwa na-adịgide), mana tụọ anya nkeji 1-2 nke enweghị ọrụ.

## Nlekota

### Site na Console

-> **Taabụ Logs**: Logs container dị ndụ

-> **Taabụ Shell**: Nweta shell n'ime container (bara uru maka nchọpụta nsogbu)

-> **Taabụ Events**: Ihe omume Kubernetes (ọtụtụ mgbe enweghị uru belụsọ ma ihe adịghị arụ ọrụ)


### Site na RPC (ọ bụrụ na agbanyere)

Ọ bụrụ na ị gbanyere RPC, ị nwere ike jụọ node gị dịka full node zcashd nkịtị (n'ihi na ọ bụ otu!)

### Nhọrọ zcash-cli

Ọ bụrụ na ị nwere ohere shell site na Console, ị nwere ike iji *zcash-cli* ozugbo:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Imechi Nnyefe Gị

Mgbe ị mechara ma ọ bụ ịchọrọ ịkwụsị ịkwụ ụgwọ:

-> Gaa na **My Deployments**

-> Chọta nnyefe zcashd gị

-> Pịa **"Close Deployment"**

-> Kwenye ma bịanye aka na Keplr


A ga-akwụghachi nkwụnye ego AKT 5 gị. Onye na-eweta kwesịrị idobe **nchekwa na-adịgide**, mana atụkwasịla ya obi - were ya dịka onye na-eweta cloud ọ bụla ọzọ.

## Nchọpụta Nsogbu

### Njehie "Insufficient funds"

Ị chọrọ AKT karịa. Tinye ego n'ime e-akpa ego Keplr gị.

### Enweghị bids na-apụta

Ma ọ bụ:

-> Ọnụahịa gị dị ala nke ukwuu (bulie *amount* na SDL)

-> Ihe akụrụngwa ị chọrọ dị elu nke ukwuu maka ndị na-eweta dị (belata CPU/ebe nchekwa/nchekwa)

-> Chere ogologo oge (mgbe ụfọdụ ọ na-ewe sekọnd 60-90 ka bids pụta)


### Nnyefe rapaara na "pending"

Onye na-eweta nwere ike inwe nsogbu. Mechie nnyefe ahụ ma nwaa onye na-eweta ọzọ.

### Logs zcashd na-egosi "No peers connected"

Ebe ọ bụ na nkwụsị Nkwụsị-Nkwado na Julaị 18, 2026, nke a bụ ọnọdụ na-adịgide adịgide a tụrụ anya ya kama ịbụ igbu oge mbido, ọ dịghịkwa oke ichere ma ọ bụ inyefe ọzọ ga-edozi ya. Nyefee [Zebra](/guides/akash-network-zebra) kama.

### Njehie "Out of memory" na logs

Ị chekwabara ego nke ukwuu na RAM. Mechie nnyefe ahụ ma nyefee ọzọ na ebe nchekwa opekata mpe 12Gi (akwadoro 16Gi).

### Mmekọrịta na-ewe ogologo oge

Kọwaa "ogologo oge":

-> **Awa**: Nkịtị

-> **Ụbọchị**: Ọ dịkwa nkịtị maka mainnet malite na mmalite

-> **Izu**: Ihe adịghị mma, lelee logs maka njehie


### "Error fetching zcash-params"

Onye na-eweta nwere ike inwe nsogbu netwọk ma ọ bụ bandwidth nwayọ. Nke a na-edozikarị onwe ya. Ọ bụrụ na ọ ga-adịgide karịa nkeji 30, gbalịa inyefe ọzọ n'aka onye na-eweta ọzọ.

### Ọdịda nyocha RPC

-> Lelee na `ZCASHD_RPCUSER` na `ZCASHD_RPCPASSWORD` edobere nke ọma

-> Nyochaa na ị na-eji ọdụ ziri ezi (8232 maka mainnet, 18232 maka testnet)

-> Cheta na Akash na-edepụta ọdụ - jiri URI sitere na nnyefe gị, ọ bụghị 8232 ozugbo


## Njikwa Ọnụ Ego

Lelee mmefu gị na Console:

-> **My Deployments** -> Nnyefe gị -> Na-egosi atụmatụ "Cost per month"

-> Nguzozi e-akpa ego Keplr gị ga-ebelata ka oge na-aga


Mgbe nguzozi gị dị ala, Akash ga-emechi nnyefe gị na-akpaghị aka. **Tinye ego n'ime e-akpa ego gị mgbe ụfọdụ** ma ọ bụ hazie ọkwa.

### Ibelata Ọnụ Ego

-> **Jiri Testnet** maka nnwale na-abụghị mmepụta (50% dị ọnụ ala)

-> **Belata CPU/ebe nchekwa** ma ọ bụrụ na ị chọghị mmekọrịta ọsọ ọsọ

-> **Họrọ ndị na-eweta dị ọnụ ala** (ọ bụghị mgbe niile amamihe - oge ọrụ dị mkpa)

-> **Jiri USDC kama AKT** ma ọ bụrụ na ọnụahịa AKT na-agbanwe agbanwe (chọrọ mgbanwe ọnụahịa SDL)

-> **Gbanyụọ txindex** ma ọ bụrụ na ị chọghị ya (na-echekwa ~ 20% nchekwa)


### Akụrụngwa Ndị Ọzọ

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Ndị Nyocha Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (maka nsogbu onye na-eweta)

## Ihe Ndị Ikpeazụ

- **Nchekwa na-adịgide dị mkpa.** Awụpụla *persistent: true* ma ọ bụ jiri klaasị *beta2*. Jiri *beta3*.
- **Mmekọrịta mbụ na-adị nwayọ.** Nwee ndidi. Nke a bụ ihe nkịtị maka node blockchain.
- **Debe e-akpa ego gị n'ego.** Nnyefe na-emechi na-akpaghị aka mgbe AKT gị gwụrụ.
- **A naghị eme ndabere na-akpaghị aka.** Ọ bụrụ na data ahụ dị gị mkpa, were ya na ọ nwere ike ịla n'iyi ma mee atụmatụ kwekọrọ.
- **Nchekwa RPC dị oke mkpa.** Ekpughela RPC n'ịntanetị na-enweghị usoro nchekwa kwesịrị ekwesị.
- **A na-echekwa zcash-params.** Mbido mbụ na-ebudata ~2GB nke paramenta kriptogafik. Nke a bụ ihe nkịtị ma na-eme naanị otu ugboro.
