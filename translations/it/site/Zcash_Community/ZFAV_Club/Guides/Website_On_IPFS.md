<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pubblicare un sito web su IPFS 

![](/content-images/IPFS-40c2e22732.webp)

## Introduzione a IPFS 

IPFS (InterPlanetary File System) è un protocollo e una rete peer-to-peer progettati per creare un metodo decentralizzato di archiviazione e condivisione dei file. 

A differenza del tradizionale modello client-server di internet, IPFS consente agli utenti di condividere i file direttamente tra loro, anziché affidarsi a un server centralizzato per archiviare e distribuire i contenuti. 

I file in IPFS vengono indirizzati usando il *content-addressing*, ovvero a ogni file viene assegnato un hash univoco o CONTENT IDENTIFIER (CID) basato sul suo contenuto, e questo hash viene usato per recuperare il file dalla rete.

IPFS memorizza i contenuti sotto forma di blocchi identificati da CID. Aggiungere un file lo memorizza sul tuo nodo, ma non lo copia automaticamente su altri nodi. Mantieni online una copia raggiungibile, oppure organizza un pinning remoto, così che altri lettori possano recuperarlo. Consulta [IPFS persistenza](https://docs.ipfs.tech/concepts/persistence/).

Leggi [An Introduction to IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Creare il tuo sito 

Per questo esempio creiamo un semplice sito web. 

[Sito di esempio](https://squirrel.surf)


**Passo 1:** Se non hai familiarità con il web design, scrivi il contenuto principale del tuo sito web, inclusi Titolo, Corpo principale del testo, con link ad altre pagine/siti e footer.

**Passo 2:** Usa un [template HTML!](https://nicepage.com/html-templates) Incolla il testo che hai scritto di conseguenza. Facoltativamente, puoi anche creare un foglio di stile .CSS per il tuo sito web. 

**Passo 3:** Metti la tua homepage in `index.html` nella cartella principale del sito. Includi le sue immagini e il CSS, usando percorsi relativi come `style.css`, così funzionano anche tramite l'URL di un gateway IPFS.

## Configurare un nodo

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) gestisce il nodo al posto tuo. Tienilo in esecuzione mentre condividi il tuo sito.

Per il [percorso da riga di comando](https://docs.ipfs.tech/how-to/command-line-quick-start/), inizializza un nuovo repository una sola volta:

```sh
ipfs init
```

Poi avvia il nodo e lascia aperto questo terminale:

```sh
ipfs daemon
```

Esegui i comandi rimanenti in un secondo terminale. Non avviare un secondo daemon se IPFS Desktop gestisce già questo repository.

**Aggiungi la cartella del sito a IPFS**: 

In IPFS Desktop, seleziona la cartella con i file del tuo sito web usando l'opzione Add Folder.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

Per la procedura da CLI, esegui questo comando dalla directory principale della cartella del tuo sito:

```sh
ipfs add -r folder_name
```

Sostituisci `folder_name` con il nome della tua cartella (metti tra virgolette i nomi che contengono spazi). Salva il CID dell'ultima riga `added ... folder_name`: identifica l'intera directory, non solo `index.html`.

### Effettua il pin del sito su IPFS: 

Il comando `ipfs add` della CLI fissa (pin) i contenuti importati in locale per impostazione predefinita. Verifica il pin della cartella con:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Sostituisci `YOUR_FOLDER_CID` con il CID del passaggio precedente; l'output dovrebbe indicare `recursive`. Il pinning protegge la copia di questo nodo dalla garbage collection, ma non mantiene online un computer spento. Per garantire la disponibilità mentre il tuo nodo è offline, organizza il [pinning remoto](https://docs.ipfs.tech/how-to/work-with-pinning-services/) e verifica che il servizio remoto abbia completato il pinning.

### Accedi al tuo sito web su IPFS: 

Prima controlla il tuo sito tramite il gateway locale all'indirizzo `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (usa la porta del gateway indicata dal tuo daemon, se è diversa). La barra finale permette ai link relativi di essere risolti all'interno della directory.

Un gateway pubblico come `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` può servirlo una volta che riesce a recuperare il contenuto da un nodo raggiungibile. Un'anteprima locale riuscita non dimostra che il sito sia disponibile pubblicamente.

Nel nostro caso il CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS 

Interplanetary Naming System (IPNS) ti permette di aggiornare i CID IPFS associati al tuo sito web e di servire comunque un link statico. Viene fornito come chiave. 

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

Nel menu delle impostazioni della cartella del tuo sito nell'applicazione desktop IPFS, seleziona Publish to IPNS.  

![](/content-images/IPNS-2fe62cc369.webp)

Chiave: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Può anche essere usata per visualizzare il nostro sito tramite un gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS link 
 
Il sito è stato creato, ora abbiamo bisogno di un modo per puntare un URL al contenuto. 

Per `example.com`, aggiungi questo record DNS, sostituendo `YOUR_FOLDER_CID` con il CID della tua directory:

| Tipo | Nome | Valore |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Alcuni provider DNS aggiungono la zona automaticamente: in quel caso inserisci solo `_dnslink`. Se usi il nome IPNS indicato sopra, il valore può invece essere `dnslink=/ipns/YOUR_IPNS_NAME`. Vedi [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

![](/content-images/example-c2a9edb28b.webp)

Dopo la propagazione DNS, prova `https://ipfs.io/ipns/example.com/`. Per servire il sito direttamente su `https://example.com/` servono anche un gateway compatibile con DNSLink e la configurazione HTTPS: il solo record TXT non li imposta. Segui la [guida al dominio personalizzato](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

Congratulazioni! Hai configurato un sito web resistente alla censura. 


**Risorse**

[Documentazione IPFS](https://docs.ipfs.tech)

[Documentazione IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentazione DNS link](https://dnslink.io/#introduction)
