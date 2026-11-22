<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Stack: esegui un server di portafoglio leggero su Kubernetes o Docker

[Zcash Stack](https://github.com/zecrocks/zcash-stack) è il kit di deployment open source del team dietro zec.rocks. Racchiude un full node (nodo completo) Zcash, un server di portafoglio leggero ed extra opzionali (Zaino, un block explorer, un hidden service Tor, un DNS seeder, zecd, un proxy gRPC-web per i portafogli browser) in un chart Helm per Kubernetes e in file Docker Compose. I server zec.rocks lightwalletd girano tutti da questo chart. Il progetto è finanziato da [Zcash Community Grants](https://zcashcommunitygrants.org/).

Questa pagina riassume cosa distribuisce il kit, cosa ti serve prima di installarlo e le impostazioni più importanti. Fa riferimento alla versione **0.4.9** del chart (rilasciata il 13 novembre 2026). Il [README del chart](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) e le [note del workshop](https://github.com/zecrocks/zcash-stack/tree/main/docs) del progetto sono il riferimento; leggili prima di eseguire qualsiasi cosa in produzione.

## TL;DR

- **Due modi per entrare.** Un chart Helm per Kubernetes (k3s su hardware NVMe di tua proprietà è il target principale; GKE Standard e Autopilot funzionano anch'essi) e file Docker Compose per una singola macchina. Il workshop raccomanda Docker se sei alle prime armi con i server, e Kubernetes se gestisci già flotte.
- **Un nodo di chain più un server di portafoglio leggero.** La configurazione consigliata è Zebra + lightwalletd. Zakura può sostituire Zebra come backend, e Zaino può sostituire lightwalletd o affiancarlo.
- **Prevedi circa 600 GiB di disco.** Lo stato di chain di Zebra era di ~260 GiB a giugno 2026 ed è in crescita; la cache del portafoglio leggero aggiunge ~17 GiB. Una sync completa richiede giorni, quindi il chart può ripristinare da uno snapshot pubblicato.
- **Il chart blocca le versioni delle immagini.** In 0.4.9 si tratta di Zebra 7.0.0 (segue NU7), lightwalletd v0.6.1, Zakura 1.8.6 e Zaino 0.8.0. Aggiorna il chart prima degli aggiornamenti di rete e prima che un release Zakura raggiunga la sua altezza di fine supporto.
- **Registra il tuo server.** Gli operatori pubblici possono aggiungere il proprio server al monitor [hosh.zec.rocks](https://hosh.zec.rocks/zec) così portafogli e utenti possono vedere se è attivo.

## Cosa viene distribuito

Ogni componente è un interruttore nel [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) del chart. Solo lightwalletd è attivo per impostazione predefinita, e ha bisogno di un nodo di chain, quindi i file di esempio attivano anche Zebra.

| Componente | Immagine nel chart 0.4.9 | Predefinito | Cosa fa |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | off (on negli esempi) | Full node (nodo completo); valida la chain e serve RPC a tutto il resto |
| Zakura | `zakuracore/zakura:1.8.6` | off | Fork di Zebra; un backend drop-in per lightwalletd o Zaino al posto di Zebra |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | on | Server di portafoglio leggero (gRPC) per i portafogli mobile e desktop |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | off | Indicizzatore Rust che serve anche i portafogli leggeri |
| Block explorer | `emersonian/zcash-explorer:v0.0.6` | off | Explorer web che legge il JSON-RPC del nodo (Zaino non può reggerlo: serve solo gRPC) |
| Tor | `osminogin/tor-simple:0.4.9.16` | off | Pubblica lightwalletd o Zaino come servizio `.onion` |
| DNS seeder | `zfnd/dnsseeder:v1.8.0` | off | Aiuta i nuovi nodi a trovare peer |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | off | Server di portafoglio con priorità alle transazioni schermate (vedi [zecd](/zcash-tech/zecd)) |
| Proxy gRPC-web | `envoyproxy/envoy:v1.40.2` | off | Permette ai portafogli browser di parlare con lightwalletd, che i browser non possono raggiungere tramite gRPC raw |
| Portafoglio WebZjs | `ghcr.io/zecrocks/webzjs-wallet` | off | Portafoglio browser; richiede il proxy gRPC-web sullo stesso host |

Due note sulle versioni. Zaino upstream è alla versione [0.10.1](https://github.com/zingolabs/zaino/releases) mentre il chart distribuisce ancora l'immagine 0.8.0, quindi controlla `values.yaml` prima di fare affidamento sul comportamento più recente di Zaino. E i nodi Zakura si fermano sulla Mainnet a un'altezza di fine supporto per ogni release: per la 1.8.6 si tratta del blocco 3.643.309, intorno al 5 dicembre 2026, e le build x86-64 dalla 1.8.0 in poi rifiutano di avviarsi su CPU senza BMI2 e ADX. La pagina [ZakuraNodo](/zcash-tech/zakura-node) copre entrambi i casi.

## Kubernetes: prima dell'installazione

Il chart si appoggia a tre cose che imposti una volta per cluster.

1. **Un ingress controller.** Il chart crea un `Ingress` Kubernetes standard e usa per impostazione predefinita la classe `nginx`; ingress-nginx è raccomandato perché gestisce gRPC allo stesso modo su k3s e GKE. Su k3s, puoi installare k3s con `--disable traefik` oppure tenere Traefik e impostare `ingress.className: traefik` più `ingress.backendProtocol: GRPC` (il chart emette allora un `IngressRoute` Traefik, perché un Ingress semplice tramite Traefik restituisce HTTP 500 su gRPC). Su GKE, la classe ingress `gce` integrata non può instradare gRPC verso lightwalletd o Zaino.
2. **cert-manager e un ClusterIssuer** per i certificati Let's Encrypt automatici (`examples/cluster-issuer.yaml`; prova prima con l'issuer di staging). Su GKE Autopilot, installa cert-manager con `--set global.leaderElection.namespace=cert-manager`, altrimenti la creazione dell'issuer fallisce con un errore x509 "unknown authority". Puoi saltare cert-manager e puntare `<service>.ingress.tls.secretName` al tuo certificato.
3. **Una StorageClass.** `local-path` va bene su k3s con NVMe. Su GKE, dai a Zebra una classe con IOPS provisionati (il repo include un esempio Hyperdisk) e aumenta prima la quota disco regionale: i nuovi progetti GKE permettono solo 500 GB di SSD e 500 GB di Hyperdisk per regione, e un nodo di chain vuole da 300 a 500 GB, quindi il volume altrimenti resta bloccato in `Pending` con `QUOTA_EXCEEDED`. `storageClassName` non può essere modificato su uno StatefulSet esistente senza ricreare il volume.

Poi punta un record DNS per ogni hostname all'IP esterno dell'ingress controller. Se non hai ancora il DNS, aggiungi accanto al tuo hostname reale un nome [sslip.io](https://sslip.io) come `203-0-113-7.sslip.io`: si risolve nell'IP incorporato, quindi un certificato viene emesso subito. Tieni il tuo hostname come primario per i server permanenti.

## Kubernetes: installazione

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

L'esempio [`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) attiva Zebra, collega lightwalletd ad esso, dà a lightwalletd una cache da 40 GiB e un ingress TLS, e tiene l'RPC del nodo dentro il cluster. Cambia il nome utente e la password RPC segnaposto prima di installare. Altri esempi coprono testnet, GKE, GKE Autopilot con alta disponibilità, un hidden service Tor e il bootstrap sslip.io.

Per aggiornare, esegui `helm repo update`, anteprima la modifica con il plugin helm-diff (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`), poi `helm upgrade` con gli stessi argomenti. Se vieni da un chart 0.0.x, leggi prima [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md): 0.1.0 ha sostituito il vecchio setup Traefik con Ingress standard e cert-manager, e il layout dei values è cambiato.

## Dimensionamento

| | Stato stazionario | Sync iniziale | Disco |
|:--|:--|:--|:--|
| Zebra | ~0,1 vCPU, 1,6 GiB | Intenso per CPU, IOPS e memoria | ~260 GiB (giugno 2026) e in crescita; predefinito del chart 500 GiB |
| lightwalletd | ~0,15 vCPU, 165 MiB | costruisce la sua cache blocco per blocco | ~17 GiB; predefinito del chart 40 GiB |

L'intero stack richiede circa 1,5 vCPU e 4,5 GiB di memoria. Per una singola macchina il chart suggerisce 8 vCPU, 32 GiB di RAM e circa 1 TB di NVMe (su GKE, un `n2-standard-8` con un volume Hyperdisk da 500 GiB o pd-ssd). Le requests predefinite soddisfano già i minimi di GKE Autopilot, e i limiti di CPU sono lasciati disattivati così la sync può fare burst.

## Impostazioni da conoscere

**Ripristino da snapshot.** Imposta `<chain>.initSnapshot.enabled: true` (con `initSnapshot.url`, `gs://` o `https://`) per partire da uno snapshot pubblicato invece di sincronizzare dalla genesi. Il ripristino traccia il suo progresso, ripete in modo pulito un download interrotto e non cancella mai un volume sano di un'installazione precedente. Uno snapshot è una scorciatoia di fiducia: i blocchi dopo di esso vengono comunque validati, e uno snapshot difettoso si manifesta come blocchi che falliscono la validazione. Il workshop stima circa 10 giorni per una sync da zero e circa 10 ore per una partenza da snapshot.

**Scalabilità e zero downtime.** lightwalletd e Zaino sono cache leggere davanti al nodo, quindi esegui `replicas: 2` per aggiornamenti progressivi senza downtime (un PodDisruptionBudget viene aggiunto automaticamente quando le repliche sono più di 1). I nodi di chain non servono per il carico: ogni replica è un altro full node con il proprio volume e la propria sync, quindi eseguine uno, o due per ridondanza.

**Peer in entrata.** Per impostazione predefinita Zebra apre solo connessioni in uscita. `zebra.p2pPublic.enabled: true` accetta peer in entrata sulla porta 8233 (18233 su testnet) e pubblicizza il tuo indirizzo; scegli `externalAddrFrom: hostIP` su bare metal e k3s, `nodeExternalIP` sui cloud dove l'IP del nodo è privato, oppure `loadBalancer` con un IP statico riservato su GKE Autopilot.

**TLS e gRPC.** Il TLS termina all'ingress e HTTP/2 in chiaro gira dentro il cluster, quindi più hostname possono puntare a un solo lightwalletd. Tieni `path: /` con `pathType: Prefix`, perché i percorsi dei metodi gRPC ne hanno bisogno. Se il primo certificato fallisce per via del redirect HTTPS, emettilo con l'issuer di staging o imposta temporaneamente `ingress.tls.sslRedirect: "false"`.

**Hidden service Tor.** Utile quando il tuo cluster non ha un IP pubblico o un dominio:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

Leggi l'indirizzo con `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` e provalo tramite un client Tor locale con [zecping](https://github.com/zecrocks/zecping): `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**Intorno agli aggiornamenti di rete.** Zebra può bannare peer ancora su versioni vecchie e bloccarsi, scrivendo nei log che gli aggiornamenti della chain si sono bloccati. La sua ban list vive in memoria, quindi `kubectl delete pod zebra-0` la cancella; il pod torna sugli stessi dati di chain senza dover risincronizzare.

## Docker Compose

Per una singola macchina, clona il repo e avvia il file predefinito dalla cartella `docker/`:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml` esegue Zebra, lightwalletd e [Watchtower](https://containrrr.dev/watchtower/) su x86; `compose.arm.yaml` fa lo stesso su host ARM. Watchtower scarica automaticamente le nuove immagini, e il file predefinito usa il tag `zfnd/zebra:latest`, quindi il nodo segue i nuovi release di Zebra senza upgrade manuali. `compose.zaino.yaml` sostituisce lightwalletd con Zaino, ma blocca una vecchia immagine della community (`emersonian/zcash-zaino:0.1.2-zr4`), quindi controllala prima di usarla. Altri file aggiungono un front end TLS Caddy, un proxy VPS e un tunnel autossh per i nodi a casa.

Imposta `LIGHTWALLETD_DONATION_ADDRESS` nel file `.env` al tuo indirizzo unificato per pubblicarlo come indirizzo di donazione del server. Eseguendo `./download-snapshot.sh` dalla cartella `docker/` prima del primo `docker compose up` si scarica uno snapshot della chain invece di sincronizzare da zero.

## Connessione e monitoraggio

La seconda lezione del workshop copre come esporre il server: un IP statico pubblico, nascondere l'IP di casa dietro un tunnel SSH verso un VPS o Tailscale Funnel, oppure un server solo Tor. Prova il risultato puntandoci un portafoglio (in ZODL, Advanced Settings; vedi [Cambiare il server nel tuo portafoglio](/zcash-tech/lightwallet-nodes)) o chiamando `GetLightdInfo` con un client gRPC.

Per il monitoraggio, la terza lezione elenca i comandi manuali Docker e suggerisce di registrare un server pubblico su [hosh](https://hosh.zec.rocks/zec), il monitor di uptime di zec.rocks. La registrazione è una pull request che aggiunge il tuo hostname e la tua porta alla lista dei server di hosh. Aiuto per qualsiasi passo viene offerto sul [zec.rocksforum dei workshop](https://workshops.zec.rocks).

## Errori comuni

**Installare lightwalletd senza un nodo di chain.** lightwalletd legge da Zebra (o Zakura). Attivane uno, o parti da un file di esempio che lo fa.

**Lasciare le credenziali RPC d'esempio al loro posto.** Gli esempi contengono segnaposto. L'RPC resta dentro il cluster, ma cambiali comunque.

**Eseguire un nodo di chain con la quota disco predefinita di GKE.** Il volume non si lega mai. Aumenta la quota regionale prima di installare.

**Scalare Zebra per il carico.** Ogni replica di Zebra è una sync extra completa. Scala invece lightwalletd o Zaino.

**Bloccare un chart vecchio attraverso un aggiornamento di rete.** Un nodo precedente a un aggiornamento smette di seguire la Mainnet dopo di esso (Zebra richiede la 7.0.0 o successiva da NU7). Esegui `helm repo update` e aggiorna il chart prima delle altezze di attivazione e delle altezze di fine supporto di Zakura.

## Pagine correlate

- [ZcashNodi lightwallet](/zcash-tech/lightwallet-nodes): cosa un server di portafoglio leggero può e non può vedere, e i server pubblici.
- [ZebraFull node](/zcash-tech/zebra-full-node): il validatore eseguito da questo stack.
- [ZakuraNodo](/zcash-tech/zakura-node): il fork Zebra che il chart può eseguire al suo posto.
- [Zaino](/zcash-tech/zaino): l'indicizzatore Rust.
- [zecd](/zcash-tech/zecd): il server di portafoglio che il chart può aggiungere.
- [ZcashRPC e indicizzazione dei nodi](/guides/zcash-node-rpc-and-indexing): RPC Zebra, Zallet e indicizzatori.
- [Come eseguire Zebra su Akash Network](/guides/akash-network-zebra): un altro modo per ospitare un nodo.

## Risorse

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (repository, release ed esempi)
- [Zcash StackREADME del chart Helm](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [Note del workshop: sincronizzare, connettere, osservare](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [DockerREADME](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Scheda su Artifact Hub](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (monitor pubblico dei server)

**Ultimo aggiornamento:** novembre 2026 (chart 0.4.9)
