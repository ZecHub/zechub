# Zero to Zero Knowledge: Hash Functions

**Introduzione alla serie**  
Benvenuti in una nuova serie: **Zero to Zero Knowledge**!  

In questa serie impareremo i fondamenti di un'ampia gamma di tecnologie che entrano nei nostri protocolli per la tutela della privacy.

---

## Parte 1: Hash Functions

Oggi iniziamo con le **Hash Functions** - un elemento chiave della crittografia usato nelle blockchain. Più avanti in questa serie tratteremo alcuni argomenti che si basano sulle loro proprietà.

### Cos'è una Hash Function?

Le Hash Functions prendono un input di qualsiasi lunghezza e producono un output di lunghezza fissa.

- **Messaggio da sottoporre ad hashing** = Input  
- **L'algoritmo che viene usato** = Hash Function  
- **Output risultante** = Hash Value  


![Hash Function diagram](https://pbs.twimg.com/media/Fn_NkFHXgAEtgse.png)

### Provalo tu stesso!

Acquisiamo una comprensione pratica usando questo strumento!  
Inserisci un testo arbitrario qualsiasi per produrre un output di lunghezza fissa. Osserva come l'output varia a seconda del diverso algoritmo di hashing.

**Provalo:** https://cryptii.com/pipes/hash-function

---

### Proprietà delle Cryptographic Hash Functions

Le Cryptographic Hash Functions devono avere queste **3 proprietà**:

1. **Unidirezionale** - Dovrebbe essere impraticabile invertire una hash function  
2. **Resistente alle collisioni** - Due input diversi non devono produrre lo stesso output  
3. **Deterministica** - Per qualsiasi input, una hash function deve sempre dare lo stesso risultato

---

### Hash Functions comuni

Esistono diverse classi di Hash Functions. Alcuni esempi:

- Secure Hashing Algorithm (**SHA-3**)  
- Message Digest Algorithm 5 (**MD5**)  
- **BLAKE2b** - Usato nella derivazione delle chiavi in Zcash

**Un'introduzione a BLAKE2 di Zooko**: https://www.zfnd.org/blog/blake2/

---

### Usi reali delle Hash Functions

#### 1. Integrity Hashing (controlli di integrità dei dati)
I controlli di integrità dei dati sono un esempio di "Integrity Hashing". Vengono usati per generare checksum sui file di dati e fornire all'utente la garanzia di correttezza.

![Integrity Hashing example](https://pbs.twimg.com/media/Fn_Or0MWIAI6sgx.png)

#### 2. Merkle Trees (Hash Trees)
Un **hash tree** o **Merkle tree** è composto da rami e nodi foglia etichettati con l'hash crittografico di un blocco di dati.

![Merkle Tree diagram](https://pbs.twimg.com/media/Fn_O7ndWIAY5PA-.jpg)

I Merkle tree sono un esempio di **commitment scheme crittografico**. La radice dell'albero è vista come un commitment e i nodi foglia vengono dimostrati far parte del commitment originale.

Verificano i dati memorizzati o trasferiti sulle reti P2P, garantendo che i dati ricevuti dai peer siano inalterati.

#### 3. Note Commitment Tree in Zcash
Nei pool schermati **Sapling** e **Orchard** di Zcash, il **Note Commitment Tree** viene usato per verificare che le transazioni siano valide rispetto al consenso, nascondendo perfettamente mittente, destinatario e importi consumati.

#### 4. Signature Hash (blocchi in stile Bitcoin)
**SHA256** è un esempio di "Signature hash" usato per imporre l'immutabilità di ogni blocco nella chain di Bitcoin. I miner usano l'hash del blocco precedente + un hash di tutte le transazioni nel blocco corrente (hashMerkleRoot) + il timestamp + un valore casuale / la difficoltà di rete per i nuovi blocchi.

![SHA256 block diagram](https://pbs.twimg.com/media/Fn_PaVZXoAApHPf.jpg)

#### 5. Equihash (mining di Zcash)
**Equihash** è l'algoritmo di hashing usato nel mining di Zcash. È usato anche da reti come Komodo e Horizen.

**Blog originale di Zcash su Equihash**: https://electriccoin.co/blog/equihash/

---

### Approfondimenti

Per costruire una comprensione più approfondita dei diversi tipi di hash function e dei loro usi associati, questa è un'ottima risorsa:  
https://en.wikipedia.org/wiki/Hash_function

---

**Thread di ZecHub (@ZecHub)**  
Thread X originale: https://x.com/ZecHub/status/1621240109663227906  

---

*Questa pagina è stata compilata a partire dal thread originale di Zero to Zero Knowledge per la wiki di ZecHub.*
