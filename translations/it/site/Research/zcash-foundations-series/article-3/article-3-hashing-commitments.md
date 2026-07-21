# Hashing e impegni: la magica busta sigillata
##### Ricerca originale di [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](image-15.png)

### Come bloccare un segreto in pubblico senza poter mai mentire al riguardo

> **Serie:** *Zcash dai primi principi* . **Articolo 3 . Hashing e impegni**
> **Pubblico:** principianti. Ci basiamo sull'[Articolo 1 (campi finiti)](article-1-finite-fields.md) e sull'[Articolo 2 (curve ellittiche)](article-2-elliptic-curves.md), ma l'intuizione si regge da sola.
> **Cosa porterai con te:** una chiara comprensione delle funzioni hash, cosa significhino davvero "occultamento" e "vincolo", e come Zcash costruisce i note commitment che ancorano ogni pagamento privato.

Nell'[Articolo 0](article-0-shielded-transaction.md) abbiamo descritto una "magica busta sigillata": qualcosa che puoi appendere a una bacheca pubblica che prova l'esistenza di una busta nascondendone il contenuto, e che non puoi mai sostituire in seguito. Avevamo promesso di spiegare come una cosa simile sia possibile. Questo è quell'articolo. Ci servono due ingredienti: le **funzioni hash** e gli **impegni** (commitment).

---

## 1. Perché dovrebbe interessarti?

