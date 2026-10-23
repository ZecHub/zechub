# ZIP 218: Lo que realmente cambia con los bloques de 25 segundos

En la encuesta a poseedores de monedas de NU7 que cerró el 14 de septiembre de 2026, unos 2.397.669 ZEC votaron a favor de ZIP 218 y 141,6 ZEC votaron en contra, un resultado del 99,9 %. La mayoría de la cobertura lo resumió como «los bloques de Zcash se vuelven más rápidos». Eso es cierto, pero omite gran parte de lo que hace la propuesta y de lo que deliberadamente mantiene igual.

Esta página explica ZIP 218 a partir de su propio texto: qué cambia, qué no cambia y cuál es su coste.

## La versión corta

| | Hoy | Después de ZIP 218 |
|---|---|---|
| Espaciado objetivo entre bloques | 75 segundos | 25 segundos |
| Bloques por día | 1.152 | 3.456 |
| Subsidio por bloque (era actual de halvings) | 1,5625 ZEC | 0,52083333 ZEC |
| Nuevos ZEC por día | sin cambios | sin cambios |
| Intervalo de halving | 1.680.000 bloques | 5.040.000 bloques |
| Límites de acciones blindadas por bloque | ninguno (solo el límite de tamaño de 2 MB) | 330 en total, con límites por pool |
| Rendimiento de Orchard (transacciones de 2 acciones) | unas 2,9 por segundo | unas 6,6 por segundo |

![ZIP 218 cuts block target spacing from 75 seconds to 25, tripling daily blocks from 1,152 to 3,456, while dividing the per-block subsidy by the same factor of three from 1.5625 to 0.52083333 ZEC, so daily issuance stays at 1,800 ZEC and the halving interval stretches from 1,680,000 to 5,040,000 blocks to hold halving dates fixed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-block-timing.png)

Tres veces más bloques, cada uno pagando un tercio. El calendario de suministro se mantiene donde estaba.

## Por qué cambiar el tiempo de bloque

El objetivo principal es un **menor tiempo de espera**. Hoy un pago espera 75 segundos de media para su primera confirmación, independientemente de la carga de la red. Con 25 segundos, esto baja a 25 segundos de media. El ZIP menciona los pagos en puntos de venta, depósitos en exchanges y bridges entre cadenas como los usos que más lo notan.

Conviene tener presentes dos puntos del ZIP:

- **No indica a nadie que use menos confirmaciones.** Para los usuarios que mantengan la misma tolerancia al riesgo de reversión que hoy, el ZIP espera que el tiempo de confirmación mejore algo menos de tres veces.
- **No sustituye el trabajo de finalidad.** El ZIP se describe como complementario a mecanismos de finalidad como Crosslink. Los bloques más rápidos de la capa base ayudan tanto si se añade posteriormente una capa de finalidad como si no.

El ZIP también señala que se podría haber conseguido un mayor rendimiento únicamente con un bloque de mayor tamaño. La latencia es la razón para elegir bloques más cortos en su lugar.

## Qué cambia

### Emisión: los mismos ZEC por día

Triplicar el número de bloques triplicaría la emisión diaria si no cambiara nada más. ZIP 218 lo evita dividiendo el subsidio por bloque por un factor adicional de tres una vez que NU7 esté activo.

En la era actual de halving, esto reduce el subsidio por bloque de **1,5625 ZEC a 0,52083333 ZEC** (52.083.333 zatoshi). Como 156.250.000 zatoshi no se divide exactamente entre tres, cada bloque redondea hacia abajo en un tercio de zatoshi. A lo largo de un intervalo completo de halving de 5.040.000 bloques, esto equivale a unos 0,0168 ZEC en total.

El subsidio es el total de nuevos ZEC creados por bloque. La parte existente destinada a financiación del desarrollo sigue tomándose de él, por lo que los mineros reciben menos que la cifra total, exactamente igual que hoy.

> **Una nota sobre la cifra de 0,26041666 ZEC.** La nota explicativa del borrador de ZIP imprime el subsidio posterior a NU7 como floor(156250000 / 6) = 0,26041666 ZEC, y algunas noticias la han repetido. Esa nota se equivoca por un factor de dos: 156.250.000 zatoshi ya es el subsidio posterior a Blossom, así que dividirlo entre seis aplica por segunda vez el factor de dos de Blossom además del factor de tres de NU7. La fórmula normativa da floor(1,250,000,000 / (2 · 3 · 4)) = 52.083.333 zatoshi con el índice de halving actual. El issue de implementación de Zebra para este cambio ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)) registra que la nota cuenta dos veces el factor de Blossom, indica a los implementadores que «implementen la fórmula, no la nota» y afirma que se ha presentado una corrección para el ZIP. La cifra correcta en la activación es **0,52083333 ZEC**.

