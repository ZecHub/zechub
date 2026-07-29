# Prove a conoscenza zero: dimostrare di avere ragione senza dire perché
##### Ricerca originale di [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](image-23.png)

### Il sipario che permette al mondo di verificare ciò che non potrà mai vedere

> **Serie:** *Zcash dai primi principi* . **Articolo 5 . Prove a conoscenza zero**
> **Pubblico:** principianti. Attingiamo a ogni articolo precedente (campi finiti, curve, commitment, alberi di Merkle), ma ogni idea viene richiamata quando serve.
> **Cosa porterai a casa:** una comprensione intuitiva e corretta di cosa sia una prova a conoscenza zero, le tre garanzie che fornisce, come si dimostrano enunciati arbitrari, e cosa alimenta Sapling e Orchard di Zcash.

Questo è l'articolo verso cui l'intera serie ha puntato. Dall'[Articolo 0](article-0-shielded-transaction.md) in poi abbiamo continuato a dire che un pagamento viene validato "dietro un sipario", dimostrato corretto senza rivelare nulla. Una prova a conoscenza zero è quel sipario. È il pezzo che finalmente risolve il paradosso con cui abbiamo aperto: *come può il pubblico verificare una transazione che non gli è permesso vedere?*

---

## 1. Perché dovrebbe interessarti?

Ricorda la contraddizione al cuore di Zcash:

- Una blockchain è affidabile perché è **verificabile pubblicamente**.
- I pagamenti Zcash sono **completamente privati**: importi, mittente, destinatario, tutto nascosto.

Sembrano mutuamente esclusivi. La verifica sembra *richiedere* di guardare. La privacy *vieta* di guardare. Se non puoi conciliarli, non puoi avere denaro privato di cui chiunque si fidi.

Una **prova a conoscenza zero (ZKP)** è la conciliazione. Permette a un **prover** (dimostratore) di convincere un **verifier** (verificatore) che un enunciato è vero **senza rivelare nulla oltre al fatto che è vero.** Nessun importo. Nessuna identità. Nessuna nota. Solo: *"tutto qui rispetta le regole."* Costruiamo l'intuizione prima di qualsiasi meccanismo.

---

## 2. L'intuizione: tre prove di tutti i giorni

**Prova di conoscere una password, senza dirla.** Un sito web potrebbe verificare che conosci la tua password osservandoti sbloccare qualcosa che solo la password sblocca, senza mai vedere la password stessa. Dimostri *conoscenza* senza *divulgazione*.

**L'amico daltonico e due palline.** Tieni in mano una pallina rossa e una verde che al tuo amico daltonico appaiono identiche. Vuoi convincerlo che sono di *colori diversi* senza dirgli quale sia quale. Lui nasconde entrambe dietro la schiena, facoltativamente le scambia, e te ne mostra una. Tu dici se le ha scambiate. Se le palline sono davvero diverse, hai sempre ragione. Se fossero identiche, staresti tirando a indovinare, indovinando solo metà delle volte. Dopo 20 round, la tua serie ininterrotta lo convince che sono diverse, eppure non scopre mai quale pallina sia rossa. **È convinto di un fatto senza imparare nient'altro.** Questa è la conoscenza zero in miniatura.

**La caverna.** Una caverna ad anello ha una porta magica sul fondo che si apre solo con una parola segreta. Sostieni di conoscere la parola. Per dimostrarlo senza rivelarla: un verificatore aspetta fuori mentre tu entri e scegli a caso il passaggio di sinistra o di destra. Il verificatore poi grida da quale lato vuole che tu *esca*. Se conosci davvero la parola, puoi sempre obbedire (puoi aprire la porta per cambiare lato se necessario). Se stai bluffando, puoi uscire dal lato giusto solo per fortuna, 50/50 a ogni round. Ripeti 20 volte e le probabilità che un bluffatore sopravviva sono inferiori a una su un milione.

