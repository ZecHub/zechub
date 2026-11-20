# Campi finiti: il sistema numerico in cui vive la crittografia
##### Ricerca originale di [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-5-6e8a8950f8.webp)

### Perché "ripartire da capo" è il fondamento segreto di Zcash

> **Serie:** *Zcash dai primi principi* . **Articolo 1 . Campi finiti**
> **Pubblico:** principianti. Diamo per scontata solo l'aritmetica ordinaria di scuola (addizioni, moltiplicazioni, divisioni). Nessuna conoscenza preliminare di crittografia o matematica superiore.
> **Cosa ti porterai via:** una comprensione intuitiva e corretta dei campi finiti, del perché i crittografi li usano e di dove compaiono dentro Zcash.

In [Articolo 0](article-0-shielded-transaction.md) abbiamo incontrato cinque personaggi: la nota, il commitment, l'albero dei commitment delle note, il nullifier e la prova a conoscenza zero. Abbiamo lasciato un filo sospeso: *da dove vengono in realtà tutte le chiavi e le ricette segrete?* Vengono dai numeri. Ma non dai numeri ordinari con cui sei cresciuto. Vengono da un sistema numerico speciale e autosufficiente chiamato **campo finito**, e quasi ogni pezzo di crittografia in Zcash è costruito sopra di esso.

Questo articolo si guadagna quell'idea poco a poco. Come promesso, prima l'intuizione. Niente formule finché non si ripagano da sole.

---

## 1. Perché dovrebbe interessarti?

I numeri ordinari hanno un problema per la crittografia: sono infiniti e fanno trapelare informazioni.

Pensa a cosa succede quando un numero diventa *più grande*. Se ti dico che un calcolo segreto ha prodotto `8,142,067`, sai già parecchio: è un numero a sette cifre, è dispari, è "abbastanza grande". La dimensione è un indizio. E gli indizi sono esattamente ciò che un sistema di privacy non può permettersi di rivelare.

La crittografia vuole un sistema numerico in cui:

- ci sono **un numero finito** di valori, così un computer può memorizzare esattamente uno qualsiasi di essi senza arrotondamenti né overflow,
- i valori **non fanno trapelare la loro dimensione**, perché il sistema non ha una vera nozione di "più grande",
- puoi comunque **sommare, sottrarre, moltiplicare e dividere** liberamente e in modo reversibile, perché le ricette crittografiche hanno bisogno di vera algebra per funzionare, e
- lo spazio può essere reso **astronomicamente grande**, così indovinare è senza speranza.

Quella lista di desideri ha un nome. È un **campo finito**. Costruiamo l'intuizione di uno prima di scrivere un solo simbolo.

---

## 2. L'intuizione: un orologio

Usi già un campo finito ogni giorno. È l'orologio sul muro.

Su un orologio a 12 ore, i numeri *ripartono da capo*. Parti dalle 10, aggiungi 5 ore, e non arrivi a "le 15", arrivi a **le 3**. L'orologio ha solo dodici posizioni, e contare oltre la fine semplicemente torna all'inizio.

![alt text](/content-images/image-9-30b39f4cc5.webp)

Sono successe tre cose che sono il punto centrale di questo articolo:

1. **Il mondo è finito.** Ci sono esattamente dodici posizioni, non importa quanto a lungo conti.
2. **L'addizione funziona ancora.** Puoi aggiungere ore tutto il giorno; atterri sempre su una posizione valida dell'orologio.
3. **La dimensione ha smesso di contare.** "Le 3" non ti dicono se hai contato 3 ore o 15 o 27. Il riparto da capo *ha cancellato l'informazione sulla dimensione*. Quella cancellazione è esattamente la proprietà favorevole alla privacy che volevamo.

Questa aritmetica che riparte da capo ha un nome formale: **aritmetica modulare**. L'orologio funziona "modulo 12", scritto **mod 12**. I matematici preferiscono contare le posizioni partendo da 0, così un "orologio mod 12" in realtà ha le posizioni `0, 1, 2, ..., 11`. Un orologio mod 7 avrebbe le posizioni da `0` a `6`.

