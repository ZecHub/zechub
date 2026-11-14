# BTCPay Server kple Zcash ƒe Kpekpeɖeŋu: Ɖoɖo Blibo kple Ƒoƒoƒo Ƒe Mɔfiame

BTCPay Server na akpaɖe ƒe dzidzimebizniswo ƒe mɔ woaxɔ crypto fexexewo tẽ, manɔ haƒomevi alo ga dzralawo ŋu o. Mɔfiame sia akplɔ wò to BTCPay Server ƒe ɖoɖo blibo me kple Zcash ɣaɣla [shielded] fexexewo ƒe dzidzi ƒe kpekpeɖeŋu.

> Numenyalɔlɔ sia ɖe Zcash ƒe ƒoƒoƒo kple wò BTCPay Server ƒe instance ŋu.  
> Eƒe kpekpeɖeŋu le **ɣaɣla dzesi ŋɔŋlɔ blibo (Zebra)** kple **lightwalletd-based ƒe ɖoɖowo** siaa ŋu.

---

## Nusiwo Le Eme

- [Nu Ta Nàzã BTCPay Server kple Zcash](#why-use-btcpay-server-with-zcash)
- [Ale Si BTCPay Server Wɔa Dɔe](#how-btcpay-server-works)
- [Afika Wodzra Gawo ɖo? Ame Ka Wɔa Dzi Ƒe Kɔkɔe Ƒe Sɔkewordwo Dzi?](#where-are-funds-stored-who-controls-the-private-keys)
- [Ale Si NàƉo BTCPay Server ɖe Zcash ƒe Xɔxɔ Ta](#how-to-set-up-btcpay-server-for-accepting-zcash)
  - [BTCPay Server Ƒe Ɖoɖo kple Zcash ƒe Kpekpeɖeŋu](#deploying-btcpay-server-with-zcash-support)
  - [Wò Ŋutɔ Zcash ƒe ɣaɣla dzesi ŋɔŋlɔ blibo ƒe Dudu (Zebra + lightwalletd)](#running-your-own-zcash-full-node)
  - [Ƒoƒoƒo kple Xɔtame lightwalletd ƒe ɣaɣla dzesi ŋɔŋlɔ (Ɖoɖo Si Wò Ŋutɔ Nàtia)](#connecting-to-an-external-lightwalletd-node)
  - [BTCPay Server Ƒe Dzɔdzɔ Le Aƒeme kple Cloudflare Tunnel](#hosting-btcpay-server-at-home-with-cloudflare-tunnel)
- [Zcash Plugin ƒe Ɖoɖo Le BTCPay Server ƒe Web Ƒe Nɔnɔmetata Me](#configuring-the-zcash-plugin-in-the-btcpay-server-web-interface)
- [BTCPay Server ƒe Ƒoƒoƒo kple Wò Nyatakakadzraƒe](#integrating-btcpay-server-with-your-website)
  - [API Ƒe Ƒoƒoƒo](#api-integration)
    - [API Ƒe Sɔkeword Ƒe Dzadzra](#generating-an-api-key)
    - [Mede Mɔ: Invoice Ƒe Wɔwɔ To API Me](#example-creating-an-invoice-via-api)
    - [Webhook Ƒe Ɖoɖo](#setting-up-a-webhook-optional)
  - [CMS Ƒe Ƒoƒoƒo](#cms-integration)
  - [Fexexe Ƒe Button Alo Iframe](#payment-button-or-iframe-no-cms-or-api-needed)
- [Nuƒoƒo](#conclusion)
- [Nukpekpewo](#resources)


---

## Nu Ta Nàzã BTCPay Server kple Zcash

Dzidzime ƒe asitsotso xɔa crypto fexexewo sɔ gbã. Eƒe mɔ le kabakaba, ele xexea katã me, eye wòate ŋu awɔ dɔ manɔ bankiwo ŋu o. Esia doa vi na asitsotso wɔlawo kple asitsiwo siaa. Ke nyatakaka vevi aɖe li si ame geɖewo mekpena ɖe eŋu o.

Ne wòle order ɖom la, zi geɖe asitsi la naa ame ŋutɔ ƒe nyatakakawo: ŋkɔ, nuɖoƒe si woatsɔ nu yi, kple telefon ƒe xexlẽme. Ne wowɔ fexexe la kple public gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] abe Bitcoin, Ethereum, alo stablecoinwo siwo le Ethereum alo Tron dzi ene la, gaɖoɖo [transaction] la doa ɖe go tegbee be woate ŋu asrɔ̃e.

Ame sia ame ate ŋu, esi wòmenya nu si woxɔ o hã, awɔ esia:

- Anya ɣeyiɣi kple ga home nenie woxe  
- Atia afika ga la tso kple afi si woyi  
- Aƒo crypto gaɖoƒe ƒe dzesi [address] kple ame ŋutɔ ne ɖekawɔwɔ aɖe li, abe email si do go alo ame si ƒe ŋkɔ le nu tsɔtsɔ ƒe dzesi dzi ene

Esia fia be nu si asitsi aɖe xɔ ko ate ŋu aɖe eƒe ga ƒe ŋutinya blibo afia.

Eye ewɔa dɔ le mɔ ma ke dzi hã. Ne asitsotso wɔla ƒe gaɖoƒe ƒe dzesi va dze ɖoɖonu dzi kpɔ la, woakpɔe nyuie. Hoho ƒe ameawo kple ame bubuwo ate ŋu atia fexexe ƒe ga home, nu dzodzrolawo ƒe dɔwɔwɔ, kple biznis ƒe ga ƒe zɔzɔ ƒe ɖoɖo.

### BTCPay Server kple Zcash ƒe ƒoƒoƒo ate ŋu aɖo kuxi sia.


BTCPay Server nye ɖoɖo mamle ga o, eye wòle ha nuɖo agni [decentralized], si woazã axɔ crypto fexexewo.  
Menye fexexe ƒe haƒomevi o, eye wòmetsɔa ga aɖeke ɖo o. Fexexewo katã yia tẽ ɖe asitsotso wɔla ƒe gakotoku [wallet] me.  
Esia ate ŋu anye ame ŋutɔ ƒe gakotoku alo multisig ƒe ɖoɖo le habɔbɔ aɖe me.

Server la wɔa dɔ le ɖoɖo ƒe dɔwo ŋu:

- Ewɔa gaɖoƒe ƒe dzesi tɔxɛ na order sia sia  
- Etsɔa ŋku ɖea ɣeyiɣi si woxɔ fexexe la dzi, eye wòƒoa eƒo kple order la  
- Ena receipt kple nyanyuiwo  
- Ena fexexe ƒe nɔnɔme na asitsi la  

Nu katã dzea asitsotso ƒe owner ƒe dzikpɔkpɔ te, manɔ subɔsubɔ bubuwo ŋu o.

Zcash nye crypto ga si wowɔ tso zero-knowledge ɖaseɖigbalɛ [proof] wo dzi. Eƒe kpekpeɖeŋu le gaɖoɖo ƒe nɔnɔme si le ɣaɣla blibo me ŋu.  
Ne wozã ɣaɣla gaɖoƒe ƒe dzesiwo (tso fifia yi ŋgɔ, míayɔ wo be "gaɖoƒe ƒe dzesiwo" ko) la, wometsɔa ame si dɔ ga la, ame si xɔe, kple gaɖoɖo la ƒe ga home aɖe go le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu dzi o.

Na dzidzime ƒe asitsotsrowo la, esia fia be:

- Nuƒola la ate ŋu awu fexexe la enu manɔ eƒe ga ƒe ŋutinya ɖe go o  
- Asitsotso wɔla xɔa fexexe manɔ eƒe gaɖoƒe ƒe dzesi, asitsotso ƒe ga home, alo gaɖoɖo ƒe ɖoɖo ɖe go o  
- Ame si mele gota la mate ŋu aƒo fexexe la kple order la alo asitsi ƒe nyatakakawo o

### Mede Mɔ Si Wozãa Dɔe

Zãla aɖe ɖoa order, eye wòtia Bitcoin alo USDT be woazã awɔ fexexe.  
Nyatakakadzraƒe la wɔa fexexe ƒe gaɖoƒe ƒe dzesi eye wòfia ga home la.  
Ne wowɔ fexexe la vɔ la, woaɖo gaɖoƒe ƒe dzesi sia ɖe ɖoɖonu dzi, eye wòzu nu si ame katã ate ŋu akpɔ.  
Ame si di be yeawɔ vɔ̃ la hiã be wòaƒo order ɖeka ko kple gaɖoƒe ƒe dzesi la be wòakpɔe ƒe gaɖoɖo ƒe ŋutinya blibo tegbee.

Azɔ bu ŋku ɖe nɔnɔme ma ke ŋu kple Zcash.  
BTCPay Server wɔa ɣaɣla gaɖoƒe ƒe dzesi. Nuƒola la dɔa fexexe la.  
Le ɖoɖonu ƒe akpa la, menye nu aɖeke wɔm o. Public nyatakaka aɖeke mele afi ma si woasrɔ̃ o.  
Server la xɔa kpeɖodzi, efɔa eƒo kple order la, eye wòwu dɔ la enu.

Na ame sia ame si mele gota la, eɖe abe nu aɖeke medzɔ o ene.  
Ɖoɖo katã li le asitsotso la kple asitsi la dome, abe ale si wòle be wòanɔ ene.

Ɖoɖo sia mede automation alo zãzã ƒe bɔbɔe ɖeɖe o.  
Nu katã wɔa dɔ abe ale si wòwɔa dɔ kple crypto ga bubuwo ene, ke data ƒe dododo ƒe afɔku mele o.



## Ale Si BTCPay Server Wɔa Dɔe

BTCPay Server wɔa dɔ abe fexexe ƒe dɔwɔwɔ ƒe ga ƒe lẽ [bridge] le wò e-commerce platform kple gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu la dome ene. Aleae zɔzɔ la le:

1. **Asitsi la ɖoa order** le wò nyatakakadzraƒe dzi (abe WooCommerce, Magento, alo platform sia sia si kple BTCPay ƒe ƒoƒoƒo le ene).

2. **Asitsotso la bia fexexe ƒe invoice** tso BTCPay Server gbɔ. Server la wɔa invoice tɔxɛ kple:
   - Order la ƒe ga home
   - Ɣeyiɣi ƒe xexlẽme si le dzidzim
   - Zcash Unified Address (UA) - abe `u1...` ene - si me Orchard (ɣaɣla) xɔla le le gɔmedzedze me.

3. **Asitsi la kpɔa fexexe ƒe axa la** eye wòdɔa ZEC ɖe gaɖoƒe ƒe dzesi si wonae la dzi.

4. **BTCPay Server le ɖoɖonu la kpɔm**, eye wòle fexexe la ƒom kple:
   - Ga home si wòle be wòaxe
   - Gaɖoƒe ƒe dzesi si xɔe
   - Invoice la ƒe ɣeyiɣi ƒe dzesi

5. **Ne wokpɔ gaɖoɖo la eye wokpe ɖe eŋu vɔ la**, BTCPay naa asitsotso la nyanyui.

6. **Asitsi la xɔa fexexe ƒe kpeɖodzi.** Ne wòdi la, server la ate ŋu aɖo receipt ɖe email me.

Zɔzɔ blibo sia wɔa dɔ **eɖokuiŋutɔ**, manɔ haƒomevi alo ga dzralawo ŋu o.  
BTCPay Server **metsɔa ga aɖeke ɖo o** - eƒoa order ƒe ɖoɖo la kple ɖoɖonu la ko le mɔ dedie kple ɣaɣla me.
## Afika Wodzra Gawo ɖo? Ame Ka Wɔa Dzi Ƒe Kɔkɔe Ƒe Sɔkewordwo Dzi?

BTCPay Server **menye** gakotoku o, eye **mehia dzi ƒe kɔkɔe ƒe sɔkewordwo o**.  
Ga katã yia **tẽ** ɖe asitsotso wɔla ƒe gakotoku me. Woaɖo dedie le **nukpɔsafui [viewing key]-based ƒe ɖoɖo** zazã me.

### Ale Si Ewɔa Dɔe

- **Wowɔa gakotoku la le gɔmedzedze.**  
  Asitsotso wɔla zãa Zcash gakotoku si ƒe kpekpeɖeŋu le nukpɔsafuiwo ŋu - abe [Zkool](https://github.com/hhanh00/zkool2/) alo [Zingo! Wallet](https://zingolabs.org/) ene.  
  Ɖeɖe blibo le [ZecHub.wiki](https://zechub.wiki/wallets) dzi.

- **BTCPay Server ƒoa eɖokui to nukpɔsafui me.**  
  Nukpɔsafui nye **sɔkeword si wole xlẽm ko**: ate ŋu akpɔ fexexe siwo gbɔna eye wòawɔ gaɖoƒe ƒe dzesi yeye siwo woaxɔe ɖo,  
  ke mate ŋu azã ga o. Server la medzraa gadzraɖoɖi nya [seed phrase] alo dzi ƒe kɔkɔe ƒe sɔkewordwo o.

- **Wokpɔa ɖoɖonu ƒe data to `lightwalletd` ƒe server me.**  
  Àte ŋu azã public ɣaɣla dzesi ŋɔŋlɔ abe `https://zec.rocks` ene, alo nàwɔ wò ŋutɔ `Zebra + lightwalletd` ƒe ɖoɖo na wò ŋutɔ ƒe aƒetɔnyenye blibo.

- **Ɖoɖoɖo sia ƒe sia xɔ gaɖoƒe ƒe dzesi [address] tɔxɛ.**  
  Nukpɔsafuiwo [Viewing keys] dea mɔ na server la be wòakpɔ Zcash ɣaɣla [shielded] gaɖoƒe ƒe dzesi yeyewo na invoice sia sia,  
  eye wòawɔ be fexexe ƒe ŋkuɖodzidzɔ le dedie eye wòaxe mɔ na gaɖoƒe ƒe dzesi ƒe gbagbɔgblɔ.

- **Wòawɔ dzi blibo ɖe ga la dzi.**  
  Ne wowo vɔ̃ server la gɔ̃ hã, ame aɖeke mate ŋu afu wò ga o - fexexe ƒe metadata ko ate ŋu ado go.

Nɔnɔme sia ma **infrastructure** kple **asset ƒe dzikpɔkpɔ** ɖe te.  
Àte ŋu atrɔe, atsɔe ayi teƒe bubu, alo aɖo BTCPay Server ɖe eya me ake manɔ ga aɖeke ƒe afɔku me o.

## Ale Si NàƉo BTCPay Server ɖe Zcash ƒe Xɔxɔ Ta

Le akpa siwo va yi la me, míeɖe ale si BTCPay Server wɔa dɔ kple Zcash kple nu si ta esia le vevie na ɣaɣla ƒe fexexewo afia. Azɔ ɣeyiɣi va be nàdze dɔ wɔwɔ gɔme.

Wò ŋutɔ ƒe ɖoɖo ate ŋu atɔ ɖe nu geɖewo ŋu:

- Ðe BTCPay Server ƒe instance le asiwò xoxo?
- Ðe wòdi be nàzã public lightwalletd alo nàwɔ wò ŋutɔ ƒe ɣaɣla dzesi ŋɔŋlɔ blibo?
- Ðe server la anɔ VPS dzi alo le aƒeme?

Ta sia kplɔa ɖoɖo ƒe nɔnɔme siwo katã wozã fifia - tso ɖoɖo bɔbɔewo dzi va se ɖo ɖoɖo siwo wòwɔ wɔa aƒetɔnyenye blibo dzi.

Míakplɔ wò to esiwo gbɔna me:

- Ale si nàɖo nu katã tso gɔmedzedze le VPS dzi, kple ɣaɣla dzesi ŋɔŋlɔ blibo (Zebra)
- Ale si nàwɔ BTCPay Server le aƒeme, eye nàtsɔ **Cloudflare Tunnel** aɣla wò IP
- Ale si nàdzu Zcash ƒe kpekpeɖeŋu eye nàɖoe le BTCPay Server ƒe web nɔnɔmetata me
- Ale si nàƒo BTCPay kple wò nyatakakadzraƒe alo dzidzime asitsotso


## BTCPay Server Ƒe Ɖoɖo kple Zcash Ƒe Kpekpeɖeŋu

Mina míayi ɖe ɖoɖo ŋutɔ ŋu. Le akpa sia me, míaɖo BTCPay Server kple Zcash ƒe kpekpeɖeŋu - le VPS yeye dzi alo to ZEC ƒe kpekpeɖeŋu tsɔtsɔ kpe ɖe instance si le asiwò xoxo ŋu.

Ne BTCPay Server le dɔ wɔm le asiwò xoxo (abe BTC alo Lightning ta ene) la, mehia be nàɖo nu katã ake o - dzu ZEC ƒe plugin la ko.

Míakplɔ wò to ɖoɖo vovovowo me, tso ɖoɖo bɔbɔe siwo zãa public `lightwalletd` ƒe ɣaɣla dzesi ŋɔŋlɔ dzi va se ɖo ɖoɖo siwo wò ŋutɔ ƒe ɣaɣla dzesi ŋɔŋlɔ blibo le.  
Tiaƒe nyuitɔ atɔ ɖe afi si wò server la le kple ale si wòdi be wòanɔ abɔbɔɖeɖe si tso infrastructure si le gota la ŋu.

> Plugin ƒe numenyalɔlɔ si tso wɔnɔa gbɔ:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Nuxlɔ̃ame - gakotoku ɖeka na instance sia sia:**  
> Zcash ƒe plugin la zãa **gakotoku ɖeka si woma** le **asitsotsrowo katã** siwo le BTCPay ƒe instance la me ŋu.  
> Ne wòdzra asitsotsro siwo ƒe kplɔɖeɖe mele o geɖe ɖe instance ɖeka me la, woama Zcash ƒe gakotoku ma ke.  
> Zã instance vovovo ne wòhiã be gakotokuwo nanɔ vovovo kee.

---

### VPS Ƒe Ɖoɖo Si Wode Aso

Hafi nàɖo nu la, kpɔ be esiwo gbɔna le asiwò:

- VPS kple **Ubuntu 22.04+**
- Domain ƒe ŋkɔ si tsɔa asi ɖe wò server ƒe IP gaɖoƒe ƒe dzesi ŋu (to DNS me)
- `git`, `docker`, kple `docker-compose` woɖo
- SSH ƒe mɔ le wò server la ŋu

---

## Wò Server Ƒe Dzadzraɖoɖo (akpa si woɣla)

<details>
  <summary>Zi afii be nàɖe eme</summary>

Be nàɖo BTCPay Server kple Zcash ƒe kpekpeɖeŋu la, wòahiã esiwo gbɔna:

### 1. VPS kple Ubuntu 22.04 alo yeye wu

Míede asi be nàzã **Ubuntu Server 22.04 LTS** ƒe ɖoɖo bɔbɔe.  
VPS ƒe subɔla sia sia si naa IP gaɖoƒe ƒe dzesi si woma na wò la awɔ dɔ.  

**Nusiwo hiã le gɔmedzedze:**  
- CPU ƒe core 2  
- RAM ƒe GB 4  
- Disk ƒe teƒe GB 40  

Ɖoɖo sia de na ne èzã lightwalletd na Zcash.  
Ne wòdi be nàwɔ **Zcash ƒe ɣaɣla dzesi ŋɔŋlɔ blibo** la, wòahiã **GB 300 koŋ** ƒe disk teƒe si le blibom.

---

### 2. Domain ƒe ŋkɔ si tsɔa asi ɖe wò server la ŋu

Le wò DNS ƒe subɔla ƒe ɖoɖowo ƒuƒopé [dashboard] me la, wɔ `A` record na subdomain aɖe  
(abe `btcpay.example.com` ene) si tsɔa asi ɖe wò VPS ƒe IP gaɖoƒe ƒe dzesi ŋu.  

Wozãa domain sia be woato browser me akpɔ BTCPay Server  
eye be woawɔ **SSL certificate si womale ga o** to Let's Encrypt me eɖokuiŋutɔ.

---

### 3. SSH ƒe mɔ le server la ŋu

Be nàɖo BTCPay Server la, ele be nàƒo wò VPS la to SSH me.  
Tso wò terminal me, wɔ esia:

`ssh root@YOUR_SERVER_IP`

Ne èzã macOS, Linux, alo WSL le Windows dzi la, SSH le terminal la me xoxo.
Le Windows si me nu bubu mele o dzi la, zã SSH ƒe client abe **PuTTY** ene.

---

### 4. Ɖo Git, Docker, kple Docker Compose

Ne èƒo asi kple SSH vɔ la, trɔ wò system packagewo yeyee eye nàɖo akpawo siwo hiã:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Le Ubuntu 22.04 kple version yeye wu dzi la, `docker-compose` si tso APT me la va xoxo.
> Package si wode asi lae nye `docker-compose-plugin`, si naa `docker compose` command la (de ŋku edzi be teƒe mele wo dome ɖe dash teƒe).

Wò server ƒe nɔnɔme dzraɖo azɔ be woaɖo BTCPay Server.

</details>

---

### Afɔ 1: Repository Ƒe Cloning

Wɔ dɔwɔƒe ƒe directory eye nàtsɔ BTCPay Server ƒe Docker ƒe deployment la:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Afɔ 2: Environment Variables Ƒe Export

Trɔ `btcpay.example.com` kple wò domain ŋutɔ ƒe ŋkɔ:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Ne wòɖo ta be yeakpe Monero alo Litecoin ɖe eŋu emegbe la, àte ŋu aɖe wo eme fifia:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Àte ŋu akpe coin yeyewo ɖe eŋu ɣeyiɣi sia sia ne nàtsɔ variables si dze eyome export eye nàwɔ setup script la ake:

`. ./btcpay-setup.sh -i`

Le mɔfiame sia ta la, míatsɔ ŋku aɖe **Zcash ko** ŋu.

---

### Afɔ 3: Wɔ Installer La

Wɔ setup script la be nàtu eye nàdze server la gɔme:

`. ./btcpay-setup.sh -i`

Script la aɖo dependencywo, awɔ `docker-compose.yml`, adze subɔsubɔwo gɔme, eye wòaɖo `systemd`.
Esia xɔa miniti 5 ƒe ɣeyiɣi.

Ne wowu enu la, wò BTCPay Server ƒe instance anɔ afi sia:

`https://btcpay.example.com`

> Ne èle ɖoɖo si le xoxo trɔm (abe ZEC ƒe tsɔtsɔ kpeɖeŋu ene) la, kpɔ be nàtsi server la eye nàdze egɔme ake kple ɖoɖo yeyeawo:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Emegbe yi ɖe akpa si gbɔna la me be nàɖo Zcash le BTCPay Server ƒe web nɔnɔmetata me.

## Ɖokpɔ Wò Ŋutɔ Ƒe Zcash Ɣaɣla Dzesi Ŋɔŋlɔ Blibo [Full Node]

Ne wòdi be yeaɖo ŋu ɖe dukɔ bliboa ƒe `lightwalletd` ɣaɣla dzesi ŋɔŋlɔwo dzi o la, àte ŋu aɖo wò ŋutɔ ƒe Zcash ɣaɣla dzesi ŋɔŋlɔ blibo kple lightwalletd ɖe server ma ke dzi.  
Esia nana be **wòawo ŋutɔ ƒe aɖaba blibo** anɔ asiwò - ametɔ bubu ƒe ɖoɖowo mele o, dziɖoɖo mehia o.

---

### Afɔ 1: Kpɔe be Disk ƒe Teƒe Sɔ

Zcash ɣaɣla dzesi ŋɔŋlɔ blibo (Zebra + lightwalletd) hia disk ƒe teƒe **300+ GB** fifia, eye wòle dzidzime.

Mamáe nye:

- Zebra gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] ƒe database: ~260-270 GB
- lightwalletd ƒe index wɔwɔ: ~15-20 GB

#### Nudzraɖoƒe si wòle be nàtia:

- **400 GB+** ne wozã server la **ko** na Zcash fexexe
- **800 GB+** ne server la hã wɔ BTCPay Server, PostgreSQL, Nginx, kple bubuwo

> Enyo be nàzã SSD/NVMe disk si ƒe teƒe le **1 TB**, vevietɔ ne mèɖo ŋu be yèana data woata le ɣeyiɣi siawo me o.

---

### Afɔ 2: Ɖo Environment Variables

Tsɔ esiae kpe ɖe wò environment ƒe ɖoɖo ŋu be nàdzu ɣaɣla dzesi ŋɔŋlɔ blibo ƒe ɖoɖo dzi:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Esia atsɔ `zcash-fullnode` ƒe fragment akpe ɖe eŋu, si adze `zebrad` kple `lightwalletd` siaa egɔme le BTCPay Server me.

---

### Afɔ 3: Ƒo Installer La Gake

`. ./btcpay-setup.sh -i`

Script la awɔ esiawo:

* Aɖe Docker ƒe imagewo na Zebra kple lightwalletd
* Aɖo servicewo ɖe BTCPay stack la me
* Aɖe Zcash plugin la akpe ɖe **teƒe sia** ƒe `lightwalletd` instance ŋu

> **Blockchain ƒe sync blibo ate ŋu axɔ ŋkeke geɖe**, vevietɔ ɖe VPS server si ƒe nuɖoɖo sue dzi.
> Va se ɖe esime synchronization awu la, ɣaɣla fexexewo manɔ asiwò o.


## Ɖeka Ɖe Ŋgɔ Ƒe lightwalletd Ɣaɣla Dzesi Ŋɔŋlɔ

Le nyateƒe geɖe me la, woƒe ŋutɔ wɔnɔn blibo mele be wòhia o — eye asitsalawo ate ŋu madi be woanɔ ɣeyiɣi kple disk ƒe teƒe na Zcash ɣaɣla dzesi ŋɔŋlɔ blibo [full node] ƒe dɔwɔwɔ o.  
Le gɔmedzedze me la, BTCPay Server ɖea eɖokui kple `lightwalletd` ɣaɣla dzesi ŋɔŋlɔ [node] si le amewo katã ƒe dzidzɔ me be wòawɔ ɣaɣla [shielded] fexexe [payment]wo ƒe dɔ, eye wòmeɖe gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] blibo la ɖe o.

Endpoint si wotsɔna le gɔmedzedze me nye:

`https://zec.rocks:443`

Ke hã, àte ŋu aɖo BTCPay Server be wòawɔ kadodo kple **ŋgɔ ƒe `lightwalletd` ɣaɣla dzesi ŋɔŋlɔ ɖe sia ɖe**, abe:

`https://lightwalletd.example:443`

Akpa sia fia ale si nàwɔe kple **Docker ƒe fragment si wò ŋutɔ wɔ**.

> Ɖoɖoɖo ƒe kpɔɖeŋu blibo si me environment variablewo katã le la, wole [plugin repository](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml) me.  
> Afɔ siwo gbɔna fia dɔwɔƒe gɔmedzedze ƒe ɖoɖo.

---

### Afɔ 1: Wɔ Docker Ƒe Fragment Si Wò Ŋutɔ

Le wò BTCPayServer project ƒe directory me, wɔ fragment ƒe faɛl si wò ŋutɔ:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Tsɔ emegbe ƒe emenyawo kpe ɖe eŋu:

```
exclusive:
- zcash
```

`exclusive` ƒe directive la na be fragment ɖeka koe ate ŋu anɔ dɔ wɔm si ƒe label sɔ kple etɔ (`zcash` le nya sia me).
Esia doa mɔ na ɖoɖo ƒe dzremetoto - le kpɔɖeŋu me, mèate ŋu aƒu `zcash-fullnode` ƒe fragment la kple ŋgɔ ƒe `lightwalletd` ƒe fragment si wò ŋutɔ wɔ sia le ɣeyiɣi ɖeka me o.
Ne wòde dzesi be enye `exclusive: zcash` la, BTCPay Server agblẽ `zcash-fullnode` si wotsɔna le gɔmedzedze me kple `lightwalletd` ƒe containerwo le eɖokui si, ale be nàte ŋu aɖe ɖe wò ŋutɔ ƒe ŋgɔ ƒe node ŋu.

---

### Afɔ 2: Ɖo Environment Variables

Le terminal me:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Afɔ 3: Ɖe Ŋgɔ Ƒe Node Ƒe Gaɖoƒe Ƒe Dzesi [Address] Ɖe Go

Ʋu wò `.env` ƒe faɛl:

`nano .env`

Tsɔ fli sia kpe ɖe eŋu, eye tsɔ endpoint si wòtia ɖe URL la teƒe:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Àte ŋu azã:

* **Dukɔ bliboa ƒe node**, abe `https://zec.rocks:443`
* Wò ŋutɔ ƒe node si wòɖo to ŋutɔ, si wòɖo vovo na BTCPay Server

> Ne ŋgɔ ƒe `lightwalletd` mele dɔ wɔm o alo nu ha le edzi akpa aɖe la, ɣaɣla fexexewo adze agbagba o.
> Na dɔ siwo le vevie la, tia **endpoint si le eteƒe eye wòɖo ɖase** (abe `zec.rocks` si wotsɔna le gɔmedzedze me).

> Èdi be yàɖo `lightwalletd` to wò ŋutɔ?
> Àte ŋu azã `docker-compose.lwd.yml` si tso [Zebra repository](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml) me.
> **Nuxlɔ̃ame:** Womeŋlɔ ɖoɖo sia le nyagblɔɖi me le dɔme o, eye wòhia be nàwɔ TLS ƒe ɖoɖo, port ƒe mɔɖeɖe, kple firewall ƒe ɖoɖo to asi me - wòle na zazãla siwo nya nu ŋutɔ ko.

---

### Afɔ 4: Ƒo Installer La Gake

`. ./btcpay-setup.sh -i`

BTCPay Server atsɔ wò custom config la awɔ dɔ eye wòaɖe ɖe `lightwalletd` ɣaɣla dzesi ŋɔŋlɔ si wòɖe go la ŋu.

Tso fifia dzi la, Zcash plugin la azã ŋgɔ ƒe endpoint ma na ɣaɣla gaɖoɖowo [transactions] ƒe kpɔɖeŋu.


## Ɖo BTCPay Server Le Aƒeme Kple Cloudflare Tunnel

Èdi be yàxɔ Zcash fexexewo esi nèle BTCPay Server ɖom le aƒeme ƒe mɔ̃nukpɔmɔ̃nukpɔnu dzi - abe Raspberry Pi 5 alo teƒe sia ƒe server aɖe si **static IP mele o**?  
Àte ŋu atsɔ **Cloudflare Tunnel** aɖe wò instance la afia internet dzi le dzidzime.

Mɔ sia medoa port ƒe mɔɖeɖe o eye wòɣla wò IP gaɖoƒe vavã na dukɔ bliboa - esi wònana be wò server nanɔ te ŋu akpɔe to HTTPS dzi.

Eɖoa kpekpeɖeŋu na wò be **nàgblẽ VPS ƒe asixɔxɔ ƒe to** hã, si sɔ ŋutɔ ne cryptocurrency ƒe fexexe nye ŋuɖoɖo si wotia ko, menye wò asitsadɔ ƒe tanya vevi o.

---

### Afɔ 1: Ɖo Cloudflare Tunnel

1. Wɔ account le [cloudflare.com](https://www.cloudflare.com) eye nàtsɔ wò domain akpe ɖe eŋu.
2. Le wò **aƒeme server** dzi, ɖo Cloudflare Tunnel kple Cloudflare ƒe package repository si wòɖe fia le dɔme:

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install cloudflared
```

Ne `apt install cloudflared` medze agbagba o la, ɖo `.deb` si sɔ kple eŋu ɖe eteƒe:

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

3. Ɖe wò ŋutɔ ƒe nyateƒenyawo fia na Cloudflare:

`cloudflared tunnel login`

Se sia aʋu browser ƒe fesi. Ge ɖe eme eye nàna mɔ be woawɔ dɔ kple wò domain.
Cloudflare awɔ `credentials` ƒe faɛl si me token le le wò server dzi le eɖokui si.

4. Wɔ tunnel yeye (àte ŋu aƒe ŋkɔe be `btcpay` alo nu bubu ɖe sia ɖe):

`cloudflared tunnel create btcpay`

Esia wɔa `btcpay.json` ƒe faɛl si me tunnel ƒe ID kple credentialwo le - àhiã esia le afɔ si gbɔna me.

---

### Afɔ 2: Wɔ Tunnel Ƒe Ɖoɖoɖo Faɛl

Wɔ configuration ƒe directory (ne menɔ anyi o) eye nàʋu config ƒe faɛl:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Tsɔ ɖoɖo sia nam:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Gɔmesese:

* `tunnel` - tunnel si nèwɔ tsã ƒe ŋkɔ
* `credentials-file` - mɔ si yia token ƒe faɛl si wowo le `cloudflared tunnel login` me
* `hostname` - wò domain si Cloudflare registra (le kpɔɖeŋu me, `btcpay.example.com`)
* `service` - wò BTCPay Server ƒe teƒe sia ƒe gaɖoƒe ƒe dzesi (zi geɖe nye `http://127.0.0.1:80` na Nginx)

> Cloudflare awɔ proxy na traffic la le dzidzime yi wò teƒe sia ƒe server gbɔ, wò aƒeme IP madze go o.


### Afɔ 3: Tsɔ DNS Ƒe Record Kpe Ɖe Wò Tunnel Ŋu

Le tunnel la wɔwɔ megbe la, Cloudflare anɔa **CNAME DNS record aɖe tsɔm le eɖokui si** na wò domain. Ele be wòanɔ abe ale:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Ne menɔ anyi le eɖokui si o la, tsɔe kpe ɖe eŋu to asi me:

1. Yi wò [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Yi **DNS** ƒe akpa
3. Tsɔ CNAME record yeye kpe ɖe eŋu:
   - **Ŋkɔ**: `btcpay`
   - **Tanya**: `<UUID>.cfargotunnel.com`  
     Àkpɔ asixɔxɔ vavã la le wò `btcpay.json` ƒe faɛl me alo ne nàƒo:
     
     `cloudflared tunnel list`
     
   - **Proxy ƒe nɔnɔme**: Ɖe eŋu (alikeke ƒe alilikpo)

> Record sia na be biabiawo katã siwo yia `btcpay.example.com` la nayi to Cloudflare Tunnel dzi, eye wòɣla wò IP gaɖoƒe vavã na dukɔ bliboa.

---

### Afɔ 4: Na Tunnel La Nadze Dɔ Le System Ƒe Dzedze Me

Be tunnel la nanɔ dɔ wɔm le eɖokui si ne system la dze egɔme la, ɖoe abe system ƒe service ene:

`sudo cloudflared service install`

Emagbe la, ɖe service la ŋu eye nàdze edɔ:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Kpɔ eƒe nɔnɔme:

`sudo systemctl status cloudflared`

Ele be nàkpɔ mesaj aɖe abe `Active: active (running)` ene, kple kpeɖeŋu be `btcpay.example.com` le internet dzi.

> Tso fifia dzi la, tunnel la adze dɔ le eɖokui si le reboot siaa megbe, eye amewo akpɔ wò BTCPay Server le dukɔ bliboa me - port ƒe mɔɖeɖe mele o, eye wò IP gaɖoƒe vavã madze go o.

---

### Afɔ 5: Wu BTCPay Server Ƒe Ɖoɖoɖo

Ne wòle BTCPay Server ɖom zi gbãtɔ la, ɖo wò domain hafi nàƒo setup script la:

`export BTCPAY_HOST="btcpay.example.com"`

Esia na be woazã domain si sɔ ne wowɔ **Nginx ƒe ɖoɖo** kple **SSL certificatewo**.

Ne woɖo BTCPay Server xoxo eye wòle tunnel la tsɔm kpe ɖe eŋu ko la:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Setup la awɔ configwo gake eye wòatsɔ domain yeye la awɔ dɔ.
Fifia la, ele be nàte ŋu akpɔ wò server le:

`https://btcpay.example.com`

> Ne èzã dukɔ bliboa ƒe `lightwalletd` alo wò ŋutɔ ƒe ɣaɣla dzesi ŋɔŋlɔ blibo hã la, esia mekpɔɖeŋu tunnel la o.
> Nusi koe nye be BTCPay Server le to ɖom le `127.0.0.1:80` dzi le teƒe sia me.


## Ɖo Zcash Plugin La Le BTCPay Server Ƒe Web Interface Me

> **Nya vevi na store geɖe ƒe ɖoɖowo:**  
> Zcash gakotoku [wallet] si wòɖo le afisia nye **global** na instance la. Storewo katã azã gakotoku sia ne mèƒu BTCPay ƒe instance vovovowo o.

Le wò BTCPay Server instance la ɖoɖo nyuie megbe la, àhiã be nàwɔ ɖoɖo gɔmedzedze aɖewo to admin ƒe web interface dzi.  
Nyagblɔɖi si tso dɔme la na fiafiã bliboa le English - afisia la, míato afɔ siwo hia ŋutɔ me eye míatsɔ mɔ vevi atɔ ɖo Zcash plugin la ŋu.

---

### Afɔ 1: Ge Ɖe Web Interface La Me

Yi wò instance gbɔ le:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Ɖe wò administrator ƒe login kple password.
- Ne enye zi gbãtɔ wòle geɖem la, woabia tso asiwò be nàwɔ account.
- Account si nèregistra gbãtɔ la axɔ admin ƒe mɔwo le eɖokui si.

---

### Afɔ 2: Ɖo Zcash Plugin La

1. Le menu vevi la me, yi:

`Plugins -> Browse Plugins`

2. Di **Zcash (ZEC)** plugin la. Zã search bar la ne ehiã.
3. Zi **Install** eye nàɖe eŋu.

> Wɔ mɔ sia ke na altcoin bubu siawo hã siwo nèɖe woŋu le server ƒe ɖoɖo me.

Le ɖoɖo la megbe la, zi **Restart Server** be interface la nagbugbɔ ava kple plugin siwo le dɔ wɔm.

### Afɔ 3: Ɖe Wò Gakotoku Ŋu To Viewing Key

Le plugin la ɖoɖo megbe la, **Zcash** ƒe akpa yeye aɖe ava le settings ƒe menu me.

1. Yi:

`Zcash -> Settings`

2. Nam wò **Unified Full Viewing Key (UFVK)** - BTCPay awɔ Unified Address na invoice siaa eye wòakpɔ ɣaɣla fexexe siwo va.
   
> **Nuxlɔ̃ame:** Woate ŋu azã Sapling viewing key xoxowo, gake be nàzã Orchard/Unified Addresswo la, ele be nàtsɔ **UFVK**.

   Format ƒe kpɔɖeŋu:

`uview184syv9wftwngkay8d...`

3. Ɖe asixɔxɔ aɖe le Block height ƒe field la me

* **Zi gbãtɔ ƒe ɖoɖo kple gakotoku yeye (gadzraɖoɖi nya [seed phrase] yeye):** ɖe Zcash gaɖoɖowo ƒuƒoƒe [block] ƒe kɔkɔƒe fifia (àte ŋu akpɔe le 3xpl.com/zcash) - esia awɔ be scanning ƒe gɔmedzedze nanɔ kabakaba.
* **Nèle server ma ke dzi, eye nèle tso Sapling-ko ƒe ɖoɖo xoxo me yi Unified Addresswo / Orchard gbɔ:** Gblẽ field sia ƒe nɔnɔ.
* **Nèle store wò tsɔm yi server yeye dzi kple gakotoku/UFVK ma ke:** Àte ŋu aɖe birth height la - kɔkɔƒe aɖe si sɔ ɖe wò store ƒe order si woxe ga na gbãtɔ ŋu (sɔ order ƒe ŋkeke kple 3xpl me be scan la nanɔ susu) - ne mèka ɖe edzi o la, gblẽe ƒe nɔnɔ.

> Gakotokuwo katã mede mɔ be woaɖe **Unified Full Viewing Key (UFVK)** go haɖe o.  
> Nutiati siwo míeɖo atsyɔ̃ nye:  
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! Wallet (version na PC)**](https://zingolabs.org/)  
> Le app eveawo me la, di UFVK ƒe export le backup/export ƒe akpa me.

Key siawo ɖoa alɔ̃ na **address ƒe trɔtrɔ le eɖokui si**, si fia be:
- Asitsala siaa xɔ fexexe ƒe gaɖoƒe ƒe dzesi **tɔxɛ**
- Nàkpɔ balance **ɖeka, si woƒo ƒu**

Àte ŋu akpɔ compatibility ƒe list didi wu le [ZecHub -> Wallets](https://zechub.wiki/wallets).

Ne wòɖe fieldwo katã me vɔ la, zi **Save**.

---

### Ɖe Ɖase Le Wò ZEC Ƒe Fexexe Ƒe Dɔwɔmɔ Ŋu

Míedo na wò - wò Zcash gakotoku fifia la, woɖe eŋu kple BTCPay Server.

Mina míawɔ kpɔɖeŋu:

1. Yi:

`Invoices -> Create New`

2. Wɔ test invoice na ga sue aɖe le ZEC me.
3. Ɖo ga tso **gakotoku bubu aɖe** me (menye esia si woɖe kple BTCPay o).
4. Ne wokpɔ gaɖoɖo la vɔ la, invoice ƒe axa la afia dzidzɔkpɔkpɔ le nɔnɔme me.
5. Ɖe ɖase be invoice ƒe nɔnɔme trɔ yi **Paid**.

Ne nu siawo katã dze agbagba la - wòle klalo be nàtsɔ ZEC fexexewo akpe ɖe wò website ŋu kple API alo CMS ƒe pluginwo.



## Ɖe BTCPay Server Ɖe Wò Website Ŋu

Ne woɖe wò Zcash gakotoku ŋu kple BTCPay Server vɔ la, àte ŋu aɖe fexexe ƒe system la akpe ɖe wò website ŋu.  
Mɔ geɖewo li be nàwɔe - tso API ƒe mɔ tẽe dzi va se ɖe plugin siwo wode ɖo na CMS ƒe platform siwo amewo zã ŋutɔ.

---

### Mɔ Siwo Li Na Kadodo

- **API Ƒe Kadodo**  
  Enyo na website alo system si wò ŋutɔ wɔ, alo siwo me CMS mele o.  
  Ena mɔ be nànɔ control blibo wɔm le invoice ƒe wɔwɔ, fexexe ƒe ŋkuléle, kple nyadzɔdzɔwo dzi - katã le wò ŋutɔ ƒe interface kple logic me.  
  Ehia programming ƒe nyanya gɔmedzedze aɖe, eyata enyo be wò mɔ̃ ƒe ɖoɖoŋlɔla [developer] nawɔ dɔ sia.

- **CMS Ƒe Pluginwo**  
  Woli na platformwo abe **WooCommerce**, **PrestaShop**, kple bubuwo.  
  Plugin siawo nana be nàxɔ fexexe le minuti aɖewo me - code ŋlɔŋlɔ mehia o.

- **Fexexe Ƒe Button Alo Iframe**  
  Mɔ bɔbɔe kekeake.
  Esɔ na landing pagewo, website ŋutɔ ƒe tɔwo, alo site ɖe sia ɖe si dzi wòdi be yàtsɔ donation ƒe link alo checkout ƒe widget aɖe akpe ko.

---

### API Ƒe Kadodo

Ne èzã platform si wò ŋutɔ wɔ (alo CMS aɖeke mele o) la, API nye mɔ nyuitɔ.
Ena mɔ be nàwɔ nu bliboa ale si wòdi: àte ŋu awɔ invoicewo, akpɔ woƒe nɔnɔme ɖa, axɔ nyadzɔdzɔwo, eye nàwɔ control blibo le zazãla ƒe nɔnɔme ŋu.

> Nuxlɔ̃ame: CMS ƒe plugin aɖewo hã zãa API le megbe, eyata API key wɔwɔ nye **afɔ gbãtɔ si wòle be nàwɔ** zi geɖe, to kadodo ƒe mɔ si nètia dzi o.

Afɔ si gbɔna: wɔ API key na wò store eye nàdze [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) ƒe zazã gɔme be nàtu wò kadodo.

### API Key Ƒe Wɔwɔ

Be nàɖe BTCPay Server akpe ɖe wò website alo app ŋu la, àhiã be nàwɔ API key.

1. Ge ɖe BTCPay Server me eye nàʋu **zazãla ƒe menu** (le ƒeƒe dzi ƒe gome)
2. Yi **API Keys**
3. Zi **Create a new API key**
4. Ɖe ŋkɔ na wò key
5. Le **Permissions** ƒe akpa me, ɖe esiawo ŋu:
   - `Can create invoice`
   - `Can view invoice`
   - *(Ne ehiã)* `Can modify store settings` - ne èhia store ƒe nudzikpɔkpɔ ƒe level ko

6. Zi **Generate**. Wò API key ŋutɔ ava le afi ma - kplɔe eye nàdzrae le teƒe dedie.

> Key sia na mɔ be woakpɔ wò store ƒe invoicewo.
> Mègblɔe na amewo le dukɔ bliboa me alo mèɖee le client-side code me o.

---

### Kpɔɖeŋu: Invoice Ƒe Wɔwɔ To API Dzi

**Endpoint:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Request ƒe ŋutilã:**

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

**Ŋuɖoɖo:**

Àxɔ JSON ƒe nuɖoɖo aɖe si me esiawo le:

* `invoiceId`
* Fexexe ƒe URL si nàte ŋu aɖe akpe ɖe wò website ŋu alo nàɖo ɖe asitsala la

Kpɔ nyagblɔɖi bliboa:
[Greenfield API – Wɔ Invoice](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Ɖo Webhook (Ne Ehiã)

Be nàxɔ nyadzɔdzɔwo le ɣeyiɣi ma ke me ne invoice ƒe nɔnɔme trɔ (le kpɔɖeŋu me, ne woxɔ fexexe):

1. Yi wò store ƒe settings -> **Webhooks**
2. Tsɔ wò backend endpoint ƒe URL si awɔ `POST` ƒe biabiawo tso BTCPay Server gbɔ
3. BTCPay aɖo nyadzɔdzɔwo le eɖokui si ne woxe ga na invoice alo eƒe ɣeyiɣi va yi

Woɖe webhook ƒe payloadwo kple retry ƒe logic fia le [official webhook documentation](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-) me.

> Kadodo ƒe kpɔɖeŋuwo li na programming ƒe gbegbɔgblɔ vovovowo le BTCPay ƒe docs kple GitHub ƒe repositorywo me.



### CMS Ƒe Kadodo

BTCPay Server tše pluginwo ɖo na content management system (CMS) siwo amewo zã ŋutɔ.  
Kadodo si xɔ mɔ nyuie eye amewo zã ŋutɔ wu nye **WordPress + WooCommerce**, si nana be nàxɔ ZEC fexexewo **code ŋlɔŋlɔ mele o**.

---

#### WooCommerce (WordPress)

BTCPay Server tše plugin aɖe ɖo le dɔme na WooCommerce.

Afɔ siwo nàto me be nàɖe wo ŋu:

1. Ɖo **BTCPay for WooCommerce** plugin la tso WordPress ƒe plugin directory alo tso GitHub.
2. Le wò WordPress ƒe admin panel me, yi:

`WooCommerce -> Settings -> Payments`

3. Di **BTCPay** le list la me eye nàzi **Set up**
4. Ɖe wò BTCPay Server URL eye nàto mɔfiame siwo woɖe fia me  
   (API key ƒe wɔwɔ le eɖokui si nye nusi wotsɔ ɖo atsyɔ̃)
5. Ɖe fexexe ƒe mɔ la ŋu eye nàdzra wò ɖoɖowo

> Fiafiame tsitotsito, video ƒe tutorialwo, kple kpekpeɖeŋu na kuxi ƒe nyɔnuwo le plugin ƒe nyagblɔɖi me.

Àkpɔ CMS ƒe kadodo ƒe mɔ bubuwo hã le akpa ma ke me le BTCPay ƒe docs me.

---

### Fexexe Ƒe Button Alo Iframe (CMS Alo API Mehia O)

Ne mèzã CMS o eye mèdi be yàwɔ dɔ kple APIwo o la, mɔ bɔbɔe kekeake be nàxɔ ZEC fexexewo nye be nà**ɖe fexexe ƒe link alo widget aɖe** ɖe wò website ŋu tẽ.

Mɔ sia sɔ na:

- Landing pagewo
- Portfolio ƒe sitewo
- Blogwo alo static pagewo
- Project siwo me backend server mele o

---

#### Tia 1: Fexexe Ƒe Button (Link)

1. Le BTCPay Server me, wɔ invoice aɖe to asi me le **Invoices** ƒe akpa me
2. Kplɔ fexexe ƒe link la, le kpɔɖeŋu me:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Ɖe link la ɖe wò HTML me:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Tia 2: Invoice Si Woɖe Ɖe Eme (Iframe)

Be nàfia invoice la tẽ le wò site dzi la, zã iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Àte ŋu atrɔ button la alo iframe ƒe container la ƒe nɔnɔme be wòasɔ kple wò site ƒe design - BTCPay Server na mɔ be nàtrɔ invoice ƒe axa la ƒe thema le mɔ vovovowo nu.

## Nukoko

Mɔfiafia sia nɔ didi - gake eƒe nya vevieawo ko wòbia tso ale si woatsɔe ade Zcash ƒe fexexe [payments]wo kple BTCPay Server ŋu.

BTCPay Server ƒe interface la ƒe dɔwɔwɔ geɖe wu ale si míefia le afisia. Dzidzɔ le eme be UI la le gbe vovovowo me (Russiatɔ hã le eme), eye esia wɔe be wòate ŋu adi le eŋu eye nàwɔ dodokpɔ ɖe eŋu bɔbɔe.

BTCPay nye dɔwɔnu [tools] si trɔtrɔ geɖe le eme. Àte ŋu:

* Nàdzra fiadɔƒe siwo ɖe sia ɖe le wo ŋutɔ ƒe mɔnu me geɖe ɖe instance ɖeka dzi
* Nàɖo dɔwɔla ƒe nɔnɔme kple mɔnu siwo woate ŋu awɔ nu kple wo le team la me - tso order ƒe nukpɔ ko va se ɖe admin blibo
* Nàzã wò ŋutɔ ƒe domainwo kple brand
* Nàɖo webhookwo, gakotoku [wallet] siwo woazã ne nu meɖe anyi kple Tor ƒe mɔnu hã
* Nàtrɔ nɔnɔme siwo le ŋgɔ abe tax ƒe sewo, discount codewo, checkout axa ƒe trɔtrɔ, fexexe ƒe mɔnu ƒe didiwo, kple bubuawo ene

Wotu BTCPay abe open-source ƒe alternative na centralized fexexe ƒe hehewo ene. Ne èle didim be nàxɔ ZEC ƒe fexexe ɣaɣla [privacy] si me amedzro aɖeke mele o la, platform sia dze be nàna wò ŋkuléle.

Míado gbe na wò be nàkpɔ dzidzedze le BTCPay ecosystem la didi me kple le wò fexexewo wɔwɔ be woanye wò tɔ vavã me.

## Nuɖoƒewo

* [BTCPay Server Nyatakakadzraƒe ƒe Nyatakaka](https://btcpayserver.org/)
* [BTCPay ƒe Biabia Siwo Woabi Zi Geɖe](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub ƒe Repository](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet ƒe Demo](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Plugin na BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Plugin ƒe Ɖoɖo Mɔfiafia](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Custom zcash-lightwalletd.custom.yml ƒe Kpɔɖeŋu](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [lightwalletd Docker ƒe Compose File (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API Key ƒe Nyatakakawo (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Wɔ Cloudflare Tunnel ɖeka](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash Gakotoku ƒe Nɔƒeƒome ƒe Xexlẽme (ZecHub)](https://zechub.wiki/wallets)
* [Zebra kple lightwalletd le Raspberry Pi 5 dzi (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
