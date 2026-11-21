<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Network_Sustainability_Mechanism.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Mecanismo de sostenibilidad de la red (NSM)

> El NSM forma parte del consenso de Zcash desde que [NU7](./NU7.md) se activó en Mainnet, en el bloque 3,543,405, el 6 de noviembre de 2026. Ya se están reservando comisiones; la reemisión a los mineros comenzará en el bloque 8,939,664 (previsto para alrededor de febrero de 2031).

Qué aprenderás: qué hace el Mecanismo de sostenibilidad de la red, qué parte de las comisiones de cada bloque retira, adónde va ese ZEC, cuándo y a qué ritmo vuelve como recompensa por bloque, y por qué el límite de 21 millones y el calendario de halving no cambian.

El Mecanismo de sostenibilidad de la red (NSM) es un conjunto de reglas de consenso que retira parte de ZEC de la circulación y se la devuelve a los mineros más adelante, a lo largo de muchos años. NU7 implementó dos de sus componentes: [ZIP 235](https://zips.z.cash/zip-0235), que retira de la circulación el 60 % de las comisiones por transacción de cada bloque, y [ZIP 237](https://zips.z.cash/zip-0237), que reemite el ZEC retirado por encima del subsidio normal del bloque, siguiendo una curva gradual. Ambos se activaron mediante [ZIP 259](https://zips.z.cash/zip-0259).

Por qué importa. Zcash paga la seguridad con ZEC nuevos en cada bloque, y ese subsidio se reduce a la mitad aproximadamente cada cuatro años. Cuando se vuelve pequeño, los mineros tienen que depender principalmente de las comisiones. El NSM es un primer paso hacia ese futuro: reserva parte de las comisiones actuales para pagárselas a los mineros del futuro, sin elevar el límite de suministro ni cambiar el calendario de halving en el que la gente ya confía.

## En resumen

- **Retiro ([ZIP 235](https://zips.z.cash/zip-0235)):** en cada bloque, el 60 % del total de las comisiones por transacción (redondeado hacia abajo, a favor del minero) sale de circulación. El minero conserva el otro 40 %.
- **Saldo de valor del NSM:** un total acumulado público de ZEC retirado de la circulación y aún no reemitido. Es un estado de consenso, no un pool del que alguien pueda disponer.
- **El saldo inicial:** en la activación de NU7, el saldo comenzó con **368.58445520 ZEC**, correspondientes a recompensas por bloque y comisiones que los primeros mineros dejaron sin reclamar antes de NU6.
- **Reemisión ([ZIP 237](https://zips.z.cash/zip-0237)):** a partir del bloque **8,939,664**, cada bloque añade al subsidio una fracción fija del saldo (0.00001375 %). Así se paga aproximadamente la mitad del saldo en cada período de halving de cuatro años.
- **Lo que no cambia:** el calendario de halving y el límite de 21 millones de ZEC como máximo. Si el saldo alguna vez llega a cero, la emisión sigue exactamente el calendario anterior.

## Analogía visual

Imagina un frasco de ahorro junto a la caja. Cada vez que se mina un bloque, el 60 % de las propinas (las comisiones) va al frasco en lugar de al bolsillo del minero. Nadie puede sacar dinero del frasco a mano. A partir de 2031, se añade una pequeña fracción fija de lo que haya en el frasco a cada recompensa por bloque, de modo que se vacía lentamente: aproximadamente la mitad cada cuatro años, al mismo ritmo que los halvings.

## Cómo funciona el retiro (ZIP 235)

- La regla se aplica por bloque, no por transacción. Para un bloque con comisiones totales de `F` (en zatoshi), la cantidad retirada es `floor(6 × F / 10)` y el minero puede reclamar `F` menos esa cantidad.
- El redondeo se hace una sola vez para todo el bloque y siempre a favor del minero. Redondear cada transacción por separado retiraría menos del 60 % en total (dos comisiones de 1 zatoshi aportarían 0 cada una).
- Ejemplo: si las transacciones de un bloque pagan 50,000 zatoshi (0.0005 ZEC) en comisiones, se retiran 30,000 zatoshi y el minero recibe 20,000. Si el bloque tiene 15 zatoshi en comisiones, se retiran 9 y el minero recibe 6.
- No se necesita ningún campo de transacción. Cada nodo calcula la cantidad a partir de las comisiones que ya valida, y [ZIP 236](https://zips.z.cash/zip-0236) hace que la transacción coinbase reclame exactamente lo que le corresponde al minero, para que este no pueda retirar menos ni reclamar más.
- Escala: ZIP 235 estimó, a partir del tráfico anterior a NU7, unos 370 ZEC en comisiones al año, por lo que se retirarían aproximadamente 222 ZEC al año. Hoy las comisiones son pequeñas en comparación con el subsidio por bloque; por eso los autores esperaban que el impacto en los mineros fuera reducido.

## Cómo funciona la reemisión (ZIP 237)

- **El saldo.** `NSMValueBalance` comienza con 368.58445520 ZEC (36,858,445,520 zatoshi) cuando se activa NU7. Cada bloque suma lo que retiró ZIP 235 y resta lo que se reemitió. Un bloque que dejara el saldo en negativo sería inválido.
- **El origen del saldo inicial.** Antes de NU6, una transacción coinbase podía reclamar menos que la recompensa total del bloque y sus comisiones. Durante los primeros 2,726,400 bloques de la red, los mineros dejaron sin reclamar 368.58445520 ZEC: el subsidio programado hasta esa altura era de 15,750,000 ZEC y el suministro emitido era de 15,749,631.41554480 ZEC. ZIP 237 incorpora ese valor al NSM para que se pague en lugar de perderse.
- **No habrá reemisión hasta el bloque 8,939,664.** Entre NU7 y esa altura, el saldo solo aumenta.
- **La fórmula.** A partir del bloque 8,939,664, el subsidio de cada bloque recibe un extra de `ceiling(0.0000001375 × NSMValueBalance)`, calculado a partir del saldo después del bloque anterior. La fracción es `floor(LN2_SCALED / HalvingInterval) / 10^10` = 1375 / 10,000,000,000, con un intervalo de halving posterior a NU7 de 5,040,000 bloques.
- **Por qué se eligió esa fracción.** `(1 − 0.0000001375)^5,040,000 ≈ 0.5`, de modo que, si no se retira nada más, se reemite aproximadamente la mitad del saldo en cada período de halving. Es una reducción exponencial aplicada solo al saldo del NSM, superpuesta a los pasos de halving, que no cambian.
- **Ejemplo práctico.** Si en el bloque 8,939,664 el saldo aún fuera únicamente el monto inicial de 368.58 ZEC, el primer bloque reemitiría 5,069 zatoshi (aproximadamente 0.00005 ZEC), es decir, unos 0.175 ZEC al día con 3,456 bloques diarios. Las cantidades reales serán mayores en función de las comisiones que se retiren hasta entonces.
- **Por qué se eligió el bloque 8,939,664.** ZIP 237 lo determina mediante una regla fija, independiente de la cantidad que realmente se retire: es el primer bloque después del tercer halving (bloque 6,132,390, previsto para alrededor de noviembre de 2028) en el que la fracción del NSM aplicada a todo el ZEC aún no programado para su emisión pagaría menos que el subsidio normal por bloque (0.26041666 ZEC en ese período). Las encuestas a titulares de NU7 y a la comunidad no lograron una mayoría común sobre cuándo debería empezar la reemisión, así que ZIP 259 adopta este punto de cruce.

## Lo que no cambió

- **El calendario de halving.** ZIP 237 mantiene los halvings cada cuatro años. La alternativa descartada, [ZIP 234](https://zips.z.cash/zip-0234), los habría reemplazado por una curva de emisión gradual. Las encuestas de agosto y septiembre de 2026 NU7 preguntaron si se debían conservar los halvings o suavizar la emisión, y NU7 implementó el diseño que los conserva.
- **El límite de suministro.** El suministro emitido más el saldo de valor del NSM aumenta exactamente en el subsidio por bloque programado en cada bloque, por lo que la emisión nunca puede superar el límite. De hecho, el límite disminuyó ligeramente: el redondeo de ZIP 218 del subsidio posterior a NU7 redujo la emisión total en unos 0.50 ZEC, y el NSM no reemite esa diferencia.
- **Retiro voluntario.** [ZIP 233](https://zips.z.cash/zip-0233), que permitiría a cualquiera enviar ZEC al NSM mediante un campo explícito en la transacción, no se implementó en NU7. Hoy, las comisiones son la única fuente de retiro. ZIP 237 permite que futuras ZIP incorporen otras fuentes.
- **Privacidad.** El saldo y el subsidio adicional se calculan a partir de valores que ya son públicos, por lo que el NSM no revela nada nuevo sobre las transacciones.

## Errores comunes

- **«Se quema el 60 % de las comisiones».** No es permanente. A diferencia de una quema (la comparación habitual es EIP-1559 de Ethereum), las ZEC retiradas se registran y se reemiten a los mineros del futuro.
- **«El NSM emite ZEC adicionales».** No. Solo reemite valor que se retiró o nunca se reclamó; la emisión total se mantiene por debajo del límite actual.
- **«Ya comenzó la reemisión».** Todavía no. Hasta el bloque 8,939,664, el saldo solo se acumula.
- **«El NSM es un fondo que alguien controla».** No. Es un número en el estado de consenso, y el valor solo sale de ahí mediante la fórmula del subsidio por bloque.
- **«Los halvings desaparecieron».** No. Ese era el diseño de ZIP 234, que NU7 no implementó.

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Mecanismo de sostenibilidad de la red (NSM) | Las reglas de consenso que retiran ZEC de la circulación y lo reemiten a los mineros más adelante |
| Saldo de valor del NSM | El total acumulado público de ZEC retirado de la circulación (o nunca reclamado) y aún no reemitido |
| Retiro de la circulación | Trasladar ZEC del suministro emitido al saldo de valor del NSM; desde NU7, esto corresponde al 60 % de las comisiones de cada bloque |
| Reemisión | Devolver ZEC desde el saldo de valor del NSM mediante un subsidio adicional por bloque, a partir del bloque 8,939,664 |
| Suministro emitido | Todo el ZEC en los pools de valor de la red; no incluye el saldo de valor del NSM |
| Subsidio por bloque | El ZEC nuevo que se crea en cada bloque y se reparte entre el minero y los flujos del fondo de desarrollo |
| Intervalo de halving | El número de bloques entre halvings: 5,040,000 desde NU7 (unos cuatro años con bloques de 25 segundos) |

## Preguntas frecuentes

**¿Cuánto hay hoy en el NSM?** El saldo inicial de 368.58445520 ZEC más el 60 % de las comisiones de cada bloque desde el bloque 3,543,405. Es un estado de consenso que todos los nodos completos siguen.

**¿Quién recibe el ZEC reemitido?** Se añade al subsidio por bloque, así que se reparte del mismo modo: los flujos del fondo de desarrollo reciben su porcentaje fijo del subsidio total (programado más reemitido) y el minero obtiene el resto.

**¿Cuándo comienza la reemisión?** En el bloque 8,939,664 de Mainnet, previsto para alrededor de febrero de 2031 si los bloques mantienen un promedio de 25 segundos. En Testnet, la altura sigue la misma regla a partir de la altura de activación de NU7 en Testnet.

**¿Subirán las comisiones por el NSM?** No. Cambia adónde van las comisiones, no cuánto paga una transacción.

**¿Puede cambiar la división 60/40?** Solo mediante una futura ZIP y una actualización de red. ZIP 235 indica que la división podría revisarse si aumentan las comisiones, por ejemplo, cuando superen el subsidio por bloque.

## Comprueba lo que aprendiste

1. Las transacciones de un bloque pagan 100,000 zatoshi en comisiones. ¿Cuánto conserva el minero?
2. ¿De dónde provino el saldo inicial del NSM?
3. Si no se retira nada más, ¿qué proporción aproximada del saldo del NSM se reemite en cada período de halving?
4. ¿Por qué la reemisión no eleva la emisión total por encima de 21 millones de ZEC?

Respuestas: (1) 40,000 zatoshi; se retiran 60,000; (2) de las recompensas por bloque y las comisiones que las transacciones coinbase dejaron sin reclamar antes de NU6, 368.58445520 ZEC; (3) aproximadamente la mitad; (4) la reemisión solo paga valor que se retiró o nunca se reclamó, por lo que el suministro emitido más el saldo del NSM aumenta exactamente en el subsidio programado de cada bloque.

### Recursos

[ZIP 235: Retirar de la circulación el 60 % de las comisiones por transacción](https://zips.z.cash/zip-0235)

[ZIP 237: Mecanismo de sostenibilidad de la red: emisión que conserva los halvings](https://zips.z.cash/zip-0237)

[ZIP 259: Implementación de la actualización de red NU7](https://zips.z.cash/zip-0259)

[ZIP 234: Mecanismo de sostenibilidad de la red: suavizado de la emisión (no implementado)](https://zips.z.cash/zip-0234)

[ZIP 233: Mecanismo de sostenibilidad de la red: retirar fondos de la circulación (no implementado)](https://zips.z.cash/zip-0233)

[ZIP 236: Los bloques deben cuadrar exactamente](https://zips.z.cash/zip-0236)

## Páginas relacionadas

| Página | Motivo de su relación |
|---|---|
| [NU7](./NU7.md) | la actualización de red que activó el NSM |
| [Zcash Política monetaria](../start-here/zcash-monetary-policy) | el calendario de halving y el límite de suministro que conserva el NSM |
| [Qué cambia realmente con los bloques de 25 segundos](../research/what-25-second-blocks-actually-change) | por qué cambiaron el subsidio y el intervalo de halving en NU7 |
| [Fondo de desarrollo](../start-here/development-fund) | cómo se reparte el subsidio por bloque |
| [Transacciones](../using-zcash/transactions) | cómo se fijan las comisiones por transacción |
