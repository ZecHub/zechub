---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Sapling

> Sapling se activó en la mainnet de Zcash en el bloque 419,200 (29 de octubre de 2018, 02:15 UTC).

Lo que aprenderás: Sapling hizo que los pagos privados de Zcash fueran lo bastante rápidos y ligeros como para funcionar en un teléfono o en una hardware wallet.

Sapling fue la segunda gran actualización de red de Zcash, activada en el segundo aniversario de Zcash. Fue un hard fork de consenso que reconstruyó la forma en que se ensamblan las transacciones shielded (privadas). El despliegue está definido por ZIP 205, las nuevas reglas de firma de transacciones por ZIP 243, y ambas se basan en ZIP 200, el mecanismo de actualización de red. Todos los detalles completos se encuentran en la Especificación del Protocolo de Zcash. Electric Coin Company desarrolló la actualización y lanzó la primera versión compatible con ella, zcashd 2.0.0, en agosto de 2018. En cadena, la red identifica las reglas de Sapling por su consensus branch id.

Por qué importa. Antes de Sapling, hacer un pago realmente privado significaba esperar minutos mientras tu computadora procesaba gigabytes de memoria para construir la prueba. Eso era demasiado lento y pesado para la mayoría de las personas, así que muchos usuarios, exchanges y comercios omitían las transacciones shielded y enviaban ZEC abiertamente en su lugar. Sapling redujo ese trabajo a unos pocos segundos y alrededor de 40 megabytes de memoria. Ese único cambio es lo que hizo que ZEC shielded fuera práctico para usar en la vida cotidiana, en teléfonos comunes y en hardware wallets.

## Qué cambió

El corazón de Sapling es una forma más rápida de construir la prueba de conocimiento cero que mantiene privada una transacción shielded. El diseño original de Sprout usaba un único circuito de prueba (el circuito JoinSplit) que era lento y consumía mucha memoria. Sapling lo reemplazó con dos circuitos diseñados específicamente, un circuito Spend y un circuito Output, descritos en la Especificación del Protocolo de Zcash. El resultado es una gran reducción del costo. Según Electric Coin Company, una transacción shielded puede construirse en apenas unos segundos usando unos 40 megabytes de memoria. La referencia previa a Sapling de Sprout era mucho más pesada, del orden de minutos y varios gigabytes de memoria (estas cifras del lado de Sprout son la referencia aproximada más citada).

