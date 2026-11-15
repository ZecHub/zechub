<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Unisciti alla Crosslink Feature Net

## TL;DR

- Feature Net è la testnet pubblica di Shielded Labs per [Crosslink](/zcash-tech/crosslink-protocol), il livello di finalità proposto che aggiunge lo staking accanto alla proof-of-work di Zcash.
- Funziona su una moneta di test, cTAZ. Nulla di ciò che ci fai sposta o rischia ZEC della mainnet.
- Una sola app desktop è insieme il nodo, il miner, il portafoglio e il finalizer. Estrae cTAZ per impostazione predefinita e ha un pulsante per il faucet.
- Staking, unstaking e prelievo funzionano solo durante uno "Staking Day", un giorno su tre. Se lo perdi, aspetti il successivo.
- Per fare staking, incolli l'identità di un finalizer e clicchi su un importo. Questa guida usa il finalizer di ZecHub come esempio.
- Due chiamate RPC mostrano a che punto sei: `wallet_staking_positions` e `get_tfl_recency_status`.

*Testato con Feature Net versione 14 su Windows 11 (versione 10.0.26200.9550), dall'8 al 10 ottobre 2026. Il software è un prototipo e cambia a ogni release. Se quello che vedi è diverso da questa pagina, fidati della tua esecuzione e apri pure una PR.*

## Che cos'è Feature Net

Crosslink è una proposta, non fa parte di Zcash oggi. La [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) di Shielded Labs afferma che dovrebbe "passare dal processo di governance standard di Zcash" prima di poter arrivare sulla mainnet. La pagina [Crosslink Protocol](/zcash-tech/crosslink-protocol) spiega il design.

Per provare il design con utenti reali, Shielded Labs gestisce quella che chiama [feature net incentivizzate](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "una serie di testnet incentivizzate". Sulla rete esistono tre ruoli, e l'app desktop può ricoprirli tutti:

| Ruolo | Cosa fa |
|---|---|
| Miner | Produce blocchi proof-of-work, come su Zcash oggi |
| Staker | Blocca cTAZ in un vincolo di delega e lo punta verso un finalizer |
| Finalizer | Vota per finalizzare i blocchi. Il suo potere di voto è lo stake delegato ad esso |

Il repository che sta dietro apre con un disclaimer che vale la pena leggere prima di installare qualsiasi cosa: "esiste per provare idee, non per dimostrare l'ingegneria di produzione" ed è "codice non pronto per la produzione" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Eseguilo su una macchina dove questo è accettabile.

### Cosa è cambiato nella versione 14

[La versione 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) è uscita il 1 ottobre 2026. La sua rete parte come semplice proof-of-work e attiva Crosslink in tre passaggi ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), mostrato anche su [ctaz.cash](https://ctaz.cash/v14)):

| Blocco | Cosa succede |
|---|---|
| 20.736 | Lo staking si apre |
| 34.560 | Il primo roster di finalizer viene preso dagli stake on chain |
| 36.288 | La finalità BFT inizia, e con essa le ricompense di staking |

Le ricompense di staking iniziano all'ultimo di quei blocchi. Un vincolo fatto prima non guadagna nulla fino ad allora ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

La stessa release ha ridotto il roster attivo ai 12 finalizer con più stake ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) e, nelle parole delle sue note di rilascio, ha dato loro una commissione: "il 10% di tutte le ricompense PoS in un blocco va a queste commissioni, mentre il 90% è distribuito a tutti i vincoli di staking".

### cTAZ e il vero ZEC

cTAZ ("Crosslink TAZ") è la moneta di test di Feature Net. Fai staking di cTAZ, mai di ZEC.

Il vero ZEC entra in gioco solo alla fine. Shielded Labs ha [accantonato 500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) per le feature net, e le [note di rilascio](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) dicono che viene pagato "su base pro rata, in base soltanto alla quantità di cTAZ che ciascun partecipante ha guadagnato con il mining o con lo staking". Due conseguenze:

