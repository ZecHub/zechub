<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guía de referencia rápida de Zallet

## En resumen

- Zallet es una billetera [wallet] de nodo completo [full-node] Zcash escrita en Rust. Reemplaza la billetera que antes se encontraba dentro de zcashd.
- zcashd alcanzó su detención de fin de soporte el 18 de julio de 2026 y ya no se ejecuta. Zebra ahora gestiona el lado del nodo [node]; Zallet gestiona el lado de la billetera.
- Controlas Zallet desde la línea de comandos con `zallet rpc <command>`, de forma similar a como usabas `zcash-cli` anteriormente.
- Cada argumento después del nombre del comando debe ser JSON válido, lo que significa que los valores de cadena conservan sus comillas dobles.
- Zallet está en beta. Los comandos pueden cambiar entre versiones, y todavía no todos los RPC de zcashd se han migrado.

## Explicación básica

Zallet expone su funcionalidad mediante JSON-RPC, el mismo estilo de interfaz que usaba la billetera zcashd. Todo lo que quieras que haga la billetera —comprobar un saldo, crear una cuenta, enviar un pago blindado [shielded payment]— es un comando que pasas a `zallet rpc`.

Dos aspectos difieren del antiguo hábito de `zcash-cli` y explican la mayoría de los errores iniciales. Primero, los argumentos deben ser JSON válido en lugar de texto sin formato, por lo que un argumento de cadena lleva sus propias comillas dentro de las comillas del shell. Segundo, el conjunto de comandos disponibles depende de la versión beta que estés ejecutando, por lo que la lista incorporada en tu binario es más fiable que cualquier página escrita, incluida esta.

Para enumerar todos los RPC disponibles:

```bash
zallet rpc help
```

Para obtener ayuda detallada sobre un RPC específico:

```bash
zallet rpc help '"<command>"'
```

> **Importante:** Cada argumento después del nombre del método **debe ser JSON válido**.  
> Los valores de cadena deben escribirse como `"value"` (incluidas las comillas dobles).

## Errores comunes

- **Omitir las comillas internas en los argumentos de cadena.** `zallet rpc validateaddress u1abc...` falla, porque la dirección [address] debe llegar como JSON. Debe escribirse como `'"u1abc..."'`.
- **Suponer que todos los RPC existen aquí.** La migración todavía está en curso. Algunos métodos se comportan de forma idéntica, algunos requieren un uso diferente y otros no se trasladarán en absoluto.
- **Considerar esta página más autorizada que tu binario.** Zallet está en beta y avanza rápidamente. Cuando un comando de esta página no funcione, consulta `zallet rpc help` antes de asumir que algo está roto.
- **Esperar que Zallet sea un nodo.** Es la mitad de billetera del par. Zebra ejecuta el nodo y Zallet se comunica con él.

## Comandos RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parámetro   | Tipo   | Obligatorio | Descripción                    |
|-------------|--------|-------------|--------------------------------|
| hexstring   | cadena | sí          | Cadena hexadecimal de transacción [transaction]   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parámetro   | Tipo   | Obligatorio | Descripción          |
|-------------|--------|-------------|----------------------|
| hexstring   | cadena | sí          | Script hexadecimal   |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parámetro  | Tipo   | Obligatorio | Predeterminado | Descripción                                  |
|------------|--------|-------------|---------------|----------------------------------------------|
| txid       | cadena | sí          |               | ID de transacción                            |
| verbose    | número | no          | 0             | `0` = hexadecimal, distinto de cero = objeto JSON    |
| blockhash  | cadena | no          |               | Restringir la búsqueda a este bloque [block]        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

Sin parámetros.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

Sin parámetros.

---

### listaddresses

```bash
zallet rpc listaddresses
```

Sin parámetros.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

Sin parámetros. Devuelve el esquema OpenRPC.

---

### stop

```bash
zallet rpc stop
```

