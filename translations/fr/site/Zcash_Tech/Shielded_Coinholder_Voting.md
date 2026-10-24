<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Vote des détenteurs de coins protégés

> En août 2026, Zcash a organisé un sondage auprès des détenteurs de coins, dans lequel les bulletins sont restés chiffrés et seuls les totaux finaux ont été révélés, à l’aide d’un protocole de vote protégé conçu par Valar Group.

Ce que vous apprendrez : comment un vote peut être pondéré selon la quantité de ZEC que vous détenez, rester privé et être correctement comptabilisé, sans que personne ne sache ni comment vous avez voté ni ce que vous possédez.

Le vote protégé des détenteurs de coins permet aux détenteurs de Zcash de voter sur des questions concernant l’écosystème à l’aide de leurs ZEC protégés. Personne ne sait ce qu’une personne a voté ni quelle quantité de ZEC elle détient, mais chacun peut vérifier que les totaux sont exacts. Il s’exécute sur une chaîne de vote dédiée conçue par Valar Group, distincte du mainnet de Zcash, afin que vos fonds réels ne soient jamais déplacés. Pour savoir plus largement comment Zcash prend ses décisions, consultez l’aperçu du [Zcash financement et de la gouvernance](../zcash-community/zcash-governance). Cette page porte uniquement sur le protocole de vote cryptographique.

Vous découvrez Zcash ? Commencez par [Qu’est-ce que ZEC et Zcash](../start-here/what-is-zec-and-zcash), [Pools protégés](../using-zcash/shielded-pools) et [zk-SNARKs](../zcash-tech/zk-snarks), puis revenez ici.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Pourquoi le vote privé est difficile

Un bon vote de détenteurs de coins doit réunir quatre éléments à la fois, et les moyens évidents de les obtenir s’opposent les uns aux autres.

1. Une pondération par participation, afin que détenir plus de ZEC confère davantage de poids.
2. La confidentialité du choix, afin que personne ne sache comment vous avez voté.
3. La confidentialité du solde, afin que personne ne sache quelle quantité de ZEC vous détenez.
4. Un décompte exact et vérifiable que tout le monde peut contrôler.

Pour pondérer selon la participation, il semble nécessaire de connaître le solde de chacun. Pour compter les bulletins, il semble nécessaire de les ouvrir. Faire l’un ou l’autre de manière naïve divulgue précisément les informations privées qu’un [pool protégé](../using-zcash/shielded-pools) existe pour protéger, et les précédents votes sur les coins ont effectivement divulgué des informations de solde pour cette raison. Le vote protégé résout cette tension avec les mêmes outils qui alimentent les paiements protégés : les [preuves à divulgation nulle de connaissance](../zcash-tech/zk-snarks), les nullifiers et le chiffrement.

## L’intuition : une urne qui se compte elle-même

> Un tourniquet permet de compter ce qui traverse le coffre d’une banque sans voir à l’intérieur. Une urne protégée va un peu plus loin : elle additionne des votes scellés sans jamais les ouvrir.

Imaginez une urne dotée de trois pouvoirs inhabituels. Elle peut ajouter une enveloppe scellée à un total cumulatif sans l’ouvrir. Un groupe de responsables, dont aucun ne détient seul la clé, révèle ensuite uniquement les totaux finaux. Et avant de pouvoir y déposer une enveloppe, vous prouvez discrètement que vous déteniez ZEC à un moment passé déterminé et que vous n’avez pas déjà voté, sans montrer quelles pièces vous appartiennent. Tout ce qui suit explique comment cette urne est réellement construite.

## Éligibilité et instantané

Un tour de vote fixe une hauteur d’instantané, un unique bloc mainnet de Zcash, et votre poids correspond à votre solde protégé disponible dans le pool [Ironwood](../zcash-tech/ironwood) à ce bloc. La règle est simple : un Ironwood ZEC au moment de l’instantané équivaut à un vote. Pour le sondage de portée NU7, l’instantané correspondait au bloc mainnet 3 459 350, vers le 24 août 2026 à 19:00 UTC, avec un vote ouvert jusqu’au 14 septembre 2026 à 19:00 UTC. Les ZEC transparents sont traités séparément par l’ancienne méthode, et non par ce protocole.

1. Vos fonds ne sont jamais déplacés ni verrouillés. L’éligibilité est fixée à l’instantané, vous pouvez donc dépenser ou déplacer ZEC immédiatement après sans affecter votre vote.
2. Il n’y a aucune étape d’inscription. Une hauteur d’instantané suffit, ce qui allège le processus et évite de révéler qui a l’intention de voter.

