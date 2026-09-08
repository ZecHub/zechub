# Guía de Minería de Zcash: Unirse a un Pool de Minería con Hardware Personal

## Introducción

Zcash (ZEC) es una criptomoneda enfocada en la privacidad que utiliza el algoritmo de prueba de trabajo Equihash para la minería. Minar Zcash implica usar potencia computacional para resolver problemas matemáticos complejos, validar transacciones y asegurar la red a cambio de recompensas en ZEC. Debido a la alta dificultad de la red, no se recomienda la minería en solitario para la mayoría de los usuarios. Unirse a un pool de minería es la mejor manera de obtener recompensas consistentes al combinar tu poder de hash con el de otros.

Esta guía se centra en minar Zcash usando hardware personal (por ejemplo, una PC doméstica con GPUs o ASICs de nivel básico). Ten en cuenta que, aunque las GPUs todavía pueden minar Zcash, los ASICs son mucho más eficientes y rentables en 2026 debido a la dificultad de la red. Verifica siempre la rentabilidad actual con herramientas como WhatToMine.com, ya que factores como los costos de electricidad, los precios del hardware y el valor de ZEC afectan la viabilidad. La minería puede no ser rentable para todos; investiga las regulaciones locales y las tarifas energéticas (apunta a < $0.08/kWh).


## Requisitos

### Hardware
- **Minería con GPU (Configuración Personal Recomendada para Principiantes):**
  - GPUs NVIDIA o AMD con al menos 4GB de VRAM (p. ej., NVIDIA GTX 1070, RTX 3060; AMD RX 580 o superior).
  - Una placa base compatible, una fuente de alimentación suficiente (al menos 750W para varias GPUs) y buena refrigeración para evitar el sobrecalentamiento.
  - Los rigs con múltiples GPUs son comunes para obtener mejores tasas de hash (p. ej., 6x GPUs pueden alcanzar 1-2 kSol/s).
- **Minería con ASIC (Más Eficiente pero de Mayor Costo):**
  - ASICs compatibles con Equihash como Bitmain Antminer Z15 (420 kSol/s) o Innosilicon A9 (50 kSol/s).
  - Estos son más ruidosos, más calientes y consumen más energía (p. ej., 1500W+); adecuados para espacios dedicados. Compra en fuentes confiables como Bitmain.com o revendedores (Blockware Mining).
- **General:** Internet estable, una computadora para configuración/monitoreo. Los ASICs dominan la red (~13 GSol/s de hashrate total en 2026), lo que hace que la minería con GPU sea menos competitiva, aunque aún posible para aficionados.

### Software
- **Sistema Operativo:** Windows 10/11, Linux (se recomienda Ubuntu por su estabilidad).
- **Software de Minería:**
  - Para GPUs: lolMiner (compatible con AMD/NVIDIA), GMiner o miniZ (enfocado en NVIDIA). Descarga desde los repositorios oficiales de GitHub (p. ej., github.com/Lolliedieb/lolMiner-releases).
  - Para ASICs: Usa el firmware/panel incorporado del fabricante (p. ej., la interfaz web de Bitmain).
