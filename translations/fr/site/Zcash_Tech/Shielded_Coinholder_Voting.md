<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Vote protégé des détenteurs de jetons

> En août 2026, Zcash a organisé un sondage auprès des détenteurs de jetons dans lequel les bulletins sont restés chiffrés et seuls les totaux finaux ont été révélés, grâce à un protocole de vote protégé conçu par Valar Group.

Ce que vous allez apprendre : comment un vote peut être pondéré selon la quantité de ZEC que vous détenez, rester confidentiel et pourtant être compté correctement, sans que personne ne sache comment vous avez voté ni combien vous possédez.

Le vote protégé des détenteurs de jetons permet aux détenteurs de Zcash de voter sur des questions concernant l'écosystème en utilisant leurs ZEC protégés. Personne ne sait ce qu'une personne a voté ni combien de ZEC elle détient, et pourtant chacun peut vérifier que les totaux sont exacts. Le vote se déroule sur une chaîne de vote dédiée conçue par Valar Group, distincte du réseau principal de Zcash, de sorte que vos fonds réels ne bougent jamais. Pour savoir plus largement comment Zcash prend ses décisions, consultez la [présentation du financement et de la gouvernance de Zcash](../zcash-community/zcash-governance). Cette page porte uniquement sur le protocole de vote cryptographique.

