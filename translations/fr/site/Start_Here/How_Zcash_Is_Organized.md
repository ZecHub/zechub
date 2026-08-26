# Comment Zcash est organisé

## TL;DR

- Zcash n'est pas construit par une seule entreprise, il est construit par de nombreuses organisations indépendantes qui prennent chacune en charge une partie différente du travail
- Pendant la majeure partie de son histoire, deux organisations ont mené le développement, Electric Coin Company et la Zcash Foundation
- En janvier 2026, toute l'équipe de Electric Coin Company a démissionné après un différend de gouvernance, et l'écosystème s'est réorganisé en plusieurs équipes indépendantes
- Aujourd'hui, le protocole, le logiciel de nœud, les wallets, la recherche, le passage à l'échelle et le financement sont pris en charge par des groupes distincts
- Aucune organisation unique ne contrôle Zcash, le réseau est open source et permissionless, et il a continué à fonctionner normalement à travers tous les changements

<br/>

## À qui s'adresse cette page

- Les nouveaux venus qui essaient de comprendre qui construit et maintient réellement Zcash
- Toute personne déconcertée par les nombreux noms d'organisations dans l'écosystème
- Les contributeurs qui décident avec qui travailler ou à qui envoyer une proposition

<br/>

## Pourquoi c'est important

Comprendre la structure rend tout le reste plus facile. Cela vous indique qui maintient le code dont vous dépendez, à qui vous adresser pour une subvention, et qui est responsable de la partie du réseau qui vous intéresse. Cela révèle aussi l'une des forces discrètes de Zcash : comme le travail est réparti entre des groupes indépendants, aucun point de défaillance unique ne peut capturer ou bloquer le projet.

Cette page est une carte. Pour chaque organisation qui a déjà une page complète sur ce wiki, vous trouverez une courte note et un lien pour en savoir plus, plutôt qu'une répétition de ce qui y est déjà écrit.

<br/>

## Comment cela fonctionnait avant

Pendant la majeure partie de l'histoire de Zcash, deux organisations ont montré la voie.

Electric Coin Company a lancé Zcash en 2016 et employait une grande partie de l'équipe principale de développement. Elle était supervisée par Bootstrap, un conseil d'administration à but non lucratif créé pour soutenir Zcash. La Zcash Foundation travaillait à ses côtés en tant qu'organisation à but non lucratif indépendante, axée sur la supervision du protocole et sur la construction d'un nœud indépendant. Les deux étaient financées en grande partie par une portion de la récompense de bloc réservée au développement.

Cette structure à deux piliers a tenu pendant des années, mais elle dépendait de ce financement partagé et du maintien de l'alignement entre les deux organisations. À mesure que le financement initial du développement évoluait et que son avenir à long terme devenait moins certain, la question du financement du travail continu devenait plus pressante. Cette question du financement se trouve en arrière-plan d'une grande partie de ce qui a changé ensuite, et c'est en partie pourquoi certaines équipes lèvent aujourd'hui des capitaux externes tandis que d'autres dépendent de subventions.

<br/>

## La réorganisation de 2026

En janvier 2026, la structure a changé brutalement. Le 7 janvier, Josh Swihart, directeur général de Electric Coin Company, a annoncé sur X que toute l'équipe de l'entreprise avait démissionné.

Bootstrap était une organisation à but non lucratif créée en 2020 pour gouverner Electric Coin Company, qui en était devenue une filiale à 100 %. Le désaccord entre l'équipe de l'entreprise et ce conseil s'est accumulé au fil du temps et a touché plusieurs sujets, notamment l'orientation de l'organisation, la manière dont le développement devait être financé, et l'avenir du wallet Zashi, que l'équipe voulait transférer dans une entreprise privée afin de lever des capitaux externes. Swihart a décrit le départ comme un licenciement déguisé, un terme juridique signifiant que les conditions avaient été modifiées de manière si sévère que la démission était en pratique forcée, et a déclaré qu'une majorité du conseil s'était désalignée de la mission de Zcash.

L'autre version des faits importe par souci d'équité. Bootstrap a présenté le conflit comme une question de gouvernance et de conformité juridique propre aux organisations à but non lucratif. Le fondateur de Zcash, Zooko Wilcox, a publiquement défendu les membres du conseil nommés dans le différend, déclarant qu'il travaillait avec eux depuis de nombreuses années et qu'il les considérait comme des personnes d'une grande intégrité, tout en précisant qu'il ne prenait pas parti sur le désaccord lui-même.

