# Come funziona davvero una transazione schermata di Zcash
##### Ricerca originale di [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](image.png)

### L'intuizione prima della matematica: una spiegazione dei pagamenti privati senza formule

> **Serie:** *Zcash dai primi principi* . **Articolo 0 . L'ancora**
> **Pubblico:** principianti assoluti. Non si presuppone alcuna conoscenza di crittografia, blockchain o matematica.
> **Cosa porterai con te:** un modello mentale corretto di come Zcash nasconde *chi ha pagato chi, e quanto*, pur consentendo al mondo intero di verificare che nessun denaro sia stato falsificato o speso due volte.

Ogni articolo successivo di questa serie approfondisce una singola parte della macchina che stai per incontrare. Quindi, se una parola qui ti sembra vaga, *bene*. È la promessa che ci torneremo sopra e la spiegheremo per bene.

---

## 1. Perché dovrebbe interessarti?

Immagina che il tuo estratto conto fosse inchiodato a un muro nella piazza del paese. Per sempre. Chiunque (il tuo padrone di casa, il tuo datore di lavoro, uno sconosciuto, un futuro datore di lavoro, un governo) potrebbe leggere ogni pagamento dell'affitto, ogni fattura medica, ogni donazione, ogni caffè, e risalire esattamente a chi hai inviato denaro e chi te ne ha inviato.

Non è un'ipotesi distopica. **È più o meno così che funziona Bitcoin.**

Bitcoin viene spesso definito "anonimo", ma non lo è. È *pseudonimo*: il tuo nome non compare nel registro, ma ogni transazione, importo e collegamento tra indirizzi è pubblico e permanente. L'intero settore della "analisi della catena" esiste per smascherare quel sottile pseudonimo e collegare gli indirizzi a persone reali. Una volta che uno dei tuoi indirizzi viene collegato a te, la tua storia finanziaria si dipana.

Zcash è stato costruito per rispondere a una domanda ingannevolmente difficile:

> **Possiamo avere denaro completamente privato, che nasconde mittente, destinatario e importo, pur consentendo a chiunque di verificare che le regole siano state rispettate?**

Questi due obiettivi sono in conflitto tra loro. Un registro pubblico è verificabile *perché* tutti possono vederlo. La privacy significa che nessuno può vederlo. Quindi, come può il pubblico verificare qualcosa che non gli è permesso guardare?

Risolvere questo paradosso è l'intera storia di questa serie. Cominciamo.

---

## 2. Ci sono due mondi dentro Zcash

Prima di tutto, chiariamo un equivoco comune: **Zcash non è "la moneta privata". È una moneta che offre la privacy come opzione.** In realtà è nata come fork di Bitcoin, e porta con sé due sistemi paralleli sulla stessa blockchain.

| | **Mondo trasparente** | **Mondo schermato** |
|---|---|---|
| Privacy | Pubblico, proprio come Bitcoin | Privato |
| Gli indirizzi iniziano con | `t...` | `z...` o `u...` |
| Mittente / destinatario / importo | **Visibile** a tutti | **Nascosto** a tutti |
| Tecnologia sottostante | Registro pubblico in stile Bitcoin | Impegni crittografici + prove a conoscenza zero |

Il denaro può persino attraversare il confine tra i due: spostare i fondi *dentro* il mondo schermato si chiama *schermatura* (shielding), e riportarli fuori si chiama *de-schermatura* (deshielding).

Il mondo trasparente è "il Bitcoin che già più o meno comprendi". È il **mondo schermato** a contenere tutta la bella crittografia, ed è l'unico mondo di cui questa serie si occupa.

![alt text](image-1.png)

---

## 3. L'intuizione: buste sigillate su una bacheca pubblica

Ecco l'unica immagine mentale da portare avanti per il resto dell'articolo. Vi torneremo costantemente.

Immagina un'enorme **bacheca pubblica** che tutti sulla Terra possono vedere in ogni momento.

* **Ricevere denaro** significa che qualcuno appende una **busta sigillata e opaca** alla bacheca. Dentro la busta c'è *quanto denaro contiene* e *un segreto che solo il destinatario può leggere*, perché la busta è bloccata con la chiave personale di quel destinatario. Il mondo intero vede che *è apparsa una busta*. Nessuno tranne il proprietario può vedere cosa c'è dentro.

* **La bacheca può solo crescere.** Le buste non vengono mai strappate o cancellate. Ne vengono appese di nuove sopra, per sempre.

