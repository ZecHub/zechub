# Zcash Avalanche RedBridge

Le Zcash Avalanche RedBridge est un pont décentralisé qui permet l’interopérabilité entre les blockchains Zcash (ZEC) et Avalanche (AVAX). Ce pont est conçu pour faciliter le transfert fluide de ZEC vers la blockchain Avalanche, en tirant parti du haut débit, des faibles frais et des mécanismes de consensus écologiques d’Avalanche tout en préservant les fonctionnalités axées sur la confidentialité de Zcash.

Le RedBridge prend en charge un large éventail de cas d’usage, notamment la finance décentralisée (DeFi) cross-chain, les transactions privées et le partage de liquidité, offrant aux détenteurs de Zcash un accès élargi à l’écosystème Avalanche. Ce pont est exploité par un ensemble de nœuds décentralisés et un oracle, connu sous le nom de **ZavaX**, qui garantit un transfert de données fiable et une vérification des prix entre Zcash et Avalanche.

### Caractéristiques principales

Interopérabilité préservant la confidentialité : permet aux utilisateurs de Zcash de conserver leur confidentialité tout en utilisant des applications DeFi sur Avalanche.
Oracle décentralisé ZavaX : intègre un système d’oracle pour garantir des données de prix ZEC/AVAX précises, permettant des opérations cross-chain sans confiance.
Évolutif et écologique : utilise le modèle de consensus d’Avalanche, offrant des transactions rapides avec un impact environnemental minimal.
Prise en charge de la DeFi et des DApps : les détenteurs de Zcash peuvent désormais participer à diverses plateformes DeFi sur Avalanche sans compromettre leur confidentialité.

### Composants techniques

**Oracle décentralisé ZavaX**
Description : l’oracle ZavaX est essentiel au pont, fournissant des flux de prix cross-chain et permettant des conversions ZEC vers AVAX sans confiance.
[Lien vers l’oracle](https://zavax-oracle.red.dev)

**Contrat de pont cross-chain**
Description : l’architecture de smart contracts prenant en charge le pont Zcash Avalanche, gérant les dépôts, les conversions et les retraits de ZEC.

**Intégration de la couche de confidentialité**
Description : garantit que les fonctionnalités de confidentialité de Zcash sont préservées tout au long du processus de pont, permettant des transactions cross-chain privées.

## Livrables et documentation

**Pont Elastic Subnet Zcash sur Avalanche** : [Proposition de subvention](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
Voici les principaux livrables et ressources techniques réalisés pour le projet Zcash Avalanche RedBridge :

Livrable 1.1 : PoC préliminaire prenant en charge l’interrogation des transactions Zcash de testnet depuis un sous-réseau Avalanche de testnet avec une CLI, publié sur Github et avec un sous-réseau à un nœud sur le testnet Avalanche. https://github.com/red-dev-inc/zavax-oracle

Livrable 2.1 : [Architecture](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### Jalons 3 31 mars 2024

Le livrable 3.1 est terminé et présente notre analyse de l’adoption de FROST au lieu de BLS pour les signatures à seuil dans le pont ZavaX. Ce changement s’appuie sur des bibliothèques auditées de la Zcash Foundation et facilite une meilleure intégration et une meilleure sécurité. https://github.com/ZcashFoundation/frost

Livrable 3.2 conception UX et UI pour l’interface graphique terminée, détaillant nos améliorations de sécurité pour le sous-réseau ZavaX Oracle, appuyées par les résultats des tests de pénétration. Pour plus de détails, y compris la configuration du serveur et les résultats des tests [Évaluation de sécurité](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[Rapport d’audit](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
En outre, l’équipe a changé de marque, passant de ZavaX à redbridge, et a remplacé son jeton de staking de ZAX à RBR.

### Jalons 4 30 avril 2024
Livrable 4.1 déploiement entièrement fonctionnel sur les testnets Zcash et Avalanche, avec un Subnet à 3 validateurs, avec prise en charge CLI

### Jalons 5 31 mai 2024
Livrable 5.1 GUI : intégration du pont dans Core ou Webapp

Jalons 6 30 juin 2024
Livrable 6.1 réussite de l’audit logiciel
Livrable 6.2 publication du code source audité dans un dépôt Github public

Jetez un œil au [dépôt Github](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)
  
Pour plus de détails techniques, les utilisateurs sont encouragés à consulter le dépôt et la documentation du projet RedBridge afin d’[explorer](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/) les spécificités de l’intégration, les frameworks de test et les protocoles de sécurité.


![img1](https://github.com/user-attachments/assets/b8c5d267-1711-458a-8a32-1df9d56fae8a)


* Livrables : 
Au T1 2025, l’équipe a annoncé le lancement du [site de démonstration red·bridge](https://redbridge-demo.red.dev/index.html), où chacun peut essayer l’expérience utilisateur, donner son avis et suggérer des améliorations. Il sert également de moyen simple pour présenter le projet à des personnes non techniques.

* L’équipe a utilisé Zebra pour la version finale de red·bridge. Pour le tester, elle a mis à niveau deux des trois nœuds de sa blockchain de test, ZavaX Oracle, qui fonctionne sur le testnet Fuji d’Avalanche. Le dernier nœud a été mis à niveau avec succès, et désormais [Zavax Oracle](https://zavax-oracle.red.dev/) fonctionne maintenant sur ZEBRA !

* Au T1 2025, le site web red.bridge a été codé pour proposer quatre vues : red, Dark, Light et Zebra, contrairement à la version initiale, qui était red.

* Un autre point est que l’équipe activera la L1 red·bridge en direct sur le mainnet Avalanche en décembre 2025. Dans un premier temps, elle servira d’oracle pour la blockchain Zcash puis, peu après, également pour Bitcoin. Dans ce cadre, chaque requête coûtera 0.001 AVAX en gas token. Cette version permettra à toute L1 ou à tout smart contract sur Avalanche d’interroger à faible coût des données provenant de Zcash et de Bitcoin de manière décentralisée.

* Au T2, l’équipe a soumis un jalon ACP-77 (connu sous le nom d’Avalanche9000) à l’Avalanche Foundation afin de rendre l’exploitation d’un guardian red.bridge plus précoce et plus abordable pour tous. Au départ, les validateurs devaient staker environ 2000 AVAX ; cependant, avec les coûts Avalanche9000, les validateurs n’avaient besoin que de 1 AVAX (mois). En outre, ce jalon finalise également le plan d’utilisation de l’implémentation FROST de ZF, qui donne à chaque Guardian une part de signature pour un contrôle sécurisé et distribué du wallet du pont.

* Aux T1 et T2 2026, red.bridge hébergerait l’airdrop de son jeton RBR (anciennement ZAX) pour les membres des communautés Zcash et Avalanche. Selon le fondateur de red.dev, ils organiseront un testnet incitatif où les utilisateurs auront la possibilité de gagner des RBR tout en aidant à tester le pont.
