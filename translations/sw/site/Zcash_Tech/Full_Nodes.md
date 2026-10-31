<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Full Node

## Kwa Ufupi

- Full node huhifadhi nakala kamili ya blockchain ya Zcash na hukagua kila block na muamala [transaction] mpya dhidi ya kanuni za makubaliano [consensus].
- Zebra (`zebrad`) ndiyo node ya kusakinisha leo. Zakura ni utekelezaji wa pili, uliogawanywa kutoka Zebra.
- zcashd imestaafishwa. Kusimamishwa kwake kwa Mwisho wa Usaidizi kulifikiwa tarehe 18 Julai 2026 katika urefu wa block 3417100, na node hizo hazianzi tena.
- Node na pochi [wallet] sasa ni programu tofauti. [Zallet](https://github.com/zcash/zallet) huendeshwa dhidi ya node na hushikilia funguo.
- Kuendesha node yako mwenyewe hukupa uthibitishaji huru na huondoa hitaji la kuamini seva ya mtu mwingine.

## Maelezo ya Msingi

Full Node ni programu inayoendesha nakala kamili ya blockchain ya sarafu ya kidijitali, ikikupa ufikiaji wa vipengele vya itifaki.

Huhifadhi rekodi kamili ya kila muamala uliotokea tangu genesis na hivyo inaweza kuthibitisha uhalali wa miamala na block mpya zinazoongezwa kwenye blockchain.

## Utekelezaji wa Node

### Zebra

Zebra ni utekelezaji huru wa full node ulio tayari kwa uzalishaji wa itifaki ya Zcash, ulioundwa na Zcash Foundation na kuandikwa kwa Rust. Kwa kuwa zcashd imestaafishwa, Zebra (`zebrad`) ndiyo full node inayopendekezwa kwa utekelezaji mpya.

Zebra huthibitisha block na miamala, hushiriki katika mtandao wa rika-kwa-rika, na hutoa kiolesura cha RPC kwa programu. Pochi sasa ni sehemu tofauti: [Zallet](https://github.com/zcash/zallet) huendeshwa dhidi ya node ya Zebra na kushughulikia funguo na salio. Hii huchukua nafasi ya zcashd, ambayo iliunganisha node na pochi katika mchakato mmoja.

Ili kuhudumia pochi nyepesi za faragha [shielded light wallets], node huendeshwa pamoja na kiorodheshi, ama [lightwalletd](https://github.com/zcash/lightwalletd) kilichoanzishwa au [Zaino](https://zechub.wiki/zcash-tech/zaino) kipya zaidi.

Hakikisha unasoma kitabu cha Zebra kwa maelekezo ya usanidi, na ujiunge na seva ya R&D ya Discord kwa usaidizi.

[GitHub](https://github.com/ZcashFoundation/zebra/)

[Kitabu cha Zebra](https://zebra.zfnd.org)

Tazama [Zebra Full Node](/zcash-tech/zebra-full-node) kwa hatua za usakinishaji, usanidi, na mahitaji ya vifaa.

### Zakura

Zakura ni full node ya pili inayooana na makubaliano, iliyogawanywa kutoka Zebra na kutengenezwa na Valar Group pamoja na Project Tachyon. Inafuata kanuni zilezile za itifaki na huongeza usawazishaji wa haraka zaidi, upogoaji wa block, na safu ya uoanifu ya RPC ya zcashd. Tazama [Zakura Node](/zcash-tech/zakura-node).

### zcashd (imestaafishwa)

> **Dokezo [Note]:** zcashd imestaafishwa. Electric Coin Company [ilitangaza kuondolewa kwa matumizi](https://z.cash/support/zcashd-deprecation/), na kusimamishwa kiotomatiki kwa Mwisho wa Usaidizi kulifikiwa tarehe 18 Julai 2026 katika urefu wa block 3417100. Kila node ya zcashd 6.20.0 isiyobadilishwa ilisimama katika urefu huo na hukataa kuanza upya, na programu haitumii NU6.3. Tumia Zebra. Ikiwa unashikilia zcashd `wallet.dat`, fuata [Mwongozo wa Uhamaji: zcashd hadi zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet).

zcashd ulikuwa utekelezaji wa awali wa Full Node kwa Zcash, uliotengenezwa na kudumishwa na Electric Coin Company. Maelekezo ya uundaji hapa chini yamehifadhiwa kwa marejeleo na kwa waendeshaji wanaohama kutoka zcashd.

zcashd hutoa seti ya API kupitia kiolesura chake cha RPC. API hizi hutoa vitendaji vinavyoruhusu programu za nje kuingiliana na node.

[lightwalletd](https://github.com/zcash/lightwalletd) ni mfano wa programu inayotumia full node kuwawezesha wasanidi programu kujenga na kudumisha pochi nyepesi za faragha zinazofaa kwa simu bila kuhitaji kuingiliana moja kwa moja na zcashd.

[Orodha kamili ya amri za RPC zinazotumika](https://zcash.github.io/rpc/)

[Kitabu cha zcashd](https://zcash.github.io/zcash/)

#### Anzisha Node (Linux)

- Sakinisha Vitegemezi

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Nakili toleo jipya zaidi, fanya checkout, sanidi na unda:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sawazisha Blockchain (huenda ikachukua saa kadhaa)

    Ili kuanzisha node, endesha:

      ./src/zcashd

- Funguo Binafsi huhifadhiwa katika ~/.zcash/wallet.dat

[Mwongozo wa zcashd kwenye Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Athari za Kivitendo

### Mtandao

Kwa kuendesha full node, unasaidia kuimarisha mtandao wa zcash kwa kuunga mkono ugatuzi wake.

Hii husaidia kuzuia udhibiti wa kiadui na kuufanya mtandao uwe imara dhidi ya aina fulani za usumbufu.

Vianzio vya DNS hutoa orodha ya node nyingine za kuaminika kupitia seva iliyojengwa ndani. Hii huruhusu miamala kusambaa katika mtandao wote.

### Takwimu za Mtandao

Haya ni majukwaa ya mfano yanayoruhusu ufikiaji wa data ya Mtandao wa Zcash:

[Kivinjari cha Block cha Zcash](https://mainnet.zcashexplorer.app)

[Coin Metrics](https://docs.coinmetrics.io/info/assets/zec)

Unaweza pia kuchangia katika maendeleo ya mtandao kwa kuendesha majaribio au kupendekeza maboresho mapya na kutoa vipimo.

### Uchimbaji

Wachimbaji [miners] huhitaji full node ili kufikia RPC zote zinazohusiana na uchimbaji [mining] kama vile getblocktemplate na getmininginfo.

zcashd pia huwezesha uchimbaji hadi coinbase ya faragha. Wachimbaji na mabwawa ya uchimbaji wana chaguo la kuchimba moja kwa moja ili kukusanya ZEC za faragha katika z-address kwa chaguo-msingi.

Soma [Mwongozo wa Uchimbaji](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) au jiunge na ukurasa wa Jukwaa la Jamii kwa [Wachimbaji wa Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Faragha [Privacy]

Kuendesha full node hukuruhusu kuthibitisha kwa kujitegemea miamala na block zote kwenye mtandao wa Zcash.

Kuendesha full node huepuka baadhi ya hatari za faragha zinazohusishwa na kutumia huduma za watu wengine kuthibitisha miamala kwa niaba yako.

Kutumia node yako mwenyewe pia huruhusu kuunganisha kwenye mtandao kupitia [Tor](https://zcash.github.io/zcash/user/tor.html).
Hii ina faida ya ziada ya kuwaruhusu watumiaji wengine kuunganisha kwa faragha kwenye anwani ya .onion ya node yako.

## Makosa ya Kawaida

- Kujenga zcashd kwa kutumia maelekezo hapo juu na kutarajia node inayofanya kazi. Binarie hizo husimama katika urefu wa kuondolewa kwa matumizi.
- Kuendesha node na kudhani kwamba pochi yako ya simu sasa inaitumia. Pochi nyepesi huendelea kuwasiliana na seva yoyote iliyosanidiwa nayo hadi uielekeze kwenye yako mwenyewe. Tazama [Node za Lightwallet](/zcash-tech/lightwallet-nodes).
- Kuendesha `zebrad` pekee na kutarajia pochi nyepesi ziunganishwe. Node inahitaji kiorodheshi kando yake, ama lightwalletd au [Zaino](/zcash-tech/zaino).
- Kutafuta RPC za pochi kwenye node. Funguo na salio vilihamishiwa kwa Zallet.

## Kurasa Husika

- [Zebra Full Node](/zcash-tech/zebra-full-node) - sakinisha, sanidi, na endesha node inayopendekezwa
- [Zakura Node](/zcash-tech/zakura-node) - utekelezaji wa pili wa node, uliogawanywa kutoka Zebra
- [Node za Lightwallet](/zcash-tech/lightwallet-nodes) - seva ambazo pochi nyepesi huuliza
- [Zaino](/zcash-tech/zaino) - kiorodheshi cha Rust kinachohudumia pochi nyepesi
- [Usawazishaji wa Pochi wa Zcash](/zcash-tech/zcash-wallet-syncing) - kwa nini usawazishaji hufanya kazi jinsi unavyofanya

## Kujifunza Zaidi

Soma [Nyaraka za Usaidizi](https://zcash.readthedocs.io/en/latest/)

Jiunge na Seva yetu ya [Discord](https://discord.gg/zcash) au wasiliana nasi kwenye [X](https://X.com/ZecHub)
