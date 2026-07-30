# Curve Ellittiche: Dove Nascono le Chiavi e gli Impegni di Zcash
##### Ricerca originale di [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](image-10.png)

### Una strada a senso unico costruita con punti su una curva

> **Serie:** *Zcash dai Primi Principi* . **Articolo 2 . Curve Ellittiche**
> **Pubblico:** principianti. Presupponiamo solo l'[Articolo 1 (campi finiti)](article-1-finite-fields.md): aritmetica che si avvolge mod un primo. Nessun altro prerequisito necessario.
> **Cosa porterai con te:** un'immagine intuitiva e corretta delle curve ellittiche, la "trapdoor" che le rende utili ed esattamente come Zcash le trasforma in chiavi e impegni.

L'[Articolo 1](article-1-finite-fields.md) ci ha dato un terreno di gioco perfetto per l'aritmetica: il campo finito. Ma un campo di per sé è solo numeri. Per costruire le chiavi e le "buste sigillate" dell'[Articolo 0](article-0-shielded-transaction.md), Zcash ha bisogno di un oggetto con un tipo speciale di difficoltà unidirezionale: facile da calcolare in avanti, praticamente impossibile da invertire. Quell'oggetto è una **curva ellittica**. Questo articolo la costruisce da zero, l'intuizione prima dell'algebra.

---

## 1. Perché dovrebbe interessarti?

Ogni sistema di privacy ha bisogno di una **strada a senso unico**: un'operazione banale da percorrere in avanti ed effettivamente impossibile da percorrere all'indietro.

Ecco perché. La tua **chiave segreta** è un numero che tieni nascosto. La tua **chiave pubblica** (e il tuo indirizzo) viene derivata da essa e mostrata al mondo. L'intera sicurezza del sistema poggia su un fatto: *data la chiave pubblica, nessuno può risalire alla tua chiave segreta.* Se potessero, potrebbero spendere il tuo denaro.

Quindi abbiamo bisogno di un'operazione matematica in cui:

- andare **avanti** (segreta -> pubblica) sia veloce e facile, ma
- andare **indietro** (pubblica -> segreta) sia così difficile che tutti i computer sulla Terra che lavorano per l'intera durata dell'universo non finirebbero.

La semplice moltiplicazione nei campi finiti non è sufficiente; la divisione la annulla all'istante (era proprio questo il punto dell'Articolo 1). Ci serve qualcosa senza un comodo pulsante di "annulla". Le curve ellittiche forniscono esattamente questo e, come bonus, i loro punti si combinano in un modo perfetto per costruire impegni. Vediamo come.

---

## 2. L'intuizione: una curva i cui punti puoi "sommare"

Dimentica la crittografia per un momento. Una **curva ellittica** è semplicemente l'insieme dei punti `(x, y)` che soddisfano un'equazione della forma:

```
y^2 = x^3 + ax + b
```

Sui numeri ordinari assomiglia a una curva liscia e ondulata, spesso con un cappio arrotondato e due code:

![alt text](image-14.png)

La parte davvero sorprendente: **puoi "sommare" due punti su questa curva per ottenere un terzo punto sulla stessa curva.** Non è l'ordinaria addizione di coordinate. È una regola geometrica, ed è più facile da *vedere* che da spiegare.

### La regola della corda (sommare due punti diversi)

Per sommare `P + Q`:

1. Traccia una retta che passa per `P` e `Q`.
2. Quella retta colpisce la curva esattamente in un altro punto. Chiamalo `R*`.
3. **Rifletti `R*` rispetto all'asse orizzontale.** Quella riflessione è la risposta, `P + Q`.

![alt text](image-11.png)

### La regola della tangente (sommare un punto a se stesso)

Per calcolare `P + P` (scritto `2P`), non c'è un secondo punto attraverso cui tracciare una retta, quindi usi invece la retta **tangente** in `P`, poi segui la stessa ricetta "terza intersezione, poi rifletti".

Questa è l'intera operazione. Due regole geometriche. Con esse, i punti di una curva ellittica formano ciò che i matematici chiamano un **gruppo**: un insieme con un'"addizione" ben definita. Ha persino uno "zero".

### Il punto all'infinito (lo zero della curva)

