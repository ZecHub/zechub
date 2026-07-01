![Tor logo](https://gitlab.torproject.org/uploads/-/system/appearance/header_logo/1/purple.svg)

# **Arti: il client Tor di nuova generazione in Rust**
![Atri Logo](https://gitlab.torproject.org/uploads/-/system/project/avatar/647/sliced-onions.png)

**Arti** è l'iniziativa del Tor Project per costruire un client **Tor** di nuova generazione usando il linguaggio di programmazione **Rust**. Arti è progettato per essere modulare, incorporabile e pronto per la produzione, offrendo un'implementazione più sicura ed efficiente dei protocolli di anonimato di **Tor**. Con **Arti versione 1.4.0** sono stati introdotti diversi aggiornamenti significativi:

- Una **nuova interfaccia RPC** per un'interazione migliorata.
- Lavoro preparatorio per il **supporto ai relay**.
- Miglioramenti nella **resistenza ai denial-of-service dei servizi onion lato servizio**.

Questa release prosegue gli sforzi del Tor Project per offrire migliore sicurezza, prestazioni e modularità agli utenti e agli sviluppatori di Tor.


---


## **Installazione del client Arti**

Segui questi passaggi per installare ed eseguire **Arti** come proxy SOCKS sul tuo sistema.

---

### **Passo 1: configurare un ambiente di sviluppo Rust**

Prima di poter compilare Arti dal sorgente, devi avere installato l'ultima versione stabile di **Rust**.

#### Per installare Rust:

1. Visita il [sito web ufficiale di Rust](https://www.rust-lang.org/).
2. Segui le istruzioni di installazione per il tuo sistema operativo.
3. Verifica l'installazione eseguendo:
   
   ```sh
   rustc --version
   ```

Questo confermerà che hai installato l'ultima versione stabile di Rust sul tuo sistema.

#### **Nota per gli utenti Windows**:
- Rust può essere installato su Windows tramite [**Rustup**](https://rustup.rs/), un installatore di toolchain. Assicurati di aver configurato anche un ambiente di build compatibile (su Windows potresti aver bisogno dei **Visual Studio Build Tools**).
  
---

### **Passo 2: clonare il repository di Arti**

Per ottenere l'ultima versione del client Arti, dovrai clonare il repository da [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Passaggi:
1. Apri il tuo terminale (Prompt dei comandi, PowerShell o Git Bash su Windows).
2. Esegui il seguente comando per clonare il repository:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Spostati nella directory *arti* appena creata:
   
   ```sh
   cd arti
   ```

Questo scaricherà il codice sorgente di Arti sulla tua macchina locale.

---

### **Passo 3: compilare il binario di Arti**

Una volta clonato il repository, devi compilare Arti usando **Cargo**, che è il gestore di pacchetti e lo strumento di build di Rust.

#### Per compilare Arti:
1. Nel terminale, esegui il seguente comando:
   ```sh
   cargo build --release
   ```

Questo comando compila il codice di Arti e lo ottimizza per la produzione (il flag *--release*). Il binario verrà creato nella directory *target/release*.

#### Posizione del binario compilato:
- Dopo la compilazione, il binario di Arti si troverà in:  
  ```sh
  target/release/arti
  ```

Puoi eseguire questo binario direttamente dal terminale.

---

### **Passo 4: eseguire il proxy SOCKS di Arti**

Per usare Arti come proxy SOCKS (che instraderà il tuo traffico internet attraverso la rete Tor), devi avviare il proxy.

#### Per avviare il proxy SOCKS:
1. Esegui il seguente comando:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Questo comando avvia Arti come **proxy SOCKS5** sulla **porta 9150**, che è la porta predefinita usata da Tor per il traffico SOCKS.

---

### **Passo 5: configurare le applicazioni per usare Arti**

Una volta che Arti è in esecuzione come proxy SOCKS, devi configurare le tue applicazioni perché lo usino per instradare il traffico attraverso la rete Tor.

#### Passaggi:
1. Nelle impostazioni della tua applicazione (ad esempio browser web, applicazione da terminale), cerca le **impostazioni del proxy**.
2. Imposta il **proxy SOCKS5** su *localhost:9150*.

Questo instraderà tutto il traffico delle tue applicazioni attraverso la **rete Tor** usando Arti come intermediario.

---

## **Integrazione di Arti con la rete Tor**

Ecco un diagramma semplificato per illustrare come funziona Arti in combinazione con la rete Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- L'**applicazione** si connette al **proxy SOCKS di Arti** usando il protocollo **SOCKS5**.
- Arti comunica quindi con la **rete Tor**, garantendo che il tuo traffico venga anonimizzato mentre attraversa la rete.

---

## **Repository GitLab e contributi**

Se sei interessato a contribuire allo sviluppo di **Arti**, puoi esplorare il codice e contribuire tramite **GitLab**.

- **Link al repository**: [Repository GitLab di Arti](https://gitlab.torproject.org/tpo/core/arti)
- **Clona il repo**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Fork e contributi**:
1. **Forka** il repository su GitLab (richiede un account GitLab).
2. Collega il tuo repository forkato alla tua configurazione locale:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Sostituisci *_name_* con il tuo nome utente GitLab.

3. **Invia le modifiche** al tuo fork:
   ```sh
   git push _name_ main
   ```

4. **Crea una Merge Request (MR)** su GitLab:
   Vai alla sezione Merge Request nel tuo fork GitLab:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Linee guida per le Merge Request**:
- **Non fare rebase e squash dei commit durante la review**.
- Se necessario, usa *fixup!* o *squash!* per l'auto-squash dei commit.
- Punta ad **aggiungere nuovi commit** invece di fare squash durante il ciclo di review.

---

### **Note aggiuntive**:

- **Binari precompilati**: al momento, **Arti** non fornisce binari precompilati ufficiali. Devi compilare il client dal sorgente come descritto sopra.
- **Conoscenza di Rust**: se contribuisci ad Arti, tieni presente che la codebase è ancora in evoluzione, e potrebbero esserci cambiamenti o refactoring man mano che vengono aggiunte nuove funzionalità.

---



Se sei interessato a contribuire al progetto, sentiti libero di dare un'occhiata al codice, forkare il repository e inviare una Merge Request. Per maggiori informazioni, aggiornamenti e risoluzione dei problemi, consulta il [Repository GitLab di Arti](https://gitlab.torproject.org/tpo/core/arti). 

Goditi la tua esperienza con **Arti** e buon hacking!

--- 
