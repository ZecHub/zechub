<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> Ironwood se activó en la red principal de Zcash en el bloque 3.428.143 el 28 de julio de 2026 UTC, y ha estado activo desde entonces.

Lo que aprenderás: qué cambia Ironwood, por qué un error en el dinero oculto es grave y cómo el turnstile permite a cualquiera confirmar que no se falsificó ningún ZEC.

Ironwood es una Zcash[actualización de red](../start-here/network-upgrades), formalmente NU6.3, que introduce un nuevo pool blindado del mismo nombre. Un [pool blindado](../using-zcash/shielded-pools) es el conjunto de fondos cuyos importes y propietarios permanecen ocultos mediante criptografía [zero-knowledge](../zcash-tech/zk-snarks). Ironwood existe para contener y auditar un error de solidez encontrado en el pool blindado existente de Orchard, y para proporcionar a la comunidad una forma más sólida de comprobar que el suministro total de ZEC es legítimo. Sus reglas de consenso se especifican en [ZIP 258](https://zips.z.cash/zip-0258).

Por qué importa. Con dinero transparente como Bitcoin, cualquiera puede comprobar que no se falsificaron monedas leyendo el registro público. El dinero blindado oculta los importes, por lo que no basta con mirar. En su lugar, la propia criptografía debe garantizar que nadie pueda crear dinero en secreto. Ironwood importa porque se encontró un error en esa garantía para el pool de Orchard. La actualización cierra la brecha y proporciona a cualquiera una forma de confirmar que el suministro total de ZEC sigue siendo legítimo.

¿Eres nuevo en Zcash? Comienza con [Qué es ZEC y Zcash](../start-here/what-is-zec-and-zcash) y [Pools blindados](../using-zcash/shielded-pools), y luego vuelve aquí.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](/content-images/ironwood-flow-8af7a58b99.webp)

## Por qué se necesitaba Ironwood

A finales de mayo de 2026, el investigador independiente de seguridad Taylor Hornby, durante una auditoría de protocolo para [Shielded Labs](../zcash-organizations/shielded-labs), divulgó responsablemente un error de solidez en el pool blindado de Orchard. Orchard era el pool blindado más reciente de Zcash en ese momento, y el fallo se encontraba en una parte de curva elíptica de su circuito zero-knowledge, que utiliza el sistema de pruebas [Halo](../zcash-tech/halo) 2.

1. Un error de solidez significa que las matemáticas que prueban que una transacción es válida no lo garantizan por completo.
2. En teoría, un atacante podría haber usado el fallo para falsificar valor no válido dentro del pool de Orchard y gastar fondos que en realidad no le pertenecían, sin dejar ningún rastro que un nodo normal detectaría.
3. El turnstile de Zcash seguía limitando cuánto valor podía salir de Orchard, de modo que el suministro total no podía inflarse, pero la propia criptografía del pool ya no garantizaba que cada moneda oculta en su interior fuera real.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](/content-images/ironwood-bug-8f689d6f61.webp)

Las cifras anteriores son una representación simplificada. El fallo real se encontraba en una parte específica de las matemáticas del circuito, no en un recuento literal de monedas que entran y salen. La conclusión es simplemente que un error de solidez puede permitir que se cree valor dentro del pool sin ser detectado.

Es importante destacar que no hay pruebas de que el error haya sido explotado, pruebas de impacto en los fondos de los usuarios ni pruebas de que el suministro total de ZEC haya cambiado. Se descubrió mediante investigación de seguridad y se corrigió antes de que se conociera algún daño.

## La respuesta

La comunidad de Zcash implementó correcciones por etapas en lugar de hacerlo todo de una vez.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. A principios de junio de 2026, una medida temporal desactivó el pool de Orchard mientras se preparaba una corrección completa.
2. La actualización de NU6.2 corrigió el propio circuito de Orchard, cerrando la vulnerabilidad de solidez subyacente.
3. La actualización NU6.3, Ironwood, introduce un nuevo pool blindado y un punto de control público para que el valor pueda salir del antiguo pool de Orchard bajo una auditoría completa.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Qué hace el pool de Ironwood

NU6.2 aseguró el circuito de Orchard para todas las transacciones nuevas, pero el valor creado bajo las reglas antiguas sigue en el pool de Orchard. Ironwood proporciona a ese valor un destino limpio y una forma de auditarlo mientras se mueve.

