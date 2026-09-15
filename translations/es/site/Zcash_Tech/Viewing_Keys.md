<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Las direcciones blindadas te permiten realizar transacciones revelando lo menos posible en la blockchain de Zcash. Pero ¿qué sucede cuando *sí* necesitas mostrar a una parte específica lo que posees o lo que enviaste? Cada dirección blindada tiene una viewing key que concede acceso de lectura sin otorgar la capacidad de gastar. Las viewing keys se introdujeron en [ZIP 310](https://zips.z.cash/zip-0310) y se añadieron al protocolo en la actualización de red Sapling.

Una viewing key es la herramienta para la divulgación selectiva: eliges quién ve qué y nunca entregas autoridad para gastar al hacerlo.

## ¿Por qué usar una viewing key?

Los escritos de Electric Coin Company sobre el tema exponen las situaciones que se presentan con más frecuencia, y siguen siendo las habituales hoy en día:

- **Un exchange que vigila depósitos.** El exchange carga una incoming viewing key en un nodo de detección expuesto a Internet para poder detectar depósitos de clientes a una dirección blindada, mientras la spending key permanece en hardware que nunca se conecta a la red.
- **Un custodio que demuestra sus tenencias.** El custodio entrega a un auditor una full viewing key para cada dirección blindada. El auditor puede comprobar esos saldos y revisar la actividad pasada desde y hacia esas direcciones, y no puede hacer nada más.
- **Debida diligencia sobre una contraparte.** Cuando un exchange necesita revisar el historial blindado de un cliente como parte de una debida diligencia reforzada, puede solicitar la viewing key en lugar de los fondos.

## Qué revela y qué no revela una viewing key

Hay más de un tipo de clave, y la diferencia determina cuánto revelas.

| Clave | Prefijo | Concede |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Ve transacciones entrantes **y** salientes para cada pool de la cuenta |
| Unified incoming viewing key (UIVK) | `uivk…` | Ve únicamente transacciones entrantes, para cada pool de la cuenta |
| Sapling extended full viewing key | `zxviews…` | Ve actividad entrante y saliente de Sapling para las direcciones de la clave |

Ninguna de estas puede gastar. Todas son permanentes en el sentido importante: una clave que has entregado no puede revocarse; solo puede quedar obsoleta al mover fondos a una cuenta cuyas claves no posee la otra parte.

Hay dos trampas de divulgación que conviene conocer antes de compartir nada.

**Entrante no significa limitado.** Una unified incoming viewing key tiene alcance sobre toda la cuenta, no solo sobre la dirección por la que te preguntaron. Exportar una UIVK para una sola dirección Sapling sigue otorgando visibilidad entrante en cada pool de esa cuenta, por lo que revela más que la dirección que nombra. El [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) lo indica explícitamente.

**Una dirección publicada ya expone su incoming viewing key ante un adversario futuro.** [ZIP 326](https://zips.z.cash/zip-0326) señala que un adversario con una computadora cuántica podría recuperar la incoming viewing key de una dirección diversificada publicada, lo cual es factible de una manera en que recuperar la nullifier key no lo es. Publicar una dirección no equivale a publicar una viewing key hoy, pero ambas se acercan más entre sí a un horizonte suficientemente largo.

## Viewing keys después de Ironwood

NU6.3 introdujo el pool blindado Ironwood e hizo que el pool Orchard fuera solo de gasto, por lo que los fondos migran de uno al otro con el tiempo. Consulta [Ironwood](/zcash-tech/ironwood) y [El torniquete](/zcash-tech/the-turnstile) para conocer la actualización en sí.

**Una viewing key emitida antes de Ironwood sigue funcionando después de la migración.** ZIP 326 especifica que un receptor, y su incoming viewing key correspondiente, tienen alcance sobre el *protocolo* Orchard en lugar de sobre un pool: la misma incoming viewing key descifra mediante prueba los textos cifrados de notas tanto del pool Orchard como del pool Ironwood. Zallet lo implementa de esa forma, describiendo las notas Ironwood como con forma de Orchard y descifradas mediante prueba con las viewing keys Orchard de la cuenta bajo el dominio de cifrado de notas Ironwood.

Tres consecuencias para cualquiera que posea o emita una clave:

1. **Los saldos se mueven entre pools, y quien visualiza lo ve ocurrir.** [ZIP 318](https://zips.z.cash/zip-0318) especifica la migración como una serie de pequeñas transacciones deliberadamente uniformes de Orchard a Ironwood, transmitidas según un calendario aleatorizado; cada una gasta una nota Orchard y produce una salida Ironwood de una denominación canónica. Un auditor que observa con una viewing key ve cómo las tenencias pasan de un pool al otro gradualmente durante semanas, no en un único movimiento. Una wallet puede reconstruir su propio progreso de migración a partir de datos de la cadena usando sus viewing keys.
2. **Cada paso de migración revela el valor que mueve.** Esto es inherente a atravesar un torniquete y es lo que hace auditable la migración. Dividir el saldo en denominaciones canónicas significa que ninguna transacción individual revela el saldo completo del pool Orchard.
3. **Las cuentas creadas después de Ironwood pueden derivar sus claves de manera diferente.** [ZIP 2005](https://zips.z.cash/zip-2005) añade una marca `use_qsk` para claves recuperables cuánticamente, y cambia cómo se derivan las claves entrantes, salientes y de diversificador, por lo que las claves con `use_qsk = true` son realmente claves diferentes. ZIP 326 exige que la marca sea uniforme en toda una cuenta y prohíbe generar claves con `use_qsk = true` antes de que NU6.3 se active en Mainnet. Por lo tanto, una clave exportada desde una cuenta que existía antes de Ironwood es una clave `use_qsk = false` y sigue siendo correcta para esa cuenta. No supongas que una clave exportada de una cuenta describe otra.

## Exportar una viewing key

### Zallet

[Zallet](https://github.com/zcash/zallet) es la wallet de nodo completo que sustituyó a la wallet dentro de zcashd. La exportación e importación de viewing keys llegó en **v0.1.0-beta.2 (28 de julio de 2026)**, así que primero comprueba tu versión; las compilaciones anteriores no tienen estos métodos. Cada argumento después del nombre del método debe ser JSON válido, lo que significa que los valores de cadena conservan sus propias comillas dobles. La [Guía de referencia rápida de Zallet](/using-zcash/zallet-quick-reference-guide) cubre el estilo general de comandos.

Lista lo que contiene la wallet:

```bash
zallet rpc listaddresses
```

Exporta la unified full viewing key de la cuenta pasando una dirección unificada:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Exporta en su lugar la unified incoming viewing key de la cuenta usando el argumento opcional `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Pasar una dirección Sapling devuelve la Sapling extended full viewing key de esa cuenta (`zxviews…`), igual que el antiguo comportamiento de zcashd. Dos limitaciones documentadas: las direcciones Sprout se rechazan, y no se puede exportar una Sapling extended full viewing key de una cuenta que se importó como solo visualización, porque la wallet no puede reconstruirla. La forma `ivk` sí funciona para cuentas importadas como solo visualización.

### Wallets que exportan viewing keys desde su propia interfaz

La página [Wallets](/using-zcash/wallets) registra la compatibilidad con viewing keys y la preparación para Ironwood de cada wallet. Al momento de escribir esto, las wallets que indican compatibilidad con viewing keys y **Ironwood: Ready** incluyen ZODL, Zingo!, Zkool, Cake, Zallet, Zecd y Nozy. Consulta esa página en lugar de esta antes de depender de cualquier wallet específica, porque la preparación cambia.

## Importar una viewing key como cuenta de solo visualización

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) es la opción más flexible aquí, porque acepta claves unificadas además de las heredadas. Su README documenta cuentas de solo visualización creadas a partir de una **unified viewing key** o una **Sapling extended viewing key**, junto con claves extendidas blindadas heredadas exportadas desde zcashd. Añade una cuenta nueva, elige la ruta de solo visualización y pega la clave `uview…` o `zxviews…`; la cuenta luego se sincroniza e informa saldos e historial sin autoridad para gastar.

La compatibilidad con el protocolo Ironwood y la migración de Orchard a Ironwood llegaron en Zkool 6.24.0 (20 de julio de 2026), y 6.26.1 (2 de agosto de 2026) corrigió la detección de transacciones Ironwood en el mempool. Usa la versión 6.26.1 o posterior.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

El segundo argumento es la política de reescaneo: `"whenkeyisnew"` (el valor predeterminado), `"yes"` o `"no"`. El tercero es la altura del bloque desde la que se vuelve a escanear. Zallet importa la clave como una cuenta de solo visualización y rastrea las transacciones entrantes y salientes de sus direcciones sin autoridad para gastar.

**Zallet importa únicamente Sapling extended full viewing keys.** No importará una unified full viewing key `uview…`, aunque puede exportar una. Para entregar acceso de lectura a toda una cuenta unificada, exporta la UFVK desde Zallet e impórtala en una wallet que acepte claves unificadas, como Zkool.

Para convertir una clave importada en un archivo completo de historial de transacciones, con txids, comisiones y memos, consulta [Exportar el historial de transacciones desde una Viewing Key](/guides/viewing-key-transaction-export).

## Qué cambió y qué dejar de buscar

Si seguiste una versión anterior de esta página, o una traducción de ella, tres rutas ya no funcionan.

- **`zcash-cli z_exportviewingkey` y `z_importviewingkey`.** zcashd llegó a su detención al final del soporte el 18 de julio de 2026 y ya no se ejecuta. Los métodos de Zallet con nombres idénticos son el reemplazo; consulta la [guía de migración](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **El tutorial de Ywallet.** La página Wallets marca Ywallet como **Ironwood: Not Ready**, por lo que no es la wallet a la que se debe dirigir a las personas para viewing keys de la era Ironwood. Zkool, del mismo desarrollador, acepta la misma gama de claves y está marcada como Ready.
- **zcashblockexplorer.com/vk.** El servicio devuelve HTTP 503 con un certificado no válido, y se ha eliminado en lugar de reemplazarse. Pegar una viewing key en un sitio web entrega todo tu historial de transacciones a quien opere ese sitio, lo cual siempre fue la opción más débil de las tres en la página anterior. Importa la clave en una wallet que ejecutes tú en su lugar.

## Recursos

Usa viewing keys según sea necesario y prefiere la clave más limitada que responda a la pregunta planteada.

- [ZIP 326: Consecuencias de NU6.3 para las Wallets](https://zips.z.cash/zip-0326) — cómo se comportan las viewing keys entre los pools Orchard e Ironwood
- [ZIP 229: Formato de transacción versión 6](https://zips.z.cash/zip-0229) — define los pools Orchard e Ironwood
- [Registro de cambios de Zallet](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — qué versión añadió cada método RPC
- [README de Zkool](https://github.com/hhanh00/zkool2/blob/main/README.md) — tipos de cuentas y claves compatibles
- [ECC, Explicación de las Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgación selectiva y Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Presentación de video sobre Zcash Viewing Key](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
