### Protocole Crosslink

#### **Introduction : Zcash Hybrid PoS et le protocole Crosslink**

Le protocole Crosslink constitue une avancée majeure dans l’évolution de Zcash, l’orientant vers un modèle **Hybrid Proof-of-Stake (PoS)** et **Proof-of-Work (PoW)**. Le PoW traditionnel, bien que fiable pour garantir la sécurité du réseau, fait l’objet de critiques en raison de sa consommation énergétique et des risques de centralisation associés au minage industriel. Crosslink introduit un système hybride, fusionnant la robustesse éprouvée du PoW avec les avantages du PoS en matière d’efficacité et de gouvernance.

![image](https://github.com/user-attachments/assets/a2ffb19d-e570-4723-b669-a66e14fc6b71)

Cette transition s’aligne sur les tendances mondiales de l’innovation blockchain, où les projets évoluent vers des mécanismes durables sur le plan environnemental et décentralisés. Le double modèle de consensus de Crosslink garantit que Zcash conserve ses solides garanties de confidentialité cryptographique tout en évoluant pour répondre aux défis contemporains.

L’approche Hybrid Proof-of-Stake (PoS) combine le Proof-of-Work (PoW) traditionnel avec le PoS, dans le but de répondre à des vulnérabilités comme les attaques à 51 % tout en maintenant la décentralisation et en réduisant la consommation d’énergie. Le Hybrid PoS introduit des notaires qui valident les blocs sur la base de ZEC stakés. Ce mécanisme est conçu pour améliorer la sécurité de la chaîne et la validation des checkpoints, en offrant une alternative plus robuste aux systèmes purement PoW​.

Pourquoi Hybrid PoS/PoW comme premier test ?
Cela permet de progresser vers un PoS pur
Cela permet des cas d’usage concurrents entre minage et staking ainsi que des passerelles entre écosystèmes.
Cela atténue les éventuels problèmes de sécurité du protocole PoS tant qu’il ne dispose pas d’une plus grande part de stake validateur et d’une confiance accrue.
L’approche générale a été démontrée par Ethereum en production

---


### CROSSLINK
Le protocole Crosslink est une proposition de conception pour l’étape hybride Proof-of-Work/Proof-of-Stake (PoW/PoS) de Zcash. Il intègre le PoW à un protocole de Byzantine Fault Tolerance (BFT), permettant une finalité assurée tant que le PoW ou le PoS reste sécurisé. La conception vise à renforcer la sécurité et la décentralisation du réseau en intégrant une validation par stake tout en maintenant la participation des mineurs. Une caractéristique clé de la proposition, appelée Crosslink 2, simplifie l’architecture en unifiant les proposeurs BFT et les mineurs. Cette approche rationalisée minimise les changements structurels et permet l’utilisation d’une couche BFT « dummy », ce qui facilite le prototypage et le déploiement tout en maintenant des normes de sécurité élevées.

Le plan d’implémentation comprend une feuille de route avec des coûts d’ingénierie estimés pour intégrer Crosslink 2* dans le client Zebra de Zcash. Ce déploiement par phases vise à équilibrer les incitations des parties prenantes, à réduire les perturbations et à s’aligner sur les objectifs de Zcash en matière de scalabilité, d’utilisabilité et de décentralisation. La confiance croissante dans les solides propriétés de sécurité du protocole renforce encore son potentiel en tant qu’étape clé de l’évolution de Zcash. En répondant aux enjeux d’efficacité énergétique et en améliorant les mécanismes de consensus, Crosslink propose une solution tournée vers l’avenir face à l’évolution des défis de la blockchain. Pour plus de détails, consultez le [dépôt GitHub](https://github.com/ShieldedLabs/crosslink-deployment) et le [Forum communautaire Zcash](https://forum.zcashcommunity.com).

![image](https://github.com/user-attachments/assets/b34afda4-fe33-448f-b0dd-279fd6cef1f5)


#### **Objectifs et finalités de Crosslink**

Le protocole Crosslink est conçu pour répondre à plusieurs objectifs stratégiques cruciaux pour l’avenir de Zcash :

1. **Décentralisation** :
   - En intégrant le PoS, Zcash réduit sa dépendance au matériel PoW spécialisé (ASICs), qui concentre souvent la puissance de minage entre les mains de quelques grands opérateurs.
   - Le PoS permet une participation d’une communauté plus large, où les détenteurs de coins stakent leurs actifs pour sécuriser le réseau, garantissant ainsi un consensus plus distribué.
   - En introduisant une validation par stake, le protocole garantit que les participants économiques jouent un rôle actif dans le consensus, réduisant la dépendance au seul minage.

2. **Gouvernance renforcée** :
   - Les détenteurs de coins obtiennent des droits de vote grâce au staking, ce qui leur permet d’influencer les décisions concernant les mises à niveau du réseau, l’allocation des financements et les priorités de l’écosystème. Ce mécanisme démocratique aligne l’évolution du protocole sur les intérêts de la communauté.

3. **Efficacité énergétique** :
   - Une transition partielle vers le PoS réduit significativement les besoins énergétiques, alignant Zcash sur les initiatives mondiales de durabilité. Le PoS est intrinsèquement moins gourmand en ressources que le PoW, lourd en calculs. Les systèmes hybrides visent à réduire la consommation d’énergie par rapport aux systèmes uniquement PoW tout en maintenant une sécurité élevée​

4. **Sécurité économique et durabilité** :
   - La combinaison du PoW et du PoS diversifie les incitations économiques pour les participants du réseau, garantissant une sécurité robuste sans dépendre excessivement d’un seul mécanisme.
   - Le staking introduit également un modèle de récompense prévisible pour les participants, créant une proposition attrayante pour les investisseurs de long terme.
 
5. Sécurité accrue : Crosslink vise à renforcer la résilience du réseau face aux attaques de réorganisation de chaîne en intégrant le PoS aux côtés du PoW.

### Objectifs de sécurité et de performance de Crosslink

Le protocole Crosslink vise à fournir deux types de registres pour Zcash : un **registre finalisé (LOG_fin)** et un **registre à plus faible latence (LOG_ba)**. Le registre finalisé garantit la sécurité contre les rollbacks selon des hypothèses raisonnables concernant soit le protocole Byzantine Fault Tolerance (BFT), soit le protocole blockchain (BC). Il est conçu pour rester vivant et sécurisé même en cas de partition du réseau, avec une latence légèrement supérieure au double de celle de la blockchain Zcash actuelle pour un nombre équivalent de confirmations de blocs.

Le registre à plus faible latence prolonge le registre finalisé de pas plus de *L* blocs. Il garantit la sécurité contre les rollbacks sur la base du seul protocole blockchain et maintient une latence et une sécurité qui ne sont pas inférieures au modèle Zcash existant. Dans la conception rationalisée Crosslink 2*, le registre à plus faible latence simplifie le développement et l’adoption en fonctionnant comme une chaîne PoW.

![image](https://github.com/user-attachments/assets/fd039664-4852-4fb0-8c88-0615f1ed116e)


### Disponibilité bornée et mode sécurité

Crosslink intègre un **mode sécurité** pour répondre aux risques associés à un registre à plus faible latence qui prendrait trop d’avance sur le registre finalisé. Cela évite des divergences, telles que des états de compte déséquilibrés ou des failles de sécurité non vérifiées dans des solutions temporaires mises en place par des prestataires de services. Le mode sécurité est activé si le registre finalisé prend plus de *L* blocs de retard. Pendant cet état, la blockchain poursuit les opérations PoW (garantissant une sécurité de base), mais les activités économiques sont mises en pause jusqu’à la résolution du problème. Ce mécanisme est conçu pour permettre une reprise après des conditions exceptionnelles comme des attaques majeures tout en soutenant des politiques de rollback fondées sur la gouvernance.

---

#### **Impact sur les revenus des mineurs PoW**

Crosslink reconnaît le rôle fondamental des mineurs PoW dans le développement initial de Zcash tout en préparant une évolution progressive :

- **Réduction des récompenses de bloc** :
   - Au fil du temps, les validateurs PoS recevront une part croissante des récompenses, réduisant les gains des mineurs PoW. Cette redistribution reflète le rôle décroissant du PoW dans le modèle hybride.
   
- **Transition équitable** :
   - Le protocole introduit les changements progressivement, garantissant aux mineurs un temps suffisant pour s’adapter ou explorer de nouveaux rôles au sein de l’écosystème Zcash, comme la transition vers le staking ou la contribution à d’autres services réseau.

- **Atténuation des risques de centralisation** :
   - Les pools de staking PoS sont conçus pour éviter la concentration du pouvoir, offrant aux petits acteurs la possibilité de participer à égalité. Cette approche inclusive contrebalance la concentration actuelle observée dans le minage basé sur les ASICs.

- Les mineurs PoW verront leurs revenus diminuer, car une partie de la récompense de bloc sera réaffectée aux validateurs PoS. Cette réallocation garantit un système d’incitation équilibré, récompensant à la fois les mineurs et les stakers pour la sécurisation du réseau.
- Une transition progressive est prévue pour atténuer l’impact économique sur les mineurs tout en favorisant la participation des parties prenantes​

---

#### **Détails techniques et déploiement**

Le protocole Crosslink est activement développé et déployé par Shielded Labs en collaboration avec des partenaires clés de l’écosystème tels que Zodl. L’implémentation du protocole comprend :
- L’établissement de mécanismes de staking sécurisés pour les participants PoS.
- La modification de la structure des récompenses afin d’équilibrer les incitations entre les mineurs et les stakers.
- La garantie de la rétrocompatibilité et d’une expérience utilisateur fluide pendant la transition.
- Système de notaires : le protocole intègre des notaires qui valident les blocs par signature. Initialement, des notaires statiques sont utilisés, avec une transition vers un système dynamique dans lequel les notaires sont élus sur la base des ZEC stakés.​
- Logique d’activation : l’introduction de Crosslink nécessite des modifications des règles de consensus de Zcash, notamment la définition du processus de distribution du stake et la mise à jour des règles du protocole réseau pour prendre en charge le consensus hybride​
- Déploiement par phases : le protocole sera lancé par étapes afin d’assurer la stabilité du réseau et l’adaptation de la communauté. Les phases initiales se concentrent sur l’implémentation technique, suivie de l’intégration de la gouvernance pour la sélection des notaires​.

Vous pouvez explorer les détails techniques et suivre sa progression via le [dépôt de déploiement Crosslink sur GitHub](https://github.com/ShieldedLabs/crosslink-deployment).

---

#### **Ressources supplémentaires**
- Analyses de la communauté : [Forum communautaire Zcash - discussions sur Crosslink](https://forum.zcashcommunity.com)
- Mises à jour officielles : [Blog de Electric Coin Company](https://electriccoin.co)
- Accent sur la durabilité : [Pourquoi le Hybrid PoS est important pour Zcash](https://forum.zcashcommunity.com)

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

Ce mécanisme de double consensus renforce l’engagement de Zcash envers la confidentialité, la durabilité et la décentralisation, le positionnant comme un leader tourné vers l’avenir dans l’espace blockchain.
