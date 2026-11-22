<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Guide de référence rapide de Zallet

## En bref

- Zallet est un portefeuille Zcash à nœud complet écrit en Rust. Il remplace le portefeuille qui était auparavant intégré à zcashd.
- zcashd a atteint son arrêt de fin de support le 18 juillet 2026 et ne fonctionne plus. Zebra gère désormais la partie nœud, et Zallet la partie portefeuille.
- Vous pilotez Zallet en ligne de commande avec `zallet rpc <command>`, comme vous utilisiez `zcash-cli` auparavant.
- Chaque argument placé après le nom de la commande doit être du JSON valide, ce qui signifie que les valeurs de type chaîne conservent leurs guillemets doubles.
- Zallet est en version bêta. Les commandes peuvent changer d'une version à l'autre, et tous les RPC de zcashd n'ont pas encore été portés.

## Explication principale

Zallet expose ses fonctionnalités via JSON-RPC, le même style d'interface que celui qu'utilisait le portefeuille zcashd. Tout ce que vous voulez faire faire au portefeuille, qu'il s'agisse de consulter un solde, de créer un compte ou d'envoyer un paiement protégé, est une commande que vous transmettez à `zallet rpc`.

Deux points diffèrent des anciennes habitudes de `zcash-cli` et expliquent la plupart des erreurs du début. Premièrement, les arguments doivent être du JSON valide et non du texte brut : un argument de type chaîne porte donc ses propres guillemets à l'intérieur des guillemets du shell. Deuxièmement, l'ensemble des commandes disponibles dépend de la version bêta que vous utilisez : la liste intégrée à votre binaire est donc plus fiable que n'importe quelle page écrite, y compris celle-ci.

Pour lister tous les RPC disponibles :

```bash
zallet rpc help
```

Pour obtenir l'aide détaillée d'un RPC précis :

```bash
zallet rpc help '"<command>"'
```

> **Important :** chaque argument placé après le nom de la méthode **doit être du JSON valide**.  
> Les valeurs de type chaîne doivent être écrites sous la forme `"value"` (guillemets doubles compris).

## Erreurs courantes

- **Omettre les guillemets intérieurs des arguments de type chaîne.** `zallet rpc validateaddress u1abc...` échoue, car l'adresse doit être transmise en JSON. Il faut l'écrire `'"u1abc..."'`.
- **Supposer que tous les RPC existent ici.** Le portage est toujours en cours. Certaines méthodes se comportent de manière identique, d'autres s'utilisent différemment, et certaines ne seront pas reprises du tout.
- **Considérer cette page comme plus fiable que votre binaire.** Zallet est en version bêta et évolue rapidement. Si une commande présentée ici ne fonctionne pas, consultez `zallet rpc help` avant de conclure à un dysfonctionnement.
- **S'attendre à ce que Zallet soit un nœud.** Il constitue la partie portefeuille du duo. Zebra fait tourner le nœud, et Zallet communique avec lui.

## Commandes RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Paramètre   | Type   | Obligatoire | Description              |
|-------------|--------|----------|--------------------------|
| hexstring   | chaîne | oui      | Chaîne hexadécimale de la transaction   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Paramètre   | Type   | Obligatoire | Description     |
|-------------|--------|----------|-----------------|
| hexstring   | chaîne | oui      | Script en hexadécimal      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Paramètre  | Type   | Obligatoire | Par défaut | Description                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | chaîne | oui      |         | Identifiant de la transaction                       |
| verbose    | nombre | non       | 0       | `0` = hexadécimal, valeur non nulle = objet JSON    |
| blockhash  | chaîne | non       |         | Limiter la recherche à ce bloc        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

Aucun paramètre.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

Aucun paramètre.

---

### listaddresses

```bash
zallet rpc listaddresses
```

Aucun paramètre.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

Aucun paramètre. Renvoie le schéma OpenRPC.

---

### stop

```bash
zallet rpc stop
```

Aucun paramètre. (Regtest uniquement)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Paramètre | Type   | Obligatoire | Description             |
|-----------|--------|----------|-------------------------|
| address   | chaîne | oui      | Adresse transparente     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Paramètre  | Type   | Obligatoire | Description             |
|------------|--------|----------|-------------------------|
| address    | chaîne | oui      | Adresse transparente     |
| signature  | chaîne | oui      | Signature en Base64        |
| message    | chaîne | oui      | Message d'origine        |

---

### walletlock

```bash
zallet rpc walletlock
```

Aucun paramètre.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Paramètre   | Type   | Obligatoire | Description                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | chaîne | oui      | Phrase secrète du portefeuille                    |
| timeout     | nombre | oui      | Durée en secondes pendant laquelle le portefeuille reste déverrouillé  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Paramètre             | Type   | Obligatoire | Description                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | chaîne | oui      | Adresse P2PKH à convertir   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Paramètre | Type   | Obligatoire | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | chaîne | oui      | Adresse Sapling dont la clé de dépense doit être exportée     |

