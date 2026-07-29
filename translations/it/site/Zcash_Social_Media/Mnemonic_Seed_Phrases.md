# Zero to Zero Knowledge: frasi seed mnemoniche

**Serie:** Zero to Zero Knowledge

Le frasi seed mnemoniche sono alla base di uno degli aspetti più importanti delle criptovalute - la **auto-custodia**.  
Oggi impariamo come una frase seed viene generata e usata nei wallet.

---

## Cosa sono le frasi seed mnemoniche?

Le frasi di recupero sono definite dalla specifica **BIP-39**, il tipo di frase di recupero più comune usato oggi.

La creazione delle frasi di recupero inizia generando **casualità**. Più entropia significa maggiore sicurezza. **128 bit** di entropia sono considerati sufficienti per la maggior parte degli utenti.

![Seed phrase concept](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

A seconda della lunghezza dell'entropia iniziale, la frase di recupero sarà lunga da **12 a 24 parole**.

---

## Passo dopo passo: come viene generata una frase seed di 12 parole

### 1. Genera l'entropia
Iniziamo generando **128 bit** di entropia.

### 2. Aggiungi il checksum
Facciamo l'hash dell'entropia usando **SHA256**. I primi bit di questo hash diventano il checksum.  
Questo ci dà un'impronta unica per la nostra entropia.

![Entropy + Checksum diagram](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. Suddividi in blocchi da 11 bit
I 132 bit totali (128 di entropia + 4 di checksum) vengono separati in blocchi di 11 bit.

### 4. Mappa sulla wordlist
Ogni sequenza di 11 bit viene convertita in un numero decimale (0-2047).  
Le wordlist BIP-39 contengono esattamente **2048 parole** (inglese, spagnolo, cinese, ecc.).

Questi numeri vengono usati per trovare la parola corrispondente nella wordlist.

![Word mapping example](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

**Risultato:** ora abbiamo una frase di recupero di 12 parole, sicura e leggibile dall'uomo!

---

## Dalla frase di recupero -> al seed -> agli indirizzi di pagamento

Usando la frase di recupero, un wallet può generare chiavi per creare indirizzi di pagamento e diversi account del wallet.

Le chiavi generate sono **deterministiche** - lo stesso input produce sempre lo stesso output.

### Generazione del seed
Il seed del wallet viene derivato dalla frase mnemonica usando una **funzione di derivazione delle chiavi (KDF)**:

- In **Bitcoin**: PBKDF2  
- In **Zcash**: Blake2b-256/512

Questo produce un seed di **64 byte (512 bit)**.

![Seed to master keys](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### Chiavi master
Il seed viene suddiviso in due sequenze da 32 byte:
- **Master Spending Key**
- **Master Chain Code**

Queste vengono usate nei **wallet deterministici gerarchici (HD)** per la derivazione delle chiavi figlie.

---

## Funzionalità specifiche di Zcash (ZIP-32)

In Zcash, l'**autorità di visualizzazione** o l'**autorità di spesa** possono essere delegate in modo indipendente per i sotto-alberi senza compromettere il seed master.

**ZIP-32** definisce lo standard di generazione deterministica gerarchica delle chiavi adattato alle funzionalità di privacy di Zcash.

Da una **Expanded Spending Key** deriviamo:
- Full Viewing Key
- Incoming Viewing Key
- Un insieme di indirizzi di pagamento

Diversi meccanismi di derivazione producono indirizzi esterni adatti a essere distribuiti ai mittenti attraverso gli shielded pool (Sapling e Orchard).

![Zcash key derivation hierarchy](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

Zcash supporta anche gli **indirizzi interni** per operazioni del wallet come l'Auto-Shielding.

---

## Risorse

- [ZIP-32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032)  
- [Zcash Protocol Specification (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Panoramica sui wallet shielded-by-default](https://zechub.wiki)

---

**Thread originale di ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*Questa pagina è stata compilata a partire dal thread originale Zero to Zero Knowledge per il wiki di ZecHub.*
