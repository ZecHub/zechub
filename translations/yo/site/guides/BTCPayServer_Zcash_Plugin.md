# BTCPay Server pẹlu Atilẹyin Zcash: Itọsọna fifi sori ẹrọ ati isopọpọ ni kikun

BTCPay Server jẹ ki awọn iṣowo ori ayelujara lati gba owo sisan cryptocurrency taara, laisi alagbata tabi olutọju. Itọsọna yii nlọ nipasẹ rẹ ni gbogbo ilana ti siseto olupin BTCPay pẹlu atilẹyin abinibi fun awọn isanwo ipamọ Zcash .

> Àkọsílẹ̀ yìí dá lórí dídípò Zcash sínú BTCPay Server rẹ. 
> O ṣe atilẹyin awọn iṣeto ** kikun node (Zebra) ** ati ** lightwalletd-based setups**.

---

## Àkópọ̀ Àwọn Ohun Tó Wà Nínú Ìwé Yìí

- [Kí nìdí lo BTCPay Server pẹlu Zcash?](#Why-Use-BTCPay-Server-with-Zcash)
- [Bí BTCPay Server ṣe ń ṣiṣẹ́](#How-BTCPay-Server-Works)
- [Ibo Ni Wọ́n Ti Ń Fi Owó Pa Mọ́? Ta Ló Ní Àkọsílẹ̀ Àwọn Ohun Tí Kò Ṣe É Sọ fúnni?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Bii o ṣe le Ṣeto BTCPay Server fun Gbigba Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Ṣíṣiṣẹ́ BTCPay Server pẹ̀lú Ìtìlẹyìn Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Ṣiṣẹ Ọna-Nọmba Zcash Rẹ Kẹhin (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Nísopọ sí Ìkànnì lightwalletd Àjòjì (Àṣètò Oníṣe)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Gbigba BTCPay Server ni Ile pẹlu Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Ṣiṣeto ohun itanna Zcash ninu awọn BTCPay Server Web Interface](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Ṣíṣàtúnṣe BTCPay Server pẹlú Ìkànnì Rẹ](#Integrating-BTCPay-Server-with-Your-Website)
  - [Àkójọpọ API](#API-Integration)
    - [Ṣiṣẹda Àkọlé API kan](#Generating-an-API-Key)
    - [Àpẹẹrẹ: Ṣídá Invoice nípasẹ̀ API](#Example-Creating-an-Invoice-via-API)
    - [Ṣíṣètò Ìkànnì kan](#Setting-Up-a-Webhook-Optional)
  - [Àkójọpọ CMS](#CMS-Integration)
  - [Bọtini Owo tabi Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Ìparí Ọ̀rọ̀](#Conclusion)
- [Àwọn Owó-ìṣúnná owó](#Resources)


---

## Kí nìdí lo BTCPay Server pẹlu Zcash?

Ọjà orí ayélujára ń gba owó-ìpamọ́ sí i. Ó yára, ó kárí àgbáyé, kò sì ní báńkì nínú. Èyí ṣe àwọn oníṣòwò àti onibara láǹfààní. Àmọ́ ohun pàtàkì kan wà tí ọ̀pọ̀ èèyàn ò kíyè sára.

Nigbati o ba n gbe aṣẹ kan, alabara maa n pese alaye ti ara ẹni: orukọ, adirẹsi gbigbe ọkọ ati nọmba foonu. Ti a ba ṣe isanwo nipa lilo blockchain gbangba - bii Bitcoin, Ethereum, tabi awọn owo iduroṣinṣin lori Ethereum tabi Tron - iṣowo naa di wiwu titilai fun itupalẹ.

Ẹnikẹni, paapaa laisi mọ ohun ti a paṣẹ fun, le:

- wo ìgbà tí wọ́n san owó náà àti iye tó jẹ́. 
- láti mọ ibi tí owó náà ti wá àti ibi tó lọ. 
- so adirẹsi cryptocurrency mọ́ ẹni gidi kan tí ó bá jẹ́ pé àpapọ̀ kankan wà (fún àpẹrẹ, imeeli tó túbọ̀ fara hàn tàbí orúkọ ọkọ̀ òkun)

Èyí túmọ̀ sí pé, tí ẹnì kan bá ra nǹkan lọ́nà yìí nìkan, ó lè jẹ́ ká mọ gbogbo bí owó tó ń ná onítọ̀hún ṣe pọ̀ tó.

ó sì tún máa ń ṣiṣẹ́ lọ́nà kejì náà. bí àdírẹ́sì oníṣòwò kan bá ti wà lórí ẹ̀rọ ìnájà, wọ́n á di ẹni tí a lè rí mọ̀. àwọn alátakò àti àwọn olùṣirọ ọmọnìkejì wọn le ṣe àtìlẹyìn fún iye owó táwọn èèyàn san, ìgbésẹ̀ àwọn tó pèsè nǹkan àtàwọn ètò ìṣòwò míì.

### Apapo BTCPay Server ati Zcash le yanju eyi.


BTCPay Server jẹ eto ọfẹ ati ti a ko ni idojukọ fun gbigba awọn sisanwo cryptocurrency. 
Kò sí ìsọ̀rí-ìsanwó kankan, kò sì ní owó kan lọ́wọ́. Gbogbo iye tí wọ́n bá san máa ń lọ tààràtà sínú àpò oníṣòwò náà. 
Eyi le jẹ apamọwọ ti ara ẹni tabi iṣeto multisig laarin agbari kan.

Olùpèsè náà ń bójú tó àwọn iṣẹ́ ìfọ̀rọ̀wérọ:

- n ṣe àdáyọ̀ adirẹsi kan fún àṣẹ kọ̀ọ̀kan. 
- ó máa ń tọpinpin ìgbà tí wọ́n bá gba owó, á sì so kókó náà mọ̀ pẹlú àṣẹ tó fún wọn. 
- ó máa ń fúnni ní ìwé-ìrírí àti ìsọfúnni tó yẹ kó wà nínú rẹ̀. 
- ó pèsè àlàfo ìsanwó fún oníbàárà. 

Ohun gbogbo nṣiṣẹ labẹ iṣakoso ti awọn oniwun itaja, lai gbekele lori kẹta-apá iṣẹ.

Zcash jẹ cryptocurrency ti a kọ lori awọn ẹri-imọ-nọmba. O ṣe atilẹyin awoṣe iṣowo ikọkọ ni kikun. 
Nigbati o ba nlo awọn adirẹsi ti a fi bo (ni bayi ni rọọrun pe addresses), oluranṣẹ, olugba ati iye iṣowo ko han lori blockchain.

Nípa àwọn ilé ìtajà orí ayélujára, èyí túmọ̀ sí:

- Olùtajà lè parí ìsanwó láìfi ìtàn ìṣúnná owó wọn hàn. 
- Olùtajà gba owó láìfi àdírẹ́sì, iye tí wọ́n tà tàbí ọ̀nà ìforúkọsílẹ̀ wọn hàn 
- Kò sí olùṣàmúlò àjèjì tó lè so owó náà mọ́ àṣẹ tàbí àwọn ìsọfúnni oníbàárà.

### Àpẹẹrẹ Tó Ṣeé Tẹ̀ Lé

Olumulo kan gbe aṣẹ ati yan Bitcoin tabi USDT bi ọna isanwo. 
Ojú-ìkànnì náà máa ń mú àdírẹ́sì ìsanwó kan jáde, ó sì máa ń fi iye tó yẹ kó o san hàn. 
Lẹ́yìn tí wọ́n bá ti sanwó náà tán, a máa ń fi àdírẹ́sì yìí sínú àkáǹtì ìsọfúnni tó wà nínú ẹ̀rọ ìgbàlódé. 
Olùkọ̀ lù ní láti so àṣẹ kan mọ́ adirẹsi náà kí ó lè rí gbogbo ìtàn ìnáwó rẹ.

Wàyí o, ẹ fojú inú wo bí nǹkan ṣe máa rí fún Zcash. 
BTCPay Server máa ń dá àdírésì tí a fi ààbò bo sílẹ̀. Olùtajà náà á rán owó-ìsanwó lọ síbi tó yẹ kó wà. 
Láti ojú ìwòye blockchain, kò sí nǹkan tó ṣẹlẹ̀. Kò si ìsọfúnni fún gbogbo ènìyàn láti ṣe àgbéyẹ̀wò rẹ̀. 
Olùpèsè náà gba ìmúdájú, ó so mọ́ àṣẹ náà, àti parí ìgbésẹ̀.

Lójú ẹni tí kò mọ̀ nípa ọ̀ràn náà, ó dà bíi pé nǹkan kan ò ṣẹlẹ̀. 
Gbogbo ohun tó bá yẹ kó ṣẹlẹ̀ ló máa ń wáyé láàárín ilé ìtajà àti oníbàárà.

Ìdáhùn yìí kò fi ìmúṣẹ tàbí lílò ṣe pàṣán. 
Gbogbo nǹkan ń ṣiṣẹ́ bákan náà bíi ti àwọn owó-ìpamọ̀ mìíràn, láìsí ewu ìsókè data.



## Bí BTCPay Server ṣe ń ṣiṣẹ́

BTCPay Server n ṣiṣẹ bi ọna ṣiṣe sisan laarin pẹpẹ e-commerce rẹ ati blockchain. Eyi ni bii ṣiṣan naa ṣe n ṣiṣẹ:

1. **Oníbà á ṣe ìfilọ́lẹ̀** lórí ojúlé ayélujára rẹ (bíi WooCommerce, Magento tàbí orí àtẹ mìíràn tí ó ní BTCPay nínú).

2. ** Ile itaja beere fun iwe-owo owo sisan** lati BTCPay Server. Olùgbéejáde náà ṣe àtúnṣe àkọsílẹ̀ kan tí ó ní:
   - Iye tí a pàṣẹ fúnni
   - Àkọsílẹ̀ àkókò ìyípadà.
   - A Zcash Unified Address (UA) - e.g., `u1...` - tí ó ní àwo Orchard (ìdènà) gbà-áfún bí a ti ṣe é.

3. **Oníbà á wo ojúewé ìsanwó** yóò sì fi ZEC ránṣẹ́ sí àdírésì tí ó fún un.

4. **BTCPay Server n ṣetọju blockchain**, ti o ṣe ayẹwo isanwo naa lodi si:
   - Iye tí a retí láti gbà
   - Adirẹsi tí a fi ń gba ìwé náà.
   - Àmì àkókò tí wọ́n fi ṣe àkájọ owó orí náà.

5. **Nígbà tí wọ́n bá rí ìnáwó náà, kí wọn sì fọwọ́ sí i**, BTCPay á sọ fún ilé-ìtajà.

6. **Oníbà á gba ìmúdájú owó.** Bí ó bá wù ú, olùgbà lè fi àkáǹtì ránṣẹ́ nípa ẹ̀rọ-ìfìwéránṣẹ́.

Gbogbo ètò yìí ló ń wáyé ní àtúnyẹ̀wò, láìsí alárinà tàbí olùtọ́jú. 
BTCPay Server kò ní owó kankan - ó kàn so ètò ìfilọ́lẹ̀ náà mọ́ blockchain lọ́nà ààbò àti láìsí ìdánilójú.
## Ibo Ni Wọ́n Ti Ń Fi Owó Pa Mọ́? Ta Ló Ní Àkọsílẹ̀ Àwọn Ohun Tí Kò Ṣe É Sọ fúnni?

BTCPay Server kìí ṣe àpòòwé àti kò nílò àwọn kókó ìkọ̀ǹkà. 
Gbogbo owó lọ ** taara** si apamọwọ ti oniṣowo. A ṣe idaniloju aabo nipa lilo a ** wiwo ọna-ọna ipilẹ bọtini ** .

### Bí Ó Ṣe Ń Ṣiṣẹ́

- **A ti dá àpò náà sílẹ̀ ṣáájú.** 
  Onisowo naa lo apamọwọ Zcash ti o ṣe atilẹyin awọn bọtini wiwo - gẹgẹbi: [Zkool](https://github.com/hhanh00/zkool2/) or [Zingo! Wallet](https://zingolabs.org/).  
  Àtòjọ tó kún rẹ́rẹ́ wà níbí: [ZecHub.wiki (ì í ì ë ¤)](https://zechub.wiki/wallets).

- **BTCPay Server ń so pọ̀ nípasẹ̀ kókó ìwòran.** 
  A view bọtini jẹ a **ka-nikan bọtini**: o le ri wọle owo ati ki o ṣẹda titun gbigba awọn adirẹsi, 
  ṣùgbọ́n kò lè ná owó. Olùgbàṣe náà kì í fi àwọn ọ̀rọ̀-ìmọ tàbí kókó ìkọ̀ǹkà pamọ́.

- **Awọn data blockchain ni wiwọle nipasẹ a `lightwalletd` olùrànlọ́wọ́.** 
  O le lo a gbangba node bi `https://zec.rocks`, tàbí kó o máa dá ṣe é. `Zebra + lightwalletd` kí gbogbo wọn lè ní òmìnira pátápátá.

- **Ohun gbogbo ni a máa ń fi adirẹsi kan tó ṣàrà ọ̀tọ̀ sí.** 
  Awọn bọtini wiwo gba olupin laaye lati fa awọn adirẹsi Zcash tuntun ti o ni aabo fun gbogbo iwe-owo, 
  kíkó ààbò sí ìsókè àti dídènà lílo àdírẹ́sì padà.

- **O ní àṣẹ lórí owó náà.** 
  Bí wọ́n bá tiẹ̀ ti fójú òǹkàwé náà, kò séèyàn tó lè jí owó rẹ - àyàfi metadata tí wọ́n fi ń sanwó nìkan ló máa fara hàn.

Àwòrán yìí ya àwọn ohun èlò ìkọ́lé kúrò lára àkóso lórí ọjà. 
O le ṣe imudojuiwọn, gbe lọ síbi tí ó yẹ tàbí tún BTCPay Server gbé kalẹ̀ láì fi owó kankan sínú ewu.

## Bii o ṣe le Ṣeto BTCPay Server fun Gbigba Zcash

Ninu awọn abala ti tẹlẹ, a ṣalaye bi BTCPay Server ṣe n ṣiṣẹ pẹlu Zcash ati idi ti o fi jẹ pataki fun awọn sisanwo fifipamọ aṣiri. Bayi ni akoko lati gba ọwọ lori.

Àwọn nǹkan bíi mélòó kan ló máa pinnu bí o ṣe fẹ́ kí ilé rẹ rí:

- Ṣé o ti ní àpẹẹrẹ BTCPay Server?
- Ṣe o fẹ lati lo lightwalletd ti gbogbo eniyan tabi ṣiṣe akopọ kikun tirẹ?
- Ṣé server náà yóò ṣiṣẹ lórí VPS tàbí ní ilé?

Orí yìí ń bo gbogbo ìṣẹ̀lẹ̀ ìṣètò tí ó wà nísinsìnyí - láti àwọn ètò díẹ̀ títí dé lílo ohun tó bá jẹ́ ti ìjọba.

A ó máa gbé àwọn kókó tó tẹ̀ lé e yìí yẹ̀ wò:

- Bii o ṣe le gbe ohun gbogbo lati ibẹrẹ lori VPS, pẹlu awọn akopọ kikun (Zebra)
- Bii o ṣe le ṣiṣẹ BTCPay Server ni ile lakoko ti o n tọju IP rẹ farapamọ nipa lilo ** Cloudflare Tunnel**
- Bii o ṣe le mu ati tunto atilẹyin Zcash laarin wiwo wẹẹbu BTCPay Server
- Bii o ṣe le ṣopọ BTCPay pẹlu oju opo wẹẹbu rẹ tabi itaja ori ayelujara


## Ṣíṣiṣẹ́ BTCPay Server pẹ̀lú Ìtìlẹyìn Zcash

Jẹ ki a lọ si iṣeto gangan. Ni apakan yii, awa yoo fi sori ẹrọ BTCPay Server pẹlu atilẹyin Zcash - boya lori VPS tuntun tabi nipa fifi atilẹyin ZEC kun fun apẹẹrẹ ti o wa tẹlẹ.

Ti o ba ti ni BTCPay Server nṣiṣẹ tẹlẹ (fun apẹẹrẹ fun BTC tabi Lightning), iwọ ko nilo lati tun ohun gbogbo ṣe - kan mu afikun ZEC ṣiṣẹ.

A yoo rin nipasẹ orisirisi awọn iṣeto, lati kere setups lilo kan gbangba `lightwalletd` kókó sí àwọn ìmúṣẹ tí ó ní àkóso pátápátá pẹ̀lú kọ́ńsù rẹ. 
Aṣayan ti o dara julọ da lori ipo olupin rẹ ati iye ominira ti o fẹ lati inu amayederun ita.

> Àkọsílẹ̀ àfikún: 
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Ìkìlọ̀ - àpò kan fún ẹyọ kọ̀ọ̀kan:** 
> Àwòrán-ìdílé Zcash ńlo àpòòwò kan tí a pín káàkiri gbogbo ilé ìtajà ní BTCPay. 
> Bí o bá gba oríṣiríṣi ilé ìtajà tí ó wà ní ẹ̀ka kan, wọ́n á pín àpò Zcash náà. 
> Lo àwọn àdáni tó yàtọ̀ bí o bá nílò ìyàsọ́tò́ apamọwọ tí ó ṣe kókó.

---

### Àtòjọ VPS tí a dábàá

Ṣaaju ki o to fi sori ẹrọ, rii daju pe o ni:

- VPS kan pẹlu ** Ubuntu 22.04+**
- Orukọ ìkápá tí ó tọka sí àdírẹ́sì IP ààrò rẹ (nípasẹ̀ DNS)
- `git`, `docker`, àti `docker-compose` tí a fi síbi ìtòlẹ́sẹẹsẹ náà.
- Àwòrán SSH sí àwọn ààrò náà.

---

## Ṣíṣètò Olùránṣẹ Rẹ (apá tí a fi pamọ́)

<details>
  <summary>Click to expand</summary>

Lati gbe BTCPay Server pẹlu atilẹyin Zcash, iwọ yoo nilo awọn atẹle:

### 1. VPS pẹlu Ubuntu 22.04 tabi tuntun

A dábàá pé kí o lo ìfiwéra tí ó kéré jùlọ ti Ubuntu Server 22.04 LTS. 
Olùpèsè VPS èyíkéyìí tí ó bá pèsè àdírẹ́sì IP tó ya ara rẹ̀ sí mímọ́ yóò ṣiṣẹ́. 

**Àwọn ohun tí kò kéré jù lọ tó yẹ kó wà nínú rẹ̀**: 
- 2 àwọn ìkànì CPU 
- 4 GB RAM ì 'ì í ë ¤ë¥'ê3 
- 40 GB àyè disk 

Àtòjọ yìí tó bí o bá ń lo lightwalletd fún Zcash. 
Ti o ba gbero lati ṣiṣẹ ** kikun Zcash node, iwọ yoo nilo ni *o kere ju 300 GB ti aaye disk ọfẹ.

---

### 2. Orukọ ìkápá tí ó tọka sí ààrò rẹ

Ninu awá" n DNS olupese ká dasibodu, á1£áo1da a `A` àkọsílẹ̀ fún àdúgbò-ìpín kan 
(e.g. `btcpay.example.com`) ti o tọka si adirẹsi IP VPS rẹ. 

A ó lo ìkápá yìí láti wọlé sí BTCPay Server látorí aṣàwákiri náà. 
àti láti ṣe àdájáde ìwé-ẹ̀rí SSL lóòrèkóórè nípasẹ̀ Let's Encrypt.

---

### 3. SSH ìwífún sí àwọn ìránṣẹ́ náà

Lati fi BTCPay Server sori ẹrọ, o gbọdọ sopọ si VPS rẹ nipasẹ SSH. 
Láti orí òpó rẹ, tẹ̀lé:

`ssh root@YOUR_SERVER_IP`

Ti o ba lo macOS, Linux tabi WSL lori Windows, SSH ti wa tẹlẹ ninu ebute naa.
Lori Windows ti o rọrun, lo SSH client bi **PuTTY**.

---

### 4. Fi Git, Docker àti Docker Kọ́sípò sori ẹrọ

Lẹ́yìn tí o bá ti so pọ̀ nípasẹ̀ SSH, ṣe àtúnṣe àwọn ìdìpọ̀ ètò rẹ kí o sì fi àwọn ohun èlò tó yẹ sínú:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Lori Ubuntu 22.04 ati tuntun, `docker-compose` kò ní sí àyè fún lílo àwọn èròjà yìí mọ́.
> Àpò tí a dábàá ni: `docker-compose-plugin`, tí ó pèsè àwọn ìsọfúnni tó ṣe kókó yìí: `docker compose` àṣẹ (kíyè sí àlàfo dípò àmì ìsín).

Àyíká ààrò rẹ ti ṣetan báyìí fún gbígbé BTCPay Server kalẹ̀.

</details>

---

### Igbese 1: Ṣẹda Ibi ipamọ́ náà

Ṣẹda itọsọna iṣẹ ati gba igbasilẹ BTCPay Server Docker deployment:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Ìgbésè 2: Àwọn Àyíká Ètò-ìṣèlú Tí A Ń Gbé Kúrò Lára

Gbépò rẹ̀ padà. `btcpay.example.com` pẹlu agbegbe rẹ gangan:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Bí o bá fẹ́ fi Monero tàbí Litecoin kún un nígbà tí ó yá, ìwọ lè mú wọn wọlé nísinsin yìí:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

O le fi owó tuntun kun nigbakugba nipa gbigbe awọn oniyipada ti o yẹ ati ṣiṣe atunṣe eto iṣeto:

`. ./btcpay-setup.sh -i`

Fun itọsọna yii, a yoo fojusi lori **Zcash nikan**.

---

### Igbese 3: Ṣiṣẹ Ẹrọ-ìfi sori ẹrọ naa

Ṣiṣẹ̀ àdàkọ ìsopọ́ láti kọ àti ṣíṣẹ́-òpó:

`. ./btcpay-setup.sh -i`

Awọn iwe afọwọkọ yoo fi sori ẹrọ dependencies, ṣẹda awọn `docker-compose.yml`, bẹrẹ awọn iṣẹ, ati tunto `systemd`.
Ó máa gbà tó ìṣẹ́jú márùn-ún.

Lọgan ti o ba pari, ẹda BTCPay Server rẹ yoo wa ni:

`https://btcpay.example.com`

> Ti o ba n ṣe atunṣe fifi sori ẹrọ ti tẹlẹ (fun apẹẹrẹ fifi ZEC kun), rii daju lati da duro ati tun bẹrẹ olupin pẹlu awọn eto tuntun:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Lẹhinna tẹsiwaju si abala ti n bọ lati tunto Zcash ni wiwo wẹẹbu BTCPay Server.



## Ṣiṣẹ Ọna-Nọmba Zcash Rẹ Pẹrẹrẹ rẹ

Bí o bá fẹ́ **má ṣe** gbára lé àwọn aráàlú, `lightwalletd` awọn nodu, o le gbe gbogbo Zcash node rẹ pọ pẹlu Lightwalletd lori olupin kanna. 
Èyí á fún ọ ní **ìdarí-ara ẹni pátápátá** - kò sí ìfiwéra kankan, wọn ò sì nílò gbígbára lé ẹ.

---

### Ìgbésè 1: Rii daju pe O ni Àyè Tó Pọ̀ Lórí Dísíkì Rẹ

A kikun Zcash node (Zebra + Lightwalletd) Lọwọlọwọ nilo ** 300+ GB** ti disk aaye, ati awọn ti o tesiwaju lati dagba.

Ìpín:

- Àkọsílẹ̀ ìsopọ́ Zebra: ~260-270 GB
- Lightwalletd ìfiwéra: ~15-20 GB

#### Àkọsílẹ̀ ìpamọ́:

- **400 GB+** ti o ba jẹ pe olupin naa lo **nikan** fun awọn sisanwo Zcash.
- **800 GB+** ti o ba jẹ pe olupin naa tun nṣiṣẹ BTCPay Server, PostgreSQL, Nginx, ati bẹbẹ lọ.

> O dara julọ lo disiki SSD/NVMe pẹlu agbara **1 TB**, paapaa ti o ko ba gbero lati ṣajọ data nigbagbogbo.

---

### Igbese 2: Ṣeto Awọn iyipada Ayika

Fi ohun tí ó tẹ̀lé sí àyíká rẹ láti mú kí ìtòlẹ́sẹẹsẹ òpó náà kún:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Èyí yóò ní àwọn ìsọfúnni tó wà nínú: `zcash-fullnode` ìkápá, eyi ti o se igbekale mejeeji `zebrad` àti pé, `lightwalletd` inu BTCPay Server.

---

### Ìgbésẹ̀ 3: Tún Ṣiṣẹ́ Àtúnṣe-ìṣàmúlò náà

`. ./btcpay-setup.sh -i`

Àkọsílẹ̀ náà yóò:

* Ṣe igbasilẹ awọn aworan Docker fun Zebra ati Lightwalletd
* Ṣeto awọn iṣẹ inu BTCPay stack
* So ohun itanna Zcash pọ̀ mọ́ àdúgbò rẹ. `lightwalletd` àpẹẹrẹ

> **Iṣọkanpọ blockchain ni kikun le gba awọn ọjọ pupọ**, paapaa lori awọn olupin VPS ti o kere si orisun.
> Títí dìgbà tí ìṣọ̀kan náà bá parí, àwọn ìsanwó ààbò kò ní sí.


## Sopọ si Ẹrọ Lightwalletd ti ita kan

Ni ọpọlọpọ igba, a ko nilo ominira ni kikun - ati awọn oniṣowo le ma fẹ lati lo akoko ati aaye disk ṣiṣe akopọ Zcash pipe. 
Nipa aiyipada, BTCPay Server so si a gbangba ti o baamu lati awọn oniwe-aaye. `lightwalletd` node lati mu awọn sisanwo ti o ni aabo laisi gbigba gbogbo blockchain.

Aṣayan ipari ti o jẹ:

`https://zec.rocks:443`

Sibẹsibẹ, o le tunto BTCPay Server lati sopọ si ** eyikeyi ita `lightwalletd` node**, irú bíi:

`https://lightwalletd.example:443`

Apá yìí fi bí a ṣe lè se èyí hàn nípa lílo ìkápá Docker àdáni.

> A pipe config apẹẹrẹ pẹlu gbogbo ayika awọn oniyipada wa ni o wa ninu awá" n ti a á1£e. [àpamọ́ ìsọfúnni-ìṣamùráńtán](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Àwọn ìgbésẹ̀ tó wà nísàlẹ̀ yìí fi bí nǹkan ṣe máa ń rí lára hàn.

---

### Igbese 1: Ṣẹda Ẹya Docker Àdáni kan

Ninu itọsọna iṣẹ BTCPayServer rẹ, ṣẹda faili apa kan ti o ṣe adani:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Fi akoonu ti o tẹle sii:

```
exclusive:
- zcash
```

Àwọn ohun tó ń ṣẹlẹ̀: `exclusive` ìsọfúnni kan ṣoṣo tó ní àmì náà (`zcash` nínú ọ̀ràn yìí) lè máa ṣiṣẹ́ ní ẹyọ kan.
Eleyi yago fun iṣeto rogbodiyan - fun apẹẹrẹ, o ko le ṣiṣe awọn mejeeji ti awọn `zcash-fullnode` àlàfo àti àṣà yìí ti ìta `lightwalletd` ó máa ń tú ká lẹ́ẹ̀kan náà.
Nípa kíkọ ó sí: `exclusive: zcash`, BTCPay Server yoo laifọwọyi mu awọn aiṣedeede ti o wa ni ipo. `zcash-fullnode` àti ti inú ilé. `lightwalletd` àwọn ìlépa, tí ó jẹ́ kí o lè so pọ̀ mọ́ àlàfo rẹ níta dípò.

---

### Igbese 2: Ṣeto Awọn iyipada Ayika

Ní ibùdó:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Igbese 3: Ṣalaye Adirẹsi Nọ́dọ̀ Àgbàáyé

Ṣí àwọn àlàfo rẹ sílẹ̀. `.env` Àpamọ́:

`nano .env`

Fi ìlà yìí kún, fi àyè tí o yàn sípò URL:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

O lè lo:

* A ** gbangba node**, gẹgẹ bi awọn ti o ba wa ni a npe ni "a" tabi "b". `https://lightwalletd.zcash-infra.com`
* Rẹ ara-gbalejo node, deployed lọtọ lati BTCPay Server

> Bí àwọn àyè ìta bá wà, `lightwalletd` kò bá sí níbì kankan tàbí kó pọ̀ jù, àwọn ìsanwó tí a fi ààbò bo ara wọn yóò kùnà.
> Fun awọn iṣẹ pataki, yan ** iduroṣinṣin ati idanwo opin** (bi aiyipada ti o wa ni isalẹ) `zec.rocks`).

> Fẹ́ láti gba àlejò fúnra rẹ̀ `lightwalletd`?
> O lè lo àwo n ìkànnì náà. `docker-compose.lwd.yml` láti inú àwọn [Àkójọ Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Ìkìlọ̀:** Ìṣètò yìí kò sí nínú ìwé tí a fi ṣe àdàkọ rẹ, ó sì gba ìsopọ TLS ọwọ́-ọwọ́, fífi ibudo ránṣẹ́ àti ìṣàkóso firewall - èyí ni wọ́n dábàá fún àwọn oníṣe tó ti dàgbà.

---

### Ìgbésẹ̀ 4: Tún Ṣiṣẹ́ Àtúnṣe-ìṣàmúlò náà

`. ./btcpay-setup.sh -i`

BTCPay Server yoo lo rẹ aṣa config ati ki o sopọ si awọn ti a ṣalaye `lightwalletd` ìsọ̀rí.

Láti ìsinsìnyí lọ, ohun-ìṣamúlẹ̀ Zcash yóò lo ibi tí ó wà ní òde náà fún ṣíṣe àwọn ìṣòwò ààbò.


## Gbigba BTCPay Server ni Ile pẹlu Cloudflare Tunnel

Ṣé o fẹ́ gba owó Zcash nígbàtí ó ń gbé BTCPay Server lórí ẹ̀rọ ilé - bíi Raspberry Pi 5 tàbí èyíkéyìí nínú àwọn sẹẹri àdúgbò **láìsí IP dídúró**? 
O le fi ààbò tú àpẹrẹ rẹ sí orí ayélujára nípa lílo ** Cloudflare Tunnel**.

Ọna yii yago fun gbigbe ọkọ oju-irin ati pamọ adirẹsi IP gidi rẹ lati ọdọ gbogbo eniyan - lakoko ti o n tọju olupin rẹ ni iraye si nipasẹ HTTPS.

Ó tún ń ràn ọ́ lọ́wọ́ láti yẹra fún ìnáwó VPS, èyí tó dára bí owó cryptocurrency bá jẹ ohun tí o fẹ́ dípò kó jẹ́ ìpìlẹ̀ iṣẹ rẹ.

---

### Igbese 1: Fi sori ẹrọ Cloudflare Tunnel

1. Ṣẹda àkọọ́lẹ̀ ní: [cloudflare.com (ì í ì ë ¤)](https://www.cloudflare.com) kí o sì fi àdúgbò rẹ kún un.
2. Lori rẹ ** ile server**, fi sori ẹrọ Cloudflare Tunnel:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Ṣẹri idanimọ pẹlu Cloudflare:

`cloudflared tunnel login`

Àṣẹ yìí yóò ṣí wíńdò aṣàwákiri. Wọlé àti fún àṣẹ wọ̀nà sí ìkápá rẹ.
Cloudflare yóò dá ẹ̀rọ-ìmọ́lẹ̀ àdáni sílẹ̀. `credentials` faili pẹlu ami kan lori olupin rẹ.

4. Ṣẹda eefin tuntun (o le sọ ọ́ ni orúkọ rẹ) `btcpay` tàbí ohunkóhun mìíràn):

`cloudflared tunnel create btcpay`

Èyí ń dá a sílẹ̀ ní ìlàjì. `btcpay.json` fáìlì tó ní ìdánimọ́ ojú ọ̀nà àti àwọn ìsọfúnni - o máa nílò rẹ nínú ìgbésẹ̀ tí ó tẹ̀lé e.

---

### Igbese 2: Ṣẹda faili iṣeto eefin naa

Ṣẹda itọsọna iṣeto (ti ko ba si tẹlẹ) ki o ṣii faili config:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Fi ìtòlẹ́sẹẹsẹ yìí sínú:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Àlàyé:

* `tunnel` - orúkọ ọ̀nà abẹ́rẹ́ tí o dá níṣàájú
* `credentials-file` - ipa-ọna si faili ami ti a ṣẹda lakoko ṣiṣe awọn ohun elo. `cloudflared tunnel login`
* `hostname` - ìkápá rẹ tí a forúkọsílẹ̀ pẹlú Cloudflare (bíi. `btcpay.example.com`)
* `service` - adirẹsi agbegbe ti BTCPay Server rẹ (nigbagbogbo ni a npe ni AddressCentral) `http://127.0.0.1:80` fún Nginx)

> Cloudflare yóò ṣe àgbékalẹ̀ ìsọfúnni lọ́nà tí ó ní ìdánilójú sí àwọn sẹẹfù rẹ, láì fi IP ilé rẹ hàn.


### Igbese 3: Fi Àkọsílẹ̀ DNS kan kún fún Ọnà Ìpín rẹ

Lẹ́yìn tí o bá ti dá ọ̀nà náà, Cloudflare yóò fi àkọsílẹ̀ CNAME DNS kún un fún ìkápá rẹ. Ó yẹ kí ó rí bí èyí:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Ti o ko ba han laifọwọyi, fi sii ni ọwọ:

1. Lọ sí ilé rẹ. [Àpótí Ìdarí Cloudflare](https://dash.cloudflare.com/)
2. Yíyára lọ sí abala **DNS**
3. Fi àkọọlẹ CNAME tuntun kan kún un:
   - ** Orúkọ**: `btcpay`
   - Àfojúsùn: `<UUID>.cfargotunnel.com`  
     O lè rí iye tó péye nínú ìwé rẹ. `btcpay.json` faili tabi nipa ṣiṣe:
     
     `cloudflared tunnel list`
     
   - **Ìṣirò aṣojú**: A ti fàyè gba (àwọsánmà aláwọ̀ osan)

> Àkọsílẹ̀ yìí ń rí i dájú pé gbogbo àwọn ìbéèrè sí àjọ-ìpèsè ààbò ti wọlé dédé. `btcpay.example.com` A máa ń darí wọn nípasẹ̀ Àkọ́lé Cloudflare, tí ó fi ojúlówó IP rẹ pamọ fún gbogbo ènìyàn.

---

### Igbese 4: Ṣiṣẹ Tunẹli lori Ibẹrẹ Eto

Lati jẹ ki eefin naa ṣiṣẹ laifọwọyi ni igbesoke, fi sori ẹrọ bi iṣẹ eto:

`sudo cloudflared service install`

Lẹhinna mu iṣẹ naa ṣiṣẹ ki o bẹrẹ:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Ṣayẹwo ipo:

`sudo systemctl status cloudflared`

O yẹ ki o ri ifiranṣẹ bi: `Active: active (running)` àti ìmúdájú pé: `btcpay.example.com` ó wà lórí íńtánẹ́ẹ̀tì.

> Láti ìsinsìnyí lọ, ọ̀nà náà yóò bẹ̀rẹ̀ nídìí-ara ẹni nígbàkigbà tí a bá tún un ṣe, àti BTCPay Server rẹ ni ó máa wà fún gbogbo ènìyàn - láìsí títún port ránṣẹ́ àti láìfi IP gidi rẹ hàn.

---

### Igbese 5: Ṣeto BTCPay Server ni ipari

Ti o ba fẹ fi BTCPay Server sori ẹrọ fun igba akọkọ, ṣeto agbegbe rẹ ṣaaju ṣiṣe iwe afọwọkọ iṣeto:

`export BTCPAY_HOST="btcpay.example.com"`

Eyi ni idaniloju pe a lo agbegbe ti o tọ nigbati iṣelọpọ **Awọn ipo Nginx** ati awọn iwe-ẹri SSL.

Ti o ba ti fi BTCPay Server sori ẹrọ tẹlẹ ati pe iwọ n ṣafikun eefin naa:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Ìmúrasílẹ̀ náà yóò tún ìtòlé́sẹẹsẹ ṣe, kí ó sì lo àdúgbò tuntun.
O yẹ ki o le wọle si olupin rẹ ni bayi:

`https://btcpay.example.com`

> Bóyá o ń lo àpapọ̀ ìsọfúnni tó wà fún gbogbo ènìyàn tàbí kò sí. `lightwalletd` tàbí kí o ṣe àtúnṣe sí gbogbo ìlà náà, èyí kò ní ipa lórí ọ̀nà abẹ́rẹ́.
> Gbogbo ohun ti o ni pataki ni wipe BTCPay Server wa n tẹtisi lori `127.0.0.1:80` ní àdúgbò.


## Ṣiṣeto ohun itanna Zcash ninu awọn BTCPay Server Web Interface

> **Ó ṣe pàtàkì fún àwọn ilé ìtajà tí ó ní ọ̀pọ̀lọpọ̀:** 
> Àpò Zcash tí a ṣe àdàkọ níbí jẹ́ **global** fún ìṣẹ̀lẹ̀ náà. Gbogbo ilé-ìtajà yóò lo àpò yìí láìjẹ́ pé o ṣiṣẹ́ àwọn àpẹẹrẹ BTCPay lọtọ.

Lẹ́yìn tí o bá ti fi aṣeyọri ṣe ìmúṣẹ BTCPay Server rẹ, wàá nílò láti se àwọn àtúnṣe dídára kan nípasẹ̀ admin web interface. 
Àwọn ìwé ìtọ́ni tó wà nílẹ̀ gẹ̀ẹ́sì fún wa láwọn àlàyé kíkún - a ó ṣe àwọn ìgbésè tí kò ṣeé fọwọ́ yẹpẹrẹ mú, ká sì tẹjú mọ́ bí o ti lè ṣètò ohun-ìṣiṣẹ́ Zcash.

---

### Ìgbésẹ̀ 1: Ṣíwọlé sí orí-ayé ìkànnì rẹ.

Ṣabẹwo si ẹda rẹ ni:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Fi ìwásílẹ̀ àti ọ̀rọ̀-ìfiwọlé olùdarí rẹ sínú.
- Bí èyí bá jẹ́ ìgbà àkọ́kọ́ tí o wọlé, a ó sọ fún ọ láti dá àkáǹtì kan.
- Àkọsílẹ̀ àkọ́kọ́ tí o bá forúkọ sílẹ̀ yóò gba àwọn ẹtọ olùdarí.

---

### Igbese 2: Fi ohun itanna Zcash sori ẹrọ

1. Ninu akojọ aṣayan akọkọ, lọ sí:

`Plugins -> Browse Plugins`

2. Wá ìmúkúrò Zcash (ZEC) tí o bá nílò. Lo ọ̀pá àwárí bí ó bá pọn dandan.
3. Tẹ **Fífi sori ẹrọ** ki o si jẹrisi.

> Tun ilana yii ṣe fun eyikeyi awọn altcoins miiran ti o mu ṣiṣẹ lakoko iṣeto olupin.

Lẹ́yìn tí o bá ti fi sori ẹrọ, tẹ **Restart Server** láti tún àlẹ̀rọ náà ṣe pẹlú àwọn ohun-ìmọ̀ tó wà nídìí rẹ.


### Step 3: Connect Your Wallet via Viewing Key

Lẹ́yìn tí o bá ti fi àfikún náà sílé, abala **Zcash** tuntun yóò fara hàn nínú ìtòlẹ́sẹẹsẹ.

1. Go to:

`Zcash -> Settings`

2. Paste your **Unified Full Viewing Key (UFVK)** - BTCPay will derive a Unified Address for each invoice and detect incoming shielded payments.

> **Àkíyèsí:** Àwọn kókó ìwòye Legacy Sapling ni a ṣe atilẹyin, ṣùgbọ́n láti lo Orchard/Unified Addresses o gbọ́dọ̀ pèsè àdàkọ ti UFVK.


   Àpẹẹrẹ ìmúra:

`uview184syv9wftwngkay8d...`

3. Tẹ iye kan sinu aaye giga Bọ́lọ̀kì náà (Block height)

* **Iṣeto igba akọkọ pẹlu apamọwọ tuntun (agbekalẹ ọgbin titun):** tẹ giga bulọọki Zcash lọwọlọwọ wọle (o le ṣayẹwo rẹ ni 3xpl.com/zcash) - eyi yara si iṣawari ibẹrẹ.
* **Gbigbe lori olupin kanna lati inu iṣeto Sapling-nikan ti o jogun si Awọn adirẹsi Aladani / Orchard:** fi aaye yii silẹ ni ofo.
* **Gbigbe ile itaja rẹ si olupin tuntun pẹlu apamọwọ kanna/UFVK:** o le fi giga ibimọ silẹ - iwọn ti aṣẹ akọkọ ti a sanwo fun ile-itaja rẹ (ṣe deede ọjọ aṣẹ lori 3xpl lati dinku ọlọjẹ naa). Ti ko ba ni idaniloju, jẹ ki o ṣofo.

> Kì í ṣe gbogbo àwọn àpò owó ló ń ṣètìlẹyìn fún **Unified Full Viewing Key (UFVK)** ìfiránṣẹ́. 
> Àwọn àbá: 
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! Wallet (version for PC)**](https://zingolabs.org/)  
> Ninu awọn ohun elo mejeeji, wa fun gbigbe UFVK ni apakan afẹyinti / okeere.

Àwọn kókó wọ̀nyí ń ṣe àtìlẹ́yìn **ìyípadà adirẹsi aládàáṣiṣẹ́**, èyí tó túmọ̀ sí:
- Olùtajà kọ̀ọ̀kan ní àdírẹ́sì ìsanwó kan ṣoṣo.
- O rí ìlà kan tí ó wà ní òdìkejì, tó sì ṣọ̀kan.

O le ri akojọ ti o ni ibamu siwaju sii lori [ZecHub -> Àwọn Wọ́léètì](https://zechub.wiki/wallets).

Lọ́nà tí gbogbo àwọn pápá bá ti kún, tẹ **Save**.

---

### Ṣe àyẹ̀wò Ìṣàn Owó-ìsanwọlé ZEC Rẹ

A kí ọ - àpò Zcash rẹ ti di èyí tí ó so mọ́ BTCPay Server.

Ẹ jẹ́ ká ṣe àyẹ̀wò kan:

1. Go to:

`Invoices -> Create New`

2. Ṣe àtòjọ ìsọfúnni ìdánwò fún iye kékeré kan ní ZEC.
3. Fi owó ránṣẹ́ láti inú àpòòwé ** tí ó yàtọ̀ (kì í ṣe èyí tó so mọ́ BTCPay).
4. Lọgan ti a ba ri iṣowo naa, oju-iwe iwe ifowopamọ yoo ṣafihan ayẹyẹ wiwo kan.
5. Fọwọsi pe ipo iwe-owo naa yipada si ** Paid**.

Ti ohun gbogbo ba ṣiṣẹ - o ṣetan lati ṣepọ awọn sisanwo ZEC sinu oju opo wẹẹbu rẹ nipa lilo API tabi CMS plugins.



## Ṣíṣàtúnṣe BTCPay Server pẹlú Ìkànnì Rẹ

Lọgan ti apamọwọ Zcash rẹ ba sopọ mọ BTCPay Server, o le ṣepọ eto isanwo naa sinu oju opo wẹẹbu rẹ. 
Ọ̀pọ̀lọpọ̀ ọ̀nà ló wà láti ṣe èyí - láti àgbékalẹ API tààràtà sí àwọn ohun èlò tí ó ti ṣetan fún lílo fún àwọn ojú-iṣẹ́ CMS tó gbajúmọ.

---

### Àwọn Àbájáde Ìkórajọpọ̀

- **Ìkópọ API** 
  O tayọ fun awọn oju opo wẹẹbu ti a ṣe adani tabi awọn ọna ṣiṣe laisi CMS kan. 
  Ó fún ọ ní àkóso kíkún lórí ìṣẹ̀dá fáìlì, pípèsè owó-sílépa àti àwọn ìdánilójú - gbogbo rẹ nínú ojúlówó ọ̀nà tí o fi ń lo ohun èlò. 
  Nilo imọ siseto ipilẹ, nitorinaa iṣẹ yii ni o dara julọ nipasẹ olupilẹṣẹ rẹ.

- Àwọn àfikún ìsọfúnni fún CMS (CMS Plugins) ** 
  O wa fun awọn iru ẹrọ bii ** WooCommerce**, ** PrestaShop **, ati awọn miiran. 
  Àwọn àfikún yìí ń jẹ́ kí o lè gba owó ní ìṣẹ́jú díẹ̀ - kò sí kóòdì tí ó nílò.

- **Páwákọ̀ ìsanwó tàbí Iframe** 
  Ọ̀nà tó rọrùn jù lọ. 
  Ó dára fún ojúewé ìlépa, àwọn àkànṣe orí ayélujára tàbí èyíkéyìí tí o bá fẹ́ fi ìjápọ̀ ọrẹ sí.

---

### Àkójọpọ API

Ti o ba n lo pẹpẹ ti ara ẹni (tabi ko si CMS rara), API ni aṣayan to dara julọ. 
Ó fún ọ ní àyípadà pátápátá: o lè ṣe àwọn ìwé-ìṣírò, tọpinpin ipò wọn, gba ìfilọ́lẹ̀ àti ṣàkóso ìrírí oníṣe rẹ.

> Àkíyèsí: Kódà àwọn àfikún CMS kan máa ń lo API lábẹ́ ìkọ̀lé, nítorí náà kíkó àkójọpọ̀ kókó API jẹ ìgbésẹ̀ àkọ́kọ́ tí ó yẹ láti ṣe láìka ọ̀nà ìṣọkan rẹ sí.

Igbese ti o tẹle: ṣe ipilẹṣẹ bọtini API fun ile itaja rẹ ki o bẹrẹ lilo awọn ohun elo naa. [Greenfield API Àjọ tí ó ń ṣe àdáni](https://docs.btcpayserver.org/API/Greenfield/v1/) láti gbé ìdàgbàsókè yín ró.


### Ṣiṣẹda Àkọlé API kan

Lati ṣepọ BTCPay Server pẹlu oju opo wẹẹbu rẹ tabi ohun elo, iwọ yoo nilo lati ṣẹda bọtini API kan.

1. Wọlé sí BTCPay Server kí o sì ṣí ìtòlẹ́sẹẹsẹ oníṣe (ìgboro ọ̀tún òkè) **user menu**.
2. Lọ sí Àkójọ API.
3. Tẹ **Ṣiṣẹ́ ọnà API tuntun**
4. Tẹ orukọ kan wọlé fún kókó rẹ.
5. Nínú abala **Àwọn àṣẹ**, jẹ́ kí:
   - `Can create invoice`
   - `Can view invoice`
   - * ((Ohun tí o kò bá fẹ́) * `Can modify store settings` - tí o bá nílò ìdarí ní orílé-iṣẹ́ nìkan ni.

6. Tẹ **Generate**. Àkọlé API ti ara ẹni rẹ yóò hàn - ṣe ẹ̀dà kí o sì tọ́jú ọ ní ààbò.

> Kọ́kọ́rọ́ yìí máa ń fúnni láyè láti rí àwọn ìwé ìnáwó ilé-ìtajà rẹ. 
> Má ṣe pín in fún gbogbo ènìyàn tàbí kóo fi í hàn nínú kọ̀ǹpútà alágbàṣe.

---

### Àpẹẹrẹ: Ṣídá Invoice nípasẹ̀ API

**Opin ìparí:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

Ẹ̀ka tó ń béèrè ìbéèrè:**

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

** Ìdáhùn:**

Oun yoo gba ohun JSON pẹlu:

* `invoiceId`
* URL ìsanwó tí o lè fi sínú ojúlé rẹ tàbí ránṣẹ́ sí oníbàárà náà

Wo gbogbo ìwé:
[Greenfield API  Ṣẹda Iwe-owo kan](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Ṣíṣeto Ìkànnì (Ohun tí o kò fẹ)

Lati gba awọn iwifunni akoko gidi nigbati ipo iwe-owo ba yipada (bi apẹẹrẹ nigba ti a gba isanwo kan):

1. Lọ sí àwọn àyípadà ìsọ̀rí rẹ -> **Webhooks**
2. Fi URL ti rẹ backend opin ojuami eyi ti yoo mu awọn `POST` àwọn ìbéèrè láti BTCPay Server
3. BTCPay yóò fi ìfilọ́lẹ̀ ránṣẹ́ nísínwára nígbà tí àkáǹtì bá ti san tàbí tó pé.

Awọn ẹrù ti o wulo Webhook ati loji itumo tun ṣe apejuwe ninu awọn ilana. [ìwé ìléwọ́ webhook tí ó wà nípamọ̀](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Àpẹẹrẹ ìsowọ́pọ̀ wà fún onírúurú èdè ètò nínú BTCPay docs àti GitHub repositories.



### Àkójọpọ CMS

BTCPay Server n ṣe atilẹyin awọn afikun fun eto iṣakoso akoonu olokiki (CMS). 
Aṣopọpọ ti o dagba julọ ati lilo ni ibigbogbo jẹ pẹlu **WordPress + WooCommerce**, ṣiṣe ki o rọrun lati gba awọn sisanwo ZEC **laisi kikọ koodu.

---

#### WooCommerce (WordPress) Àwọn ojúewé wọ̀nyí jápọ̀ mọ́:

BTCPay Server ṣe atilẹyin ohun itanna fun WooCommerce.

Àwọn ìgbésẹ̀ láti ṣe àdàpọ̀:

1. Fi ohun itanna **BTCPay fun WooCommerce** sori ẹrọ lati inu iwe-aṣẹ afikun WordPress tabi lati GitHub.
2. Nínú àlàfo ìtọ́jú WordPress rẹ, lọ sí:

`WooCommerce -> Settings -> Payments`

3. Wá **BTCPay** nínú ìtòléye náà kí o sì tẹ̀kítà lórí **Set up**
4. Tẹ BTCPay Server URL rẹ ki o tẹle awọn itọnisọna aṣẹ-aṣẹ naa. 
   (Awọn ẹrọ API key isise ti wa niyanju)
5. Ṣiṣẹ ọna isanwo ati fipamọ awọn eto rẹ

> Àwọn ìtọ́ni tó kún rẹ́rẹ́, àwọn fídíò ìdánilẹkọ̀ọ́ àti ìwé atójútó àṣìṣe wà nílẹ̀ nínú àkọsílè ọ̀rọ̀-ìfiwọlé náà.

O tún lè rí àwọn àyè ìkópọ̀ CMS mìíràn ní apá kan náà nínú ìwé BTCPay.

---

### Bọtini ìsanwó tàbí Iframe (Kò sí CMS tabi API Tí ó Wà)

Bí o kò bá lo CMS tí ò sì fẹ́ ṣiṣẹ́ pẹ̀lú àwọn API, ọ̀nà tó rọrùn jùlọ láti gbà owó ZEC ni kí ó fi ìjápọ̀ tàbí ẹyọ àkànlò ètò ìṣúná sí ojúlé rẹ.

Ọna yìí dára fún:

- Àwọn ojúewé ìkápá
- Àwọn ojúewé àpapọ̀
- Àwọn ìkànnì tàbí àwọn ojúewé tí kò yí padà
- Àwọn iṣẹ́ tí kò ní àwọn ohun èlò ìsàmúlò (backend server)

---

#### Aṣayan 1: Bọtini Owo (Àjápọ)

1. Ninu BTCPay Server, fi ọwọ ṣẹda iwe-owo kan ni abala **Invoices**
2. Ṣe àdàkọ ìjápọ̀ owó, bí àpẹẹrẹ:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Fi ìjápọ̀ sí HTML rẹ:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Aṣayan 2: Àkọsílẹ̀-ìwé tí a fi sínú (Iframe)

Lati fi iwe-owo han taara lori aaye rẹ, lo iframe kan:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> O le ṣe apẹrẹ bọtini tabi apoti iframe lati baamu aṣa aaye rẹ - BTCPay Server gba irọrun ti o ni imọran fun oju-iwe iwe ifowopamọ.

## Ìparí Ọ̀rọ̀

Atọ́nà yìí gùn - ṣùgbọ́n ó kàn ń bo àwọn apá ìpilẹ̀ṣẹ̀ ti dídípò owó Zcash pẹlú BTCPay Server.

Awọn BTCPay Server wiwo nfun Elo siwaju sii iṣẹ ti ju a ti han nibi. Oriire, awọn UI wa ni ọpọlọpọ ede (pẹlu Russian), ṣiṣe o rọrun lati ṣawari ati ṣàdánwò síwájú sí i.

BTCPay jẹ ohun elo ti o ni irọrun pupọ. O le:

* Gbigba ọpọlọpọ awọn ile itaja ti o ni ominira lori apẹẹrẹ kan ṣoṣo
* Ṣàlàyé àwọn ipa àti àṣẹ àdáni fún àwọn ọmọ ẹgbẹ - láti ojúewé-ìpèsè nìkan sí olùdarí pátápátá
* Lo àwọn ìkápá àti àmì-ìdílé tìrẹ fúnra rẹ̀
* Ṣeto awọn webhooks, àwọn àpamọ́ owó ìtìlẹyìn àti kódà wíwọlé Tor pàápàá
* Ṣeto awọn eto to ti ni ilọsiwaju bii ofin owo-ori, koodu ẹdinwo, iṣapeye oju iwe isanwo, awọn ihamọ ọna sisan ati diẹ sii

BTCPay ni a kọ gẹ́gẹ́ bí àtúnṣe ìsọfúnni ní ìmọ̀-ìmọ̀ sí àwọn olùpèsè owó tí ó wà láàrín. Bí o bá ń wá láti gba ìdámọ̀ ZEC láìní alárinà, pẹpẹ yìí tọ́ fún àkíyèsí rẹ pátápátá.

A fẹ́ kí o ṣàṣeyọrí nínú wíwá BTCPay àti ṣíṣe ìsanwó rẹ ní tirẹ̀.

## Àwọn Owó-ìṣúnná owó

* [Ojú-ìwé Ìkànnì BTCPay Server](https://btcpayserver.org/)
* [BTCPay FAQ Àwọn ìbéèrè tó gbajúmọ̀ jùlọ](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub Àpamọ́ Ìṣirò](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet Àwòfihan Ìṣirò](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Plugin fún BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Itọsọna fifi sori ẹrọ Zcash Plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Àpẹẹrẹ zcash-lightwalletd.custom.yml tí a ṣe láàyò](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker Kọ Àkọsílẹ̀ (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API Key Docs (Greenfield API) Àwọn ojúewé tó jápọ̀ mọ́ "BTC Pay" àti "Cryptocurrency".](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Ṣẹda Àkọsílẹ̀ Cloudflare kan](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Àtòjọ Àwọn Owó-ìpamọ́ Zcash (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd on Raspberry Pi 5 (ZecHub) àtúnṣe _ àtúnṣe àmìọ̀rọ̀](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
