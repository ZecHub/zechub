# Campi finiti: il sistema numerico in cui vive la crittografia
##### Ricerca originale di [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](image-5.png)

### Perché il "ritorno ciclico" è il fondamento segreto di Zcash

> **Serie:** *Zcash dai primi principi* . **Articolo 1 . Campi finiti**
> **Pubblico:** principianti. Diamo per scontata solo la comune aritmetica scolastica (addizione, moltiplicazione, divisione). Nessuna conoscenza pregressa di crittografia o di matematica superiore.
> **Cosa ti porterai a casa:** una comprensione intuitiva e corretta dei campi finiti, del perché i crittografi li usano e di dove compaiono all'interno di Zcash.

Nell'[Articolo 0](article-0-shielded-transaction.md) abbiamo incontrato cinque personaggi: la nota, il commitment, l'albero dei commitment delle note, il nullifier e la prova a conoscenza zero. Abbiamo lasciato un filo in sospeso: *da dove arrivano davvero tutte le chiavi e le ricette segrete?* Arrivano dai numeri. Ma non i numeri ordinari con cui sei cresciuto. Arrivano da un sistema numerico speciale e autonomo chiamato **campo finito**, e quasi ogni pezzo di crittografia in Zcash è costruito su di esso.

Questo articolo conquista questa idea lentamente. Come promesso, prima l'intuizione. Nessuna formula finché non si guadagna il proprio posto.

---

## 1. Perché dovrebbe interessarti?

I numeri ordinari hanno un problema per la crittografia: ce ne sono infiniti e fanno trapelare informazioni.

Pensa a cosa succede quando un numero diventa *più grande*. Se ti dico che un certo calcolo segreto ha prodotto `8.142.067`, già sai parecchio: è un numero di sette cifre, è dispari, è "abbastanza grande". La dimensione è un indizio. E gli indizi sono esattamente ciò che un sistema di privacy non può permettersi di rivelare.

La crittografia vuole un sistema numerico dove:

- ci sono **finitamente molti** valori, così che un computer possa memorizzarne uno qualunque esattamente, senza arrotondamenti e senza overflow,
- i valori **non rivelano la loro dimensione**, perché il sistema non ha una vera nozione di "più grande",
- puoi comunque **sommare, sottrarre, moltiplicare e dividere** liberamente e in modo reversibile, perché le ricette crittografiche hanno bisogno di vera algebra per funzionare, e
- lo spazio può essere reso **astronomicamente grande**, così che indovinare sia senza speranza.

Quella lista dei desideri ha un nome. È un **campo finito**. Costruiamo l'intuizione di uno prima di scrivere un singolo simbolo.

---

## 2. L'intuizione: un orologio

Usi già un campo finito ogni giorno. È l'orologio sulla tua parete.

Su un orologio a 12 ore, i numeri *tornano ciclicamente*. Parti dalle 10, aggiungi 5 ore, e non finisci sulle "15", finisci sulle **3**. L'orologio ha solo dodici posizioni, e contare oltre la cima semplicemente riporta all'inizio.

![alt text](image-9.png)

Sono appena successe tre cose che sono l'intero punto di questo articolo:

1. **Il mondo è finito.** Ci sono esattamente dodici posizioni, per quanto a lungo si conti.
2. **L'addizione funziona ancora.** Puoi sommare ore tutto il giorno; finisci sempre su una posizione valida dell'orologio.
3. **La dimensione ha smesso di contare.** "Le 3" non ti dice se hai contato 3 ore o 15 o 27. Il ritorno ciclico *ha cancellato l'informazione sulla dimensione.* Quella cancellazione è esattamente la proprietà amica della privacy che volevamo.

Questa aritmetica con ritorno ciclico ha un nome formale: **aritmetica modulare**. L'orologio funziona "modulo 12", scritto **mod 12**. I matematici preferiscono contare le posizioni partendo da 0, quindi un "orologio mod 12" ha in realtà le posizioni `0, 1, 2, ..., 11`. Un orologio mod 7 avrebbe le posizioni da `0` a `6`.

