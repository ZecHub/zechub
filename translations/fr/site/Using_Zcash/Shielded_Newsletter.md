<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Bulletin d'information blindé

> Envoyez une note Markdown à une liste d'adresses blindées sous forme de mémos Zcash, à l'aide de Zallet. La liste des destinataires et la note restent hors des adresses transparentes.

Un bulletin d'information blindé est une série de transactions blindées. Chaque sortie verse un montant minuscule à un Unified Address destinataire et contient la tranche suivante de la note dans le champ mémo. Zallet construit et envoie ces transactions. Zebra et Zaino fournissent uniquement les données de la chaîne.

Les scripts se trouvent dans [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Ils ont été écrits pour une première version de Zallet et ne peuvent pas être exécutés tels quels de manière sûre avec la version actuelle. Cette page présente la procédure mise à jour. Vérifiée avec Zallet `v0.1.0-beta.3` et le livre Zallet au 7 octobre 2026.

## Ce dont vous avez besoin

- Zebra entièrement synchronisé, avec RPC lié à localhost.
- Zaino synchronisé avec ce nœud Zebra.
- Zallet `v0.1.0-beta.3` ou version ultérieure, version wallet, avec son RPC lié à localhost. Le livre indique que `z_sendmany` est implémenté. Des frais numériques sont rejetés : si vous transmettez `fee`, il doit être `null`, car Zallet utilise toujours les frais ZIP 317.
- Un compte approvisionné dont le Unified Address peut dépenser des fonds blindés.
- Des Unified Addresses de destinataires. Un mémo sur une adresse transparente provoque une erreur.

Ne mettez pas une adresse approvisionnée ou un cookie dans le wiki ni dans un script versionné. La version actuelle de `txBuilderFromFile.sh` contient un Unified Address codé en dur. Remplacez-le localement et ne le validez pas.

## Configurer Zallet

Générez une configuration avec le Zallet que vous exécutez, puis pointez-la vers Zebra et Zaino. L'exemple de l'ancien tutoriel utilise `as_of_version = "0.0.0"` et un chemin personnel dans le répertoire personnel. Considérez ce fichier comme un instantané, pas comme un modèle.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` doit lister `z_sendmany`, `z_getoperationstatus` et `z_getoperationresult`. Liez RPC uniquement à `127.0.0.1`.

## Liste des destinataires

Un Unified Address par ligne, sans guillemets ni lignes vides. Le script lit `daoAddresses.md`. L'ancien readme indique `daoAddress.md`. Ce fichier n'est pas dans le dépôt, et les noms ne correspondent pas.

```text
u1...
u1...
```

## Envoyer un mémo

`z_sendmany` est asynchrone. Il renvoie un identifiant d'opération. Interrogez `z_getoperationstatus` jusqu'à ce que le statut soit `success` ou qu'une erreur survienne. Une pause fixe de 5 secondes, ce que fait le script, perd le résultat lorsque la construction prend plus de temps. `z_getoperationresult` consomme l'opération, ne l'appelez donc pas avant que le statut soit terminal.

Les frais sont omis. Zallet calcule ZIP 317. Ne transmettez pas de nombre.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Le champ mémo est du hexadécimal brut, 512 octets au maximum. `ascii2hex` encode uniquement l'ASCII. Une note contenant un caractère non ASCII échoue. `xxd` ou `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` gère UTF-8.

La politique de confidentialité utilise par défaut `FullPrivacy`. C'est le bon choix par défaut pour un destinataire blindé. Ne transmettez pas `AllowFullyTransparent`.

## Défauts des scripts

Ils sont présents dans l'arborescence au 8 octobre 2026. N'exécutez pas `shieldNewsletter.sh` avant leur correction.

- `[[ bytesInFile -lt 512 ]]` ne contient pas `$`. La branche du mémo unique ne s'exécute jamais.
- La boucle des segments stocke de l'hexadécimal, puis `hex2ascii` le décode, puis `txBuilderFromFile.sh` l'encode de nouveau. Le dernier segment n'est pas vidé à moins qu'une ligne ultérieure ne dépasse 512. Une longue ligne n'est pas divisée. Elle est envoyée en entier et peut dépasser le mémo de 512 octets.
- `txBuilderFromFile.sh` appelle `./zallet rpc` sans chemin de configuration et attend le binaire dans le répertoire courant. Utilisez `zallet -c <config> rpc`.
- `toCurl.sh` communique avec Zebra sur le port 8232 avec un cookie, et appelle `getinfo` et `sendmany`. Zallet ne fournit pas `sendmany`. La boucle d'attente de minage utilise également `[[ chainHeight -gt temp ]]` sans `$`, elle n'attend donc pas.
- `z_gettotalbalance 0 true` est transmis comme arguments positionnels supplémentaires. Vérifiez `rpc help z_gettotalbalance` sur le binaire que vous exécutez avant d'utiliser cet appel.
- Chaque segment envoie `0.0001` ZEC à chaque destinataire. Les frais ZIP 317 s'y ajoutent. Une longue note destinée à de nombreuses adresses dépense davantage que les montants dust.

## Après une correction

Un exécuteur corrigé devrait :

1. Lire la note sous forme d'octets et la diviser à des limites de 512 octets, et non par lignes.
2. Encoder chaque segment en hexadécimal une seule fois.
3. Appeler `zallet -c <config> rpc z_sendmany` avec l'UA approvisionnée, le tableau de destinataires et sans argument de frais.
4. Interroger `z_getoperationstatus` pour cet identifiant d'opération.
5. Enregistrer le txid uniquement après `success`.

L'ancienne page du tutoriel reste disponible à [Scripts de bulletin d'information blindé](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md). Utilisez cette page pour la procédure.
