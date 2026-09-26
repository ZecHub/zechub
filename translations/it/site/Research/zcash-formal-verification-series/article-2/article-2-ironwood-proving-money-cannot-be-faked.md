![alt text](image-1.png)
# Ironwood: Dimostrare che il denaro non può essere contraffatto

### Come Zcash ha risposto a un bug con una prova verificata da una macchina

> **Serie:** *Verifica formale* · **Parte 3 di 3**
> **Pubblico:** principianti. Le parti 1 e 2 introducono la verifica formale e il bug Orchard; questo finale mostra le due idee incontrarsi in un sistema reale. Tutto ciò che serve viene richiamato man mano.
> **Cosa imparerai:** una comprensione accurata di ciò che Zcash ha effettivamente dimostrato riguardo al suo nuovo pool "Ironwood", di come è strutturata la prova, di ciò che copre e non copre, di come il vecchio pool sia stato dismesso in sicurezza e del perché questo indichi un nuovo standard per costruire denaro crittografico.

Nella Parte 1 abbiamo imparato cosa significa *dimostrare* che un sistema è corretto. Nella Parte 2 abbiamo visto un difetto reale che i test non hanno rilevato per quattro anni, una moltiplicazione su curva ellittica con vincoli insufficienti che avrebbe potuto consentire una contraffazione invisibile illimitata. Questo articolo è la risoluzione: come Zcash ha risposto non soltanto con una patch, ma con una prova verificata da una macchina che l'intera classe di bug è stata eliminata.

---

## 1. Perché dovrebbe interessarti?

Quando un bug minaccia il denaro, la risposta abituale è applicare una patch e andare avanti. Zcash ha fatto qualcosa di più ambizioso. Insieme a un nuovo pool schermato chiamato **Ironwood**, attivato il 28 luglio 2026, i suoi ingegneri hanno pubblicato una **prova matematica verificata da una macchina**, composta da **oltre 2.700 teoremi** scritti nell'assistente di prova **Lean**, che stabilisce che il nuovo pool non può creare monete contraffatte secondo le sue assunzioni dichiarate. La prova è pubblica, nel repository open-source `ironwood`, e ha richiesto a tre team di ricercatori e crittografi ben oltre un mese per essere completata.

Questo conta oltre Zcash. È una delle dimostrazioni più chiare nel mondo reale che si possa prendere un sistema finanziario attivo, definire con precisione cosa significhi "nessuna contraffazione" e *dimostrarlo*, anziché sperare che i test siano stati sufficientemente approfonditi. Trasforma una promessa in un teorema.

---

## 2. L'idea centrale: dimostrare la specifica, eliminare la classe di bug

La Parte 2 si concludeva con l'intuizione che ha reso possibile tutto questo. Ricordiamola, perché qui tutto si fonda su di essa:

> Un bug di contraffazione *non rilevabile* può esistere soltanto nella **specifica** del protocollo, la descrizione matematica di ciò che il circuito deve imporre. Qualsiasi cosa rilevabile emergerebbe nella contabilità pubblica. Quindi dimostrare che la specifica è corretta elimina in una sola volta l'intera classe di bug di contraffazione nascosta.

Perché "soltanto nella specifica"? Perché ogni blocco registra permanentemente il contenuto completo di ogni transazione, incluse le sue prove. Se il *software* accettasse erroneamente una transazione non valida, chiunque potrebbe rieseguire la cronologia con software corretto e vederlo. Questa prova è permanente e pubblica. Solo un difetto nella *matematica* sottostante può restare nascosto per sempre, perché non esiste una "versione corretta" con cui rieseguire il confronto. È questo il difetto a cui mira la verifica formale.

I test verificano il *comportamento su input campionati*, e il bug Orchard si è nascosto proprio perché nessun input campionato lo ha colpito. Una prova sulla specifica copre simultaneamente **tutti** gli input, inclusi i casi limite che nessuno penserebbe di provare. È l'unico tipo di garanzia abbastanza forte da dismettere con fiducia un difetto invisibile vecchio di quattro anni.

![alt text](image-2.png)

---

## 3. Cosa è stato dimostrato esattamente

La prova stabilisce una singola proprietà principale, costruita su una più profonda sottostante.

### Integrità del saldo (la proprietà principale)

> **Integrità del saldo:** il valore nascosto conservato nel pool schermato non supera mai il valore pubblico netto che vi è confluito.

