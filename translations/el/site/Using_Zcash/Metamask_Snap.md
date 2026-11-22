<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Επεξεργασία σελίδας"/>
</a>

# MetaMask Zcash Snap Οδηγός ενσωμάτωσης

> Διατήρησε και στείλε θωρακισμένα ZEC από την επέκταση προγράμματος περιήγησης MetaMask, χρησιμοποιώντας το Zcash Snap του ChainSafe και το διαδικτυακό πορτοφόλι WebZjs.

## Με λίγα λόγια

* Το ChainSafe Zcash Snap προσθέτει θωρακισμένες ZEC στο MetaMask για υπολογιστές (Chrome, Edge, Firefox). Δεν χρειάζεσαι ξεχωριστό λογισμικό Zcash.
* Τα κλειδιά Zcash σου προκύπτουν από τη φράση ανάκτησης MetaMask σου. Αυτή η φράση προστατεύει πλέον τόσο το ETH όσο και το ZEC σου.
* Διαχειρίζεσαι το ZEC μέσω του πορτοφολιού WebZjs στη διεύθυνση webzjs.chainsafe.dev, όχι στη δική του λίστα περιουσιακών στοιχείων του MetaMask.
* Ο λογαριασμός σου αποκτά μια ενοποιημένη διεύθυνση, ώστε όσοι σου στέλνουν να σε πληρώνουν στο πιο ιδιωτικό pool που υποστηρίζουν.
* Τον χρηματοδοτείς κάνοντας swap (για παράδειγμα, από ETH σε ZEC) ή αποσύροντας ZEC από ένα ανταλλακτήριο στη θωρακισμένη διεύθυνσή σου.
* Ανάκτηση: Επανεγκατέστησε το MetaMask και το Snap και, στη συνέχεια, εισήγαγε την υπάρχουσα φράση ανάκτησής σου.

## Βασική επεξήγηση

Ένα MetaMask Snap είναι ένα μικρό πρόσθετο σε απομονωμένο περιβάλλον, που προσθέτει υποστήριξη για ένα νέο blockchain στο MetaMask. Το Snap Zcash, που αναπτύχθηκε από το ChainSafe και ελέγχθηκε από την Hacken, επιτρέπει στο MetaMask να παράγει κλειδιά Zcash από την υπάρχουσα φράση ανάκτησής σου και να υπογράφει συναλλαγές Zcash.

Το ίδιο το MetaMask δεν εμφανίζει υπόλοιπο ZEC. Αντίθετα, το διαδικτυακό πορτοφόλι WebZjs συνδέεται με το Snap, συγχρονίζεται με το δίκτυο Zcash μέσω ενός διακομιστή lightwalletd και εμφανίζει τις διευθύνσεις και το υπόλοιπό σου. Οι θωρακισμένες αποδείξεις υπολογίζονται στο πρόγραμμα περιήγησής σου με το WebAssembly, γι’ αυτό η αποστολή μπορεί να πάρει λίγο χρόνο.

Τα παρακάτω βήματα καλύπτουν την εγκατάσταση του Snap, τη σύνδεση του WebZjs, τη χρηματοδότηση του πορτοφολιού, την αποστολή και τη λήψη, καθώς και τον έλεγχο των επιμέρους τμημάτων της ενοποιημένης διεύθυνσής σου.

## Πλήρης οδηγός

