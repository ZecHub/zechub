# Guide du participant au hackathon ZecHub

## En bref

- Sachez pourquoi vous construisez avant d'écrire du code : l'utilité l'emporte sur la complexité
- Restez simple : une petite idée bien réalisée vaut mieux qu'une grande idée inachevée
- Apprenez tôt la pile d'infrastructure Zcash, c'est la partie la plus raide de l'ascension
- Si votre application déplace des fonds, elle doit fonctionner sur le mainnet : construisez sur le testnet, puis faites vos preuves sur le mainnet
- La documentation et une démonstration claire peuvent compter davantage que le produit lui-même
- Gagner est un point de départ : cela construit votre réputation et vous ouvre des portes dans la communauté

<br/>

## À qui s'adresse ce guide

- Aux personnes qui participent pour la première fois à un hackathon ZecHub ou Zcash
- Aux développeurs venant d'autres écosystèmes qui découvrent Zcash
- À toute personne qui souhaite transformer un projet de hackathon en quelque chose de durable

<br/>

## Commencez par le pourquoi

Avant d'ouvrir votre éditeur, sachez quel problème vous résolvez et pourquoi quelqu'un s'en soucierait. Un bon test est simple : si ce que vous construisez n'existait pas, est-ce que cela manquerait à quelqu'un ? Construisez quelque chose que vous utiliseriez vous-même. La confidentialité est la raison d'être de Zcash : comprenez donc pourquoi la confidentialité compte pour les personnes à qui votre projet s'adresse, puis laissez cela guider l'ensemble du projet.

<br/>

## Apprenez d'abord la pile technique

La surprise la plus fréquente pour les participants venant d'autres chaînes est la courbe d'apprentissage de l'infrastructure Zcash, et non le code. Prenez le temps de comprendre comment les éléments s'articulent avant de concevoir votre application. Commencez par la pile de base, souvent appelée « Z au cube » : zebrad, un serveur léger et un portefeuille. Familiarisez-vous ensuite avec les outils de développement :

1. Lisez la page consacrée aux développeurs sur le wiki à l'adresse [zechub.wiki/developers](https://zechub.wiki/developers), c'est le premier arrêt recommandé
2. Explorez zingolib et l'zingo-cli, dont les appels couvrent l'essentiel de ce dont un projet a besoin, quelle que soit la catégorie
3. Examinez librustzcash et le portefeuille de référence ZODL pour des briques de plus bas niveau
4. Pour un projet FROST, utilisez le frostd de la Zcash Foundation et frost-core depuis crates.io, et appuyez-vous sur l'IA pour vous aider avec les définitions, même si utiliser FROST de manière sécurisée demande toujours de vrais efforts et du temps

<br/>

## Comprenez ce que signifie le mainnet

Plusieurs catégories exigent que votre application interagisse avec le mainnet Zcash. En pratique, cela signifie que votre projet, ou quelqu'un qui l'utilise, y compris un agent d'IA, envoie ou reçoit de vrais fonds sur le mainnet, ou bien qu'il construit et améliore les outils qui rendent cela possible. Si votre application effectue des transactions, vous devez les démontrer sur le mainnet dans votre soumission.

Construisez sur le testnet pendant le développement. L'activité sur le mainnet coûte de vrais ZEC et deviendra de plus en plus chère avec le temps : le testnet est donc l'endroit recommandé pour itérer. Passez au mainnet pour la preuve finale. Gardez un détail à l'esprit lorsque vous concevez votre parcours : lorsque des fonds arrivent sur une adresse protégée, votre portefeuille doit analyser la chaîne et les trouver avant qu'ils puissent être dépensés, et cette analyse prend un peu de temps. Intégrez ce court délai dans votre application plutôt que de supposer que les fonds reçus sont immédiatement utilisables.

<br/>

## Restez simple

Une idée simple et bien exécutée l'a souvent emporté sur une idée complexe. Des membres du jury ont vu un concept basique l'emporter sur un projet techniquement plus ambitieux lors d'un même événement, parce qu'il résolvait un vrai problème et était facile à comprendre. Fixez-vous moins d'objectifs que ce que vous pensez pouvoir terminer. Négliger les détails, viser trop grand et sauter l'étape de recherche sont les erreurs qui coûtent des prix aux participants. Rendez votre projet facile à comprendre et facile à lancer, du concept central jusqu'à la première commande.

<br/>

## Gagnez les 30 premières secondes

Les évaluateurs se forgent rapidement une impression marquée : la présentation, le sujet et les visuels pèsent donc réellement, tout comme l'originalité de votre solution. La documentation et une démonstration claire ne sont pas des détails secondaires. Communiquer votre idée est parfois plus important que l'idée elle-même, car si personne ne comprend ce que vous avez construit, cela ne peut pas réussir. L'évaluation tend à équilibrer la profondeur technique, l'expérience utilisateur, l'originalité et l'utilité pratique, et une bonne documentation améliore tous ces critères.

<br/>

## Intéressez-vous aux catégories plus difficiles et moins fréquentées

Si vous voulez une compétition moins encombrée, les catégories plus difficiles reçoivent souvent moins de candidatures, simplement parce que moins de personnes s'y essaient. La catégorie Comptabilité est une bonne option pour les débutants qui veulent éviter le travail sur les transactions on-chain. FROST est puissant et sous-utilisé, et constitue une base solide pour un projet. La communauté n'impose pas ce qu'il faut construire : s'appuyer sur un outil performant dont l'écosystème dispose déjà, plutôt que de partir de zéro, est donc un choix judicieux.

<br/>

## Après le hackathon

Gagner n'est pas la fin du chemin. Une victoire enrichit votre portfolio et votre réputation, vous ouvre des portes dans la communauté et peut mener à un financement par le biais de propositions.

1. Poursuivez un projet solide sous la forme d'une proposition au DAO ZecHub ou à Zcash Community Grants, avec une feuille de route, des jalons et une justification budgétaire
2. Restez actif dans la communauté sur le forum, sur Discord et sur X
3. Participez aux réunions de R et D Arborist, publiez des idées et demandez des retours
4. Continuez à construire même si vous ne gagnez pas, et surveillez le prochain hackathon

<br/>

## Pages connexes

- [Ressources pour les développeurs](https://zechub.wiki/developers) - le premier arrêt pour les développeurs Zcash
- [Nœud complet Zebra](https://zechub.wiki/zcash-tech/zebra-full-node) - le nœud à la base de la pile
- [FROST](https://zechub.wiki/zcash-tech/frost) - des signatures à seuil pour les projets avancés

<br/>

<small>Ce guide s'appuie sur les conseils des contributeurs principaux de ZecHub squirrel, Dismad et Tron.</small>
