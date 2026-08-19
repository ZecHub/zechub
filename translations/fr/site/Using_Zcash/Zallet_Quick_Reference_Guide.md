<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guide de référence rapide de Zallet

## TL;DR

- Zallet est un wallet Zcash à nœud complet écrit en Rust. Il remplace le wallet qui se trouvait auparavant dans zcashd.
- zcashd a atteint son arrêt de fin de support le 18 juillet 2026 et ne fonctionne plus. Zebra gère désormais la partie nœud ; Zallet gère la partie wallet.
- Vous pilotez Zallet depuis la ligne de commande avec `zallet rpc <command>`, un peu comme vous utilisiez `zcash-cli` auparavant.
- Chaque argument après le nom de la commande doit être un JSON valide, ce qui signifie que les valeurs de type chaîne conservent leurs guillemets doubles.
- Zallet est encore en alpha. Les commandes peuvent changer entre les versions, et tous les RPC de zcashd n’ont pas encore été portés.

## Explication principale

Zallet expose ses fonctionnalités via JSON-RPC, le même style d’interface que le wallet zcashd utilisait. Tout ce que vous voulez faire faire au wallet — vérifier un solde, créer un compte, envoyer un paiement protégé — est une commande que vous passez à `zallet rpc`.

Deux points diffèrent de l’ancienne habitude avec `zcash-cli` et expliquent la plupart des erreurs au début. Premièrement, les arguments doivent être du JSON valide plutôt que du texte brut, donc un argument de type chaîne doit contenir ses propres guillemets à l’intérieur des guillemets du shell. Deuxièmement, l’ensemble des commandes disponibles dépend de la version alpha que vous exécutez, donc la liste intégrée à votre binaire est plus fiable que n’importe quelle page écrite, y compris celle-ci.

Pour lister tous les RPC disponibles :

```bash
zallet rpc help
```

Pour obtenir une aide détaillée sur un RPC précis :

```bash
zallet rpc help '"<command>"'
```

> **Important :** Chaque argument après le nom de la méthode **doit être un JSON valide**.  
> Les valeurs de type chaîne doivent être écrites sous la forme `"value"` (y compris les guillemets doubles).

## Erreurs courantes

- **Oublier les guillemets internes sur les arguments de type chaîne.** `zallet rpc validateaddress u1abc...` échoue, car l’adresse doit être transmise en JSON. Il faut l’écrire `'"u1abc..."'`.
- **Supposer que chaque RPC de zcashd existe ici.** Le portage est toujours en cours. Certaines méthodes se comportent de manière identique, certaines nécessitent un usage différent, et certaines ne seront pas reprises du tout.
- **Considérer cette page comme plus autoritaire que votre binaire.** Zallet est en alpha et évolue rapidement. Lorsqu’une commande ici ne fonctionne pas, vérifiez `zallet rpc help` avant de supposer que quelque chose est cassé.
- **S’attendre à ce que Zallet soit un nœud.** C’est la moitié wallet du duo. Zebra exécute le nœud, et Zallet communique avec lui.

## Commandes RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Paramètre   | Type   | Obligatoire | Description                    |
|-------------|--------|-------------|--------------------------------|
| hexstring   | string | oui         | Chaîne hexadécimale de transaction   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Paramètre   | Type   | Obligatoire | Description     |
|-------------|--------|-------------|-----------------|
| hexstring   | string | oui         | Script hex      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Paramètre  | Type   | Obligatoire | Défaut  | Description                              |
|------------|--------|-------------|---------|------------------------------------------|
| txid       | string | oui         |         | ID de transaction                        |
| verbose    | number | non         | 0       | `0` = hex, non-zéro = objet JSON        |
| blockhash  | string | non         |         | Limiter la recherche à ce bloc           |

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

