<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Sapling

> Sapling se activó en la red principal de Zcash en el bloque 419.200 (29 de octubre de 2018, 02:15 UTC).

Lo que aprenderás: Sapling hizo que los pagos privados [private] de Zcash fueran lo bastante rápidos y ligeros como para ejecutarse en un teléfono o un hardware wallet.

Sapling fue la segunda actualización de red [network upgrade] importante de Zcash y se activó en el segundo aniversario de Zcash. Fue una bifurcación dura de consenso que reconstruyó la forma en que se elaboran las transacciones blindadas [shielded] (privadas). El despliegue está definido por ZIP 205, las nuevas reglas de firma de transacciones por ZIP 243, y ambas se basan en ZIP 200, el mecanismo de actualización de red. Todos los detalles se encuentran en la Especificación del protocolo de Zcash. Electric Coin Company desarrolló la actualización y lanzó en agosto de 2018 la primera versión compatible con ella, zcashd 2.0.0. On-chain, la red identifica las reglas de Sapling mediante su ID de rama de consenso.

Por qué importa esto. Antes de Sapling, realizar un pago verdaderamente privado implicaba esperar minutos mientras el ordenador procesaba gigabytes de memoria para generar la prueba [proof]. Eso era demasiado lento y pesado para la mayoría de las personas, por lo que muchos usuarios, exchanges y comercios omitían las transacciones blindadas y enviaban ZEC abiertamente en su lugar. Sapling redujo el trabajo a unos pocos segundos y alrededor de 40 megabytes de memoria. Ese único cambio hizo práctico utilizar ZEC blindado en la vida cotidiana, en teléfonos comunes y hardware wallets.

## TL;DR

- Sapling fue la segunda gran actualización de red [network upgrade] de Zcash, que se activó en el bloque 419.200 (29 de octubre de 2018, 02:15 UTC), en el segundo aniversario de Zcash.
- Reconstruyó las transacciones blindadas en torno a dos circuitos diseñados para fines específicos (Spend y Output), que reemplazaron el único y lento circuito JoinSplit de Sprout (ZIP 205, ZIP 243).
- El resultado: la generación de pruebas pasó de minutos y gigabytes de memoria a unos pocos segundos y unos 40 MB, lo bastante ligera para teléfonos y hardware wallets.
- Nuevas funciones: direcciones diversificadas (muchas direcciones de pago invinculables [unlinkable] a partir de una sola clave), claves de visualización [viewing keys] para un acceso exclusivo de auditoría, y la separación entre la generación de pruebas y la firma.
- Sus parámetros procedían de una ceremonia multipartita en dos fases (Powers of Tau + MPC de Sapling). La seguridad se mantiene con que al menos un participante haya sido honesto.

## Analogía visual

Sprout era un mensajero privado que llevaba cada carta a pie, a mano, de un extremo a otro del país: totalmente privado, pero lento y agotador. Sapling convirtió a ese mismo mensajero en un ciclista con una mochila ligera: seguía siendo privado, pero lo bastante rápido para las entregas cotidianas. Y las nuevas claves de visualización (viewing keys) son como darle a un auditor una ventana transparente al libro de registro del mensajero sin entregarle nunca las llaves de la carga.

## Qué cambió

El núcleo de Sapling es una forma más rápida de generar la prueba zero-knowledge que mantiene privada una transacción blindada. El diseño original de Sprout utilizaba un único circuito de pruebas (el circuito JoinSplit), que era lento y consumía mucha memoria. Sapling lo reemplazó por dos circuitos diseñados para fines específicos, un circuito Spend y un circuito Output, descritos en la Especificación del protocolo de Zcash. El resultado es una gran reducción del coste. Según Electric Coin Company, una transacción blindada puede construirse en apenas unos segundos utilizando alrededor de 40 megabytes de memoria. La referencia de Sprout previa a Sapling era mucho más pesada, del orden de minutos y varios gigabytes de memoria (estas cifras del lado de Sprout son la referencia aproximada ampliamente citada).

