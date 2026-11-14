<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Actifs protégés Zcash

## En bref

Les actifs protégés Zcash (ZSA) sont une extension de protocole proposée qui permettrait à des actifs **autres que ZEC** (stablecoins, jetons de gouvernance ou tout autre actif personnalisé) d'exister dans le pool protégé de Zcash, en gardant confidentiels l'expéditeur, le destinataire et le montant.

- **De quoi s'agit-il :** des actifs personnalisés de type ERC-20, mais protégés par défaut.
- **Qui le développe :** [QEDIT](https://qed-it.com/), grâce à une subvention de Zcash Foundation, en collaboration avec Electric Coin Company.
- **Comment il est spécifié :** [ZIP 226](https://zips.z.cash/zip-0226) (transfert et destruction) ainsi que [ZIP 227](https://zips.z.cash/zip-0227) (émission).
- **Statut :** pas encore actif sur le réseau principal et ne fait pas partie de la mise à niveau du réseau 7 (NU7). [ZIP 259](https://zips.z.cash/zip-0259), qui répertorie tout ce que NU7 déploie, n'inclut ni ZIP 226 ni ZIP 227, et aucune date d'activation des ZSA n'a été fixée.
- **Frais :** toujours payés en ZEC, quel que soit l'actif transféré.

---

## Explication de base

Les actifs protégés Zcash (ZSA) sont une amélioration proposée du protocole Zcash qui permettrait la création, le transfert et la destruction d'actifs personnalisés sur la chaîne Zcash.

Si vous connaissez le standard de jetons [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) de la blockchain Ethereum, les ZSA sont à Zcash ce que les jetons ERC-20 sont à Ethereum.

Les actifs protégés Zcash permettraient de créer des jetons personnalisés sur la blockchain Zcash, ce qui permettrait à des jetons autres que [ZEC](/guides/using-zec-privately) de bénéficier de l'anonymat et de la confidentialité des transactions protégées sur la blockchain Zcash.

L'une des principales utilisations possibles des ZSA serait l'émission de stablecoins sur le protocole Zcash. Les stablecoins sont des cryptomonnaies dont la valeur est indexée sur une monnaie fiduciaire, comme le dollar américain ou l'euro. Actuellement, certains des stablecoins les plus répandus sont des jetons ERC-20, comme [USDC](https://www.circle.com/en/usdc) et [Dai](https://docs.makerdao.com/).

Une autre utilisation possible des ZSA serait l'émission de jetons de gouvernance. Par exemple, ZecHub (l'éditeur de ce wiki) est une organisation autonome décentralisée (DAO) et pourrait créer et distribuer à ses membres un ZSA permettant de voter sur les propositions et les décisions de gouvernance.

Les ZSA sont développés par [QEDIT](https://qed-it.com/), grâce à une importante subvention de [Zcash Foundation](/zcash-organizations/zcash-foundation), en collaboration avec [Electric Coin Company](/zcash-organizations/electric-coin-company). Ce projet étant encore en cours de développement actif, les mises à jour sont publiées dans [ce fil de discussion](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) du forum Zcash. La [demande de subvention ZSA](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) déposée par QEDIT est disponible sur le site des subventions de Zcash Foundation.

---

## Illustration / analogie

### L'enveloppe scellée

Imaginez une transaction protégée Zcash comme une enveloppe ordinaire et scellée, déposée dans une boîte aux lettres publique. Tout le monde peut voir qu'une enveloppe a été postée. Personne ne peut voir qui l'a envoyée, qui la récupère ni ce qu'elle contient, et toutes les enveloppes sont identiques.

Aujourd'hui, une enveloppe sur le réseau Zcash ne peut contenir qu'une seule chose : du ZEC.

Les ZSA ne changent pas l'enveloppe. Ils changent **ce qu'elle a le droit de contenir**. Avec les ZSA, la même enveloppe scellée pourrait contenir un stablecoin, un jeton de gouvernance de DAO ou des points de fidélité d'une entreprise, et vue de l'extérieur, elle serait toujours identique à toutes les autres enveloppes du réseau.

Un détail mérite d'être retenu : **l'affranchissement est toujours payé en ZEC**, quel que soit le contenu de l'enveloppe.

### Ce qu'un observateur extérieur peut voir

| Un observateur peut voir... | ERC-20 sur Ethereum | ZSA sur Zcash |
| --- | --- | --- |
| Qui l'a envoyé | Public | Protégé |
| Qui l'a reçu | Public | Protégé |
| Le montant transféré | Public | Protégé |
| Les soldes individuels | Public | Protégés |
| L'offre totale de l'actif | Publique | **Publique, délibérément** |
| La monnaie de paiement des frais | ETH | ZEC |

### Pourquoi la ligne de l'offre n'est pas un bogue

Ce sont les deux dernières lignes du tableau qui rendent les ZSA intéressants.

ZIP 227 maintient délibérément **l'émission transparente**, afin que l'offre en circulation de chaque actif puisse être suivie on-chain. Les avoirs et les paiements individuels restent confidentiels ; le nombre total de jetons existants, lui, ne l'est pas.

Pour un émetteur de stablecoin, cette combinaison est l'objectif même et non un compromis. Les réserves peuvent être auditées par rapport à une offre vérifiable publiquement, tandis que les personnes qui utilisent réellement le jeton gardent leurs soldes et leurs paiements pour elles.

### Un actif, une identité

Chaque actif reçoit un **identifiant d'actif** unique, dérivé de la clé d'émission de l'émetteur et d'une description textuelle de l'actif. Deux émetteurs différents ne peuvent pas produire le même identifiant, et frapper ou modifier un actif nécessite une autorisation cryptographique de son émetteur. Pour reprendre l'image de l'enveloppe : tout le monde peut poster une enveloppe, mais seul l'atelier de frappe propriétaire d'un actif donné peut en imprimer davantage.

---

## Analyse approfondie

### Démonstration des ZSA sur Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Lancez la démonstration vous-même !**

Clonez le dépôt zcash-tx-tool : [https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Propositions d'amélioration de Zcash (ZIP)

- [ZIP 226](https://zips.z.cash/zip-0226) : Transfert et destruction des actifs protégés Zcash
- [ZIP 227](https://zips.z.cash/zip-0227) : Émission des actifs protégés Zcash
- [ZIP 230](https://zips.z.cash/zip-0230) : Format de transaction version 6

> **Remarque sur ZIP 230 :** ZIP 230 a depuis été retirée et ne sera pas déployée. La version 6 des transactions est désormais définie par [ZIP 229](https://zips.z.cash/zip-0229). Consultez l'avis en haut de la page [ZIP 230](https://zips.z.cash/zip-0230).

ZIP 226 définit le protocole OrchardZSA, une extension du protocole Orchard qui prend en charge le transfert et la destruction d'actifs personnalisés. ZIP 227 définit la manière dont ces actifs sont créés au départ et ne doit être mise en œuvre qu'avec ZIP 226.

### Proposition de subvention ZSA

La proposition ZSA pour les actifs protégés (ZSA/UDA) a été présentée par l'équipe de [QEDIT](https://qed-it.com/) afin de créer des actifs protégés génériques sur la blockchain Zcash. On les appelle généralement actifs définis par l'utilisateur (UDA) ou actifs protégés Zcash (ZSA).

Avec cette proposition, l'équipe de [QEDIT](https://qed-it.com/) prévoit d'apporter la DeFi à l'écosystème Zcash et, en même temps, de permettre l'utilisation de la meilleure technologie de confidentialité au sein de l'écosystème DeFi existant. Lors d'un sondage, l'équipe a posé la question et la communauté a répondu que [les actifs protégés génériques (ZSA/UDA) sont la fonctionnalité la plus demandée à l'heure actuelle](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Ces propositions sont techniquement conformes à la spécification des [propositions d'amélioration de Zcash (ZIP)](https://zips.z.cash/zip-0000) et sont définies dans ZIP 226 et ZIP 227.

1. [ZIP 226](https://zips.z.cash/zip-0226) : Transfert et destruction des actifs protégés Zcash
2. [ZIP 227](https://zips.z.cash/zip-0227) : Émission des actifs protégés Zcash

---

## Implications pratiques

**Si vous détenez ou utilisez du ZEC**

- Les ZSA sont définis comme une extension d'Orchard (« OrchardZSA »), ils partageraient donc les mécanismes de protection que ZEC utilise déjà. Votre portefeuille devra prendre explicitement en charge les ZSA avant de pouvoir les détenir ou les envoyer.
- Vous aurez toujours besoin d'un peu de ZEC. Les frais d'émission et de transfert d'un ZSA sont payés en ZEC, et non avec l'actif lui-même.
- Rien ne change pour vos transactions ZEC existantes.

**Si vous êtes un émetteur potentiel (stablecoin, DAO, entreprise)**

- L'émission d'un actif nécessite une autorisation cryptographique liée à une clé d'émission : vous seul pouvez donc frapper votre propre actif ou en modifier les attributs.
- L'offre en circulation de votre actif est auditable publiquement, contrairement aux soldes et aux transferts de vos utilisateurs. Pour un émetteur réglementé, c'est généralement exactement la combinaison requise.
- Une seule transaction d'émission peut créer plusieurs actifs à la fois.

**Pour l'écosystème**

- Comme tous les frais des ZSA sont libellés en ZEC, l'activité de tout futur actif émis sur Zcash crée une demande pour le ZEC lui-même.

---

## Erreurs courantes

| Idée reçue | Ce qu'il en est réellement |
| --- | --- |
| « Les ZSA sont déjà actifs sur Zcash. » | Ce n'est pas le cas. Les ZSA ne font pas partie de la mise à niveau du réseau 7 (NU7), que [ZIP 259](https://zips.z.cash/zip-0259) définit sans ZIP 226 ni ZIP 227, et ils sont encore en cours d'examen et de test. |
| « Les ZSA apportent les contrats intelligents à Zcash. » | Les ZSA spécifient l'émission, le transfert et la destruction d'actifs. Il ne s'agit pas d'une couche de contrats programmables à usage général. |
| « Vous pouvez payer les frais des ZSA avec le jeton ZSA lui-même. » | Les frais sont payés en ZEC. |
| « Si c'est protégé, l'offre de jetons doit aussi être secrète. » | ZIP 227 rend volontairement l'émission transparente, afin que l'offre de chaque actif puisse être suivie publiquement. Les soldes et les transferts restent confidentiels ; l'offre, non. |
| « ZIP 230 est le format de transaction version 6 actuel. » | ZIP 230 a été retirée. La version 6 est désormais définie par ZIP 229. |

---

## Pages connexes

- [Halo](/zcash-tech/halo) : le système de preuve sur lequel repose Orchard, le protocole qu'étendent les ZSA
- [zk-SNARKs](/zcash-tech/zk-snarks) : les preuves à divulgation nulle de connaissance qui permettent de vérifier un transfert protégé sans le révéler
- [Pools protégés](/using-zcash/shielded-pools) : là où les ZSA cohabiteraient avec ZEC
- [Transactions](/using-zcash/transactions) : comment une transaction Zcash est construite
- [Nœud complet Zebra](/zcash-tech/zebra-full-node) : l'implémentation de nœud utilisée dans la démonstration des ZSA ci-dessus
