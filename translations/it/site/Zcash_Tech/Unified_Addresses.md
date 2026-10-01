# Unified Address (ZIP-316) Convalida

*Questa è una guida all'apprendimento, non un decoder confezionato o una libreria di pagamenti da copiare e incollare. Spiega come è strutturato un Unified Address affinché tu possa comprendere cosa fanno internamente le librerie mantenute. Per tutto ciò che gestisce fondi reali, affidati alla [specifica ZIP-316](https://zips.z.cash/zip-0316) e alle implementazioni ufficiali collegate di seguito.*

---

## Il quadro generale

Un Unified Address (UA) è una singola stringa di indirizzo che include più tipi di receiver: **Transparent**, **Sapling**, **Orchard**, oppure una combinazione. Il wallet pagante seleziona automaticamente il miglior pool di receiver che supporta.

Immagina un UA come una busta sigillata contenente diverse schede etichettate. Ogni scheda rappresenta un modo diverso per raggiungerti. Per verificare un indirizzo, un'applicazione deve:

1. **Aprire la busta:** Decodificare la stringa di testo.
2. **Riordinare il contenuto:** Annullare la mescolatura protettiva (**F4Jumble**).
3. **Leggere ogni scheda:** Estrarre i singoli receiver.
4. **Applicare le regole del protocollo:** Ignorare o rifiutare le voci in base al relativo intervallo di typecode.

---

## Perché non basta "decodificare Bech32m"

Un UA utilizza la codifica testuale Bech32m, ma la sola decodifica di Bech32m non rivela i receiver utilizzabili.

ZIP-316 mescola deliberatamente il payload usando **F4Jumble** prima della codifica. F4Jumble assicura che la modifica anche di un solo carattere nell'indirizzo cambi completamente l'output decodificato. Ciò impedisce attacchi di malleabilità dell'indirizzo, in cui un aggressore sostituisce byte al centro di un indirizzo lasciando validi all'apparenza prefisso e suffisso.

> **Regola chiave:** La protezione dalla malleabilità funziona solo se l'applicazione esegue l'intera pipeline di decodifica e convalida. La decodifica parziale elimina la sicurezza mantenendo tutti i rischi.

---

## La pipeline di decodifica, passo dopo passo

### Passo 1: Decodificare Bech32m e verificare la rete
- **Parte leggibile dall'uomo (HRP):** `u` identifica mainnet; `utest` identifica testnet. *(Gli UA mainnet iniziano con `u1`, dove `1` è il separatore Bech32.)*
- **Limite di lunghezza:** Bech32m standard applica un limite di 90 caratteri. Gli UA in genere superano questo limite, quindi i controlli di lunghezza standard devono essere disabilitati nel decoder.
- Convertire nuovamente le parole Bech32m a 5 bit in byte standard a 8 bit.

### Passo 2: Invertire F4Jumble
F4Jumble è una rete Feistel a 4 round basata su BLAKE2b:
- **Lunghezza della metà sinistra:** `min(64, floor(length / 2))` byte. Il limite di 64 byte corrisponde alla dimensione massima dell'output di BLAKE2b. La metà destra contiene il payload rimanente.
- **Funzioni hash:** Alterna G e H utilizzando etichette di personalizzazione fisse (`UA_F4Jumble_G` e `UA_F4Jumble_H`).
- **Ordine dei round:** La codifica diretta esegue G(0) → H(0) → G(1) → H(1). L'inversione (rimescolamento inverso) esegue H(1) → G(1) → H(0) → G(0).
- **Controllo dell'intervallo:** Rifiutare input al di fuori dei limiti di dimensione del payload ZIP-316.

### Passo 3: Rimuovere il padding e verificare l'HRP
Prima della mescolatura, il codificatore aggiunge 16 byte contenenti l'HRP, completati con zeri.
- Rimuovere gli ultimi 16 byte dopo il rimescolamento inverso.
- Confermare che l'HRP incorporato corrisponda alla rete prevista (`u` o `utest`). Ciò impedisce che indirizzi testnet vengano accidentalmente accettati su mainnet.

### Passo 4: Estrarre i receiver
Il payload rimanente consiste di voci `(typecode, length, content)`, in cui typecode e lunghezza sono memorizzati come interi di dimensione compatta (un singolo byte per valori piccoli). Typecode di receiver noti:

| Typecode | Tipo di receiver       | Lunghezza del contenuto |
| :------- | :--------------------- | :---------------------- |
| `0x00`   | Transparent (P2PKH)    | 20 byte                 |
| `0x01`   | Transparent (P2SH)     | 20 byte                 |
| `0x02`   | Sapling                 | 43 byte                 |
| `0x03`   | Orchard                 | 43 byte                 |

