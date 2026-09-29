![alt text](image-1.png)
# Il bug Orchard: quando un sistema di prove ha una falla

### Come una sola riga di matematica sotto-vincolata avrebbe potuto coniare denaro invisibile illimitato

> **Serie:** *Serie sulla verifica formale* · **Parte 2 di 3**
> **Pubblico:** principianti. La Parte 1 ha introdotto la verifica formale; qui incontriamo il vero bug che l'ha resa urgente. Tutto il necessario viene spiegato da zero.
> **Cosa vi rimarrà:** un quadro intuitivo ma accurato di come un sistema crittografico di prove possa contenere una falla di soundness, di cosa fosse esattamente il bug "Orchard" di Zcash, perché questa classe di bug possa restare nascosta per anni e perché sia già accaduto in passato.

Nella Parte 1 abbiamo detto che i test possono mostrare la presenza di bug, ma mai la loro assenza, e che i bug più pericolosi risiedono nella *specifica* di un sistema, nella sua matematica sottostante. Questo articolo è il caso di studio. Nel 2026 è stata trovata una falla nel pool schermato Orchard di Zcash che avrebbe potuto consentire a un attaccante di creare denaro contraffatto invisibile e illimitato. Era sopravvissuta quattro anni e audit ripetuti. Comprenderla, insieme ai suoi predecessori, è la motivazione più chiara possibile per dimostrare formalmente la correttezza dei sistemi.

---

## 1. Perché dovrebbe importarvi?

Zcash è una criptovaluta con una modalità privata. Nel suo pool schermato, gli importi, i mittenti e i destinatari delle transazioni sono **nascosti**. Questa privacy viene ottenuta usando **prove a conoscenza zero**: prove crittografiche che dimostrano che una transazione rispetta tutte le regole, senza rivelarne il contenuto.

Questo design ha un doppio risvolto. Su un registro trasparente come quello di Bitcoin, se qualcuno creasse monete dal nulla, i numeri gonfiati sarebbero visibili a tutti, e la rete potrebbe individuarli e annullarli. In un pool schermato, i numeri sono nascosti per progettazione. Quindi, se il sistema di prove stesso avesse una falla che permette a una transazione non valida di sembrare valida, la contraffazione sarebbe **non rilevabile**. Non la si potrebbe individuare ispezionando il registro, perché il registro è deliberatamente opaco.

Questo è esattamente il rischio concretizzatosi in Orchard. Per capirlo, dobbiamo guardare cosa verifica davvero una prova a conoscenza zero.

---

## 2. L'intuizione: una prova è valida quanto la sua lista di controllo

Immaginate un funzionario di frontiera che debba approvare i viaggiatori senza vedere direttamente i loro documenti. Ogni viaggiatore compila invece una **lista di controllo**, e il funzionario approva chiunque abbia spuntato ogni voce. La lista è progettata affinché *solo un viaggiatore legittimo possa spuntare tutte le caselle.*

Ora supponete che alla lista manchi una casella cruciale, per esempio: “il passaporto non è scaduto”. Quasi tutti continuano a compilarla onestamente e nulla sembra andare storto. Ma una persona con un passaporto scaduto può *anch'essa* spuntare ogni altra casella e passare senza problemi. Il sistema sembra funzionare bene nell'uso quotidiano. La falla conta solo per chi la cerca intenzionalmente.

Una prova a conoscenza zero funziona come quella lista di controllo. Non rivela i dettagli privati; verifica che essi soddisfino un insieme fisso di condizioni. E se una condizione necessaria viene accidentalmente omessa, allora anche alcuni input non validi possono superare la verifica, mentre tutto continua a sembrare normale.

Rendiamo precisa la “lista di controllo delle condizioni”, perché è esattamente lì che risiedeva il bug.

---

## 3. La matematica: circuiti, vincoli e soundness

Dietro le quinte, l'affermazione “questa transazione è valida” viene codificata come un **circuito**: una raccolta fissa di condizioni aritmetiche, chiamate **vincoli**, scritte come equazioni tra numeri. Per creare una prova valida, il prover deve fornire valori segreti (il **testimone**) che soddisfino *ogni* vincolo. La prova convince un verificatore che un tale testimone esista, senza rivelarlo.

