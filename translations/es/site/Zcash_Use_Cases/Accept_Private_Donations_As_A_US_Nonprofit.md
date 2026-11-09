# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> Acepta donaciones privadas de ZEC como organización sin fines de lucro de EE. UU.

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermedio - 10 min
</span>

> Esta página ofrece información general, no asesoramiento legal ni fiscal. Las normas fiscales de EE. UU. cambian, así que verifica cada paso con tu contador o asesor fiscal. Cada norma a continuación enlaza a su fuente IRS, verificada en octubre de 2026 con respecto a la Publicación 526 (para declaraciones de 2025) y al Formulario 8283 (revisión de diciembre de 2025). Las preguntas frecuentes sobre moneda virtual de IRS fueron redactadas para transacciones anteriores a 2025, así que compáralas con las directrices actuales.

## TL;DR

- Mantén las donaciones en una billetera [wallet] blindada [shielded] que controle tu organización, no en la billetera personal de un miembro del personal
- El IRS considera a ZEC como propiedad, por lo que una donación de ZEC es una contribución no monetaria
- Para una donación de $250 o más, envía al donante un acuse de recibo por escrito que describa ZEC pero que no le asigne un valor en dólares
- Para donaciones superiores a $5.000, el donante necesita una tasación cualificada y tú firmas su Formulario 8283
- Si vendes ZEC dentro de los tres años posteriores a recibirlo y firmaste la Sección B del Formulario 8283 del donante, presenta el Formulario 8282
- Un donante que permanece anónimo ante ti generalmente no puede solicitar una deducción de $250 o más

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> ¿Para quién es esto?

- Organizaciones benéficas 501(c)(3) de EE. UU., iglesias y grupos comunitarios que quieren aceptar ZEC
- Tesoreros, tenedores de libros y miembros de juntas directivas que establecen donaciones en criptomonedas
- Donantes que quieren saber qué necesita de ellos una organización sin fines de lucro

Para personas y creadores, consulta [Recibe donaciones de forma privada](/zcash-use-cases/receive-donations-privately).

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> El problema

La mayoría de los servicios de donaciones en criptomonedas para organizaciones benéficas de EE. UU. te proporcionan una dirección transparente [transparent], o convierten la donación por ti mediante una. En una dirección transparente, cualquiera puede ver cada donación, su importe y tu saldo. Un donante que entrega de forma privada a propósito pierde esa privacidad [privacy] en el momento en que llega la donación.

Una organización sin fines de lucro también tiene trámites que una persona no tiene: recibos de donantes, formularios IRS para donaciones mayores y una declaración anual. La privacidad y esos trámites pueden funcionar conjuntamente, siempre que los planifiques antes de que llegue la primera donación.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Qué se mantiene privado y qué no

| | Donación blindada a tu dirección blindada |
|---|---|
| El público | No puede ver al donante, tu dirección ni el importe |
| Tu organización | Ve el importe y cualquier memo [memo]; solo ve al donante si este se identifica |
| Tu contador | Ve lo que compartes, por ejemplo, con una [viewing key](/zcash-tech/viewing-keys) |
| Cuando vendes | Si tu exchange [exchange] acepta únicamente depósitos transparentes, el importe que sacas del pool [pool] blindado se vuelve público (consulta [el turnstile](/zcash-tech/the-turnstile)) |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Lo que necesitas

- Una política de aceptación de donaciones, aprobada por tu junta directiva, que cubra las criptomonedas
- Una [billetera](/using-zcash/wallets) con direcciones blindadas, controlada por la organización
- Una cuenta de exchange a nombre de la organización, si planeas convertir ZEC a dólares
- Un contador que haya gestionado donaciones no monetarias

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Guía paso a paso

### Paso 1: Decide tu política

Documenta y haz que tu junta directiva apruebe:
- Quién puede mover fondos y si dos personas deben aprobar cada movimiento
- Si vendes cada donación de inmediato o mantienes parte de ZEC
- Si aceptas donaciones anónimas y hasta qué importe

### Paso 2: Configura una billetera que controle la organización

- Crea la billetera en un dispositivo de la organización, no en un teléfono personal
- Guarda la frase semilla [seed phrase] sin conexión, con dos directivos que puedan acceder a ella individualmente
- Para un control compartido, consulta [Gestiona una tesorería comunitaria privada](/zcash-use-cases/private-community-treasury)

### Paso 3: Publica una dirección blindada

- Comparte una dirección exclusivamente blindada en tu página de donaciones. Una [dirección unificada](/using-zcash/unified-addresses) comienza con `u1`, pero también puede contener un receptor transparente, y entonces una donación desde una billetera solo transparente llega públicamente. Usa la dirección exclusivamente blindada de tu billetera si ofrece una.
- No publiques una dirección transparente (comienza con `t1` o `t3`)
- Pide a los donantes que quieran un recibo que incluyan su correo electrónico en el [memo](/using-zcash/memos). El memo está cifrado [encryption], por lo que solo tu organización puede leerlo.

### Paso 4: Registra cada donación

