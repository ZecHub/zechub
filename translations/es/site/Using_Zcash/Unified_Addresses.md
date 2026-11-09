<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Direcciones unificadas [Unified Addresses]

> Una dirección para todo Zcash. Compártela, y la billetera [wallet] del remitente encontrará la forma más privada de pagarte.

## TL;DR

* Una dirección unificada (UA) es una dirección Zcash que contiene varios receptores: Ironwood, Sapling y transparente [transparent].
* Las UA de mainnet empiezan con `u1`. ZIP 316 las definió, y llegaron con la actualización de red [network upgrade] NU5 el 31 de mayo de 2022.
* La billetera del remitente elige el pool [pool] más privado compatible con ambas billeteras. Nunca eliges un pool por tu cuenta.
* Tu UA siguió funcionando cuando el pool Ironwood entró en funcionamiento en julio de 2026. No necesitaste compartir una dirección nueva.
* Tu billetera puede crear una UA nueva para cada remitente, y todas pagan a la misma cuenta.

## Explicación principal

Una dirección unificada (UA) es una única dirección Zcash que agrupa varios receptores en una sola. Los receptores son las partes de una dirección que aceptan fondos en un pool de valor específico: Ironwood, Sapling y transparente. Una UA empieza con `u1` en mainnet y fue definida en [ZIP 316](https://zips.z.cash/zip-0316), introducida con la actualización de red NU5 el 31 de mayo de 2022.

Antes de las direcciones unificadas, recibir ZEC implicaba pensar en los tipos de dirección. Una dirección `zs` recibía fondos Sapling, una dirección `t` recibía fondos transparentes y enviar entre tipos requería pasos adicionales. Una UA acaba con eso. Compartes una dirección y las billeteras resuelven el resto.

### Cómo funciona

Cuando alguien envía a tu UA, su billetera lee los receptores incluidos y elige el pool más privado compatible con ambas billeteras:

1. Si ambas billeteras admiten el pool blindado [shielded] actual, el pago [payment] llega blindado. Nada público toca la red [chain].
2. Si el remitente solo puede enviar desde un pool anterior, la billetera recurre al mejor receptor que ambos comparten, como Sapling.
3. Si el remitente solo puede enviar fondos transparentes, el pago llega al receptor transparente de tu UA, y tu billetera puede blindarlo desde allí.

Nunca gestionas esto por tu cuenta. La dirección sigue siendo la misma; el enrutamiento ocurre dentro de ella.

### Por qué importa ahora

Zcash sigue actualizándose. Cuando el pool Ironwood se activó con NU6.3 el 28 de julio de 2026, los titulares de UA no necesitaron una dirección nueva: las billeteras simplemente empezaron a elegir el receptor Ironwood dentro de las direcciones que ya tenían. Los usuarios con direcciones independientes más antiguas tuvieron que migrar. Los titulares de UA no hicieron nada.

Este es el objetivo del diseño. Los nuevos pools llegan con futuras actualizaciones de red, y una dirección unificada los absorbe sin que nadie tenga que volver a compartir direcciones ni mover fondos manualmente. Consulta los [pools de valorZcash](/using-zcash/shielded-pools) para ver la lista actual de pools.

### Una dirección nueva para cada remitente

Las billeteras pueden generar muchas direcciones unificadas diversificadas para una cuenta. Cada una paga a los mismos fondos, pero ninguna pareja de ellas puede vincularse on-chain. Da una UA distinta a cada persona o servicio que te pague, y ninguna pareja podrá comparar direcciones para saber que paga a la misma billetera.

## Visual / Analogía

Imagina una puerta principal con tres ranuras para correo. La ranura más nueva deja las cartas en una caja fuerte cerrada (Ironwood). La segunda las deja en un cajón cerrado (Sapling). La tercera las deja en una bandeja abierta que cualquiera puede leer a través de la ventana (transparente).

El cartero es la billetera del remitente. Usa la ranura más privada por la que pueda pasar. Das una dirección para la puerta y, cuando la casa recibe una caja fuerte nueva, la dirección de la puerta sigue siendo la misma.

## Análisis detallado

### Herramientas relacionadas

- **Claves de visualización [viewing keys].** Cada cuenta tiene claves de visualización unificadas que comparten lo que recibe una UA (o todo lo que envía) sin compartir autoridad de gasto. Prefijos `uview` y `uivk`. Consulta las [claves de visualización](/zcash-tech/viewing-keys).
- **Direcciones TEX.** Algunos exchanges [exchanges], actualmente Binance, requieren que los depósitos lleguen desde una fuente transparente. Una dirección TEX ([ZIP 320](https://zips.z.cash/zip-0320)) es un complemento exclusivamente transparente para tu UA precisamente para ese caso. Consulta las [direcciones de exchange transparentes](/using-zcash/transparent-exchange-addresses).
- **Solicitudes de pago.** Una UA puede integrarse en un URI de solicitud de pago con una cantidad y un memo [memo] predefinidos. Consulta los [URI de solicitud de pago](/using-zcash/payment-request-uris).

### Datos rápidos

| | |
|---|---|
| Prefijo | `u1` (mainnet) |
| Codificación | bech32m |
| Definida en | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introducida | NU5, 31 de mayo de 2022 |
| Contiene | Receptores Ironwood, Sapling y transparentes |
| Clave de gasto [spending key] | Una por cuenta, compartida por todas sus UA |

Comprueba qué billeteras admiten direcciones unificadas en la página de [billeteras](/wallets).

## Errores comunes

- **Compartir una dirección antigua `zs` o `t`.** Una dirección independiente solo llega a un pool y no incorpora los nuevos. Comparte tu UA.
- **Dar la misma UA a todo el mundo.** Dos personas que te pagan pueden comparar notas y ver la misma dirección. Da a cada remitente una UA nueva desde tu billetera.
- **Esperar que todos los pagos a una UA sean privados.** Un remitente que solo puede enviar fondos transparentes paga a tu receptor transparente, y ese pago es público. Blíndalo después desde tu billetera.

## Páginas relacionadas

- [Pools blindados](/using-zcash/shielded-pools): los pools de valor detrás de cada receptor en una UA.
- [Direcciones unificadas (técnico)](/zcash-tech/unified-addresses): cómo ZIP 316 construye y codifica una UA.
- [Claves de visualización](/zcash-tech/viewing-keys): comparte lo que recibe una UA sin compartir autoridad de gasto.
- [Direcciones de exchange transparentes](/using-zcash/transparent-exchange-addresses): el formato TEX para exchanges que necesitan una fuente transparente.
- [URI de solicitud de pago](/using-zcash/payment-request-uris): una UA con la cantidad y el memo completados.
- [Billeteras](/using-zcash/wallets): qué billeteras crean y pagan direcciones unificadas.
- [Exchanges sin custodia](/using-zcash/non-custodial-exchanges): qué comprobar cuando un swap [swap] paga ZEC a tu billetera.
- [Quién puede ver tu pago Zcash](/start-here/who-can-see-your-zcash-payment): qué permanece visible cuando un pago utiliza cada receptor.

**Última actualización:** octubre de 2026
