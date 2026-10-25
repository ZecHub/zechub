<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Επεξεργασία σελίδας"/>
</a>

# Γίνε μέλος του Crosslink Feature Net

## Συνοπτικά

- Το Feature Net είναι το δημόσιο δοκιμαστικό δίκτυο του Shielded Labs για το [Crosslink](/zcash-tech/crosslink-protocol), το προτεινόμενο επίπεδο οριστικοποίησης που προσθέτει staking δίπλα στην απόδειξη εργασίας του Zcash.
- Εκτελείται με ένα δοκιμαστικό νόμισμα, το cTAZ. Τίποτα που κάνεις σε αυτό δεν μετακινεί ούτε θέτει σε κίνδυνο ZEC του mainnet ZEC.
- Μία εφαρμογή υπολογιστή είναι ο κόμβος, ο εξορύκτης, το πορτοφόλι και ο finalizer. Κάνει εξόρυξη cTAZ από προεπιλογή και έχει κουμπί faucet.
- Το staking, το unstaking και η ανάληψη λειτουργούν μόνο κατά τη διάρκεια μιας «Ημέρας staking», μίας ημέρας κάθε τρεις. Αν τη χάσεις, περιμένεις την επόμενη.
- Για να κάνεις staking, επικολλάς την ταυτότητα ενός finalizer και επιλέγεις ένα ποσό. Αυτός ο οδηγός χρησιμοποιεί ως παράδειγμα τον finalizer του ZecHub.
- Δύο κλήσεις RPC δείχνουν πού βρίσκεσαι: `wallet_staking_positions` και `get_tfl_recency_status`.

*Δοκιμάστηκε με την έκδοση 14 του Feature Net σε Windows 11 (έκδοση 10.0.26200.9550), από τις 8 έως τις 10 Οκτωβρίου 2026. Το λογισμικό είναι πρωτότυπο και αλλάζει με κάθε έκδοση. Αν αυτό που βλέπεις διαφέρει από αυτή τη σελίδα, εμπιστεύσου τη δική σου εκτέλεση και υπόβαλε ένα PR.*

## Τι είναι το Feature Net

Το Crosslink είναι μια πρόταση και δεν αποτελεί σήμερα μέρος του Zcash. Οι Συχνές ερωτήσεις του Shielded Labs για το [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) αναφέρουν ότι «θα χρειαζόταν να περάσει από την τυπική διαδικασία διακυβέρνησης του Zcash» πριν μπορέσει να φτάσει στο mainnet. Η σελίδα [Crosslink Protocol](/zcash-tech/crosslink-protocol) εξηγεί τον σχεδιασμό.

Για να δοκιμάσει τον σχεδιασμό με πραγματικούς χρήστες, το Shielded Labs εκτελεί αυτά που αποκαλεί [incentivized feature nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): «μια σειρά από incentivized testnets». Στο δίκτυο υπάρχουν τρεις ρόλοι και η εφαρμογή υπολογιστή μπορεί να αναλάβει και τους τρεις:

| Ρόλος | Τι κάνει |
|---|---|
| Εξορύκτης | Παράγει μπλοκ απόδειξης εργασίας, όπως στο Zcash σήμερα |
| Staker | Κλειδώνει cTAZ σε ένα delegation bond και το εκχωρεί σε έναν finalizer |
| Finalizer | Ψηφίζει για την οριστικοποίηση μπλοκ. Η ισχύς ψήφου του είναι το stake που του έχει εκχωρηθεί |

Το αποθετήριο πίσω από αυτό ξεκινά με μια αποποίηση ευθύνης που αξίζει να διαβάσεις πριν εγκαταστήσεις οτιδήποτε: «υπάρχει για να αποδεικνύει ιδέες, όχι για να επιδεικνύει μηχανική παραγωγής» και είναι «κώδικας που δεν είναι έτοιμος για παραγωγή» ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Εκτέλεσέ το σε έναν υπολογιστή όπου αυτό είναι αποδεκτό.

### Τι άλλαξε η έκδοση 14

