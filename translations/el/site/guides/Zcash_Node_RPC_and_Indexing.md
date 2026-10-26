<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Πρακτικός οδηγός: κόμβος RPC του Zcash και ευρετηρίαση blockchain

Αυτή η σελίδα είναι ένας οδηγός συνταγών για την επικοινωνία με έναν ενεργό πλήρη κόμβο Zcash μέσω JSON-RPC και για τη σύνδεση ενός indexer που μπορούν να αναζητούν τα ελαφριά πορτοφόλια και οι explorers. **Δεν** είναι ένας δεύτερος οδηγός εγκατάστασης.

Για το πώς να ενεργοποιήσεις τη στοίβα μετά το `zcashd` (Zebra + Zallet, προαιρετικό Zaino, θύρες, volumes, εκκίνηση δύο φάσεων), χρησιμοποίησε τη σελίδα [στοίβα Z3](/zcash-tech/z3-stack) και το [αποθετήριο Z3](https://github.com/ZcashFoundation/z3). Για υπόβαθρο σχετικά με τους κόμβους συναίνεσης, δες τους [πλήρεις κόμβους](/zcash-tech/full-nodes) και τον [πλήρη κόμβο Zebra](/zcash-tech/zebra-full-node).

Το `zcashd` έφτασε στο τέλος του κύκλου ζωής του στις 18 Ιουλίου 2026. Η νέα εργασία διαχειριστή θα πρέπει να στοχεύει το Zebra (ή το [Zakura](/zcash-tech/zakura-node)) μαζί με ένα πορτοφόλι/indexer, όχι το `zcashd`.

---

## Συνοπτικά

* Το **JSON-RPC** είναι ο τρόπος με τον οποίο οι διαχειριστές και τα πορτοφόλια ρωτούν έναν κόμβο για την κορυφή της αλυσίδας, τα peers και, σε μια διεργασία πορτοφολιού, τα υπόλοιπα. Στο Z3, το Zebra παρέχει RPC κόμβου· το Zallet παρέχει RPC πορτοφολιού.
* Το **Regtest** είναι το κατάλληλο μέρος για να μάθεις τις κλήσεις. Ο rpc-router του Z3 στο `http://127.0.0.1:8181` δέχεται `zebra` / `zebra` και προωθεί μεθόδους κόμβου στο Zebra και μεθόδους πορτοφολιού στο Zallet.
* Το **Mainnet και το testnet** χρησιμοποιούν cookie auth στο Zebra. Μην αντιγράψεις το όνομα χρήστη/κωδικό πρόσβασης του regtest σε έναν δημόσιο κόμβο.
* Η **ευρετηρίαση** είναι ξεχωριστή εργασία από την επικύρωση. Το Zebra επικυρώνει. Το [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) παρέχει gRPC συμβατό με lightwalletd. Το [Ztreamer](https://github.com/distractedm1nd/ztreamer) είναι ένας indexer που υποστηρίζεται από Zakura· δεν είναι αυτό που παρέχει το Z3.
* Το JSON-RPC του Zaino και το προαιρετικό indexer gRPC του Zebra προορίζονται για loopback ή αξιόπιστο δίκτυο. Μην τα εκθέτεις χωρίς αυθεντικοποίηση στο δημόσιο internet.

---

## Ποια διεργασία απαντά σε ποια κλήση

| Θέλεις | Επικοινώνησε με | Θύρα host Z3 mainnet | Σημειώσεις |
| --- | --- | --- | --- |
| Κορυφή αλυσίδας, peers, `getblockchaininfo` | JSON-RPC του Zebra | 8232 | Cookie auth |
| Υπόλοιπο πορτοφολιού, διευθύνσεις, αποστολή | RPC του Zallet | 28232 | Ξεχωριστή διεργασία· beta λογισμικό |
| Compact blocks για ελαφριά πορτοφόλια | gRPC του Zaino | 8137 | Μόνο με το `--profile indexer`· απλό κείμενο h2c |
| Proxy JSON-RPC explorer / faucet | JSON-RPC του Zaino | 8237 | Μόνο αξιόπιστο δίκτυο |
| Εξάσκηση σε όλα τα παραπάνω χωρίς συγχρονισμό | rpc-router regtest Z3 | 8181 | Όνομα χρήστη `zebra` / κωδικός πρόσβασης `zebra` |

Πίνακας θυρών και ονόματα έργων Compose: [στοίβα Z3](/zcash-tech/z3-stack) και [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Εξασκήσου πρώτα στο regtest

Από ένα checkout του Z3, μετά τα `./scripts/regtest-init.sh` και `docker compose --env-file .env.regtest up -d`:

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

Ένα υγιές αποτέλεσμα `getblockchaininfo` περιλαμβάνει `"blocks"` και έναν χάρτη `"upgrades"`. Αν το curl κολλήσει, ο router δεν έχει ενεργοποιηθεί· αν λάβεις `401`, χτυπάς το Zebra απευθείας αντί για τον router (το απευθείας Zebra στο regtest είναι το `29232` και εξακολουθεί να αναμένει τα διαπιστευτήρια του router, εκτός αν τα άλλαξες).

Πλήρης ροή εργασίας regtest, συμπεριλαμβανομένης της εξόρυξης των μπλοκ ενεργοποίησης: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC mainnet / testnet (cookie auth)

Στο mainnet και το testnet, το Zallet και η προαιρετική υπηρεσία Zaino διαβάζουν ένα **κοινόχρηστο cookie volume**. Αυτό το cookie αναδημιουργείται κατά την εκκίνηση· δεν αποτελεί στόχο backup.

**Μην** δημοσιεύεις το JSON-RPC του Zebra στο δημόσιο internet. Κάλεσέ το από το δίκτυο Compose (`zebra:8232`) ή από το host μόνο αν το έχεις δεσμεύσει στο loopback.

Τυπικοί έλεγχοι διαχειριστή αφού το Zebra είναι `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

Τα `getblocktemplate` / `getmininginfo` είναι RPC εξόρυξης. Τα pools που εξακολουθούν να αναμένουν μία διεργασία `zcashd` χρειάζονται το Zebra (ή το Zakura) για templates και όποιο πορτοφόλι χρησιμοποιούν για coinbase. Δες τα [Zcash pools εξόρυξης](/using-zcash/zcash-mining-pools) και τον [οδηγό μετάβασης](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Σύνδεση ενός indexer

Η επικύρωση και η ευρετηρίαση είναι διαφορετικές εργασίες.

### Zaino (ό,τι παρέχει το Z3)

Το Zaino διαβάζει το Zebra και παρέχει ένα API gRPC συμβατό με lightwalletd, μαζί με ένα proxy JSON-RPC. Το Zallet **δεν** χρειάζεται το ανεξάρτητο container Zaino· ενσωματώνει βιβλιοθήκες Zaino και επικοινωνεί με το Zebra μέσω JSON-RPC. Εκκίνησε το ανεξάρτητο Zaino όταν θέλεις εξωτερικά ελαφριά πορτοφόλια, explorers ή faucets:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Περίμενε μέχρι να συγχρονιστεί το Zebra πριν κατευθύνεις clients στο Zaino. Ένας μαζικός indexer σε catch-up με υψηλή ταυτόχρονη ανάκτηση μπορεί να επιβραδύνει τον verifier του Zebra· κράτησε το `fetch_concurrency` στα χαμηλά μονοψήφια επίπεδα μέχρι να ενημερωθεί ο indexer.

gRPC regtest (απλό κείμενο· θύρα `28137`):

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

Το gRPC του Zaino είναι απλό κείμενο h2c σε όλα τα δίκτυα. Τερμάτισε το TLS σε reverse proxy, αν πρόκειται να συνδεθεί οτιδήποτε εκτός του host. Λεπτομέρειες: [Zaino](/zcash-tech/zaino) και [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Άλλοι indexers (όχι Z3)

* **lightwalletd** — ο παλαιότερος server compact-block. Εξακολουθεί να χρησιμοποιείται ευρέως· το Zaino είναι η διαδρομή διαδόχου για αυτόν τον ρόλο.
* **Ztreamer** — ένας indexer που υποστηρίζεται από Zakura και υλοποίηση του `CompactTxStreamer`. Δεν είναι υπηρεσία Z3. Δες το [Ztreamer αποθετήριο](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — ένας προαιρετικός ακροατής gRPC *εντός* του Zebra. Το Z3 δεν τον απαιτεί και δεν τον δημοσιεύει στο host.

---

## Συνηθισμένα λάθη

**Κλήση μεθόδων πορτοφολιού στο Zebra.** Τα RPC `getwalletinfo` και αποστολής ανήκουν στο Zallet (ή σε άλλο πορτοφόλι), όχι στον κόμβο συναίνεσης.

**Εκκίνηση του Zallet πριν το Zebra είναι `/ready`.** Το Zallet θα εισέλθει σε βρόχο επανεκκίνησης. Χρησιμοποίησε το `scripts/check-zebra-readiness.sh` στο mainnet/testnet.

**Αντιγραφή του `zebra`/`zebra` του regtest στο mainnet.** Το cookie auth είναι η προεπιλογή του mainnet/testnet για κάποιο λόγο.

**Αντιμετώπιση του Zaino ως πλήρη κόμβο.** Το Zebra (ή το Zakura) επικυρώνει. Το Zaino ευρετηριάζει.

**Δημόσια έκθεση του JSON-RPC του Zaino ή του indexer gRPC του Zebra.** Αυτά τα endpoints προορίζονται για loopback ή αξιόπιστο ιδιωτικό δίκτυο.

**Υπόθεση ότι κάθε ελαφρύ πορτοφόλι μιλά ήδη Zaino.** Έλεγξε την τρέχουσα έκδοση του πορτοφολιού σε σχέση με το πρωτόκολλο που υλοποιεί πραγματικά.

---

## Σχετικές σελίδες

* [στοίβα Z3](/zcash-tech/z3-stack) — εγκατάσταση, θύρες, volumes, εκκίνηση δύο φάσεων
* [Zaino](/zcash-tech/zaino) — ρόλος indexer και σημειώσεις διαχειριστή
* [πλήρεις κόμβοι](/zcash-tech/full-nodes)
* [πλήρης κόμβος Zebra](/zcash-tech/zebra-full-node)
* [κόμβοι Lightwallet](/zcash-tech/lightwallet-nodes)
* [Οδηγός μετάβασης: zcashd σε Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib και οδηγός Zaino](/guides/zingolib-and-zaino-tutorial)

## Πόροι

* [αποθετήριο Z3](https://github.com/ZcashFoundation/z3)
* [οδηγός συνταγών regtest Z3 (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Συχνές ερωτήσεις Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [βιβλίο Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Τελευταία ενημέρωση:** Σεπτέμβριος 2026
