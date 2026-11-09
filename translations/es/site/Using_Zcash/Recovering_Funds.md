<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Recuperación de fondos de la billetera [Wallet]

**¿Por qué conservar tu material de recuperación?**

Las frases semilla [seed phrase], las claves de gasto [spending key], las claves de visualización [viewing key] y los archivos de billetera no son intercambiables. Una frase semilla puede derivar claves de billetera para muchas billeteras, pero no sustituye todas las claves heredadas ni todos los archivos de billetera. Una clave de visualización puede revelar actividad blindada [shielded], pero no puede autorizar un gasto.

La recuperación depende de contar con la autoridad de gasto correcta y una vía actualmente compatible para el pool que contiene los fondos. Mantén privado el material de recuperación y nunca compartas frases semilla, claves de gasto ni archivos de billetera con personas en quienes no confíes.

# Seguridad y responsabilidad

Es crucial que los usuarios comprendan los riesgos que implica tratar con claves privadas y que mantengan estas claves protegidas frente al acceso no autorizado. La seguridad de los fondos depende de la responsabilidad del usuario de proteger sus claves privadas.

## Fondos blindados heredados: Sprout, Sapling y Orchard

Los ZEC blindados más antiguos pueden necesitar migrarse como parte de la recuperación. La ruta depende de qué pool blindado contiene actualmente los fondos.

> **NU7 está previsto para el 5 de noviembre de 2026.** Una vez que se active, la ruta de migración actual para salir del pool Sprout heredado dejará de funcionar.
>
> Si todavía tienes ZEC en el pool Sprout, migra antes de la actualización. Tras la activación, las herramientas existentes ya no podrán mover fondos Sprout a Sapling, direcciones transparentes ni ningún otro destino.
>
> Si estás viendo esta página **después de que se haya activado NU7**, **Sprout queda congelado en el hielo** hasta que esté disponible un futuro método de recuperación, que actualmente no está previsto.

## La respuesta en una página

