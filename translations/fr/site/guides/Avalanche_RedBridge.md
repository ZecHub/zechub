# Zcash Avalanche RedBridge

Le Zcash Avalanche RedBridge est un pont décentralisé qui assure l'interopérabilité entre les blockchains Zcash (ZEC) et Avalanche (AVAX). Ce pont est conçu pour faciliter le transfert fluide de ZEC vers la blockchain Avalanche. Il tire parti du débit élevé, des frais réduits et des mécanismes de consensus écologiques de Avalanche, tout en préservant les fonctionnalités de Zcash axées sur la confidentialité.

Le RedBridge prend en charge de nombreux cas d'utilisation, dont la finance décentralisée (DeFi) inter-chaînes, les transactions privées et le partage de liquidité. Il donne ainsi aux détenteurs de Zcash un accès élargi à l'écosystème Avalanche. Ce pont fonctionne grâce à un ensemble de nœuds décentralisés et à un oracle appelé **ZavaX**, qui garantit la fiabilité du transfert de données et de la vérification des prix entre Zcash et Avalanche.

### Fonctionnalités clés

Interopérabilité préservant la confidentialité : permet aux utilisateurs de Zcash de conserver leur confidentialité lorsqu'ils utilisent des applications DeFi sur Avalanche.
Oracle décentralisé ZavaX : intègre un système d'oracle qui garantit l'exactitude des données de prix ZEC/AVAX et permet des opérations inter-chaînes sans tiers de confiance.
Évolutif et écologique : s'appuie sur le modèle de consensus d'Avalanche pour offrir des transactions à haute vitesse avec un impact environnemental minimal.
Prise en charge de la DeFi et des DApps : les détenteurs de Zcash peuvent désormais participer à diverses plateformes DeFi sur Avalanche sans sacrifier leur confidentialité.

### Composants techniques

**ZavaX Oracle décentralisé**
Description : le ZavaX Oracle joue un rôle essentiel dans le pont. Il fournit des flux de prix inter-chaînes et permet des conversions de ZEC vers AVAX sans tiers de confiance.
[Lien vers l'oracle](https://zavax-oracle.red.dev)

**Contrat du pont inter-chaînes**
Description : l'architecture de contrats intelligents qui sous-tend le pont Zcash Avalanche et gère les dépôts, les conversions et les retraits de ZEC.

**Intégration de la couche de confidentialité**
Description : garantit que les fonctionnalités de confidentialité de Zcash sont préservées tout au long du processus de transfert par le pont, ce qui permet des transactions inter-chaînes privées.

## Livrables et documentation

**Pont de sous-réseau élastique Zcash sur Avalanche** : [Proposition de subvention](https://forum.zcashcommunity.com/t/zcash-elastic-subnet-bridge-on-avalanche/44220)
Voici les principaux livrables et ressources techniques réalisés pour le projet Zcash Avalanche RedBridge :

Livrable 1.1 : preuve de concept préliminaire permettant d'interroger des transactions Zcash du testnet depuis un sous-réseau Avalanche du testnet à l'aide d'une interface en ligne de commande, publiée sur GitHub et accompagnée d'un sous-réseau à un seul nœud sur le testnet Avalanche. https://github.com/red-dev-inc/redbridge-oracle

Livrable 2.1 : [Architecture](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)


### Jalon 3 : 31 mars 2024

Le livrable 3.1 est terminé. Il présente notre analyse sur l'adoption de FROST plutôt que BLS pour les signatures à seuil dans le pont ZavaX. Ce changement s'appuie sur des bibliothèques auditées de la Zcash Foundation et améliore l'intégration et la sécurité. https://github.com/ZcashFoundation/frost

Livrable 3.2 : conception UX et UI de l'interface graphique terminée. Ce livrable détaille nos améliorations de sécurité pour le sous-réseau ZavaX Oracle, étayées par les résultats de tests d'intrusion. Pour plus de détails, notamment sur la configuration des serveurs et les résultats des tests : [Évaluation de sécurité](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/deployment-notes.md)
[Rapport d'audit](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/pen-testing-report-2024-09.md)
Par ailleurs, l'équipe a changé de nom, passant de ZavaX à redbridge, et a remplacé son jeton de staking ZAX par RBR.

### Jalon 4 : 30 avril 2024
Livrable 4.1 : déploiement entièrement fonctionnel sur les testnets Zcash et Avalanche, avec un sous-réseau à 3 validateurs et la prise en charge de l'interface en ligne de commande

### Jalon 5 : 31 mai 2024
Livrable 5.1 : interface graphique, intégration du pont dans Core ou dans une application web

Jalon 6 : 30 juin 2024
Livrable 6.1 : réussite de l'audit logiciel
Livrable 6.2 : publication du code source audité dans un dépôt GitHub public

Consultez le [GitHub dépôt](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)
  
Pour plus de détails techniques, nous vous invitons à consulter le dépôt et la documentation du projet RedBridge afin d'[explorer](https://github.com/red-dev-inc/red-bridge) les spécificités de l'intégration, les cadres de test et les protocoles de sécurité.


![img1](/content-images/b8c5d267-1711-458a-8a32-1df9d56fae8a-a93ff66932.webp)


* Livrables : 
Au premier trimestre 2025, l'équipe a annoncé le lancement du [red·bridge site web de démonstration](https://redbridge-demo.red.dev/index.html). Chacun peut y tester l'expérience utilisateur, donner son avis et suggérer des améliorations. Ce site permet aussi de présenter facilement le projet aux personnes sans connaissances techniques.

* L'équipe a utilisé Zebra pour la version finale de red·bridge. Pour la tester, elle a mis à niveau deux des trois nœuds de sa blockchain de test, ZavaX Oracle, qui fonctionne sur le testnet Fuji de Avalanche. Le dernier nœud a été mis à niveau avec succès : [ZavaX Oracle](https://web.archive.org/web/20260823181644/https://zavax-oracle.red.dev/) fonctionne désormais sur Zebra !

* Au premier trimestre 2025, le site web de red.bridge a été développé pour proposer quatre affichages : red, Dark, Light et Zebra, alors que la version initiale ne proposait que red.

* Par ailleurs, l'équipe activera la L1 red·bridge sur le mainnet Avalanche en décembre 2025. Elle servira d'abord d'oracle pour la blockchain Zcash, puis, peu après, pour Bitcoin également. Chaque requête coûtera 0,001 AVAX en jeton de gas. Cette version permettra à n'importe quelle L1 ou n'importe quel contrat intelligent sur Avalanche d'interroger à moindre coût les données de Zcash et de Bitcoin de manière décentralisée.

* Au deuxième trimestre, l'équipe a soumis à la Fondation Avalanche un jalon portant sur l'ACP-77 (connu sous le nom d'Avalanche9000), afin de rendre l'exploitation d'un gardien red.bridge possible plus tôt et plus abordable pour tous. Au départ, les validateurs devaient miser environ 2000 AVAX. Avec les coûts d'Avalanche9000, il ne leur faut plus que 1 AVAX (par mois). Ce jalon finalise aussi le plan d'utilisation de l'implémentation FROST de la ZF, qui attribue à chaque gardien une part de signature pour un contrôle sécurisé et distribué du portefeuille du pont.

* Aux premier et deuxième trimestres 2026, red.bridge organisera l'airdrop de son jeton RBR (anciennement ZAX) pour les membres des communautés Zcash et Avalanche. Selon le fondateur de red.dev, un testnet incitatif sera mis en place, où les utilisateurs pourront gagner des RBR tout en aidant à tester le pont.
