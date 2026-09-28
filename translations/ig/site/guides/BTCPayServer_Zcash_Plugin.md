# Sava BTPay nwere Nkwado Zcash: Nduzi Nwụnye na Njikọta zuru oke

BTCPay Server na-enye ndị azụmaahịa n'ịntanetị ohere ịnakwere ịkwụ ụgwọ ego dijitalụ ozugbo, na-enweghị ndị nnọchi anya ma ọ bụ ndị nlekọta. Nduzi a na-eduzi gị site na usoro zuru oke nke ịtọlite BTCPay Server site na nkwado obodo maka ịkwụ ụgwọ Zcash echebere.

> Akwụkwọ a lekwasịrị anya n'itinye Zcash n'ime ihe nlereanya BTPay Server gị. 
> Ọ na-akwado ma **nha zuru oke (Zebra)** na **nhazi dabere na lightwalletd**.

---

## Tebulu ọdịnaya

- [Gịnị kpatara eji BTPay Server na Zcash?](#Why-Use-BTCPay-Server-with-Zcash)
- [Otu sava BTPay si arụ ọrụ](#How-BTCPay-Server-Works)
- [Ebee ka a na-echekwa ego? Ònye na-achịkwa igodo nkeonwe?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Otu esi ahazi sava BTPay maka ịnabata Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Iji Zcash akwado sava BTPay](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Na-agba ọsọ Zcash nke gị (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Connecting to an External lightwalletd Node (Custom Configuration)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Ịkwado sava BTPay n'ụlọ site na iji Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Ịhazi Plugin Zcash na BTCPay Server Web Interface](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Ijikọta sava BTPay na weebụsaịtị gị](#Integrating-BTCPay-Server-with-Your-Website)
  - [Njikọ API](#API-Integration)
    - [Ịmepụta Igodo API](#Generating-an-API-Key)
    - [Ihe atụ: Ịmepụta akwụkwọ ọnụahịa site na API](#Example-Creating-an-Invoice-via-API)
    - [Ịtọlite Webhook](#Setting-Up-a-Webhook-Optional)
  - [Njikọ CMS](#CMS-Integration)
  - [Bọtịnụ ịkwụ ụgwọ ma ọ bụ Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Mmechi](#Conclusion)
- [akụrụngwa](#Resources)


---

## Gịnị kpatara eji BTPay Server na Zcash?

Azụmaahịa n'ịntanetị na-anabata ego dijitalụ nke ukwuu. Ọ dị ngwa ngwa, zuru ụwa ọnụ, ma na-arụ ọrụ na-enweghị ụlọ akụ. Nke a na-abara ma ndị ahịa ma ndị ahịa uru. Mana enwere nkọwa dị mkpa nke ọtụtụ mmadụ na-eleghara anya.

Mgbe onye ahịa na-enye iwu, ọ na-enyekarị ozi nkeonwe: aha, adreesị mbupu, na nọmba ekwentị. Ọ bụrụ na ejiri blockchain ọha - dị ka Bitcoin, Ethereum, ma ọ bụ stablecoins na Ethereum ma ọ bụ Tron kwụọ ụgwọ ahụ - azụmahịa ahụ na-apụta ìhè ruo mgbe ebighị ebi maka nyocha.

Onye ọ bụla, ọbụlagodi na-amaghị ihe e nyere iwu, nwere ike:

- lee mgbe na ego ole ka a kwụrụ 
- Chọpụta ebe ego ndị ahụ si bịa na ebe ha gara 
- jikọọ adreesị ego dijitalụ na onye dị adị ma ọ bụrụ na enwere njikọ ọ bụla (dịka ọmụmaatụ, ozi email gbapụrụ agbapụ ma ọ bụ aha mbupu)

Nke a pụtara na otu ịzụrụ ihe nwere ike ikpughe akụkọ ego onye ahịa dum.

Ọ na-arụkwa ọrụ n'ụzọ ọzọ. Ọ bụrụ na adreesị onye ahịa apụtala n'usoro, ha na-apụta ìhè. Ndị asọmpi na ndị na-ekiri ihe ndị ọzọ nwere ike ịchọpụta ọnụọgụ ụgwọ, ọrụ ndị na-ebubata ngwaahịa, na usoro usoro azụmahịa.

### Njikọta nke BTPay Server na Zcash nwere ike idozi nke a.


BTCPay Server bụ sistemụ n'efu na nke a na-ahazighị ahazi maka ịnata ịkwụ ụgwọ ego dijitalụ. 
Ọ bụghị onye na-etinye ego n'etiti ụgwọ, ọ naghịkwa ejide ego ọ bụla. Ụgwọ niile na-aga ozugbo na obere akpa onye ahịa ahụ. 
Nke a nwere ike ịbụ obere akpa ego nkeonwe ma ọ bụ nhazi ọtụtụ akara n'ime otu ụlọ ọrụ.

Sava ahụ na-ejikwa ọrụ nhazi:

- na-emepụta adreesị pụrụ iche maka iwu ọ bụla 
- na-esochi mgbe a natara ụgwọ ma jikọta ya na iwu ahụ 
- na-enye akwụkwọ nnata na ọkwa 
- na-enye interface ịkwụ ụgwọ maka onye ahịa 

Ihe niile na-aga n'okpuru njikwa nke onye nwe ụlọ ahịa ahụ, na-adabereghị na ọrụ ndị ọzọ.

Zcash bụ ego dijitalụ e wuru na ihe akaebe efu. Ọ na-akwado ụdị azụmahịa nkeonwe kpamkpam. 
Mgbe a na-eji adreesị echekwara (nke a na-akpọ "adreesị"), a naghị ekpughe onye zitere ya, onye nnata ya, na ego azụmahịa ahụ na blockchain.

Maka ụlọ ahịa dị n'ịntanetị, nke a pụtara:

- Onye zụrụ ihe nwere ike mezue ụgwọ ahụ n'ekpugheghị akụkọ ego ya 
- Onye na-ere ahịa na-anata ụgwọ n'ekpugheghị adreesị ya, olu ahịa ya, ma ọ bụ usoro azụmahịa ya 
- Ọ dịghị onye na-ekiri ihe si mba ọzọ nwere ike ijikọ ịkwụ ụgwọ ahụ na iwu ahụ ma ọ bụ na data ndị ahịa

### Ihe Nlereanya Bara Uru

Onye ọrụ na-etinye iwu ma họrọ Bitcoin ma ọ bụ USDT dị ka ụzọ ịkwụ ụgwọ. 
Weebụsaịtị ahụ na-emepụta adreesị ịkwụ ụgwọ ma gosipụta ego ahụ. 
Mgbe emechara ịkwụ ụgwọ ahụ, a na-echekwa adreesị a na blockchain ma na-aghọ nke ọha. 
Onye mwakpo kwesịrị ijikọ naanị otu iwu na adreesị ahụ iji nweta nghọta ogologo oge n'akụkọ azụmahịa ya niile.

Ugbu a, chee echiche banyere otu ọnọdụ ahụ na Zcash. 
BTCPay Server na-emepụta adreesị echekwara. Onye zụrụ ya na-eziga ụgwọ ahụ. 
Site n'echiche nke blockchain, ọ dịghị ihe na-eme. Enweghị data ọha a ga-enyocha. 
Sava ahụ na-enweta nkwenye, jikọọ ya na iwu ahụ, ma mechaa usoro ahụ.

Maka onye ọ bụla si mba ọzọ, ọ dị ka ihe ọ bụla merenụ. 
Echiche niile ka dị n'etiti ụlọ ahịa na onye ahịa - dịka o kwesịrị.

Ngwọta a anaghị emebi akpaaka ma ọ bụ ojiji ya. 
Ihe niile na-arụ ọrụ otu ihe ahụ dịka ọ dị na ego dijitalụ ndị ọzọ, na-enweghị ihe egwu nke ntapu data.



## Otu sava BTPay si arụ ọrụ

BTCPay Server na-arụ ọrụ dị ka àkwà nhazi ịkwụ ụgwọ n'etiti ikpo okwu azụmaahịa e-commerce gị na blockchain. Lee otu usoro ahụ si arụ ọrụ:

1. **Onye ahịa na-etinye iwu** na weebụsaịtị gị (dịka ọmụmaatụ WooCommerce, Magento, ma ọ bụ ikpo okwu ọ bụla nwere njikọta BTCPay).

2. **Ụlọ ahịa ahụ na-arịọ akwụkwọ ọnụahịa ịkwụ ụgwọ** site na sava BTPay. Sava ahụ na-emepụta akwụkwọ ọnụahịa pụrụ iche yana:
   - Ọnụ ego iwu ahụ
   - Ihe eji agụta oge
   - A Zcash Unified Address (UA) - e.g., `u1...` - nke gụnyere onye nnata Orchard (nke nwere ihe nchebe) site na ndabara.

3. **Onye ahịa ahụ hụrụ ibe ịkwụ ụgwọ** wee ziga ZEC na adreesị enyere.

4. **Onye nkesa BTCPay na-enyocha blockchain**, na-enyocha ịkwụ ụgwọ ahụ megide:
   - Ọnụ ego a tụrụ anya ya
   - Adreesị nnata
   - Akara oge akwụkwọ ọnụahịa ahụ

5. **Ozugbo achọpụtara ma kwado azụmahịa ahụ**, BTCPay na-agwa ụlọ ahịa ahụ.

6. **Onye ahịa ahụ na-enweta nkwenye ịkwụ ụgwọ.** Nhọrọ, sava ahụ nwere ike izipu nnata site na email.

Usoro a dum na-eme **na-akpaghị aka**, na-enweghị onye ogbugbo ma ọ bụ onye nlekọta. 
BTCPay Server anaghị ejide ego ọ bụla** - ọ na-ejikọ sistemụ ịtụ ihe na blockchain ahụ nke ọma ma dịkwa n'ime ya.
## Ebee ka a na-echekwa ego? Ònye na-achịkwa igodo nkeonwe?

BTPay Server abụghị **akpa ego, ọ naghịkwa achọ igodo nkeonwe**. 
Ego niile na-aga **kpọmkwem** n'akpa ego onye ahịa. A na-ahụ na nchekwa na-aga site na iji **ihe owuwu dabere na igodo**.

### Otu O Si Arụ Ọrụ

- **Emebere obere akpa ahụ tupu oge eruo.** 
  Onye ahịa ahụ na-eji obere akpa Zcash nke na-akwado igodo nlele - dịka ọmụmaatụ [Zkool](https://github.com/hhanh00/zkool2/) or [Akpa Zingo!](https://zingolabs.org/).  
  Ndepụta zuru ezu dị na [ZecHub.wiki](https://zechub.wiki/wallets).

- **Ihe nkesa BTCPay na-ejikọ site na igodo nlele.** 
  Igodo nlele bụ **igodo ọgụgụ naanị**: ọ nwere ike ịchọpụta ụgwọ na-abata ma mepụta adreesị nnata ọhụrụ, 
  mana ọ gaghị emefu ego. Ihe nkesa ahụ anaghị echekwa mkpụrụ okwu ma ọ bụ igodo nkeonwe.

- **A na-enweta data Blockchain site na `lightwalletd` sava.** 
  I nwere ike iji ebe ọha dịka `https://zec.rocks`, ma ọ bụ gbaa nke gị `Zebra + lightwalletd` nchịkọta maka ikike ọchịchị zuru oke.

- **Ntụnye ọ bụla na-enweta adreesị pụrụ iche.** 
  Igodo ndị a na-elele na-enye sava ohere ịnweta adreesị Zcash ọhụrụ echekwara maka akwụkwọ ọnụahịa ọ bụla, 
  na-eme ka a na-enyocha ụgwọ dị mma ma na-egbochi iji adreesị eme ihe ọzọ.

- **Ị na-achịkwa ego ahụ nke ọma.** 
  Ọ bụrụgodị na e mebisiri sava ahụ, ọ dịghị onye nwere ike izuru ego gị - naanị metadata ịkwụ ụgwọ ka a ga-ekpughe.

Nhazi a na-ekewa **ihe owuwu** na **njikwa ihe onwunwe**. 
Ị nwere ike imelite, ịkwaga, ma ọ bụ tinyegharịa BTPay Server n'etinyeghị ego ọ bụla n'ihe egwu.

## Otu esi ahazi sava BTPay maka ịnabata Zcash

N'akụkụ ndị gara aga, anyị kọwara otu BTCPay Server si arụ ọrụ na Zcash na ihe kpatara o ji dị mkpa maka ịkwụ ụgwọ nchekwa nzuzo. Ugbu a oge eruola ka anyị leba anya n'ihe anyị na-ekwu.

Nhazi gị kpọmkwem ga-adabere n'ọtụtụ ihe:

- Ị nwere ihe atụ BTCPay Server?
- Do you want to use a public lightwalletd or run your own full node?
- Ihe nkesa ahụ ọ ga-agba ọsọ na VPS ma ọ bụ n'ụlọ?

Isiakwụkwọ a na-ekpuchi ọnọdụ nhazi niile dị ugbu a - site na ntọala pere mpe ruo na ntinye zuru oke.

Anyị ga-atụle ihe ndị a:

- Otu esi etinye ihe niile site na mmalite na VPS, gụnyere node zuru oke (Zebra)
- Otu esi agba ọsọ BTPay Server n'ụlọ ebe ị na-ezobe IP gị site na iji **Cloudflare Tunnel**
- Otu esi eme ka nkwado Zcash rụọ ọrụ ma hazie ya n'ime interface weebụ BTCPay Server
- Otu esi ejikọta BTPay na weebụsaịtị gị ma ọ bụ ụlọ ahịa dị n'ịntanetị


## Iji Zcash akwado sava BTPay

Ka anyị gaa n'ihu na ntọala ahụ. Na ngalaba a, anyị ga-etinye BTPay Server na nkwado Zcash - ma na VPS ọhụrụ ma ọ bụ site na itinye nkwado ZEC na ihe atụ dị adị.

Ọ bụrụ na BTCPay Server na-arụ ọrụ (dịka ọmụmaatụ maka BTC ma ọ bụ Lightning), ịkwesighi itinyeghachi ihe niile - naanị mee ka ngwa mgbakwunye ZEC rụọ ọrụ.

Anyị ga-agafe nhazi dị iche iche, site na ntọala pere mpe site na iji usoro ọha `lightwalletd` node ruo nrụnye zuru oke nke nwere node zuru oke nke gị. 
Nhọrọ kacha mma dabere na ebe sava gị dị na oke nnwere onwe ịchọrọ site na akụrụngwa mpụga.

> Akwụkwọ ngwa mgbakwunye gọọmentị: 
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Ịdọ aka ná ntị - otu obere akpa maka ihe atụ:** 
> Ngwa mgbakwunye Zcash na-eji **otu obere akpa ekekọrịtara** n'ofe **ụlọ ahịa niile** na ihe atụ BTPay. 
> Ọ bụrụ na ị na-akwado ọtụtụ ụlọ ahịa nọọrọ onwe ha n'otu oge, ha ga-ekerịta otu obere akpa Zcash ahụ. 
> Jiri ihe atụ dị iche iche ma ọ bụrụ na ịchọrọ ịpụpụ obere akpa ego.

---

### Nhazi VPS akwadoro

Tupu ịwụnye ya, jide n'aka na ị nwere:

- VPS nwere **Ubuntu 22.04+**
- Aha ngalaba na-egosi adreesị IP nke sava gị (site na DNS)
- `git`, `docker`, na `docker-compose` arụnyere
- Ịnweta SSH na sava ahụ

---

## Ịkwadebe ihe nkesa gị (akụkụ zoro ezo)

<details>
  <summary>Click to expand</summary>

Iji tinye BTPay Server na nkwado Zcash, ị ga-achọ ihe ndị a:

### 1. VPS na Ubuntu 22.04 ma ọ bụ nke ọhụrụ

Anyị na-akwado ka e jiri obere ntinye nke **Ubuntu Server 22.04 LTS**. 
Onye ọ bụla na-enye VPS nke na-enye adreesị IP raara onwe ya nye ga-arụ ọrụ. 

**Ihe kacha nta achọrọ**: 
- Isi CPU abụọ 
- RAM 4 GB 
- Oghere diski 40 GB 

Ntọala a zuru oke ma ọ bụrụ na ị na-eji lightwalletd maka Zcash. 
Ọ bụrụ na ị na-eme atụmatụ ịgba ọsọ **nkeji Zcash zuru oke**, ị ga-achọ **opekata mpe 300 GB** nke oghere diski efu.

---

### 2. Aha ngalaba na-egosi sava gị

Na dashboard nke onye na-enye DNS gị, mepụta otu `A` ndekọ maka subdomain 
(e.g. `btcpay.example.com`) nke na-ezo aka na adreesị IP VPS gị. 

A ga-eji ngalaba a nweta BTCPay Server site na ihe nchọgharị ahụ 
na iji mepụta **asambodo SSL n'efu** na akpaghị aka site na Ka anyị zoo ya.

---

### 3. Ịnweta SSH na sava ahụ

Iji wụnye BTPay Server, ị ga-ejikọrịrị na VPS gị site na SSH. 
Site na ọdụ gị, gbaa ọsọ:

`ssh root@YOUR_SERVER_IP`

Ọ bụrụ na ị na-eji macOS, Linux, ma ọ bụ WSL na Windows, SSH dịlarị na ọdụ ahụ.
Na Windows nkịtị, jiri onye ahịa SSH dị ka **PuTTY**.

---

### 4. Wụnye Git, Docker, na Docker Compose

Ozugbo ejikọtara ya site na SSH, melite ngwugwu sistemụ gị ma wụnye ihe ndị achọrọ:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Na Ubuntu 22.04 na nke ọhụrụ, `docker-compose` A kwụsịtụrụ APT.
> Ngwugwu akwadoro bụ `docker-compose-plugin`, nke na-enye `docker compose` iwu (rịba ama oghere ahụ kama akara ngosi).

Gburugburu sava gị dị njikere ugbu a maka ịwụnye BTPay Server.

</details>

---

### Nzọụkwụ 1: Mechie Ebe Nchekwa Ahụ

Mepụta ndekọ ọrụ wee budata ntinye BTPay Server Docker:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Nzọụkwụ nke 2: Mbupụ Mgbanwe Gburugburu Ebe Obibi

Dochie `btcpay.example.com` na ngalaba gị n'ezie:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Ọ bụrụ na ị na-eme atụmatụ itinye Monero ma ọ bụ Litecoin ma emechaa, ị nwere ike itinye ha ugbu a:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Ị nwere ike itinye mkpụrụ ego ọhụrụ n'oge ọ bụla site na mbupụ mgbanwe kwesịrị ekwesị ma na-agbagharị edemede ntọala ahụ:

`. ./btcpay-setup.sh -i`

Maka ntuziaka a, anyị ga-elekwasị anya na **Zcash naanị**.

---

### Nzọụkwụ nke 3: Gbaa Onye Ntinye

Gbaa edemede ntọala iji wuo ma malite sava ahụ:

`. ./btcpay-setup.sh -i`

Ederede ahụ ga-etinye ihe ndị dabere na ya, mepụta ihe ndị dabere na ya `docker-compose.yml`, malite ọrụ, ma hazie `systemd`.
Nke a na-ewe ihe dị ka nkeji ise.

Ozugbo emechara ya, ihe atụ BTPay Server gị ga-adị na:

`https://btcpay.example.com`

> Ọ bụrụ na ị na-agbanwe nrụnye dị adị (dịka ọmụmaatụ itinye ZEC), jide n'aka na ị kwụsịrị ma malitegharịa sava ahụ site na ntọala ọhụrụ:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Wee gaa na ngalaba na-esote iji hazie Zcash na interface weebụ BTCPay Server.



## Na-agba ọsọ Zcash nke gị zuru oke

Ọ bụrụ na ịchọrọ **ọ bụghị** ịdabere na ọha na eze `lightwalletd` N'ime otu sava ahụ, ị nwere ike itinye Zcash node gị yana Lightwalletd n'otu sava ahụ. 
Nke a na-enye gị **nnwere onwe zuru oke** - enweghị ntụkwasị obi mpụga, enweghị ntụkwasị obi achọrọ.

---

### Nzọụkwụ 1: Hụ na oghere diski zuru oke

Nọdụ Zcash zuru oke (Zebra + Lightwalletd) chọrọ ugbu a **300+ GB** nke oghere diski, ọ na-agakwa n'ihu na-eto.

Gbarie:

- Ebe nchekwa data nke Zebra blockchain: ~260-270 GB
- Ntinye aka na Lightwalletd: ~15-20 GB

#### Nchekwa akwadoro:

- **400 GB+** ọ bụrụ na ejiri ihe nkesa ahụ **naanị** maka ịkwụ ụgwọ Zcash
- **800 GB+** ọ bụrụ na sava ahụ na-agbakwa BTCPay Server, PostgreSQL, Nginx, wdg.

> Ọ kacha mma iji diski SSD/NVMe nwere ikike **1 TB**, ọkachasị ma ọ bụrụ na ị naghị eme atụmatụ ịchacha data mgbe niile.

---

### Nzọụkwụ nke 2: Tọọ Mgbanwe Gburugburu Ebe Obibi

Tinye ihe ndị a na ntọala gburugburu gị iji mee ka nhazi node zuru oke rụọ ọrụ:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Nke a ga-agụnye `zcash-fullnode` nkebi, nke na-ewepụta ha abụọ `zebrad` na `lightwalletd` n'ime sava BTPay.

---

### Nzọụkwụ nke 3: Gbaagharịa onye nrụnye ahụ

`. ./btcpay-setup.sh -i`

Ederede ahụ ga-:

* Budata onyonyo Docker maka Zebra na Lightwalletd
* Tọọ ọrụ ndị dị n'ime ngwugwu BTCPay
* Jikọọ ngwa mgbakwunye Zcash na **local** `lightwalletd` ihe atụ

> **Mmekọrịta blockchain zuru oke nwere ike were ọtụtụ ụbọchị**, ọkachasị na sava VPS ndị na-enweghị akụrụngwa dị ala.
> Ruo mgbe emechara mmekọrịta ahụ, a gaghị enwe ike ịkwụ ụgwọ echekwara.


## Ijikọ na Nọdụ Lightwalletd Mpụga

N'ọtụtụ oge, ọ dịghị mkpa inwe nnwere onwe zuru oke - ndị ahịa nwere ike ọ gaghị achọ itinye oge na ohere diski na-agba ọsọ Zcash zuru oke. 
Site na ndabara, BTPay Server na-ejikọ na ọha `lightwalletd` node iji jikwaa ịkwụ ụgwọ echekwara na-enweghị nbudata blockchain niile.

Isi njedebe ndabara bụ:

`https://zec.rocks:443`

Agbanyeghị, ị nwere ike hazie BTPay Server ka ọ jikọọ na ** ihe ọ bụla dị n'èzí `lightwalletd` node**, dịka:

`https://lightwalletd.example:443`

Nkebi a na-egosi otu esi eme nke ahụ site na iji **mkpụrụ Docker omenala**.

> Ihe atụ nhazi zuru oke yana mgbanwe gburugburu ebe obibi niile dị na [ebe nchekwa ngwa mgbakwunye](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Nzọụkwụ ndị dị n'okpuru na-egosi nhazi ọrụ pere mpe.

---

### Nzọụkwụ 1: Mepụta Mpempe Docker ahaziri ahazi

Na ndekọ ọrụ BTPayServer gị, mepụta faịlụ iberibe omenala:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Tinye ihe ndị a:

```
exclusive:
- zcash
```

Ihe `exclusive` ntuziaka ahụ na-ahụ na naanị otu iberibe nwere otu akara ahụ (`zcash` n'okwu a) nwere ike ịrụ ọrụ n'otu oge.
Nke a na-egbochi esemokwu nhazi - dịka ọmụmaatụ, ịnweghị ike ịgba ọsọ abụọ ahụ `zcash-fullnode` iberibe na mpụga omenala a `lightwalletd` iberibe n'otu oge.
Site n'ịkanye ya akara dị ka `exclusive: zcash`, BTPay Server ga-agbanyụ ndabara ahụ na akpaghị aka `zcash-fullnode` na nke dị n'ime `lightwalletd` akpa, na-enye gị ohere ijikọ na node mpụga nke gị kama.

---

### Nzọụkwụ nke 2: Tọọ Mgbanwe Gburugburu Ebe Obibi

N'ime ọdụ ahụ:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Nzọụkwụ nke 3: Kọwaa Adreesị Nọdụ Mpụga

Mepee nke gị `.env` faịlụ:

`nano .env`

Tinye ahịrị a, dochie URL ahụ na njedebe ị họọrọ:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Ị nwere ike iji:

* **ebe ọha**, dịka `https://zec.rocks:443`
* Nọdụ nke gị nke na-akwado onwe ya, nke e tinyere iche na sava BTPay

> Ọ bụrụ na mpụga `lightwalletd` ọ bụrụ na ọ dịghị ma ọ bụ buru ibu, ụgwọ e chebere ga-ada ada.
> Maka ọrụ dị oke mkpa, họrọ **nkwụsị siri ike ma gosipụta ya** (dịka ndabara `zec.rocks`).

> Achọrọ ịkwado onwe gị `lightwalletd`?
> Ị nwere ike iji ya `docker-compose.lwd.yml` site na [Ebe nchekwa Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Ịdọ Aka Na Ntị:** E dekọghị ntọala a n'ihu ọha ma ọ chọrọ nhazi TLS aka, mbugharị ọdụ ụgbọ mmiri, na nhazi firewall - akwadoro maka ndị ọrụ dị elu naanị.

---

### Nzọụkwụ nke 4: Gbaagharịa onye nrụnye ahụ

`. ./btcpay-setup.sh -i`

BTCPay Server ga-etinye nhazi omenala gị ma jikọọ na nke akọwapụtara `lightwalletd` ọnụ.

Site ugbu a gaa n'ihu, ngwa mgbakwunye Zcash ga-eji njedebe mpụga ahụ maka ijikwa azụmahịa echekwara.


## Ịkwado sava BTPay n'ụlọ site na iji Cloudflare Tunnel

Ị chọrọ ịnakwere ịkwụ ụgwọ Zcash mgbe ị na-akwado BTPay Server na ngwaọrụ ụlọ - dị ka Raspberry Pi 5 ma ọ bụ sava mpaghara ọ bụla **na-enweghị IP kwụ ọtọ**? 
I nwere ike ikpughe ihe atụ gị na ịntanetị n'enweghị nsogbu site na iji **Cloudflare Tunnel**.

Usoro a na-ezere mbugharị ọdụ ụgbọ mmiri ma na-ezochi ezigbo adreesị IP gị n'ihu ọha - ebe ọ na-eme ka sava gị dị mfe ịnweta site na HTTPS.

Ọ na-enyekwara gị aka **zere ọnụ ahịa ịgbazite VPS**, nke dị mma ma ọ bụrụ na ịkwụ ụgwọ ego dijitalụ bụ ihe nhọrọ kama ịbụ isi ihe dị na azụmaahịa gị.

---

### Nzọụkwụ 1: Wụnye Ọwara Cloudflare

1. Mepụta akaụntụ na [cloudflare.com](https://www.cloudflare.com) ma tinye ngalaba gị.
2. Na **sava ụlọ gị**, wụnye Ọwara Cloudflare:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Iji Cloudflare nyochaa njirimara gị:

`cloudflared tunnel login`

Iwu a ga-emepe windo ihe nchọgharị. Banye ma nye ikike ịnweta ngalaba gị.
Cloudflare ga-emepụta ihe na akpaghị aka `credentials` faịlụ nwere ihe nrịbama na sava gị.

4. Mepụta ọwara ọhụrụ (ị nwere ike ịkpọ ya aha) `btcpay` ma ọ bụ ihe ọ bụla ọzọ):

`cloudflared tunnel create btcpay`

Nke a na-emepụta `btcpay.json` faịlụ nwere ID ọwara na asambodo - ị ga-achọ ya na nzọụkwụ ọzọ.

---

### Nzọụkwụ nke 2: Mepụta faịlụ nhazi ọwara

Mepụta ndekọ nhazi (ọ bụrụ na ọ dịghị) wee mepee faịlụ nhazi:

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

* `tunnel` - aha ọwara ị mepụtara na mbụ
* `credentials-file` - ụzọ gaa na faịlụ token emepụtara n'oge `cloudflared tunnel login`
* `hostname` - edebanyere aha ngalaba gị na Cloudflare (dịka ọmụmaatụ `btcpay.example.com`)
* `service` - adreesị mpaghara nke sava BTPay gị (na-abụkarị adreesị mpaghara) `http://127.0.0.1:80` maka Nginx)

> Cloudflare ga-anọchi anya okporo ụzọ na sava mpaghara gị nke ọma, na-ekpugheghị adreesị IP gị.


### Nzọụkwụ 3: Tinye ndekọ DNS maka ọwara gị

Mgbe e mechara ọwara ahụ, Cloudflare ga-etinyekarị ndekọ DNS CNAME na akpaghị aka** maka ngalaba gị. Ọ ga-adị ka nke a:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Ọ bụrụ na ọ pụtaghị na akpaghị aka, tinye ya n'aka:

1. Gaa na nke gị [Dashboard Cloudflare](https://dash.cloudflare.com/)
2. Gaa na ngalaba **DNS**
3. Tinye ndekọ CNAME ọhụrụ:
   - **Aha**: `btcpay`
   - **Ebumnuche**: `<UUID>.cfargotunnel.com`  
     Ị nwere ike ịchọta kpọmkwem uru na gị `btcpay.json` faịlụ ma ọ bụ site na ịgba ọsọ:
     
     `cloudflared tunnel list`
     
   - **Ọnọdụ onye nnọchi anya**: Agbanyere (igwe ojii oroma)

> Akwụkwọ ozi a na-egosi na arịrịọ niile `btcpay.example.com` a na-agafe site na Ọwara Cloudflare, na-ezochi ezigbo adreesị IP gị n'ihu ọha.

---

### Nzọụkwụ nke 4: Mee ka Ọwara dị na Mmalite Sistemu rụọ ọrụ

Iji mee ka ọwara ahụ rụọ ọrụ na akpaghị aka mgbe ebido, wụnye ya dị ka ọrụ sistemụ:

`sudo cloudflared service install`

Mgbe ahụ mee ka ọrụ ahụ rụọ ọrụ ma malite:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Lelee ọnọdụ ahụ:

`sudo systemctl status cloudflared`

I kwesịrị ịhụ ozi dị ka `Active: active (running)` na nkwenye na `btcpay.example.com` dị n'ịntanetị.

> Site ugbu a gaa n'ihu, ọwara ahụ ga-amalite na akpaghị aka na mmalite ọ bụla, a ga-enwetakwa BTCPay Server gị n'ihu ọha - na-enweghị mbugharị ọdụ ụgbọ mmiri na-ekpugheghị ezigbo IP gị.

---

### Nzọụkwụ nke 5: Mezue Ntọala Sava BTPay

Ọ bụrụ na ị chọrọ ịwụnye BTPay Server maka oge mbụ, tọọ ngalaba gị tupu ị gbaa edemede ntọala:

`export BTCPAY_HOST="btcpay.example.com"`

Nke a na-ahụ na ejiri ngalaba ziri ezi mee ihe mgbe ị na-emepụta nhazi **Nginx** na asambodo **SSL**.

Ọ bụrụ na etinyere BTPay Server ma ị na-agbakwunye ọwara ahụ:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Ntọala ahụ ga-emegharị nhazi ma tinye ngalaba ọhụrụ ahụ.
Ugbu a, ị kwesịrị ịnweta sava gị na:

`https://btcpay.example.com`

> Ma ị na-eji ọha `lightwalletd` ma ọ bụ node zuru oke nke gị, nke a anaghị emetụta ọwara ahụ.
> Ihe dị mkpa bụ na BTCPay Server na-ege ntị na ya `127.0.0.1:80` mpaghara.


## Ịhazi Plugin Zcash na BTCPay Server Web Interface

> **Dị mkpa maka ntọala ụlọ ahịa dị iche iche:** 
> Akpa Zcash nke e mere ebe a bụ **zuru ụwa ọnụ** dịka ọmụmaatụ. Ụlọ ahịa niile ga-eji obere akpa a belụsọ ma ị na-agba usoro BTPay dị iche.

Mgbe ị tinyere ihe atụ BTPay Server gị nke ọma, ị ga-achọ ime ụfọdụ nhazi dị mkpa site na interface weebụ admin. 
Akwụkwọ gọọmentị ahụ na-enye ntuziaka zuru oke na Bekee - ebe a, anyị ga-agafe usoro ndị dị mkpa ma lekwasị anya kpọmkwem na ịhazi ngwa mgbakwunye Zcash.

---

### Nzọụkwụ 1: Banye na Njikọ Weebụ

Gaa leta ihe atụ gị na:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Tinye nbanye na paswọọdụ onye nchịkwa gị.
- Ọ bụrụ na nke a bụ oge mbụ ị na-abanye, a ga-agwa gị ka ị mepụta akaụntụ.
- A ga-enye akaụntụ mbụ ị debanyere aha ikike nchịkwa na akpaghị aka.

---

### Nzọụkwụ nke 2: Wụnye Zcash Plugin

1. Na isi menu, gaa na:

`Plugins -> Browse Plugins`

2. Chọta ngwa mgbakwunye **Zcash (ZEC)**. Jiri ogwe ọchụchọ ma ọ bụrụ na ọ dị mkpa.
3. Pịa **Tinye** wee gosi.

> Megharịa usoro a maka altcoins ndị ọzọ ị mere n'oge nhazi sava.

Mgbe etinyere ya, pịa **Malitegharịa sava** iji bugharịa ihe nchọgharị ahụ na plugins ndị na-arụ ọrụ.


### Step 3: Connect Your Wallet via Viewing Key

Mgbe etinyere ngwa mgbakwunye ahụ, ngalaba **Zcash** ọhụrụ ga-apụta na menu ntọala.

1. Go to:

`Zcash -> Settings`

2. Paste your **Unified Full Viewing Key (UFVK)** - BTCPay will derive a Unified Address for each invoice and detect incoming shielded payments.

> **Rịba ama:** A na-akwado igodo nlele Legacy Sapling, mana iji Orchard/Unified Adreesị, ị kwesịrị inye **UFVK**.


   Usoro ihe atụ:

`uview184syv9wftwngkay8d...`

3. Tinye uru n'ọhịa elu Block

* **Ntọlite mbụ ya na obere akpa ọhụrụ (okwu mkpụrụ ọhụrụ):** tinye ogologo ngọngọ Zcash dị ugbu a (ị nwere ike ịlele ya na 3xpl.com/zcash) - nke a na-eme ka nyocha mbụ dị ngwa.
* **Ịkwaga na otu sava ahụ site na ntọala Sapling-naanị gaa na Unified Adreesị / Orchard:** hapụ ubi a ka ọ tọgbọ chakoo.
* **Ịkwaga ụlọ ahịa gị gaa na sava ọhụrụ nwere otu obere akpa/UFVK:** ma ọ bụrụ na ịchọrọ, tinye ogologo ọmụmụ - ihe dị ka ogologo nke iwu mbụ ụlọ ahịa gị kwụrụ ụgwọ (dakọtara ụbọchị iwu ahụ na 3xpl iji belata nyocha ahụ). Ọ bụrụ na ị maghị nke ọma, hapụ ya ka ọ tọgbọ chakoo.

> Ọ bụghị obere akpa ego niile na-akwado **UFVK Unified Full Viewing Key (UFVK)** mbupụ ugbua. 
> Nhọrọ ndị a tụrụ aro: 
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Akpa obere akpa Zingo! (ụdị maka PC)**](https://zingolabs.org/)  
> Na ngwa abụọ ahụ, chọọ maka mbupu UFVK na ngalaba nkwado ndabere/mbupụ.

Igodo ndị a na-akwado **mgbanwe adreesị akpaka**, nke pụtara:
- Onye ahịa ọ bụla na-enweta adreesị ịkwụ ụgwọ **pụrụ iche**
- Ị na-ahụ nguzozi otu, nke dị n'otu**

Ị nwere ike ịchọta ndepụta ndakọrịta sara mbara na [ZecHub -> obere akpa](https://zechub.wiki/wallets).

Ozugbo e dejupụtara ubi niile, pịa **Chekwa**.

---

### Nwalee usoro ịkwụ ụgwọ ZEC gị

Ekele dịrị gị - ejikọla obere akpa Zcash gị na sava BTPay ugbu a.

Ka anyị mee ule:

1. Go to:

`Invoices -> Create New`

2. Mepụta akwụkwọ ọnụahịa nnwale maka obere ego na ZEC.
3. Zipu ego site na ** obere akpa dị iche** (ọ bụghị nke ejikọtara na BTPay).
4. Ozugbo achọpụtara azụmahịa ahụ, ibe akwụkwọ ọnụahịa ga-egosi emume anya.
5. Kwenye na ọnọdụ akwụkwọ ọnụahịa ahụ agbanweela ka ọ bụrụ **Akwụọla ụgwọ**.

Ọ bụrụ na ihe niile arụọ - ị dị njikere itinye ụgwọ ZEC na weebụsaịtị gị site na iji mgbakwunye API ma ọ bụ CMS.



## Ijikọta sava BTPay na weebụsaịtị gị

Ozugbo ejikọtara obere akpa Zcash gị na BTCPay Server, ị nwere ike itinye sistemụ ịkwụ ụgwọ na weebụsaịtị gị. 
E nwere ọtụtụ ụzọ isi mee nke a - site na ịnweta API ozugbo ruo na plugins dị njikere iji maka nyiwe CMS ama ama.

---

### Nhọrọ Njikọta

- **Njikọ API** 
  Ọ dị mma maka weebụsaịtị ma ọ bụ sistemụ e wuru n'onwe ha na-enweghị CMS. 
  Na-enye gị ikike zuru oke n'ịmepụta akwụkwọ ọnụahịa, nsochi ịkwụ ụgwọ, na ọkwa - ihe niile dị na interface na echiche nke gị. 
  Ọ chọrọ ihe ọmụma mmemme dị mkpa, yabụ onye nrụpụta gị ga-ahụ maka ọrụ a nke ọma.

- **Nkwụnye CMS** 
  Dị maka nyiwe dịka **WooCommerce**, **PrestaShop**, na ndị ọzọ. 
  Ngwa mgbakwunye ndị a na-enye gị ohere ịnabata ịkwụ ụgwọ n'ime nkeji ole na ole - achọghị koodu.

- **Bọtịnụ ịkwụ ụgwọ ma ọ bụ Iframe** 
  Ụzọ kachasị mfe. 
  Zuru oke maka ibe ọdịda, weebụsaịtị nkeonwe, ma ọ bụ saịtị ọ bụla ebe ịchọrọ itinye njikọ onyinye ma ọ bụ wijetị ndenye aha.

---

### Njikọ API

Ọ bụrụ na ị na-eji ikpo okwu ahaziri ahazi (maọbụ na ị nweghị CMS ma ọlị), API bụ nhọrọ kacha mma. 
Ọ na-enye gị mgbanwe zuru oke: ị nwere ike ịmepụta akwụkwọ ọnụahịa, soro ọnọdụ ha, nata ọkwa, ma chịkwaa ahụmịhe onye ọrụ nke ọma.

> Rịba ama: Ọbụna ụfọdụ ngwa mgbakwunye CMS na-eji API n'okpuru mkpuchi, yabụ ịmepụta igodo API na-abụkarị nzọụkwụ mbụ achọrọ**, n'agbanyeghị usoro njikọta gị.

Nzọụkwụ ọzọ: mepụta igodo API maka ụlọ ahịa gị wee malite iji [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) iji wulite njikọta gị.


### Ịmepụta Igodo API

Iji tinye BTPay Server na weebụsaịtị ma ọ bụ ngwa gị, ị ga-achọ ịmepụta igodo API.

1. Banye na BTCPay Server wee mepee menu onye ọrụ **(nkuku aka nri elu)
2. Gaa na **Igodo API**
3. Pịa **Mepụta igodo API ọhụrụ**
4. Tinye aha maka igodo gị
5. Na ngalaba **Ikike**, mee ka:
   - `Can create invoice`
   - `Can view invoice`
   - *(Nhọrọ)* `Can modify store settings` - naanị ma ọ bụrụ na ịchọrọ njikwa ọkwa ụlọ ahịa

6. Pịa **Mepụta**. A ga-egosi igodo API nkeonwe gị - detuo ma chekwaa ya nke ọma.

> Igodo a na-enye ohere ịnweta akwụkwọ ọnụahịa ụlọ ahịa gị. 
> Ekwela kesaa ya n'ihu ọha ma ọ bụ kpughee ya na koodu nke ndị ahịa.

---

### Ihe atụ: Ịmepụta akwụkwọ ọnụahịa site na API

**Ọgwụgwụ:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Arịrịọ ahụ:**

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

**Azịza:**

Ị ga-enweta ihe JSON yana:

* `invoiceId`
* URL ịkwụ ụgwọ ị nwere ike itinye na weebụsaịtị gị ma ọ bụ zigara onye ahịa ya

Lee akwụkwọ zuru ezu:
[Greenfield API - Mepụta akwụkwọ ọnụahịa](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Ịtọlite Webhook (Nhọrọ)

Iji nata ọkwa ozugbo mgbe ọnọdụ akwụkwọ ọnụahịa gbanwere (dịka ọmụmaatụ mgbe a natara ụgwọ):

1. Gaa na ntọala ụlọ ahịa gị -> **Webhooks**
2. Tinye URL nke njedebe azụ gị nke ga-ejikwa `POST` arịrịọ sitere na sava BTPay
3. BTPay ga-ezipụ ọkwa ozugbo mgbe akwụchara ụgwọ akwụkwọ ọnụahịa ma ọ bụ gwụchara

A kọwara ibu ọrụ Webhook na usoro nnwale ọzọ na [akwụkwọ webhook gọọmentị](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Ihe atụ njikọta dị maka asụsụ mmemme dị iche iche na akwụkwọ BTPay na ebe nchekwa GitHub.



### Njikọ CMS

BTPay Server na-akwado plugins maka sistemụ njikwa ọdịnaya ama ama (CMS). 
Njikọ kachasị ochie ma dị irè bụ na **WordPress + WooCommerce**, na-eme ka ọ dị mfe ịnakwere ịkwụ ụgwọ ZEC **na-edeghị koodu**.

---

#### WooCommerce (WordPress)

BTCPay Server na-akwado ngwa mgbakwunye maka WooCommerce n'ụzọ iwu kwadoro.

Nzọụkwụ iji jikọta:

1. Wụnye ngwa mgbakwunye **BTCPay maka WooCommerce** site na ndekọ ngwa mgbakwunye WordPress ma ọ bụ site na GitHub.
2. Na ngalaba nchịkwa WordPress gị, gaa na:

`WooCommerce -> Settings -> Payments`

3. Chọta **BTCPay** na ndepụta ahụ wee pịa **Setup**
4. Tinye URL nke sava BTPay gị wee soro ntuziaka ikike 
   (a na-atụ aro ka ịmepụta igodo API akpaka)
5. Mee ka usoro ịkwụ ụgwọ ahụ rụọ ọrụ ma chekwaa ntọala gị

> Ntuziaka zuru ezu, nkuzi vidiyo, na ntuziaka nchọpụta nsogbu dị na akwụkwọ mgbakwunye ahụ.

Ị ga-ahụkwa nhọrọ njikọta CMS ndị ọzọ n'otu ngalaba ahụ nke akwụkwọ BTPay.

---

### Bọtịnụ ịkwụ ụgwọ ma ọ bụ Iframe (Achọghị CMS ma ọ bụ API)

Ọ bụrụ na ị naghị eji CMS ma ịchọghị ịrụ ọrụ na API, ụzọ kachasị mfe iji nabata ịkwụ ụgwọ ZEC bụ itinye njikọ ịkwụ ụgwọ ma ọ bụ wijetị** ozugbo na weebụsaịtị gị.

Usoro a dị mma maka:

- Ibe ọdịda
- Ebe nrụọrụ weebụ Pọtụfoliyo
- Blọọgụ ma ọ bụ ibe ndị na-anaghị agbanwe agbanwe
- Ọrụ ndị na-enweghị ihe nkesa azụ

---

#### Nhọrọ nke 1: Bọtịnụ ịkwụ ụgwọ (njikọ)

1. Na BTCPay Server, jiri aka mepụta akwụkwọ ọnụahịa na ngalaba **Invoices**
2. Detuo njikọ ịkwụ ụgwọ ahụ, dịka ọmụmaatụ:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Tinye njikọ ahụ na HTML gị:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Nhọrọ nke 2: Akwụkwọ ọnụahịa agbakwunyere (Iframe)

Iji gosipụta akwụkwọ ọnụahịa ahụ ozugbo na saịtị gị, jiri iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> I nwere ike ime ka bọtịnụ ma ọ bụ akpa iframe dị ka o kwesịrị ka e mee ya - BTCPay Server na-enye ohere ka ibe akwụkwọ ọnụahịa ahụ dị iche iche.

## Mmechi

Nduzi a dị ogologo - mana ọ na-ekpuchi naanị akụkụ ndị bụ isi nke ijikọta ịkwụ ụgwọ Zcash na BTCPay Server.

Njikọ BTCPay Server na-enye ọrụ karịa nke anyị gosiri ebe a. Ọ dabara nke ọma, UI dị n'ọtụtụ asụsụ (gụnyere Rọshịa), nke na-eme ka ọ dị mfe inyocha na nnwale ọzọ.

BTPay bụ ngwaọrụ dị mfe iji. Ị nwere ike:

* Nabata ọtụtụ ụlọ ahịa nọọrọ onwe ha n'otu ihe atụ
* Kọwaa ọrụ na ikike omenala maka ndị otu - site na nlele iwu-naanị ruo nchịkwa zuru oke
* Jiri ngalaba na akara ngosi nke gị
* Hazie webhooks, obere akpa azụ, na ọbụna ohere Tor
* Hazie ntọala dị elu dịka iwu ụtụ isi, koodu mbelata ego, nhazi ibe ndenye ego, mmachi usoro ịkwụ ụgwọ, na ihe ndị ọzọ

E wuru BTPay dị ka ihe ọzọ maka ndị na-enye ụgwọ ọrụ etiti. Ọ bụrụ na ịchọrọ ịnakwere ịkwụ ụgwọ ZEC nkeonwe na-enweghị onye nnọchi anya, ikpo okwu a kwesịrị nlebara anya gị nke ukwuu.

Anyị na-achọ ka ị nwee ihe ịga nke ọma n'ịchọpụta usoro BTCPay ma mee ka ịkwụ ụgwọ gị bụrụ nke gị n'ezie.

## akụrụngwa

* [Weebụsaịtị BTCPay nke sava gọọmentị](https://btcpayserver.org/)
* [Ajụjụ Ndị A Na-ajụkarị Banyere BTCPay](https://docs.btcpayserver.org/FAQ/)
* [Ebe Nchekwa GitHub nke sava BTPay](https://github.com/btcpayserver/btcpayserver)
* [Ngosipụta Mainnet nke sava BTCPay](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Plugin maka BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Ntuziaka Nwụnye Zcash Plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Ihe atụ zcash-lightwalletd.custom.yml ahaziri iche](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Faịlụ Dekọọ Docker nke Lightwalletd (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Akwụkwọ Igodo API BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Mepụta Ọwara Cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Ndepụta Ndakọrịta Akpa Zcash (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd na Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
