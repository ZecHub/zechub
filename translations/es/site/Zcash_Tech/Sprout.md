<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash se lanzó el 28 de octubre de 2016, con el pool [pool] blindado [shielded] Sprout.

> **Advertencia:** NU7 hará que los fondos de ZEC que aún estén en el pool Sprout no se puedan gastar una vez que se active (altura de activación de mainnet 3,543,405, prevista para el 5 de noviembre de 2026; consulta [ZIP 259](https://zips.z.cash/zip-0259)). Si tienes fondos de Sprout, lee [Recuperación de fondos](../using-zcash/recovering-funds) y migralos primero.

Lo que aprenderás: Sprout es donde comenzó Zcash, la primera vez que dinero privado y verificable funcionó en una blockchain [blockchain] activa.

Sprout es el lanzamiento original de la red Zcash, no una [actualización de red network upgrade](../start-here/network-upgrades) posterior. Entró en funcionamiento en el bloque génesis el 28 de octubre de 2016. Ninguna ZIP numerada define Sprout: el proceso de ZIP comenzó más tarde con Overwinter, por lo que Sprout se describe mediante la Especificación del Protocolo Zcash original y la construcción Zerocash en la que se basó. [Electric Coin Company](../zcash-organizations/electric-coin-company) (entonces la Electric Coin Company Zerocoin), liderada por Zooko Wilcox, la desarrolló y lanzó. Sprout introdujo las primeras transacciones blindadas [shielded] prácticas zk-SNARK y el pool [pool] blindado original, por lo que las personas podían enviar ZEC con el remitente, el receptor y el importe ocultos, mientras la red seguía comprobando que los saldos cuadraran. El nombre señalaba una cadena [chain] joven y en ciernes que el equipo esperaba que creciera.

Por qué importa esto. Todas las blockchains públicas anteriores a Sprout mostraban tus pagos: cualquiera podía ver quién pagaba a quién y cuánto. Sprout fue la primera red activa y sin permisos [permissionless] que ocultó esos detalles y aun así demostró que nadie hacía trampas. Esto importa para la privacidad financiera cotidiana, la clase de privacidad que esperas del efectivo o de un extracto bancario que nadie más puede leer. También demostró que una fuerte privacidad on-chain podía funcionar en la práctica, más allá de un diseño sobre el papel. La Ceremonia de configuración confiable [trusted setup] que lo hizo posible se convirtió en un punto de referencia para trabajos criptográficos posteriores, y el sistema de pruebas lento y exigente en memoria con el que se lanzó Sprout es precisamente lo que impulsó al equipo a crear Sapling dos años después.

## Primer pool blindado

Sprout creó dos tipos de direcciones [addresses]. Las direcciones transparentes (t-addresses) funcionan como Bitcoin, con los detalles visibles en el libro mayor público. Las direcciones blindadas (z-addresses) envían fondos al Sprout [pool blindado](../using-zcash/shielded-pools), donde el remitente, el destinatario y el importe permanecen ocultos. El truco son [zk-SNARKs](../zcash-tech/zk-snarks), pruebas zero-knowledge que permiten a una transacción demostrar que es válida, sin doble gasto y con saldos que cuadran, sin revelar ninguno de los detalles. Sprout fue la primera vez que esto funcionó en producción en una criptomoneda activa.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## La Ceremonia

El zk-SNARKs en Sprout necesitaba un conjunto de parámetros públicos, y generarlos de forma segura requería una configuración única llamada la Ceremonia. Seis participantes, en ubicaciones separadas y distantes, generaron cada uno una pieza secreta, llamada residuo tóxico. Si alguien alguna vez reuniera todas las piezas, podría falsificar ZEC de la nada. El diseño convirtió ese riesgo en una regla simple: mientras al menos un participante destruyera su pieza, el secreto completo nunca podría reconstruirse, por lo que la falsificación seguiría siendo imposible. Los participantes cuyos nombres se han hecho públicos incluyen a Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd y Derek Hinch de NCC Group. Un participante decidió permanecer anónimo.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## El origen

Sprout es la base sobre la que se construye cada cambio posterior. Cuando el mecanismo de actualización de red llegó con Overwinter, etiquetó las reglas originales como identificador de rama de consenso [consensus] 0, lo que simplemente significa que aún no se ha aplicado ninguna actualización. Todo lo ocurrido desde entonces (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6 y posteriores) se asienta sobre la cadena [chain] que inició Sprout. El lanzamiento se anunció en agosto de 2016 para un génesis el 28 de octubre, la Ceremonia se realizó en las semanas anteriores y la marca de tiempo codificada del bloque génesis indica el 28 de octubre de 2016 a las 07:56 UTC.

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](/content-images/sprout-timeline-348766352a.webp)

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| zk-SNARK | Una prueba zero-knowledge que demuestra que una transacción es válida sin revelar el remitente, el destinatario ni el importe |
| Shielded pool | El lado privado de Zcash donde los importes y las partes están ocultos. El pool Sprout fue el primero |
| z-address and t-address | Una z-address es blindada y mantiene los detalles privados. Una t-address es transparente y muestra los detalles en el libro mayor público |
| The Ceremony | La configuración multipartita de 2016 que generó los parámetros públicos de Sprout y después descartó el residuo tóxico |
| Toxic waste | Las piezas de clave secreta de la Ceremonia que debían destruirse para que ZEC no pudiera falsificarse |
| Consensus branch id 0 | La etiqueta de las reglas de Sprout, que significa la base anterior a cualquier actualización de red |

## Preguntas frecuentes

¿Sprout cambia mi ZEC o mi privacidad hoy? No. Sprout es historia, el lanzamiento que inició la cadena en la que vive tu ZEC. Tus monedas y tu privacidad hoy dependen de la billetera [wallet] y del pool blindado que uses ahora, no de nada que necesites hacer respecto a Sprout.

¿Por qué no hay un número ZIP para Sprout? El proceso ZIP comenzó más tarde, con la actualización Overwinter. Sprout es el lanzamiento original, descrito por la Especificación de Protocolo Zcash y la construcción Zerocash en la que se basó. ZIP 200 solo menciona Sprout en retrospectiva, como identificador de rama de consenso 0, la base anterior a cualquier actualización.

¿Necesitaba confiar en las seis personas de la Ceremonia? La configuración se diseñó de modo que solo necesitabas que una de ellas fuera honesta. Cada una tenía una pieza secreta y, mientras un único participante destruyera la suya, el secreto completo nunca podría reconstruirse y nadie podría falsificar ZEC. Cinco participantes han sido nombrados públicamente y uno permaneció anónimo.

¿Es el pool Sprout el que usa mi billetera ahora? Probablemente no. Sprout fue el primer pool blindado, pero actualizaciones posteriores como Sapling introdujeron un diseño blindado más rápido, y la mayoría de las billeteras usan pools más nuevos hoy. Sprout sigue siendo importante como el trabajo que demostró que las transacciones privadas y verificables podían funcionar en una red activa.

¿Qué hizo diferente a Sprout de Bitcoin? Bitcoin coloca cada pago en un libro mayor público donde los importes y las direcciones son visibles. Sprout añadió transacciones blindadas que ocultan el remitente, el destinatario y el importe, al tiempo que permiten a la red confirmar que la transacción es válida. También mantuvo las direcciones transparentes, de modo que ambos estilos coexisten en la misma cadena.

## Pon a prueba tu comprensión

A Sprout se le suele llamar una actualización de red con una altura de activación. ¿Por qué no es del todo correcto?

<details>
<summary>Respuesta</summary>

Sprout es el lanzamiento original de Zcash, no una actualización posterior. Ha estado activo desde el bloque génesis (bloque 0) el 28 de octubre de 2016, por lo que no hay una altura de activación a la que señalar. El mecanismo de actualización de red llegó más tarde y etiquetó las reglas de Sprout como identificador de rama de consenso 0, la base anterior a cualquier actualización.
</details>

### Recursos

[ZIP 200: Mecanismo de actualización de red](https://zips.z.cash/zip-0200)

[Zcash actualizaciones de red](https://z.cash/upgrade/)

[Electric Coin Company: lanzamiento de Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: El diseño de la Ceremonia](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Véase también

[Pools blindados](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Zcash Actualizaciones de red](../start-here/network-upgrades)

[¿Qué son ZEC y Zcash?](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Siguiente: [Overwinter](../zcash-tech/overwinter)
