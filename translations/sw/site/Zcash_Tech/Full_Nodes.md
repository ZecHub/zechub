<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nodi Kamili

## TL;DR

- Nodi kamili huweka nakala kamili ya blockchain Zcash na huangalia kila kizuizi kipya na muamala dhidi ya sheria za makubaliano.
- Zebra (`zebrad`) ndio nodi ya kusakinisha leo. Zakura ni utekelezaji wa pili, uliotengenezwa kwa uma kutoka kwa Zebra.
- zcashd imesitishwa. Kizuizi chake cha Mwisho wa Usaidizi kilifikiwa mnamo 18 Julai 2026 katika urefu wa vitalu 3417100, na nodi hizo hazianzi tena.
- Nodi na pochi sasa ni programu tofauti. [Zallet](https://github.com/zcash/zallet) hukimbia dhidi ya nodi na kushikilia funguo.
- Kuendesha nodi yako mwenyewe hukupa uthibitishaji huru na huondoa hitaji la kuamini seva ya mtu mwingine.

## Maelezo ya Msingi

Nodi Kamili ni programu inayoendesha nakala kamili ya blockchain ya sarafu ya kidijitali, ikikupa ufikiaji wa vipengele vya itifaki.

Inashikilia rekodi kamili ya kila muamala ambao umetokea tangu mwanzo na kwa hivyo inaweza kuthibitisha uhalali wa miamala mipya na vizuizi vinavyoongezwa kwenye blockchain.

## Utekelezaji wa Nodi

### Zebra

Zebra ni utekelezaji kamili wa nodi huru, tayari kwa uzalishaji wa itifaki ya Zcash, iliyoundwa na Zcash Foundation na kuandikwa kwa Rust. Kwa kuwa zcashd imestaafu, Zebra (`zebrad`) ni nodi kamili inayopendekezwa kwa ajili ya usanidi mpya.

Zebra huthibitisha vizuizi na miamala, hushiriki katika mtandao wa rika-kwa-rika, na hufichua kiolesura cha RPC kwa programu. Pochi sasa ni sehemu tofauti: [Zallet](https://github.com/zcash/zallet) huendeshwa dhidi ya nodi Zebra na hushughulikia funguo na mizani. Hii inachukua nafasi zcashd, ambayo iliunganisha nodi na pochi katika mchakato mmoja.

Ili kuhudumia pochi nyepesi zilizolindwa, nodi hutembea kando ya kiashiria, iwe ni [lightwalletd](https://github.com/zcash/lightwalletd) au mpya zaidi [Zaino](https://zechub.wiki/zaino).

Hakikisha umesoma kitabu Zebra kwa maelekezo ya usanidi, na jiunge na seva ya R&D Discord kwa usaidizi.

[Github](https://github.com/ZcashFoundation/zebra/)

[Kitabu cha Zebra](https://zebra.zfnd.org)

Tazama [Kifundo Kamili cha Zebra](/zcash-tech/zebra-full-node) kwa hatua za usakinishaji, usanidi, na mahitaji ya vifaa.

### Zakura

Zakura ni nodi kamili ya pili inayolingana na makubaliano, iliyotenganishwa kutoka Zebra na kutengenezwa na Valar Group pamoja na Project Tachyon. Inafuata sheria zile zile za itifaki na huongeza usawazishaji wa haraka, kupogoa kwa vizuizi, na safu ya utangamano wa zcashd RPC. Tazama [Njia ya Zakura](/zcash-tech/zakura-node).

### zcashd (mstaafu)

> **Kumbuka:** zcashd amestaafu. Electric Coin Company [ilitangaza kuachiliwa kwa](https://z.cash/support/zcashd-deprecation/), na kusimamishwa kiotomatiki kwa Mwisho wa Usaidizi kulifikiwa mnamo 18 Julai 2026 kwa urefu wa block 3417100. Kila nodi zcashd 6.20.0 ambayo haijabadilishwa huzima kwa urefu huo na kukataa kuanzisha upya, na programu haiungi mkono NU6.3. Tumia Zebra. Ukishikilia zcashd `wallet.dat`, fuata [Mwongozo wa Uhamiaji: zcashd hadi Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd ilikuwa utekelezaji wa awali wa Nodi Kamili kwa Zcash, uliotengenezwa na kudumishwa na Electric Coin Company. Maagizo ya ujenzi yaliyo hapa chini yamehifadhiwa kwa ajili ya marejeleo na kwa waendeshaji wanaohama kutoka zcashd.

Zcashd hufichua seti ya API kupitia kiolesura chake cha RPC. API hizi hutoa vitendakazi vinavyoruhusu programu za nje kuingiliana na nodi.

[Lightwalletd](https://github.com/zcash/lightwalletd) ni mfano wa programu inayotumia nodi kamili ili kuwawezesha wasanidi programu kujenga na kudumisha pochi nyepesi zinazoweza kulindwa kwa urahisi kwenye simu bila kulazimika kuingiliana moja kwa moja na Zcashd.

[Orodha kamili ya amri za RPC zinazoungwa mkono](https://zcash.github.io/rpc/)

[Kitabu cha Zcashd](https://zcash.github.io/zcash/)

#### Anzisha Nodi (Linux)

- Utegemezi wa Usakinishaji

      sasisho la sudo apt

      sudo apt-get kufunga \
      jenga-muhimu pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Toleo jipya zaidi la nakala, malipo, usanidi na ujenge:

      git kloni https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sawazisha Blockchain (inaweza kuchukua saa kadhaa)

    Ili kuanza nodi, endesha:

      ./src/zcashd

- Funguo za Kibinafsi huhifadhiwa katika ~/.zcash/wallet.dat

[Mwongozo wa Zcashd kwenye Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Matokeo ya Kivitendo

### Mtandao

Kwa kuendesha nodi kamili, unasaidia kuimarisha mtandao wa zcash kwa kuunga mkono ugatuzi wake.

Hii husaidia kuzuia udhibiti wa wapinzani na kuweka mtandao ukiwa imara kwa aina fulani za usumbufu.

Vipandikizi vya DNS huonyesha orodha ya nodi zingine zinazoaminika kupitia seva iliyojengewa ndani. Hii inaruhusu miamala kusambaa katika mtandao mzima.

### Takwimu za Mtandao

Hizi ni mifano ya mifumo inayoruhusu ufikiaji wa data ya Mtandao Zcash:

[Kichunguzi cha Kizuizi Zcash](https://zcashblockexplorer.com)

[Sarafu za kielektroniki](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Unaweza pia kuchangia katika maendeleo ya mtandao kwa kufanya majaribio au kupendekeza maboresho mapya na kutoa vipimo.

### Uchimbaji madini

Wachimbaji wanahitaji nodi kamili ili kufikia RPC zote zinazohusiana na uchimbaji madini kama vile getblocktemplate na getmininginfo.

Zcashd pia huwezesha uchimbaji madini hadi kwenye msingi wa sarafu uliolindwa. Wachimbaji madini na mabwawa ya uchimbaji madini wana chaguo la kuchimba moja kwa moja ili kukusanya ZEC iliyolindwa katika anwani ya z kwa chaguo-msingi.

Soma [Mwongozo wa Uchimbaji Madini](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) au jiunge na ukurasa wa Jukwaa la Jumuiya kwa [Wachimbaji wa Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Faragha

Kuendesha nodi kamili hukuruhusu kuthibitisha kwa uhuru miamala na vizuizi vyote kwenye mtandao Zcash.

Kuendesha nodi kamili huepuka hatari za faragha zinazohusiana na kutumia huduma za wahusika wengine kuthibitisha miamala kwa niaba yako.

Kutumia nodi yako mwenyewe pia huruhusu kuunganisha kwenye mtandao kupitia [Tor](https://zcash.github.io/zcash/user/tor.html).
Hii ina faida zaidi ya kuruhusu watumiaji wengine kuungana kwa faragha na anwani yako ya nodi .onion.

## Makosa ya Kawaida

- Kujenga zcashd kutoka kwa maagizo hapo juu na kutarajia nodi inayofanya kazi. Pacha hizo husimama kwenye urefu wa uondoaji.
- Kuendesha nodi na kudhani pochi yako ya simu sasa inaitumia. Pochi nyepesi huendelea kuzungumza na seva yoyote iliyosanidiwa nayo hadi uielekeze kwako mwenyewe. Tazama [Nodi za Lightwallet](/zcash-tech/lightwallet-nodes).
- Kukimbia pekee `zebrad` na kutarajia pochi nyepesi kuunganishwa. Nodi inahitaji kiashiria karibu nayo, iwe lightwalletd au [Zaino](/zcash-tech/zaino).
- Ninatafuta RPC za pochi kwenye nodi. Funguo na salio zimehamishiwa Zallet.

## Kurasa Zinazohusiana

- [Kifundo Kamili cha Zebra](/zcash-tech/zebra-full-node) - sakinisha, sanidi, na uendesha nodi iliyopendekezwa
- [Njia ya Zakura](/zcash-tech/zakura-node) - utekelezaji wa nodi ya pili, iliyotenganishwa na Zebra
- [Nodi za Lightwallet](/zcash-tech/lightwallet-nodes) - seva zinazowasha pochi
- [Zaino](/zcash-tech/zaino) - Kiashiria cha Rust kinachohudumia pochi nyepesi
- [Usawazishaji wa Pochi Zcash](/zcash-tech/zcash-wallet-syncing) - kwa nini usawazishaji hufanya kazi jinsi unavyofanya kazi

## Kujifunza Zaidi

Soma [Nyaraka za Usaidizi](https://zcash.readthedocs.io/en/latest/)

Jiunge nasi [Seva ya Discord](https://discord.gg/zcash) au tuwasiliane kwa [X](https://X.com/ZecHub)
