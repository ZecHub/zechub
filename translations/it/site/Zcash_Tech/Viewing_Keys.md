<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Chiavi di visualizzazione

Gli indirizzi schermati consentono di effettuare transazioni rivelando il meno possibile sulla blockchain di Zcash. Quindi cosa succede quando *devi* mostrare a una parte specifica ciò che possiedi o ciò che hai inviato? Ogni indirizzo schermato ha chiavi di visualizzazione che concedono l'accesso in lettura senza concedere la possibilità di spendere. Le chiavi di visualizzazione sono state introdotte in [ZIP 310](https://zips.z.cash/zip-0310) e aggiunte al protocollo nell'aggiornamento di rete Sapling.

Le chiavi di visualizzazione sono lo strumento per la divulgazione selettiva: scegli chi vede cosa e non cedi mai l'autorità di spesa per farlo.

## In breve

Una chiave di visualizzazione concede accesso **in sola lettura** all'attività di un indirizzo o account schermato di Zcash: chi la possiede può vedere le transazioni in entrata (e, per le Full Viewing Key, quelle in uscita), ma non può mai spendere.

- **Cos'è:** lo strumento di divulgazione selettiva delle pool schermate. Introdotto in [ZIP 310](https://zips.z.cash/zip-0310), aggiunto al protocollo con l'aggiornamento di rete Sapling.
- **Cosa consente:** il rilevamento dei depositi (chiavi in entrata `uivk…`) o la visibilità completa in entrata e in uscita di un account (chiavi di visualizzazione complete unificate `uview…`), oltre alle chiavi legacy Sapling `zxviews…`.
- **Cosa non consente:** l'autorità di spesa. Nulla di ciò che fa il titolare di una chiave di visualizzazione può spostare fondi.
- **Dove funziona oggi:** esportazione/importazione in [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) e account di sola visualizzazione in portafogli come Zkool; consulta la pagina [Wallets](/using-zcash/wallets) per la matrice di supporto aggiornata.
- **La regola pratica:** preferisci la chiave più limitata che risponda alla domanda posta e ricorda che una chiave condivisa non può essere revocata: puoi soltanto renderla obsoleta spostando i fondi.

---

## Perché usare le chiavi di visualizzazione?

Gli scritti di Electric Coin Company sull'argomento illustrano le situazioni che si presentano più spesso, e sono ancora oggi quelle comuni:

- **Un exchange che monitora i depositi.** L'exchange carica chiavi di visualizzazione in entrata su un nodo di rilevamento connesso a Internet, così da poter rilevare i depositi dei clienti verso un indirizzo schermato, mentre la chiave di spesa rimane su hardware che non entra mai in contatto con la rete.
- **Un custode che dimostra le proprie disponibilità.** Il custode fornisce a un revisore chiavi di visualizzazione complete per ciascun indirizzo schermato. Il revisore può controllare tali saldi e analizzare l'attività passata da e verso quegli indirizzi, ma non può fare altro.
- **Due diligence su una controparte.** Quando un exchange deve esaminare la cronologia schermata di un cliente nell'ambito di una due diligence rafforzata, può richiedere le chiavi di visualizzazione anziché i fondi.

## Cosa rivelano e cosa non rivelano le chiavi di visualizzazione

Esiste più di un tipo di chiave e la differenza determina quanto riveli.

| Chiave | Prefisso | Concede |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Visualizza le transazioni in entrata **e** in uscita per ogni pool dell'account |
| Unified incoming viewing key (UIVK) | `uivk…` | Visualizza solo le transazioni in entrata, per ogni pool dell'account |
| Sapling extended full viewing key | `zxviews…` | Visualizza l'attività Sapling in entrata e in uscita per gli indirizzi della chiave |

Nessuna di queste può spendere. Tutte sono permanenti nel senso che conta: una chiave che hai distribuito non può essere revocata, ma solo resa obsoleta trasferendo i fondi a un account le cui chiavi l'altra parte non possiede.

Ci sono due insidie di divulgazione che vale la pena conoscere prima di condividere qualunque cosa.

**In entrata non significa ristretto.** Le chiavi di visualizzazione unificate in entrata si riferiscono all'intero account, non al singolo indirizzo per cui ti sono state richieste. Esportare una UIVK per un singolo indirizzo Sapling concede comunque visibilità sulle entrate in ogni pool di quell'account, quindi rivela più dell'indirizzo che nomina. Il [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) lo dichiara esplicitamente.

