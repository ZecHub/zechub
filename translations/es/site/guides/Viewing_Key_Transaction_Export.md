<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exportar el historial de transacciones desde un Viewing Key

La mayoría de las exportaciones de wallets son limitadas. La exportación fiscal de ZODL, por ejemplo, proporciona fechas, importes y comisiones del año calendario anterior, pero no IDs de transacción, memos ni direcciones. Eso no es suficiente para la contabilidad, para comprobar una migración de wallet o para determinar qué ocurrió con un pago.

No necesitas tu frase semilla para obtener el panorama completo. Una clave de visualización unificada completa (UFVK, que comienza con `uview1`) puede ver cada transacción entrante y saliente de una cuenta, y dos herramientas pueden convertirla en un archivo que conserves: el servidor GraphQL de Zkool y zingo-cli. Esta guía reúne los enfoques de [este hilo del foro](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) y los actualiza para las versiones actuales.

Probado en septiembre de 2026 con Zkool 6.30.0 y zingo-cli de zingolib 6.0.0.

## Antes de empezar

Necesitas dos cosas:

1. **La UFVK** de la cuenta. [Claves de visualización](/zcash-tech/viewing-keys) explica qué revela y cómo exportar una.
2. **Una altura de nacimiento**, el bloque desde el que se debe comenzar a escanear. Usa una altura anterior a tu primera transacción. Si la estableces demasiado alta, se omitirá silenciosamente el historial más antiguo. Si la estableces demasiado baja, el escaneo simplemente tardará más. La activación de Sapling (419200) siempre es segura, pero puede tardar horas en escanearse.

## Mantenlo privado

Una clave de visualización no puede gastar, pero muestra todo tu historial a quien la posea.

