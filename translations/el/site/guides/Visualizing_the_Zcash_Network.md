<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Επεξεργασία σελίδας"/>
</a>


#  Οπτικοποίηση του δικτύου Zcash

Ακολουθεί ένας οδηγός για την εκτέλεση του Ziggurat 3.0 Crawler για το Zcash, καθώς και των σχετικών προγραμμάτων Crunchy και P2P-Viz στο Ubuntu 22.04, για τη συλλογή και οπτικοποίηση πληροφοριών δικτύου του Zcash.  
Το συνδεδεμένο βίντεο παρακάτω ακολουθεί την ίδια διαδικασία.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Nq5cLiAHxPI"
    title="ziggurat 3.0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    
----------------
## Εγκατάσταση απαιτήσεων: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## Προαιρετικά:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(για την εμφάνιση πληροφοριών json στο τερματικό)

curl -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
(για την υποβολή ερωτημάτων στο RPC του crawler)

npm (με nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(για την εμφάνιση του P2P-Viz στο πρόγραμμα περιήγησης)

----------------


----------------
Αποθετήριο Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

Αποθετήριο Crawler | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Αποθετήριο Crunchy | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

Αποθετήριο P2P-Viz | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Ξεκίνα εφαρμόζοντας τις συνήθεις ενημερώσεις.

>  Εκτέλεσε τις ακόλουθες εντολές:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Crawler δικτύου Zcash

Ο Crawler του Zcash βρίσκεται μέσα σε έναν φάκελο με όνομα «zcash», επομένως ίσως είναι προτιμότερο να δημιουργήσεις έναν νέο κατάλογο πριν κάνεις clone το αποθετήριο του crawler (runziggurat/zcash).


>  Από τον κατάλογο /Home, εκτέλεσε τις ακόλουθες εντολές:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Μετακινήσου στο πρόγραμμα περιήγησης στη διεύθυνση 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Ή άνοιξε το readme στη διεύθυνση 
'/runziggurat/zcash/src/tools/crawler/README.md'

Αυτή η σελίδα περιέχει πληροφορίες για συγκεκριμένους τρόπους χρήσης. 

----------------


```bash
$ cargo run --release --features crawler --bin crawler -- --help

OPTIONS:
    -c, --crawl-interval <CRAWL_INTERVAL>
            The main crawling loop interval in seconds [default: 5]

    -h, --help
            Print help information

    -r, --rpc-addr <RPC_ADDR>
            If present, start an RPC server at the specified address

    -s, --seed-addrs <SEED_ADDRS>...
            A list of initial standalone IP addresses and/or DNS servers to connect to

    -n, --node-listening-port <NODE_LISTENING_PORT>
            Default port used for connecting to the nodes [default: 8233]

    -V, --version
            Print version information
```

Το `--seed-addrs` \ `--dns-seed` είναι το μόνο υποχρεωτικό όρισμα και χρειάζεται τουλάχιστον μία καθορισμένη διεύθυνση για να εκτελεστεί.



----------------

Η εντολή 'cargo run --release --features crawler --bin crawler -- --help' είναι η κυριολεκτική εντολή εκτέλεσης και θα εμφανίσει το μενού βοήθειας που φαίνεται.


>  Εκτέλεσε την εντολή
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Αυτό θα μεταγλωττίσει το πρόγραμμα και θα διασφαλίσει ότι όλα λειτουργούν σωστά.

Για να εκτελέσεις τον Crawler, χρειάζεται να προσθέσεις τη σημαία '--seed-addrs' στην εντολή εκκίνησης, η οποία περιέχει τουλάχιστον μία έγκυρη διεύθυνση IP κόμβου του Zcash. Θα πρέπει να επιτρέψεις στον crawler να εκτελεστεί για εύλογο χρονικό διάστημα, ώστε να λάβεις ακριβές αποτέλεσμα. Μπορείς να βρεις ορισμένα δείγματα διευθύνσεων IP κόμβων στο [https://mainnet.zcashexplorer.app/nodes](https://mainnet.zcashexplorer.app/nodes).

Για να λάβεις πληροφορίες από τον Crawler ενώ εκτελείται, χρειάζεται να προσθέσεις τη σημαία '--rpc-addr' στην εντολή εκκίνησης. Αυτό δεν απαιτείται μόνο για την εκτέλεση του crawler, αλλά διαφορετικά θα χρειαστεί να σταματήσεις τον crawler (ctrl+c ή SIGKILL) για να εμφανίσεις οποιαδήποτε πληροφορία.


>  Εκτέλεσε την εντολή
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Ο crawler θα αρχίσει να επικοινωνεί με το δίκτυο (προεπιλογή κάθε 20 δευτερόλεπτα) και να συλλέγει δεδομένα δικτύου. 
Οι πληροφορίες από τον Crawler μπορούν να εμφανιστούν χρησιμοποιώντας το curl για να υποβάλεις ερώτημα στον κόμβο (αυτό απαιτεί το jq για την εμφάνιση αυτών των πληροφοριών). 
Η διεύθυνση RPC του Crawler σε αυτό το παράδειγμα ορίζεται σε '127.0.0.1:54321'


>  Σε ένα άλλο τερματικό, εκτέλεσε την εντολή
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Αυτό θα εμφανίσει τα τρέχοντα συλλεγμένα δεδομένα '.protocol_version' που περιέχονται στο πεδίο '.result'. Το πεδίο '.result' είναι πολύ μεγάλο, επομένως είναι χρήσιμο να καλείς συγκεκριμένα τμήματά του. Άλλοι χρήσιμοι τύποι δεδομένων είναι οι '.num_known_nodes', '.num_good_nodes', '.user_agents' κ.λπ. Δες την ενότητα μετρήσεων [Εδώ](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Για να εκτελέσεις το Crunchy και το P2P-Viz, χρειάζεται να διοχετεύσεις το '.result' σε ένα αρχείο .json. 


>  Εκτέλεσε την εντολή
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Αυτό θα δημιουργήσει ένα αρχείο 'latest.json' στον τρέχοντα κατάλογο. Αυτό το αρχείο 'latest.json' θα χρησιμοποιηθεί με το Crunchy. 

Σε αυτό το σημείο, ο Crawler μπορεί να σταματήσει με 'ctrl+c' εάν δεν χρειάζονται περισσότερα δεδομένα. Ο Crawler θα εμφανίσει στο τερματικό μια αναφορά με χρήσιμες πληροφορίες.


----------------

## Crunchy

Το Crunchy απαιτείται για τη συγκέντρωση του αρχείου εξόδου json προς χρήση με το P2P-Viz.


Για να δημιουργήσεις το Crunchy, μετακινήσου στον φάκελό σου '/runziggurat' 

>  Για να κάνεις clone το αποθετήριο Crunchy, εκτέλεσε τις ακόλουθες εντολές
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Αντέγραψε και επικόλλησε το αρχείο 'latest.json' στον φάκελο 'crunchy/testdata/'.

>  Εκτέλεσε τις ακόλουθες εντολές 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Αυτό θα δημιουργήσει ένα αρχείο 'state.json' φιλτραρισμένο για κόμβους Zcash στον φάκελο 'crunchy/testdata/', για χρήση με το P2P-Viz.

----------------

## P2P-Viz

Για να δημιουργήσεις το P2P-Viz, χρειάζεται να έχεις npm. 


>  Για να εγκαταστήσεις το npm με nvm, εκτέλεσε τις ακόλουθες εντολές:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Κλείσε και επανεκκίνησε το τερματικό.


>  Εκτέλεσε την εντολή:
```bash
nvm install --lts
```

Μετακινήσου στον φάκελό σου '/runziggurat'


>  Για να κάνεις clone το αποθετήριο P2P-Viz και να το εκκινήσεις, εκτέλεσε τις ακόλουθες εντολές
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Άνοιξε ένα πρόγραμμα περιήγησης στη διεύθυνση [http://localhost:3000](http://localhost:3000). 

Επίλεξε «Geolocation» και έπειτα επίλεξε «Choose state file».

Από το αναδυόμενο παράθυρο εξερεύνησης αρχείων, επίλεξε το αρχείο 'state.json'. 

Ο παγκόσμιος χάρτης του εξερευνητή κόμβων θα συμπληρωθεί με τα δεδομένα του αρχείου. Δες το readme [Εδώ](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) για περισσότερες λεπτομέρειες σχετικά με τις επιλογές χρήσης και τις ρυθμίσεις.


----------------
ΣΥΜΒΟΥΛΕΣ! 

Μπορείς να ορίσεις τον Crawler να κάνει crawl για καθορισμένο χρόνο απλά με την εντολή 'timeout', η οποία θα εκδώσει μια συγκεκριμένη εντολή τερματισμού μετά από καθορισμένο χρονικό διάστημα. Εκτέλεσε 'timeout --help' για περισσότερες πληροφορίες.
Η ακόλουθη εντολή θα εκκινήσει και θα σταματήσει επίσης αυτόματα τον crawler μετά από 50 λεπτά.

>  Εκτέλεσε την εντολή
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
ΣΥΜΒΟΥΛΕΣ! 

Το 'latest.json' μπορεί να κληθεί και να εγγραφεί στο '/testdata', ώστε να μη χρειάζεται να το αντιγράψεις και να το επικολλήσεις χειροκίνητα.

----------------
ΣΥΜΒΟΥΛΕΣ! 

Οι πληροφορίες διευθύνσεων IP μπορούν να συλλεχθούν από την έξοδο και στη συνέχεια να χρησιμοποιηθούν για την επανατροφοδότηση του Crawler κατά την εκκίνηση (--seed-addrs). Αυτό θα μειώσει τον χρόνο που απαιτείται για την ολοκλήρωση ενός πλήρους crawl!
