# Alberi di Merkle: come la blockchain ricorda ogni nota
##### Ricerca originale di [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](image-19.png)

### Riassumere milioni di commitment in un'unica minuscola impronta

> **Serie:** *Zcash from First Principles* . **Articolo 4 . Alberi di Merkle**
> **Pubblico:** nuovi arrivati. Costruiamo a partire dall'[Articolo 3 (hashing e commitment)](article-3-hashing-commitments.md). Se sai cos'è un'impronta digitale e cos'è un commitment, sei pronto.
> **Cosa porterai con te:** un quadro intuitivo e corretto degli alberi di Merkle, di come provare l'appartenenza senza rivelare a quale elemento ti riferisci, ed esattamente di come tutto questo diventa l'albero dei commitment delle note di Zcash.

L'[Articolo 0](article-0-shielded-transaction.md) ha descritto una "bacheca pubblica" che contiene ogni nota mai creata e che si limita a crescere. Ormai puoi intuire cosa vi è appuntato: i **commitment** (Articolo 3), le buste sigillate. Ma una bacheca reale ne conterrebbe *centinaia di milioni*. Come fa la rete a memorizzarli, a verificarli e a permetterti di provare che la tua busta è sulla bacheca senza indicarla? La risposta è una delle strutture più eleganti dell'informatica: l'**albero di Merkle.**

---

## 1. Perché dovrebbe interessarti?

Due problemi compaiono nel momento in cui si ha una gigantesca lista pubblica di commitment.

**Problema uno: integrità su larga scala.** Se la lista ha 300 milioni di voci, come fa chiunque a confermare che *nemmeno una* sia stata segretamente alterata? Ricontrollare 300 milioni di elementi a ogni sguardo è impossibile.

**Problema due: appartenenza privata.** Per spendere una nota (Articolo 0), devi provare che il tuo commitment è realmente sulla bacheca. Ma se lo indichi ("è la voce numero 4.201.337!"), ti sei appena deanonimizzato. Devi provare *"la mia busta è da qualche parte su questa bacheca"* senza rivelare **quale.**

Un albero di Merkle risolve entrambi i problemi in un colpo solo. Comprime l'intera lista in un'unica impronta e ti permette di provare l'appartenenza con una prova minuscola che nasconde la posizione.

---

## 2. L'intuizione: un torneo di impronte digitali

Immagina un tabellone a eliminazione di un torneo, ma invece di avanzare i giocatori, **vengono combinate le impronte digitali.**

