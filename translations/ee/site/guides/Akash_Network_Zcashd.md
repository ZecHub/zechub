# Deploying zcashd to Akash via Console

Mɔfiame na zcashd Zcash blibo node (Electric Coin Co dɔwɔwɔ) zazã to [Akash Console](https://console.akash.network). Video nufiame aɖe si le ete enye si. Àte ŋu akpɔ mɔfiame si de to wu le ete.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ɖe mɔ ɖeFullScreen ŋu
    loading="lazy"
  />
</div>


## Nusi Nèle Dɔ wɔm

zcashd node blibo si awɔe be:

-> Zcash blockchain bliboa wɔ ɖeka (350GB+ na mainnet, ~ 40GB na testnet)

-> Ga home si ade $15/ɣleti le AKT ƒe dzesi ƒe asiwo nu

-> Xɔ gaƒoƒo geɖe va ɖo ŋkeke geɖe hafi wòawɔ ɖeka bliboe

-> Zã vCPU 4, 16GB RAM, 350GB nudzraɖoƒe (mainnet) alo 2 vCPUs, 8GB RAM, 50GB (testnet)

-> Wɔ cryptographic parameters ƒe kɔpi le gbãtɔ ƒe duƒuƒu me (~ 2GB, zi ɖeka)

**zcashd kple Zebra:**

-> zcashd nye Zcash node gbãtɔ ƒe dɔwɔwɔ to Electric Coin Co

-> Zebra nye Zcash Foundation ƒe dɔwɔwɔ bubu

-> Wo ame evea siaa sɔ kple Zcash network

-> zcashd ƒe nɔnɔme geɖewo le esi (tomenukuƒe, gakotoku, Insight Explorer API)

-> Zã zcashd ne èhiã gakotoku ƒe dɔwɔwɔ alo RPC API tɔxɛwo


### **Vevietɔ: Melidzeƒea ƒe Nɔnɔmetata le Akash**

Ne èɖe ʋɔtru aɖe ɖe go le Akash dzi (e.g., ʋɔtru 8233 na zcashd P2P), **mebla ɖe ʋɔtru ma tututu ŋu** le dɔwɔƒea ƒe dutoƒo IP dzi o. Ke boŋ, dɔwɔƒea dea ʋɔtru kɔkɔ si wowɔ le vome (abe 31234 alo 42567 ene) eye wòtrɔa asi le eŋu yia wò nugoe ƒe ʋɔtru 8233 dzi.

Esia nye to aɖaŋuwɔwɔ me - dɔwɔƒewo wɔa dɔ geɖewo, eye masɔmasɔwo anɔ wo dome ne amesiame dze agbagba be yeazã ʋudzeƒe 8233 tẽ.

**Nusi esia fia na wò:**

-> Èɖo ʋudzeƒe 8233 le SDL (zcashd ƒe P2P ʋɔtru si wozãna ɖaa) me .

-> Akash naa URI wò abe *provider.com:31234* ene.

-> Zcash node bubuwo doa ka kpli wò le *provider.com:31234*

-> Le wò nugoe me la, zcashd gakpɔtɔ le to ɖom le 8233 dzi


Wokpɔa esia gbɔ le wo ɖokui si. Ðeko nàzã URI si Akash na wò.

## Nusiwo hiã do ŋgɔ

-> **Keplr Wallet** woda web-browser ƒe kpeɖeŋutɔ ɖe wò kɔmpiuta dzi (Chrome/Brave/Firefox)

-> **AKT dzesiwo** - Xɔ 50-100 AKT tso asitɔtrɔ (Coinbase, Kraken, Osmosis)

-> **Aɖabaƒoƒo 5** be nàzi edzi to Console UI la me


## Afɔɖeɖe 1: Do ka kple Wò Gakotokua

-> Go to [https://console.akash.network](https://console.akash.network)

-> Zi **"Connect Wallet"** dzi le etame le ɖusime

-> Tia **Keplr** (alo Cosmos gakotoku si nèlɔ̃ wu)

-> Da asi ɖe kadodoa dzi ne Keplr do


Ele be wò AKT ƒe dadasɔ nadze le ɖusime le etame. Ne zero ye la, yi ɖadzɔ ga na wò gakotokua gbã.

## Afɔɖeɖe 2: Wɔ Deployment

-> Zi **"Deploy"** ƒe dzesi dzi (aɖaka gã blɔ, axa ƒe titina)

-> Tia **"Tu wò template"** (alo ti kpo tẽe yi SDL dada dzi)

### Tiatia A: Tsɔ SDL Faɛl (Wokafui) .

[![Deploy le Akash dzi](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Tiatia B: Zã SDL Editor

Ne èdi be yeatsɔ asi atsɔ SDL la ade eme la:

-> Kpɔ *zcashd-akash.yml* me nyawo ɖa

-> Kpe ɖe SDL ƒe nuŋlɔla la me

-> Trɔ asi le eŋu alesi wòhiã (kpɔ ɖoɖowɔɖi ƒe akpa si le ete)

-> Zi **"Wɔ Dɔwɔwɔ"** dzi.


## Afɔɖeɖe 3: Dzro Ga si Woda Ðe Gadzraɖoƒea Me eye nàda asi ɖe edzi

Console la afia wò:

-> **Deployment deposit**: ~ 5 AKT (ègaxɔ esia ne ètu deployment la)

-> **Ga si wobu**: Wotue ɖe wò SDL ƒe asixɔxɔ dzi


Zi **"Approve"** dzi eye nàde asi asitsatsa la te le Keplr me.

## Afɔɖeɖe 4: Tia Dɔwɔƒe si Naa Dɔa

Le ~ sɛkɛnd 30 megbe la, àkpɔ adzɔnuwo tso dɔwɔƒe siwo naa kpekpeɖeŋu gbɔ. Dodoɖeŋgɔ ɖesiaɖe ɖee fia be:

-> **Asi si woaxe ɖe block ɖeka ta** (le AKT alo USDC me)

-> **Ɣleti sia ɣleti ƒe gazazã si wobu**

-> **Dɔwɔƒea ŋuti nyatakakawo** (ɣeyiɣi si woatsɔ awɔ dɔe, nuto, kple bubuawo)


**Mègatia esiwo ƒe asi bɔbɔ wu ko o.** Kpɔe ɖa be:

-> Uptime % (taɖodzinu na > 95%) .

-> Nuto (si te ɖe ŋuwò wu = latency nyo wu, gake mehiã boo na blockchain nodes o)

-> Nɔnɔme si wodzro (dzesi dama = kakaɖedzi le eŋu wu)


Zi **"Accept Bid"** dzi le wò dɔwɔƒe si nètia dzi eye nàde asi Keplr me.

## Afɔɖeɖe 5: Lala be Woawɔ Dɔa

Console awɔ:

-> Wɔ hayahaya ƒe ɖoɖoa kple dɔwɔƒe si nètia

-> Ðo manifest la ɖa (egblɔ nusi wòle be wòaƒu du na dɔwɔƒea)

-> Dze wò nugoe gɔme


Esia xɔa miniti 1-2. Àkpɔ nɔnɔme yeyewo le UI la me.

## Afɔɖeɖe 6: Kpɔe ɖa be Ele Dum

Ne wonya de dɔwɔwɔ me ko la, àkpɔe be:

-> **Services** tab: Fia wò *zcashd* subɔsubɔdɔ kple nɔnɔme

-> **Nuŋlɔɖiwo** tab: Nuŋlɔɖi gbagbewo tso wò zcashd node me

-> **Leases** tab: Nyatakaka tso wò dɔwɔwɔ ŋu (DSEQ, dɔwɔƒe si naa, gazazã)


### Kpɔ Logs la ɖa

Zi **Logs** dzi eye ele be nàkpɔ zcashd wòadze egɔme:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**First run will download zcash-params (~2GB).** Esia nye zi ɖeka ƒe dɔwɔwɔ eye wòxɔa miniti 5-10 le provider bandwidth nu. Gbugbɔgadzedze siwo kplɔe ɖo adzo le esia dzi.

Sync la axɔ **gaƒoƒo va ɖo ŋkeke** le network la nu. Kpɔ nyuie le:

-> Block ƒe kɔkɔme dzi ɖeɖe kpɔtɔ

-> Hatiwo ƒe kadodowo (ele be wòanye hati 10-30)

-> Vodada aɖeke megawɔna enuenu o


## Afɔɖeɖe 7: Xɔ Wò Node ƒe Adrɛs

Zi **Leases** ƒe tab dzi, emegbe **URIs**.

Àkpɔ nane abe:

```
zcashd-8233: provider-hostname.com:31234
```

Esia nye wò node ƒe **dutoƒo P2P nuwuƒe**. Zcash node bubuwo aƒo ka na wò le adrɛs sia dzi.

**De dzesi ʋudzeƒe ƒe nɔnɔmetata:** Èɖo ʋudzeƒe 8233 le SDL me, gake Akash tsɔe de dutoƒo ʋɔtru bubu (31234 le kpɔɖeŋu sia me). Esia sɔ - kpɔ "Port Mapping on Akash" ƒe akpa si le etame ne esia tɔtɔ wò. Wò node la ateŋu aɖo ʋudzeƒe ɖesiaɖe si Akash ɖe fia le afisia, menye 8233 kokoko o.

Ne èwɔ RPC ŋudɔ (wogblɔe tso gɔmedzedzea me le SDL me) la, àkpɔ RPC ƒe nuwuƒe hã le afisia kple eya ŋutɔ ƒe ʋudzeƒe si wowɔ nɔnɔmetata na.

## Ðoɖowɔwɔ ƒe Tiatiawɔblɔɖe

### Trɔtrɔ ɖe Testnet ŋu

SDL la nye Mainnet. Be nàzã Testnet ɖe eteƒe la:

-> **Trɔ network le *env* ƒe akpaa dzi:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
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

-> **Tiatia: Ðe nunɔamesiwo** dzi kpɔtɔ na Testnet le *profiles.compute.zcashd.resources*:

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

> de dzesii be asiwo dzi ɖeɖe kpɔtɔ ate ŋu axe mɔ na míaƒe dɔwɔƒewo ƒe agbalẽvi. te asixɔxɔ sia kpɔ, alo zã provider endpiont nàtsɔ akpɔe ɖa be woaƒle nu hã. (to provider api nuŋlɔɖiwo me)

### Na RPC Mɔɖeɖe nawɔ dɔ

RPC nye nuwɔametɔ le gɔmedzedzea me hena dedienɔnɔ. Be wòana wòawɔ dɔ la:

**VEVIE: Ðo kpeɖodzinya sesẽwo.** zcashd RPC ɖoa zãla ƒe ŋkɔ/nyagbe to HTTP dzi (menye HTTPS o). Ne èse dedienɔnɔ ƒe gɔmesese gɔme ko hafi nàɖe RPC ɖe go.

-> Ðe nyaŋuɖoɖo le *env* ƒe akpaa me:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Ðe nya le RPC ʋɔtrua ŋu le *expose* me:

   **Na Mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Na Testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Nuxlɔ̃ame**: Ne èɖo *global: true* na RPC la, ke èle eɖem ɖe go ɖe internet dzi kple gɔmedze auth. Esia nye susu gbegblẽ. Zã *global: false* eye nàge ɖe RPC to Akash ƒe ememe network dzi alo nàɖo mɔ̃ si le dedie.

**Melidzeƒe ƒe nɔnɔmetata ƒe ŋkuɖodzinya**: Ne èɖe RPC ɖe go le xexeame katã hã la, Akash awɔ nɔnɔmetata nɛ ɖe melidzeƒe kɔkɔ si woɖo le vome (menye 8232/18232 o). Kpɔ URI siwo le wò dɔwɔwɔ me be nàkpɔ dutoƒonuwuƒe ŋutɔŋutɔ. Le *global: false* (wokafui) gome la, Akash ƒe dɔwɔwɔ ƒe kadodoa me koe woateŋu akpɔ RPC ƒe nuwuƒea, ke menye tso dutoƒo internet dzi o.

### Na Asitsatsa ƒe Index nawɔ dɔ

Transaction index na be nàte ŋu abia asitsatsa ɖesiaɖe to eƒe ID dzi to RPC dzi. Ezãa nudzraɖoƒe geɖe wu (~ 20% ƒe dzidziɖedzi).

Migagblɔ nya aɖeke le *env* me o:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Nuxlɔ̃ame**: Txindex ƒe dɔwɔwɔ le synced node si li xoxo dzi bia be woagbugbɔ blockchain bliboa awɔ index, si xɔa gaƒoƒo geɖe.

### Na Insight Explorer nawɔ dɔ

Insight Explorer naa REST API ƒe nuwuƒe bubuwo na blockchain nyatakakawo (eɖea vi na block explorers).

Migagblɔ nya aɖeke le *env* me o:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Esia na txindex te ŋu wɔa dɔ le eɖokui si eye wòtsɔa RPC mɔnu bubuwo kpena ɖe eŋu.

### Na Prometheus Metrics nawɔ dɔ

Be nàɖe metriks hena ŋkuléle ɖe nu ŋu:

-> Ðe nyaŋuɖoɖo ɖa le *env* me:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Ðe nyawo ɖa le metrics ʋɔtrua ŋu le *expose* me:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Metrics anɔ anyi le http://yourendpoint:9969/metrics le Prometheus ƒe nɔnɔme me.

### Trɔ Asi le Dɔwɔnuwo/Asixɔxɔ Ŋu

Ne mèle asi xɔm o alo nèdi be yeawɔ gazazã ŋudɔ nyuie wu la:

**Na dɔwɔƒe siwo ƒe spec bɔbɔ wu**, ɖe edzi le *profiles.compute.zcashd.resources* ƒe akpaa dzi:

-> CPU: *units: 2* (nu suetɔ kekeake na sync duƒuƒu si sɔ)

-> Ŋkuɖodzinu: *lolome: 12Gi* (nu suetɔ kekeake na liƒo)

-> Nudzraɖoƒe: *lolome: 120Gi* (nu suetɔ kekeake na mainnet)


**Be nàhe asi geɖe vɛ** la, dzi *profiles.placement.akash.pricing* ɖe edzi:

-> Mainnet: Te *agbɔsɔsɔ: 15000* uakt/block kpɔ

-> Testnet: Te *agbɔsɔsɔ: 7500* uakt/block kpɔ


Woɖo SDL ƒe asixɔxɔwo ɖe kɔkɔƒe le mɔ si nu wodzra ɖo nu. Dɔwɔƒe siwo naa kpekpeɖeŋu akpa gãtɔ aƒle ga si bɔbɔ ɖe anyi wu.

## Wò Dɔwɔɖoɖoa ƒe Tɔtrɔwɔwɔ

Ehiã be nàtrɔ ɖoɖowɔwɔ le eɖoɖo vɔ megbea?

-> Yi **Nye Dɔwɔwɔwo** le Console me

-> Di wò zcashd ƒe dɔwɔwɔ

-> Zi **"Tsɔ Ðe Dɔwɔwɔ Ŋu"** dzi.

-> Trɔ asi le SDL la ŋu

-> Zi **"Update"** dzi eye nàda asi ɖe edzi le Keplr me


**De dzesii**: Trɔtrɔ agbugbɔ adze wò nugoe gɔme. Node la agadze egɔme tso eƒe nɔnɔme si wodzra ɖo (nudzraɖoƒe si nɔa anyi ɖaa), gake kpɔ mɔ be miniti 1-2 natsi anyi.

## Kpɔkpɔ le ŋkuléle ɖe nu ŋu

### To Console dzi

-> **Nuŋlɔɖiwo ƒe tab**: Nugoe me nuŋlɔɖi siwo le agbe

-> **Shell tab**: Na shell aɖe le nugoe la me (eɖea vi na vodadawo ɖeɖeɖa)

-> **Nudzɔdzɔwo ƒe tab**: Kubernetes nudzɔdzɔwo (wo dometɔ akpa gãtɔ meɖea vi o negbe ɖe nane gblẽ ko)


### To RPC dzi (ne wowɔe) .

Ne èwɔ RPC ŋudɔ la, àteŋu abia wò node abe zcashd full node si sɔ ene (elabena ele nenema!) .

### zcash-cli Mɔnu bubu si woate ŋu azã

Ne shell ƒe mɔɖeɖe le asiwò to Console dzi la, àteŋu azã *zcash-cli* tẽ:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Wò Dɔwɔɖoɖoa Nuwuwu

Ne èwu fexexe nu alo nèdi be yeadzudzɔ:

-> Yi **Nye Dɔwɔwɔwo**

-> Di wò zcashd ƒe dɔwɔwɔ

-> Zi **"Close Deployment"** dzi.

-> Ðo kpe edzi eye nàde asi ete le Keplr


Woagbugbɔ wò 5 AKT ga si nède la ana wò. **Nudzraɖoƒe si nɔa anyi ɖaa** ele be dɔwɔƒea nakpɔ eta, gake mègaɖo ŋu ɖe eŋu o - wɔ nu ɖe ​​eŋu abe alilikpo me dɔwɔƒe bubu ɖesiaɖe ene.

## Kuxiwo gbɔ kpɔkpɔ

### "Ga si mesɔ gbɔ o" ƒe vodada

Èhiã AKT geɖe wu. Ga na wò Keplr gakotokua.

### Dɔbiagbalẽvi aɖeke mele ɖeɖefiam o

Eya loo:

-> Wò asixɔxɔ le sue akpa (dzi *ga home* ɖe edzi le SDL me)

-> Wò nunɔamesiwo ƒe hiahiãwo lolo akpa na dɔwɔƒe siwo li (ɖe CPU/ŋkuɖodzinu/nudzraɖoƒe dzi kpɔtɔ)

-> Lala ɣeyiɣi didi wu (ɣeaɖewoɣi exɔa sɛkɛnd 60-90 hafi dɔbiagbalẽviwo nadze)


### Deployment tsi "pending" me.

Ðewohĩ nyawo le amesi naa kpekpeɖeŋua ŋu. Do dɔwɔwɔa eye nàte dɔwɔƒe bubu kpɔ.

### zcashd logs show "Hati aɖeke mele kadodo me o".

Esia sɔ le aɖabaƒoƒo ʋɛ gbãtɔawo me. zcashd ake ɖe hatiwo ŋu le eɖokui si. Ne egakpɔtɔ le miniti 10+ megbe la, àte ŋu akpɔ kadodo ƒe kuxi aɖe (manɔ eme be le Akash dzi o).

### "Out of memory" vodadawo le nuŋlɔɖiwo me

Èxɔ asi le RAM ŋu. Do dɔwɔwɔa eye nàgbugbɔe aɖoe kple ŋkuɖodzinu 12Gi ya teti (wokafu 16Gi).

### Sync le xɔm tegbee

Ðe "tegbee" gɔme:

-> **Gaƒoƒo**: Esɔ

-> **Ŋkekewo**: Azɔ hã esɔ na mainnet tso gɔmedzedzea me

-> **Kwasiɖa**: Nane gblẽ, kpɔ nuŋlɔɖiwo ɖa be vodadawo le eme hã


### "Vodada le zcash-params xɔxlɔ̃ me".

Ðewohĩ network ƒe kuxiwo alo bandwidth si le blewu le dɔwɔƒe si naa kpekpeɖeŋua ŋu. Zi geɖe la, esia ŋutɔ kpɔa egbɔ. Ne enɔ anyi wu miniti 30 la, dze agbagba nàgbugbɔe aɖo ɖe dɔwɔƒe bubu.

### RPC ƒe ɖaseɖiɖi ƒe kpododonuwo

-> Kpɔe ɖa be woɖo *ZCASHD_RPCUSER* kple *ZCASHD_RPCPASSWORD* nyuie hã

-> Kpɔ egbɔ be yele ʋɔtru nyuitɔ zãm (8232 na mainnet, 18232 na testnet)

-> Ðo ŋku edzi be Akash ye wɔ ʋudzeƒewo ƒe nɔnɔmetata - zã URI tso wò dɔwɔwɔ me, ke menye 8232 tẽ o


## Gazazãwo Dzikpɔkpɔ

Lé ŋku ɖe wò gazazã ŋu le Console la me:

-> **Nye Dɔwɔwɔwo** -> Wò dɔwɔwɔ -> Fia "Gazazã le ɣleti ɖeka me" ƒe akɔntabubu

-> Wò Keplr gakotoku ƒe ga si susɔ la dzi aɖe akpɔtɔ le ɣeyiɣi aɖe megbe


Ne wò ga si susɔ la vɔ la, Akash axe wò dɔwɔwɔ le eɖokui si. **Tsɔ wò gakotokua de eme ɣeaɖewoɣi** alo nàɖo nuxlɔ̃amewo.

### Gazazãwo Dzi Ðeɖe Akpɔtɔ

-> **Zã Testnet** na dodokpɔ si menye nuwɔwɔ o (50% ƒe asi bɔbɔ)

-> **Ðe CPU/memory** ɖe anyi ne mèhiã be nàwɔ ɖeka kabakaba o

-> **Tia dɔwɔƒe siwo ƒe asi bɔbɔ wu** (menye ɣesiaɣie nunya le eme o - dɔwɔwɔ ƒe ɣeyiɣi le vevie)

-> **Zã USDC ɖe AKT teƒe** ne AKT ƒe asi le tɔtrɔm (ehiã be SDL ƒe asi natrɔ)

-> **Tɔwɔ txindex** ne mèhiãe o (dzra ~ 20% nudzraɖoƒe ɖo)


### Dɔwɔnu Bubuwo

**Akash ƒe Kɔnsole**: [https://console.akash.network](https://console.akash.network)

**Akash ƒe Nuŋlɔɖiwo**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash Nukulawo**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash ƒe Masɔmasɔ**: [https://discord.akash.network](https://discord.akash.network) (na dɔwɔƒe si naa kpekpeɖeŋu ƒe nyawo)

## Nya Mamlɛawo

- **Nudzraɖoƒe si nɔa anyi ɖaa le vevie.** Mègadzo le *nudzraɖoƒe si nɔa anyi ɖaa: nyateƒe* alo zã *beta2* ƒe hatsotso o. Zã *beta3*.
- **Gbãtɔ ƒe sync le blewu.** Gbɔ dzi ɖi. Esia sɔ na blockchain nodes.
- **Na wò gakotokua nakpɔ ga.** Deployments auto-close ne AKT vɔ le asiwò.
- **Backups arent automatic.** Ne ètsɔ ɖe le nyatakakaawo me la, tsɔe be ate ŋu abu eye nàwɔ ɖoɖo ɖe eŋu.
- **RPC ƒe dedienɔnɔ le vevie ŋutɔ.** Mègatsɔ RPC de internet dzi dedienɔnɔ ƒe ɖoɖo nyuiwo manɔmee o.
- **zcash-params nye cached.** Gbã la, ƒu du downloads ~2GB ƒe cryptographic parameters. Esia sɔ eye zi ɖeka koe wòdzɔna.
