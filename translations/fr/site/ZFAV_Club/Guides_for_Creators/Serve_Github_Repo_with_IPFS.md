<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Héberger un dépôt GitHub avec IPFS

## Introduction

Dans ce guide, nous allons voir comment créer une URL clonable avec git pour votre dépôt GitHub, servi à l'aide d'un CID IPFS. 

Cela permet de garantir la disponibilité du contenu quelle que soit la région géographique et la résistance à la censure, et de disposer d'une sauvegarde persistante d'informations précieuses !

Remarque : les données téléversées sur IPFS sont accessibles à tous les utilisateurs du réseau. Il peut être judicieux de chiffrer localement les données personnelles ou sensibles.

## Installer IPFS Kubo

Suivez les instructions d'installation fournies [ici](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Dans cet exemple, nous utilisons Linux. Des versions pour d'autres systèmes d'exploitation sont disponibles.

Vérifiez que l'installation a réussi avec   ipfs –version

## Cloner le dépôt

Pour commencer, choisissez un dépôt Git que vous souhaitez héberger et clonez-le :

Exécutez la commande : « git clone https://github.com/zechub/zechub” »

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

Préparez-le maintenant pour qu'il puisse être cloné via IPFS.

cd zechub git update-server-info

Décompressez les objets Git :

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

Cela permettra à IPFS de dédupliquer les objets si vous mettez à jour le dépôt Git par la suite.

## Ajouter à IPFS

Une fois cela fait, le dépôt est prêt à être servi. Il ne reste plus qu'à l'ajouter à IPFS :

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

Le CID obtenu : Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Parfait ! Votre dépôt est maintenant téléversé sur le réseau.

## Cloner avec IPFS

Vous devriez maintenant pouvoir récupérer le dépôt GitHub avec :

git clone http://ipfs.io/ipfs/yourCID

Vous pouvez également le rechercher et le récupérer à l'aide de votre nœud IPFS local.

Remarque finale : le dossier du dépôt sur IPFS n'est pas mis à jour en même temps que le véritable dépôt GitHub. Il est recommandé de téléverser à nouveau le dossier à intervalles réguliers.
