# Ṣíṣiṣẹ́pọ̀ zcashd sí Akash nípasẹ̀ Àpèsè-ìmọ̀ràn (Console)

> **Kò yẹ. Má ṣe tẹ̀lé ìtọ́ni yìí láti fi kókó tí o fẹ́ lò.**
>
> zcashd dé ìparí-ìtìlẹ́yìn rẹ̀ ní July 18, 2026. Ìpín kan tí a gbé kalẹ̀ lónìí kò ni bára mu pẹ̀lú òpin ẹ̀ka, nítorí náà fífi owó ránṣẹ́ lóṣooṣù kì í mú nǹkankan jáde.
>
> Ṣíṣètò Zebra dípò: [Bii o ṣe le ṣiṣẹ Zebra lori Akash Network](/guides/akash-network-zebra), eyi ti o bo kanna Akash Console workflow ati ki o nilo ni ayika kan kẹta ti awọn disk. Ti o ba wa gbigbe ohun tẹlẹ iṣeto, wo awọn [zcashd to Zebra and Zallet migration guide ìtójútán ìrìnàjò àwọn ẹyẹ zebra àti zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Ojúewé yìí ni a tọ́ sí gẹ́gẹ́ bí àkọsílẹ̀ ìtàn ìmúgbòòrò zcashd.

Itọsọna fun deploying a zcashd Zcash kikun node (Electric Coin Co imuse) lilo awọn oniwe-ašẹ ti o ni agbara lati ṣe itọkasi ohun elo. [Àpótí Akash](https://console.akash.network). Eyi ni fidio ẹkọ ti o wa ni isalẹ. A le rii itọsọna jinlẹ diẹ sii ni isalẹ

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    gba Àwòrán-ìwòyí ní kíkún (FullScreen)
    loading="lazy"
  />
</div>


## Ohun Tó O Ń Fi Sílò

A ni kikun zcashd node ti yoo:

-> Ṣiṣẹpọ gbogbo blockchain Zcash (350GB+ fun mainnet, ~ 40GB fún testnet)

-> Iye owo to $15/osù ti o da lori iye owó AKT token

-> Gba ọ̀pọ̀lọpọ̀ wákàtí sí ọjọ́ láti ṣe àpapọ̀ ìsopọ̀ pátápátá

-> Lo 4 vCPUs, 16GB RAM, 350GB ibi ipamọ (mainnet) tabi 2 vCPU, 8GB RAM , 50GB (testnet)

-> Ṣe igbasilẹ awọn paramita cryptographic ni ṣiṣe akọkọ (~ 2GB, akoko kan)

**zcashd vs Zebra:**

-> zcashd ni àtúnyẹ̀wò ìpilèwe Zcash node tí Electric Coin Co ṣe, ti a dá dúró láti July 18, 2026

-> Zebra, lati ile-iṣẹ Zcash Foundation ni gbogbo node ti a lo loni.

-> Zebra nìkan ló ń tẹ̀lé ìsínà tó wà nísinsìnyí; kò sí àpò zcashd tí ó lè dé orí ẹyọ náà.

-> àpò owó zcashd ti di èyí tí a fi rọ́pò rẹ̀. [Zallet](/using-zcash/zallet-quick-reference-guide)

-> Lo zcashd ti o ba nilo iṣẹ apamọwọ tabi awọn API RPC kan pato


### **Ohun pataki: Ṣíṣe àwòrán àwọn èbúté ní Akash**

Nigbati o ba ṣafihan ibudo kan lori Akash (fun apẹẹrẹ, ibudo 8233 fun zcashd P2P), ko ** ṣe adehun si ibudo gangan yẹn** lori IP gbangba ti olupese. Dipo, olupese naa fi aaye gba ipo giga laileto (bii 31234 tabi 42567) ati idakeji-agbara rẹ si ebute apoti ọkọ oju omi rẹ 8233.

Eyi jẹ nipa apẹrẹ - awọn olupese ṣiṣe ọpọlọpọ ifisilẹ, ati pe wọn yoo ni ariyanjiyan ti gbogbo eniyan ba gbiyanju lati lo ibudo 8233 taara.

** Ohun tí èyí túmọ̀ sí fún ọ:**

-> You configure port 8233 in the SDL (zcashd's standard P2P port)

-> Akash fún ọ ní URI bíi *provider.com:31234*

-> Àwọn ìkànnì Zcash mìíràn máa ń so mọ́ ọ ní *provider.com:31234*

-> Ninu apo rẹ, zcashd ṣi n gbọ 8233


Ojúlówó ni, lo URI tí Akash fún ọ.

## Àwọn ohun tó yẹ kó wà nípò àkọ́kọ́

-> **Keplr Wallet** ìmúgbòòrò aṣàwákiri ti a fi sori ẹrọ (Chrome/Brave/Firefox)

-> ** AKT tokens** - Gba 50-100 AKT lati ibi paṣipaarọ kan (Coinbase, Kraken, Osmosis)

-> **ìṣẹ́jú 5** láti tẹ̀lé ìtọ́ka UI


## Igbesẹ 1: So Àpò-ìpamọ́ Rẹ pọ̀ mọ́

-> Go to [https://console.akash.network](https://console.akash.network)

-> Tẹ **"Sopọ apamọwọ "** ni apa ọtun oke

-> Yan **Keplr** (tàbí àpò owó Cosmos tí o yàn)

-> Gba asopọ naa nigbati Keplr ba jade soke


Àkáǹtì owó tó o ní nínú AKT á fara hàn lókè lápá ọ̀tún. Tó bá jẹ́ pé kò sí nǹkan kan, kọ́kọ́ lọ rawó sínú àpamọ̀ rẹ.

## Igbese 2: Ṣẹda Ifisilẹ

-> Tẹ **"Deploy"** ìkànnì (ìwo bulu ńlá, àárín ojúewé)

-> Yan **"Ṣẹ̀dá àwòkọ́ṣe rẹ"** (tàbí kó o lọ tààrà sí gbígbé SDL)

### Aṣayan A: Gbigba faili SDL (A ṣe iṣeduro)

> **Bọtini yìí ń gbé ìkànnì tí a dá dúró jáde.** Ó máa sanwó sí àlàfo AKT rẹ fún ìkànlì kan tó kò lè ṣe ìṣọ̀kan. Lo àwọn ohun èlò náà: [Atọ́nà Zebra](/guides/akash-network-zebra) dípò ìyẹn.

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Aṣayan B: Lo Àtúnṣe SDL

Ti o ba fẹ lati fi sori ẹrọ SDL pẹlu ọwọ:

-> Ṣe àdàkọ àwọn ohun tó wà nínú *zcashd-akash.yml*

-> Fi sínú àtúnṣe SDL (SDL)

-> Yíyí bí ó bá ṣe yẹ (wo abala ìtòlẹ́sẹẹsẹ nísàlè)

-> Tẹ **"Ṣídá Ìmúgbòòrò"**


## Ìgbésẹ̀ 3: Ṣíṣàyẹ̀wò àti Fọwọ́ sí Àkáǹtì Owó Náà

Àpótí náà yóò fi hàn ọ́:

-> **Ipamọ́ ìmúṣẹ**: ~ 5 AKT (o gba èyí padà nígbà tí o bá parí iṣẹ náà)

-> **Iye owo ti a ṣe iṣiro**: Da lori idiyele SDL rẹ.


Tẹ "Fọwọsi" ki o si buwọlu awọn idunadura ni Keplr.

## Ìgbésẹ̀ Kẹrin: Yan Ẹni Tó Máa Bójú Tó O Ní Nǹkan Rẹ

Lẹ́yìn ~ 30 ìṣẹ̀lẹ̀, ẹ ó rí àwọn owó tí wọ́n fi ń ra ọjà. Ẹnìkan ní:

-> **Iye owo fun bulọọki** (ni AKT tabi USDC)

-> **Owó tó ń náni lóṣooṣù tí a fojú bù**

-> **Awọn alaye olupese** (akoko iṣẹ, agbegbe, ati bẹbẹ lọ)


** Má kàn yan èyí tó bá tà jù lọ.** Ṣayẹwo:

-> % àkókò ìmúṣẹ (ìlépa fún > 95%)

-> Agbegbe (ọ̀nà tó súnmọ́ ọ = ìdúró tí ó dára jùlọ, ṣùgbọ́n kò ṣe pàtàkì fún àwọn àpòòwò blockchain)

-> Àmì àyẹ̀wò (àpáta aláwọ̀ ewé = ó ṣeé gbára lé jùlọ)


Tẹ **"Gba Ipese naa "** lori olupese ti o yan ati wọle Keplr.

## Igbesẹ 5: Duro fun Ifilọlẹ

Àpótí yóò:

-> Ṣẹda adehun yiyalo pẹlu olupese ti o yan rẹ

-> Fi àdàkọ ìsọfúnni ránṣẹ́ (ó sọ fún olùpèsè ohun tí yóò fi ṣiṣẹ́)

-> Bẹrẹ apo rẹ


Eyi gba iṣẹju 1-2. O yoo ri awọn imudojuiwọn ipo ni UI naa.

## Ìgbésẹ̀ 6: Rí i dájú pé Ó Ń Ṣiṣẹ́

Nígbà tí a bá ti gbé e jáde, ẹ ó rí i pé:

-> **Services** tab: Shows your *zcashd* service with status

-> **Logs** tab: Live logs láti inú zcashd node rẹ

-> **Líìsì** ìlà: Àlàyé nípa fífi ẹ̀rọ rẹ ranṣẹ (DSEQ, olùpèsè iṣẹ́, iye owó)


### Ṣayẹwo Àwọn Àkọsílẹ̀ Ìsọfúnni

Tẹ lori **Logs** ki o si ti o yẹ ki o ri zcashd bẹrẹ soke:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Igbesẹ akọkọ yoo ṣe igbasilẹ zcash-params (~ 2GB).** Eyi jẹ iṣẹ kan ati pe o gba iṣẹju 5-10 da lori bandwidth olupese. Awọn atunṣe atẹle yoo fo eyi silẹ.

Àdánwò náà yóò gba **wákàtí sí ọjọ** ní ìbámu pẹ̀lú nẹ́tàkì. Ṣójú fún:

-> Àfikún àwọn ìdìpò̀ gíga

-> Àwọn ìjápọ̀ ẹlẹgbẹ́ (ó yẹ kí ó jẹ 10-30 àwọn ẹbí)

-> Kò sí àṣìṣe tí ó tún ṣe lẹ́ẹ̀kan náà mọ́.


## Ìgbésẹ̀ 7: Gba Àdírẹ́sì Nódù Rẹ

Tẹ lori ìkànnì **Leases**, lẹ́yìn náà ni ó tẹ lórí ìkànlì **URIs**.

O ó rí nǹkan bíi:

```
zcashd-8233: provider-hostname.com:31234
```

Eyi ni ìparí P2P ti gbogbo ènìyàn. Àwọn ìparì Zcash mìíràn yóò so mọ́ ọ ní àdírésì yìí.

**Mọ̀ nípa àwòrán ojúlé:** O ṣe àdàkọ ibudo 8233 nínú SDL, ṣùgbọ́n Akash yàn án sí ibú gbangba mìíràn (31234 ní àpẹẹrẹ yìí). Èyí jẹ́ òòṣà - wo abala "Àwòrán ojúlé lórí Akash" ni òkè bí èyí bá ń dà yín rú. Ìpín rẹ lè dédé láti ibi tí port Akash ti fi hàn níbí, kì í ṣe dandan kí ó jẹ́ 8233.

Ti o ba ti muu ṣiṣẹ RPC (ti a sọ jade ni aiyipada ninu SDL), iwọ yoo tun rii opin ipari RPC nibi pẹlu ibudo maapu tirẹ.

## Àwọn Àtúnṣe Ìṣètò

### Yíyípadà sí Àwòdì Ìdánwò

SDL jẹ àbínibí sí Mainnet. Lati lo Testnet dípò:

-> **Àtúnṣe síra-ẹni ní ẹ̀ka *env*:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> **Ṣípò àwọn ìlé ojú-ìmọ̀ tí ó wà nílẹ̀** nínú abala *fi hàn*:

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

-> **Ohun ti o fẹ: Iye owo kekere** ni *awọn profaili.ibi-ipilẹ.akash.iye*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> note lowering prices le ṣe àyẹwò àwọn olùpèsè wa láti inú fọọmu títà. experience with this value, or use the provider endpiont to check if they would bid. (review provider api documentation)

### Ṣiṣẹ́ Àwòrán-ìmọ̀ RPC Access

RPC ti wa ni idaduro nipasẹ aiyipada fun aabo. Lati jẹ ki o ṣiṣẹ:

**KÍTÀN: Ṣeto àwọn ìforúkọsílẹ̀ tó lágbára.** zcashd RPC ń fi orúkọ oníṣe/ọ́rọ̀-ìfipamọ́ ránṣẹ́ lórí HTTP (kì í ṣe HTTPS). Nikan túmọ sí pé o mọ ohun tí ààbò ní nínú.

-> Àkọlé nínú ẹ̀ka *env*:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Uncomment ìlé RPC nínú *expose*:

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

**ìkìlọ̀**: bí o bá fi *global: true* sí RPC, ìwọ ń tú u sílẹ̀ fún ayélujára pẹ̀lú ìkọsílẹ̀ pàtàkì. Èyí jẹ́ èrò tí kò dára. Lo *glonal: false* kí o sì wọlé sí RCC nípasẹ̀ àgbélékọjá inú Akash tàbí ṣètò ọ̀nà abójútó kan tó dáàbò bo ara rẹ.

**ìrántí ìfipèsèpòsí èbúté**: Bí o bá fi RPC hàn lágbàáyé, Akash yóò ṣe àfihàn rẹ sí ẹ̀ka-òpó gíga tí ó jẹ́ ti kòṣeémánìí (kì í ṣe 8232/18232). Ṣayẹwo àwọn URI nínú ìpìnlẹ̀ láti rí ojúlówó òpin ìlú. fún *global: false* (a gbà á níyànjú), a lè wọlé sí apá ìparí RPC náà nìkan láàrin nẹtiwọọki ipínlẹ̀ Akash, kì í ṣe látàrí ayélujára gbogbo gbogbogbo.

### Ṣiṣẹ́ Àmì Ìṣirò Iṣẹ̀-ìpínlẹ̀ (Transaction Index)

Àmì ìsòwò ń jẹ́ kí o lè béèrè fún àdéhùn èyíkéyìí nípa ID rẹ̀ nípasẹ̀ RPC. Ó n lo ibi-ipamọ púpọ (~ 20% àfikún).

Àlàyé nínú *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Ìkìlọ̀**: Fífún txindex láàyè lórí ìsopọ́ tí ó wà níṣojú ń béèrè àtúnṣe-àdàkọ gbogbo blockchain, èyí tó gba wákàtí.

### Ṣiṣẹ́ Àwòrán-ìmọ̀lẹ̀ (Insight Explorer)

Insight Explorer n pese awọn ipari REST API afikun fun data blockchain (lowo si awọn oluwadii bulọọki).

Àlàyé nínú *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Eyi yoo mu txindex ṣiṣẹ laifọwọyi ati ṣafikun awọn ọna RPC afikun.

### Ṣiṣẹ́ àwọn Ìsọfúnni Prometheus Metrics

Lati yọ awọn iṣiro fun ibojuwo:

-> Àkọlé nínú *env*:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Ṣípò àwọn ìsọfúnni nínú *expose*:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Àwọn ìsọfúnni yóò wà ní orí-ìkànnì: http://yourendpoint:9969/metrics ní ìmísí Prometheus.

### Ṣíṣàtúnṣe Àwọn Owó-ìní/Ìlówó Ọjà

Ti o ko ba gba awọn ifiranṣẹ tabi fẹ lati ṣe iṣapeye iye owo:

** Fun awọn olupese ti o kere ju-spec**, dinku ni *profiles.compute.zcashd.resources* apakan:

-> CPU: *units: 2* (ìpínlẹ̀ fún iyara ìsopọ́ tó yẹ)

-> Ìrántí: *ìyí: 12Gi* (ò kéré jùlọ fún ìdúróṣinṣin)

-> Àpamọ́: *ìyí: 120Gi* (ò kéré jùlọ fún ìkànnì pàtàkì)


** Lati fa awọn ipese diẹ sii**, mu *awọn profaili pọ si. ipo-ipilẹṣẹ.akash. idiyele*:

-> Mainnet: Gbiyanju * iye owó: 15000* uakt/ìdìpọ̀.

-> Àwòṣe: Gbiyanju * iye: 7500* uakt/ìdìpọ̀.


Àwọn iye SDL ti wà ní ipò gíga. Òpò àwọn olùpèsè yóò rajà láìsí owó tó pọ̀ jù bẹ́ẹ̀ lọ.

## Mímú Ìtòlẹ́sẹẹsẹ Rẹ Wà Lójú Òní

Ṣe o nílò láti yí àtòjọ padà lẹ́yìn tí a bá ti gbé e jáde?

-> Lọ sí **Àwọn Ìmúgbòòrò Mi** nínú Àpèsè-ìṣàmúlò (Console)

-> Wá ìmúṣẹ zcashd rẹ

-> Tẹ **"Ìmúṣiṣẹ́ Àtúnṣe"**

-> Ṣàtúnṣe SDL náà

-> Tẹ **"Àtúnṣe"** ki o si fọwọsi ni Keplr


**Àkíyèsí**: Àtúnṣe yóò tún ìgò rẹ ṣe. Ìkó náà á padà bẹ̀rẹ̀ láti ipò tí ó ti fi pamọ́ (ìpamọ́ tó wà títí), ṣùgbọ́n retí ìṣéjú 1-2 àkókò ìdákẹ́rọ́kọ́lẹ̀.

## Ìtójútó

### Nípasẹ̀ Àpótí Ìṣiṣẹ́

-> **Ìwé àkọsílẹ̀**: Ìwífún ìlépa tí ó wà láàyè

-> **Shell tab**: Gba shell kan ninu apoti (lori fun atunṣe aṣiṣe)

-> **Ere ti awọn iṣẹlẹ**: Awọn iṣẹlẹ Kubernetes (ọpọ julọ ko wulo ayafi bi nkan ba fọ)


### Nípasẹ̀ RPC (bí ó bá wà)

Ti o ba ti muu ṣiṣẹ RPC, o le beere rẹ node bi a deede zcashd kikun akoso (nitori o jẹ!)

### zcash-cli Àtúnṣe síi

Ti o ba ni iraye si apo nipasẹ Iṣakoso, o le lo * zcash-cli* taara:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Ìparí Iṣẹ́-Ìsínà Rẹ

Nígbà tí o bá ti parí tàbí tóo fẹ́ dáwọ́ lílọ san owó dúró:

-> Lọ sí **Àwọn Ìpínlẹ̀ mi**

-> Wá ìmúṣẹ zcashd rẹ

-> Tẹ **"Ṣípòsílẹ̀ dídánilẹ́nuwò"**

-> Fi ẹ̀rí ìdánilójú àti ìforúkọsílẹ̀ sínú Keplr


A ó dá owó ìsúná 5 AKT rẹ padà. **Àpamọ́ tí kò lè yípadà** ni kí olùpèsè náà máa tọjú, ṣùgbọ́n má ṣe gbára lé e - fi ojú tó dáa wo ẹ̀ bíi ti àwọn oníṣẹ́ àwọsánmà yòókù.

## Ìdáhùn àwọn ìṣòro náà

### Àṣìṣe "Àwọn owó tí kò tó"

O nílò àpò AKT sí i. Ẹ fi owó kún ìwé Keplr yín.

### Kò sí ìnáwó tí ó hàn gbangba.

Yálà:

-> Iye tí o fi ń ra ọjà rẹ kò tó nǹkan (fi *iye owó* kún un ní SDL)

-> Awọn ibeere orisun rẹ ga ju fun awọn olupese ti o wa (dín CPU / iranti / ibi ipamọ)

-> Duro diẹ sii (nigbakan o gba 60-90 aaya fun awọn ipese lati han)


### Ìmúṣẹ dídíjú nínú "ìdúró"

Olùpèsè náà lè ní ìṣòro. Pa ìmúṣẹ yìí mọ́ kí o sì gbìyànjú olùpèsè mìíràn.

### Àwọn àkọọ́lẹ̀ zcashd fi hàn "Kò sí àwọn ẹlẹgbẹ tí ó so pọ̀"

Níwọ̀n ìgbà tí Ìparí-ìtìlẹ́yìn dúró ní July 18, 2026, èyí ni ipò tó wà títí lọ dípò ìdádúró ìbẹ̀rẹ̀, àti pé kò sí iye àkókò àfojúsùn tàbí yípadà yóò tún un ṣe. Ṣiṣẹda [Zebra](/guides/akash-network-zebra) dípò ìyẹn.

### Àwọn àṣìṣe "Láti inú ìrántí" nínú àwọn àkọọ́lẹ̀ ìsọfúnni

O ti dín RAM kù. Pa ìmúṣẹ náà àti tún-ìmúṣe pẹ̀lú 12Gi memory (16Gi ni a ṣeduro).

### Ìṣètò náà ń gba àkókò gígùn.

Ṣàlàyé ohun tí "láìnípẹ̀kun" túmọ̀ sí:

-> ** Wákàtí**: Ìwọ̀n tó yẹ kó wà nínú rẹ̀.

-> **Ọjọ**: O tun jẹ deede fun mainnet lati ibẹrẹ

-> **Weeks**: Ohun kan ti ko tọ, ṣayẹwo awọn iwe akọọlẹ fun aṣiṣe


### "Ìṣòro tí ó ń mú àwọn àlàfo zcash-params"

Olùpèsè náà lè ní àwọn ìṣòro nẹ́túwèrìkì tàbí ìsókè-àlàfo. Èyí sábà máa ń yanjú ara rẹ̀. Bí ó bá wà fún àkókò tó ju ọ̀ọ́dúnrún ìṣẹ́jú lọ, gbìyànjú láti tún pín sí olùpèsè mìíràn.

### Àìdáa nínú ìfọwọ́sí RPC

-> Ṣayẹwo pe *ZCASHD_RPCUSER* ati *Z CASHD_ RPCPASSWORD* ti wa ni ṣeto daradara.

-> Ṣayẹwo pe o nlo ibudo ti o tọ (8232 fun mainnet, 18232 fún testnet)

-> Ranti awọn ibudo ti wa ni maapu nipa Akash - lo URI lati rẹ deployment, ko 8232 taara


## Ìdarí Ètò Owó-Owo

Ṣàkíyèsí ìnáwó rẹ nínú Àpótí:

-> **Iṣẹ́ tí mo ṣe** -> Iṣé rẹ -> Ó fi "Owó oṣù" hàn.

-> Àdéhùn owó Keplr rẹ yóò dínkù pẹ̀lú àkókò.


Nígbà tí owó rẹ bá tán, Akash yóò pa ìmúṣẹ ọ̀rọ̀ náà tìkára ẹ. **Fi àpò-ìpamọ́ sílẹ̀ déédéé** tàbí ṣètò àwọn ìdánilójú.

### Dídín Iye Ìnáwó Kù

-> **Láti lo Àwòdì Ìdánwò** fún ìdánwò tí kò bá jẹ́ ti ìṣẹ̀dá (50% ó dínwó)

-> **Igbesẹ CPU/iranti** ti o ba jẹ pe iwọ ko nilo isọdọkan iyara

-> **Yan awọn olupese ti o din owo** (ko nigbagbogbo ọlọgbọn - ọrọ akoko)

-> **lo USDC dípò AKT** bí owó AKT bá ń yí padà (ó nílò ìyípadà iyebíye SDL)

-> **Disable txindex** ti o ba ti o ko nilo rẹ (fi ~ 20% ipamọ)


### Àwọn Owó Àfikún

Àpótí Akash: [https://console.akash.network](https://console.akash.network)

Akash Docs: Ìtàn tí ó ṣe pàtàkì jùlọ nínú ìtàn náà. [https://akash.network/docs/](https://akash.network/docs/)

Àwọn olùwádìí Zcash: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

Akash Discord: Ìjàǹbá fún àwọn ọmọdé. [https://discord.akash.network](https://discord.akash.network) (nípa àwọn ọ̀ràn olùpèsè)

## Àwọn Àlàyé Ìparí

- **Ìṣòro ìpamọ́ tí kò dáwọ̀ dúró.** Má ṣe fo *ìdìbò: òótọ́* tàbí lo ẹ̀ka *beta2*. Lo *beta3*.
- **Iṣọkanpọ akọkọ jẹ pẹ.** Jẹ onigbọwọ. Eyi ṣe deede fun awọn akopọ blockchain.
- **Ẹ máa fi owó sí àpò yín.** Àwọn ìmúṣẹ-ìfipá pa ara wọn nígbà tí ẹ bá ní kòkòrò àrùn AKT.
- **Awọn afẹyinti kii ṣe laifọwọyi.** Ti o ba bikita nipa data, gba pe o le parẹ ki o si gbero ni ibamu.
- **Aabo RPC jẹ pataki.** Maṣe fi RPC han si intanẹẹti laisi awọn igbese aabo to yẹ.
- ** zcash-params are cached.** First run downloads ~2GB of cryptographic parameters. Èyí jẹ́ òòṣà àti pé ó máa ń ṣẹlẹ̀ lẹ́ẹ̀kan ṣoṣo péré.
