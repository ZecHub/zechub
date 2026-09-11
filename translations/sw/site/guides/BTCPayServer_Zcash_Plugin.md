# BTCPay Server na Zcash Support: Full Ufungaji na ushirikiano Guide

BTCPay Server inaruhusu biashara online kukubali cryptocurrency malipo moja kwa moja, bila waamuzi au watunzaji. mwongozo huu anatembea wewe kupitia mchakato kamili ya kuanzisha BTCPay server na msaada asili kwa Zcash ulinzi malipo.

> Nyaraka hii inalenga katika kuunganisha Zcash kwenye mfano wako wa BTCPay Server. 
> Inasaidia wote ** full node (Zebra) na ** lightwalletd-msingi mipangilio.

---

## Habari Zilizo Ndani ya Toleo Hili

- [Kwa nini kutumia BTCPay Server na Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Jinsi BTCPay Server Kazi](#How-BTCPay-Server-Works)
- [Ni Nani Anayeongoza Funguo za Kibinafsi?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Jinsi ya Kuweka BTCPay Server kwa kukubali Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Kupeleka BTCPay Server na Zcash Support](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Running Your Own Zcash Full Node (Zebra + Lightwalletd) - Kuendesha yako mwenyewe Zcash full node (ZEBRA + lightwallet d)](#Running-Your-Own-Zcash-Full-Node)
  - [Kuunganisha kwa nje lightwalletd Node (Custom Configuration)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Hosting BTCPay Server nyumbani na Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Configuring Zcash Plugin katika BTCPay Server Web Interface](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Kuunganisha BTCPay Server na tovuti yako](#Integrating-BTCPay-Server-with-Your-Website)
  - [API Ushirikiano](#API-Integration)
    - [Kuzalisha ufunguo wa API](#Generating-an-API-Key)
    - [Mfano: Kujenga ankara kupitia API](#Example-Creating-an-Invoice-via-API)
    - [Kuweka Webhook Up](#Setting-Up-a-Webhook-Optional)
  - [CMS Ushirikiano](#CMS-Integration)
  - [Malipo Button au Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Matokeo ya Uchunguzi](#Conclusion)
- [Rasilimali](#Resources)


---

## Kwa nini kutumia BTCPay Server na Zcash

Biashara ya mtandaoni inazidi kukubali cryptocurrency. Ni haraka, kimataifa na inafanya kazi bila benki. Hii inanufaisha wafanyabiashara wote wawili na wateja. Lakini kuna maelezo muhimu ambayo wengi hupuuza.

When placing an order, the customer typically provides personal information: name, shipping address, and phone number. If the payment is made using a public blockchain - such as Bitcoin, Ethereum, or stablecoins on Ethereum or Tron - the transaction becomes permanently visible for analysis.

Mtu yeyote, hata bila kujua nini iliamuru, unaweza:

- angalia ni lini na kiasi gani kililipwa 
- kufuatilia wapi fedha alitoka na ambapo walikwenda 
- kuunganisha anwani cryptocurrency kwa mtu halisi kama kuna hatua yoyote ya uhusiano (kwa mfano, leaked barua pepe au meli jina)

Hilo linamaanisha kwamba ununuzi mmoja unaweza kufunua historia yote ya kifedha ya mteja.

Na inafanya kazi kwa njia nyingine pia. Kama anwani ya mfanyabiashara amewahi alionekana kwenye mlolongo, wao kuwa wazi. Washindani na waangalizi tatu-mmoja wanaweza kufuatilia kiasi cha malipo, shughuli muuzaji, na muundo wa mtiririko biashara.

### Mchanganyiko wa BTCPay Server na Zcash inaweza kutatua hili.


BTCPay Server ni bure na madaraka mfumo wa kupokea cryptocurrency malipo. 
Si malipo mpatanishi na haina kushikilia fedha yoyote. Malipo yote kwenda moja kwa moja kwenye mkoba wa mfanyabiashara. 
Hii inaweza kuwa mkoba binafsi au multisig kuanzisha ndani ya shirika.

Server hushughulikia kazi uratibu:

- inazalisha anwani ya kipekee kwa kila amri 
- hufuatilia wakati malipo imepokelewa na inaunganisha kwa utaratibu wa 
- hutoa risiti na taarifa 
- hutoa interface ya malipo kwa mteja. 

Kila kitu kinakwenda chini ya udhibiti wa mmiliki duka, bila kutegemea huduma za mtu mwingine.

Zcash ni cryptocurrency kujengwa juu ya zero-ujuzi uthibitisho. Inasaidia kabisa binafsi shughuli mfano wa biashara. 
Wakati wa kutumia anwani za ulinzi (baadaye tu kuitwa anwani), mtumaji, mpokeaji na kiasi cha manunuzi hayafunuliwi kwenye blockchain.

Kwa maduka ya mtandaoni, hii inamaanisha:

- mnunuzi anaweza kukamilisha malipo bila ya kufunua historia yao kifedha 
- Muuzaji anapokea malipo bila kufichua anwani yake, kiasi cha mauzo au muundo wa shughuli zake. 
- Hakuna mtazamaji wa nje anaweza kuunganisha malipo kwa utaratibu au data ya mteja.

### Mfano Unaofaa Kuigwa

Mtumiaji huweka agizo na kuchagua Bitcoin au USDT kama njia ya malipo. 
Tovuti inazalisha anwani ya malipo na kuonyesha kiasi. 
Baada ya malipo kufanywa, anwani hii imehifadhiwa kwenye blockchain na inakuwa umma. 
mshambuliaji anahitaji tu kuunganisha amri moja kwa anwani ya kupata muda mrefu uonekano katika historia yake yote shughuli.

Sasa fikiria hali hiyo na Zcash. 
BTCPay Server inazalisha anwani ya ulinzi. mnunuzi hutuma malipo. 
Kutoka kwa mtazamo wa blockchain, hakuna kinachotokea. Hakuna data ya umma kuchambua. 
Seva inapokea uthibitisho, inaunganisha kwa utaratibu huo na kukamilisha mchakato.

Kwa mtu yeyote nje, inaonekana kama hakuna kilichotokea. 
Maoni yote ya kimantiki hubaki kati ya duka na mteja - kama inavyopaswa kuwa.

Suluhisho hili haliathiri automatisering au usability. 
Kila kitu kazi sawa na cryptocurrencies nyingine, tu bila hatari ya data kuvuja.



## Jinsi BTCPay Server Kazi

BTCPay Server hufanya kazi kama daraja la usindikaji wa malipo kati ya jukwaa lako la e-commerce na blockchain. Hapa ni jinsi mtiririko unavyofanya kazi:

1. **Mteja anaweka agizo** kwenye tovuti yako (kwa mfano WooCommerce, Magento au jukwaa lolote lenye ujumuishaji wa BTCPay).

2. ** Duka anaomba malipo ya ankara** kutoka BTCPay Server. server inazalisha invoice kipekee na:
   - kiasi cha amri
   - Kipima muda cha kuhesabu nyuma
   - A Zcash Unified Address (UA) - e.g., `u1...` - ambayo ni pamoja na Orchard (kinga) mpokeaji kwa default.

3. ** mteja anaona ukurasa wa malipo** na hutuma ZEC kwa anwani iliyotolewa.

4. ** Seva ya BTCPay inasimamia blockchain**, kuangalia malipo dhidi:
   - kiasi inatarajiwa
   - Anwani ya kupokea
   - Stampu ya wakati wa ankara

5. ** Mara baada ya shughuli ni aligundua na alithibitisha**, BTCPay inatangaza duka.

6. ** mteja anapokea malipo uthibitisho.** Hiari, server unaweza kutuma risiti kupitia barua pepe.

Mchakato huu wote hutokea ** moja kwa moja, bila waamuzi au walinzi. 
BTCPay Server haina ** kushikilia fedha yoyote** - ni tu unajumuisha mfumo wa utaratibu kwa blockchain salama na binafsi.
## Ni Nani Anayeongoza Funguo za Kibinafsi?

BTCPay Server ni **si** mkoba na haina **wala mahitaji ya funguo binafsi. 
Fedha zote kwenda ** moja kwa moja** mfuko wa fedha ya muuzaji. Usalama ni kuhakikisha na kutumia * kuona ufunguo makao usanifu *.

### Jinsi Inavyofanya Kazi

- **Mkoba ni kuundwa mapema.** 
  mfanyabiashara anatumia mkoba Zcash ambayo inasaidia kuangalia funguo - kama vile [Zkool](https://github.com/hhanh00/zkool2/) or [Zingo! Wallet](https://zingolabs.org/).  
  Orodha kamili inapatikana katika: [ZecHub.wiki](https://zechub.wiki/wallets).

- ** Seva ya BTCPay inaunganisha kupitia ufunguo wa kutazama.** 
  kuona muhimu ni ** kusoma tu-muhimu: inaweza kugundua malipo ya kuingia na kuzalisha anwani mpya kupokea, 
  lakini haiwezi kutumia fedha. server haina kuhifadhi maneno mbegu au funguo binafsi.

- ** data blockchain ni kupatikana kupitia a `lightwalletd` server.** 
  Unaweza kutumia node umma kama vile `https://zec.rocks`, au kuendesha yako mwenyewe `Zebra + lightwalletd` stack kwa uhuru kamili.

- ** Kila amri anapata anwani ya kipekee. * 
  kuona funguo kuruhusu server kupata mpya Zcash anwani ulinzi kwa kila bili, 
  kuwezesha salama malipo kufuatilia na kuzuia matumizi ya anwani tena.

- ** Unaendelea kudhibiti fedha zote.** 
  Hata kama seva imeathiriwa, hakuna mtu anayeweza kuiba pesa zako - ni metadata ya malipo tu ambayo inaweza kufichuliwa.

Ubunifu huu hutenganisha ** miundombinu** kutoka kwa udhibiti wa mali. 
Unaweza update, kuhamia au kufunga upya BTCPay Server bila kuweka fedha yoyote katika hatari.

## Jinsi ya Kuweka BTCPay Server kwa kukubali Zcash

Katika sehemu zilizopita, sisi alielezea jinsi BTCPay Server kazi na Zcash na kwa nini ni muhimu kwa ajili ya faragha-kuhifadhi malipo. Sasa ni wakati wa kupata mikono juu.

Utaratibu wako wa pekee utategemea mambo kadhaa:

- Je, tayari una mfano BTCPay Server?
- Je, unataka kutumia lightwalletd umma au kukimbia node yako mwenyewe kamili?
- Je, server kukimbia juu ya VPS au nyumbani?

Sura hii inashughulikia hali zote za sasa za usanidi - kutoka kwa mipangilio ya chini hadi kupelekwa kabisa.

Tutachunguza mambo yafuatayo:

- Jinsi ya kupeleka kila kitu kutoka mwanzo juu ya VPS, ikiwa ni pamoja na node kamili (Zebra)
- Jinsi ya kuendesha BTCPay Server nyumbani wakati kuweka IP yako siri kwa kutumia ** Cloudflare Tunnel**
- Jinsi ya kuwezesha na kusanidi msaada Zcash ndani BTCPay Server mtandao interface
- Jinsi ya kuunganisha BTCPay na tovuti yako au duka la mtandaoni


## Kupeleka BTCPay Server na Zcash Support

Hebu kuendelea na kuanzisha halisi. Katika sehemu hii, tutaweza kufunga BTCPay Server kwa msaada Zcash - ama juu ya VPS safi au kwa kuongeza msaada ZEC mfano zilizopo.

Kama tayari una BTCPay Server mbio (kwa mfano kwa ajili ya BTC au umeme), huna haja ya kufunga tena kila kitu - tu kuwawezesha ZEC Plugin.

Sisi kutembea kwa njia ya mipangilio mbalimbali, kutoka kuanzisha ndogo kutumia umma `lightwalletd` node kwa mitambo kikamilifu uhuru na yako mwenyewe full Node. 
Chaguo bora inategemea eneo server yako na kiasi gani uhuru unataka kutoka miundombinu ya nje.

> Rasmi nyongeza ya hati: 
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> ** Tahadhari - mkoba mmoja kwa mfano:** 
> Zcash Plugin inatumia ** moja ya pamoja mkoba** katika ** maduka yote ** katika mfano BTCPay. 
> Kama wewe mwenyeji maduka ya kujitegemea nyingi juu ya mfano mmoja, wao kushiriki huo Zcash mkoba. 
> Tumia mifano tofauti kama unahitaji usawa wa mkoba.

---

### Ilipendekeza VPS Configuration

Kabla ya kufunga, hakikisha una:

- VPS na ** Ubuntu 22.04 +**
- Jina la uwanja akizungumzia anwani ya IP server yako (kupitia DNS)
- `git`, `docker`, na `docker-compose` imewekwa
- SSH upatikanaji wa server

---

## Kuandaa Seva yako (sehemu ya siri)

<details>
  <summary>Click to expand</summary>

Kupeleka BTCPay Server na msaada Zcash, unahitaji yafuatayo:

### 1. VPS na Ubuntu 22.04 au mpya zaidi

Tunapendekeza kutumia ufungaji wa chini ya ** Ubuntu Server 22.04 LTS**. 
Yoyote mtoa VPS kwamba inatoa wakfu anwani ya IP kazi. 

** Mahitaji ya chini**: 
- 2 CPU cores 
- 4 GB RAM 
- 40 GB nafasi disk 

Kuweka hii ni ya kutosha kama wewe kutumia lightwalletd kwa Zcash. 
Kama mpango wa kuendesha ** full Zcash node**, unahitaji angalau 300 GB ya nafasi huru disk.

---

### 2. Jina la uwanja akizungumzia server yako

Katika mtoa huduma yako DNS's dashibodi, kujenga `A` rekodi kwa ajili ya subdomain 
(e.g. `btcpay.example.com`) kwamba inaelekeza kwa anwani yako VPS IP. 

Domain hii itatumiwa kupata BTCPay Server kutoka browser 
na moja kwa moja kuzalisha ** bure SSL hati** kupitia Hebu Encrypt.

---

### 3. SSH upatikanaji wa server

Kufunga BTCPay Server, lazima kuungana na VPS yako kupitia SSH. 
Kutoka terminal yako, kukimbia:

`ssh root@YOUR_SERVER_IP`

Kama wewe kutumia MacOS, Linux au WSL kwenye Windows, SSH ni tayari inapatikana katika terminal.
On plain Windows, kutumia SSH mteja kama ** PuTTY**.

---

### 4. Install Git, Docker na Docker kutunga

Mara baada ya kushikamana kupitia SSH, update mfuko wako mfumo na kufunga vipengele required:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Kwenye Ubuntu 22.04 na mpya, `docker-compose` kutoka APT ni deprecated.
> Kifurushi kilichopendekezwa ni: `docker-compose-plugin`, ambayo hutoa kwa ajili ya `docker compose` amri (kumbuka nafasi badala ya dash).

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

Badilisha `btcpay.example.com` na domain yako halisi:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Kama una mpango wa kuongeza Monero au Litecoin baadaye, unaweza kuingiza yao sasa:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Unaweza kuongeza sarafu mpya wakati wowote kwa kuuza nje vigezo sahihi na kurudia uendeshaji wa script ya usanidi:

`. ./btcpay-setup.sh -i`

Kwa mwongozo huu, tutazingatia **Zcash tu**.

---

### Hatua ya 3: Run Installer

Kukimbia kuweka script kujenga na kuzindua server:

`. ./btcpay-setup.sh -i`

script itakuwa kufunga dependencies, kuzalisha `docker-compose.yml`, kuanza huduma, na configure `systemd`.
Hii inachukua kama dakika 5.

Mara baada ya kukamilika, mfano wako BTCPay Server itakuwa inapatikana katika:

`https://btcpay.example.com`

> Kama wewe ni kurekebisha ufungaji zilizopo (kwa mfano kuongeza ZEC), kuwa na uhakika wa kuacha na kuanzisha upya server kwa mipangilio mpya:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Kisha kuendelea na sehemu ya pili kuanzisha Zcash katika interface BTCPay Server mtandao.



## Running yako mwenyewe Zcash Full Node

Kama unapendelea **not** kutegemea umma `lightwalletd` nodes, unaweza kupeleka yako mwenyewe full Zcash node pamoja na Lightwalletd kwenye server moja. 
Hii inakupa ** uhuru kamili** - hakuna utegemezi wa nje, hakuna imani inahitajika.

---

### Hatua ya 1: Hakikisha nafasi kutosha Disk

node kamili Zcash (Zebra + Lightwalletd) kwa sasa inahitaji ** 300+ GB** ya nafasi disk, na inaendelea kukua.

Kuvunjika:

- Zebra blockchain database: ~ 260-270 GB
- Lightwalletd indexing: ~15-20 GB

#### Uhifadhi uliopendekezwa:

- **400 GB+** kama seva ni kutumika tu kwa ajili ya malipo Zcash **
- ** 800 GB +** kama seva pia anaendesha BTCPay Server, PostgreSQL, Nginx, nk.

> Kimsingi kutumia SSD / NVMe disk na ** 1 TB uwezo**, hasa kama huna mpango wa kukata data mara kwa mara.

---

### Hatua ya 2: Kuweka mazingira Variables

Kuongeza zifuatazo kwa mazingira yako kuanzisha ili kuamsha node kamili Configuration:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Hii itakuwa ni pamoja na: `zcash-fullnode` kipande, ambayo huzindua wote wawili `zebrad` na `lightwalletd` ndani ya BTCPay Server.

---

### Hatua ya 3: Re-Kufungua Installer

`. ./btcpay-setup.sh -i`

Hati itakuwa:

* Download picha Docker kwa Zebra na Lightwalletd
* Kuanzisha huduma ndani ya BTCPay stack
* Kuunganisha Zcash Plugin kwa ** ndani** `lightwalletd` mfano wa tukio hilo

> ** Usanisi kamili wa blockchain unaweza kuchukua siku kadhaa**, haswa kwenye seva za VPS zenye rasilimali ndogo.
> Hadi usawazishaji kukamilika, malipo shielded haitapatikana.


## Kuunganisha kwa nje Lightwalletd Node

Katika hali nyingi, uhuru kamili si required-na wafanyabiashara wanaweza hawataki kutumia muda na nafasi disk kuendesha full Zcash node. 
Kwa default, BTCPay Server unajumuisha kwa umma `lightwalletd` node kushughulikia malipo shielded bila downloading blockchain nzima.

Mwisho wa mwisho ni:

`https://zec.rocks:443`

Hata hivyo, unaweza configure BTCPay Server kuungana na ** yoyote ya nje `lightwalletd` node**, kama vile:

`https://lightwalletd.example:443`

Sehemu hii inaonyesha jinsi ya kufanya hivyo kwa kutumia ** desturi Docker kipande**.

> kamili config mfano na vigezo mazingira yote inapatikana katika [kuhifadhi Plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Hatua zilizo hapa chini zinaonyesha kazi ndogo ya kuanzisha.

---

### Hatua ya 1: Kujenga Custom Docker Kipande

Katika orodha yako ya mradi wa BTCPayServer, kuunda faili desturi kipande:

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

Makala ya kwanza. `exclusive` Mkataba huo unatarajia kwamba sehemu moja tu ya hati hiyo itatolewa kwa njia ileile (`zcash` katika kesi hii) inaweza kuwa hai kwa wakati mmoja.
Hii inazuia migogoro Configuration - kwa mfano, huwezi kukimbia wote wawili wa `zcash-fullnode` kipande na desturi hii nje `lightwalletd` kipande kwa wakati mmoja.
Kwa kuashiria kama `exclusive: zcash`, BTCPay Server moja kwa moja kulemaza default `zcash-fullnode` na ndani ya nchi `lightwalletd` vyombo, kuruhusu wewe kuungana na node yako mwenyewe nje badala yake.

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

Kuongeza mstari ufuatao, badala ya URL na mwisho wako kuchaguliwa:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Unaweza kutumia:

* ** umma node**, kama vile `https://lightwalletd.zcash-infra.com`
* Wako mwenyewe mwenyeji node, deployed tofauti na BTCPay Server

> Kama nje ya `lightwalletd` inakuwa haipatikani au overloaded, malipo shielded kushindwa.
> Kwa huduma muhimu, kuchagua ** imara na kuthibitika mwisho** (kama default `zec.rocks`).

> Unataka kujikaribisha mwenyewe `lightwalletd`?
> Unaweza kutumia `docker-compose.lwd.yml` kutoka kwa [Zebra kumbukumbu](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> ** Onyo:** Usanidi huu si rasmi kumbukumbu na inahitaji mwongozo TLS kuanzisha, bandari forwarding, na firewall Configuration - ilipendekeza kwa watumiaji wa juu tu.

---

### Hatua ya 4: Re-Kufungua Installer

`. ./btcpay-setup.sh -i`

BTCPay Server itatumia config yako desturi na kuungana kwa maalum `lightwalletd` kiungo.

Kuanzia sasa, Zcash Plugin itatumia kwamba mwisho wa nje kwa ajili ya utunzaji shughuli ulinzi.


## Hosting BTCPay Server nyumbani na Cloudflare Tunnel

Unataka kukubali malipo ya Zcash wakati mwenyeji wa BTCPay Server kwenye kifaa cha nyumbani - kama vile Raspberry Pi 5 au seva yoyote ya ndani ** bila IP tuli**? 
Unaweza salama kufichua mfano wako kwenye mtandao kwa kutumia ** Cloudflare Tunnel**.

Njia hii inepuuza uhamisho wa bandari na kuficha anwani yako halisi ya IP kutoka kwa umma - wakati unadumisha seva yako kupatikana kupitia HTTPS.

Pia husaidia ** kuepuka gharama ya kukodisha VPS, ambayo ni bora kama malipo cryptocurrency ni kipengele cha hiari badala ya msingi wa biashara yako.

---

### Hatua ya 1: Kufunga Cloudflare Tunnel

1. Unda akaunti katika: [cloudflare.com](https://www.cloudflare.com) na kuongeza kikoa chako.
2. Kwenye ** nyumbani server yako, kufunga Cloudflare Tunnel:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Thibitisha na Cloudflare:

`cloudflared tunnel login`

Amri hii itafungua dirisha browser. Ingia na idhini ya upatikanaji wa uwanja wako.
Cloudflare moja kwa moja kujenga a `credentials` faili na ishara kwenye seva yako.

4. Kujenga handaki mpya (unaweza jina hilo `btcpay` au kitu kingine chochote):

`cloudflared tunnel create btcpay`

Hii inazalisha a `btcpay.json` faili zenye ID handaki na sifa - unahitaji katika hatua ya pili.

---

### Hatua ya 2: Kujenga Tunnel Configuration File

Kujenga saraka Configuration (kama haipo) na kufungua faili config:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Kuweka Configuration ifuatayo:

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
* `credentials-file` - njia ya faili ishara yanayotokana wakati wa `cloudflared tunnel login`
* `hostname` - kikoa chako kusajiliwa na Cloudflare (kwa mfano. `btcpay.example.com`)
* `service` - anwani ya ndani ya BTCPay Server yako (kawaida `http://127.0.0.1:80` kwa Nginx)

> Cloudflare itahamisha trafiki salama kwa seva yako ya ndani, bila kufichua IP yako ya nyumbani.


### Hatua ya 3: Ongeza DNS Record kwa Tunnel yako

Baada ya kujenga handaki, Cloudflare kawaida ** moja kwa moja kuongeza CNAME DNS rekodi** kwa ajili ya uwanja wako. Ni lazima kuangalia kama hii:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Kama si kuonekana moja kwa moja, kuongeza ni manually:

1. Nenda kwa yako [Cloudflare Dashibodi ya Usimamizi](https://dash.cloudflare.com/)
2. Navigate kwa ** DNS** sehemu
3. Ongeza rekodi mpya ya CNAME:
   - ** Jina**: `btcpay`
   - ** Lengo**: `<UUID>.cfargotunnel.com`  
     Unaweza kupata thamani halisi katika yako `btcpay.json` faili au kwa kuendesha:
     
     `cloudflared tunnel list`
     
   - ** Hali ya wakala**: Enabled (orange cloud)

> Rekodi hii kuhakikisha kwamba maombi yote kwa ajili ya huduma za afya na usalama. `btcpay.example.com` ni kuelekezwa kupitia Cloudflare Tunnel, kuficha anwani yako halisi IP kutoka kwa umma.

---

### Hatua 4: Kuwezesha Tunnel juu ya Mfumo Startup

Kufanya handaki kukimbia moja kwa moja wakati wa boot, kufunga kama huduma ya mfumo:

`sudo cloudflared service install`

Kisha kuwezesha na kuanza huduma:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Angalia hali:

`sudo systemctl status cloudflared`

Unapaswa kuona ujumbe kama vile `Active: active (running)` na uthibitisho kwamba `btcpay.example.com` ni mtandaoni.

> Kuanzia sasa, handaki itaanza moja kwa moja juu ya kila reboot, na BTCPay Server yako itakuwa wazi - bila bandari kuelekeza mbele na bila kufichua IP yako halisi.

---

### Hatua 5: Kukamilisha BTCPay Server Configuration

Kama wewe ni kuhusu kufunga BTCPay Server kwa mara ya kwanza, kuweka domain yako kabla ya kuendesha script usanidi:

`export BTCPAY_HOST="btcpay.example.com"`

Hii kuhakikisha domain sahihi ni kutumika wakati wa kuzalisha ** Nginx Configuration** na ** SSL vyeti.

Kama BTCPay Server tayari imewekwa na wewe ni tu kuongeza handaki:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Kuanzisha itakuwa kuzaliwa upya configs na kutumia uwanja mpya.
Unapaswa sasa kuwa na uwezo wa kupata server yako katika:

`https://btcpay.example.com`

> Kama wewe ni kutumia umma `lightwalletd` au yako mwenyewe full node, hii haina kuathiri handaki.
> Yote ambayo mambo ni kwamba BTCPay Server kusikiliza juu ya `127.0.0.1:80` katika eneo.


## Configuring Zcash Plugin katika BTCPay Server Web Interface

> ** Muhimu kwa ajili ya kuanzisha maduka mbalimbali:** 
> Zcash mkoba umeboreshwa hapa ni ** kimataifa** kwa mfano. maduka yote kutumia hii mfuko wa fedha isipokuwa kukimbia tofauti BTCPay mifano.

Baada ya mafanikio kupelekwa mfano wako BTCPay Server, unahitaji kufanya baadhi Configuration msingi kupitia mtandao admin interface. 
Nyaraka rasmi hutoa maelekezo kamili katika Kiingereza - hapa, sisi kutembea kwa njia ya hatua muhimu na kuzingatia hasa juu ya Configuring Zcash Plugin.

---

### Hatua ya 1: Ingia kwenye Mtandao Interface

Tembelea mfano wako katika:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Ingiza kiingilio chako cha msimamizi na nywila.
- Kama hii ni mara yako ya kwanza kuingia, utaulizwa kuunda akaunti.
- Akaunti ya kwanza wewe kujiandikisha moja kwa moja kupewa haki admin.

---

### Hatua ya 2: Kufunga Zcash Plugin

1. Katika orodha kuu, kwenda kwa:

`Plugins -> Browse Plugins`

2. Kupata ** Zcash (ZEC)** Plugin. Tumia bar ya utafutaji kama inahitajika.
3. Bonyeza ** Sakinisha** na kuthibitisha.

> Kurudia mchakato huu kwa ajili ya altcoins nyingine yoyote wewe kuwezeshwa wakati wa server Configuration.

Baada ya ufungaji, bonyeza ** Anzisha upya Server** ili kupakia interface na Plugins hai.


### Hatua ya 3: Kuunganisha mkoba wako kupitia Viewing Key

Baada ya kufunga Plugin, mpya ** Zcash** sehemu itaonekana katika mipangilio menu.

1. Go to:

`Zcash -> Settings`

2. Paste your **Unified Full Viewing Key (UFVK)** - BTCPay will derive a Unified Address for each invoice and detect incoming shielded payments.

> ** Kumbuka:** Legacy Sapling viewing funguo ni mkono, lakini kutumia Orchard / Unified Anwani unapaswa kutoa ** UFVK. ***


   Mfano format:

`uview184syv9wftwngkay8d...`

3. Ingiza thamani katika uwanja Block urefu

* ** Kuanzisha mara ya kwanza na mkoba mpya (mzizi wa neno jipya):** ingiza urefu wa sasa wa Zcash block (unaweza kuangalia kwenye 3xpl.com/zcash) - hii inachukua kasi ya skanning ya awali.
* ** Kuhamia kwenye seva sawa kutoka urithi wa Sapling-tu kuanzisha kwa Unified Anwani / Orchard:** acha uwanja huu tupu.
* ** Kuhamisha duka lako kwenye seva mpya na mkoba huo / UFVK:** hiari ingiza urefu wa kuzaliwa - urefu karibu wa agizo la kwanza kulipwa kwa duka lako (linganisha tarehe ya utaratibu katika 3xpl ili kupunguza skanning). Ikiwa hauna uhakika, uache tupu.

> Si wote pochi msaada ** Unified Full Viewing Key (UFVK)** mauzo ya nje bado. 
> Chaguzi zilizopendekezwa: 
> – [** Zkool**](https://github.com/hhanh00/zkool2/)  
> – [** Zingo! mkoba (toleo kwa ajili ya PC) **](https://zingolabs.org/)  
> Katika programu zote mbili, tafuta UFVK kuuza nje katika sehemu ya chelezo / mauzo.

hizi funguo msaada ** moja kwa moja anwani mzunguko, maana:
- Kila mteja anapata ** kipekee** anwani ya malipo.
- Unaona ** moja, umoja** usawa

Unaweza kupata orodha ya patanifu pana juu ya [ZecHub -> Wallets](https://zechub.wiki/wallets).

Mara baada ya mashamba yote ni kujazwa nje, bonyeza ** Hifadhi**.

---

### Jaribu yako ZEC Malipo Mtiririko

Hongera - yako Zcash mkoba sasa ni kushikamana na BTCPay Server.

Hebu tufanye mtihani:

1. Go to:

`Invoices -> Create New`

2. Kuzalisha ankara ya mtihani kwa kiasi kidogo katika ZEC.
3. Tuma fedha kutoka ** mkoba tofauti** (sio ile iliyounganishwa na BTCPay).
4. Mara baada ya shughuli ni aligundua, ukurasa ankara kuonyesha maonyesho sherehe.
5. Thibitisha kwamba hali ya ankara mabadiliko kwa ** Paid**.

Kama kila kitu kazi - wewe ni tayari kuunganisha ZEC malipo katika tovuti yako kwa kutumia API au CMS Plugins.



## Kuunganisha BTCPay Server na tovuti yako

Mara mkoba wako wa Zcash umeunganishwa na BTCPay Server, unaweza kuingiza mfumo huo wa malipo kwenye tovuti yako. 
Kuna njia kadhaa za kufanya hivyo - kutoka kwa ufikiaji wa moja kwa moja API hadi programu-jalizi zilizo tayari kutumika kwa majukwaa maarufu ya CMS.

---

### Chaguzi za Ushirikiano

- ** API Ushirikiano** 
  Bora kwa ajili ya tovuti custom-kujengwa au mifumo bila CMS. 
  Inakupa udhibiti kamili juu ya uundaji wa ankara, ufuatiliaji wa malipo na arifa - zote ndani ya kiolesura chako mwenyewe na mantiki. 
  Inahitaji maarifa ya msingi programu, hivyo kazi hii ni bora kushughulikiwa na developer yako.

- ** CMS Plugins** 
  Inapatikana kwa majukwaa kama ** WooCommerce, PrestaShop na wengine. 
  Plugins hizi kuruhusu kukubali malipo katika dakika chache tu - hakuna coding required.

- ** Malipo Button au Iframe** 
  Njia rahisi zaidi. 
  Perfect kwa kurasa za kutua, tovuti binafsi, au yoyote ya tovuti ambapo unataka tu embed mchango kiungo au Checkout widget.

---

### API Ushirikiano

Kama wewe ni kutumia jukwaa desturi (au hakuna CMS wakati wote), API ni chaguo bora. 
Inakupa kubadilika kamili: unaweza kuunda ankara, kufuatilia hali yao, kupokea arifa na kudhibiti kikamilifu uzoefu wa mtumiaji.

> Kumbuka: Hata baadhi ya CMS Plugins kutumia API chini ya kofia, hivyo kujenga ufunguo wa API ni mara nyingi ** required kwanza hatua**, bila kujali njia yako ushirikiano.

Hatua inayofuata: kuzalisha ufunguo API kwa duka yako na kuanza kutumia programu ya [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) kujenga ushirikiano wako.


### Kuzalisha ufunguo wa API

Kuunganisha BTCPay Server na tovuti yako au programu, unahitaji kuzalisha ufunguo wa API.

1. Kuingia katika BTCPay Server na kufungua ** mtumiaji menu** (juu kulia kona)
2. Nenda kwenye ** API Keys**
3. Bonyeza ** Kujenga mpya API muhimu**
4. Ingiza jina kwa ufunguo wako
5. Katika sehemu ya **Ruhusa**, kuwezesha:
   - `Can create invoice`
   - `Can view invoice`
   - * ((Uchaguzi) * `Can modify store settings` - tu kama unahitaji usimamizi wa kiwango cha duka

6. Bonyeza ** Kuzalisha**. API yako binafsi muhimu itaonyeshwa - nakala na kuhifadhi salama.

> Ufunguo huu unakupa ufikiaji wa ankara za duka lako. 
> Je, **not** kushiriki kwa umma au kufichua katika mteja-upande code.

---

### Mfano: Kujenga ankara kupitia API

** Mwisho wa mwisho:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

** Mwili wa ombi:**

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
* URL ya malipo ambayo unaweza embed kwenye tovuti yako au kutuma kwa mteja

Angalia nyaraka kamili:
[Greenfield API  Kujenga Invoice](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Kuweka Webhook (Hiari)

Kupokea taarifa za muda halisi wakati hali ya ankara mabadiliko (kwa mfano, wakati malipo imepokelewa):

1. Nenda kwenye mipangilio yako duka -> **Webhooks**
2. Kuongeza URL ya mwisho wako backend hatua ambayo kushughulikia `POST` maombi kutoka BTCPay Server
3. BTCPay moja kwa moja kutuma taarifa wakati ankara imelipwa au muda wake umeisha.

Webhook payloads na retry mantiki ni ilivyoelezwa katika [hati rasmi ya webhook](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Mifano ya ushirikiano inapatikana kwa lugha mbalimbali za programu katika BTCPay docs na GitHub hazina.



### CMS Ushirikiano

BTCPay Server inasaidia Plugins kwa ajili ya maarufu mifumo ya usimamizi wa maudhui (CMS). 
ushirikiano zaidi kukomaa na kutumika sana ni kwa ** WordPress + WooCommerce**, kufanya hivyo rahisi kukubali ZEC malipo ** bila kuandika code.

---

#### WooCommerce (WordPress)

BTCPay Server rasmi inasaidia Plugin kwa WooCommerce.

Hatua za kuunganisha:

1. Kufunga ** BTCPay kwa WooCommerce** Plugin kutoka WordPress Plugin directory au kutoka GitHub.
2. Katika jopo la admin yako WordPress, kwenda:

`WooCommerce -> Settings -> Payments`

3. Tafuta **BTCPay** katika orodha na bonyeza **Setup**
4. Ingiza yako BTCPay Server URL na kufuata maelekezo ya idhini 
   (Automatic API muhimu kizazi ni ilipendekeza)
5. Kuwezesha njia ya malipo na kuhifadhi mipangilio yako

> Maelekezo ya kina, video mafunzo na troubleshooting viongozi zinapatikana katika nyaraka Plugin.

Pia utapata chaguzi nyingine za ushirikiano wa CMS katika sehemu hiyo ya BTCPay docs.

---

### Malipo Button au Iframe (No CMS au API zinahitajika)

Kama huna kutumia CMS na hawataki kufanya kazi kwa APIs, njia rahisi ya kukubali ZEC malipo ni ** embed link au widget kulipa** moja kwa moja kwenye tovuti yako.

Njia hii ni bora kwa ajili ya:

- Kurasa za kutua
- Portfolio maeneo ya tovuti
- Blogu au kurasa tuli
- Miradi bila backend server

---

#### Chaguo 1: Malipo Button (Link)

1. Katika BTCPay Server, manually kuunda ankara katika **Ankara** sehemu.
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

> Unaweza style kifungo au iframe chombo kwa mechi ya tovuti yako design - BTCPay Server inaruhusu rahisi theming wa ukurasa ankara.

## Matokeo ya Uchunguzi

Mwongozo huu ulikuwa mrefu - lakini inashughulikia tu mambo ya msingi ya kuunganisha malipo Zcash na BTCPay Server.

interface BTCPay Server inatoa utendaji zaidi ya sisi tumeonyesha hapa. Kwa bahati nzuri, UI ni inapatikana katika lugha nyingi (ikiwa ni pamoja na Kirusi), kufanya kuwa rahisi kuchunguza na majaribio zaidi.

BTCPay ni chombo rahisi sana. Unaweza:

* Kukaribisha maduka mbalimbali huru juu ya mfano mmoja
* Kufafanua majukumu maalum na ruhusa kwa ajili ya wanachama wa timu - kutoka amri-kuangalia tu admin kamili
* Tumia domains yako mwenyewe na branding
* Kuanzisha webhooks, mkoba wa kurudi nyuma, na hata upatikanaji Tor
* Configure juu ya mipangilio kama vile sheria za kodi, codes discount, Checkout ukurasa customization, njia malipo vikwazo, na zaidi

BTCPay ilijengwa kama chanzo wazi mbadala kwa watoaji wa malipo ya kati. Kama wewe ni kuangalia kukubali binafsi ZEC malipo bila intermediaries, jukwaa hili kabisa thamani yako tahadhari.

Tunatamani ufanikiwe katika kuchunguza mazingira ya BTCPay na kufanya malipo yako yawe yako kweli.

## Rasilimali

* [BTCPay Server tovuti rasmi](https://btcpayserver.org/)
* [BTCPay FAQ](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub Repository (Hifadhi ya Kijitabu cha Fedha za Bitcoin)](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet Demo (Kipindi cha Msaada wa Kiwango)](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Plugin kwa BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Plugin Ufungaji Guide](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Custom zcash-lightwalletd.custom.yml Mfano wa mfano](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker Kuandika faili (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API muhimu Docs (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Unda Njia ya Cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Orodha ya utangamano wa Zcash Wallet (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd juu ya Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
