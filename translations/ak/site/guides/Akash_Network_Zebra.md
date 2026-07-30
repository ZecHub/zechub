# Sɛnea wɔyɛ Zebra wɔ Akash Network so

Anamɔn-anammɔn akwankyerɛ a wɔde bedi dwuma wɔ Zebra Zcash full node a wode [Akash Console](https://console.akash.network).

### Nea Woreyɛ Deploying

Zebra node a edi mũ a ɛbɛma:

-> Sync Zcash blockchain no nyinaa (100GB + ma mainnet, ~ 40GB ma testnet)

-> Ɛka bɛyɛ $15/ɔsram a egyina AKT token bo so

-> Gye nnɔnhwerew pii kosi nna pii na ama ayɛ sync koraa

-> Fa vCPUs 4, RAM 16GB, 350GB akoraeɛ (mainnet) anaa vCPU 2, RAM 8GB, 50GB (testnet) di dwuma


### Nea ɛho hia: Hyɛn Gyinabea Ho Mfoniniyɛ wɔ Akash

Sɛ woda port bi adi wɔ Akash so (e.g., port 8233 ma Zebra P2P) a, **ENNYƐ saa port pɔtee no** wɔ ɔdemafoɔ no baguam IP so. Mmom, ɔdemafoɔ no de random high port (te sɛ 31234 anaa 42567) ma na ɔde reverse-proxies kɔ wo container no port 8233.

Eyi nam nhyehyɛe so - providers no tu deployments pii, na sɛ obiara bɔ mmɔden sɛ ɔde port 8233 bedi dwuma tẽẽ a, anka wobenya ntawntawdi.

**Nea eyi kyerɛ ma wo:**

-> Wo hyehyɛ port 8233 wɔ SDL (Zebra gyinapɛn P2P port) no mu .

-> Akash ma wo URI te sɛ *provider.com:31234* .

-> Zcash nodes afoforo kɔ wo nkyɛn wɔ *provider.com:31234*

-> Wo container no mu no, Zebra da so ara tie wɔ 8233 so


Wɔdi eyi ho dwuma ara kwa. Fa URI a Akash de ma wo no di dwuma kɛkɛ.

### Nneɛma a ɛsɛ sɛ wodi kan yɛ

1. **Keplr Wallet** wɔde brawsa ntrɛwmu ahyɛ mu (Chrome/Brave/Firefox)
2. **AKT tokens** - Nya 50-100 AKT fi nsakrae bi mu (Coinbase, Kraken, Osmosis)
3. **Simma 5** na wobɛkyere afa Console UI no so

#### Anamɔn 1: Fa Wo Sikakorabea no Bata Ho

-> Go to [https://console.akash.network](https://console.akash.network)

-> Klik **"Connect Wallet"** wɔ atifi nifa so

-> Paw **Keplr** (anaasɛ Cosmos sika kotoku a wopɛ) .

-> Gye nkitahodi no so bere a Keplr pue


Ɛsɛ sɛ wo AKT balance no pue wɔ soro nifa so. Sɛ ɛyɛ zero a, kɔ kan kɔ fund wo sika kotoku no.

#### Anamɔn 2: Yɛ Deployment

-> Klik **"Deploy"** bɔtn (bɔn kɛse bruu, kratafa no mfinimfini)

-> Paw **"Si wo template"** (anaasɛ twa tẽẽ kɔ SDL a wode bɛto so)


##### Ɔkwan A: Fa SDL Fael (Wɔkamfo kyerɛ) .

[![Deploy wɔ Akash so](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Ɔkwan B: Fa SDL Editor di dwuma

Sɛ wopɛ sɛ wode nsa hyɛ [SDL no mu a](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Kɔpi *zebra-akash.yml* mu nsɛm no.

-> Fa hyɛ SDL editor no mu

-> Sesa sɛnea ɛho hia (hwɛ nhyehyeɛ ɔfa a ɛwɔ aseɛ ha)

-> Klik **"Bɔ Deployment"** so.


#### Anamɔn 3: Hwɛ na pene Deposit so

Console no bɛkyerɛ wo:

-> **Deployment deposit**: ~5 AKT (wonya eyi san bere a woato deployment no mu)

-> **Ɛka a wɔabu ho akontaa**: Egyina wo SDL bo so

Klik **"Approve"** na fa wo nsa hyɛ asɛm no ase wɔ Keplr mu.

#### Anamɔn 4: Paw Ɔdemafo

~ 30 seconds akyi no, wubehu bids a efi providers hɔ. Bid biara kyerɛ sɛ:

-> **Boɔ a wɔbɔ wɔ block biara ho** (wɔ AKT anaa USDC mu)

-> **Ɔsram biara sika a wɔabu ho akontaa**

-> **Ɔdemafo ho nsɛm** (bere a wɔde yɛ adwuma, ɔmantam, ne nea ɛkeka ho)


**Npaw nea ne bo yɛ mmerɛw kɛkɛ.** Hwɛ:

-> Uptime % ( botaeɛ ne sɛ > 95%) .

-> Region (ɛbɛn wo = latency a eye, nanso ɛnyɛ hwee kɛse mma blockchain nodes)

-> Audited tebea (green checkmark = ahotoso kɛse) .


Klik **"Accept Bid"** wɔ wo provider a woapaw no so na hyɛ Keplr mu.

#### Anamɔn 5: Twɛn Deployment

Console no bɛyɛ:

-> Yɛ lease no ne wo provider a woapaw no

-> Send manifest (ɛkyerɛ nea ɔde ma no nea ɛsɛ sɛ wotu mmirika) .

-> Fi ase wo container no

Eyi gye simma 1-2. Wobɛhunu status updates wɔ UI no mu.

#### Anamɔn 6: Hwɛ sɛ Ɛretu mmirika

Sɛ wɔde di dwuma wie a, wubehu sɛ:

-> **Services** tab: Kyerɛ wo *zebra* som a ɛwɔ tebea

-> **Logs** tab: Nkwammoaa mu nsɛm a wɔakyerɛw

-> **Leases** tab: Nsɛm a ɛfa wo deployment ho (DSEQ, provider, ɛka)


##### Hwɛ Logs no mu

Klik **Logs** so na ɛsɛ sɛ wuhu sɛ Zebra refi ase:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Sync no begye ** nnɔnhwerew kosi nna** a egyina network no so. Hwɛ sɛ:

-> Nkɔanim wɔ block sorokɔ

-> Atipɛnfo nkitahodi (ɛsɛ sɛ ɛyɛ atipɛnfo 10-30) .

-> Mfomsoɔ biara nni hɔ a wɔsan yɛ


#### Anamɔn 7: Nya Wo Node no Address

Klik **Leases** tab no so, afei **URIs**.

Wubehu biribi te sɛ:

```bash
zebra-8233: provider-hostname.com:31234
```

Eyi ne wo node no **public P2P endpoint**. Zcash nodes afoforo bɛka wo ho wɔ saa address yi so.

**Hyɛ port mapping no nsow:** Wo hyehyɛɛ port 8233 wɔ SDL no mu, nanso Akash de maa ɔmanfoɔ port soronko (31234 wɔ nhwɛsoɔ yi mu). Eyi yɛ ade a ɛyɛ daa - hwɛ "Port Mapping on Akash" ɔfa a ɛwɔ soro hɔ sɛ eyi ma wo adwene tu fra a. Wo node no yɛ nea wobetumi akɔ so wɔ port biara a Akash kyerɛ wɔ ha, ɛnyɛ 8233 ankasa.

Sɛ wo ma RPC (wɔakyerɛw ho asɛm default wɔ SDL no mu) a, wobɛsan nso ahu RPC awiei wɔ ha a ɛwɔ n’ankasa map port.

### Nsiesiei a Wɔpaw

#### Sɛ wodan kɔ Testnet so

SDL no default yɛ Mainnet. Sɛ wode Testnet bedi dwuma mmom a:

-> **Ka Mainnet config** wɔ *env* ɔfa no mu:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Nyi Testnet nhyehyɛe no fi mu**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> **Yɛ port a ɛda adi no foforo** wɔ *expose* ɔfa no mu:

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

-> **Wɔpɛ: Tew nneɛma a wɔde yɛ adwuma** so ma Testnet wɔ *profiles.compute.zebra.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Wɔpɛ: Boɔ a ɛba fam** wɔ *profiles.placement.akash.pricing* mu:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### Ma RPC Access nyɛ adwuma

RPC yɛ adwuma default so ma ahobammɔ. Sɛnea ɛbɛyɛ a ebetumi ayɛ adwuma no:

**Ma Mainnet ho no:**

-> Uncomment wɔ *env* ɔfa no mu:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Yi Mainnet RPC port no fi * expose* mu:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Ma Testnet:**

-> Uncomment wɔ *env* ɔfa no mu:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Yi Testnet RPC port no fi * expose* mu:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Kɔkɔbɔ**: Sɛ wo hyehyɛ *global: true* ma RPC a, woreda no adi wɔ intanɛt so. Zebra de cookie auth di dwuma default, nanso ɛda so ara - nyɛ eyi gye sɛ wunim nea woreyɛ.

**Port mapping nkaebɔ**: Sɛ mpo woda RPC adi wɔ wiase nyinaa a, Akash bɛ map no akɔ random high port (ɛnyɛ 8232/18232). Hwɛ URI ahorow a ɛwɔ wo deployment no mu na woahu ɔmanfo awiei ankasa. Wɔ *wiase nyinaa: atoro* (wɔkamfo kyerɛ) ho no, RPC awiei no yɛ nea wobetumi akɔ so wɔ Akash deployment network no mu nkutoo, ɛnyɛ ɔmanfo intanɛt so.

#### Ma Metrics (Prometheus) nyɛ adwuma .

Sɛ wopɛ sɛ wo scrape metrics ma monitoring a:

-> Uncomment wɔ *env* mu:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Yi metrics port no fi * expose* mu:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Sesa Nneɛma a Wɔde Yɛ Adwuma/Bo a Wɔbɔ

Sɛ wo nnya bids anaasɛ wopɛ sɛ wo optimize cost:

**Wɔ lower-spec providers** ho no, tew so wɔ *profiles.compute.zebra.resources* ɔfa no mu:

-> CPU: *units: 2 * (asua koraa ma sync ahoɔhare a ntease wom)

-> Memory: *size: 12Gi* (asua koraa ma ɛyɛ den)

-> Nneɛma a wɔkora so: *kɛse: 120Gi* (asua koraa ma mainnet)

**Sɛ wopɛ sɛ wotwetwe sika pii** a, kɔ soro wɔ *profiles.placement.akash.pricing* mu:

-> Mainnet: Bɔ mmɔden *dodow: 1000000* uakt/block

-> Testnet: Bɔ mmɔden *dodo: 1000000* uakt/block

### Wo Deployment a Woreyɛ no Foforo

Ɛho hia sɛ wosakra nhyehyɛe bere a wode ahyɛ mu awie no?

-> Kɔ **Me Deployments** wɔ Console mu

-> Hwehwɛ wo Zebra deployment no

-> Klik **"Nsakraeɛ Deployment"**

-> Sesa SDL no

-> Klik **"Update"** na pene so wɔ Keplr mu

**Hyɛ no nsow**: Updating bɛsan ahyɛ wo container no ase. Node no bɛsan afi ase afi ne tebea a wɔakora so (persistent storage), nanso hwɛ kwan sɛ simma 1-2 bɛkɔ so ayɛ adwuma.

### Nneɛma a wɔhwɛ so

#### Ɛdenam Console so

-> **Logs tab**: Nkwammoaa mu nsɛm a wɔakyerɛw

-> **Shell tab**: Nya shell bi wɔ container no mu (ɛho wɔ mfaso ma debugging)

-> **Events tab**: Kubernetes events (dodow no ara mfaso nni so gye sɛ biribi asɛe)


#### Via RPC (sɛ wɔama ayɛ adwuma a) .

Sɛ wo ma RPC yɛ adwuma a, wobɛtumi abisa wo node no sɛ normal zebrad full node (efisɛ ɛte saa!) .

### Wo Deployment a Wobɛto Mu

Sɛ wowie anaasɛ wopɛ sɛ wugyae sikatua a:

-> Kɔ **Me Deployments** .

-> Hwehwɛ wo Zebra deployment no

-> Klik **"To Deployment"** so.

-> Si so dua na fa wo nsa hyɛ ase wɔ Keplr

Wɔbɛsan de wo 5 AKT sika a wode asie no ama wo. **Ɛsɛ sɛ ɔdemafoɔ no kora **Akoraeɛ a ɛkɔ so daa** so, nanso mfa wo ho nto so - fa no sɛ mununkum dwumadie foforɔ biara.

### Ɔhaw ahorow a wodi ho dwuma

#### "Sika a ɛnnɔɔso" mfomso

Wohia AKT pii. Fa sika ma wo Keplr sika kotoku.

#### Bids biara nni hɔ a ɛda adi

Sɛ anaa:

-> Wo boɔ sua dodo (ma *dodoɔ* kɔ soro wɔ SDL mu)

-> Wo resource ahwehwɛdeɛ no dɔɔso dodo ma providers a ɛwɔ hɔ (tew CPU/memory/storage so) .

-> Twɛn kyɛ (ɛtɔ da bi a egye sikani 60-90 ansa na bids apue)


#### Deployment akɔhyɛ "pending" mu.

Ebia nea ɔde mmoa ma no rehyia nsɛmnsɛm. To deployment no mu na sɔ provider foforo hwɛ.

#### Zebra logs kyerɛ sɛ "No peers connected".

Eyi yɛ ade a ɛfata wɔ simma kakraa a edi kan no mu. Zebra behu atipɛnfo no ara kwa. Sɛ ɛkɔ so wɔ simma 10+ akyi a, ebia wobɛnya nkitahodi ho asɛm (ɛnyɛ nea ɛbɛyɛ yiye wɔ Akash so).

#### "Out of memory" mfomso wɔ logs mu

Wo cheaped out wɔ RAM so. To deployment no mu na redeploy a anyɛ yiye koraa no 12Gi memory (16Gi kamfo kyerɛ).

#### Sync regye daa

Kyerɛkyerɛ "daa" mu:

-> **Nnɔnhwerew**: Ɛyɛ daa

-> **Nna**: Afei nso normal ma mainnet fi mfiase

-> **Adapɛn**: Biribi anyɛ yie, hwɛ logs sɛ mfomsoɔ bi wɔ hɔ anaa


### Ka a Wɔbɔ ho Nhwɛso

Hwɛ sika a wosɛe no wɔ Console no mu:

-> **Me Deployments** -> Wo deployment -> Kyerɛ "Ɛka bosome biara" akontabuo

-> Wo Keplr sika kotoku mu sika bɛkɔ fam bere a bere kɔ so no


Sɛ wo balance no sua a, Akash bɛ auto-close wo deployment no. **Top up wo wallet bere ne bere mu** anaa hyehyɛ alerts.

#### Ɛka a Wɔtew So

-> **Fa Testnet** di dwuma ma sɔhwɛ a ɛnyɛ nea wɔyɛ (50% a ne bo yɛ mmerɛw)

-> **Lower CPU/memory** sɛ wo nhia fast sync a

-> **Paw wɔn a wɔde ma a ne bo yɛ mmerɛw** (ɛnyɛ nyansa bere nyinaa - bere a wɔde yɛ adwuma ho hia)


### Mainnet ne Testnet ntam

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

Fi ase wɔ Testnet sɛ woresɔ deployment nhyehyɛe no ahwɛ kɛkɛ a. Hwɛ "Switching to Testnet" ɔfa a ɛwɔ atifi hɔ no ma nhyehyeɛ.

### Nneɛma Afoforo a Wɔde Yɛ Adwuma

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Nsɛmma Nhoma**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra Nwoma**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash Nhwehwɛmufo**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Akasakasa**: [https://discord.akash.network](https://discord.akash.network) (ma nsɛm a ɛfa ɔdemafo ho) .

