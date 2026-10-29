# Οδηγός χρήστη για θωρακισμένο ZEC του Ledger

Στις 23 Σεπτεμβρίου 2026, το Ledger πρόσθεσε εγγενή θωρακισμένη υποστήριξη ZEC στο Ledger Wallet Desktop. Ένας λογαριασμός Zcash περιλαμβάνει πλέον ένα διαφανές υπόλοιπο και ένα ιδιωτικό υπόλοιπο στο pool Ironwood του Zcash. Τα ιδιωτικά κλειδιά σου παραμένουν στο Ledger σου και κάθε συναλλαγή ελέγχεται και υπογράφεται στη συσκευή.

**Μόνο για υπολογιστή.** Η ανακοίνωση του Ledger αναφέρει ότι το θωρακισμένο ZEC είναι «διαθέσιμο μόνο στο Ledger Wallet Desktop. Η υποστήριξη για κινητά δεν είναι διαθέσιμη αυτή τη στιγμή, αλλά θα έρθει σύντομα». Η εφαρμογή υπολογιστή εμφανίζει την ίδια ειδοποίηση. Ελέγχθηκε στις 15 Οκτωβρίου 2026.

## Προετοιμασία

- Μια συσκευή Ledger που εκτελεί την εφαρμογή Zcash: Nano S Plus, Nano X, Stax ή Flex. Η τρέχουσα εφαρμογή Zcash δεν έχει σχεδιαστεί για το αρχικό Nano S.
- Ledger Wallet Desktop 4.21 ή νεότερο, που έχει ληφθεί μόνο από το [ledger.com](https://www.ledger.com). Αυτός ο οδηγός χρησιμοποίησε την έκδοση 4.24.0.
- Η πιο πρόσφατη εφαρμογή Zcash στο Ledger σου (3.9.4 όταν γράφτηκε αυτός ο οδηγός).
- Ένα μικρό ποσό ZEC για δοκιμή. Κάθε βήμα παρακάτω έγινε στο mainnet με 0,001 ZEC. Κάθε συναλλαγή κοστίζει μικρά τέλη δικτύου (0,00015 ZEC στη δοκιμή μας).
- Η φράση ανάκτησης 24 λέξεων παραμένει στο χαρτί. Μην την πληκτρολογήσεις ποτέ σε υπολογιστή και μην τη μοιραστείς.

## Οδηγός βήμα προς βήμα (Ledger Wallet Desktop)

**1. Εγκατάστησε ή ενημέρωσε την εφαρμογή Zcash**
- Άνοιξε το Ledger Wallet, σύνδεσε και ξεκλείδωσε το Ledger σου και άνοιξε το **My Ledger**. Επίτρεψε τη σύνδεση στη συσκευή.
- Αναζήτησε το **Zcash** στον κατάλογο εφαρμογών και, στη συνέχεια, κάνε κλικ στο **Install** ή στο **Update** αν είναι ήδη εγκατεστημένο.
- Άνοιξε την εφαρμογή Zcash στο Ledger σου. Η οθόνη γράφει «Zcash app is ready». Κύλησε προς τα δεξιά στο **App info** για να ελέγξεις την έκδοση.

**2. Πρόσθεσε έναν λογαριασμό Zcash**
- Στο Ledger Wallet, επίλεξε **Add account**. Στο **Select asset**, αναζήτησε το Zcash και επίλεξε **Zcash (ZEC)**, όχι ένα wrapped token όπως το Binance-Peg Zcash Token.
- Με την εφαρμογή Zcash ανοιχτή στο Ledger σου, το Ledger Wallet βρίσκει τον λογαριασμό σου. Επίλεξέ τον στο **Select the accounts you want to add** και κάνε κλικ στο **Confirm**.
- Η σελίδα λογαριασμού εμφανίζει τα **Available balance**, **Transparent balance** και **Private balance**, καθώς και ένα κουμπί **Enable shielded**.

![Λογαριασμός Zcash στο Ledger Wallet Desktop που εμφανίζει την ειδοποίηση μόνο για υπολογιστή, διαφανές και ιδιωτικό υπόλοιπο, και το κουμπί Enable shielded](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. Ενεργοποίησε το ιδιωτικό υπόλοιπο**
- Κάνε κλικ στο **Enable shielded**. Το παράθυρο **Enable Zcash private balance** έχει τέσσερα βήματα: Birthday, UFVK, Device και Confirmation.
- **Birthday:** Για έναν νέο λογαριασμό, διατήρησε το ύψος birthday στη σημερινή ημερομηνία. Επίλεξε το «This account received shielded ZEC in the past» μόνο αν γνωρίζεις ότι το έκανε, επειδή η σάρωση από το μπλοκ 0 μπορεί να διαρκέσει πολύ.
- **UFVK και Device:** Το Ledger Wallet ζητά από το Ledger σου να εξαγάγει το Unified Full Viewing Key (UFVK). Διάβασε τις οθόνες στη συσκευή και ενέκρινε. Αν δεις το «Device connection lost», βεβαιώσου ότι η εφαρμογή Zcash είναι ανοιχτή, ενέκρινε άμεσα και κάνε κλικ στο **Retry**.
- Όταν δεις το **UFVK successfully imported**, κάνε κλικ στο **Start sync**. Όταν ολοκληρωθεί ο συγχρονισμός, το κουμπί αλλάζει σε **Update balance** με ώρα «Last sync».
- Το viewing key παραμένει στον υπολογιστή σου. Μπορεί να εντοπίσει τα θωρακισμένα κεφάλαιά σου, αλλά δεν μπορεί να τα ξοδέψει.

![Παράθυρο Enable Zcash private balance που εμφανίζει ότι το UFVK εισήχθη επιτυχώς και το κουμπί Start sync](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. Λάβε ZEC και επαλήθευσε και τις δύο διευθύνσεις στο Ledger σου**
- Κάνε κλικ στο **Receive** και επίλεξε τον λογαριασμό Zcash σου. Το Ledger Wallet εμφανίζει μια **Address for Zcash 1** (διαφανής, αρχίζει με t1) και μια **Private address for Zcash 1** (αρχίζει με u1). Οι προηγούμενες διευθύνσεις παραμένουν έγκυρες.
- Το Ledger σου εμφανίζει το «Verify Zcash addresses», την **Private address** σε δύο σελίδες και, στη συνέχεια, τη **Public Address**. Σύγκρινε κάθε χαρακτήρα με την οθόνη πριν μοιραστείς οποιαδήποτε διεύθυνση και, έπειτα, επιβεβαίωσε στη συσκευή.
- Προτίμησε την ιδιωτική διεύθυνση· χρησιμοποίησε τη διαφανή μόνο όταν ο αποστολέας δεν υποστηρίζει τίποτε άλλο.

![Παράθυρο Receive του Ledger Wallet που εμφανίζει τη διαφανή διεύθυνση και την ιδιωτική διεύθυνση για το Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Οθόνες συσκευής Ledger: Verify Zcash addresses, Private address σε δύο σελίδες, κατόπιν Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. Μετέφερε διαφανές ZEC στο ιδιωτικό υπόλοιπό σου**
- Κάνε κλικ στο **Send**. Στην ενότητα **Self transfer**, επίλεξε **Send to private balance**.
- Εισήγαγε ένα ποσό ή χρησιμοποίησε 25%, 50%, 75% ή **Max**. Έλεγξε τα τέλη δικτύου και, στη συνέχεια, κάνε κλικ στο **Review**.
- Στο Ledger σου, προχώρησε στις επιλογές: «Review transaction to send ZEC», «Transfer from public to private address», το ποσό, τη διεύθυνση εξόδου σε δύο σελίδες, τα τέλη και το ύψος λήξης. Έλεγξε ότι η διεύθυνση εξόδου ταιριάζει με την ιδιωτική διεύθυνσή σου από το βήμα 4 και, στη συνέχεια, πάτησε και τα δύο κουμπιά στην επιλογή **Sign transaction**.
- Το Ledger Wallet εμφανίζει **Transaction sent**. Στις λεπτομέρειες της συναλλαγής, ο τύπος αναγράφεται ως **Private (Ironwood)**.
- Το Ledger Wallet σημειώνει ότι μια μεταφορά στον εαυτό σου συνδέει τα θωρακισμένα κεφάλαιά σου με τη δημόσια διεύθυνσή σου. Η απευθείας λήψη στην ιδιωτική διεύθυνσή σου τα διατηρεί ασύνδετα.

![Παράθυρο Send ZEC στο Ledger Wallet με την επιλογή Self transfer Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Οθόνες επιβεβαίωσης της συσκευής Ledger για τη μετακίνηση ZEC από το διαφανές υπόλοιπο στην ιδιωτική διεύθυνση, που τελειώνουν με Sign transaction και Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- Αφού επιβεβαιωθεί η συναλλαγή, το διαφανές υπόλοιπο μειώνεται και το ιδιωτικό υπόλοιπο αυξάνεται. Τα νέα θωρακισμένα κεφάλαια εμφανίζονται ως «σε ωρίμανση» μέχρι να έχουν αρκετές επιβεβαιώσεις για να τα ξοδέψεις.

![Λογαριασμός Zcash μετά τη θωράκιση: το διαφανές υπόλοιπο μειωμένο, το ιδιωτικό υπόλοιπο αυξημένο και εμφανίζεται ως σε ωρίμανση](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. Στείλε ZEC από το ιδιωτικό υπόλοιπό σου**
- Μόλις το ιδιωτικό υπόλοιπο μπορεί να δαπανηθεί, κάνε κλικ στο **Send** και όρισε το **Transfer from** σε **Private balance**.
- Επικόλλησε τη διεύθυνση του παραλήπτη και εισήγαγε το ποσό. Μπορείς να προσθέσεις ένα κρυπτογραφημένο **Memo (optional)** έως 512 bytes, το οποίο μόνο ο παραλήπτης μπορεί να διαβάσει.
- Έλεγξε τον παραλήπτη, το ποσό και τα τέλη στο Ledger σου και, στη συνέχεια, πάτησε και τα δύο κουμπιά στην επιλογή **Υπογραφή συναλλαγής**.

![Απεσταλμένη συναλλαγή από το ιδιωτικό υπόλοιπο στις λεπτομέρειες συναλλαγής του Ledger Wallet](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## Χρήσιμες πληροφορίες

- Το θωρακισμένο ZEC στο Ledger είναι προς το παρόν διαθέσιμο μόνο για υπολογιστή (ελέγχθηκε στις 15 Οκτωβρίου 2026).
- Το ιδιωτικό υπόλοιπο του Ledger Wallet χρησιμοποιεί το pool Ironwood.
- Το Ledger αναφέρει ότι μπορείς να μοιραστείς πρόσβαση μόνο για ανάγνωση στο ιστορικό συναλλαγών σου με έναν φορολογικό σύμβουλο. Οποιοσδήποτε έχει το viewing key σου μπορεί να δει το θωρακισμένο ιστορικό σου, επομένως μοιράσου το μόνο σκόπιμα.
- Οι οθόνες συσκευής σε αυτόν τον οδηγό καταγράφηκαν με τον εξομοιωτή Speculos του Ledger (Nano S Plus), που εκτελούσε την εφαρμογή Zcash 3.9.4, συνδεδεμένο με το Ledger Wallet Desktop 4.24.0 στο mainnet Zcash. Ένα φυσικό Ledger εκτελεί την ίδια εφαρμογή και εμφανίζει τις ίδιες οθόνες.

## Επιπλέον βοήθεια

- [Νέο στο Ledger Wallet: Εγγενής υποστήριξη θωρακισμένου Zcash](https://www.ledger.com/blog-native-shielded-zcash-support) (ανακοίνωση του Ledger)
- [Κέντρο βοήθειας Ledger](https://support.ledger.com)
- [Σελίδα πορτοφολιών του ZecHub](/using-zcash/wallets)
- [Θωρακισμένα pools](/using-zcash/shielded-pools) και [Viewing keys](/zcash-tech/viewing-keys) στο ZecHub
- Μια ακόμη επιλογή hardware wallet: ο [Οδηγός χρήστη Zashi για το Keystone](/guides/keystone-zashi)
