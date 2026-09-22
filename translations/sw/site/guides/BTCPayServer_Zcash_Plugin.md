# Seva ya BTCPay yenye Usaidizi wa Zcash: Mwongozo Kamili wa Usakinishaji na Ujumuishaji

Seva ya BTCPay inaruhusu biashara za mtandaoni kukubali malipo ya sarafu za kidijitali moja kwa moja, bila wapatanishi au walinzi. Mwongozo huu unakuongoza katika mchakato mzima wa kuanzisha Seva ya BTCPay kwa usaidizi asilia wa malipo yaliyolindwa na Zcash.

> Nyaraka hii inalenga kuunganisha Zcash katika mfano wako wa Seva ya BTCPay. 
> Inasaidia mipangilio ya **nodi kamili (Zebra)** na **lightwalletd-based setups**.

---

## Orodha ya Yaliyomo

- [Kwa Nini Utumie Seva ya BTCPay na Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Jinsi Seva ya BTCPay Inavyofanya Kazi](#How-BTCPay-Server-Works)
- [Fedha Huhifadhiwa Wapi? Nani Anayedhibiti Funguo za Kibinafsi?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Jinsi ya Kuweka Seva ya BTCPay kwa ajili ya Kukubali Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Kutuma Seva ya BTCPay kwa kutumia Usaidizi wa Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Kuendesha Nodi Yako Kamili ya Zcash (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Connecting to an External lightwalletd Node (Custom Configuration)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Kuhifadhi Seva ya BTCPay Nyumbani kwa kutumia Cloudflare Handle](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Kusanidi Programu-jalizi ya Zcash katika Kiolesura cha Wavuti cha Seva ya BTCPay](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Kuunganisha Seva ya BTCPay na Tovuti Yako](#Integrating-BTCPay-Server-with-Your-Website)
  - [Ujumuishaji wa API](#API-Integration)
    - [Kuzalisha Ufunguo wa API](#Generating-an-API-Key)
    - [Mfano: Kuunda Ankara kupitia API](#Example-Creating-an-Invoice-via-API)
    - [Kuanzisha Mtandao](#Setting-Up-a-Webhook-Optional)
  - [Ujumuishaji wa CMS](#CMS-Integration)
  - [Kitufe cha Malipo au Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Hitimisho](#Conclusion)
- [Rasilimali](#Resources)


---

## Kwa Nini Utumie Seva ya BTCPay na Zcash

Biashara ya mtandaoni inazidi kukubali sarafu ya kidijitali. Ni ya haraka, ya kimataifa, na inafanya kazi bila benki. Hii inawanufaisha wafanyabiashara na wateja. Lakini kuna maelezo muhimu ambayo wengi hupuuza.

Wakati wa kuweka oda, mteja kwa kawaida hutoa taarifa binafsi: jina, anwani ya usafirishaji, na nambari ya simu. Ikiwa malipo yanafanywa kwa kutumia blockchain ya umma - kama vile Bitcoin, Ethereum, au sarafu thabiti kwenye Ethereum au Tron - muamala huo unaonekana wazi kwa ajili ya uchambuzi.

Mtu yeyote, hata bila kujua kilichoagizwa, anaweza:

- tazama ni lini na kiasi gani kililipwa 
- fuatilia fedha zilitoka wapi na zilienda wapi 
- Unganisha anwani ya sarafu ya kidijitali na mtu halisi ikiwa kuna uhusiano wowote (kwa mfano, barua pepe iliyovuja au jina la usafirishaji)

Hii ina maana kwamba ununuzi mmoja unaweza kufichua historia nzima ya kifedha ya mteja.

Na inafanya kazi kwa njia nyingine pia. Ikiwa anwani ya mfanyabiashara imewahi kuonekana kwenye mnyororo, hufichuliwa. Washindani na waangalizi wa wahusika wengine wanaweza kufuatilia ujazo wa malipo, shughuli za wasambazaji, na muundo wa mtiririko wa biashara.

### Mchanganyiko wa BTCPay Server na Zcash unaweza kutatua hili.


Seva ya BTCPay ni mfumo wa bure na uliogatuliwa kwa ajili ya kupokea malipo ya sarafu za kidijitali. 
Sio mpatanishi wa malipo na haina pesa zozote. Malipo yote huenda moja kwa moja kwenye pochi ya mfanyabiashara. 
Hii inaweza kuwa pochi ya kibinafsi au mpangilio wa multisig ndani ya shirika.

Seva hushughulikia kazi za uratibu:

- hutoa anwani ya kipekee kwa kila agizo 
- hufuatilia wakati malipo yanapokelewa na kuyaunganisha na agizo 
- hutoa risiti na arifa 
- hutoa kiolesura cha malipo kwa mteja 

Kila kitu kinaendeshwa chini ya udhibiti wa mmiliki wa duka, bila kutegemea huduma za wahusika wengine.

Zcash ni sarafu ya kidijitali iliyojengwa juu ya uthibitisho wa kutojua chochote. Inaunga mkono mfumo wa miamala ya kibinafsi kikamilifu. 
Unapotumia anwani zilizolindwa (ambazo huitwa "anwani"), mtumaji, mpokeaji, na kiasi cha muamala hakijaonyeshwa kwenye blockchain.

Kwa maduka ya mtandaoni, hii ina maana:

- Mnunuzi anaweza kukamilisha malipo bila kufichua historia yake ya kifedha 
- Muuzaji hupokea malipo bila kufichua anwani yake, kiasi cha mauzo, au muundo wa miamala 
- Hakuna mwangalizi wa nje anayeweza kuunganisha malipo na agizo au data ya mteja

### Mfano wa Vitendo

Mtumiaji anaweka agizo na kuchagua Bitcoin au USDT kama njia ya malipo. 
Tovuti hutoa anwani ya malipo na kuonyesha kiasi. 
Baada ya malipo kufanywa, anwani hii huhifadhiwa kwenye blockchain na kuwa ya umma. 
Mshambuliaji anahitaji tu kuunganisha agizo moja na anwani ili kupata mwonekano wa muda mrefu katika historia yake yote ya miamala.

Sasa fikiria hali kama hiyo na Zcash. 
Seva ya BTCPay hutoa anwani iliyolindwa. Mnunuzi hutuma malipo. 
Kwa mtazamo wa blockchain, hakuna kinachotokea. Hakuna data ya umma ya kuchanganua. 
Seva hupokea uthibitisho, huunganisha na agizo, na kukamilisha mchakato.

Kwa mtu yeyote wa nje, inaonekana kama hakuna kilichotokea. 
Mantiki yote inabaki kati ya duka na mteja - kama inavyopaswa.

Suluhisho hili haliathiri otomatiki au urahisi wa matumizi. 
Kila kitu hufanya kazi sawa na sarafu zingine za kidijitali, bila hatari ya uvujaji wa data.



## Jinsi Seva ya BTCPay Inavyofanya Kazi

Seva ya BTCPay hufanya kazi kama daraja la usindikaji wa malipo kati ya jukwaa lako la biashara ya mtandaoni na blockchain. Hivi ndivyo mtiririko unavyofanya kazi:

1. **Mteja anaweka oda** kwenye tovuti yako (k.m. WooCommerce, Magento, au mfumo wowote wenye ujumuishaji wa BTCPay).

2. **Duka linaomba ankara ya malipo** kutoka kwa Seva ya BTCPay. Seva hutoa ankara ya kipekee yenye:
   - Kiasi cha agizo
   - Kipima muda cha kuhesabu muda
   - A Zcash Unified Address (UA) - e.g., `u1...` - ambayo inajumuisha kipokezi cha Orchard (kilichofunikwa) kwa chaguo-msingi.

3. **Mteja huona ukurasa wa malipo** na kutuma ZEC kwa anwani iliyotolewa.

4. **Seva ya BTCPay hufuatilia blockchain**, ikiangalia malipo dhidi ya:
   - Kiasi kinachotarajiwa
   - Anwani ya kupokea
   - Muhuri wa muda wa ankara

5. **Mara tu muamala unapogunduliwa na kuthibitishwa**, BTCPay huarifu duka.

6. **Mteja anapokea uthibitisho wa malipo.** Kwa hiari, seva inaweza kutuma risiti kupitia barua pepe.

Mchakato huu wote hutokea **kiotomatiki**, bila wapatanishi au walinzi. 
Seva ya BTCPay **haihifadhi pesa zozote** - inaunganisha tu mfumo wa kuagiza kwenye blockchain kwa usalama na faragha.
## Fedha Huhifadhiwa Wapi? Nani Anayedhibiti Funguo za Kibinafsi?

Seva ya BTCPay si pochi na haihitaji funguo za kibinafsi**. 
Fedha zote huenda **moja kwa moja** kwenye pochi ya mfanyabiashara. Usalama unahakikishwa kwa kutumia usanifu wa **ufunguo wa kutazama**.

### Jinsi Inavyofanya Kazi

- **Pochi imeundwa mapema.**. 
  Mfanyabiashara anatumia pochi ya Zcash inayounga mkono funguo za kutazama - kama vile [Zkool](https://github.com/hhanh00/zkool2/) or [Pochi ya Zingo!](https://zingolabs.org/).  
  Orodha kamili inapatikana katika [ZecHub.wiki](https://zechub.wiki/wallets).

- **Seva ya BTCPay huunganisha kupitia kitufe cha kutazama.** 
  Ufunguo wa kutazama ni **ufunguo wa kusoma pekee**: unaweza kugundua malipo yanayoingia na kutoa anwani mpya za kupokea, 
  lakini haiwezi kutumia pesa. Seva haihifadhi misemo ya mbegu au funguo za kibinafsi.

- **Data ya Blockchain inapatikana kupitia `lightwalletd` seva.** 
  Unaweza kutumia nodi ya umma kama `https://zec.rocks`, au endesha yako mwenyewe `Zebra + lightwalletd` rafu kwa ajili ya uhuru kamili.

- **Kila agizo hupata anwani ya kipekee.**. 
  Funguo za kutazama huruhusu seva kupata anwani mpya za Zcash zilizolindwa kwa kila ankara, 
  kuwezesha ufuatiliaji salama wa malipo na kuzuia utumiaji tena wa anwani.

- **Una udhibiti kamili wa fedha.**. 
  Hata kama seva imeathiriwa, hakuna mtu anayeweza kuiba pesa zako - ni metadata ya malipo pekee ndiyo inaweza kufichuliwa.

Muundo huu hutenganisha **miundombinu** na **udhibiti wa mali**. 
Unaweza kusasisha, kuhamisha, au kusakinisha upya Seva ya BTCPay bila kuweka pesa zozote hatarini.

## Jinsi ya Kuweka Seva ya BTCPay kwa ajili ya Kukubali Zcash

Katika sehemu zilizopita, tulielezea jinsi BTCPay Server inavyofanya kazi na Zcash na kwa nini ni muhimu kwa malipo ya kuhifadhi faragha. Sasa ni wakati wa kufanya kazi kwa vitendo.

Mpangilio wako halisi utategemea mambo kadhaa:

- Je, tayari una mfano wa Seva ya BTCPay?
- Je, unataka kutumia public lightwalletd au kuendesha nodi yako kamili?
- Je, seva itaendeshwa kwenye VPS au nyumbani?

Sura hii inashughulikia hali zote za usanidi wa sasa - kuanzia mipangilio midogo hadi usanidi huru kamili.

Tutapitia yafuatayo:

- Jinsi ya kusambaza kila kitu kuanzia mwanzo kwenye VPS, ikiwa ni pamoja na nodi kamili (Zebra)
- Jinsi ya kuendesha Seva ya BTCPay nyumbani huku ukificha IP yako kwa kutumia **Cloudflare Tunnel**
- Jinsi ya kuwezesha na kusanidi usaidizi wa Zcash ndani ya kiolesura cha wavuti cha BTCPay Server
- Jinsi ya kuunganisha BTCPay na tovuti yako au duka lako la mtandaoni


## Kutuma Seva ya BTCPay kwa kutumia Usaidizi wa Zcash

Tuendelee kwenye usanidi halisi. Katika sehemu hii, tutasakinisha Seva ya BTCPay kwa usaidizi wa Zcash - iwe kwenye VPS mpya au kwa kuongeza usaidizi wa ZEC kwenye mfano uliopo.

Ikiwa tayari una BTCPay Server inayofanya kazi (k.m. kwa BTC au Lightning), huhitaji kusakinisha tena kila kitu - washa tu programu-jalizi ya ZEC.

Tutapitia mipangilio mbalimbali, kuanzia mipangilio midogo kwa kutumia programu ya umma `lightwalletd` nodi hadi usakinishaji kamili wa uhuru ukitumia nodi yako kamili. 
Chaguo bora inategemea eneo la seva yako na kiasi gani cha uhuru unachotaka kutoka kwa miundombinu ya nje.

> Nyaraka rasmi za programu-jalizi: 
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Onyo - pochi moja kwa kila mfano:** 
> Programu-jalizi ya Zcash hutumia **pochi moja inayoshirikiwa** katika **maduka yote** katika mfano wa BTCPay. 
> Ukihifadhi maduka mengi huru kwa wakati mmoja, yatashiriki pochi moja ya Zcash. 
> Tumia mifano tofauti ikiwa unahitaji kutenganisha pochi kwa ukali.

---

### Usanidi wa VPS Unaopendekezwa

Kabla ya kusakinisha, hakikisha una:

- VPS yenye **Ubuntu 22.04+**
- Jina la kikoa linaloelekeza kwenye anwani ya IP ya seva yako (kupitia DNS)
- `git`, `docker`na `docker-compose` imewekwa
- Ufikiaji wa SSH kwenye seva

---

## Kuandaa Seva Yako (sehemu iliyofichwa)

<details>
  <summary>Click to expand</summary>

Ili kusambaza Seva ya BTCPay kwa usaidizi wa Zcash, utahitaji yafuatayo:

### 1. VPS yenye Ubuntu 22.04 au mpya zaidi

Tunapendekeza kutumia usakinishaji mdogo wa **Ubuntu Server 22.04 LTS**. 
Mtoa huduma yeyote wa VPS anayetoa anwani maalum ya IP atafanya kazi. 

**Mahitaji ya chini kabisa**: 
- Viini 2 vya CPU 
- RAM ya GB 4 
- Nafasi ya diski ya GB 40 

Mpangilio huu unatosha ikiwa unatumia lightwalletd kwa Zcash. 
Ukipanga kuendesha **nodi kamili ya Zcash**, utahitaji **angalau GB 300** ya nafasi ya bure ya diski.

---

### 2. Jina la kikoa linaloelekeza kwenye seva yako

Katika dashibodi ya mtoa huduma wako wa DNS, tengeneza `A` rekodi ya kikoa kidogo 
(e.g. `btcpay.example.com`) ambayo inaelekeza kwenye anwani yako ya IP ya VPS. 

Kikoa hiki kitatumika kufikia Seva ya BTCPay kutoka kwa kivinjari 
na kutengeneza kiotomatiki cheti cha **SSL cha bure** kupitia Let's Encrypt.

---

### 3. Ufikiaji wa SSH kwenye seva

Ili kusakinisha Seva ya BTCPay, lazima uunganishe kwenye VPS yako kupitia SSH. 
Kutoka kwa terminal yako, endesha:

`ssh root@YOUR_SERVER_IP`

Ukitumia macOS, Linux, au WSL kwenye Windows, SSH tayari inapatikana kwenye terminal.
Kwenye Windows ya kawaida, tumia mteja wa SSH kama **PuTTY**.

---

### 4. Sakinisha Git, Docker, na Docker Compose

Mara tu baada ya kuunganishwa kupitia SSH, sasisha vifurushi vya mfumo wako na usakinishe vipengele vinavyohitajika:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Kwenye Ubuntu 22.04 na mpya zaidi, `docker-compose` kutoka APT imeondolewa kwenye huduma.
> Kifurushi kinachopendekezwa ni `docker-compose-plugin`, ambayo hutoa `docker compose` amri (andika nafasi badala ya dashibodi).

Mazingira ya seva yako sasa yako tayari kwa kusakinisha Seva ya BTCPay.

</details>

---

### Hatua ya 1: Kuiga Hifadhi

Unda saraka inayofanya kazi na upakue usanidi wa Kifaa cha Kuweka Data cha BTCPay:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Hatua ya 2: Vigezo vya Mazingira ya Hamisha

Badilisha `btcpay.example.com` na kikoa chako halisi:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Ukipanga kuongeza Monero au Litecoin baadaye, unaweza kuzijumuisha sasa:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Unaweza kuongeza sarafu mpya wakati wowote kwa kusafirisha vigeu vinavyofaa na kuendesha upya hati ya usanidi:

`. ./btcpay-setup.sh -i`

Kwa mwongozo huu, tutazingatia **Zcash pekee**.

---

### Hatua ya 3: Endesha Kisakinishi

Endesha hati ya usanidi ili kujenga na kuzindua seva:

`. ./btcpay-setup.sh -i`

Hati itasakinisha vitegemezi, na kutoa `docker-compose.yml`, anza huduma, na usanidi `systemd`.
Hii inachukua kama dakika 5.

Mara tu baada ya kukamilika, mfano wako wa Seva ya BTCPay utapatikana katika:

`https://btcpay.example.com`

> Ikiwa unabadilisha usakinishaji uliopo (k.m. kuongeza ZEC), hakikisha unasimamisha na kuanzisha upya seva kwa mipangilio mipya:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Kisha endelea hadi sehemu inayofuata ili kusanidi Zcash katika kiolesura cha wavuti cha BTCPay Server.



## Kuendesha Nodi Yako Kamili ya Zcash

Ukitaka **si** kutegemea umma `lightwalletd` nodi, unaweza kusambaza nodi yako kamili ya Zcash pamoja na Lightwalletd kwenye seva hiyo hiyo. 
Hii inakupa **uhuru kamili** - hakuna utegemezi wa nje, hakuna uaminifu unaohitajika.

---

### Hatua ya 1: Hakikisha Nafasi ya Kutosha ya Diski

Nodi kamili ya Zcash (Zebra + Lightwalletd) kwa sasa inahitaji nafasi ya diski ya **300+ GB**, na inaendelea kukua.

Uchanganuzi:

- Hifadhidata ya blockchain ya Zebra: ~260-270 GB
- Uorodheshaji wa Lightwalletd: ~15-20 GB

#### Hifadhi iliyopendekezwa:

- **400 GB+** ikiwa seva inatumika **pekee** kwa malipo ya Zcash
- **800 GB+** ikiwa seva pia inaendesha Seva ya BTCPay, PostgreSQL, Nginx, n.k.

> Ni vyema kutumia diski ya SSD/NVMe yenye uwezo wa **TB 1**, hasa ikiwa huna mpango wa kupunguza data mara kwa mara.

---

### Hatua ya 2: Weka Vigezo vya Mazingira

Ongeza yafuatayo kwenye usanidi wako wa mazingira ili kuamsha usanidi kamili wa nodi:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Hii itajumuisha `zcash-fullnode` kipande, ambacho huzindua zote mbili `zebrad` na `lightwalletd` ndani ya Seva ya BTCPay.

---

### Hatua ya 3: Endesha Kisakinishi Upya

`. ./btcpay-setup.sh -i`

Hati hiyo ita:

* Pakua picha za Docker za Zebra na Lightwalletd
* Sanidi huduma ndani ya rafu ya BTCPay
* Unganisha programu-jalizi ya Zcash kwenye **local** `lightwalletd` mfano

> **Usawazishaji kamili wa blockchain unaweza kuchukua siku kadhaa**, hasa kwenye seva za VPS zenye rasilimali chache.
> Hadi ulandanishi utakapokamilika, malipo yaliyolindwa hayatapatikana.


## Kuunganisha kwenye Nodi ya Nje ya Lightwalletd

Mara nyingi, uhuru kamili hauhitajiki - na wafanyabiashara huenda wasingependa kutumia muda na nafasi ya diski kuendesha nodi kamili ya Zcash. 
Kwa chaguo-msingi, Seva ya BTCPay huunganisha kwenye huduma ya umma `lightwalletd` nodi ya kushughulikia malipo yaliyolindwa bila kupakua blockchain nzima.

Mwisho chaguo-msingi ni:

`https://zec.rocks:443`

Hata hivyo, unaweza kusanidi Seva ya BTCPay ili iunganishwe na **sehemu yoyote ya nje `lightwalletd` nodi**, kama vile:

`https://lightwalletd.example:443`

Sehemu hii inaonyesha jinsi ya kufanya hivyo kwa kutumia **kipande maalum cha Docker**.

> Mfano kamili wa usanidi wenye vigezo vyote vya mazingira unapatikana katika [hazina ya programu-jalizi](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Hatua zifuatazo zinaonyesha mpangilio mdogo wa kufanya kazi.

---

### Hatua ya 1: Unda Kipande Maalum cha Docker

Katika saraka yako ya mradi wa BTCPayServer, tengeneza faili maalum ya kipande:

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

Ya `exclusive` maelekezo yanahakikisha kwamba kipande kimoja tu chenye lebo sawa (`zcash` katika hali hii) inaweza kuwa hai kwa wakati mmoja.
Hii huzuia migogoro ya usanidi - kwa mfano, huwezi kuendesha zote mbili `zcash-fullnode` kipande na kipande hiki maalum cha nje `lightwalletd` kipande kwa wakati mmoja.
Kwa kuiweka alama kama `exclusive: zcash`, Seva ya BTCPay itazima kiotomatiki chaguo-msingi `zcash-fullnode` na ya ndani `lightwalletd` vyombo, vinavyokuruhusu kuungana na nodi yako ya nje badala yake.

---

### Hatua ya 2: Weka Vigezo vya Mazingira

Katika terminal:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Hatua ya 3: Fafanua Anwani ya Nodi ya Nje

Fungua yako `.env` faili:

`nano .env`

Ongeza mstari ufuatao, ukibadilisha URL na sehemu ya mwisho uliyochagua:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Unaweza kutumia:

* **Nodi ya umma**, kama vile `https://zec.rocks:443`
* Nodi yako mwenyewe inayojiendesha, iliyosambazwa kando na Seva ya BTCPay

> Ikiwa sehemu ya nje `lightwalletd` Inaposhindwa kupatikana au kuzidiwa kupita kiasi, malipo yaliyolindwa yatashindwa.
> Kwa huduma muhimu, chagua **kituo cha mwisho thabiti na kilichothibitishwa** (kama chaguo-msingi `zec.rocks`).

> Unataka kujipangia mwenyewe `lightwalletd`?
> Unaweza kutumia `docker-compose.lwd.yml` kutoka kwa [Zebra repository](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Onyo:** Usanidi huu haujarekodiwa rasmi na unahitaji usanidi wa TLS mwenyewe, usambazaji wa mlango, na usanidi wa ngome - unapendekezwa kwa watumiaji wa hali ya juu pekee.

---

### Hatua ya 4: Endesha Kisakinishi Upya

`. ./btcpay-setup.sh -i`

Seva ya BTCPay itatumia usanidi wako maalum na kuunganisha kwenye kifaa kilichobainishwa `lightwalletd` nodi.

Kuanzia sasa, programu-jalizi ya Zcash itatumia sehemu hiyo ya nje ya kushughulikia miamala iliyolindwa.


## Kuhifadhi Seva ya BTCPay Nyumbani kwa kutumia Cloudflare Handle

Unataka kukubali malipo ya Zcash unapohifadhi BTCPay Server kwenye kifaa cha nyumbani - kama vile Raspberry Pi 5 au seva yoyote ya ndani **bila IP tuli**? 
Unaweza kufichua kifaa chako kwenye mtandao kwa usalama kwa kutumia **Cloudflare Tunnel**.

Njia hii huepuka usambazaji wa milango na huficha anwani yako halisi ya IP kutoka kwa umma - huku ikiweka seva yako kufikiwa kupitia HTTPS.

Pia inakusaidia **kuepuka gharama ya kukodisha VPS**, ambayo ni bora ikiwa malipo ya sarafu ya kidijitali ni kipengele cha hiari badala ya kuwa msingi wa biashara yako.

---

### Hatua ya 1: Sakinisha Handaki ya Cloudflare

1. Fungua akaunti katika [cloudflare.com](https://www.cloudflare.com) na ongeza kikoa chako.
2. Kwenye seva yako ya nyumbani**, sakinisha Handaki ya Cloudflare:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Thibitisha ukitumia Cloudflare:

`cloudflared tunnel login`

Amri hii itafungua dirisha la kivinjari. Ingia na uidhinishe ufikiaji wa kikoa chako.
Cloudflare itaunda kiotomatiki `credentials` faili yenye tokeni kwenye seva yako.

4. Unda handaki mpya (unaweza kuiita jina lake) `btcpay` au kitu kingine chochote):

`cloudflared tunnel create btcpay`

Hii inazalisha `btcpay.json` Faili iliyo na kitambulisho cha handaki na sifa - utahitaji katika hatua inayofuata.

---

### Hatua ya 2: Unda Faili ya Usanidi wa Handaki

Unda saraka ya usanidi (ikiwa haipo) na ufungue faili ya usanidi:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Bandika usanidi ufuatao:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Maelezo:

* `tunnel` - jina la handaki ulilounda mapema
* `credentials-file` - njia ya faili ya ishara iliyotengenezwa wakati wa `cloudflared tunnel login`
* `hostname` - kikoa chako kilichosajiliwa na Cloudflare (k.m. `btcpay.example.com`)
* `service` - anwani ya karibu ya Seva yako ya BTCPay (kawaida `http://127.0.0.1:80` kwa Nginx)

> Cloudflare itasambaza data kwa seva yako ya karibu kwa njia mbadala kwa usalama, bila kufichua anwani yako ya IP ya nyumbani.


### Hatua ya 3: Ongeza Rekodi ya DNS kwa Handaki Lako

Baada ya kuunda handaki, Cloudflare kwa kawaida itaongeza kiotomatiki rekodi ya CNAME DNS** kwa kikoa chako. Inapaswa kuonekana kama hii:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Ikiwa haitaonekana kiotomatiki, iongeze mwenyewe:

1. Nenda kwenye yako [Dashibodi ya Wingu](https://dash.cloudflare.com/)
2. Nenda kwenye sehemu ya **DNS**
3. Ongeza rekodi mpya ya CNAME:
   - **Jina**: `btcpay`
   - **Lengo**: `<UUID>.cfargotunnel.com`  
     Unaweza kupata thamani halisi katika `btcpay.json` faili au kwa kuendesha:
     
     `cloudflared tunnel list`
     
   - **Hali ya proksi**: Imewashwa (wingu la chungwa)

> Rekodi hii inahakikisha kwamba maombi yote ya `btcpay.example.com` hupitishwa kupitia Handaki ya Cloudflare, na kuficha anwani yako halisi ya IP kutoka kwa umma.

---

### Hatua ya 4: Washa Tunnel kwenye Mfumo Unaoanzisha

Ili kufanya handaki iendeshe kiotomatiki wakati wa kuwasha, isakinishe kama huduma ya mfumo:

`sudo cloudflared service install`

Kisha wezesha na uanze huduma:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Angalia hali:

`sudo systemctl status cloudflared`

Unapaswa kuona ujumbe kama `Active: active (running)` na uthibitisho kwamba `btcpay.example.com` iko mtandaoni.

> Kuanzia sasa, handaki litaanza kiotomatiki kila inapowashwa upya, na Seva yako ya BTCPay itakuwa rahisi kufikiwa na umma - bila kusambaza mlango na bila kufichua IP yako halisi.

---

### Hatua ya 5: Maliza Usanidi wa Seva ya BTCPay

Ikiwa unakaribia kusakinisha Seva ya BTCPay kwa mara ya kwanza, weka kikoa chako kabla ya kuendesha hati ya usanidi:

`export BTCPAY_HOST="btcpay.example.com"`

Hii inahakikisha kikoa sahihi kinatumika wakati wa kutengeneza usanidi wa **Nginx** na vyeti vya **SSL**.

Ikiwa Seva ya BTCPay tayari imesakinishwa na unaongeza tu handaki:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Usanidi utaunda upya usanidi na kutumia kikoa kipya.
Sasa unapaswa kuweza kufikia seva yako katika:

`https://btcpay.example.com`

> Ikiwa unatumia huduma ya umma `lightwalletd` au nodi yako kamili, hii haiathiri handaki.
> Kinachojalisha ni kwamba Seva ya BTCPay inasikiliza `127.0.0.1:80` ndani ya nchi.


## Kusanidi Programu-jalizi ya Zcash katika Kiolesura cha Wavuti cha Seva ya BTCPay

> **Muhimu kwa mipangilio ya maduka mengi:** 
> Pochi ya Zcash iliyosanidiwa hapa ni ya kimataifa kwa mfano. Maduka yote yatatumia pochi hii isipokuwa utumie mifano tofauti ya BTCPay.

Baada ya kufanikiwa kutumia mfano wako wa Seva ya BTCPay, utahitaji kufanya usanidi wa msingi kupitia kiolesura cha wavuti cha msimamizi. 
Nyaraka rasmi hutoa maelekezo kamili kwa Kiingereza - hapa, tutapitia hatua muhimu na kuzingatia hasa usanidi wa programu-jalizi ya Zcash.

---

### Hatua ya 1: Ingia kwenye Kiolesura cha Wavuti

Tembelea mfano wako katika:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Ingiza jina lako la mtumiaji na nenosiri la msimamizi.
- Ikiwa hii ni mara yako ya kwanza kuingia, utaulizwa kuunda akaunti.
- Akaunti ya kwanza utakayosajili itapewa haki za msimamizi kiotomatiki.

---

### Hatua ya 2: Sakinisha programu-jalizi ya Zcash

1. Kwenye menyu kuu, nenda kwa:

`Plugins -> Browse Plugins`

2. Tafuta programu-jalizi ya **Zcash (ZEC)**. Tumia upau wa utafutaji ikiwa inahitajika.
3. Bonyeza **Sakinisha** na uthibitishe.

> Rudia mchakato huu kwa sarafu zingine zozote ulizowezesha wakati wa usanidi wa seva.

Baada ya usakinishaji, bofya **Anzisha Seva** ili kupakia upya kiolesura na programu-jalizi zinazotumika.


### Step 3: Connect Your Wallet via Viewing Key

Baada ya kusakinisha programu-jalizi, sehemu mpya ya **Zcash** itaonekana kwenye menyu ya mipangilio.

1. Go to:

`Zcash -> Settings`

2. Paste your **Unified Full Viewing Key (UFVK)** - BTCPay will derive a Unified Address for each invoice and detect incoming shielded payments.

> **Note:** Legacy Sapling viewing keys are supported, but to use Orchard/Unified Addresses you should provide a **UFVK**.


   Mfano wa muundo:

`uview184syv9wftwngkay8d...`

3. Ingiza thamani katika sehemu ya urefu wa Block

* **Usanidi wa mara ya kwanza na pochi mpya (kifungu kipya cha mbegu):** ingiza urefu wa sasa wa kizuizi cha Zcash (unaweza kukiangalia kwa 3xpl.com/zcash) - hii huongeza kasi ya uchanganuzi wa awali.
* **Kuhamia kwenye seva moja kutoka kwa usanidi wa zamani wa Sapling-only hadi Unified Addresses / Orchard:** acha sehemu hii ikiwa tupu.
* **Kuhamisha duka lako hadi kwenye seva mpya yenye pochi/UFVK sawa:** kwa hiari ingiza urefu wa kuzaliwa - urefu wa takriban wa oda ya kwanza ya duka lako iliyolipwa (linganisha tarehe ya oda kwenye 3xpl ili kupunguza uchanganuzi). Ikiwa huna uhakika, liache tupu.

> Sio pochi zote zinazounga mkono **Unified Full Viewing Key (UFVK)** kuhamisha bado. 
> Chaguzi zilizopendekezwa: 
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Mkoba wa Zingo! (toleo la Kompyuta)**](https://zingolabs.org/)  
> Katika programu zote mbili, tafuta UFVK export katika sehemu ya chelezo/usafirishaji.

Funguo hizi zinaunga mkono **mzunguko wa anwani kiotomatiki**, ikimaanisha:
- Kila mteja anapata anwani ya malipo ya kipekee**
- Unaona usawa mmoja, uliounganishwa**

Unaweza kupata orodha pana zaidi ya utangamano kwenye [ZecHub -> Pochi](https://zechub.wiki/wallets).

Mara tu sehemu zote zitakapojazwa, bofya **Hifadhi**.

---

### Jaribu Mtiririko Wako wa Malipo wa ZEC

Hongera - pochi yako ya Zcash sasa imeunganishwa na Seva ya BTCPay.

Hebu tufanye jaribio:

1. Go to:

`Invoices -> Create New`

2. Tengeneza ankara ya majaribio kwa kiasi kidogo katika ZEC.
3. Tuma pesa kutoka **pochi tofauti** (sio ile iliyounganishwa na BTCPay).
4. Mara tu muamala utakapogunduliwa, ukurasa wa ankara utaonyesha sherehe inayoonekana.
5. Thibitisha kwamba hali ya ankara inabadilika kuwa **Imelipwa**.

Ikiwa kila kitu kitafanya kazi - uko tayari kuunganisha malipo ya ZEC kwenye tovuti yako kwa kutumia programu-jalizi za API au CMS.



## Kuunganisha Seva ya BTCPay na Tovuti Yako

Mara tu pochi yako ya Zcash ikiwa imeunganishwa na Seva ya BTCPay, unaweza kuunganisha mfumo wa malipo kwenye tovuti yako. 
Kuna njia kadhaa za kufanya hivi - kuanzia ufikiaji wa moja kwa moja wa API hadi programu-jalizi zilizo tayari kutumika kwa mifumo maarufu ya CMS.

---

### Chaguzi za Ujumuishaji

- **Ujumuishaji wa API** 
  Inafaa kwa tovuti au mifumo iliyojengwa maalum bila CMS. 
  Hukupa udhibiti kamili wa uundaji wa ankara, ufuatiliaji wa malipo, na arifa - yote ndani ya kiolesura na mantiki yako mwenyewe. 
  Inahitaji ujuzi wa msingi wa programu, kwa hivyo kazi hii inashughulikiwa vyema na msanidi programu wako.

- **Vinjari vya CMS** 
  Inapatikana kwa mifumo kama vile **WooCommerce**, **PrestaShop**, na mingine. 
  Programu-jalizi hizi hukuruhusu kukubali malipo kwa dakika chache tu - hakuna msimbo unaohitajika.

- **Kitufe cha Malipo au Iframe** 
  Njia rahisi zaidi. 
  Inafaa kwa kurasa za kutua, tovuti za kibinafsi, au tovuti yoyote ambapo unataka tu kupachika kiungo cha michango au wijeti ya malipo.

---

### Ujumuishaji wa API

Ikiwa unatumia mfumo maalum (au huna CMS kabisa), API ndiyo chaguo bora zaidi. 
Inakupa kubadilika kabisa: unaweza kuunda ankara, kufuatilia hali yao, kupokea arifa, na kudhibiti kikamilifu uzoefu wa mtumiaji.

> Kumbuka: Hata baadhi ya programu-jalizi za CMS hutumia API chini ya kifuniko, kwa hivyo kuunda ufunguo wa API mara nyingi ni **hatua ya kwanza inayohitajika**, bila kujali njia yako ya ujumuishaji.

Hatua inayofuata: tengeneza ufunguo wa API kwa duka lako na uanze kutumia [API ya Greenfield](https://docs.btcpayserver.org/API/Greenfield/v1/) ili kujenga ujumuishaji wako.


### Kuzalisha Ufunguo wa API

Ili kuunganisha Seva ya BTCPay na tovuti au programu yako, utahitaji kutoa ufunguo wa API.

1. Ingia kwenye Seva ya BTCPay na ufungue menyu ya **mtumiaji** (kona ya juu kulia)
2. Nenda kwenye **Funguo za API**
3. Bofya **Unda ufunguo mpya wa API**
4. Ingiza jina la ufunguo wako
5. Katika sehemu ya **Ruhusa**, wezesha:
   - `Can create invoice`
   - `Can view invoice`
   - *(Si lazima)* `Can modify store settings` - tu ikiwa unahitaji usimamizi wa kiwango cha duka

6. Bonyeza **Tengeneza**. Ufunguo wako wa kibinafsi wa API utaonyeshwa - nakili na uuhifadhi kwa usalama.

> Ufunguo huu hutoa ufikiaji wa ankara za duka lako. 
> Usiishiriki hadharani au kuifichua katika msimbo wa upande wa mteja.

---

### Mfano: Kuunda Ankara kupitia API

**Kiwango cha Mwisho:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Kiini cha ombi:**

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

**Jibu:**

Utapokea kitu cha JSON chenye:

* `invoiceId`
* URL ya malipo ambayo unaweza kuipachika kwenye tovuti yako au kumtumia mteja

Tazama hati kamili:
[API ya Greenfield - Unda Ankara](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Kuweka Mtandao (Si lazima)

Ili kupokea arifa za wakati halisi wakati hali za ankara zinabadilika (k.m. wakati malipo yanapokelewa):

1. Nenda kwenye mipangilio ya duka lako -> **Vifaa vya wavuti**
2. Ongeza URL ya sehemu yako ya mwisho ya nyuma ambayo itashughulikia `POST` maombi kutoka kwa Seva ya BTCPay
3. BTCPay itatuma arifa kiotomatiki wakati ankara inalipwa au inaisha muda wake

Mizigo ya malipo ya wavuti na mantiki ya kujaribu tena imeelezwa katika [hati rasmi za wavuti](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Mifano ya ujumuishaji inapatikana kwa lugha mbalimbali za programu katika hati za BTCPay na hazina za GitHub.



### Ujumuishaji wa CMS

Seva ya BTCPay inasaidia programu-jalizi za mifumo maarufu ya usimamizi wa maudhui (CMS). 
Muunganisho uliokomaa na unaotumika sana ni pamoja na **WordPress + WooCommerce**, na hivyo kurahisisha kukubali malipo ya ZEC **bila kuandika msimbo**.

---

#### Biashara ya Woo (WordPress)

Seva ya BTCPay inasaidia rasmi programu-jalizi ya WooCommerce.

Hatua za kuunganisha:

1. Sakinisha programu-jalizi ya **BTCPay for WooCommerce** kutoka saraka ya programu-jalizi ya WordPress au kutoka GitHub.
2. Katika paneli yako ya usimamizi wa WordPress, nenda kwa:

`WooCommerce -> Settings -> Payments`

3. Tafuta **BTCPay** kwenye orodha na ubofye **Weka mipangilio**
4. Ingiza URL yako ya Seva ya BTCPay na ufuate maagizo ya uidhinishaji 
   (Uzalishaji wa ufunguo wa API kiotomatiki unapendekezwa)
5. Washa njia ya malipo na uhifadhi mipangilio yako

> Maagizo ya kina, mafunzo ya video, na miongozo ya utatuzi wa matatizo yanapatikana katika hati za programu-jalizi.

Pia utapata chaguo zingine za ujumuishaji wa CMS katika sehemu hiyo hiyo ya hati za BTCPay.

---

### Kitufe cha Malipo au Iframe (Hakuna CMS au API Inahitajika)

Kama hutumii CMS na hutaki kufanya kazi na API, njia rahisi zaidi ya kukubali malipo ya ZEC ni kupachika kiungo cha malipo au wijeti** moja kwa moja kwenye tovuti yako.

Njia hii inafaa kwa:

- Kurasa za kutua
- Tovuti za kwingineko
- Blogu au kurasa zisizobadilika
- Miradi isiyo na seva ya nyuma

---

#### Chaguo 1: Kitufe cha Malipo (Kiungo)

1. Katika Seva ya BTCPay, tengeneza ankara mwenyewe katika sehemu ya **Ankara**
2. Nakili kiungo cha malipo, k.m.:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Ongeza kiungo kwenye HTML yako:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Chaguo la 2: Ankara Iliyopachikwa (Iframe)

Ili kuonyesha ankara moja kwa moja kwenye tovuti yako, tumia iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Unaweza kubadilisha muundo wa kitufe au chombo cha iframe ili kilingane na muundo wa tovuti yako - Seva ya BTCPay inaruhusu uundaji wa mandhari unaobadilika wa ukurasa wa ankara.

## Hitimisho

Mwongozo huu ulikuwa mrefu - lakini unashughulikia tu vipengele vya msingi vya kuunganisha malipo ya Zcash na Seva ya BTCPay.

Kiolesura cha Seva ya BTCPay hutoa utendaji kazi zaidi kuliko tulivyoonyesha hapa. Kwa bahati nzuri, kiolesura cha mtumiaji kinapatikana katika lugha nyingi (ikiwa ni pamoja na Kirusi), na hivyo kurahisisha kuchunguza na kujaribu zaidi.

BTCPay ni kifaa kinachoweza kubadilika sana. Unaweza:

* Huandaa maduka mengi huru kwa wakati mmoja
* Bainisha majukumu na ruhusa maalum kwa wanachama wa timu - kuanzia mwonekano wa agizo pekee hadi msimamizi kamili
* Tumia vikoa na chapa yako mwenyewe
* Weka mipangilio ya webhooks, pochi za kurudi nyuma, na hata ufikiaji wa Tor
* Sanidi mipangilio ya kina kama vile sheria za kodi, misimbo ya punguzo, ubinafsishaji wa ukurasa wa malipo, vikwazo vya njia za malipo, na zaidi

BTCPay ilijengwa kama njia mbadala ya chanzo huria kwa watoa huduma za malipo wa kati. Ikiwa unatafuta kukubali malipo ya ZEC ya kibinafsi bila wapatanishi, mfumo huu unastahili umakini wako kabisa.

Tunakutakia mafanikio katika kuchunguza mfumo wa BTCPay na kufanya malipo yako yawe yako kweli.

## Rasilimali

* [Tovuti Rasmi ya Seva ya BTCPay](https://btcpayserver.org/)
* [Maswali Yanayoulizwa Mara kwa Mara kuhusu BTCPay](https://docs.btcpayserver.org/FAQ/)
* [Hifadhi ya GitHub ya Seva ya BTCPay](https://github.com/btcpayserver/btcpayserver)
* [Onyesho la Mtandao Kuu la Seva ya BTCPay](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Programu-jalizi ya Zcash kwa BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Mwongozo wa Usakinishaji wa Programu-jalizi ya Zcash](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Mfano maalum wa zcash-lightwalletd.custom.yml](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Faili ya Kutunga ya Lightwalletd Docker (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Hati Muhimu za API ya BTCPay (API ya Greenfield)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Unda Handaki la Cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Orodha ya Utangamano wa Pochi ya Zcash (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd kwenye Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