> **L'unica regola:** per calcolare qualcosa "mod p", fai l'aritmetica ordinaria, poi dividi per `p` e tieni solo il resto.
> Esempio mod 7: `5 + 4 = 9`, e `9` lascia resto `2` dopo la divisione per `7`, quindi `5 + 4 = 2 (mod 7)`.

---

## 3. Dall'orologio a un campo

Un orologio ci permette di sommare. Un **campo** è il potenziamento: un sistema numerico in cui tutte e quattro le operazioni si comportano bene, compresa quella più insidiosa, la divisione.

Informalmente, un **campo** è una qualsiasi collezione di "numeri" in cui puoi **sommare, sottrarre, moltiplicare e dividere** (per qualsiasi cosa tranne lo zero), e dove valgono ancora tutte le regole familiari: l'ordine non conta per l'addizione o la moltiplicazione, le parentesi possono essere raggruppate diversamente, ci sono uno `0` e un `1`, e ogni numero ha un opposto e (tranne lo `0`) un reciproco.

I numeri razionali sono un campo. I numeri reali sono un campo. Ciò che vogliamo è uno *finito*.

Ecco il risultato principale, ed è bellissimo:

> **Prendi i numeri interi `0, 1, ..., p-1` e fai tutta l'aritmetica mod `p`. Se `p` è un numero primo, il risultato è un campo finito.** Lo scriviamo `F_p` (si legge "F sotto p").

Quindi `F_7 = {0, 1, 2, 3, 4, 5, 6}` con l'aritmetica in stile orologio mod 7 è un autentico campo finito. Vediamolo respirare.

### Moltiplicazione in F_7 (verificata)

