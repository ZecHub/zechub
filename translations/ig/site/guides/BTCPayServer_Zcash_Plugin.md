# BTCPay Server na Nkwado Zcash: Ntuziaka ntinye zuru ezu na Njikọ Akaụntụ

BTCPay Server na-enye ohere ka azụmahịa dị n'ịntanetị nabata ịkwụ ụgwọ cryptocurrency ozugbo, na-enweghị ndị nnọchi anya ma ọ bụ ndị nlekọta. Ntuziaka a ga - eduga gị site na usoro zuru ezu nke ịmepụta BTCPay server yana nkwado ala maka Zcash echekwara ego.

> Akwụkwọ a na-elekwasị anya n'ịmekọrịta Zcash n'ime ihe atụ BTCPay Server gị. 
> Ọ na-akwado ma ** zuru ọnụ (Zebra) ** yana ntọala dabere na lightwalletd.

---

## Isiokwu Ndị Dị na Ya

- [Ihe mere eji jiri BTCPay Server na Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Otu BTCPay Server si arụ ọrụ](#How-BTCPay-Server-Works)
- [Ònye Na-eji Ntọala Ndị A? Olee Otú E Si Enweta Ha?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Otu esi edozi BTCPay Server maka ịnakwere Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Ịmepụta BTCPay Server na Nkwado Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Na-agba ọsọ gị Zcash Full Node (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Njikọ na mpụga lightwalletd Node (Nhazi ahaziri)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Ịnweta BTCPay Server n'ụlọ na Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Ịhazi Zcash Plugin na BTCPay Server Web Interface](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Ijikọta BTCPay Server na Weebụsaịtị Gị](#Integrating-BTCPay-Server-with-Your-Website)
  - [Njikọ API](#API-Integration)
    - [Ịmepụta API Key](#Generating-an-API-Key)
    - [Ihe Nlereanya: Ịmepụta akwụkwọ ọnụahịa site na API](#Example-Creating-an-Invoice-via-API)
    - [Ịtọlite Webhook](#Setting-Up-a-Webhook-Optional)
  - [Njikọ CMS](#CMS-Integration)
  - [Ịkwụ Ụgwọ Button ma ọ bụ Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Ihe Ndị A Na-ekwu na Ya](#Conclusion)
- [Akụnụba](#Resources)


---

## Ihe mere eji jiri BTCPay Server na Zcash

Azụmaahịa n'ịntanetị na-anabata cryptocurrency. Ọ dị ngwa, zuru ụwa ọnụ ma rụọ ọrụ na enweghị ụlọ akụ. Nke a bara uru maka ndị ahịa na ndị ahịa. Ma enwere nkọwa dị mkpa nke ọtụtụ leghara anya.

Mgbe ị na-etinye iwu, onye ahịa ahụ na-enyekarị ozi nkeonwe: aha, adreesị mbupu, yana nọmba ekwentị. Ọ bụrụ na akwụ ụgwọ a jiri blockchain ọha - dị ka Bitcoin, Ethereum, ma ọ bụ stablecoins on Ethereum or Tron - azụmahịa ahụ ga-ahụ anya maka nyocha.

Onye ọbụla, n'amaghị ihe a nyere iwu ka o mee nwere ike:

- lee mgbe na ego ole a kwụrụ ya. 
- Chọpụta ebe ego ndị ahụ si bịa na ebe ha gara. 
- jikọta adreesị cryptocurrency na onye dị adị ma ọ bụrụ na enwere isi ihe metụtara ya (dịka ọmụmaatụ, ozi-e agbasawo ma ọ bụ aha mbupu)

Nke a pụtara na otu ihe mmadụ zụrụ nwere ike ime ka ọ mata ego ole onye ahụ ji.

And it works the other way as well. If a merchant's address has ever appeared on-chain, they become exposed. Competitors and third-party observers can track payment volumes, supplier activity, and the structure of business flows.

### Nchikota nke BTCPay Server na Zcash nwere ike idozi nke a.


BTCPay Server bụ usoro n'efu na nke a na-adịghị etinye aka maka ịnata ịkwụ ụgwọ cryptocurrency. 
Ọ bụghị onye na-akwụ ụgwọ ma ọ bụ nwee ego. Ịkwụ ụgwọ niile na-aga ozugbo n'akpa ahịa ahụ. 
Nke a nwere ike ịbụ obere akpa ego nke onwe ma ọ bụ nhazi ọtụtụ ntinye aka n'ime nzukọ.

Ihe nkesa ahụ na-arụ ọrụ nhazi:

- na-emepụta adreesị pụrụ iche maka usoro ọ bụla. 
- na-esote mgbe a natara ụgwọ ma jikọta ya n'usoro ahụ. 
- na-enye akwụkwọ nnata ego ma ọ bụ ozi. 
- na-enye onye ahịa a ịkwụ ụgwọ interface. 

Ihe niile na-agba n'okpuru njikwa nke onye nwe ụlọ ahịa, na-enweghị ịdabere na ọrụ ndị ọzọ.

Zcash bụ cryptocurrency nke e wuru na ihe akaebe efu. Ọ kwadoro ụdị azụmahịa nzuzo zuru oke. 
Mgbe ị na-eji adreesị echekwara (nke a kpọrọ naanị adreesị), onye zitere, ndị nnata, yana ego azụmahịa anaghị ekpughe ya na blockchain.

Maka ụlọ ahịa dị n'ịntanetị, nke a pụtara:

- Onye na-azụ ihe nwere ike mezue ugwo ahụ n'ekpugheghị akụkọ ego ha. 
- Onye na-ere ahịa ahụ natara ego n'ebughị ụzọ kpughee ebe ha bi, ọnụ ọgụgụ nke ihe ndị e rere ere ma ọ bụ otú azụmahịa si aga. 
- Enweghị onye na-ekiri n'èzí nwere ike ijikọ ụgwọ ahụ na iwu ma ọ bụ data ndị ahịa.

### Ihe Nlereanya Bara Uru

Onye ọrụ na-etinye iwu ma họrọ Bitcoin ma ọ bụ USDT dị ka usoro ịkwụ ụgwọ. 
Ebe nrụọrụ weebụ na-emepụta adreesị ịkwụ ụgwọ ma gosipụta ego ahụ. 
Mgbe akwụchara ụgwọ ahụ, a na-echekwa adreesị a n'ime blockchain ma bụrụ nke ọha. 
Onye na-awakpo naanị kwesịrị ijikọ otu iwu gaa adreesị iji nweta visibiliti ogologo oge n'ime akụkọ azụmahịa ya niile.

Ugbu a chee otu ọnọdụ ahụ na Zcash. 
BTCPay Server na-emepụta adreesị echedoro. Onye zụrụ ya zitere ụgwọ ahụ. 
Site n'echiche nke blockchain, ọ dịghị ihe na-eme. Enweghị data ọha mmadụ iji nyochaa. 
Ihe nkesa na-enweta nkwenye, jikọta ya n'usoro ahụ ma mezue usoro.

Nye onye ọ bụla nọ n'èzí, o yiri ka ihe adịghị eme. 
Ihe nile metụtara ezi uche na-adịgide n'etiti ụlọ ahịa ahụ na onye zụrụ ya - dị ka o kwesịrị ịdị.

Ngwọta a anaghị emebi akpaaka ma ọ bụ ojiji. 
Ihe niile na-arụ ọrụ otu ihe ahụ dị ka ndị ọzọ cryptocurrencies, naanị enweghị ize ndụ nke data leaks.



## Otu BTCPay Server si arụ ọrụ

BTCPay Server na-arụ ọrụ dịka akwa nhazi ịkwụ ụgwọ n'etiti usoro e-commerce gị na blockchain. Nke a bụ otu esi arụ ọrụ:

1. ** Onye ahịa ahụ na-etinye iwu** n'ebe nrụọrụ weebụ gị (dịka WooCommerce, Magento ma ọ bụ usoro ihe omume ọ bụla nwere njikọta BTCPay).

2. ** Ụlọ ahịa ahụ na-arịọ maka akwụkwọ ọnụahịa ịkwụ ụgwọ** site n'aka BTCPay Server. Ihe nkesa ahụ mepụtara akwụkwọ ọnụ ọgụgụ pụrụ iche:
   - Ọnụ ego nke iwu ahụ.
   - Oge ngụda oge.
   - A Zcash Unified Address (UA) - e.g., `u1...` - nke gụnyere onye na-anata Orchard (nchebe) site na ndabara.

3. ** Onye ahịa ahụ na-ahụ peeji ịkwụ ụgwọ** ma zigara ZEC n'adres e nyere.

4. **BTCPay Server na-enyocha blockchain**, nyochaa ịkwụ ụgwọ megide:
   - Ego a tụrụ anya ya .
   - Adreesị e dere ebe a ga-esi nweta ya.
   - Oge akara akwụkwọ ọnụahịa ahụ.

5. **Ozugbo achọpụta azụmahịa ahụ ma kwado ya**, BTCPay na-agwa ụlọ ahịa.

6. ** Onye ahịa na-enweta nkwenye ịkwụ ụgwọ.** Nhọrọ, ihe nkesa nwere ike izipu nnata site na email.

Usoro a dum na-eme **na akpaghị aka**, n'enweghị ndị ogbugbo ma ọ bụ ndị nlekọta. 
BTCPay Server anaghị **ejide ego ọ bụla** - naanị ya na-ejikọ usoro iwu ahụ na blockchain n'ụzọ dị nchebe ma bụrụ nkeonwe.
## Ònye Na-eji Ntọala Ndị A? Olee Otú E Si Enweta Ha?

BTCPay Server abụghị ** obere akpa ego ma ọ chọghị igodo nzuzo. 
Ego niile na-aga ** ozugbo** n'akpa onye ahịa ahụ. Ejiri nchekwa site na iji usoro ụlọ ọrụ dabere na igodo ngosi **.

### Otú O Si Arụ Ọrụ

- ** A na-emepụta obere akpa ahụ tupu oge eruo.** 
  Onye ahịa ahụ na-eji obere akpa Zcash nke kwadoro igodo nlele - dịka [Zkool](https://github.com/hhanh00/zkool2/) or [Zingo! Wallet](https://zingolabs.org/).  
  E nwere ndepụta zuru ezu na: [ZecHub.wiki](https://zechub.wiki/wallets).

- ** BTCPay Server jikọọ site na igodo nlele.** 
  Igodo nlele bụ ** igodo a na-agụ naanị: ọ nwere ike ịchọpụta ịkwụ ụgwọ mbata ma mepụta adreesị nnata ọhụrụ, 
  mana ọ pụghị imefu ego. Ihe nkesa ahụ anaghị echekwa mkpụrụ okwu ma ọ bụ igodo nzuzo.

- ** A na-enweta data blockchain site n'aka onye ọrụ. `lightwalletd` ihe nkesa.** 
  Ị nwere ike iji oghere ọha dị ka `https://zec.rocks`, ma ọ bụ na-agba ọsọ nke gị. `Zebra + lightwalletd` n'elu maka zuru ọbụbụeze.

- **Onye ọ bụla na-enweta adreesị pụrụ iche.** 
  Igodo nlele na-enye ohere ka ihe nkesa ahụ nweta adreesị Zcash ọhụrụ echekwara maka akwụkwọ ọnụahịa ọ bụla, 
  na-eme ka nsuso ịkwụ ụgwọ echekwa ma gbochie iji adreesị eme ihe.

- **Ị na-ejide njikwa zuru oke n'elu ego.** 
  Ọbụna ma ọ bụrụ na ihe nkesa ahụ emebi, onweghị onye nwere ike izu ego gị - naanị metadata ịkwụ ụgwọ ka enwere ike ikpughe.

Nke a imewe kewara **infrastructure** si **asset akara**. 
Ị nwere ike imelite, kwaga ma ọ bụ wụnye BTCPay Server n'etinyeghị ego ọbụla na nsogbu.

## Otu esi edozi BTCPay Server maka ịnakwere Zcash

N'akụkụ ndị gara aga, anyị kọwara etu BTCPay Server si arụ ọrụ na Zcash yana ihe kpatara o ji dị mkpa maka ịkwụ ụgwọ nzuzo. Ugbu a ọ bụ oge iji aka gị rụọ ya.

Ihe ị ga-eme n'ebe ahụ dabere n"ọtụtụ ihe:

- Ị nwere ihe atụ BTCPay Server?
- Ịchọrọ iji lightwalletd ọha ma ọ bụ na-agba ọsọ gị onwe zuru ọnụ?
- Ihe nkesa ahụ ọ ga-agba ọsọ na VPS maọbụ n'ụlọ?

Isiakwụkwọ a na-ekpuchi ọnọdụ nhazi niile dị ugbu a - site na ntọala pere mpe ruo ntinye nke ọchịchị zuru oke.

Anyị ga-agafe ihe ndị a:

- Otu esi etinye ihe niile site na ncha na VPS, gụnyere ọnụ zuru ezu (Zebra)
- Otu esi agba ọsọ BTCPay Server n'ụlọ ma na-edebe IP gị zoro ezo site na iji ** Cloudflare Tunnel**
- Otu esi eme ma hazie nkwado Zcash n'ime ntanetị weebụ BTCPay Server
- Otu esi etinye BTCPay na ebe nrụọrụ weebụ gị ma ọ bụ ụlọ ahịa n'ịntanetị


## Ịmepụta BTCPay Server na Nkwado Zcash

Let's move on to the actual setup. In this section, we'll install BTCPay Server with Zcash support - either on a fresh VPS or by adding ZEC support to an existing instance.

Ọ bụrụ na ị nwere BTCPay Server arụ ọrụ (dịka maka BTC ma ọ bụ Lightning), ịkwesighi itinye ihe niile - naanị mee ka ngwa mgbakwunye ZEC.

Anyị ga-eje ije site dị iche iche configurations, si di ntakiri setups iji a ọha na eze `lightwalletd` node na ntinye zuru oke nke nwere ikike gị. 
Nhọrọ kachasị mma na-adabere n'ebe nkesa gị dị nakwa ókè ị chọrọ nnwere onwe site na akụrụngwa mpụga.

> Akwụkwọ edemede nke ngwa mgbakwunye: 
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> ** Ịdọ aka ná ntị - otu obere akpa kwa oge:** 
> Ihe mgbakwunye Zcash na-eji **otu obere akpa a kesara** gafee **ụlọ ahịa niile** n'ihe atụ BTCPay. 
> Ọ bụrụ na ị kwadoro ọtụtụ ụlọ ahịa ndị nweere onwe ha n'otu oge, ha ga-ekerịta otu obere akpa Zcash. 
> Jiri ihe dị iche ma ọ bụrụ na ịchọrọ ka akpa ego gị nọrọ naanị ya.

---

### Nhazi VPS akwadoro

Tupu ịwụnye, jide n'aka na i nwere:

- VPS na ** Ubuntu 22.04+**
- Aha ngalaba na-ezo aka n'adres IP nke ihe nkesa gị (site DNS)
- `git`, `docker`, na `docker-compose` arụnyere na ya
- SSH ohere na ihe nkesa ahụ

---

## Ịkwadebe Ihe Nkesa Gị (akụkụ zoro ezo)

<details>
  <summary>Click to expand</summary>

Iji tinye BTCPay Server na nkwado Zcash, ị ga-achọ ihe ndị a:

### 1. VPS na Ubuntu 22.04 ma ọ bụ ọhụrụ

Anyị na-akwado iji obere nwụnye nke ** Ubuntu Server 22.04 LTS**. 
Onye ọ bụla na-enye VPS nke nyere adreesị IP raara onwe ya nye ga-arụ ọrụ. 

**Obere ihe ndị a chọrọ**: 
- 2 CPU cores 
- 4 GB RAM 
- 40 GB ohere diski 

Ntọala a zuru ezu ma ọ bụrụ na ị na-eji lightwalletd maka Zcash. 
Ọ bụrụ na ị na-eme atụmatụ ịgba ọsọ ** zuru Zcash node, ọ ga - adị gị mkpa opekata mpe 300 GB nke ohere diski efu.

---

### 2. Aha ngalaba na-ezo aka gị nkesa

Na dashboard onye na-enye DNS gị, mepụta ihe a `A` ndekọ maka subdomain 
(e.g. `btcpay.example.com`) nke na-ezo aka adreesị IP VPS gị. 

A ga-eji ngalaba a iji nweta BTCPay Server site na ihe nchọgharị ahụ. 
na iji mepụta akwụkwọ SSL n'efu site na Ka anyị Encrypt.

---

### 3. SSH ohere na ihe nkesa ahụ

Iji wụnye BTCPay Server, ị ga-ejikọrịrị na VPS gị site na SSH. 
Site na ọdụ gị, gbaa ọsọ:

`ssh root@YOUR_SERVER_IP`

Ọ bụrụ na ị jiri macOS, Linux ma ọ bụ WSL na Windows, SSH adịlarị n'ime ọnụ.
Na Windows nkịtị, jiri onye ahịa SSH dị ka ** PuTTY**.

---

### 4. Wụnye Git, Docker na Docker Compose

Ozugbo ejikọrọ site na SSH, melite usoro gị ma wụnye ihe ndị dị mkpa:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Na Ubuntu 22.04 na nke ọhụrụ, `docker-compose` site na APT bụ deprecated.
> Ihe a na- atụ aro ka e jiri mee ihe bụ: `docker-compose-plugin`, nke na-enye ndị ọrụ. `docker compose` iwu (dee oghere kama ịdebanye aha).

Ebe nchekwa gị dị njikere ugbu a maka ịwụnye BTCPay Server.

</details>

---

### Nzọụkwụ 1: Kpoo Ebe nchekwa ahụ

Mepụta ndekọ ọrụ ma budata ntinye BTCPay Server Docker:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Nzọụkwụ 2: Mbupụ Environment Variables

Dochie ya . `btcpay.example.com` na ngalaba gị n'ezie:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Ọ bụrụ na ị bu n'obi itinye Monero ma ọ bụ Litecoin mgbe e mesịrị, ịnwere ike ịgụnye ha ugbu a:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Ị nwere ike itinye mkpụrụ ego ọhụrụ n'oge ọ bụla site na mbupụ mgbanwe ndị kwesịrị ekwesị ma weghachite edemede ntọala:

`. ./btcpay-setup.sh -i`

Maka ntuziaka a, anyị ga-elekwasị anya na **Zcash naanị**.

---

### Nzọụkwụ 3: Gbaa Onye Ntinye ahụ

Gbaa edemede ntọala iji wuo ma malite ihe nkesa:

`. ./btcpay-setup.sh -i`

Ihe odide ahụ ga-etinye ihe ndị na-adabere, mepụta usoro nhazi. `docker-compose.yml`, bido ọrụ, ma hazie ya. `systemd`.
Nke a na-ewe ihe dị ka nkeji ise.

Ozugbo emechara, ihe atụ BTCPay Server gị ga-adị na:

`https://btcpay.example.com`

> Ọ bụrụ na ị na-agbanwe nrụnye dị (dịka ịgbakwunye ZEC), jide n'aka ịkwụsị ma malitegharịa ihe nkesa ahụ site na ntọala ọhụrụ:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Mgbe ahụ gaa n'ihu na ngalaba ọzọ iji hazie Zcash na ntanetị weebụ BTCPay Server.



## Na-agba ọsọ gị Zcash Full Node

Ọ bụrụ na ị ga-achọ **ọ bụghị** ịdabere n'ihe ndị ọha mmadụ kwuru, ọ bụ naanị mgbe ahụ ka i nwere ike ikwu okwu. `lightwalletd` nodes, ị nwere ike itinye gị zuru Zcash node tinyere Lightwalletd na otu ihe nkesa. 
Nke a na-enye gị ** nnwere onwe zuru oke ** - enweghị ndị ọzọ, ọ dịghị mkpa ịtụkwasị obi.

---

### Nzọụkwụ 1: Jide n'aka na Ị nwere ohere zuru ezu na diski ike gị .

Otu Zcash zuru ezu (Zebra + Lightwalletd) ugbu a chọrọ ** 300+ GB** nke ohere diski, ọ na-aga n'ihu na-eto eto.

Nkọwapụta:

- Ebe nchekwa data Zebra blockchain: ~ 260-270 GB
- Lightwalletd indexing: ~15-20 GB

#### Nchebe a tụrụ aro:

- **400 GB+** ma ọ bụrụ na ihe nkesa ahụ ejiri naanị maka ịkwụ ụgwọ Zcash.
- **800 GB+** ma ọ bụrụ na ihe nkesa ahụ na-agba ọsọ BTCPay Server, PostgreSQL, Nginx, wdg.

> Ọ kachasị mma iji diski SSD / NVMe nwere ** 1 TB ikike, karịsịa ma ọ bụrụ na ị naghị eme atụmatụ iwepụ data mgbe niile.

---

### Nzọụkwụ 2: Tinye mgbanwe gburugburu ebe obibi

Tinye ihe ndị a na ntọala gburugburu gị iji rụọ ọrụ nhazi zuru ezu:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Nke a ga-agụnye ndị na - eme ihe nkiri . `zcash-fullnode` nke na-ebute ma ọ bụ ngwaike. `zebrad` na nke a: `lightwalletd` n'ime BTCPay Server.

---

### Nzọụkwụ 3: Gbanyegharịa Installer ahụ ọzọ

`. ./btcpay-setup.sh -i`

Ihe odide ahụ ga-abụ:

* Budata ihe oyiyi Docker maka Zebra na Lightwalletd
* Tọọ ọrụ n'ime BTCPay stack
* Jikọọ ngwa mgbakwunye Zcash na ** mpaghara** `lightwalletd` ihe atụ

> ** Nchịkọta zuru ezu nke blockchain nwere ike iwe ọtụtụ ụbọchị, karịsịa na sava VPS dị ala.
> Ruo mgbe a ga-emecha mmekọrịta ahụ, ịkwụ ụgwọ echekwara agaghị adị.


## Njikọ na mpụga Lightwalletd Node

N'ọtụtụ ọnọdụ, a chọghị nnwere onwe zuru oke - na ndị ahịa nwere ike ọ gaghị achọ itinye oge na ohere diski iji mee ka ọnụ Zcash jupụta. 
Site na ndabara, BTCPay Server jikọọ n'ihu ọha `lightwalletd` node iji dozie ịkwụ ụgwọ echekwara na-enweghị nbudata dum blockchain.

Ihe njedebe ndabara bụ:

`https://zec.rocks:443`

Otú ọ dị, ị nwere ike hazie BTCPay Server jikọọ **ọ bụla mpụga `lightwalletd` node**, dị ka:

`https://lightwalletd.example:443`

Nkebi a na-egosi otu esi eme nke ahụ site n'iji ** omenala Docker fragment**.

> Ihe atụ zuru ezu na gburugburu ebe obibi niile dị n'ime ihe nchọgharị ahụ. [ihe mgbakwunye nchekwa](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Nzọụkwụ ndị dị n'okpuru na-egosi nhazi ọrụ kachasị nta.

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

Ihe ahụ bụ: `exclusive` na-eme ka o doo anya na ọ bụ nanị otu mpempe akwụkwọ nwere akara ahụ (`zcash` na nke a) nwere ike ịdị n'ọrụ otu mgbe.
Nke a na-egbochi configure esemokwu - n'ihi na ihe atụ, ị nwere ike ghara ịgba ọsọ ma ndị `zcash-fullnode` mpempe akwụkwọ na omenala a n'èzí `lightwalletd` na-agbaji n'otu oge.
Site n'ịkpọ ya dị ka: `exclusive: zcash`, BTCPay Server ga-akpaghị aka gbanyụọ ndabara `zcash-fullnode` na nke ime ụlọ. `lightwalletd` akpa, na-enye gị ohere ijikọ ọnụ nke mpụga gị kama.

---

### Nzọụkwụ 2: Tinye mgbanwe gburugburu ebe obibi

N'ọnụ ụzọ:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Nzọụkwụ 3: Kọwaa Adreesị Nhazi Mpụga

Mepee gị . `.env` faịlụ:

`nano .env`

Tinye ahịrị na-esonụ, dochie URL ahụ site n'isi njedebe ị họọrọ:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Ị nwere ike iji:

* A ** ọha ọnụ, dị ka ndị a: `https://lightwalletd.zcash-infra.com`
* Gị onwe gị na-onwe kwadoro ọnụ, deployed iche site BTCPay Server

> Ọ bụrụ na mpụga `lightwalletd` na-aghọ ndị a na-adịghị ahụkebe ma ọ bụ buru ibu, ịkwụ ụgwọ echekwara ga-ada.
> Maka ọrụ ndị dị oké mkpa, họrọ ** njedebe na-akwụsi ike ma gosipụta** (dị ka ndabara `zec.rocks`).

> Chọrọ ka onwe gị nọrọ n'ụlọ ya `lightwalletd`?
> Ị nwere ike iji ya mee ihe. `docker-compose.lwd.yml` site na nke a [Ebe nchekwa Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> ** Ịdọ aka ná ntị:** Ntọala a adịghị edepụtara ya n'ụzọ iwu kwadoro ma chọọ nhazi TLS, ntinye ọdụ ụgbọ mmiri na njikwa firewall - akwadoro maka ndị ọrụ nwere ọganihu naanị.

---

### Nzọụkwụ 4: Gbanyegharịa Installer ahụ ọzọ

`. ./btcpay-setup.sh -i`

BTCPay Server ga-etinye gị omenala config na jikọọ kpọmkwem `lightwalletd` ọnụ.

Site ugbu a gaa n'ihu, ngwa mgbakwunye Zcash ga-eji njedebe ahụ dị na mpụga maka ijikwa azụmahịa echekwara.


## Ịnweta BTCPay Server n'ụlọ na Cloudflare Tunnel

Chọrọ ịnabata ịkwụ ụgwọ Zcash mgbe ị na-akwado BTCPay Server na ngwaọrụ ụlọ - dịka Raspberry Pi 5 ma ọ bụ ihe nkesa mpaghara **na-enweghị IP static**? 
Ị nwere ike iji ** Cloudflare Tunnel** kpughee ihe atụ gị na ịntanetị.

Usoro a na-ezere ịmegharị ọdụ ụgbọ mmiri ma zoo ezigbo adreesị IP gị n'ihu ọha - ebe ọ na-eme ka sava gị nwee ike ịnweta site na HTTPS.

Ọ na-enyekwara gị aka ** izere ụgwọ nke ịgbazite VPS, nke dị mma ma ọ bụrụ na ịkwụ ụgwọ cryptocurrency bụ nhọrọ nhọrọ kama ịbụ isi azụmahịa gị.

---

### Nzọụkwụ 1: Wụnye Ọwara Cloudflare

1. Mepụta akaụntụ na: [igwe ojii.com](https://www.cloudflare.com) ma tinye ngalaba gị.
2. Na ihe nkesa gị, wụnye Cloudflare Tunnel:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Nyochaa na Cloudflare:

`cloudflared tunnel login`

Iwu a ga-emepe windo nchọgharị. Banye ma nye ikike ịnweta ngalaba gị.
Cloudflare ga-emepụta ihe na akpaghị aka. `credentials` faịlụ na akara ngosi gị.

4. Mepụta ọwara ọhụrụ (ị nwere ike ịkpọ ya aha) `btcpay` ma ọ bụ ihe ọzọ):

`cloudflared tunnel create btcpay`

Nke a na-emepụta ihe dị ka otu. `btcpay.json` faịlụ nwere njirimara ọwara na nzere - ị ga-achọ ya n'ọzọ nzọụkwụ ọzọ.

---

### Nzọụkwụ 2: Mepụta Njikwa Nhazi Ọwara

Mepụta ndekọ nhazi (ọ bụrụ na ọ dịghị adị) ma mepee faịlụ config:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Tinye nhazi a:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Nkọwa:

* `tunnel` - aha ọwara ahụ i kere na mbụ.
* `credentials-file` - ụzọ na faịlụ akara ngosi e mepụtara n'oge usoro ahụ. `cloudflared tunnel login`
* `hostname` - ngalaba gị edebanye aha na Cloudflare (dịka. `btcpay.example.com`)
* `service` - adreesị mpaghara nke BTCPay Server gị (na-abụkarị `http://127.0.0.1:80` maka Nginx)

> Cloudflare ga-eji proxy mee njem n'ụzọ dị nchebe na sava mpaghara gị, na-enweghị ikpughe IP ụlọ gị.


### Nzọụkwụ 3: Tinye ndekọ DNS maka Ọwara gị

Mgbe emechara ọwara ahụ, Cloudflare ga-ejikarị ** na - agbakwunye ihe ndekọ CNAME DNS maka ngalaba gị. Ọ kwesịrị ịdị ka nke a:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Ọ bụrụ na ọ naghị apụta n'onwe ya, tinye ya aka:

1. Gaa na nke gị . [Igwe ojii Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Gaa na ngalaba ** DNS**
3. Tinye ihe ndekọ CNAME ọhụrụ:
   - ** Aha**: `btcpay`
   - ** Ihe a na-achọ**: `<UUID>.cfargotunnel.com`  
     Ị nwere ike ịchọta ọnụ ahịa ya n'akwụkwọ gị. `btcpay.json` faịlụ ma ọ bụ site na-agba ọsọ:
     
     `cloudflared tunnel list`
     
   - **Ọnọdụ proxy**: Kwadoro (igwe ojii oroma)

> Ihe ndekọ a na-eme ka e jide n'aka na arịrịọ nile maka enyemaka ga - eru ndị mmadụ aka . `btcpay.example.com` A na-eduzi gị site n'okporo ụzọ Cloudflare, na-ezobe ezigbo adreesị IP gị.

---

### Nzọụkwụ 4: Kwado Ọwara na System mmalite

Iji mee ka ọwara ahụ na-agba ọsọ ozugbo, wụnye ya dị ka ọrụ usoro:

`sudo cloudflared service install`

Mgbe ahụ mee ka ọrụ rụọ ma malite:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Lelee ọnọdụ:

`sudo systemctl status cloudflared`

Ị ga-ahụ ozi dịka: `Active: active (running)` na nkwenye nke ahụ bụ: `btcpay.example.com` dị n'ịntanetị.

> Site ugbu a gaa n'ihu, ọwara ahụ ga-amalite na akpaghị aka mgbe ọbụla ị maliteghachiri ya, ma BTCPay Server gị ga - abụ nke ọha mmadụ nwere ike ịnweta - enweghị ebugharị ọdụ ụgbọ mmiri na - egosighi ezigbo IP gị.

---

### Nzọụkwụ 5: Mezue Mbido BTCPay Server Setup

Ọ bụrụ na ị ga-etinye BTCPay Server maka oge mbụ, setịpụ ngalaba gị tupu ịmebe edemede ntọala:

`export BTCPAY_HOST="btcpay.example.com"`

This ensures the correct domain is used when generating the **Nginx configuration** and **SSL certificates**.

Ọ bụrụ na BTCPay Server arụnyerelarị ma ị ka na-agbakwunye ọwara ahụ:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Ntọala ahụ ga-eme ka nhazi na itinye ngalaba ọhụrụ.
Ị ga-enwe ike ịnweta sava gị ugbu a na:

`https://btcpay.example.com`

> Ma ị na-eji ọha mmadụ eme ihe ma ọ bụ ndị ọzọ. `lightwalletd` ma ọ bụ gị onwe gị zuru ọnụ, nke a adịghị emetụta oghere ahụ.
> Ihe niile dị mkpa bụ na BTCPay Server na-ege ntị n'elu `127.0.0.1:80` n'ógbè.


## Ịhazi Zcash Plugin na BTCPay Server Web Interface

> ** Ihe dị mkpa maka nhazi ụlọ ahịa ọtụtụ:** 
> Akpa ego Zcash a haziri ebe a bụ ** zuru ụwa ọnụ na ihe atụ. Ụlọ ahịa niile ga-eji akpa ego a ọ gwụla ma ị na-agba ọsọ BTCPay iche iche.

Mgbe ị na-etinye nke ọma gị BTCPay Server atụ, Ị ga mkpa ịrụ ụfọdụ isi nhazi site admin web interface. 
Akwụkwọ ntuziaka gọọmentị na-enye ntụziaka zuru ezu n'asụsụ Bekee - ebe a, anyị ga-agafe usoro ndị dị mkpa ma lekwasị anya kpọmkwem na ịhazi ngwa mgbakwunye Zcash.

---

### Nzọụkwụ 1: Banye na Web Interface

Gaa na ihe atụ gị:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Tinye nbanye nchịkwa gị na paswọọdụ.
- Ọ bụrụ na nke a bụ oge mbụ ị banyere, a ga-agwa gị ka ịmepụta akaụntụ.
- Akaụntụ mbụ ị debanyere aha ga-enye gị ikike nchịkwa na akpaghị aka.

---

### Nzọụkwụ 2: Wụnye Zcash Plugin

1. Na isi menu, gaa na:

`Plugins -> Browse Plugins`

2. Chọta ngwa mgbakwunye **Zcash (ZEC)**. Jiri ogwe ọchụchọ ma ọ bụrụ na achọrọ ya.
3. Pịa ** Wụnye** ma kwado.

> Tinyegharịa usoro a maka ihe ọ bụla ọzọ altcoins ị na-enyere n'oge nhazi nkesa.

Mgbe echichi, pịa ** Malitegharịa ekwentị Server** iji weghachite interface na plugins nọ n'ọrụ.


### Step 3: Connect Your Wallet via Viewing Key

Mgbe ị wụnye ngwa mgbakwunye ahụ, ngalaba ọhụrụ ** Zcash** ga-apụta na menu ntọala.

1. Go to:

`Zcash -> Settings`

2. Paste your **Unified Full Viewing Key (UFVK)** - BTCPay will derive a Unified Address for each invoice and detect incoming shielded payments.

> **Cheta:** A na-akwado igodo nlele Sapling, ma iji Orchard / Unified Addresses ị ga - enye **UFVK**.


   Ihe atụ nke usoro:

`uview184syv9wftwngkay8d...`

3. Tinye uru na mpaghara Block height (N'ihi ya, ọ bụrụ na ị nwere ihe ọzọ)

* ** Mbido mbụ na obere akpa ọhụrụ (okwu mkpụrụ ọhụụ):** tinye elu Zcash ugbu a (ị nwere ike ịlele ya na 3xpl.com/zcash) - nke a ga-eme ka nyocha izizi dị ngwa.
* **Migrating on the same server from a legacy Sapling-only setup to Unified Addresses / Orchard:** leave this field empty.
* **Ibugharị ụlọ ahịa gị na sava ọhụrụ nwere otu obere akpa / UFVK:** ị ga-ahọrọ ịbanye ogo ọmụmụ - ihe dị elu nke iwu mbụ akwụ ụgwọ maka ụlọ ahịa (kwekọọ ụbọchị ịtụ n'elu 3xpl iji belata nyocha ahụ). Ọ bụrụ na ejighị n'aka, hapụ ya efu.

> Ọ bụghị obere akpa ego niile na-akwado ** Unified Full Viewing Key (UFVK)** mbupụ ma. 
> Nhọrọ ndị a tụrụ aro: 
> – [**Zkool** Ọ bụ ihe na-atọ ụtọ.](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! obere akpa (ụdị maka PC)**](https://zingolabs.org/)  
> Na ngwa abụọ ahụ, chọọ UFVK export na ngalaba nkwado ndabere / mbupụ.

Igodo ndị a na-akwado ** ntụgharị adreesị akpaka, nke pụtara:
- Onye ahịa ọ bụla na-enweta adreesị ịkwụ ụgwọ ** pụrụ iche**
- Ị na-ahụ **otu, unified** itule

Ị nwere ike ịchọta ndepụta ndakọrịta sara mbara na: [ZecHub -> Wallets (Mkpịsị ego)](https://zechub.wiki/wallets).

Ozugbo e mejupụtara mpaghara niile, pịa **Chekwaa**.

---

### Nyochaa Ụgwọ Ịkwụ ụgwọ ZEC gị

Ekele - obere akpa Zcash gị ejikọtara ugbu a na BTCPay Server.

Ka anyị mee nnwale:

1. Go to:

`Invoices -> Create New`

2. Mepụta akwụkwọ ọnụahịa ule maka obere ego na ZEC.
3. Zipu ego site na **akpa dị iche** (ọ bụghị nke ejikọtara BTCPay).
4. Ozugbo achọpụta azụmahịa ahụ, akwụkwọ ọnụahịa ga-egosipụta ememe ngosi.
5. Kwenye na ọnọdụ akwụkwọ ọnụahịa gbanwere ** Paid**.

Ọ bụrụ na ihe niile arụ ọrụ - ị dị njikere ijikọ ụgwọ ZEC n'ime ebe nrụọrụ weebụ gị site na iji API ma ọ bụ CMS plugins.



## Ijikọta BTCPay Server na Weebụsaịtị Gị

Ozugbo akpa ego Zcash gị jikọtara na BTCPay Server, ị nwere ike ijikọ usoro nkwụnye ụgwọ ahụ n'ime ebe nrụọrụ weebụ gị. 
Enwere ọtụtụ ụzọ iji mee nke a - site na ịnweta API ozugbo ruo ngwa mgbakwunye dị njikere maka nyiwe CMS ndị ama ama.

---

### Nhọrọ Mmekọrịta Ndị Ọzọ

- **Njikọ API** 
  Ezigbo maka weebụsaịtị ma ọ bụ usoro e wuru na-enweghị CMS. 
  Na-enye gị njikwa zuru oke na mmepụta akwụkwọ ọnụahịa, nsuso ịkwụ ụgwọ, yana ọkwa - niile n'ime interface nke aka gị. 
  Na-achọ ihe ọmụma mmemme dị mkpa, ya mere ọrụ a bụ nke kachasị mma site n'aka onye mmepụta gị.

- ** CMS Plugins** Ndị na-arụ ọrụ n'ime ụlọọrụ gị. 
  Enwere maka nyiwe dịka ** WooCommerce, PrestaShop na ndị ọzọ. 
  Ihe mgbakwunye ndị a na-enye gị ohere ịnabata ịkwụ ụgwọ n'ime nkeji ole na ole - enweghị koodu achọrọ.

- ** bọtịnụ ịkwụ ụgwọ ma ọ bụ Iframe** 
  Ụzọ kasị mfe. 
  Zuru oke maka peeji nke ọdịda, ebe nrụọrụ weebụ onwe onye ma ọ bụ saịtị ọ bụla ịchọrọ itinye njikọ onyinye ma ọ̄ bụ ngwa nlele ego.

---

### Njikọ API

Ọ bụrụ na ị na-eji usoro omenala (ma ọ bụ enweghị CMS ma ọlị), API bụ nhọrọ kachasị mma. 
Ọ na-enye gị mgbanwe zuru oke: ị nwere ike ịmepụta akwụkwọ ọnụahịa, soro ọnọdụ ha, nata ọkwa, ma jikwaa ahụmịhe onye ọrụ.

> Rịba ama: Ọbụna ụfọdụ plugins CMS na-eji API n'okpuru mkpuchi, ya mere ịmepụta igodo API bụkarị ** nzọụkwụ mbụ achọrọ ** , agbanyeghị usoro mwekota gị.

Nzọụkwụ ọzọ: mepụta igodo API maka ụlọ ahịa gị ma malite iji ya [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) iji wulite njikọ gị.


### Ịmepụta API Key

Iji jikọta BTCPay Server na weebụsaịtị ma ọ bụ ngwa gị, ị ga-achọ ịmepụta igodo API.

1. Banye na BTCPay Server ma mepee ** menu onye ọrụ** (akụkụ aka nri elu)
2. Gaa na ** API Keys**
3. Pịa ** Mepụta igodo API ọhụrụ**
4. Tinye aha maka igodo gị
5. Na ngalaba ** Ikike, mee ka:
   - `Can create invoice`
   - `Can view invoice`
   - * ((Ọ bụghị iwu))* `Can modify store settings` - naanị ma ọ bụrụ na ịchọrọ njikwa ụlọ ahịa-larịị.

6. Pịa ** Mepụta**. Igodo API nkeonwe gị ga-egosipụta - detuo ma chekwaa ya n'ụzọ dị nchebe.

> Igodo a na-enye ohere ịnweta akwụkwọ ọnụahịa ụlọ ahịa gị. 
> Ejila ya n'ihu ọha ma ọ bụ kpughee ya na koodu ndị ahịa.

---

### Ihe Nlereanya: Ịmepụta akwụkwọ ọnụahịa site na API

**Ebe njedebe:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Otu onye na-arịọ arịrịọ:**

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

** Azịza:**

Ị ga-enweta ihe JSON na:

* `invoiceId`
* URL ịkwụ ụgwọ nke ị nwere ike itinye na ebe nrụọrụ weebụ gị ma ọ bụ zigara onye ahịa ahụ

Lee akwụkwọ zuru ezu:
[Greenfield API  Mepụta akwụkwọ ọnụahịa](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Ịtọlite Webhook (Nhọrọ)

Iji nweta ezigbo oge ọkwa mgbe akwụkwọ ọnụahịa ọnọdụ mgbanwe (eg, mgbe a natara ugwo):

1. Gaa na ntọala ụlọ ahịa gị -> ** Webhooks**
2. Tinye URL nke njedebe azụ gị ga-ejikwa ya `POST` arịrịọ sitere na BTCPay Server
3. BTCPay ga-eziga ọkwa na akpaghị aka mgbe akwụ ụgwọ ma ọ bụ gwụchaa akwụkwọ ọnụahịa.

A na-akọwa ihe ndị dị mkpa nke webhook ma gbalịa mgbagha n'ime usoro a. [akwụkwọ ọrụ webhook.](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Ihe atụ nke njikọta dị maka asụsụ mmemme dị iche na BTCPay docs na GitHub repositories.



### Njikọ CMS

BTCPay Server na-akwado plugins maka usoro njikwa ọdịnaya (CMS) a ma ama. 
Mmekọrịta kachasị etolite ma na-ejikarị eme ihe bụ **WordPress + WooCommerce**, nke mere ka ọ dị mfe ịnabata ịkwụ ụgwọ ZEC **na-enweghị ederede koodu.

---

#### WooCommerce (WordPress) Na-arụ ọrụ na WordPress.com

BTCPay Server na-akwado ngwa mgbakwunye maka WooCommerce.

Nzọụkwụ iji tinye:

1. Wụnye ngwa mgbakwunye **BTCPay maka WooCommerce** site na ndekọ WordPress ma ọ bụ GitHub.
2. Na WordPress panel admin gị, gaa na:

`WooCommerce -> Settings -> Payments`

3. Chọta **BTCPay** na ndepụta ma pịa **Setup**
4. Tinye URL BTCPay Server gị ma soro ntuziaka ikikere ahụ. 
   (A na-atụ aro ịmepụta igodo API akpaka)
5. Kwado usoro ịkwụ ụgwọ ma chekwaa ntọala gị

> Ntuziaka zuru ezu, nkuzi vidiyo na ntuziaka nsogbu dị na akwụkwọ mgbakwunye.

Ị ga-ahụkwa nhọrọ ntinye CMS ndị ọzọ n'otu ngalaba ahụ nke BTCPay docs.

---

### bọtịnụ ịkwụ ụgwọ ma ọ bụ Iframe (enweghị CMS ma ọ̄ bụ API chọrọ)

Ọ bụrụ na ị naghị eji CMS ma ọ bụ achọghị ịrụ ọrụ na API, ụzọ kachasị mfe iji nabata ụgwọ ZEC bụ ** itinye njikọ nkwụnye ego ma ọ̄ bụ wijetị** ozugbo na ebe nrụọrụ weebụ gị.

Usoro a dị mma maka:

- Ibe akwukwo ozi ala
- Ebe nrụọrụ weebụ Pọtụfoliyo
- Blọọgụ ma ọ bụ peeji ndị na-adịgide adịgide
- Ọrụ na-enweghị ihe nkesa azụ

---

#### Nhọrọ 1: bọtịnụ ịkwụ ụgwọ (njikọ)

1. Na BTCPay Server, jiri aka mepụta akwụkwọ ọnụahịa na ngalaba ** Akwụkwọ ọnụahịa**
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

> Ị nwere ike ịhazi bọtịnụ ma ọ bụ iframe container iji kwekọọ na saịtị gị - BTCPay Server na-enye ohere mgbanwe nke akwụkwọ ọnụahịa.

## Ihe Ndị A Na-ekwu na Ya

Ntuziaka a dị ogologo - mana ọ na-ekpuchi naanị akụkụ ndị bụ isi nke ijikọta ịkwụ ụgwọ Zcash na BTCPay Server.

Ihe ntanetị BTCPay Server na-enye ọtụtụ ọrụ karịa ka anyị gosipụtara ebe a. Ọ dabara nke ọma, UI dị n'ọtụtụ asụsụ (gụnyere Russian), na-eme ka ọ dịrị ya mfe ịchọpụta ma nwalee ọzọ.

BTCPay bụ ngwa ọrụ na-agbanwe agbanwe. Ị nwere ike:

* Na-echekwa ọtụtụ ụlọ ahịa na otu ihe atụ
* Kọwaa ọrụ na ikikere maka ndị otu - site n'usoro-dịka naanị nchịkwa zuru oke
* Jiri ngalaba gị na akara ngosi nke aka gị
* Tọọ webhooks, obere akpa nchekwa, na ọbụna ohere Tor
* Hazie ntọala dị elu dịka iwu ụtụ isi, koodu ego, nhazi peeji nke ịkwụ ụgwọ, mmachi usoro ịkwụghachi ụgwọ na ndị ọzọ.

BTCPay was built as an open-source alternative to centralized payment providers. If you're looking to accept private ZEC payments with no intermediaries, this platform is absolutely worth your attention.

Anyị na-achọ ka ị nwee ihe ịga nke ọma n'ịchọpụta usoro okike BTCPay ma mee ka ụgwọ gị bụrụ nke gị.

## Akụnụba

* [Ebe nrụọrụ weebụ BTCPay Server Official Website](https://btcpayserver.org/)
* [BTCPay FAQ](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub Ebe nchekwa](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet Ihe ngosi](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Plugin maka BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Ntuziaka Ntinye Zcash Plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Omenala zcash-lightwalletd.custom.yml Ihe Nlereanya](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker Kọwaa faịlụ (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API Key Docs (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Mepụta Ọwara Cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Ndepụta ndakọrịta nke obere akpa Zcash (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd na Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
