<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Assets

## TL;DR

Les Zcash Shielded Assets (ZSA) sont une extension proposée du protocole qui permettrait à des actifs **autres que le ZEC** — stablecoins, jetons de gouvernance ou tout actif personnalisé — d’exister à l’intérieur du pool blindé de Zcash, avec l’expéditeur, le destinataire et le montant conservés privés.

- **Ce que c’est :** des actifs personnalisés de type ERC-20, mais blindés par défaut.
- **Qui le développe :** [QEDIT](https://qed-it.com/), dans le cadre d’une subvention de la Zcash Foundation, en collaboration avec Electric Coin Company.
- **Comment c’est spécifié :** [ZIP 226](https://zips.z.cash/zip-0226) (transfert et destruction) avec [ZIP 227](https://zips.z.cash/zip-0227) (émission).
- **Statut :** pas encore en service sur le mainnet. Le protocole ZSA est prévu pour être déployé lors de la Network Upgrade 7 (NU7).
- **Frais :** toujours payés en ZEC, quel que soit l’actif transféré.

---

## Explication essentielle

Les Zcash Shielded Assets (ZSA) sont une amélioration proposée du protocole Zcash qui permettrait la création, le transfert et la destruction d’actifs personnalisés sur la chaîne Zcash.

Si vous connaissez la norme de jeton [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) sur la blockchain Ethereum, les ZSA sont à Zcash ce que les jetons ERC-20 sont à Ethereum.

Les Zcash Shielded Assets permettraient la création de jetons personnalisés sur la blockchain Zcash, permettant ainsi à des jetons autres que le [ZEC](/guides/using-zec-privately) de bénéficier de l’anonymat et de la confidentialité des transactions blindées sur la blockchain Zcash.

Un usage potentiel majeur des ZSA serait l’émission de stablecoins sur le protocole Zcash. Les stablecoins sont des cryptomonnaies qui indexent leur valeur sur une monnaie fiduciaire, comme le dollar américain ou l’euro. Actuellement, certains des stablecoins les plus largement utilisés sont des jetons ERC-20 tels que [USDC](https://www.circle.com/en/usdc) et [Dai](https://docs.makerdao.com/).

Un autre usage potentiel des ZSA serait l’émission de jetons de gouvernance. Par exemple, ZecHub (l’éditeur de ce wiki) est une organisation autonome décentralisée (DAO) et pourrait créer et émettre à ses membres un ZSA pour voter sur des propositions et des décisions de gouvernance.

Les ZSA sont développés par [QEDIT](https://qed-it.com/), dans le cadre d’une importante subvention de la [Zcash Foundation](/zcash-organizations/zcash-foundation) en collaboration avec [Electric Coin Company](/zcash-organizations/electric-coin-company). Comme ce projet est encore en développement actif, des mises à jour sont publiées dans [ce fil](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) du forum Zcash. La [demande de subvention ZSA](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) de QEDIT est disponible sur le site des subventions de la Zcash Foundation.

---

## Visuel / Analogie

### L’enveloppe scellée

Imaginez une transaction blindée Zcash comme une enveloppe simple et scellée déposée dans une boîte aux lettres publique. Tout le monde peut voir qu’une enveloppe a été postée. Personne ne peut voir qui l’a envoyée, qui la récupère, ni ce qu’elle contient — et chaque enveloppe ressemble exactement à toutes les autres.

Aujourd’hui, une enveloppe sur le réseau Zcash ne peut contenir qu’une seule chose : du ZEC.

ZSA ne change pas l’enveloppe. Cela change **ce qui est autorisé à l’intérieur**. Après ZSA, la même enveloppe scellée pourrait contenir un stablecoin, un jeton de gouvernance de DAO ou un point de fidélité d’entreprise — et vue de l’extérieur, elle ressemblerait toujours exactement à n’importe quelle autre enveloppe du réseau.

Un détail mérite d’être retenu : **l’affranchissement est toujours payé en ZEC**, peu importe ce qu’il y a dans l’enveloppe.

### Ce qu’un observateur extérieur peut voir

| Un observateur peut voir... | ERC-20 sur Ethereum | ZSA sur Zcash |
| --- | --- | --- |
| Qui l’a envoyé | Public | Blindé |
| Qui l’a reçu | Public | Blindé |
| Combien a été transféré | Public | Blindé |
| Soldes individuels | Public | Blindé |
| Offre totale de l’actif | Public | **Publique — délibérément** |
| Devise dans laquelle les frais sont payés | ETH | ZEC |

### Pourquoi la ligne sur l’offre n’est pas un bug

Les deux dernières lignes du tableau sont là où ZSA devient particulièrement intéressant.

ZIP 227 maintient délibérément **l’émission transparente**, afin que l’offre en circulation de chaque actif puisse être suivie on-chain. Les avoirs individuels et les paiements individuels restent privés ; le nombre total de jetons en existence ne l’est pas.

Pour un émetteur de stablecoin, cette combinaison est précisément l’objectif plutôt qu’un compromis. Les réserves peuvent être auditées par rapport à une offre publiquement vérifiable, tandis que les personnes qui utilisent réellement le jeton gardent leurs soldes et leurs paiements pour elles.

### Un actif, une identité

Chaque actif reçoit un **identifiant d’actif** unique, dérivé de la clé d’émission de l’émetteur ainsi que d’une description textuelle de l’actif. Deux émetteurs différents ne peuvent pas produire le même identifiant, et créer ou modifier un actif requiert une autorisation cryptographique de son émetteur. En termes d’enveloppe : tout le monde peut poster une enveloppe, mais seule l’autorité d’émission qui possède un actif donné peut en créer davantage.

---

## Approfondissement

### Démo ZSA sur Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Exécutez la démo vous-même !**

Clonez le dépôt zcash-tx-tool : <https://github.com/QED-it/zcash_tx_tool>

### Zcash Improvement Proposals (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226) : transfert et destruction des Zcash Shielded Assets
- [ZIP 227](https://zips.z.cash/zip-0227) : émission des Zcash Shielded Assets
- [ZIP 230](https://zips.z.cash/zip-0230) : format de transaction version 6

> **Remarque sur ZIP 230 :** ZIP 230 a depuis été retiré et ne sera pas déployé. La version 6 des transactions est désormais définie par [ZIP 229](https://zips.z.cash/zip-0229). Consultez l’avis en haut de la page [ZIP 230](https://zips.z.cash/zip-0230).

ZIP 226 définit le protocole OrchardZSA — une extension du protocole Orchard qui prend en charge le transfert et la destruction d’actifs personnalisés. ZIP 227 définit la manière dont ces actifs sont créés au départ, et ne doit être implémenté qu’en parallèle de ZIP 226.

### Proposition de subvention ZSA

La proposition ZSA pour les Shielded Assets (ZSA/UDA) a été présentée par l’équipe de [QEDIT](https://qed-it.com/) afin de construire des actifs blindés génériques sur la blockchain Zcash. Ceux-ci sont généralement appelés User Defined Assets (UDA) ou Zcash Shielded Assets (ZSA).

Avec cette proposition, l’équipe de [QEDIT](https://qed-it.com/) prévoit d’apporter la DeFi à l’écosystème Zcash et, en même temps, de permettre l’utilisation des meilleures technologies de confidentialité au sein de l’écosystème DeFi existant. Dans un sondage, l’équipe a demandé, et la communauté a répondu que [les actifs blindés génériques (ZSA/UDA) sont actuellement la fonctionnalité la plus demandée](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Ces propositions respectent techniquement la spécification [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) et sont définies dans ZIP 226 et ZIP 227.

1. [ZIP 226](https://zips.z.cash/zip-0226) : transfert et destruction des Zcash Shielded Assets
2. [ZIP 227](https://zips.z.cash/zip-0227) : émission des Zcash Shielded Assets

---

## Implications pratiques

**Si vous détenez ou utilisez du ZEC**

- Les ZSA sont définis comme une extension d’Orchard ("OrchardZSA"), ils partageraient donc les mécanismes blindés que le ZEC utilise déjà. Votre wallet devra prendre explicitement en charge ZSA avant de pouvoir les détenir ou les envoyer.
- Vous aurez toujours besoin d’avoir un peu de ZEC à disposition. Les frais d’émission et de transfert d’un ZSA sont payés en ZEC, et non dans l’actif lui-même.
- Rien ne change concernant vos transactions ZEC existantes.

**Si vous êtes un émetteur potentiel — un stablecoin, une DAO, une entreprise**

- L’émission d’un actif nécessite une autorisation cryptographique liée à une clé d’émission, de sorte que vous seul pouvez créer ou modifier les attributs de votre propre actif.
- L’offre en circulation de votre actif est publiquement vérifiable, tandis que les soldes et les transferts de vos utilisateurs ne le sont pas. Pour un émetteur réglementé, c’est généralement exactement la combinaison requise.
- Une seule transaction d’émission peut créer plus d’un actif à la fois.

**Pour l’écosystème**

- Puisque tous les frais ZSA sont libellés en ZEC, l’activité de tout actif futur émis sur Zcash crée une demande pour le ZEC lui-même.

---

## Erreurs fréquentes

| Croyance courante | Ce qui est réellement le cas |
| --- | --- |
| "Les ZSA sont déjà en service sur Zcash aujourd’hui." | Non. ZSA est prévu pour être déployé lors de la Network Upgrade 7 (NU7) et fait encore l’objet de révisions et de tests. |
| "ZSA apporte les smart contracts à Zcash." | ZSA spécifie l’émission, le transfert et la destruction d’actifs. Ce n’est pas une couche de contrats programmables à usage général. |
| "Vous pouvez payer les frais ZSA dans le jeton ZSA lui-même." | Les frais sont payés en ZEC. |
| "Si c’est blindé, l’offre du jeton doit aussi être secrète." | ZIP 227 rend délibérément l’émission transparente, afin que l’offre de chaque actif puisse être suivie publiquement. Les soldes et les transferts restent privés ; l’offre ne l’est pas. |
| "ZIP 230 est le format actuel de transaction version 6." | ZIP 230 a été retiré. La version 6 est désormais définie par ZIP 229. |

---

## Pages liées

- [Halo](/zcash-tech/halo) — le système de preuve derrière Orchard, le protocole que ZSA étend
- [Zk-SNARKs](/zcash-tech/zk-snarks) — les preuves à divulgation nulle de connaissance qui permettent de vérifier un transfert blindé sans le révéler
- [Shielded Pools](/using-zcash/shielded-pools) — l’endroit où les ZSA cohabiteraient avec le ZEC
- [Transactions](/using-zcash/transactions) — comment une transaction Zcash est construite
- [Zebra Full Node](/zcash-tech/zebra-full-node) — l’implémentation de nœud utilisée dans la démo ZSA ci-dessus
