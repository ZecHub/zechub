<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

## Zebra Node ƒe ŋgɔdonya

Zebra dodo ɖe ŋgɔ: Zcash Node Infrastructure ƒe Tɔtrɔ kple Rust

Do go Zebra, si nye nu yeye si wowɔ abe Zcash node gbãtɔ si wowɔ bliboe le Rust me ene. Wotsɔe wɔ ɖeka kple Zcash hatiwo dome kadodoa nyuie, Zebra nye dɔwɔnu vevi aɖe si doa ŋusẽ kadodoa ƒe tenɔnɔ ɖe nɔnɔme sesẽwo nu. To eƒe dɔ vevi siwo nye asitsatsa ƒe kpeɖodzi kple gbeƒãɖeɖe, kple Zcash blockchain nɔnɔmea dzi kpɔkpɔ nyuie me la, Zebra kpea asi ɖe network ƒe xɔtuɖoɖo si woɖe ɖe vovo wu ŋu.

## Viɖe siwo le Zcashd Node ƒe Dɔwɔwɔ ŋu
To vovo na Zcash node gbãtɔ, zcashd, si di eƒe dzidzime tso Bitcoin ƒe gɔmeɖoanyi codebase eye Electric Coin Company ye to vɛ la, míaƒe dɔwɔwɔ tsi tre abe ɖokuisinɔnɔ ƒe dɔwɔƒe ene. Zebra si woto vɛ tso gɔmedzedzea me ke eye wòléa fɔ ɖe dedienɔnɔ kple dɔwɔwɔ nyuie ŋu, eye wòwɔa ŋusẽ si le Rust gbe si me ŋkuɖoɖonudzi le dedie ŋudɔ.

Togbɔ be woƒe dzɔtsoƒe to vovo hã la, zcashd kple Zebra siaa léa ɖoɖo ɖeka me ɖe asi, si wɔnɛ be kadodo kple dɔwɔwɔ ɖekae si me kuxi aɖeke mele o nɔa wo dome. Menye ɖeko nu yeye sia keke Zcash ƒe lãwo ƒe agbenɔnɔ ɖe enu ko o, ke eɖo dzidzenu yeye aɖe hã na blockchain node ƒe ŋgɔyiyi.

## Mɔfiamewo na Zebra Launcher

Àteŋu awɔ Zebra to míaƒe Docker nɔnɔmetata zazã me alo àteŋu atue kple asi. Taflatse kpɔ akpa si nye System Requirements.

### Docker Zazã:

Be nàwɔ míaƒe tata yeyetɔ agbagbadzedzemanɔmee eye nàwɔe wòasɔ ɖe aɖaŋuɖoɖoa nu la, wɔ sedede si gbɔna:

```

docker run zfnd/zebra:latest

```

