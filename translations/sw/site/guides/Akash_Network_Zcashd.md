# Kuweka zcashd kwenye Akash kupitia Console

> **Imepitwa na wakati. Usifuate mwongozo huu ili kuweka node unayokusudia kutumia.**
>
> zcashd ilisimamishwa kiotomatiki mwishoni mwa Usaidizi mnamo Julai 18, 2026. Node ya zcashd iliyowekwa leo haitasawazisha hadi ncha ya mnyororo [chain], kwa hivyo uwekaji huo hugharimu fedha kila mwezi na hautoi chochote.
>
> Weka **Zebra** badala yake: [Jinsi ya kuendesha Zebra kwenye Akash Network](/guides/akash-network-zebra), ambayo inaelezea utaratibu uleule wa Akash Console na inahitaji takribani theluthi moja ya diski. Ikiwa unahamisha usanidi uliopo, tazama mwongozo wa uhamishaji kutoka [zcashd hadi Zebra na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Ukurasa huu umehifadhiwa kama kumbukumbu ya kihistoria ya uwekaji wa zcashd.

Mwongozo wa kuweka full node ya zcashd Zcash (utekelezaji wa Electric Coin Co) kwa kutumia [Akash Console](https://console.akash.network). Hapa chini kuna mafunzo ya video. Mwongozo wa kina zaidi unapatikana hapa chini.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Usanidi wa Full Node ya Zcash kwenye Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Unachoweka

Full node ya zcashd ambayo:

-> Itasawazisha blockchain nzima ya Zcash (350GB+ kwa mainnet, ~ 40GB kwa testnet)

-> Itagharimu takribani $15/mwezi kulingana na bei za tokeni za AKT

-> Itachukua saa kadhaa hadi siku kadhaa kusawazisha kikamilifu

-> Itatumia vCPU 4, RAM 16GB, hifadhi 350GB (mainnet) au vCPU 2, RAM 8GB, 50GB (testnet)

-> Itapakua vigezo vya kriptografia wakati wa uendeshaji wa kwanza (~ 2GB, mara moja)

**zcashd dhidi ya Zebra:**

-> zcashd ilikuwa utekelezaji asili wa node ya Zcash kutoka Electric Coin Co, iliyosimamishwa tangu Julai 18, 2026

-> Zebra, kutoka Zcash Foundation, ndiyo full node inayotumika leo

-> Ni Zebra pekee inayofuata mnyororo wa sasa; node ya zcashd haiwezi kufikia ncha

-> Pochi ya zcashd imebadilishwa na [Zallet](/using-zcash/zallet-quick-reference-guide)

-> Tumia zcashd ikiwa unahitaji utendaji wa pochi au API mahususi za RPC


### **Muhimu: Uchoraji wa Bandari kwenye Akash**

Unapofichua bandari kwenye Akash (kwa mfano, bandari 8233 kwa P2P ya zcashd), **HAIUNGWI kwenye bandari hiyo kamili** kwenye IP ya umma ya mtoa huduma. Badala yake, mtoa huduma hutenga bandari ya juu ya nasibu (kama 31234 au 42567) na kuielekeza kwa reverse proxy kwenye bandari 8233 ya kontena lako.

Hii imekusudiwa hivyo - watoa huduma huendesha uwekaji mwingi, na kungekuwa na migongano ikiwa kila mtu angejaribu kutumia bandari 8233 moja kwa moja.

**Hii ina maana gani kwako:**

-> Unasanidi bandari 8233 katika SDL (bandari ya kawaida ya P2P ya zcashd)

-> Akash hukupa URI kama *provider.com:31234*

-> Node nyingine za Zcash huunganishwa nawe katika *provider.com:31234*

-> Ndani ya kontena lako, zcashd bado husikiliza kwenye 8233


Hili hushughulikiwa kiotomatiki. Tumia tu URI ambayo Akash inakupa.

## Mahitaji ya Awali

-> Kiendelezi cha kivinjari cha **Keplr Wallet** kimesakinishwa (Chrome/Brave/Firefox)

-> **Tokeni za AKT** - Pata AKT 50-100 kutoka soko la kubadilishana sarafu [exchange] (Coinbase, Kraken, Osmosis)

-> **Dakika 5** za kubofya kupitia kiolesura cha Console


## Hatua ya 1: Unganisha Pochi Yako

-> Nenda kwenye [https://console.akash.network](https://console.akash.network)

-> Bofya **“Connect Wallet”** upande wa juu kulia

-> Chagua **Keplr** (au pochi yako unayopendelea ya Cosmos)

-> Idhinisha muunganisho Keplr inapojitokeza


Salio lako la AKT linapaswa kuonekana upande wa juu kulia. Ikiwa ni sifuri, weka salio kwenye pochi yako kwanza.

## Hatua ya 2: Unda Uwekaji

-> Bofya kitufe cha **“Deploy”** (kitufe kikubwa cha samawati, katikati ya ukurasa)

-> Chagua **“Build your template”** (au ruka moja kwa moja hadi kupakia SDL)

### Chaguo A: Pakia Faili ya SDL (Inapendekezwa)

> **Kitufe hiki kinaweka node iliyosimamishwa.** Kinatoza salio lako la AKT kwa node ambayo haiwezi kusawazisha. Tumia mwongozo wa [Zebra](/guides/akash-network-zebra) badala yake.

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Chaguo B: Tumia Kihariri cha SDL

Ikiwa ungependa kubandika SDL mwenyewe:

-> Nakili maudhui ya *zcashd-akash.yml*

-> Bandika kwenye kihariri cha SDL

-> Rekebisha inavyohitajika (tazama sehemu ya usanidi hapa chini)

-> Bofya **“Create Deployment”**


## Hatua ya 3: Kagua na Idhinisha Amana

Console itakuonyesha:

-> **Amana ya uwekaji**: ~ AKT 5 (utairudishiwa unapofunga uwekaji)

-> **Gharama inayokadiriwa**: Kulingana na bei katika SDL yako


Bofya **“Approve”** na utie sahihi muamala [transaction] katika Keplr.

## Hatua ya 4: Chagua Mtoa Huduma

Baada ya ~ sekunde 30, utaona zabuni kutoka kwa watoa huduma. Kila zabuni inaonyesha:

-> **Bei kwa block** (katika AKT au USDC)

-> **Gharama ya kila mwezi inayokadiriwa**

-> **Maelezo ya mtoa huduma** (muda wa upatikanaji, eneo, n.k.)


**Usichague iliyo nafuu zaidi pekee.** Angalia:

-> Asilimia ya muda wa upatikanaji (lenga > 95%)

-> Eneo (lililo karibu nawe = muda bora wa kujibu, lakini halina umuhimu mkubwa kwa node za blockchain)

-> Hali ya ukaguzi (alama ya kijani = inaaminika zaidi)


Bofya **“Accept Bid”** kwenye mtoa huduma uliyochagua na utie sahihi katika Keplr.

## Hatua ya 5: Subiri Uwekaji

Console itafanya yafuatayo:

-> Kuunda upangaji na mtoa huduma uliyochagua

-> Kutuma manifest (humweleza mtoa huduma nini cha kuendesha)

-> Kuanzisha kontena lako


Hii huchukua dakika 1-2. Utaona masasisho ya hali katika kiolesura.

## Hatua ya 6: Thibitisha Kwamba Inaendesha

Baada ya kuwekwa, utaona:

-> Kichupo cha **Services**: Huonyesha huduma yako ya *zcashd* pamoja na hali

-> Kichupo cha **Logs**: Kumbukumbu za moja kwa moja kutoka node yako ya zcashd

-> Kichupo cha **Leases**: Maelezo kuhusu uwekaji wako (DSEQ, mtoa huduma, gharama)


### Angalia Kumbukumbu

Bofya **Logs** na unapaswa kuona zcashd ikianza:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Uendeshaji wa kwanza utapakua zcash-params (~2GB).** Hili ni operesheni ya mara moja na huchukua dakika 5-10 kulingana na kipimo data cha mtoa huduma. Kuanzishwa upya baadae kutaruka hili.

Usawazishaji utachukua **saa hadi siku** kulingana na mtandao. Angalia:

-> Urefu wa block unaoongezeka

-> Miunganisho ya wenzao (inapaswa kuwa wenzao 10-30)

-> Kutokuwepo kwa hitilafu zinazojirudia


## Hatua ya 7: Pata Anwani ya Node Yako

Bofya kichupo cha **Leases**, kisha **URIs**.

Utaona kitu kama:

```
zcashd-8233: provider-hostname.com:31234
```

Hii ni **endpoint ya P2P ya umma** ya node yako. Node nyingine za Zcash zitaunganishwa nawe kwenye anwani hii.

**Zingatia uchoraji wa bandari:** Ulisanidi bandari 8233 katika SDL, lakini Akash iliitenga kwa bandari tofauti ya umma (31234 katika mfano huu). Hili ni la kawaida - tazama sehemu ya “Uchoraji wa Bandari kwenye Akash” hapo juu ikiwa hili linakuchanganya. Node yako inafikika kwenye bandari yoyote ambayo Akash inaonyesha hapa, si lazima 8233.

Ikiwa uliwezesha RPC (imewekewa maoni kwa chaguo-msingi katika SDL), pia utaona endpoint ya RPC hapa ikiwa na bandari yake iliyochorwa.

## Chaguo za Usanidi

### Kubadilisha kwenda Testnet

SDL hutumia Mainnet kwa chaguo-msingi. Kutumia Testnet badala yake:

-> **Badilisha mtandao katika sehemu ya *env*:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> **Sasisha bandari iliyofichuliwa** katika sehemu ya *expose*:

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

-> **Hiari: Punguza rasilimali** za Testnet katika *profiles.compute.zcashd.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Hiari: Punguza bei** katika *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> Kumbuka kuwa kupunguza bei kunaweza kuwazuia watoa huduma kutoa zabuni. Jaribu thamani hii, au tumia endpoint ya mtoa huduma kuangalia kama wangetoa zabuni. (Kagua nyaraka za API ya mtoa huduma)

### Wezesha Ufikiaji wa RPC

RPC imezimwa kwa chaguo-msingi kwa usalama. Ili kuiwezesha:

**MUHIMU SANA: Weka vitambulisho imara.** RPC ya zcashd hutuma jina la mtumiaji/nenosiri kupitia HTTP (si HTTPS). Fichua RPC tu ikiwa unaelewa athari za kiusalama.

-> Ondoa maoni katika sehemu ya *env*:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Ondoa maoni kwenye bandari ya RPC katika *expose*:

   **Kwa Mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Kwa Testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Onyo**: Ukiweka *global: true* kwa RPC, unaifichua kwenye intaneti kwa uthibitishaji wa msingi. Hili ni wazo baya. Tumia *global: false* na ufikie RPC kupitia mtandao wa ndani wa Akash au usanidi njia salama ya mawasiliano.

**Ukumbusho wa uchoraji wa bandari**: Hata ukifichua RPC kimataifa, Akash itaichora kwenye bandari ya juu ya nasibu (si 8232/18232). Angalia URI katika uwekaji wako ili kuona endpoint halisi ya umma. Kwa *global: false* (inapendekezwa), endpoint ya RPC inafikika tu ndani ya mtandao wa uwekaji wa Akash, si kutoka intaneti ya umma.

### Wezesha Kielezo cha Muamala

Kielezo cha muamala hukuruhusu kuuliza muamala wowote kwa kitambulisho chake kupitia RPC. Hutumia hifadhi zaidi (ongezeko la ~ 20%).

Ondoa maoni katika *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Onyo**: Kuwezesha txindex kwenye node iliyosawazishwa tayari kunahitaji kuorodhesha upya blockchain nzima, jambo linalochukua saa kadhaa.

### Wezesha Kivinjari cha Insight

Kivinjari cha Insight hutoa endpoint za ziada za REST API za data ya blockchain (zinafaa kwa vivinjari vya block).

Ondoa maoni katika *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Hili huwezesha txindex kiotomatiki na huongeza mbinu za ziada za RPC.

### Wezesha Vipimo vya Prometheus

Kukusanya vipimo kwa ajili ya ufuatiliaji:

-> Ondoa maoni katika *env*:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Ondoa maoni kwenye bandari ya vipimo katika *expose*:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Vipimo vitapatikana katika http://yourendpoint:9969/metrics kwa muundo wa Prometheus.

### Rekebisha Rasilimali/Bei

Ikiwa hupati zabuni au unataka kuboresha gharama:

**Kwa watoa huduma wenye vipimo vya chini**, punguza katika sehemu ya *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (kiwango cha chini kwa kasi inayokubalika ya usawazishaji)

-> Kumbukumbu: *size: 12Gi* (kiwango cha chini kwa uthabiti)

-> Hifadhi: *size: 120Gi* (kiwango cha chini kwa mainnet)


**Ili kuvutia zabuni zaidi**, ongeza katika *profiles.placement.akash.pricing*:

-> Mainnet: Jaribu *amount: 15000* uakt/block

-> Testnet: Jaribu *amount: 7500* uakt/block


Thamani za SDL zimewekwa kwa kiwango cha juu kwa tahadhari. Watoa huduma wengi watatoa zabuni ya chini zaidi.

## Kusasisha Uwekaji Wako

Je, unahitaji kubadilisha usanidi baada ya kuweka?

-> Nenda kwenye **My Deployments** katika Console

-> Tafuta uwekaji wako wa zcashd

-> Bofya **“Update Deployment”**

-> Hariri SDL

-> Bofya **“Update”** na uidhinishe katika Keplr


**Kumbuka**: Kusasisha kutaanzisha upya kontena lako. Node itaendelea kutoka hali yake iliyohifadhiwa (hifadhi endelevu), lakini tarajia dakika 1-2 za kutofanya kazi.

## Ufuatiliaji

### Kupitia Console

-> Kichupo cha **Logs**: Kumbukumbu za kontena za moja kwa moja

-> Kichupo cha **Shell**: Pata shell ndani ya kontena (inafaa kwa utatuzi)

-> Kichupo cha **Events**: Matukio ya Kubernetes (kwa kiasi kikubwa hayana manufaa isipokuwa kuna kilichoharibika)


### Kupitia RPC (ikiwa imewezeshwa)

Ikiwa uliwezesha RPC, unaweza kuuliza node yako kama full node ya kawaida ya zcashd (kwa sababu ndivyo ilivyo!)

### Mbadala wa zcash-cli

Ikiwa una ufikiaji wa shell kupitia Console, unaweza kutumia *zcash-cli* moja kwa moja:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Kufunga Uwekaji Wako

Unapomaliza au unapotaka kuacha kulipa:

-> Nenda kwenye **My Deployments**

-> Tafuta uwekaji wako wa zcashd

-> Bofya **“Close Deployment”**

-> Thibitisha na utie sahihi katika Keplr


Amana yako ya AKT 5 itarejeshwa. **Hifadhi endelevu** inapaswa kuhifadhiwa na mtoa huduma, lakini usitegemee hilo - ichukulie kama mtoa huduma mwingine yeyote wa wingu.

## Utatuzi wa Matatizo

### Hitilafu ya “Insufficient funds”

Unahitaji AKT zaidi. Weka salio kwenye pochi yako ya Keplr.

### Hakuna zabuni zinazoonekana

Ama:

-> Bei yako ni ndogo sana (ongeza *amount* katika SDL)

-> Mahitaji yako ya rasilimali ni makubwa sana kwa watoa huduma wanaopatikana (punguza CPU/kumbukumbu/hifadhi)

-> Subiri zaidi (wakati mwingine huchukua sekunde 60-90 zabuni kuonekana)


### Uwekaji umekwama katika “pending”

Huenda mtoa huduma ana matatizo. Funga uwekaji na ujaribu mtoa huduma tofauti.

### Kumbukumbu za zcashd zinaonyesha “No peers connected”

Tangu kusimamishwa kwa Usaidizi mnamo Julai 18, 2026, hii ndiyo hali ya kudumu inayotarajiwa badala ya kuchelewa kuanza, na hakuna kiasi cha kusubiri au kuweka upya kitakachorekebisha hili. Weka [Zebra](/guides/akash-network-zebra) badala yake.

### Hitilafu za “Out of memory” katika kumbukumbu

Ulipunguza sana RAM. Funga uwekaji na uweke upya ukiwa na angalau kumbukumbu 12Gi (16Gi inapendekezwa).

### Usawazishaji unachukua muda usioisha

Fafanua “usioisha”:

-> **Saa**: Kawaida

-> **Siku**: Pia ni kawaida kwa mainnet kutoka mwanzo

-> **Wiki**: Kuna tatizo, angalia kumbukumbu kwa hitilafu


### “Error fetching zcash-params”

Huenda mtoa huduma ana matatizo ya mtandao au kipimo data cha polepole. Hili kwa kawaida hujitatua lenyewe. Ikiendelea kwa zaidi ya dakika 30, jaribu kuweka upya kwa mtoa huduma tofauti.

### Hitilafu za uthibitishaji wa RPC

-> Angalia kuwa `ZCASHD_RPCUSER` na `ZCASHD_RPCPASSWORD` zimewekwa kwa usahihi

-> Thibitisha kuwa unatumia bandari sahihi (8232 kwa mainnet, 18232 kwa testnet)

-> Kumbuka bandari huchorwa na Akash - tumia URI kutoka uwekaji wako, si 8232 moja kwa moja


## Usimamizi wa Gharama

Fuatilia matumizi yako katika Console:

-> **My Deployments** -> Uwekaji wako -> Huonyesha makadirio ya “Cost per month”

-> Salio la pochi yako ya Keplr litapungua kadiri muda unavyopita


Salio lako linapopungua, Akash itafunga uwekaji wako kiotomatiki. **Ongeza salio kwenye pochi yako mara kwa mara** au usanidi arifa.

### Kupunguza Gharama

-> **Tumia Testnet** kwa majaribio yasiyo ya uzalishaji (nafuu kwa 50%)

-> **Punguza CPU/kumbukumbu** ikiwa huhitaji usawazishaji wa haraka

-> **Chagua watoa huduma wa bei nafuu** (si busara daima - muda wa upatikanaji ni muhimu)

-> **Tumia USDC badala ya AKT** ikiwa bei ya AKT ni tete (huhitaji mabadiliko ya bei ya SDL)

-> **Zima txindex** ikiwa huihitaji (huokoa hifadhi ~ 20%)


### Rasilimali za Ziada

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Nyaraka za Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Vivinjari vya Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (kwa matatizo ya mtoa huduma)

## Maelezo ya Mwisho

- **Hifadhi endelevu ni muhimu.** Usiruke *persistent: true* wala kutumia daraja la *beta2*. Tumia *beta3*.
- **Usawazishaji wa mwanzo ni wa polepole.** Kuwa na subira. Hili ni la kawaida kwa node za blockchain.
- **Weka salio kwenye pochi yako.** Uwekaji hufungwa kiotomatiki unapomaliza AKT.
- **Nakala rudufu si za kiotomatiki.** Ikiwa data ni muhimu kwako, dhania kwamba inaweza kupotea na panga ipasavyo.
- **Usalama wa RPC ni muhimu sana.** Usifiche RPC kwenye intaneti bila hatua sahihi za usalama.
- **zcash-params huhifadhiwa kwenye akiba.** Uendeshaji wa kwanza hupakua ~2GB za vigezo vya kriptografia. Hili ni la kawaida na hutokea mara moja tu.
