<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU6

> NU6 se activó en la red principal de Zcash en el bloque [block] 2,726,400 (23 de noviembre de 2024 UTC).

Lo que aprenderás: cómo Zcash sigue financiando su propio desarrollo después de un halving, por qué reservó una reserva que aún no sabía cómo gastar y cómo hizo que el suministro [supply] total de ZEC fuera exactamente predecible.

NU6 es una Zcash [actualización de red network upgrade](../start-here/network-upgrades), desplegada mediante [ZIP 253](https://zips.z.cash/zip-0253), que se activó en la red principal en noviembre de 2024, en el bloque 2,726,400. Es una actualización monetaria y de [financiación del desarrollo development-funding](../start-here/development-fund): mantuvo una parte de la subvención de bloque destinada al desarrollo tras el halving de noviembre de 2024, estableció una reserva dentro del protocolo para un uso futuro decidido por la comunidad y precisó cómo se contabiliza el nuevo ZEC. NU6 recibió el respaldo tanto de Electric Coin Company como de Zcash Foundation.

Por qué importa. Se preveía que el [Fondo de Desarrollo Development Fund](../zcash-tech/canopy) de Zcash terminara alrededor del halving de noviembre de 2024, el segundo de su historia. NU6 mantuvo esa financiación, pero, en lugar de entregar cada moneda a destinatarios fijos, reservó una parte dentro del protocolo para que la comunidad pudiera decidir más tarde qué hacer con ella. También cerró una discreta brecha contable, de modo que ahora se puede predecir exactamente la cantidad total de ZEC que existirá alguna vez.

## Lo que cambió NU6

NU6 siguió destinando el 20 % de la subvención de bloque a la financiación del desarrollo después del halving de noviembre de 2024, una regla definida en [ZIP 1015](https://zips.z.cash/zip-1015). Dividió ese 20 % de dos maneras.

1. El 8 % de la subvención de bloque va a Zcash Community Grants (ZCG), que financia trabajo realizado por y para la comunidad.
2. El 12 % se destina a una nueva caja de seguridad dentro del protocolo, conservada para un uso futuro decidido por la comunidad.

El resto de la subvención de bloque, más las tarifas [fees] de transacción, va a los mineros [miners] que protegen la red. NU6 también actualizó las reglas existentes de flujos de financiación y fondos de desarrollo (ZIP 207 y ZIP 214) para ajustarlas a esta nueva estructura.

![NU6 development-fund split: 20 percent of the block subsidy goes to development, with 8 percent to Zcash Community Grants and 12 percent into the Deferred Dev Fund Lockbox](/content-images/nu6-dev-fund-split-08bc73e317.webp)

## La caja de seguridad diferida

La participación del 12 % es la nueva idea en NU6. En lugar de pagarse a una dirección de destinatario, ese valor se deposita directamente en un pool [pool] dentro del protocolo llamado Deferred Dev Fund Lockbox, definido en [ZIP 2001](https://zips.z.cash/zip-2001).

1. La caja de seguridad es un nuevo tipo de flujo de financiación (DEFERRED_POOL), donde el valor de la recompensa de bloque entra en el propio protocolo, no a una persona u organización.
2. La red lo registra como su propio saldo de pool de valor de cadena, del mismo modo que registra los saldos de los pools blindados [shielded].
3. NU6 creó la caja de seguridad a propósito, pero dejó abierta la difícil pregunta: ¿quién controla esos fondos y cómo se liberan?

Esa pregunta fue respondida más tarde por [NU6.1](../zcash-tech/nu6-1), que estableció la gobernanza [governance]: continuó el flujo del 8 % de la subvención de bloque hacia Zcash Community Grants y dirigió un flujo del 12 % a un fondo controlado por los poseedores de monedas y financiado inicialmente por la caja de seguridad.

## Cuadrar las cuentas

NU6 también cerró una brecha contable en la forma en que se crea el nuevo ZEC, definida en [ZIP 236](https://zips.z.cash/zip-0236). Las transacciones Coinbase son las transacciones especiales que distribuyen el nuevo ZEC y las tarifas de cada bloque.

1. Antes de NU6, una transacción coinbase solo tenía que no reclamar más de lo que se le debía. Un minero podía reclamar menos que la subvención completa, lo que quemaba silenciosamente ese ZEC.
2. Después de NU6, una transacción coinbase debe cuadrar exactamente: el valor total de salida debe ser igual a la subvención del minero más las tarifas, ni más ni menos.
3. Como los mineros ya no pueden reclamar menos y quemar accidentalmente ZEC, ahora se puede predecir exactamente la cantidad total de ZEC que existirá alguna vez.

![Coinbase balancing before and after NU6: before, coinbase could under-claim and burn ZEC so supply was not exactly predictable. After, coinbase must balance exactly so issuance is exactly predictable](/content-images/nu6-coinbase-balance-0fa2394799.webp)

## Cómo evolucionó la financiación

NU6 es un capítulo de una historia más larga sobre cómo Zcash se financia a sí mismo.

1. Canopy (2020) puso fin a la recompensa original de los fundadores y creó el [fondo de desarrollo development fund](../start-here/development-fund).
2. NU6 (noviembre de 2024) reestructuró esa financiación después del segundo halving y estableció la Deferred Dev Fund Lockbox, reservando una parte de la emisión para subvenciones futuras decididas por la comunidad.
3. NU6.1 (2025) respondió la pregunta que NU6 dejó abierta, quién controla los fondos reservados, al mantener el 8 % de la subvención de bloque para Zcash Community Grants y dirigir el 12 % a un fondo controlado por los poseedores de monedas y financiado inicialmente por la caja de seguridad.

![How Zcash funding evolved: Canopy created the development fund, NU6 set up the lockbox, and NU6.1 set the rules for who controls it](/content-images/nu6-funding-timeline-2427db58c0.webp)

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Block subsidy | El nuevo ZEC creado con cada bloque minado |
| Coinbase transaction | La transacción especial que distribuye la subvención y las tarifas de un bloque |
| Deferred Dev Fund Lockbox | Una reserva dentro del protocolo que conserva una parte de la emisión para un uso futuro decidido por la comunidad |
| Zcash Community Grants (ZCG) | Un comité que financia trabajo realizado por y para la comunidad de Zcash |
| Consensus branch id | El identificador que usan los nodos [nodes] para determinar las reglas de qué actualización sigue un bloque |
| Network upgrade (NU) | Un cambio coordinado en las reglas de consenso de Zcash, activado a una altura de bloque determinada |

## Preguntas frecuentes

¿NU6 cambia mi ZEC o mi privacidad [privacy]? No. NU6 trata sobre cómo se financia el desarrollo y cómo se contabiliza la emisión, no sobre tus transacciones ni tu privacidad. Tus fondos y transacciones blindadas no se ven afectados.

¿De dónde procede la financiación? De la subvención de bloque, el nuevo ZEC emitido a medida que se minan bloques. Una participación del 20 % se dirige al desarrollo en lugar de que todo vaya a los mineros.

¿Para qué sirve la caja de seguridad? Reserva una parte de la emisión dentro del protocolo para que la comunidad pueda decidir más tarde cómo utilizarla. NU6 apartó la reserva, y NU6.1 estableció las reglas sobre quién la controla.

¿La regla de saldo exacto cambia mis monedas? No. Solo exige que la transacción coinbase de cada bloque distribuya exactamente lo que se le debe. Afecta a la contabilidad de la nueva emisión, no a los saldos existentes.

¿Qué define técnicamente NU6? NU6 se despliega mediante ZIP 253, que establece su activación en la red principal en el bloque 2,726,400 y su ID de rama de consenso. Los propios cambios de consenso proceden de ZIP 236, ZIP 1015 y ZIP 2001, con ZIP 207 y ZIP 214 actualizados para ajustarse.

¿En qué se diferencia NU6 de NU6.1? NU6 reestructuró la financiación y creó la caja de seguridad. NU6.1 decidió quién controla los fondos de la caja de seguridad y cómo se divide la participación reservada.

## Pon a prueba tu comprensión

NU6 estableció la Deferred Dev Fund Lockbox, pero no dijo quién la controla. ¿Por qué una actualización crearía una reserva y dejaría deliberadamente su gobernanza para más adelante?

<details>
<summary>Respuesta</summary>

La creación de la reserva consolidó que una parte de la emisión se apartaría dentro del protocolo en lugar de pagarse a destinatarios fijos. Decidir quién controla esos fondos y cómo se liberan es una cuestión de gobernanza más difícil. NU6 dejó esto deliberadamente abierto, y NU6.1 lo respondió: el 8 % de la subvención de bloque continúa hacia Zcash Community Grants y el 12 % va a un fondo controlado por los poseedores de monedas y financiado inicialmente por la caja de seguridad.
</details>

### Recursos

[ZIP 253: Despliegue de la actualización de red NU6](https://zips.z.cash/zip-0253)

[ZIP 236: Los bloques deben cuadrar exactamente](https://zips.z.cash/zip-0236)

[ZIP 1015: Asignación de subvención de bloque para financiación del desarrollo no directa](https://zips.z.cash/zip-1015)

[ZIP 2001: Flujos de financiación de caja de seguridad](https://zips.z.cash/zip-2001)

[Actualización de red 6 (NU6)](https://z.cash/upgrade/nu6/)

### Véase también

[Zcash Actualizaciones de red](../start-here/network-upgrades)

[Fondo de Desarrollo](../start-here/development-fund)

[Zcash Política monetaria](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[Qué es ZEC y Zcash](../start-here/what-is-zec-and-zcash)

---

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Anterior: [NU5](../zcash-tech/nu5) · Siguiente: [NU6.1](../zcash-tech/nu6-1)
