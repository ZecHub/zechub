# Οδηγός μετεγκατάστασης: Από το zcashd στο Zebrad/Zallet

Ο παραδοσιακός πλήρης κόμβος zcashd, που συντηρείται από την *Electric Coin Company (ECC)* / *Zodl*, έχει αντικατασταθεί από τα Zebra και Zallet. Το zcashd έφτασε στο τέλος υποστήριξής του στις 18 Ιουλίου 2026 και δεν λειτουργεί πλέον.

- Το Zebra είναι μια σύγχρονη υλοποίηση Rust του πρωτοκόλλου Zcash που αναπτύχθηκε από το Zcash Foundation
- Το Zallet είναι ένα ελαφρύ πορτοφόλι, σχεδιασμένο να διασυνδέεται απρόσκοπτα με κόμβους Zebra που αναπτύχθηκαν από το Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Αυτός ο οδηγός σε καθοδηγεί στη μετεγκατάσταση από το **zcashd** στα **Zebrad** και **Zallet**, συμπεριλαμβανομένης της εγκατάστασης, της εισαγωγής πορτοφολιού και της αντιμετώπισης συνηθισμένων προβλημάτων μετεγκατάστασης.

---

## Το zcashd σταμάτησε να λειτουργεί στις 18 Ιουλίου 2026

**Τι σημαίνει αυτό**