Immagina di prevedere l'esito di un'elezione e di voler dimostrare, *a posteriori*, di averlo previsto in anticipo. Non puoi semplicemente annunciare la tua previsione (questo influenza le persone, o ti espone all'accusa di averla cambiata). E non puoi tenerla del tutto segreta (allora non puoi dimostrare nulla in seguito).

Quello che vuoi è un modo per **bloccare un valore ora, in pubblico, in modo tale che:**

- nessuno possa capire cosa hai bloccato (resta segreto per ora), e
- più tardi, quando lo riveli, tu **non possa mentire** su cosa fosse.

Questo congegno "blocca ora, rivela dopo, niente bugie" si chiama **commitment** (impegno), ed è ovunque in Zcash. Il valore e il proprietario di una nota vengono bloccati in un commitment nel momento in cui la nota viene creata. Per costruire i commitment, ci serve prima il loro cavallo da tiro: la funzione hash.

---

## 2. L'intuizione: un'impronta digitale per i dati

Una **funzione hash** prende qualsiasi dato, una singola lettera o un'intera biblioteca, e lo comprime in una stringa breve e di dimensione fissa chiamata **digest** o **hash**. Pensala come un'**impronta digitale per i dati.**

![alt text](image-16.png)

Una buona impronta digitale crittografica ha quattro proprietà. Tienile a mente come intuizioni, non come equazioni:

| Proprietà | Significato semplice | Perché è importante |
|---|---|---|
| **Deterministica** | Lo stesso input dà sempre la stessa impronta | Puoi ri-verificare un'impronta in qualsiasi momento |
| **Veloce in avanti** | Calcolare l'impronta è rapido | Pratica da usare ovunque |
| **Unidirezionale (resistente alla preimmagine)** | Data un'impronta, non puoi trovare l'input che l'ha generata | Nasconde i dati originali |
| **Resistente alle collisioni** | Non puoi trovare due input diversi con la stessa impronta | Nessuno può falsificare una corrispondenza |

E un altro comportamento che fa sembrare le impronte quasi magiche:

### L'effetto valanga (verificato)

Cambia l'input della minima quantità e l'impronta cambia *completamente*, senza alcuna somiglianza con quella vecchia. Ecco due vere impronte SHA-256 di messaggi che differiscono per un solo carattere:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

Su 64 cifre esadecimali, **59 sono diverse.** Un carattere in entrata, un'impronta del tutto scorrelata in uscita. Ecco perché non puoi spingere un input verso un'impronta bersaglio: non c'è alcun segnale "più caldo / più freddo" da seguire.

---

## 3. Dall'impronta digitale all'impegno

Ecco un'idea allettante ma fallace: per impegnarsi su un valore segreto `v`, basta pubblicarne l'impronta `H(v)`.

Questo ti *vincola* bene (non puoi in seguito sostenere un `v` diverso, perché ciò richiederebbe una collisione). Ma **non riesce a nascondere.** Se l'insieme dei valori possibili è piccolo, un attaccante prende semplicemente l'impronta di ogni candidato e le confronta. Ti impegni su "sì" o "no"? Lui calcola l'hash di entrambi e scopre all'istante quale hai scelto. Il determinismo, nostro amico un attimo fa, ora fa trapelare il segreto.

La soluzione è una sola parola: **casualità.**

> **Un commitment è l'impronta digitale del tuo valore mescolata con un numero casuale fresco:**
> `commitment = H(v, r)` dove `r` è un valore casuale segreto di "accecamento" (blinding).

Ora lo stesso `v` produce un commitment dall'aspetto diverso ogni volta, perché `r` è diverso. Le due proprietà che volevamo finalmente valgono entrambe:

![alt text](image-17.png)

Per **aprire** (rivelare) il commitment in seguito, pubblichi `v` e `r`; chiunque ricalcola `H(v, r)` e verifica che corrisponda. Sei vincolato. Quella è la magica busta sigillata dell'Articolo 0, resa reale.

> **Due concetti da portare con te per sempre:** il *vincolo* deriva dall'hash che è resistente alle collisioni; l'*occultamento* deriva dal fattore casuale di accecamento `r`.

---

## 4. Due modi per costruire la busta

Ci sono due ricette comuni, e Zcash le usa entrambe.

| | **Commitment basato su hash** | **Commitment di Pedersen** (dall'Articolo 2) |
|---|---|---|
| Ricetta | `H(v, r)` | `v.G + r.H` (punti su una curva) |
| Occultamento da | l'`r` casuale | l'`r` casuale |
| Vincolo da | resistenza alle collisioni | la trappola della curva ellittica (ECDLP) |
| Potere speciale | semplice e veloce | i commitment **si sommano** (omomorfici) |

Quest'ultima riga è il motivo per cui i commitment di Pedersen sono così importanti in Zcash. Poiché `commit(v_1) + commit(v_2)` è un valido `commit(v_1 + v_2)`, il protocollo può in seguito provare che **il denaro in entrata è pari al denaro in uscita** sommando i commitment, il tutto senza rivelare un solo importo. Ci stiamo mettendo da parte questo fatto per l'Articolo 6.

---

## 5. Una sottigliezza che plasma tutto Zcash: l'hashing ZK-friendly

Ecco un'intuizione che la maggior parte delle introduzioni manca, ed è esattamente il punto "matematica incontra ingegneria" che vale la pena evidenziare.

SHA-256 è un'eccellente impronta digitale per l'informatica di tutti i giorni. Ma Zcash non si limita a *calcolare* gli hash; deve **provare, all'interno di una prova a conoscenza zero, che un hash è stato calcolato correttamente** (l'Articolo 5 spiega perché). E qui sta il problema: una prova a conoscenza zero lavora nel linguaggio dell'**aritmetica su campi finiti** (Articolo 1), mentre SHA-256 è costruita a partire da operazioni di manipolazione dei bit (shift, AND, XOR). Esprimere tutta quella manipolazione dei bit in aritmetica su campi è enormemente costoso, rendendo le prove enormi e lente.

Così i crittografi di Zcash hanno progettato funzioni hash i cui meccanismi interni sono *già* aritmetica su campi, rendendole economiche da provare:

![alt text](image-18.png)

Questa singola pressione ingegneristica, *"deve essere economico da provare"*, è il motivo per cui Zcash ha inventato e adottato funzioni hash speciali invece di ricorrere a SHA-256 ovunque.

---

## 6. Dove tutto questo vive in Zcash

Zcash ha usato hash diversi nei suoi vari design, ciascuno scelto per il proprio compito:

| Design | Hash usati | Dove |
|---|---|---|
| **Sprout** (il più antico) | **SHA-256** | Note commitment e l'albero |
| **Sapling** | **Hash di Pedersen**, più **BLAKE2** | Pedersen per i note commitment e l'albero di Merkle; BLAKE2 per la derivazione delle chiavi e i nullifier |
| **Orchard** (attuale) | **Sinsemilla**, più **Poseidon** | Sinsemilla per i note commitment e l'albero di Merkle; Poseidon per il nullifier, tutti progettati per circuiti aritmetici |

I nomi da riconoscere sono **Pedersen** e **Sinsemilla** (hash in stile commitment costruiti a partire da punti di curva, così ereditano il superpotere del "si sommano" e si provano a basso costo) e **Poseidon** (un hash su aritmetica di campo costruito appositamente per i circuiti a conoscenza zero). Quando l'Articolo 0 diceva che il contenuto di una nota è sigillato in un commitment, *questo* è il meccanismo che esegue la sigillatura.

Così il filo lasciato in sospeso dall'Articolo 0, *"come può una busta sigillata nascondere il proprio contenuto pur essendo impossibile da falsificare?"*, è ora annodato: **occultamento da un fattore casuale di accecamento, vincolo dalla resistenza alle collisioni o dalla trappola della curva.**

---

## 7. Una doverosa precisazione

Abbiamo semplificato per mantenere le cose chiare. I veri schemi di commitment specificano esattamente come `v` e `r` sono codificati e quali generatori sono usati; "occultamento" e "vincolo" hanno ciascuno delle varianti (perfetto vs computazionale) con definizioni di sicurezza precise; e non abbiamo mostrato il funzionamento interno di Pedersen, Sinsemilla o Poseidon. Nulla di tutto ciò cambia l'intuizione: un commitment è un'impronta digitale più casualità che nasconde ora e vincola per sempre. I dettagli torneranno, segnalati, quando l'articolo sul protocollo ne avrà bisogno.

---

## 8. Riepilogo

- Una **funzione hash** è un'**impronta digitale per i dati**: deterministica, veloce in avanti, unidirezionale, resistente alle collisioni, con un **effetto valanga** (un bit in entrata, un'impronta totalmente diversa in uscita).
- Un **commitment** ti permette di **bloccare un valore in pubblico ora e rivelarlo dopo senza poter mentire.**
- Pubblicare una nuda impronta `H(v)` vincola ma **non** nasconde. Aggiungere un fattore casuale di accecamento, `H(v, r)`, risolve il problema: **occultamento da `r`, vincolo dalla resistenza alle collisioni.**
- Zcash usa sia commitment **basati su hash** sia commitment di **Pedersen**; i commitment di Pedersen inoltre **si sommano**, cosa che l'Articolo 6 sfrutterà per provare il bilancio del valore in modo privato.
- Poiché gli hash devono essere **provati** all'interno delle prove a conoscenza zero, Zcash usa hash **ZK-friendly** costruiti a partire da aritmetica su campi (**Pedersen**, **Sinsemilla**, **Poseidon**) invece di SHA-256 ovunque.

