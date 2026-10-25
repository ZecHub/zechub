<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Πόροι για προγραμματιστές

Οι πόροι που χρειάζεσαι για να αναπτύξεις πάνω στο Zcash, ομαδοποιημένοι ανάλογα με τη χρήση του καθενός αντί να παρατίθενται όλοι μαζί.

Η στοίβα άλλαξε σημαντικά το 2026. Το zcashd, το οποίο λειτουργούσε το δίκτυο στο μεγαλύτερο μέρος της ιστορίας του, έφτασε στο τέλος ζωής του στις 18 Ιουλίου 2026, στο ύψος μπλοκ 3417100, και κάθε μη τροποποιημένος κόμβος τερματίστηκε σε αυτό το ύψος και θα αρνείται να επανεκκινήσει. Οι οδηγοί που γράφτηκαν για το zcashd αποτελούν πλέον ιστορία και όχι αφετηρία, επομένως αυτή η σελίδα οργανώνεται γύρω από ό,τι το αντικατέστησε.

## Η στοίβα με μια ματιά

| Επίπεδο | Τι να χρησιμοποιήσεις | Ξεκίνα με |
|:--|:--|:--|
| Πλήρης κόμβος | Zebra ή Zakura | [Το βιβλίο του Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Πορτοφόλι πλήρους κόμβου | Zallet, σε beta | [Το βιβλίο του Zallet](https://zcash.github.io/zallet/) |
| Διακομιστής light wallet | Zaino ή lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Βιβλιοθήκες πορτοφολιού | Τα crates του librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Κινητό | SDK για Android και iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Προδιαγραφή | Προδιαγραφή πρωτοκόλλου και ZIP | [zips.z.cash](https://zips.z.cash) |

## Κόμβοι

Ένας κόμβος επαληθεύει τη συναίνεση και διατηρεί την αλυσίδα. Υπάρχουν δύο υλοποιήσεις που αναπτύσσονται ενεργά.

Το [Zebra](/zcash-tech/zebra-full-node) είναι ο κόμβος του Zcash Foundation, γραμμένος σε Rust, και είναι αυτός που χρησιμοποιούν πλέον οι περισσότεροι οδηγοί. Το [Βιβλίο του Zebra](https://zebra.zfnd.org/) καλύπτει την εγκατάσταση και τη λειτουργία του, ενώ το [αποθετήριο](https://github.com/ZcashFoundation/zebra) είναι το σημείο όπου γίνεται η ανάπτυξη.

Το [Zakura](/zcash-tech/zakura-node) είναι ένας νεότερος κόμβος, που περιγράφεται από τους δημιουργούς του ως «πλήρης κόμβος Zcash συμβατός με τη συναίνεση, σχεδιασμένος για κλίμακα», με ταχύτερο συγχρονισμό, περικοπή μπλοκ και λειτουργία συμβατότητας με το zcashd. Ηγείται από τον Sean Bowe, συνιδρυτή του Zcash, και τον Dev Ojha. Είναι ανοικτού κώδικα υπό Apache 2.0 στο [zakura-core/zakura](https://github.com/zakura-core/zakura).

Το ZecHub διαθέτει σελίδα [Πλήρεις κόμβοι](/zcash-tech/full-nodes) που καλύπτει τους συμβιβασμούς μεταξύ τους.

## Το πορτοφόλι πλήρους κόμβου

Το zcashd περιλάμβανε ένα πορτοφόλι μαζί με τον κόμβο. Αυτό το πορτοφόλι δεν υπάρχει πλέον και το [Zallet](https://github.com/zcash/zallet) είναι η αντικατάστασή του. Το βιβλίο του Zallet το περιγράφει ως «πορτοφόλι Zcash πλήρους κόμβου γραμμένο σε Rust», το οποίο «κατασκευάζεται ως αντικατάσταση του πορτοφολιού zcashd».

Διάβασε την προειδοποίηση ασφαλείας προτού βασιστείς σε αυτό. Το Zallet βρίσκεται σε beta, «δεν έχει αξιολογηθεί πλήρως», ενδέχεται να υπάρξουν αλλαγές που διακόπτουν τη συμβατότητα «ανά πάσα στιγμή, απαιτώντας να διαγράψεις και να δημιουργήσεις ξανά το πορτοφόλι Zallet», και δεν έχει μεταφερθεί ακόμη κάθε μέθοδος RPC του zcashd.

Αν μεταφέρεις μια υπάρχουσα εγκατάσταση, το ZecHub διαθέτει έναν [οδηγό μετάβασης από το zcashd στο Zebra και το Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet), καθώς και μια [γρήγορη αναφορά του Zallet](/using-zcash/zallet-quick-reference-guide).

## Διακομιστές light wallet

Τα περισσότερα πορτοφόλια δεν εκτελούν έναν κόμβο. Επικοινωνούν με έναν διακομιστή που διατηρεί την αλυσίδα και επιστρέφει μια συμπαγή προβολή της.

Το [lightwalletd](https://github.com/zcash/lightwalletd) είναι η αρχική υπηρεσία, γραμμένη σε Go, και περιγράφεται ως «υπηρεσία backend που παρέχει μια αποδοτική ως προς το εύρος ζώνης διεπαφή για το blockchain Zcash». Το [Zaino](/zcash-tech/zaino) είναι ο νεότερος indexer, γραμμένος σε Rust, και διαβάζει από έναν πλήρη επαληθευτή αντί να διατηρεί το δικό του αντίγραφο της αλυσίδας.

Η τεκμηρίωση [Πρωτόκολλο light client](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) καλύπτει το ίδιο το πρωτόκολλο. Η σελίδα [Κόμβοι lightwallet](/zcash-tech/lightwallet-nodes) καλύπτει τι μπορούν και τι δεν μπορούν να δουν αυτοί οι διακομιστές για έναν χρήστη, κάτι που αξίζει να κατανοήσεις προτού επιλέξεις έναν.

## Δημιουργία πορτοφολιού

Το μεγαλύτερο μέρος της εργασίας για πορτοφόλια γίνεται στα crates του Rust, στο [librustzcash](https://github.com/zcash/librustzcash), πάνω στα οποία βασίζονται τα SDK για κινητά και αρκετά πορτοφόλια επιτραπέζιου υπολογιστή. Κάθε crate τεκμηριώνεται στο [docs.rs](https://docs.rs).

| Crate | Σε τι χρησιμεύει |
|:--|:--|
| zcash_client_backend | «API για τη δημιουργία θωρακισμένων light clients Zcash», συμπεριλαμβανομένων του συγχρονισμού και της κατασκευής συναλλαγών |
| zcash_client_sqlite | «Ένα light client Zcash βασισμένο σε SQLite», το επίπεδο αποθήκευσης για το παραπάνω |
| zcash_keys | «Διαχείριση κλειδιών και διευθύνσεων Zcash» |
| zcash_primitives | «Υλοποιήσεις Rust των αρχικών στοιχείων του Zcash» |
| zcash_protocol | «Σταθερές δικτύου πρωτοκόλλου Zcash και τύποι τιμών» |
| orchard | «Το θωρακισμένο πρωτόκολλο συναλλαγών Orchard» |
| sapling-crypto | «Κρυπτογραφική βιβλιοθήκη για Zcash Sapling» |
| pczt | «Εργαλεία για εργασία με μερικώς δημιουργημένες συναλλαγές Zcash», που χρησιμοποιούνται για υπογραφή με hardware και πολλαπλές συσκευές |
| zip321 | URI αιτημάτων πληρωμής, όπως ορίζονται στο ZIP 321 |

Για κινητά, το SDK [Android](https://github.com/zcash/zcash-android-wallet-sdk) και το [SDK iOS](https://github.com/zcash/zcash-swift-wallet-sdk) περικλείουν αυτές τις βιβλιοθήκες. Το αποθετήριο iOS ονομαζόταν προηγουμένως ZcashLightClientKit, επομένως παλαιότεροι σύνδεσμοι και άρθρα χρησιμοποιούν αυτή την ονομασία.

## Προδιαγραφή και κρυπτογραφία

Η [προδιαγραφή πρωτοκόλλου](https://zips.z.cash/protocol/protocol.pdf) είναι η έγκυρη πηγή για τον τρόπο λειτουργίας του Zcash, συμπεριλαμβανομένων των [κωδικοποιήσεων διευθύνσεων και κλειδιών](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

Στα [ZIP](https://zips.z.cash) προτείνονται και ορίζονται οι αλλαγές, ενώ το ευρετήριο δείχνει ποια είναι προσχέδια και ποια οριστικά. Οι αλλαγές συναίνεσης διατίθενται με αναβαθμίσεις δικτύου, και το ZecHub τις παρακολουθεί στη σελίδα [Αναβαθμίσεις δικτύου](/start-here/network-upgrades).

Για την υποκείμενη κρυπτογραφία, διάβασε το [Βιβλίο halo2](https://zcash.github.io/halo2/index.html) και το [Βιβλίο του Orchard](https://zcash.github.io/orchard/), μαζί με την τεκμηρίωση των crates [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) και [orchard](https://docs.rs/orchard/latest/orchard/). Το [Βιβλίο του FROST](https://frost.zfnd.org/) καλύπτει υπογραφές κατωφλίου και το ZecHub διαθέτει σελίδα [FROST](/zcash-tech/frost).

## Testnet

Το Testnet είναι μια ξεχωριστή αλυσίδα με νομίσματα χωρίς αξία, που ονομάζονται TAZ. Τόσο το Zebra όσο και το Zakura μπορούν να εκτελεστούν σε αυτό, ενώ ο [οδηγός testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) καλύπτει τη διαμόρφωση του κόμβου.

Το [testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) είναι ένας λειτουργικός block explorer testnet, με αντίστοιχο mainnet στο [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Η απόκτηση TAZ είναι το δύσκολο μέρος, επειδή τα faucets που συνδέονται από παλαιότερη τεκμηρίωση έχουν σταματήσει να ανταποκρίνονται. Το [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) είναι ένα faucet που διαχειρίζεται η κοινότητα, το οποίο εκτελεί «τον δικό του κόμβο, πορτοφόλι και εξορύκτη», πληρώνει «θωρακισμένες σταγόνες z2z» και περιορίζει τα αιτήματα με «proof of work του προγράμματος περιήγησης αντί για πάροχο captcha». Είναι ανοικτού κώδικα υπό MIT. Αν δεν είναι διαθέσιμο, ρώτησε στο Zcash R&D Discord, όπως προτείνει και η ίδια η τεκμηρίωση του Zcash.

## Γενική τεκμηρίωση

Η [Τεκμηρίωση του Zcash](https://zcash.readthedocs.io/en/latest/) παραμένει η ευρύτερη ενιαία πηγή, καλύπτοντας έννοιες πρωτοκόλλου, ενσωμάτωση και εξόρυξη. Διάβασέ την με κάποια προσοχή. Είναι εκδομένη για το zcashd, οπότε μέρη της περιγράφουν έναν κόμβο που δεν εκτελείται πλέον, ενώ οι ενότητες πρωτοκόλλου και light client παραμένουν χρήσιμες. Το [Μοντέλο απειλών εφαρμογής πορτοφολιού του Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) που βρίσκεται εκεί αξίζει να το διαβάσεις προτού σχεδιάσεις οτιδήποτε που αγγίζει την ιδιωτικότητα των χρηστών.

Αν είσαι νέος στα blockchain γενικά, το [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) είναι η συνηθισμένη πρόταση για τις κοινές βασικές αρχές και διατίθεται δωρεάν για πλήρη ανάγνωση. Δεν καλύπτει θωρακισμένες συναλλαγές.

## Άλλα εργαλεία που έχουν αναφέρει προγραμματιστές

Το [Arti](https://docs.rs/arti/latest/arti/) είναι η υλοποίηση Rust του Tor, που χρησιμοποιείται από το zcash_client_backend για τη δρομολόγηση της κίνησης του πορτοφολιού. Το [Tailscale](https://github.com/tailscale/tailscale) αναφέρεται για τη σύνδεση με έναν κόμβο που εκτελείς εσύ. Το [warp2](https://github.com/hhanh00/warp2) είναι μια υλοποίηση γρήγορου συγχρονισμού από τον Hanh, αν και δεν έχει ενημερωθεί από το 2023.

## Κοινότητα και εκδηλώσεις

Το [Zcash R&D Discord](https://discord.gg/6AK7keWFaK) είναι το μέρος όπου συζητείται η ανάπτυξη πρωτοκόλλου και πορτοφολιού, ενώ το [Φόρουμ της κοινότητας Zcash](https://forum.zcashcommunity.com/) φιλοξενεί εκτενέστερες προτάσεις και νήματα υποστήριξης.

Τα πρόσφατα αποτελέσματα hackathon δίνουν μια καλή εικόνα για όσα δημιουργεί ο κόσμος: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) και το [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Αποσυρμένοι πόροι

Διατηρούνται επειδή παλαιότερα άρθρα συνδέουν σε αυτούς και επειδή εξακολουθούν να αποτελούν την αναφορά για τη συμπεριφορά του αποσυρμένου κόμβου. Μην ξεκινήσεις από εδώ.

Το [Βιβλίο του zcashd](https://zcash.github.io/zcash/) και η αναφορά RPC του [zcashd](https://zcash.github.io/rpc/) τεκμηριώνουν λογισμικό που έφτασε στο [τέλος ζωής](https://zcash.github.io/zcash/user/end-of-life.html) τον Ιούλιο του 2026. Το αποθετήριο [zcash/zcash](https://github.com/zcash/zcash) είναι αρχειοθετημένο.

Αν έχεις έναν πόρο να προσθέσεις ή εντοπίσεις κάτι εδώ που έχει παλιώσει, άνοιξε ένα issue ή ένα pull request. Οι ομάδες δεν έχουν πάντα τη δυνατότητα να διατηρούν τα πάντα ενημερωμένα και η επισήμανση όσων συνάντησες βοηθά να κατευθυνθούν οι οδηγοί.

**Τελευταία ενημέρωση:** Αύγουστος 2026
