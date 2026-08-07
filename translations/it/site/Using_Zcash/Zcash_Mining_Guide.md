# Guida al Mining di Zcash: unirsi a un mining pool con hardware personale

## Introduzione

Zcash (ZEC) è una criptovaluta focalizzata sulla privacy che utilizza l'algoritmo proof-of-work Equihash per il mining. Fare mining di Zcash significa usare potenza computazionale per risolvere complessi problemi matematici, convalidare le transazioni e mettere in sicurezza la rete in cambio di ricompense in ZEC. A causa dell'elevata difficoltà della rete, il mining in solitaria non è consigliato alla maggior parte degli utenti. Unirsi a un mining pool è il modo migliore per ottenere ricompense costanti combinando il proprio hash power con quello di altri.

Questa guida si concentra sul mining di Zcash utilizzando hardware personale (ad esempio un PC domestico con GPU o ASIC entry-level). Tieni presente che, sebbene le GPU possano ancora fare mining di Zcash, gli ASIC sono di gran lunga più efficienti e redditizi nel 2026 a causa della difficoltà della rete. Controlla sempre la redditività attuale usando strumenti come WhatToMine.com, poiché fattori come i costi dell'elettricità, i prezzi dell'hardware e il valore di ZEC influenzano la convenienza. Il mining potrebbe non essere redditizio per tutti; informati sulle normative locali e sulle tariffe energetiche (punta a < $0.08/kWh).


## Requisiti

### Hardware
- **Mining con GPU (configurazione personale consigliata per principianti):**
  - GPU NVIDIA o AMD con almeno 4GB di VRAM (ad es. NVIDIA GTX 1070, RTX 3060; AMD RX 580 o superiore).
  - Una scheda madre compatibile, un alimentatore sufficiente (almeno 750W per più GPU) e un buon raffreddamento per evitare il surriscaldamento.
  - I rig multi-GPU sono comuni per ottenere hash rate migliori (ad es. 6x GPU possono raggiungere 1-2 kSol/s).
- **Mining con ASIC (più efficiente ma più costoso):**
  - ASIC compatibili con Equihash come Bitmain Antminer Z15 (420 kSol/s) o Innosilicon A9 (50 kSol/s).
  - Sono più rumorosi, più caldi e consumano più energia (ad es. 1500W+); adatti a spazi dedicati. Acquista da fonti affidabili come Bitmain.com o rivenditori (Blockware Mining).
- **Generale:** Internet stabile, un computer per la configurazione/il monitoraggio. Gli ASIC dominano la rete (~13 GSol/s di hash rate totale nel 2026), rendendo il mining con GPU meno competitivo ma ancora possibile per gli hobbisti.

