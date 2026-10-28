<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Επεξεργασία σελίδας"/>
</a>

# Zimppy.xyz

## TL;DR

- Το **Zimppy** είναι μια υποδομή πληρωμών με προτεραιότητα στην ιδιωτικότητα για AI agents που χρησιμοποιεί το Machine Payment Protocol (MPP) του Zcash
- **Κατάθεσε μία φορά** on-chain (~75 δευτερόλεπτα), έπειτα κάνε **απεριόριστα άμεσα αιτήματα** χωρίς αλληλεπίδραση με το blockchain ανά αίτημα
- Υποστηρίζει **πλήρως θωρακισμένες πληρωμές Zcash (Orchard)** — ο αποστολέας, ο παραλήπτης, το ποσό και το σημείωμα είναι όλα κρυπτογραφημένα
- Λειτουργεί με SDK των **TypeScript και Rust** για εύκολη ενσωμάτωση σε AI pipelines και API servers
- Ιδανικό για **LLM APIs, αγορές δεδομένων, MCP tool servers** και κάθε περίπτωση χρήσης πληρωμών M2M

---

> Το **Zimppy** είναι η μέθοδος πληρωμών Machine Payment Protocol (MPP) για το Zcash, η οποία υποστηρίζει τόσο θωρακισμένες όσο και διαφανείς πληρωμές. Κατάθεσε μία φορά on-chain και έπειτα κάνε απεριόριστα άμεσα bearer αιτήματα χωρίς αλληλεπίδραση με την αλυσίδα ανά αίτημα.

---

## Πίνακας περιεχομένων