| Tus fondos están en | Ruta de migración | Qué hacer |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Si tienes `wallet.dat` o una clave de gasto Sprout independiente, primero prueba la ruta de recuperación actual de Argos. Si Argos no es adecuado, utiliza la ruta heredada de sidecar de la guía de campo completa. Sprout debe llegar primero a Sapling y luego avanzar a Ironwood. Esta ruta es sensible al tiempo debido a NU7. |
| **Sapling** | **Sapling → Ironwood** | No se necesita un entorno de recuperación Sprout. Usa una billetera actual que pueda recuperar o gastar tu cuenta Sapling específica y construir transacciones Ironwood. El soporte de Ironwood por sí solo no demuestra soporte para recuperación heredada de Sapling. |
| **Orchard** | **Orchard → Ironwood** | Orchard es solo de salida. Usa el flujo integrado de migración de Orchard a Ironwood de una billetera compatible actual. Consulta [Fondos recuperados y el pool Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Flujo de decisión de cinco preguntas

1. **¿Es Sprout?** Una frase semilla por sí sola indica una ruta de recuperación de la era Sapling/Orchard posterior, no Sprout. Una dirección `zc...`, o una billetera restaurada que informa un saldo Sprout, indica Sprout.
2. **¿Qué material de recuperación tienes?** Busca `wallet.dat`, el ordenador antiguo o el datadir, una copia de seguridad `z_exportwallet` o una clave de gasto Sprout exportada. Una dirección `zc...` por sí sola no es suficiente.
3. **¿Argos o el sidecar heredado?** Si tienes `wallet.dat` o una clave de gasto Sprout independiente y simplemente quieres retirar los fondos, prueba primero [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Usa la ruta del sidecar heredado de la guía de campo completa si Argos no puede manejar el material o si quieres tener bajo tu propio control la pila de recuperación completa.
4. **¿Ya tienes un datadir zcashd sincronizado y sin poda?** Esto importa solo para la ruta del sidecar heredado. Copia los datos de nodo existentes solo tras un apagado limpio; de lo contrario, la guía de campo cubre las opciones de instantánea o desde cero.
5. **¿Dónde terminan los fondos?** **Ironwood.** Sprout pasa primero por Sapling porque no existe una única transacción directa de Sprout a Ironwood. No te detengas en Sapling.

### Guía de campo completa de migración del pool ZEC

Para consultar la referencia completa de migración, incluidas rutas de recuperación detalladas, comandos, tarifas [fee], requisitos de hardware, consideraciones de privacidad, resolución de problemas y notas sobre las fuentes, lee la guía completa.

**Versión 1.1 · Actualizada el 18 de septiembre de 2026**

[Lee la guía de campo completa de migración del pool ZEC en ZecHub](/research/zec-pool-migration/view)

> **Antes de empezar:** primero determina **qué estás recuperando y qué material de recuperación aún tienes**. Una semilla de una billetera actual o una clave de gasto compatible que no sea Sprout quizá solo necesite una restauración normal. El material más antiguo —como una semilla Zecwallet Lite, una `wallet.dat` heredada o una clave de gasto Sapling o Sprout independiente— puede requerir una ruta de recuperación dedicada.
>
> Si crees que los fondos están en **Sprout**, confirma que todavía tienes autoridad de gasto antes de dedicar tiempo a la recuperación. Una dirección `zc...` o solo material de visualización no es suficiente para mover los fondos.
>
> **YWallet ya no admite Zcash después de Ironwood.** Usa **Zkool** para restauraciones ordinarias no Sprout desde semillas y claves compatibles. Usa **Argos** para la recuperación de Zecwallet Lite, archivos de billetera heredados y claves de gasto Sapling/Sprout independientes. Para Sprout, Argos es la primera ruta que debes probar; la guía de campo completa cubre la alternativa del sidecar heredado.
>
> Usa la tabla siguiente según **lo que realmente tienes**, no según la herramienta de recuperación que recuerdas haber utilizado.

| Tienes | Empieza aquí |
| --- | --- |
| Una frase semilla o una **clave de gasto no Sprout** compatible de una billetera actual o mantenida recientemente, incluido material antiguo de YWallet Zcash | [Zkool](#fund-recovery-with-zkool) |
| **Solo una clave de visualización** | Zkool puede importar claves de visualización compatibles para acceso de solo lectura, pero una clave de visualización no puede autorizar un gasto de recuperación. Busca la semilla o clave de gasto correspondiente. |
| Una semilla Zecwallet Lite de 24 palabras | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Un Zecwallet Lite o zcashd `wallet.dat`, o una clave de gasto Sapling / Sprout independiente | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Al 18 de septiembre de 2026, v1.3.0 es la versión actual y preferida; usa v1.2.0 o posterior para la recuperación de `wallet.dat` y Sprout. |
| Material Sprout que Argos no puede manejar, o una recuperación en la que quieras mantener bajo tu propio control los componentes heredados | Usa la ruta del sidecar heredado en la [guía de campo completa](/research/zec-pool-migration/view). |
| Ninguna semilla o clave de gasto funcional, pero un dispositivo bloqueado, una contraseña olvidada o un disco averiado | [Recuperación profesional](#professional-recovery-when-you-do-not-have-the-seed). Nunca envíes una semilla o clave de gasto funcional a alguien que se ponga en contacto contigo sin que lo hayas solicitado. |

## Recuperación de fondos con Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) es el sucesor Zcash mantenido de YWallet del mismo desarrollador. Admite rutas de recuperación transparentes y blindadas modernas, incluidas claves Sapling heredadas, pero **no Sprout**.

Aquí se cubren dos situaciones:

1. **Restaurar una cuenta** desde una frase semilla, clave privada o clave de visualización
2. **Barrer fondos** desde una billetera que solo admitía direcciones transparentes

### 1) Restaurar una cuenta

1. Instala Zkool desde la [página de lanzamientos](https://github.com/hhanh00/zkool2/releases) y ábrela
2. En **Account Manager** (la página principal), toca el botón **+** para llegar a la pantalla **New Account**
3. Introduce un **Account Name** para identificar esta cuenta
4. Activa **Restore Account?**. Esto muestra los campos de clave y altura de nacimiento
5. Pega tu clave en **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool acepta frases semilla, claves secretas Sapling, claves extendidas transparentes y claves de visualización compatibles. Una clave de visualización es de solo lectura y no puede autorizar un gasto.
6. Introduce una **Birth Height** para una cuenta antigua. Zkool no escanea bloques anteriores a esta altura, así que elige una altura anterior a la primera actividad de la billetera si no estás seguro. Una altura de nacimiento establecida demasiado tarde puede hacer que parezca que faltan transacciones reales.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Guarda la cuenta y luego sincronízala

### Restaurar una semilla de una billetera diferente

Si la semilla procede de una billetera que sigue ZIP 316 —incluidos ZODL (anteriormente Zashi), Zingo o zcashd— activa **Advanced Options** y habilita **Use Internal Change** antes de guardar.

ZIP 316 usa una dirección interna/de cambio separada. Restaurar una de estas cuentas sin **Use Internal Change** puede hacer que las salidas de cambio parezcan faltar, aunque los fondos sigan existiendo.

Otros dos campos se encuentran en **Advanced Options**:

- **Extra Passphrase (optional)**, solo si la billetera original usaba una
- **Account Index**, si la billetera original tenía varias cuentas en una misma semilla. Los fondos podrían estar en un índice distinto

> **Estos dos solo aparecen cuando hay una frase semilla válida en el campo Key.** Con el campo vacío, o si contiene una clave privada o de visualización, Zkool muestra solo **Use Internal Change** y **H/W Ledger**. Pega primero la semilla y luego abre Advanced Options.

### 2) Barrer fondos desde una billetera solo transparente

Si la billetera o cuenta antigua contenía **solo ZEC transparentes**, primero restaura la cuenta, busca cada dirección transparente utilizada y luego mueve los fondos a un destino blindado actual que controles. No supongas que una marca de billetera antigua siempre era solo transparente; algunos productos añadieron soporte blindado en versiones posteriores.

1. Restaura la cuenta usando los pasos anteriores
2. Abre la cuenta y ve a la página **Receive Funds**
3. Toca la lupa de la barra superior (**Find other transparent addresses**). Las billeteras que rotan direcciones, como Ledger y Exodus, generan muchas direcciones transparentes desde una semilla, y esto encuentra las que contienen fondos
4. **Después, restablece y sincroniza la cuenta.** Las direcciones recién encontradas solo recogen sus saldos en el siguiente escaneo, por lo que omitir este paso hace parecer que el barrido no encontró nada
5. Ve a la página **Send**. Junto al saldo encontrarás tres botones de iconos. No tienen etiquetas de texto, así que pasa el cursor o mantén pulsado para ver sus nombres:
   - **Shield One** (escudo delineado) mueve una dirección transparente cada vez
   - **Shield All** (escudo sólido) mueve todo desde cada dirección transparente de una vez
   - **Unshield All** (candado abierto) hace lo contrario, hacia una dirección transparente

> **Shield One es la opción más privada.** Blindar varias direcciones en una transacción vincula públicamente que pertenecen a la misma persona. Zkool advierte de ello antes de ejecutar Shield All.

6. Revisa la transacción y envíala

Unshield All resulta útil al retirar a un exchange que solo acepta direcciones transparentes. Los botones de blindaje solo aparecen si la cuenta tiene una dirección blindada, y Unshield All solo si tiene una transparente.

## Recuperación de Zecwallet Lite y de billeteras heredadas con Argos

[Zecwallet Lite](https://github.com/adityapk00/zecwallet-lite) ya no recibe mantenimiento y su repositorio está archivado. Su derivación de semillas difiere del diseño utilizado por las billeteras actuales, por lo que importar la misma frase en una billetera moderna puede omitir fondos mantenidos en las direcciones derivadas adicionales de Zecwallet Lite. [Argos](https://argos.sovright.com), de Sovright, es un espacio de trabajo de recuperación de escritorio creado para este y otros casos de recuperación heredada.

Argos lee semillas y archivos de billetera Zecwallet Lite, zcashd `wallet.dat`, claves de gasto extendidas Sapling independientes y material de gasto Sprout. Para Sprout, una semilla Zecwallet Lite por sí sola no es suficiente porque esas claves se generaron por separado. Argos es una herramienta de recuperación, no una billetera de uso diario: inspecciona el material de origen localmente, escanea y luego barre hacia una billetera mantenida que controles.

Least Authority [auditó](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) la herramienta. La recuperación en sí es gratuita. Puede aparecer una donación opcional a Sovright durante el barrido.

> **Nunca escribas una semilla en un sitio web.** El sitio Argos es solo para la descarga y la [guía de usuario](https://argos.sovright.com/guide.html). Las claves permanecen en la aplicación de escritorio firmada. La validación es local frente a la suma de comprobación BIP-39. El campo de semilla se borra una vez que comienza el escaneo. Cualquiera que te escriba pidiendo esa semilla «para ayudarte a recuperar tus fondos» está intentando estafarte.

### Antes de abrir Argos

1. Descarga la aplicación de escritorio desde el sitio [oficial de Argos](https://argos.sovright.com) o desde la página de lanzamientos [GitHub](https://github.com/sovright/argos/releases). Verifica las sumas de comprobación o firmas cuando se publiquen.
2. Usa la versión actual de Argos. Al 18 de septiembre de 2026, **v1.3.0** es la versión actual y preferida. Usa **v1.2.0 o posterior para la recuperación de `wallet.dat` y Sprout**. Las compilaciones anteriores a 1.1.0 aún pueden escanear, pero construyen barridos anteriores a Ironwood que la red rechaza; actualiza y vuelve a intentarlo.
3. Trabaja en una máquina en la que confíes. Prefiere el cifrado de disco completo. No compartas pantalla mientras una semilla, frase de contraseña o clave de gasto esté visible.
4. Ten preparada una dirección unificada de destino de una billetera mantenida que controles, como [ZODL](https://zodl.com/). Confirma la dirección en esa billetera antes de pegarla en Argos.

### Recuperación de semilla

1. Abre Argos y elige **I have my 24-word seed phrase**. Una recuperación de semilla no necesita un archivo de billetera.
2. Pega la frase y haz clic en **Validate seed**. Si indica que la semilla es válida, continúa.
3. Introduce una **altura de bloque de cumpleaños**, o la estimación más cercana de cuándo se creó la billetera. Una altura anterior es más lenta, pero más segura que adivinar demasiado tarde.
4. En los controles del servidor, usa el preajuste del servidor actual o introduce URL de lightwalletd. Las URL separadas por comas se prueban en orden. Ejemplos públicos:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Pega la dirección unificada de destino.
6. Haz clic en **start scan**. Esto puede tardar minutos o días según la altura de cumpleaños. Puedes salir y volver a abrir el mismo espacio de trabajo; el escaneo se reanuda.
7. Cuando termine el escaneo, revisa los saldos, la estimación de tarifa y el destino y luego haz clic en **sweep**.

Transmitir un barrido es irreversible. Conserva el archivo de billetera original hasta que se haya barrido cada pool pertinente y la billetera de destino muestre los fondos esperados. Una vez completada la recuperación, retira los secretos heredados en lugar de seguir utilizándolos para nueva actividad.

### Archivos de billetera y claves independientes

En la pantalla de bienvenida, **I have a wallet file** cubre un archivo Zecwallet Lite, un zcashd `wallet.dat` o claves de gasto extendidas Sapling independientes. La recuperación de claves de gasto Sprout independientes se gestiona mediante la ruta de recuperación Argos de Sprout/CLI.

Argos lee archivos de billetera sin modificarlos. Si la billetera está cifrada, introduce la frase de contraseña cuando se solicite; se utiliza en memoria y no se escribe en el disco. Revisa los recuentos de claves transparentes, Sapling y Sprout antes de iniciar un escaneo.

Las claves de visualización no se aceptan para un barrido porque no pueden autorizar gastos.

### Notas sobre Sprout

Una semilla Zecwallet Lite no deriva claves Sprout. Esas claves se generaron por separado. Recupera Sprout desde un zcashd `wallet.dat`, o desde una clave de gasto independiente en la CLI.

Si el archivo ya tiene datos de notas gastables y un testigo almacenado en caché, Argos puede ofrecer **Sweep Sprout funds** sin un escaneo de la red. De lo contrario, puede ejecutar un escaneo reanudable de bloques completos a través de la red P2P. Ese escaneo es grande y lento. El punto de control que escribe puede gastar, así que protégelo como el original.

El valor Sprout solo puede llegar a Sapling. Después de que los fondos Sapling estén confirmados y sean gastables, muévelos hacia **Ironwood** con una billetera actual que admita la cuenta Sapling recuperada. No te detengas en Sapling.

## Fondos recuperados y el pool Ironwood

Desde que se activó la actualización Ironwood (NU6.3) el 28 de julio de 2026, el pool Orchard es solo de gasto. No puede entrar nuevo valor en él, y el valor existente sale a través del turnstile hacia Ironwood.

Si tus fondos recuperados están en Orchard, muévelos a Ironwood utilizando el **flujo de migración integrado de una billetera actual**. Orchard es solo de salida después de NU6.3.

Zkool 6.30.0 es actual al 18 de septiembre de 2026 y admite Ironwood. Su diseño de migración se centra en la privacidad, pero no equivale a afirmar conformidad con ZIP 318. Otras billeteras actuales pueden usar una migración escalonada al estilo de ZIP 318. Sigue la pantalla de migración actual y las notas de lanzamiento de la billetera instalada en lugar de inventar manualmente un importe o calendario.

Una migración escalonada puede utilizar varias transacciones, por lo que la tarifa total puede ser mayor que una transferencia de una sola vez.

> **Los importes de migración son públicos.** Cuando el valor cruza el turnstile, el importe y la altura de bloque son visibles on-chain, aunque el remitente y el destinatario permanezcan blindados. Usa la política de migración privada/escalonada integrada de la billetera cuando la privacidad sea importante, y usa privacidad a nivel de red como Tor u otra capa de privacidad de confianza cuando corresponda. La privacidad de red puede ocultar tu vínculo de IP; no oculta el importe público del cruce.

## Recuperación profunda con ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) es un proyecto de recuperación Zingo Labs **en curso** centrado actualmente en archivos de billetera Zecwallet Lite y la migración de formatos de billetera. Su README dirige actualmente a los usuarios de recuperación de fondos a la opción de exportación **Zingolib** mientras se sigue desarrollando un soporte ZeWIF más completo.

Trátalo como una herramienta avanzada o para casos límite, no como la ruta de recuperación predeterminada. Para semillas Zecwallet Lite ordinarias, archivos de billetera, zcashd `wallet.dat` y claves de gasto independientes compatibles, prueba primero Argos. Verifica en una billetera mantenida cualquier elemento recuperado por ZExCavator antes de confiar en él.

## Recuperación profesional cuando no tienes la semilla

Si la semilla o clave ha desaparecido, no se puede iniciar una restauración autoalojada. Algunas personas en esa situación utilizan una empresa de recuperación profesional para contraseñas olvidadas, fallos de hardware o discos ilegibles.

Esa vía no es lo mismo que restaurar una semilla que aún tienes. No entregues una semilla funcional a nadie que se ofrezca a «recuperarla» por ti. La versión fraudulenta de este servicio es común.

[Unciphered](https://unciphered.com) es una empresa que realiza este trabajo internamente y ha aparecido en medios como Wired. Es un servicio general de recuperación de criptomonedas, no una herramienta específica de Zcash, y cobra por el trabajo. ZecHub no respalda a ninguna empresa de recuperación. Si eliges esta vía, confirma por tu cuenta el dominio oficial y asume que cualquiera que te envíe un mensaje directo primero es un estafador.

Si todavía tienes una semilla o clave de gasto funcional, empieza en su lugar con una ruta de recuperación autoalojada como Zkool o Argos en tu propia máquina.

## YWallet ya no recibe mantenimiento

YWallet fue durante mucho tiempo la herramienta de recuperación recomendada en esta página, y muchas guías antiguas todavía apuntan a ella.

Su desarrollador ahora indica que YWallet ya no admite Zcash desde la actualización Ironwood y dirige a los usuarios de Zcash a **Zkool**, el sucesor mantenido. Conserva el material antiguo de semilla/clave YWallet, pero no inicies una nueva migración Zcash en YWallet.

Si ya tienes material de recuperación Zcash de YWallet, restáuralo en Zkool mediante la ruta de semilla/clave compatible indicada anteriormente.

## Páginas relacionadas

- [Billeteras](/using-zcash/wallets) - qué billeteras reciben mantenimiento y su preparación para Ironwood, incluido Argos
- [Ironwood](/zcash-tech/ironwood) - qué cambió la actualización y por qué migran los fondos
- [Memos](/using-zcash/memos) - cómo funcionan los memos cifrados
- [Claves de visualización](/zcash-tech/viewing-keys) - acceso de solo lectura sin poder de gasto
- [Nodos Lightwallet](/zcash-tech/lightwallet-nodes) - endpoints públicos lightwalletd que puede usar Argos
- [Guía de usuario de Argos](https://argos.sovright.com/guide.html) - guía oficial de Sovright
- [Naomi Brockwell sobre herramientas de recuperación](https://x.com/naomibrockwell/status/2079146521405333526) - guía de Argos y una nota sobre recuperación profesional
