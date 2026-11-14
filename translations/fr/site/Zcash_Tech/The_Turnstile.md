# Le sas comptable

## En bref

- Le sas comptable est une règle de comptabilité publique qui suit la quantité de valeur qui entre dans chaque pool protégé et qui en sort
- Il permet à quiconque de vérifier qu'un pool ne verse jamais plus que ce qui y a été déposé, même si les transactions qui s'y déroulent sont confidentielles
- Cela protège l'offre de ZEC contre un bogue caché, car des pièces contrefaites ne peuvent pas quitter un pool sans fausser le décompte
- Les paiements à l'intérieur d'un pool restent confidentiels. Une transaction qui déplace des ZEC d'un pool à un autre révèle le montant déplacé
- Le sas comptable est la raison pour laquelle la migration de Orchard vers Ironwood peut prouver que l'offre protégée est saine

<br/>

## À qui s'adresse cette page

- À toute personne qui souhaite comprendre comment Zcash garantit la fiabilité de son offre confidentielle
- Aux utilisateurs qui suivent la migration de Orchard vers Ironwood et se demandent comment elle prouve que l'offre est réelle
- Aux nouveaux venus curieux de savoir comment un système monétaire confidentiel peut tout de même être audité

<br/>

## Le défi

Les Zcash protégés masquent les montants, les expéditeurs et les destinataires. Cette confidentialité est tout l'intérêt. Mais elle soulève une question difficile : si personne ne peut voir à l'intérieur du pool protégé, comment savoir que la quantité totale de ZEC est correcte ? Comment auditer de l'argent que l'on ne peut pas voir ?

Si un bogue permettait un jour à quelqu'un de contrefaire des pièces à l'intérieur d'un pool protégé, cette contrefaçon serait dissimulée par la même confidentialité qui protège les utilisateurs honnêtes. Sans garde-fou, cette incertitude minerait la confiance dans l'ensemble de l'offre. Le sas comptable est le garde-fou qui résout ce problème.

<br/>

## Ce qu'est le sas comptable

Imaginez chaque pool protégé comme une pièce dotée d'une seule porte, où chaque passage est compté. Chaque fois que de la valeur entre dans le pool depuis l'extérieur, ou en sort pour aller ailleurs, elle franchit cette porte et est comptabilisée publiquement. Les transactions à l'intérieur de la pièce restent confidentielles, mais le total cumulé à la porte est visible de tous.

La règle est simple : un pool ne peut jamais laisser sortir plus de valeur qu'il n'en est entré. Les nœuds rejettent tout bloc qui ferait passer le solde d'un pool sous zéro. Le montant censé se trouver dans un pool est connu à tout moment, car il s'agit simplement du total entré moins le total sorti. Ce décompte public, c'est le sas comptable.

<br/>

## Comment il fonctionne

Au fil de son histoire, Zcash a compté plusieurs pools protégés, comme Sprout, Sapling et Orchard. La valeur circule entre la chaîne transparente et ces pools, et parfois entre les pools eux-mêmes. Le sas comptable surveille ces mouvements :

1. Lorsque des ZEC entrent dans un pool protégé, le montant est ajouté au solde public de ce pool
2. Lorsque des ZEC sortent d'un pool, le montant est soustrait
3. Le réseau rejette tout bloc qui rendrait le solde d'un pool négatif, c'est-à-dire si plus de valeur en est sortie qu'il n'en est jamais entré
4. Chaque transaction ne révèle que son flux net entrant dans un pool ou sortant de celui-ci, son solde de valeur. Pour un paiement au sein d'un même pool, il s'agit simplement des frais

Le réseau suit ainsi un solde pour chaque pool de valeur, notamment Sprout, Sapling, Orchard, le nouveau pool Ironwood, ainsi que les soldes transparent et du coffre-fort. De ce fait, même si le contenu exact d'un pool est masqué, le maximum qui peut en sortir est plafonné par ce qui y est entré. Aucune inflation cachée ne peut s'échapper dans la circulation.

<br/>

## Comment le solde de valeur est vérifié

Le décompte à la porte n'est fiable que parce que chaque transaction est tenue de prouver qu'elle a déplacé un montant exact, même si ce montant reste lui-même masqué. Chaque transaction protégée publie un seul chiffre honnête : la valeur nette qu'elle fait entrer dans le pool ou en sortir, appelée son solde de valeur. Un solde de valeur positif signifie que des fonds ont quitté le pool vers le côté transparent, un solde négatif qu'ils y sont entrés. Les détails confidentiels restent scellés, mais ce chiffre net unique est public, et c'est lui que le sas comptable additionne.

L'astuce réside dans la façon dont une transaction prouve que ce chiffre public est honnête sans révéler les montants confidentiels qui le sous-tendent. Le mécanisme diffère selon le pool, et c'est là la véritable mécanique du sas comptable.

