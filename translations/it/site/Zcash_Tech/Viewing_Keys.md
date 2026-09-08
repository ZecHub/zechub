<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Gli indirizzi shielded ti permettono di effettuare transazioni rivelando il meno possibile sulla blockchain di Zcash. Quindi cosa succede quando *hai* bisogno di mostrare a una parte specifica ciò che possiedi, o ciò che hai inviato? Ogni indirizzo shielded ha una viewing key che concede accesso in lettura senza concedere la possibilità di spendere. Le viewing keys sono state introdotte in [ZIP 310](https://zips.z.cash/zip-0310) e aggiunte al protocollo nel network upgrade Sapling.

Una viewing key è lo strumento per la divulgazione selettiva: scegli tu chi vede cosa, e non consegni mai l'autorità di spesa per farlo.

## Perché usare una viewing key?

Gli scritti di Electric Coin Company sull'argomento espongono le situazioni che si presentano più spesso, e sono ancora oggi quelle più comuni:

- **Un exchange che monitora i depositi.** L'exchange carica una incoming viewing key su un nodo di rilevamento esposto a internet così da poter notare i depositi dei clienti verso un indirizzo shielded, mentre la spending key resta su hardware che non tocca mai la rete.
- **Un custode che dimostra i propri fondi.** Il custode consegna a un revisore una full viewing key per ogni indirizzo shielded. Il revisore può controllare quei saldi e verificare l'attività passata da e verso quegli indirizzi, e non può fare altro.
- **Due diligence su una controparte.** Quando un exchange deve esaminare la cronologia shielded di un cliente nell'ambito di una due diligence rafforzata, può chiedere la viewing key invece dei fondi.

## Cosa una viewing key rivela e cosa non rivela

Esiste più di un tipo di chiave, e la differenza determina quanto riveli.

| Key | Prefix | Grants |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Vede le transazioni in entrata **e** in uscita per ogni pool dell'account |
| Unified incoming viewing key (UIVK) | `uivk…` | Vede solo le transazioni in entrata, per ogni pool dell'account |
| Sapling extended full viewing key | `zxviews…` | Vede l'attività Sapling in entrata e in uscita per gli indirizzi della chiave |

Nessuna di queste può spendere. Tutte sono permanenti nel senso che conta: una chiave che hai distribuito non può essere revocata, ma solo superata, spostando i fondi verso un account le cui chiavi l'altra parte non possiede.

Ci sono due trappole di divulgazione che vale la pena conoscere prima di condividere qualunque cosa.

**Incoming non significa ristretto.** Una unified incoming viewing key è limitata all'intero account, non al singolo indirizzo di cui ti è stato chiesto. Esportare una UIVK per un singolo indirizzo Sapling concede comunque visibilità in entrata su ogni pool di quell'account, quindi divulga più di quanto indichi l'indirizzo stesso. Lo [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) lo afferma esplicitamente.

**Un indirizzo pubblicato espone già la sua incoming viewing key a un avversario futuro.** [ZIP 326](https://zips.z.cash/zip-0326) osserva che un avversario con un computer quantistico potrebbe ricavare la incoming viewing key da un indirizzo diversificato pubblicato, cosa fattibile in un modo in cui il recupero della nullifier key non lo è. Pubblicare un indirizzo non equivale a pubblicare una viewing key oggi, ma le due cose diventano più vicine su un orizzonte temporale sufficientemente lungo.

## Viewing keys dopo Ironwood

NU6.3 ha introdotto il pool shielded Ironwood e ha reso il pool Orchard solo di spesa, quindi nel tempo i fondi migrano dall'uno all'altro. Vedi [Ironwood](/zcash-tech/ironwood) e [The turnstile](/zcash-tech/the-turnstile) per l'upgrade in sé.

**Una viewing key emessa prima di Ironwood continua a funzionare dopo la migrazione.** ZIP 326 specifica che un receiver, e la sua corrispondente incoming viewing key, è riferito al *protocollo* Orchard piuttosto che a un pool: la stessa incoming viewing key effettua la decrittazione di prova sia dei ciphertext delle note del pool Orchard sia di quelli del pool Ironwood. Zallet lo implementa in questo modo, descrivendo le note Ironwood come aventi forma Orchard e sottoposte a trial-decryption con le viewing keys Orchard dell'account nel dominio di note-encryption Ironwood.

Tre conseguenze per chiunque possieda o rilasci una chiave:

1. **I saldi si spostano tra i pool, e chi osserva lo vede accadere.** [ZIP 318](https://zips.z.cash/zip-0318) specifica la migrazione come una serie di piccole transazioni Orchard-to-Ironwood, volutamente uniformi, trasmesse secondo una pianificazione casuale, ciascuna delle quali spende una nota Orchard e produce un output Ironwood di una denominazione canonica. Un revisore che osserva con una viewing key vede i fondi spostarsi da un pool all'altro a tappe nel corso di settimane, non in un unico movimento. Un wallet può ricostruire il proprio avanzamento della migrazione dai dati on-chain usando le proprie viewing keys.
2. **Ogni fase della migrazione rivela il valore che sposta.** Questo è intrinseco all'attraversamento di un turnstile, ed è ciò che rende la migrazione verificabile. Suddividere il saldo in denominazioni canoniche significa che nessuna singola transazione rivela l'intero saldo del pool Orchard.
3. **Gli account creati dopo Ironwood possono derivare le proprie chiavi in modo diverso.** [ZIP 2005](https://zips.z.cash/zip-2005) aggiunge un flag `use_qsk` per chiavi quantum-recoverable, e cambia il modo in cui vengono derivate le chiavi incoming, outgoing e diversifier, quindi le chiavi `use_qsk = true` sono davvero chiavi diverse. ZIP 326 richiede che il flag sia uniforme all'interno di un account e vieta di generare chiavi `use_qsk = true` prima che NU6.3 si attivasse su Mainnet. Una chiave esportata da un account che esisteva prima di Ironwood è quindi una chiave `use_qsk = false`, e resta corretta per quell'account. Non presumere che una chiave esportata da un account descriva anche un altro account.

## Esportare una viewing key

### Zallet

[Zallet](https://github.com/zcash/zallet) è il wallet full-node che ha sostituito il wallet all'interno di zcashd. L'esportazione e l'importazione di viewing key sono arrivate nella **v0.1.0-beta.2 (28 luglio 2026)**, quindi controlla prima la tua versione; le build precedenti non hanno questi metodi. Ogni argomento dopo il nome del metodo deve essere JSON valido, il che significa che i valori stringa mantengono le proprie virgolette doppie. La [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) copre lo stile generale dei comandi.

Elenca cosa contiene il wallet:

```bash
zallet rpc listaddresses
```

Esporta la unified full viewing key dell'account passando un Unified Address:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Esporta invece la unified incoming viewing key dell'account, usando l'argomento opzionale `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Passare un indirizzo Sapling restituisce la Sapling extended full viewing key (`zxviews…`) di quell'account, in linea con il vecchio comportamento di zcashd. Due limiti documentati: gli indirizzi Sprout vengono rifiutati e una Sapling extended full viewing key non può essere esportata da un account che è stato esso stesso importato come view-only, perché il wallet non può ricostruirla. La forma `ivk` invece funziona per gli account view-only importati.

### Wallet che esportano viewing keys dalla propria interfaccia

La pagina [Wallets](/using-zcash/wallets) tiene traccia del supporto alle viewing keys e della prontezza a Ironwood per ciascun wallet. Al momento in cui scriviamo, i wallet che elencano sia il supporto alle viewing keys sia **Ironwood: Ready** includono ZODL, Zingo!, Zkool, Cake, Zallet, Zecd e Nozy. Controlla quella pagina invece di questa prima di fare affidamento su un singolo wallet, perché lo stato di prontezza cambia.

## Importare una viewing key come account watch-only

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) è l'opzione più flessibile qui, perché accetta chiavi unificate oltre a quelle legacy. Il suo README documenta account view-only creati da una **unified viewing key** o da una **Sapling extended viewing key**, insieme alle legacy shielded extended keys esportate da zcashd. Aggiungi un nuovo account, scegli il percorso view-only e incolla la chiave `uview…` o `zxviews…`; l'account poi si sincronizza e riporta saldi e cronologia senza autorità di spesa.

Il supporto al protocollo Ironwood e la migrazione Orchard-to-Ironwood sono arrivati in Zkool 6.24.0 (20 luglio 2026), e la 6.26.1 (2 agosto 2026) ha corretto il rilevamento delle transazioni Ironwood nel mempool. Usa la 6.26.1 o una versione successiva.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Il secondo argomento è la policy di rescan: `"whenkeyisnew"` (predefinita), `"yes"` o `"no"`. Il terzo è l'altezza del blocco da cui rieseguire la scansione. Zallet importa la chiave come account view-only e tiene traccia delle transazioni in entrata e in uscita per i suoi indirizzi senza autorità di spesa.

**Zallet importa solo Sapling extended full viewing keys.** Non importerà una unified full viewing key `uview…`, anche se può esportarne una. Per consegnare accesso in lettura a un intero account unificato, esporta la UFVK da Zallet e importala in un wallet che accetta chiavi unificate, come Zkool.

## Cosa è cambiato e cosa smettere di cercare

Se hai seguito una versione più vecchia di questa pagina, o una sua traduzione, tre percorsi non funzionano più.

- **`zcash-cli z_exportviewingkey` e `z_importviewingkey`.** zcashd ha raggiunto il suo arresto di fine supporto il 18 luglio 2026 e non viene più eseguito. I metodi di Zallet con lo stesso nome sono il sostituto; vedi la [guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **La guida di Ywallet.** La pagina Wallets indica Ywallet come **Ironwood: Not Ready**, quindi non è il wallet da indicare alle persone per le viewing keys nell'era Ironwood. Zkool, dello stesso sviluppatore, accetta la stessa gamma di chiavi ed è indicato come Ready.
- **zcashblockexplorer.com/vk.** Il servizio restituisce HTTP 503 con un certificato non valido, ed è stato rimosso anziché sostituito. Incollare una viewing key in un sito web consegna la tua intera cronologia delle transazioni a chiunque gestisca quel sito web, cosa che era sempre la più debole delle tre opzioni nella vecchia pagina. Importa invece la chiave in un wallet che esegui tu.

## Risorse

Usa le viewing keys solo quando necessario, e preferisci la chiave più ristretta che risponda alla domanda posta.

- [ZIP 326: Conseguenze di NU6.3 per i wallet](https://zips.z.cash/zip-0326) — come si comportano le viewing keys tra i pool Orchard e Ironwood
- [ZIP 229: Formato della transazione versione 6](https://zips.z.cash/zip-0229) — definisce i pool Orchard e Ironwood
- [changelog di Zallet](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — quale release ha aggiunto quale metodo RPC
- [README di Zkool](https://github.com/hhanh00/zkool2/blob/main/README.md) — tipi di account e chiavi supportati
- [ECC, Spiegazione delle Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgazione Selettiva e Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Presentazione video della Viewing Key di Zcash](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
