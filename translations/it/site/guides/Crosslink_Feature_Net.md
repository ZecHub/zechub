<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Unisciti alla Crosslink Feature Net

## In breve

- La Feature Net è la rete di test pubblica di Shielded Labs per [Crosslink](/zcash-tech/crosslink-protocol), il livello di finalità proposto che aggiunge lo staking accanto alla prova di lavoro di Zcash.
- Funziona con una moneta di test, cTAZ. Nulla di ciò che fai su di essa sposta o mette a rischio gli ZEC della mainnet.
- Una sola app desktop è il nodo, il miner, il portafoglio e il finalizer. Esegue il mining di cTAZ per impostazione predefinita e dispone di un pulsante faucet.
- Lo staking, l'annullamento dello staking e il prelievo funzionano soltanto durante uno "Staking Day", un giorno ogni tre. Se lo perdi, devi aspettare il successivo.
- Per fare staking, incolli l'identità di un finalizer e selezioni un importo. Questa guida usa come esempio il finalizer di ZecHub.
- Due chiamate RPC mostrano la tua situazione: `wallet_staking_positions` e `get_tfl_recency_status`.

*Testato con Feature Net versione 14 su Windows 11 (versione 10.0.26200.9550), dall'8 al 10 ottobre 2026. Il software è un prototipo e cambia a ogni rilascio. Se ciò che vedi differisce da questa pagina, fai affidamento sulla tua esecuzione e apri una PR.*

## Cos'è la Feature Net

