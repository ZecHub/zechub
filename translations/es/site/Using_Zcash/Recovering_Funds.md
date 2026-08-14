<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Recuperación de fondos de wallets de Zcash

**¿Por qué guardar tu clave privada?**

Las claves privadas son el secreto de la seguridad de tus activos digitales. Mantenerlas a salvo y no compartirlas nunca con terceros es esencial.

> En este contexto, una **frase semilla** puede verse como el equivalente de una clave privada.

Al mantener el control sobre tus claves privadas, el proceso de recuperación siempre es posible. Existen 2 tipos de claves privadas de Zcash (transparentes y blindadas), y puedes importarlas fácilmente en tu wallet, ya sea usando la función Sweep Funds o importándolas como una cuenta nueva. Al conservar el control de tus claves privadas, mantienes el control total sobre tus activos, garantizando propiedad, seguridad y tranquilidad.

# Seguridad y responsabilidad

Es crucial que los usuarios comprendan los riesgos que implica manejar claves privadas y que las mantengan protegidas contra accesos no autorizados. La seguridad de los fondos depende de la responsabilidad del usuario de resguardar sus claves privadas.

> **Antes de empezar:** las guías de recuperación solían apuntar a Ywallet. Su desarrollador ha confirmado que no se actualizará para la actualización de red Ironwood (NU6.3), por lo que ya no puede seguir la cadena. Usa **Zkool**, que es del mismo desarrollador y es su sucesor mantenido. Consulta [Ywallet ya no recibe mantenimiento](#ywallet-is-no-longer-maintained) al final de esta página.

## Recuperación de fondos con Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) es el sucesor de Ywallet, del mismo desarrollador, y admite recuperación tanto transparente como blindada.

Aquí se cubren dos situaciones:

1. **Restaurar una cuenta** a partir de una frase semilla, clave privada o viewing key
2. **Mover fondos** fuera de una wallet que solo admitía direcciones transparentes

### 1) Restaurar una cuenta

1. Instala Zkool desde la [página de lanzamientos](https://github.com/hhanh00/zkool2/releases) y ábrelo
2. En el **Account Manager** (la página principal), toca el botón **+** para ir a la pantalla **New Account**
3. Introduce un **Account Name** para identificar esta cuenta
4. Activa **Restore Account?**. Esto mostrará los campos de clave y altura de nacimiento
5. Pega tu clave en **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool acepta una frase semilla, una clave secreta Sapling, una clave extendida transparente o una viewing key
6. Introduce una **Birth Height** si sabes aproximadamente cuándo se usó la wallet por primera vez. Esto le indica a Zkool dónde empezar a escanear, lo que ahorra mucho tiempo

![Pantalla New Account de Zkool con Restore Account y Advanced Options activados](/content-images/zkool-restore-account-60b1d2777e.webp)

> **¿No tienes birth height?** Déjalo en blanco y confirma la advertencia. Zkool escaneará desde el inicio de la cadena, lo que es más lento pero no omitirá nada. Si tus fondos son anteriores a la actualización Sapling de octubre de 2018, déjalo en blanco en lugar de adivinar una altura posterior, o el escaneo podría omitir por completo tus transacciones.

7. Guarda la cuenta y luego sincronízala

### Restaurar una semilla de otra wallet

Si la semilla proviene de otra wallet y el saldo parece incorrecto después de sincronizar, la causa suele ser la derivación de la dirección de cambio.

Activa el interruptor **Advanced Options**, más abajo en la misma pantalla New Account, y activa **Use Internal Change** antes de guardar.

No todas las wallets derivan las direcciones de cambio de la misma manera. Restaurar una semilla de ZODL en Zkool sin esta opción puede mostrar un saldo al que le faltan tus notas de cambio, lo que parece una pérdida de fondos, pero no lo es. La ayuda emergente de Zkool para este interruptor sigue haciendo referencia a Zashi, que es como antes se llamaba ZODL.

Hay dos campos más dentro de **Advanced Options**:

- **Extra Passphrase (optional)**, solo si la wallet original usaba una
- **Account Index**, si la wallet original tenía varias cuentas en una sola semilla. Los fondos podrían estar bajo un índice diferente

> **Estos dos solo aparecen una vez que haya una frase semilla válida en el campo Key.** Con el campo vacío, o si contiene una clave privada o una viewing key, Zkool muestra solo **Use Internal Change** y **H/W Ledger**. Pega primero la semilla y luego abre Advanced Options.

### 2) Mover fondos desde una wallet solo transparente

Si tus fondos están en una wallet que nunca admitió direcciones blindadas (Trust, Coinomi, Guarda y similares), restaura primero la cuenta y luego mueve los fondos al pool blindado.

1. Restaura la cuenta usando los pasos anteriores
2. Abre la cuenta y ve a la página **Receive Funds**
3. Toca la lupa en la barra superior (**Find other transparent addresses**). Las wallets que rotan direcciones, como Ledger y Exodus, generan muchas direcciones transparentes a partir de una sola semilla, y esto encuentra las que contienen fondos
4. **Reinicia y sincroniza la cuenta después.** Las direcciones recién encontradas solo detectan sus saldos en el siguiente escaneo, así que si omites esto parecerá que el barrido no encontró nada
5. Ve a la página **Send**. Cerca del saldo encontrarás tres botones con iconos. No tienen etiquetas de texto, así que pasa el cursor por encima o mantén pulsado para ver sus nombres:
   - **Shield One** (escudo contorneado) mueve una dirección transparente a la vez
   - **Shield All** (escudo sólido) mueve todo de todas las direcciones transparentes de una vez
   - **Unshield All** (candado abierto) hace lo contrario, hacia una dirección transparente

> **Shield One es la opción más privada.** Blindar varias direcciones en una sola transacción las vincula públicamente como pertenecientes a la misma persona. El propio Zkool advierte sobre esto antes de ejecutar Shield All.

6. Revisa la transacción y envíala

Unshield All es útil al retirar a un exchange que solo acepta direcciones transparentes. Los botones de blindaje solo aparecen si la cuenta tiene una dirección blindada, y Unshield All solo si tiene una transparente.

## Fondos recuperados y el pool Ironwood

Desde que la actualización Ironwood (NU6.3) se activó el 28 de julio de 2026, el pool Orchard es solo de gasto. No puede entrar nuevo valor en él, y el valor existente sale a través del turnstile hacia Ironwood.

Si tus fondos recuperados están en Orchard, tendrán que migrar antes de comportarse con normalidad. Abre el menú de la cuenta y elige **Note Migration**. La opción solo aparece cuando realmente hay algo que migrar.

La pantalla se titula **Orchard to Ironwood Migration** y se ejecuta en dos fases. Primero divide las notas no estándar en denominaciones estándar y luego mueve esas notas una por una. **Migration Speed** es un deslizador de Ultra Fast a Slow que establece el retraso aleatorio entre pasos. **Start Migration** ejecuta el proceso por etapas en segundo plano, y puedes cerrar la página y reanudarlo más tarde. **One Shot** lo hace en una sola pasada.

Cada paso es su propia transacción, por lo que cada uno paga una comisión.

> **Los importes de la migración son públicos.** Cuando el valor cruza el turnstile, el importe y la altura del bloque son visibles en la cadena, aunque el remitente y el receptor permanezcan blindados. Los importes distintivos pueden identificarte, así que prefiere la migración por etapas a una velocidad más lenta en lugar de one shot, y considera enrutar primero tu conexión a través de Tor o una VPN para que tu dirección IP no quede vinculada al importe que moviste.

## Recuperación profunda con ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) es una herramienta de recuperación de Zingo Labs para casos en los que una restauración normal no funciona, como un archivo de wallet dañado o parcial.

> Su última actualización es anterior a las recientes actualizaciones de red, así que considérala un último recurso y verifica cualquier clave recuperada en una wallet mantenida antes de confiar en el resultado.

## Ywallet ya no recibe mantenimiento

Ywallet fue durante mucho tiempo la herramienta de recuperación recomendada en esta página, y muchas guías antiguas todavía apuntan a ella.

Su desarrollador ha confirmado que no se actualizará para Ironwood. Una wallet que no admite las reglas de consenso actuales no puede construir transacciones válidas, por lo que ya no puede usarse para mover fondos recuperados. **Zkool**, del mismo desarrollador, es el sucesor mantenido y es lo que ahora usa esta página.

Si ya tienes fondos guardados en Ywallet, restaura la misma frase semilla en Zkool usando los pasos anteriores.

## Páginas relacionadas

- [Wallets](/using-zcash/wallets) - qué wallets reciben mantenimiento y su preparación para Ironwood
- [Ironwood](/zcash-tech/ironwood) - qué cambió con la actualización y por qué migran los fondos
- [Memos](/using-zcash/memos) - cómo funcionan los memos cifrados
- [Viewing Keys](/zcash-tech/viewing-keys) - acceso de solo lectura sin capacidad de gasto
