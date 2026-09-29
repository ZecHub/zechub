![alt text](image-1.png)
# Che cos'è la verifica formale?

### Come dimostrare che un programma è corretto, invece di limitarsi a sperarlo

> **Serie:** *Serie sulla verifica formale* · **Parte 1 di 3**
> **Pubblico:** principianti assoluti. Non è richiesta alcuna conoscenza di matematica, programmazione o crittografia.
> **Cosa vi resterà:** una chiara comprensione di cosa significa *dimostrare* che un software è corretto, perché questo è fondamentalmente diverso dal testarlo, cosa sia una dimostrazione verificata da una macchina e i limiti precisi (e onesti) di ciò che tale dimostrazione può garantire.

La maggior parte dei software è considerata affidabile perché è stata *testata*: la eseguiamo con molti input e osserviamo come si comporta. La verifica formale pone una domanda più ambiziosa. Possiamo *dimostrare*, con certezza matematica, che un sistema fa ciò che deve per **ogni** possibile input, compresi quelli che nessuno ha mai pensato di provare? Questo articolo costruisce questa idea dalle basi. Prima l'intuizione, nessun simbolo finché non sarà necessario.

---

## 1. Perché dovrebbe interessarvi?

Ecco una storia vera, ed è il motivo per cui questa serie esiste.

