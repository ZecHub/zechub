# FROST 


## Wat is een Schnorr-handtekening?

Een digitale handtekening van Schnorr is een reeks algoritmen: (KeyGen, Sign, Verify).

Schnorr-handtekeningen hebben verschillende voordelen. Een belangrijk voordeel is dat wanneer meerdere sleutels worden gebruikt om hetzelfde bericht te ondertekenen, de resulterende handtekeningen kunnen worden gecombineerd tot één handtekening. Dit kan worden gebruikt om de omvang van multisig-betalingen en andere multisig-gerelateerde transacties aanzienlijk te verminderen.


## Wat is FROST ?

**Flexibele, voor rondes geoptimaliseerde Schnorr-drempelhandtekeningen** -
*Gemaakt door Chelsea Komlo (Universiteit van Waterloo, Zcash Foundation) & Ian Goldberg (Universiteit van Waterloo).*

FROST is een drempelhandtekening en protocol voor het genereren van gedistribueerde sleutels dat minimale communicatierondes biedt en dat veilig parallel kan worden uitgevoerd. FROST-protocol is een drempelversie van het Schnorr-handtekeningschema.

In tegenstelling tot handtekeningen in een single-party setting, vereisen drempelhandtekeningen samenwerking tussen een drempelaantal ondertekenaars die elk een deel van een gemeenschappelijke privésleutel bezitten.

