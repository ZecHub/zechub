# Πώς να εκτελέσεις το Zakura στο δίκτυο Akash

Οδηγός βήμα προς βήμα για έναν πλήρη κόμβο **Zakura** Zcash με το πρότυπο [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura).

Το Zakura είναι ένας κόμβος Zcash συμβατός με τη συναίνεση (fork του Zebra), με ταχύτερο συγχρονισμό, εγγενές pruning και εκκίνηση από snapshot. Αυτό το πρότυπο καρφιτσώνει την έκδοση **`zakuracore/zakura:1.8.1`** (με digest pinning· μη χρησιμοποιήσεις τα `:latest` ή `1.1.1`).

### Τι περιλαμβάνει

- P2P mainnet: container **8233**, δημοσιευμένο παγκοσμίως (δες την αντιστοίχιση θυρών παρακάτω)
- Μόνιμη κατάσταση με pruning (64 GiB από προεπιλογή) και εκκίνηση από snapshot του Valar κατά την πρώτη εκκίνηση
- Prometheus **9999** και έλεγχος υγείας **8080** (εσωτερικά, χωρίς δημόσιο URI)
- JSON-RPC **8232** εσωτερικά για το **lightwalletd** που βρίσκεται στο ίδιο σημείο· το LWD ακούει στη θύρα container **9067** και δημοσιεύεται παγκοσμίως

Σημαίες λειτουργιών στο SDL (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. Ο έλεγχος ταυτότητας με cookie είναι απενεργοποιημένος όταν το lightwalletd είναι ενεργό, επειδή το lightwalletd δεν μπορεί να διαβάσει αρχεία cookie.

### Ποιον ιστότοπο να χρησιμοποιήσεις (πληρωμές)

Το SDL είναι το ίδιο. Οι δύο διαδικτυακές διεπαφές του Akash διαφέρουν ως προς **τον τρόπο πληρωμής**.

| Ιστότοπος | Πληρωμές | Πορτοφόλι |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Παραδοσιακή διαδικτυακή ολοκλήρωση αγοράς (κάρτα / κανάλια fiat που προσφέρει το Console) | Λογαριασμός Console |
| [air.akash.network](https://air.akash.network) | Πληρωμές στο blockchain του Akash (AKT / ACT) | **Keplr** |

Χρησιμοποίησε το **Air** αν θέλεις να πληρώσεις με Keplr on-chain. Χρησιμοποίησε το **Console** αν θέλεις τη συνηθισμένη διαδικασία διαδικτυακής πληρωμής. Μην περιμένεις εγγενή εκκαθάριση του Keplr στο Console.

### Ανάπτυξη

**Διαδικτυακές πληρωμές (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Εγγενείς πληρωμές του Akash με Keplr (Air)**

[Άνοιξε αυτό το πρότυπο στο Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Άνοιξε τον αντίστοιχο παραπάνω σύνδεσμο (Console ή Air).
2. Στο Air, σύνδεσε το **Keplr** και επιβεβαίωσε ότι έχεις AKT/ACT για την κατάθεση και τη μίσθωση. Στο Console, ολοκλήρωσε τη διαδικτυακή αγορά που εμφανίζει η διεπαφή.
3. Φόρτωσε το `zcash-zakura/deploy.yaml` αν δεν έχει ήδη συμπληρωθεί.
4. Κάνε κατάθεση, αποδέξου μια προσφορά και περίμενε τη μίσθωση.
5. Τα αρχεία καταγραφής πρέπει να δείχνουν τη λήψη snapshot (κατά την πρώτη εκκίνηση) και μετά το `zakurad start`.
6. Άνοιξε **Leases → URIs**. Χρησιμοποίησε τον host:port που σου ανέθεσε ο πάροχος, όχι τις θύρες 8233 ή 9067 στη δημόσια IP.

### Πώς το Akash δημοσιεύει θύρες

Οι θύρες SDL `port` / `as` (8233, 9067, 8232) είναι θύρες **container**. Το Zakura εξακολουθεί να ακούει στη θύρα 8233· το lightwalletd στη θύρα 9067· το RPC στη θύρα 8232 για το sidecar LWD (`zakura:8232`).

**Δεν** είναι οι θύρες στη δημόσια IP του παρόχου.

**Προεπιλογή (αυτό το πρότυπο):** Δεν υπάρχει αποκλειστική IP. Κάθε έκθεση TCP του `global: true` αντιστοιχίζεται σε μια **τυχαία θύρα υψηλής τιμής** σε κοινόχρηστο host παρόχου. Το Console/Air τις εμφανίζει ως URI μίσθωσης, για παράδειγμα:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Οι peers συνδέονται στο URI **8233** (`provider.example:31482`). Τα compact πορτοφόλια χρησιμοποιούν το URI **9067** (το TLS είναι απενεργοποιημένο, εκτός αν τερματίσεις εσύ το TLS). Όρισε το `ZAKURA_NETWORK__EXTERNAL_ADDR` στο αντιστοιχισμένο URI P2P, όχι στο `:8233`.

Οι **εσωτερικές** εκθέσεις (RPC του `8232`, μετρικές του `9999`, έλεγχος υγείας του `8080`) παραμένουν στο δίκτυο ανάπτυξης. Δεν υπάρχει δημόσιο URI.

Οι **αποκλειστικές IP** (`endpoints` / `kind: ip`) είναι επί πληρωμή και **δεν** περιλαμβάνονται σε αυτό το πρότυπο. Μπορούν να δεσμεύσουν μια δημόσια IP και μερικές φορές τη θύρα `as`. Πρόσθεσέ τες μόνο αν χρειάζεσαι ένα σταθερό `host:8233`.

### Αρχειοθέτηση έναντι pruning

Η προεπιλογή είναι **pruned** (snapshot ~11 GiB, δίσκος 64 GiB). Για να έχεις όλο το ιστορικό, όρισε το `SNAPSHOT_KIND=archive`, αύξησε τον δίσκο στα 350 GiB ή περισσότερο και όρισε το `ZAKURA_STATE__STORAGE_MODE=archive`.

### Σχετικά

- [Zebra στο Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (πλήρες ιστορικό, χωρίς snapshot)
- [Το Thus Spoke Zakura στο Akash](/guides/thus-spoke-zakura-akash) — Πίνακας ελέγχου Regtest + εφαρμογή (v0.4.1)
- Zakura πηγαίος κώδικας: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Snapshots: [zakura.com/snapshots/](https://zakura.com/snapshots/)