### Los halvings mantienen su calendario

El intervalo de halving se triplica de 1.680.000 bloques a 5.040.000 bloques. Como los bloques llegan tres veces más a menudo, los halvings siguen produciéndose aproximadamente en el mismo momento que lo habrían hecho sin el cambio. El límite total de suministro no se ve afectado.

Esto es independiente de la otra cuestión sobre emisión de la encuesta de NU7, en la que los poseedores de monedas votaron por conservar los halvings en lugar de sustituirlos por una curva suavizada. ZIP 218 funciona con el modelo de halving existente y no lo cambia.

### Nuevos límites de acciones blindadas por bloque

ZIP 218 añade límites a la cantidad de actividad blindada que puede contener un único bloque:

| Límite | Máximo por bloque |
|---|---|
| Todos los pools blindados combinados | 330 (cada JoinSplit de Sprout cuenta como 2) |
| Acciones de Orchard | 330 |
| Entradas más salidas de Sapling | 300 |
| JoinSplits de Sprout | 25 |

Las partes transparentes de las transacciones no se ven afectadas, y el límite de tamaño de bloque de 2 MB sigue aplicándose.

Los límites existen porque, de otro modo, más bloques implicarían más trabajo para wallets y nodos. Con los límites establecidos, el peor caso en realidad mejora respecto a hoy, incluso con tres veces más bloques:

- **Sincronización de wallets:** la cantidad máxima de datos que se podría obligar a una wallet ligera a descargar en un día baja de unos 271 MB a unos 169 MB, aproximadamente una reducción del 38 %. Los descifrados de prueba en el peor caso bajan de unos 4,8 millones a unos 2,3 millones al día.
- **Verificación de bloques:** los benchmarks del ZIP sitúan un bloque de Orchard en el peor caso en unos 432 ms bajo los nuevos límites, frente a unos 770 ms para el peor caso actual. Para Sapling la reducción es mayor, de unos 3.175 ms a unos 272 ms.

Los límites de Sapling y Sprout son ajustados deliberadamente. En mayo de 2026, Orchard albergaba el 87,9 % de ZEC blindados, Sapling el 11,6 % y Sprout el 0,5 %, de modo que los pools más pequeños tienen espacio suficiente para su uso real, al tiempo que un atacante tiene menos que explotar. Como las comisiones de ZIP 317 cobran lo mismo por acción lógica en cada pool, un atacante no obtiene nada spameando un pool en lugar de otro.

### Rendimiento

Con 330 acciones de Orchard por bloque, una transacción estándar de Orchard de 2 acciones cabe ⌊330 / 2⌋ = 165 veces por bloque. Con un bloque cada 25 segundos, esto equivale a unas **6,6 transacciones por segundo**, frente a unas 2,9 hoy; el ZIP lo califica como un aumento de 2,3× en el rendimiento normal de Orchard. Sapling resulta en unas 3,0 por segundo, aún por encima de lo que Orchard logra hoy.

### Ajuste de dificultad

El algoritmo de dificultad calcula el promedio sobre una ventana de bloques recientes. ZIP 218 aumenta esa ventana de 17 bloques a 102, por lo que sigue cubriendo unos 2.550 segundos de tiempo real, el mismo período que cubría cuando Zcash se lanzó con bloques de 150 segundos. El ZIP da dos razones: evitar que los ataques de manipulación de dificultad sean más fáciles (cita el incidente de MWEB de Litecoin en abril de 2026) y suavizar la variación a corto plazo de los tiempos de bloque.

Justo después de la activación, los tiempos de bloque tardarán un tiempo en estabilizarse en el nuevo objetivo. Esto es previsible y refleja lo sucedido en Blossom, cuando Zcash pasó de 150 a 75 segundos.

### Valores predeterminados para nodos y wallets

Estas son recomendaciones para implementaciones, no reglas de consenso:

- **Caducidad de transacciones:** la caducidad predeterminada sube de 40 a 120 bloques, manteniendo aproximadamente los mismos 50 minutos.
- **Profundidad máxima de reorganización:** el límite de Zebra aumenta de 99 a 600 bloques, unas 4,2 horas a 25 segundos, la misma ventana que cubría en el lanzamiento.
- **Profundidad de ancla para transacciones blindadas:** se mantiene en 3 bloques, por lo que el retraso disminuye de 3,75 minutos a 1,25 minutos. El ZIP sigue aquí el precedente de Blossom.
- **Varias constantes de red** medidas en bloques se multiplican por tres para que cubran la misma cantidad de tiempo.