La proprietà di cui abbiamo bisogno in questo sistema ha un nome:

> **Soundness:** deve essere impossibile produrre una prova valida per un'affermazione *falsa*. Solo le affermazioni vere dovrebbero avere testimoni che soddisfano tutti i vincoli.

La soundness è la garanzia contro la contraffazione. Se la soundness è rispettata, una prova valida significa davvero che è avvenuta una transazione reale e conforme alle regole. Se nella soundness c'è una lacuna, una prova valida potrebbe non significare nulla.

### Cosa comporta un vincolo mancante (un esempio verificato)

I vincoli spesso devono imporre che un valore sia semplice. Un esempio comune: imporre che un valore `b` sia un singolo **bit**, cioè `0` oppure `1`. Il modo standard per farlo è usare un vincolo:

```
b × (b − 1) = 0
```

Perché funziona? Un prodotto è zero solo quando uno dei suoi fattori è zero. Quindi `b × (b − 1) = 0` impone `b = 0` oppure `b = 1`, e nient'altro. Verificando ogni valore da 0 a 16 (in un'aritmetica che torna a capo a 17), gli *unici* valori che lo soddisfano sono esattamente **0 e 1**. ✓

Ora immaginate che quella riga venga **accidentalmente omessa** dal circuito. Improvvisamente `b` non è vincolato. Un prover disonesto può impostare `b` a `5`, o a `9`, o a qualunque altro valore, e soddisfare comunque i vincoli rimanenti. Quella singola riga mancante è una **lacuna di soundness**: ora le affermazioni false hanno testimoni soddisfacenti.

Non è un esempio ipotetico. Un vincolo booleano mancante esattamente di questo tipo fu trovato nel primissimo design schermato di Zcash, Sprout, durante lo sviluppo, e corretto prima del lancio. Il sotto-vincolamento è uno degli errori più comuni e pericolosi nella costruzione di questi circuiti.

![alt text](image-2.png)

Questa è, in scala ridotta, l'intera struttura del bug Orchard. Ora passiamo al caso reale.

---

## 4. Cosa fosse davvero il bug Orchard

Le prove schermate di Zcash sono costruite sulle **curve ellittiche**, oggetti matematici i cui punti possono essere combinati e “moltiplicati” per numeri, operazioni che il circuito deve imporre mediante vincoli. Il circuito contiene gadget che eseguono la **moltiplicazione su curva ellittica** e verificano che sia stata svolta correttamente.

Secondo la divulgazione di Shielded Labs e del ricercatore Taylor Hornby, la falla Orchard era precisamente questa:

> Un **elemento sotto-vincolato del circuito Orchard** rendeva possibile fornire **input falsi arbitrari a una moltiplicazione su curva ellittica e far comunque superare la verifica della moltiplicazione.**

In parole semplici, nella lista di controllo del circuito mancavano le caselle che avrebbero dovuto fissare quella moltiplicazione. A causa della lacuna, un attaccante sufficientemente esperto avrebbe potuto costruire una prova di transazione che il sistema avrebbe accettato, anche se la transazione creava valore dal nulla. Questa è **contraffazione**, e poiché gli importi nel pool schermato sono nascosti, sarebbe stata **non rilevabile** dal registro. Il team Tachyon ha poi descritto la stessa falla a livello di codice come righe mancanti nel circuito che alteravano silenziosamente le equazioni sottostanti.

I parallelismi con la nostra storia della lista di controllo sono esatti:

| Storia della lista di controllo | Il bug Orchard |
|---|---|
| Manca la casella “passaporto non scaduto” | Manca un vincolo su una moltiplicazione su curva ellittica |
| Un viaggiatore con passaporto scaduto passa comunque | Input falsi arbitrari superano la verifica della moltiplicazione |
| Tutti gli altri non subiscono conseguenze, quindi nulla sembra sbagliato | Le transazioni normali funzionavano perfettamente, nascondendo la falla |
| Solo chi la cerca intenzionalmente trova la falla | È servito un esperto che sondasse deliberatamente la matematica del circuito |

