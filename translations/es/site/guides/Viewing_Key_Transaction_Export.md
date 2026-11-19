<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exportar el historial de transacciones [Transaction] desde Viewing Key

La mayoría de las exportaciones de billeteras [wallets] son limitadas. La exportación fiscal de ZODL, por ejemplo, ofrece fechas, importes y tarifas [fees] del año calendario anterior, pero no ID de transacciones, memos [memos] ni direcciones [addresses]. Eso no es suficiente para la contabilidad, para comprobar una migración de billetera [wallet] ni para averiguar qué ocurrió con un pago [payment].

No necesitas tu frase semilla [seed phrase] para obtener la imagen completa. Una clave de visualización [viewing key] completa unificada (UFVK, que comienza `uview1`) puede ver cada transacción entrante y saliente de una cuenta, y dos herramientas [tools] pueden convertir eso en un archivo que conservas: el servidor GraphQL de Zkool y zingo-cli. Esta guía reúne los enfoques de [este hilo del foro](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) y los actualiza para las versiones actuales.

Probado en septiembre de 2026 con Zkool 6.30.0 y zingo-cli de zingolib 6.0.0. Ambas versiones son anteriores a NU7, así que en noviembre de 2026 los pasos se actualizaron a Zkool 6.37.0 y zingolib 8.0.0. [Zkool 6.35.0](https://github.com/hhanh00/zkool2/pull/1388) es la primera versión de Zkool compilada con la altura de activación de Mainnet de NU7, y zingolib 8.0.0 es la versión que añade compatibilidad con Mainnet de NU7.

## Antes de empezar

Necesitas dos cosas:

1. **La UFVK** de la cuenta. [Claves de visualización](/zcash-tech/viewing-keys) explica qué revela y cómo exportar una.
2. **Una altura de nacimiento**, el bloque [block] desde el que se debe iniciar el escaneo. Usa una altura anterior a tu primera transacción. Si la estableces demasiado alta, el historial anterior faltará sin avisar. Si la estableces demasiado baja, el escaneo simplemente tardará más. La activación de Sapling (419200) siempre es segura, pero puede tardar horas en escanearse.

## Mantenlo privado

Una clave de visualización no puede gastar, pero muestra todo tu historial a quien la posea.

- No la pegues en un sitio web ni en un explorador de bloques. Impórtala en software que ejecutes tú mismo.
- El servidor desde el que sincronizas ve tu dirección IP y qué transacciones descargas completas. Ambas herramientas de abajo obtienen cada una de tus transacciones por ID para leer memos y tarifas, y [ZIP 307](https://zips.z.cash/zip-0307) señala que esto le indica al servidor qué transacciones son tuyas. Sincronizar desde tu propio nodo [node] Zebra con Zaino o lightwalletd evita eso. El [Zingolib y el tutorial de Zaino](/guides/zingolib-and-zaino-tutorial) explican una configuración.
- zingo-cli envía pagos a través de la mixnet de Nym, pero su sincronización sigue conectándose directamente al servidor, por lo que el punto anterior también se aplica.
- Da a estas herramientas claves de visualización, nunca una frase semilla. El comando Docker de abajo inicia el servidor Zkool GraphQL con `--allow-unauthenticated`, por lo que no tiene inicio de sesión, y su API devolverá la frase semilla de cualquier cuenta creada a partir de una, además de poder enviar fondos.
- Mantén el servidor en tu propia máquina. El comando Docker de abajo solo escucha en `127.0.0.1` de tu ordenador. Dentro del contenedor, el servidor tiene que escuchar en todas las interfaces (`--bind-address 0.0.0.0`); de lo contrario, Docker no podrá acceder a él. El mapeo `-p 127.0.0.1:8000:8000` es lo que lo mantiene local.
- Ambas herramientas almacenan la clave y tu historial sin cifrar. Zkool puede cifrar su base de datos (`--db-password-file`), pero el comando de abajo lo mantiene sencillo con `--allow-unencrypted-database`. Elimina los datos de trabajo cuando termines y guarda la exportación en algún lugar cifrado.

## Opción 1: GraphQL de Zkool

`zkool_graphql` es el motor de billetera de Zkool como servidor independiente. Es un programa separado de la aplicación Zkool. La forma más sencilla de ejecutarlo es la imagen oficial de Docker (amd64 y arm64). También hay un binario x86-64 de Linux en la [Zkoolpágina de versiones](https://github.com/hhanh00/zkool2/releases); necesita glibc 2.38 o posterior, por lo que Ubuntu 24.04 funciona y Debian 12 no.

### 1. Inicia el servidor

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.37.0 \
  --db-path /data/zkool.db \
  --bind-address 0.0.0.0 \
  --allow-unauthenticated \
  --allow-unencrypted-database
```

Desde la versión 6.32.0, el servidor no se inicia hasta que indiques explícitamente dos opciones: cómo inician sesión los clientes (una clave JWT o `--allow-unauthenticated`) y si la base de datos está cifrada (una contraseña o `--allow-unencrypted-database`). Ahora también escucha solo en `127.0.0.1` de forma predeterminada, lo que dentro de un contenedor significa que nada del exterior puede acceder a él; de ahí `--bind-address 0.0.0.0`. Si el contenedor se detiene de inmediato, `docker logs zkool-export` muestra qué opción falta.

Se sincroniza desde `https://zec.rocks`, a menos que añadas `--lwd-url` con tu propio servidor. La imagen ya incluye los parámetros de Sapling, así que no hay nada más que descargar.

Abre `http://127.0.0.1:8000/graphiql` en un navegador. Puedes pegar allí cada uno de los siguientes pasos y ejecutarlos.

### 2. Importa la clave

```graphql
mutation {
  createAccount(newAccount: {
    name: "export"
    key: "uview1..."
    aindex: 0
    birth: 2500000
    useInternal: true
  })
}
```

Devuelve el ID de la nueva cuenta, que es 1 en un servidor nuevo.

- Establece siempre `birth`. Sin ello, Zkool comienza desde el bloque actual y no encuentra nada.
- `useInternal: true` hace que Zkool también compruebe las direcciones de cambio transparentes. Mantenlo activado para claves de ZODL, la misma configuración que usa [Recuperación de fondos](/using-zcash/recovering-funds) para semillas de ZODL.

### 3. Sincroniza

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Esto se ejecuta hasta que termina la sincronización. No agregues `fast: true`. Omite la descarga de las transacciones completas, que es de donde proceden los memos, las tarifas y las salidas.

El número que devuelve es la altura a la que apuntaba, no una prueba de que llegó allí. Un error de red puede finalizar la sincronización antes sin informar nada, así que comprueba:

```graphql
{ currentHeight accounts { id name height } }
```

Si la `height` de la cuenta está por detrás de `currentHeight`, ejecuta la sincronización de nuevo. Continúa desde donde se detuvo.

### 4. Exporta

Guarda esto como `history.graphql`:

```graphql
{
  transactionsByAccount(idAccount: 1) {
    txid height time value fee
    notes { pool scope address value memo }
    spends { pool scope address value }
    outputs { pool vout address value memo }
  }
}
```

Omite el argumento `height` a menos que sea tu intención. Establece un mínimo, por lo que el `height: 3000000` del ejemplo del foro descarta todo lo anterior a ese bloque.

Obtenlo como JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Cada transacción debería mostrar una tarifa superior a 0, salvo las recompensas de minado [mining]. Si una muestra `"fee": "0"` y ningún memo, sus detalles no se descargaron. Zkool obtiene las transacciones completas una a una después del escaneo, y un fallo detiene silenciosamente el resto. Para enumerar las afectadas:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Si aparece algo, sincroniza de nuevo unos minutos después y vuelve a exportar.

Luego aplánalo a CSV, una fila por transacción:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Interpretación de la salida

| Campo | Significado |
|---|---|
| `value` | Cambio neto de la cuenta en ZEC, incluida la tarifa. Negativo para envíos. |
| `fee` | Tarifa en ZEC. En los pagos que recibiste, la pagó el remitente y no está en `value`. |
| `time` | Hora del bloque en UTC, sin un marcador de zona horaria |
| `notes` | Lo que la cuenta recibió en esta transacción, incluido el cambio. Los memos enviados a ti están aquí. Las entradas transparentes no tienen dirección. |
| `spends` | Las propias notas [notes] de la cuenta que esta transacción agotó |
| `outputs` | Lo que la transacción envió: cada salida transparente, más pagos blindados [shielded] a otras direcciones con sus memos |
| `pool` | 0 transparente, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 externo (un pago entrante), 1 interno (cambio) |

La aplicación Zkool también tiene Exportar transacciones, memos y notas en el menú de la cuenta, pero son volcados de tablas sin procesar: importes en zatoshis, marcas de tiempo Unix y memos en un archivo separado.

## Opción 2: zingo-cli

zingo-cli es la billetera de línea de comandos de Zingo. No hay descargas precompiladas, así que debes compilarla con Rust. Usa zingolib 8.0.0 o posterior: es la primera versión que conoce la altura de activación de Mainnet de NU7 (3,543,405), según sus [notas de la versión](https://github.com/zingolabs/zingolib/releases/tag/zingolib_v8.0.0). Las compilaciones de etiquetas anteriores, como la 6.0.0, no la conocen.

La compilación usa [cargo-make](https://github.com/sagiegurari/cargo-make) (`cargo install cargo-make`). En Ubuntu también necesitas `sudo apt install build-essential gcc libsqlite3-dev`.

```bash
git clone --branch zingolib_v8.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
makers run-cli --build-only
```

Esto compila `./target/release/zingo-cli` y coloca `nym-proxy` junto a él. Necesitas `nym-proxy` incluso para sincronizar: zingo-cli no se conectará sin él. Desde la versión 8.0.0, `zingo-netutils` forma parte del espacio de trabajo principal, por lo que la receta anterior que copiaba `nym-proxy` desde `zingo-netutils/target/release/` ya no funciona.

Si mueves `zingo-cli` a otro lugar, mueve `nym-proxy` con él o indícale a zingo-cli dónde está mediante `--nym-proxy /path/to/nym-proxy` o la variable de entorno `ZINGO_NYM_PROXY`. Si no, lo buscará junto a su propio binario y luego en tu `PATH`. Si no puede iniciar el proxy, no se conectará en absoluto.

Solo los pagos (y la consulta de precios de ZEC) pasan por Nym. Sync se conecta directamente al servidor.

La primera ejecución crea una billetera de solo visualización, la sincroniza e imprime el historial:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` debe ser una ruta absoluta.
- `--viewkey` y `--birthday` solo se aplican cuando se crea la billetera. Después, omítelos.
- Una zingo-cli recién creada está desconectada por defecto y necesita tu consentimiento para conectarse. `--server` elige el servidor y también cuenta como ese consentimiento. Las otras formas son `--online` (solo para esta sesión) y `--remember-online`, que también guarda la opción junto a la billetera para que las ejecuciones posteriores se conecten sin una bandera (`--forget-online` lo deshace).
- La clave queda en el historial de tu shell, así que bórrala después.

Ejecuciones posteriores:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` lee lo que ya está sincronizado sin tocar la red.

- `transactions` proporciona una entrada por transacción: txid, hora (UTC), altura, tipo (`received`, `sent`, `shield` o `send-to-self`), valor, tarifa y las notas involucradas.
- `value_transfers` proporciona una entrada por pago, por lo que un envío a dos personas son dos entradas, cada una con la dirección del destinatario y los memos.
- `messages` enumera los memos como JSON.

Algunas cosas que debes saber sobre la salida:

- `transactions` y `value_transfers` imprimen texto sin formato que se parece un poco a JSON, pero no lo es.
- Los importes están en zatoshis (100,000,000 por 1 ZEC) y siempre son positivos. `kind` indica la dirección. Para los envíos, `value` es lo que se envió a otras personas, sin incluir la tarifa.
- La tarifa aparece como «no disponible» cuando una transacción usa fondos transparentes que no eran tuyos. Solo se muestran los memos de texto.
- Si falla la sincronización, el error se muestra en la terminal, no en el archivo. Desde zingolib 8.0.0 (zingo-cli 0.5.0), un comando fallido también devuelve un código distinto de cero, pero revisa la terminal antes de confiar en `transactions.txt`.

El [zingoHelper](https://github.com/dismad/zingoHelper) de dismad tiene un script `exportToJSON.sh` que convierte `transactions` a JSON. Fue escrito antes de zingo-cli 6, está configurado para testnet, marca algunas entradas salientes de Sapling y transparentes como marcadores de posición, y necesita herramientas GNU, por lo que no se ejecutará en macOS estándar. Considera su salida como un punto de partida y comprueba los totales.

## Lo que una clave de visualización no puede decirte

- **Precios.** Ninguna herramienta registra un precio de ZEC en el momento de cada transacción. Añade tú mismo los valores fiduciarios.
- **Historial transparente, si la clave no lo incluye.** La parte transparente de una UFVK es opcional según [ZIP 316](https://zips.z.cash/zip-0316). Con zingo-cli, `$Z --offline parse_viewkey uview1...` muestra qué pools [pools] cubre una clave.
- **Quién te pagó.** Los pagos blindados no incluyen la dirección del remitente. A menos que el remitente haya puesto una en el memo, no está en ninguna parte.
- **Algunos detalles salientes.** La dirección de destino, el importe y el memo de los envíos blindados se recuperan descifrando con la clave. Sin embargo, una billetera puede crear una transacción de forma que eso no sea posible, aunque la mayoría no lo hacen.

## Otras herramientas

| Herramienta | Lo que obtienes |
|---|---|
| ZODL | CSV fiscal con fechas, importes, tarifas y una etiqueta. Solo el año calendario anterior, omite las transacciones de blindaje, sin txid, memo ni dirección. |
| Aplicación Zkool | Exportaciones de tablas sin procesar desde el menú de la cuenta |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Importa una UFVK con `importvk`. `listreceived` mediante RPC devuelve las notas recibidas con txid y memo, pero no los envíos ni las tarifas. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` es detallado pero está marcado como experimental, y Zallet solo importa claves de visualización de Sapling, no UFVK |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Importa una UFVK con `wallet init-fvk` y luego `wallet list-tx`. Su modo CSV no tiene txid ni dirección, y el proyecto indica que no se use en producción. |

## Relacionado

- [Claves de visualización](/zcash-tech/viewing-keys)
- [Recuperación de fondos](/using-zcash/recovering-funds)
- [Zingolib y Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)
- [Foro: Exportar el historial de transacciones a JSON/CSV desde UFVK/frase semilla](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Foro: Zkool y GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v8.0.0/zingo-cli/README.md)
