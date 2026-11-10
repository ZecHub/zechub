<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Chiavi di visualizzazione in uscita (OVK)

Una chiave di visualizzazione in uscita (OVK) è un valore di 32 byte usato solo per crittografare il ciphertext *in uscita* di un output schermato. Consente a una parte di recuperare il testo in chiaro della nota inviata (indirizzo del destinatario, valore e memo) senza poter spendere fondi né vedere le note in entrata.

Il destinatario decrittografa sempre la nota in entrata con le proprie chiavi di visualizzazione in entrata. La scelta dell'OVK non modifica ciò che vede il destinatario. Non esiste una codifica standard per un OVK grezzo; è semplicemente composto da 32 byte.

## In breve

- Un OVK controlla solo chi può recuperare il testo in chiaro in uscita di un pagamento schermato.
- I portafogli scelgono tra tre policy: **Mittente** (recupero normale con l'UFVK dell'account), **Personalizzata** (recupero con una chiave fornita da te) o **Discard** (nessuno può recuperare il testo in chiaro in uscita dalla chain).
- Anche con Discard o un OVK personalizzato, chi possiede un UFVK vede comunque quali note sono state spese e può calcolare l'importo netto uscito dall'account.
- L'unico modo affidabile per rendere invisibile un importo a un determinato UFVK è assicurarsi che le note non siano mai appartenute a quell'account (account separato o portafoglio separato).
- Le tre policy esistono già in `zcash_client_backend`; oggi quasi tutti i portafogli usano solo la policy predefinita Mittente.

---

## Le tre policy

I portafogli basati su `zcash_client_backend` selezionano un `OvkPolicy` quando creano una transazione:

| Policy | Ciphertext in uscita | Chi può recuperare successivamente il testo in chiaro in uscita |
|--------|----------------------|----------------------------------------------|
| **Mittente** (predefinita) | Crittografati con il normale OVK dell'account | La Unified Full Viewing Key dell'account mittente |
| **Personalizzata** | Crittografati con le chiavi fornite da te | Chiunque possieda le chiavi fornite |
| **Discard** | Non viene usato alcun OVK (`ovk = ⊥`) | Nessuno (nemmeno il mittente) |

Un costruttore di convenienza crea una policy `Custom` a partire da un singolo valore di 32 byte, affinché sia l'OVK esterno sia quello interno corrispondano alla stessa chiave.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

Consulta la documentazione di [OvkPolicy](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) e [ZIP 310](https://zips.z.cash/zip-0310).

## A cosa serve ogni policy

**Mittente** è il comportamento normale di un portafoglio. Dopo il mining della transazione, chiunque possieda l'UFVK dell'account può decrittografare i ciphertext in uscita e recuperare gli indirizzi dei destinatari, gli importi e i memo.

**Personalizzata** ti consente di affidare a una terza parte (revisore, elaboratore di pagamenti, sistema di ricevute o dispositivo separato) la capacità di decrittografare specifici pagamenti in uscita senza fornirle le chiavi di visualizzazione complete. Puoi anche usare una chiave effimera da eliminare dopo la transazione, oppure usare chiavi diverse per controparti diverse, in modo che nessuna singola chiave veda tutti i pagamenti in uscita.

**Discard** significa che il portafoglio mittente non può recuperare il testo in chiaro in uscita dalla chain. È utile quando vuoi ridurre al minimo ciò che può essere recuperato nel caso in cui l'UFVK venga compromesso in seguito, oppure quando deliberatamente non vuoi una registrazione on-chain che l'OVK dell'account possa aprire.

## Cosa vede comunque chi possiede un UFVK

Anche quando vengono usati Discard o un OVK personalizzato, chi possiede l'UFVK dell'account può comunque:

- Rilevare quali note dell'account sono state spese (tramite i nullifier).
- Conoscere i valori di tali note in input.
- Recuperare eventuali note di resto (sono crittografate con le chiavi di visualizzazione in entrata interne, non con un OVK).
- Calcolare quindi l'importo netto uscito dall'account.

Ciò che non è visibile sono i singoli indirizzi dei destinatari, la suddivisione dell'importo e i memo. La documentazione di `WalletWrite` avverte che i dati sulle transazioni create con Discard (o con un OVK personalizzato casuale) non sono recuperabili dai dati della chain se il record locale viene perso.

## Mantenere gli importi fuori da un determinato UFVK

`OvkPolicy` controlla solo il recupero del testo in chiaro in uscita. Non nasconde le spese né gli importi netti all'UFVK dell'account.

L'unico modo affidabile per impedire che un importo sia visibile a un determinato UFVK è assicurarsi che le note che trasportavano quell'importo non siano mai appartenute all'account controllato da quell'UFVK:

1. **Account ZIP-32 separati** (stesso seed) — Crea un nuovo indice dell'account, spostaci i fondi e non esportare mai l'UFVK di quell'account. L'UFVK dell'account originale vede solo il trasferimento verso il nuovo account.
2. **Portafoglio completamente separato** (seed diverso) — Finanzia un nuovo portafoglio, spendi da esso ed elimina il seed o l'UFVK. Il portafoglio originale registra solo il trasferimento di finanziamento.
3. **Portafogli effimeri monouso** — Come sopra, ma tratta il portafoglio da cui spendi come usa e getta.

Un UFVK è associato a un singolo account. Le note che non sono mai state in quell'account non compaiono mai nel suo saldo né nei suoi totali di uscita.

## Come i portafogli usano oggi le policy

Quasi tutti i portafogli di produzione usano solo la policy predefinita **Mittente**, quindi l'intera cronologia in uscita è recuperabile dall'UFVK. Le altre due policy esistono nella libreria ma sono raramente esposte nelle interfacce utente.

Tra le possibili opzioni future figurano:

- Un'opzione per transazione che consenta all'utente di scegliere Personalizzata o Discard per un singolo pagamento.
- Una modalità permanente Discard (il ripristino del seed mostrerebbe quindi solo i deflussi netti).
- OVK personalizzati per la divulgazione selettiva di singoli pagamenti (più leggera di una divulgazione completa del pagamento [ZIP 311](https://zips.z.cash/zip-0311)).
- L'uso continuativo della separazione tra account o portafogli per un isolamento più forte.

## Risorse

- [ZIP 310: Proprietà di sicurezza delle chiavi di visualizzazione di Sapling](https://zips.z.cash/zip-0310)
- [ZIP 316: Indirizzi Unified e chiavi di visualizzazione Unified](https://zips.z.cash/zip-0316)
- [ZIP 315: Buone pratiche per le implementazioni dei portafogli](https://zips.z.cash/zip-0315)
- [OvkPolicy in zcash_client_backend](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Pagine correlate

- [Chiavi di visualizzazione](/zcash-tech/viewing-keys)
- [Divulgazioni di pagamento](/zcash-tech/payment-disclosures)
- [Indirizzi Unified](/zcash-tech/unified-addresses)
- [Cosa può vedere un Block Explorer](/zcash-tech/what-a-block-explorer-can-see)
