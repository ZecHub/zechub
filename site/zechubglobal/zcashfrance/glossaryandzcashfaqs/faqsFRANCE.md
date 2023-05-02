# Questions fréquemment posées

Une liste de sujets avec les questions les plus fréquemment posées sur Zcash. Pour dépanner le client Zcash, veuillez consulter [documentation de dépannage](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).


## Qu'est-ce que Zcash ?

Zcash est une monnaie numérique rapide et confidentielle avec des frais peu élevés. La confidentialité est la caractéristique centrale de Zcash. Il a été le premier à utiliser des preuves à connaissance nulle pour protéger les informations des utilisateurs en cryptant toutes les transactions. Il existe plusieurs portefeuilles que vous pouvez télécharger pour des paiements instantanés, mobiles, sécurisés et privés.

[Portefeuilles mobiles](https://z.cash/wallets/)


## Comment puis-je acquérir Zcash ?

Vous pouvez acheter ZEC à partir de crypto-monnaie [exchanges](https://z.cash/exchanges). Vous pouvez également acheter Zcash directement auprès d'une autre personne de manière peer-to-peer. Soyez prudent lorsque vous échangez avec des services et des personnes que vous ne connaissez pas. Vous pouvez également acquérir Zcash en minant Zcash.


## Quelle est la différence entre le Zcash et les autres crypto-monnaies ?

Zcash est fondamentalement plus privé que d'autres crypto-monnaies telles que Bitcoin ou Ethereum. Zcash prend en charge des temps de blocage rapides (75 secondes), des frais peu élevés et des calendriers de mise à niveau réguliers, ce qui signifie que ce protocole est hautement adaptable. Une caractéristique clé est la confidentialité facultative mais hautement sécurisée.

Les utilisateurs peuvent choisir si une transaction est effectuée sur la partie transparente ou protégée de la blockchain. Pour plus d'informations, voir [ici](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html)

## Comment le protocole Zcash est-il régi ?

Le protocole est régi par le processus de proposition d'amélioration Zcash. Le processus ZIP fournit un lieu et une structure ouverts pour évaluer collectivement les modifications apportées à Zcash.

Tout le monde peut soumettre un projet de ZIP. Les brouillons de ZIP sont débattus par la communauté dans son ensemble, puis acceptés ou rejetés par les éditeurs de ZIP.

Il existe actuellement deux éditeurs ZIP - [Daira Hopwood](https://twitter.com/feministPLT) représente l'Electric Coin Company et [Deirdre Connolly](https://twitter.com/durumcrustulum) représente la Fondation Zcash.

Les décisions du processus ZIP sont écrites dans la spécification Zcash, ainsi que dans le logiciel qui gère le réseau. Les changements sont "ratifiés" en chaîne lorsque la majorité du réseau adopte la mise à niveau et ne rompt pas le consensus.

## Où est ma transaction ?

Lisez d'abord [notre article](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629) sur les explorateurs de blocs. Vérifiez ensuite avec [Zcash block explorer](https://zcashblockexplorer.com) en notant que toutes les transactions expirent par défaut après environ 25 minutes/20 blocs et que les fonds sont renvoyés à l'adresse d'envoi d'origine.

Si votre transaction expire, la meilleure chose à faire est de réessayer votre transaction avec quelques modifications possibles.

Il peut y avoir diverses raisons pour lesquelles votre transaction n'est pas incluse dans un bloc :

+ Perte de connectivité

+ Frais de transaction trop bas

+ Surcharge du réseau

+ Trop d'entrées transparentes (taille de transaction trop grande)


Nous vous suggérons de réessayer votre transaction avec :

+ Réessayez avec une meilleure connexion

+ Utilisez les frais standard

+ Réessayez plus tard ou augmentez les frais pour les transactions hautement prioritaires

+ Utilisez un minimum d'entrées pour limiter la taille ou augmentez les frais pour les transactions importantes



## Zcash est-il vraiment privé ?

Oui, Zcash permet une confidentialité totale pour les utilisateurs en chiffrant les données de l'expéditeur, du montant et du destinataire dans les transactions à signature unique publiées dans son registre public de blockchain, en particulier pour les transactions impliquant des adresses protégées.

Zcash ne crypte pas les données pour les transactions multisignatures (en attendant l'intégration de FROST) ou ne protège pas contre les corrélations faites avec les transactions publiques *transparentes* (par exemple, lorsque Zcash est échangé vers/depuis une autre crypto-monnaie) et ne masque pas non plus les adresses IP.

Pour en savoir plus, cliquez ici : [Un écosystème protégé](https://electriccoin.co/blog/shielded-ecosystem)

___


## Quelques idées fausses courantes

+ Le Zcash est-il un coin centralisé ?
 

   Non, un accord de marque en place empêche la Fondation Zcash ou l'ECC de prendre toute mesure contraire au consensus clair de la communauté Zcash.

   Un consensus clair est déterminé par un sondage communautaire à l'intérieur et à l'extérieur du comité consultatif communautaire, un groupe d'environ 90 bénévoles ayant un intérêt ou une connaissance approfondie de l'écosystème Zcash.

   Ici, Messari Research détaille l'histoire éprouvée de la gouvernance décentralisée et de la prise de décision communautaire de Zcash : https://messari.io/report/decentralizing-zcash

   Les mérites du vote en chaîne et du vote des détenteurs de pièces ont été discutés pour un éventuel futur mécanisme de preuve de participation. Il a déjà été utilisé par la communauté Zcash voir [ici](https://forum.zcashcommunity.com/t/coin-holder-polling-instructions/40170).

   Des projets tels que le club A/V de la Fondation Zcash et ZecHub permettent une participation et une contribution diverses des membres de la communauté ou des personnes intéressées par la production de contenu de qualité de manière asynchrone avec des opportunités de gagner des ZEC non KYC.

   Pour plus d'informations sur les principales organisations Zcash + les rôles dans l'équipe de chaque organisation, voir [ici](https://zechub.notion.site/Zcash-Basics-d2946ad9c3b541759174dbcbf0e8c9cc).
   
   Pour savoir exactement comment le Dev Fund est divisé entre les principales organisations, voir [ici](https://zechub.notion.site/Zcash-Development-Fund-aa3e0ac2a8514d97aef5254f3b76d7b2).



+ Zcash a-t-il une porte dérobée ?

  Non, ni Zcash ni aucun autre algorithme ou logiciel cryptographique que nous avons créé ne contient de porte dérobée, et ils ne le feront jamais.



+ Est-ce que Zcash est contrôlé par une société ?

   Incorrect. Alors que Zcash s'est associé à de grandes entreprises et à des banques pour des programmes de recherche et de sensibilisation, nous restons déterminés à atteindre son objectif de liberté et de résilience économiques grâce à la décentralisation.
   
   Zcash a plusieurs organisations qui conservent un niveau d'autonomie et ne sont donc pas redevables à une seule partie. Au lieu de cela, travaillez ensemble pour promouvoir l'auto-garde des actifs, en finançant des implémentations de nœuds indépendants et en menant une formation réglementaire liée à la défense de la confidentialité numérique et à la protection des droits de l'homme.




+ Zcash a une confidentialité limitée par rapport aux autres pièces de confidentialité
   
    Non, la confidentialité obtenue grâce à une pièce privée comme Monero ou Grin/Litecoin dépend principalement de son utilisation de leurres qui masquent la source et la destination des transactions. Les données du graphique des transactions sont toujours accessibles.
    
    Si un adversaire devait consacrer suffisamment de temps et de ressources à surveiller la chaîne, ce type de confidentialité peut être vaincu. Zcash crypte toutes les données de transaction afin que la même méthode d'attaque ne fonctionne pas. Toutes les transactions sont indiscernables au sein d'un pool protégé.

    Il n'y a pas de solution parfaite, en particulier si un adversaire donné a accès à beaucoup de temps et de ressources telles que les réseaux de neurones d'IA. Nous avons précisé les circonstances (croissantes) dans lesquelles il pourrait être plus avantageux d'utiliser une solution à connaissance nulle par rapport à une solution basée sur un leurre.
    [Lire la suite](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)


