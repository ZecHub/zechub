<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Chiavi di visualizzazione

Gli indirizzi schermati ti permettono di transare rivelando il meno possibile sulla blockchain di Zcash. Ma cosa succede quando *devi* proprio mostrare a una parte specifica cosa possiedi, o cosa hai inviato? Una chiave di visualizzazione concede l'accesso in lettura senza concedere la capacità di spendere. Le chiavi di visualizzazione esistevano già per Sprout; Sapling ha aggiunto capacità come il rilevamento di quando una nota ricevuta viene spesa. [ZIP 310](https://zips.z.cash/zip-0310) è una bozza informativa che documenta le proprietà di sicurezza delle chiavi di visualizzazione di Sapling, non l'aggiornamento che ha introdotto le chiavi di visualizzazione.

La chiave di visualizzazione è lo strumento per la divulgazione selettiva: scegli tu chi vede cosa, e per farlo non consegni mai l'autorità di spesa.

## TL;DR

Una chiave di visualizzazione concede l'accesso in **sola lettura** all'attività di un indirizzo o di un account schermato Zcash: chi la detiene può vedere le transazioni in entrata (e, per le chiavi di visualizzazione complete, in uscita) ma non può mai spendere.

- **Cos'è:** lo strumento di divulgazione selettiva delle pool schermate, con capacità che variano a seconda della pool e del tipo di chiave. [ZIP 310](https://zips.z.cash/zip-0310) documenta cosa rivela una chiave di visualizzazione completa di Sapling e quali informazioni sono garantite, non verificate, non definite o non rivelate.
- **Cosa concede:** il rilevamento dei depositi (chiavi di visualizzazione in entrata di `uivk…`) o la visibilità completa di entrate e uscite per un account (chiavi di visualizzazione complete unificate di `uview…`), oltre alle chiavi legacy Sapling `zxviews…`.
- **Cosa non concede:** l'autorità di spesa. Nulla di ciò che fa chi detiene una chiave di visualizzazione può muovere i fondi.
- **Dove funziona oggi:** esportazione/importazione in [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) e account di sola osservazione in portafogli come Zkool; consulta la pagina [Portafogli](/using-zcash/wallets) per la matrice di supporto attuale.
- **La regola pratica:** preferisci la chiave più ristretta che risponde alla domanda posta, e ricorda che una chiave consegnata non può essere revocata — l'unico modo per superarla è spostare i fondi.

---

## Perché usare una chiave di visualizzazione?

Gli scritti di Electric Coin Company sull'argomento descrivono le situazioni che emergono più spesso, e sono ancora oggi quelle comuni:

- **Un exchange che controlla i depositi.** L'exchange carica una chiave di visualizzazione in entrata su un nodo di rilevamento esposto a internet, in modo da accorgersi dei depositi dei clienti verso un indirizzo schermato, mentre la chiave di spesa resta su hardware che non tocca mai la rete.
- **Un custode che prova le proprie disponibilità.** Il custode consegna a un revisore una chiave di visualizzazione completa per ogni indirizzo schermato. Il revisore può verificare quei saldi e rivedere l'attività passata da e verso quegli indirizzi, e non può fare nient'altro.
- **Due diligence su una controparte.** Quando un exchange deve esaminare la cronologia schermata di un cliente nell'ambito di una due diligence rafforzata, può chiedere la chiave di visualizzazione anziché i fondi.

## Cosa rivela e cosa non rivela una chiave di visualizzazione

Esiste più di un tipo di chiave, e la differenza decide quanto dai via.

| Chiave | Prefisso | Concede |
|---|---|---|
| Chiave di visualizzazione completa unificata (UFVK) | `uview…` | Vede le transazioni in entrata **e** in uscita per ogni pool dell'account |
| Chiave di visualizzazione in entrata unificata (UIVK) | `uivk…` | Vede solo le transazioni in entrata, per ogni pool dell'account |
| Chiave di visualizzazione completa estesa di Sapling | `zxviews…` | Vede l'attività di Sapling in entrata e in uscita per gli indirizzi della chiave |

