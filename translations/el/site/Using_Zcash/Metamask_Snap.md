# MetaMask Zcash Οδηγός ενσωμάτωσης Snap

Για μια πλήρη παρουσίαση και οπτική εξήγηση, δες αυτόν τον [**YouTube οδηγό**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="How to use ZEC on Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

Το MetaMask υποστηρίζει πλέον **θωρακισμένο Zcash (ZEC)** μέσω του **Snap Zcash που αναπτύχθηκε από την ChainSafe**, επιτρέποντάς σου να στέλνεις, να λαμβάνεις και να διαχειρίζεσαι ιδιωτικά ZEC απευθείας στο πορτοφόλι του browser σου. Έχει ελεγχθεί από την **Hacken** και περιλαμβάνεται στον **επίσημο κατάλογο Snaps του MetaMask**, ενώ δεν απαιτεί **ξεχωριστό λογισμικό Zcash** - μόνο το MetaMask και το Snap.

---

## **Προαπαιτούμενα**


> [**Επέκταση MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (μόνο για desktop) - Chrome, Edge ή Firefox.
> Λογαριασμός MetaMask - Η φράση ανάκτησης είναι ασφαλισμένη· το Snap παράγει κλειδιά Zcash από αυτήν.  
> Σταθερή σύνδεση στο διαδίκτυο - Για συγχρονισμό με το δίκτυο Zcash.  
> Κεφάλαια - ETH για swap σε ZEC ή ZEC από ένα ανταλλακτήριο.

> **Συμβουλή:** Προστάτευσε τη φράση ανάκτησης του MetaMask σου - ελέγχει τόσο το ETH όσο και το ZEC.

---

## **1. Εγκατάσταση του Snap Zcash**

1. Μετάβαση στον [**κατάλογο Snaps του MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Αναζήτησε το [**«Θωρακισμένο πορτοφόλι Zcash»**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) ή το [**«Snap WebZjs Zcash»**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Κάνε κλικ στο **Εγκατάσταση/Προσθήκη στο MetaMask**.
4. Ενέκρινε δικαιώματα όπως:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![εγκατάσταση-Zcash-snap](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Προαιρετικό) Προσθήκη δικτύου Zcash**

Στο MetaMask, επίλεξε **Προσθήκη δικτύου** και εισήγαγε:

Για το **BNB SmartChain**:
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Αυτό ενεργοποιεί πληροφορίες δικτύου και συνδέσμους εξερευνητή.
![Προσθήκη-ενός-προσαρμοσμένου-δικτύου....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Για το **Mainnet Zcash**:
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
Το `https://zjs.zec.rocks` είναι ένας συμβατός με WebZjs (gRPC-web) διακομιστής lightwalletd που λειτουργεί από τον [zec.rocks](https://zec.rocks) (@emersonian). Για testnet, χρησιμοποίησε το `https://zjs.zec.rocks/testnet`. Αν εκτελείς εσύ το web πορτοφόλι WebZjs, αυτή είναι η τιμή που πρέπει να ορίσεις ως `LIGHTWALLETD_PROXY`.

---

## **3. Σύνδεση στο πορτοφόλι ChainSafe WebZjs**

1. Επισκέψου το [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Κάνε κλικ στο **Σύνδεση MetaMask Snap**.  

![web-πορτοφόλι-Zcash](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Ενέκρινε τη σύνδεση.  
4. Δες τη σύνοψη του λογαριασμού Zcash σου, συμπεριλαμβανομένων:
   - Ενοποιημένων διευθύνσεων και διαφανούς διεύθυνσης

![Σύνοψη-λογαριασμού-ενοπ....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Περίμενε να ολοκληρωθεί ο συγχρονισμός.




---

## **4. Χρηματοδότηση του πορτοφολιού σου**

> **Swap ETH -> ZEC** - Χρησιμοποίησε υπηρεσίες όπως το **LeoDex** και στείλε στη θωρακισμένη διεύθυνσή σου.  
> **Ανάληψη από ανταλλακτήριο** - Κάνε ανάληψη του ZEC που αγόρασες στη θωρακισμένη διεύθυνση WebZjs σου.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Χρησιμοποίησε θωρακισμένες διευθύνσεις (z) για **πλήρη ιδιωτικότητα**.

---

## **5. Αποστολή / λήψη ZEC**

1. Στο **WebZjs**, μετάβαση στο **Μεταφορά υπολοίπου**.  
2. Εισήγαγε:
```
   - Shielded recipient address  
   - Amount
```
   ![Μεταφορά-υπολοίπου](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Επιβεβαίωσε τη συναλλαγή στο MetaMask (υπόγραψε τη συναλλαγή).  
5. Τα κεφάλαια που έλαβες θα εμφανιστούν στο WebZjs μετά την επιβεβαίωση.

---

## **6. Επαλήθευση / αντιμετώπιση προβλημάτων**

> Έλεγξε το **WebZjs** για ενημερωμένα υπόλοιπα **(το MetaMask δεν έχει καταχωρίσει απευθείας το ZEC)** .  
> Αν προκύψουν προβλήματα:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Συμβουλή ασφάλειας:** Εγκατέστησε μόνο το **ελεγμένο Snap της ChainSafe**· έλεγξε τα δικαιώματα πριν από την έγκριση.

---

## **7. Έλεγχος στοιχείων διεύθυνσης**

1. Μετάβαση στην ενότητα **Receive** - η ενοποιημένη διεύθυνσή σου θα εμφανίζεται από προεπιλογή.  
2. Αντέγραψε την ενοποιημένη διεύθυνση και επισκέψου τον [Zcash Block Explorer](https://mainnet.zcashexplorer.app/).  
3. Επικόλλησε την ενοποιημένη διεύθυνσή σου στη γραμμή αναζήτησης.  
4. Τώρα θα δεις όλα τα στοιχεία της ενοποιημένης διεύθυνσης, τα οποία περιλαμβάνουν:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Στοιχεία-διεύθυνσης](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Επιπλέον σημειώσεις**

> Χρησιμοποίησε την [**πιο πρόσφατη έκδοση MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - η δημόσια έκδοση υποστηρίζει Snaps.  
> Οι θωρακισμένες αποδείξεις μπορεί να χρειαστούν χρόνο· το WebAssembly διαχειρίζεται τον υπολογισμό μέσα στον browser.  
> Η ανάκτηση είναι απλή, εγκατέστησε το MetaMask και το Snap και έπειτα εισήγαγε την υπάρχουσα φράση ανάκτησής σου.  
> Το Snap χρησιμοποιεί από προεπιλογή **θωρακισμένο ZEC**, ενώ οι διαφανείς διευθύνσεις **δεν αποτελούν το επίκεντρο**.  
> Χρησιμοποίησε το [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) για επιβεβαιώσεις συναλλαγών.
