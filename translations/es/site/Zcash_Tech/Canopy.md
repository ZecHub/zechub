<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopy se activó en la red principal de Zcash en el bloque 1,046,400 (18 de noviembre de 2020 UTC).

Lo que aprenderás: cómo Zcash siguió financiando su propio desarrollo después de que terminara la recompensa de los fundadores, y cómo Canopy estableció la división de financiación sobre la que aún se basan las actualizaciones posteriores.

Canopy es la quinta actualización de red [network upgrade] de Zcash, también denominada Actualización de Red 4 (NU4). Se implementa mediante [ZIP 251](https://zips.z.cash/zip-0251) y se activó en el bloque 1,046,400 de la red principal el 18 de noviembre de 2020 (UTC), en el mismo momento que el primer halving de recompensa por bloque de Zcash. Canopy fue principalmente una actualización de gobernanza [governance] y monetaria. Finalizó la recompensa original de los fundadores e inició el nuevo Fondo de Desarrollo de Zcash, que paga a Electric Coin Company, Zcash Foundation y a beneficiarios de subvenciones [grants] independientes. La política detrás de ese fondo surgió de un extenso proceso de gobernanza comunitaria en 2019.

Por qué importa esto. Zcash financia su propio desarrollo con recompensas por bloque, porque no tiene una empresa detrás. La recompensa de los fundadores que financió sus primeros años estaba prevista para terminar en el primer halving. Canopy fue el reemplazo: dirigió una parte fija de cada recompensa por bloque a un Fondo de Desarrollo y estableció quién la recibe. Ese modelo fue perfeccionado por actualizaciones posteriores, hasta [NU6.1](../zcash-tech/nu6-1).

![Before Canopy the founders reward funded development and was set to end at the first halving. After Canopy the Development Fund takes 20 percent of each block reward and runs to the second halving in 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## El fondo de desarrollo

Canopy finalizó la recompensa original de los fundadores y la reemplazó con el Fondo de Desarrollo de Zcash. El cambio se produjo en el mismo bloque que el primer halving de Zcash, cuando la recompensa por bloque cayó de 6,25 ZEC a 3,125 ZEC. Así que los mineros vieron reducida su recompensa a la mitad el mismo día en que una nueva porción de esa recompensa menor comenzó a destinarse al desarrollo.

El fondo se estableció para funcionar durante cuatro años, desde este primer halving en noviembre de 2020 hasta el segundo halving en 2024. La política acordada se redactó como [ZIP 1014](https://zips.z.cash/zip-1014). El mecanismo de consenso que realmente mueve el dinero es el mecanismo de flujo de financiación: [ZIP 207](https://zips.z.cash/zip-0207) introdujo la forma general de dirigir parte de la subvención por bloque a destinatarios definidos, y [ZIP 214](https://zips.z.cash/zip-0214) estableció las reglas específicas y las direcciones de los destinatarios para el Fondo de Desarrollo.

## Cómo se divide el dinero

El Fondo de Desarrollo recibe el 20 por ciento de cada recompensa por bloque. Los mineros conservan el otro 80 por ciento. Ese 20 por ciento se divide después de tres maneras, siguiendo ZIP 1014.

1. 35 por ciento para el Proyecto Bootstrap, la organización matriz de Electric Coin Company.
2. 25 por ciento para Zcash Foundation.
3. 40 por ciento para Subvenciones Mayores, que financia trabajo independiente y es administrado por Zcash Foundation. Las Subvenciones Mayores posteriormente se convirtieron en Zcash Community Grants (ZCG).

Medidas respecto de la recompensa por bloque completa en lugar de solo el fondo, esas participaciones equivalen al 7 por ciento para Electric Coin Company, el 5 por ciento para Zcash Foundation y el 8 por ciento para las Subvenciones Mayores. Ambas formas de describirlo representan los mismos números.

![The Development Fund is 20 percent of each block reward, split 35 percent to Bootstrap and the Electric Coin Company, 25 percent to the Zcash Foundation, and 40 percent to Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## El cambio del pool de Sprout

Canopy también comenzó a retirar el pool blindado [shielded pool] más antiguo. Sprout fue el primer pool blindado de Zcash, y Canopy comenzó a reducirlo mediante [ZIP 211](https://zips.z.cash/zip-0211).

Desde el momento en que se activó Canopy, no se puede añadir ningún valor nuevo al pool de Sprout. En términos técnicos, el campo vpub_old de cada JoinSplit debe ser cero. Los fondos que ya están en Sprout todavía se pueden retirar, por lo que nadie queda excluido, pero el pool solo puede reducirse a partir de aquí. Este es un primer paso para finalmente dejar obsoleto el pool heredado de Sprout en favor de pools blindados más nuevos.

![Before Canopy, value could both enter and leave the Sprout pool. After Canopy, no new value can enter but withdrawals are still allowed](/content-images/canopy-sprout-pool-f5166aa049.webp)

## Los complementos técnicos

Junto con los cambios de financiación, Canopy incluyó dos ZIP técnicos menores. [ZIP 212](https://zips.z.cash/zip-0212) cambió cómo un destinatario deriva el secreto efímero de Sapling, derivándolo del texto plano de la nota [note]. [ZIP 215](https://zips.z.cash/zip-0215) documentó reglas explícitas para validar firmas [signatures] Ed25519, de modo que cada nodo acuerde exactamente qué firmas se consideran válidas.

## TL;DR

- Canopy (NU4) se activó en el bloque 1.046.400 de la mainnet (18 de noviembre de 2020 UTC), el mismo bloque del primer halving de Zcash, que redujo la recompensa por bloque de 6,25 a 3,125 ZEC.
- Retiró la recompensa de los fundadores (founders reward) y creó el Fondo de Desarrollo (Development Fund) de Zcash: el 20% de cada recompensa por bloque durante cuatro años, hasta el segundo halving en 2024 (política del ZIP 1014; mecanismo de los ZIP 207/214).
- El 20% del fondo se reparte así: 35% para Bootstrap (Electric Coin Company), 25% para la Zcash Foundation y 40% para las Major Grants, conocidas más tarde como Zcash Community Grants.
- Cerró el pool Sprout a nuevo valor (ZIP 211): no pueden entrar nuevos depósitos, pero los retiros siguen funcionando.
- Lo acompañaron dos ZIP técnicos: el ZIP 212 (secreto efímero de Sapling derivado del texto plano de la nota) y el ZIP 215 (reglas explícitas de validación de Ed25519).

## Explicación principal

Zcash financia su propio desarrollo con las recompensas de bloque porque no hay ninguna empresa que lo respalde. La recompensa de los fundadores cubrió los primeros años y estaba previsto que terminara con el primer halving, así que hacía falta un sustituto antes de esa fecha límite. Canopy fue ese sustituto: ZIP 207 introdujo el mecanismo general de flujos de financiación, que destina parte del subsidio de bloque a direcciones receptoras definidas, y ZIP 214 estableció las reglas y direcciones concretas del Fondo de Desarrollo. Medidas sobre la recompensa total y no solo sobre el fondo, las participaciones son 7% ECC, 5% Zcash Foundation y 8% Major Grants: las mismas cifras descritas de dos maneras.

Canopy también comenzó a retirar Sprout, el pool blindado [shielded pool] más antiguo de Zcash: desde su activación, el campo vpub_old de cada JoinSplit debe ser cero, por lo que el valor puede salir de Sprout pero nunca volver a entrar.

## Analogía visual

Canopy es el momento en que termina la fase de salario de los fundadores de una startup y entra en vigor una constitución: a partir de ese bloque, 20 centavos de cada dólar que la red emite se destinan al mantenimiento y se reparten en proporción 35/25/40 entre tres departamentos. Al mismo tiempo, el almacén heredado (Sprout) queda sellado para nuevos depósitos: cualquiera puede seguir retirando sus mercancías, pero no entra nada nuevo.

## Análisis en profundidad

El flujo de financiación se aplica por consenso, no por confianza: los nodos rechazan los bloques cuya coinbase no paga a los destinatarios definidos sus partes definidas. Canopy se activó deliberadamente en el bloque del halving, de modo que los mineros vieron cómo la recompensa se reducía a la mitad en el mismo momento en que una nueva porción de esa recompensa menor empezaba a destinarse al desarrollo. ZIP 212 cambió la forma en que se deriva el secreto efímero de Sapling (a partir del texto plano de la nota), y ZIP 215 estableció reglas explícitas de aceptación de Ed25519 para que todos los nodos validen las firmas de forma idéntica: pequeños cambios que eliminaron clases enteras de ambigüedad en el consenso.

## Errores comunes

- **Pensar que Canopy es el halving en sí.** Compartieron el mismo bloque de activación, pero son cambios distintos: ZIP 251 (Canopy) frente al calendario de emisión.
- **Interpretar el 20% como una parte tomada de la nueva participación de los mineros.** Los mineros conservaron el 80%; el fondo recibe el 20% de la recompensa de bloque.
- **Suponer que los fondos de Sprout fueron congelados o destruidos.** Los retiros siguen siendo posibles; solo se detuvieron los nuevos depósitos.
- **Tratar «35/25/40 del fondo» y «7/5/8 de la recompensa» como repartos diferentes.** Son las mismas cifras medidas sobre bases distintas.
- **Llamar a Canopy una actualización criptográfica.** Fue principalmente una cuestión de gobernanza (governance) y política monetaria; los ZIP técnicos fueron ajustes menores.

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Founders reward | El modelo de financiación original que pagó el desarrollo inicial de Zcash, programado para terminar en el primer halving |
| Development Fund | La participación del 20 por ciento de cada recompensa por bloque que Canopy dirigió al desarrollo, vigente hasta el segundo halving |
| Block reward (subsidy) | El nuevo ZEC creado y distribuido a medida que se mina cada bloque |
| Halving | El evento programado en el que la recompensa por bloque se reduce a la mitad |
| Funding stream | El mecanismo de consenso (ZIP 207) que dirige parte de la subvención por bloque a direcciones de destinatarios definidas |
| Sprout pool | El pool blindado original de Zcash, al que Canopy dejó de aceptar valor nuevo |

## Preguntas frecuentes

¿Canopy cambia mi ZEC o mi privacidad? No. Canopy trata sobre cómo se financia el desarrollo, además de algunas reglas técnicas. Tus saldos y tus transacciones blindadas no se ven afectados.

¿Canopy redujo la recompensa por bloque? Canopy se activó en el mismo bloque que el primer halving de Zcash, que redujo la recompensa de 6,25 ZEC a 3,125 ZEC. El halving es parte de la política monetaria de Zcash. La función de Canopy fue decidir cómo se utiliza una parte de esa recompensa menor.

¿Para qué sirve el Fondo de Desarrollo? Financia a las personas que construyen Zcash. El dinero va a Electric Coin Company (a través del Proyecto Bootstrap), Zcash Foundation y las Subvenciones Mayores, que respaldan trabajo independiente.

¿Todavía puedo usar fondos en el pool de Sprout? Sí. Todavía puedes retirar fondos que ya estén en Sprout. Simplemente no puedes añadirle valor nuevo después de Canopy.

¿Es permanente el Fondo de Desarrollo? No. Se estableció para funcionar durante cuatro años, desde el primer halving en noviembre de 2020 hasta el segundo halving en 2024, dando a la comunidad tiempo para ver cómo funciona antes de revisarlo.

¿Cómo se relaciona Canopy con NU6 y NU6.1? Canopy estableció la división de financiación en tres partes y el mecanismo de flujo de financiación. Las actualizaciones posteriores, incluidas NU6 y NU6.1, revisaron y reformaron el Fondo de Desarrollo construido sobre esa base.

## Pon a prueba tu comprensión

Canopy se activó exactamente en el mismo bloque que el primer halving de Zcash. ¿Por qué se eligió ese momento y qué habría ocurrido con la financiación del desarrollo sin Canopy?

<details>
<summary>Respuesta</summary>

La recompensa original de los fundadores estaba programada para terminar en el primer halving. Sin Canopy, toda la menor recompensa por bloque posterior al halving habría ido a los mineros, sin dejar financiación a nivel de protocolo para el desarrollo. Canopy reemplazó la recompensa de los fundadores con el Fondo de Desarrollo en ese bloque exacto, por lo que la financiación continuó sin interrupción.
</details>

### Recursos

[ZIP 251: Implementación de la actualización de red de Canopy](https://zips.z.cash/zip-0251)

[ZIP 1014: Establecimiento de un Fondo de Desarrollo para ECC, ZF y Subvenciones Mayores](https://zips.z.cash/zip-1014)

[ZIP 207: Flujos de financiación](https://zips.z.cash/zip-0207)

[ZIP 214: Reglas de consenso para un Fondo de Desarrollo de Zcash](https://zips.z.cash/zip-0214)

[ZIP 211: Desactivación de la adición de valor nuevo al pool de valor de cadena de Sprout](https://zips.z.cash/zip-0211)

[Canopy Actualización de red](https://z.cash/upgrade/canopy/)

### Véase también

[Zcash Actualizaciones de red](../start-here/network-upgrades)

[Fondo de Desarrollo](../start-here/development-fund)

[Zcash Política monetaria](../start-here/zcash-monetary-policy)

[Pools blindados](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash Gobernanza](../zcash-community/zcash-governance)

---

## Páginas relacionadas

- [Sprout](./Sprout.md) — el pool Canopy cerrado a nuevos depósitos
- [Heartwood](./Heartwood.md) — la actualización anterior de la serie
- [NU5](./NU5.md) — la siguiente actualización, que lanzó Orchard
- [NU6.1](./NU6_1.md) — el ajuste más reciente de la financiación del desarrollo

Serie: [Índice de actualizaciones de red](../start-here/network-upgrades) · Anterior: [Heartwood](../zcash-tech/heartwood) · Siguiente: [NU5](../zcash-tech/nu5)
