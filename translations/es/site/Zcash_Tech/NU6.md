---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# NU6

> NU6 se activó en la mainnet de Zcash en el bloque 2,726,400 (23 de noviembre de 2024 UTC).

Qué aprenderás: cómo Zcash sigue financiando su propio desarrollo después de un halving, por qué apartó una reserva que todavía no sabía cómo gastar y cómo hizo que el suministro total de ZEC fuera exactamente predecible.

NU6 es una [actualización de red](../start-here/network-upgrades) de Zcash, implementada por [ZIP 253](https://zips.z.cash/zip-0253), que se activó en mainnet en noviembre de 2024 en el bloque 2,726,400. Es una actualización monetaria y de [financiación del desarrollo](../start-here/development-fund): mantuvo una parte del subsidio de bloque destinada al desarrollo después del halving de noviembre de 2024, creó una reserva dentro del protocolo para un uso futuro decidido por la comunidad y ajustó la forma en que se contabiliza el nuevo ZEC. NU6 fue respaldada tanto por Electric Coin Company como por Zcash Foundation.

Por qué esto importa. El [Development Fund](../zcash-tech/canopy) de Zcash estaba programado para terminar alrededor del halving de noviembre de 2024, el segundo de su historia. NU6 mantuvo esa financiación, pero en lugar de entregar cada moneda a destinatarios fijos, reservó una parte dentro del protocolo para que la comunidad decidiera más adelante qué hacer con ella. También cerró una discreta brecha contable, de modo que la cantidad total de ZEC que existirá alguna vez ahora puede predecirse con exactitud.

## Qué cambió con NU6

NU6 siguió destinando el 20% del subsidio de bloque a la financiación del desarrollo después del halving de noviembre de 2024, una regla definida en [ZIP 1015](https://zips.z.cash/zip-1015). Dividió ese 20% de dos maneras.

1. El 8% del subsidio de bloque va a Zcash Community Grants (ZCG), que financia trabajo realizado por y para la comunidad.
2. El 12% va a una nueva lockbox dentro del protocolo, reservada para un uso futuro decidido por la comunidad.

El resto del subsidio de bloque, más las comisiones de transacción, va a los mineros que protegen la red. NU6 también actualizó las reglas existentes de funding streams y del dev fund (ZIP 207 y ZIP 214) para adaptarlas a esta nueva estructura.

![División del fondo de desarrollo en NU6: el 20 por ciento del subsidio de bloque va al desarrollo, con un 8 por ciento para Zcash Community Grants y un 12 por ciento a la Deferred Dev Fund Lockbox](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-dev-fund-split.png)

## La lockbox diferida

La parte del 12% es la nueva idea de NU6. En lugar de pagarse a una dirección receptora, ese valor se deposita directamente en un fondo dentro del protocolo llamado Deferred Dev Fund Lockbox, definido en [ZIP 2001](https://zips.z.cash/zip-2001).

1. La lockbox es un nuevo tipo de funding stream (DEFERRED_POOL), en el que el valor de la recompensa de bloque entra en el propio protocolo, no a una persona u organización.
2. La red la rastrea como su propio saldo de fondo de valor de la cadena, de la misma manera que rastrea los saldos de los fondos blindados.
3. NU6 creó la lockbox a propósito, pero dejó abierta la pregunta difícil: ¿quién controla esos fondos y cómo se liberan?

Esa pregunta se respondió más tarde con [NU6.1](../zcash-tech/nu6-1), que estableció la gobernanza: continuó el flujo del 8% del subsidio de bloque hacia Zcash Community Grants y dirigió un flujo del 12% a un fondo controlado por los poseedores de monedas, financiado inicialmente por la lockbox.

## Cuadrando las cuentas

NU6 también cerró una brecha contable en la forma en que se crea nuevo ZEC, definida en [ZIP 236](https://zips.z.cash/zip-0236). Las transacciones coinbase son las transacciones especiales que pagan el nuevo ZEC y las comisiones de cada bloque.

1. Antes de NU6, una transacción coinbase solo tenía que no reclamar más de lo que le correspondía. Un minero podía reclamar menos que el subsidio completo, lo que quemaba silenciosamente ese ZEC.
2. Después de NU6, una transacción coinbase debe cuadrar exactamente: el valor total de salida debe ser igual al subsidio del minero más las comisiones, ni más ni menos.
3. Como los mineros ya no pueden reclamar de menos y quemar ZEC accidentalmente, la cantidad total de ZEC que existirá alguna vez ahora puede predecirse con exactitud.

![Balance de coinbase antes y después de NU6: antes, coinbase podía reclamar de menos y quemar ZEC, por lo que el suministro no era exactamente predecible. Después, coinbase debe cuadrar exactamente, por lo que la emisión es exactamente predecible](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-coinbase-balance.png)

## Cómo evolucionó la financiación

NU6 es un capítulo dentro de una historia más larga sobre cómo Zcash se financia a sí misma.

1. Canopy (2020) puso fin a la recompensa original de los fundadores y creó el [development fund](../start-here/development-fund).
2. NU6 (noviembre de 2024) reestructuró esa financiación después del segundo halving y creó la Deferred Dev Fund Lockbox, reservando una parte de la emisión para subvenciones futuras decididas por la comunidad.
3. NU6.1 (2025) respondió a la pregunta que NU6 dejó abierta, quién controla los fondos reservados, manteniendo el 8% del subsidio de bloque para Zcash Community Grants y dirigiendo el 12% a un fondo controlado por los poseedores de monedas y financiado inicialmente por la lockbox.

![Cómo evolucionó la financiación de Zcash: Canopy creó el development fund, NU6 creó la lockbox y NU6.1 fijó las reglas sobre quién la controla](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-funding-timeline.png)

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Subsidio de bloque | El nuevo ZEC que se crea con cada bloque minado |
| Transacción coinbase | La transacción especial que paga el subsidio y las comisiones de un bloque |
| Deferred Dev Fund Lockbox | Una reserva dentro del protocolo que mantiene una parte de la emisión para un uso futuro decidido por la comunidad |
| Zcash Community Grants (ZCG) | Un comité que financia trabajo realizado por y para la comunidad de Zcash |
| Consensus branch id | El identificador que usan los nodos para saber qué reglas de actualización sigue un bloque |
| Actualización de red (NU) | Un cambio coordinado en las reglas de consenso de Zcash, activado a una altura de bloque determinada |

## Preguntas frecuentes

¿NU6 cambia mi ZEC o mi privacidad? No. NU6 trata sobre cómo se financia el desarrollo y cómo se contabiliza la emisión, no sobre tus transacciones ni tu privacidad. Tus fondos y transacciones blindadas no se ven afectados.

¿De dónde viene la financiación? Del subsidio de bloque, el nuevo ZEC emitido a medida que se minan bloques. Una parte del 20% se dirige al desarrollo en lugar de ir toda a los mineros.

¿Para qué sirve la lockbox? Reserva una parte de la emisión dentro del protocolo para que la comunidad pueda decidir más adelante cómo usarla. NU6 apartó la reserva, y NU6.1 estableció las reglas sobre quién la controla.

¿La regla de balance exacto cambia mis monedas? No. Solo exige que la transacción coinbase de cada bloque pague exactamente lo que le corresponde. Afecta a la contabilidad de la nueva emisión, no a los saldos existentes.

¿Qué define técnicamente a NU6? NU6 es implementada por ZIP 253, que fija su activación en mainnet en el bloque 2,726,400 y su consensus branch id. Los cambios de consenso en sí provienen de ZIP 236, ZIP 1015 y ZIP 2001, con ZIP 207 y ZIP 214 actualizados para ajustarse.

¿En qué se diferencia NU6 de NU6.1? NU6 reestructuró la financiación y creó la lockbox. NU6.1 decidió quién controla los fondos de la lockbox y cómo se divide la parte reservada.

## Pon a prueba tu comprensión

NU6 creó la Deferred Dev Fund Lockbox pero no dijo quién la controla. ¿Por qué una actualización crearía una reserva y dejaría deliberadamente su gobernanza para más adelante?

<details>
<summary>Respuesta</summary>

Crear la reserva garantizó que una parte de la emisión quedara apartada dentro del protocolo en lugar de pagarse a destinatarios fijos. Decidir quién controla esos fondos y cómo se liberan es una cuestión de gobernanza más difícil. NU6 dejó eso deliberadamente abierto, y NU6.1 lo respondió: el 8% del subsidio de bloque sigue yendo a Zcash Community Grants, y el 12% va a un fondo controlado por los poseedores de monedas y financiado inicialmente por la lockbox.
</details>

### Recursos

[ZIP 253: Implementación de la actualización de red NU6](https://zips.z.cash/zip-0253)

[ZIP 236: Los bloques deben cuadrar exactamente](https://zips.z.cash/zip-0236)

[ZIP 1015: Asignación del subsidio de bloque para financiación del desarrollo no directa](https://zips.z.cash/zip-1015)

[ZIP 2001: Funding Streams Lockbox](https://zips.z.cash/zip-2001)

[Network Upgrade 6 (NU6)](https://z.cash/upgrade/nu6/)

### Ver también

[Actualizaciones de red de Zcash](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Política monetaria de Zcash](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[Qué son ZEC y Zcash](../start-here/what-is-zec-and-zcash)

---

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Anterior: [NU5](../zcash-tech/nu5) · Siguiente: [NU6.1](../zcash-tech/nu6-1)
