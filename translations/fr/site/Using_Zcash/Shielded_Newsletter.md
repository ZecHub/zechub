<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Newsletter protégée

> Envoyez une note en markdown à une liste d'adresses protégées sous forme de mémos Zcash, à l'aide de Zallet. La liste des destinataires et la note restent à l'écart des adresses transparentes.

Une newsletter protégée est une série de transactions protégées. Chaque sortie verse un montant minime à une Unified Address destinataire et transporte le fragment suivant de la note dans le champ mémo. Zallet construit et envoie ces transactions. Zebra et Zaino fournissent uniquement les données de la chaîne.

Les scripts se trouvent dans [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Ils ont été écrits pour une première version de Zallet et ne peuvent pas être exécutés tels quels sans risque avec la version actuelle. Cette page décrit la procédure mise à jour. Vérifiée par rapport à Zallet `v0.1.0-beta.3` et à la documentation de Zallet au 7 octobre 2026.

## Ce dont vous avez besoin

- Zebra entièrement synchronisé, avec le RPC lié à localhost.
- Zaino synchronisé avec ce nœud Zebra.
- Zallet `v0.1.0-beta.3` ou plus récent, en version portefeuille, avec son RPC lié à localhost. La documentation indique que `z_sendmany` est implémenté. Des frais numériques sont refusés : si vous passez `fee`, il doit valoir `null`, car Zallet applique toujours les frais ZIP 317.
- Un compte approvisionné dont l'Unified Address peut dépenser des fonds protégés.
- Les Unified Addresses des destinataires. Un mémo vers une adresse transparente provoque une erreur.

Ne placez pas d'adresse approvisionnée ni de cookie dans le wiki ou dans un script commité. Le `txBuilderFromFile.sh` actuel contient une Unified Address codée en dur. Remplacez-la localement et ne la commitez pas.

## Configurer Zallet

Générez une configuration avec le Zallet que vous exécutez, puis faites-la pointer vers Zebra et Zaino. L'exemple de l'ancien tutoriel utilise `as_of_version = "0.0.0"` et un chemin de répertoire personnel. Considérez ce fichier comme un instantané, pas comme un modèle.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` doit lister `z_sendmany`, `z_getoperationstatus` et `z_getoperationresult`. Liez le RPC à `127.0.0.1` uniquement.

## Liste des destinataires

Une Unified Address par ligne, sans guillemets, sans lignes vides. Le script lit `daoAddresses.md`. L'ancien readme indique `daoAddress.md`. Ce fichier ne se trouve pas dans le dépôt, et les noms ne correspondent pas.

```text
u1...
u1...
```

## Envoyer un mémo

`z_sendmany` est asynchrone. Il renvoie un identifiant d'opération. Interrogez `z_getoperationstatus` jusqu'à ce que le statut soit `success` ou une erreur. Une pause fixe de 5 secondes, comme le fait le script, perd le résultat lorsque la construction prend plus de temps. `z_getoperationresult` consomme l'opération : ne l'appelez donc pas avant que le statut soit final.

Les frais sont omis. Zallet calcule les frais ZIP 317. Ne passez pas de nombre.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Le champ mémo est en hexadécimal brut, 512 octets au maximum. `ascii2hex` n'encode que l'ASCII. Une note contenant un caractère non ASCII échoue. `xxd` ou `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` gère l'UTF-8.

La politique de confidentialité est par défaut `FullPrivacy`. C'est la bonne valeur par défaut pour un destinataire protégé. Ne passez pas `AllowFullyTransparent`.

## Défauts du script

Ils sont présents dans l'arborescence au 8 octobre 2026. N'exécutez pas `shieldNewsletter.sh` tant qu'ils ne sont pas corrigés.

- Il manque `$` dans `[[ bytesInFile -lt 512 ]]`. La branche à mémo unique ne s'exécute jamais.
- La boucle de découpage stocke de l'hexadécimal, puis `hex2ascii` le décode, puis `txBuilderFromFile.sh` l'encode à nouveau. Le dernier fragment n'est pas envoyé, sauf si une ligne suivante dépasse 512. Une ligne longue n'est pas découpée. Elle est envoyée en entier et peut dépasser le mémo de 512 octets.
- `txBuilderFromFile.sh` appelle `./zallet rpc` sans chemin de configuration et attend le binaire dans le répertoire courant. Utilisez `zallet -c <config> rpc`.
- `toCurl.sh` communique avec Zebra sur le port 8232 avec un cookie, et appelle `getinfo` et `sendmany`. Zallet ne fournit pas `sendmany`. La boucle d'attente de minage utilise aussi `[[ chainHeight -gt temp ]]` sans `$` : elle n'attend donc pas.
- `z_gettotalbalance 0 true` est passé sous forme d'arguments positionnels supplémentaires. Vérifiez `rpc help z_gettotalbalance` sur le binaire que vous exécutez avant d'utiliser cet appel.
- Chaque fragment envoie `0.0001` ZEC à chaque destinataire. Les frais ZIP 317 s'y ajoutent. Une note longue envoyée à de nombreuses adresses dépense plus que les montants dérisoires.

## Après une correction

Un script d'exécution corrigé doit :

1. Lire la note sous forme d'octets et la découper par blocs de 512 octets, et non par lignes.
2. Encoder chaque fragment en hexadécimal une seule fois.
3. Appeler `zallet -c <config> rpc z_sendmany` avec l'UA approvisionnée, le tableau des destinataires et aucun argument de frais.
4. Interroger `z_getoperationstatus` pour cet identifiant d'opération.
5. N'enregistrer le txid qu'après `success`.

L'ancienne page du tutoriel reste disponible à [Scripts de la newsletter protégée](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md). Utilisez cette page pour la procédure.