Oltre a questi, ZIP-316 riserva altri due intervalli per la compatibilità futura:

- **`0xC0`–`0xDF` (metadati non MUST-understand):** i consumer devono ignorare gli elementi di metadati che non riconoscono in questo intervallo.
- **`0xE0` e `0xE1` (metadati di scadenza MUST-understand assegnati):** l'attuale registro ZIP-316 li assegna all'altezza e all'ora di scadenza dell'indirizzo. I consumer devono comprendere questi elementi o rifiutare l'indirizzo.
- **`0xE2`–`0xFC` (metadati MUST-understand non assegnati):** i consumer devono rifiutare l'indirizzo se incontrano un elemento non riconosciuto in questo intervallo.

Per i tipi di receiver noti, verificare che la lunghezza codificata corrisponda alla lunghezza del contenuto specificata per il tipo. Per gli elementi di metadati, usare la loro lunghezza codificata a dimensione compatta per determinare la lunghezza del contenuto. Rifiutare voci troncate o eventuali byte finali.

**Ordine preferito dei receiver.** Una volta che un indirizzo è analizzato correttamente, un wallet o uno strumento di pagamento dovrebbe scegliere il miglior receiver in questo ordine: Orchard, poi Sapling, quindi transparent.

---

## Regole obbligatorie di rifiuto ZIP-316

**Decodificare correttamente non rende valido un indirizzo.** I wallet ufficiali Zcash rifiutano rigorosamente gli indirizzi che violano le seguenti regole. Anche gli strumenti web devono rifiutarli per prevenire errori di pagamento:

- **Receiver shielded mancanti:** L'indirizzo **deve** contenere almeno un receiver Sapling o Orchard. Un UA con soli receiver transparent non è valido secondo ZIP-316.
- **Typecode duplicati:** Ogni tipo di receiver può apparire al massimo una volta.
- **Typecode non ordinati:** I receiver devono apparire in ordine strettamente crescente di typecode.
- **Receiver transparent in conflitto:** Un UA può contenere P2PKH oppure P2SH, ma **mai entrambi**.
- **Voci o padding malformati:** Prefissi di rete non corrispondenti, payload troncati o lunghezze non corrispondenti devono attivare il rifiuto immediato.
- **Typecode non riconosciuti:** I consumer devono ignorare gli elementi non riconosciuti, tranne gli elementi nell'intervallo di metadati MUST-understand (`0xE0`–`0xFC`), che devono rifiutare se non riconosciuti. Nel registro attuale, `0xE0` e `0xE1` sono tipi di scadenza assegnati, mentre `0xE2`–`0xFC` non sono assegnati. Indipendentemente da ciò, rifiutare qualsiasi indirizzo che non soddisfi le regole di validità obbligatorie sopra indicate, incluso il requisito di un receiver Sapling o Orchard.

---

## Buone pratiche per gli sviluppatori

- **Confrontare i receiver analizzati, non le stringhe grezze.** Decodificare prima gli indirizzi di verificarne l'uguaglianza.
- **Usare librerie mantenute per tutto ciò che gestisce fondi.** Compilare crate Rust ufficiali (come `zcash_address`) in WebAssembly invece di distribuire decoder JavaScript personalizzati.
- **Essere prudenti con parser scritti a mano.** Se ne scrivi uno per imparare, trattalo come un progetto di studio e testalo con i vettori ufficiali seguenti prima di affidargli qualsiasi cosa.

---

## Specifiche ufficiali e implementazioni di riferimento

- **[ZIP-316: Indirizzi unificati e Viewing Key](https://zips.z.cash/zip-0316)**
- **[crate zcash_address (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[crate f4jumble (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Vettori di test ufficiali:**
  - [Vettori di test F4Jumble](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Vettori di test Unified Address](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Glossario

| Termine | Significato |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Singola stringa di indirizzo che raggruppa più pool di receiver. |
| **Receiver** | Tipo specifico di destinazione di pagamento (transparent, Sapling o Orchard). |
| **Bech32m** | Schema di codifica testuale utilizzato per le stringhe UA. |
| **HRP** | Parte leggibile dall'uomo o prefisso di rete (`u` o `utest`). |
| **F4Jumble** | Algoritmo di offuscamento reversibile che assicura l'integrità dell'indirizzo. |
| **Typecode** | Numero in ogni voce che definisce il tipo di receiver nel payload. |
| **Malleability** | Modifica non autorizzata dei byte dell'indirizzo senza rilevamento. |

Vedi anche: [Viewing Key](./Viewing_Keys.md)
