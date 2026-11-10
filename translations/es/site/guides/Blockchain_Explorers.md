<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exploradores de blockchain

## Introducción

En el mundo empresarial tradicional, cada transacción [transaction] incluye un recibo como prueba [proof] de compra. De forma similar, en el mundo de blockchain, un usuario recibe un recibo digital en forma de identificador de transacción por cada transacción completada. La mayoría de las billeteras [wallets] te proporcionarán esto. Los exploradores de blockchain son simplemente herramientas [tools] que permiten visualizar lo que ya ha sucedido en una blockchain. Reciben como datos de entrada: identificadores de transacción, direcciones [addresses] o hashes de bloques [blocks], y muestran visualmente lo que ocurrió.

## Ejemplos
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (público): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://mainnet.zcashexplorer.app/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privado): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://mainnet.zcashexplorer.app/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Observa con Zcash cómo la segunda transacción tiene todos los detalles importantes ocultos; esto es importante y tiene grandes implicaciones en un mundo digital.


## Mapas de blockchain

Tenemos esta larga cadena de caracteres como recibo digital, ¿y ahora qué? Aquí es donde usamos un [explorador de blockchain](https://nym.com/blog/using-blockchain-privately), o mapa, para ayudarnos a entender lo que ocurrió en la blockchain. Observa cómo cada red [chain] tiene su propia versión de [explorador de blockchain](https://nym.com/blog/using-blockchain-privately) arriba. Es importante entender que todos estos proyectos de blockchain son ejemplos de software de código abierto. Es decir, cualquiera puede contribuir al código o bifurcarlo a su gusto. Con este entendimiento, cada proyecto se especializa en distintas áreas y personaliza el explorador de blockchain para adaptarlo a las necesidades de dicho proyecto.

### Bloques
Las transacciones se colocan en *bloques*. Cuando un bloque se mina/valida, cada transacción dentro de ese bloque se confirma y se crea un hash de bloque. Cualquier hash creado puede introducirse en un explorador de bloques. Puede que hayas visto que los CEX necesitan un número de *confirmaciones* antes de liberar tus fondos; esta es la métrica que usan para asegurar que tu transacción esté 
suficientemente finalizada. ¿Cómo determina la blockchain qué transacciones entran en el siguiente bloque? Es un tema complejo de investigación, pero la mayoría de las redes modernas usan la idea de las *tarifas [fees]* para determinar quién entra al frente de la fila. Cuanto mayor sea la tarifa, mayor será la probabilidad de que avances al frente de la cola.

### Direcciones

Una forma divertida de aprender visualmente sobre los [exploradores de blockchain](https://nym.com/blog/using-blockchain-privately) es introducir la dirección de cualquier transacción aleatoria. Entonces puedes retroceder en el tiempo y ver de dónde procedían los fondos. Cada transacción tiene tanto una dirección de entrada como una de salida. Con esta información, se puede avanzar y retroceder fácilmente desde cualquier transacción que se haya gastado. Para quienes disfrutan de los rompecabezas, este es el equivalente digital de un enorme rompecabezas financiero y podría usarse con fines de transparencia. Usar un explorador de blockchain no solo hace que esto sea mucho más fácil de visualizar, sino que *también resalta* la necesidad de privacidad [privacy] en las transacciones. A menos que uses Zcash blindados [shielded], puedes hacer esto con *cualquier* blockchain transparente [transparent]: BTC, ETH, ATOM, DOGE, VTC, etc. ... . Este punto es crucial para cualquiera que use la blockchain de forma segura en la transición hacia un futuro exclusivamente digital.

### Cantidades

De forma similar a las direcciones anteriores, cualquier transacción en una blockchain pública tiene las cantidades disponibles públicamente y a plena vista. Esto incluye las cantidades tanto en las direcciones de entrada como de salida de cualquier transacción. Una excepción ocurre cuando eliges usar Zcash blindado -- entonces todas las cantidades quedan ocultas. Para los propietarios de pequeñas empresas que necesariamente necesitan privacidad para el *comercio justo*, ¡esto es un enorme beneficio!

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### Lo que un explorador puede y no puede ver en Zcash

#### TL;DR
- Las direcciones transparentes (`t`) son totalmente visibles en un explorador, igual que Bitcoin
- Las transacciones totalmente blindadas (z a z) ocultan la cantidad, las direcciones y el memo
- La tarifa sigue siendo visible, incluso en una transacción totalmente blindada
- El blindaje (mover `t` a blindado) y el desblindaje (de blindado de vuelta a `t`) son parcialmente visibles, porque un lado es transparente
- La privacidad se mantiene solo mientras los fondos permanezcan dentro de los pools blindados

Zcash tiene más de un tipo de dirección, y un explorador los trata de forma muy diferente.

Las direcciones transparentes, que comienzan con `t`, funcionan como Bitcoin. Un explorador muestra el remitente, el destinatario, la cantidad y el rastro hasta el origen de los fondos.

Las direcciones blindadas son el lado privado. Los fondos en los Sapling o Orchard [pools blindados](https://zechub.wiki/using-zcash/shielded-pools#content) están protegidos por pruebas zero-knowledge [zero-knowledge proofs]. Busca una transacción totalmente blindada y el explorador no podrá mostrar la cantidad, las direcciones ni el memo. Solo puede confirmar que ocurrió una transacción válida y que fue registrada en un bloque. Este es el ejemplo privado oculto mostrado cerca de la parte superior de esta página.

Un detalle sigue siendo visible incluso para las transacciones totalmente blindadas: la tarifa. Las reglas de consenso [consensus] de Zcash requieren que la tarifa transparente se indique explícitamente, por lo que un explorador siempre puede mostrarla, incluso cuando las cantidades están ocultas. Por esa razón, es una buena práctica usar la tarifa estándar de la billetera, para que tu transacción no destaque al pagar una cantidad inusual.

El explorador también puede ver cuándo los fondos cruzan entre los lados transparente y blindado. Mover fondos de `t` a un pool es blindaje; sacarlos de vuelta es desblindaje. Estos cruces son parcialmente visibles porque un lado es transparente. Solo la actividad totalmente privada de z a z, que nunca toca una dirección `t`, mantiene oculto todo salvo la tarifa.

La conclusión: la privacidad depende de permanecer dentro de los pools blindados. Una vez que los fondos tocan una dirección `t`, esa parte de su historial es tan pública como Bitcoin. Para demostrar tu propia actividad blindada a alguien que elijas, como un contador, comparte una clave de visualización [viewing key] en lugar de hacerla pública. Consulta la página de [Claves de visualización](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Lista de exploradores de bloques de Zcash

- [Zcash Explorador de bloques](https://mainnet.zcashexplorer.app/)

- [3xpl](https://3xpl.com/zcash)

- [ShieldedScan](https://shieldedscan.xyz)

- [ZecBlock](https://zecblock.com/)

- [SoChain](https://sochain.com/zec) ([red de pruebas](https://sochain.com/zectest))



- [ZecZcash Explorador](https://zeczcash.com/explorer)

### Guía visual

Aquí hay cuatro buenos ejemplos de diferentes exploradores de blockchain:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash Explorador de bloques](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)