- **Le monete del faucet non contano.** Il cTAZ che ti hanno dato, il faucet o chiunque altro, non guadagna nulla restando fermo nel tuo portafoglio. Contano solo le ricompense di blocco da mining e staking.
- **I pagamenti vanno richiesti, non sono automatici.** Shielded Labs annuncia ogni round nel [thread del forum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Per il Round 2 ha chiesto ai partecipanti di inviare le chiavi di visualizzazione del proprio portafoglio e un indirizzo sulla mainnet entro il 4 ottobre 2026 ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). La rete su cui gira la versione 14, quella a cui questa guida si unisce, è stata annunciata come Round 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Prima di iniziare

- **Un computer che puoi lasciare acceso.** La release ha build per Windows, macOS, Ubuntu e Arch Linux. Questa guida è stata eseguita su Windows, su un PC con un processore Intel Core i5-8350U.
- **Uno Staking Day.** Controlla quando si apre il prossimo prima di pianificare qualsiasi cosa. [La dashboard di Staker Space](https://crosslink.staker.space/) ne fa il conto alla rovescia.
- **Null'altro.** Niente ZEC, nessun account e nessuna registrazione.

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

Il digest che GitHub mostra per quel file è `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. L'esadecimale non distingue tra maiuscole e minuscole, quindi le lettere maiuscole qui sopra vanno bene. Per far fare il confronto alla shell invece che ai tuoi occhi:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Sappi quanto vale questo controllo. La release non porta alcuna firma, quindi un hash corrispondente ti dice che il download è completo ed è il file che GitHub distribuisce. Non ti dice chi l'ha compilato. [Verifica delle release di Zcash](/guides/verifying-zcash-releases) spiega la differenza.

## Passaggio 2: avvia il nodo e lascialo sincronizzare

Avvia l'app da un terminale, così che i suoi messaggi di avvio restino sullo schermo. Usa una normale finestra PowerShell, non una aperta con "Esegui come amministratore": si tratta di un prototipo non firmato, e non ha bisogno dei diritti di amministratore.

```powershell
.\zebrad_v14_win32.exe
```

Si apre una finestra intitolata "Zcash Crosslink Visualizer". Il portafoglio sta a sinistra, con le schede **Your Wallet** e **Faucet Wallet**, la chain è disegnata al centro, e i finalizer sono elencati a destra. Il terminale continua a stampare il log del nodo. Lascia aperti entrambi mentre usi la rete.

Le note di rilascio rimandano a un [video dell'installazione di Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

L'app tiene i suoi dati in una cartella di cache: `%LOCALAPPDATA%\zebra` su Windows, `~/.cache/zebra` su Linux e `~/Library/Caches/zebra` su macOS, secondo le note di rilascio.

**Tieni il segreto per te.** Quella cartella contiene un file chiamato `secret.seed`. L'app lo crea al primo avvio ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) e da esso deriva il tuo portafoglio e l'identità del tuo finalizer ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). L'app ha anche un pulsante **Copy Seed** che mette lo stesso segreto negli appunti. Chiunque abbia l'uno o l'altro controlla il tuo portafoglio. Non incollarli mai in una chat, in un post del forum o in uno screenshot.

### Come capire se sei sincronizzato

Le note di rilascio dicono che non esiste "nessun monitoraggio integrato di quanto la tua sincronizzazione sia vicina alla punta della rete". La versione 14 però ne ha qualcuno: il menu a tendina **Network Info** in alto nella finestra ha righe per PoW Height, Wallet Sync e Blocks Behind Known PoW ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Confronta la tua altezza con quella su [Staker Space](https://crosslink.staker.space/) o su [ctaz.cash](https://ctaz.cash/).

Il nodo risponde anche via RPC:

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

La porta RPC `127.0.0.1:8232` è aperta per impostazione predefinita in questa build e non richiede password ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Ascolta solo sulla tua macchina, e qualsiasi cosa in esecuzione su quella macchina può chiamarla.

In questa esecuzione la prima sincronizzazione, dal blocco 0 alla punta a circa il blocco 28.400, ha richiesto circa 50 minuti.

**Dopo un riavvio il tuo saldo segna zero per un po'.** Ogni volta che l'app si avvia, ricostruisce il portafoglio da `secret.seed` e riscansiona la chain dal blocco 0 ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Finché la scansione non arriva alle tue transazioni, il tuo saldo e il tuo stake appaiono come 0. In questa esecuzione sono tornati circa 15 minuti dopo un riavvio. Il portafoglio del faucet viene riscansionato allo stesso modo ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), e durante la scansione la scheda Faucet Wallet mostrava un saldo molto grande. Ignora entrambi finché Wallet Sync non è completo.

## Passaggio 3: ottieni un po' di cTAZ

### Estrailo

Secondo le note di rilascio, l'app avvia il mining CPU verso il tuo stesso portafoglio una volta sincronizzata. Non devi accendere nulla. Le monete estratte vanno a un indirizzo trasparente del tuo stesso portafoglio ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Che trovi un blocco è un'altra cosa. Le note avvertono che "puoi essere surclassato da altri che estraggono più in fretta, quindi non c'è garanzia di successo". Per impostazione predefinita il miner integrato usa un singolo thread CPU ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Per usare più thread, imposta una variabile d'ambiente nella stessa finestra PowerShell prima di avviare l'app ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Questa esecuzione ne ha usate quattro:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

La variabile dura solo quanto quella finestra. Con essa impostata, il contatore dei processori di Windows mostrava il nodo che usava il tempo di quattro o cinque processori, in percentuale di un processore logico:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Risultato: un Intel Core i5-8350U che estraeva su quattro thread, dalle prime ore dell'8 ottobre al pomeriggio del 9 ottobre, non ha trovato alcun blocco.

### Oppure usa il faucet

L'app ha un pulsante **Receive cTAZ** in basso a destra. Nel sorgente della versione 14, una pressione invia 0,5 cTAZ dal portafoglio del faucet al tuo ([importo](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [invio](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Il faucet è un unico portafoglio che ogni copia dell'app porta con sé ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), e la scheda **Faucet Wallet** mostra il suo saldo.

Il pulsante è spento a meno che il faucet non abbia più di 5,01 cTAZ in monete schermate ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). La scheda conta anche le monete estratte dal faucet, e quelle vengono schermate solo in lotti di esattamente 10 cTAZ più una commissione ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), quindi la scheda può mostrarne tante mentre il pulsante resta grigio. In questa esecuzione è rimasto grigio l'8 e il 9 ottobre, con "The faucet is mining more funds." al passaggio del mouse, mentre la scheda mostrava 14,74695 cTAZ.

**Quando il pulsante è grigio, chiedi al tuo stesso nodo.** Il nodo ha un metodo di richiesta al faucet, `requestfaucetdonation` ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), che non applica la regola dei 5,01 cTAZ del pulsante. Metti il tuo stesso indirizzo al posto di `YOUR_ADDRESS` (è il campo `address` di `wallet_spendable_funds`, qui sotto):

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

Quella risposta significa che la richiesta è stata messa in coda, non che sia stata inviata. In questa esecuzione i 0,5 cTAZ del faucet sono stati estratti al blocco 33.306 ed erano spendibili al blocco 33.322. Chiedi una volta sola: il faucet è condiviso, e una seconda richiesta per lo stesso indirizzo viene rifiutata mentre la prima è in sospeso ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Oppure chiedi a un altro partecipante

Chiunque sulla rete può inviarti cTAZ con il pulsante **Send** dell'app. In questa esecuzione un altro partecipante ha inviato 31 cTAZ. È arrivato come "Received" con la nota "send from user wallet", che è la nota che il Send dell'app stesso allega ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Chiedi nel [thread del forum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), e dai soltanto il tuo indirizzo.

Le monete del faucet e i regali bastano per imparare lo staking. Non contano per le ricompense di ZEC.

### Controlla cosa puoi spendere

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Questa era la risposta una volta arrivati i 0,5 cTAZ del faucet, con l'indirizzo accorciato:

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

Gli importi sono in zatoshi: 100.000.000 fanno un cTAZ. Le monete schermate hanno bisogno di 3 conferme prima di contare come spendibili ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Le monete dal faucet e dagli altri partecipanti finiscono in `spendable_zats`. Le monete estratte sono trasparenti, quindi finiscono in `unshielded_zats` ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Un blocco dopo il secondo stake di questa esecuzione, il resto del saldo appariva sotto `pending_zats`. Qualche blocco dopo era di nuovo spendibile.

## Passaggio 4: fai staking verso un finalizer

### Aspetta uno Staking Day

Staking, unstaking e prelievo vengono accettati solo mentre

```text
block height mod 10,368 < 3,456
```

cioè una finestra di 3.456 blocchi all'inizio di ogni 10.368. Con il target di blocco di 25 secondi della rete, è un giorno ogni tre ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Le prime finestre della versione 14 si aprono ai blocchi 20.736, 31.104, 41.472 e 51.840.

Secondo le note di rilascio, l'app annuncia l'inizio e la fine di ogni Staking Day. In questa esecuzione la sua lista di blocchi mostrava una riga rossa "* STAKING DAY END *" tra i blocchi 34.559 e 34.560.

**Le note di rilascio dicono due cose.** La loro lista di modifiche dà "~1 giorno per lo Staking Day e ~3 giorni per lo Staking Cycle", il che corrisponde al codice. Più in basso, una sezione riportata dalla Season 1 dice ancora che uno Staking Day inizia ogni 150 blocchi e dura 70. Segui la prima. La riga di fine qui sopra sta dove la prima regola chiude la finestra (34.560 mod 10.368 = 3.456); con la seconda regola il blocco 34.560 cadrebbe dentro una finestra.

### Scegli un finalizer

Un finalizer viene designato dalla sua identità, una stringa che inizia con `zfinv1`. ZecHub pubblica l'identità del finalizer che gestisce in [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Copia un'identità da una fonte di cui ti fidi. Secondo le note di rilascio, l'app elenca anche i finalizer nel suo pannello di destra, con un'icona di copia a sinistra di ciascuno.

Dopo lo staking, la cronologia del portafoglio e l'RPC nominano il finalizer con una chiave esadecimale invece che con la sua identità. Per il finalizer di ZecHub quella chiave è `2941ef23...266aae8f`.

Scegli un finalizer di cui ti fidi. Il design non prevede alcuno slashing automatico, ma permette "un hard fork coordinato dagli utenti che brucia tutto lo stake delegato a un finalizer nominato" ([Crosslink libro, panoramica del design](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

La scelta decide anche chi vota. Ogni vincolo attivo guadagna la sua quota della ricompensa di staking. Se il suo finalizer è tra i 12 del roster, un decimo di quella quota va al finalizer come commissione. Un vincolo puntato verso un finalizer fuori dai 12 mantiene tutta la sua quota, ma quel finalizer non vota ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Fai staking

1. Copia l'identità del finalizer.
2. Nella scheda **Your Wallet**, premi **Stake**.
3. Premi **Paste Identity**. La riga sopra il pulsante cambia nei primi e negli ultimi caratteri dell'identità, `[zfinv1j6..YWyzp4YN]` per quella di ZecHub. Controllala prima di andare avanti.
4. Clicca un importo. Gli importi arrivano a passi fissi, il più piccolo è 0,01 cTAZ, e sono accesi solo gli importi che il tuo saldo copre. Con 0,5 cTAZ lo erano +0,01 cTAZ e +0,1 cTAZ.

**Nulla ti chiede una conferma, e nulla sembra succedere.** In questa esecuzione, con le parole del tester: "Ho cliccato una volta e non è successo niente, è solo diventato grigio e poi si è riaccesso." Lo stake era passato. La cronologia del portafoglio mostrava "Staked @ 33334 to 2941ef23..266aae8f", la commissione era 0,00015 cTAZ, e il portafoglio mostrava 0,010 cTAZ Staked. Un secondo stake pochi minuti dopo ha creato un secondo vincolo, al blocco 33.348.

Ogni stake crea il suo vincolo di delega. Gli importi fissi e lo Staking Day esistono entrambi per la privacy: rendono più difficile distinguere lo stake di una persona da quello di un'altra.

## Passo 5: controlla la tua posizione

### I tuoi vincoli

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Questa era la risposta al blocco 36.490, due giorni dopo lo staking:

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

La chiamata non accetta parametri. Restituisce i tuoi vincoli attivi, raggruppati sotto la chiave del finalizer supportato da ciascuno, e i vincoli che hanno terminato lo sblocco e possono essere prelevati. Ogni vincolo mostra l'importo messo in staking (`initial_val`), il suo valore attuale (`latest_val`) e la transazione e l'altezza di blocco che l'hanno creato. I premi vengono aggiunti al vincolo stesso: al blocco 36.490 ogni vincolo da 1.000.000 di zatoshis era cresciuto fino a 1.003.451.

**La finestra Edit Stake mostra ogni vincolo dieci volte più grande di quello che è.** In questa esecuzione ogni vincolo da 0,01 cTAZ risultava 0,100 cTAZ nella propria riga, e 0,1003536 cTAZ una volta partiti i premi, mentre i totali sopra le righe (0,020 cTAZ, poi 0,02007 cTAZ) corrispondevano alla RPC. Fidati dei totali e della RPC.

La stessa finestra mostrava un triangolo di avviso accanto al finalizer, prima e dopo l'inizio della finalità. Nel sorgente, il triangolo significa che la tua app non considera quel finalizer come online, e uno online ha invece un'icona Wi-Fi ([sorgente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). I vincoli hanno comunque guadagnato premi.

### I finalizer

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Secondo le note di rilascio, riporta dove si trova il tuo nodo nel processo di voto e, per ogni finalizer, quando il tuo nodo ne ha avuto notizia l'ultima volta e come ha votato finora.

Prima del blocco 36.288 ogni campo è a zero e la lista è vuota. Questa era la risposta al blocco 33.354:

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

Dopo l'inizio della finalità, la lista contiene i finalizer presenti nel roster. Al blocco 36.490 ne conteneva 12, tra cui quello di ZecHub, `2941ef23...`, il che corrisponde al limite del roster di 12. Questo è l'inizio di quella risposta, tagliata dopo la prima voce:

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

Pochi minuti dopo, il pannello di destra dell'app mostrava "Finalizers (23)".

### Su Linux e macOS

Il [sorgente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) fornisce la chiamata in formato `curl`. Cambia il nome del metodo per le altre chiamate. Questa forma non è stata eseguita per questa guida:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Su Linux, le note di rilascio dicono che probabilmente devi installare `xclip` prima che copia e incolla funzionino nell'app.

### Un nome di RPC da tenere d'occhio

Le note di rilascio della versione 14 descrivono una chiamata di staking chiamata `wallet_staking_action` che accetta un oggetto. Il codice sorgente della versione 14 non ha alcun metodo con quel nome, e in questa esecuzione il nodo ha risposto:

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

Il metodo di staking che registra è [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), che accetta una stringa contenente la richiesta come JSON, con il finalizer dato dalla sua identità `zfinv1` ([sorgente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Non è stato provato per questa guida.

## Sbloccare e prelevare

Un vincolo non può essere annullato il giorno stesso in cui viene fatto. Richiede tre Staking Days dall'inizio alla fine: metti in staking in uno, sblocca in uno successivo, preleva in un terzo. Le note di rilascio aggiungono che un vincolo non può compiere due azioni di staking nello stesso Staking Day.

*Non eseguito per questa guida. Dalle note di rilascio della versione 14:* per sbloccare, premi **Edit Stake**, scegli un vincolo dall'elenco Staked Bonds e clicca l'icona a catenella. Per prelevare in uno Staking Day successivo, premi **Edit Stake**, scegli un vincolo dall'elenco Withdrawable Bonds e clicca l'icona del denaro. Spostare un vincolo verso un finalizer diverso, che le note chiamano retargeting, è consentito in qualsiasi momento.

## Dove osservare la rete

La scheda [Crosslink su ZecHub Strumenti](https://zechub.wiki/tools?tool=crosslink) raccoglie gli strumenti in un unico posto, sotto un avviso che recita "Lo staking su questa rete non sposta ZEC":

- Ospitato, senza bisogno di un nodo: [Staker Space](https://crosslink.staker.space/), una "dashboard live per l'attuale testnet cTAZ" con l'altezza, i miner, il tasso di soluzione, il conto alla rovescia dello Staking Day e la finalità, e [ctaz.cash](https://ctaz.cash/), con la produzione di mining, il roster dei finalizer, i peer e le attestazioni dei nomi degli indirizzi di staking.
- Sul tuo computer: `zcash-explorer`, la cui pagina `/live/crosslink` mostra l'attivazione, il ritardo di finalità, il roster e le posizioni di staking, e `crosslink_indexer`, un indice SQLite di un nodo Crosslink.

## Errori comuni

**Pianificare in base all'orologio invece che all'altezza di blocco.** Gli Staking Day si contano in blocchi. Segui il conto alla rovescia di una dashboard, non il calendario.

**Mettere in staking negli ultimi minuti della finestra.** La regola viene verificata rispetto al blocco che include la tua transazione ([sorgente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), quindi lo stake deve essere minato prima che la finestra si chiuda, non semplicemente inviato.

**Pretendere di minare il tuo stake.** Un miner CPU a quattro thread su un Intel Core i5-8350U non ha trovato nessun blocco tra l'8 e il 9 ottobre. Ottieni il tuo primo cTAZ dal faucet o da un altro partecipante.

**Cliccare di nuovo perché sembrava non succedesse nulla.** Ogni clic su un importo è un nuovo vincolo. Controlla prima la cronologia del portafoglio o `wallet_staking_positions`.

**Farsi prendere dal panico dopo un riavvio.** Il tuo saldo e il tuo stake indicano zero finché il portafoglio non ha rifatto la scansione. Aspetta che il Wallet Sync sia finito.

**Trattare il cTAZ come denaro di gioco, o il segreto come innocuo.** Il cTAZ è una moneta di test, ma il cTAZ che guadagni decide la tua quota di ZEC reali. Proteggi `secret.seed` come faresti con un portafoglio.

**Leggere vecchie istruzioni.** Le note di rilascio portano testo di stagioni precedenti accanto alle nuove regole. Dove non sono d'accordo con quello che fa il tuo nodo, il tuo nodo ha ragione.

## Pagine correlate

- [Crosslink Protocollo](/zcash-tech/crosslink-protocol) - il design che questa rete mette alla prova
- [Shielded Labs](/zcash-organizations/shielded-labs) - il team dietro a Crosslink
- [Verificare le release di Zcash](/guides/verifying-zcash-releases) - cosa prova e cosa non prova un checksum
- [Zebra Full Node](/zcash-tech/zebra-full-node) - il nodo su cui è costruita l'app Feature Net
- [Zcash Testnet](/using-zcash/testnet) - la rete di test ordinaria di Zcash, che è una rete diversa

## Fonti

- [Note di rilascio della versione 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1° ottobre 2026
- [Crosslink: Feature Net incentivate](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 aprile 2026
- [Crosslink: Feature Net incentivati](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Forum della community di Zcash
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Il libro di Crosslink](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*I passi di questa pagina sono stati eseguiti con Feature Net versione 14 su Windows 11 (versione 10.0.26200.9550), dall'8 al 10 ottobre 2026. Un'affermazione che cita le note di rilascio o il codice sorgente è tratta da essi. Tutto ciò che è contrassegnato come "non eseguito" non è stato provato.*
