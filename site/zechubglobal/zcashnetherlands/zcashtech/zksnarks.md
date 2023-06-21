# ZKP & ZK-SNARKS

## Wat is een bewijs?

Bewijzen vormen de basis voor alle wiskunde. Een bewijs is een bewering of stelling die u probeert te bewijzen en een reeks afleidingen die zijn gemaakt om te verklaren dat de stelling bewezen is. bijv. alle hoeken in een driehoek totaal 180° kunnen door iedereen onafhankelijk gecontroleerd worden (verifier).

**Bewijzen**

Prover ---> Claimt ---> Verificateur kiest ---> Accepteren/Weigeren

(Zowel de proverifier als de verifier zijn algoritmen)

In de informatica is de term voor efficiënt verifieerbare bewijzen NP-bewijzen. Deze korte bewijzen kunnen worden geverifieerd in polynomiale tijd. Het algemene idee is: "Er bestaat een oplossing voor een stelling en deze wordt doorgegeven aan de verificateur om deze te controleren"

![NP-bewijzen](https://cdn.discordapp.com/attachments/860525418008674327/1070395089559494716/NPlanguage.jpg "NP-taal")


In een NP-taal = moeten twee voorwaarden gelden:

Volledigheid: Ware beweringen worden geaccepteerd door de verificateur (staat eerlijke beoordelaars toe om tot verificatie te komen)

Deugdelijkheid: Valse beweringen zullen geen bewijs hebben (voor alle bedrieglijke bewijsstrategieën zullen ze niet in staat zijn om de juistheid van onjuiste beweringen te bewijzen).


### Interactieve en probabalistische bewijzen

**Interactie**: in plaats van alleen het bewijs te lezen, grijpt de verificateur heen en weer over meerdere berichtrondes.

**Willekeurigheid**: Verificatieverzoeken om te bewijzen zijn willekeurig en de bewijsverificatie moet in staat zijn om op elk verzoek correct te antwoorden.

![IP-bewijzen](https://cdn.discordapp.com/attachments/860525418008674327/1070395089194594345/IPmodel.jpg "IP-protocol")

Door interactie en willekeur samen te gebruiken, is het mogelijk om een ​​claim te bewijzen aan een blinde verificateur in Probabilistic Polynomial Time (PPT).

Kunnen interactieve bewijzen op efficiënte wijze meer verifiëren dan NP-bewijzen?

NP-bewijzen versus IP-bewijzen:

| verklaring | NP | IP |
|-------------|-----------|--------|
| NP | ja | ja |
| CO-NP | nee | ja |
| #P| nee | ja |
| PSPACE | nee | ja |


NP - Er bestaat een oplossing voor een bewering

CO-NP - Bewijzen dat er geen oplossingen zijn voor een stelling

#P - Om te tellen hoeveel oplossingen er zijn voor een bewering

PSPACE - Een afwisseling van verschillende verklaringen bewijzen

### Wat is nulkennis?

Wat een verificateur na een interactie kan berekenen, is identiek aan wat hij eerder kon bewijzen. De interactie over meerdere rondes tussen de prover & verificateur heeft de rekenkracht van de verificateur niet vergroot.

**Het simulatieparadigma**

Dit experiment bestaat overal in cryptografie. Het presenteert een "Real View" & "Simulated View".

Real View: Alle mogelijke geschiedenissen van interacties tussen Prover & Verifier (P,V)

Gesimuleerde weergave: de verifier simuleert alle mogelijke interacties tussen Prover & Verifier

![simulatieparadigma](https://cdn.discordapp.com/attachments/860525418008674327/1070395090259947520/simulation.jpg "Simulatieparadigma")

Een polynoom-tijdonderscheider probeert vast te stellen of ze naar de echte of gesimuleerde weergave kijken en vraagt ​​herhaaldelijk om een ​​monster van beide.

Er wordt gezegd dat de twee weergaven "computationeel niet te onderscheiden" zijn als voor alle onderscheidende algoritmen / strategieën, zelfs na ontvangst van een polynoom aantal monsters van echt of gesimuleerd, de waarschijnlijkheid> 1/2 is.

**Zero-Knowledge Argumenten van Kennis**

Een interactief protocol (P, V) is nulkennis als er een simulator (algoritme) bestaat, zodat voor elke kanspolynoom-tijdverificateur (wanneer de stelling correct is), de kansverdelingen die de reële waarde bepalen vanuit gesimuleerde weergave rekenkundig niet te onderscheiden zijn.

Interactieve protocollen zijn handig als er één verificateur is. Een voorbeeld is een belastingcontroleur in een zero-knowledge 'bewijs van belastingen'-toepassing.

## Wat is een SNARK?

**Beknopt niet-interactief kennisargument**

Brede definitie - Een beknopt bewijs dat een bewering waar is. Het bewijs moet kort en snel te verifiëren zijn. In SNARKS wordt een enkel bericht verzonden van Prover naar Verifier. De verificateur kan dan kiezen om te accepteren of af te wijzen.

voorbeeld statement: "Ik ken een bericht (m) zodanig dat SHA256(m)=0"

In een zk-SNARK zegt het bewijs niets over de boodschap (m).

**Veeltermen**: Sommen van termen die een constante (zoals 1,2,3), variabelen (zoals x,y,z) en exponenten van variabelen (zoals x², y³) bevatten.

voorbeeld: "3x² + 8x + 17"

**Rekenkundig circuit**: een model voor het berekenen van polynomen. Meer in het algemeen kan het worden gedefinieerd als een gerichte acyclische grafiek waarop op elk knooppunt van de grafiek een rekenkundige bewerking wordt uitgevoerd. De schakeling bestaat uit optelpoorten, vermenigvuldigingspoorten en enkele constantepoorten. Op dezelfde manier dragen Booleaanse circuits bits in draden, Rekenkundige circuits dragen gehele getallen.

![circuit](https://cdn.discordapp.com/attachments/860525418008674327/1070405388048011305/circuit.jpg "DAG")

In dit voorbeeld wil de bewijzer de verificateur ervan overtuigen dat hij een oplossing kent voor het rekenkundige circuit.

**Toezeggingen**: Om dit te doen, zal de proever alle waarden (privé en openbaar) die aan het circuit zijn gekoppeld, in een toezegging plaatsen. Toezeggingen verbergen hun invoer door een functie te gebruiken waarvan de uitvoer onomkeerbaar is.

Sha256 is een voorbeeld van een hashing-functie die kan worden gebruikt in een commitment-schema.

Nadat de bewijzer zich aan de waarden heeft gebonden, worden de toezeggingen naar de verificateur gestuurd (in de overtuiging dat ze geen van de oorspronkelijke waarden kunnen ontdekken). De bewijzer kan dan aan de verificateur kennis tonen van elk van de waarden op de knooppunten van de grafiek.

**Fiat-Shamir-transformatie**

Om het protocol *niet-interactief* te maken, genereert de prover willekeurigheid (gebruikt voor de verborgen uitdaging) namens de verificateur met behulp van een cryptografische hash-functie. Dit staat bekend als het willekeurige orakel. De bewijzer kan vervolgens een enkel bericht naar de verificateur sturen, die vervolgens kan controleren of het correct is.

Om een ​​SNARK te vormen die gebruikt kan worden voor algemene circuits zijn twee elementen nodig:

Functioneel commitment-schema: stelt een committer in staat zich te committeren aan een polynoom met een korte reeks die door een verificateur kan worden gebruikt om geclaimde evaluaties van het vastgelegde polynoom te bevestigen.

Polynoom interactief orakel: Verifier vraagt ​​prover (algoritme) om alle toezeggingen op verschillende punten naar keuze te openen met behulp van een polynoom toezeggingsschema en controleert de identiteit tussen hen.

**Opgericht**

Installatieprocedures helpen de verificateur door een circuit samen te vatten en openbare parameters uit te voeren.

![Setup](https://cdn.discordapp.com/attachments/860525418008674327/1070395089899229245/setup.jpg "Setup")

**Soorten instellingen voor voorbewerking**:

Trusted Setup per circuit - Wordt één keer per circuit uitgevoerd. Is specifiek voor een circuit en de geheime willekeur (Common Reference String) moet geheim worden gehouden + vernietigd.

Een gecompromitteerde opstelling in deze methode betekent dat een oneerlijk bewijsmiddel valse verklaringen kan bewijzen.

Vertrouwde maar universele setup - hoeft slechts één keer een vertrouwde setup uit te voeren en kan vervolgens meerdere circuits deterministisch voorbewerken.

Transparante setup (geen vertrouwde setup) - Het voorverwerkingsalgoritme gebruikt helemaal geen geheime willekeur.


**Soorten SNARK-proof constructies**:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Vereist vertrouwde installatie, maar heeft zeer korte bewijzen die snel kunnen worden geverifieerd.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): Universeel vertrouwde setup.

[DONKER](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK]( https://www.youtube.com/watch?v=wFZ_YIetK1o): Geen vertrouwde installatie, maar maak iets langere proefdrukken of het kan langer duren voordat de proef wordt uitgevoerd.

SNARKS zijn handig wanneer meerdere verificateurs nodig zijn, zoals een blockchain zoals Zcash of zk-Rollup zoals [Aztec](https://docs.aztec.network), zodat meerdere validerende knooppunten niet gedurende meerdere rondes met elkaar hoeven te communiceren bewijs.

## Hoe worden zk-SNARK's geïmplementeerd in Zcash?

Over het algemeen zijn nulkennisbewijzen een hulpmiddel om eerlijk gedrag in protocollen af ​​te dwingen zonder enige informatie vrij te geven.

Zcash is een openbare blockchain die privétransacties mogelijk maakt. zk-SNARK's worden gebruikt om te bewijzen dat een privétransactie geldig is binnen de netwerkconsensusregels zonder enige andere details over de transactie bekend te maken.

[Video Explainer](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - In deze lezing geeft Ariel Gabizon beschrijvingen van de Zcash Note Commitment Tree, Blind Polynomial Evaluation & Homomorphically Hidden Challenges en hoe deze worden geïmplementeerd op de netwerk.

Lees het [Halo2-boek](https://zcash.github.io/halo2/index.html) voor meer informatie.

## Andere Zero-Knowledge-applicaties

zk-SNARKS bieden verschillende voordelen in een groot aantal verschillende toepassingen. Laten we een paar voorbeelden bekijken.

**Schaalbaarheid**: Dit wordt bereikt door 'Outsourcing Computation'. Er is geen strikte behoefte aan nulkennis voor een L1-keten om het werk van een off-chain service te verifiëren. Transacties zijn niet noodzakelijkerwijs privé op een zk-EVM.

Het voordeel van een op bewijs gebaseerde Rollup-service (zk-Rollup) is het verwerken van een batch van honderden/duizenden transacties en de L1 kan een beknopt bewijs verifiëren dat alle transacties correct zijn verwerkt, waardoor de transactiedoorvoer van het netwerk wordt vergroot met een factor van 100 of 1000.

![zkvm](https://cdn.discordapp.com/attachments/860525418008674327/1070395090612265000/zkvm.jpg "ZKVM")

**Interoperabiliteit**: Dit wordt bereikt op een zk-Bridge door activa op een bronketen te 'vergrendelen' en aan de doelketen te bewijzen dat de activa zijn vergrendeld (bewijs van consensus).

**Compliance**: Projecten zoals [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) kunnen bewijzen dat een privétransactie voldoet aan lokale bankrichtlijnen wetten zonder de details van de transactie bekend te maken.

**Bestrijding van desinformatie**: Van verschillende voorbeelden buiten blockchain en cryptocurrency, het gebruik van bewijsgeneratie op afbeeldingen die zijn verwerkt door nieuws- en mediakanalen om kijkers in staat te stellen onafhankelijk de bron van een afbeelding en alle daarop uitgevoerde bewerkingen te verifiëren. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Verder leren:

[Zero-Knowledge Bibliography - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK's met Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 en SNARKs zonder vertrouwde instellingen - Sean Bowe over Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Zero Knowledge Proofs with Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Interactive Zero-Knowledge Proofs - Chainlink-artikel](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Lezing 1: Inleiding en geschiedenis van ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Eenvoudige uitleg van rekenkundige circuits - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Schaalbaarheid is saai, privacy is dood: ZK-bewijzen, waar zijn ze goed voor?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

