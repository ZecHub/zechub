<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Servire un repository GitHub con IPFS

## Introduzione

In questa guida impariamo a creare un URL clonabile con git per il tuo repository GitHub servito tramite un CID IPFS. 

Questo è utile per garantire la disponibilità dei contenuti indipendentemente dalla regione geografica, per la resistenza alla censura e come backup persistente di informazioni preziose!

Nota: i dati caricati su IPFS sono disponibili a tutti gli utenti della rete. Potresti voler cifrare localmente i dati personali/sensibili.

## Installare IPFS Kubo

Segui le istruzioni di installazione fornite [qui](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

In questo esempio usiamo Linux, sono disponibili versioni per altri sistemi operativi.

Verifica che l'installazione sia andata a buon fine usando   ipfs –version

## Clonare il repository

Per iniziare, seleziona un repository Git che vuoi ospitare e clonalo:

Esegui il comando: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

Ora, per prepararlo a essere clonato tramite IPFS.

cd zechub git update-server-info

Decomprimi gli oggetti di Git:

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

Fare questo consentirà a IPFS di deduplicare gli oggetti se aggiornerai il repository Git in seguito.

## Aggiungere a IPFS

Una volta fatto questo, il repository è pronto per essere servito. Tutto ciò che resta da fare è aggiungerlo a IPFS:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

Il CID risultante: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Ottimo! Ora il tuo repository è caricato sulla rete.

## Clonare usando IPFS

Ora dovresti essere in grado di recuperare il repository GitHub usando:

git clone http://ipfs.io/ipfs/yourCID

In alternativa, puoi cercare e recuperare usando il tuo nodo IPFS locale.

Nota finale: la cartella del repo su IPFS non riceve aggiornamenti insieme al repository GitHub effettivo. Si consiglia di ricaricare la cartella a intervalli regolari.
