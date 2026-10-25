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
- Άνοιξε το Ledger Wallet, σύνδεσε και ξεκλείδωσε το Ledger σου και άνοιξε το **Τα Ledger μου**. Επίτρεψε τη σύνδεση στη συσκευή.
- Αναζήτησε το **Zcash** στον κατάλογο εφαρμογών και, στη συνέχεια, κάνε κλικ στο **Εγκατάσταση** ή στο **Ενημέρωση** αν είναι ήδη εγκατεστημένο.
- Άνοιξε την εφαρμογή Zcash στο Ledger σου. Η οθόνη γράφει «Η εφαρμογή Zcash είναι έτοιμη». Κύλησε προς τα δεξιά στο **Πληροφορίες εφαρμογής** για να ελέγξεις την έκδοση.

**2. Πρόσθεσε έναν λογαριασμό Zcash**
- Στο Ledger Wallet, επίλεξε **Προσθήκη λογαριασμού**. Στο **Επιλογή περιουσιακού στοιχείου**, αναζήτησε το Zcash και επίλεξε **Zcash (ZEC)**, όχι ένα wrapped token όπως το Binance-Peg Zcash Token.
- Με την εφαρμογή Zcash ανοιχτή στο Ledger σου, το Ledger Wallet βρίσκει τον λογαριασμό σου. Επίλεξέ τον στο **Επιλογή των λογαριασμών που θέλεις να προσθέσεις** και κάνε κλικ στο **Επιβεβαίωση**.
- Η σελίδα λογαριασμού εμφανίζει τα **Διαθέσιμο υπόλοιπο**, **Διαφανές υπόλοιπο** και **Ιδιωτικό υπόλοιπο**, καθώς και ένα κουμπί **Ενεργοποίηση θωρακισμένης λειτουργίας**.

