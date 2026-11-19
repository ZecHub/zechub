# Έτσι μίλησε το Zakura στο Akash (Regtest)

Εκτέλεσε το stack **Thus Spoke Zakura v0.4.1** στο Akash: Zakura Regtest, lightwalletd και το **dashboard / HTTP API** του πορτοφολιού. Τα δοκιμαστικά νομίσματα δεν έχουν αξία. Μη στείλεις εδώ ZEC του mainnet.

Πρότυπο: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Ανάντη: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) tag **v0.4.1**

### Εικόνες

| Υπηρεσία | Εικόνα |
| --- | --- |
| Dashboard + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (καρφιτσωμένο στο launcher της έκδοσης 0.4.1) |

### Αυτόματη αρχικοποίηση

Κατά την πρώτη εκκίνηση, το κοντέινερ `app` εκτελεί το `ths-server init` στον μόνιμο τόμο του και στη συνέχεια το `ths-server serve`. Η υπηρεσία επαναλαμβάνει τις προσπάθειες μέχρι να είναι διαθέσιμα το JSON-RPC του Zakura και το lightwalletd. Δεν εκτελείς το `ths` στον πάροχο· το SDL είναι το περιβάλλον εκτέλεσης.

### Πώς το Akash δημοσιεύει θύρες

Οι θύρες SDL `port` / `as` είναι θύρες **κοντέινερ**. Η εφαρμογή ακούει στη **8080** (`THS_LISTEN`)· το lightwalletd στη **9067**· το RPC του Zakura στη **18232** και το P2P στη **18233**. Μέσα στην ανάπτυξη, οι υπηρεσίες χρησιμοποιούν ήδη αυτές τις θύρες (`http://zakura:18232`, `http://lightwalletd:9067`).

Δεν είναι οι θύρες στη δημόσια IP του παρόχου.

**Προεπιλογή (αυτό το πρότυπο):** χωρίς αποκλειστική IP.

| Υπηρεσία | Θύρα ακρόασης κοντέινερ | SDL `as` | Πώς εμφανίζεται στη μίσθωση |
| --- | --- | --- | --- |
| `app` (dashboard + HTTP API) | 8080 | 80 (HTTP) | Όνομα κεντρικού υπολογιστή εισερχόμενης κίνησης, συχνά στις 80/443 — **άνοιξε αυτό το URI σε ένα πρόγραμμα περιήγησης** |
| `lightwalletd` | 9067 | 9067 (TCP, καθολική) | `host:&lt;random-high-port&gt;` |
| RPC του `zakura` | 18232 | 18232 (TCP, καθολική) | `host:&lt;random-high-port&gt;` |
| P2P του `zakura` | 18233 | 18233 (TCP, καθολική) | `host:&lt;random-high-port&gt;` |

Μόλις η μίσθωση είναι έτοιμη, η ενότητα **Leases → URIs** είναι η έγκυρη πηγή. Άνοιξε το URI **`app`** για το dashboard (το ίδιο περιβάλλον χρήστη που ανοίγει το `ths` τοπικά). Κατεύθυνε τα compact clients στο URI **lightwalletd** (`THS_LIGHTWALLETD_TLS=false`). Μην πληκτρολογήσεις `:8080`, `:80` ή `:9067` στη διεύθυνση IP του παρόχου, εκτός αν μια μίσθωση με αποκλειστική IP έχει κάνει δημόσιες αυτές τις θύρες.

Οι **αποκλειστικές IP** (`endpoints` / `kind: ip`) είναι επί πληρωμή πρόσθετη δυνατότητα και **δεν** περιλαμβάνονται σε αυτό το πρότυπο. Μπορούν να δεσμεύσουν μια δημόσια IP και, μερικές φορές, τη θύρα `as`. Άφησέ τες απενεργοποιημένες, εκτός αν τις χρειάζεσαι.

### Ποιο site να χρησιμοποιήσεις (πληρωμές)

Το SDL είναι το ίδιο. Τα δύο περιβάλλοντα χρήστη ιστού του Akash διαφέρουν ως προς **τον τρόπο πληρωμής**.

| Site | Πληρωμές | Πορτοφόλι |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Παραδοσιακή ολοκλήρωση αγοράς στον ιστό (κάρτα / τρόποι πληρωμής σε παραστατικό νόμισμα που προσφέρει το Console) | Λογαριασμός Console |
| [air.akash.network](https://air.akash.network) | Πληρωμές εγγενώς στο blockchain Akash (AKT / ACT) | **Keplr** |

Χρησιμοποίησε το **Air** αν θέλεις να πληρώσεις με Keplr on-chain. Χρησιμοποίησε το **Console** αν θέλεις έναν συμβατικό τρόπο πληρωμής μέσω ιστού.

### Ανάπτυξη

**Πληρωμές μέσω ιστού (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Εγγενείς πληρωμές Akash με Keplr (Air)**

[Άνοιξε αυτό το πρότυπο στο Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Δημιούργησε την ανάπτυξη από το πρότυπο, αποδέξου μια προσφορά, περίμενε μέχρι τα αρχεία καταγραφής του `app` να δείξουν ότι το `ths-server serve` παραμένει ενεργό και, στη συνέχεια, άνοιξε το URI **`app`** για το dashboard.

### Σχετικά

- [Zakura στο Akash](/guides/akash-network-zakura) — Κόμβος επικύρωσης Mainnet/Testnet
- [Zebra στο Akash](/guides/akash-network-zebra)
- Βιβλίο: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
