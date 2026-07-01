<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Exploradores de Blockchain

## Introducción

En el mundo empresarial tradicional, toda transacción incluye un recibo como comprobante de compra. De forma similar, en el mundo blockchain un usuario recibe un recibo digital en forma de id de transacción por cada transacción completada. La mayoría de las wallets te proporcionarán esto. Los exploradores de blockchain son simplemente herramientas que permiten visualizar lo que ya ha ocurrido en una blockchain. Toman como entrada: id de transacción, direcciones o hashes de bloque, y muestran visualmente lo que ocurrió.

## Ejemplos
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (pública): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privada): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Observa cómo en Zcash la segunda transacción tiene todos los detalles importantes ocultos; esto es importante y tiene grandes implicaciones en un mundo digital.


## Mapas de Blockchain

Entonces tenemos esta larga cadena de caracteres como recibo digital, ¿y ahora qué? Aquí es donde usamos un [explorador de blockchain](https://nym.com/blog/using-blockchain-privately), o mapa, para ayudarnos a entender lo que ocurrió en la blockchain. Observa cómo cada cadena tiene su propia versión del [explorador de blockchain](https://nym.com/blog/using-blockchain-privately) anterior. Es importante entender que todos estos proyectos blockchain son ejemplos de software de código abierto. Es decir, cualquiera puede contribuir al código y/o bifurcarlo según sus preferencias. Con eso en mente, cada proyecto se especializa en áreas diferentes y personaliza el explorador de blockchain para ajustarse a las necesidades de dicho proyecto.

### Bloques
Las transacciones se colocan en *bloques*. Cuando un bloque es minado/validado, cada transacción dentro de ese bloque queda confirmada y se crea un hash de bloque. Cualquier hash creado puede introducirse en un explorador de bloques. Puede que hayas visto que los CEX necesitan un número de *confirmaciones* antes de liberar tus fondos; esta es la métrica que utilizan para asegurarse de que tu transacción esté 
suficientemente finalizada. ¿Cómo determina la blockchain qué transacciones entran en el siguiente bloque? Es un tema de investigación complejo, pero la mayoría de las cadenas modernas usan la idea de las *comisiones* para determinar quién pasa al frente de la fila. Cuanto mayor sea la comisión, mayor será la probabilidad de que avances al frente de la cola.

### Direcciones

Una forma divertida de aprender visualmente sobre los [exploradores de blockchain](https://nym.com/blog/using-blockchain-privately) es introducir la dirección de cualquier transacción aleatoria. ¡Luego puedes retroceder en el tiempo y ver de dónde se originaron los fondos! Cada transacción tiene tanto una dirección de entrada como una de salida.  Armado con esta información, uno puede avanzar y retroceder fácilmente desde cualquier transacción que haya sido gastada. Para quienes disfrutan de los rompecabezas, este es el equivalente digital de un enorme rompecabezas financiero, y podría usarse con fines de transparencia. Usar un explorador de blockchain no solo hace que esto sea mucho más fácil de visualizar, sino que *también resalta* la necesidad de privacidad en las transacciones. A menos que estés usando Zcash blindado, puedes hacer esto con *cualquier* blockchain transparente: BTC, ETH, ATOM, DOGE, VTC, etc ... . Este punto es crítico para cualquiera que use la blockchain de forma segura en la transición hacia un futuro exclusivamente digital.

### Cantidades

De forma similar a las direcciones anteriores, cualquier transacción en una blockchain pública tiene las cantidades disponibles públicamente y a la vista de todos. Esto incluye las cantidades tanto en las direcciones de entrada como de salida para cualquier transacción. Una excepción a esto es cuando eliges usar Zcash Blindado -- entonces todas las cantidades quedan ocultas. Para los pequeños empresarios que necesariamente necesitan privacidad para un *comercio justo*, ¡esto es una gran ventaja!

![cantidades](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### Lo que un explorador puede y no puede ver en Zcash

#### TL;DR
- Las direcciones transparentes (`t`) son completamente visibles en un explorador, igual que en Bitcoin
- Las transacciones completamente blindadas (z a z) ocultan la cantidad, las direcciones y el memo
- La comisión sigue siendo visible, incluso en una transacción completamente blindada
- El blindaje (mover `t` a blindado) y el desblindaje (blindado de vuelta a `t`) son parcialmente visibles, porque un lado es transparente
- La privacidad se mantiene solo mientras los fondos permanezcan dentro de los pools blindados

Zcash tiene más de un tipo de dirección, y un explorador las trata de forma muy diferente.

Las direcciones transparentes, que comienzan con `t`, funcionan como Bitcoin. Un explorador muestra el remitente, el receptor, la cantidad y el rastro hasta el origen de los fondos.

Las direcciones blindadas son el lado privado. Los fondos en los [shielded pools](https://zechub.wiki/using-zcash/shielded-pools#content) Sapling o Orchard están protegidos por pruebas de conocimiento cero. Si buscas una transacción completamente blindada, el explorador no puede mostrar la cantidad, las direcciones ni el memo. Solo puede confirmar que ocurrió una transacción válida y que fue registrada en un bloque. Este es el ejemplo privado oculto que se muestra cerca de la parte superior de esta página.

Hay un detalle que sigue siendo visible incluso en las transacciones completamente blindadas: la comisión. Las reglas de consenso de Zcash exigen que la comisión transparente se indique explícitamente, por lo que un explorador siempre puede mostrarla, incluso cuando las cantidades están ocultas. Por esa razón, es una buena práctica usar la comisión estándar de la wallet, para que tu transacción no destaque por pagar una cantidad inusual.

El explorador también puede ver cuándo los fondos cruzan entre los lados transparente y blindado. Mover fondos `t` a un pool es blindaje; moverlos de vuelta hacia afuera es desblindaje. Esos cruces son parcialmente visibles porque un lado es transparente. Solo la actividad totalmente privada de z a z, que nunca toca una dirección `t`, mantiene oculto todo excepto la comisión.

La conclusión: la privacidad depende de permanecer dentro de los pools blindados. Una vez que los fondos tocan una dirección `t`, esa parte de su historial es tan pública como Bitcoin. Para demostrarle a alguien que tú elijas tu propia actividad blindada, como a un contable, comparte una Viewing Key en lugar de hacerla pública. Consulta la página de [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content).
### Guía visual

Aquí hay cuatro buenos ejemplos de diferentes exploradores de blockchain:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Explorador de bloques de Zcash](https://mainnet.zcashexplorer.com)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


![ethExplorer](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


![zcashExplorer](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)


![cosmos](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)
