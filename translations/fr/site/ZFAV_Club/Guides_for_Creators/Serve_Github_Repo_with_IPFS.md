<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Héberger un dépôt GitHub avec IPFS

## Introduction

Dans ce guide, nous allons apprendre à créer une URL clonable avec git pour votre dépôt GitHub hébergé à l’aide d’un CID IPFS.

Ceci est utile pour garantir la disponibilité du contenu независимоamment de la région géographique, la résistance à la censure et comme sauvegarde persistante d’informations précieuses !

Remarque : les données téléversées sur IPFS sont accessibles à tous les utilisateurs du réseau. Vous pouvez souhaiter chiffrer localement les données personnelles/sensibles.

## Installer IPFS Kubo

Suivez les instructions d’installation fournies [ici](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Dans cet exemple, nous utilisons Linux, d’autres versions pour d’autres OS sont disponibles.

Vérifiez que l’installation a réussi en utilisant   ipfs –version

## Cloner le dépôt

Pour commencer, sélectionnez un dépôt Git que vous souhaitez héberger et clonez-le :

Exécutez la commande : “git clone https://github.com/zechub/zechub”

![/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

Maintenant, pour le préparer à être cloné via IPFS.

cd zechub git update-server-info

Décompressez les objets Git :

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

Cela permettra à IPFS de dédupliquer les objets si vous mettez à jour le dépôt Git plus tard.

## Ajouter à IPFS

Une fois cela fait, le dépôt est prêt à être hébergé. Il ne vous reste plus qu’à l’ajouter à IPFS :

$ pwd

/code/myrepo

$ ipfs add -r 

![/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

Le CID obtenu : Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Formidable ! Votre dépôt est maintenant téléversé sur le réseau.

## Cloner en utilisant IPFS

Vous devriez maintenant pouvoir récupérer le dépôt GitHub en utilisant :

git clone http://ipfs.io/ipfs/yourCID

Alternativement, vous pouvez le rechercher et le récupérer en utilisant votre nœud IPFS local.

Remarque finale : le dossier du dépôt sur IPFS ne reçoit pas les mises à jour en même temps que le dépôt github réel. Il est recommandé de retéléverser le dossier à intervalles réguliers.
