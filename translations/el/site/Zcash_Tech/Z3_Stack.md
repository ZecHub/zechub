<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Στοίβα Z3

Η **Στοίβα Z3** είναι η πακεταρισμένη πλατφόρμα κόμβων του Zcash Foundation: **Zebra** (πλήρης κόμβος) + **Zallet** (πορτοφόλι πλήρους κόμβου), με έναν προαιρετικό indexer **Zaino**. Είναι η προβλεπόμενη αντικατάσταση μιας αυτόνομης διεργασίας `zcashd`, η οποία συνδύαζε τη συναίνεση και ένα πορτοφόλι σε ένα binary και έφτασε στο τέλος ζωής στις 18 Ιουλίου 2026.

Η υλοποίηση αναφοράς είναι το έργο Compose του Docker στο [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## Συνοπτικά

* Το Z3 **δεν είναι νέος client συναίνεσης**. Είναι ο τρόπος με τον οποίο εκτελείς μαζί τη στοίβα μετά το `zcashd`: το Zebra επαληθεύει την αλυσίδα, το Zallet διατηρεί τα κλειδιά και παρέχει wallet RPC, ενώ το Zaino (προαιρετικό) χρησιμοποιεί το πρωτόκολλο gRPC του lightwalletd.
* Το `zcashd` συνδύαζε κόμβο + πορτοφόλι. Το Z3 **διαχωρίζει αυτούς τους ρόλους**. Ανταλλακτήρια, pools εξόρυξης και άλλοι διαχειριστές πορτοφολιών πλήρους κόμβου μεταβαίνουν σε αυτόν τον συνδυασμό αντί μόνο στο Zebra.
* Τρία απομονωμένα έργα Compose μπορούν να εκτελούνται σε έναν host: **mainnet**, **testnet** και **regtest**.
* Ο πρώτος συγχρονισμός του mainnet διαρκεί περίπου **24–72 ώρες** και απαιτεί περίπου **300 GB**. Το regtest ξεκινά σε δευτερόλεπτα και είναι το σωστό περιβάλλον για να μάθεις τη στοίβα.
* Το Zallet ενσωματώνει τις βιβλιοθήκες indexer του Zaino και επικοινωνεί με το Zebra μέσω JSON-RPC. Η αυτόνομη υπηρεσία Zaino χρειάζεται μόνο αν θέλεις ένα endpoint συμβατό με lightwalletd για εξωτερικά πορτοφόλια.
* Το Zallet βρίσκεται σε **beta**. Οι ασύμβατες αλλαγές μπορεί να απαιτήσουν διαγραφή και επαναδημιουργία του πορτοφολιού. Μην το αντιμετωπίζεις ως ολοκληρωμένο λογισμικό custody για μεγάλα ποσά.

---

## Γιατί υπάρχει το Z3

Για το μεγαλύτερο μέρος της ζωής του Zcash, το `zcashd` ήταν ταυτόχρονα ο πλήρης κόμβος αναφοράς και το μοναδικό πορτοφόλι πλήρους κόμβου παραγωγής. Αυτή ήταν η σχεδίαση με την οποία ενσωματώθηκαν ανταλλακτήρια, pools και custodians.

Το `zcashd` έχει αποσυρθεί. Η συναίνεση μεταφέρθηκε στο [Zebra](/zcash-tech/zebra-full-node) (και πλέον επίσης στο [Zakura](/zcash-tech/zakura-node)). Το ενσωματωμένο πορτοφόλι μεταφέρθηκε στο [Zallet](https://github.com/zcash/zallet). Η εξυπηρέτηση light wallet μεταφέρεται από το [lightwalletd](/zcash-tech/lightwallet-nodes) στο [Zaino](/zcash-tech/zaino).

Αυτά τα τρία τμήματα είναι ξεχωριστά αποθετήρια, έχουν ξεχωριστούς κύκλους εκδόσεων και ξεχωριστές ρυθμίσεις. Το Z3 είναι η κόλλα: σταθεροποιημένα images, health checks που διατηρούν το πορτοφόλι ανενεργό μέχρι να συγχρονιστεί ο κόμβος, θύρες και volumes ανά δίκτυο και μια τεκμηριωμένη διαδρομή για τον διαχειριστή.

Το όνομα είναι ανεπίσημη συντομογραφία του οικοσυστήματος — Zebra, Zaino, Zallet — παρότι το προεπιλεγμένο αρχείο Compose ξεκινά μόνο τα Zebra και Zallet. Το Zaino είναι προφίλ Compose, όχι υποχρεωτική τρίτη διεργασία.

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
| **Zebra** | Συγχρονίζει και επαληθεύει την αλυσίδα, gossip, JSON-RPC, endpoint υγείας | Ναι |
| **Zallet** | Πορτοφόλι πλήρους κόμβου. Ενσωματώνει βιβλιοθήκες Zaino. Συνδέεται απευθείας στο JSON-RPC του Zebra. **Δεν** καλεί το αυτόνομο container Zaino | Ναι |
| **Zaino** | Αυτόνομος indexer. gRPC συμβατό με lightwalletd για εξωτερικούς light clients, καθώς και proxy JSON-RPC για explorers και faucets | Όχι — `--profile indexer` |

Το Z3 σταθεροποιεί τις εκδόσεις images στο `docker-compose.yml`. Παράκαμψέ τες με `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` ή `Z3_ZALLET_IMAGE` αν χρειάζεσαι διαφορετικό tag.

---

## Πώς διαφέρει από το zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Γλώσσα | C++ (fork του Bitcoin) | Υπηρεσίες Rust, ενορχηστρωμένες με Compose Docker |
| Μοντέλο διεργασιών | Ένα binary: κόμβος + πορτοφόλι | Ξεχωριστά containers κόμβου και πορτοφολιού |
| Συναίνεση | Αποσυρμένη (EOS 18 Ιουλίου 2026) | Zebra (ή άλλος συμβατός κόμβος) |
| Πορτοφόλι | Ενσωματωμένο `wallet.dat` | Zallet, datadir κρυπτογραφημένο με age |
| Light clients | Συνήθως ξεχωριστό lightwalletd | Προαιρετικό προφίλ Zaino |
| Ρυθμίσεις | `zcash.conf` | Αρχεία ανά δίκτυο κάτω από το `config/<network>/` συν αρχεία env του Compose |
| Δίκτυα σε έναν host | Δύσκολες συγκρούσεις θυρών | Πλήρης υποστήριξη: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Αν εξακολουθείς να έχεις πορτοφόλι `zcashd`, χρησιμοποίησε τον οδηγό μετεγκατάστασης του ZecHub στο [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) και την εντολή `migrate-zcashd-wallet` του Zallet αντί να αντιγράψεις το `wallet.dat` στο volume του Z3.

---

## Δίκτυα

Το Z3 αποτελείται από τρία ανεξάρτητα έργα Compose. Δεν μοιράζονται θύρες ή volumes.

| Δίκτυο | Όνομα έργου | Χρήση | Πρώτος συγχρονισμός | Πραγματικά κεφάλαια |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Παραγωγή | 24–72 ώρες | Ναι |
| **testnet** | `z3-testnet` | Staging στο δημόσιο δοκιμαστικό δίκτυο | 2–12 ώρες | Όχι (δοκιμαστικά ZEC) |
| **regtest** | `z3-regtest` | Τοπική εξάσκηση: άμεσα μπλοκ, χωρίς peers | Δευτερόλεπτα | Όχι |

Οι νέοι διαχειριστές πρέπει να ξεκινούν από το **regtest**, να επιβεβαιώνουν τις ροές RPC και πορτοφολιού και έπειτα να μεταβαίνουν σε testnet ή mainnet.

---

## Προεπιλεγμένες θύρες host

Και τα τρία δίκτυα προορίζονται να συνυπάρχουν σε ένα μηχάνημα. Οι παρακάτω τιμές είναι οι δημοσιευμένες προεπιλογές· καθεμία μπορεί να παρακαμφθεί μέσω της αντίστοιχης μεταβλητής env `Z3_*`. Ο κανονικός πίνακας είναι [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Υπηρεσία | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC Zebra | 8232 | 18232 | 29232 |
| P2P Zebra | 8233 | 18233 | (δεν έχει δημοσιευτεί) |
| Health Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC Zaino (προφίλ indexer) | 8137 | 18137 | 28137 |
| JSON-RPC Zaino (προφίλ indexer) | 8237 | 18237 | 28237 |
| RPC Zallet | 28232 | 40232 | 50232 |

Μέσα στο δίκτυο Compose, οι υπηρεσίες επιλύονται με όνομα (`zebra`, `zaino`, `zallet`).

---

## Δεδομένα και αντίγραφα ασφαλείας

| Volume | Τι περιέχει | Να δημιουργήσεις αντίγραφο ασφαλείας; |
| --- | --- | --- |
| `z3-<network>-chain` | Κατάσταση αλυσίδας Zebra (~300 GB mainnet) | Προαιρετικό — μπορεί να συγχρονιστεί ξανά |
| `z3-<network>-zallet` | Κρυπτογραφημένη βάση δεδομένων πορτοφολιού **και** το identity age που την ξεκλειδώνει | **Ναι — αυτό είναι το μοναδικό volume που πρέπει να έχει αντίγραφο ασφαλείας** |
| `z3-<network>-zaino` | Κατάσταση indexer (μόνο με το προφίλ indexer) | Προαιρετικό — μπορεί να ανακατασκευαστεί |
| `z3-<network>-cookie` | Cookie RPC Zebra | Όχι — αναδημιουργείται |

Για να τοποθετήσεις την κατάσταση της αλυσίδας σε άλλο δίσκο πριν από την πρώτη εκκίνηση:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

Το `docker compose --env-file .env.<network> --profile "*" down` σταματά τη στοίβα και διατηρεί τα volumes. Η προσθήκη του `-v` τα διαγράφει και επιβάλλει πλήρη επανασυγχρονισμό. Συμπερίλαβε το `--profile "*"` ώστε να τερματιστούν πραγματικά οι υπηρεσίες που ελέγχονται από προφίλ (indexer, monitoring).

---

## Ξεκινώντας

Προαπαιτούμενα: Engine Docker, Compose Docker v2.24.4+, Git. Το `openssl` απαιτείται μόνο για regtest.

### Regtest (ο ταχύτερος τρόπος για να δεις τη στοίβα)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Δες το [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) για εντολές δοκιμής.

### Mainnet (εκκίνηση δύο φάσεων)

Το Zebra πρέπει να ολοκληρώσει τον συγχρονισμό πριν γίνει χρήσιμο το Zallet. Η πρόωρη εκκίνηση του Zallet το οδηγεί σε βρόχο επανεκκίνησης έως ότου ισχύει το `/ready`.

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

Το testnet ακολουθεί την ίδια ροή με τα `.env.testnet` και `./scripts/check-zebra-readiness.sh 18080`.

Οι αλλαγές κάτω από το `config/<network>/` παραμένουν τοπικές και επιβιώνουν του `git pull`.

### Προαιρετικά προφίλ

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Οι προεπιλεγμένες θύρες Grafana είναι 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Σημειώσεις διαχειριστή

* **Σταθεροποιημένα images.** Το Z3 δεν μεταβαίνει σιωπηρά στο `:latest`. Ενημέρωσε ένα pin σε μια ελεγμένη αλλαγή ή όρισε το `Z3_<SERVICE>_IMAGE`.
* **Containers χωρίς root.** Οι δυνατότητες Linux αφαιρούνται. Τα health checks καθυστερούν το πορτοφόλι μέχρι να είναι έτοιμο το Zebra. Η πολιτική επανεκκίνησης είναι ενεργή από προεπιλογή.
* **Logs.** Το Z3 δεν ορίζει logging driver. Όρισε όρια μεγέθους στις ρυθμίσεις daemon του Docker, διαφορετικά τα logs μεγαλώνουν χωρίς όριο σε έναν κόμβο 24/7.
* **P2P.** Το mainnet και το testnet δημοσιεύουν τη θύρα P2P του Zebra. Πίσω από NAT, όρισε το `ZEBRA_NETWORK__EXTERNAL_ADDR` στη διεύθυνση που πρέπει να καλούν οι peers. Το regtest δεν έχει peers.
* **Zaino σε ARM.** Το upstream image Zaino είναι μόνο για `linux/amd64`. Σε Apple Silicon εκτελείται με εξομοίωση εκτός αν κάνεις build από τον πηγαίο κώδικα. Τα Zebra και Zallet είναι multi-arch.
* **Κοινόχρηστοι hosts.** Δεν ορίζονται όρια CPU ή μνήμης από προεπιλογή. Πρόσθεσε το `deploy.resources.limits` σε αρχείο override αν το μηχάνημα δεν είναι αφιερωμένο στον κόμβο.

Λίστα ελέγχου και FAQ για περιβάλλον παραγωγής: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Ποιος πρέπει να εκτελεί Z3

**Κατάλληλη επιλογή**

* Ανταλλακτήρια, custodians και pools εξόρυξης που χρησιμοποιούσαν το `zcashd` ως κόμβο-και-πορτοφόλι
* Διαχειριστές που θέλουν υποστηριζόμενο RPC πορτοφολιού πλήρους κόμβου σε συγχρονισμένο Zebra
* Προγραμματιστές που χρειάζονται mainnet, testnet και regtest δίπλα-δίπλα
* Οποιοσδήποτε δημιουργεί ιδιωτικό endpoint συμβατό με lightwalletd μέσω του προφίλ Zaino

**Συνήθως λάθος εργαλείο**

* Τελικοί χρήστες που χρειάζονται μόνο να στέλνουν και να λαμβάνουν ZEC — χρησιμοποίησε ένα light wallet όπως ZODL / Zashi, Zingo ή YWallet
* Άτομα που θέλουν μόνο να επαληθεύουν την αλυσίδα — εκτέλεσε μόνο το Zebra (ή το Zakura)
* Άτομα που θέλουν μόνο να εξυπηρετούν compact blocks — εκτέλεσε Zebra + Zaino ή Zebra + lightwalletd, χωρίς το Zallet

---

## Σχετικές σελίδες

* [Πλήρης κόμβος Zebra](/zcash-tech/zebra-full-node) — κόμβος συναίνεσης που περιβάλλει το Z3
* [Zaino](/zcash-tech/zaino) — προαιρετικό προφίλ indexer
* [Πλήρεις κόμβοι](/zcash-tech/full-nodes) — Zebra, Zakura και το αποσυρμένο zcashd
* [Κόμβοι Lightwallet](/zcash-tech/lightwallet-nodes) — με τι επικοινωνούν οι light clients
* [Κόμβος Zakura](/zcash-tech/zakura-node) — εναλλακτικός πλήρης κόμβος· όχι αυτός που παρέχει σήμερα το Z3
* [Οδηγός μετεγκατάστασης: zcashd προς Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Πόροι προγραμματιστών](/start-here/developer-resources)

---

## Πόροι

* [Αποθετήριο Z3](https://github.com/ZcashFoundation/z3)
* [Συμβόλαιο Z3 (θύρες, volumes, ονόματα έργων)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Το βιβλίο του Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Το βιβλίο του Zallet](https://zcash.github.io/zallet/)
* [Φόρουμ κοινότητας Zcash — ενημερώσεις Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Εκκινητής Z3](https://github.com/Jubrilabdulazeez/z3-launcher) — control plane κοινότητας πάνω στην επίσημη στοίβα Compose (Hackathon ZecHub)
