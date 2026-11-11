<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Claves de visualización [Viewing Keys]

Las direcciones blindadas [Shielded] te permiten realizar transacciones mientras revelas lo menos posible en la blockchain Zcash. Entonces, ¿qué sucede cuando *sí* necesitas mostrarle a una parte específica lo que posees o lo que enviaste? Toda dirección blindada tiene una clave de visualización que concede acceso de lectura sin otorgar la capacidad de gastar. Las claves de visualización se introdujeron en [ZIP 310](https://zips.z.cash/zip-0310) y se añadieron al protocolo en la actualización de red [network upgrade] Sapling.

Una clave de visualización es la herramienta para la divulgación selectiva [selective disclosure]: eliges quién ve qué y nunca entregas autoridad de gasto para hacerlo.

## En resumen

Una clave de visualización concede acceso **de solo lectura** a la actividad de una dirección o cuenta blindada Zcash: quien la posee puede ver las transacciones entrantes (y, para las claves de visualización completas, salientes), pero nunca puede gastar.

- **Qué es:** la herramienta de divulgación selectiva de los pools blindados. Introducida en [ZIP 310](https://zips.z.cash/zip-0310), añadida al protocolo en la actualización de red Sapling.
- **Qué concede:** detección de depósitos (claves entrantes `uivk…`) o visibilidad completa de entrada/salida para una cuenta (claves de visualización completas unificadas `uview…`), y claves heredadas Sapling `zxviews…`.
- **Qué no concede:** autoridad de gasto. Nada de lo que haga el titular de una clave de visualización puede mover fondos.
- **Dónde funciona hoy:** exportación/importación en [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) y cuentas de solo visualización en billeteras como Zkool; consulta la página [Billeteras](/using-zcash/wallets) para ver la matriz de compatibilidad actual.
- **La regla general:** prefiere la clave más restringida que responda a la pregunta planteada y recuerda que una clave entregada no puede revocarse; solo puede dejar de servir cuando se mueven los fondos.

---

## ¿Por qué usar una clave de visualización?

Los escritos de Electric Coin Company sobre el tema exponen las situaciones que surgen con más frecuencia, y siguen siendo las habituales hoy:

- **Un exchange que vigila los depósitos.** El exchange carga una clave de visualización entrante en un nodo de detección conectado a internet para poder detectar los depósitos de los clientes a una dirección blindada, mientras la clave de gasto permanece en hardware que nunca toca la red.
- **Un custodio que demuestra sus tenencias.** El custodio entrega a un auditor una clave de visualización completa para cada dirección blindada. El auditor puede comprobar esos saldos y revisar la actividad pasada hacia y desde esas direcciones, y no puede hacer nada más.
- **Debida diligencia sobre una contraparte.** Cuando un exchange necesita revisar el historial blindado de un cliente como parte de una debida diligencia reforzada, puede solicitar la clave de visualización en lugar de los fondos.

## Qué revela y qué no revela una clave de visualización

Hay más de un tipo de clave, y la diferencia determina cuánto revelas.

| Clave | Prefijo | Concede |
|---|---|---|
| Clave de visualización completa unificada (UFVK) | `uview…` | Ve transacciones entrantes **y** salientes para cada pool de la cuenta |
| Clave de visualización entrante unificada (UIVK) | `uivk…` | Ve solo transacciones entrantes para cada pool de la cuenta |
| Clave de visualización completa extendida Sapling | `zxviews…` | Ve actividad entrante y saliente Sapling para las direcciones de la clave |

Ninguna de estas puede gastar. Todas son permanentes en el sentido importante: una clave que has entregado no puede revocarse, solo dejar de servir al mover los fondos a una cuenta cuyas claves la otra parte no posee.

Conviene conocer dos trampas de divulgación antes de compartir nada.

**Entrante no significa restringida.** Una clave de visualización entrante unificada está limitada a toda la cuenta, no a la única dirección por la que te preguntaron. Exportar una UIVK para una sola dirección Sapling sigue concediendo visibilidad entrante en todos los pools de esa cuenta, por lo que revela más que la dirección que nombra. El [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) lo establece explícitamente.

**Una dirección publicada ya expone su clave de visualización entrante a un adversario futuro.** [ZIP 326](https://zips.z.cash/zip-0326) señala que un adversario con un ordenador cuántico podría recuperar la clave de visualización entrante a partir de una dirección diversificada publicada, lo cual es viable de una manera en que recuperar la clave de anulador no lo es. Publicar una dirección no equivale a publicar una clave de visualización hoy, pero ambas están más cerca con un horizonte suficientemente largo.

## Claves de visualización después de Ironwood

NU6.3 introdujo el pool blindado Ironwood e hizo que el pool Orchard fuera solo de gasto, por lo que los fondos migran de uno al otro con el tiempo. Consulta [Ironwood](/zcash-tech/ironwood) y [El turnstile](/zcash-tech/the-turnstile) para conocer la actualización en sí.

**Una clave de visualización emitida antes de Ironwood sigue funcionando después de la migración.** ZIP 326 especifica que un receptor, y su clave de visualización entrante correspondiente, están limitados al *protocolo* Orchard en lugar de a un pool: la misma clave de visualización entrante descifra mediante prueba los textos cifrados de notas del pool Orchard y del pool Ironwood. Zallet lo implementa de ese modo, describiendo las notas Ironwood como de forma Orchard y descifradas mediante prueba con las claves de visualización Orchard de la cuenta bajo el dominio de cifrado de notas Ironwood.

Tres consecuencias para cualquiera que posea o emita una clave:

1. **Los saldos se mueven entre pools y el observador lo ve ocurrir.** [ZIP 318](https://zips.z.cash/zip-0318) especifica la migración como una serie de transacciones pequeñas y deliberadamente uniformes de Orchard a Ironwood, transmitidas según un calendario aleatorizado, cada una gastando una nota Orchard y produciendo una salida Ironwood de una denominación canónica. Un auditor que observa con una clave de visualización ve las tenencias trasladarse de un pool al otro en etapas durante semanas, no en un único movimiento. Una billetera puede reconstruir su propio progreso de migración a partir de los datos de la cadena utilizando sus claves de visualización.
2. **Cada paso de migración revela el valor que mueve.** Eso es inherente a cruzar un turnstile, y es lo que hace auditable la migración. Dividir el saldo en denominaciones canónicas significa que ninguna transacción individual revela todo el saldo del pool Orchard.
3. **Las cuentas creadas después de Ironwood pueden derivar sus claves de forma diferente.** [ZIP 2005](https://zips.z.cash/zip-2005) añade una bandera `use_qsk` para claves recuperables cuánticamente, y cambia cómo se derivan las claves entrantes, salientes y diversificadoras, por lo que las claves `use_qsk = true` son realmente claves distintas. ZIP 326 exige que la bandera sea uniforme en toda una cuenta y prohíbe generar claves `use_qsk = true` antes de que NU6.3 se activara en Mainnet. Por lo tanto, una clave exportada de una cuenta que existía antes de Ironwood es una clave `use_qsk = false` y sigue siendo correcta para esa cuenta. No supongas que una clave exportada de una cuenta describe otra.

## Exportar una clave de visualización

### Zallet

[Zallet](https://github.com/zcash/zallet) es la billetera de nodo completo que sustituyó a la billetera dentro de zcashd. La exportación e importación de claves de visualización llegaron en **v0.1.0-beta.2 (28 de julio de 2026)**, así que comprueba primero tu versión; las compilaciones anteriores no tienen estos métodos. Cada argumento después del nombre del método debe ser JSON válido, lo que significa que los valores de cadena mantienen sus propias comillas dobles. La [Zallet Guía de referencia rápida](/using-zcash/zallet-quick-reference-guide) cubre el estilo general de comandos.

Lista lo que contiene la billetera:

```bash
zallet rpc listaddresses
```

Exporta la clave de visualización completa unificada de la cuenta pasando una dirección unificada:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Exporta en su lugar la clave de visualización entrante unificada de la cuenta usando el argumento opcional `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Pasar una dirección Sapling devuelve la clave de visualización completa extendida Sapling de esa cuenta (`zxviews…`), reproduciendo el comportamiento antiguo de zcashd. Hay dos límites documentados: las direcciones Sprout se rechazan, y no se puede exportar una clave de visualización completa extendida Sapling desde una cuenta que fue importada como solo visualización, porque la billetera no puede reconstruirla. La forma `ivk` sí funciona para las cuentas importadas de solo visualización.

### Billeteras que exportan claves de visualización desde su propia interfaz

La página [Billeteras](/using-zcash/wallets) registra la compatibilidad con claves de visualización y la preparación para Ironwood de cada billetera. Al momento de escribir, las billeteras que indican tanto compatibilidad con claves de visualización como **Ironwood: Lista** incluyen ZODL, Zingo!, Zkool, Cake, Zallet, zecd y Nozy. Consulta esa página en lugar de esta antes de depender de una sola billetera, porque la preparación cambia.

## Importar una clave de visualización como cuenta de solo visualización

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) es la opción más flexible aquí, porque acepta claves unificadas además de las heredadas. Su README documenta cuentas de solo visualización creadas a partir de una **clave de visualización unificada** o una **clave de visualización extendida Sapling**, junto con claves extendidas blindadas heredadas exportadas desde zcashd. Añade una cuenta nueva, elige la ruta de solo visualización y pega la clave `uview…` o `zxviews…`; la cuenta se sincroniza y luego informa los saldos y el historial sin autoridad de gasto.

La compatibilidad con el protocolo Ironwood y la migración de Orchard a Ironwood llegaron en Zkool 6.24.0 (20 de julio de 2026), y 6.26.1 (2 de agosto de 2026) corrigió la detección de transacciones Ironwood en el mempool. Ejecuta la versión 6.26.1 o posterior.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

El segundo argumento es la política de reescaneo: `"whenkeyisnew"` (la predeterminada), `"yes"` o `"no"`. El tercero es la altura de bloque desde la que se vuelve a escanear. Zallet importa la clave como una cuenta de solo visualización y rastrea las transacciones entrantes y salientes de sus direcciones sin autoridad de gasto.

**Zallet importa únicamente claves de visualización completas extendidas Sapling.** No importará una clave de visualización completa unificada `uview…`, aunque pueda exportarla. Para entregar acceso de lectura a toda una cuenta unificada, exporta la UFVK desde Zallet e impórtala en una billetera que acepte claves unificadas, como Zkool.

Para convertir una clave importada en un archivo completo del historial de transacciones, con txids, tarifas y memos, consulta [Exportar el historial de transacciones de un Viewing Key](/guides/viewing-key-transaction-export).

## Qué cambió y qué debes dejar de buscar

Si seguiste una versión anterior de esta página, o una traducción de ella, tres rutas ya no funcionan.

- **`zcash-cli z_exportviewingkey` y `z_importviewingkey`.** zcashd llegó a su detención por fin de soporte el 18 de julio de 2026 y ya no se ejecuta. Los métodos con el mismo nombre de Zallet son el reemplazo; consulta la [guía de migración](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **El tutorial de Ywallet.** La página de Billeteras marca Ywallet como **Ironwood: No lista**, por lo que no es la billetera a la que dirigir a las personas para claves de visualización de la era Ironwood. Zkool, del mismo desarrollador, acepta el mismo rango de claves y está marcada como Lista.
- **zcashblockexplorer.com/vk.** El servicio devuelve HTTP 503 con un certificado no válido, y se ha eliminado en lugar de sustituirse. Pegar una clave de visualización en un sitio web entrega todo tu historial de transacciones a quien gestione ese sitio, lo cual siempre fue la más débil de las tres opciones de la página anterior. En su lugar, importa la clave en una billetera que tú ejecutes.

## Visual / Analogía

### La ventana del auditor

Piensa en una cuenta blindada como una sala de cajas de seguridad en un banco:

- La **clave de gasto** es la llave de la sala. Quien la posee puede abrir cajas y sacar contenidos.
- Una **clave de visualización** es la ventana del auditor hacia esa sala. El auditor puede ver entrar y salir cada caja, leer las etiquetas y llevar un libro mayor, pero la ventana no tiene manija. La persona que mira a través de ella no puede mover nada dentro de la sala.

### Lo que la ventana no puede mostrar

La ventana da a la sala, no al mundo exterior. Muestra la actividad blindada de la cuenta observada; no convierte al observador en un observador de toda la blockchain ni le permite correlacionar la actividad de la cuenta con el historial no blindado de nadie más. Y, dado que la ventana se instala en el nivel de la cuenta, dar a alguien una mirilla para una sola caja de depósito (una única dirección) todavía le proporciona la vista entrante de toda la sala, que es precisamente la razón por la que existe la regla de la clave más restringida.

### Por qué no puedes recuperar la ventana

Una clave de visualización es una pieza de información, no una entrada de permisos. Una vez copiada, existe hasta que los fondos abandonan la cuenta que observa. La solución práctica es la rotación: mueve los saldos a una cuenta nueva cuyas claves la otra parte nunca recibió, y la ventana anterior da a una sala vacía.

## Análisis detallado

### Descifrado mediante prueba: cómo funciona realmente la visualización

Cada transacción blindada cifra los textos sin formato de sus notas para el destinatario previsto. Una billetera que posee una clave de visualización realiza **descifrado mediante prueba**: para cada transacción que encuentra en la cadena, intenta descifrar los textos cifrados de las notas con la clave. Los aciertos revelan el valor de la nota, el diversificador del destinatario y el memo; los fallos no cuestan nada. Por eso la misma clave de visualización entrante sigue funcionando en los pools Orchard y Ironwood: [ZIP 326](https://zips.z.cash/zip-0326) limita un receptor al *protocolo* Orchard, de modo que los textos cifrados de notas Ironwood tienen forma Orchard y se descifran mediante prueba con las claves de visualización Orchard de la cuenta bajo el dominio de cifrado de notas Ironwood.

### Completa frente a entrante: qué decide la derivación

Una clave de visualización **completa** puede derivar la capacidad de visualización saliente, que es lo que permite a un auditor reconstruir el lado del *remitente* de una transferencia una vez descifrada la transacción. Una clave de visualización **entrante** se detiene deliberadamente antes: detecta y descifra notas entrantes, pero no puede reconstruir el vínculo saliente. La derivación entre estas capacidades es unidireccional: la clave entrante se deriva *de* la clave completa, nunca al revés, lo cual hace que «solo entrante» sea una degradación real y no una promesa. La bandera `use_qsk` de [ZIP 2005](https://zips.z.cash/zip-2005) cambia la derivación en sí, por lo que las claves recuperables cuánticamente son una familia de claves totalmente distinta, no una variante de la anterior.

### Cómo se ve la migración para un observador

Como la migración [ZIP 318](https://zips.z.cash/zip-0318) es una serie aleatorizada de transacciones pequeñas y uniformes de Orchard a Ironwood, un observador que posee la clave ve una escalera: muchos pasos de valor de denominación canónica en lugar de un solo salto. Ningún paso individual revela el saldo total que se está migrando, pero el *patrón* es reconocible, que es la compensación prevista de un turnstile auditable.

## Implicaciones prácticas

- **Para exchanges y procesadores de pagos:** carga la clave de visualización entrante de la cuenta (o la UFVK para cobertura total) en un nodo de detección y concilia los depósitos de clientes automáticamente, exactamente como lo harías con una dirección transparente, pero la clave de gasto del cliente nunca sale del almacenamiento en frío.
- **Para auditores y pruebas de reservas:** una clave de visualización completa convierte «confía en nosotros» en «verifica esto»: saldos e historial completo de transacciones de las cuentas observadas, sin ninguna capacidad de tocarlas. Combínala con [Divulgaciones de pagos](/zcash-tech/payment-disclosures) para pruebas puntuales sobre un solo pago.
- **Para la debida diligencia:** entrega a una contraparte la clave de la cuenta relevante para la relación, no de toda tu billetera. Si la relación termina, rota la cuenta.
- **Para las decisiones de herramientas:** Zallet exporta UFVK e importa claves de visualización completas extendidas Sapling; Zkool acepta claves unificadas y heredadas como cuentas de solo visualización. Consulta la página [Billeteras](/using-zcash/wallets) para ver la matriz de preparación actual de Ironwood antes de estandarizar una billetera.
- **El coste de la divulgación es permanente:** cada poseedor adicional de una clave es una línea de crédito de privacidad permanente que no puedes cerrar. Emite claves por relación, limítalas a una cuenta y documenta quién posee qué.

## Errores comunes

| Creencia común | Cuál es realmente el caso |
| --- | --- |
| "Una clave de visualización puede gastar los fondos si se filtra." | No puede. Las claves de visualización no tienen autoridad de gasto; lo peor que provoca una filtración es revelar el historial. |
| "Puedo revocar una clave de visualización más adelante." | No puedes. Una clave entregada funciona hasta que los fondos se trasladan a una cuenta cuyas claves la otra parte no posee. |
| "Exportar una UIVK para una dirección solo muestra esa dirección." | Las claves de visualización están limitadas a la cuenta. Una UIVK muestra la actividad entrante de cada pool de la cuenta. |
| "`zcash-cli z_exportviewingkey` todavía funciona." | No. zcashd llegó a su detención por fin de soporte el 18 de julio de 2026; utiliza en su lugar Zallet `z_exportviewingkey` / `z_importviewingkey`. |
| "Pegar una clave de visualización en una herramienta web es seguro porque es de solo lectura." | Solo lectura sigue significando que todo el historial de transacciones de esa cuenta se entrega a quien ejecute el sitio. Importa la clave en una billetera que tú ejecutes. |
| "Zallet puede importar cualquier clave de visualización que Zallet pueda exportar." | No. Zallet importa únicamente claves de visualización completas extendidas Sapling; las claves unificadas `uview…` deben ir a billeteras que acepten claves unificadas, como Zkool. |

## Páginas relacionadas

- [Divulgaciones de pagos](/zcash-tech/payment-disclosures) — demostrar detalles seleccionados de un pago sin conceder acceso continuo a una cuenta
- [Direcciones unificadas](/zcash-tech/unified-addresses) — la capa de direcciones que transporta receptores de claves de visualización
- [Ironwood](/zcash-tech/ironwood) — el pool blindado NU6.3 al que migra Orchard
- [El turnstile](/zcash-tech/the-turnstile) — el mecanismo de migración de Orchard a Ironwood que los observadores pueden vigilar
- [Billeteras](/using-zcash/wallets) — el directorio completo de billeteras, compatibilidad con claves de visualización y preparación para Ironwood
- [Exportar el historial de transacciones de un Viewing Key](/guides/viewing-key-transaction-export) — convertir una clave importada en un archivo completo de historial de txid/tarifa/memo

## Recursos

Utiliza claves de visualización solo cuando sea necesario y prefiere la clave más restringida que responda a la pregunta planteada.

- [Divulgaciones de pagos](/zcash-tech/payment-disclosures) - demostrar detalles seleccionados de un pago sin conceder acceso continuo a una cuenta
- [ZIP 326: Consecuencias de NU6.3 para las billeteras](https://zips.z.cash/zip-0326) — cómo se comportan las claves de visualización entre los pools Orchard y Ironwood
- [ZIP 229: Formato de transacción de la versión 6](https://zips.z.cash/zip-0229) — define los pools Orchard y Ironwood
- [ZIP 310](https://zips.z.cash/zip-0310) — especificación de la clave de visualización
- [Zallet registro de cambios](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — qué versión añadió cada método RPC
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — tipos de cuentas y claves compatibles
- [ECC, Explicación de las claves de visualización](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgación selectiva y claves de visualización](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Presentación de vídeo de Zcash Viewing Key](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
