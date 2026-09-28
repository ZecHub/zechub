<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Viewing Key

Gli indirizzi schermati consentono di effettuare transazioni rivelando il meno possibile sulla blockchain di Zcash. Quindi cosa succede quando *devi* mostrare a una parte specifica ciò che possiedi o ciò che hai inviato? Ogni indirizzo schermato ha una viewing key che concede l'accesso in lettura senza concedere la possibilità di spendere. Le viewing key sono state introdotte in [ZIP 310](https://zips.z.cash/zip-0310) e aggiunte al protocollo nell'aggiornamento di rete Sapling.

Una viewing key è lo strumento per la divulgazione selettiva: scegli chi vede cosa e non cedi mai l'autorità di spesa per farlo.

## Perché usare una viewing key?

Gli scritti di Electric Coin Company sull'argomento illustrano le situazioni che si presentano più spesso, e sono ancora oggi quelle comuni:

- **Un exchange che monitora i depositi.** L'exchange carica una incoming viewing key su un nodo di rilevamento connesso a Internet, così da poter rilevare i depositi dei clienti verso un indirizzo schermato, mentre la chiave di spesa rimane su hardware che non entra mai in contatto con la rete.
- **Un custode che dimostra le proprie disponibilità.** Il custode fornisce a un revisore una full viewing key per ciascun indirizzo schermato. Il revisore può controllare tali saldi e analizzare l'attività passata da e verso quegli indirizzi, ma non può fare altro.
- **Due diligence su una controparte.** Quando un exchange deve esaminare la cronologia schermata di un cliente nell'ambito di una due diligence rafforzata, può richiedere la viewing key anziché i fondi.

## Cosa rivela e cosa non rivela una viewing key

Esiste più di un tipo di chiave e la differenza determina quanto riveli.

| Chiave | Prefisso | Concede |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Visualizza le transazioni in entrata **e** in uscita per ogni pool dell'account |
| Unified incoming viewing key (UIVK) | `uivk…` | Visualizza solo le transazioni in entrata, per ogni pool dell'account |
| Sapling extended full viewing key | `zxviews…` | Visualizza l'attività Sapling in entrata e in uscita per gli indirizzi della chiave |

Nessuna di queste può spendere. Tutte sono permanenti nel senso che conta: una chiave che hai distribuito non può essere revocata, ma solo resa obsoleta trasferendo i fondi a un account le cui chiavi l'altra parte non possiede.

Ci sono due insidie di divulgazione che vale la pena conoscere prima di condividere qualunque cosa.

**Incoming non significa ristretto.** Una unified incoming viewing key è riferita all'intero account, non al singolo indirizzo per cui ti è stata richiesta. Esportare una UIVK per un singolo indirizzo Sapling concede comunque visibilità sulle entrate in ogni pool di quell'account, quindi rivela più dell'indirizzo che nomina. Il [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) lo dichiara esplicitamente.

