# El turnstile [turnstile]

## TL;DR

- El turnstile es una regla pública de contabilidad que rastrea cuánto valor entra y sale de cada pool blindado [shielded pool]
- Permite que cualquiera verifique que un pool nunca paga más de lo que se ha depositado en él, aunque las transacciones [transactions] dentro sean privadas
- Esto protege el suministro de ZEC de un error oculto, porque las monedas falsificadas no pueden salir de un pool sin romper el recuento
- Los pagos [payments] dentro de un pool siguen siendo privados. Una transacción que mueve ZEC entre pools muestra la cantidad que mueve
- El turnstile es la razón por la que la migración de Orchard a Ironwood puede demostrar que el suministro blindado es sólido

<br/>

## Para quién es esto

- Cualquiera que quiera entender cómo Zcash mantiene fiable su suministro privado
- Usuarios que siguen la migración de Orchard a Ironwood y se preguntan cómo demuestra que el suministro es real
- Personas recién llegadas que sienten curiosidad por saber cómo un sistema monetario privado puede seguir siendo auditable

<br/>

## El desafío

Zcash blindado oculta cantidades, remitentes y destinatarios. Esa privacidad [privacy] es el propósito. Pero plantea una pregunta difícil: si nadie puede ver dentro del pool blindado, ¿cómo sabe alguien que la cantidad total de ZEC es correcta? ¿Cómo se audita dinero que no se puede ver?

Si un error alguna vez permitiera a alguien falsificar monedas dentro de un pool blindado, la falsificación quedaría oculta por la misma privacidad que protege a los usuarios honestos. Sin una salvaguarda, esa incertidumbre socavaría la confianza en todo el suministro. El turnstile es la salvaguarda que resuelve esto.

<br/>

## Qué es el turnstile

Piensa en cada pool blindado como una sala con una única puerta contabilizada. Cada vez que el valor entra al pool desde fuera, o sale de él para ir a otro lugar, pasa por la puerta y se registra públicamente. Las transacciones dentro de la sala permanecen privadas, pero el total acumulado en la puerta es visible para todos.

La regla es sencilla: un pool nunca puede dejar salir más valor del que ha entrado. Los nodos [nodes] rechazan cualquier bloque [block] que haga que el saldo de un pool quede por debajo de cero. La cantidad que se cree que hay dentro de un pool se conoce en todo momento, porque es simplemente el total que entró menos el total que salió. Este recuento público es el turnstile.

<br/>

## Cómo funciona

Zcash ha tenido varios pools blindados a lo largo de su historia, como Sprout, Sapling y Orchard. El valor se mueve entre la cadena transparente y estos pools, y a veces entre los propios pools. El turnstile vigila esos movimientos:

1. Cuando ZEC entra en un pool blindado, la cantidad se añade al saldo público de ese pool
2. Cuando ZEC sale de un pool, la cantidad se resta
3. La red rechaza cualquier bloque que haga que el saldo de un pool sea negativo, lo que significa que ha salido más de lo que jamás entró
4. Cada transacción muestra solo su flujo neto hacia dentro o fuera de un pool, su saldo de valor [value balance]. Para un pago dentro de un pool, eso es solo la tarifa [fee]

La red rastrea de esta manera un saldo para cada pool de valor, incluidos Sprout, Sapling, Orchard, el nuevo pool Ironwood, y los saldos transparente y lockbox. Debido a esto, incluso si el contenido exacto de un pool está oculto, el máximo que puede salir está limitado por lo que entró. Ninguna inflación oculta puede escapar a la circulación.

<br/>

## Cómo se verifica el saldo de valor

El recuento en la puerta solo es fiable porque cada transacción está obligada a demostrar que movió una cantidad veraz, aunque la propia cantidad permanezca oculta. Cada transacción blindada publica un número honesto: el valor neto que mueve hacia dentro o fuera del pool, denominado saldo de valor. Un saldo de valor positivo significa que los fondos salieron del pool hacia el lado transparente; uno negativo significa que los fondos entraron. Los detalles privados permanecen sellados, pero esta única cifra neta es pública y es lo que suma el turnstile.

La parte ingeniosa es cómo una transacción demuestra que ese número público es honesto sin revelar las cantidades privadas que hay detrás. El mecanismo difiere según el pool, y esta es la verdadera maquinaria del turnstile.