![Costo de transacción shielded de Sprout frente a Sapling](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## Nuevas claves

Sapling también introdujo un nuevo conjunto de direcciones y claves shielded. Una clave puede derivar muchas direcciones diversificadas, que son direcciones de pago separadas que un observador externo no puede vincular entre sí. Sapling también añadió viewing keys: una viewing key completa o entrante te permite compartir la capacidad de ver los detalles de las transacciones de una wallet sin ceder la capacidad de gastar sus fondos. Eso es útil para auditoría, contabilidad o simplemente para demostrar que se realizó un pago.

Un cambio relacionado es que Sapling separó la tarea de construir la prueba de la tarea de firmar la transacción. El dispositivo que construye la prueba de conocimiento cero ya no tiene que ser el dispositivo que posee la autoridad de gasto. Esta separación es lo que permite que una hardware wallet mantenga aislada tu clave de gasto mientras un dispositivo separado realiza el trabajo más pesado de generación de pruebas.

![El dispositivo de prueba entrega la prueba a un dispositivo de firma separado](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## La trusted setup

Los circuitos de Sapling dependen de un conjunto de parámetros públicos que debían generarse cuidadosamente. Si una sola parte los hubiera producido por sí sola y hubiera conservado los datos secretos sobrantes (los "toxic waste"), esa parte podría haber falsificado pruebas. Para evitarlo, los parámetros surgieron de una ceremonia multifase y con múltiples participantes. La Fase 1, llamada Powers of Tau, era agnóstica al circuito, lo que significa que no estaba vinculada a los circuitos específicos de Sapling. La Fase 2, el Sapling MPC, era específica del circuito. Cada fase sigue siendo segura siempre que al menos un participante haya sido honesto y haya destruido sus toxic waste, por lo que la ceremonia solo falla si todos y cada uno de los participantes se ponen de acuerdo para coludir.

## Cómo se activó

Sapling siguió a Overwinter, la actualización de junio de 2018 que preparó el mecanismo de actualización de la red. Electric Coin Company estableció la altura de activación de la mainnet en zcashd 2.0.0, publicado en agosto de 2018, y la red cambió a las reglas de Sapling cuando se minó el bloque 419,200. En cadena, ese momento está marcado por el consensus branch id de Sapling.

![Cronología desde el lanzamiento de Zcash hasta la activación de Sapling](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Transacción shielded | Una transacción privada de Zcash que oculta el remitente, el receptor y el monto. |
| Sprout | El protocolo shielded original con el que se lanzó Zcash, más lento y pesado que Sapling. |
| Circuitos Spend y Output | Los dos nuevos circuitos de prueba de Sapling que reemplazaron el único circuito JoinSplit de Sprout. |
| Dirección diversificada | Una de muchas direcciones de pago no vinculables que puedes derivar de una sola clave. |
| Viewing key | Una clave que permite a alguien ver las transacciones de una wallet sin poder gastar desde ella. |
| Consensus branch id | Un código corto que indica a la red qué reglas de actualización sigue una transacción. |

## Preguntas frecuentes

¿Sapling cambió cuánto ZEC poseo? No. Sapling cambió cómo se construyen las transacciones shielded, no la cantidad de ZEC que posee nadie ni el suministro total. Tu saldo no se vio afectado.

¿Mi ZEC sigue siendo privado después de Sapling? Sí, y además es más utilizable. Sapling mantuvo la fuerte privacidad de las transacciones shielded y las hizo lo bastante rápidas y baratas como para usarlas de verdad. Los fondos shielded siguen ocultos de la misma manera.

¿Tengo que hacer algo? No se requiere ninguna acción de tu parte como titular. Sapling fue una actualización de red que adoptaron el software de wallets y de nodos. Las wallets modernas ya son compatibles con direcciones Sapling.

¿Cuál es la diferencia entre Sprout y Sapling? Sprout fue el primer protocolo shielded y usaba un circuito de prueba lento y de alto consumo de memoria. Sapling lo reemplazó por circuitos Spend y Output más rápidos, añadió viewing keys y direcciones diversificadas, e hizo que las transacciones shielded fueran lo bastante ligeras para teléfonos y hardware wallets.

¿Por qué algunas fuentes dicen 28 de octubre y otras 29 de octubre? La altura de activación se fijó con antelación para apuntar al 28 de octubre de 2018. El bloque que realmente activó el cambio, el bloque 419,200, se minó en las primeras horas del 29 de octubre UTC. En muchas zonas horarias locales eso seguía siendo 28 de octubre. En cualquier caso, se trata del mismo bloque y del mismo momento.

¿Qué es una viewing key? Una viewing key te permite compartir acceso de solo lectura a una wallet shielded. Alguien con una viewing key completa o entrante puede ver los detalles de las transacciones de la wallet, pero no puede gastar sus fondos. Consulta [Viewing Keys](../zcash-tech/viewing-keys) para más información.

## Pon a prueba tu comprensión

En Sprout, ¿por qué tantas personas evitaban las transacciones shielded y cómo lo solucionó Sapling?

<details>
<summary>Respuesta</summary>
En Sprout, construir una transacción shielded tomaba minutos y usaba gigabytes de memoria, por lo que era demasiado lenta y pesada para la mayoría de los usuarios, exchanges y comercios. Sapling introdujo circuitos Spend y Output más rápidos que redujeron el trabajo a unos pocos segundos y alrededor de 40 megabytes, haciendo que las transacciones shielded fueran prácticas en teléfonos cotidianos y hardware wallets.
</details>

### Recursos

- [ZIP 205: Despliegue de la actualización de red Sapling](https://zips.z.cash/zip-0205)
- [ZIP 243: Validación de firmas de transacciones para Sapling](https://zips.z.cash/zip-0243)
- [Página de actualización Sapling de Zcash](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: anuncio de Sapling](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: anuncio del Sapling MPC](https://electriccoin.co/blog/sapling-mpc/)

### Véase también

- [Pools shielded](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKS](../zcash-tech/zk-snarks)
- [Actualizaciones de red de Zcash](../start-here/network-upgrades)
- [Wallets](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Anterior: [Overwinter](../zcash-tech/overwinter) · Siguiente: [Blossom](../zcash-tech/blossom)
