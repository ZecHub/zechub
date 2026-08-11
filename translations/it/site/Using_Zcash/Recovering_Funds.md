---
<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Recupero dei fondi del wallet Zcash

**Perché conservare la tua chiave privata?**

Le chiavi private sono il segreto della sicurezza dei tuoi asset digitali. Custodirle al sicuro e non condividerle mai con terze parti è essenziale.

> In questo contesto, una **Seed Phrase** può essere considerata l'equivalente di una chiave privata.

Mantenendo il controllo delle tue chiavi private, il processo di recupero è sempre possibile. Esistono 2 tipi di chiavi private Zcash (trasparenti e shielded), che puoi importare facilmente nel tuo wallet, sia usando la funzione Sweep Funds sia importandole come nuovo account. Mantenendo il controllo delle tue chiavi private, conservi il controllo totale sui tuoi asset, garantendo proprietà, sicurezza e tranquillità.

# Sicurezza e responsabilità

È fondamentale che gli utenti comprendano i rischi legati alla gestione delle chiavi private e mantengano queste chiavi protette da accessi non autorizzati. La sicurezza dei fondi dipende dalla responsabilità dell'utente nel custodire le proprie chiavi private.

> **Prima di iniziare:** in passato le guide al recupero indicavano Ywallet. Il suo sviluppatore ha confermato che non verrà aggiornato per l'upgrade di rete Ironwood (NU6.3), quindi non può più seguire la chain. Usa **Zkool**, dello stesso sviluppatore, che è il successore mantenuto. Vedi [Ywallet non è più mantenuto](#ywallet-is-no-longer-maintained) in fondo a questa pagina.

## Recupero dei fondi con Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) è il successore di Ywallet, dello stesso sviluppatore, e supporta il recupero sia trasparente sia shielded.

Qui vengono trattate due situazioni:

1. **Ripristino di un account** da una seed phrase, una chiave privata o una viewing key
2. **Sweep dei fondi** da un wallet che ha supportato solo indirizzi trasparenti

### 1) Ripristino di un account