En el pool original Sprout, cada transacción utiliza un JoinSplit. Un JoinSplit gasta dos notas [notes] ocultas y crea dos nuevas, y contiene dos campos públicos: vpub_old, el valor que entra al pool blindado desde el lado transparente, y vpub_new, el valor que sale del pool de vuelta al lado transparente. Cada JoinSplit debe cuadrar por sí mismo, y su prueba zero-knowledge [zero-knowledge proof] garantiza que las entradas ocultas y las salidas ocultas suman correctamente. El saldo del pool de Sprout es simplemente el total acumulado de todos los vpub_old menos todos los vpub_new a lo largo de la cadena. Por eso Sprout es un ejemplo útil más adelante: dado que vpub_old es la única forma en que el valor puede entrar al pool, una sola regla que lo desactive puede sellar el pool para siempre.

En Sapling, Orchard y Ironwood, el saldo se demuestra de una forma más inteligente, utilizando una firma vinculante [binding signature]. En lugar de que cada transferencia se equilibre por sí sola, toda la transacción se compromete con cada cantidad oculta mediante un compromiso de valor [value commitment]. Un compromiso de valor es un sobre sellado para un número, construido con un compromiso Pedersen homomórfico, que tiene una propiedad especial: los sobres pueden sumarse y restarse sin abrirlos. La red suma todos los compromisos de entrada, resta todos los compromisos de salida y compara el resultado con la única cifra neta declarada de la transacción, su campo valueBalance. Solo una transacción cuyas cantidades ocultas coincidan realmente con ese valueBalance público puede producir una firma vinculante válida sobre los compromisos combinados. Si alguien intentara mover más valor del que declaró, los compromisos no cuadrarían, la firma vinculante no se verificaría y la transacción sería rechazada. Ironwood utiliza el mismo protocolo Orchard, por lo que funciona de la misma manera.

Esto también es lo que hace que una transferencia entre pools sea segura de verificar. Cuando los fondos se mueven de un pool blindado a otro, por ejemplo de Orchard a Ironwood, la transacción no puede ocultar las cantidades de la contabilidad. Cada pool tiene su propio saldo de valor que debe satisfacerse mediante sus propias pruebas: el lado Orchard debe mostrar una salida coincidente mediante su firma vinculante, y el lado Ironwood debe mostrar la entrada correspondiente mediante la suya. El valor que sale de un pool y el valor que entra en el otro se demuestran de forma independiente, por lo que un movimiento entre pools son en realidad dos cruces del turnstile que suceden en una transacción, uno de salida y otro de entrada, y ambos se registran públicamente aunque las cantidades subyacentes permanezcan privadas.

Así que el turnstile no es confianza. Cada transacción demuestra matemáticamente su propio efecto neto, la red suma esos efectos netos demostrados por pool, y una regla de consenso [consensus] (ZIP 209) rechaza cualquier bloque que haga que el saldo de un pool sea negativo. Prueba a nivel de transacción, aplicación a nivel de cadena.

<br/>

## Por qué importa

El turnstile proporciona a Zcash tres cosas a la vez.

Primero, compartimenta el riesgo. Un error criptográfico en un pool queda contenido en ese pool, porque el turnstile impide que el valor falsificado cruce hacia el suministro más amplio.

Segundo, permite a la comunidad verificar el suministro retrospectivamente. Si más tarde se descubre un error, el registro del turnstile muestra si alguna vez salió más valor de un pool del que entró. Un registro limpio es una evidencia sólida de que no se explotó ninguna falsificación.

Tercero, mantiene privados los pagos dentro de un pool mientras hace todo esto. Cada transacción publica solo su flujo neto hacia dentro o fuera de un pool, que para un pago dentro de un pool es solo la tarifa. Una transferencia entre pools, como de Orchard a Ironwood, muestra la cantidad que cruza. La auditabilidad y la privacidad coexisten, lo cual es inusual y es una de las fortalezas discretas de Zcash.

<br/>

## El turnstile en acción

El turnstile no es nuevo y se ha utilizado en momentos clave de la historia de Zcash.

Cuando Zcash pasó del pool original Sprout hacia el pool más reciente Sapling, el turnstile protegió la transición. Posteriormente, el pool Sprout fue restringido para que no pudiera recibir nuevas entradas, lo que animó a los usuarios a migrar mientras el turnstile mantenía la contabilidad honesta. Años después, el hecho de que ningún valor saliera nunca indebidamente de Sprout constituye evidencia de que su criptografía inicial nunca fue explotada con éxito.

