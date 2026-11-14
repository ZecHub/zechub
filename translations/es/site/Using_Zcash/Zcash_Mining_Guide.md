<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zcash_Mining_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Guía de Minado [Mining] de Zcash: Unirse a un Pool de Minado con Hardware Personal

> Apunta tu GPU o ASIC a un pool, comparte el trabajo con otros mineros [miners] y recibe pagos constantes de ZEC en lugar de esperar años para encontrar un bloque [block] en solitario.

## TL;DR

* Zcash usa prueba de trabajo [proof of work] Equihash. Los ASIC dominan la red, por lo que las GPU sirven principalmente para aficionados y pruebas.
* El minado [mining] en solitario rara vez encuentra un bloque [block] con equipos pequeños. Un pool combina el hashrate y te paga una parte de cada bloque que encuentra.
* Necesitas tres cosas: una dirección [address] de billetera [wallet] Zcash para los pagos, hardware de minado y software de minado (o el panel [dashboard] integrado del ASIC).
* Los pools se diferencian por la comisión [fee] (aproximadamente 0-2 %), el método de pago (PPLNS, PPS+), el pago mínimo y la ubicación del servidor.
* Comprueba primero la rentabilidad: el precio de la electricidad, el coste del hardware y el precio de ZEC deciden si minar sale rentable o no.
* Ruta avanzada: ejecuta tu propio nodo [node] Zebra y mina contra su RPC `getblocktemplate`.

## Explicación principal

El minado [mining] es la forma en que se crean nuevos bloques [blocks] de Zcash. Los mineros [miners] compiten por resolver un rompecabezas de Equihash; la primera solución válida añade el siguiente bloque y obtiene la recompensa de bloque. Cuanto más hashrate aportes, con más frecuencia ganarás, pero frente a la red actual, un solo equipo doméstico casi nunca ganaría por sí solo.

Un pool de minado (mining pool) resuelve eso. El pool entrega a cada minero fragmentos de trabajo más pequeños llamados shares. Cada share aceptado demuestra que aportaste hashrate. Cuando cualquier miembro del pool encuentra un bloque, la recompensa se reparte según los shares, y recibes el pago automáticamente cuando tu saldo supera el mínimo del pool.

La configuración consta de cinco partes, que se explican paso a paso a continuación:

1. Una dirección de billetera para recibir los pagos.
2. Hardware: GPUs en un PC, o un ASIC Equihash.
3. Una cuenta en el pool (o simplemente tu dirección, en los pools sin registro).
4. Software de minado configurado con el servidor stratum del pool, con `YOUR_ADDRESS.WORKER_NAME` como nombre de usuario.
5. Monitoreo: shares aceptados, hashrate, temperatura y saldo pendiente de pago.

## Introducción

Zcash (ZEC) es una criptomoneda centrada en la privacidad [privacy] que utiliza el algoritmo de prueba de trabajo [proof-of-work] Equihash para el minado. Minar Zcash implica utilizar potencia computacional para resolver problemas matemáticos complejos, validar transacciones [transactions] y proteger la red a cambio de recompensas de ZEC. Debido a la alta dificultad de la red, no se recomienda el minado en solitario para la mayoría de los usuarios. Unirse a un pool de minado es la mejor forma de obtener recompensas consistentes al combinar tu potencia de hash con la de otros.

Esta guía se centra en minar Zcash utilizando hardware personal (p. ej., una PC doméstica con GPU o ASIC de nivel básico). Ten en cuenta que, aunque las GPU todavía pueden minar Zcash, los ASIC son mucho más eficientes y rentables en 2026 debido a la dificultad de la red. Consulta siempre la rentabilidad actual mediante herramientas como WhatToMine.com, ya que factores como los costos de electricidad, los precios del hardware y el valor de ZEC afectan la viabilidad. El minado podría no ser rentable para todos; investiga las regulaciones locales y las tarifas de energía (procura que sean inferiores a $0,08/kWh).


