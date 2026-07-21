# BTCPay Server na Zcash Support: Full Ufungaji na ushirikiano Guide

BTCPay Server inaruhusu biashara mtandaoni kukubali malipo cryptocurrency moja kwa moja, bila waamuzi au watunzaji. mwongozo huu anatembea wewe kupitia mchakato kamili ya kuanzisha BTCPay server na msaada wa asili kwa Zcash malipo ulinzi.

> Nyaraka hii inalenga katika kuunganisha Zcash katika mfano wako BTCPay Server. 
> Inasaidia wote ** full node (Zebra) ** na ** lightwalletd-msingi mipangilio **.

---

## Habari Zilizo Ndani

- [Kwa nini Matumizi BTCPay Server na Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Jinsi BTCPay Server Kazi](#How-BTCPay-Server-Works)
- [Fedha Zimehifadhiwa Wapi? Ni Nani Anayeongoza Funguo za Kibinafsi?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Jinsi ya kuanzisha BTCPay Server kwa kukubali Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Kujumuisha BTCPay Server na Zcash Support](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Kufanya yako mwenyewe Zcash Full Node (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Kuunganisha kwa nje lightwalletd Node (Custom Configuration)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Hosting BTCPay Server nyumbani na Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Kusanidi Zcash Plugin katika BTCPay Server Web Interface](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Kuunganisha BTCPay Server na tovuti yako](#Integrating-BTCPay-Server-with-Your-Website)
  - [Integration API](#API-Integration)
    - [Kuzalisha API muhimu](#Generating-an-API-Key)
    - [Mfano: Kujenga ankara kupitia API](#Example-Creating-an-Invoice-via-API)
    - [Kuanzisha Webhook](#Setting-Up-a-Webhook-Optional)
  - [CMS Ushirikiano](#CMS-Integration)
  - [Kitufe cha Malipo au Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Hitimisho](#Conclusion)
- [Rasilimali](#Resources)


---

## Kwa nini kutumia BTCPay Server na Zcash

Biashara ya mtandaoni inazidi kukubali cryptocurrency. Ni haraka, kimataifa, na inafanya kazi bila benki. Hii inafaidi wafanyabiashara na wateja. Lakini kuna maelezo muhimu ambayo wengi hupuuza.

When placing an order, the customer typically provides personal information: name, shipping address, and phone number. If the payment is made using a public blockchain - such as Bitcoin, Ethereum, or stablecoins on Ethereum or Tron - the transaction becomes permanently visible for analysis.

Mtu yeyote, hata bila kujua nini iliamuru, unaweza:

- angalia ni lini na kiasi gani kililipwa 
- kufuatilia wapi fedha alikuja kutoka na ambapo walikwenda 
- kuunganisha anwani cryptocurrency kwa mtu halisi kama kuna hatua yoyote ya uwiano (kwa mfano, leaked barua pepe au meli jina)

Hilo linamaanisha kwamba ununuzi mmoja unaweza kufunua historia yote ya kifedha ya mteja.

Na inafanya kazi kwa njia nyingine pia. Kama anwani ya mfanyabiashara amewahi alionekana kwenye mlolongo, wao kuwa wazi. Washindani na waangalizi wa tatu wanaweza kufuatilia kiasi cha malipo, shughuli muuzaji, na muundo wa mtiririko wa biashara.

### Mchanganyiko wa BTCPay Server na Zcash inaweza kutatua hili.


BTCPay Server ni bure na madaraka mfumo wa kupokea cryptocurrency malipo. 
Si malipo mpatanishi na haina kushikilia fedha yoyote. Malipo yote kwenda moja kwa moja kwa mfuko wa mfanyabiashara. 
Hii inaweza kuwa mkoba binafsi au multisig kuanzisha ndani ya shirika.

Server inashughulikia kazi uratibu:

- inazalisha anwani ya kipekee kwa kila amri 
- hufuatilia wakati malipo imepokelewa na inaunganisha kwa utaratibu 
- hutoa risiti na taarifa 
- hutoa interface ya malipo kwa mteja 

Kila kitu kinakwenda chini ya udhibiti wa mmiliki wa duka, bila kutegemea huduma za mtu wa tatu.

Zcash ni cryptocurrency kujengwa juu ya zero-ujuzi uthibitisho. Inasaidia kabisa binafsi shughuli mfano. 
Wakati wa kutumia anwani kulindwa (baadaye tu kuitwa anwani), mtumaji, mpokeaji, na kiasi cha manunuzi si wazi juu ya blockchain.

Kwa maduka ya mtandaoni, hii inamaanisha:

- mnunuzi anaweza kukamilisha malipo bila kufunua historia yao ya kifedha 
- Muuzaji anapokea malipo bila kufichua anwani yake, kiasi cha mauzo, au muundo wa shughuli 
- Hakuna mtazamaji wa nje anaweza kuunganisha malipo kwa utaratibu au data ya mteja

### Mfano Unaofaa

Mtumiaji huweka agizo na huchagua Bitcoin au USDT kama njia ya malipo. 
Tovuti inazalisha anwani ya malipo na kuonyesha kiasi. 
Baada ya malipo kufanywa, anwani hii imehifadhiwa kwenye blockchain na inakuwa ya umma. 
mshambuliaji anahitaji tu kuunganisha amri moja kwa anwani ya kupata muda mrefu kujulikana katika historia yake yote ya manunuzi.

Sasa fikiria hali sawa na Zcash. 
BTCPay Server inazalisha anwani ulinzi. mnunuzi hutuma malipo. 
Kutoka kwa mtazamo wa blockchain, hakuna kinachotokea. Hakuna data ya umma kuchambua. 
Seva inapokea uthibitisho, inaunganisha kwa utaratibu, na kukamilisha mchakato.

Kwa mtu yeyote nje, inaonekana kama hakuna kitu kilichotokea. 
Mawazo yote hubaki kati ya duka na mteja - kama inavyopaswa kuwa.

Suluhisho hili haliathiri automatisering au usability. 
Kila kitu kazi sawa na cryptocurrencies nyingine, tu bila hatari ya uvujaji wa data.



## Jinsi BTCPay Server Kazi

BTCPay Server inafanya kazi kama daraja la usindikaji wa malipo kati ya jukwaa lako la e-commerce na blockchain. Hapa ni jinsi mtiririko unavyofanya kazi:

1. **Mteja anaweka agizo** kwenye wavuti yako (kwa mfano WooCommerce, Magento, au jukwaa lolote na ujumuishaji wa BTCPay).

2. ** Duka anaomba ankara ya malipo** kutoka BTCPay Server. server inazalisha ankara kipekee na:
   - Kiasi cha amri
   - Saa ya kuhesabu nyuma
   - A Zcash Unified Address (UA) - e.g., `u1...` - ambayo ni pamoja na Orchard (kinga) mpokeaji kwa default.

3. ** mteja anaona ukurasa wa malipo ** na hutuma ZEC kwa anwani iliyotolewa.

4. ** Seva ya BTCPay hufuatilia blockchain**, kuangalia malipo dhidi ya:
   - kiasi inatarajiwa
   - Anwani ya kupokea
   - Kitambulisho cha wakati cha ankara

5. ** Mara baada ya shughuli ni aligundua na alithibitisha **, BTCPay notifies duka.

6. ** mteja anapokea malipo uthibitisho.** Hiari, server unaweza kutuma risiti kupitia barua pepe.

Mchakato huu wote hutokea ** moja kwa moja **, bila waamuzi au walinzi. 
BTCPay Server haina ** kushikilia fedha yoyote ** - ni tu inaunganisha mfumo wa utaratibu kwa blockchain salama na binafsi.
## Ni Nani Anayeongoza Funguo za Kibinafsi?

BTCPay Server ni **not** mkoba na haina **wala mahitaji ya funguo binafsi**. 
Fedha zote kwenda ** moja kwa moja ** kwa mfuko wa fedha mfanyabiashara. Usalama ni kuhakikisha kwa kutumia ** kuona muhimu makao usanifu **.

### Jinsi Inavyofanya Kazi

- **Mkoba ni kuundwa mapema.** 
  mfanyabiashara anatumia mkoba Zcash ambayo inasaidia kuona funguo - kama vile [YWallet](https://ywallet.app/installation) au [Zingo! Wallet](https://zingolabs.org/).  
  Orodha kamili inapatikana katika [ZecHub.wiki](https://zechub.wiki/wallets).

- ** Seva ya BTCPay inaunganisha kupitia ufunguo wa kutazama.** 
  Kuangalia muhimu ni ** kusoma tu muhimu **: inaweza kugundua malipo zinazoingia na kuzalisha anwani mpya kupokea, 
  lakini haiwezi kutumia fedha. server haina kuhifadhi maneno ya mbegu au funguo binafsi.

- ** data blockchain ni kupatikana kupitia `lightwalletd` seva.** 
  Unaweza kutumia node ya umma kama `https://zec.rocks`, au kuendesha yako mwenyewe `Zebra + lightwalletd` stack kwa uhuru kamili.

- **Kila agizo anapata anwani ya kipekee.** 
  kuona funguo kuruhusu server kupata mpya Zcash anwani ulinzi kwa kila ankara, 
  kuwezesha salama malipo kufuatilia na kuzuia matumizi ya anwani tena.

- ** Wewe kudumisha udhibiti kamili juu ya fedha.** 
  Hata kama seva imeathiriwa, hakuna mtu anayeweza kuiba pesa zako - ni metadata ya malipo tu inayoweza kufichuliwa.

Ubunifu huu hutenganisha ** miundombinu ** kutoka ** udhibiti wa mali **. 
Unaweza update, kuhamia, au reinstall BTCPay Server bila kuweka fedha yoyote katika hatari.

## Jinsi ya kuanzisha BTCPay Server kwa kukubali Zcash

Katika sehemu zilizopita, sisi alielezea jinsi BTCPay Server kazi na Zcash na kwa nini ni muhimu kwa ajili ya faragha kuhifadhi malipo. Sasa ni wakati wa kupata mikono juu.

Maandalizi yako halisi yatategemea mambo kadhaa:

- Je, tayari una mfano BTCPay Server?
- Je, unataka kutumia lightwalletd umma au kukimbia node yako mwenyewe kamili?
- Je, server kukimbia juu ya VPS au nyumbani?

Sura hii inashughulikia hali zote za sasa za muundo - kutoka kwa mipangilio ya chini hadi kupelekwa kwa uhuru kamili.

Tutachunguza mambo yafuatayo:

- Jinsi ya kupeleka kila kitu kutoka mwanzo kwenye VPS, ikiwa ni pamoja na node kamili (Zebra)
- Jinsi ya kuendesha BTCPay Server nyumbani wakati kuweka IP yako siri kwa kutumia ** Cloudflare Tunnel **
- Jinsi ya kuwezesha na Configure Zcash msaada ndani ya BTCPay Server mtandao interface
- Jinsi ya kuunganisha BTCPay na tovuti yako au duka la mtandaoni


## Kupeleka BTCPay Server na Zcash Support

Hebu kuendelea na kuanzisha halisi. Katika sehemu hii, tutaweza kufunga BTCPay Server na msaada Zcash - ama juu ya VPS safi au kwa kuongeza msaada ZEC kwa mfano zilizopo.

Kama tayari una BTCPay Server mbio (kwa mfano kwa BTC au umeme), huna haja ya reinstall kila kitu - tu kuwawezesha ZEC Plugin.

Sisi kutembea kwa njia ya mipangilio mbalimbali, kutoka kuanzisha ndogo kutumia umma `lightwalletd` node kwa mitambo kikamilifu uhuru na yako mwenyewe full node. 
Chaguo bora inategemea eneo server yako na kiasi gani uhuru unataka kutoka miundombinu ya nje.

> Nyaraka rasmi ya Plugin: 
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> ** Tahadhari - mkoba mmoja kwa mfano:** 
> Zcash Plugin inatumia ** moja ya pamoja mkoba ** katika ** maduka yote ** katika BTCPay mfano. 
> Kama wewe mwenyeji maduka mbalimbali ya kujitegemea juu ya mfano mmoja, wao kushiriki huo Zcash mkoba. 
> Tumia matukio tofauti kama unahitaji madaraka ya pekee ya mkoba.

---

### Imependekezwa VPS Configuration

Kabla ya kufunga, hakikisha una:

- VPS na ** Ubuntu 22.04 + **
- Jina la uwanja kuelekeza kwa anwani ya IP server yako (kupitia DNS)
- `git`, `docker`, na `docker-compose` imewekwa
- SSH upatikanaji wa server

---

## Kuandaa Seva yako (sehemu ya siri)

<details>
  <summary>Click to expand</summary>

Kupeleka BTCPay Server na msaada wa Zcash, utahitaji yafuatayo:

### 1. VPS na Ubuntu 22.04 au mpya

Tunapendekeza kutumia ufungaji mdogo wa ** Ubuntu Server 22.04 LTS **. 
Mtoa huduma yeyote wa VPS anayetoa anwani ya IP iliyojitolea atafanya kazi. 

** Mahitaji ya chini**: 
- 2 CPU cores 
- 4 GB RAM 
- 40 GB nafasi disk 

Kuweka hii ni ya kutosha kama wewe ni kutumia lightwalletd kwa Zcash. 
Kama una mpango wa kuendesha ** full Zcash node **, unahitaji ** angalau 300 GB ** ya nafasi ya disk bure.

---

### 2. Domain jina akizungumzia server yako

Katika mtoa huduma yako ya DNS dashibodi, kujenga `A` rekodi kwa subdomain 
(e.g. `btcpay.example.com`) kwamba inaelekeza kwa anwani yako VPS IP. 

Domain hii itatumiwa kupata BTCPay Server kutoka browser 
na moja kwa moja kuzalisha ** bure SSL cheti ** kupitia Hebu Encrypt.

---

### 3. SSH upatikanaji wa server

Kufunga BTCPay Server, lazima kuungana na VPS yako kupitia SSH. 
Kutoka terminal yako, kukimbia:

`ssh root@YOUR_SERVER_IP`

Kama wewe kutumia MacOS, Linux, au WSL juu ya Windows, SSH ni tayari inapatikana katika terminal.
On plain Windows, kutumia SSH mteja kama ** PuTTY **.

---

### 4. Install Git, Docker, na Docker kutunga

Mara baada ya kushikamana kupitia SSH, update mfuko wako mfumo na kufunga vipengele required:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Katika Ubuntu 22.04 na mpya, `docker-compose` kutoka APT ni deprecated.
> Kifurushi kilichopendekezwa ni `docker-compose-plugin`, ambayo hutoa `docker compose` amri (kumbuka nafasi badala ya dash).

mazingira yako server sasa ni tayari kwa ajili ya kufunga BTCPay Server.

</details>

---

### Hatua ya 1: Clone Repository

Kujenga kazi directory na download BTCPay Server Docker kupelekwa:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Hatua 2: Export mazingira Variables

Badilisha `btcpay.example.com` na uwanja wako halisi:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Ikiwa una mpango wa kuongeza Monero au Litecoin baadaye, unaweza kuzijumuisha sasa:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Unaweza kuongeza sarafu mpya wakati wowote kwa kusafirisha vigezo sahihi na kuendesha upya script ya kuanzisha:

`. ./btcpay-setup.sh -i`

Kwa mwongozo huu, tutazingatia **Zcash tu**.

---

### Hatua ya 3: Run Installer

Kukimbia script kuanzisha kujenga na kuzindua server:

`. ./btcpay-setup.sh -i`

script itakuwa kufunga dependencies, kuzalisha `docker-compose.yml`, kuanza huduma, na configure `systemd`.
Hii inachukua kama dakika 5.

Mara baada ya kukamilika, mfano wako BTCPay Server itakuwa inapatikana katika:

`https://btcpay.example.com`

> Kama wewe ni kurekebisha ufungaji zilizopo (kwa mfano kuongeza ZEC), kuwa na uhakika wa kuacha na kuanzisha upya server na mipangilio mpya:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Kisha kuendelea na sehemu ya pili ya kusanidi Zcash katika interface BTCPay Server mtandao.



## Kukimbia yako mwenyewe Zcash Full Node

Kama unapendelea **not** kutegemea umma `lightwalletd` nodes, unaweza kupeleka yako mwenyewe full Zcash node pamoja na Lightwalletd kwenye seva moja. 
Hii inakupa ** uhuru kamili ** - hakuna utegemezi wa nje, hakuna uaminifu unaohitajika.

---

### Hatua ya 1: Hakikisha nafasi ya kutosha kwenye diski

Full Zcash node (Zebra + Lightwalletd) kwa sasa inahitaji **300+ GB** ya nafasi disk, na inaendelea kukua.

Ugawaji:

- Zebra blockchain database: ~ 260-270 GB
- Lightwalletd indexing: ~15-20 GB

#### Uhifadhi uliopendekezwa:

- ** 400 GB + ** kama seva ni kutumika ** tu ** kwa ajili ya malipo Zcash
- ** 800 GB + ** kama seva pia anaendesha BTCPay Server, PostgreSQL, Nginx, nk.

> Kimsingi kutumia SSD / NVMe disk na ** 1 TB uwezo **, hasa kama huna mpango wa kupogoa data mara kwa mara.

---

### Hatua ya 2: Kuweka mazingira Variables

Kuongeza zifuatazo kwa mazingira yako kuanzisha kuamsha full node Configuration:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Hii itakuwa ni pamoja na `zcash-fullnode` kipande, ambayo huzindua wote `zebrad` na `lightwalletd` ndani ya BTCPay Server.

---

### Hatua ya 3: Re-kuendesha Installer

`. ./btcpay-setup.sh -i`

Hati itakuwa:

* Pakua picha Docker kwa Zebra na Lightwalletd
* Kuanzisha huduma ndani ya BTCPay stack
* Kuunganisha Plugin Zcash kwa ** ndani ** `lightwalletd` mfano

> **Usawazishaji kamili wa blockchain unaweza kuchukua siku kadhaa**, haswa kwenye seva za VPS zenye rasilimali ndogo.
> Hadi usawazishaji kukamilika, malipo ulinzi hautakuwa inapatikana.


## Kuunganisha kwa Nje Lightwalletd Node

Katika hali nyingi, uhuru kamili haihitajiki - na wafanyabiashara hawawezi kutaka kutumia muda na nafasi ya diski kuendesha node kamili ya Zcash. 
Kwa default, BTCPay Server unajumuisha kwa umma `lightwalletd` node kushughulikia malipo shielded bila downloading blockchain nzima.

mwisho chaguo-msingi ni:

`https://zec.rocks:443`

Hata hivyo, unaweza configure BTCPay Server kuungana na ** yoyote ya nje `lightwalletd` node**, kama vile:

`https://lightwalletd.example:443`

Sehemu hii inaonyesha jinsi ya kufanya hivyo kwa kutumia ** desturi Docker kipande **.

> kamili config mfano na vigezo mazingira yote inapatikana katika [plugin hazina](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Hatua zilizo hapa chini zinaonyesha kazi ndogo ya kuanzisha.

---

### Hatua ya 1: Kujenga desturi Docker Kipande

Katika directory yako BTCPayServer mradi, kujenga desturi kipande cha faili:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Ongeza maudhui yafuatayo:

```
exclusive:
- zcash
```

The `exclusive` Mkataba huo unahakikisha kwamba kipande kimoja tu cha karatasi chenye lebo ileile (`zcash` katika kesi hii) inaweza kuwa hai kwa wakati mmoja.
Hii inazuia migogoro Configuration - kwa mfano, huwezi kukimbia wote `zcash-fullnode` kipande na desturi hii nje `lightwalletd` kipande wakati huo huo.
Kwa kuashiria kama `exclusive: zcash`, BTCPay Server moja kwa moja Disable default `zcash-fullnode` na ndani `lightwalletd` vyombo, kuruhusu wewe kuungana na node yako mwenyewe nje badala yake.

---

### Hatua ya 2: Kuweka mazingira Variables

Katika terminal:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Hatua ya 3: Kufafanua nje Node Anwani

Fungua yako `.env` faili:

`nano .env`

Kuongeza mstari ufuatao, badala ya URL na mwisho yako kuchaguliwa:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Unaweza kutumia:

* A ** umma node **, kama vile `https://lightwalletd.zcash-infra.com`
* Wako binafsi mwenyeji node, deployed tofauti na BTCPay Server

> Kama nje `lightwalletd` inakuwa haipatikani au overloaded, malipo shielded kushindwa.
> Kwa huduma muhimu, kuchagua ** imara na kuthibitika mwisho** (kama default `zec.rocks`).

> Unataka kujikaribisha `lightwalletd`?
> Unaweza kutumia `docker-compose.lwd.yml` kutoka [Repository Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> ** Tahadhari:** Usanidi huu si rasmi kumbukumbu na inahitaji mwongozo TLS kuanzisha, bandari forwarding, na firewall Configuration - ilipendekeza kwa watumiaji wa juu tu.

---

### Hatua ya 4: Re-kuendesha Installer

`. ./btcpay-setup.sh -i`

BTCPay Server itatumia config yako desturi na kuungana na maalum `lightwalletd` kiungo.

Kuanzia sasa, Zcash Plugin itatumia kwamba mwisho wa nje kwa ajili ya utunzaji wa shughuli za ulinzi.


## Hosting BTCPay Server nyumbani na Cloudflare Tunnel

Unataka kukubali malipo ya Zcash wakati mwenyeji wa BTCPay Server kwenye kifaa cha nyumbani - kama Raspberry Pi 5 au seva yoyote ya ndani ** bila IP tuli**? 
Unaweza salama kufichua mfano wako kwenye mtandao kwa kutumia ** Cloudflare Tunnel **.

Mbinu hii kuepuka bandari kuelekeza na kuficha anwani yako halisi IP kutoka kwa umma - wakati kuweka server yako kupatikana juu ya HTTPS.

Pia husaidia ** kuepuka gharama ya kukodisha VPS **, ambayo ni bora kama malipo cryptocurrency ni kipengele cha hiari badala ya msingi wa biashara yako.

---

### Hatua ya 1: Kufunga Cloudflare Tunnel

1. Unda akaunti katika [cloudflare.com]](https://www.cloudflare.com) na kuongeza kikoa chako.
2. Kwenye yako ** nyumbani server **, kufunga Cloudflare Tunnel:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Thibitisha na Cloudflare:

`cloudflared tunnel login`

Amri hii itafungua dirisha browser. Ingia na idhini ya upatikanaji wa uwanja wako.
Cloudflare moja kwa moja kujenga `credentials` faili na ishara juu ya server yako.

4. Kujenga handaki mpya (unaweza jina hilo `btcpay` au kitu kingine chochote):

`cloudflared tunnel create btcpay`

Hii inazalisha `btcpay.json` faili zenye ID handaki na sifa - unahitaji katika hatua inayofuata.

---

### Hatua ya 2: Kujenga Tunnel Configuration File

Kujenga saraka Configuration (kama haipo) na kufungua faili config:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Kuweka Configuration zifuatazo:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Maelezo:

* `tunnel` - jina la handaki wewe kuundwa mapema
* `credentials-file` - njia ya faili ishara yanayotokana wakati `cloudflared tunnel login`
* `hostname` - kikoa yako kusajiliwa na Cloudflare (kwa mfano `btcpay.example.com`)
* `service` - anwani ya ndani ya BTCPay Server yako (kawaida `http://127.0.0.1:80` kwa Nginx)

> Cloudflare itahamisha trafiki salama kwa seva yako ya ndani, bila kufichua IP yako ya nyumbani.


### Hatua ya 3: Ongeza DNS Record kwa Tunnel yako

Baada ya kujenga handaki, Cloudflare kawaida ** moja kwa moja kuongeza CNAME DNS rekodi ** kwa ajili ya uwanja wako. Ni lazima kuangalia kama hii:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Kama si kuonekana moja kwa moja, kuongeza ni manually:

1. Nenda kwa [Cloudflare Dashibodi yako](https://dash.cloudflare.com/)
2. Navigate kwa ** DNS ** sehemu
3. Ongeza rekodi mpya ya CNAME:
   - **Jina**: `btcpay`
   - ** Lengo **: `<UUID>.cfargotunnel.com`  
     Unaweza kupata thamani halisi katika yako `btcpay.json` faili au kwa kuendesha:
     
     `cloudflared tunnel list`
     
   - ** Hali ya wakala**: Enabled (orange cloud)

> Rekodi hii kuhakikisha kwamba maombi yote kwa `btcpay.example.com` zinaelekezwa kupitia Cloudflare Tunnel, kuficha anwani yako halisi ya IP kutoka kwa umma.

---

### Hatua 4: Kuwezesha Tunnel juu ya Mfumo Startup

Kufanya handaki kukimbia moja kwa moja katika Boot, kufunga kama huduma ya mfumo:

`sudo cloudflared service install`

Kisha kuwezesha na kuanza huduma:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Angalia hali:

`sudo systemctl status cloudflared`

Unapaswa kuona ujumbe kama `Active: active (running)` na uthibitisho kwamba `btcpay.example.com` ni mtandaoni.

> Kuanzia sasa, handaki itaanza moja kwa moja juu ya kila reboot, na yako BTCPay Server itakuwa wazi kwa umma - bila bandari kuelekeza na bila kufichua IP yako halisi.

---

### Hatua ya 5: Kukamilisha BTCPay Server Configuration

Kama wewe ni kuhusu kufunga BTCPay Server kwa mara ya kwanza, kuweka domain yako kabla ya kuendesha script kuanzisha:

`export BTCPAY_HOST="btcpay.example.com"`

Hii kuhakikisha domain sahihi ni kutumika wakati wa kuzalisha ** Nginx Configuration ** na ** SSL vyeti **.

Kama BTCPay Server tayari imewekwa na wewe ni tu kuongeza handaki:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

kuanzisha itakuwa regenerate configs na kutumia uwanja mpya.
Unapaswa sasa kuwa na uwezo wa kupata server yako katika:

`https://btcpay.example.com`

> Kama wewe ni kutumia umma `lightwalletd` au yako mwenyewe full node, hii haina kuathiri handaki.
> Yote ambayo mambo ni kwamba BTCPay Server ni kusikiliza juu ya `127.0.0.1:80` ndani ya nchi.


## Configuring Zcash Plugin katika BTCPay Server Web Interface

> ** Muhimu kwa ajili ya kuanzisha maduka mbalimbali: ** 
> Zcash mkoba umeboreshwa hapa ni ** kimataifa ** kwa mfano. maduka yote kutumia mkoba huu isipokuwa kukimbia tofauti BTCPay mifano.

Baada ya mafanikio kupelekwa mfano wako BTCPay Server, itabidi kufanya baadhi ya Configuration ya msingi kupitia admin mtandao interface. 
Nyaraka rasmi hutoa maelekezo kamili katika Kiingereza - hapa, sisi kutembea kwa njia ya hatua muhimu na kuzingatia hasa juu ya configuring Zcash Plugin.

---

### Hatua ya 1: Kuingia katika Mtandao Interface

Tembelea mfano wako katika:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Ingiza msimamizi wako login na password.
- Kama hii ni mara yako ya kwanza kuingia, utaulizwa kuunda akaunti.
- Akaunti ya kwanza wewe kujiandikisha moja kwa moja kupewa haki admin.

---

### Hatua ya 2: Kufunga Zcash Plugin

1. Katika orodha kuu, nenda kwa:

`Plugins -> Browse Plugins`

2. Kupata ** Zcash (ZEC) ** Plugin. Tumia bar ya utafutaji kama inahitajika.
3. Bonyeza ** Sakinisha ** na kuthibitisha.

> Kurudia mchakato huu kwa yoyote altcoins nyingine wewe kuwezeshwa wakati wa server Configuration.

Baada ya ufungaji, bonyeza ** Anzisha upya Server ** Reload interface na Plugins hai.


### Step 3: Connect Your Wallet via Viewing Key

Baada ya kufunga Plugin, mpya ** Zcash ** sehemu itaonekana katika mipangilio menu.

1. Go to:

`Zcash -> Settings`

2. Paste your **Unified Full Viewing Key (UFVK)** - BTCPay will derive a Unified Address for each invoice and detect incoming shielded payments.

> ** Kumbuka: ** Legacy Sapling viewing funguo ni mkono, lakini kutumia Orchard / Unified Anwani unapaswa kutoa ** UFVK **.


   Mfano format:

`uview184syv9wftwngkay8d...`

3. Ingiza thamani katika uwanja Block urefu

* ** Mara ya kwanza kuanzisha na mkoba mpya (mzao mpya kifungu):** kuingia sasa Zcash block urefu (unaweza kuangalia ni katika 3xpl.com/zcash) - hii huongeza kasi ya awali skanning.
* ** Kuhamia kwenye server sawa kutoka urithi wa Sapling-tu kuanzisha kwa Unified anwani / Orchard:** kuondoka uwanja huu tupu.
* ** Kuhamisha duka lako kwenye seva mpya na mkoba huo huo / UFVK:** hiari ingiza urefu wa kuzaliwa - urefu unaokaribia wa agizo la kwanza la duka lako lililolipwa (linganisha tarehe ya agizo kwenye 3xpl ili kupunguza skana). Ikiwa hauna uhakika, uache tupu.

> Si wote pochi msaada ** Unified Full Viewing Key (UFVK) ** mauzo ya nje bado. 
> Chaguzi zilizopendekezwa: 
>  [**YWallet**](https://ywallet.app/installation)  
>  [**Zingo! mkoba (toleo kwa ajili ya PC) **](https://zingolabs.org/)  
> Katika programu zote mbili, tafuta UFVK kuuza nje katika sehemu ya chelezo / kuuza.

Funguo hizi msaada ** moja kwa moja anwani mzunguko, maana:
- Kila mteja anapata ** kipekee ** anwani ya malipo
- Unaona ** moja, umoja ** usawa

Unaweza kupata orodha pana ya utangamano kwenye [ZecHub -> Wallets](https://zechub.wiki/wallets).

Mara baada ya mashamba yote ni kujazwa nje, bonyeza ** Hifadhi **.

---

### Jaribu yako ZEC Malipo Mtiririko

Hongera - yako Zcash mkoba sasa ni kushikamana na BTCPay Server.

Hebu tufanye mtihani:

1. Go to:

`Invoices -> Create New`

2. Kuzalisha ankara ya mtihani kwa kiasi kidogo katika ZEC.
3. Tuma fedha kutoka **mkoba tofauti** (sio ile iliyounganishwa na BTCPay).
4. Mara baada ya manunuzi ni aligundua, ukurasa ankara itaonyesha maadhimisho ya kuona.
5. Kuthibitisha kwamba hali ya ankara mabadiliko ya ** Paid **.

Kama kila kitu kazi - wewe ni tayari kuunganisha ZEC malipo katika tovuti yako kwa kutumia API au CMS Plugins.



## Kuunganisha BTCPay Server na tovuti yako

Mara yako Zcash mkoba ni kushikamana na BTCPay Server, unaweza kuunganisha mfumo wa malipo katika tovuti yako. 
Kuna njia kadhaa za kufanya hivyo - kutoka kwa ufikiaji wa moja kwa moja wa API hadi programu-jalizi zilizo tayari kutumika kwa majukwaa maarufu ya CMS.

---

### Chaguzi za Ushirikiano

- ** API Ushirikiano ** 
  Bora kwa ajili ya tovuti custom-kujengwa au mifumo bila CMS. 
  Inakupa udhibiti kamili juu ya uundaji wa ankara, ufuatiliaji wa malipo, na arifa - zote ndani ya kiolesura chako mwenyewe na mantiki. 
  Inahitaji maarifa ya msingi ya programu, hivyo kazi hii ni bora kushughulikiwa na developer yako.

- ** CMS Plugins ** 
  Inapatikana kwa majukwaa kama ** WooCommerce **, ** PrestaShop **, na wengine. 
  Plugins hizi kuruhusu kukubali malipo katika dakika chache tu - hakuna coding required.

- ** Malipo Button au Iframe ** 
  Njia rahisi zaidi. 
  Perfect kwa kurasa za kutua, tovuti binafsi, au tovuti yoyote ambapo unataka tu embed mchango kiungo au Checkout widget.

---

### API Ushirikiano

Kama wewe ni kutumia jukwaa desturi (au hakuna CMS wakati wote), API ni chaguo bora. 
Inakupa kubadilika kamili: unaweza kuunda ankara, kufuatilia hali yao, kupokea arifa, na kudhibiti kikamilifu uzoefu wa mtumiaji.

> Kumbuka: Hata baadhi CMS Plugins kutumia API chini ya kofia, hivyo kujenga API muhimu ni mara nyingi ** kwanza required hatua **, bila kujali njia yako ushirikiano.

Hatua inayofuata: kuzalisha ufunguo API kwa duka yako na kuanza kutumia [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) kujenga ushirikiano wako.


### Kuzalisha API muhimu

Kuunganisha BTCPay Server na tovuti yako au programu, unahitaji kuzalisha ufunguo API.

1. Kuingia katika BTCPay Server na kufungua ** mtumiaji menu ** (juu kulia kona)
2. Nenda kwa ** API Keys **
3. Bonyeza ** Kujenga mpya API muhimu**
4. Ingiza jina kwa ufunguo wako
5. Katika sehemu ya **Ruhusa**, kuwezesha:
   - `Can create invoice`
   - `Can view invoice`
   - * ((Hiari) * `Can modify store settings` - tu kama unahitaji usimamizi wa kiwango cha duka

6. Bonyeza ** Kuzalisha **. API yako binafsi ufunguo itaonyeshwa - nakala na kuhifadhi salama.

> Ufunguo huu unakupa ufikiaji wa ankara za duka lako. 
> Je, **not** kushiriki kwa umma au kufichua katika mteja-upande code.

---

### Mfano: Kujenga ankara kupitia API

** Mwisho:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Mwili wa ombi:**

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

** Jibu:**

Utapokea kitu JSON na:

* `invoiceId`
* Malipo URL kwamba unaweza embed kwenye tovuti yako au kutuma kwa mteja

Angalia nyaraka kamili:
[Greenfield API  Kujenga Invoice](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Kuanzisha Webhook (Hiari)

Kupokea taarifa katika muda halisi wakati hali ya ankara mabadiliko (kwa mfano wakati malipo imepokelewa):

1. Nenda kwenye mipangilio yako duka -> **Webhooks**
2. Kuongeza URL ya mwisho wako backend hatua ambayo kushughulikia `POST` maombi kutoka BTCPay Server
3. BTCPay moja kwa moja kutuma taarifa wakati ankara imelipwa au muda wake umeisha

Webhook payloads na retry mantiki ni ilivyoelezwa katika [webhook hati rasmi](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Mifano ya ushirikiano inapatikana kwa lugha mbalimbali za programu katika BTCPay docs na GitHub repositories.



### CMS Ushirikiano

BTCPay Server inasaidia Plugins kwa ajili ya maarufu mifumo ya usimamizi wa maudhui (CMS). 
Ushirikiano wa kukomaa na kutumika sana ni na ** WordPress + WooCommerce **, na kuifanya iwe rahisi kukubali malipo ya ZEC ** bila kuandika nambari **.

---

#### WooCommerce (WordPress)

BTCPay Server rasmi inasaidia Plugin kwa WooCommerce.

Hatua za kuunganisha:

1. Kufunga ** BTCPay kwa WooCommerce ** Plugin kutoka WordPress Plugin directory au kutoka GitHub.
2. Katika jopo lako la admin WordPress, nenda kwa:

`WooCommerce -> Settings -> Payments`

3. Kupata ** BTCPay ** katika orodha na bonyeza ** Kuanzisha **
4. Ingiza yako BTCPay Server URL na kufuata maelekezo ya idhini 
   (Automatic API ufunguo wa kizazi ni ilipendekeza)
5. Kuwezesha njia ya malipo na kuhifadhi mipangilio yako

> Maelekezo ya kina, video mafunzo, na troubleshooting viongozi zinapatikana katika nyaraka Plugin.

Pia utapata chaguzi nyingine za ujumuishaji wa CMS katika sehemu hiyo hiyo ya nyaraka za BTCPay.

---

### Malipo Button au Iframe (No CMS au API Inahitajika)

Kama huna kutumia CMS na hawataki kufanya kazi na APIs, njia rahisi ya kukubali ZEC malipo ni ** embed malipo kiungo au widget ** moja kwa moja kwenye tovuti yako.

Njia hii ni bora kwa ajili ya:

- Kurasa za kutua
- Portfolio maeneo
- Blogu au kurasa tuli
- Miradi bila backend server

---

#### Chaguo 1: Malipo Button (Kiungo)

1. Katika BTCPay Server, manually kuunda ankara katika **Ankara** sehemu
2. Nakala ya kiungo cha malipo, kwa mfano:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Ongeza kiungo kwa HTML yako:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Chaguo 2: Embedded Invoice (Iframe)

Kuonyesha ankara moja kwa moja kwenye tovuti yako, kutumia iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Unaweza style kifungo au iframe chombo kwa mechi ya tovuti yako ya kubuni - BTCPay Server inaruhusu rahisi theming ya ukurasa ankara.

## Matokeo

Mwongozo huu ulikuwa mrefu - lakini inashughulikia tu mambo ya msingi ya kuunganisha malipo ya Zcash na BTCPay Server.

interface BTCPay Server inatoa kazi zaidi kuliko sisi tumeonyesha hapa. Kwa bahati nzuri, UI inapatikana katika lugha nyingi (ikiwa ni pamoja na Kirusi), na kuifanya rahisi kuchunguza na majaribio zaidi.

BTCPay ni chombo rahisi sana. Unaweza:

* Kukaribisha maduka ya kujitegemea nyingi juu ya mfano mmoja
* Kufafanua majukumu maalum na ruhusa kwa ajili ya wanachama wa timu - kutoka ili kuona tu kwa admin kamili
* Matumizi domains yako mwenyewe na branding
* Kuanzisha webhooks, mikoba fallback, na hata Tor upatikanaji
* Configure juu ya mipangilio kama vile sheria za kodi, codes discount, Checkout ukurasa customization, njia ya malipo vikwazo, na zaidi

BTCPay ilijengwa kama chanzo wazi mbadala kwa watoaji wa malipo ya kati. Kama wewe ni kuangalia kukubali binafsi ZEC malipo bila waamuzi, jukwaa hili ni dhahiri thamani ya tahadhari yako.

Tunakutakia mafanikio katika kuchunguza mazingira ya BTCPay na kufanya malipo yako yawe yako kweli.

## Rasilimali

* [BTCPay Server tovuti rasmi](https://btcpayserver.org/)
* [BTCPay FAQ](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub Repository](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet Demo](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Plugin kwa BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Plugin Ufungaji Guide](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Custom zcash-lightwalletd.custom.yml Mfano](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker kutunga faili (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API muhimu Docs (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Kujenga Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash Wallet Upatanifu Orodha (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd juu ya Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
