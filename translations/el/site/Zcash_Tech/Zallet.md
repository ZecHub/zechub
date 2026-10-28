<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Το Zallet είναι ένα πορτοφόλι Zcash πλήρους κόμβου γραμμένο σε Rust. Είναι η αντικατάσταση του πορτοφολιού που ήταν ενσωματωμένο στο `zcashd`. Αφού το `zcashd` έφτασε στη διακοπή Τέλους Υποστήριξης στις 18 Ιουλίου 2026, στο ύψος μπλοκ 3417100, οι αρμοδιότητες συναίνεσης και πορτοφολιού διαχωρίστηκαν: τα **Zebra** ή **Zakura** επικυρώνουν την αλυσίδα και το **Zallet** διατηρεί τα κλειδιά, σαρώνει notes και εκθέτει το JSON-RPC του πορτοφολιού.

Το Zallet βρίσκεται επί του παρόντος σε **beta**. Δεν έχει ελεγχθεί πλήρως. Αλλαγές που δεν διατηρούν τη συμβατότητα ενδέχεται να απαιτήσουν τη διαγραφή και επαναδημιουργία του πορτοφολιού. Μην το θεωρείς production custody για μεγάλα ποσά ZEC χωρίς να διαβάσεις τις προειδοποιήσεις ασφαλείας στο [Βιβλίο του Zallet](https://zcash.github.io/zallet/).

---

## Συνοπτικά

- Το Zallet είναι ένα **πορτοφόλι RPC πλήρους κόμβου**, όχι ένα mobile light wallet και όχι ένας κόμβος συναίνεσης.
- Αντικαθιστά το μισό του πορτοφολιού του `zcashd`. Το μισό του κόμβου είναι το [Zebra](Zebra_Full_Node.md) ή το [Zakura](Zakura_Node.md).
- Είναι γραμμένο σε **Rust**, με διπλή άδεια MIT / Apache-2.0, και συντηρείται στο [zcash/zallet](https://github.com/zcash/zallet).
- Η πιο πρόσφατη δημοσιευμένη έκδοση στα τέλη Αυγούστου 2026: **v0.1.0-beta.3**.
- Επικοινωνεί με δεδομένα αλυσίδας μέσω ενός από δύο backends: **zebra-state** (άμεσο `ReadStateService` έναντι ενός τοπικού `zebrad`) ή **Zaino**.
- Εκθέτει ένα υποσύνολο JSON-RPC συμβατό με το **zcashd**. Ορισμένες μέθοδοι άλλαξαν· άλλες παραλείφθηκαν σκόπιμα.
- Το υλικό κλειδιών κρυπτογραφείται πάντα με **age**. Το ιστορικό συναλλαγών, οι διευθύνσεις και τα viewing keys αποθηκεύονται χωρίς κρυπτογράφηση στο `wallet.db`.
- Περιλαμβάνει τρία binaries σε ένα υπογεγραμμένο archive: `zallet` (launcher), `zallet-zebra` και `zallet-zaino`.
- Επίσημη τεκμηρίωση: [Βιβλίο του Zallet](https://zcash.github.io/zallet/).

---

## Γιατί υπάρχει το Zallet

Το `zcashd` συνδύαζε σε μία διεργασία έναν κόμβο συναίνεσης προερχόμενο από το Bitcoin Core και ένα πορτοφόλι. Αυτή η σχεδίαση δεν υπάρχει πλέον.

| Ρόλος | Παλιό stack | Τρέχον stack |
|------|-----------|---------------|
| Συναίνεση / P2P | `zcashd` | Zebra (`zebrad`) ή Zakura |
| Πορτοφόλι / κλειδιά / υπόλοιπα | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Indexer light-client | `lightwalletd` | Zaino ή `lightwalletd` |

Ο διαχωρισμός του πορτοφολιού από τον κόμβο σημαίνει:

- Το λογισμικό κόμβου μπορεί να αλλάξει (Zebra έναντι Zakura) χωρίς μετακίνηση κλειδιών.
- Η σάρωση του πορτοφολιού και η εξουσιοδότηση δαπάνης βρίσκονται σε διεργασία που μπορεί να θωρακιστεί ξεχωριστά.
- Η σημασιολογία του RPC μπορεί να εξελιχθεί προς λογαριασμούς ZIP 32, Unified Addresses και PCZTs αντί να παραμείνει παγωμένη στις ιδιομορφίες του `zcashd`.

Το Zallet είναι το πορτοφόλι που προορίζεται για διαχειριστές οι οποίοι προηγουμένως εκτελούσαν το `zcashd` ως hot wallet, backend ανταλλακτηρίου, faucet ή πορτοφόλι πληρωμών εξόρυξης.

---

## Κατάσταση

Το Zallet βρίσκεται σε **beta**.

Στην πράξη, αυτό σημαίνει:

- Αλλαγές που δεν διατηρούν τη συμβατότητα μπορούν να προστεθούν σε οποιαδήποτε beta. Ενδέχεται να χρειαστεί να διαγράψεις τον κατάλογο δεδομένων και να ξεκινήσεις ξανά.
- Δεν έχει μεταφερθεί κάθε RPC πορτοφολιού του `zcashd`.
- Η σημασιολογία ορισμένων μεταφερμένων μεθόδων διαφέρει από το `zcashd`. Οι ενσωματώσεις πρέπει να διαβάσουν τη σελίδα [τροποποιημένης σημασιολογίας](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Τα crates βρίσκονται υπό ανάπτυξη και δεν έχουν ελεγχθεί πλήρως.
- Το Zallet **δεν** είναι βιβλιοθήκη Rust. Δεν υπάρχουν εγγυήσεις αν εξαρτάσαι από αυτό ως τέτοια.

Στείλε feedback στα [GitHub issues](https://github.com/zcash/zallet/issues/new) ή στο κανάλι `#wallet-dev` του [Zcash R&D Discord](https://discord.gg/xpzPR53xtU).

Προβλέπεται μια μεταγενέστερη σταθερή φάση μόλις υπάρξει η προβλεπόμενη επιφάνεια RPC. Τότε οι καλούντες θα αναμένεται να μεταβούν στις μεθόδους του Zallet, συμπεριλαμβανομένων των τεκμηριωμένων σημασιολογικών διαφορών.

---

## Αρχιτεκτονική

Το Zallet χωρίζεται σε τρία Cargo workspaces ώστε τα δύο backends αλυσίδας να μπορούν να παρακολουθούν διαφορετικά dependency graphs.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Και τα τρία binaries ανοίγουν την **ίδια** `wallet.db`. Ο launcher επιλέγει backend κατά τον χρόνο εκτέλεσης· δεν χρειάζεται να κάνεις recompile για να αλλάξεις.

Τυπική ανάπτυξη:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Το Zallet είναι ένα **πορτοφόλι πλήρους κόμβου**: αναμένει έναν τοπικό κόμβο που επικυρώνει. Δεν είναι light client. Για light wallets και compact-block servers, δες τα [Zaino](Zaino.md) και [κόμβοι Lightwallet](Lightwallet_Nodes.md).

Το compose stack [Z3](https://github.com/ZcashFoundation/z3) του Zcash Foundation εκτελεί μαζί τα Zebra + Zallet, με προαιρετικό αυτόνομο Zaino για εξωτερικούς light clients.

---

## Λογαριασμοί, διευθύνσεις και κλειδιά

Το Zallet βασίζεται σε λογαριασμούς ZIP 32, όχι στον μοναδικό έμμεσο λογαριασμό του `zcashd`.

- Ένα πορτοφόλι μπορεί να διατηρεί **πολλαπλά mnemonics BIP 39**. Κάθε mnemonic είναι ανεξάρτητη ρίζα δαπάνης, που προσδιορίζεται από ένα **seed fingerprint** (`zip32seedfp1…`).
- Οι **λογαριασμοί** παράγονται από ένα seed με δείκτη λογαριασμού ZIP 32. Μέσα σε ένα instance Zallet έχουν επίσης ένα τοπικό **UUID**. Η φορητή ταυτότητα ενός λογαριασμού είναι `(seedfp, account index)`.
- Οι διευθύνσεις είναι **Unified Addresses ZIP 316**, που παράγονται με `z_getaddressforaccount`. Ένας λογαριασμός μπορεί να έχει πολλές διαφοροποιημένες διευθύνσεις· οι θωρακισμένοι receivers δεν συνδέονται μεταξύ τους on-chain.
- Τα εισαγόμενα spending keys (`z_importkey`) και οι διευθύνσεις μόνο για παρακολούθηση (`z_importaddress`) γίνονται λογαριασμοί UUID που δεν καλύπτει κανένα mnemonic.
- Τα viewing keys μπορούν να εξαχθούν και να εισαχθούν (`z_exportviewingkey`, `z_importviewingkey`), συμπεριλαμβανομένων unified full viewing keys και incoming viewing keys.

Το `getnewaddress` δεν έχει υλοποιηθεί. Χρησιμοποίησε τα `z_getnewaccount` και `z_getaddressforaccount`.

Αν το `keystore.require_backup` είναι ενεργό (η μεταφερμένη μορφή του `walletrequirebackup` του `zcashd`), το Zallet αρνείται να παράγει νέα εξουσιοδότηση δαπάνης από mnemonic του οποίου το backup δεν έχει επιβεβαιωθεί.

---

## Κρυπτογράφηση και αντίγραφα ασφαλείας

Το υλικό κλειδιών είναι **πάντα** κρυπτογραφημένο. Δεν υπάρχει μη κρυπτογραφημένη λειτουργία ούτε RPC `encryptwallet` — εκείνη η μέθοδος `zcashd` δεν υποστηρίχθηκε ποτέ πλήρως.

- Η ρύθμιση δημιουργεί μια ταυτότητα **age**, με προεπιλεγμένη διαδρομή `{datadir}/encryption-identity.txt`.
- Τα mnemonics και τα εισαγόμενα spending keys αποθηκεύονται ως ciphertexts age στο `wallet.db`.
- Το υπόλοιπο της βάσης δεδομένων **δεν** είναι κρυπτογραφημένο. Το ιστορικό, οι διευθύνσεις και τα viewing keys είναι αναγνώσιμα αν κάποιος αποκτήσει το αρχείο.
- Η ταυτότητα μπορεί να προστατευτεί με passphrase (`generate-encryption-identity -p`). Ξεκλείδωσέ την με το RPC `walletpassphrase`· κλείδωσέ την με το `walletlock`.
- Η απώλεια του αρχείου ταυτότητας ή του passphrase του καθιστά τα spending keys μη ανακτήσιμα. Δημιούργησε αντίγραφα ασφαλείας της ταυτότητας, κάθε mnemonic και, ξεχωριστά και κρυπτογραφημένα, κάθε αντίγραφο `wallet.db` που διατηρείς.

Η αντιγραφή του `wallet.db` ενώ εκτελείται το Zallet δεν είναι ασφαλές αντίγραφο ασφαλείας. Η SQLite μπορεί να καταστρέψει τμήματα δεδομένων. Προτίμησε μια σταματημένη διεργασία ή περίμενε μια επίσημη εντολή online backup.

---

## JSON-RPC

Το Zallet υλοποιεί ένα υποσύνολο των RPC πορτοφολιού `zcashd` μέσω HTTP με Basic auth. Κάνε bind στο loopback. Η απομακρυσμένη χρήση πρέπει να περνά μέσα από κρυπτογραφημένο tunnel. Το `rpc.allow_insecure_remote_bind` υπάρχει και δεν είναι ασφαλές.

Αξιοσημείωτες διαφορές από το `zcashd`:

- Τα πεδία υπολοίπου στο `getwalletinfo` είναι κενά. Χρησιμοποίησε τα `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Τα τέλη ακολουθούν το **ZIP 317**. Δεν υπάρχει `settxfee`.
- Η κατασκευή δαπάνης μεταφέρεται σε **PCZTs** (Μερικώς Δημιουργημένες Συναλλαγές Zcash, ZIP 374). Τα RPC PCZT προστέθηκαν στη σειρά beta.
- Ένα καθολικό **sync lock** μπλοκάρει τα RPC υπολοίπου και δαπάνης ενώ το πορτοφόλι ενημερώνεται ή ανακάμπτει από reorg (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Οι σκόπιμα παραλειπόμενες μέθοδοι περιλαμβάνουν τις `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` και `encryptwallet`. Οι αντικαταστάσεις παρατίθενται στο [Βιβλίο του Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Ξεκινώντας

Οι επίσημες διαδρομές εγκατάστασης (πακέτα Debian, Docker, release binaries) βρίσκονται στον [οδηγό εγκατάστασης](https://zcash.github.io/zallet/guide/installation/index.html). Τα release archives ονομάζονται `zallet-<version>-<arch>.tar.gz` και περιέχουν και τα τρία binaries.

Ελάχιστη ροή νέου πορτοφολιού:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Στρέψε το `[indexer]` σε ένα τοπικό endpoint JSON-RPC `zebrad`. Το backend zebra θέλει επίσης το `[indexer.read_state_service]` και ένα `zebrad` χτισμένο με το χαρακτηριστικό indexer, ώστε το Zallet να μπορεί να διαβάζει απευθείας την κατάσταση της αλυσίδας.

Αναπαραγώγιμες εικόνες μπορούν να δημιουργηθούν με [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, containerd image store, GNU Make).

---

## Μετάβαση από το zcashd

Διατήρησε τον παλιό κατάλογο δεδομένων `zcashd` μέχρι να επιβεβαιώσεις τα υπόλοιπα και μια δοκιμασμένη επαναφορά.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

Το `migrate-zcashd-wallet` υπάρχει μόνο σε builds με το χαρακτηριστικό `zcashd-import`. Η ανάγνωση του `wallet.dat` χρειάζεται το `db_dump` από το **Berkeley DB 6.2**, την έκδοση που χρησιμοποιούσε το `zcashd`.

Σημειώσεις διαχειριστή βήμα προς βήμα: [Οδηγός μετάβασης: zcashd προς Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Πώς σχετίζεται το Zallet με άλλο λογισμικό

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| Τι είναι | Πορτοφόλι RPC πλήρους κόμβου | Server πορτοφολιού με προτεραιότητα στα θωρακισμένα | Πορτοφόλια τελικού χρήστη | Κόμβος συναίνεσης | Indexer / αντικατάσταση του lightwalletd |
| Αντικαθιστά | Πορτοφόλι `zcashd` | Δεν είναι άμεσο αντίγραφο του `zcashd` | Εφαρμογές mobile/desktop | Κόμβο `zcashd` | `lightwalletd` |
| Χρειάζεται τοπικό κόμβο | Ναι | Ναι (Zebra από προεπιλογή) | Όχι (light client) | Είναι ο ίδιος ο κόμβος | Ναι |
| Συμβατότητα RPC zcashd | Σχεδιασμένο ως η διαδρομή συμβατότητας | Μόνο μικρό επιλεγμένο υποσύνολο | Δ/Ι | Μερική / λειτουργία συμβατότητας Zakura | Διαφορετικό API |
| Μοντέλο custody | Ο διαχειριστής κρατά τα κλειδιά στο `wallet.db` | Server ανακτήσιμος από seed | Κλειδιά στη συσκευή του χρήστη | Χωρίς πορτοφόλι | Χωρίς κλειδιά |

Τα Zallet και **zecd** μπορούν και τα δύο να βρίσκονται μπροστά από το Zebra. Επίλεξε το Zallet όταν χρειάζεσαι την επιφάνεια πορτοφολιού `z_*` και μια διαδρομή μετάβασης από το `wallet.dat`. Επίλεξε το zecd όταν θέλεις έναν server με προτεραιότητα στα θωρακισμένα που ρητά *δεν* είναι αντίγραφο του `zcashd`.

Υπάρχει ξεχωριστό καταναλωτικό προϊόν στο [zallet.io](https://www.zallet.io/) που επαναχρησιμοποιεί το όνομα. Αυτή η εφαρμογή δεν είναι το παρόν έργο.

---

## Σχετικές σελίδες

- [Πλήρεις κόμβοι](Full_Nodes.md) — Zebra, Zakura και ο αποσυρμένος κόμβος `zcashd`
- [Πλήρης κόμβος Zebra](Zebra_Full_Node.md) — ο κόμβος που διαβάζει το προεπιλεγμένο backend του Zallet
- [Κόμβος Zakura](Zakura_Node.md) — εναλλακτικός κόμβος επικύρωσης
- [Zaino](Zaino.md) — backend indexer και server light-client
- [zecd](ZECD.md) — άλλη σχεδίαση wallet-server πάνω στο librustzcash
- [Συγχρονισμός πορτοφολιού Zcash](Zcash_Wallet_Syncing.md) — πώς τα θωρακισμένα πορτοφόλια σαρώνουν την αλυσίδα
- [Viewing Keys](Viewing_Keys.md)

## Πόροι

- [Βιβλίο του Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet στο GitHub](https://github.com/zcash/zallet)
- [Εκδόσεις](https://github.com/zcash/zallet/releases)
- [Τροποποιημένη σημασιολογία JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Οδηγός μετάβασης ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Οδηγός Raspberry Pi ZecHub (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (compose stack Zebra + Zallet)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
