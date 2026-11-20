# Hashing e commitment: la magica busta sigillata
##### Ricerca originale di [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-15-0c16784b27.webp)

### Come bloccare un segreto in pubblico e non poter mai mentire al riguardo

> **Serie:** *Zcash from First Principles* . **Articolo 3 . Hashing e commitment**
> **Pubblico:** principianti. Ci basiamo su [Articolo 1 (campi finiti)](article-1-finite-fields.md) e [Articolo 2 (curve ellittiche)](article-2-elliptic-curves.md), ma l'intuizione regge da sola.
> **Cosa ti porti a casa:** una comprensione chiara delle funzioni hash, di cosa significano davvero "nascondere" e "vincolare", e di come Zcash costruisce i commitment delle note che ancorano ogni pagamento privato.

In [Articolo 0](article-0-shielded-transaction.md) abbiamo descritto una "busta sigillata magica": qualcosa che puoi appuntare su una bacheca pubblica, che dimostra che una busta esiste nascondendo ciò che contiene, e che non puoi mai sostituire in seguito. Abbiamo promesso di spiegare come una cosa del genere sia possibile. Questo è quell'articolo. Ci servono due ingredienti: **funzioni hash** e **commitment**.

---

## 1. Perché dovrebbe interessarti?

Immagina di prevedere l'esito di un'elezione e di voler dimostrare, *dopo*, di averla pronosticata in anticipo. Non puoi semplicemente annunciare la tua previsione (influenzerebbe le persone, o inviterebbe accuse di averla cambiata). E non puoi tenerla completamente segreta (in tal caso non potresti dimostrare nulla in seguito).

Quello che vuoi è un modo per **bloccare un valore ora, in pubblico, in modo tale che:**

- nessuno possa capire cosa hai bloccato (per ora resta segreto), e
- in seguito, quando lo riveli, **non possa mentire** su quale fosse.

Questo congegno "blocca ora, rivela dopo, senza mentire" si chiama **commitment**, ed è ovunque in Zcash. Il valore e il proprietario di una nota vengono bloccati in un commitment nel momento stesso in cui la nota viene creata. Per costruire i commitment, ci serve prima il loro cavallo di battaglia: la funzione hash.

---

## 2. L'intuizione: un'impronta digitale per i dati

Una **funzione hash** prende qualsiasi dato, una singola lettera o un'intera biblioteca, e lo riduce a una stringa breve di dimensione fissa chiamata **digest** o **hash**. Pensala come **un'impronta digitale per i dati.**

![alt text](/content-images/image-16-52fdf62c87.webp)

Una buona impronta digitale crittografica ha quattro proprietà. Considerale intuizioni, non equazioni:

| Proprietà | Significato semplice | Perché è importante |
|---|---|---|
| **Deterministica** | Lo stesso input dà sempre la stessa impronta digitale | Puoi ricontrollare un'impronta digitale in qualsiasi momento |
| **Veloce in avanti** | Calcolare l'impronta digitale è rapido | Pratica da usare ovunque |
| **A senso unico (resistente alle preimmagini)** | Data un'impronta digitale, non riesci a trovare l'input che l'ha prodotta | Nasconde i dati originali |
| **Resistente alle collisioni** | Non riesci a trovare due input diversi con la stessa impronta digitale | Nessuno può falsificare una corrispondenza |

E un altro comportamento che rende le impronte digitali quasi magiche:

### L'effetto valanga (verificato)

Modifica l'input della quantità più piccola e l'impronta digitale cambia *completamente*, senza alcuna somiglianza con quella precedente. Ecco due impronte digitali SHA-256 reali di messaggi che differiscono per un solo carattere:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

Su 64 cifre esadecimali, **59 sono diverse.** Entra un carattere, esce un'impronta digitale completamente non correlata. Ecco perché non puoi spingere un input verso un'impronta digitale bersaglio: non c'è alcun segnale "più caldo / più freddo" da seguire.

---

## 3. Dall'impronta digitale al commitment

Ecco un'idea allettante ma errata: per fare un commitment su un valore segreto `v`, pubblica semplicemente la sua impronta digitale `H(v)`.

Questo ti *vincola* bene (non puoi in seguito sostenere di aver scelto un `v` diverso, perché servirebbe una collisione). Ma **non nasconde.** Se l'insieme dei valori possibili è piccolo, un attaccante calcola semplicemente l'impronta digitale di ogni candidato e confronta. Un commitment su "sì" o "no"? Fanno l'hash di entrambi e scoprono all'istante quale hai scelto. Il determinismo, nostro amico un momento fa, ora sta facendo trapelare il segreto.

La soluzione è una parola sola: **casualità.**

> **Un commitment è l'impronta digitale del tuo valore mescolata con un numero casuale fresco:**
> `commitment = H(v, r)` dove `r` è un segreto valore casuale di "blinding".

