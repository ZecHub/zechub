<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pubblicare un sito su IPFS

<a href="">
    <img src="https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg" alt="" width="800" height="400"/>
</a>



## Introduzione a IPFS

IPFS (InterPlanetary File System) è un protocollo e una rete peer-to-peer progettati per creare un metodo decentralizzato di archiviazione e condivisione di file.

A differenza del tradizionale modello client-server di Internet, IPFS consente agli utenti di condividere i file direttamente tra loro, anziché affidarsi a un server centralizzato per archiviare e distribuire i contenuti.

I file in IPFS sono indirizzati tramite il *content-addressing*, il che significa che a ogni file viene assegnato un hash univoco o CONTENT IDENTIFIER (CID) basato sul suo contenuto, e questo hash viene usato per recuperare il file dalla rete.

Quando un utente aggiunge un file a IPFS, il file viene suddiviso in piccole parti chiamate blocchi, e a ogni blocco viene assegnato un CID. Questi blocchi vengono poi memorizzati su diversi nodi della rete, in modo che il file possa essere facilmente recuperato da più fonti.

Questo garantisce ridondanza e tolleranza ai guasti, rendendo al contempo difficile per un singolo nodo diventare un singolo punto di guasto o di controllo.

**Leggi: [Un'introduzione a IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Creare il tuo sito

Per questo esempio creiamo un semplice sito web.

[Sito di esempio](https://squirrel.surf/)

**Passo 1:** Se non hai familiarità con il web design, scrivi il contenuto principale del tuo sito web, inclusi il titolo, il corpo principale del testo, con link ad altre pagine/siti e i piè di pagina.

**Passo 2:** Usa un [template HTML!](https://nicepage.com/html-templates) Incolla il testo che hai scritto di conseguenza. Facoltativamente, puoi anche creare un foglio di stile .CSS per il tuo sito web.

**Passo 3:** Salva la tua directory. Tutte le pagine .html e le immagini devono trovarsi nella stessa cartella.

## Configurare un nodo

Scarica e installa IPFS dal [sito ufficiale](https://docs.ipfs.tech/install/ipfs-desktop/).

### Inizializzare IPFS:

Se usi l'applicazione Desktop non dovrai inizializzare.

Usando un terminale o un prompt dei comandi, esegui il comando: ipfs init

### **Aggiungere la cartella del sito a IPFS**:

Seleziona la cartella con i file del tuo sito web e vai all'opzione Add Folder.


<a href="">
    <img src="https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png" alt="" width="400" height="200"/>
</a>

–

Se usi il terminale, esegui il comando: ipfs add -r folder_name per aggiungere l'intera cartella in modo ricorsivo a IPFS.

### Effettuare il pin del sito su IPFS:

Una volta aggiunti i file del tuo sito web a IPFS, devi effettuarne il **pin** per garantire che rimangano disponibili sulla rete.

–

Se usi il terminale, esegui il comando: Se usi il terminale, esegui il comando: ipfs pin add **hash**

**hash** = CID della cartella che hai aggiunto nel passaggio precedente.

In alternativa, puoi anche effettuare il pin delle directory usando servizi come [Pinata](https://pinata.cloud/) o [Dolpin](https://dolpin.io/)

Fa risparmiare un sacco di tempo!

–

### Accedere al tuo sito web su IPFS:

Il tuo sito web è ora pubblicato su IPFS ed è accessibile usando l'hash della cartella. Per accedere al tuo sito web, puoi visitare https://ipfs.io/ipfs/**hash**

**hash** = CID della cartella.

Nel nostro caso il CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

L'Interplanetary Naming System (IPNS) ti consente di aggiornare i CID IPFS associati al tuo sito web mantenendo comunque un link statico. Viene fornito sotto forma di chiave.


<a href="">
    <img src="https://dnslink.io/assets/dns-query.a0134a75.png" alt="" width="400" height="100"/>
</a>


Nel menu delle impostazioni della cartella del tuo sito nell'applicazione IPFS desktop, seleziona Publish to IPNS.

<a href="">
    <img src="https://i.ibb.co/Ch25dKf/IPNS.png" alt="" width="400" height="200"/>
</a>


Chiave: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

Può anche essere usata per visualizzare il nostro sito tramite un gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS Link

Il sito è stato creato, ora ci serve un modo per puntare un URL al contenuto.

Se possiedi già un indirizzo web, puoi aggiungere un nuovo record usando il record TXT _dnslink(il tuo dominio). A seconda del provider, potrebbe compilarsi automaticamente.


<a href="">
    <img src="https://i.ibb.co/MgRxBHj/example.png" alt="" width="400" height="100"/>
</a>


Ci vorrà del tempo perché si propaghi attraverso la rete prima di poterlo visualizzare.

*Congratulazioni! Ora hai un sito web resistente alla censura.*

____

**Risorse**

[Documentazione IPFS](https://docs.ipfs.tech/)

[Documentazione IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentazione DNS link](https://dnslink.io/#introduction)
