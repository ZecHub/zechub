<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pubblicare un sito web su IPFS 

![](https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg)

## Introduzione a IPFS 

IPFS (InterPlanetary File System) è un protocollo e una rete peer-to-peer progettati per creare un metodo decentralizzato di archiviazione e condivisione dei file. 

A differenza del tradizionale modello client-server di internet, IPFS consente agli utenti di condividere i file direttamente tra loro, anziché affidarsi a un server centralizzato per archiviare e distribuire i contenuti. 

I file in IPFS vengono indirizzati usando il *content-addressing*, ovvero a ogni file viene assegnato un hash univoco o CONTENT IDENTIFIER (CID) basato sul suo contenuto, e questo hash viene usato per recuperare il file dalla rete.

Quando un utente aggiunge un file a IPFS, il file viene suddiviso in piccoli pezzi chiamati blocchi, e a ogni blocco viene assegnato un CID. Questi blocchi vengono poi memorizzati su diversi nodi della rete, in modo che il file possa essere facilmente recuperato da più fonti. 

Questo garantisce ridondanza e tolleranza ai guasti, rendendo al contempo difficile per un singolo nodo diventare un single point of failure o di controllo. 

Leggi [An Introduction to IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Creare il tuo sito 

Per questo esempio creiamo un semplice sito web. 

[Sito di esempio](https://squirrel.surf)


**Passo 1:** Se non hai familiarità con il web design, scrivi il contenuto principale del tuo sito web, inclusi Titolo, Corpo principale del testo, con link ad altre pagine/siti e footer.

**Passo 2:** Usa un [template HTML!](https://nicepage.com/html-templates) Incolla il testo che hai scritto di conseguenza. Facoltativamente, puoi anche creare un foglio di stile .CSS per il tuo sito web. 

**Passo 3:** Salva la tua directory. Tutte le pagine .html + le immagini devono trovarsi nella stessa cartella. 



## Configurare un nodo

Scarica e installa IPFS dal [sito ufficiale](https://docs.ipfs.tech/install/ipfs-desktop/).



### Inizializza IPFS: 

Se stai usando l'applicazione desktop non dovrai inizializzare. 

Usando un terminale o un prompt dei comandi, esegui il comando: <mark>ipfs init </mark>. 



**Aggiungi la cartella del sito a IPFS**: 

Seleziona la cartella con i file del tuo sito web e vai all'opzione Add Folder.

![](https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png)

--

Se usi il terminale, esegui il comando: <mark>ipfs add -r "folder_name"</mark> per aggiungere ricorsivamente l'intera cartella a IPFS.


### Effettua il pin del sito su IPFS: 

Una volta aggiunti i file del tuo sito web a IPFS, devi effettuarne il **pin** per garantire che rimangano disponibili sulla rete.

--

Se usi il terminale, esegui il comando: Se usi il terminale, esegui il comando: <mark>ipfs pin add "hash"</mark> 

"hash" = CID della cartella che hai aggiunto nel passo precedente.


In alternativa, puoi anche effettuare il pin delle directory usando servizi come [Pinata](https://pinata.cloud) o [Dolpin](https://dolpin.io)

Fa risparmiare un sacco di tempo! 

--

### Accedi al tuo sito web su IPFS: 

Il tuo sito web è ora pubblicato su IPFS e può essere consultato usando l'hash della cartella. Per accedere al tuo sito web, puoi visitare https://ipfs.io/ipfs/"hash" 

"hash" = CID della cartella.

Nel nostro caso il CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS 

Interplanetary Naming System (IPNS) ti permette di aggiornare i CID IPFS associati al tuo sito web e di servire comunque un link statico. Viene fornito come chiave. 

![](https://dnslink.io/assets/dns-query.a0134a75.png)

Nel menu delle impostazioni della cartella del tuo sito nell'applicazione desktop IPFS, seleziona Publish to IPNS.  

![](https://i.ibb.co/Ch25dKf/IPNS.png)

Chiave: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Può anche essere usata per visualizzare il nostro sito tramite un gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS Link 
 
Il sito è stato creato, ora abbiamo bisogno di un modo per puntare un URL al contenuto. 

Se possiedi già un indirizzo web puoi aggiungere un nuovo record usando il record TXT "_dnslink(il tuo dominio)". A seconda del provider potrebbe popolarsi automaticamente. 

![](https://i.ibb.co/MgRxBHj/example.png)

Ci vorrà del tempo per propagarsi attraverso la rete prima di poterlo visualizzare. 

Congratulazioni! Hai configurato un sito web resistente alla censura. 


**Risorse**

[Documentazione IPFS](https://docs.ipfs.tech)

[Documentazione IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentazione DNS link](https://dnslink.io/#introduction)
