# Come eseguire Zebra su Akash Network

Guida passo passo per il deploy di un full node (nodo completo) Zebra Zcash su Akash.

### Cosa stai distribuendo

Un nodo Zebra completo che:

-> Sincronizzerà l'intera blockchain di Zcash (oltre 100GB per la mainnet, ~40GB per la testnet)

-> Costerà all'incirca $15 al mese a seconda del prezzo del token AKT

-> Impiegherà da diverse ore a giorni per sincronizzarsi completamente

-> Userà 4 vCPU, 16GB di RAM, 350GB di storage (mainnet) oppure 2 vCPU, 8GB di RAM, 50GB (testnet)


Il template awesome-akash ora usa **Zebra 7.0.0** (mai `:latest`). Abilita internamente Prometheus (`9999`) e health (`8080`), JSON-RPC per un **lightwalletd** collocato insieme, su gRPC **9067**, e i flag delle funzionalità `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`.

Per un nodo Mainnet potato più veloce, consulta [Come eseguire Zakura su Akash](/guides/akash-network-zakura). Per una dashboard Regtest temporanea, consulta [Così parlò Zakura su Akash](/guides/thus-spoke-zakura-akash).

### Come Akash pubblica le porte

I numeri nell’SDL (`port` / `as`) sono **porte dei container**. Zebra continua ad ascoltare sulla porta **8233**, lightwalletd sulla porta **9067**, mentre il controllo dello stato di salute usa la porta **8080**. Questi numeri sono destinati al processo e agli altri servizi nello stesso deployment (`zebra:8232`).

Non sono le porte dell'IP pubblico del provider.

**Predefinito (questo modello):** nessun IP dedicato. Per ogni esposizione TCP di `global: true`, il provider associa una **porta alta casuale** su un host condiviso alla porta del tuo container. Scaduta la durata, **Leases → URIs** nella Console/Air elenca gli endpoint effettivi, ad esempio:

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

I peer e i portafogli usano **quei** valori host:porta. Copia l'URI dell'esposizione che ti interessa (P2P o lightwalletd). Se imposti `ZEBRA_NETWORK__EXTERNAL_ADDR`, impostalo sull'URI P2P mappato (`provider.example:31482`), non su `…:8233`.

**HTTP** (`as: 80` con `http_options`, usato sulla dashboard di Thus Spoke): molti provider pubblicano un **hostname di ingress** (spesso sulle porte 80/443) invece di una porta TCP casuale. Apri l’URI di quel servizio in un browser.

**Interno** (`global: false` o `to: service: lightwalletd`): solo DNS del cluster (`zebra:8232`). Nessun URI pubblico.