Ogni sistema numerico ha bisogno di uno `0`, la cosa che non cambia nulla quando la sommi. Su una curva ellittica, quel ruolo è svolto da uno speciale punto extra chiamato **punto all'infinito**, scritto `O`. Puoi immaginarlo come "infinitamente in alto", il luogo dove le rette verticali si incontrano. Sommare `O` a qualsiasi punto lo lascia invariato, esattamente come sommare `0`.

---

## 3. Dalle immagini a un campo finito

La curva liscia di sopra è l'*intuizione*. Ma Zcash non usa i numeri reali (arrotondano e fanno trapelare la dimensione, come da Articolo 1). Usa una curva ellittica **su un campo finito**: la stessa equazione `y^2 = x^3 + ax + b`, ma con tutta l'aritmetica eseguita mod un primo.

Quando lo fai, la bella curva si frantuma in uno **sparpaglio di punti scollegati**, un punto per ogni coppia `(x, y)` che soddisfa l'equazione mod `p`. Smette del tutto di assomigliare a una curva. Ma ecco la cosa cruciale:

> **L'algebra della regola della corda-e-tangente funziona ancora perfettamente.** Le stesse formule che trovavano `P + Q` geometricamente ora lo calcolano con l'aritmetica dei campi finiti. I punti formano ancora un gruppo, con lo stesso `0` (il punto all'infinito).

Rendiamolo concreto con un esempio minuscolo e interamente verificato.

### Una curva completa, calcolata esattamente

Prendi `y^2 = x^3 + 2x + 2` sul campo finito `F_17`. Calcolando ogni punto valido si ottengono esattamente **18 punti, più il punto all'infinito = 19 in totale.** Alcuni di essi:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Ora scegli il punto `G = (5, 1)` e continua a sommarlo a se stesso. Guarda cosa succede (ogni riga qui sotto è stata calcolata, non indovinata):

| Passo | Punto | Passo | Punto |
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` | **O (infinito)** |
| `10G` | (7, 11) | | |

Due cose da notare:

- **Visita tutti i 18 punti finiti e poi atterra su `O`** al passo 19, dopodiché si ripeterebbe per sempre. Il punto di partenza `G` "genera" l'intero gruppo, quindi lo chiamiamo **generatore**.
- È un gruppo verificato: per esempio `1G + 2G = (5,1) + (6,3) = (10,6)`, che è esattamente `3G`.  L'addizione è internamente coerente, proprio come richiede un gruppo.

---

## 4. La trapdoor: la moltiplicazione scalare

Quella tabella di `1G, 2G, 3G, ...` è il cuore di tutto. Sommare ripetutamente un punto a se stesso si chiama **moltiplicazione scalare**: il punto `kG` significa "`G` sommato a se stesso `k` volte."

Ora la magia. Considera le due direzioni:

| Direzione | Domanda | Difficoltà |
|---|---|---|
| **In avanti** | Dati `k` e `G`, calcola `kG` | **Facile.** Anche per `k` astronomicamente enormi, un trucco chiamato *double-and-add* ci arriva in poche centinaia di passi |
| **All'indietro** | Dati `G` e `kG`, recupera `k` | **Effettivamente impossibile** su una vera curva crittografica |

Quell'asimmetria è la **strada a senso unico** di cui avevamo bisogno nella Sezione 1. Il problema all'indietro ("quale `k` ha prodotto questo punto?") si chiama **Problema del Logaritmo Discreto su Curva Ellittica (ECDLP)**, e sulle curve che Zcash usa, nessun metodo noto lo risolve prima della morte termica dell'universo.

![alt text](image-12.png)

> Nella nostra curva giocattolo `F_17` *potresti* semplicemente leggere `k` dalla tabella, perché ha solo 19 punti. Le curve reali hanno circa `2^(255)` punti. La tabella avrebbe più righe degli atomi presenti nell'universo, quindi "leggerlo dalla tabella" non è un'opzione. La piccolezza è ciò che rende la curva giocattolo didattica ed è anche il motivo per cui non è sicura.

---

## 5. Come nascono le chiavi (la ricompensa)

Ora abbiamo tutto il necessario per spiegare una vera chiave crittografica, ed è sorprendentemente semplice:

> **Scegli un numero segreto `k`. Pubblica il punto `kG`. Tutto qui.**
> `k` è la tua **chiave privata**. `kG` è la tua **chiave pubblica**. La strada a senso unico (ECDLP) garantisce che nessuno possa ricondurre `kG` a `k`.

Questa singola idea, *una chiave pubblica è uno scalare segreto moltiplicato per un generatore fisso*, è il seme delle chiavi di spesa, delle viewing key e degli indirizzi di Zcash. L'intero albero delle chiavi sovrappone più struttura a questo, ma ogni ramo cresce da questa radice.

### Bonus: perché i punti della curva costituiscono impegni perfetti

Ricorda la "busta sigillata" (impegno) dell'Articolo 0, che doveva **nascondere** il proprio contenuto pur essendo **impossibile da falsificare**. Le curve ellittiche ci offrono un modo pulito per costruirne uno. Prendi due punti generatori pubblici fissi `G` e `H`, un valore segreto `v` e un numero casuale di mascheramento (blinding) `r`, e forma:

```
Impegno  =  v.G  +  r.H
```

Questo è un **impegno di Pedersen**, e possiede entrambe le proprietà che volevamo:

- **Occultamento:** il `r` casuale spalma il risultato su tutta la curva, quindi il punto non rivela nulla su `v`.
- **Vincolo:** l'ECDLP rende impraticabile trovare una *diversa* coppia `(v, r)` che dia lo stesso punto, quindi non puoi cambiare idea su ciò a cui ti sei impegnato.

Una proprietà bonus si rivela preziosissima più avanti: questi impegni **si sommano**. L'impegno a `v_1` più l'impegno a `v_2` è un impegno valido a `v_1 + v_2`. Quel comportamento "omomorfo" è il modo in cui Zcash dimostrerà più avanti che il denaro che *entra* in una transazione è uguale al denaro che ne *esce*, senza rivelare alcun importo. Lo metteremo a frutto intorno all'Articolo 6.

---

## 6. Dove vive tutto questo in Zcash

Le impronte sono concrete e verificabili.

| Design di Zcash | Curve che usa | Ruolo |
|---|---|---|
| **Sapling** (più vecchia) | **BLS12-381** più una curva embedded chiamata **Jubjub** | BLS12-381 porta il sistema di prove; Jubjub è costruita sul campo scalare di BLS12-381 in modo che le operazioni su chiavi e impegni siano economiche da eseguire *all'interno* di una prova a conoscenza zero |
| **Orchard** (attuale) | **Pallas** e **Vesta** (il ciclo "Pasta") | Pallas porta le chiavi e gli impegni di Orchard; l'accoppiamento Pallas/Vesta è organizzato appositamente per rendere efficienti le prove avanzate |

Le ragioni per cui una curva viene "embedded" all'interno del campo di un'altra, e perché un *ciclo* di due curve è utile, sono reali e importanti, ma appartengono agli articoli sui sistemi di prove. Per ora il messaggio da portare a casa è solido: **ogni chiave di Zcash è uno scalare moltiplicato per un generatore, e ogni impegno di Zcash è una somma di punti della curva**, che vivono su una di queste curve nominate.

![alt text](image-13.png)

---

## 7. Un onesto disclaimer

Alcune semplificazioni hanno mantenuto questo testo leggibile. Abbiamo usato la forma **Weierstrass corta** (`y^2 = x^3 + ax + b`); le curve di Zcash sono spesso scritte in altre forme equivalenti (Jubjub è una curva *twisted Edwards*) scelte per efficienza e sicurezza, ma l'idea di gruppo è identica. Non abbiamo definito le esatte formule di addizione dei punti (sono la versione algebrica di "terza intersezione, poi rifletti"), e abbiamo messo da parte sottigliezze come l'ordine della curva, i cofattori e i "pairing", che diventano importanti negli articoli sui sistemi di prove. Niente di tutto ciò cambia l'intuizione; la affina.

---

## 8. Riepilogo

- Un sistema di privacy ha bisogno di una **strada a senso unico**: facile in avanti, impraticabile all'indietro. Le curve ellittiche ne forniscono una.
- Una **curva ellittica** è l'insieme dei punti che soddisfano `y^2 = x^3 + ax + b`, e i suoi punti possono essere **sommati** tramite la regola geometrica della **corda-e-tangente**, con uno speciale **punto all'infinito** che funge da zero.
- Su un **campo finito** la curva diventa uno sparpaglio di punti, ma la stessa addizione funziona ancora e i punti formano un **gruppo**. (Esempio verificato: `y^2 = x^3 + 2x + 2` su `F_17` ha 19 punti, e `G = (5,1)` li genera tutti.)
- La **moltiplicazione scalare** `kG` è facile da calcolare ma impraticabile da invertire: l'**ECDLP**. Questa è la trapdoor.
- **Chiavi:** chiave privata `k`, chiave pubblica `kG`. **Impegni:** forma di Pedersen `v.G + r.H`, che nasconde, vincola e convenientemente **si somma**.
- In **Zcash**, Sapling usa **BLS12-381 + Jubjub** e Orchard usa le curve **Pallas/Vesta (Pasta)**; ogni chiave e ogni impegno vivono su queste.

---

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| **Curva ellittica** | Punti che soddisfano `y^2 = x^3 + ax + b`, con una speciale "addizione" di punti |
| **Addizione di punti** | La regola della corda-e-tangente: retta per due punti, prendi la terza intersezione, rifletti |
| **Punto all'infinito (`O`)** | Lo "zero" della curva; sommarlo non cambia nulla |
| **Generatore (`G`)** | Un punto base i cui multipli alla fine coprono l'intero gruppo |
| **Moltiplicazione scalare (`kG`)** | Sommare `G` a se stesso `k` volte; facile in avanti, difficile da invertire |
| **ECDLP** | Il problema difficile di recuperare `k` da `kG`; il fondamento della sicurezza |
| **Impegno di Pedersen** | `v.G + r.H`; una busta sigillata che nasconde, vincola e si somma |

---

## FAQ

**Perché le curve invece di semplici grandi numeri mod un primo?**
Entrambi possono fornire una strada a senso unico, ma le curve ellittiche raggiungono la stessa sicurezza con chiavi molto più piccole e operazioni più veloci, e la loro aritmetica dei punti è ideale per gli impegni.

**È dimostrato che l'ECDLP è difficile?**
Non è *dimostrato* impossibile, ma decenni di intensi sforzi non hanno trovato alcun attacco efficiente su curve ben scelte. La sicurezza poggia su questa assunzione ben collaudata.

**Un computer quantistico potrebbe romperlo?**
Un computer quantistico abbastanza grande potrebbe rompere l'ECDLP. Questa è una nota preoccupazione a lungo termine in tutto il settore e un'area di ricerca attiva; le curve di oggi rimangono sicure contro i computer classici.

**Perché Zcash usa più di una curva?**
Compiti diversi. Una curva porta il sistema di prove a conoscenza zero; un'altra (embedded nel campo della prima) rende efficienti le operazioni su chiavi e impegni all'interno della prova. I prossimi articoli spiegano perché quell'accoppiamento è importante.

---

### Metti alla prova la tua intuizione

Usando la tabella verificata nella Sezione 3, quanto fa `9G + 10G` sulla nostra curva giocattolo? E cosa ti dice la risposta su `G`? *(Risposta sotto.)*

<details><summary>Risposta</summary>

`9 + 10 = 19`, e abbiamo visto che `19G = O`, il punto all'infinito. Quindi `9G + 10G = O`. Questo significa che `10G` è il **negativo** (inverso additivo) di `9G`: due punti che si sommano dando il punto "zero". Su una curva, il negativo di un punto è semplicemente la sua immagine speculare rispetto all'asse x, e infatti `9G = (7,6)` e `10G = (7,11)` condividono la stessa `x` e hanno valori di `y` la cui somma è `17 = 0 (mod 17)`. La struttura è perfettamente coerente, che è esattamente ciò che garantisce "è un gruppo".
</details>

---

### Cosa viene dopo

**Articolo 3 . Hashing e impegni:** apriremo per bene la "magica busta sigillata". Hai ora visto un modo per costruire un impegno a partire dai punti della curva; in seguito ci chiederemo cosa significhino davvero occultare e vincolare, incontreremo le funzioni hash e collegheremo entrambe agli impegni delle note che ancorano ogni pagamento Zcash.

*Parte della serie* Zcash dai Primi Principi *per [ZecHub](https://zechub.org). Concesso in licenza CC BY-SA 4.0.*