Η [Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) κυκλοφόρησε την 1η Οκτωβρίου 2026. Το δίκτυό της ξεκινά ως απλή απόδειξη εργασίας και ενεργοποιεί το Crosslink σε τρία βήματα ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), που εμφανίζονται επίσης στο [ctaz.cash](https://ctaz.cash/v14)):

| Μπλοκ | Τι συμβαίνει |
|---|---|
| 20.736 | Ανοίγει το staking |
| 34.560 | Η πρώτη λίστα finalizers λαμβάνεται από τα stakes στην αλυσίδα |
| 36.288 | Ξεκινά η οριστικοποίηση BFT και μαζί της οι ανταμοιβές staking |

Οι ανταμοιβές staking αρχίζουν στο τελευταίο από αυτά τα μπλοκ. Ένα bond που δημιουργήθηκε νωρίτερα δεν κερδίζει τίποτα μέχρι τότε ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Η ίδια έκδοση περιόρισε την ενεργή λίστα στους 12 finalizers με το περισσότερο stake ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) και, σύμφωνα με τις σημειώσεις έκδοσής της, τους έδωσε προμήθεια: «10% όλων των ανταμοιβών PoS σε ένα μπλοκ πηγαίνει σε αυτές τις προμήθειες, ενώ το 90% διανέμεται σε όλα τα staking bonds».

### cTAZ και πραγματικό ZEC

Το cTAZ («Crosslink TAZ») είναι το δοκιμαστικό νόμισμα του Feature Net. Κάνεις staking cTAZ, ποτέ ZEC.

Το πραγματικό ZEC εμφανίζεται μόνο στο τέλος. Το Shielded Labs έχει [αποθέσει 500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) για τα feature nets και οι σημειώσεις [release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) λένε ότι καταβάλλεται «αναλογικά, βασιζόμενο μόνο στο ποσό cTAZ που κέρδισε κάθε συμμετέχων μέσω εξόρυξης ή staking». Δύο συνέπειες:

- **Τα νομίσματα faucet δεν μετρούν.** Τα cTAZ που σου δόθηκαν, από το faucet ή από οποιονδήποτε άλλο, δεν κερδίζουν τίποτα απλώς επειδή βρίσκονται στο πορτοφόλι σου. Μετρούν μόνο οι ανταμοιβές μπλοκ από εξόρυξη και staking.
- **Οι πληρωμές διεκδικούνται, δεν είναι αυτόματες.** Το Shielded Labs ανακοινώνει κάθε γύρο στο νήμα του [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Για τον Γύρο 2 ζήτησε από τους συμμετέχοντες να στείλουν το viewing key του πορτοφολιού τους και μια διεύθυνση mainnet έως τις 4 Οκτωβρίου 2026 ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). Το δίκτυο στο οποίο εκτελείται η έκδοση 14, εκείνο στο οποίο συμμετέχει αυτός ο οδηγός, ανακοινώθηκε ως Γύρος 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Πριν ξεκινήσεις

