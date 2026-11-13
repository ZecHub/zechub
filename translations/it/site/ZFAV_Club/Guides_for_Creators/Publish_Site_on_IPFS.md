<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pubblicare un sito su IPFS

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## Introduzione a IPFS

IPFS (InterPlanetary File System) è un protocollo e una rete peer-to-peer progettati per creare un metodo decentralizzato di archiviazione e condivisione di file.

A differenza del tradizionale modello client-server di Internet, IPFS consente agli utenti di condividere i file direttamente tra loro, anziché affidarsi a un server centralizzato per archiviare e distribuire i contenuti.

I file in IPFS sono indirizzati tramite il *content-addressing*, il che significa che a ogni file viene assegnato un hash univoco o CONTENT IDENTIFIER (CID) basato sul suo contenuto, e questo hash viene usato per recuperare il file dalla rete.

IPFS memorizza i contenuti come blocchi identificati da CID. Quando aggiungi un file, questo viene memorizzato sul tuo nodo, ma non viene copiato automaticamente su altri nodi. Mantieni online una copia raggiungibile, oppure organizza un pinning remoto, così che altri lettori possano recuperarlo. Consulta [IPFS persistenza](https://docs.ipfs.tech/concepts/persistence/).

**Leggi: [Un'introduzione a IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Creare il tuo sito

Per questo esempio creiamo un semplice sito web.

[Sito di esempio](https://squirrel.surf/)

**Passo 1:** Se non hai familiarità con il web design, scrivi il contenuto principale del tuo sito web, inclusi il titolo, il corpo principale del testo, con link ad altre pagine/siti e i piè di pagina.

**Passo 2:** Usa un [template HTML!](https://nicepage.com/html-templates) Incolla il testo che hai scritto di conseguenza. Facoltativamente, puoi anche creare un foglio di stile .CSS per il tuo sito web.

**Passo 3:** Metti la tua homepage in `index.html` nella radice della cartella del sito. Includi le sue immagini e il CSS, usando percorsi relativi come `style.css`, così funzionano anche con un URL di gateway IPFS.

## Configurare un nodo

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) gestisce il nodo al posto tuo. Tienilo in esecuzione mentre condividi il tuo sito.

Per il [percorso da riga di comando](https://docs.ipfs.tech/how-to/command-line-quick-start/), inizializza una volta un nuovo repository:

```sh
ipfs init
```

Poi avvia il nodo e lascia aperto questo terminale:

```sh
ipfs daemon
```

Esegui i comandi rimanenti in un secondo terminale. Non avviare un secondo daemon se IPFS Desktop gestisce già questo repository.

### **Aggiungere la cartella del sito a IPFS**:

In IPFS Desktop, seleziona la cartella con i file del tuo sito web usando l'opzione Add Folder.

<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

Per la procedura da riga di comando, esegui questo comando dalla cartella superiore a quella del tuo sito:

```sh
ipfs add -r folder_name
```

Sostituisci `folder_name` con il nome della tua cartella (metti tra virgolette i nomi che contengono spazi). Salva il CID nella riga finale `added ... folder_name`: identifica l'intera directory, non solo `index.html`.

### Effettuare il pin del sito su IPFS:

Per impostazione predefinita, il comando `ipfs add` della CLI esegue il pin locale dei contenuti importati. Verifica il pin della cartella con:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Sostituisci `YOUR_FOLDER_CID` con il CID del passaggio precedente; l'output dovrebbe riportare `recursive`. Il pinning protegge la copia di questo nodo dalla garbage collection, ma non mantiene online un computer spento. Per garantire la disponibilità mentre il tuo nodo è offline, configura il [pinning remoto](https://docs.ipfs.tech/how-to/work-with-pinning-services/) e verifica che il servizio remoto abbia completato il pinning.

### Accedere al tuo sito web su IPFS:

Per prima cosa controlla il tuo sito tramite il gateway locale all'indirizzo `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (se è diversa, usa la porta del gateway indicata dal tuo daemon). La barra finale permette ai link relativi di essere risolti all'interno della directory.

Un gateway pubblico come `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` può servirlo non appena riesce a recuperare il contenuto da un nodo raggiungibile. Un'anteprima locale riuscita non dimostra la disponibilità pubblica.

Nel nostro caso il CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

L'Interplanetary Naming System (IPNS) ti consente di aggiornare i CID IPFS associati al tuo sito web mantenendo comunque un link statico. Viene fornito sotto forma di chiave.


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


Nel menu delle impostazioni della cartella del tuo sito nell'applicazione IPFS desktop, seleziona Publish to IPNS.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


Chiave: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

Può anche essere usata per visualizzare il nostro sito tramite un gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS link

Il sito è stato creato, ora ci serve un modo per puntare un URL al contenuto.

Per `example.com`, aggiungi questo record DNS, sostituendo `YOUR_FOLDER_CID` con il CID della tua directory:

| Tipo | Nome | Valore |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Alcuni provider DNS aggiungono la zona automaticamente: in quel caso inserisci solo `_dnslink`. Se usi il nome IPNS indicato sopra, il valore può invece essere `dnslink=/ipns/YOUR_IPNS_NAME`. Vedi [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


Dopo la propagazione DNS, prova `https://ipfs.io/ipns/example.com/`. Per servire il sito direttamente su `https://example.com/` servono anche un gateway compatibile con DNSLink e una configurazione HTTPS: il record TXT da solo non li imposta. Segui la [guida al dominio personalizzato](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

*Congratulazioni! Ora hai un sito web resistente alla censura.*

____

**Risorse**

[Documentazione IPFS](https://docs.ipfs.tech/)

[Documentazione IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentazione DNS link](https://dnslink.io/#introduction)
