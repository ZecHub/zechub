# Zero to Zero Knowledge: il protocollo CryptoNote

**Serie:** Zero to Zero Knowledge

Uno interessante oggi!  
Il protocollo **CryptoNote** abilita una forte privacy on-chain. Oggi impariamo tutte le sue caratteristiche chiave e come è stato implementato da diversi progetti di privacy degni di nota.

![CryptoNote intro](https://pbs.twimg.com/media/FrXr5P8WIAAvx36.jpg)

---

## Contesto

Il whitepaper originale di CryptoNote fu pubblicato sotto lo pseudonimo di **"Nicolas van Saberhagen"**.  

**Bytecoin** fu la prima criptovaluta a implementare il protocollo. Il progetto più conosciuto che lo usa oggi è **Monero (XMR)**. È stato usato anche in TurtleCoin, Aeon e diversi altri.

---

## Caratteristiche principali di CryptoNote

Il protocollo CryptoNote fornisce tre caratteristiche principali:

1. **Non tracciabilità e non collegabilità** delle transazioni
2. **Egalitarian Proof of Work** (resistente agli ASIC) 
3. **Emissione dinamica**

---

## 1. Non tracciabilità - Ring Signatures

La non tracciabilità è raggiunta principalmente usando le **Ring Signatures**.

Quando invii una transazione, la tua vera chiave pubblica viene mescolata con diverse chiavi esca (il "ring") - tutte contenenti la stessa quantità di monete. Questo rende estremamente difficile determinare chi ha effettivamente inviato le monete.

La **dimensione del ring** influisce significativamente sull'anonymity set. Ring più grandi forniscono una privacy migliore.

![Ring Signatures explanation](https://pbs.twimg.com/media/FrXteGHXgAANE0F.png)

**Confronto con Zcash**:  
L'anonymity set di Zcash è il numero totale di transazioni *mai* effettuate in un determinato pool schermato (molto più grande delle tipiche dimensioni dei ring di CryptoNote).

---

## Ring CT (Confidential Transactions)

Il modello **Ring CT** ha migliorato notevolmente la privacy nelle monete basate su CryptoNote.

Invece di nascondere solo il mittente, Ring CT **offusca anche gli importi delle transazioni** tra mittente e destinatario.

![Ring CT diagram](https://pbs.twimg.com/media/FrXuivgWYAAze7B.png)

Utilizza:
- Elliptic Curve Cryptography
- Pedersen Commitments
- Homomorphic Encryption

Le **prove** vengono usate per dimostrare che l'importo è maggiore di 0 ed entro intervalli validi **senza rivelare i valori effettivi**.

Gli **Stealth Address** aggiungono inoltre indirizzi monouso per il destinatario.

![Stealth Addresses + Proofs](https://pbs.twimg.com/media/FrXut5aWAAMhuRb.jpg)

---

## 2. Egalitarian Proof of Work (ePoW)

CryptoNote mira a creare un sistema di mining più equo essendo resistente agli ASIC.

Utilizza l'algoritmo **CryptoNight** (una funzione memory-hard). A differenza dello SHA256 di Bitcoin, CryptoNight è progettato per ridurre il divario tra miner CPU, GPU e ASIC.

**Passaggi di CryptoNight:**
1. Inizializza una grande area di memoria (scratchpad) con dati pseudocasuali
2. Esegue numerose operazioni di lettura/scrittura sullo scratchpad
3. Esegue l'hash dell'intero scratchpad per produrre il valore finale

![CryptoNight mining](https://pbs.twimg.com/media/FrXvNs3XsAA37LG.jpg)

(Nota: da allora Monero si è allontanato da CryptoNight verso altri algoritmi.)

---

## 3. Emissione dinamica

Invece di eventi di halving improvvisi (come Bitcoin), CryptoNote usa una **ricompensa di blocco che decresce in modo graduale**.

Questo crea una curva di emissione molto più graduale nel tempo.

![Dynamic emission curve](https://pbs.twimg.com/media/FrXv8wpXoAEjUxW.png)

**Connessione con Zcash**:  
Gli sviluppatori di Zcash hanno discusso l'implementazione di una curva di emissione più graduale in futuro, potenzialmente attraverso un "Zcash Posterity Fund".

---

## Conclusione

CryptoNote si è dimostrato un approccio forte e collaudato alla privacy on-chain. Molte delle sue innovazioni hanno influenzato il più ampio ecosistema delle privacy coin.

Alcuni ricercatori ritengono che le caratteristiche di CryptoNote potrebbero alla fine essere combinate con pool schermati trustless a conoscenza zero.

---

**Thread originale di ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*Questa pagina è stata compilata a partire dal thread originale di Zero to Zero Knowledge per la wiki di ZecHub.*
