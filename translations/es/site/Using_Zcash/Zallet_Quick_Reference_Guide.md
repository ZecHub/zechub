<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guía de referencia rápida de Zallet

## TL;DR

- Zallet es una wallet de Zcash de nodo completo escrita en Rust. Sustituye a la wallet que antes estaba dentro de zcashd.
- zcashd alcanzó su parada por fin de soporte el 18 de julio de 2026 y ya no se ejecuta. Zebra ahora se encarga del lado del nodo; Zallet se encarga del lado de la wallet.
- Manejas Zallet desde la línea de comandos con `zallet rpc <command>`, de forma muy parecida a como antes usabas `zcash-cli`.
- Todos los argumentos después del nombre del comando deben ser JSON válido, lo que significa que los valores de tipo string conservan sus comillas dobles.
- Zallet sigue en fase alfa. Los comandos pueden cambiar entre versiones, y todavía no todos los RPC de zcashd han sido portados.

## Explicación básica

Zallet expone su funcionalidad a través de JSON-RPC, el mismo estilo de interfaz que usaba la wallet de zcashd. Cualquier cosa que quieras que haga la wallet — comprobar un saldo, crear una cuenta, enviar un pago blindado — es un comando que pasas a `zallet rpc`.

Hay dos diferencias con el antiguo hábito de `zcash-cli`, y explican la mayoría de los errores iniciales. Primero, los argumentos deben ser JSON válido en lugar de texto sin formato, por lo que un argumento de tipo string lleva sus propias comillas dentro de las comillas del shell. Segundo, el conjunto de comandos disponibles depende de la versión alfa que estés ejecutando, así que la lista integrada en tu binario es más fiable que cualquier página escrita, incluida esta.

Para listar todos los RPC disponibles:

```bash
zallet rpc help
```

Para obtener ayuda detallada sobre un RPC específico:

```bash
zallet rpc help '"<command>"'
```

> **Importante:** Todos los argumentos después del nombre del método **deben ser JSON válido**.  
> Los valores de tipo string deben escribirse como `"value"` (incluyendo las comillas dobles).

## Errores comunes

- **Omitir las comillas internas en los argumentos de tipo string.** `zallet rpc validateaddress u1abc...` falla, porque la dirección tiene que llegar como JSON. Debe escribirse `'"u1abc..."'`.
- **Asumir que todos los RPC de zcashd existen aquí.** El portado sigue en curso. Algunos métodos se comportan de forma idéntica, otros requieren un uso distinto, y algunos no se trasladarán en absoluto.
- **Tratar esta página como más autoritativa que tu binario.** Zallet está en fase alfa y evoluciona rápido. Cuando un comando de esta página no funcione, comprueba `zallet rpc help` antes de asumir que algo está roto.
- **Esperar que Zallet sea un nodo.** Es la mitad wallet del conjunto. Zebra ejecuta el nodo, y Zallet se comunica con él.

## Comandos RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parámetro   | Tipo   | Obligatorio | Descripción                  |
|-------------|--------|-------------|------------------------------|
| hexstring   | string | sí          | Cadena hex de transacción    |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parámetro   | Tipo   | Obligatorio | Descripción    |
|-------------|--------|-------------|----------------|
| hexstring   | string | sí          | Script en hex  |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parámetro | Tipo   | Obligatorio | Por defecto | Descripción                           |
|-----------|--------|-------------|-------------|---------------------------------------|
| txid      | string | sí          |             | ID de transacción                     |
| verbose   | number | no          | 0           | `0` = hex, distinto de cero = objeto JSON |
| blockhash | string | no          |             | Restringe la búsqueda a este bloque   |

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

