<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash se lanzó el 28 de octubre de 2016, con el shielded pool Sprout.

Lo que aprenderás: Sprout es donde comenzó Zcash, la primera vez que dinero privado y verificable funcionó en una blockchain en vivo.

Sprout es el lanzamiento original de la red Zcash, no una [actualización de red](../start-here/network-upgrades) posterior. Entró en funcionamiento en el bloque génesis el 28 de octubre de 2016. Ningún ZIP numerado define Sprout: el proceso ZIP comenzó después con Overwinter, así que Sprout se describe mediante la Especificación original del Protocolo de Zcash y la construcción Zerocash sobre la que se basó. La [Electric Coin Company](../zcash-organizations/electric-coin-company) (entonces la Zerocoin Electric Coin Company), dirigida por Zooko Wilcox, la desarrolló y la lanzó. Sprout introdujo las primeras transacciones blindadas con zk-SNARKs prácticas y el shielded pool original, para que la gente pudiera enviar ZEC con el emisor, el receptor y la cantidad ocultos, mientras la red seguía comprobando que los saldos cuadraban. El nombre transmitía la idea de una cadena joven, en brote, que el equipo esperaba ver crecer.

Por qué esto importa. Antes de Sprout, toda blockchain pública mostraba tus pagos: cualquiera podía ver quién pagó a quién y cuánto. Sprout fue la primera red abierta y sin permisos en ocultar esos detalles y aun así demostrar que nadie estaba haciendo trampa. Eso importa para la privacidad financiera cotidiana, la clase de privacidad que esperas del efectivo o de un extracto bancario que nadie más puede leer. También demostró que una privacidad fuerte on-chain podía funcionar en la práctica, más allá de un diseño sobre el papel. La Ceremony de trusted setup que lo hizo posible se convirtió en un punto de referencia para trabajos criptográficos posteriores, y el sistema de pruebas lento y exigente en memoria con el que se lanzó Sprout es precisamente lo que llevó al equipo a crear Sapling dos años después.

## Primer shielded pool

Sprout creó dos tipos de direcciones. Las direcciones transparentes (t-addresses) funcionan como en Bitcoin, con los detalles visibles en el libro mayor público. Las direcciones blindadas (z-addresses) envían fondos al [shielded pool](../using-zcash/shielded-pools) de Sprout, donde el emisor, el receptor y la cantidad permanecen ocultos. El truco está en los [zk-SNARKs](../zcash-tech/zk-snarks), pruebas de conocimiento cero que permiten que una transacción demuestre que es válida, sin doble gasto y con saldos que cuadran, sin revelar ninguno de los detalles. Sprout fue la primera vez que esto funcionó en producción en una criptomoneda en vivo.

