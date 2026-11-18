# Aleke nàwɔ Zebra le Akash Network dzi

Mɔfiame kple mɔfiame ƒe mɔfiame na Zebra Zcash ɣaɣla dzesi ŋɔŋlɔ blibo le Akash dzi.

### Nusi Nèle Aɖoƒe

Zebra ɣaɣla dzesi ŋɔŋlɔ blibo aɖe si ana:

-> Wòaɖo ɖe Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] blibo dzi (100GB+ na mainnet, ~40GB na testnet)

-> Wòaxɔ dɔlawo ƒe $15 le ƒeɖeɖe me, le AKT token ƒe asiwo nu

-> Wòaxɔ gaƒoƒo geɖe alo ŋkeke geɖe be wòaɖo blibo

-> Wòawɔ dɔ kple 4 vCPU, 16GB RAM, 350GB nudzraɖoƒe na mainnet, alo 2 vCPU, 8GB RAM, 50GB na testnet


Awesome-akash template la èkpɔ **Zebra 7.0.0** (menye `:latest` o). Eƒoa Prometheus (`9999`) kple ŋutete (`8080`) le eme, JSON-RPC le eme na **lightwalletd** si le teƒe ɖeka kple wò le gRPC **9067** dzi, eye eƒoa feature flags `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`.

Ne wòle be wòawo ɣaɣla dzesi ŋɔŋlɔ si wòtsɔ Mainnet ƒe nuwo ƒu la kaba, kpɔ [How to run Zakura le Akash](/guides/akash-network-zakura). Ne wòle be wòawo ɖoɖowo ƒuƒopé si wòatsɔ Regtest awɔ nu le ɣeyiɣi kpui aɖe me la, kpɔ [Thus Spoke Zakura le Akash](/guides/thus-spoke-zakura-akash).

### Aleke Akash tsɔa portwo dzea nyawo ɖe afã

Numewo siwo le SDL (`port` / `as`) me nye **container ƒe mɔwo**. Zebra gaɖoɖa le **8233** dzi, lightwalletd hã le **9067** dzi, eye dɔme nyonyo ƒe dzesi le **8080** dzi. Numewo siawo nye dɔwɔƒe la kple dɔwɔƒewo bubu siwo le deployment ma ke me (`zebra:8232`) tɔ.

Wometsɔ́ wo ɖe gatrɔƒe ƒe IP bɔbɔe dzi **o**.

**Default (template sia):** IP si woɖo ɖe wò ŋutɔ la mele eme o. `global: true` TCP expose ɖesiaɖe la, provider la tsɔ **port gã si woɖo ɖeɖe** le host si wò ne amewo bubu hã le zãm la ƒe port aɖe kplɔ wò container ƒe port. Le lease la vɔ megbe la, Console/Air **Leases → URIs** la fia endpoint siwo le eme, abe esiawo ene:

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Ɖokuiwo kple gakotokuwo zã **esime** host:port ƒe nunɔamesiwo. Tɔ URI si le expose si ŋu wòdi (P2P alo lightwalletd) la. Ne èɖo `ZEBRA_NETWORK__EXTERNAL_ADDR`, ɖo eƒe mapped P2P URI (`provider.example:31482`) ŋu, eye menye `…:8233` o.

**HTTP** (`as: 80` kple `http_options`, si wozãna le Thus Spoke ɖoɖowo ƒuƒopé dzi): Dzɔɖuɖuɖoɖola geɖewo ɖea **ingress hostname** (zi geɖe le 80/443) ɖe go, eye menye TCP port si wotsɔ dzɔɖuɖuɖo na o. Ɛʋu URI na dɔwɔƒe ma le browser me.

**Siwo Wòle Dziɖuɖu Ɖoɖo** (`global: false` alo `to: service: lightwalletd`): cluster DNS ko (`zebra:8232`). URI aɖeke si le gbɔna ɖe ame sia ame ŋu mele.

**IP si wò ŋutɔ wòle** (`endpoints` / `kind: ip` le SDL la me) nye **nu bubu xɔ asi**. Wòate ŋu akpe IP si amewo katã kpɔna ɖe IP la ŋu, eye zi aɖewo la, wòate ŋu akpe `as` port la hã ɖe IP ma dzi. Template siawo mele be woabia esi o. Ne èdi be nàwɔ stable `host:8233`, ekema tsɔe kpe ɖe edzi le emegbe; bu ga bubu kple providers siwo di be yewoabia ga la ƒe agbɔsɔsɔ susɔe ɖe ŋu.

