# Guía de Minería de Zcash: Unirse a un Pool de Minería con Hardware Personal

## Introducción

Zcash (ZEC) es una criptomoneda centrada en la privacidad que utiliza el algoritmo de prueba de trabajo Equihash para la minería. Minar Zcash implica usar potencia computacional para resolver problemas matemáticos complejos, validar transacciones y asegurar la red a cambio de recompensas en ZEC. Debido a la alta dificultad de la red, no se recomienda la minería en solitario para la mayoría de los usuarios. Unirse a un pool de minería es la mejor manera de obtener recompensas constantes al combinar tu poder de hash con el de otros.

Esta guía se centra en minar Zcash usando hardware personal (por ejemplo, un PC doméstico con GPU o ASIC de nivel inicial). Ten en cuenta que, aunque las GPU todavía pueden minar Zcash, los ASIC son mucho más eficientes y rentables en 2026 debido a la dificultad de la red. Comprueba siempre la rentabilidad actual usando herramientas como WhatToMine.com, ya que factores como los costes de electricidad, los precios del hardware y el valor de ZEC afectan la viabilidad. La minería puede no ser rentable para todo el mundo; investiga la normativa local y las tarifas energéticas (apunta a < $0.08/kWh).


## Requisitos

### Hardware
- **Minería con GPU (Configuración Personal Recomendada para Principiantes):**
  - GPU NVIDIA o AMD con al menos 4GB de VRAM (por ejemplo, NVIDIA GTX 1070, RTX 3060; AMD RX 580 o superior).
  - Una placa base compatible, una PSU suficiente (al menos 750W para varias GPU) y buena refrigeración para evitar el sobrecalentamiento.
  - Los rigs con varias GPU son habituales para obtener mejores tasas de hash (por ejemplo, 6 GPU pueden alcanzar 1-2 kSol/s).
- **Minería con ASIC (Más Eficiente pero de Mayor Coste):**
  - ASIC compatibles con Equihash como Bitmain Antminer Z15 (420 kSol/s) o Innosilicon A9 (50 kSol/s).
  - Estos hacen más ruido, generan más calor y consumen más energía (por ejemplo, 1500W+); son adecuados para espacios dedicados. Compra en fuentes de confianza como Bitmain.com o revendedores (Blockware Mining).
- **General:** Internet estable, un ordenador para la configuración/monitorización. Los ASIC dominan la red (~13 GSol/s de hashrate total en 2026), lo que hace que la minería con GPU sea menos competitiva, aunque sigue siendo posible para aficionados.

### Software
- **Sistema Operativo:** Windows 10/11, Linux (se recomienda Ubuntu por su estabilidad).
- **Software de Minería:**
  - Para GPU: lolMiner (compatible con AMD/NVIDIA), GMiner o miniZ (centrado en NVIDIA). Descarga desde los repositorios oficiales de GitHub (por ejemplo, github.com/Lolliedieb/lolMiner-releases).
  - Para ASICs: Usa el firmware/panel de control integrado del fabricante (por ejemplo, la interfaz web de Bitmain).
