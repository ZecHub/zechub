<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kifundo Kamili cha Zebra

## TL;DR

- Zebra (`zebrad`) ni nodi kamili Zcash iliyoandikwa katika Rust na kudumishwa na Zcash Foundation.
- Inathibitisha vizuizi na miamala, huweka hali ya mnyororo, na huzungumza na nodi zingine kupitia mtandao wa rika-kwa-rika.
- Zebra na zcashd walitekeleza itifaki hiyo hiyo na wangeweza kushirikiana. Tangu zcashd ilipostaafu, Zebra ina jukumu la makubaliano.
- Njia mbili za kuiendesha: `zfnd/zebra` Picha ya Docker, au muundo kutoka chanzo.
- Vifaa vinavyopendekezwa ni viini 4 vya CPU, RAM ya GB 16, na diski ya GB 300. Kiwango cha chini ni viini 2 na RAM ya GB 4, pamoja na diski ya GB 300 sawa.

## Maelezo ya Msingi

Zebra ni nodi ya kwanza Zcash iliyoandikwa kikamilifu katika Rust. Inapatikana kwenye mtandao wa Zcash wa rika-kwa-rika, ambapo inathibitisha na kutangaza miamala na kudumisha hali ya blockchain. Kuwa na utekelezaji wa pili huru huacha miundombinu ya mtandao ikiwa haitegemei sana msimbo wowote mmoja.

### Zebra na zcashd

Nodi asilia Zcash, zcashd, ilitengenezwa na Electric Coin Company kutoka kwa msimbo wa Bitcoin. Zebra iliandikwa kuanzia mwanzo katika Rust, lugha salama kwa kumbukumbu, ikilenga usalama na ufanisi.

Utekelezaji wote wawili hufuata itifaki ile ile, ili waweze kuwasiliana na kushirikiana. zcashd ilifikia kikomo chake cha Mwisho wa Usaidizi mnamo 18 Julai 2026 na haianzi tena, jambo ambalo linaacha Zebra na Zakura kama utekelezaji wa nodi unaotumika. Tazama [Nodi Kamili](/zcash-tech/full-nodes) kwa picha pana zaidi.

## Zebra Anayekimbia

Unaweza kuendesha Zebra kwa kutumia picha ya Docker, au unaweza kuijenga mwenyewe. Tafadhali tazama sehemu ya Mahitaji ya Mfumo.

### Matumizi ya Docker

Ili kuendesha toleo jipya zaidi na kulisawazisha kwa ncha, tekeleza amri ifuatayo:

```

docker run zfnd/zebra:latest

```