Questa è la proprietà anti-contraffazione in forma semplice. Il denaro può entrare nel pool schermato (pubblicamente visibile) e uscirne (pubblicamente visibile), ma all'interno, dove gli importi sono nascosti, non può essere creato valore dal nulla. Rendiamolo concreto con un minuscolo registro contabile (aritmetica verificata):

- **Transazione onesta:** input del valore di `5 + 3 = 8` producono output del valore di `4 + 4 = 8`. Il valore in entrata equivale a quello in uscita. L'integrità del saldo è rispettata. ✓
- **Tentativo di contraffazione:** gli stessi input del valore di `8`, ma output di `4 + 4 + 2 = 10`. Ciò creerebbe `2` unità dal nulla. L'integrità del saldo lo **vieta**: il pool non può mai pagare più di quanto vi sia entrato. ✗

L'integrità del saldo è l'affermazione matematica secondo cui il secondo scenario non può mai produrre una transazione valida.

### Solidità della conoscenza (il meccanismo sottostante)

Per garantire l'integrità del saldo, i ricercatori hanno dovuto prima dimostrare una proprietà più profonda e sottile del sistema di prova a conoscenza zero stesso. La normale solidità (il concetto della Parte 2 secondo cui "solo le affermazioni vere hanno un testimone") risulta *non sufficiente* per un pool schermato, per una ragione affascinante: poiché una transazione nascosta può contenere qualsiasi cosa, quasi ogni affermazione tecnicamente *ha* qualche testimone. Quindi i ricercatori hanno dimostrato una proprietà più forte:

> **Solidità della conoscenza:** chiunque possa produrre una prova di transazione valida deve *effettivamente possedere* un testimone valido, cioè monete reali, derivate correttamente, all'indirizzo giusto.

Lo strumento formale per questo è un **estrattore**: una procedura che, dato qualsiasi dimostratore capace di convincere il verificatore, può estrargli il testimone effettivo. Se un testimone può sempre essere estratto, allora un dimostratore convincente deve davvero averne posseduto uno. Nel linguaggio della Parte 2, la solidità della conoscenza è la promessa formale che non esiste **alcuna lacuna di solidità**, alcun vincolo mancante che permetterebbe a un'affermazione falsa di passare. È l'esatta proprietà la cui *assenza* costituiva il bug Orchard. Dimostrarne la presenza, per tutti i possibili dimostratori, è ciò che chiude definitivamente quella porta.

![alt text](image-3.png)

---

## 4. Come è stata costruita la prova

La verifica ha richiesto un serio lavoro umano, non è stata il risultato di un semplice pulsante:

- Scritta nell'assistente di prova **Lean** (dalla Parte 1: una macchina che verifica ogni passaggio logico).
- Composta da **più di 2.700 teoremi**, disponibili pubblicamente nel repository `ironwood`.
- Prodotta da **tre team** di ricercatori e crittografi in **più di un mese**, incluso il lavoro guidato da Tal Derei di Project Tachyon, con contributi di Gregor Mitscha-Baude di zkSecurity e Daira-Emma Hopwood dell'Open Development Lab Zcash, oltre a una prova indipendente e parallela di solidità da parte di altri crittografi.

Per ragionare sulla proprietà, il modello Lean descrive un intero **registro** come un elenco di transazioni, ciascuna contenente le proprie azioni, il proprio valore pubblico dichiarato e le proprie firme. Un predicato che i ricercatori chiamano **ValidLedger** trascrive direttamente le regole di consenso della rete: il testimone di ogni azione deve soddisfare le condizioni richieste, nessun marcatore di spesa (nullifier) può comparire due volte, ogni stato dell'albero referenziato deve essere uno che il sistema ha effettivamente raggiunto e ogni firma deve essere verificata. I teoremi quantificano quindi su **ogni registro valido**. Questa espressione, "ogni registro valido", è il punto centrale: non un campione, ma tutti, un insieme che comprende qualunque cosa un vero attaccante potrebbe mai assemblare.

Il risultato sull'integrità del saldo è costruito da diversi teoremi a livello di registro, ciascuno dei quali dimostra che una via alla contraffazione è chiusa: che ogni spesa corrisponde a un output reale precedente, che il valore totale si conserva, che una nota ricevuta rimane spendibile e non può essere rubata e che spendere richiede una corretta autorizzazione. Un elemento separato, la **firma vincolante**, collega i valori nascosti di ogni transazione all'importo pubblico che essa dichiara, così che la contabilità nascosta e quella pubblica non possano divergere silenziosamente.

