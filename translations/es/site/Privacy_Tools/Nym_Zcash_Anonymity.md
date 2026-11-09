<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nym Anonimato de Mixnet para Zcash

> Última verificación: 18 de octubre de 2026

Los pools blindados [shielded pools] de Zcash ocultan los montos, remitentes y destinatarios on-chain. No ocultan la ruta de red entre una billetera [wallet] y el servidor lightwallet. La mixnet de Nym añade esa protección de capa de red que faltaba. Desde octubre de 2026, la integración está activa en billeteras de producción (Zingo, Zkool).

Fuente: [Cómo Nym añade anonimato a las billeteras de Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 de octubre de 2026).

## Qué está protegido

Nym divide los paquetes de transacciones [transaction] (normalmente 7–15 KB de datos de gasto y pruebas ZK [ZK proofs]) en paquetes Sphinx y los enruta a través de la mixnet. Esto:

- Oculta la IP del remitente al servidor lightwallet
- Mezcla el tráfico con otro tráfico de Nym
- Proporciona aproximadamente 17 bits de entropía con la configuración predeterminada, con un conjunto de anonimato citado de más de 100.000 usuarios

Los pagos [payment] y las solicitudes de precios en Zingo v7 siguen esta ruta de forma predeterminada.

## Qué no está protegido

La sincronización de la red [chain synchronization], las consultas de anuladores [nullifier queries], las recuperaciones de transacciones y el tráfico del mempool utilizan actualmente la conexión normal del indexador. Los metadatos a nivel de dispositivo o de aplicación fuera de los paquetes mezclados también quedan fuera del alcance de Nym.

Si tu modelo de amenazas requiere ocultar el tráfico de sincronización, combina una billetera con mixnet nativa con NymVPN a nivel del sistema. Consulta [Nym VPN](/guides/nym-vpn).

## Billeteras

| Billetera | Estado | Notas |
| --- | --- | --- |
| Zingo v7 | Activa, predeterminada | `makers run-cli` incluye `nym-proxy`. La sesión comienza sin conexión; `--online`, `--remember-online` o `--server` otorgan el consentimiento. |
| Zkool | Activa | Integración nativa de mixnet. |
| Otras | Mediante NymVPN | Enruta la billetera a través del modo Mixnet a nivel del sistema. |

Los detalles de configuración de la ruta a nivel de billetera se encuentran en [Enrutar el tráfico de la billetera Zcash a través de la mixnet de Nym](/guides/nym-mixnet-wallet-setup).

## Compensaciones

Una difusión enrutada por Nym es aproximadamente 12,5× más lenta que clearnet (~3,4 s). Tor es más rápido (~3,7×), pero utiliza flujos FIFO sin mezcla, por lo que un adversario global todavía puede correlacionar. Ampliar la base compartida de usuarios de Nym aumenta el anonimato de forma más eficaz que añadir retraso adicional.

## Higiene de la capa de aplicación: nym-swizzle-zcash

La protección de la capa de red no es suficiente. Incluso con una mixnet o VPN perfecta, un servidor lightwallet todavía puede vincular sesiones observando patrones de la capa de aplicación:

- Encadenamiento de puntos de reanudación: los clientes reanudan la sincronización exactamente desde `previous end + 1`, por lo que el servidor puede encadenar sesiones solo por la altura del bloque [block].
- Sincronizar y luego enviar: las billeteras se sincronizan inmediatamente antes de difundir, lo que permite al servidor atribuir una transacción a la sesión de sincronización anterior.

El crate [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) implementa una política de higiene específica de Zcash que aborda ambos aspectos. Empaqueta las primitivas generales de `nym-swizzle` en una política consciente de la red para clientes ligeros [light clients].

**Rangos de sincronización cuantizados.** Las solicitudes se amplían a una cuadrícula de toda la red con celdas del tamaño de un día. El inicio se redondea hacia abajo y el final hacia arriba. Los rangos son deterministas, ascendentes y disjuntos. Las comprobaciones de reorganización se mantienen dentro del rango ampliado para que no se revele el punto exacto de reanudación. El anonimato proviene de la colisión (muchas billeteras emiten los mismos límites) en lugar del ruido.

**Difusiones desacopladas.** Los envíos de transacciones se retrasan mediante una distribución exponencial (media de 144 bloques ≈ 3 horas, límite de 576 bloques ≈ 12 horas) que coincide con la programación de transferencias de ZIP 318. Los retrasos superan la duración típica de los procesos, por lo que los horarios se conservan. La transacción se construye únicamente en el momento de activación contra una punta reciente. La sincronización y la difusión deben utilizar servidores diferentes.

El crate expone los traits `BlockSource` y `TxBroadcaster`, compila para `wasm32-unknown-unknown` y no tiene una pila de red propia. Consulta la documentación de [Nym](https://nym.com/docs/developers/swizzle/zcash) para ver la API completa y ejemplos.

## Fuentes

- [Cómo Nym añade anonimato a las billeteras de Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 de octubre de 2026
- [nym-swizzle-zcash: Política de higiene para clientes ligeros de Zcash](https://nym.com/docs/developers/swizzle/zcash) — Documentación de Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Enrutar el tráfico de la billetera Zcash a través de la mixnet de Nym](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