## Prouver votre solde sans le révéler

Lorsque vous votez, votre wallet produit une preuve à divulgation nulle de connaissance établissant qu’à l’instantané, vous contrôliez certains ZEC protégés non dépensés. Elle établit un solde valide et son montant pour le mécanisme de comptage privé, mais ne révèle aucune note et ne produit aucune transaction sur le mainnet de Zcash.

Cette preuve crée un crédit de vote sur la chaîne de vote, égal à votre solde à l’instantané, détenu par une nouvelle clé de vote que votre wallet génère uniquement pour ce tour. Puisque la clé est nouvelle et sans lien avec vos adresses Zcash, rien sur la chaîne de vote ne peut être retracé jusqu’à vos notes réelles. Votre identité on-chain et votre bulletin ne peuvent pas être liés par construction.

## Empêcher le double vote, en préservant la confidentialité

Pour empêcher quiconque de voter deux fois avec les mêmes coins, le système doit confirmer que les notes derrière votre solde n’étaient pas dépensées lors de l’instantané. Sur le mainnet, cela se fait en révélant le nullifier d’une note, son marqueur de dépense unique, dont les nœuds complets vérifient la réutilisation. Mais révéler votre nullifier ici relierait directement votre bulletin à vos notes.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Le protocole prouve donc l’inverse en privé. Il construit une liste de chaque nullifier déjà utilisé au moment de l’instantané, et votre wallet prouve à divulgation nulle de connaissance que le nullifier de votre note ne figure pas dans cette liste, démontrant que la note n’était pas dépensée sans révéler de quelle note il s’agit.

Un problème subsiste. Récupérer la partie nécessaire de cette liste depuis un serveur révélerait votre nullifier au serveur, et la liste complète est volumineuse, environ 2 Go pour les données de l’ère Orchard et bien davantage à mesure que Zcash grandit. La [récupération privée d’informations](../zcash-tech/private-information-retrieval) (PIR) résout les deux problèmes : votre wallet récupère exactement les données dont il a besoin tout en cachant cryptographiquement les données demandées. Le résultat est vérifié par rapport à un résumé publié de la liste des nullifiers, de sorte qu’un serveur malhonnête ne peut pas forger un faux résultat.

## Émettre un bulletin chiffré

Pour chaque question, votre wallet effectue trois actions.

1. Il chiffre le poids de votre vote pour le comité de comptage au moyen d’un chiffrement homomorphe, un type de chiffrement dont les textes chiffrés peuvent être additionnés sans être déchiffrés. C’est ce qui permet à l’urne de totaliser des votes qu’elle ne peut pas lire.
2. Il divise votre vote en 16 parts distinctes, de sorte que même un comité entièrement complice aurait du mal à reconstituer le montant avec lequel une personne a voté.
3. Il soumet ces parts à des moments aléatoires via plusieurs serveurs, afin qu’un observateur ne puisse pas déterminer, à leur heure d’arrivée, que les parts appartiennent au même votant.

Chaque part porte sa propre preuve à divulgation nulle de connaissance attestant qu’elle constitue une partie légitime d’un bulletin valide, de sorte que personne ne puisse ajouter de votes non justifiés. Les parts vérifiées sont ajoutées de manière homomorphe au total cumulatif chiffré correspondant à la réponse que vous avez choisie.

## Compter sans ouvrir aucun bulletin

Le décompte est réalisé par une autorité électorale distribuée : au moins 10 validateurs de la chaîne de vote, dont aucun ne peut déchiffrer quoi que ce soit seul. Au début d’un tour, ils exécutent conjointement une cérémonie de génération de clés qui produit une clé de chiffrement dont la clé de déchiffrement correspondante est répartie entre eux tous et jamais assemblée en un seul endroit.

> Aucun responsable ne détient seul la clé. L’urne ne s’ouvre que lorsque deux tiers d’entre eux activent leurs clés ensemble, et même alors, elle ne révèle que les totaux.

Lorsque le tour se clôture, les totaux chiffrés existent déjà grâce à l’addition homomorphe décrite ci-dessus. Chaque validateur publie un déchiffrement partiel accompagné d’une preuve qu’il a correctement déchiffré. Une fois qu’au moins deux tiers ont contribué, leurs parties se combinent pour former le décompte final en clair de chaque question, et rien d’autre n’est jamais déchiffré. Tout nœud complet peut alors vérifier la preuve de correction combinée, afin que le public puisse vérifier le décompte sans faire confiance aux validateurs.

