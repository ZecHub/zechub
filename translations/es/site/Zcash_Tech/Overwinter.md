<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Overwinter

> Overwinter entró en funcionamiento en la red principal de Zcash en el bloque [block] 347,500 (26 de junio de 2018 UTC).

Lo que aprenderás: cómo Zcash aprendió a cambiar sus propias reglas de forma segura y por qué esa base hizo posible cada actualización posterior, empezando por Sapling.

Overwinter es una Zcash [actualización de red network upgrade](../start-here/network-upgrades), la primera después del lanzamiento de la red. Se define en varias Propuestas de Mejora de Zcash: [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203) y [ZIP 143](https://zips.z.cash/zip-0143). Overwinter no añadió ninguna función blindada [shielded] nueva. En su lugar, reforzó el protocolo para que las futuras actualizaciones pudieran implementarse de forma segura. La actualización está documentada por el [Electric Coin Company](../zcash-organizations/electric-coin-company) en la página oficial de actualizaciones de Zcash.

Por qué esto importa. Cambiar las reglas de una blockchain activa es peligroso. Si se hace mal, dos versiones de la red pueden discrepar, o una transacción [transaction] destinada a una red [chain] puede copiarse en otra. Antes de Overwinter, Zcash no tenía una forma estándar y segura contra repeticiones de coordinar un cambio de reglas. Overwinter solucionó eso. Le dio a Zcash un proceso formal para las actualizaciones y, algo igual de importante, protección contra repetición [replay protection] bidireccional, de modo que una transacción válida bajo un conjunto de reglas no pueda repetirse bajo otro. Esa base es lo que hizo posible activar limpiamente Sapling y todas las actualizaciones posteriores.

![Before and after Overwinter: before, no standard upgrade path and no replay protection. After, a network upgrade mechanism with two-way replay protection and safe future upgrades](/content-images/overwinter-before-after-acf4f5d283.webp)

## El mecanismo de actualización

Overwinter introdujo el Mecanismo de Actualización de Red [Network Upgrade Mechanism], definido en [ZIP 200](https://zips.z.cash/zip-0200). Ahora cada actualización define dos cosas: un identificador de rama de consenso [consensus branch id] que nombra el conjunto actual de reglas y una altura de activación [activation height], el bloque en el que entran en vigor las nuevas reglas. Esto brinda a todos los que ejecutan software de nodo [node] de Zcash un plazo claro para actualizar antes del cambio.

Overwinter se activó en la red principal en el bloque 347,500.

[ZIP 201](https://zips.z.cash/zip-0201) establece cómo se tratan entre sí los nodos durante una actualización. Antes de la activación, los nodos prefieren conectarse a pares que ejecutan la misma versión. En la activación, un nodo se desconecta de los pares que están en una rama de consenso diferente, de modo que la red se divide limpiamente según las nuevas reglas en lugar de confundirse.

## Protección contra repetición

Una repetición ocurre cuando alguien toma una transacción válida en una red y la retransmite en otra. Overwinter cierra esa posibilidad con un nuevo esquema de firma [signature], definido en [ZIP 143](https://zips.z.cash/zip-0143). Cuando una billetera [wallet] firma una transacción, la firma ahora se compromete con el identificador de rama de consenso de la red actual. Una transacción firmada para una rama simplemente no es válida en ninguna otra rama, en ninguna dirección. Eso es lo que significa la protección contra repetición bidireccional.

Esto funciona junto con el nuevo formato de transacción de versión 3 de [ZIP 202](https://zips.z.cash/zip-0202), a veces llamado formato Overwintered. Añade una bandera fOverwintered y un identificador de grupo de versión que dejan claro a qué conjunto de reglas de consenso pertenece una transacción. Como beneficio adicional, el nuevo esquema de firma también mejoró la rapidez con la que se validan las transacciones transparentes [transparent].

![How replay protection works: a wallet signs a transaction that commits to the current consensus branch id, so the transaction cannot be replayed on any other branch](/content-images/overwinter-replay-flow-754ec8578a.webp)

## Caducidad de transacciones [Transaction expiry]

[ZIP 203](https://zips.z.cash/zip-0203) añadió la caducidad de transacciones. Ahora una transacción puede establecer una altura de bloque de vencimiento. Si no ha sido minada [mined] para esa altura, los nodos la eliminan del mempool, la sala de espera de las transacciones sin confirmar. Antes de esto, una transacción podía permanecer sin confirmar durante mucho tiempo. La caducidad significa que una transacción atascada finalmente se elimina por sí sola, lo que reduce tu incertidumbre y evita que el mempool se llene de transacciones antiguas sin minar.

## Dónde encaja

Overwinter fue la primera actualización de red de Zcash después del lanzamiento de la red principal en octubre de 2016, y se implementó deliberadamente antes de Sapling. Su función era infraestructura, no funciones. Al instalar primero el mecanismo de actualización y la maquinaria de protección contra repetición, proporcionó a cada actualización posterior (Sapling, Blossom, Heartwood, Canopy, NU5 y las siguientes) una vía segura para activarse.

![Timeline from the October 2016 Sprout launch, through the 2016 to 2018 stretch with no upgrade framework, to Overwinter in June 2018](/content-images/overwinter-timeline-689d9bcf20.webp)

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Network upgrade (NU) | Un cambio coordinado en las reglas de consenso de Zcash, activado a una altura de bloque establecida |
| Consensus branch id | Un identificador corto que nombra el conjunto actual de reglas de consenso |
| Activation height | El bloque en el que entran en vigor las nuevas reglas de una actualización de red |
| Replay protection | Una regla que impide que una transacción válida en una red se reutilice en otra |
| Mempool | El pool [pool] de transacciones que se han transmitido, pero que aún no se han minado en un bloque |
| Transaction expiry | Una altura de bloque de vencimiento después de la cual se elimina una transacción sin minar |

## Preguntas frecuentes

¿Overwinter cambió mi ZEC o mi privacidad [privacy]? No. Overwinter no añadió funciones nuevas ni modificó las transacciones blindadas. Fue infraestructura para futuras actualizaciones seguras. Tus fondos y tu privacidad no se vieron afectados.

¿Overwinter añadió Sapling o direcciones blindadas? No. Overwinter no añadió funciones blindadas. Preparó el terreno para que Sapling pudiera activarse de forma segura más adelante.

¿Qué es un identificador de rama de consenso? Es una etiqueta corta que nombra el conjunto actual de reglas. Las transacciones se comprometen con él cuando se firman, lo que proporciona a Zcash su protección contra repetición.

¿Por qué algunas fuentes dicen 25 de junio y otras 26 de junio? Overwinter se activó a las 01:37 UTC del 26 de junio de 2018. Eso fue apenas después de la medianoche UTC, por lo que en muchas zonas horarias occidentales el reloj local todavía marcaba el 25 de junio. Es el mismo bloque y el mismo momento.

¿Para qué sirve la caducidad de transacciones? Significa que una transacción que nunca llega a minarse no permanecerá indefinidamente. Después de su altura de vencimiento, los nodos la eliminan, para que no te quedes preguntándote qué ocurre con un pago [payment] atascado.

¿Debo hacer algo? No. Overwinter se activó en 2018. Cualquier billetera o nodo actual de Zcash ya sigue estas reglas.

## Pon a prueba tu comprensión

Overwinter no añadió funciones blindadas nuevas. Entonces, ¿por qué se considera una de las actualizaciones más importantes de la historia de Zcash?

<details>
<summary>Respuesta</summary>

Porque construyó la maquinaria de la que depende cada actualización posterior. Overwinter introdujo el Mecanismo de Actualización de Red y la protección contra repetición bidireccional, dando a Zcash una forma estándar y segura de cambiar sus reglas de consenso. Sin esa base, Sapling y las actualizaciones posteriores no habrían podido activarse limpiamente.
</details>

### Recursos

[ZIP 200: Mecanismo de Actualización de Red](https://zips.z.cash/zip-0200)

[ZIP 201: Gestión de Pares de Red para Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202: Formato de Transacción de Versión 3 para Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203: Caducidad de Transacciones](https://zips.z.cash/zip-0203)

[ZIP 143: Validación de Firmas de Transacciones para Overwinter](https://zips.z.cash/zip-0143)

[Overwinter Actualización de Red](https://z.cash/upgrade/overwinter/)

### Véase también

[Zcash Actualizaciones de Red](../start-here/network-upgrades)

[Pools Blindados](../using-zcash/shielded-pools)

[Nodos Completos](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Qué es ZEC y Zcash](../start-here/what-is-zec-and-zcash)

---

Serie: [Índice de Actualizaciones de Red](../start-here/network-upgrades) · Anterior: [Sprout](../zcash-tech/sprout) · Siguiente: [Sapling](../zcash-tech/sapling)