## Requisitos

### Hardware
- **Minado con GPU (Configuración Personal Recomendada para Principiantes):**
  - GPU NVIDIA o AMD con al menos 4 GB de VRAM (p. ej., NVIDIA GTX 1070, RTX 3060; AMD RX 580 o superior).
  - Una placa base compatible, una PSU suficiente (al menos 750 W para varias GPU) y buena refrigeración para evitar el sobrecalentamiento.
  - Los rigs con múltiples GPU son habituales para lograr mejores tasas de hash (p. ej., 6 GPU pueden alcanzar 1-2 kSol/s).
- **Minado con ASIC (Más Eficiente, pero de Mayor Costo):**
  - ASIC compatibles con Equihash, como Bitmain Antminer Z15 (420 kSol/s) o Innosilicon A9 (50 kSol/s).
  - Estos son más ruidosos, calientes y consumen más energía (p. ej., 1500 W o más); son adecuados para espacios dedicados. Compra a fuentes fiables como Bitmain.com o revendedores (Blockware Mining).
- **General:** Internet estable y una computadora para la configuración/supervisión. Los ASIC dominan la red (~13 GSol/s de hashrate total en 2026), lo que hace que el minado con GPU sea menos competitivo, aunque todavía posible para aficionados.

### Software
- **Sistema Operativo:** Windows 10/11, Linux (se recomienda Ubuntu por su estabilidad).
- **Software de Minado:**
  - Para GPU: lolMiner (compatible con AMD/NVIDIA), GMiner o miniZ (centrado en NVIDIA). Descarga desde repositorios oficiales de GitHub (p. ej., github.com/Lolliedieb/lolMiner-releases).
  - Para ASIC: Usa el firmware/panel [dashboard] integrado del fabricante (p. ej., la interfaz web de Bitmain).