---

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| **Funzione hash** | Comprime qualsiasi dato in una breve impronta digitale di dimensione fissa (digest) |
| **Digest** | L'impronta digitale in uscita di una funzione hash |
| **Resistenza alla preimmagine** | Non si può invertire un digest per risalire al suo input (unidirezionale) |
| **Resistenza alle collisioni** | Non si possono trovare due input con lo stesso digest |
| **Effetto valanga** | Una minima modifica all'input cambia completamente il digest |
| **Commitment** | Bloccare un valore ora, rivelarlo dopo, senza poter mentire al riguardo |
| **Fattore di accecamento (`r`)** | Il numero casuale fresco che fa sì che un commitment nasconda |
| **Hash ZK-friendly** | Un hash costruito a partire da aritmetica su campi così da essere economico da provare |

---

## FAQ

**Perché non cifrare semplicemente il valore invece di impegnarsi su di esso?**
La cifratura riguarda la *segretezza che puoi in seguito decifrare*. Un commitment riguarda il *vincolo*: la garanzia che non puoi cambiare la tua risposta in seguito. Compiti diversi.

**Se i commitment nascondono il valore, come fa qualcuno a verificare le regole?**
Questo è il ruolo delle prove a conoscenza zero (Articolo 5): provano che il valore nascosto rispetta le regole senza rivelarlo.

**SHA-256 è compromessa, dato che Zcash la evita in alcuni punti?**
No. SHA-256 va bene e Zcash la usa ancora. È solo costosa da *provare all'interno di un circuito*, motivo per cui esistono gli hash ZK-friendly per quel compito specifico.

**Da dove viene l'`r` casuale, e chi lo conserva?**
Viene generato fresco quando la nota viene creata ed è noto al proprietario della nota. Fa parte di ciò che rende ogni nota unica e privata.

---

### Metti alla prova la tua intuizione

Ti impegni sulla tua previsione elettorale come `H(v, r)` e la pubblichi. Un amico insiste che dovresti pubblicare solo `H(v)` per tenerla più semplice. In una frase, perché è una cattiva idea se ci sono solo due esiti possibili? *(Risposta sotto.)*

<details><summary>Risposta</summary>

Con solo due esiti, il tuo amico può semplicemente calcolare `H("vince")` e `H("perde")` da solo e confrontarli con il tuo digest pubblicato, scoprendo all'istante la tua previsione. L'hash nudo vincola ma non nasconde; l'`r` casuale è ciò che ferma questo attacco a forza bruta per tentativi.
</details>

---

### Cosa viene dopo

**Articolo 4 . Alberi di Merkle:** ora abbiamo milioni di commitment che si accumulano. L'Articolo 4 mostra come Zcash li organizza in un unico albero la cui minuscola impronta radice rappresenta l'intera storia, e come puoi provare che la tua nota è in quell'albero senza rivelare quale. Questa è la vera forma della "bacheca pubblica" dell'Articolo 0.

*Parte della serie* Zcash dai primi principi *per [ZecHub](https://zechub.org). Concessa in licenza CC BY-SA 4.0.*
