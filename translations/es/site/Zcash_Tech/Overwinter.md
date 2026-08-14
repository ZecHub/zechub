---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Overwinter

> Overwinter se activó en la mainnet de Zcash en el bloque 347,500 (26 de junio de 2018 UTC).

Qué aprenderás: cómo Zcash aprendió a cambiar sus propias reglas de forma segura, y por qué esa base hizo posible cada actualización posterior, empezando por Sapling.

Overwinter es una [actualización de red](../start-here/network-upgrades) de Zcash, la primera después del lanzamiento de la red. Está definida en varias Propuestas de Mejora de Zcash: [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203) y [ZIP 143](https://zips.z.cash/zip-0143). Overwinter no añadió ninguna funcionalidad shielded nueva. En cambio, reforzó el protocolo para que las futuras actualizaciones pudieran implementarse de forma segura. La actualización está documentada por [Electric Coin Company](../zcash-organizations/electric-coin-company) en la página oficial de actualizaciones de Zcash.

Por qué importa. Cambiar las reglas de una blockchain en funcionamiento es peligroso. Si sale mal, dos versiones de la red pueden entrar en desacuerdo, o una transacción destinada a una cadena puede copiarse en otra. Antes de Overwinter, Zcash no tenía una forma estándar y segura frente a replay attacks de coordinar un cambio de reglas. Overwinter solucionó eso. Le dio a Zcash un proceso formal para las actualizaciones y, igual de importante, protección de replay bidireccional, de modo que una transacción válida bajo un conjunto de reglas no pueda reproducirse bajo otro. Esa base es lo que permitió que Sapling, y todas las actualizaciones posteriores, pudieran activarse limpiamente.

![Antes y después de Overwinter: antes, no había una ruta estándar de actualización ni protección contra replay. Después, un mecanismo de actualización de red con protección de replay bidireccional y actualizaciones futuras seguras](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## El mecanismo de actualización

Overwinter introdujo el Mecanismo de Actualización de Red, definido en [ZIP 200](https://zips.z.cash/zip-0200). Ahora cada actualización define dos cosas: un consensus branch id que nombra el conjunto actual de reglas, y una altura de activación, el bloque en el que las nuevas reglas entran en vigor. Esto les da a todos los que ejecutan software de Zcash una ventana clara para actualizar antes del cambio.

Overwinter mismo se activó en mainnet en el bloque 347,500.

[ZIP 201](https://zips.z.cash/zip-0201) gestiona cómo se tratan entre sí los nodos alrededor de una actualización. Antes de la activación, los nodos prefieren conectarse a pares que ejecutan la misma versión. En el momento de la activación, un nodo se desconecta de los pares que están en una rama de consenso distinta, de modo que la red se separa limpiamente según las nuevas reglas en lugar de confundirse.

## Protección contra replay

Un replay ocurre cuando alguien toma una transacción que era válida en una cadena y la vuelve a difundir en otra. Overwinter cierra esa puerta con un nuevo esquema de firmas, definido en [ZIP 143](https://zips.z.cash/zip-0143). Cuando una wallet firma una transacción, la firma ahora se compromete con el consensus branch id de la cadena actual. Una transacción firmada para una rama simplemente no es válida en ninguna otra rama, en ninguna dirección. Eso es lo que significa la protección de replay bidireccional.

Esto funciona de la mano con el nuevo formato de transacción versión 3 de [ZIP 202](https://zips.z.cash/zip-0202), a veces llamado formato Overwintered. Añade una bandera fOverwintered y un version group id que dejan claro a qué conjunto de reglas de consenso pertenece una transacción. Como beneficio adicional, el nuevo esquema de firmas también mejoró la rapidez con la que se validan las transacciones transparentes.

![Cómo funciona la protección contra replay: una wallet firma una transacción que se compromete con el consensus branch id actual, por lo que la transacción no puede reproducirse en ninguna otra rama](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## Expiración de transacciones

[ZIP 203](https://zips.z.cash/zip-0203) añadió la expiración de transacciones. Ahora una transacción puede establecer una altura de bloque de expiración. Si no ha sido minada para esa altura, los nodos la eliminan del mempool, la sala de espera de las transacciones sin confirmar. Antes de esto, una transacción podía permanecer sin confirmar durante mucho tiempo. La expiración significa que una transacción atascada finalmente se limpia por sí sola, lo que reduce la incertidumbre para ti y evita que el mempool se llene de transacciones antiguas que no se han minado.

## Dónde encaja

Overwinter fue la primera actualización de red de Zcash después del lanzamiento de la mainnet en octubre de 2016, y se implementó deliberadamente antes de Sapling. Su función era de infraestructura, no de funcionalidades. Al instalar primero el mecanismo de actualización y la maquinaria de protección contra replay, dio a cada actualización posterior (Sapling, Blossom, Heartwood, Canopy, NU5 y las siguientes) una vía segura para activarse.

![Línea de tiempo desde el lanzamiento de Sprout en octubre de 2016, pasando por el período de 2016 a 2018 sin un marco de actualizaciones, hasta Overwinter en junio de 2018](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## Glosario

| Término | Significado en lenguaje claro |
|---|---|
| Network upgrade (NU) | Un cambio coordinado en las reglas de consenso de Zcash, activado a una altura de bloque determinada |
| Consensus branch id | Un identificador corto que nombra el conjunto actual de reglas de consenso |
| Activation height | El bloque en el que entran en vigor las nuevas reglas de una actualización de red |
| Replay protection | Una regla que impide que una transacción válida en una cadena sea reutilizada en otra |
| Mempool | El conjunto de transacciones que han sido difundidas pero aún no minadas en un bloque |
| Transaction expiry | Una altura de bloque de expiración tras la cual una transacción no minada es descartada |

## Preguntas frecuentes

¿Overwinter cambió mi ZEC o mi privacidad? No. Overwinter no añadió nuevas funcionalidades y no tocó las transacciones shielded. Fue la fontanería necesaria para futuras actualizaciones seguras. Tus fondos y tu privacidad no se vieron afectados.

¿Overwinter añadió Sapling o direcciones shielded? No. Overwinter no añadió ninguna funcionalidad shielded. Preparó el terreno para que Sapling pudiera activarse con seguridad más adelante.

¿Qué es un consensus branch id? Es una etiqueta corta que nombra el conjunto actual de reglas. Las transacciones se comprometen con ella cuando se firman, y eso es lo que le da a Zcash su protección contra replay.

¿Por qué algunas fuentes dicen 25 de junio y otras 26 de junio? Overwinter se activó a las 01:37 UTC del 26 de junio de 2018. Eso es justo después de la medianoche UTC, así que en muchas zonas horarias occidentales el reloj local aún marcaba el 25 de junio. Es el mismo bloque y el mismo momento.

¿Para qué sirve la expiración de transacciones? Significa que una transacción que nunca llega a minarse no permanecerá allí para siempre. Después de su altura de expiración, los nodos la descartan, así que no te quedas adivinando qué pasó con un pago atascado.

¿Necesito hacer algo? No. Overwinter se activó en 2018. Cualquier wallet o nodo actual de Zcash ya sigue estas reglas.

## Pon a prueba tu comprensión

Overwinter no añadió ninguna funcionalidad shielded nueva. Entonces, ¿por qué se considera una de las actualizaciones más importantes en la historia de Zcash?

<details>
<summary>Respuesta</summary>

Porque construyó la maquinaria de la que depende cada actualización posterior. Overwinter introdujo el Mecanismo de Actualización de Red y la protección de replay bidireccional, dándole a Zcash una forma estándar y segura de cambiar sus reglas de consenso. Sin esa base, Sapling y las actualizaciones posteriores no podrían haberse activado limpiamente.
</details>

### Recursos

[ZIP 200: Mecanismo de Actualización de Red](https://zips.z.cash/zip-0200)

[ZIP 201: Gestión de Pares de Red para Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202: Formato de Transacción Versión 3 para Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203: Expiración de Transacciones](https://zips.z.cash/zip-0203)

[ZIP 143: Validación de Firmas de Transacciones para Overwinter](https://zips.z.cash/zip-0143)

[Actualización de Red Overwinter](https://z.cash/upgrade/overwinter/)

### Ver también

[Actualizaciones de Red de Zcash](../start-here/network-upgrades)

[Pools Shielded](../using-zcash/shielded-pools)

[Nodos completos](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Qué son ZEC y Zcash](../start-here/what-is-zec-and-zcash)

---

Serie: [Índice de Actualizaciones de Red](../start-here/network-upgrades) · Anterior: [Sprout](../zcash-tech/sprout) · Siguiente: [Sapling](../zcash-tech/sapling)