Ora lo stesso `v` produce un commitment dall'aspetto diverso ogni volta, perché `r` è diverso. Le due proprietà che volevamo finalmente valgono entrambe:

![alt text](/content-images/image-17-3ec4617665.webp)

Per **aprire** (rivelare) il commitment in seguito, pubblichi `v` e `r`; chiunque ricalcola `H(v, r)` e verifica che corrisponda. Ormai sei vincolato. Quella è la busta sigillata magica dell'Articolo 0, resa reale.

> **Due concetti da portare con te per sempre:** il *vincolare* deriva dal fatto che l'hash è resistente alle collisioni; il *nascondere* deriva dal fattore di blinding casuale `r`.

---

## 4. Due modi per costruire la busta

Esistono due ricette comuni, e Zcash le usa entrambe.

| | **Commitment basato su hash** | **Commitment di Pedersen** (dall'Articolo 2) |
|---|---|---|
| Ricetta | `H(v, r)` | `v.G + r.H` (punti su una curva) |
| Nasconde grazie a | il valore casuale `r` | il valore casuale `r` |
| Vincola grazie a | resistenza alle collisioni | la trapdoor della curva ellittica (ECDLP) |
| Potere speciale | semplice e veloce | i commitment **si sommano** (omomorfici) |

Quell'ultima riga è il motivo per cui i commitment di Pedersen contano così tanto in Zcash. Poiché `commit(v_1) + commit(v_2)` è un `commit(v_1 + v_2)` valido, il protocollo può in seguito dimostrare che **il denaro in entrata equivale al denaro in uscita** sommando i commitment tra loro, il tutto senza rivelare nemmeno un importo. Mettiamo da parte questo fatto per l'Articolo 6.

---

## 5. Una sottigliezza che dà forma a tutto Zcash: hashing ZK-friendly

Ecco un'intuizione che la maggior parte delle introduzioni tralascia, ed è esattamente il punto "incontro tra matematica e ingegneria" che vale la pena evidenziare.

SHA-256 è un'impronta digitale superba per l'informatica di tutti i giorni. Ma Zcash non si limita a *calcolare* hash; deve **dimostrare, all'interno di una prova a conoscenza zero, che un hash è stato calcolato correttamente** (l'Articolo 5 spiega perché). E qui sta l'inghippo: una prova a conoscenza zero lavora nel linguaggio dell'**aritmetica dei campi finiti** (Articolo 1), mentre SHA-256 è costruito con operazioni sui bit (shift, AND, XOR). Esprimere tutte quelle operazioni sui bit nell'aritmetica dei campi è enormemente costoso, e rende le prove enormi e lente.

Così i crittografi di Zcash hanno progettato funzioni hash i cui interni sono *già* aritmetica dei campi, rendendole economiche da dimostrare:

![alt text](/content-images/image-18-89ade807ad.webp)

Questa singola pressione ingegneristica, *"deve essere economico da dimostrare,"* è il motivo per cui Zcash ha inventato e adottato funzioni hash speciali invece di usare SHA-256 ovunque.

---

## 6. Dove tutto questo si trova in Zcash

Zcash ha usato hash diversi nei suoi design, ognuno scelto per il compito:

| Design | Hash usati | Dove |
|---|---|---|
| **Sprout** (il più antico) | **SHA-256** | Commitment delle note e l'albero |
| **Sapling** | **Hash di Pedersen**, più **BLAKE2** | Pedersen per i commitment delle note e l'albero Merkle; BLAKE2 per la derivazione delle chiavi e i nullifier |
| **Orchard** (attuale) | **Sinsemilla**, più **Poseidon** | Sinsemilla per i commitment delle note e l'albero Merkle; Poseidon per il nullifier, il tutto progettato per circuiti aritmetici |

I nomi da riconoscere sono **Pedersen** e **Sinsemilla** (hash in stile commitment costruiti da punti della curva, quindi ereditano il superpotere del "si sommano" e si dimostrano a poco costo) e **Poseidon** (un hash ad aritmetica dei campi costruito appositamente per i circuiti a conoscenza zero). Quando l'Articolo 0 ha detto che il contenuto di una nota viene sigillato in un commitment, *questa* è la macchina che esegue la sigillatura.

Così la domanda rimasta aperta dall'Articolo 0, *"come può una busta sigillata nascondere il suo contenuto ed essere allo stesso tempo impossibile da falsificare?"*, è ora chiusa: **il nascondere grazie a un fattore di blinding casuale, il vincolare grazie alla resistenza alle collisioni o alla trapdoor della curva.**

---

## 7. Un disclaimer onesto

