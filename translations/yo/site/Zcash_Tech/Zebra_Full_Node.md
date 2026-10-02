<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kún Node Àmì Zebra

## TL;DR

- Zebra (`zebrad`) ni ojú-ìwé Zcash tí a kọ ní Rust tí Zcash Foundation.
- Ó ń fọwọ́ sí àwọn ìdènà àti ìṣòwò, ó ń pa ipò ẹ̀wọ̀n mọ́, ó sì ń bá àwọn nódù mìíràn sọ̀rọ̀ lórí nẹ́tíwọ́ọ̀kì ẹgbẹ́-sí-ẹgbẹ́.
- Zebra àti zcashd lo ìlànà kan náà, wọ́n sì lè ṣiṣẹ́ pọ̀. Láti ìgbà tí wọ́n ti fẹ̀yìntì zcashd, Zebra ni ó ń ṣe ipa ìfohùnṣọ̀kan.
- Awọn ọna meji lati ṣiṣe rẹ: `zfnd/zebra` Àwòrán Docker, tàbí ìkọ́lé láti orísun.
- Ohun èlò tí a gbani nímọ̀ràn ni àwọn kọ́ọ̀bù CPU mẹ́rin, RAM 16 GB, àti 300 GB ti dììsì. Ó kéré jù kí ó jẹ́ kọ́ọ̀bù méjì àti RAM 4 GB, pẹ̀lú 300 GB ti dììsì kan náà.

## Àlàyé Pàtàkì

Zebra ni node Zcash àkọ́kọ́ tí a kọ ní Rust pátápátá. Ó wà lórí nẹ́tíwọ́ọ̀kì Zcash peer-to-peer, níbi tí ó ti ń fìdí àwọn ìṣòwò múlẹ̀ àti gbéjáde, tí ó sì ń pa ipò blockchain mọ́. Níní ìgbékalẹ̀ aláìdádúró kejì mú kí ètò ìṣiṣẹ́ nẹ́tíwọ́ọ̀kì náà má gbára lé èyíkéyìí kódì kan ṣoṣo.

### Zebra ati zcashd

Ilé- Electric Coin Company ló ṣe àgbékalẹ̀ Zcash node àkọ́kọ́, zcashd, láti inú kódì Bitcoin. A kọ Zebra láti ìbẹ̀rẹ̀ pẹ̀lú Rust, èdè tí ó ṣeé fi ìrántí pamọ́, pẹ̀lú àfiyèsí lórí ààbò àti ìṣedéédé.

Àwọn ìṣe méjèèjì tẹ̀lé ìlànà kan náà, kí wọ́n lè bá ara wọn sọ̀rọ̀ kí wọ́n sì bá ara wọn ṣiṣẹ́ pọ̀. zcashd dé ìdádúró End-of-Support rẹ̀ ní ọjọ́ kejìdínlógún oṣù keje ọdún 2026, kò sì tún bẹ̀rẹ̀ mọ́, èyí tí ó fi Zebra àti Zakura sílẹ̀ gẹ́gẹ́ bí àwọn ìṣe nódù tí a ń lò. Wo [Àwọn Nódù Kíkún](/zcash-tech/full-nodes) fún àwòrán tó gbòòrò.

## Zebra tí ń sáré

O le lo aworan Docker lati ṣiṣẹ Zebra, tabi o le kọ ọ pẹlu ọwọ. Jọwọ wo apakan Awọn ibeere Eto.

### Lilo Docker

Láti ṣiṣẹ́ ìtújáde tuntun àti láti mú un ṣiṣẹpọ mọ́ ìparí, ṣe àṣẹ wọ̀nyí:

```

docker run zfnd/zebra:latest

```

