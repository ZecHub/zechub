# Le tourniquet

## TL;DR

- Le tourniquet est une règle de comptabilité publique qui suit la quantité de valeur entrant et sortant de chaque pool blindé
- Il permet à quiconque de vérifier qu’un pool ne verse jamais plus que ce qui y a été déposé, même si les transactions à l’intérieur sont privées
- Cela protège l’offre de ZEC contre un bug caché, car des pièces contrefaites ne peuvent pas sortir d’un pool sans rompre le décompte
- Il fonctionne sans affaiblir la confidentialité, puisque seuls les totaux des pools sont publics, jamais les transactions individuelles
- Le tourniquet est la raison pour laquelle la migration d’Orchard vers Ironwood peut prouver que l’offre blindée est saine

<br/>

## À qui s’adresse cette page

- Toute personne qui veut comprendre comment Zcash maintient la fiabilité de son offre privée
- Les utilisateurs qui suivent la migration d’Orchard vers Ironwood et se demandent comment elle prouve que l’offre est réelle
- Les nouveaux venus curieux de comprendre comment un système monétaire privé peut tout de même être audité

<br/>

## Le défi

Le Zcash blindé masque les montants, les expéditeurs et les destinataires. C’est précisément l’objectif. Mais cela soulève une question difficile : si personne ne peut voir à l’intérieur du pool blindé, comment savoir si la quantité totale de ZEC est correcte ? Comment auditer de l’argent qu’on ne peut pas voir ?

Si un bug permettait un jour à quelqu’un de forger des pièces à l’intérieur d’un pool blindé, cette falsification serait masquée par la même confidentialité qui protège les utilisateurs honnêtes. Sans garde-fou, cette incertitude minerait la confiance dans l’ensemble de l’offre. Le tourniquet est le garde-fou qui résout ce problème.

<br/>

## Ce qu’est le tourniquet

Imaginez chaque pool blindé comme une pièce avec une unique porte d’entrée comptabilisée. Chaque fois qu’une valeur entre dans le pool depuis l’extérieur, ou le quitte pour aller ailleurs, elle passe par cette porte et est comptée publiquement. Les transactions à l’intérieur de la pièce restent privées, mais le total cumulé à la porte est visible par tous.

La règle est simple : un pool ne peut jamais laisser sortir plus de valeur qu’il n’en est entré. Les nœuds rejettent tout bloc qui ferait passer le solde d’un pool sous zéro. La quantité supposée se trouver dans un pool est connue à tout moment, car elle correspond simplement au total entré moins le total sorti. Ce décompte public, c’est le tourniquet.

<br/>

## Comment cela fonctionne

Zcash a connu plusieurs pools blindés au cours de son histoire, comme Sprout, Sapling et Orchard. La valeur circule entre la chaîne transparente et ces pools, et parfois aussi entre les pools eux-mêmes. Le tourniquet surveille ces mouvements :

1. Quand des ZEC entrent dans un pool blindé, le montant est ajouté au solde public de ce pool
2. Quand des ZEC sortent d’un pool, le montant est soustrait
3. Le réseau rejette tout bloc qui rendrait le solde d’un pool négatif, ce qui signifierait qu’il en est sorti plus qu’il n’y est jamais entré
4. Les transactions blindées individuelles restent entièrement privées ; seuls les totaux des pools sont publics

Le réseau suit ainsi un solde pour chaque pool de valeur, y compris Sprout, Sapling, Orchard, le nouveau pool Ironwood, ainsi que les soldes transparents et lockbox. Grâce à cela, même si le contenu exact d’un pool est caché, le maximum qui pourra jamais en sortir reste limité par ce qui y est entré. Aucune inflation cachée ne peut s’échapper dans la circulation.

<br/>

## Comment le solde de valeur est vérifié

Le décompte à la porte n’est fiable que parce que chaque transaction est obligée de prouver qu’elle a déplacé un montant exact, même si le montant lui-même reste caché. Chaque transaction blindée publie un seul chiffre honnête : la valeur nette qu’elle fait entrer dans le pool ou en sortir, appelée son solde de valeur. Un solde de valeur positif signifie que des fonds sont sortis du pool vers la partie transparente, un solde négatif signifie que des fonds y sont entrés. Les détails privés restent scellés, mais cette seule valeur nette est publique, et c’est elle que le tourniquet additionne.

La partie ingénieuse est la manière dont une transaction prouve que ce nombre public est honnête sans révéler les montants privés qui se trouvent derrière. Le mécanisme diffère selon le pool, et c’est là que se trouve la véritable machinerie du tourniquet.