1. [Τι είναι το Zimppy.xyz;](#what-is-zimppyxyz)
2. [Γιατί θωρακισμένες πληρωμές για AI agents;](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Πώς λειτουργεί το Zimppy](#how-zimppy-works)
   - [Συνεδρίες (προτεινόμενο)](#sessions-recommended)
   - [Ροή](#streaming)
   - [Χρέωση](#charge)
5. [Περιπτώσεις χρήσης και παραδείγματα](#use-cases--examples)
6. [Εγκατάσταση](#installation)
7. [Ρύθμιση του πορτοφολιού Zimppy](#setting-up-the-zimppy-wallet)
8. [Ενσωμάτωση του Zimppy](#integrating-zimppy--typescript-sdk)
   - [Server (θωρακισμένος)](#typescript-server--shielded)
   - [Server (διαφανής)](#typescript-server--transparent)
   - [Πελάτης](#typescript-client)
9. [Ενσωμάτωση του Zimppy - SDK Rust](#integrating-zimppy--rust-sdk)
   - [Server (Axum)](#rust-server-axum)
   - [Πελάτης](#rust-client)
10. [Αναφορά CLI](#cli-reference)
11. [Βασικά χαρακτηριστικά](#key-features)
12. [Αρχιτεκτονική](#architecture)
13. [Παραδείγματα και επιδείξεις](#examples--demos)

---

## Τι είναι το Zimppy.xyz;

Το **Zimppy.xyz** είναι μια υποδομή πληρωμών με προτεραιότητα στην ιδιωτικότητα, σχεδιασμένη ειδικά για AI agents και αυτοματοποιημένες ροές εργασίας machine-to-machine (M2M). Υλοποιεί το **Machine Payment Protocol (MPP)** χρησιμοποιώντας το **Zcash** ως υποκείμενο νόμισμα, επιτρέποντας τόσο θωρακισμένους (πλήρως ιδιωτικούς) όσο και διαφανείς τρόπους πληρωμής.

Σε αντίθεση με τα παραδοσιακά συστήματα πληρωμών blockchain, στα οποία κάθε συναλλαγή είναι δημόσια ορατή on-chain, το Zimppy έχει σχεδιαστεί γύρω από μια αρχιτεκτονική βασισμένη σε συνεδρίες, η οποία εξαλείφει την καθυστέρηση ανά αίτημα διατηρώντας παράλληλα την κρυπτογραφική ιδιωτικότητα. Αυτό το καθιστά ιδιαίτερα κατάλληλο για AI agents που χρειάζεται να πληρώνουν προγραμματιστικά για APIs, δεδομένα, υπολογιστική ισχύ ή AI εργαλεία, χωρίς να διαρρέουν μεταδεδομένα συμπεριφοράς.

### Βασικές ιδιότητες

- **Κατάθεσε μία φορά** on-chain (~75 δευτερόλεπτα για επιβεβαίωση Zcash)
- **Απεριόριστα άμεσα αιτήματα** μετά το άνοιγμα συνεδρίας, μηδενική αλληλεπίδραση με την αλυσίδα ανά αίτημα
- Οι **θωρακισμένες πληρωμές** κρυπτογραφούν τον αποστολέα, τον παραλήπτη, το ποσό και το σημείωμα χρησιμοποιώντας το πρωτόκολλο Orchard του Zcash
- Οι **διαφανείς πληρωμές** χρησιμοποιούν T-addresses ανά challenge για αποτροπή επανάληψης χωρίς πλήρη ιδιωτικότητα
- **Συμβατό με τις προδιαγραφές**, challenges HMAC-SHA256, σφάλματα RFC 9457, ανακάλυψη `/.well-known/payment`

---

## Γιατί θωρακισμένες πληρωμές για AI agents;

Για AI agents που διαχειρίζονται ευαίσθητες ροές εργασίας, νομική έρευνα, ιατρικά ερωτήματα ή οικονομική ανάλυση, **κάθε δημόσια πληρωμή αποτελεί διαρροή μεταδεδομένων**. Το Zimppy είναι η μόνη μέθοδος πληρωμών MPP που είναι **ιδιωτική από προεπιλογή**.

### Πίνακας σύγκρισης ιδιωτικότητας

| Ιδιότητα | Δημόσιες αλυσίδες (USDC, ETH) | Θωρακισμένο Zimppy | Διαφανές Zimppy |
|---|---|---|---|
| **Αποστολέας** | Ορατός | Κρυπτογραφημένος | Ορατός |
| **Παραλήπτης** | Ορατός | Κρυπτογραφημένος | Ανά challenge (μη συσχετίσιμος) |
| **Ποσό** | Ορατό | Κρυπτογραφημένο | Ορατό |
| **Σημείωμα** | Ορατό | Κρυπτογραφημένο | Δ/Υ |
| **Προστασία από επανάληψη** | Καμία | Σύνδεση σημειώματος | T-address ανά challenge |
| **Μοτίβο χρήσης υπηρεσίας** | Συσχετίσιμο | Ιδιωτικό | Μη συσχετίσιμο (νέα διεύθυνση) |

### Το πρόβλημα καθυστέρησης, λυμένο με συνεδρίες

> *«Αλλά το Zcash έχει χρόνους μπλοκ 75 δευτερολέπτων.»*

**Οι συνεδρίες το λύνουν αυτό.** Η αναμονή on-chain συμβαίνει ακριβώς **μία φορά**, κατά την κατάθεση. Κάθε επόμενο αίτημα είναι άμεσο.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Πλήρωσε μία φορά, κάλεσε άμεσα, πάρε πίσω τα ρέστα.** Η καθυστέρηση ανά αίτημα είναι μηδενική.

---

## Machine Payment Protocol (MPP)

Το **Machine Payment Protocol (MPP)** είναι ένα τυποποιημένο πρωτόκολλο που επιτρέπει σε αυτόνομους software agents (AI agents, bots, scripts) να ανακαλύπτουν, να διαπραγματεύονται και να εκπληρώνουν απαιτήσεις πληρωμής για πρόσβαση σε API χωρίς ανθρώπινη παρέμβαση.

### Πώς το MPP ενσωματώνεται με APIs

Το MPP ακολουθεί τη ροή HTTP **402 Payment Required**:

1. **Ο agent ζητά** έναν πόρο από ένα επί πληρωμή API endpoint.
2. **Ο server απαντά** με `402 Payment Required` + ένα υπογεγραμμένο challenge (ποσό, παραλήπτης, σημείωμα).
3. **Ο agent πληρώνει** χρησιμοποιώντας μια συμβατή μέθοδο πληρωμής (π.χ. θωρακισμένο Zcash του Zimppy).
4. **Ο agent επαναλαμβάνει** το αίτημα με `Authorization: Payment {txid}`.
5. **Ο server επαληθεύει** την πληρωμή κρυπτογραφικά (αποκρυπτογράφηση IVK Orchard, έλεγχος ποσού + σημειώματος).
6. **Ο server απαντά** με `200 OK` + μια κεφαλίδα `Payment-Receipt`.

### Συμμόρφωση με προδιαγραφές

- Υπογραφή challenge **HMAC-SHA256**
- Δομημένες αποκρίσεις σφαλμάτων **RFC 9457**
- Endpoint **`/.well-known/payment`** για αυτόματη ανακάλυψη μεθόδων πληρωμής
- IVK **Orchard** (Incoming Viewing Key) για επαλήθευση πληρωμής από τον server χωρίς έκθεση spending keys

---

## Πώς λειτουργεί το Zimppy

### Συνεδρίες (προτεινόμενο)

Οι συνεδρίες είναι το βασικό μοτίβο αλληλεπίδρασης. Ο agent καταθέτει μια ισορροπία on-chain μία φορά, λαμβάνει ένα bearer token και το χρησιμοποιεί για όλα τα επόμενα αιτήματα με μηδενική καθυστέρηση.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Ιδανικό για:** Κλήσεις API υψηλής συχνότητας, LLM inference, επαναλαμβανόμενα ερωτήματα δεδομένων.

---

### Ροή

Περιεχόμενο με χρέωση ανά token που παραδίδεται μέσω **Server-Sent Events (SSE)**. Ο server αφαιρεί από την ισορροπία της συνεδρίας ανά λέξη ή token που μεταδίδεται.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Ιδανικό για:** Απαντήσεις ροής LLM, τροφοδοσίες δεδομένων σε πραγματικό χρόνο, AI εργαλεία με χρέωση ανά token.

---

### Χρέωση

Μία θωρακισμένη πληρωμή ανά αίτημα. Η πλήρης ροή HTTP 402 εκτελείται ανά κλήση. Κατάλληλο όταν τα αιτήματα είναι σπάνια ή υψηλής αξίας.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Ιδανικό για:** Μεμονωμένα αιτήματα υψηλής αξίας, σπάνιες κλήσεις API, premium endpoints δεδομένων.

---

## Περιπτώσεις χρήσης και παραδείγματα

### 1. AI agent

Ένας νομικός AI agent υποβάλλει ερωτήματα σε μια επί πληρωμή βάση δεδομένων νομολογίας. Χρησιμοποιώντας θωρακισμένες συνεδρίες Zimppy, ούτε η ταυτότητα του δικηγορικού γραφείου ούτε τα συγκεκριμένα ερωτήματα είναι ορατά on-chain — προστατεύοντας το δικηγορικό απόρρητο σε επίπεδο υποδομής.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI agent για pipeline ιατρικών ερωτημάτων

Ένας agent ιατρικής διάγνωσης υποβάλλει ερωτήματα σε πολλαπλές κλινικές βάσεις δεδομένων. Οι θωρακισμένες πληρωμές διασφαλίζουν ότι τα μοτίβα ερωτημάτων ασθενών δεν μπορούν να συσχετιστούν μεταξύ παρόχων.

### 3. Agent οικονομικής ανάλυσης

Ένας algorithmic trading agent πληρώνει για APIs δεδομένων αγοράς σε πραγματικό χρόνο. Οι διαφανείς πληρωμές χρησιμοποιούν νέες T-addresses ανά challenge, αποτρέποντας τη συσχέτιση μοτίβων χρήσης μεταξύ προμηθευτών δεδομένων.

### 4. MCP tool server, επί πληρωμή AI εργαλεία

Ένας MCP (Model Context Protocol) server εκθέτει επί πληρωμή AI εργαλεία. Κάθε επίκληση εργαλείου ενεργοποιεί μια χρέωση Zimppy, επιτρέποντας μια αγορά monetized AI δυνατοτήτων.

### 5. Συνοψιστής LLM, χρέωση ανά token

Μια υπηρεσία περίληψης LLM χρεώνει agents ανά token εξόδου μέσω ροής SSE, με αυτόματη αφαίρεση ισορροπίας και επιστροφή αχρησιμοποίητης προπληρωμένης ισορροπίας.

---

## Εγκατάσταση

### Node.js / TypeScript

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Rust

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Ρύθμιση του πορτοφολιού Zimppy

Το CLI του Zimppy παρέχει μια πλήρη διεπαφή πορτοφολιού. Όλες οι εντολές είναι διαθέσιμες μέσω του `npx zimppy`.

### Βήμα 1 : Δημιούργησε ένα πορτοφόλι

```bash
npx zimppy wallet create
```

Δημιουργεί κρυπτογραφικά κλειδιά και εμφανίζει τη **φράση ανάκτησης** σου. Αποθήκευσέ την με ασφάλεια — δεν μπορεί να ανακτηθεί αν χαθεί.

### Βήμα 2 : Έλεγξε τη διεύθυνση και την ισορροπία σου

```bash
npx zimppy wallet whoami
```

Εμφανίζει τη **Unified Address (UA)**, την **T-address**, την τρέχουσα ισορροπία και το ενεργό δίκτυο.

```bash
npx zimppy wallet balance --all
```

Εμφανίζει αναλυτική ισορροπία ανά λογαριασμό σε όλους τους λογαριασμούς ZIP-32.

### Βήμα 3 : Χρηματοδότησε το πορτοφόλι σου

Στείλε ZEC στη Unified Address σου από οποιοδήποτε πορτοφόλι ή ανταλλακτήριο συμβατό με Zcash. Οι θωρακισμένες καταθέσεις μεταφέρονται απευθείας στον λογαριασμό Orchard σου.

### Βήμα 4 : Στείλε και θωράκισε κεφάλαια

```bash
# Send ZEC to any address (shielded or transparent)
npx zimppy wallet send <addr> 42000

# Move transparent funds into Orchard (shielded)
npx zimppy wallet shield

# Transfer between your own accounts
npx zimppy wallet transfer 0 1 50000

# Switch active wallet identity
npx zimppy wallet use work
```

### Βήμα 5 : Κάνε ένα αίτημα αυτόματης πληρωμής

```bash
npx zimppy request <url>
```

Διαχειρίζεται αυτόματα την πλήρη ροή 402 -> πληρωμή -> επανάληψη. Οι συνεδρίες ανοίγονται και διαχειρίζονται με διαφάνεια.

---

## Ενσωμάτωση του Zimppy - SDK TypeScript

### Server TypeScript - Θωρακισμένος

```typescript
import { Mppx } from 'mppx/server'
import { zcash } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcash({ wallet: 'server' })],
  realm: 'my-api',
  secretKey: process.env.MPP_SECRET_KEY,
})

const result = await mppx.charge({
  amount: '42000',
  currency: 'zec',
})(request)

if (result.status === 402) return result.challenge

return result.withReceipt(Response.json({ data }))
```

**Βασικά σημεία:**
- Το `zcash({ wallet: 'server' })` φορτώνει το θωρακισμένο πορτοφόλι του server
- Το `mppx.charge()` διαχειρίζεται τον πλήρη κύκλο ζωής challenge/επαλήθευσης 402
- Το `result.withReceipt()` επισυνάπτει την κρυπτογραφική απόδειξη πληρωμής στην απόκριση

---

### Server TypeScript - Διαφανής

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Κάθε challenge δημιουργεί μια **νέα T-address**, καθιστώντας τα αιτήματα πληρωμής μη συσχετίσιμα μεταξύ συνεδριών.

---

### Πελάτης TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Ο πελάτης παρεμβάλλεται στις αποκρίσεις `402`, ανοίγει αυτόματα μια συνεδρία και επαναλαμβάνει το αίτημα — ο κώδικας κλήσης δεν χρειάζεται λογική ειδική για πληρωμές.

---

## Ενσωμάτωση του Zimppy - SDK Rust

### Server Rust (Axum)

```rust
use mpp::server::axum::*;
use zimppy_rs::ZcashChallenger;

struct Price;

impl ChargeConfig for Price {
    fn amount() -> &'static str { "42000" }
}

async fn handler(charge: MppCharge<Price>) -> WithReceipt<Json<Value>> {
    WithReceipt {
        receipt: charge.receipt,
        body: Json(data),
    }
}
```

**Βασικά σημεία:**
- Το `MppCharge<Price>` είναι ένας extractor Axum που επαληθεύει την πληρωμή πριν εκτελεστεί ο handler
- Το `WithReceipt` περιτυλίγει την απόκριση με κρυπτογραφική απόδειξη πληρωμής
- Το `ChargeConfig` ορίζει τη λογική τιμολόγησης — μπορεί να είναι δυναμική βάσει παραμέτρων αιτήματος

---

### Πελάτης Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

Το `send_with_payment` επεκτείνει κάθε HTTP client με αυτόματο χειρισμό 402, διαχείριση συνεδριών και εκπλήρωση πληρωμών Zcash.

---

## Αναφορά CLI

| Εντολή | Περιγραφή |
|---|---|
| `npx zimppy wallet create` | Δημιούργησε κλειδιά και εμφάνισε τη φράση ανάκτησης |
| `npx zimppy wallet whoami` | Εμφάνισε διεύθυνση (UA + T-addr), ισορροπία, δίκτυο |
| `npx zimppy wallet balance --all` | Αναλυτική ισορροπία ανά λογαριασμό |
| `npx zimppy wallet send <addr> <zat>` | Στείλε θωρακισμένη ή διαφανή ZEC |
| `npx zimppy wallet transfer <from> <to> <zat>` | Εσωτερική μεταφορά μεταξύ λογαριασμών |
| `npx zimppy wallet shield` | Μετέφερε διαφανή κεφάλαια στο Orchard (θωρακισμένο) |
| `npx zimppy wallet use <name>` | Άλλαξε ενεργή ταυτότητα πορτοφολιού |
| `npx zimppy request <url>` | Αυτόματο αίτημα 402 -> πληρωμή -> επανάληψη |

---

## Βασικά χαρακτηριστικά

### Πορτοφόλια εγγενή για agents

Τα πορτοφόλια Zimppy έχουν σχεδιαστεί για προγραμματιστική χρήση από AI agents — όχι για browser extensions που διαχειρίζονται άνθρωποι. Τα κλειδιά διαχειρίζονται μέσω CLI ή SDKs, οι λογαριασμοί μπορούν να περιστρέφονται μέσω derivation λογαριασμών **ZIP-32** και το πορτοφόλι υποστηρίζει πλήρως αυτοματοποιημένες ροές πληρωμών χωρίς ανθρώπινη έγκριση ανά συναλλαγή.

### Υποστήριξη πολλαπλών agents

Πολλαπλοί agents μπορούν να λειτουργούν από το ίδιο πορτοφόλι χρησιμοποιώντας περιστροφή λογαριασμών **ZIP-32** — κάθε agent λαμβάνει τον δικό του λογαριασμό με απομονωμένη παρακολούθηση ισορροπίας, δυνατότητα μεταφοράς μεταξύ λογαριασμών και αναφορά ισορροπίας ανά λογαριασμό. Αυτό επιτρέπει τη διαχείριση στόλου πολλών agents από μία μόνο υποδομή πορτοφολιού.

### Πλήρως θωρακισμένες συναλλαγές Zcash (Orchard)

Οι θωρακισμένες πληρωμές χρησιμοποιούν το **πρωτόκολλο Orchard** του Zcash, το θωρακισμένο pool που εισήχθη από το NU5. Ο server επαληθεύει τις πληρωμές χρησιμοποιώντας ένα **Incoming Viewing Key (IVK)**, το οποίο μπορεί να αποκρυπτογραφήσει ληφθέντα notes χωρίς να εκθέτει το spending key. Οι επιθέσεις επανάληψης αποτρέπονται μέσω **σύνδεσης σημειώματος** — κάθε challenge ενσωματώνει ένα μοναδικό σημείωμα `zimppy:{challenge_id}` που επαληθεύεται κρυπτογραφικά.

### Συνεδρίες, μηδενική καθυστέρηση ανά αίτημα

Η αρχιτεκτονική συνεδρίας αποσυνδέει την αναμονή επιβεβαίωσης on-chain από την καθυστέρηση ανά αίτημα. Μετά από μία κατάθεση (~75 δευτερόλεπτα), όλα τα επόμενα bearer-token αιτήματα εξυπηρετούνται άμεσα χωρίς αλληλεπίδραση με το blockchain έως το κλείσιμο της συνεδρίας.

### Ροή, χρέωση ανά token

Η εγγενής υποστήριξη **SSE (Server-Sent Events)** επιτρέπει περιεχόμενο με χρέωση ανά token. Είναι ιδανική για APIs inference LLM όπου το μήκος εξόδου μεταβάλλεται και η χρέωση πρέπει να αντικατοπτρίζει την πραγματική κατανάλωση.

### Συμμόρφωση με προδιαγραφές

- Τα υπογεγραμμένα challenges **HMAC-SHA256** αποτρέπουν την πλαστογράφηση
- Η δομημένη μορφή σφαλμάτων **RFC 9457** επιτρέπει διαλειτουργικό χειρισμό σφαλμάτων
- Το **`/.well-known/payment`** επιτρέπει την αυτόματη ανακάλυψη μεθόδων πληρωμής από κάθε agent συμβατό με MPP

---

## Αρχιτεκτονική

```
crates/
  zimppy-core/       Zcash verification engine (Orchard decryption, replay protection)
  zimppy-wallet/     Native Zcash wallet (zingolib)
  zimppy-rs/         Rust SDK (ChargeMethod, SessionMethod, PaymentProvider, axum extractors)
  zimppy-napi/       Node.js native bindings (NAPI-RS)

packages/
  zimppy-ts/         TypeScript SDK (charge, session, SSE)
  zimppy-cli/        CLI with auto-pay and session management
```

### Αρμοδιότητες στοιχείων

**`zimppy-core`** - Ο κρυπτογραφικός πυρήνας. Διαχειρίζεται την αποκρυπτογράφηση note Orchard χρησιμοποιώντας το IVK του server, την ανάλυση σημειωμάτων, τη λογική προστασίας από επανάληψη και την επαλήθευση challenge. Είναι γραμμένος σε Rust για απόδοση και ορθότητα.

**`zimppy-wallet`** - Ένα εγγενές πορτοφόλι Zcash που τροφοδοτείται από το `zingolib`. Διαχειρίζεται κλειδιά, λογαριασμούς, θωρακισμένες/διαφανείς ισορροπίες και υποβολή συναλλαγών.

**`zimppy-rs`** - Το SDK Rust. Παρέχει τα traits `ChargeMethod`, `SessionMethod` και `PaymentProvider`, καθώς και extractors Axum (`MppCharge`, `WithReceipt`) για εργονομική ενσωμάτωση server.

**`zimppy-napi`** - Bindings NAPI-RS που εκθέτουν τον πυρήνα Rust στο Node.js, επιτρέποντας στο SDK TypeScript να χρησιμοποιεί την ίδια κρυπτογραφική μηχανή χωρίς επανυλοποίηση primitives Zcash στο JavaScript.

**`zimppy-ts`** - Το SDK TypeScript. Περιτυλίγει τα NAPI bindings με ιδιωματικά async/await APIs για ροές χρέωσης, συνεδρίας και ροής SSE.

**`zimppy-cli`** - Το πορτοφόλι γραμμής εντολών και εργαλείο αιτημάτων. Υποστηρίζει αυτόματη πληρωμή (402 -> πληρωμή -> επανάληψη), διαχείριση συνεδριών και όλες τις λειτουργίες πορτοφολιού.

---

## Παραδείγματα και επιδείξεις

| Παράδειγμα | Περιγραφή |
|---|---|
| `examples/fortune-teller/` | Επιδείξεις χρέωσης, συνεδρίας και ροής - server + client Rust |
| `examples/llm-summarizer/` | Επίδειξη ροής LLM με χρέωση ανά token |
| `examples/mcp-server/` | MCP tool server με επί πληρωμή AI εργαλεία |
| `examples/ts-server/` | Υλοποίηση αναφοράς MPP server TypeScript |

---

## Τι περιλαμβάνεται - Σύνοψη χαρακτηριστικών

| Χαρακτηριστικό | Περιγραφή |
|---|---|
| **Συνεδρίες** | Κατάθεσε μία φορά, άμεσα bearer αιτήματα, επιστροφή χρημάτων στο κλείσιμο |
| **Ροή** | Περιεχόμενο με χρέωση ανά token μέσω SSE |
| **Χρέωση** | Θωρακισμένη ή διαφανής πληρωμή ανά HTTP αίτημα (ροή 402) |
| **Διαφανείς πληρωμές** | T-addresses με αποτροπή επανάληψης ανά challenge + εντολή shield |
| **Πολλαπλοί λογαριασμοί** | Περιστροφή λογαριασμών ZIP-32, μεταφορές μεταξύ λογαριασμών, ισορροπίες ανά λογαριασμό |
| **Πορτοφόλι CLI** | Αποστολή, shield, μεταφορά, balance --all, whoami, αυτόματη πληρωμή |
| **Διπλό SDK** | TypeScript και Rust |
| **Συμβατό με προδιαγραφές** | Challenges HMAC-SHA256, σφάλματα RFC 9457, ανακάλυψη `/.well-known/payment` |

---

*Για περισσότερες πληροφορίες, επισκέψου το [zimppy.xyz](https://zimppy.xyz)*

---

## Σχετικές σελίδες

- [Πορτοφόλια](/using-zcash/wallets) — Zcash πορτοφόλια που υποστηρίζουν θωρακισμένες συναλλαγές
- [Θωρακισμένα pools](/using-zcash/shielded-pools) — Πώς οι θωρακισμένες συναλλαγές Orchard προστατεύουν δεδομένα πληρωμών
- [Επεξεργαστές πληρωμών](/using-zcash/payment-processors) — Άλλοι τρόποι να δέχεσαι πληρωμές Zcash
- [Θωρακισμένα assets Zcash](/zcash-tech/zcash-shielded-assets) — ZSAs και το μέλλον της προγραμματισιμότητας Zcash
- [Κοινοτικά έργα](/zcash-community/community-projects) — Περισσότερα έργα του οικοσυστήματος Zcash
