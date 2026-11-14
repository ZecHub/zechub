<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Héberger un dépôt GitHub avec IPFS 

## Introduction

Dans ce guide, nous apprenons à créer une URL clonable avec git pour votre dépôt GitHub, servi à l'aide d'un CID IPFS. C'est utile pour garantir la disponibilité du contenu quelle que soit la région géographique, pour résister à la censure et comme sauvegarde persistante d'informations précieuses !

Remarque : les données téléversées sur IPFS sont accessibles à *tous* les utilisateurs du réseau. Vous voudrez peut-être chiffrer localement les données personnelles ou sensibles.


## Installer IPFS Kubo

Suivez les instructions d'installation fournies [ici](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Dans cet exemple, nous utilisons Linux, mais des versions pour d'autres systèmes d'exploitation sont disponibles. 

Vérifiez que l'installation a réussi avec « ipfs --version » 


## Cloner le dépôt 

Pour commencer, choisissez un dépôt Git que vous souhaitez héberger et clonez-le :

Exécutez la commande : « git clone https://github.com/zechub/zechub" »

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


Préparez-le maintenant pour qu'il puisse être cloné via IPFS.

cd zechub
git update-server-info


Décompressez les objets de Git :

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

Cela permettra à IPFS de dédupliquer les objets si vous mettez à jour le dépôt Git par la suite.


## Ajouter à IPFS 

Une fois cela fait, le dépôt est prêt à être servi. Il ne vous reste plus qu'à l'ajouter à IPFS :

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

Le CID obtenu : Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Excellent ! Votre dépôt est maintenant téléversé sur le réseau.


## Cloner avec IPFS 

Vous devriez maintenant pouvoir récupérer le dépôt github avec :

git clone http://ipfs.io/ipfs/"yourCID"

Vous pouvez également rechercher et récupérer le dépôt à l'aide de votre nœud IPFS local. 

Remarque finale : le dossier du dépôt sur IPFS n'est pas mis à jour en même temps que le véritable dépôt github. Il est recommandé de téléverser à nouveau le dossier à intervalles réguliers.
