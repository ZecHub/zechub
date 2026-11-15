<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Servi il repo di GitHub con IPFS

## Introduzione

In questa guida impariamo come creare un URL clonabile con git per il tuo repository GitHub servito tramite un CID IPFS.

È utile per garantire la disponibilità dei contenuti indipendentemente dalla regione geografica, per la resistenza alla censura e come backup persistente di informazioni preziose!

Nota: i dati caricati su IPFS sono disponibili per tutti gli utenti della rete. Potresti voler crittografare localmente i dati personali/sensibili.

## Installa Kubo IPFS

Segui le istruzioni di installazione fornite [qui](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

In questo esempio usiamo Linux, sono disponibili altre versioni del sistema operativo.

Verifica che l'installazione sia andata a buon fine usando   ipfs –version

## Clona il repository

Per iniziare, seleziona un repository Git che vuoi ospitare e clonalo:

Comando da eseguire: "git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

Ora, per prepararlo alla clonazione tramite IPFS.

cd zechub git update-server-info

Decomprimi gli oggetti di Git:

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

Facendo questo, permetterai a IPFS di deduplicare gli oggetti se aggiorni il repository Git in seguito.

## Aggiungi a IPFS

Una volta fatto questo, il repository è pronto per essere servito. Non resta che aggiungerlo a IPFS:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

Il CID risultante: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Fantastico![Schermata di verifica in 2 passaggi]Ora il tuo repository è caricato sulla rete.

## Clona usando IPFS

Ora dovresti essere in grado di recuperare il repository GitHub usando:

git clone http://ipfs.io/ipfs/yourCID

In alternativa puoi cercare e recuperare usando il tuo nodo IPFS locale.

Nota finale: la cartella del repo su IPFS non viene aggiornata insieme al repository github effettivo. Si consiglia di ricaricare la cartella a intervalli regolari.
