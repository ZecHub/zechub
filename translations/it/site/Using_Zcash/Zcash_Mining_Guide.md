# Zcash Guida al mining: unirsi a una pool di mining con hardware personale

## Introduzione

Zcash (ZEC) è una criptovaluta incentrata sulla privacy che utilizza l'algoritmo di prova di lavoro Equihash per il mining. Il mining di Zcash consiste nell'utilizzare potenza di calcolo per risolvere complessi problemi matematici, convalidare transazioni e proteggere la rete in cambio di ricompense in ZEC. A causa dell'elevata difficoltà della rete, il mining in solitaria non è consigliato alla maggior parte degli utenti. Unirsi a una pool di mining è il modo migliore per ottenere ricompense costanti combinando la tua potenza di hash con quella di altri.

Questa guida si concentra sul mining di Zcash usando hardware personale, ad esempio un PC domestico con GPU o ASIC di fascia base. Tieni presente che, sebbene le GPU possano ancora minare Zcash, gli ASIC sono molto più efficienti e redditizi nel 2026 a causa della difficoltà della rete. Verifica sempre la redditività attuale con strumenti come WhatToMine.com, poiché fattori quali costi dell'elettricità, prezzi dell'hardware e valore di ZEC incidono sulla sostenibilità. Il mining potrebbe non essere redditizio per tutti; informati sulle normative locali e sulle tariffe energetiche, puntando a meno di $0,08/kWh.


## Requisiti

### Hardware
- **Mining con GPU (configurazione personale consigliata per i principianti):**
  - GPU NVIDIA o AMD con almeno 4GB di VRAM, ad esempio NVIDIA GTX 1070, RTX 3060, AMD RX 580 o modelli migliori.
  - Una scheda madre compatibile, un alimentatore sufficiente, almeno 750W per più GPU, e un buon raffreddamento per evitare il surriscaldamento.
  - I rig con più GPU sono comuni per ottenere hash rate migliori, ad esempio 6 GPU possono raggiungere 1-2 kSol/s.
- **Mining con ASIC (più efficiente ma più costoso):**
  - ASIC compatibili con Equihash come Bitmain Antminer Z15 (420 kSol/s) o Innosilicon A9 (50 kSol/s).
  - Sono più rumorosi, più caldi e consumano più energia, ad esempio 1500W+; sono adatti a spazi dedicati. Acquistali da fonti affidabili come Bitmain.com o rivenditori come Blockware Mining.
- **Generale:** Connessione internet stabile e un computer per configurazione e monitoraggio. Gli ASIC dominano la rete, con un hash rate totale di circa 13 GSol/s nel 2026, rendendo il mining con GPU meno competitivo ma ancora possibile per gli appassionati.

### Software
- **Sistema operativo:** Windows 10/11, Linux (Ubuntu consigliato per la stabilità).
- **Software di mining:**
  - Per le GPU: lolMiner (supporta AMD/NVIDIA), GMiner o miniZ (incentrato su NVIDIA). Scarica dai repository ufficiali di GitHub, ad esempio github.com/Lolliedieb/lolMiner-releases.
  - Per gli ASIC: Usa il firmware/dashboard integrato del produttore, ad esempio l'interfaccia web di Bitmain.