Ne èdi mɔfiame siwo de to wu kple gɔmesese tsitotsito la, taflatse kpɔ míaƒe [Docker documentation](https://zebra.zfnd.org/user/docker.html).

### Zebra Tututu:

Zebra tutu de se na Rust, libclang, kple C++ nuƒoƒoƒula.

- Kpɔ egbɔ be yeda Rust ƒe tɔtrɔ yeyetɔ si li ke ɖe wò kɔmpiuta dzi, elabena eya koe wodoa Zebra kpɔna.
- Xɔtuɖoɖo siwo hiã siwo dzi woanɔ te ɖo dometɔ aɖewoe nye:
  - libclang (si woyɔna hã be libclang-dev alo llvm-dev) .
  - clang alo C++ nuƒoƒoƒula bubu (abe g++ na mɔ̃wo katã alo Xcode na macOS ene)
  - protoc (Protocol Buffers nuƒoƒoƒula) kple *--experimental_allow_proto3_optional* aflaga, si woto vɛ le Protocol Buffers v3.12.0 (si woɖe ɖe go le May 16, 2020 dzi).



### Nusiwo dzi woanɔ te ɖo le Arch dzi:

Ne èkpɔ egbɔ be wowɔ ɖe nusiwo dzi woanɔ te ɖo dzi vɔ la, yi edzi nàtu Zebra ahade eme to sedede si gbɔna zazã me:

```

cargo install --locked zebrad

```

Dze Zebra gɔme to:

```
zebrad start

```


## Tiatiawɔblɔɖe ƒe Ðoɖowo & Nɔnɔmewo:


### - Dzeɖoɖo ƒe Faɛl Gɔmedzedze:

  - Wɔ ɖoɖowɔɖi ƒe faɛl to sedede sia zazã me:
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - Woatsɔ *zebrad.toml* si wowɔ la ade Linux ƒe tiatiawɔblɔɖe ƒe nuŋlɔɖi gbãtɔ me. Ne èdi teƒe bubu siwo OS le la, kpɔ míaƒe nuŋlɔɖiwo.



### - Ŋgɔyiyi ƒe Dzesiwo ƒe Ðoɖowɔwɔ:

  - Trɔ asi le *tracing.progress_bar* le wò *zebrad.toml* me be wòaɖe metriks veviwo afia le terminal la me to ŋgɔyiyi ƒe fliwo zazã me. De dzesii: Nya aɖe si wonya li si me ŋgɔyiyi ƒe akɔntabubuwo ate ŋu alolo akpa.



### - Tomenukuƒewo ƒe ɖoɖowɔwɔ:

  - Woateŋu atrɔ asi le Zebra ŋu na tomenukuƒe to *MINER_ADDRESS* kple melidzeƒe ƒe nɔnɔmetata ɖoɖo ɖe Docker me. Àte ŋu akpɔ nyatakaka bubuwo le míaƒe [Mining support documentation](https://zebra.zfnd.org/user/mining-docker.html).


### - Tsitretsitsi Tu Features:

  - Keke Zebra ƒe dɔwɔwɔ ɖe enu kple Cargo ƒe nɔnɔme bubuwo abe Prometheus metrics, Sentry ŋkuléle ɖe eŋu, dodokpɔ Elasticsearch ƒe kpekpeɖeŋu, kple bubuwo.

  - Tsɔ nɔnɔme geɖewo ƒo ƒu to wo ŋɔŋlɔ ɖi abe parameters of the `--features` aflaga le eɖoɖo me.


### De dzesii: Wowɔa debugging kple ŋkuléle ɖe nu ŋu ƒe nɔnɔme aɖewo nuwɔametɔe le release builds me be woawɔ dɔ nyuie wu.

Ne èdi dodokpɔ kple dɔwɔla ƒe nɔnɔmewo ƒe xexlẽdzesi blibo la, taflatse kpɔ míaƒe [API nuŋlɔɖiwo](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).
 

# System ƒe Nudidiwo kple Network ƒe Ðoɖowɔwɔ na Zebra

Be míakpɔ egbɔ be wowɔ dɔ nyuie wu eye kakaɖedzi le eŋu la, míeɖo aɖaŋu na ɖoɖo ƒe nudidi siwo gbɔna hena zebrad, si nye Zcash node si trɔ asi le nu ŋu si wotu bliboe le Rust me la nuƒoƒoƒu kple ewɔwɔ:

### Dɔwɔɖoɖoa ƒe Nudidiwo:
- CPU: CPU ƒe nu vevi 4
- RAM: 16 GB ƒe kpekpeme
- Disk Space: 300 GB disk space li na binaries nuƒoƒoƒu kple cached chain state dzadzraɖo
- Network: 100 Mbps network kadodo kple 300 GB ya teti ƒe nyatakakawo tsɔtsɔ yi Internet dzi kple woƒe kɔpiwo ɣleti sia ɣleti


Taflatse de dzesii be Zebra ƒe dodokpɔxɔa ate ŋu axɔ gaƒoƒo ɖeka kple edzivɔ hafi woawu enu le wò mɔ̃a ƒe nɔnɔmewo nu. Togbɔ be ɖoɖo siwo le blewu ate ŋu aƒo Zebra nu ƒu ahawɔe hã la, míeɖo dɔwɔwɔ ƒe liƒo siwo sɔ pɛpɛpɛ to dodokpɔ me haɖe o.


### Disk ƒe Nudidiwo:
- Zebra zãa abe 300 GB ene na Mainnet nyatakaka siwo wodzra ɖo ɖe cached me eye 10 GB na Testnet nyatakaka siwo wodzra ɖo ɖe cached me. Kpɔ mɔ be disk zazã adzi ɖe edzi le ɣeyiɣi aɖe megbe.
- Wokɔa nyatakakadzraɖoƒea ŋu edziedzi, vevietɔ ne wole nu tsim alo le wo gbugbɔ dze egɔme, si wɔnɛ be wokpɔa egbɔ be nyatakakaawo le blibo. Wogbugbɔa tɔtrɔ siwo mede blibo o le dɔa nutsotso dzizizitɔe alo vɔvɔ̃ ta la ɖe megbe ne wogadze Zebra gɔme ake.


### Network ƒe Nudidiwo Kple Melidzeƒewo:
- Zebra zãa TCP ʋɔtru siwo gbɔna na kadodo siwo gena ɖe eme kple esiwo dona:
  - 8233 na Mainnet
  - 18233 na Testnet
- Zebra ƒe ɖoɖowɔwɔ kple listen_addr tɔxɛ aɖe na be woate ŋu ado boblo adrɛs sia na kadodo siwo gena ɖe eme. Togbɔ be kadodo siwo dona le eme le vevie na nuwɔwɔ ɖekae hã la, kadodo siwo yia eme nye tiatia.
- Zcash DNS seeders yiyi hiã to OS DNS resolver (zi geɖe la, port 53) dzi.
- Togbɔ be Zebra ateŋu aɖo kadodo siwo do go ɖe melidzeƒe ɖesiaɖe hã la, zcashd lɔ̃a hati siwo le melidzeƒe gbãtɔwo dzi be woaɖe DDoS ƒe amedzidzedzewo dzi akpɔtɔ le network bubuwo dzi.


### Mainnet Network Zazã Zi geɖe:
- Gbãtɔ ƒe Ðekawɔwɔ: Ele be woawɔ 300 GB ƒe kɔpi na wɔwɔ ɖekae le gɔmedzedzea me, eye wole mɔ kpɔm be dzidziɖedzi le kɔpi siwo akplɔe ɖo me.
- Nyatakaka Siwo Yia Edzi: Kpɔ mɔ na gbesiagbe nu siwo nàda ɖe Internet dzi ahaɖee tso 10 MB va ɖo 10 GB, si anɔ te ɖe zãla ƒe asitsatsa ƒe lolome kple hatiwo ƒe biabiawo dzi.
- Zebra dzea gbãtɔ ƒe wɔwɔ ɖekae gɔme kple nyatakakadzraɖoƒe ememetɔ ƒe tɔtrɔ ɖesiaɖe, si ate ŋu ahiã be woawɔ kɔsɔkɔsɔ blibo ƒe kɔpi le tɔtrɔ ƒe tɔtrɔwo me.
- Wolɔ̃a hati siwo ƒe mɔzɔzɔ yiyi kple gbɔgbɔ ƒe ɣeyiɣi didi sɛkɛnd 2 alo esi mede nenema o. Ne ɣeyiɣi si woatsɔ aɣlae wu dzidzenu sia la, taflatse tsɔ tikiti ɖo ɖa be woakpe ɖe ŋuwò.


Ne èwɔ ɖe aɖaŋuɖoɖo kple ɖoɖo siawo dzi la, àte ŋu adzi Zebra ƒe dɔwɔwɔ nyuie kple eƒe dɔwɔwɔ ɖe edzi le Zcash network la me. Ne èdo go nya aɖe alo nèhiã kpekpeɖeŋu bubu la, míaƒe kpekpeɖeŋunaha la li bɔbɔe be woana mɔfiame.


Zebra Node Installation mɔfiame ƒe kadodoae nye esi:
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra 
