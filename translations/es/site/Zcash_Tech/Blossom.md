---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom se activó en la mainnet de Zcash en el bloque 653,600 (11 de diciembre de 2019 UTC).

Lo que aprenderás: cómo Blossom hizo que los bloques de Zcash llegaran aproximadamente el doble de rápido sin cambiar la cantidad de ZEC que la red crea con el paso del tiempo.

Blossom es una [actualización de red](../start-here/network-upgrades) de Zcash. Fue implementada mediante [ZIP 206](https://zips.z.cash/zip-0206), y su principal cambio de consenso está definido en [ZIP 208](https://zips.z.cash/zip-0208). Blossom fue una actualización de escalabilidad: redujo el tiempo objetivo entre bloques de 150 segundos a 75 segundos, por lo que los bloques llegan aproximadamente el doble de seguido. Electric Coin Company lideró y anunció Blossom.

Por qué esto importa. Cuando envías ZEC, esperas a que la red lo confirme en un bloque. Si los bloques son lentos, esperas más tiempo. Antes de Blossom, se esperaba un nuevo bloque aproximadamente cada 150 segundos. Blossom redujo ese objetivo a la mitad, hasta 75 segundos, de modo que las confirmaciones llegan antes y la cadena puede transportar más transacciones en la misma cantidad de tiempo. Lo hizo sin crear más ZEC ni adelantar el momento de los futuros halvings.

## Bloques más rápidos

El cambio central de Blossom es simple. El espaciado objetivo entre bloques de Zcash, el tiempo al que la red apunta entre un bloque y el siguiente, bajó de 150 segundos a 75 segundos ([ZIP 208](https://zips.z.cash/zip-0208)). Los bloques se encuentran mediante proof of work, así que el intervalo real entre ellos varía, pero la red ahora apunta a un bloque aproximadamente cada 75 segundos en lugar de cada 150.

De esto se desprenden dos cosas:

1. Los bloques llegan aproximadamente el doble de seguido, por lo que la cadena puede transportar aproximadamente el doble de transacciones por unidad de tiempo.
2. Tu transacción recibe su primera confirmación antes, porque no esperas tanto al siguiente bloque.

![Antes de Blossom el objetivo entre bloques era de 150 segundos, con confirmaciones más lentas y menor rendimiento. Después de Blossom el objetivo es de 75 segundos, con confirmaciones más rápidas y aproximadamente el doble de rendimiento](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## Mantener estable la emisión

Los bloques más rápidos plantean una pregunta. Si Zcash produjera el doble de bloques y cada bloque siguiera pagando la misma recompensa, la red crearía ZEC dos veces más rápido. Blossom evita eso. Redujo a la mitad la recompensa pagada por bloque y duplicó el intervalo de halving de la recompensa de bloque de 840,000 a 1,680,000 bloques ([ZIP 208](https://zips.z.cash/zip-0208)). El doble de bloques, cada uno pagando la mitad, da como resultado la misma cantidad de ZEC creada por unidad de tiempo. El calendario de suministro total y el momento de los futuros halvings, medidos en tiempo real, no cambiaron.

![Cómo Blossom mantiene estable la emisión: los bloques de 75 segundos llegan el doble de seguido, la recompensa por bloque se reduce a la mitad, el intervalo de halving se duplica, por lo que la emisión total con el paso del tiempo se mantiene igual](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## Una actualización obligatoria

Blossom fue un cambio de consenso bilateral, lo que significa que cada nodo tuvo que actualizarse para seguir la cadena ([ZIP 206](https://zips.z.cash/zip-0206)). No era opcional para un operador de nodo que quisiera mantenerse sincronizado. Blossom se activó en el bloque 653,600 de mainnet y tiene su propio consensus branch id, una etiqueta que permite a los nodos y a las transacciones confirmar que están siguiendo las reglas de Blossom. La actualización utilizó el mecanismo estándar de actualizaciones de red de Zcash ([ZIP 200](https://zips.z.cash/zip-0200)).

## Dónde encaja Blossom

Blossom fue la tercera actualización de red de Zcash. Siguió a Overwinter y Sapling, y llegó antes que Heartwood y Canopy. A diferencia de Sapling, que reformuló la criptografía blindada de Zcash, Blossom se centró en la escala y la velocidad. Su trabajo principal era la temporización de bloques, no nuevas funciones de privacidad.

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Espaciado objetivo entre bloques | El tiempo al que la red apunta entre un bloque y el siguiente |
| Recompensa de bloque | Los nuevos ZEC creados y pagados cuando se mina cada bloque |
| Intervalo de halving | Cuántos bloques transcurren entre cada halving de la recompensa de bloque |
| Consensus branch id | Una etiqueta que marca qué conjunto de reglas de red está siguiendo un nodo o una transacción |
| Cambio de consenso bilateral | Un cambio de reglas que cada nodo debe adoptar para permanecer en la red |
| Actualización de red (NU) | Un cambio coordinado en las reglas de consenso de Zcash, activado a una altura de bloque determinada |

## Preguntas frecuentes

¿Blossom cambia cuánto ZEC existe o cuándo ocurren los halvings? No. La recompensa por bloque se redujo a la mitad y el intervalo de halving se duplicó al mismo tiempo, por lo que la cantidad de ZEC creada por unidad de tiempo, y el momento de los futuros halvings, se mantuvieron iguales.

¿Blossom cambia mi ZEC o mi privacidad? No. Blossom cambió la temporización de bloques y las matemáticas de las recompensas. No tocó tus saldos ni tus transacciones blindadas.

¿Qué significan realmente 75 segundos? Es un objetivo, no una garantía. Los bloques se encuentran mediante proof of work, por lo que el intervalo real entre bloques varía. La red apunta a uno aproximadamente cada 75 segundos en lugar de cada 150.

¿Tuve que hacer algo cuando Blossom se activó? Si ejecutabas un nodo completo, necesitabas actualizarlo, porque Blossom era obligatoria. Si usabas una wallet, necesitabas una versión compatible con las nuevas reglas.

¿Por qué reducir a la mitad la recompensa de bloque? Porque los bloques ahora llegan dos veces más rápido. Reducir a la mitad la recompensa por bloque evita que la red cree ZEC el doble de rápido.

¿Cuándo se activó Blossom? En el bloque 653,600 de mainnet, el 11 de diciembre de 2019 UTC.

## Pon a prueba tu comprensión

Blossom hizo que los bloques de Zcash llegaran aproximadamente el doble de seguido. ¿Por qué eso no duplicó la velocidad a la que se crea nuevo ZEC?

<details>
<summary>Respuesta</summary>

Porque Blossom también redujo a la mitad la recompensa pagada por bloque y duplicó el intervalo de halving de 840,000 a 1,680,000 bloques. El doble de bloques, cada uno pagando la mitad, suma la misma cantidad de ZEC por unidad de tiempo, por lo que el calendario de emisión medido en tiempo real no cambió.
</details>

### Recursos

[ZIP 208: Espaciado objetivo entre bloques más corto](https://zips.z.cash/zip-0208)

[ZIP 206: Implementación de la actualización de red Blossom](https://zips.z.cash/zip-0206)

[Actualización de red Blossom](https://z.cash/upgrade/blossom/)

[La actualización Blossom mejora la velocidad, la escalabilidad y la capacidad (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Ver también

[Actualizaciones de red de Zcash](../start-here/network-upgrades)

[Política monetaria de Zcash](../start-here/zcash-monetary-policy)

[Qué son ZEC y Zcash](../start-here/what-is-zec-and-zcash)

[Nodos completos](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Anterior: [Sapling](../zcash-tech/sapling) · Siguiente: [Heartwood](../zcash-tech/heartwood)
