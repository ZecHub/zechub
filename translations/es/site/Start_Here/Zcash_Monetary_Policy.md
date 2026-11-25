<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Zcash_Monetary_Policy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Política monetaria de Zcash

## En resumen

* Zcash tiene un suministro fijo de 21 millones de ZEC, el mismo límite que Bitcoin.
* Desde que NU7 se activó el 6 de noviembre de 2026, se genera un bloque aproximadamente cada 25 segundos y se crean 0,52083333 ZEC.
* Esto suma unos 1.800 nuevos ZEC al día, la misma cantidad diaria que antes de NU7.
* La recompensa de cada bloque se reparte así: el 80 % para el minero, el 8 % para Zcash Community Grants y el 12 % para la lockbox.
* La recompensa por bloque se reduce a la mitad aproximadamente cada cuatro años. Se espera que el próximo halving ocurra hacia finales de noviembre de 2028.

## Explicación principal

### ¿Cuál es la economía de Zcash?

La base monetaria de Zcash es igual al suministro fijo de Bitcoin: 21 millones de unidades monetarias de ZEC. En promedio, cada 25 segundos (antes, cada 75 segundos, hasta que se activó NU7 el 6 de noviembre de 2026) se mina un nuevo [bloque](https://zcash.readthedocs.io/en/latest/rtd_pages/glossary.html#:~:text=Block,mempool%20in%20an%20unconfirmed%20state.) en la blockchain de Zcash y entra en circulación una recompensa por bloque de 0,52083333 ZEC. Antes de NU7, la recompensa era de 1,5625 ZEC por bloque; [ZIP 218](https://zips.z.cash/zip-0218) la dividió entre 3, al igual que el tiempo entre bloques, por lo que la cantidad de nuevos ZEC al día no cambió. Desde NU7, los 0,52083333 ZEC se reparten así: el 80 % para el minero (0,41666668 ZEC, más las comisiones de transacción), el 8 % para Zcash Community Grants (0,04166666 ZEC) y el 12 % para la lockbox (0,06249999 ZEC), según [ZIP 1015](https://zips.z.cash/zip-1015).

La recompensa por bloque se reduce a la mitad aproximadamente cada cuatro años, hasta que los 21 millones de ZEC estén en circulación. La inflación de Zcash imita casi exactamente la de Bitcoin. Es importante tener en cuenta que, a medida que se crean nuevas monedas, la inflación disminuye y, en cada halving, la tasa cae de forma significativa.

## Analogía / Cómo se ve

Imagina un dispensador de monedas frente a una bóveda sellada. La bóveda contiene 21 millones de ZEC en total y nadie puede añadirle ni una sola moneda.

Cada 25 segundos, el dispensador suelta un puñado de monedas nuevas: 0,52083333 ZEC. El minero que encontró el bloque se queda con el 80 % del puñado. Zcash Community Grants recibe el 8 %. El 12 % restante va a la lockbox.

Aproximadamente cada cuatro años, el puñado se reduce a la mitad. Eso es el halving.

NU7 hizo que los puñados llegaran tres veces más seguido y que cada uno fuera tres veces más pequeño. La cantidad de monedas nuevas al día se mantuvo igual.

## Análisis detallado

### Nuevos ZEC al día, periodo por periodo

Los halvings reducen la recompensa por bloque. Los bloques más rápidos (Blossom en 2019 y NU7 en 2026) también reducen la recompensa por bloque y el tiempo entre bloques, por lo que la cantidad diaria se mantiene igual.

| Periodo | Tiempo entre bloques | Recompensa por bloque | Nuevos ZEC al día |
|:--|:--|:--|:--|
| Periodo inicial, de 2016 a 2019 | 150 segundos | 12,5 ZEC | 7.200 |
| [Blossom](/zcash-tech/blossom), de diciembre de 2019 a noviembre de 2020 | 75 segundos | 6,25 ZEC | 7.200 |
| Primer halving ([Canopy](/zcash-tech/canopy)), de noviembre de 2020 a noviembre de 2024 | 75 segundos | 3,125 ZEC | 3.600 |
| Segundo halving ([NU6](/zcash-tech/nu6)), de noviembre de 2024 a noviembre de 2026 | 75 segundos | 1,5625 ZEC | 1.800 |
| [NU7](/zcash-tech/nu7), de noviembre de 2026 a finales de 2028 | 25 segundos | 0,52083333 ZEC | 1.800 |
| Tercer halving, previsto para finales de noviembre de 2028 | 25 segundos | La mitad de la recompensa actual | Unos 900 |

Cada cifra diaria se calcula multiplicando la recompensa por bloque por el número de bloques de un día (86.400 segundos divididos por el tiempo entre bloques). El tiempo real entre bloques varía ligeramente, por lo que la emisión diaria efectiva fluctúa un poco alrededor de estas cifras.

### Cuándo ocurrirá el próximo halving

NU7 hizo que los bloques se generaran tres veces más seguido, por lo que cambió el número de bloque en que ocurrirá el próximo halving. Está previsto para el bloque 6.132.390, hacia finales de noviembre de 2028 ([ZIP 259](https://zips.z.cash/zip-0259)). Los artículos más antiguos indican el bloque 4.406.400. Esa cifra era correcta antes de NU7.

### Comisiones y mecanismo de sostenibilidad de la red

Desde NU7, el 60 % de las comisiones de transacción de cada bloque se retira de la circulación y se guarda en una reserva pública. A partir del bloque 8.939.664, previsto para alrededor de febrero de 2031, cada bloque distribuirá a los mineros una parte fija de esa reserva, además de la recompensa normal por bloque. El límite de 21 millones no cambia. La página [Mecanismo de sostenibilidad de la red](/zcash-tech/network-sustainability-mechanism) explica cómo funciona.

## Páginas relacionadas

- [NU7](/zcash-tech/nu7): la actualización que introdujo bloques de 25 segundos y la recompensa actual por bloque.
- [Mecanismo de sostenibilidad de la red](/zcash-tech/network-sustainability-mechanism): adónde va el 60 % de las comisiones de cada bloque y cuándo vuelve a circular.
- [Fondo de desarrollo](/start-here/development-fund): la historia de la parte de la recompensa por bloque destinada al desarrollo.
- [Actualizaciones de red](/start-here/network-upgrades): todas las actualizaciones de Zcash, con sus fechas y alturas de bloque.
- [Zcash Community Grants](/zcash-organizations/zcash-community-grants): la organización que recibe el 8 %.
- [Pools de minado de Zcash](/using-zcash/zcash-mining-pools): donde la mayoría de los mineros obtienen su parte de la recompensa por bloque.

### Recursos

[¿Cuál es la economía de Zcash?](https://z.cash/support/faq/#:~:text=Zcash's%20monetary%20base%20is%20the,3.125%20ZEC%20comes%20into%20circulation.)

[ZIP 218: intervalo objetivo de 25 segundos entre bloques](https://zips.z.cash/zip-0218)

[ZIP 259: implementación de la actualización de red de NU7](https://zips.z.cash/zip-0259)

[ZIP 1015](https://zips.z.cash/zip-1015)

**Última actualización:** noviembre de 2026
