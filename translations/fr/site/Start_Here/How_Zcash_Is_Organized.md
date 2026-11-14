# Comment Zcash est organisé

## En bref

- Zcash n’est pas développé par une seule entreprise, mais par de nombreuses organisations indépendantes qui prennent chacune en charge une partie différente du travail
- Pendant la majeure partie de son histoire, deux organisations ont mené le développement : la Electric Coin Company et la Zcash Foundation
- En janvier 2026, toute l’équipe de Electric Coin Company a démissionné à la suite d’un différend de gouvernance, et l’écosystème s’est réorganisé en plusieurs équipes indépendantes
- Aujourd’hui, le protocole, le logiciel de nœud, les portefeuilles, la recherche, la mise à l’échelle et le financement sont gérés par des groupes distincts
- Aucune organisation ne contrôle à elle seule Zcash : le réseau est open source et sans permission, et il a continué de fonctionner normalement à travers tous ces changements

<br/>

## À qui s’adresse cette page

- Aux nouveaux venus qui cherchent à comprendre qui développe et maintient réellement Zcash
- À toute personne perdue face aux nombreux noms d’organisations de l’écosystème
- Aux contributeurs qui se demandent avec qui travailler ou à qui adresser une proposition

<br/>

## Pourquoi c’est important

Comprendre cette structure facilite tout le reste. Elle vous indique qui maintient le code sur lequel vous vous appuyez, à qui vous adresser pour une subvention et qui est responsable de la partie du réseau qui vous intéresse. Elle révèle aussi l’une des forces discrètes de Zcash : comme le travail est réparti entre des groupes indépendants, aucun point de défaillance unique ne peut s’emparer du projet ni le paralyser.

Cette page est une carte. Pour chaque organisation qui dispose déjà d’une page complète sur ce wiki, vous trouverez une brève note et un lien pour en savoir plus, plutôt qu’une répétition de ce qui y est écrit.

<br/>

## Comment cela fonctionnait auparavant

Pendant la majeure partie de l’histoire de Zcash, deux organisations ont ouvert la voie.

La Electric Coin Company a lancé Zcash en 2016 et employait une grande partie de l’équipe de développement principale. Elle était supervisée par Bootstrap, un conseil à but non lucratif créé pour soutenir Zcash. La Zcash Foundation travaillait à ses côtés en tant qu’organisation à but non lucratif indépendante, axée sur la gestion du protocole et sur la création d’un nœud indépendant. Toutes deux étaient largement financées par une partie de la récompense de bloc réservée au développement.

Cette structure à deux piliers a tenu pendant des années, mais elle dépendait de ce financement partagé et du maintien d’une bonne entente entre les deux organisations. À mesure que le financement initial du développement évoluait et que son avenir à long terme devenait plus incertain, la question du paiement du travail continu est devenue plus pressante. Cette question de financement se trouve en arrière-plan d’une grande partie de ce qui a changé ensuite, et c’est en partie pour cela que certaines équipes lèvent aujourd’hui des capitaux extérieurs tandis que d’autres dépendent de subventions.

<br/>

## La réorganisation de 2026

En janvier 2026, la structure a brusquement changé. Le 7 janvier, le directeur général de Electric Coin Company, Josh Swihart, a annoncé sur X que toute l’équipe de l’entreprise avait démissionné.

Bootstrap était une organisation à but non lucratif créée en 2020 pour gouverner la Electric Coin Company, devenue sa filiale à part entière. Le désaccord entre l’équipe de l’entreprise et ce conseil s’est construit au fil du temps et portait sur plusieurs questions, notamment l’orientation de l’organisation, la manière de financer le développement et l’avenir du portefeuille Zashi, que l’équipe souhaitait transférer dans une société privée afin de lever des capitaux extérieurs. Swihart a qualifié ce départ de licenciement déguisé, un terme juridique signifiant que les conditions avaient été modifiées si gravement que la démission était de fait imposée, et a déclaré qu’une majorité du conseil s’était écartée de la mission de Zcash.

Par souci d’équité, l’autre version des faits compte aussi. Bootstrap a présenté le conflit comme une question de gouvernance et de conformité juridique des organisations à but non lucratif. Le fondateur de Zcash, Zooko Wilcox, a publiquement défendu les membres du conseil cités dans le différend, déclarant avoir travaillé avec eux pendant de nombreuses années et les considérer comme des personnes d’une grande intégrité, tout en précisant qu’il ne prenait pas parti sur le désaccord lui-même.

