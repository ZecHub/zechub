# Gbigba zcashd si Akash nipasẹ Iṣakoso

Guide for deploying a zcashd Zcash full node (Electric Coin Co implementation) using [Akash Console](https://console.akash.network). Eyi ni fidio ẹkọ ni isalẹ. A le rii itọsọna jinlẹ diẹ sii ni isalẹ

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    jẹ́ kíFullScreen
    loading="lazy"
  />
</div>


## Ohun Tó O Ń Fi Sílò

Oju opo zcashd kikun ti yoo:

-> Ṣiṣẹpọ gbogbo blockchain Zcash (350GB+ fun mainnet, ~ 40GB fun testnet)

-> Iye owo to to $15/osù ti o da lori iye owo AKT token

-> Gba ọ̀pọ̀lọpọ̀ wákàtí sí ọjọ́ láti ṣe àpapọ̀

-> Lo 4 vCPUs, 16GB RAM, 350GB ibi ipamọ (mainnet) tabi 2 vCPU, 8GB Ram, 50GB (testnet)

-> Ṣe igbasilẹ awọn paramita cryptographic lori ṣiṣe akọkọ (~ 2GB, akoko kan)

** zcashd àti Zebra:**

-> zcashd ni awọn atilẹba Zcash node imuse nipa Electric Coin Co.

-> Zebra ni awọn Zcash Foundation ká yiyan imuse

-> Awọn mejeeji ni ibamu pẹlu awọn Zcash nẹtiwọki

-> zcashd ni awọn ẹya ara ẹrọ diẹ sii (mining, apamọwọ, Insight Explorer API)

-> Lo zcashd ti o ba nilo iṣẹ apamọwọ tabi awọn API RPC kan pato


### **Ó ṣe pàtàkì: Ṣíṣe àwòrán àwọn èbúté ní Akash**

When you expose a port on Akash (e.g., port 8233 for zcashd P2P), it **does NOT bind to that exact port** on the provider's public IP. Instead, the provider assigns a random high port (like 31234 or 42567) and reverse-proxies it to your container's port 8233.

Eyi jẹ nipa apẹrẹ - awọn olupese ṣiṣe ọpọlọpọ awọn igbasilẹ, ati pe wọn yoo ni awọn rogbodiyan ti gbogbo eniyan ba gbiyanju lati lo ibudo 8233 taara.

** Ohun tí èyí túmọ̀ sí fún ọ:**

-> You configure port 8233 in the SDL (zcashd's standard P2P port)

-> Akash fún ọ ní URI bíi *provider.com:31234*

-> Àwọn ìkànnì Zcash míràn máa ń so mọ́ ọ ní *provider.com:31234*

-> Ninu apoowe rẹ, zcashd ṣi n tẹtisi lori 8233


Ojúlówó ni, lo URI tí Akash fún ọ.

## Àwọn ohun tó pọn dandan

-> **Keplr Wallet** àfikún aṣàwákiri ti a fi sori ẹrọ (Chrome/Brave/Firefox)

-> ** AKT tokens ** - Gba 50-100 AKT lati paṣipaarọ kan (Coinbase, Kraken, Osmosis)

-> **5 ìṣẹ́jú** láti tẹ nípasẹ̀ UI Console


## Ìgbésẹ̀ 1: So Wọ́ọ́lì Rẹ pọ̀

-> Go to [https://console.akash.network](https://console.akash.network)

-> Tẹ **"Sopọ apamọwọ"** ni apa ọtun oke

-> Yan **Keplr** (tàbí àpò owó Cosmos tí o yàn)

-> Fọwọsi asopọ nigbati Keplr ba jade


Owó tó wà nínú àkáǹtì rẹ á fara hàn lókè lápá ọ̀tún.

## Ìgbésẹ̀ 2: Ṣẹ̀dá Ìmúgbòòrò

-> Tẹ **"Deploy"** bọtini (ìgbò ńlá bulu bọtini, aarin ti ojúewé)

-> Yan **"Ṣẹ́ àdàkọ rẹ"** (tàbí kó o lọ tààrà sí gbígbé SDL)

### Aṣayan A: Gbigba faili SDL (Ti a ṣe iṣeduro)

[![Gbé jáde ní Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Aṣayan B: Lo Àtúnṣe SDL

Ti o ba fẹ lati fi sori ẹrọ SDL pẹlu ọwọ:

-> Ṣe àdàkọ àwọn ohun tó wà nínú *zcashd-akash.yml*

-> Fi sínú àtúnṣe SDL

-> Ṣe àtúnṣe bí ó bá ṣe yẹ (wo abala ìtòlẹ́sẹẹsẹ nísàlẹ̀)

-> Tẹ **"Ṣẹda Àgbékalẹ̀"**


## Ìgbésẹ̀ Kẹta: Ṣíṣàyẹ̀wò àti Yíyọ̀ǹda Ètò Ìdókòwò

Àpótí náà yóò fi hàn ọ́ pé:

-> **Ipamọ idasilẹ**: ~ 5 AKT (o gba eyi pada nigbati o ba pa idasẹsẹ naa)

-> **Iye owo ti a ṣe iṣiro**: Da lori idiyele SDL rẹ


Tẹ ** "Fọwọsi"** ki o si buwọlu awọn idunadura ni Keplr.

## Ìgbésẹ̀ Kẹrin: Yan Ẹni Tó Máa Bójú Tó O

Lẹ́yìn ~ 30 ìṣẹ́jú, ẹ óo rí owó tí àwọn olùpèsè ń tà.

-> **Iye owo fun bulọọki** (ni AKT tabi USDC)

-> **Owó tí a fojú díwọ̀n lóṣooṣù**

-> **Awọn alaye olupese** (akoko iṣẹ, agbegbe, ati bẹbẹ lọ)


* Má kàn yan èyí tó bá tà jù lọ.* * Ṣayẹwo:

-> % àkókò ìmúṣẹ (ìlépa fún > 95%)

-> Agbegbe (ti o sunmọ ọ = idaduro to dara julọ, ṣugbọn ko ṣe pataki pupọ fun awọn node blockchain)

-> Àsìṣe tí a ṣàyẹ̀wò (àmì àyẹ̀wò aláwọ̀ ewé = tó ṣeé gbára lé jùlọ)


Tẹ **"Gba Ipese"** lori olupese ti o yan ki o wọle si Keplr.

## Igbesẹ 5: Duro fun Ifilọlẹ

Àpótí yóò:

-> Ṣẹda adehun yiyalo pẹlu olupese ti o yan

-> Firanṣẹ àkọsílẹ̀ (sọ fún olùpèsè ohun tí yóò fi ṣiṣẹ́)

-> Bẹrẹ apo rẹ


Èyí yóò gba ìṣẹ́jú méjì sí márùn-ún. Ẹ óo rí àtúnṣe ipò nínú UI.

## Ìgbésẹ̀ 6: Rí i dájú pé Ó Ń Ṣiṣẹ

Nígbà tí a bá ti gbé e jáde, ẹ ó rí i pé:

-> **Services** tab: Shows your *zcashd* service with status

-> **Logs** tab: Live logs láti inú zcashd node rẹ

-> Àkọsílẹ̀ ìgbafẹ́: Ìsọfúnni nípa ìmúgbòòrò rẹ (DSEQ, olùpèsè, iye owó)


### Ṣayẹwo Àwọn Àkọsílẹ̀

Tẹ lori **Logs** ki o si o yẹ ki o ri zcashd bẹrẹ soke:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Igbesẹ akọkọ yoo ṣe igbasilẹ zcash-params (~ 2GB).** Eyi jẹ iṣẹ-ṣiṣe akoko kan ati gba iṣẹju 5-10 da lori bandwidth olupese. Awọn atunṣe atẹle yoo fo eyi.

Ìṣàmúlò náà yóò gba **wákàtí sí ọjọ** ní ìbámu pẹ̀lú nẹtiwọọki. Ṣójú fún:

-> Àfikún àwọn gíga àlàfo

-> Awọn asopọ ẹlẹgbẹ (o yẹ ki o jẹ 10-30 awọn ẹlẹgbẹ)

-> Kò sí àṣìṣe tí ó tún ṣe


## Igbesẹ 7: Gba Adirẹsi Nọ́ọ̀dù Rẹ

Tẹ lori awọn ** Leases ** taabu, ki o si ** URI **.

O ó rí nǹkan bíi:

```
zcashd-8233: provider-hostname.com:31234
```

Eleyi jẹ rẹ node ká ** gbangba P2P opin ojuami **. miiran Zcash nodes yoo sopọ si o ni adirẹsi yi.

**Mọ̀ nípa àwòrán ojú pópó:** O ṣe àdàkọ ibudo 8233 nínú SDL, ṣùgbọ́n Akash yàn án sí ibudo ìjápọ̀ mìíràn (31234 nínú àpẹrẹ yìí). Èyí jẹ́ ohun tí ó wọ́pọ̀ - wo abala "Àdàkọ ojú-pópópó lórí Akash" ní òkè bí èyí bá rú ọ lójú. Ìpín rẹ jẹ́ èyí tí a lè wọlé sí ní ibudo yòówù tí Akash fi hàn níbí, kìí ṣe dandan 8233.

If you enabled RPC (commented out by default in the SDL), you'll also see the RPC endpoint here with its own mapped port.

## Àwọn Àtúnṣe Ìṣètò

### Yíyípadà sí Àwòdì Ìdánwò

SDL ṣe àfojúsùn sí Mainnet. Láti lo Testnet dípò:

-> **Àtúnṣe nẹtiwọọki ní ẹ̀ka *env*:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> **Ṣàtúnṣe èbúté tí a fi hàn** ní apá *fi hàn*:

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **Ohun ti o fẹ: Din awọn orisun** fun Testnet ni *profiles.compute.zcashd.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Ohun ti o fẹ: Iye owo kekere** ni *awọn profaili.ibi.akash.iye owo*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> note lowering prices may filter our providers form bidding. experience with this value, or use the provider endpiont to check if they would bid. (review provider api documentation) kí wọ́n lè ṣàyẹ̀wò bí àwọn oníbàárà wa ṣe ń rajà.

### Fún RPC Àwárí Àwòrán

RPC ti wa ni idiwọ nipasẹ aiyipada fun aabo. Lati jẹ ki o ṣiṣẹ:

**Critical: Set strong credentials.** zcashd RPC máa ń fi orúkọ oníṣe/ọ̀rọ̀-ìfipamọ́ ránṣẹ́ lórí HTTP (kì í ṣe HTTPS).

-> Àkọlé nínú ẹ̀ka *env*:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Uncomment èbúté RPC nínú *expose*:

   ** fún Mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Fún Àwòdì:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**ìkìlọ̀**: bí o bá fi *global: true* sí RPC, o ń tú u sílẹ̀ fún ayélujára pẹ̀lú òfin ìkọ̀sílẹ̀. Èyí jẹ́ èrò tí kò dára. Lo *glonal: false* kí o sì wọlé sí RCC nípasẹ̀ ẹ̀rọ-ayárabíàṣá Akash tàbí ṣètò ọ̀nà ìkọjá tí ó ní ààbò.

**ìrántí ìfiwéra èbúté**: Bí o bá fi RPC hàn lágbàáyé, Akash yóò fi í hàn sí èbútó gíga tí ó jẹ́ àbáwọlé (kì í ṣe 8232/18232). Ṣayẹwo àwọn URI nínú ìmúṣẹ rẹ láti rí ojúlówó ìparí èrò. fún *global: false* (a dábàá), ìparẹ̀ RPC jẹ́ èyí tí a lè wọlé sí lábẹ́ ẹ̀rọ-ìmúṣẹ Akash nìkan, kì í ṣe láti orí ayélujára.

### Fún Àmì Ìṣirò Ìṣèlú

Atọka idunadura jẹ ki o beere eyikeyi idunwo nipasẹ ID rẹ nipasẹ RPC. Lo ibi ipamọ diẹ sii (~ 20% ilosoke).

Àkọlé nínú *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Ìkìlọ̀**: Fífún txindex láàyè lórí ìsopọ̀ tí ó wà tẹ́lẹ̀ gba àtúnyẹ̀wò gbogbo blockchain, èyí tó gba ọ̀pọ̀ wákàtí.

### Ṣiṣẹ́ Àwòrán-ìmọ̀

Insight Explorer n pese awọn ipari REST API afikun fun data blockchain (lori anfani fun awọn oluwadii bulọọki).

Àkọlé nínú *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Eyi yoo mu txindex ṣiṣẹ laifọwọyi ati ṣafikun awọn ọna RPC afikun.

### Fún Àwọn Ìsọfúnni Prometheus

Lati yọ awọn iṣiro fun ibojuwo:

-> Àkọlé nínú *env*:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Yọ̀ àwọn àlàfo tó wà nínú *expose* kúrò:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Awọn iṣiro yoo wa ni: http://yourendpoint:9969/metrics nínú ìtòlẹ́sẹẹsẹ Prometheus.

### Ṣíṣàtúnṣe Àwọn Ìpèsè/Ìlówó

Ti o ko ba gba awọn ipese tabi fẹ lati mu iye owo pọ si:

** Fun awọn olupese ti o kere si-spec**, dinku ni *profiles.compute.zcashd.resources* apakan:

-> CPU: *units: 2* (ìpínlẹ̀ fún iyara ìsopọ̀ tó yẹ)

-> Ìrántí: *ìyí: 12Gi* (ìpín-ìdín-ní-ìdí fún ìdúróṣinṣin)

-> Ìpamọ́: *ìtóbi: 120Gi* (ìwọ̀nba tó kéré jùlọ fún mainnet)


** Lati fa awọn ipese diẹ sii **, alekun ni * profaili. ipo.akash. idiyele *:

-> Mainnet: Try *amount: 15000* uakt/block

-> Àwòṣe: Gbiyanju *iye: 7500* uakt/ìdìpò


Àwọn iye SDL ni a gbé kalẹ̀ lọ́nà tí kò fi bẹ́ẹ̀ gbòòrò.

## Mímú Ìtòlẹ́sẹẹsẹ Rẹ Tún Ṣe

Ṣe o nílò àtúnṣe ìtòlẹ́sẹẹsẹ lẹ́yìn tí o bá ti ṣíṣẹ́?

-> Lọ sí **Àwọn Ìpínlẹ̀ mi** ní Console

-> Wá ìmúgbòòrò zcashd rẹ

-> Tẹ **"Àtúnṣe Ìmúgbòòrò"**

-> Ṣàtúnṣe SDL

-> Tẹ **"Àtúnṣe"** ki o si fọwọsi ni Keplr


**Àkíyèsí**: Àtúnṣe yóò tún àpòòwò rẹ ṣe. Àkó náà yóò tún padà bẹ̀rẹ̀ láti ipò tí ó ti fi pamọ́ (ìpamọ́ tí ó wà pẹ́ títí), ṣùgbọ́n retí ìṣẹ́jú 1-2 ti àkókò ìsinmi.

## Ìtójútó

### Nípasẹ̀ Àpótí

-> ** Àwọn àkọọ́lẹ̀ ìpamọ́**: Àwọn àkọọ́lẹ̀ àpò-ìpèsè tí ó wà láàyè

-> **Shell tab**: Gba shell kan ninu apoti naa (lori anfani fun atunṣe aṣiṣe)

-> **Awọn iṣẹlẹ tab**: Awọn iṣẹlẹ Kubernetes (ọpọ julọ ti ko wulo ayafi ti nkan kan ba fọ)


### Nípasẹ̀ RPC (bí ó bá wà)

Ti o ba ti muu ṣiṣẹ RPC, o le beere rẹ node bi a deede zcashd kikun node (nitori o jẹ!)

### zcash-cli Àtúnṣe

Ti o ba ni iwọle shell nipasẹ Console, o le lo *zcash-cli* taara:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Ìparí Iṣẹ́-ìṣètò Rẹ

Nígbà tí o bá ti parí tàbí tí o kò bá fẹ́ sanwó mọ́:

-> Lọ sí **Àwọn Ìpínlẹ̀ mi**

-> Wá ìmúgbòòrò zcashd rẹ

-> Tẹ **"Sún ìmúgbòòrò"**

-> Fọwọsi ki o si buwolu wọle Keplr


A ó dá owó ìsúná 5 AKT rẹ padà. **Ìpamọ́ tí ó wà pẹ́ títí** yẹ kí olùpèsè náà pa á mọ́, ṣùgbọ́n má ṣe gbára lé e - fi ṣe bíi ti olùpènyàn àwọsánmà yòókù.

## Àtúnṣe àṣìṣe

### Àṣìṣe "Àwọn owó tí kò tó"

O nílò àpò AKT sí i, kó o sì fi kún owó Keplr rẹ.

### Kò sí ìnáwó tó ń yọjú

Yálà:

-> Owó tí ẹ ń san kò tó nǹkan rárá (ẹ fi *iye owó náà* kún un ní SDL)

-> Awọn ibeere ohun elo rẹ ga ju fun awọn olupese ti o wa ( dinku CPU / iranti / ibi ipamọ)

-> Duro diẹ sii (nigbakan o gba 60-90 aaya fun awọn ifiranṣẹ lati han)


### Ìmúgbòòrò tí ó dúró ní "ìdúró"

Olùpèsè náà lè ní ìṣòro. Pa ìmúgbòòrò náà mọ́ kí o sì gbìyànjú olùpèsè mìíràn.

### Àwọn àkọọ́lẹ̀ zcashd fi hàn "Kò sí àwọn ẹlẹgbẹ́ tí wọ́n so pọ̀"

Eyi jẹ deede fun awọn iṣẹju diẹ akọkọ. zcashd yoo ṣe awari awọn ẹlẹgbẹ laifọwọyi. Ti o ba tẹsiwaju lẹhin iṣẹju 10+, o le ni iṣoro nẹtiwọọki (ko ṣee ṣe lori Akash).

### Àwọn àṣìṣe "Láti inú ìrántí" nínú àwọn àkọọ́lẹ̀

O ti dín RAM kù. Pa ìmúgbòòrò náà mọ́ kí o sì tún un múlẹ̀ pẹ̀lú 12Gi memory ó kéré tán (16Gi recommended).

### Ṣíṣàtúnṣe ń gba àkókò gígùn

Ṣàlàyé ohun tó túmọ̀ sí láti wà láàyè títí láé:

-> ** Wákàtí**: Ìwọ̀n

-> **Ọjọ**: O tun jẹ deede fun mainnet lati ibẹrẹ

-> **Weeks**: Nkankan ti ko tọ, ṣayẹwo awọn akọọlẹ fun awọn aṣiṣe


### "Àṣìṣe tí ó ń mú zcash-params wá"

Olùpèsè náà lè ní àwọn ọ̀rọ̀ lórí ẹ̀rọ-ìpèsè tàbí ìsókè tí ó lọ́ra. Èyí sábà máa ń yanjú ara rẹ̀. Bí ó bá tẹ̀síwájú fún àkókò tó ju ọgbọ̀n ìṣẹ́jú lọ, gbìyànjú láti yí padà sí olùpèsè mìíràn.

### Àwọn àṣìṣe ìdánimọ RPC

-> Ṣayẹwo pe *ZCASHD_RPCUSER* ati *Z CASHD_ RPCPASSWORD* ti wa ni ṣeto ni deede

-> Ṣayẹwo pe o nlo ibudo ti o tọ (8232 fun mainnet, 18232 fún testnet)

-> Ranti ibudo ti wa ni maapu nipa Akash - lo awọn URI lati rẹ deployment, ko 8232 taara


## Iṣakoso Iye owo

Ṣàkíyèsí ìnáwó rẹ nínú Ẹrọ-ìmọ̀ràn:

-> **My Deployments** -> Your deployment -> Fi "Owo fun osu kan" iṣiro han

-> Àdéhùn àpò Keplr rẹ yóò dín kù pẹ̀lú àkókò


When your balance runs low, Akash will auto-close your deployment. **Top up your wallet periodically** or set up alerts.

### Bá A Ṣe Lè Dín Owó Tó Ń Náni Kù

-> **Lọ́wọ́ Testnet** fún àyẹ̀wò tí kò ní í ṣe pẹ̀lú iṣẹ́ ìbílẹ̀ (50% ó dínwó kù)

-> ** CPU/ìrántí ìsàlẹ̀** bí o kò bá nílò ìsọ̀kan tó yára

-> **Yan awọn olupese ti o din owo** (ko jẹ ọlọgbọn nigbagbogbo - awọn ọrọ akoko)

-> **lo USDC dípò AKT** bí iye owó AKT bá ń yí padà (ó nílò ìyípadà iye owó SDL)

-> **Disable txindex** ti o ba ti o ko ba nilo o (fi ~ 20% ibi ipamọ)


### Àwọn Owó Àfikún

Àpótí Akash:https://console.akash.network](https://console.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

Àwọn Olùwádìí Zcash:https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

Akash Àríyànjiyàn:https://discord.akash.network](https://discord.akash.network) (fún àwọn ọ̀ràn olùpèsè)

## Àwọn Àkíyèsí Ìparí

- **Ìṣòro ìpamọ́ tí ó wà pẹ́ títí.** Má ṣe fi *ìṣòro tó wà pẹ̀lú: òtítọ́* sílẹ̀ tàbí lo *beta2* class. Lo *beta3*.
- **ìmúṣiṣẹ́pọ̀ ìbẹ̀rẹ̀ lọ́ra.** Jẹ́ onísùúrù. Èyí jẹ́ ohun tí ó wọ́pò fún àwọn ìsọ̀rí blockchain.
- **Máa kó owó sínú àpamọ́ rẹ.** Àwọn ohun èèlò tí wọ́n ń lò máa ń pa ara wọn nígbà tí kò bá sí AKT mọ́.
- **Awọn afẹyinti kii ṣe laifọwọyi.** Ti o ba bikita nipa data naa, gba pe o le parẹ ki o si gbero ni ibamu.
- **Aabo RPC jẹ pataki.** Maṣe fi RPC han si intanẹẹti laisi awọn igbese aabo to yẹ.
- ** zcash-params are cached.** First run downloads ~2GB of cryptographic parameters. Eyi jẹ deede ati pe o ṣẹlẹ lẹẹkan nikan.