Vous découvrez Zcash ? Commencez par [Qu'est-ce que ZEC et Zcash](../start-here/what-is-zec-and-zcash), [Pools protégés](../using-zcash/shielded-pools) et [zk-SNARKs](../zcash-tech/zk-snarks), puis revenez ici.

![Flux de vote protégé : un votant prouve son solde Ironwood lors d'un instantané et émet un bulletin chiffré divisé en parts, qui sont décomptées de manière homomorphe puis déchiffrées par seuil pour ne révéler que les totaux](/content-images/shielded-voting-flow.webp)

## Pourquoi le vote confidentiel est difficile

Un bon vote des détenteurs de jetons doit réunir quatre qualités à la fois, et les moyens évidents de les obtenir entrent en conflit.

1. La pondération selon la mise, pour que détenir davantage de ZEC donne plus de poids.
2. La confidentialité du choix, pour que personne ne sache comment vous avez voté.
3. La confidentialité du solde, pour que personne ne sache combien de ZEC vous détenez.
4. Un décompte exact et vérifiable que chacun peut contrôler.

Pour pondérer selon la mise, il semble nécessaire de connaître le solde de chacun. Pour compter les bulletins, il semble nécessaire de les ouvrir. Procéder naïvement dans l'un ou l'autre cas divulgue précisément les informations privées qu'un [pool protégé](../using-zcash/shielded-pools) a pour but de protéger, et c'est pour cette raison que les précédents votes de détenteurs ont effectivement divulgué des informations sur les soldes. Le vote protégé résout cette tension avec les mêmes outils que ceux qui font fonctionner les paiements protégés : les [preuves à divulgation nulle de connaissance](../zcash-tech/zk-snarks), les nullifiers et le chiffrement.

## L'intuition : une urne qui compte elle-même

> Un sas comptable permet de compter ce qui passe par la chambre forte d'une banque sans voir à l'intérieur. Une urne protégée va un cran plus loin : elle additionne des votes scellés sans jamais les ouvrir.

Imaginez une urne dotée de trois pouvoirs inhabituels. Elle peut ajouter une enveloppe scellée à un total courant sans l'ouvrir. Un groupe de responsables, dont aucun ne détient seul la clé, révèle ensuite uniquement les totaux finaux. Et avant de pouvoir glisser une enveloppe, vous prouvez discrètement que vous déteniez des ZEC à un moment passé déterminé et que vous n'avez pas encore voté, sans montrer quels jetons vous appartiennent. Tout ce qui suit explique comment cette urne est réellement construite.

## Éligibilité et instantané

Un tour de vote fixe une hauteur d'instantané, c'est-à-dire un unique bloc du réseau principal de Zcash, et votre poids correspond à votre solde protégé dépensable dans le pool [Ironwood](../zcash-tech/ironwood) à ce bloc. La règle est simple : un Ironwood ZEC au moment de l'instantané équivaut à une voix. Pour le sondage sur le périmètre de NU7, l'instantané correspondait au bloc 3 459 350 du réseau principal, vers le 24 août 2026 à 19 h 00 UTC, et le vote était ouvert jusqu'au 14 septembre 2026 à 19 h 00 UTC. Les ZEC transparents sont traités séparément par l'ancienne méthode, et non par ce protocole.

1. Vos fonds ne bougent jamais et ne sont jamais bloqués. L'éligibilité est fixée au moment de l'instantané, vous pouvez donc dépenser ou déplacer vos ZEC immédiatement après sans affecter votre vote.
2. Il n'y a aucune étape d'inscription. Une hauteur d'instantané suffit, ce qui allège le processus et évite de révéler qui a l'intention de voter.

## Prouver votre solde sans le révéler

Lorsque vous votez, votre portefeuille produit une preuve à divulgation nulle de connaissance attestant qu'au moment de l'instantané vous contrôliez une certaine quantité de ZEC protégés non dépensés. Elle établit un solde valide et son montant auprès du mécanisme de comptage privé, mais ne révèle aucune note et ne produit aucune transaction sur le réseau principal de Zcash.

Cette preuve crée sur la chaîne de vote un crédit de vote égal à votre solde au moment de l'instantané, détenu par une nouvelle clé de vote que votre portefeuille génère uniquement pour ce tour. Comme cette clé est nouvelle et sans lien avec vos adresses Zcash, rien sur la chaîne de vote ne peut être rattaché à vos notes réelles. Votre identité on-chain et votre bulletin sont impossibles à relier par construction.

## Empêcher le double vote, en toute confidentialité

Pour empêcher quiconque de voter deux fois avec les mêmes jetons, le système doit confirmer que les notes à l'origine de votre solde n'étaient pas dépensées au moment de l'instantané. Sur le réseau principal, cela se fait en révélant le nullifier d'une note, son marqueur de dépense unique, dont les nœuds complets vérifient qu'il n'est pas réutilisé. Mais révéler votre nullifier ici relierait directement votre bulletin à vos notes.

![Prévention privée du double vote : au lieu de révéler un nullifier, le portefeuille utilise la récupération d'informations privée (Private Information Retrieval) pour obtenir les éléments de preuve tout en cachant le nullifier demandé, puis prouve que la note n'a pas été dépensée](/content-images/shielded-voting-pir.webp)

Le protocole prouve donc l'inverse de manière confidentielle. Il établit la liste de tous les nullifiers déjà utilisés au moment de l'instantané, et votre portefeuille prouve, à divulgation nulle de connaissance, que le nullifier de votre note ne figure pas dans cette liste, ce qui montre que la note n'était pas dépensée sans révéler de quelle note il s'agit.

Un problème subsiste. Récupérer auprès d'un serveur la partie nécessaire de cette liste révélerait votre nullifier au serveur, et la liste complète est volumineuse : environ 2 Go pour les données de l'ère Orchard, et bien davantage à mesure que Zcash grandit. La [récupération d'informations privée](../zcash-tech/private-information-retrieval) (PIR) résout les deux problèmes : votre portefeuille récupère exactement les données dont il a besoin tout en masquant cryptographiquement quelles données il a demandées. Le résultat est vérifié par rapport à un résumé publié de la liste des nullifiers, de sorte qu'un serveur malhonnête ne peut pas falsifier le résultat.

## Déposer un bulletin chiffré

Pour chaque question, votre portefeuille effectue trois opérations.

1. Il chiffre le poids de votre vote à destination du comité de dépouillement à l'aide d'un chiffrement homomorphe, un type de chiffrement dont les textes chiffrés peuvent être additionnés sans être déchiffrés. C'est ce qui permet à l'urne de totaliser des votes qu'elle ne peut pas lire.
2. Il divise votre vote en 16 parts distinctes, de sorte que même un comité entièrement complice aurait du mal à reconstituer le poids du vote d'une personne.
3. Il soumet ces parts à des moments aléatoires via plusieurs serveurs, afin qu'un observateur ne puisse pas déduire, d'après leur heure d'arrivée, que les parts appartiennent au même votant.

Chaque part est accompagnée de sa propre preuve à divulgation nulle de connaissance attestant qu'il s'agit d'un élément légitime d'un bulletin valide, de sorte que personne ne peut ajouter de votes non couverts. Les parts vérifiées sont additionnées de manière homomorphe au total courant chiffré de la réponse que vous avez choisie.

## Compter sans ouvrir aucun bulletin

Le décompte est assuré par une autorité électorale distribuée : au moins 10 validateurs de la chaîne de vote, dont aucun ne peut déchiffrer quoi que ce soit seul. Au début d'un tour, ils mènent conjointement une cérémonie de génération de clé qui produit une clé de chiffrement dont la clé de déchiffrement correspondante est répartie entre eux tous et n'est jamais assemblée en un seul endroit.

> Aucun responsable ne détient seul la clé. L'urne ne s'ouvre que lorsque les deux tiers d'entre eux tournent leur clé ensemble, et même alors elle ne révèle que les totaux.

À la clôture du tour, les totaux chiffrés existent déjà grâce à l'addition homomorphe décrite plus haut. Chaque validateur publie un déchiffrement partiel ainsi qu'une preuve attestant qu'il a déchiffré correctement. Dès qu'au moins deux tiers d'entre eux ont contribué, leurs parts se combinent pour donner le résultat final en clair pour chaque question, et rien d'autre n'est jamais déchiffré. N'importe quel nœud complet peut ensuite vérifier la preuve d'exactitude combinée, de sorte que le public peut vérifier le décompte sans faire confiance aux validateurs.

## Qui le fait fonctionner, et ce qu'ils ne peuvent pas faire

La conception sépare deux rôles afin qu'aucun groupe ne dispose de trop de pouvoir.

![Séparation des pouvoirs : un multisig coordinateur définit les questions proposées mais ne peut pas voir les votes, tandis qu'un ensemble de validateurs compte les voix mais ne peut ni lire les bulletins individuels ni falsifier un décompte](/content-images/shielded-voting-roles.webp)

Le multisig coordinateur est un groupe 2 sur 5 réunissant des représentants de Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs) et Valar Group. Il décide quelles questions sont soumises à la chaîne et atteste la clé de chiffrement de chaque tour, mais il ne peut ni voir, ni modifier, ni bloquer les votes individuels. Toute personne mécontente des questions peut faire fonctionner sa propre chaîne de vote, puisque le logiciel est ouvert et sans permission.

Les validateurs sont les nœuds, au moins 10, qui détiennent la clé de déchiffrement répartie et effectuent le déchiffrement à seuil. Ils ne peuvent ni déchiffrer les bulletins individuels ni fabriquer un faux résultat, car chaque déchiffrement est accompagné d'une preuve d'exactitude publique.

## À quoi sert le quorum

Les organisateurs fixent un seuil de participation : les résultats du sondage ne sont considérés comme représentatifs des détenteurs de jetons que si au moins 1 000 000 ZEC participent à au moins une question, abstentions comprises. Le quorum ne tranche aucune question et ne s'applique pas question par question. Il s'agit d'une vérification unique portant sur l'ensemble du sondage, de sorte qu'un résultat n'est pris au sérieux que si une quantité substantielle de ZEC se manifeste. En deçà de ce niveau, le résultat n'est pas considéré comme un signal significatif.

## Ce contre quoi ce protocole ne protège pas

Être clair sur les limites fait partie de la compréhension de la conception.

1. Il s'agit d'un signal, et non d'une décision contraignante. Un sondage des détenteurs de jetons mesure l'opinion pondérée par la mise et alimente le [processus de gouvernance](../zcash-community/zcash-governance) habituel de Zcash au lieu de le remplacer.
2. Il est pondéré par les jetons, l'influence suit donc les avoirs. Une friction réduite peut augmenter la participation, mais ne change pas la concentration des ZEC.
3. L'ordre du jour est fixé par le multisig coordinateur, qui choisit les questions proposées. Il ne peut pas toucher aux votes, et chacun peut faire fonctionner une chaîne concurrente, mais la définition de l'ordre du jour reste un point d'influence.
4. Le décompte nécessite que les validateurs soient en ligne. Produire le résultat exige la coopération d'au moins deux tiers d'entre eux, de sorte qu'une panne importante ou un refus coordonné pourrait retarder un résultat.
5. La confidentialité du solde en cas de collusion totale relève de la défense en profondeur, et non d'un théorème. Si l'ensemble du comité reconstituait secrètement la clé, ce sont la division en parts et la soumission échelonnée qui protégeraient votre solde, et les concepteurs reconnaissent que ces protections sont plus faibles en cas de collusion. Une analyse de trafic sophistiquée reste un risque résiduel.
6. Davantage de composants que dans l'ancienne conception. Les serveurs PIR, les serveurs de soumission, une nouvelle clé de vote et les preuves en plusieurs étapes sont autant d'endroits où des bogues ou des erreurs de configuration pourraient apparaître. Le système est open source et certaines parties ont fait l'objet d'audits indépendants, ce qui permet de gérer ce risque sans le supprimer.

Ce qu'il protège, de manière solide et vérifiable, ce sont les deux éléments les plus importants : votre bulletin ne peut pas être relié à votre identité, et seuls les totaux finaux sont jamais révélés.

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| Voting chain | Une blockchain distincte, conçue par Valar Group, sur laquelle se déroule le vote ; vos notes Zcash n'y sont jamais déplacées |
| Snapshot height | Le bloc du réseau principal dont les soldes déterminent le poids du vote (bloc 3 459 350 pour le sondage NU7) |
| Nullifier | Le marqueur de dépense unique d'une note ; le révéler relierait un bulletin à une note, c'est pourquoi le vote prouve plutôt la non-appartenance |
| Private Information Retrieval (PIR) | Récupérer des données auprès d'un serveur tout en masquant quelles données vous avez demandées |
| Homomorphic encryption | Chiffrement dont les textes chiffrés peuvent être additionnés sans être déchiffrés |
| Coordinator multisig | Le groupe 2 sur 5 qui autorise les questions et la clé du tour, mais ne peut ni voir ni modifier les votes |
| Election authority | Les 10 validateurs ou plus qui détiennent conjointement la clé de déchiffrement répartie et ne révèlent que le résultat final |
| Threshold decryption | Obtention d'un résultat uniquement lorsqu'un nombre suffisant de détenteurs de parts de clé, ici les deux tiers, coopèrent |
| Quorum | La participation minimale de 1 000 000 ZEC pour que le sondage soit considéré comme représentatif |

## FAQ

Mes jetons sont-ils déplacés ou bloqués lorsque je vote ? Non. L'éligibilité est mesurée au bloc de l'instantané, vos ZEC restent donc en place et dépensables. Le vote produit des preuves sur une chaîne distincte, et non une transaction Zcash.

Quelqu'un peut-il savoir comment j'ai voté ou combien je détiens ? Non. Les bulletins sont chiffrés et seuls les totaux agrégés sont déchiffrés. Votre vote est impossible à relier à votre identité, et votre solde est divisé en 16 parts soumises à des moments différents pour le protéger, même face à un comité complice.

Qu'est-ce qui empêche quelqu'un de voter deux fois, ou de voter avec des jetons qu'il ne possède pas ? Chaque bulletin est accompagné de preuves à divulgation nulle de connaissance attestant qu'il est couvert par un solde réel et non dépensé au moment de l'instantané, et une preuve de non-appartenance fondée sur la PIR montre que la note sous-jacente n'avait pas déjà été dépensée, sans révéler de quelle note il s'agit.

Qui compte les votes ? Un ensemble distribué d'au moins 10 validateurs, dont aucun ne peut déchiffrer quoi que ce soit seul. Les deux tiers doivent coopérer pour révéler les totaux, et chaque déchiffrement est accompagné d'une preuve d'exactitude publique.

Le résultat est-il contraignant ? Il s'agit d'un signal de l'opinion des détenteurs de jetons, pondéré par la mise. Il éclaire la gouvernance habituelle de Zcash plutôt que d'entraîner automatiquement un changement.

Puis-je le faire fonctionner ou l'auditer moi-même ? Oui. Le logiciel de la chaîne de vote, les circuits, le système PIR et un outil d'audit du décompte sont tous publiés par Valar Group afin que chacun puisse les examiner et les exécuter.

## Testez vos connaissances

Si chaque bulletin est chiffré et chaque votant anonyme, comment peut-on être sûr que les totaux publiés sont exacts et que personne n'a voté deux fois ?

<details>
<summary>Réponse</summary>

Trois preuves font le travail. Chaque bulletin est accompagné d'une preuve à divulgation nulle de connaissance attestant qu'il est couvert par un solde réel au moment de l'instantané, de sorte qu'aucun vote non couvert n'est compté. Une preuve de non-appartenance fondée sur la PIR montre que la note correspondante n'était pas dépensée, ce qui empêche le double vote sans révéler la note. Enfin, lorsque les validateurs déchiffrent les totaux, chacun publie une preuve d'exactitude, de sorte que n'importe quel nœud complet peut confirmer que les chiffres finaux ont été déchiffrés honnêtement à partir des bulletins chiffrés.
</details>

## Ressources

- [Annonce du vote des détenteurs de jetons NU7 (Valar Group et Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - le message du forum présentant le périmètre du sondage, la hauteur d'instantané et le calendrier
- [La chaîne de vote des détenteurs de jetons : conception technique](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - la description du protocole sur laquelle s'appuie cette page
- [Documentation du vote protégé de Valar Group](https://valargroup.gitbook.io/shielded-vote-docs) - la référence tenue à jour pour la chaîne de vote
- [Code de vote et audits de Valar Group (GitHub)](https://github.com/valargroup/vote-sdk) - l'implémentation open source et ses audits

## Pages associées

- [Récupération d'informations privée](../zcash-tech/private-information-retrieval) - la technique de preuve de non-appartenance qui permet d'empêcher le double vote de manière confidentielle
- [Ironwood](../zcash-tech/ironwood) - le pool protégé dont les soldes déterminent le poids du vote
- [zk-SNARKs](../zcash-tech/zk-snarks) - le système de preuve à l'origine des preuves de solde et d'éligibilité
- [Pools protégés](../using-zcash/shielded-pools) - ce qu'est un solde protégé et pourquoi il reste caché
- [Présentation du financement et de la gouvernance de Zcash](../zcash-community/zcash-governance) - comment ce signal d'opinion alimente le processus décisionnel plus large de Zcash
- [Shielded Labs](../zcash-organizations/shielded-labs) - l'un des cinq membres du multisig coordinateur