- No la pegues en un sitio web ni en un explorador de bloques. Impórtala en software que ejecutes tú mismo.
- El servidor desde el que sincronizas ve tu dirección IP y qué transacciones descargas por completo. Ambas herramientas siguientes obtienen cada una de tus transacciones por ID para leer memos y comisiones, y [ZIP 307](https://zips.z.cash/zip-0307) señala que esto le indica al servidor cuáles transacciones son tuyas. Sincronizar desde tu propio nodo de Zebra con Zaino o lightwalletd evita eso. El [Tutorial de Zingolib y Zaino](/guides/zingolib-and-zaino-tutorial) explica una configuración.
- zingo-cli 6 envía pagos a través de la mixnet de Nym, pero su sincronización sigue conectándose directamente al servidor, por lo que el punto anterior también le aplica.
- Da a estas herramientas una clave de visualización, nunca una semilla. El servidor GraphQL de Zkool no tiene inicio de sesión de forma predeterminada, y su API devolverá la semilla de cualquier cuenta creada a partir de una, además de poder enviar fondos.
- Mantén el servidor en tu propia máquina. El comando Docker siguiente solo escucha en `127.0.0.1`.
- Ambas herramientas almacenan la clave y tu historial sin cifrar. Elimina los datos de trabajo cuando termines y guarda la exportación en algún lugar cifrado.

## Opción 1: GraphQL de Zkool

`zkool_graphql` es el motor de wallet de Zkool como servidor independiente. Es un programa distinto de la aplicación Zkool. La forma más sencilla de ejecutarlo es con la imagen oficial de Docker (amd64 y arm64). También hay un binario Linux x86-64 en la [página de versionesZkool](https://github.com/hhanh00/zkool2/releases); requiere glibc 2.38 o posterior, por lo que Ubuntu 24.04 funciona y Debian 12 no.

### 1. Inicia el servidor

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Se sincroniza desde `https://zec.rocks` a menos que añadas `--lwd-url` con tu propio servidor. En el primer inicio descarga los parámetros de Sapling (unos 50 MB). Si falla, `docker start zkool-export` lo intenta de nuevo.

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

Devuelve el ID de la cuenta nueva, que es 1 en un servidor recién instalado.

- Establece siempre `birth`. Sin ella, Zkool comienza desde el bloque actual y no encuentra nada.
- `useInternal: true` hace que Zkool compruebe también las direcciones transparentes de cambio. Mantenlo activado para claves de ZODL, la misma configuración que usa [Recuperar fondos](/using-zcash/recovering-funds) para semillas de ZODL.

### 3. Sincroniza

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Esto se ejecuta hasta que termina la sincronización. No añadas `fast: true`. Omite la descarga de las transacciones completas, de donde proceden los memos, las comisiones y las salidas.

El número que devuelve es la altura a la que apuntaba, no una prueba de que llegó a ella. Un error de red puede terminar la sincronización antes sin informar nada, así que comprueba:

```graphql
{ currentHeight accounts { id name height } }
```

Si el `height` de la cuenta está por detrás de `currentHeight`, ejecuta la sincronización otra vez. Continúa desde donde se detuvo.

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

Omite el argumento `height` salvo que realmente lo quieras. Establece un mínimo, por lo que el `height: 3000000` del ejemplo del foro descarta todo lo anterior a ese bloque.

Obtenlo como JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Cada transacción debería mostrar una comisión superior a 0, salvo las recompensas de minería. Si alguna muestra `"fee": "0"` y ningún memo, sus detalles no se descargaron. Zkool obtiene las transacciones completas una por una tras el escaneo, y un fallo detiene silenciosamente las restantes. Para listar las afectadas:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Si aparece algo, sincroniza de nuevo unos minutos después y vuelve a exportar.

Después aplánalo a CSV, una fila por transacción:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Interpretar la salida

| Campo | Significado |
|---|---|
| `value` | Cambio neto de la cuenta en ZEC, comisión incluida. Negativo para envíos. |
| `fee` | Comisión en ZEC. En pagos que recibiste, la pagó el remitente y no está en `value`. |
| `time` | Hora del bloque en UTC, sin marcador de zona horaria |
| `notes` | Lo que la cuenta recibió en esta transacción, incluido el cambio. Los memos enviados a ti están aquí. Las entradas transparentes no tienen dirección. |
| `spends` | Las propias notas de la cuenta que esta transacción consumió |
| `outputs` | Lo que envió la transacción: cada salida transparente, además de pagos blindados a otras direcciones con sus memos |
| `pool` | 0 transparente, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 externo (un pago entrante), 1 interno (cambio) |

La aplicación Zkool también tiene Exportar transacciones, memos y notas en el menú de cuenta, pero son volcados de tablas sin procesar: importes en zatoshis, marcas de tiempo Unix y memos en un archivo separado.

## Opción 2: zingo-cli

zingo-cli es la wallet de línea de comandos de Zingo. No hay descargas precompiladas, así que debes compilarla con Rust:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Necesitas `nym-proxy` incluso solo para sincronizar. zingo-cli 6 no se conectará a ningún servidor sin ello.

La primera ejecución crea una wallet de solo visualización, la sincroniza e imprime el historial:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` debe ser una ruta absoluta.
- `--viewkey` y `--birthday` solo se aplican cuando se crea la wallet. Omítelos después de eso.
- zingo-cli comienza sin conexión de forma predeterminada. `--server` selecciona el servidor y también cuenta como tu consentimiento para conectarte.
- La clave queda en el historial de tu shell, así que bórrala después.

Ejecuciones posteriores:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` lee lo que ya está sincronizado sin tocar la red.

- `transactions` proporciona una entrada por transacción: txid, hora (UTC), altura, tipo (`received`, `sent`, `shield` o `send-to-self`), valor, comisión y las notas implicadas.
- `value_transfers` proporciona una entrada por pago, por lo que un envío a dos personas son dos entradas, cada una con la dirección del destinatario y los memos.
- `messages` lista los memos como JSON.

Algunas cosas que debes saber sobre la salida:

- `transactions` y `value_transfers` imprimen texto plano que se parece un poco a JSON, pero no lo es.
- Los importes están en zatoshis (100.000.000 por 1 ZEC) y siempre son positivos. `kind` te indica la dirección. Para envíos, `value` es lo que fue a otras personas, sin la comisión.
- La comisión aparece como "not available" cuando una transacción gasta fondos transparentes que no eran tuyos. Solo se muestran memos de texto.
- Si la sincronización falla, el error va a la terminal, no al archivo, y zingo-cli aun así termina normalmente. Revisa la terminal antes de confiar en `transactions.txt`.

El [zingoHelper](https://github.com/dismad/zingoHelper) de dismad tiene un script `exportToJSON.sh` que convierte `transactions` a JSON. Fue escrito antes de zingo-cli 6, está configurado para testnet, marca algunas entradas salientes de Sapling y transparentes como marcadores de posición, y necesita herramientas GNU, por lo que no funcionará en macOS estándar. Trata su salida como un punto de partida y comprueba los totales.

## Lo que una clave de visualización no puede decirte

- **Precios.** Ninguna herramienta registra un precio de ZEC en el momento de cada transacción. Añade tú mismo los valores fiat.
- **Historial transparente, si la clave no lo incluye.** La parte transparente de una UFVK es opcional según [ZIP 316](https://zips.z.cash/zip-0316). Con zingo-cli, `$Z --offline parse_viewkey uview1...` muestra qué pools cubre una clave.
- **Quién te pagó.** Los pagos blindados no contienen la dirección del remitente. A menos que el remitente incluyera una en el memo, no está en ningún lugar.
- **Algunos detalles salientes.** La dirección de destino, el importe y el memo de los envíos blindados se recuperan descifrando con la clave. Sin embargo, una wallet puede construir una transacción de manera que eso no sea posible, aunque la mayoría no lo hacen.

## Otras herramientas

| Herramienta | Lo que obtienes |
|---|---|
| ZODL | CSV fiscal con fechas, importes, comisiones y una etiqueta. Solo el año calendario anterior; omite las transacciones de blindaje, sin txid, memo ni dirección. |
| aplicación Zkool | Exportaciones de tablas sin procesar desde el menú de cuenta |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Importa una UFVK con `importvk`. `listreceived` mediante RPC devuelve notas recibidas con txid y memo, pero no envíos ni comisiones. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` es detallado, pero está marcado como experimental, y Zallet solo importa claves de visualización Sapling, no UFVKs |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Importa una UFVK con `wallet init-fvk` y luego `wallet list-tx`. Su modo CSV no tiene txid ni dirección, y el proyecto dice que no se use en producción. |

## Relacionado

- [Claves de visualización](/zcash-tech/viewing-keys)
- [Recuperar fondos](/using-zcash/recovering-funds)
- [Tutorial de Zingolib y Zaino](/guides/zingolib-and-zaino-tutorial)
- [Foro: Exportar historial de transacciones a JSON/CSV desde UFVK/semilla](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Foro: Zkool y GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [README de zingo-cli](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