Gli **IP dedicati** (`endpoints` / `kind: ip` nell'SDL) sono un **extra a pagamento**. Possono assegnarti un IP pubblico stabile e, a volte, la porta `as` su quell'IP. Questi template non ne richiedono uno. Aggiungilo tu in seguito, se vuoi un `host:8233` stabile; aspettati costi aggiuntivi e meno provider tra cui fare offerte.

### Quale sito usare (pagamenti)

L'SDL è lo stesso. Le due interfacce web Akash differiscono per **come paghi**.

| Sito | Pagamenti | Portafoglio |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Pagamento tradizionale sul web (carta / circuiti fiat offerti da Console) | Account Console |
| [air.akash.network](https://air.akash.network) | Pagamenti nativi Akash chain (AKT / ACT) | **Keplr** |

Usa **Air** quando vuoi effettuare un pagamento on-chain con Keplr. Usa **Console** quando vuoi un normale flusso di pagamento web. Non aspettarti il regolamento nativo di Keplr su Console.

### Prerequisiti

**Se paghi su Console (checkout web)**

1. Un account Console su [console.akash.network](https://console.akash.network)
2. Un metodo di pagamento accettato dall'interfaccia Console
3. Qualche minuto nell'interfaccia

**Se paghi su Air (Akash / Keplr nativo)**

1. Estensione del browser **Keplr** (Chrome/Brave/Firefox)
2. **AKT / ACT** in Keplr per il deposito e il lease (da un exchange o tramite IBC)
3. Apri [air.akash.network](https://air.akash.network)

#### Passaggio 1: connettiti

**Console (pagamenti web)**

-> Vai su [https://console.akash.network](https://console.akash.network)

-> Accedi / completa la procedura per l'account Console

Usa il checkout che ti presenta l'interfaccia (non Keplr on-chain)

**Air (pagamenti nativi Akash)**

-> Vai su [https://air.akash.network](https://air.akash.network)

-> Clicca su **"Connect Wallet"**

-> Seleziona **Keplr** e approva la connessione

-> Verifica che il tuo saldo di AKT/ACT sia sufficiente per coprire il deposito e il lease

#### Passo 2: crea il deployment

-> Clicca su **"Deploy"**

-> Scegli **"Build your template"** (oppure passa direttamente al caricamento dell'SDL)


##### Opzione A: carica il file SDL (consigliato)

**Pagamenti web (Console)**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Pagamenti nativi Akash con Keplr (Air)**

[Apri questo modello su Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Opzione B: usa l'editor SDL

Se vuoi incollare manualmente [l'SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Copia il contenuto di *zebra-akash.yml*

-> Incollalo nell'editor SDL

-> Modificalo secondo necessità (vedi la sezione configurazione più sotto)

-> Clicca su **"Create Deployment"**


#### Passo 3: esamina e approva il deposito

L'interfaccia ti mostrerà:

-> **Deposito del deployment**: ~5 AKT (lo riavrai indietro quando chiuderai il deployment)

-> **Costo stimato**: basato sul prezzo del tuo SDL

Su **Air**, fai clic su **"Approve"** e accedi a **Keplr**. Su **Console**, completa il checkout web mostrato nell'interfaccia.

#### Passo 4: scegli un provider

Dopo circa 30 secondi vedrai le offerte dei provider. Ogni offerta mostra:

-> **Prezzo per blocco** (in AKT o USDC)

-> **Costo mensile stimato**

-> **Dettagli del provider** (uptime, regione, ecc.)


**Non scegliere solo il più economico.** Controlla:

-> Percentuale di uptime (punta a > 95%)

-> Regione (più vicina a te = latenza migliore, ma per i nodi blockchain conta poco)

-> Stato di audit (segno di spunta verde = più affidabile)


Fai clic su **"Accetta l'offerta"** sul provider che hai scelto. Su Air, accedi Keplr. Su Console, conferma tramite il flusso di pagamento web.

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

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

Ogni riga è un'esposizione `global: true`. Il nome include la porta SDL `as` (8233, 9067). Il numero dopo il nome host è la **porta mappata dal provider**, assegnata al momento della locazione. Gli altri nodi Zcash si connettono a `provider-hostname.com:31482`. I portafogli compatti usano l'URI lightwalletd (TLS disattivato, a meno che tu non termini TLS personalmente).

Il container continua ad ascoltare sulle porte 8233 / 9067. L'indirizzo pubblico è sempre l'URI, a meno che in seguito tu non aggiunga un IP dedicato (non previsto in questo template).

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

Se esponi RPC con `global: true`, l'indirizzo pubblico resta un **lease URI** (`host:&lt;random-high-port&gt;`), non `host:8232`. Con `global: false` (questo template), RPC resta sulla rete del deployment (`zebra:8232` per lightwalletd). I lease per IP dedicati sono un'opzione a pagamento separata e non rientrano nell'SDL.

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

-> Fai clic su **"Aggiorna"** (Air: accedi Keplr; Console: conferma il flusso di pagamento sul web)

**Nota**: l'aggiornamento riavvierà il tuo container. Il nodo riprenderà dal suo stato salvato (storage persistente), ma aspettati 1-2 minuti di downtime.

### Monitoraggio

#### Tramite la console

-> **Scheda Logs**: log del container in tempo reale

-> **Scheda Shell**: ottieni una shell all'interno del container (utile per il debug)

-> **Scheda Events**: eventi Kubernetes (per lo più inutili a meno che qualcosa non sia rotto)


#### Tramite RPC (se abilitato)

Se hai abilitato l'RPC, puoi interrogare il tuo nodo come un normale full node zebrad (perché lo è!)

### Chiudere il tuo deployment

Quando hai finito o vuoi smettere di pagare:

-> Vai su **My Deployments**

-> Trova il tuo deployment Zebra

-> Clicca su **"Close Deployment"**

-> Conferma (Air: accedi Keplr; Console: conferma nell'interfaccia della Console)

Il tuo deposito di 5 AKT verrà rimborsato. Lo **storage persistente** dovrebbe essere preservato dal provider, ma non farci affidamento - trattalo come qualsiasi altro provider cloud.

### Risoluzione dei problemi

#### Errore "Insufficient funds"

On Air, finanzia Keplr con AKT/ACT. Su Console, ricarica il metodo di pagamento di Console.

#### Nessuna offerta visualizzata

Possibili cause:

-> Il tuo prezzo è troppo basso (aumenta *amount* nell'SDL)

-> I tuoi requisiti di risorse sono troppo elevati per i provider disponibili (riduci CPU/memoria/storage)

-> Aspetta di più (a volte servono 60-90 secondi perché compaiano le offerte)


#### Deployment bloccato in "pending"

Il provider potrebbe avere dei problemi. Chiudi il deployment e prova un provider diverso.

#### I log di Zebra mostrano "No peers connected"

È normale per i primi minuti. Zebra scoprirà i peer automaticamente. Se persiste dopo più di 10 minuti, potresti avere un problema di rete (improbabile su Akash).

#### Errori "out of memory" nei log

Hai risparmiato troppo sulla RAM. Chiudi il deployment e riesegui il deploy con almeno 12Gi di memoria (16Gi consigliati).

#### La sincronizzazione richiede un'eternità

Definisci "un'eternità":

-> **Ore**: normale

-> **Giorni**: normale anche per la mainnet da zero

-> **Settimane**: qualcosa non va, controlla i log per gli errori


### Gestione dei costi

Monitora le tue spese in Console o Air:

-> **My Deployments** -> Il tuo deployment -> Mostra la stima "Cost per month"

-> Air: il tuo saldo Keplr AKT/ACT diminuisce nel tempo. Console: il tuo saldo per i pagamenti Console diminuisce.

Quando il tuo saldo si esaurisce, Akash chiuderà automaticamente il tuo deployment. **Ricarica periodicamente il tuo portafoglio** o imposta degli avvisi.

#### Ridurre i costi

-> **Usa la Testnet** per i test non in produzione (50% più economica)

-> **Riduci CPU/memoria** se non ti serve una sincronizzazione veloce

-> **Scegli provider più economici** (non sempre saggio - l'uptime conta)


### Mainnet vs testnet

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

**Akash Console** (pagamenti web): [https://console.akash.network](https://console.akash.network)

**Air di Akash** (AKT/ACT nativi + Keplr): [https://air.akash.network](https://air.akash.network)

**Documentazione Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Documentazione Zebra**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Explorer Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Discord Akash**: [https://discord.akash.network](https://discord.akash.network) (per problemi con i provider)
