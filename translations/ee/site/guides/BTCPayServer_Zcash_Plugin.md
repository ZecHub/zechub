# BTCPay Server kple Zcash Kpekpeɖeŋu: Bliboe ƒe Ðoɖowɔwɔ kple Ðekawɔwɔ Mɔfiame

BTCPay Server ɖea mɔ na asitsaha siwo le Internet dzi be woaxɔ cryptocurrency fexexe tẽ, domenɔlawo alo gadzikpɔlawo manɔmee. Mɔfiame sia kplɔa wò toa ɖoɖo bliboa si nye be nàɖo BTCPay Server kple native support na Zcash shielded payments.

> Nuŋlɔɖi sia ku ɖe Zcash tsɔtsɔ de wò BTCPay Server ƒe kpɔɖeŋu me ŋu. 
> Edoa alɔ **full node (Zebra)** kple **lightwalletd-dzi ɖoɖowo** siaa.

---

## Emenyawo ƒe Tabla

- [Nukatae Nàzã BTCPay Server kple Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Alesi BTCPay Server Wɔa Dɔe](#How-BTCPay-Server-Works)
- [Afikae Wodzraa Gawo ɖo? Amekae Kpɔa Safui Siwo Nye Ame ŋutɔ ƒe Safuiwo Dzi?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Alesi Nàɖo BTCPay Server na Zcash Xɔxɔ](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [BTCPay Server ƒe dɔwɔwɔ kple Zcash Kpekpeɖeŋu](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Wò ŋutɔ Wò Zcash Full Node (Zebra + Lightwalletd) ƒe Duƒuƒu](#Running-Your-Own-Zcash-Full-Node)
  - [Kadodo kple External lightwalletd Node (Tɔtrɔ ƒe Ðoɖowɔwɔ)](#Connecting-to-an-External-Lightwalletd-Node)
  - [BTCPay Server ƒe amedzrowɔwɔ le Aƒeme kple Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Zcash Plugin ƒe ɖoɖowɔwɔ le BTCPay Server Web Interface me](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [BTCPay Server ƒe Ðekawɔwɔ Kple Wò Nyatakakadzraɖoƒea](#Integrating-BTCPay-Server-with-Your-Website)
  - [API ƒe Ðekawɔwɔ](#API-Integration)
    - [API Safui aɖe wɔwɔ](#Generating-an-API-Key)
    - [Kpɔɖeŋu: Invoice wɔwɔ to API dzi](#Example-Creating-an-Invoice-via-API)
    - [Webhook ƒe Ðoɖowɔwɔ](#Setting-Up-a-Webhook-Optional)
  - [CMS ƒe Ðekawɔwɔ](#CMS-Integration)
  - [Fexexe ƒe Abɔta alo Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Nyanuwuwuw](#Conclusion)
- [Nunɔamesiwo](#Resources)


---

## Nukatae Nàzã BTCPay Server kple Zcash

Internet dzi asitsatsa va le cryptocurrency xɔm geɖe wu. Ewɔa dɔ kabakaba, ewɔa xexeame katã, eye wòwɔa dɔ gadzraɖoƒewo manɔmee. Esia ɖea vi na asitsalawo kple asisiwo siaa. Gake nya vevi aɖe li si dzi ame geɖe ŋea aɖaba ƒuna.

Ne asisi le nudɔdɔ wɔm la, zi geɖe la, enaa ame ŋutɔ ƒe nyatakakawo: ŋkɔ, adrɛs si dzi woɖoe ɖo, kple telefon xexlẽdzesi. Ne wozã dutoƒo blockchain tsɔ xe fea - abe Bitcoin, Ethereum, alo stablecoins le Ethereum alo Tron dzi ene la - asitsatsa la va dzena tegbee hena numekuku.

Ame sia ame, ne menya nusi wode se na o gɔ̃ hã la, ate ŋu:

- kpɔ ɣeyiɣi si woxee kple ga home si woxe 
- di afisi ga la tso kple afisi woyi la ɖa 
- do ƒome kple cryptocurrency adrɛs kple ame ŋutɔŋutɔ nenye be kadodo aɖe le eme (le kpɔɖeŋu me, e-mail alo ŋkɔ si woɖo ɖe amewo ƒe ŋkɔ si do go)

Esia fia be nuƒle zi ɖeka ate ŋu aɖe asisi aɖe ƒe ganyawo katã afia.

Eye ewɔa dɔ le mɔ bubu nu hã. Ne asitsala aɖe ƒe adrɛs dze le kɔsɔkɔsɔ me kpɔ la, wova dzena. Hoʋlilawo kple ame etɔ̃lia siwo léa ŋku ɖe nu ŋu ate ŋu alé ŋku ɖe fexexe ƒe agbɔsɔsɔme, nudzralawo ƒe dɔwɔna, kple asitsatsa ƒe sisi ƒe ɖoɖo ŋu.

### BTCPay Server kple Zcash ƒe ƒuƒoƒo ateŋu akpɔ esia gbɔ.


BTCPay Server nye ɖoɖo si wowɔna femaxee eye woɖea asi le eŋu hena cryptocurrency fexexe. 
Menye fexexe ƒe domenɔlae wònye o eye ga aɖeke mele esi o. Fexexeawo katã yia asitsala la ƒe gakotoku me tẽ. 
Esia ateŋu anye ame ŋutɔ ƒe gakotoku alo multisig ɖoɖo le habɔbɔ aɖe me.

Server la kpɔa ɖoɖowɔwɔ ƒe dɔwo gbɔ:

- wɔa adrɛs tɔxɛ aɖe na nudɔdɔ ɖesiaɖe 
- léa ŋku ɖe ɣeyiɣi si me woxɔ fetu ŋu eye wòdoa ka kple nudɔdɔa 
- naa gaxɔgbalẽviwo kple gbeƒãɖeɖewo 
- naa fexexe ƒe mɔnu aɖe na asisi la 

Nusianu zɔna le fiasea tɔ ƒe ŋusẽ te, eye womeɖoa ŋu ɖe ame bubuwo ƒe dɔwɔnawo ŋu o.

Zcash nye cryptocurrency si wotu ɖe zero-sidzedze kpeɖodziwo dzi. Edoa alɔ asitsatsa ƒe kpɔɖeŋu si nye ame ŋutɔ tɔ bliboe. 
Ne èle adrɛs siwo wokpɔ ta na (si woyɔna le afisia ko be “adrɛs”) zãm la, womeɖea amesi ɖoe ɖa, amesi xɔe, kple ga home si wodzra la ɖe go le blockchain la dzi o.

Le Internet dzi fiasewo gome la, esia fia be:

- Nuƒlela ate ŋu awu fexexea nu evɔ maɖe woƒe ganyawo afia o 
- Nudzrala la xɔa fetu evɔ meɖea woƒe adrɛs, nudzadzra ƒe agbɔsɔsɔ, alo asitsatsa ƒe ɖoɖo ɖe go o 
- Gotagome ŋkuléla aɖeke mate ŋu atsɔ fexexea asɔ kple nudɔdɔa alo asisiwo ƒe nyatakakawo o

### Kpɔɖeŋu si Ŋu Ŋusẽ Le

Zãla aɖe wɔa nudɔdɔ eye wòtiaa Bitcoin alo USDT be wòanye fexexemɔnu. 
Nyatakakadzraɖoƒea wɔa fexexe ƒe adrɛs eye wòɖea ga homea fiana. 
Ne woxe fe vɔ la, wodzraa adrɛs sia ɖo ɖe blockchain la dzi eye wòzua dutoƒo. 
Ðeko wòle be amedzidzela natsɔ nudɔdɔ ɖeka aƒo ka na adrɛs la be wòate ŋu akpɔ eƒe asitsatsa ŋutinya bliboa ɣeyiɣi didi.

Azɔ bu nɔnɔme ma ke si le Zcash hã ŋu kpɔ. 
BTCPay Server wɔa adrɛs si wokpɔ ta na. Nuƒlela la ɖoa ga si woxe la ɖa. 
Le blockchain ƒe nukpɔsusu nu la, naneke medzɔna o. Dutoƒonyatakaka aɖeke meli si ŋu woaku nu me le o. 
Server la xɔa kpeɖodzi, doa ka kple nudɔdɔa, eye wòwua dɔa nu.

Le egodotɔ ɖesiaɖe gome la, edze abe naneke medzɔ o ene. 
Susuwo katã gakpɔtɔ le fiasea kple asisi dome - abe alesi wòle be wòanɔ ene.

Egbɔkpɔnu sia megblẽa nu le nuwo wɔwɔ le wo ɖokui si alo zazã ŋu o. 
Nusianu wɔa dɔ abe alesi wòle le cryptocurrencies bubuwo gome ene, ɖeko afɔku si le nyatakakawo dodo me manɔmee.



## Alesi BTCPay Server Wɔa Dɔe

BTCPay Server wɔa dɔ abe fexexe ŋuti dɔwɔwɔ ƒe tɔdzisasrã ene le wò e-asitsatsa ƒe mɔnu kple blockchain dome. Alesi tsi si sina la wɔa dɔe nye esi:

1. **Asisi la wɔa nudɔdɔ** le wò nyatakakadzraɖoƒe (e.g. WooCommerce, Magento, alo mɔ̃ ɖesiaɖe si me BTCPay ƒe ɖekawɔwɔ le).

2. **Fiasea bia fexexe ƒe agbalẽvi** tso BTCPay Server gbɔ. Server la wɔa adzɔxegbalẽvi tɔxɛ aɖe si me:
   - Ga home si wobia
   - Ɣeyiɣidzidzenu si wotsɔ xlẽa ɣeyiɣi yi megbe
   - A Zcash Unified Address (UA) - e.g., `u1...` - si me Orchard (shielded) receiver le le gɔmedzedzea me.

3. **Asisi la kpɔa fexexe ƒe axa** eye wòɖoa ZEC ɖe adrɛs si wona.

4. **BTCPay Server léa ŋku ɖe blockchain la ŋu**, léa ŋku ɖe fexexea ŋu le:
   - Ga home si wokpɔ mɔ na
   - Adrɛs si dzi woaxɔe
   - Adzɔxegbalẽvi ƒe ɣeyiɣi ƒe dzesi

5. **Ne wonya de dzesi asitsatsa la eye woɖo kpe edzi ko** la, BTCPay naa nyanya fiasea.

6. **Asisi la xɔa fexexe ƒe kpeɖodzi.** Ne elɔ̃ la, dɔwɔƒea ate ŋu aɖo gaxɔgbalẽvi ɖe to email dzi.

Dɔwɔwɔ sia katã dzɔna **le eɖokui si**, domenɔla alo nudzikpɔla aɖeke mele eme o. 
BTCPay Server **meléa ga aɖeke ɖe asi o** - ɖeko wòtsɔa nudɔdɔ ƒe ɖoɖoa doa ka kple blockchain la dedie eye le adzame.
## Afikae Wodzraa Gawo ɖo? Amekae Kpɔa Safui Siwo Nye Ame ŋutɔ ƒe Safuiwo Dzi?

BTCPay Server nye **menye** gakotoku o eye **mehiã ame ŋutɔ ƒe safuiwo o**. 
Gaawo katã yia **tẽe** ɖe asitsala la ƒe gakotoku me. Wokpɔa dedienɔnɔ ta to **nukpɔkpɔ si wotu ɖe safui dzi** zazã me.

### Ale Si Wòwɔa Dɔe

- **Wowɔa gakotokua do ŋgɔ.** 
  Asitsala zãa Zcash gakotoku si doa alɔ safuiwo kpɔkpɔ - abe [YWallet](https://ywallet.app/installation) alo [Zingo! Gakotoku](https://zingolabs.org/).  
  Woƒe xexlẽdzesi bliboa le [ZecHub.wiki](https://zechub.wiki/wallets).

- **BTCPay Server doa ka to nukpɔkpɔ ƒe safui dzi.** 
  Nukpɔkpɔ ƒe safui nye **nuxexlẽ ɖeɖeko ƒe safui**: ate ŋu ade dzesi ga si woxena eye wòawɔ adrɛs yeye siwo woxɔna, . 
  gake mate ŋu azã ga o. Server la medzraa nuku ƒe nyagbewo alo ame ŋutɔ ƒe safuiwo ɖo o.

- **Wokpɔa blockchain nyatakakawo to a `lightwalletd` server.** 
  Àte ŋu azã dutoƒo node abe `https://zec.rocks`, alo ƒu du wò ŋutɔ tɔwò `Zebra + lightwalletd` stack hena dziɖulanyenye blibo.

- **Nudɔdɔ ɖesiaɖe xɔa adrɛs tɔxɛ aɖe.** 
  Nukpɔkpɔ ƒe safuiwo ɖea mɔ na dɔwɔƒea be wòakpɔ Zcash ƒe adrɛs yeye siwo wokpɔ ta na na adzɔxegbalẽvi ɖesiaɖe, . 
  si ana woate ŋu alé ŋku ɖe fexexe ŋu dedie eye woaxe mɔ ɖe adrɛs gbugbɔgazã nu.

- **Èkpɔa ŋusẽ blibo ɖe ga la dzi.** 
  Ne server la gblẽ hã la, ame aɖeke mate ŋu afi wò ga o - fexexe ƒe metadata koe woate ŋu aɖe ɖe go.

Aɖaŋu sia ma **xɔtuɖoɖo** kple **nunɔamesiwo dzikpɔkpɔ** dome. 
Àte ŋu awɔ BTCPay Server yeyee, aʋui, alo agbugbɔe ade eme evɔ màde ga aɖeke afɔku me o.

## Alesi Nàɖo BTCPay Server na Zcash Xɔxɔ

Le akpa siwo do ŋgɔ me la, míeɖe alesi BTCPay Server wɔa dɔ kple Zcash kple nusita wòle vevie na ameŋunyatakakawo takpɔkpɔ ƒe fexexe me. Fifia ɣeyiɣia de be míawɔ asiwo.

Wò ɖoɖo tututu anɔ te ɖe nu geɖe dzi:

- Ðe BTCPay Server ƒe kpɔɖeŋu aɖe le asiwò xoxoa?
- Èdi be yeazã dutoƒo lightwalletd alo yeawɔ ye ŋutɔ yeƒe node bliboaa?
- Ðe server la awɔ dɔ le VPS dzi loo alo le aƒemea?

Ta sia ƒo nu tso ɖoɖowɔɖi ƒe nɔnɔme siwo katã li fifia ŋu - tso ɖoɖo suetɔ dzi va ɖo dziɖuɖu blibo ƒe dɔwɔwɔ dzi.

Míazɔ to nusiwo gbɔna me:

- Alesi woawɔ nusianu tso gɔmedzedzea me ke ɖe VPS dzi, si me node bliboa (Zebra) hã le .
- Alesi nàwɔ BTCPay Server le aƒeme esime nèle wò IP ɣlam to **Cloudflare Tunnel** zazã me.
- Alesi woawɔ Zcash ƒe kpekpeɖeŋu nawɔ dɔ eye woawɔ ɖoɖo ɖe eŋu le BTCPay Server ƒe nyatakakadzraɖoƒe ƒe ŋgɔdonya me
- Alesi nàwɔ atsɔ BTCPay awɔ ɖeka kple wò nyatakakadzraɖoƒe alo Internet dzi fiase


## BTCPay Server ƒe dɔwɔwɔ kple Zcash Kpekpeɖeŋu

Mina míayi ɖoɖo ŋutɔŋutɔa dzi. Le akpa sia me la, míade BTCPay Server kple Zcash ƒe kpekpeɖeŋu - le VPS yeye dzi alo to ZEC ƒe kpekpeɖeŋu tsɔtsɔ kpe ɖe kpɔɖeŋu si li ŋu me.

Ne BTCPay Server le dɔ wɔm xoxo (e.g. na BTC alo Lightning), mehiã be nàgbugbɔ nusianu aɖoe o - ɖeko nàwɔ ZEC ƒe kpeɖeŋutɔa ŋudɔ.

Míazɔ to ɖoɖo vovovowo me, tso ɖoɖo suetɔ kekeake siwo zãa dutoƒo `lightwalletd` node na bliboe sovereign installations kple wò ŋutɔ wò blibo node. 
Tiatia nyuitɔ nɔ te ɖe afisi wò server le kple ɖokuisinɔnɔ agbɔsɔsɔme si nèdi tso gotagome xɔtuɖoɖowo gbɔ dzi.

> Plugin ƒe nuŋlɔɖi siwo dziɖuɖua da asi ɖo: 
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Nuxlɔ̃ame - gakotoku ɖeka le kpɔɖeŋu ɖesiaɖe me:** 
> Zcash ƒe kpeɖeŋutɔ zãa **gakotoku ɖeka si woama** le **fiasewo katã** me le BTCPay ƒe kpɔɖeŋua me. 
> Ne èxɔ fiase geɖe siwo le wo ɖokui si le nɔnɔme ɖeka me la, woama Zcash gakotoku ɖeka. 
> Zã kpɔɖeŋu vovovowo ne èhiã na gakotoku ƒe vovototodedeameme sesẽ.

---

### VPS ƒe Ðoɖowɔwɔ si Wokafu

Hafi nàdae ɖe wò kɔmpiuta dzi la, kpɔ egbɔ be:

- VPS si me **Ubuntu 22.04+** le.
- Domain ŋkɔ si fia asi wò server ƒe IP adrɛs (to DNS dzi) .
- `git`, `docker`, kple `docker-compose` wotsɔe de eme
- SSH ƒe mɔɖeɖe ɖe dɔdzikpɔla ŋu

---

## Wò Server Dzadzraɖo (afã ɣaɣla) .

<details>
  <summary>Click to expand</summary>

Be nàɖo BTCPay Server kple Zcash ƒe kpekpeɖeŋu la, àhiã nusiwo gbɔna:

### 1. VPS si me Ubuntu 22.04 alo yeyetɔ le

Míeɖo aɖaŋu be nàzã **Ubuntu Server 22.04 LTS** ƒe ɖoɖo suetɔ kekeake. 
VPS dɔwɔƒe ɖesiaɖe si ana IP adrɛs tɔxɛ aɖe la awɔ dɔ. 

**Nudidi suetɔ kekeake**: 
- 2 CPU ƒe nu veviwo 
- 4 GB RAM ƒe RAM 
- 40 GB ƒe disk ƒe teƒe 

Ðoɖo sia sɔ gbɔ ne èle lightwalletd zãm na Zcash. 
Ne èɖoe be yeawɔ **Zcash node blibo** la, àhiã **300 GB** ya teti ƒe disk teƒe femaxee.

---

### 2. Domain ŋkɔ si fia asi wò server

Le wò DNS dɔwɔƒea ƒe dashboard me la, wɔ `A` nuŋlɔɖi na subdomain aɖe 
(e.g. `btcpay.example.com`) si fia asi wò VPS IP adrɛs. 

Woazã domenyinyi sia atsɔ age ɖe BTCPay Server me tso web-browser la dzi 
eye be woawɔ **SSL ɖaseɖigbalẽ femaxee** le eɖokui si to Let's Encrypt dzi.

---

### 3. SSH ƒe mɔɖeɖe ɖe dɔdzikpɔla ŋu

Be nàde BTCPay Server la, ele be nàdo ka kple wò VPS to SSH dzi. 
Tso wò terminal dzi la, ƒu du:

`ssh root@YOUR_SERVER_IP`

Ne èzã macOS, Linux, alo WSL le Windows dzi la, SSH le terminal la me xoxo.
Le Windows gbadzaa dzi la, zã SSH asitsaha abe **PuTTY** ene.

---

### 4. De Git, Docker, kple Docker Compose ɖe wò kɔmpiuta dzi

Ne ènya do ka to SSH dzi ko la, trɔ asi le wò system packages ŋu eye nàde akpa siwo hiã la wò kɔmpiuta dzi:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Le Ubuntu 22.04 kple yeyewo dzi la, . `docker-compose` tso APT me la, woɖe asi le eŋu.
> Nusi wokafu be woatsɔ ablaee nye `docker-compose-plugin`, si naa... `docker compose` sedede (de dzesi teƒea le esi teƒe be nàde dzesi fli).

Wò server ƒe nɔnɔme sɔ azɔ na BTCPay Server ɖoɖo.

</details>

---

### Afɔɖeɖe 1: Wɔ Nudzraɖoƒea ƒe nɔnɔmetata

Wɔ dɔwɔwɔ ƒe agbalẽdzraɖoƒe eye nàwɔ BTCPay Server Docker ƒe dɔwɔwɔ ƒe kɔpi:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Afɔɖeɖe 2: Ðo Nutome ƒe Tɔtrɔwo ɖe duta

Ɖo eteƒe `btcpay.example.com` kple wò domenyiŋusẽfianu ŋutɔŋutɔ:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Ne èɖoe be yeatsɔ Monero alo Litecoin akpe ɖe eŋu emegbe la, àte ŋu ade wo eme fifia:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Àte ŋu atsɔ gaku yeyewo akpe ɖe eŋu ɣesiaɣi to tɔtrɔ siwo sɔ la ɖoɖo ɖe duta kple ɖoɖowɔɖi ƒe nuŋɔŋlɔa gbugbɔgawɔ me:

`. ./btcpay-setup.sh -i`

Le mɔfiame sia ta la, míalé fɔ ɖe **Zcash ɖeɖeko** ŋu.

---

### Afɔɖeɖe 3: Tsɔ Installer la ƒu du

Ƒu du setup script la be nàtu server la eye nàdze egɔme:

`. ./btcpay-setup.sh -i`

Script la aɖo nusiwo dzi woanɔ te ɖo, awɔ `docker-compose.yml`, dze subɔsubɔdɔwo gɔme, eye nàwɔ ɖoɖo ɖe eŋu `systemd`.
Esia xɔa abe miniti 5 ene.

Ne èwu enu vɔ la, wò BTCPay Server ƒe kpɔɖeŋua anɔ anyi le:

`https://btcpay.example.com`

> Ne èle asi trɔm le ɖoɖo aɖe si li xoxo ŋu (e.g. ZEC tsɔ kpe ɖe eŋu) la, kpɔ egbɔ be yetɔ te dɔdzikpɔla la eye yegbugbɔ dze dɔa gɔme kple ɖoɖo yeyewo:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Emegbe yi akpa si kplɔe ɖo dzi be nàɖo Zcash le BTCPay Server web interface me.



## Wò ŋutɔ Wò Zcash Full Node ƒe Duƒuƒu

Ne èdi be **menye** be yeaɖo ŋu ɖe dutoƒo ŋu o `lightwalletd` nodes, àteŋu aɖo wò ŋutɔ wò Zcash node bliboa kpe ɖe Lightwalletd ŋu le server ɖeka dzi. 
Esia naa wò **ɖokuisinɔnɔ blibo** - gotagome nusiwo dzi woanɔ te ɖo aɖeke meli o, kakaɖedzi aɖeke mehiã o.

---

### Afɔɖeɖe 1: Kpɔ egbɔ be Disk ƒe Teƒe si Sɔ

Zcash node blibo (Zebra + Lightwalletd) hiã **300+ GB** ƒe disk teƒe fifia, eye wòyi edzi le tsitsim.

Gbeƒãɖeɖe:

- Zebra blockchain ƒe nyatakakadzraɖoƒe: ~ 260-270 GB
- Lightwalletd ƒe xexlẽdzesiwo: ~ 15-20 GB

#### Nudzraɖoƒe si wokafu:

- **400 GB+** ne wozã server la **ko** na Zcash fexexe
- **800 GB+** ne dɔdzikpɔla hã wɔa BTCPay Server, PostgreSQL, Nginx, kple bubuawo.

> Anyo wu be nàzã SSD/NVMe disk si ƒe ŋutete nye **1 TB**, vevietɔ ne mèɖoe be yeatso nyatakakawo edziedzi o.

---

### Afɔɖeɖe 2: Ðo Nutome ƒe Tɔtrɔwo

Tsɔ nusiwo gbɔna kpe ɖe wò nutome ƒe ɖoɖo ŋu be nàwɔ node ƒe ɖoɖo bliboa ŋudɔ:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Esia alɔ... `zcash-fullnode` kakɛ, si daa evea siaa ɖe yame `zebrad` kple `lightwalletd` le BTCPay Server me.

---

### Afɔɖeɖe 3: Gbugbɔ wɔ Installer la ŋudɔ

`. ./btcpay-setup.sh -i`

Nuŋɔŋlɔa awɔe be:

* Wɔ Docker ƒe nɔnɔmetatawo ƒe kɔpi na Zebra kple Lightwalletd
* Ðo subɔsubɔdɔawo ɖe BTCPay ƒe ƒuƒoƒoa me
* Do ƒome Zcash ƒe kpeɖeŋutɔa kple **nutoa me ** . `lightwalletd` ɣeyiɣi

> **Blockchain ƒe wɔwɔ ɖekae blibo ate ŋu axɔ ŋkeke geɖe**, vevietɔ le VPS dɔdzikpɔla siwo ƒe nunɔamesiwo mesɔ gbɔ o dzi.
> Vaseɖe esime ɖekawɔwɔa wu enu la, fexexe siwo ŋu wokpɔ ta na la manɔ anyi o.


## Kadodo kple External Lightwalletd Node

Zi geɖe la, ɖokuisinɔnɔ blibo mehiã o - eye asitsalawo madi be yewoazã ɣeyiɣi kple disk teƒe atsɔ awɔ Zcash node blibo o. 
Le gɔmedzedzea me la, BTCPay Server doa ka kple dutoƒo `lightwalletd` node be woakpɔ fexexe siwo wokpɔ ta na gbɔ evɔ womaɖe blockchain bliboa ƒe kɔpi o.

Nuwuƒe si woɖo ɖie nye:

`https://zec.rocks:443`

Ke hã, àte ŋu aɖo BTCPay Server be wòado ka kple **gotagome ɖesiaɖe `lightwalletd` node**, abe:

`https://lightwalletd.example:443`

Akpa sia fia alesi woawɔ ema to **Docker kakɛ si wowɔ ɖe ɖoɖo nu** zazã me.

> Ðoɖowɔɖi ƒe kpɔɖeŋu blibo si me nuto ƒe tɔtrɔwo katã le la le [plugin nudzraɖoƒe](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Afɔɖeɖe siwo le ete la ɖe ɖoɖo si le dɔ wɔm suetɔ kekeake fia.

---

### Afɔɖeɖe 1: Wɔ Docker Fragment si wowɔ ɖe ɖoɖo nu

Le wò BTCPayServer dɔwɔwɔ ƒe nuŋlɔɖi me la, wɔ kakɛ ƒe faɛl si nèdi:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Tsɔ nya siwo gbɔna kpee:

```
exclusive:
- zcash
```

The `exclusive` mɔfiame la kpɔa egbɔ be kakɛ ɖeka koe woŋlɔ ɖe edzi (`zcash` le go sia me) ate ŋu anɔ dɔ dzi le ɣeyiɣi ɖeka me.
Esia xea mɔ na ɖoɖowɔɖi ƒe masɔmasɔwo - le kpɔɖeŋu me, màte ŋu awɔ evea siaa o `zcash-fullnode` fragment kple dekɔnu sia gotagome `lightwalletd` kakɛkakɛ aɖe le ɣeyiɣi ɖeka me.
To dzesidede eŋu be `exclusive: zcash`, BTCPay Server awɔ nusi woɖo ɖi la nuwɔametɔe le eɖokui si `zcash-fullnode` kple ememetɔwo `lightwalletd` nugoewo me, si ana nàdo ka kple wò ŋutɔ wò gotagome node boŋ.

---

### Afɔɖeɖe 2: Ðo Nutome ƒe Tɔtrɔwo

Le terminal la me la:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Afɔɖeɖe 3: Ðe External Node Address la gɔme

Ʋu wò `.env` agbalẽ:

`nano .env`

Tsɔ fli si gbɔna kpee, tsɔ nuwuƒe si nètia ɖɔ li URL la:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Àte ŋu azã:

* **dutoƒo node** aɖe, abe `https://lightwalletd.zcash-infra.com`
* Wò ŋutɔ wò ŋutɔ wò node si nèxɔ, si woɖo ɖe vovo tso BTCPay Server gbɔ

> Ne gotagomenuwo `lightwalletd` ne wova zua nusi megali o alo agba si gbɔ eme la, fexexe siwo ŋu wokpɔ ta na la ado kpo nu.
> Le subɔsubɔdɔ veviwo gome la, tia **nuwuƒe si li ke eye woɖo kpe edzi** (abe esi woɖo ɖi ene `zec.rocks`).

> Di be yeawɔ amedzro na ye ɖokui `lightwalletd`?
> Àte ŋu azã... `docker-compose.lwd.yml` tso [Zebra ƒe nudzraɖoƒe](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Nuxlɔ̃ame:** Womeŋlɔ ɖoɖo sia ɖe agbalẽ me le se nu o eye ebia TLS ɖoɖo kple asi, melidzeƒea ɖoɖo ɖe ŋgɔ, kple dzodoƒe ƒe ɖoɖowɔwɔ - wokafui na zãla deŋgɔwo ɖeɖeko.

---

### Afɔɖeɖe 4: Gbugbɔ wɔ Installer la ŋudɔ

`. ./btcpay-setup.sh -i`

BTCPay Server awɔ wò ɖoɖowɔɖi tɔxɛa ŋudɔ eye wòado ka kple esi nèɖo `lightwalletd` node ƒe ƒuƒoƒo.

Tso fifia dzi la, Zcash ƒe kpeɖeŋutɔa azã gotagome nuwuƒe ma hena asitsatsa siwo wokpɔ ta na la gbɔ kpɔkpɔ.


## BTCPay Server ƒe amedzrowɔwɔ le Aƒeme kple Cloudflare Tunnel

Àdi be yeaxɔ Zcash fexexe esime nèle BTCPay Server xɔm ɖe aƒeme mɔ̃ dzi - abe Raspberry Pi 5 alo nutoa me server ɖesiaɖe **si me IP si meʋãna o**? 
Àteŋu atsɔ wò kpɔɖeŋua ɖe go dedie le internet dzi to **Cloudflare Tunnel** zazã me.

Mɔnu sia ƒoa asa na port forwarding eye wòɣlaa wò IP adrɛs ŋutɔŋutɔ ɖe dutoƒo - esime wòle wò server dzi kpɔm to HTTPS dzi.

Ekpena ɖe ŋuwò hã be **woƒoa asa na ga si nàzã ɖe VPS haya ŋu**, si nyo ŋutɔ ne cryptocurrency fexexe nye nusi nàte ŋu awɔ tsɔ wu be wòanye wò dɔwɔƒea ƒe nu vevitɔ.

---

### Afɔɖeɖe 1: De Cloudflare Tunnel la eme

1. Wɔ akɔnta le [cloudflare.com](https://www.cloudflare.com) eye nàtsɔ wò domenyiŋusẽfianu akpe ɖe eŋu.
2. Le wò **aƒeme server** dzi la, de Cloudflare Tunnel:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Tsɔ Cloudflare ɖo kpe edzi:

`cloudflared tunnel login`

Sedede sia aʋu browser ƒe fesre aɖe. Ge ɖe eme eye nàɖe mɔ na wò be nàge ɖe wò domenyiŋusẽfianu la me.
Cloudflare awɔ a `credentials` faɛl si me dzesi le le wò server dzi.

4. Wɔ mɔ̃ yeye aɖe (àte ŋu ayɔ ŋkɔ nɛ `btcpay` alo nu bubu ɖesiaɖe):

`cloudflared tunnel create btcpay`

Esia nana be a `btcpay.json` file si me tunnel ID kple credentials le - àhiãe le afɔɖeɖe si kplɔe ɖo me.

---

### Afɔɖeɖe 2: Wɔ Tunnel Configuration File

Wɔ ɖoɖowɔɖi ƒe agbalẽdzraɖoƒe (ne meli o) eye nàʋu ɖoɖowɔɖi ƒe faɛl la:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Kpe ɖoɖo si gbɔna la ɖe eme:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Numeɖeɖe:

* `tunnel` - ŋkɔ na mɔ̃ si nèwɔ va yi
* `credentials-file` - mɔ si yi dzesi faɛl si wowɔ le `cloudflared tunnel login`
* `hostname` - wò domenyiŋusẽfianu si woŋlɔ ŋkɔ na le Cloudflare (e.g. `btcpay.example.com`)
* `service` - wò BTCPay Server ƒe teƒea ƒe adrɛs (zi geɖe `http://127.0.0.1:80` na Nginx) .

> Cloudflare awɔ ʋuɖoɖo ƒe teƒenɔla dedie ɖe wò nutoa me server dzi, evɔ maɖe wò aƒeme IP ɖe go o.


### Afɔɖeɖe 3: Tsɔ DNS Nuŋlɔɖi kpee na Wò Mɔdodo

Ne èwɔ mɔ̃a vɔ la, zi geɖe la, Cloudflare atsɔ CNAME DNS nuŋlɔɖi akpe ɖe eŋu le eɖokui si** na wò domenyiŋusẽfianu. Ele be wòanɔ ale:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Ne medze le eɖokui si o la, tsɔe kpee kple asi:

1. Yi wò [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Yi **DNS** ƒe akpaa dzi
3. Tsɔ CNAME ƒe nuŋlɔɖi yeye kpee:
   - **Ŋkɔ**: `btcpay`
   - **Taɖodzinu**: `<UUID>.cfargotunnel.com`  
     Àte ŋu akpɔ asixɔxɔ si tututu le wò... `btcpay.json` file alo to duƒuƒu me:
     
     `cloudflared tunnel list`
     
   - **Teƒenɔla ƒe nɔnɔme**: Wowɔe (alilikpo si ƒe amadede nye aŋutiɖiɖi)

> Nuŋlɔɖi sia kpɔa egbɔ be nusiwo katã wobia be... `btcpay.example.com` woɖoa mɔ to Cloudflare Tunnel dzi, si ɣlaa wò IP adrɛs ŋutɔŋutɔ ɖe dukɔa.

---

### Afɔɖeɖe 4: Na Tunnel nawɔ dɔ le System Startup dzi

Be nàna mɔ̃a nawɔ dɔ le eɖokui si le eƒe gɔmedzedze la, dae ɖe wò kɔmpiuta dzi abe system service ene:

`sudo cloudflared service install`

Emegbe nàna subɔsubɔdɔa nawɔ dɔ eye nàdze egɔme:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Kpɔ nɔnɔmea ɖa:

`sudo systemctl status cloudflared`

Ele be nàkpɔ gbedasi aɖe abe `Active: active (running)` kple kpeɖodzi be `btcpay.example.com` le Internet dzi.

> Tso fifia dzi la, mɔ̃a adze egɔme le eɖokui si le gbugbɔgadzedze ɖesiaɖe me, eye wò BTCPay Server la anye esi ŋu dutoƒo ate ŋu age ɖo - melidzeƒea ƒe dɔdɔ manɔmee eye wò IP ŋutɔŋutɔ maɖe ɖe go o.

---

### Afɔɖeɖe 5: Wu BTCPay Server Setup nu

Ne èle BTCPay Server ɖo ge zi gbãtɔ la, ɖo wò domenyiŋusẽfianu hafi nàwɔ ɖoɖowɔɖi ƒe ŋɔŋlɔdzesi la:

`export BTCPAY_HOST="btcpay.example.com"`

Esia kpɔa egbɔ be wozã domenyinyi nyuitɔ ne wole **Nginx ɖoɖowɔɖi** kple **SSL ɖaseɖigbalẽwo** wɔm.

Ne woda BTCPay Server xoxo eye ɖeko nèle mɔ̃a kpem ɖe eŋu:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Ðoɖoa agbugbɔ aɖo configs eye wòawɔ domain yeyea ŋudɔ.
Ele be nàte ŋu age ɖe wò server la me azɔ le:

`https://btcpay.example.com`

> Eɖanye dutoƒonu aɖe zãm nèle o `lightwalletd` alo wò ŋutɔ wò node bliboa, esia mekpɔa ŋusẽ ɖe mɔ̃a dzi o.
> Nusi le vevie koe nye be BTCPay Server le to ɖom `127.0.0.1:80` le nutoa me.


## Zcash Plugin ƒe ɖoɖowɔwɔ le BTCPay Server Web Interface me

> **Ele vevie na fiase geɖe ƒe ɖoɖowo:** 
> Zcash gakotoku si woɖo ɖe afisia nye **global** na kpɔɖeŋua. Fiasewo katã azã gakotoku sia negbe ɖe nèwɔ BTCPay ƒe kpɔɖeŋu vovovowo ko hafi.

Ne ètsɔ wò BTCPay Server ƒe kpɔɖeŋua de dɔwɔwɔ me dzidzedzetɔe vɔ la, ahiã be nàwɔ ɖoɖo vevi aɖewo to admin web interface dzi. 
Nuŋlɔɖi siwo dziɖuɖua ɖo la naa mɔfiame blibowo le Eŋlisigbe me - le afisia la, míazɔ to afɔɖeɖe veviawo me eye míalé fɔ ɖe Zcash ƒe kpeɖeŋutɔ ƒe ɖoɖowɔwɔ ŋu koŋ.

---

### Afɔɖeɖe 1: Ge ɖe Web Interface la me

Yi wò kpɔɖeŋua gbɔ le:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Ŋlɔ wò dɔdzikpɔla ƒe gege ɖe eme kple nyagbe ɣaɣla.
- Ne zi gbãtɔe nye esia nège ɖe eme la, woabia tso asiwò be nàwɔ akɔnta.
- Woade admin mɔnukpɔkpɔwo asi na akɔnta gbãtɔ si nèŋlɔ ŋkɔ na la le eɖokui si.

---

### Afɔɖeɖe 2: De Zcash Plugin la eme

1. Le nuɖuɖu veviawo me la, yi:

`Plugins -> Browse Plugins`

2. Di **Zcash (ZEC)** ƒe kpeɖeŋutɔ. Zã didiƒea ne ehiã.
3. Zi **Install** dzi eye nàɖo kpe edzi.

> Gbugbɔ wɔ dɔ sia na altcoin bubu ɖesiaɖe si nèwɔ dɔ le server ƒe ɖoɖowɔwɔ me.

Le eɖoɖo vɔ megbe la, zi **Gbugbɔ dze Server** dzi be nàgbugbɔ akɔ interface la me kple plugins siwo le dɔ wɔm.


### Afɔɖeɖe 3: Do ka kple Wò Gakotoku to Viewing Key dzi

Ne èda plugin la vɔ la, **Zcash** ƒe akpa yeye aɖe adze le ɖoɖowo ƒe nyawo me.

1. Go to:

`Zcash -> Settings`

2. Kpe wò **Unified Full Viewing Key (UFVK)** - BTCPay akpɔ Unified Address na adzɔxegbalẽvi ɖesiaɖe eye wòade dzesi fexexe siwo wotsɔ takpɔnu siwo gbɔna.

> **De dzesii:** Wodoa alɔ Legacy Sapling kpɔkpɔ safuiwo, gake be nàzã Orchard/Unified Addresses la, ele be nàna **UFVK**.


   Kpɔɖeŋu ƒe ɖoɖo:

`uview184syv9wftwngkay8d...`

3. Ŋlɔ asixɔxɔ aɖe ɖe Block height ƒe akpaa dzi

* **Zi gbãtɔ ƒe ɖoɖowɔwɔ kple gakotoku yeye (nuku ƒe nyagbe yeye):** ŋlɔ Zcash block ƒe kɔkɔme si li fifia (àteŋu akpɔe le 3xpl.com/zcash) - esia nana be scanning gbãtɔ nawɔ kabakaba.
* **Tɔtrɔ le server ɖeka dzi tso domenyinu Sapling-only ɖoɖo me yi Unified Addresses / Orchard:** gblẽ agble sia ɖi ƒuƒlu.
* **Wò fiase ʋuʋu yi server yeye si si gakotoku/UFVK ma ke le:** ne èdi be yeaŋlɔ dzigbe ƒe kɔkɔme - si nye wò fiase ƒe nudɔdɔ gbãtɔ si woxe fe na ƒe kɔkɔme si gogo (tsɔ nudɔdɔ ƒe ŋkekea sɔ kple 3xpl be nàɖe scan la dzi akpɔtɔ). Ne mèka ɖe edzi o la, gblẽe ɖi ƒuƒlu.

> Menye gakotokuwo katãe doa alɔ **Unified Full Viewing Key (UFVK)** ƒe dɔdɔ haɖe o. 
> Tiatia siwo wokafu: 
> – [**YWallet**](https://ywallet.app/installation)  
> – [**Zingo! Gakotoku (trɔtrɔ na PC)**](https://zingolabs.org/)  
> Le dɔwɔnu eveawo siaa me la, di UFVK ƒe dɔdɔ le backup/export ƒe akpaa dzi.

Safui siawo doa alɔ **adrɛs ƒe tɔtrɔ le eɖokui si**, si gɔmee nye:
- Asisi ɖesiaɖe xɔa fexexe ƒe adrɛs **tɔxɛ**
- Èkpɔ **ɖeka, ɖeka** ƒe dadasɔ

Àte ŋu akpɔ nusiwo sɔ ƒe xexlẽdzesi si keke ta wu le [ZecHub -> Gakotokuwo me](https://zechub.wiki/wallets).

Ne wonya kpe agbleawo katã ɖo ko la, zi **Dzra Ðo** dzi.

---

### Do Wò ZEC Fexexe ƒe Sisi Do kpɔ

Míele kafuwòm - wò Zcash gakotokua do ƒome kple BTCPay Server fifia.

Mina míaƒu du dodokpɔ aɖe:

1. Go to:

`Invoices -> Create New`

2. Wɔ dodokpɔ ƒe adzɔxegbalẽvi na ga sue aɖe le ZEC me.
3. Ðo ga ɖa tso **gakotoku bubu** (menye esi do ƒome kple BTCPay o).
4. Ne wonya de dzesi asitsatsa la ko la, adzɔxegbalẽvi ƒe axaa aɖe azãɖuɖu si wokpɔna afia.
5. Kpɔe ɖa be adzɔxegbalẽvi ƒe nɔnɔme trɔna zua **Woxee**.

Ne nusianu wɔ dɔ - èle klalo be yeatsɔ ZEC ƒe fexexewo ade yeƒe nyatakakadzraɖoƒe to API alo CMS ƒe kpeɖeŋutɔ zazã me.



## BTCPay Server ƒe Ðekawɔwɔ Kple Wò Nyatakakadzraɖoƒea

Ne wonya tsɔ wò Zcash gakotokua do ka kple BTCPay Server ko la, àte ŋu atsɔ fexexe ƒe ɖoɖoa awɔ ɖeka kple wò nyatakakadzraɖoƒea. 
Mɔ geɖewo li siwo dzi woato awɔ esia - tso API ƒe yiyi tẽ dzi va ɖo plugins siwo sɔ na zazã na CMS ƒe mɔ̃ xɔŋkɔwo dzi.

---

### Tiatia Siwo Wowɔna Ðekae

- **API ƒe Ðekawɔwɔ** 
  Enyo ŋutɔ na nyatakakadzraɖoƒe alo ɖoɖo siwo wowɔ ɖe ɖoɖo nu siwo me CMS mele o. 
  Enaa ŋusẽ blibo wò ɖe adzɔxegbalẽvi wɔwɔ, fexexe yometiti, kple nyatakakawo dzi - wo katã le wò ŋutɔ wò ŋgɔdonya kple susu me. 
  Ebia ɖoɖowɔɖi ŋuti sidzedze veviwo, eyata wò dɔwɔƒe si kpɔa dɔ sia gbɔ nyuie wu.

- **CMS ƒe Dɔwɔnuwo** 
  Woateŋu akpɔe na mɔ̃wo abe **WooCommerce**, **PrestaShop**, kple bubuawo. 
  Plugin siawo ɖea mɔ na wò be nàxɔ fexexe le miniti ʋee aɖewo ko me - coding mehiã o.

- **Fexexe ƒe Abɔta alo Iframe** 
  Mɔnu bɔbɔetɔ kekeake. 
  Ede blibo na axa siwo dzi nàɖo, ame ŋutɔ ƒe nyatakakadzraɖoƒewo, alo nyatakakadzraɖoƒe ɖesiaɖe si dzi nèdi be yeade nudzɔdzɔ ƒe kadodo alo gaxɔgbalẽvi aɖe ko le.

---

### API ƒe Ðekawɔwɔ

Ne èle mɔ̃ si wowɔ ɖe ɖoɖo nu zãm (alo CMS aɖeke mele asiwò kura o) la, API lae nye tiatia nyuitɔ. 
Enaa nète ŋu trɔna ɖe nɔnɔmewo ŋu bliboe: àte ŋu awɔ adzɔxegbalẽviwo, akpɔ woƒe nɔnɔme, axɔ nyatakakawo, eye nàkpɔ ŋusẽ ɖe zãla ƒe nuteƒekpɔkpɔ dzi bliboe.

> De dzesii: CMS ƒe kpeɖeŋutɔ aɖewo gɔ̃ hã zãa API le ʋuƒoa te, eyata zi geɖe la, API safui wɔwɔ nyea **afɔɖeɖe gbãtɔ si wobia**, metsɔ le wò ƒoƒo ɖekae ƒe mɔnu me o.

Afɔɖeɖe si kplɔe ɖo: wɔ API safui na wò fiasea eye nàdze [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) be nàtu wò ɖekawɔwɔ ɖo.


### API Safui aɖe wɔwɔ

Be nàtsɔ BTCPay Server awɔ ɖeka kple wò nyatakakadzraɖoƒe alo dɔwɔnua la, ahiã be nàwɔ API safui.

1. Ge ɖe BTCPay Server me eye nàʋu **zãla ƒe menu** (dzigbe-ɖusime dzogoe)
2. Yi **API Safuiwo** gbɔ.
3. Zi **Wɔ API safui yeye** dzi.
4. Ŋlɔ ŋkɔ na wò safuia
5. Le **Mɔɖeɖewo** ƒe akpaa dzi la, na:
   - `Can create invoice`
   - `Can view invoice`
   - *(Le tiatia me)* `Can modify store settings` - ne èhiã fiase ƒe ɖoɖo nu dzikpɔkpɔ ko

6. Zi **Dzra** dzi. Wò ŋutɔ wò API safui adze - kɔpi eye nàdzrae ɖo dedie.

> Safui sia naa mɔnukpɔkpɔ ame be wòakpɔ wò fiasea ƒe gaxɔgbalẽviwo. 
> Mèga **mae** le dutoƒo alo ɖee ɖe go le client-side code me o.

---

### Kpɔɖeŋu: Invoice wɔwɔ to API dzi

**Nuwuƒe:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Nubiabia ƒe ŋutilã:**

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

Àxɔ JSON nu kple:

* `invoiceId`
* Fexexe ƒe URL si nàte ŋu ade wò nyatakakadzraɖoƒea alo aɖo ɖe asisi la

Kpɔ nuŋlɔɖi bliboa:
[Greenfield API – Wɔ Adzɔxegbalẽvi](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Nyatakakadzraɖoƒe ƒe Ðoɖowɔwɔ (Ne èdi) .

Be nàxɔ nyatakakawo le ɣeyiɣi ŋutɔŋutɔ me ne adzɔxegbalẽvi ƒe nɔnɔmewo trɔ (e.g. ne woxɔ fetu aɖe):

1. Yi wò fiase ƒe ɖoɖowo gbɔ -> **Webhooks**
2. Tsɔ wò megbenyawo ƒe nuwuƒe si akpɔ egbɔ la ƒe URL kpee `POST` biabia tso BTCPay Server gbɔ
3. BTCPay aɖo nyatakakawo ɖa le eɖokui si ne woxe adzɔxegbalẽvi alo eƒe ɣeyiɣia wu enu

Woɖe webhook payloads kple retry logic me le [official webhook documentation](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Kpɔɖeŋu ƒe ƒoƒo ɖekae li na ɖoɖowɔɖi gbe vovovowo le BTCPay docs kple GitHub nudzraɖoƒewo.



### CMS ƒe Ðekawɔwɔ

BTCPay Server doa alɔ plugins na nyatakakawo dzikpɔkpɔ ƒe ɖoɖo xɔŋkɔwo (CMS). 
Ðekawɔwɔ si tsi wu eye wozãnɛ le afisiafi enye kple **WordPress + WooCommerce**, si wɔe be wònɔa bɔbɔe be woaxɔ ZEC ƒe fexexe **maŋlɔ kɔpi o**.

---

#### WooCommerce (Nyawo ƒe Nyadzɔdzɔdɔwɔƒe) .

BTCPay Server doa alɔ WooCommerce ƒe kpeɖeŋutɔ aɖe le se nu.

Afɔɖeɖe siwo woawɔ atsɔ awɔ ɖeka:

1. De **BTCPay for WooCommerce** ƒe kpeɖeŋutɔ tso WordPress kpeɖeŋutɔ ƒe agbalẽdzraɖoƒe alo tso GitHub.
2. Le wò WordPress admin panel me la, yi:

`WooCommerce -> Settings -> Payments`

3. Di **BTCPay** le xexlẽdzesiawo me eye nàzi **Set up** dzi.
4. Ŋlɔ wò BTCPay Server URL eye nàwɔ ɖe mɔɖeɖe ƒe mɔfiamewo dzi 
   (wokafu API safui dzidzi le eɖokui si)
5. Na fexexemɔnua nawɔ dɔ eye nàdzra wò ɖoɖowo ɖo

> Mɔfiame tsitotsito, video ŋuti nufiamewo, kple kuxiwo gbɔ kpɔkpɔ ƒe mɔfiamewo le plugin ƒe nuŋlɔɖiwo me.

Àkpɔ CMS ƒe ƒoƒo ɖekae ƒe tiatia bubuwo hã le BTCPay ƒe nuŋlɔɖiwo ƒe akpa ma ke me.

---

### Fexexe ƒe Abɔta alo Iframe (CMS alo API Mehiã o)

Ne mèzãa CMS o eye mèdi be yeawɔ dɔ kple APIwo o la, mɔ bɔbɔetɔ si dzi nàto axɔ ZEC ƒe fexexe enye be **de fexexe ƒe kadodo alo widget** ɖe wò nyatakakadzraɖoƒea tẽ.

Mɔnu sia sɔ nyuie na:

- Axa siwo dzi woɖoa amewo ɖo
- Portfolio ƒe nyatakakadzraɖoƒewo
- Blogwo alo axa siwo meʋãna o
- Dɔ siwo me megbenyawo ƒe dɔwɔƒe mele o

---

#### Tiatia 1: Fexexe ƒe Abɔta (Kadodo) .

1. Le BTCPay Server me la, wɔ adzɔxegbalẽvi kple asi le **Adzɔxegbalẽviwo** ƒe akpaa dzi
2. Kpɔ fexexe ƒe kadodoa ƒe kɔpi, e.g.:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Tsɔ kadodoa kpe ɖe wò HTML ŋu:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Tiatia 2: Adzɔxegbalẽvi si Wotsɔ De Eme (Iframe) .

Ne èdi be yeaɖe gaxɔgbalẽvia afia le wò nyatakakadzraɖoƒea tẽ la, zã iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Àteŋu awɔ atsyã na abɔta alo iframe nugoe la be wòasɔ kple wò nyatakakadzraɖoƒea ƒe nɔnɔme - BTCPay Server ɖe mɔ ɖe tanya siwo trɔna le adzɔxegbalẽvi ƒe axaa ŋu.

## Nyanuwuwuw

Mɔfiame sia didi - gake gɔmeɖoanyi ƒe akpa siwo le Zcash fexexe ƒe ƒoƒo ɖekae kple BTCPay Server koe wòƒo nu tsoe.

BTCPay Server ƒe ŋgɔdonya naa dɔwɔwɔ geɖe wu esiwo míeɖe fia le afisia. Dzɔgbenyuietɔe la, UI la le gbegbɔgblɔ geɖe me (Russiagbe hã le eme), si wɔe be wòle bɔbɔe be woaku nu me ahadoe kpɔ ayi ŋgɔe.

BTCPay nye dɔwɔnu si te ŋu trɔna bɔbɔe ŋutɔ. Ate ŋu:

* Xɔ fiase geɖe siwo le wo ɖokui si le kpɔɖeŋu ɖeka me
* Ðe akpa siwo wowɔ ɖe ɖoɖo nu kple mɔɖeɖewo gɔme na ƒuƒoƒoa me tɔwo - tso nudɔdɔ kpɔkpɔ ɖeɖeko dzi va ɖo admin bliboa dzi
* Zã wò ŋutɔ wò domenyiŋusẽfianuwo kple adzɔnu ƒe dzeside
* Ðo webhooks, fallback gakotokuwo, kple Tor ƒe mɔɖeɖe gɔ̃ hã
* Trɔ asi le ɖoɖo deŋgɔwo abe adzɔxexe ƒe sewo, asiɖeɖe le nu ŋu ƒe kɔdawo, gaxɔgbalẽviwo ƒe axawo ƒe tɔtrɔ, fexexemɔnu ƒe mɔxexeɖedɔa nu, kple bubuwo ŋu

Wotu BTCPay abe mɔnu si woate ŋu azã faa ɖe fexexe ƒe dɔwɔƒe siwo le titina teƒe ene. Ne èle didim be yeaxɔ ZEC ƒe fexexe na ame ŋutɔ evɔ domenɔla aɖeke mele ye si o la, ke mɔnu sia sɔ na wò ŋutɔ be nàlé ŋku ɖe eŋu.

Míele didim be nàkpɔ dzidzedze le BTCPay ƒe lãwo ƒe agbenɔnɔ me dzodzro me eye nàna wò fexexe nazu tɔwò vavã.

## Nunɔamesiwo

* [BTCPay Server ƒe Nyatakakadzraɖoƒe](https://btcpayserver.org/)
* [BTCPay ƒe Nyabiasewo](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub Nudzraɖoƒe](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Dɔwɔƒe ƒe Mainnet Demo](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash ƒe Dɔwɔnu na BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Plugin ƒe Ðoɖowɔɖi ƒe Mɔfiame](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Tɔtrɔ zcash-lightwalletd.custom.yml Kpɔɖeŋu](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker Kpa Faɛl (Zebra) .](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API ƒe Nuŋlɔɖi Veviwo (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Wɔ Alilikpo me Mɔdodo aɖe](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash Gakotoku ƒe Ðoɖowɔɖi (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Kekeli ƒe gakotoku le Raspberry Pi 5 (ZecHub) dzi](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
