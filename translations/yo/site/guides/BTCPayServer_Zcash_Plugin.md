# Olùpèsè BTPay pẹ̀lú Àtìlẹ́yìn Zcash: Ìtọ́sọ́nà Kíkún fún Fífi Sílẹ̀ àti Ìṣọ̀kan

BTCPay Server gba awọn iṣowo ori ayelujara laaye lati gba awọn sisanwo cryptocurrency taara, laisi awọn alarina tabi awọn olutọju. Itọsọna yii yoo ṣe itọsọna rẹ nipasẹ gbogbo ilana ti ṣeto BTCPay Server pẹlu atilẹyin abinibi fun awọn sisanwo Zcash ti a daabobo.

> Ìwé yìí dá lórí bí a ṣe lè so Zcash pọ̀ mọ́ BTCPay Server rẹ. 
> Ó ṣe àtìlẹ́yìn fún àwọn ètò **full node (Zebra)** àti **lightwalletd-based setups**.

---

## Atọka akoonu

- [Kí ló dé tí o fi lo BTPay Server pẹ̀lú Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Báwo ni BTPay Server ṣe ń ṣiṣẹ́](#How-BTCPay-Server-Works)
- [Ibo ni a ti n tọju owo naa? Ta ni o n ṣakoso awọn bọtini ikọkọ?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Bí a ṣe le ṣètò BTPay Server fún gbígba Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Ṣíṣe ìfiránṣẹ́ BTPay Server pẹ̀lú ìrànlọ́wọ́ Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Ṣíṣiṣẹ́ Kún Kún Zcash Tirẹ̀ (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Sísopọ̀ mọ́ Nódì lightwalletd kan (Ìṣètò Àṣà)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Ṣe àtìlẹ́yìn fún BTPay Server nílé pẹ̀lú Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Ṣíṣeto Plugin Zcash nínú Ìbánisọ̀rọ̀ Wẹ́ẹ̀bù BTCPay Server](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Ṣíṣe àfikún BTPay Server pẹ̀lú ojú òpó wẹ́ẹ̀bù rẹ](#Integrating-BTCPay-Server-with-Your-Website)
  - [Ìṣọ̀kan API](#API-Integration)
    - [Ṣíṣẹ̀dá Kọ́kọ́rọ́ API kan](#Generating-an-API-Key)
    - [Àpẹẹrẹ: Ṣíṣẹ̀dá Ìwé Ìsanwó nípasẹ̀ API](#Example-Creating-an-Invoice-via-API)
    - [Ṣíṣeto Webhook kan](#Setting-Up-a-Webhook-Optional)
  - [Ìṣọ̀kan CMS](#CMS-Integration)
  - [Bọ́tìnì Ìsanwó tàbí Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Ìparí](#Conclusion)
- [Àwọn ohun àlùmọ́nì](#Resources)


---

## Kí ló dé tí o fi lo BTPay Server pẹ̀lú Zcash

Iṣowo ori ayelujara n gba owo oni-nọmba kiri ayelujara ni kiakia. O yara, agbaye, o si n ṣiṣẹ laisi awọn ile ifowopamọ. Eyi ṣe anfani fun awọn oniṣowo ati awọn alabara. Ṣugbọn awọn alaye pataki kan wa ti ọpọlọpọ awọn eniyan foju kọ.

Nígbà tí a bá ń ṣe àṣẹ, oníbàárà sábà máa ń fúnni ní ìwífún nípa ara ẹni: orúkọ, àdírẹ́sì ìfiránṣẹ́, àti nọ́mbà fóònù. Tí a bá ń san owó náà nípa lílo blockchain gbogbogbòò - bíi Bitcoin, Ethereum, tàbí stablecoins lórí Ethereum tàbí Tron - ìṣòwò náà yóò hàn gbangba fún ìwádìí títí láé.

Ẹnikẹ́ni, láì mọ ohun tí wọ́n pàṣẹ fún, lè:

- wo ìgbà àti iye tí a san 
- tọpinpin ibi tí owó náà ti wá àti ibi tí wọ́n lọ 
- so àdírẹ́sì owó-orí mọ́ ẹni gidi kan tí ó bá ní ìbáṣepọ̀ kankan (fún àpẹẹrẹ, ìmeeli tí ó ti wó tàbí orúkọ ìfiránṣẹ́)

Èyí túmọ̀ sí wípé ríra kan ṣoṣo lè fi gbogbo ìtàn ìnáwó oníbàárà hàn.

Ó sì tún ń ṣiṣẹ́ lọ́nà mìíràn pẹ̀lú. Tí àdírẹ́sì oníṣòwò bá ti fara hàn lórí ẹ̀wọ̀n rí, wọ́n á di ẹni tí a ti tú síta. Àwọn olùdíje àti àwọn olùṣàkíyèsí ẹgbẹ́ kẹta lè tọ́pasẹ̀ iye ìsanwó, iṣẹ́ olùpèsè, àti ìṣètò ìṣàn ìṣòwò.

### Àpapọ̀ BTPay Server àti Zcash lè yanjú èyí.


BTPay Server jẹ́ ètò ọ̀fẹ́ àti ètò tí a kò ṣe àkójọpọ̀ fún gbígba owó ìsanwó owó. 
Kì í ṣe alárinà ìsanwó, kò sì ní owó kankan. Gbogbo ìsanwó lọ tààrà sí àpò oníṣòwò náà. 
Èyí lè jẹ́ àpò owó ara ẹni tàbí ètò ìforúkọsílẹ̀ púpọ̀ láàárín àjọ kan.

Olupin naa n ṣakoso awọn iṣẹ-ṣiṣe iṣọkan:

- n pese adirẹsi alailẹgbẹ fun aṣẹ kọọkan 
- tọpinpin nígbà tí a bá gba ìsanwó, ó sì so ó pọ̀ mọ́ àṣẹ náà 
- ó fúnni ní ìwé ẹ̀rí àti ìfitónilétí 
- pese wiwo isanwo fun alabara 

Ohun gbogbo ni o n ṣakoso labẹ iṣakoso ti onile itaja naa, laisi gbigbekele awọn iṣẹ ẹni-kẹta.

Zcash jẹ́ owó ìtanràn tí a gbé ka orí ẹ̀rí àìmọ̀. Ó ń ṣe àtìlẹ́yìn fún àwòṣe ìṣòwò àdáni pátápátá. 
Nígbà tí a bá ń lo àwọn àdírẹ́sì ààbò (tí a ń pè ní “àdírẹ́sì” lẹ́yìn náà), a kò fi olùránṣẹ́, olùgbà, àti iye ìṣòwò náà hàn lórí blockchain.

Fun awọn ile itaja ori ayelujara, eyi tumọ si:

- Olùrà náà lè parí ìsanwó náà láìfi ìtàn ìnáwó rẹ̀ hàn 
- Olùtajà náà gba owó láìsí pé ó tú àdírẹ́sì rẹ̀, iye títà rẹ̀, tàbí ètò ìṣòwò rẹ̀ jáde 
- Kò sí olùwòran láti òde tí ó lè so ìsanwó pọ̀ mọ́ àṣẹ náà tàbí mọ́ dátà oníbàárà

### Àpẹẹrẹ Tó Wúlò

Olùlò kan pàṣẹ fún wọn, ó sì yan Bitcoin tàbí USDT gẹ́gẹ́ bí ọ̀nà ìsanwó. 
Oju opo wẹẹbu naa n pese adirẹsi isanwo kan ati pe o n ṣafihan iye naa. 
Lẹ́yìn tí a bá ti san owó náà tán, a ó fi àdírẹ́sì yìí pamọ́ sínú blockchain náà, yóò sì di èyí tí gbogbo ènìyàn mọ̀. 
Olùkọlù kan gbọ́dọ̀ so àṣẹ kan pọ̀ mọ́ àdírẹ́sì náà láti lè ríran sí gbogbo ìtàn ìṣòwò rẹ̀ fún ìgbà pípẹ́.

Wàyí o, fojú inú wo irú ipò kan náà pẹ̀lú Zcash. 
BTCPay Server n pese adirẹsi ti a fi pamọ. Olura naa n fi isanwo ranṣẹ. 
Láti ojú ìwòye blockchain, kò sí ohun tó ń ṣẹlẹ̀. Kò sí ìwádìí gbogbogbò láti ṣàyẹ̀wò. 
Olùpèsè náà gba ìjẹ́rìí, ó so ó pọ̀ mọ́ àṣẹ náà, ó sì parí iṣẹ́ náà.

Fún ẹnikẹ́ni tí kò sí nílé, ó dà bíi pé kò sí ohun tó ṣẹlẹ̀. 
Gbogbo ọgbọn kan wa laarin ile itaja ati alabara - bi o ti yẹ.

Ojutu yii ko ba adaṣe tabi lilo jẹ. 
Ohun gbogbo n ṣiṣẹ bakanna bi pẹlu awọn owo-owo crypto miiran, laisi ewu jijo data.



## Báwo ni BTPay Server ṣe ń ṣiṣẹ́

BTCPay Server n ṣiṣẹ́ gẹ́gẹ́ bí afárá ìṣiṣẹ́ ìsanwó láàárín pẹpẹ ìtajà e-commerce rẹ àti blockchain. Èyí ni bí ìṣàn náà ṣe ń ṣiṣẹ́:

1. **Oníbàárà náà pàṣẹ** lórí ojú-òpó wẹ́ẹ̀bù rẹ (fún àpẹẹrẹ WooCommerce, Magento, tàbí èyíkéyìí ìtàkùn pẹ̀lú ìṣọ̀kan BTCPay).

2. **Ile itaja naa n beere fun iwe isanwo** lati ọdọ BTPay Server. Olupin naa n ṣe iwe isanwo alailẹgbẹ pẹlu:
   - Iye aṣẹ naa
   - Aago kika akoko kan
   - A Zcash Unified Address (UA) - e.g., `u1...` - èyí tí ó ní olugba Orchard (tí a dáàbò bò) nípasẹ̀ àìṣeédá.

3. **Oníbàárà náà rí ojú ìwé ìsanwó** ó sì fi ZEC ránṣẹ́ sí àdírẹ́sì tí a pèsè.

4. **Olùpèsè BTCPay ń ṣe àbójútó blockchain**, ó ń ṣàyẹ̀wò ìsanwó náà sí:
   - Iye ti a reti
   - Adirẹsi gbigba
   - Àkókò ìforúkọsílẹ̀ ìwé-ẹ̀rí náà

5. **Lẹ́yìn tí a bá ti rí ìṣòwò náà tí a sì ti fìdí rẹ̀ múlẹ̀**, BTCPay yóò sọ fún ilé ìtajà náà.

6. **Oníbàárà náà gba ìjẹ́rìí ìsanwó.** Tí ó bá jẹ́ pé o bá fẹ́, olupin náà lè fi ìwé ẹ̀rí ránṣẹ́ nípasẹ̀ ìmeeli.

Gbogbo ilana yii maa n waye ni **laifọwọyi**, laisi awọn alarina tabi awọn oluṣọ. 
BTCPay Server kò ní owó kankan** - ó kàn so ètò àṣẹ mọ́ blockchain náà ní ààbò àti ní ìkọ̀kọ̀.
## Ibo ni a ti n tọju owo naa? Ta ni o n ṣakoso awọn bọtini ikọkọ?

BTPay Server kìí ṣe àpò owó, kò sì nílò àwọn kọ́kọ́rọ́ ìkọ̀kọ̀**. 
Gbogbo owó lọ sí **tààrà** sí àpò oníṣòwò náà. A ń rí ààbò nípa lílo **àwòrán tí a fi àmì sí**.

### Bó Ṣe Ń Ṣiṣẹ́

- **A ti ṣẹ̀dá àpò owó náà ṣáájú.** 
  Oníṣòwò náà ń lo àpò Zcash kan tí ó ń ṣe àtìlẹ́yìn fún àwọn kọ́kọ́rọ́ wíwo - bíi [Zkool](https://github.com/hhanh00/zkool2/) or [Àpò owó Zingo!](https://zingolabs.org/).  
  Àkójọ gbogbo wà ní [ZecHub.wiki](https://zechub.wiki/wallets).

- **Ẹ̀rọ BTCPay sopọ̀ mọ́ ara wọn nípasẹ̀ kọ́kọ́rọ́ wíwo.** 
  Kọ́kọ́rọ́ wíwo jẹ́ **kọ́kọ́rọ́ kíkà-nìkan**: ó lè ṣàwárí àwọn ìsanwó tí ń bọ̀ kí ó sì ṣe àdírẹ́sì ìgbàwọlé tuntun, 
  ṣùgbọ́n kò le ná owó. Olùpèsè náà kò tọ́jú àwọn gbólóhùn tàbí àwọn kọ́kọ́rọ́ ìkọ̀kọ̀.

- **A le wọle si data Blockchain nipasẹ `lightwalletd` olupin.** 
  O le lo ibi ipamọ gbogbogbo bii `https://zec.rocks`, tabi ṣiṣẹ tirẹ `Zebra + lightwalletd` àkójọpọ̀ fún gbogbo agbára ìjọba.

- **Gbogbo àṣẹ ni a gba àdírẹ́sì àrà ọ̀tọ̀.** 
  Wiwo awọn bọtini gba olupin laaye lati gba awọn adirẹsi Zcash tuntun ti a daabobo fun gbogbo iwe-owo, 
  mu ki a le ṣe atẹle isanwo to ni aabo ati idilọwọ lilo adirẹsi.

- **O ni iṣakoso kikun lori owo naa.** 
  Bí ó tilẹ̀ jẹ́ pé wọ́n ti fi ẹ̀rọ ìpamọ́ náà sínú ewu, kò sí ẹni tí ó lè jí owó rẹ - àwọn ìsanwó nìkan ni a lè fi hàn.

Apẹẹrẹ yii ya **infrastructure** kuro ninu **iṣakoso dukia**. 
O le ṣe imudojuiwọn, gbe lọ si ibomiran, tabi tun fi BTPay Server sori ẹrọ laisi fifi owo eyikeyi sinu ewu.

## Bí a ṣe le ṣètò BTPay Server fún gbígba Zcash

Nínú àwọn apá tó ṣáájú, a ṣàlàyé bí BTCPay Server ṣe ń ṣiṣẹ́ pẹ̀lú Zcash àti ìdí tó fi ṣe pàtàkì fún àwọn ìsanwó ìpamọ́ ìpamọ́. Ó tó àkókò láti bẹ̀rẹ̀ iṣẹ́.

Eto gangan rẹ yoo dale lori ọpọlọpọ awọn ifosiwewe:

- Ṣé o ti ní àpẹẹrẹ BTCPay Server kan tẹ́lẹ̀?
- Do you want to use a public lightwalletd or run your own full node?
- Ṣe olupin naa yoo ṣiṣẹ lori VPS tabi ni ile?

Orí yìí bo gbogbo àwọn ìṣẹ̀lẹ̀ ìṣètò lọ́wọ́lọ́wọ́ - láti àwọn ètò tó kéré sí àwọn ìgbékalẹ̀ tó ní agbára gbogbo.

A yoo rin nipasẹ awọn atẹle:

- Bii o ṣe le lo ohun gbogbo lati ibẹrẹ lori VPS kan, pẹlu node kikun (Zebra)
- Bí a ṣe lè lo BTPay Server nílé nígbàtí a bá ń fi IP rẹ pamọ́ nípa lílo **Cloudflare Tunnel**
- Bii o ṣe le mu ati ṣeto atilẹyin Zcash ṣiṣẹ ninu wiwo wẹẹbu BTCPay Server
- Bii o ṣe le ṣepọ BTPay pẹlu oju opo wẹẹbu tabi ile itaja ori ayelujara rẹ


## Ṣíṣe ìfiránṣẹ́ BTPay Server pẹ̀lú ìrànlọ́wọ́ Zcash

Ẹ jẹ́ ká tẹ̀síwájú sí ètò gidi náà. Nínú abala yìí, a ó fi BTPay Server pẹ̀lú àtìlẹ́yìn Zcash sílẹ̀ - yálà lórí VPS tuntun tàbí nípa fífi àtìlẹ́yìn ZEC sí àpẹẹrẹ kan tó wà tẹ́lẹ̀.

Tí o bá ti ní BTPay Server tó ń ṣiṣẹ́ (fún àpẹẹrẹ BTC tàbí Lightning), o kò nílò láti tún gbogbo nǹkan ṣe - o kan mú kí àfikún ZEC ṣiṣẹ́.

A ó rìn lórí onírúurú ìṣètò, láti àwọn ètò tó kéré jùlọ nípa lílo gbogbogbòò `lightwalletd` node sí àwọn ìfisípò tí ó ní gbogbo agbára pẹ̀lú node tí ó ní gbogbo agbára tirẹ̀. 
Aṣayan ti o dara julọ da lori ipo olupin rẹ ati iye ominira ti o fẹ lati awọn amayederun ita.

> Àwọn ìwé àfikún àṣẹ: 
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Ìkìlọ̀ - àpò owó kan fún àpẹẹrẹ kan:** 
> Àfikún Zcash náà ń lo **àpò owó kan tí a pín** káàkiri **gbogbo àwọn ilé ìtajà** nínú àpẹẹrẹ BTPay. 
> Tí o bá ń ṣe àtìlẹ́yìn fún ọ̀pọ̀lọpọ̀ àwọn ilé ìtajà olómìnira lórí àpẹẹrẹ kan, wọn yóò pín àpò Zcash kan náà. 
> Lo awọn apẹẹrẹ lọtọ ti o ba nilo iyasọtọ ti o muna ti apamọwọ.

---

### Iṣeto VPS ti a ṣeduro

Ṣaaju ki o to fi sori ẹrọ, rii daju pe o ni:

- VPS kan pẹlu **Ubuntu 22.04+**
- Orúkọ ìkápá kan tí ó tọ́ka sí àdírẹ́sì IP ti olupin rẹ (nípasẹ̀ DNS)
- `git`, `docker`, àti `docker-compose` ti fi sori ẹrọ
- Wiwọle SSH si olupin naa

---

## Ngbaradi olupin rẹ (apakan ti o farasin)

<details>
  <summary>Click to expand</summary>

Láti lo BTPay Server pẹ̀lú àtìlẹ́yìn Zcash, o nílò àwọn wọ̀nyí:

### 1. VPS pẹlu Ubuntu 22.04 tabi tuntun

A gbani nimọran lilo fifi sori ẹrọ ti o kere ju ti **Ubuntu Server 22.04 LTS**. 
Olupese VPS eyikeyi ti o funni ni adiresi IP ti a yasọtọ yoo ṣiṣẹ. 

**Awọn ibeere ti o kere ju**: 
- Awọn koko CPU meji 
- Ramu 4 GB 
- Ààyè díìsìkì 40 GB 

Eto yii to ti o ba nlo lightwalletd fun Zcash. 
Tí o bá fẹ́ lo **kikun Zcash node**, o nílò **ó kéré tán 300 GB** ti ààyè disk ọ̀fẹ́.

---

### 2. Orúkọ ìkápá tí ó tọ́ka sí olupin rẹ

Nínú Dasibodu olupese DNS rẹ, ṣẹ̀dá `A` ṣe igbasilẹ fun subdomain kan 
(e.g. `btcpay.example.com`) tó tọ́ka sí àdírẹ́sì IP VPS rẹ. 

A o lo domain yi lati wọle si BTPay Server lati ẹrọ aṣawakiri 
àti láti ṣe àgbékalẹ̀ **ẹ̀rí SSL ọ̀fẹ́** láìfọwọ́sí nípasẹ̀ Let's Encrypt.

---

### 3. Wiwọle SSH si olupin naa

Láti fi BTPay Server sori ẹrọ, o gbọdọ sopọ mọ VPS rẹ nipasẹ SSH. 
Láti inú ẹ̀rọ ìṣiṣẹ́ rẹ, ṣiṣẹ́:

`ssh root@YOUR_SERVER_IP`

Tí o bá ń lo macOS, Linux, tàbí WSL lórí Windows, SSH ti wà ní ẹ̀rọ ìṣiṣẹ́ náà.
Lórí Windows lásán, lo oníbàárà SSH bíi **PuTTY**.

---

### 4. Fi Git, Docker, àti Docker Compose sori ẹrọ

Ni kete ti o ba ti sopọ nipasẹ SSH, ṣe imudojuiwọn awọn idii eto rẹ ki o fi awọn paati ti o nilo sii:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Lori Ubuntu 22.04 ati tuntun, `docker-compose` láti APT ti yọ kúrò.
> Apoti ti a ṣeduro ni `docker-compose-plugin`, eyi ti o pese `docker compose` àṣẹ (kíyèsí àlàfo dípò daaṣi).

Ayika olupin rẹ ti ṣetan bayi fun fifi sori ẹrọ BTPay Server.

</details>

---

### Igbesẹ 1: Ṣíṣe àkójọpọ̀ náà

Ṣẹ̀dá àkójọ ìṣiṣẹ́ kan kí o sì gba ìgbékalẹ̀ BTPay Server Docker sílẹ̀:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Igbesẹ 2: Awọn Iyipada Ayika Tita jade

Rọpo `btcpay.example.com` pẹlu agbegbe gidi rẹ:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Tí o bá fẹ́ fi Monero tàbí Litecoin kún un nígbà tó bá yá, o lè fi wọ́n kún un nísinsìnyí:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

O le fi awọn owó tuntun kun nigbakugba nipa gbigbe awọn oniyipada ti o yẹ jade ati tun ṣe igbasilẹ eto naa:

`. ./btcpay-setup.sh -i`

Fún ìtọ́sọ́nà yìí, a ó dojúkọ **Zcash nìkan**.

---

### Igbesẹ 3: Ṣiṣẹ ẹrọ fifi sori ẹrọ naa

Ṣiṣe iwe afọwọkọ eto lati kọ ati ifilọlẹ olupin naa:

`. ./btcpay-setup.sh -i`

Iwe afọwọkọ naa yoo fi awọn igbẹkẹle sori ẹrọ, ṣe ina `docker-compose.yml`, bẹ̀rẹ̀ iṣẹ́, kí o sì túnṣe `systemd`.
Èyí gba tó ìṣẹ́jú márùn-ún.

Ní kete tí ó bá ti parí, àpẹẹrẹ BTPay Server rẹ yóò wà ní:

`https://btcpay.example.com`

> Tí o bá ń ṣe àtúnṣe sí ètò ìṣiṣẹ́ tó wà tẹ́lẹ̀ (fún àpẹẹrẹ, fífi ZEC kún un), rí i dájú pé o dáwọ́ dúró kí o sì tún bẹ̀rẹ̀ sí í lo àwọn ètò tuntun:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Lẹ́yìn náà, tẹ̀síwájú sí apá tó tẹ̀lé láti ṣètò Zcash nínú ìfọwọ́sowọ́pọ̀ wẹ́ẹ̀bù BTCPay Server.



## Ṣiṣẹ́ Kún Kún Zcash Tirẹ̀

Tí o bá fẹ́ kí **kìí** gbẹ́kẹ̀lé gbogbo ènìyàn `lightwalletd` awọn nodes, o le gbe nodes Zcash rẹ ti o kun pẹlu Lightwalletd lori olupin kanna. 
Èyí fún ọ ní **ìdádúró-ẹni-nípa-kíkún** - kò sí ìgbẹ́kẹ̀lé láti òde, kò sí ìgbẹ́kẹ̀lé tí a nílò.

---

### Igbesẹ 1: Rii daju pe o ni aaye to to fun disk

Nọ́mbà Zcash pípé kan (Zebra + Lightwalletd) lọ́wọ́lọ́wọ́ nílò ààyè díìsìkì **300+ GB**, ó sì ń tẹ̀síwájú láti dàgbàsókè.

Ko ṣiṣẹ:

- Ibi ipamọ data ti Zebra blockchain: ~260-270 GB
- Atọka Lightwalletd: ~15-20 GB

#### Ibi ipamọ ti a ṣeduro:

- **400 GB+** tí a bá lo olupin náà **nikan** fún àwọn ìsanwó Zcash
- **800 GB+** tí olupin náà bá tún ń lo BTPay Server, PostgreSQL, Nginx, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ.

> Ó dára láti lo díìsìkì SSD/NVMe pẹ̀lú agbára **1 TB**, pàápàá jùlọ tí o kò bá ní èrò láti gé dátà déédéé.

---

### Igbesẹ 2: Ṣeto Awọn Oniyipada Ayika

Fi àwọn nǹkan wọ̀nyí kún ètò àyíká rẹ láti mú kí ìṣètò gbogbo nódù ṣiṣẹ́:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Èyí yóò ní nínú rẹ̀ `zcash-fullnode` àfọ́, èyí tí ó ṣí àwọn méjèèjì sílẹ̀ `zebrad` àti `lightwalletd` inu BTPay Server.

---

### Igbesẹ 3: Tun-ṣiṣẹ oluṣeto naa

`. ./btcpay-setup.sh -i`

Ìwé ìkọ̀wé náà yóò:

* Ṣe igbasilẹ awọn aworan Docker fun Zebra ati Lightwalletd
* Ṣeto awọn iṣẹ inu akopọ BTCPay
* So afikun Zcash pọ mọ **agbegbe** `lightwalletd` àpẹẹrẹ

> **Ìṣọ̀kan blockchain kíkún lè gba ọjọ́ púpọ̀**, pàápàá jùlọ lórí àwọn olupin VPS tí kò ní ohun èlò púpọ̀.
> Títí tí ìṣiṣẹ́pọ̀ náà yóò fi parí, àwọn ìsanwó tí a dáàbò bò kò ní sí.


## Sísopọ̀ mọ́ Nọ́ńbà Ìmọ́lẹ̀ Ìta

Ní ọ̀pọ̀lọpọ̀ ìgbà, a kò nílò òmìnira pátápátá - àwọn oníṣòwò sì lè má fẹ́ lo àkókò àti ààyè díìkì láti ṣiṣẹ́ ní gbogbo Zcash. 
Nípa àìyẹ̀, BTPay Server so pọ̀ mọ́ gbogbo ènìyàn kan `lightwalletd` node láti ṣe àkóso àwọn ìsanwó tí a dáàbò bò láìgba gbogbo blockchain náà.

Ipari aiyipada naa ni:

`https://zec.rocks:443`

Sibẹsibẹ, o le ṣe atunto BTPay Server lati sopọ mọ **eyikeyi ita gbangba `lightwalletd` node**, bíi:

`https://lightwalletd.example:443`

Apá yìí fi bí a ṣe lè ṣe èyí hàn nípa lílo **àpapọ̀ Docker àṣà**.

> Àpẹẹrẹ ìṣètò pípé pẹ̀lú gbogbo àwọn oníyípadà àyíká wà nínú [ibi ipamọ afikun](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Awọn igbesẹ ni isalẹ fihan eto iṣẹ ti o kere ju.

---

### Igbesẹ 1: Ṣẹda Apakan Docker Aṣa kan

Nínú ìwé àkójọ iṣẹ́ BTPayServer rẹ, ṣẹ̀dá fáìlì àdáni kan:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Fi akoonu wọnyi kun:

```
exclusive:
- zcash
```

Àwọn `exclusive` itọsọna rii daju pe apakan kan ṣoṣo pẹlu aami kanna (`zcash` nínú ọ̀ràn yìí) lè ṣiṣẹ́ ní àkókò kan.
Èyí ń dènà àwọn ìforígbárí ìṣètò - fún àpẹẹrẹ, o kò le ṣiṣẹ́ méjèèjì `zcash-fullnode` àfọ́ àti ìta àdáni yìí `lightwalletd` ìpín ní àkókò kan náà.
Nípa sísàmì sí i gẹ́gẹ́ bí `exclusive: zcash`, BTPay Server yoo mu aiyipada naa kuro laifọwọyi `zcash-fullnode` àti ti inú `lightwalletd` àwọn àpótí, èyí tí ó jẹ́ kí o lè so mọ́ nódù ìta tirẹ dípò.

---

### Igbesẹ 2: Ṣeto Awọn Oniyipada Ayika

Nínú ebute naa:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Igbesẹ 3: Ṣalaye Adirẹsi Node Ita

Ṣí tirẹ `.env` fáìlì:

`nano .env`

Fi ìlà tó tẹ̀lé yìí kún un, kí o sì fi ibi tí o yàn rọ́pò URL náà:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

O le lo:

* **Ibi gbogbo eniyan**, bii `https://zec.rocks:443`
* Nódù ti ara rẹ ti o gbalejo, ti a gbe lọtọ kuro ninu BTPay Server

> Tí ó bá jẹ́ pé òde ni `lightwalletd` di ohun tí kò sí tàbí tí ó kún fún àpọ̀jù, àwọn ìsanwó tí a dáàbò bò yóò kùnà.
> Fún àwọn iṣẹ́ pàtàkì, yan **ìparí tí ó dúró ṣinṣin tí a sì ti fi hàn** (bíi àtúnṣe `zec.rocks`).

> Mo fẹ́ gbàlejò ara mi `lightwalletd`?
> O le lo awọn `docker-compose.lwd.yml` láti inú [Ibi ipamọ Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Ìkìlọ̀:** A kò ṣe àkọsílẹ̀ ètò yìí ní gbangba, ó sì nílò ìṣètò TLS pẹ̀lú ọwọ́, ìfiranṣẹ́ ibùdókọ̀, àti ìṣètò ogiriina - a gbani nímọ̀ràn fún àwọn olùlò tó ti ní ìmọ̀ nípa rẹ̀ nìkan.

---

### Igbesẹ 4: Tun-ṣiṣẹ oluṣeto naa

`. ./btcpay-setup.sh -i`

BTPay Server yoo lo iṣeto aṣa rẹ ki o si sopọ mọ eyi ti a sọ tẹlẹ `lightwalletd` nodulu.

Láti ìsinsìnyí lọ, àfikún Zcash yóò lo ìparí ìta yẹn fún bíbójútó àwọn ìṣòwò tí a dáàbò bò.


## Ṣe àtìlẹ́yìn fún BTPay Server nílé pẹ̀lú Cloudflare Tunnel

Ṣé o fẹ́ gba owó Zcash nígbà tí o ń gbàlejò BTPay Server lórí ẹ̀rọ ilé kan - bíi Raspberry Pi 5 tàbí èyíkéyìí olupin ìbílẹ̀ **láìsí IP àìdúró kan**? 
O le fi apẹẹrẹ rẹ han si intanẹẹti lailewu nipa lilo **Cloudflare Tunnel**.

Ọ̀nà yìí yẹra fún fífi àfikún sí ibudo àti fífi àdírẹ́sì IP gidi rẹ pamọ́ fún gbogbo ènìyàn - nígbàtí ó ń jẹ́ kí olupin rẹ lè wọlé nípasẹ̀ HTTPS.

Ó tún ń ràn ọ́ lọ́wọ́ láti yẹra fún iye owó tí a fi ń yá VPS**, èyí tí ó dára jùlọ tí ìsanwó owó cryptocurrency bá jẹ́ ohun tí a kò lè ṣe dípò ohun tí ó jẹ́ pàtàkì nínú iṣẹ́ rẹ.

---

### Igbesẹ 1: Fi Oju-ọna Cloudflare sori ẹrọ

1. Ṣẹ̀dá àkọọ́lẹ̀ kan ní [cloudflare.com](https://www.cloudflare.com) kí o sì fi domain rẹ kún un.
2. Lórí **olùpèsè ilé** rẹ, fi Cloudflare Tunnel sori ẹrọ:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Ṣe ìjẹ́rìísí pẹ̀lú Cloudflare:

`cloudflared tunnel login`

Àṣẹ yìí yóò ṣí fèrèsé ẹ̀rọ ìṣàwárí. Wọlé kí o sì fún ni láṣẹ láti wọlé sí agbègbè rẹ.
Cloudflare yoo ṣẹda laifọwọyi `credentials` faili pẹlu ami kan lori olupin rẹ.

4. Ṣẹ̀dá ọ̀nà tuntun kan (o le dárúkọ rẹ̀) `btcpay` tabi ohunkohun miiran):

`cloudflared tunnel create btcpay`

Èyí ló ń mú kí `btcpay.json` fáìlì tó ní àmì ìdánimọ̀ àti àwọn ìwé ẹ̀rí - o máa nílò rẹ̀ ní ìgbésẹ̀ tó tẹ̀lé.

---

### Igbesẹ 2: Ṣẹda Faili Iṣeto Tunnel

Ṣẹ̀dá àkójọ ìṣètò (tí kò bá sí) kí o sì ṣí fáìlì ìṣètò náà:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Lẹ́ẹ̀mọ́ ìṣètò wọ̀nyí:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Àlàyé:

* `tunnel` - Orukọ oju eefin ti o ṣẹda tẹlẹ
* `credentials-file` - ipa ọna si faili ami ti a ṣẹda lakoko `cloudflared tunnel login`
* `hostname` - domain rẹ ti forukọsilẹ pẹlu Cloudflare (fun apẹẹrẹ `btcpay.example.com`)
* `service` - adiresi agbegbe ti olupin BTPay rẹ (nigbagbogbo `http://127.0.0.1:80` fún Nginx)

> Cloudflare yoo ṣe aṣoju ijabọ lailewu si olupin agbegbe rẹ, laisi ifihan IP ile rẹ.


### Igbesẹ 3: Fi Igbasilẹ DNS kun fun Oju-ọna Rẹ

Lẹ́yìn tí o bá ti ṣẹ̀dá ihò ojú irin, Cloudflare máa ń fi àkọsílẹ̀ DNS CNAME kún un** láìfọwọ́kàn fún domain rẹ. Ó yẹ kí ó rí báyìí:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Tí kò bá farahàn láìfọwọ́ṣe, fi kún un pẹ̀lú ọwọ́:

1. Lọ sí ọ̀dọ̀ rẹ [Dásíbọ̀ọ̀dù Ìkùukùu](https://dash.cloudflare.com/)
2. Lọ sí abala **DNS**
3. Fi igbasilẹ CNAME tuntun kun:
   - **Orúkọ**: `btcpay`
   - **Àfojúsùn**: `<UUID>.cfargotunnel.com`  
     O le rii iye gangan ninu rẹ `btcpay.json` faili tabi nipa ṣiṣe:
     
     `cloudflared tunnel list`
     
   - **Ipo aṣoju**: Ti mu ṣiṣẹ (awọsanma alawọ ewe)

> Àkọsílẹ̀ yìí yóò mú kí gbogbo àwọn tó béèrè fún un mọ̀ pé `btcpay.example.com` wọ́n máa ń fi àdírẹ́sì IP rẹ pamọ́ fún gbogbo ènìyàn.

---

### Igbesẹ 4: Mu ọna oju irin ṣiṣẹ lori Ibẹrẹ Eto

Láti jẹ́ kí ihò ojú irin náà ṣiṣẹ́ láìfọwọ́sí nígbà tí o bá ń bẹ̀rẹ̀, fi sori ẹrọ gẹ́gẹ́ bí iṣẹ́ ètò kan:

`sudo cloudflared service install`

Lẹhinna mu iṣẹ naa ṣiṣẹ ki o bẹrẹ:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Ṣe àyẹ̀wò ipò náà:

`sudo systemctl status cloudflared`

O yẹ ki o wo ifiranṣẹ kan bi `Active: active (running)` àti ìfìdí múlẹ̀ pé `btcpay.example.com` wà lórí ayélujára.

> Láti ìsinsìnyí lọ, ihò náà yóò bẹ̀rẹ̀ láìfọwọ́sí nígbàkúgbà tí a bá tún bẹ̀rẹ̀, a ó sì lè rí BTCPay Server rẹ gbà - láìsí ìfọ̀rọ̀wérọ̀ ibudo àti láìsí fífi IP gidi rẹ hàn.

---

### Igbesẹ 5: Pari Eto BTPay Server

Tí o bá fẹ́ fi BTPay Server sori ẹrọ fun igba akọkọ, ṣeto domain rẹ ṣaaju ṣiṣe akosile iṣeto naa:

`export BTCPAY_HOST="btcpay.example.com"`

Èyí rí i dájú pé a lo domain tó tọ́ nígbà tí a bá ń ṣe ìṣẹ̀dá ìṣètò **Nginx** àti **àwọn ìwé-ẹ̀rí SSL**.

Tí BTPay Server bá ti fi sori ẹrọ tẹlẹ tí o sì ń fi ọ̀nà ìṣàlẹ̀ kún un:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Eto naa yoo tun awọn atunto ṣe ati lo agbegbe tuntun naa.
O yẹ ki o ni anfani bayi lati wọle si olupin rẹ ni:

`https://btcpay.example.com`

> Bóyá o ń lo ohun gbogbo-gbohungbohun `lightwalletd` tàbí ojú ọpọ́n ara rẹ, èyí kò ní ipa lórí ojú ọpọ́n náà.
> Ohun tó ṣe pàtàkì ni pé BTPay Server ń tẹ́tí sí i lórí `127.0.0.1:80` agbegbe.


## Ṣíṣeto Plugin Zcash nínú Ìbánisọ̀rọ̀ Wẹ́ẹ̀bù BTCPay Server

> **Ṣe pàtàkì fún àwọn ètò ìtajà púpọ̀:** 
> Àpò Zcash tí a ṣètò níbí jẹ́ **àgbáyé** fún àpẹẹrẹ náà. Gbogbo àwọn ilé ìtajà ni yóò lo àpò yìí àyàfi tí o bá lo àwọn àpẹẹrẹ BTPay ọ̀tọ̀ọ̀tọ̀.

Lẹ́yìn tí o bá ti ṣe àṣeyọrí nínú ṣíṣe àgbékalẹ̀ BTPay Server rẹ, o gbọ́dọ̀ ṣe àwọn ìṣètò ìpìlẹ̀ kan nípasẹ̀ ojú-ọ̀nà wẹ́ẹ̀bù admin. 
Ìwé àṣẹ náà fún wa ní àwọn ìtọ́ni ní kíkún ní èdè Gẹ̀ẹ́sì - níbí, a ó rìn lórí àwọn ìgbésẹ̀ pàtàkì àti àfiyèsí pàtàkì lórí ṣíṣètò àfikún Zcash.

---

### Igbesẹ 1: Wọle si Oju opo wẹẹbu

Ṣèbẹ̀wò sí àpẹẹrẹ rẹ ní:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Tẹ iwọle ati ọrọ igbaniwọle alabojuto rẹ sii.
- Tí èyí bá jẹ́ ìgbà àkọ́kọ́ tí o bá wọlé, a ó béèrè fún ọ láti ṣẹ̀dá àkọọ́lẹ̀ kan.
- A ó fún àkọọ́lẹ̀ àkọ́kọ́ tí o bá forúkọ sílẹ̀ ní àǹfààní ìṣàkóso láìfọwọ́sí.

---

### Igbesẹ 2: Fi sori ẹrọ Zcash Plugin

1. Nínú àkójọ àkójọ àkọ́kọ́, lọ sí:

`Plugins -> Browse Plugins`

2. Wa ohun afikun **Zcash (ZEC)**. Lo ọpa wiwa ti o ba nilo.
3. Tẹ **Fi sori ẹrọ** ki o si jẹrisi.

> Tun ilana yii ṣe fun eyikeyi awọn altcoins miiran ti o mu ṣiṣẹ lakoko iṣeto olupin.

Lẹ́yìn tí o bá ti fi sori ẹrọ, tẹ **Tun bẹrẹ olupin** láti tún bẹ̀rẹ̀ ìfọwọ́sowọ́pọ̀ pẹ̀lú àwọn afikún tí ń ṣiṣẹ́.


### Step 3: Connect Your Wallet via Viewing Key

Lẹ́yìn tí o bá ti fi àfikún náà sílẹ̀, apá **Zcash** tuntun kan yóò farahàn nínú àkójọ àwọn ètò.

1. Go to:

`Zcash -> Settings`

2. Paste your **Unified Full Viewing Key (UFVK)** - BTCPay will derive a Unified Address for each invoice and detect incoming shielded payments.

> **Àkíyèsí:** Àwọn bọtini wíwo Legacy Sapling ni a ṣe àtìlẹ́yìn fún, ṣùgbọ́n láti lo Orchard/Unified Addresses, o yẹ kí o pèsè **UFVK**.


   Àpẹẹrẹ ìrísí:

`uview184syv9wftwngkay8d...`

3. Tẹ iye kan sii ni aaye giga Block

* **Ṣètò ìgbà àkọ́kọ́ pẹ̀lú àpò owó tuntun (gbólóhùn irúgbìn tuntun):** tẹ gíga bulọọki Zcash lọ́wọ́lọ́wọ́ (o lè ṣàyẹ̀wò rẹ̀ ní 3xpl.com/zcash) - èyí mú kí wíwò àkọ́kọ́ yára.
* **Ṣíṣí lọ sí orí ẹ̀rọ ìṣiṣẹ́ kan náà láti ìṣètò Sapling-nìkan tí ó ti wà tẹ́lẹ̀ sí Àdírẹ́sì Ìṣọ̀kan / Orchard:** fi pápá yìí sílẹ̀ lófo.
* **Gbígbé ilé ìtajà rẹ lọ sí olupin tuntun pẹ̀lú àpò owó kan náà/UFVK:** o lè fi gíga ìbí rẹ sí i - gíga tó fẹ́rẹ̀ẹ́ tó ti ọjà àkọ́kọ́ tí ilé ìtajà rẹ san (bá ọjọ́ àṣẹ rẹ mu lórí 3xpl láti dín àwòrán náà kù). Tí kò bá dá ọ lójú, fi sílẹ̀ ní òfo.

> Not all wallets support **Unified Full Viewing Key (UFVK)** export yet.  
> Awọn aṣayan ti a ṣeduro: 
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! Wallet (version for PC)**](https://zingolabs.org/)  
> Nínú àwọn àpù méjèèjì, wá UFVK export nínú apá àfikún/ìtajà.

Àwọn kọ́kọ́rọ́ wọ̀nyí ń ṣe àtìlẹ́yìn fún **yíyípo àdírẹ́sì aládàáṣe**, ìtumọ̀ rẹ̀ ni:
- Gbogbo alabara ni a gba adirẹsi isanwo **alailẹgbẹ**
- O ri **iwontunwonsi kanṣoṣo, ti iṣọkan**

O le wa atokọ ibamu gbooro lori [ZecHub -> Awọn apamọwọ](https://zechub.wiki/wallets).

Nígbà tí gbogbo àwọn pápá bá ti kún tán, tẹ **Fipamọ́**.

---

### Ṣe ìdánwò ìṣàn ìsanwó ZEC rẹ

Oriire - apamọwọ Zcash rẹ ti sopọ mọ olupin BTPay bayi.

Jẹ ki a ṣe idanwo kan:

1. Go to:

`Invoices -> Create New`

2. Ṣe ìdánwò ìwé-ẹ̀rí fún iye díẹ̀ ní ZEC.
3. Fi owó ranṣẹ́ láti **àpò owó mìíràn** (kì í ṣe èyí tí a so mọ́ BTPay).
4. Nígbà tí a bá ti rí ìṣòwò náà, ojú ìwé ìwé-ẹ̀rí náà yóò fi ayẹyẹ tí a lè fojú rí hàn.
5. Jẹ́rìí sí i pé ipò ìwé-ìsanwó náà yípadà sí **Sanwó**.

Tí ohun gbogbo bá ṣiṣẹ́ - o ti ṣetán láti fi àwọn ìsanwó ZEC sínú ojú-òpó wẹ́ẹ̀bù rẹ nípa lílo àwọn afikún API tàbí CMS.



## Ṣíṣe àfikún BTPay Server pẹ̀lú ojú òpó wẹ́ẹ̀bù rẹ

Nígbà tí a bá ti so àpò Zcash rẹ pọ̀ mọ́ BTCPay Server, o lè fi ètò ìsanwó náà sínú ojú òpó wẹ́ẹ̀bù rẹ. 
Ọ̀pọ̀lọpọ̀ ọ̀nà ló wà láti ṣe èyí - láti ìwọlé API tààrà sí àwọn afikún tí a ti ṣetán láti lò fún àwọn ìpèsè CMS olókìkí.

---

### Àwọn Àṣàyàn Ìṣọ̀kan

- **Ìṣọ̀kan API** 
  Ó dára fún àwọn ojú-òpó wẹ́ẹ̀bù tàbí àwọn ètò tí a ṣe láìsí CMS. 
  Ó fún ọ ní agbára kíkún lórí ṣíṣẹ̀dá ìwé-ẹ̀rí, títẹ̀lé ìsanwó, àti àwọn ìfitónilétí - gbogbo rẹ̀ wà lábẹ́ ìrísí àti ìlànà rẹ. 
  Ó nílò ìmọ̀ ìpìlẹ̀ nípa ètò ìṣiṣẹ́, nítorí náà, olùgbékalẹ̀ rẹ ló máa ṣe iṣẹ́ yìí dáadáa jùlọ.

- **Awọn afikun CMS** 
  Ó wà fún àwọn ìkànnì bíi **WooCommerce**, **PrestaShop**, àti àwọn mìíràn. 
  Àwọn afikún wọ̀nyí gba ọ láàyè láti gba ìsanwó láàárín ìṣẹ́jú díẹ̀ - kò sí ìbéèrè fún kíkọ.

- **Bọ́tìnì ìsanwó tàbí Iframe** 
  Ọ̀nà tó rọrùn jùlọ. 
  Ó dára fún àwọn ojú ìwé ìbalẹ̀, àwọn ojú ìwé wẹ́ẹ̀bù ti ara ẹni, tàbí èyíkéyìí ojú ìwé tí o fẹ́ fi ìjápọ̀ ẹ̀bùn tàbí ẹ̀rọ ìsanwó sínú.

---

### Ìṣọ̀kan API

Tí o bá ń lo pẹpẹ àṣà kan (tàbí tí o kò bá ní CMS rárá), API ni àṣàyàn tó dára jùlọ. 
Ó fún ọ ní ìyípadà pípé: o lè ṣẹ̀dá àwọn ìwé-ẹ̀rí, tọ́pasẹ̀ ipò wọn, gba àwọn ìfitónilétí, àti ṣàkóso ìrírí olùlò ní kíkún.

> Àkíyèsí: Àní àwọn afikún CMS kan tilẹ̀ máa ń lo API lábẹ́ ìbòjú, nítorí náà ṣíṣẹ̀dá kọ́kọ́rọ́ API ni ìgbà àkọ́kọ́ tí a nílò**, láìka ọ̀nà ìṣọ̀kan rẹ sí.

Igbese ti o tẹle: ṣe ipilẹ bọtini API kan fun ile itaja rẹ ki o bẹrẹ lilo [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) láti kọ́ ìṣọ̀kan rẹ.


### Ṣíṣẹ̀dá Kọ́kọ́rọ́ API kan

Láti so BTPay Server pọ̀ mọ́ ojú òpó wẹ́ẹ̀bù tàbí àpù rẹ, o ní láti ṣe àwárí kọ́kọ́rọ́ API kan.

1. Wọlé sí BTPay Server kí o sì ṣí àkójọ àṣàyàn olùlò **(igun ọ̀tún òkè)
2. Lọ sí **Àwọn Kọ́kọ́rọ́ API**
3. Tẹ **Ṣẹda bọtini API tuntun kan**
4. Tẹ orukọ sii fun bọtini rẹ
5. Nínú abala **Awọn igbanilaaye**, mu ṣiṣẹ:
   - `Can create invoice`
   - `Can view invoice`
   - *(Àṣàyàn)* `Can modify store settings` - nikan ti o ba nilo iṣakoso ipele ile itaja

6. Tẹ **Ṣẹ̀dá**. A ó fi kọ́kọ́rọ́ API ti ara ẹni rẹ hàn - daakọ rẹ kí o sì tọ́jú rẹ̀ dáadáa.

> Kọ́kọ́ yìí fún ọ láyè láti rí àwọn ìwé-ìròyìn ilé ìtajà rẹ. 
> Má ṣe*** pín in ní gbangba tàbí kí o fi hàn án nínú kódì ẹ̀gbẹ́ oníbàárà.

---

### Àpẹẹrẹ: Ṣíṣẹ̀dá Ìwé Ìsanwó nípasẹ̀ API

**Ipari:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Ẹ̀bùn ìbéèrè:**

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

**Ìdáhùn:**

O yoo gba ohun JSON kan pẹlu:

* `invoiceId`
* URL ìsanwó tí o lè fi sí ojú òpó wẹ́ẹ̀bù rẹ tàbí kí o fi ránṣẹ́ sí oníbàárà rẹ

Wo gbogbo ìwé àkọsílẹ̀:
[Greenfield API – Ṣẹ̀dá Ìwé Ìsanwó](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Ṣíṣeto Webhook kan (Àṣàyàn)

Láti gba àwọn ìfitónilétí ní àkókò gidi nígbà tí ipò ìwé-ẹ̀rí bá yípadà (fún àpẹẹrẹ nígbà tí a bá gba ìsanwó):

1. Lọ sí àwọn ètò ìtajà rẹ -> **Webhooks**
2. Fi URL ti opin opin rẹ ti yoo mu kun `POST` Àwọn ìbéèrè láti ọ̀dọ̀ BTPay Server
3. BTPay yoo fi awọn iwifunni ranṣẹ laifọwọyi nigbati a ba san iwe-owo kan tabi ti pari

A ṣe àpèjúwe àwọn ẹrù ìsanwó Webhook àti ìlànà ìgbìyànjú mìíràn nínú [ìwé ìkọ̀wé wẹ́ẹ̀bù tí a fọwọ́ sí](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Àpẹẹrẹ àwọn ìṣọ̀kan wà fún onírúurú èdè ìṣètò nínú àwọn ìwé BTPay àti àwọn ibi ìpamọ́ GitHub.



### Ìṣọ̀kan CMS

BTPay Server n ṣe atilẹyin fun awọn afikun fun awọn eto iṣakoso akoonu olokiki (CMS). 
Ìṣọ̀kan tó dàgbà jùlọ àti èyí tí a ń lò ní gbogbogbòò ni pẹ̀lú **WordPress + WooCommerce**, èyí tó mú kí ó rọrùn láti gba ìsanwó ZEC** láìsí kíkọ kódì**.

---

#### WooCommerce (WordPress)

BTPay Server ṣe atilẹyin fun afikun kan fun WooCommerce ni ifowosi.

Awọn igbesẹ lati ṣepọ:

1. Fi ohun itanna **BTCPay fun WooCommerce** sori ẹrọ lati inu itọsọna afikun WordPress tabi lati GitHub.
2. Nínú àkójọ ìṣàkóso WordPress rẹ, lọ sí:

`WooCommerce -> Settings -> Payments`

3. Wa **BTCPay** ninu atokọ naa ki o tẹ **Ṣeto**
4. Tẹ URL BTPay Server rẹ sii ki o si tẹle awọn ilana aṣẹ 
   (A ṣe iṣeduro ṣiṣẹda bọtini API laifọwọyi)
5. Mu ọna isanwo ṣiṣẹ ki o si fi awọn eto rẹ pamọ

> Àwọn ìtọ́ni tó kún rẹ́rẹ́, àwọn ìdánilẹ́kọ̀ọ́ fídíò, àti àwọn ìtọ́sọ́nà ìṣòro wà nínú ìwé àfikún náà.

O tun yoo ri awọn aṣayan isọdọkan CMS miiran ni apakan kanna ti awọn iwe BTPay.

---

### Bọ́tìnì Ìsanwó tàbí Iframe (Kò sí CMS tàbí API tí a nílò)

Tí o kò bá lo CMS tí o kò sì fẹ́ ṣiṣẹ́ pẹ̀lú API, ọ̀nà tó rọrùn jùlọ láti gba ìsanwó ZEC ni láti fi ìjápọ̀ ìsanwó tàbí widget** sínú ojú òpó wẹ́ẹ̀bù rẹ tààrà.

Ọna yii jẹ o dara fun:

- Àwọn ojú ìwé ìbalẹ̀
- Àwọn ojú òpó portfolio
- Àwọn bulọọgi tàbí àwọn ojú ìwé tí kò dúró
- Àwọn iṣẹ́ àgbékalẹ̀ láìsí olupin backend

---

#### Àṣàyàn 1: Bọ́tìnì Ìsanwó (Ọ̀nà Ìjápọ̀)

1. Nínú BTCPay Server, fi ọwọ́ ṣẹ̀dá ìwé-ìsanwó kan ní apá **Àwọn Ìwé-ìsanwó**
2. Daakọ ọna asopọ isanwo naa, fun apẹẹrẹ:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Fi ìjápọ̀ náà kún HTML rẹ:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Àṣàyàn 2: Ìwé Ìsanwó Tí A Fi Sílẹ̀ (Iframe)

Láti fi ìwé-ẹ̀rí náà hàn tààrà lórí ojú-òpó wẹ́ẹ̀bù rẹ, lo iframe kan:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> O le ṣe àwọ̀ bọ́tìnì tàbí àpótí iframe láti bá àwòrán ojú òpó wẹ́ẹ̀bù rẹ mu - BTCPay Server gba àwọ̀lékè tó rọrùn láti kọ sí ojú ìwé ìwé-ìsanwó.

## Ìparí

Ìtọ́sọ́nà yìí gùn gan-an - ṣùgbọ́n ó kan àwọn apá ìpìlẹ̀ ti sísopọ̀ àwọn ìsanwó Zcash pọ̀ mọ́ BTCPay Server nìkan.

Ìfọwọ́sowọ́pọ̀ BTCPay Server ní iṣẹ́ púpọ̀ ju èyí tí a ti fihàn níbí lọ. Ó ṣe tán, UI wà ní ọ̀pọ̀lọpọ̀ èdè (pẹ̀lú èdè Rọ́síà), èyí tí ó mú kí ó rọrùn láti ṣe àwárí àti láti ṣe àdánwò síwájú sí i.

BTPay jẹ́ irinṣẹ́ tó rọrùn láti lò. O lè:

* Gbalejo ọpọlọpọ awọn ile itaja ominira lori apẹẹrẹ kan
* Ṣàlàyé àwọn ipa àti àṣẹ àdáni fún àwọn ọmọ ẹgbẹ́ - láti ìwò àṣẹ nìkan sí ìṣàkóso gbogbogbòò
* Lo àwọn agbègbè ìkápá àti àmì ìdánimọ̀ tirẹ
* Ṣètò webhooks, àwọn àpò ìfowópamọ́ fallback, àti ìwọ̀lé sí Tor pàápàá
* Ṣètò àwọn ètò ìlọsíwájú bíi àwọn òfin owó-orí, àwọn kódì ìdínkù, àtúnṣe ojú ìwé ìsanwó, àwọn ìdíwọ́ ọ̀nà ìsanwó, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ

A ṣe BTPay gẹ́gẹ́ bí àṣàyàn orísun ṣíṣí sílẹ̀ fún àwọn olùpèsè ìsanwó àárín gbùngbùn. Tí o bá ń fẹ́ gba ìsanwó ZEC àdáni láìsí àwọn aṣojú, pẹpẹ yìí yẹ fún àfiyèsí rẹ pátápátá.

A fẹ́ kí o ṣe àṣeyọrí nípa ṣíṣe àwárí ètò BTCPay àti ṣíṣe àwọn ìsanwó rẹ ní tòótọ́.

## Àwọn ohun àlùmọ́nì

* [Oju opo wẹẹbu osise olupin BTPay](https://btcpayserver.org/)
* [Awọn ibeere ti a maa n beere nipa BTCPay](https://docs.btcpayserver.org/FAQ/)
* [Ibi ipamọ GitHub Server BTPay](https://github.com/btcpayserver/btcpayserver)
* [Àfihàn Mainnet ti olupin BTPay](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Plugin Zcash fun BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Ìtọ́sọ́nà Fífi sori ẹrọ Plugin Zcash](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Àpẹẹrẹ zcash-lightwalletd.custom.yml àdáni](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Fáìlì Ìkọ̀wé Docker Lightwalletd (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Àwọn Ìwé Pàtàkì API BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Ṣẹ̀dá Ojú Ìhò Cloudflare kan](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Àkójọ ìbáramu pẹ̀lú àpò owó Zcash (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd on Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
