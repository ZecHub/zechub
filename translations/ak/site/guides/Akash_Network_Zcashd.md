# Wɔde zcashd rekɔ Akash denam Console so

Akwankyerɛ a ɛfa zcashd Zcash full node a wode bedi dwuma (Electric Coin Co dwumadie) a wode [Akash Console](https://console.akash.network). Video nkyerɛkyerɛ bi a ɛwɔ aseɛ ha ni. Wobetumi ahu akwankyerɛ a emu dɔ kɛse wɔ ase ha.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma kwan maFullScreen no
    loading="lazy"
  />
</div>


## Nea Woreyɛ Deploying

zcashd node a edi mũ a ɛbɛma:

-> Sync Zcash blockchain no nyinaa (350GB + ma mainnet, ~ 40GB ma testnet)

-> Ɛka bɛyɛ $15/ɔsram a egyina AKT token bo so

-> Gye nnɔnhwerew pii kosi nna pii na ama ayɛ sync koraa

-> Fa vCPUs 4, RAM 16GB, 350GB akoraeɛ (mainnet) anaa vCPU 2, RAM 8GB, 50GB (testnet) di dwuma

-> Twe cryptographic parameters wɔ mmirikatu a edi kan (~ 2GB, pɛnkoro)

**zcashd vs Zebra:**

-> zcashd yɛ mfitiaseɛ Zcash node dwumadie a Electric Coin Co yɛeɛ

-> Zebra yɛ Zcash Foundation no dwumadie foforɔ

-> Nnipa mmienu no nyinaa ne Zcash network no hyia

-> zcashd wɔ nneɛma pii (mining, sika kotoku, Insight Explorer API) .

-> Fa zcashd di dwuma sɛ wo hia sika kotoku dwumadie anaa RPC API pɔtee bi a


### **Nea ɛho hia: Port Mapping wɔ Akash**

Sɛ woda port bi adi wɔ Akash so (e.g., port 8233 ma zcashd P2P) a, **ENNYƐ saa port pɔtee no** wɔ ɔdemafoɔ no baguam IP so. Mmom, ɔdemafoɔ no de random high port (te sɛ 31234 anaa 42567) ma na ɔde reverse-proxies kɔ wo container no port 8233.

Eyi nam nhyehyɛe so - providers no tu deployments pii, na sɛ obiara bɔ mmɔden sɛ ɔde port 8233 bedi dwuma tẽẽ a, anka wobenya ntawntawdi.

**Nea eyi kyerɛ ma wo:**

-> Wo hyehyɛ port 8233 wɔ SDL (zcashd no gyinapɛn P2P hyɛn gyinabea) .

-> Akash ma wo URI te sɛ *provider.com:31234* .

-> Zcash nodes afoforo kɔ wo nkyɛn wɔ *provider.com:31234*

-> Wo container no mu no, zcashd da so ara tie wɔ 8233 so


Wɔdi eyi ho dwuma ara kwa. Fa URI a Akash de ma wo no di dwuma kɛkɛ.

## Nneɛma a ɛsɛ sɛ wodi kan yɛ

-> **Keplr Wallet** browser ntrɛwmu a wɔde ahyɛ mu (Chrome/Brave/Firefox)

-> **AKT tokens** - Nya 50-100 AKT fi nsakrae bi mu (Coinbase, Kraken, Osmosis)

-> **Simma 5** na wobɛkyere afa Console UI no so


## Anamɔn 1: Fa Wo Sikakorabea no Bata Ho

-> Go to [https://console.akash.network](https://console.akash.network)

-> Klik **"Connect Wallet"** wɔ atifi nifa so

-> Paw **Keplr** (anaasɛ Cosmos sika kotoku a wopɛ) .

-> Gye nkitahodi no so bere a Keplr pue


Ɛsɛ sɛ wo AKT balance no pue wɔ soro nifa so. Sɛ ɛyɛ zero a, kɔ kan kɔ fund wo sika kotoku no.

## Anamɔn 2: Yɛ Deployment

-> Klik **"Deploy"** bɔtn (bɔn kɛse bruu, kratafa no mfinimfini)

-> Paw **"Si wo template"** (anaasɛ twa tẽẽ kɔ SDL a wode bɛto so)

### Ɔkwan A: Fa SDL Fael (Wɔkamfo kyerɛ) .

[![Deploy wɔ Akash so](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Ɔkwan B: Fa SDL Editor di dwuma

Sɛ wopɛ sɛ wode nsa de SDL no hyɛ mu a:

-> Kɔpi *zcashd-akash.yml* mu nsɛm no.

-> Fa hyɛ SDL editor no mu

-> Sesa sɛnea ɛho hia (hwɛ nhyehyeɛ ɔfa a ɛwɔ aseɛ ha)

-> Klik **"Bɔ Deployment"** so.


## Anamɔn 3: Hwɛ na pene Deposit so

Console no bɛkyerɛ wo:

-> **Deployment deposit**: ~ 5 AKT (wonya eyi san bere a woato deployment no mu)

-> **Ɛka a wɔabu ho akontaa**: Egyina wo SDL bo so


Klik **"Approve"** na fa wo nsa hyɛ asɛm no ase wɔ Keplr mu.

## Anamɔn 4: Paw Ɔdemafo

~ 30 seconds akyi no, wubehu bids a efi providers hɔ. Bid biara kyerɛ sɛ:

-> **Boɔ a wɔbɔ wɔ block biara ho** (wɔ AKT anaa USDC mu)

-> **Ɔsram biara sika a wɔabu ho akontaa**

-> **Ɔdemafo ho nsɛm** (bere a wɔde yɛ adwuma, ɔmantam, ne nea ɛkeka ho)


**Npaw nea ne bo yɛ mmerɛw kɛkɛ.** Hwɛ:

-> Uptime % ( botaeɛ ne sɛ > 95%) .

-> Region (ɛbɛn wo = latency a eye, nanso ɛnyɛ hwee kɛse mma blockchain nodes)

-> Audited tebea (green checkmark = ahotoso kɛse) .


Klik **"Accept Bid"** wɔ wo provider a woapaw no so na hyɛ Keplr mu.

## Anamɔn 5: Twɛn Deployment

Console no bɛyɛ:

-> Yɛ lease no ne wo provider a woapaw no

-> Send manifest (ɛkyerɛ nea ɔde ma no nea ɛsɛ sɛ wotu mmirika) .

-> Fi ase wo container no


Eyi gye simma 1-2. Wobɛhunu status updates wɔ UI no mu.

## Anamɔn 6: Hwɛ sɛ Ɛretu mmirika

Sɛ wɔde di dwuma wie a, wubehu sɛ:

-> **Services** tab: Kyerɛ wo *zcashd* som a ɛwɔ tebea

-> **Logs** tab: Nkyerɛwde a ɛte ase fi wo zcashd node no so

-> **Leases** tab: Nsɛm a ɛfa wo deployment ho (DSEQ, provider, ɛka)


### Hwɛ Logs no mu

Klik **Logs** so na ɛsɛ sɛ wuhu sɛ zcashd refi ase:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**First run will download zcash-params (~2GB).** Eyi yɛ adwuma a wɔyɛ no pɛnkoro na egye simma 5-10 a egyina provider bandwidth so. Restarts a edi hɔ no behuw eyi so.

Sync no begye ** nnɔnhwerew kosi nna** a egyina network no so. Hwɛ sɛ:

-> Nkɔanim wɔ block sorokɔ

-> Atipɛnfo nkitahodi (ɛsɛ sɛ ɛyɛ atipɛnfo 10-30) .

-> Mfomsoɔ biara nni hɔ a wɔsan yɛ


## Anamɔn 7: Nya Wo Node no Address

Klik **Leases** tab no so, afei **URIs**.

Wubehu biribi te sɛ:

```
zcashd-8233: provider-hostname.com:31234
```

Eyi ne wo node no **public P2P endpoint**. Zcash nodes afoforo bɛka wo ho wɔ saa address yi so.

**Hyɛ port mapping no nsow:** Wo hyehyɛɛ port 8233 wɔ SDL no mu, nanso Akash de maa ɔmanfoɔ port soronko (31234 wɔ nhwɛsoɔ yi mu). Eyi yɛ ade a ɛyɛ daa - hwɛ "Port Mapping on Akash" ɔfa a ɛwɔ soro hɔ sɛ eyi ma wo adwene tu fra a. Wo node no yɛ nea wobetumi akɔ so wɔ port biara a Akash kyerɛ wɔ ha, ɛnyɛ 8233 ankasa.

Sɛ wo ma RPC (wɔakyerɛw ho asɛm default wɔ SDL no mu) a, wobɛsan nso ahu RPC awiei wɔ ha a ɛwɔ n’ankasa map port.

## Nsiesiei a Wɔpaw

### Sɛ wodan kɔ Testnet so

SDL no default yɛ Mainnet. Sɛ wode Testnet bedi dwuma mmom a:

-> **Sesa network wɔ *env* ɔfa no mu:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
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

-> **Wɔpɛ: Tew nneɛma a wɔde yɛ adwuma** so ma Testnet wɔ *profiles.compute.zcashd.resources*:

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

> hyɛ no nsow sɛ wɔbɛtew nneɛma bo so no betumi ayɛ yɛn providers form bidding. sɔ saa botae yi hwɛ, anaasɛ fa provider endpiont no di dwuma de hwɛ sɛ wɔbɛbɔ ka anaa. (hwɛ nea ɔde ma api nkrataa mu)

### Ma RPC Access nyɛ adwuma

RPC yɛ adwuma default so ma ahobammɔ. Sɛnea ɛbɛyɛ a ebetumi ayɛ adwuma no:

**CRITICAL: Set credentials a ɛyɛ den.** zcashd RPC de ɔdefoɔ din/asɛmfua fa HTTP so (ɛnyɛ HTTPS). Sɛ wote ahobanbɔ ho nkyerɛkyerɛmu ase nkutoo a, da RPC adi.

-> Uncomment wɔ *env* ɔfa no mu:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Uncomment RPC port no wɔ *expose* mu:

   **Ma Mainnet ho no:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Ma Testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Kɔkɔbɔ**: Sɛ wo hyehyɛ *global: true* ma RPC a, woreda no adi wɔ intanɛt so a ɛwɔ mfitiaseɛ auth. Eyi yɛ adwene bɔne. Fa *global: false* di dwuma na fa Akash mu ntwamutam so kɔ RPC anaa hyehyɛ ɔkwan a ahobammɔ wom.

**Port mapping nkaebɔ**: Sɛ mpo woda RPC adi wɔ wiase nyinaa a, Akash bɛ map no akɔ random high port (ɛnyɛ 8232/18232). Hwɛ URI ahorow a ɛwɔ wo deployment no mu na woahu ɔmanfo awiei ankasa. Wɔ *wiase nyinaa: atoro* (wɔkamfo kyerɛ) ho no, RPC awiei no yɛ nea wobetumi akɔ so wɔ Akash deployment network no mu nkutoo, ɛnyɛ ɔmanfo intanɛt so.

### Ma Nkitahodi Index no nyɛ adwuma

Transaction index ma wo kwan ma wo bisa asɛm biara denam ne ID so denam RPC so. Ɔde nneɛma pii a wɔkora so di dwuma (~ 20% nkɔanim).

Uncomment wɔ *env* mu:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Kɔkɔbɔ**: Txindex a wobɛma ayɛ adwuma wɔ synced node a ɛwɔ hɔ dedaw so no hwehwɛ sɛ wosan de index blockchain no nyinaa, a egye nnɔnhwerew pii.

### Ma Insight Explorer nyɛ adwuma

Insight Explorer de REST API awiei foforo ma blockchain data (ɛho wɔ mfaso ma block explorers).

Uncomment wɔ *env* mu:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Wei ma txindex tumi yɛ adwuma ankasa na ɛde RPC akwan foforo ka ho.

### Ma Prometheus Metrics no nyɛ adwuma

Sɛ wopɛ sɛ wo scrape metrics ma monitoring a:

-> Uncomment wɔ *env* mu:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Yi metrics port no fi * expose* mu:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Metrics bɛba wɔ http://yourendpoint:9969/metrics wɔ Prometheus kwan so.

### Sesa Nneɛma a Wɔde Yɛ Adwuma/Bo a Wɔbɔ

Sɛ wo nnya bids anaasɛ wopɛ sɛ wo optimize cost:

**Wɔ low-spec providers** ho no, tew so wɔ *profiles.compute.zcashd.resources* ɔfa no mu:

-> CPU: *units: 2 * (asua koraa ma sync ahoɔhare a ntease wom)

-> Memory: *size: 12Gi* (asua koraa ma ɛyɛ den)

-> Nneɛma a wɔkora so: *kɛse: 120Gi* (asua koraa ma mainnet)


**Sɛ wopɛ sɛ wotwetwe sika pii** a, kɔ soro wɔ *profiles.placement.akash.pricing* mu:

-> Mainnet: Bɔ mmɔden *dodo: 15000* uakt/block

-> Testnet: Bɔ mmɔden *dodo: 7500* uakt/block


Wɔde SDL gyinapɛn ahorow no asi hɔ wɔ ɔkwan a ɛyɛ konservatif so. Wɔn a wɔde mmoa ma no mu dodow no ara bɛbɔ ka a ɛba fam.

## Wo Deployment a Woreyɛ no Foforo

Ɛho hia sɛ wosakra nhyehyɛe bere a wode ahyɛ mu awie no?

-> Kɔ **Me Deployments** wɔ Console mu

-> Hwehwɛ wo zcashd deployment no

-> Klik **"Nsakraeɛ Deployment"**

-> Sesa SDL no

-> Klik **"Update"** na pene so wɔ Keplr mu


**Hyɛ no nsow**: Updating bɛsan ahyɛ wo container no ase. Node no bɛsan afi ase afi ne tebea a wɔakora so (persistent storage), nanso hwɛ kwan sɛ simma 1-2 bɛkɔ so ayɛ adwuma.

## Nneɛma a wɔhwɛ so

### Ɛdenam Console so

-> **Logs tab**: Nkwammoaa mu nsɛm a wɔakyerɛw

-> **Shell tab**: Nya shell bi wɔ container no mu (ɛho wɔ mfaso ma debugging)

-> **Events tab**: Kubernetes events (dodow no ara mfaso nni so gye sɛ biribi asɛe)


### Via RPC (sɛ wɔama ayɛ adwuma a) .

Sɛ wo ma RPC yɛ adwuma a, wobɛtumi abisa wo node no sɛ normal zcashd full node (efisɛ ɛte saa!) .

### zcash-cli Ɔkwan foforo a wɔfa so yɛ ade

Sɛ wowɔ shell access via Console a, wobɛtumi de *zcash-cli* adi dwuma tẽẽ:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Wo Deployment a Wobɛto Mu

Sɛ wowie anaasɛ wopɛ sɛ wugyae sikatua a:

-> Kɔ **Me Deployments** .

-> Hwehwɛ wo zcashd deployment no

-> Klik **"To Deployment"** so.

-> Si so dua na fa wo nsa hyɛ ase wɔ Keplr


Wɔbɛsan de wo 5 AKT sika a wode asie no ama wo. **Ɛsɛ sɛ ɔdemafoɔ no kora **Akoraeɛ a ɛkɔ so daa** so, nanso mfa wo ho nto so - fa no sɛ mununkum dwumadie foforɔ biara.

## Ɔhaw ahorow a wodi ho dwuma

### "Sika a ɛnnɔɔso" mfomso

Wohia AKT pii. Fa sika ma wo Keplr sika kotoku.

### Bids biara nni hɔ a ɛda adi

Sɛ anaa:

-> Wo boɔ sua dodo (ma *dodoɔ* kɔ soro wɔ SDL mu)

-> Wo resource ahwehwɛdeɛ no dɔɔso dodo ma providers a ɛwɔ hɔ (tew CPU/memory/storage so) .

-> Twɛn kyɛ (ɛtɔ da bi a egye sikani 60-90 ansa na bids apue)


### Deployment akɔhyɛ "pending" mu.

Ebia nea ɔde mmoa ma no rehyia nsɛmnsɛm. To deployment no mu na sɔ provider foforo hwɛ.

### zcashd logs kyerɛ "Atipɛnfo biara nni nkitaho".

Eyi yɛ ade a ɛfata wɔ simma kakraa a edi kan no mu. zcashd bɛhunu atipɛnfoɔ no ara. Sɛ ɛkɔ so wɔ simma 10+ akyi a, ebia wobɛnya nkitahodi ho asɛm (ɛnyɛ nea ɛbɛyɛ yiye wɔ Akash so).

### "Out of memory" mfomso wɔ logs mu

Wo cheaped out wɔ RAM so. To deployment no mu na redeploy a anyɛ yiye koraa no 12Gi memory (16Gi kamfo kyerɛ).

### Sync regye daa

Kyerɛkyerɛ "daa" mu:

-> **Nnɔnhwerew**: Ɛyɛ daa

-> **Nna**: Afei nso normal ma mainnet fi mfiase

-> **Adapɛn**: Biribi anyɛ yie, hwɛ logs sɛ mfomsoɔ bi wɔ hɔ anaa


### "Mfomso wɔ zcash-params a wɔde reba mu".

Ebia nea ɔde ma no wɔ network ho nsɛm anaasɛ bandwidth a ɛyɛ brɛoo. Mpɛn pii no, eyi ankasa siesie. Sɛ ɛkɔ so bɛboro simma 30 a, bɔ mmɔden sɛ wobɛsan de akɔma ɔdemafo foforo.

### RPC nokwaredi a entumi nyɛ yiye

-> Hwɛ sɛ *ZCASHD_RPCUSER* ne *ZCASHD_RPCPASSWORD* ahyɛ no yiye

-> Hwɛ sɛ wode port a ɛfata redi dwuma (8232 ma mainnet, 18232 ma testnet)

-> Kae sɛ ports na Akash na ɛyɛ map - fa URI no di dwuma fi wo deployment no mu, ɛnyɛ 8232 tẽẽ


## Ka a Wɔbɔ ho Nhwɛso

Hwɛ sika a wosɛe no wɔ Console no mu:

-> **Me Deployments** -> Wo deployment -> Kyerɛ "Ɛka bosome biara" akontabuo

-> Wo Keplr sika kotoku mu sika bɛkɔ fam bere a bere kɔ so no


Sɛ wo balance no sua a, Akash bɛ auto-close wo deployment no. **Top up wo wallet bere ne bere mu** anaa hyehyɛ alerts.

### Ɛka a Wɔtew So

-> **Fa Testnet** di dwuma ma sɔhwɛ a ɛnyɛ nea wɔyɛ (50% a ne bo yɛ mmerɛw)

-> **Lower CPU/memory** sɛ wo nhia fast sync a

-> **Paw wɔn a wɔde ma a ne bo yɛ mmerɛw** (ɛnyɛ nyansa bere nyinaa - bere a wɔde yɛ adwuma ho hia)

-> **Fa USDC di dwuma mmom sen AKT** sɛ AKT bo yɛ nea ɛsakra (ɛhwehwɛ sɛ SDL bo sesa)

-> **Disable txindex** sɛ wo nhia a (ɛkora ~ 20% storage)


### Nneɛma Afoforo a Wɔde Yɛ Adwuma

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Nsɛmma Nhoma**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash Nhwehwɛmufo**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Akasakasa**: [https://discord.akash.network](https://discord.akash.network) (ma nsɛm a ɛfa ɔdemafo ho) .

## Nsɛm a Etwa To

- **Persistent storage matters.** Mma ntwa *persistent: nokware* anaa fa *beta2* adesua no nni dwuma. Fa *beta3* di dwuma.
- **Mfiase sync no yɛ brɛoo.** Nya abotare. Eyi yɛ ade a ɛfata ma blockchain nodes.
- **Ma wo sika kotoku no sie.** Deployments auto-close bere a AKT asa wo.
- **Backups arent automatic.** Sɛ wo dwene data no ho a, fa no sɛ ebetumi ayera na yɛ nhyehyɛe sɛnea ɛfata.
- **RPC ahobanbɔ ho hia.** Mfa RPC nkɔ intanɛt so a wonni ahobammɔ ho nhyehyɛe a ɛfata.
- **zcash-params yɛ cached.** Di kan tu mmirika downloads ~2GB cryptographic parameters. Eyi yɛ ade a ɛfata na ɛba pɛnkoro pɛ.