El mismo diseño protege ahora el paso de Orchard a Ironwood. En 2026 se encontró y corrigió un error de solidez en el sistema de pruebas Orchard. No hay evidencia de que se explotara alguna vez, pero dado que la actividad blindada es privada, la certeza era imposible. La respuesta es sellar el antiguo pool Orchard y hacer que todos migren sus fondos a través del turnstile hacia Ironwood, un pool nuevo que utiliza el protocolo corregido. Forzar los fondos a pasar por el turnstile significa que las monedas falsificadas hipotéticas que queden atrás no pueden seguirlos y, una vez finalizada la migración, cualquiera puede confirmar que el suministro blindado es sólido.

<br/>

## Desuso unidireccional de pools

El turnstile hace posible retirar un pool antiguo de forma segura, en una sola dirección, sin romper nunca la garantía del suministro. El truco es cerrar la entrada mientras se deja abierta la salida.

Sprout es el ejemplo más claro. Para dejarlo en desuso, ZIP 211 añadió una única regla de consenso: desde su altura de activación, el campo vpub_old de cada JoinSplit debe ser cero. Dado que vpub_old es la única forma en que el valor puede entrar en Sprout, forzarlo a cero significa que nunca puede volver a entrar valor nuevo, mientras que el valor aún puede salir hacia el lado transparente o continuar hacia Sapling. El pool pasó a ser unidireccional. Solo puede vaciarse, nunca llenarse. El turnstile sigue contando todo el tiempo, por lo que el saldo puede caer a medida que salen los fondos, pero nunca puede subir y nunca puede ser negativo.

La migración de Orchard a Ironwood utiliza la misma idea. En la actualización NU6.3, el pool Orchard se cierra a nuevas entradas, y las billeteras [wallets] reciben instrucciones de enviar los fondos Orchard a través del turnstile hacia el nuevo pool Ironwood. Orchard se convierte en un pool unidireccional que solo puede vaciarse. Dado que cada salida es un cruce del turnstile que debe demostrarse, cualquier valor falsificado hipotético que quede en Orchard no puede seguir silenciosamente a los fondos honestos hacia fuera. Queda atrapado en un pool que solo se vacía y cuya puerta está vigilada. Con el tiempo, esto conduce el antiguo pool hacia el vacío y permite a cualquiera confirmar que el valor que salió nunca fue superior al valor que entró honestamente.

Esta es la razón más profunda por la que el turnstile importa más allá de la simple contabilidad. Es el mecanismo que permite a Zcash retirar un pool blindado, ya sea para reducir la complejidad como con Sprout, o para recuperarse de un error descubierto como con Orchard, mientras mantiene una garantía continua, pública y demostrable sobre el suministro.

<br/>

## Conceptos erróneos comunes

- El turnstile no revela quién envió qué a quién. Sí muestra la cantidad de cualquier transacción que mueve ZEC entre pools
- No identifica por nombre a quien falsifica. Limita cuánto puede salir de un pool, que es lo que protege el suministro
- No es una invención nueva para Ironwood. Ha protegido cada transición importante de pools blindados en la historia de Zcash
- Un total público de un pool no debilita la privacidad de los pagos dentro del pool. Mover ZEC entre pools muestra la cantidad movida, por lo que ZIP 318 solicita a las billeteras que migren en cantidades estándar con el tiempo

<br/>

## Recursos

1. [ZIP 209: Prohibir saldos de pools de valor de cadena fuera de rango](https://zips.z.cash/zip-0209) - la regla de consenso detrás del turnstile
2. [ZIP 211: Desactivación de la adición de nuevo valor al pool de valor de cadena Sprout](https://zips.z.cash/zip-0211) - cómo se cerró el pool Sprout a nuevos depósitos
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - la actualización que introduce el pool Ironwood y dirige el valor a través del turnstile
4. [Aplicación del turnstile contra la falsificación](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - la explicación original de Electric Coin Company
5. [Especificación del protocolo Zcash](https://zips.z.cash/protocol/protocol.pdf) - consulta las secciones sobre saldo y firma vinculante para todos los detalles
6. [Pools de valor, el libro Zebra](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - cómo un nodo rastrea el saldo de valor de cada pool

<br/>

## Páginas relacionadas

- [Pools blindados](https://zechub.wiki/using-zcash/shielded-pools) - cómo las transacciones blindadas de Zcash mantienen los detalles privados
- [Halo](https://zechub.wiki/zcash-tech/halo) - el sistema de pruebas detrás del pool Orchard
- [Actualizaciones de red](https://zechub.wiki/start-here/network-upgrades) - cómo Zcash activa cambios como nuevos pools blindados