* **Spendere denaro** significa passare dietro una tenda, dimostrare *"possiedo una delle buste non spese su questa bacheca, e mi è permesso aprirla"*, poi lasciare un **gettone di annullamento** unico in un "cestino degli spesi" pubblico e appendere **nuove buste** per chi stai pagando.

Questo piccolo rituale (appendere un gettone di annullamento, appendere nuove buste, tutto da dietro una tenda) *è* un pagamento Zcash. Tutto il resto è dettaglio.

Ora diamo a questi elementi i loro nomi reali.

---

## 4. I cinque sostantivi

Questi cinque termini sono l'intero vocabolario di Zcash schermato. Impara­li come una *storia*, non come un glossario, e ti rimarranno impressi.

| Nella storia | Termine reale di Zcash | Cos'è realmente |
|---|---|---|
| Il contenuto della busta (importo + proprietario + un segreto) | **Note** (nota) | La "moneta" privata: un blocco di valore appartenente a qualcuno |
| La busta sigillata e opaca sulla bacheca | **Note commitment** (impegno della nota) | Un sigillo crittografico che prova l'esistenza di una busta nascondendone il contenuto |
| La bacheca stessa | **Note commitment tree** (albero degli impegni delle note) | Un registro ad aggiunta sola di *ogni nota mai creata* |
| Il gettone di annullamento nel cestino degli "spesi" | **Nullifier** (annullatore) | Un marcatore unico che significa "questa nota è ora stata spesa" |
| La magia "dietro la tenda" | **Zero-knowledge proof** (prova a conoscenza zero) | Una prova che l'intera spesa è valida, senza rivelarne nulla |

Se non ricordi nient'altro di questo articolo, ricorda questa tabella. Tutto ciò che segue spiega semplicemente *perché* ciascun pezzo deve avere la forma che ha.

---

## 5. Perché ogni pezzo ha la forma che ha

Questa è la parte che la maggior parte delle spiegazioni salta, ed è esattamente la parte che distingue "ho memorizzato alcune parole" da "ho capito il design". Ciascuno dei cinque pezzi esiste per risolvere **un problema specifico.**

### Il note commitment: nascondere il contenuto, ma rendere impossibile la falsificazione

Una busta ordinaria può essere aperta al vapore. Un **note commitment** crittografico no. Pensalo come una busta *magicamente* sigillata, completamente opaca, con due superpoteri:

- **Occultamento (hiding)**: guardare la busta sigillata non ti dice *nulla* sull'importo o sul proprietario all'interno.
- **Vincolo (binding)**: una volta sigillata, il contenuto non può essere scambiato. Non puoi in seguito sostenere che la busta contenesse un importo diverso.

Come può un sigillo fare entrambe le cose contemporaneamente? È una domanda reale e a cui si può rispondere. È il tema dell'**Articolo 3 (impegni)**. Per ora, accetta la busta come magica e prosegui.

### Il nullifier: la parte davvero ingegnosa

Quando spendi una nota, pubblichi il suo **nullifier**, il "gettone di annullamento". Questo gettone viene calcolato a partire da *la nota stessa* **e** *dalla tua chiave segreta*. Questa ricetta garantisce tre proprietà simultaneamente, e ciascuna è importante:

1. **Solo il proprietario può crearlo.** Hai bisogno della chiave segreta per calcolarlo, quindi nessuno può spendere le tue note al posto tuo.
2. **È sempre lo *stesso* gettone per una data nota.** Prova a spendere la stessa nota due volte e produrresti il gettone di annullamento *identico* entrambe le volte, e il "cestino degli spesi" pubblico lo contiene già. Doppia spesa rifiutata.
3. **Nessuno può ricollegarlo alla sua busta.** Il gettone di annullamento sembra del tutto scorrelato dalla busta da cui proviene.

Quella terza proprietà è il **cuore della privacy di Zcash**, e merita una sua sezione qui sotto.

### La zero-knowledge proof: la tenda stessa

Tutto avviene dietro una tenda, e ciò che consegni al mondo dopo è una **zero-knowledge proof**, una sorta di certificato non falsificabile. Attesta silenziosamente tutto questo in una volta sola:

- *la busta che sto spendendo è davvero appesa alla bacheca* (è una nota reale ed esistente),
- *mi è davvero permesso aprirla* (possiedo la chiave giusta),
- *il mio gettone di annullamento è calcolato correttamente* (nessun imbroglio sul controllo della doppia spesa),
- *le mie nuove buste contengono esattamente tanto denaro quanto la vecchia*: **nessun denaro creato dal nulla.**