Sin parámetros. (Solo regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Parámetro | Tipo   | Obligatorio | Descripción              |
|-----------|--------|-------------|--------------------------|
| address   | string | sí          | Dirección transparente   |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parámetro | Tipo   | Obligatorio | Descripción              |
|-----------|--------|-------------|--------------------------|
| address   | string | sí          | Dirección transparente   |
| signature | string | sí          | Firma Base64             |
| message   | string | sí          | Mensaje original         |

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

| Parámetro  | Tipo   | Obligatorio | Descripción                            |
|------------|--------|-------------|----------------------------------------|
| passphrase | string | sí          | Frase de contraseña de la wallet       |
| timeout    | number | sí          | Segundos durante los que la wallet permanece desbloqueada |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parámetro             | Tipo   | Obligatorio | Descripción                   |
|-----------------------|--------|-------------|-------------------------------|
| transparent_address   | string | sí          | Dirección P2PKH a convertir   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parámetro | Tipo   | Obligatorio | Descripción                                        |
|-----------|--------|-------------|----------------------------------------------------|
| address   | string | sí          | Dirección Sapling cuya clave de gasto se exportará |

> La wallet debe estar desbloqueada. Solo exporta la clave de gasto de Sapling.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parámetro    | Tipo   | Obligatorio | Descripción   |
|--------------|--------|-------------|---------------|
| account_uuid | string | sí          | UUID de cuenta |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parámetro         | Tipo             | Obligatorio | Descripción                              |
|-------------------|------------------|-------------|------------------------------------------|
| account           | string / number  | sí          | UUID de cuenta o índice de cuenta ZIP-32 |
| receiver_types    | array of string  | no          | Tipos de receptor a incluir              |
| diversifier_index | number           | no          | Índice de diversificador específico      |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parámetro | Tipo             | Obligatorio | Por defecto | Descripción                         |
|-----------|------------------|-------------|-------------|-------------------------------------|
| account   | string / number  | sí          |             | UUID de cuenta o índice ZIP-32      |
| minconf   | number           | no          | 1           | Confirmaciones mínimas              |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parámetro | Tipo   | Obligatorio | Por defecto | Descripción             |
|-----------|--------|-------------|-------------|-------------------------|
| minconf   | number | no          | 1           | Confirmaciones mínimas  |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parámetro    | Tipo   | Obligatorio | Descripción                               |
|--------------|--------|-------------|-------------------------------------------|
| account_name | string | sí          | Nombre legible por humanos                |
| seedfp       | string | no          | Obligatorio si la wallet tiene múltiples seeds |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parámetro    | Tipo   | Obligatorio | Por defecto | Descripción                              |
|--------------|--------|-------------|-------------|------------------------------------------|
| minconf      | number | no          | 1           | Confirmaciones mínimas                   |
| as_of_height | number | no          |             | Consultar a esta altura (`-1` = tip)     |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parámetro   | Tipo             | Obligatorio | Descripción                                 |
|-------------|------------------|-------------|---------------------------------------------|
| operationid | array of string  | no          | IDs de operación (omitir para todas las finalizadas) |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parámetro   | Tipo             | Obligatorio | Descripción                          |
|-------------|------------------|-------------|--------------------------------------|
| operationid | array of string  | no          | IDs de operación (omitir para todas) |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parámetro         | Tipo    | Obligatorio | Por defecto | Descripción                      |
|-------------------|---------|-------------|-------------|----------------------------------|
| minconf           | number  | no          | 1           | Confirmaciones mínimas           |
| include_watchonly | boolean | no          | false       | Incluir saldos de solo visualización |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parámetro | Tipo    | Obligatorio | Por defecto | Descripción                           |
|-----------|---------|-------------|-------------|---------------------------------------|
| account   | string  | sí          |             | UUID de cuenta                        |
| hex_data  | string  | sí          |             | Clave pública en hex o script de canje |
| rescan    | boolean | no          | true        | Reescanear después de importar        |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parámetro    | Tipo   | Obligatorio | Por defecto    | Descripción                            |
|--------------|--------|-------------|----------------|----------------------------------------|
| key          | string | sí          |                | Clave de gasto extendida Sapling       |
| rescan       | string | no          | `"whenkeyisnew"` | `"yes"`, `"no"` o `"whenkeyisnew"`   |
| start_height | number | no          | 0              | Altura de inicio del reescaneo         |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parámetro         | Tipo    | Obligatorio | Por defecto | Descripción                                |
|-------------------|---------|-------------|-------------|--------------------------------------------|
| include_addresses | boolean | no          | true        | Devolver también las direcciones de cada cuenta |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parámetro | Tipo   | Obligatorio | Descripción                           |
|-----------|--------|-------------|---------------------------------------|
| status    | string | no          | Filtrar por estado (p. ej. `"success"`) |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parámetro    | Tipo   | Obligatorio | Descripción                 |
|--------------|--------|-------------|-----------------------------|
| account_uuid | string | no          | Limitar a una sola cuenta   |
| start_height | number | no          | Límite inferior inclusivo   |
| end_height   | number | no          | Límite superior exclusivo   |
| offset       | number | no          | Omitir esta cantidad de resultados |
| limit        | number | no          | Número máximo de resultados a devolver |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parámetro       | Tipo   | Obligatorio | Descripción                    |
|-----------------|--------|-------------|--------------------------------|
| unified_address | string | sí          | Unified Address a inspeccionar |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parámetro         | Tipo             | Obligatorio | Por defecto | Descripción                      |
|-------------------|------------------|-------------|-------------|----------------------------------|
| minconf           | number           | no          | 1           | Confirmaciones mínimas           |
| maxconf           | number           | no          | ∞           | Confirmaciones máximas           |
| include_watchonly | boolean          | no          | false       | Incluir solo visualización       |
| addresses         | array of string  | no          |             | Filtrar por estas direcciones    |
| as_of_height      | number           | no          |             | Consultar a esta altura          |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parámetro | Tipo  | Obligatorio | Descripción                                                                  |
|-----------|-------|-------------|------------------------------------------------------------------------------|
| accounts  | array | sí          | Array de objetos: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parámetro      | Tipo             | Obligatorio | Por defecto     | Descripción                                       |
|----------------|------------------|-------------|-----------------|---------------------------------------------------|
| fromaddress    | string           | sí          |                 | Dirección de origen o `"ANY_TADDR"`               |
| amounts        | array of object  | sí          |                 | Destinatarios (`address`, `amount`, `memo` opcional) |
| minconf        | number           | no          |                 | Confirmaciones mínimas                            |
| fee            | null             | no          |                 | Debe ser `null` (solo ZIP-317)                    |
| privacy_policy | string           | no          | `"FullPrivacy"` | Cadena de política de privacidad                  |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parámetro      | Tipo   | Obligatorio | Descripción                                           |
|----------------|--------|-------------|-------------------------------------------------------|
| fromaddress    | string | sí          | Dirección transparente o UUID de cuenta               |
| toaddress      | string | sí          | Destino blindado                                      |
| fee            | null   | no          | Debe ser `null`                                       |
| limit          | number | no          | Número máximo de UTXO coinbase a blindar              |
| memo           | string | no          | Memo codificado en hex                                |
| privacy_policy | string | no          | `AllowRevealedSenders` o `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parámetro | Tipo   | Obligatorio | Descripción        |
|-----------|--------|-------------|--------------------|
| txid      | string | sí          | ID de transacción  |

---

## Páginas relacionadas

- [Guía de migración: de Zcashd a Zebrad y Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — transición paso a paso desde una configuración existente de zcashd
- [Nodo completo Zebra](/zcash-tech/zebra-full-node) — la implementación de nodo con la que trabaja Zallet
- [Nodos completos](/zcash-tech/full-nodes) — qué implica ejecutar un nodo completo y por qué podrías querer uno
- [Wallets](/using-zcash/wallets) — opciones de wallet más ligeras si un nodo completo es más de lo que necesitas
- [Transacciones](/using-zcash/transactions) — cómo se diferencian las transacciones blindadas y transparentes
