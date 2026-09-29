<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Recuperación de fondos de wallet de Zcash

**¿Por qué conservar tu material de recuperación?**

Las semillas, claves de gasto, claves de visualización y archivos de wallet no son intercambiables. Una frase semilla puede derivar claves de wallet para muchas wallets, pero no reemplaza todas las claves heredadas ni todos los archivos de wallet. Una clave de visualización puede revelar actividad blindada, pero no puede autorizar un gasto.

La recuperación depende de contar con la autoridad de gasto correcta y una ruta actualmente compatible para el pool que contiene los fondos. Mantén privado el material de recuperación y nunca compartas semillas, claves de gasto ni archivos de wallet con alguien en quien no confíes.

# Seguridad y responsabilidad

Es crucial que los usuarios comprendan los riesgos involucrados al manejar claves privadas y que las mantengan protegidas contra accesos no autorizados. La seguridad de los fondos depende de la responsabilidad del usuario de proteger sus claves privadas.

## Fondos blindados heredados: Sprout, Sapling y Orchard

Los ZEC blindados más antiguos pueden necesitar migrarse como parte de la recuperación. La ruta depende de qué pool blindado contiene actualmente los fondos.

> **NU7 está previsto para el 5 de noviembre de 2026.** Una vez que se active, la ruta actual de migración fuera del pool heredado Sprout dejará de funcionar.
>
> Si todavía tienes ZEC en el pool Sprout, migra antes de la actualización. Después de la activación, las herramientas existentes ya no podrán mover fondos de Sprout a Sapling, direcciones transparentes ni ningún otro destino.
>
> Si estás viendo esta página **después de que se haya activado NU7**, **Sprout quedará congelado** hasta que haya disponible un método de recuperación futuro, el cual no está previsto actualmente.

## La respuesta en una página