### Software
- **Sistema operativo:** Windows 10/11, Linux (Ubuntu consigliato per la stabilità).
- **Software di mining:**
  - Per GPU: lolMiner (supporta AMD/NVIDIA), GMiner o miniZ (focalizzato su NVIDIA). Scarica dalle repository GitHub ufficiali (ad es. github.com/Lolliedieb/lolMiner-releases).
  - Per ASIC: usa il firmware/dashboard integrato del produttore (ad es. l'interfaccia web di Bitmain).
- **Wallet:** Un wallet Zcash per ricevere i pagamenti. Consigliati:
  - Shielded (privato): Zashi Wallet, Zingo (Mobile/Desktop) YWallet (mobile/desktop).
  - Transparent (più semplice ma meno privato): Edge Wallet, Zecwallet Lite.
  - Scarica da [wallet](https://zechub.wiki/wallets). Genera un indirizzo shielded (inizia con 'zs') per maggiore privacy se il pool lo supporta.

### Altro
- Elettricità: calcola i costi. Le GPU usano 150-300W per scheda; gli ASIC 1000W+.
- Antivirus: disattivalo durante la configurazione, poiché potrebbe segnalare i miner come minacce.

## Guida passo passo per unirsi a un mining pool

### Passo 1: configura il tuo wallet Zcash
1. Scarica e installa un wallet dal sito ufficiale di Zcash [wallet](https://zechub.wiki/wallets).
2. Crea un nuovo wallet e conserva in modo sicuro il backup della tua seed phrase.
3. Genera un indirizzo di ricezione (preferibilmente shielded per la privacy). Annotalo, ad es. `zs1exampleaddress...`.
4. Se usi un indirizzo transparent (inizia con 't'), è più semplice ma offre meno privacy.

### Passo 2: prepara il tuo hardware
- Per GPU:
  1. Installa le GPU nel tuo PC e aggiorna i driver (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Fai overclock se hai esperienza (usa MSI Afterburner per la stabilità; punta a +100-200 di core clock, -500 di memoria per l'efficienza).
- Per ASIC:
  1. Collega l'ASIC all'alimentazione e a Ethernet.
  2. Trova il suo indirizzo IP usando uno strumento come Advanced IP Scanner o l'app del produttore.
  3. Accedi alla dashboard web (ad es. inserisci l'IP nel browser, login predefinito: root/root per Bitmain).

**Avvertenza:** assicurati che ci sia una ventilazione adeguata; il mining genera calore. Inizia in piccolo per fare delle prove.

### Passo 3: scegli e unisciti a un mining pool
I mining pool distribuiscono il lavoro e condividono le ricompense in base all'hash rate che contribuisci. Scegli in base alle commissioni (0-2%), alla soglia minima di pagamento (0.01-0.1 ZEC), alla posizione (ping basso) e all'affidabilità.

**Pool consigliati (in base a hash rate, commissioni e recensioni):**
- **2Miners (zec.2miners.com)**: commissione 1%, pagamento PPLNS, supporta GPU/ASIC/NiceHash. Alto hash rate (~1.17 GSol/s), server affidabili.
- **F2Pool (zec.f2pool.com)**: commissione 2%, pagamento PPS+, supporto multi-coin. Grande pool (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: commissione 2% (PPS+), dashboard intuitiva, server globali.
- **AntPool (zec.antpool.com)**: commissione 1%, di Bitmain, buono per ASIC (~494 MSol/s).
- **Sovright (mining.sovright.com)**: un pool Zcash costruito su Stratum V2, attualmente in esecuzione come testnet pubblica. Non ci sono ancora pagamenti live in ZEC, quindi consideralo come un modo per testare la tua configurazione piuttosto che una fonte di guadagno. Consulta la sezione dedicata qui sotto per i dettagli.
- Altri: Kryptex Pool, Luxor (controlla poolwatch.io/coin/zcash per statistiche in tempo reale).

1. Visita il sito web del pool e crea un account (email o nessuna registrazione per alcuni come 2Miners).
2. Aggiungi il tuo indirizzo wallet Zcash nelle impostazioni per i pagamenti.
3. Annota il server stratum del pool (ad es. zec.2miners.com:1010) e la porta.

### Passo 4: installa e configura il software di mining
- Per GPU (esempio: lolMiner su Windows/Linux):
  1. Scarica lolMiner da GitHub (ultima versione, ad es. 1.88).
  2. Estrailo in una cartella.
  3. Crea un file batch (start.bat) con la configurazione:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Sostituisci `YOUR_WALLET_ADDRESS` con il tuo indirizzo ZEC.
     - `WORKER_NAME`: un nome per il tuo rig (ad es. Rig1).
     - Per i server UE: eu.zec.2miners.com:1010.
  4. Esegui il file batch. Si connetterà al pool e inizierà il mining.
- Per ASIC (esempio: Bitmain Antminer):
  1. Accedi alla dashboard web.
  2. Vai su Miner Configuration.
  3. Aggiungi i dettagli del pool:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (oppure vuoto).
  4. Salva e riavvia il miner.
- Per altri software (ad es. GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Test:** esegui per 10-15 minuti; controlla la console per verificare share accettate e hash rate.

### Passo 5: avvia il mining e monitora
1. Avvia il miner: si connetterà al pool e inizierà a inviare share.
2. Monitora tramite:
   - Dashboard del pool: inserisci il tuo indirizzo wallet per vedere hash rate, saldo non pagato e statistiche.
   - Console del software: controlla eventuali errori, temperatura (mantieni < 80 gradi C).
   - Strumenti: usa HiveOS o SimpleMining OS per la gestione remota del rig.
3. Pagamenti: la maggior parte dei pool paga automaticamente quando raggiungi la soglia minima (ad es. 0.05 ZEC). Controlla le regole del pool.

   
![Configurazione di monitoraggio del mining di Zcash](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: pool testnet e rete relay

Sovright (sovright.com) gestisce un mining pool Stratum V2 e una rete relay di blocchi separata. Svolgono compiti diversi, quindi sono trattati separatamente qui sotto.

### Mining Pool (mining.sovright.com)

Il pool di Sovright gira su una testnet pubblica di Zcash (NU6, Stratum V2), non su mainnet. La testnet non distribuisce veri pagamenti in ZEC. Usalo per testare la configurazione del tuo miner, non per guadagnare.

- Non è richiesto alcun account per iniziare. Punta un miner Equihash CPU o ASIC verso il pool e le tue share compariranno su una dashboard live.
- Sovright pubblica anche un proxy Stratum V2 open source per i miner che vogliono scegliere i propri block template invece di limitarsi a prendere i job del pool:
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Punta il tuo miner al proxy invece che direttamente al pool:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  usando un nome worker come `yourname.rig1`.
- La pagina della trasparenza di Sovright dichiara una policy "include all" per le transazioni shielded, a differenza di alcuni pool che le filtrano. Ogni blocco riceve un'attestazione firmata, così la policy può essere verificata in modo indipendente.
- Crea un account su mining.sovright.com (accesso con Google o email) per tracciare i tuoi worker invece dei dati di esempio della dashboard.

### Relay Network (relay.sovright.com)

Sovright gestisce separatamente una rete relay pubblica di blocchi sulla mainnet di Zcash. Quando un pool trova un blocco, la velocità con cui quel blocco raggiunge il resto della rete determina quanto spesso viene orphaned, cioè perde la corsa di propagazione e la relativa ricompensa va persa. Il relay inoltra i blocchi attraverso quattro regioni usando compact block relay con forward error correction.

La dashboard pubblica mostra l'effetto in tempo reale: le regioni collegate al relay vedono i nuovi blocchi in ben meno della metà del tempo richiesto dal semplice gossip peer-to-peer, e la dashboard tiene traccia del tasso di orphan live della rete.

Questa è infrastruttura per operatori di pool, non per singoli miner. La repository open source `mining-infra` di Sovright documenta un gateway relay `submitblock` per propagare i blocchi trovati nella mesh più velocemente del P2P nativo. Per connetterti, contatta direttamente Sovright (support@sovright.com) per ottenere gli indirizzi dei peer relay e una chiave di autenticazione.


## Suggerimenti e buone pratiche
- **Redditività:** usa calcolatori come whattomine.com/coins/166-zec-equihash. Esempio: una RTX 3060 (~300 Sol/s) produce ~0.001 ZEC/giorno a $50/ZEC, meno ~$0.50 di elettricità.
- **Privacy:** usa pool shielded se disponibili; evita di riutilizzare gli indirizzi.
- **Sicurezza:** usa password robuste; abilita il 2FA su pool/wallet. Non condividere mai le chiavi private.
- **Risoluzione dei problemi:** se non ci sono share, controlla firewall, antivirus o configurazione errata. Unisciti a forum come forum.zcashcommunity.com o Reddit r/zec.
- **Alternative:** se non è redditizio, valuta il cloud mining o lo staking di altre coin.
- **Nota ambientale:** il mining consuma energia; usa fonti rinnovabili se possibile.
- **Aggiornamenti:** Zcash potrebbe evolversi (ad es. un possibile passaggio a PoS); controlla z.cash per le novità.
