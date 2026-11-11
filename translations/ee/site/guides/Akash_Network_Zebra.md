# Aleke nàwɔ Zebra le Akash Network dzi

Mɔfiame kple mɔfiame ƒe mɔfiame na Zebra Zcash ɣaɣla dzesi ŋɔŋlɔ blibo kple [Akash Console](https://console.akash.network).

### Nusi Nèle Aɖoƒe

Zebra ɣaɣla dzesi ŋɔŋlɔ blibo aɖe si ana:

-> Wòaɖo ɖe Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] blibo dzi (100GB+ na mainnet, ~40GB na testnet)

-> Wòaxɔ dɔlawo ƒe $15 le ƒeɖeɖe me, le AKT token ƒe asiwo nu

-> Wòaxɔ gaƒoƒo geɖe alo ŋkeke geɖe be wòaɖo blibo

-> Wòawɔ dɔ kple 4 vCPU, 16GB RAM, 350GB nudzraɖoƒe na mainnet, alo 2 vCPU, 8GB RAM, 50GB na testnet


### Vevi: Port ƒe Ɖoɖo le Akash Dzi

Ne nàɖe port aɖe fia le Akash dzi (kpɔe be, port 8233 na Zebra P2P), **womakplɔe ɖe port ma tututɔ dzi le provider ƒe public IP dzi o.** Le esime ma ƒe teƒe la, provider la ana port didi maʋɛ aɖe (abe 31234 alo 42567 ene) eye wòawɔ reverse-proxy kple eya ɖe wò container ƒe port 8233 dzi.

Wowɔ esia le ɖoɖo me - providers wɔa deployments geɖe, eye nuɖeɖe ava wɔn dome ne ame sia ame nadi be yeazã port 8233 tɔxɛ.

**Nusi esia fia wòe nye:**

-> Nàɖo port 8233 le SDL me (Zebra ƒe P2P port si wozãna)

-> Akash ana URI si le abe *provider.com:31234* ene wò

-> Zcash ɣaɣla dzesi ŋɔŋlɔ bubuwo akplɔ ɖe eŋu le *provider.com:31234*

-> Le wò container me, Zebra gale 8233 ƒe nuteƒe


Wotsɔ mɔ si wɔ esia le eɖokui si. Zã URI si Akash na wò ko.

### Nuwo Si Wòele Be Nàxɔ Do Ŋgɔ

1. **Keplr Wallet** browser extension si wode le Chrome/Brave/Firefox me
2. **AKT tokens** - Xɔ AKT 50-100 tso gatrɔƒe [exchange] aɖe gbɔ (Coinbase, Kraken, Osmosis)
3. **Minuti 5** be nàzi Console UI la me

#### Afɔ 1: Ɖe Wò Gakotoku Kple Eŋu

