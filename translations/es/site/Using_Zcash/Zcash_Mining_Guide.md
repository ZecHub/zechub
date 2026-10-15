# Zcash Guía de minería: Unirse a un pool de minería con hardware personal

## Introducción

Zcash (ZEC) es una criptomoneda centrada en la privacidad que utiliza el algoritmo de prueba de trabajo Equihash para la minería. Minar Zcash implica usar potencia computacional para resolver problemas matemáticos complejos, validar transacciones y proteger la red a cambio de recompensas en ZEC. Debido a la alta dificultad de la red, no se recomienda la minería en solitario para la mayoría de los usuarios. Unirse a un pool de minería es la mejor forma de obtener recompensas constantes combinando tu potencia de hash con la de otros.

Esta guía se centra en minar Zcash usando hardware personal (p. ej., un PC doméstico con GPU o ASIC de nivel básico). Ten en cuenta que, aunque las GPU aún pueden minar Zcash, los ASIC son mucho más eficientes y rentables en 2026 debido a la dificultad de la red. Comprueba siempre la rentabilidad actual con herramientas como WhatToMine.com, ya que factores como los costes de electricidad, los precios del hardware y el valor de ZEC afectan a la viabilidad. La minería puede no ser rentable para todos; investiga las regulaciones locales y las tarifas energéticas (procura que sean inferiores a $0.08/kWh).


## Requisitos

### Hardware
- **Minería con GPU (configuración personal recomendada para principiantes):**
  - GPU NVIDIA o AMD con al menos 4 GB de VRAM (p. ej., NVIDIA GTX 1070, RTX 3060; AMD RX 580 o superior).
  - Una placa base compatible, una fuente de alimentación suficiente (al menos 750 W para varias GPU) y buena refrigeración para evitar el sobrecalentamiento.
  - Los equipos con varias GPU son habituales para obtener mejores tasas de hash (p. ej., 6 GPU pueden alcanzar 1-2 kSol/s).
- **Minería con ASIC (más eficiente, pero de mayor coste):**
  - ASIC compatibles con Equihash, como Bitmain Antminer Z15 (420 kSol/s) o Innosilicon A9 (50 kSol/s).
  - Son más ruidosos, más calientes y consumen más energía (p. ej., 1500 W o más); adecuados para espacios dedicados. Compra en fuentes confiables como Bitmain.com o distribuidores (Blockware Mining).
- **General:** Internet estable y un ordenador para la configuración y supervisión. Los ASIC dominan la red (~13 GSol/s de tasa de hash total en 2026), lo que hace que la minería con GPU sea menos competitiva, pero aún posible para aficionados.

### Software
- **Sistema operativo:** Windows 10/11, Linux (se recomienda Ubuntu por su estabilidad).
- **Software de minería:**
  - Para GPU: lolMiner (compatible con AMD/NVIDIA), GMiner o miniZ (centrado en NVIDIA). Descarga desde los repositorios oficiales de GitHub (p. ej., github.com/Lolliedieb/lolMiner-releases).
  - Para ASIC: usa el firmware/panel de control integrado del fabricante (p. ej., la interfaz web de Bitmain).
