# Le tourniquet

## TL;DR

- Le tourniquet est une règle de comptabilité publique qui suit la quantité de valeur qui entre et qui sort de chaque pool shielded
- Il permet à n’importe qui de vérifier qu’un pool ne verse jamais plus que ce qui y a été déposé, même si les transactions à l’intérieur sont privées
- Cela protège l’offre de ZEC contre un bug caché, car des pièces contrefaites ne peuvent pas sortir d’un pool sans fausser le décompte
- Il fonctionne sans affaiblir la confidentialité, puisque seuls les totaux des pools sont publics, jamais les transactions individuelles
- Le tourniquet est la raison pour laquelle la migration d’Orchard vers Ironwood peut prouver que l’offre shielded est saine

<br/>

## À qui s’adresse ceci

- Toute personne qui veut comprendre comment Zcash garantit la fiabilité de son offre privée
- Les utilisateurs qui suivent la migration d’Orchard vers Ironwood et se demandent comment elle prouve que l’offre est réelle
- Les nouveaux venus curieux de savoir comment un système monétaire privé peut quand même être audité

<br/>

## Le défi

Le Zcash shielded masque les montants, les expéditeurs et les destinataires. C’est tout l’intérêt. Mais cela soulève une question difficile : si personne ne peut voir à l’intérieur du pool shielded, comment savoir si la quantité totale de ZEC est correcte ? Comment auditer une monnaie qu’on ne peut pas voir ?

Si un bug permettait un jour à quelqu’un de forger des pièces à l’intérieur d’un pool shielded, cette falsification serait cachée par la même confidentialité qui protège les utilisateurs honnêtes. Sans garde-fou, cette incertitude minerait la confiance dans l’ensemble de l’offre. Le tourniquet est le garde-fou qui résout ce problème.

<br/>

## Ce qu’est le tourniquet

Imaginez chaque pool shielded comme une pièce avec une seule porte comptabilisée. Chaque fois que de la valeur entre dans le pool depuis l’extérieur, ou en sort pour aller ailleurs, elle passe par cette porte et est comptée publiquement. Les transactions à l’intérieur de la pièce restent privées, mais le total cumulé à la porte est visible par tous.

La règle est simple : un pool ne peut jamais laisser sortir plus de valeur qu’il n’en a reçu. Les nodes rejettent tout bloc qui ferait tomber le solde d’un pool sous zéro. Le montant censé se trouver dans un pool est connu à tout moment, puisqu’il s’agit simplement du total entré moins le total sorti. Ce décompte public, c’est le tourniquet.

<br/>

## Comment cela fonctionne

Zcash a eu plusieurs pools shielded au cours de son histoire, comme Sprout, Sapling et Orchard. La valeur circule entre la chaîne transparente et ces pools, et parfois entre les pools eux-mêmes. Le tourniquet surveille ces mouvements :

1. Quand des ZEC entrent dans un pool shielded, le montant est ajouté au solde public de ce pool
2. Quand des ZEC sortent d’un pool, le montant est soustrait
3. Le réseau rejette tout bloc qui ferait passer le solde d’un pool en négatif, ce qui signifierait qu’il en est sorti plus qu’il n’y est jamais entré
4. Les transactions shielded individuelles restent entièrement privées, seuls les totaux des pools sont publics

Le réseau suit de cette façon un solde pour chaque pool de valeur, y compris Sprout, Sapling, Orchard, le nouveau pool Ironwood, ainsi que les soldes transparents et lockbox. Grâce à cela, même si le contenu exact d’un pool est caché, le maximum qui peut jamais en sortir est plafonné par ce qui y est entré. Aucune inflation cachée ne peut s’échapper dans la circulation.

<br/>

## Comment le solde de valeur est vérifié

Le décompte à la porte n’est fiable que parce que chaque transaction est obligée de prouver qu’elle a déplacé un montant sincère, même si ce montant lui-même reste caché. Chaque transaction shielded publie un seul nombre honnête : la valeur nette qu’elle fait entrer dans le pool ou en sortir, appelée son solde de valeur. Un solde de valeur positif signifie que des fonds ont quitté le pool vers le côté transparent, un solde négatif signifie que des fonds y sont entrés. Les détails privés restent scellés, mais ce chiffre net unique est public, et c’est lui que le tourniquet additionne.

La partie ingénieuse est la manière dont une transaction prouve que ce nombre public est honnête sans révéler les montants privés qui le sous-tendent. Le mécanisme diffère selon le pool, et c’est là la véritable mécanique du tourniquet.

