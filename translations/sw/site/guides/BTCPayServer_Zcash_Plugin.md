# BTCPay Server yenye Usaidizi wa Zcash: Mwongozo Kamili wa Usakinishaji na Ujumuishaji

BTCPay Server huruhusu biashara za mtandaoni kukubali malipo ya sarafu-fiche moja kwa moja, bila wapatanishi au walezi. Mwongozo huu unakuelekeza kupitia mchakato kamili wa kusanidi BTCPay Server kwa usaidizi asilia wa malipo ya faragha [shielded] ya Zcash.

> Nyaraka hizi zinaangazia ujumuishaji wa Zcash katika instansi yako ya BTCPay Server.  
> Zinasaidia usanidi wa **full node (Zebra)** pamoja na usanidi unaotegemea lightwalletd.

---

## Yaliyomo

- [Kwa Nini Utumie BTCPay Server pamoja na Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Jinsi BTCPay Server Inavyofanya Kazi](#How-BTCPay-Server-Works)
- [Fedha Zinahifadhiwa Wapi? Nani Anadhibiti Funguo za Faragha?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Jinsi ya Kusanidi BTCPay Server kwa ajili ya Kukubali Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Kusambaza BTCPay Server yenye Usaidizi wa Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Kuendesha Full Node yako Mwenyewe ya Zcash (Zebra + lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Kuunganisha kwenye Node ya Nje ya lightwalletd (Usanidi Maalum)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Kupangisha BTCPay Server Nyumbani kwa Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Kusanidi Programu-jalizi ya Zcash katika Kiolesura cha Wavuti cha BTCPay Server](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Kuunganisha BTCPay Server na Tovuti Yako](#Integrating-BTCPay-Server-with-Your-Website)
  - [Ujumuishaji wa API](#API-Integration)
    - [Kutengeneza Ufunguo wa API](#Generating-an-API-Key)
    - [Mfano: Kuunda Ankara kupitia API](#Example-Creating-an-Invoice-via-API)
    - [Kusanidi Webhook](#Setting-Up-a-Webhook-Optional)
  - [Ujumuishaji wa CMS](#CMS-Integration)
  - [Kitufe cha Malipo au Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Hitimisho](#Conclusion)
- [Nyenzo](#Resources)


---

## Kwa Nini Utumie BTCPay Server pamoja na Zcash

Biashara ya mtandaoni inakubali sarafu-fiche kwa kiwango kinachoongezeka. Ni ya haraka, ya kimataifa, na hufanya kazi bila benki. Hili linawanufaisha wafanyabiashara na wateja. Lakini kuna jambo muhimu ambalo wengi hulipuuza.

Wakati wa kuagiza, mteja kwa kawaida hutoa maelezo binafsi: jina, anwani ya usafirishaji, na nambari ya simu. Ikiwa malipo yanafanywa kwa kutumia blockchain ya umma - kama Bitcoin, Ethereum, au stablecoins kwenye Ethereum au Tron - muamala [transaction] unaonekana hadharani kwa kudumu ili kuchanganuliwa.

Mtu yeyote, hata bila kujua kilichoagizwa, anaweza:

- Kuona malipo yalifanywa lini na kwa kiasi gani  
- Kufuatilia fedha zilitoka wapi na zilienda wapi  
- Kuunganisha anwani ya sarafu-fiche na mtu halisi ikiwa kuna sehemu yoyote ya uhusiano (kwa mfano, barua pepe au jina la usafirishaji lililovuja)

Hii inamaanisha kuwa ununuzi mmoja unaweza kufichua historia nzima ya kifedha ya mteja.

Na hali hufanya kazi vivyo hivyo kwa upande mwingine. Ikiwa anwani ya mfanyabiashara imewahi kuonekana on-chain, anakuwa wazi. Washindani na waangalizi wa nje wanaweza kufuatilia viwango vya malipo, shughuli za wasambazaji, na muundo wa mtiririko wa biashara.

### Muunganiko wa BTCPay Server na Zcash unaweza kutatua hili.


BTCPay Server ni mfumo wa bure na uliogatuliwa [decentralized] wa kupokea malipo ya sarafu-fiche.  
Si mpatanishi wa malipo na haishikilii fedha zozote. Malipo yote huenda moja kwa moja kwenye pochi [wallet] ya mfanyabiashara.  
Hii inaweza kuwa pochi binafsi au usanidi wa multisig ndani ya shirika.

Seva hushughulikia kazi za uratibu:

- Hutengeneza anwani ya kipekee kwa kila agizo  
- Hufuatilia malipo yanapopokelewa na kuyaunganisha na agizo  
- Hutoa stakabadhi na arifa  
- Hutoa kiolesura cha malipo kwa mteja  

Kila kitu huendeshwa chini ya udhibiti wa mmiliki wa duka, bila kutegemea huduma za wahusika wengine.

Zcash ni sarafu-fiche iliyojengwa juu ya mathibitisho ya maarifa sifuri [zero-knowledge proofs]. Inasaidia muundo wa miamala ya faragha kikamilifu.  
Unapotumia anwani za faragha (hapa baadaye zitaitwa tu “anwani”), mtumaji, mpokeaji, na kiasi cha muamala havifichuliwi kwenye blockchain.

Kwa maduka ya mtandaoni, hili linamaanisha:

- Mnunuzi anaweza kukamilisha malipo bila kufichua historia yake ya kifedha  
- Muuzaji hupokea malipo bila kufichua anwani yake, kiasi cha mauzo, au muundo wa miamala  
- Hakuna mwangalizi wa nje anayeweza kuunganisha malipo na agizo au data ya mteja

### Mfano wa Kiutendaji

Mtumiaji huweka agizo na kuchagua Bitcoin au USDT kama njia ya malipo.  
Tovuti hutengeneza anwani ya malipo na kuonyesha kiasi.  
Baada ya malipo kufanywa, anwani hii huhifadhiwa kwenye blockchain na kuwa ya umma.  
Mshambulizi anahitaji tu kuunganisha agizo moja na anwani hiyo ili kupata mwonekano wa muda mrefu wa historia yake yote ya miamala.

Sasa fikiria hali hiyo hiyo ukiwa na Zcash.  
BTCPay Server hutengeneza anwani ya faragha. Mnunuzi hutuma malipo.  
Kwa mtazamo wa blockchain, hakuna kinachotokea. Hakuna data ya umma ya kuchanganua.  
Seva hupokea uthibitisho, huiunganisha na agizo, na kukamilisha mchakato.

Kwa mtu yeyote wa nje, huonekana kana kwamba hakuna kilichotokea.  
Mantiki yote hubaki kati ya duka na mteja - kama inavyopaswa kuwa.

Suluhisho hili haliathiri utendakazi wa kiotomatiki au urahisi wa matumizi.  
Kila kitu hufanya kazi sawa na sarafu-fiche nyingine, ila bila hatari ya uvujaji wa data.



## Jinsi BTCPay Server Inavyofanya Kazi

BTCPay Server hufanya kazi kama daraja [bridge] la uchakataji wa malipo kati ya jukwaa lako la biashara ya kielektroniki na blockchain. Hivi ndivyo mtiririko unavyofanya kazi:

1. **Mteja huweka agizo** kwenye tovuti yako (kwa mfano WooCommerce, Magento, au jukwaa lolote lenye ujumuishaji wa BTCPay).

2. **Duka huomba ankara ya malipo** kutoka BTCPay Server. Seva hutengeneza ankara ya kipekee yenye:
   - Kiasi cha agizo
   - Kipima muda cha kuhesabu kurudi nyuma
   - Anwani Iliyounganishwa ya Zcash (UA) - kwa mfano, `u1...` - ambayo hujumuisha kipokezi cha Orchard (cha faragha) kwa chaguo-msingi.

3. **Mteja huona ukurasa wa malipo** na kutuma ZEC kwenye anwani iliyotolewa.

4. **BTCPay Server hufuatilia blockchain**, ikikagua malipo dhidi ya:
   - Kiasi kinachotarajiwa
   - Anwani inayopokea
   - Muhuri wa muda wa ankara

5. **Muamala unapogunduliwa na kuthibitishwa**, BTCPay huliarifu duka.

6. **Mteja hupokea uthibitisho wa malipo.** Kwa hiari, seva inaweza kutuma stakabadhi kupitia barua pepe.

Mchakato huu wote hutokea **kiotomatiki**, bila wapatanishi au walezi.  
BTCPay Server **haishikilii fedha zozote** - huunganisha tu mfumo wa maagizo na blockchain kwa usalama na faragha.
## Fedha Zinahifadhiwa Wapi? Nani Anadhibiti Funguo za Faragha?

BTCPay Server **si** pochi na **haihitaji funguo za faragha**.  
Fedha zote huenda **moja kwa moja** kwenye pochi ya mfanyabiashara. Usalama huhakikishwa kwa kutumia **usanifu unaotegemea ufunguo wa kutazama [viewing key]**.

### Jinsi Inavyofanya Kazi

- **Pochi hutengenezwa mapema.**  
  Mfanyabiashara hutumia pochi ya Zcash inayosaidia funguo za kutazama - kama [Zkool](https://github.com/hhanh00/zkool2/) au [Zingo! Wallet](https://zingolabs.org/).  
  Orodha kamili inapatikana kwenye [ZecHub.wiki](https://zechub.wiki/wallets).

- **BTCPay Server huunganisha kupitia ufunguo wa kutazama.**  
  Ufunguo wa kutazama ni **ufunguo wa kusoma pekee**: unaweza kugundua malipo yanayoingia na kutengeneza anwani mpya za kupokea,  
  lakini hauwezi kutumia fedha. Seva haihifadhi maneno ya kurejesha pochi [seed phrase] wala funguo za faragha.

- **Data ya blockchain hupatikana kupitia seva ya `lightwalletd`.**  
  Unaweza kutumia node ya umma kama `https://zec.rocks`, au kuendesha mfumo wako mwenyewe wa `Zebra + lightwalletd` kwa mamlaka kamili.

- **Kila agizo hupata anwani ya kipekee.**  
  Funguo za kutazama huruhusu seva kupata anwani mpya za faragha za Zcash kwa kila ankara,  
  hivyo kuwezesha ufuatiliaji salama wa malipo na kuzuia matumizi ya anwani tena.

- **Unabaki na udhibiti kamili wa fedha.**  
  Hata seva ikiathiriwa, hakuna anayeweza kuiba pesa zako - metadata ya malipo pekee ndiyo inaweza kufichuliwa.

Muundo huu hutenganisha **miundombinu** na **udhibiti wa mali**.  
Unaweza kusasisha, kuhamisha, au kusakinisha upya BTCPay Server bila kuweka fedha zozote hatarini.

## Jinsi ya Kusanidi BTCPay Server kwa ajili ya Kukubali Zcash

Katika sehemu zilizotangulia, tulieleza jinsi BTCPay Server inavyofanya kazi na Zcash na kwa nini ni muhimu kwa malipo yanayohifadhi faragha. Sasa ni wakati wa kuanza kufanya kazi kwa vitendo.

Usanidi wako mahususi utategemea mambo kadhaa:

- Je, tayari una instansi ya BTCPay Server?
- Je, unataka kutumia lightwalletd ya umma au kuendesha full node yako mwenyewe?
- Je, seva itaendeshwa kwenye VPS au nyumbani?

Sura hii inashughulikia hali zote za sasa za usanidi - kuanzia usanidi mdogo hadi usambazaji wenye mamlaka kamili.

Tutapitia yafuatayo:

- Jinsi ya kusambaza kila kitu kutoka mwanzo kwenye VPS, ikijumuisha full node (Zebra)
- Jinsi ya kuendesha BTCPay Server nyumbani huku ukificha IP yako kwa kutumia **Cloudflare Tunnel**
- Jinsi ya kuwezesha na kusanidi usaidizi wa Zcash ndani ya kiolesura cha wavuti cha BTCPay Server
- Jinsi ya kuunganisha BTCPay na tovuti yako au duka la mtandaoni


## Kusambaza BTCPay Server yenye Usaidizi wa Zcash

Sasa tuendelee na usanidi halisi. Katika sehemu hii, tutasakinisha BTCPay Server yenye usaidizi wa Zcash - ama kwenye VPS mpya au kwa kuongeza usaidizi wa ZEC kwenye instansi iliyopo.

Ikiwa tayari una BTCPay Server inayoendesha (kwa mfano kwa BTC au Lightning), huhitaji kusakinisha kila kitu upya - wezesha tu programu-jalizi ya ZEC.

Tutapitia usanidi mbalimbali, kuanzia usanidi mdogo unaotumia node ya umma ya `lightwalletd` hadi usakinishaji wenye mamlaka kamili kwa full node yako mwenyewe.  
Chaguo bora hutegemea eneo la seva yako na kiwango cha uhuru unachotaka kutoka kwa miundombinu ya nje.

> Nyaraka rasmi za programu-jalizi:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Onyo - pochi moja kwa kila instansi:**  
> Programu-jalizi ya Zcash hutumia **pochi moja inayoshirikiwa** katika **maduka yote** kwenye instansi ya BTCPay.  
> Ukipangisha maduka huru mengi kwenye instansi moja, yatashiriki pochi ileile ya Zcash.  
> Tumia instansi tofauti ikiwa unahitaji utengaji mkali wa pochi.

---

### Usanidi Unaopendekezwa wa VPS

Kabla ya kusakinisha, hakikisha una:

- VPS yenye **Ubuntu 22.04+**
- Jina la kikoa linaloelekeza kwenye anwani ya IP ya seva yako (kupitia DNS)
- `git`, `docker`, na `docker-compose` zilizosakinishwa
- Ufikiaji wa SSH kwenye seva

---

## Kuandaa Seva Yako (sehemu iliyofichwa)

<details>
  <summary>Bofya ili kupanua</summary>

Ili kusambaza BTCPay Server yenye usaidizi wa Zcash, utahitaji yafuatayo:

### 1. VPS yenye Ubuntu 22.04 au toleo jipya zaidi

Tunapendekeza kutumia usakinishaji mdogo wa **Ubuntu Server 22.04 LTS**.  
Mtoa huduma yeyote wa VPS anayetoa anwani maalum ya IP atafanya kazi.  

**Mahitaji ya chini**:  
- Koresi 2 za CPU  
- RAM ya GB 4  
- Nafasi ya diski ya GB 40  

Usanidi huu unatosha ikiwa unatumia lightwalletd kwa Zcash.  
Ikiwa unapanga kuendesha **full node ya Zcash**, utahitaji **angalau GB 300** za nafasi ya diski isiyotumika.

---

### 2. Jina la kikoa linaloelekeza kwenye seva yako

Katika dashibodi ya mtoa huduma wako wa DNS, unda rekodi ya `A` kwa kikoa kidogo  
(kwa mfano, `btcpay.example.com`) inayoelekeza kwenye anwani ya IP ya VPS yako.  

Kikoa hiki kitatumika kufikia BTCPay Server kutoka kwenye kivinjari  
na kutengeneza kiotomatiki **cheti cha bure cha SSL** kupitia Let's Encrypt.

---

### 3. Ufikiaji wa SSH kwenye seva

Ili kusakinisha BTCPay Server, lazima uunganishe kwenye VPS yako kupitia SSH.  
Kutoka kwenye terminal yako, endesha:

`ssh root@YOUR_SERVER_IP`

Ukitumia macOS, Linux, au WSL kwenye Windows, SSH tayari inapatikana kwenye terminal.
Kwenye Windows ya kawaida, tumia mteja wa SSH kama **PuTTY**.

---

### 4. Sakinisha Git, Docker, na Compose ya Docker

Baada ya kuunganisha kupitia SSH, sasisha vifurushi vya mfumo wako na usakinishe vipengele vinavyohitajika:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Kwenye Ubuntu 22.04 na matoleo mapya zaidi, `docker-compose` kutoka APT imepitwa na wakati.
> Kifurushi kinachopendekezwa ni `docker-compose-plugin`, ambacho hutoa amri ya `docker compose` (zingatia nafasi badala ya kistari).

Mazingira ya seva yako sasa yako tayari kwa kusakinisha BTCPay Server.

</details>

---

### Hatua ya 1: Nakili Hazina

Unda saraka ya kazi na upakue usambazaji wa BTCPay Server wa Docker:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Hatua ya 2: Hamisha Vigeu vya Mazingira

Badilisha `btcpay.example.com` kwa kikoa chako halisi:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Ikiwa unapanga kuongeza Monero au Litecoin baadaye, unaweza kuvijumuisha sasa:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Unaweza kuongeza sarafu mpya wakati wowote kwa kuhamisha vigeu vinavyofaa na kuendesha tena hati ya usanidi:

`. ./btcpay-setup.sh -i`

Kwa mwongozo huu, tutaangazia **Zcash pekee**.

---

### Hatua ya 3: Endesha Kisakinishi

Endesha hati ya usanidi ili kujenga na kuanzisha seva:

`. ./btcpay-setup.sh -i`

Hati itasakinisha vitegemezi, kutengeneza `docker-compose.yml`, kuanzisha huduma, na kusanidi `systemd`.
Hii huchukua takriban dakika 5.

Baada ya kukamilika, instansi yako ya BTCPay Server itapatikana kwenye:

`https://btcpay.example.com`

> Ikiwa unarekebisha usakinishaji uliopo (kwa mfano, kuongeza ZEC), hakikisha unasimamisha na kuanzisha upya seva kwa mipangilio mipya:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Kisha endelea kwenye sehemu inayofuata ili kusanidi Zcash katika kiolesura cha wavuti cha BTCPay Server.

## Kuendesha Full Node Yako Mwenyewe ya Zcash

Ikiwa unapendelea **kutotegemea** node za umma za `lightwalletd`, unaweza kuweka full node yako mwenyewe ya Zcash pamoja na lightwalletd kwenye seva moja.  
Hii hukupa **uhuru kamili** - hakuna utegemezi wa nje, hakuna imani inayohitajika.

---

### Hatua ya 1: Hakikisha Kuna Nafasi ya Kutosha ya Diski

Full node ya Zcash (Zebra + lightwalletd) kwa sasa inahitaji **GB 300+** za nafasi ya diski, na inaendelea kukua.

Mgawanyo:

- Hifadhidata ya blockchain ya Zebra: ~GB 260-270
- Uorodheshaji wa lightwalletd: ~GB 15-20

#### Hifadhi inayopendekezwa:

- **GB 400+** ikiwa seva inatumiwa **tu** kwa malipo ya Zcash
- **GB 800+** ikiwa seva pia inaendesha BTCPay Server, PostgreSQL, Nginx, n.k.

> Kwa hali bora, tumia diski ya SSD/NVMe yenye **uwezo wa TB 1**, hasa ikiwa hupangi kupunguza data mara kwa mara.

---

### Hatua ya 2: Weka Vigeu vya Mazingira

Ongeza yafuatayo kwenye usanidi wako wa mazingira ili kuamilisha usanidi wa full node:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Hii itajumuisha sehemu ya `zcash-fullnode`, ambayo huwasha `zebrad` na `lightwalletd` ndani ya BTCPay Server.

---

### Hatua ya 3: Endesha Kisakinishi Tena

`. ./btcpay-setup.sh -i`

Script itafanya yafuatayo:

* Kupakua picha za Docker za Zebra na lightwalletd
* Kusanidi huduma ndani ya stack ya BTCPay
* Kuunganisha programu-jalizi ya Zcash na instance **ya ndani** ya `lightwalletd`

> **Usawazishaji kamili wa blockchain unaweza kuchukua siku kadhaa**, hasa kwenye seva za VPS zenye rasilimali ndogo.
> Hadi usawazishaji ukamilike, malipo ya faragha [shielded payments] hayatapatikana.


## Kuunganisha kwenye Node ya Nje ya lightwalletd

Katika hali nyingi, uhuru kamili hauhitajiki - na wafanyabiashara huenda hawataki kutumia muda na nafasi ya diski kuendesha full node ya Zcash.  
Kwa chaguo-msingi, BTCPay Server huunganishwa na node ya umma ya `lightwalletd` ili kushughulikia malipo ya faragha bila kupakua blockchain nzima.

Endpoint chaguo-msingi ni:

`https://zec.rocks:443`

Hata hivyo, unaweza kusanidi BTCPay Server ili kuunganishwa na **node yoyote ya nje ya `lightwalletd`**, kama vile:

`https://lightwalletd.example:443`

Sehemu hii inaonyesha jinsi ya kufanya hivyo kwa kutumia **sehemu maalum ya Docker**.

> Mfano kamili wa usanidi wenye vigeu vyote vya mazingira unapatikana katika hazina ya programu-jalizi ya [](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Hatua zilizo hapa chini zinaonyesha usanidi mdogo unaofanya kazi.

---

### Hatua ya 1: Unda Sehemu Maalum ya Docker

Katika saraka yako ya mradi wa BTCPayServer, unda faili maalum ya sehemu:

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

Direktivu ya `exclusive` huhakikisha kwamba sehemu moja tu yenye lebo sawa (`zcash` katika hali hii) inaweza kuwa hai kwa wakati mmoja.
Hii huzuia migongano ya usanidi - kwa mfano, huwezi kuendesha sehemu ya `zcash-fullnode` na sehemu hii maalum ya nje ya `lightwalletd` kwa wakati mmoja.
Kwa kuitia alama kama `exclusive: zcash`, BTCPay Server itazima kiotomatiki kontena chaguo-msingi la `zcash-fullnode` na kontena za ndani za `lightwalletd`, ikikuruhusu kuunganishwa na node yako mwenyewe ya nje badala yake.

---

### Hatua ya 2: Weka Vigeu vya Mazingira

Kwenye terminal:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Hatua ya 3: Bainisha Anwani ya Node ya Nje

Fungua faili yako ya `.env`:

`nano .env`

Ongeza mstari ufuatao, ukibadilisha URL kwa endpoint uliyochagua:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Unaweza kutumia:

* **Node ya umma**, kama vile `https://zec.rocks:443`
* Node yako mwenyewe inayojihudumia, iliyowekwa kando na BTCPay Server

> Ikiwa `lightwalletd` ya nje haitapatikana au imelemewa, malipo ya faragha yatashindwa.
> Kwa huduma muhimu, chagua **endpoint thabiti na iliyothibitishwa** (kama `zec.rocks` chaguo-msingi).

> Je, ungependa kujihudumia `lightwalletd`?
> Unaweza kutumia `docker-compose.lwd.yml` kutoka hazina ya [Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Onyo:** Usanidi huu haujaandikwa rasmi na unahitaji usanidi wa TLS wa mkono, uelekezaji wa bandari, na usanidi wa firewall - unapendekezwa kwa watumiaji wa hali ya juu pekee.

---

### Hatua ya 4: Endesha Kisakinishi Tena

`. ./btcpay-setup.sh -i`

BTCPay Server itatumia usanidi wako maalum na kuunganishwa na node maalum ya `lightwalletd`.

Kuanzia sasa, programu-jalizi ya Zcash itatumia endpoint hiyo ya nje kushughulikia miamala ya faragha [shielded transactions].


## Kuhudumia BTCPay Server Nyumbani kwa Cloudflare Tunnel

Je, ungependa kukubali malipo ya Zcash huku ukihudumia BTCPay Server kwenye kifaa cha nyumbani - kama Raspberry Pi 5 au seva yoyote ya ndani **isiyo na IP tuli**?  
Unaweza kufichua instance yako kwa usalama kwenye mtandao kwa kutumia **Cloudflare Tunnel**.

Mbinu hii huepuka uelekezaji wa bandari na huficha anwani yako halisi ya IP kutoka kwa umma - huku ikiifanya seva yako ipatikane kupitia HTTPS.

Pia hukusaidia **kuepuka gharama ya kukodisha VPS**, jambo ambalo linafaa ikiwa malipo ya cryptocurrency ni kipengele cha hiari badala ya kiini cha biashara yako.

---

### Hatua ya 1: Sakinisha Cloudflare Tunnel

1. Unda akaunti katika [cloudflare.com](https://www.cloudflare.com) na uongeze kikoa chako.
2. Kwenye **seva yako ya nyumbani**, sakinisha Cloudflare Tunnel kwa kutumia hazina rasmi ya vifurushi ya Cloudflare:

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install cloudflared
```

Ikiwa `apt install cloudflared` itashindwa, sakinisha `.deb` inayolingana badala yake:

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

3. Thibitisha kwa Cloudflare:

`cloudflared tunnel login`

Amri hii itafungua dirisha la kivinjari. Ingia na uidhinishe ufikiaji wa kikoa chako.
Cloudflare itaunda kiotomatiki faili ya `credentials` yenye tokeni kwenye seva yako.

4. Unda tunnel mpya (unaweza kuiita `btcpay` au jina lolote jingine):

`cloudflared tunnel create btcpay`

Hii huzalisha faili ya `btcpay.json` yenye kitambulisho cha tunnel na stakabadhi - utaihitaji katika hatua inayofuata.

---

### Hatua ya 2: Unda Faili ya Usanidi wa Tunnel

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

* `tunnel` - jina la tunnel uliyounda awali
* `credentials-file` - njia ya faili ya tokeni iliyozalishwa wakati wa `cloudflared tunnel login`
* `hostname` - kikoa chako kilichosajiliwa na Cloudflare (kwa mfano, `btcpay.example.com`)
* `service` - anwani ya ndani ya BTCPay Server yako (kwa kawaida `http://127.0.0.1:80` kwa Nginx)

> Cloudflare itaelekeza trafiki kwa usalama hadi seva yako ya ndani, bila kufichua IP yako ya nyumbani.


### Hatua ya 3: Ongeza Rekodi ya DNS kwa Tunnel Yako

Baada ya kuunda tunnel, kwa kawaida Cloudflare **itaongeza kiotomatiki rekodi ya DNS ya CNAME** kwa kikoa chako. Inapaswa kuonekana hivi:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Ikiwa haionekani kiotomatiki, iongeze mwenyewe:

1. Nenda kwenye [Dashibodi ya Cloudflare](https://dash.cloudflare.com/)
2. Nenda kwenye sehemu ya **DNS**
3. Ongeza rekodi mpya ya CNAME:
   - **Jina**: `btcpay`
   - **Lengo**: `<UUID>.cfargotunnel.com`  
     Unaweza kupata thamani halisi katika faili yako ya `btcpay.json` au kwa kuendesha:
     
     `cloudflared tunnel list`
     
   - **Hali ya proksi**: Imewashwa (wingu la chungwa)

> Rekodi hii huhakikisha kwamba maombi yote kwa `btcpay.example.com` yanaelekezwa kupitia Cloudflare Tunnel, ikificha anwani yako halisi ya IP kutoka kwa umma.

---

### Hatua ya 4: Washa Tunnel Wakati wa Kuanzisha Mfumo

Ili kufanya tunnel iendeshe kiotomatiki mfumo unapowashwa, isakinishe kama huduma ya mfumo:

`sudo cloudflared service install`

Kisha washa na uanzishe huduma:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Angalia hali:

`sudo systemctl status cloudflared`

Unapaswa kuona ujumbe kama `Active: active (running)` na uthibitisho kwamba `btcpay.example.com` iko mtandaoni.

> Kuanzia sasa, tunnel itaanza kiotomatiki kila mfumo unapoanzishwa upya, na BTCPay Server yako itapatikana kwa umma - bila uelekezaji wa bandari na bila kufichua IP yako halisi.

---

### Hatua ya 5: Kamilisha Usanidi wa BTCPay Server

Ikiwa unakaribia kusakinisha BTCPay Server kwa mara ya kwanza, weka kikoa chako kabla ya kuendesha script ya usanidi:

`export BTCPAY_HOST="btcpay.example.com"`

Hii huhakikisha kwamba kikoa sahihi kinatumika wakati wa kuzalisha **usanidi wa Nginx** na **vyeti vya SSL**.

Ikiwa BTCPay Server tayari imesakinishwa na unaongeza tu tunnel:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Usanidi utazalisha upya config na kutumia kikoa kipya.
Sasa unapaswa kuweza kufikia seva yako kwenye:

`https://btcpay.example.com`

> Iwe unatumia `lightwalletd` ya umma au full node yako mwenyewe, hili haliathiri tunnel.
> Jambo muhimu ni kwamba BTCPay Server inasikiliza kwenye `127.0.0.1:80` ndani ya nchi.


## Kusanidi Programu-jalizi ya Zcash katika Kiolesura cha Wavuti cha BTCPay Server

> **Muhimu kwa usanidi wa maduka mengi:**  
> Pochi ya Zcash iliyosanidiwa hapa ni **ya jumla** kwa instance. Maduka yote yatatumia pochi hii isipokuwa uendeshe instance tofauti za BTCPay.

Baada ya kuweka instance yako ya BTCPay Server kwa mafanikio, utahitaji kufanya usanidi wa msingi kupitia kiolesura cha wavuti cha msimamizi.  
Nyaraka rasmi hutoa maelekezo kamili kwa Kiingereza - hapa, tutapitia hatua muhimu na kulenga hasa kusanidi programu-jalizi ya Zcash.

---

### Hatua ya 1: Ingia kwenye Kiolesura cha Wavuti

Tembelea instance yako kwenye:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Weka jina lako la kuingia la msimamizi na nenosiri.
- Ikiwa hii ni mara yako ya kwanza kuingia, utaombwa kuunda akaunti.
- Akaunti ya kwanza utakayosajili itapewa kiotomatiki ruhusa za msimamizi.

---

### Hatua ya 2: Sakinisha Programu-jalizi ya Zcash

1. Katika menyu kuu, nenda kwenye:

`Plugins -> Browse Plugins`

2. Tafuta programu-jalizi ya **Zcash (ZEC)**. Tumia upau wa utafutaji ikihitajika.
3. Bofya **Sakinisha** na uthibitishe.

> Rudia mchakato huu kwa altcoin nyingine zozote ulizowasha wakati wa usanidi wa seva.

Baada ya usakinishaji, bofya **Anzisha Upya Seva** ili kupakia upya kiolesura pamoja na programu-jalizi zinazotumika.


### Hatua ya 3: Unganisha Pochi Yako kupitia Viewing Key

Baada ya kusakinisha programu-jalizi, sehemu mpya ya **Zcash** itaonekana kwenye menyu ya mipangilio.

1. Nenda kwenye:

`Zcash -> Settings`

2. Bandika **Unified Full Viewing Key (UFVK)** yako - BTCPay itatengeneza Anwani Iliyounganishwa kwa kila ankara na kugundua malipo ya faragha yanayoingia.

> **Dokezo:** Funguo za kutazama za zamani za Sapling zinaungwa mkono, lakini ili kutumia Orchard/Anwani Zilizounganishwa unapaswa kutoa **UFVK**.


   Muundo wa mfano:

`uview184syv9wftwngkay8d...`

3. Weka thamani katika uga wa urefu wa Block

* **Usanidi wa mara ya kwanza kwa pochi mpya (maneno mapya ya kurejesha pochi):** weka urefu wa sasa wa block wa Zcash (unaweza kuuangalia kwenye 3xpl.com/zcash) - hii huharakisha uchanganuzi wa awali.
* **Kuhama kwenye seva ileile kutoka usanidi wa zamani wa Sapling pekee hadi Anwani Zilizounganishwa / Orchard:** acha uga huu wazi.
* **Kuhamisha duka lako hadi seva mpya kwa pochi/UFVK ileile:** kwa hiari weka urefu wa kuzaliwa - urefu wa takriban wa agizo la kwanza lililolipwa la duka lako (linganisha tarehe ya agizo kwenye 3xpl ili kupunguza eneo la uchanganuzi). Ikiwa huna uhakika, acha wazi.

> Bado si pochi zote zinazoruhusu usafirishaji wa **Unified Full Viewing Key (UFVK)**.  
> Chaguo zinazopendekezwa:  
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! Wallet (toleo la PC)**](https://zingolabs.org/)  
> Katika programu zote mbili, tafuta usafirishaji wa UFVK katika sehemu ya kuhifadhi nakala/kuhamisha.

Funguo hizi zinaunga mkono **mzunguko wa kiotomatiki wa anwani**, ikimaanisha:
- Kila mteja hupata anwani ya **kipekee** ya malipo
- Unaona salio **moja, lililounganishwa**

Unaweza kupata orodha pana zaidi ya uoanifu kwenye [ZecHub -> Pochi](https://zechub.wiki/wallets).

Baada ya kujaza sehemu zote, bofya **Hifadhi**.

---

### Jaribu Mtiririko Wako wa Malipo ya ZEC

Hongera - pochi yako ya Zcash sasa imeunganishwa na BTCPay Server.

Hebu tufanye jaribio:

1. Nenda kwenye:

`Invoices -> Create New`

2. Tengeneza ankara ya majaribio kwa kiasi kidogo cha ZEC.
3. Tuma fedha kutoka **pochi tofauti** (si ile iliyounganishwa na BTCPay).
4. Muamala ukishagunduliwa, ukurasa wa ankara utaonyesha sherehe ya kuona.
5. Thibitisha kwamba hali ya ankara inabadilika kuwa **Imelipwa**.

Ikiwa kila kitu kinafanya kazi - uko tayari kuunganisha malipo ya ZEC kwenye tovuti yako kwa kutumia API au programu-jalizi za CMS.



## Kuunganisha BTCPay Server na Tovuti Yako

Pochi yako ya Zcash ikishaunganishwa na BTCPay Server, unaweza kuunganisha mfumo wa malipo kwenye tovuti yako.  
Kuna njia kadhaa za kufanya hivyo - kuanzia ufikiaji wa moja kwa moja wa API hadi programu-jalizi tayari kutumika za majukwaa maarufu ya CMS.

---

### Chaguo za Uunganishaji

- **Uunganishaji wa API**  
  Unafaa kwa tovuti au mifumo iliyojengwa mahususi bila CMS.  
  Hukupa udhibiti kamili wa kuunda ankara, kufuatilia malipo, na arifa - yote ndani ya kiolesura na mantiki yako mwenyewe.  
  Unahitaji ujuzi wa msingi wa upangaji programu, hivyo kazi hii inashughulikiwa vizuri zaidi na msanidi programu wako.

- **Programu-jalizi za CMS**  
  Zinapatikana kwa majukwaa kama **WooCommerce**, **PrestaShop**, na mengineyo.  
  Programu-jalizi hizi hukuruhusu kukubali malipo kwa dakika chache tu - hakuna uandishi wa msimbo unaohitajika.

- **Kitufe cha Malipo au Iframe**  
  Hii ndiyo mbinu rahisi zaidi.  
  Ni bora kwa kurasa za kutua, tovuti binafsi, au tovuti yoyote ambapo unataka tu kupachika kiungo cha mchango au wijeti ya malipo.

---

### Uunganishaji wa API

Ikiwa unatumia jukwaa maalum (au huna CMS kabisa), API ndiyo chaguo bora zaidi.  
Inakupa unyumbufu kamili: unaweza kuunda ankara, kufuatilia hali zake, kupokea arifa, na kudhibiti kikamilifu uzoefu wa mtumiaji.

> Dokezo: Hata baadhi ya programu-jalizi za CMS hutumia API kwa ndani, hivyo kuunda ufunguo wa API mara nyingi ni **hatua ya kwanza inayohitajika**, bila kujali mbinu yako ya uunganishaji.

Hatua inayofuata: zalisha ufunguo wa API kwa duka lako na uanze kutumia [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) kujenga uunganishaji wako.


### Kuzalisha Ufunguo wa API

Ili kuunganisha BTCPay Server na tovuti au programu yako, utahitaji kuzalisha ufunguo wa API.

1. Ingia kwenye BTCPay Server na ufungue **menyu ya mtumiaji** (kona ya juu kulia)
2. Nenda kwenye **Funguo za API**
3. Bofya **Unda ufunguo mpya wa API**
4. Weka jina la ufunguo wako
5. Katika sehemu ya **Ruhusa**, washa:
   - `Can create invoice`
   - `Can view invoice`
   - *(Hiari)* `Can modify store settings` - ikiwa tu unahitaji usimamizi wa kiwango cha duka

6. Bofya **Zalisha**. Ufunguo wako binafsi wa API utaonyeshwa - unakili na uuhifadhi kwa usalama.

> Ufunguo huu hutoa ufikiaji wa ankara za duka lako.  
> **Usiuweke** hadharani wala kuufichua katika msimbo wa upande wa mteja.

---

### Mfano: Kuunda Ankara kupitia API

**Endpoint:**

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

**Jibu:**

Utapokea kitu cha JSON chenye:

* `invoiceId`
* URL ya malipo ambayo unaweza kupachika kwenye tovuti yako au kumtumia mteja

Tazama nyaraka kamili:
[Greenfield API – Unda Ankara](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Kusanidi Webhook (Hiari)

Ili kupokea arifa za wakati halisi hali za ankara zinapobadilika (kwa mfano, malipo yanapopokelewa):

1. Nenda kwenye mipangilio ya duka lako -> **Webhooks**
2. Ongeza URL ya endpoint yako ya backend ambayo itashughulikia maombi ya `POST` kutoka BTCPay Server
3. BTCPay itatuma kiotomatiki arifa ankara inapolipwa au kuisha muda wake

Payload za webhook na mantiki ya kujaribu tena zimeelezwa katika [nyaraka rasmi za webhook](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Mifano ya uunganishaji inapatikana kwa lugha mbalimbali za upangaji programu katika nyaraka za BTCPay na hazina za GitHub.



### Uunganishaji wa CMS

BTCPay Server inaunga mkono programu-jalizi za mifumo maarufu ya usimamizi wa maudhui (CMS).  
Uunganishaji uliopevuka zaidi na unaotumiwa sana ni wa **WordPress + WooCommerce**, unaorahisisha kukubali malipo ya ZEC **bila kuandika msimbo**.

---

#### WooCommerce (WordPress)

BTCPay Server inaunga mkono rasmi programu-jalizi ya WooCommerce.

Hatua za kuunganisha:

1. Sakinisha programu-jalizi ya **BTCPay for WooCommerce** kutoka saraka ya programu-jalizi ya WordPress au kutoka GitHub.
2. Katika paneli yako ya msimamizi wa WordPress, nenda kwenye:

`WooCommerce -> Settings -> Payments`

3. Tafuta **BTCPay** kwenye orodha na ubofye **Sanidi**
4. Weka URL yako ya BTCPay Server na ufuate maelekezo ya uidhinishaji  
   (uzalishaji wa kiotomatiki wa ufunguo wa API unapendekezwa)
5. Washa mbinu ya malipo na uhifadhi mipangilio yako

> Maelekezo ya kina, mafunzo ya video, na miongozo ya utatuzi wa matatizo zinapatikana katika nyaraka za programu-jalizi.

Pia utapata chaguo nyingine za uunganishaji wa CMS katika sehemu hiyo hiyo ya nyaraka za BTCPay.

---

### Kitufe cha Malipo au Iframe (Hakuna CMS au API Inayohitajika)

Ikiwa hutumii CMS na hutaki kufanya kazi na API, njia rahisi zaidi ya kukubali malipo ya ZEC ni **kupachika kiungo cha malipo au wijeti** moja kwa moja kwenye tovuti yako.

Mbinu hii inafaa kwa:

- Kurasa za kutua
- Tovuti za portfolio
- Blogu au kurasa tuli
- Miradi isiyo na seva ya backend

---

#### Chaguo la 1: Kitufe cha Malipo (Kiungo)

1. Katika BTCPay Server, unda mwenyewe ankara katika sehemu ya **Ankara**
2. Nakili kiungo cha malipo, kwa mfano:

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

> Unaweza kutia mtindo kwenye kontena la kitufe au iframe ili lilingane na muundo wa tovuti yako - BTCPay Server huruhusu uwekaji wa mandhari unaonyumbulika wa ukurasa wa ankara.

## Hitimisho

Mwongozo huu ulikuwa mrefu - lakini unashughulikia tu vipengele vya msingi vya kuunganisha malipo [payments] ya Zcash na BTCPay Server.

Kiolesura [interface] cha BTCPay Server kinatoa utendaji zaidi sana kuliko tulivyoonyesha hapa. Kwa bahati nzuri, UI inapatikana katika lugha nyingi (ikiwemo Kirusi), hivyo kurahisisha kuchunguza na kufanya majaribio zaidi.

BTCPay ni kifaa kinachonyumbulika sana. Unaweza:

* Kupangisha maduka huru mengi kwenye instancia moja
* Kufafanua majukumu na ruhusa maalum za wanatimu - kuanzia kutazama maagizo pekee hadi usimamizi kamili
* Kutumia domani na utambulisho wako wa chapa
* Kuweka webhook, pochi za akiba, na hata ufikiaji wa Tor
* Kusanidi mipangilio ya juu kama vile kanuni za kodi, misimbo ya punguzo, ubinafsishaji wa ukurasa wa malipo, vizuizi vya mbinu za malipo, na mengineyo

BTCPay iliundwa kama mbadala wa chanzo huria [open-source] wa watoa huduma za malipo waliowekwa katikati. Ikiwa unatafuta kukubali malipo ya faragha ya ZEC bila waamuzi, jukwaa hili linastahili kabisa umakini wako.

Tunakutakia mafanikio katika kuchunguza mfumo ikolojia wa BTCPay na kufanya malipo yako yawe yako kweli.

## Rasilimali

* [BTCPay Server Tovuti Rasmi](https://btcpayserver.org/)
* [Maswali Yanayoulizwa Mara kwa Mara kuhusu BTCPay](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server Hazina ya GitHub](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Onyesho la Mainnet](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Programu-jalizi ya Zcash [Plugin] ya BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Mwongozo wa Usakinishaji wa Programu-jalizi wa Zcash](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Mfano Maalum wa zcash-lightwalletd.custom.yml](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [lightwalletd Faili ya Compose ya Docker (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Hati za Ufunguo wa API wa BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Unda Handaki la Cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Orodha ya Uoanifu wa Pochi ya Zcash (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + lightwalletd kwenye Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
