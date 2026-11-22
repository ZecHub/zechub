# Zinder Kielezo

Zinder ni kielezo kinachoendeshwa na mwenyeji mwenyewe cha Zcash, kilichoandikwa kwa Rust na kuchapishwa na Zcash Foundation. Husoma mnyororo mara moja kutoka kwa full node ya Zebra au Zakura, huhifadhi mwonekano mmoja thabiti wa mnyororo huo, na kuutoa kwa pochi, programu na vichunguzi kadhaa kwa wakati mmoja. Pochi nyepesi zilizopo zinaweza kukifikia kupitia adapta inayooana na lightwalletd.

> **Zinder bado iko katika hatua ya alpha.** README yake inasema kuwa API asilia, kiolesura cha uoanifu cha lightwalletd, miundo ya hifadhi na usanifu wa uwekaji vitabadilika, na kwamba toleo lenye lebo si ahadi ya uthabiti. Tumia matoleo mahususi na utarajie masasisho yanayoweza kuvunja uoanifu.

## Kwa ufupi

* **Zebra** au **Zakura** huthibitisha mnyororo. **Zinder** huelekeza data ambayo node inayo na kuitoa kwa wateja.
* Kuna njia mbili za kuunganisha: API ya gRPC ya Zinder ya `WalletQuery`, na adapta tofauti inayotumia itifaki ya `CompactTxStreamer` ya lightwalletd, ili pochi zilizoundwa kwa ajili ya lightwalletd ziweze kuunganishwa nayo bila kubadilisha msimbo.
* Kila usomaji hufungwa kwenye hali moja ya mnyororo (“epoch”), ili kundi la usawazishaji lisichanganye data kutoka ncha mbili shindani za mnyororo. Funguo na uchanganuzi wa miamala ya faragha hubaki kwenye pochi.
* Imeundwa kwa ajili ya opereta mmoja anayeendesha node moja na kuhudumia watumiaji wengi. Weka vituo vya ufikiaji vya umma nyuma ya TLS, uthibitishaji na vikomo vya kasi unavyodhibiti mwenyewe.
* Matoleo hutoka kwa kasi (0.7.0 hadi 0.12.0 kati ya Novemba 10 na 14, 2026), na kadhaa kati yake yalivunja uoanifu. Soma kumbukumbu ya mabadiliko kabla ya kila sasisho.

## Zinder inafaa wapi

Pochi nyepesi hazungumzi na full node moja kwa moja. Huomba kielezo kwa block fupi, hali za miti na data ya miamala (tazama [Nodi za Pochi Nyepesi](/zcash-tech/lightwallet-nodes)). Sasa mfumo ikolojia wa Zcash una vielezo kadhaa vinavyoweza kufanya hivyo:

