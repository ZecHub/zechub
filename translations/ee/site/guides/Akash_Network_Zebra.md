# Alesi woawɔ Zebra le Akash Network dzi

Afɔɖeɖe ɖesiaɖe ƒe mɔfiame na Zebra Zcash full node ƒe dɔwɔwɔ to [Akash Console](https://console.akash.network).

### Nusi Nèle Dɔ wɔm

Zebra node blibo aɖe si awɔe be:

-> Zcash blockchain bliboa wɔ ɖeka (100GB+ na mainnet, ~40GB na testnet)

-> Ga home si ade $15/ɣleti le AKT ƒe dzesi ƒe asiwo nu

-> Xɔ gaƒoƒo geɖe va ɖo ŋkeke geɖe hafi wòawɔ ɖeka bliboe

-> Zã vCPU 4, 16GB RAM, 350GB nudzraɖoƒe (mainnet) alo 2 vCPUs, 8GB RAM, 50GB (testnet)


### Vevietɔ: Melidzeƒea ƒe Nɔnɔmetatawo wɔwɔ le Akash

Ne èɖe ʋɔtru aɖe ɖe go le Akash dzi (e.g., ʋɔtru 8233 na Zebra P2P), **mebla ɖe ʋɔtru ma tututu ŋu** le dɔwɔƒea ƒe dutoƒo IP dzi o. Ke boŋ, dɔwɔƒea dea ʋɔtru kɔkɔ si wowɔ le vome (abe 31234 alo 42567 ene) eye wòtrɔa asi le eŋu yia wò nugoe ƒe ʋɔtru 8233 dzi.

Esia nye to aɖaŋuwɔwɔ me - dɔwɔƒewo wɔa dɔ geɖewo, eye masɔmasɔwo anɔ wo dome ne amesiame dze agbagba be yeazã ʋudzeƒe 8233 tẽ.

**Nusi esia fia na wò:**

-> Èɖoa ʋudzeƒe 8233 le SDL (Zebra ƒe P2P ʋɔtru si wozãna ɖaa) me .

-> Akash naa URI wò abe *provider.com:31234* ene.

-> Zcash node bubuwo doa ka kpli wò le *provider.com:31234*

-> Le wò nugoe me la, Zebra gakpɔtɔ le to ɖom le 8233 dzi


Wokpɔa esia gbɔ le wo ɖokui si. Ðeko nàzã URI si Akash na wò.

### Nusiwo hiã do ŋgɔ

1. **Keplr Wallet** woda web-browser ƒe kpeɖeŋutɔ ɖe wò kɔmpiuta dzi (Chrome/Brave/Firefox)
2. **AKT dzesiwo** - Xɔ 50-100 AKT tso asitɔtrɔ (Coinbase, Kraken, Osmosis)
3. **Aɖabaƒoƒo 5** be nàzi edzi to Console UI la me

#### Afɔɖeɖe 1: Do ka kple Wò Gakotokua

-> Go to [https://console.akash.network](https://console.akash.network)

-> Zi **"Connect Wallet"** dzi le etame le ɖusime

-> Tia **Keplr** (alo Cosmos gakotoku si nèlɔ̃ wu)

-> Da asi ɖe kadodoa dzi ne Keplr do


Ele be wò AKT ƒe dadasɔ nadze le ɖusime le etame. Ne zero ye la, yi ɖadzɔ ga na wò gakotokua gbã.

#### Afɔɖeɖe 2: Wɔ Deployment

-> Zi **"Deploy"** ƒe dzesi dzi (aɖaka gã blɔ, axa ƒe titina)

-> Tia **"Tu wò template"** (alo ti kpo tẽe yi SDL dada dzi)


##### Tiatia A: Tsɔ SDL Faɛl (Wokafui) .

[![Deploy le Akash dzi](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Tiatia B: Zã SDL Editor

Ne èdi be yeatsɔ asi atsɔ [SDL la](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Kpɔ *zebra-akash.yml* me nyawo ɖa.

-> Kpe ɖe SDL ƒe nuŋlɔla la me

-> Trɔ asi le eŋu alesi wòhiã (kpɔ ɖoɖowɔɖi ƒe akpa si le ete)

-> Zi **"Wɔ Dɔwɔwɔ"** dzi.


#### Afɔɖeɖe 3: Dzro Ga si Woda Ðe Gadzraɖoƒea Me eye nàda asi ɖe edzi

Console la afia wò:

-> **Deployment deposit**: ~5 AKT (ègaxɔ esia ne ètu deployment la)

-> **Ga si wobu**: Wotue ɖe wò SDL ƒe asixɔxɔ dzi

Zi **"Approve"** dzi eye nàde asi asitsatsa la te le Keplr me.

#### Afɔɖeɖe 4: Tia Dɔwɔƒe si Naa Dɔa

Le ~ sɛkɛnd 30 megbe la, àkpɔ adzɔnuwo tso dɔwɔƒe siwo naa kpekpeɖeŋu gbɔ. Dodoɖeŋgɔ ɖesiaɖe ɖee fia be:

-> **Asi si woaxe ɖe block ɖeka ta** (le AKT alo USDC me)

-> **Ɣleti sia ɣleti ƒe gazazã si wobu**

-> **Dɔwɔƒea ŋuti nyatakakawo** (ɣeyiɣi si woatsɔ awɔ dɔe, nuto, kple bubuawo)


**Mègatia esiwo ƒe asi bɔbɔ wu ko o.** Kpɔe ɖa be:

-> Uptime % (taɖodzinu na > 95%) .

-> Nuto (si te ɖe ŋuwò wu = latency nyo wu, gake mehiã boo na blockchain nodes o)

-> Nɔnɔme si wodzro (dzesi dama = kakaɖedzi le eŋu wu)


Zi **"Accept Bid"** dzi le wò dɔwɔƒe si nètia dzi eye nàde asi Keplr me.

#### Afɔɖeɖe 5: Lala be Woawɔ Dɔa

Console awɔ:

-> Wɔ hayahaya ƒe ɖoɖoa kple dɔwɔƒe si nètia

-> Ðo manifest la ɖa (egblɔ nusi wòle be wòaƒu du na dɔwɔƒea)

-> Dze wò nugoe gɔme

Esia xɔa miniti 1-2. Àkpɔ nɔnɔme yeyewo le UI la me.

#### Afɔɖeɖe 6: Kpɔe ɖa be Ele Dum

Ne wonya de dɔwɔwɔ me ko la, àkpɔe be:

-> **Services** tab: Fia wò *zebra* subɔsubɔdɔ kple nɔnɔme

-> **Nuŋlɔɖiwo** tab: Nugoe me nuŋlɔɖi siwo le agbe

-> **Leases** tab: Nyatakaka tso wò dɔwɔwɔ ŋu (DSEQ, dɔwɔƒe si naa, gazazã)


##### Kpɔ Logs la ɖa

Zi **Logs** dzi eye ele be nàkpɔ Zebra wòadze egɔme:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Sync la axɔ **gaƒoƒo va ɖo ŋkeke** le network la nu. Kpɔ nyuie le:

-> Block ƒe kɔkɔme dzi ɖeɖe kpɔtɔ

-> Hatiwo ƒe kadodowo (ele be wòanye hati 10-30)

-> Vodada aɖeke megawɔna enuenu o


#### Afɔɖeɖe 7: Xɔ Wò Node ƒe Adrɛs

Zi **Leases** ƒe tab dzi, emegbe **URIs**.

Àkpɔ nane abe:

```bash
zebra-8233: provider-hostname.com:31234
```

Esia nye wò node ƒe **dutoƒo P2P nuwuƒe**. Zcash node bubuwo aƒo ka na wò le adrɛs sia dzi.

**De dzesi ʋudzeƒe ƒe nɔnɔmetata:** Èɖo ʋudzeƒe 8233 le SDL me, gake Akash tsɔe de dutoƒo ʋɔtru bubu (31234 le kpɔɖeŋu sia me). Esia sɔ - kpɔ "Port Mapping on Akash" ƒe akpa si le etame ne esia tɔtɔ wò. Wò node la ateŋu aɖo ʋudzeƒe ɖesiaɖe si Akash ɖe fia le afisia, menye 8233 kokoko o.

Ne èwɔ RPC ŋudɔ (wogblɔe tso gɔmedzedzea me le SDL me) la, àkpɔ RPC ƒe nuwuƒe hã le afisia kple eya ŋutɔ ƒe ʋudzeƒe si wowɔ nɔnɔmetata na.

### Ðoɖowɔwɔ ƒe Tiatiawɔblɔɖe

#### Trɔtrɔ ɖe Testnet ŋu

SDL la nye Mainnet. Be nàzã Testnet ɖe eteƒe la:

-> **Nyaŋuɖoɖo tso Mainnet config** le *env* ƒe akpaa dzi:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Tsi nyaŋuɖoɖo ɖa le Testnet ƒe ɖoɖowɔɖi ŋu**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> **Trɔ asi le ʋudzeƒe si woɖe ɖe go** ŋu le *ɖee ɖe go* ƒe akpaa dzi:

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

-> **Tiatia: Ðe nunɔamesiwo** dzi kpɔtɔ na Testnet le *profiles.compute.zebra.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Ne èdi: Asixɔxɔ si bɔbɔ ɖe anyi** le *profiles.placement.akash.pricing* me:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### Na RPC Mɔɖeɖe nawɔ dɔ

RPC nye nuwɔametɔ le gɔmedzedzea me hena dedienɔnɔ. Be wòana wòawɔ dɔ la:

**Na Mainnet:**

-> Ðe nyaŋuɖoɖo le *env* ƒe akpaa me:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Ðe nya le Mainnet RPC ʋɔtrua ŋu le *expose* me:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Na Testnet:**

-> Ðe nyaŋuɖoɖo le *env* ƒe akpaa me:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Ðe nya le Testnet RPC ʋɔtrua ŋu le *expose* me:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Nuxlɔ̃ame**: Ne èɖo *global: true* na RPC la, ke èle eɖem ɖe go ɖe internet dzi. Zebra zãa cookie auth le gɔmedzedzea me, gake kokoko - mègawɔ esia o negbe ɖe nènya nusi wɔm nèle hafi.

**Melidzeƒe ƒe nɔnɔmetata ƒe ŋkuɖodzinya**: Ne èɖe RPC ɖe go le xexeame katã hã la, Akash awɔ nɔnɔmetata nɛ ɖe melidzeƒe kɔkɔ si woɖo le vome (menye 8232/18232 o). Kpɔ URI siwo le wò dɔwɔwɔ me be nàkpɔ dutoƒonuwuƒe ŋutɔŋutɔ. Le *global: false* (wokafui) gome la, Akash ƒe dɔwɔwɔ ƒe kadodoa me koe woateŋu akpɔ RPC ƒe nuwuƒea, ke menye tso dutoƒo internet dzi o.

#### Na Metrix (Prometheus) nawɔ dɔ .

Be nàɖe metriks hena ŋkuléle ɖe nu ŋu:

-> Ðe nyaŋuɖoɖo ɖa le *env* me:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Ðe nyawo ɖa le metrics ʋɔtrua ŋu le *expose* me:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Trɔ Asi le Dɔwɔnuwo/Asixɔxɔ Ŋu

Ne mèle asi xɔm o alo nèdi be yeawɔ gazazã ŋudɔ nyuie wu la:

**Na lower-spec providers**, ɖe edzi le *profiles.compute.zebra.resources* ƒe akpaa dzi:

-> CPU: *units: 2* (nu suetɔ kekeake na sync duƒuƒu si sɔ)

-> Ŋkuɖodzinu: *lolome: 12Gi* (nu suetɔ kekeake na liƒo)

-> Nudzraɖoƒe: *lolome: 120Gi* (nu suetɔ kekeake na mainnet)

**Be nàhe asi geɖe vɛ** la, dzi *profiles.placement.akash.pricing* ɖe edzi:

-> Mainnet: Te *agbɔsɔsɔ: 1000000* uakt/block kpɔ

-> Testnet: Te *agbɔsɔsɔ: 1000000* uakt/block kpɔ

### Wò Dɔwɔɖoɖoa ƒe Tɔtrɔwɔwɔ

Ehiã be nàtrɔ ɖoɖowɔwɔ le eɖoɖo vɔ megbea?

-> Yi **Nye Dɔwɔwɔwo** le Console me

-> Di wò Zebra ƒe dɔwɔwɔ

-> Zi **"Tsɔ Ðe Dɔwɔwɔ Ŋu"** dzi.

-> Trɔ asi le SDL la ŋu

-> Zi **"Update"** dzi eye nàda asi ɖe edzi le Keplr me

**De dzesii**: Trɔtrɔ agbugbɔ adze wò nugoe gɔme. Node la agadze egɔme tso eƒe nɔnɔme si wodzra ɖo (nudzraɖoƒe si nɔa anyi ɖaa), gake kpɔ mɔ be miniti 1-2 natsi anyi.

### Kpɔkpɔ le ŋkuléle ɖe nu ŋu

#### To Console dzi

-> **Nuŋlɔɖiwo ƒe tab**: Nugoe me nuŋlɔɖi siwo le agbe

-> **Shell tab**: Na shell aɖe le nugoe la me (eɖea vi na vodadawo ɖeɖeɖa)

-> **Nudzɔdzɔwo ƒe tab**: Kubernetes nudzɔdzɔwo (wo dometɔ akpa gãtɔ meɖea vi o negbe ɖe nane gblẽ ko)


#### To RPC dzi (ne wowɔe) .

Ne èwɔ RPC ŋudɔ la, àteŋu abia wò node abe zebrad full node si sɔ ene (elabena ele nenema!) .

### Wò Dɔwɔɖoɖoa Nuwuwu

Ne èwu fexexe nu alo nèdi be yeadzudzɔ:

-> Yi **Nye Dɔwɔwɔwo**

-> Di wò Zebra ƒe dɔwɔwɔ

-> Zi **"Close Deployment"** dzi.

-> Ðo kpe edzi eye nàde asi ete le Keplr

Woagbugbɔ wò 5 AKT ga si nède la ana wò. **Nudzraɖoƒe si nɔa anyi ɖaa** ele be dɔwɔƒea nakpɔ eta, gake mègaɖo ŋu ɖe eŋu o - wɔ nu ɖe ​​eŋu abe alilikpo me dɔwɔƒe bubu ɖesiaɖe ene.

### Kuxiwo gbɔ kpɔkpɔ

#### "Ga si mesɔ gbɔ o" ƒe vodada

Èhiã AKT geɖe wu. Ga na wò Keplr gakotokua.

#### Dɔbiagbalẽvi aɖeke mele ɖeɖefiam o

Eya loo:

-> Wò asixɔxɔ le sue akpa (dzi *ga home* ɖe edzi le SDL me)

-> Wò nunɔamesiwo ƒe hiahiãwo lolo akpa na dɔwɔƒe siwo li (ɖe CPU/ŋkuɖodzinu/nudzraɖoƒe dzi kpɔtɔ)

-> Lala ɣeyiɣi didi wu (ɣeaɖewoɣi exɔa sɛkɛnd 60-90 hafi dɔbiagbalẽviwo nadze)


#### Deployment tsi "pending" me.

Ðewohĩ nyawo le amesi naa kpekpeɖeŋua ŋu. Do dɔwɔwɔa eye nàte dɔwɔƒe bubu kpɔ.

#### Zebra ƒe nuŋlɔɖiwo ɖee fia be "Hati aɖeke mele kadodo me o".

Esia sɔ le aɖabaƒoƒo ʋɛ gbãtɔawo me. Zebra ake ɖe ehatiwo ŋu le eɖokui si. Ne egakpɔtɔ le miniti 10+ megbe la, àte ŋu akpɔ kadodo ƒe kuxi aɖe (manɔ eme be le Akash dzi o).

#### "Out of memory" vodadawo le nuŋlɔɖiwo me

Èxɔ asi le RAM ŋu. Do dɔwɔwɔa eye nàgbugbɔe aɖoe kple ŋkuɖodzinu 12Gi ya teti (wokafu 16Gi).

#### Sync le xɔm tegbee

Ðe "tegbee" gɔme:

-> **Gaƒoƒo**: Esɔ

-> **Ŋkekewo**: Azɔ hã esɔ na mainnet tso gɔmedzedzea me

-> **Kwasiɖa**: Nane gblẽ, kpɔ nuŋlɔɖiwo ɖa be vodadawo le eme hã


### Gazazãwo Dzikpɔkpɔ

Lé ŋku ɖe wò gazazã ŋu le Console la me:

-> **Nye Dɔwɔwɔwo** -> Wò dɔwɔwɔ -> Fia "Gazazã le ɣleti ɖeka me" ƒe akɔntabubu

-> Wò Keplr gakotoku ƒe ga si susɔ la dzi aɖe akpɔtɔ le ɣeyiɣi aɖe megbe


Ne wò ga si susɔ la vɔ la, Akash axe wò dɔwɔwɔ le eɖokui si. **Tsɔ wò gakotokua de eme ɣeaɖewoɣi** alo nàɖo nuxlɔ̃amewo.

#### Gazazãwo Dzi Ðeɖe Akpɔtɔ

-> **Zã Testnet** na dodokpɔ si menye nuwɔwɔ o (50% ƒe asi bɔbɔ)

-> **Ðe CPU/memory** ɖe anyi ne mèhiã be nàwɔ ɖeka kabakaba o

-> **Tia dɔwɔƒe siwo ƒe asi bɔbɔ wu** (menye ɣesiaɣie nunya le eme o - dɔwɔwɔ ƒe ɣeyiɣi le vevie)


### Mainnet kple Testnet domee

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

Dze egɔme kple Testnet nenye be ɖeko nèle dɔwɔwɔ ƒe ɖoɖoa dom kpɔ. Kpɔ "Trɔtrɔ yi Testnet" ƒe akpa si le etame hena ɖoɖowɔwɔ.

### Dɔwɔnu Bubuwo

**Akash ƒe Kɔnsole**: [https://console.akash.network](https://console.akash.network)

**Akash ƒe Nuŋlɔɖiwo**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra ƒe Nuŋlɔɖiwo**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash Nukulawo**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash ƒe Masɔmasɔ**: [https://discord.akash.network](https://discord.akash.network) (na dɔwɔƒe si naa kpekpeɖeŋu ƒe nyawo)

