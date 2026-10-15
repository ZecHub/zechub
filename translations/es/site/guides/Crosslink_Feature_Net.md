<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Únete a Crosslink Feature Net

## TL;DR

- Feature Net es la red pública de pruebas de Shielded Labs para [Crosslink](/zcash-tech/crosslink-protocol), la capa de finalidad propuesta que añade staking junto a la prueba de trabajo de Zcash.
- Funciona con una moneda de prueba, cTAZ. Nada de lo que hagas en ella mueve o pone en riesgo ZEC de mainnet.
- Una aplicación de escritorio es el nodo, el minero, la wallet y el finalizador. Por defecto mina cTAZ y tiene un botón de faucet.
- El staking, el unstaking y el retiro solo funcionan durante un "Staking Day", un día de cada tres. Si lo pierdes, esperas al siguiente.
- Para hacer staking, pegas la identidad de un finalizador y haces clic en una cantidad. Esta guía usa como ejemplo el finalizador de ZecHub.
- Dos llamadas RPC muestran tu situación: `wallet_staking_positions` y `get_tfl_recency_status`.

*Probado con Feature Net versión 14 en Windows 11 (versión 10.0.26200.9550), del 8 al 10 de octubre de 2026. El software es un prototipo y cambia con cada lanzamiento. Si lo que ves difiere de esta página, confía en tu propia ejecución y abre un PR, por favor.*

## Qué es Feature Net