[Wat zijn drempelhandtekeningen? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Bijgevolg zorgt het genereren van handtekeningen met een drempelinstelling voor overhead als gevolg van netwerkrondes tussen ondertekenaars, wat kostbaar blijkt te zijn wanneer geheime shares worden opgeslagen op netwerkbeperkte apparaten of wanneer coördinatie plaatsvindt via onbetrouwbare netwerken.

Netwerkoverhead tijdens ondertekeningsoperaties wordt verminderd door een nieuwe techniek te gebruiken om te beschermen tegen vervalsingsaanvallen die van toepassing zijn op andere schema's.
 
FROST verbetert ondertekeningsprotocollen met drempelwaarde omdat een onbeperkt aantal ondertekeningsbewerkingen veilig parallel kan worden uitgevoerd (concurrency).
 
Het kan worden gebruikt als een 2-rondenprotocol waarbij ondertekenaars in totaal 2 berichten verzenden en ontvangen, of geoptimaliseerd tot een enkelronden-ondertekeningsprotocol met een voorverwerkingsfase.

FROST realiseert zijn efficiëntieverbeteringen gedeeltelijk door het protocol te laten afbreken in aanwezigheid van een zich misdragende deelnemer (die vervolgens wordt geïdentificeerd en uitgesloten van toekomstige operaties).
 
Beveiligingsbewijzen die aantonen dat FROST veilig is tegen aanvallen met gekozen berichten, ervan uitgaande dat het probleem van de discrete logaritme moeilijk is en de tegenstander minder deelnemers beheert dan de drempel, worden [hier](https://eprint.iacr.org/2020/852.pdf) gegeven #pagina=16).


## Hoe werkt FROST?

Het FROST-protocol bevat twee belangrijke componenten:

Ten eerste voeren n deelnemers een *distributed key generation (DKG)-protocol* uit om een ​​gemeenschappelijke verificatiesleutel te genereren; aan het einde verkrijgt elke deelnemer een privé geheime sleutelaandeel en een openbaar verificatiesleutelaandeel.

Daarna kunnen alle t-uit-n-deelnemers een *drempelondertekeningsprotocol* uitvoeren om gezamenlijk een geldige Schnorr-handtekening te genereren.

![Drempelteken](https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg "thresholdsign")


**Gedistribueerde sleutelgeneratie (DKG)**

Het doel van deze fase is het genereren van geheime sleutelaandelen met een lange levensduur en een gezamenlijke verificatiesleutel. Deze fase wordt geleid door n deelnemers.

FROST bouwt zijn eigen fase voor het genereren van sleutels voort op [Pedersen's DKG (GJKR03)](https://blog.gtank.cc/notes-on-threshold-signatures/) waarin zowel Shamir-geheimen delen als Feldmans verifieerbare geheimen delen-schema's worden gebruikt als subroutines. Bovendien moet elke deelnemer kennis van zijn eigen geheim aantonen door andere deelnemers een nulkennisbewijs te sturen, dat zelf een Schnorr-handtekening is. Deze extra stap beschermt tegen malafide-sleutelaanvallen in de omgeving waar t ≥ n/2.

Aan het einde van het DKG-protocol wordt een gezamenlijke verificatiesleutel vk gegenereerd. Ook heeft elke deelnemer P ᵢ een waarde (i, sk ᵢ ) die zijn langlevende geheime share is en een verificatiesleutelshare vk ᵢ = sk ᵢ *G. De verificatiesleutelaandeel vk ᵢ van deelnemer Pᵢ wordt door andere deelnemers gebruikt om de juistheid van de handtekeningaandelen van Pᵢ in de ondertekeningsfase te verifiëren, terwijl de verificatiesleutel vk door externe partijen wordt gebruikt om door de groep uitgegeven handtekeningen te verifiëren.

**Drempelondertekening**

Deze fase bouwt voort op bekende technieken die additieve geheimdeling en deelconversie gebruiken om op niet-interactieve wijze de nonce voor elke handtekening te genereren. Deze fase maakt ook gebruik van bindingstechnieken om bekende vervalsingsaanvallen te voorkomen zonder gelijktijdigheid te beperken.

Preprocessing: In de preprocessing-fase bereidt elke deelnemer een vast aantal Elliptic Curve (EC)-puntenparen voor verder gebruik voor, dat één keer wordt uitgevoerd voor meerdere drempelondertekeningsfasen.

![Preprocessing](https://i.ibb.co/nQD1c3n/preprocess.png "preprocess stage")

Ondertekeningsronde 1: Elke deelnemer Pᵢ begint met het genereren van een enkel privé nonce-paar (dᵢ, eᵢ) en een bijbehorend paar EC-punten (Dᵢ, Eᵢ) en zendt dit paar punten uit naar alle andere deelnemers. Elke deelnemer slaat deze paren ontvangen EC-punten op voor later gebruik. Tekenronde 2 en 3 zijn de eigenlijke operaties waarbij t-op-n deelnemers samenwerken om een ​​geldige Schnorr-handtekening te creëren.

Ondertekeningsronde 2: Om een ​​geldige Schnorr-handtekening te maken, werken alle deelnemers samen om deze ronde uit te voeren. De kerntechniek achter deze ronde is het t-uit-t-additief delen van geheimen.

Deze stap voorkomt aanval op vervalsing omdat aanvallers handtekeningshares over verschillende ondertekeningsbewerkingen niet kunnen combineren of de set ondertekenaars of gepubliceerde punten voor elke ondertekenaar kunnen permuteren.

![Ondertekeningsprotocol](https://i.ibb.co/b5rJbXx/sign.png "ondertekeningsprotocol")

Nadat de uitdaging c is berekend, kan elke deelnemer de respons zᵢ op de uitdaging berekenen met behulp van de nonces voor eenmalig gebruik en de geheime aandelen op lange termijn, die t-uit-n (graad t-1) Shamir geheime aandelen zijn van de langlevende sleutel van de groep. Aan het einde van ondertekeningsronde 2 zendt elke deelnemer zᵢ uit naar andere deelnemers.

[Lees het volledige artikel](https://eprint.iacr.org/2020/852.pdf)


## Komt het Zcash ten goede?

Absoluut ja. Door de introductie van FROST in Zcash kunnen meerdere partijen, geografisch gescheiden, de bestedingsbevoegdheid van afgeschermde ZEC controleren. Een voordeel is dat transacties die worden uitgezonden met behulp van dit handtekeningschema niet te onderscheiden zijn van andere transacties op het netwerk, waardoor een sterke weerstand tegen het volgen van betalingen behouden blijft en de hoeveelheid beschikbare blockchain-gegevens voor analyse wordt beperkt.

In de praktijk zorgt dit ervoor dat een hele reeks nieuwe applicaties op het netwerk kan worden gebouwd, variërend van escrow-providers of andere niet-bewarende diensten.

FROST zal ook een essentieel onderdeel worden in de veilige uitgifte en het beheer van Zcash Shielded Assets (ZSA), waardoor een veiliger beheer van de uitgavenautoriteit binnen ontwikkelingsorganisaties en ZEC-bewaarders mogelijk wordt, zoals uitwisselingen door het vertrouwen verder te verspreiden en deze mogelijkheid ook aan Zcash-gebruikers te bieden.


## FROST gebruik in het bredere ecosysteem

**FROST in [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Om de efficiëntie van Coinbase's drempelondertekeningssystemen te verbeteren, ontwikkelden ze een versie van FROST. De Coinbase-implementatie brengt kleine wijzigingen aan ten opzichte van het oorspronkelijke FROST-concept.

Ze kozen ervoor om de rol van aggregator voor handtekeningen niet te gebruiken. In plaats daarvan is elke deelnemer een aggregator van handtekeningen. Dit ontwerp is veiliger: alle deelnemers aan het protocol verifiëren wat anderen hebben berekend om een ​​hoger beveiligingsniveau te bereiken en risico's te verminderen. Ook is de (eenmalige) voorbewerkingsfase verwijderd om de implementatie te versnellen en is er een derde ondertekeningsronde voor in de plaats gekomen.

___

**[ROAST](https://eprint.iacr.org/2022/550.pdf) door Blockstream**

Een toepassingsspecifieke verbetering ten opzichte van FROST voorgesteld voor gebruik op [Blockstream's Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) voor Bitcoin.

"ROAST is een simpele omhulling rond drempelondertekenschema's zoals FROST. Het garandeert dat een quorum van eerlijke ondertekenaars, bijvoorbeeld de Liquid-functionarissen, altijd een geldige handtekening kan krijgen, zelfs in de aanwezigheid van verstorende ondertekenaars wanneer netwerkverbindingen een willekeurig hoge latentie hebben."

___

**VORST in IETF**

De Internet Engineering Task Force, opgericht in 1986, is de belangrijkste organisatie voor de ontwikkeling van standaarden voor internet. De IETF maakt vrijwillige standaarden die vaak worden overgenomen door internetgebruikers, netwerkoperators en leveranciers van apparatuur, en helpt zo het traject van de ontwikkeling van internet vorm te geven.

FROST versie 11 (variant met twee ronden) is [ingediend bij IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/).

Dit is een belangrijke stap voor de volledige evaluatie van FROST als een nieuwe standaard voor handtekeningschema's voor gebruik op internet, in hardwareapparaten en voor andere diensten in de komende jaren.
___


Verder leren:

[Coinbase-artikel - Threshold-handtekeningen](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Uitleg en voorbeeld](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Korte video over digitale handtekeningen van Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___