![Las transacciones transparentes exponen emisor, receptor y cantidad, mientras que las transacciones blindadas de Sprout ocultan los tres y siguen siendo verificables](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## La Ceremony

Los zk-SNARKs de Sprout necesitaban un conjunto de parámetros públicos, y generarlos de forma segura requería una configuración única llamada la Ceremony. Seis participantes en ubicaciones separadas y distantes generaron cada uno una parte secreta, llamada toxic waste. Si alguien alguna vez volvía a reunir todas las partes, podría falsificar ZEC de la nada. El diseño convirtió ese riesgo en una regla simple: mientras al menos un participante destruyera su parte, el secreto completo nunca podría reconstruirse, por lo que la falsificación seguiría siendo imposible. Entre los participantes cuyos nombres se han hecho públicos están Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd y Derek Hinch de NCC Group. Un participante eligió permanecer en el anonimato.

![La Ceremony: seis participantes generan fragmentos privados y luego destruyen el toxic waste, dejando solo los parámetros públicos de Sprout](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## El origen

Sprout es la base sobre la que se construye todo cambio posterior. Cuando el mecanismo de actualizaciones de red llegó con Overwinter, etiquetó las reglas originales como consensus branch id 0, lo que simplemente significa que todavía no se ha aplicado ninguna actualización. Todo lo que vino después (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6 y más allá) se asienta sobre la cadena que Sprout inició. El lanzamiento se anunció en agosto de 2016 para un génesis el 28 de octubre, la Ceremony se realizó en las semanas anteriores, y la marca de tiempo codificada del bloque génesis indica el 28 de octubre de 2016 a las 07:56 UTC.

![Línea de tiempo desde el anuncio de agosto de 2016 hasta la Ceremony de parámetros y el lanzamiento de Sprout el 28 de octubre de 2016](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| zk-SNARK | Una prueba de conocimiento cero que demuestra que una transacción es válida sin revelar el emisor, el receptor ni la cantidad |
| Shielded pool | El lado privado de Zcash donde las cantidades y las partes están ocultas. El pool de Sprout fue el primero |
| z-address y t-address | Una z-address está blindada y mantiene los detalles privados. Una t-address es transparente y muestra los detalles en el libro mayor público |
| The Ceremony | La configuración multipartita de 2016 que generó los parámetros públicos de Sprout y luego descartó el toxic waste |
| Toxic waste | Las partes secretas de la clave de la Ceremony que debían destruirse para que no se pudiera falsificar ZEC |
| Consensus branch id 0 | La etiqueta de las reglas de Sprout, que significa la base antes de cualquier actualización de red |

## Preguntas frecuentes

¿Sprout cambia hoy mi ZEC o mi privacidad? No. Sprout es historia, el lanzamiento que inició la cadena en la que vive tu ZEC. Tus monedas y tu privacidad hoy dependen de la wallet y del shielded pool que uses ahora, no de nada que necesites hacer con respecto a Sprout.

¿Por qué no hay un número ZIP para Sprout? El proceso ZIP comenzó después, con la actualización Overwinter. Sprout es el lanzamiento original, descrito por la Especificación del Protocolo de Zcash y la construcción Zerocash en la que se basó. ZIP 200 solo menciona Sprout retrospectivamente, como consensus branch id 0, la base anterior a cualquier actualización.

¿Necesitaba confiar en las seis personas de la Ceremony? La configuración se diseñó para que solo necesitaras que una de ellas fuera honesta. Cada una tenía una parte secreta y, mientras un solo participante destruyera la suya, el secreto completo nunca podría reconstruirse y nadie podría falsificar ZEC. Cinco participantes han sido nombrados públicamente y uno permaneció anónimo.

¿Es el pool de Sprout el que usa ahora mi wallet? Probablemente no. Sprout fue el primer shielded pool, pero actualizaciones posteriores como Sapling introdujeron un diseño blindado más rápido, y hoy la mayoría de las wallets usan pools más nuevos. Sprout sigue importando como el trabajo que demostró que las transacciones privadas y verificables podían funcionar en una red en vivo.

¿Qué hizo a Sprout diferente de Bitcoin? Bitcoin coloca cada pago en un libro mayor público donde las cantidades y las direcciones son visibles. Sprout añadió transacciones blindadas que ocultan el emisor, el receptor y la cantidad, mientras siguen permitiendo que la red confirme que la transacción es válida. También mantuvo direcciones transparentes, así que ambos estilos conviven en la misma cadena.

## Pon a prueba tu comprensión

A menudo se dice que Sprout es una actualización de red con una altura de activación. ¿Por qué eso no es del todo correcto?

<details>
<summary>Respuesta</summary>

Sprout es el lanzamiento original de Zcash, no una actualización posterior. Ha estado activo desde el bloque génesis (bloque 0) el 28 de octubre de 2016, así que no hay una altura de activación que señalar. El mecanismo de actualizaciones de red llegó después y etiquetó las reglas de Sprout como consensus branch id 0, la base anterior a cualquier actualización.
</details>

### Recursos

[ZIP 200: Mecanismo de actualización de red](https://zips.z.cash/zip-0200)

[Actualizaciones de red de Zcash](https://z.cash/upgrade/)

[Electric Coin Company: lanzamiento de Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: El diseño de la Ceremony](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Ver también

[Shielded Pools](../using-zcash/shielded-pools)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Actualizaciones de red de Zcash](../start-here/network-upgrades)

[Qué son ZEC y Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Siguiente: [Overwinter](../zcash-tech/overwinter)