**Un indirizzo pubblicato espone già le sue chiavi di visualizzazione in entrata a un futuro avversario.** [ZIP 326](https://zips.z.cash/zip-0326) osserva che un avversario dotato di un computer quantistico potrebbe recuperare le chiavi di visualizzazione in entrata da un indirizzo diversificato pubblicato, cosa fattibile in un modo in cui non lo è il recupero della chiave nullifier. Pubblicare un indirizzo non equivale oggi a pubblicare chiavi di visualizzazione, ma le due cose si avvicinano abbastanza su un orizzonte temporale sufficientemente lungo.

## Chiavi di visualizzazione dopo Ironwood

NU6.3 ha introdotto la pool schermata Ironwood e ha reso la pool Orchard esclusivamente destinata alla spesa, pertanto nel tempo i fondi migrano dall'una all'altra. Vedi [Ironwood](/zcash-tech/ironwood) e [Il turnstile](/zcash-tech/the-turnstile) per l'aggiornamento stesso.

**Le chiavi di visualizzazione emesse prima di Ironwood continuano a funzionare dopo la migrazione.** ZIP 326 specifica che un receiver, e le relative chiavi di visualizzazione in entrata, si riferiscono al *protocollo* Orchard anziché a una pool: le stesse chiavi di visualizzazione in entrata eseguono la decrittazione di prova dei ciphertext delle note sia della pool Orchard sia della pool Ironwood. Zallet lo implementa in questo modo, descrivendo le note Ironwood come aventi la forma di Orchard e sottoposte a decrittazione di prova con le chiavi di visualizzazione Orchard dell'account nel dominio di crittografia delle note Ironwood.

Tre conseguenze per chiunque detenga o emetta una chiave:

1. **I saldi si spostano tra le pool e chi visualizza le chiavi lo vede accadere.** [ZIP 318](https://zips.z.cash/zip-0318) specifica la migrazione come una serie di piccole transazioni Orchard-verso-Ironwood, deliberatamente uniformi, trasmesse secondo una pianificazione casuale; ciascuna spende una nota Orchard e produce un output Ironwood di una denominazione canonica. Un revisore che monitora con le chiavi di visualizzazione vede le disponibilità trasferirsi da una pool all'altra a tappe nell'arco di settimane, non in un unico spostamento. Un portafoglio può ricostruire il proprio avanzamento della migrazione dai dati della chain usando le proprie chiavi di visualizzazione.
2. **Ogni fase della migrazione rivela il valore che sposta.** Questo è intrinseco all'attraversamento di un turnstile (tornello) ed è ciò che rende la migrazione verificabile. Dividere il saldo in denominazioni canoniche significa che nessuna singola transazione rivela l'intero saldo della pool Orchard.
3. **Gli account creati dopo Ironwood possono derivare le loro chiavi diversamente.** [ZIP 2005](https://zips.z.cash/zip-2005) aggiunge un flag `use_qsk` per chiavi recuperabili quantisticamente e modifica il modo in cui vengono derivate le chiavi incoming, outgoing e diversifier, quindi le chiavi con `use_qsk = true` sono realmente chiavi diverse. ZIP 326 richiede che il flag sia uniforme in un account e vieta di generare chiavi con `use_qsk = true` prima dell'attivazione di NU6.3 su Mainnet. Una chiave esportata da un account esistente prima di Ironwood è quindi una chiave con `use_qsk = false` e rimane corretta per quell'account. Non presumere che una chiave esportata da un account descriva un altro account.

## Esportare le chiavi di visualizzazione

### Zallet

[Zallet](https://github.com/zcash/zallet) è il portafoglio full node (nodo completo) che ha sostituito il portafoglio integrato in zcashd. L'esportazione e l'importazione delle chiavi di visualizzazione sono arrivate nella **v0.1.0-beta.2 (28 luglio 2026)**, quindi controlla prima la tua versione; le build precedenti non dispongono di questi metodi. Ogni argomento dopo il nome del metodo deve essere JSON valido, il che significa che i valori stringa mantengono le proprie virgolette doppie. La [Guida rapida di riferimento di Zallet](/using-zcash/zallet-quick-reference-guide) tratta lo stile generale dei comandi.

Elenca ciò che il portafoglio contiene:

```bash
zallet rpc listaddresses
```

Esporta le chiavi di visualizzazione complete unificate dell'account passando un indirizzo unificato:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Esporta invece le chiavi di visualizzazione unificate in entrata dell'account, usando l'argomento opzionale `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Passare un indirizzo Sapling restituisce le chiavi di visualizzazione complete estese Sapling di quell'account (`zxviews…`), corrispondenti al precedente comportamento di zcashd. Due limiti documentati: gli indirizzi Sprout vengono rifiutati e le chiavi di visualizzazione complete estese Sapling non possono essere esportate da un account che sia stato a sua volta importato come solo visualizzazione, perché il portafoglio non può ricostruirle. La forma `ivk` funziona invece per gli account importati come solo visualizzazione.

### Portafogli che esportano chiavi di visualizzazione dalla propria interfaccia

La pagina [Portafogli](/using-zcash/wallets) tiene traccia del supporto alle chiavi di visualizzazione e della compatibilità con Ironwood per ciascun portafoglio. Al momento della stesura, i portafogli che indicano sia il supporto alle chiavi di visualizzazione sia **Ironwood: Ready** includono ZODL, Zingo!, Zkool, Cake, Zallet, zecd e Nozy. Consulta quella pagina anziché questa prima di affidarti a un singolo portafoglio, perché lo stato di compatibilità cambia.

## Importare le chiavi di visualizzazione come account solo visualizzazione

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) è qui l'opzione più flessibile, perché accetta sia chiavi unificate sia quelle legacy. Il suo README documenta account solo visualizzazione creati da **chiavi di visualizzazione unificate** o da **chiavi di visualizzazione estese Sapling**, insieme alle chiavi estese schermate legacy esportate da zcashd. Aggiungi un nuovo account, scegli il percorso solo visualizzazione e incolla la chiave `uview…` o `zxviews…`; l'account si sincronizza quindi e riporta saldi e cronologia senza autorità di spesa.

Il supporto del protocollo Ironwood e la migrazione Orchard-verso-Ironwood sono arrivati in Zkool 6.24.0 (20 luglio 2026), e la 6.26.1 (2 agosto 2026) ha corretto il rilevamento delle transazioni Ironwood nella mempool. Usa la 6.26.1 o una versione successiva.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Il secondo argomento è la politica di riesecuzione della scansione: `"whenkeyisnew"` (predefinita), `"yes"` o `"no"`. Il terzo è l'altezza del blocco da cui rieseguire la scansione. Zallet importa la chiave come account view-only e traccia le transazioni in entrata e in uscita per i suoi indirizzi senza autorità di spesa.

**Zallet importa solo chiavi di visualizzazione complete estese Sapling.** Non importerà chiavi di visualizzazione complete unificate `uview…`, anche se può esportarne una. Per concedere accesso in lettura a un intero account unificato, esporta la UFVK da Zallet e importala in un portafoglio che accetta chiavi unificate, come Zkool.

Per trasformare una chiave importata in un file completo della cronologia delle transazioni, con txid, commissioni e memo, vedi [Esportare la cronologia delle transazioni da una Viewing Key](/guides/viewing-key-transaction-export).

## Cosa è cambiato e cosa smettere di cercare

Se hai seguito una versione precedente di questa pagina, o una sua traduzione, tre percorsi non funzionano più.

- **`zcash-cli z_exportviewingkey` e `z_importviewingkey`.** zcashd ha raggiunto l'interruzione del supporto il 18 luglio 2026 e non è più in esecuzione. I metodi con lo stesso nome di Zallet sono il sostituto; vedi la [guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **La guida pratica di Ywallet.** La pagina Portafogli contrassegna Ywallet come **Ironwood: Not Ready**, quindi non è il portafoglio a cui indirizzare le persone per le chiavi di visualizzazione dell'era Ironwood. Zkool, dello stesso sviluppatore, accetta la stessa gamma di chiavi ed è contrassegnato come Ready.
- **zcashblockexplorer.com/vk.** Il servizio restituisce HTTP 503 con un certificato non valido ed è stato rimosso anziché sostituito. Incollare le chiavi di visualizzazione in un sito web consegna l'intera cronologia delle tue transazioni a chi gestisce quel sito web, che è sempre stata la più debole delle tre opzioni nella vecchia pagina. Importa invece la chiave in un portafoglio che gestisci tu.

## Elemento visivo / Analogia

### La finestra dell'auditor

Pensa a un account schermato come a una sala delle cassette di sicurezza in una banca:

- Le **chiavi di spesa** sono la chiave della stanza. Chi le possiede può aprire le scatole e prenderne il contenuto.
- Le **chiavi di visualizzazione** sono la finestra dell'auditor su quella stanza. L'auditor può osservare ogni scatola entrare e uscire, leggere le etichette e tenere un registro, ma la finestra non ha maniglia. La persona che guarda attraverso di essa non può spostare nulla all'interno della stanza.

### Ciò che la finestra non può mostrare

La finestra si affaccia sulla stanza, non sul mondo esterno. Mostra l'attività schermata dell'account osservato; non trasforma l'osservatore in un osservatore dell'intera blockchain e non gli permette di correlare l'attività dell'account con la cronologia non schermata di chiunque altro. E poiché la finestra è installata a livello di account, dare a qualcuno uno spioncino per una cassetta di sicurezza (un singolo indirizzo) gli offre comunque la visuale completa degli ingressi della stanza, ed è proprio per questo che esiste la regola della chiave più restrittiva.

### Perché non puoi riavere la finestra

Una chiave di visualizzazione è un'informazione, non un'autorizzazione. Una volta copiata, esiste finché i fondi non lasciano l'account che osserva. La soluzione pratica è la rotazione: sposta i saldi in un nuovo account le cui chiavi l'altra parte non ha mai ricevuto, e la vecchia finestra si affaccia su una stanza vuota.

## Approfondimento

### Decifratura di prova: come funziona davvero la visualizzazione

Ogni transazione schermata cripta i plaintext delle sue note per il destinatario previsto. Un portafoglio che detiene chiavi di visualizzazione esegue la **decrittazione di prova**: per ogni transazione che trova sulla chain, tenta di decrittare i ciphertext delle note con la chiave. I successi rivelano il valore della nota, il diversificatore del destinatario e il memo; i fallimenti non hanno alcun costo. Ecco perché la stessa chiave di visualizzazione in entrata continua a funzionare nelle pool Orchard e Ironwood: [ZIP 326](https://zips.z.cash/zip-0326) vincola un receiver al *protocollo* Orchard, quindi i ciphertext delle note Ironwood hanno la forma di Orchard e vengono sottoposti a decrittazione di prova con le chiavi di visualizzazione dell'account Orchard nel dominio di crittografia delle note Ironwood.

### Completa o in entrata: cosa decide la derivazione

Una chiave di visualizzazione **completa** può derivare la capacità di visualizzazione in uscita, che consente a un revisore di ricostruire il lato del *mittente* di un trasferimento una volta decifrata la transazione. Una chiave di visualizzazione **in entrata** si ferma deliberatamente prima: rileva e decifra le note in entrata, ma non può ricostruire il collegamento in uscita. La derivazione tra queste capacità è unidirezionale — la chiave in entrata viene derivata *dalla* chiave completa, mai il contrario — ed è questo che rende "solo in entrata" un downgrade reale anziché una promessa. Il flag `use_qsk` di [ZIP 2005](https://zips.z.cash/zip-2005) modifica la derivazione stessa, quindi le chiavi recuperabili con computer quantistici appartengono a una famiglia di chiavi completamente diversa, non sono una variante di quella precedente.

### Come appare la migrazione a un osservatore

Poiché la migrazione [ZIP 318](https://zips.z.cash/zip-0318) è una serie casuale di piccole transazioni uniformi da Orchard a Ironwood, chi possiede la chiave vede una scala: molti gradini di valore con denominazione canonica anziché un unico salto. Nessun singolo gradino rivela il saldo totale in migrazione, ma il *modello* è riconoscibile — ed è questo il compromesso previsto di un turnstile verificabile.

## Implicazioni pratiche

- **Per exchange e processori di pagamento:** carica le chiavi di visualizzazione in entrata dell'account (o un UFVK per una copertura completa) su un nodo di rilevamento e riconcilia automaticamente i depositi dei clienti, esattamente come faresti con un indirizzo trasparente, ma le chiavi di spesa del cliente non lasciano mai il cold storage.
- **Per revisori e prove delle riserve:** una chiave di visualizzazione completa trasforma "fidati di noi" in "verifica questo": saldi e cronologia completa delle transazioni degli account monitorati, senza alcuna possibilità di interagirvi. Combinala con le [divulgazioni dei pagamenti](/zcash-tech/payment-disclosures) per prove una tantum relative a un singolo pagamento.
- **Per la due diligence:** fornisci a una controparte la chiave dell'account pertinente all'incarico, non dell'intero tuo portafoglio. Se il rapporto termina, ruota l'account.
- **Per la scelta degli strumenti:** Zallet esporta UFVK e importa chiavi di visualizzazione complete estese Sapling; Zkool accetta chiavi unificate e legacy come account watch-only. Consulta la pagina [Portafogli](/using-zcash/wallets) per la matrice aggiornata di prontezza di Ironwood prima di standardizzare su un portafoglio.
- **Il costo della divulgazione è permanente:** ogni ulteriore detentore di una chiave è una linea di credito per la privacy permanente che non puoi chiudere. Emetti chiavi per ogni rapporto, limitale a un singolo account e documenta chi detiene cosa.

## Errori comuni

| Credenza comune | Cosa accade realmente |
| --- | --- |
| "Una chiave di visualizzazione può spendere i fondi se viene divulgata." | Non può farlo. Le chiavi di visualizzazione non conferiscono alcuna autorità di spesa; nel peggiore dei casi, una divulgazione rivela la cronologia. |
| "Posso revocare una chiave di visualizzazione in seguito." | Non puoi farlo. Una chiave condivisa continua a funzionare finché i fondi non vengono spostati in un account le cui chiavi non sono possedute dall'altra parte. |
| "Esportare una UIVK per un solo indirizzo mostra soltanto quell'indirizzo." | Le chiavi di visualizzazione sono limitate all'account. Una UIVK mostra l'attività in entrata per ogni pool dell'account. |
| "`zcash-cli z_exportviewingkey` funziona ancora." | No. zcashd ha raggiunto l'interruzione del supporto il 18 luglio 2026; usa invece `z_exportviewingkey` / `z_importviewingkey` di Zallet. |
| "Incollare una chiave di visualizzazione in uno strumento web è sicuro perché è in sola lettura." | La sola lettura significa comunque consegnare l'intera cronologia delle transazioni di quell'account a chiunque gestisca il sito. Importa la chiave in un portafoglio che gestisci tu. |
| "Zallet può importare qualsiasi chiave di visualizzazione che Zallet può esportare." | No. Zallet importa solo chiavi di visualizzazione complete estese Sapling; le chiavi `uview…` unificate devono essere importate in portafogli che accettano chiavi unificate, come Zkool. |

## Pagine correlate

- [Divulgazione dei pagamenti](/zcash-tech/payment-disclosures) — dimostrare dettagli selezionati di un pagamento senza concedere accesso continuo a un account
- [Indirizzi unificati](/zcash-tech/unified-addresses) — il livello degli indirizzi che include ricevitori con chiavi di visualizzazione
- [Ironwood](/zcash-tech/ironwood) — la pool schermata NU6.3 verso cui Orchard migra
- [Il turnstile (tornello)](/zcash-tech/the-turnstile) — il meccanismo di migrazione da Orchard a Ironwood che gli osservatori possono seguire
- [Portafogli](/using-zcash/wallets) — la directory completa dei portafogli, del supporto per le chiavi di visualizzazione e della compatibilità con Ironwood
- [Esportare la cronologia delle transazioni da Viewing Key](/guides/viewing-key-transaction-export) — trasformare una chiave importata in un file completo della cronologia di txid/commissione/memo

## Risorse

Usa le chiavi di visualizzazione quando necessario e preferisci la chiave più limitata che risponda alla domanda posta.

- [Divulgazioni di pagamento](/zcash-tech/payment-disclosures) - dimostrare dettagli selezionati di un pagamento senza concedere accesso continuativo a un account
- [ZIP 326: NU6.3 Conseguenze per i portafogli](https://zips.z.cash/zip-0326) — come si comportano le chiavi di visualizzazione nelle pool Orchard e Ironwood
- [ZIP 229: formato delle transazioni versione 6](https://zips.z.cash/zip-0229) — definisce le pool Orchard e Ironwood
- [ZIP 310](https://zips.z.cash/zip-0310) — specifica delle chiavi di visualizzazione
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — quale release ha aggiunto quale metodo RPC
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — tipi di account e chiavi supportati
- [ECC, Spiegazione delle Viewing Key](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgazione selettiva e Viewing Key](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Presentazione video](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
