<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Rejoindre le Crosslink Feature Net

## En bref

- Le Feature Net est le réseau de test public de Shielded Labs pour [Crosslink](/zcash-tech/crosslink-protocol), la couche de finalité proposée qui ajoute le staking à côté de la preuve de travail de Zcash.
- Il fonctionne avec une pièce de test, le cTAZ. Rien de ce que vous y faites ne déplace ni ne met en jeu des ZEC du réseau principal.
- Une seule application de bureau fait office de nœud, de mineur, de portefeuille et de finaliseur. Elle mine du cTAZ par défaut et dispose d'un bouton de faucet.
- Le staking, le retrait du staking et les retraits ne fonctionnent que pendant un « Staking Day », un jour sur trois. Si vous le manquez, vous devez attendre le suivant.
- Pour faire du staking, vous collez l'identité d'un finaliseur et cliquez sur un montant. Ce guide prend comme exemple le finaliseur de ZecHub.
- Deux appels RPC indiquent où vous en êtes : `wallet_staking_positions` et `get_tfl_recency_status`.

*Testé avec la version 14 de Feature Net sous Windows 11 (version 10.0.26200.9550), du 8 au 10 octobre 2026. Le logiciel est un prototype et change à chaque version. Si ce que vous voyez diffère de cette page, fiez-vous à votre propre essai et ouvrez une PR, s'il vous plaît.*

## Ce qu'est le Feature Net

Crosslink est une proposition et ne fait pas partie de Zcash aujourd'hui. La [FAQ Crosslink](https://shieldedlabs.net/crosslink-faq/) de Shielded Labs indique qu'elle « devrait passer par le processus de gouvernance standard de Zcash » avant de pouvoir arriver sur le réseau principal. La page [Protocole Crosslink](/zcash-tech/crosslink-protocol) en explique la conception.

Pour tester cette conception avec de vrais utilisateurs, Shielded Labs exploite ce qu'il appelle des [feature nets incitatifs](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) : « une série de testnets incitatifs ». Trois rôles existent sur le réseau, et l'application de bureau peut tous les jouer :

| Rôle | Ce qu'il fait |
|---|---|
| Mineur | Produit des blocs par preuve de travail, comme sur Zcash aujourd'hui |
| Staker | Bloque des cTAZ dans une caution de délégation et l'attribue à un finaliseur |
| Finaliseur | Vote pour finaliser les blocs. Son pouvoir de vote correspond à la mise qui lui est déléguée |

Le dépôt qui sous-tend le projet s'ouvre sur un avertissement qu'il vaut la peine de lire avant d'installer quoi que ce soit : il « existe pour prouver des idées, pas pour démontrer une ingénierie de production » et n'est « pas du code prêt pour la production » ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Exécutez-le sur une machine où cela est acceptable.

### Ce que la version 14 a changé

La [version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) est sortie le 1er octobre 2026. Son réseau démarre en simple preuve de travail et active Crosslink en trois étapes ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), également affiché sur [ctaz.cash](https://ctaz.cash/v14)) :

| Bloc | Ce qui se passe |
|---|---|
| 20 736 | Le staking s'ouvre |
| 34 560 | La première liste de finaliseurs est établie à partir des mises présentes sur la chaîne |
| 36 288 | La finalité BFT démarre, et avec elle les récompenses de staking |

Les récompenses de staking commencent au dernier de ces blocs. Une caution constituée plus tôt ne rapporte rien jusque-là ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

La même version a réduit la liste active aux 12 finaliseurs ayant le plus de mise ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) et, selon les termes de ses notes de version, leur a accordé une commission : « 10 % de toutes les récompenses PoS d'un bloc vont à ces commissions, tandis que 90 % sont distribués à toutes les cautions de staking ».

### Le cTAZ et les vrais ZEC

Le cTAZ (« Crosslink TAZ ») est la pièce de test du Feature Net. Vous misez du cTAZ, jamais des ZEC.

Les vrais ZEC n'interviennent qu'à la fin. Shielded Labs a [réservé 500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) pour les feature nets, et les [notes de version](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) indiquent qu'ils sont versés « au prorata, sur la seule base de la quantité de cTAZ que chaque participant a gagnée par le minage ou le staking ». Deux conséquences :

