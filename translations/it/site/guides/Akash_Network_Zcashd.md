# Distribuire zcashd su Akash tramite Console

Guida per distribuire un nodo completo Zcash zcashd (implementazione di Electric Coin Co) usando [Akash Console](https://console.akash.network). Di seguito trovi un video tutorial. Più in basso è disponibile una guida più approfondita.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Cosa stai distribuendo

Un nodo completo zcashd che farà quanto segue:

-> Sincronizzare l'intera blockchain Zcash (350GB+ per la mainnet, ~ 40GB per la testnet)

-> Costare all'incirca 15 $/mese a seconda dei prezzi del token AKT

-> Richiedere da diverse ore a diversi giorni per sincronizzarsi completamente

-> Usare 4 vCPU, 16GB di RAM, 350GB di storage (mainnet) oppure 2 vCPU, 8GB di RAM, 50GB (testnet)

-> Scaricare i parametri crittografici alla prima esecuzione (~ 2GB, una sola volta)

**zcashd vs Zebra:**

-> zcashd è l'implementazione originale del nodo Zcash realizzata da Electric Coin Co

-> Zebra è l'implementazione alternativa della Zcash Foundation

-> Entrambe sono compatibili con la rete Zcash

-> zcashd ha più funzionalità (mining, wallet, API Insight Explorer)

-> Usa zcashd se hai bisogno di funzionalità wallet o di specifiche API RPC


### **Importante: mappatura delle porte su Akash**

Quando esponi una porta su Akash (ad esempio la porta 8233 per il P2P di zcashd), questa **NON viene associata a quella porta esatta** sull'IP pubblico del provider. Il provider assegna invece una porta alta casuale (come 31234 o 42567) e la inoltra tramite reverse proxy alla porta 8233 del tuo container.

Questo è voluto: i provider eseguono più distribuzioni e avrebbero conflitti se tutti cercassero di usare direttamente la porta 8233.

**Cosa significa per te:**

-> Configuri la porta 8233 nel SDL (la porta P2P standard di zcashd)

-> Akash ti fornisce un URI come *provider.com:31234*

-> Gli altri nodi Zcash si connettono a te su *provider.com:31234*

-> All'interno del tuo container, zcashd resta in ascolto sulla porta 8233


Tutto questo viene gestito automaticamente. Usa semplicemente l'URI che Akash ti fornisce.

## Prerequisiti

-> Estensione del browser **Keplr Wallet** installata (Chrome/Brave/Firefox)

-> **Token AKT** - Procurati 50-100 AKT da un exchange (Coinbase, Kraken, Osmosis)

-> **5 minuti** per cliccare attraverso l'interfaccia della Console


## Passo 1: connetti il tuo wallet

-> Vai su [https://console.akash.network](https://console.akash.network)

-> Clicca su **"Connect Wallet"** in alto a destra

-> Scegli **Keplr** (o il tuo wallet Cosmos preferito)

-> Approva la connessione quando compare Keplr


Il tuo saldo AKT dovrebbe comparire in alto a destra. Se è zero, vai prima a finanziare il tuo wallet.

## Passo 2: crea la distribuzione

-> Clicca sul pulsante **"Deploy"** (il grande pulsante blu al centro della pagina)

-> Scegli **"Build your template"** (oppure passa direttamente al caricamento del SDL)

### Opzione A: carica il file SDL (consigliata)

[![Deploy on Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Opzione B: usa l'editor SDL

Se vuoi incollare manualmente il SDL:

-> Copia il contenuto di *zcashd-akash.yml*

-> Incollalo nell'editor SDL

-> Modificalo secondo necessità (vedi la sezione di configurazione più in basso)

-> Clicca su **"Create Deployment"**


## Passo 3: rivedi e approva il deposito

La Console ti mostrerà:

-> **Deposito di distribuzione**: ~ 5 AKT (lo riavrai quando chiudi la distribuzione)

-> **Costo stimato**: in base ai prezzi del tuo SDL


Clicca su **"Approve"** e firma la transazione in Keplr.

## Passo 4: scegli un provider

Dopo ~ 30 secondi vedrai le offerte dei provider. Ogni offerta mostra:

-> **Prezzo per blocco** (in AKT o USDC)

-> **Costo mensile stimato**

-> **Dettagli del provider** (uptime, regione, ecc.)


**Non scegliere solo il più economico.** Controlla:

-> Percentuale di uptime (punta a > 95%)

-> Regione (più vicino a te = latenza migliore, ma per i nodi blockchain conta poco)

-> Stato di verifica (segno di spunta verde = più affidabile)


Clicca su **"Accept Bid"** sul provider scelto e firma in Keplr.

## Passo 5: attendi la distribuzione

La Console farà quanto segue:

-> Creare il lease con il provider scelto

-> Inviare il manifest (che indica al provider cosa eseguire)

-> Avviare il tuo container


Questo richiede 1-2 minuti. Vedrai gli aggiornamenti di stato nell'interfaccia.

## Passo 6: verifica che sia in esecuzione

Una volta distribuito, vedrai:

-> Scheda **Services**: mostra il tuo servizio *zcashd* con lo stato

-> Scheda **Logs**: log in tempo reale dal tuo nodo zcashd

-> Scheda **Leases**: dettagli sulla tua distribuzione (DSEQ, provider, costo)


### Controlla i log

Clicca su **Logs** e dovresti vedere zcashd in fase di avvio:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**La prima esecuzione scaricherà zcash-params (~2GB).** È un'operazione che si effettua una sola volta e richiede 5-10 minuti a seconda della banda del provider. I riavvii successivi la salteranno.

La sincronizzazione richiederà **da ore a giorni** a seconda della rete. Tieni d'occhio:

-> L'aumento delle altezze dei blocchi

-> Le connessioni con i peer (dovrebbero essere 10-30 peer)

-> L'assenza di errori ripetuti


## Passo 7: ottieni l'indirizzo del tuo nodo

Clicca sulla scheda **Leases**, poi su **URIs**.

Vedrai qualcosa come:

```
zcashd-8233: provider-hostname.com:31234
```

Questo è l'**endpoint P2P pubblico** del tuo nodo. Gli altri nodi Zcash si connetteranno a te a questo indirizzo.

**Nota la mappatura delle porte:** hai configurato la porta 8233 nel SDL, ma Akash l'ha assegnata a una porta pubblica diversa (31234 in questo esempio). È normale - vedi la sezione "Mappatura delle porte su Akash" in cima se questo ti confonde. Il tuo nodo è accessibile a qualsiasi porta Akash mostri qui, non necessariamente la 8233.

Se hai abilitato RPC (commentato per impostazione predefinita nel SDL), vedrai qui anche l'endpoint RPC con la sua porta mappata.

## Opzioni di configurazione

### Passare alla testnet

Il SDL usa per impostazione predefinita la mainnet. Per usare invece la testnet:

-> **Cambia la rete nella sezione *env*:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
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

-> **Opzionale: riduci le risorse** per la testnet in *profiles.compute.zcashd.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Opzionale: abbassa i prezzi** in *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> nota: abbassare i prezzi potrebbe escludere dei provider dal fare offerte. sperimenta con questo valore, oppure usa l'endpoint del provider per verificare se farebbe un'offerta. (consulta la documentazione delle API del provider)

### Abilitare l'accesso RPC

RPC è disabilitato per impostazione predefinita per motivi di sicurezza. Per abilitarlo:

**CRITICO: imposta credenziali robuste.** L'RPC di zcashd trasmette nome utente/password su HTTP (non HTTPS). Esponi RPC solo se comprendi le implicazioni di sicurezza.

-> Decommenta nella sezione *env*:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Decommenta la porta RPC in *expose*:

   **Per la mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Per la testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Attenzione**: se imposti *global: true* per RPC, lo stai esponendo a internet con autenticazione di base. È una pessima idea. Usa *global: false* e accedi a RPC attraverso la rete interna di Akash oppure imposta un tunnel sicuro.

**Promemoria sulla mappatura delle porte**: anche se esponi RPC globalmente, Akash lo mapperà su una porta alta casuale (non 8232/18232). Controlla gli URI nella tua distribuzione per vedere l'endpoint pubblico effettivo. Per *global: false* (consigliato), l'endpoint RPC è accessibile solo all'interno della rete della distribuzione Akash, non da internet pubblico.

### Abilitare l'indice delle transazioni

L'indice delle transazioni ti permette di interrogare qualsiasi transazione tramite il suo ID via RPC. Usa più storage (~ 20% in più).

Decommenta in *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Attenzione**: abilitare txindex su un nodo già sincronizzato richiede di reindicizzare l'intera blockchain, operazione che richiede ore.

### Abilitare Insight Explorer

Insight Explorer fornisce endpoint API REST aggiuntivi per i dati della blockchain (utili per i block explorer).

Decommenta in *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Questo abilita automaticamente txindex e aggiunge metodi RPC supplementari.

### Abilitare le metriche Prometheus

Per raccogliere le metriche per il monitoraggio:

-> Decommenta in *env*:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Decommenta la porta delle metriche in *expose*:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Le metriche saranno disponibili su http://yourendpoint:9969/metrics in formato Prometheus.

### Regolare risorse/prezzi

Se non ricevi offerte o vuoi ottimizzare i costi:

**Per provider con specifiche più basse**, riduci nella sezione *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (minimo per una velocità di sincronizzazione ragionevole)

-> Memoria: *size: 12Gi* (minimo per la stabilità)

-> Storage: *size: 120Gi* (minimo per la mainnet)


**Per attirare più offerte**, aumenta in *profiles.placement.akash.pricing*:

-> Mainnet: prova *amount: 15000* uakt/block

-> Testnet: prova *amount: 7500* uakt/block


I valori del SDL sono impostati prudenzialmente alti. La maggior parte dei provider farà offerte più basse.

## Aggiornare la tua distribuzione

Devi cambiare la configurazione dopo la distribuzione?

-> Vai su **My Deployments** nella Console

-> Trova la tua distribuzione zcashd

-> Clicca su **"Update Deployment"**

-> Modifica il SDL

-> Clicca su **"Update"** e approva in Keplr


**Nota**: l'aggiornamento riavvierà il tuo container. Il nodo riprenderà dal suo stato salvato (storage persistente), ma aspettati 1-2 minuti di inattività.

## Monitoraggio

### Tramite la Console

-> **Scheda Logs**: log del container in tempo reale

-> **Scheda Shell**: ottieni una shell all'interno del container (utile per il debug)

-> **Scheda Events**: eventi Kubernetes (per lo più inutili a meno che qualcosa non si sia rotto)


### Tramite RPC (se abilitato)

Se hai abilitato RPC, puoi interrogare il tuo nodo come un normale nodo completo zcashd (perché lo è!)

### Alternativa con zcash-cli

Se hai accesso shell tramite la Console, puoi usare *zcash-cli* direttamente:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Chiudere la tua distribuzione

Quando hai finito o vuoi smettere di pagare:

-> Vai su **My Deployments**

-> Trova la tua distribuzione zcashd

-> Clicca su **"Close Deployment"**

-> Conferma e firma in Keplr


Il tuo deposito di 5 AKT verrà rimborsato. Lo **storage persistente** dovrebbe essere preservato dal provider, ma non farci affidamento - trattalo come qualsiasi altro provider cloud.

## Risoluzione dei problemi

### Errore "Insufficient funds"

Ti servono più AKT. Finanzia il tuo wallet Keplr.

### Nessuna offerta visualizzata

Una di queste:

-> Il tuo prezzo è troppo basso (aumenta *amount* nel SDL)

-> I tuoi requisiti di risorse sono troppo alti per i provider disponibili (riduci CPU/memoria/storage)

-> Attendi più a lungo (a volte servono 60-90 secondi perché compaiano le offerte)


### Distribuzione bloccata su "pending"

Il provider potrebbe avere dei problemi. Chiudi la distribuzione e prova un provider diverso.

### I log di zcashd mostrano "No peers connected"

È normale nei primi minuti. zcashd scoprirà i peer automaticamente. Se persiste dopo più di 10 minuti, potresti avere un problema di rete (improbabile su Akash).

### Errori "Out of memory" nei log

Hai risparmiato troppo sulla RAM. Chiudi la distribuzione e ridistribuisci con almeno 12Gi di memoria (16Gi consigliati).

### La sincronizzazione non finisce mai

Definisci "mai":

-> **Ore**: normale

-> **Giorni**: anch'esso normale per la mainnet da zero

-> **Settimane**: qualcosa non va, controlla i log per gli errori


### "Error fetching zcash-params"

Il provider potrebbe avere problemi di rete o banda lenta. Di solito si risolve da solo. Se persiste per più di 30 minuti, prova a ridistribuire su un provider diverso.

### Errori di autenticazione RPC

-> Controlla che *ZCASHD_RPCUSER* e *ZCASHD_RPCPASSWORD* siano impostati correttamente

-> Verifica di usare la porta corretta (8232 per la mainnet, 18232 per la testnet)

-> Ricorda che le porte sono mappate da Akash - usa l'URI della tua distribuzione, non direttamente la 8232


## Gestione dei costi

Monitora la tua spesa nella Console:

-> **My Deployments** -> La tua distribuzione -> Mostra la stima "Cost per month"

-> Il saldo del tuo wallet Keplr diminuirà nel tempo


Quando il tuo saldo si abbassa, Akash chiuderà automaticamente la tua distribuzione. **Ricarica periodicamente il tuo wallet** o imposta degli avvisi.

### Ridurre i costi

-> **Usa la testnet** per i test non di produzione (50% più economica)

-> **Abbassa CPU/memoria** se non ti serve una sincronizzazione veloce

-> **Scegli provider più economici** (non sempre saggio - l'uptime conta)

-> **Usa USDC invece di AKT** se il prezzo di AKT è volatile (richiede una modifica dei prezzi nel SDL)

-> **Disabilita txindex** se non ti serve (risparmia ~ 20% di storage)


### Risorse aggiuntive

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash Explorers**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (per problemi con i provider)

## Note finali

- **Lo storage persistente conta.** Non saltare *persistent: true* né usare la classe *beta2*. Usa *beta3*.
- **La sincronizzazione iniziale è lenta.** Sii paziente. È normale per i nodi blockchain.
- **Tieni finanziato il tuo wallet.** Le distribuzioni si chiudono automaticamente quando finisci gli AKT.
- **I backup non sono automatici.** Se tieni ai dati, parti dal presupposto che possano sparire e pianifica di conseguenza.
- **La sicurezza RPC è cruciale.** Non esporre RPC a internet senza adeguate misure di sicurezza.
- **I zcash-params sono in cache.** La prima esecuzione scarica ~2GB di parametri crittografici. È normale e accade una sola volta.