Aucun paramètre. Retourne le schéma OpenRPC.

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
|-----------|--------|-------------|-------------------------|
| address   | string | oui         | Adresse transparente    |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Paramètre  | Type   | Obligatoire | Description             |
|------------|--------|-------------|-------------------------|
| address    | string | oui         | Adresse transparente    |
| signature  | string | oui         | Signature Base64        |
| message    | string | oui         | Message d’origine       |

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

| Paramètre   | Type   | Obligatoire | Description                               |
|-------------|--------|-------------|-------------------------------------------|
| passphrase  | string | oui         | Phrase secrète du wallet                  |
| timeout     | number | oui         | Secondes pendant lesquelles le wallet reste déverrouillé  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Paramètre             | Type   | Obligatoire | Description                  |
|-----------------------|--------|-------------|------------------------------|
| transparent_address   | string | oui         | Adresse P2PKH à convertir    |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Paramètre | Type   | Obligatoire | Description                                          |
|-----------|--------|-------------|------------------------------------------------------|
| address   | string | oui         | Adresse Sapling dont exporter la clé de dépense      |

> Le wallet doit être déverrouillé. Exporte uniquement la clé de dépense Sapling.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Paramètre     | Type   | Obligatoire | Description     |
|---------------|--------|-------------|-----------------|
| account_uuid  | string | oui         | UUID du compte  |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Paramètre          | Type            | Obligatoire | Description                                  |
|--------------------|-----------------|-------------|----------------------------------------------|
| account            | string / number | oui         | UUID du compte ou index de compte ZIP-32     |
| receiver_types     | array of string | non         | Types de récepteurs à inclure                |
| diversifier_index  | number          | non         | Index de diversificateur spécifique          |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Paramètre | Type            | Obligatoire | Défaut  | Description                          |
|-----------|-----------------|-------------|---------|--------------------------------------|
| account   | string / number | oui         |         | UUID du compte ou index ZIP-32       |
| minconf   | number          | non         | 1       | Confirmations minimales              |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Paramètre | Type   | Obligatoire | Défaut  | Description                   |
|-----------|--------|-------------|---------|-------------------------------|
| minconf   | number | non         | 1       | Confirmations minimales       |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Paramètre     | Type   | Obligatoire | Description                                  |
|---------------|--------|-------------|----------------------------------------------|
| account_name  | string | oui         | Nom lisible par un humain                    |
| seedfp        | string | non         | Requis si le wallet a plusieurs seeds        |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Paramètre     | Type   | Obligatoire | Défaut  | Description                                  |
|---------------|--------|-------------|---------|----------------------------------------------|
| minconf       | number | non         | 1       | Confirmations minimales                      |
| as_of_height  | number | non         |         | Interroger à cette hauteur (`-1` = tip)      |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Paramètre    | Type            | Obligatoire | Description                                      |
|--------------|-----------------|-------------|--------------------------------------------------|
| operationid  | array of string | non         | IDs d’opération (omettre pour toutes les terminées)    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Paramètre    | Type            | Obligatoire | Description                          |
|--------------|-----------------|-------------|--------------------------------------|
| operationid  | array of string | non         | IDs d’opération (omettre pour toutes)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Paramètre          | Type    | Obligatoire | Défaut  | Description                         |
|--------------------|---------|-------------|---------|-------------------------------------|
| minconf            | number  | non         | 1       | Confirmations minimales             |
| include_watchonly  | boolean | non         | false   | Inclure les soldes watch-only       |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Paramètre  | Type    | Obligatoire | Défaut  | Description                              |
|------------|---------|-------------|---------|------------------------------------------|
| account    | string  | oui         |         | UUID du compte                           |
| hex_data   | string  | oui         |         | Clé publique hexadécimale ou redeem script      |
| rescan     | boolean | non         | true    | Relancer un rescan après l’import        |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Paramètre     | Type   | Obligatoire | Défaut          | Description                              |
|---------------|--------|-------------|-----------------|------------------------------------------|
| key           | string | oui         |                 | Clé de dépense étendue Sapling           |
| rescan        | string | non         | `"whenkeyisnew"` | `"yes"`, `"no"` ou `"whenkeyisnew"`    |
| start_height  | number | non         | 0               | Hauteur de départ du rescan              |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Paramètre          | Type    | Obligatoire | Défaut  | Description                                  |
|--------------------|---------|-------------|---------|----------------------------------------------|
| include_addresses  | boolean | non         | true    | Retourner aussi les adresses de chaque compte   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Paramètre | Type   | Obligatoire | Description                                |
|-----------|--------|-------------|--------------------------------------------|
| status    | string | non         | Filtrer par statut (par ex. `"success"`)   |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Paramètre      | Type   | Obligatoire | Description                      |
|----------------|--------|-------------|----------------------------------|
| account_uuid   | string | non         | Limiter à un seul compte         |
| start_height   | number | non         | Borne inférieure incluse         |
| end_height     | number | non         | Borne supérieure exclue          |
| offset         | number | non         | Ignorer ce nombre de résultats   |
| limit          | number | non         | Nombre maximal de résultats à retourner    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Paramètre         | Type   | Obligatoire | Description                         |
|-------------------|--------|-------------|-------------------------------------|
| unified_address   | string | oui         | Unified Address à inspecter         |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Paramètre          | Type            | Obligatoire | Défaut  | Description                          |
|--------------------|-----------------|-------------|---------|--------------------------------------|
| minconf            | number          | non         | 1       | Confirmations minimales              |
| maxconf            | number          | non         | ∞       | Confirmations maximales              |
| include_watchonly  | boolean         | non         | false   | Inclure watch-only                   |
| addresses          | array of string | non         |         | Filtrer sur ces adresses             |
| as_of_height       | number          | non         |         | Interroger à cette hauteur           |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Paramètre | Type  | Obligatoire | Description                                                                 |
|-----------|-------|-------------|-----------------------------------------------------------------------------|
| accounts  | array | oui         | Tableau d’objets : `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Paramètre        | Type            | Obligatoire | Défaut          | Description                                      |
|------------------|-----------------|-------------|-----------------|--------------------------------------------------|
| fromaddress      | string          | oui         |                 | Adresse source ou `"ANY_TADDR"`                  |
| amounts          | array of object | oui         |                 | Destinataires (`address`, `amount`, `memo` optionnel)|
| minconf          | number          | non         |                 | Confirmations minimales                          |
| fee              | null            | non         |                 | Doit être `null` (ZIP-317 uniquement)            |
| privacy_policy   | string          | non         | `"FullPrivacy"` | Chaîne de politique de confidentialité           |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Paramètre        | Type   | Obligatoire | Description                                      |
|------------------|--------|-------------|--------------------------------------------------|
| fromaddress      | string | oui         | Adresse transparente ou UUID de compte           |
| toaddress        | string | oui         | Destination protégée                             |
| fee              | null   | non         | Doit être `null`                                 |
| limit            | number | non         | Nombre max d’UTXO coinbase à protéger            |
| memo             | string | non         | Mémo encodé en hex                               |
| privacy_policy   | string | non         | `AllowRevealedSenders` ou `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Paramètre | Type   | Obligatoire | Description       |
|-----------|--------|-------------|-------------------|
| txid      | string | oui         | ID de transaction |

---

## Pages liées

- [Guide de migration : Zcashd vers Zebrad et Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — passage pas à pas depuis une installation zcashd existante
- [Nœud complet Zebra](/zcash-tech/zebra-full-node) — l’implémentation de nœud avec laquelle Zallet fonctionne
- [Nœuds complets](/zcash-tech/full-nodes) — ce qu’implique l’exécution d’un nœud complet et pourquoi vous pourriez en vouloir un
- [Wallets](/using-zcash/wallets) — des options de wallets plus légères si un nœud complet dépasse vos besoins
- [Transactions](/using-zcash/transactions) — comment les transactions protégées et transparentes diffèrent