| Tus fondos están en | Ruta de migración | Qué hacer |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Si tienes `wallet.dat` o una clave de gasto Sprout independiente, prueba primero la ruta de recuperación actual de Argos. Si Argos no es adecuado, utiliza la ruta sidecar heredada en la guía de campo completa. Sprout debe llegar primero a Sapling y luego continuar hacia Ironwood. Esta ruta es sensible al tiempo debido a NU7. |
| **Sapling** | **Sapling → Ironwood** | No se necesita un entorno de recuperación Sprout. Usa una wallet actual que pueda recuperar o gastar tu cuenta específica de Sapling y construir transacciones Ironwood. La compatibilidad con Ironwood por sí sola no prueba la compatibilidad para recuperar Sapling heredado. |
| **Orchard** | **Orchard → Ironwood** | Orchard es solo de salida. Utiliza el flujo integrado de migración de Orchard a Ironwood de una wallet actual compatible. Consulta [Fondos recuperados y el pool Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Flujo de decisión de cinco preguntas

1. **¿Es Sprout?** Una frase semilla por sí sola apunta a una ruta de recuperación de la era posterior a Sapling/Orchard, no a Sprout. Una dirección `zc...`, o una wallet restaurada que informa un saldo Sprout, apunta a Sprout.
2. **¿Qué material de recuperación tienes?** Busca `wallet.dat`, la computadora antigua o el datadir, una copia de seguridad de `z_exportwallet` o una clave de gasto Sprout exportada. Una dirección `zc...` por sí sola no basta.
3. **¿Argos o el sidecar heredado?** Si tienes `wallet.dat` o una clave de gasto Sprout independiente y simplemente quieres retirar los fondos, prueba primero [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Utiliza la ruta sidecar heredada de la guía de campo completa si Argos no puede manejar el material o si deseas tener toda la pila de recuperación bajo tu propio control.
4. **¿Ya tienes un datadir zcashd sincronizado y sin poda?** Esto importa solo para la ruta sidecar heredada. Copia datos existentes del nodo únicamente después de un apagado limpio; de lo contrario, la guía de campo cubre las opciones de instantánea y desde cero.
5. **¿Dónde terminan los fondos?** **Ironwood.** Sprout pasa primero por Sapling porque no existe una única transacción directa de Sprout a Ironwood. No te detengas en Sapling.

### Guía de campo completa de migración de pools ZEC

Para consultar la referencia completa de migración, incluidas rutas de recuperación detalladas, comandos, comisiones, requisitos de hardware, consideraciones de privacidad, solución de problemas y notas sobre las fuentes, lee la guía completa.

**Versión 1.1 · Actualizada el 18 de septiembre de 2026**

[Lee la guía de campo completa de migración de pools ZEC en ZecHub](/research/zec-pool-migration/view)

> **Antes de empezar:** establece primero **qué estás recuperando y qué material de recuperación aún conservas**. Una semilla de wallet actual o una clave de gasto compatible que no sea de Sprout puede necesitar solo una restauración normal. El material más antiguo —como una semilla de ZecWallet Lite, una `wallet.dat` heredada o una clave de gasto Sapling o Sprout independiente— puede requerir una ruta de recuperación dedicada.
>
> Si crees que los fondos están en **Sprout**, confirma que aún tienes autoridad de gasto antes de dedicar tiempo a la recuperación. Una dirección `zc...` o solo material de visualización no es suficiente para mover los fondos.
>
> **YWallet ya no admite Zcash después de Ironwood.** Utiliza **Zkool** para restauraciones ordinarias que no sean de Sprout desde semillas y claves compatibles. Utiliza **Argos** para la recuperación de ZecWallet Lite, archivos de wallet heredados y claves de gasto Sapling/Sprout independientes. Para Sprout, Argos es la primera ruta que se debe probar; la guía de campo completa cubre la alternativa sidecar heredada.
>
> Utiliza la tabla siguiente según **lo que realmente tienes**, no según la herramienta de recuperación que recuerdes haber usado.

| Tienes | Empieza aquí |
| --- | --- |
| Una frase semilla o una **clave de gasto que no sea Sprout** compatible de una wallet actual o mantenida recientemente, incluido material antiguo de YWallet Zcash | [Zkool](#fund-recovery-with-zkool) |
| Solo una **clave de visualización** | Zkool puede importar claves de visualización compatibles para acceso de solo lectura, pero una clave de visualización no puede autorizar gastos de recuperación. Busca la semilla o clave de gasto correspondiente. |
| Una semilla de 24 palabras de **ZecWallet Lite** | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Un archivo de ZecWallet Lite o zcashd `wallet.dat`, o una clave de gasto extendida Sapling / Sprout independiente | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Al 18 de septiembre de 2026, v1.3.0 es la versión actual y preferida; utiliza v1.2.0 o posterior para recuperación de `wallet.dat` y Sprout. |
| Material Sprout que Argos no puede manejar, o una recuperación en la que deseas tener los componentes heredados bajo tu propio control | Utiliza la ruta sidecar heredada en la [guía de campo completa](/research/zec-pool-migration/view). |
| No hay semilla ni clave de gasto funcional, pero hay un dispositivo bloqueado, contraseña olvidada o disco averiado | [Recuperación profesional](#professional-recovery-when-you-do-not-have-the-seed). Nunca envíes una semilla o clave de gasto funcional a alguien que te contacte sin que lo hayas solicitado. |

## Recuperación de fondos con Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) es el sucesor mantenido de Zcash a YWallet del mismo desarrollador. Admite rutas de recuperación transparentes y blindadas modernas, incluidas claves heredadas Sapling, pero **no Sprout**.

Aquí se cubren dos situaciones:

1. **Restaurar una cuenta** desde una frase semilla, clave privada o clave de visualización
2. **Barrer fondos** de una wallet que solo admitió direcciones transparentes

### 1) Restaurar una cuenta

1. Instala Zkool desde la [página de versiones](https://github.com/hhanh00/zkool2/releases) y ábrelo
2. En el **Administrador de cuentas** (la página principal), toca el botón **+** para llegar a la pantalla **Nueva cuenta**
3. Introduce un **Nombre de cuenta** para identificar esta cuenta
4. Activa **¿Restaurar cuenta?**. Esto muestra los campos de clave y altura de nacimiento
5. Pega tu clave en **Clave (frase semilla, clave privada o Viewing Key)**. Zkool acepta frases semilla, claves secretas Sapling, claves extendidas transparentes y claves de visualización compatibles. Una clave de visualización es de solo lectura y no puede autorizar un gasto.
6. Introduce una **altura de nacimiento** para una cuenta antigua. Zkool no escanea bloques anteriores a esta altura, así que elige una altura anterior a la primera actividad de la wallet si no estás seguro. Una altura de nacimiento establecida demasiado tarde puede hacer que parezca que faltan transacciones reales.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Guarda la cuenta y luego sincronízala

### Restaurar una semilla desde una wallet diferente

Si la semilla proviene de una wallet que sigue ZIP 316 —incluidas ZODL (antes Zashi), Zingo o zcashd— activa **Opciones avanzadas** y habilita **Usar cambio interno** antes de guardar.

ZIP 316 utiliza una dirección interna/de cambio independiente. Restaurar una de estas cuentas sin **Usar cambio interno** puede hacer que parezca que faltan salidas de cambio, aunque los fondos aún existan.

Hay dos campos más en **Opciones avanzadas**:

- **Frase de contraseña adicional (opcional)**, solo si la wallet original utilizaba una
- **Índice de cuenta**, si la wallet original tenía varias cuentas en una semilla. Los fondos pueden estar bajo otro índice

> **Estos dos solo aparecen una vez que haya una frase semilla válida en el campo Clave.** Con el campo vacío, o conteniendo una clave privada o de visualización, Zkool muestra únicamente **Usar cambio interno** y **H/W Ledger**. Pega primero la semilla y luego abre Opciones avanzadas.

### 2) Barrer fondos de una wallet solo transparente

Si la wallet o cuenta antigua contenía solo **ZEC transparentes**, restaura primero la cuenta, encuentra todas las direcciones transparentes utilizadas y luego mueve los fondos a un destino blindado actual que controles. No supongas que una marca antigua de wallet siempre fue solo transparente; algunos productos añadieron compatibilidad blindada en versiones posteriores.

1. Restaura la cuenta siguiendo los pasos anteriores
2. Abre la cuenta y ve a la página **Recibir fondos**
3. Toca la lupa de la barra superior (**Buscar otras direcciones transparentes**). Las wallets que rotan direcciones, como Ledger y Exodus, generan muchas direcciones transparentes a partir de una semilla, y esto encuentra las que contienen fondos
4. **Después, restablece y sincroniza la cuenta.** Las direcciones recién encontradas solo recogen sus saldos en el siguiente escaneo, así que omitir esto hace que parezca que el barrido no encontró nada
5. Ve a la página **Enviar**. Cerca del saldo encontrarás tres botones con iconos. No tienen etiquetas de texto, así que pasa el cursor por encima o mantén pulsado para ver sus nombres:
   - **Blindar una** (escudo delineado) mueve una dirección transparente a la vez
   - **Blindar todas** (escudo sólido) mueve todo desde todas las direcciones transparentes de una vez
   - **Desblindar todas** (candado abierto) va en la otra dirección, hacia una dirección transparente

> **Blindar una es la opción más privada.** Blindar varias direcciones en una transacción las vincula públicamente como pertenecientes a la misma persona. Zkool advierte sobre esto antes de ejecutar Blindar todas.

6. Revisa la transacción y envíala

Desblindar todas resulta útil al retirar a un exchange que solo acepta direcciones transparentes. Los botones de blindaje aparecen solo si la cuenta tiene una dirección blindada, y Desblindar todas solo si tiene una transparente.

## Recuperación de ZecWallet Lite y wallets heredadas con Argos

[ZecWallet Lite](https://github.com/adityapk00/zecwallet-lite) ya no recibe mantenimiento y su repositorio está archivado. Su derivación de semillas difiere de la estructura utilizada por las wallets actuales, por lo que importar la misma frase en una wallet moderna puede omitir fondos mantenidos en las direcciones derivadas adicionales de ZecWallet Lite. [Argos](https://argos.sovright.com), de Sovright, es un espacio de trabajo de recuperación de escritorio creado para este y otros casos de recuperación heredados.

Argos lee semillas y archivos de wallet de ZecWallet Lite, zcashd `wallet.dat`, claves de gasto extendidas Sapling independientes y material de gasto Sprout. Para Sprout, una semilla de ZecWallet Lite por sí sola no es suficiente porque esas claves se generaron por separado. Argos es una herramienta de recuperación, no una wallet de uso diario: inspecciona el material de origen localmente, escanea y luego barre hacia una wallet mantenida que controles.

Least Authority [auditó](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) la herramienta. La recuperación en sí es gratuita. Durante el barrido puede aparecer una donación opcional a Sovright.

> **Nunca escribas una semilla en un sitio web.** El sitio de Argos es solo para la descarga y la [guía de usuario](https://argos.sovright.com/guide.html). Las claves permanecen en la aplicación de escritorio firmada. La validación es local frente a la suma de comprobación BIP-39. El campo de semilla se borra cuando comienza el escaneo. Cualquiera que te envíe un mensaje pidiendo esa semilla «para ayudarte a recuperar tus fondos» está intentando estafarte.

### Antes de abrir Argos

1. Descarga la aplicación de escritorio desde el sitio [oficial de Argos](https://argos.sovright.com) o la [página de versiones de GitHub](https://github.com/sovright/argos/releases). Verifica las sumas de comprobación o firmas cuando se publiquen.
2. Utiliza la versión actual de Argos. Al 18 de septiembre de 2026, **v1.3.0** es la versión actual y preferida. Utiliza **v1.2.0 o posterior para la recuperación de `wallet.dat` y Sprout**. Las compilaciones anteriores a 1.1.0 aún pueden escanear, pero construyen barridos previos a Ironwood que la red rechaza; actualiza e inténtalo de nuevo.
3. Trabaja en una máquina en la que confíes. Prefiere el cifrado de disco completo. No compartas pantalla mientras una semilla, frase de contraseña o clave de gasto sea visible.
4. Ten preparada una dirección de destino Unified Address de una wallet mantenida que controles, como [ZODL](https://zodl.app/). Confirma la dirección en esa wallet antes de pegarla en Argos.

### Recuperación mediante semilla

1. Abre Argos y elige **Tengo mi frase semilla de 24 palabras**. Una recuperación mediante semilla no necesita un archivo de wallet.
2. Pega la frase y haz clic en **Validar semilla**. Si indica que la semilla es válida, continúa.
3. Introduce una **altura de bloque de cumpleaños**, o la estimación más cercana de cuándo se creó la wallet. Una altura anterior es más lenta, pero más segura que estimar una fecha demasiado tardía.
4. En los controles del servidor, utiliza el ajuste preestablecido del servidor actual o introduce URL de lightwalletd. Las URL separadas por comas se prueban en orden. Ejemplos públicos:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Pega la dirección de destino Unified Address.
6. Haz clic en **iniciar escaneo**. Esto puede tardar minutos o días según la altura de cumpleaños. Puedes salir y volver a abrir el mismo espacio de trabajo; el escaneo se reanuda.
7. Cuando termine el escaneo, revisa los saldos, la estimación de comisión y el destino; luego haz clic en **barrer**.

La difusión de un barrido es irreversible. Conserva el archivo de wallet original hasta que se haya barrido cada pool relevante y la wallet de destino muestre los fondos esperados. Una vez completada la recuperación, retira los secretos heredados en lugar de seguir utilizándolos para actividad nueva.

### Archivos de wallet y claves independientes

En la pantalla de bienvenida, **Tengo un archivo de wallet** cubre un archivo de ZecWallet Lite, un zcashd `wallet.dat` o claves de gasto extendidas Sapling independientes. La recuperación de claves de gasto Sprout independientes se maneja mediante la ruta/CLI de recuperación Sprout de Argos.

Argos lee archivos de wallet sin modificarlos. Si la wallet está cifrada, introduce la frase de contraseña cuando se solicite; se utiliza en memoria y no se escribe en el disco. Revisa los recuentos de claves transparentes, Sapling y Sprout antes de comenzar un escaneo.

No se aceptan claves de visualización para un barrido porque no pueden autorizar gastos.

### Notas sobre Sprout

Una semilla de ZecWallet Lite no deriva claves Sprout. Esas claves se generaron por separado. Recupera Sprout desde un zcashd `wallet.dat` o desde una clave de gasto independiente en la CLI.

Si el archivo ya contiene datos de notas utilizables y un testigo en caché, Argos puede ofrecer **Barrer fondos Sprout** sin un escaneo de la cadena. De lo contrario, puede ejecutar un escaneo de bloques completos reanudable a través de la red P2P. Ese escaneo es grande y lento. El punto de control que escribe permite gastar, así que protégelo como el archivo de wallet original.

El valor de Sprout solo puede llegar a Sapling. Una vez que los fondos de Sapling estén confirmados y se puedan gastar, muévelos a **Ironwood** con una wallet actual que admita la cuenta recuperada de Sapling. No te detengas en Sapling.

## Fondos recuperados y el pool Ironwood

Desde que la actualización Ironwood (NU6.3) se activó el 28 de julio de 2026, el pool Orchard es solo de gasto. No puede entrar nuevo valor y el valor existente sale a través del torniquete hacia Ironwood.

Si tus fondos recuperados están en Orchard, muévelos a Ironwood mediante el **flujo de migración integrado de una wallet actual**. Orchard es solo de salida después de NU6.3.

Zkool 6.30.0 es la versión actual al 18 de septiembre de 2026 y admite Ironwood. Su diseño de migración está enfocado en la privacidad, pero no equivale a afirmar conformidad con ZIP 318. Otras wallets actuales pueden utilizar una migración por etapas al estilo ZIP 318. Sigue la pantalla de migración actual y las notas de versión de la wallet instalada, en vez de inventar un importe o calendario manual.

Una migración por etapas puede utilizar varias transacciones, por lo que la comisión total puede ser mayor que la de una transferencia de una sola vez.

> **Los importes de migración son públicos.** Cuando el valor cruza el torniquete, el importe y la altura del bloque son visibles en la cadena, aunque el remitente y el receptor permanezcan blindados. Utiliza la política de migración privada/por etapas integrada de la wallet cuando la privacidad sea importante, y utiliza privacidad a nivel de red, como Tor u otra capa de privacidad de confianza cuando sea apropiado. La privacidad de red puede ocultar tu vínculo de IP; no oculta el importe público del cruce.

## Recuperación profunda con ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) es un proyecto de recuperación Zingo Labs **en desarrollo** que actualmente se centra en archivos de wallet de ZecWallet Lite y migración de formatos de wallet. Su README actualmente dirige a los usuarios que necesitan recuperar fondos a la opción de exportación de **Zingolib** mientras se sigue desarrollando una compatibilidad ZeWIF más completa.

Trátalo como una herramienta avanzada o para casos límite, no como la ruta de recuperación predeterminada. Para semillas ordinarias de ZecWallet Lite, archivos de wallet, zcashd `wallet.dat` y claves de gasto independientes compatibles, prueba primero Argos. Verifica en una wallet mantenida todo lo recuperado por ZExCavator antes de depender de ello.

## Recuperación profesional cuando no tienes la semilla

Si la semilla o la clave se ha perdido, no se puede iniciar una restauración autoalojada. Algunas personas en esa situación utilizan una empresa de recuperación profesional para contraseñas olvidadas, fallos de hardware o discos ilegibles.

Esa ruta no es lo mismo que restaurar una semilla que aún conservas. No entregues una semilla funcional a nadie que se ofrezca a «recuperarla» por ti. La versión fraudulenta de este servicio es común.

[Unciphered](https://unciphered.com) es una empresa que realiza este trabajo internamente y ha aparecido en medios como [Wired](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). Es un servicio general de recuperación de criptomonedas, no una herramienta específica de Zcash, y cobra por el trabajo. ZecHub no respalda a ninguna empresa de recuperación. Si eliges esta ruta, confirma tú mismo el dominio oficial y asume que cualquiera que te envíe primero un mensaje directo es un estafador.

Si todavía tienes una semilla o clave de gasto funcional, comienza en su lugar con una ruta de recuperación autoalojada como Zkool o Argos en tu propia máquina.

## YWallet ya no recibe mantenimiento

YWallet fue durante mucho tiempo la herramienta de recuperación recomendada en esta página, y muchas guías antiguas todavía apuntan a ella.

Su desarrollador ahora afirma que YWallet ya no admite Zcash desde la actualización Ironwood y dirige a los usuarios de Zcash hacia **Zkool**, el sucesor mantenido. Conserva el material de semilla/claves antiguo de YWallet, pero no inicies una nueva migración de Zcash en YWallet.

Si ya tienes material de recuperación Zcash de YWallet, restáuralo en Zkool usando la ruta compatible de semilla/clave anterior.

## Páginas relacionadas

- [Wallets](/using-zcash/wallets) - qué wallets reciben mantenimiento y su preparación para Ironwood, incluida Argos
- [Ironwood](/zcash-tech/ironwood) - qué cambió la actualización y por qué migran los fondos
- [Memos](/using-zcash/memos) - cómo funcionan los memos cifrados
- [Claves de visualización](/zcash-tech/viewing-keys) - acceso de solo lectura sin capacidad de gasto
- [Nodos lightwallet](/zcash-tech/lightwallet-nodes) - endpoints públicos de lightwalletd que Argos puede utilizar
- [Guía de usuario de Argos](https://argos.sovright.com/guide.html) - guía oficial de Sovright
- [Naomi Brockwell sobre herramientas de recuperación](https://x.com/naomibrockwell/status/2079146521405333526) - guía de Argos y una nota sobre recuperación profesional
