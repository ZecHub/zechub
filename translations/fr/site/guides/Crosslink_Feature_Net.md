<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Rejoindre le Crosslink Feature Net

## En bref

- Le Feature Net est le réseau public de test de Shielded Labs pour [Crosslink](/zcash-tech/crosslink-protocol), la couche de finalité proposée qui ajoute le staking au proof-of-work de Zcash.
- Il utilise une monnaie de test, cTAZ. Rien de ce que vous y faites ne déplace ou ne met en danger les ZEC du mainnet.
- Une application de bureau fait office de nœud, de mineur, de wallet et de finaliseur. Elle mine du cTAZ par défaut et possède un bouton de robinet.
- Le staking, le déstaking et le retrait ne fonctionnent que pendant un « Staking Day », un jour sur trois. Si vous le manquez, vous attendez le suivant.
- Pour staker, vous collez l'identité d'un finaliseur et cliquez sur un montant. Ce guide utilise le finaliseur de ZecHub comme exemple.
- Deux appels RPC indiquent votre situation : `wallet_staking_positions` et `get_tfl_recency_status`.

*Testé avec Feature Net version 14 sur Windows 11 (version 10.0.26200.9550), du 8 au 10 octobre 2026. Le logiciel est un prototype et change à chaque version. Si ce que vous voyez diffère de cette page, fiez-vous à votre propre exécution et ouvrez une PR, s'il vous plaît.*

## Ce qu'est le Feature Net

Crosslink est une proposition, qui ne fait pas partie de Zcash aujourd'hui. La FAQ de Shielded Labs, [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), indique qu'il « devrait passer par le processus de gouvernance standard de Zcash » avant de pouvoir atteindre le mainnet. La page [Crosslink Protocol](/zcash-tech/crosslink-protocol) explique la conception.

Pour essayer cette conception avec de vrais utilisateurs, Shielded Labs exploite ce qu'il appelle des [réseaux de fonctionnalités incitatifs](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) : « une série de testnets incitatifs ». Trois rôles existent sur le réseau, et l'application de bureau peut tous les jouer :

| Rôle | Ce qu'il fait |
|---|---|
| Mineur | Produit des blocs de proof-of-work, comme sur Zcash aujourd'hui |
| Staker | Verrouille du cTAZ dans une obligation de délégation et l'attribue à un finaliseur |
| Finaliseur | Vote pour finaliser les blocs. Son pouvoir de vote correspond au stake qui lui est délégué |

Le dépôt correspondant commence par un avertissement qu'il vaut la peine de lire avant d'installer quoi que ce soit : il « existe pour prouver des idées, pas pour démontrer une ingénierie de production » et n'est « pas du code prêt pour la production » ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Exécutez-le sur une machine où cela est acceptable.

### Ce que la version 14 a changé

[La version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) est sortie le 1er octobre 2026. Son réseau commence en simple proof-of-work et active Crosslink en trois étapes ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), également indiquées sur [ctaz.cash](https://ctaz.cash/v14)) :

| Bloc | Ce qui se passe |
|---|---|
| 20 736 | Le staking ouvre |
| 34 560 | La première liste de finaliseurs est établie à partir des stakes sur la chaîne |
| 36 288 | La finalité BFT commence, ainsi que les récompenses de staking |

Les récompenses de staking commencent au dernier de ces blocs. Une obligation créée auparavant ne rapporte rien avant cela ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

La même version a réduit la liste active aux 12 finaliseurs ayant le plus de stake ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) et, selon ses notes de version, leur a accordé une commission : « 10 % de toutes les récompenses PoS d'un bloc vont à ces commissions, tandis que 90 % sont distribués à toutes les obligations de staking ».

### cTAZ et les vrais ZEC

cTAZ (« Crosslink TAZ ») est la monnaie de test du Feature Net. Vous stakez du cTAZ, jamais des ZEC.

Les vrais ZEC n'interviennent qu'à la fin. Shielded Labs a [mis de côté 500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) pour les réseaux de fonctionnalités, et les [notes de version](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) indiquent qu'ils sont versés « au prorata, uniquement selon la quantité de cTAZ que chaque participant a gagnée par le minage ou le staking ». Deux conséquences :

