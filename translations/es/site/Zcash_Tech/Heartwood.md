<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Heartwood

> Heartwood se activó en la mainnet de Zcash en el bloque 903,000 (16 de julio de 2020 UTC).

Lo que aprenderás: cómo Heartwood permitió a los mineros recibir sus recompensas por bloque directamente en direcciones blindadas, y cómo hizo que la prueba de trabajo de Zcash pudiera ser verificada por clientes ligeros.

Heartwood es una [actualización de red](../start-here/network-upgrades) de Zcash, una bifurcación dura de las reglas de consenso cuyo despliegue está definido en [ZIP 250](https://zips.z.cash/zip-0250). Agrupó dos cambios de funcionalidad: [ZIP 213](https://zips.z.cash/zip-0213) (Shielded Coinbase) y [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood fue la cuarta gran actualización de red de Zcash, y contó con el apoyo conjunto de la [Electric Coin Company](../zcash-organizations/electric-coin-company) y la [Zcash Foundation](../zcash-organizations/zcash-foundation). Como en todas las actualizaciones de Zcash, estableció un nuevo consensus branch id, una etiqueta que proporciona protección bidireccional contra replay para que una transacción creada bajo las nuevas reglas no pueda reproducirse en la cadena antigua, y viceversa.

Heartwood se activa a una altura de bloque determinada (903,000), no a una hora fija del reloj, por lo que el minuto exacto que ves en un panel puede variar ligeramente de un lugar a otro. El bloque, y el momento, son los mismos.

Por qué esto importa. Los mineros ganan ZEC recién emitidos cada vez que minan un bloque. Antes de Heartwood, ese ingreso tenía que llegar a una dirección transparente, que es pública. Cualquiera podía ver cuánto ganaba un minero y adónde iban después esas monedas. Heartwood permitió que esa recompensa fuera directamente a una dirección blindada, de modo que el pago de un minero pueda mantenerse privado. También hizo posible que wallets ligeras y otras cadenas verificaran la prueba de trabajo de Zcash sin descargar toda la cadena.

## Shielded coinbase

La transacción coinbase es la transacción especial que paga una recompensa por bloque. Antes de Heartwood, sus salidas tenían que ser transparentes, por lo que los ZEC recién emitidos de un minero siempre empezaban su vida en una dirección pública. Heartwood cambió las reglas de consenso para que, en palabras de ZIP 213, las transacciones coinbase puedan contener salidas Sapling. En términos sencillos, ahora los mineros pueden recibir recompensas directamente en direcciones Sapling blindadas. Las salidas coinbase transparentes siguen siendo compatibles, así que esto es una nueva opción, no un cambio obligatorio.

![Antes de Heartwood la recompensa por bloque de un minero tenía que ir a una dirección pública transparente. Después de Heartwood las transacciones coinbase pueden contener salidas Sapling, por lo que la recompensa puede ir directamente a una dirección blindada](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-shielded-coinbase.png)

## Por qué primero Sapling

Shielded coinbase apunta específicamente a salidas Sapling, y hay una razón para ello. ZIP 213 explica que la actualización Sapling introdujo cambios de arquitectura y mejoras de rendimiento que hicieron viable blindar fondos directamente en la transacción coinbase. El pool blindado Sprout original requería demasiados recursos como para blindar directamente en la coinbase. El sistema de pruebas más eficiente de Sapling y su formato de note lo hicieron práctico. Sapling, a su vez, había extendido la regla anterior que prohibía salidas coinbase blindadas para que también cubriera las salidas Sapling, y Heartwood flexibiliza esa regla para permitirlas. Es un buen ejemplo de cómo las actualizaciones de Zcash se construyen unas sobre otras: la infraestructura de una actualización se convierte en la base de la siguiente.

## FlyClient

Heartwood también cambió a qué se compromete un encabezado de bloque. El campo del encabezado antes llamado hashFinalSaplingRoot fue reutilizado y renombrado como hashLightClientRoot. Ahora se compromete a la raíz de un Merkle Mountain Range (MMR), una estructura acumulativa construida sobre los datos del encabezado y los metadatos de bloques anteriores, como marcas de tiempo, objetivos de dificultad, raíces de Sapling, trabajo acumulado y conteos de transacciones. Ese compromiso permite que un cliente ligero, o una cadena externa, verifique la prueba de trabajo de Zcash usando una prueba pequeña cuyo tamaño crece solo de forma logarítmica con la longitud de la cadena. El resultado es una mejor experiencia para wallets de cliente ligero y una integración más sencilla con terceros y entre cadenas, porque un cliente ya no tiene que descargar cada bloque para confiar en el trabajo detrás de la cadena.

![Flujo de FlyClient: los datos del encabezado de cada bloque se comprometen en una raíz de Merkle Mountain Range (hashLightClientRoot), lo que permite a un cliente ligero verificar la prueba de trabajo con una prueba pequeña de tamaño logarítmico](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-flyclient.png)

## Dónde encaja Heartwood

Heartwood es un paso dentro de una serie de actualizaciones de Zcash, cada una añadiendo una pieza de la que depende la siguiente. Overwinter y Sapling llegaron en 2018, Blossom en 2019, y Heartwood en 2020 en el bloque 903,000. Canopy llegó después, también en 2020, en el bloque 1,046,400. Sapling es el eslabón clave de esta cadena para Heartwood: su maquinaria eficiente de transacciones blindadas fue la condición técnica previa que hizo posible shielded coinbase.

![Cronología de las actualizaciones de Zcash: Overwinter y Sapling en 2018, Blossom en 2019, y Heartwood en 2020](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-timeline.png)

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Network upgrade (NU) | Un cambio coordinado en las reglas de consenso de Zcash, activado a una altura de bloque determinada |
| Coinbase transaction | La transacción especial en cada bloque que paga la recompensa del bloque |
| Shielded Sapling address | Un tipo de dirección privada de Zcash introducida por la actualización Sapling |
| Shielded coinbase | El cambio de Heartwood que permite que las recompensas por bloque se paguen en direcciones Sapling blindadas |
| FlyClient | Un método que permite a los clientes ligeros verificar la prueba de trabajo con pruebas pequeñas |
| Merkle Mountain Range (MMR) | Un resumen acumulativo de bloques anteriores al que se compromete el encabezado del bloque |
| Consensus branch id | Una etiqueta que identifica qué reglas de actualización sigue una transacción, usada para protección contra replay |

## Preguntas frecuentes

¿Heartwood cambia mis ZEC o mi privacidad? No. Heartwood no modificó tus fondos existentes. Añadió la opción de que los mineros reciban recompensas en direcciones blindadas y mejoró el soporte para clientes ligeros. Tus propios saldos y transacciones blindadas no se ven afectados.

¿Qué es shielded coinbase? La coinbase es la transacción que paga una recompensa por bloque. Heartwood permite que esa recompensa vaya a una dirección Sapling blindada en lugar de a una transparente, para que los ingresos de los mineros puedan mantenerse privados.

¿Ahora los mineros tienen que recibir recompensas blindadas? No. Shielded coinbase es opcional. Las salidas coinbase transparentes siguen siendo compatibles, así que los mineros pueden elegir cualquiera de las dos.

¿Por qué shielded coinbase usa Sapling y no el pool Sprout más antiguo? Porque el diseño más eficiente de Sapling hizo práctico blindar directamente en la coinbase. El pool Sprout anterior requería demasiados recursos para hacerlo.

¿Qué cambió para los clientes ligeros? El encabezado del bloque ahora se compromete a un Merkle Mountain Range sobre bloques anteriores a través del campo hashLightClientRoot. Eso permite que clientes ligeros y otras cadenas verifiquen la prueba de trabajo de Zcash con pruebas pequeñas de tamaño logarítmico en lugar de toda la cadena.

## Pon a prueba tu comprensión

Antes de Heartwood, ¿por qué la recompensa del bloque pagada a un minero aparecía públicamente, y qué cambió Heartwood?

<details>
<summary>Respuesta</summary>

Las salidas coinbase tenían que ser transparentes, por lo que la recompensa recién emitida de un minero siempre llegaba a una dirección transparente pública que cualquiera podía inspeccionar. Heartwood cambió las reglas de consenso (ZIP 213) para que las transacciones coinbase puedan contener salidas Sapling, permitiendo que los mineros reciban sus recompensas directamente en direcciones blindadas.
</details>

### Recursos

[ZIP 250: Despliegue de la actualización de red Heartwood](https://zips.z.cash/zip-0250)

[ZIP 213: Shielded Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Cambios en la capa de consenso](https://zips.z.cash/zip-0221)

[Actualización de red Heartwood](https://z.cash/upgrade/heartwood/)

### Véase también

[Actualizaciones de red de Zcash](../start-here/network-upgrades)

[Pools blindados](../using-zcash/shielded-pools)

[Wallets](../using-zcash/wallets)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Anterior: [Blossom](../zcash-tech/blossom) · Siguiente: [Canopy](../zcash-tech/canopy)
