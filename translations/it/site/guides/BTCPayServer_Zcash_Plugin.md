# BTCPay Server con supporto Zcash: guida completa a installazione e integrazione

BTCPay Server permette ai negozi online di accettare pagamenti in criptovaluta direttamente, senza intermediari né custodi. Questa guida ti accompagna attraverso l'intero processo di configurazione di BTCPay Server con supporto nativo per i pagamenti schermati Zcash.

> Questa documentazione si concentra sull'integrazione di Zcash nella tua istanza BTCPay Server.  
> Supporta sia i **full node (Zebra)** sia le configurazioni basate su **lightwalletd**.

---

## Indice

- [Perché usare BTCPay Server con Zcash](#why-use-btcpay-server-with-zcash)
- [Come funziona BTCPay Server](#how-btcpay-server-works)
- [Dove sono conservati i fondi? Chi controlla le chiavi private?](#where-are-funds-stored-who-controls-the-private-keys)
- [Come configurare BTCPay Server per accettare Zcash](#how-to-set-up-btcpay-server-for-accepting-zcash)
  - [Distribuzione di BTCPay Server con supporto per Zcash](#deploying-btcpay-server-with-zcash-support)
  - [Eseguire il tuo full node Zcash (Zebra + lightwalletd)](#running-your-own-zcash-full-node)
  - [Connessione a un nodo lightwalletd esterno (configurazione personalizzata)](#connecting-to-an-external-lightwalletd-node)
  - [Hosting di BTCPay Server a casa con Cloudflare Tunnel](#hosting-btcpay-server-at-home-with-cloudflare-tunnel)
- [Configurazione del plugin Zcash nell'interfaccia web di BTCPay Server](#configuring-the-zcash-plugin-in-the-btcpay-server-web-interface)
- [Integrazione di BTCPay Server con il tuo sito web](#integrating-btcpay-server-with-your-website)
  - [Integrazione API](#api-integration)
    - [Generazione di una chiave API](#generating-an-api-key)
    - [Esempio: creazione di una fattura via API](#example-creating-an-invoice-via-api)
    - [Configurazione di un webhook](#setting-up-a-webhook-optional)
  - [Integrazione CMS](#cms-integration)
  - [Pulsante di pagamento o iframe](#payment-button-or-iframe-no-cms-or-api-needed)
- [Conclusione](#conclusion)
- [Risorse](#resources)


---

## Perché usare BTCPay Server con Zcash

Il commercio online accetta sempre più criptovalute. Sono veloci, globali e funzionano senza banche. Questo avvantaggia sia i commercianti che i clienti. Ma c'è un dettaglio importante che molti trascurano.

Quando effettua un ordine, il cliente in genere fornisce informazioni personali: nome, indirizzo di spedizione e numero di telefono. Se il pagamento viene effettuato su una blockchain pubblica, come Bitcoin, Ethereum o stablecoin su Ethereum o Tron, la transazione resta visibile per sempre e può essere analizzata.

Chiunque, anche senza sapere cosa è stato ordinato, può:

- vedere quando e quanto è stato pagato  
- tracciare da dove provengono i fondi e dove sono andati  
- collegare un indirizzo di criptovaluta a una persona reale se esiste un qualsiasi punto di correlazione (ad esempio una email trapelata o il nome sulla spedizione)

Questo significa che un singolo acquisto può rivelare l'intera storia finanziaria di un cliente.

E vale anche il contrario. Se l'indirizzo di un commerciante è mai apparso on-chain, diventa esposto. I concorrenti e gli osservatori terzi possono tracciare i volumi di pagamento, l'attività dei fornitori e la struttura dei flussi commerciali.

### La combinazione di BTCPay Server e Zcash può risolvere questo problema.


BTCPay Server è un sistema gratuito e decentralizzato per ricevere pagamenti in criptovaluta.  
Non è un intermediario di pagamento e non detiene alcun fondo. Tutti i pagamenti vanno direttamente al portafoglio del commerciante.  
Può essere un portafoglio personale o una configurazione multisig all'interno di un'organizzazione.

Il server si occupa delle attività di coordinamento:

- genera un indirizzo unico per ogni ordine  
- traccia quando il pagamento viene ricevuto e lo collega all'ordine  
- emette ricevute e notifiche  
- fornisce un'interfaccia di pagamento per il cliente  

Tutto funziona sotto il controllo del proprietario del negozio, senza dipendere da servizi di terze parti.

Zcash è una criptovaluta basata su prove a conoscenza zero. Supporta un modello di transazione completamente privato.  
Quando si usano indirizzi schermati (d'ora in poi semplicemente "indirizzi"), il mittente, il destinatario e l'importo della transazione non vengono rivelati sulla blockchain.

Per i negozi online, questo significa:

- L'acquirente può completare il pagamento senza rivelare la propria storia finanziaria  
- Il venditore riceve il pagamento senza esporre il proprio indirizzo, il volume delle vendite o la struttura delle transazioni  
- Nessun osservatore esterno può collegare il pagamento all'ordine o ai dati del cliente

### Esempio pratico

Un utente effettua un ordine e seleziona Bitcoin o USDT come metodo di pagamento.  
Il sito web genera un indirizzo di pagamento e mostra l'importo.  
Dopo che il pagamento è stato effettuato, questo indirizzo resta memorizzato sulla blockchain e diventa pubblico.  
A un attaccante basta collegare un solo ordine all'indirizzo per ottenere una visibilità a lungo termine sull'intera storia delle sue transazioni.

Ora immagina la stessa situazione con Zcash.  
BTCPay Server genera un indirizzo schermato. L'acquirente invia il pagamento.  
Dal punto di vista della blockchain, non succede nulla. Non ci sono dati pubblici da analizzare.  
Il server riceve la conferma, la collega all'ordine e completa il processo.

Per qualsiasi osservatore esterno, sembra che non sia successo nulla.  
Tutta la logica resta tra il negozio e il cliente - come dovrebbe essere.

Questa soluzione non compromette l'automazione né l'usabilità.  
Tutto funziona come con le altre criptovalute, solo senza il rischio di fughe di dati.



## Come funziona BTCPay Server

BTCPay Server funge da bridge di elaborazione dei pagamenti tra la tua piattaforma di e-commerce e la blockchain. Ecco come funziona il flusso:

1. **Il cliente effettua un ordine** sul tuo sito web (ad esempio WooCommerce, Magento o qualsiasi piattaforma con integrazione BTCPay).

2. **Il negozio richiede una fattura di pagamento** a BTCPay Server. Il server genera una fattura unica con:
   - L'importo dell'ordine
   - Un timer di conto alla rovescia
   - Un indirizzo unificato (UA) Zcash - ad esempio `u1...` - che include di default un receiver Orchard (schermato).

3. **Il cliente vede la pagina di pagamento** e invia ZEC all'indirizzo fornito.

4. **BTCPay Server monitora la blockchain**, verificando il pagamento rispetto a:
   - L'importo atteso
   - L'indirizzo di ricezione
   - Il timestamp della fattura

5. **Una volta che la transazione è stata rilevata e confermata**, BTCPay notifica al negozio.

6. **Il cliente riceve una conferma di pagamento.** Facoltativamente, il server può inviare una ricevuta via email.

Questo intero processo avviene **automaticamente**, senza intermediari né custodi.  
BTCPay Server **non detiene alcun fondo** - si limita a collegare il sistema degli ordini alla blockchain in modo sicuro e privato.
## Dove sono conservati i fondi? Chi controlla le chiavi private?

BTCPay Server **non** è un portafoglio e **non richiede chiavi private**.  
Tutti i fondi vanno **direttamente** al portafoglio del commerciante. La sicurezza è garantita dall'uso di un'**architettura basata sulle chiavi di visualizzazione**.

### Come funziona

- **Il portafoglio viene creato in anticipo.**  
  Il commerciante usa un portafoglio di Zcash che supporta le chiavi di visualizzazione, come [Zkool](https://github.com/hhanh00/zkool2/) o [Zingo![Schermata di verifica in 2 passaggi]Wallet](https://zingolabs.org/).  
  Un elenco completo è disponibile su [ZecHub.wiki](https://zechub.wiki/wallets).

- **BTCPay Server si collega tramite una chiave di visualizzazione.**  
  Una chiave di visualizzazione è una **chiave di sola lettura**: può rilevare i pagamenti in arrivo e generare nuovi indirizzi di ricezione,  
  ma non può spendere fondi. Il server non memorizza frasi mnemoniche né chiavi private.

- **I dati della blockchain vengono consultati tramite un server `lightwalletd`.**  
  Puoi usare un nodo pubblico come `https://zec.rocks`, oppure eseguire il tuo stack `Zebra + lightwalletd` per una sovranità completa.

- **Ogni ordine riceve un indirizzo unico.**  
  Le chiavi di visualizzazione permettono al server di derivare nuovi indirizzi schermati Zcash per ogni fattura,  
  consentendo un tracciamento sicuro dei pagamenti e prevenendo il riutilizzo degli indirizzi.

- **Mantieni il controllo completo sui fondi.**  
  Anche se il server viene compromesso, nessuno può rubare i tuoi soldi - al massimo potrebbero essere esposti i metadati dei pagamenti.

Questo design separa l'**infrastruttura** dal **controllo degli asset**.  
Puoi aggiornare, migrare o reinstallare BTCPay Server senza mettere a rischio alcun fondo.

## Come configurare BTCPay Server per accettare Zcash

Nelle sezioni precedenti abbiamo spiegato come BTCPay Server funziona con Zcash e perché è importante per i pagamenti che preservano la privacy. Ora è il momento di passare alla pratica.

La tua configurazione esatta dipenderà da diversi fattori:

- Hai già un'istanza BTCPay Server?
- Vuoi usare un lightwalletd pubblico o eseguire il tuo full node?
- Il server girerà su una VPS o a casa?

Questo capitolo copre tutti gli scenari di configurazione attuali - dalle configurazioni minime alle distribuzioni completamente sovrane.

Vedremo quanto segue:

- Come distribuire tutto da zero su una VPS, incluso il full node (Zebra)
- Come eseguire BTCPay Server a casa mantenendo nascosto il tuo IP usando **Cloudflare Tunnel**
- Come abilitare e configurare il supporto per Zcash all'interno dell'interfaccia web di BTCPay Server
- Come integrare BTCPay con il tuo sito web o negozio online


## Distribuzione di BTCPay Server con supporto per Zcash

Passiamo alla configurazione vera e propria. In questa sezione installeremo BTCPay Server con supporto per Zcash - sia su una VPS nuova sia aggiungendo il supporto per ZEC a un'istanza esistente.

Se hai già BTCPay Server in funzione (ad esempio per BTC o Lightning), non devi reinstallare tutto - ti basta abilitare il plugin ZEC.

Vedremo varie configurazioni, dalle configurazioni minime che usano un nodo `lightwalletd` pubblico alle installazioni completamente sovrane con il tuo full node.  
La scelta migliore dipende dalla posizione del tuo server e da quanta indipendenza vuoi dall'infrastruttura esterna.

> Documentazione ufficiale del plugin:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Attenzione - un portafoglio per istanza:**  
> Il plugin Zcash usa **un unico portafoglio condiviso** tra **tutti gli store** nell'istanza BTCPay.  
> Se ospiti più store indipendenti su una sola istanza, condivideranno lo stesso portafoglio Zcash.  
> Usa istanze separate se ti serve un isolamento rigoroso dei portafogli.

---

### Configurazione VPS consigliata

Prima di installare, assicurati di avere:

- Una VPS con **Ubuntu 22.04+**
- Un nome di dominio che punta all'indirizzo IP del tuo server (via DNS)
- `git`, `docker` e `docker-compose` installati
- Accesso SSH al server

---

## Preparazione del server (parte nascosta)

<details>
  <summary>Clicca per espandere</summary>

Per distribuire BTCPay Server con supporto per Zcash, ti servirà quanto segue:

### 1. VPS con Ubuntu 22.04 o successiva

Consigliamo di usare un'installazione minimale di **Ubuntu Server 22.04 LTS**.  
Va bene qualsiasi provider VPS che offra un indirizzo IP dedicato.  

**Requisiti minimi**:  
- 2 core CPU  
- 4 GB di RAM  
- 40 GB di spazio su disco  

Questa configurazione è sufficiente se usi lightwalletd per Zcash.  
Se prevedi di eseguire un **full node Zcash**, ti serviranno **almeno 300 GB** di spazio libero su disco.

---

### 2. Nome di dominio che punta al tuo server

Nella dashboard del tuo provider DNS, crea un record `A` per un sottodominio  
(ad esempio `btcpay.example.com`) che punti all'indirizzo IP della tua VPS.  

Questo dominio verrà usato per accedere a BTCPay Server dal browser  
e per generare automaticamente un **certificato SSL gratuito** tramite Let's Encrypt.

---

### 3. Accesso SSH al server

Per installare BTCPay Server, devi connetterti alla tua VPS via SSH.  
Dal tuo terminale, esegui:

`ssh root@YOUR_SERVER_IP`

Se usi macOS, Linux o WSL su Windows, SSH è già disponibile nel terminale.
Su Windows nativo, usa un client SSH come **PuTTY**.

---

### 4. Installazione di Git, Docker e Docker Compose

Una volta connesso via SSH, aggiorna i pacchetti di sistema e installa i componenti necessari:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Su Ubuntu 22.04 e successivi, `docker-compose` da APT è deprecato.
> Il pacchetto consigliato è `docker-compose-plugin`, che fornisce il comando `docker compose` (nota lo spazio al posto del trattino).

L'ambiente del tuo server è ora pronto per l'installazione di BTCPay Server.

</details>

---

### Passo 1: clona il repository

Crea una directory di lavoro e scarica la distribuzione BTCPay Server Docker:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Passo 2: esporta le variabili d'ambiente

Sostituisci `btcpay.example.com` con il tuo dominio reale:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Se prevedi di aggiungere Monero o Litecoin in seguito, puoi includerli ora:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Puoi aggiungere nuove criptovalute in qualsiasi momento esportando le variabili appropriate e rieseguendo lo script di configurazione:

`. ./btcpay-setup.sh -i`

In questa guida ci concentriamo su **solo Zcash**.

---

### Passo 3: esegui l'installer

Esegui lo script di configurazione per compilare e avviare il server:

`. ./btcpay-setup.sh -i`

Lo script installerà le dipendenze, genererà `docker-compose.yml`, avvierà i servizi e configurerà `systemd`.
Ci vorranno circa 5 minuti.

Al termine, la tua istanza BTCPay Server sarà disponibile all'indirizzo:

`https://btcpay.example.com`

> Se stai modificando un'installazione esistente (ad esempio aggiungendo ZEC), assicurati di fermare e riavviare il server con le nuove impostazioni:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Quindi passa alla sezione successiva per configurare Zcash nell'interfaccia web di BTCPay Server.

## Eseguire il tuo full node di Zcash

Se preferisci **non** fare affidamento su nodi pubblici di `lightwalletd`, puoi distribuire il tuo full node di Zcash insieme a lightwalletd sullo stesso server.  
Questo ti dà **piena autonomia** - nessuna dipendenza esterna, niente di cui fidarsi.

---

### Passo 1: assicurati di avere spazio su disco sufficiente

Un full node di Zcash (Zebra + lightwalletd) richiede attualmente **oltre 300 GB** di spazio su disco, e il requisito continua a crescere.

Ripartizione:

- Il database della blockchain di Zebra: ~260-270 GB
- Indicizzazione di lightwalletd: ~15-20 GB

#### Spazio di archiviazione consigliato:

- **400 GB o più** se il server viene usato **solo** per i pagamenti Zcash
- **800 GB o più** se il server esegue anche BTCPay Server, PostgreSQL, Nginx, ecc.

> Idealmente usa un disco SSD/NVMe con **capacità di 1 TB**, soprattutto se non prevedi di fare il pruning dei dati regolarmente.

---

### Passo 2: imposta le variabili d'ambiente

Aggiungi quanto segue alla configurazione del tuo ambiente per attivare la configurazione del full node:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Questo includerà il fragment `zcash-fullnode`, che avvia sia `zebrad` sia `lightwalletd` all'interno di BTCPay Server.

---

### Passo 3: esegui di nuovo l'installer

`. ./btcpay-setup.sh -i`

Lo script eseguirà le seguenti operazioni:

* Scaricare le immagini Docker per Zebra e lightwalletd
* Configurare i servizi all'interno dello stack BTCPay
* Collegare il plugin per Zcash all'istanza **locale** di `lightwalletd`

> **La sincronizzazione completa della blockchain può richiedere diversi giorni**, soprattutto su server VPS con risorse limitate.
> Finché la sincronizzazione non è completata, i pagamenti schermati non saranno disponibili.


## Connessione a un nodo esterno di lightwalletd

Nella maggior parte dei casi la piena autonomia non è necessaria - e i commercianti potrebbero non voler dedicare tempo e spazio su disco a eseguire un full node di Zcash.  
Per impostazione predefinita, BTCPay Server si collega a un nodo pubblico di `lightwalletd` per gestire i pagamenti schermati senza scaricare l'intera blockchain.

L'endpoint predefinito è:

`https://zec.rocks:443`

Tuttavia, puoi configurare BTCPay Server per collegarti a **qualsiasi nodo esterno di `lightwalletd`**, ad esempio:

`https://lightwalletd.example:443`

Questa sezione mostra come farlo usando un **fragment Docker personalizzato**.

> Un esempio completo di configurazione con tutte le variabili d'ambiente è disponibile nel [repository del plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> I passi seguenti mostrano una configurazione minima funzionante.

---

### Passo 1: crea un fragment Docker personalizzato

Nella directory del tuo progetto BTCPayServer, crea un file di fragment personalizzato:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Aggiungi il contenuto seguente:

```
exclusive:
- zcash
```

La direttiva `exclusive` garantisce che solo un fragment con la stessa etichetta (`zcash` in questo caso) possa essere attivo alla volta.
Questo evita conflitti di configurazione - ad esempio, non puoi eseguire contemporaneamente il fragment `zcash-fullnode` e questo fragment esterno personalizzato di `lightwalletd`.
Contrassegnandolo come `exclusive: zcash`, BTCPay Server disattiverà automaticamente i contenitori predefiniti di `zcash-fullnode` e i contenitori interni di `lightwalletd`, permettendoti di collegarti invece al tuo nodo esterno.

---

### Passo 2: imposta le variabili d'ambiente

Nel terminale:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Passo 3: definisci l'indirizzo del nodo esterno

Apri il tuo file `.env`:

`nano .env`

Aggiungi la riga seguente, sostituendo l'URL con l'endpoint che hai scelto:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Puoi usare:

* Un **nodo pubblico**, come `https://zec.rocks:443`
* Il tuo nodo self-hosted, distribuito separatamente da BTCPay Server

> Se `lightwalletd` esterno diventa non disponibile o sovraccarico, i pagamenti schermati falliranno.
> Per i servizi critici, scegli un **endpoint stabile e collaudato** (come quello predefinito, `zec.rocks`).

> Vuoi fare il self-hosting di `lightwalletd`?
> Puoi usare `docker-compose.lwd.yml` dal [Zebra repository](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Attenzione:** questa configurazione non è documentata ufficialmente e richiede la configurazione manuale di TLS, port forwarding e firewall - consigliata solo agli utenti avanzati.

---

### Passo 4: esegui di nuovo l'installer

`. ./btcpay-setup.sh -i`

BTCPay Server applicherà la tua configurazione personalizzata e si collegherà al nodo di `lightwalletd` specificato.

D'ora in poi, il plugin per Zcash userà quell'endpoint esterno per gestire le transazioni schermate.


## Ospitare BTCPay Server a casa con Cloudflare Tunnel

Vuoi accettare pagamenti Zcash ospitando BTCPay Server su un dispositivo domestico - come un Raspberry Pi 5 o un qualsiasi server locale **senza IP statico**?  
Puoi esporre in modo sicuro la tua istanza a internet usando **Cloudflare Tunnel**.

Questo metodo evita il port forwarding e nasconde il tuo indirizzo IP reale al pubblico - mantenendo il tuo server accessibile via HTTPS.

Ti aiuta anche a **evitare il costo dell'affitto di un VPS**, l'ideale se i pagamenti in criptovalute sono una funzione opzionale anziché il nucleo della tua attività.

---

### Passo 1: installa Cloudflare Tunnel

1. Crea un account su [cloudflare.com](https://www.cloudflare.com) e aggiungi il tuo dominio.
2. Sul tuo **server domestico**, installa Cloudflare Tunnel usando il repository ufficiale di pacchetti di Cloudflare:

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install cloudflared
```

Se `apt install cloudflared` fallisce, installa invece il `.deb` corrispondente:

```bash
# Raspberry Pi / ARM64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared.deb
```

```bash
# x86_64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

3. Autenticati con Cloudflare:

`cloudflared tunnel login`

Questo comando aprirà una finestra del browser. Accedi e autorizza l'accesso al tuo dominio.
Cloudflare creerà automaticamente un file `credentials` con un token sul tuo server.

4. Crea un nuovo tunnel (puoi chiamarlo `btcpay` o in qualsiasi altro modo):

`cloudflared tunnel create btcpay`

Questo genera un file `btcpay.json` contenente l'ID del tunnel e le credenziali - ti servirà nel passo successivo.

---

### Passo 2: crea il file di configurazione del tunnel

Crea la directory di configurazione (se non esiste) e apri il file di configurazione:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Incolla la configurazione seguente:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Spiegazione:

* `tunnel` - nome del tunnel che hai creato in precedenza
* `credentials-file` - percorso del file token generato durante `cloudflared tunnel login`
* `hostname` - il tuo dominio registrato su Cloudflare (ad esempio `btcpay.example.com`)
* `service` - indirizzo locale del tuo BTCPay Server (di solito `http://127.0.0.1:80` per Nginx)

> Cloudflare inoltrerà il traffico in modo sicuro al tuo server locale, senza esporre il tuo IP di casa.


### Passo 3: aggiungi un record DNS per il tuo tunnel

Dopo aver creato il tunnel, Cloudflare di solito **aggiunge automaticamente un record DNS CNAME** per il tuo dominio. Dovrebbe apparire così:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Se non compare automaticamente, aggiungilo manualmente:

1. Vai alla tua [dashboard di Cloudflare](https://dash.cloudflare.com/)
2. Vai alla sezione **DNS**
3. Aggiungi un nuovo record CNAME:
   - **Nome**: `btcpay`
   - **Destinazione**: `<UUID>.cfargotunnel.com`  
     Puoi trovare il valore esatto nel tuo file `btcpay.json` o eseguendo:
     
     `cloudflared tunnel list`
     
   - **Stato proxy**: attivato (nuvoletta arancione)

> Questo record garantisce che tutte le richieste a `btcpay.example.com` vengano instradate attraverso il Cloudflare Tunnel, nascondendo il tuo indirizzo IP reale al pubblico.

---

### Passo 4: attiva il tunnel all'avvio del sistema

Per far sì che il tunnel parta automaticamente al boot, installalo come servizio di sistema:

`sudo cloudflared service install`

Poi abilita e avvia il servizio:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Verifica lo stato:

`sudo systemctl status cloudflared`

Dovresti vedere un messaggio come `Active: active (running)` e la conferma che `btcpay.example.com` sia online.

> D'ora in poi, il tunnel partirà automaticamente a ogni riavvio, e il tuo BTCPay Server sarà accessibile pubblicamente - senza port forwarding e senza esporre il tuo IP reale.

---

### Passo 5: completa la configurazione di BTCPay Server

Se stai per installare BTCPay Server per la prima volta, imposta il tuo dominio prima di eseguire lo script di configurazione:

`export BTCPAY_HOST="btcpay.example.com"`

In questo modo viene garantito che il dominio corretto venga usato durante la generazione della **configurazione Nginx** e dei **certificati SSL**.

Se BTCPay Server è già installato e stai solo aggiungendo il tunnel:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Il setup rigenererà le configurazioni e applicherà il nuovo dominio.
Ora dovresti poter accedere al tuo server all'indirizzo:

`https://btcpay.example.com`

> Che tu stia usando un nodo pubblico di `lightwalletd` o il tuo full node, questo non influisce sul tunnel.
> L'unica cosa che conta è che BTCPay Server sia in ascolto su `127.0.0.1:80` in locale.


## Configurare il plugin per Zcash nell'interfaccia web di BTCPay Server

> **Importante per le configurazioni multi-negozio:**  
> Il portafoglio di Zcash configurato qui è **globale** per l'istanza. Tutti i negozi useranno questo portafoglio a meno che tu non esegua istanze BTCPay separate.

Dopo aver distribuito con successo la tua istanza di BTCPay Server, dovrai eseguire una configurazione di base tramite l'interfaccia web di amministrazione.  
La documentazione ufficiale fornisce istruzioni complete in inglese - qui vedremo i passi essenziali, concentrandoci in particolare sulla configurazione del plugin per Zcash.

---

### Passo 1: accedi all'interfaccia web

Visita la tua istanza all'indirizzo:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Inserisci il tuo nome utente e la tua password da amministratore.
- Se è la prima volta che accedi, ti verrà chiesto di creare un account.
- Al primo account che registri verranno automaticamente assegnati i privilegi di amministratore.

---

### Passo 2: installa il plugin per Zcash

1. Nel menu principale, vai a:

`Plugins -> Browse Plugins`

2. Individua il plugin **Zcash (ZEC)**. Usa la barra di ricerca se necessario.
3. Fai clic su **Install** e conferma.

> Ripeti questa procedura per tutte le altre altcoin abilitate durante la configurazione del server.

Dopo l'installazione, fai clic su **Restart Server** per ricaricare l'interfaccia con i plugin attivi.


### Passo 3: collega il tuo portafoglio via Viewing Key

Dopo l'installazione del plugin, nel menu delle impostazioni apparirà una nuova sezione **Zcash**.

1. Vai a:

`Zcash -> Settings`

2. Incolla la tua **Unified Full Viewing Key (UFVK)** - BTCPay deriverà un Unified Address per ogni fattura e rileverà i pagamenti schermati in arrivo.

> **Nota:** le chiavi di visualizzazione Sapling legacy sono supportate, ma per usare gli indirizzi Orchard/Unified dovresti fornire un **UFVK**.


   Formato di esempio:

`uview184syv9wftwngkay8d...`

3. Inserisci un valore nel campo Block height

* **Configurazione iniziale con un portafoglio nuovo (nuova frase mnemonica):** inserisci l'altezza di blocco attuale di Zcash (puoi verificarla su 3xpl.com/zcash) - questo accelera la scansione iniziale.
* **Migrazione sullo stesso server da una configurazione legacy basata solo su Sapling agli Unified Addresses / Orchard:** lascia questo campo vuoto.
* **Trasferimento del tuo negozio su un nuovo server con lo stesso portafoglio/UFVK:** inserisci facoltativamente la birth height - un'altezza approssimativa del primo ordine pagato del tuo negozio (abbina la data dell'ordine su 3xpl per restringere la scansione). Se non sei sicuro, lascialo vuoto.

> Non tutti i portafogli supportano ancora l'esportazione della **Unified Full Viewing Key (UFVK)**.  
> Opzioni consigliate:  
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo![Schermata di verifica in 2 passaggi]Wallet (versione per PC)**](https://zingolabs.org/)  
> In entrambe le app, cerca l'esportazione dell'UFVK nella sezione backup/esportazione.

Queste chiavi supportano la **rotazione automatica degli indirizzi**, il che significa:
- Ogni cliente riceve un indirizzo di pagamento **unico**
- Vedi un saldo **unico e unificato**

Puoi trovare un elenco di compatibilità più ampio su [ZecHub -> Wallets](https://zechub.wiki/wallets).

Una volta compilati tutti i campi, fai clic su **Save**.

---

### Testa il flusso di pagamenti ZEC

Congratulazioni - il tuo portafoglio di Zcash è ora collegato a BTCPay Server.

Facciamo un test:

1. Vai a:

`Invoices -> Create New`

2. Genera una fattura di prova per un piccolo importo in ZEC.
3. Invia i fondi da **un portafoglio diverso** (non da quello collegato a BTCPay).
4. Una volta rilevata la transazione, la pagina della fattura mostrerà una celebrazione visiva.
5. Verifica che lo stato della fattura passi a **Paid**.

Se tutto funziona - a questo punto puoi integrare i pagamenti ZEC nel tuo sito web usando l'API o i plugin CMS.


## Integrare BTCPay Server nel tuo sito web

Una volta che il tuo portafoglio di Zcash è collegato a BTCPay Server, puoi integrare il sistema di pagamenti nel tuo sito web.  
Ci sono diversi modi per farlo - dall'accesso diretto all'API ai plugin pronti all'uso per le piattaforme CMS più diffuse.

---

### Opzioni di integrazione

- **Integrazione via API**  
  Ideale per siti web realizzati su misura o per sistemi senza CMS.  
  Ti dà il controllo completo sulla creazione delle fatture, sul tracciamento dei pagamenti e sulle notifiche - il tutto all'interno della tua interfaccia e della tua logica.  
  Richiede conoscenze di base di programmazione, quindi è meglio affidare questo compito al tuo sviluppatore.

- **Plugin CMS**  
  Disponibili per piattaforme come **WooCommerce**, **PrestaShop** e altre.  
  Questi plugin ti permettono di accettare pagamenti in pochi minuti - senza scrivere codice.

- **Pulsante di pagamento o Iframe**  
  Il metodo più semplice.  
  Perfetto per landing page, siti personali o qualsiasi sito in cui vuoi semplicemente incorporare un link per le donazioni o un widget di checkout.

---

### Integrazione via API

Se usi una piattaforma personalizzata (o nessun CMS), l'API è l'opzione migliore.  
Ti offre flessibilità completa: puoi creare fatture, seguirne lo stato, ricevere notifiche e controllare pienamente l'esperienza utente.

> Nota: anche alcuni plugin CMS usano l'API sotto il cofano, quindi creare una chiave API è spesso il **primo passo necessario**, indipendentemente dal metodo di integrazione scelto.

Passo successivo: genera una chiave API per il tuo negozio e inizia a usare la [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) per realizzare la tua integrazione.


### Generazione di una chiave API

Per integrare BTCPay Server con il tuo sito web o la tua app, devi generare una chiave API.

1. Accedi a BTCPay Server e apri il **menu utente** (angolo in alto a destra)
2. Vai su **API Keys**
3. Fai clic su **Create a new API key**
4. Inserisci un nome per la tua chiave
5. Nella sezione **Permissions**, attiva:
   - `Can create invoice`
   - `Can view invoice`
   - *(Facoltativo)* `Can modify store settings` - solo se ti serve la gestione a livello di negozio

6. Fai clic su **Generate**. Verrà visualizzata la tua chiave API personale - copiala e conservala in modo sicuro.

> Questa chiave concede l'accesso alle fatture del tuo negozio.  
> **Non** condividerla pubblicamente né esporla nel codice lato client.

---

### Esempio: creazione di una fattura via API

**Endpoint:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Corpo della richiesta:**

```
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**Risposta:**

Riceverai un oggetto JSON contenente:

* `invoiceId`
* Un URL di pagamento che puoi incorporare nel tuo sito web o inviare al cliente

Consulta la documentazione completa:
[API Greenfield – Creare una fattura](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Configurazione di un webhook (facoltativa)

Per ricevere notifiche in tempo reale quando lo stato di una fattura cambia (ad esempio quando viene ricevuto un pagamento):

1. Vai alle impostazioni del tuo negozio -> **Webhooks**
2. Aggiungi l'URL dell'endpoint del tuo backend che gestirà le richieste `POST` provenienti da BTCPay Server
3. BTCPay invierà automaticamente le notifiche quando una fattura viene pagata o scade

I payload dei webhook e la logica di retry sono descritti nella [documentazione ufficiale sui webhook](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Esempi di integrazione per vari linguaggi di programmazione sono disponibili nella documentazione di BTCPay e nei repository di GitHub.



### Integrazione CMS

BTCPay Server supporta plugin per i sistemi di gestione dei contenuti (CMS) più diffusi.  
L'integrazione più matura e diffusa è quella con **WordPress + WooCommerce**, che rende facile accettare pagamenti ZEC **senza scrivere codice**.

---

#### WooCommerce (WordPress)

BTCPay Server supporta ufficialmente un plugin per WooCommerce.

Passi per l'integrazione:

1. Installa il plugin **BTCPay per WooCommerce** dalla directory dei plugin di WordPress o da GitHub.
2. Nel pannello di amministrazione di WordPress, vai a:

`WooCommerce -> Settings -> Payments`

3. Trova **BTCPay** nell'elenco e fai clic su **Set up**
4. Inserisci l'URL di BTCPay Server e segui le istruzioni per l'autorizzazione  
   (consigliata la generazione automatica della chiave API)
5. Abilita il metodo di pagamento e salva le tue impostazioni

> Istruzioni dettagliate, tutorial video e guide per la risoluzione dei problemi sono disponibili nella documentazione del plugin.

Nella stessa sezione della documentazione di BTCPay trovi anche altre opzioni di integrazione CMS.

---

### Pulsante di pagamento o Iframe (senza CMS né API)

Se non usi un CMS e non vuoi lavorare con le API, il modo più semplice per accettare pagamenti ZEC è **incorporare un link di pagamento o un widget** direttamente nel tuo sito web.

Questo metodo è ideale per:

- Landing page
- Siti portfolio
- Blog o pagine statiche
- Progetti senza un server backend

---

#### Opzione 1: pulsante di pagamento (link)

1. In BTCPay Server, crea manualmente una fattura nella sezione **Invoices**
2. Copia il link di pagamento, ad esempio:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Aggiungi il link al tuo HTML:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Opzione 2: fattura incorporata (Iframe)

Per visualizzare la fattura direttamente sul tuo sito, usa un iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Puoi personalizzare lo stile del pulsante o del contenitore dell'iframe per adattarlo al design del tuo sito - BTCPay Server consente una personalizzazione flessibile della pagina della fattura.

## Conclusione

Questa guida era lunga - ma copre solo gli aspetti fondamentali dell'integrazione dei pagamenti in Zcash con BTCPay Server.

L'interfaccia di BTCPay Server offre molte più funzionalità di quante ne abbiamo mostrate qui. Per fortuna, l'interfaccia utente è disponibile in diverse lingue (incluso il russo), il che rende facile continuare a esplorare e sperimentare.

BTCPay è uno strumento estremamente flessibile. Puoi:

* Ospitare più negozi indipendenti su una singola istanza
* Definire ruoli e permessi personalizzati per i membri del team - dalla sola visualizzazione degli ordini all'amministratore completo
* Usare i tuoi domini e il tuo branding
* Configurare webhook, portafogli di fallback e persino l'accesso Tor
* Configurare impostazioni avanzate come regole fiscali, codici sconto, personalizzazione della pagina di checkout, restrizioni dei metodi di pagamento e altro

BTCPay è stato creato come alternativa open source ai fornitori di pagamento centralizzati. Se cerchi di accettare pagamenti privati in ZEC senza intermediari, questa piattaforma merita assolutamente la tua attenzione.

Ti auguriamo buon lavoro nell'esplorare l'ecosistema di BTCPay e nel rendere i tuoi pagamenti davvero tuoi.

## Risorse

* [BTCPay Server Sito ufficiale](https://btcpayserver.org/)
* [BTCPay FAQ](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub Repository](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Demo della mainnet](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Plugin per BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Guida all'installazione del plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Esempio di zcash-lightwalletd.custom.yml personalizzato](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [lightwalletd File Compose di Docker (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Documentazione delle chiavi API di BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Creare un tunnel Cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash Elenco di compatibilità dei portafogli (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + lightwalletd su Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
