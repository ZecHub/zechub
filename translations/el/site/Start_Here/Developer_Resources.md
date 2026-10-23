<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Πόροι για προγραμματιστές [Developer Resources]

Οι πόροι που χρειάζεσαι για να δημιουργήσεις πάνω στο Zcash, ομαδοποιημένοι ανάλογα με τον σκοπό του καθενός αντί να παρατίθενται όλοι μαζί.

Η στοίβα άλλαξε σημαντικά το 2026. Το zcashd, που λειτουργούσε το δίκτυο για το μεγαλύτερο μέρος της ιστορίας του, έφτασε στο τέλος ζωής του στις 18 Ιουλίου 2026, στο ύψος μπλοκ [block height] 3417100, και κάθε μη τροποποιημένος κόμβος [node] τερματίστηκε σε αυτό το ύψος και θα αρνείται να επανεκκινήσει. Οι οδηγοί που γράφτηκαν για το zcashd είναι πλέον ιστορικοί αντί για σημείο εκκίνησης, επομένως αυτή η σελίδα οργανώνεται γύρω από ό,τι το αντικατέστησε.

## Η στοίβα με μια ματιά

| Επίπεδο | Τι να χρησιμοποιήσεις | Ξεκίνα με |
|:--|:--|:--|
| Πλήρης κόμβος [Full node] | Zebra ή Zakura | [Το Βιβλίο του Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Πορτοφόλι πλήρους κόμβου | Zallet, σε beta | [Το Βιβλίο του Zallet](https://zcash.github.io/zallet/) |
| Διακομιστής light wallet | Zaino ή lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Βιβλιοθήκες πορτοφολιού | Τα crates του librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Κινητό | SDK για Android και iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Προδιαγραφή | Προδιαγραφή πρωτοκόλλου και ZIPs | [zips.z.cash](https://zips.z.cash) |

## Κόμβοι

Ένας κόμβος επικυρώνει τη συναίνεση [consensus] και διατηρεί την αλυσίδα [chain]. Υπάρχουν δύο υλοποιήσεις που αναπτύσσονται ενεργά.

Το [Zebra](/zcash-tech/zebra-full-node) είναι ο κόμβος του Zcash Foundation, γραμμένος σε Rust, και είναι αυτός που υποθέτουν πλέον οι περισσότεροι οδηγοί. Το [Βιβλίο του Zebra](https://zebra.zfnd.org/) καλύπτει την εγκατάσταση και τη λειτουργία του, και το [αποθετήριο](https://github.com/ZcashFoundation/zebra) είναι όπου γίνεται η ανάπτυξη.

Το [Zakura](/zcash-tech/zakura-node) είναι ένας νεότερος κόμβος, που περιγράφεται από τους δημιουργούς του ως «πλήρης κόμβος [full node] Zcash συμβατός με τη συναίνεση, σχεδιασμένος για κλίμακα», με ταχύτερο συγχρονισμό, περικοπή μπλοκ και λειτουργία συμβατότητας με το zcashd. Ηγείται από τον Sean Bowe, συνιδρυτή του Zcash, και τον Dev Ojha. Είναι ανοιχτού κώδικα υπό Apache 2.0 στο [zakura-core/zakura](https://github.com/zakura-core/zakura).

Το ZecHub έχει μια σελίδα [Πλήρεις Κόμβοι](/zcash-tech/full-nodes) που καλύπτει τους συμβιβασμούς μεταξύ τους.

## Το πορτοφόλι πλήρους κόμβου

Το zcashd περιλάμβανε ένα πορτοφόλι με τον κόμβο. Αυτό το πορτοφόλι δεν υπάρχει πλέον, και το [Zallet](https://github.com/zcash/zallet) είναι η αντικατάστασή του. Το Βιβλίο του Zallet το περιγράφει ως «ένα πορτοφόλι πλήρους κόμβου Zcash γραμμένο σε Rust» που «δημιουργείται ως αντικατάσταση για το πορτοφόλι zcashd».

Διάβασε την προειδοποίηση ασφαλείας πριν βασιστείς σε αυτό. Το Zallet βρίσκεται σε beta, «δεν έχει ελεγχθεί πλήρως», ενδέχεται να προκύψουν αλλαγές που σπάνε τη συμβατότητα «ανά πάσα στιγμή, απαιτώντας να διαγράψεις και να δημιουργήσεις ξανά το πορτοφόλι Zallet σου», και δεν έχει μεταφερθεί ακόμη κάθε μέθοδος RPC του zcashd.

Αν μεταφέρεις μια υπάρχουσα εγκατάσταση, το ZecHub διαθέτει έναν [οδηγό μετεγκατάστασης από το zcashd στο Zebra και το Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet), καθώς και μια [Zalletσύντομη αναφορά](/using-zcash/zallet-quick-reference-guide).

## Διακομιστές light wallet

Τα περισσότερα πορτοφόλια δεν εκτελούν έναν κόμβο. Επικοινωνούν με έναν διακομιστή που διατηρεί την αλυσίδα και επιστρέφει μια συμπαγή προβολή της.

Το [lightwalletd](https://github.com/zcash/lightwalletd) είναι η αρχική υπηρεσία, γραμμένη σε Go, και περιγράφεται ως «μια υπηρεσία backend που παρέχει μια διεπαφή αποδοτική ως προς το εύρος ζώνης στο blockchain Zcash». Το [Zaino](/zcash-tech/zaino) είναι ο νεότερος indexer, γραμμένος σε Rust, και διαβάζει από έναν πλήρη επικυρωτή αντί να διατηρεί το δικό του αντίγραφο της αλυσίδας.

Η τεκμηρίωση του [Πρωτοκόλλου Light Client](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) καλύπτει το ίδιο το πρωτόκολλο. Η σελίδα [Κόμβοι Lightwallet](/zcash-tech/lightwallet-nodes) καλύπτει όσα αυτοί οι διακομιστές μπορούν και δεν μπορούν να δουν για έναν χρήστη, κάτι που αξίζει να κατανοήσεις πριν επιλέξεις έναν.

## Δημιουργία πορτοφολιού

Το μεγαλύτερο μέρος της εργασίας για πορτοφόλια γίνεται στα crates του Rust κάτω από το [librustzcash](https://github.com/zcash/librustzcash), πάνω στα οποία βασίζονται τα SDK για κινητά και αρκετά πορτοφόλια υπολογιστή. Κάθε crate τεκμηριώνεται στο [docs.rs](https://docs.rs).

| Crate | Για ποιον σκοπό είναι |
|:--|:--|
| zcash_client_backend | «API για τη δημιουργία θωρακισμένων [shielded] light clients Zcash», συμπεριλαμβανομένων του συγχρονισμού και της κατασκευής συναλλαγών [transaction] |
| zcash_client_sqlite | «Ένα light client Zcash βασισμένο σε SQLite», το επίπεδο αποθήκευσης για το παραπάνω |
| zcash_keys | «Διαχείριση κλειδιών και διευθύνσεων Zcash» |
| zcash_primitives | «Υλοποιήσεις Rust των πρωτογενών στοιχείων Zcash» |
| zcash_protocol | «Σταθερές δικτύου και τύποι τιμών του πρωτοκόλλου Zcash» |
| orchard | «Το πρωτόκολλο θωρακισμένων συναλλαγών Orchard» |
| sapling-crypto | «Κρυπτογραφική βιβλιοθήκη για Zcash Sapling» |
| pczt | «Εργαλεία [tools] για εργασία με μερικώς δημιουργημένες συναλλαγές Zcash», που χρησιμοποιούνται για υπογραφή με hardware και πολλές συσκευές |
| zip321 | URI αιτημάτων πληρωμής [payment], όπως ορίζονται στο ZIP 321 |

Για κινητά, το SDK [Android](https://github.com/zcash/zcash-android-wallet-sdk) και το [SDK iOS](https://github.com/zcash/zcash-swift-wallet-sdk) ενσωματώνουν αυτές τις βιβλιοθήκες. Το αποθετήριο για iOS ονομαζόταν προηγουμένως ZcashLightClientKit, επομένως οι παλαιότεροι σύνδεσμοι και άρθρα χρησιμοποιούν αυτό το όνομα.

## Προδιαγραφή και κρυπτογραφία

Η [προδιαγραφή πρωτοκόλλου](https://zips.z.cash/protocol/protocol.pdf) είναι η αυθεντία για το πώς λειτουργεί το Zcash, συμπεριλαμβανομένων των [κωδικοποιήσεων διευθύνσεων και κλειδιών](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

Τα [ZIPs](https://zips.z.cash) είναι όπου προτείνονται και καθορίζονται οι αλλαγές, και το ευρετήριο δείχνει ποια είναι προσχέδια και ποια οριστικά. Οι αλλαγές συναίνεσης κυκλοφορούν σε αναβαθμίσεις δικτύου [network upgrades], και το ZecHub τις παρακολουθεί στη σελίδα [Αναβαθμίσεις Δικτύου](/start-here/network-upgrades).

Για την υποκείμενη κρυπτογραφία, διάβασε το [Βιβλίο του halo2](https://zcash.github.io/halo2/index.html) και το [Βιβλίο του Orchard](https://zcash.github.io/orchard/), μαζί με την τεκμηρίωση των crates [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) και [orchard](https://docs.rs/orchard/latest/orchard/). Το [Βιβλίο του FROST](https://frost.zfnd.org/) καλύπτει τις υπογραφές κατωφλίου, και το ZecHub διαθέτει μια σελίδα [FROST](/zcash-tech/frost).

## Testnet

Το Testnet είναι μια ξεχωριστή αλυσίδα με νομίσματα χωρίς αξία, που ονομάζονται TAZ. Τόσο το Zebra όσο και το Zakura μπορούν να εκτελεστούν σε αυτό, και ο [οδηγός testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) καλύπτει τη διαμόρφωση κόμβου.

Το [testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) είναι ένας λειτουργικός block explorer για testnet, με αντίστοιχο για mainnet στο [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Η απόκτηση TAZ είναι το δύσκολο μέρος, επειδή τα faucets που συνδέονται από παλαιότερη τεκμηρίωση έχουν σταματήσει να απαντούν. Το [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) είναι ένα faucet που διαχειρίζεται η κοινότητα και εκτελεί «τον δικό του κόμβο, πορτοφόλι και εξορύκτη [miner]», πληρώνει «θωρακισμένες σταγόνες z2z» και περιορίζει τις διεκδικήσεις με «browser proof of work αντί για πάροχο captcha». Είναι ανοιχτού κώδικα υπό MIT. Αν δεν είναι διαθέσιμο, ρώτησε στο Zcash R&D Discord, όπως προτείνει και η ίδια η τεκμηρίωση του Zcash.

## Γενική τεκμηρίωση

Η [ZcashΤεκμηρίωση](https://zcash.readthedocs.io/en/latest/) εξακολουθεί να είναι η ευρύτερη μεμονωμένη πηγή, καλύπτοντας έννοιες πρωτοκόλλου, ενσωμάτωση και εξόρυξη [mining]. Διάβασέ την με προσοχή. Είναι εκδομένη με βάση το zcashd, οπότε τμήματά της περιγράφουν έναν κόμβο που δεν εκτελείται πλέον, ενώ οι ενότητες για το πρωτόκολλο και τους light clients παραμένουν χρήσιμες. Το [Μοντέλο Απειλών της Εφαρμογής Πορτοφολιού Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) που βρίσκεται εκεί αξίζει να το διαβάσεις πριν σχεδιάσεις οτιδήποτε αγγίζει την ιδιωτικότητα [privacy] του χρήστη.

Αν είσαι νέος στα blockchains γενικά, το [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) είναι η συνήθης σύσταση για τις κοινές βασικές αρχές, και μπορείς να το διαβάσεις ολόκληρο δωρεάν. Δεν καλύπτει θωρακισμένες συναλλαγές.

## Άλλα εργαλεία που έχουν αναφέρει προγραμματιστές

Το [Arti](https://docs.rs/arti/latest/arti/) είναι η υλοποίηση του Rust για το Tor, που χρησιμοποιείται από το zcash_client_backend για τη δρομολόγηση της κίνησης του πορτοφολιού. Το [Tailscale](https://github.com/tailscale/tailscale) αναφέρεται για σύνδεση με έναν κόμβο που εκτελείς εσύ. Το [warp2](https://github.com/hhanh00/warp2) είναι μια υλοποίηση γρήγορου συγχρονισμού από τον Hanh, αν και δεν έχει ενημερωθεί από το 2023.

## Κοινότητα και εκδηλώσεις

Το [Zcash R&D Discord](https://discord.gg/6AK7keWFaK) είναι όπου συζητείται η ανάπτυξη πρωτοκόλλου και πορτοφολιών, και το [ZcashΦόρουμ Κοινότητας](https://forum.zcashcommunity.com/) φιλοξενεί εκτενέστερες προτάσεις και νήματα υποστήριξης.

Τα πρόσφατα αποτελέσματα hackathon δίνουν μια καλή εικόνα του τι δημιουργεί ο κόσμος: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) και το [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Αποσυρμένοι πόροι

Διατηρούνται επειδή παλαιότερα άρθρα συνδέονται με αυτούς και επειδή εξακολουθούν να αποτελούν την αναφορά για το πώς συμπεριφερόταν ο αποσυρμένος κόμβος. Μην ξεκινήσεις από εδώ.

Το [Βιβλίο του zcashd](https://zcash.github.io/zcash/) και η αναφορά RPC του [zcashd](https://zcash.github.io/rpc/) τεκμηριώνουν λογισμικό που έφτασε στο [τέλος ζωής](https://zcash.github.io/zcash/user/end-of-life.html) τον Ιούλιο του 2026. Το αποθετήριο [zcash/zcash](https://github.com/zcash/zcash) είναι αρχειοθετημένο.

Αν έχεις έναν πόρο να προσθέσεις ή εντοπίσεις εδώ κάτι που έχει παλιώσει, άνοιξε ένα issue ή ένα pull request. Οι ομάδες δεν έχουν πάντα την ικανότητα να διατηρούν τα πάντα ενημερωμένα, και η επισήμανση όσων συνάντησες βοηθά να κατευθυνθούν οι οδηγοί.

**Τελευταία ενημέρωση:** Αύγουστος 2026
