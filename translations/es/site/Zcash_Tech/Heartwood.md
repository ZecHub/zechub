<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood se activó en la red principal de Zcash en el bloque [block] 903.000 (16 de julio de 2020 UTC).

Lo que aprenderás: cómo Heartwood permitió a los mineros recibir las recompensas de sus bloques directamente en direcciones blindadas [shielded], y cómo hizo que la prueba de trabajo [proof-of-work] de Zcash pudiera ser verificada por clientes ligeros [lightweight clients].

Heartwood es una Zcash [actualización de red network upgrade](../start-here/network-upgrades), una bifurcación dura de las reglas de consenso [consensus] cuyo despliegue se define en [ZIP 250](https://zips.z.cash/zip-0250). Agrupó dos cambios de funcionalidades: [ZIP 213](https://zips.z.cash/zip-0213) (Coinbase blindado) y [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood fue la cuarta actualización de red importante de Zcash, y contó con el apoyo conjunto de [Electric Coin Company](../zcash-organizations/electric-coin-company) y [Zcash Foundation](../zcash-organizations/zcash-foundation). Como toda actualización de Zcash, estableció un nuevo ID de rama de consenso, una etiqueta que proporciona protección bidireccional contra repetición, de modo que una transacción [transaction] creada bajo las nuevas reglas no pueda repetirse en la cadena [chain] anterior, ni a la inversa.

Heartwood se activa a una altura de bloque establecida (903.000), no a una hora fija, por lo que el minuto exacto que veas en un panel [dashboard] puede variar ligeramente de un lugar a otro. El bloque y el momento son los mismos.

Por qué es importante. Los mineros [Miners] obtienen ZEC recién emitidos cada vez que minan un bloque [block]. Antes de Heartwood, esos ingresos tenían que llegar a una dirección transparente [transparent address], que es pública. Cualquiera podía observar cuánto obtenía un minero [miner] y adónde iban las monedas después. Heartwood permitió que esa recompensa fuera directamente a una dirección blindada [shielded address], de modo que el pago de un minero puede mantenerse privado [private]. También hizo posible que las billeteras ligeras [lightweight wallets] y otras redes [chains] verificaran la prueba de trabajo [proof-of-work] de Zcash sin descargar toda la cadena [chain].

## Coinbase blindado [Shielded coinbase]

La transacción coinbase es la transacción especial que paga una recompensa de bloque. Antes de Heartwood, sus salidas debían ser transparentes, por lo que los ZEC recién acuñados de un minero siempre comenzaban en una dirección pública. Heartwood cambió las reglas de consenso para que, en palabras de ZIP 213, las transacciones coinbase puedan contener salidas Sapling. En términos sencillos, los mineros ahora pueden recibir recompensas directamente en direcciones Sapling blindadas. Las salidas coinbase transparentes siguen siendo compatibles, así que esta es una opción nueva, no un cambio obligatorio.

![Before Heartwood a miner's block reward had to go to a transparent public address. After Heartwood coinbase transactions may contain Sapling outputs, so the reward can go straight to a shielded address](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## Por qué primero Sapling

El coinbase blindado se dirige específicamente a las salidas Sapling, y hay una razón para ello. ZIP 213 explica que la actualización Sapling introdujo cambios arquitectónicos y mejoras de rendimiento que hicieron viable blindar fondos directamente en la transacción coinbase. El pool blindado original de Sprout requería demasiados recursos para blindar directamente en la coinbase. El sistema de generación de pruebas y el formato de notas más eficientes de Sapling lo hicieron práctico. Sapling había ampliado la regla anterior que prohibía las salidas coinbase blindadas para que también cubriera las salidas Sapling, y Heartwood flexibiliza esa regla para permitirlas. Es un buen ejemplo de cómo las actualizaciones de Zcash se construyen unas sobre otras: la infraestructura de una actualización se convierte en la base de la siguiente.

## FlyClient

Heartwood también cambió a qué se compromete un encabezado de bloque. El campo del encabezado denominado anteriormente hashFinalSaplingRoot fue reutilizado y renombrado hashLightClientRoot. Ahora se compromete con la raíz de un Merkle Mountain Range (MMR), una estructura acumulativa construida sobre los datos del encabezado y los metadatos de bloques anteriores, como marcas de tiempo, objetivos de dificultad, raíces Sapling, trabajo acumulado y recuentos de transacciones. Ese compromiso permite a un cliente ligero, o a una cadena externa, verificar la prueba de trabajo de Zcash mediante una prueba pequeña cuyo tamaño crece solo logarítmicamente con la longitud de la cadena. El beneficio son mejores billeteras de clientes ligeros y una integración de terceros y cross-chain más sencilla, porque un cliente ya no tiene que descargar cada bloque para confiar en el trabajo detrás de la cadena.

![FlyClient flow: each block's header data is committed into a Merkle Mountain Range root (hashLightClientRoot), which lets a light client verify proof-of-work with a small logarithmic-size proof](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Dónde encaja Heartwood

Heartwood es un paso en una serie de actualizaciones de Zcash, cada una añadiendo una pieza de la que depende la siguiente. Overwinter y Sapling llegaron en 2018, Blossom en 2019 y Heartwood en 2020, en el bloque 903.000. Canopy siguió más adelante en 2020, en el bloque 1.046.400. Sapling es el vínculo clave de esta cadena para Heartwood: su eficiente mecanismo de transacciones blindadas fue la condición técnica previa que hizo posible el coinbase blindado.

![Timeline of Zcash upgrades: Overwinter and Sapling in 2018, Blossom in 2019, and Heartwood in 2020](/content-images/heartwood-timeline-99bc79b6e9.webp)

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Network upgrade (NU) | Un cambio coordinado en las reglas de consenso de Zcash, activado a una altura de bloque establecida |
| Coinbase transaction | La transacción especial de cada bloque que paga la recompensa de bloque |
| Shielded Sapling address | Un tipo de dirección Zcash privada introducido por la actualización Sapling |
| Shielded coinbase | El cambio de Heartwood que permite pagar recompensas de bloque en direcciones Sapling blindadas |
| FlyClient | Un método que permite a los clientes ligeros verificar la prueba de trabajo con pruebas pequeñas |
| Merkle Mountain Range (MMR) | Un resumen acumulativo de bloques anteriores con el que se compromete el encabezado de bloque |
| Consensus branch id | Una etiqueta que identifica las reglas de qué actualización sigue una transacción, usada para la protección contra repetición |

## Preguntas frecuentes

¿Heartwood cambia mi ZEC o mi privacidad [privacy]? No. Heartwood no modificó tus fondos existentes. Añadió la opción para que los mineros reciban recompensas en direcciones blindadas y mejoró el soporte para clientes ligeros. Tus propios saldos y transacciones blindadas no se ven afectados.

¿Qué es el coinbase blindado? La coinbase es la transacción que paga una recompensa de bloque. Heartwood permite que esa recompensa vaya a una dirección Sapling blindada en lugar de una transparente, para que los ingresos del minero puedan mantenerse privados.

¿Los mineros ahora tienen que recibir recompensas blindadas? No. El coinbase blindado es opcional. Las salidas coinbase transparentes siguen siendo compatibles, por lo que los mineros pueden elegir cualquiera de las dos opciones.

¿Por qué el coinbase blindado usa Sapling y no el pool Sprout más antiguo? Porque el diseño más eficiente de Sapling hizo práctico blindar directamente en la coinbase. El pool Sprout anterior requería demasiados recursos para hacerlo.

¿Qué cambió para los clientes ligeros? El encabezado de bloque ahora se compromete con un Merkle Mountain Range sobre bloques anteriores mediante el campo hashLightClientRoot. Eso permite a los clientes ligeros y a otras cadenas verificar la prueba de trabajo de Zcash con pruebas pequeñas de tamaño logarítmico en lugar de con toda la cadena.

## Pon a prueba tu comprensión

Antes de Heartwood, ¿por qué la recompensa de bloque pagada a un minero aparecía públicamente y qué cambió Heartwood?

<details>
<summary>Respuesta</summary>

Las salidas Coinbase debían ser transparentes, por lo que la recompensa recién acuñada de un minero siempre llegaba a una dirección transparente pública que cualquiera podía inspeccionar. Heartwood cambió las reglas de consenso (ZIP 213) para que las transacciones coinbase puedan contener salidas Sapling, permitiendo a los mineros recibir sus recompensas directamente en direcciones blindadas.
</details>

### Recursos

[ZIP 250: Despliegue de la actualización de red Heartwood](https://zips.z.cash/zip-0250)

[ZIP 213: Coinbase blindado](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Cambios en la capa de consenso](https://zips.z.cash/zip-0221)

[Heartwoodactualización de red](https://z.cash/upgrade/heartwood/)

### Véase también

[ZcashActualizaciones de red](../start-here/network-upgrades)

[Pools blindados](../using-zcash/shielded-pools)

[Billeteras](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Anterior: [Blossom](../zcash-tech/blossom) · Siguiente: [Canopy](../zcash-tech/canopy)
