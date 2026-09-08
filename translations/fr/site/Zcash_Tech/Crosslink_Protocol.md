<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Protocole Crosslink

## TL;DR

* Le protocole Crosslink est une conception proposée pour l’étape hybride Proof-of-Work/Proof-of-Stake (PoW/PoS) de Zcash. Il intègre le PoW à un protocole de tolérance aux fautes byzantines (BFT), permettant une finalité assurée tant que le PoW ou le PoS reste sécurisé.
* Le PoS hybride introduit des notaires qui valident les blocs en fonction des ZEC stakés — d’abord statiques, puis élus en fonction des ZEC stakés.
* Crosslink vise à fournir deux registres : un **registre finalisé (LOG_fin)** pour la sécurité face aux rollbacks, et un **registre à plus faible latence (LOG_ba)** qui l’étend de pas plus de *L* blocs.
* Un **Mode de sécurité** s’active si le registre finalisé a plus de *L* blocs de retard : le PoW continue, mais les activités économiques sont mises en pause jusqu’à résolution du problème.
* Au fil du temps, les validateurs PoS recevront une part croissante des récompenses, réduisant les gains des mineurs PoW ; le protocole introduit les changements progressivement.
* Le protocole est développé par Shielded Labs, avec une feuille de route pour intégrer Crosslink 2* dans le client Zebra de Zcash.

## Explication principale

### Introduction : le PoS hybride de Zcash et le protocole Crosslink

Le protocole Crosslink constitue une avancée majeure dans l’évolution de Zcash, l’orientant vers un modèle **Hybrid Proof-of-Stake (PoS)** et **Proof-of-Work (PoW)**. Le PoW traditionnel, bien que fiable pour assurer la sécurité du réseau, fait l’objet de critiques en raison de sa consommation d’énergie et des risques de centralisation liés au minage industriel. Crosslink introduit un système hybride, fusionnant la robustesse éprouvée du PoW avec les avantages du PoS en matière d’efficacité et de gouvernance.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Cette transition s’inscrit dans les tendances mondiales de l’innovation blockchain, où les projets se tournent vers des mécanismes durables sur le plan environnemental et décentralisés. Le modèle de consensus double de Crosslink garantit que Zcash conserve ses solides garanties cryptographiques de confidentialité tout en évoluant pour répondre aux défis contemporains.

L’approche hybride Proof-of-Stake (PoS) combine le Proof-of-Work (PoW) traditionnel avec le PoS, afin de répondre à des vulnérabilités comme les attaques à 51 % tout en maintenant la décentralisation et en réduisant la consommation d’énergie. Le PoS hybride introduit des notaires qui valident les blocs en fonction des ZEC stakés. Ce mécanisme est conçu pour améliorer la sécurité de la chaîne et la validation par points de contrôle, offrant une alternative plus robuste aux systèmes purement PoW.

### Pourquoi un PoS/PoW hybride comme premier test ?

* Il permet de progresser vers un PoS pur.
* Il permet des cas d’usage simultanés de minage et de staking ainsi que des croisements au sein de l’écosystème.
* Il atténue d’éventuels problèmes de sécurité du protocole PoS tant qu’il ne dispose pas d’une plus grande part stakée par les validateurs et d’une confiance accrue.
* L’approche générale a été démontrée par Ethereum en production.

### Ce qu’est Crosslink

Le protocole Crosslink est une conception proposée pour l’étape hybride Proof-of-Work/Proof-of-Stake (PoW/PoS) de Zcash. Il intègre le PoW à un protocole de tolérance aux fautes byzantines (BFT), permettant une finalité assurée tant que le PoW ou le PoS reste sécurisé. La conception vise à renforcer la sécurité et la décentralisation du réseau en intégrant une validation par mise sous séquestre tout en maintenant la participation des mineurs. Une caractéristique clé de la proposition, appelée Crosslink 2, simplifie l’architecture en unifiant les proposeurs BFT et les mineurs. Cette approche rationalisée minimise les changements structurels et permet l’utilisation d’une couche BFT « factice », ce qui facilite le prototypage et le déploiement tout en maintenant des normes de sécurité élevées.

