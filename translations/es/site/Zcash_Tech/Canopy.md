---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopy se activó en la mainnet de Zcash en el bloque 1,046,400 (18 de noviembre de 2020 UTC).

Qué aprenderás: cómo Zcash siguió financiando su propio desarrollo después de que terminara la recompensa de los fundadores, y cómo Canopy estableció la división de financiación sobre la que siguen construyéndose las actualizaciones posteriores.

Canopy es la quinta actualización de red de Zcash, también etiquetada como Network Upgrade 4 (NU4). Se implementa mediante [ZIP 251](https://zips.z.cash/zip-0251), y se activó en el bloque 1,046,400 de mainnet el 18 de noviembre de 2020 (UTC), en el mismo momento que la primera reducción a la mitad de la recompensa por bloque de Zcash. Canopy fue principalmente una actualización de gobernanza y monetaria. Puso fin a la recompensa original de los fundadores y dio inicio al nuevo Zcash Development Fund, que paga a Electric Coin Company, la Zcash Foundation y los beneficiarios de subvenciones independientes. La política detrás de ese fondo surgió de un extenso proceso de gobernanza comunitaria en 2019.

Por qué esto importa. Zcash financia su propio desarrollo a partir de las recompensas por bloque, porque no tiene una empresa detrás. La recompensa de los fundadores que financió sus primeros años estaba programada para terminar en la primera reducción a la mitad. Canopy fue el reemplazo: dirigió una parte fija de cada recompensa por bloque hacia un Development Fund y estableció quién lo recibe. Ese modelo fue refinado por actualizaciones posteriores, hasta [NU6.1](../zcash-tech/nu6-1).

![Antes de Canopy, la recompensa de los fundadores financiaba el desarrollo y estaba programada para terminar en la primera reducción a la mitad. Después de Canopy, el Development Fund toma el 20 por ciento de cada recompensa por bloque y se extiende hasta la segunda reducción a la mitad en 2024](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-founders-to-devfund.png)

## El fondo de desarrollo

Canopy puso fin a la recompensa original de los fundadores y la reemplazó por el Zcash Development Fund. El cambio ocurrió en el mismo bloque que la primera reducción a la mitad de Zcash, cuando la recompensa por bloque cayó de 6.25 ZEC a 3.125 ZEC. Así que los mineros vieron su recompensa reducida a la mitad el mismo día en que una nueva porción de esa recompensa más pequeña empezó a fluir hacia el desarrollo.

Se estableció que el fondo duraría cuatro años, desde esta primera reducción a la mitad en noviembre de 2020 hasta la segunda reducción a la mitad en 2024. La política acordada quedó redactada en [ZIP 1014](https://zips.z.cash/zip-1014). El mecanismo de consenso que realmente mueve el dinero es el mecanismo de funding stream: [ZIP 207](https://zips.z.cash/zip-0207) introdujo la forma general de dirigir parte de la subvención por bloque a destinatarios definidos, y [ZIP 214](https://zips.z.cash/zip-0214) estableció las reglas específicas y las direcciones receptoras para el Development Fund.

## Cómo se divide el dinero

El Development Fund toma el 20 por ciento de cada recompensa por bloque. Los mineros conservan el otro 80 por ciento. Ese 20 por ciento luego se divide en tres partes, siguiendo ZIP 1014.

1. 35 por ciento para Bootstrap Project, la organización matriz de Electric Coin Company.
2. 25 por ciento para la Zcash Foundation.
3. 40 por ciento para Major Grants, que financia trabajo independiente y es administrado por la Zcash Foundation. Más tarde, Major Grants pasó a llamarse Zcash Community Grants (ZCG).

Medidas sobre la recompensa por bloque completa en lugar de solo el fondo, esas participaciones equivalen al 7 por ciento para Electric Coin Company, 5 por ciento para la Zcash Foundation y 8 por ciento para Major Grants. Ambas formas de describirlo representan las mismas cifras.

![El Development Fund es el 20 por ciento de cada recompensa por bloque, dividido en 35 por ciento para Bootstrap y Electric Coin Company, 25 por ciento para la Zcash Foundation y 40 por ciento para Major Grants](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-dev-fund-split.png)

## El cambio en el pool Sprout

Canopy también comenzó a retirar el pool blindado más antiguo. Sprout fue el primer pool blindado de Zcash, y Canopy empezó a desactivarlo gradualmente mediante [ZIP 211](https://zips.z.cash/zip-0211).

Desde el momento en que Canopy se activó, no se puede agregar nuevo valor al pool Sprout. En términos técnicos, el campo vpub_old de cada JoinSplit debe ser cero. Los fondos ya existentes en Sprout todavía pueden retirarse, por lo que nadie queda excluido, pero el pool solo puede hacerse más pequeño a partir de aquí. Este es un primer paso hacia la eventual deprecación del pool heredado Sprout en favor de pools blindados más nuevos.

![Antes de Canopy, el valor podía tanto entrar como salir del pool Sprout. Después de Canopy, no puede entrar nuevo valor, pero los retiros siguen estando permitidos](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-sprout-pool.png)

## Los extras técnicos

Junto con los cambios de financiación, Canopy incluyó dos ZIP técnicos más pequeños. [ZIP 212](https://zips.z.cash/zip-0212) cambió la forma en que un destinatario deriva el secreto efímero de Sapling, derivándolo del texto plano de la nota. [ZIP 215](https://zips.z.cash/zip-0215) dejó por escrito reglas explícitas para validar firmas Ed25519, de modo que cada nodo esté de acuerdo exactamente en cuáles firmas cuentan como válidas.

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Recompensa de los fundadores | El modelo de financiación original que pagó el desarrollo temprano de Zcash, programado para terminar en la primera reducción a la mitad |
| Development Fund | La porción del 20 por ciento de cada recompensa por bloque que Canopy dirigió al desarrollo, vigente hasta la segunda reducción a la mitad |
| Recompensa por bloque (subsidio) | Los nuevos ZEC creados y pagados cuando se mina cada bloque |
| Reducción a la mitad | El evento programado en el que la recompensa por bloque se reduce a la mitad |
| Funding stream | El mecanismo de consenso (ZIP 207) que dirige parte de la subvención por bloque a direcciones receptoras definidas |
| Pool Sprout | El pool blindado original de Zcash, al que Canopy dejó de permitir la entrada de nuevo valor |

## Preguntas frecuentes

¿Canopy cambia mis ZEC o mi privacidad? No. Canopy trata sobre cómo se financia el desarrollo, además de algunas reglas técnicas. Tus saldos y tus transacciones blindadas no se ven afectados.

¿Canopy redujo la recompensa por bloque? Canopy se activó en el mismo bloque que la primera reducción a la mitad de Zcash, que redujo la recompensa de 6.25 ZEC a 3.125 ZEC. La reducción a la mitad forma parte de la política monetaria de Zcash. La función de Canopy fue decidir cómo se utiliza una parte de esa recompensa más pequeña.

¿Para qué sirve el Development Fund? Financia a las personas que construyen Zcash. El dinero va a Electric Coin Company (a través de Bootstrap Project), a la Zcash Foundation y a Major Grants, que apoya trabajo independiente.

¿Todavía puedo usar fondos del pool Sprout? Sí. Todavía puedes retirar fondos que ya están en Sprout. Lo que ya no puedes hacer es agregarle nuevo valor después de Canopy.

¿El Development Fund es permanente? No. Se estableció para durar cuatro años, desde la primera reducción a la mitad en noviembre de 2020 hasta la segunda reducción a la mitad en 2024, dando tiempo a la comunidad para ver cómo funciona antes de revisarlo nuevamente.

¿Cómo se relaciona Canopy con NU6 y NU6.1? Canopy estableció la división tripartita de financiación y el mecanismo de funding stream. Las actualizaciones posteriores, incluidas NU6 y NU6.1, revisaron y remodelaron el Development Fund construido sobre esa base.

## Pon a prueba tu comprensión

Canopy se activó exactamente en el mismo bloque que la primera reducción a la mitad de Zcash. ¿Por qué se eligió ese momento, y qué habría pasado con la financiación del desarrollo sin Canopy?

<details>
<summary>Respuesta</summary>

La recompensa original de los fundadores estaba programada para terminar en la primera reducción a la mitad. Sin Canopy, toda la recompensa por bloque más pequeña posterior a la reducción a la mitad habría ido a los mineros, dejando al desarrollo sin financiación a nivel de protocolo. Canopy reemplazó la recompensa de los fundadores por el Development Fund en ese bloque exacto, de modo que la financiación continuó sin interrupción.
</details>

### Recursos

[ZIP 251: Implementación de la actualización de red Canopy](https://zips.z.cash/zip-0251)

[ZIP 1014: Establecimiento de un Dev Fund para ECC, ZF y Major Grants](https://zips.z.cash/zip-1014)

[ZIP 207: Funding Streams](https://zips.z.cash/zip-0207)

[ZIP 214: Reglas de consenso para un Zcash Development Fund](https://zips.z.cash/zip-0214)

[ZIP 211: Deshabilitación de la adición de nuevo valor al pool de valor de la cadena Sprout](https://zips.z.cash/zip-0211)

[Actualización de red Canopy](https://z.cash/upgrade/canopy/)

### Ver también

[Índice de actualizaciones de red de Zcash](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Política monetaria de Zcash](../start-here/zcash-monetary-policy)

[Pools blindados](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Gobernanza de Zcash](../zcash-community/zcash-governance)

---

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Anterior: [Heartwood](../zcash-tech/heartwood) · Siguiente: [NU5](../zcash-tech/nu5)
