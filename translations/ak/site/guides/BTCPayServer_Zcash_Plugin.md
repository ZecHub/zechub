# BTCPay Server a Zcash Mmoa: Installation ne Integration Akwankyerɛ a Edi Mu

BTCPay Server ma intanɛt so nnwuma kwan ma wogye cryptocurrency sikatua tẽẽ, a ntamgyinafo anaa wɔn a wɔhwɛ so nni mu. Saa akwankyerɛ yi nante wo fa ɔkwan a edi mũ a wɔfa so hyehyɛ BTCPay Server a ɛwɔ native mmoa ma Zcash shielded payments.

> Saa nkrataa yi twe adwene si Zcash a wode bɛka wo BTCPay Server nhwɛsoɔ no ho. 
> Ɛboa **full node (Zebra)** ne **lightwalletd-gyina nhyehyɛe** nyinaa.

---

## Nsɛm a Wɔahyehyɛ

- [Nea enti a ɛsɛ sɛ wode BTCPay Server di dwuma ne Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Sɛnea BTCPay Server Yɛ Adwuma](#How-BTCPay-Server-Works)
- [Ɛhe na Wɔde Sika Sie? Hena na Ɔdi Kokoam Safe no So?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Sɛnea Wobɛhyehyɛ BTCPay Server ama Zcash agye atom](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [BTCPay Server a wɔde Zcash Mmoa di dwuma](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Wo Ankasa Zcash Full Node (Zebra + Lightwalletd) a Woretu mmirika .](#Running-Your-Own-Zcash-Full-Node)
  - [Nkitahodi a ɛkɔ External lightwalletd Node (Nhyehyɛe a Wɔahyɛ da ayɛ) so .](#Connecting-to-an-External-Lightwalletd-Node)
  - [BTCPay Server a wobɛgye wɔ Fie ne Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Zcash Plugin a wɔrehyehyɛ wɔ BTCPay Server Wɛb Nkitahodi no mu](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [BTCPay Server a wode bɛka Wo Wɛbsaet no ho](#Integrating-BTCPay-Server-with-Your-Website)
  - [API Nkabom](#API-Integration)
    - [API Safoa a Wɔreyɛ](#Generating-an-API-Key)
    - [Nhwɛsoɔ: Invoice a wɔreyɛ denam API so](#Example-Creating-an-Invoice-via-API)
    - [Webhook a Wobɛhyehyɛ](#Setting-Up-a-Webhook-Optional)
  - [CMS Nkabom](#CMS-Integration)
  - [Katua Button anaa Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Awie](#Conclusion)
- [Akadeɛ](#Resources)


---

## Nea enti a ɛsɛ sɛ wode BTCPay Server di dwuma ne Zcash

Intanɛt so aguadi gye cryptocurrency tom kɛse. Ɛyɛ ntɛmntɛm, ɛyɛ wiase nyinaa de, na ɛyɛ adwuma a sikakorabea nni mu. Eyi so ba aguadifo ne adetɔfo nyinaa so mfaso. Nanso asɛm bi a ɛho hia wɔ hɔ a nnipa pii bu wɔn ani gu so.

Sɛ adetɔfo no reyɛ ade bi a, mpɛn pii no ɔde n’ankasa ho nsɛm ma: ne din, address a wɔde mena, ne telefon nɔma. Sɛ wɔde ɔmanfo blockchain na ɛyɛ sikatua no - te sɛ Bitcoin, Ethereum, anaa stablecoins wɔ Ethereum anaa Tron so a - asɛm no bɛyɛ nea wotumi hu daa ma nhwehwɛmu.

Obiara, mpo a onnim nea wɔhyɛɛ no, betumi:

- hwɛ bere a wotuae ne sika dodow a wotuae 
- hwehwɛ baabi a sika no fi bae ne baabi a ɛkɔe 
- fa cryptocurrency address bi bata onipa ankasa ho sɛ biribi wɔ abusuabɔ a (sɛ nhwɛso no, email anaa din a wɔde mena a ɛdaa adi) .

Eyi kyerɛ sɛ ebia adetɔ biako pɛ bɛma wɔahu adetɔfo bi sikasɛm ho abakɔsɛm nyinaa.

Na ɛyɛ adwuma wɔ ɔkwan foforo so nso. Sɛ aguadifo bi address apue wɔ nkɔnsɔnkɔnsɔn so pɛn a, wɔda wɔn ho adi. Wɔn a wɔresi akan ne nnipa a wɔto so abiɛsa a wɔhwɛ no betumi ahwɛ sika dodow a wotua, wɔn a wɔde nneɛma ma no dwumadi, ne sɛnea adwumayɛ kɔ so no nhyehyɛe.

### BTCPay Server ne Zcash a wɔaka abom no betumi adi eyi ho dwuma.


BTCPay Server yɛ nhyehyɛe a wontua hwee na wɔde ma wɔ mmeae ahorow a wɔde gye cryptocurrency sikatua. 
Ɛnyɛ ntamgyinafo a ɔde tua sika na enkura sika biara. Sika a wotua nyinaa kɔ aguadifo no sika kotoku mu tẽẽ. 
Eyi betumi ayɛ ankorankoro sika kotoku anaasɛ multisig nhyehyɛe wɔ ahyehyɛde bi mu.

Server no di coordination nnwuma ho dwuma:

- ma address soronko bi ma ade biara a wɔkra 
- di bere a wɔanya sika no akyi na ɛde bata nea wɔkrae no ho 
- de nkrataa a wɔde gye sika ne amanneɛbɔ ahorow ma 
- de sikatua ho nhyehyɛe ma adetɔfo no 

Biribiara di dwuma wɔ sotɔɔ wura no tumi ase, a wɔmfa wɔn ho nto nnipa foforo nnwuma so.

Zcash yɛ cryptocurrency a wɔasi wɔ zero-nimdeɛ adanse so. Ɛboa kokoam nkitahodi nhyehyɛe a edi mũ. 
Sɛ wode address ahorow a wɔabɔ ho ban (a wɔfrɛ no “address” kɛkɛ) redi dwuma a, wɔmfa nea ɔde kɔmaa, nea ogye, ne sika a wɔde di gua no nkyerɛ wɔ blockchain no so.

Wɔ intanɛt so sotɔɔ ahorow fam no, eyi kyerɛ sɛ:

- Adetɔfo no betumi awie sika no a ɔrenka wɔn sikasɛm ho abakɔsɛm adi 
- Ɔdetɔnfo no nsa ka sika a ɔnka wɔn address, adetɔn dodow, anaa wɔn aguadi nhyehyɛe ho asɛm 
- Abɔnten so ɔhwɛfo biara nni hɔ a obetumi de sikatua no abata ade a wɔkrae no ho anaasɛ adetɔfo data ho

### Nhwɛso a mfaso wɔ so

Obi a ɔde di dwuma de ahyɛde bi na ɔpaw Bitcoin anaa USDT sɛ ɔkwan a ɔbɛfa so atua. 
Wɛbsaet no yɛ address a wɔde tua sika na ɛkyerɛ sika dodow no. 
Sɛ wotua sika no wie a, wɔde saa address yi sie wɔ blockchain no so na ɛbɛyɛ baguam. 
Nea ehia ara ne sɛ ɔtowhyɛfo de ahyɛde biako bata address no ho na ama watumi ahu n’adwuma ho abakɔsɛm nyinaa bere tenten.

Afei susuw tebea koro no ara a ɛwɔ Zcash ho no ho hwɛ. 
BTCPay Server yɛ address a wɔabɔ ho ban. Ɔdetɔfo no de sika a wotua no mena. 
Sɛ yɛhwɛ blockchain no a, biribiara nsi. Ɔmanfo nsɛm biara nni hɔ a wɔbɛhwehwɛ mu. 
Server no nya confirmation, de bata order no ho, na owie adwuma no.

Wɔ obiara a ofi abɔnten fam no, ɛte sɛ nea biribiara ansi. 
Nteaseɛ nyinaa da so ara wɔ sotɔɔ no ne adetɔfoɔ no ntam - sɛdeɛ ɛsɛ sɛ ɛyɛ.

Saa ano aduru yi nsɛe automation anaasɛ dwumadie. 
Biribiara yɛ adwuma sɛnea ɛte wɔ cryptocurrencies afoforo ho no, asiane biara nni ho sɛ data bɛpue.



## Sɛnea BTCPay Server Yɛ Adwuma

BTCPay Server yɛ adwuma sɛ sikatua ho dwumadie bridge a ɛda wo e-commerce platform ne blockchain ntam. Sɛnea nsu a ɛsen no yɛ adwuma ni:

1. **Adetɔfoɔ no de ahyɛdeɛ** to wo wɛbsaet so (e.g. WooCommerce, Magento, anaa platform biara a ɛwɔ BTCPay nkabom).

2. **Sotɔɔ no bisa sikatua ho nkrataa** fi BTCPay Server hɔ. Server no yɛ invoice soronko bi a ɛwɔ:
   - Sika a wɔkra no
   - Bere a wɔde kan kɔ akyi
   - A Zcash Unified Address (UA) - e.g., `u1...` - a ɛka Orchard (shielded) receiver bi ho default so.

3. **Adetɔfoɔ no hunu sikatua krataafa** na ɔde ZEC kɔ address a wɔde ama no so.

4. **BTCPay Server hwɛ blockchain no so**, hwɛ sikatua no so tia:
   - Sika dodow a wɔhwɛ kwan
   - Address a wɔde gye nsɛm no
   - Invoice bere nsɔano no

5. **Sɛ wɔhunu asɛm no na wɔasi so dua wie a**, BTCPay bɔ sotɔɔ no amanneɛ.

6. **Adetɔfoɔ no nsa ka sikatua ho adansedie.** Sɛ wopɛ a, server no bɛtumi afa email so de krataa a ɛkyerɛ sɛ woagye no amena.

Saa adeyɛ yi nyinaa si **wɔn ankasa**, a ntamgyinafo anaa ahwɛfo biara nni hɔ. 
BTCPay Server **enkura sika biara** - ɛde ahyɛde nhyehyɛe no bata blockchain no ho kɛkɛ wɔ ahobammɔ ne kokoam.
## Ɛhe na Wɔde Sika Sie? Hena na Ɔdi Kokoam Safe no So?

BTCPay Server yɛ **ɛnyɛ** sika kotoku na **enhia kokoam nsafe**. 
Sika nyinaa kɔ **tẽẽ** aguadifo no sika kotoku mu. Wɔnam **viewing key-based architecture** a wɔde di dwuma so na ɛhwɛ ma ahobanbɔ.

### Sɛnea Ɛyɛ Adwuma

- **Wɔadi kan ayɛ sika kotoku no.** 
  Oguadifoɔ no de Zcash sika kotokuo a ɛboa hwɛ safoa - te sɛ [Zkool na ɔkyerɛwee](https://github.com/hhanh00/zkool2/) or [Zingo! Sikabɔtɔ](https://zingolabs.org/).  
  Wobetumi anya nea wɔahyehyɛ no nyinaa wɔ [ZecHub.wiki na ɛwɔ hɔ](https://zechub.wiki/wallets).

- **BTCPay Server nam hwɛbea safoa so na ɛka bom.** 
  Safoa a wɔde hwɛ ade yɛ **safoa a wɔkenkan nkutoo**: ebetumi ahu sikatua a ɛba na ayɛ address foforo a wɔde gye, . 
  nanso entumi nsɛe sika. Server no nkora aba nsɛmfua anaa kokoam safoa so.

- **Blockchain data no nam a `lightwalletd` server.** 
  Wubetumi de public node te sɛ `https://zec.rocks`, anaasɛ tu mmirika w’ankasa de `Zebra + lightwalletd` stack ma tumidi a edi mũ.

- **Akra biara nya address soronko.** 
  Viewing keys ma server no nya Zcash shielded address foforo ma invoice biara, . 
  a ɛbɛma wɔatumi adi sikatua akyi a ahobammɔ wom na wɔasiw address a wɔde bedi dwuma bio no ano.

- **Wokura sika no so tumi nyinaa.** 
  Sɛ mpo server no ayɛ basaa a, obiara ntumi nwia wo sika - payment metadata nko ara na wobetumi ada no adi.

Saa nhyehyeɛ yi tetew **infrastructure** ne **agyapadeɛ sohwɛ** ho. 
Wubetumi ayɛ BTCPay Server no foforo, akɔ baabi foforo, anaa woasan ahyɛ mu a woremfa sika biara nto asiane mu.

## Sɛnea Wobɛhyehyɛ BTCPay Server ama Zcash agye atom

Wɔ afã horow a atwam no mu no, yɛkyerɛkyerɛɛ sɛnea BTCPay Server ne Zcash yɛ adwuma ne nea enti a ɛho hia ma sikatua a ɛkora kokoam nsɛm so. Afei bere aso sɛ yɛde yɛn nsa yɛ adwuma.

Wo nhyehyɛe pɔtee no begyina nneɛma pii so:

- So wowɔ BTCPay Server nhwɛsoɔ dedaw?
- Wopɛ sɛ wode public lightwalletd di dwuma anaasɛ wode w’ankasa full node di dwuma?
- So server no bɛyɛ adwuma wɔ VPS so anaasɛ wɔ fie?

Saa ti yi ka mprempren nhyehyeɛ tebea nyinaa ho asɛm - ɛfiri nhyehyɛɛ a ɛsua koraa so kɔsi sovereign deployments a ɛdi mu so.

Yɛbɛfa nea edidi so yi mu:

- Sɛnea wɔde biribiara bedi dwuma fi mfiase wɔ VPS so, a node a edi mũ (Zebra) ka ho .
- Sɛnea wobɛma BTCPay Server ayɛ adwuma wɔ fie bere a wode wo IP asie denam **Cloudflare Tunnel** so.
- Sɛnea wobɛma Zcash mmoa ayɛ adwuma na woasiesie wɔ BTCPay Server wɛb nkitahodi no mu
- Sɛnea wode BTCPay bɛka wo wɛbsaet anaa intanɛt so sotɔɔ ho


## BTCPay Server a wɔde Zcash Mmoa di dwuma

Momma yɛnkɔ nhyehyɛe ankasa no so. Wɔ ɔfa yi mu no, yɛbɛhyehyɛ BTCPay Server a Zcash mmoa ka ho - wɔ VPS foforɔ so anaasɛ denam ZEC mmoa a yɛde bɛka nhwɛsoɔ a ɛwɔ hɔ dada ho.

Sɛ wowɔ BTCPay Server a ɛreyɛ adwuma dedaw (e.g. ma BTC anaa Lightning), enhia sɛ wosan instɔl biribiara - ma ZEC plugin no nyɛ adwuma kɛkɛ.

Yɛbɛfa nhyehyeɛ ahodoɔ mu, afiri nhyehyɛeɛ a ɛsua koraa a yɛde ɔmanfoɔ di dwuma so `lightwalletd` node to fully sovereign installations a w'ankasa wo node a edi mũ. 
Ɔkwan a eye sen biara no gyina wo server beae ne ahofadi dodow a wopɛ fi abɔnten infrastructure so.

> Plugin ho nkrataa a ɛyɛ aban de: 
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Kɔkɔbɔ - sika kotoku baako wɔ nhwɛsoɔ biara mu:** 
> Zcash plugin no de **sika kotokuo baako a wɔakyekyɛ** di dwuma wɔ **stores nyinaa** wɔ BTCPay nhwɛsoɔ no mu. 
> Sɛ wogye sotɔɔ ahorow pii a ɛde ne ho wɔ nhwɛso biako so a, wɔbɛkyɛ Zcash sika kotoku koro no ara. 
> Fa nhwɛso ahorow a ɛsono emu biara di dwuma sɛ wuhia sika kotoku a wɔtew wo ho denneennen a.

---

### VPS Nsiesiei a Wɔkamfo kyerɛ

Ansa na wobɛhyehyɛ no, hwɛ hu sɛ wowɔ:

- VPS a ɛwɔ **Ubuntu 22.04+**
- Domain din a ɛkyerɛ wo server no IP address (ɛnam DNS so) .
- `git`, `docker`, ne `docker-compose` wɔde ahyɛ mu
- SSH kwan a wɔfa so kɔ server no so

---

## Wo Server a Wobɛsiesie (ɔfã a ahintaw) .

<details>
  <summary>Click to expand</summary>

Sɛ wopɛ sɛ wode BTCPay Server a Zcash mmoa di dwuma a, wubehia nea edidi so yi:

### 1. VPS a ɛwɔ Ubuntu 22.04 anaa nea ɛboro saa

Yɛhyɛ nyansa sɛ fa **Ubuntu Server 22.04 LTS** instɔlehyɛn ketewaa bi di dwuma. 
VPS dwumadie biara a ɔde IP address a wɔatu ho ama no bɛyɛ adwuma. 

**Ahwehwɛde a ɛba fam koraa**: 
- 2 CPU ntini ahorow 
- 4 GB RAM na ɛwɔ hɔ 
- 40 GB disk so baabi a ɛwɔ 

Saa nhyehyeɛ yi dɔɔso sɛ wode lightwalletd redi dwuma ama Zcash a. 
Sɛ woayɛ nhyehyɛe sɛ wobɛfa **Zcash node a ɛyɛ ma** a, wubehia **anyɛ yiye koraa no 300 GB** disk space a wontua hwee.

---

### 2. Domain din a ɛkyerɛ wo server no

Wɔ wo DNS provider no dashboard mu no, yɛ `A` kyerɛwtohɔ ma subdomain bi 
(e.g. `btcpay.example.com`) a ɛkyerɛ wo VPS IP address no. 

Wɔde saa domain yi bedi dwuma de akɔ BTCPay Server so afi browser no so 
na sɛ wobɛma wo ho ayɛ **SSL abodin krataa a wontua hwee** denam Let's Encrypt so.

---

### 3. SSH kwan a wɔfa so kɔ server no so

Sɛ wopɛ sɛ wo instɔl BTCPay Server a, ɛsɛ sɛ wofa SSH so kɔ wo VPS so. 
Fi wo terminal no so, tu mmirika:

`ssh root@YOUR_SERVER_IP`

Sɛ wode macOS, Linux, anaa WSL di dwuma wɔ Windows so a, SSH wɔ terminal no mu dedaw.
Wɔ Windows a ɛnyɛ den so no, fa SSH afɛfo te sɛ **PuTTY** di dwuma.

---

### 4. Fa Git, Docker, ne Docker Compose hyɛ mu

Sɛ wofa SSH so di nkitaho wie a, yɛ wo system packages no foforo na fa nneɛma a ɛho hia no hyɛ mu:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Wɔ Ubuntu 22.04 ne nea ɛboro saa so no, . `docker-compose` fi APT no yɛ nea wɔagyae.
> Nneɛma a wɔkamfo kyerɛ ne sɛ `docker-compose-plugin`, a ɛma `docker compose` ahyɛde (hyɛ ahunmu no nsow sen sɛ wode dash bɛhyɛ mu).

Seesei wo server mpɔtam hɔ ayɛ krado sɛ wobɛhyehyɛ BTCPay Server.

</details>

---

### Anamɔn 1: Clone Repository no mu

Yɛ adwuma kyerɛwtohɔ na twe BTCPay Server Docker deployment no:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Anamɔn 2: Fa Nneɛma a Atwa Yɛn Ho Ahyia Nsakrae Kɔ amannɔne

Hyɛ anan mu `btcpay.example.com` ne wo domain ankasa:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Sɛ woayɛ nhyehyɛe sɛ wode Monero anaa Litecoin bɛka ho akyiri yi a, wubetumi de aka ho mprempren:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Wubetumi de sika foforo aka ho bere biara denam nsakrae ahorow a ɛfata a wode bɛkɔ amannɔne na woasan ayɛ nhyehyɛe script no:

`. ./btcpay-setup.sh -i`

Saa akwankyerɛ yi nti, yɛde yɛn adwene besi **Zcash nkutoo** so.

---

### Anamɔn 3: Fa Installer no di dwuma

Run setup script no na fa si na fi ase server no:

`. ./btcpay-setup.sh -i`

Script no bɛ instɔl dependencies, ayɛ nea `docker-compose.yml`, fi ase nnwuma, na hyehyɛ `systemd`.
Eyi gye bɛyɛ simma 5.

Sɛ wowie a, wo BTCPay Server nhwɛsoɔ no bɛba wɔ:

`https://btcpay.example.com`

> Sɛ woresakra instɔlehyɛn a ɛwɔ hɔ dedaw (e.g. wode ZEC aka ho) a, hwɛ hu sɛ wubegyae na woasan ahyɛ server no ase bio denam nhyehyɛe foforo so:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Afei kɔ ɔfa a edi hɔ no so na hyehyɛ Zcash wɔ BTCPay Server wɛb interface no mu.



## Wo Ankasa Zcash Full Node a Woretu mmirika

Sɛ wopɛ sɛ **ɛnyɛ** sɛ wode wo ho to ɔmanfo so a `lightwalletd` nodes, wobɛtumi de w’ankasa Zcash node a edi mũ aka Lightwalletd ho wɔ server koro no ara so. 
Wei ma wo **full autonomy** - abɔnten so dependencies biara nni hɔ, ahotosoɔ biara nni hɔ a ɛho nhia.

---

### Anamɔn 1: Hwɛ sɛ Disk Space a Ɛdɔɔso

Zcash node a edi mũ (Zebra + Lightwalletd) mprempren hwehwɛ **300+ GB** disk space, na ɛkɔ so nyin.

Nkyekyɛmu:

- Zebra blockchain database no: ~ 260-270 GB
- Lightwalletd nkyerɛkyerɛmu: ~ 15-20 GB

#### Nneɛma a wɔkamfo kyerɛ sɛ wɔmfa nsie:

- **400 GB+** sɛ wɔde server no di dwuma **nko** ma Zcash sikatua a
- **800 GB+** sɛ server no nso de BTCPay Server, PostgreSQL, Nginx, ne nea ɛkeka ho di dwuma a.

> Sɛnea ɛbɛyɛ yiye no, fa SSD/NVMe disk a ɛwɔ **1 TB tumi** di dwuma, titiriw sɛ woannyɛ nhyehyɛe sɛ wobɛtwitwa data daa a.

---

### Anamɔn 2: Set Environment Variables

Fa nea edidi so yi ka wo mpɔtam nhyehyɛe no ho na ama node nhyehyɛe no nyinaa ayɛ adwuma:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Eyi bɛka asɛm no ho `zcash-fullnode` asinasin, a ɛde abien no nyinaa tow `zebrad` ne `lightwalletd` wɔ BTCPay Server mu.

---

### Anamɔn 3: San yɛ Installer no bio

`. ./btcpay-setup.sh -i`

Nkyerɛwee no bɛyɛ:

* Twe Docker mfonini ahorow no ma Zebra ne Lightwalletd
* Hyehyɛ nnwuma no wɔ BTCPay stack no mu
* Fa Zcash plugin no bata ** mpɔtam hɔ** no ho. `lightwalletd` nhwɛsoɔ

> **Blockchain sync a edi mũ betumi agye nna pii**, titiriw wɔ VPS server ahorow a ɛho nhia pii so.
> Enkosi sɛ synchronization bɛwie no, shielded payments rentumi mma.


## Nkitahodi a ɛkɔ Abɔnten Lightwalletd Node bi so

Mpɛn pii no, ɛho nhia sɛ wɔde ahofadi a edi mũ di dwuma - na ebia aguadifo mpɛ sɛ wɔde bere ne disk atenae bedi dwuma de ayɛ Zcash node a edi mũ. 
Sɛnea wɔahyɛ no, BTCPay Server no ne ɔmanfo bi di nkitaho `lightwalletd` node a wɔde bedi sikatua a wɔabɔ ho ban ho dwuma a wontwe blockchain no nyinaa.

Awiei a wɔahyɛ da ayɛ ne:

`https://zec.rocks:443`

Nanso, wobɛtumi asiesie BTCPay Server no sɛ ɛbɛka **abɔnten biara ho `lightwalletd` node**, te sɛ:

`https://lightwalletd.example:443`

Saa ɔfa yi kyerɛ sɛnea wɔyɛ saa denam **custom Docker fragment** so.

> Configuration nhwɛsoɔ a ɛdi mũ a ɛwɔ environment variables nyinaa wɔ hɔ wɔ [plugin akoraeɛ](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Anamɔn a ɛwɔ ase ha no kyerɛ nhyehyɛe a ɛyɛ adwuma kakraa bi.

---

### Anamɔn 1: Yɛ Custom Docker Fragment

Wɔ wo BTCPayServer project directory mu no, yɛ custom fragment fael:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Fa nsɛm a edidi so yi ka ho:

```
exclusive:
- zcash
```

No `exclusive` akwankyerɛ no hwɛ hu sɛ asinasin biako pɛ na ɛwɔ nkyerɛwde koro (`zcash` wɔ eyi mu) betumi ayɛ nnam wɔ bere bi mu.
Wei siw nhyehyeɛ ntawntawdie ano - sɛ nhwɛsoɔ no, worentumi ntu mmienu no nyinaa `zcash-fullnode` fragment ne saa amanne yi akyi `lightwalletd` asinasin bere koro mu.
Ɛdenam agyiraehyɛde a wɔde bɛhyɛ no agyirae sɛ `exclusive: zcash`, BTCPay Server no bɛma default no ayɛ adwuma `zcash-fullnode` ne emu `lightwalletd` containers, a ɛma wo kwan ma wo ne w’ankasa abɔnten node no di nkitaho mmom.

---

### Anamɔn 2: Set Environment Variables

Wɔ terminal no mu no:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Anamɔn 3: Kyerɛkyerɛ Abɔnten Node Address no mu

Bue wo `.env` faale:

`nano .env`

Fa nkyerɛwde a edidi so yi ka ho, fa awiei a woapaw no si URL no ananmu:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Wubetumi de:

* **ɔmanfoɔ node**, te sɛ `https://lightwalletd.zcash-infra.com`
* W’ankasa wo hosted node, deployed soronko fi BTCPay Server

> Sɛ abɔnten so `lightwalletd` sɛ ɛbɛyɛ nea entumi nyɛ adwuma anaasɛ ɛyɛ adesoa dodo a, sikatua a wɔabɔ ho ban no bedi nkogu.
> Wɔ nnwuma a ɛho hia ho no, paw **awiei a ɛyɛ den na wɔada no adi** (te sɛ nea wɔahyɛ da ayɛ no `zec.rocks`).

> Pɛ sɛ wo ho yɛ wo ho ahɔho `lightwalletd`?
> Wubetumi de `docker-compose.lwd.yml` efi [Zebra adekorabea](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Kɔkɔbɔ:** Wɔankyerɛw saa nhyehyɛe yi wɔ aban kwan so na ɛhwehwɛ sɛ wɔde nsa yɛ TLS nhyehyɛe, port forwarding, ne firewall nhyehyɛe - wɔkamfo kyerɛ ma wɔn a wɔakɔ anim nkutoo.

---

### Anamɔn 4: San yɛ Installer no bio

`. ./btcpay-setup.sh -i`

BTCPay Server de wo custom config no bedi dwuma na akɔka nea wɔakyerɛ no ho `lightwalletd` node no.

Efi saa bere yi rekɔ no, Zcash plugin no de saa abɔnten awiei no bedi dwuma de adi nsɛm a wɔabɔ ho ban ho dwuma.


## BTCPay Server a wobɛgye wɔ Fie ne Cloudflare Tunnel

Wopɛ sɛ wogye Zcash sikatua bere a woregye BTCPay Server wɔ fie mfiri so - te sɛ Raspberry Pi 5 anaa mpɔtam hɔ server biara **a enni static IP**? 
Wubetumi de **Cloudflare Tunnel** ada wo instance no adi wɔ intanɛt so dwoodwoo.

Saa kwan yi kwati port forwarding na ɛde wo IP address ankasa sie ɔmanfoɔ - berɛ a ɛma wo server no kɔ so kɔ hɔ wɔ HTTPS so.

Ɛsan nso boa wo **kwati ɛka a wɔbɔ wɔ VPS a wobɛgye ho **, a ɛyɛ papa sɛ cryptocurrency sikatua yɛ ade a wopɛ sen sɛ ɛbɛyɛ w’adwuma no mu ade titiriw a.

---

### Anamɔn 1: Fa Cloudflare Tunnel no hyɛ mu

1. Yɛ akontaabu wɔ [cloudflare.com na ɛwɔ hɔ](https://www.cloudflare.com) na fa wo domain no ka ho.
2. Wɔ wo **fie server** so no, instɔl Cloudflare Tunnel:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Fa Cloudflare di nokware:

`cloudflared tunnel login`

Saa ahyɛdeɛ yi bɛbue browser mfɛnsere bi. Kɔ mu na ma kwan sɛ wobɛkɔ wo domain no so.
Cloudflare bɛma a `credentials` fael a token wɔ wo server so.

4. Yɛ tunnel foforo (wubetumi ato din `btcpay` anaa biribi foforo biara):

`cloudflared tunnel create btcpay`

Eyi ma wonya a `btcpay.json` fael a tunnel ID ne credentials wom - wobɛhia wɔ anammɔn a ɛdi hɔ no mu.

---

### Anamɔn 2: Yɛ Tunnel Nsiesiei Fael

Yɛ nhyehyeɛ kyerɛwtohɔ no (sɛ enni hɔ a) na bue nhyehyeɛ fael no:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Fa nhyehyɛe a edidi so yi hyɛ mu:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Nkyerɛmu:

* `tunnel` - din a ewo tunnel a woadi kan abɔ no
* `credentials-file` - kwan a ɛkɔ token fael a wɔayɛ wɔ bere mu `cloudflared tunnel login`
* `hostname` - wo domain a woakyerɛw wo din wɔ Cloudflare (e.g. `btcpay.example.com`)
* `service` - local address a wo BTCPay Server (mpɛn pii no `http://127.0.0.1:80` ma Nginx) .

> Cloudflare bɛ proxy traffic akɔ wo mpɔtam hɔ server no so dwoodwoo, a ɛremma wo fie IP no nhu.


### Anamɔn 3: Fa DNS Record ka ho ma Wo Tunnel

Sɛ wobɔ tunnel no wie a, Cloudflare taa **de CNAME DNS kyerɛwtohɔ bɛka ho ara kwa** ama wo domain no. Ɛsɛ sɛ ɛyɛ te sɛ eyi:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Sɛ ɛnpue ara kwa a, fa nsa ka ho:

1. Kɔ wo [Cloudflare Dashboard a ɛwɔ hɔ no](https://dash.cloudflare.com/)
2. Kɔ **DNS** ɔfa no so
3. Fa CNAME kyerɛwtohɔ foforo ka ho:
   - **Din**: `btcpay`
   - **Deɛ ani si so**: `<UUID>.cfargotunnel.com`  
     Wubetumi ahu mfaso pɔtee a ɛwɔ wo `btcpay.json` fael anaasɛ denam mmirikatu so:
     
     `cloudflared tunnel list`
     
   - **Proxy tebea**: Wɔatumi (orange cloud) .

> Saa kyerɛwtohɔ yi hwɛ hu sɛ abisade ahorow nyinaa sɛ `btcpay.example.com` wɔde fa Cloudflare Tunnel no so, de wo IP address ankasa sie ɔmanfo.

---

### Anamɔn 4: Ma Tunnel nyɛ adwuma wɔ System Startup so

Sɛ wobɛma tunnel no ayɛ adwuma ankasa wɔ boot mu a, instɔl no sɛ system service:

`sudo cloudflared service install`

Afei ma adwuma no nyɛ adwuma na fi ase:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Hwɛ sɛnea tebea no te:

`sudo systemctl status cloudflared`

Ɛsɛ sɛ wuhu nkrasɛm bi te sɛ `Active: active (running)` ne si so dua sɛ `btcpay.example.com` no wɔ Intanɛt so.

> Efi saa bere yi rekɔ no, tunnel no befi ase ankasa wɔ reboot biara so, na wo BTCPay Server no bɛyɛ nea ɔmanfo betumi akɔ so - a port forwarding nni mu na ɛrenkyerɛ wo IP ankasa.

---

### Anamɔn 5: Wie BTCPay Server Nhyehyɛe no

Sɛ worebɛhyehyɛ BTCPay Server nea edi kan a, hyehyɛ wo domain ansa na woayɛ nhyehyɛe script no:

`export BTCPAY_HOST="btcpay.example.com"`

Wei hwɛ sɛ wɔde domain a ɛfata bedi dwuma bere a wɔreyɛ **Nginx nhyehyeɛ** ne **SSL adansedie nkrataa**.

Sɛ BTCPay Server no ahyɛ mu dedaw na wode tunnel no rebɛka ho kɛkɛ a:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Setup no bɛsan ayɛ configs na ɛde domain foforo no adi dwuma.
Afei ɛsɛ sɛ wutumi kɔ wo server no so wɔ:

`https://btcpay.example.com`

> Sɛ́ ebia wode ɔmanfo bi redi dwuma anaa `lightwalletd` anaa w’ankasa node a ɛyɛ ma no, eyi nnya tunnel no so nkɛntɛnso.
> Nea ɛho hia ara ne sɛ BTCPay Server retie wɔ so `127.0.0.1:80` wɔ mpɔtam hɔ.


## Zcash Plugin a wɔrehyehyɛ wɔ BTCPay Server Wɛb Nkitahodi no mu

> **Ɛho hia ma multi-store nhyehyɛe:** 
> Zcash sika kotoku a wɔahyehyɛ wɔ ha no yɛ **global** ma nhwɛso no. Store nyinaa de saa sika kotoku yi bedi dwuma gye sɛ woayɛ BTCPay nhwɛso ahorow a ɛsono emu biara.

Sɛ wode wo BTCPay Server nhwɛsoɔ no di dwuma yie wie a, ɛho bɛhia sɛ woyɛ mfitiaseɛ nhyehyɛɛ bi denam admin wɛb ntamgyinafoɔ no so. 
Ɔmanfoɔ nkrataa no de akwankyerɛ a ɛdi mũ ma wɔ Borɔfo kasa mu - ha, yɛbɛfa anammɔn a ɛho hia no mu na yɛde yɛn adwene asi Zcash plugin no nhyehyɛɛ so titire.

---

### Anamɔn 1: Kɔ Web Interface no so

Kɔ wo instance no so wɔ:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Hyehyɛ wo administrator login ne wo password.
- Sɛ eyi ne bere a edi kan a worekɔ mu a, wɔbɛka akyerɛ wo sɛ yɛ akontaabu.
- Akonta a edi kan a wobɛkyerɛw wo din no, wɔde admin hokwan ahorow bɛma no ara kwa.

---

### Anamɔn 2: Fa Zcash Plugin no hyɛ mu

1. Wɔ menu titiriw no mu no, kɔ:

`Plugins -> Browse Plugins`

2. Hwehwɛ **Zcash (ZEC)** plugin no. Sɛ ɛho hia a, fa search bar no di dwuma.
3. Klik **Install** na si so dua.

> Tia saa adeyɛ yi mu ma altcoins foforo biara a woama ayɛ adwuma wɔ server nhyehyɛe mu.

Sɛ instɔlehyɛn wie a, klik **Restart Server** na san fa interface no ne plugins a ɛyɛ adwuma no hyɛ mu.


### Anamɔn 3: Fa Viewing Key so Fa Wo Wallet no bata ho

Sɛ wo instɔl plugin no wie a, **Zcash** ɔfa foforɔ bɛpue wɔ nhyehyeɛ menu no mu.

1. Go to:

`Zcash -> Settings`

2. Fa wo **Unified Full Viewing Key (UFVK)** hyɛ mu - BTCPay benya Unified Address ama invoice biara na wahu sikatua a wɔabɔ ho ban a ɛba.

> **Hyɛ no nsow:** Wɔboa Legacy Sapling hwɛ safoa, nanso sɛ wode Orchard/Unified Addresses bedi dwuma a ɛsɛ sɛ wode **UFVK** ma.


   Nhwɛso kwan a wɔfa so yɛ:

`uview184syv9wftwngkay8d...`

3. Hyehyɛ botae bi wɔ Block height field no mu

* **Nea edi kan nhyehyɛe a wode sika kotoku foforo (aba kasasin foforo):** hyɛ mprempren Zcash block sorokɔ (wubetumi ahwɛ wɔ 3xpl.com/zcash) - eyi ma mfitiase scanning yɛ ntɛmntɛm.
* **Wɔretu akɔ server koro no ara so afi agyapade Sapling-only nhyehyɛe mu akɔ Unified Addresses / Orchard:** gyaw saa afuw yi da mpan.
* **Wo store a wode bɛkɔ server foforo a ɛwɔ wallet/UFVK koro no ara so:** sɛ wopɛ sɛ wokyerɛw awo no sorokɔ - bɛyɛ wo store no order a edi kan a wotua ho ka no sorokɔ (fa da a wɔkrae no hyia wɔ 3xpl so na wɔatew scan no so). Sɛ wunnim a, gyaw no kwa.

> Ɛnyɛ sika kotoku nyinaa na ɛboa **Unified Full Viewing Key (UFVK)** export de besi nnɛ. 
> Nneɛma a wɔkamfo kyerɛ: 
> – [**Zkool** 10. Ɔde ne nsa kyerɛɛ ne so.](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! Wallet (version for PC)**](https://zingolabs.org/)  
> Wɔ app abien no nyinaa mu no, hwehwɛ UFVK export wɔ backup/export ɔfã no mu.

Saa nsafe yi boa **automatic address rotation**, a ɛkyerɛ sɛ:
- Adetɔfoɔ biara nya **sono** address a wɔde tua ka
- Wohu **biako, biakoyɛ** a ɛkari pɛ

Wubetumi ahu compatibility list a ɛtrɛw wɔ [ZecHub -> Sikakorabea ahorow](https://zechub.wiki/wallets).

Sɛ wɔhyehyɛ fields no nyinaa wie a, klik **Save**.

---

### Sɔ Wo ZEC Katua Nsuo Hwɛ

Yɛma wo akwaaba - wo Zcash sika kotoku no afei de abɔ BTCPay Server.

Momma yɛntu mmirika nkɔ sɔhwɛ bi mu:

1. Go to:

`Invoices -> Create New`

2. Yɛ sɔhwɛ invoice ma sika ketewaa bi wɔ ZEC mu.
3. Fa sika fi **sika kotoku soronko** (ɛnyɛ nea ɛne BTCPay wɔ abusuabɔ) mena.
4. Sɛ wohu asɛm no wie a, invoice krataafa no bɛda afahyɛ a wɔde aniwa hu adi.
5. Si so dua sɛ invoice tebea no sesa kɔ **Paid**.

Sɛ biribiara yɛ adwuma a - woasiesie wo ho sɛ wode ZEC sikatua bɛka wo wɛbsaet no ho denam API anaa CMS plugins no so.



## BTCPay Server a wode bɛka Wo Wɛbsaet no ho

Sɛ wo Zcash sika kotokuo no kɔ BTCPay Server so wie a, wobɛtumi de sikatua nhyehyɛeɛ no ahyɛ wo wɛbsaet no mu. 
Akwan ahodoɔ bi wɔ hɔ a wobɛfa so ayɛ yei - ɛfiri API kwan tẽẽ so kɔsi plugins a wɔasiesie sɛ wɔde bedi dwuma ama CMS platforms a agye din.

---

### Nkabom Ho Nneɛma a Wɔpaw

- **API Nkabom** 
  Ɛyɛ papa ma wɛbsaet anaa nhyehyɛe ahorow a wɔayɛ no sɛnea wɔpɛ a enni CMS. 
  Ɛma wo tumi a edi mũ wɔ invoice adebɔ, sikatua akyi di, ne amanneɛbɔ so - ne nyinaa wɔ w’ankasa wo interface ne logic mu. 
  Ɛhwehwɛ sɛ wodi nhyehyɛe ho nimdeɛ titiriw, enti wo developer no na odi saa adwuma yi ho dwuma yiye.

- **CMS Nneɛma a Wɔde Yɛ Nneɛma** 
  Ɛwɔ hɔ ma platforms te sɛ **WooCommerce**, **PrestaShop**, ne afoforo. 
  Saa plugins yi ma wo kwan ma wogye sikatua wɔ simma kakraa bi pɛ mu - coding biara nhia.

- **Katua Button anaa Iframe** 
  Ɔkwan a ɛyɛ mmerɛw sen biara. 
  Perfect ma landing pages, ankorankoro websites, anaa site biara a wopɛ sɛ wode ntoboa link anaa checkout widget hyɛ mu kɛkɛ.

---

### API Nkabom

Sɛ wode custom platform redi dwuma (anaasɛ CMS biara nni hɔ koraa) a, API no ne ɔkwan a eye sen biara. 
Ɛma wutumi yɛ nsakrae koraa: wubetumi ayɛ invoices, adi wɔn tebea akyi, agye amanneɛbɔ, na woadi osuahu a ɔde di dwuma no so koraa.

> Hyɛ no nsow: CMS plugins binom mpo de API di dwuma wɔ hood no ase, enti API safoa a wobɛbɔ no taa yɛ **anammɔn a edi kan a wɔhwehwɛ**, a wo nkabom kwan no mfa ho.

Anamɔn a edi hɔ: yɛ API safoa ma wo sotɔɔ no na fi ase de di dwuma [Greenfield API a ɛwɔ hɔ](https://docs.btcpayserver.org/API/Greenfield/v1/) sɛnea ɛbɛyɛ a wobɛkyekye wo nkabom no.


### API Safoa a Wɔreyɛ

Sɛ wobɛka BTCPay Server ne wo wɛbsaet anaa app no ​​abom a, ɛho behia sɛ woyɛ API safoa.

1. Kɔ BTCPay Server mu na bue **user menu** (atifi nifa so) .
2. Kɔ **API Safoa** so.
3. Klik **Yɛ API safoa foforo** .
4. Hyehyɛ din ma wo safoa no
5. Wɔ **Permissions** ɔfa no mu no, ma:
   - `Can create invoice`
   - `Can view invoice`
   - *(Ɛnyɛ ɔhyɛ)* `Can modify store settings` - se wo hia store-level management nkoaa

6. Klik **Nhyehyɛe** so. W'ankasa API safoa no bɛda adi - kɔpi na fa sie yiye.

> Saa safoa yi ma wotumi kɔ wo sotɔɔ no sika a wɔde tua ho ka no so. 
> Mma **nkyɛ** wɔ baguam anaasɛ da no adi wɔ client-side code mu.

---

### Nhwɛsoɔ: Invoice a wɔreyɛ denam API so

**Awiei:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Abisade nipadua:**

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

**Anoyie:**

Wo nsa bɛka JSON adeɛ bi a ɛwɔ:

* `invoiceId`
* URL a wotua ho ka a wubetumi de ahyɛ wo wɛbsaet no so anaasɛ wode amena adetɔfo no

Hwɛ nkrataa no nyinaa:
[Greenfield API – Yɛ Invoice a Wɔde Tua Ho Ka](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Webhook a Wobɛhyehyɛ (Wɔpɛ) .

Sɛ wobɛnya amanneɛbɔ wɔ berɛ ankasa mu berɛ a invoice tebea sesa (e.g. berɛ a wɔanya sikatua):

1. Kɔ wo sotɔɔ nhyehyɛe -> **Webhooks** .
2. Fa URL a ɛwɔ wo backend endpoint a ɛbɛdi ho dwuma no ka ho `POST` abisade ahorow a efi BTCPay Server hɔ
3. BTCPay de amanneɛbɔ bɛmena ne ho bere a wɔatua invoice bi anaasɛ ne bere atwam no

Wɔakyerɛkyerɛ Webhook payloads ne retry logic mu wɔ [official webhook nkrataa a wɔde ma](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Nhwɛsoɔ nkabom wɔ hɔ ma dwumadie kasa ahodoɔ wɔ BTCPay docs ne GitHub akoraeɛ.



### CMS Nkabom

BTCPay Server boa plugins ma content management systems (CMS) a agye din. 
Nkabom a ɛho akokwa na wɔde di dwuma kɛse ne **WordPress + WooCommerce**, a ɛma ɛyɛ mmerɛw sɛ wobegye ZEC sikatua **a wonkyerɛw koodu**.

---

#### WooCommerce (Asɛmfua Nsɛmma Nhoma) .

BTCPay Server boa plugin bi ma WooCommerce wɔ aban kwan so.

Anamɔn a wobɛfa so de afrafra:

1. Fa **BTCPay for WooCommerce** plugin no hyɛ WordPress plugin kyerɛwtohɔ no mu anaa fi GitHub mu.
2. Wɔ wo WordPress admin panel mu no, kɔ:

`WooCommerce -> Settings -> Payments`

3. Hwehwɛ **BTCPay** wɔ list no mu na klik **Set up** .
4. Hyehyɛ wo BTCPay Server URL na di tumi krataa akwankyerɛ no akyi 
   (wɔkamfo API safoa awo ntoatoaso a ɛyɛ adwuma ankasa kyerɛ)
5. Ma ɔkwan a wɔfa so tua sika no nyɛ adwuma na fa wo nhyehyɛe no sie

> Akwankyerɛ a ɛkɔ akyiri, video nkyerɛkyerɛ, ne ɔhaw ahorow ano aduru akwankyerɛ wɔ plugin nkrataa no mu.

Wobɛsan nso ahunu CMS nkabom akwan foforɔ wɔ saa ɔfa korɔ no ara a ɛwɔ BTCPay docs no mu.

---

### Katua Button anaa Iframe (CMS anaa API biara Nhia) .

Sɛ wo mfa CMS nni dwuma na wompɛ sɛ wode API yɛ adwuma a, ɔkwan a ɛyɛ mmerɛw a wobɛfa so agye ZEC sikatua ne sɛ wode **de sikatua link anaa widget** bɛhyɛ wo wɛbsaet no so tẽẽ.

Saa kwan yi ye ma:

- Nkratafa a wɔde si fam
- Portfolio nsɛmma nhoma ahorow
- Blogs anaa nkratafa a ɛnyɛ hwee
- Nnwuma a enni akyi server

---

#### Ɔkwan a Ɛto so 1: Katua a Wɔde Tua Ka (Link) .

1. Wɔ BTCPay Server mu no, fa nsa yɛ invoice wɔ **Invoices** ɔfa no mu
2. Kɔpi sikatua link no, s.e.:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Fa link no ka wo HTML ho:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Ɔkwan a Ɛto so 2: Invoice a Wɔde Ahyɛ Mu (Iframe) .

Sɛ wopɛ sɛ woda invoice no adi tẽẽ wɔ wo site no so a, fa iframe di dwuma:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Wubetumi ayɛ button anaa iframe container no style ma ɛne wo site no design ahyia - BTCPay Server ma kwan ma flexible theming a ɛwɔ invoice krataafa no so.

## Awie

Saa akwankyerɛ yi ware - nanso ɛka fapem afã horow a ɛfa Zcash sikatua a wɔde bɛka BTCPay Server ho nkutoo ho.

BTCPay Server interface no ma dwumadie pii sene deɛ yɛakyerɛ wɔ ha. Nea eye ne sɛ, UI no wɔ kasa ahorow pii mu (Russia kasa ka ho), na ɛma ɛyɛ mmerɛw sɛ wobɛhwehwɛ mu na woasɔ ahwɛ akɔ akyiri.

BTCPay yɛ adwinnade a ɛyɛ mmerɛw kɛse. Wobɛtumi:

* Fa sotɔɔ ahorow pii a wɔde wɔn ho hyɛ mu wɔ nhwɛso biako so
* Kyerɛkyerɛ amanne dwumadie ne tumi krataa ma ekuo mufoɔ - ɛfiri order view-only kɔsi full admin
* Fa w’ankasa domain ne branding di dwuma
* Fa webhooks, fallback wallets, ne Tor kwan mpo si hɔ
* Hyehyɛ nhyehyɛe a ɛkɔ akyiri te sɛ towtua ho mmara, sika a wɔatew so ho mmara, krataafa a wɔde totɔ nneɛma a wɔayɛ no sɛnea wɔpɛ, ɔkwan a wɔfa so tua ho anohyeto, ne nea ɛkeka ho

Wɔkyekyeree BTCPay sɛ ɔkwan foforo a wɔfa so bue ano sen wɔn a wɔde sikatua a ɛwɔ mfinimfini no. Sɛ worehwehwɛ sɛ wobɛgye kokoam ZEC sikatua a ntamgyinafoɔ biara nni mu a, saa platform yi fata koraa sɛ wode w’adwene si so.

Yɛpɛ sɛ wodi nkonim wɔ BTCPay abɔdeɛ a nkwa wom nhyehyɛeɛ no mu nhwehwɛmu mu na woma wo sikatua yɛ wo deɛ ampa.

## Akadeɛ

* [BTCPay Server Ɔmanfoɔ Wɛbsaet](https://btcpayserver.org/)
* [BTCPay Nsɛm a Wɔtaa bisa](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub Adekorabea](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet Nkyerɛkyerɛmu](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Plugin a wɔde yɛ BTCPay (GitHub) .](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Plugin Installation Akwankyerɛ](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Amanneɛbɔ zcash-lightwalletd.custom.yml Nhwɛso](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker Hyehyɛ Fael (Zebra) .](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API Nsɛmfua Titiriw (Greenfield API) .](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Yɛ Cloudflare Tunnel a wɔde yɛ adwuma](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash Wallet Nkitahodi Nkyerɛwde (ZecHub) .](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd wɔ Raspberry Pi 5 (ZecHub) so .](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
