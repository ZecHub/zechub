<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Las direcciones blindadas te permiten realizar transacciones revelando lo menos posible en la blockchain de Zcash. Entonces, ¿qué pasa cuando *sí* necesitas mostrarle a una parte específica lo que tienes o lo que enviaste? Cada dirección blindada tiene una viewing key que concede acceso de lectura sin otorgar la capacidad de gastar. Las viewing keys se introdujeron en [ZIP 310](https://zips.z.cash/zip-0310) y se añadieron al protocolo en la actualización de red Sapling.

Una viewing key es la herramienta para la divulgación selectiva: tú eliges quién ve qué, y nunca entregas autoridad de gasto para hacerlo.

## ¿Por qué usar una viewing key?

Los escritos de Electric Coin Company sobre el tema exponen las situaciones que aparecen con más frecuencia, y siguen siendo las más comunes hoy:

- **Un exchange vigilando depósitos.** El exchange carga una incoming viewing key en un nodo de detección expuesto a internet para poder notar los depósitos de clientes hacia una dirección blindada, mientras que la clave de gasto permanece en hardware que nunca toca la red.
- **Un custodio demostrando sus tenencias.** El custodio entrega a un auditor una full viewing key para cada dirección blindada. El auditor puede verificar esos saldos y revisar la actividad pasada hacia y desde esas direcciones, y no puede hacer nada más.
- **Debida diligencia sobre una contraparte.** Cuando un exchange necesita revisar el historial blindado de un cliente como parte de una debida diligencia reforzada, puede pedir la viewing key en lugar de pedir los fondos.

## Lo que una viewing key revela y lo que no revela

Hay más de un tipo de clave, y la diferencia determina cuánto revelas.

| Clave | Prefijo | Concede |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Ve las transacciones entrantes **y** salientes de todos los pools de la cuenta |
| Unified incoming viewing key (UIVK) | `uivk…` | Ve solo las transacciones entrantes, para todos los pools de la cuenta |
| Sapling extended full viewing key | `zxviews…` | Ve la actividad entrante y saliente de Sapling para las direcciones de la clave |

Ninguna de estas puede gastar. Todas son permanentes en el sentido que importa: una clave que ya has entregado no puede retirarse, solo dejarse atrás, moviendo los fondos a una cuenta cuyas claves la otra parte no tenga.

Vale la pena conocer dos trampas de divulgación antes de compartir nada.

**Entrante no significa limitado.** Una unified incoming viewing key se aplica a toda la cuenta, no a la única dirección sobre la que te preguntaron. Exportar una UIVK para una sola dirección Sapling sigue otorgando visibilidad entrante en todos los pools de esa cuenta, así que revela más que la dirección que nombra. El [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) lo dice explícitamente.

**Una dirección publicada ya expone su incoming viewing key a un adversario futuro.** [ZIP 326](https://zips.z.cash/zip-0326) señala que un adversario con una computadora cuántica podría recuperar la incoming viewing key a partir de una dirección diversificada publicada, algo factible de una manera en que recuperar la nullifier key no lo es. Publicar una dirección no es lo mismo que publicar una viewing key hoy, pero ambas quedan más cerca entre sí en un horizonte lo suficientemente largo.

## Viewing keys después de Ironwood

NU6.3 introdujo el pool blindado Ironwood e hizo que el pool Orchard fuera solo de gasto, por lo que los fondos migran de uno al otro con el tiempo. Consulta [Ironwood](/zcash-tech/ironwood) y [The turnstile](/zcash-tech/the-turnstile) para la actualización en sí.

**Una viewing key emitida antes de Ironwood sigue funcionando después de la migración.** ZIP 326 especifica que un receptor, y su correspondiente incoming viewing key, se aplica al *protocolo* Orchard más que a un pool: la misma incoming viewing key hace trial-decrypt tanto de los ciphertexts de notas del pool Orchard como de los del pool Ironwood. Zallet lo implementa de esa forma, describiendo las notas de Ironwood como con forma de Orchard y sometidas a trial-decrypt con las Orchard viewing keys de la cuenta bajo el dominio de note-encryption de Ironwood.

Tres consecuencias para cualquiera que posea o emita una clave:

1. **Los saldos se mueven entre pools, y quien observa lo ve suceder.** [ZIP 318](https://zips.z.cash/zip-0318) especifica la migración como una serie de pequeñas transacciones Orchard-a-Ironwood, deliberadamente uniformes, transmitidas según un calendario aleatorizado, cada una gastando una nota de Orchard y produciendo una salida de Ironwood de una denominación canónica. Un auditor que observa con una viewing key ve cómo las tenencias pasan de un pool al otro por etapas durante semanas, no en un solo movimiento. Una wallet puede reconstruir su propio progreso de migración a partir de los datos de la cadena usando sus viewing keys.
2. **Cada paso de la migración revela el valor que mueve.** Eso es inherente a cruzar un turnstile, y es lo que hace que la migración sea auditable. Dividir el saldo en denominaciones canónicas significa que ninguna transacción individual revela el saldo completo del pool Orchard.
3. **Las cuentas creadas después de Ironwood pueden derivar sus claves de forma distinta.** [ZIP 2005](https://zips.z.cash/zip-2005) añade un indicador `use_qsk` para claves recuperables cuánticamente, y cambia cómo se derivan las claves entrantes, salientes y diversifier, por lo que las claves `use_qsk = true` son realmente claves diferentes. ZIP 326 exige que el indicador sea uniforme en toda una cuenta y prohíbe generar claves `use_qsk = true` antes de que NU6.3 se activara en Mainnet. Por lo tanto, una clave exportada de una cuenta que existía antes de Ironwood es una clave `use_qsk = false`, y sigue siendo correcta para esa cuenta. No asumas que una clave exportada de una cuenta describe otra.

## Exportar una viewing key

### Zallet

[Zallet](https://github.com/zcash/zallet) es la wallet de nodo completo que reemplazó a la wallet dentro de zcashd. La exportación e importación de viewing keys llegaron en la **v0.1.0-beta.2 (28 de julio de 2026)**, así que primero revisa tu versión; las compilaciones anteriores no tienen estos métodos. Todos los argumentos después del nombre del método deben ser JSON válido, lo que significa que los valores de cadena conservan sus propias comillas dobles. La [Guía de referencia rápida de Zallet](/using-zcash/zallet-quick-reference-guide) cubre el estilo general de los comandos.

Lista lo que contiene la wallet:

```bash
zallet rpc listaddresses
```

Exporta la unified full viewing key de la cuenta pasando una unified address:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Exporta en su lugar la unified incoming viewing key de la cuenta, usando el argumento opcional `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Pasar una dirección Sapling devuelve la Sapling extended full viewing key de esa cuenta (`zxviews…`), coincidiendo con el comportamiento antiguo de zcashd. Dos limitaciones documentadas: las direcciones Sprout se rechazan, y una Sapling extended full viewing key no puede exportarse desde una cuenta que fue importada como solo lectura, porque la wallet no puede reconstruirla. La forma `ivk` sí funciona para cuentas solo lectura importadas.

### Wallets que exportan viewing keys desde su propia interfaz

La página de [Wallets](/using-zcash/wallets) sigue la compatibilidad con viewing keys y la preparación para Ironwood de cada wallet. Al momento de escribir esto, las wallets que muestran compatibilidad con viewing keys y **Ironwood: Ready** incluyen ZODL, Zingo!, Zkool, Cake, Zallet, Zecd y Nozy. Revisa esa página en lugar de esta antes de depender de una sola wallet, porque la preparación cambia.

## Importar una viewing key como cuenta watch-only

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) es la opción más flexible aquí, porque acepta claves unificadas además de las heredadas. Su README documenta cuentas solo lectura creadas a partir de una **unified viewing key** o una **Sapling extended viewing key**, junto con claves extendidas blindadas heredadas exportadas desde zcashd. Añade una cuenta nueva, elige la ruta de solo lectura y pega la clave `uview…` o `zxviews…`; la cuenta entonces se sincroniza e informa saldos e historial sin autoridad de gasto.

La compatibilidad con el protocolo Ironwood y la migración de Orchard a Ironwood llegaron en Zkool 6.24.0 (20 de julio de 2026), y 6.26.1 (2 de agosto de 2026) corrigió la detección de transacciones de Ironwood en la mempool. Usa 6.26.1 o posterior.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

El segundo argumento es la política de rescaneo: `"whenkeyisnew"` (la predeterminada), `"yes"` o `"no"`. El tercero es la altura de bloque desde la que se volverá a escanear. Zallet importa la clave como una cuenta solo lectura y rastrea las transacciones entrantes y salientes de sus direcciones sin autoridad de gasto.

**Zallet importa únicamente Sapling extended full viewing keys.** No importará una unified full viewing key `uview…`, aunque sí puede exportarla. Para entregar acceso de lectura a toda una cuenta unificada, exporta la UFVK desde Zallet e impórtala en una wallet que acepte claves unificadas, como Zkool.

## Qué cambió y qué debes dejar de buscar

Si seguiste una versión anterior de esta página, o una traducción de ella, hay tres rutas que ya no funcionan.

- **`zcash-cli z_exportviewingkey` y `z_importviewingkey`.** zcashd alcanzó su detención por fin de soporte el 18 de julio de 2026 y ya no se ejecuta. Los métodos con el mismo nombre en Zallet son el reemplazo; consulta la [guía de migración](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **El tutorial de Ywallet.** La página de Wallets marca Ywallet como **Ironwood: Not Ready**, así que no es la wallet a la que conviene dirigir a la gente para viewing keys de la era Ironwood. Zkool, del mismo desarrollador, acepta la misma gama de claves y está marcada como Ready.
- **zcashblockexplorer.com/vk.** El servicio devuelve HTTP 503 con un certificado no válido, y se eliminó en lugar de reemplazarse. Pegar una viewing key en un sitio web entrega todo tu historial de transacciones a quien opere ese sitio web, lo cual siempre fue la opción más débil de las tres en la página antigua. En su lugar, importa la clave en una wallet que ejecutes tú.

## Recursos

Usa viewing keys según sea necesario, y prefiere la clave más limitada que responda a la pregunta que se está haciendo.

- [ZIP 326: Consequences for Wallets de NU6.3](https://zips.z.cash/zip-0326) — cómo se comportan las viewing keys entre los pools Orchard e Ironwood
- [ZIP 229: Formato de transacción versión 6](https://zips.z.cash/zip-0229) — define los pools Orchard e Ironwood
- [Registro de cambios de Zallet](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — qué versión añadió qué método RPC
- [README de Zkool](https://github.com/hhanh00/zkool2/blob/main/README.md) — tipos de cuenta y de claves compatibles
- [ECC, Explicación de las Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgación selectiva y Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Presentación en video sobre la Viewing Key de Zcash](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
