<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>


# Nœuds Lightwallet Zcash

## Introduction

Zcash, une cryptomonnaie axée sur la confidentialité, prend en charge une fonctionnalité appelée « nœuds lightwallet » qui permet aux utilisateurs d’interagir avec la blockchain Zcash sans télécharger l’historique complet de la blockchain. Cette page du wiki fournit un aperçu des nœuds lightwallet, du rôle du service « lightwalletd » dans l’écosystème Zcash, une liste actuelle des serveurs de nœuds lightwallet, ainsi que des instructions sur la manière de changer de serveur dans des portefeuilles populaires comme Ywallet et Zingo.

## Service Lightwalletd

Le service « lightwalletd », abréviation de « lightwallet daemon », joue un rôle essentiel dans l’écosystème des nœuds lightwallet de Zcash. Il agit comme un intermédiaire qui fournit aux clients légers (lightwallets) les informations dont ils ont besoin pour fonctionner efficacement. Voici une brève explication du service lightwalletd :

__Agrégateur de données__ : Lightwalletd agrège des données de la blockchain Zcash, telles que les informations sur les transactions, les données des blocs et les informations sur les pools protégés.

__Vérification simplifiée__ : Lightwalletd effectue une vérification simplifiée de ces données, permettant aux lightwallets d’accéder aux informations nécessaires sans avoir à valider l’intégralité de la blockchain.

__Préservation de la confidentialité__ : Le service préserve la confidentialité des utilisateurs de Zcash en ne leur demandant pas d’exposer leurs Viewing Key ou leurs informations personnelles de transaction.

__Synchronisation efficace__ : Lightwalletd permet une synchronisation efficace des lightwallets, réduisant considérablement le temps et les ressources nécessaires pour se mettre à jour avec la blockchain Zcash.


## Liste actuelle des serveurs Lightwalletd

* [status.zec.rocks](https://status.zec.rocks/)
* [hosh.zec.rocks](https://hosh.zec.rocks/zec)

## Changer de serveur dans les portefeuilles mobiles

Changer le serveur de nœud lightwallet est relativement simple. Trouvez et accédez aux paramètres avancés dans l’application.

__Ouvrez YWallet/Zingo/Zashi/eZcash__ : Lancez le portefeuille de votre choix sur votre appareil.

#### YWallet:

Pour YWallet, il s’agit de l’icône en forme d’engrenage dans le coin supérieur droit - Allez dans l’onglet Zcash. 

![SmartSelect_20250313_105128](https://github.com/user-attachments/assets/b0a2910b-dbdf-4292-8e69-af5a386aa183)

#### Zingo:

Pour Zingo, cela se trouve dans le menu hamburger en haut à gauche, puis cliquez sur les paramètres et faites défiler vers le bas

![SmartSelect_20250313_105737_Zingo](https://github.com/user-attachments/assets/ea8f7672-e644-41a5-a422-db131740404a)

#### Zashi:

Pour Zashi, il s’agit de l’icône en forme d’engrenage dans le coin supérieur droit - Allez dans Paramètres avancés, puis Choisir un serveur

![SmartSelect_20250313_110200_Zashi](https://github.com/user-attachments/assets/5a9d050a-8308-4cc2-907e-513072066aed)

#### eZcash

Pour eZcash, cela se trouve dans le menu hamburger en haut à gauche, puis cliquez sur Paramètres, appuyez sur Avancé

![SmartSelect_20250313_110616](https://github.com/user-attachments/assets/655c0172-61a0-4322-b8cf-4eee4bb53b51)


## Conclusion

Les nœuds lightwallet de Zcash et le service lightwalletd offrent aux utilisateurs un moyen pratique et respectueux de la confidentialité d’interagir avec la blockchain. La possibilité de changer de serveur offre une flexibilité dans le choix du nœud qui correspond le mieux à vos besoins.
