# Serve Github Repo with IPFS 

## Introduzione

In questa guida impareremo come creare un URL clonabile di git per il tuo repository Github utilizzando un CID IPFS. Questo è utile per garantire la disponibilità dei contenuti indipendentemente dalla regione geografica, resistenza alla censura e come backup persistente di informazioni preziose!

Nota: I dati caricati su IPFS sono disponibili per *tutti* gli utenti della rete. Si consiglia di criptare localmente i dati personali/sensibili.


## Installa IPFS Kubo

Segui le istruzioni di installazione fornite [qui](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

In questo esempio usiamo Linux, sono disponibili altre versioni di OS.

Verifica che l'installazione sia stata eseguita con successo utilizzando "ipfs --version"


## Clona il Repository

Per iniziare, seleziona un repository Git che vuoi ospitare e clonalo:

Esegui il comando:  "git clone https://github.com/zechub/zechub"

![](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)


Ora, per prepararlo a essere clonato tramite IPFS.

cd zechub
git update-server-info

Decomprimi gli oggetti di Git:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f .pack objects/pack/

Questo permetterà a IPFS di de-duplicare gli oggetti se aggiornerai il repository Git in seguito.


## Aggiungi a IPFS 

Una volta fatto questo, il repository è pronto per essere utilizzato. Tutto ciò che resta da fare è aggiungerlo a IPFS:

$ pwd

/code/myrepo

$ ipfs add -r .

![](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

Il CID risultante: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Fantastico! Ora il repository è caricato sulla rete.


## Clonare usando IPFS 

Ora si dovrebbe essere in grado di recuperare il repository github utilizzando:

git clone http://ipfs.io/ipfs/"tuoCID"

In alternativa, è possibile cercare e recuperare il repository utilizzando il nodo IPFS locale. 

Nota finale: la cartella repo su IPFS non riceve aggiornamenti insieme al repository github vero e proprio. Si consiglia di ricaricare la cartella a intervalli regolari.