- In fondo, ogni pezzo di dato ottiene la propria impronta (il suo hash dell'Articolo 3). Queste sono le **foglie.**
- Accoppiale. Le due impronte di ogni coppia vengono sottoposte ad hashing *insieme* in un'unica impronta genitore.
- Accoppia i genitori, applica l'hash a ogni coppia insieme, e così via.
- Continua finché un'**unica impronta** non si trova in cima. Quel campione è la **radice di Merkle.**

![alt text](image-20.png)

La proprietà più importante in assoluto deriva direttamente dall'effetto valanga (Articolo 3):

> **La radice è un'impronta di *tutto* ciò che sta sotto di essa.** Cambia una qualsiasi foglia, anche di un solo bit, e la sua impronta cambia, il che cambia il suo genitore, che cambia *quel* genitore, fino in cima. **La radice cambia.** Quindi un piccolo valore di radice certifica l'integrità dell'intera lista. Questo risolve il Problema uno.

---

## 3. Un albero reale, calcolato esattamente

Costruiamo l'albero a quattro foglie qui sopra con vere impronte SHA-256 sulle foglie `A, B, C, D` (i digest sono mostrati troncati per leggibilità):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Tutto si riduce a "fai l'hash di una cosa, poi fai l'hash di coppie di hash." Niente di più esotico dell'Articolo 3, disposto ad albero.

---

## 4. La parte ingegnosa: provare l'appartenenza senza rivelare la posizione

Ora il Problema due. Diciamo che vuoi provare che la foglia `C` è nell'albero, a qualcuno che conosce solo la **radice**. *Non* gli consegni l'intero albero. Gli consegni solo le impronte necessarie per risalire da `C` alla radice, chiamate **percorso di autenticazione** (o **prova di Merkle**):

> Per provare che `C` è nell'albero, fornisci:
> - il suo fratello `hD`, e
> - il suo zio `hAB`.

Il verificatore, conoscendo solo la radice, ricalcola la risalita:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Calcolato per davvero: questo produce `1b3faa3fcc5e...`, che **corrisponde alla radice.**  La foglia è provata essere nell'albero.

![alt text](image-21.png)

Due cose rendono tutto questo potente:

- **È minuscolo.** Per 4 foglie hai fornito 2 hash. Per un albero di `n` foglie ne fornisci solo circa **log_2(n)**. Per un miliardo di foglie, sono all'incirca **30 hash**, non un miliardo. La prova cresce a malapena anche quando l'albero esplode di dimensioni.
- **È il seme della privacy.** La prova mostra che la tua foglia è *da qualche parte* nell'albero. Quando questo stesso controllo viene eseguito *all'interno di una prova a conoscenza zero* (Articolo 5), perfino il percorso stesso è nascosto, così provi "la mia nota è nell'albero" senza rivelare né la nota né la sua posizione. Questo risolve completamente il Problema due.

---

## 5. Dall'albero di Merkle all'albero dei commitment delle note di Zcash

Ora possiamo dire con precisione cos'è davvero la "bacheca pubblica" dell'Articolo 0:

> L'**albero dei commitment delle note** è un albero di Merkle le cui **foglie sono commitment di note.** Ogni volta che una nota viene creata in qualsiasi parte del mondo, il suo commitment viene aggiunto come foglia successiva e la radice viene aggiornata.

Alcuni dettagli reali:

- **Cresce soltanto.** Le foglie vengono aggiunte, mai rimosse. Questo si chiama **albero di Merkle incrementale.** (Corrisponde al "la bacheca non smonta mai nulla" dell'Articolo 0.)
- **La radice è chiamata *anchor*.** Quando spendi, la tua transazione fa riferimento a un anchor recente e prova, a conoscenza zero, che il commitment della tua nota si trova nell'albero con quella radice.
- **Profondità fissa.** Gli alberi schermati di Zcash hanno profondità **32**, il che significa che possono contenere fino a `2^(32)` (oltre quattro miliardi di) note.
- **Hashing ZK-friendly.** L'albero non è costruito con SHA-256. Sapling effettua l'hash dell'albero con gli **hash di Pedersen** e Orchard usa **Sinsemilla** (entrambi dall'Articolo 3), proprio perché la risalita di appartenenza sia economica da provare all'interno di un circuito.

![alt text](image-22.png)

### Una cosa che l'albero *non* gestisce: le doppie spese

L'albero prova che una nota **esiste**. Non impedisce di per sé di spendere la stessa nota due volte. Quel compito appartiene all'**insieme dei nullifier** dell'Articolo 0: una collezione separata di "gettoni di annullamento." Quando spendi, pubblichi il nullifier della nota e la rete rifiuta qualsiasi nullifier che abbia già visto.

Quindi le due strutture pubbliche svolgono ruoli complementari, e tenerle separate è esattamente ciò che recide il legame tra la nascita di una nota e la sua morte:

| Struttura | Domanda a cui risponde | Aggiornata quando |
|---|---|---|
| **Albero dei commitment delle note** | "Questa nota esiste?" | Una nota viene **creata** (commitment aggiunto) |
| **Insieme dei nullifier** | "Questa nota è già stata spesa?" | Una nota viene **spesa** (nullifier pubblicato) |

---

## 6. Una dichiarazione onesta

Semplificazioni, come al solito. I veri alberi di Merkle incrementali tengono traccia dei nodi di "frontiera" così che la radice possa aggiornarsi senza ricostruire tutto; la rete conserva una finestra di anchor recenti, non solo l'ultima, così che i wallet non si rompano a ogni nuovo blocco; e le foglie vuote usano un valore di padding definito. Abbiamo inoltre disegnato alberi binari con ordinate potenze di due. Niente di tutto questo cambia l'intuizione: foglie di commitment, sottoposte ad hashing a coppie fino a un'unica radice, con brevi prove di appartenenza. La contabilità esatta tornerà nell'articolo sul protocollo.

---

## 7. Riepilogo

- Un **albero di Merkle** trasforma i dati in **foglie** tramite hashing, poi applica l'hash a **coppie verso l'alto** finché non resta un'unica **radice**.
- Grazie all'effetto valanga, la **radice è un'impronta dell'intera lista**: cambia una foglia e la radice cambia. Un piccolo valore certifica un dataset enorme.
- Una **prova di appartenenza (percorso di autenticazione)** è semplicemente l'insieme dei fratelli lungo la risalita verso la radice, circa **log_2(n)** hash, così le prove restano minuscole anche per miliardi di foglie.
- Eseguito **all'interno di una prova a conoscenza zero**, quel controllo di appartenenza nasconde *quale* foglia intendi, provando "la mia nota è nell'albero" senza rivelare la nota o la sua posizione.
- L'**albero dei commitment delle note** di Zcash è un albero di Merkle **incrementale** di commitment di note, profondità **32**, la cui radice è l'**anchor**; Sapling lo sottopone ad hashing con **Pedersen** e Orchard con **Sinsemilla**.
- L'albero prova l'**esistenza**; il separato **insieme dei nullifier** previene le **doppie spese**. Tenerli separati è ciò che scollega la nascita di una nota dalla sua morte.

---

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| **Albero di Merkle** | Un albero di hash; le foglie sono impronte di dati, i genitori applicano l'hash ai propri figli |
| **Foglia** | Un nodo in fondo; in Zcash, un commitment di nota |
| **Radice di Merkle** | L'unica impronta in cima che riassume l'intero albero |
| **Percorso di autenticazione / prova di Merkle** | Gli hash dei fratelli necessari a provare che una foglia è nell'albero |
| **Albero di Merkle incrementale** | Un albero di Merkle solo in aggiunta (le foglie vengono solo aggiunte) |
| **Anchor** | Una radice di Merkle a cui una spesa fa riferimento come "lo stato dell'albero contro cui sto provando" |
| **Insieme dei nullifier** | La collezione separata di marcatori-di-spesa che blocca le doppie spese |

---

## FAQ

**Perché un albero e non semplicemente una lunga lista di hash?**
Una lista piatta ti costringerebbe a rivelare o elaborare ogni voce per provare l'appartenenza. Un albero ti dà prove di dimensione logaritmica e un'unica radice per l'integrità.

**Il verificatore ha bisogno dell'intero albero?**
No. Il verificatore ha bisogno solo della **radice** più il tuo breve percorso di autenticazione. È tutto qui.

**Perché proprio profondità 32?**
Limita l'albero a circa quattro miliardi di note, che è ampio margine, mantenendo al contempo la prova di appartenenza (e il suo costo in-circuito) di dimensione fissa e gestibile.

**Se la radice cambia a ogni nuova nota, come fanno le vecchie prove a restare valide?**
La rete ricorda una finestra di radici recenti (anchor), così che una prova fatta contro un anchor leggermente più vecchio sia comunque verificabile. L'articolo sul protocollo rende tutto questo preciso.

---

### Metti alla prova la tua intuizione

Nel nostro albero a 4 foglie, supponi che un attaccante scambi segretamente la foglia `C` con un valore diverso ma lasci invariata la radice pubblicata. Cosa va storto per lui, e perché non può sistemarlo in silenzio? *(Risposta sotto.)*

<details><summary>Risposta</summary>

Cambiare `C` cambia `hC` (effetto valanga), che cambia `hCD = H(hC, hD)`, che cambia `ROOT = H(hAB, hCD)`. Quindi la radice ricalcolata non corrisponde più alla radice pubblicata, e la manomissione viene rilevata. Per "sistemarlo in silenzio" dovrebbe trovare un `C` diverso che produca lo *stesso* `hC`, ovvero una collisione di hash, irrealizzabile per l'Articolo 3. L'integrità regge.
</details>

---

### Cosa viene dopo

**Articolo 5 . Prove a conoscenza zero:** il crescendo. Abbiamo ora costruito note, commitment e l'albero, e continuiamo a dire "provato a conoscenza zero." L'Articolo 5 spiega finalmente come puoi provare che un'affermazione è vera, che la tua nota è nell'albero, che il tuo nullifier è corretto, che il denaro è bilanciato, senza rivelare nulla di tutto ciò.

*Parte della serie* Zcash from First Principles *per [ZecHub](https://zechub.org). Licenza CC BY-SA 4.0.*
