# Pubblicare un sito web su IPFS 

![](https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg)

## Introduzione a IPFS 

IPFS (InterPlanetary File System) è un protocollo e una rete peer-to-peer progettati per creare un metodo decentralizzato di archiviazione e condivisione dei file. 

A differenza del tradizionale modello client-server di Internet, IPFS consente agli utenti di condividere i file direttamente tra loro, anziché affidarsi a un server centralizzato per archiviare e distribuire i contenuti. 

I file in IPFS sono indirizzati utilizzando il *content-addressing*, il che significa che a ogni file viene assegnato un hash unico o CONTENT IDENTIFIER (CID) basato sul suo contenuto, e questo hash viene utilizzato per recuperare il file dalla rete.

Quando un utente aggiunge un file a IPFS, il file viene suddiviso in piccoli pezzi chiamati blocchi e a ogni blocco viene assegnato un CID. Questi blocchi vengono poi memorizzati su diversi nodi della rete, in modo che il file possa essere facilmente recuperato da più fonti. 

In questo modo si garantisce la ridondanza e la tolleranza ai guasti, rendendo al contempo difficile che un singolo nodo diventi un singolo punto di guasto o di controllo. 

Leggere [Introduzione a IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Creare il sito 

Per questo esempio creiamo un semplice sito web. 

[Sito di esempio](https://squirrel.surf)


**Fase 1:** Se non avete dimestichezza con il web design, scrivete il contenuto principale del vostro sito, compresi titolo, corpo principale del testo, collegamenti ad altre pagine/sito e piè di pagina.

**Fase 2:** Utilizzare un [modello HTML!](https://nicepage.com/html-templates) Incollare il testo scritto di conseguenza. È facoltativo creare anche un foglio di stile .CSS per il vostro sito web. 

**Fase 3:** Salvare la directory. Tutte le pagine .html + le immagini devono trovarsi nella stessa cartella. 



## Impostazione di un nodo

Scaricare e installare IPFS dal [sito ufficiale](https://docs.ipfs.tech/install/ipfs-desktop/).



### Inizializzare IPFS: 

Se si utilizza l'applicazione desktop non è necessario inizializzare. 

Utilizzando un terminale o un prompt dei comandi, eseguire il comando: <mark>ipfs init </mark>. 



**Aggiungi la cartella del sito a IPFS**: 

Selezionare la cartella con i file del sito web e navigare fino all'opzione "Aggiungi cartella".

![](https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png)

--

Se si utilizza il terminale, eseguire il comando: <mark>ipfs add -r "nome_cartella"</mark> per aggiungere ricorsivamente l'intera cartella a IPFS.


### Appuntare il sito su IPFS: 

Una volta che i file del sito web sono stati aggiunti a IPFS, è necessario effettuare il **pin** per assicurarsi che rimangano disponibili sulla rete.

--

Se si usa il terminale, eseguire il comando: Se si usa il Terminale, eseguire il comando: <marca>ipfs pin add "hash"</marca> 

"hash" = CID della cartella aggiunta nel passaggio precedente.


In alternativa, è anche possibile eseguire il pin delle directory utilizzando servizi come [Pinata](https://pinata.cloud) o [Dolpin](https://dolpin.io).

Si risparmia un sacco di tempo! 

--

### Accedere al proprio sito web su IPFS: 

Il vostro sito web è ora pubblicato su IPFS e vi si può accedere usando l'hash della cartella. Per accedere al vostro sito web, potete visitare https://ipfs.io/ipfs/"hash". 

"hash" = CID della cartella.

Nel nostro caso il CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3".


## IPNS 

L'Interplanetary Naming System (IPNS) consente di aggiornare i CID IPFS associati al proprio sito web, continuando a servire un link statico. Viene fornito come chiave. 

![](https://dnslink.io/assets/dns-query.a0134a75.png)

Nel menu delle impostazioni della cartella del sito sull'applicazione desktop IPFS, selezionare Pubblica su IPNS.  

![](https://i.ibb.co/Ch25dKf/IPNS.png)

Chiave: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Può anche essere utilizzato per visualizzare il nostro sito tramite un gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## Link del DNS
 
Il sito è stato creato, ora abbiamo bisogno di un modo per puntare un URL al contenuto. 

Se si possiede già un indirizzo web, è possibile aggiungere un nuovo record utilizzando il record TXT "_dnslink(il vostro dominio)". A seconda del provider, il record può essere popolato automaticamente. 

![](https://i.ibb.co/MgRxBHj/example.png)

Ci vorrà un po' di tempo prima che il record sia visibile attraverso la rete. 

Congratulazioni! Avete creato un sito web resistente alla censura. 


**Risorse**

[Documentazione IPFS](https://docs.ipfs.tech)

[Documentazione IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentazione sui collegamenti DNS](https://dnslink.io/#introduction)