-> Yi [https://console.akash.network](https://console.akash.network)

-> Zi **"Connect Wallet"** le dziƒe ƒe ɖeɖeƒe

-> Tia **Keplr** (alo wò Cosmos gakotoku)

-> Ɖe mɔ na kadodo la ne Keplr do ɖa


Wò AKT ƒe balance ava dze le dziƒe ƒe ɖeɖeƒe. Ne eƒe asixɔxɔ nye zero la, yi nàɖo ga ɖe wò gakotoku me gbã.

#### Afɔ 2: Wɔ Deployment

-> Zi **"Deploy"** button (button gã blu si le axɔa ƒe titina)

-> Tia **"Build your template"** (alo yi ɖe SDL ƒe upload dzi tẽ)

##### Ɖoƒe A: Ɖe SDL File Ɖo (Wòle Be Nàtia)

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Ɖoƒe B: Zã SDL Editor

Ne èdi be nàtsɔ asi aɖe [the SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Kopi *zebra-akash.yml* ƒe emenyawo

-> Ɖe ewo ɖe SDL editor la me

-> Trɔe le esi wòhiã (kpɔ configuration ƒe akpa si le ete)

-> Zi **"Create Deployment"**


#### Afɔ 3: Kpɔ Deposit La Ɖa Eye Nàɖe Mɔ Nɛ

Console la afia wò:

-> **Deployment deposit**: ~5 AKT (wòaɖo esia ɖe wò gbɔ ne nètsɔ deployment la ɖe aga)

-> **Ƒe asi si wole be nàxɔ**: Wole wò SDL ƒe asiwo nu

Zi **"Approve"** eye nàde asi ɖe gaɖoɖo [transaction] la ŋu le Keplr me.

#### Afɔ 4: Tia Provider Aɖe

Le sekondi 30 ƒe me la, nàkpɔ bids siwo tso providers gbɔ. Bid ɖesiaɖe afia:

-> **Asi na gaɖoɖowo ƒuƒoƒe [block] ɖeka** (le AKT alo USDC me)

-> **Ƒe asi si wole be nàxɔ le ƒeɖeɖe me**

-> **Provider ƒe nyawo** (dɔwɔƒe ƒe ɣeyiɣi, nutome, kple bubuwo)


**Mègatia esi mexɔ asi o ko.** Kpɔ:

-> Dɔwɔƒe ƒe ɣeyiɣi % (to 95% dzi alo wu)

-> Nutome (esi le te ɖe ŋuwò la ana kadodo ƒe gaƒoƒo nyo, gake emexɔ vevie na blockchain ƒe ɣaɣla dzesi ŋɔŋlɔwo o)

-> Audited ƒe nɔnɔ (dzesi gbɔdzɔ = wòle be wòakpɔ dzi ɖe eŋu wu)

Zi **"Accept Bid"** le provider si nètia la ŋu eye nàde asi le Keplr me.

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

```bash
zebra-8233: provider-hostname.com:31234
```

Esia nye wò ɣaɣla dzesi ŋɔŋlɔ ƒe **public P2P endpoint**. Zcash ɣaɣla dzesi ŋɔŋlɔ bubuwo akplɔ ɖe ŋuwò le gaɖoƒe ƒe dzesi sia dzi.

**De dzesi port ƒe ɖoɖo la ŋu:** Nèɖo port 8233 le SDL me, gake Akash na port public bubu (31234 le kpɔɖeŋu sia me). Esia menye nuku o - kpɔ akpa "Port ƒe Ɖoɖo le Akash Dzi" si le dzi ne esia mekɔ na wò o. Wò ɣaɣla dzesi ŋɔŋlɔ ŋuɖoɖo anɔ port sia sia si Akash fia le afisia, menye be 8233 koe o.

Ne nèɖe mɔ na RPC (wode comment ɖe eŋu le SDL me le gɔmedzedze), nàkpɔ RPC endpoint la hã afisia kple eƒe port si wowɔ mapping nɛ.

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

**Nuɖeɖe na port mapping**: Ne hã nàɖe RPC fia le xexeme blibo, Akash awɔ mapping nɛ ɖe port didi maʋɛ aɖe (menye 8232/18232 o). Kpɔ URIs siwo le wò deployment me be nàkpɔ public endpoint vavã. Na *global: false* (esia wɔ nyuie wu), RPC endpoint la ƒe mɔ le Akash deployment network la me ko, menye le public internet dzi o.

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

-> Zi **"Update"** eye nàɖe mɔ nɛ le Keplr me

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

-> Ɖo kpe ɖe eŋu eye nàde asi le Keplr me

Woatrɔ wò AKT 5 deposit la ade wò. Provider la ele be wòakpɔ **nudzraɖoƒe si mele te** ɖa, gake mèkplɔ ɖe eŋu o - wɔe abe cloud provider bubu sia bubu ene.

### Kpekpeɖeŋu Na Fiafitɔwo

#### Vodada "Insufficient funds"

Èhiã AKT geɖe. Ɖo ga ɖe wò Keplr gakotoku me.

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

Kpɔ asi si nèle zãm le Console me:

-> **My Deployments** -> Wò deployment -> Efia "Cost per month" ƒe asi si wole be nàxɔ

-> Wò Keplr gakotoku ƒe balance agɔme ɖeɖem le ɣeyiɣi me


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

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra Docs**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash Explorers**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (na provider ƒe kuxiwo)