Για αναλυτική παρουσίαση των βημάτων και οπτική επεξήγηση, παρακολούθησε αυτόν τον [**οδηγό YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

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
     

Το MetaMask υποστηρίζει πλέον **θωρακισμένες Zcash (ZEC)** μέσω του **Zcash Snap που αναπτύχθηκε από το ChainSafe**, επιτρέποντάς σου να στέλνεις, να λαμβάνεις και να διαχειρίζεσαι ιδιωτικές ZEC απευθείας στο πορτοφόλι του προγράμματος περιήγησής σου. Έχει ελεγχθεί από την **Hacken** και περιλαμβάνεται στον **επίσημο Κατάλογο Snaps του MetaMask**. Δεν απαιτείται **ξεχωριστό λογισμικό Zcash**· χρειάζεσαι μόνο το MetaMask και το Snap.

---

## **Προαπαιτούμενα**


> [**Επέκταση MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (μόνο για υπολογιστές) - Chrome, Edge ή Firefox.
> Λογαριασμός MetaMask - Φράση ανάκτησης ασφαλισμένη· το Snap παράγει από αυτήν κλειδιά Zcash.  
> Σταθερή σύνδεση στο διαδίκτυο - Για συγχρονισμό με το δίκτυο Zcash.  
> Κεφάλαια - ETH για swap με ZEC ή ZEC από ανταλλακτήριο.

> **Συμβουλή:** Προστάτευσε τη φράση ανάκτησης MetaMask σου· ελέγχει τόσο το ETH όσο και το ZEC σου.

---

## **1. Εγκατάσταση του Zcash Snap**

1. Μετάβασε στον [**Κατάλογο Snaps του MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
2. Αναζήτησε το [**«Zcash WebZjs Wallet»**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) ή το [**«WebZjs Zcash Snap»**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
3. Πάτησε **Install/Add to MetaMask**.
4. Έγκρινε δικαιώματα όπως:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Προαιρετικά) Προσθήκη δικτύου Zcash**

Στο MetaMask, επίλεξε **Add Network** και συμπλήρωσε:

Για το **BNB SmartChain**·
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Έτσι ενεργοποιούνται οι πληροφορίες δικτύου και οι σύνδεσμοι προς block explorer.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Για το **Zcash Mainnet**·
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
Το `https://zjs.zec.rocks` είναι ένας διακομιστής lightwalletd συμβατός με WebZjs (gRPC-web), τον οποίο λειτουργεί το [zec.rocks](https://zec.rocks) (@emersonian). Για το testnet, χρησιμοποίησε το `https://zjs.zec.rocks/testnet`. Αν λειτουργείς ο ίδιος το διαδικτυακό πορτοφόλι WebZjs, όρισε αυτήν την τιμή ως `LIGHTWALLETD_PROXY`.

---

## **3. Σύνδεση στο πορτοφόλι ChainSafe WebZjs**

1. Επισκέψου τη διεύθυνση [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Πάτησε **Connect MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Έγκρινε τη σύνδεση.  
4. Δες τη σύνοψη του λογαριασμού σου Zcash, η οποία περιλαμβάνει:
   - Ενοποιημένες διευθύνσεις και διαφανή διεύθυνση

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Περίμενε να ολοκληρωθεί ο συγχρονισμός.




---

## **4. Χρηματοδότηση του πορτοφολιού σου**

> **Swap ETH -> ZEC** - Χρησιμοποίησε υπηρεσίες όπως το **LeoDex** και στείλε τα κεφάλαια στη θωρακισμένη διεύθυνσή σου.  
> **Ανάληψη από ανταλλακτήριο** - Απόσυρε ZEC που αγόρασες στη θωρακισμένη διεύθυνση WebZjs σου.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Χρησιμοποίησε θωρακισμένες (z) διευθύνσεις για **πλήρη ιδιωτικότητα**.

---

## **5. Αποστολή / λήψη ZEC**

1. Στο **WebZjs**, επίλεξε **Transfer Balance**.  
2. Συμπλήρωσε:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Επιβεβαίωσε τη συναλλαγή στο MetaMask (υπόγραψε τη συναλλαγή).  
5. Τα κεφάλαια που έλαβες θα εμφανιστούν στο WebZjs μετά την επιβεβαίωση.

---

## **6. Επαλήθευση / αντιμετώπιση προβλημάτων**

> Έλεγξε το **WebZjs** για ενημερωμένα υπόλοιπα **(το MetaMask δεν έχει καταχωρίσει απευθείας το ZEC)** .  
> Αν παρουσιαστούν προβλήματα:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Συμβουλή ασφαλείας:** Εγκατέστησε μόνο το **ελεγμένο ChainSafe Snap**· έλεγξε τα δικαιώματα πριν από την έγκριση.

---

## **7. Έλεγχος των στοιχείων της διεύθυνσης**

1. Μετάβασε στην ενότητα **Receive** - η ενοποιημένη διεύθυνσή σου εμφανίζεται από προεπιλογή.  
2. Αντέγραψε την ενοποιημένη διεύθυνση και επισκέψου τον [Zcash Block Explorer](https://mainnet.zcashexplorer.app/).  
3. Επικόλλησε την ενοποιημένη διεύθυνσή σου στη γραμμή αναζήτησης.  
4. Θα δεις όλα τα στοιχεία της ενοποιημένης διεύθυνσης, στα οποία περιλαμβάνονται:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Πρόσθετες σημειώσεις**

> Χρησιμοποίησε την [**τελευταία έκδοση του MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - η δημόσια έκδοση υποστηρίζει Snaps.  
> Οι θωρακισμένες αποδείξεις μπορεί να χρειαστούν χρόνο· το WebAssembly εκτελεί τους υπολογισμούς στο πρόγραμμα περιήγησης.  
> Η ανάκτηση είναι απλή: εγκατέστησε το MetaMask και το Snap και, στη συνέχεια, εισήγαγε την υπάρχουσα φράση ανάκτησής σου.  
> Το Snap χρησιμοποιεί από προεπιλογή **θωρακισμένο ZEC**· οι διαφανείς διευθύνσεις **δεν είναι ο κύριος στόχος**.  
> Χρησιμοποίησε τη διεύθυνση [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) για επιβεβαιώσεις συναλλαγών.
