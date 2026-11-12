# Οδηγός προγραμματιστή JS για το Zcash

**zcash.js** (`@zcashlabs/zcash.js`) είναι ένα πειραματικό SDK TypeScript/JavaScript που κυκλοφόρησε από το Zcash Labs στις 26 Οκτωβρίου 2026. Επιτρέπει στους προγραμματιστές να δημιουργούν πορτοφόλια, light clients, πίνακες ελέγχου και εφαρμογές που αλληλεπιδρούν με το δίκτυο Zcash από το Node.js και το browser.

> **Κατάσταση**: Πειραματικό (v0.1.1). Τα μόνιμα πορτοφόλια Node απαιτούν προς το παρόν Linux + `flock`. Η πλήρης αποστολή/λήψη σε browser σε πραγματικό χρόνο και η ιστορική μετεγκατάσταση της βάσης δεδομένων πορτοφολιού δεν έχουν ακόμη πλήρως πιστοποιηθεί. Πάντα να ελέγχεις την επίσημη τεκμηρίωση πριν από χρήση σε παραγωγή.

## Τι παρέχει το SDK

- `createPublicClient` — queries JSON-RPC χωρίς κατάσταση και παρατήρηση συναλλαγών
- `createLightClient` — queries και streams lightwallet (εγγενές gRPC στο Node, gRPC-Web στο browser)
- `createWalletClient` — τοπικοί λογαριασμοί, σάρωση, προτάσεις, υπογραφή, υποβολή και ανάκτηση καταγεγραμμένων πληρωμών
- Ακριβή ποσά `bigint`, επικύρωση δικτύου, εργαλεία προβολής/διευθύνσεων και βοηθητικά προγράμματα PCZT
- Ενσωματωμένη βασική μηχανή πορτοφολιού, workers και τοπικά proving assets Sapling (δεν απαιτείται ξεχωριστή εγκατάσταση του Rust)

## Εγκατάσταση

Χρησιμοποίησε το **Node.js 22.23.4** (την έκδοση που έχει οριστεί από το πακέτο).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- Προτίμησε το TypeScript με ESM (`"type": "module"` στο `package.json`).
- Οι εφαρμογές browser λειτουργούν μέσω ενός σύγχρονου ESM bundler. Ο bundler θα δημιουργήσει lazy WASM, worker και proving assets — πρέπει να αναπτυχθούν μαζί με την εφαρμογή σου.

## Πρώτο query αλυσίδας (χωρίς πορτοφόλι)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- Η παράλειψη της επιλογής `network` χρησιμοποιεί από προεπιλογή το mainnet (παρείχε ένα αντίστοιχο endpoint).
- Ένα `createPublicClient` είναι επίσης διαθέσιμο για καθαρή χρήση JSON-RPC.

## Άνοιγμα πορτοφολιού

```ts
import { createWalletClient } from '@zcashlabs/zcash.js';

const wallet = await createWalletClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
  storage: { kind: 'node-filesystem', path: './my-wallet' }, // Linux only for durable storage
});

try {
  const accounts = await wallet.accounts.list();
  console.log(accounts);
} finally {
  await wallet.close();
}
```

### Επιλογές αποθήκευσης

| Περιβάλλον     | Επιλογή αποθήκευσης                                      |
|-----------------|-----------------------------------------------------|
| Node (μόνιμο)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Browser         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Προσωρινό      | `{ kind: 'memory' }`                                |

**Σημαντικές προεπιλογές** (από την έκδοση v0.1.1):

- Οι δαπάνες και τα ρέστα είναι μόνο Ironwood από προεπιλογή
- Κανόνας τελών: ZIP-317
- Επιβεβαιώσεις: 3 έμπιστες / 3 μη έμπιστες
- Πάντα να καλείς το `wallet.sync()` πριν προτείνεις μια πληρωμή

## Ροή εργασίας πορτοφολιού υψηλού επιπέδου

1. Δημιούργησε ή εισήγαγε έναν mnemonic λογαριασμό και σύνδεσε έναν signer
2. Κάλεσε το `wallet.sync()`
3. Ζήτησε μια διεύθυνση λήψης (προτίμησε Unified / Ironwood)
4. Δημιούργησε μια πρόταση → έλεγξέ τη → κάλεσε το `wallet.send()`
5. Παρακολούθησε για επιβεβαίωση ή χρησιμοποίησε καταγεγραμμένες λειτουργίες για ανάκτηση μετά από επανεκκίνηση

Η εφαρμογή διαχειρίζεται τα bytes του mnemonic. Διέγραψέ τα από τη μνήμη όταν δεν τα χρειάζεσαι πλέον. Πάντα να παρουσιάζεις ένα σαφές UI έγκρισης που εμφανίζει κάθε παραλήπτη, ποσό, τέλη, pool και λήξη.

Δες τον επίσημο [Οδηγό πορτοφολιού](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) για ένα πλήρες λειτουργικό παράδειγμα.

## Σημειώσεις πλατφορμών και τρέχοντες περιορισμοί

| Δυνατότητα            | Node                              | Browser                          |
|-----------------------|-----------------------------------|----------------------------------|
| Πακέτο               | Node 22.23.4 + ESM                | Σύγχρονος ESM bundler + WebAssembly |
| Light queries         | Εγγενές gRPC                       | gRPC-Web + CORS                  |
| Μόνιμη αποθήκευση       | Μόνο Linux + `flock`              | OPFS (ασφαλές context)            |
| Προσωρινή αποθήκευση    | memory                            | memory                           |

Επιπλέον περιορισμοί:

- Η μόνιμη αποθήκευση Node είναι προς το παρόν μόνο Linux
- Δεν υπάρχει ακόμη διαχειριζόμενο secret vault, απομακρυσμένη υπηρεσία proving ή ενσωμάτωση hardware-signer
- Η αποθήκευση **δεν** διαφημίζεται ως κρυπτογραφημένη σε αδράνεια
- Μην ανοίγεις την ίδια αποθήκευση πορτοφολιού ταυτόχρονα από πολλές διεργασίες ή καρτέλες browser
- Πάντα να κλείνεις σωστά το πορτοφόλι με το `await wallet.close()`

## Επόμενα βήματα

- Επίσημη εγκατάσταση και πρώτο αίτημα: [Εγκατάσταση](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Άνοιγμα και διαμόρφωση πορτοφολιού: [Άνοιγμα πορτοφολιού](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Πλήρης ροή εργασίας: [Οδηγός πορτοφολιού](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- Αναφορά API: [Αναφορά API](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Περιορισμοί πλατφόρμας: [Ρύθμιση Node και browser](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Επίσημοι πόροι

- Βιβλίο προγραμματιστή: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- Αποθετήριο GitHub: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- Πακέτο npm: `@zcashlabs/zcash.js`


---

*Αυτός ο οδηγός βασίζεται στο `@zcashlabs/zcash.js@0.1.1` (Οκτώβριος 2026). Το SDK βρίσκεται υπό ενεργή ανάπτυξη — πάντα να προτιμάς την επίσημη τεκμηρίωση για το πιο πρόσφατο API και τους περιορισμούς.*
