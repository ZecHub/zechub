# Το Devtool του Zcash

[Τι είναι το zcash-devtool;](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Το Devtool του Zcash είναι μια πλατφόρμα για ανάπτυξη πάνω στο Zcash. Δημιουργήθηκε από προγραμματιστές, για προγραμματιστές, για δοκιμές και ανάπτυξη νέας λειτουργικότητας του Zcash· και δεν πρέπει να θεωρείται έτοιμο για παραγωγική χρήση. Το API γραμμής εντολών που εκθέτει αυτό το εργαλείο μπορεί και θα αλλάξει οποιαδήποτε στιγμή και χωρίς προειδοποίηση. ΜΗ ΔΕΣΜΕΥΕΙΣ σημαντικά κεφάλαια στη διαχείριση του ενσωματωμένου πορτοφολιού του zcash-devtool.

### Βίντεο με οδηγίες για το Devtool του Zcash:
Ο Kris Nuttycombe (@nuttycom) παρουσίασε αυτό το εργαλείο κατά τη διάρκεια του ZconVI.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: the Zcash development multitool with Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Για έναν οδηγό βήμα προς βήμα σχετικά με το πώς να ξεκινήσεις να χρησιμοποιείς αυτά τα εργαλεία, δες [αυτόν τον οδηγό](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Περιγράφει πλήρως πώς να ρυθμίσεις και να χρησιμοποιήσεις τα εργαλεία του zcash devtool. Σκοπός του είναι να χρησιμεύσει ως οδηγός για τη ρύθμιση και την προσθήκη της δικής σου λειτουργικότητας στο εργαλείο.

## Γρήγορη εκκίνηση

Οι παρακάτω εντολές ελέγχθηκαν με το zcash-devtool `main` (commit `5a26ee8`, Αύγουστος 2026). Το εργαλείο αλλάζει χωρίς προειδοποίηση, οπότε εκτέλεσε το `--help` σε οποιαδήποτε εντολή, αν κάτι εδώ δεν αντιστοιχεί πλέον.

### Εγκατάσταση

Δεν υπάρχουν προδημιουργημένα binaries. Εγκατέστησε το [Rust](https://rustup.rs) και, στη συνέχεια, κάνε build από τον πηγαίο κώδικα:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Τα παρακάτω παραδείγματα καλούν το binary που δημιουργήθηκε, `target/release/zcash-devtool`. Το `cargo run --release -- ...` λειτουργεί με τον ίδιο τρόπο.

### Δημιούργησε ένα πορτοφόλι testnet

Ξεκίνα στο testnet. Τα νομίσματα testnet (TAZ) δεν έχουν αξία.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- Το `-w` είναι ο κατάλογος του πορτοφολιού. Τοποθετείται μετά το `wallet` και πριν από την υποεντολή.
- Το `-i` είναι ένα αρχείο ταυτότητας [age](https://age-encryption.org). Η μνημονική φράση του πορτοφολιού κρυπτογραφείται σε αυτό και το αρχείο δημιουργείται αν δεν υπάρχει. Κράτησέ το: το `send`, το `shield` και άλλες εντολές δαπάνης το χρειάζονται για να αποκρυπτογραφήσουν τη φράση ανάκτησης.
- Το `-n` είναι το δίκτυο: `test` ή `main`.
- Το `-s` επιλέγει τον διακομιστή light wallet. Η προεπιλογή, `zecrocks`, συνδέεται στον διακομιστή zec.rocks για το επιλεγμένο δίκτυο.
- Για να επαναφέρεις ένα υπάρχον πορτοφόλι, χρησιμοποίησε το `restore-mnemonic` αντί για το `init`. Θα σου ζητήσει τη φράση.

Το `balance` εμφανίζει κάθε pool ξεχωριστά, συμπεριλαμβανομένου του Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Εκτέλεσε το `zcash-devtool wallet -w ./my-wallet list-addresses` για να δεις την ενοποιημένη διεύθυνση του πορτοφολιού και στείλε της κεφάλαια testnet από ένα [faucet](https://zechub.wiki/using-zcash/faucets).

Για το mainnet, πέρασε το `-n main` στο `init`. Χρησιμοποίησε μόνο ποσά που μπορείς να αντέξεις να χάσεις.

### Στείλε και θωράκισε

Τα ποσά είναι σε zatoshis (1 ZEC = 100.000.000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

Το `propose` εμφανίζει τη συναλλαγή που θα δημιουργούσε ένα `send`, χωρίς να την αποστείλει. Τα `list-tx` και `list-unspent` εμφανίζουν το ιστορικό και τα notes του πορτοφολιού.

Κάθε εντολή που επικοινωνεί με έναν διακομιστή δέχεται επίσης το `--connection tor`, το οποίο δρομολογεί τη σύνδεση μέσω του ενσωματωμένου client του Tor.

### Επιθεώρησε διευθύνσεις, κλειδιά και συναλλαγές

Το `inspect` αποκωδικοποιεί δεδομένα του Zcash εκτός σύνδεσης: διευθύνσεις, κλειδιά και ακατέργαστες συναλλαγές. Πρόσθεσε το `--lookup` για να ανακτήσεις περισσότερες πληροφορίες από την αλυσίδα, όπως μια συναλλαγή βάσει του ID της.

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

Τα notes του Ironwood αποστέλλονται στον ίδιο δέκτη Orchard σε μια ενοποιημένη διεύθυνση, επομένως οι διευθύνσεις δεν άλλαξαν με το NU6.3.

### Δημιούργησε συναλλαγές σε βήματα με PCZTs

Ένα PCZT (μερικώς δημιουργημένη συναλλαγή Zcash) χωρίζει τη δημιουργία μιας συναλλαγής σε ξεχωριστά βήματα: δημιουργία, απόδειξη, υπογραφή και αποστολή. Κάθε βήμα μπορεί να εκτελεστεί σε διαφορετικό μηχάνημα, για παράδειγμα με έναν hardware signer όπως το Keystone. Κάθε εντολή `pczt` διαβάζει το PCZT από ένα αρχείο ή το stdin και το γράφει σε ένα αρχείο (`--output`) ή στο stdout, ώστε τα βήματα να μπορούν να συνδεθούν με pipe:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

Το `zcash-devtool pczt --help` παραθέτει τα άλλα βήματα, συμπεριλαμβανομένων των `inspect`, `redact`, `combine`, `extract` και `shield`.

### Μετέφερε κεφάλαια από το Orchard στο Ironwood

Από το NU6.3, τα κεφάλαια του Orchard μπορούν να μετακινηθούν μόνο στις διευθύνσεις του ίδιου του πορτοφολιού. Οι εντολές `migration` τα μεταφέρουν στο Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- Το `plan` προεπισκοπεί τους διαχωρισμούς των notes και το χρονοδιάγραμμα μεταφοράς και δεν αλλάζει τίποτα.
- Το `commit` δημιουργεί και προϋπογράφει τις πρώτες συναλλαγές προετοιμασίας. Πρόσθεσε το `--external` για να τις αφήσεις ανυπόγραφες για έναν εξωτερικό signer όπως το Keystone.
- Το `status` εμφανίζει την πρόοδο της μετεγκατάστασης και το επόμενο βήμα.
- Το `advance` αποδεικνύει την επόμενη συναλλαγή της οποίας το anchor είναι έτοιμο.

Οι εντολές μετεγκατάστασης βρίσκονται ακόμη υπό ανάπτυξη. Το `advance` σταματά στην πρώτη συναλλαγή που είναι έτοιμη για μετάδοση, επειδή η μετάδοση δεν έχει υλοποιηθεί ακόμη στο εργαλείο. Για καθημερινή χρήση, μετέφερε κεφάλαια με ένα πορτοφόλι που υποστηρίζει το Ironwood. Δες [Θωρακισμένα pools](https://zechub.wiki/using-zcash/shielded-pools).


**Προειδοποιήσεις ασφαλείας:**
ΜΗΝ ΤΟ ΧΡΗΣΙΜΟΠΟΙΕΙΣ ΣΕ ΠΑΡΑΓΩΓΙΚΟ ΠΕΡΙΒΑΛΛΟΝ!!!
Η εφαρμογή δεν έχει γραφτεί με γνώμονα την ασφάλεια. Ωστόσο, διαθέτει δυνατότητες όπως η κρυπτογράφηση των μνημονικών φράσεων ανάκτησης που θα πρέπει να την καθιστούν κατάλληλη για πειραματισμούς μικρής κλίμακας, με δική σου ευθύνη.

### Προχωρημένα (οδηγός librustzcash )


[δες το βίντεο εδώ](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
