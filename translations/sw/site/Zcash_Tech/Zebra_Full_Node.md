<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra Full Node

## Kwa Ufupi

- Zebra (`zebrad`) ni full node ya Zcash iliyoandikwa kwa Rust na kudumishwa na Zcash Foundation.
- Inathibitisha block na miamala [transactions], huhifadhi hali ya mnyororo [chain], na huwasiliana na node nyingine kupitia mtandao wa rika-kwa-rika.
- Zebra na zcashd zilitekeleza itifaki sawa na zingeweza kushirikiana. Tangu kusitishwa kwa zcashd, Zebra imebeba jukumu la makubaliano [consensus].
- Kuna njia mbili za kuiendesha: taswira ya `zfnd/zebra` Docker, au kuijenga kutoka msimbo chanzo.
- Vifaa vinavyopendekezwa ni kokwa 4 za CPU, RAM ya GB 16, na diski ya GB 300. Kiwango cha chini ni kokwa 2 na RAM ya GB 4, pamoja na diski hiyo hiyo ya GB 300.

## Maelezo ya Msingi

Zebra ni node ya kwanza ya Zcash iliyoandikwa kikamilifu kwa Rust. Inapatikana kwenye mtandao wa rika-kwa-rika wa Zcash, ambapo inathibitisha na kutangaza miamala na kuhifadhi hali ya blockchain. Kuwa na utekelezaji wa pili huru hufanya miundombinu ya mtandao itegemee kwa kiwango kidogo msimbo msingi wowote mmoja.

### Zebra na zcashd

Node ya awali ya Zcash, zcashd, ilitengenezwa na Electric Coin Company kutoka msimbo msingi wa Bitcoin. Zebra iliandikwa kutoka mwanzo kwa Rust, lugha salama kwa kumbukumbu, ikilenga usalama na ufanisi.

Utekelezaji wote wawili hufuata itifaki sawa, hivyo ungeweza kuwasiliana na kushirikiana. zcashd ilifikia kusitishwa kwake kwa Mwisho wa Usaidizi tarehe 18 Julai 2026 na haianzi tena, jambo linaloacha Zebra na Zakura kama utekelezaji wa node unaotumika. Tazama [Full Nodes](/zcash-tech/full-nodes) kwa mtazamo mpana zaidi.

## Kuendesha Zebra

Unaweza kuendesha Zebra kwa kutumia taswira ya Docker, au unaweza kuijenga mwenyewe. Tafadhali tazama sehemu ya Mahitaji ya Mfumo.

### Matumizi ya Docker

Ili kuendesha toleo jipya zaidi na kulisawazisha hadi kilele, tekeleza amri ifuatayo:

```

docker run zfnd/zebra:latest

```