- **Έναν υπολογιστή που μπορείς να αφήσεις να λειτουργεί.** Η έκδοση διαθέτει builds για Windows, macOS, Ubuntu και Arch Linux. Αυτός ο οδηγός εκτελέστηκε σε Windows, σε υπολογιστή με επεξεργαστή Intel Core i5-8350U.
- **Μια Ημέρα staking.** Έλεγξε πότε ανοίγει η επόμενη προτού σχεδιάσεις οτιδήποτε. Ο πίνακας ελέγχου του [Staker Space's dashboard](https://crosslink.staker.space/) μετρά αντίστροφα μέχρι αυτήν.
- **Τίποτα άλλο.** Δεν χρειάζεται ZEC, λογαριασμός ή εγγραφή.

## Βήμα 1: Κατέβασε την εφαρμογή και έλεγξε το αρχείο

1. Άνοιξε την έκδοση 14 του [version 14 release](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) και κύλησε προς τα κάτω στην ενότητα **Assets**.
2. Κατέβασε το αρχείο για το σύστημά σου. Στα Windows αυτό είναι το `zebrad_v14_win32.exe`.
3. Σύγκρινε το SHA-256 του αρχείου με το digest που το GitHub εμφανίζει δίπλα σε αυτό το asset.

Στα Windows, στο PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Το digest που το GitHub εμφανίζει για αυτό το αρχείο είναι `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. Το δεκαεξαδικό σύστημα δεν διακρίνει πεζά και κεφαλαία, οπότε τα κεφαλαία γράμματα παραπάνω είναι εντάξει. Για να κάνει τη σύγκριση το shell αντί για τα μάτια σου:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Γνώριζε τι αξίζει αυτός ο έλεγχος. Η έκδοση δεν φέρει υπογραφή, επομένως ένα ταίριασμα hash σου λέει ότι η λήψη ολοκληρώθηκε και ότι είναι το αρχείο που εξυπηρετεί το GitHub. Δεν σου λέει ποιος το δημιούργησε. Η σελίδα [Verifying Zcash Releases](/guides/verifying-zcash-releases) εξηγεί τη διαφορά.

## Βήμα 2: Εκκίνησε τον κόμβο και άφησέ τον να συγχρονιστεί

Εκκίνησε την εφαρμογή από ένα τερματικό, ώστε τα μηνύματα εκκίνησής της να παραμένουν στην οθόνη. Χρησιμοποίησε ένα συνηθισμένο παράθυρο PowerShell, όχι ένα που άνοιξες με «Εκτέλεση ως διαχειριστής»: πρόκειται για πρωτότυπο λογισμικό χωρίς υπογραφή και δεν χρειάζεται δικαιώματα διαχειριστή.

```powershell
.\zebrad_v14_win32.exe
```

Ανοίγει ένα παράθυρο με τίτλο «Zcash Crosslink Visualizer». Το πορτοφόλι βρίσκεται αριστερά, με καρτέλες **Το πορτοφόλι σου** και **Πορτοφόλι faucet**, η αλυσίδα σχεδιάζεται στη μέση και οι finalizers παρατίθενται δεξιά. Το τερματικό συνεχίζει να εκτυπώνει το log του κόμβου. Άφησε και τα δύο ανοιχτά όσο χρησιμοποιείς το δίκτυο.

Οι σημειώσεις έκδοσης συνδέουν σε ένα [βίντεο με οδηγίες για την εγκατάσταση του Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

Η εφαρμογή διατηρεί τα δεδομένα της σε έναν φάκελο cache: `%LOCALAPPDATA%\zebra` στα Windows, `~/.cache/zebra` στα Linux και `~/Library/Caches/zebra` στο macOS, σύμφωνα με τις σημειώσεις έκδοσης.

**Κράτησε το μυστικό για εσένα.** Αυτός ο φάκελος περιέχει ένα αρχείο με όνομα `secret.seed`. Η εφαρμογή το δημιουργεί κατά την πρώτη εκκίνηση ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) και αντλεί από αυτό το πορτοφόλι σου και την ταυτότητα του finalizer σου ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). Η εφαρμογή διαθέτει επίσης κουμπί **Αντιγραφή Seed**, το οποίο τοποθετεί το ίδιο μυστικό στο πρόχειρό σου. Όποιος έχει οποιοδήποτε από τα δύο ελέγχει το πορτοφόλι σου. Ποτέ μην τα επικολλάς σε συνομιλία, ανάρτηση φόρουμ ή στιγμιότυπο οθόνης.

### Πώς να καταλάβεις ότι έχεις συγχρονιστεί

Οι σημειώσεις έκδοσης αναφέρουν ότι δεν υπάρχει «ενσωματωμένη παρακολούθηση για το πόσο κοντά στο tip του δικτύου έχεις συγχρονιστεί». Η έκδοση 14 έχει κάποια: το αναπτυσσόμενο μενού **Πληροφορίες δικτύου** στο επάνω μέρος του παραθύρου έχει γραμμές για PoW Height, Wallet Sync και Blocks Behind Known PoW ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Σύγκρινε το ύψος σου με εκείνο στο [Staker Space](https://crosslink.staker.space/) ή στο [ctaz.cash](https://ctaz.cash/).

Ο κόμβος απαντά επίσης μέσω RPC:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

Η θύρα RPC `127.0.0.1:8232` είναι ανοικτή από προεπιλογή σε αυτό το build και δεν χρειάζεται κωδικό πρόσβασης ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Ακούει μόνο στον δικό σου υπολογιστή και οτιδήποτε εκτελείται σε αυτόν τον υπολογιστή μπορεί να την καλέσει.

Σε αυτή την εκτέλεση, ο πρώτος συγχρονισμός, από το μπλοκ 0 έως το tip περίπου στο μπλοκ 28.400, χρειάστηκε περίπου 50 λεπτά.

**Μετά από επανεκκίνηση, το υπόλοιπό σου εμφανίζεται για λίγο ως μηδέν.** Κάθε φορά που ξεκινά η εφαρμογή, αναδημιουργεί το πορτοφόλι από το `secret.seed` και σαρώνει ξανά την αλυσίδα από το μπλοκ 0 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Μέχρι η σάρωση να φτάσει τις συναλλαγές σου, το υπόλοιπο και το stake σου εμφανίζονται ως 0. Σε αυτή την εκτέλεση επανήλθαν περίπου 15 λεπτά μετά από επανεκκίνηση. Το πορτοφόλι του faucet σαρώνεται ξανά με τον ίδιο τρόπο ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)) και, κατά τη σάρωση, η καρτέλα Πορτοφόλι faucet έδειχνε ένα πολύ μεγάλο υπόλοιπο. Αγνόησε και τα δύο μέχρι να ολοκληρωθεί το Wallet Sync.

## Βήμα 3: Απόκτησε λίγο cTAZ

### Κάνε εξόρυξη

Σύμφωνα με τις σημειώσεις έκδοσης, η εφαρμογή ξεκινά εξόρυξη CPU προς το δικό σου πορτοφόλι μόλις συγχρονιστεί. Δεν χρειάζεται να ενεργοποιήσεις τίποτα. Τα εξορυγμένα νομίσματα πηγαίνουν σε μια διαφανή διεύθυνση του δικού σου πορτοφολιού ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Το αν θα βρει ένα μπλοκ είναι άλλο ζήτημα. Οι σημειώσεις προειδοποιούν ότι «ίσως ξεπεραστείς από άλλους που κάνουν εξόρυξη γρηγορότερα, επομένως δεν υπάρχει εγγύηση επιτυχίας». Από προεπιλογή, ο ενσωματωμένος εξορύκτης χρησιμοποιεί ένα μόνο νήμα CPU ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Για να χρησιμοποιήσεις περισσότερα νήματα, όρισε μια μεταβλητή περιβάλλοντος στο ίδιο παράθυρο PowerShell πριν εκκινήσεις την εφαρμογή ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Αυτή η εκτέλεση χρησιμοποίησε τέσσερα:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Η μεταβλητή διαρκεί μόνο όσο αυτό το παράθυρο παραμένει ανοιχτό. Με αυτήν ορισμένη, ο μετρητής επεξεργαστή του Windows έδειξε ότι ο κόμβος χρησιμοποιούσε χρόνο ίσο με τέσσερις έως πέντε επεξεργαστές, ως ποσοστό ενός λογικού επεξεργαστή:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Το αποτέλεσμα: ένας Intel Core i5-8350U που έκανε εξόρυξη με τέσσερα νήματα, από νωρίς στις 8 Οκτωβρίου έως το απόγευμα της 9ης Οκτωβρίου, δεν βρήκε κανένα μπλοκ.

### Ή χρησιμοποίησε το faucet

Η εφαρμογή έχει ένα κουμπί **Λήψη cTAZ** κάτω δεξιά. Στον πηγαίο κώδικα της έκδοσης 14, ένα πάτημα στέλνει 0,5 cTAZ από το πορτοφόλι του faucet στο δικό σου ([amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Το faucet είναι ένα μόνο πορτοφόλι που περιέχει κάθε αντίγραφο της εφαρμογής ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)) και η καρτέλα **Πορτοφόλι faucet** εμφανίζει το υπόλοιπό του.

Το κουμπί είναι απενεργοποιημένο εκτός αν το faucet έχει περισσότερα από 5,01 cTAZ σε θωρακισμένα νομίσματα ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Η καρτέλα μετρά και τα εξορυγμένα νομίσματα του faucet, ενώ αυτά γίνονται θωρακισμένα μόνο σε παρτίδες ακριβώς 10 cTAZ συν τέλη ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), επομένως η καρτέλα μπορεί να δείχνει πολλά ενώ το κουμπί παραμένει γκρι. Σε αυτή την εκτέλεση παρέμεινε γκρι στις 8 και 9 Οκτωβρίου, με το μήνυμα «Το faucet κάνει εξόρυξη περισσότερων κεφαλαίων.» όταν περνούσε ο δείκτης από πάνω του, ενώ η καρτέλα έδειχνε 14,74695 cTAZ.

**Όταν το κουμπί είναι γκρι, ρώτησε τον δικό σου κόμβο.** Ο κόμβος έχει μια μέθοδο αιτήματος faucet, `requestfaucetdonation` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), η οποία δεν εφαρμόζει τον κανόνα των 5,01 cTAZ του κουμπιού. Βάλε τη δική σου διεύθυνση στη θέση του `YOUR_ADDRESS` (είναι το πεδίο `address` του `wallet_spendable_funds`, παρακάτω):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

Αυτή η απάντηση σημαίνει ότι το αίτημα μπήκε σε ουρά, όχι ότι στάλθηκε. Σε αυτή την εκτέλεση, τα 0,5 cTAZ του faucet εξορύχθηκαν στο μπλοκ 33.306 και μπορούσαν να δαπανηθούν στο μπλοκ 33.322. Ζήτησε μία φορά: το faucet είναι κοινόχρηστο και ένα δεύτερο αίτημα για την ίδια διεύθυνση απορρίπτεται όσο το πρώτο εκκρεμεί ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Ή ζήτησε από άλλον συμμετέχοντα

Οποιοσδήποτε στο δίκτυο μπορεί να σου στείλει cTAZ με το κουμπί **Αποστολή** της εφαρμογής. Σε αυτή την εκτέλεση, άλλος συμμετέχων έστειλε 31 cTAZ. Έφτασαν ως «Λήφθηκαν» με το note «αποστολή από πορτοφόλι χρήστη», που είναι το note που επισυνάπτει η ίδια η λειτουργία Αποστολή της εφαρμογής ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Ζήτησε στο νήμα του [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) και δώσε μόνο τη διεύθυνσή σου.

Τα νομίσματα faucet και τα δώρα αρκούν για να μάθεις το staking. Δεν υπολογίζονται στις ανταμοιβές του ZEC.

### Έλεγξε τι μπορείς να δαπανήσεις

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Αυτή ήταν η απάντηση μόλις έφτασαν τα 0,5 cTAZ του faucet, με τη διεύθυνση συντομευμένη:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

Τα ποσά είναι σε zatoshis: 100.000.000 αντιστοιχούν σε ένα cTAZ. Τα θωρακισμένα νομίσματα χρειάζονται 3 επιβεβαιώσεις προτού υπολογίζονται ως διαθέσιμα για δαπάνη ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Τα νομίσματα από το faucet και από άλλους συμμετέχοντες καταλήγουν στο `spendable_zats`. Τα εξορυγμένα νομίσματα είναι διαφανή, επομένως καταλήγουν στο `unshielded_zats` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Ένα μπλοκ μετά το δεύτερο stake σε αυτή την εκτέλεση, το υπόλοιπο του υπολοίπου εμφανίστηκε κάτω από το `pending_zats`. Λίγα μπλοκ αργότερα μπορούσε να δαπανηθεί ξανά.

## Βήμα 4: Κάνε staking σε έναν finalizer

### Περίμενε μια Ημέρα staking

Το staking, το unstaking και η ανάληψη γίνονται δεκτά μόνο όταν

```text
block height mod 10,368 < 3,456
```

δηλαδή σε ένα παράθυρο 3.456 μπλοκ στην αρχή κάθε 10.368. Με στόχο δικτύου 25 δευτερολέπτων ανά μπλοκ, αυτό είναι μία ημέρα κάθε τρεις ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Τα πρώτα παράθυρα της έκδοσης 14 ανοίγουν στα μπλοκ 20.736, 31.104, 41.472 και 51.840.

Σύμφωνα με τις σημειώσεις έκδοσης, η εφαρμογή ανακοινώνει την αρχή και το τέλος κάθε Ημέρας staking. Σε αυτή την εκτέλεση, η λίστα μπλοκ της έδειχνε μια κόκκινη γραμμή «* ΤΕΛΟΣ ΗΜΕΡΑΣ STAKING *» μεταξύ των μπλοκ 34.559 και 34.560.

**Οι σημειώσεις έκδοσης λένε δύο πράγματα.** Η λίστα αλλαγών τους αναφέρει «~1 ημέρα για Ημέρα staking και ~3 ημέρες για τον Κύκλο staking», κάτι που συμφωνεί με τον κώδικα. Πιο κάτω, μια ενότητα που μεταφέρθηκε από την Περίοδο 1 εξακολουθεί να λέει ότι μια Ημέρα staking αρχίζει κάθε 150 μπλοκ και διαρκεί 70. Ακολούθησε το πρώτο. Η παραπάνω γραμμή τέλους βρίσκεται εκεί όπου ο πρώτος κανόνας κλείνει το παράθυρο (34.560 mod 10.368 = 3.456)· σύμφωνα με τον δεύτερο κανόνα, το μπλοκ 34.560 θα βρισκόταν μέσα σε παράθυρο.

### Επίλεξε έναν finalizer

Ένας finalizer ορίζεται από την ταυτότητά του, μια συμβολοσειρά που αρχίζει με `zfinv1`. Το ZecHub δημοσιεύει την ταυτότητα του finalizer που εκτελεί στο [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Αντίγραψε μια ταυτότητα από πηγή που εμπιστεύεσαι. Σύμφωνα με τις σημειώσεις έκδοσης, η εφαρμογή παραθέτει επίσης finalizers στον δεξιό πίνακά της, με εικονίδιο αντιγραφής στα αριστερά του καθενός.

Αφού κάνεις staking, το ιστορικό του πορτοφολιού και το RPC ονομάζουν τον finalizer με ένα δεκαεξαδικό κλειδί αντί για την ταυτότητά του. Για τον finalizer του ZecHub, αυτό το κλειδί είναι `2941ef23...266aae8f`.

Επίλεξε έναν finalizer που εμπιστεύεσαι. Ο σχεδιασμός δεν έχει αυτόματο slashing, αλλά επιτρέπει «ένα hard fork συντονισμένο από χρήστες που καίει όλο το stake που έχει εκχωρηθεί σε έναν κατονομασμένο finalizer» ([Crosslink book, επισκόπηση σχεδιασμού](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Η επιλογή αποφασίζει επίσης ποιος ψηφίζει. Κάθε ενεργό bond κερδίζει το μερίδιό του από την ανταμοιβή staking. Αν ο finalizer του ανήκει στους 12 της λίστας, το ένα δέκατο αυτού του μεριδίου πηγαίνει στον finalizer ως προμήθεια. Ένα bond που κατευθύνεται σε finalizer εκτός των 12 διατηρεί ολόκληρο το μερίδιό του, αλλά αυτός ο finalizer δεν ψηφίζει ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Κάνε staking

1. Αντίγραψε την ταυτότητα του finalizer.
2. Στην καρτέλα **Το πορτοφόλι σου**, πάτησε **Stake**.
3. Πάτησε **Επικόλληση ταυτότητας**. Η γραμμή πάνω από το κουμπί αλλάζει στους πρώτους και τελευταίους χαρακτήρες της ταυτότητας, `[zfinv1j6..YWyzp4YN]` για εκείνη του ZecHub. Έλεγξέ το προτού συνεχίσεις.
4. Κάνε κλικ σε ένα ποσό. Τα ποσά έχουν σταθερά βήματα, το μικρότερο είναι 0,01 cTAZ και φωτίζονται μόνο τα ποσά που καλύπτει το υπόλοιπό σου. Με 0,5 cTAZ, τα +0,01 cTAZ και +0,1 cTAZ ήταν διαθέσιμα.

**Τίποτα δεν σου ζητά επιβεβαίωση και τίποτα δεν φαίνεται να συμβαίνει.** Σε αυτή την εκτέλεση, σύμφωνα με τα λόγια του δοκιμαστή: «Έκανα κλικ μία φορά και δεν συνέβη τίποτα, απλώς έγινε γκρι και άναψε ξανά.» Το stake είχε ολοκληρωθεί. Το ιστορικό πορτοφολιού έδειχνε «Staked @ 33334 to 2941ef23..266aae8f», τα τέλη ήταν 0,00015 cTAZ και το πορτοφόλι έδειχνε 0,010 cTAZ σε staking. Ένα δεύτερο stake λίγα λεπτά αργότερα δημιούργησε δεύτερο bond, στο μπλοκ 33.348.

Κάθε stake δημιουργεί το δικό του delegation bond. Τα σταθερά ποσά και η Ημέρα staking υπάρχουν και τα δύο για ιδιωτικότητα: κάνουν το stake ενός ατόμου δυσκολότερο να ξεχωρίσει από εκείνο κάποιου άλλου.

## Βήμα 5: Έλεγξε τη θέση σου

### Τα bonds σου

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Αυτή ήταν η απάντηση στο μπλοκ 36.490, δύο ημέρες μετά το staking:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

Η κλήση δεν δέχεται παραμέτρους. Επιστρέφει τα ενεργά bonds σου, ομαδοποιημένα κάτω από το κλειδί του finalizer που υποστηρίζει το καθένα, και τα bonds που έχουν ολοκληρώσει το unstaking και μπορούν να αναληφθούν. Κάθε bond εμφανίζει το ποσό που έγινε stake (`initial_val`), την τρέχουσα αξία του (`latest_val`), καθώς και τη συναλλαγή και το ύψος μπλοκ που το δημιούργησαν. Οι ανταμοιβές προστίθενται στο ίδιο το bond: έως το μπλοκ 36.490, κάθε bond των 1.000.000 zatoshis είχε αυξηθεί σε 1.003.451.

**Το παράθυρο Edit Stake εμφανίζει κάθε bond δέκα φορές μεγαλύτερο.** Σε αυτή την εκτέλεση, κάθε bond 0,01 cTAZ εμφανιζόταν ως 0,100 cTAZ στη δική του γραμμή και ως 0,1003536 cTAZ μόλις είχαν αρχίσει οι ανταμοιβές, ενώ τα σύνολα πάνω από τις γραμμές (0,020 cTAZ και αργότερα 0,02007 cTAZ) συμφωνούσαν με το RPC. Βασίσου στα σύνολα και στο RPC.

Το ίδιο παράθυρο εμφάνιζε ένα προειδοποιητικό τρίγωνο δίπλα στον finalizer, πριν και μετά την έναρξη του finality. Στον πηγαίο κώδικα, το τρίγωνο σημαίνει ότι η εφαρμογή σου δεν θεωρεί αυτόν τον finalizer online, ενώ ένας online finalizer εμφανίζει αντί γι’ αυτό ένα εικονίδιο Wi-Fi ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Τα bonds κέρδιζαν ανταμοιβές παρ’ όλα αυτά.

### Οι finalizers

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Σύμφωνα με τις σημειώσεις έκδοσης, αυτό αναφέρει πού βρίσκεται ο κόμβος σου στη διαδικασία ψηφοφορίας και, για κάθε finalizer, πότε ο κόμβος σου άκουσε τελευταία φορά από αυτόν και πώς ψήφιζε.

Πριν από το μπλοκ 36.288, κάθε πεδίο είναι μηδέν και η λίστα είναι κενή. Αυτή ήταν η απάντηση στο μπλοκ 33.354:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

Αφού ξεκινήσει το finality, η λίστα περιέχει τους finalizers του καταλόγου. Στο μπλοκ 36.490 περιείχε 12, με τον ZecHub `2941ef23...` ανάμεσά τους, κάτι που αντιστοιχεί στο όριο καταλόγου των 12. Αυτή είναι η αρχή εκείνης της απάντησης, κομμένη μετά την πρώτη καταχώριση:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

Λίγα λεπτά αργότερα, το δεξί πλαίσιο της εφαρμογής έδειχνε «Finalizers (23)».

### Στο Linux και στο macOS

Ο [source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) δίνει την κλήση σε μορφή `curl`. Άλλαξε το όνομα της μεθόδου για τις άλλες κλήσεις. Αυτή η μορφή δεν εκτελέστηκε για αυτόν τον οδηγό:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Στο Linux, οι σημειώσεις έκδοσης αναφέρουν ότι μάλλον χρειάζεσαι εγκατεστημένο το `xclip` πριν λειτουργήσει η αντιγραφή και επικόλληση στην εφαρμογή.

### Ένα όνομα RPC που πρέπει να προσέξεις

Οι σημειώσεις έκδοσης της έκδοσης 14 περιγράφουν μια κλήση staking με όνομα `wallet_staking_action` που δέχεται ένα αντικείμενο. Ο πηγαίος κώδικας της έκδοσης 14 δεν έχει μέθοδο με αυτό το όνομα και, σε αυτή την εκτέλεση, ο κόμβος απάντησε:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

Η μέθοδος staking που καταχωρίζει είναι η [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), η οποία δέχεται μία συμβολοσειρά που περιέχει το αίτημα ως JSON, με τον finalizer να δίνεται από την ταυτότητά του `zfinv1` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Δεν δοκιμάστηκε για αυτόν τον οδηγό.

## Unstake και ανάληψη

Ένα bond δεν μπορεί να αναιρεθεί την ημέρα που δημιουργείται. Χρειάζονται τρεις Ημέρες Staking από την αρχή έως το τέλος: κάνεις stake στη μία, unstake σε μια μεταγενέστερη και ανάληψη σε μια τρίτη. Οι σημειώσεις έκδοσης προσθέτουν ότι ένα bond δεν μπορεί να κάνει δύο ενέργειες staking την ίδια Ημέρα Staking.

*Δεν εκτελέστηκε για αυτόν τον οδηγό. Από τις σημειώσεις έκδοσης της έκδοσης 14:* για να κάνεις unstake, πάτησε **Edit Stake**, διάλεξε ένα bond από τη λίστα Staked Bonds και κάνε κλικ στο εικονίδιο αλυσίδας. Για να κάνεις ανάληψη σε μεταγενέστερη Ημέρα Staking, πάτησε **Edit Stake**, διάλεξε ένα bond από τη λίστα Withdrawable Bonds και κάνε κλικ στο εικονίδιο χρημάτων. Η μεταφορά ενός bond σε διαφορετικό finalizer, που οι σημειώσεις ονομάζουν retargeting, επιτρέπεται οποιαδήποτε στιγμή.

## Πού να παρακολουθείς το δίκτυο

Η καρτέλα [Crosslink στο ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) συγκεντρώνει τα εργαλεία σε ένα μέρος, κάτω από μια ειδοποίηση που γράφει «Το staking σε αυτό το δίκτυο δεν μετακινεί το ZEC»:

- Φιλοξενούμενα, χωρίς να χρειάζεται κόμβος: το [Staker Space](https://crosslink.staker.space/), ένας «ζωντανός πίνακας ελέγχου για το τρέχον cTAZ testnet» με το ύψος, τους εξορύκτες, τον ρυθμό λύσεων, την αντίστροφη μέτρηση της Ημέρας Staking και το finality, και το [ctaz.cash](https://ctaz.cash/), με την παραγωγή εξόρυξης, τον κατάλογο finalizers, τους peers και τις διεκδικήσεις ονομάτων διευθύνσεων staking.
- Στον δικό σου υπολογιστή: το `zcash-explorer`, του οποίου η σελίδα `/live/crosslink` εμφανίζει την ενεργοποίηση, την καθυστέρηση finality, τον κατάλογο και τις θέσεις staking, και το `crosslink_indexer`, ένα ευρετήριο SQLite ενός κόμβου Crosslink.

## Συνήθη λάθη

**Σχεδιασμός με βάση το ρολόι αντί για το ύψος μπλοκ.** Οι Ημέρες Staking μετρώνται σε μπλοκ. Παρακολούθησε την αντίστροφη μέτρηση ενός πίνακα ελέγχου, όχι το ημερολόγιο.

**Staking στα τελευταία λεπτά του παραθύρου.** Ο κανόνας ελέγχεται σε σχέση με το μπλοκ που περιλαμβάνει τη συναλλαγή σου ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), επομένως το stake πρέπει να έχει γίνει εξόρυξη πριν κλείσει το παράθυρο, όχι απλώς να έχει σταλεί.

**Να περιμένεις να κάνεις εξόρυξη του stake σου.** Ένας CPU miner με τέσσερα threads σε έναν Intel Core i5-8350U δεν βρήκε κανένα μπλοκ μεταξύ 8 και 9 Οκτωβρίου. Πάρε τα πρώτα cTAZ σου από το faucet ή από άλλον συμμετέχοντα.

**Να κάνεις ξανά κλικ επειδή φαινόταν ότι δεν συνέβη τίποτα.** Κάθε κλικ σε ένα ποσό δημιουργεί νέο bond. Έλεγξε πρώτα το ιστορικό του πορτοφολιού ή το `wallet_staking_positions`.

**Να πανικοβάλλεσαι μετά από επανεκκίνηση.** Το υπόλοιπο και το stake σου εμφανίζονται ως μηδέν μέχρι το πορτοφόλι να ολοκληρώσει την επανασάρωση. Περίμενε να ολοκληρωθεί το Wallet Sync.

**Να θεωρείς το cTAZ χρήματα για παιχνίδι ή το μυστικό ακίνδυνο.** Το cTAZ είναι δοκιμαστικό νόμισμα, αλλά το cTAZ που κερδίζεις καθορίζει το μερίδιό σου από πραγματικό ZEC. Φύλαξε το `secret.seed` όπως θα φύλαγες ένα πορτοφόλι.

**Να διαβάζεις παλιές οδηγίες.** Οι σημειώσεις έκδοσης περιέχουν κείμενο από προηγούμενες περιόδους δίπλα στους νέους κανόνες. Όπου διαφωνούν με ό,τι κάνει ο κόμβος σου, ο κόμβος σου έχει δίκιο.

## Σχετικές σελίδες

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - ο σχεδιασμός που δοκιμάζει αυτό το δίκτυο
- [Shielded Labs](/zcash-organizations/shielded-labs) - η ομάδα πίσω από το Crosslink
- [Επαλήθευση εκδόσεων Zcash](/guides/verifying-zcash-releases) - τι αποδεικνύει και τι δεν αποδεικνύει ένα checksum
- [Πλήρης κόμβος Zebra](/zcash-tech/zebra-full-node) - ο κόμβος πάνω στον οποίο βασίζεται η εφαρμογή Feature Net
- [Zcash Testnet](/using-zcash/testnet) - το συνηθισμένο δοκιμαστικό δίκτυο Zcash, που είναι διαφορετικό δίκτυο

## Πηγές

- [Σημειώσεις έκδοσης 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 Οκτωβρίου 2026
- [Crosslink: Incentivized Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 Απριλίου 2026
- [Crosslink: Incentivized Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Το βιβλίο Crosslink](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Τα βήματα σε αυτή τη σελίδα εκτελέστηκαν με το Feature Net έκδοση 14 στα Windows 11 (έκδοση 10.0.26200.9550), από τις 8 έως τις 10 Οκτωβρίου 2026. Μια δήλωση που παραπέμπει στις σημειώσεις έκδοσης ή στον πηγαίο κώδικα προέρχεται από αυτά. Οτιδήποτε επισημαίνεται ως «δεν εκτελέστηκε» δεν δοκιμάστηκε.*
