<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Explorateurs de blockchain

## Introduction

Dans le monde des affaires traditionnel, chaque transaction s'accompagne d'un reçu servant de preuve d'achat. De la même manière, dans le monde de la blockchain, un utilisateur reçoit un reçu numérique sous la forme d'un identifiant de transaction pour chaque transaction effectuée. La plupart des portefeuilles vous le fourniront. Les explorateurs de blockchain sont simplement des outils qui permettent de visualiser ce qui s'est déjà produit sur une blockchain. Ils prennent en entrée des identifiants de transaction, des adresses ou des hachages de bloc, et présentent visuellement ce qui s'est passé.

## Exemples
<div>

- Bitcoin : [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum : [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos : [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (publique) : [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://mainnet.zcashexplorer.app/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privée) : [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://mainnet.zcashexplorer.app/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Remarquez qu'avec Zcash, tous les détails importants de la seconde transaction sont masqués. C'est un point essentiel, aux implications considérables dans un monde numérique.


## Cartes de la blockchain

Nous avons donc cette longue chaîne de caractères en guise de reçu numérique, et maintenant ? C'est là qu'intervient un [explorateur de blockchain](https://nym.com/blog/using-blockchain-privately), ou carte, qui nous aide à comprendre ce qui s'est passé sur la blockchain. Remarquez que chaque chaîne possède sa propre version d'[explorateur de blockchain](https://nym.com/blog/using-blockchain-privately) ci-dessus. Il est important de comprendre que tous ces projets de blockchain sont des exemples de logiciels libres. Autrement dit, chacun peut contribuer au code et/ou le dupliquer pour l'adapter à ses besoins. Dans cette optique, chaque projet se spécialise dans des domaines différents et personnalise l'explorateur de blockchain pour répondre aux besoins du projet en question.

### Blocs
Les transactions sont placées dans des *blocs*. Lorsqu'un bloc est miné/validé, chaque transaction qu'il contient est confirmée et un hachage de bloc est créé. Tout hachage créé peut être saisi dans un explorateur de blocs. Vous avez peut-être remarqué que les exchanges centralisés exigent un certain nombre de *confirmations* avant de débloquer vos fonds : c'est l'indicateur qu'ils utilisent pour s'assurer que votre transaction est 
suffisamment finalisée. Comment la blockchain détermine-t-elle quelles transactions entrent dans le bloc suivant ? C'est un sujet de recherche complexe, mais la plupart des chaînes modernes utilisent le principe des *frais* pour déterminer qui passe en tête de file. Plus les frais sont élevés, plus vous avez de chances de remonter en tête de la file d'attente.

### Adresses

Une façon ludique d'apprendre visuellement à utiliser les [explorateurs de blockchain](https://nym.com/blog/using-blockchain-privately) consiste à saisir l'adresse d'une transaction quelconque. Vous pouvez alors remonter dans le temps et voir d'où proviennent les fonds ! Chaque transaction possède une adresse d'entrée et une adresse de sortie. Muni de ces informations, on peut facilement avancer ou reculer à partir de n'importe quelle transaction déjà dépensée. Pour les amateurs d'énigmes, c'est l'équivalent numérique d'un immense puzzle financier, qui pourrait servir à des fins de transparence. L'utilisation d'un explorateur de blockchain rend non seulement cela beaucoup plus facile à visualiser, mais *souligne aussi* la nécessité de la confidentialité des transactions. À moins d'utiliser Zcash protégé, vous pouvez faire cela avec *n'importe quelle* blockchain transparente : BTC, ETH, ATOM, DOGE, VTC, etc. Ce point est crucial pour quiconque souhaite utiliser la blockchain en toute sécurité à l'aube d'un avenir entièrement numérique.

### Montants

Comme pour les adresses ci-dessus, toute transaction sur une blockchain publique affiche publiquement ses montants. Cela inclut les montants des adresses d'entrée et de sortie de toute transaction. Une exception : lorsque vous choisissez d'utiliser Zcash protégé, tous les montants sont alors masqués. Pour les propriétaires de petites entreprises qui ont nécessairement besoin de confidentialité pour un *commerce équitable*, c'est un avantage considérable !

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### Ce qu'un explorateur peut et ne peut pas voir sur Zcash

#### En bref
- Les adresses transparentes (`t`) sont entièrement visibles sur un explorateur, tout comme Bitcoin
- Les transactions entièrement protégées (de z à z) masquent le montant, les adresses et le mémo
- Les frais restent visibles, même sur une transaction entièrement protégée
- La protection (passage de `t` vers une adresse protégée) et la déprotection (retour d'une adresse protégée vers `t`) sont partiellement visibles, car l'un des côtés est transparent
- La confidentialité n'est garantie que tant que les fonds restent dans les pools protégés

Zcash possède plus d'un type d'adresse, et un explorateur les traite de manière très différente.

Les adresses transparentes, qui commencent par `t`, fonctionnent comme celles de Bitcoin. Un explorateur affiche l'expéditeur, le destinataire, le montant et la trace remontant à l'origine des fonds.

Les adresses protégées constituent le côté privé. Les fonds des [pools protégés](https://zechub.wiki/using-zcash/shielded-pools#content) Sapling ou Orchard sont protégés par des preuves à divulgation nulle de connaissance. Si vous recherchez une transaction entièrement protégée, l'explorateur ne peut afficher ni le montant, ni les adresses, ni le mémo. Il peut seulement confirmer qu'une transaction valide a eu lieu et qu'elle a été enregistrée dans un bloc. C'est l'exemple privé masqué présenté en haut de cette page.

Un détail reste cependant visible, même pour les transactions entièrement protégées : les frais. Les règles de consensus de Zcash exigent que les frais transparents soient indiqués explicitement, de sorte qu'un explorateur peut toujours les afficher, même lorsque les montants sont masqués. C'est pourquoi il est recommandé d'utiliser les frais standard du portefeuille, afin que votre transaction ne se distingue pas en payant un montant inhabituel.

L'explorateur peut également voir quand des fonds passent du côté transparent au côté protégé, et inversement. Déplacer des fonds `t` vers un pool s'appelle la protection, les en ressortir s'appelle la déprotection. Ces passages sont partiellement visibles car l'un des côtés est transparent. Seule une activité entièrement privée de z à z, qui ne touche jamais une adresse `t`, garde tout masqué à l'exception des frais.

À retenir : la confidentialité dépend du fait de rester dans les pools protégés. Dès que des fonds touchent une adresse `t`, cette partie de leur historique est aussi publique que sur Bitcoin. Pour prouver votre propre activité protégée à une personne de votre choix, comme un comptable, partagez une clé pour lecture seule plutôt que de la rendre publique. Consultez la page [Clés pour lecture seule](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Liste des explorateurs de blocs Zcash

- [Explorateur de blocs Zcash](https://mainnet.zcashexplorer.app/)

- [3xpl](https://3xpl.com/zcash)

- [ShieldedScan](https://shieldedscan.xyz)

- [ZecBlock](https://zecblock.com/)

- [SoChain](https://sochain.com/zec) ([testnet](https://sochain.com/zectest))

- [Explorateur ZecZcash](https://zeczcash.com/explorer)



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