- **Wallet:** Una wallet de Zcash para recibir pagos. Recomendadas:
  - Blindadas (privadas): ZODL Wallet, Zingo (Móvil/Escritorio) YWallet (móvil/escritorio).
  - Transparentes (más fáciles pero menos privadas): Edge Wallet, Zecwallet Lite.
  - Descarga desde [wallets](https://zechub.wiki/wallets). Genera una dirección blindada (empieza con 'zs') para mayor privacidad si el pool la admite.

### Otros
- Electricidad: Calcula los costes. Las GPU usan 150-300W por tarjeta; los ASIC 1000W+.
- Antivirus: Desactívalo durante la configuración, ya que puede marcar los mineros como amenazas.

## Guía Paso a Paso para Unirse a un Pool de Minería

### Paso 1: Configura Tu Wallet de Zcash
1. Descarga e instala una wallet desde el sitio web oficial de Zcash [wallets](https://zechub.wiki/wallets).
2. Crea una nueva wallet y haz una copia de seguridad segura de tu frase semilla.
3. Genera una dirección de recepción (preferiblemente blindada por privacidad). Anótala, por ejemplo, `zs1exampleaddress...`.
4. Si usas una dirección transparente (empieza con 't'), es más simple pero ofrece menos privacidad.

### Paso 2: Prepara Tu Hardware
- Para GPU:
  1. Instala las GPU en tu PC y actualiza los controladores (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Haz overclock si tienes experiencia (usa MSI Afterburner para la estabilidad; apunta a +100-200 de core clock, -500 de memoria para eficiencia).
- Para ASIC:
  1. Conecta el ASIC a la corriente y a Ethernet.
  2. Encuentra su dirección IP usando una herramienta como Advanced IP Scanner o la aplicación del fabricante.
  3. Accede al panel web (por ejemplo, introduce la IP en el navegador, inicio de sesión predeterminado: root/root para Bitmain).

**Advertencia:** Asegura una ventilación adecuada; la minería genera calor. Empieza en pequeño para hacer pruebas.

### Paso 3: Elige y Únete a un Pool de Minería
Los pools de minería distribuyen el trabajo y comparten las recompensas según el hashrate que aportas. Selecciona en función de las comisiones (0-2%), el mínimo de pago (0.01-0.1 ZEC), la ubicación (bajo ping) y la fiabilidad.

**Pools Recomendados (Según Hashrate, Comisiones y Reseñas):**
- **2Miners (zec.2miners.com)**: comisión del 1%, pago PPLNS, compatible con GPU/ASIC/NiceHash. Alto hashrate (~1.17 GSol/s), servidores fiables.
- **F2Pool (zec.f2pool.com)**: comisión del 2%, pago PPS+, soporte multimoneda. Pool grande (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: comisión del 2% (PPS+), panel fácil de usar, servidores globales.
- **AntPool (zec.antpool.com)**: comisión del 1%, de Bitmain, bueno para ASIC (~494 MSol/s).
- **Sovright (mining.sovright.com)**: Un pool de Zcash construido sobre Stratum V2, actualmente funcionando como testnet pública. Aún no ofrece pagos en ZEC reales, así que considéralo una forma de probar tu configuración más que una fuente de ingresos. Consulta la sección dedicada más abajo para más detalles.
- Otros: Kryptex Pool, Luxor (consulta poolwatch.io/coin/zcash para estadísticas en tiempo real).

1. Visita el sitio web del pool y crea una cuenta (correo electrónico o sin registro para algunos como 2Miners).
2. Añade la dirección de tu wallet de Zcash en la configuración para los pagos.
3. Anota el servidor stratum del pool (por ejemplo, zec.2miners.com:1010) y el puerto.

### Paso 4: Instala y Configura el Software de Minería
- Para GPU (Ejemplo: lolMiner en Windows/Linux):
  1. Descarga lolMiner desde GitHub (última versión, por ejemplo, 1.88).
  2. Extráelo a una carpeta.
  3. Crea un archivo por lotes (start.bat) con la configuración:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Sustituye `YOUR_WALLET_ADDRESS` por tu dirección de ZEC.
     - `WORKER_NAME`: Un nombre para tu rig (por ejemplo, Rig1).
     - Para servidores de la UE: eu.zec.2miners.com:1010.
  4. Ejecuta el archivo por lotes. Se conectará al pool y comenzará a minar.
- Para ASIC (Ejemplo: Bitmain Antminer):
  1. Inicia sesión en el panel web.
  2. Ve a Miner Configuration.
  3. Añade los detalles del pool:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (o en blanco).
  4. Guarda y reinicia el minero.
- Para otro software (por ejemplo, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Prueba:** Ejecútalo durante 10-15 minutos; revisa la consola para ver shares aceptadas y hashrate.

### Paso 5: Empieza a Minar y Supervisa
1. Inicia el minero: se conectará al pool y comenzará a enviar shares.
2. Supervisa mediante:
   - Panel del pool: Introduce la dirección de tu wallet para ver hashrate, saldo no pagado y estadísticas.
   - Consola del software: Observa errores, temperatura (mantén < 80 grados C).
   - Herramientas: Usa HiveOS o SimpleMining OS para la gestión remota del rig.
3. Pagos: La mayoría de los pools pagan automáticamente cuando alcanzas el mínimo (por ejemplo, 0.05 ZEC). Consulta las reglas del pool.

   
![Configuración de Monitorización de Minería de Zcash](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Pool de Testnet y Red de Relay

Sovright (sovright.com) opera un pool de minería Stratum V2 y una red independiente de relay de bloques. Hacen trabajos distintos, así que se cubren por separado a continuación.

### Pool de Minería (mining.sovright.com)

El pool de Sovright funciona en una testnet pública de Zcash (NU6, Stratum V2), no en mainnet. La testnet no paga ZEC reales. Úsalo para probar la configuración de tu minero, no para ganar dinero.

- No se requiere cuenta para empezar. Apunta un minero Equihash de CPU o ASIC al pool y tus shares aparecerán en un panel en vivo.
- Sovright también publica un proxy Stratum V2 de código abierto para mineros que quieran elegir sus propias plantillas de bloque en lugar de simplemente aceptar los trabajos del pool:
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Apunta tu minero al proxy en lugar de al pool directamente:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  usando un nombre de worker como `yourname.rig1`.
- La página de transparencia de Sovright indica una política de "include all" para transacciones blindadas, a diferencia de algunos pools que las filtran. Cada bloque recibe una attestación firmada para que la política pueda comprobarse de forma independiente.
- Crea una cuenta en mining.sovright.com (inicio de sesión con Google o correo electrónico) para seguir tus propios workers en lugar de los datos de ejemplo del panel.

### Red de Relay (relay.sovright.com)

Sovright también opera por separado una red pública de relay de bloques en la mainnet de Zcash. Cuando un pool encuentra un bloque, la rapidez con la que ese bloque llega al resto de la red determina con qué frecuencia queda huérfano, lo que significa que pierde la carrera de propagación y se pierde la recompensa. El relay reenvía bloques a través de cuatro regiones usando compact block relay con corrección de errores hacia adelante.

El panel público muestra el efecto en vivo: las regiones conectadas al relay ven nuevos bloques en bastante menos de la mitad del tiempo que tarda el gossip peer to peer normal, y el panel rastrea la tasa de bloques huérfanos en vivo de la red.

Esto es infraestructura para operadores de pools, no para mineros individuales. El repositorio de código abierto `mining-infra` de Sovright documenta una pasarela de relay `submitblock` para distribuir bloques encontrados en la malla más rápido que con P2P nativo. Para conectarte, ponte en contacto directamente con Sovright (support@sovright.com) para obtener direcciones de peers del relay y una clave de autenticación.


## Consejos y Mejores Prácticas
- **Rentabilidad:** Usa calculadoras como whattomine.com/coins/166-zec-equihash. Ejemplo: una RTX 3060 (~300 Sol/s) gana ~0.001 ZEC/día a $50/ZEC, menos ~$0.50 de electricidad.
- **Privacidad:** Usa pools blindados si están disponibles; evita reutilizar direcciones.
- **Seguridad:** Usa contraseñas seguras; activa 2FA en pools/wallets. Nunca compartas claves privadas.
- **Resolución de Problemas:** Si no hay shares, revisa el firewall, el antivirus o una configuración incorrecta. Únete a foros como forum.zcashcommunity.com o Reddit r/zec.
- **Alternativas:** Si no es rentable, considera cloud mining o hacer staking de otras monedas.
- **Nota Ambiental:** La minería consume energía; usa fuentes renovables si es posible.
- **Actualizaciones:** Zcash puede evolucionar (por ejemplo, un posible cambio a PoS); consulta z.cash para ver noticias.
