---
# El torniquete

## TL;DR

- El torniquete es una regla pública de contabilidad que rastrea cuánto valor entra y sale de cada pool blindado
- Permite que cualquiera verifique que un pool nunca paga más de lo que recibió, aunque las transacciones dentro de él sean privadas
- Esto protege el suministro de ZEC frente a un bug oculto, porque las monedas falsificadas no pueden salir de un pool sin romper el conteo
- Funciona sin debilitar la privacidad, ya que solo los totales del pool son públicos, nunca las transacciones individuales
- El torniquete es la razón por la que la migración de Orchard a Ironwood puede demostrar que el suministro blindado es sólido

<br/>

## Para quién es esto

- Cualquiera que quiera entender cómo Zcash mantiene confiable su suministro privado
- Usuarios que siguen la migración de Orchard a Ironwood y se preguntan cómo demuestra que el suministro es real
- Personas nuevas con curiosidad sobre cómo un sistema de dinero privado aún puede auditarse

<br/>

## El desafío

El Zcash blindado oculta montos, remitentes y destinatarios. Esa privacidad es precisamente el objetivo. Pero plantea una pregunta difícil: si nadie puede ver dentro del pool blindado, ¿cómo sabe alguien que la cantidad total de ZEC es correcta? ¿Cómo auditas dinero que no puedes ver?

Si un bug alguna vez permitiera a alguien falsificar monedas dentro de un pool blindado, la falsificación quedaría oculta por la misma privacidad que protege a los usuarios honestos. Sin una salvaguarda, esa incertidumbre socavaría la confianza en todo el suministro. El torniquete es la salvaguarda que resuelve esto.

<br/>

## Qué es el torniquete

Piensa en cada pool blindado como una habitación con una única puerta contada. Cada vez que un valor entra al pool desde afuera, o sale hacia otro lugar, pasa por esa puerta y se registra públicamente. Las transacciones dentro de la habitación siguen siendo privadas, pero el total acumulado en la puerta es visible para todos.

La regla es simple: un pool nunca puede dejar salir más valor del que ha entrado. Los nodos rechazan cualquier bloque que hiciera que el saldo de un pool bajara de cero. La cantidad que se cree que hay dentro de un pool se conoce en todo momento, porque no es más que el total que entró menos el total que salió. Ese conteo público es el torniquete.

<br/>

## Cómo funciona

Zcash ha tenido varios pools blindados a lo largo de su historia, como Sprout, Sapling y Orchard. El valor se mueve entre la cadena transparente y estos pools, y a veces también entre los propios pools. El torniquete observa esos movimientos:

1. Cuando ZEC entra en un pool blindado, la cantidad se suma al saldo público de ese pool
2. Cuando ZEC sale de un pool, la cantidad se resta
3. La red rechaza cualquier bloque que hiciera que el saldo de un pool fuera negativo, lo que significaría que salió más de lo que alguna vez entró
4. Las transacciones blindadas individuales siguen siendo totalmente privadas; solo los totales del pool son públicos

La red rastrea de esta manera un saldo para cada pool de valor, incluidos Sprout, Sapling, Orchard, el nuevo pool Ironwood, y los saldos transparentes y de lockbox. Gracias a esto, incluso si el contenido exacto de un pool está oculto, el máximo que puede salir de él siempre está limitado por lo que entró. Ninguna inflación oculta puede escapar a la circulación.

<br/>

## Cómo se verifica el balance de valor

El conteo en la puerta solo es confiable porque cada transacción está obligada a demostrar que movió una cantidad veraz, aunque la cantidad en sí permanezca oculta. Cada transacción blindada publica un único número honesto: el valor neto que mueve hacia dentro o hacia fuera del pool, llamado su balance de valor. Un balance de valor positivo significa que los fondos salieron del pool hacia el lado transparente; uno negativo significa que los fondos entraron. Los detalles privados permanecen sellados, pero esta única cifra neta es pública, y es lo que el torniquete va sumando.

La parte ingeniosa es cómo una transacción demuestra que ese número público es honesto sin revelar las cantidades privadas que hay detrás. El mecanismo difiere según el pool, y esa es la verdadera maquinaria del torniquete.