Dans le pool Sprout d’origine, chaque transaction utilise un JoinSplit. Un JoinSplit dépense deux notes cachées et en crée deux nouvelles, et il comporte deux champs publics : vpub_old, la valeur qui entre dans le pool shielded depuis le côté transparent, et vpub_new, la valeur qui quitte le pool pour retourner vers le côté transparent. Chaque JoinSplit doit être équilibré à lui seul, et sa preuve à divulgation nulle de connaissance garantit que les entrées cachées et les sorties cachées s’additionnent correctement. Le solde du pool Sprout est simplement le total cumulé de tous les vpub_old moins tous les vpub_new sur l’ensemble de la chaîne. C’est pourquoi Sprout est un exemple utile plus loin : comme vpub_old est le seul moyen pour la valeur d’entrer dans le pool, une seule règle qui le désactive peut sceller définitivement le pool.

Dans Sapling, Orchard et Ironwood, le solde est prouvé d’une façon plus intelligente, à l’aide d’une binding signature. Au lieu que chaque transfert s’équilibre seul, l’ensemble de la transaction engage chaque montant caché au moyen d’un value commitment. Un value commitment est une enveloppe scellée pour un nombre, construite avec un engagement de Pedersen homomorphe, qui possède une propriété particulière : les enveloppes peuvent être additionnées et soustraites sans être ouvertes. Le réseau additionne tous les engagements d’entrée, soustrait tous les engagements de sortie, et compare le résultat avec le chiffre net unique déclaré par la transaction, son champ valueBalance. Seule une transaction dont les montants cachés correspondent réellement à ce valueBalance public peut produire une binding signature valide sur les engagements combinés. Si quelqu’un essayait de déplacer plus de valeur qu’il ne l’a déclaré, les engagements ne s’additionneraient pas, la binding signature ne serait pas vérifiée, et la transaction serait rejetée. Ironwood utilise le même protocole qu’Orchard, donc cela fonctionne de la même manière.

C’est aussi ce qui permet de vérifier en toute sécurité un transfert entre pools. Quand des fonds passent d’un pool shielded à un autre, par exemple d’Orchard vers Ironwood, la transaction ne peut pas cacher les montants à la comptabilité. Chaque pool a son propre solde de valeur qui doit être satisfait par ses propres preuves : le côté Orchard doit montrer une sortie correspondante via sa binding signature, et le côté Ironwood doit montrer l’entrée correspondante via la sienne. La valeur qui quitte un pool et la valeur qui entre dans l’autre sont chacune prouvées indépendamment, de sorte qu’un mouvement entre pools correspond en réalité à deux passages par le tourniquet dans une seule transaction, une sortie et une entrée, et les deux sont comptabilisés publiquement même si les montants sous-jacents restent privés.

Donc le tourniquet n’est pas une question de confiance. Chaque transaction prouve mathématiquement son propre effet net, le réseau additionne ces effets nets prouvés par pool, et une règle de consensus (ZIP 209) rejette tout bloc qui ferait passer le solde d’un pool en négatif. Preuve au niveau de la transaction, application au niveau de la chaîne.

<br/>

## Pourquoi c’est important

Le tourniquet donne à Zcash trois choses à la fois.

Premièrement, il compartimente le risque. Un bug cryptographique dans un pool reste contenu à ce pool, parce que le tourniquet empêche une valeur falsifiée de passer dans l’offre plus large.

Deuxièmement, il permet à la communauté de vérifier l’offre rétrospectivement. Si un bug est découvert plus tard, l’historique du tourniquet montre si davantage de valeur a un jour quitté un pool qu’il n’y en est entré. Un historique propre est un indice solide qu’aucune contrefaçon n’a été exploitée.

Troisièmement, il préserve la confidentialité tout en faisant tout cela. Seuls les totaux au niveau des pools sont publics. Vos transactions individuelles restent shielded. Auditabilité et confidentialité coexistent, ce qui est rare et constitue l’une des forces discrètes de Zcash.

<br/>

## Le tourniquet en action

Le tourniquet n’est pas nouveau, et il a été utilisé à des moments clés de l’histoire de Zcash.

Quand Zcash est passé du pool Sprout d’origine vers le plus récent pool Sapling, le tourniquet a protégé la transition. Le pool Sprout a ensuite été restreint afin qu’il ne puisse plus recevoir de nouvelles entrées, ce qui a encouragé les utilisateurs à migrer tout en laissant le tourniquet maintenir une comptabilité honnête. Des années plus tard, le fait qu’aucune valeur n’ait jamais quitté Sprout de manière indue constitue un élément montrant que sa cryptographie initiale n’a jamais été exploitée avec succès.