## Qui l’exploite et ce qu’ils ne peuvent pas faire

La conception sépare deux rôles afin qu’aucun groupe ne détienne trop de pouvoir.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

Le multisig coordinateur est un groupe 2-sur-5 comprenant des représentants de Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs) et Valar Group. Il décide quelles questions sont soumises à la chaîne et atteste la clé de chiffrement de chaque tour, mais il ne peut ni voir, ni modifier, ni bloquer les votes individuels. Quiconque n’apprécie pas les questions peut exécuter sa propre chaîne de vote, car le logiciel est ouvert et sans permission.

Les validateurs sont les au moins 10 nœuds qui détiennent la clé de déchiffrement répartie et effectuent le déchiffrement à seuil. Ils ne peuvent pas déchiffrer les bulletins individuels ni fabriquer un faux décompte, car chaque déchiffrement est accompagné d’une preuve publique de correction.

## À quoi sert le quorum

Les organisateurs définissent un seuil de participation : les résultats du sondage ne sont considérés comme représentatifs des détenteurs de coins que si au moins 1 000 000 ZEC participent à au moins une question, abstentions comprises. Le quorum ne décide aucune question et ne s’applique pas par question. Il s’agit d’une unique vérification portant sur l’ensemble du sondage, de sorte qu’un résultat n’est pris au sérieux que lorsqu’une quantité substantielle de ZEC se manifeste. En dessous de ce niveau, le résultat n’est pas considéré comme un signal significatif.

## Ce contre quoi ce protocole ne protège pas

Comprendre les limites fait partie de la compréhension de la conception.

1. C’est un signal, et non une décision contraignante. Un sondage auprès des détenteurs de coins mesure un sentiment pondéré par participation et alimente le [processus de gouvernance](../zcash-community/zcash-governance) normal de Zcash plutôt que de le remplacer.
2. Il est pondéré par coins, donc l’influence suit les avoirs. Une friction réduite peut accroître la participation, mais ne modifie pas la concentration de ZEC.
3. L’ordre du jour est établi par le multisig coordinateur, qui choisit les questions présentées. Il ne peut pas toucher aux votes, et chacun peut lancer une chaîne concurrente, mais la définition de l’ordre du jour reste un point d’influence.
4. Le comptage nécessite que les validateurs soient en ligne. La production du décompte requiert la coopération d’au moins deux tiers d’entre eux ; une panne importante ou un refus coordonné pourrait donc retarder un résultat.
5. La confidentialité des soldes en cas de collusion totale relève de la défense en profondeur, et non d’un théorème. Si l’ensemble du comité reconstruisait secrètement la clé, la division en parts et la soumission différée seraient ce qui protège votre solde, et les concepteurs reconnaissent que ces mesures sont plus faibles en cas de collusion. Une analyse sophistiquée du trafic constitue un risque résiduel.
6. Il comporte davantage d’éléments mobiles que l’ancienne conception. Les serveurs PIR, les serveurs de soumission, une nouvelle clé de vote et les preuves à plusieurs étapes sont chacun des endroits où des bogues ou une mauvaise configuration peuvent apparaître. Le système est open source et certaines parties ont fait l’objet d’audits indépendants, ce qui gère ce risque sans l’éliminer.

Ce qu’il protège fortement et de manière vérifiable, ce sont les deux éléments les plus importants : votre bulletin ne peut pas être relié à votre identité, et seuls les totaux finaux sont jamais révélés.

## Glossaire

| Terme | Signification simple |
|---|---|
| Voting chain | Une blockchain distincte, conçue par Valar Group, qui exécute le vote ; vos notes Zcash ne s’y déplacent jamais |
| Snapshot height | Le bloc mainnet dont les soldes déterminent le poids du vote (bloc 3 459 350 pour le sondage NU7) |
| Nullifier | Le marqueur de dépense unique d’une note ; le révéler relierait un bulletin à une note, le vote prouve donc plutôt la non-appartenance |
| Private Information Retrieval (PIR) | Récupérer des données depuis un serveur tout en cachant les données demandées |
| Homomorphic encryption | Un chiffrement dont les textes chiffrés peuvent être additionnés sans être déchiffrés |
| Coordinator multisig | Le groupe 2-sur-5 qui autorise les questions et la clé du tour, mais ne peut ni voir ni modifier les votes |
| Election authority | Les 10 validateurs ou plus qui détiennent conjointement la clé de déchiffrement répartie et ne révèlent que le décompte final |
| Threshold decryption | Récupérer un résultat uniquement lorsqu’un nombre suffisant de détenteurs de parts de clé, ici deux tiers, coopèrent |
| Quorum | La participation minimale de 1 000 000 ZEC pour que le sondage soit considéré comme représentatif |