Nessuna di queste può spendere. Tutte sono permanenti nel senso che conta: una chiave che hai consegnato non può essere revocata, ma solo superata, spostando i fondi verso un account le cui chiavi l'altra parte non detiene.

Prima di condividere qualcosa, vale la pena conoscere due trappole della divulgazione.

**In entrata non significa ristretta.** Una chiave di visualizzazione in entrata unificata ha come ambito l'intero account, non il singolo indirizzo su cui ti hanno chiesto informazioni. Esportare una UIVK per un singolo indirizzo Sapling concede comunque la visibilità delle entrate su ogni pool di quell'account, quindi rivela più di quanto faccia l'indirizzo che nomina. Il [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) lo afferma esplicitamente.

**Un indirizzo pubblicato espone già le sue chiavi di visualizzazione in entrata a un avversario futuro.** [ZIP 326](https://zips.z.cash/zip-0326) osserva che un avversario con un computer quantistico potrebbe recuperare le chiavi di visualizzazione in entrata da un indirizzo diversificato pubblicato, cosa fattibile in un modo in cui recuperare la chiave del nullifier non lo è. Pubblicare un indirizzo oggi non equivale a pubblicare una chiave di visualizzazione, ma con un orizzonte temporale abbastanza lungo le due cose si avvicinano.

## Le chiavi di visualizzazione dopo Ironwood

NU6.3 ha introdotto la pool schermata Ironwood e ha reso la pool Orchard di sola spesa, cosicché i fondi migrano dall'una all'altra nel tempo. Consulta [Ironwood](/zcash-tech/ironwood) e [Il turnstile](/zcash-tech/the-turnstile) per l'aggiornamento in sé.

**Una chiave di visualizzazione rilasciata prima di Ironwood continua a funzionare anche dopo la migrazione.** ZIP 326 specifica che un receiver, e la corrispondente chiave di visualizzazione in entrata, ha come ambito il *protocollo* Orchard anziché una pool: la stessa chiave di visualizzazione in entrata decifra in prova sia i testi cifrati delle note della pool Orchard sia quelli della pool Ironwood. Zallet la implementa così, descrivendo le note Ironwood come di forma Orchard e decifrandole in prova con le chiavi di visualizzazione Orchard dell'account nel dominio di crittografia delle note Ironwood.

Tre conseguenze per chiunque detenga o rilasci una chiave:

1. **I saldi si spostano tra le pool, e chi osserva lo vede accadere.** [ZIP 318](https://zips.z.cash/zip-0318) specifica la migrazione come una serie di piccole transazioni da Orchard a Ironwood, deliberatamente uniformi, trasmesse secondo un calendario randomizzato, ognuna delle quali spende una nota Orchard e produce un output Ironwood di taglio canonico. Un revisore che osserva con una chiave di visualizzazione vede le disponibilità spostarsi da una pool all'altra a passi nel giro di settimane, non in un unico movimento. Un portafoglio può ricostruire il proprio avanzamento della migrazione dai dati della chain usando le proprie chiavi di visualizzazione.
2. **Ogni passo della migrazione rivela il valore che sposta.** Ciò è intrinseco all'attraversamento di un turnstile (tornello), ed è ciò che rende la migrazione verificabile. Suddividere il saldo in tagli canonici fa sì che nessuna singola transazione riveli l'intero saldo della pool Orchard.
3. **Gli account creati dopo Ironwood possono derivare le proprie chiavi in modo diverso.** [ZIP 2005](https://zips.z.cash/zip-2005) aggiunge un flag `use_qsk` per le chiavi quantisticamente recuperabili, e cambia il modo in cui vengono derivate le chiavi di entrata, di uscita e i diversifier, quindi le chiavi `use_qsk = true` sono chiavi genuinamente diverse. ZIP 326 richiede che il flag sia uniforme in un account e vieta di generare chiavi `use_qsk = true` prima che NU6.3 fosse attivato sulla Mainnet. Una chiave esportata da un account esistito prima di Ironwood è quindi una chiave `use_qsk = false`, e resta corretta per quell'account. Non dare per scontato che una chiave esportata da un account descriva un altro.

## Esportare una chiave di visualizzazione

### Zallet

[Zallet](https://github.com/zcash/zallet) è il portafoglio full node (nodo completo) che ha sostituito il portafoglio interno a zcashd. L'esportazione e l'importazione delle chiavi di visualizzazione sono arrivate nella **v0.1.0-beta.2 (28 luglio 2026)**, quindi verifica prima la tua versione; le build precedenti non hanno questi metodi. Ogni argomento dopo il nome del metodo deve essere JSON valido, il che significa che i valori stringa conservano le proprie virgolette doppie. La [Zallet Guida di riferimento rapido](/using-zcash/zallet-quick-reference-guide) copre lo stile generale dei comandi.

Elenca cosa contiene il portafoglio:

```bash
zallet rpc listaddresses
```

Esporta la chiave di visualizzazione completa unificata dell'account passando un indirizzo unificato:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Esporta invece la chiave di visualizzazione in entrata unificata dell'account, usando l'argomento opzionale `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Passando un indirizzo Sapling si ottiene la chiave di visualizzazione completa estesa di Sapling per quell'account (`zxviews…`), riproducendo il vecchio comportamento di zcashd. Due limiti documentati: gli indirizzi Sprout vengono rifiutati, e una chiave di visualizzazione completa estesa di Sapling non può essere esportata da un account importato a sua volta in sola osservazione, perché il portafoglio non può ricostruirla. La forma `ivk` funziona invece per gli account importati in sola osservazione.

### Portafogli che esportano le chiavi di visualizzazione dalla propria interfaccia

La pagina [Portafogli](/using-zcash/wallets) traccia il supporto delle chiavi di visualizzazione e la disponibilità Ironwood per ogni portafoglio. Al momento della scrittura, i portafogli che indicano sia il supporto delle chiavi di visualizzazione sia **Ironwood: Ready** includono ZODL, Zingo!, Zkool, Cake, Zallet, zecd e Nozy. Prima di fare affidamento su un singolo portafoglio, controlla quella pagina anziché questa, perché la disponibilità cambia.

## Importare una chiave di visualizzazione come account di sola osservazione

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) è qui l'opzione più flessibile, perché accetta le chiavi unificate oltre a quelle legacy. Il suo README documenta gli account di sola osservazione creati da una **chiave di visualizzazione unificata** o da una **chiave di visualizzazione estesa di Sapling**, accanto alle chiavi estese schermate legacy esportate da zcashd. Aggiungi un nuovo account, scegli la strada in sola osservazione e incolla la chiave `uview…` o `zxviews…`; l'account quindi si sincronizza e riporta saldi e cronologia senza alcuna autorità di spesa.

Il supporto del protocollo Ironwood e la migrazione da Orchard a Ironwood sono arrivati in Zkool 6.24.0 (20 luglio 2026), e la 6.26.1 (2 agosto 2026) ha corretto il rilevamento delle transazioni Ironwood nel mempool. Con NU7 attivato sulla Mainnet (blocco 3.543.405), esegui [6.35.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.35.0) (25 ottobre 2026) o versioni successive: è la prima release di Zkool compilata con l'altezza di attivazione Mainnet di NU7 ([zkool2#1388](https://github.com/hhanh00/zkool2/pull/1388)).

La 6.35.0 accetta anche le **chiavi di visualizzazione in entrata unificate**. Incolla una chiave `uivk…` dove andrebbe una chiave qualsiasi e Zkool crea un account di sola entrata: mostra ciò che l'account originale riceve, memo inclusi, e nulla di ciò che invia ([zkool2#1348](https://github.com/hhanh00/zkool2/pull/1348)). Una chiave in entrata non vede le spese, quindi il saldo dell'account è il totale ricevuto, non quanto resta, e l'account non può spendere. Zkool può anche esportare la UIVK di un account ([zkool2#1347](https://github.com/hhanh00/zkool2/pull/1347)).

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Il secondo argomento è la politica di rescan: `"whenkeyisnew"` (il valore predefinito), `"yes"` o `"no"`. Il terzo è l'altezza del blocco da cui partire con il rescan. Zallet importa la chiave come account di sola osservazione e traccia le transazioni in entrata e in uscita per i suoi indirizzi senza autorità di spesa.

**Zallet importa solo le chiavi di visualizzazione complete estese di Sapling.** Non importerà una chiave di visualizzazione completa unificata di `uview…`, anche se può esportarne una. Per consegnare l'accesso in lettura a un intero account unificato, esporta la UFVK da Zallet e importala in un portafoglio che accetta le chiavi unificate, come Zkool.

Per trasformare una chiave importata in un file completo di cronologia delle transazioni, con txid, commissioni e memo, consulta [Esportare la cronologia delle transazioni da una Viewing Key](/guides/viewing-key-transaction-export).

## Cosa è cambiato, e cosa smettere di cercare

Se hai seguito una versione precedente di questa pagina, o una sua traduzione, tre strade non funzionano più.

- **`zcash-cli z_exportviewingkey` e `z_importviewingkey`.** zcashd ha raggiunto l'arresto di fine supporto il 18 luglio 2026 e non viene più eseguito. I metodi con lo stesso nome di Zallet sono la sostituzione; consulta la [guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **La guida passo passo per Ywallet.** La pagina Portafogli segnala Ywallet come **Ironwood: Not Ready**, quindi non è il portafoglio da indicare alle persone per le chiavi di visualizzazione dell'era Ironwood. Zkool, dello stesso sviluppatore, accetta la stessa gamma di chiavi ed è segnato come Ready.
- **zcashblockexplorer.com/vk.** Il servizio restituisce HTTP 503 con un certificato non valido, ed è stato abbandonato anziché sostituito. Incollare una chiave di visualizzazione in un sito web consegna l'intera tua cronologia delle transazioni a chiunque gestisca quel sito, ed è sempre stata l'opzione più debole delle tre nella vecchia pagina. Importa invece la chiave in un portafoglio che gestisci tu.

## Visivo / Analogia

### La finestra del revisore

Pensa a un account schermato come a una sala depositi in una banca:

- La **chiave di spesa** è la chiave della sala. Chi la detiene può aprire le cassette e prenderne il contenuto.
- Una **chiave di visualizzazione** è la finestra del revisore su quella sala. Il revisore può osservare ogni cassetta entrare e uscire, leggere le etichette e tenere un registro — ma la finestra non ha maniglia. Nulla di ciò che si trova nella stanza può essere mosso da chi guarda attraverso di essa.

### Cosa non può mostrare la finestra

La finestra è rivolta verso la sala, non verso il mondo fuori da essa. Mostra l'attività schermata dell'account osservato; non trasforma chi osserva in un osservatore dell'intera blockchain, e non permette a chi osserva di correlare l'attività dell'account con la cronologia non schermata di chiunque altro. E poiché la finestra è installata a livello di account, consegnare a qualcuno uno spioncino per una sola cassetta di sicurezza (un singolo indirizzo) gli dà comunque la vista in entrata dell'intera sala — ed è esattamente il motivo per cui esiste la regola della chiave più ristretta.

### Perché non puoi riprenderti la finestra

Una chiave di visualizzazione è un'informazione, non una voce di permesso. Una volta copiata, esiste finché i fondi non lasciano l'account che osserva. Il rimedio pratico è la rotazione: sposta i saldi su un account nuovo di zecca le cui chiavi l'altra parte non ha mai ricevuto, e la vecchia finestra si troverà davanti una sala vuota.

## Approfondimento

### Decifrazione di prova: come funziona davvero la visualizzazione

Ogni transazione schermata cifra i testi in chiaro delle proprie note per il destinatario previsto. Un portafoglio che possiede una chiave di visualizzazione esegue la **decifrazione di prova**: per ogni transazione che trova on-chain, tenta di decifrare i testi cifrati delle note con la chiave. Le corrispondenze rivelano il valore della nota, il diversifier del destinatario e il memo. Un mancato abbinamento costa quasi quanto una corrispondenza, perché il passaggio più costoso, un accordo di chiavi, avviene prima che il portafoglio possa capire se la nota è sua, quindi il costo della scansione cresce con ogni chiave che il portafoglio controlla (vedi [Rilevamento di pagamenti schermati](Detecting_Shielded_Payments.md)). Ecco perché la stessa chiave di visualizzazione in entrata continua a funzionare sulle pool Orchard e Ironwood: [ZIP 326](https://zips.z.cash/zip-0326) delimita un receiver al *protocollo* Orchard, quindi i testi cifrati delle note Ironwood hanno forma Orchard e vengono decifrati in prova con le chiavi di visualizzazione Orchard dell'account, nel dominio di crittografia delle note Ironwood.

### Completa vs in entrata: cosa decide la derivazione

Una chiave di visualizzazione **completa** può derivare la capacità di visualizzazione in uscita, che è ciò che permette a un revisore di ricostruire il lato del *mittente* di un trasferimento una volta decifrata la transazione. Una chiave di visualizzazione **in entrata** si ferma di proposito prima: rileva e decifra le note in entrata ma non può ricostruire il collegamento in uscita. La derivazione tra queste capacità è a senso unico — la chiave in entrata è derivata *dalla* chiave completa, mai il contrario — ed è ciò che rende "solo in entrata" un vero declassamento e non una promessa. Il flag `use_qsk` di [ZIP 2005](https://zips.z.cash/zip-2005) cambia la derivazione stessa, quindi le chiavi quantisticamente recuperabili sono una famiglia di chiavi completamente diversa, non una variante di quella vecchia.

### Che aspetto ha la migrazione per chi osserva

Poiché la migrazione di [ZIP 318](https://zips.z.cash/zip-0318) è una serie randomizzata di piccole transazioni uniformi da Orchard a Ironwood, chi osserva e detiene la chiave vede una scalinata: molti passi di valore a taglio canonico anziché un solo balzo. Nessun singolo passo rivela il saldo totale in migrazione, ma il *pattern* è riconoscibile — ed è il compromesso inteso di un turnstile verificabile.

## Implicazioni pratiche

- **Per exchange e processori di pagamenti:** carica la chiave di visualizzazione in entrata dell'account (o la UFVK per una copertura completa) su un nodo di rilevamento e riconcilia automaticamente i depositi dei clienti, esattamente come faresti con un indirizzo trasparente — ma la chiave di spesa del cliente non lascia mai il cold storage.
- **Per revisori e proof of reserves:** una chiave di visualizzazione completa trasforma "fidati di noi" in "verifica questo": saldi e cronologia completa delle transazioni per gli account osservati, con zero capacità di toccarli. Abbinala alle [Divulgazioni dei pagamenti](/zcash-tech/payment-disclosures) per prove una tantum su un singolo pagamento.
- **Per la due diligence:** consegna alla controparte la chiave dell'account pertinente all'incarico, non l'intero portafoglio. Se la relazione finisce, ruota l'account.
- **Per la scelta degli strumenti:** Zallet esporta le UFVK e importa le chiavi di visualizzazione complete estese di Sapling; Zkool accetta chiavi unificate e legacy come account di sola osservazione. Consulta la pagina [Portafogli](/using-zcash/wallets) per l'attuale matrice di disponibilità Ironwood prima di standardizzare su un portafoglio.
- **Il costo della divulgazione è permanente:** ogni detentore in più di una chiave è una linea di credito sulla privacy permanente che non puoi chiudere. Rilascia chiavi una per relazione, delimitale a un solo account e documenta chi detiene cosa.

## Errori comuni

| Credenza comune | Come stanno realmente le cose |
| --- | --- |
| "Una chiave di visualizzazione può spendere i fondi se trapela." | Non può. Le chiavi di visualizzazione non portano con sé alcuna autorità di spesa; il peggio che può fare un leak è divulgare la cronologia. |
| "Posso revocare una chiave di visualizzazione in seguito." | Non puoi. Una chiave consegnata funziona finché i fondi non si spostano verso un account le cui chiavi l'altra parte non detiene. |
| "Esportare una UIVK per un solo indirizzo mostra soltanto quell'indirizzo." | Le chiavi di visualizzazione hanno l'account come ambito. Una UIVK mostra l'attività in entrata per ogni pool dell'account. |
| "`zcash-cli z_exportviewingkey` funziona ancora." | No. zcashd ha raggiunto l'arresto di fine supporto il 18 luglio 2026; usa invece `z_exportviewingkey` / `z_importviewingkey` di Zallet. |
| "Incollare una chiave di visualizzazione in uno strumento web è sicuro perché è in sola lettura." | La sola lettura significa comunque che l'intera tua cronologia delle transazioni per quell'account viene consegnata a chiunque gestisca il sito. Importa la chiave in un portafoglio che gestisci tu. |
| "Zallet può importare qualsiasi chiave di visualizzazione che Zallet possa esportare." | No. Zallet importa solo le chiavi di visualizzazione complete estese di Sapling; le chiavi unificate di `uview…` devono andare in portafogli che accettano le chiavi unificate, come Zkool. |

## Pagine correlate

- [Divulgazioni dei pagamenti](/zcash-tech/payment-disclosures) — provare dettagli selezionati di un singolo pagamento senza concedere l'accesso continuo a un account
- [Indirizzi unificati](/zcash-tech/unified-addresses) — il livello di indirizzi che porta i receiver delle chiavi di visualizzazione
- [Ironwood](/zcash-tech/ironwood) — la pool schermata NU6.3 in cui Orchard migra
- [Il turnstile](/zcash-tech/the-turnstile) — il meccanismo di migrazione da Orchard a Ironwood che chi osserva può seguire
- [Portafogli](/using-zcash/wallets) — l'elenco completo dei portafogli, del supporto delle chiavi di visualizzazione e della disponibilità Ironwood
- [Esportare la cronologia delle transazioni da una Viewing Key](/guides/viewing-key-transaction-export) — trasformare una chiave importata in un file di cronologia completo di txid/commissioni/memo

## Risorse

Usa le chiavi di visualizzazione in base alle necessità, e preferisci la chiave più ristretta che risponde alla domanda posta.

- [Divulgazioni dei pagamenti](/zcash-tech/payment-disclosures) - provare dettagli selezionati di un singolo pagamento senza concedere l'accesso continuo a un account
- [ZIP 326: conseguenze di NU6.3 per i portafogli](https://zips.z.cash/zip-0326) — come si comportano le chiavi di visualizzazione nelle pool Orchard e Ironwood
- [ZIP 229: formato delle transazioni versione 6](https://zips.z.cash/zip-0229) — definisce le pool Orchard e Ironwood
- [ZIP 310](https://zips.z.cash/zip-0310) — la specifica delle chiavi di visualizzazione
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — quale release ha aggiunto quale metodo RPC
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — tipi di account e di chiavi supportati
- [ECC, Spiegare le chiavi di visualizzazione](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgazione selettiva e chiavi di visualizzazione](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Presentazione video](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
