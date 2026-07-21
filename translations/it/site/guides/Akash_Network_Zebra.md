# Come eseguire Zebra su Akash Network

Guida passo passo per il deploy di un nodo completo Zebra Zcash usando la [Akash Console](https://console.akash.network).

### Cosa stai distribuendo

Un nodo Zebra completo che:

-> Sincronizzerà l'intera blockchain Zcash (oltre 100GB per la mainnet, ~40GB per la testnet)

-> Costerà all'incirca $15 al mese a seconda del prezzo del token AKT

-> Impiegherà da diverse ore a giorni per sincronizzarsi completamente

-> Userà 4 vCPU, 16GB di RAM, 350GB di storage (mainnet) oppure 2 vCPU, 8GB di RAM, 50GB (testnet)


### Importante: mappatura delle porte su Akash

Quando esponi una porta su Akash (ad esempio la porta 8233 per il P2P di Zebra), questa **NON viene associata a quella porta esatta** sull'IP pubblico del provider. Il provider assegna invece una porta alta casuale (come 31234 o 42567) e la inoltra tramite reverse proxy alla porta 8233 del tuo container.

Questo è voluto: i provider eseguono più deployment e avrebbero conflitti se tutti cercassero di usare direttamente la porta 8233.

**Cosa significa per te:**

-> Configuri la porta 8233 nell'SDL (la porta P2P standard di Zebra)

-> Akash ti fornisce un URI come *provider.com:31234*

-> Gli altri nodi Zcash si connettono a te su *provider.com:31234*

-> All'interno del tuo container, Zebra continua ad ascoltare sulla 8233


Questo viene gestito automaticamente. Usa semplicemente l'URI che Akash ti fornisce.

### Prerequisiti

1. Estensione del browser **Keplr Wallet** installata (Chrome/Brave/Firefox)
2. **Token AKT** - Procurati 50-100 AKT da un exchange (Coinbase, Kraken, Osmosis)
3. **5 minuti** per cliccare attraverso l'interfaccia della Console

#### Passo 1: connetti il tuo wallet

-> Vai su [https://console.akash.network](https://console.akash.network)

-> Clicca su **"Connect Wallet"** in alto a destra

-> Scegli **Keplr** (o il tuo wallet Cosmos preferito)

-> Approva la connessione quando compare Keplr


Il tuo saldo AKT dovrebbe apparire in alto a destra. Se è zero, finanzia prima il tuo wallet.

#### Passo 2: crea il deployment

-> Clicca sul pulsante **"Deploy"** (il grande pulsante blu, al centro della pagina)

-> Scegli **"Build your template"** (oppure passa direttamente al caricamento dell'SDL)


##### Opzione A: carica il file SDL (consigliato)

[![Deploy on Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Opzione B: usa l'editor SDL

Se vuoi incollare manualmente [l'SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Copia il contenuto di *zebra-akash.yml*

-> Incollalo nell'editor SDL

-> Modificalo secondo necessità (vedi la sezione configurazione più sotto)

-> Clicca su **"Create Deployment"**


#### Passo 3: esamina e approva il deposito

La Console ti mostrerà:

-> **Deposito del deployment**: ~5 AKT (lo riavrai indietro quando chiuderai il deployment)

-> **Costo stimato**: basato sul prezzo del tuo SDL

Clicca su **"Approve"** e firma la transazione in Keplr.

#### Passo 4: scegli un provider

Dopo circa 30 secondi vedrai le offerte dei provider. Ogni offerta mostra:

-> **Prezzo per blocco** (in AKT o USDC)

-> **Costo mensile stimato**

-> **Dettagli del provider** (uptime, regione, ecc.)


**Non scegliere solo il più economico.** Controlla:

-> Percentuale di uptime (punta a > 95%)

-> Regione (più vicina a te = latenza migliore, ma per i nodi blockchain conta poco)

-> Stato di audit (segno di spunta verde = più affidabile)


Clicca su **"Accept Bid"** sul provider scelto e firma in Keplr.

#### Passo 5: attendi il deployment

La Console:

-> Creerà il lease con il provider scelto

-> Invierà il manifest (indica al provider cosa eseguire)

-> Avvierà il tuo container

Questo richiede 1-2 minuti. Vedrai gli aggiornamenti di stato nell'interfaccia.

#### Passo 6: verifica che sia in esecuzione

Una volta distribuito, vedrai:

-> Scheda **Services**: mostra il tuo servizio *zebra* con il relativo stato

-> Scheda **Logs**: log del container in tempo reale

-> Scheda **Leases**: dettagli sul tuo deployment (DSEQ, provider, costo)


##### Controlla i log

Clicca su **Logs** e dovresti vedere Zebra che si avvia:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

La sincronizzazione richiederà **da ore a giorni** a seconda della rete. Tieni d'occhio:

-> Altezze di blocco in aumento

-> Connessioni ai peer (dovrebbero essere 10-30 peer)

-> Assenza di errori ripetuti


#### Passo 7: ottieni l'indirizzo del tuo nodo

Clicca sulla scheda **Leases**, poi su **URIs**.

Vedrai qualcosa come:

```bash
zebra-8233: provider-hostname.com:31234
```

Questo è l'**endpoint P2P pubblico** del tuo nodo. Gli altri nodi Zcash si connetteranno a te a questo indirizzo.

**Nota la mappatura delle porte:** hai configurato la porta 8233 nell'SDL, ma Akash l'ha assegnata a una porta pubblica diversa (31234 in questo esempio). È normale - vedi la sezione "Mappatura delle porte su Akash" all'inizio se questo ti confonde. Il tuo nodo è accessibile sulla porta che Akash mostra qui, non necessariamente la 8233.

Se hai abilitato l'RPC (commentato per impostazione predefinita nell'SDL), vedrai qui anche l'endpoint RPC con la sua porta mappata.

### Opzioni di configurazione

#### Passare alla testnet

L'SDL usa la Mainnet per impostazione predefinita. Per usare invece la Testnet:

-> **Commenta la configurazione Mainnet** nella sezione *env*:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Decommenta la configurazione Testnet**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> **Aggiorna la porta esposta** nella sezione *expose*:

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **Opzionale: riduci le risorse** per la Testnet in *profiles.compute.zebra.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Opzionale: abbassa il prezzo** in *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### Abilitare l'accesso RPC

L'RPC è disabilitato per impostazione predefinita per motivi di sicurezza. Per abilitarlo:

**Per la Mainnet:**

-> Decommenta nella sezione *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Decommenta la porta RPC della Mainnet in *expose*:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Per la Testnet:**

-> Decommenta nella sezione *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Decommenta la porta RPC della Testnet in *expose*:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Attenzione**: se imposti *global: true* per l'RPC, lo stai esponendo a internet. Zebra usa l'autenticazione tramite cookie per impostazione predefinita, ma comunque - non farlo a meno che tu non sappia cosa stai facendo.

**Promemoria sulla mappatura delle porte**: anche se esponi l'RPC globalmente, Akash lo mapperà su una porta alta casuale (non 8232/18232). Controlla gli URI nel tuo deployment per vedere l'endpoint pubblico effettivo. Con *global: false* (consigliato), l'endpoint RPC è accessibile solo all'interno della rete del deployment Akash, non da internet.

#### Abilitare le metriche (Prometheus)

Per raccogliere le metriche per il monitoraggio:

-> Decommenta in *env*:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Decommenta la porta delle metriche in *expose*:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Regolare risorse/prezzi

Se non stai ricevendo offerte o vuoi ottimizzare i costi:

**Per provider con specifiche più basse**, riduci nella sezione *profiles.compute.zebra.resources*:

-> CPU: *units: 2* (minimo per una velocità di sincronizzazione ragionevole)

-> Memoria: *size: 12Gi* (minimo per la stabilità)

-> Storage: *size: 120Gi* (minimo per la mainnet)

**Per attrarre più offerte**, aumenta in *profiles.placement.akash.pricing*:

-> Mainnet: prova *amount: 1000000* uakt/blocco

-> Testnet: prova *amount: 1000000* uakt/blocco

### Aggiornare il tuo deployment

Devi modificare la configurazione dopo il deploy?

-> Vai su **My Deployments** nella Console

-> Trova il tuo deployment Zebra

-> Clicca su **"Update Deployment"**

-> Modifica l'SDL

-> Clicca su **"Update"** e approva in Keplr

**Nota**: l'aggiornamento riavvierà il tuo container. Il nodo riprenderà dal suo stato salvato (storage persistente), ma aspettati 1-2 minuti di downtime.

### Monitoraggio

#### Tramite la Console

-> **Scheda Logs**: log del container in tempo reale

-> **Scheda Shell**: ottieni una shell all'interno del container (utile per il debug)

-> **Scheda Events**: eventi Kubernetes (per lo più inutili a meno che qualcosa non sia rotto)


#### Tramite RPC (se abilitato)

Se hai abilitato l'RPC, puoi interrogare il tuo nodo come un normale nodo completo zebrad (perché lo è!)

### Chiudere il tuo deployment

Quando hai finito o vuoi smettere di pagare:

-> Vai su **My Deployments**

-> Trova il tuo deployment Zebra

-> Clicca su **"Close Deployment"**

-> Conferma e firma in Keplr

Il tuo deposito di 5 AKT verrà rimborsato. Lo **storage persistente** dovrebbe essere preservato dal provider, ma non farci affidamento - trattalo come qualsiasi altro provider cloud.

### Risoluzione dei problemi

#### Errore "Insufficient funds"

Ti servono più AKT. Finanzia il tuo wallet Keplr.

#### Nessuna offerta visualizzata

Possibili cause:

-> Il tuo prezzo è troppo basso (aumenta *amount* nell'SDL)

-> I tuoi requisiti di risorse sono troppo elevati per i provider disponibili (riduci CPU/memoria/storage)

-> Aspetta di più (a volte servono 60-90 secondi perché compaiano le offerte)


#### Deployment bloccato in "pending"

Il provider potrebbe avere dei problemi. Chiudi il deployment e prova un provider diverso.

#### I log di Zebra mostrano "No peers connected"

È normale per i primi minuti. Zebra scoprirà i peer automaticamente. Se persiste dopo più di 10 minuti, potresti avere un problema di rete (improbabile su Akash).

#### Errori "Out of memory" nei log

Hai risparmiato troppo sulla RAM. Chiudi il deployment e riesegui il deploy con almeno 12Gi di memoria (16Gi consigliati).

#### La sincronizzazione richiede un'eternità

Definisci "un'eternità":

-> **Ore**: normale

-> **Giorni**: normale anche per la mainnet da zero

-> **Settimane**: qualcosa non va, controlla i log per gli errori


### Gestione dei costi

Monitora la tua spesa nella Console:

-> **My Deployments** -> Il tuo deployment -> Mostra la stima "Cost per month"

-> Il saldo del tuo wallet Keplr diminuirà nel tempo


Quando il tuo saldo si esaurisce, Akash chiuderà automaticamente il tuo deployment. **Ricarica periodicamente il tuo wallet** o imposta degli avvisi.

#### Ridurre i costi

-> **Usa la Testnet** per i test non in produzione (50% più economica)

-> **Riduci CPU/memoria** se non ti serve una sincronizzazione veloce

-> **Scegli provider più economici** (non sempre saggio - l'uptime conta)


### Mainnet vs Testnet

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

Inizia con la Testnet se stai solo testando il processo di deployment. Vedi la sezione "Passare alla testnet" più sopra per la configurazione.

### Risorse aggiuntive

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Documentazione Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Documentazione Zebra**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Explorer Zcash**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Discord Akash**: [https://discord.akash.network](https://discord.akash.network) (per problemi con i provider)