Sin parámetros. (Solo Regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Parámetro | Tipo   | Obligatorio | Descripción                     |
|-----------|--------|-------------|---------------------------------|
| address   | cadena | sí          | Dirección transparente [transparent]     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parámetro  | Tipo   | Obligatorio | Descripción             |
|------------|--------|-------------|-------------------------|
| address    | cadena | sí          | Dirección transparente  |
| signature  | cadena | sí          | Firma [signature] Base64        |
| message    | cadena | sí          | Mensaje original        |

---

### walletlock

```bash
zallet rpc walletlock
```

Sin parámetros.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Parámetro   | Tipo   | Obligatorio | Descripción                                  |
|-------------|--------|-------------|----------------------------------------------|
| passphrase  | cadena | sí          | Frase de contraseña de la billetera          |
| timeout     | número | sí          | Segundos para mantener desbloqueada la billetera  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parámetro             | Tipo   | Obligatorio | Descripción                    |
|-----------------------|--------|-------------|--------------------------------|
| transparent_address   | cadena | sí          | Dirección P2PKH que convertir   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parámetro | Tipo   | Obligatorio | Descripción                                      |
|-----------|--------|-------------|--------------------------------------------------|
| address   | cadena | sí          | Dirección Sapling cuya clave de gasto [spending key] se exportará     |

> La billetera debe estar desbloqueada. Solo exporta la clave de gasto Sapling.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parámetro     | Tipo   | Obligatorio | Descripción     |
|---------------|--------|-------------|-----------------|
| account_uuid  | cadena | sí          | UUID de cuenta   |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parámetro          | Tipo            | Obligatorio | Descripción                              |
|--------------------|-----------------|-------------|------------------------------------------|
| account            | cadena / número | sí          | UUID de cuenta o índice de cuenta ZIP-32     |
| receiver_types     | matriz de cadenas | no        | Tipos de receptor que incluir            |
| diversifier_index  | número          | no          | Índice de diversificador específico      |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parámetro | Tipo            | Obligatorio | Predeterminado | Descripción                      |
|-----------|-----------------|-------------|---------------|----------------------------------|
| account   | cadena / número | sí          |               | UUID de cuenta o índice ZIP-32     |
| minconf   | número          | no          | 1             | Confirmaciones mínimas           |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parámetro | Tipo   | Obligatorio | Predeterminado | Descripción               |
|-----------|--------|-------------|---------------|---------------------------|
| minconf   | número | no          | 1             | Confirmaciones mínimas    |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parámetro     | Tipo   | Obligatorio | Descripción                              |
|---------------|--------|-------------|------------------------------------------|
| account_name  | cadena | sí          | Nombre legible para humanos               |
| seedfp        | cadena | no          | Obligatorio si la billetera tiene varias semillas    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parámetro     | Tipo   | Obligatorio | Predeterminado | Descripción                          |
|---------------|--------|-------------|---------------|--------------------------------------|
| minconf       | número | no          | 1             | Confirmaciones mínimas                |
| as_of_height  | número | no          |               | Consultar a esta altura (`-1` = punta) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parámetro    | Tipo            | Obligatorio | Descripción                              |
|--------------|-----------------|-------------|------------------------------------------|
| operationid  | matriz de cadenas | no        | ID de operaciones (omitir para todas las finalizadas)    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parámetro    | Tipo            | Obligatorio | Descripción                    |
|--------------|-----------------|-------------|--------------------------------|
| operationid  | matriz de cadenas | no        | ID de operaciones (omitir para todas)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parámetro          | Tipo     | Obligatorio | Predeterminado | Descripción                     |
|--------------------|----------|-------------|---------------|---------------------------------|
| minconf            | número   | no          | 1             | Confirmaciones mínimas          |
| include_watchonly  | booleano | no          | false         | Incluir saldos de solo visualización     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parámetro  | Tipo     | Obligatorio | Predeterminado | Descripción                          |
|------------|----------|-------------|---------------|--------------------------------------|
| account    | cadena   | sí          |               | UUID de cuenta                       |
| hex_data   | cadena   | sí          |               | Clave pública hexadecimal o script de canje      |
| rescan     | booleano | no          | true          | Reescanear después de la importación                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parámetro     | Tipo   | Obligatorio | Predeterminado | Descripción                              |
|---------------|--------|-------------|----------------|------------------------------------------|
| key           | cadena | sí          |                | Clave de gasto extendida Sapling            |
| rescan        | cadena | no          | `"whenkeyisnew"` | `"yes"`, `"no"` o `"whenkeyisnew"`   |
| start_height  | número | no          | 0              | Altura de inicio del reescaneo                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parámetro          | Tipo     | Obligatorio | Predeterminado | Descripción                              |
|--------------------|----------|-------------|---------------|------------------------------------------|
| include_addresses  | booleano | no          | true          | Devolver también las direcciones de cada cuenta   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parámetro | Tipo   | Obligatorio | Descripción                          |
|-----------|--------|-------------|--------------------------------------|
| status    | cadena | no          | Filtrar por estado (p. ej., `"success"`)  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parámetro      | Tipo   | Obligatorio | Descripción                  |
|----------------|--------|-------------|------------------------------|
| account_uuid   | cadena | no          | Limitar a una cuenta         |
| start_height   | número | no          | Límite inferior inclusivo    |
| end_height     | número | no          | Límite superior exclusivo    |
| offset         | número | no          | Omitir esta cantidad de resultados       |
| limit          | número | no          | Número máximo de resultados a devolver    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parámetro         | Tipo   | Obligatorio | Descripción                  |
|-------------------|--------|-------------|------------------------------|
| unified_address   | cadena | sí          | Dirección unificada que inspeccionar   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parámetro          | Tipo              | Obligatorio | Predeterminado | Descripción                          |
|--------------------|-------------------|-------------|---------------|--------------------------------------|
| minconf            | número            | no          | 1             | Confirmaciones mínimas                |
| maxconf            | número            | no          | ∞             | Confirmaciones máximas                |
| include_watchonly  | booleano          | no          | false         | Incluir solo visualización            |
| addresses          | matriz de cadenas | no          |               | Filtrar por estas direcciones         |
| as_of_height       | número            | no          |               | Consultar a esta altura               |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parámetro | Tipo  | Obligatorio | Descripción                                                                 |
|-----------|-------|-------------|-----------------------------------------------------------------------------|
| accounts  | matriz | sí         | Matriz de objetos: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parámetro        | Tipo              | Obligatorio | Predeterminado         | Descripción                                      |
|------------------|-------------------|-------------|------------------------|--------------------------------------------------|
| fromaddress      | cadena            | sí          |                        | Dirección de origen o `"ANY_TADDR"`                  |
| amounts          | matriz de objetos | sí          |                        | Destinatarios (`address`, `amount`, `memo` opcional)|
| minconf          | número            | no          |                        | Confirmaciones mínimas                            |
| fee              | nulo              | no          |                        | Debe ser `null` (solo ZIP-317)                    |
| privacy_policy   | cadena            | no          | `"FullPrivacy"` | Cadena de política de privacidad [privacy]                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parámetro        | Tipo   | Obligatorio | Descripción                                      |
|------------------|--------|-------------|--------------------------------------------------|
| fromaddress      | cadena | sí          | Dirección transparente o UUID de cuenta              |
| toaddress        | cadena | sí          | Destino blindado                             |
| fee              | nulo   | no          | Debe ser `null`                                   |
| limit            | número | no          | Número máximo de UTXO de coinbase que blindar           |
| memo             | cadena | no          | Memo codificado en hexadecimal                                 |
| privacy_policy   | cadena | no          | `AllowRevealedSenders` o `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parámetro | Tipo   | Obligatorio | Descripción     |
|-----------|--------|-------------|-----------------|
| txid      | cadena | sí          | ID de transacción  |

---

## Páginas relacionadas

- [Guía de migración: zcashd a Zebrad y Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — migración paso a paso desde una configuración existente de zcashd
- [Nodo completo Zebra](/zcash-tech/zebra-full-node) — la implementación de nodo con la que funciona Zallet
- [Nodos completos](/zcash-tech/full-nodes) — qué implica ejecutar un nodo completo y por qué podrías querer hacerlo
- [Billeteras](/using-zcash/wallets) — opciones de billetera más ligeras si un nodo completo es más de lo que necesitas
- [Transacciones](/using-zcash/transactions) — cómo difieren las transacciones blindadas y transparentes
