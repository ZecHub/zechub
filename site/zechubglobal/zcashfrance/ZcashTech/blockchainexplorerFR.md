[Zcashblockexplorer](https://github.com/nighthawk-apps/zcash-explorer) est une source ouverte [subvention financée par la communauté](https://forum.zcashcommunity.com/t/zcash-block-explorer-grant/38141) dans le but de répondre aux besoins des utilisateurs de Zcash qui ont besoin d'une source fiable de leurs données de transactions Zcash et de l'état du réseau. Cela signifie que toute personne qui exécute un nœud Zcash peut exécuter son propre explorateur de chaînes de blocs !



# Explorateurs de la blockchain

## Introduction

Dans le monde des affaires traditionnel, chaque transaction comprend un reçu comme preuve d'achat. De même, dans le monde de la blockchain, un utilisateur reçoit un reçu numérique sous la forme d'un identifiant de transaction pour chaque transaction effectuée. La plupart des portefeuilles vous le fourniront. Les explorateurs de blockchain sont simplement des outils qui permettent de visualiser ce qui s'est déjà passé sur une blockchain. Ils prennent pour entrées : les identifiants de transaction, les adresses ou les hachages de bloc, et affichent visuellement ce qui s'est passé.

## Exemples

Bitcoin : [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)
    
    
Ethereum : [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)
    
 
Cosmos : [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)


Zcash (public) : [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://zcashblockexplorer.com/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)
  
  
Zcash (privé) : [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://zcashblockexplorer.com/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)


#### Remarquez avec Zcash comment la deuxième transaction a tous les détails importants cachés, c'est important et a de grandes implications dans un monde numérique.


## Cartes de chaînes de blocs

Nous avons donc cette longue chaîne de caractères sous forme de reçu numérique, et maintenant ? C'est là que nous utilisons un explorateur de blockchain, ou une carte, pour nous aider à digérer ce qui s'est passé sur la blockchain. Remarquez comment chaque chaîne a sa propre version de l'explorateur de blockchain ci-dessus. Il est important de comprendre que tous ces projets blockchain sont des exemples de logiciels open source. C'est-à-dire que n'importe qui peut contribuer et/ou forker le code à sa guise. Avec cette compréhension, chaque projet se spécialise dans différents domaines et personnalise l'explorateur de blockchain pour répondre aux besoins dudit projet.

### Blocs
Les transactions sont placées dans des *blocs*. Lorsqu'un bloc est extrait/validé, chaque transaction à l'intérieur de ce bloc est confirmée et un hachage de bloc est créé. Tout hachage créé peut être entré dans un explorateur de blocs. Vous avez peut-être vu que CEX a besoin d'un certain nombre de *confirmations* avant de débloquer vos fonds, c'est la métrique qu'ils utilisent pour s'assurer que votre transaction est
suffisamment finalisé. Comment la blockchain détermine-t-elle quelles transactions entrent dans le bloc suivant ? Sujet de recherche complexe, mais la plupart des chaînes modernes utilisent l'idée de * frais * pour déterminer qui se retrouve en tête de file. Plus les frais sont élevés, plus vous avez de chances de passer en tête de la file d'attente.

### Adresses

Une façon amusante d'apprendre visuellement les explorateurs de blockchain consiste à saisir l'adresse de toute transaction aléatoire. Ensuite, vous pouvez remonter dans le temps et voir d'où proviennent les fonds ! Chaque transaction a une adresse d'entrée et une adresse de sortie. Armé de ces informations, on peut facilement avancer et reculer à partir de n'importe quelle transaction qui a été dépensée. Pour ceux qui aiment les puzzles, il s'agit de l'équivalent numérique d'un énorme puzzle financier, et pourrait être utilisé à des fins de transparence. L'utilisation d'un explorateur de chaînes de blocs rend non seulement cela beaucoup plus facile à visualiser, mais il * souligne également * le besoin de confidentialité des transactions. À moins que vous n'utilisiez du Zcash blindé, vous pouvez le faire avec *n'importe** blockchain transparente : BTC, ETH, ATOM, DOGE, VTC, etc... . Ce point est essentiel pour toute personne utilisant la blockchain qui se déplace en toute sécurité vers un avenir uniquement numérique.

### Les montants

Semblable aux adresses ci-dessus, toute transaction sur une blockchain publique a les montants publiquement disponibles en affichage complet. Cela inclut les montants sur les adresses d'entrée et de sortie pour toute transaction. Une exception à cela est lorsque vous choisissez d'utiliser Shielded Zcash - alors tous les montants sont masqués. Pour les propriétaires de petites entreprises qui ont nécessairement besoin d'intimité pour le * commerce équitable *, c'est un énorme avantage !

![montants](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### Guide visuel

Voici quatre bons exemples de différents explorateurs de blockchain :

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcashblockexplorer](https://zcashblockexplorer.com/)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


![ethExplorer](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


![zcashExplorer](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)


![cosmos](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)