Kwa maelekezo kamili, rejelea [Nyaraka za Docker](https://zebra.zfnd.org/user/docker.html).

### Kujenga Zebra

Kujenga Zebra kunahitaji Rust, libclang, na kikusanyaji cha C++.

- Hakikisha una toleo jipya zaidi la Rust thabiti lililosakinishwa, kwani Zebra hujaribiwa nayo pekee.
- Vigezo muhimu vya ujenzi ni pamoja na:
  - libclang (pia inajulikana kama libclang-dev au llvm-dev)
  - clang au mkusanyiko mwingine wa C++ (kama vile g++ kwa mifumo yote au Xcode kwa macOS)
  - itifaki (kikusanyaji cha Protocol Buffers) chenye bendera ya *--experimental_allow_proto3_optional*, iliyoletwa katika Protocol Buffers v3.12.0 (iliyotolewa Mei 16, 2020).

### Sakinisha na Anza

Kwenye x86_64 au aarch64 Linux yenye glibc 2.34 au mpya zaidi (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), unaweza kuruka utegemezi wa ujenzi na kusakinisha jozi iliyosainiwa iliyojengwa tayari:

```
cargo binstall zebrad
```

Vijisehemu hivyo hivyo vimeunganishwa kwenye kila toleo GitHub kama `zebrad-<version>-<target>.tar.gz`, kila moja ikiwa na cheki za SHA-256, uthibitisho wa uundaji wa Sigstore na sahihi ya Cosign. Kwenye mifumo ya zamani, tumia picha ya Docker au jenga kutoka chanzo.

Ili kujenga kutoka chanzo, pata msimbo na ujenge toleo la binary:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Anza nodi na:

```
target/release/zebrad start
```

Mwongozo wa usakinishaji: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Mipangilio na Vipengele vya Hiari

### Inaanzisha Faili ya Usanidi

  - Tengeneza faili ya usanidi kwa kutumia amri:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - *zebrad.toml* iliyotengenezwa itawekwa kwenye saraka ya mapendeleo chaguo-msingi ya Linux. Kwa maeneo mbadala chaguo-msingi ya Mfumo wa Uendeshaji, rejelea hati.

### Kusanidi Baa za Maendeleo

  - Sanidi *tracing.progress_bar* katika *zebrad.toml* yako ili kuonyesha vipimo muhimu katika sehemu ya mwisho kwa kutumia upau wa maendeleo. Kumbuka: Kuna tatizo linalojulikana ambapo makadirio ya upau wa maendeleo yanaweza kuwa makubwa sana.

### Kusanidi Uchimbaji Madini

  - Zebra inaweza kusanidiwa kwa ajili ya uchimbaji madini kwa kubainisha *MINER_ADDRESS* na ramani ya lango katika Docker. Maelezo zaidi yanaweza kupatikana katika [Nyaraka za usaidizi wa uchimbaji madini](https://zebra.zfnd.org/user/mining-docker.html).

### Vipengele Maalum vya Uundaji

  - Panua utendaji Zebra's kwa kutumia vipengele vya ziada vya Cargo kama vile vipimo vya Prometheus, ufuatiliaji wa Sentry, usaidizi wa majaribio wa Elasticsearch, na zaidi.

  - Unganisha vipengele vingi kwa kuviorodhesha kama vigezo vya `--features` bendera wakati wa usakinishaji.

  - Baadhi ya vipengele vya utatuzi na ufuatiliaji vimezimwa katika miundo ya kutolewa ili kuboresha utendaji. Kwa orodha kamili ya vipengele vya majaribio na vya msanidi programu, wasiliana na [Nyaraka za API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Mahitaji ya Mfumo na Usanidi wa Mtandao

### Mahitaji Yanayopendekezwa

- CPU: Viini 4 vya CPU
- RAM: GB 16
- Nafasi ya Diski: Nafasi ya diski ya GB 300 inapatikana kwa ajili ya kukusanya jozi na kuhifadhi hali ya mnyororo uliohifadhiwa
- Mtandao: Muunganisho wa mtandao wa 100 Mbps wenye angalau upakiaji na upakuaji wa 300 GB kwa mwezi

### Mahitaji ya Chini

- CPU: Viini 2 vya CPU
- RAM: GB 4
- Nafasi ya Diski: GB 300 ya nafasi ya diski inayopatikana

Seti ya majaribio Zebra's inaweza kuchukua zaidi ya saa moja kukamilika kulingana na vipimo vya mashine yako. Mifumo ya polepole inaweza kukusanya na kuendesha Zebra. Mipaka sahihi ya utendaji haijawekwa kupitia majaribio.

### Mahitaji ya Diski

- Zebra hutumia takriban GB 300 kwa data ya Mainnet iliyohifadhiwa na GB 10 kwa data ya Testnet iliyohifadhiwa. Tarajia matumizi ya diski kuongezeka baada ya muda.
- Hifadhidata husafishwa mara kwa mara, na pia wakati wa kuzima au kuanzisha upya. Mabadiliko hufanywa kwa kutumia miamala ya hifadhidata. Mabadiliko ambayo hayajakamilika yanayosababishwa na kusitishwa kwa kulazimishwa au hofu hurejeshwa nyuma wakati mwingine Zebra inapoanza.

### Mahitaji na Milango ya Mtandao

- Zebra hutumia milango ifuatayo ya TCP kwa miunganisho inayoingia na inayotoka:
  - 8233 kwa Mainnet
  - 18233 kwa ajili ya Testnet
- Kusanidi Zebra kwa kutumia listen_addr maalum hutangaza anwani hii kwa miunganisho inayoingia. Miunganisho inayotoka inahitajika kwa ajili ya usawazishaji; miunganisho inayoingia ni ya hiari.
- Ufikiaji wa vipandizi vya DNS Zcash ni muhimu kupitia kitatuzi cha DNS cha OS (kawaida huwekwa kwenye lango 53).
- Zebra inaweza kutengeneza miunganisho ya nje kwenye mlango wowote. zcashd hupendelea rika kwenye milango chaguo-msingi ili kuepuka kutumika kwa mashambulizi ya DDoS kwenye mitandao mingine.

### Matumizi ya Kawaida ya Mtandao wa Mainnet

- Usawazishaji wa Awali: upakuaji wa GB 300 unahitajika kwa usawazishaji wa awali, na takwimu hii inatarajiwa kuongezeka.
- Masasisho Yanayoendelea: upakiaji na upakuaji wa kila siku kuanzia 10 MB hadi 10 GB, kulingana na ukubwa wa miamala ya mtumiaji na maombi ya wenzao.
- Zebra huanza usawazishaji wa awali kwenye kila mabadiliko ya toleo la ndani la hifadhidata, ambayo inaweza kumaanisha upakuaji kamili wa mnyororo wakati wa uboreshaji wa toleo.
- Wenzako walio na muda wa kurudi nyuma wa sekunde 2 au chini ya hapo wanapendelewa. Ikiwa muda wa kurudi nyuma unazidi kizingiti hiki, fungua tiketi katika hazina Zebra.

## Makosa ya Kawaida

- Kupima ukubwa wa diski kwa leo. Hali ya Mainnet iliyohifadhiwa tayari iko karibu GB 300 na inaendelea kukua.
- Natarajia RPC za pochi kutoka `zebrad`Funguo na mizani huishi ndani [Zallet](https://github.com/zcash/zallet), programu tofauti.
- Kukimbia `zebrad` peke yangu na kutarajia pochi nyepesi kuunganishwa. Njia hiyo inahitaji kiashiria, iwe lightwalletd au [Zaino](/zcash-tech/zaino).
- Kushughulikia kusawazisha tena bila kutarajiwa kama hitilafu. Mabadiliko ya toleo la hifadhidata husababisha moja kwa muundo.

## Kurasa Zinazohusiana

- [Nodi Kamili](/zcash-tech/full-nodes) - nodi kamili hufanya nini na ni utekelezaji gani uliopo
- [Njia ya Zakura](/zcash-tech/zakura-node) - nodi iliyotenganishwa kutoka kwa Zebra yenye usawazishaji na upogoaji wa haraka zaidi
- [Zaino](/zcash-tech/zaino) - Kiashiria cha Rust kinachohudumia pochi nyepesi
- [Nodi za Lightwallet](/zcash-tech/lightwallet-nodes) - swala la pochi nyepesi za seva
- [Mwongozo wa Uchimbaji wa Zcash](/using-zcash/zcash-mining-guide) - uchimbaji dhidi ya nodi yako mwenyewe

## Kujifunza Zaidi

- [Kitabu cha Zebra](https://zebra.zfnd.org)
- [Zebra kwenye GitHub](https://github.com/ZcashFoundation/zebra/)
- [Mahitaji ya Mfumo](https://zebra.zfnd.org/user/requirements.html)