Dans le pool Sprout d'origine, chaque transaction utilise un JoinSplit. Un JoinSplit dépense deux notes masquées et en crée deux nouvelles, et il comporte deux champs publics : vpub_old, la valeur qui entre dans le pool protégé depuis le côté transparent, et vpub_new, la valeur qui quitte le pool pour retourner du côté transparent. Chaque JoinSplit doit être équilibré à lui seul, et sa preuve à divulgation nulle de connaissance garantit que les entrées et les sorties masquées s'additionnent correctement. Le solde du pool Sprout est simplement le total cumulé de tous les vpub_old moins tous les vpub_new sur l'ensemble de la chaîne. C'est pourquoi Sprout constitue un exemple utile plus loin : comme vpub_old est le seul moyen pour la valeur d'entrer dans le pool, une seule règle qui le désactive suffit à sceller le pool définitivement.

Dans Sapling, Orchard et Ironwood, l'équilibre est prouvé de manière plus astucieuse, à l'aide d'une signature de liaison. Au lieu que chaque transfert s'équilibre isolément, l'ensemble de la transaction s'engage sur chaque montant masqué au moyen d'un engagement de valeur. Un engagement de valeur est une enveloppe scellée contenant un nombre, construite avec un engagement de Pedersen homomorphe, qui possède une propriété particulière : les enveloppes peuvent être additionnées et soustraites sans être ouvertes. Le réseau additionne tous les engagements d'entrée, soustrait tous les engagements de sortie et compare le résultat au chiffre net unique déclaré par la transaction, son champ valueBalance. Seule une transaction dont les montants masqués correspondent réellement à ce valueBalance public peut produire une signature de liaison valide sur les engagements combinés. Si quelqu'un tentait de déplacer plus de valeur qu'il n'en a déclaré, les engagements ne s'additionneraient pas correctement, la signature de liaison ne serait pas vérifiée et la transaction serait rejetée. Ironwood utilise le même protocole Orchard et fonctionne donc de la même manière.

C'est aussi ce qui permet de vérifier en toute sécurité un transfert entre pools. Lorsque des fonds passent d'un pool protégé à un autre, par exemple de Orchard vers Ironwood, la transaction ne peut pas soustraire les montants à la comptabilité. Chaque pool a son propre solde de valeur, qui doit être satisfait par ses propres preuves : le côté Orchard doit montrer une sortie correspondante au moyen de sa signature de liaison, et le côté Ironwood doit montrer l'entrée correspondante au moyen de la sienne. La valeur qui quitte un pool et celle qui entre dans l'autre sont chacune prouvées indépendamment ; un déplacement entre pools correspond donc en réalité à deux passages du sas comptable dans une seule transaction, une sortie et une entrée, tous deux comptabilisés publiquement même si les montants sous-jacents restent confidentiels.

Le sas comptable ne repose donc pas sur la confiance. Chaque transaction prouve mathématiquement son propre effet net, le réseau additionne ces effets nets prouvés pour chaque pool, et une règle de consensus (ZIP 209) rejette tout bloc qui rendrait le solde d'un pool négatif. La preuve au niveau de la transaction, l'application au niveau de la chaîne.

<br/>

## Pourquoi c'est important

Le sas comptable apporte trois choses à la fois à Zcash.

Premièrement, il cloisonne les risques. Un bogue cryptographique dans un pool reste confiné à ce pool, car le sas comptable empêche la valeur contrefaite de se répandre dans l'offre globale.

Deuxièmement, il permet à la communauté de vérifier l'offre a posteriori. Si un bogue est découvert ultérieurement, l'historique du sas comptable montre si plus de valeur a jamais quitté un pool qu'il n'en est entré. Un historique sans anomalie constitue une preuve solide qu'aucune contrefaçon n'a été exploitée.

Troisièmement, il préserve la confidentialité des paiements à l'intérieur d'un pool tout en accomplissant tout cela. Chaque transaction ne publie que son flux net entrant dans un pool ou sortant de celui-ci, ce qui, pour un paiement au sein d'un même pool, correspond simplement aux frais. Un transfert entre pools, par exemple de Orchard vers Ironwood, révèle le montant qui passe de l'un à l'autre. Auditabilité et confidentialité coexistent, ce qui est inhabituel et constitue l'une des forces discrètes de Zcash.

<br/>

## Le sas comptable en action

Le sas comptable n'est pas nouveau : il a été utilisé à des moments clés de l'histoire de Zcash.

Lorsque Zcash est passé du pool Sprout d'origine au pool Sapling, plus récent, le sas comptable a protégé la transition. Le pool Sprout a ensuite été restreint afin de ne plus pouvoir recevoir de nouvelles entrées, ce qui a encouragé les utilisateurs à migrer tandis que le sas comptable garantissait l'exactitude de la comptabilité. Des années plus tard, le fait qu'aucune valeur n'ait jamais quitté Sprout de manière irrégulière prouve que sa cryptographie initiale n'a jamais été exploitée avec succès.