Per chiarire quanto fosse grave: il ricercatore, con l'assistenza dell'AI, ha scritto un *exploit completo e funzionante* e ha confermato in una rete di test locale che produceva monete contraffatte illimitate e non rilevabili. Era una falla reale e sfruttabile, non una preoccupazione teorica.

---

## 5. Perché è rimasto nascosto per quattro anni

Il bug è rimasto in Orchard dalla sua attivazione nel **maggio 2022** fino alla correzione d'emergenza nel **giugno 2026**, superando audit professionali ripetuti condotti da alcuni dei migliori crittografi al mondo. Come?

Perché, come avvertiva la Parte 1, **i test campionano i casi, e questa falla viveva in un caso che nessuno aveva campionato.** Le transazioni ordinarie non esercitavano mai il vincolo mancante, quindi ogni test passava e ogni giorno di normale operatività sembrava impeccabile. La falla era raggiungibile solo costruendo deliberatamente un testimone insolito, mirato esattamente alla lacuna. È stata infine trovata non eseguendo test, ma *ragionando sulla matematica del circuito*.

La scoperta stessa è un segno della direzione verso cui sta andando la sicurezza. Nell'aprile 2026, Shielded Labs ha incaricato il ricercatore di sicurezza **Taylor Hornby** di cercare proprio questo tipo di falla. Poco dopo il rilascio, alla fine di maggio 2026, di un nuovo modello AI di frontiera (Claude Opus 4.8 di Anthropic), Hornby lo ha usato, insieme a un harness di analisi personalizzato e a metodi tradizionali, in una revisione mirata del circuito Orchard. Il **29 maggio 2026**, la revisione ha individuato la vulnerabilità.

Due fatti sobri della divulgazione meritano di essere esposti chiaramente:

- Il team non ha trovato **alcuna prova** che il bug sia mai stato sfruttato e considera improbabile uno sfruttamento precedente (aveva eluso anni di esame da parte di esperti ed è stato scoperto tramite un'iniziativa deliberata da white hat). Ma la natura stessa di una falla *non rilevabile* implica che il solo registro non possa dimostrare completamente che non sia mai accaduto.
- La scoperta ha causato notevoli turbolenze, incluso un brusco calo del prezzo dell'asset, proprio perché la *possibilità* di contraffazione nascosta è così grave per il denaro.

![alt text](image-3.png)

---

## 6. Non è stata la prima volta

Il bug Orchard appartiene a una famiglia ricorrente, e vedere questa famiglia rende la verifica formale non facoltativa ma inevitabile. Una falla di contraffazione risale sempre a una di tre fonti (la tassonomia della Parte 1): la **specifica** (la matematica stessa), l'**implementazione** (il codice che non segue la matematica corretta) oppure un'**assunzione compromessa**. E, soprattutto:

> Un bug di contraffazione è **non rilevabile** solo se risiede nella **specifica**. I bug di implementazione lasciano prove pubbliche permanenti, perché ogni blocco registra il contenuto completo di ogni transazione, quindi rieseguire la cronologia con software corretto rivelerebbe qualsiasi transazione che il codice difettoso ha accettato erroneamente.

La storia di Zcash illustra questo schema:

| Bug (anno) | Fonte | Rilevabile? |
|---|---|---|
| Falla negli impegni Zerocash (2016, pre-lancio) | Specifica (un hash troncato rompeva una proprietà di binding) | Non rilevabile |
| Falla di soundness nel trusted setup (2018) | Specifica (un errore nell'articolo zk-SNARK sottostante) | Non rilevabile |
| Collisione delle query del sistema di proving (2025) | Specifica (un controllo mancante nel sistema di prove) | Rilevabile |
| Bug nella validazione del sottogruppo della curva (2016) | Implementazione (un controllo del sottogruppo mancante) | Rilevabile |
| **Moltiplicazione sotto-vincolata Orchard (2026)** | **Specifica (il circuito)** | **Non rilevabile** |

Il filo conduttore è netto: le falle che potrebbero restare nascoste per sempre sono quelle nella matematica. Questa è precisamente la classe che una prova della specifica verificata da una macchina può eliminare, in tutti i casi contemporaneamente. Test e audit campionano; solo la dimostrazione matematica copre ogni input.

---

## 7. La risposta

Gli sviluppatori di Zcash si sono mossi rapidamente e per fasi:

1. **Rimedio d'emergenza (entro il 1-2 giugno 2026).** Entro pochi giorni dalla divulgazione, un aggiornamento d'emergenza della rete ha chiuso la finestra di vulnerabilità, aggiungendo i vincoli mancanti affinché la matematica del circuito fosse nuovamente sound.
2. **Un nuovo inizio dimostrabile (“Ironwood”, attivato il 28 luglio 2026).** Invece di fidarsi indefinitamente di una versione corretta del vecchio pool, la comunità ha lanciato un pool schermato completamente nuovo, Ironwood, basato sul circuito corretto ma partendo da zero, e accompagnato da una prova formale di correttezza verificata da una macchina.

Quel secondo passaggio è il punto in cui la verifica formale entra nella storia, ed è l'argomento della Parte 3. Vale la pena anticipare la consapevolezza su cui il team ha agito, perché unisce l'intera serie:

> Una falla di contraffazione *non rilevabile* può risiedere solo nella **specifica** del protocollo. Quindi, se si può **dimostrare che la specifica** esclude la contraffazione, si elimina l'intera classe di bug rimasta nascosta qui per quattro anni.

Questa è esattamente l'idea del primo pilastro della Parte 1: verificare la specifica chiude la lacuna che i test non avrebbero mai potuto chiudere.

---

## 8. Una precisazione onesta

Abbiamo semplificato deliberatamente. Il circuito reale coinvolge centinaia di regioni e molte migliaia di vincoli, e la falla effettiva è tecnicamente più intricata di un singolo controllo di bit mancante; abbiamo usato il controllo di bit perché mostra esattamente la *struttura* di un circuito sotto-vincolato e perché quell'esatto errore è realmente presente nella storia di Zcash. La precisa falla Orchard era una moltiplicazione su curva ellittica sotto-vincolata, come indicato nella divulgazione ufficiale. Abbiamo anche compresso la cronologia della divulgazione e del rimedio. Per il resoconto tecnico autorevole, consultate la divulgazione di Shielded Labs e gli approfondimenti di Project Tachyon.

---

## 9. Riepilogo

- Il pool schermato di Zcash nasconde gli importi mediante **prove a conoscenza zero**, quindi una falla in tali prove potrebbe consentire una **contraffazione invisibile**.
- Un sistema di prove verifica un **circuito** fisso di **vincoli**; la sua proprietà cruciale è la **soundness**: solo le affermazioni vere dovrebbero avere un **testimone** soddisfacente.
- Un **vincolo mancante** crea una **lacuna di soundness**, consentendo il passaggio di affermazioni false. (Caso giocattolo verificato: `b(b−1)=0` impone che `b` sia 0 oppure 1; rimuovendolo, `b` può essere qualsiasi valore. Questa esatta classe di bug è reale nella storia di Zcash.)
- Il **bug Orchard** era una **moltiplicazione su curva ellittica sotto-vincolata**: input falsi arbitrari potevano superare la verifica della moltiplicazione, consentendo contraffazione illimitata e non rilevabile. Un exploit funzionante è stato dimostrato in una rete di test.
- È rimasto nascosto per **quattro anni** (dal maggio 2022 al giugno 2026) perché i test campionano i casi e non lo hanno mai campionato; è stato trovato ragionando sulla matematica, con assistenza AI, il 29 maggio 2026.
- La contraffazione non rilevabile può risiedere solo nella **specifica**, e Zcash ha già visto questa famiglia di bug in precedenza. Zcash ha risposto con una correzione d'emergenza e un nuovo pool verificato formalmente, **Ironwood**, oggetto della Parte 3.

---

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| **Shielded pool** | La modalità privata di Zcash, nella quale importi e parti coinvolte sono nascosti |
| **Zero-knowledge proof** | Una prova che un'affermazione nascosta è valida, senza rivelare altro |
| **Circuit** | L'insieme fisso di condizioni aritmetiche che una transazione valida deve soddisfare |
| **Constraint** | Una condizione (equazione) nel circuito |
| **Witness** | I valori segreti che soddisfano i vincoli |
| **Soundness** | La garanzia che solo le affermazioni vere possano produrre una prova valida |
| **Soundness gap** | Un vincolo mancante che consente il passaggio di affermazioni false |
| **Under-constrained** | Un circuito a cui manca una condizione necessaria, alla radice del bug Orchard |
| **Detectable / undetectable** | Se lo sfruttamento lascerebbe prove nel registro pubblico |

---

## FAQ

**Sono stati davvero creati Zcash contraffatti?**
Non è stata trovata alcuna prova di sfruttamento e il team lo considera improbabile. Ma poiché la falla sarebbe stata non rilevabile dal registro, il solo registro non può dimostrare completamente che non sia mai accaduto, ed è per questo che la risposta è stata così approfondita.

**Perché nascondere gli importi rende un bug peggiore?**
In una blockchain trasparente, le monete create sono visibili e possono essere individuate e annullate. Quando gli importi sono nascosti per privacy, un bug di contraffazione non produce anomalie visibili e può quindi persistere senza essere notato.

**Perché anni di audit non l'hanno individuato?**
Audit e test esaminano in gran parte il comportamento in casi realistici. Questa falla emergeva solo con un input insolito, deliberatamente costruito per colpire un caso limite matematico, che la revisione ordinaria non esercitava. È stata trovata tramite ragionamento mirato sul circuito, non tramite test.

**Basta davvero un vincolo mancante?**
Sì. Un sistema di prove è forte solo quanto il suo insieme completo di vincoli. Basta omettere una condizione necessaria per far passare affermazioni non valide.

**Che ruolo ha avuto l'AI?**
Un ricercatore ha usato un modello AI di frontiera insieme a un harness personalizzato e metodi tradizionali per esaminare la matematica del circuito e trovare la falla. L'AI viene sempre più usata su entrambi i fronti della sicurezza; questo è parte del motivo per cui dimostrare ora la correttezza dei sistemi è così importante.

---

### Metti alla prova la tua intuizione

Supponiamo che una transazione schermata debba dimostrare che “il denaro in entrata equivale al denaro in uscita”, ma il circuito dimentichi di vincolare un valore di output. Cosa potrebbe fare un prover disonesto, e perché il registro pubblico apparirebbe completamente normale? *(Risposta sotto.)*

<details><summary>Risposta</summary>

Con quell'output non vincolato, il prover potrebbe impostarlo a un valore maggiore di quanto consentito dagli input reali, creando valore dal nulla: una contraffazione. La prova verificherebbe comunque, perché il vincolo mancante è l'unica cosa che avrebbe rilevato lo squilibrio. E poiché il pool schermato nasconde gli importi, il registro mostra solo che “si è verificata una transazione valida”, senza squilibri visibili che facciano scattare un allarme. La falsificazione è reale ma invisibile: è proprio per questo che la soundness del circuito è così importante e deve essere dimostrata anziché testata.
</details>

---

### Cosa segue

**Parte 3 · Ironwood:** la correzione non è stata soltanto una patch. Gli ingegneri di Zcash hanno costruito un nuovo pool schermato e lo hanno accompagnato con una prova matematica verificata da una macchina, composta da oltre 2.700 teoremi scritti nell'assistente di dimostrazione Lean, che non può creare denaro contraffatto secondo le assunzioni dichiarate. Vedremo cosa significano “integrità del bilancio” e “soundness della conoscenza”, cosa copre e cosa non copre esattamente la prova, e come il vecchio pool sia stato ritirato in sicurezza.

*Parte della* serie sulla verifica formale *per [ZecHub](https://zechub.org).*