## FAQ

Mes coins sont-ils déplacés ou verrouillés lorsque je vote ? Non. L’éligibilité est mesurée au bloc d’instantané, donc vos ZEC restent en place et disponibles à la dépense. Le vote produit des preuves sur une chaîne distincte, et non une transaction Zcash.

Quelqu’un peut-il savoir comment j’ai voté ou combien je détiens ? Non. Les bulletins sont chiffrés et seuls les totaux agrégés sont déchiffrés. Votre vote ne peut pas être relié à votre identité, et votre solde est divisé en 16 parts soumises à des moments différents afin de le protéger même contre un comité complice.

Qu’est-ce qui empêche quelqu’un de voter deux fois ou de voter avec des coins qu’il ne possède pas ? Chaque bulletin contient des preuves à divulgation nulle de connaissance attestant qu’il est soutenu par un solde réel et non dépensé à l’instantané, et une preuve de non-appartenance basée sur PIR montre que la note sous-jacente n’a pas déjà été dépensée, sans révéler de quelle note il s’agit.

Qui compte les votes ? Un ensemble distribué d’au moins 10 validateurs, dont aucun ne peut déchiffrer quoi que ce soit seul. Deux tiers doivent coopérer pour révéler les totaux, et chaque déchiffrement est accompagné d’une preuve publique de correction.

Le résultat est-il contraignant ? Il s’agit d’un signal du sentiment des détenteurs de coins pondéré par participation. Il informe la gouvernance normale de Zcash plutôt que de mettre automatiquement en œuvre un changement.

Puis-je exploiter ou auditer cela moi-même ? Oui. Le logiciel de la chaîne de vote, les circuits, le système PIR et un auditeur de décompte sont tous publiés par Valar Group afin que chacun puisse les examiner et les exécuter.

## Testez votre compréhension

Si chaque bulletin est chiffré et chaque votant anonyme, comment peut-on être sûr que les totaux publiés sont corrects et que personne n’a voté deux fois ?

<details>
<summary>Réponse</summary>

Trois preuves font le travail. Chaque bulletin contient une preuve à divulgation nulle de connaissance qu’il est soutenu par un solde réel à l’instantané, de sorte qu’aucun vote non justifié n’est compté. Une preuve de non-appartenance basée sur PIR montre que la note correspondante n’était pas dépensée, empêchant le double vote sans révéler la note. Enfin, lorsque les validateurs déchiffrent les totaux, chacun publie une preuve de correction, afin que tout nœud complet puisse confirmer que les nombres finaux ont été honnêtement déchiffrés à partir des bulletins chiffrés.
</details>

## Ressources

- [NU7 Annonce du vote des détenteurs de coins (Valar Group et Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - la publication du forum définissant la portée du sondage, la hauteur d’instantané et le calendrier
- [La chaîne de vote des détenteurs de coins : conception technique](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - la description du protocole sur laquelle cette page est fondée
- [Valar Group documentation sur le vote protégé](https://valargroup.gitbook.io/shielded-vote-docs) - la référence maintenue pour la chaîne de vote
- [Valar Group code de vote et audits (GitHub)](https://github.com/valargroup/vote-sdk) - l’implémentation open source et ses audits

## Pages connexes

- [Récupération privée d’informations](../zcash-tech/private-information-retrieval) - la technique de preuve de non-appartenance qui permet d’empêcher en privé le double vote
- [Ironwood](../zcash-tech/ironwood) - le pool protégé dont les soldes déterminent le poids du vote
- [zk-SNARKs](../zcash-tech/zk-snarks) - le système de preuve à l’origine des preuves de solde et d’éligibilité
- [Pools protégés](../using-zcash/shielded-pools) - ce qu’est un solde protégé et pourquoi il reste caché
- [Zcash Aperçu du financement et de la gouvernance](../zcash-community/zcash-governance) - comment ce signal de sentiment alimente le processus décisionnel plus large de Zcash
- [Shielded Labs](../zcash-organizations/shielded-labs) - l’un des cinq membres du multisig coordinateur