En el pool original Sprout, cada transacción usa un JoinSplit. Un JoinSplit gasta dos notes ocultas y crea dos nuevas, y lleva dos campos públicos: vpub_old, el valor que entra al pool blindado desde el lado transparente, y vpub_new, el valor que sale del pool de vuelta al lado transparente. Todo JoinSplit debe cuadrar por sí solo, y su prueba de conocimiento cero garantiza que las entradas ocultas y las salidas ocultas suman correctamente. El saldo del pool Sprout es simplemente el total acumulado de todos los vpub_old menos todos los vpub_new a lo largo de la cadena. Por eso Sprout es un ejemplo útil más adelante: como vpub_old es la única forma en que el valor puede entrar al pool, una sola regla que lo desactive puede sellar el pool para siempre.

En Sapling, Orchard e Ironwood, el balance se demuestra de una forma más inteligente, usando una binding signature. En lugar de que cada transferencia cuadre por sí sola, toda la transacción compromete cada cantidad oculta usando un value commitment. Un value commitment es un sobre sellado para un número, construido con un compromiso de Pedersen homomórfico, que tiene una propiedad especial: los sobres pueden sumarse y restarse sin abrirlos. La red suma todos los commitments de entrada, resta todos los commitments de salida y compara el resultado con la única cifra neta declarada por la transacción, su campo valueBalance. Solo una transacción cuyas cantidades ocultas realmente coincidan con ese valueBalance público puede producir una binding signature válida sobre los commitments combinados. Si alguien intentara mover más valor del que declaró, los commitments no cuadrarían, la binding signature no se verificaría y la transacción sería rechazada. Ironwood usa el mismo protocolo que Orchard, por lo que funciona de la misma manera.

Esto también es lo que hace que una transferencia entre pools pueda verificarse de forma segura. Cuando los fondos se mueven de un pool blindado a otro, por ejemplo de Orchard a Ironwood, la transacción no puede ocultar las cantidades a la contabilidad. Cada pool tiene su propio balance de valor que debe ser satisfecho por sus propias pruebas: el lado de Orchard debe mostrar una salida coincidente mediante su binding signature, y el lado de Ironwood debe mostrar la entrada correspondiente mediante la suya. El valor que sale de un pool y el valor que entra en el otro se prueban cada uno de manera independiente, así que un movimiento entre pools son en realidad dos cruces de torniquete ocurriendo en una sola transacción, uno de salida y otro de entrada, y ambos se contabilizan públicamente aunque las cantidades subyacentes sigan siendo privadas.

Así que el torniquete no es confianza. Cada transacción demuestra matemáticamente su propio efecto neto, la red suma esos efectos netos probados por pool, y una regla de consenso (ZIP 209) rechaza cualquier bloque que llevaría el saldo de un pool a negativo. Prueba a nivel de transacción, aplicación a nivel de cadena.

<br/>

## Por qué importa

El torniquete le da a Zcash tres cosas al mismo tiempo.

Primero, compartimentaliza el riesgo. Un bug criptográfico en un pool queda contenido en ese pool, porque el torniquete impide que el valor falsificado cruce hacia el suministro más amplio.

Segundo, permite a la comunidad verificar el suministro de forma retrospectiva. Si más adelante se descubre un bug, el registro del torniquete muestra si alguna vez salió más valor de un pool del que entró. Un historial limpio es una fuerte evidencia de que no se explotó ninguna falsificación.

Tercero, preserva la privacidad mientras hace todo esto. Solo los totales a nivel de pool son públicos. Tus transacciones individuales siguen blindadas. La auditabilidad y la privacidad coexisten, lo cual es inusual y es una de las fortalezas silenciosas de Zcash.

<br/>

## El torniquete en acción

El torniquete no es nuevo, y se ha usado en momentos clave de la historia de Zcash.

Cuando Zcash pasó del pool original Sprout al más nuevo pool Sapling, el torniquete protegió la transición. Más tarde, el pool Sprout fue restringido para que no pudiera recibir nuevas entradas, lo que incentivó a los usuarios a migrar mientras el torniquete mantenía la contabilidad honesta. Años después, el hecho de que nunca haya salido indebidamente valor de Sprout sirve como evidencia de que su criptografía temprana nunca fue explotada con éxito.

