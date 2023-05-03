# Veel Gestelde Vragen

Een lijst met onderwerpen met de meest gestelde vragen over Zcash. Raadpleeg [documentatie voor probleemoplossing](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html) voor het oplossen van problemen met de Zcash-client.


## Wat is Zcash?

Zcash is een digitale valuta met snel en vertrouwelijk met lage kosten. Privacy is het centrale kenmerk van Zcash. Het is een pionier in het gebruik van zero-knowledge proofs om gebruikersinformatie te beschermen door alle transacties te coderen. Er zijn verschillende portefeuilles die u kunt downloaden voor directe, mobiele, veilige en privébetalingen.

[Mobiele portefeuilles](https://z.cash/wallets/)


## Hoe kan ik Zcash verkrijgen?

U kunt ZEC kopen van cryptocurrency [exchanges](https://z.cash/exchanges). U kunt Zcash ook rechtstreeks van een andere persoon kopen op een peer-to-peer-manier. Wees voorzichtig bij het uitwisselen met diensten en personen die u niet kent. Je kunt Zcash ook verwerven door Zcash te minen.


## Wat is het verschil tussen Zcash en andere cryptocurrencies?

Zcash is fundamenteel meer privé dan andere cryptocurrencies zoals Bitcoin of Ethereum. Zcash ondersteunt snelle bloktijden (75 seconden), lage kosten en heeft regelmatige upgradeschema's, wat betekent dat dit protocol zeer aanpasbaar is. Een belangrijk kenmerk is optionele maar zeer veilige privacy.

Gebruikers kunnen selecteren of een transactie wordt gedaan op het transparante of afgeschermde deel van de blockchain. Zie [hier](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html) voor meer informatie

## Hoe wordt het Zcash-protocol beheerd?

Het protocol wordt beheerst door het Zcash Improvement Proposal-proces. Het ZIP-proces biedt een open locatie en structuur voor het collectief evalueren van wijzigingen in Zcash.

Iedereen kan een concept-ZIP indienen. Ontwerp-ZIP's worden besproken door de gemeenschap als geheel en vervolgens geaccepteerd of afgewezen door de ZIP-editors.

Momenteel zijn er twee ZIP-editors — [Daira Hopwood](https://twitter.com/feministPLT) vertegenwoordigt de Electric Coin Company & [Deirdre Connolly](https://twitter.com/durumcrustulum) vertegenwoordigt de Zcash Foundation.

Beslissingen van het ZIP-proces worden geschreven in de Zcash-specificatie, evenals in de software die het netwerk beheert. De wijzigingen worden on-chain "geratificeerd" wanneer de meerderheid van het netwerk de upgrade goedkeurt en de consensus niet breekt.

## Waar is mijn transactie?

Lees eerst [ons artikel](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629) over block explorers. Controleer vervolgens met [Zcash block explorer](https://zcashblockexplorer.com) dat alle transacties standaard verlopen na ~25 minuten/20 blokken en dat geld wordt teruggestuurd naar het oorspronkelijke verzendadres.

Als uw transactie verloopt, kunt u het beste uw transactie opnieuw proberen met enkele mogelijke aanpassingen.

Er kunnen verschillende redenen zijn waarom uw transactie niet in een blok wordt opgenomen:

+ Verlies van connectiviteit

+ Transactiekosten te laag

+ Netwerkoverbelasting

+ Te veel transparante invoer (transactiegrootte te groot)


We raden u aan uw transactie opnieuw te proberen met:

+ Probeer het opnieuw met een betere verbinding

+ Gebruik het standaard tarief

+ Probeer het later opnieuw, of verhoog de kosten voor transacties met hoge prioriteit

+ Gebruik een minimale hoeveelheid invoer om de grootte te beperken of verhoog de vergoeding voor grote transacties



## Is Zcash echt privé?

Ja, Zcash maakt volledige privacy mogelijk voor gebruikers door gegevens over de afzender, het bedrag en de ontvanger te coderen binnen transacties met één handtekening die zijn gepubliceerd in het openbare blockchain-grootboek, met name voor transacties met afgeschermde adressen.

Zcash versleutelt geen gegevens voor transacties met meerdere handtekeningen (in afwachting van integratie van FROST) of beschermt tegen correlaties die zijn gemaakt met openbare *transparante* transacties (bijvoorbeeld wanneer Zcash wordt verhandeld naar/van een andere cryptocurrency) en het verdoezelt ook geen IP-adressen.

Verder lezen hier: [Een afgeschermd ecosysteem](https://electriccoin.co/blog/shielded-ecosystem)

___


## Een paar veelvoorkomende misvattingen

+ Is Zcash een gecentraliseerde munt?
 

   Nee, er is een handelsmerkovereenkomst die de Zcash Foundation of de ECC verhindert actie te ondernemen die in strijd is met de duidelijke consensus van de Zcash-gemeenschap.

   Duidelijke consensus wordt bepaald door middel van opiniepeilingen binnen en buiten het Community Advisory Panel, een groep van ~90 vrijwilligers met uitgebreide interesse in of kennis van het Zcash-ecosysteem.

   Hier beschrijft Messari Research de bewezen geschiedenis van gedecentraliseerd bestuur en gemeenschapsgestuurde besluitvorming van Zcash: https://messari.io/report/decentralizing-zcash

   De verdiensten van on-chain stemmen en het stemmen van munthouders zijn besproken voor een mogelijk toekomstig proof of stake-mechanisme. Het is eerder door de Zcash-gemeenschap gebruikt, zie [hier](https://forum.zcashcommunity.com/t/coin-holder-polling-instructions/40170).

   Projecten zoals de Zcash Foundation A / V-club en ZecHub maken diverse deelname en bijdragen mogelijk van leden van de gemeenschap of individuen die geïnteresseerd zijn in het asynchroon produceren van hoogwaardige inhoud met mogelijkheden om niet-KYC ZEC te verdienen.

   Zie [hier](https://zechub.notion.site/Zcash-Basics-d2946ad9c3b541759174dbcbf0e8c9cc) voor informatie over de belangrijkste Zcash-organisaties + de rollen in het team van elke organisatie.
   
   Zie [hier](https://zechub.notion.site/Zcash-Development-Fund-aa3e0ac2a8514d97aef5254f3b76d7b2) voor meer informatie over hoe het Dev Fund precies is verdeeld over de belangrijkste organisaties.



+ Heeft Zcash een achterdeur?

  Nee, noch Zcash, noch andere cryptografische algoritmen of software die we hebben gemaakt, bevat een achterdeur en dat zullen ze ook nooit doen.



+ Wordt Zcash gecontroleerd door een bedrijf?

   Niet correct. Hoewel Zcash samenwerkt met grote bedrijven en banken voor onderzoek en outreach-programma's, blijven we ons inzetten om het doel van economische vrijheid en veerkracht te bereiken door middel van decentralisatie.
   
   Zcash heeft verschillende organisaties die een zekere mate van autonomie behouden en daarom niet verplicht zijn aan een enkele partij. Werk in plaats daarvan samen om zelfbewaring van activa te bevorderen, onafhankelijke node-implementaties te financieren en toonaangevend te zijn in onderwijs over regelgeving met betrekking tot het verdedigen van digitale privacy en het beschermen van mensenrechten.




+ Zcash heeft beperkte privacy in vergelijking met andere privacymunten
   
    Nee, de privacy die wordt verkregen met een privacymunt zoals Monero of Grin/Litecoin is voornamelijk afhankelijk van het gebruik van lokmiddelen die de bron en bestemming van transacties verdoezelen. Transactiegrafiekgegevens zijn nog steeds toegankelijk.
    
    Als een tegenstander voldoende tijd en middelen zou besteden aan het bewaken van de keten, kan dit soort privacy worden verslagen. Zcash versleutelt alle transactiegegevens zodat dezelfde aanvalsmethode niet zou werken. Alle transacties zijn niet van elkaar te onderscheiden binnen een afgeschermde pool.

    Er is geen perfecte oplossing, vooral als een bepaalde tegenstander toegang heeft tot aanzienlijke tijd en middelen, zoals neurale AI-netwerken. We hebben de (groeiende) omstandigheden gespecificeerd waarin het gunstiger kan zijn om een ​​zero-knowledge-oplossing te gebruiken dan een op lokvogels gebaseerde oplossing.
    [Lees meer](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)