El pool de Ironwood es el pool de valor blindado creado por NU6.3 en el bloque 3.428.143. Se basa en el circuito corregido y utiliza un formato de nota recuperable cuánticamente [quantum-recoverable note] (un diseño que permite recuperar fondos si las [computadoras cuánticas](../zcash-tech/post-quantum-security) llegan a romper la criptografía actual), definido en [ZIP 2005](https://zips.z.cash/zip-2005).

1. Después de la activación, el antiguo pool de Orchard pasa a ser de solo gasto, por lo que no puede entrar ningún valor nuevo.
2. El valor recién blindado fluye hacia Ironwood en su lugar.
3. Dentro de Ironwood, el ZEC blindado mantiene la privacidad que oculta al remitente, al receptor y el importe. Mover ZEC de Orchard a Ironwood muestra el importe movido.

## El turnstile

La idea clave en Ironwood es el turnstile, un punto de control contable por el que debe pasar cada moneda al moverse del antiguo pool de Orchard a Ironwood.

> Un turnstile hace por el dinero oculto lo que una puerta de vidrio hace por la bóveda de un banco. Aún no puedes ver dentro, pero puedes contar exactamente lo que entra y lo que sale.

1. Los fondos que salen de Orchard se cuentan en un punto público de verificación antes de entrar en Ironwood.
2. Esto permite a cualquiera auditar cuánto ZEC migra, fortaleciendo la confianza en el suministro circulante real.
3. Si se hubiera creado algún ZEC falsificado mediante el error anterior, esta contabilidad de migración sería donde aparecería.

Los turnstiles no son nuevos para Zcash. La red los ha utilizado antes, en los límites entre los pools Sprout, Sapling y Orchard, para que el valor que se mueve entre pools siga siendo auditable y ningún pool pueda liberar más de lo que entró legítimamente en él.

Las reglas de consenso mantienen cada pool de valor, incluido Ironwood, dentro del límite máximo de dinero de la red, por lo que los saldos de los pools nunca pueden ser negativos.

## Qué deben hacer los usuarios

Las billeteras y el software de nodos gestionan la mayor parte de esto automáticamente, pero el cambio práctico es sencillo: con el tiempo, mueve las tenencias blindadas del antiguo pool de Orchard a través del turnstile hacia el pool de Ironwood. Cada movimiento muestra su importe en la blockchain, por lo que las billeteras que siguen [ZIP 318](https://zips.z.cash/zip-0318) lo dividen en importes estándar y los envían con el tiempo. Sigue las indicaciones de tu proveedor de billetera y mantén tu software en una versión compatible.

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Shielded pool | El conjunto de fondos cuyos importes y propietarios están ocultos mediante criptografía zero-knowledge |
| Soundness bug | Un fallo que permite que una transacción no válida supere la comprobación de la prueba como si fuera válida |
| Turnstile | Un punto de control público que cuenta el valor que se mueve entre pools para que el suministro siga siendo auditable |
| Spend-only | Un pool del que puedes gastar, pero al que no puedes añadir valor nuevo |
| Network upgrade (NU) | Un cambio coordinado en las reglas de consenso de Zcash, activado a una altura de bloque determinada |
| Quantum-recoverable note | Un formato de nota diseñado para que los fondos puedan recuperarse si las computadoras cuánticas llegan a romper la criptografía actual |

## Preguntas frecuentes

¿Se vio afectado mi ZEC? No. No hay pruebas de que el error se haya utilizado, de impacto en los fondos de los usuarios ni de cambios en el suministro total.

¿Tengo que hacer algo? Mantén el software de tu billetera y de tu nodo en una versión compatible. Gastar fondos de Orchard los mueve a Ironwood, y el importe que cruza es público. Algunas billeteras ofrecen una migración que envía importes estándar con el tiempo, por lo que es más difícil vincular tu saldo. Sigue las indicaciones de tu proveedor de billetera.

¿Sigue siendo privado Zcash? Sí. Los pagos dentro de Ironwood ocultan al remitente, al receptor y el importe, como lo hacían los pagos de Orchard. El importe que se mueve entre pools, como de Orchard a Ironwood, es público. Esta actualización trata sobre la integridad del suministro.

¿Se explotó alguna vez el error? No hay pruebas de que así fuera. Se descubrió mediante investigación de seguridad, se divulgó responsablemente y se corrigió antes de que se conociera algún daño.

¿Qué sucede con el antiguo pool de Orchard? Pasa a ser de solo gasto. No puede entrar ningún valor nuevo, y el valor existente se mueve a Ironwood a través del turnstile, donde la migración se audita públicamente.

## Pon a prueba tu comprensión

Si el ZEC dentro de los pools blindados está oculto, ¿cómo puede alguien confirmar que el error de Orchard no infló en secreto el suministro total?

<details>
<summary>Respuesta</summary>

A través del turnstile. Cada moneda que sale del antiguo pool de Orchard se cuenta en un punto de control público al entrar en Ironwood. Si intentara salir más valor del que entró legítimamente, la contabilidad no cuadraría, por lo que cualquier falsificación que el error pudiera haber creado saldría a la luz en esa barrera.
</details>

### Recursos

[ZIP 258: Implementación de la actualización de red NU6.3](https://zips.z.cash/zip-0258)

[ZIP 257: Implementación de la mitigación temporal de vulnerabilidades de Orchard y de la actualización de red NU6.2](https://zips.z.cash/zip-0257)

[ZIP 2005: Recuperabilidad cuántica de Ironwood](https://zips.z.cash/zip-2005)

[ZIP 229: Formato de transacción versión 6](https://zips.z.cash/zip-0229)

[ZIP 318: Migración de Orchard a Ironwood](https://zips.z.cash/zip-0318)

[Ironwood: Un nuevo pool blindado para Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Véase también

[Zcash Actualizaciones de red](../start-here/network-upgrades)

[Pools blindados](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Seguridad poscuántica](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[Qué es ZEC y Zcash](../start-here/what-is-zec-and-zcash)

---

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Anterior: [NU6.2](../zcash-tech/nu6-2)
