<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

## Ìfilọ̀ sí Zebra Node

A ṣafihan Zebra: Ṣiṣatunṣe Awọn amayederun Nodu Zcash pẹlu Rust

Meet Zebra, a groundbreaking achievement as the inaugural Zcash node crafted entirely in Rust. Seamlessly integrated into the Zcash peer-to-peer network, Zebra serves as a pivotal tool fortifying the network's resilience. Through its core functions of validating and broadcasting transactions, and meticulously maintaining the Zcash blockchain state, Zebra contributes to a more decentralized network infrastructure.

## Awọn anfani lori imuse Node Zcashd
In contrast to the original Zcash node, zcashd, which traces its lineage back to Bitcoin's foundational codebase and is developed by the Electric Coin Company, our implementation stands as an autonomous entity. Developed from scratch with a focus on security and efficiency, Zebra harnesses the power of the memory-safe Rust language.

Pelu awọn ipilẹṣẹ wọn ti o yatọ, mejeeji zcashd ati Zebra faramọ si ilana kanna, ṣiṣe irọrun ibaraẹnisọrọ alailowaya ati ibaramu laarin wọn. Innovation yii kii ṣe faagun ilolupo eda abemi Zcash nikan ṣugbọn tun ṣeto boṣewa tuntun fun idagbasoke node blockchain.

## Àwọn ìtọ́ni fún Zebra Launcher

O le lo Zebra nipa lilo aworan Docker wa tabi o le kọ ọ ni ọwọ. Jọwọ wo abala Awọn ibeere Eto.

### Ìlò Docker:

Láti ṣe àtúnṣe tuntun wa láìṣe ìsapá àti láti ṣe àdàkọ rẹ̀ sí ìparí, ṣe àṣẹ yìí:

```

docker run zfnd/zebra:latest

```