Deux choses n'étaient pas contestées. Aucune partie n'a allégué de conduite criminelle, il s'agissait donc d'un désaccord d'entreprise et de gouvernance plutôt que d'une affaire judiciaire. Et le réseau Zcash lui-même n'a pas été affecté, il est resté open source, permissionless, sécurisé et pleinement opérationnel tout au long de l'affaire, un point que Swihart comme Wilcox ont souligné auprès des utilisateurs.

Ce qui a suivi a été une réorganisation plutôt qu'un effondrement. L'ancienne équipe de l'entreprise a ensuite formé ZODL plus tard en 2026, et séparément trois anciens membres du conseil de Bootstrap ont formé Sovright. Le développement s'est installé dans une forme plus distribuée entre plusieurs équipes indépendantes.

Les déclarations décrites ici ont été faites publiquement sur X le 7 janvier 2026, par Josh Swihart (@jswihart) et Zooko Wilcox (@zooko), où les publications originales peuvent être lues dans leur intégralité.

<br/>

## Qui construit Zcash aujourd'hui

Le travail est aujourd'hui réparti entre des organisations indépendantes, chacune prenant en charge une partie bien définie.

### Les deux organisations issues de la scission de 2026

1. ZODL, le Zcash Open Development Lab, a été formé par l'ancienne équipe de Electric Coin Company et dirigé par Josh Swihart. Il a levé plus de vingt-cinq millions de dollars auprès d'investisseurs externes et travaille sur le développement du protocole central, notamment le système de preuve Halo 2 qui alimente les transactions protégées les plus récentes de Zcash, ainsi que sur le wallet ZODL, un wallet mobile protégé par défaut anciennement appelé Zashi. Voir [ZODL](https://zechub.wiki/zcash-organizations/zodl).
2. Sovright est une organisation à but non lucratif fondée par trois anciens membres du conseil de Bootstrap. Elle se concentre sur les outils et le support pour l'écosystème, et a créé Argos, un outil pour aider les premiers utilisateurs à récupérer des fonds bloqués dans un ancien wallet non maintenu. Voir [Sovright](https://zechub.wiki/zcash-organizations/sovright).

### Supervision du protocole, recherche et logiciel de nœud

3. La Zcash Foundation maintient Zebra, le nœud Rust qui devient le nœud principal du réseau à mesure que l'ancien client zcashd est retiré. Elle supervise également l'organisation GitHub de Zcash, le site z.cash et le compte principal de Zcash sur X, et elle s'associe à ZecHub pour aider à gérer certains de ces actifs. Voir [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation).
4. Shielded Labs est une organisation à but non lucratif indépendante, financée par des dons et basée en Suisse. Elle se concentre sur la recherche et la durabilité à long terme, notamment le mécanisme de durabilité du réseau qui finance le développement futur ainsi que le travail Crosslink visant à ajouter une finalité proof of stake à Zcash, et elle a financé l'audit de sécurité qui a découvert la vulnérabilité de la pool Orchard en 2026. Voir [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs).
5. Electric Coin Company reste une partie de l'histoire en tant qu'organisation qui a créé et lancé Zcash en 2016. Voir [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company).

### Passage à l'échelle et cryptographie

6. Project Tachyon est un effort de passage à l'échelle dirigé par le cryptographe Sean Bowe. Il propose une nouvelle manière pour les wallets de se synchroniser avec la blockchain, appelée synchronisation oblivious, qui réduit la taille des transactions et, comme effet secondaire, rapproche Zcash d'une confidentialité post-quantique. Son travail est documenté sur [tachyon.z.cash](https://tachyon.z.cash/).
7. Le Valar Group est un laboratoire de recherche et d'ingénierie en cryptographie qui travaille sur le protocole Zcash pour un cash numérique privé et post-quantique à grande échelle. Il collabore étroitement avec Project Tachyon sur les travaux de passage à l'échelle et de résistance quantique. Plus d'informations sur son travail sont disponibles sur [valargroup.dev](https://valargroup.dev/).

### Organisations régionales et communautaires

8. Obscura Labs est une organisation indépendante enregistrée au Nigeria, centrée sur l'Afrique et les marchés émergents, qui construit des infrastructures et des voies d'adoption. Voir [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs).

### Éducation

9. ZecHub est un hub éducatif décentralisé pour Zcash. Des membres de la communauté travaillent ensemble pour créer, valider et promouvoir du contenu qui aide les gens à comprendre l'écosystème et à apprendre comment y participer, au moyen de tutoriels, de documentation wiki, d'un podcast et d'une newsletter hebdomadaire. Le wiki que vous lisez actuellement fait partie de ZecHub, et la Zcash Foundation s'associe à lui pour aider à gérer certaines ressources communautaires.

### Financement

10. Zcash Community Grants finance des contributeurs indépendants et des projets communautaires à partir d'une portion de la récompense de bloc, répartissant le travail entre de nombreuses équipes au-delà des organisations principales. Voir [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants).
11. The Financial Privacy Foundation soutient l'écosystème Zcash et les projets communautaires. Voir [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation).

Toutes ces organisations maintiennent des dépôts open source, de sorte que leur travail peut être lu, vérifié et utilisé par n'importe qui. Et les organisations ne racontent pas toute l'histoire. De nombreuses contributions importantes viennent d'individus et d'entreprises sous contrat financées par des subventions, plutôt que des seules organisations principales. À leurs côtés se trouvent des équipes de wallets, des communautés régionales, des développeurs indépendants et des investisseurs qui détiennent et soutiennent ZEC sans construire le protocole. La liste ci-dessus constitue l'ossature, pas le tableau complet.

<br/>

## Par où commencer quand on débute

L'organisation qui vous importe dépend de ce que vous voulez faire.

1. Pour utiliser Zcash, vous avez besoin d'un wallet, donc ZODL et son wallet constituent un point de départ naturel.
2. Pour exécuter un nœud ou comprendre le logiciel réseau, tournez-vous vers la Zcash Foundation et son nœud Zebra.
3. Pour financer un projet ou contribuer à un travail rémunéré, tournez-vous vers Zcash Community Grants.
4. Pour suivre la recherche et l'avenir du protocole, suivez Shielded Labs, Project Tachyon et le Valar Group.

<br/>

## Continuer à apprendre

Ce wiki existe pour vous aider à aller plus loin, donc la meilleure prochaine étape est de continuer à le lire. Voici quelques bons sujets à explorer ensuite pour un nouveau venu :

- [Qu'est-ce que ZEC et Zcash](https://zechub.wiki/start-here/what-is-zec-and-zcash) pour les bases du réseau et de la monnaie
- [Guide du nouvel utilisateur](https://zechub.wiki/start-here/new-user-guide) pour une première prise en main de Zcash
- [Pools protégées](https://zechub.wiki/using-zcash/shielded-pools) pour comprendre comment Zcash garde les transactions privées
- [Le turnstile](https://zechub.wiki/zcash-tech/the-turnstile) pour comprendre comment l'offre monétaire reste vérifiable
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) pour la pool protégée vers laquelle le réseau migre
- [Mises à niveau du réseau](https://zechub.wiki/start-here/network-upgrades) pour comprendre comment Zcash évolue au fil du temps
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) pour la cryptographie derrière la confidentialité

Chaque page renvoie vers davantage de contenu, vous pouvez donc suivre le fil aussi loin que vous le souhaitez.

<br/>

## Idées reçues courantes

- Zcash n'est possédé ni contrôlé par aucune entreprise unique, aucune organisation ne peut à elle seule modifier ou arrêter le réseau
- Le différend de 2026 n'a pas affecté le réseau, les fonds ni la confidentialité, c'était un désaccord organisationnel, et le protocole a fonctionné normalement tout au long de l'affaire
- Le départ de l'équipe de Electric Coin Company n'a pas mis fin à Zcash, le travail a été transféré vers de nouvelles organisations indépendantes
- Le fait d'avoir de nombreuses organisations est une force, pas une faiblesse, cela supprime les points de défaillance uniques et rend le projet résilient
- Détenir ou promouvoir ZEC n'est pas la même chose que construire Zcash, les investisseurs et les évangélistes font partie de la communauté mais se distinguent des équipes qui développent le protocole

<br/>

## Pages liées

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - le laboratoire de développement formé par l'ancienne équipe de Electric Coin Company
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - l'organisation à but non lucratif formée par d'anciens membres du conseil de Bootstrap
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - superviseur du protocole et du nœud Zebra
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - recherche et durabilité du protocole
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - l'entreprise qui a lancé Zcash en 2016
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - infrastructure et adoption en Afrique et sur les marchés émergents
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - financement pour les contributeurs indépendants