![Sprout versus Sapling shielded transaction cost](/content-images/sapling-before-after-a045b0b48f.webp)

## Nuevas claves

Sapling también introdujo un nuevo conjunto de direcciones y claves blindadas. Una clave puede derivar muchas direcciones diversificadas, que son direcciones de pago separadas que un observador externo no puede vincular entre sí. Sapling también añadió claves de visualización: una clave de visualización completa o entrante permite compartir la capacidad de ver los detalles de las transacciones de una billetera sin entregar la capacidad de gastar sus fondos. Esto resulta útil para auditorías, contabilidad o simplemente para demostrar que se realizó un pago.

Un cambio relacionado es que Sapling separó la tarea de generar la prueba de la tarea de firmar la transacción. El dispositivo que construye la prueba zero-knowledge ya no tiene que ser el dispositivo que conserva la autorización de gasto. Esta separación permite que un hardware wallet mantenga aislada tu clave de gasto mientras otro dispositivo realiza el trabajo de generación de pruebas más pesado.

![Proving device hands the proof to a separate signing device](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## La configuración confiable

Los circuitos de Sapling dependen de un conjunto de parámetros públicos que debían generarse cuidadosamente. Si una sola parte los hubiera producido por sí misma y conservado los datos secretos restantes («residuos tóxicos»), esa parte podría haber falsificado pruebas. Para evitarlo, los parámetros procedían de una ceremonia de múltiples partes y dos fases. La fase 1, llamada Powers of Tau, era independiente de los circuitos, lo que significa que no estaba vinculada a los circuitos específicos de Sapling. La fase 2, el MPC de Sapling, era específica de los circuitos. Cada fase sigue siendo segura siempre que al menos un participante haya sido honesto y destruido sus residuos tóxicos, por lo que la ceremonia solo falla si todos los participantes se confabulan.

## Cómo se activó

Sapling siguió a Overwinter, la actualización de junio de 2018 que preparó el mecanismo de actualización de la red. Electric Coin Company estableció la altura de activación de la red principal en zcashd 2.0.0, lanzado en agosto de 2018, y la red cambió a las reglas de Sapling cuando se minó el bloque 419.200. On-chain, ese momento está marcado por el ID de rama de consenso de Sapling.

![Timeline from Zcash launch to Sapling activation](/content-images/sapling-timeline-6cad184c30.webp)

## Errores comunes

- **Suponer que los pagos blindados (shielded payments) siempre fueron utilizables.** Antes de Sapling, construir una prueba (proof) tomaba minutos y gigabytes de memoria, por lo que la mayoría de los usuarios, exchanges y tiendas evitaban por completo las transacciones blindadas.
- **Considerar que las direcciones de Sapling son iguales a las de Sprout.** Sapling introdujo sus propios tipos de dirección y de clave (además de direcciones diversificadas y claves de visualización [viewing keys]); las claves de Sprout no son interoperables con las direcciones de Sapling.
- **Creer que la configuración confiable (trusted setup) era «el secreto de una sola empresa».** Fue una ceremonia multipartita: solo si todos los participantes se coludían podrían falsificarse pruebas.
- **Pensar que Sapling cambió la emisión o los saldos.** Cambió la forma en que se construyen las transacciones blindadas; ningún monto de ZEC se vio afectado.
- **Suponer que la generación de pruebas y la firma deben hacerse en el mismo dispositivo.** La separación de Sapling es precisamente lo que permite que las hardware wallets mantengan aisladas las claves de gasto (spending keys) mientras otro dispositivo construye las pruebas.

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Shielded transaction | Una transacción privada de Zcash que oculta al remitente, al receptor y el importe. |
| Sprout | El protocolo blindado original con el que se lanzó Zcash, más lento y pesado que Sapling. |
| Spend and Output circuits | Los dos nuevos circuitos de pruebas de Sapling que reemplazaron el único circuito JoinSplit de Sprout. |
| Diversified address | Una de las muchas direcciones de pago invinculables que puedes derivar de una sola clave. |
| Viewing Key | Una clave que permite a alguien ver las transacciones de una billetera sin poder gastar desde ella. |
| Consensus branch id | Un código corto que indica a la red qué reglas de actualización sigue una transacción. |

## Preguntas frecuentes

¿Sapling cambió la cantidad de ZEC que poseo? No. Sapling cambió cómo se construyen las transacciones blindadas, no la cantidad de ZEC que posee nadie ni el suministro total. Tu saldo no se vio afectado.

¿Mi ZEC sigue siendo privado después de Sapling? Sí, y es más utilizable. Sapling mantuvo la sólida privacidad de las transacciones blindadas y las hizo lo bastante rápidas y económicas como para utilizarlas de verdad. Los fondos blindados permanecen ocultos de la misma forma.

¿Tengo que hacer algo? No se requiere ninguna acción por tu parte como titular. Sapling fue una actualización de red que adoptaron los programas de billetera y nodo. Las billeteras modernas ya admiten direcciones de Sapling.

¿Cuál es la diferencia entre Sprout y Sapling? Sprout fue el primer protocolo blindado y utilizaba un circuito de pruebas lento y que consumía mucha memoria. Sapling lo reemplazó por circuitos Spend y Output más rápidos, añadió claves de visualización y direcciones diversificadas, e hizo que las transacciones blindadas fueran lo bastante ligeras para teléfonos y hardware wallets.

¿Por qué algunas fuentes indican el 28 de octubre y otras el 29 de octubre? La altura de activación se fijó de antemano con el objetivo del 28 de octubre de 2018. El bloque que realmente activó el cambio, el bloque 419.200, se minó durante las primeras horas del 29 de octubre UTC. En muchas zonas horarias locales aún era 28 de octubre. En ambos casos se trata del mismo bloque y del mismo momento.

¿Qué es una clave de visualización? Una clave de visualización te permite compartir acceso de lectura a una billetera blindada. Alguien con una clave de visualización completa o entrante puede ver los detalles de las transacciones de la billetera, pero no puede gastar sus fondos. Consulta [Claves de visualización](../zcash-tech/viewing-keys) para obtener más información.

## Pon a prueba tu comprensión

Con Sprout, ¿por qué tantas personas evitaban las transacciones blindadas y cómo lo solucionó Sapling?

<details>
<summary>Respuesta</summary>
Con Sprout, generar una transacción blindada tardaba minutos y utilizaba gigabytes de memoria, por lo que era demasiado lenta y pesada para la mayoría de los usuarios, exchanges y comercios. Sapling introdujo circuitos Spend y Output más rápidos que redujeron el trabajo a unos pocos segundos y alrededor de 40 megabytes, haciendo prácticas las transacciones blindadas en teléfonos cotidianos y hardware wallets.
</details>

### Recursos

- [ZIP 205: Despliegue de la actualización de red de Sapling](https://zips.z.cash/zip-0205)
- [ZIP 243: Validación de firmas de transacciones para Sapling](https://zips.z.cash/zip-0243)
- [Zcash Página de actualización de Sapling](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Anuncio de Sapling](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Anuncio del MPC de Sapling](https://electriccoin.co/blog/sapling-mpc/)

### Véase también

- [Pools blindados](../using-zcash/shielded-pools)
- [Claves de visualización](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Actualizaciones de red de Zcash](../start-here/network-upgrades)
- [Billeteras](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

## Páginas relacionadas

- [Claves de visualización (Viewing Keys)](./Viewing_Keys.md) — la función para compartir información de auditoría que introdujo Sapling
- [Sprout](./Sprout.md) — el protocolo blindado original que reemplazó Sapling
- [Blossom](./Blossom.md) — la siguiente actualización de la serie (tiempos de bloque, no criptografía)
- [zk_SNARKS](./zk_SNARKS.md) — la tecnología zero-knowledge detrás de los circuitos

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Anterior: [Overwinter](../zcash-tech/overwinter) · Siguiente: [Blossom](../zcash-tech/blossom)
