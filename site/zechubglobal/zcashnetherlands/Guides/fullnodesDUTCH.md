# Volledige knooppunten

Een Full Node is software die een volledige kopie uitvoert van de blockchain van elke cryptovaluta die toegang geeft tot de protocolfuncties.

Het houdt een volledig overzicht bij van elke transactie die sinds het ontstaan ​​heeft plaatsgevonden en kan daarom de geldigheid verifiëren van nieuwe transacties en blokken die aan de blockchain zijn toegevoegd.

## Zcashd

Zcashd is momenteel de belangrijkste Full Node-implementatie die wordt gebruikt door Zcash, ontwikkeld en onderhouden door Electric Coin Company.

Zcashd stelt een set API's bloot via zijn RPC-interface. Deze API's bieden functies waarmee externe toepassingen kunnen communiceren met het knooppunt.

Lightwalletd is een voorbeeld van een applicatie die een volledig knooppunt gebruikt om ontwikkelaars in staat te stellen mobielvriendelijke afgeschermde lichte portemonnees te bouwen en te onderhouden zonder rechtstreeks met Zcashd te hoeven communiceren.

[Volledige lijst](https://zcash.github.io/rpc/)

[Het Zcashd-boek](https://zcash.github.io/zcash/)


### Start een Node (Linux)

- Installeer afhankelijkheden

      sudo apt-update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clone nieuwste release, checkout, setup en build:

      git kloon https://github.com/zcash/zcash.git

      cd zcash/

      git uitchecken v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sync Blockchain (kan enkele uren duren)

    Om de node-run te starten:

      ./src/zcashd

- Privésleutels worden opgeslagen in ~/.zcash/wallet.dat

[Gids voor Zcashd op Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra is een onafhankelijke volledige node-implementatie voor het Zcash-protocol gemaakt door de Zcash Foundation.

Het wordt momenteel getest en is nog steeds experimenteel.

Er zijn twee hoofdcomponenten van Zebra. De clientcomponent die verantwoordelijk is voor het scannen van de blockchain en het decrypteren van transacties.

Het tweede deel is de opdrachtregeltool zebra. Deze tool beheert uitgavensleutels, adresseert en communiceert met de Client-component in zebrad om basisportemonneefunctionaliteit te bieden.

Iedereen die geïnteresseerd is in het uitproberen van Zebra om blokken te minen, wordt uitgenodigd om lid te worden van de R&D Discord-server. Lees ook het Zebra-boek voor installatie-instructies.

[Github](https://github.com/ZcashFoundation/zebra/)

[Het Zebraboek](https://zebra.zfnd.org)

[Onenigheid](https://discord.gg/uvEdHsrb)



## Het netwerk

Door een volledig knooppunt te draaien, helpt u het zcash-netwerk te versterken door de decentralisatie ervan te ondersteunen.

Dit helpt vijandige controle te voorkomen en het netwerk weerbaar te houden tegen bepaalde vormen van verstoring.

DNS-seeders tonen een lijst met andere betrouwbare knooppunten via een ingebouwde server. Hierdoor kunnen transacties zich door het netwerk verspreiden.

### Netwerkstatistieken

Dit zijn voorbeelden van platforms die toegang geven tot Zcash Network-gegevens:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Je kunt ook bijdragen aan de ontwikkeling van het netwerk door tests uit te voeren of nieuwe verbeteringen voor te stellen en statistieken te verstrekken.



### Mijnbouw

Mijnwerkers hebben volledige knooppunten nodig om toegang te krijgen tot alle aan mijnbouw gerelateerde rpc's zoals getblocktemplate & getmininginfo.

Zcashd maakt ook mijnbouw naar afgeschermde muntbasis mogelijk. Miners en mining pools hebben de optie om direct te minen om standaard afgeschermde ZEC in een z-adres te verzamelen.

Lees de [Mijngids](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) of word lid van de Community Forum-pagina voor [Zcash Miners](https://forum.zcashcommunity.com/c/mijnbouw/13).

### Privacy

Door een volledig knooppunt uit te voeren, kunt u onafhankelijk alle transacties en blokken op het Zcash-netwerk verifiëren.

Door een volledig knooppunt uit te voeren, vermijdt u enkele privacyrisico's die gepaard gaan met het gebruik van services van derden om namens u transacties te verifiëren.

Als u uw eigen node gebruikt, kunt u ook verbinding maken met het netwerk via [Tor](https://zcash.github.io/zcash/user/tor.html).
Dit heeft als bijkomend voordeel dat andere gebruikers privé verbinding kunnen maken met uw node .onion-adres.


**Hulp nodig?**

Lees [Ondersteuningsdocumentatie](https://zcash.readthedocs.io/en/latest/)

Word lid van onze [Discord Sever](https://discord.gg/zcash) of neem contact met ons op via [twitter](https://twitter.com/ZecHub)




