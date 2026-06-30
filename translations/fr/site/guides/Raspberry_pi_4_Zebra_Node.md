<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Guide du Raspberry Pi 4 pour exécuter Zebra

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="raspberry pi" width="300" height="300"/>

Exécuter le logiciel de nœud Zebra sur un Raspberry Pi 4 vous permet de participer au réseau Zcash en tant que nœud indépendant compatible avec le consensus. Ce guide vous expliquera les étapes pour configurer et exécuter Zebra sur votre Raspberry Pi 4.

## Prérequis

1. Raspberry Pi 4 (2GB de RAM ou plus recommandés).

2. Carte MicroSD (16GB ou plus recommandés) avec Raspberry Pi OS (Raspbian) installé.

3. Connexion Internet stable.

4. Clavier, souris et moniteur (pour la configuration initiale).

5. Client SSH (optionnel, pour l'accès à distance).

## Installation

1. __Mettez à jour votre système__
   Ouvrez un terminal ou connectez-vous en SSH à votre Raspberry Pi et assurez-vous que votre système est à jour en exécutant :

   __sudo apt update__

   __sudo apt upgrade__

2. __Installez les dépendances__
   Vous devrez installer certaines dépendances nécessaires pour compiler et exécuter Zebra :

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Clonez le dépôt Zebra__
   Ouvrez un terminal et clonez le dépôt Zebra sur votre Raspberry Pi :

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Compilez Zebra__
   Pour compiler Zebra, utilisez les commandes suivantes :

   __cargo build --release__

   Ce processus peut prendre un certain temps. Assurez-vous que votre Raspberry Pi est correctement refroidi, car la compilation peut générer de la chaleur.

5. __Configuration__
   Créez un fichier de configuration pour Zebra. Vous pouvez utiliser la configuration par défaut comme point de départ :

   __cp zcash.conf.example zcash.conf__

   Modifiez le fichier zcash.conf pour personnaliser les paramètres de votre nœud. Vous pouvez spécifier le réseau, activer le minage, configurer des connexions entre pairs, et plus encore.

6. __Démarrez Zebra__
   Vous pouvez maintenant démarrer Zebra avec votre configuration personnalisée :

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   Cette commande démarrera le nœud Zebra, et il commencera à se synchroniser avec la blockchain Zcash.

7. __Surveillance__
   Vous pouvez surveiller la progression et l'état de votre nœud Zebra en ouvrant un navigateur web et en accédant à __http://127.0.0.1:8233/status__.

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="logo zebra" width="200" height="200"/>

## Dépannage

Si vous rencontrez des problèmes lors de la compilation ou de l'exécution de Zebra, consultez la [documentation Zebra](https://doc.zebra.zfnd.org/docs/intro.html) pour des conseils de dépannage et des informations supplémentaires.

Assurez-vous de garder votre Raspberry Pi au frais, car l'exécution d'un nœud peut générer de la chaleur. Vous pourriez vouloir utiliser une solution de refroidissement, comme un ventilateur ou un dissipateur thermique.

## Conclusion

En suivant ce guide, vous devriez avoir configuré et exécuté Zebra avec succès sur votre Raspberry Pi 4. Vous contribuez désormais au réseau Zcash en tant que nœud indépendant, aidant à sécuriser la confidentialité des transactions Zcash.
