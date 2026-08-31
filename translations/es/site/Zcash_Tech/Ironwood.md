<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> Ironwood se activó en la mainnet de Zcash en el bloque 3,428,143 el 28 de julio de 2026 UTC, y ha estado en funcionamiento desde entonces.

Lo que aprenderás: qué cambia Ironwood, por qué un error en dinero oculto es grave y cómo el torniquete permite a cualquiera confirmar que no se falsificó ningún ZEC.

Ironwood es una [actualización de red](../start-here/network-upgrades) de Zcash, formalmente NU6.3, que introduce un nuevo pool blindado del mismo nombre. Un [pool blindado](../using-zcash/shielded-pools) es el conjunto de fondos cuyos importes y propietarios permanecen ocultos mediante [criptografía de conocimiento cero](../zcash-tech/zk-snarks). Ironwood existe para contener y auditar un error de solidez encontrado en el pool blindado Orchard existente, y para dar a la comunidad una forma más sólida de comprobar que el suministro total de ZEC es legítimo. Sus reglas de consenso están especificadas en [ZIP 258](https://zips.z.cash/zip-0258).

Por qué importa esto. Con dinero transparente como Bitcoin, cualquiera puede comprobar que no se falsificaron monedas leyendo el libro mayor público. El dinero blindado oculta los importes, así que no puedes simplemente mirarlo. En su lugar, la propia criptografía tiene que garantizar que nadie pueda crear dinero en secreto. Ironwood importa porque se encontró un error en esa garantía para el pool Orchard. La actualización cierra esa brecha y ofrece a cualquiera una forma de confirmar que el suministro total de ZEC sigue siendo legítimo.

¿Eres nuevo en Zcash? Empieza con [Qué son ZEC y Zcash](../start-here/what-is-zec-and-zcash) y [Pools blindados](../using-zcash/shielded-pools), y luego vuelve aquí.

![Flujo de migración de valor de Ironwood: el valor sale del pool Orchard, pasa por el punto de control del torniquete y entra en el nuevo pool Ironwood](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## Por qué se necesitó Ironwood

A finales de mayo de 2026, el investigador independiente de seguridad Taylor Hornby, durante una auditoría del protocolo para [Shielded Labs](../zcash-organizations/shielded-labs), divulgó responsablemente un error de solidez en el pool blindado Orchard. Orchard era en ese momento el pool blindado más nuevo de Zcash, y la falla estaba en una parte de curva elíptica de su circuito de conocimiento cero, que utiliza el sistema de pruebas [Halo](../zcash-tech/halo) 2.

1. Un error de solidez significa que las matemáticas que prueban que una transacción es válida no lo garantizan por completo.
2. En teoría, un atacante podría haber usado la falla para falsificar valor inválido dentro del pool Orchard y gastar fondos que en realidad no le pertenecían, sin dejar rastro que un nodo normal detectara.
3. El torniquete de Zcash seguía limitando cuánto valor podía salir alguna vez de Orchard, por lo que el suministro total no podía inflarse, pero la propia criptografía del pool ya no garantizaba que cada moneda oculta dentro de él fuera real.

![Explicación del error: una transacción introduce 5 ZEC, pero la prueba defectuosa sigue pasando cuando salen 7 ZEC, creando 2 ZEC de la nada](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

Los números de arriba son una imagen simplificada. La falla real estaba en una parte específica de las matemáticas del circuito, no en un conteo literal de monedas que entran y salen. Lo importante es entender que un error de solidez puede permitir que se cree valor dentro del pool sin ser detectado.

Es importante destacar que no hay evidencia de que el error se haya explotado alguna vez, no hay evidencia de impacto en los fondos de los usuarios y no hay evidencia de que el suministro total de ZEC haya cambiado. Fue descubierto mediante investigación de seguridad y corregido antes de que se conociera algún daño.

## La respuesta

La comunidad de Zcash implementó correcciones por etapas en lugar de hacerlo todo de una vez.

![Cronología de la respuesta de Ironwood: el error de Orchard se encuentra en mayo de 2026, el pool se pausa en junio de 2026, el circuito se corrige en NU6.2 e Ironwood se activó en el bloque 3,428,143 el 28 de julio de 2026](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. A principios de junio de 2026, una medida temporal deshabilitó el pool Orchard mientras se preparaba una corrección completa.
2. La actualización NU6.2 corrigió el propio circuito de Orchard, cerrando la vulnerabilidad de solidez subyacente.
3. La actualización NU6.3, Ironwood, introduce un pool blindado nuevo y un punto de control público para que el valor pueda salir del antiguo pool Orchard bajo auditoría completa.

![La corrección en NU6.2: la prueba corregida exige que las entradas sean iguales a las salidas, por lo que una salida válida de 5 ZEC pasa mientras que un intento de sacar 7 ZEC es rechazado](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Qué hace el pool Ironwood

NU6.2 aseguró el circuito Orchard para todas las transacciones nuevas, pero el valor creado bajo las reglas antiguas sigue estando en el pool Orchard. Ironwood da a ese valor un destino limpio y una forma de auditarlo mientras se mueve.

El pool Ironwood es el pool de valor blindado creado por NU6.3 en el bloque 3,428,143. Está construido sobre el circuito corregido y utiliza un formato de nota recuperable cuánticamente (un diseño que permite recuperar fondos si los [ordenadores cuánticos](../zcash-tech/post-quantum-security) llegan a romper la criptografía actual), definido en [ZIP 2005](https://zips.z.cash/zip-2005).

1. Después de la activación, el antiguo pool Orchard pasa a ser solo de gasto, por lo que no puede entrar en él ningún valor nuevo.
2. El valor recién blindado fluye hacia Ironwood en su lugar.
3. El ZEC blindado mantiene las mismas sólidas garantías de privacidad que ocultan remitente, receptor e importe.

## El torniquete

La idea clave en Ironwood es el torniquete, un punto de control contable por el que debe pasar cada moneda al moverse desde el antiguo pool Orchard hacia Ironwood.

> Un torniquete hace por el dinero oculto lo que una puerta de vidrio hace por la cámara acorazada de un banco. Sigues sin poder ver dentro, pero puedes contar exactamente lo que entra y lo que sale.

1. Los fondos que salen de Orchard se cuentan en un punto de verificación público antes de entrar en Ironwood.
2. Esto permite a cualquiera auditar cuánto ZEC migra, reforzando la confianza en la oferta circulante real.
3. Si se hubiera creado algún ZEC falsificado mediante el error anterior, esta contabilidad de la migración es donde aparecería.

Los torniquetes no son nuevos en Zcash. La red ya los ha usado antes, en los límites entre los pools Sprout, Sapling y Orchard, para que el valor que se mueve entre pools siga siendo auditable y ningún pool pueda liberar más de lo que entró legítimamente en él.

Las reglas de consenso mantienen a cada pool de valor, incluido Ironwood, dentro del límite máximo de dinero de la red, por lo que los saldos de los pools nunca pueden volverse negativos.

## Qué deben hacer los usuarios

Las wallets y el software de nodos gestionan la mayor parte de esto automáticamente, pero el cambio práctico es simple: con el tiempo, mueve las tenencias blindadas desde el antiguo pool Orchard a través del torniquete hacia el pool Ironwood. Sigue la guía de tu proveedor de wallet y actualiza siempre a una versión compatible antes del bloque de activación.

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Pool blindado | El conjunto de fondos cuyos importes y propietarios están ocultos mediante criptografía de conocimiento cero |
| Error de solidez | Una falla que permite que una transacción inválida pase la comprobación de prueba como si fuera válida |
| Torniquete | Un punto de control público que cuenta el valor que se mueve entre pools para que la oferta siga siendo auditable |
| Solo de gasto | Un pool del que puedes gastar, pero al que no puedes añadir valor nuevo |
| Actualización de red (NU) | Un cambio coordinado en las reglas de consenso de Zcash, activado a una altura de bloque determinada |
| Note recuperable cuánticamente | Un formato de note diseñado para que los fondos puedan recuperarse si los ordenadores cuánticos llegan a romper la criptografía actual |

## Preguntas frecuentes

¿Mi ZEC se vio afectado? No. No hay evidencia de que el error se haya usado alguna vez, ni impacto en los fondos de los usuarios, ni cambios en el suministro total.

¿Necesito hacer algo? Mantén tu wallet y tu software de nodo actualizados a una versión compatible antes del bloque de activación. Tu wallet mueve los fondos a Ironwood con el tiempo a medida que gastas, así que no hay nada manual que debas apresurar. Sigue la guía de tu proveedor de wallet.

¿Sigue siendo privado Zcash? Sí. Ironwood mantiene la misma privacidad blindada que oculta remitente, receptor e importe. Esta actualización trata sobre la integridad de la oferta, no sobre la privacidad.

¿Se explotó alguna vez el error? No hay evidencia de que así fuera. Fue descubierto mediante investigación de seguridad, divulgado responsablemente y corregido antes de que se conociera algún daño.

¿Qué ocurre con el antiguo pool Orchard? Pasa a ser solo de gasto. No puede entrar en él ningún valor nuevo, y el valor existente se mueve a Ironwood a través del torniquete, donde la migración se audita públicamente.

## Pon a prueba tu comprensión

Si el ZEC dentro de los pools blindados está oculto, ¿cómo puede alguien confirmar que el error de Orchard no infló en secreto el suministro total?

<details>
<summary>Respuesta</summary>

A través del torniquete. Cada moneda que sale del antiguo pool Orchard se cuenta en un punto de control público al entrar en Ironwood. Si intentara salir más valor del que entró legítimamente, la contabilidad no cuadraría, así que cualquier falsificación que el error pudiera haber creado saldría a la luz en esa puerta.
</details>

### Recursos

[ZIP 258: Despliegue de la actualización de red NU6.3](https://zips.z.cash/zip-0258)

[ZIP 257: Despliegue de la mitigación temporal de la vulnerabilidad de Orchard y de la actualización de red NU6.2](https://zips.z.cash/zip-0257)

[ZIP 2005: Recuperabilidad cuántica de Ironwood](https://zips.z.cash/zip-2005)

[Ironwood: Un nuevo pool blindado para Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Ver también

[Actualizaciones de red de Zcash](../start-here/network-upgrades)

[Pools blindados](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Seguridad post-cuántica](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[Qué son ZEC y Zcash](../start-here/what-is-zec-and-zcash)

---

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Anterior: [NU6.2](../zcash-tech/nu6-2)
