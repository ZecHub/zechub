<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Boletín blindado

> Envía una nota en markdown a una lista de direcciones blindadas como memos Zcash, usando Zallet. La lista de destinatarios y la nota se mantienen fuera de las direcciones transparentes.

Un boletín blindado es una serie de transacciones blindadas. Cada salida paga una cantidad mínima a un destinatario Unified Address y contiene la siguiente parte de la nota en el campo de memo. Zallet crea y envía esas transacciones. Zebra y Zaino solo proporcionan datos de la cadena.

Los scripts están en [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Se escribieron para una versión temprana de Zallet y no es seguro ejecutarlos tal como están con la versión actual. Esta página contiene el procedimiento actualizado. Verificado con Zallet `v0.1.0-beta.3` y el libro de Zallet al 7 de octubre de 2026.

## Lo que necesitas

- Zebra totalmente sincronizado, con RPC vinculado a localhost.
- Zaino sincronizado con ese nodo Zebra.
- Zallet `v0.1.0-beta.3` o posterior, compilación de wallet, con su RPC vinculado a localhost. El libro indica que `z_sendmany` está implementado. Se rechaza una comisión numérica: si pasas `fee`, debe ser `null`, porque Zallet siempre usa la comisión ZIP 317.
- Una cuenta con fondos cuyo Unified Address pueda gastar fondos blindados.
- Unified Addresses de los destinatarios. Un memo en una dirección transparente es un error.

No pongas una dirección con fondos ni una cookie en la wiki ni en un script confirmado. El `txBuilderFromFile.sh` actual tiene un Unified Address codificado de forma fija. Sustitúyelo localmente y no lo confirmes.

## Configurar Zallet

Genera una configuración con el Zallet que estás ejecutando y luego dirígelo a Zebra y Zaino. El ejemplo del tutorial antiguo usa `as_of_version = "0.0.0"` y una ruta personal de inicio. Trata ese archivo como una instantánea, no como una plantilla.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` debe incluir `z_sendmany`, `z_getoperationstatus` y `z_getoperationresult`. Vincula RPC únicamente a `127.0.0.1`.

## Lista de destinatarios

Un Unified Address por línea, sin comillas ni líneas en blanco. El script lee `daoAddresses.md`. El readme antiguo indica `daoAddress.md`. Ese archivo no está en el repositorio y los nombres no coinciden.

```text
u1...
u1...
```

## Enviar un memo

`z_sendmany` es asíncrono. Devuelve un id de operación. Consulta `z_getoperationstatus` hasta que el estado sea `success` o se produzca un error. Una espera fija de 5 segundos, que es lo que hace el script, pierde el resultado cuando la compilación tarda más. `z_getoperationresult` consume la operación, así que no lo llames hasta que el estado sea terminal.

La comisión se omite. Zallet calcula ZIP 317. No pases un número.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

El campo de memo es hexadecimal sin procesar, con un máximo de 512 bytes. `ascii2hex` codifica solo ASCII. Una nota con cualquier carácter que no sea ASCII falla. `xxd` o `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` gestiona UTF-8.

La política de privacidad se establece de forma predeterminada en `FullPrivacy`. Ese es el valor predeterminado correcto para un destinatario blindado. No pases `AllowFullyTransparent`.

## Defectos del script

Estos están en el árbol al 8 de octubre de 2026. No ejecutes `shieldNewsletter.sh` hasta que se corrijan.

- A `[[ bytesInFile -lt 512 ]]` le falta `$`. La rama de memo único nunca se ejecuta.
- El bucle de fragmentos almacena hexadecimal, luego `hex2ascii` lo decodifica y después `txBuilderFromFile.sh` lo vuelve a codificar. El último fragmento no se vacía a menos que una línea posterior desborde 512. Una línea larga no se divide. Se envía completa y puede superar el memo de 512 bytes.
- `txBuilderFromFile.sh` llama a `./zallet rpc` sin ruta de configuración y espera que el binario esté en el directorio actual. Usa `zallet -c <config> rpc`.
- `toCurl.sh` se comunica con Zebra en el puerto 8232 con una cookie, y llama a `getinfo` y `sendmany`. Zallet no proporciona `sendmany`. El bucle de espera de minado también usa `[[ chainHeight -gt temp ]]` sin `$`, por lo que no espera.
- `z_gettotalbalance 0 true` se pasa como argumentos posicionales adicionales. Comprueba `rpc help z_gettotalbalance` en el binario que ejecutes antes de usar esa llamada.
- Cada fragmento envía `0.0001` ZEC a cada destinatario. La comisión ZIP 317 se añade encima. Una nota larga para muchas direcciones gasta más que las cantidades mínimas.

## Después de una corrección

Un ejecutor corregido debería:

1. Leer la nota como bytes y dividirla en límites de 512 bytes, no en líneas.
2. Codificar cada fragmento en hexadecimal una sola vez.
3. Llamar a `zallet -c <config> rpc z_sendmany` con la UA con fondos, el arreglo de destinatarios y sin argumento de comisión.
4. Consultar `z_getoperationstatus` para ese id de operación.
5. Registrar el txid solo después de `success`.

La antigua página del tutorial permanece en [scripts de Shielded Newsletter](/tutorials/shieldednewsletter/readme). Usa esta página para el procedimiento.
