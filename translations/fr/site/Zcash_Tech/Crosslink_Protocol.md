<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Protocole Crosslink

## En bref

* Le protocole Crosslink est une conception proposée pour la phase hybride preuve de travail/preuve d'enjeu (PoW/PoS) de Zcash. Il associe la PoW à un protocole de tolérance aux fautes byzantines (BFT), ce qui garantit la finalité tant que la PoW ou la PoS reste sécurisée.
* La PoS hybride introduit des notaires qui valident les blocs en fonction des ZEC mis en staking : ils sont d'abord statiques, puis élus en fonction des ZEC mis en staking.
* Crosslink vise à fournir deux registres : un **registre finalisé (LOG_fin)** qui protège contre les retours en arrière, et un **registre à plus faible latence (LOG_ba)** qui le prolonge de *L* blocs au maximum.
* Un **mode de sécurité** s'active si le registre finalisé accuse un retard de plus de *L* blocs : la PoW continue, mais les activités économiques sont suspendues jusqu'à la résolution du problème.
* Avec le temps, les validateurs PoS recevront une part croissante des récompenses, ce qui réduira les gains des mineurs PoW ; le protocole introduit les changements progressivement.
* Le protocole est développé par Shielded Labs, avec une feuille de route pour intégrer Crosslink 2* dans le client Zebra de Zcash.
* Crosslink n'est pas actif sur le réseau principal de Zcash. Il fonctionne sur le Feature Net de Shielded Labs, un réseau de test que tout le monde peut rejoindre. Consultez la section « Où en est Crosslink » ci-dessous.

## Explication principale

### Introduction : la PoS hybride de Zcash et le protocole Crosslink

Le protocole Crosslink marque une étape majeure dans l'évolution de Zcash, en l'orientant vers un modèle hybride de **preuve d'enjeu (PoS)** et de **preuve de travail (PoW)**. La PoW traditionnelle, bien que fiable pour assurer la sécurité du réseau, est critiquée pour sa consommation d'énergie et les risques de centralisation liés au minage industriel. Crosslink introduit un système hybride qui associe la robustesse éprouvée de la PoW à l'efficacité et aux avantages de gouvernance de la PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Cette transition s'inscrit dans les tendances mondiales de l'innovation blockchain, où les projets se tournent vers des mécanismes durables sur le plan environnemental et décentralisés. Le modèle de double consensus de Crosslink garantit que Zcash conserve ses solides garanties cryptographiques de confidentialité tout en évoluant pour relever les défis actuels.

L'approche de preuve d'enjeu (PoS) hybride associe la preuve de travail (PoW) traditionnelle à la PoS, afin de remédier à des vulnérabilités comme les attaques à 51 % tout en préservant la décentralisation et en réduisant la consommation d'énergie. La PoS hybride introduit des notaires qui valident les blocs en fonction des ZEC mis en staking. Ce mécanisme est conçu pour améliorer la sécurité de la chaîne et la validation des points de contrôle, et offre une alternative plus robuste aux systèmes purement PoW.

### Pourquoi une PoS/PoW hybride comme premier essai ?

* Elle constitue un progrès vers une PoS pure.
* Elle permet des cas d'utilisation simultanés du minage et du staking, ainsi qu'un rapprochement des écosystèmes.
* Elle atténue les éventuels problèmes de sécurité du protocole PoS jusqu'à ce que celui-ci dispose d'un enjeu de validateurs et d'une confiance plus importants.
* L'approche générale a été démontrée en production par Ethereum.

### Ce qu'est Crosslink

Le protocole Crosslink est une conception proposée pour la phase hybride preuve de travail/preuve d'enjeu (PoW/PoS) de Zcash. Il associe la PoW à un protocole de tolérance aux fautes byzantines (BFT), ce qui garantit la finalité tant que la PoW ou la PoS reste sécurisée. La conception vise à renforcer la sécurité et la décentralisation du réseau en intégrant une validation par staking tout en maintenant la participation des mineurs. Un élément clé de la proposition, appelé Crosslink 2, simplifie l'architecture en unifiant les proposeurs BFT et les mineurs. Cette approche simplifiée réduit au minimum les changements structurels et permet d'utiliser une couche BFT « factice », ce qui facilite le prototypage et le déploiement tout en maintenant des normes de sécurité élevées.