| Kielezo | Lugha | Msimamizi | Huunganishwa na | Maelezo |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | Jumuiya ya ECC / Zcash | Zebra au zcashd | Seva ya awali ya pochi nyepesi |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra au zcashd | Wasifu wa kielezo wa hiari katika mfumo wa Z3 |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | Node ya Zakura iliyopachikwa | Tazama kipimo cha utendaji cha [Zaino dhidi ya Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 au Zakura 1.8.6 (node ya kumbukumbu yote) | Alpha. API asilia pamoja na adapta ya lightwalletd na usomaji wa hiari wa kichunguzi |

Nyaraka za Zinder zinaeleza wazi wakati inapofaa kuchagua: huwa bora zaidi pale ufikiaji wa mnyororo unapohitajika kuendelea hata baada ya mchakato mmoja wa pochi kusimama, kuhudumia watumiaji kadhaa huru, au kubaki tofauti na msimbo wa pochi yoyote. Kwa pochi moja iliyounganishwa kwa karibu, kielezo kilichopachikwa kinaweza kuwa rahisi zaidi; na mtumiaji anayehitaji tu data ambayo node tayari inayo anaweza kutumia RPC ya Zebra moja kwa moja.

## Jinsi ilivyojengwa

Zinder hugawanya kazi katika michakato tofauti, kila mmoja ukiwa na jukumu moja:

| Mchakato | Jukumu |
|:--|:--|
| `zinder-ingest` | Mwandishi pekee wa hifadhi rasmi ya mnyororo (RocksDB). Hufuata node, hushughulikia mabadiliko ya mnyororo, na huhifadhi hali ya mempool ya moja kwa moja |
| `zinder-projector` | Mwandishi pekee wa hifadhi ya pochi. Huunda na kufuata mwonekano wa mnyororo ulioundwa kwa ajili ya pochi |
| `zinder-query` | Hutoa API ya asili ya gRPC ya `WalletQuery` |
| `zinder-compat-lightwalletd` | Hutoa API ya `CompactTxStreamer` ya lightwalletd kwa kutumia data hiyohiyo |

Sehemu ya kichunguzi ya hiari (`zinder-explorer` yenye `ExplorerQuery`) hutoa muhtasari wa block, maelezo ya miamala, mionekano ya mempool na utafutaji; na adapta ya hiari hutoa API za REST na WebSocket za kichunguzi cha CipherScan. Hakuna kati ya hivi kilicho kwenye picha za toleo.

Kila mchakato hutoa `/healthz`, `/readyz` na `/metrics`. Wasomaji huripoti kuwa tayari tu pale nakala zao za hifadhi ya mnyororo na hifadhi ya pochi zinapoelekeza kwenye hali ileile kabisa ya mnyororo.

## Njia za kuunganisha

* **Pochi nyepesi zilizopo** huhifadhi muunganisho wao wa lightwalletd na kuuelekeza kwenye `zinder-compat-lightwalletd`. Nyaraka za Zinder hutofautisha uoanifu wa itifaki na usaidizi: pochi iliyotajwa huhesabiwa kuwa inaungwa mkono tu baada ya toleo lake la sasa kufaulu uthibitishaji wa mwisho hadi mwisho. Toleo la 0.10.0 lilirekebisha sehemu ya toleo la itifaki ya `GetLightdInfo` ili Zingo iweze kusawazisha.
* **Wateja asilia** hutumia `zinder-query` kwa usomaji uliofungwa kwenye hali maalumu, block fupi, mitiririko ya matukio ya mnyororo na mempool, pamoja na matokeo ya utangazaji yaliyo na sababu mahususi za kukataliwa.
* **Programu za Rust** hutumia kifurushi cha `zinder-client`, SDK inayotanguliza muunganisho wa mbali na kuunganisha kwenye `zinder-query` bila kuunganisha mkusanyiko wa hifadhi.
* **Vichunguzi na mifumo ya nyuma** huchanganya usomaji wa pochi na sehemu ya hiari ya `ExplorerQuery`.

## Kuiendesha

Mwongozo wa haraka wa mradi huanza kwa kuwasha node kwa kutumia [mfumo wa Z3](/zcash-tech/z3-stack), kisha Zinder kwa Docker Compose kutoka kwenye nakala ya Zinder:

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

Faili za mazingira za Mainnet na za node ya Zakura (`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`) ziko pembeni yake. Tangu 0.11.0, faili ya Compose haidhanii tena matumizi ya Z3: faili ya mazingira lazima itaje mtandao wa node, ujazo wa cookie na anwani ya RPC.

Lango-msingi za mwenyeji (Testnet huongeza 10000):

| Huduma | Mainnet | Testnet |
|:--|:--|:--|
| gRPC ya asili ya `WalletQuery` | 9102 | 19102 |
| gRPC inayoendana na lightwalletd | 9067 | 19067 |
| Utayari: ingest / projector / query / compat | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

Lango zote mbili za pochi hufungamanishwa na loopback. Zikague kwa kutumia:

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

Njia nyingine za uwekaji:

* **Picha za toleo** kwenye `ghcr.io/zcashfoundation/`: michakato minne, pamoja na `zinder-wallet-serving` (ingest, projector na native query katika kontena moja kwa wenyeji wanaoweza kuunganisha ujazo mmoja kwenye kontena moja; bila adapta ya lightwalletd) na `zinder-canonical-runtime` (ingest pekee).
* **Bainari za Linux** za x86-64 (zinahitaji CPU ya x86-64-v3) na AArch64, zikiwa na glibc 2.34 au mpya zaidi. Debian 12 ndiyo msingi uliothibitishwa. Kila toleo huja na SBOM na uthibitisho wa chanzo uliotiwa saini wa SLSA.

### Node inapaswa kutoa nini

* Node ya **kumbukumbu yote**. Tangu 0.11.0, `zinder-ingest` hukataa kuanza ikiwa imeunganishwa na node iliyopunguzwa.
* Zebra **7.0.0** au Zakura **1.8.6**. Haya ndiyo matoleo mawili ya node yanayothibitishwa na njia za toleo.
* Kwa picha ya `zinder-wallet-serving`, **mwisho wa gRPC wa kielezo** wa node (`ZINDER_NODE__INDEXER_GRPC_ADDR`, `indexer_listen_addr` ya Zebra, lango 8155 kwenye Mainnet). Kielezo cha Zakura kwenye anwani isiyo ya loopback kinahitaji TLS ya pande zote, ambayo Zinder imekuwa ikiunga mkono tangu 0.11.0.

### Mahitaji ya Mainnet

Kutoka kwenye mwongozo wa kuendesha huduma ya pochi:

* Angalau **8 GB za kumbukumbu**. Kilele kilichopimwa: ingest takriban 2.6 GiB, projector takriban 2.7 GiB wakati wa ujenzi, na query hadi takriban 1.4 GiB.
* Hakikisha kuna takriban **130 GB za nafasi ya bure** kwenye ujazo wakati hifadhi ya pochi ya Mainnet inajengwa.
* Ujenzi mmoja wa Mainnet uliopimwa kutoka genesis ulichukua takriban **saa nne** kwa hifadhi ya mnyororo (eneo la muda lilikuwa karibu GB 310) na **zaidi ya saa mbili** kwa hifadhi ya pochi. Muda wa mwisho wa ujenzi uliojumuishwa unatosha kwa Testnet pekee: uongeze hadi angalau saa 24 na saa 12 kwa Mainnet, la sivyo ujenzi utaanza upya na hautakamilika kamwe.

## Maelezo ya matoleo ya kuzingatia

| Toleo | Tarehe | Mabadiliko kwa waendeshaji |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | Kipindi-msingi cha mabadiliko ya mnyororo kimeongezwa hadi block 1000, kina cha mwisho wa block kwa Zebra 7 na Zakura. Mabadiliko haya hayawezi kutenduliwa: matoleo ya zamani hayawezi kufungua hifadhi zilizoongezwa |
| 0.9.0 | 2026-11-12 | Picha mpya za `zinder-wallet-serving` na `zinder-canonical-runtime` |
| 0.10.0 | 2026-11-13 | **Toleo la kwanza linalosoma block za NU7.** Toleo la 0.9.0 na la zamani husimama kwenye block ya kwanza ya NU7. Marekebisho ya 8 ya itifaki asilia: sasisha ingest na query pamoja, na wateja asilia pia |
| 0.11.1 | 2026-11-14 | Zakura 1.8.6 imethibitishwa pamoja na Zebra 7.0.0; TLS ya pande zote kwa node ya kielezo; node zilizopunguzwa hukataliwa. Toleo la 0.11.0 lilichapishwa kama vifurushi vya crates pekee, kwa hiyo tumia 0.11.1 |
| 0.12.0 | 2026-11-14 | Marekebisho ya utayari na kuzima; uchakataji upya wa kichunguzi umeharakishwa na husitishwa nafasi ya diski inapopungua |

## Makosa ya Kawaida

**Kuchukulia kuwa ni programu iliyo tayari kwa uzalishaji.** Mradi wenyewe unasema uko katika hatua ya alpha. Kwa maneno yake, “kuwasha Compose kwenye kompyuta ya ndani na kuona kuwa kila kitu kiko sawa hakumaanishi peke yake kuwa imeidhinishwa kwa uzalishaji”.

**Kukiunganisha na node iliyopunguzwa.** Ingest husimama wakati wa kuwasha. Tumia node ya Zebra au Zakura yenye kumbukumbu yote.

**Kufungua milango ya gRPC moja kwa moja.** Lango zote mbili za pochi hufungamanishwa na loopback kwa sababu maalumu. Weka TLS, uthibitishaji, vikomo vya kasi na viwango vya matumizi kwenye proksi unayodhibiti kabla ya kuzifungua kwa intaneti.

**Kusasisha mchakato mmoja baada ya mwingine.** Matoleo kadhaa hubadilisha marekebisho ya itifaki asilia au muundo wa hifadhi. Sasisha huduma za Zinder pamoja, na usasishe wateja asilia katika mabadiliko hayohayo.

**Kudhani pochi inaungwa mkono kwa sababu itifaki inaungwa mkono.** Adapta ya lightwalletd hutumia itifaki hiyo, lakini Zinder hudai tu kuwa inaunga mkono pochi iliyotajwa baada ya toleo la sasa la pochi hiyo kuthibitishwa kuanzia mwanzo hadi mwisho.

## Kurasa zinazohusiana

* [Nodi za Pochi Nyepesi](/zcash-tech/lightwallet-nodes) — kazi ya seva ya pochi nyepesi na data inayoweza kuona
* [Zaino](/zcash-tech/zaino) — kielezo cha Zingo Labs cha Rust
* [Kipimo cha Utendaji cha Kielezo: Zaino dhidi ya Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Mfumo wa Z3](/zcash-tech/z3-stack) — Zebra + Zallet, usanidi wa node unaotumiwa na mwongozo wa haraka wa Zinder
* [Zebra Full Node](/zcash-tech/zebra-full-node) na [Zakura Node](/zcash-tech/zakura-node) — node mbili zinazothibitishwa na Zinder

## Ninaweza kujifunza zaidi wapi?

* Hifadhi ya [Zinder ya GitHub](https://github.com/ZcashFoundation/zinder)
* Matoleo ya [Zinder](https://github.com/ZcashFoundation/zinder/releases) na [kumbukumbu ya mabadiliko](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [Zinder ni nini na si nini](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* [Kuweka kwenye VM](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) na miongozo ya kuendesha [picha ya huduma ya pochi](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md)

**Ilisasishwa mwisho:** Novemba 2026