- **Portafoglio:** Un portafoglio Zcash per ricevere i pagamenti. Consigliati:
  - Schermato (privato): Portafoglio ZODL, Zingo (mobile/desktop), Zkool (mobile/desktop).
  - Trasparente (più semplice ma meno privato): Edge Wallet, Zecwallet Lite.
  - Scarica da [wallets](https://zechub.wiki/wallets). Genera un indirizzo schermato, che inizia con 'zs', per la privacy se la pool lo supporta.

### Altro
- Elettricità: Calcola i costi. Le GPU usano 150-300W per scheda; gli ASIC 1000W+.
- Antivirus: Disabilitalo durante la configurazione poiché potrebbe segnalare i miner come minacce.

## Guida passo passo per unirsi a una pool di mining

### Passaggio 1: Configura il tuo portafoglio Zcash
1. Scarica e installa un portafoglio dal sito web ufficiale di Zcash [wallets](https://zechub.wiki/wallets).
2. Crea un nuovo portafoglio ed esegui il backup sicuro della tua frase mnemonica.
3. Genera un indirizzo di ricezione, preferibilmente schermato per la privacy. Annotalo, ad esempio `zs1exampleaddress...`.
4. Se usi un indirizzo trasparente, che inizia con 't', è più semplice ma offre meno privacy.

### Passaggio 2: Prepara il tuo hardware
- Per le GPU:
  1. Installa le GPU nel tuo PC e aggiorna i driver (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Effettua l'overclock se hai esperienza (usa MSI Afterburner per la stabilità; punta a +100-200 di core clock, -500 di memoria per l'efficienza).
- Per gli ASIC:
  1. Collega l'ASIC all'alimentazione e a Ethernet.
  2. Trova il suo indirizzo IP usando uno strumento come Advanced IP Scanner o l'app del produttore.
  3. Accedi alla dashboard web, ad esempio inserendo l'IP nel browser; accesso predefinito: root/root per Bitmain.

**Avvertenza:** Assicurati che vi sia una ventilazione adeguata; il mining genera calore. Inizia in piccolo per fare delle prove.

### Passaggio 3: Scegli e unisciti a una pool di mining
Le pool di mining distribuiscono il lavoro e condividono le ricompense in base all'hash rate che contribuisci. Scegli in base alle commissioni (0-2%), al minimo di pagamento (0,01-0,1 ZEC), alla posizione (ping basso) e all'affidabilità.

**Pool consigliate (in base a hash rate, commissioni e recensioni):**
- **2Miners (zec.2miners.com)**: Commissione dell'1%, pagamento PPLNS, supporta GPU/ASIC/NiceHash. Hash rate elevato (~1,17 GSol/s), server affidabili.
- **F2Pool (zec.f2pool.com)**: Commissione del 2%, pagamento PPS+, supporto multi-coin. Pool grande (~2,57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: Commissione del 2% (PPS+), dashboard intuitiva, server globali.
- **AntPool (zec.antpool.com)**: Commissione dell'1%, di Bitmain, valida per gli ASIC (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Pool professionale di mining di Zcash di Foundry Digital. Utilizza pagamenti PPLNS, offre monitoraggio trasparente delle ricompense e supporto di livello enterprise. È più adatta a miner ASIC istituzionali e su larga scala; richiede la verifica dell'account.
- **Sovright (mining.sovright.com)**: Una pool di Zcash costruita su Stratum V2, attualmente in esecuzione come testnet pubblica. Non ci sono ancora pagamenti in ZEC reali, quindi considerala un modo per testare la tua configurazione anziché una fonte di guadagno. Consulta la sezione dedicata qui sotto per i dettagli.
- Altre: Kryptex Pool, Luxor (controlla poolwatch.io/coin/zcash per statistiche in tempo reale).

1. Visita il sito web della pool e crea un account (email o nessuna registrazione per alcune pool come 2Miners).
2. Aggiungi il tuo indirizzo del portafoglio Zcash nelle impostazioni per i pagamenti.
3. Annota il server stratum della pool, ad esempio zec.2miners.com:1010, e la porta.

### Passaggio 4: Installa e configura il software di mining
- Per le GPU (esempio: lolMiner su Windows/Linux):
  1. Scarica lolMiner da GitHub (ultima versione, ad esempio 1.88).
  2. Estrailo in una cartella.
  3. Crea un file batch (start.bat) con la configurazione:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Sostituisci `YOUR_WALLET_ADDRESS` con il tuo indirizzo ZEC.
     - `WORKER_NAME`: Un nome per il tuo rig, ad esempio Rig1.
     - Per i server UE: eu.zec.2miners.com:1010.
  4. Esegui il file batch. Si collegherà alla pool e inizierà il mining.
- Per gli ASIC (esempio: Bitmain Antminer):
  1. Accedi alla dashboard web.
  2. Vai a Miner Configuration.
  3. Aggiungi i dettagli della pool:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Nome utente: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (oppure vuota).
  4. Salva e riavvia il miner.
- Per altri software, ad esempio GMiner:
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Test:** Esegui per 10-15 minuti; controlla la console per verificare share accettate e hash rate.

### Passaggio 5: Avvia il mining e monitora
1. Avvia il miner: si collegherà alla pool e inizierà a inviare share.
2. Monitora tramite:
   - Dashboard della pool: Inserisci il tuo indirizzo del portafoglio per vedere hash rate, saldo non pagato e statistiche.
   - Console del software: Controlla errori e temperatura (mantienila sotto gli 80 gradi C).
   - Strumenti: Usa HiveOS o SimpleMining OS per la gestione remota dei rig.
3. Pagamenti: La maggior parte delle pool paga automaticamente quando raggiungi il minimo, ad esempio 0,05 ZEC. Controlla le regole della pool.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Pool di testnet e rete relay

Sovright (sovright.com) gestisce una pool di mining Stratum V2 e una rete relay di blocchi separata. Svolgono compiti diversi, quindi sono trattate separatamente qui sotto.

### Pool di mining (mining.sovright.com)

La pool di Sovright viene eseguita su una testnet pubblica di Zcash (NU6, Stratum V2), non su mainnet. La testnet non paga ZEC reali. Usala per testare la configurazione del tuo miner, non per guadagnare.

- Non è richiesto un account per iniziare. Punta un miner Equihash CPU o ASIC alla pool e le tue share appariranno su una dashboard live.
- Sovright pubblica anche un proxy Stratum V2 open source per i miner che desiderano scegliere i propri template di blocco anziché limitarsi ad accettare i job della pool:

### Monitoraggio della pool Foundry Zcash

Per gli utenti della pool Foundry Zcash:

- Monitora le prestazioni del miner tramite la dashboard della pool Foundry.
- Controlla:
  - Worker attivi
  - Hash rate segnalato
  - Share accettate
  - Ricompense stimate
  - Stato dei pagamenti

Poiché Foundry utilizza un modello di ricompensa PPLNS, le ricompense di mining dipendono dalle share fornite nella finestra di ricompensa della pool anziché soltanto dall'hash rate istantaneo.

Pratiche di monitoraggio consigliate:
- Confronta l'hash rate della dashboard ASIC con l'hash rate segnalato da Foundry.
- Analizza share rifiutate, share stale o instabilità della connessione.
- Mantieni una connettività di rete stabile perché i tempi di inattività riducono le share inviate e le potenziali ricompense.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Punta il tuo miner al proxy anziché direttamente alla pool:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  usando un nome worker come `yourname.rig1`.
- La pagina sulla trasparenza di Sovright dichiara una politica "include all" per le transazioni schermate, a differenza di alcune pool che le filtrano. Ogni blocco riceve un'attestazione firmata affinché la politica possa essere verificata in modo indipendente.
- Crea un account su mining.sovright.com (accesso con Google o email) per monitorare i tuoi worker anziché i dati della dashboard di esempio.

### Rete relay (relay.sovright.com)

Sovright gestisce separatamente una rete relay di blocchi pubblica sulla mainnet di Zcash. Quando una pool trova un blocco, la velocità con cui quel blocco raggiunge il resto della rete determina quanto spesso viene orfanizzato, cioè perde la gara di propagazione e la relativa ricompensa va persa. Il relay inoltra blocchi in quattro regioni usando il relay di blocchi compatti con correzione degli errori in avanti.

La dashboard pubblica mostra l'effetto in tempo reale: le regioni connesse al relay vedono nuovi blocchi in ben meno della metà del tempo richiesto dal gossip peer-to-peer standard e la dashboard monitora il tasso di blocchi orfani della rete in tempo reale.

Questa è un'infrastruttura per operatori di pool, non per singoli miner. Il repository open source `mining-infra` di Sovright documenta un gateway relay `submitblock` per propagare più rapidamente nella mesh i blocchi trovati rispetto al P2P nativo. Per collegarti, contatta direttamente Sovright (support@sovright.com) per ottenere gli indirizzi dei peer relay e una chiave di autenticazione.


## Mining contro il tuo nodo Zebra

Tutto quanto sopra punta il tuo miner alla pool di qualcun altro. L'altra strada consiste nell'eseguire personalmente un nodo e far chiedere al tuo software di mining il lavoro. Dato che zcashd si è fermato il 18 luglio 2026, questo significa [Zebra](/zcash-tech/zebra-full-node), il nodo trattato in questa sezione.

La parte di Zebra è piccola e specifica: crea template di blocchi e accetta blocchi risolti attraverso la propria interfaccia RPC. L'hashing è svolto dal software di mining e la condivisione delle ricompense tra diversi miner è compito del software per pool. Il fatto che il mining in solitaria trovi mai un blocco dipende dalla tua quota dell'hash rate della rete, che questa sezione non prova a stimare. Ecco perché l'introduzione di questa pagina non consiglia il mining in solitaria alla maggior parte degli utenti.

I passaggi seguono due pagine del Book di Zebra, [Mining Zcash with Zebra](https://zebra.zfnd.org/user/mining.html) e [Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html), nello stato in cui si trovavano l'8 ottobre 2026. I nomi delle chiavi e i valori predefiniti cambiano tra una release e l'altra, quindi controlla il Book prima di farvi affidamento.

### Imposta l'indirizzo che riceve la ricompensa

Crea un file di configurazione con le impostazioni predefinite, quindi modificalo:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

È richiesto un indirizzo miner ([Book: Indirizzo miner](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra accetta un indirizzo P2PKH o P2SH trasparente, un indirizzo Sapling o un Unified Address. Per un Unified Address con più di un ricevitore, il Book dice che Zebra paga un singolo ricevitore, "preferendo Orchard, poi Sapling, poi trasparente".

Due chiavi opzionali vanno nella stessa sezione `[mining]`:

| Chiave | Cosa fa | Limite |
|---|---|---|
| `extra_coinbase_data` | Aggiunge un tag pubblico, come il nome di una pool, all'input coinbase di ogni blocco che mini, dopo il marcatore di Zebra ([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 byte. Oltre tale limite, "Zebra si rifiuta di avviarsi" |
| `miner_memo` | Allega un memo schermato all'output della ricompensa. A differenza di `extra_coinbase_data`, non è pubblico: può leggerlo solo chi possiede una chiave di visualizzazione per l'indirizzo ricevente ([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 byte. Funziona solo quando la ricompensa va a un ricevitore schermato. Con un indirizzo trasparente "non ha alcun effetto" senza segnalarlo |

### Apri la porta RPC

Il software di mining comunica con Zebra tramite JSON-RPC, che rimane disattivato finché non gli fornisci un indirizzo su cui restare in ascolto ([Book: Sezione RPC](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 è la porta RPC standard su Mainnet. `127.0.0.1` mantiene la porta raggiungibile solo dalla stessa macchina.

Da Zebra 2.0.0, un cookie protegge la porta RPC, un metodo simile a quello usato da zcashd. Zebra scrive il cookie quando l'endpoint RPC si avvia e lo elimina allo spegnimento. Per impostazione predefinita, il file si trova nella directory cache di Zebra, ad esempio `/home/user/.cache/zebra/.cookie` su Linux, e contiene una riga:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` sposta il file. `rpc.enable_cookie_auth = false` disattiva il controllo e, con esso, l'unica autenticazione della porta RPC: qualsiasi elemento che può raggiungere la porta può quindi chiamarla.

### Avvia Zebra e lascia che si sincronizzi

```bash
zebrad
```

Zebra legge la configurazione dalla posizione predefinita. Passa `-c /path/to/zebrad.toml` per usare un altro file. Attendi che la sincronizzazione finisca. Il log mostra `sync_percent=100.000%` quando ha terminato ([Book: Esecuzione di zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Full Node](/zcash-tech/zebra-full-node) tratta hardware e spazio su disco.

### Verificalo con getblocktemplate

`getblocktemplate` è la chiamata che il software di mining effettua per ottenere lavoro, quindi è anche il test più rapido ([Book: Test della configurazione](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Inserisci il contenuto del tuo file cookie al posto di `__cookie__:PASSWORD`:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Una configurazione funzionante restituisce un oggetto `result` con i campi necessari a un miner, tra cui `previousblockhash`, `coinbasetxn`, `target` e `height`. Se imposti `extra_coinbase_data`, il Book spiega come trovare il tuo tag in `coinbasetxn.data`.

### Punta il tuo software di mining verso di esso

Fornisci al tuo software di mining o per pool l'endpoint RPC, `127.0.0.1:8232`, e il nome utente e la password del cookie. Il Book afferma che Zebra "supporta i metodi RPC necessari per eseguire la maggior parte dei software per pool di mining" ([Book: Gestire una pool di mining](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Due note dal Book prima di scegliere il software:

- **s-nomp è solo per i test.** Il Book definisce la configurazione s-nomp "sperimentale" e afferma che s-nomp "non è compatibile con NU5, quindi alcune funzioni di mining sono disabilitate". La sua guida [Testnet](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) aggiunge che s-nomp "non è stato aggiornato ufficialmente per NU5 o aggiornamenti di rete successivi" e indirizza i miner di produzione verso software per pool che supporta gli aggiornamenti correnti.
- **Zebra fornisce uno stack pronto.** Il repository Zebra ha una configurazione Compose di Docker in [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) che avvia Zebra insieme a una pool di mining e, se lo richiedi, a un miner CPU. La pool inclusa è s-nomp e si avvia su Testnet salvo modifiche, quindi considerala un modo per imparare i componenti mobili.

### Il percorso Docker

Il percorso più breve del Book è l'immagine `zfnd/zebra` Docker, con l'indirizzo e la porta RPC passati come variabili d'ambiente ([Book: Mining con Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html)). Il comando seguente è quello del Book con una modifica: pubblica la porta RPC solo sull'indirizzo loopback dell'host, così le altre macchine non possono raggiungerla.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Questo avvia un nodo Mainnet, pubblica la porta P2P (8233) sull'host Docker e rende la porta RPC (8232) raggiungibile solo dall'host stesso. Stampa il cookie con:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Mantieni `0.0.0.0` in `ZEBRA_RPC__LISTEN_ADDR`.** È l'indirizzo su cui Zebra resta in ascolto all'interno del container. Docker inoltra una porta pubblicata all'interfaccia di rete del container stesso, quindi un Zebra in ascolto su `127.0.0.1` all'interno del container non riceverebbe la connessione, neppure dall'host. Il `127.0.0.1:` davanti a `-p` è ciò che mantiene la porta fuori dalla rete.
- **Il comando del Book** pubblica la porta RPC con `-p 8232:8232`, che la apre su ogni interfaccia di rete dell'host.
- **Per esercitarti su Testnet**, aggiungi `-e ZEBRA_NETWORK__NETWORK="Testnet"`, imposta `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, pubblica `-p 18233:18233` e `-p 127.0.0.1:18232:18232` e fornisci un indirizzo Testnet. Un indirizzo Mainnet impedisce a Zebra di avviarsi su Testnet, e viceversa.

Il pagamento dei miner e la gestione del portafoglio non rientrano in questa sezione. Per la parte relativa al portafoglio, consulta [Zallet](/zcash-tech/zallet).

## Suggerimenti e buone pratiche
- **Redditività:** Usa calcolatori come whattomine.com/coins/166-zec-equihash. Esempio: Una RTX 3060 (~300 Sol/s) guadagna circa 0,001 ZEC/giorno a $50/ZEC, meno circa $0,50 di elettricità.
- **Privacy:** Usa pool schermate, se disponibili; evita di riutilizzare gli indirizzi.
- **Sicurezza:** Usa password robuste; abilita l'autenticazione a due fattori sulle pool/sui portafogli. Non condividere mai le chiavi private.
- **Risoluzione dei problemi:** Se non ci sono share, controlla firewall, antivirus o configurazione errata. Unisciti a forum come forum.zcashcommunity.com o Reddit r/zec.
- **Alternative:** Se non è redditizio, considera il cloud mining o lo staking di altre coin.
- **Nota ambientale:** Il mining consuma energia; usa fonti rinnovabili se possibile.
- **Aggiornamenti:** Zcash potrebbe evolversi, ad esempio con un potenziale passaggio a PoS; controlla z.cash per le notizie.