Le plan de mise en œuvre comprend une feuille de route avec une estimation des coûts d'ingénierie pour intégrer Crosslink 2* dans le client Zebra de Zcash. Ce déploiement par étapes vise à équilibrer les incitations des parties prenantes, à limiter les perturbations et à s'aligner sur les objectifs de Zcash en matière d'évolutivité, de facilité d'utilisation et de décentralisation. La confiance croissante dans les solides propriétés de sécurité du protocole confirme son potentiel en tant qu'étape clé de l'évolution de Zcash. En améliorant l'efficacité énergétique et les mécanismes de consensus, Crosslink offre une solution tournée vers l'avenir face aux défis changeants de la blockchain. Pour plus de détails, consultez le [dépôt GitHub](https://github.com/ShieldedLabs/zebra-crosslink) et le [forum communautaire Zcash](https://forum.zcashcommunity.com).

### Buts et objectifs de Crosslink

Le protocole Crosslink est conçu pour répondre à plusieurs objectifs stratégiques essentiels pour l'avenir de Zcash :

1. **Décentralisation** :
   * En intégrant la PoS, Zcash réduit la dépendance au matériel PoW spécialisé (ASIC), qui concentre souvent la puissance de minage entre les mains de quelques grands opérateurs.
   * La PoS permet la participation d'une communauté plus large, où les détenteurs de jetons mettent leurs actifs en staking pour sécuriser le réseau, ce qui assure un consensus plus distribué.
   * En introduisant la validation par staking, le protocole garantit que les acteurs économiques jouent un rôle actif dans le consensus, ce qui réduit la dépendance au seul minage.
2. **Gouvernance renforcée** :
   * Les détenteurs de jetons obtiennent des droits de vote grâce au staking, ce qui leur permet d'influencer les décisions concernant les mises à niveau du réseau, l'allocation des financements et les priorités de l'écosystème. Ce mécanisme démocratique aligne l'évolution du protocole sur les intérêts de la communauté.
3. **Efficacité énergétique** :
   * Le passage partiel à la PoS réduit considérablement les besoins en énergie, ce qui aligne Zcash sur les initiatives mondiales de durabilité. La PoS est par nature moins gourmande en ressources que la PoW, très exigeante en calcul. Les systèmes hybrides visent à consommer moins d'énergie que les systèmes purement PoW tout en maintenant une sécurité élevée.
4. **Sécurité et durabilité économiques** :
   * L'association de la PoW et de la PoS diversifie les incitations économiques des participants au réseau, ce qui assure une sécurité robuste sans dépendance excessive à un seul mécanisme.
   * Le staking introduit également un modèle de récompense prévisible pour les participants, ce qui constitue une proposition attrayante pour les investisseurs à long terme.
5. **Sécurité accrue** : Crosslink vise à renforcer la résilience du réseau face aux attaques de réorganisation de chaîne en intégrant la PoS aux côtés de la PoW.

## Illustration / analogie

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Imaginez un service de livraison de colis qui émet deux documents différents pour la même livraison. Le premier est un scan de suivi : il apparaît rapidement, vous indique où se trouve très probablement le colis et est parfois corrigé. Le second est un accusé de réception signé : il arrive plus tard, mais une fois qu'il existe, personne ne le conteste.

Le registre à plus faible latence correspond au scan de suivi, et le registre finalisé à l'accusé de réception signé. Tous deux décrivent la même chaîne d'événements ; ils diffèrent par la rapidité avec laquelle ils apparaissent et par leur solidité.

Le mode de sécurité correspond à ce que fait le dépôt lorsque les accusés de réception signés cessent d'arriver alors que les scans continuent de s'accumuler. Les colis continuent de circuler dans le bâtiment, mais le bureau cesse d'effectuer des paiements sur la seule base des scans jusqu'à ce que les signatures rattrapent leur retard.

## Analyse approfondie

### Objectifs de sécurité et de performance de Crosslink

Le protocole Crosslink vise à fournir deux types de registres pour Zcash : un **registre finalisé (LOG_fin)** et un **registre à plus faible latence (LOG_ba)**. Le registre finalisé garantit la protection contre les retours en arrière sous des hypothèses raisonnables concernant soit le protocole de tolérance aux fautes byzantines (BFT), soit le protocole de blockchain (BC). Il est conçu pour rester actif et sécurisé même en cas de partition du réseau, avec une latence légèrement supérieure au double de celle de la blockchain Zcash actuelle pour un nombre équivalent de confirmations de blocs.

Le registre à plus faible latence prolonge le registre finalisé de *L* blocs au maximum. Il garantit la protection contre les retours en arrière sous le seul protocole de blockchain et maintient une latence et une sécurité au moins équivalentes à celles du modèle Zcash existant. Dans la conception simplifiée Crosslink 2*, le registre à plus faible latence facilite le développement et l'adoption en fonctionnant comme une chaîne PoW.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Disponibilité bornée et mode de sécurité

Crosslink intègre un **mode de sécurité** pour parer aux risques liés à un registre à plus faible latence qui prendrait une forte avance sur le registre finalisé. Cela évite les incohérences, comme des états de compte déséquilibrés ou des failles de sécurité non vérifiées dans des solutions temporaires mises en place par des prestataires de services. Le mode de sécurité s'active si le registre finalisé accuse un retard de plus de *L* blocs, *L* étant une constante. Dans cet état, la blockchain poursuit les opérations PoW (ce qui assure une sécurité de base), mais les activités économiques sont suspendues jusqu'à la résolution du problème. Ce mécanisme est conçu pour permettre de se remettre de situations exceptionnelles, comme des attaques majeures, tout en prenant en charge des politiques de retour en arrière fondées sur la gouvernance.

### Détails techniques et déploiement

Le protocole Crosslink est activement développé et déployé par Shielded Labs en collaboration avec des partenaires clés de l'écosystème comme ZODL. La mise en œuvre du protocole comprend :

* La mise en place de mécanismes de staking sécurisés pour les participants PoS.
* La modification de la structure des récompenses afin d'équilibrer les incitations entre mineurs et stakers.
* La garantie de la rétrocompatibilité et d'une expérience utilisateur fluide pendant la transition.
* Système de notaires : le protocole intègre des notaires qui valident les blocs par leur signature. Des notaires statiques sont d'abord utilisés, avant le passage à un système dynamique où les notaires sont élus en fonction des ZEC mis en staking.
* Logique d'activation : l'introduction de Crosslink nécessite des modifications des règles de consensus de Zcash, notamment la définition du processus de distribution des enjeux et la mise à jour des règles du protocole réseau pour prendre en charge le consensus hybride.
* Déploiement par étapes : le protocole sera déployé progressivement afin d'assurer la stabilité du réseau et l'adaptation de la communauté. Les premières phases portent sur la mise en œuvre technique, suivie de l'intégration de la gouvernance pour la sélection des notaires.

Le prototype antérieur et sa documentation se trouvent dans le [dépôt zebra-crosslink sur GitHub](https://github.com/ShieldedLabs/zebra-crosslink) et dans [le livre zebra-crosslink](https://shieldedlabs.github.io/zebra-crosslink/). Les travaux actuels sont décrits dans la section suivante.

### Où en est Crosslink

Crosslink n'est encore qu'une proposition. La [FAQ Crosslink](https://shieldedlabs.net/crosslink-faq/) de Shielded Labs indique qu'il « devrait passer par le processus de gouvernance standard de Zcash » avant de pouvoir être activé sur le réseau principal.

Ce qui existe aujourd'hui, c'est le **Feature Net** : un réseau de test géré par Shielded Labs, avec son propre jeton de test, le cTAZ, sur lequel tout le monde peut miner, faire du staking et exécuter un finaliseur. La [version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), publiée le 1er octobre 2026, démarre en simple preuve de travail et active Crosslink par étapes : le staking à partir du bloc 20 736, la première liste de finaliseurs établie au bloc 34 560 et la finalité BFT à partir du bloc 36 288 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)).

Deux points de cette page ont évolué depuis sa rédaction :

* **Le rôle appelé ici notaire s'appelle finaliseur** dans le logiciel et les notes de version de Shielded Labs. Les stakers délèguent des jetons à un finaliseur, et les finaliseurs disposant du plus grand enjeu votent pour finaliser les blocs.
* **Le code a déménagé.** Le dépôt zebra-crosslink mentionné ci-dessus a été mis à jour pour la dernière fois en avril 2026. Les versions de Feature Net proviennent de [crosslink_monolith](https://github.com/ShieldedLabs/crosslink_monolith/releases), et la conception est décrite dans le [livre Crosslink](https://shieldedlabs.github.io/crosslink_book/).

Pour l'essayer vous-même, suivez le guide [Crosslink Feature Net](/guides/crosslink-feature-net). Pour observer le réseau sans rien exécuter, ouvrez l'onglet Crosslink sur [Outils ZecHub](https://zechub.wiki/tools?tool=crosslink).

## Implications pratiques

### Impact sur les revenus des mineurs PoW

Crosslink reconnaît le rôle fondamental des mineurs PoW dans les débuts de Zcash tout en préparant une transition progressive :

* **Réduction des récompenses de bloc** :
  * Avec le temps, les validateurs PoS recevront une part croissante des récompenses, ce qui réduira les gains des mineurs PoW. Cette redistribution reflète le rôle décroissant de la PoW dans le modèle hybride.
* **Transition équitable** :
  * Le protocole introduit les changements progressivement, afin que les mineurs disposent de suffisamment de temps pour s'adapter ou explorer de nouveaux rôles au sein de l'écosystème Zcash, par exemple en passant au staking ou en contribuant à d'autres services du réseau.
* **Atténuation des risques de centralisation** :
  * Les pools de staking PoS sont conçus pour empêcher la concentration du pouvoir, en offrant aux petits acteurs la possibilité de participer sur un pied d'égalité. Cette approche inclusive contrebalance la concentration actuelle observée dans le minage à base d'ASIC.
* Les mineurs PoW verront leurs revenus diminuer, car une partie de la récompense de bloc sera réattribuée aux validateurs PoS. Cette réattribution garantit un système d'incitations équilibré, qui récompense à la fois les mineurs et les stakers pour la sécurisation du réseau.
* Une transition progressive est prévue afin d'atténuer l'impact économique sur les mineurs tout en favorisant la participation des parties prenantes.

Ce mécanisme de double consensus renforce l'engagement de Zcash en faveur de la confidentialité, de la durabilité et de la décentralisation, et le positionne comme un acteur tourné vers l'avenir dans l'univers de la blockchain.

## Erreurs courantes

**Considérer Crosslink comme une règle de consensus active**. Cette page décrit une conception proposée assortie d'un plan de déploiement par étapes. Son introduction nécessite des modifications des règles de consensus de Zcash : c'est précisément l'objet de la feuille de route et des travaux d'intégration dans Zebra.

**Supposer que la PoS remplace le minage**. Crosslink est une conception hybride : la production de blocs PoW se poursuit parallèlement à la validation par staking. Même en mode de sécurité, la blockchain poursuit les opérations PoW pendant que les activités économiques sont suspendues.

**Assimiler la « finalité » à une confirmation plus rapide**. Le registre finalisé est conçu pour une latence légèrement supérieure au double de celle de la blockchain Zcash actuelle pour un nombre équivalent de confirmations de blocs. Ce qu'il apporte, c'est la protection contre les retours en arrière, pas la rapidité : la vue rapide est celle du registre à plus faible latence.

**Confondre les deux registres**. LOG_ba n'est pas une chaîne distincte : il prolonge le registre finalisé de *L* blocs au maximum et, dans la conception Crosslink 2*, il fonctionne comme une chaîne PoW.

## Pages associées

- [Crosslink Feature Net](/guides/crosslink-feature-net) : installez l'application de bureau Feature Net, mettez des jetons en staking auprès d'un finaliseur et vérifiez votre position.
- [Nœud complet Zebra](/zcash-tech/zebra-full-node) : le client dans lequel il est prévu d'intégrer Crosslink 2*.
- [Nœuds complets](/zcash-tech/full-nodes) : comment les nœuds valident aujourd'hui les règles de consensus, avant tout passage à un consensus hybride.
- [Mises à niveau du réseau](/start-here/network-upgrades) : comment les modifications des règles de consensus parviennent au réseau Zcash.
- [Politique monétaire de Zcash](/start-here/zcash-monetary-policy) : la structure des récompenses de bloc que Crosslink redistribuerait.

## Ressources supplémentaires

- Discussion communautaire : [Crosslink : Feature Net incitatif, sur le forum communautaire Zcash](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)
- Mises à jour officielles : [Crosslink sur Shielded Labs](https://shieldedlabs.net/crosslink/) et les [versions de Feature Net](https://github.com/ShieldedLabs/crosslink_monolith/releases)
- Référence de conception : [Le livre Crosslink](https://shieldedlabs.github.io/crosslink_book/)

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