Abbiamo semplificato per mantenere le cose chiare. I veri schemi di commitment specificano esattamente come `v` e `r` sono codificati e quali generatori vengono usati; "nascondere" e "vincolare" esistono ciascuno in varianti (perfetto vs computazionale) con precise definizioni di sicurezza; e non abbiamo mostrato gli interni di Pedersen, Sinsemilla o Poseidon. Nulla di questo cambia l'intuizione: un commitment è un'impronta digitale più casualità, che nasconde ora e vincola per sempre. I dettagli ritornano, segnalati, quando l'articolo sul protocollo ne avrà bisogno.

---

## 8. Riepilogo

- Una **funzione hash** è **un'impronta digitale per i dati**: deterministica, veloce in avanti, a senso unico, resistente alle collisioni, con un **effetto valanga** (entra un bit, esce un'impronta digitale completamente diversa).
- Un **commitment** ti permette di **bloccare un valore in pubblico ora e rivelarlo in seguito senza poter mentire.**
- Pubblicare una nuda impronta digitale `H(v)` vincola ma **non** nasconde. Aggiungere un fattore di blinding casuale, `H(v, r)`, risolve il problema: **nascondere grazie a `r`, vincolare grazie alla resistenza alle collisioni.**
- Zcash usa sia commitment **basati su hash** sia commitment di **Pedersen**; i commitment di Pedersen in più **si sommano**, cosa che l'Articolo 6 sfrutterà per dimostrare privatamente il pareggio dei valori.
- Poiché gli hash devono essere **dimostrati** all'interno di prove a conoscenza zero, Zcash usa hash **ZK-friendly** costruiti con l'aritmetica dei campi (**Pedersen**, **Sinsemilla**, **Poseidon**) invece di usare SHA-256 ovunque.

---

## Glossario

| Termine | Significato semplice |
|---|---|
| **Hash function** | Riduce qualsiasi dato a una breve impronta digitale di dimensione fissa (digest) |
| **Digest** | L'impronta digitale in uscita di una funzione hash |
| **Preimage resistance** | Non puoi risalire da un digest al suo input (senso unico) |
| **Collision resistance** | Non riesci a trovare due input con lo stesso digest |
| **Avalanche effect** | Una minuscola modifica dell'input cambia completamente il digest |
| **Commitment** | Bloccare un valore ora, rivelarlo in seguito, senza poter mentire al riguardo |
| **Blinding factor (`r`)** | Il numero casuale fresco che permette a un commitment di nascondere |
| **ZK-friendly hash** | Un hash costruito con l'aritmetica dei campi, così da essere economico da dimostrare |

---

## FAQ

**Perché non crittografare direttamente il valore invece di fare un commitment su di esso?**
La crittografia riguarda il *segreto che puoi decifrare in seguito*. Un commitment riguarda il *vincolare*: la garanzia che tu non possa cambiare la tua risposta in seguito. Lavori diversi.

**Se i commitment nascondono il valore, come fanno gli altri a controllare le regole?**
Questo è il ruolo delle prove a conoscenza zero (Articolo 5): dimostrano che il valore nascosto rispetta le regole senza rivelarlo.

**SHA-256 è compromesso, visto che Zcash lo evita in alcuni punti?**
No. SHA-256 va bene e Zcash lo usa ancora. È solo costoso *dimostrarlo dentro un circuito*, ed è per questo che gli hash ZK-friendly esistono per quel compito specifico.

**Da dove viene il casuale `r`, e chi lo custodisce?**
Viene generato di fresco quando la nota viene creata ed è noto al proprietario della nota. Fa parte di ciò che rende ogni nota unica e privata.

---

### Metti alla prova la tua intuizione

Fai un commitment sulla tua previsione elettorale come `H(v, r)` e lo pubblichi. Un amico insiste che dovresti pubblicare solo `H(v)` per tenere le cose più semplici. In una frase, perché è una pessima idea se ci sono solo due esiti possibili? *(Risposta qui sotto.)*

<details><summary>Risposta</summary>

Con solo due esiti, il tuo amico può semplicemente calcolare da sé `H("win")` e `H("lose")` e confrontarli con il digest che hai pubblicato, scoprendo all'istante la tua previsione. L'hash nudo vincola ma non nasconde; è il casuale `r` a fermare questo attacco di indovina-e-verifica.
</details>

---

### Il prossimo passo

**Articolo 4 . Alberi Merkle:** ora abbiamo milioni di commitment che si accumulano. L'Articolo 4 mostra come Zcash li organizza in un singolo albero la cui minuscola impronta digitale di radice rappresenta l'intera storia, e come puoi dimostrare che la tua nota si trova in quell'albero senza rivelare quale sia. Quella è la vera forma della "bacheca pubblica" dell'Articolo 0.

*Parte della serie* Zcash from First Principles *per [ZecHub](https://zechub.org). Licenza CC BY-SA 4.0.*