Quella storia della caverna dimostra silenziosamente le **tre garanzie** che ogni prova a conoscenza zero deve fornire.

---

## 3. Le tre garanzie

![alt text](image-24.png)

| Garanzia | Nella storia della caverna | In Zcash |
|---|---|---|
| **Completezza** | Se conosci la parola, esci sempre dal lato giusto | Una transazione valida produce sempre una prova accettata |
| **Solidità** | Un bluffatore viene scoperto con probabilità schiacciante | Una transazione fraudolenta (denaro contraffatto, doppia spesa) non può produrre una prova accettata |
| **Conoscenza zero** | Il verificatore non sente mai la parola segreta | La rete non scopre mai importi, indirizzi o quale nota |

Se anche solo una di queste fallisce, il sistema crolla: senza completezza gli utenti onesti vengono rifiutati; senza solidità i contraffattori stampano denaro; senza conoscenza zero la privacy svanisce.

---

## 4. Da una caverna a *qualsiasi* enunciato: circuiti e testimoni

La caverna dimostra un solo fatto carino. Zcash deve dimostrare un enunciato ricco: *"Conosco una nota non spesa nell'albero, sono autorizzato a spenderla, il suo nullifier è calcolato correttamente, e i miei input eguagliano i miei output."* Come passiamo da palline e caverne a questo?

Il ponte è un'idea che lega insieme tutta questa serie:

> **Qualsiasi enunciato che puoi verificare con un calcolo può essere riscritto come un circuito aritmetico:** una rete di addizioni e moltiplicazioni su un campo finito (Articolo 1).

Pensa al circuito come a un elenco di vincoli aritmetici che sono *tutti soddisfatti solo se l'enunciato è vero.* Gli input privati che fanno tornare tutto, la tua nota, la tua chiave, il percorso di Merkle, sono chiamati il **testimone** (witness).

![alt text](image-25.png)

Ecco perché abbiamo dedicato l'Articolo 1 ai campi finiti e l'Articolo 3 agli hash ZK-friendly: il circuito parla aritmetica dei campi, quindi ogni operazione all'interno dell'enunciato (incluso l'hashing e la risalita di Merkle dell'Articolo 4) deve essere espressa in quel modo. Più economica è l'espressione di ogni operazione, più piccola e veloce è la prova.

---

## 5. Renderla pratica: non interattiva e succinta

La caverna richiedeva molti round di andata e ritorno. È impraticabile per una blockchain, dove una prova deve essere pubblicata una volta e verificata da tutti, per sempre. Due miglioramenti risolvono questo.