> **La regola unica:** per calcolare qualcosa "mod p", fai l'aritmetica ordinaria, poi dividi per `p` e tieni solo il resto.
> Esempio mod 7: `5 + 4 = 9`, e `9` lascia il resto `2` dopo la divisione per `7`, quindi `5 + 4 = 2 (mod 7)`.

---

## 3. Da un orologio a un campo

Un orologio ci permette di sommare. Un **campo** è l'aggiornamento: un sistema numerico in cui tutte e quattro le operazioni si comportano bene, inclusa quella insidiosa, la divisione.

Informalmente, un **campo** è qualsiasi raccolta di "numeri" in cui puoi **sommare, sottrarre, moltiplicare e dividere** (per qualsiasi cosa tranne zero), e tutte le regole familiari valgono ancora: l'ordine non conta per l'addizione o la moltiplicazione, le parentesi si possono riorganizzare, c'è uno `0` e un `1`, e ogni numero ha un negativo e (tranne `0`) un reciproco.

I numeri razionali sono un campo. I numeri reali sono un campo. Quello che vogliamo è un campo *finito*.

Ecco il risultato principale, ed è bellissimo:

> **Prendi i numeri interi `0, 1, ..., p-1` e fai tutta l'aritmetica mod `p`. Se `p` è un numero primo, il risultato è un campo finito.** Lo scriviamo `F_p` (si legge "F sub p").

Quindi `F_7 = {0, 1, 2, 3, 4, 5, 6}` con aritmetica in stile orologio mod 7 è un vero campo finito. Vediamolo respirare.

### Moltiplicazione in F_7 (verificata)

