<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

## Utangulizi wa Zebra Node

Kuanzisha Zebra: Mapinduzi Zcash Node Miundombinu na kutu

Meet Zebra, a groundbreaking achievement as the inaugural Zcash node crafted entirely in Rust. Seamlessly integrated into the Zcash peer-to-peer network, Zebra serves as a pivotal tool fortifying the network's resilience. Through its core functions of validating and broadcasting transactions, and meticulously maintaining the Zcash blockchain state, Zebra contributes to a more decentralized network infrastructure.

## Faida juu ya Zcashd Node Utekelezaji
In contrast to the original Zcash node, zcashd, which traces its lineage back to Bitcoin's foundational codebase and is developed by the Electric Coin Company, our implementation stands as an autonomous entity. Developed from scratch with a focus on security and efficiency, Zebra harnesses the power of the memory-safe Rust language.

Licha ya asili yao tofauti, wote zcashd na Zebra kuambatana na itifaki sawa, kuwezesha mawasiliano seamless na interoperability kati yao. uvumbuzi huu si tu kupanua mazingira Zcash lakini pia huweka kiwango kipya kwa blockchain node maendeleo.

## Maelekezo kwa ajili ya Zebra Launcher

Unaweza kuendesha Zebra kutumia Docker picha yetu au unaweza kujenga kwa mikono. Tafadhali angalia System Mahitaji sehemu.

### Docker Matumizi:

Kwa effortlessly kukimbia kutolewa yetu ya karibuni na kusawazisha kwa ncha, kutekeleza amri ifuatayo:

```

docker run zfnd/zebra:latest

```