Crosslink è una proposta, non fa parte di Zcash oggi. Le FAQ di Shielded Labs [Crosslink](https://shieldedlabs.net/crosslink-faq/) affermano che "dovrebbe passare attraverso il normale processo di governance di Zcash" prima di poter raggiungere la mainnet. La pagina del [Crosslink Protocol](/zcash-tech/crosslink-protocol) spiega il progetto.

Per provare il progetto con utenti reali, Shielded Labs gestisce quelle che definisce [feature net incentivate](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "una serie di testnet incentivate". Nella rete esistono tre ruoli e l'app desktop può svolgerli tutti:

| Ruolo | Cosa fa |
|---|---|
| Miner | Produce blocchi con prova di lavoro, come avviene oggi su Zcash |
| Staker | Blocca cTAZ in un vincolo di delega e lo indirizza a un finalizer |
| Finalizer | Vota per finalizzare i blocchi. Il suo potere di voto è lo stake delegato a esso |

Il repository che lo supporta si apre con un'avvertenza che vale la pena leggere prima di installare qualsiasi cosa: "esiste per dimostrare idee, non per dimostrare ingegneria di produzione" e non è "codice pronto per la produzione" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Eseguilo su una macchina in cui ciò sia accettabile.

### Cosa ha cambiato la versione 14

[La versione 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) è uscita il 1 ottobre 2026. La sua rete inizia come semplice prova di lavoro e attiva Crosslink in tre passaggi ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), mostrata anche su [ctaz.cash](https://ctaz.cash/v14)):

| Blocco | Cosa succede |
|---|---|
| 20.736 | Si apre lo staking |
| 34.560 | Il primo elenco di finalizer viene ricavato dagli stake sulla chain |
| 36.288 | Inizia la finalità BFT, insieme alle ricompense di staking |

Le ricompense di staking iniziano all'ultimo di questi blocchi. Un vincolo creato prima non guadagna nulla fino ad allora ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

La stessa release ha ridotto l'elenco attivo ai 12 finalizer con più stake ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) e, secondo le sue note di rilascio, ha assegnato loro una commissione: "il 10% di tutte le ricompense PoS in un blocco va a queste commissioni, mentre il 90% viene distribuito a tutti i vincoli di staking".

### cTAZ e ZEC reali

cTAZ ("Crosslink TAZ") è la moneta di test della Feature Net. Fai staking di cTAZ, mai di ZEC.

Gli ZEC reali entrano in gioco solo alla fine. Shielded Labs ha [messo da parte 500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) per le feature net e le [note di rilascio](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) affermano che vengono distribuiti "su base proporzionale basata solo sulla quantità di cTAZ che ciascun partecipante ha guadagnato tramite mining o staking". Ne derivano due conseguenze:

- **Le monete del faucet non contano.** I cTAZ che ti sono stati dati, dal faucet o da chiunque altro, non guadagnano nulla restando nel tuo portafoglio. Contano soltanto le ricompense dei blocchi ottenute con mining e staking.
- **I pagamenti vengono richiesti, non sono automatici.** Shielded Labs annuncia ogni round nel [thread del forum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Per il Round 2 ha chiesto ai partecipanti di inviare le chiavi di visualizzazione del proprio portafoglio e un indirizzo mainnet entro il 4 ottobre 2026 ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). La rete su cui gira la versione 14, quella a cui si unisce questa guida, è stata annunciata come Round 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Prima di iniziare

- **Un computer che puoi lasciare acceso.** La release offre build per Windows, macOS, Ubuntu e Arch Linux. Questa guida è stata eseguita su Windows, su un PC con processore Intel Core i5-8350U.
- **Uno Staking Day.** Controlla quando si aprirà il prossimo prima di pianificare qualsiasi cosa. La [dashboard di Staker Space](https://crosslink.staker.space/) mostra il conto alla rovescia.
- **Nient'altro.** Nessun ZEC, nessun account e nessuna registrazione.

## Passaggio 1: scarica l'app e verifica il file

1. Apri la [release della versione 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) e scorri fino a **Assets**.
2. Scarica il file per il tuo sistema. Su Windows è `zebrad_v14_win32.exe`.
3. Confronta lo SHA-256 del file con il digest che GitHub mostra accanto a quell'asset.

Su Windows, in PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Il digest che GitHub mostra per quel file è `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. L'esadecimale non distingue maiuscole e minuscole, quindi le lettere maiuscole qui sopra vanno bene. Per lasciare che sia la shell a confrontare anziché i tuoi occhi:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Sappi cosa vale questo controllo. La release non dispone di una firma, quindi un hash corrispondente ti dice che il download è completo ed è il file che GitHub sta distribuendo. Non ti dice chi lo ha compilato. [Verifica delle release di Zcash](/guides/verifying-zcash-releases) spiega la differenza.

## Passaggio 2: avvia il nodo e lascialo sincronizzare

Avvia l'app da un terminale, così i messaggi di avvio restano sullo schermo. Usa una normale finestra di PowerShell, non una aperta con "Esegui come amministratore": questo è software prototipo non firmato e non richiede diritti di amministratore.

```powershell
.\zebrad_v14_win32.exe
```

Si apre una finestra intitolata "Zcash Crosslink Visualizer". Il portafoglio è a sinistra, con le schede **Il tuo portafoglio** e **Portafoglio faucet**, la chain è disegnata al centro e i finalizer sono elencati a destra. Il terminale continua a stampare il log del nodo. Lascia entrambi aperti mentre usi la rete.

Le note di rilascio collegano un [video dell'installazione di Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

L'app conserva i dati in una cartella cache: `%LOCALAPPDATA%\zebra` su Windows, `~/.cache/zebra` su Linux e `~/Library/Caches/zebra` su macOS, secondo le note di rilascio.

**Tieni il segreto per te.** Quella cartella contiene un file chiamato `secret.seed`. L'app lo crea al primo avvio ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) e ne deriva il tuo portafoglio e la tua identità finalizer ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). L'app dispone anche di un pulsante **Copia seed** che inserisce lo stesso segreto negli appunti. Chiunque possieda uno dei due controlla il tuo portafoglio. Non incollarli mai in una chat, in un post del forum o in uno screenshot.

### Come capire se sei sincronizzato

Le note di rilascio affermano che non esiste "alcun monitoraggio integrato di quanto sei sincronizzato vicino al tip della rete". La versione 14 ne offre comunque alcuni: il menu a discesa **Informazioni di rete** in alto nella finestra contiene righe per Altezza PoW, Sincronizzazione portafoglio e Blocchi dietro al PoW noto ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Confronta la tua altezza con quella su [Staker Space](https://crosslink.staker.space/) o [ctaz.cash](https://ctaz.cash/).

Il nodo risponde anche tramite RPC:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

La porta RPC `127.0.0.1:8232` è aperta per impostazione predefinita in questa build e non richiede password ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). È in ascolto soltanto sulla tua macchina e qualsiasi programma in esecuzione su quella macchina può chiamarla.

In questa esecuzione la prima sincronizzazione, dal blocco 0 al tip intorno al blocco 28.400, ha richiesto circa 50 minuti.

**Dopo un riavvio il tuo saldo resta pari a zero per un po'.** Ogni volta che l'app si avvia, ricostruisce il portafoglio da `secret.seed` e analizza nuovamente la chain dal blocco 0 ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Finché la scansione non raggiunge le tue transazioni, il saldo e lo stake risultano pari a 0. In questa esecuzione sono tornati circa 15 minuti dopo un riavvio. Il portafoglio del faucet viene analizzato allo stesso modo ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)) e durante l'analisi la scheda Portafoglio faucet mostrava un saldo molto elevato. Ignora entrambi finché la Sincronizzazione portafoglio non è completata.

## Passaggio 3: ottieni alcuni cTAZ

### Esegui il mining

Secondo le note di rilascio, l'app avvia il mining CPU verso il tuo portafoglio non appena è sincronizzata. Non devi attivare nulla. Le monete minate vanno a un indirizzo trasparente del tuo portafoglio ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Trovare un blocco è un'altra questione. Le note avvertono che "potresti essere superato da altri che eseguono il mining più rapidamente, quindi non vi è garanzia di successo". Per impostazione predefinita, il miner integrato usa un singolo thread CPU ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Per usare più thread, imposta una variabile d'ambiente nella stessa finestra di PowerShell prima di avviare l'app ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Questa esecuzione ne ha usati quattro:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

La variabile dura solo quanto quella finestra. Con la variabile impostata, il contatore del processore di Windows mostrava il nodo usare l'equivalente di quattro o cinque processori, in percentuale di un processore logico:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Il risultato: un processore Intel Core i5-8350U in mining su quattro thread, dall'inizio dell'8 ottobre al pomeriggio del 9 ottobre, non ha trovato alcun blocco.

### Oppure usa il faucet

L'app ha un pulsante **Ricevi cTAZ** in basso a destra. Nel codice sorgente della versione 14, una pressione invia 0,5 cTAZ dal portafoglio del faucet al tuo ([importo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [invio](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Il faucet è un singolo portafoglio presente in ogni copia dell'app ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), e la scheda **Portafoglio faucet** ne mostra il saldo.

Il pulsante viene disattivato a meno che il faucet non disponga di oltre 5,01 cTAZ in monete schermate ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). La scheda conta anche le monete minate dal faucet, che sono schermate soltanto in lotti di esattamente 10 cTAZ più una commissione ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), quindi la scheda può mostrare molto mentre il pulsante rimane grigio. In questa esecuzione è rimasto grigio l'8 e il 9 ottobre, mostrando al passaggio del mouse "Il faucet sta eseguendo il mining di altri fondi.", mentre la scheda mostrava 14,74695 cTAZ.

**Quando il pulsante è grigio, chiedi al tuo nodo.** Il nodo ha un metodo di richiesta faucet, `requestfaucetdonation` ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), che non applica la regola dei 5,01 cTAZ del pulsante. Inserisci il tuo indirizzo al posto di `YOUR_ADDRESS` (è il campo `address` di `wallet_spendable_funds`, qui sotto):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

Quella risposta significa che la richiesta è stata accodata, non che è stata inviata. In questa esecuzione gli 0,5 cTAZ del faucet sono stati minati al blocco 33.306 ed erano spendibili al blocco 33.322. Chiedi una sola volta: il faucet è condiviso e una seconda richiesta per lo stesso indirizzo viene rifiutata finché la prima è in sospeso ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Oppure chiedi a un altro partecipante

Chiunque nella rete può inviarti cTAZ con il pulsante **Invia** dell'app. In questa esecuzione un altro partecipante ha inviato 31 cTAZ. Sono arrivati come "Ricevuti" con la nota "invio dal portafoglio utente", che è la nota allegata dalla funzione Invia dell'app stessa ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Chiedi nel [thread del forum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) e fornisci soltanto il tuo indirizzo.

Le monete faucet e i regali sono sufficienti per imparare lo staking. Non contano per le ricompense di ZEC.

### Controlla cosa puoi spendere

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Questa è stata la risposta una volta arrivati gli 0,5 cTAZ del faucet, con l'indirizzo abbreviato:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

Gli importi sono espressi in zatoshi: 100.000.000 formano un cTAZ. Le monete schermate richiedono 3 conferme prima di essere considerate spendibili ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Le monete dal faucet e da altri partecipanti arrivano in `spendable_zats`. Le monete minate sono trasparenti, quindi arrivano in `unshielded_zats` ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Un blocco dopo il secondo stake di questa esecuzione, il resto del saldo appariva in `pending_zats`. Alcuni blocchi più tardi era di nuovo spendibile.

## Passaggio 4: fai staking verso un finalizer

### Aspetta uno Staking Day

Lo staking, l'annullamento dello staking e il prelievo vengono accettati soltanto quando

```text
block height mod 10,368 < 3,456
```

che è una finestra di 3.456 blocchi all'inizio di ogni 10.368. Con l'obiettivo della rete di 25 secondi per blocco, equivale a un giorno ogni tre ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Le prime finestre della versione 14 si aprono ai blocchi 20.736, 31.104, 41.472 e 51.840.

Secondo le note di rilascio, l'app annuncia l'inizio e la fine di ogni Staking Day. In questa esecuzione il suo elenco di blocchi mostrava una riga rossa "* FINE STAKING DAY *" tra i blocchi 34.559 e 34.560.

**Le note di rilascio dicono due cose.** Il loro elenco delle modifiche indica "~1 giorno per lo Staking Day e ~3 giorni per il ciclo di staking", che corrisponde al codice. Più sotto, una sezione riportata dalla Stagione 1 afferma ancora che uno Staking Day inizia ogni 150 blocchi e dura 70 blocchi. Segui la prima indicazione. La riga di fine qui sopra si trova nel punto in cui la prima regola chiude la finestra (34.560 mod 10.368 = 3.456); secondo la seconda regola, il blocco 34.560 ricadrebbe dentro una finestra.

### Scegli un finalizer

Un finalizer viene identificato dalla sua identità, una stringa che inizia con `zfinv1`. ZecHub pubblica l'identità del finalizer che gestisce in [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Copia un'identità da una fonte di cui ti fidi. Secondo le note di rilascio, l'app elenca anche i finalizer nel pannello di destra, con un'icona di copia a sinistra di ciascuno.

Dopo il tuo stake, la cronologia del portafoglio e l'RPC indicano il finalizer con una chiave esadecimale anziché con la sua identità. Per il finalizer di ZecHub quella chiave è `2941ef23...266aae8f`.

Scegli un finalizer di cui ti fidi. Il progetto non prevede slashing automatico, ma consente "un hard fork coordinato dagli utenti che brucia tutto lo stake delegato a un finalizer nominato" ([Crosslink libro, panoramica del progetto](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

La scelta decide anche chi vota. Ogni vincolo attivo guadagna la propria quota della ricompensa di staking. Se il suo finalizer rientra tra i 12 dell'elenco, un decimo di quella quota va al finalizer come commissione. Un vincolo indirizzato a un finalizer al di fuori dei 12 conserva tutta la propria quota, ma quel finalizer non vota ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Fai staking

1. Copia l'identità del finalizer.
2. Nella scheda **Il tuo portafoglio**, premi **Stake**.
3. Premi **Incolla identità**. La riga sopra il pulsante cambia mostrando i primi e gli ultimi caratteri dell'identità, `[zfinv1j6..YWyzp4YN]` per quella di ZecHub. Controllala prima di proseguire.
4. Fai clic su un importo. Gli importi avanzano a passi fissi, il minimo è 0,01 cTAZ e sono illuminati soltanto quelli coperti dal tuo saldo. Con 0,5 cTAZ, +0,01 cTAZ e +0,1 cTAZ lo erano.

**Non ti viene chiesta alcuna conferma e non sembra accadere nulla.** In questa esecuzione, nelle parole del tester: "L'ho cliccato una volta e non è successo nulla, è solo diventato grigio e poi si è illuminato di nuovo." Lo stake era andato a buon fine. La cronologia del portafoglio mostrava "Staking effettuato @ 33334 verso 2941ef23..266aae8f", la commissione era 0,00015 cTAZ e il portafoglio mostrava 0,010 cTAZ in staking. Un secondo stake pochi minuti dopo ha creato un secondo vincolo, al blocco 33.348.

Ogni stake crea il proprio vincolo di delega. Gli importi fissi e lo Staking Day esistono entrambi per la privacy: rendono più difficile distinguere lo stake di una persona da quello di un'altra.

## Passaggio 5: controlla la tua posizione

### I tuoi vincoli

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Questa è stata la risposta al blocco 36.490, due giorni dopo lo staking:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

La chiamata non richiede parametri. Restituisce i tuoi vincoli attivi, raggruppati sotto la chiave del finalizer che ciascuno supporta, e i vincoli che hanno terminato l'annullamento dello staking e possono essere prelevati. Ogni vincolo mostra l'importo in staking (`initial_val`), il suo valore attuale (`latest_val`) e la transazione e l'altezza del blocco che lo hanno creato. Le ricompense vengono aggiunte al vincolo stesso: al blocco 36.490 ogni vincolo di 1.000.000 zatoshi era cresciuto a 1.003.451.

**La finestra Modifica stake mostra ogni vincolo dieci volte più grande.** In questa esecuzione ogni vincolo di 0,01 cTAZ riportava 0,100 cTAZ nella propria riga e 0,1003536 cTAZ una volta iniziate le ricompense, mentre i totali sopra le righe (0,020 cTAZ, poi 0,02007 cTAZ) coincidevano con l'RPC. Segui i totali e l'RPC.

La stessa finestra mostrava un triangolo di avviso accanto al finalizer, prima e dopo l'avvio della finalità. Nel codice sorgente, il triangolo significa che la tua app non considera quel finalizer online, mentre uno online riceve un'icona Wi-Fi ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). I vincoli hanno comunque guadagnato ricompense.

### I finalizer

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Secondo le note di rilascio, questo segnala dove si trova il tuo nodo nel processo di voto e, per ogni finalizer, quando il tuo nodo ne ha ricevuto notizie l'ultima volta e come ha votato.

Prima del blocco 36.288 ogni campo è zero e l'elenco è vuoto. Questa è stata la risposta al blocco 33.354:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

Dopo l'inizio della finalità, l'elenco contiene i finalizer nell'elenco attivo. Al blocco 36.490 ne conteneva 12, tra cui ZecHub di `2941ef23...`, in linea con il limite di 12 dell'elenco. Questo è l'inizio di quella risposta, interrotta dopo la prima voce:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

Alcuni minuti dopo, il pannello destro dell'app mostrava "Finalizer (23)".

### Su Linux e macOS

La [fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) fornisce la chiamata in formato `curl`. Cambia il nome del metodo per le altre chiamate. Questo formato non è stato eseguito per questa guida:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Su Linux, le note di rilascio affermano che probabilmente devi avere installato `xclip` prima che copia e incolla funzionino nell'app.

### Un nome RPC da tenere d'occhio

Le note di rilascio della versione 14 descrivono una chiamata di staking chiamata `wallet_staking_action` che accetta un oggetto. Il codice sorgente della versione 14 non dispone di alcun metodo con quel nome e, in questa esecuzione, il nodo ha risposto:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

Il metodo di staking che registra è [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), che accetta una stringa contenente la richiesta in JSON, con il finalizer fornito dalla sua identità `zfinv1` ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Non è stato provato per questa guida.

## Annulla lo staking e preleva

Un vincolo non può essere annullato il giorno in cui viene creato. Servono tre Staking Day dall'inizio alla fine: fai staking in uno, annulla lo staking in uno successivo, preleva in un terzo. Le note di rilascio aggiungono che un vincolo non può effettuare due azioni di staking nello stesso Staking Day.

*Non eseguito per questa guida. Dalle note di rilascio della versione 14:* per annullare lo staking, premi **Modifica stake**, scegli un vincolo dall'elenco Vincoli in staking e fai clic sull'icona della catena. Per prelevare in uno Staking Day successivo, premi **Modifica stake**, scegli un vincolo dall'elenco Vincoli prelevabili e fai clic sull'icona del denaro. Spostare un vincolo verso un altro finalizer, che le note chiamano retargeting, è consentito in qualsiasi momento.

## Dove osservare la rete

La scheda [Crosslink su ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) raccoglie gli strumenti in un unico posto, sotto un avviso che recita "Lo staking su questa rete non sposta gli ZEC":

- Ospitati, senza necessità di un nodo: [Staker Space](https://crosslink.staker.space/), una "dashboard live per l'attuale testnet cTAZ" con altezza, miner, tasso di soluzioni, conto alla rovescia dello Staking Day e finalità, e [ctaz.cash](https://ctaz.cash/), con produzione del mining, elenco dei finalizer, peer e richieste di nomi di indirizzi di staking.
- Sulla tua macchina: `zcash-explorer`, la cui pagina `/live/crosslink` mostra attivazione, ritardo della finalità, elenco e posizioni di staking, e `crosslink_indexer`, un indice SQLite di un nodo Crosslink.

## Errori comuni

**Pianificare in base all'orologio anziché all'altezza del blocco.** Gli Staking Day sono conteggiati in blocchi. Osserva il conto alla rovescia di una dashboard, non il calendario.

**Fare staking negli ultimi minuti della finestra.** La regola viene verificata rispetto al blocco che include la tua transazione ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), quindi lo stake deve essere minato prima della chiusura della finestra, non solo inviato.

**Aspettarsi di minare il tuo stake.** Un miner CPU a quattro thread su un processore Intel Core i5-8350U non ha trovato blocchi tra l'8 e il 9 ottobre. Ottieni i tuoi primi cTAZ dal faucet o da un altro partecipante.

**Fare clic di nuovo perché sembrava non fosse successo nulla.** Ogni clic su un importo crea un nuovo vincolo. Controlla prima la cronologia del portafoglio o `wallet_staking_positions`.

**Andare nel panico dopo un riavvio.** Il tuo saldo e lo stake risultano zero finché il portafoglio non ha completato la nuova scansione. Aspetta che la Sincronizzazione portafoglio termini.

**Considerare i cTAZ come denaro giocattolo, o il segreto come innocuo.** cTAZ è una moneta di test, ma i cTAZ che guadagni determinano la tua quota di ZEC reali. Proteggi `secret.seed` come proteggeresti un portafoglio.

**Leggere istruzioni vecchie.** Le note di rilascio riportano testo delle stagioni precedenti accanto alle nuove regole. Quando sono in conflitto con ciò che fa il tuo nodo, il tuo nodo ha ragione.

## Pagine correlate

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - il progetto che questa rete testa
- [Shielded Labs](/zcash-organizations/shielded-labs) - il team dietro Crosslink
- [Verifica delle release di Zcash](/guides/verifying-zcash-releases) - cosa dimostra e cosa non dimostra un checksum
- [Zebra Full Node](/zcash-tech/zebra-full-node) - il nodo su cui è costruita l'app Feature Net
- [Zcash Testnet](/using-zcash/testnet) - l'ordinaria rete di test di Zcash, che è una rete diversa

## Fonti

- [Note di rilascio della versione 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 ottobre 2026
- [Crosslink: Feature net incentivate](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 aprile 2026
- [Crosslink: Feature Net incentivata](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Forum della community di Zcash
- [FAQ di Crosslink](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Il libro di Crosslink](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*I passaggi in questa pagina sono stati eseguiti con Feature Net versione 14 su Windows 11 (versione 10.0.26200.9550), dall'8 al 10 ottobre 2026. Un'affermazione che cita le note di rilascio o il codice sorgente è tratta da essi. Tutto ciò che è contrassegnato come "non eseguito" non è stato provato.*