Il miracolo è che la prova non rivela **nessuno** di questi fatti. Non l'importo, non gli indirizzi, non quale busta. Ti convince soltanto che *ogni affermazione qui sopra è vera*. Come ciò sia persino possibile è l'argomento dell'**Articolo 5 (prove a conoscenza zero)**, il culmine della serie.

---

## 6. La vita di una singola nota

Una nota *nasce*, *vive* sulla bacheca e alla fine *muore*, e fondamentalmente la sua nascita e la sua morte sembrano scorrelate per chiunque la osservi.

![alt text](image-2.png)

---

## 7. Un pagamento, dall'inizio alla fine

Osserviamo Alice che paga Bob, con ogni passaggio pubblico e privato etichettato.

![alt text](image-4.png)

Nota l'asimmetria che fa funzionare la privacy:

- **La vecchia nota di Alice** muore tramite un *nullifier* nel cestino degli spesi.
- **La nuova nota di Bob** nasce tramite un fresco *commitment* sulla bacheca.
- Per chiunque osservi, questi due eventi non hanno **alcuna connessione visibile.** La traccia del denaro si raffredda.

> **Come fa Bob a sapere persino di essere stato pagato?** La sua nota è cifrata *con la sua chiave*. Lui scansiona continuamente la bacheca e solo le *sue* buste si aprono per lui, come avere l'unica chiave che combacia con uno specifico insieme di serrature. Il meccanismo dietro tutto questo sono le **viewing key**, un argomento successivo.

---

## 8. Cosa vede il mondo vs. cosa resta nascosto

| Fatto sul pagamento | Visibile al pubblico? |
|---|---|
| Che *una* transazione schermata è avvenuta |  Sì |
| Che ha rispettato tutte le regole (nessuna falsificazione, nessuna doppia spesa) |  Sì (tramite la prova) |
| **Chi** ha inviato il denaro |  Nascosto |
| **Chi** lo ha ricevuto |  Nascosto |
| **Quanto** è stato inviato |  Nascosto |
| **Quale** nota precedente è stata spesa |  Nascosto |

Questa è la risoluzione del paradosso della Sezione 1. Il pubblico verifica le *regole*, non il *contenuto*. Verifica e privacy smettono di combattersi, perché la zero-knowledge proof ti permette di controllare la prima senza toccare la seconda.

---

## 9. Il cuore della questione: perché la busta e il gettone di annullamento non possono essere collegati

Se comprendi questa sola idea, comprendi perché Zcash è privato. Leggila lentamente.

- Una **busta (commitment)** viene appesa alla bacheca quando una nota **nasce**.
- Un **gettone di annullamento (nullifier)** viene lasciato nel cestino quando quella stessa nota viene **spesa**, magari mesi dopo.
- Sono prodotti da **ricette segrete diverse**, e non esiste **alcuna matematica pubblica** che trasformi l'uno nell'altro.

Quindi un osservatore esterno vede un flusso di buste che compaiono e un flusso di gettoni di annullamento che compaiono, ma **non può accoppiarli**. Non può dire "il gettone di annullamento lasciato oggi corrisponde alla busta appesa lo scorso marzo". Il collegamento esiste *solo* all'interno della conoscenza segreta del proprietario della nota, e la zero-knowledge proof conferma che il collegamento è valido *senza rivelarlo.*

Quel collegamento spezzato è ciò di cui le aziende di analisi della catena si nutrono in Bitcoin, ed è ciò che Zcash recide deliberatamente.

> **Metti alla prova la tua intuizione:** Se i nullifier fossero invece calcolati *solo* a partire dalla nota (senza alcuna chiave segreta coinvolta), quale delle tre proprietà della Sezione 5 verrebbe meno, e perché ciò distruggerebbe silenziosamente la privacy? *(Risposta alla fine.)*

---

## 10. Una doverosa precisazione

Questo è un **modello mentale**, non la specifica. Per mantenerlo accessibile ai principianti abbiamo silenziosamente semplificato diverse cose reali: Zcash ha avuto molteplici design schermati (Sprout, poi Sapling, ora Orchard); le transazioni reali possono spendere e creare *diverse* note in una volta; "la bacheca" è tecnicamente un tipo specifico di albero, non una letterale bacheca; e il bilancio del valore è imposto con un'ulteriore contabilità crittografica. Nessuno di questi dettagli cambia la storia che hai appena imparato; la perfeziona. Rimetteremo la precisione, un articolo alla volta, e lo segnaleremo chiaramente ogni volta che lo faremo.

Un buon contenuto educativo si guadagna la fiducia dicendo cosa ha tralasciato. Questa sezione è quella promessa.

---

## 11. I fili che abbiamo aperto (la tua mappa della serie)