Para cada donación, registra:
- Fecha y hora de recepción
- Importe en ZEC
- Valor en dólares estadounidenses en ese momento y la fuente de precios que utilizaste
- ID de transacción [transaction] y memo

El IRS considera a ZEC como propiedad ([Aviso 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)), por lo que esto es una contribución no monetaria en tus libros. Para proporcionar a tu contador acceso de solo lectura, consulta [Mantener registros con ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec).

### Paso 5: Acusa recibo de donaciones de $250 o más

Un donante no puede deducir una sola donación de $250 o más sin un acuse de recibo por escrito tuyo ([Publicación 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)). Para una donación de ZEC, incluye:
- El nombre de tu organización
- La fecha en que la recibiste
- Una descripción de la donación, por ejemplo «1,5 ZEC». No le asignes un valor en dólares: valorar la donación es responsabilidad del donante.
- Si proporcionaste algo a cambio, por ejemplo «No se proporcionaron bienes ni servicios a cambio de esta contribución».

El donante debe tenerlo antes de presentar su declaración de impuestos ([Publicación 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)). Las organizaciones normalmente lo envían antes del 31 de enero del año siguiente; enviarlo de inmediato es lo más sencillo.

### Paso 6: Firma el Formulario 8283 para donaciones superiores a $5.000

Si un donante solicita más de $5.000, necesita una tasación cualificada. Las criptomonedas no cuentan como valores cotizados públicamente, por lo que la tasación se les aplica ([Publicación 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)). El donante te entrega el [Formulario 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf), y tú firmas la parte del receptor en la Sección B. Tu firma [signature] confirma que recibiste ZEC en esa fecha; no confirma el valor indicado por el donante ([IRS Preguntas frecuentes, P36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Paso 7: Convierte a dólares, si lo necesitas

- Verifica qué exchanges aceptan depósitos blindados en [Exchanges custodios](/using-zcash/custodial-exchanges). Muchos aceptan únicamente depósitos transparentes.
- Si el tuyo es exclusivamente transparente, mueve ZEC desde tu billetera blindada al exchange en un solo paso, en el momento de vender. Ese importe se vuelve público, pero tus otras donaciones y tu saldo permanecen privados.
- Si vendes ZEC dentro de los tres años posteriores a recibirlo y firmaste la Sección B del Formulario 8283 del donante, presenta [Formulario 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf) dentro de los 125 días posteriores a la venta y envía al donante una copia ([IRS Preguntas frecuentes, P37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Paso 8: Informa en tu declaración anual

Informa las donaciones de ZEC como contribuciones no monetarias en tu declaración de la serie Formulario 990, junto con el [Anexo M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990) si te corresponde. Pregunta a tu contador cómo incluir las donaciones anónimas.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Donantes anónimos: qué pueden y qué no pueden solicitar

- La privacidad frente al público no es lo mismo que el anonimato frente a ti. Un donante puede donar de forma privada y aun así compartir su correo electrónico en el memo para obtener un recibo.
- Un donante que permanece anónimo ante ti no puede obtener un acuse de recibo, por lo que no puede deducir una sola donación de $250 o más.
- Por encima de $5.000, el donante también necesita una tasación y tu firma en el Formulario 8283, lo que implica decirte quién es.
- Para el donante, una donación de ZEC mantenida durante más de un año generalmente es deducible por su valor justo de mercado, sin impuesto sobre ganancias de capital sobre la donación ([IRS Preguntas frecuentes, P34–P35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

Indica esto en tu página de donaciones, para que los donantes puedan elegir antes de donar.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Errores comunes que debes evitar

- Mantener donaciones en la billetera personal de un miembro del personal
- Publicar una dirección transparente o una dirección de depósito de un exchange como tu dirección de donaciones
- Incluir un valor en dólares en el acuse de recibo
- Vender dentro de los tres años y olvidar el Formulario 8282
- Prometer a donantes anónimos una deducción fiscal

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Resultado

Puedes:
- Aceptar ZEC sin exponer a tus donantes ni tu saldo
- Proporcionar a los donantes los documentos que necesitan para solicitar una deducción
- Mantener registros que tu contador y auditor puedan revisar

<br/>

## Fuentes

- [IRS: Preguntas frecuentes sobre transacciones de moneda virtual](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions) (P34–P37 cubren organizaciones benéficas)
- [IRS Aviso 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publicación 1771: Contribuciones benéficas, justificación y divulgación](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publicación 526: Contribuciones benéficas](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publicación 561: Determinación del valor de bienes donados](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Asesoramiento del abogado jefe 202302012: tasaciones para donaciones en criptomonedas](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Formulario 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) y [Formulario 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Relacionado

- [Recibe donaciones de forma privada](/zcash-use-cases/receive-donations-privately) - la misma idea para personas
- [Mantener registros con ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec) - memos y claves de visualización para tus libros
- [Claves de visualización](/zcash-tech/viewing-keys) - acceso de solo lectura para un contador o auditor
- [El turnstile](/zcash-tech/the-turnstile) - qué se vuelve público cuando ZEC sale de un pool blindado

<br/>

## Siguiente paso

- [Gestiona una tesorería comunitaria privada](/zcash-use-cases/private-community-treasury)

<br/>
