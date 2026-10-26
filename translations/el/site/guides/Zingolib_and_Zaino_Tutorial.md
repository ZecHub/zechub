# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : πλήρης κόμβος Zcash

**zaino**     : ευρετηριαστής blockchain του Zcash

**zingo-cli** : πελάτης γραμμής εντολών zaino-proxy του Zcash (υποσύνολο του Zingolib)

## Βίντεο

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="Εισαγωγή στο Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Γενική εικόνα

[Αρχιτεκτονική συστήματος](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Ο χρήστης εγκαθιστά/μεταγλωττίζει το Zcash Zingolib, το οποίο παρέχει πρόσβαση στο zingo-cli. Μπορεί να στείλει/λάβει το ZEC όπως χρειάζεται.
- Το Zingo-cli συνδέεται με το zaino είτε τοπικά είτε μέσω ασφαλούς καναλιού online (ο χρήστης του Zcash δεν ενδιαφέρεται για το πώς λειτουργεί αυτό!)
- Το Zaino επιτρέπει πρόσβαση είτε στο zebrad είτε στο zcashd            
- Το πλήρως συγχρονισμένο zebrad είναι η πηγή αλήθειας (δεν υπάρχουν πλέον πορτοφόλια εδώ!)



## Εγκατάσταση

Θα χρειαστεί να εγκαταστήσεις 3 πράγματα για να λειτουργήσει σωστά αυτό. Συνιστώ επίσης το screen ή κάτι παρόμοιο για τη διαχείριση των συνεδριών σου.

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*προαιρετικό* (δημιούργησε μια συνεδρία screen για το zebrad)

```
screen -S zebra
zebrad start
```

Σημείωση: αυτό θα χρειαστεί να συγχρονιστεί πλήρως! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*προαιρετικό* (δημιούργησε μια συνεδρία screen για το zaino)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Adjust port to 8232 for mainnet
zainod --config zindexer.toml
```


### zingo-cli

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*προαιρετικό* (δημιούργησε μια συνεδρία screen για το zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

Σημείωση: αυτό θα χρειαστεί να συγχρονιστεί πλήρως, όπως έκανε και το lightwalletd. Συνιστώ να χρησιμοποιήσεις έναν εξωτερικό δίσκο για να εξοικονομήσεις χρόνο :)


## Εκτέλεση

Αν τα εκτελείς σε συνεδρίες screen, το `screen -r` θα εμφανίσει κάθε συνεδρία screen, ώστε να μεταβείς σε αυτήν όπως χρειάζεται