Ese mismo diseño ahora protege el paso de Orchard a Ironwood. En 2026 se encontró y corrigió un bug de solidez en el sistema de pruebas de Orchard. No hay evidencia de que alguna vez se haya explotado, pero como la actividad blindada es privada, la certeza era imposible. La respuesta consiste en sellar el viejo pool Orchard y hacer que todos migren sus fondos a través del torniquete hacia Ironwood, un pool nuevo que usa el protocolo corregido. Forzar que los fondos pasen por el torniquete significa que cualquier moneda falsificada hipotética que quede atrás no puede seguirlas, y una vez completada la migración, cualquiera puede confirmar que el suministro blindado es sólido.

<br/>

## Deprecación de pool en una sola dirección

El torniquete hace posible retirar de forma segura un pool antiguo, en una sola dirección, sin romper nunca la garantía del suministro. El truco es cerrar la entrada mientras se deja abierta la salida.

Sprout es el ejemplo más claro. Para deprecarlo, ZIP 211 añadió una sola regla de consenso: a partir de su altura de activación, el campo vpub_old de cada JoinSplit debe ser cero. Como vpub_old es la única forma en que el valor puede entrar en Sprout, obligarlo a ser cero significa que ningún valor nuevo puede volver a entrar, mientras que el valor todavía puede salir hacia el lado transparente o avanzar hacia Sapling. El pool se volvió unidireccional. Solo puede vaciarse, nunca llenarse. El torniquete sigue contando todo el tiempo, así que el saldo puede bajar a medida que los fondos salen, pero nunca puede subir, y nunca puede volverse negativo.

La migración de Orchard a Ironwood usa la misma idea. En la actualización NU6.3, el pool Orchard se cierra a nuevas entradas, y los wallets reciben instrucciones para enviar los fondos de Orchard a través del torniquete hacia el nuevo pool Ironwood. Orchard se convierte en un pool unidireccional que solo puede vaciarse. Como cada salida es un cruce de torniquete que debe ser probado, cualquier valor falsificado hipotético que quede atrás en Orchard no puede seguir silenciosamente a los fondos honestos hacia afuera. Queda atrapado en un pool que solo se vacía y cuya puerta está vigilada. Con el tiempo, esto empuja al viejo pool hacia el vacío y permite que cualquiera confirme que el valor que salió nunca fue mayor que el valor que entró honestamente.

Esta es la razón más profunda por la que el torniquete importa más allá de la simple contabilidad. Es el mecanismo que permite a Zcash deprecar un pool blindado, ya sea para reducir complejidad como con Sprout, o para recuperarse de un bug descubierto como con Orchard, manteniendo al mismo tiempo una garantía continua, pública y demostrable sobre el suministro.

<br/>

## Malentendidos comunes

- El torniquete no revela tus transacciones. Solo contabiliza los totales del pool, no quién envió qué a quién
- No atrapa a un falsificador por nombre. Limita cuánto puede salir de un pool, y eso es lo que protege el suministro
- No es una invención nueva para Ironwood. Ha protegido cada gran transición de pools blindados en la historia de Zcash
- Un total público del pool no debilita la privacidad. La privacidad está en las transacciones dentro del pool, que permanecen ocultas

<br/>

## Recursos

1. [ZIP 209: Prohibit Out-of-Range Chain Value Pool Balances](https://zips.z.cash/zip-0209) - la regla de consenso detrás del torniquete
2. [ZIP 211: Disabling Addition of New Value to the Sprout Chain Value Pool](https://zips.z.cash/zip-0211) - cómo se cerró el pool Sprout a nuevos depósitos
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - la actualización que introduce el pool Ironwood y dirige el valor a través del torniquete
4. [Turnstile Enforcement Against Counterfeiting](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - la explicación original de Electric Coin Company
5. [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) - consulta las secciones sobre balance y binding signature para ver todos los detalles
6. [Value Pools, the Zebra Book](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - cómo un nodo rastrea el balance de valor de cada pool

<br/>

## Páginas relacionadas

- [Pools blindados](https://zechub.wiki/using-zcash/shielded-pools) - cómo las transacciones blindadas de Zcash mantienen los detalles privados
- [Halo](https://zechub.wiki/zcash-tech/halo) - el sistema de pruebas detrás del pool Orchard
- [Actualizaciones de red](https://zechub.wiki/start-here/network-upgrades) - cómo Zcash activa cambios como nuevos pools blindados