Fun awọn itọnisọna kikun, wo [Àwọn ìwé Docker](https://zebra.zfnd.org/user/docker.html).

### Kíkọ́ Zebra

Kíkọ́ Zebra nílò Rust, libclang, àti C++ compiler.

- Rí i dájú pé o ti fi ẹ̀rọ Rust tuntun tó dúró ṣinṣin sí i, nítorí pé a fi dán Zebra wò nìkan.
- Awọn igbẹkẹle ikole pataki pẹlu:
  - libclang (tí a tún mọ̀ sí libclang-dev tàbí llvm-dev)
  - clang tàbí ẹ̀rọ ìṣàkójọpọ̀ C++ mìíràn (bíi g++ fún gbogbo àwọn ìpèsè tàbí Xcode fún macOS)
  - protoc (Protocol Buffers compiler) pẹ̀lú àsíá *--experimental_allow_proto3_optional*, tí a ṣe àgbékalẹ̀ rẹ̀ nínú Protocol Buffers v3.12.0 (tí a tú jáde ní May 16, 2020).

### Fi sori ẹrọ ati Bẹrẹ

Lórí x86_64 tàbí aarch64 Linux pẹ̀lú glibc 2.34 tàbí tuntun (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), o le fo àwọn ìgbẹ́kẹ̀lé ìkọ́lé kí o sì fi binary tí a ti kọ tẹ́lẹ̀ sílẹ̀:

```
cargo binstall zebrad
```

Àwọn oní-ẹ̀rọ-ìdámọ̀ kan náà ni a so mọ́ gbogbo ìtújáde GitHub gẹ́gẹ́ bí `zebrad-<version>-<target>.tar.gz`, ọ̀kọ̀ọ̀kan pẹ̀lú àyẹ̀wò SHA-256, ẹ̀rí ìkọ́lé Sigstore àti ìfọwọ́sowọ́pọ̀ Cosign. Lórí àwọn ìkànnì àtijọ́, lo àwòrán Docker tàbí kọ́ láti orísun.

Láti kọ́ láti orísun, gba kóòdù náà kí o sì kọ́ ìtújáde onípele méjì:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Bẹ̀rẹ̀ nódù náà pẹ̀lú:

```
target/release/zebrad start
```

Itọsọna fifi sori ẹrọ: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Àwọn Ìṣètò Àṣàyàn àti Àwọn Ẹ̀yà Ara

### Bíbẹ̀rẹ̀ Fáìlì Ìṣètò

  - Ṣẹda faili iṣeto kan nipa lilo aṣẹ naa:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - A ó gbé *zebrad.toml* tí a ṣẹ̀dá sínú ìwé àkójọ àwọn ìfẹ́ràn àìyípadà ti Linux. Fún àwọn ibi àyípadà OS míràn, wo ìwé àkójọ náà.

### Ṣíṣeto Àwọn Páàsì Ìlọsíwájú

  - Ṣètò *tracing.progress_bar* nínú *zebrad.toml* rẹ láti fi àwọn ìwọ̀n pàtàkì hàn nínú terminaalka nípa lílo àwọn ọ̀pá ìlọsíwájú. Àkíyèsí: Ìṣòro kan wà tí a mọ̀ níbi tí ìṣirò ọ̀pá ìlọsíwájú lè pọ̀ sí i.

### Ṣíṣeto Iwakusa

  - A le ṣe àtúnṣe Zebra fún iwakusa nípa ṣíṣe àpèjúwe *MINER_ADDRESS* àti àwòrán ibudo ní Docker. Àwọn àlàyé síi wà nínú [Àwọn ìwé àtìlẹ́yìn ìwakùsà](https://zebra.zfnd.org/user/mining-docker.html).

### Àwọn Ẹ̀yà Ìkọ́lé Àṣà

  - Mú kí iṣẹ́ Zebra's pọ̀ sí i pẹ̀lú àwọn ẹ̀yà ara Cargo afikún bíi Prometheus metrics, Sentry monitoring, àtìlẹ́yìn Elasticsearch àdánwò, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ.

  - Darapọ awọn ẹya ara ẹrọ pupọ nipa kikojọ wọn gẹgẹbi awọn paramita ti `--features` àsíá nígbà tí a bá ń fi sori ẹ̀rọ.

  - Àwọn ẹ̀yà àṣìṣe àti ìṣàyẹ̀wò kan wà tí a ti parẹ́ nínú àwọn ìkọ́lé ìtújáde láti mú kí iṣẹ́ wọn sunwọ̀n síi. Fún àkójọ gbogbo àwọn ẹ̀yà ìdánwò àti olùgbékalẹ̀, wo àkójọpọ̀ wọn [Àwọn ìwé API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Awọn ibeere Eto ati Iṣeto Nẹtiwọọki

### Awọn ibeere ti a ṣeduro

- CPU: Awọn kooro CPU mẹrin
- Ramu: 16 GB
- Ààyè Díìsìkì: 300 GB ààyè díìsìkì tó wà fún ṣíṣàkójọ àwọn onípele méjì àti fífipamọ́ ipò ẹ̀wọ̀n tí a fipamọ́
- Nẹ́tíwọ́ọ̀kì: Ìsopọ̀ nẹ́tíwọ́ọ̀kì 100 Mbps pẹ̀lú o kere ju 300 GB àwọn ìgbésókè àti ìgbàsókè fún oṣù kan

### Awọn ibeere to kere ju

- CPU: Awọn kooro CPU meji
- Ramu: 4 GB
- Ààyè Díìsìkì: 300 GB ti ààyè díìsìkì tó wà

Àkójọ ìdánwò Zebra's lè gba tó wákàtí kan láti parí ní ìbámu pẹ̀lú àwọn ìlànà ẹ̀rọ rẹ. Àwọn ètò tí ó lọ́ra lè kójọ àti ṣiṣẹ́ Zebra. A kò tíì fi àwọn ààlà iṣẹ́ tí ó péye múlẹ̀ nípasẹ̀ ìdánwò.

### Àwọn Ohun Tí A Nílò Láti Díìsì

- Zebra nlo to 300 GB fun data Mainnet ti a fipamọ ati 10 GB fun data Testnet ti a fipamọ. Reti pe lilo disk yoo pọ si ni akoko.
- A máa ń pa ibi ìpamọ́ dátà mọ́ lẹ́ẹ̀kọ̀ọ̀kan, àti nígbà tí a bá ti pa tàbí tí a bá tún bẹ̀rẹ̀. A máa ń ṣe àwọn àyípadà nípa lílo àwọn ìṣòwò ibi ìpamọ́ dátà. Àwọn àyípadà tí kò pé tí ìfòpinsí tàbí ìpayà bá fà máa ń padà sípò nígbà tí Zebra bá bẹ̀rẹ̀.

### Awọn ibeere ati Awọn ibudo Nẹtiwọọki

- Zebra nlo awọn ibudo TCP wọnyi fun awọn asopọ ti nwọle ati ti njade:
  - 8233 fún Mainnet
  - 18233 fún Testnet
- Ṣíṣeto Zebra pẹ̀lú listen_addr pàtó kan ń polówó àdírẹ́sì yìí fún àwọn ìsopọ̀ tí ń wọlé. Àwọn ìsopọ̀ tí ń jáde ni a nílò fún ìṣiṣẹ́pọ̀; àwọn ìsopọ̀ tí ń wọlé jẹ́ àṣàyàn.
- Wíwọlé sí àwọn olùfúnni DNS Zcash jẹ́ pàtàkì nípasẹ̀ olùṣàtúnṣe DNS OS (nígbà gbogbo ibudo 53).
- Zebra le ṣe awọn asopọ ti njade lori eyikeyi ibudo. zcashd fẹ awọn ẹlẹgbẹ lori awọn ibudo aiyipada lati yago fun lilo fun awọn ikọlu DDoS lori awọn nẹtiwọọki miiran.

### Lilo Nẹtiwọọki Mainnet deede

- Ìṣiṣẹ́pọ̀ àkọ́kọ́: ìgbàsílẹ̀ 300 GB ni a nílò fún ìṣiṣẹ́pọ̀ àkọ́kọ́, a sì retí pé iye yìí yóò pọ̀ sí i.
- Àwọn Ìmúdàgbàsókè Tó Ń Bá Iṣẹ́ Lọ: Àwọn ìgbéjáde àti ìgbàsílẹ̀ lójoojúmọ́ láti 10 MB sí 10 GB, ó da lórí ìwọ̀n ìṣòwò olùlò àti ìbéèrè àwọn ẹlẹgbẹ́.
- Zebra bẹ̀rẹ̀ ìṣọ̀kan àkọ́kọ́ lórí gbogbo ìyípadà ẹ̀yà database inú, èyí tí ó lè túmọ̀ sí gbígbà gbogbo ẹ̀rọ ìgbàsílẹ̀ ní gbogbo ìgbà tí a bá ń ṣe àtúnṣe ẹ̀yà náà.
- Àwọn ẹlẹgbẹ́ tí wọ́n ní ìdúró ìrìn àjò àtẹ̀lé tí ó jẹ́ ìṣẹ́jú-àáyá méjì tàbí díẹ̀ sí i ni a fẹ́ràn jù. Tí ìdúró bá kọjá ààlà yìí, ṣí tíkẹ́ẹ̀tì kan sí ibi ìkópamọ́ Zebra.

## Àwọn Àṣìṣe Tó Wọ́pọ̀

- N ṣe iwọn disiki fun oni. Ipo Mainnet ti a fi pamọ ti fẹrẹ to 300 GB o si n dagba sii.
- Mo n reti awọn RPC apamọwọ lati `zebrad`Àwọn kọ́kọ́rọ́ àti ìwọ̀ntúnwọ̀nsì wà nínú [Zallet](https://github.com/zcash/zallet), ètò kan tó yàtọ̀.
- Sáré `zebrad` nìkan àti pé mo ń retí pé kí àwọn àpò owó fẹ́ẹ́rẹ́fẹ́ so pọ̀. Ọ̀nà yẹn nílò àkójọ àmì ìtọ́kasí, yálà tí lightwalletd tàbí [Zaino](/zcash-tech/zaino).
- Ṣíṣe àtúnṣe àìròtẹ́lẹ̀ gẹ́gẹ́ bí àṣìṣe. Àyípadà ẹ̀yà ìpamọ́ dátà máa ń fa èyí nípa ṣíṣe àgbékalẹ̀ rẹ̀.

## Àwọn ojú ìwé tó jọra

- [Àwọn Nódù Kíkún](/zcash-tech/full-nodes) - kini node kikun ṣe ati awọn imuse wo ni o wa
- [Zakura Node](/zcash-tech/zakura-node) - ihò kan ti a fi orita lati Zebra pẹlu amuṣiṣẹpọ yiyara ati gige
- [Zaino](/zcash-tech/zaino) - Atọka Rust ti o n ṣiṣẹ awọn apamọwọ ina
- [Àwọn Nódù Àpò Ìmọ́lẹ̀](/zcash-tech/lightwallet-nodes) - ìbéèrè àwọn àpò owó ina fún àwọn olupin
- [Itọsọna iwakusa Zcash](/using-zcash/zcash-mining-guide) - iwakusa lodi si ipade tirẹ

## Ẹ̀kọ́ Síwájú

- [Ìwé Zebra](https://zebra.zfnd.org)
- [Zebra lórí GitHub](https://github.com/ZcashFoundation/zebra/)
- [Awọn Ohun elo Eto](https://zebra.zfnd.org/user/requirements.html)
