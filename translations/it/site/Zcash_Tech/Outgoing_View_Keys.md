<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Chiavi di visualizzazione in uscita (OVK)

Una outgoing viewing key (OVK) è un valore di 32 byte usato solo per crittografare il *ciphertext in uscita* di un output schermato. Permette a una parte di recuperare il testo in chiaro della nota inviata (indirizzo del destinatario, valore e memo) senza poter spendere i fondi o vedere le note in entrata.

Il destinatario decifra sempre la nota in entrata con le proprie chiavi di visualizzazione in entrata. La scelta dell'OVK non cambia ciò che il destinatario vede. Non esiste una codifica standard per un OVK grezzo: è semplicemente 32 byte.

## In sintesi

- Un OVK controlla solo chi può recuperare il testo in chiaro in uscita di un pagamento schermato.
- I portafogli scelgono tra tre politiche: **Sender** (recupero normale con l'UFVK dell'account), **Custom** (recupero con una chiave che fornisci tu), oppure **Discard** (nessuno può recuperare il testo in chiaro in uscita dalla chain).
- Anche con Discard o un OVK personalizzato, chi possiede l'UFVK vede comunque quali note sono state spese e può calcolare l'importo netto che ha lasciato l'account.
- L'unico modo affidabile per mantenere un importo invisibile a una particolare UFVK è garantire che le note non siano mai appartenute a quell'account (account separato o portafoglio separato).
- Le tre politiche esistono già in `zcash_client_backend`; oggi quasi ogni portafoglio usa solo la politica Sender predefinita.

---

## Le tre politiche

I portafogli basati su `zcash_client_backend` selezionano un `OvkPolicy` quando costruiscono una transazione:

| Politica | Ciphertext in uscita | Chi può recuperare in seguito il testo in chiaro in uscita |
|--------|----------------------|----------------------------------------------|
| **Sender** (predefinita) | Crittografati con l'OVK normale dell'account | Le Unified Full Viewing Key dell'account mittente |
| **Custom** | Crittografati con le chiavi che fornisci | Chiunque possieda le chiavi fornite |
| **Discard** | Non viene usato alcun OVK (`ovk = ⊥`) | Nessuno (nemmeno il mittente) |

Un costruttore di comodità crea una politica `Custom` a partire da un singolo valore di 32 byte, così che sia l'OVK esterno che quello interno siano la stessa chiave.

![Confronto tra le politiche delle chiavi di visualizzazione in uscita](/content-images/ovk-policies.webp)

Consulta la documentazione [OvkPolicy](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) e [ZIP 310](https://zips.z.cash/zip-0310).

## A cosa serve ogni politica

**Sender** è il comportamento ordinario di un portafoglio. Dopo che la transazione è stata minata, chiunque possieda l'UFVK dell'account può decifrare i ciphertext in uscita e recuperare gli indirizzi dei destinatari, gli importi e i memo.

**Custom** ti permette di dare a una terza parte (revisore, processore di pagamenti, sistema di ricevute o dispositivo separato) la possibilità di decifrare pagamenti in uscita specifici senza consegnargli la chiave di visualizzazione completa. Puoi anche usare una chiave effimera da gettare via dopo la transazione, oppure usare chiavi diverse per diversi controparti, così che nessuna singola chiave veda ogni pagamento in uscita.

**Discard** significa che il portafoglio mittente non può recuperare il testo in chiaro in uscita dalla chain. Questo è utile quando vuoi ridurre al minimo ciò che è recuperabile se l'UFVK viene compromessa in seguito, o quando deliberatamente non vuoi una traccia on-chain che l'OVK dell'account possa aprire.

## Ciò che chi possiede l'UFVK vede comunque

Anche quando viene usata Discard o un OVK personalizzato, chi possiede l'UFVK dell'account può comunque:

- Rilevare quali note dell'account sono state spese (tramite i nullifier).
- Conoscere i valori di quelle note in entrata.
- Recuperare le note di resto (sono crittografate con la chiave di visualizzazione in entrata interna, non con un OVK).
- Quindi calcolare l'importo netto che ha lasciato l'account.

Ciò che non è visibile sono i singoli indirizzi dei destinatari, la suddivisione dell'importo e i memo. La documentazione di `WalletWrite` avverte che i dati sulle transazioni create con Discard (o con un OVK personalizzato casuale) non sono recuperabili dai dati della chain se il record locale va perso.

## Tenere gli importi fuori da una particolare UFVK

`OvkPolicy` controlla solo il recupero del testo in chiaro in uscita. Non nasconde spese o importi netti all'UFVK dell'account stesso.

L'unico modo affidabile per evitare che un importo sia visibile a una particolare UFVK è garantire che le note che contenevano quell'importo non siano mai appartenute all'account controllato da quell'UFVK:

1. **Account ZIP-32 separati** (stesso seed) — Crea un nuovo indice di account, sposta lì i fondi e non esportare mai l'UFVK di quell'account. L'UFVK dell'account originale vede solo il trasferimento verso il nuovo account.
2. **Portafoglio completamente separato** (seed diverso) — Alimenta un portafoglio nuovo, spendi da esso e getta via il seed o l'UFVK. Il portafoglio originale registra solo il trasferimento di alimentazione.
3. **Portafogli effimeri monouso** — Come sopra, ma considera il portafoglio di spesa come monouso.

Un UFVK è per account. Le note che non sono mai state in quell'account non compaiono mai nel suo saldo o nei totali dei deflussi.

## Come i portafogli usano le politiche oggi

Quasi ogni portafoglio in produzione usa solo la politica **Sender** predefinita, così l'intera cronologia in uscita è recuperabile dall'UFVK. Le altre due politiche esistono nella libreria ma sono raramente esposte nelle interfacce utente.

Possibili opzioni future includono:

- Un flag per singola transazione che permetta all'utente di scegliere Custom o Discard per un singolo pagamento.
- Una modalità permanente Discard (il ripristino dal seed mostrerebbe quindi solo i deflussi netti).
- OVK personalizzati per la divulgazione selettiva di singoli pagamenti (più leggero di una divulgazione completa dei pagamenti con [ZIP 311](https://zips.z.cash/zip-0311)).
- Uso continuo della separazione di account o portafogli per un isolamento più forte.

## Risorse

- [ZIP 310: Security Properties of Sapling Viewing Keys](https://zips.z.cash/zip-0310)
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [ZIP 315: Best Practices for Wallet Implementations](https://zips.z.cash/zip-0315)
- [OvkPolicy in zcash_client_backend](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Pagine correlate

- [Chiavi di visualizzazione](/zcash-tech/viewing-keys)
- [Divulgazione dei pagamenti](/zcash-tech/payment-disclosures)
- [Indirizzi unificati](/zcash-tech/unified-addresses)
- [Cosa può vedere un block explorer](/zcash-tech/what-a-block-explorer-can-see)
