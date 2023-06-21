# Halo


## Wat is Halo?

Halo is een betrouwbare, recursieve zero-knowledge proof (ZKP) ontdekt door Sean Bowe van Electric Coin Co. Het elimineert de vertrouwde setup en maakt een grotere schaalbaarheid van de Zcash-blockchain mogelijk. Halo was het eerste zero-knowledge proof-systeem dat zowel efficiënt als recursief is en algemeen wordt beschouwd als een wetenschappelijke doorbraak.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Onderdelen**

Succinct Polynomial Commitment Scheme: Stelt een committer in staat zich te committeren aan een polynoom met een korte string die door een verificateur kan worden gebruikt om geclaimde evaluaties van het vastgelegde polynoom te bevestigen.

Polynomial Interactive Oracle Proof: Verifier vraagt ​​prover (algoritme) om alle toezeggingen op verschillende punten naar keuze te openen met behulp van een polynoom toezeggingsschema en controleert de identiteit tussen hen.


### Geen vertrouwde configuratie

zkSNARKs vertrouwen op een gemeenschappelijke referentietekenreeks (CRS) als openbare parameter voor bewijzen en verifiëren. Dit CRS moet vooraf worden gegenereerd door een vertrouwde partij. Tot voor kort waren uitgebreide veilige multi-party berekeningen (MPC) zoals die uitgevoerd door Aztec Network & Zcash nodig om het risico tijdens deze [vertrouwde setup-ceremonie](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) te verminderen .

Voorheen maakten Zcash's Sprout & Sapling afgeschermde zwembaden gebruik van de BCTV14 & Groth 16 zk-testsystemen. Hoewel deze veilig waren, waren er beperkingen. Ze waren niet schaalbaar omdat ze gebonden waren aan een enkele applicatie, het "giftige afval" (overblijfselen van cryptografisch materiaal gegenereerd tijdens de ontstaansceremonie) kon blijven bestaan, en er was een element van vertrouwen (zij het miniem) voor gebruikers om de ceremonie acceptabel te vinden .

Door herhaaldelijk meerdere exemplaren van harde problemen samen te vouwen over cycli van elliptische krommen, zodat computationele bewijzen kunnen worden gebruikt om efficiënt over zichzelf te redeneren (geneste amortisatie), wordt de behoefte aan een vertrouwde opstelling geëlimineerd. Dit betekent ook dat de gestructureerde referentiereeks (uitvoer van ceremonie) kan worden geüpgraded, waardoor toepassingen zoals slimme contracten mogelijk zijn.

Halo biedt gebruikers twee belangrijke garanties met betrekking tot de veiligheid van het grootschalige zero-knowledge proof-systeem. Ten eerste stelt het gebruikers in staat om te bewijzen dat niemand die betrokken was bij de ontstaansceremonie een geheime achterdeur heeft gecreëerd om frauduleuze transacties uit te voeren. Ten tweede stelt het gebruikers in staat om aan te tonen dat het systeem in de loop van de tijd veilig is gebleven, zelfs als het updates en wijzigingen heeft ondergaan.

[Sean Bowes Explainer over Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)
 


### Recursieve bewijzen

Met recursieve bewijssamenstelling kan een enkel bewijs de juistheid van vrijwel onbeperkte andere bewijzen bevestigen, waardoor een grote hoeveelheid berekeningen (en informatie) kan worden gecomprimeerd. Dit is een essentieel onderdeel voor schaalbaarheid, niet in de laatste plaats omdat het ons in staat stelt om het netwerk horizontaal te schalen, terwijl kleine groepen deelnemers toch kunnen vertrouwen op de integriteit van de rest van het netwerk.

Voorafgaand aan Halo vereiste het bereiken van recursieve bewijssamenstelling grote rekenkosten en een vertrouwde opstelling. Een van de belangrijkste ontdekkingen was een techniek die 'geneste afschrijving' wordt genoemd. Deze techniek maakt recursieve compositie mogelijk met behulp van het polynomiale commitment-schema op basis van het argument van het inwendig product, waardoor de prestaties enorm verbeteren en de vertrouwde opstelling wordt vermeden.