![Zcash account in Ledger Wallet Desktop showing the desktop-only notice, transparent and private balances, and the Enable shielded button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. Ενεργοποίησε το ιδιωτικό υπόλοιπο**
- Κάνε κλικ στο **Ενεργοποίηση θωρακισμένης λειτουργίας**. Το παράθυρο **Ενεργοποίηση ιδιωτικού υπολοίπου Zcash** έχει τέσσερα βήματα: Birthday, UFVK, Device και Confirmation.
- **Birthday:** Για έναν νέο λογαριασμό, διατήρησε το ύψος birthday στη σημερινή ημερομηνία. Επίλεξε το «Αυτός ο λογαριασμός έλαβε θωρακισμένο ZEC στο παρελθόν» μόνο αν γνωρίζεις ότι το έκανε, επειδή η σάρωση από το μπλοκ 0 μπορεί να διαρκέσει πολύ.
- **UFVK και Device:** Το Ledger Wallet ζητά από το Ledger σου να εξαγάγει το Unified Full Viewing Key (UFVK). Διάβασε τις οθόνες στη συσκευή και ενέκρινε. Αν δεις το «Η σύνδεση με τη συσκευή χάθηκε», βεβαιώσου ότι η εφαρμογή Zcash είναι ανοιχτή, ενέκρινε άμεσα και κάνε κλικ στο **Επανάληψη**.
- Όταν δεις το **Το UFVK εισήχθη επιτυχώς**, κάνε κλικ στο **Έναρξη συγχρονισμού**. Όταν ολοκληρωθεί ο συγχρονισμός, το κουμπί αλλάζει σε **Ενημέρωση υπολοίπου** με ώρα «Τελευταίος συγχρονισμός».
- Το viewing key παραμένει στον υπολογιστή σου. Μπορεί να εντοπίσει τα θωρακισμένα κεφάλαιά σου, αλλά δεν μπορεί να τα ξοδέψει.

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. Λάβε ZEC και επαλήθευσε και τις δύο διευθύνσεις στο Ledger σου**
- Κάνε κλικ στο **Λήψη** και επίλεξε τον λογαριασμό Zcash σου. Το Ledger Wallet εμφανίζει μια **Διεύθυνση για Zcash 1** (διαφανής, αρχίζει με t1) και μια **Ιδιωτική διεύθυνση για Zcash 1** (αρχίζει με u1). Οι προηγούμενες διευθύνσεις παραμένουν έγκυρες.
- Το Ledger σου εμφανίζει το «Επαλήθευση διευθύνσεων Zcash», την **Ιδιωτική διεύθυνση** σε δύο σελίδες και, στη συνέχεια, τη **Δημόσια διεύθυνση**. Σύγκρινε κάθε χαρακτήρα με την οθόνη πριν μοιραστείς οποιαδήποτε διεύθυνση και, έπειτα, επιβεβαίωσε στη συσκευή.
- Προτίμησε την ιδιωτική διεύθυνση· χρησιμοποίησε τη διαφανή μόνο όταν ο αποστολέας δεν υποστηρίζει τίποτε άλλο.

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. Μετέφερε διαφανές ZEC στο ιδιωτικό υπόλοιπό σου**
- Κάνε κλικ στο **Αποστολή**. Στην ενότητα **Μεταφορά στον εαυτό σου**, επίλεξε **Αποστολή στο ιδιωτικό υπόλοιπο**.
- Εισήγαγε ένα ποσό ή χρησιμοποίησε 25%, 50%, 75% ή **Μέγιστο**. Έλεγξε τα τέλη δικτύου και, στη συνέχεια, κάνε κλικ στο **Έλεγχος**.
- Στο Ledger σου, προχώρησε στις επιλογές: «Έλεγχος συναλλαγής για αποστολή ZEC», «Μεταφορά από δημόσια σε ιδιωτική διεύθυνση», το ποσό, τη διεύθυνση εξόδου σε δύο σελίδες, τα τέλη και το ύψος λήξης. Έλεγξε ότι η διεύθυνση εξόδου ταιριάζει με την ιδιωτική διεύθυνσή σου από το βήμα 4 και, στη συνέχεια, πάτησε και τα δύο κουμπιά στην επιλογή **Υπογραφή συναλλαγής**.
- Το Ledger Wallet εμφανίζει **Η συναλλαγή στάλθηκε**. Στις λεπτομέρειες της συναλλαγής, ο τύπος αναγράφεται ως **Ιδιωτική (Ironwood)**.
- Το Ledger Wallet σημειώνει ότι μια μεταφορά στον εαυτό σου συνδέει τα θωρακισμένα κεφάλαιά σου με τη δημόσια διεύθυνσή σου. Η απευθείας λήψη στην ιδιωτική διεύθυνσή σου τα διατηρεί ασύνδετα.

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- Αφού επιβεβαιωθεί η συναλλαγή, το διαφανές υπόλοιπο μειώνεται και το ιδιωτικό υπόλοιπο αυξάνεται. Τα νέα θωρακισμένα κεφάλαια εμφανίζονται ως «σε ωρίμανση» μέχρι να έχουν αρκετές επιβεβαιώσεις για να τα ξοδέψεις.

![Zcash account after shielding: transparent balance reduced, private balance increased and shown as maturing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. Στείλε ZEC από το ιδιωτικό υπόλοιπό σου**
- Μόλις το ιδιωτικό υπόλοιπο μπορεί να δαπανηθεί, κάνε κλικ στο **Αποστολή** και όρισε το **Μεταφορά από** σε **Ιδιωτικό υπόλοιπο**.
- Επικόλλησε τη διεύθυνση του παραλήπτη και εισήγαγε το ποσό. Μπορείς να προσθέσεις ένα κρυπτογραφημένο **Σημείωμα (προαιρετικό)** έως 512 bytes, το οποίο μόνο ο παραλήπτης μπορεί να διαβάσει.
- Έλεγξε τον παραλήπτη, το ποσό και τα τέλη στο Ledger σου και, στη συνέχεια, πάτησε και τα δύο κουμπιά στην επιλογή **Υπογραφή συναλλαγής**.

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## Χρήσιμες πληροφορίες

- Το θωρακισμένο ZEC στο Ledger είναι προς το παρόν διαθέσιμο μόνο για υπολογιστή (ελέγχθηκε στις 15 Οκτωβρίου 2026).
- Το ιδιωτικό υπόλοιπο του Ledger Wallet χρησιμοποιεί το pool Ironwood.
- Το Ledger αναφέρει ότι μπορείς να μοιραστείς πρόσβαση μόνο για ανάγνωση στο ιστορικό συναλλαγών σου με έναν φορολογικό σύμβουλο. Οποιοσδήποτε έχει το viewing key σου μπορεί να δει το θωρακισμένο ιστορικό σου, επομένως μοιράσου το μόνο σκόπιμα.
- Οι οθόνες συσκευής σε αυτόν τον οδηγό καταγράφηκαν με τον εξομοιωτή Speculos του Ledger (Nano S Plus), που εκτελούσε την εφαρμογή Zcash 3.9.4, συνδεδεμένο με το Ledger Wallet Desktop 4.24.0 στο mainnet Zcash. Ένα φυσικό Ledger εκτελεί την ίδια εφαρμογή και εμφανίζει τις ίδιες οθόνες.

## Επιπλέον βοήθεια

- [Νέο στο Ledger Wallet: Εγγενής υποστήριξη θωρακισμένου Zcash](https://www.ledger.com/blog-native-shielded-zcash-support) (ανακοίνωση του Ledger)
- [Κέντρο βοήθειας Ledger](https://support.ledger.com)
- [Σελίδα πορτοφολιών ZecHub](/using-zcash/wallets)
- [Θωρακισμένα pools](/using-zcash/shielded-pools) και [Viewing keys](/zcash-tech/viewing-keys) στο ZecHub
- Μια ακόμη επιλογή hardware wallet: ο [Keystone οδηγός χρήστη Zashi](/guides/keystone-zashi)