- **Wallet:** Una wallet de Zcash para recibir pagos. Recomendadas:
  - Blindada (privada): ZODL Wallet, Zingo (móvil/escritorio), Zkool (móvil/escritorio).
  - Transparente (más sencilla, pero menos privada): Edge Wallet, Zecwallet Lite.
  - Descarga desde [wallets](https://zechub.wiki/wallets). Genera una dirección blindada (empieza con 'zs') para mayor privacidad si el pool la admite.

### Otros
- Electricidad: calcula los costes. Las GPU consumen 150-300 W por tarjeta; los ASIC más de 1000 W.
- Antivirus: desactívalo durante la configuración, ya que podría marcar a los mineros como amenazas.

## Guía paso a paso para unirse a un pool de minería

### Paso 1: Configura tu wallet de Zcash
1. Descarga e instala una wallet desde el sitio web oficial de Zcash [wallets](https://zechub.wiki/wallets).
2. Crea una nueva wallet y haz una copia de seguridad segura de tu frase semilla.
3. Genera una dirección de recepción (preferiblemente blindada para mayor privacidad). Anótala, p. ej., `zs1exampleaddress...`.
4. Si usas una dirección transparente (empieza con 't'), es más sencillo, pero ofrece menos privacidad.

### Paso 2: Prepara tu hardware
- Para GPU:
  1. Instala las GPU en tu PC y actualiza los controladores (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Haz overclock si tienes experiencia (usa MSI Afterburner para mantener la estabilidad; procura +100-200 de reloj del núcleo y -500 de memoria para mejorar la eficiencia).
- Para ASIC:
  1. Conecta el ASIC a la alimentación y a Ethernet.
  2. Busca su dirección IP con una herramienta como Advanced IP Scanner o la aplicación del fabricante.
  3. Accede al panel web (p. ej., introduce la IP en el navegador; inicio de sesión predeterminado: root/root para Bitmain).

**Advertencia:** Asegura una ventilación adecuada; la minería genera calor. Empieza poco a poco para hacer pruebas.

### Paso 3: Elige y únete a un pool de minería
Los pools de minería distribuyen el trabajo y comparten las recompensas según la tasa de hash que aportes. Selecciona según las comisiones (0-2 %), el mínimo de pago (0.01-0.1 ZEC), la ubicación (baja latencia) y la fiabilidad.

**Pools recomendados (según tasa de hash, comisiones y reseñas):**
- **2Miners (zec.2miners.com)**: comisión del 1 %, pago PPLNS, compatible con GPU/ASIC/NiceHash. Alta tasa de hash (~1.17 GSol/s), servidores fiables.
- **F2Pool (zec.f2pool.com)**: comisión del 2 %, pago PPS+, compatibilidad multimoneda. Pool grande (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: comisión del 2 % (PPS+), panel fácil de usar, servidores globales.
- **AntPool (zec.antpool.com)**: comisión del 1 %, de Bitmain, bueno para ASIC (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Pool de minería profesional de Zcash de Foundry Digital. Usa pagos PPLNS, ofrece seguimiento transparente de recompensas y soporte de nivel empresarial. Más adecuado para mineros ASIC institucionales y a gran escala; requiere verificación de cuenta.
- **Sovright (mining.sovright.com)**: Un pool de Zcash construido sobre Stratum V2, que actualmente funciona como una testnet pública. Aún no hay pagos reales en ZEC, así que considérelo una forma de probar tu configuración en lugar de una fuente de ingresos. Consulta la sección específica a continuación para obtener más detalles.
- Otros: Kryptex Pool, Luxor (consulta poolwatch.io/coin/zcash para estadísticas en tiempo real).

1. Visita el sitio web del pool y crea una cuenta (correo electrónico o sin registro para algunos como 2Miners).
2. Añade tu dirección de wallet de Zcash en la configuración de pagos.
3. Anota el servidor stratum y el puerto del pool (p. ej., zec.2miners.com:1010).

### Paso 4: Instala y configura el software de minería
- Para GPU (ejemplo: lolMiner en Windows/Linux):
  1. Descarga lolMiner desde GitHub (la última versión, p. ej., 1.88).
  2. Extráelo en una carpeta.
  3. Crea un archivo por lotes (start.bat) con la configuración:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Sustituye `YOUR_WALLET_ADDRESS` por tu dirección de ZEC.
     - `WORKER_NAME`: un nombre para tu equipo (p. ej., Rig1).
     - Para servidores de la UE: eu.zec.2miners.com:1010.
  4. Ejecuta el archivo por lotes. Se conectará al pool y comenzará a minar.
- Para ASIC (ejemplo: Bitmain Antminer):
  1. Inicia sesión en el panel web.
  2. Ve a Configuración del minero.
  3. Añade los detalles del pool:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Nombre de usuario: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Contraseña: x (o en blanco).
  4. Guarda y reinicia el minero.
- Para otro software (p. ej., GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Prueba:** Ejecútalo durante 10-15 minutos; revisa la consola para ver las participaciones aceptadas y la tasa de hash.

### Paso 5: Empieza a minar y supervisa
1. Inicia el minero: se conectará al pool y comenzará a enviar participaciones.
2. Supervisa mediante:
   - Panel del pool: introduce tu dirección de wallet para ver la tasa de hash, el saldo no pagado y las estadísticas.
   - Consola del software: vigila los errores y la temperatura (manténla por debajo de 80 grados C).
   - Herramientas: usa HiveOS o SimpleMining OS para la gestión remota del equipo.
3. Pagos: la mayoría de los pools pagan automáticamente cuando alcanzas el mínimo (p. ej., 0.05 ZEC). Consulta las reglas del pool.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Pool de testnet y red de retransmisión

Sovright (sovright.com) opera un pool de minería Stratum V2 y una red independiente de retransmisión de bloques. Cumplen funciones diferentes, por lo que se tratan por separado a continuación.

### Pool de minería (mining.sovright.com)

El pool de Sovright funciona en una testnet pública de Zcash (NU6, Stratum V2), no en mainnet. La testnet no paga ZEC reales. Úsalo para probar la configuración de tu minero, no para obtener ganancias.

- No se requiere una cuenta para comenzar. Dirige un minero Equihash de CPU o ASIC al pool y tus participaciones aparecerán en un panel en directo.
- Sovright también publica un proxy Stratum V2 de código abierto para los mineros que quieran elegir sus propias plantillas de bloques en lugar de limitarse a aceptar los trabajos del pool:

### Supervisión de Foundry Zcash Pool

Para usuarios de Foundry Zcash Pool:

- Supervisa el rendimiento del minero a través del panel del pool de Foundry.
- Comprueba:
  - Trabajadores activos
  - Tasa de hash reportada
  - Participaciones aceptadas
  - Recompensas estimadas
  - Estado de pago

Dado que Foundry utiliza un modelo de recompensa PPLNS, las recompensas de minería dependen de las participaciones aportadas durante la ventana de recompensas del pool, y no solo de la tasa de hash instantánea.

Prácticas de supervisión recomendadas:
- Compara la tasa de hash del panel ASIC con la tasa de hash reportada por Foundry.
- Investiga las participaciones rechazadas, las participaciones obsoletas o la inestabilidad de la conexión.
- Mantén una conectividad de red estable, ya que el tiempo de inactividad reduce las participaciones enviadas y las posibles recompensas.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Dirige tu minero al proxy en vez de directamente al pool:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  usando un nombre de trabajador como `yourname.rig1`.
- La página de transparencia de Sovright declara una política de "incluir todas" las transacciones blindadas, a diferencia de algunos pools que las excluyen. Cada bloque recibe una certificación firmada para que la política pueda verificarse de forma independiente.
- Crea una cuenta en mining.sovright.com (inicio de sesión con Google o correo electrónico) para seguir tus propios trabajadores en lugar de los datos de ejemplo del panel.

### Red de retransmisión (relay.sovright.com)

Sovright opera por separado una red pública de retransmisión de bloques en la mainnet de Zcash. Cuando un pool encuentra un bloque, la rapidez con la que ese bloque llega al resto de la red determina con qué frecuencia queda huérfano, es decir, pierde la carrera de propagación y se pierde su recompensa. La retransmisión reenvía bloques entre cuatro regiones mediante retransmisión de bloques compactos con corrección de errores hacia delante.

El panel público muestra el efecto en directo: las regiones conectadas a la retransmisión ven nuevos bloques en mucho menos de la mitad del tiempo que tarda la difusión simple entre pares, y el panel rastrea la tasa de bloques huérfanos de la red en tiempo real.

Esta es infraestructura para operadores de pools, no para mineros individuales. El repositorio de código abierto de Sovright `mining-infra` documenta una puerta de enlace de retransmisión de `submitblock` para distribuir los bloques encontrados en la malla más rápidamente que el P2P nativo. Para conectarte, contacta directamente con Sovright (support@sovright.com) para obtener direcciones de pares de retransmisión y una clave de autenticación.


## Minería contra tu propio nodo de Zebra

Todo lo anterior dirige tu minero al pool de otra persona. La otra opción es ejecutar un nodo tú mismo y hacer que tu software de minería le solicite trabajo. Dado que zcashd se detuvo el 18 de julio de 2026, eso significa [Zebra](/zcash-tech/zebra-full-node), el nodo que cubre esta sección.

La función de Zebra es limitada y específica: crea plantillas de bloques y acepta bloques resueltos mediante su interfaz RPC. El hash lo realiza el software de minería, y repartir las recompensas entre varios mineros es tarea del software de pools. Que la minería en solitario llegue a encontrar un bloque depende de tu parte de la tasa de hash de la red, algo que esta sección no intenta estimar. Por eso la introducción de esta página no recomienda la minería en solitario para la mayoría de los usuarios.

Los pasos siguen dos páginas del Libro de Zebra, [Minería Zcash con Zebra](https://zebra.zfnd.org/user/mining.html) y [Minería con Zebra en Docker](https://zebra.zfnd.org/user/mining-docker.html), tal como estaban el 8 de octubre de 2026. Los nombres de las claves y los valores predeterminados cambian entre versiones, así que consulta el Libro antes de depender de una.

### Establece la dirección que recibe la recompensa

Crea un archivo de configuración con los ajustes predeterminados y luego edítalo:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Se requiere una dirección de minero ([Libro: Dirección del minero](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra acepta una dirección P2PKH o P2SH transparente, una dirección de Sapling o una Unified Address. Para una Unified Address con más de un receptor, el Libro indica que Zebra paga a un único receptor, "dando preferencia a Orchard, luego a Sapling y después a transparente".

Dos claves opcionales van en la misma sección de `[mining]`:

| Clave | Qué hace | Límite |
|---|---|---|
| `extra_coinbase_data` | Añade una etiqueta pública, como el nombre de un pool, a la entrada coinbase de cada bloque que mines, después del propio marcador de Zebra ([Libro](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 bytes. Por encima de eso, "Zebra se niega a iniciar" |
| `miner_memo` | Adjunta una nota blindada a la salida de recompensa. A diferencia de `extra_coinbase_data`, no es pública: solo alguien con una clave de visualización de la dirección receptora puede leerla ([Libro](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 bytes. Solo funciona cuando la recompensa va a un receptor blindado. Con una dirección transparente, "silenciosamente no tiene efecto" |

### Abre el puerto RPC

El software de minería se comunica con Zebra mediante JSON-RPC, que permanece desactivado hasta que le das una dirección en la que escuchar ([Libro: sección RPC](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 es el puerto RPC estándar en Mainnet. `127.0.0.1` mantiene el puerto accesible solo desde la misma máquina.

Desde Zebra 2.0.0, una cookie protege el puerto RPC, un método similar al que utilizaba zcashd. Zebra escribe la cookie cuando se inicia el punto de conexión RPC y la elimina al apagarse. De forma predeterminada, el archivo se encuentra en el directorio de caché de Zebra, por ejemplo `/home/user/.cache/zebra/.cookie` en Linux, y contiene una línea:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` mueve el archivo. `rpc.enable_cookie_auth = false` desactiva la comprobación y, con ella, la única autenticación que tiene el puerto RPC: entonces cualquier cosa que pueda llegar al puerto podrá llamarlo.

### Inicia Zebra y deja que se sincronice

```bash
zebrad
```

Zebra lee la configuración desde la ubicación predeterminada. Pasa `-c /path/to/zebrad.toml` para usar otro archivo. Espera a que finalice la sincronización. El registro muestra `sync_percent=100.000%` cuando lo ha hecho ([Libro: Ejecución de zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Nodo completo](/zcash-tech/zebra-full-node) cubre el hardware y el espacio en disco.

### Compruébalo con getblocktemplate

`getblocktemplate` es la llamada que realiza el software de minería para obtener trabajo, así que también es la prueba más rápida ([Libro: Prueba de la configuración](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Sustituye `__cookie__:PASSWORD` por el contenido de tu archivo cookie:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Una configuración funcional devuelve un objeto `result` con los campos que necesita un minero, entre ellos `previousblockhash`, `coinbasetxn`, `target` y `height`. Si estableces `extra_coinbase_data`, el Libro explica cómo encontrar tu etiqueta en `coinbasetxn.data`.

### Dirige tu software de minería hacia él

Proporciona a tu software de minería o de pool el punto de conexión RPC, `127.0.0.1:8232`, y el nombre de usuario y contraseña de la cookie. El Libro indica que Zebra "admite los métodos RPC necesarios para ejecutar la mayoría del software de pools de minería" ([Libro: Ejecutar un pool de minería](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Dos notas del Libro antes de elegir software:

- **s-nomp es solo para pruebas.** El Libro califica su configuración de s-nomp como "experimental" y dice que s-nomp "no es compatible con NU5, por lo que algunas funciones de minería están desactivadas". Su guía de [Testnet](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) añade que s-nomp "no se ha actualizado oficialmente para NU5 o actualizaciones de red posteriores" y dirige a los mineros de producción al software de pools compatible con las actualizaciones actuales.
- **Zebra incluye una pila lista para usar.** El repositorio de Zebra tiene una configuración de Compose de Docker en [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) que inicia Zebra junto con un pool de minería y, si lo solicitas, un minero de CPU. El pool incluido es s-nomp y se inicia en Testnet a menos que lo cambies, así que considéralo una forma de aprender las piezas móviles.

### La ruta de Docker

El camino más corto del Libro es la imagen de `zfnd/zebra` Docker, con la dirección y el puerto RPC pasados como variables de entorno ([Libro: Minería con Zebra en Docker](https://zebra.zfnd.org/user/mining-docker.html)). El siguiente comando es el del Libro con un cambio: publica el puerto RPC solo en la dirección de loopback del host, para que otras máquinas no puedan acceder a él.

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
- **Para practicar en Testnet**, añade `-e ZEBRA_NETWORK__NETWORK="Testnet"`, establece `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, publica `-p 18233:18233` y `-p 127.0.0.1:18232:18232`, y proporciona una dirección Testnet. Una dirección Mainnet impide que Zebra se inicie en Testnet, y viceversa.

El pago a mineros y la gestión de la wallet quedan fuera de esta sección. Para la parte de la wallet, consulta [Zallet](/zcash-tech/zallet).

## Consejos y buenas prácticas
- **Rentabilidad:** Usa calculadoras como whattomine.com/coins/166-zec-equihash. Ejemplo: una RTX 3060 (~300 Sol/s) obtiene ~0.001 ZEC/día a $50/ZEC, menos ~$0.50 de electricidad.
- **Privacidad:** Usa pools blindados si están disponibles; evita reutilizar direcciones.
- **Seguridad:** Usa contraseñas robustas; activa 2FA en pools/wallets. Nunca compartas claves privadas.
- **Resolución de problemas:** Si no hay participaciones, revisa el firewall, el antivirus o una configuración incorrecta. Únete a foros como forum.zcashcommunity.com o Reddit r/zec.
- **Alternativas:** Si no es rentable, considera la minería en la nube o el staking de otras monedas.
- **Nota ambiental:** La minería consume energía; usa fuentes renovables si es posible.
- **Actualizaciones:** Zcash puede evolucionar (p. ej., posible transición a PoS); consulta z.cash para conocer las noticias.
