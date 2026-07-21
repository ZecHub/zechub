<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Servir un dépôt Github avec IPFS

## Introduction

Dans ce guide, nous allons apprendre à créer une URL clonable avec git pour votre dépôt Github, servie à l’aide d’un CID IPFS. Cela est utile pour garantir la disponibilité du contenu quelle que soit la région géographique, la résistance à la censure, ainsi qu’une sauvegarde persistante d’informations précieuses !

Remarque : les données téléversées sur IPFS sont accessibles à *tous* les utilisateurs du réseau. Vous pouvez souhaiter chiffrer localement les données personnelles/sensibles.


## Installer IPFS Kubo

Suivez les instructions d’installation fournies [ici](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Dans cet exemple, nous utilisons Linux, d’autres versions pour d’autres systèmes d’exploitation sont disponibles.

Vérifiez que l’installation a réussi en utilisant "ipfs --version"


## Cloner le dépôt

Pour commencer, sélectionnez un dépôt Git que vous souhaitez héberger et clonez-le :

Exécutez la commande : "git clone https://github.com/zechub/zechub"

![](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)


Maintenant, pour le préparer à être cloné via IPFS.

cd zechub
git update-server-info


Décompressez les objets de Git :

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

Cela permettra à IPFS de dédupliquer les objets si vous mettez à jour le dépôt Git ultérieurement.


## Ajouter à IPFS

Une fois cela fait, ce dépôt est prêt à être servi. Il ne reste plus qu’à l’ajouter à IPFS :

$ pwd

/code/myrepo

$ ipfs add -r .

![](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

Le CID obtenu : Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Génial ! Votre dépôt est maintenant téléversé sur le réseau.


## Cloner en utilisant IPFS

Vous devriez maintenant pouvoir récupérer le dépôt github en utilisant :

git clone http://ipfs.io/ipfs/"yourCID"

Vous pouvez également rechercher et récupérer le dépôt en utilisant votre nœud IPFS local.

Remarque finale : le dossier du dépôt sur IPFS ne reçoit pas de mises à jour en même temps que le dépôt github réel. Il est recommandé de téléverser à nouveau le dossier à intervalles réguliers.
