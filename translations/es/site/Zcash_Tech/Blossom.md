<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom se activó en la red principal de Zcash en el bloque 653,600 (11 de diciembre de 2019 UTC).

Lo que aprenderás: cómo Blossom hizo que los bloques de Zcash llegaran aproximadamente el doble de rápido sin cambiar la cantidad de ZEC que la red crea con el tiempo.

Blossom es una Zcash [actualización de red network upgrade](../start-here/network-upgrades). Fue implementada mediante [ZIP 206](https://zips.z.cash/zip-0206), y su principal cambio de consenso se define en [ZIP 208](https://zips.z.cash/zip-0208). Blossom fue una actualización de escalabilidad: redujo el tiempo objetivo entre bloques de 150 segundos a 75 segundos, por lo que los bloques llegan aproximadamente el doble de veces. El Electric Coin Company lideró y anunció Blossom.

Por qué esto importa. Cuando envías ZEC, esperas a que la red la confirme en un bloque. Si los bloques son lentos, esperas más. Antes de Blossom, se esperaba un bloque nuevo aproximadamente cada 150 segundos. Blossom redujo ese objetivo a la mitad, a 75 segundos, por lo que las confirmaciones llegan antes y la cadena puede transportar más transacciones en el mismo tiempo. Lo hizo sin crear más ZEC ni modificar el momento de futuros halvings.

## Bloques más rápidos

El cambio principal de Blossom es sencillo. El espaciado objetivo de bloques de Zcash, el tiempo que la red busca mantener entre un bloque y el siguiente, bajó de 150 segundos a 75 segundos ([ZIP 208](https://zips.z.cash/zip-0208)). Los bloques se encuentran mediante prueba de trabajo [proof of work], por lo que la separación real entre ellos varía, pero ahora la red aspira a un bloque aproximadamente cada 75 segundos en lugar de cada 150.

De ello se desprenden dos cosas:

1. Los bloques llegan aproximadamente el doble de veces, por lo que la cadena puede transportar aproximadamente el doble de transacciones por unidad de tiempo.
2. Tu transacción recibe su primera confirmación antes, porque no esperas tanto al siguiente bloque.

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## Mantener estable la emisión

Los bloques más rápidos plantean una pregunta. Si Zcash produjera el doble de bloques y cada bloque siguiera pagando la misma recompensa, la red crearía ZEC al doble de velocidad. Blossom evita eso. Redujo a la mitad la recompensa pagada por bloque y duplicó el intervalo de halving de la recompensa de bloque de 840,000 a 1,680,000 bloques ([ZIP 208](https://zips.z.cash/zip-0208)). El doble de bloques, cada uno pagando la mitad, da como resultado la misma cantidad de ZEC creada por unidad de tiempo. El calendario total de suministro y el momento de futuros halvings, medidos en tiempo real, no cambiaron.

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](/content-images/blossom-emission-balance-f2443e29ab.webp)

## Una actualización obligatoria

Blossom fue un cambio de consenso bilateral, lo que significa que cada nodo tuvo que actualizarse para seguir la cadena ([ZIP 206](https://zips.z.cash/zip-0206)). No era opcional para un operador de nodo que quisiera mantenerse sincronizado. Blossom se activó en el bloque 653,600 de la red principal y tiene su propio id de rama de consenso, una etiqueta que permite a los nodos y las transacciones confirmar que siguen las reglas de Blossom. La actualización utilizó el mecanismo estándar de actualización de red de Zcash ([ZIP 200](https://zips.z.cash/zip-0200)).

## Dónde encaja Blossom

Blossom fue la tercera actualización de red de Zcash. Siguió a Overwinter y Sapling, y llegó antes de Heartwood y Canopy. A diferencia de Sapling, que reformuló la criptografía blindada de Zcash, Blossom se centró en la escala y la velocidad. Su principal función era el tiempo de los bloques, no nuevas funciones de privacidad.

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Block target spacing | El tiempo al que aspira la red entre un bloque y el siguiente |
| Block reward | Los nuevos ZEC creados y distribuidos a medida que se mina cada bloque |
| Halving interval | Cuántos bloques transcurren entre cada halving de la recompensa de bloque |
| Consensus branch id | Una etiqueta que indica qué conjunto de reglas de red sigue un nodo o una transacción |
| Bilateral consensus change | Un cambio de reglas que cada nodo debe adoptar para permanecer en la red |
| Network upgrade (NU) | Un cambio coordinado de las reglas de consenso de Zcash, activado a una altura de bloque determinada |

## Preguntas frecuentes

¿Blossom cambia la cantidad de ZEC que existe o cuándo ocurren los halvings? No. La recompensa por bloque se redujo a la mitad y el intervalo de halving se duplicó al mismo tiempo, por lo que la cantidad de ZEC creada por unidad de tiempo y el momento de futuros halvings se mantuvieron iguales.

¿Blossom cambia mi ZEC o mi privacidad? No. Blossom cambió el tiempo de los bloques y las matemáticas de las recompensas. No modificó tus saldos ni tus transacciones blindadas.

¿Qué significan realmente 75 segundos? Es un objetivo, no una garantía. Los bloques se encuentran mediante prueba de trabajo, por lo que la separación real entre bloques varía. La red aspira a uno aproximadamente cada 75 segundos en lugar de cada 150.

¿Tenía que hacer algo cuando se activó Blossom? Si ejecutabas un nodo completo, necesitabas actualizarlo, porque Blossom era obligatorio. Si usabas una billetera, necesitabas una versión compatible con las nuevas reglas.

¿Por qué reducir a la mitad la recompensa de bloque? Porque los bloques ahora llegan al doble de velocidad. Reducir a la mitad la recompensa por bloque evita que la red cree ZEC al doble de rapidez.

¿Cuándo se activó Blossom? En el bloque 653,600 de la red principal, el 11 de diciembre de 2019 UTC.

## Pon a prueba tu comprensión

Blossom hizo que los bloques de Zcash llegaran aproximadamente el doble de veces. ¿Por qué eso no duplicó la tasa a la que se crea nuevo ZEC?

<details>
<summary>Respuesta</summary>

Porque Blossom también redujo a la mitad la recompensa pagada por bloque y duplicó el intervalo de halving de 840,000 a 1,680,000 bloques. El doble de bloques, cada uno pagando la mitad, suma la misma cantidad de ZEC por unidad de tiempo, por lo que el calendario de emisión medido en tiempo real no cambió.
</details>

### Recursos

[ZIP 208: Espaciado objetivo de bloques más corto](https://zips.z.cash/zip-0208)

[ZIP 206: Implementación de la actualización de red de Blossom](https://zips.z.cash/zip-0206)

[Blossom Actualización de red](https://z.cash/upgrade/blossom/)

[Blossom La actualización mejora la velocidad, la escalabilidad y la capacidad (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Véase también

[Zcash Actualizaciones de red](../start-here/network-upgrades)

[Zcash Política monetaria](../start-here/zcash-monetary-policy)

[¿Qué es ZEC y Zcash](../start-here/what-is-zec-and-zcash)

[Nodos completos](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Anterior: [Sapling](../zcash-tech/sapling) · Siguiente: [Heartwood](../zcash-tech/heartwood)