- **Les monnaies du robinet ne comptent pas.** Le cTAZ qui vous a été donné, par le robinet ou par toute autre personne, ne rapporte rien en restant dans votre wallet. Seules les récompenses de bloc issues du minage et du staking comptent.
- **Les versements doivent être réclamés, ils ne sont pas automatiques.** Shielded Labs annonce chaque tour dans le [fil de discussion du forum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Pour le tour 2, il a demandé aux participants d'envoyer la viewing key de leur wallet et une adresse mainnet avant le 4 octobre 2026 ([publication 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). Le réseau sur lequel s'exécute la version 14, celui que rejoint ce guide, a été annoncé comme le tour 3 ([publication 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Avant de commencer

- **Un ordinateur que vous pouvez laisser allumé.** La version propose des builds pour Windows, macOS, Ubuntu et Arch Linux. Ce guide a été exécuté sur Windows, sur un PC doté d'un processeur Intel Core i5-8350U.
- **Un Staking Day.** Vérifiez quand le prochain ouvre avant de planifier quoi que ce soit. Le tableau de bord de [Staker Space](https://crosslink.staker.space/) affiche un compte à rebours.
- **Rien d'autre.** Aucun ZEC, aucun compte et aucune inscription.

## Étape 1 : télécharger l'application et vérifier le fichier

1. Ouvrez la [version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) et faites défiler jusqu'à **Assets**.
2. Téléchargez le fichier correspondant à votre système. Sur Windows, il s'agit de `zebrad_v14_win32.exe`.
3. Comparez le SHA-256 du fichier avec le condensat que GitHub affiche à côté de cet asset.

Sur Windows, dans PowerShell :

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Le condensat affiché par GitHub pour ce fichier est `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. L'hexadécimal ne distingue pas la casse, les lettres majuscules ci-dessus sont donc correctes. Pour laisser le shell comparer au lieu de vos yeux :

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Sachez ce que cette vérification vaut. La version ne comporte aucune signature ; un hash correspondant indique donc que le téléchargement est complet et qu'il s'agit du fichier que GitHub sert. Il ne vous indique pas qui l'a construit. [Verifying Zcash Releases](/guides/verifying-zcash-releases) explique la différence.

## Étape 2 : démarrer le nœud et le laisser se synchroniser

Démarrez l'application depuis un terminal afin que ses messages de démarrage restent à l'écran. Utilisez une fenêtre PowerShell ordinaire, et non une fenêtre ouverte avec « Exécuter en tant qu'administrateur » : il s'agit d'un logiciel prototype non signé et il n'a pas besoin de droits d'administrateur.

```powershell
.\zebrad_v14_win32.exe
```

Une fenêtre intitulée « Zcash Crosslink Visualizer » s'ouvre. Le wallet est à gauche, avec les onglets **Your Wallet** et **Faucet Wallet**, la chaîne est dessinée au milieu et les finaliseurs sont listés à droite. Le terminal continue d'afficher le journal du nœud. Laissez les deux ouverts pendant que vous utilisez le réseau.

Les notes de version renvoient vers une [vidéo de l'installation de Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

L'application conserve ses données dans un dossier de cache : `%LOCALAPPDATA%\zebra` sur Windows, `~/.cache/zebra` sur Linux et `~/Library/Caches/zebra` sur macOS, selon les notes de version.

**Gardez le secret pour vous.** Ce dossier contient un fichier nommé `secret.seed`. L'application le crée lors du premier démarrage ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) et en dérive votre wallet et votre identité de finaliseur ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). L'application possède également un bouton **Copy Seed** qui place le même secret dans votre presse-papiers. Toute personne qui possède l'un ou l'autre contrôle votre wallet. Ne les collez jamais dans un chat, une publication de forum ou une capture d'écran.

### Comment savoir que vous êtes synchronisé

Les notes de version indiquent qu'il n'y a « aucun suivi intégré de votre proximité avec la pointe du réseau ». La version 14 en propose toutefois un : le menu déroulant **Network Info** en haut de la fenêtre comporte des lignes pour PoW Height, Wallet Sync et Blocks Behind Known PoW ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Comparez votre hauteur avec celle de [Staker Space](https://crosslink.staker.space/) ou de [ctaz.cash](https://ctaz.cash/).

Le nœud répond également par RPC :

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

Le port RPC `127.0.0.1:8232` est ouvert par défaut dans ce build et ne nécessite aucun mot de passe ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Il n'écoute que sur votre propre machine, et tout ce qui s'exécute sur cette machine peut l'appeler.

Lors de cette exécution, la première synchronisation, du bloc 0 jusqu'à la pointe située vers le bloc 28 400, a pris environ 50 minutes.

**Après un redémarrage, votre solde affiche zéro pendant un certain temps.** Chaque fois que l'application démarre, elle reconstruit le wallet à partir de `secret.seed` et analyse de nouveau la chaîne depuis le bloc 0 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Jusqu'à ce que l'analyse atteigne vos transactions, votre solde et votre stake affichent 0. Lors de cette exécution, ils sont réapparus environ 15 minutes après un redémarrage. Le wallet du robinet est réanalysé de la même manière ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)) et, pendant l'analyse, l'onglet Faucet Wallet affichait un très grand solde. Ignorez les deux jusqu'à ce que Wallet Sync soit terminé.

## Étape 3 : obtenir du cTAZ

### En miner

Selon les notes de version, l'application commence à miner avec le CPU vers votre propre wallet dès qu'elle est synchronisée. Vous n'avez rien à activer. Les monnaies minées vont vers une adresse transparente de votre propre wallet ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Trouver un bloc est une autre affaire. Les notes avertissent que « vous pouvez être surpassé par d'autres qui minent plus rapidement, il n'y a donc aucune garantie de succès ». Par défaut, le mineur intégré utilise un seul thread CPU ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Pour utiliser davantage de threads, définissez une variable d'environnement dans la même fenêtre PowerShell avant de démarrer l'application ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Cette exécution en a utilisé quatre :

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

La variable ne dure que tant que cette fenêtre reste ouverte. Une fois définie, le compteur de processeur de Windows indiquait que le nœud utilisait l'équivalent de quatre à cinq processeurs en temps, en pourcentage d'un processeur logique :

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Le résultat : un Intel Core i5-8350U minant sur quatre threads, du début du 8 octobre à l'après-midi du 9 octobre, n'a trouvé aucun bloc.

### Ou utiliser le robinet

L'application possède un bouton **Receive cTAZ** en bas à droite. Dans le code source de la version 14, une pression envoie 0,5 cTAZ du wallet du robinet vers le vôtre ([montant](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [envoi](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Le robinet est un unique wallet que possède chaque copie de l'application ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), et l'onglet **Faucet Wallet** affiche son solde.

Le bouton est désactivé sauf si le robinet possède plus de 5,01 cTAZ en monnaies blindées ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). L'onglet compte aussi les monnaies minées par le robinet, lesquelles ne sont blindées que par lots d'exactement 10 cTAZ plus des frais ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), donc l'onglet peut afficher beaucoup alors que le bouton reste gris. Lors de cette exécution, il est resté gris les 8 et 9 octobre, avec « The faucet is mining more funds. » au survol, tandis que l'onglet affichait 14,74695 cTAZ.

**Lorsque le bouton est gris, demandez à votre propre nœud.** Le nœud possède une méthode de demande au robinet, `requestfaucetdonation` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), qui n'applique pas la règle des 5,01 cTAZ du bouton. Remplacez `YOUR_ADDRESS` par votre propre adresse (il s'agit du champ `address` de `wallet_spendable_funds`, ci-dessous) :

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

Cette réponse signifie que la demande a été mise en file, et non qu'elle a été envoyée. Lors de cette exécution, les 0,5 cTAZ du robinet ont été minés au bloc 33 306 et pouvaient être dépensés au bloc 33 322. Demandez une seule fois : le robinet est partagé, et une deuxième demande pour la même adresse est refusée tant que la première est en attente ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Ou demander à un autre participant

Toute personne sur le réseau peut vous envoyer du cTAZ avec le bouton **Send** de l'application. Lors de cette exécution, un autre participant a envoyé 31 cTAZ. Ils sont arrivés comme « Received » avec la note « send from user wallet », qui est la note ajoutée par le propre bouton Send de l'application ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Demandez dans le [fil de discussion du forum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) et ne donnez que votre adresse.

Les monnaies du robinet et les cadeaux suffisent pour apprendre le staking. Ils ne comptent pas pour les récompenses de ZEC.

### Vérifier ce que vous pouvez dépenser

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Voici la réponse une fois que les 0,5 cTAZ du robinet étaient arrivés, avec l'adresse raccourcie :

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

Les montants sont en zatoshis : 100 000 000 correspondent à un cTAZ. Les monnaies blindées ont besoin de 3 confirmations avant de pouvoir être dépensées ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Les monnaies du robinet et celles d'autres participants arrivent dans `spendable_zats`. Les monnaies minées sont transparentes, elles arrivent donc dans `unshielded_zats` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Un bloc après le deuxième stake de cette exécution, le reste du solde apparaissait sous `pending_zats`. Quelques blocs plus tard, il pouvait de nouveau être dépensé.

## Étape 4 : staker auprès d'un finaliseur

### Attendre un Staking Day

Le staking, le déstaking et le retrait ne sont acceptés que lorsque

```text
block height mod 10,368 < 3,456
```

ce qui représente une fenêtre de 3 456 blocs au début de chaque tranche de 10 368. Avec la cible réseau de 25 secondes par bloc, cela fait un jour sur trois ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Les premières fenêtres de la version 14 ouvrent aux blocs 20 736, 31 104, 41 472 et 51 840.

Selon les notes de version, l'application annonce le début et la fin de chaque Staking Day. Lors de cette exécution, sa liste de blocs affichait une ligne rouge « * STAKING DAY END * » entre les blocs 34 559 et 34 560.

**Les notes de version disent deux choses.** Leur liste de changements indique « ~1 jour pour le Staking Day et ~3 jours pour le Staking Cycle », ce qui correspond au code. Plus bas, une section reprise de la saison 1 indique toujours qu'un Staking Day commence tous les 150 blocs et dure 70 blocs. Suivez la première règle. La ligne de fin ci-dessus se trouve là où la première règle ferme la fenêtre (34 560 mod 10 368 = 3 456) ; avec la seconde règle, le bloc 34 560 se trouverait dans une fenêtre.

### Choisir un finaliseur

Un finaliseur est désigné par son identité, une chaîne qui commence par `zfinv1`. ZecHub publie l'identité du finaliseur qu'il exécute dans [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json) :

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Copiez une identité depuis une source à laquelle vous faites confiance. Selon les notes de version, l'application liste aussi les finaliseurs dans son panneau de droite, avec une icône de copie à gauche de chacun.

Après votre stake, l'historique du wallet et le RPC désignent le finaliseur par une clé hexadécimale au lieu de son identité. Pour le finaliseur de ZecHub, cette clé est `2941ef23...266aae8f`.

Choisissez un finaliseur auquel vous faites confiance. La conception ne comporte pas de slashing automatique, mais elle permet « un hard fork coordonné par les utilisateurs qui brûle tout le stake délégué à un finaliseur désigné » ([Crosslink livre, aperçu de la conception](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Ce choix décide également qui vote. Chaque obligation active gagne sa part de la récompense de staking. Si son finaliseur figure parmi les 12 de la liste, un dixième de cette part va au finaliseur comme commission. Une obligation dirigée vers un finaliseur hors des 12 conserve toute sa part, mais ce finaliseur ne vote pas ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Staker

1. Copiez l'identité du finaliseur.
2. Dans l'onglet **Your Wallet**, appuyez sur **Stake**.
3. Appuyez sur **Paste Identity**. La ligne au-dessus du bouton devient les premiers et derniers caractères de l'identité, `[zfinv1j6..YWyzp4YN]` pour celle de ZecHub. Vérifiez-la avant de continuer.
4. Cliquez sur un montant. Les montants progressent par paliers fixes, le plus petit est 0,01 cTAZ, et seuls les montants couverts par votre solde sont allumés. Avec 0,5 cTAZ, +0,01 cTAZ et +0,1 cTAZ l'étaient.

**Rien ne vous demande de confirmer, et rien ne semble se produire.** Lors de cette exécution, selon les mots du testeur : « J'ai cliqué une fois et rien ne s'est passé, le bouton est simplement devenu gris puis s'est rallumé. » Le stake avait bien été effectué. L'historique du wallet indiquait « Staked @ 33334 to 2941ef23..266aae8f », les frais étaient de 0,00015 cTAZ, et le wallet affichait 0,010 cTAZ Staked. Un deuxième stake quelques minutes plus tard a créé une deuxième obligation, au bloc 33 348.

Chaque stake crée sa propre obligation de délégation. Les montants fixes et le Staking Day existent tous deux pour la confidentialité : ils rendent le stake d'une personne plus difficile à distinguer de celui d'une autre.

## Étape 5 : vérifier votre situation

### Vos obligations

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Voici la réponse au bloc 36 490, deux jours après le staking :

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

L'appel ne prend aucun paramètre. Il renvoie vos obligations actives, regroupées sous la clé du finaliseur que chacune soutient, ainsi que les obligations ayant terminé leur déstaking et pouvant être retirées. Chaque obligation affiche le montant staké (`initial_val`), sa valeur actuelle (`latest_val`), ainsi que la transaction et la hauteur de bloc qui l'ont créée. Les récompenses sont ajoutées à l'obligation elle-même : au bloc 36 490, chaque obligation de 1 000 000 zatoshis avait atteint 1 003 451.

**La fenêtre Edit Stake affiche chaque obligation dix fois trop grande.** Lors de cette exécution, chaque obligation de 0,01 cTAZ affichait 0,100 cTAZ sur sa propre ligne, et 0,1003536 cTAZ une fois les récompenses commencées, tandis que les totaux au-dessus des lignes (0,020 cTAZ, puis 0,02007 cTAZ) concordaient avec le RPC. Fiez-vous aux totaux et au RPC.

La même fenêtre affichait un triangle d'avertissement à côté du finaliseur, avant comme après le début de la finalité. Dans le code source, ce triangle signifie que votre application ne compte pas ce finaliseur comme étant en ligne ; un finaliseur en ligne obtient à la place une icône Wi-Fi ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Les obligations ont tout de même obtenu des récompenses.

### Les finaliseurs

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Selon les notes de version, cela indique où en est votre nœud dans le processus de vote et, pour chaque finaliseur, à quel moment votre nœud en a eu des nouvelles pour la dernière fois et comment il a voté.

Avant le bloc 36 288, tous les champs sont à zéro et la liste est vide. Voici la réponse au bloc 33 354 :

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

Après le début de la finalité, la liste contient les finaliseurs de la liste active. Au bloc 36 490, elle en contenait 12, dont celui de ZecHub, `2941ef23...`, ce qui correspond à la limite de 12 finaliseurs. Voici le début de cette réponse, tronquée après la première entrée :

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

Le [source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) donne l'appel sous forme `curl`. Modifiez le nom de méthode pour les autres appels. Cette forme n'a pas été exécutée pour ce guide :

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Sur Linux, les notes de version indiquent que vous devez probablement installer `xclip` avant que le copier-coller fonctionne dans l'application.

### Un nom RPC à surveiller

Les notes de version 14 décrivent un appel de staking nommé `wallet_staking_action` qui prend un objet. Le code source de la version 14 ne comporte aucune méthode de ce nom et, lors de cette exécution, le nœud a répondu :

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

La méthode de staking qu'il enregistre est [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), qui prend une chaîne contenant la demande au format JSON, le finaliseur étant indiqué par son identité `zfinv1` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Elle n'a pas été testée pour ce guide.

## Déstaker et retirer

Une obligation ne peut pas être annulée le jour où elle est créée. Il faut trois Staking Days du début à la fin : staker pendant l'un, déstaker pendant un autre, puis retirer pendant un troisième. Les notes de version ajoutent qu'une obligation ne peut pas effectuer deux actions de staking lors du même Staking Day.

*Non exécuté pour ce guide. D'après les notes de version 14 :* pour déstaker, appuyez sur **Edit Stake**, choisissez une obligation dans la liste Staked Bonds et cliquez sur l'icône de maillon de chaîne. Pour retirer lors d'un Staking Day ultérieur, appuyez sur **Edit Stake**, choisissez une obligation dans la liste Withdrawable Bonds et cliquez sur l'icône d'argent. Déplacer une obligation vers un autre finaliseur, ce que les notes appellent le retargeting, est autorisé à tout moment.

## Où surveiller le réseau

L'onglet [Crosslink sur ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) rassemble les outils en un seul endroit, sous un avis indiquant « Le staking sur ce réseau ne déplace pas les ZEC » :

- Hébergés, sans nœud nécessaire : [Staker Space](https://crosslink.staker.space/), un « tableau de bord en direct pour le testnet cTAZ actuel » avec la hauteur, les mineurs, le taux de solutions, le compte à rebours du Staking Day et la finalité, et [ctaz.cash](https://ctaz.cash/), avec la production de minage, la liste des finaliseurs, les pairs et les revendications de noms d'adresses de staking.
- Sur votre propre machine : `zcash-explorer`, dont la page `/live/crosslink` affiche l'activation, le retard de finalité, la liste et les positions de staking, et `crosslink_indexer`, un index SQLite d'un nœud Crosslink.

## Erreurs fréquentes

**Planifier selon l'horloge plutôt que selon la hauteur de bloc.** Les Staking Days sont comptés en blocs. Surveillez le compte à rebours d'un tableau de bord, pas le calendrier.

**Staker dans les dernières minutes de la fenêtre.** La règle est vérifiée par rapport au bloc qui inclut votre transaction ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), donc le stake doit être miné avant la fermeture de la fenêtre, et pas seulement envoyé.

**S'attendre à miner son stake.** Un mineur CPU à quatre threads sur un Intel Core i5-8350U n'a trouvé aucun bloc entre les 8 et 9 octobre. Obtenez vos premiers cTAZ depuis le robinet ou auprès d'un autre participant.

**Cliquer de nouveau parce que rien ne semblait se produire.** Chaque clic sur un montant crée une nouvelle obligation. Vérifiez d'abord l'historique du wallet ou `wallet_staking_positions`.

**Paniquer après un redémarrage.** Votre solde et votre stake affichent zéro jusqu'à ce que le wallet ait terminé sa nouvelle analyse. Attendez la fin de Wallet Sync.

**Traiter le cTAZ comme de l'argent fictif, ou le secret comme inoffensif.** Le cTAZ est une monnaie de test, mais le cTAZ que vous gagnez détermine votre part de vrais ZEC. Protégez `secret.seed` comme vous protégeriez un wallet.

**Lire d'anciennes instructions.** Les notes de version comportent du texte de saisons antérieures à côté des nouvelles règles. Lorsqu'elles ne correspondent pas à ce que fait votre nœud, votre nœud a raison.

## Pages associées

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - la conception que ce réseau teste
- [Shielded Labs](/zcash-organizations/shielded-labs) - l'équipe derrière Crosslink
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) - ce qu'une somme de contrôle prouve et ne prouve pas
- [Zebra Full Node](/zcash-tech/zebra-full-node) - le nœud sur lequel est construite l'application Feature Net
- [Zcash Testnet](/using-zcash/testnet) - le réseau de test ordinaire de Zcash, qui est un réseau différent

## Sources

- [Notes de version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1er octobre 2026
- [Crosslink : réseaux de fonctionnalités incitatifs](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 avril 2026
- [Crosslink : Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) incitatif, forum communautaire Zcash
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Le livre de Crosslink](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Les étapes de cette page ont été exécutées avec Feature Net version 14 sur Windows 11 (version 10.0.26200.9550), du 8 au 10 octobre 2026. Toute affirmation qui cite les notes de version ou le code source en est issue. Tout élément marqué « non exécuté » n'a pas été testé.*