Kwa maelekezo zaidi ya kina na ufahamu wa kina, tafadhali rejea yetu [Docker nyaraka](https://zebra.zfnd.org/user/docker.html).

### Kujenga Zebra:

Kujenga Zebra amri Rust, libclang, na C ++ compiler.

- Kuhakikisha una latest imara Rust toleo imewekwa, kama Zebra ni kipekee majaribio na hayo.
- Mahitaji kujenga dependencies ni pamoja na:
  - libclang (pia inajulikana kama libclan-dev au llvm-dev)
  - clang au mwingine C ++ compiler (kama vile g ++ kwa majukwaa yote au Xcode kwa macOS)
  - protoc (Protocol Buffers compiler) na *--experimental_allow_proto3_optional* bendera, iliyoletwa katika Protocol Buffers v3.12.0 (iliyotolewa Mei 16, 2020).



### Utegemezi juu ya Arch:

Baada ya kuhakikisha utegemezi ni alikutana, kuendelea na kujenga na kufunga Zebra kutumia amri ifuatayo:

```

cargo install --locked zebrad

```

Kuanzisha Zebra kwa kutekeleza:

```
zebrad start

```


## Hiari Configurations & Features:


### - Initializing Configuration File:

  - Kuzalisha faili ya usanidi kwa kutumia amri:
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - Kuzalishwa *zebrad.toml* itakuwa kuwekwa katika default mapendekezo directory ya Linux. Kwa mbadala OS default maeneo, rejea nyaraka zetu.



### - Configuring Maendeleo Bars:

  - Configure * tracing.progress_bar* katika yako *zebrad.toml* kuonyesha metrics muhimu katika terminal kutumia maendeleo bar. Kumbuka: suala inayojulikana ipo ambapo maendeleo bar makadirio inaweza kuwa mno kubwa.



### - Configuring Uchimbaji:

  - Zebra inaweza kuwa tailored kwa madini kwa kutaja * MINER_ADDRESS * na bandari ramani katika Docker. Maelezo zaidi yanaweza kupatikana katika yetu [Madini msaada nyaraka](https://zebra.zfnd.org/user/mining-docker.html).


### - Custom Kujenga Features:

  - Kupanua utendaji wa Zebra na vipengele vya ziada vya Cargo kama vile metrics ya Prometheus, ufuatiliaji wa Sentry, msaada wa majaribio ya Elasticsearch, na zaidi.

  - Kuchanganya makala nyingi kwa orodha yao kama vigezo ya `--features` bendera wakati wa ufungaji.


### Kumbuka: Baadhi debugging na ufuatiliaji makala ni walemavu katika kutolewa kujenga ili kuongeza utendaji.

Kwa orodha ya kina ya vipengele majaribio na developer, tafadhali wasiliana na yetu [API nyaraka](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).
 

# Mahitaji ya Mfumo na Configuration Network kwa Zebra

Ili kuhakikisha utendaji bora na kuegemea, tunapendekeza yafuatayo mahitaji ya mfumo kwa ajili ya kukusanya na kuendesha zebrad, mapinduzi Zcash node kujengwa kabisa katika kutu:

### Mahitaji ya mfumo:
- CPU: 4 cores CPU
- RAM: 16 GB
- Disk Space: 300 GB inapatikana disk nafasi kwa ajili ya kuandaa binaries na kuhifadhi cached mlolongo hali
- Mtandao: 100 Mbps mtandao uhusiano na kiwango cha chini cha 300 GB uploads na downloads kwa mwezi


Please note that Zebra's test suite may take over an hour to complete depending on your machine specifications. While slower systems may be able to compile and run Zebra, we have yet to establish precise performance boundaries through testing.


### Mahitaji ya Disk:
- Zebra inatumia takriban 300 GB kwa data cached Mainnet na 10 GB kwa ajili ya data Testnet cached.
- Hifadhidata ni mara kwa mara kusafishwa, hasa wakati shutdowns au restarts, kuhakikisha uadilifu data. mabadiliko incomplete kutokana na kukomeshwa kulazimishwa au hofu ni akageuka nyuma juu ya restarting Zebra.


### Mahitaji ya mtandao na bandari:
- Zebra inatumia bandari zifuatazo za TCP kwa uhusiano wa ndani na nje:
  - 8233 kwa Mainnet
  - 18233 kwa Testnet
- Configuring Zebra na maalum kusikiliza_addr itawezesha matangazo anwani hii kwa ajili ya uhusiano inbound. Wakati uhusiano outbound ni muhimu kwa ajili synchronization, uhusiano incoming ni hiari.
- Upatikanaji wa Zcash DNS seeders ni muhimu kupitia OS DNS resolver (kawaida bandari 53).
- Wakati Zebra inaweza kuanzisha uhusiano wa nje kwenye bandari yoyote, zcashd anapendelea wenzao kwenye bandara chaguomsingi ili kupunguza mashambulizi ya DDoS kwenye mitandao mingine.


### Kawaida Mainnet Network Matumizi:
- Initial Sync: 300 GB download inahitajika kwa ajili ya ushirikiano wa awali, na ukuaji wa inatarajiwa katika downloads baadaye.
- Kuendelea Updates: Kutarajia upakiaji kila siku na downloads kuanzia 10 MB kwa 10 GB, masharti ya watumiaji manunuzi ukubwa na peer maombi.
- Zebra huanzisha usawazishaji wa awali na kila mabadiliko ya toleo la hifadhidata ya ndani, ikihitaji kupakuliwa kwa mnyororo kamili wakati wa sasisho la toleo.
- Wenzake na ziara ya pande zote latency ya sekunde 2 au chini ni preferred. Kama latency unazidi kizingiti hiki, tafadhali kuwasilisha tiketi kwa ajili ya msaada.


Kwa kuzingatia mapendekezo haya na mipangilio, unaweza kuongeza ufanisi na ufanisi wa Zebra ndani ya mtandao wa Zcash. Kama unakabiliwa na masuala yoyote au unahitaji msaada zaidi, timu yetu ya msaada inapatikana kwa urahisi kutoa mwongozo.


Hapa ni kiungo kwa Zebra Node Installation mwongozo:
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra 