Kwa maelekezo kamili, rejelea nyaraka za [Docker](https://zebra.zfnd.org/user/docker.html).

### Kujenga Zebra

Kujenga Zebra kunahitaji Rust, libclang, na kikusanyaji cha C++.

- Hakikisha una toleo thabiti la hivi karibuni la Rust lililosakinishwa, kwa kuwa Zebra hujaribiwa nalo pekee.
- Vitegemezi muhimu vya ujenzi ni pamoja na:
  - libclang (pia hujulikana kama libclang-dev au llvm-dev)
  - clang au kikusanyaji kingine cha C++ (kama g++ kwa majukwaa yote au Xcode kwa macOS)
  - protoc (kikusanyaji cha Protocol Buffers) chenye alama ya *--experimental_allow_proto3_optional*, iliyoanzishwa katika Protocol Buffers v3.12.0 (iliyotolewa tarehe 16 Mei 2020).

### Sakinisha na Anzisha

Kwenye Linux ya x86_64 au aarch64 yenye glibc 2.34 au toleo jipya zaidi (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), unaweza kuruka vitegemezi vya ujenzi na kusakinisha faili bainari iliyojengwa mapema na kutiwa sahihi:

```
cargo binstall zebrad
```

Faili bainari hizo hizo zimeambatishwa kwa kila toleo la GitHub kama `zebrad-<version>-<target>.tar.gz`, kila moja ikiwa na jumla hakiki ya SHA-256, uthibitisho wa asili ya ujenzi wa Sigstore na sahihi ya Cosign. Kwenye majukwaa ya zamani, tumia taswira ya Docker au jenga kutoka msimbo chanzo.

Ili kujenga kutoka msimbo chanzo, pata msimbo na ujenge faili bainari ya toleo:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Anzisha node kwa:

```
target/release/zebrad start
```

Mwongozo wa usakinishaji: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Mipangilio na Vipengele vya Hiari

### Kuanzisha Faili ya Usanidi

  - Tengeneza faili ya usanidi kwa kutumia amri:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - Faili ya *zebrad.toml* iliyotengenezwa itawekwa katika saraka chaguomsingi ya mapendeleo ya Linux. Kwa maeneo mbadala chaguomsingi ya OS, rejelea nyaraka.

### Kusanidi Pau za Maendeleo

  - Sanidi *tracing.progress_bar* katika *zebrad.toml* yako ili kuonyesha vipimo muhimu katika terminal kwa kutumia pau za maendeleo. Dokezo: Kuna tatizo linalojulikana ambapo makadirio ya pau za maendeleo yanaweza kuwa makubwa kupita kiasi.

### Kusanidi Uchimbaji

  - Zebra inaweza kusanidiwa kwa uchimbaji [mining] kwa kubainisha *MINER_ADDRESS* na ulinganishaji wa bandari katika Docker. Maelezo zaidi yanaweza kupatikana katika nyaraka za Usaidizi wa uchimbaji za [](https://zebra.zfnd.org/user/mining-docker.html).

### Vipengele Maalum vya Ujenzi

  - Panua utendaji wa Zebra kwa vipengele vya ziada vya Cargo kama vile vipimo vya Prometheus, ufuatiliaji wa Sentry, usaidizi wa majaribio wa Elasticsearch, na mengineyo.

  - Unganisha vipengele vingi kwa kuviorodhesha kama vigezo vya alama ya `--features` wakati wa usakinishaji.

  - Baadhi ya vipengele vya utatuzi wa hitilafu na ufuatiliaji vimezimwa katika miundo ya toleo ili kuboresha utendaji. Kwa orodha kamili ya vipengele vya majaribio na vya msanidi programu [developer], tazama nyaraka za API za [](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Mahitaji ya Mfumo na Usanidi wa Mtandao

### Mahitaji Yanayopendekezwa

- CPU: Kokwa 4 za CPU
- RAM: GB 16
- Nafasi ya Diski: GB 300 za nafasi ya diski inayopatikana kwa ajili ya kukusanya faili bainari na kuhifadhi hali ya mnyororo iliyohifadhiwa kwenye akiba
- Mtandao: Muunganisho wa mtandao wa Mbps 100 wenye kiwango cha chini cha GB 300 za upakiaji na upakuaji kwa mwezi

### Mahitaji ya Kiwango cha Chini

- CPU: Kokwa 2 za CPU
- RAM: GB 4
- Nafasi ya Diski: GB 300 za nafasi ya diski inayopatikana

Kifurushi cha majaribio cha Zebra kinaweza kuchukua zaidi ya saa moja kukamilika kulingana na vipimo vya kifaa chako. Mifumo yenye kasi ndogo inaweza kukusanya na kuendesha Zebra. Mipaka sahihi ya utendaji haijabainishwa kupitia majaribio.

### Mahitaji ya Diski

- Zebra hutumia takriban GB 300 kwa data ya Mainnet iliyohifadhiwa kwenye akiba na GB 10 kwa data ya Testnet iliyohifadhiwa kwenye akiba. Tarajia matumizi ya diski kuongezeka kadiri muda unavyopita.
- Hifadhidata husafishwa mara kwa mara, na pia wakati wa kuzimwa au kuanzishwa upya. Mabadiliko huwekwa kwa kutumia miamala ya hifadhidata. Mabadiliko yasiyokamilika yanayosababishwa na kusimamishwa kwa lazima au panic hurudishwa nyuma wakati ujao Zebra inapoanza.

### Mahitaji ya Mtandao na Bandari

- Zebra hutumia bandari zifuatazo za TCP kwa miunganisho ya ndani na ya nje:
  - 8233 kwa Mainnet
  - 18233 kwa Testnet
- Kusanidi Zebra kwa listen_addr mahususi hutangaza anwani hii kwa miunganisho ya ndani. Miunganisho ya nje inahitajika kwa usawazishaji; miunganisho ya ndani ni ya hiari.
- Ufikiaji wa vitafutaji vya DNS vya Zcash unahitajika kupitia kisuluhishi cha DNS cha OS (kwa kawaida bandari 53).
- Zebra inaweza kufanya miunganisho ya nje kwenye bandari yoyote. zcashd hupendelea rika kwenye bandari chaguomsingi ili kuepuka kutumiwa kwa mashambulizi ya DDoS kwenye mitandao mingine.

### Matumizi ya Kawaida ya Mtandao wa Mainnet

- Usawazishaji wa Awali: Upakuaji wa GB 300 unahitajika kwa usawazishaji wa awali, na kiasi hiki kinatarajiwa kuongezeka.
- Masasisho Yanayoendelea: Upakiaji na upakuaji wa kila siku kati ya MB 10 na GB 10, kulingana na ukubwa wa miamala ya mtumiaji na maombi ya rika.
- Zebra huanza usawazishaji wa awali katika kila mabadiliko ya toleo la hifadhidata ya ndani, jambo ambalo linaweza kumaanisha upakuaji kamili wa mnyororo wakati wa masasisho ya toleo.
- Rika zenye muda wa kusubiri wa safari ya kwenda na kurudi wa sekunde 2 au chini hupendelewa. Ikiwa muda wa kusubiri unazidi kizingiti hiki, fungua tiketi katika hazina ya Zebra.

## Makosa ya Kawaida

- Kupanga ukubwa wa diski kwa mahitaji ya leo. Hali ya Mainnet iliyohifadhiwa kwenye akiba tayari iko karibu GB 300 na inaendelea kukua.
- Kutarajia RPC za pochi [wallet] kutoka `zebrad`. Funguo na salio viko katika [Zallet](https://github.com/zcash/zallet), programu tofauti.
- Kuendesha `zebrad` peke yake na kutarajia pochi nyepesi ziunganishwe. Njia hiyo inahitaji kiashiria, ama lightwalletd au [Zaino](/zcash-tech/zaino).
- Kuchukulia usawazishaji upya usiotarajiwa kama hitilafu. Mabadiliko ya toleo la hifadhidata husababisha usawazishaji huo kimakusudi.

## Kurasa Zinazohusiana

- [Full Nodes](/zcash-tech/full-nodes) - kile ambacho full node hufanya na utekelezaji uliopo
- [Zakura Node](/zcash-tech/zakura-node) - node iliyotokana na Zebra yenye usawazishaji wa haraka na upunguzaji
- [Zaino](/zcash-tech/zaino) - kiashiria cha Rust kinachohudumia pochi nyepesi
- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) - seva ambazo pochi nyepesi huuliza
- [Mwongozo wa Uchimbaji wa Zcash ](/using-zcash/zcash-mining-guide) - uchimbaji dhidi ya node yako mwenyewe

## Kujifunza Zaidi

- [Kitabu cha Zebra](https://zebra.zfnd.org)
- [Zebra kwenye GitHub](https://github.com/ZcashFoundation/zebra/)
- [Mahitaji ya Mfumo](https://zebra.zfnd.org/user/requirements.html)