Le plan d’implémentation comprend une feuille de route avec des coûts d’ingénierie estimés pour intégrer Crosslink 2* dans le client Zebra de Zcash. Ce déploiement par phases vise à équilibrer les incitations des parties prenantes, à réduire les perturbations et à s’aligner sur les objectifs de Zcash en matière d’évolutivité, d’utilisabilité et de décentralisation. La confiance croissante dans les solides propriétés de sécurité du protocole consolide encore davantage son potentiel en tant qu’étape clé de l’évolution de Zcash. En répondant aux enjeux d’efficacité énergétique et en améliorant les mécanismes de consensus, Crosslink propose une solution tournée vers l’avenir face à l’évolution des défis de la blockchain. Pour plus de détails, consultez le [dépôt GitHub](https://github.com/ShieldedLabs/crosslink-deployment) et le [forum communautaire de Zcash](https://forum.zcashcommunity.com).

### Buts et objectifs de Crosslink

Le protocole Crosslink est conçu pour répondre à plusieurs objectifs stratégiques cruciaux pour l’avenir de Zcash :

1. **Décentralisation** :
   * En intégrant le PoS, Zcash réduit sa dépendance au matériel PoW spécialisé (ASIC), qui concentre souvent la puissance de minage entre les mains de quelques grands opérateurs.
   * Le PoS permet à une communauté plus large de participer, les détenteurs de coins mettant leurs actifs en staking pour sécuriser le réseau, garantissant ainsi un consensus plus distribué.
   * En introduisant une validation fondée sur les fonds stakés, le protocole garantit que les participants économiques jouent un rôle actif dans le consensus, réduisant la dépendance au seul minage.
2. **Gouvernance renforcée** :
   * Les détenteurs de coins obtiennent des droits de vote via le staking, ce qui leur permet d’influencer les décisions concernant les mises à niveau du réseau, l’allocation des financements et les priorités de l’écosystème. Ce mécanisme démocratique aligne l’évolution du protocole sur les intérêts de la communauté.
3. **Efficacité énergétique** :
   * Une transition partielle vers le PoS réduit considérablement les besoins énergétiques, alignant Zcash sur les initiatives mondiales de durabilité. Le PoS est intrinsèquement moins gourmand en ressources que le PoW, très exigeant en calcul. Les systèmes hybrides visent à réduire la consommation d’énergie par rapport aux systèmes uniquement PoW tout en maintenant un haut niveau de sécurité.
4. **Sécurité économique et durabilité** :
   * La combinaison du PoW et du PoS diversifie les incitations économiques des participants au réseau, assurant une sécurité robuste sans dépendre excessivement d’un seul mécanisme.
   * Le staking introduit également un modèle de récompense prévisible pour les participants, créant une proposition attractive pour les investisseurs de long terme.
5. **Sécurité accrue** : Crosslink vise à renforcer la résilience du réseau face aux attaques de réorganisation de chaîne en intégrant le PoS aux côtés du PoW.

## Visuel / Analogie

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Imaginez un service de livraison de colis qui émet deux documents différents pour une même livraison. Le premier est un scan de suivi : il apparaît rapidement, vous indique où se trouve très probablement le colis, et est parfois corrigé. Le second est un reçu de livraison signé : il arrive plus tard, mais une fois qu’il existe, personne ne le conteste.

Le registre à plus faible latence est le scan de suivi, et le registre finalisé est le reçu signé. Tous deux décrivent la même chaîne d’événements ; ils diffèrent par la rapidité avec laquelle ils apparaissent et par le degré de solidité qu’ils offrent.

Le Mode de sécurité correspond à ce que fait le dépôt lorsque les reçus signés cessent d’arriver tandis que les scans continuent de s’accumuler. Les colis continuent de circuler dans le bâtiment, mais le bureau cesse d’effectuer des paiements sur la seule base des scans jusqu’à ce que les signatures rattrapent leur retard.

## Analyse approfondie

### Objectifs de sécurité et de performance de Crosslink

Le protocole Crosslink vise à fournir deux types de registres pour Zcash : un **registre finalisé (LOG_fin)** et un **registre à plus faible latence (LOG_ba)**. Le registre finalisé garantit la sécurité face aux rollbacks selon des hypothèses raisonnables concernant soit le protocole de tolérance aux fautes byzantines (BFT), soit le protocole blockchain (BC). Il est conçu pour rester vivant et sécurisé même en cas de partition du réseau, avec une latence légèrement supérieure au double de celle de la blockchain Zcash actuelle pour un nombre équivalent de confirmations de blocs.

Le registre à plus faible latence étend le registre finalisé de pas plus de *L* blocs. Il garantit la sécurité face aux rollbacks en s’appuyant uniquement sur le protocole blockchain et maintient une latence et une sécurité qui ne sont pas inférieures à celles du modèle Zcash existant. Dans la conception rationalisée Crosslink 2*, le registre à plus faible latence simplifie le développement et l’adoption en fonctionnant comme une chaîne PoW.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Disponibilité bornée et Mode de sécurité

Crosslink intègre un **Mode de sécurité** pour traiter les risques associés au fait que le registre à plus faible latence prenne beaucoup d’avance sur le registre finalisé. Cela évite les écarts, tels que des états de compte déséquilibrés ou des lacunes de sécurité non vérifiées dans des solutions temporaires mises en place par des prestataires de services. Le Mode de sécurité s’active si le registre finalisé a plus d’une constante *L* blocs de retard. Pendant cet état, la blockchain continue les opérations PoW (garantissant la sécurité de base), mais les activités économiques sont mises en pause jusqu’à ce que le problème soit résolu. Ce mécanisme est conçu pour se remettre de conditions exceptionnelles comme des attaques majeures tout en prenant en charge des politiques de rollback fondées sur la gouvernance.

### Détails techniques et déploiement

Le protocole Crosslink est activement développé et déployé par Shielded Labs en collaboration avec des partenaires clés de l’écosystème comme Zodl. L’implémentation du protocole comprend :

* La mise en place de mécanismes de staking sécurisés pour les participants PoS.
* La modification de la structure de récompense afin d’équilibrer les incitations entre mineurs et stakers.
* La garantie de la rétrocompatibilité et d’une expérience utilisateur fluide pendant la transition.
* Système de notaires : le protocole intègre des notaires qui approuvent les blocs. Au départ, des notaires statiques sont utilisés, avant une transition vers un système dynamique où les notaires sont élus en fonction des ZEC stakés.
* Logique d’activation : l’introduction de Crosslink nécessite des modifications des règles de consensus de Zcash, notamment la définition du processus de distribution du stake et la mise à jour des règles du protocole réseau pour prendre en charge le consensus hybride.
* Déploiement par phases : le protocole sera déployé par étapes afin d’assurer la stabilité du réseau et l’adaptation de la communauté. Les phases initiales se concentrent sur l’implémentation technique, suivie de l’intégration de la gouvernance pour la sélection des notaires.

Vous pouvez explorer les détails techniques et suivre sa progression via le [dépôt de déploiement Crosslink sur GitHub](https://github.com/ShieldedLabs/crosslink-deployment).

## Implications pratiques

### Impact sur les revenus des mineurs PoW

Crosslink reconnaît le rôle fondamental des mineurs PoW dans le développement initial de Zcash tout en préparant un basculement progressif :

* **Réduction des récompenses de bloc** :
  * Au fil du temps, les validateurs PoS recevront une part croissante des récompenses, réduisant les gains des mineurs PoW. Cette redistribution reflète le rôle décroissant du PoW dans le modèle hybride.
* **Transition équitable** :
  * Le protocole introduit les changements progressivement, garantissant aux mineurs suffisamment de temps pour s’adapter ou explorer de nouveaux rôles dans l’écosystème Zcash, comme la transition vers le staking ou la contribution à d’autres services du réseau.
* **Atténuation des risques de centralisation** :
  * Les pools de staking PoS sont conçus pour éviter la concentration du pouvoir, offrant aux plus petits acteurs la possibilité de participer à armes égales. Cette approche inclusive contrebalance la concentration actuelle observée dans le minage basé sur les ASIC.
* Les mineurs PoW verront leurs revenus diminuer, puisqu’une partie de la récompense de bloc est réaffectée aux validateurs PoS. Cette réaffectation garantit un système d’incitation équilibré, récompensant à la fois les mineurs et les stakers pour la sécurisation du réseau.
* Une transition progressive est prévue afin d’atténuer l’impact économique sur les mineurs tout en favorisant la participation des parties prenantes.

Ce mécanisme à double consensus renforce l’engagement de Zcash envers la confidentialité, la durabilité et la décentralisation, en le positionnant comme un leader tourné vers l’avenir dans l’univers de la blockchain.

## Erreurs courantes

**Lire Crosslink comme une règle de consensus déjà active**. Cette page décrit une conception proposée avec un plan de déploiement par phases. Son introduction nécessite des modifications des règles de consensus de Zcash, ce à quoi servent la feuille de route et le travail d’intégration dans Zebra.

**Supposer que le PoS remplace le minage**. Crosslink est une conception hybride : la production de blocs PoW continue parallèlement à la validation fondée sur le stake. Même en Mode de sécurité, la blockchain poursuit les opérations PoW tandis que les activités économiques sont mises en pause.

**Traiter la « finalité » comme une confirmation plus rapide**. Le registre finalisé est conçu avec une latence légèrement supérieure au double de celle de la blockchain Zcash actuelle pour un nombre équivalent de confirmations de blocs. Ce qu’il ajoute, c’est la sécurité face aux rollbacks, pas la vitesse — le registre à plus faible latence est la vue rapide.

**Confondre les deux registres**. LOG_ba n’est pas une chaîne distincte : il étend le registre finalisé de pas plus de *L* blocs et, dans la conception Crosslink 2*, il fonctionne comme une chaîne PoW.

## Pages liées

- [Nœud complet Zebra](/zcash-tech/zebra-full-node) — le client dans lequel Crosslink 2* devrait être intégré.
- [Nœuds complets](/zcash-tech/full-nodes) — comment les nœuds valident aujourd’hui les règles de consensus, avant tout changement vers un consensus hybride.
- [Mises à niveau du réseau](/start-here/network-upgrades) — comment les changements de règles de consensus atteignent le réseau Zcash.
- [Politique monétaire de Zcash](/start-here/zcash-monetary-policy) — la structure de récompense de bloc que Crosslink redistribuerait.

## Ressources supplémentaires

- Points de vue de la communauté : [Forum communautaire de Zcash - discussions sur Crosslink](https://forum.zcashcommunity.com)
- Mises à jour officielles : [Blog d’Electric Coin Company](https://electriccoin.co)
- Accent sur la durabilité : [Pourquoi le PoS hybride est important pour Zcash](https://forum.zcashcommunity.com)

  Référence :

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div>