**Non interattiva (l'idea di Fiat-Shamir).** Invece di un verificatore dal vivo che grida sfide casuali, il prover genera lui stesso le "sfide casuali" facendo l'*hash* della propria prova-finora. Poiché un buon hash è imprevedibile (Articolo 3), il prover non può manipolare le sfide a proprio favore. La conversazione prolissa collassa in un'**unica prova autosufficiente** che chiunque può verificare in seguito, senza interazione.

**Succinta.** I migliori sistemi rendono la prova **minuscola e veloce da verificare, indipendentemente da quanto sia grande l'enunciato.** Questa è la parte davvero sbalorditiva.

> Una prova Groth16 (il sistema che usa Sapling) è all'incirca **192 byte** e si verifica in millisecondi, *che l'enunciato che dimostra sia piccolo o enorme.* Poche centinaia di byte possono attestare un calcolo che coinvolge molte migliaia di vincoli.

Metti insieme questi due aspetti e ottieni l'acronimo che vedrai ovunque:

> **zk-SNARK** = **z**ero-**k**nowledge **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. Conoscenza zero (non rivela nulla), succinta (minuscola e veloce), non interattiva (in un colpo solo), argomento di conoscenza (il prover *conosce* davvero un testimone valido).

---

## 6. L'unico inconveniente: il trusted setup

Non esistono pasti gratis. Molti SNARK necessitano di un **setup** una tantum che produce parametri pubblici per il circuito. Il setup genera casualità segreta come sottoprodotto, e quel segreto deve essere **distrutto.** Se qualcuno lo conservasse, potrebbe contraffare prove, cioè **contraffare denaro** (anche se, cosa cruciale, comunque *non* potrebbe violare la privacy).

Questo segreto residuo è soprannominato **rifiuto tossico** (toxic waste). Per smaltirlo in sicurezza, Zcash ha condotto elaborate **cerimonie multi-party** in cui molti partecipanti indipendenti hanno contribuito ciascuno con casualità; finché *anche uno solo* ha distrutto onestamente la propria parte, il rifiuto tossico è irrecuperabile.

![alt text](image-26.png)

I sistemi più recenti eliminano del tutto questo requisito, che è una delle ragioni più importanti per cui Zcash ha fatto evolvere il proprio sistema di prove nel tempo.

---

## 7. Dove vive tutto questo in Zcash

| Design | Sistema di prove | Trusted setup? | Costruito su |
|---|---|---|---|
| **Sprout** (il primo) | primo zk-SNARK | Sì | cerimonia originale |
| **Sapling** | **Groth16** | Sì (la multi-party "Powers of Tau" + la cerimonia Sapling) | **BLS12-381** (Articolo 2) |
| **Orchard** (attuale) | **Halo 2** | **Nessun trusted setup** | **Pallas / Vesta** (Articolo 2) |

La marcia da Sprout a Sapling a Orchard è in gran parte una storia di prove che diventano più piccole, più veloci e che si liberano del trusted setup. **Halo 2**, usato da Orchard, non necessita di alcuna cerimonia ed è costruito per supportare la *ricorsione* (prove che verificano altre prove), motivo per cui Orchard usa il **ciclo** di curve Pallas/Vesta dell'Articolo 2: ogni curva è ottimizzata per verificare prove scritte sull'altra.

Questo chiude il loop più grande dell'Articolo 0. La magia del "dietro il sipario" è uno **zk-SNARK**: dimostra che la tua transazione soddisfa un circuito aritmetico che codifica tutte le regole, rivelando solo il singolo bit "valida".

---

## 8. Una doverosa precisazione

Le prove a conoscenza zero sono un campo profondo e siamo rimasti di proposito al livello intuitivo. Non abbiamo definito i precisi limiti probabilistici nella solidità, la forma esatta di un circuito aritmetico (R1CS, PLONKish, e così via), come polinomi e commitment trasformano un circuito in una prova breve, o gli internals reali di Groth16 e Halo 2. La caverna è una prova *interattiva*; i sistemi di produzione sono non interattivi e molto più intricati. Niente di tutto ciò cambia il nocciolo: dimostrare che un circuito è soddisfatto da un testimone segreto, in modo completo, solido e senza rivelare nulla. Il meccanismo è un'intera serie a sé.

---

## 9. Riepilogo

- Una **prova a conoscenza zero** permette a un prover di convincere un verificatore che un enunciato è vero **senza rivelare nient'altro**, risolvendo il paradosso verifica-vs-privacy.
- Deve soddisfare tre garanzie: **completezza** (gli enunciati veri convincono), **solidità** (gli enunciati falsi non possono) e **conoscenza zero** (il verificatore impara solo che "è vero").
- Gli enunciati arbitrari diventano **circuiti aritmetici** su un campo finito; gli input segreti che soddisfano il circuito sono il **testimone**. Ecco perché i campi finiti e gli hash ZK-friendly contavano.
- **Fiat-Shamir** rende le prove **non interattive** (in un colpo solo); i migliori sistemi sono anche **succinti** (una prova Groth16 è circa **192 byte** e si verifica in millisecondi indipendentemente dalla dimensione dell'enunciato). Insieme: uno **zk-SNARK**.
- Alcuni SNARK necessitano di un **trusted setup** il cui **rifiuto tossico** residuo deve essere distrutto (tramite cerimonie multi-party); una compromissione permetterebbe di contraffare denaro ma **non** di violare la privacy.
- **Sapling** usa **Groth16** (trusted setup, BLS12-381); **Orchard** usa **Halo 2** (nessun trusted setup, Pallas/Vesta, adatto alla ricorsione).

---

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| **Prova a conoscenza zero** | Convincere qualcuno che un enunciato è vero senza rivelare nient'altro |
| **Prover / Verifier** | Chi produce la prova / chi la verifica |
| **Completezza** | Gli enunciati veri vengono sempre accettati (da un prover onesto) |
| **Solidità** | Gli enunciati falsi vengono rifiutati (i bari non possono vincere se non per fortuna) |
| **Testimone** | Gli input segreti che rendono vero l'enunciato |
| **Circuito aritmetico** | Un enunciato riscritto come addizioni e moltiplicazioni su un campo finito |
| **Non interattiva (Fiat-Shamir)** | Una prova in un colpo solo che non richiede scambi dal vivo |
| **Succinta** | La prova è minuscola e veloce da verificare indipendentemente dalla dimensione dell'enunciato |
| **zk-SNARK** | Zero-knowledge Succinct Non-interactive ARgument of Knowledge |
| **Trusted setup / rifiuto tossico** | Generazione di parametri una tantum il cui segreto residuo deve essere distrutto |

---

## FAQ

**Se la prova non rivela nulla, come può significare qualcosa verificarla?**
Perché la matematica è organizzata in modo che *solo* un testimone reale e valido possa produrre una prova che supera il controllo. Superare il controllo è di per sé la prova, senza alcuna divulgazione.

**Qualcuno potrebbe falsificare una prova?**
La solidità rende questo infattibile. L'unica eccezione è uno SNARK il cui rifiuto tossico del trusted setup è stato conservato; ed è esattamente per questo che le cerimonie per distruggerlo contano.

**Un trusted setup compromesso fa trapelare i miei dati privati?**
No. Permetterebbe a un attaccante di contraffare *nuovo* denaro, ma **non** rivela importi, indirizzi o note. Privacy e solidità sono garanzie separate.

**Perché Zcash ha cambiato sistema di prove nel tempo?**
Per ottenere prove più piccole e veloci e, con Halo 2, per eliminare del tutto il trusted setup e abilitare la ricorsione.

---

### Metti alla prova la tua intuizione

Nella caverna, perché è essenziale che il verificatore scelga il lato di uscita *dopo* che il prover è già entrato, invece di annunciarlo in anticipo? *(Risposta sotto.)*

<details><summary>Risposta</summary>

Se il verificatore annunciasse prima il lato, un bluffatore che non conosce la parola potrebbe semplicemente entrare da quel lato fin dall'inizio e tornare indietro, senza mai aver bisogno della porta. Scegliere *dopo* che il prover si è impegnato su un passaggio costringe un bluffatore ad affidarsi alla fortuna (50/50 a round), ed è questo che rende convincenti i round ripetuti. Questo ordine "impegnati prima, poi affronta la sfida" è esattamente ciò che Fiat-Shamir preserva derivando la sfida da un hash della prova già impegnata dal prover.
</details>

---

### Cosa viene dopo

**Articolo 6 . Il protocollo schermato, dall'inizio alla fine:** il finale. Prendiamo ogni pezzo, note, commitment, l'albero dei commitment delle note, i nullifier, il bilancio di valore e la prova a conoscenza zero, e assembliamo una transazione schermata Zcash completa, chiudendo ogni singolo loop aperto fin dall'Articolo 0.

*Parte della serie* Zcash dai primi principi *per [ZecHub](https://zechub.org). Concesso in licenza CC BY-SA 4.0.*
