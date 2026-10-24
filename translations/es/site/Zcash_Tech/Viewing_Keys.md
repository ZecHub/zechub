<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Las direcciones blindadas te permiten realizar transacciones revelando lo menos posible en la blockchain de Zcash. Pero ¿qué sucede cuando *sí* necesitas mostrar a una parte específica lo que posees o lo que enviaste? Cada dirección blindada tiene una viewing key que concede acceso de lectura sin otorgar la capacidad de gastar. Las viewing keys se introdujeron en [ZIP 310](https://zips.z.cash/zip-0310) y se añadieron al protocolo en la actualización de red Sapling.

Una viewing key es la herramienta para la divulgación selectiva: eliges quién ve qué y nunca entregas autoridad para gastar al hacerlo.

## En resumen

Una clave de visualización otorga acceso de **solo lectura** a la actividad de una dirección o cuenta Zcash blindada: quien la posea puede ver las transacciones entrantes (y, para las claves de visualización completas, las salientes), pero nunca puede gastar.

- **Qué es:** la herramienta de divulgación selectiva de los pools blindados. Introducida en [ZIP 310](https://zips.z.cash/zip-0310), añadida al protocolo en la actualización de red Sapling.
- **Qué permite:** detectar depósitos (claves entrantes `uivk…`) o visibilidad completa de entradas y salidas para una cuenta (claves de visualización completas unificadas `uview…`), y claves heredadas Sapling `zxviews…`.
- **Qué no permite:** autoridad para gastar. Nada de lo que haga el titular de una clave de visualización puede mover fondos.
- **Dónde funciona hoy:** exportación/importación en [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) y cuentas de solo visualización en wallets como Zkool; consulta la página de [Wallets](/using-zcash/wallets) para ver la matriz de compatibilidad actual.
- **La regla general:** prefiere la clave más limitada que responda a la pregunta planteada, y recuerda que una clave entregada no puede revocarse; solo puede quedar obsoleta al mover los fondos.

---

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

La página [Wallets](/using-zcash/wallets) registra la compatibilidad con viewing keys y la preparación para Ironwood de cada wallet. Al momento de escribir esto, las wallets que indican compatibilidad con viewing keys y **Ironwood: Ready** incluyen ZODL, Zingo!, Zkool, Cake, Zallet, zecd y Nozy. Consulta esa página en lugar de esta antes de depender de cualquier wallet específica, porque la preparación cambia.

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

## Visual / Analogía

### La ventana del auditor

Piensa en una cuenta blindada como una sala de cajas de seguridad en un banco:

- La **clave de gasto** es la llave de la habitación. Quien la posea puede abrir cajas y sacar su contenido.
- Una **clave de visualización** es la ventana del auditor hacia esa habitación. El auditor puede observar cada caja entrar y salir, leer las etiquetas y llevar un registro contable, pero la ventana no tiene manija. La persona que mira a través de ella no puede mover nada dentro de la habitación.

### Lo que la ventana no puede mostrar

La ventana da a la habitación, no al mundo exterior. Muestra la actividad protegida de la cuenta observada; no convierte al observador en alguien que observa toda la blockchain, ni le permite correlacionar la actividad de la cuenta con el historial no protegido de nadie más. Y dado que la ventana se instala a nivel de cuenta, darle a alguien una mirilla para una caja de depósito (una única dirección) aún le da la vista completa de las entradas de toda la habitación, que es precisamente la razón por la que existe la regla de la clave más restringida.

### Por qué no puedes recuperar la ventana

Una clave de visualización es información, no una entrada de permiso. Una vez copiada, existe hasta que los fondos salen de la cuenta que observa. La solución práctica es la rotación: trasladar los saldos a una cuenta nueva cuyas claves la otra parte nunca recibió, y la antigua ventana se asoma a una habitación vacía.

## Análisis en profundidad

### Descifrado de prueba: cómo funciona realmente la visualización

Cada transacción blindada cifra los textos planos de sus notas para el destinatario previsto. Una wallet que posee una viewing key realiza un **descifrado de prueba**: para cada transacción que encuentra en la cadena, intenta descifrar los textos cifrados de las notas con la clave. Los aciertos revelan el valor de la nota, el diversificador del destinatario y el memo; los fallos no tienen coste. Por eso, la misma incoming viewing key sigue funcionando en los pools Orchard y Ironwood — [ZIP 326](https://zips.z.cash/zip-0326) limita un receptor al *protocolo* Orchard, por lo que los textos cifrados de las notas Ironwood tienen formato de Orchard y se descifran mediante prueba con las viewing keys Orchard de la cuenta dentro del dominio de cifrado de notas Ironwood.

### Completa frente a entrante: qué determina la derivación

Una clave de visualización **completa** puede derivar la capacidad de visualización saliente, lo que permite a un auditor reconstruir el lado del *remitente* de una transferencia una vez descifrada la transacción. Una clave de visualización **entrante** se queda deliberadamente corta: detecta y descifra notas entrantes, pero no puede reconstruir la vinculación saliente. La derivación entre estas capacidades es unidireccional —la clave entrante se deriva *de* la clave completa, nunca al revés—, lo que hace que «solo entrante» sea una degradación real en lugar de una promesa. El indicador `use_qsk` de [ZIP 2005](https://zips.z.cash/zip-2005) modifica la propia derivación, por lo que las claves recuperables cuánticamente constituyen una familia de claves completamente distinta, no una variante de la anterior.

### Cómo se ve la migración para un espectador

Dado que la migración [ZIP 318](https://zips.z.cash/zip-0318) es una serie aleatorizada de pequeñas transacciones uniformes de Orchard a Ironwood, quien posee la clave ve una escalera: muchos escalones de valor de denominación canónica en lugar de un solo salto. Ningún escalón revela el saldo total que se está migrando, pero el *patrón* es reconocible — lo cual es la contrapartida prevista de un torniquete auditable.

## Implicaciones prácticas

- **Para exchanges y procesadores de pagos:** carga la clave de visualización entrante de la cuenta (o UFVK para una cobertura completa) en un nodo de detección y reconcilia automáticamente los depósitos de clientes, exactamente como lo harías con una dirección transparente, pero la clave de gasto del cliente nunca sale del almacenamiento en frío.
- **Para auditores y pruebas de reservas:** una clave de visualización completa transforma «confía en nosotros» en «verifica esto»: saldos e historial completo de transacciones de las cuentas observadas, sin ninguna capacidad de tocarlas. Combínala con [Divulgaciones de pagos](/zcash-tech/payment-disclosures) para pruebas puntuales sobre un único pago.
- **Para la debida diligencia:** entrega a una contraparte la clave de la cuenta relevante para la relación, no la de toda tu wallet. Si la relación termina, rota la cuenta.
- **Para elegir herramientas:** Zallet exporta UFVK e importa Sapling claves de visualización completas extendidas; Zkool acepta claves unificadas y heredadas como cuentas de solo visualización. Consulta la página [Wallets](/using-zcash/wallets) para ver la matriz actual de preparación de Ironwood antes de estandarizar una wallet.
- **El coste de la divulgación es permanente:** cada titular adicional de una clave es una línea de crédito de privacidad permanente que no puedes cerrar. Emite claves por relación, limítalas a una sola cuenta y documenta quién posee qué.

## Errores comunes

| Creencia común | Lo que realmente ocurre |
| --- | --- |
| "Una viewing key puede gastar los fondos si se filtra." | No puede. Las viewing keys no otorgan autoridad para gastar; lo peor que puede causar una filtración es revelar el historial. |
| "Puedo revocar una viewing key más adelante." | No puedes. Una clave entregada funciona hasta que los fondos se transfieren a una cuenta cuyas claves la otra parte no posee. |
| "Exportar una UIVK para una sola dirección solo muestra esa dirección." | Las viewing keys se aplican a toda la cuenta. Una UIVK muestra la actividad entrante de cada pool de la cuenta. |
| "`zcash-cli z_exportviewingkey` todavía funciona." | No. zcashd llegó a su interrupción por fin de soporte el 18 de julio de 2026; usa `z_exportviewingkey` / `z_importviewingkey` de Zallet en su lugar. |
| "Pegar una viewing key en una herramienta web es seguro porque es de solo lectura." | Que sea de solo lectura sigue significando que todo el historial de transacciones de esa cuenta se entrega a quien administre el sitio. Importa la clave en una wallet que administres tú. |
| "Zallet puede importar cualquier viewing key que Zallet pueda exportar." | No. Zallet solo importa extended full viewing keys de Sapling; las claves unificadas de `uview…` deben importarse en wallets que acepten claves unificadas, como Zkool. |

## Páginas relacionadas

- [Divulgaciones de pagos](/zcash-tech/payment-disclosures) — demostrar detalles seleccionados de un pago sin conceder acceso continuo a una cuenta
- [Direcciones unificadas](/zcash-tech/unified-addresses) — la capa de direcciones que contiene receptores de claves de visualización
- [Ironwood](/zcash-tech/ironwood) — el pool blindado de NU6.3 al que migra Orchard
- [El Torniquete](/zcash-tech/the-turnstile) — el mecanismo de migración de Orchard a Ironwood que los observadores pueden seguir
- [Wallets](/using-zcash/wallets) — el directorio completo de wallets, compatibilidad con claves de visualización y preparación para Ironwood
- [Exportar el historial de transacciones desde un Viewing Key](/guides/viewing-key-transaction-export) — convertir una clave importada en un archivo completo de historial de txid/comisión/memo

## Recursos

Usa viewing keys según sea necesario y prefiere la clave más limitada que responda a la pregunta planteada.

- [Divulgaciones de pagos](/zcash-tech/payment-disclosures) - demostrar detalles seleccionados de un pago sin otorgar acceso continuo a una cuenta
- [ZIP 326: NU6.3 Consecuencias para las billeteras](https://zips.z.cash/zip-0326) — cómo se comportan las claves de visualización en los pools Orchard y Ironwood
- [ZIP 229: Formato de transacción de la versión 6](https://zips.z.cash/zip-0229) — define los pools Orchard y Ironwood
- [ZIP 310](https://zips.z.cash/zip-0310) — especificación de claves de visualización
- [Zallet registro de cambios](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — qué versión añadió qué método RPC
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — tipos de cuentas y claves compatibles
- [ECC, Explicación de las claves de visualización](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgación selectiva y claves de visualización](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Presentación en video](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