In de [Halo-paper](https://eprint.iacr.org/2019/1021.pdf) hebben we dit polynomiale commitment-schema volledig beschreven en ontdekten we dat er een nieuwe aggregatietechniek in bestond. Met deze techniek kan een groot aantal onafhankelijk gemaakte bewijzen bijna net zo snel worden geverifieerd als het verifiëren van een enkel bewijs. Dit alleen zou een beter alternatief bieden voor de eerdere zk-SNARK's die in Zcash werden gebruikt.


### Hallo 2

Halo 2, is een krachtige zk-SNARK-implementatie geschreven in Rust, waardoor een vertrouwde installatie niet meer nodig is en tegelijkertijd de weg wordt geëffend voor schaalbaarheid in Zcash.

![halo2image](https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg "halo2")

Het bevat een veralgemening van onze benadering, een "accumulatieschema" genaamd. Deze nieuwe formalisering laat zien hoe onze geneste afschrijvingstechniek eigenlijk werkt; door bewijzen toe te voegen aan een object dat een "accumulator" wordt genoemd, waarbij de bewijzen redeneren over de vorige toestand van de accumulator, kunnen we controleren of alle voorgaande bewijzen correct waren (door inductie), simpelweg door de huidige toestand van de accumulator te controleren.

![Accumulatorafbeelding](https://i.imgur.com/l4HrYgE.png "accumulator")

Tegelijkertijd ontdekten veel andere teams nieuwe Polynomial IOP's die efficiënter waren dan Sonic (gebruikt in Halo 1), zoals Marlin.

De meest efficiënte van deze nieuwe protocollen is PLONK, dat enorme flexibiliteit biedt bij het ontwerpen van efficiënte implementaties op basis van applicatiespecifieke behoeften en 5x betere bewijstijd van Sonic biedt.

[Overzicht van PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Hoe komt dit ten goede aan Zcash?

De Orchard Shielded-pool geactiveerd met NU5 & is de implementatie van dit nieuwe bewijssysteem op het Zcash-netwerk. Bewaakt door hetzelfde tourniquet-ontwerp als gebruikt tussen Sprout en Sapling met de bedoeling om de oudere afgeschermde zwembaden geleidelijk met pensioen te laten gaan. Dit stimuleert migratie naar een volledig betrouwbaar bewijssysteem, versterkt het vertrouwen in de soliditeit van de monetaire basis en vermindert de implementatiecomplexiteit en het aanvalsoppervlak van Zcash in het algemeen. Na de activering van NU5 medio 2022 werd integratie van recursieve bewijzen mogelijk (hoewel dit niet volledig is). Verschillende privacyverbeteringen werden ook tangentieel aangebracht. De introductie van 'Acties' ter vervanging van inputs/outputs hielp de hoeveelheid transactiemetadata te verminderen.

Vertrouwde instellingen zijn over het algemeen moeilijk te coördineren en vormden een systeemrisico. Het zou nodig zijn om ze voor elke belangrijke protocolupgrade te herhalen. Het verwijderen ervan biedt een substantiële verbetering voor het veilig implementeren van nieuwe protocolupgrades.

Recursieve bewijssamenstelling biedt het potentieel voor het comprimeren van onbeperkte hoeveelheden berekeningen, het creëren van controleerbare gedistribueerde systemen, waardoor Zcash zeer capabel wordt, vooral met de verschuiving naar Proof of Stake. Dit is ook handig voor uitbreidingen zoals Zcash Shielded Assets en het verbeteren van Layer 1-capaciteit aan de bovenkant van volledig node-gebruik in de komende jaren voor Zcash.


## Halo in het bredere ecosysteem

The Electric Coin Company heeft een overeenkomst gesloten met Protocol Labs, de Filecoin Foundation en de Ethereum Foundation om Halo R&D te onderzoeken, inclusief hoe de technologie kan worden gebruikt in hun respectieve netwerken. De overeenkomst heeft tot doel betere schaalbaarheid, interoperabiliteit en privacy te bieden tussen ecosystemen en voor Web 3.0.

Bovendien valt Halo 2 onder de [MIT en Apache 2.0 open-source licenties](https://github.com/zcash/halo2#readme), wat betekent dat iedereen in het ecosysteem met het testsysteem kan bouwen.

### Filecoin

Sinds de implementatie is de halo2-bibliotheek overgenomen in projecten zoals de zkEVM, er is een potentiële integratie van Halo 2 in het bewijssysteem voor de Filecoin Virtual Machine. Filecoin vereist tal van kostbare bewijzen van ruimtetijd / bewijzen van replicatie. Halo2 zal cruciaal zijn bij het comprimeren van het ruimtegebruik en het beter schalen van het netwerk.

[Filecoin Foundation video met Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Bovendien zou het zeer gunstig zijn voor zowel de Filecoin- als de Zcash-ecosystemen als Filecoin-opslagbetalingen in ZEC zouden kunnen worden gedaan, wat hetzelfde niveau van privacy biedt voor opslagaankopen dat bestaat in Zcash-afgeschermde overdrachten. Deze ondersteuning zou de mogelijkheid toevoegen om bestanden in Filecoin-opslag te versleutelen en ondersteuning aan mobiele clients toe te voegen, zodat ze media of bestanden kunnen "toevoegen" aan een met Zcash versleutelde memo.

[ECC x Filecoin-blogpost](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Implementatie van een Halo 2 proof voor de efficiënte Verifiable Delay Function (VDF) in ontwikkeling. Een VDF is een cryptografische primitieve die veel potentiële use-cases heeft.

Het kan worden gebruikt als een bron van willekeur voor algemene doeleinden, waaronder gebruik in slimme contracttoepassingen en verkiezing van leiders in Proof of Stake op Ethereum en andere protocollen.

ECC, de Filecoin Foundation, Protocol Labs en de Ethereum Foundation zullen ook samenwerken met [SupraNational](https://www.supranational.net/), een leverancier die gespecialiseerd is in hardware-versnelde cryptografie, voor potentieel GPU- en ASIC-ontwerp en ontwikkeling van de VDF.

De [Privacy and Scaling Exploration group](https://appliedzkp.org/) onderzoekt ook verschillende manieren waarop Halo 2-bewijzen de privacy en schaalbaarheid voor het Ethereum-ecosysteem kunnen verbeteren. Deze groep rolt op naar de Ethereum-stichting en heeft een brede focus op zero-knowledge proofs en cryptografische primitieven.

## Andere projecten die Halo gebruiken

+ [Anoma, een privacybehoud multichain atomic swap-protocol](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, een L2 zkRollup op Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, een private L1 zkEVM-blockchain](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, een L2 zkRollup op Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Verder leren**:

[Een inleiding tot zkp en halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 met Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Technical Explainer Blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Community Showcase - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentatie**

[Halo 2-bronnen](https://github.com/adria0/awesome-halo2)

[Halo 2-documenten](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)


