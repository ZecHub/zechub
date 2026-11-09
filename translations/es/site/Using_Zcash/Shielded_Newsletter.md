<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Boletín blindado [Shielded Newsletter]

> Envía una nota en markdown a una lista de direcciones blindadas [shielded addresses] como memos Zcash, usando Zallet. La lista de destinatarios y la nota se mantienen fuera de las direcciones transparentes.

Un boletín blindado es una serie de transacciones blindadas [shielded transactions]. Cada salida paga una cantidad mínima a una dirección unificada del destinatario y contiene la siguiente parte de la nota en el campo memo. Zallet crea y envía esas transacciones. Zebra y Zaino solo proporcionan datos de la red [chain].

Los scripts se encuentran en [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Se escribieron para una versión inicial de Zallet y no es seguro ejecutarlos tal cual con la versión actual. Esta página contiene el procedimiento actualizado. Verificado con Zallet `v0.1.0-beta.3` y el libro de Zallet a fecha de 7 de octubre de 2026.

## Lo que necesitas

- Zebra completamente sincronizado, con RPC vinculado a localhost.
- Zaino sincronizado con ese nodo Zebra.
- Zallet `v0.1.0-beta.3` o posterior, compilación de billetera [wallet], con su RPC vinculado a localhost. El libro enumera `z_sendmany` como implementado. Se rechaza una tarifa [fee] numérica: si pasas `fee`, debe ser `null`, porque Zallet siempre usa la tarifa 317 de ZIP.
- Una cuenta con fondos cuya dirección unificada pueda gastar fondos blindados.
- Direcciones unificadas de destinatarios. Un memo en una dirección transparente es un error.

No incluyas una dirección con fondos ni una cookie en la wiki ni en un script confirmado. El `txBuilderFromFile.sh` actual tiene una dirección unificada codificada de forma fija. Sustitúyela localmente y no la confirmes.

## Configura Zallet

Genera una configuración con el Zallet que estás ejecutando y, después, apúntala a Zebra y Zaino. El ejemplo del tutorial antiguo usa `as_of_version = "0.0.0"` y una ruta personal de inicio. Considera ese archivo una instantánea, no una plantilla.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` debe enumerar `z_sendmany`, `z_getoperationstatus` y `z_getoperationresult`. Vincula RPC únicamente a `127.0.0.1`.

## Lista de destinatarios

Una dirección unificada por línea, sin comillas ni líneas en blanco. El script lee `daoAddresses.md`. El readme antiguo dice `daoAddress.md`. Ese archivo no está en el repositorio y los nombres no coinciden.

```text
u1...
u1...
```

## Envía un memo

`z_sendmany` es asíncrono. Devuelve un identificador de operación. Consulta `z_getoperationstatus` hasta que el estado sea `success` o haya un error. Una espera fija de 5 segundos, que es lo que hace el script, pierde el resultado cuando la compilación tarda más. `z_getoperationresult` consume la operación, así que no lo llames hasta que el estado sea terminal.

La tarifa se omite. Zallet calcula 317 de ZIP. No pases un número.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

El campo memo es hexadecimal sin procesar, con un máximo de 512 bytes. `ascii2hex` codifica solo ASCII. Una nota con cualquier carácter no ASCII falla. `xxd` o `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` maneja UTF-8.

La política de privacidad [privacy] usa `FullPrivacy` de forma predeterminada. Es el valor predeterminado adecuado para un destinatario blindado. No pases `AllowFullyTransparent`.

## Defectos de los scripts

Estos están presentes en el árbol a fecha de 8 de octubre de 2026. No ejecutes `shieldNewsletter.sh` hasta que se corrijan.

- A `[[ bytesInFile -lt 512 ]]` le falta `$`. La rama de un único memo nunca se ejecuta.
- El bucle de fragmentos almacena hexadecimal, después `hex2ascii` lo decodifica y, luego, `txBuilderFromFile.sh` lo codifica de nuevo. El último fragmento no se vacía a menos que una línea posterior desborde 512. Una línea larga no se divide. Se envía completa y puede superar el memo de 512 bytes.
- `txBuilderFromFile.sh` llama a `./zallet rpc` sin una ruta de configuración y espera el binario en el directorio actual. Usa `zallet -c <config> rpc`.
- `toCurl.sh` se comunica con Zebra en el puerto 8232 mediante una cookie, y llama a `getinfo` y `sendmany`. Zallet no proporciona `sendmany`. El bucle de espera de minado [mining] también usa `[[ chainHeight -gt temp ]]` sin `$`, por lo que no espera.
- `z_gettotalbalance 0 true` se pasa como argumentos posicionales adicionales. Comprueba `rpc help z_gettotalbalance` en el binario que ejecutes antes de usar esa llamada.
- Cada fragmento envía `0.0001` ZEC a cada destinatario. La tarifa 317 de ZIP se suma a eso. Una nota larga enviada a muchas direcciones gasta más que las cantidades de polvo.

## Después de una corrección

Un ejecutor corregido debería:

1. Leer la nota como bytes y dividirla en límites de 512 bytes, no por líneas.
2. Codificar cada fragmento en hexadecimal una sola vez.
3. Llamar a `zallet -c <config> rpc z_sendmany` con la UA con fondos, el array de destinatarios y sin argumento de tarifa.
4. Consultar `z_getoperationstatus` para ese identificador de operación.
5. Registrar el txid solo después de `success`.

La página del tutorial antiguo permanece en [scripts del Boletín blindado](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md). Usa esta página para el procedimiento.
