<a href="https://github.com/zechub/zechub/edit/main/site/guides/Maya_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Exchange descentralizado Maya

> Maya Protocol es un DEX cross-chain para realizar swaps nativos (por ejemplo, de ETH o BTC a ZEC) sin tokens envueltos, cuentas ni KYC.

## En resumen

* Maya intercambia monedas nativas entre blockchains: envías un activo y recibes otro en su propia red. Sin tokens envueltos, sin cuenta, sin KYC.
* Es un fork de THORChain, construido con el SDK de Cosmos y protegido por operadores de nodos que aportan capital como bond (Proof of Bond).
* Su token nativo es $CACAO. Los proveedores de liquidez ganan comisiones por swap y están cubiertos por la Protección contra Pérdidas Impermanentes (ILP) después de 50 días.
* Maya es un backend: lo usas a través de un frontend o una billetera como THORWallet, CacaoSwap, Asgardex, Ctrl Wallet o KeepKey.
* El video tutorial muestra un swap de ETH a ZEC en LeoDex, uno de estos frontends.
* Maya admite depósitos blindados/unificados de ZEC mediante SwapKit (salida de valor transparente más un memo blindado), por lo que algunos frontends pueden enviar ZEC directamente a una dirección unificada. Si el tuyo paga a una dirección transparente (t1), protégela en tu billetera después para preservar la privacidad.
* Maya no es la única opción para swaps nativos de ZEC: THORChain también tiene un pool nativo de ZEC.

## Explicación principal

Un exchange centralizado guarda tus monedas y necesita tu identidad. Maya utiliza en cambio una red de nodos que controlan bóvedas en cada red compatible. Envías monedas a una bóveda Maya, al menos dos tercios de los nodos confirman el depósito y el activo equivalente se envía desde otra bóveda a tu dirección en la red de destino.

Los operadores de nodos ponen un bond que puede sufrir una penalización si actúan de forma indebida, lo que les da un incentivo financiero para mantenerse honestos. Maya añade funciones sobre THORChain, como nodos de liquidez y su propio diseño de reserva, y también funciona como una segunda red independiente junto a ella.

Las secciones siguientes explican cómo funciona Maya, la prueba de bond, en qué se diferencia de THORChain y qué billeteras lo admiten.

## Tutorial


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="Cómo hacer swap de Ethereum a Zcash en LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## ¿Qué es Maya Protocol?

