<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Explorateurs de blockchain

## Introduction

Dans le monde traditionnel des affaires, chaque transaction inclut un reçu comme preuve d'achat. De la même manière, dans l'univers de la blockchain, un utilisateur reçoit un reçu numérique sous la forme d'un identifiant de transaction pour chaque transaction effectuée. La plupart des portefeuilles vous le fournissent. Les explorateurs de blockchain sont simplement des outils qui permettent de visualiser ce qui s'est déjà passé sur une blockchain. Ils prennent comme entrées : des identifiants de transaction, des adresses ou des hachages de blocs, et affichent visuellement ce qui a eu lieu.

## Exemples
<div>

- Bitcoin : [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum : [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos : [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (public) : [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privé) : [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Remarquez avec Zcash que la deuxième transaction masque tous les détails importants, ce qui est essentiel et a de grandes implications dans un monde numérique.


## Cartes de la blockchain

Nous avons donc cette longue chaîne de caractères comme reçu numérique, et maintenant ? C'est ici que nous utilisons un [explorateur de blockchain](https://nym.com/blog/using-blockchain-privately), ou une carte, pour nous aider à comprendre ce qui s'est passé sur la blockchain. Remarquez comment chaque chaîne possède sa propre version de [l'explorateur de blockchain](https://nym.com/blog/using-blockchain-privately) ci-dessus. Il est important de comprendre que tous ces projets blockchain sont des exemples de logiciels open source. Cela signifie que n'importe qui peut contribuer au code et/ou le forker selon ses préférences. En gardant cela à l'esprit, chaque projet se spécialise dans différents domaines et personnalise l'explorateur de blockchain pour l'adapter aux besoins dudit projet.

### Blocs
Les transactions sont placées dans des *blocs*. Lorsqu'un bloc est miné/validé, chaque transaction à l'intérieur de ce bloc est confirmée et un hachage de bloc est créé. Tout hachage créé peut être saisi dans un explorateur de blocs. Vous avez peut-être vu des CEX exiger un certain nombre de *confirmations* avant de libérer vos fonds ; c'est la mesure qu'ils utilisent pour s'assurer que votre transaction est 
suffisamment finalisée. Comment la blockchain détermine-t-elle quelles transactions entrent dans le prochain bloc ? C'est un sujet de recherche complexe, mais la plupart des chaînes modernes utilisent l'idée des *frais* pour déterminer qui passe en tête de file. Plus les frais sont élevés, plus vous avez de chances de remonter au début de la file d'attente.

### Adresses

Une façon ludique d'apprendre visuellement les [explorateurs de blockchain](https://nym.com/blog/using-blockchain-privately) consiste à saisir l'adresse de n'importe quelle transaction aléatoire. Vous pouvez ensuite remonter dans le temps et voir d'où proviennent les fonds ! Chaque transaction possède à la fois une adresse d'entrée et une adresse de sortie.  Armé de ces informations, on peut facilement avancer et reculer à partir de n'importe quelle transaction qui a été dépensée. Pour ceux qui aiment les énigmes, c'est l'équivalent numérique d'un immense puzzle financier, et cela pourrait être utilisé à des fins de transparence. Utiliser un explorateur de blockchain rend cela non seulement beaucoup plus facile à visualiser, mais *met aussi en évidence* le besoin de confidentialité des transactions. À moins d'utiliser Zcash protégé, vous pouvez faire cela avec *n'importe quelle* blockchain transparente : BTC, ETH, ATOM, DOGE, VTC, etc. ... . Ce point est crucial pour toute personne qui utilise la blockchain en toute sécurité à l'approche d'un avenir entièrement numérique.

### Montants

Comme pour les adresses ci-dessus, toute transaction sur une blockchain publique affiche publiquement les montants en pleine vue. Cela inclut les montants des adresses d'entrée et de sortie pour toute transaction. Une exception à cela survient lorsque vous choisissez d'utiliser Shielded Zcash -- dans ce cas, tous les montants sont masqués. Pour les petits entrepreneurs qui ont nécessairement besoin de confidentialité pour un *commerce équitable*, c'est un énorme avantage !

![montants](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### Ce qu'un explorateur peut et ne peut pas voir sur Zcash

#### TL;DR
- Les adresses transparentes (`t`) sont entièrement visibles dans un explorateur, tout comme Bitcoin
- Les transactions entièrement protégées (z vers z) masquent le montant, les adresses et le mémo
- Les frais restent visibles, même sur une transaction entièrement protégée
- Le shielding (déplacer des fonds `t` vers du protégé) et le deshielding (du protégé vers `t`) sont partiellement visibles, car un côté est transparent
- La confidentialité ne tient que tant que les fonds restent à l'intérieur des pools protégés

Zcash possède plus d'un type d'adresse, et un explorateur les traite de manière très différente.

Les adresses transparentes, qui commencent par `t`, fonctionnent comme Bitcoin. Un explorateur affiche l'expéditeur, le destinataire, le montant et la piste permettant de remonter jusqu'à la provenance des fonds.

Les adresses protégées constituent le côté privé. Les fonds dans les [pools protégés](https://zechub.wiki/using-zcash/shielded-pools#content) Sapling ou Orchard sont protégés par des preuves à divulgation nulle de connaissance. Recherchez une transaction entièrement protégée et l'explorateur ne pourra pas afficher le montant, les adresses ni le mémo. Il peut seulement confirmer qu'une transaction valide a eu lieu et a été enregistrée dans un bloc. C'est l'exemple privé masqué montré près du haut de cette page.

Un détail reste visible même pour les transactions entièrement protégées : les frais. Les règles de consensus de Zcash exigent que les frais transparents soient explicitement indiqués ; un explorateur peut donc toujours les afficher, même lorsque les montants sont masqués. Pour cette raison, il est recommandé d'utiliser les frais standard du portefeuille, afin que votre transaction ne se distingue pas en payant un montant inhabituel.

L'explorateur peut aussi voir quand les fonds passent entre les côtés transparent et protégé. Déplacer des fonds `t` dans un pool est du shielding, les en ressortir est du deshielding. Ces passages sont partiellement visibles parce qu'un côté est transparent. Seule une activité z vers z entièrement privée, qui ne touche jamais une adresse `t`, conserve tout masqué à l'exception des frais.

À retenir : la confidentialité dépend du fait de rester à l'intérieur des pools protégés. Une fois que les fonds touchent une adresse `t`, cette partie de leur historique devient aussi publique que sur Bitcoin. Pour prouver votre propre activité protégée à une personne de votre choix, comme un comptable, partagez une viewing key au lieu de la rendre publique. Consultez la page [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Guide visuel

Voici quatre bons exemples de différents explorateurs de blockchain :

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Explorateur de blocs Zcash](https://mainnet.zcashexplorer.com)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![explorateurBitcoin](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


![explorateurEth](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


![explorateurZcash](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)


![cosmos](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)