Deux points n’étaient pas contestés. Aucune partie n’a allégué de comportement criminel : il s’agissait donc d’un désaccord d’entreprise et de gouvernance, et non d’une affaire judiciaire. Et le réseau Zcash lui-même n’a pas été affecté : il est resté open source, sans permission, sécurisé et pleinement opérationnel tout au long de la période, un point sur lequel Swihart et Wilcox ont tous deux insisté auprès des utilisateurs.

Ce qui a suivi relevait de la réorganisation, et non de l’effondrement. L’ancienne équipe de l’entreprise a ensuite fondé ZODL plus tard en 2026 et, séparément, trois anciens membres du conseil de Bootstrap ont fondé Sovright. Le développement s’est stabilisé sous une forme plus distribuée, répartie entre plusieurs équipes indépendantes.

Les déclarations décrites ici ont été faites publiquement sur X le 7 janvier 2026 par Josh Swihart (@jswihart) et Zooko Wilcox (@zooko), où les publications originales peuvent être lues dans leur intégralité.

<br/>

## Qui développe Zcash aujourd’hui

Le travail est aujourd’hui réparti entre des organisations indépendantes, chacune prenant en charge une partie bien définie.

### Les deux organisations issues de la scission de 2026

1. ZODL, le laboratoire de développement ouvert de Zcash, a été fondé par l’ancienne équipe de Electric Coin Company et est dirigé par Josh Swihart. Il a levé plus de vingt-cinq millions de dollars auprès d’investisseurs extérieurs et travaille sur le développement du protocole principal, notamment sur le système de preuve Halo 2 qui alimente les transactions protégées les plus récentes de Zcash, ainsi que sur le portefeuille ZODL, un portefeuille mobile protégé par défaut, anciennement appelé Zashi. Voir [ZODL](https://zechub.wiki/zcash-organizations/zodl).
2. Sovright est une organisation à but non lucratif fondée par trois anciens membres du conseil de Bootstrap. Elle se concentre sur les outils et le soutien à l’écosystème, et a créé Argos, un outil qui aide les premiers utilisateurs à récupérer des fonds bloqués dans un ancien portefeuille qui n’est plus maintenu. Voir [Sovright](https://zechub.wiki/zcash-organizations/sovright).

### Gestion du protocole, recherche et logiciel de nœud

3. La Zcash Foundation maintient Zebra, le nœud Rust qui devient le nœud principal du réseau à mesure que l’ancien client zcashd est retiré. Elle gère également l’organisation Zcash sur GitHub, le site web z.cash et le compte principal de Zcash sur X, et s’associe à ZecHub pour aider à gérer certains de ces actifs. Voir [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation).
4. Shielded Labs est une organisation à but non lucratif indépendante, financée par des dons et basée en Suisse. Elle se consacre à la recherche et à la viabilité à long terme, notamment au mécanisme de viabilité du réseau qui finance le développement futur et aux travaux Crosslink visant à ajouter une finalité par preuve d’enjeu à Zcash. Elle a également financé l’audit de sécurité qui a découvert la vulnérabilité du pool Orchard en 2026. Voir [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs).
5. La Electric Coin Company fait toujours partie de l’histoire en tant qu’organisation qui a créé et lancé Zcash en 2016. Voir [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company).

### Mise à l’échelle et cryptographie

6. Le projet Tachyon est une initiative de mise à l’échelle menée par le cryptographe Sean Bowe. Il propose une nouvelle manière pour les portefeuilles de se synchroniser avec la blockchain, appelée synchronisation oblivieuse, qui réduit la taille des transactions et, par effet secondaire, rapproche Zcash d’une confidentialité post-quantique. Ses travaux sont documentés sur [tachyon.z.cash](https://tachyon.z.cash/).
7. Le Valar Group est un laboratoire de recherche et d’ingénierie en cryptographie qui travaille sur le protocole Zcash, destiné à une monnaie numérique privée et post-quantique à grande échelle. Il collabore étroitement avec le projet Tachyon sur les travaux de mise à l’échelle et de résistance quantique. Pour en savoir plus sur ses travaux, consultez [valargroup.dev](https://valargroup.dev/).

### Organisations régionales et communautaires

8. Obscura Labs est une organisation indépendante enregistrée au Nigeria, axée sur l’Afrique et les marchés émergents, qui développe des infrastructures et des voies d’adoption. Voir [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs).

### Éducation

9. ZecHub est un centre éducatif décentralisé consacré à Zcash. Les membres de la communauté collaborent pour créer, valider et promouvoir des contenus qui aident chacun à comprendre l’écosystème et à apprendre à y participer, au moyen de tutoriels, de la documentation du wiki, d’un podcast et d’une newsletter hebdomadaire. Le wiki que vous lisez en ce moment fait partie de ZecHub, et la Zcash Foundation s’associe à lui pour aider à gérer certaines ressources communautaires.

### Financement

10. Zcash Community Grants finance des contributeurs indépendants et des projets communautaires grâce à une partie de la récompense de bloc, répartissant ainsi le travail entre de nombreuses équipes au-delà des organisations principales. Voir [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants).
11. La Financial Privacy Foundation soutient l’écosystème Zcash et des projets communautaires. Voir [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation).

Toutes ces organisations maintiennent des dépôts open source, de sorte que leur travail peut être lu, vérifié et réutilisé par n’importe qui. Et les organisations ne racontent pas toute l’histoire. De nombreuses contributions importantes proviennent de particuliers et d’entreprises sous contrat financées par des subventions, et pas uniquement des organisations principales. À leurs côtés se trouvent des équipes de portefeuilles, des communautés régionales, des développeurs indépendants et des investisseurs qui détiennent et soutiennent ZEC sans développer le protocole. La liste ci-dessus en constitue l’ossature, pas le tableau complet.

<br/>

## Par où commencer en tant que nouveau venu

L’organisation qui vous concerne dépend de ce que vous souhaitez faire.

1. Pour utiliser Zcash, il vous faut un portefeuille : ZODL et son portefeuille sont donc un point de départ naturel.
2. Pour faire fonctionner un nœud ou comprendre le logiciel du réseau, tournez-vous vers la Zcash Foundation et son nœud Zebra.
3. Pour financer un projet ou proposer un travail rémunéré, tournez-vous vers Zcash Community Grants.
4. Pour suivre la recherche et l’avenir du protocole, suivez Shielded Labs, le projet Tachyon et le Valar Group.

<br/>

## Continuer à apprendre

Ce wiki existe pour vous aider à approfondir vos connaissances : la meilleure étape suivante est donc de continuer à le lire. Voici quelques sujets à explorer ensuite pour un nouveau venu :

- [Qu’est-ce que ZEC et Zcash](https://zechub.wiki/start-here/what-is-zec-and-zcash) pour les bases du réseau et de la monnaie
- [Guide du nouvel utilisateur](https://zechub.wiki/start-here/new-user-guide) pour une première prise en main de Zcash
- [Pools protégés](https://zechub.wiki/using-zcash/shielded-pools) pour comprendre comment Zcash garde les transactions privées
- [Le sas comptable](https://zechub.wiki/zcash-tech/the-turnstile) pour comprendre comment l’offre de monnaie reste vérifiable
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) pour le pool protégé vers lequel le réseau migre
- [Mises à niveau du réseau](https://zechub.wiki/start-here/network-upgrades) pour comprendre comment Zcash évolue au fil du temps
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) pour la cryptographie qui sous-tend la confidentialité

Chaque page renvoie vers d’autres, ce qui vous permet de suivre le fil aussi loin que vous le souhaitez.

<br/>

## Idées reçues

- Zcash n’appartient à aucune entreprise et n’est contrôlé par aucune d’entre elles : aucune organisation ne peut à elle seule modifier ou arrêter le réseau
- Le différend de 2026 n’a affecté ni le réseau, ni les fonds, ni la confidentialité : il s’agissait d’un désaccord organisationnel, et le protocole a fonctionné normalement tout au long de la période
- Le départ de l’équipe de la Electric Coin Company n’a pas mis fin à Zcash : le travail s’est poursuivi au sein de nouvelles organisations indépendantes
- La multiplicité des organisations est une force, et non une faiblesse : elle élimine les points de défaillance uniques et rend le projet plus résilient
- Détenir ou promouvoir ZEC n’équivaut pas à développer Zcash : les investisseurs et les promoteurs font partie de la communauté, mais se distinguent des équipes qui développent le protocole

<br/>

## Pages connexes

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - le laboratoire de développement fondé par l’ancienne équipe de Electric Coin Company
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - l’organisation à but non lucratif fondée par d’anciens membres du conseil de Bootstrap
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - gestionnaire du protocole et du nœud Zebra
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - recherche et viabilité du protocole
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - l’entreprise qui a lancé Zcash en 2016
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - infrastructures et adoption en Afrique et dans les marchés émergents
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - financement des contributeurs indépendants