Dans le pool Sprout d’origine, chaque transaction utilise un JoinSplit. Un JoinSplit dépense deux notes cachées et en crée deux nouvelles, et il comporte deux champs publics : vpub_old, la valeur entrant dans le pool blindé depuis la partie transparente, et vpub_new, la valeur quittant le pool pour revenir vers la partie transparente. Chaque JoinSplit doit être équilibré individuellement, et sa preuve à divulgation nulle de connaissance garantit que les entrées cachées et les sorties cachées s’additionnent correctement. Le solde du pool Sprout n’est rien d’autre que le total cumulé de tous les vpub_old moins tous les vpub_new sur l’ensemble de la chaîne. C’est pourquoi Sprout est un exemple utile plus loin : puisque vpub_old est la seule manière pour la valeur d’entrer dans le pool, une règle unique qui le désactive peut sceller définitivement le pool.

Dans Sapling, Orchard et Ironwood, l’équilibre est prouvé d’une manière plus intelligente, à l’aide d’une binding signature. Au lieu que chaque transfert soit équilibré individuellement, la transaction entière engage chaque montant caché au moyen d’un engagement de valeur. Un engagement de valeur est une enveloppe scellée pour un nombre, construite à l’aide d’un engagement de Pedersen homomorphe, qui possède une propriété particulière : les enveloppes peuvent être additionnées et soustraites sans être ouvertes. Le réseau additionne tous les engagements d’entrée, soustrait tous les engagements de sortie, et compare le résultat à la valeur nette unique déclarée par la transaction, son champ valueBalance. Seule une transaction dont les montants cachés correspondent réellement à ce valueBalance public peut produire une binding signature valide sur les engagements combinés. Si quelqu’un essayait de déplacer plus de valeur que ce qu’il a déclaré, les engagements ne s’additionneraient pas correctement, la binding signature ne serait pas vérifiée, et la transaction serait rejetée. Ironwood utilise le même protocole qu’Orchard, donc cela fonctionne de la même manière.

C’est aussi ce qui permet de vérifier en toute sécurité un transfert entre pools. Quand des fonds passent d’un pool blindé à un autre, par exemple d’Orchard vers Ironwood, la transaction ne peut pas masquer les montants à la comptabilité. Chaque pool possède son propre solde de valeur, qui doit être satisfait par ses propres preuves : le côté Orchard doit montrer une sortie correspondante via sa binding signature, et le côté Ironwood doit montrer l’entrée correspondante via la sienne. La valeur qui quitte un pool et celle qui entre dans l’autre sont chacune prouvées indépendamment. Ainsi, un déplacement entre pools correspond en réalité à deux franchissements du tourniquet au sein d’une seule transaction, une sortie et une entrée, et les deux sont comptabilisés publiquement même si les montants sous-jacents restent privés.

Le tourniquet n’est donc pas une question de confiance. Chaque transaction prouve mathématiquement son propre effet net, le réseau additionne ces effets nets prouvés par pool, et une règle de consensus (ZIP 209) rejette tout bloc qui ferait passer le solde d’un pool en dessous de zéro. Preuve au niveau de la transaction, application au niveau de la chaîne.

<br/>

## Pourquoi c’est important

Le tourniquet donne à Zcash trois choses à la fois.

D’abord, il compartimente le risque. Un bug cryptographique dans un pool reste contenu à ce pool, car le tourniquet empêche qu’une valeur falsifiée ne se propage au reste de l’offre.

Ensuite, il permet à la communauté de vérifier l’offre a posteriori. Si un bug est découvert plus tard, l’enregistrement du tourniquet montre si davantage de valeur a un jour quitté un pool qu’il n’en était entré. Un historique propre constitue une preuve solide qu’aucune contrefaçon n’a été exploitée.

Enfin, il préserve la confidentialité tout en accomplissant tout cela. Seuls les totaux au niveau des pools sont publics. Vos transactions individuelles restent blindées. L’auditabilité et la confidentialité coexistent, ce qui est inhabituel et constitue l’une des forces discrètes de Zcash.

<br/>

## Le tourniquet en action

Le tourniquet n’est pas nouveau, et il a été utilisé à des moments clés de l’histoire de Zcash.

Lorsque Zcash est passé du pool Sprout d’origine vers le pool Sapling plus récent, le tourniquet a protégé la transition. Le pool Sprout a ensuite été restreint afin de ne plus pouvoir recevoir de nouvelles entrées, ce qui a encouragé les utilisateurs à migrer pendant que le tourniquet maintenait une comptabilité honnête. Des années plus tard, le fait qu’aucune valeur n’ait jamais quitté Sprout de manière indue constitue un indice que sa cryptographie initiale n’a jamais été exploitée avec succès.