Ogni voce è `(riga x colonna) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Guarda le righe da `1` a `6`: ognuna contiene ogni valore non nullo `1..6` esattamente una volta. Quel motivo "nessuna ripetizione, niente che manca" è l'impronta digitale visibile di un campo.

### Divisione: la magia che richiede un primo

La divisione è semplicemente "moltiplicare per il reciproco". In `F_7`, il reciproco (o **inverso**) di un numero `a` è il valore `a^(-1)` per cui `a x a^(-1) = 1`. Leggendoli direttamente dalla tabella:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Verifichiamone uno: `2 x 4 = 8 = 1 (mod 7)`.  Quindi "dividere per 2" in `F_7` significa "moltiplicare per 4". Ogni elemento non nullo ha un partner. **È questo che rende `F_7` un campo.**

---

## 4. Perché il modulo deve essere primo

Questa è l'idea più importante in assoluto dell'articolo, quindi rendiamola concreta anziché astratta.

Guarda cosa si rompe se proviamo ingenuamente a costruire un "campo" mod `6` (e `6` *non* è primo):

> Esiste un qualche `x` con `2 x x = 1 (mod 6)`? Verificandoli tutti: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **La risposta `1` non compare mai.** Quindi `2` non ha reciproco mod 6. Peggio ancora, `2 x 3 = 6 = 0 (mod 6)`: due numeri non nulli moltiplicati danno zero.

Quella seconda frase è una catastrofe per l'aritmetica. Due cose non nulle che si moltiplicano dando zero (chiamate **divisore dello zero**) significa che la divisione è rotta, e un sistema con la divisione rotta non è un campo. Succede proprio perché `6` si fattorizza come `2 x 3`.

Un primo, per definizione, non ha tali fattori. Quindi mod un primo non possono comparire divisori dello zero, ogni elemento non nullo ottiene un reciproco pulito, e la struttura è un campo a tutti gli effetti.

![alt text](image-8.png)

> **Frase a effetto riutilizzabile per i tuoi articoli:** *modulo primo dentro, divisione pulita fuori.*

---

## 5. L'unica formula che vale la pena incontrare: come i computer trovano gli inversi

Abbiamo letto gli inversi da una tabella per `F_7`, ma il primo di Zcash ha centinaia di cifre; nessuna tabella è possibile. C'è una classica scorciatoia, ed è l'unica formula di questo articolo.

Il **Piccolo Teorema di Fermat** afferma che per un primo `p` e qualsiasi `a` non nullo:

```
a^(p-1) = 1   (mod p)
```

Riorganizzalo (stacca un fattore di `a`) e ottieni l'inverso gratis:

```
a^(-1) = a^(p-2)   (mod p)
```

Verifica in `F_7` (`p = 7`, quindi `p - 2 = 5`): l'inverso di `2` dovrebbe essere `2^5 = 32 = 4 (mod 7)`. E in effetti la nostra tabella diceva `2^(-1) = 4`.  I computer elevano a potenze grandi in modo estremamente veloce, quindi questo trasforma il "trovare il reciproco" in un calcolo rapido ed esatto anche per primi giganteschi.

Non hai bisogno di memorizzare questo. Hai bisogno di sapere che **la divisione in un campo finito è un'operazione veloce ed esatta**, che è esattamente il motivo per cui i crittografi sono felici di costruire su di essa.

---

## 6. Perché la crittografia si è innamorata dei campi finiti

Mettendo insieme l'intuizione, ecco l'intera tesi in una pagina.

| Proprietà di `F_p` | Perché un sistema di privacy la desidera |
|---|---|
| **Finito** | Un computer memorizza qualsiasi elemento esattamente; niente arrotondamenti, niente overflow, niente imprecisione in virgola mobile |
| **Ritorno ciclico** | Cancella la "dimensione", così un valore non rivela nulla su come è stato prodotto |
| **Tutte e quattro le operazioni funzionano** | Le ricette crittografiche (chiavi, commitment, prove) hanno bisogno di vera algebra, non solo di conteggio |
| **Dimensione scelta a piacere** | Scegli un primo a 255 bit o a 381 bit e il campo ha più elementi degli atomi nell'universo osservabile; indovinare è senza speranza |
| **Esatto e deterministico** | Due parti oneste che calcolano la stessa cosa ottengono sempre risultati identici, da cui le prove dipendono |

Un campo finito è, in una frase, **un parco giochi per l'aritmetica perfettamente chiuso, perfettamente esatto, perfettamente enorme.** Tutto il resto in Zcash è costruito giocando al suo interno.

---

## 7. Dove vive tutto questo in Zcash

Non devi prendere per fede che "Zcash usa i campi finiti". Ecco la mappa concreta (il macchinario più profondo è per gli articoli successivi; questo serve solo a mostrare che le impronte sono reali).

- **Sapling** (un design schermato più vecchio) costruisce le sue prove su una curva chiamata **BLS12-381**, il cui campo base usa un primo lungo **381 bit**. Ogni coordinata, chiave ed elemento di prova è un elemento di un campo finito costruito su quel primo.
- **Orchard** (l'attuale design schermato) usa una coppia di curve chiamate **Pallas e Vesta** (le curve "Pasta"), i cui campi usano primi lunghi all'incirca **255 bit**.
- Il **commitment della nota**, il **nullifier** e i numeri all'interno di una **prova a conoscenza zero** dell'Articolo 0 sono tutti, in fondo, elementi di uno di questi campi finiti. Quando il protocollo dice "calcola questo commitment", significa "fai questa aritmetica mod quel primo".

![alt text](image-7.png)

Quindi la risposta alla domanda aperta dell'Articolo 0, *"da dove arrivano le ricette segrete?"*, comincia qui: **tutto inizia come aritmetica in un campo finito.** Nel prossimo articolo prenderemo quel campo e costruiremo gli oggetti veri e propri, i punti su una curva ellittica, che diventano chiavi e commitment.

---

## 8. Una nota onesta

Per rimanere amichevoli verso i principianti, abbiamo semplificato alcune cose vere. I campi finiti non vengono solo nella varietà `F_p`; puoi anche costruire campi con `p^n` elementi (chiamati **campi di estensione**), e quelli contano per gli "accoppiamenti" (pairings) su cui si basa il sistema di prove di Sapling. Abbiamo anche saltato la lista completa degli assiomi di campo e sorvolato su come si scelgono e si validano i primi di queste dimensioni. Niente di tutto ciò cambia l'intuizione che ora possiedi; la affina. Reintrodurremo la precisione, con dei segnalibri, quando un articolo successivo ne avrà bisogno.

---

## 9. Riepilogo

- La crittografia ha bisogno di un sistema numerico che sia **finito, esatto, cieco alla dimensione, completamente invertibile ed enorme.** Quel sistema è un **campo finito**.
- L'intuizione è un **orologio**: aritmetica che **torna ciclicamente** (aritmetica modulare), che convenientemente cancella la "dimensione" di un numero.
- Fare aritmetica con i numeri `0..p-1` mod un **primo** `p` dà un vero campo `F_p`, dove puoi anche **dividere** perché ogni elemento non nullo ha un inverso.
- Il modulo **deve essere primo**: un modulo composto crea divisori dello zero (come `2 x 3 = 0 mod 6`) e rompe la divisione.
- I computer trovano gli inversi velocemente tramite il **Piccolo Teorema di Fermat** (`a^(-1) = a^(p-2)`).
- In **Zcash**, ogni chiave, commitment, nullifier ed elemento di prova è in ultima analisi un elemento di un grande campo finito (campi Pasta a 255 bit per Orchard, un campo a 381 bit per la BLS12-381 di Sapling).

---

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| **Aritmetica modulare** | Aritmetica che torna ciclicamente dopo aver raggiunto un valore fisso, come un orologio |
| **mod p** | "Dividi per `p` e tieni il resto" |
| **Campo** | Un sistema numerico in cui addizione, sottrazione, moltiplicazione e divisione funzionano tutte |
| **Campo finito `F_p`** | I numeri `0..p-1` con l'aritmetica fatta mod un primo `p` |
| **Inverso (reciproco)** | L'elemento `a^(-1)` con `a x a^(-1) = 1`; "dividere per `a`" significa moltiplicare per esso |
| **Divisore dello zero** | Due valori non nulli il cui prodotto è zero; la cosa che rovina i moduli composti |
| **Primo** | Un numero intero maggiore di 1 senza fattori tranne 1 e sé stesso |

---

## FAQ

**Perché non usare semplicemente gli interi ordinari o i decimali?**
I decimali arrotondano e derivano; gli interi crescono senza limite e fanno trapelare la dimensione. I campi finiti sono esatti, limitati e ciechi alla dimensione, cosa che la crittografia richiede.

**Il "ritorno ciclico" perde informazioni?**
Di proposito, sì. Cancellare la dimensione dei valori intermedi è una funzionalità, non un difetto, per la privacy.

**Un primo più grande è sempre più sicuro?**
In senso lato, un campo più grande significa più valori possibili e un indovinare più difficile, ma la sicurezza dipende dall'intera costruzione, non dalla sola dimensione del campo. Gli articoli successivi rendono questo preciso.

**Perché proprio questi primi (255 bit, 381 bit) in Zcash?**
Sono scelti in modo che le curve costruite su di essi abbiano la struttura e l'efficienza giuste per il sistema di prove. Quella "struttura giusta" è l'argomento dei prossimi due articoli.

---

### Metti alla prova la tua intuizione

In `F_7`, quanto fa `5 - 6`? (Ricorda: resta dentro `{0,...,6}` tornando ciclicamente.) *(Risposta sotto.)*

<details><summary>Risposta</summary>

`5 - 6 = -1`, e `-1` riportato in `F_7` è `6` (perché `6 + 1 = 7 = 0`). Quindi `5 - 6 = 6 (mod 7)`. La sottrazione non lascia mai il campo; torna semplicemente ciclicamente nell'altra direzione.
</details>

---

### Cosa viene dopo

**Articolo 2 . Curve ellittiche:** prendiamo il campo finito che abbiamo appena costruito e lo usiamo per disegnare uno strano tipo di curva i cui punti possono essere "sommati" tra loro. Quei punti diventano le chiavi e i commitment di Zcash, e nascondono una botola unidirezionale che rende possibile l'intero sistema di privacy. Prima l'intuizione, come sempre.

*Parte della serie* Zcash dai primi principi *per [ZecHub](https://zechub.org). Concesso in licenza CC BY-SA 4.0.*