- **Wallet:** Una wallet de Zcash para recibir pagos. Recomendadas:
  - Blindada (privada): Zodl Wallet, Zingo (Móvil/Escritorio) YWallet (móvil/escritorio).
  - Transparente (más fácil pero menos privada): Edge Wallet, Zecwallet Lite.
  - Descarga desde [billeteras](https://zechub.wiki/wallets). Genera una dirección blindada (empieza con 'zs') para mayor privacidad si el pool la admite.

### Otros
- Electricidad: Calcula los costos. Las GPUs usan 150-300W por tarjeta; los ASICs 1000W+.
- Antivirus: Desactívalo durante la configuración, ya que puede marcar a los mineros como amenazas.

## Guía Paso a Paso para Unirse a un Pool de Minería

### Paso 1: Configura Tu Wallet de Zcash
1. Descarga e instala una wallet desde el sitio web oficial de Zcash [billeteras](https://zechub.wiki/wallets).
2. Crea una nueva wallet y respalda tu frase semilla de forma segura.
3. Genera una dirección de recepción (preferiblemente blindada por privacidad). Anótala, por ejemplo, `zs1exampleaddress...`.
4. Si usas una dirección transparente (empieza con 't'), es más simple pero ofrece menos privacidad.

### Paso 2: Prepara Tu Hardware
- Para GPUs:
  1. Instala las GPUs en tu PC y actualiza los controladores (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Haz overclock si tienes experiencia (usa MSI Afterburner para estabilidad; apunta a +100-200 de core clock, -500 de memoria para eficiencia).
- Para ASICs:
  1. Conecta el ASIC a la corriente y a Ethernet.
  2. Encuentra su dirección IP usando una herramienta como Advanced IP Scanner o la app del fabricante.
  3. Accede al panel web (p. ej., introduce la IP en el navegador, inicio de sesión predeterminado: root/root para Bitmain).

**Advertencia:** Asegura una ventilación adecuada; la minería genera calor. Empieza en pequeño para probar.

### Paso 3: Elige y Únete a un Pool de Minería
Los pools de minería distribuyen trabajo y comparten recompensas según el hashrate que aportes. Selecciona según las comisiones (0-2%), el pago mínimo (0.01-0.1 ZEC), la ubicación (bajo ping) y la confiabilidad.

**Pools Recomendados (Basados en Hashrate, Comisiones y Reseñas):**
- **2Miners (zec.2miners.com)**: comisión del 1%, pago PPLNS, compatible con GPU/ASIC/NiceHash. Alto hashrate (~1.17 GSol/s), servidores confiables.
- **F2Pool (zec.f2pool.com)**: comisión del 2%, pago PPS+, soporte multimoneda. Pool grande (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: comisión del 2% (PPS+), panel fácil de usar, servidores globales.
- **AntPool (zec.antpool.com)**: comisión del 1%, de Bitmain, bueno para ASICs (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Pool de minería profesional de Zcash de Foundry Digital. Usa pagos PPLNS, ofrece seguimiento transparente de recompensas y soporte de nivel empresarial. Más adecuado para mineros ASIC institucionales y a gran escala; requiere verificación de cuenta.
- **Sovright (mining.sovright.com)**: Un pool de Zcash construido sobre Stratum V2, actualmente funcionando como testnet pública. Aún no hay pagos en ZEC en vivo, así que trátalo como una forma de probar tu configuración en lugar de una fuente de ingresos. Consulta la sección dedicada más abajo para más detalles.
- Otros: Kryptex Pool, Luxor (consulta poolwatch.io/coin/zcash para estadísticas en tiempo real).

1. Visita el sitio web del pool y crea una cuenta (correo electrónico o sin registro para algunos como 2Miners).
2. Agrega la dirección de tu wallet de Zcash en la configuración para los pagos.
3. Anota el servidor stratum del pool (p. ej., zec.2miners.com:1010) y el puerto.

### Paso 4: Instala y Configura el Software de Minería
- Para GPUs (Ejemplo: lolMiner en Windows/Linux):
  1. Descarga lolMiner desde GitHub (última versión, p. ej., 1.88).
  2. Extráelo a una carpeta.
  3. Crea un archivo batch (start.bat) con la configuración:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Reemplaza `YOUR_WALLET_ADDRESS` con tu dirección ZEC.
     - `WORKER_NAME`: Un nombre para tu rig (p. ej., Rig1).
     - Para servidores de la UE: eu.zec.2miners.com:1010.
  4. Ejecuta el archivo batch. Se conectará al pool y empezará a minar.
- Para ASICs (Ejemplo: Bitmain Antminer):
  1. Inicia sesión en el panel web.
  2. Ve a Configuración del Minero.
  3. Añade los datos del pool:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Nombre de usuario: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Contraseña: x (o en blanco).
  4. Guarda y reinicia el minero.
- Para otro software (p. ej., GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Prueba:** Ejecútalo durante 10-15 minutos; revisa la consola para ver shares aceptadas y hashrate.

### Paso 5: Empieza a Minar y Monitorea
1. Inicia el minero: se conectará al pool y comenzará a enviar shares.
2. Monitorea mediante:
   - Panel del pool: Introduce la dirección de tu wallet para ver hashrate, saldo no pagado y estadísticas.
   - Consola del software: Observa errores, temperatura (mantén < 80 grados C).
   - Herramientas: Usa HiveOS o SimpleMining OS para la gestión remota del rig.
3. Pagos: La mayoría de los pools pagan automáticamente cuando alcanzas el mínimo (p. ej., 0.05 ZEC). Consulta las reglas del pool.

   
![Configuración de Monitoreo de Minería de Zcash](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Pool de Testnet y Red de Relay

Sovright (sovright.com) ejecuta un pool de minería Stratum V2 y una red separada de relay de bloques. Cumplen funciones distintas, por lo que se tratan por separado a continuación.

### Pool de Minería (mining.sovright.com)

El pool de Sovright funciona en una testnet pública de Zcash (NU6, Stratum V2), no en mainnet. La testnet no paga ZEC reales. Úsalo para probar la configuración de tu minero, no para ganar.

- No se requiere cuenta para empezar. Apunta un minero Equihash de CPU o ASIC al pool y tus shares aparecerán en un panel en vivo.
- Sovright también publica un proxy Stratum V2 de código abierto para mineros que quieran elegir sus propias plantillas de bloques en lugar de simplemente tomar los trabajos del pool:

### Monitoreo de Foundry Zcash Pool

Para usuarios de Foundry Zcash Pool:

- Monitorea el rendimiento del minero a través del panel del pool de Foundry.
- Revisa:
  - Workers activos
  - Hashrate reportado
  - Shares aceptadas
  - Recompensas estimadas
  - Estado de pagos

Debido a que Foundry usa un modelo de recompensas PPLNS, las recompensas de minería dependen de las shares aportadas durante la ventana de recompensas del pool en lugar de depender solo del hashrate instantáneo.

Prácticas recomendadas de monitoreo:
- Compara el hashrate del panel del ASIC con el hashrate reportado por Foundry.
- Investiga shares rechazadas, shares stale o inestabilidad de conexión.
- Mantén una conectividad de red estable porque el tiempo de inactividad reduce las shares enviadas y las posibles recompensas.
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
- La página de transparencia de Sovright indica una política de "include all" para transacciones blindadas, a diferencia de algunos pools que las filtran. Cada bloque recibe una atestación firmada para que la política pueda verificarse de forma independiente.
- Crea una cuenta en mining.sovright.com (inicio de sesión con Google o correo electrónico) para rastrear tus propios workers en lugar de los datos de ejemplo del panel.

### Red de Relay (relay.sovright.com)

Sovright ejecuta por separado una red pública de relay de bloques en la mainnet de Zcash. Cuando un pool encuentra un bloque, la rapidez con que ese bloque llega al resto de la red determina con qué frecuencia queda huérfano, lo que significa que pierde la carrera de propagación y se pierde la recompensa correspondiente. La red de relay reenvía bloques a través de cuatro regiones usando relay de bloques compactos con corrección de errores hacia adelante.

El panel público muestra el efecto en vivo: las regiones conectadas al relay ven bloques nuevos en bastante menos de la mitad del tiempo que toma el gossip peer to peer normal, y el panel rastrea la tasa de huérfanos en vivo de la red.

Esta es infraestructura para operadores de pools, no para mineros individuales. El repositorio de código abierto `mining-infra` de Sovright documenta una puerta de enlace de relay `submitblock` para distribuir bloques encontrados en la malla más rápido que el P2P nativo. Para conectarte, contacta directamente con Sovright (support@sovright.com) para obtener direcciones de pares del relay y una clave de autenticación.


## Consejos y Mejores Prácticas
- **Rentabilidad:** Usa calculadoras como whattomine.com/coins/166-zec-equihash. Ejemplo: una RTX 3060 (~300 Sol/s) genera ~0.001 ZEC/día a $50/ZEC, menos ~$0.50 de electricidad.
- **Privacidad:** Usa pools blindados si están disponibles; evita reutilizar direcciones.
- **Seguridad:** Usa contraseñas seguras; habilita 2FA en pools/wallets. Nunca compartas claves privadas.
- **Solución de Problemas:** Si no hay shares, revisa el firewall, el antivirus o una configuración incorrecta. Únete a foros como forum.zcashcommunity.com o Reddit r/zec.
- **Alternativas:** Si no es rentable, considera la minería en la nube o hacer staking de otras monedas.
- **Nota Ambiental:** La minería consume energía; usa fuentes renovables si es posible.
- **Actualizaciones:** Zcash puede evolucionar (p. ej., un posible cambio a PoS); consulta z.cash para ver noticias.