Ogni voce è `(row x column) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Guarda le righe da `1` a `6`: ognuna contiene ogni valore diverso da zero `1..6` esattamente una volta. Quello schema "niente ripetizioni, niente mancanze" è l'impronta visibile di un campo.

### La divisione: la magia che richiede un primo

La divisione è semplicemente "moltiplicare per il reciproco". In `F_7`, il reciproco (o **inverso**) di un numero `a` è il valore `a^(-1)` per cui vale `a x a^(-1) = 1`. Leggendoli direttamente dalla tabella:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Verificane uno: `2 x 4 = 8 = 1 (mod 7)`.  Quindi "dividere per 2" in `F_7` significa "moltiplicare per 4". Ogni elemento diverso da zero ha un partner. **È questo che rende `F_7` un campo.**

---

## 4. Perché il modulo deve essere primo

Questa è l'idea più importante in assoluto dell'articolo, quindi rendiamola concreta invece che astratta.

Guarda cosa si rompe se proviamo ingenuamente a costruire un "campo" mod `6` (e `6` *non* è primo):

> Esiste qualche `x` tale che `2 x x = 1 (mod 6)`? Controllandoli tutti: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **La risposta `1` non compare mai.** Quindi `2` non ha reciproco mod 6. Peggio, `2 x 3 = 6 = 0 (mod 6)`: due numeri diversi da zero moltiplicati tra loro che danno zero.

Quella seconda frase è una catastrofe per l'aritmetica. Due cose diverse da zero che moltiplicate danno zero (chiamata **divisore dello zero**) significa che la divisione è rotta, e un sistema con la divisione rotta non è un campo. Succede proprio perché `6` si fattorizza come `2 x 3`.

Un primo, per definizione, non ha fattori del genere. Quindi mod un primo, nessun divisore dello zero può comparire, ogni elemento diverso da zero ottiene un reciproco pulito, e la struttura è un campo in piena regola.

![alt text](/content-images/image-8-573914db92.webp)

> **Frase pronta all'uso per i tuoi articoli:** *modulo primo dentro, divisione pulita fuori.*

---

## 5. L'unica formula che vale la pena conoscere: come i computer trovano gli inversi

Abbiamo letto gli inversi da una tabella per `F_7`, ma il primo di Zcash ha centinaia di cifre; nessuna tabella è possibile. C'è una scorciatoia classica, ed è l'unica formula di questo articolo.

**Il piccolo teorema di Fermat** dice che per un primo `p` e un qualsiasi `a` diverso da zero:

```
a^(p-1) = 1   (mod p)
```

Riarrangiala (stacca un fattore di `a`) e ottieni l'inverso gratis:

```
a^(-1) = a^(p-2)   (mod p)
```

Provalo in `F_7` (`p = 7`, quindi `p - 2 = 5`): l'inverso di `2` dovrebbe essere `2^5 = 32 = 4 (mod 7)`. E infatti la nostra tabella diceva `2^(-1) = 4`.  I computer elevano a grandi potenze estremamente in fretta, così questo trasforma "trovare il reciproco" in un calcolo rapido ed esatto anche per primi giganteschi.

Non devi memorizzare questo. Devi sapere che **la divisione in un campo finito è un'operazione rapida ed esatta**, ed è esattamente per questo che i crittografi sono felici di costruirvi sopra.

---

## 6. Perché la crittografia si è innamorata dei campi finiti

Mettendo insieme l'intuizione, ecco tutto l'argomento su una pagina.

| Proprietà di `F_p` | Perché un sistema di privacy la vuole |
|---|---|
| **Finito** | Un computer memorizza qualsiasi elemento in modo esatto; niente arrotondamenti, niente overflow, niente incertezze in virgola mobile |
| **Riparto da capo** | Cancella la "dimensione", quindi un valore non rivela nulla su come è stato prodotto |
| **Tutte e quattro le operazioni funzionano** | Le ricette crittografiche (chiavi, commitment, prove) hanno bisogno di vera algebra, non solo di contare |
| **Dimensione a scelta** | Scegli un primo a 255 bit o a 381 bit e il campo ha più elementi di quanti siano gli atomi nell'universo osservabile; indovinare è senza speranza |
| **Esatto e deterministico** | Due parti oneste che calcolano la stessa cosa ottengono sempre risultati identici, e le prove dipendono da questo |

Un campo finito è, in una frase, **un parco giochi perfettamente chiuso, perfettamente esatto e perfettamente enorme per l'aritmetica.** Tutto il resto in Zcash è costruito giocando al suo interno.

---

## 7. Dove tutto questo vive in Zcash

Non devi prendere "Zcash usa campi finiti" sulla fede. Ecco la mappa concreta (i meccanismi più profondi sono per gli articoli successivi; questo serve solo a mostrare che le impronte sono reali).

- **Sapling** (uno schema schermato più vecchio) costruisce le sue prove su una curva chiamata **BLS12-381**, il cui campo di base usa un primo lungo **381 bit**. Ogni coordinata, chiave ed elemento di prova è un elemento di un campo finito costruito su quel primo.
- **Orchard** (lo schema schermato attuale) usa una coppia di curve chiamate **Pallas e Vesta** (le curve "Pasta"), i cui campi usano primi di circa **255 bit**.
- Il **commitment della nota**, il **nullifier** e i numeri dentro una **prova a conoscenza zero** dell'Articolo 0 sono tutti, alla base, elementi di uno di questi campi finiti. Quando il protocollo dice "calcola questo commitment", significa "fai questa aritmetica mod quel primo".

![alt text](/content-images/image-7-c81fe982f0.webp)

Quindi la risposta alla domanda ancora aperta dell'Articolo 0, *"da dove vengono le ricette segrete?"*, comincia qui: **tutto inizia come aritmetica in un campo finito.** Nel prossimo articolo prenderemo quel campo e costruiremo gli oggetti reali, punti su una curva ellittica, che diventano chiavi e commitment.

---

## 8. Un disclaimer onesto

Per restare accessibili ai principianti abbiamo semplificato alcune cose vere. I campi finiti non esistono solo nella variante `F_p`; puoi anche costruire campi con `p^n` elementi (chiamati **campi di estensione**), e quelli contano per i "pairing" su cui si basa il sistema di prove di Sapling. Abbiamo anche saltato l'elenco completo degli assiomi di campo e passato sopra in modo sbrigativo a come i primi di questa dimensione vengono scelti e validati. Niente di tutto ciò cambia l'intuizione che ora possiedi; la raffina. Aggiungeremo la precisione, segnalandolo chiaramente, quando un articolo successivo ne avrà bisogno.

---

## 9. Riepilogo

- La crittografia ha bisogno di un sistema numerico che sia **finito, esatto, cieco alla dimensione, completamente invertibile ed enorme.** Quel sistema è un **campo finito**.
- L'intuizione è un **orologio**: aritmetica che **riparte da capo** (aritmetica modulare), che comodamente cancella la "dimensione" di un numero.
- Fare aritmetica con i numeri `0..p-1` mod un **primo** `p` dà un vero campo `F_p`, in cui puoi anche **dividere** perché ogni elemento diverso da zero ha un inverso.
- Il modulo **deve essere primo**: un modulo composto crea divisori dello zero (come `2 x 3 = 0 mod 6`) e rompe la divisione.
- I computer trovano gli inversi in fretta tramite il **piccolo teorema di Fermat** (`a^(-1) = a^(p-2)`).
- In **Zcash**, ogni chiave, commitment, nullifier ed elemento di prova è in definitiva un elemento di un grande campo finito (campi Pasta a 255 bit per Orchard, un campo a 381 bit per il BLS12-381 di Sapling).

---

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| **Modular arithmetic** | Aritmetica che riparte da capo dopo aver raggiunto un valore fisso, come un orologio |
| **mod p** | "Dividi per `p` e tieni il resto" |
| **Field** | Un sistema numerico in cui sommare, sottrarre, moltiplicare e dividere funzionano tutti |
| **Finite field `F_p`** | I numeri `0..p-1` con aritmetica fatta mod un primo `p` |
| **Inverse (reciprocal)** | L'elemento `a^(-1)` con `a x a^(-1) = 1`; "dividere per `a`" significa moltiplicare per esso |
| **Zero divisor** | Due valori diversi da zero il cui prodotto è zero; la cosa che rovina i moduli composti |
| **Prime** | Un numero intero maggiore di 1 che non ha fattori tranne 1 e se stesso |

---

## FAQ

**Perché non usare semplicemente i numeri interi o decimali ordinari?**
I decimali arrotondano e derivano; gli interi crescono senza limiti e fanno trapelare la dimensione. I campi finiti sono esatti, limitati e ciechi alla dimensione, che è ciò che la crittografia richiede.

**Il "ripartire da capo" perde informazioni?**
Apposta, sì. Cancellare la dimensione dei valori intermedi è una caratteristica, non un bug, per la privacy.

**Un primo più grande è sempre più sicuro?**
A grandi linee, un campo più grande significa più valori possibili e indovinare più difficile, ma la sicurezza dipende dall'intera costruzione, non dalla sola dimensione del campo. Gli articoli successivi rendono tutto preciso.

**Perché proprio questi primi (a 255 bit, a 381 bit) in Zcash?**
Sono scelti così che le curve costruite su di essi abbiano la struttura e l'efficienza giuste per il sistema di prove. Quella "struttura giusta" è l'oggetto dei prossimi due articoli.

---

### Metti alla prova la tua intuizione

In `F_7`, quanto vale `5 - 6`? (Ricorda: resta dentro `{0,...,6}` ripartendo da capo.) *(Risposta qui sotto.)*

<details><summary>Risposta</summary>

`5 - 6 = -1`, e `-1` riportato dentro `F_7` è `6` (perché `6 + 1 = 7 = 0`). Quindi `5 - 6 = 6 (mod 7)`. La sottrazione non lascia mai il campo; riparte semplicemente dall'altro lato.
</details>

---

### Cosa c'è dopo

**Articolo 2 . Curve ellittiche:** prendiamo il campo finito che abbiamo appena costruito e lo usiamo per disegnare un tipo strano di curva i cui punti possono essere "sommati" insieme. Quei punti diventano le chiavi e i commitment di Zcash, e nascondono una botola a senso unico che rende possibile l'intero sistema di privacy. Prima l'intuizione, come sempre.

*Parte della* serie Zcash dai primi principi *per [ZecHub](https://zechub.org). Con licenza CC BY-SA 4.0.*