> Le portefeuille doit être déverrouillé. Seule la clé de dépense Sapling est exportée.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Paramètre     | Type   | Obligatoire | Description     |
|---------------|--------|----------|-----------------|
| account_uuid  | chaîne | oui      | UUID du compte    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Paramètre          | Type            | Obligatoire | Description                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | chaîne / nombre | oui      | UUID du compte ou index de compte ZIP-32     |
| receiver_types     | tableau de chaînes | non       | Types de destinataires à inclure                |
| diversifier_index  | nombre          | non       | Index de diversification spécifique               |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Paramètre | Type            | Obligatoire | Par défaut | Description                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | chaîne / nombre | oui      |         | UUID du compte ou index ZIP-32     |
| minconf   | nombre          | non       | 1       | Nombre minimal de confirmations            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Paramètre | Type   | Obligatoire | Par défaut | Description               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | nombre | non       | 1       | Nombre minimal de confirmations     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Paramètre     | Type   | Obligatoire | Description                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | chaîne | oui      | Nom lisible                      |
| seedfp        | chaîne | non       | Obligatoire si le portefeuille contient plusieurs graines    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Paramètre     | Type   | Obligatoire | Par défaut | Description                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | nombre | non       | 1       | Nombre minimal de confirmations                |
| as_of_height  | nombre | non       |         | Requête à cette hauteur (`-1` = sommet de la chaîne) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Paramètre    | Type            | Obligatoire | Description                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | tableau de chaînes | non       | Identifiants d'opération (omettre pour toutes les opérations terminées)    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Paramètre    | Type            | Obligatoire | Description                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | tableau de chaînes | non       | Identifiants d'opération (omettre pour toutes)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Paramètre          | Type    | Obligatoire | Par défaut | Description                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | nombre  | non       | 1       | Nombre minimal de confirmations           |
| include_watchonly  | booléen | non       | false   | Inclure les soldes en lecture seule     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Paramètre  | Type    | Obligatoire | Par défaut | Description                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | chaîne  | oui      |         | UUID du compte                         |
| hex_data   | chaîne  | oui      |         | Clé publique ou script de rachat en hexadécimal      |
| rescan     | booléen | non       | true    | Réanalyser après l'importation                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Paramètre     | Type   | Obligatoire | Par défaut        | Description                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | chaîne | oui      |                | Clé de dépense étendue Sapling            |
| rescan        | chaîne | non       | `"whenkeyisnew"` | `"yes"`, `"no"` ou `"whenkeyisnew"`   |
| start_height  | nombre | non       | 0              | Hauteur de départ de la réanalyse                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Paramètre          | Type    | Obligatoire | Par défaut | Description                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | booléen | non       | true    | Renvoyer aussi les adresses de chaque compte   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Paramètre | Type   | Obligatoire | Description                          |
|-----------|--------|----------|--------------------------------------|
| status    | chaîne | non       | Filtrer par statut (p. ex. `"success"`)  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Paramètre      | Type   | Obligatoire | Description                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | chaîne | non       | Limiter à un seul compte         |
| start_height   | nombre | non       | Borne inférieure incluse        |
| end_height     | nombre | non       | Borne supérieure exclue        |
| offset         | nombre | non       | Nombre de résultats à ignorer       |
| limit          | nombre | non       | Nombre maximal de résultats à renvoyer    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Paramètre         | Type   | Obligatoire | Description                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | chaîne | oui      | Adresse unifiée à examiner   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Paramètre          | Type            | Obligatoire | Par défaut | Description                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | nombre          | non       | 1       | Nombre minimal de confirmations                |
| maxconf            | nombre          | non       | ∞       | Nombre maximal de confirmations                |
| include_watchonly  | booléen         | non       | false   | Inclure les éléments en lecture seule                   |
| addresses          | tableau de chaînes | non       |         | Filtrer sur ces adresses            |
| as_of_height       | nombre          | non       |         | Requête à cette hauteur              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Paramètre | Type  | Obligatoire | Description                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | tableau | oui      | Tableau d'objets : `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Paramètre        | Type            | Obligatoire | Par défaut         | Description                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | chaîne          | oui      |                 | Adresse source ou `"ANY_TADDR"`                  |
| amounts          | tableau d'objets | oui      |                 | Destinataires (`address`, `amount`, `memo` facultatif)|
| minconf          | nombre          | non       |                 | Nombre minimal de confirmations                            |
| fee              | null            | non       |                 | Doit être `null` (ZIP-317 uniquement)                    |
| privacy_policy   | chaîne          | non       | `"FullPrivacy"` | Chaîne de politique de confidentialité                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Paramètre        | Type   | Obligatoire | Description                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | chaîne | oui      | Adresse transparente ou UUID du compte              |
| toaddress        | chaîne | oui      | Destination protégée                             |
| fee              | null   | non       | Doit être `null`                                   |
| limit            | nombre | non       | Nombre maximal d'UTXO coinbase à protéger           |
| memo             | chaîne | non       | Mémo encodé en hexadécimal                                 |
| privacy_policy   | chaîne | non       | `AllowRevealedSenders` ou `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Paramètre | Type   | Obligatoire | Description     |
|-----------|--------|----------|-----------------|
| txid      | chaîne | oui      | Identifiant de la transaction  |

---

## Pages associées

- [Guide de migration : de zcashd vers Zebrad et Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — migration pas à pas depuis une installation zcashd existante
- [Nœud complet Zebra](/zcash-tech/zebra-full-node) — l'implémentation de nœud avec laquelle Zallet fonctionne
- [Nœuds complets](/zcash-tech/full-nodes) — ce qu'implique l'exploitation d'un nœud complet et pourquoi vous pourriez en vouloir un
- [Portefeuilles](/using-zcash/wallets) — des options de portefeuille plus légères si un nœud complet dépasse vos besoins
- [Transactions](/using-zcash/transactions) — les différences entre transactions protégées et transactions transparentes
