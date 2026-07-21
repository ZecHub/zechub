# BTCPay Server na Nkwado Zcash: Ntuziaka Ntinye na Njikọ zuru ezu

BTCPay Server allows online businesses to accept cryptocurrency payments directly, without intermediaries or custodians. This guide walks you through the complete process of setting up BTCPay Server with native support for Zcash shielded payments.

> Akwụkwọ a na-elekwasị anya na ijikọta Zcash n'ime ihe atụ BTCPay Server gị. 
> Ọ na-akwado ma ** full node (Zebra) ** na ** lightwalletd-based setups **.

---

## Isiokwu Ndị Dị n'Ụlọ Nche A

- [Kedu ihe kpatara iji BTCPay Server na Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Otu BTCPay Server si arụ ọrụ](#How-BTCPay-Server-Works)
- [Ebee Ka A Na-echekwa Ego? Ònye Na-achịkwa Mkpịsị Ugodi Onwe Onye?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Otu esi edozi BTCPay Server maka ịnakwere Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Itinye BTCPay Server na Nkwado Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Running Your Own Zcash Full Node (Zebra + Lightwalletd) ]](#Running-Your-Own-Zcash-Full-Node)
  - [Ijikọ na mpụga lightwalletd Node (Omenala nhazi) ]](#Connecting-to-an-External-Lightwalletd-Node)
  - [Ịnweta BTCPay Server n'ụlọ na Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Ịhazi Zcash Plugin na BTCPay Server Web Interface](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Ijikọta BTCPay Server na weebụsaịtị gị](#Integrating-BTCPay-Server-with-Your-Website)
  - [Njikọ API](#API-Integration)
    - [Ịmepụta API Key](#Generating-an-API-Key)
    - [Ihe Nlereanya: Ịmepụta akwụkwọ ọnụahịa site na API]](#Example-Creating-an-Invoice-via-API)
    - [Ịtọlite a Webhook](#Setting-Up-a-Webhook-Optional)
  - [Njikọ CMS](#CMS-Integration)
  - [Payment Button ma ọ bụ Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Nkwubi okwu](#Conclusion)
- [Ebe e si enweta ego](#Resources)


---

## Ihe Mere I Ji Jiri BTCPay Server na Zcash

Online commerce increasingly accepts cryptocurrency. It's fast, global, and works without banks. This benefits both merchants and customers. But there's an important detail that many overlook.

When placing an order, the customer typically provides personal information: name, shipping address, and phone number. If the payment is made using a public blockchain - such as Bitcoin, Ethereum, or stablecoins on Ethereum or Tron - the transaction becomes permanently visible for analysis.

Onye ọ bụla, ọbụlagodi na-amaghị ihe e nyere n'iwu, nwere ike:

- lee mgbe na ego ole a kwụrụ 
- Chọpụta ebe ego ndị ahụ si bịa na ebe ha gara 
- jikọta adreesị cryptocurrency na onye dị adị ma ọ bụrụ na e nwere ihe ọ bụla metụtara ya (dịka ọmụmaatụ, ozi-e leaked ma ọ bụ aha mbupu)

Nke a pụtara na otu ihe mmadụ zụrụ nwere ike ime ka a mata ihe niile onye ahụ ji ego ya eme.

And it works the other way as well. If a merchant's address has ever appeared on-chain, they become exposed. Competitors and third-party observers can track payment volumes, supplier activity, and the structure of business flows.

### Ngwakọta nke BTCPay Server na Zcash nwere ike idozi nke a.


BTCPay Server bụ sistemụ na-akwụghị ụgwọ na nke anaghị akwụ ụgwọ maka ịnata ịkwụ ụgwọ cryptocurrency. 
Ọ bụghị onye na-akwụ ụgwọ ma ghara ijide ego ọ bụla. Ịkwụ ụgwọ niile na-aga ozugbo na obere akpa onye ahịa. 
Nke a nwere ike ịbụ obere akpa ego nke onwe ma ọ bụ ntọala multisig n'ime nzukọ.

Ihe nkesa ahụ na-arụ ọrụ nhazi:

- na-emepụta adreesị pụrụ iche maka usoro ọ bụla 
- na-esote mgbe a natara ụgwọ ma jikọta ya na iwu ahụ 
- na-ewepụta nnata na ọkwa 
- na-enye onye ahịa a ịkwụ ụgwọ interface 

Ihe niile na-aga n'okpuru njikwa nke onye nwe ụlọ ahịa, na-enweghị ịdabere na ọrụ ndị ọzọ.

Zcash bụ cryptocurrency e wuru na ihe akaebe nke ihe ọmụma efu. Ọ na-akwado ụdị azụmahịa nke onwe ya kpamkpam. 
When using shielded addresses (hereafter simply called “addresses”), the sender, the recipient, and the transaction amount are not revealed on the blockchain.

Maka ụlọ ahịa dị n'ịntanetị, nke a pụtara:

- Onye na-azụ nwere ike mezue ugwo ahụ n'ekpugheghị akụkọ ego ha 
- Onye na-ere ahịa na-anata ụgwọ n'ebughị ụzọ kpughee adreesị ha, ọnụ ọgụgụ ahịa, ma ọ bụ usoro azụmahịa 
- Ọ dịghị onye na-ekiri n'èzí nwere ike ijikọta ụgwọ ahụ na iwu ma ọ bụ data ndị ahịa

### Ihe Nlereanya Bara Uru

Onye ọrụ na-etinye iwu ma họrọ Bitcoin ma ọ bụ USDT dị ka usoro ịkwụ ụgwọ. 
Ebe nrụọrụ weebụ na-emepụta adreesị ịkwụ ụgwọ ma gosipụta ego ahụ. 
Mgbe akwụchara ụgwọ ahụ, a na-echekwa adreesị a na blockchain ma bụrụ nke ọha. 
Onye na-awakpo naanị kwesịrị ijikọ otu iwu na adreesị iji nweta visibiliti ogologo oge na akụkọ azụmahịa ya niile.

Ugbu a chee otu ọnọdụ ahụ na Zcash. 
BTCPay Server na-emepụta adreesị echedoro. Onye na-azụ ahịa na-eziga ụgwọ ahụ. 
Site n'echiche nke blockchain, ọ dịghị ihe na-eme. Enweghị data ọha na eze iji nyochaa. 
Ihe nkesa ahụ na-enweta nkwenye, jikọta ya na iwu ahụ, ma mezue usoro ahụ.

Nye onye ọ bụla nọ n'èzí, o yiri ka ọ dịghị ihe merenụ. 
Echiche nile dị n'etiti ụlọ ahịa na onye ahịa - dị ka o kwesịrị ịdị.

Ngwọta a anaghị emebi akpaaka ma ọ bụ ojiji. 
Ihe niile na-arụ ọrụ otu ihe ahụ dị ka ndị ọzọ cryptocurrencies, naanị na-enweghị ihe ize ndụ nke data leaks.



## Otu BTCPay Server si arụ ọrụ

BTCPay Server na-arụ ọrụ dị ka akwa nhazi ịkwụ ụgwọ n'etiti ikpo okwu e-commerce gị na blockchain. Nke a bụ otu usoro ahụ si arụ ọrụ:

1. Onye ahịa ahụ na-etinye iwu na ebe nrụọrụ weebụ gị (dịka WooCommerce, Magento, ma ọ bụ usoro ọ bụla nwere njikọta BTCPay).

2. **The store requests a payment invoice** from BTCPay Server. The server generates a unique invoice with:
   - Ọnụ ego nke iwu ahụ
   - Oge ngụ oge
   - Zcash Unified Address (UA) - dịka ọmụmaatụ, `u1...` - nke na-agụnye onye na-anata Orchard (nchebe) site na ndabara.

3. **Onye ahịa ahụ na-ahụ peeji ịkwụ ụgwọ** wee zigara ZEC na adreesị enyere.

4. **BTCPay Server na-enyocha blockchain**, na-elele ịkwụ ụgwọ megide:
   - Ọnụ ego a tụrụ anya ya
   - Adreesị a na-ezigara ya
   - Oge akara akwụkwọ ọnụahịa

5. **Ozugbo achọpụtara azụmahịa ahụ ma kwado ya**, BTCPay na-agwa ụlọ ahịa ahụ.

6. ** Onye ahịa na-enweta nkwenye ịkwụ ụgwọ.** Nhọrọ, ihe nkesa nwere ike izipu nnata site na email.

This entire process happens **automatically**, with no intermediaries or custodians.  
BTCPay Server anaghị **ejide ego ọ bụla** - ọ na-ejikọ usoro usoro ahụ na blockchain n'enweghị nsogbu na nzuzo.
## Olee Ebe A Na-edebe Ego? Ònye Na-achịkwa Mkpịsị Ugodi nke Onwe Ya?

BTCPay Server abụghị obere akpa ego ma ọ chọghị igodo nzuzo. 
All funds go **directly** to the merchant's wallet. Security is ensured by using a **viewing key-based architecture**.

### Otú O Si Arụ Ọrụ

- ** A na-emepụta obere akpa ahụ tupu oge eruo.** 
  Onye ahịa ahụ na-eji obere akpa Zcash nke na-akwado igodo nlele - dịka [YWallet](https://ywallet.app/installation) ma ọ bụ [Zingo!](https://zingolabs.org/).  
  Ndepụta zuru ezu dị na [ZecHub.wiki](https://zechub.wiki/wallets).

- **BTCPay Server jikọtara site na igodo nlele.** 
  Igodo a na-ahụ anya bụ ** igodo naanị-agụ **: ọ nwere ike ịchọpụta ịkwụ ụgwọ na-abata ma mepụta adreesị nnata ọhụrụ, 
  ma ọ pụghị imefu ego. Ihe nkesa anaghị echekwa mkpụrụ okwu ma ọ bụ igodo nzuzo.

- ** A na-enweta data blockchain site na `lightwalletd` ihe nkesa.** 
  Ị nwere ike iji oghere ọha dị ka `https://zec.rocks`, ma ọ bụ na-agba ọsọ nke gị `Zebra + lightwalletd` ikpokọta maka ọbụbụeze zuru oke.

- **Onye ọ bụla na-enweta adreesị pụrụ iche.** 
  Igodo nlele na-enye ohere ka ihe nkesa ahụ nweta adreesị Zcash ọhụrụ echedoro maka akwụkwọ ọnụahịa ọ bụla, 
  na-eme ka nsuso ịkwụ ụgwọ echekwa ma gbochie iji adreesị eme ihe.

- **Ị na-ejide njikwa zuru oke n'elu ego.** 
  Ọbụna ma ọ bụrụ na ihe nkesa ahụ mebiri emebi, ọ dịghị onye nwere ike izuru ego gị - naanị metadata ịkwụ ụgwọ nwere ike ikpughe.

Nhazi a na-ekewapụta **infrastructure** site na **asset control**. 
Ị nwere ike imelite, kwaga, ma ọ bụ wụnye BTCPay Server n'etinyeghị ego ọ bụla n'ihe ize ndụ.

## Otu esi edozi ihe nkesa BTCPay maka ịnakwere Zcash

Na ngalaba ndị gara aga, anyị kọwara etu BTCPay Server si arụ ọrụ na Zcash na ihe kpatara o ji dị mkpa maka ịkwụ ụgwọ nzuzo. Ugbu a ọ bụ oge iji aka.

Ihe ị ga-eme n'ebe ahụ ga-adabere n'ọtụtụ ihe:

- Ị nweela ihe atụ BTCPay Server?
- Ịchọrọ iji a ọha lightwalletd ma ọ bụ na-agba ọsọ gị onwe gị zuru ọnụ?
- Ihe nkesa ahụ ọ ga-agba ọsọ na VPS ma ọ bụ n'ụlọ?

Isiakwụkwọ a na-ekpuchi ọnọdụ nhazi niile dị ugbu a - site na ntọala pere mpe ruo na nkenye ọchịchị zuru oke.

Anyị ga-eleba anya n'ihe ndị a:

- Otu esi etinye ihe niile site na ncha na VPS, gụnyere ọnụ zuru ezu (Zebra)
- Otu esi agba ọsọ BTCPay Server n'ụlọ ma na-edebe IP gị zoro ezo site na iji ** Cloudflare Tunnel **
- Otu esi enyere ma hazie nkwado Zcash n'ime ntanetị weebụ BTCPay Server
- Otu esi etinye BTCPay na ebe nrụọrụ weebụ gị ma ọ bụ ụlọ ahịa n'ịntanetị


## Ntinye nke BTCPay Server na Nkwado Zcash

Let's move on to the actual setup. In this section, we'll install BTCPay Server with Zcash support - either on a fresh VPS or by adding ZEC support to an existing instance.

Ọ bụrụ na ị nwere BTCPay Server na-agba ọsọ (dịka maka BTC ma ọ bụ Lightning), ịkwesighi ịtinye ihe niile - naanị mee ka ngwa mgbakwunye ZEC.

Anyị ga-eje ije site dị iche iche configurations, si di ntakiri setups iji a ọha `lightwalletd` node ka ọ bụrụ ihe zuru oke na-achịkwa ya na ntinye gị zuru oke. 
The best option depends on your server location and how much independence you want from external infrastructure.

> Akwụkwọ edemede ngwa mgbakwunye: 
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> ** Ịdọ aka ná ntị - otu obere akpa kwa oge:** 
> Ihe mgbakwunye Zcash na-eji **otu obere akpa a na-ekerịta ** gafee ** ụlọ ahịa niile ** na ihe atụ BTCPay. 
> Ọ bụrụ na ị kwadoro ọtụtụ ụlọ ahịa ndị nweere onwe ha n'otu oge, ha ga-ekerịta otu obere akpa Zcash. 
> Jiri ihe dị iche iche ma ọ bụrụ na ịchọrọ ka akpa ego dịpụrụ adịpụ.

---

### Nhazi VPS akwadoro

Tupu ị wụnye, jide n'aka na i nwere:

- VPS na ** Ubuntu 22.04+**
- Aha ngalaba na-ezo aka na adreesị IP nke ihe nkesa gị (site na DNS)
- `git`, `docker`, na `docker-compose` arụnyere
- SSH ịnweta sava ahụ

---

## Ịkwadebe Server Gị (akụkụ zoro ezo)

<details>
  <summary>Click to expand</summary>

Iji tinye BTCPay Server na nkwado Zcash, ị ga-achọ ihe ndị a:

### 1. VPS na Ubuntu 22.04 ma ọ bụ ọhụrụ

Anyị na-atụ aro iji obere nwụnye nke ** Ubuntu Server 22.04 LTS **. 
Onye ọ bụla na-enye VPS nke nyere adreesị IP raara onwe ya nye ga-arụ ọrụ. 

**Obere ihe ndị a chọrọ**: 
- 2 CPU cores 
- 4 GB RAM 
- 40 GB ohere diski 

Ntọala a zuru ezu ma ọ bụrụ na ị na-eji lightwalletd maka Zcash. 
Ọ bụrụ na ị na-eme atụmatụ ịgba ọsọ Zcash zuru ezu, ị ga-achọ ma ọ dịkarịa ala 300 GB nke ohere disk n'efu.

---

### 2. Aha ngalaba na-ezo aka na ihe nkesa gị

Na dashboard onye na-eweta DNS gị, mepụta `A` ndekọ maka subdomain 
(e.g. `btcpay.example.com`) nke na-ezo aka na adreesị IP VPS gị. 

A ga-eji ngalaba a iji nweta BTCPay Server site na ihe nchọgharị ahụ 
na iji mepụta akwụkwọ SSL n'efu site na Let's Encrypt.

---

### 3. SSH ohere na ihe nkesa

Iji wụnye BTCPay Server, ị ga-ejikọrịrị na VPS gị site na SSH. 
Site na ọdụ gị, gbaa ọsọ:

`ssh root@YOUR_SERVER_IP`

If you use macOS, Linux, or WSL on Windows, SSH is already available in the terminal.
Na Windows nkịtị, jiri onye ahịa SSH dị ka ** PuTTY **.

---

### 4. Wụnye Git, Docker, na Docker Compose

Ozugbo ejikọrọ site na SSH, melite ngwugwu usoro gị ma wụnye ihe ndị dị mkpa:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Na Ubuntu 22.04 na nke ọhụrụ, `docker-compose` site na APT bụ deprecated.
> Ihe ngwugwu a tụrụ aro bụ: `docker-compose-plugin`, nke na-enye `docker compose` iwu (dee oghere n'ọnọdụ dash).

Ihe nkesa gị dị njikere ugbu a maka ịwụnye BTCPay Server.

</details>

---

### Nzọụkwụ 1: Mepụta Nchekwa

Mepụta ndekọ ọrụ ma budata ntinye BTCPay Server Docker:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Nzọụkwụ 2: Mbupụ Environment Variables

Dochie `btcpay.example.com` na ngalaba gị n'ezie:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Ọ bụrụ na ị na-eme atụmatụ ịgbakwunye Monero ma ọ bụ Litecoin mgbe e mesịrị, ịnwere ike ịgụnye ha ugbu a:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Ị nwere ike ịgbakwunye mkpụrụ ego ọhụrụ n'oge ọ bụla site na mbupụ mgbanwe ndị kwesịrị ekwesị na ịmegharị edemede ntọala:

`. ./btcpay-setup.sh -i`

Maka ntuziaka a, anyị ga-elekwasị anya na **Zcash naanị**.

---

### Nzọụkwụ 3: Gbaa Onye Ntinye

Gbaa edemede ntọala iji wuo ma malite ihe nkesa:

`. ./btcpay-setup.sh -i`

Ihe edemede ahụ ga-arụnye dependencies, mepụta `docker-compose.yml`, bido ọrụ, ma hazie `systemd`.
Nke a na-ewe ihe dị ka nkeji ise.

Ozugbo emechara, ihe atụ BTCPay Server gị ga-adị na:

`https://btcpay.example.com`

> If you're modifying an existing installation (e.g. adding ZEC), be sure to stop and restart the server with new settings:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Mgbe ahụ gaa n'ihu na ngalaba na-esote iji hazie Zcash na ntanetị weebụ BTCPay Server.



## Na-agba ọsọ gị Zcash Full Node

If you prefer **not** to rely on public `lightwalletd` nodes, ị nwere ike itinye nke gị zuru ezu Zcash node tinyere Lightwalletd na otu ihe nkesa ahụ. 
Nke a na-enye gị ** nnwere onwe zuru oke ** - enweghị ndị na-adabere na mpụga, enweghị ntụkwasị obi achọrọ.

---

### Nzọụkwụ 1: Jide n'aka na ohere diski zuru ezu

Zcash zuru ezu (Zebra + Lightwalletd) ugbu a chọrọ ** 300+ GB ** nke ohere diski, ọ na-aga n'ihu na-eto eto.

Nkọwa:

- Ebe nchekwa data Zebra blockchain: ~ 260-270 GB
- Lightwalletd indexing: ~15-20 GB

#### Nchebe a tụrụ aro:

- **400 GB+** ma ọ bụrụ na a na-eji ihe nkesa ** naanị ** maka ịkwụ ụgwọ Zcash
- **800 GB+** ma ọ bụrụ na ihe nkesa na-agba ọsọ BTCPay Server, PostgreSQL, Nginx, wdg.

> Kachasị mma iji diski SSD / NVMe nwere ** 1 TB ikike **, ọkachasị ma ọ bụrụ na ị naghị eme atụmatụ iwepụ data mgbe niile.

---

### Nzọụkwụ 2: Set Environment Variables

Tinye ihe ndị a na ntọala gburugburu ebe obibi gị iji rụọ ọrụ nhazi zuru ezu:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Nke a ga-agụnye `zcash-fullnode` mpempe, nke na-ebido ma `zebrad` na `lightwalletd` n'ime BTCPay Server.

---

### Nzọụkwụ 3: Malitegharịa Installer

`. ./btcpay-setup.sh -i`

Ihe odide ahụ ga-abụ:

* Download Docker oyiyi maka Zebra na Lightwalletd
* Hazie ọrụ n'ime BTCPay stack
* Jikọọ ngwa mgbakwunye Zcash na ** mpaghara ** `lightwalletd` ihe atụ

> ** Nchịkọta ngọngọ zuru ezu nwere ike iwe ọtụtụ ụbọchị **, ọkachasị na sava VPS dị ala.
> Ruo mgbe synchronization zuru ezu, echekwara ịkwụ ụgwọ agaghị adị.


## Njikọ na mpụga Lightwalletd Node

N'ọtụtụ ọnọdụ, a chọghị nnwere onwe zuru oke - na ndị ahịa nwere ike ọ gaghị achọ itinye oge na ohere diski na-agba ọsọ Zcash zuru ezu. 
Site na ndabara, BTCPay Server na-ejikọ na ọha `lightwalletd` node iji jikwaa ịkwụ ụgwọ echekwara na-enweghị nbudata dum blockchain.

Ihe njedebe ndabara bụ:

`https://zec.rocks:443`

Otú ọ dị, ị nwere ike hazie BTCPay Server jikọọ **ọ bụla mpụga `lightwalletd` node**, dị ka:

`https://lightwalletd.example:443`

Nkebi a na-egosi otu esi eme nke ahụ site na iji ** omenala Docker fragment **.

> Ihe atụ nhazi zuru ezu na gburugburu ebe obibi niile dị na [ngwa mgbakwunye nchekwa](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Nzọụkwụ ndị dị n'okpuru na-egosi nhazi ọrụ dị ntakịrị.

---

### Nzọụkwụ 1: Mepụta a omenala Docker Fragment

Na ndekọ ọrụ BTCPayServer gị, mepụta faịlụ nkebi omenala:

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

Ihe `exclusive` iwu na-eme ka o doo anya na ọ bụ nanị otu mpempe akwụkwọ nwere otu akara ahụ (`zcash` n'ọnọdụ a) nwere ike ịdị na-arụ ọrụ n'otu oge.
Nke a na-egbochi esemokwu nhazi - dịka ọmụmaatụ, ịnweghị ike ịgba ọsọ ma `zcash-fullnode` mpempe akwụkwọ na nke a omenala mpụga `lightwalletd` iberibe n'otu oge.
Site n'igosi ya dị ka `exclusive: zcash`, BTCPay Server ga-akpaghị aka gbanyụọ ndabara `zcash-fullnode` na nke ime `lightwalletd` akpa, na-ekwe ka ị jikọọ na gị onwe gị mpụga ọnụ kama.

---

### Nzọụkwụ 2: Set Environment Variables

Na ọdụ ụgbọelu:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Nzọụkwụ 3: Kọwaa Adreesị Njikọ Mpụga

Mepee gị `.env` faịlụ:

`nano .env`

Tinye ahịrị na-esonụ, dochie URL na njedebe ị họọrọ:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Ị nwere ike iji:

* A **nọkọ ọha na eze**, dịka `https://lightwalletd.zcash-infra.com`
* Gị onwe gị onwe-kwadoro ọnụ, deployed iche iche si BTCPay Server

> Ọ bụrụ na mpụga `lightwalletd` na-aghọ ndị na-adịghị ma ọ bụ overloaded, echebe ịkwụ ụgwọ ga-ada.
> Maka ọrụ ndị dị oké mkpa, họrọ **kwụsiri ike ma gosipụta njedebe njedebe** (dị ka ndabara `zec.rocks`).

> Chọrọ ijide onwe gị `lightwalletd`?
> Ị nwere ike iji `docker-compose.lwd.yml` site na [ebe nchekwa Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> ** Ịdọ aka ná ntị:** Ntọala a adịghị edepụtara ya n'ụzọ iwu kwadoro ma chọọ nhazi TLS, ntinye ọdụ ụgbọ mmiri, na nhazi firewall - akwadoro maka ndị ọrụ nwere ọganihu naanị.

---

### Nzọụkwụ 4: Malitegharịa Installer

`. ./btcpay-setup.sh -i`

BTCPay Server ga-etinye gị omenala config na jikọọ kpọmkwem `lightwalletd` ọnụ.

Site ugbu a gaa n'ihu, ngwa mgbakwunye Zcash ga-eji njedebe ahụ dị na mpụga maka ijikwa azụmahịa echekwara.


## Ịnweta BTCPay Server n'ụlọ na Cloudflare Tunnel

Chọrọ ịnabata ịkwụ ụgwọ Zcash mgbe ị na-akwado BTCPay Server na ngwaọrụ ụlọ - dịka Raspberry Pi 5 ma ọ bụ ihe nkesa mpaghara ọ bụla **na-enweghị IP static**? 
Ị nwere ike ikpughe ihe atụ gị na ịntanetị site na iji ** Cloudflare Tunnel **.

Usoro a na-ezere nnyefe ọdụ ụgbọ mmiri ma zoo ezigbo adreesị IP gị n'ihu ọha - ebe ị na-edebe ihe nkesa gị site na HTTPS.

Ọ na-enyekwara gị aka izere ụgwọ nke ịgbazite VPS, nke dị mma ma ọ bụrụ na ịkwụ ụgwọ cryptocurrency bụ nhọrọ nhọrọ kama ịbụ isi nke azụmahịa gị.

---

### Nzọụkwụ 1: Wụnye Cloudflare Tunnel

1. Mepụta akaụntụ na [cloudflare.com]](https://www.cloudflare.com) ma tinye ngalaba gị.
2. Na ihe nkesa gị, wụnye Cloudflare Tunnel:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Nyochaa na Cloudflare:

`cloudflared tunnel login`

Iwu a ga-emepe windo nchọgharị. Banye ma nye ikike ịnweta ngalaba gị.
Cloudflare ga-akpaghị aka mepụta `credentials` faịlụ na akara ngosi na ihe nkesa gị.

4. Mepụta ọwara ọhụrụ (ị nwere ike ịkpọ ya `btcpay` ma ọ bụ ihe ọzọ):

`cloudflared tunnel create btcpay`

Nke a na-emepụta a `btcpay.json` faịlụ nwere njirimara ọwara na nzere - ị ga-achọ ya na nzọụkwụ ọzọ.

---

### Nzọụkwụ 2: Mepụta Njikwa Nhazi Ọwara

Mepụta ndekọ nhazi (ọ bụrụ na ọ dịghị adị) ma mepee faịlụ nhazi:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Tinye nhazi ndị a:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Nkọwa:

* `tunnel` - aha ọwara ahụ i kere na mbụ
* `credentials-file` - ụzọ na faịlụ token mepụtara n'oge `cloudflared tunnel login`
* `hostname` - ngalaba gị debanyere aha na Cloudflare (dịka. `btcpay.example.com`)
* `service` - adreesị mpaghara nke BTCPay Server gị (na-abụkarị `http://127.0.0.1:80` maka Nginx)

> Cloudflare ga-ebufe okporo ụzọ n'enweghị nsogbu na sava mpaghara gị, na-enweghị ikpughe IP ụlọ gị.


### Nzọụkwụ 3: Tinye ihe ndekọ DNS maka Ọwara gị

Mgbe emechara ọwara ahụ, Cloudflare ga-agbakwunye ihe ndekọ CNAME DNS maka ngalaba gị. Ọ kwesịrị ịdị ka nke a:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Ọ bụrụ na ọ pụtaghị na akpaghị aka, tinye ya na aka:

1. Gaa na gị [Cloudflare Dashboard]](https://dash.cloudflare.com/)
2. Na-agagharị na ngalaba ** DNS **
3. Tinye ihe ndekọ CNAME ọhụrụ:
   - ** Aha **: `btcpay`
   - ** Ihe a na-achọsi ike **: `<UUID>.cfargotunnel.com`  
     Ị nwere ike ịchọta uru ọ bara n'akwụkwọ gị `btcpay.json` faịlụ ma ọ bụ site na-agba ọsọ:
     
     `cloudflared tunnel list`
     
   - **Ọnọdụ proxy**: Kwadoro (igwe ojii oroma)

> Ihe ndekọ a na-eme ka e jide n'aka na arịrịọ nile maka `btcpay.example.com` na-agafe site na Ọwara Cloudflare, na-ezobe ezigbo adreesị IP gị n'ihu ọha.

---

### Nzọụkwụ 4: Kwado ọwara na mmalite usoro

Iji mee ka ọwara ahụ na-agba ọsọ na-akpaghị aka na buut, wụnye ya dị ka ọrụ usoro:

`sudo cloudflared service install`

Mgbe ahụ mee ka ọrụ ahụ rụọ ọrụ ma malite:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Lelee ọnọdụ:

`sudo systemctl status cloudflared`

Ị ga-ahụ ozi dị ka `Active: active (running)` na nkwenye na `btcpay.example.com` dị n'ịntanetị.

> From now on, the tunnel will start automatically on every reboot, and your BTCPay Server will be publicly accessible - without port forwarding and without exposing your real IP.

---

### Nzọụkwụ 5: Mezue Ntọala BTCPay Server

Ọ bụrụ na ị na-achọ ịwụnye BTCPay Server maka oge mbụ, setịpụ ngalaba gị tupu ị na -agba ọsọ edemede ntọala:

`export BTCPAY_HOST="btcpay.example.com"`

This ensures the correct domain is used when generating the **Nginx configuration** and **SSL certificates**.

Ọ bụrụ na arụnyere BTCPay Server ma ị na-agbakwunye ọwara ahụ:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Ntọala ahụ ga-eweghachi configs ma tinye ngalaba ọhụrụ ahụ.
Ị ga-enwe ike ịnweta sava gị ugbu a na:

`https://btcpay.example.com`

> Ma ị na-eji ọha `lightwalletd` ma ọ bụ gị onwe gị zuru ọnụ, nke a adịghị emetụta ọwara.
> Ihe niile dị mkpa bụ na BTCPay Server na-ege ntị na `127.0.0.1:80` na mpaghara.


## Ịhazi Zcash Plugin na BTCPay Server Web Interface

> ** Ihe dị mkpa maka nhazi ụlọ ahịa ọtụtụ:** 
> Akpa ego Zcash a haziri ebe a bụ ** zuru ụwa ọnụ ** na ihe atụ. Ụlọ ahịa niile ga-eji akpa ego a ọ gwụla ma ị na-agba ọsọ BTCPay iche iche.

Mgbe ị na-etinye nke ọma gị BTCPay Server atụ, ị ga-mkpa ịrụ ụfọdụ isi nhazi site na nchịkwa web interface. 
Akwụkwọ ntuziaka gọọmentị na-enye ntụziaka zuru ezu n'asụsụ Bekee - ebe a, anyị ga-agafe usoro ndị dị mkpa ma lekwasị anya kpọmkwem na ịhazi ngwa mgbakwunye Zcash.

---

### Nzọụkwụ 1: Banye na Web Interface

Gaa n'ihe atụ gị na:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Tinye nbanye nchịkwa gị na paswọọdụ.
- Ọ bụrụ na nke a bụ oge mbụ ị na-abanye, a ga-agwa gị ka ịmepụta akaụntụ.
- Akaụntụ mbụ ị debanyere aha ga-enye gị ikike nchịkwa na-akpaghị aka.

---

### Nzọụkwụ 2: Wụnye Zcash Plugin

1. Na isi menu, gaa na:

`Plugins -> Browse Plugins`

2. Chọta ngwa mgbakwunye ** Zcash (ZEC) **. Jiri ogwe ọchụchọ ma ọ bụrụ na ọ dị mkpa.
3. Pịa **Wụnye** ma kwado.

> Tinyegharịa usoro a maka ihe ọ bụla ọzọ altcoins ị nyeere n'oge nhazi ihe nkesa.

Mgbe echichi, pịa ** Malitegharịa ekwentị Server ** iji weghachite interface na plugins nọ n'ọrụ.


### Step 3: Connect Your Wallet via Viewing Key

Mgbe ị wụnye ngwa mgbakwunye ahụ, ngalaba ** Zcash ** ọhụrụ ga-apụta na menu ntọala.

1. Go to:

`Zcash -> Settings`

2. Paste your **Unified Full Viewing Key (UFVK)** - BTCPay will derive a Unified Address for each invoice and detect incoming shielded payments.

> **Cheta:** A na-akwado igodo nlele Sapling Legacy, mana iji Orchard / Unified Addresses ị ga-enye **UFVK**.


   Ụdị ihe atụ:

`uview184syv9wftwngkay8d...`

3. Tinye uru n'ọhịa Block height

* ** Ntọala oge mbụ na obere akpa ọhụrụ (okwu mkpụrụ ọhụrụ):** tinye elu Zcash ugbu a (ị nwere ike ịlele ya na 3xpl.com/zcash) - nke a na-eme ka nyocha mbụ dị ngwa.
* ** Ịkwaga na otu ihe nkesa ahụ site na ntọala Sapling-naanị ochie na Unified Addresses / Orchard:** hapụ oghere a.
* **Moving your store to a new server with the same wallet/UFVK:** optionally enter the birth height - an approximate height of your store's first paid order (match the order date on 3xpl to narrow the scan). If unsure, leave it empty.

> Ọ bụghị obere akpa ego niile na-akwado ** Unified Full Viewing Key (UFVK) ** mbupụ ma. 
> Nhọrọ ndị a tụrụ aro: 
>  [**YWallet**](https://ywallet.app/installation)  
>  [**Zingo! obere akpa (version maka PC) **](https://zingolabs.org/)  
> Na ngwa abụọ ahụ, chọọ UFVK export na ngalaba nkwado ndabere / mbupụ.

Igodo ndị a na-akwado ** ntụgharị adreesị akpaka **, nke pụtara:
- Onye ahịa ọ bụla na-enweta adreesị ịkwụ ụgwọ pụrụ iche
- Ị na-ahụ **otu, unified** itule

Ị nwere ike ịchọta ndepụta ndakọrịta sara mbara na [ZecHub -> Wallets](https://zechub.wiki/wallets).

Ozugbo mpaghara niile juputara, pịa ** Chekwaa **.

---

### Nyochaa usoro ịkwụ ụgwọ ZEC gị

Ekele - obere akpa Zcash gị ejikọtara ugbu a na BTCPay Server.

Ka anyị mee nnwale:

1. Go to:

`Invoices -> Create New`

2. Mepụta akwụkwọ ọnụahịa nnwale maka obere ego na ZEC.
3. Zipu ego site na **akpa ego dị iche** (ọ bụghị nke ejikọtara na BTCPay).
4. Ozugbo achọpụtara azụmahịa ahụ, peeji akwụkwọ ọnụahịa ga-egosipụta ememe ngosi.
5. Kwenye na ọnọdụ akwụkwọ ọnụahịa gbanwere ** Paid **.

Ọ bụrụ na ihe niile na-arụ ọrụ - ị dịla njikere ijikọta ịkwụ ụgwọ ZEC n'ime ebe nrụọrụ weebụ gị site na iji API ma ọ bụ CMS plugins.



## Ijikọta BTCPay Server na Weebụsaịtị Gị

Ozugbo e jikọtara obere akpa Zcash gị na BTCPay Server, ị nwere ike ijikọ usoro ịkwụ ụgwọ na weebụsaịtị gị. 
E nwere ọtụtụ ụzọ isi mee nke a - site na ịnweta API ozugbo na plugins dị njikere iji maka nyiwe CMS ndị a ma ama.

---

### Nhọrọ Mmekọrịta

- **Njikọ API** 
  Ezigbo maka omenala wuru weebụsaịtị ma ọ bụ usoro na-enweghị CMS. 
  Gives you full control over invoice creation, payment tracking, and notifications - all within your own interface and logic.  
  Na-achọ ihe ọmụma mmemme dị mkpa, yabụ ọrụ a kacha mma site n'aka onye nrụpụta gị.

- **Mgbakwunye CMS** 
  Enwere maka nyiwe dịka ** WooCommerce **, ** PrestaShop **, na ndị ọzọ. 
  Ihe mgbakwunye ndị a na-enye gị ohere ịnabata ịkwụ ụgwọ n'ime nkeji ole na ole - enweghị koodu achọrọ.

- ** bọtịnụ ịkwụ ụgwọ ma ọ bụ Iframe ** 
  Ụzọ kasị mfe. 
  Zuru oke maka peeji nke ọdịda, ebe nrụọrụ weebụ nkeonwe, ma ọ bụ saịtị ọ bụla ebe ịchọrọ itinye njikọ njikọ onyinye maọbụ ego ịkwụ ụgwọ.

---

### Njikọ API

Ọ bụrụ na ị na-eji ikpo okwu omenala (ma ọ bụ enweghị CMS ma ọlị), API bụ nhọrọ kachasị mma. 
Ọ na-enye gị mgbanwe zuru oke: ị nwere ike ịmepụta akwụkwọ ọnụahịa, soro ọnọdụ ha, nata ọkwa, ma jikwaa ahụmịhe onye ọrụ.

> Rịba ama: Ọbụna ụfọdụ plugins CMS na-eji API n'okpuru mkpuchi, ya mere ịmepụta igodo API bụkarị ** nzọụkwụ mbụ achọrọ **, n'agbanyeghị usoro mwekota gị.

Nzọụkwụ ọzọ: mepụta igodo API maka ụlọ ahịa gị ma malite iji [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) iji wulite njikọta gị.


### Ịmepụta Igodo API

Iji jikọta BTCPay Server na weebụsaịtị ma ọ bụ ngwa gị, ị ga-achọ ịmepụta igodo API.

1. Banye na BTCPay Server ma mepee ** menu onye ọrụ ** (akụkụ aka nri aka nri)
2. Gaa na ** API Keys **
3. Pịa ** Mepụta igodo API ọhụrụ**
4. Tinye aha maka igodo gị
5. Na ngalaba ** Ikike, mee ka:
   - `Can create invoice`
   - `Can view invoice`
   - * ((Ọ bụghị iwu) * `Can modify store settings` - naanị ma ọ bụrụ na ịchọrọ njikwa ụlọ ahịa

6. Pịa ** Mepụta **. Igodo API nkeonwe gị ga-egosipụta - detuo ma chekwaa ya n'enweghị nsogbu.

> Igodo a na-enye ohere ịnweta akwụkwọ ọnụahịa ụlọ ahịa gị. 
> Ekekọrịta ya n'ihu ọha ma ọ bụ kpughee ya na koodu ndị ahịa.

---

### Ihe Nlereanya: Ịmepụta akwụkwọ ọnụahịa site na API

**Ebe njedebe:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Onye na-arịọ arịrịọ:**

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

**Azịza ya:**

Ị ga-enweta ihe JSON na:

* `invoiceId`
* URL ịkwụ ụgwọ nke ị nwere ike itinye na ebe nrụọrụ weebụ gị ma ọ bụ zigara onye ahịa

Lee akwụkwọ zuru ezu:
[Greenfield API  Mepụta akwụkwọ ọnụahịa](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Ịtọlite Webhook (Nhọrọ)

Iji nweta ezigbo oge ọkwa mgbe akwụkwọ ọnụahịa ọnọdụ mgbanwe (eg mgbe a natara ugwo):

1. Gaa na ntọala ụlọ ahịa gị -> ** Webhooks **
2. Tinye URL nke njedebe njedebe gị nke ga-ejikwa `POST` arịrịọ sitere na BTCPay Server
3. BTCPay ga-eziga ọkwa na-akpaghị aka mgbe a kwụrụ ụgwọ ma ọ bụ gwụchaa

Webhook payloads and retry logic are described in the [official webhook documentation](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Nchịkọta ihe atụ dị maka asụsụ mmemme dị iche iche na BTCPay docs na GitHub repositories.



### Njikọ CMS

BTCPay Server na-akwado plugins maka usoro njikwa ọdịnaya (CMS). 
The most mature and widely used integration is with **WordPress + WooCommerce**, making it easy to accept ZEC payments **without writing code**.

---

#### WooCommerce (WordPress)

BTCPay Server na-akwado ngwa mgbakwunye maka WooCommerce.

Nzọụkwụ iji jikọta:

1. Wụnye ngwa mgbakwunye **BTCPay maka WooCommerce** site na ndekọ ngwa mgbakwunyere WordPress ma ọ bụ site na GitHub.
2. N'ime ngalaba nchịkwa WordPress gị, gaa na:

`WooCommerce -> Settings -> Payments`

3. Chọta **BTCPay** na ndepụta ma pịa **Setup**
4. Tinye URL BTCPay Server gị ma soro ntuziaka ikikere 
   (A na-atụ aro ịmepụta igodo API akpaka)
5. Kwado usoro ịkwụ ụgwọ ma chekwaa ntọala gị

> Ntụziaka zuru ezu, nkuzi vidiyo, na ntuziaka nchọpụta nsogbu dị na akwụkwọ ngwa mgbakwunye.

Ị ga-ahụkwa ndị ọzọ CMS mwekota nhọrọ na otu ngalaba nke BTCPay docs.

---

### Igodo ịkwụ ụgwọ ma ọ bụ Iframe (Enweghị CMS ma ọ̄ bụ API dị mkpa)

Ọ bụrụ na ị naghị eji CMS ma achọghị ịrụ ọrụ na API, ụzọ kachasị mfe iji nabata ịkwụ ụgwọ ZEC bụ ** itinye njikọ njikọ ma ọ bụ wijetị ** ozugbo na ebe nrụọrụ weebụ gị.

Usoro a dị mma maka:

- Peeji ndị na-ebute ụzọ
- Ebe nrụọrụ weebụ na-echekwa
- Blọọgụ ma ọ bụ peeji ndị na-adịgide adịgide
- Ọrụ na-enweghị ihe nkesa azụ

---

#### Nhọrọ 1: bọtịnụ ịkwụ ụgwọ (njikọ)

1. Na BTCPay Server, jiri aka mepụta akwụkwọ ọnụahịa na ngalaba ** Akwụkwọ ọnụahịa **
2. Detuo njikọ ịkwụ ụgwọ, dịka ọmụmaatụ:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Tinye njikọ ahụ na HTML gị:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Nhọrọ 2: akwụkwọ ọnụahịa agbakwunyere (Iframe)

Iji gosipụta akwụkwọ ọnụahịa ahụ ozugbo na saịtị gị, jiri iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Ị nwere ike ịhazi bọtịnụ ma ọ bụ ihe nkedo iframe iji kwekọọ na saịtị gị - BTCPay Server na-enye ohere mgbanwe mgbanwe nke akwụkwọ ọnụahịa.

## Mmechi

Ntuziaka a dị ogologo - mana ọ na-ekpuchi naanị ihe ndị bụ isi nke ijikọta ịkwụ ụgwọ Zcash na BTCPay Server.

Ihe ntanetị BTCPay Server na-enye ọtụtụ ọrụ karịa ka anyị gosipụtara ebe a. Ọ dabara nke ọma, UI dị n'ọtụtụ asụsụ (gụnyere Russian), na-eme ka ọ dị mfe ịchọpụta na ịnwale ọzọ.

BTCPay bụ ngwá ọrụ na-agbanwe agbanwe. Ị nwere ike:

* Na-echekwa ọtụtụ ụlọ ahịa na-enweghị onwe ha na otu ihe atụ
* Kọwaa omenala ọrụ na ikikere maka ndị òtù otu - site na iji-ele naanị na zuru nchịkwa
* Jiri ngalaba gị na akara ngosi gị
* Tọọ webhooks, obere akpa nchekwa, na ọbụna ohere Tor
* Hazie ntọala ndị dị elu dịka iwu ụtụ isi, koodu ego, nhazi peeji nke ịkwụ ụgwọ, mmachi usoro ịkwụghachi ụgwọ, na ndị ọzọ

BTCPay was built as an open-source alternative to centralized payment providers. If you're looking to accept private ZEC payments with no intermediaries, this platform is absolutely worth your attention.

Anyị na-achọ ka ị nwee ihe ịga nke ọma n'ịchọpụta usoro okike BTCPay ma mee ka ịkwụ ụgwọ gị bụrụ nke gị n'ezie.

## Akụrụngwa

* [Ebe nrụọrụ weebụ BTCPay Server](https://btcpayserver.org/)
* [BTCPay FAQ](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub Ebe nchekwa](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet Demo](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Plugin maka BTCPay (GitHub) ]](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Plugin Ntinye Ntuziaka](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Custom zcash-lightwalletd.custom.yml Ihe Nlereanya](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker mepụta faịlụ (Zebra) ]](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API Key Docs (Greenfield API) ]](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Mepụta Ọwara Igwe ojii](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Ndepụta ndakọrịta nke obere akpa Zcash (ZecHub) ]](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd na Raspberry Pi 5 (ZecHub) ]](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