- **Billetera [Wallet]:** Una billetera de Zcash para recibir pagos. Recomendadas:
  - Blindada [Shielded] (privada): ZODL Wallet, Zingo (móvil/escritorio), Zkool (móvil/escritorio).
  - Transparente [Transparent] (más sencilla, pero menos privada): Edge Wallet, Zecwallet Lite.
  - Descarga desde [wallets](https://zechub.wiki/wallets). Genera una dirección [address] blindada (que comience con «zs») para la privacidad si el pool la admite.

### Otros
- Electricidad: Calcula los costos. Las GPU utilizan 150-300 W por tarjeta; los ASIC, más de 1000 W.
- Antivirus: Desactívalo durante la configuración, ya que puede marcar a los mineros como amenazas.

## Guía Paso a Paso para Unirse a un Pool de Minado

### Paso 1: Configura Tu Billetera de Zcash
1. Descarga e instala una billetera desde el sitio web oficial de Zcash [wallets](https://zechub.wiki/wallets).
2. Crea una nueva billetera y realiza una copia de seguridad segura de tu frase semilla [seed phrase].
3. Genera una dirección de recepción (preferiblemente blindada para la privacidad). Anótala, p. ej., `zs1exampleaddress...`.
4. Si utilizas una dirección transparente (que comienza con «t»), será más sencillo, pero ofrecerá menos privacidad.

### Paso 2: Prepara Tu Hardware
- Para GPU:
  1. Instala las GPU en tu PC y actualiza los controladores (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Haz overclock si tienes experiencia (utiliza MSI Afterburner para lograr estabilidad; procura +100-200 de reloj central, -500 de memoria para eficiencia).
- Para ASIC:
  1. Conecta el ASIC a la alimentación y Ethernet.
  2. Encuentra su dirección IP utilizando una herramienta como Advanced IP Scanner o la aplicación del fabricante.
  3. Accede al panel web (p. ej., introduce la IP en el navegador; inicio de sesión predeterminado: root/root para Bitmain).

**Advertencia:** Garantiza una ventilación adecuada; el minado genera calor. Empieza con poco para hacer pruebas.

### Paso 3: Elige y Únete a un Pool de Minado
Los pools de minado distribuyen el trabajo y comparten las recompensas según el hashrate que aportes. Selecciona según las tarifas [fees] (0-2 %), el mínimo de pago (0,01-0,1 ZEC), la ubicación (ping bajo) y la fiabilidad.

**Pools Recomendados (Según Hashrate, Tarifas y Reseñas):**
- **2Miners (zec.2miners.com)**: Tarifa del 1 %, pago PPLNS, compatible con GPU/ASIC/NiceHash. Hashrate alto (~1,17 GSol/s), servidores fiables.
- **F2Pool (zec.f2pool.com)**: Tarifa del 2 %, pago PPS+, soporte multimoneda. Pool grande (~2,57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: Tarifa del 2 % (PPS+), panel fácil de usar, servidores globales.
- **AntPool (zec.antpool.com)**: Tarifa del 1 %, de Bitmain, bueno para ASIC (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Pool de minado profesional de Zcash de Foundry Digital. Utiliza pagos PPLNS, ofrece seguimiento transparente de recompensas y soporte de nivel empresarial. Es más adecuado para mineros ASIC institucionales y de gran escala; requiere verificación de cuenta.
- **Sovright (mining.sovright.com)**: Un pool de Zcash construido sobre Stratum V2, actualmente en ejecución como testnet pública. Todavía no hay pagos de ZEC en vivo, así que considéralo una forma de probar tu configuración en lugar de una fuente de ingresos. Consulta la sección dedicada a continuación para más detalles.
- Otros: Kryptex Pool, Luxor (consulta poolwatch.io/coin/zcash para estadísticas en tiempo real).

1. Visita el sitio web del pool y crea una cuenta (correo electrónico o sin registro para algunos, como 2Miners).
2. Añade la dirección de tu billetera de Zcash en la configuración para los pagos.
3. Anota el servidor stratum del pool (p. ej., zec.2miners.com:1010) y el puerto.

### Paso 4: Instala y Configura el Software de Minado
- Para GPU (Ejemplo: lolMiner en Windows/Linux):
  1. Descarga lolMiner desde GitHub (la versión más reciente, p. ej., 1.88).
  2. Extrae el contenido en una carpeta.
  3. Crea un archivo por lotes (start.bat) con la configuración:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Sustituye `YOUR_WALLET_ADDRESS` por tu dirección de ZEC.
     - `WORKER_NAME`: Un nombre para tu rig (p. ej., Rig1).
     - Para servidores de la UE: eu.zec.2miners.com:1010.
  4. Ejecuta el archivo por lotes. Se conectará al pool y comenzará a minar.
- Para ASIC (Ejemplo: Bitmain Antminer):
  1. Inicia sesión en el panel web.
  2. Ve a Configuración del Minero.
  3. Añade los detalles del pool:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Nombre de usuario: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Contraseña: x (o en blanco).
  4. Guarda y reinicia el minero.
- Para otro software (p. ej., GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Prueba:** Ejecuta durante 10-15 minutos; revisa la consola para ver las participaciones aceptadas y el hashrate.

### Paso 5: Comienza a Minar y Supervisa
1. Inicia el minero: se conectará al pool y comenzará a enviar participaciones.
2. Supervisa mediante:
   - Panel del pool: Introduce la dirección de tu billetera para ver el hashrate, el saldo no pagado y las estadísticas.
   - Consola del software: Vigila los errores y la temperatura (mantén menos de 80 grados C).
   - Herramientas [tools]: Usa HiveOS o SimpleMining OS para la gestión remota de rigs.
3. Pagos: La mayoría de los pools pagan automáticamente cuando alcanzas el mínimo (p. ej., 0,05 ZEC). Consulta las reglas del pool.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


### Supervisión del pool Zcash de Foundry

Para los usuarios del pool Foundry Zcash:

- Supervisa el rendimiento del minero a través del panel del pool de Foundry.
- Comprueba:
  - Workers activos
  - Hashrate reportado
  - Shares aceptados
  - Recompensas estimadas
  - Estado de los pagos

Dado que Foundry utiliza un modelo de recompensas PPLNS, las recompensas de minado dependen de las participaciones (shares) aportadas durante la ventana de recompensas del pool y no solo del hashrate instantáneo.

Prácticas de monitoreo recomendadas:
- Compara el hashrate del panel del ASIC con el hashrate reportado por Foundry.
- Investiga los shares rechazados, los shares obsoletos (stale shares) o la inestabilidad de la conexión.
- Mantén una conectividad de red estable, ya que el tiempo de inactividad reduce los shares enviados y las posibles recompensas.

## Sovright: Pool de Testnet y Red de Retransmisión

Sovright (sovright.com) opera un pool de minado Stratum V2 y una red independiente de retransmisión de bloques. Cumplen tareas diferentes, por lo que se tratan por separado a continuación.

### Pool de Minado (mining.sovright.com)

El pool de Sovright se ejecuta en una testnet pública de Zcash (NU6, Stratum V2), no en mainnet. La testnet no paga ZEC reales. Úsala para probar la configuración de tu minero, no para obtener ganancias.

- No se requiere cuenta para empezar. Dirige un minero Equihash de CPU o ASIC al pool y tus participaciones aparecerán en un panel en vivo.
- Sovright también publica un proxy Stratum V2 de código abierto para mineros que desean elegir sus propias plantillas de bloque en lugar de limitarse a aceptar los trabajos del pool:

  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Apunta tu minero al proxy en lugar de apuntarlo directamente al pool:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  usando un nombre de trabajador [worker] como `yourname.rig1`.
- La página de transparencia de Sovright declara una política de «incluir todo» para las transacciones blindadas, a diferencia de algunos pools que las filtran. Cada bloque recibe una atestación firmada, de modo que la política se puede verificar de forma independiente.
- Crea una cuenta en mining.sovright.com (inicio de sesión con Google o correo electrónico) para seguir tus propios trabajadores en lugar de los datos de ejemplo del panel.

### Red de Retransmisión (relay.sovright.com)

Sovright opera por separado una red pública de retransmisión de bloques en la mainnet de Zcash. Cuando un pool encuentra un bloque, la rapidez con que ese bloque llega al resto de la red determina con qué frecuencia queda huérfano, lo que significa que pierde la carrera de propagación y se pierde la recompensa correspondiente. La retransmisión reenvía bloques por cuatro regiones mediante retransmisión de bloques compactos con corrección de errores hacia adelante.

El panel público muestra el efecto en vivo: las regiones conectadas a la retransmisión reciben bloques nuevos en mucho menos de la mitad del tiempo que toma el gossip simple entre pares, y el panel realiza el seguimiento de la tasa de bloques huérfanos de la red en vivo.

Esta es infraestructura para operadores de pools, no para mineros individuales. El repositorio de código abierto de Sovright `mining-infra` documenta una puerta de enlace de retransmisión de `submitblock` para distribuir los bloques encontrados en la malla más rápido que el P2P nativo. Para conectarte, contacta directamente con Sovright (support@sovright.com) para obtener direcciones de pares de retransmisión y una clave de autenticación.


## Minado contra tu propio nodo de Zebra

Todo lo anterior dirige tu minero al pool de otra persona. La otra ruta consiste en ejecutar un nodo tú mismo y hacer que tu software de minado le solicite trabajo. Dado que zcashd se detuvo el 18 de julio de 2026, eso significa [Zebra](/zcash-tech/zebra-full-node), el nodo que cubre esta sección.

La función de Zebra es reducida y específica: construye plantillas de bloques y acepta bloques resueltos a través de su interfaz RPC. El hash lo realiza el software de minado, y compartir recompensas entre varios mineros es tarea del software de pool. Que el minado en solitario encuentre alguna vez un bloque depende de tu participación en la tasa de hash de la red, lo cual esta sección no intenta estimar. Por eso la introducción de esta página no recomienda el minado en solitario para la mayoría de los usuarios.

Los pasos siguen dos páginas del Libro de Zebra, [Minado Zcash con Zebra](https://zebra.zfnd.org/user/mining.html) y [Minado con Zebra en Docker](https://zebra.zfnd.org/user/mining-docker.html), tal como estaban el 8 de octubre de 2026. Los nombres de las claves y los valores predeterminados cambian entre versiones, así que consulta el Libro antes de depender de uno.

### Configura la dirección que recibe la recompensa

Crea un archivo de configuración con los ajustes predeterminados y luego edítalo:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Se requiere una dirección de minero ([Book: Dirección del minero](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra acepta una dirección transparente P2PKH o P2SH, una dirección de Sapling o una Dirección Unificada. Para una Dirección Unificada con más de un receptor, el Libro indica que Zebra paga a un único receptor, «prefiriendo Orchard, después Sapling y luego transparente».

Dos claves opcionales van en la misma sección de `[mining]`:

| Clave | Qué hace | Límite |
|---|---|---|
| `extra_coinbase_data` | Añade una etiqueta pública, como el nombre de un pool, a la entrada coinbase de cada bloque que mines, después del marcador propio de Zebra ([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 bytes. Por encima de ese límite, «Zebra se niega a iniciar» |
| `miner_memo` | Adjunta un memo blindado a la salida de recompensa. A diferencia de `extra_coinbase_data`, no es público: solo alguien con una clave de visualización [viewing key] para la dirección receptora puede leerlo ([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 bytes. Solo funciona cuando la recompensa va a un receptor blindado. Con una dirección transparente, «silenciosamente no tiene efecto» |

### Abre el puerto RPC

El software de minado se comunica con Zebra mediante JSON-RPC, que permanece desactivado hasta que le indiques una dirección en la que escuchar ([Book: Sección RPC](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 es el puerto RPC estándar en Mainnet. `127.0.0.1` mantiene el puerto accesible solo desde la misma máquina.

Desde Zebra 2.0.0, una cookie protege el puerto RPC, un método similar al que utilizaba zcashd. Zebra escribe la cookie cuando se inicia el punto final RPC y la elimina al apagarse. De forma predeterminada, el archivo se encuentra en el directorio de caché de Zebra, por ejemplo `/home/user/.cache/zebra/.cookie` en Linux, y contiene una línea:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` mueve el archivo. `rpc.enable_cookie_auth = false` desactiva la comprobación y, con ella, la única autenticación que tiene el puerto RPC: cualquier cosa que pueda alcanzar el puerto podrá entonces llamarlo.

### Inicia Zebra y deja que se sincronice

```bash
zebrad
```

Zebra lee la configuración desde la ubicación predeterminada. Pasa `-c /path/to/zebrad.toml` para utilizar otro archivo. Espera a que finalice la sincronización. El registro muestra `sync_percent=100.000%` cuando lo ha hecho ([Book: Ejecutar zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Nodo Completo](/zcash-tech/zebra-full-node) cubre el hardware y el espacio en disco.

### Compruébalo con getblocktemplate

`getblocktemplate` es la llamada que realiza el software de minado para obtener trabajo, así que también es la prueba más rápida ([Book: Probar la configuración](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Sustituye el contenido de tu archivo cookie en lugar de `__cookie__:PASSWORD`:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Una configuración funcional devuelve un objeto `result` con los campos que necesita un minero, entre ellos `previousblockhash`, `coinbasetxn`, `target` y `height`. Si configuraste `extra_coinbase_data`, el Libro explica cómo encontrar tu etiqueta en `coinbasetxn.data`.

### Dirige tu software de minado hacia él

Proporciona a tu software de minado o de pool el punto final RPC, `127.0.0.1:8232`, y el nombre de usuario y la contraseña de la cookie. El Libro dice que Zebra «admite los métodos RPC necesarios para ejecutar la mayoría del software de pool de minado» ([Book: Ejecutar un pool de minado](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Dos notas del Libro antes de elegir software:

- **s-nomp es solo para pruebas.** El Libro califica su configuración de s-nomp como «experimental» y afirma que s-nomp «no es compatible con NU5, por lo que algunas funciones de minado están deshabilitadas». Su guía de [Testnet](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) añade que s-nomp «no se ha actualizado oficialmente para NU5 ni actualizaciones de red posteriores» y dirige a los mineros de producción al software de pool compatible con las actualizaciones actuales.
- **Zebra incluye una pila lista para usar.** El repositorio de Zebra tiene una configuración Compose de Docker en [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) que inicia Zebra junto con un pool de minado y, si lo solicitas, un minero de CPU. El pool incluido es s-nomp y se inicia en Testnet salvo que lo cambies, así que considéralo una forma de aprender las partes móviles.

### La ruta de Docker

La ruta más corta del Libro es la imagen `zfnd/zebra` Docker, con la dirección y el puerto RPC pasados como variables de entorno ([Book: Minado con Zebra en Docker](https://zebra.zfnd.org/user/mining-docker.html)). El comando siguiente es el del Libro con un cambio: publica el puerto RPC solo en la dirección de loopback del host, por lo que otras máquinas no pueden alcanzarlo.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Esto inicia un nodo Mainnet, publica el puerto P2P (8233) en el host Docker y hace que el puerto RPC (8232) sea accesible solo desde el propio host. Muestra la cookie con:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Mantén `0.0.0.0` en `ZEBRA_RPC__LISTEN_ADDR`.** Esa es la dirección en la que Zebra escucha dentro del contenedor. Docker reenvía un puerto publicado a la propia interfaz de red del contenedor, por lo que un Zebra que escuche en `127.0.0.1` dentro del contenedor no recibiría la conexión, ni siquiera desde el host. El `127.0.0.1:` delante de `-p` es lo que mantiene el puerto fuera de la red.
- **El comando del Libro** publica el puerto RPC con `-p 8232:8232`, lo que lo abre en todas las interfaces de red del host.
- **Para practicar en Testnet**, añade `-e ZEBRA_NETWORK__NETWORK="Testnet"`, configura `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, publica `-p 18233:18233` y `-p 127.0.0.1:18232:18232`, y proporciona una dirección de Testnet. Una dirección Mainnet impide que Zebra se inicie en Testnet, y viceversa.

Los pagos a mineros y la gestión de la billetera quedan fuera de esta sección. Para la parte de la billetera, consulta [Zallet](/zcash-tech/zallet).

## Consejos y Mejores Prácticas
- **Rentabilidad:** Usa calculadoras como whattomine.com/coins/166-zec-equihash. Ejemplo: Una RTX 3060 (~300 Sol/s) genera ~0,001 ZEC/día a $50/ZEC, menos ~$0,50 de electricidad.
- **Privacidad:** Usa pools blindados si están disponibles; evita reutilizar direcciones.
- **Seguridad:** Usa contraseñas seguras; habilita 2FA en pools/billeteras. Nunca compartas claves privadas.
- **Solución de Problemas:** Si no hay participaciones, revisa el firewall, el antivirus o una configuración incorrecta. Únete a foros como forum.zcashcommunity.com o Reddit r/zec.
- **Alternativas:** Si no es rentable, considera el minado en la nube o el staking de otras monedas.
- **Nota Ambiental:** El minado consume energía; usa fuentes renovables si es posible.
- **Actualizaciones:** Zcash puede evolucionar (p. ej., posible transición a PoS); consulta z.cash para noticias.
