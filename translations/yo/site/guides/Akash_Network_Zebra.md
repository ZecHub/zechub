# Bii o ṣe le ṣiṣẹ Zebra lori Akash Network

Igbese-nipasẹ-igbesẹ itọsọna fun deploying a Zebra Zcash kikun node lilo [Akash Console](https://console.akash.network).

### Ohun Tó O Ń Fi Sílò

Ojú-ìpín Zebra tí yóò:

-> Ṣiṣẹpọ gbogbo blockchain Zcash (100GB+ fun mainnet, ~40GB fun testnet)

-> Iye owo to to $15/osù ti o da lori iye owo AKT token

-> Gba ọ̀pọ̀lọpọ̀ wákàtí sí ọjọ́ láti ṣe àpapọ̀

-> Lo 4 vCPUs, 16GB RAM, 350GB ibi ipamọ (mainnet) tabi 2 vCPU, 8GB Ram, 50GB (testnet)


### Ó ṣe pàtàkì: Ṣíṣe àwòrán àwọn èbúté ní Akash

When you expose a port on Akash (e.g., port 8233 for Zebra P2P), it **does NOT bind to that exact port** on the provider's public IP. Instead, the provider assigns a random high port (like 31234 or 42567) and reverse-proxies it to your container's port 8233.

Eyi jẹ nipa apẹrẹ - awọn olupese ṣiṣe ọpọlọpọ awọn igbasilẹ, ati pe wọn yoo ni awọn rogbodiyan ti gbogbo eniyan ba gbiyanju lati lo ibudo 8233 taara.

** Ohun tí èyí túmọ̀ sí fún ọ:**

-> O tunto ibudo 8233 ninu SDL (ibudo P2P boṣewa ti Zebra)

-> Akash fún ọ ní URI bíi *provider.com:31234*

-> Àwọn ìkànnì Zcash míràn máa ń so mọ́ ọ ní *provider.com:31234*

-> Ninu apoowe rẹ, Zebra ṣi tẹtisi lori 8233


Ojúlówó ni, lo URI tí Akash fún ọ.

### Àwọn ohun tó pọn dandan

1. **Keplr Wallet** àfikún aṣàwákiri ti a fi sori ẹrọ (Chrome/Brave/Firefox)
2. ** AKT tokens ** - Gba 50-100 AKT lati paṣipaarọ kan (Coinbase, Kraken, Osmosis)
3. **ìṣẹ́jú márùn-ún** láti tẹ nípasẹ̀ àlàfo console UI

#### Ìgbésẹ̀ 1: So Wọ́ọ́lì Rẹ pọ̀

-> Go to [https://console.akash.network](https://console.akash.network)

-> Tẹ **"Sopọ apamọwọ"** ni apa ọtun oke

-> Yan **Keplr** (tàbí àpò owó Cosmos tí o yàn)

-> Fọwọsi asopọ nigbati Keplr ba jade


Owó tó wà nínú àkáǹtì rẹ á fara hàn lókè lápá ọ̀tún.

#### Ìgbésẹ̀ 2: Ṣẹ̀dá Ìmúgbòòrò

-> Tẹ **"Deploy"** bọtini (ìgbò ńlá bulu bọtini, aarin ti ojúewé)

-> Yan **"Ṣẹ́ àdàkọ rẹ"** (tàbí kó o lọ tààrà sí gbígbé SDL)


##### Aṣayan A: Gbigba faili SDL (Ti a ṣe iṣeduro)

[![Gbé jáde ní Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Aṣayan B: Lo Àtúnṣe SDL

Ti o ba ti o ba fẹ lati ọwọ lẹẹ [awọn SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Ṣe àdàkọ àwọn ohun tó wà nínú *zebra-akash.yml*

-> Fi sínú àtúnṣe SDL

-> Ṣe àtúnṣe bí ó bá ṣe yẹ (wo abala ìtòlẹ́sẹẹsẹ nísàlẹ̀)

-> Tẹ **"Ṣẹda Àgbékalẹ̀"**


#### Ìgbésẹ̀ Kẹta: Ṣíṣàyẹ̀wò àti Yíyọ̀ǹda Ètò Ìdókòwò

Àpótí náà yóò fi hàn ọ́ pé:

-> **Ipamọ idasilẹ**: ~ AKT 5 (o gba eyi pada nigbati o ba pa idasẹsẹ naa)

-> **Iye owo ti a ṣe iṣiro**: Da lori idiyele SDL rẹ

Tẹ ** "Fọwọsi"** ki o si buwọlu awọn idunadura ni Keplr.

#### Ìgbésẹ̀ Kẹrin: Yan Ẹni Tó Máa Bójú Tó O

Lẹ́yìn ~ 30 ìṣẹ́jú, ẹ óo rí owó tí àwọn olùpèsè ń tà.

-> **Iye owo fun bulọọki** (ni AKT tabi USDC)

-> **Owó tí a fojú díwọ̀n lóṣooṣù**

-> **Awọn alaye olupese** (akoko iṣẹ, agbegbe, ati bẹbẹ lọ)


* Má kàn yan èyí tó bá tà jù lọ.* * Ṣayẹwo:

-> % àkókò ìmúṣẹ (ìlépa fún > 95%)

-> Agbegbe (ti o sunmọ ọ = idaduro to dara julọ, ṣugbọn ko ṣe pataki pupọ fun awọn node blockchain)

-> Àsìṣe tí a ṣàyẹ̀wò (àmì àyẹ̀wò aláwọ̀ ewé = tó ṣeé gbára lé jùlọ)


Tẹ **"Gba Ipese"** lori olupese ti o yan ki o wọle si Keplr.

#### Igbesẹ 5: Duro fun Ifilọlẹ

Àpótí yóò:

-> Ṣẹda adehun yiyalo pẹlu olupese ti o yan

-> Firanṣẹ àkọsílẹ̀ (sọ fún olùpèsè ohun tí yóò fi ṣiṣẹ́)

-> Bẹrẹ apo rẹ

Èyí yóò gba ìṣẹ́jú méjì sí márùn-ún. Ẹ óo rí àtúnṣe ipò nínú UI.

#### Ìgbésẹ̀ 6: Rí i dájú pé Ó Ń Ṣiṣẹ

Nígbà tí a bá ti gbé e jáde, ẹ ó rí i pé:

-> Àkọsílẹ̀ àwọn Iṣẹ́: Ó fi iṣẹ́ Zebra rẹ hàn pẹ̀lú ipò rẹ

-> Àkọsílẹ̀ ìpamọ́: Ìpamọ́ ìpamọ̀ tí ó wà láàyè

-> Àkọsílẹ̀ ìgbafẹ́: Ìsọfúnni nípa ìmúgbòòrò rẹ (DSEQ, olùpèsè, iye owó)


##### Ṣayẹwo Àwọn Àkọsílẹ̀

Tẹ lori **Logs** ki o si o yẹ ki o ri Zebra bẹrẹ soke:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Ìṣàmúlò náà yóò gba **wákàtí sí ọjọ** ní ìbámu pẹ̀lú nẹtiwọọki. Ṣójú fún:

-> Àfikún àwọn gíga àlàfo

-> Awọn asopọ ẹlẹgbẹ (o yẹ ki o jẹ 10-30 awọn ẹlẹgbẹ)

-> Kò sí àṣìṣe tí ó tún ṣe


#### Igbesẹ 7: Gba Adirẹsi Nọ́ọ̀dù Rẹ

Tẹ lori awọn ** Leases ** taabu, ki o si ** URI **.

O ó rí nǹkan bíi:

```bash
zebra-8233: provider-hostname.com:31234
```

Eleyi jẹ rẹ node ká ** gbangba P2P opin ojuami **. miiran Zcash nodes yoo sopọ si o ni adirẹsi yi.

**Mọ̀ nípa àwòrán ojú pópó:** O ṣe àdàkọ ibudo 8233 nínú SDL, ṣùgbọ́n Akash yàn án sí ibudo ìjápọ̀ mìíràn (31234 nínú àpẹrẹ yìí). Èyí jẹ́ ohun tí ó wọ́pọ̀ - wo abala "Àdàkọ ojú-pópópó lórí Akash" ní òkè bí èyí bá rú ọ lójú. Ìpín rẹ jẹ́ èyí tí a lè wọlé sí ní ibudo yòówù tí Akash fi hàn níbí, kìí ṣe dandan 8233.

If you enabled RPC (commented out by default in the SDL), you'll also see the RPC endpoint here with its own mapped port.

### Àwọn Àtúnṣe Ìṣètò

#### Yíyípadà sí Àwòdì Ìdánwò

SDL ṣe àfojúsùn sí Mainnet. Láti lo Testnet dípò:

-> **Ṣàkíyèsí ìtòlẹ́sẹẹsẹ Mainnet** ní apá *env*:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Ìṣètò Ìdánwò Àkọsílẹ̀**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
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

-> **Ohun ti o fẹ: Din awọn orisun** fun Testnet ni *profiles.compute.zebra.resources*:

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

#### Fún RPC Àwárí Àwòrán

RPC ti wa ni idiwọ nipasẹ aiyipada fun aabo. Lati jẹ ki o ṣiṣẹ:

** fún Mainnet:**

-> Àkọlé nínú ẹ̀ka *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Uncomment awọn Mainnet RPC ibudo ni * fi hàn *:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Fún Àwòdì:**

-> Àkọlé nínú ẹ̀ka *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Uncomment awọn Testnet RPC ibudo ni * fi hàn *:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Warning**: If you set *global: true* for RPC, you're exposing it to the internet. Zebra uses cookie auth by default, but still - don't do this unless you know what you're doing.

**ìrántí ìfiwéra èbúté**: Bí o bá fi RPC hàn lágbàáyé, Akash yóò fi í hàn sí èbútó gíga tí ó jẹ́ àbáwọlé (kì í ṣe 8232/18232). Ṣayẹwo àwọn URI nínú ìmúṣẹ rẹ láti rí ojúlówó ìparí èrò. fún *global: false* (a dábàá), ìparẹ̀ RPC jẹ́ èyí tí a lè wọlé sí lábẹ́ ẹ̀rọ-ìmúṣẹ Akash nìkan, kì í ṣe láti orí ayélujára.

#### Fún Àwọn Ìsọfúnni (Prometheus)

Lati yọ awọn iṣiro fun ibojuwo:

-> Àkọlé nínú *env*:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Yọ̀ àwọn àlàfo tó wà nínú *expose* kúrò:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Ṣíṣàtúnṣe Àwọn Ìpèsè/Ìlówó

Ti o ko ba gba awọn ipese tabi fẹ lati mu iye owo pọ si:

** Fun awọn olupese ti o kere-spec**, dinku ni *profiles.compute.zebra.resources* apakan:

-> CPU: *units: 2* (ìpínlẹ̀ fún iyara ìsopọ̀ tó yẹ)

-> Ìrántí: *ìyí: 12Gi* (ìpín-ìdín-ní-ìdí fún ìdúróṣinṣin)

-> Ìpamọ́: *ìtóbi: 120Gi* (ìwọ̀nba tó kéré jùlọ fún mainnet)

** Lati fa awọn ipese diẹ sii **, alekun ni * profaili. ipo.akash. idiyele *:

-> Mainnet: Gbiyanju * iye: 1000000* uakt/ìdìpò

-> Àwòṣe: Gbiyanju *iye: 1000000* uakt/ìdìpò

### Mímú Ìtòlẹ́sẹẹsẹ Rẹ Tún Ṣe

Ṣe o nílò àtúnṣe ìtòlẹ́sẹẹsẹ lẹ́yìn tí o bá ti ṣíṣẹ́?

-> Lọ sí **Àwọn Ìpínlẹ̀ mi** ní Console

-> Wá ìmúgbòòrò Zebra rẹ

-> Tẹ **"Àtúnṣe Ìmúgbòòrò"**

-> Ṣàtúnṣe SDL

-> Tẹ **"Àtúnṣe"** ki o si fọwọsi ni Keplr

**Àkíyèsí**: Àtúnṣe yóò tún àpòòwò rẹ ṣe. Àkó náà yóò tún padà bẹ̀rẹ̀ láti ipò tí ó ti fi pamọ́ (ìpamọ́ tí ó wà pẹ́ títí), ṣùgbọ́n retí ìṣẹ́jú 1-2 ti àkókò ìsinmi.

### Ìtójútó

#### Nípasẹ̀ Àpótí

-> ** Àwọn àkọọ́lẹ̀ ìpamọ́**: Àwọn àkọọ́lẹ̀ àpò-ìpèsè tí ó wà láàyè

-> **Shell tab**: Gba shell kan ninu apoti naa (lori anfani fun atunṣe aṣiṣe)

-> **Awọn iṣẹlẹ tab**: Awọn iṣẹlẹ Kubernetes (ọpọ julọ ti ko wulo ayafi ti nkan kan ba fọ)


#### Nípasẹ̀ RPC (bí ó bá wà)

Ti o ba ti muu ṣiṣẹ RPC, o le ṣe ibeere oju opo rẹ bi oju opo kikun zebrad deede (nitori o jẹ!)

### Ìparí Iṣẹ́-ìṣètò Rẹ

Nígbà tí o bá ti parí tàbí tí o kò bá fẹ́ sanwó mọ́:

-> Lọ sí **Àwọn Ìpínlẹ̀ mi**

-> Wá ìmúgbòòrò Zebra rẹ

-> Tẹ **"Sún ìmúgbòòrò"**

-> Fọwọsi ki o si buwolu wọle Keplr

A ó dá owó ìsúná 5 AKT rẹ padà. **Ìpamọ́ tí ó wà pẹ́ títí** yẹ kí olùpèsè náà pa á mọ́, ṣùgbọ́n má ṣe gbára lé e - fi ṣe bíi ti olùpènyàn àwọsánmà yòókù.

### Àtúnṣe àṣìṣe

#### Àṣìṣe "Àwọn owó tí kò tó"

O nílò àpò AKT sí i, kó o sì fi kún owó Keplr rẹ.

#### Kò sí ìnáwó tó ń yọjú

Yálà:

-> Owó tí ẹ ń san kò tó nǹkan rárá (ẹ fi *iye owó náà* kún un ní SDL)

-> Awọn ibeere ohun elo rẹ ga ju fun awọn olupese ti o wa ( dinku CPU / iranti / ibi ipamọ)

-> Duro diẹ sii (nigbakan o gba 60-90 aaya fun awọn ifiranṣẹ lati han)


#### Ìmúgbòòrò tí ó dúró ní "ìdúró"

Olùpèsè náà lè ní ìṣòro. Pa ìmúgbòòrò náà mọ́ kí o sì gbìyànjú olùpèsè mìíràn.

#### Àwọn àkọsílẹ̀ Zebra fi hàn pé "Kò sí àwọn ẹlẹgbẹ́ tí wọ́n so pọ̀"

Eyi jẹ deede fun awọn iṣẹju diẹ akọkọ. Zebra yoo ṣe awari awọn ẹlẹgbẹ laifọwọyi. Ti o ba tẹsiwaju lẹhin iṣẹju 10+, o le ni iṣoro nẹtiwọọki (ko ṣee ṣe lori Akash).

#### Àwọn àṣìṣe "Láti inú ìrántí" nínú àwọn àkọọ́lẹ̀

O ti dín RAM kù. Pa ìmúgbòòrò náà mọ́ kí o sì tún un múlẹ̀ pẹ̀lú 12Gi memory ó kéré tán (16Gi recommended).

#### Ṣíṣàtúnṣe ń gba àkókò gígùn

Ṣàlàyé ohun tó túmọ̀ sí láti wà láàyè títí láé:

-> ** Wákàtí**: Ìwọ̀n

-> **Ọjọ**: O tun jẹ deede fun mainnet lati ibẹrẹ

-> **Weeks**: Nkankan ti ko tọ, ṣayẹwo awọn akọọlẹ fun awọn aṣiṣe


### Iṣakoso Iye owo

Ṣàkíyèsí ìnáwó rẹ nínú Ẹrọ-ìmọ̀ràn:

-> **My Deployments** -> Your deployment -> Fi "Owo fun osu" iṣiro han

-> Àdéhùn àpò Keplr rẹ yóò dín kù pẹ̀lú àkókò


When your balance runs low, Akash will auto-close your deployment. **Top up your wallet periodically** or set up alerts.

#### Bá A Ṣe Lè Dín Owó Tó Ń Náni Kù

-> **Lọ́wọ́ Testnet** fún àyẹ̀wò tí kò ní í ṣe pẹ̀lú iṣẹ́ ìbílẹ̀ (50% ó dínwó kù)

-> ** CPU/ìrántí ìsàlẹ̀** bí o kò bá nílò ìsọ̀kan tó yára

-> **Yan awọn olupese ti o din owo** (ko jẹ ọlọgbọn nigbagbogbo - awọn ọrọ akoko)


### Mainnet vs Testnet[àtúnṣe _ àtúnṣe àmìọ̀rọ̀]

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

Bẹrẹ pẹlu Testnet ti o ba jẹ pe o n ṣe idanwo ilana igbekale. Wo abala "Tiparọ si Testnet" loke fun iṣeto.

### Àwọn Owó Àfikún

Àpótí Akash:https://console.akash.network](https://console.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

Àwọn ìwé Zebra:https://zebra.zfnd.org/](https://zebra.zfnd.org/)

Àwọn Olùwádìí Zcash:https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

Akash Àríyànjiyàn:https://discord.akash.network](https://discord.akash.network) (fún àwọn ọ̀ràn olùpèsè)

