# Οδηγός χρήστη Keystone Zashi

Οδηγός Twitter:  => [Zashi x Keystone Οδηγός ενσωμάτωσης hardware wallet Twitter](https://x.com/zashi_app/status/1869793574880973144) 

Αυτή η ενσωμάτωση σηματοδοτεί μια σημαντική εξέλιξη στη χρηστικότητα του Zcash, επιτρέποντας την ψυχρή αποθήκευση θωρακισμένων ZEC. Η κοινότητα του Zcash έχει αντιμετωπίσει δυσκολίες με άλλες πλατφόρμες hardware wallet στο παρελθόν, αλλά το Keystone αναδείχθηκε σε συνεργατικό εταίρο πρόθυμο να ξεπεράσει τα όρια και να καινοτομήσει μαζί με το Electric Coin Company. Η ομάδα του Keystone έλαβε επιχορήγηση από το ZCG για να χρηματοδοτήσει το δικό της μέρος της εργασίας.

## Οδηγός Keystone X Zashi

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zashi Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Προετοιμασία
[Παράγγειλε και παρέλαβε το Keystone 3 Pro ή το Keystone 3](https://keyst.one) 

Επίπεδο μπαταρίας: Βεβαιώσου ότι η συσκευή keystone έχει επίπεδο μπαταρίας άνω του 20%.

Καλώδιο USB ή κάρτα SD:

- Καλώδιο USB για ενημέρωση firmware (περιλαμβάνεται).
- Κάρτα Micro SD (κάτω από 1 TB) για αναβαθμίσεις (αγοράζεται ξεχωριστά).

Πρόσβαση στην επίσημη ιστοσελίδα του Keystone για επαλήθευση και ενημέρωση firmware.

Ρύθμιση της εφαρμογής Zashi στη φορητή συσκευή σου.

## [Οδηγός βήμα προς βήμα (συσκευή Keystone)](https://keyst.one/get-started) 


**Επίλεξε τη γλώσσα σου**
-Επαλήθευση συσκευής (μέσω QR): Η επαλήθευση συσκευής είναι κρίσιμη για τον εντοπισμό πιθανής μόλυνσης κατά τη μεταφορά, την αποτροπή επιθέσεων στην εφοδιαστική αλυσίδα και τη διασφάλιση της ασφάλειας του εγκατεστημένου firmware.
  - Επισκέψου τη σελίδα επαλήθευσης συσκευής στον ιστότοπο του Keystone.
  - Κάνε κλικ στο Scan QR Code στην επίσημη ιστοσελίδα.
  - Χρησιμοποίησε την κάμερα του Keystone για να σαρώσεις τον κωδικό QR που εμφανίζεται στην ιστοσελίδα.
  - Ένας κωδικός επαλήθευσης θα εμφανιστεί στην οθόνη του Keystone.
  - Εισήγαγε αυτόν τον κωδικό στην ιστοσελίδα για να ολοκληρώσεις τη διαδικασία επαλήθευσης.

- **Ενημέρωση firmware:**
  - Ενημέρωση μέσω κάρτας MicroSD
    - Βεβαιώσου ότι το πορτοφόλι Keystone έχει τουλάχιστον 20% φόρτιση μπαταρίας.
    - Τοποθέτησε την κάρτα SD στον υπολογιστή σου και διαμόρφωσέ την ως FAT32.
    - Κατέβασε την πιο πρόσφατη έκδοση firmware Cypherpunk από τη σελίδα ενημέρωσης firmware του [Keystone](https://keyst.one/firmware) και αποθήκευσε το αρχείο keystone3.bin στον ριζικό κατάλογο της κάρτας MicroSD.
    - Τοποθέτησε την κάρτα SD με το firmware στο πορτοφόλι Keystone.
    - Άνοιξε την επιλογή “Upgrade” στο πορτοφόλι Keystone και, στη συνέχεια, ακολούθησε τις οδηγίες στην οθόνη για να ξεκινήσεις τη διαδικασία ενημέρωσης.
  - **Ενημέρωση μέσω καλωδίου USB**
    - Αν η έκδοση firmware σου είναι χαμηλότερη από 1.0.4, θα χρειαστεί να πραγματοποιήσεις την αρχική ενημέρωση χρησιμοποιώντας κάρτα MicroSD προτού μπορέσεις να συνεχίσεις με ενημερώσεις μέσω USB.
    - Βεβαιώσου ότι το πορτοφόλι Keystone έχει τουλάχιστον 20% φόρτιση μπαταρίας.
    - Πάτησε στο via USB και χρησιμοποίησε το καλώδιο USB για να συνδέσεις το πορτοφόλι Keystone στον υπολογιστή σου. Πάτησε [Approve] για να επιτρέψεις πρόσβαση USB στο πορτοφόλι Keystone, καθώς διαφορετικά ίσως επιτρέπει μόνο φόρτιση.
    - Άνοιξε το πρόγραμμα περιήγησης στον υπολογιστή σου και πήγαινε στη σελίδα ενημέρωσης firmware του [Keystone](https://keyst.one/firmware)
    - Στη σελίδα ενημέρωσης, κάνε κλικ στο κουμπί Install Update και ακολούθησε τις παρεχόμενες οδηγίες για να εγκαταστήσεις το πιο πρόσφατο firmware.
- **Δημιουργία πορτοφολιού:**
    - Ασφαλής κωδικός: Επίλεξε ένα ισχυρό PIN ή κωδικό πρόσβασης για να προστατεύσεις το πορτοφόλι σου.
    - Ονόμασε το πορτοφόλι σου (προαιρετικό): Προαιρετικά, δώσε στο πορτοφόλι σου ένα όνομα για εύκολη αναγνώριση ή παράλειψε αυτό το βήμα.
    - Επίλεξε Create New Wallet αν ρυθμίζεις πορτοφόλι για πρώτη φορά.
    - Η συσκευή σου θα δημιουργήσει μια φράση ανάκτησης 24 λέξεων.
    - Σημείωσε αυτή τη φράση ανάκτησης και αποθήκευσέ την με ασφάλεια.
    - Επιβεβαίωσε τη φράση ανάκτησης επαληθεύοντας τις λέξεις με τη σωστή σειρά, όπως εμφανίζονται στην οθόνη.
- **Σύνδεση πορτοφολιού Zashi + Keystone:**
    - Στη συσκευή Keystone: Πάτησε … στην κύρια σελίδα
    - Πάτησε Connect Software Wallet και επίλεξε Zashi. Θα εμφανιστεί ο κωδικός QR για σύνδεση με το Zashi.
    - Στην εφαρμογή Zashi: Πάτησε το αναπτυσσόμενο μενού zashi (επάνω αριστερά στην οθόνη)
    - Πάτησε Connect Hardware Wallet
    - Πάτησε Ready to Scan
    - Σάρωσε τον κωδικό QR που εμφανίζεται στη συσκευή Keystone
    - Στην εφαρμογή Zashi: Επιβεβαίωσε τον λογαριασμό πορτοφολιού Keystone πατώντας τον εμφανιζόμενο λογαριασμό
    - Πάτησε Connect στο κάτω μέρος της οθόνης


## Επιπλέον βοήθεια

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Connect Keystone Hardware Wallet to Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Sign an Outgoing Transaction with Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