Le même design protège maintenant le passage d’Orchard à Ironwood. En 2026, un bug de solidité a été découvert puis corrigé dans le système de preuve d’Orchard. Il n’existe aucune preuve qu’il ait jamais été exploité, mais comme l’activité shielded est privée, la certitude était impossible. La réponse consiste à sceller l’ancien pool Orchard et à faire migrer tous les fonds via le tourniquet vers Ironwood, un nouveau pool utilisant le protocole corrigé. Forcer les fonds à passer par le tourniquet signifie que d’éventuelles pièces contrefaites restées derrière ne peuvent pas suivre, et une fois la migration terminée, n’importe qui peut confirmer que l’offre shielded est saine.

<br/>

## Dépréciation unidirectionnelle d’un pool

Le tourniquet permet de retirer en toute sécurité un ancien pool, dans un seul sens, sans jamais rompre la garantie sur l’offre. L’astuce consiste à fermer l’entrée tout en laissant la sortie ouverte.

Sprout est l’exemple le plus clair. Pour le déprécier, ZIP 211 a ajouté une seule règle de consensus : à partir de sa hauteur d’activation, le champ vpub_old de chaque JoinSplit doit être égal à zéro. Comme vpub_old est le seul moyen pour la valeur d’entrer dans Sprout, l’obliger à zéro signifie qu’aucune nouvelle valeur ne peut plus jamais y entrer, tandis que la valeur peut toujours en sortir vers le côté transparent ou continuer vers Sapling. Le pool est devenu à sens unique. Il ne peut que se vider, jamais se remplir. Le tourniquet continue de compter pendant tout ce temps, donc le solde peut baisser au fur et à mesure que les fonds sortent, mais il ne peut jamais remonter, ni devenir négatif.

La migration d’Orchard vers Ironwood utilise la même idée. Lors de la mise à niveau NU6.3, le pool Orchard est fermé aux nouvelles entrées, et les wallets sont orientés pour envoyer les fonds Orchard à travers le tourniquet vers le nouveau pool Ironwood. Orchard devient un pool à sens unique qui ne peut que se vider. Comme chaque sortie est un passage par le tourniquet qui doit être prouvé, toute valeur potentiellement contrefaite restée dans Orchard ne peut pas discrètement suivre les fonds honnêtes vers la sortie. Elle reste bloquée dans un pool qui ne fait que se vider et dont la porte est surveillée. Avec le temps, cela pousse l’ancien pool vers le vide et permet à n’importe qui de confirmer que la valeur qui en est sortie n’a jamais dépassé la valeur qui y est honnêtement entrée.

C’est la raison plus profonde pour laquelle le tourniquet compte au-delà de la simple comptabilité. C’est le mécanisme qui permet à Zcash de déprécier un pool shielded, que ce soit pour réduire la complexité comme avec Sprout, ou pour se remettre d’un bug découvert comme avec Orchard, tout en conservant une garantie continue, publique et démontrable sur l’offre.

<br/>

## Idées reçues courantes

- Le tourniquet ne révèle pas vos transactions. Il additionne uniquement les totaux des pools, pas qui a envoyé quoi à qui
- Il n’identifie pas un faussaire par son nom. Il plafonne la quantité qui peut sortir d’un pool, et c’est ce qui protège l’offre
- Ce n’est pas une nouvelle invention pour Ironwood. Il a protégé chaque grande transition de pool shielded dans l’histoire de Zcash
- Un total public de pool n’affaiblit pas la confidentialité. La confidentialité réside dans les transactions à l’intérieur du pool, qui restent cachées

<br/>

## Ressources

1. [ZIP 209 : Interdire les soldes de pool de valeur de chaîne hors plage](https://zips.z.cash/zip-0209) - la règle de consensus derrière le tourniquet
2. [ZIP 211 : Désactiver l’ajout de nouvelle valeur au pool de valeur de chaîne Sprout](https://zips.z.cash/zip-0211) - comment le pool Sprout a été fermé aux nouveaux dépôts
3. [ZIP 258 : NU6.3](https://zips.z.cash/zip-0258) - la mise à niveau qui introduit le pool Ironwood et oriente la valeur à travers le tourniquet
4. [Application du tourniquet contre la contrefaçon](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - l’explication originale de Electric Coin Company
5. [Spécification du protocole Zcash](https://zips.z.cash/protocol/protocol.pdf) - voir les sections sur le solde et la binding signature pour tous les détails
6. [Pools de valeur, le Zebra Book](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - comment un node suit le solde de valeur de chaque pool

<br/>

## Pages connexes

- [Pools shielded](https://zechub.wiki/using-zcash/shielded-pools) - comment les transactions shielded de Zcash gardent les détails privés
- [Halo](https://zechub.wiki/zcash-tech/halo) - le système de preuve derrière le pool Orchard
- [Mises à niveau du réseau](https://zechub.wiki/start-here/network-upgrades) - comment Zcash active des changements comme de nouveaux pools shielded