- Το zcashd έφτασε στο τέλος υποστήριξής του στις 18 Ιουλίου 2026. Δεν θα συγχρονιστεί ξανά με την κορυφή της αλυσίδας και δεν μπορεί να στείλει ή να λάβει κεφάλαια. Αυτό έχει ήδη ολοκληρωθεί, δεν είναι προγραμματισμένο.
- Οι δύο λειτουργίες του zcashd έχουν πλέον διαχωριστεί: το **zebrad** είναι ο πλήρης κόμβος και το **Zallet** είναι το πορτοφόλι.
- Το Zallet βρίσκεται σε **beta**. Ενδέχεται να υπάρξουν ασύμβατες αλλαγές μεταξύ εκδόσεων και ορισμένες μέθοδοι JSON-RPC του zcashd δεν έχουν ακόμη υλοποιηθεί. Έλεγξε τον [πίνακα κατάστασης μεθόδων](https://zcash.github.io/zallet/) πριν βασιστείς σε μια συγκεκριμένη κλήση.
- Αν εξακολουθείς να έχεις κεφάλαια **Sprout**, διάβασε πρώτα την προειδοποίηση στο βήμα 6. Το Zallet δεν υποστηρίζει το pool Sprout και ο συνήθης τρόπος μετακίνησης αυτών των κεφαλαίων απαιτούσε ένα ενεργό zcashd.

**Γιατί να μετεγκατασταθείς - πέρα από την απόσυρση**

Ακόμη και πέρα από την απόσυρση, υπάρχουν σημαντικοί λόγοι για να μετακινηθείς:
- Ασφάλεια και ανθεκτικότητα: Η ασφάλεια μνήμης και τα σύγχρονα εργαλεία του Rust μειώνουν τους κινδύνους ευπαθειών.
- Επιδόσεις και αποδοτικότητα: Το Zebrad έχει σχεδιαστεί για παραλληλισμό, αποδοτικότερη χρήση πόρων και ταχύτερο συγχρονισμό.
- Αρθρωτή αρχιτεκτονική: Ο διαχωρισμός της λογικής του κόμβου (Zebrad) από το UI του πορτοφολιού (Zallet) προσφέρει σαφέστερα όρια και καλύτερες διαδρομές αναβάθμισης.
- Συμβατότητα με το μελλοντικό οικοσύστημα: Τα εργαλεία, οι βελτιώσεις και το υπόλοιπο οικοσύστημα του Zcash θα στοχεύουν ολοένα και περισσότερο στα Zebrad/Zallet.
- Ηρεμία: Απόφυγε να εγκλωβιστείς στη χρήση ενός αποσυρμένου στοιχείου χωρίς υποστήριξη.

### Τώρα ας δούμε τον οδηγό μετεγκατάστασης

**1. Δημιούργησε αντίγραφα ασφαλείας για τα πάντα**
* Δημιούργησε αντίγραφο ασφαλείας του wallet.dat σου (ή οποιουδήποτε άλλου αρχείου πορτοφολιού / χώρου αποθήκευσης κλειδιών) από τον κόμβο zcashd σου.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Αποθήκευσε το zcash.conf και τυχόν προσαρμοσμένες ρυθμίσεις.
* Εξήγαγε ένα αντίγραφο από τυχόν RPC scripts ή αυτοματισμούς που χρησιμοποιείς.
* Επαλήθευσε ότι τα αντίγραφα ασφαλείας σου είναι έγκυρα (π.χ. σε άλλο περιβάλλον, προσπάθησε να τα ανοίξεις ή να τα επιθεωρήσεις).
* Εξέτασε ποιες μεθόδους JSON-RPC χρησιμοποιείς επί του παρόντος.
* Σύγκρινε με τον προγραμματισμένο πίνακα συμβατότητας που διατηρείται στον ιστότοπο υποστήριξης [Zcash](https://z.cash/support/zcashd-deprecation/) 
* Προετοιμάσου για αλλαγές ή μεθόδους που λείπουν (ορισμένες μπορεί να χρειάζονται παράκαμψη ή προσαρμογή).

**2. Απαιτήσεις συστήματος και χώρος δίσκου**
* Ο χώρος δίσκου είναι η απαίτηση που οι άνθρωποι υποτιμούν. Η αλυσίδα Zcash ξεπέρασε τα **270 GB** τον Αύγουστο του 2026, επομένως φρόντισε να έχεις τουλάχιστον **300 GB** ελεύθερου χώρου, σε SSD αν μπορείς.
* Βεβαιώσου ότι το μηχάνημά σου διαθέτει σταθερό δίκτυο, CPU και RAM.
* Μια σύνδεση στο διαδίκτυο 
* Αν σκοπεύεις να κάνεις compile από τον πηγαίο κώδικα, εγκατέστησε τα Rust και Cargo.

**3. Εγκατάσταση / ρύθμιση του Zebrad**
Μπορείς είτε να κατεβάσεις ένα προδημιουργημένο binary είτε να κάνεις build από τον πηγαίο κώδικα.
* Το Zcash Foundation δημοσιεύει εκδόσεις και binaries για το Zebra. Για παράδειγμα, μπορείς να χρησιμοποιήσεις ένα script εγκατάστασης ή να κατεβάσεις το κατάλληλο binary για το λειτουργικό σου σύστημα.

* Σημείωσε ότι στις πρόσφατες εκδόσεις του Zebra, [το endpoint RPC δεν είναι πλέον ενεργοποιημένο από προεπιλογή στο Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Επιλογή A: Εγκατάσταση μέσω προδημιουργημένου binary**  
Σε **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Αυτό εγκαθιστά την τελευταία σταθερή έκδοση του zebrad.

**Επιλογή B: Build από τον πηγαίο κώδικα**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Μετά το build, μετακίνησε το binary στο path σου:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Ρύθμιση και εκκίνηση**  
Δημιούργησε μια προεπιλεγμένη ρύθμιση:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Επεξεργάσου το **zebrad.toml** σύμφωνα με τις προτιμήσεις σου (διεύθυνση ακρόασης, θύρες, κατάλογος κατάστασης, caching).

**Εκκίνησε τον κόμβο:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Ο κόμβος θα αρχίσει να συγχρονίζεται από το genesis — υπολόγισε αρκετές ώρες (ή περισσότερο), ανάλογα με το hardware και το δίκτυο.

**5. Εγκατάσταση / ρύθμιση του Zallet (πορτοφόλι)**

Το Zallet έχει σχεδιαστεί για να αντικαταστήσει το τμήμα πορτοφολιού του zcashd.

Έλεγξε τη σελίδα Zallet GitHub / εκδόσεων για binaries.

**Ή κάνε build από τον πηγαίο κώδικα:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Εκκίνησε το GUI ή το CLI (όπως παρέχει η εγκατάστασή σου).
* Ρύθμισέ το ώστε να συνδέεται με τον τοπικό κόμβο Zebrad σου μέσω endpoint RPC ή API.

**6. Εισαγωγή του πορτοφολιού zcashd στο Zallet**

Δεν χρειάζεσαι ένα ενεργό zcashd για αυτό. Το Zallet διαβάζει απευθείας το αρχείο `wallet.dat`, κάτι σημαντικό επειδή το zcashd δεν μπορεί πλέον να εκκινηθεί.

> **Κράτησε το `wallet.dat`.** Η μετεγκατάσταση αναφέρει οτιδήποτε δεν μπορεί να αναπαραστήσει σε ένα πορτοφόλι Zallet αντί να το εισαγάγει, και το υλικό κλειδιών τότε υπάρχει μόνο στο `wallet.dat`. Μην το διαγράψεις μετά τη μετεγκατάσταση.

Εκτέλεσε πρώτα το `zallet init-wallet-encryption`. Το Zallet κρυπτογραφεί το υλικό κλειδιών σε μια ταυτότητα age και αυτή η ταυτότητα πρέπει να υπάρχει πριν εισαχθούν οποιαδήποτε κλειδιά.

Έπειτα μετέτρεψε τη ρύθμιση και το πορτοφόλι σου:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

Το `migrate-zcashd-wallet` υπάρχει μόνο σε builds με τη δυνατότητα `zcashd-import` και η ανάγνωση του `wallet.dat` χρειάζεται το εργαλείο `db_dump` από το Berkeley DB 6.2, την έκδοση που χρησιμοποιούσε το zcashd. Αν έχεις περισσότερα από ένα αρχεία πορτοφολιού, εκτέλεσε την εντολή μία φορά για κάθε αρχείο και πρόσθεσε το `--allow-multiple-wallet-imports` στις επόμενες εκτελέσεις· το καθένα γίνεται ξεχωριστό σύνολο λογαριασμών. Τα `rpcuser` και `rpcpassword` σου δεν μεταφέρονται, επειδή το JSON-RPC του Zallet χρησιμοποιεί προεπιλεγμένα έλεγχο ταυτότητας cookie· πρόσθεσε διαπιστευτήρια με το `zallet add-rpc-user` αν τα χρειάζεσαι.

**Τι μεταφέρεται**

* Mnemonic seeds και τα κλειδιά που παράγονται από αυτά, με λογαριασμούς που αναδημιουργούνται ώστε να αντιστοιχούν στο πορτοφόλι zcashd
* Αυτόνομα εισαγμένα spending keys Sapling και διαφανή κλειδιά
* Διαφανείς εγγραφές μόνο για προβολή που περιλαμβάνουν το δημόσιο κλειδί ή το redeem script τους
* Τα γενέθλια των λογαριασμών, ώστε η σάρωση της αλυσίδας να ξεκινά στο σωστό ύψος

**Τι δεν μεταφέρεται.** Αυτά αναφέρονται με πλήθος αντί να εισάγονται:

* **Spending keys και κεφάλαια Sprout.** Το Zallet δεν υποστηρίζει το pool Sprout. Η τεκμηριωμένη διαδρομή ήταν να μετακινήσεις τα κεφάλαια Sprout χρησιμοποιώντας το zcashd πριν το αποσύρεις, και αυτό δεν είναι πλέον δυνατό. Αν αυτό σε επηρεάζει, ρώτησε στο [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) ή στο [κοινοτικό φόρουμ](https://forum.zcashcommunity.com/) πριν κάνεις οτιδήποτε άλλο.
* Εγγραφές βιβλίου διευθύνσεων
* Εγγραφές μόνο για προβολή αποθηκευμένες χωρίς δημόσιο κλειδί ή redeem script, και εγγραφές με ασυμπίεστα δημόσια κλειδιά
* Πορτοφόλια Regtest

**Δημιουργία αντιγράφων ασφαλείας στη συνέχεια.** Ένα mnemonic από μόνο του δεν είναι πλήρες αντίγραφο ασφαλείας, επειδή τα εισαγμένα κλειδιά υπάρχουν μόνο στη βάση δεδομένων του πορτοφολιού. Κράτησε ασφαλή αντίγραφα του `wallet.db`, του αρχείου ταυτότητας κρυπτογράφησης age που ορίζεται από την επιλογή `keystore.encryption_identity` και της mnemonic φράσης σου, και κράτησε το αρχικό `wallet.dat`. Σημείωσε ότι το `wallet.db` δεν είναι από μόνο του κρυπτογραφημένο: περιέχει το ιστορικό συναλλαγών σου και τα viewing keys σου σε καθαρό κείμενο, επομένως αποθήκευσε το αντίγραφο ασφαλείας κάπου ασφαλές.

**Επανασάρωση και συγχρονισμός πορτοφολιού**

* Μόλις εισαχθούν τα κλειδιά, το Zallet θα ενεργοποιήσει επανασάρωση της αλυσίδας μέσω του Zebrad.
* Δώσε λίγο χρόνο στο Zallet για να αναδημιουργήσει το υπόλοιπο και το ιστορικό συναλλαγών σου.

**7. Επαλήθευση υπολοίπων και συγχρονισμού**

Μόλις ολοκληρωθεί η εισαγωγή, το Zallet θα συνδεθεί με τον κόμβο Zebrad σου και θα σαρώσει ξανά το blockchain.
Όταν ολοκληρωθεί ο συγχρονισμός, τα υπόλοιπα και οι συναλλαγές σου θα πρέπει να εμφανίζονται ακριβώς όπως πριν.

Μπορείς να επαληθεύσεις την κατάσταση συγχρονισμού του κόμβου σου εκτελώντας:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Ή έλεγξε τα logs.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Αντιμετώπιση προβλημάτων**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Πρόβλημα</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Πιθανή αιτία</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Λύση</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Το Zebrad δεν εκκινείται</td>
        <td className="px-6 py-4">Η θύρα χρησιμοποιείται ήδη ή εσφαλμένη ρύθμιση</td>
        <td className="px-6 py-4">Έλεγξε το **zebrad.toml** και χρησιμοποίησε μια ελεύθερη θύρα</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Αργός συγχρονισμός</td>
        <td className="px-6 py-4">Συμφόρηση δικτύου</td>
        <td className="px-6 py-4">Βεβαιώσου ότι το διαδίκτυο είναι σταθερό και επανεκκίνησε το Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Λείπουν συναλλαγές από το πορτοφόλι</td>
        <td className="px-6 py-4">Μερική εισαγωγή κλειδιών</td>
        <td className="px-6 py-4">Εισήγαγε ξανά τα κλειδιά ή κάνε επανασάρωση στο Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Το Zallet δεν μπορεί να συνδεθεί με τον κόμβο</td>
        <td className="px-6 py-4">Ο κόμβος δεν εκτελείται ή το endpoint είναι λανθασμένο</td>
        <td className="px-6 py-4">Εκκίνησε το Zebrad και επαλήθευσε τη σωστή θύρα RPC</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Το Zallet καταρρέει</td>
        <td className="px-6 py-4">Παρωχημένο build</td>
        <td className="px-6 py-4">Ενημέρωσε στην τελευταία έκδοση από το GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Συμπέρασμα**

Η μετεγκατάσταση από το zcashd στα Zebrad και Zallet σου προσφέρει μια ταχύτερη, ασφαλέστερη και πιο σύγχρονη εμπειρία Zcash.
Με ασφάλεια βασισμένη στο Rust, αρθρωτό σχεδιασμό και καλύτερα εργαλεία, αυτή η ρύθμιση διασφαλίζει ότι ο κόμβος και το πορτοφόλι σου παραμένουν έτοιμα για το μέλλον, καθώς το οικοσύστημα Zcash συνεχίζει να εξελίσσεται.

Συμβουλή: Κράτησε τα κλειδιά του πορτοφολιού σου offline και δημιούργησε τακτικά αντίγραφα ασφαλείας των δεδομένων Zallet σου.
Επισκέψου το [zebra.zfnd.org](https://zebra.zfnd.org) για Zebra, καθώς και το [Βιβλίο του Zallet](https://zcash.github.io/zallet/) ή το αποθετήριο [Zallet](https://github.com/zcash/zallet) για Zallet. Το κεφάλαιο [Μετεγκατάσταση από το zcashd](https://zcash.github.io/zallet/) του Βιβλίου του Zallet αποτελεί την έγκυρη αναφορά για το βήμα 6.