1. Installa Zkool dalla [pagina delle release](https://github.com/hhanh00/zkool2/releases) e aprilo
2. Nell'**Account Manager** (la pagina principale), tocca il pulsante **+** per raggiungere la schermata **New Account**
3. Inserisci un **Account Name** per identificare questo account
4. Attiva **Restore Account?**. Questo rivela i campi della chiave e della birth height
5. Incolla la tua chiave in **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool accetta una seed phrase, una chiave segreta Sapling, una chiave estesa trasparente o una viewing key
6. Inserisci una **Birth Height** se sai approssimativamente quando il wallet è stato usato per la prima volta. Questo indica a Zkool da dove iniziare la scansione, facendo risparmiare molto tempo

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

> **Nessuna birth height?** Lasciala vuota e conferma l'avviso. Zkool eseguirà la scansione dall'inizio della chain: sarà più lento, ma non perderà nulla. Se i tuoi fondi risalgono a prima dell'upgrade Sapling dell'ottobre 2018, lasciala vuota invece di indovinare un'altezza successiva, altrimenti la scansione potrebbe saltare completamente le tue transazioni.

7. Salva l'account, poi sincronizzalo

### Ripristinare una seed da un wallet diverso

Se la seed proviene da un altro wallet e il saldo sembra sbagliato dopo la sincronizzazione, il motivo di solito è la derivazione dell'indirizzo di resto.

Attiva l'interruttore **Advanced Options**, più in basso nella stessa schermata New Account, e attiva **Use Internal Change** prima di salvare.

Non tutti i wallet derivano gli indirizzi di resto allo stesso modo. Ripristinare una seed ZODL in Zkool senza questa impostazione può mostrare un saldo a cui mancano le tue note di resto: sembra una perdita di fondi, ma non lo è. Il tooltip di Zkool per questo interruttore fa ancora riferimento a Zashi, che è il vecchio nome di ZODL.

Sotto **Advanced Options** ci sono altri due campi:

- **Extra Passphrase (optional)**, solo se il wallet originale ne usava una
- **Account Index**, se il wallet originale conteneva diversi account su una sola seed. I fondi potrebbero trovarsi sotto un indice diverso

> **Questi due compaiono solo quando nel campo Key è presente una seed phrase valida.** Se il campo è vuoto, oppure contiene una chiave privata o una viewing key, Zkool mostra solo **Use Internal Change** e **H/W Ledger**. Incolla prima la seed, poi apri Advanced Options.

### 2) Sweep dei fondi da un wallet solo trasparente

Se i tuoi fondi sono in un wallet che non ha mai supportato indirizzi shielded (Trust, Coinomi, Guarda e simili), ripristina prima l'account, poi sposta i fondi nello shielded pool.

1. Ripristina l'account usando i passaggi sopra
2. Apri l'account e vai alla pagina **Receive Funds**
3. Tocca la lente di ingrandimento nella barra superiore (**Find other transparent addresses**). I wallet che ruotano gli indirizzi, come Ledger ed Exodus, generano molti indirizzi trasparenti da una sola seed, e questa funzione trova quelli che contengono fondi
4. **Poi reimposta e sincronizza l'account.** I nuovi indirizzi trovati rileveranno i loro saldi solo alla scansione successiva, quindi saltare questo passaggio fa sembrare che lo sweep non abbia trovato nulla
5. Vai alla pagina **Send**. Vicino al saldo troverai tre pulsanti con icona. Non hanno etichette testuali, quindi passa il mouse sopra o tieni premuto per vedere i loro nomi:
   - **Shield One** (scudo con contorno) sposta un indirizzo trasparente alla volta
   - **Shield All** (scudo pieno) sposta tutto da tutti gli indirizzi trasparenti in una sola volta
   - **Unshield All** (lucchetto aperto) fa il contrario, verso un indirizzo trasparente

> **Shield One è la scelta più privata.** Shieldare più indirizzi in una sola transazione li collega pubblicamente come appartenenti alla stessa persona. Zkool stesso avverte di questo prima di eseguire Shield All.

6. Controlla la transazione e inviala

Unshield All è utile quando effettui un prelievo verso un exchange che accetta solo indirizzi trasparenti. I pulsanti di shielding compaiono solo se l'account ha un indirizzo shielded, e Unshield All solo se ne ha uno trasparente.

## Fondi recuperati e il pool Ironwood

Da quando l'upgrade Ironwood (NU6.3) è stato attivato il 28 luglio 2026, il pool Orchard è solo spend-only. Nessun nuovo valore può entrarvi e il valore esistente ne esce attraverso il turnstile verso Ironwood.

Se i tuoi fondi recuperati sono in Orchard, dovranno migrare prima di comportarsi normalmente. Apri il menu dell'account e scegli **Note Migration**. L'opzione compare solo quando c'è effettivamente qualcosa da migrare.

La schermata si intitola **Orchard to Ironwood Migration** e procede in due fasi. Per prima cosa divide le note non standard in denominazioni standard, poi sposta quelle note una alla volta. **Migration Speed** è un cursore da Ultra Fast a Slow che imposta il ritardo casuale tra i passaggi. **Start Migration** esegue il processo a fasi in background e puoi chiudere la pagina e riprendere più tardi. **One Shot** lo esegue in un solo passaggio.

Ogni passaggio è una transazione a sé, quindi ognuno paga una commissione.

> **Gli importi della migrazione sono pubblici.** Quando il valore attraversa il turnstile, l'importo e l'altezza del blocco sono visibili on-chain, anche se mittente e destinatario restano shielded. Importi distintivi possono identificarti, quindi preferisci la migrazione a fasi a una velocità più lenta invece di one shot e valuta di instradare prima la tua connessione attraverso Tor o una VPN, così il tuo indirizzo IP non sarà collegato all'importo che hai spostato.

## Recupero approfondito con ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) è uno strumento di recupero di Zingo Labs per i casi in cui un normale ripristino non funziona, ad esempio un file wallet danneggiato o parziale.

> Il suo ultimo aggiornamento precede i recenti upgrade di rete, quindi consideralo come ultima risorsa e verifica eventuali chiavi recuperate in un wallet mantenuto prima di fare affidamento sul risultato.

## Ywallet non è più mantenuto

Ywallet è stato per molto tempo lo strumento di recupero consigliato in questa pagina e molte guide più vecchie lo indicano ancora.

Il suo sviluppatore ha confermato che non verrà aggiornato per Ironwood. Un wallet che non supporta le attuali regole di consenso non può costruire transazioni valide, quindi non può più essere usato per spostare fondi recuperati. **Zkool**, dello stesso sviluppatore, è il successore mantenuto ed è quello che questa pagina usa ora.

Se hai già fondi depositati in Ywallet, ripristina la stessa seed phrase in Zkool usando i passaggi sopra.

## Pagine correlate

- [Wallet](/using-zcash/wallets) - quali wallet sono mantenuti e il loro stato di preparazione per Ironwood
- [Ironwood](/zcash-tech/ironwood) - cosa ha cambiato l'upgrade e perché i fondi migrano
- [Memo](/using-zcash/memos) - come funzionano i memo crittografati
- [Viewing Keys](/zcash-tech/viewing-keys) - accesso in sola lettura senza possibilità di spesa