Crosslink es una propuesta, no forma parte de Zcash hoy. Las preguntas frecuentes de Shielded Labs sobre [Crosslink](https://shieldedlabs.net/crosslink-faq/) dicen que "tendría que pasar por el proceso estándar de gobernanza de Zcash" antes de poder llegar a mainnet. La página del protocolo [Crosslink](/zcash-tech/crosslink-protocol) explica el diseño.

Para probar el diseño con usuarios reales, Shielded Labs ejecuta lo que denomina [redes de funcionalidades incentivadas](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "una serie de testnets incentivadas". Existen tres roles en la red, y la aplicación de escritorio puede desempeñarlos todos:

| Rol | Qué hace |
|---|---|
| Minero | Produce bloques de prueba de trabajo, como en Zcash hoy |
| Staker | Bloquea cTAZ en un bono de delegación y lo asigna a un finalizador |
| Finalizador | Vota para finalizar bloques. Su poder de voto es el stake delegado a él |

El repositorio que hay detrás comienza con una advertencia que vale la pena leer antes de instalar nada: "existe para demostrar ideas, no para demostrar ingeniería de producción" y es "código no preparado para producción" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Ejecútalo en una máquina donde eso sea aceptable.

### Qué cambió la versión 14

[La versión 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) salió el 1 de octubre de 2026. Su red comienza como prueba de trabajo simple y activa Crosslink en tres pasos ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), también mostrado en [ctaz.cash](https://ctaz.cash/v14)):

| Bloque | Qué sucede |
|---|---|
| 20,736 | Se abre el staking |
| 34,560 | La primera lista de finalizadores se toma de los stakes en cadena |
| 36,288 | Comienza la finalidad BFT, y con ella las recompensas de staking |

Las recompensas de staking comienzan en el último de esos bloques. Un bono creado antes no gana nada hasta entonces ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

El mismo lanzamiento redujo la lista activa a los 12 finalizadores con más stake ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) y, en palabras de sus notas de lanzamiento, les otorgó una comisión: "el 10% de todas las recompensas PoS de un bloque va a estas comisiones, mientras que el 90% se distribuye entre todos los bonos de staking".

### cTAZ y ZEC real

cTAZ ("TAZ de Crosslink") es la moneda de prueba de Feature Net. Haces staking de cTAZ, nunca de ZEC.

ZEC real entra solo al final. Shielded Labs ha [reservado 500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) para las redes de funcionalidades, y las [notas de lanzamiento](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) dicen que se paga "de forma prorrateada basándose únicamente en la cantidad de cTAZ que cada participante obtuvo mediante minería o staking". Dos consecuencias:

- **Las monedas del faucet no cuentan.** El cTAZ que recibiste, del faucet o de cualquier otra persona, no gana nada por estar en tu wallet. Solo cuentan las recompensas de bloque procedentes de minería y staking.
- **Los pagos se reclaman, no son automáticos.** Shielded Labs anuncia cada ronda en el [hilo del foro](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Para la ronda 2 pidió a los participantes que enviaran la viewing key de su wallet y una dirección de mainnet antes del 4 de octubre de 2026 ([publicación 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). La red en la que funciona la versión 14, a la que se une esta guía, fue anunciada como ronda 3 ([publicación 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Antes de empezar

- **Un ordenador que puedas dejar funcionando.** El lanzamiento tiene compilaciones para Windows, macOS, Ubuntu y Arch Linux. Esta guía se ejecutó en Windows, en un PC con un procesador Intel Core i5-8350U.
- **Un Staking Day.** Comprueba cuándo se abre el siguiente antes de planificar nada. El panel de [Staker Space](https://crosslink.staker.space/) hace la cuenta regresiva.
- **Nada más.** Sin ZEC, sin cuenta y sin registro.

## Paso 1: Descarga la aplicación y comprueba el archivo

1. Abre el [lanzamiento de la versión 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) y desplázate hasta **Assets**.
2. Descarga el archivo para tu sistema. En Windows es `zebrad_v14_win32.exe`.
3. Compara el SHA-256 del archivo con el resumen que GitHub muestra junto a ese activo.

En Windows, en PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

El resumen que GitHub muestra para ese archivo es `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. El hexadecimal no distingue mayúsculas de minúsculas, por lo que las letras mayúsculas de arriba están bien. Para dejar que la shell compare en vez de tus ojos:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Entiende qué valor tiene esta comprobación. El lanzamiento no tiene firma, así que un hash coincidente te indica que la descarga está completa y que es el archivo que GitHub está sirviendo. No te dice quién lo compiló. [Verificación de lanzamientos de Zcash](/guides/verifying-zcash-releases) explica la diferencia.

## Paso 2: Inicia el nodo y deja que se sincronice

Inicia la aplicación desde una terminal, para que sus mensajes de inicio permanezcan en pantalla. Usa una ventana normal de PowerShell, no una abierta con "Ejecutar como administrador": este software prototipo sin firma no necesita derechos de administrador.

```powershell
.\zebrad_v14_win32.exe
```

Se abre una ventana titulada "Zcash Crosslink Visualizer". La wallet está a la izquierda, con las pestañas **Your Wallet** y **Faucet Wallet**, la cadena se dibuja en el centro y los finalizadores aparecen listados a la derecha. La terminal sigue imprimiendo el registro del nodo. Deja ambas abiertas mientras uses la red.

Las notas de lanzamiento enlazan un [vídeo de la instalación de Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

La aplicación guarda sus datos en una carpeta de caché: `%LOCALAPPDATA%\zebra` en Windows, `~/.cache/zebra` en Linux y `~/Library/Caches/zebra` en macOS, según las notas de lanzamiento.

**Guarda el secreto para ti.** Esa carpeta contiene un archivo llamado `secret.seed`. La aplicación lo crea en el primer inicio ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) y deriva de él tu wallet y tu identidad de finalizador ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). La aplicación también tiene un botón **Copy Seed** que coloca el mismo secreto en tu portapapeles. Quien tenga cualquiera de los dos controla tu wallet. Nunca los pegues en un chat, una publicación de foro o una captura de pantalla.

### Cómo saber si estás sincronizado

Las notas de lanzamiento dicen que "no hay supervisión integrada de lo cerca que estás sincronizado con la punta de la red". La versión 14 sí tiene algo: el menú desplegable **Network Info** en la parte superior de la ventana tiene filas para PoW Height, Wallet Sync y Blocks Behind Known PoW ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Compara tu altura con la de [Staker Space](https://crosslink.staker.space/) o [ctaz.cash](https://ctaz.cash/).

El nodo también responde por RPC:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

El puerto RPC `127.0.0.1:8232` está abierto por defecto en esta compilación y no necesita contraseña ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Escucha solo en tu propia máquina, y cualquier cosa que se ejecute en esa máquina puede llamarlo.

En esta ejecución, la primera sincronización, desde el bloque 0 hasta la punta alrededor del bloque 28,400, tardó aproximadamente 50 minutos.

**Tras reiniciar, tu saldo muestra cero durante un rato.** Cada vez que se inicia la aplicación, reconstruye la wallet desde `secret.seed` y vuelve a escanear la cadena desde el bloque 0 ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Hasta que el escaneo alcanza tus transacciones, tu saldo y tu stake aparecen como 0. En esta ejecución volvieron unos 15 minutos después de un reinicio. La wallet del faucet se vuelve a escanear de la misma manera ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), y durante el escaneo la pestaña Faucet Wallet mostró un saldo muy grande. Ignora ambos hasta que Wallet Sync se complete.

## Paso 3: Consigue algo de cTAZ

### Mínalo

Según las notas de lanzamiento, la aplicación inicia minería por CPU hacia tu propia wallet una vez sincronizada. No tienes que activar nada. Las monedas minadas van a una dirección transparente de tu propia wallet ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Que encuentre un bloque es otro asunto. Las notas advierten que "puedes ser superado por otros que minan más rápido, por lo que no hay garantía de éxito". Por defecto, el minero integrado usa un solo hilo de CPU ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Para usar más hilos, establece una variable de entorno en la misma ventana de PowerShell antes de iniciar la aplicación ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Esta ejecución usó cuatro:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

La variable dura solo mientras dure esa ventana. Con ella configurada, el contador de procesador de Windows mostró que el nodo usaba el equivalente a entre cuatro y cinco procesadores, como porcentaje de un procesador lógico:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

El resultado: un Core i5-8350U de Intel minando con cuatro hilos, desde temprano el 8 de octubre hasta la tarde del 9 de octubre, no encontró ningún bloque.

### O usa el faucet

La aplicación tiene un botón **Receive cTAZ** en la parte inferior derecha. En el código fuente de la versión 14, una pulsación envía 0.5 cTAZ desde la wallet del faucet a la tuya ([cantidad](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [envío](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). El faucet es una sola wallet que lleva cada copia de la aplicación ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), y la pestaña **Faucet Wallet** muestra su saldo.

El botón está desactivado a menos que el faucet tenga más de 5.01 cTAZ en monedas blindadas ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). La pestaña también cuenta las monedas minadas por el faucet, y estas solo están blindadas en lotes de exactamente 10 cTAZ más una comisión ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), por lo que la pestaña puede mostrar mucho mientras el botón permanece gris. En esta ejecución permaneció gris el 8 y 9 de octubre, con "The faucet is mining more funds." al pasar el cursor, mientras la pestaña mostraba 14.74695 cTAZ.

**Cuando el botón está gris, pregunta a tu propio nodo.** El nodo tiene un método de solicitud al faucet, `requestfaucetdonation` ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), que no aplica la regla de 5.01 cTAZ del botón. Coloca tu propia dirección en lugar de `YOUR_ADDRESS` (es el campo `address` de `wallet_spendable_funds`, más abajo):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

Esa respuesta significa que la solicitud quedó en cola, no que fue enviada. En esta ejecución los 0.5 cTAZ del faucet se minaron en el bloque 33,306 y se podían gastar en el bloque 33,322. Solicítalo una vez: el faucet es compartido, y una segunda solicitud para la misma dirección se rechaza mientras la primera está pendiente ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### O pídeselo a otro participante

Cualquiera en la red puede enviarte cTAZ con el botón **Send** de la aplicación. En esta ejecución otro participante envió 31 cTAZ. Llegaron como "Received" con la nota "send from user wallet", que es la nota que adjunta el propio Send de la aplicación ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Pregunta en el [hilo del foro](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) y proporciona solo tu dirección.

Las monedas del faucet y los regalos bastan para aprender staking. No cuentan para las recompensas de ZEC.

### Comprueba qué puedes gastar

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Esta fue la respuesta una vez que llegaron los 0.5 cTAZ del faucet, con la dirección acortada:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

Las cantidades están en zatoshis: 100,000,000 forman un cTAZ. Las monedas blindadas necesitan 3 confirmaciones antes de contar como gastables ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Las monedas del faucet y de otros participantes llegan a `spendable_zats`. Las monedas minadas son transparentes, por lo que llegan a `unshielded_zats` ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Un bloque después del segundo stake en esta ejecución, el resto del saldo apareció bajo `pending_zats`. Unos pocos bloques después volvió a ser gastable.

## Paso 4: Haz staking con un finalizador

### Espera a un Staking Day

El staking, el unstaking y el retiro solo se aceptan mientras

```text
block height mod 10,368 < 3,456
```

lo que es una ventana de 3,456 bloques al inicio de cada 10,368. Con el objetivo de la red de 25 segundos por bloque, es un día de cada tres ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Las primeras ventanas de la versión 14 se abren en los bloques 20,736, 31,104, 41,472 y 51,840.

Según las notas de lanzamiento, la aplicación anuncia el inicio y el final de cada Staking Day. En esta ejecución su lista de bloques mostró una línea roja "* STAKING DAY END *" entre los bloques 34,559 y 34,560.

**Las notas de lanzamiento dicen dos cosas.** Su lista de cambios indica "~1 día para Staking Day y ~3 días para el ciclo de staking", lo que coincide con el código. Más abajo, una sección heredada de la temporada 1 todavía dice que un Staking Day empieza cada 150 bloques y dura 70. Guíate por lo primero. La línea de final anterior se encuentra donde la primera regla cierra la ventana (34,560 mod 10,368 = 3,456); bajo la segunda regla, el bloque 34,560 caería dentro de una ventana.

### Elige un finalizador

Un finalizador se identifica por su identidad, una cadena que comienza con `zfinv1`. ZecHub publica la identidad del finalizador que ejecuta en [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Copia una identidad de una fuente en la que confíes. Según las notas de lanzamiento, la aplicación también lista los finalizadores en su panel derecho, con un icono para copiar a la izquierda de cada uno.

Después de hacer staking, el historial de la wallet y el RPC identifican al finalizador por una clave hexadecimal en lugar de por su identidad. Para el finalizador de ZecHub, esa clave es `2941ef23...266aae8f`.

Elige un finalizador en el que confíes. El diseño no tiene slashing automático, pero permite "un hard fork coordinado por usuarios que quema todo el stake delegado a un finalizador identificado" ([Crosslink libro, resumen del diseño](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

La elección también decide quién vota. Cada bono activo gana su parte de la recompensa de staking. Si su finalizador está entre los 12 de la lista, una décima parte de esa porción va al finalizador como comisión. Un bono asignado a un finalizador fuera de los 12 conserva toda su parte, pero ese finalizador no vota ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Haz staking

1. Copia la identidad del finalizador.
2. En la pestaña **Your Wallet**, pulsa **Stake**.
3. Pulsa **Paste Identity**. La línea sobre el botón cambia a los primeros y últimos caracteres de la identidad, `[zfinv1j6..YWyzp4YN]` para la de ZecHub. Compruébala antes de continuar.
4. Haz clic en una cantidad. Las cantidades vienen en pasos fijos, la menor es 0.01 cTAZ, y solo se iluminan las cantidades que cubre tu saldo. Con 0.5 cTAZ, +0.01 cTAZ y +0.1 cTAZ estaban iluminadas.

**Nada te pide confirmar, y parece que no sucede nada.** En esta ejecución, en palabras del probador: "Hice clic una vez y no pasó nada, simplemente se volvió gris y se iluminó de nuevo." El stake se había realizado. El historial de la wallet mostraba "Staked @ 33334 to 2941ef23..266aae8f", la comisión era 0.00015 cTAZ y la wallet mostraba 0.010 cTAZ Staked. Un segundo stake unos minutos más tarde creó un segundo bono, en el bloque 33,348.

Cada stake crea su propio bono de delegación. Las cantidades fijas y el Staking Day existen por privacidad: hacen que sea más difícil distinguir el stake de una persona del de otra.

## Paso 5: Comprueba tu posición

### Tus bonos

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Esta fue la respuesta en el bloque 36,490, dos días después de hacer staking:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

La llamada no toma parámetros. Devuelve tus bonos activos, agrupados bajo la clave del finalizador que cada uno respalda, y los bonos que terminaron de hacer unstaking y pueden retirarse. Cada bono muestra la cantidad en staking (`initial_val`), su valor actual (`latest_val`), y la transacción y altura de bloque que lo crearon. Las recompensas se añaden al propio bono: para el bloque 36,490 cada bono de 1,000,000 zatoshis había crecido a 1,003,451.

**La ventana Edit Stake muestra cada bono diez veces más grande.** En esta ejecución cada bono de 0.01 cTAZ se leía como 0.100 cTAZ en su propia fila, y 0.1003536 cTAZ una vez que empezaron las recompensas, mientras que los totales sobre las filas (0.020 cTAZ, más tarde 0.02007 cTAZ) coincidían con el RPC. Guíate por los totales y el RPC.

La misma ventana mostraba un triángulo de advertencia junto al finalizador, antes y después de que comenzara la finalidad. En el código fuente, el triángulo significa que tu aplicación no considera a ese finalizador en línea, y uno en línea muestra en su lugar un icono de Wi-Fi ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Aun así, los bonos ganaron recompensas.

### Los finalizadores

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Según las notas de lanzamiento, esto informa de dónde está tu nodo en el proceso de votación y, para cada finalizador, cuándo oyó tu nodo hablar de él por última vez y cómo ha estado votando.

Antes del bloque 36,288 cada campo es cero y la lista está vacía. Esta fue la respuesta en el bloque 33,354:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

Después de que empieza la finalidad, la lista contiene los finalizadores de la lista activa. En el bloque 36,490 contenía 12, incluido el de ZecHub `2941ef23...`, lo que coincide con el límite de 12. Este es el comienzo de esa respuesta, cortada después de la primera entrada:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

Unos minutos después, el panel derecho de la aplicación mostró "Finalizers (23)".

### En Linux y macOS

El código [fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) ofrece la llamada en formato `curl`. Cambia el nombre del método para las otras llamadas. Esta forma no se ejecutó para esta guía:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

En Linux, las notas de lanzamiento dicen que probablemente necesitas tener instalado `xclip` antes de que copiar y pegar funcione en la aplicación.

### Un nombre RPC que vigilar

Las notas de lanzamiento de la versión 14 describen una llamada de staking denominada `wallet_staking_action` que toma un objeto. El código fuente de la versión 14 no tiene ningún método con ese nombre, y en esta ejecución el nodo respondió:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

El método de staking que registra es [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), que toma una cadena que contiene la solicitud como JSON, con el finalizador indicado por su identidad `zfinv1` ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). No se probó para esta guía.

## Unstake y retiro

Un bono no puede deshacerse el día en que se crea. Tarda tres Staking Days de principio a fin: haz staking en uno, unstaking en otro posterior y retíralo en un tercero. Las notas de lanzamiento añaden que un bono no puede realizar dos acciones de staking en el mismo Staking Day.

*No se ejecutó para esta guía. Según las notas de lanzamiento de la versión 14:* para hacer unstaking, pulsa **Edit Stake**, elige un bono de la lista Staked Bonds y haz clic en el icono de eslabón de cadena. Para retirar en un Staking Day posterior, pulsa **Edit Stake**, elige un bono de la lista Withdrawable Bonds y haz clic en el icono de dinero. Mover un bono a otro finalizador, lo que las notas llaman retargeting, está permitido en cualquier momento.

## Dónde observar la red

La pestaña [Crosslink de ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) reúne las herramientas en un solo lugar, bajo un aviso que dice "El staking en esta red no mueve ZEC":

- Alojadas, sin necesidad de nodo: [Staker Space](https://crosslink.staker.space/), un "panel en directo para la testnet cTAZ actual" con la altura, mineros, tasa de soluciones, cuenta regresiva de Staking Day y finalidad, y [ctaz.cash](https://ctaz.cash/), con producción minera, la lista de finalizadores, pares y reclamaciones de nombres de direcciones de staking.
- En tu propia máquina: `zcash-explorer`, cuya página `/live/crosslink` muestra activación, retraso de finalidad, la lista y posiciones de staking, y `crosslink_indexer`, un índice SQLite de un nodo Crosslink.

## Errores comunes

**Planificar según el reloj en lugar de la altura de bloque.** Los Staking Days se cuentan en bloques. Observa la cuenta regresiva de un panel, no el calendario.

**Hacer staking en los últimos minutos de la ventana.** La regla se comprueba respecto al bloque que incluye tu transacción ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), por lo que el stake debe minarse antes de que se cierre la ventana, no solo enviarse.

**Esperar minar tu stake.** Un minero de CPU de cuatro hilos en un Core i5-8350U de Intel no encontró ningún bloque entre el 8 y el 9 de octubre. Consigue tu primer cTAZ del faucet o de otro participante.

**Hacer clic otra vez porque parecía que no había sucedido nada.** Cada clic en una cantidad es un bono nuevo. Comprueba primero el historial de la wallet o `wallet_staking_positions`.

**Entrar en pánico después de un reinicio.** Tu saldo y stake aparecen como cero hasta que la wallet termina de volver a escanear. Espera a que termine Wallet Sync.

**Tratar cTAZ como dinero de juguete, o el secreto como algo inofensivo.** cTAZ es una moneda de prueba, pero el cTAZ que ganas decide tu parte de ZEC real. Protege `secret.seed` como protegerías una wallet.

**Leer instrucciones antiguas.** Las notas de lanzamiento conservan texto de temporadas anteriores junto a las nuevas reglas. Cuando no coincidan con lo que hace tu nodo, tu nodo tiene razón.

## Páginas relacionadas

- [Crosslink Protocolo](/zcash-tech/crosslink-protocol) - el diseño que prueba esta red
- [Shielded Labs](/zcash-organizations/shielded-labs) - el equipo detrás de Crosslink
- [Verificación de lanzamientos de Zcash](/guides/verifying-zcash-releases) - qué prueba y qué no prueba una suma de verificación
- [Zebra Nodo completo](/zcash-tech/zebra-full-node) - el nodo sobre el que está construida la aplicación Feature Net
- [Zcash Testnet](/using-zcash/testnet) - la red de pruebas ordinaria de Zcash, que es una red distinta

## Fuentes

- [Notas de lanzamiento de la versión 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 de octubre de 2026
- [Crosslink: Redes de funcionalidades incentivadas](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 de abril de 2026
- [Crosslink: Feature Net incentivada](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), foro comunitario de Zcash
- [Preguntas frecuentes de Crosslink](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [El libro de Crosslink](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Los pasos de esta página se ejecutaron con Feature Net versión 14 en Windows 11 (versión 10.0.26200.9550), del 8 al 10 de octubre de 2026. Una afirmación que cita las notas de lanzamiento o el código fuente procede de ellos. Todo lo marcado como "no se ejecutó" no se probó.*
