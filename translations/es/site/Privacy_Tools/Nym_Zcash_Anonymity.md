<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Nym Anonimato de Mixnet para Zcash

> Última verificación: 18 de octubre de 2026

Los pools blindados de Zcash ocultan las cantidades, los remitentes y los receptores en cadena. No ocultan la ruta de red entre una wallet y el servidor lightwallet. El mixnet de Nym añade esa protección faltante de la capa de red. A fecha de octubre de 2026, la integración está activa en wallets de producción (Zingo, Zkool).

Fuente: [Cómo Nym añade anonimato a las wallets de Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 de octubre de 2026).

## Qué está protegido

Nym divide los paquetes de transacciones (normalmente entre 7 y 15 KB de datos de gasto y pruebas ZK) en paquetes Sphinx y los enruta a través del mixnet. Esto:

- Oculta la IP del remitente al servidor lightwallet
- Mezcla el tráfico con otro tráfico de Nym
- Proporciona aproximadamente 17 bits de entropía con la configuración predeterminada, con un conjunto de anonimato citado de más de 100.000 usuarios

Los pagos y las solicitudes de precios en Zingo v7 siguen esta ruta de forma predeterminada.

## Qué no está protegido

La sincronización de la cadena, las consultas de nullifier, las recuperaciones de transacciones y el tráfico del mempool usan actualmente la conexión normal del indexador. Los metadatos a nivel de dispositivo o aplicación fuera de los paquetes mezclados también quedan fuera del alcance de Nym.

Si tu modelo de amenazas requiere ocultar el tráfico de sincronización, combina una wallet con mixnet nativo con NymVPN a nivel de sistema. Consulta [Nym VPN](/guides/nym-vpn).

## Wallets

| Wallet | Estado | Notas |
| --- | --- | --- |
| Zingo v7 | Activa, predeterminada | `makers run-cli` incluye `nym-proxy`. La sesión comienza sin conexión; `--online`, `--remember-online` o `--server` otorga consentimiento. |
| Zkool | Activa | Integración nativa de mixnet. |
| Otras | Mediante NymVPN | Enruta la wallet mediante el modo Mixnet a nivel de sistema. |

Los detalles de configuración de la ruta a nivel de wallet están en [Enrutar el tráfico de la wallet de Zcash a través del Mixnet de Nym](/guides/nym-mixnet-wallet-setup).

## Compensaciones

Una transmisión enrutada mediante Nym es aproximadamente 12,5× más lenta que clearnet (~3,4 s). Tor es más rápido (~3,7×), pero usa flujos FIFO sin mezcla, por lo que un adversario global aún puede establecer correlaciones. Ampliar la base compartida de usuarios de Nym aumenta el anonimato más eficazmente que añadir retraso adicional.

## Higiene de la capa de aplicación: nym-swizzle-zcash

La protección de la capa de red no es suficiente. Incluso con un mixnet o VPN perfecto, un servidor lightwallet puede seguir vinculando sesiones al observar patrones de la capa de aplicación:

- Encadenamiento de puntos de reanudación: los clientes reanudan la sincronización exactamente desde `previous end + 1`, por lo que el servidor puede encadenar sesiones únicamente por la altura del bloque.
- Sincronizar y luego enviar: las wallets se sincronizan inmediatamente antes de transmitir, lo que permite al servidor atribuir una transacción a la sesión de sincronización anterior.

El crate [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) implementa una política de higiene específica para Zcash que aborda ambos problemas. Empaqueta las primitivas generales de `nym-swizzle` en una política consciente de la cadena para clientes ligeros.

**Rangos de sincronización cuantizados.** Las solicitudes se amplían a una cuadrícula de toda la red con celdas del tamaño de un día. El inicio se redondea hacia abajo y el final hacia arriba. Los rangos son deterministas, ascendentes y disjuntos. Las comprobaciones de reorganización permanecen dentro del rango ampliado, de modo que no se revela el punto exacto de reanudación. El anonimato proviene de la colisión (muchas wallets emiten los mismos límites) en lugar del ruido.

**Transmisiones desacopladas.** Los envíos de transacciones se retrasan mediante una distribución exponencial (media de 144 bloques ≈ 3 horas, límite de 576 bloques ≈ 12 horas) que coincide con la programación de transferencias de ZIP 318. Los retrasos superan las vidas útiles típicas de los procesos, por lo que los calendarios se persisten. La transacción se construye solo en el momento de envío con respecto a una punta reciente. La sincronización y la transmisión deben usar servidores distintos.

El crate expone los traits `BlockSource` y `TxBroadcaster`, compila para `wasm32-unknown-unknown` y no tiene una pila de red propia. Consulta la documentación de [Nym](https://nym.com/docs/developers/swizzle/zcash) para conocer la API completa y ver ejemplos.

## Fuentes

- [Cómo Nym añade anonimato a las wallets de Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 de octubre de 2026
- [nym-swizzle-zcash: Política de higiene para clientes ligeros de Zcash](https://nym.com/docs/developers/swizzle/zcash) — Documentación de Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Enrutar el tráfico de la wallet de Zcash a través del Mixnet de Nym](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