---

## 5. Dove la matematica incontra il software

Una domanda sottile e onesta: la prova riguarda un modello matematico, ma la rete esegue *codice Rust*. Come sappiamo che il codice corrisponde al modello?

Il team ha tracciato un confine accurato che chiama l'**impronta digitale** del verificatore. Al di sopra del confine, le prove Lean ragionano sul verificatore come oggetto matematico preciso. Al di sotto si trova l'ordinaria implementazione Rust. L'argomento chiave è lo stesso della Parte 2:

> Qualsiasi modo in cui il software reale possa deviare dal modello dimostrato sarebbe un bug di *implementazione*, e i bug di implementazione possono produrre soltanto contraffazioni *rilevabili*, perché ogni prova accettata è registrata permanentemente e può essere rieseguita tramite software corretto.

Quindi la prova gestisce la classe non rilevabile (la specifica), mentre il registro pubblico permanente gestisce la classe rilevabile (l'implementazione). Tra le due, non c'è posto in cui un bug di contraffazione *non rilevabile* possa nascondersi. Il team ha inoltre effettuato un controllo incrociato, eseguendo il verificatore reale e confermando che riproduce esattamente l'impronta digitale nei casi acquisiti.

---

## 6. L'avvertenza più importante: "secondo le assunzioni dichiarate"

La Parte 1 ha insistito sul fatto che una prova garantisce che il sistema soddisfi la specifica *secondo le assunzioni dichiarate*, e non significa mai "nessun bug in assoluto". Il team di Zcash è stato ammirevolmente preciso proprio su questo, e anche una scrittura didattica onesta deve esserlo.

La prova riduce la sicurezza di Ironwood a un piccolo insieme di assunzioni standard, chiaramente nominate. In particolare, la sua solidità si basa sulla difficoltà del **problema del logaritmo discreto** sulla curva ellittica usata da Ironwood (un'assunzione ben studiata, per la quale il miglior attacco noto richiederebbe nell'ordine di `2^126` operazioni, ben oltre ogni calcolo realizzabile), insieme alle assunzioni di modellazione standard per la funzione hash. Vale la pena esporre chiaramente due confini:

- **Vale secondo tali assunzioni crittografiche.** Se un'assunzione fondamentale venisse infranta, la garanzia verrebbe meno. È standard e inevitabile; essenzialmente tutta la crittografia distribuita si fonda su tali assunzioni.
- **Copre l'integrità del saldo, non la privacy.** La prova riguarda la solidità dell'offerta monetaria (nessun denaro falso). Non pretende di dimostrare le garanzie separate di privacy del pool, che sono una proprietà diversa con argomenti diversi.

Lungi dal compromettere il risultato, indicare questi confini è ciò che lo rende affidabile. L'affermazione è esatta: *secondo assunzioni crittografiche standard, questo pool non può creare monete contraffatte non rilevabili.* È un teorema, non una speranza, e il suo ambito preciso è dichiarato apertamente.

![alt text](image-4.png)

---

## 7. Dismettere in sicurezza il vecchio pool: il tornello

Dimostrare che il *nuovo* pool è solido lascia comunque una domanda: che dire del *vecchio* pool Orchard, dove il difetto è rimasto per quattro anni? Non puoi rendere nuovamente visibile il suo passato. Ma puoi limitarne il futuro.

Zcash ha introdotto un meccanismo chiamato **tornello**. La regola è semplice e potente:

> Il valore può lasciare il vecchio pool soltanto fino all'importo che è verificabilmente entrato in esso.

Poiché il denaro che entra ed esce da un pool schermato è pubblicamente visibile (è nascosta soltanto l'attività *all'interno*), il tornello permette all'intera rete di controllare che non esca più di quanto sia mai entrato. Se monete contraffatte fossero state create nel vecchio pool, raggiungerebbero questo limite e non riuscirebbero a uscire. E mentre i fondi onesti migrano all'esterno senza che emerga alcun eccesso, la comunità ottiene una forte prova pubblica che il difetto non è mai stato sfruttato. È quanto di più vicino esista a verificare l'offerta di un pool privato senza infrangerne la privacy e avvicina l'integrità dell'offerta al modello trasparente di una catena come Bitcoin, preservando al contempo la privacy di Zcash.

![alt text](image-5.png)

Ironwood stesso riutilizza il circuito di prova *corretto*, riparte da zero con un pool vuoto e aggiunge protezioni rivolte al futuro (incluse disposizioni affinché i fondi possano rimanere recuperabili se futuri computer quantistici dovessero mai minacciare la crittografia odierna). La nuova attività schermata ora fluisce attraverso Ironwood, mentre il vecchio pool Orchard è limitato ai prelievi.

---

## 8. Il quadro più ampio: crittografia ad alta affidabilità

Ironwood fa parte di un cambiamento più ampio nel modo in cui Zcash costruisce. Il suo sforzo di scalabilità di prossima generazione (un'architettura chiamata **Tachyon**, costruita su prove ricorsive e su un toolkit chiamato **Ragu**) viene sviluppato secondo una filosofia talvolta chiamata **crittografia ad alta affidabilità**: trattare la verifica formale verificata da una macchina non come un ripensamento, ma come una parte standard della distribuzione di nuovi sistemi crittografici.

La logica è convincente. La crittografia all'avanguardia è proprio l'ambito in cui l'intuizione umana è più debole e in cui un sottile caso limite non testato può restare nascosto per anni, come ha mostrato Orchard. Dimostrare la specifica è l'unica tecnica che si estende a "tutti i possibili input" e chiude queste lacune per costruzione. Il team ha segnalato l'intenzione di estendere ulteriormente questo scrutinio nel tempo, verso l'implementazione e oltre. Aspettati di vedere questo standard adottato più ampiamente, in Zcash e oltre.

---

## 9. Una precisazione onesta

Abbiamo semplificato per chiarezza. Il vero sviluppo Lean è molto più dettagliato dello schema qui presentato, con definizioni precise di azioni, affermazioni, impegni, nullifier e firme; "integrità del saldo" e "solidità della conoscenza" hanno definizioni formali esatte che abbiamo espresso solo a parole; la riduzione alla difficoltà del logaritmo discreto passa attraverso diversi modelli intermedi (un modello algebrico del dimostratore e un modello random-oracle dell'hash) che abbiamo condensato in "assunzioni standard"; e abbiamo descritto l'impronta digitale e il tornello a livello concettuale. Nulla di tutto ciò cambia la storia essenziale: una specifica di "nessuna contraffazione", una prova verificata da una macchina su tutti i registri validi, una dichiarazione esplicita e onesta di ambito e assunzioni e una dismissione sicura del pool difettoso. Per il resoconto autorevole, consulta gli approfondimenti di verifica pubblicati da Project Tachyon e il repository della prova `ironwood`.

---

## 10. Riepilogo

- Zcash ha risposto al bug Orchard non solo con una patch, ma con una **prova verificata da una macchina** (oltre **2.700 teoremi** in **Lean**, disponibili pubblicamente) per il suo nuovo pool **Ironwood**.
- La prova stabilisce l'**integrità del saldo** (il pool non paga mai più di quanto vi sia entrato pubblicamente), costruita sulla **solidità della conoscenza** (una prova valida richiede che il dimostratore detenga effettivamente un testimone autentico, verificato tramite un **estrattore**). La solidità della conoscenza è esattamente la proprietà la cui lacuna era il bug Orchard.
- Ragiona su **ogni registro valido**, non su casi campionati, ed è questo che chiude la classe di bug di contraffazione nascosta che i test non hanno rilevato.
- Il divario tra matematica e software è gestito da un confine di **impronta digitale**: la prova esclude i bug non rilevabili e qualsiasi deviazione dell'implementazione sarebbe **rilevabile** nel registro pubblico permanente.
- La garanzia è formulata con precisione: vale secondo la **difficoltà del logaritmo discreto e assunzioni hash standard**, e copre la **contraffazione, non la privacy**. Questa onestà è un punto di forza, non una debolezza.
- Il **tornello** dismette in sicurezza il vecchio pool limitandone le uscite ai depositi verificabili, esponendo qualsiasi contraffazione e costruendo prova pubblica dell'integrità dell'offerta.
- Ironwood riflette un passaggio verso la **crittografia ad alta affidabilità**, dove la verifica formale è una parte standard della costruzione di nuovo denaro crittografico.

---

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| **Ironwood** | Il nuovo pool schermato di Zcash (2026), che sostituisce il pool difettoso Orchard |
| **Balance integrity** | Il pool non paga mai più valore di quanto vi sia entrato pubblicamente |
| **Knowledge soundness** | Una prova valida richiede che il dimostratore detenga un testimone autentico |
| **Extractor** | Una procedura che estrae il testimone da qualunque dimostratore convincente |
| **Lean** | L'assistente di prova utilizzato per verificare la verifica tramite macchina |
| **ValidLedger** | Il modello formale delle regole di consenso su cui ragionano i teoremi |
| **Fingerprint** | Il confine tra la matematica dimostrata e il software Rust in esecuzione |
| **Under stated assumptions** | La prova vale a condizione che le assunzioni crittografiche nominate siano valide |
| **Turnstile** | Una regola che limita le uscite di un pool ai suoi depositi verificabili |
| **High-assurance cryptography** | Costruire crittografia con la verifica formale come passaggio standard |

---

## FAQ

**La prova significa che Ironwood è privo di bug?**
No, e non pretende di esserlo. Dimostra una proprietà precisa, l'integrità del saldo, secondo le assunzioni dichiarate. Ciò esclude la contraffazione non rilevabile, non ogni possibile bug.

**La prova garantisce che le mie transazioni siano private?**
No. La verifica copre la solidità dell'offerta monetaria (nessun denaro falso), non le garanzie separate di privacy del pool. Queste sono argomentate diversamente.

**Perché fidarsi di una prova scritta da esseri umani (e IA)?**
Perché è verificata da una macchina. L'assistente di prova Lean verifica meccanicamente ogni passaggio, quindi la fiducia si basa sulla specifica e sulle assunzioni nominate, non sulla cura di un essere umano o di un'IA in ogni passaggio.

**Cosa succede alle monete ancora nel vecchio pool Orchard?**
Possono essere prelevate, ma solo fino all'importo che è verificabilmente entrato, applicato dal tornello. Ciò protegge sia l'integrità dell'offerta sia aiuta a dimostrare che il vecchio difetto non è mai stato sfruttato.

**Questa è la fine della storia?**
È una pietra miliare, non un traguardo finale. L'architettura futura di Zcash (Tachyon, con il toolkit Ragu) viene costruita con la verifica formale come pratica standard, estendendo ulteriormente questo approccio.

---

### Metti alla prova la tua intuizione

Qualcuno afferma: "Poiché Ironwood è verificato formalmente, ora è impossibile che qualcosa vada mai storto con Zcash." Usando le idee di tutte e tre le parti, indica due ragioni distinte per cui tale affermazione è troppo forte. *(Risposta sotto.)*

<details><summary>Risposta</summary>

Primo, la prova copre una proprietà *specifica* (l'integrità del saldo) secondo *assunzioni dichiarate* (difficoltà del logaritmo discreto e modellazione hash standard). Se un'assunzione crittografica venisse infranta, oppure se sorgesse un problema al di fuori di ciò che è stato specificato (per esempio nella privacy, nel software wallet o in qualche componente non dimostrato), la prova non direbbe nulla al riguardo. Secondo, la verifica formale garantisce che il sistema soddisfi *la specifica che è stata scritta*; se quella specifica stessa non riuscisse a cogliere qualche requisito reale, la prova certificherebbe fedelmente la cosa sbagliata. Entrambi i punti riaffermano l'avvertenza della Parte 1: una prova è esatta e delimitata, potente proprio perché il suo ambito è onesto, non una garanzia generale che nulla possa mai andare storto.
</details>

---

### La serie completa

In tre parti siamo passati da un'idea generale a un'applicazione attiva: cosa significa **dimostrare** che il software è corretto anziché testarlo (Parte 1), come un circuito reale con vincoli insufficienti avrebbe potuto creare denaro invisibile (Parte 2) e come una prova verificata da una macchina dell'**integrità del saldo** abbia eliminato definitivamente quella classe di bug (Parte 3). Il filo conduttore è un'unica promessa onesta: non "nessun bug in assoluto", ma "questa proprietà precisa vale in ogni caso, secondo le assunzioni dichiarate". Per il denaro che nasconde i propri importi, questa è esattamente la promessa che vale la pena dimostrare.

*Parte della* serie di Verifica formale *per [ZecHub](https://zechub.org).*
