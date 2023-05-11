# Zcash-waardepools

We zullen kijken naar de 4 [value pools](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html) in Zcash, waaronder de Sprout, Sapling, Orchard en Transparent pools. Deze wikipagina behandelt ook de verbeteringen in technologie en enkele best practices voor pooloverdracht.


## Afgeschermde zwembaden

### Sprout


![zcash-sprout-launch](https://user-images.githubusercontent.com/81990132/233535478-a84724d7-cb0e-4ad8-bfcc-499f665fba24.png)


De Sprout-serie was het allereerste open toestemmingsloze Zero Knowledge-privacyprotocol dat op Zcash werd gelanceerd en wordt soms Zcash 1.0 of "Ordinary Zcash" genoemd. Het werd gelanceerd op 28 oktober 2016 en het was de eerste versie van Zcash die zero-knowledge proof-technologie gebruikt, wat een belangrijk kenmerk is van Zcash Cryptography.


Sprout-adressen worden geïdentificeerd door hun eerste twee letters, die altijd "zc" zijn. Het kreeg de naam "Sprout" met als belangrijkste doel te benadrukken dat de software een jonge, ontluikende blockchain was met een groot potentieel om te groeien en werd geopend voor ontwikkeling.

De Sprout-serie werd gebruikt als een vroege tool voor [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) wat leidde tot de distributie van ZEC- en Block-beloningen voor mijnwerkers .

Naarmate het Zcash-ecosysteem zich blijft uitbreiden met een toenemend aantal afgeschermde transacties, werd waargenomen dat de Zcash Sprout-serie beperkt en minder efficiënt werd als het gaat om gebruikersprivacy, schaalbaarheid van transacties en verwerking. Dit leidde tot de aanpassing van het netwerk en Sapling Upgrade.


### Zcash Sapling

![zcash-sapling-vertical-fullcolor-2x](https://user-images.githubusercontent.com/81990132/233535552-f04b727e-078f-483a-8fbc-1628486be0c8.png)

[Zcash Sapling](https://z.cash/upgrade/sapling) is een upgrade van het Zcash-protocol dat op 28 oktober 2018 is geïntroduceerd. Het is een grote verbetering ten opzichte van de eerdere versie van Sprout, die enkele beperkingen had op het gebied van privacy, efficiëntie en bruikbaarheid.

Enkele van de upgrades omvatten verbeterde prestaties voor afgeschermde adressen, verbeterde weergavesleutels om gebruikers in staat te stellen inkomende en uitgaande transacties te bekijken zonder persoonlijke sleutels van gebruikers bloot te leggen en onafhankelijke Zero Knowledge-sleutels voor hardware-portemonnee tijdens transactiehandtekening.

Met Zcash Sapling kunnen gebruikers privétransacties in slechts enkele seconden uitvoeren in vergelijking met de langere duur die het in Sprout Series kostte.

Transactieafscherming verbetert de privacy, waardoor het voor derden onmogelijk wordt om transacties te koppelen en de hoeveelheid ZEC die wordt overgedragen te bepalen. Sapling verbetert ook de bruikbaarheid door de rekenvereisten voor het genereren van privétransacties te verminderen door het toegankelijker te maken voor gebruikers.

Sapling-portemonnee-adressen beginnen met "zs" en dit kan worden waargenomen in alle ondersteunde Zcash Shielded Wallet (YWallet, Zingo Wallet Nighthawk etc.) die ingebouwde Sapling-adressen heeft. Zcash Sapling vertegenwoordigt een belangrijke technologische ontwikkeling als het gaat om privacy en efficiëntie van transacties, waardoor Zcash een praktische en effectieve cryptocurrency is voor gebruikers die waarde hechten aan privacy en veiligheid.

### Orchard Pool

De Orchard Shielded Pool is gelanceerd op 31 mei 2022. Orchard-adressen worden ook wel Unified Addresses (UA) genoemd.

Omdat Unified-adressen ontvangers combineren voor Orchard, Sapling & Transparent-adressen, wordt verwacht dat de hoeveelheid geld die is opgeslagen in afgeschermde adressen aanzienlijk zal stijgen. Er is geen manier om onderscheid te maken tussen fondsen die naar transparante/afgeschermde pools worden gestuurd.

De Orchard Shielded Pool dient als een aanzienlijke verbetering van de bestaande zwembaden. Het vormt een aparte anonimiteitsset van de Sprout en Sapling Shielded Pools, wat helpt om de privacy en anonimiteit van gebruikers te vergroten.

Transacties binnen Orchard zullen de grootte van de ingestelde anonimiteit sneller vergroten dan transacties die met Sapling worden gedaan, vanwege de ariteitsverbergende aard van Orchard 'Acties' versus UTXO-inputs en -outputs.

De Orchard-upgrade zal helpen om meer verbeteringen aan het Zcash-netwerk aan te brengen, waaronder snellere en efficiëntere transacties, meer anonimiteit, verbeterde beveiliging en meer flexibiliteit voor ontwikkelaars om gedecentraliseerde applicaties op de Zcash Blockchain te bouwen.

![IMG-20230419-221707](https://user-images.githubusercontent.com/81990132/233535609-6bf85926-567d-42ff-8b3f-9123afe98f65.jpg)

Zcash Shielded-wallets ondersteunen nu Orchard op hun Fund Pool-opties. Een goed voorbeeld is te vinden op de Zingo Wallet App.


## Transparant zwembad

Het Zcash Transparent-zwembad is niet afgeschermd en niet-privé. Transparant portemonnee-adres op Zcash begint met de letter "t", privacy wordt bij dit soort transacties als zeer laag beschouwd.

Transparante transacties in Zcash zijn vergelijkbaar met Bitcoin-transacties die transacties met meerdere handtekeningen ondersteunen en gebruikmaken van standaard openbare adressen die door iedereen op het netwerk kunnen worden verzonden en ontvangen.


![IMG-20230420-100149](https://user-images.githubusercontent.com/81990132/233535663-bc536044-2537-41b2-9acb-69b3613e9ab6.jpg)

De Zcash Transparent worden meestal gebruikt door gecentraliseerde uitwisselingen om te zorgen voor een hoge transparantie en netwerkbevestiging bij het verzenden en ontvangen van ZEC tussen gebruikers.

Het is ook belangrijk op te merken dat hoewel Zcash Shielded-adressen veel privacy bieden tijdens transacties, ze ook meer rekenkracht nodig hebben om transacties te verwerken. Daarom kunnen sommige gebruikers transparante adressen gebruiken voor transacties die niet hetzelfde privacyniveau vereisen.

---
###

## Zwembadoverdracht aanbevolen praktijk

Als het gaat om het overwegen van een hoog niveau van privacy tijdens transacties op het Zcash-netwerk, is het raadzaam om de onderstaande praktijken te volgen;

![20230420_051415_0000.png](https://user-images.githubusercontent.com/38798812/233546739-e9076b2d-bcb5-40a1-96a8-25284dff0786.png)

Transacties die plaatsvinden tussen "z tot z"-portemonnees op de Zcash-blockchain zijn meestal afgeschermd en worden soms privétransacties genoemd vanwege het hoge niveau van gegenereerde privacy. Dit is meestal de beste en meest aanbevolen manier om $ZEC te verzenden en te ontvangen wanneer privacy vereist is.

---
![20230421_070131_0000.png](https://user-images.githubusercontent.com/38798812/233552931-d69f4ef3-b065-4d61-8e6b-adbc2edc4d70.png)

Wanneer u ZEC van "Z-adres" naar "T-adres" verzendt, duidt dit simpelweg op een vorm van Deshielding-transactie. Bij dit type transactie is het privacyniveau niet altijd hoog, omdat sommige informatie zichtbaar zal zijn op de blockchain vanwege het effect van het verzenden van ZEC op een transparant adres. Het afschermen van transacties wordt niet altijd aanbevolen wanneer een hoge mate van privacy vereist is.

---

![20230421_071247_0000.png](https://user-images.githubusercontent.com/38798812/233555082-455fbcbd-c685-4c1d-91f2-2d911e6a6273.png)

Het overbrengen van ZEC van een transparant adres (T-adres) naar een Z-adres staat simpelweg bekend als afscherming. Bij dit type transactie is het privacyniveau niet altijd hoog in vergelijking met dat van een z-z-transactie, maar het wordt ook aanbevolen wanneer privacy vereist is.



---

![20230420_091346_0000.png](https://user-images.githubusercontent.com/38798812/233546890-5580a7b9-e8c5-4e2c-a248-3f6338bbe0d1.png)

Het verzenden van ZEC van een transparant adres (T-adres) naar een ander transparant adres (T-adres) op het Zcash-netwerk (T-T-transactie) lijkt sterk op dat van Bitcoin-transacties en daarom worden T-T-transacties op Zcash altijd openbare transacties genoemd omdat beide de transactiedetails van de afzender en de ontvanger worden zichtbaar voor het publiek, waardoor het privacyniveau bij een dergelijke transactie erg laag is.

De meeste Cryptocurrency Centralized-uitwisselingen maken gebruik van Transparent Address ("T-address) als het gaat om transacties op de Zcash-blockchain, maar dit type transactie (T-T) heeft geen privé-eigendommen.



