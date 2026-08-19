# Guide du bâtisseur pour le hackathon ZecHub

## TL;DR

- Sachez pourquoi vous construisez avant d’écrire du code, l’utilité l’emporte sur la complexité
- Restez simple, une petite idée bien réalisée vaut mieux qu’une grande idée laissée inachevée
- Apprenez tôt la pile d’infrastructure Zcash, c’est la partie la plus raide de l’ascension
- Si votre app déplace des fonds, elle doit fonctionner sur mainnet, développez sur testnet, puis prouvez-la sur mainnet
- La documentation et une démo claire peuvent compter davantage que le produit lui-même
- Gagner est une ligne de départ, cela construit votre réputation et ouvre des portes dans la communauté

<br/>

## À qui s’adresse ce guide

- Aux bâtisseurs débutants qui participent pour la première fois à un hackathon ZecHub ou Zcash
- Aux développeurs d’autres écosystèmes qui découvrent Zcash
- À toute personne qui veut transformer un projet de hackathon en quelque chose de durable

<br/>

## Commencez par le pourquoi

Avant d’ouvrir votre éditeur, sachez quel problème vous résolvez et pourquoi cela intéresserait qui que ce soit. Un bon test est simple : si la chose que vous construisez n’existait pas, manquerait-elle à quelqu’un ? Construisez quelque chose que vous utiliseriez vous-même. La confidentialité est la raison d’être de Zcash, alors comprenez pourquoi elle compte pour les personnes pour lesquelles vous construisez, puis laissez cela façonner l’ensemble du projet.

<br/>

## Apprenez d’abord la pile

La surprise la plus fréquente pour les bâtisseurs venant d’autres chaînes est la courbe d’apprentissage de l’infrastructure Zcash, pas le codage. Donnez-vous le temps de comprendre comment les pièces s’assemblent avant de concevoir votre app. Commencez par la pile de base, souvent appelée Z au cube : zebrad, un serveur léger et un wallet. Puis familiarisez-vous avec les outils de développement :

1. Lisez la page développeur sur le wiki à [zechub.wiki/developers](https://zechub.wiki/developers), c’est le premier arrêt recommandé
2. Explorez zingolib et zingo-cli, dont les appels couvrent l’essentiel de ce dont un projet a besoin dans la plupart des catégories
3. Regardez librustzcash et le wallet de référence ZODL pour des briques de plus bas niveau
4. Pour un projet FROST, utilisez frostd et frost-core de la Zcash Foundation depuis crates.io, et appuyez-vous sur l’IA pour vous aider avec les définitions, même si utiliser FROST de manière sûre demande toujours de vrais efforts et du temps

<br/>

## Comprenez ce que signifie mainnet

Plusieurs catégories exigent que votre app interagisse avec le mainnet Zcash. En pratique, cela signifie que votre projet, ou quelqu’un qui l’utilise, y compris un agent IA, envoie ou reçoit de vrais fonds sur mainnet, ou bien qu’il construit et améliore les outils qui rendent cela possible. Si votre app effectue des transactions, vous devez les démontrer sur mainnet dans votre soumission.

Construisez sur testnet pendant le développement. L’activité sur mainnet coûte de vrais ZEC et ne fera que devenir plus chère avec le temps, donc testnet est l’endroit recommandé pour itérer. Passez à mainnet pour la preuve finale. Gardez un détail en tête lorsque vous concevez votre flux : quand des fonds arrivent à une adresse blindée, votre wallet doit les scanner et les trouver avant qu’ils puissent être dépensés, et ce scan prend un peu de temps. Intégrez cette courte attente dans votre app au lieu de supposer que les fonds entrants sont immédiatement prêts à être utilisés.

<br/>

## Restez simple

Une idée simple, bien exécutée, a battu une idée complexe bien des fois. Les juges ont déjà vu un concept basique l’emporter sur un projet plus ambitieux techniquement lors d’un même événement, parce qu’il résolvait un vrai problème et était facile à comprendre. Prenez en charge moins que ce que vous pensez pouvoir terminer. Négliger les détails, viser trop large et sauter l’étape de la recherche sont les erreurs qui font perdre des prix aux bâtisseurs. Faites en sorte que votre projet soit facile à comprendre et facile à exécuter, du concept central jusqu’à la première commande.

<br/>

## Gagnez les 30 premières secondes

Les évaluateurs se font vite une impression forte, donc la présentation, le sujet et les visuels ont un vrai poids, tout comme le caractère novateur de votre solution. La documentation et une démo claire ne sont pas des ajouts de dernière minute. Communiquer votre idée est parfois plus important que l’idée elle-même, car si personne ne comprend ce que vous avez construit, cela ne peut pas réussir. L’évaluation tend à équilibrer profondeur technique, expérience utilisateur, originalité et utilité pratique, et une documentation solide renforce chacun de ces aspects.

<br/>

## Regardez les catégories plus difficiles et moins fréquentées

Si vous voulez une concurrence moins dense, les catégories les plus difficiles ont souvent moins de participants simplement parce que moins de personnes s’y essaient. La catégorie Accounting est une bonne option pour les débutants qui veulent éviter le travail sur des transactions on-chain. FROST est puissant et sous-utilisé, et il constitue une base solide pour un projet. La communauté ne prescrit pas quoi construire, donc s’appuyer sur un outil performant que l’écosystème possède déjà, plutôt que repartir de zéro, est une démarche intelligente.

<br/>

## Après le hackathon

Gagner n’est pas la fin du chemin. Gagner enrichit votre portfolio et votre réputation, ouvre des portes dans la communauté et peut mener à un financement via des propositions.

1. Faites aller plus loin un projet solide sous la forme d’une proposition au ZecHub DAO ou à Zcash Community Grants, avec une feuille de route, des jalons et une justification du budget
2. Restez actif dans la communauté sur le forum, Discord et X
3. Rejoignez les réunions Arborist R and D, publiez des idées et demandez des retours
4. Continuez à construire même si vous ne gagnez pas, et gardez un œil sur le prochain hackathon

<br/>

## Pages liées

- [Ressources pour développeurs](https://zechub.wiki/developers) - le premier arrêt pour les bâtisseurs Zcash
- [Nœud complet Zebra](https://zechub.wiki/zcash-tech/zebra-full-node) - le nœud à la base de la pile
- [FROST](https://zechub.wiki/zcash-tech/frost) - signatures à seuil pour les projets avancés

<br/>

<small>Ce guide a été façonné par les perspectives des contributeurs principaux de ZecHub squirrel, Dismad et Tron.</small>