Le même design protège maintenant le passage d’Orchard à Ironwood. En 2026, un bug de soundness a été découvert puis corrigé dans le système de preuves d’Orchard. Rien n’indique qu’il ait jamais été exploité, mais comme l’activité blindée est privée, la certitude était impossible. La réponse consiste à sceller l’ancien pool Orchard et à faire migrer tout le monde via le tourniquet vers Ironwood, un nouveau pool utilisant le protocole corrigé. Faire passer les fonds par le tourniquet signifie que d’éventuelles pièces contrefaites laissées derrière ne peuvent pas suivre, et une fois la migration terminée, n’importe qui peut confirmer que l’offre blindée est saine.

<br/>

## Dépréciation unidirectionnelle d’un pool

Le tourniquet permet de retirer un ancien pool en toute sécurité, dans une seule direction, sans jamais rompre la garantie sur l’offre. L’astuce consiste à fermer l’entrée tout en laissant la sortie ouverte.

Sprout en est l’exemple le plus clair. Pour le déprécier, ZIP 211 a ajouté une règle de consensus unique : à partir de sa hauteur d’activation, le champ vpub_old de chaque JoinSplit doit être égal à zéro. Puisque vpub_old est la seule manière pour la valeur d’entrer dans Sprout, le forcer à zéro signifie qu’aucune nouvelle valeur ne peut plus jamais y entrer, tandis que la valeur peut toujours en sortir vers la partie transparente ou continuer vers Sapling. Le pool est ainsi devenu unidirectionnel. Il peut seulement se vider, jamais se remplir. Le tourniquet continue de compter pendant tout ce temps, si bien que le solde peut baisser à mesure que les fonds sortent, mais il ne peut jamais augmenter, ni devenir négatif.

La migration d’Orchard vers Ironwood utilise la même idée. Lors de la mise à niveau NU6.3, le pool Orchard est fermé aux nouvelles entrées, et les wallets sont dirigés pour envoyer les fonds Orchard à travers le tourniquet vers le nouveau pool Ironwood. Orchard devient un pool unidirectionnel qui ne peut que se vider. Comme chaque sortie correspond à un franchissement du tourniquet qui doit être prouvé, toute valeur contrefaite hypothétique restée dans Orchard ne peut pas suivre discrètement les fonds honnêtes vers l’extérieur. Elle reste bloquée dans un pool qui ne fait que se vider et dont la porte est surveillée. Avec le temps, cela pousse l’ancien pool vers le vide et permet à quiconque de confirmer que la valeur qui en est sortie n’a jamais dépassé la valeur qui y était honnêtement entrée.

C’est la raison plus profonde pour laquelle le tourniquet compte au-delà de la simple comptabilité. C’est le mécanisme qui permet à Zcash de déprécier un pool blindé, que ce soit pour réduire la complexité comme avec Sprout, ou pour se remettre d’un bug découvert comme avec Orchard, tout en conservant une garantie continue, publique et démontrable sur l’offre.

<br/>

## Idées reçues courantes

- Le tourniquet ne révèle pas vos transactions. Il ne comptabilise que les totaux des pools, pas qui a envoyé quoi à qui
- Il n’identifie pas un contrefacteur par son nom. Il limite la quantité qui peut sortir d’un pool, ce qui est ce qui protège l’offre
- Ce n’est pas une nouvelle invention pour Ironwood. Il a protégé chaque grande transition entre pools blindés dans l’histoire de Zcash
- Un total public de pool n’affaiblit pas la confidentialité. La confidentialité se trouve dans les transactions à l’intérieur du pool, qui restent cachées

<br/>

## Ressources

1. [ZIP 209 : Interdire les soldes de pools de valeur de chaîne hors plage](https://zips.z.cash/zip-0209) - la règle de consensus derrière le tourniquet
2. [ZIP 211 : Désactivation de l’ajout de nouvelle valeur au pool de valeur de chaîne Sprout](https://zips.z.cash/zip-0211) - comment le pool Sprout a été fermé aux nouveaux dépôts
3. [ZIP 258 : NU6.3](https://zips.z.cash/zip-0258) - la mise à niveau qui introduit le pool Ironwood et oriente la valeur à travers le tourniquet
4. [Application du tourniquet contre la contrefaçon](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - l’explication d’origine de Electric Coin Company
5. [Spécification du protocole Zcash](https://zips.z.cash/protocol/protocol.pdf) - voir les sections sur l’équilibre et la binding signature pour tous les détails
6. [Value Pools, le Zebra Book](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - comment un nœud suit le solde de valeur de chaque pool

<br/>

## Pages liées

- [Pools blindés](https://zechub.wiki/using-zcash/shielded-pools) - comment les transactions blindées de Zcash gardent les détails privés
- [Halo](https://zechub.wiki/zcash-tech/halo) - le système de preuve derrière le pool Orchard
- [Mises à niveau du réseau](https://zechub.wiki/start-here/network-upgrades) - comment Zcash active des changements comme de nouveaux pools blindés
