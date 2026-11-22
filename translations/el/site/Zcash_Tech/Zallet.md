<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Επεξεργασία σελίδας"/>
</a>

# Zallet

Το Zallet είναι ένα πορτοφόλι Zcash πλήρους κόμβου γραμμένο σε Rust. Είναι η αντικατάσταση του πορτοφολιού που ήταν ενσωματωμένο στο `zcashd`. Αφού το `zcashd` έφτασε στη διακοπή Τέλους Υποστήριξης στις 18 Ιουλίου 2026, στο ύψος μπλοκ 3417100, οι αρμοδιότητες συναίνεσης και πορτοφολιού διαχωρίστηκαν: τα **Zebra** ή **Zakura** επικυρώνουν την αλυσίδα και το **Zallet** διατηρεί τα κλειδιά, σαρώνει notes και εκθέτει το JSON-RPC του πορτοφολιού.

Το Zallet βρίσκεται επί του παρόντος σε **beta**. Δεν έχει ελεγχθεί πλήρως. Αλλαγές που δεν διατηρούν τη συμβατότητα ενδέχεται να απαιτήσουν τη διαγραφή και επαναδημιουργία του πορτοφολιού. Μην το θεωρείς production custody για μεγάλα ποσά ZEC χωρίς να διαβάσεις τις προειδοποιήσεις ασφαλείας στο [Βιβλίο του Zallet](https://zcash.github.io/zallet/).

---

## Με λίγα λόγια

- Το Zallet είναι ένα **πορτοφόλι RPC πλήρους κόμβου**, όχι ένα mobile light wallet και όχι ένας κόμβος συναίνεσης.
- Αντικαθιστά το μισό του πορτοφολιού του `zcashd`. Το μισό του κόμβου είναι το [Zebra](Zebra_Full_Node.md) ή το [Zakura](Zakura_Node.md).
- Είναι γραμμένο σε **Rust**, με διπλή άδεια MIT / Apache-2.0, και συντηρείται στο [zcash/zallet](https://github.com/zcash/zallet).
- Η πιο πρόσφατη δημοσιευμένη έκδοση είναι η **v0.1.0-beta.4** (2 Νοεμβρίου 2026). Ακολουθεί τα [NU7](NU7.md) και χρειάζεται `zebrad` **7.0.0 ή νεότερη έκδοση**.
- Διαβάζει δεδομένα αλυσίδας μέσω ενός backend, του **zebra**: `ReadStateService` έναντι του καταλόγου κατάστασης ενός `zebrad` στον ίδιο υπολογιστή, καθώς και το JSON-RPC του Zebra. Το backend Zaino καταργήθηκε στην έκδοση v0.1.0-beta.4.
- Εκθέτει ένα υποσύνολο JSON-RPC συμβατό με το **zcashd**. Ορισμένες μέθοδοι άλλαξαν· άλλες παραλείφθηκαν σκόπιμα.
- Το υλικό κλειδιών κρυπτογραφείται πάντα με **age**. Το ιστορικό συναλλαγών, οι διευθύνσεις και τα viewing keys αποθηκεύονται χωρίς κρυπτογράφηση στο `wallet.db`.
- Περιλαμβάνει δύο binaries σε ένα υπογεγραμμένο archive: `zallet` (launcher) και `zallet-zebra`. **Μόνο Linux** για τον συγχρονισμό πορτοφολιού: κανένα backend αλυσίδας δεν εκτελείται ακόμα σε macOS ή Windows.
- Το `zallet backup` (νέο στην έκδοση beta.4) δημιουργεί ένα συνεπές στιγμιότυπο ενός πορτοφολιού που εκτελείται ή είναι σταματημένο.
- Επίσημη τεκμηρίωση: [Το Zallet Book](https://zcash.github.io/zallet/).

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
- Η σημασιολογία του RPC μπορεί να εξελιχθεί προς λογαριασμούς ZIP 32, ενοποιημένες διευθύνσεις και PCZTs αντί να παραμείνει παγωμένη στις ιδιομορφίες του `zcashd`.

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

Το Zallet χωρίζεται σε Cargo workspaces ώστε κάθε backend αλυσίδας να μπορεί να παρακολουθεί το δικό του dependency graph. Από την έκδοση v0.1.0-beta.4 διατίθεται μόνο το backend zebra.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

Και τα δύο binaries ανοίγουν την ίδια `wallet.db`. Μέχρι την έκδοση v0.1.0-beta.3 υπήρχε επίσης backend `zallet-zaino`. Αν το `zallet.toml` σου γράφει `backend = "zaino"`, άλλαξέ το σε `backend = "zebra"`. Η βάση δεδομένων του πορτοφολιού δεν χρειάζεται μετάβαση, και μπορείς να διαγράψεις τον παλιό φάκελο `zaino` από τον κατάλογο δεδομένων.

Το backend του zebra διαβάζει απευθείας τη βάση δεδομένων κατάστασης του `zebrad`, οπότε χρειάζεται ένα `zebrad` που έχει δημιουργηθεί με τη δυνατότητα `indexer` και τον κατάλογο κατάστασής του **στον ίδιο host**. Δεν υπάρχει υποστηριζόμενη διαμόρφωση όπου ένα Zallet σε ένα container επικοινωνεί μέσω δικτύου με ένα `zebrad` σε άλλο, μέχρι να προστεθεί ένα backend που λειτουργεί μόνο μέσω δικτύου ([zallet#900](https://github.com/zcash/zallet/pull/900)).

Τυπική ανάπτυξη:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Το Zallet είναι ένα **πορτοφόλι πλήρους κόμβου**: αναμένει έναν τοπικό κόμβο που επικυρώνει. Δεν είναι light client. Για light wallets και compact-block servers, δες τα [Zaino](Zaino.md) και [κόμβοι Lightwallet](Lightwallet_Nodes.md).

Η στοίβα compose του Zcash Foundation [Z3](https://github.com/ZcashFoundation/z3) εκτελεί μαζί τα Zebra + Zallet, με προαιρετικό αυτόνομο Zaino για εξωτερικά light client. Οι καρφιτσωμένες εικόνες του προηγούνται των NU7 και της beta.4 του Zallet: δες το [Z3 Stack](Z3_Stack.md) πριν το χρησιμοποιήσεις.

---

## Λογαριασμοί, διευθύνσεις και κλειδιά

Το Zallet βασίζεται σε λογαριασμούς ZIP 32, όχι στον μοναδικό έμμεσο λογαριασμό του `zcashd`.

- Ένα πορτοφόλι μπορεί να διατηρεί **πολλαπλά mnemonics BIP 39**. Κάθε mnemonic είναι ανεξάρτητη ρίζα δαπάνης, που προσδιορίζεται από ένα **seed fingerprint** (`zip32seedfp1…`).
- Οι **λογαριασμοί** παράγονται από ένα seed με δείκτη λογαριασμού ZIP 32. Μέσα σε ένα instance Zallet έχουν επίσης ένα τοπικό **UUID**. Η φορητή ταυτότητα ενός λογαριασμού είναι `(seedfp, account index)`.
- Οι διευθύνσεις είναι **ενοποιημένες διευθύνσεις ZIP 316**, που παράγονται με `z_getaddressforaccount`. Ένας λογαριασμός μπορεί να έχει πολλές διαφοροποιημένες διευθύνσεις· οι θωρακισμένοι δέκτες δεν συνδέονται μεταξύ τους on-chain.
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

Η χειροκίνητη αντιγραφή του `wallet.db` ενώ εκτελείται το Zallet δεν είναι ασφαλές αντίγραφο ασφαλείας: το SQLite μπορεί να καταστραφεί. Από την έκδοση v0.1.0-beta.4, χρησιμοποίησε την εντολή [`backup`](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md):

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

Δημιουργεί ένα συνεπές ως προς τις συναλλαγές και ελεγμένο ως προς την ακεραιότητα στιγμιότυπο ενός πορτοφολιού που εκτελείται ή έχει σταματήσει. Αν του δώσεις έναν κατάλογο, ονομάζει το αρχείο `zallet-wallet-backup-<UTC time>.db` και δεν αντικαθιστά ποτέ ένα υπάρχον αρχείο. Εγκαταλείπει με σαφές μήνυμα έπειτα από δέκα λεπτά, αν οι συνεχείς εγγραφές στο πορτοφόλι (για παράδειγμα, κατά τον αρχικό συγχρονισμό) προκαλούν επανειλημμένες επανεκκινήσεις της αντιγραφής: δοκίμασε ξανά αργότερα ή σταμάτησε πρώτα το πορτοφόλι. Το αντίγραφο ασφαλείας **δεν** περιλαμβάνει το αρχείο ταυτότητας age. Δημιούργησε αντίγραφο ασφαλείας του μία φορά και φύλαξέ το χωριστά από τα αντίγραφα ασφαλείας της βάσης δεδομένων, επειδή όποιος έχει και τα δύο μπορεί να αποκρυπτογραφήσει τα κλειδιά.

---

## JSON-RPC

Το Zallet υλοποιεί ένα υποσύνολο των RPC πορτοφολιού `zcashd` μέσω HTTP με Basic auth. Κάνε bind στο loopback. Η απομακρυσμένη χρήση πρέπει να περνά μέσα από κρυπτογραφημένο tunnel. Το `rpc.allow_insecure_remote_bind` υπάρχει και δεν είναι ασφαλές.

Αξιοσημείωτες διαφορές από το `zcashd`:

- Τα πεδία υπολοίπου στο `getwalletinfo` είναι κενά. Χρησιμοποίησε τα `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Τα τέλη ακολουθούν το **ZIP 317**. Δεν υπάρχει `settxfee`.
- Η κατασκευή δαπάνης μεταφέρεται σε **PCZTs** (μερικώς δημιουργημένες συναλλαγές Zcash, ZIP 374). Τα RPC PCZT προστέθηκαν στη σειρά beta.
- Ένα καθολικό **sync lock** μπλοκάρει τα RPC υπολοίπου και δαπάνης ενώ το πορτοφόλι ενημερώνεται ή ανακάμπτει από reorg (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Οι σκόπιμα παραλειπόμενες μέθοδοι περιλαμβάνουν τις `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` και `encryptwallet`. Οι αντικαταστάσεις παρατίθενται στο [Βιβλίο του Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Ξεκινώντας

Οι επίσημοι τρόποι εγκατάστασης (πακέτα Debian, Docker, δυαδικά αρχεία έκδοσης) περιγράφονται στον [οδηγό εγκατάστασης](https://zcash.github.io/zallet/guide/installation/index.html). Τα αρχεία της έκδοσης ονομάζονται `zallet-v<version>-linux-<amd64|arm64>.tar.gz` και περιέχουν τα `zallet` και `zallet-zebra`. Οι εικόνες Docker δημοσιεύονται ως `zodlinc/zallet`.

Ελάχιστη ροή νέου πορτοφολιού:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, indexer.validator_address, [indexer.read_state_service], rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Όρισε το `[indexer]` να δείχνει στο τοπικό endpoint JSON-RPC του `zebrad` με το `validator_address`. Είναι υποχρεωτικό και δεν έχει ως προεπιλογή το localhost. Το backend του zebra χρειάζεται επίσης το `[indexer.read_state_service]` και ένα `zebrad` έκδοσης 7.0.0 ή νεότερης, μεταγλωττισμένο με τη δυνατότητα `indexer`, του οποίου ο κατάλογος κατάστασης βρίσκεται στον ίδιο κεντρικό υπολογιστή, ώστε το Zallet να μπορεί να διαβάζει απευθείας την κατάσταση της αλυσίδας. Το `indexer.db_path` ρύθμιζε μόνο το καταργημένο backend Zaino: πλέον αγνοείται και εμφανίζεται προειδοποίηση.

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

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| Τι είναι | Πορτοφόλι RPC πλήρους κόμβου | Διακομιστής πορτοφολιού με προτεραιότητα στα θωρακισμένα | Πορτοφόλια τελικών χρηστών | Κόμβος συναίνεσης | Ευρετήριο / αντικατάσταση lightwalletd |
| Τι αντικαθιστά | Πορτοφόλι `zcashd` | Δεν είναι άμεσος κλώνος του `zcashd` | Εφαρμογές για κινητά και υπολογιστές | Κόμβο `zcashd` | `lightwalletd` |
| Χρειάζεται τοπικό κόμβο | Ναι | Ναι (Zebra από προεπιλογή) | Όχι (light client) | Είναι ο ίδιος ο κόμβος | Ναι |
| Συμβατότητα RPC του zcashd | Σχεδιάστηκε ως διαδρομή συμβατότητας | Μόνο ένα μικρό, επιλεγμένο υποσύνολο | Δεν εφαρμόζεται | Μερική / λειτουργία συμβατότητας Zakura | Διαφορετικό API |
| Μοντέλο φύλαξης | Ο χειριστής έχει τα κλειδιά στο `wallet.db` | Διακομιστής που ανακτάται με seed | Κλειδιά στη συσκευή του χρήστη | Χωρίς πορτοφόλι | Χωρίς κλειδιά |

Τα Zallet και **zecd** μπορούν και τα δύο να βρίσκονται μπροστά από το Zebra. Επίλεξε το Zallet όταν χρειάζεσαι την επιφάνεια πορτοφολιού `z_*` και μια διαδρομή μετάβασης από το `wallet.dat`. Επίλεξε το zecd όταν θέλεις έναν server με προτεραιότητα στα θωρακισμένα που ρητά *δεν* είναι αντίγραφο του `zcashd`.

Υπάρχει ξεχωριστό καταναλωτικό προϊόν στο [zallet.io](https://www.zallet.io/) που επαναχρησιμοποιεί το όνομα. Αυτή η εφαρμογή δεν είναι το παρόν έργο.

---

## Σχετικές σελίδες

- [Πλήρεις κόμβοι](Full_Nodes.md) — Zebra, Zakura και ο παρωχημένος κόμβος `zcashd`
- [Zebra πλήρης κόμβος](Zebra_Full_Node.md) — τα προεπιλεγμένα backend του κόμβου Zallet διαβάζουν
- [Zakura κόμβος](Zakura_Node.md) — εναλλακτικός κόμβος επικύρωσης
- [Zaino](Zaino.md) — ευρετήριο και διακομιστής light client (δεν είναι πλέον backend του Zallet από την beta.4)
- [Στοίβα Z3](Z3_Stack.md) — σύνθετη στοίβα των Zebra + Zallet
- [zecd](ZECD.md) — άλλο σχέδιο διακομιστή πορτοφολιού στο librustzcash
- [Zcash Συγχρονισμός πορτοφολιών](Zcash_Wallet_Syncing.md) — πώς τα θωρακισμένα πορτοφόλια σαρώνουν την αλυσίδα
- [Viewing keys](Viewing_Keys.md)

## Πόροι

- [Το Zallet βιβλίο](https://zcash.github.io/zallet/)
- [zcash/zallet στο GitHub](https://github.com/zcash/zallet)
- [Εκδόσεις](https://github.com/zcash/zallet/releases) · [αρχείο αλλαγών v0.1.0-beta.4](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [Αλλαγμένες σημασιολογίες JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub οδηγός μετάβασης](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub οδηγός Raspberry Pi (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet στοίβα compose)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
