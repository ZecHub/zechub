# BTCPay Server pẹlu Atilẹyin Zcash: Itọsọna fifi sori ẹrọ ati isopọpọ ni kikun

BTCPay Server allows online businesses to accept cryptocurrency payments directly, without intermediaries or custodians. This guide walks you through the complete process of setting up BTCPay Server with native support for Zcash shielded payments.

> Àkọsílẹ̀ yìí dá lórí bí o ṣe lè fi Zcash sínú BTCPay Server rẹ. 
> O ṣe atilẹyin awọn iṣeto mejeeji ** full node (Zebra) ** ati ** lightwalletd-based setups **.

---

## Àkópọ̀ Àwọn Ohun Tó Wà Nínú Ìwé Yìí

- [Kí nìdí lo BTCPay Server pẹlu Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Báwo ni BTCPay Server ṣe ń ṣiṣẹ́](#How-BTCPay-Server-Works)
- [Ibo La Ti Ń Fi Owó Pa Mọ́? Ta Ló Ń Ṣàkóso Àwọn Kọ́kọ́rọ́ Àdáni?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Bawo ni lati Ṣeto BTCPay Server fun gbigba Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Gbigba BTCPay Server pẹlu atilẹyin Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Running Your Own Zcash Full Node (Zebra + Lightwalletd) ] [Ṣíṣiṣẹ Zcash Rẹ Ni Gbogbo Nọ́ọ̀dù]](#Running-Your-Own-Zcash-Full-Node)
  - [Connecting to an External lightwalletd Node (Custom Configuration)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Gbigba BTCPay Server ni Ile pẹlu Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Ṣiṣeto ohun itanna Zcash ni wiwo wẹẹbu BTCPay Server](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Ṣíṣepọ BTCPay Server pẹ̀lú Ìkànnì Rẹ](#Integrating-BTCPay-Server-with-Your-Website)
  - [Ìkójọpọ API](#API-Integration)
    - [Ṣídá kókó API kan]](#Generating-an-API-Key)
    - [Àpẹẹrẹ: Ṣiṣẹda Invoice nipasẹ API]](#Example-Creating-an-Invoice-via-API)
    - [Lífi Àpótí Ìdánwò Orí Íńtánẹ́ẹ̀tì Ṣiṣẹ́]](#Setting-Up-a-Webhook-Optional)
  - [Ìkójọpọ CMS](#CMS-Integration)
  - [Bọtini Ìsanwó tàbí Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Ìparí Àlàyé]](#Conclusion)
- [Àwọn ohun àmúṣọrọ̀](#Resources)


---

## Kí nìdí lo BTCPay Server pẹlu Zcash

Àwọn oníṣòwò orí ayélujára ti ń gba owó orí. Ó yára, ó kárí ayé, ó sì ń ṣiṣẹ́ láìsí báńkì. Èyí ń ṣe àwọn oníṣòjà àti àwọn oníbàárà láǹfààní. Àmọ́, ohun pàtàkì kan wà tí ọ̀pọ̀ èèyàn ò kíyè sí.

Nigbati o ba n gbe aṣẹ kan, alabara maa n pese alaye ti ara ẹni: orukọ, adirẹsi gbigbe, ati nọmba foonu. Ti a ba ṣe isanwo nipa lilo blockchain gbangba - bii Bitcoin, Ethereum, tabi awọn owo iduroṣinṣin lori Ethereum tabi Tron - idunadura naa di mimọ nigbagbogbo fun itupalẹ.

Ẹnikẹ́ni, kódà láìmọ ohun tí wọ́n pàṣẹ fún, lè:

- wo ìgbà tí wọ́n san owó náà àti iye tó jẹ́ 
- láti mọ ibi tí owó náà ti wá àti ibi tí wọ́n ti lọ 
- so adirẹsi cryptocurrency pọ̀ mọ́ ẹni gidi kan tí ó bá jẹ́ pé ó ní ìsopọ̀ kankan (fún àpẹrẹ, imeeli tí ó tú jáde tàbí orúkọ ọkọ̀ òkun)

Èyí túmọ̀ sí pé ohun kan ṣoṣo téèyàn bá rà lè jẹ́ ká mọ gbogbo bí ọ̀rọ̀ ìṣúnná owó oníbàárà ṣe rí.

ó sì tún ń ṣiṣẹ́ lọ́nà kejì pẹ̀lú. bí àdírẹ́sì oníṣòwò kan bá ti wà lórí ẹ̀rọ-ìpèsè, wọ́n á di ẹni tí a fi hàn. àwọn alátakò àti àwọn alábòójútó tí kì í ṣe ara wọn lè tọpinpin iye owó tí wọ́ n san, ìgbòkègbodò àwọn olùpèsè àti bí ètò ìṣòwò ṣe ń lọ.

### Apapo BTCPay Server ati Zcash le yanju eyi.


BTCPay Server jẹ eto ọfẹ ati ti ko ni idojukọ fun gbigba awọn sisanwo cryptocurrency. 
Kò sí ìsọ̀rí-ìsanwó kankan, kò sì ní owó kankan. Gbogbo owó tó bá ń wọlé ni wọ́n máa ń kó sínú àpamọ́ oníṣòwò náà. 
Eyi le jẹ apamọwọ ti ara ẹni tabi iṣeto multisig laarin agbari kan.

Olùpèsè náà ń bójú tó àwọn ìgbòkègbodò ìfọ̀rọ̀wérọ̀:

- n ṣe adirẹsi alailẹgbẹ fun aṣẹ kọọkan 
- ó máa ń tọpinpin ìgbà tí wọ́n bá gba owó, ó sì máa ń so kókó náà mọ́ ìfilọ̀ náà 
- ó máa ń fúnni ní ìwé-ìrírí àti ìsọfúnni 
- ó pèsè àlàfo ìsanwó fún oníbàárà 

Ohun gbogbo nṣiṣẹ labẹ iṣakoso ti awọn oniwun itaja, lai gbẹkẹle awọn iṣẹ ẹni-kẹta.

Zcash jẹ cryptocurrency ti a kọ lori awọn ẹri-imọ-nọmba. O ṣe atilẹyin awoṣe iṣowo ikọkọ ni kikun. 
Nigbati o ba nlo awọn adirẹsi ideri (ti a npe ni addresses), oluranlowo, olugba, ati iye iṣowo ko han lori blockchain.

Fun awọn ile itaja ori ayelujara, eyi tumọ si:

- Olùtajà lè parí ìsanwó náà láìfi ìtàn ìṣúnná owó wọn hàn 
- Olùtajà náà gba owó láìfi àdírẹ́sì wọn, iye tí wọ́n tà, tàbí ọ̀nà tí wọ́n gbà ṣe ọjà náà hàn 
- Kò sí olùṣàmúlò àjèjì tó lè so owó náà mọ́ àṣẹ tàbí àwọn ìsọfúnni oníbàárà

### Àpẹẹrẹ Tó Ṣeé Tẹ̀ Lé

Olumulo kan gbe aṣẹ kan ki o yan Bitcoin tabi USDT bi ọna isanwo. 
Wàá rí àdírẹ́sì tí wọ́n fi ń sanwó lórí ìkànnì náà, wàá sì rí iye tó yẹ kó o san. 
Lẹ́yìn tí wọ́n bá ti sanwó náà tán, a máa ń tọ́jú àdírẹ́sì yìí sínú ẹ̀rọ alágbèéká, á sì wá di ti gbogbo èèyàn. 
Olùdarí nìkan nílò láti so àṣẹ kan pọ̀ mọ́ adirẹsi náà láti rí ìjìnlẹ̀ àtúnyẹ̀wò pẹ̀lú gbogbo ìtàn ìsòwò rẹ̀.

Wàyí o, ẹ fojú inú wò ó pé ohun kan náà ló ń ṣẹlẹ̀ sí Zcash. 
BTCPay Server máa ń dá adirẹsi ààbò sílẹ̀. Olùtajà á fi owó náà ránṣẹ́. 
Láti ojú ìwòye blockchain, kò sí nǹkan tó ṣẹlẹ̀. Kò sí ìsọfúnni fún gbogbo ènìyàn láti ṣàyẹ̀wò. 
Olùpèsè náà gba ìdánilójú, ó so ó mọ́ àṣẹ náà, ó sì parí ìgbésẹ̀ náà.

Fún ẹnikẹ́ni tó bá wà níta, ó dà bí ẹni pé kò sí nǹkan kan tó ṣẹlẹ̀. 
Ọ̀rọ̀ tó bọ́gbọ́n mu ni pé kí ilé ìtajà náà àti oníbàárà rẹ̀ jọ jíròrò, bó sì ṣe yẹ kó rí nìyẹn.

Ìdáhùn yìí kò fi ètò ìdánilójú tàbí ìmúlò ṣe pàṣán. 
Ohun gbogbo ń ṣiṣẹ́ bákan náà pẹ̀lú àwọn owó-ìpamọ́ mìíràn, kìkì láìsí ewu dída ìsọfúnni jáde.



## Bawo ni BTCPay Server ṣe n ṣiṣẹ

BTCPay Server n ṣiṣẹ gẹgẹ bi afara ṣiṣe sisanwo laarin pẹpẹ e-commerce rẹ ati blockchain. Eyi ni bi iṣan naa ṣe n ṣiṣẹ:

1. **Awọn onibara fi ohun ibere** lori rẹ aaye ayelujara (fun apẹẹrẹ WooCommerce, Magento, tabi eyikeyi Syeed pẹlu BTCPay isopọmọ).

2. ** Ile itaja naa beere fun iwe-iṣowo owo sisan kan** lati BTCPay Server. Olùgbéejáde náà ṣe àtúnṣe iwe-ẹri kan pẹlu:
   - Iye aṣẹ náà
   - Àkọsílẹ̀ àkókò
   - A Zcash Unified Address (UA) - e.g., `u1...` - tí ó ní agbóhùnmáwòrán Orchard (tí a fi ààbò ṣe) nínú gẹ́gẹ́ bí ìpilẹ̀ṣẹ̀.

3. **Awọn onibara ri awọn owo oju-iwe** ati ki o rán ZEC si awọn ti pese adirẹsi.

4. **BTCPay Server n ṣetọju blockchain**, ṣayẹwo isanwo naa lodi si:
   - Iye tí a retí
   - Adirẹsi ibi tí wọ́n ti gbà á
   - Àmì àkókò tí wọ́n fi sàmì sí fáìlì náà

5. **Nígbà tí wọ́n bá ti rí ìnáwó náà tí wọn sì fọwọ́ sí i**, BTCPay á sọ fún ilé ìtajà náà.

6. **Awọn onibara gba a owo ijẹrisi.** Optionally, awọn olupin le firanṣẹ a gba nipasẹ imeeli.

Gbogbo ìgbésẹ̀ yìí ló máa ń wáyé lọ́nà àkànṣe, láìsí alárinà tàbí olùtọ́jú. 
BTCPay Server kì í ní owó kankan - ó kàn ń so ètò ìfilọ́lẹ̀ pọ̀ mọ́ blockchain lọ́nà ààbò àti ní ìkọ̀kọ̀.
## Ibo Ni Wọ́n Ti Ń Fi Owó Pa Mọ́?

BTCPay Server kì í ṣe àpòòwé, kò sì nílò kókó ìkọ̀kọ̀. 
Gbogbo owó lọ tààràtà sí àpamọ́ oníṣòwò. Ààbò ni a rí i dájú nípa lílo ẹ̀rọ-ìmọ̀lé tí ó dá lórí wíwo kókó.

### Bí Ó Ṣe Ń Ṣiṣẹ

- ** A ti dá àpamọ́ owó náà sílẹ̀ ṣáájú.** 
  Oniṣowo nlo apamọwọ Zcash ti o ṣe atilẹyin awọn bọtini wiwo - gẹgẹbi [YWallet](https://ywallet.app/installation) tàbí [Zingo!](https://zingolabs.org/).  
  Àtòjọ tó kún rẹ́rẹ́ wà ní [ZecHub.wiki](https://zechub.wiki/wallets).

- **BTCPay Server ń so pọ̀ nípasẹ̀ kókó àwòwòwò.** 
  A view bọtini ni a ** ka-nikan bọtini **: o le ṣe awari wọle owo ati ki o ṣẹda titun gbigba awọn adirẹsi, 
  ṣùgbọ́n kò lè ná owó. Olùgbàṣe náà kò fi àwọn ọ̀rọ̀-ìmọ́ tàbí kókó ìkọ̀kọ̀ pamọ́.

- **Awọn data blockchain ti wa ni wiwọle nipasẹ a `lightwalletd` olùrànlọ́wọ́.** 
  O le lo a gbangba node bi `https://zec.rocks`, tàbí kó o máa dá ṣiṣẹ́ `Zebra + lightwalletd` ìdìpọ̀ fún ipò ọba aláṣẹ kíkún.

- **Ohun tí a bá pàṣẹ máa ń ní àdírẹ́sì kan ṣoṣo.** 
  Awọn bọtini wiwo gba olupin laaye lati fa awọn adirẹsi Zcash ti o ni aabo tuntun fun gbogbo iwe-owo, 
  ó máa ń jẹ́ kí wọ́n lè tọpinpin ìsanwó tí kò léwu, kò sì ní jẹ́ káwọn èèyàn lo àdírẹ́sì náà lẹ́ẹ̀kan sí i.

- **O ní àṣẹ lórí owó náà.** 
  Kódà bí wọ́n bá ṣe àdàkàdekè sí àwọn ohun èlò náà, kò sẹ́ni tó lè jí owó rẹ - ìsọfúnni nípa ìsanwó nìkan ló lè fara hàn.

Àwòrán yìí ya àwọn ohun èlò ìkọ́lé kúrò lára àwọn ohun ìní tí wọ́n ń darí. 
O le ṣe imudojuiwọn, gbigbe, tabi tun fi sori ẹrọ BTCPay Server laisi fifi eyikeyi awọn owo si eewu.

## Bawo ni lati Ṣeto BTCPay Server fun Gbigba Zcash

Ninu awọn abala ti tẹlẹ, a ṣalaye bi BTCPay Server ṣe n ṣiṣẹ pẹlu Zcash ati idi ti o ṣe pataki fun awọn sisanwo fifipamọ aṣiri. Bayi o to akoko lati gba ọwọ lori.

Àwọn nǹkan bíi mélòó kan ló máa pinnu irú ibi tó o máa lọ:

- Ǹjẹ́ o ti ní àpẹẹrẹ BTCPay Server?
- Ṣe o fẹ lati lo lightwalletd ti gbogbo eniyan tabi ṣiṣe akopọ kikun tirẹ?
- Ṣé server náà yóò ṣiṣẹ lórí VPS tàbí ní ilé?

Orí yìí ń bo gbogbo ìṣẹ̀lẹ̀ ìṣètò tí ó wà lọ́wọ́lóde - láti ìtòlẹ́sẹẹsẹ tí ó kéré jù lọ títí dé ìmúṣẹ láìsí ìdìbò kankan.

A óò jíròrò àwọn kókó wọ̀nyí:

- Bii o ṣe le gbe ohun gbogbo lati ibẹrẹ lori VPS, pẹlu akopọ kikun (Zebra)
- Bii o ṣe le ṣiṣẹ BTCPay Server ni ile lakoko ti o tọju IP rẹ farapamọ nipa lilo ** Cloudflare Tunnel **
- Bii o ṣe le mu ati tunto atilẹyin Zcash laarin wiwo wẹẹbu BTCPay Server
- Bii o ṣe le ṣepọ BTCPay pẹlu oju opo wẹẹbu rẹ tabi itaja ori ayelujara


## Gbigba BTCPay Server pẹlu atilẹyin Zcash

Jẹ ki a tẹsiwaju si iṣeto gangan. Ni apakan yii, a yoo fi sori ẹrọ BTCPay Server pẹlu atilẹyin Zcash - boya lori VPS tuntun tabi nipa fifi atilẹyin ZEC kun si apẹẹrẹ ti o wa tẹlẹ.

Ti o ba ti ni BTCPay Server ti nṣiṣẹ tẹlẹ (fun apẹẹrẹ fun BTC tabi Lightning), o ko nilo lati tun ohun gbogbo ṣe - o kan mu ohun itanna ZEC ṣiṣẹ.

A yoo rin nipasẹ orisirisi awọn iṣeto, lati kere setups lilo a gbangba `lightwalletd` kókó sí àwọn ohun èlò tí ó jẹ́ olómìnira ní kíkún pẹ̀lú kókó rẹ. 
Aṣayan ti o dara julọ da lori ipo olupin rẹ ati iye ominira ti o fẹ lati inu amayederun ita.

> Àkọsílẹ̀ àfikún: 
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> ** Ìkìlọ̀ - àpò kan fún ẹ̀dà kọ̀ọ̀kan:** 
> Àwápá Zcash ńlo **one shared wallet** káàkiri **all stores** nínú àpẹẹrẹ BTCPay. 
> Ti o ba gbalejo ọpọlọpọ awọn ile itaja ominira lori apẹẹrẹ kan, wọn yoo pin apamọwọ Zcash kanna. 
> Lo àwọn ẹ̀dà tó yàtọ̀ tí o bá nílò ìyàsọ́tọ̀ àpamọ́wọ́ tó le.

---

### Àtòjọ VPS tí a dábàá

Ṣaaju ki o to fi sori ẹrọ, rii daju pe o ni:

- VPS kan pẹlu **Ubuntu 22.04+**
- Orukọ ìkápá tí ó tọka sí adirẹsi IP ààrò rẹ (nípasẹ̀ DNS)
- `git`, `docker`, àti `docker-compose` tí wọ́n fi sípò
- SSH ìwífún sí àwọn ìránṣẹ́

---

## Mímúra Serveri Rẹ sílẹ̀ (ìpín tí a fi pamọ́)

<details>
  <summary>Click to expand</summary>

Lati gbe BTCPay Server pẹlu atilẹyin Zcash, iwọ yoo nilo awọn atẹle:

### 1. VPS pẹlu Ubuntu 22.04 tabi tuntun

A dábàá pé kí o lo ìfiwéra tí ó kéré jùlọ ti Ubuntu Server 22.04 LTS. 
Ẹnikẹ́ni tó bá ń pèsè VPS tí ó ní àdírẹ́sì IP tí a yà sọ́tọ̀ yóò ṣiṣẹ́. 

**Àwọn ohun tí ó kéré jù lọ tí a nílò**: 
- 2 àwọn ẹ̀yà CPU 
- 4 GB RAM 
- 40 GB àyè disk 

Ìtòlẹ́sẹẹsẹ yìí tó bí o bá ń lo lightwalletd fún Zcash. 
Ti o ba gbero lati ṣiṣẹ ** kikun Zcash node **, iwọ yoo nilo ** o kere ju 300 GB ** ti aaye disk ọfẹ.

---

### 2. Orukọ ìkápá tí ó tọka sí ààrò rẹ

Ninu awá" n DNS olupese ká dasibodu, á1£áo1da a `A` àkọsílẹ̀ fún ìsókè àkànṣe 
(e.g. `btcpay.example.com`) ti o tọka si adirẹsi IP VPS rẹ. 

A ó lo ìkápá yìí láti wọlé sí BTCPay Server láti inú aṣàwákiri 
àti láti dá ẹ̀rí SSL sílẹ̀ lóòrèkóòrè nípasẹ̀ Let's Encrypt.

---

### 3. SSH ìwífún sí àwọn server

Lati fi BTCPay Server sori ẹrọ, o gbọdọ sopọ si VPS rẹ nipasẹ SSH. 
Láti orí òpó rẹ, tẹ̀lé:

`ssh root@YOUR_SERVER_IP`

Ti o ba lo macOS, Linux, tabi WSL lori Windows, SSH ti wa tẹlẹ ninu ebute naa.
Ní orí Windows, lo SSH oníṣe bíi PuTTY.

---

### 4. Fi Git, Docker, ati Docker Kọ sori ẹrọ

Lẹ́yìn tí o bá ti so pọ̀ nípasẹ̀ SSH, ṣe àtúnṣe àwọn ìdìpọ̀ ètò rẹ kí o sì fi àwọn ohun èlò tí ó yẹ sínú rẹ:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Lori Ubuntu 22.04 ati tuntun, `docker-compose` kò ní sí àyè fún lílo oògùn APT.
> Ìdìpọ̀ tí a dábàá ni `docker-compose-plugin`, tí ó pèsè àwọn `docker compose` àṣẹ (kíyèsí àlàfo dípò ìsọ̀rí).

Àyíká ààrò rẹ ti ṣetan báyìí fún gbígbé BTCPay Server kalẹ̀.

</details>

---

### Ìgbésẹ̀ 1: Ṣe Àdàkọ Àpamọ́ náà

Ṣẹda itọsọna iṣẹ kan ki o ṣe igbasilẹ BTCPay Server Docker deployment:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Igbesẹ 2: Àwọn Àyíká Ìyípadà Ètò Àtijọ

Yípò `btcpay.example.com` pẹlu agbegbe rẹ gangan:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Ti o ba gbero lati fi Monero tabi Litecoin kun nigbamii, o le ṣafikun wọn bayi:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

O le fi owo tuntun kun nigbakugba nipa gbigbe awọn oniyipada ti o yẹ ati ṣiṣatunkọ iwe afọwọkọ iṣeto:

`. ./btcpay-setup.sh -i`

Fun itọsọna yii, a yoo fojusi lori **Zcash nikan**.

---

### Ìgbésẹ̀ 3: Ṣiṣẹ́ Ẹ̀rọ-ìfiwọlé náà

Ṣiṣẹ́ ìkọ̀wé ìmúrasílẹ̀ láti kọ́ àti ṣíṣẹ̀ǹpútà alágbàṣe:

`. ./btcpay-setup.sh -i`

Awọn iwe afọwọkọ yoo fi sori ẹrọ dependencies, ṣẹda awọn `docker-compose.yml`, bẹrẹ awọn iṣẹ, ati tunto `systemd`.
Ó máa gba nǹkan bí ìṣẹ́jú márùn-ún.

Lẹ́yìn tí ó bá parí, BTCPay Server rẹ yóò wà ní:

`https://btcpay.example.com`

> Ti o ba n ṣatunṣe fifi sori ẹrọ ti o wa tẹlẹ (fun apẹẹrẹ fifi ZEC kun), rii daju lati da duro ki o tun bẹrẹ olupin pẹlu awọn eto tuntun:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Lẹhinna tẹsiwaju si abala ti o tẹle lati tunto Zcash ni wiwo wẹẹbu BTCPay Server.



## Ṣiṣiṣẹ Zcash Rẹ Nọ́ọ̀dù Kíkún

Ti o ba fẹ **not** lati gbekele gbangba `lightwalletd` awọn nodu, o le gbe gbogbo nodu Zcash rẹ papọ pẹlu Lightwalletd lori olupin kanna. 
Èyí á fún ọ ní **ìdarí-ara-ẹni-nìkan pátápátá** - kò ní sí ìfiwéra kankan, kò sì sí ìfọkàntán kankan.

---

### Ìgbésẹ̀ 1: Rí i dájú pé o ní àyè tó pọ̀ tó lórí ẹ̀rọ alágbèéká rẹ

Nọ́ọ̀dù Zcash tó kún (Zebra + Lightwalletd) ní báyìí ń béèrè **300+ GB** ti àyè disk, ó sì ń bá a lọ láti dàgbà.

Ìpínyà:

- Ibi ìpamọ́ ìsọfúnni Zebra blockchain: ~260-270 GB
- Lightwalletd ìfiwéra: ~15-20 GB

#### Ìpamọ́ tí a dábàá:

- **400 GB+** ti o ba jẹ pe olupin naa lo **nikan** fun awọn sisanwo Zcash
- **800 GB+** ti o ba jẹ pe olupin naa tun nṣiṣẹ BTCPay Server, PostgreSQL, Nginx, ati bẹbẹ lọ.

> O dara julọ lo disiki SSD/NVMe pẹlu agbara **1 TB**, paapaa ti o ko ba gbero lati ṣajọ data nigbagbogbo.

---

### Igbesẹ 2: Ṣeto Awọn iyipada Ayika

Fi ohun tí ó tẹ̀lé sí àyíká rẹ láti mú kí ìtòlẹ́sẹẹsẹ ìkànnì náà ṣiṣẹ́:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Èyí yóò kan àwọn `zcash-fullnode` ìyókù, eyi ti o se igbekale mejeeji `zebrad` àti `lightwalletd` inu BTCPay Server.

---

### Ìgbésẹ̀ 3: Tún Ṣiṣẹ́ Ẹ̀rọ-ìfiwọlé náà

`. ./btcpay-setup.sh -i`

Àkọsílẹ̀ náà yóò:

* Ṣe igbasilẹ awọn aworan Docker fun Zebra ati Lightwalletd
* Ṣeto awọn iṣẹ inu BTCPay stack
* Sopọ ohun itanna Zcash si àdúgbò `lightwalletd` àpẹẹrẹ

> **Iṣakojọpọ blockchain ni kikun le gba awọn ọjọ pupọ**, paapaa lori awọn olupin VPS ti o ni orisun kekere.
> Títí dìgbà tí ìṣọ̀kan náà bá parí, àwọn ìsanwó tí a fi ààbò bo kò ní sí.


## Sopọ si Ẹrọ Lightwalletd ti ita

Ní ọ̀pọ̀lọpọ̀ ìgbà, a kò nílò àkóso ara ẹni ní kíkún - àti àwọn oníṣòwò lè máà fẹ́ lo àkókò àti àyè díìsìkì tí wọ́n fi ń ṣiṣẹ́ Zcash node kan. 
Nipa aiyipada, BTCPay Server so si a gbangba `lightwalletd` node lati ṣakoso awọn sisanwo ti o ni aabo laisi gbigba gbogbo blockchain.

Aṣayan ipari ti o wa ni:

`https://zec.rocks:443`

Sibẹsibẹ, o le tunto BTCPay Server lati sopọ si ** eyikeyi ita `lightwalletd` node**, irú bíi:

`https://lightwalletd.example:443`

Apá yìí fi bí a ṣe lè ṣe èyí hàn nípa lílo ìyókù Docker àdáni.

> Àpẹẹrẹ ìtòlẹ́sẹẹsẹ kíkún pẹ̀lú gbogbo àwọn àyíká àyíka wà ní [ìpamọ́ ohun èlò](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Àwọn ìgbésẹ̀ tó wà nísàlẹ̀ yìí fi bí nǹkan ṣe máa ń rí hàn.

---

### Ìgbésẹ̀ 1: Ṣẹ̀dá Àyọkà Docker Àdáni

Nínú àkọọ́lẹ̀ iṣẹ́ BTCPayServer rẹ, dá fáìlì àlàfo àdáni kan:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Ṣafikun akoonu atẹle:

```
exclusive:
- zcash
```

Àwọn `exclusive` ó rí i dájú pé kìkì àjákù kan péré tó ní àmì kan náà (`zcash` nínú ọ̀ràn yìí) lè máa bá a lọ ní ṣíṣiṣẹ́ lẹ́ẹ̀kan náà.
Eleyi yago fun iṣeto rogbodiyan - fun apẹẹrẹ, o ko le ṣiṣe awọn mejeeji awọn `zcash-fullnode` àlàfo ati yi aṣa ita `lightwalletd` ìyókù náà á wá pa dà síbi kan náà.
Nípa fífi àmì sí i pé `exclusive: zcash`, BTCPay Server yoo laifọwọyi pa awọn aiyipada `zcash-fullnode` àti ti inú `lightwalletd` awọn apoti, gbigba ọ laaye lati sopọ si akopọ ita ti ara rẹ dipo.

---

### Igbesẹ 2: Ṣeto Awọn iyipada Ayika

Ní ibùdó:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Igbese 3: Ṣalaye Adirẹsi Nọ́ọ̀dù Àjòjì

Ṣí àwọn `.env` Àkọsílẹ̀:

`nano .env`

Fi ìlà tí ó wà nísàlẹ̀ yìí kún un, tí o sì fi àlàfo tí o yàn rọ́pò URL:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

O lè lo:

* A ** gbangba node **, gẹgẹ bi awọn `https://lightwalletd.zcash-infra.com`
* Rẹ ara-gbalejo node, deployed lọtọ lati BTCPay Server

> Bí àyè òde bá `lightwalletd` kò ní sí láàyè tàbí kó pọ̀ ju bó ṣe yẹ lọ, àwọn ìsanwó tí wọ́n fi ààbò bo ara wọn yóò kùnà.
> Fun awọn iṣẹ pataki, yan ** iduroṣinṣin ati idanwo opin ** (bi awọn aiyipada `zec.rocks`).

> Fẹ́ láti gba àlejò fúnra rẹ̀ `lightwalletd`?
> O lè lo `docker-compose.lwd.yml` láti ibi ìpamọ́ Zebra [](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Ìkìlọ̀:** Ìtòlẹ́sẹẹsẹ yìí kò sí lákọsílẹ̀ ní ọ̀nà ìṣàkóso, ó sì ń béèrè ìtòlẹ́sẹẹgbẹ́ TLS lọ́nà ọwọ́, àtúntò ibodè, àti ìtòlẹ̀sẹẹṣẹ firewall - tí wọ́n dábàá fún àwọn oníṣe àgbà nìkan.

---

### Ìgbésẹ̀ 4: Tún Ṣiṣẹ́ Ẹ̀rọ-ìfiwọlé náà

`. ./btcpay-setup.sh -i`

BTCPay Server yoo lo rẹ ti adani config ati ki o sopọ si awọn ti a ṣalaye `lightwalletd` kókó.

Láti ìsinsìnyìí lọ, àfikún Zcash yóò máa lo ìparí ìta láti ṣe àwọn ìnáwó tí a fi ààbò bo.


## Gbigba BTCPay Server ni Ile pẹlu Cloudflare Tunnel

Ṣe o fẹ gba awọn sisanwo Zcash lakoko ti o n gbalejo BTCPay Server lori ẹrọ ile kan - bii Raspberry Pi 5 tabi eyikeyi olupin agbegbe ** laisi IP iduroṣinṣin **? 
O le fi ààbò tú àpẹrẹ rẹ sí orí ayélujára nípa lílo ** Cloudflare Tunnel **.

Ọna yìí ń yẹra fún fífi ojúlé ránṣẹ́, ó sì fi adirẹsi IP rẹ pamọ́ fún gbogbo ènìyàn - nígbà tí o sì ń jẹ́ kí ààrò rẹ wà nípò lórí HTTPS.

O tun ṣe iranlọwọ fun ọ ** lati yago fun idiyele ti yiyalo VPS **, eyiti o jẹ apẹrẹ ti awọn sisanwo cryptocurrency ba jẹ ẹya aṣayan dipo ipilẹ ti iṣowo rẹ.

---

### Ìgbésẹ̀ 1: Fi Cloudflare Tunnel sori ẹrọ

1. Ṣẹ̀dá àkọọ́lẹ̀ ní [cloudflare.com]](https://www.cloudflare.com) kí o sì fi àdúgbò rẹ kún un.
2. Lori rẹ ** ile olupin **, fi sori ẹrọ Cloudflare Tunnel:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Ṣiṣayẹwo pẹlu Cloudflare:

`cloudflared tunnel login`

Àṣẹ yìí yóò ṣí wíńdò aṣàwákiri kan. Wọlé wọlé kí o sì fọwọ́ sí wíwọlé sí ìkápá rẹ.
Cloudflare yóò dá ẹ̀rọ-ìmọ̀lára kan sílẹ̀ `credentials` faili pẹlu ami kan lori olupin rẹ.

4. Ṣẹda eefin tuntun (o le sọ ọ́ ni `btcpay` tàbí ohunkóhun mìíràn):

`cloudflared tunnel create btcpay`

Eyi n ṣe ipilẹṣẹ `btcpay.json` fáìlì tí ó ní ìdánimọ̀ ihò àti àwọn ìforúkọsílẹ̀ - o máa nílò rẹ̀ ní ìgbésẹ̀ tó tẹ̀ lé e.

---

### Ìgbésẹ̀ 2: Ṣẹ̀dá Àkọsílẹ̀ Ìṣètò Ọ̀nà Ìkọ̀rọ̀

Ṣẹda itọsọna iṣeto (ti ko ba si tẹlẹ) ki o si ṣii faili iṣeto:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Fi ìtòlẹ́sẹẹsẹ tí ó wà nísàlẹ̀ yìí sínú:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Àlàyé:

* `tunnel` - orúkọ ọ̀nà abẹ́rẹ́ tí o dá ṣáájú
* `credentials-file` - ipa-ọna si faili ami ti a ṣẹda lakoko `cloudflared tunnel login`
* `hostname` - ìkápá rẹ tí a forúkọsílẹ̀ pẹ̀lú Cloudflare (bíi `btcpay.example.com`)
* `service` - adirẹsi agbegbe ti BTCPay Server rẹ (nigbagbogbo `http://127.0.0.1:80` fun Nginx)

> Cloudflare yóò ṣe àgbékalẹ̀ ìsọfúnni lọ́nà tí ó ní ààbò lọ sí ààrò ilé rẹ, láìsí fífi IP ilé rẹ hàn.


### Igbesẹ 3: Ṣafikun Àkọsílẹ DNS fún Ọ̀nà Ìkọ̀kọ̀ Rẹ

Lẹ́yìn tí o bá ti dá ọ̀nà náà, Cloudflare yóò fi àkọsílẹ̀ CNAME DNS kan kún un fún ìkápá rẹ.

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Ti o ko ba han laifọwọyi, fi sii ni ọwọ:

1. Lọ sí [Àpótí Ìdarí Cloudflare rẹ]](https://dash.cloudflare.com/)
2. Yọ lọ sí abala **DNS**
3. Ṣafikun igbasilẹ CNAME tuntun:
   - ** Orúkọ**: `btcpay`
   - Àfojúsùn: `<UUID>.cfargotunnel.com`  
     O lè rí iye náà gan-an nínú ìwé rẹ `btcpay.json` faili tabi nipa ṣiṣe:
     
     `cloudflared tunnel list`
     
   - **Ipò aṣojú**: A ti fàyè gbà á (àwọsánmà aláwọ̀ osan)

> Àkọsílẹ̀ yìí ń rí i dájú pé gbogbo àwọn ìbéèrè sí `btcpay.example.com` a máa ń darí wọn nípasẹ̀ Àkọ́lé Cloudflare, tí yóò fi ojúlówó IP adirẹsi rẹ pamọ́ fún gbogbo ènìyàn.

---

### Igbesẹ 4: Ṣẹ̀rọ̀ Àkọ́lé lórí Ìbẹ̀rẹ̀ Ọ̀nà

Lati jẹ ki eefin naa ṣiṣẹ laifọwọyi ni igbesoke, fi sori ẹrọ bi iṣẹ eto:

`sudo cloudflared service install`

Lẹhinna mu iṣẹ naa ṣiṣẹ ki o bẹrẹ:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Ṣayẹwo ipo:

`sudo systemctl status cloudflared`

O yẹ ki o ri ifiranṣẹ bi `Active: active (running)` àti ìdánilójú pé `btcpay.example.com` ó wà lórí íńtánẹ́ẹ̀tì.

> Láti ìsinsìnyìí lọ, ọ̀nà náà yóò bẹ̀rẹ̀ lóòrèkóòrè ní gbogbo ìgbà tí a bá tún un ṣe, àti BTCPay Server rẹ yóò wà fún gbogbo ènìyàn - láìsí títúbọ̀-sípò àti láìfi IP gidi rẹ hàn.

---

### Igbesẹ 5: Ṣẹ̀yìn ìtòlẹ́sẹẹsẹ BTCPay Server

Ti o ba fẹ fi BTCPay Server sori ẹrọ fun igba akọkọ, ṣeto agbegbe rẹ ṣaaju ṣiṣe iwe afọwọkọ iṣeto:

`export BTCPAY_HOST="btcpay.example.com"`

Eyi ni idaniloju pe agbegbe ti o tọ ni a lo nigbati o ba n ṣe agbekalẹ ** iṣeto Nginx ** ati ** awọn iwe-ẹri SSL **.

Ti o ba ti fi BTCPay Server sori ẹrọ tẹlẹ ati pe o n ṣafikun eefin naa:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Ìmúrasílẹ̀ náà yóò tún àwọn ìtòlẹ́sẹẹsẹ ṣe, yóò sì lo àdúgbò tuntun.
O yẹ ki o ni anfani lati wọle si olupin rẹ ni:

`https://btcpay.example.com`

> Yálà o ń lo ìkànnì tó wà fún gbogbo ènìyàn `lightwalletd` tàbí kó jẹ́ gbogbo ìlà tó wà nínú rẹ, èyí kò ní nípa lórí ojú ọ̀nà náà.
> Gbogbo awọn ti o ni pataki ni wipe BTCPay Server ti wa ni gbigbọ lori `127.0.0.1:80` ní àdúgbò.


## Ṣiṣeto ohun itanna Zcash ni wiwo wẹẹbu BTCPay Server

> **Ó ṣe pàtàkì fún àwọn ilé-ìtajà tí ó ní ọ̀pọ̀lọpọ̀ ilé ìtajà:** 
> Zcash wallet ti a ṣe eto nibi jẹ **global** si apeere. Gbogbo awọn ile itaja yoo lo apamọwọ yii ayafi ti o ba ṣiṣẹ awọn apeere BTCPay lọtọ.

Lẹ́yìn tí o bá ti fi aṣeyọri ṣe ìmúṣiṣẹ́ BTCPay Server rẹ, o ní láti ṣe àwọn àtúnṣe díẹ̀ nípasẹ̀ àlàfo orí ayélujára admin. 
Àkọsílẹ̀ osise náà pèsè àwọn ìtọ́ni kíkún ní èdè Gẹ̀ẹ́sì - níbí, a ó rìn nípasẹ̀ àwọn ìgbésẹ̀ pàtàkì àti dídákẹ́kọ̀ọ́ ní pàtó lórí ṣíṣàtúnṣe àfikún Zcash.

---

### Ìgbésẹ̀ 1: Ṣíwọlé sí ojú-ọ̀nà Ìkànnì

Ṣabẹwo si ẹda rẹ ni:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Tẹ ìwásílẹ̀ olùdarí àti ọ̀rọ̀-ìfipamọ́ rẹ.
- Bí èyí bá jẹ́ ìgbà àkọ́kọ́ tí o wọlé, a ó sọ fún ọ láti dá àkáǹtì kan.
- Àkọsílẹ̀ àkọ́kọ́ tí o bá forúkọsílè̀ yóò gba àwọn ẹ̀tọ́ olùdarí.

---

### Igbesẹ 2: Fi ohun itanna Zcash sori ẹrọ

1. Ninu akojọ aṣayan akọkọ, lọ sí:

`Plugins -> Browse Plugins`

2. Ṣawari ohun itanna **Zcash (ZEC) ** Lo ọpa àwárí ti o ba jẹ dandan.
3. Tẹ ** Fi sori ẹrọ ** ki o si jẹrisi.

> Tun ilana yii ṣe fun eyikeyi awọn altcoins miiran ti o mu ṣiṣẹ lakoko iṣeto olupin.

Lẹ́yìn tí o bá ti fi sori ẹrọ, tẹ **Restart Server** láti tún àlẹ̀rọ̀ká ìjápọ̀ náà ṣe pẹ̀lú àwọn àfikún tó wà nídìí.


### Step 3: Connect Your Wallet via Viewing Key

Lẹ́yìn tí o bá ti fi àfikún náà sori ẹrọ, abala **Zcash** tuntun kan yóò farahàn nínú ìtòlẹ́sẹẹsẹ.

1. Go to:

`Zcash -> Settings`

2. Paste your **Unified Full Viewing Key (UFVK)** - BTCPay will derive a Unified Address for each invoice and detect incoming shielded payments.

> **Note:** Legacy Sapling viewing keys are supported, but to use Orchard/Unified Addresses you should provide a **UFVK**.


   Àpẹẹrẹ ìmúra:

`uview184syv9wftwngkay8d...`

3. Tẹ iye kan sinu pápá gíga ìdìpọ̀

* **Iṣeto igba akọkọ pẹlu apamọwọ tuntun (ọ̀rọ̀ ìkókó tuntun):** tẹ giga bulọọki Zcash lọwọlọwọ (o le ṣayẹwo rẹ ni 3xpl.com/zcash) - eyi yára si iṣawari akọkọ.
* **Gbigbe lori olupin kanna lati iṣeto Sapling-nikan ti o jogun si Awọn adirẹsi Iṣọkan / Orchard:** fi aaye yii silẹ ni ofo.
* **Moving your store to a new server with the same wallet/UFVK:** optionally enter the birth height - an approximate height of your store's first paid order (match the order date on 3xpl to narrow the scan). If unsure, leave it empty.

> Kì í ṣe gbogbo wallets ló ń ṣe àtìlẹ́yìn **Unified Full Viewing Key (UFVK) ** export báyìí. 
> Àwọn àbá: 
>  [**YWallet**]](https://ywallet.app/installation)  
>  [**Zingo! Wọléètì (àtúnṣe fún PC) **](https://zingolabs.org/)  
> Ninu awọn ohun elo mejeeji, wa fun gbigbe UFVK ni apakan afẹyinti / gbigbe.

Àwọn kókó wọ̀nyí ń ṣe àtìlẹ́yìn **ìyípadà adirẹsi àfọwọ́kọ**, èyí tó túmọ̀ sí:
- Gbogbo oníbàárà ló máa ń gba àdírẹ́sì ìsanwó kan ṣoṣo.
- Ìwọ̀n kan ṣoṣo, tó wà níṣọ̀kan lo rí

O le wa akojọ ibaramu ti o gbooro sii lori [ZecHub -> Wallets](https://zechub.wiki/wallets).

Nígbà tí gbogbo pápá bá ti kún, tẹ **Save**.

---

### Ṣe àyẹ̀wò Ìṣàn Owó-ìsanwó ZEC Rẹ

Ìkíni - àpamọ́ Zcash rẹ ti so mọ́ BTCPay Server báyìí.

Ẹ jẹ́ ká ṣe àyẹ̀wò kan:

1. Go to:

`Invoices -> Create New`

2. Ṣẹda iwe-owo idanwo fun iye kekere kan ni ZEC.
3. Fi owó ránṣẹ́ láti inú àpamọ́ owó míì (kì í ṣe èyí tí a so mọ́ BTCPay).
4. Lọgan ti a ba rii iṣowo naa, oju-iwe iwe-owo yoo ṣafihan ayẹyẹ wiwo kan.
5. Fọwọsi pe ipo iwe-owo naa yipada si **Paid**.

Ti ohun gbogbo ba ṣiṣẹ - o ṣetan lati ṣepọ awọn sisanwo ZEC sinu oju opo wẹẹbu rẹ nipa lilo API tabi awọn afikun CMS.



## Ṣiṣẹpọ BTCPay Server pẹlu oju opo wẹẹbu rẹ

Lọgan ti apamọwọ Zcash rẹ ba ti sopọ mọ BTCPay Server, o le ṣepọ eto isanwo naa sinu oju opo wẹẹbu rẹ. 
Awọn ọna pupọ lo wa lati ṣe eyi - lati iraye si API taara si awọn ohun itanna ti o ṣetan lati lo fun awọn iru ẹrọ CMS olokiki.

---

### Àwọn Ìpinnu Tó Wà fún Ìkórajọ

- **Ìkópọ API** 
  O tayọ fun awọn oju opo wẹẹbu ti a ṣe adani tabi awọn ọna ṣiṣe laisi CMS kan. 
  O fun ọ ni iṣakoso kikun lori ẹda iwe-owo, titele isanwo, ati awọn iwifunni - gbogbo rẹ laarin wiwo tirẹ ati imọran. 
  Nilo imọ siseto ipilẹ, nitorinaa iṣẹ yii ni o dara julọ nipasẹ olupilẹṣẹ rẹ.

- Àwọn àfikún CMS 
  O wa fun awọn iru ẹrọ bii ** WooCommerce **, ** PrestaShop **, ati awọn miiran. 
  Àwọn àfikún wọ̀nyí jẹ́ kí o lè gba owó ní ìṣẹ́jú díẹ̀ - kò nílò kóòdì.

- **Bọtini Ìsanwó tàbí Iframe** 
  Ọ̀nà tó rọrùn jù lọ. 
  Ó dára fún àwọn ojúewé ìlépa, àwọn ìkànnì àdáni, tàbí ìkànlẹ̀ èyíkéyìí tí o bá fẹ́ fi ìjápọ̀ ọrẹ tàbí ìsọfúnni ìsanwó sí.

---

### Àkójọpọ API

Ti o ba n lo pẹpẹ ti ara ẹni (tabi ko si CMS rara), API ni aṣayan ti o dara julọ. 
O fun ọ ni irọrun pipe: o le ṣẹda awọn iwe-owo, tọpinpin ipo wọn, gba awọn iwifunni, ati ṣakoso iriri olumulo ni kikun.

> Àkíyèsí: Kódà àwọn àfikún CMS kan máa ń lo API lábẹ́ òrùlé, nítorí náà kíkọ API kókó jẹ́ ìgbésẹ̀ àkọ́kọ́ tí a nílò, láìka ọ̀nà ìsopọ̀ rẹ sí.

Igbese ti o tẹle: ṣe ipilẹṣẹ bọtini API fun ile itaja rẹ ki o bẹrẹ lilo [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) láti kọ́ ìdàgbàsókè ara rẹ.


### Ṣiṣẹda bọtini API kan

Lati ṣepọ BTCPay Server pẹlu oju opo wẹẹbu rẹ tabi ohun elo rẹ, iwọ yoo nilo lati ṣe ipilẹṣẹ bọtini API kan.

1. Ṣíwọlé sí BTCPay Server kí o sì ṣí ìtòlẹ́sẹẹsẹ oníṣe (ojú ọ̀tún òkè)
2. Lọ sí àwọn kókó API
3. Tẹ **Ṣẹda bọtini API tuntun**
4. Tẹ orukọ kan wọlé fún kókó rẹ
5. Ninu abala **Awọn igbanilaaye**, jẹ ki:
   - `Can create invoice`
   - `Can view invoice`
   - * ((Ohun tí o kò bá fẹ́) * `Can modify store settings` - tí o bá nílò àbójútó ní orílé-iṣé

6. Tẹ **Generate**. Àkọsílẹ̀ API ti ara ẹni rẹ yóò hàn - ṣe ẹ̀dà rẹ kí o sì tọ́jú rẹ̀ lọ́nà tí ó ní ààbò.

> Kọ́kọ́rọ́ yìí máa ń fúnni láyè láti wo àwọn ìwé ìnáwó ilé ìtajà rẹ. 
> Má ṣe pín in fún gbogbo ènìyàn tàbí kóo fi í hàn nínú kóòdì ẹgbẹ́ oníbàárà.

---

### Àpẹẹrẹ: Ṣiṣẹda Invoice nipasẹ API

**Ojú-ìwòye:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

Ẹ̀ka tó ń béèrè ìbéèrè:

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

Ìdáhùn:

Iwọ yoo gba ohun JSON pẹlu:

* `invoiceId`
* URL ìsanwó tí o lè fi sínú ìkànnì rẹ tàbí ránṣẹ́ sí oníbàárà

Wo gbogbo ìwé:
[Greenfield API  Ṣẹda Iwe-iṣowo](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Ṣiṣeto Webhook (Ohun ti o fẹ)

Lati gba awọn iwifunni akoko gidi nigbati ipo iwe-owo ba yipada (fun apẹẹrẹ nigbati a ba gba isanwo kan):

1. Lọ sí àwọn ìtòlẹ́sẹẹsẹ ilé-ìtajà rẹ -> **Webhooks**
2. Ṣafikun URL ti rẹ backend opin ojuami ti yoo mu `POST` àwọn ìbéèrè láti BTCPay Server
3. BTCPay yóò fi ìfilọ́lẹ̀ ránṣẹ́ lọ́nà ẹ̀rọ nígbàtí àkáǹtì bá ti san tàbí tí ó bá pé

Webhook payloads and retry logic are described in the [official webhook documentation] Àwọn ohun èlò tí wọ́n fi ń ṣe àtúnyẹ̀wò àti àtúnṣe ojú-ọ̀nà ni a ṣàpèjúwe nínú [ìwé àkọsílẹ̀ ojú-ọ̀](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Àpẹẹrẹ ìsowọ́pọ̀ wà fún oríṣiríṣi èdè ètò nínú àwọn ìwé BTCPay àti àwọn ibi ìpamọ́ GitHub.



### Àkójọpọ CMS

BTCPay Server n ṣe atilẹyin awọn afikun fun awọn ọna ṣiṣe iṣakoso akoonu olokiki (CMS). 
Aṣopọpọ ti o dagba julọ ati ti a lo ni ibigbogbo jẹ pẹlu **WordPress + WooCommerce**, ṣiṣe ni rọọrun lati gba awọn sisanwo ZEC **laisi kikọ koodu**.

---

#### WooCommerce (WordPress) Àwọn ojúewé tó jápọ̀ mọ́ "

BTCPay Server ṣe atilẹyin ohun itanna fun WooCommerce.

Àwọn ìgbésẹ̀ láti kópa:

1. Fi ohun itanna **BTCPay fun WooCommerce** sori ẹrọ lati inu itanna itanna WordPress tabi lati GitHub.
2. Ninu abala aṣakoso WordPress rẹ, lọ sí:

`WooCommerce -> Settings -> Payments`

3. Wá **BTCPay** nínú àkọsílẹ̀ kí o sì tẹ **Set up**
4. Tẹ BTCPay Server rẹ URL ki o si tẹle awọn itọnisọna aṣẹ 
   (a ṣe iṣeduro iṣelọpọ bọtini API laifọwọyi)
5. Fún ọ̀nà ìsanwó náà àti pa àwọn àyípadà rẹ mọ́

> Detailed instructions, video tutorials, and troubleshooting guides are available in the plugin documentation.

O tún lè rí àwọn àtúnṣe CMS mìíràn ní apá kan náà nínú àwọn ìwé BTCPay.

---

### Bọtini ìsanwó tàbí Iframe (Kò sí CMS tàbí API Tí a nílò)

Ti o ko ba lo CMS ati pe o ko fẹ lati ṣiṣẹ pẹlu awọn API, ọna ti o rọrun julọ lati gba awọn sisanwo ZEC ni lati ** fi ọna asopọ isanwo tabi ẹrọ ailorukọ ** sii taara lori oju opo wẹẹbu rẹ.

Ọ̀nà yìí dára gan-an fún:

- Àwọn ojúewé ìkápá
- Àwọn ojúewé àpapọ̀
- Àwọn ìkànnì tàbí àwọn ojúewé tí kò yí padà
- Awọn iṣẹ akanṣe laisi olupin afẹyinti

---

#### Aṣayan 1: Bọtini Ìsanwó (Àjápọ̀)

1. Ninu BTCPay Server, fi ọwọ ṣẹda iwe-owo ni abala **Invoices**
2. Ṣe àdàkọ ìjápọ̀ ìsanwó, bí àpẹẹrẹ:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Ṣafikun ìjápọ̀ sí HTML rẹ:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Aṣayan 2: Àkọsílẹ̀-ìṣírò tí a fi sínú (Iframe)

Lati fi iwe-owo han taara lori aaye rẹ, lo iframe kan:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> O le ṣe aṣa bọtini tabi apoti iframe lati baamu apẹrẹ aaye rẹ - BTCPay Server gba irọrun irọrun ti oju-iwe iwe-owo.

## Ìparí

Itọsọna yii gun - ṣugbọn o bo awọn abala ipilẹ ti iṣọpọ awọn sisanwo Zcash pẹlu BTCPay Server nikan.

The BTCPay Server interface offers far more functionality than we've shown here. Luckily, the UI is available in multiple languages (including Russian), making it easy to explore and experiment further.

BTCPay jẹ ohun elo ti o ni irọrun pupọ. O le:

* Gbé ọ̀pọ̀lọpọ̀ àwọn ilé ìtajà tí ó wà ní ẹyọ kan ṣoṣo
* Ṣalaye awọn ipa ati awọn igbanilaaye aṣa fun awọn ọmọ ẹgbẹ ẹgbẹ - lati wiwo aṣẹ nikan si aṣakoso kikun
* Lo àwọn ìkápá rẹ àti àmì ọ̀pá àṣẹ rẹ
* Ṣeto awọn webhooks, awọn apamọwọ afẹyinti, ati paapaa iraye si Tor
* Configure advanced settings such as tax rules, discount codes, checkout page customization, payment method restrictions, and more

BTCPay ni a kọ gẹ́gẹ́ bí àyípadà ìmọ̀-ìmọ̀ sí àwọn olùpèsè ìsanwó tí ó wà láàrín. Bí o bá ń wá láti gba ìsúná ZEC tí kò ní alárinà kankan, pẹpẹ yìí tọ́ fún àfiyèsí rẹ.

A fẹ́ kí o ṣàṣeyọrí nínú wíwá BTCPay àti ṣíṣe ìsanwó rẹ ní tirẹ̀.

## Àwọn ohun àmúṣọrọ̀

* [Ojúlé Ìkànnì Ọ̀fẹ́ BTCPay Server]](https://btcpayserver.org/)
* [BTCPay FAQ]](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub Àpamọ́](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet Àdánwò](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Plugin fún BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Ìtọ́wọ́ọ̀wọ́ Ìsopọ Zcash Plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Àṣà zcash-lightwalletd.custom.yml Àpẹẹrẹ](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker Compose File (Zebra) ] Àtúnṣe ojúewé](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API Key Docs (Greenfield API) ]](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Ṣẹ́ Àgbélébùú Àwọsánmà]](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Àtòjọ Àwọn Owó-ìpamọ́ Zcash (ZecHub) ]](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd lórí Raspberry Pi 5 (ZecHub) ]](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
