<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Επεξεργασία σελίδας"/>
</a>

# Ιδιωτικότητα εξόρυξης και staking

Η πληρωμή του εξορύκτη σου και ο finalizer σου δεν είναι το ίδιο πράγμα. Η αλυσίδα δεν τα συνδέει ποτέ.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Εξορύκτης</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Διαφανής πληρωμή</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Το Coinbase πληρώνει μια διεύθυνση Zcash. Το ιστορικό μιας t-address είναι δημόσιο.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizer</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">Κλειδί zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Ένα κλειδί ed25519. Υπογράφει ψήφους. Δεν είναι διεύθυνση Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Bond</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Θωρακισμένο stake</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Βρίσκεται στο staking pool. Ονομάζει έναν finalizer-στόχο.</p>
  </div>
</div>

## Η σειρά που έχει σημασία

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Εξόρυξη</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Θωράκιση</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Bond</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Παράλειψε τη θωράκιση και το ιδιωτικό βήμα δεν πραγματοποιείται ποτέ. Ένα bond δεν διαγράφει ένα διαφανές coinbase.</p>
</div>

## Τι είναι δημόσιο

| Πράγμα | Δημόσιο; | Γιατί |
|---|---|---|
| T-address εξορύκτη και ιστορικό coinbase | Ναι | Κανονικές διαφανείς έξοδοι |
| Κλειδί finalizer και zfinv1 | Ναι, μόλις βρίσκεται στο μητρώο | Πρέπει να είναι, για να επαληθεύονται οι ψήφοι |
| Ισχύς ψήφου και τράπεζα ανταμοιβών | Ναι | Δημοσιεύονται σε σχέση με το κλειδί finalizer ώστε να μπορεί να ελεγχθεί η κατανομή του stake |
| Ποια διαφανής διεύθυνση χρηματοδότησε ένα bond | Όχι, μετά από θωράκιση | Το bond ξοδεύει θωρακισμένα notes |
| Σύνδεση από τον εξορύκτη σου στον finalizer σου | Όχι on-chain | Τίποτα στο πρωτόκολλο δεν την καταγράφει |

Τα ποσά που έχουν γίνει stake αποκαλύπτονται σκόπιμα. Ο σχεδιασμός χρειάζεται το συνολικό stake και η κατανομή στους finalizers να μπορούν να ελέγχονται δημόσια. Η κβαντοποίηση (δυνάμεις του 10) και τα σταθερά παράθυρα staking περιορίζουν το πόσες πληροφορίες για μεμονωμένο χρονισμό ή μοτίβα διαρρέουν, ενώ εξακολουθούν να επιτρέπουν αυτόν τον έλεγχο. Τα υπόλοιπα Orchard που δεν έχουν γίνει stake παραμένουν ιδιωτικά· το staking είναι η σκόπιμη αποκάλυψη.

## Κάνε stake στον εαυτό σου ή σε κάποιον άλλο

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Bond στον δικό σου finalizer</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">Το απλούστερο. Διατηρείς τον ρόλο του διαχειριστή και το bond. Ένας παρατηρητής εξακολουθεί να μην μπορεί να αποδείξει ότι η t-address και το zfinv1 ανήκουν στο ίδιο άτομο μόνο από τα δεδομένα της αλυσίδας.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Bond σε άλλο μέλος</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Η ισχύς ψήφου εμφανίζεται κάτω από το κλειδί του. Κερδίζει την προμήθεια 10% του ενεργού finalizer. Εσύ διατηρείς το 90% που συσσωρεύεται στο bond. Αυτό καταρρίπτει την προφανή εικασία ότι ο εξορύκτης που λαμβάνει τη διαφανή πληρωμή είναι το ίδιο άτομο που διαχειρίζεται τον finalizer.</p>
  </div>
</div>

Μια ομάδα μπορεί να κάνει εξόρυξη σε ξεχωριστές διευθύνσεις πληρωμών, να θωρακίζει και να κάνει bond μεταξύ των μελών. Αυτό κάνει πολύ δυσκολότερο να υποστηριχθεί από τα δεδομένα της αλυσίδας ότι «αυτός ο εξορύκτης είναι αυτός ο finalizer». Δεν κρύβει ποιοι είναι οι finalizers και δεν κρύβει την εξόρυξη.

## Τι δεν κάνει αυτό

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Δεν κρύβεται</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Ποιοι είναι οι finalizers</li>
    <li>Πόση ισχύ ψήφου έχει ο καθένας</li>
    <li>Το διαφανές ιστορικό εξόρυξής σου</li>
    <li>Μια σύνδεση που δημιουργείς off-chain: μία IP, ένα μοτίβο πληρωμών, ένας διαχειριστής</li>
  </ul>
</div>

Το zfinv1-στόχος βρίσκεται μέσα στην ενέργεια staking. Η ιδιωτικότητα εδώ αφορά την προέλευση των κεφαλαίων, όχι την απόκρυψη του κλειδιού προορισμού.

## Σύντομη εκδοχή

Κάνε εξόρυξη. Θωράκισε. Έπειτα κάνε bond. Η διεύθυνση του εξορύκτη και το κλειδί finalizer παραμένουν ασύνδετα, εκτός αν τα συνδέσεις εσύ.
