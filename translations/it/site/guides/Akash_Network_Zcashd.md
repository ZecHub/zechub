# Distribuzione di zcashd su Akash tramite Console

> **Deprecato. Non seguire questa guida per distribuire un nodo che intendi usare.**
>
> zcashd ha raggiunto il suo arresto automatico di Fine Supporto il 18 luglio 2026. Un nodo zcashd distribuito oggi non si sincronizzerà con la punta della chain, quindi la distribuzione costa ogni mese e non produce nulla.
>
> Distribuisci invece **Zebra**: [Come eseguire Zebra su Akash Network](/guides/akash-network-zebra), che copre lo stesso flusso di lavoro di Akash Console e richiede circa un terzo dello spazio su disco. Se stai spostando una configurazione esistente, vedi la [guida alla migrazione da zcashd a Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Questa pagina è mantenuta come documento storico della distribuzione di zcashd.

Guida per distribuire un nodo completo zcashd di Zcash (implementazione di Electric Coin Co) usando [Akash Console](https://console.akash.network). Di seguito trovi un video tutorial. Una guida più approfondita è disponibile sotto.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Configurazione di un nodo completo Zcash su Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Cosa Stai Distribuendo

Un nodo completo zcashd che:

-> Sincronizzerà l'intera blockchain di Zcash (350GB+ per mainnet, ~ 40GB per testnet)

-> Costerà circa 15$/mese a seconda dei prezzi del token AKT

-> Impiegherà da diverse ore a giorni per sincronizzarsi completamente

-> Userà 4 vCPU, 16GB RAM, 350GB di storage (mainnet) oppure 2 vCPU, 8GB RAM, 50GB (testnet)

-> Scaricherà i parametri crittografici al primo avvio (~ 2GB, una sola volta)

**zcashd vs Zebra:**

-> zcashd era l'implementazione originale del nodo Zcash di Electric Coin Co, ferma dal 18 luglio 2026

-> Zebra, della Zcash Foundation, è il nodo completo in uso oggi

-> Solo Zebra segue la chain attuale; un nodo zcashd non può raggiungere la punta

-> Il wallet di zcashd è stato sostituito da [Zallet](/using-zcash/zallet-quick-reference-guide)

-> Usa zcashd se hai bisogno della funzionalità wallet o di specifiche API RPC


### **Importante: Mappatura delle Porte su Akash**

Quando esponi una porta su Akash (ad esempio, la porta 8233 per il P2P di zcashd), **NON viene associata a quella porta esatta** sull'IP pubblico del provider. Invece, il provider assegna una porta alta casuale (come 31234 o 42567) e la inoltra tramite reverse proxy alla porta 8233 del tuo container.

Questo è voluto: i provider eseguono più distribuzioni e ci sarebbero conflitti se tutti cercassero di usare direttamente la porta 8233.

**Cosa significa per te:**

-> Configuri la porta 8233 nell'SDL (la porta P2P standard di zcashd)

-> Akash ti fornisce un URI come *provider.com:31234*

-> Gli altri nodi Zcash si connettono a te su *provider.com:31234*

-> All'interno del tuo container, zcashd continua ad ascoltare sulla 8233


Questo viene gestito automaticamente. Usa semplicemente l'URI che Akash ti fornisce.

## Prerequisiti

-> Estensione browser **Keplr Wallet** installata (Chrome/Brave/Firefox)

-> **Token AKT** - Ottieni 50-100 AKT da un exchange (Coinbase, Kraken, Osmosis)

-> **5 minuti** per cliccare nell'interfaccia della Console


## Passo 1: Collega il Tuo Wallet

-> Vai su [https://console.akash.network](https://console.akash.network)

-> Clicca **"Connect Wallet"** in alto a destra

-> Scegli **Keplr** (o il tuo wallet Cosmos preferito)

-> Approva la connessione quando compare Keplr


Il tuo saldo AKT dovrebbe apparire in alto a destra. Se è zero, finanzia prima il tuo wallet.

## Passo 2: Crea la Distribuzione

-> Clicca il pulsante **"Deploy"** (grande pulsante blu, al centro della pagina)

-> Scegli **"Build your template"** (oppure vai direttamente al caricamento dell'SDL)

### Opzione A: Carica il File SDL (Consigliato)

> **Questo pulsante distribuisce un nodo fermo.** Addebita il costo sul tuo saldo AKT per un nodo che non può sincronizzarsi. Usa invece la [guida di Zebra](/guides/akash-network-zebra).

[![Distribuisci su Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Opzione B: Usa l'Editor SDL

Se vuoi incollare manualmente l'SDL:

-> Copia il contenuto di *zcashd-akash.yml*

-> Incollalo nell'editor SDL

-> Modificalo secondo necessità (vedi la sezione configurazione sotto)

-> Clicca **"Create Deployment"**


## Passo 3: Controlla e Approva il Deposito

La Console ti mostrerà:

-> **Deposito di distribuzione**: ~ 5 AKT (ti verrà restituito quando chiudi la distribuzione)

-> **Costo stimato**: Basato sui prezzi del tuo SDL


Clicca **"Approve"** e firma la transazione in Keplr.

## Passo 4: Scegli un Provider

Dopo ~ 30 secondi, vedrai le offerte dei provider. Ogni offerta mostra:

-> **Prezzo per blocco** (in AKT o USDC)

-> **Costo mensile stimato**

-> **Dettagli del provider** (uptime, regione, ecc.)


**Non scegliere solo il più economico.** Controlla:

-> % di uptime (punta a > 95%)

-> Regione (più vicina a te = latenza migliore, ma per i nodi blockchain non conta molto)

-> Stato verificato (spunta verde = più affidabile)


Clicca **"Accept Bid"** sul provider scelto e firma in Keplr.

## Passo 5: Attendi la Distribuzione

La Console:

-> Creerà il lease con il provider scelto

-> Invierà il manifest (dice al provider cosa eseguire)

-> Avvierà il tuo container


Questo richiede 1-2 minuti. Vedrai aggiornamenti di stato nell'interfaccia.

## Passo 6: Verifica che Sia in Esecuzione

Una volta distribuito, vedrai:

-> Scheda **Services**: mostra il tuo servizio *zcashd* con lo stato

-> Scheda **Logs**: log in tempo reale del tuo nodo zcashd

-> Scheda **Leases**: dettagli sulla tua distribuzione (DSEQ, provider, costo)


### Controlla i Log

Clicca su **Logs** e dovresti vedere zcashd che si avvia:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Al primo avvio verranno scaricati gli zcash-params (~2GB).** Questa è un'operazione una tantum e richiede 5-10 minuti a seconda della banda del provider. I riavvii successivi salteranno questo passaggio.

La sincronizzazione richiederà **da ore a giorni** a seconda della rete. Controlla:

-> Altezze dei blocchi in aumento

-> Connessioni peer (dovrebbero essere 10-30 peer)

-> Nessun errore ripetuto


## Passo 7: Ottieni l'Indirizzo del Tuo Nodo

Clicca sulla scheda **Leases**, poi su **URIs**.

Vedrai qualcosa del genere:

```
zcashd-8233: provider-hostname.com:31234
```

Questo è il tuo **endpoint P2P pubblico** del nodo. Gli altri nodi Zcash si connetteranno a te a questo indirizzo.

**Nota la mappatura delle porte:** hai configurato la porta 8233 nell'SDL, ma Akash l'ha assegnata a una porta pubblica diversa (31234 in questo esempio). È normale: vedi la sezione "Mappatura delle Porte su Akash" in alto se questo ti crea confusione. Il tuo nodo è accessibile sulla porta mostrata qui da Akash, non necessariamente sulla 8233.

Se hai abilitato RPC (commentato di default nell'SDL), vedrai anche l'endpoint RPC qui con la sua porta mappata.

## Opzioni di Configurazione

### Passare a Testnet

L'SDL usa Mainnet come predefinito. Per usare Testnet:

-> **Cambia rete nella sezione *env*:**

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

-> **Opzionale: Riduci le risorse** per Testnet in *profiles.compute.zcashd.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Opzionale: Riduci il prezzo** in *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> nota che abbassare i prezzi può impedire ai nostri provider di fare offerte. sperimenta con questo valore, oppure usa l'endpoint del provider per verificare se farebbero un'offerta. (consulta la documentazione dell'API del provider)

### Abilitare l'Accesso RPC

RPC è disabilitato di default per sicurezza. Per abilitarlo:

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

   **Per Mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Per Testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Avvertenza**: se imposti *global: true* per RPC, lo stai esponendo a internet con autenticazione di base. È una cattiva idea. Usa *global: false* e accedi a RPC tramite la rete interna di Akash oppure imposta un tunnel sicuro.

**Promemoria sulla mappatura delle porte**: anche se esponi RPC globalmente, Akash lo mapperà a una porta alta casuale (non 8232/18232). Controlla gli URI nella tua distribuzione per vedere l'endpoint pubblico effettivo. Con *global: false* (consigliato), l'endpoint RPC è accessibile solo all'interno della rete di distribuzione Akash, non da internet pubblica.

### Abilitare l'Indice delle Transazioni

L'indice delle transazioni ti consente di interrogare qualsiasi transazione tramite il suo ID via RPC. Usa più storage (~ 20% in più).

Decommenta in *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Avvertenza**: abilitare txindex su un nodo già sincronizzato richiede la reindicizzazione dell'intera blockchain, che richiede ore.

### Abilitare Insight Explorer

Insight Explorer fornisce endpoint REST API aggiuntivi per i dati della blockchain (utili per i block explorer).

Decommenta in *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Questo abilita automaticamente txindex e aggiunge metodi RPC extra.

### Abilitare le Metriche Prometheus

Per raccogliere metriche per il monitoraggio:

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

### Regolare Risorse/Prezzi

Se non stai ricevendo offerte o vuoi ottimizzare i costi:

**Per provider con specifiche inferiori**, riduci nella sezione *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (minimo per una velocità di sincronizzazione ragionevole)

-> Memoria: *size: 12Gi* (minimo per la stabilità)

-> Storage: *size: 120Gi* (minimo per mainnet)


**Per attirare più offerte**, aumenta in *profiles.placement.akash.pricing*:

-> Mainnet: prova *amount: 15000* uakt/blocco

-> Testnet: prova *amount: 7500* uakt/blocco


I valori dell'SDL sono impostati in modo prudentemente alto. La maggior parte dei provider offrirà prezzi inferiori.

## Aggiornare la Tua Distribuzione

Devi cambiare la configurazione dopo la distribuzione?

-> Vai su **My Deployments** nella Console

-> Trova la tua distribuzione zcashd

-> Clicca **"Update Deployment"**

-> Modifica l'SDL

-> Clicca **"Update"** e approva in Keplr


**Nota**: l'aggiornamento riavvierà il tuo container. Il nodo riprenderà dal suo stato salvato (storage persistente), ma aspettati 1-2 minuti di inattività.

## Monitoraggio

### Tramite Console

-> **Scheda Logs**: log del container in tempo reale

-> **Scheda Shell**: ottieni una shell all'interno del container (utile per il debug)

-> **Scheda Events**: eventi Kubernetes (per lo più inutili a meno che qualcosa non sia rotto)


### Tramite RPC (se abilitato)

Se hai abilitato RPC, puoi interrogare il tuo nodo come un normale nodo completo zcashd (perché lo è!)

### Alternativa zcash-cli

Se hai accesso alla shell tramite Console, puoi usare *zcash-cli* direttamente:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Chiudere la Tua Distribuzione

Quando hai finito o vuoi smettere di pagare:

-> Vai su **My Deployments**

-> Trova la tua distribuzione zcashd

-> Clicca **"Close Deployment"**

-> Conferma e firma in Keplr


Il tuo deposito di 5 AKT verrà rimborsato. Lo **storage persistente** dovrebbe essere conservato dal provider, ma non farci affidamento: trattalo come qualsiasi altro cloud provider.

## Risoluzione dei Problemi

### Errore "Insufficient funds"

Hai bisogno di più AKT. Finanzia il tuo wallet Keplr.

### Non compaiono offerte

O:

-> Il tuo prezzo è troppo basso (aumenta *amount* nell'SDL)

-> I tuoi requisiti di risorse sono troppo alti per i provider disponibili (riduci CPU/memoria/storage)

-> Aspetta più a lungo (a volte servono 60-90 secondi perché compaiano le offerte)


### Distribuzione bloccata su "pending"

Il provider potrebbe avere problemi. Chiudi la distribuzione e prova un provider diverso.

### I log di zcashd mostrano "No peers connected"

Dal blocco di Fine Supporto del 18 luglio 2026, questo è lo stato permanente previsto e non un ritardo di avvio, e nessuna attesa o nuova distribuzione risolverà il problema. Distribuisci invece [Zebra](/guides/akash-network-zebra).

### Errori "Out of memory" nei log

Hai risparmiato troppo sulla RAM. Chiudi la distribuzione e ridistribuisci con almeno 12Gi di memoria (16Gi consigliati).

### La sincronizzazione richiede un'eternità

Definisci "eternità":

-> **Ore**: Normale

-> **Giorni**: Normale anche per mainnet da zero

-> **Settimane**: C'è qualcosa che non va, controlla i log per eventuali errori


### "Error fetching zcash-params"

Il provider potrebbe avere problemi di rete o banda lenta. Di solito si risolve da solo. Se persiste per più di 30 minuti, prova a ridistribuire su un provider diverso.

### Errori di autenticazione RPC

-> Controlla che *ZCASHD_RPCUSER* e *ZCASHD_RPCPASSWORD* siano impostati correttamente

-> Verifica di usare la porta corretta (8232 per mainnet, 18232 per testnet)

-> Ricorda che le porte sono mappate da Akash - usa l'URI della tua distribuzione, non direttamente 8232


## Gestione dei Costi

Monitora la spesa nella Console:

-> **My Deployments** -> La tua distribuzione -> Mostra la stima del "Cost per month"

-> Il saldo del tuo wallet Keplr diminuirà nel tempo


Quando il tuo saldo sarà basso, Akash chiuderà automaticamente la tua distribuzione. **Ricarica periodicamente il tuo wallet** oppure imposta avvisi.

### Ridurre i Costi

-> **Usa Testnet** per test non di produzione (50% più economico)

-> **Riduci CPU/memoria** se non hai bisogno di sincronizzazione rapida

-> **Scegli provider più economici** (non sempre una buona idea - l'uptime conta)

-> **Usa USDC invece di AKT** se il prezzo di AKT è volatile (richiede una modifica del prezzo nell'SDL)

-> **Disabilita txindex** se non ti serve (risparmia ~ 20% di storage)


### Risorse Aggiuntive

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Documentazione Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Explorer di Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Discord di Akash**: [https://discord.akash.network](https://discord.akash.network) (per problemi con i provider)

## Note Finali

- **Lo storage persistente è importante.** Non saltare *persistent: true* e non usare la classe *beta2*. Usa *beta3*.
- **La sincronizzazione iniziale è lenta.** Abbi pazienza. È normale per i nodi blockchain.
- **Mantieni finanziato il tuo wallet.** Le distribuzioni si chiudono automaticamente quando finisci gli AKT.
- **I backup non sono automatici.** Se i dati ti interessano, considera che possano sparire e pianifica di conseguenza.
- **La sicurezza RPC è critica.** Non esporre RPC a internet senza misure di sicurezza adeguate.
- **Gli zcash-params vengono messi in cache.** Al primo avvio vengono scaricati ~2GB di parametri crittografici. È normale e accade una sola volta.
