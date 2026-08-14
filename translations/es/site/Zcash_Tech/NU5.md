---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 se activó en la mainnet de Zcash en el bloque 1,687,104 (31 de mayo de 2022 UTC).

Lo que aprenderás: cómo NU5 le dio a Zcash un nuevo pool blindado que no necesita trusted setup, además de un único tipo de dirección que funciona entre pools.

NU5 (Network Upgrade 5) es la sexta [actualización de red](../start-here/network-upgrades) de Zcash, implementada por [ZIP 252](https://zips.z.cash/zip-0252). Es una importante actualización criptográfica. Introdujo el protocolo de pagos blindados Orchard, construido sobre el sistema de pruebas Halo 2, junto con direcciones unificadas y un nuevo formato de transacción versión 5. NU5 se lanzó en la versión zcashd v5.0.0 de Electric Coin Company.

Por qué esto importa. Un pool blindado es tan confiable como la configuración que lo creó. Los dos primeros pools blindados de Zcash, Sprout y Sapling, necesitaron cada uno una ceremonia única de trusted setup para generar sus parámetros secretos. Si esos parámetros alguna vez se hubieran conservado en lugar de destruirse, alguien podría haber creado ZEC falsificados sin que nadie lo notara. El pool Orchard de NU5 elimina esa preocupación al usar el sistema de pruebas Halo 2, que no necesita tal ceremonia.

## El trusted setup

Orchard es el protocolo blindado más reciente de Zcash, definido en [ZIP 224](https://zips.z.cash/zip-0224). Está construido sobre el sistema de pruebas Halo 2, que usa una técnica llamada aritmetización PLONKish sobre el ciclo de curvas Pallas y Vesta. La ventaja práctica es simple: Halo 2 no necesita trusted setup ni una structured reference string, por lo que no existe ningún parámetro secreto que pueda ser mal utilizado.

Tanto Sprout como Sapling dependían de un trusted setup. Un grupo de personas realizó una ceremonia para construir los parámetros de cada pool, y todos tenían que confiar en que al menos una de ellas destruyera su parte del secreto. Orchard elimina ese supuesto. Los pools antiguos siguen existiendo después de NU5, así que la garantía de no requerir configuración aplica a los fondos que mantienes en el pool Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## Qué cambió NU5

NU5 agrupa varios cambios de consenso, todos activados juntos en el bloque 1,687,104.

1. Añadió el pool blindado Orchard (ZIP 224), el protocolo basado en Halo 2 descrito anteriormente.
2. Añadió el formato de transacción versión 5 (ZIP 225), una estructura reorganizada con regiones separadas para datos transparentes, Sapling y los nuevos datos de Orchard. Se eliminaron los campos de Sprout, y el antiguo formato versión 4 siguió siendo válido después de la activación.
3. Introdujo las direcciones unificadas y las unified viewing keys (ZIP 316), tratadas en la siguiente sección.
4. Adoptó la no maleabilidad del identificador de transacción (ZIP 244), una nueva forma de calcular el id de una transacción que separa lo que hace una transacción de las pruebas y firmas que la autorizan.
5. Adoptó las codificaciones canónicas de puntos Jubjub (ZIP 216) para eliminar codificaciones no estándar y reforzar las reglas sobre qué cuenta como una transacción válida.
6. Habilitó la retransmisión de transacciones versión 5 a través de la red peer-to-peer (ZIP 239).

NU5 también actualizó varios ZIP existentes (32, 203, 209, 212, 213, 221 y 401) para que tengan en cuenta el nuevo pool Orchard.

## Direcciones unificadas

Antes de NU5, cada pool tenía su propio tipo de dirección, y un remitente tenía que saber cuál querías. Las direcciones unificadas, definidas en [ZIP 316](https://zips.z.cash/zip-0316), cambian eso. Una sola dirección unificada puede agrupar receptores para más de un pool, así que la wallet del remitente simplemente elige el mejor que admite.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

Las unified viewing keys funcionan del mismo modo para la visualización. Ofrecen visibilidad de solo lectura en todos los pools que cubre una dirección. Para más información sobre eso, consulta la página de [Viewing Keys](../zcash-tech/viewing-keys).

## Dónde se sitúa NU5

NU5 vino después de las actualizaciones anteriores de Zcash: Overwinter, Sapling, Blossom, Heartwood y Canopy. Se activó en mainnet el 31 de mayo de 2022. El ciclo de curvas de Orchard fue elegido porque admite recursión, lo que sienta las bases para futuros trabajos de escalado. NU5 es el predecesor directo de la línea de actualizaciones NU6 y NU6.x, que se apoyaron en el pool Orchard y más tarde lo corrigieron.

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Actualización de red (NU) | Un cambio coordinado en las reglas de consenso de Zcash, activado a una altura de bloque determinada |
| Orchard | El pool blindado que introdujo NU5, construido sobre el sistema de pruebas Halo 2 |
| Halo 2 | El sistema de pruebas detrás de Orchard que no necesita trusted setup |
| Trusted setup | Una ceremonia única que crea los parámetros secretos de un pool y en la que se debe confiar para que sean destruidos |
| Dirección unificada | Una sola dirección que puede agrupar receptores para más de un pool (ZIP 316) |
| Consensus branch id | Un identificador que marca a qué conjunto de reglas pertenece una transacción |

## Preguntas frecuentes

¿NU5 cambia mi ZEC o mi privacidad? No. NU5 añadió un nuevo pool blindado y un nuevo formato de dirección. Tu ZEC actual no se ve afectado, y tu privacidad no se reduce. Mover fondos a Orchard te da un pool que no necesita trusted setup.

¿Qué es Orchard? Orchard es el protocolo blindado de Zcash introducido por NU5. Funciona sobre el sistema de pruebas Halo 2, así que no necesita una ceremonia de trusted setup.

¿Tengo que hacer algo? No. Una wallet compatible gestiona NU5 por ti. Puedes seguir usando direcciones antiguas y puedes empezar a usar direcciones unificadas cuando tu wallet las ofrezca.

¿Qué es una dirección unificada? Una sola dirección que puede contener receptores para más de un pool. La wallet del remitente elige el pool que admite, así que no tienes que entregar una dirección distinta para cada tipo.

¿NU5 elimina el trusted setup de mis fondos antiguos? No retroactivamente. Orchard no necesita trusted setup, pero los parámetros anteriores del pool Sapling siguen existiendo después de NU5. La garantía de no requerir configuración aplica a los fondos mantenidos en el pool Orchard.

¿El formato antiguo de transacción dejó de funcionar? No. NU5 añadió el formato versión 5, y el antiguo formato versión 4 siguió siendo válido después de la activación.

## Pon a prueba tu comprensión

Tanto Sprout como Sapling necesitaban una ceremonia de trusted setup. ¿Qué cambió el pool Orchard de NU5 al respecto, y por qué importa?

<details>
<summary>Respuesta</summary>

Orchard está construido sobre el sistema de pruebas Halo 2, que no necesita trusted setup ni structured reference string. Eso elimina el riesgo de que parámetros secretos remanentes pudieran usarse alguna vez para falsificar ZEC. La garantía aplica a los fondos mantenidos en el pool Orchard. Los parámetros más antiguos de Sapling siguen existiendo después de NU5.
</details>

### Recursos

[ZIP 252: Implementación de la Network Upgrade NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Protocolo Blindado Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Formato de Transacción Versión 5](https://zips.z.cash/zip-0225)

[ZIP 316: Direcciones Unificadas y Unified Viewing Keys](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: lanzamiento de zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

### Ver también

[Actualizaciones de Red de Zcash](../start-here/network-upgrades)

[Pools Blindados](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Serie: [Índice de Actualizaciones de Red](../start-here/network-upgrades) · Anterior: [Canopy](../zcash-tech/canopy) · Siguiente: [NU6](../zcash-tech/nu6)