**Un indirizzo pubblicato espone già la sua incoming viewing key a un futuro avversario.** [ZIP 326](https://zips.z.cash/zip-0326) osserva che un avversario dotato di un computer quantistico potrebbe recuperare la incoming viewing key da un indirizzo diversificato pubblicato, cosa fattibile in un modo in cui non lo è il recupero della nullifier key. Pubblicare un indirizzo non equivale oggi a pubblicare una viewing key, ma le due cose si avvicinano abbastanza su un orizzonte temporale sufficientemente lungo.

## Viewing key dopo Ironwood

NU6.3 ha introdotto il pool schermato Ironwood e ha reso il pool Orchard esclusivamente destinato alla spesa, pertanto nel tempo i fondi migrano dall'uno all'altro. Vedi [Ironwood](/zcash-tech/ironwood) e [Il tornello](/zcash-tech/the-turnstile) per l'aggiornamento stesso.

**Una viewing key emessa prima di Ironwood continua a funzionare dopo la migrazione.** ZIP 326 specifica che un receiver, e la relativa incoming viewing key, è riferito al *protocollo* Orchard anziché a un pool: la stessa incoming viewing key esegue la decrittazione di prova dei ciphertext delle note sia del pool Orchard sia del pool Ironwood. Zallet lo implementa in questo modo, descrivendo le note Ironwood come aventi la forma di Orchard e sottoposte a decrittazione di prova con le viewing key Orchard dell'account nel dominio di cifratura delle note Ironwood.

Tre conseguenze per chiunque detenga o emetta una chiave:

1. **I saldi si spostano tra pool e chi visualizza la chiave lo vede accadere.** [ZIP 318](https://zips.z.cash/zip-0318) specifica la migrazione come una serie di piccole transazioni Orchard-verso-Ironwood, deliberatamente uniformi, trasmesse secondo una pianificazione casuale; ciascuna spende una nota Orchard e produce un output Ironwood di una denominazione canonica. Un revisore che monitora con una viewing key vede le disponibilità trasferirsi da un pool all'altro a tappe nell'arco di settimane, non in un unico spostamento. Un wallet può ricostruire il proprio avanzamento della migrazione dai dati della catena usando le proprie viewing key.
2. **Ogni fase della migrazione rivela il valore che sposta.** Questo è intrinseco all'attraversamento di un tornello ed è ciò che rende la migrazione verificabile. Dividere il saldo in denominazioni canoniche significa che nessuna singola transazione rivela l'intero saldo del pool Orchard.
3. **Gli account creati dopo Ironwood possono derivare le loro chiavi diversamente.** [ZIP 2005](https://zips.z.cash/zip-2005) aggiunge un flag `use_qsk` per chiavi recuperabili quantisticamente e modifica il modo in cui vengono derivate le chiavi incoming, outgoing e diversifier, quindi le chiavi con `use_qsk = true` sono realmente chiavi diverse. ZIP 326 richiede che il flag sia uniforme in un account e vieta di generare chiavi con `use_qsk = true` prima dell'attivazione di NU6.3 su Mainnet. Una chiave esportata da un account esistente prima di Ironwood è quindi una chiave con `use_qsk = false` e rimane corretta per quell'account. Non presumere che una chiave esportata da un account descriva un altro account.

## Esportare una viewing key

### Zallet

[Zallet](https://github.com/zcash/zallet) è il wallet full-node che ha sostituito il wallet integrato in zcashd. L'esportazione e l'importazione di viewing key sono arrivate nella **v0.1.0-beta.2 (28 luglio 2026)**, quindi controlla prima la tua versione; le build precedenti non dispongono di questi metodi. Ogni argomento dopo il nome del metodo deve essere JSON valido, il che significa che i valori stringa mantengono le proprie virgolette doppie. La [Guida rapida di riferimento di Zallet](/using-zcash/zallet-quick-reference-guide) tratta lo stile generale dei comandi.

Elenca ciò che il wallet contiene:

```bash
zallet rpc listaddresses
```

Esporta la unified full viewing key dell'account passando un indirizzo unificato:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Esporta invece la unified incoming viewing key dell'account, usando l'argomento opzionale `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Passare un indirizzo Sapling restituisce la Sapling extended full viewing key di quell'account (`zxviews…`), corrispondente al precedente comportamento di zcashd. Due limiti documentati: gli indirizzi Sprout vengono rifiutati e una Sapling extended full viewing key non può essere esportata da un account che sia stato a sua volta importato come view-only, perché il wallet non può ricostruirla. La forma `ivk` funziona invece per gli account view-only importati.

### Wallet che esportano viewing key dalla propria interfaccia

La pagina [Wallet](/using-zcash/wallets) tiene traccia del supporto alle viewing key e della compatibilità con Ironwood per ciascun wallet. Al momento della stesura, i wallet che indicano sia il supporto alle viewing key sia **Ironwood: Ready** includono ZODL, Zingo!, Zkool, Cake, Zallet, Zecd e Nozy. Consulta quella pagina anziché questa prima di affidarti a un singolo wallet, perché lo stato di compatibilità cambia.

## Importare una viewing key come account watch-only

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) è qui l'opzione più flessibile, perché accetta sia chiavi unificate sia quelle legacy. Il suo README documenta account view-only creati da una **unified viewing key** o da una **Sapling extended viewing key**, insieme alle chiavi estese schermate legacy esportate da zcashd. Aggiungi un nuovo account, scegli il percorso view-only e incolla la chiave `uview…` o `zxviews…`; l'account si sincronizza quindi e riporta saldi e cronologia senza autorità di spesa.

Il supporto del protocollo Ironwood e la migrazione Orchard-verso-Ironwood sono arrivati in Zkool 6.24.0 (20 luglio 2026), e la 6.26.1 (2 agosto 2026) ha corretto il rilevamento delle transazioni Ironwood nella mempool. Usa la 6.26.1 o una versione successiva.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Il secondo argomento è la politica di riesecuzione della scansione: `"whenkeyisnew"` (predefinita), `"yes"` o `"no"`. Il terzo è l'altezza del blocco da cui rieseguire la scansione. Zallet importa la chiave come account view-only e traccia le transazioni in entrata e in uscita per i suoi indirizzi senza autorità di spesa.

**Zallet importa solo Sapling extended full viewing key.** Non importerà una unified full viewing key `uview…`, anche se può esportarne una. Per concedere accesso in lettura a un intero account unificato, esporta la UFVK da Zallet e importala in un wallet che accetta chiavi unificate, come Zkool.

Per trasformare una chiave importata in un file completo della cronologia delle transazioni, con txid, commissioni e memo, vedi [Esportare la cronologia delle transazioni da una viewing key](/guides/viewing-key-transaction-export).

## Cosa è cambiato e cosa smettere di cercare

Se hai seguito una versione precedente di questa pagina, o una sua traduzione, tre percorsi non funzionano più.

- **`zcash-cli z_exportviewingkey` e `z_importviewingkey`.** zcashd ha raggiunto l'interruzione del supporto il 18 luglio 2026 e non è più in esecuzione. I metodi con lo stesso nome di Zallet sono il sostituto; vedi la [guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **La guida pratica di Ywallet.** La pagina Wallet contrassegna Ywallet come **Ironwood: Not Ready**, quindi non è il wallet a cui indirizzare le persone per le viewing key dell'era Ironwood. Zkool, dello stesso sviluppatore, accetta la stessa gamma di chiavi ed è contrassegnato come Ready.
- **zcashblockexplorer.com/vk.** Il servizio restituisce HTTP 503 con un certificato non valido ed è stato rimosso anziché sostituito. Incollare una viewing key in un sito web consegna l'intera cronologia delle tue transazioni a chi gestisce quel sito web, che è sempre stata la più debole delle tre opzioni nella vecchia pagina. Importa invece la chiave in un wallet che gestisci tu.

## Risorse

Usa le viewing key quando necessario e preferisci la chiave più limitata che risponda alla domanda posta.

- [Divulgazioni relative ai pagamenti](/zcash-tech/payment-disclosures) - dimostrare dettagli selezionati di un pagamento senza concedere accesso continuativo a un account
- [ZIP 326: conseguenze di NU6.3 per i wallet](https://zips.z.cash/zip-0326) — come si comportano le viewing key tra i pool Orchard e Ironwood
- [ZIP 229: formato delle transazioni versione 6](https://zips.z.cash/zip-0229) — definisce i pool Orchard e Ironwood
- [Registro delle modifiche di Zallet](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — quale release ha aggiunto quale metodo RPC
- [README di Zkool](https://github.com/hhanh00/zkool2/blob/main/README.md) — tipi di account e chiavi supportati
- [ECC, spiegazione delle Viewing Key](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, divulgazione selettiva e Viewing Key](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, presentazione video sulle Viewing Key di ZcashViewing Key](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