Maya es un sistema de [exchange descentralizado decentralized exchange](https://nym.com/blog/what-is-dex) (DEX) que permite el intercambio de criptomonedas entre diferentes blockchains. Por ejemplo, puedes hacer swap de Bitcoin (BTC) en la blockchain de Bitcoin por Ethereum (ETH) en la blockchain de Ethereum de forma sencilla, sin mantener los activos ni involucrar a autoridades centralizadas o procedimientos de Conozca a su cliente (KYC).

Maya Protocol fue desarrollado utilizando el Kit de Desarrollo de Software (Cosmos Software Development Kit, Cosmos SDK) y opera con un mecanismo de consenso [consensus] Prueba de bond [Proof of Bond] (PoB). El protocolo es respaldado por «Operadores de nodos [Node Operators]», quienes ponen capital en staking dentro del sistema y obtienen rendimientos como recompensa por su contribución y esfuerzos. Básicamente, los nodos son computadoras que ejecutan software que valida los swaps de los usuarios y supervisa los activos en direcciones [addresses] designadas a través de diferentes blockchains.

Para completar un swap, la criptomoneda compatible debe recibirse en una de las direcciones de Maya, enviada por un usuario, y luego se envía una cantidad equivalente desde otra de las direcciones de Maya en una blockchain diferente. Este proceso es gestionado y aprobado por al menos dos tercios de los nodos, garantizando especialmente que los fondos se reciban correctamente.

De esta manera, los usuarios pueden enviar un tipo de token en una blockchain y recibir un tipo diferente en otra blockchain, todo de forma nativa y sin utilizar tokens envueltos.

## ¿Qué es Prueba de bond?

La prueba de bond (Proof of Bond, PoB) es un mecanismo de consenso en el que los operadores de nodos deben comprometer un bond (normalmente en forma del token nativo de la red) para participar en la red. Este bond actúa como una forma de seguridad económica, garantizando que los nodos actúen con honestidad y mantengan la integridad de la red. Si un nodo intenta actuar de forma maliciosa o no cumple con sus obligaciones, su bond puede ser reducido, lo que significa que se le quita una parte como penalización.

En Maya Protocol, este mecanismo ayuda a producir valor económico a partir de los recursos en staking de los operadores de nodos, aumentando la eficiencia del capital. De manera similar, en THORChain, los operadores de nodos vinculan RUNE (el token nativo) para asegurar la red y garantizar la cooperación entre los participantes.

## Diferencias entre Maya y THORChain

Maya es un fork de THORChain, pero cuenta con algunas nuevas características y funcionalidades que sirven como una excelente alternativa. Las más importantes son

### Nodos de liquidez

En lugar de seguir el Modelo de bond puro, Maya está considerando un cambio hacia un modelo de nodos de liquidez. En este sistema, los nodos pueden aportar liquidez directamente, vinculándola a la red. Este enfoque significa que los operadores de nodos enfrentan un riesgo significativo: si hacen un mal uso de los fondos, incurren en pérdidas, lo que actúa como un poderoso elemento disuasorio. Como resultado, los operadores de nodos utilizan Unidades de liquidez de los pools de liquidez, que simultáneamente proporcionan liquidez y refuerzan la seguridad de la red.

### Protección contra pérdidas impermanentes

Un sistema que protege a los proveedores de liquidez (LP) de la pérdida temporal que pueden sufrir al proporcionar liquidez debido a las constantes fluctuaciones en los precios de los criptoactivos.
ILP posee el 10 % del suministro de $CACAO (10 millones de $CACAO) y se repone continuamente con el 10 % de las comisiones del protocolo. ILP se activa 50 días después de un depósito de liquidez, con una cobertura limitada al 100 %.

La duración de la cobertura de ILP depende del rendimiento del ACTIVO y de $CACAO. La cobertura completa se alcanza después de 150 días si el ACTIVO tiene un mejor rendimiento, y después de 450 días si $CACAO tiene un mejor rendimiento. ILP se paga y se restablece al realizar un retiro completo, pero no se ve afectada por los retiros parciales. Para las recargas [top-ups], ILP se restablece, pero no se paga.

### Un modelo de asignación diferente

La Subasta de liquidez fue un evento de 21 días diseñado para distribuir tokens $CACAO entre los participantes. Durante el evento, los usuarios depositaron activos compatibles en una dirección específica. Al concluir la subasta, el 90 % de los tokens $CACAO se asignó a los participantes en proporción a sus contribuciones de liquidez, mientras que el 10 % restante se asignó a la reserva de ILP. Los participantes se convirtieron en proveedores de liquidez, con sus activos depositados y tokens $CACAO colocados en los pools de Maya, lo que les permitió obtener una parte de las comisiones generadas.

### Una forma diferente de gestionar las reservas

En la génesis de Maya Protocol, las reservas disponibles de CACAO eran solo el 10 % del suministro total, en comparación con el 44 % de THORChain, y estaban destinadas principalmente a la Protección contra pérdidas impermanentes (ILP). Maya no tiene emisiones de bloques [block emissions]; y si se implementan la Liquidez propiedad del protocolo y los Préstamos, tendrán un diseño diferente, ya que en THORChain estos aspectos están estrechamente integrados con las Reservas.

Aun así, pese a sus diferencias, Maya también sirve como una solución complementaria a THORChain, al ofrecer redundancia, extensión y validación, e integrar nuevas redes que no existen en la implementación actual de THORChain.

Además, el objetivo de Maya es convertirse en un *backend* sobre el que otros servicios puedan construir, con la esperanza de que surjan muchos *frontends* nuevos o servicios DEX basados en la infraestructura de Maya.

## Integración de billetera [wallet] Maya Protocol

Al actuar como un *backend*, Maya necesita contar con el soporte de diferentes interfaces de usuario y billeteras para poder utilizarse. 
Aquí tienes una lista de algunos de los servicios que ya son compatibles con Maya:

[THORWallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, MetaMask, Keystore

El Dorado: ya no está en línea, su dominio no se resuelve.

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

DefiSpot: ya no está en línea, su dominio no se resuelve.

[Ctrl Wallet (XDEFI)](https://ctrl.xyz/): una billetera de autocustodia multiecosistema compatible con más de 30 blockchains nativas, y todas las cadenas EVM y Cosmos, incluidas Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON y más.

[KeepKey ](https://keepkey.com/): Una hardware wallet para almacenar activos digitales de forma segura.