Fun diẹ alaye awọn itọnisọna ati ki o alaye ni oye, jọwọ tọka si wa [Docker iwe aṣẹ](https://zebra.zfnd.org/user/docker.html).

### Ilé Zebra:

Ṣiṣẹda Zebra gba Rust, libclang, ati onkọwe C++.

- Rii daju pe o ni ẹya Rust iduroṣinṣin tuntun ti a fi sori ẹrọ, bi a ṣe ṣe idanwo Zebra nikan pẹlu rẹ.
- Àwọn ìfipínlẹ̀ tí ó yẹ láti kọ́ ni:
  - libclang (tí a tún mọ̀ sí libcling-dev tàbí llvm-dev)
  - clang tabi compiler C++ miiran (bii g++ fun gbogbo awọn iru ẹrọ tabi Xcode fun macOS)
  - protoc (Protocol Buffers compiler) pẹ̀lú *--experimental_allow_proto3_optional* flag, tí wọ́n mú jáde nínú Protocol Buffers v3.12.0 (tí wọ̀n ṣe jáde ní May 16, 2020).



### Àwọn ohun tó gbẹ́kẹ̀lé Arch:

Lẹ́yìn tí o bá ti rí i dájú pé àwọn ohun tí ó ní ìfọ̀kànbalẹ̀ náà bá a mu, tẹ̀síwájú pẹ̀lú kíkó àti gbígbé Zebra kalẹ̀ nípa lílo àṣẹ yìí:

```

cargo install --locked zebrad

```

Bẹrẹ Zebra nipa ṣiṣe:

```
zebrad start

```


## Awọn iṣeto ati Awọn ẹya ara ẹrọ Aṣayan:


### - Ṣíṣe ìpilẹ̀ṣẹ̀ Àkájọ Àtòjọ:

  - Ṣẹda faili iṣeto nipa lilo aṣẹ:
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - A ó fi *zebrad.toml* tí a dá sílẹ̀ sínú ìwé àkọọ́lẹ̀ àwọn ààyò ìpilẹ̀ṣẹ̀ Linux. fún àwọn àtúnṣe ibùdó ìpilẹ̀ṣẹ̀ OS, wo ìwé wa.



### - Ṣiṣeto Àwọn Àlàkalẹ̀ Ìlọsíwájú:

  - Ṣeto *tracing.progress_bar* ninu rẹ *zebrad.toml* lati fi awọn iṣiro pataki han ninu ebute nipa lilo awọn ọpa ilọsiwaju. Akọsilẹ: A mọ ọrọ kan ti o wa nibiti awọn iṣirò ọpa ilosiwaju le di nla pupọ.



### - Ṣíṣètò Ìwakùsà:

  - Zebra le wa ni ti adani fun iwakusa nipa sisọ a * MINER_ADDRESS * ati ibudo maapu ni Docker.](https://zebra.zfnd.org/user/mining-docker.html).


### - Àwọn Àṣejèrè Ṣíṣe:

  - Faagun iṣẹ Zebra pẹlu awọn ẹya Cargo afikun gẹgẹbi awọn iṣiro Prometheus, ibojuwo Sentry, atilẹyin Elasticsearch idanwo, ati diẹ sii.

  - Darapọ awọn ẹya ara ẹrọ pupọ nipa titẹ wọn gẹgẹbi awọn paramita ti awọn `--features` àmì nígbà tí wọ́n bá ń gbé e kalẹ̀.


### Àkíyèsí: Diẹ ninu awọn ẹya atunṣe ati ibojuwo ti wa ni idiwọ ni awọn iṣelọpọ igbasilẹ lati mu iṣẹ ṣiṣe dara julọ.

Fun akojọ okeerẹ ti awọn ẹya idanwo ati awọn olupilẹṣẹ, jọwọ ṣayẹwo wa [Awọn iwe aṣẹ API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).
 

# Awọn ibeere eto ati iṣeto nẹtiwọọki fun Zebra

Lati rii daju iṣẹ ti o dara julọ ati igbẹkẹle, a ṣe iṣeduro awọn ibeere eto atẹle fun sisọ ati ṣiṣe zebrad, oju opo Zcash ti o ni iyika ti a kọ ni Rust:

### Awọn ibeere eto:
- CPU: 4 àwọn ìkànì CPU
- RAM: 16 GB
- Àyè disk: 300 GB àyè disk tó wà fún àkójọpọ̀ àwọn ìdìpọ̀ méjì àti kíkó ipò ìsopọ̀ tí ó wà nípamọ́
- Nẹtiwọọki: 100 Mbps asopọ nẹtiwo pẹlu o kere ju 300 GB awọn gbigbe ati awọn igbasilẹ fun oṣu kan


Jọwọ ṣe akiyesi pe igbaradi idanwo ti Zebra le gba diẹ sii ju wakati kan lati pari da lori awọn alaye ẹrọ rẹ. Lakoko ti awọn ọna ṣiṣe ti o lọra le ni anfani lati ṣajọ ati ṣiṣe Zebra, a ko tii fi idiwọn iṣẹ gangan mulẹ nipasẹ idanwo.


### Àwọn Ohun Tí ó Wà Lára Àwo:
- Zebra nlo nipa 300 GB fun data Mainnet ti a fi pamọ ati 10 GB fun awọn data Testnet ti a ṣe pamọ. Ṣe ireti lilo disk lati pọ si ni akoko.
- The database is regularly cleaned up, especially during shutdowns or restarts, ensuring data integrity. Incomplete changes due to forced terminations or panics are rolled back upon restarting Zebra.


### Awọn ibeere Nẹtiwọọki ati Awọn ibudo:
- Zebra n lo awọn ibudo TCP wọnyi fun awọn asopọ ti n wọle ati ti n jade:
  - 8233 fún Mainnet
  - 18233 fún Testnet
- Configuring Zebra with a specific listen_addr enables advertising this address for inbound connections. While outbound connections are essential for synchronization, inbound connections are optional.
- Wiwọle si Zcash DNS seeders jẹ dandan nipasẹ OS DNS resolver (nigbagbogbo ibudo 53).
- While Zebra can establish outbound connections on any port, zcashd prefers peers on default ports to mitigate DDoS attacks on other networks.


### Ìlò Nẹtiwọọki Mainnet títóbi:
- Àkójọpọ̀ àkọ́kọ́: A nílò ìkápá 300 GB fún àkójọpọ̀ àkọ́bẹ̀rẹ̀, pẹ̀lú ìdàgbàsókè tí a retí nínú àwọn ìkákápá tó tẹ̀lé e.
- Ongoing Updates: Expect daily uploads and downloads ranging from 10 MB to 10 GB, contingent on user transaction sizes and peer requests.
- Zebra máa ń bẹ̀rẹ̀ ìṣàmúlò bákan náà pẹ̀lú gbogbo àtúnṣe ìtumọ̀ ibi ìpamọ́ tí ó wà nínú rẹ̀, èyí tí ó lè mú kí ó pọn dandan láti ṣe ìmúkúrò ẹ̀rọ-ìmọ̀ lákòókò tí àtúntò-ìmúlò ń wáyé.
- Awọn ẹlẹgbẹ ti o ni idaduro irin-ajo ti 2 iṣẹju-aaya tabi kere si ni o fẹ. Ti idadoro ba kọja opin yii, jọwọ fi tikẹti kan silẹ fun iranlọwọ.


Nipa titẹle awọn iṣeduro ati awọn iṣeto wọnyi, o le mu ṣiṣe ati ipa ti Zebra pọ si laarin nẹtiwọọki Zcash. Ti o ba pade eyikeyi awọn iṣoro tabi nilo iranlọwọ siwaju sii, ẹgbẹ atilẹyin wa wa ni imurasilẹ lati pese itọsọna.


Eyi ni ọna asopọ si itọnisọna fifi sori Zebra Node:
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra 
