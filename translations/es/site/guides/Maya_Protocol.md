# Intercambio descentralizado Maya

---

## Tutorial


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="Cómo intercambiar Ethereum por Zcash en LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## ¿Qué es Maya Protocol?

Maya es un sistema de [intercambio descentralizado](https://nym.com/blog/what-is-dex) (DEX) que permite el intercambio de criptomonedas entre diferentes blockchains. Por ejemplo, puedes intercambiar Bitcoin (BTC) en la blockchain de Bitcoin por Ethereum (ETH) en la blockchain de Ethereum de una manera sencilla, sin custodiar los activos ni involucrar a autoridades centralizadas o procedimientos de Know Your Customer (KYC).

Maya Protocol fue desarrollado utilizando el Cosmos Software Development Kit (Cosmos SDK) y opera con un mecanismo de consenso Proof of Bond (PoB). El protocolo es mantenido por "Node Operators", que aportan capital al sistema y obtienen rendimientos como recompensa por su contribución y esfuerzo. En esencia, los nodos son ordenadores que ejecutan software que valida los intercambios de los usuarios y supervisa los activos en direcciones designadas a través de diferentes blockchains.

Para completar un intercambio, la criptomoneda compatible debe recibirse en una de las direcciones de Maya, enviada por un usuario, y luego se envía una cantidad equivalente desde otra de las direcciones de Maya en una blockchain diferente. Este proceso es gestionado y aprobado por al menos dos tercios de los nodos, asegurando en particular que los fondos se reciban correctamente.

De esta manera, los usuarios pueden enviar un tipo de token en una blockchain y recibir un tipo diferente en otra, todo de forma nativa y sin usar tokens envueltos.

## ¿Qué es Proof of Bond?

Proof of Bond (PoB) es un mecanismo de consenso en el que los operadores de nodos deben comprometer un bono (normalmente en forma del token nativo de la red) para participar en la red. Este bono actúa como una forma de seguridad económica, garantizando que los nodos actúen con honestidad y mantengan la integridad de la red2. Si un nodo intenta actuar de forma maliciosa o no cumple con sus deberes, su bono puede ser recortado, lo que significa que una parte se le retira como penalización.

En Maya Protocol, este mecanismo ayuda a generar valor económico a partir de los recursos aportados por los operadores de nodos, aumentando la eficiencia del capital. Del mismo modo, en THORChain, los operadores de nodos bloquean RUNE (el token nativo) para asegurar la red y garantizar la cooperación entre los participantes.

## Diferencias entre Maya y THORChain

Maya es un fork de THORChain, pero incorpora algunas características y funcionalidades nuevas que la convierten en una gran alternativa. Las más importantes son

### Nodos de liquidez

En lugar de seguir el Pure Bond Model, Maya está considerando un cambio hacia un modelo de Liquidity Nodes. En este sistema, los nodos pueden aportar liquidez directamente, vinculándola a la red. Este enfoque significa que los operadores de nodos afrontan un riesgo significativo: si hacen un mal uso de los fondos, incurren en pérdidas, lo que actúa como un potente elemento disuasorio. Como resultado, los operadores de nodos utilizan Liquidity Units de los Liquidity Pools, que al mismo tiempo proporcionan liquidez y refuerzan la seguridad de la red.

### Protección contra pérdida impermanente

Un sistema que protege a los proveedores de liquidez de la pérdida temporal (LPs) que pueden experimentar al proporcionar liquidez, debido a las fluctuaciones constantes en los precios de los criptoactivos.
ILP mantiene el 10% del suministro de $CACAO (10 millones de $CACAO) y se repone continuamente con el 10% de las comisiones del protocolo. ILP se activa 50 días después de un depósito de liquidez, con una cobertura limitada al 100%.

La duración de la cobertura de ILP depende del rendimiento del ASSET y de $CACAO. La cobertura total se alcanza después de 150 días si ASSET tiene mejor rendimiento, y después de 450 días si $CACAO tiene mejor rendimiento. ILP se paga y se reinicia al retirar completamente, pero no se ve afectado por retiros parciales. Para recargas, ILP se reinicia pero no se paga.

### Un modelo de asignación diferente

La Liquidity Auction fue un evento de 21 días diseñado para distribuir tokens $CACAO entre los participantes. Durante el evento, los usuarios depositaron activos compatibles en una dirección específica. Al concluir la subasta, el 90% de los tokens $CACAO se asignó a los participantes en proporción a sus aportaciones de liquidez, mientras que el 10% restante se asignó a la reserva de ILP. Los participantes se convirtieron en proveedores de liquidez, con sus activos depositados y sus tokens $CACAO colocados en los pools de Maya, lo que les permitió ganar una parte de las comisiones generadas.

### Una forma diferente de gestionar las reservas

En el génesis de Maya Protocol, las reservas disponibles de CACAO eran solo el 10% del suministro total, en comparación con el 44% de THORChain, y estaban destinadas principalmente a la Protección contra Pérdida Impermanente (ILP). Maya no tiene emisiones por bloque; y si se implementan Protocol Owned Liquidity y Lending, tendrán un diseño diferente, ya que en THORChain estos aspectos están estrechamente integrados con las Reservas.

Aun así, a pesar de sus diferencias, Maya también sirve como una solución complementaria a THORChain, ofreciendo redundancia, extensión y validación, e integrando nuevas redes que no existen en la implementación actual de THORChain.

Además, el objetivo de Maya es convertirse en un *backend* sobre el que otros servicios puedan construir, con la esperanza de ver muchos *frontends* nuevos, o servicios DEX construidos sobre la infraestructura de Maya.

## Integración de billeteras con Maya Protocol

Al actuar como *backend*, Maya necesita ser compatible con diferentes interfaces de usuario y billeteras para poder utilizarse. 
Aquí tienes una lista de algunos de los servicios que ya son compatibles con Maya:

[Thorwallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, Metamask, Keystore

[El Dorado](https://www.eldorado.market/): XDEFI, Keystore

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

[DefiSpot](https://www.defispot.com/t): XDEFI, Metamask, Keplr, Phantom, Walletconnect, Leap Wallet, Argeentx, Braavos, Trustwallet y Rabby.

[XDEFI](https://www.xdefi.io/): una billetera de autocustodia multiecosistema con soporte para más de 30 blockchains nativas, y todas las cadenas EVM y Cosmos, incluyendo Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON y más.

[KeepKey ](https://keepkey.com/): Una billetera de hardware para almacenar activos digitales de forma segura.