Nel 2022, la criptovaluta incentrata sulla privacy Zcash ha lanciato un nuovo pool schermato chiamato Orchard, permettendo alle persone di effettuare transazioni con gli importi nascosti. Per quattro anni ha funzionato senza difetti e ha superato ripetuti audit professionali. Poi, nel maggio 2026, un ricercatore di sicurezza, ragionando attentamente sulla matematica sottostante (con l'aiuto di strumenti di IA), ha individuato un singolo punto **sottovincolato** nella matematica del sistema. Quella sola lacuna avrebbe potuto permettere a un attaccante di creare una quantità *illimitata* di denaro contraffatto e, poiché gli importi erano nascosti, nessuno avrebbe visto che stava accadendo. Il difetto era stato presente per tutto il tempo.

Non è stato scoperto dai test. Ogni test aveva avuto esito positivo per quattro anni. È stato scoperto da qualcuno che *ragionava sulla matematica*. E quando il team lo ha corretto, non si è limitato a rilasciare una patch e andare avanti. Ha scritto una **dimostrazione matematica verificata da una macchina**, composta da oltre 2.700 teoremi individuali, che il sostituto non poteva contenere affatto quella classe di difetto.

Questa è la verifica formale, ed è ciò che vi offre: non «abbiamo provato molti casi e hanno funzionato», bensì «abbiamo dimostrato che vale per ogni caso». Per sistemi in cui un solo caso trascurato è catastrofico (denaro, aeromobili, dispositivi medici, crittografia), questa differenza è tutto.

Il punto cieco dei test è stato definito decenni fa dall'informatico Edsger Dijkstra, ed è ancora vero:

> **I test possono mostrare la *presenza* di bug, ma mai la loro *assenza*.**

Se un test ha esito positivo, avete imparato che il sistema funziona *con quell'input*. Non avete imparato nulla sugli input che non avete provato, e i bug pericolosi si trovano quasi sempre nei casi che nessuno ha provato.

---

## 2. L'intuizione: controllare porte contro dimostrare l'edificio

Immaginate di essere responsabili di un edificio con mille porte e che il vostro compito sia garantire che ogni porta sia chiusa a chiave di notte.

- **L'approccio basato sui test:** fate il giro e provate un campione di porte. Ne provate cinquanta, cento, cinquecento. Ognuna di quelle che provate è chiusa a chiave, quindi la vostra fiducia cresce. Ma non le avete provate tutte, e l'unica porta non chiusa potrebbe essere una di quelle saltate.
- **L'approccio della verifica formale:** esaminate il *sistema di chiusura stesso* e dimostrate, a partire dalla sua progettazione, che premere il pulsante «chiudi» attiva necessariamente ogni porta. Ora non avete affatto bisogno di provare le singole porte. Avete mostrato che *nessuna possibile porta può rimanere aperta*, perché il meccanismo lo rende impossibile.

La differenza è tra **campionare la realtà** e **dimostrare una proprietà della progettazione**. I test campionano. La verifica formale dimostra. Questa è l'intera idea, e tutto il resto è il meccanismo per realizzarla rigorosamente.

![alt text](image-2.png)

---

## 3. I tre pilastri di ogni verifica formale

Ogni verifica formale, per quanto avanzata, è costruita esattamente da tre ingredienti. Teneteli ben chiari e il resto sono dettagli.

| Pilastro | Significato semplice | Analogia con l'edificio |
|---|---|---|
| **Specifica** | Un'affermazione precisa di cosa *significhi* «corretto» | «Ogni porta deve essere chiusa a chiave di notte» |
| **Sistema** | L'oggetto effettivamente controllato (un programma, un circuito, un protocollo) | L'edificio e il suo meccanismo di chiusura |
| **Dimostrazione** | Un argomento rigoroso secondo cui il sistema soddisfa sempre la specifica | La dimostrazione logica che premere «chiudi» chiude tutte le porte |

E un quarto ingrediente, più discreto, rende affidabile l'intera cosa:

- **Un verificatore automatico.** La dimostrazione non viene scritta da un essere umano e semplicemente valutata a occhio. Viene fornita a un programma (un **assistente di dimostrazione**, chiamato anche **dimostratore di teoremi**) che controlla *ogni singolo passaggio logico*. Un essere umano può gesticolare o commettere un errore sottile; la macchina non accetterà un passaggio che non segua rigorosamente. Per questo diciamo che il risultato è **verificato da una macchina**.

![alt text](image-3.png)

Tra gli assistenti di dimostrazione di cui potreste sentire parlare ci sono **Lean**, **Rocq** (in precedenza Coq) e **Isabelle**. Sono, in effetti, motori straordinariamente rigorosi per il controllo della logica. La dimostrazione Zcash della nostra storia iniziale è stata scritta in **Lean**. In particolare, i moderni modelli di IA vengono sempre più utilizzati per aiutare a *scrivere* queste dimostrazioni, guidati dagli esseri umani, riducendo lavori che un tempo richiedevano anni a settimane. La macchina controlla comunque ogni passaggio, quindi l'accelerazione non sacrifica alcuna certezza.

---

## 4. Cos'è davvero una dimostrazione

La parola «dimostrazione» può sembrare intimidatoria, quindi rendiamola più chiara con un esempio concreto e verificabile. Nessuna crittografia, solo aritmetica scolastica.

**Affermazione:** per ogni numero intero `n`, la somma `0 + 1 + 2 + ... + n` è uguale a `n(n+1)/2`.

Potreste *testarla*. `n = 5` dà `0+1+2+3+4+5 = 15`, e `5 × 6 / 2 = 15`. ✓ Coincide. Provate `n = 10`: la somma è `55`, e la formula dà `10 × 11 / 2 = 55`. ✓ (Questi valori sono calcolati e confermati; l'affermazione vale infatti per ogni `n` da 0 a 999 se verificata direttamente.)

Ma testare valori, anche mille di essi, non raggiunge il concetto di «per **ogni** numero intero». Ce ne sono infinitamente molti. Una **dimostrazione** colma quell'intervallo infinito con un argomento finito, usando una tecnica chiamata **induzione**:

1. **Caso base:** per `n = 0`, la somma è semplicemente `0`, e la formula dà `0 × 1 / 2 = 0`. Coincidono. ✓
2. **Passo induttivo:** *supponete* che la formula valga per un certo numero `k`. Ora aggiungete il numero successivo, `k+1`. La somma fino a `k+1` è `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Una riga di algebra la riordina in `(k+1)(k+2)/2`, che è esattamente la formula con `k+1` al posto di `k`. ✓

Poiché vale all'inizio (0) e ogni passaggio la trasferisce al numero successivo, vale per **tutti** i numeri interi, per sempre, con un unico argomento finito. Questa è una dimostrazione. Un assistente di dimostrazione esegue esattamente questo ragionamento, ma verifica meccanicamente che ogni passaggio, inclusa la «riga di algebra», derivi realmente da ciò che lo precede.

> Il salto concettuale da assimilare: una dimostrazione trasforma «infiniti casi» in un **argomento finito e verificabile**. Questo è il superpotere che i test strutturalmente non possiedono.

---

## 5. Dove vivono davvero i bug

La verifica formale è potente anche grazie a un'intuizione chiarificatrice su *dove* nascano i bug. Ogni difetto in un sistema che applica regole risale a uno di tre punti:

| Fonte di un bug | Cosa significa | Possiamo eliminarlo con una dimostrazione? |
|---|---|---|
| **La specifica** | La matematica o le regole stesse sono errate (una condizione mancante, una definizione sbagliata) | **Sì**, direttamente: questo è il campo d'azione della verifica formale |
| **L'implementazione** | Il codice non realizza fedelmente una specifica corretta | In parte; spesso tali errori lasciano tracce rilevabili |
| **Un'assunzione errata** | Qualcosa su cui l'intero sistema fa affidamento risulta falso | No; le assunzioni sono il fondamento irriducibile |

Questa tassonomia conta più di quanto sembri, e le Parti 2 e 3 dipendono da essa. I bug più profondi e pericolosi, quelli che possono rimanere nascosti per sempre, tendono a risiedere nella **specifica**: la descrizione matematica di ciò che il sistema dovrebbe fare. E la specifica è esattamente ciò che una dimostrazione verificata da una macchina può esaminare direttamente, tutti i casi contemporaneamente. Ecco perché gli sforzi seri di verifica formale mirano prima di tutto a quel punto.

![alt text](image-4.png)

---

## 6. L'avvertenza più importante dell'intero campo

La verifica formale è potente, ma la sua promessa è precisa e fraintenderla porta fuori strada. Quindi esprimiamola con attenzione:

> **Una dimostrazione garantisce che il *sistema* soddisfa la *specifica*, sotto le *assunzioni* dichiarate. Nulla di più.**

Ne seguono quattro conseguenze, e ciascuna conta:

- **Se la specifica è sbagliata, la dimostrazione non vale nulla.** Se dimostrate «ogni porta si chiude» ma il requisito reale era «ogni *finestra* si chiude», avete dimostrato perfettamente la cosa sbagliata. La verifica controlla che abbiate costruito *ciò che avete specificato*, non che abbiate specificato la cosa giusta.
- **Se una definizione è formulata in modo sottilmente errato, la garanzia si restringe silenziosamente.** Una dimostrazione relativa a una definizione leggermente errata di «saldo» potrebbe stabilire meno di quanto pensiate, pur superando ogni controllo. Per questo le definizioni al centro di una verifica devono essere brevi, standard e apertamente revisionabili dagli esseri umani.
- **Se le assunzioni falliscono, la garanzia viene meno.** Le dimostrazioni poggiano su assunzioni («l'hardware della serratura non è fisicamente rotto»). Se un'assunzione è falsa nella realtà, la conclusione non deve necessariamente valere.
- **Non significa «mai più bug».** Significa «nessun bug del tipo escluso da questa specifica, date queste assunzioni». Un'affermazione più circoscritta, più onesta e molto più utile.

Lungi dall'indebolire la verifica formale, questa precisione è la sua forza. Vi dice *esattamente* cosa state ottenendo. Come vedremo nella Parte 3, il team Zcash che dichiara chiaramente il proprio ambito e le proprie assunzioni («abbiamo dimostrato la correttezza dell'offerta, sotto queste assunzioni nominate, e non la privacy») è un modello di questa onestà.

![alt text](image-5.png)

---

## 7. Una dichiarazione di trasparenza

Per mantenere questo testo leggibile abbiamo semplificato. Le specifiche reali sono scritte in linguaggi formali precisi, non in frasi inglesi; esistono diversi *stili* di verifica formale (dimostrazione interattiva di teoremi, model checking, metodi basati su SMT) adatti a problemi diversi; e scrivere queste dimostrazioni resta un lavoro qualificato e impegnativo anche con l'assistenza dell'IA. Abbiamo inoltre omesso il modo in cui un assistente di dimostrazione rappresenta internamente la logica. Nulla di ciò modifica il nucleo: una specifica, un sistema e una dimostrazione verificata da una macchina che i due coincidono, sotto assunzioni dichiarate. I dettagli torneranno quando ne avremo bisogno.

---

## 8. Riepilogo

- I **test** campionano input specifici e possono mostrare che un bug è presente, mai che i bug sono assenti. I bug pericolosi si nascondono nei casi che nessuno campiona.
- La **verifica formale** dimostra che una proprietà vale per **ogni** caso possibile, mediante un argomento finito e verificabile.
- Ogni verifica ha tre pilastri: una **specifica** (cosa significa corretto), un **sistema** (l'oggetto controllato) e una **dimostrazione** che concordano, più un **assistente di dimostrazione** (come **Lean**) che verifica ogni passaggio automaticamente.
- Una **dimostrazione** (per esempio mediante **induzione**) riduce infiniti casi a un unico argomento finito.
- I bug risiedono nella **specifica**, nell'**implementazione** o in un'**assunzione errata**. La verifica formale mira direttamente alla specifica, che è dove tendono a risiedere i bug più profondi e nascosti.
- La garanzia è precisa: il sistema soddisfa **la specifica**, sotto **assunzioni dichiarate**. Una specifica errata, una definizione formulata male o un'assunzione errata la annullano, e non significa mai «nessun bug in assoluto».

---

## Glossario

| Termine | Significato in linguaggio semplice |
|---|---|
| **Formal verification** | Dimostrare matematicamente che un sistema soddisfa una specifica in tutti i casi |
| **Specification** | Un'affermazione precisa di cosa significhi «comportamento corretto» |
| **System** | Il programma, circuito o protocollo effettivamente controllato |
| **Proof** | Una catena finita di passaggi logici che stabilisce un'affermazione per tutti i casi |
| **Proof assistant / theorem prover** | Software (Lean, Rocq, Isabelle) che controlla ogni passaggio di una dimostrazione |
| **Machine-checked** | Verificato passo dopo passo da un computer, non solo tramite lettura umana |
| **Induction** | Una tecnica di dimostrazione: vera all'inizio, e ogni passaggio la porta al successivo |
| **Assumption** | Una condizione su cui la dimostrazione si basa; se è falsa, la garanzia potrebbe non valere |

---

## FAQ

**La verifica formale sostituisce i test?**
No. Si completano a vicenda. I test individuano a basso costo problemi pratici e assunzioni errate; la verifica esclude intere classi di bug che i test potrebbero non campionare mai.

**Se è così potente, perché non viene verificato formalmente tutto?**
È costosa e richiede competenze specialistiche, anche se l'assistenza dell'IA sta riducendo tale costo. È riservata ai sistemi in cui un bug raro sarebbe catastrofico, proprio quelli in cui il suo costo è giustificato.

**Un sistema verificato formalmente può comunque fallire?**
Sì, se la specifica era sbagliata, una definizione era formulata male, un'assunzione non era valida oppure il fallimento si trova fuori da ciò che era stato specificato. La dimostrazione copre soltanto ciò che afferma di coprire.

**Una dimostrazione verificata da una macchina è più affidabile di una umana?**
Per dimostrazioni grandi e complesse, in generale sì. Una macchina non trascurerà una lacuna sottile né accetterà una spiegazione vaga, anche se continua a fidarsi della specifica e delle definizioni che le sono state fornite.

**Se l'IA aiuta a scrivere la dimostrazione, perché fidarsene?**
Perché l'assistente di dimostrazione controlla meccanicamente ogni passaggio. L'IA propone passaggi; la macchina li verifica. Un passaggio errato viene semplicemente rifiutato, quindi l'IA accelera il lavoro senza indebolire la garanzia.

---

### Verificate la vostra intuizione

Dimostrate che il software di una banca «non permette mai che il saldo di un conto diventi negativo». Un anno dopo, il denaro continua a sparire. Come possono entrambe le cose essere vere contemporaneamente? *(Risposta sotto.)*

<details><summary>Risposta</summary>

La dimostrazione garantiva esattamente una proprietà: i saldi non diventano mai negativi. Il denaro può sparire in modi che quella proprietà non ha mai considerato, per esempio tramite un bug che sposta fondi sul conto sbagliato (ma comunque non negativo), o un difetto in una parte del sistema che non è mai stata specificata. La verifica ha fatto precisamente ciò che prometteva e nulla di più. Questa è l'avvertenza della Sezione 6 in azione: una dimostrazione copre la specifica, non ogni possibile nozione di «corretto».
</details>

---

### Cosa segue

**Parte 2 · Il bug Orchard:** esaminiamo in dettaglio la vera storia del 2026. Un sistema per la privacy nascondeva gli importi usando dimostrazioni crittografiche, e una riga sottovincolata nella sua matematica significava che quelle dimostrazioni potevano essere indotte a mentire, consentendo una contraffazione invisibile e illimitata. Vedremo esattamente cosa significhi «un circuito sottovincolato», perché questa classe di bug possa restare nascosta per sempre e perché sia accaduta più di una volta.

*Parte della* serie sulla verifica formale *per [ZecHub](https://zechub.org).*
