# BTCPay Server na nkwado Zcash: Nduzi zuru ezu maka ntinye na njikọta

BTCPay Server na-enye azụmahịa n'ịntanetị ohere ịnakwere Kwụọ ụhwọ cryptocurrency ozugbo, na-enweghị ndị etiti ma ọ bụ ndị na-elekọta ego. Nduzi a na-akọwa usoro zuru ezu iji hazie BTCPay Server na nkwado ala maka Kwụọ ụhwọ nke e chebere echebe Zcash.

> Akwụkwọ a lekwasịrị anya na ijikọta Zcash n'ime instance BTCPay Server gị.  
> Ọ na-akwado ma nhazi **full node (Zebra)** na nke dabere na **lightwalletd**.

---

## Tebụl ọdịnaya

- [Gịnị mere a ga-eji BTCPay Server na Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Otu BTCPay Server si arụ ọrụ](#How-BTCPay-Server-Works)
- [Ebee ka e debe ego? Ònye na-achịkwa mkpịsị igodo nzuzo?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Otu esi ahazi BTCPay Server iji nakwere Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Ịwụnye BTCPay Server na nkwado Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Ịgba full node Zcash nke gị (Zebra + lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Ijikọọ na node lightwalletd dị n'èzí (nhazi omenala)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Ịnabata BTCPay Server n'ụlọ site na Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Ịhazi plugin Zcash n'ime web interface BTCPay Server](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Ijikọta BTCPay Server na weebụsaịtị gị](#Integrating-BTCPay-Server-with-Your-Website)
  - [Njikọta API](#API-Integration)
    - [Ịmepụta API Key](#Generating-an-API-Key)
    - [Ọmụmatụ: Ịmepụta invoice site na API](#Example-Creating-an-Invoice-via-API)
    - [Ịhazi webhook](#Setting-Up-a-Webhook-Optional)
  - [Njikọta CMS](#CMS-Integration)
  - [Bọtịnụ Kwụọ ụgwọ ma ọ bụ Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Mmechi](#Conclusion)
- [Akụrụngwa](#Resources)


---

## Gịnị mere a ga-eji BTCPay Server na Zcash

Azụmahịa n'ịntanetị na-anabata cryptocurrency nke ukwuu ugbu a. Ọ dị ngwa, ọ na-arụ ọrụ n'ụwa niile, ọ dịghịkwa achọ ụlọ akụ. Nke a na-abara ma ndị ahịa na ndị na-azụ ahịa uru. Ma e nwere nkọwa dị mkpa ọtụtụ mmadụ na-eleghara anya.

Mgbe ị na-enye iwu, onye ahịa na-enyekarị ozi nke ya: aha, adreesị mbupu, na nọmba ekwentị. Ọ bụrụ na ejiri blockchain ọha kwụọ ụgwọ — dịka Bitcoin, Ethereum, ma ọ bụ stablecoin dị na Ethereum ma ọ bụ Tron — Azụmahia ahụ ga-adịgide ka mmadụ nwee ike ịhụ ya ma nyochaa ya.

Onye ọ bụla, ọbụna na-enweghị ịma ihe e nyere iwu, nwere ike:

- ịhụ mgbe na ego ole a kwụrụ  
- soro ebe ego si na ebe ọ gara  
- jikọta Adreesị akpa ego cryptocurrency na ezigbo mmadụ ma ọ bụrụ na e nwere ebe njikọ ọ bụla (dịka ọmụmaatụ, email ma ọ bụ aha mbupu furu efu)

Nke a pụtara na otu ịzụta nwere ike ikpughe akụkọ ego onye ahịa dum.

Ọ na-arụkwa ọrụ n'ụzọ ọzọ. Ọ bụrụ na Adreesị akpa ego onye na-ere ahịa apụtala na chain, a na-ekpughe ya. Ndị asọmpi na ndị na-ekiri ihe ndị ọzọ nwere ike iso olu Kwụọ ụhwọ, ọrụ ndị na-eweta ngwaahịa, na nhazi nke usoro azụmahịa.

### Njikọ nke BTCPay Server na Zcash nwere ike idozi nke a.


BTCPay Server bụ usoro n'efu na decentralized maka ịnata Kwụọ ụhwọ cryptocurrency.  
Ọ bụghị onye etiti Kwụọ ụhwọ, ọ dịghịkwa ejide ego ọ bụla. Kwụọ ụhwọ niile na-aga ozugbo n'e-akpa ego onye na-ere ahịa.  
Nke a nwere ike ịbụ e-akpa ego nkeonwe ma ọ bụ nhazi multisig n'ime otu nzukọ.

Sava ahụ na-arụ ọrụ nhazi ndị a:

- na-emepụta Adreesị akpa ego pụrụ iche maka iwu ọ bụla  
- na-enyocha mgbe a natara Kwụọ ụhwọ ma jikọta ya na iwu ahụ  
- na-ewepụta nnata na ọkwa  
- na-enye onye ahịa interface Kwụọ ụhwọ  

Ihe niile na-agba n'okpuru nchịkwa onye nwe ụlọ ahịa, na-enweghị ịdabere n'ọrụ ndị ọzọ.

Zcash bụ cryptocurrency e wuru na zero-knowledge proofs. Ọ na-akwado ụdị Azụmahia nke Nzuzo zuru oke.  
Mgbe ejiri Adreesị akpa ego nke e chebere echebe (nke a ga-akpọ naanị “Adreesị akpa ego” n'azụ ebe a), a naghị ekpughe onye zitere ego, onye natara ya, na ego Azụmahia ahụ na blockchain.

Maka ụlọ ahịa n'ịntanetị, nke a pụtara:

- Onye zụrụ ihe nwere ike mezue Kwụọ ụhwọ n'ekpugheghị akụkọ ego ya  
- Onye na-ere ihe na-anata Kwụọ ụhwọ n'ekpugheghị Adreesị akpa ego ya, olu ahịa ya, ma ọ bụ nhazi Azụmahia ya  
- Ọ nweghị onye na-ekiri ihe n'èzí nwere ike ijikọta Kwụọ ụhwọ ahụ na iwu ahụ ma ọ bụ na data onye ahịa

### Ọmụmatụ bara uru

Onye ọrụ na-enye iwu wee họrọ Bitcoin ma ọ bụ USDT dị ka usoro Kwụọ ụhwọ.  
Weebụsaịtị ahụ na-emepụta Adreesị akpa ego Kwụọ ụhwọ ma gosi ego ahụ.  
Mgbe emechara Kwụọ ụhwọ, a na-echekwa Adreesị akpa ego a na blockchain ma ọ bụrụ nke ọha.  
Onye mwakpo chọrọ naanị ijikọta otu iwu na Adreesị akpa ego ahụ iji nwee ike ịhụ akụkọ Azụmahia ya dum ogologo oge.

Ugbu a, chee otu ọnọdụ ahụ n'echiche na Zcash.  
BTCPay Server na-emepụta Adreesị akpa ego nke e chebere echebe. Onye zụrụ ihe na-eziga Kwụọ ụhwọ ahụ.  
N'anya blockchain, ọ dịghị ihe na-eme. Ọ nweghị data ọha a ga-enyocha.  
Sava ahụ na-anata nkwenye, jikọta ya na iwu ahụ, ma mezue usoro ahụ.

Nye onye ọ bụla nọ n'èzí, ọ dị ka ọ nweghị ihe mere.  
Echiche niile na-anọgide n'etiti ụlọ ahịa na onye ahịa — dịka o kwesiri ịdị.

Ngwọta a anaghị emebi automation ma ọ bụ mfe iji ya.  
Ihe niile na-arụ ọrụ dịka cryptocurrency ndị ọzọ, naanị na-enweghị ihe ize ndụ nke ntapu data.



## Otu BTCPay Server si arụ ọrụ

BTCPay Server na-arụ ọrụ dịka bridge nhazi Kwụọ ụhwọ n'etiti platform e-commerce gị na blockchain. Nke a bụ otu usoro ahụ si arụ ọrụ:

1. **Onye ahịa na-enye iwu** na weebụsaịtị gị (dịka ọmụmaatụ WooCommerce, Magento, ma ọ bụ platform ọ bụla nwere njikọta BTCPay).

2. **Ụlọ ahịa ahụ na-arịọ invoice Kwụọ ụhwọ** n'aka BTCPay Server. Sava ahụ na-emepụta invoice pụrụ iche nke nwere:
   - Ego iwu ahụ
   - Timer ọgụgụ ala
   - Unified Address (UA) Zcash — dịka ọmụmaatụ, `u1...` — nke gụnyere receiver Orchard (nke e chebere echebe) na ndabara.

3. **Onye ahịa ahụ na-ahụ ibe Kwụọ ụhwọ** wee ziga ZEC na Adreesị akpa ego e nyere.

4. **BTCPay Server na-enyocha blockchain**, na-enyocha Kwụọ ụhwọ ahụ megide:
   - Ego a tụrụ anya ya
   - Adreesị akpa ego nnata
   - Oge e kere invoice ahụ

5. **Ozugbo achọpụtara ma kwadoro Azụmahia ahụ**, BTCPay na-agwa ụlọ ahịa ahụ.

6. **Onye ahịa ahụ na-anata nkwenye Kwụọ ụhwọ.** Ọ bụrụ na achọrọ, sava ahụ nwere ike iziga nnata site na email.

Usoro a dum na-eme **na-akpaghị aka**, na-enweghị ndị etiti ma ọ bụ ndị na-elekọta ego.  
BTCPay Server **anaghị ejide ego ọ bụla** — ọ na-ejikọta naanị usoro iwu na blockchain n'enweghị nsogbu na n'ụzọ Nzuzo.
## Ebee ka e debe ego? Ònye na-achịkwa mkpịsị igodo nzuzo?

BTCPay Server **abụghị** e-akpa ego, ọ **dịghịkwa achọ mkpịsị igodo nzuzo**.  
Ego niile na-aga **ozugbo** n'e-akpa ego onye na-ere ahịa. A na-echekwa nchekwa site n'iji **ụlọ nrụpụta dabere na viewing key**.

### Otu ọ si arụ ọrụ

- **A na-emepụta e-akpa ego tupu oge eruo.**  
  Onye na-ere ahịa na-eji e-akpa ego Zcash na-akwado viewing key — dịka [Zkool](https://github.com/hhanh00/zkool2/) ma ọ bụ [Zingo! Wallet](https://zingolabs.org/).  
  Ndepụta zuru oke dị na [ZecHub.wiki](https://zechub.wiki/wallets).

- **BTCPay Server na-ejikọ site na viewing key.**  
  Viewing key bụ **mkpịsị igodo naanị maka ịgụ**: ọ nwere ike ịchọpụta Kwụọ ụhwọ na-abata ma mepụta Adreesị akpa ego nnata ọhụrụ,  
  mana ọ nweghị ike imefu ego. Sava ahụ anaghị echekwa Mkpuru mgbake ma ọ bụ mkpịsị igodo nzuzo.

- **A na-enweta data blockchain site na sava `lightwalletd`.**  
  Ị nwere ike iji node ọha dịka `https://zec.rocks`, ma ọ bụ gbaa stack `Zebra + lightwalletd` nke gị maka ọbụbụeze zuru oke.

- **Iwu ọ bụla na-enweta Adreesị akpa ego pụrụ iche.**  
  Viewing key na-enye sava ahụ ohere ịmepụta Adreesị akpa ego Zcash nke e chebere echebe ọhụrụ maka invoice ọ bụla,  
  na-eme ka nleba Kwụọ ụhwọ dị nchebe ma gbochie iji Adreesị akpa ego ọzọ.

- **Ị na-edobe nchịkwa zuru oke n'elu ego ahụ.**  
  Ọ bụrụgodị na e mebiri sava ahụ, ọ nweghị onye nwere ike izuru ego gị — naanị metadata Kwụọ ụhwọ ka a pụrụ ikpughe.

Nhazi a na-ekewa **infrastructure** na **nchịkwa akụ**.  
Ị nwere ike imelite, kwaga, ma ọ bụ tinyegharịa BTCPay Server n'itinyeghị ego ọ bụla n'ihe ize ndụ.

## Otu esi ahazi BTCPay Server iji nakwere Zcash

N'akụkụ ndị gara aga, anyị kọwara otu BTCPay Server si arụ ọrụ na Zcash na ihe mere o ji dị mkpa maka Kwụọ ụhwọ na-echekwa Nzuzo. Ugbu a ọ bụ oge ịmalite ime ya n'onwe gị.

Nhazi gị kpọmkwem ga-adabere n'ọtụtụ ihe:

- Ị nwere instance BTCPay Server ugbua?
- Ị chọrọ iji lightwalletd ọha ma ọ bụ gbaa full node nke gị?
- Sava ahụ ọ̀ ga-agba na VPS ma ọ bụ n'ụlọ?

Isiakwụkwọ a na-ekpuchi ọnọdụ nhazi niile ugbu a — site na nhazi kacha nta ruo na deployments nwere ọbụbụeze zuru oke.

Anyị ga-agafe ihe ndị a:

- Otu esi ewụnye ihe niile site na mmalite na VPS, gụnyere full node (Zebra)
- Otu esi agba BTCPay Server n'ụlọ ma zoo IP gị site na iji **Cloudflare Tunnel**
- Otu esi eme ka nkwado Zcash rụọ ọrụ ma hazie ya n'ime web interface BTCPay Server
- Otu esi ejikọta BTCPay na weebụsaịtị gị ma ọ bụ ụlọ ahịa n'ịntanetị


## Ịwụnye BTCPay Server na nkwado Zcash

Ka anyị gaa n'ihu na nhazi n'ezie. N'akụkụ a, anyị ga-etinye BTCPay Server na nkwado Zcash — ma na VPS ọhụrụ ma ọ bụ site n'ịgbakwunye nkwado ZEC na instance dị adị.

Ọ bụrụ na ị nweela BTCPay Server na-agba (dịka ọmụmaatụ maka BTC ma ọ bụ Lightning), ịkwesighi itinyegharịa ihe niile — naanị mee ka plugin ZEC rụọ ọrụ.

Anyị ga-agafe nhazi dị iche iche, site na nhazi kacha nta na-eji node `lightwalletd` ọha ruo na ntinye nwere ọbụbụeze zuru oke na full node nke gị.  
Nhọrọ kacha mma dabere na ebe sava gị dị na ole nnwere onwe ị chọrọ n'aka infrastructure dị n'èzí.

> Akwụkwọ plugin gọọmenti:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Ịdọ aka ná ntị — otu e-akpa ego maka instance ọ bụla:**  
> Plugin Zcash na-eji **otu e-akpa ego e kesara** n'ofe **ụlọ ahịa niile** na instance BTCPay.  
> Ọ bụrụ na ị nabata ọtụtụ ụlọ ahịa onwe ha na otu instance, ha ga-ekekọrịta otu e-akpa ego Zcash.  
> Jiri instance dị iche iche ma ọ bụrụ na ịchọrọ nkewapụ e-akpa ego siri ike.

---

### Nhazi VPS akwadoro

Tupu itinye ya, gbaa mbọ hụ na i nwere:

- VPS nwere **Ubuntu 22.04+**
- Aha domain na-atụ aka na Adreesị IP sava gị (site na DNS)
- `git`, `docker`, na `docker-compose` etinyere
- Ikike SSH ịbanye na sava

---

## Ịkwadebe sava gị (akụkụ zoro ezo)

<details>
  <summary>Pịa ka ịgbasa</summary>

Iji ewụnye BTCPay Server na nkwado Zcash, ị ga-achọ ihe ndị a:

### 1. VPS nwere Ubuntu 22.04 ma ọ bụ nke ọhụrụ

Anyị na-akwado iji ntinye kacha nta nke **Ubuntu Server 22.04 LTS**.  
Onye na-eweta VPS ọ bụla na-enye Adreesị IP pụrụ iche ga-arụ ọrụ.  

**Ihe kacha nta achọrọ**:  
- CPU cores 2  
- RAM 4 GB  
- Oghere diski 40 GB  

Nhazi a ezuola ma ọ bụrụ na ị na-eji lightwalletd maka Zcash.  
Ọ bụrụ na ị bu n'obi ịgba **full node Zcash**, ị ga-achọ **opekata mpe 300 GB** nke ohere diski efu.

---

### 2. Aha domain na-atụ aka na sava gị

Na dashboard onye na-eweta DNS gị, mepụta record `A` maka subdomain  
(dịka ọmụmaatụ, `btcpay.example.com`) nke na-atụ aka na Adreesị IP VPS gị.  

A ga-eji domain a nweta BTCPay Server site na browser  
nakwa iji mepụta **SSL certificate n'efu** na-akpaghị aka site na Let's Encrypt.

---

### 3. Ikike SSH ịbanye na sava

Iji tinye BTCPay Server, ị ga-ejikọrịrị na VPS gị site na SSH.  
Site na terminal gị, gbaa:

`ssh root@YOUR_SERVER_IP`

Ọ bụrụ na ị na-eji macOS, Linux, ma ọ bụ WSL na Windows, SSH adịlarị na terminal.
Na Windows nkịtị, jiri SSH client dịka **PuTTY**.

---

### 4. Tinye Git, Docker, na Docker Compose

Ozugbo ejikọrọ site na SSH, melite packages sistemụ gị ma tinye akụkụ ndị achọrọ:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Na Ubuntu 22.04 na nke ọhụrụ, `docker-compose` sitere na APT adịghịzi akwado.
> Package akwadoro bụ `docker-compose-plugin`, nke na-enye iwu `docker compose` (rịba ama oghere kama dash).

Ebe sava gị dịla njikere ugbu a maka itinye BTCPay Server.

</details>

---

### Nzọụkwụ 1: Clone Repository

Mepụta working directory ma budata deployment BTCPay Server Docker:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Nzọụkwụ 2: Mbupụ mgbanwe gburugburu

Dochie `btcpay.example.com` na domain gị n'ezie:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Ọ bụrụ na ị bu n'obi itinye Monero ma ọ bụ Litecoin ma emechaa, ị nwere ike itinye ha ugbu a:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Ị nwere ike itinye coins ọhụrụ oge ọ bụla site n'ịbupụ mgbanwe kwesịrị ekwesị ma gbaa script nhazi ahụ ọzọ:

`. ./btcpay-setup.sh -i`

Maka nduzi a, anyị ga-elekwasị anya naanị na **Zcash**.

---

### Nzọụkwụ 3: Gbaa installer

Gbaa script nhazi ahụ iji wuo ma malite sava ahụ:

`. ./btcpay-setup.sh -i`

Script ahụ ga-etinye dependencies, mepụta `docker-compose.yml`, malite services, ma hazie `systemd`.
Nke a na-ewe ihe dị ka nkeji 5.

Ozugbo emechara, instance BTCPay Server gị ga-adị na:

`https://btcpay.example.com`

> Ọ bụrụ na ị na-agbanwe ntinye dị adị (dịka ọmụmaatụ, na-agbakwunye ZEC), gbaa mbọ kwụsị ma malite sava ahụ ọzọ site na settings ọhụrụ:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Mgbe ahụ gaa n'akụkụ na-esote iji hazie Zcash n'ime web interface BTCPay Server.

## Ịgba Zcash Full Node Nke Gị Onwe Gị

Ọ bụrụ na ị họrọ **ịghara** ịdabere na node `lightwalletd` ọha, ị nwere ike ibunye full node Zcash nke gị tinyere lightwalletd n'otu sava ahụ.  
Nke a na-enye gị **nnwere onwe zuru ezu** - enweghị ndabere mpụga, ọ nweghị ntụkwasị obi a chọrọ.

---

### Nzọụkwụ 1: Gbaa Mbọ na E Nwere Oghere Disk Zuru Ezu

Full node Zcash (Zebra + lightwalletd) chọrọ ugbu a **300+ GB** nke oghere disk, ọ ka na-etokwa.

Nkọwa:

- Ebe nchekwa data blockchain Zebra: ~260-270 GB
- Ịdepụta ndeksi lightwalletd: ~15-20 GB

#### Ebe nchekwa akwadoro:

- **400 GB+** ma ọ bụrụ na a na-eji sava ahụ **naanị** maka Kwụọ ụgwọ Zcash
- **800 GB+** ma ọ bụrụ na sava ahụ na-agbakwa BTCPay Server, PostgreSQL, Nginx, wdg.

> Ọ ka mma iji SSD/NVMe disk nke nwere **ikike 1 TB**, karịsịa ma ọ bụrụ na ị naghị eme atụmatụ ihichapụ data ochie mgbe niile.

---

### Nzọụkwụ 2: Tọọ Mgbanwe Gburugburu

Tinye ihe ndị a na nhazi gburugburu gị iji mee ka nhazi full node rụọ ọrụ:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Nke a ga-agụnye iberibe `zcash-fullnode`, nke na-amalite ma `zebrad` na `lightwalletd` n'ime BTCPay Server.

---

### Nzọụkwụ 3: Gbaa Onye Wụnye Ya Ọzọ

`. ./btcpay-setup.sh -i`

Skript ahụ ga-eme:

* Budata onyonyo Docker maka Zebra na lightwalletd
* Hazie ọrụ ndị dị n'ime BTCPay stack
* Jikọọ plugin Zcash na ihe atụ `lightwalletd` **nke mpaghara**

> **Mmekọrịta blockchain zuru ezu nwere ike iwe ọtụtụ ụbọchị**, karịsịa na sava VPS nwere obere akụrụngwa.
> Ruo mgbe mmekọrịta gwụchara, Kwụọ ụhwọ nke e chebere echebe agaghị adị.

## Ijikọ na Node lightwalletd Mpụga

N'ọtụtụ ọnọdụ, nnwere onwe zuru ezu adịghị mkpa - ndị ahịa nwekwara ike ha achọghị itinye oge na oghere disk n'ịgba full node Zcash.  
Site na ndabara, BTCPay Server na-ejikọ na node `lightwalletd` ọha iji jikwaa Kwụọ ụhwọ nke e chebere echebe n'ebughị blockchain niile.

Endpoint ndabara bụ:

`https://zec.rocks:443`

Otú ọ dị, ị nwere ike ịhazi BTCPay Server ka ọ jikọọ na **node `lightwalletd` mpụga ọ bụla**, dịka:

`https://lightwalletd.example:443`

Akụkụ a na-egosi otu esi eme nke ahụ site na iji **iberibe Docker omenala**.

> Ihe atụ nhazi zuru ezu nwere mgbanwe gburugburu niile dị na ebe nchekwa plugin [](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Nzọụkwụ ndị dị n'okpuru na-egosi nhazi kacha nta na-arụ ọrụ.

---

### Nzọụkwụ 1: Mepụta Iberibe Docker Omenala

N'ime ndekọ ọrụ BTCPayServer gị, mepụta faịlụ iberibe omenala:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Tinye ọdịnaya ndị a:

```
exclusive:
- zcash
```

Ntụziaka `exclusive` na-ahụ na naanị otu iberibe nwere otu akara (`zcash` n'ọnọdụ a) nwere ike ịrụ ọrụ n'otu oge.
Nke a na-egbochi esemokwu nhazi - dịka ọmụmaatụ, ị gaghị agba ma iberibe `zcash-fullnode` na iberibe `lightwalletd` mpụga omenala a n'otu oge.
Site n'ịka ya dị ka `exclusive: zcash`, BTCPay Server ga-eme ka containers ndabara `zcash-fullnode` na nke ime `lightwalletd` kwụsị na-akpaghị aka, na-enye gị ohere ijikọ na node mpụga nke gị kama.

---

### Nzọụkwụ 2: Tọọ Mgbanwe Gburugburu

N'ime terminal:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Nzọụkwụ 3: Kọwaa Adreesị Node Mpụga

Mepee faịlụ `.env` gị:

`nano .env`

Tinye ahịrị ndị a, dochie URL ahụ na endpoint ị họrọ:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Ị nwere ike iji:

* **Node ọha**, dịka `https://zec.rocks:443`
* Node nke gị ị nabatara n'onwe gị, ebunyere iche na BTCPay Server

> Ọ bụrụ na `lightwalletd` mpụga adịghịzi ma ọ bụ buru oke ibu, Kwụọ ụhgwọ nke e chebere echebe ga-ada.
> Maka ọrụ ndị dị mkpa, họrọ **endpoint kwụsiri ike ma nwalegoro** (dịka ndabara `zec.rocks`).

> Ị chọrọ ịnabatara `lightwalletd` n'onwe gị?
> Ị nwere ike iji `docker-compose.lwd.yml` sitere na ebe nchekwa [Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Ịdọ aka ná ntị:** Edebeghị nhazi a n'akwụkwọ n'ụzọ gọọmenti, ọ na-achọkwa nhazi TLS nke aka, ibugharị port, na nhazi firewall - akwadoro ya naanị maka ndị ọrụ dị elu.

---

### Nzọụkwụ 4: Gbaa Onye Wụnye Ya Ọzọ

`. ./btcpay-setup.sh -i`

BTCPay Server ga-etinye nhazi omenala gị n'ọrụ ma jikọọ na node `lightwalletd` akọwapụtara.

Site ugbu a gaa n'ihu, plugin Zcash ga-eji endpoint mpụga ahụ jikwaa Azụmahia nke e chebere echebe.

## Ịnabata BTCPay Server N'ụlọ Site na Cloudflare Tunnel

Ị chọrọ ịnara Kwụọ ụhgwọ Zcash mgbe ị na-anabata BTCPay Server na ngwaọrụ ụlọ - dịka Raspberry Pi 5 ma ọ bụ sava mpaghara ọ bụla **na-enweghị static IP**?  
Ị nwere ike ikpughe ihe atụ gị n'ịntanetị n'enweghị nsogbu site na iji **Cloudflare Tunnel**.

Usoro a na-ezere ibugharị port ma na-ezochi ezigbo adreesị IP gị n'aka ọha - ebe sava gị ka na-adị site na HTTPS.

Ọ na-enyekwa gị aka **izere ụgwọ ịgbazite VPS**, nke dị mma ma ọ bụrụ na Kwụọ ụhgwọ cryptocurrency bụ nhọrọ kama ịbụ isi azụmahịa gị.

---

### Nzọụkwụ 1: Wụnye Cloudflare Tunnel

1. Mepụta akaụntụ na [cloudflare.com](https://www.cloudflare.com) ma tinye domain gị.
2. Na **sava ụlọ** gị, wụnye Cloudflare Tunnel site na ebe nchekwa package gọọmenti Cloudflare:

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install cloudflared
```

Ọ bụrụ na `apt install cloudflared` ada, wụnye `.deb` kwekọrọ kama:

```bash
# Raspberry Pi / ARM64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared.deb
```

```bash
# x86_64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

3. Jiri Cloudflare nyochaa njirimara:

`cloudflared tunnel login`

Iwu a ga-emepe windo nchọgharị. Banye ma nye ikike ịnweta domain gị.
Cloudflare ga-emepụta faịlụ `credentials` nwere token na sava gị na-akpaghị aka.

4. Mepụta tunnel ọhụrụ (ị nwere ike ịkpọ ya `btcpay` ma ọ bụ aha ọ bụla ọzọ):

`cloudflared tunnel create btcpay`

Nke a na-emepụta faịlụ `btcpay.json` nwere ID tunnel na nzere - ị ga-achọ ya na nzọụkwụ na-esote.

---

### Nzọụkwụ 2: Mepụta Faịlụ Nhazi Tunnel

Mepụta ndekọ nhazi ahụ (ma ọ bụrụ na ọ dịbeghị) ma mepee faịlụ config:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Mado nhazi ndị a:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Nkọwa:

* `tunnel` - aha tunnel ị mepụtara na mbụ
* `credentials-file` - ụzọ faịlụ token e mepụtara n'oge `cloudflared tunnel login`
* `hostname` - domain gị edebanyere na Cloudflare (dịka ọmụmaatụ, `btcpay.example.com`)
* `service` - adreesị mpaghara nke BTCPay Server gị (na-abụkarị `http://127.0.0.1:80` maka Nginx)

> Cloudflare ga-ebufe okporo ụzọ n'enweghị nsogbu gaa na sava mpaghara gị, na-ekpugheghị IP ụlọ gị.

### Nzọụkwụ 3: Tinye DNS Record Maka Tunnel Gị

Mgbe emepụtara tunnel ahụ, Cloudflare ga-adịkarị **tinye CNAME DNS record na-akpaghị aka** maka domain gị. Ọ kwesịrị ịdị ka nke a:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Ọ bụrụ na ọ pụtaghịghị na-akpaghị aka, tinye ya n'aka:

1. Gaa na [Cloudflare Dashboard](https://dash.cloudflare.com/) gị
2. Gaa na ngalaba **DNS**
3. Tinye CNAME record ọhụrụ:
   - **Aha**: `btcpay`
   - **Ebe e lekwasịrị anya**: `<UUID>.cfargotunnel.com`  
     Ị nwere ike ịchọta uru kpọmkwem n'ime faịlụ `btcpay.json` gị ma ọ bụ site n'ịgba:
     
     `cloudflared tunnel list`
     
   - **Ọnọdụ proxy**: Enyere ọrụ (igwe ojii oroma)

> Record a na-ahụ na arịrịọ niile gaa na `btcpay.example.com` na-agafe Cloudflare Tunnel, na-ezochi ezigbo adreesị IP gị n'aka ọha.

---

### Nzọụkwụ 4: Mee Ka Tunnel Rụọ Ọrụ Mgbe Sistem Bidoro

Iji mee ka tunnel na-agba na-akpaghị aka mgbe sistem bidoro, wụnye ya dị ka ọrụ sistem:

`sudo cloudflared service install`

Wee mee ka ọrụ ahụ rụọ ọrụ ma malite ya:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Lelee ọnọdụ:

`sudo systemctl status cloudflared`

Ị kwesịrị ịhụ ozi dịka `Active: active (running)` na nkwenye na `btcpay.example.com` nọ n'ịntanetị.

> Site ugbu a gaa n'ihu, tunnel ga-amalite na-akpaghị aka n'oge reboot ọ bụla, BTCPay Server gị ga-adịkwa n'ihu ọha - na-enweghị ibugharị port na-ekpugheghị ezigbo IP gị.

---

### Nzọụkwụ 5: Mechaa Nhazi BTCPay Server

Ọ bụrụ na ị na-achọ ịwụnye BTCPay Server maka oge mbụ, tọọ domain gị tupu ịgba skript nhazi:

`export BTCPAY_HOST="btcpay.example.com"`

Nke a na-ahụ na a na-eji domain ziri ezi mgbe a na-emepụta **nhazi Nginx** na **asambodo SSL**.

Ọ bụrụ na arụnyelarị BTCPay Server ma ị na-agbakwunye tunnel naanị:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Nhazi ahụ ga-emepụta configs ọzọ ma tinye domain ọhụrụ n'ọrụ.
Ị ga-enwe ike ịnweta sava gị ugbu a na:

`https://btcpay.example.com`

> Ma ị na-eji `lightwalletd` ọha ma ọ bụ full node nke gị, nke a anaghị emetụta tunnel.
> Ihe naanị dị mkpa bụ na BTCPay Server na-ege ntị na `127.0.0.1:80` n'ime mpaghara.

## Ịhazi Plugin Zcash na Web Interface BTCPay Server

> **Ihe dị mkpa maka nhazi ọtụtụ ụlọ ahịa:**  
> E-akpa ego Zcash a haziri ebe a bụ nke **ụwa niile** maka ihe atụ ahụ. Ụlọ ahịa niile ga-eji e-akpa ego a, ma ọ bụrụ na ị naghị agba ihe atụ BTCPay dị iche iche.

Mgbe ị bunyere ihe atụ BTCPay Server gị nke ọma, ị ga-achọ ime nhazi ụfọdụ dị mkpa site na admin web interface.  
Akwụkwọ gọọmenti na-enye ntụziaka zuru ezu n'asụsụ Bekee - ebe a, anyị ga-agafe nzọụkwụ ndị dị mkpa ma lekwasị anya kpọmkwem n'ịhazi plugin Zcash.

---

### Nzọụkwụ 1: Banye na Web Interface

Gaa na ihe atụ gị na:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Tinye nbanye onye nchịkwa na paswọọdụ gị.
- Ọ bụrụ na nke a bụ oge mbụ ị na-abanye, a ga-agwa gị ka ịmepụta akaụntụ.
- Akaụntụ mbụ ị debanyere aha ga-enweta ikike onye nchịkwa na-akpaghị aka.

---

### Nzọụkwụ 2: Wụnye Plugin Zcash

1. Na menu isi, gaa na:

`Plugins -> Browse Plugins`

2. Chọta plugin **Zcash (ZEC)**. Jiri ogwe ọchụchọ ma ọ bụrụ na ọ dị mkpa.
3. Pịa **Wụnye** ma kwado.

> Tinyegharịa usoro a maka altcoins ọ bụla ọzọ ị mere ka ọ rụọ ọrụ n'oge nhazi sava.

Mgbe echichi gasịrị, pịa **Malitegharia Sava** iji bulite interface ahụ ọzọ na plugins na-arụ ọrụ.

### Nzọụkwụ 3: Jikọọ E-akpa Ego Gị Site na Viewing Key

Mgbe ị wụnyesịrị plugin ahụ, ngalaba **Zcash** ọhụrụ ga-apụta na menu ntọala.

1. Gaa na:

`Zcash -> Settings`

2. Mado **Unified Full Viewing Key (UFVK)** gị - BTCPay ga-enweta Unified Address maka invoice ọ bụla ma chọpụta Kwụọ ụhgwọ nke e chebere echebe na-abata.

> **Rịba ama:** A na-akwado viewing key Sapling ochie, mana iji Orchard/Unified Addresses, ị ga-enye **UFVK**.

   Ụdị ihe atụ:

`uview184syv9wftwngkay8d...`

3. Tinye uru n'ọhịa Block height

* **Nhazi oge mbụ nwere e-akpa ego ọhụrụ (Mkpuru mgbake ọhụrụ):** tinye ogo block Zcash ugbu a (ị nwere ike ịlele ya na 3xpl.com/zcash) - nke a na-eme ka nyocha mbụ dị ngwa.
* **Ịkwaga n'otu sava site na nhazi ochie naanị Sapling gaa na Unified Addresses / Orchard:** hapụ oghere a ka ọ ghara inwe ihe.
* **Ịkwaga ụlọ ahịa gị gaa na sava ọhụrụ nwere otu e-akpa ego/UFVK ahụ:** nhọrọ, tinye ogo ọmụmụ - ogo dị nso nke iwu mbụ a kwụrụ n'ụlọ ahịa gị (daba ụbọchị iwu ahụ na 3xpl iji mee ka nyocha ahụ dị warara). Ọ bụrụ na ị maghị, hapụ ya ka ọ ghara inwe ihe.

> Ọ bụghị e-akpa ego niile na-akwado mbupụ **Unified Full Viewing Key (UFVK)** ugbu a.  
> Nhọrọ akwadoro:  
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! Wallet (ụdị maka PC)**](https://zingolabs.org/)  
> N'ime ngwa abụọ ahụ, chọọ mbupụ UFVK na ngalaba backup/mbupụ.

Igodo ndị a na-akwado **mgbanwe adreesị na-akpaghị aka**, nke pụtara:
- Onye ahịa ọ bụla na-enweta adreesị Kwụọ ụhgwọ **pụrụ iche**
- Ị na-ahụ otu nguzozi **jikọtara ọnụ**

Ị nwere ike ịchọta ndepụta ndakọrịta sara mbara na [ZecHub -> Wallets](https://zechub.wiki/wallets).

Ozugbo juputara n'ọhịa niile, pịa **Chekwaa**.

---

### Nwale Usoro Kwụọ Ụgwọ ZEC Gị

Ekele - e-akpa ego Zcash gị ejikọọla na BTCPay Server.

Ka anyị mee nnwale:

1. Gaa na:

`Invoices -> Create New`

2. Mepụta invoice nnwale maka obere ego na ZEC.
3. Zipu ego site na **e-akpa ego ọzọ** (ọ bụghị nke ejikọrọ na BTCPay).
4. Ozugbo achọpụtara Azụmahia ahụ, ibe invoice ga-egosi emume a na-ahụ anya.
5. Kwenye na ọnọdụ invoice gbanwere gaa na **Akwụla**.

Ọ bụrụ na ihe niile arụ ọrụ - ị dịla njikere itinye Kwụọ ụhgwọ ZEC na weebụsaịtị gị site na API ma ọ bụ plugins CMS.

## Ịjikọ BTCPay Server na Weebụsaịtị Gị

Ozugbo ejikọrọ e-akpa ego Zcash gị na BTCPay Server, ị nwere ike ijikọ sistem Kwụọ ụhgwọ ahụ na weebụsaịtị gị.  
E nwere ụzọ dị iche iche isi mee nke a - site na ịnweta API kpọmkwem ruo plugins dị njikere iji maka CMS ndị a ma ama.

---

### Nhọrọ Njikọ

- **Njikọ API**  
  Dị mma maka weebụsaịtị ma ọ bụ sistem e wuru n'onwe ha na-enweghị CMS.  
  Ọ na-enye gị njikwa zuru ezu n'ịmepụta invoice, nleba anya Kwụọ ụhgwọ, na ozi - niile n'ime interface na ezi uche nke gị.  
  Ọ chọrọ ihe ọmụma mmemme bụ isi, ya mere onye mmepụta gị kacha mma ijikwa ọrụ a.

- **Plugins CMS**  
  Dị maka ikpo okwu dịka **WooCommerce**, **PrestaShop**, na ndị ọzọ.  
  Plugins ndị a na-enye gị ohere ịnata Kwụọ ụhgwọ n'ime nkeji ole na ole - enweghị ide koodu achọrọ.

- **Bọtịnụ Kwụọ Ụgwọ ma ọ bụ Iframe**  
  Usoro kacha mfe.  
  Zuru oke maka landing pages, weebụsaịtị nkeonwe, ma ọ bụ saịtị ọ bụla ebe naanị ihe ịchọrọ bụ itinye njikọ onyinye ma ọ bụ widget checkout.

---

### Njikọ API

Ọ bụrụ na ị na-eji ikpo okwu omenala (ma ọ bụ enweghị CMS ma ọlị), API bụ nhọrọ kacha mma.  
Ọ na-enye gị mgbanwe zuru ezu: ị nwere ike ịmepụta invoices, soro ọnọdụ ha, nata ozi, ma jikwaa ahụmịhe onye ọrụ n'ụzọ zuru ezu.

> Rịba ama: Ọbụna ụfọdụ plugins CMS na-eji API n'ime ya, ya mere ịmepụta API key na-abụkarị **nzọụkwụ mbụ achọrọ**, n'agbanyeghị usoro njikọ gị.

Nzọụkwụ ọzọ: mepụta API key maka ụlọ ahịa gị wee malite iji [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) wuo njikọ gị.

### Ịmepụta API Key

Iji jikọọ BTCPay Server na weebụsaịtị ma ọ bụ ngwa gị, ị ga-achọ ịmepụta API key.

1. Banye na BTCPay Server ma mepee **menu onye ọrụ** (akụkụ elu aka nri)
2. Gaa na **API Keys**
3. Pịa **Mepụta API key ọhụrụ**
4. Tinye aha maka key gị
5. Na ngalaba **Ikike**, mee ka ndị a rụọ ọrụ:
   - `Can create invoice`
   - `Can view invoice`
   - *(Nhọrọ)* `Can modify store settings` - naanị ma ọ bụrụ na ịchọrọ njikwa n'ọkwa ụlọ ahịa

6. Pịa **Mepụta**. API key nke gị ga-apụta - detuo ya ma debe ya n'enweghị nsogbu.

> Key a na-enye ohere ịnweta invoices ụlọ ahịa gị.  
> **Ekekọrịtala** ya n'ihu ọha ma ọ bụ kpughee ya na koodu akụkụ onye ahịa.

---

### Ihe Atụ: Ịmepụta Invoice Site na API

**Endpoint:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Arịrịọ body:**

```
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**Nzaghachi:**

Ị ga-enweta JSON object nwere:

* `invoiceId`
* URL Kwụọ ụhgwọ nke ị nwere ike itinye na weebụsaịtị gị ma ọ bụ ziga onye ahịa

Lee akwụkwọ zuru ezu:
[Greenfield API – Mepụta Invoice](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Ịtọlite Webhook (Nhọrọ)

Iji nata ozi ozugbo mgbe ọnọdụ invoice gbanwere (dịka mgbe anabatara Kwụọ ụhgwọ):

1. Gaa na ntọala ụlọ ahịa gị -> **Webhooks**
2. Tinye URL endpoint backend gị nke ga-ejikwa arịrịọ `POST` sitere na BTCPay Server
3. BTCPay ga-eziga ozi na-akpaghị aka mgbe akwụghachiri invoice ma ọ bụ mgbe ọ gwụchara

A kọwara webhook payloads na retry logic n'ime akwụkwọ webhook gọọmenti [](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Ihe atụ njikọ dị maka asụsụ mmemme dị iche iche na docs BTCPay na ebe nchekwa GitHub.

### Njikọ CMS

BTCPay Server na-akwado plugins maka sistem njikwa ọdịnaya (CMS) ndị a ma ama.  
Njikọ toro eto ma jiri ọtụtụ bụ nke **WordPress + WooCommerce**, na-eme ka ọ dị mfe ịnara Kwụọ ụhgwọ ZEC **n'edoghị koodu**.

---

#### WooCommerce (WordPress)

BTCPay Server na-akwado plugin maka WooCommerce n'ụzọ gọọmenti.

Nzọụkwụ iji jikọọ:

1. Wụnye plugin **BTCPay maka WooCommerce** site na ndekọ plugin WordPress ma ọ bụ site na GitHub.
2. Na panel nchịkwa WordPress gị, gaa na:

`WooCommerce -> Settings -> Payments`

3. Chọta **BTCPay** na ndepụta ma pịa **Hazie**
4. Tinye URL BTCPay Server gị ma soro ntụziaka ikikere  
   (a na-akwado ịmepụta API key na-akpaghị aka)
5. Mee ka usoro Kwụọ ụhgwọ rụọ ọrụ ma chekwaa ntọala gị

> Ntụziaka zuru ezu, nkuzi vidio, na nduzi nchọpụta nsogbu dị na akwụkwọ plugin.

Ị ga-ahụkwa nhọrọ njikọ CMS ndị ọzọ n'otu ngalaba ahụ nke docs BTCPay.

---

### Bọtịnụ Kwụọ Ụgwọ ma ọ bụ Iframe (Enweghị CMS ma ọ bụ API Achọrọ)

Ọ bụrụ na ị naghị eji CMS ma ị chọghị ịrụ ọrụ na APIs, ụzọ kachasị mfe isi nata Kwụọ ụhgwọ ZEC bụ **itinye njikọ Kwụọ ụhgwọ ma ọ bụ widget** ozugbo na weebụsaịtị gị.

Usoro a dị mma maka:

- Landing pages
- Saịtị portfolio
- Blọgụ ma ọ bụ ibe static
- Ọrụ na-enweghị sava backend

---

#### Nhọrọ 1: Bọtịnụ Kwụọ Ụgwọ (Njikọ)

1. Na BTCPay Server, jiri aka mepụta invoice na ngalaba **Invoices**
2. Detuo njikọ Kwụọ ụhgwọ, dịka ọmụmaatụ:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Tinye njikọ ahụ na HTML gị:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Nhọrọ 2: Invoice Etinyere (Iframe)

Iji gosipụta invoice ozugbo na saịtị gị, jiri iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Ị nwere ike ihazi bọtịnụ ahụ ma ọ bụ iframe container ka ọ daba na nhazi saịtị gị - BTCPay Server na-enye ohere nhazi theme mgbanwe nke ibe invoice.

## Mmechi

Nduzi a dị ogologo - mana ọ na-ekpuchi naanị akụkụ ntọala nke ijikọ Kwụọ ụhwọ [payments] Zcash na BTCPay Server.

Interface BTCPay Server na-enye ọtụtụ ọrụ karịa ihe anyị gosiri ebe a. Ọ dabara nke ọma, UI dị n'asụsụ dị iche iche (gụnyere Russian), nke na-eme ka ọ dị mfe inyocha ma nwalee ihe ndị ọzọ.

BTCPay bụ ngwá ọrụ na-agbanwe agbanwe nke ukwuu. Ị nwere ike:

* Ịnabata ọtụtụ ụlọ ahịa nọọrọ onwe ha n'otu instance
* Kọwaa ọrụ na ikike omenala maka ndị otu - site n'ile iwu anya naanị ruo n'ọrụ admin zuru ezu
* Jiri domains na branding nke gị
* Hazie webhooks, e-akpa ego ndabere, na ọbụna ohere Tor
* Hazie ntọala dị elu dịka iwu ụtụ isi, koodu mbelata, nhazi peeji checkout, mgbochi usoro Kwụọ ụhwọ, na ndị ọzọ

E wuru BTCPay dịka nhọrọ open-source dochie ndị na-enye Kwụọ ụhwọ centralized. Ọ bụrụ na ị na-achọ ịnakwere Kwụọ ụhwọ nke onwe ZEC na-enweghị ndị etiti, ikpo okwu a kwesịrị n'ezie ka ị lebara ya anya.

Anyị na-achọ ka ị nwee ihe ịga nke ọma n'ịchọpụta ecosystem BTCPay na ime ka Kwụọ ụhwọ gị bụrụ nke gị n'ezie.

## Akụrụngwa

* [BTCPay ServerWeebụsaịtị Gọọmentị](https://btcpayserver.org/)
* [Ajụjụ a na-ajụkarị gbasara BTCPay](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server Ebe nchekwa GitHub](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Ngosipụta Mainnet](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Plugin maka BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Nduzi ntinye Plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Ọmụmatụ zcash-lightwalletd.custom.yml omenala](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [lightwalletd Faịlụ Compose Docker (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Akwụkwọ API Key BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Mepụta Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash Ndepụta ndakọrịta e-akpa ego (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + lightwalletd na Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
