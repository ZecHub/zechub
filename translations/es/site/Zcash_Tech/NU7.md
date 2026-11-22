<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# NU7

> NU7 se activó en Zcash Mainnet en el bloque 3,543,405 el 6 de noviembre de 2026 (02:34 UTC; la noche del 5 de noviembre en las zonas horarias de EE. UU.) y está en funcionamiento desde entonces.

Esto es lo que aprenderás: qué cambió NU7 (bloques más rápidos, límites a las acciones blindadas, reciclaje de comisiones y fin de las transacciones de versión 4), qué dejó igual y qué tuvieron que hacer los operadores de nodos, las billeteras, los exchanges y los mineros.

NU7 es una Zcash [actualización de red](../start-here/network-upgrades), implementada mediante [ZIP 259](https://zips.z.cash/zip-0259). Redujo el tiempo entre bloques de 75 a 25 segundos, limitó cuántas acciones blindadas caben en un bloque, empezó a retirar de circulación el 60 % de las comisiones por transacción para que puedan volver a emitirse a futuros mineros e invalidó las transacciones de versión 4, con lo que retiró el antiguo pool Sprout. No introdujo un formato de transacción nuevo. Su ID de rama de consenso es `0x77190ad9`.

Por qué importa. Antes de NU7, había que esperar un promedio de 75 segundos para la primera confirmación, demasiado para una caja, un depósito en un exchange o un swap cross-chain. NU7 redujo ese tiempo a unos 25 segundos sin emitir más ZEC: la recompensa por bloque se redujo a un tercio, por lo que la emisión diaria se mantuvo igual. También es la primera actualización que añade un mecanismo destinado a financiar la seguridad de la red cuando disminuyan las recompensas por bloque.

¿Acabas de llegar a Zcash? Empieza por [Qué son ZEC y Zcash](../start-here/what-is-zec-and-zcash) y [Pools blindados](../using-zcash/shielded-pools), y luego vuelve aquí.

## En resumen

En pocas palabras: ahora los bloques llegan cada 25 segundos, la cantidad de ZEC nuevos por día se mantiene igual, una parte de cada comisión se guarda para futuros mineros y el antiguo pool Sprout está cerrado.

- **Bloques de 25 segundos** ([ZIP 218](https://zips.z.cash/zip-0218)): primera confirmación en unos 25 segundos, en lugar de 75. El subsidio por bloque bajó de 1.5625 a 0.52083333 ZEC, por lo que se siguen emitiendo unos 1,800 ZEC al día.
- **Límites a las acciones blindadas** (ZIP 218): un máximo de 330 acciones blindadas por bloque entre todos los pools, con límites por pool, para que los costos de validación de los bloques en el peor caso y de sincronización de billeteras sean menores que antes.
- **Mecanismo de Sostenibilidad de la Red** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): el 60 % de las comisiones por transacción de cada bloque sale de circulación y se vuelve a emitir para los mineros más adelante, a partir del bloque 8,939,664 (previsto para alrededor de febrero de 2031). El límite de suministro de 21 millones no cambia.
- **Las transacciones de versión 4 son inválidas** ([ZIP 2003](https://zips.z.cash/zip-2003)): las billeteras deben crear transacciones v5 o v6. Sprout solo se puede gastar con v4, así que los fondos que aún están en Sprout ahora están congelados.
- **Software**: [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) y versiones posteriores siguen NU7. No hay ninguna versión de `zcashd` compatible con NU7.

## Analogía visual

Imagina la red como una línea de tren. Antes de NU7, salía un tren cada 75 segundos y podía llevar tantos pasajeros como cupieran en 2 MB. NU7 hace circular un tren cada 25 segundos, paga a cada conductor un tercio de la tarifa anterior para que el total diario sea el mismo y limita cuántos de los pasajeros más pesados (las acciones blindadas) pueden subir a cada tren, de modo que ninguno tarde demasiado en ser inspeccionado.

![NU7 en cuatro paneles: los bloques son tres veces más rápidos y la cantidad diaria de nuevos ZEC se mantiene igual; el 60% de las tarifas va a una reserva pública para recompensas a partir de 2031; el antiguo pool Sprout de 2016 ya no se puede gastar; el 98,9% de los ZEC que votaron eligió mantener los halving](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## Qué cambió con NU7

### Intervalo objetivo de 25 segundos entre bloques (ZIP 218)

- El ajuste de dificultad ahora apunta a un bloque cada **25 segundos**, en lugar de cada 75, así que los bloques llegan tres veces más seguido.
- El subsidio por bloque se dividió entre tres: **0.52083333 ZEC** por bloque durante el período de halving actual (antes era de 1.5625 ZEC). La emisión diaria se mantiene en unos 1,800 ZEC (3,456 bloques al día, en lugar de 1,152).
- Los halvings siguen ocurriendo cada cuatro años. Como los bloques son más rápidos, el próximo halving se adelantó al bloque **6,132,390**, previsto para finales de noviembre de 2028 con intervalos de 25 segundos (ZIP 259).
- La ventana de promedio de dificultad aumentó de 17 a **102 bloques**, por lo que el ajuste sigue considerando un período de tiempo similar.
- El vencimiento predeterminado de las transacciones aumentó de 40 a **120 bloques**, lo que lo mantiene en unos 50 minutos.

### Límites a las acciones blindadas (ZIP 218)

Ahora cada bloque tiene un presupuesto compartido y límites por pool:

| Límite | Por bloque |
|---|---|
| Todas las acciones blindadas entre pools | 330 |
| Acciones de Orchard | 330 |
| Acciones de Ironwood | 330 |
| Entradas + salidas de Sapling | 300 |
| Sprout JoinSplits | Ninguna permitida |

Antes de NU7, un bloque completo de 2 MB podía contener unas 617 Orchard o Ironwood acciones, o unas 2,107 salidas de Sapling, sin límites por pool. ZIP 218 establece los nuevos límites para que, incluso con bloques tres veces más frecuentes, el peor caso para los nodos y la sincronización de billeteras sea menor que antes (por ejemplo, el ancho de banda máximo de sincronización blindada de clientes ligeros baja de unos 271 a 169 MB al día), mientras que el rendimiento del protocolo Orchard se duplica con creces (de unas 2,9 a 6,6 transacciones por segundo para transacciones de 2 acciones).

### Mecanismo de Sostenibilidad de la Red (ZIP 235 + ZIP 237)

- **Retiro de comisiones (ZIP 235):** el 60 % de las comisiones por transacción de cada bloque se retira de circulación; el 40 % restante va al minero, como antes. A diferencia de una quema, las ZEC retiradas se registran para poder emitirse de nuevo más adelante.
- **Reemisión (ZIP 237):** las ZEC retiradas se mantienen en un estado de consenso público llamado Saldo de Valor del NSM. Se inició en NU7 con el valor que los mineros dejaron sin reclamar en el pasado. A partir del bloque **8,939,664** (previsto para alrededor de febrero de 2031), cada bloque emite una parte fija de ese saldo, además de la emisión normal según el calendario de halving.
- El límite de suministro no aumenta. Cuando el saldo llega a cero, la emisión sigue exactamente el antiguo calendario de halving.
- NU7 **no** implementó [ZIP 233](https://zips.z.cash/zip-0233) (retiro voluntario por parte de los usuarios) ni [ZIP 234](https://zips.z.cash/zip-0234) (reemplazar los halvings por una curva gradual). Las encuestas a los titulares de monedas eligieron el diseño que mantiene los halvings en ZIP 237.
- Las cifras (el fondo inicial de 368.58 ZEC, la fracción de reemisión por bloque y el motivo por el que comienza en el bloque 8,939,664) están en la página del [Mecanismo de Sostenibilidad de la Red](./Network_Sustainability_Mechanism.md).

### Transacciones de versión 4 no permitidas (ZIP 2003)

- Desde NU7, todas las transacciones de versión 4 son inválidas: no solo las transferencias de Sprout, sino también las transacciones solo transparentes y las de Sapling creadas en formato v4. Las transacciones de versión 5 (NU5) y versión 6 ([Ironwood](../zcash-tech/ironwood)) no cambian.
- Las transferencias de Sprout solo existen en formato v4, por lo que ya no se pueden gastar los fondos del pool [Sprout](../zcash-tech/sprout). Consulta [Recuperar fondos](../using-zcash/recovering-funds).

### Otros cambios menores

- Revisiones de las reglas del fondo de desarrollo para que las fuentes de financiación funcionen con bloques de 25 segundos ([ZIP 207](https://zips.z.cash/zip-0207) Revisión 2, [ZIP 214](https://zips.z.cash/zip-0214) Revisión 3) y una actualización de la lista de direcciones de las fuentes de financiación ([ZIP 2008](https://zips.z.cash/zip-2008)).
- Los nodos de NU7 anuncian la versión de protocolo de red **170190** en Mainnet y se desconectan de los pares antiguos después de la activación.

## Qué no hizo NU7

- **No creó un formato de transacción nuevo.** NU7 evitó deliberadamente otra migración de billeteras y analizadores justo después de que Ironwood introdujera las transacciones v6.
- **No cambió el límite de suministro ni el ritmo de halving de cuatro años.**
- **No cambió el vencimiento de coinbase.** Las monedas minadas siguen necesitando 100 bloques antes de poder gastarse (ahora unos 42 minutos, en lugar de unas 2 horas).
- **No creó un pool blindado nuevo.** Ironwood (NU6.3) sigue siendo el pool más reciente; Orchard solo permite gastar, como desde Ironwood.

## Qué tuvo que hacer cada grupo

- **Operadores de nodos:** ejecutar [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) o una versión posterior. Zebra 7 cambia la base de datos del formato v28 al v29 en el primer inicio y Zebra 6.x no puede leer v29, así que haz una copia de seguridad de `state/v28` antes de actualizar. `zcashd` no tiene una versión de NU7 (su versión más reciente es la 6.20.0, de junio de 2026); la guía de migración de API de Zebra[zcashd del libro ](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) indica cómo corresponde cada RPC de `zcashd` a Zebra, [Zallet](../zcash-tech/zallet) o su reemplazo. Consulta [Nodos completos](../zcash-tech/full-nodes) y la guía [Endurecida de Zebra](../guides/hardened-zebrad).
- **Billeteras:** deja de crear transacciones v4, usa el vencimiento predeterminado de 120 bloques, conserva la profundidad de anclaje de 3 bloques (ahora unos 1,25 minutos) y respeta los límites de acciones por bloque. Una transacción que por sí sola exceda un límite nunca podrá minarse.
- **Exchanges y servicios de pago:** ahora una confirmación tarda 25 segundos, así que el mismo número de confirmaciones cubre un tercio del tiempo. Vuelve a comprobar la cantidad de confirmaciones necesaria para los depósitos según el tiempo y la seguridad que realmente quieras, en lugar de mantener el número anterior por costumbre.
- **Mineros y pools:** el software y las plantillas de minado deben usar el nuevo subsidio, la división de las comisiones y los límites de acciones; los bloques creados con las reglas antiguas se rechazan.

## Errores comunes

- **«Mi nodo antiguo sigue funcionando, así que todo está bien».** Solo para NU7, ZIP 259 suspendió la regla habitual por la que el software anterior a la actualización se apaga antes de la activación. Un Zebra 6.x o un nodo `zcashd` puede seguir conectado con las reglas antiguas y quedar silenciosamente fuera de la red real. Comprueba que tu nodo indique una altura superior a 3,543,405 y coincida con un explorador de bloques.
- **«Los bloques más rápidos significan que se emite más ZEC».** No. El subsidio por bloque se redujo a un tercio, así que la emisión diaria no cambia.
- **«El 60 % de las comisiones se quema para siempre».** No. El NSM las retira y luego las vuelve a emitir para los mineros; el límite de suministro no cambia.
- **«El cambio de v4 solo afecta a los usuarios de Sprout».** Cualquier billetera o script que siga generando transacciones v4 dejó de funcionar, incluidas las transacciones solo transparentes y las de Sapling. Las transacciones v4 pendientes se invalidaron al activarse la actualización, y volver a firmarlas no basta para validarlas.
- **«La configuración basada en la cantidad de bloques sigue igual».** Todo lo que se mide en bloques (confirmaciones, vencimiento, tiempos de bloqueo y tiempos de espera) ahora transcurre tres veces más rápido en tiempo real.

## Glosario

| Término | Significado sencillo |
|---|---|
| Block target spacing | Tiempo promedio entre bloques al que apunta el ajuste de dificultad: 25 segundos desde NU7 |
| Block subsidy | Los nuevos ZEC que se crean en cada bloque y se reparten entre el minero y las fuentes de financiación del fondo de desarrollo |
| Shielded action | Una unidad de trabajo blindado en una transacción (una acción de Orchard o Ironwood, o una entrada o salida de Sapling) |
| Network Sustainability Mechanism (NSM) | Las reglas que retiran de circulación una parte de las comisiones y la vuelven a emitir para futuros mineros |
| NSM Value Balance | El total acumulado público de ZEC retiradas de circulación y pendientes de reemisión |
| Version 4 transaction | El formato de transacción de Sapling, invalidado por NU7; v5 y v6 siguen siendo válidas |
| Consensus branch ID | Número que identifica un conjunto de reglas de consenso; las firmas lo incorporan, por lo que una transacción firmada para las reglas antiguas es inválida con las nuevas |

## Preguntas frecuentes

**¿Cuándo se activó NU7?** En el bloque 3,543,405 de Mainnet, el 6 de noviembre de 2026 a las 02:34 UTC. Testnet se activó antes, en el bloque 4,465,026, el 4 de octubre de 2026.

**¿Cambió la recompensa por bloque?** Por bloque, sí: 0.52083333 ZEC en lugar de 1.5625 ZEC. Por día, no: unos 1,800 ZEC en ambos casos.

**¿Desapareció mi Sprout ZEC?** Ya no se puede mover, porque los gastos de Sprout requieren transacciones v4 y ahora son inválidas. Consulta [Recuperar fondos](../using-zcash/recovering-funds) para saber qué significa en la práctica.

**¿Necesito una billetera nueva?** Necesitas una versión de billetera compatible con NU7. La página de ZecHub[Billeteras](../using-zcash/wallets) de NU7 indica cuáles son compatibles.

**¿Cuándo empieza la reemisión de comisiones?** En el bloque 8,939,664 de Mainnet, previsto para alrededor de febrero de 2031 si los bloques mantienen un promedio de 25 segundos.

**¿Por qué NU7 no incluyó un formato de transacción nuevo?** Para evitar una segunda migración de billeteras y analizadores justo después del formato v6 de Ironwood, y porque la división de las comisiones se calcula por bloque, así que no hacía falta un campo nuevo en la transacción.

## Comprueba lo que aprendiste

1. ¿Por qué la emisión diaria de ZEC se mantiene igual después de NU7?
2. ¿Qué ocurre con el 60 % de las comisiones que se retiran de circulación?
3. ¿Por qué no se pueden gastar los fondos de Sprout después de NU7?
4. ¿Por qué es especialmente arriesgado que un nodo nunca se haya actualizado en esta actualización?

Respuestas: (1) el subsidio por bloque se redujo a un tercio mientras los bloques empezaron a llegar tres veces más seguido; (2) se acumulan en el Saldo de Valor del NSM y se vuelven a emitir para los mineros a partir del bloque 8,939,664; (3) los gastos de Sprout solo existen en formato v4, que NU7 invalidó; (4) ZIP 259 suspendió el apagado automático, así que un nodo antiguo puede seguir funcionando en la red equivocada.

### Recursos

[ZIP 259: Implementación de la actualización de red NU7](https://zips.z.cash/zip-0259)

[ZIP 218: Intervalo objetivo de 25 segundos entre bloques](https://zips.z.cash/zip-0218)

[ZIP 235: Retirar de circulación el 60 % de las comisiones por transacción](https://zips.z.cash/zip-0235)

[ZIP 237: Mecanismo de Sostenibilidad de la Red: emisión que mantiene los halvings](https://zips.z.cash/zip-0237)

[ZIP 2003: Prohibir las transacciones de versión 4](https://zips.z.cash/zip-2003)

[Zebra Notas de la versión 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash Foro de la comunidad: NU7 Cronología](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Páginas relacionadas

| Página | Por qué está relacionada |
|---|---|
| [Ironwood](./Ironwood.md) | la actualización anterior de la serie, que introdujo las transacciones v6 |
| [Qué cambian realmente los bloques de 25 segundos](../research/what-25-second-blocks-actually-change) | un análisis más detallado del menor tiempo entre bloques |
| [Mecanismo de Sostenibilidad de la Red](./Network_Sustainability_Mechanism.md) | cómo funcionan el retiro y la reemisión de comisiones tras la activación de NU7, con las cifras |
| [Sprout](./Sprout.md) | el pool que retiró NU7 |
| [Recuperar fondos](../using-zcash/recovering-funds) | qué significa para los fondos antiguos el congelamiento de Sprout |
| [Transacciones](../using-zcash/transactions) | vencimiento y confirmaciones después de NU7 |

---

Serie: índice de [Actualizaciones de red](../start-here/network-upgrades) · Anterior: [Ironwood](../zcash-tech/ironwood)