Ogni "ci torneremo sopra" qui sopra è un filo. Ecco dove ciascuno viene annodato:

![alt text](image-29.png)

| Filo lasciato in sospeso da questo articolo | Dove viene risolto |
|---|---|
| Come può una busta sigillata essere sia nascondente *che* non falsificabile? | Articolo 3: impegni |
| Da dove vengono le chiavi e le ricette segrete? | Articoli 1 e 2: campi e curve |
| Cos'è esattamente "la bacheca"? | Articolo 4: alberi di Merkle |
| Come puoi provare qualcosa senza rivelare nulla? | Articolo 5: prove a conoscenza zero |
| Come si incastrano tutti e cinque i pezzi nel vero Zcash? | Articolo 6: il protocollo schermato |

---

## 12. Riepilogo

- Bitcoin è **trasparente**; Zcash offre un mondo **schermato** in cui mittente, destinatario e importo sono nascosti.
- L'apparente paradosso (*privato eppure pubblicamente verificabile*) è il punto centrale, ed è risolvibile.
- Un pagamento schermato è composto da cinque pezzi che si incastrano: una **note** (la moneta), un **note commitment** (la busta sigillata), il **note commitment tree** (la bacheca pubblica), un **nullifier** (il gettone di annullamento che impedisce le doppie spese) e una **zero-knowledge proof** (la tenda che prova la validità senza rivelare nulla).
- La privacy si fonda in ultima analisi su **un collegamento reciso**: nessuno all'esterno può connettere la nascita di una nota (commitment) alla sua morte (nullifier).
- Il pubblico verifica le **regole**, mai il **contenuto**.

Ora hai in mano la mappa. Il resto della serie la riempie.

---

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| **Note** | Un'unità privata di valore, l'equivalente Zcash di una moneta o di una banconota |
| **Note commitment** | Un sigillo crittografico che prova l'esistenza di una nota senza rivelarla |
| **Note commitment tree** | Il registro pubblico ad aggiunta sola di tutti i note commitment |
| **Nullifier** | Un marcatore unico di "speso" pubblicato quando una nota viene usata, che impedisce le doppie spese |
| **Zero-knowledge proof** | Una prova che un'affermazione è vera senza rivelare nulla oltre alla sua veridicità |
| **Shielding / deshielding** | Spostare i fondi dentro / fuori dal mondo privato schermato |
| **Viewing key** | La chiave che permette al proprietario di rilevare e leggere le note indirizzate a lui |

---

## FAQ

**Zcash è sempre privato?**
No. La privacy si applica al mondo *schermato* (indirizzi `z...`/`u...`). Le transazioni trasparenti (`t...`) sono pubbliche, come Bitcoin.

**Se tutto è nascosto, cosa impedisce a qualcuno di stampare denaro gratis?**
La zero-knowledge proof. Costringe matematicamente gli output di ogni transazione a essere coperti da input reali e non spesi, *pur* mantenendo segreti gli importi.

**La stessa nota può essere spesa due volte?**
No. Spendere una nota pubblica il suo nullifier; un secondo tentativo pubblicherebbe il nullifier identico, che è già nel "cestino degli spesi", quindi la rete lo rifiuta.

**Gli osservatori esterni possono collegare un mittente a un destinatario?**
No. Il commitment (nascita della nota) e il nullifier (morte della nota) non possono essere accoppiati da nessuno senza la conoscenza segreta del proprietario.

---

### Risposta al test di intuizione (Sezione 9)

Se il nullifier fosse calcolato *solo* a partire dalla nota, senza alcuna chiave segreta, allora **chiunque** potrebbe calcolarlo, violando la proprietà #1 (solo il proprietario può spendere). Peggio ancora, il nullifier sarebbe ora derivabile direttamente da informazioni pubbliche sulla nota, il che potrebbe permettere agli osservatori di **collegare il nullifier al suo commitment**, violando la proprietà #3 e disfacendo silenziosamente la privacy dell'intero sistema. La chiave segreta è ciò che rende il gettone di annullamento al tempo stesso *esclusivamente tuo* e *non collegabile.*

---

### Cosa viene dopo

**Articolo 1 . Campi finiti:** lo strano e bellissimo sistema numerico in cui l'aritmetica "si avvolge su se stessa", e il motivo per cui ogni pezzo di crittografia di questa serie vi risiede. Inizieremo, come sempre, con l'intuizione, senza formule finché non saranno meritate.

*Parte della serie* Zcash dai primi principi *per [ZecHub](https://zechub.org). Concessa in licenza CC BY-SA 4.0.*
