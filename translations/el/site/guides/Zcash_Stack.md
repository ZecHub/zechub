<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Επεξεργασία σελίδας"/>
</a>

# Zcash Stack: Εκτέλεση διακομιστή Light Wallet σε Kubernetes ή Docker

[Zcash Stack](https://github.com/zecrocks/zcash-stack) είναι το κιτ ανάπτυξης ανοικτού κώδικα από την ομάδα πίσω από το zec.rocks. Περιλαμβάνει έναν πλήρη κόμβο Zcash, έναν διακομιστή light wallet και προαιρετικά πρόσθετα (Zaino, έναν block explorer, μια κρυφή υπηρεσία Tor, έναν DNS seeder, zecd, έναν διακομιστή μεσολάβησης gRPC-web για πορτοφόλια προγράμματος περιήγησης) ως Helm chart για το Kubernetes και ως αρχεία Compose Docker. Όλοι οι διακομιστές zec.rocks lightwalletd εκτελούνται από αυτό το chart. Το έργο χρηματοδοτείται από το [Zcash Community Grants](https://zcashcommunitygrants.org/).

Αυτή η σελίδα συνοψίζει τι αναπτύσσει το κιτ, τι χρειάζεσαι πριν από την εγκατάστασή του και ποιες ρυθμίσεις έχουν τη μεγαλύτερη σημασία. Ακολουθεί την έκδοση chart **0.4.9** (κυκλοφόρησε στις 13 Νοεμβρίου 2026). Το [README του chart](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) και οι [σημειώσεις του εργαστηρίου](https://github.com/zecrocks/zcash-stack/tree/main/docs) του έργου είναι οι πηγές αναφοράς· διάβασέ τα πριν εκτελέσεις οτιδήποτε σε περιβάλλον παραγωγής.

## Με λίγα λόγια

- **Δύο τρόποι εγκατάστασης.** Ένα Helm chart για το Kubernetes (το k3s σε δικό σου υλικό NVMe είναι ο κύριος στόχος· λειτουργούν επίσης τα GKE Standard και Autopilot) και αρχεία Compose Docker για ένα μηχάνημα. Το εργαστήριο προτείνει το Docker αν είσαι νέος στην εκτέλεση διακομιστών και το Kubernetes αν διαχειρίζεσαι ήδη στόλους διακομιστών.
- **Ένας κόμβος αλυσίδας και ένας διακομιστής light wallet.** Η προτεινόμενη ρύθμιση είναι Zebra + lightwalletd. Το Zakura μπορεί να αντικαταστήσει το Zebra ως backend, ενώ το Zaino μπορεί να αντικαταστήσει ή να λειτουργεί παράλληλα με το lightwalletd.
- **Υπολόγισε περίπου 600 GiB χώρου στον δίσκο.** Η κατάσταση της αλυσίδας του Zebra ήταν περίπου 260 GiB τον Ιούνιο του 2026 και αυξάνεται· η cache του light wallet προσθέτει περίπου 17 GiB. Ο πλήρης συγχρονισμός διαρκεί μέρες, οπότε το chart μπορεί να κάνει επαναφορά από δημοσιευμένο snapshot.
- **Το chart καρφιτσώνει τις εκδόσεις των images.** Στην έκδοση 0.4.9 αυτές είναι Zebra 7.0.0 (ακολουθεί το NU7), lightwalletd v0.6.1, Zakura 1.8.6 και Zaino 0.8.0. Ενημέρωσε το chart πριν από αναβαθμίσεις δικτύου και πριν η έκδοση του Zakura φτάσει στο ύψος λήξης υποστήριξης.
- **Δήλωσε τον διακομιστή σου.** Αν διαχειρίζεσαι δημόσιο διακομιστή, μπορείς να τον προσθέσεις στο [hosh.zec.rocks](https://hosh.zec.rocks/zec) monitor, ώστε τα πορτοφόλια και οι χρήστες να βλέπουν αν λειτουργεί.

## Τι αναπτύσσεται

Κάθε στοιχείο ενεργοποιείται ή απενεργοποιείται μέσω ενός διακόπτη στο [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) του chart. Μόνο το lightwalletd είναι ενεργοποιημένο από προεπιλογή και χρειάζεται έναν κόμβο αλυσίδας, γι’ αυτό και τα παραδείγματα ενεργοποιούν επίσης το Zebra.

| Στοιχείο | Image στο chart 0.4.9 | Προεπιλογή | Λειτουργία |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | απενεργοποιημένο (ενεργοποιημένο στα παραδείγματα) | Πλήρης κόμβος· επικυρώνει την αλυσίδα και παρέχει RPC σε όλα τα άλλα στοιχεία |
| Zakura | `zakuracore/zakura:1.8.6` | απενεργοποιημένο | Fork του Zebra· εναλλακτικό backend για το lightwalletd ή το Zaino αντί για το Zebra |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | ενεργοποιημένο | Διακομιστής light wallet (gRPC) για πορτοφόλια κινητών και υπολογιστών |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | απενεργοποιημένο | Indexer του Rust που εξυπηρετεί επίσης light wallet |
| Block explorer | `emersonian/zcash-explorer:v0.0.6` | απενεργοποιημένο | Web explorer που διαβάζει το JSON-RPC του κόμβου (το Zaino δεν μπορεί να το υποστηρίξει: παρέχει μόνο gRPC) |
| Tor | `osminogin/tor-simple:0.4.9.16` | απενεργοποιημένο | Δημοσιεύει το lightwalletd ή το Zaino ως υπηρεσία `.onion` |
| DNS seeder | `zfnd/dnsseeder:v1.8.0` | απενεργοποιημένο | Βοηθά τους νέους κόμβους να βρίσκουν ομότιμους κόμβους |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | απενεργοποιημένο | Διακομιστής πορτοφολιού με προτεραιότητα στα θωρακισμένα δεδομένα (δες [zecd](/zcash-tech/zecd)) |
| Διακομιστής μεσολάβησης gRPC-web | `envoyproxy/envoy:v1.40.2` | απενεργοποιημένο | Επιτρέπει στα πορτοφόλια προγράμματος περιήγησης να επικοινωνούν με το lightwalletd, στο οποίο δεν μπορούν να έχουν πρόσβαση τα προγράμματα περιήγησης μέσω απλού gRPC |
| Πορτοφόλι WebZjs | `ghcr.io/zecrocks/webzjs-wallet` | απενεργοποιημένο | Πορτοφόλι προγράμματος περιήγησης· χρειάζεται τον διακομιστή μεσολάβησης gRPC-web στον ίδιο κεντρικό υπολογιστή |

Δύο σημειώσεις για τις εκδόσεις. Το upstream του Zaino βρίσκεται στην έκδοση [0.10.1](https://github.com/zingolabs/zaino/releases), ενώ το chart εξακολουθεί να περιλαμβάνει το image 0.8.0, οπότε έλεγξε το `values.yaml` προτού βασιστείς σε νεότερη συμπεριφορά του Zaino. Επίσης, οι κόμβοι Zakura σταματούν στο Mainnet σε ύψος λήξης υποστήριξης που ορίζεται ανά έκδοση: για την 1.8.6 αυτό είναι το μπλοκ 3.643.309, γύρω στις 5 Δεκεμβρίου 2026, ενώ οι εκδόσεις x86-64 από την 1.8.0 και μετά αρνούνται να ξεκινήσουν σε CPU χωρίς BMI2 και ADX. Η σελίδα [Zakura Node](/zcash-tech/zakura-node) καλύπτει και τα δύο.

## Kubernetes: πριν από την εγκατάσταση

Το chart αναπτύσσεται με βάση τρία πράγματα που ρυθμίζεις μία φορά για κάθε cluster.

1. **Έναν ingress controller.** Το chart δημιουργεί ένα τυπικό Kubernetes `Ingress` και ορίζει από προεπιλογή την κλάση `nginx`· προτείνεται το ingress-nginx, επειδή χειρίζεται το gRPC με τον ίδιο τρόπο σε k3s και GKE. Στο k3s, είτε εγκατέστησε το k3s με `--disable traefik` είτε διατήρησε το Traefik και όρισε τα `ingress.className: traefik` και `ingress.backendProtocol: GRPC` (το chart τότε δημιουργεί ένα Traefik `IngressRoute`, επειδή ένα απλό Ingress μέσω Traefik επιστρέφει HTTP 500 για gRPC). Στο GKE, η ενσωματωμένη κλάση ingress `gce` δεν μπορεί να δρομολογήσει gRPC προς το lightwalletd ή το Zaino.
2. **Το cert-manager και ένα ClusterIssuer** για αυτόματα πιστοποιητικά Let's Encrypt (`examples/cluster-issuer.yaml`· πρώτα δοκίμασε με τον issuer staging). Στο GKE Autopilot, εγκατέστησε το cert-manager με το `--set global.leaderElection.namespace=cert-manager`, διαφορετικά η δημιουργία issuer αποτυγχάνει με σφάλμα x509 «unknown authority». Μπορείς να παραλείψεις το cert-manager και να ορίσεις το `<service>.ingress.tls.secretName` στο δικό σου πιστοποιητικό.
3. **Έναν StorageClass.** Το `local-path` είναι κατάλληλο για k3s με NVMe. Στο GKE, δώσε στο Zebra μια κλάση provisioned-IOPS (το repo περιλαμβάνει παράδειγμα Hyperdisk) και αύξησε πρώτα το περιφερειακό όριο δίσκου: τα νέα έργα GKE επιτρέπουν μόνο 500 GB SSD και 500 GB Hyperdisk ανά περιοχή, ενώ ένας κόμβος αλυσίδας χρειάζεται 300 έως 500 GB. Διαφορετικά, ο τόμος παραμένει σε κατάσταση `Pending` με `QUOTA_EXCEEDED`. Η ρύθμιση `storageClassName` δεν αλλάζει σε υπάρχον StatefulSet χωρίς να δημιουργήσεις ξανά τον τόμο.

Στη συνέχεια, όρισε μια εγγραφή DNS για κάθε όνομα κεντρικού υπολογιστή, ώστε να δείχνει στην εξωτερική IP του ingress controller. Αν δεν έχεις ακόμη DNS, πρόσθεσε ένα όνομα [sslip.io](https://sslip.io), όπως το `203-0-113-7.sslip.io`, δίπλα στο πραγματικό σου όνομα: επιλύεται στη διεύθυνση IP που περιέχει, οπότε εκδίδεται αμέσως πιστοποιητικό. Για διακομιστές μόνιμης λειτουργίας, κράτησε το δικό σου όνομα κεντρικού υπολογιστή ως κύριο.

## Kubernetes: εγκατάσταση

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

Το παράδειγμα [`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) ενεργοποιεί το Zebra, συνδέει το lightwalletd σε αυτό, δίνει στο lightwalletd cache 40 GiB και TLS ingress και διατηρεί το RPC του κόμβου εντός του cluster. Άλλαξε το ενδεικτικό όνομα χρήστη και τον κωδικό πρόσβασης RPC πριν από την εγκατάσταση. Άλλα παραδείγματα καλύπτουν το testnet, το GKE, το GKE Autopilot με υψηλή διαθεσιμότητα, μια κρυφή υπηρεσία Tor και την αρχική ρύθμιση sslip.io.

Για αναβάθμιση, εκτέλεσε το `helm repo update`, κάνε προεπισκόπηση της αλλαγής με το πρόσθετο helm-diff (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`) και μετά εκτέλεσε το `helm upgrade` με τα ίδια ορίσματα. Αν αναβαθμίζεις από chart 0.0.x, διάβασε πρώτα το [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md): η έκδοση 0.1.0 αντικατέστησε την παλιά ρύθμιση Traefik με τυπικό Ingress και cert-manager, ενώ άλλαξε και η διάταξη των values.

## Απαιτήσεις πόρων

| | Κανονική λειτουργία | Αρχικός συγχρονισμός | Δίσκος |
|:--|:--|:--|:--|
| Zebra | περίπου 0,1 vCPU, 1,6 GiB | Μεγάλη χρήση CPU, IOPS και μνήμης | περίπου 260 GiB (Ιούνιος 2026) και αυξάνεται· προεπιλογή chart 500 GiB |
| lightwalletd | περίπου 0,15 vCPU, 165 MiB | Δημιουργεί την cache του μπλοκ προς μπλοκ | περίπου 17 GiB· προεπιλογή chart 40 GiB |

Όλη η στοίβα ζητά περίπου 1,5 vCPU και 4,5 GiB μνήμης. Για ένα μηχάνημα, το chart προτείνει 8 vCPU, 32 GiB RAM και περίπου 1 TB NVMe (στο GKE, ένα `n2-standard-8` με τόμο Hyperdisk ή pd-ssd 500 GiB). Τα προεπιλεγμένα αιτήματα καλύπτουν ήδη τα ελάχιστα του GKE Autopilot, ενώ τα όρια CPU παραμένουν απενεργοποιημένα ώστε ο συγχρονισμός να μπορεί να χρησιμοποιεί πρόσθετη ισχύ.

## Ρυθμίσεις που αξίζει να γνωρίζεις

**Επαναφορά από snapshot.** Όρισε το `<chain>.initSnapshot.enabled: true` (με `initSnapshot.url`, `gs://` ή `https://`), ώστε να ξεκινήσεις από δημοσιευμένο snapshot αντί να συγχρονίσεις από τη γένεση. Η επαναφορά καταγράφει την πρόοδό της, επαναλαμβάνει σωστά μια διακοπείσα λήψη και δεν διαγράφει ποτέ έναν υγιή τόμο από προηγούμενη εγκατάσταση. Ένα snapshot αποτελεί συντόμευση εμπιστοσύνης: τα μπλοκ μετά από αυτό εξακολουθούν να επικυρώνονται, και ένα κακό snapshot γίνεται αντιληπτό όταν τα μπλοκ αποτυγχάνουν στην επικύρωση. Σύμφωνα με το εργαστήριο, ο συγχρονισμός από την αρχή διαρκεί περίπου 10 ημέρες, ενώ η εκκίνηση από snapshot περίπου 10 ώρες.

**Κλιμάκωση και μηδενικός χρόνος διακοπής.** Τα lightwalletd και Zaino είναι ελαφριές cache μπροστά από τον κόμβο, γι’ αυτό εκτέλεσε το `replicas: 2` για σταδιακές ενημερώσεις χωρίς διακοπή (ένα PodDisruptionBudget προστίθεται αυτόματα όταν υπάρχουν περισσότερα από 1 αντίγραφα). Οι κόμβοι αλυσίδας δεν προορίζονται για φόρτο: κάθε αντίγραφο είναι ένας επιπλέον πλήρης κόμβος με δικό του τόμο και δικό του συγχρονισμό, οπότε εκτέλεσε έναν ή δύο για πλεονασμό.

**Εισερχόμενοι ομότιμοι κόμβοι.** Από προεπιλογή, το Zebra δημιουργεί μόνο εξερχόμενες συνδέσεις. Το `zebra.p2pPublic.enabled: true` δέχεται εισερχόμενους ομότιμους κόμβους στη θύρα 8233 (18233 στο testnet) και ανακοινώνει τη διεύθυνσή σου· επίλεξε το `externalAddrFrom: hostIP` σε γυμνό υλικό και k3s, το `nodeExternalIP` σε cloud όπου η IP του ίδιου του κόμβου είναι ιδιωτική ή το `loadBalancer` με δεσμευμένη στατική IP στο GKE Autopilot.

**TLS και gRPC.** Το TLS τερματίζεται στο ingress και στο cluster χρησιμοποιείται απλό HTTP/2, οπότε πολλά ονόματα κεντρικών υπολογιστών μπορούν να δείχνουν σε ένα lightwalletd. Διατήρησε το `path: /` μαζί με το `pathType: Prefix`, επειδή το gRPC χρειάζεται τις διαδρομές μεθόδων. Αν το πρώτο πιστοποιητικό αποτύχει λόγω της ανακατεύθυνσης HTTPS, έκδωσέ το με τον issuer staging ή όρισε προσωρινά το `ingress.tls.sslRedirect: "false"`.

**Κρυφή υπηρεσία Tor.** Χρήσιμη όταν το cluster σου δεν έχει δημόσια IP ή domain:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

Διάβασε τη διεύθυνση με το `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` και δοκίμασέ την μέσω ενός τοπικού client Tor με το [zecping](https://github.com/zecrocks/zecping): `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**Γύρω από αναβαθμίσεις δικτύου.** Το Zebra μπορεί να αποκλείσει ομότιμους κόμβους που εξακολουθούν να χρησιμοποιούν παλιές εκδόσεις και να κολλήσει, καταγράφοντας ότι οι ενημερώσεις της αλυσίδας έχουν σταματήσει. Η λίστα αποκλεισμού του αποθηκεύεται στη μνήμη, οπότε το `kubectl delete pod zebra-0` την εκκαθαρίζει· το pod επανέρχεται με τα ίδια δεδομένα αλυσίδας, χωρίς νέο συγχρονισμό.

## Docker Compose

Για ένα μηχάνημα, κλωνοποίησε το repo και ξεκίνησε το προεπιλεγμένο αρχείο από τον φάκελο `docker/`:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

Το `compose.yaml` εκτελεί τα Zebra, lightwalletd και [Watchtower](https://containrrr.dev/watchtower/) σε x86· το `compose.arm.yaml` κάνει το ίδιο σε κεντρικούς υπολογιστές ARM. Το Watchtower κατεβάζει αυτόματα νέα images και το προεπιλεγμένο αρχείο χρησιμοποιεί την ετικέτα `zfnd/zebra:latest`, ώστε ο κόμβος να ακολουθεί τις νέες εκδόσεις του Zebra χωρίς χειροκίνητες αναβαθμίσεις. Το `compose.zaino.yaml` αντικαθιστά το lightwalletd με το Zaino, αλλά καρφιτσώνει ένα παλιό community image (`emersonian/zcash-zaino:0.1.2-zr4`), γι’ αυτό έλεγξέ το πριν το χρησιμοποιήσεις. Άλλα αρχεία προσθέτουν ένα Caddy TLS front end, έναν διακομιστή μεσολάβησης VPS και μια σήραγγα autossh για κόμβους στο σπίτι.

Όρισε το `LIGHTWALLETD_DONATION_ADDRESS` στο αρχείο `.env` στη δική σου ενοποιημένη διεύθυνση, ώστε να δημοσιευτεί ως διεύθυνση δωρεών του διακομιστή. Αν εκτελέσεις το `./download-snapshot.sh` από τον φάκελο `docker/` πριν από την πρώτη `docker compose up`, γίνεται λήψη snapshot της αλυσίδας αντί για συγχρονισμό από την αρχή.

## Σύνδεση και παρακολούθηση

Το δεύτερο μάθημα του εργαστηρίου καλύπτει πώς να εκθέσεις τον διακομιστή: με δημόσια στατική IP, κρύβοντας την οικιακή IP σου πίσω από μια σήραγγα SSH προς VPS ή Tailscale Funnel ή με διακομιστή αποκλειστικά Tor. Δοκίμασε το αποτέλεσμα συνδέοντας ένα πορτοφόλι σε αυτόν (στις ZODL, Ρυθμίσεις για προχωρημένους· δες την [Αλλαγή διακομιστή στο πορτοφόλι σου](/zcash-tech/lightwallet-nodes)) ή καλώντας το `GetLightdInfo` με client gRPC.

Για παρακολούθηση, το τρίτο μάθημα παρουσιάζει τις χειροκίνητες εντολές Docker και προτείνει να καταχωρίσεις δημόσιο διακομιστή στο [hosh](https://hosh.zec.rocks/zec), το zec.rocks uptime monitor. Η καταχώριση γίνεται με pull request που προσθέτει το όνομα κεντρικού υπολογιστή και τη θύρα σου στη λίστα διακομιστών του hosh. Για βοήθεια σε οποιοδήποτε βήμα, επισκέψου το φόρουμ των εργαστηρίων [zec.rocks](https://workshops.zec.rocks).

## Συνηθισμένα λάθη

**Εγκατάσταση του lightwalletd χωρίς κόμβο αλυσίδας.** Το lightwalletd διαβάζει από το Zebra (ή το Zakura). Ενεργοποίησε έναν κόμβο ή ξεκίνησε από ένα αρχείο παραδείγματος που τον ενεργοποιεί.

**Διατήρηση των ενδεικτικών διαπιστευτηρίων RPC του παραδείγματος.** Τα παραδείγματα περιλαμβάνουν ενδεικτικές τιμές. Το RPC παραμένει εντός του cluster, αλλά άλλαξέ τες ούτως ή άλλως.

**Εκτέλεση κόμβου αλυσίδας με το προεπιλεγμένο όριο δίσκου του GKE.** Ο τόμος δεν δεσμεύεται ποτέ. Αύξησε το περιφερειακό όριο πριν από την εγκατάσταση.

**Κλιμάκωση του Zebra για φόρτο.** Κάθε επιπλέον αντίγραφο Zebra απαιτεί πλήρη νέο συγχρονισμό. Κλιμάκωσε το lightwalletd ή το Zaino αντί γι’ αυτό.

**Καρφίτσωμα παλιού chart κατά τη διάρκεια αναβάθμισης δικτύου.** Ένας κόμβος που προηγείται μιας αναβάθμισης σταματά να ακολουθεί το Mainnet μετά από αυτήν (το Zebra χρειάζεται την έκδοση 7.0.0 ή νεότερη από το NU7). Εκτέλεσε το `helm repo update` και αναβάθμισε το chart πριν από τα ύψη ενεργοποίησης και τα ύψη λήξης υποστήριξης του Zakura.

## Σχετικές σελίδες

- [Zcash Κόμβοι Lightwallet](/zcash-tech/lightwallet-nodes): τι μπορεί και τι δεν μπορεί να δει ένας διακομιστής light wallet, καθώς και δημόσιοι διακομιστές.
- [Zebra Πλήρης κόμβος](/zcash-tech/zebra-full-node): ο επικυρωτής που εκτελεί αυτή η στοίβα.
- [Zakura Κόμβος](/zcash-tech/zakura-node): το fork του Zebra που μπορεί να εκτελέσει το chart.
- [Zaino](/zcash-tech/zaino): ο indexer του Rust.
- [zecd](/zcash-tech/zecd): ο διακομιστής πορτοφολιού που μπορεί να προσθέσει το chart.
- [Zcash RPC κόμβου και ευρετηρίαση](/guides/zcash-node-rpc-and-indexing): RPC του Zebra, Zallet και indexers.
- [Πώς να εκτελέσεις το Zebra στο δίκτυο Akash](/guides/akash-network-zebra): ένας ακόμη τρόπος να φιλοξενήσεις κόμβο.

## Πηγές

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (repo, εκδόσεις και παραδείγματα)
- [Zcash Stack README του Helm chart](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [Σημειώσεις εργαστηρίου: Συγχρονισμός, σύνδεση, παρακολούθηση](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Καταχώριση στο Artifact Hub](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (παρακολούθηση δημόσιων διακομιστών)

**Τελευταία ενημέρωση:** Νοέμβριος 2026 (chart 0.4.9)