## Qué se mantiene igual

- ZEC emitidos por día, el calendario de halving y el límite de suministro
- El límite de tamaño de bloque de 2 MB
- Las transacciones transparentes, que los nuevos límites de acciones no afectan
- La madurez de Coinbase a los 100 bloques. Tenga en cuenta que ahora esto significa unos 42 minutos en lugar de unos 125, porque el recuento está en bloques, no en tiempo.

## La contrapartida: más bloques obsoletos

Los bloques más rápidos no son gratuitos. Un bloque obsoleto es un bloque válido que pierde la carrera por incluirse en la cadena porque otro bloque llegó primero a la red. Cuanto menor sea el intervalo entre bloques, más a menudo ocurre esto, y el ZIP relaciona la tasa de bloques obsoletos con la propagación de bloques, el tiempo de verificación y el riesgo de centralización de la minería.

- **Hoy:** aproximadamente un 0,4 %, que el ZIP señala que podría subestimar la tasa subyacente porque el hashpower está concentrado en pools.
- **Teórico a 25 segundos:** aproximadamente un 3,26 %, basado en los retrasos medidos de propagación de Zcash.
- **Prueba en devnet:** 99 nodos de Zebra distribuidos geográficamente que producían bloques completos de 2 MB con un espaciado de 25 segundos midieron una tasa de bloques obsoletos del 4,86 % y una tasa de forks del 0,37 %. El único ajuste necesario fue la configuración de TCP. Dado que esa devnet estaba más descentralizada que la mainnet actual, el ZIP considera estas cifras cercanas al peor caso.
- **Punto de referencia:** el ZIP utiliza como umbral de seguridad la tasa histórica de bloques obsoletos del 5,4 % de Ethereum con prueba de trabajo. Ambas cifras de la devnet se sitúan por debajo de ella.

También hay dos costes menores. Las wallets ligeras descargan unos 200 KB más al día de cabeceras de bloques compactas. Y, dado que hay tres veces más bloques, un nodo completo que ha estado desconectado tiene más bloques que procesar al ponerse al día, aunque cada bloque sea más barato de verificar. El ZIP acepta ambos.

## Estado y cronología

- **Estado de ZIP:** Borrador. Propietarios Dev Ojha y Evan Forbes; creado el 13 de marzo de 2026.
- **Encuesta a poseedores de monedas:** cerró el 14 de septiembre de 2026, con un 99,9 % de apoyo. La encuesta señala una preferencia; no modifica por sí misma las reglas de consenso.
- **Cronología:** en un anuncio del Community Forum de Zcash el 17 de septiembre, las organizaciones de desarrollo acordaron un calendario con código completo para el 30 de septiembre, NU7 en testnet el 6 de octubre, una decisión final y la altura de activación en mainnet el 20 de octubre, y una activación en mainnet prevista aproximadamente para el 5 de noviembre de 2026. El 5 de noviembre es un objetivo, no una fecha fija, hasta que se establezca la altura.
- **Implementación:** seguida en Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) y en Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)).

## Qué significa esto para usted

- **Mantener ZEC:** no hay nada que hacer. Su saldo y el calendario de suministro no se ven afectados.
- **Usar una wallet:** actualice cuando su wallet incorpore soporte para NU7. Las primeras confirmaciones llegarán aproximadamente tres veces antes.
- **Operar un nodo, exchange o servicio:** planifique actualizar antes de la activación y revise cualquier configuración medida en bloques, ya que un número fijo de bloques ahora cubre un tercio del tiempo que cubría antes.

## Fuentes

- [ZIP 218: Espaciado objetivo de bloques de 25 segundos](https://zips.z.cash/zip-0218)
- [ZIP 208: Espaciado objetivo de bloques más corto](https://zips.z.cash/zip-0208), el precedente de Blossom
- [Foro: Propuesta — Reducir el espaciado objetivo de bloques de Zcash a 25 s](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Foro: La reducción del tiempo de bloque de Zcash parece segura para NU7 con una devnet solo de Zebra](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [Zebra issue #11463](https://github.com/ZcashFoundation/zebra/issues/11463), intervalo de halving y subsidio posteriores a NU7
- [Zebra issue #11440](https://github.com/ZcashFoundation/zebra/issues/11440), seguimiento de la implementación de ZIP 218
- NU7 resultados de la encuesta y cronología, según informaron Bitcoin.com News, crypto.news y KuCoin (16–19 de septiembre de 2026)
