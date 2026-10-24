<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Direcciones unificadas

> Una dirección para todo Zcash. Compártela, y la wallet del remitente encontrará la forma más privada de pagarte.

Una dirección unificada (UA) es una única dirección Zcash que agrupa varios receptores en una sola. Los receptores son las partes de una dirección que aceptan fondos en un pool de valor específico: Ironwood, Sapling y transparente. Una UA comienza con `u1` en mainnet y se definió en [ZIP 316](https://zips.z.cash/zip-0316), introducida con la actualización de red NU5 el 31 de mayo de 2022.

Antes de las direcciones unificadas, recibir ZEC implicaba pensar en tipos de direcciones. Una dirección `zs` recibía fondos Sapling, una dirección `t` recibía fondos transparentes, y enviar entre tipos requería pasos adicionales. Una UA acaba con eso. Compartes una dirección y las wallets resuelven el resto.

## Cómo funciona

Cuando alguien envía a tu UA, su wallet lee los receptores que contiene y elige el pool más privado compatible con ambas wallets:

1. Si ambas wallets admiten el pool blindado actual, el pago llega blindado. Nada público toca la cadena.
2. Si el remitente solo puede enviar desde un pool anterior, la wallet recurre al mejor receptor que ambos compartan, como Sapling.
3. Si el remitente solo puede enviar fondos transparentes, el pago llega al receptor transparente de tu UA, y tu wallet puede blindarlo desde allí.

Nunca gestionas esto personalmente. La dirección sigue siendo la misma; el enrutamiento ocurre dentro de ella.

## Por qué importa ahora

Zcash sigue actualizándose. Cuando el pool Ironwood se activó con NU6.3 el 28 de julio de 2026, los titulares de UA no necesitaron una dirección nueva: las wallets simplemente comenzaron a elegir el receptor Ironwood dentro de las direcciones que las personas ya tenían. Los usuarios con direcciones independientes más antiguas tuvieron que migrar. Los titulares de UA no hicieron nada.

Este es el objetivo del diseño. Llegan nuevos pools con futuras actualizaciones de red, y una dirección unificada los incorpora sin que nadie tenga que volver a compartir direcciones ni mover fondos manualmente. Consulta los [pools de valorZcash](/using-zcash/shielded-pools) para ver la lista actual de pools.

## Una dirección nueva para cada remitente

Las wallets pueden generar muchas direcciones unificadas diversificadas para una cuenta. Todas ingresan en los mismos fondos, pero ninguna de ellas puede vincularse on-chain. Da una UA diferente a cada persona o servicio que te pague, y ningún par podrá comparar direcciones para descubrir que paga a la misma wallet.

## Herramientas relacionadas

- **Claves de visualización.** Cada cuenta tiene claves de visualización unificadas que comparten lo que recibe una UA (o todo lo que envía) sin compartir autoridad de gasto. Prefijos `uview` y `uivk`. Consulta las [claves de visualización](/zcash-tech/viewing-keys).
- **Direcciones TEX.** Algunos exchanges, actualmente Binance, exigen que los depósitos lleguen desde una fuente transparente. Una dirección TEX ([ZIP 320](https://zips.z.cash/zip-0320)) es un complemento exclusivamente transparente para tu UA precisamente para ese caso. Consulta las [direcciones transparentes para exchanges](/using-zcash/transparent-exchange-addresses).
- **Solicitudes de pago.** Una UA puede integrarse en un URI de solicitud de pago con un importe y un memo precompletados. Consulta los [URI de solicitudes de pago](/using-zcash/payment-request-uris).

## Datos rápidos

| | |
|---|---|
| Prefijo | `u1` (mainnet) |
| Codificación | bech32m |
| Definida en | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introducida | NU5, 31 de mayo de 2022 |
| Contiene | Receptores Ironwood, Sapling y transparentes |
| Clave de gasto | Una por cuenta, compartida por todas sus UA |

Consulta qué wallets admiten direcciones unificadas en la página de [wallets](/wallets).
