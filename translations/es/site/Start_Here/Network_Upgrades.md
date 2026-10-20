# Zcash Actualizaciones de red

Zcash mejora mediante actualizaciones de red: cambios coordinados en las reglas con las que cada nodo está de acuerdo, cada una activada a una altura de bloque determinada. Cada actualización a continuación tiene su propia página que explica, en lenguaje sencillo, qué cambió y por qué. ¿Eres nuevo en Zcash? Léelas en orden, de Sprout a Ironwood.

Para conocer la historia visual de cómo ha evolucionado la privacidad de Zcash a través de estas actualizaciones, consulta [La evolución de la privacidad](https://zechub.wiki/zcash-evolution). Esta página es el índice. Esa es la cronología.

| Actualización | Activación (UTC) | Bloque | ID de rama | Qué cambió |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 de octubre de 2016 | génesis | 00000000 | El lanzamiento: el primer pool protegido y las transacciones privadas de zk-SNARK |
| [Overwinter](../zcash-tech/overwinter) | 26 de junio de 2018 | 347,500 | 5ba81b19 | Protección contra repeticiones, versionado y vencimiento de transacciones, para que fueran posibles actualizaciones seguras |
| [Sapling](../zcash-tech/sapling) | 29 de octubre de 2018 | 419,200 | 76b809bb | Transacciones protegidas eficientes, lo suficientemente rápidas para teléfonos y wallets de hardware |
| [Blossom](../zcash-tech/blossom) | 11 de diciembre de 2019 | 653,600 | 2bb40e60 | Bloques más rápidos, de unos 75 segundos, y mayor rendimiento |
| [Heartwood](../zcash-tech/heartwood) | 16 de julio de 2020 | 903,000 | f5b9230b | Recompensas de minería protegidas y clientes más ligeros (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 de noviembre de 2020 | 1,046,400 | e9ff75a6 | El Fondo de Desarrollo, la primera reducción a la mitad y la eliminación gradual del pool Sprout |
| [NU5](../zcash-tech/nu5) | 31 de mayo de 2022 | 1,687,104 | c2d6d0b4 | El pool Orchard en Halo 2 (sin configuración de confianza), direcciones unificadas y transacciones v5 |
| [NU6](../zcash-tech/nu6) | 23 de noviembre de 2024 | 2,726,400 | c8e71055 | La caja de seguridad diferida del Fondo de Desarrollo y una nueva distribución de la financiación para el desarrollo |
| [NU6.1](../zcash-tech/nu6-1) | 24 de noviembre de 2025 | 3,146,400 | 4dec4df0 | Gobernanza comunitaria y de los tenedores de monedas sobre esa financiación |
| [NU6.2](../zcash-tech/nu6-2) | 3 de junio de 2026 | 3,364,600 | 5437f330 | Una corrección de emergencia que corrigió el circuito Orchard |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 de julio de 2026 | 3,428,143 | 37a5165b | El pool Ironwood y un torniquete público que permite a cualquiera auditar el suministro |
| **NU7** (próximamente) | Testnet: 4 de octubre de 2026; Mainnet: previsto para el 5 de noviembre de 2026 | Testnet: 4,465,026; Mainnet: por determinar (se establece el 20 de octubre) | 77190ad9 | Bloques de 25 segundos (ZIP 218), reciclaje de comisiones NSM (ZIP 235+237), retirada de Sprout (ZIP 2003) |

Las fechas se muestran en UTC. Algunos paneles las muestran en hora local, que corresponde al mismo bloque y al mismo momento. El desencadenante fijo de cada actualización es la altura de su bloque de activación, no la fecha del calendario.

### Estado de NU7

NU7 está activo en Testnet público a la altura **4,465,026** (activado el 4 de octubre de 2026). La altura de activación de Mainnet se elegirá el **20 de octubre de 2026**; el objetivo actual es el **5 de noviembre de 2026**.

Alcance (ZIP 259):

- **Bloques de 25 segundos** (ZIP 218) — primera confirmación ~3× más rápida; la emisión diaria de ZEC no cambia.
- **Mecanismo de Sostenibilidad de la Red** (ZIP 235 + ZIP 237) — el 60 % de las comisiones de transacción se retira de la circulación y se deposita en una reserva, que se reemitirá a los mineros siguiendo un calendario que preserva las reducciones a la mitad a partir de ~febrero de 2031.
- Retirada de **Sprout** (ZIP 2003) — las transacciones de versión 4 pasan a ser inválidas; los fondos restantes de Sprout pasan a ser imposibles de gastar.
- Límites de acciones protegidas y una ventana más amplia para el promedio de dificultad (17 → 102 bloques).

No se introduce ningún formato nuevo de transacción. ID de rama de consenso: `0x77190ad9`.

Consulta la cronología de [La evolución de la privacidad](https://zechub.wiki/zcash-evolution) y [ZIP 259](https://zips.z.cash/zip-0259) para obtener todos los detalles. Cronología del foro: [Cronología de NU7](https://forum.zcashcommunity.com/t/nu7-timeline/57655)