### Site kae nawɔ afɔ (fexexe)

SDL la le ɖeka. Akash web UI evea to vovo le **alesi nèxɔa fexexe** me.

| Site | Fexexe | Gakotoku |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Web checkout si wòwɔna le ɖoɖo siwo le xexeme me (akpa / fiat ƒe mɔ siwo Console tsɔna) | Console account |
| [air.akash.network](https://air.akash.network) | Native Akash ɖoɖonu dzi fexexe (AKT / ACT) | **Keplr** |

Zã **Air** ne èdi be yeafɔ fexexe kple Keplr ɖoɖonu dzi. Zã **Console** ne èdi be nàzã web fexexe ƒe mɔ si wò ŋlɔna. Mègbɔ mɔ na Keplr ƒe fexexe ɖoɖonu dzi le Console o.

### Nuwo Si Wòele Be Nàxɔ Do Ŋgɔ

**Ne èxɔ fexexe le Console dzi (web checkout)**

1. Akɔntabubu wɔ Console dzi le [console.akash.network](https://console.akash.network)
2. Fexexe ƒe mɔ si Console UI lɔnɔ
3. Ƒe miniti aɖewo le UI me

**Ne èlɔ̃ fexexe le Air (Akash / Keplr si wòɖo kple e)****

1. **Keplr** browser extension (Chrome/Brave/Firefox)
2. **AKT / ACT** in Keplr for the deposit and lease (from an exchange or IBC)
3. Open [air.akash.network](https://air.akash.network)

#### Ɖoɖo 1: Ɔe Wò Me Gbɔe

**Console (fexexe si wɔa wɔ web dzi) [web payments]**

-> Yi [https://console.akash.network](https://console.akash.network)

-> Ge ɖe akɔnta me / wu Console akɔnta ƒe mɔzɔzɔ nu

Zã ŋu ɖoɖonu si UI fia wò (menye Keplr ɖoɖonu dzi o)

**Air (Akash fexexe siwo wòwɔna le eme)**

Yi ɖe [https://air.akash.network](https://air.akash.network)

-> Zi **"Connect Wallet"**

-> Tia **Keplr** eye ɖe mɔ na ɖekɔkɔ́e la

-> Kpɔ egbɔ be AKT/ACT ƒe ga si le wò si sɔ na kaƒomɔ ƒe gaɖoɖo kple lease

#### Afɔ 2: Wɔ Deployment

-> Zi **"Deploy"**

-> Tia **"Build your template"** (alo yi ɖe SDL ƒe upload dzi tẽ)

##### Ɖoƒe A: Ɖe SDL File Ɖo (Wòle Be Nàtia)

**Fexexe siwo wɔna le web (Console)**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Akash fexexe siwo wòle be nàxɔ le ƒeɖeɖe me kple Keplr (Air)**

[Ʋu template sia le Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Ɖoƒe B: Zã SDL Editor

Ne èdi be nàtsɔ asi aɖe [the SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Kopi *zebra-akash.yml* ƒe emenyawo

-> Ɖe ewo ɖe SDL editor la me

-> Trɔe le esi wòhiã (kpɔ configuration ƒe akpa si le ete)

-> Zi **"Create Deployment"**


#### Afɔ 3: Kpɔ Deposit La Ɖa Eye Nàɖe Mɔ Nɛ

UI-a afia nu siawo wò:

-> **Deployment deposit**: ~5 AKT (wòaɖo esia ɖe wò gbɔ ne nètsɔ deployment la ɖe aga)

-> **Ƒe asi si wole be nàxɔ**: Wole wò SDL ƒe asiwo nu

Le **Air** dzi, zi **"Approve"** dzi eye nàde asi **Keplr**. Le **Console** dzi, wu web checkout si UI la tsɔ na wò la nu.

#### Afɔ 4: Tia Provider Aɖe

Le sekondi 30 ƒe me la, nàkpɔ bids siwo tso providers gbɔ. Bid ɖesiaɖe afia:

-> **Asi na gaɖoɖowo ƒuƒoƒe [block] ɖeka** (le AKT alo USDC me)

-> **Ƒe asi si wole be nàxɔ le ƒeɖeɖe me**

-> **Provider ƒe nyawo** (dɔwɔƒe ƒe ɣeyiɣi, nutome, kple bubuwo)


**Mègatia esi mexɔ asi o ko.** Kpɔ:

-> Dɔwɔƒe ƒe ɣeyiɣi % (to 95% dzi alo wu)

-> Nutome (esi le te ɖe ŋuwò la ana kadodo ƒe gaƒoƒo nyo, gake emexɔ vevie na blockchain ƒe ɣaɣla dzesi ŋɔŋlɔwo o)

-> Audited ƒe nɔnɔ (dzesi gbɔdzɔ = wòle be wòakpɔ dzi ɖe eŋu wu)

Zi **"Accept Bid"** le provider si wò tia dzi. Le Air dzi, ɖo ŋkɔ me Keplr. Le Console dzi, tsɔ web ƒe fexexe ƒe mɔ nu ɖe edzi.

#### Afɔ 5: Lala Na Deployment La

Console la awɔ:

-> Wòawɔ lease kple provider si nètia

-> Wòaɖo manifest la ɖa (esi gblɔ na provider la nusi wòawɔ)

-> Wòadze wò container la

Esia xɔ minuti 1-2. Nàkpɔ nɔnɔ ƒe yeyeɖeɖewo le UI la me.

#### Afɔ 6: Ɖe Kpɔ Be Ele Dɔ Wɔm

Ne woɖo eƒe teƒe vɔ la, nàkpɔ:

-> **Services** tab: Efia wò *zebra* service kple eƒe nɔnɔ

-> **Logs** tab: Container ƒe logs si wole dɔ me

-> **Leases** tab: Nyawo ku ɖe wò deployment ŋu (DSEQ, provider, asi)


##### Kpɔ Logs Lɔ

Zi **Logs** eye ele be nàkpɔ Zebra le dɔ gɔme:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Ɖoɖoɖo la axɔ **gaƒoƒo geɖe va se ɖe ŋkeke geɖe** le network la nu. Lé ŋku ɖe:

-> Gaɖoɖowo ƒuƒoƒe ƒe kɔkɔe siwo gbedze yi dzi

-> Kadodo kple peers (ele be peers 10-30 nanɔ)

-> Vodada siwo megatrɔ ɖo o


#### Afɔ 7: Xɔ Wò Ɣaɣla Dzesi Ŋɔŋlɔ Ƒe Gaɖoƒe Ƒe Dzesi

Zi **Leases** tab, eye yi **URIs**.

Nàkpɔ nane abe:

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

Afɔ sia afɔe nye expose ɖeka `global: true`. Ŋkɔa ɖo SDL `as` port (8233, 9067) hã. Nɔmba si le hostname megbe nye **provider ƒe port si wòtrɔ**, si wòna le lease ɣeyiɣi me. Zcash ɣaɣla dzesi ŋɔŋlɔ bubuwo ƒoa dze `provider-hostname.com:31482`. Gakotoku siwo nye compact zã lightwalletd URI (TLS meda ɖe edzi, negbe ne wòe ɖo TLS ƒe nuwuwu).

Konteina la gale to 8233 / 9067 dzi se. Gaɖoƒe ƒe dzesi si le dutoƒo la nye URI zi sia zi, ne mètsɔ IP si wòɖo ɖe eŋu la kpe ɖe eŋu le megbe o (menye template sia me o).

### Ɖoɖoɖo Ƒe Tiatiawo

#### Trɔ Yi Testnet Dzi

SDL ƒe gɔmedzedze nye Mainnet. Be nàzã Testnet ɖe eƒe teƒe:

-> **Ɖe comment ɖe Mainnet ƒe config ŋu** le *env* ƒe akpa me:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Ɖe comment le Testnet ƒe config ŋu ɖa**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> **Trɔ port si wòɖe fia** le *expose* ƒe akpa me:

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

-> **Ne èdi la: Gbɔ resources ɖe megbe** na Testnet le *profiles.compute.zebra.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Ne èdi la: Gbɔ asiwo ɖe megbe** le *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### Ɖe Mɔ Na RPC Ƒe Mɔzɔzɔ

Womede mɔ na RPC le gɔmedzedze o ɖe dedienɔnɔ ta. Be nàɖe mɔ nɛ:

**Na Mainnet:**

-> Ɖe comment le *env* ƒe akpa me ɖa:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Ɖe comment le Mainnet RPC ƒe port si le *expose* me ɖa:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Na Testnet:**

-> Ɖe comment le *env* ƒe akpa me ɖa:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Ɖe comment le Testnet RPC ƒe port si le *expose* me ɖa:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Nuxlɔ̃ame**: Ne nàɖo *global: true* na RPC la, nèle eɖem fia na internet. Zebra zãa cookie auth le gɔmedzedze, gake hã - mèwɔ esia o ne menye be nènya nusi nèle wɔm o.

Ne èɖe RPC fia kple `global: true` la, ame sia ame ƒe gaɖoƒe ƒe dzesi nye **lease URI** (`host:&lt;random-high-port&gt;`) kokoko, menye `host:8232` o. Kple `global: false` (template sia), RPC li deployment network dzi (`zebra:8232` na lightwalletd). Dedicated IP leases nye mɔnu bubu si woxɔa fe ɖe eŋu, eye menye SDL me o.

#### Ɖe Mɔ Na Metrics (Prometheus)

Be nàxɔ metrics na monitoring:

-> Ɖe comment le *env* me ɖa:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Ɖe comment le metrics ƒe port si le *expose* me ɖa:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Trɔ Resources/Asiwo

Ne bids mele vɛm o alo èdi be nàwɔ asi ƒe nutrenu:

**Na providers siwo ƒe ŋusẽ menɔ te o**, gbɔe ɖe megbe le *profiles.compute.zebra.resources* ƒe akpa me:

-> CPU: *units: 2* (esi le be wòazɔ na sync ƒe mɔzɔzɔ nyuie)

-> Memory: *size: 12Gi* (esi le be wòazɔ na nɔnɔ ɖe anyi)

-> Nudzraɖoƒe: *size: 120Gi* (esi le be wòazɔ na mainnet)

**Be nàhe bids geɖe vɛ**, dzi asiwo ɖo le *profiles.placement.akash.pricing*:

-> Mainnet: Ɖe agbagba kple *amount: 1000000* uakt/block

-> Testnet: Ɖe agbagba kple *amount: 1000000* uakt/block

### Trɔ Wò Deployment

Èhiã be nàtrɔ configuration le deploy mentɔ?

-> Yi **My Deployments** le Console me

-> Di wò Zebra deployment

-> Zi **"Update Deployment"**

-> Trɔ SDL la

-> Zi dzi ŋu **"Update"** (Air: ɖo ŋkɔ ɖe eme Keplr; Console: ɖe web fexexe ƒe mɔ nu dzi)

**De dzesi**: Trɔtrɔ la adze wò container la gɔme. Ɣaɣla dzesi ŋɔŋlɔ la agayi edzi tso eƒe nɔnɔ si wòɖe ɖo (nudzraɖoƒe si mele te), gake kpɔe be dɔwɔƒe manɔ te na minuti 1-2.

### Kpɔ Nɔnɔ

#### To Console Mɔ Nu

-> **Logs tab**: Container ƒe logs si wole dɔ me

-> **Shell tab**: Xɔ shell le container la me (ewɔ na debugging)

-> **Events tab**: Kubernetes ƒe nudzɔdzɔwo (eƒe vi mele o gbɔna ne nane mesrɔ̃ o)


#### To RPC Mɔ Nu (ne nèɖe mɔ nɛ)

Ne nèɖe mɔ na RPC la, àte ŋu abia wò ɣaɣla dzesi ŋɔŋlɔ abe zebrad ɣaɣla dzesi ŋɔŋlɔ blibo [full node] si dzi wozãna ene (elabena eyae nye!)

### Tu Wò Deployment

Ne èwu vɔ alo mèdi be nàgaɖe asi o:

-> Yi **My Deployments**

-> Di wò Zebra deployment

-> Zi **"Close Deployment"**

-> Ɖo kpe ɖe edzi (Air: zɔ ɖe eme le Keplr; Console: Ɖo kpe ɖe edzi le Console UI me)

Woatrɔ wò AKT 5 deposit la ade wò. Provider la ele be wòakpɔ **nudzraɖoƒe si mele te** ɖa, gake mèkplɔ ɖe eŋu o - wɔe abe cloud provider bubu sia bubu ene.

### Kpekpeɖeŋu Na Fiafitɔwo

#### Vodada "Insufficient funds"

Ɖo Air dzi la, tsɔ AKT/ACT do ga ɖe Keplr me. Ɖo Console dzi la, kaƒomɔ ƒe gaɖoɖo na Console fexexe mɔnu.

#### Bids aɖeke mele dzem o

Ɖeka le esiawo dome:

-> Wò asiwo le te akpa (dzi *amount* le SDL me)

-> Wò resources si wòbia le dzi akpa na providers siwo li (gbɔ CPU/memory/nudzraɖoƒe ɖe megbe)

-> Lala ɣeyiɣi didi wu (ɣeaɣi aɖewo la, sekondi 60-90 xɔna be bids nadze)


#### Deployment la tsi le "pending"

Ɖewohĩ provider la le kuxi me. Tu deployment la eye nàɖe agbagba kple provider bubu.

#### Zebra ƒe logs fia "No peers connected"

Esia nye nu si dzɔna le minuti muamua aɖewo me. Zebra adi peers le eɖokui si. Ne egayi edzi le minuti 10+ megbe la, ɖewohĩ network ƒe kuxi le asiwò (esiamenɔa Akash dzi o).

#### Vodada "Out of memory" le logs me

Nètsɔ asi megbe le RAM ŋu. Tu deployment la eye nàɖo eƒe teƒe ake kple memory 12Gi le esi me (16Gi nyo wu).

#### Sync la le ɣeyiɣi didi geɖe

Ɖe "ɣeyiɣi didi geɖe" ƒe gɔme:

-> **Gaƒoƒo geɖe**: Enye nu si dzɔna

-> **Ŋkeke geɖe**: Esia hã nye nu si dzɔna na mainnet tso gɔmedzedze

-> **Kwasiɖa geɖe**: Nane mesɔ o, kpɔ logs la me be vodadawo le eme


### Asi Ƒe Dzidzime

Kpɔ wò gaɖoɖowo ɖe Console alo Air me:

-> **My Deployments** -> Wò deployment -> Efia "Cost per month" ƒe asi si wole be nàxɔ

-> Air: AKT/ACT ƒe gaɖoƒe ƒe dzesi si le Keplr me la tsɔa ɖe le ɣeyiɣi me. Console: Console fexexe ƒe gaɖoƒe ƒe dzesi la tsɔa ɖe.

Ne wò balance le te ɖeɖem la, Akash atu wò deployment le eɖokui si. **Ɖo kaƒomɔ ƒe gaɖoɖo [top up] ɖe wò gakotoku me le ɣeyiɣi sia ɣeyiɣi** alo wɔ alerts.

#### Aleke Nàgbɔ Asiwo Ɖe Megbe

-> **Zã Testnet** na non-production ƒe dodokpɔ (exɔ asi 50% ɖe megbe)

-> **Gbɔ CPU/memory ɖe megbe** ne mèhiã sync kabakaba o

-> **Tia providers siwo xɔ asi megbe** (menye ɣesiaɣi be esia nyo o - dɔwɔƒe ƒe ɣeyiɣi le vevie)


### Mainnet Kple Testnet

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

Dze egɔme kple Testnet ne nèle deployment ƒe wɔwɔ ƒe mɔ dodom kpɔm ko. Kpɔ akpa "Trɔ Yi Testnet Dzi" si le dzi na configuration.

### Nu Bubuwo Siwo Nàte Ŋu Azã

**Akash Ƒuƒoƒo ƒe ɖoɖowo** (web fexexe): [https://console.akash.network](https://console.akash.network)

**Akash Air** (AKT/ACT siwo le eme + Keplr): [https://air.akash.network](https://air.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra Docs**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash Explorers**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (na provider ƒe kuxiwo)
