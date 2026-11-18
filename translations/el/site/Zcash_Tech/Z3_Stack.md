<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Επεξεργασία σελίδας"/>
</a>

# Z3 Stack

Το **Z3 Stack** είναι η συσκευασμένη πλατφόρμα κόμβου του Zcash Foundation: **Zebra** (πλήρης κόμβος) + **Zallet** (πορτοφόλι πλήρους κόμβου), με προαιρετικό indexer **Zaino**. Προορίζεται να αντικαταστήσει μια αυτόνομη διεργασία `zcashd`, η οποία συνδύαζε τη συναίνεση και ένα πορτοφόλι σε ένα εκτελέσιμο αρχείο και έφτασε στο τέλος της ζωής της στις 18 Ιουλίου 2026.

Η υλοποίηση αναφοράς είναι το έργο Compose Docker στη διεύθυνση [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

> **Κατάσταση, 14 Νοεμβρίου 2026: οι προεπιλεγμένες εκδόσεις είναι παλαιότερες από το NU7.** Το `docker-compose.yml` του Z3 άλλαξε τελευταία φορά στις 10 Αυγούστου 2026. Εξακολουθεί να κλειδώνει τα `zfnd/zebra:6.2.3` και `zodlinc/zallet:v0.1.0-beta.1`, που ξεκίνησε ως το δυαδικό αρχείο `zallet-zaino`. Το [NU7](NU7.md) ενεργοποιήθηκε στο Mainnet στο μπλοκ 3.543.405 στις 6 Νοεμβρίου 2026, και μόνο το Zebra 7.0.0 ή νεότερη έκδοση το ακολουθεί: ένα Zebra 6.x παραμένει στους παλιούς κανόνες και αποσυνδέεται από την πραγματική αλυσίδα. Το Zallet v0.1.0-beta.4, η πρώτη έκδοση που ακολουθεί το NU7, δεν περιλαμβάνει πλέον καθόλου το `zallet-zaino`. Έλεγξε το αποθετήριο για νεότερες εκδόσεις πριν από την ανάπτυξη. Αν αντικαταστήσεις μόνος σου τις εικόνες, σημείωσε ότι το υπόλοιπο backend `zebra` του Zallet διαβάζει απευθείας τον κατάλογο κατάστασης του Zebra, οπότε το Zallet πρέπει να εκτελείται στον ίδιο κεντρικό υπολογιστή και να έχει πρόσβαση σε αυτόν τον κατάλογο ([Zallet](Zallet.md)).

---

## Με λίγα λόγια

* Το Z3 **δεν είναι νέος client συναίνεσης**. Είναι ο τρόπος να εκτελείς μαζί το stack μετά το `zcashd`: το Zebra επικυρώνει την αλυσίδα, το Zallet κρατά τα κλειδιά και παρέχει wallet RPC, ενώ το Zaino (προαιρετικά) υποστηρίζει το πρωτόκολλο gRPC lightwalletd.
* Το `zcashd` συνδύαζε κόμβο και πορτοφόλι. Το Z3 **διαχωρίζει αυτούς τους ρόλους**. Τα ανταλλακτήρια, τα mining pools και άλλοι πάροχοι πορτοφολιών πλήρους κόμβου μεταβαίνουν σε αυτόν τον συνδυασμό αντί να χρησιμοποιούν μόνο το Zebra.
* Τρία απομονωμένα έργα Compose μπορούν να εκτελούνται σε έναν κεντρικό υπολογιστή: **mainnet**, **testnet** και **regtest**.
* Ο πρώτος συγχρονισμός του Mainnet διαρκεί περίπου **24–72 ώρες** και απαιτεί περίπου **300 GB**. Το Regtest ξεκινά σε δευτερόλεπτα και είναι το κατάλληλο μέρος για να μάθεις το stack.
* Στην εικόνα Z3 που είναι κλειδωμένη σε συγκεκριμένη έκδοση, το Zallet εκτελεί το backend `zallet-zaino` του (βιβλιοθήκες indexer του Zaino) και επικοινωνεί με το Zebra μέσω JSON-RPC. Το Zallet αφαίρεσε αυτό το backend στην έκδοση v0.1.0-beta.4· το τρέχον Zallet διαβάζει απευθείας την κατάσταση του Zebra. Η αυτόνομη υπηρεσία Zaino χρειάζεται μόνο αν θέλεις ένα endpoint συμβατό με lightwalletd για εξωτερικά πορτοφόλια.
* Το Zallet είναι σε **beta**. Οι αλλαγές που καταργούν την προηγούμενη συμβατότητα μπορεί να απαιτήσουν τη διαγραφή και την εκ νέου δημιουργία του πορτοφολιού. Μην το θεωρείς ολοκληρωμένο λογισμικό φύλαξης για μεγάλα ποσά.

---

## Γιατί υπάρχει το Z3

Για το μεγαλύτερο μέρος της ζωής του Zcash, το `zcashd` ήταν τόσο ο πλήρης κόμβος αναφοράς όσο και το μοναδικό πορτοφόλι πλήρους κόμβου για παραγωγική χρήση. Αυτό ήταν το μοντέλο με το οποίο ενσωματώθηκαν τα ανταλλακτήρια, τα pools και οι custodial υπηρεσίες.

Το `zcashd` έχει αποσυρθεί. Η συναίνεση πέρασε στα [Zebra](/zcash-tech/zebra-full-node) (και πλέον και στα [Zakura](/zcash-tech/zakura-node)). Το ενσωματωμένο πορτοφόλι πέρασε στα [Zallet](https://github.com/zcash/zallet). Η παροχή υπηρεσιών για light wallet μεταβαίνει από τα [lightwalletd](/zcash-tech/lightwallet-nodes) στα [Zaino](/zcash-tech/zaino).

Αυτά τα τρία μέρη βρίσκονται σε ξεχωριστά αποθετήρια, έχουν ξεχωριστούς κύκλους εκδόσεων και ξεχωριστές ρυθμίσεις. Το Z3 τα συνδέει: εικόνες κλειδωμένες σε συγκεκριμένες εκδόσεις, έλεγχοι κατάστασης που κρατούν το πορτοφόλι εκτός λειτουργίας μέχρι να συγχρονιστεί ο κόμβος, θύρες και τόμοι ανά δίκτυο, καθώς και τεκμηριωμένη διαδικασία για τους διαχειριστές.

Το όνομα είναι ανεπίσημη συντομογραφία που χρησιμοποιείται στο οικοσύστημα — Zebra, Zaino, Zallet — παρόλο που το προεπιλεγμένο αρχείο Compose εκκινεί μόνο τα Zebra και Zallet. Το Zaino είναι προφίλ Compose, όχι υποχρεωτική τρίτη διεργασία.

---

## Αρχιτεκτονική

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| Στοιχείο | Ρόλος στο Z3 | Απαιτείται; |
| --- | --- | --- |
| **Zebra** | Συγχρονίζει και επικυρώνει την αλυσίδα, διαδίδει δεδομένα στο δίκτυο, παρέχει JSON-RPC και endpoint κατάστασης | Ναι |
| **Zallet** | Πορτοφόλι πλήρους κόμβου. Η εικόνα pinned beta.1 εκτελεί το backend της βιβλιοθήκης Zaino (`zallet-zaino`, αφαιρέθηκε στην έκδοση beta.4 του Zallet) και συνδέεται απευθείας στο JSON-RPC του Zebra. **Δεν** καλεί το αυτόνομο container Zaino | Ναι |
| **Zaino** | Αυτόνομος indexer. gRPC συμβατό με lightwalletd για εξωτερικά light clients, καθώς και proxy JSON-RPC για block explorers και faucets | Όχι — `--profile indexer` |

Το Z3 κλειδώνει τις εκδόσεις εικόνων στο `docker-compose.yml`. Παράκαμψε τις προεπιλογές με `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` ή `Z3_ZALLET_IMAGE` αν χρειάζεσαι διαφορετικό tag.

---

## Πώς διαφέρει από το zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Γλώσσα | C++ (fork του Bitcoin) | υπηρεσίες Rust, οργανωμένες με Compose του Docker |
| Μοντέλο διεργασιών | Ένα δυαδικό αρχείο: κόμβος + πορτοφόλι | Ξεχωριστά containers για τον κόμβο και το πορτοφόλι |
| Συναίνεση | Αποσύρθηκε (EOS 18 Ιουλίου 2026) | Zebra (ή άλλος συμβατός κόμβος) |
| Πορτοφόλι | Ενσωματωμένο `wallet.dat` | Zallet, κατάλογος δεδομένων κρυπτογραφημένος με age |
| Light clients | Συνήθως ξεχωριστό lightwalletd | Προαιρετικό προφίλ Zaino |
| Ρύθμιση | `zcash.conf` | Αρχεία ανά δίκτυο στο `config/<network>/` και αρχεία env του Compose |
| Δίκτυα σε έναν κεντρικό υπολογιστή | Δύσκολες συγκρούσεις θυρών | Ενσωματωμένη υποστήριξη: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Αν εξακολουθείς να έχεις πορτοφόλι `zcashd`, χρησιμοποίησε τον [οδηγό μετάβασης](/guides/migration-guide-zcashd-to-zebrad-zallet) του ZecHub και την εντολή `migrate-zcashd-wallet` του Zallet, αντί να αντιγράψεις το `wallet.dat` στον τόμο του Z3.

---

## Δίκτυα

Το Z3 αποτελείται από τρία ανεξάρτητα έργα Compose. Δεν μοιράζονται θύρες ή τόμους.

| Δίκτυο | Όνομα έργου | Χρήση | Πρώτος συγχρονισμός | Πραγματικά κεφάλαια |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Παραγωγή | 24–72 ώρες | Ναι |
| **testnet** | `z3-testnet` | Σταδιοποίηση στο δημόσιο δίκτυο δοκιμών | 2–12 ώρες | Όχι (test ZEC) |
| **regtest** | `z3-regtest` | Τοπική εξάσκηση: άμεσα μπλοκ, χωρίς peers | Δευτερόλεπτα | Όχι |

Αν είσαι νέος διαχειριστής, ξεκίνα με **regtest**, επιβεβαίωσε τις ροές RPC και πορτοφολιού και μετά πέρασε στο testnet ή στο mainnet.

---

## Προεπιλεγμένες θύρες κεντρικού υπολογιστή

Και τα τρία δίκτυα προορίζονται να συνυπάρχουν σε ένα μηχάνημα. Οι παρακάτω τιμές είναι οι δημοσιευμένες προεπιλογές· μπορείς να αλλάξεις καθεμία μέσω της αντίστοιχης μεταβλητής περιβάλλοντος `Z3_*`. Ο επίσημος πίνακας είναι [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Υπηρεσία | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC του Zebra | 8232 | 18232 | 29232 |
| P2P του Zebra | 8233 | 18233 | (δεν δημοσιεύεται) |
| Έλεγχος κατάστασης του Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC του Zaino (προφίλ indexer) | 8137 | 18137 | 28137 |
| JSON-RPC του Zaino (προφίλ indexer) | 8237 | 18237 | 28237 |
| RPC του Zallet | 28232 | 40232 | 50232 |

Μέσα στο δίκτυο Compose, μπορείς να εντοπίσεις τις υπηρεσίες με το όνομά τους (`zebra`, `zaino`, `zallet`).

---

## Δεδομένα και αντίγραφα ασφαλείας

| Τόμος | Περιεχόμενα | Να δημιουργήσεις αντίγραφο ασφαλείας; |
| --- | --- | --- |
| `z3-<network>-chain` | Κατάσταση αλυσίδας του Zebra (~300 GB στο mainnet) | Προαιρετικά — μπορείς να τον συγχρονίσεις ξανά |
| `z3-<network>-zallet` | Κρυπτογραφημένη βάση δεδομένων πορτοφολιού **και** η ταυτότητα age που την ξεκλειδώνει | **Ναι — αυτός είναι ο μόνος τόμος για τον οποίο απαιτείται αντίγραφο ασφαλείας** |
| `z3-<network>-zaino` | Κατάσταση indexer (μόνο με το προφίλ indexer) | Προαιρετικά — μπορείς να τον δημιουργήσεις ξανά |
| `z3-<network>-cookie` | Cookie RPC του Zebra | Όχι — δημιουργείται ξανά |

Για να αποθηκεύσεις την κατάσταση της αλυσίδας σε άλλον δίσκο πριν από την πρώτη εκκίνηση:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

Το `docker compose --env-file .env.<network> --profile "*" down` σταματά το stack και διατηρεί τους τόμους. Η προσθήκη του `-v` τους διαγράφει και επιβάλλει πλήρη επανασυγχρονισμό. Συμπερίλαβε το `--profile "*"` ώστε οι υπηρεσίες που ελέγχονται μέσω προφίλ (indexer, παρακολούθηση) να τερματιστούν πραγματικά.

---

## Ξεκίνα

Προαπαιτούμενα: Docker Engine, Compose Docker v2.24.4+, Git. Το `openssl` απαιτείται μόνο για το regtest.

### Regtest (ο πιο γρήγορος τρόπος να δεις το stack)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Δες το [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) για εντολές δοκιμών.

### Mainnet (εκκίνηση σε δύο φάσεις)

Το Zebra πρέπει να ολοκληρώσει τον συγχρονισμό πριν γίνει χρήσιμο το Zallet. Αν ξεκινήσεις νωρίς το Zallet, θα μπει σε βρόχο επανεκκίνησης μέχρι να ισχύει το `/ready`.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

Το Testnet ακολουθεί την ίδια διαδικασία με τα `.env.testnet` και `./scripts/check-zebra-readiness.sh 18080`.

Οι αλλαγές στο `config/<network>/` παραμένουν τοπικές και διατηρούνται μετά το `git pull`.

### Προαιρετικά προφίλ

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Οι προεπιλεγμένες θύρες Grafana είναι 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Σημειώσεις για διαχειριστές

* **Εκδόσεις εικόνων κλειδωμένες σε συγκεκριμένες εκδόσεις.** Το Z3 δεν μεταβαίνει σιωπηρά σε νεότερες εκδόσεις του `:latest`. Αναβάθμισε μια κλειδωμένη έκδοση με αλλαγή που έχει ελεγχθεί ή όρισε το `Z3_<SERVICE>_IMAGE`. Οι εκδόσεις δεν έχουν αλλάξει από τον Αύγουστο του 2026, επομένως είναι παλαιότερες από το NU7 (δες τη σημείωση κατάστασης στην αρχή).
* **Containers χωρίς δικαιώματα root.** Αφαιρούνται οι δυνατότητες Linux. Οι έλεγχοι κατάστασης κρατούν το πορτοφόλι εκτός λειτουργίας μέχρι να είναι έτοιμο το Zebra. Η πολιτική επανεκκίνησης είναι ενεργή από προεπιλογή.
* **Αρχεία καταγραφής.** Το Z3 δεν ορίζει πρόγραμμα οδήγησης καταγραφής. Όρισε όρια μεγέθους στη ρύθμιση daemon του Docker, αλλιώς τα αρχεία καταγραφής θα αυξάνονται απεριόριστα σε έναν κόμβο που λειτουργεί όλο το 24ωρο.
* **P2P.** Το Mainnet και το testnet δημοσιεύουν τη θύρα P2P του Zebra. Αν βρίσκεσαι πίσω από NAT, όρισε το `ZEBRA_NETWORK__EXTERNAL_ADDR` στη διεύθυνση στην οποία πρέπει να συνδέονται οι peers. Το Regtest δεν έχει peers.
* **Zaino σε ARM.** Η εικόνα Zaino upstream υποστηρίζει μόνο `linux/amd64`. Σε Apple Silicon εκτελείται με εξομοίωση, εκτός αν κάνεις build από τον πηγαίο κώδικα. Τα Zebra και Zallet υποστηρίζουν πολλές αρχιτεκτονικές.
* **Κοινόχρηστοι κεντρικοί υπολογιστές.** Δεν ορίζονται όρια CPU ή μνήμης από προεπιλογή. Πρόσθεσε το `deploy.resources.limits` σε αρχείο παράκαμψης, αν το μηχάνημα δεν προορίζεται αποκλειστικά για τον κόμβο.

Λίστα ελέγχου για παραγωγική χρήση και συχνές ερωτήσεις: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Ποιοι πρέπει να εκτελούν το Z3

**Κατάλληλο για**

* Ανταλλακτήρια, custodial υπηρεσίες και mining pools που χρησιμοποιούσαν το `zcashd` ως κόμβο μαζί με πορτοφόλι
* Διαχειριστές που θέλουν υποστηριζόμενο RPC πορτοφολιού πλήρους κόμβου συνδεδεμένο με συγχρονισμένο Zebra
* Προγραμματιστές που χρειάζονται ταυτόχρονα mainnet, testnet και regtest
* Όποιον θέλει να δημιουργήσει ένα ιδιωτικό endpoint συμβατό με lightwalletd μέσω του προφίλ Zaino

**Συνήθως ακατάλληλο για**

* Τελικούς χρήστες που χρειάζονται μόνο να στέλνουν και να λαμβάνουν ZEC — χρησιμοποίησε ένα light wallet, όπως το ZODL / Zashi, το Zingo ή το Zkool (τον συντηρούμενο διάδοχο του YWallet)
* Όσους θέλουν μόνο να επικυρώνουν την αλυσίδα — εκτέλεσε μόνο το Zebra (ή το Zakura)
* Όσους θέλουν μόνο να παρέχουν compact blocks — εκτέλεσε τα Zebra + Zaino ή τα Zebra + lightwalletd, χωρίς το Zallet

---

## Σχετικές σελίδες

* [Zebra Πλήρης κόμβος](/zcash-tech/zebra-full-node) — κόμβος συναίνεσης που περιλαμβάνει το Z3
* [Zaino](/zcash-tech/zaino) — προαιρετικό προφίλ indexer
* [Πλήρεις κόμβοι](/zcash-tech/full-nodes) — τα Zebra, Zakura και το αποσυρμένο zcashd
* [Κόμβοι Lightwallet](/zcash-tech/lightwallet-nodes) — με τι επικοινωνούν τα light clients
* [Zakura Κόμβος](/zcash-tech/zakura-node) — εναλλακτικός πλήρης κόμβος· δεν περιλαμβάνεται στο σημερινό Z3
* [Οδηγός μετάβασης: zcashd σε Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Πόροι για προγραμματιστές](/start-here/developer-resources)

---

## Πόροι

* [Αποθετήριο του Z3](https://github.com/ZcashFoundation/z3)
* [Σύμβαση του Z3 (θύρες, τόμοι, ονόματα έργων)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Το βιβλίο του Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Το βιβλίο του Zallet](https://zcash.github.io/zallet/)
* [Zcash Κοινοτικό φόρουμ — ενημερώσεις για το Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Εκκινητής Z3](https://github.com/Jubrilabdulazeez/z3-launcher) — κοινοτικό επίπεδο ελέγχου πάνω από την επίσημη στοίβα Compose (ZecHub Hackathon)