Le même dispositif protège désormais le passage de Orchard à Ironwood. En 2026, un bogue de solidité a été découvert et corrigé dans le système de preuve Orchard. Rien n'indique qu'il ait jamais été exploité, mais comme l'activité protégée est confidentielle, aucune certitude n'était possible. La réponse consiste à sceller l'ancien pool Orchard et à faire migrer tous les fonds à travers le sas comptable vers Ironwood, un nouveau pool qui utilise le protocole corrigé. Obliger les fonds à passer par le sas comptable signifie que d'éventuelles pièces contrefaites restées en arrière ne peuvent pas suivre, et une fois la migration terminée, chacun peut confirmer que l'offre protégée est saine.

<br/>

## Retrait progressif d'un pool à sens unique

Le sas comptable permet de retirer un ancien pool en toute sécurité, dans un seul sens, sans jamais compromettre la garantie sur l'offre. L'astuce consiste à fermer l'entrée tout en laissant la sortie ouverte.

Sprout en est l'exemple le plus clair. Pour le retirer progressivement, la ZIP 211 a ajouté une seule règle de consensus : à partir de sa hauteur d'activation, le champ vpub_old de chaque JoinSplit doit être égal à zéro. Comme vpub_old est le seul moyen pour la valeur d'entrer dans Sprout, le forcer à zéro signifie qu'aucune nouvelle valeur ne pourra plus jamais y entrer, tandis que la valeur peut toujours sortir vers le côté transparent ou poursuivre vers Sapling. Le pool est devenu à sens unique. Il ne peut que se vider, jamais se remplir. Le sas comptable continue de compter pendant tout ce temps : le solde peut diminuer à mesure que les fonds sortent, mais il ne peut jamais augmenter ni devenir négatif.

La migration de Orchard vers Ironwood repose sur la même idée. Lors de la mise à niveau NU6.3, le pool Orchard est fermé aux nouvelles entrées, et les portefeuilles sont invités à envoyer les fonds Orchard à travers le sas comptable vers le nouveau pool Ironwood. Orchard devient un pool à sens unique qui ne peut que se vider. Comme chaque sortie est un passage du sas comptable qui doit être prouvé, une éventuelle valeur contrefaite restée dans Orchard ne peut pas suivre discrètement les fonds honnêtes vers la sortie. Elle reste bloquée dans un pool qui ne fait que se vider et dont la porte est surveillée. Avec le temps, l'ancien pool tend ainsi à se vider, et chacun peut confirmer que la valeur qui en est sortie n'a jamais dépassé celle qui y était honnêtement entrée.

C'est la raison profonde pour laquelle le sas comptable compte au-delà de la simple comptabilité. C'est le mécanisme qui permet à Zcash de retirer progressivement un pool protégé, que ce soit pour réduire la complexité, comme avec Sprout, ou pour se remettre d'un bogue découvert, comme avec Orchard, tout en conservant une garantie continue, publique et prouvable sur l'offre.

<br/>

## Idées reçues

- Le sas comptable ne révèle pas qui a envoyé quoi à qui. Il révèle en revanche le montant de toute transaction qui déplace des ZEC d'un pool à un autre
- Il ne permet pas d'identifier un contrefacteur par son nom. Il plafonne ce qui peut quitter un pool, et c'est ce qui protège l'offre
- Ce n'est pas une nouveauté introduite pour Ironwood. Il a protégé chaque transition majeure de pool protégé dans l'histoire de Zcash
- Un total public par pool n'affaiblit pas la confidentialité des paiements à l'intérieur du pool. Déplacer des ZEC d'un pool à un autre révèle le montant déplacé, c'est pourquoi la ZIP 318 demande aux portefeuilles de migrer par montants standards au fil du temps

<br/>

## Ressources

1. [ZIP 209 : Interdire les soldes hors limites des pools de valeur de la chaîne](https://zips.z.cash/zip-0209) - la règle de consensus à l'origine du sas comptable
2. [ZIP 211 : Désactiver l'ajout de nouvelle valeur au pool de valeur Sprout de la chaîne](https://zips.z.cash/zip-0211) - comment le pool Sprout a été fermé aux nouveaux dépôts
3. [ZIP 258 : NU6.3](https://zips.z.cash/zip-0258) - la mise à niveau qui introduit le pool Ironwood et fait passer la valeur par le sas comptable
4. [Le sas comptable contre la contrefaçon](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - l'explication d'origine de Electric Coin Company
5. [Spécification du protocole Zcash](https://zips.z.cash/protocol/protocol.pdf) - consultez les sections sur l'équilibre et la signature de liaison pour tous les détails
6. [Pools de valeur, le livre Zebra](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - comment un nœud suit le solde de valeur de chaque pool

<br/>

## Pages connexes

- [Pools protégés](https://zechub.wiki/using-zcash/shielded-pools) - comment les transactions protégées de Zcash préservent la confidentialité des détails
- [Halo](https://zechub.wiki/zcash-tech/halo) - le système de preuve derrière le pool Orchard
- [Mises à niveau du réseau](https://zechub.wiki/start-here/network-upgrades) - comment Zcash active des changements tels que de nouveaux pools protégés
