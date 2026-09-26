<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Explorateurs de blockchain

## Introduction

Dans le monde traditionnel des affaires, chaque transaction comprend un reçu comme preuve d'achat. De même, dans le monde de la blockchain, un utilisateur reçoit un reçu numérique sous la forme d'un identifiant de transaction pour chaque transaction effectuée. La plupart des wallets vous le fourniront. Les explorateurs de blockchain sont simplement des outils qui permettent de visualiser ce qui s'est déjà passé sur une blockchain. Ils prennent comme entrées : des identifiants de transaction, des adresses ou des hashes de bloc, et affichent visuellement ce qui s'est produit.

## Exemples
<div>

- Bitcoin : [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum : [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos : [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (public) : [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privé) : [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Remarquez comment, avec Zcash, la deuxième transaction masque tous les détails importants ; cela est essentiel et a de grandes implications dans un monde numérique.


## Cartes de blockchain

Nous avons donc cette longue chaîne de caractères comme reçu numérique, et maintenant ? C'est là que nous utilisons un [explorateur de blockchain](https://nym.com/blog/using-blockchain-privately), ou une carte, pour nous aider à comprendre ce qui s'est passé sur la blockchain. Remarquez comment chaque chaîne possède sa propre version d'[explorateur de blockchain](https://nym.com/blog/using-blockchain-privately) ci-dessus. Il est important de comprendre que tous ces projets de blockchain sont des exemples de logiciels open source. Autrement dit, n'importe qui peut contribuer au code et/ou le fork selon ses préférences. Avec cette compréhension, chaque projet se spécialise dans différents domaines et personnalise l'explorateur de blockchain afin de répondre aux besoins dudit projet.

### Blocs
Les transactions sont placées dans des *blocs*. Lorsqu'un bloc est miné/validé, chaque transaction contenue dans ce bloc est confirmée et un hash de bloc est créé. Tout hash créé peut être saisi dans un explorateur de blocs. Vous avez peut-être vu des CEX nécessiter un certain nombre de *confirmations* avant de libérer vos fonds ; c'est la métrique qu'ils utilisent pour s'assurer que votre transaction est 
suffisamment finalisée. Comment la blockchain détermine-t-elle quelles transactions entrent dans le bloc suivant ? C'est un sujet de recherche complexe, mais la plupart des chaînes modernes utilisent le principe des *frais* pour déterminer qui passe en tête de file. Plus les frais sont élevés, plus vous avez de chances d'avancer vers le début de la file d'attente.

### Adresses

Une façon amusante d'apprendre visuellement le fonctionnement des [explorateurs de blockchain](https://nym.com/blog/using-blockchain-privately) consiste à saisir l'adresse d'une transaction aléatoire. Vous pouvez ensuite remonter dans le temps et voir d'où provenaient les fonds ! Chaque transaction possède à la fois une adresse d'entrée et une adresse de sortie.  Armé de ces informations, on peut facilement avancer et reculer à partir de toute transaction qui a été dépensée. Pour ceux qui aiment les énigmes, c'est l'équivalent numérique d'un immense puzzle financier, et cela pourrait être utilisé à des fins de transparence. Utiliser un explorateur de blockchain rend cela non seulement beaucoup plus facile à visualiser, mais *met également en évidence* le besoin de confidentialité des transactions. À moins d'utiliser Zcash protégé, vous pouvez faire cela avec *n'importe quelle* blockchain transparente : BTC, ETH, ATOM, DOGE, VTC, etc ... . Ce point est crucial pour toute personne utilisant la blockchain en toute sécurité dans un avenir uniquement numérique.

### Montants

Comme pour les adresses ci-dessus, toute transaction sur une blockchain publique affiche publiquement les montants. Cela inclut les montants des adresses d'entrée et de sortie de toute transaction. Une exception existe lorsque vous choisissez d'utiliser Zcash protégé -- tous les montants sont alors masqués. Pour les propriétaires de petites entreprises qui ont nécessairement besoin de confidentialité pour un *commerce équitable*, c'est un avantage considérable !

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### Ce qu'un explorateur peut et ne peut pas voir sur Zcash

#### TL;DR
- Les adresses transparentes (`t`) sont entièrement visibles dans un explorateur, comme avec Bitcoin
- Les transactions entièrement protégées (de z à z) masquent le montant, les adresses et le mémo
- Les frais restent visibles, même pour une transaction entièrement protégée
- La protection (déplacer des fonds `t` vers le mode protégé) et la déprotection (ramener des fonds protégés vers `t`) sont partiellement visibles, car un côté est transparent
- La confidentialité est préservée uniquement tant que les fonds restent dans les pools protégés

Zcash possède plusieurs types d'adresses, et un explorateur les traite très différemment.

Les adresses transparentes, qui commencent par `t`, fonctionnent comme Bitcoin. Un explorateur affiche l'expéditeur, le destinataire, le montant et la trace permettant de remonter à l'origine des fonds.

Les adresses protégées constituent le côté privé. Les fonds dans les [pools protégés](https://zechub.wiki/using-zcash/shielded-pools#content) Sapling ou Orchard sont sécurisés par des preuves à divulgation nulle de connaissance. Recherchez une transaction entièrement protégée et l'explorateur ne peut pas afficher le montant, les adresses ou le mémo. Il peut uniquement confirmer qu'une transaction valide a eu lieu et a été enregistrée dans un bloc. C'est l'exemple privé masqué présenté vers le haut de cette page.

Un détail reste visible même pour les transactions entièrement protégées : les frais. Les règles de consensus de Zcash exigent que les frais transparents soient indiqués explicitement ; un explorateur peut donc toujours les afficher, même lorsque les montants sont masqués. Pour cette raison, il est recommandé d'utiliser les frais standards du wallet afin que votre transaction ne se démarque pas par le paiement d'un montant inhabituel.

L'explorateur peut également voir lorsque des fonds passent entre les côtés transparent et protégé. Déplacer des fonds `t` dans un pool correspond à la protection, les en retirer correspond à la déprotection. Ces passages sont partiellement visibles, car un côté est transparent. Seule une activité entièrement privée de z à z, qui ne touche jamais une adresse `t`, garde tout masqué sauf les frais.

À retenir : la confidentialité dépend du maintien des fonds dans les pools protégés. Dès que les fonds touchent une adresse `t`, cette partie de leur historique est aussi publique que Bitcoin. Pour prouver votre propre activité protégée à une personne de votre choix, telle qu'un comptable, partagez une clé de visualisation au lieu de la rendre publique. Consultez la page [Clés de visualisation](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Liste des explorateurs de blocs Zcash

- [Explorateur de blocs Zcash](https://mainnet.zcashexplorer.app/)

- [Blockchair](https://blockchair.com)

- [3xpl](https://3xpl.com/zcash)

- [Bitquery](https://explorer.bitquery.io/zcash)


### Guide visuel

Voici quatre bons exemples de différents explorateurs de blockchain :

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Explorateur de blocs Zcash](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)