- **Les pièces du faucet ne comptent pas.** Les cTAZ que l'on vous a donnés, par le faucet ou par quelqu'un d'autre, ne rapportent rien en restant dans votre portefeuille. Seules les récompenses de bloc issues du minage et du staking comptent.
- **Les paiements doivent être réclamés, ils ne sont pas automatiques.** Shielded Labs annonce chaque tour dans le [fil du forum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Pour le tour 2, il a demandé aux participants d'envoyer la clé pour lecture seule de leur portefeuille et une adresse du réseau principal avant le 4 octobre 2026 ([message 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). Le réseau sur lequel tourne la version 14, celui que ce guide rejoint, a été annoncé comme le tour 3 ([message 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Avant de commencer

- **Un ordinateur que vous pouvez laisser allumé.** La version propose des builds pour Windows, macOS, Ubuntu et Arch Linux. Ce guide a été réalisé sous Windows, sur un PC équipé d'un processeur Intel Core i5-8350U.
- **Un Staking Day.** Vérifiez quand s'ouvre le prochain avant de planifier quoi que ce soit. Le [tableau de bord de Staker Space](https://crosslink.staker.space/) affiche un compte à rebours.
- **Rien d'autre.** Pas de ZEC, pas de compte et pas d'inscription.

## Étape 1 : téléchargez l'application et vérifiez le fichier

1. Ouvrez la [version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) et faites défiler jusqu'à **Assets**.
2. Téléchargez le fichier correspondant à votre système. Sous Windows, il s'agit de `zebrad_v14_win32.exe`.
3. Comparez le SHA-256 du fichier avec l'empreinte que GitHub affiche à côté de ce fichier.

Sous Windows, dans PowerShell :

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

L'empreinte que GitHub affiche pour ce fichier est `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. L'hexadécimal ne tient pas compte de la casse, les majuscules ci-dessus ne posent donc pas de problème. Pour laisser le shell comparer à la place de vos yeux :

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Sachez ce que vaut cette vérification. La version ne porte aucune signature : un hachage concordant vous indique donc que le téléchargement est complet et qu'il s'agit bien du fichier que GitHub distribue. Il ne vous dit pas qui l'a compilé. [Vérifier les publications Zcash](/guides/verifying-zcash-releases) explique la différence.

## Étape 2 : démarrez le nœud et laissez-le se synchroniser

Lancez l'application depuis un terminal, afin que ses messages de démarrage restent affichés. Utilisez une fenêtre PowerShell ordinaire, et non une fenêtre ouverte avec « Exécuter en tant qu'administrateur » : il s'agit d'un logiciel prototype non signé, et il n'a pas besoin des droits d'administrateur.

```powershell
.\zebrad_v14_win32.exe
```

Une fenêtre intitulée « Zcash Crosslink Visualizer » s'ouvre. Le portefeuille se trouve à gauche, avec les onglets **Your Wallet** et **Faucet Wallet**, la chaîne est dessinée au milieu, et les finaliseurs sont listés à droite. Le terminal continue d'afficher le journal du nœud. Laissez les deux ouverts pendant que vous utilisez le réseau.

Les notes de version renvoient à une [vidéo de l'installation sous Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

L'application conserve ses données dans un dossier de cache : `%LOCALAPPDATA%\zebra` sous Windows, `~/.cache/zebra` sous Linux et `~/Library/Caches/zebra` sous macOS, d'après les notes de version.

**Gardez le secret pour vous.** Ce dossier contient un fichier nommé `secret.seed`. L'application le crée au premier démarrage ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) et en dérive votre portefeuille et votre identité de finaliseur ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). L'application dispose aussi d'un bouton **Copy Seed** qui place ce même secret dans votre presse-papiers. Quiconque possède l'un ou l'autre contrôle votre portefeuille. Ne les collez jamais dans une discussion, un message de forum ou une capture d'écran.

### Comment savoir que vous êtes synchronisé

Les notes de version indiquent qu'il n'existe « aucune surveillance intégrée de la proximité de votre synchronisation avec la pointe du réseau ». La version 14 en propose pourtant un peu : le menu déroulant **Network Info** en haut de la fenêtre comporte les lignes PoW Height, Wallet Sync et Blocks Behind Known PoW ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Comparez votre hauteur avec celle affichée sur [Staker Space](https://crosslink.staker.space/) ou [ctaz.cash](https://ctaz.cash/).

Le nœud répond également via RPC :

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

Le port RPC `127.0.0.1:8232` est ouvert par défaut dans ce build et ne demande aucun mot de passe ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Il n'écoute que sur votre propre machine, et tout programme tournant sur cette machine peut l'appeler.

Lors de cet essai, la première synchronisation, du bloc 0 jusqu'à la pointe vers le bloc 28 400, a pris environ 50 minutes.

**Après un redémarrage, votre solde affiche zéro pendant un moment.** À chaque démarrage, l'application reconstruit le portefeuille à partir de `secret.seed` et parcourt à nouveau la chaîne depuis le bloc 0 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Tant que l'analyse n'a pas atteint vos transactions, votre solde et votre mise affichent 0. Lors de cet essai, ils sont revenus environ 15 minutes après un redémarrage. Le portefeuille du faucet est réanalysé de la même manière ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), et pendant l'analyse, l'onglet Faucet Wallet affichait un solde très élevé. Ignorez l'un et l'autre tant que Wallet Sync n'est pas terminé.

## Étape 3 : obtenez des cTAZ

### Minez-les

D'après les notes de version, l'application commence à miner sur CPU vers votre propre portefeuille une fois synchronisée. Vous n'avez rien à activer. Les pièces minées arrivent sur une adresse transparente de votre propre portefeuille ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Trouver un bloc est une autre affaire. Les notes préviennent que « vous pouvez être dépassé par d'autres qui minent plus rapidement, le succès n'est donc pas garanti ». Par défaut, le mineur intégré utilise un seul thread CPU ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Pour utiliser davantage de threads, définissez une variable d'environnement dans la même fenêtre PowerShell avant de lancer l'application ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Cet essai en a utilisé quatre :

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

La variable ne dure que le temps de cette fenêtre. Avec elle, le compteur de processeur de Windows montrait que le nœud utilisait l'équivalent de quatre à cinq processeurs, en pourcentage d'un processeur logique :

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Résultat : un Intel Core i5-8350U minant sur quatre threads, du début du 8 octobre à l'après-midi du 9 octobre, n'a trouvé aucun bloc.

### Ou utilisez le faucet

L'application dispose d'un bouton **Receive cTAZ** en bas à droite. Dans le code source de la version 14, une pression envoie 0,5 cTAZ du portefeuille du faucet vers le vôtre ([montant](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [envoi](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Le faucet est un portefeuille unique que chaque copie de l'application embarque ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), et l'onglet **Faucet Wallet** affiche son solde.

Le bouton reste désactivé tant que le faucet ne détient pas plus de 5,01 cTAZ en pièces protégées ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). L'onglet compte aussi les pièces minées du faucet, et celles-ci ne sont protégées que par lots d'exactement 10 cTAZ plus des frais ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)) : l'onglet peut donc afficher un solde confortable alors que le bouton reste grisé. Lors de cet essai, il est resté grisé les 8 et 9 octobre, avec « The faucet is mining more funds. » au survol, alors que l'onglet affichait 14,74695 cTAZ.

**Quand le bouton est grisé, adressez-vous à votre propre nœud.** Le nœud dispose d'une méthode de demande au faucet, `requestfaucetdonation` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), qui n'applique pas la règle des 5,01 cTAZ du bouton. Remplacez `YOUR_ADDRESS` par votre propre adresse (il s'agit du champ `address` de `wallet_spendable_funds`, ci-dessous) :

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

Cette réponse signifie que la demande a été mise en file d'attente, pas qu'elle a été envoyée. Lors de cet essai, les 0,5 cTAZ du faucet ont été minés au bloc 33 306 et étaient dépensables au bloc 33 322. Ne faites qu'une demande : le faucet est partagé, et une seconde demande pour la même adresse est refusée tant que la première est en attente ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Ou demandez à un autre participant

N'importe qui sur le réseau peut vous envoyer des cTAZ avec le bouton **Send** de l'application. Lors de cet essai, un autre participant a envoyé 31 cTAZ. Ils sont arrivés comme « Received » avec la mention « send from user wallet », qui est celle que joint la fonction Send de l'application ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Demandez dans le [fil du forum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), et ne communiquez que votre adresse.

Les pièces du faucet et les dons suffisent pour apprendre le staking. Ils ne comptent pas pour les récompenses en ZEC.

### Vérifiez ce que vous pouvez dépenser

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Voici la réponse obtenue une fois les 0,5 cTAZ du faucet arrivés, avec l'adresse raccourcie :

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

Les montants sont exprimés en zatoshis : 100 000 000 font un cTAZ. Les pièces protégées ont besoin de 3 confirmations avant d'être comptées comme dépensables ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Les pièces provenant du faucet et des autres participants arrivent dans `spendable_zats`. Les pièces minées sont transparentes, elles arrivent donc dans `unshielded_zats` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Un bloc après la seconde mise de cet essai, le reste du solde apparaissait sous `pending_zats`. Quelques blocs plus tard, il était de nouveau dépensable.

## Étape 4 : misez auprès d'un finaliseur

### Attendez un Staking Day

Le staking, le retrait du staking et les retraits ne sont acceptés que lorsque

```text
block height mod 10,368 < 3,456
```

ce qui correspond à une fenêtre de 3 456 blocs au début de chaque période de 10 368. Avec l'objectif de 25 secondes par bloc du réseau, cela fait un jour sur trois ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Les premières fenêtres de la version 14 s'ouvrent aux blocs 20 736, 31 104, 41 472 et 51 840.

D'après les notes de version, l'application annonce le début et la fin de chaque Staking Day. Lors de cet essai, sa liste de blocs affichait une ligne rouge « * STAKING DAY END * » entre les blocs 34 559 et 34 560.

**Les notes de version disent deux choses différentes.** Leur liste des changements indique « ~1 jour pour le Staking Day et ~3 jours pour le cycle de staking », ce qui correspond au code. Plus bas, une section reprise de la saison 1 indique encore qu'un Staking Day commence tous les 150 blocs et dure 70 blocs. Fiez-vous à la première. La ligne de fin ci-dessus se trouve à l'endroit où la première règle ferme la fenêtre (34 560 mod 10 368 = 3 456) ; selon la seconde règle, le bloc 34 560 tomberait à l'intérieur d'une fenêtre.

### Choisissez un finaliseur

Un finaliseur est désigné par son identité, une chaîne de caractères qui commence par `zfinv1`. ZecHub publie l'identité du finaliseur qu'il exploite dans [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json) :

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Copiez une identité depuis une source de confiance. D'après les notes de version, l'application liste également les finaliseurs dans son panneau de droite, avec une icône de copie à gauche de chacun.

Une fois votre mise effectuée, l'historique du portefeuille et le RPC désignent le finaliseur par une clé hexadécimale au lieu de son identité. Pour le finaliseur de ZecHub, cette clé est `2941ef23...266aae8f`.

Choisissez un finaliseur en qui vous avez confiance. La conception ne prévoit pas de pénalité automatique, mais elle permet « un hard fork coordonné par les utilisateurs qui brûle toute la mise déléguée à un finaliseur désigné » ([livre Crosslink, vue d'ensemble de la conception](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Ce choix détermine aussi qui vote. Chaque caution active reçoit sa part de la récompense de staking. Si son finaliseur fait partie des 12 de la liste, un dixième de cette part revient au finaliseur à titre de commission. Une caution attribuée à un finaliseur hors des 12 conserve l'intégralité de sa part, mais ce finaliseur ne vote pas ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Misez

1. Copiez l'identité du finaliseur.
2. Dans l'onglet **Your Wallet**, appuyez sur **Stake**.
3. Appuyez sur **Paste Identity**. La ligne au-dessus du bouton affiche alors les premiers et derniers caractères de l'identité, `[zfinv1j6..YWyzp4YN]` pour celle de ZecHub. Vérifiez-la avant de continuer.
4. Cliquez sur un montant. Les montants sont proposés par paliers fixes, le plus petit étant 0,01 cTAZ, et seuls les montants couverts par votre solde sont allumés. Avec 0,5 cTAZ, +0,01 cTAZ et +0,1 cTAZ l'étaient.

**Rien ne vous demande de confirmer, et rien ne semble se passer.** Lors de cet essai, selon les mots du testeur : « J'ai cliqué une fois et rien ne s'est passé, le bouton est juste devenu gris puis s'est rallumé. » La mise avait bien été prise en compte. L'historique du portefeuille affichait « Staked @ 33334 to 2941ef23..266aae8f », les frais étaient de 0,00015 cTAZ, et le portefeuille affichait 0,010 cTAZ Staked. Une seconde mise quelques minutes plus tard a créé une seconde caution, au bloc 33 348.

Chaque mise crée sa propre caution de délégation. Les montants fixes comme le Staking Day existent pour la confidentialité : ils rendent la mise d'une personne plus difficile à distinguer de celle d'une autre.

## Étape 5 : vérifier votre position

### Vos cautions

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Voici la réponse obtenue au bloc 36 490, deux jours après la mise en staking :

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

L'appel ne prend aucun paramètre. Il renvoie vos cautions actives, regroupées sous la clé du finaliseur que chacune soutient, ainsi que les cautions libérées qui peuvent être retirées. Chaque caution indique le montant mis en staking (`initial_val`), sa valeur actuelle (`latest_val`), ainsi que la transaction et la hauteur de bloc qui l'ont créée. Les récompenses s'ajoutent à la caution elle-même : au bloc 36 490, chaque caution de 1 000 000 zatoshis était passée à 1 003 451.

**La fenêtre Edit Stake affiche chaque caution dix fois trop grande.** Lors de cet essai, chaque caution de 0,01 cTAZ apparaissait sur sa ligne comme 0,100 cTAZ, puis comme 0,1003536 cTAZ une fois les récompenses commencées, alors que les totaux au-dessus des lignes (0,020 cTAZ, puis 0,02007 cTAZ) concordaient avec le RPC. Fiez-vous aux totaux et au RPC.

La même fenêtre affichait un triangle d'avertissement à côté du finaliseur, avant comme après le début de la finalité. Dans le code source, ce triangle signifie que votre application ne considère pas ce finaliseur comme en ligne ; un finaliseur en ligne reçoit à la place une icône Wi-Fi ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Les cautions ont tout de même rapporté des récompenses.

### Les finaliseurs

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Selon les notes de version, cet appel indique où en est votre nœud dans le processus de vote et, pour chaque finaliseur, quand votre nœud a reçu de ses nouvelles pour la dernière fois et comment il a voté.

Avant le bloc 36 288, tous les champs sont à zéro et la liste est vide. Voici la réponse obtenue au bloc 33 354 :

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

Une fois la finalité lancée, la liste contient les finaliseurs du registre. Au bloc 36 490, elle en contenait 12, dont le `2941ef23...` de ZecHub, ce qui correspond à la limite de 12 du registre. Voici le début de cette réponse, coupé après la première entrée :

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

Quelques minutes plus tard, le panneau de droite de l'application affichait « Finalizers (23) ».

### Sur Linux et macOS

Le [code source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) donne l'appel sous la forme `curl`. Changez le nom de la méthode pour les autres appels. Cette forme n'a pas été testée pour ce guide :

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Sur Linux, les notes de version indiquent qu'il vous faudra probablement installer `xclip` pour que le copier-coller fonctionne dans l'application.

### Un nom de RPC à surveiller

Les notes de la version 14 décrivent un appel de staking nommé `wallet_staking_action` qui prend un objet. Le code source de la version 14 ne contient aucune méthode de ce nom, et lors de cet essai le nœud a répondu :

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

La méthode de staking qu'il enregistre est [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), qui prend une seule chaîne de caractères contenant la requête au format JSON, le finaliseur y étant désigné par son identité `zfinv1` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Elle n'a pas été essayée pour ce guide.

## Retirer du staking et récupérer les fonds

Une caution ne peut pas être annulée le jour même de sa création. Il faut trois Staking Days du début à la fin : mettre en staking pendant l'un, libérer la caution pendant un suivant, puis la retirer pendant un troisième. Les notes de version ajoutent qu'une même caution ne peut pas faire l'objet de deux actions de staking pendant le même Staking Day.

*Non testé pour ce guide. D'après les notes de la version 14 :* pour libérer une caution, appuyez sur **Edit Stake**, choisissez une caution dans la liste Staked Bonds et cliquez sur l'icône de maillon de chaîne. Pour la retirer lors d'un Staking Day ultérieur, appuyez sur **Edit Stake**, choisissez une caution dans la liste Withdrawable Bonds et cliquez sur l'icône représentant de l'argent. Déplacer une caution vers un autre finaliseur, ce que les notes appellent le reciblage, est possible à tout moment.

## Où suivre le réseau

L'onglet [Crosslink de ZecHub Outils](https://zechub.wiki/tools?tool=crosslink) rassemble les outils en un seul endroit, sous un avertissement qui indique « Le staking sur ce réseau ne déplace pas de ZEC » :

- Hébergés, sans nœud nécessaire : [Staker Space](https://crosslink.staker.space/), un « tableau de bord en direct du testnet cTAZ actuel » avec la hauteur, les mineurs, le taux de solutions, le compte à rebours du Staking Day et la finalité, ainsi que [ctaz.cash](https://ctaz.cash/), avec la production du minage, le registre des finaliseurs, les pairs et les noms revendiqués pour les adresses de staking.
- Sur votre propre machine : `zcash-explorer`, dont la page `/live/crosslink` affiche l'activation, le retard de finalité, le registre et les positions de staking, et `crosslink_indexer`, un index SQLite d'un nœud Crosslink.

## Erreurs courantes

**Se fier à l'horloge plutôt qu'à la hauteur de bloc.** Les Staking Days se comptent en blocs. Surveillez le compte à rebours d'un tableau de bord, pas le calendrier.

**Mettre en staking dans les dernières minutes de la fenêtre.** La règle est vérifiée par rapport au bloc qui inclut votre transaction ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)) : la mise en staking doit donc être minée avant la fermeture de la fenêtre, pas seulement envoyée.

**Compter sur le minage pour obtenir votre mise.** Un mineur CPU à quatre threads sur un Intel Core i5-8350U n'a trouvé aucun bloc entre le 8 et le 9 octobre. Obtenez vos premiers cTAZ auprès du faucet ou d'un autre participant.

**Cliquer de nouveau parce que rien ne semble se passer.** Chaque clic sur un montant crée une nouvelle caution. Vérifiez d'abord l'historique du portefeuille ou `wallet_staking_positions`.

**Paniquer après un redémarrage.** Votre solde et votre mise affichent zéro tant que le portefeuille n'a pas terminé sa nouvelle analyse. Attendez la fin de la synchronisation du portefeuille.

**Prendre les cTAZ pour de l'argent fictif, ou le secret pour quelque chose d'anodin.** Le cTAZ est une pièce de test, mais les cTAZ que vous gagnez déterminent votre part de vrais ZEC. Protégez `secret.seed` comme vous protégeriez un portefeuille.

**Lire d'anciennes instructions.** Les notes de version contiennent des textes des saisons précédentes à côté des nouvelles règles. En cas de désaccord avec le comportement de votre nœud, c'est votre nœud qui a raison.

## Pages associées

- [Crosslink Protocole](/zcash-tech/crosslink-protocol) - la conception que ce réseau met à l'épreuve
- [Shielded Labs](/zcash-organizations/shielded-labs) - l'équipe derrière Crosslink
- [Vérifier les versions de Zcash](/guides/verifying-zcash-releases) - ce qu'une somme de contrôle prouve et ne prouve pas
- [Nœud complet Zebra](/zcash-tech/zebra-full-node) - le nœud sur lequel repose l'application Feature Net
- [Testnet Zcash](/using-zcash/testnet) - le réseau de test ordinaire de Zcash, qui est un réseau différent

## Sources

- [Notes de la version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1er octobre 2026
- [Crosslink : Feature Nets incitatifs](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 avril 2026
- [Crosslink : Feature Net incitatif](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), forum communautaire Zcash
- [FAQ Crosslink](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Le livre Crosslink](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Les étapes de cette page ont été réalisées avec Feature Net version 14 sous Windows 11 (version 10.0.26200.9550), du 8 au 10 octobre 2026. Toute affirmation qui cite les notes de version ou le code source en est tirée. Tout ce qui est indiqué comme « non testé » n'a pas été essayé.*
