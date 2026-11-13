<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 entró en funcionamiento en la red principal de Zcash en el bloque 1.687.104 (31 de mayo de 2022 UTC).

Lo que aprenderás: cómo NU5 dio a Zcash un nuevo pool blindado [shielded pool] que no necesita configuración confiable [trusted setup], además de un único tipo de dirección [address] que funciona entre pools.

NU5 (Actualización de red [Network Upgrade] 5) es la sexta actualización de red [network upgrade] de Zcash [](../start-here/network-upgrades), implementada mediante [ZIP 252](https://zips.z.cash/zip-0252). Es una importante actualización criptográfica. Introdujo el protocolo de pago [payment] blindado Orchard, construido sobre el sistema de pruebas Halo 2, junto con Direcciones Unificadas y un nuevo formato de transacción [transaction] versión 5. NU5 se lanzó en la versión zcashd v5.0.0 de Electric Coin Company.

Por qué importa esto. Un pool blindado solo es tan confiable como la configuración que lo creó. Los dos primeros pools blindados de Zcash, Sprout y Sapling, necesitaban cada uno una ceremonia única de configuración confiable para generar sus parámetros secretos. Si esos parámetros alguna vez se conservaran en vez de destruirse, alguien podría haber creado ZEC falsificados sin que nadie lo viera. El pool Orchard de NU5 elimina esa preocupación al usar el sistema de pruebas Halo 2, que no necesita tal ceremonia.

## La configuración confiable

Orchard es el protocolo blindado introducido por NU5, definido en [ZIP 224](https://zips.z.cash/zip-0224). Está construido sobre el sistema de pruebas Halo 2, que usa una técnica llamada aritmetización PLONKish en el ciclo de curvas Pallas y Vesta. El beneficio práctico es sencillo: Halo 2 no necesita configuración confiable ni una cadena de referencia estructurada, por lo que no existe ningún parámetro secreto que pueda utilizarse indebidamente.

Sprout y Sapling dependían de una configuración confiable. Un grupo de personas realizó una ceremonia para crear los parámetros de cada pool, y todos tenían que confiar en que al menos una de ellas destruyera su parte del secreto. Orchard elimina esa suposición. Los pools más antiguos siguen existiendo después de NU5, por lo que la garantía de no requerir configuración se aplica a los fondos que mantengas en el pool Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Lo que cambió NU5

NU5 reúne varios cambios de consenso [consensus], todos activados juntos en el bloque 1.687.104.

1. Añadió el pool blindado Orchard (ZIP 224), el protocolo basado en Halo 2 descrito anteriormente.
2. Añadió el formato de transacción versión 5 (ZIP 225), una estructura reorganizada con regiones separadas para datos transparentes, Sapling y nuevos datos de Orchard. Se eliminaron los campos Sprout, y el formato anterior versión 4 siguió siendo válido después de la activación.
3. Introdujo Direcciones Unificadas y claves de visualización [viewing key] unificadas (ZIP 316), tratadas en la siguiente sección.
4. Adoptó la no maleabilidad del identificador de transacción (ZIP 244), una nueva forma de calcular el id de una transacción que separa lo que hace una transacción de las pruebas y firmas [signature] que la autorizan.
5. Adoptó codificaciones canónicas de puntos Jubjub (ZIP 216) para eliminar codificaciones no estándar y endurecer las reglas sobre lo que cuenta como una transacción válida.
6. Habilitó la retransmisión de transacciones versión 5 a través de la red entre pares (ZIP 239).

NU5 también actualizó varios ZIP existentes (32, 203, 209, 212, 213, 221 y 401) para que contemplen el nuevo pool Orchard.

## Direcciones Unificadas

Antes de NU5, cada pool tenía su propio tipo de dirección, y un remitente tenía que saber qué tipo querías. Las Direcciones Unificadas, definidas en [ZIP 316](https://zips.z.cash/zip-0316), cambian eso. Una sola Dirección Unificada puede agrupar receptores para más de un pool, por lo que la billetera [wallet] del remitente simplemente elige el mejor que admita.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Las claves de visualización unificadas funcionan del mismo modo para la visualización. Otorgan visibilidad de solo lectura entre los pools que cubre una dirección. Para más información, consulta la página de [Claves de visualización](../zcash-tech/viewing-keys).

## Dónde se sitúa NU5

NU5 siguió las actualizaciones anteriores de Zcash: Overwinter, Sapling, Blossom, Heartwood y Canopy. Se activó en la red principal el 31 de mayo de 2022. El ciclo de curvas de Orchard se eligió porque admite recursión, lo cual es una base para trabajos posteriores de escalabilidad [scaling]. NU5 es el predecesor directo de la línea de actualizaciones NU6 y NU6.x, que se basó en el pool Orchard y posteriormente lo corrigió.

## Resumen

- NU5 se activó en mainnet en el bloque 1,687,104 (31 de mayo de 2022 UTC) — la mayor actualización criptográfica [cryptographic upgrade] de Zcash desde Sapling, desplegada mediante ZIP 252.
- Lanzó el pool blindado [shielded pool] Orchard, el primer pool Zcash construido sobre Halo 2 — un sistema de pruebas [proving system] que no necesita ninguna configuración confiable [trusted setup].
- Incorporó Direcciones Unificadas y claves de visualización [viewing keys] unificadas (ZIP 316): una cadena de dirección que puede agrupar receptores para varios pools.
- Trasladó las transacciones [transactions] al formato de versión 5 (ZIP 225) e hizo que los identificadores de transacción no fueran maleables (ZIP 244).
- Orchard funciona con el ciclo de curvas Pallas/Vesta, que admite pruebas recursivas [recursive proofs] — la base para trabajos posteriores de escalabilidad [scaling] y la línea NU6.x.

## Explicación básica [Core Explanation]

El problema de la configuración confiable [trusted setup]: Sprout (2016) y Sapling (2018) requirieron cada uno una ceremonia única para generar parámetros secretos, y la seguridad dependía de que al menos un participante destruyera su fragmento. Si todos los participantes hubieran guardado secretamente una copia, habrían sido posibles ZEC falsificados. Orchard elimina por completo esa suposición: Halo 2 no utiliza ninguna configuración confiable ni ninguna cadena de referencia estructurada, por lo que no hay ningún secreto del que se pueda abusar jamás.

NU5 agrupó varios cambios de consenso [consensus], activados conjuntamente: el pool Orchard (ZIP 224), el formato de transacción [transaction] versión 5 (ZIP 225), Direcciones Unificadas [Unified Addresses] (ZIP 316), la no maleabilidad del ID de transacción (ZIP 244), las codificaciones canónicas de puntos Jubjub (ZIP 216) y la retransmisión entre pares de transacciones v5 (ZIP 239). También actualizó los ZIP 32, 203, 209, 212, 213, 221 y 401 para tener en cuenta el nuevo pool.

## Analogía visual [Visual analogy]

Los pools [pools] más antiguos son como cajas fuertes cuya combinación se generó en una ceremonia grupal única: confías en que cada participante destruyó su copia. Orchard es una caja fuerte cuya cerradura se vuelve a verificar con cada uso: no hay ceremonia, secreto maestro ni nada que pudiera haberse conservado. Las Direcciones Unificadas [Unified Addresses] son una tarjeta de presentación que enumera cada entrada: transparente [transparent], Sapling, Orchard, y el visitante elige la puerta que realmente puede abrir.

## Análisis en profundidad [Deep Dive]

Halo 2 utiliza aritmetización PLONKish en el ciclo de curvas Pallas y Vesta — dos curvas compatibles con emparejamiento que se complementan entre sí, lo que permite la recursión: pruebas [proofs] que verifican otras pruebas. Esa recursión es la base sobre la que se sustenta el posterior trabajo de escalabilidad [scaling] de Zcash. El diseño de transacción [transaction] v5 separa las regiones transparentes [transparent], Sapling y Orchard, y elimina los campos Sprout; el formato anterior versión 4 siguió siendo válido después de la activación. ZIP 244 recalcula el id de transacción a partir de lo que hace una transacción, no de las pruebas y firmas [signatures] que la autorizan, cerrando vectores de maleabilidad.

## Errores comunes [Common Mistakes]

- **Creer que NU5 eliminó la configuración confiable [trusted setup] para todos los pools.** Solo Orchard no requiere ceremonia; los parámetros de Sapling aún existen, por lo que la garantía de no requerir configuración se aplica a los fondos guardados en Orchard.
- **Suponer que las direcciones [addresses] o billeteras [wallets] antiguas dejaron de funcionar.** NU5 añadió opciones; los tipos de dirección por pool y el formato de transacción [transaction] v4 siguieron siendo válidos.
- **Confundir Orchard con Halo 2.** Orchard es el protocolo/pool blindado [shielded]; Halo 2 es el sistema de pruebas [proving system] que utiliza.
- **Tratar las Direcciones Unificadas [Unified Addresses] como el único tipo de dirección.** Son un formato adicional que puedes adoptar cuando tu billetera las admita.
- **Creer que NU5 cambió la emisión o la privacidad [privacy] existente.** Añadió un pool y formatos; ZEC y su privacidad no se vieron afectados.

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Network upgrade (NU) | Un cambio coordinado en las reglas de consenso de Zcash, activado a una altura de bloque establecida |
| Orchard | El pool blindado que introdujo NU5, construido sobre el sistema de pruebas Halo 2 |
| Halo 2 | El sistema de pruebas detrás de Orchard que no necesita configuración confiable |
| Trusted setup | Una ceremonia única que crea los parámetros secretos de un pool y requiere confianza para destruirlos |
| Unified Address | Una sola dirección que puede agrupar receptores para más de un pool (ZIP 316) |
| Consensus branch id | Un identificador que indica a qué conjunto de reglas pertenece una transacción |

## Preguntas frecuentes

¿NU5 cambia mi ZEC o mi privacidad? No. NU5 añadió un nuevo pool blindado y un nuevo formato de dirección. Tu ZEC existente no se ve afectado, y tu privacidad no se reduce. Mover fondos a Orchard te proporciona un pool que no necesita configuración confiable.

¿Qué es Orchard? Orchard es el protocolo blindado de Zcash introducido por NU5. Funciona con el sistema de pruebas Halo 2, por lo que no necesita una ceremonia de configuración confiable.

¿Tengo que hacer algo? No. Una billetera compatible gestiona NU5 por ti. Puedes seguir usando direcciones antiguas y comenzar a usar Direcciones Unificadas cuando tu billetera las ofrezca.

¿Qué es una Dirección Unificada? Una sola dirección que puede contener receptores para más de un pool. La billetera del remitente elige el pool que admite, por lo que no tienes que proporcionar una dirección diferente para cada tipo.

¿NU5 elimina la configuración confiable de mis fondos antiguos? No de forma retroactiva. Orchard no necesita configuración confiable, pero los parámetros anteriores del pool Sapling siguen existiendo después de NU5. La garantía de no requerir configuración se aplica a los fondos mantenidos en el pool Orchard.

¿El formato antiguo de transacción dejó de funcionar? No. NU5 añadió el formato versión 5, y el formato anterior versión 4 siguió siendo válido después de la activación.

## Pon a prueba tu comprensión

Sprout y Sapling necesitaban una ceremonia de configuración confiable. ¿Qué cambió el pool Orchard de NU5 respecto a eso, y por qué importa?

<details>
<summary>Respuesta</summary>

Orchard está construido sobre el sistema de pruebas Halo 2, que no necesita configuración confiable ni una cadena de referencia estructurada. Eso elimina el riesgo de que parámetros secretos restantes pudieran usarse alguna vez para falsificar ZEC. La garantía se aplica a los fondos mantenidos en el pool Orchard. Los parámetros antiguos de Sapling siguen existiendo después de NU5.
</details>

### Recursos

[ZIP 252: Implementación de la actualización de red NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Protocolo blindado Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Formato de transacción versión 5](https://zips.z.cash/zip-0225)

[ZIP 316: Direcciones Unificadas y claves de visualización unificadas](https://zips.z.cash/zip-0316)

[Actualización de red 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: Lanzamiento de zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

### Véase también

[Zcash Actualizaciones de red](../start-here/network-upgrades)

[Pools blindados](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Claves de visualización](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

## Páginas relacionadas [Related Pages]

- [Halo](./Halo.md) — el sistema de pruebas sin configuración confiable [trusted setup] detrás de Orchard
- [Direcciones unificadas](./Unified_Addresses.md) — análisis exhaustivo del direccionamiento [addressing] 316 de ZIP
- [Sapling](./Sapling.md) — el pool blindado [shielded] anterior, aún vinculado a su ceremonia
- [NU6](./NU6.md) — la próxima actualización, construida sobre el pool Orchard
- [zk_SNARKS](./zk_SNARKS.md) — la tecnología zero-knowledge [zero-knowledge] subyacente

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Anterior: [Canopy](../zcash-tech/canopy) · Siguiente: [NU6](../zcash-tech/nu6)
