# BTCPay Server con supporto Zcash: guida completa all'installazione e all'integrazione

BTCPay Server consente alle attività online di accettare pagamenti in criptovaluta direttamente, senza intermediari o custodi. Questa guida ti accompagna attraverso l'intero processo di configurazione di BTCPay Server con supporto nativo per i pagamenti schermati in Zcash.

> Questa documentazione si concentra sull'integrazione di Zcash nella tua istanza di BTCPay Server.  
> Supporta sia le configurazioni con **full node (Zebra)** sia quelle basate su **lightwalletd**.

---

## Indice

- [Perché usare BTCPay Server con Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Come funziona BTCPay Server](#How-BTCPay-Server-Works)
- [Dove sono conservati i fondi? Chi controlla le chiavi private?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Come configurare BTCPay Server per accettare Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Distribuire BTCPay Server con supporto Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Eseguire il tuo full node Zcash (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Connettersi a un nodo lightwalletd esterno (configurazione personalizzata)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Ospitare BTCPay Server a casa con Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Configurare il plugin Zcash nell'interfaccia web di BTCPay Server](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Integrare BTCPay Server con il tuo sito web](#Integrating-BTCPay-Server-with-Your-Website)
  - [Integrazione tramite API](#API-Integration)
    - [Generare una chiave API](#Generating-an-API-Key)
    - [Esempio: creare una fattura tramite API](#Example-Creating-an-Invoice-via-API)
    - [Configurare un webhook](#Setting-Up-a-Webhook-Optional)
  - [Integrazione CMS](#CMS-Integration)
  - [Pulsante di pagamento o iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Conclusione](#Conclusion)
- [Risorse](#Resources)


---

## Perché usare BTCPay Server con Zcash

Il commercio online accetta sempre più spesso criptovalute. È veloce, globale e funziona senza banche. Questo avvantaggia sia i commercianti che i clienti. Ma c'è un dettaglio importante che molti trascurano.

Quando effettua un ordine, il cliente fornisce in genere informazioni personali: nome, indirizzo di spedizione e numero di telefono. Se il pagamento viene effettuato utilizzando una blockchain pubblica - come Bitcoin, Ethereum o le stablecoin su Ethereum o Tron - la transazione diventa permanentemente visibile per essere analizzata.

Chiunque, anche senza sapere cosa è stato ordinato, può:

- vedere quando e quanto è stato pagato  
- tracciare da dove provengono i fondi e dove sono andati  
- collegare un indirizzo di criptovaluta a una persona reale se esiste un qualsiasi punto di correlazione (ad esempio, un'email trapelata o il nome di spedizione)

Questo significa che un singolo acquisto può rivelare l'intera storia finanziaria di un cliente.

E funziona anche al contrario. Se l'indirizzo di un commerciante è mai apparso on-chain, diventa esposto. Concorrenti e osservatori terzi possono tracciare i volumi di pagamento, l'attività dei fornitori e la struttura dei flussi commerciali.

### La combinazione di BTCPay Server e Zcash può risolvere questo problema.


BTCPay Server è un sistema gratuito e decentralizzato per ricevere pagamenti in criptovaluta.  
Non è un intermediario di pagamento e non detiene alcun fondo. Tutti i pagamenti vanno direttamente al wallet del commerciante.  
Può trattarsi di un wallet personale o di una configurazione multisig all'interno di un'organizzazione.

Il server si occupa dei compiti di coordinamento:

- genera un indirizzo univoco per ogni ordine  
- monitora quando il pagamento viene ricevuto e lo collega all'ordine  
- emette ricevute e notifiche  
- fornisce un'interfaccia di pagamento per il cliente  

Tutto funziona sotto il controllo del proprietario del negozio, senza dipendere da servizi di terze parti.

Zcash è una criptovaluta costruita su prove a conoscenza zero. Supporta un modello di transazione completamente privato.  
Quando si utilizzano indirizzi schermati (d'ora in poi semplicemente chiamati "indirizzi"), il mittente, il destinatario e l'importo della transazione non vengono rivelati sulla blockchain.

Per i negozi online, questo significa:

- L'acquirente può completare il pagamento senza rivelare la propria storia finanziaria  
- Il venditore riceve il pagamento senza esporre il proprio indirizzo, il volume delle vendite o la struttura delle transazioni  
- Nessun osservatore esterno può collegare il pagamento all'ordine o ai dati del cliente

### Esempio pratico

Un utente effettua un ordine e seleziona Bitcoin o USDT come metodo di pagamento.  
Il sito web genera un indirizzo di pagamento e mostra l'importo.  
Dopo che il pagamento è stato effettuato, questo indirizzo viene memorizzato sulla blockchain e diventa pubblico.  
A un malintenzionato basta collegare un solo ordine all'indirizzo per ottenere una visibilità a lungo termine sull'intera storia delle sue transazioni.

Ora immagina la stessa situazione con Zcash.  
BTCPay Server genera un indirizzo schermato. L'acquirente invia il pagamento.  
Dal punto di vista della blockchain, non accade nulla. Non ci sono dati pubblici da analizzare.  
Il server riceve la conferma, la collega all'ordine e completa il processo.

Per chiunque dall'esterno, sembra che non sia successo nulla.  
Tutta la logica rimane tra il negozio e il cliente - come dovrebbe essere.

Questa soluzione non compromette l'automazione o l'usabilità.  
Tutto funziona allo stesso modo delle altre criptovalute, semplicemente senza il rischio di fughe di dati.



## Come funziona BTCPay Server

BTCPay Server agisce come un ponte di elaborazione dei pagamenti tra la tua piattaforma di e-commerce e la blockchain. Ecco come funziona il flusso:

1. **Il cliente effettua un ordine** sul tuo sito web (ad esempio WooCommerce, Magento o qualsiasi piattaforma con integrazione BTCPay).

2. **Il negozio richiede una fattura di pagamento** a BTCPay Server. Il server genera una fattura univoca con:
   - L'importo dell'ordine
   - Un conto alla rovescia
   - Un Zcash Unified Address (UA) - ad esempio `u1...` - che include un ricevente Orchard (schermato) per impostazione predefinita.

3. **Il cliente vede la pagina di pagamento** e invia ZEC all'indirizzo fornito.

4. **BTCPay Server monitora la blockchain**, verificando il pagamento rispetto a:
   - L'importo previsto
   - L'indirizzo di ricezione
   - Il timestamp della fattura

5. **Una volta che la transazione viene rilevata e confermata**, BTCPay notifica il negozio.

6. **Il cliente riceve una conferma di pagamento.** Facoltativamente, il server può inviare una ricevuta via email.

Tutto questo processo avviene **automaticamente**, senza intermediari o custodi.  
BTCPay Server **non detiene alcun fondo** - collega semplicemente il sistema di ordini alla blockchain in modo sicuro e privato.
## Dove sono conservati i fondi? Chi controlla le chiavi private?

BTCPay Server **non** è un wallet e **non richiede chiavi private**.  
Tutti i fondi vanno **direttamente** al wallet del commerciante. La sicurezza è garantita dall'uso di un'**architettura basata su viewing key**.

### Come funziona

- **Il wallet viene creato in anticipo.**  
  Il commerciante utilizza un wallet Zcash che supporta le viewing key - come [YWallet](https://ywallet.app/installation) o [Zingo! Wallet](https://zingolabs.org/).  
  Un elenco completo è disponibile su [ZecHub.wiki](https://zechub.wiki/wallets).

- **BTCPay Server si connette tramite una viewing key.**  
  Una viewing key è una **chiave di sola lettura**: può rilevare i pagamenti in entrata e generare nuovi indirizzi di ricezione,  
  ma non può spendere i fondi. Il server non memorizza frasi seed o chiavi private.

- **I dati della blockchain sono accessibili tramite un server `lightwalletd`.**  
  Puoi usare un nodo pubblico come `https://zec.rocks`, oppure eseguire il tuo stack `Zebra + lightwalletd` per la piena sovranità.

- **Ogni ordine riceve un indirizzo univoco.**  
  Le viewing key consentono al server di derivare nuovi indirizzi schermati Zcash per ogni fattura,  
  permettendo un tracciamento sicuro dei pagamenti e prevenendo il riutilizzo degli indirizzi.

- **Mantieni il pieno controllo sui fondi.**  
  Anche se il server venisse compromesso, nessuno potrebbe rubare il tuo denaro - potrebbero essere esposti solo i metadati dei pagamenti.

Questo design separa l'**infrastruttura** dal **controllo degli asset**.  
Puoi aggiornare, migrare o reinstallare BTCPay Server senza mettere a rischio alcun fondo.

## Come configurare BTCPay Server per accettare Zcash

Nelle sezioni precedenti abbiamo spiegato come funziona BTCPay Server con Zcash e perché è importante per i pagamenti che preservano la privacy. Ora è il momento di mettere le mani in pasta.

La tua configurazione esatta dipenderà da diversi fattori:

- Hai già un'istanza di BTCPay Server?
- Vuoi usare un lightwalletd pubblico o eseguire il tuo full node?
- Il server verrà eseguito su un VPS o a casa?

Questo capitolo copre tutti gli scenari di configurazione attuali - dalle configurazioni minime alle distribuzioni completamente sovrane.

Vedremo i seguenti aspetti:

- Come distribuire tutto da zero su un VPS, incluso il full node (Zebra)
- Come eseguire BTCPay Server a casa mantenendo nascosto il tuo IP usando **Cloudflare Tunnel**
- Come abilitare e configurare il supporto Zcash all'interno dell'interfaccia web di BTCPay Server
- Come integrare BTCPay con il tuo sito web o negozio online


## Distribuire BTCPay Server con supporto Zcash

Passiamo alla configurazione vera e propria. In questa sezione installeremo BTCPay Server con supporto Zcash - sia su un VPS nuovo sia aggiungendo il supporto ZEC a un'istanza esistente.

Se hai già BTCPay Server in esecuzione (ad esempio per BTC o Lightning), non è necessario reinstallare tutto - basta abilitare il plugin ZEC.

Vedremo varie configurazioni, dalle configurazioni minime che usano un nodo `lightwalletd` pubblico alle installazioni completamente sovrane con il tuo full node.  
L'opzione migliore dipende dalla posizione del tuo server e da quanta indipendenza desideri dall'infrastruttura esterna.

> Documentazione ufficiale del plugin:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Attenzione - un solo wallet per istanza:**  
> Il plugin Zcash utilizza **un unico wallet condiviso** tra **tutti i negozi** dell'istanza BTCPay.  
> Se ospiti più negozi indipendenti su un'unica istanza, condivideranno lo stesso wallet Zcash.  
> Usa istanze separate se hai bisogno di un isolamento rigoroso dei wallet.

---

### Configurazione VPS consigliata

Prima di installare, assicurati di avere:

- Un VPS con **Ubuntu 22.04+**
- Un nome di dominio che punti all'indirizzo IP del tuo server (tramite DNS)
- `git`, `docker` e `docker-compose` installati
- Accesso SSH al server

---

## Preparare il server (parte nascosta)

<details>
  <summary>Clicca per espandere</summary>

Per distribuire BTCPay Server con supporto Zcash, avrai bisogno di quanto segue:

### 1. VPS con Ubuntu 22.04 o più recente

Consigliamo di usare un'installazione minima di **Ubuntu Server 22.04 LTS**.  
Qualsiasi provider VPS che offra un indirizzo IP dedicato andrà bene.  

**Requisiti minimi**:  
- 2 core CPU  
- 4 GB di RAM  
- 40 GB di spazio su disco  

Questa configurazione è sufficiente se usi lightwalletd per Zcash.  
Se prevedi di eseguire un **full node Zcash**, avrai bisogno di **almeno 300 GB** di spazio libero su disco.

---

### 2. Nome di dominio che punta al tuo server

Nel pannello di controllo del tuo provider DNS, crea un record `A` per un sottodominio  
(ad esempio `btcpay.example.com`) che punti all'IP del tuo VPS.  

Questo dominio verrà usato per accedere a BTCPay Server dal browser  
e per generare automaticamente un **certificato SSL gratuito** tramite Let's Encrypt.

---

### 3. Accesso SSH al server

Per installare BTCPay Server, devi connetterti al tuo VPS via SSH.  
Dal tuo terminale, esegui:

`ssh root@YOUR_SERVER_IP`

Se usi macOS, Linux o WSL su Windows, SSH è già disponibile nel terminale.
Su Windows nativo, usa un client SSH come **PuTTY**.

---

### 4. Installa Git, Docker e Docker Compose

Una volta connesso via SSH, aggiorna i pacchetti di sistema e installa i componenti richiesti:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Su Ubuntu 22.04 e versioni più recenti, `docker-compose` da APT è deprecato.
> Il pacchetto consigliato è `docker-compose-plugin`, che fornisce il comando `docker compose` (nota lo spazio invece del trattino).

L'ambiente del tuo server è ora pronto per l'installazione di BTCPay Server.

</details>

---

### Passo 1: clona il repository

Crea una directory di lavoro e scarica il deployment Docker di BTCPay Server:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Passo 2: esporta le variabili d'ambiente

Sostituisci `btcpay.example.com` con il tuo dominio effettivo:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Se prevedi di aggiungere Monero o Litecoin in seguito, puoi includerli già ora:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Puoi aggiungere nuove monete in qualsiasi momento esportando le variabili appropriate e rieseguendo lo script di configurazione:

`. ./btcpay-setup.sh -i`

Per questa guida, ci concentreremo **solo su Zcash**.

---

### Passo 3: esegui l'installer

Esegui lo script di configurazione per compilare e avviare il server:

`. ./btcpay-setup.sh -i`

Lo script installerà le dipendenze, genererà il file `docker-compose.yml`, avvierà i servizi e configurerà `systemd`.
Questo richiede circa 5 minuti.

Una volta completato, la tua istanza di BTCPay Server sarà disponibile all'indirizzo:

`https://btcpay.example.com`

> Se stai modificando un'installazione esistente (ad esempio aggiungendo ZEC), assicurati di arrestare e riavviare il server con le nuove impostazioni:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Poi prosegui alla sezione successiva per configurare Zcash nell'interfaccia web di BTCPay Server.



## Eseguire il tuo full node Zcash

Se preferisci **non** affidarti a nodi `lightwalletd` pubblici, puoi distribuire il tuo full node Zcash insieme a Lightwalletd sullo stesso server.  
Questo ti garantisce la **piena autonomia** - nessuna dipendenza esterna, nessuna fiducia richiesta.

---

### Passo 1: assicurati di avere spazio su disco sufficiente

Un full node Zcash (Zebra + Lightwalletd) richiede attualmente **300+ GB** di spazio su disco, e continua a crescere.

Suddivisione:

- Il database della blockchain Zebra: ~260-270 GB
- L'indicizzazione di Lightwalletd: ~15-20 GB

#### Spazio di archiviazione consigliato:

- **400 GB+** se il server è usato **solo** per i pagamenti Zcash
- **800 GB+** se il server esegue anche BTCPay Server, PostgreSQL, Nginx, ecc.

> Idealmente usa un disco SSD/NVMe con **capacità di 1 TB**, soprattutto se non prevedi di effettuare il pruning dei dati con regolarità.

---

### Passo 2: imposta le variabili d'ambiente

Aggiungi quanto segue alla configurazione del tuo ambiente per attivare la configurazione full node:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Questo includerà il fragment `zcash-fullnode`, che avvia sia `zebrad` che `lightwalletd` all'interno di BTCPay Server.

---

### Passo 3: riesegui l'installer

`. ./btcpay-setup.sh -i`

Lo script:

* Scaricherà le immagini Docker per Zebra e Lightwalletd
* Configurerà i servizi all'interno dello stack BTCPay
* Collegherà il plugin Zcash all'istanza **locale** di `lightwalletd`

> **La sincronizzazione completa della blockchain può richiedere diversi giorni**, specialmente su server VPS con poche risorse.
> Finché la sincronizzazione non è completa, i pagamenti schermati non saranno disponibili.


## Connettersi a un nodo Lightwalletd esterno

Nella maggior parte dei casi, la piena autonomia non è necessaria - e i commercianti potrebbero non voler dedicare tempo e spazio su disco all'esecuzione di un full node Zcash.  
Per impostazione predefinita, BTCPay Server si connette a un nodo `lightwalletd` pubblico per gestire i pagamenti schermati senza scaricare l'intera blockchain.

L'endpoint predefinito è:

`https://zec.rocks:443`

Tuttavia, puoi configurare BTCPay Server per connettersi a **qualsiasi nodo `lightwalletd` esterno**, come:

`https://lightwalletd.example:443`

Questa sezione mostra come farlo usando un **fragment Docker personalizzato**.

> Un esempio di configurazione completo con tutte le variabili d'ambiente è disponibile nel [repository del plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> I passaggi seguenti mostrano una configurazione minima funzionante.

---

### Passo 1: crea un fragment Docker personalizzato

Nella directory del tuo progetto BTCPayServer, crea un file fragment personalizzato:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Aggiungi il seguente contenuto:

```
exclusive:
- zcash
```

La direttiva `exclusive` garantisce che solo un fragment con la stessa etichetta (`zcash` in questo caso) possa essere attivo alla volta.
Questo previene conflitti di configurazione - ad esempio, non puoi eseguire contemporaneamente il fragment `zcash-fullnode` e questo fragment personalizzato per il `lightwalletd` esterno.
Marcandolo come `exclusive: zcash`, BTCPay Server disabiliterà automaticamente il fragment predefinito `zcash-fullnode` e i container `lightwalletd` interni, consentendoti di connetterti invece al tuo nodo esterno.

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

Aggiungi la seguente riga, sostituendo l'URL con l'endpoint che hai scelto:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Puoi usare:

* Un **nodo pubblico**, come `https://lightwalletd.zcash-infra.com`
* Il tuo nodo self-hosted, distribuito separatamente da BTCPay Server

> Se il `lightwalletd` esterno diventa non disponibile o sovraccarico, i pagamenti schermati falliranno.
> Per servizi critici, scegli un **endpoint stabile e collaudato** (come il predefinito `zec.rocks`).

> Vuoi ospitare tu stesso `lightwalletd`?
> Puoi usare il file `docker-compose.lwd.yml` dal [repository di Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Attenzione:** questa configurazione non è documentata ufficialmente e richiede una configurazione manuale di TLS, port forwarding e firewall - consigliata solo per utenti esperti.

---

### Passo 4: riesegui l'installer

`. ./btcpay-setup.sh -i`

BTCPay Server applicherà la tua configurazione personalizzata e si connetterà al nodo `lightwalletd` specificato.

D'ora in poi, il plugin Zcash utilizzerà quell'endpoint esterno per gestire le transazioni schermate.


## Ospitare BTCPay Server a casa con Cloudflare Tunnel

Vuoi accettare pagamenti Zcash ospitando BTCPay Server su un dispositivo domestico - come un Raspberry Pi 5 o qualsiasi server locale **senza un IP statico**?  
Puoi esporre in modo sicuro la tua istanza a Internet usando **Cloudflare Tunnel**.

Questo metodo evita il port forwarding e nasconde il tuo vero indirizzo IP al pubblico - mantenendo al contempo il server accessibile via HTTPS.

Ti aiuta anche a **evitare il costo del noleggio di un VPS**, il che è ideale se i pagamenti in criptovaluta sono una funzionalità opzionale piuttosto che il cuore della tua attività.

---

### Passo 1: installa Cloudflare Tunnel

1. Crea un account su [cloudflare.com](https://www.cloudflare.com) e aggiungi il tuo dominio.
2. Sul tuo **server domestico**, installa Cloudflare Tunnel:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Autenticati con Cloudflare:

`cloudflared tunnel login`

Questo comando aprirà una finestra del browser. Accedi e autorizza l'accesso al tuo dominio.
Cloudflare creerà automaticamente un file `credentials` con un token sul tuo server.

4. Crea un nuovo tunnel (puoi chiamarlo `btcpay` o come preferisci):

`cloudflared tunnel create btcpay`

Questo genera un file `btcpay.json` contenente l'ID del tunnel e le credenziali - ti servirà nel passaggio successivo.

---

### Passo 2: crea il file di configurazione del tunnel

Crea la directory di configurazione (se non esiste) e apri il file di configurazione:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Incolla la seguente configurazione:

```
tunnel: btcpay    # il nome del tuo tunnel
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # il tuo dominio
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Spiegazione:

* `tunnel` - nome del tunnel che hai creato in precedenza
* `credentials-file` - percorso del file token generato durante `cloudflared tunnel login`
* `hostname` - il tuo dominio registrato con Cloudflare (ad esempio `btcpay.example.com`)
* `service` - indirizzo locale del tuo BTCPay Server (di solito `http://127.0.0.1:80` per Nginx)

> Cloudflare farà da proxy al traffico verso il tuo server locale in modo sicuro, senza esporre il tuo IP domestico.


### Passo 3: aggiungi un record DNS per il tuo tunnel

Dopo aver creato il tunnel, Cloudflare di solito **aggiunge automaticamente un record DNS CNAME** per il tuo dominio. Dovrebbe avere questo aspetto:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Se non appare automaticamente, aggiungilo manualmente:

1. Vai alla tua [Dashboard di Cloudflare](https://dash.cloudflare.com/)
2. Vai alla sezione **DNS**
3. Aggiungi un nuovo record CNAME:
   - **Name**: `btcpay`
   - **Target**: `<UUID>.cfargotunnel.com`  
     Puoi trovare il valore esatto nel tuo file `btcpay.json` o eseguendo:
     
     `cloudflared tunnel list`
     
   - **Proxy status**: abilitato (nuvola arancione)

> Questo record garantisce che tutte le richieste a `btcpay.example.com` vengano instradate attraverso Cloudflare Tunnel, nascondendo al pubblico il tuo vero IP.

---

### Passo 4: abilita il tunnel all'avvio del sistema

Per far sì che il tunnel venga eseguito automaticamente all'avvio, installalo come servizio di sistema:

`sudo cloudflared service install`

Quindi abilita e avvia il servizio:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Controlla lo stato:

`sudo systemctl status cloudflared`

Dovresti vedere un messaggio come `Active: active (running)` e la conferma che `btcpay.example.com` è online.

> D'ora in poi, il tunnel si avvierà automaticamente a ogni riavvio, e il tuo BTCPay Server sarà accessibile pubblicamente - senza port forwarding e senza esporre il tuo vero IP.

---

### Passo 5: finalizza la configurazione di BTCPay Server

Se stai per installare BTCPay Server per la prima volta, imposta il tuo dominio prima di eseguire lo script di configurazione:

`export BTCPAY_HOST="btcpay.example.com"`

Questo garantisce che venga usato il dominio corretto quando si generano la **configurazione di Nginx** e i **certificati SSL**.

Se BTCPay Server è già installato e stai solo aggiungendo il tunnel:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

La configurazione rigenererà i file di configurazione e applicherà il nuovo dominio.
Dovresti ora essere in grado di accedere al tuo server all'indirizzo:

`https://btcpay.example.com`

> Che tu stia usando un `lightwalletd` pubblico o il tuo full node, questo non influisce sul tunnel.
> Tutto ciò che conta è che BTCPay Server sia in ascolto localmente su `127.0.0.1:80`.


## Configurare il plugin Zcash nell'interfaccia web di BTCPay Server

> **Importante per le configurazioni multi-negozio:**  
> Il wallet Zcash configurato qui è **globale** per l'istanza. Tutti i negozi useranno questo wallet a meno che tu non esegua istanze BTCPay separate.

Dopo aver distribuito con successo la tua istanza di BTCPay Server, dovrai eseguire alcune configurazioni di base tramite l'interfaccia web di amministrazione.  
La documentazione ufficiale fornisce istruzioni complete in inglese - qui vedremo i passaggi essenziali e ci concentreremo specificamente sulla configurazione del plugin Zcash.

---

### Passo 1: accedi all'interfaccia web

Visita la tua istanza all'indirizzo:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Inserisci il tuo login e la tua password di amministratore.
- Se è la prima volta che accedi, ti verrà chiesto di creare un account.
- Il primo account che registri otterrà automaticamente i privilegi di amministratore.

---

### Passo 2: installa il plugin Zcash

1. Nel menu principale, vai a:

`Plugins -> Browse Plugins`

2. Individua il plugin **Zcash (ZEC)**. Usa la barra di ricerca se necessario.
3. Clicca **Install** e conferma.

> Ripeti questo processo per qualsiasi altra altcoin che hai abilitato durante la configurazione del server.

Dopo l'installazione, clicca **Restart Server** per ricaricare l'interfaccia con i plugin attivi.


### Passo 3: collega il tuo wallet tramite Viewing Key

Dopo aver installato il plugin, apparirà una nuova sezione **Zcash** nel menu delle impostazioni.

1. Vai a:

`Zcash -> Settings`

2. Incolla la tua **Unified Full Viewing Key (UFVK)** - BTCPay deriverà un Unified Address per ogni fattura e rileverà i pagamenti schermati in entrata.

> **Nota:** le Viewing Key Sapling legacy sono supportate, ma per usare gli indirizzi Orchard/Unified dovresti fornire una **UFVK**.


   Formato di esempio:

`uview184syv9wftwngkay8d...`

3. Inserisci un valore nel campo Block height

* **Prima configurazione con un nuovo wallet (nuova frase seed):** inserisci l'attuale block height di Zcash (puoi verificarlo su 3xpl.com/zcash) - questo velocizza la scansione iniziale.
* **Migrazione sullo stesso server da una configurazione legacy solo Sapling agli Unified Address / Orchard:** lascia questo campo vuoto.
* **Spostamento del tuo negozio su un nuovo server con lo stesso wallet/UFVK:** facoltativamente inserisci la birth height - un'altezza approssimativa del primo ordine pagato del tuo negozio (fai corrispondere la data dell'ordine su 3xpl per restringere la scansione). Se non sei sicuro, lascialo vuoto.

> Non tutti i wallet supportano ancora l'esportazione della **Unified Full Viewing Key (UFVK)**.  
> Opzioni consigliate:  
> – [**YWallet**](https://ywallet.app/installation)  
> – [**Zingo! Wallet (versione per PC)**](https://zingolabs.org/)  
> In entrambe le app, cerca l'esportazione UFVK nella sezione di backup/esportazione.

Queste chiavi supportano la **rotazione automatica degli indirizzi**, il che significa:
- Ogni cliente ottiene un indirizzo di pagamento **univoco**
- Tu vedi un **unico saldo unificato**

Puoi trovare un elenco di compatibilità più ampio su [ZecHub -> Wallets](https://zechub.wiki/wallets).

Una volta compilati tutti i campi, clicca **Save**.

---

### Testa il tuo flusso di pagamento ZEC

Congratulazioni - il tuo wallet Zcash è ora collegato a BTCPay Server.

Eseguiamo un test:

1. Vai a:

`Invoices -> Create New`

2. Genera una fattura di prova per un piccolo importo in ZEC.
3. Invia i fondi da **un wallet diverso** (non quello collegato a BTCPay).
4. Una volta rilevata la transazione, la pagina della fattura mostrerà un'animazione di celebrazione.
5. Verifica che lo stato della fattura cambi in **Paid**.

Se tutto funziona - sei pronto a integrare i pagamenti ZEC nel tuo sito web usando l'API o i plugin CMS.



## Integrare BTCPay Server con il tuo sito web

Una volta collegato il tuo wallet Zcash a BTCPay Server, puoi integrare il sistema di pagamento nel tuo sito web.  
Ci sono diversi modi per farlo - dall'accesso diretto all'API ai plugin pronti all'uso per le piattaforme CMS più popolari.

---

### Opzioni di integrazione

- **Integrazione tramite API**  
  Ideale per siti web personalizzati o sistemi senza CMS.  
  Ti dà il pieno controllo sulla creazione delle fatture, sul tracciamento dei pagamenti e sulle notifiche - tutto all'interno della tua interfaccia e della tua logica.  
  Richiede conoscenze di programmazione di base, quindi questo compito è meglio affidato al tuo sviluppatore.

- **Plugin CMS**  
  Disponibili per piattaforme come **WooCommerce**, **PrestaShop** e altre.  
  Questi plugin ti permettono di accettare pagamenti in pochi minuti - senza scrivere codice.

- **Pulsante di pagamento o iframe**  
  Il metodo più semplice.  
  Perfetto per landing page, siti web personali o qualsiasi sito in cui vuoi semplicemente incorporare un link per donazioni o un widget di checkout.

---

### Integrazione tramite API

Se usi una piattaforma personalizzata (o nessun CMS), l'API è l'opzione migliore.  
Ti offre completa flessibilità: puoi creare fatture, tracciarne lo stato, ricevere notifiche e controllare completamente l'esperienza utente.

> Nota: anche alcuni plugin CMS usano l'API internamente, quindi creare una chiave API è spesso il **primo passo necessario**, indipendentemente dal tuo metodo di integrazione.

Passo successivo: genera una chiave API per il tuo negozio e inizia a usare la [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) per costruire la tua integrazione.


### Generare una chiave API

Per integrare BTCPay Server con il tuo sito web o app, dovrai generare una chiave API.

1. Accedi a BTCPay Server e apri il **menu utente** (angolo in alto a destra)
2. Vai su **API Keys**
3. Clicca **Create a new API key**
4. Inserisci un nome per la tua chiave
5. Nella sezione **Permissions**, abilita:
   - `Can create invoice`
   - `Can view invoice`
   - *(Facoltativo)* `Can modify store settings` - solo se hai bisogno della gestione a livello di negozio

6. Clicca **Generate**. La tua chiave API personale verrà visualizzata - copiala e conservala in modo sicuro.

> Questa chiave concede l'accesso alle fatture del tuo negozio.  
> Non condividerla pubblicamente e non esporla nel codice lato client.

---

### Esempio: creare una fattura tramite API

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

Riceverai un oggetto JSON con:

* `invoiceId`
* Un URL di pagamento che puoi incorporare nel tuo sito web o inviare al cliente

Vedi la documentazione completa:
[Greenfield API – Create Invoice](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Configurare un webhook (facoltativo)

Per ricevere notifiche in tempo reale quando lo stato delle fatture cambia (ad esempio quando viene ricevuto un pagamento):

1. Vai alle impostazioni del tuo negozio -> **Webhooks**
2. Aggiungi l'URL dell'endpoint del tuo backend che gestirà le richieste `POST` da BTCPay Server
3. BTCPay invierà automaticamente notifiche quando una fattura viene pagata o scade

I payload dei webhook e la logica di retry sono descritti nella [documentazione ufficiale dei webhook](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Esempi di integrazione sono disponibili per vari linguaggi di programmazione nei documenti BTCPay e nei repository GitHub.



### Integrazione CMS

BTCPay Server supporta plugin per i più popolari sistemi di gestione dei contenuti (CMS).  
L'integrazione più matura e diffusa è quella con **WordPress + WooCommerce**, che rende facile accettare pagamenti ZEC **senza scrivere codice**.

---

#### WooCommerce (WordPress)

BTCPay Server supporta ufficialmente un plugin per WooCommerce.

Passaggi per l'integrazione:

1. Installa il plugin **BTCPay for WooCommerce** dalla directory dei plugin di WordPress o da GitHub.
2. Nel pannello di amministrazione di WordPress, vai a:

`WooCommerce -> Settings -> Payments`

3. Trova **BTCPay** nell'elenco e clicca **Set up**
4. Inserisci l'URL del tuo BTCPay Server e segui le istruzioni di autorizzazione  
   (è consigliata la generazione automatica della chiave API)
5. Abilita il metodo di pagamento e salva le impostazioni

> Istruzioni dettagliate, video tutorial e guide alla risoluzione dei problemi sono disponibili nella documentazione del plugin.

Troverai anche altre opzioni di integrazione CMS in quella stessa sezione dei documenti BTCPay.

---

### Pulsante di pagamento o iframe (senza CMS o API)

Se non usi un CMS e non vuoi lavorare con le API, il modo più semplice per accettare pagamenti ZEC è **incorporare un link o un widget di pagamento** direttamente nel tuo sito web.

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

#### Opzione 2: fattura incorporata (iframe)

Per visualizzare la fattura direttamente sul tuo sito, usa un iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Puoi personalizzare lo stile del pulsante o del contenitore iframe per adattarlo al design del tuo sito - BTCPay Server consente una personalizzazione flessibile della pagina della fattura.

## Conclusione

Questa guida è stata lunga - ma copre solo gli aspetti fondamentali dell'integrazione dei pagamenti Zcash con BTCPay Server.

L'interfaccia di BTCPay Server offre molte più funzionalità di quelle mostrate qui. Fortunatamente, l'interfaccia è disponibile in più lingue (incluso il russo), il che rende facile esplorare e sperimentare ulteriormente.

BTCPay è uno strumento estremamente flessibile. Puoi:

* Ospitare più negozi indipendenti su un'unica istanza
* Definire ruoli e permessi personalizzati per i membri del team - dalla sola visualizzazione degli ordini all'amministrazione completa
* Usare i tuoi domini e il tuo branding
* Configurare webhook, wallet di riserva e persino l'accesso tramite Tor
* Configurare impostazioni avanzate come regole fiscali, codici sconto, personalizzazione della pagina di checkout, restrizioni sui metodi di pagamento e altro ancora

BTCPay è stato costruito come alternativa open-source ai fornitori di pagamenti centralizzati. Se stai cercando di accettare pagamenti privati in ZEC senza intermediari, questa piattaforma merita assolutamente la tua attenzione.

Ti auguriamo buona fortuna nell'esplorare l'ecosistema BTCPay e nel rendere i tuoi pagamenti veramente tuoi.

## Risorse

* [Sito web ufficiale di BTCPay Server](https://btcpayserver.org/)
* [FAQ di BTCPay](https://docs.btcpayserver.org/FAQ/)
* [Repository GitHub di BTCPay Server](https://github.com/btcpayserver/btcpayserver)
* [Demo Mainnet di BTCPay Server](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Plugin Zcash per BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Guida all'installazione del plugin Zcash](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Esempio di zcash-lightwalletd.custom.yml personalizzato](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [File Docker Compose di Lightwalletd (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Documentazione delle chiavi API di BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Creare un Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Elenco di compatibilità dei wallet Zcash (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd su Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
