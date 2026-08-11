# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Inicia sesión con Zcash

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Intermedio - 7 min</span>

## TL;DR

- Inicia sesión demostrando que controlas una dirección de Zcash, en lugar de usar una contraseña
- Se usan dos diseños: **firmar un desafío** o **enviar un pago blindado con un código en el memo**
- Como las direcciones blindadas ocultan el saldo y el historial, demostrar control no expone tus finanzas
- El patrón está en una fase temprana. Aún no existe un estándar ratificado y las implementaciones no interoperan

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> ¿Para quién es esto?

- Desarrolladores que quieren inicio de sesión sin contraseña sin recopilar datos personales
- Usuarios que preferirían no entregar una dirección de correo electrónico a cada sitio
- Cualquiera que quiera iniciar sesión sin vincular su historial financiero a una cuenta

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> El problema

La mayoría de las opciones de inicio de sesión filtran algo:

- **Las contraseñas y el correo electrónico** crean una cuenta vinculada a tu identidad, y ambos terminan en filtraciones de datos
- **El inicio de sesión social** le dice al proveedor de identidad en qué lugares inicias sesión y cuándo
- **El inicio de sesión con wallet en cadenas transparentes** es peor de lo que parece. Conectar una wallet puede entregarle al sitio todo tu saldo y tu historial de transacciones, de forma permanente

Por lo general estás eligiendo entre conveniencia y divulgación.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> ¿Por qué Zcash?

Zcash separa *demostrar control* de *revelar las finanzas*:

- **Las direcciones blindadas** mantienen privados los saldos y el historial de transacciones, así que demostrar que posees una no dice nada sobre lo que tienes
- **Los memos cifrados** pueden llevar en privado un código de inicio de sesión de un solo uso dentro de una transacción
- **Las Viewing Keys** permiten divulgación selectiva, por lo que a una app se le puede dar acceso de lectura exactamente a lo que necesita y nada más

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Cómo funciona

Han surgido dos enfoques. Ambos terminan con la app teniendo un identificador estable para ti y sin contraseña.

### Enfoque 1: Firmar un desafío

1. La app genera un desafío aleatorio de un solo uso
2. Tu wallet firma ese desafío con la clave detrás de tu dirección
3. La app verifica la firma y te inicia sesión

No se transmite nada a la red, así que no hay comisión ni espera por un bloque. La especificación relevante es [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304), que sigue siendo un borrador, por lo que el soporte de firma de mensajes en wallets varía.

### Enfoque 2: Demuéstralo con un pago blindado

1. La app genera un código de un solo uso y muestra una solicitud de pago
2. Envías una pequeña transacción blindada con ese código en el memo
3. La app observa el memo, hace coincidir el código y te inicia sesión

Esto funciona con las wallets que ya admiten memos hoy, que son la mayoría. La contrapartida es que cuesta una comisión de red y tienes que esperar la confirmación.

### Mantener privada la dirección

Una app no tiene que almacenar tu dirección para reconocerte. Algunas implementaciones la hashean junto con un valor específico de la aplicación, de modo que cada sitio ve un identificador distinto pero estable para el mismo usuario. Eso evita que los sitios comparen datos para vincular tus cuentas.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Compensaciones

Vale la pena entenderlas antes de construir sobre esto o depender de ello.

| | Desafío firmado | Pago blindado |
|---|---|---|
| Costo | Gratis | Comisión de red por cada inicio de sesión |
| Velocidad | Instantáneo | Espera la confirmación |
| Soporte de wallet | Limitado, ZIP 304 es un borrador | Amplio, solo necesita memos |
| Deja un registro en cadena | No | Sí, existe una transacción |

Limitaciones compartidas:

- **No hay recuperación de cuenta por defecto.** Perder la clave significa perder la cuenta, a menos que la app diseñe una vía de recuperación
- **La reutilización de direcciones puede vincularte.** Usar la misma dirección en muchos sitios recrea el problema del rastreo, por eso importan los identificadores específicos de la aplicación
- **No hay un estándar ratificado.** Cada proyecto tiene su propio esquema, así que un inicio de sesión construido para uno no funciona con otro
- **No es anonimato por sí solo.** Oculta tus finanzas a la app, pero la app igualmente puede perfilar lo que haces una vez que estás dentro

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Errores comunes que debes evitar

- Reutilizar un código de desafío. Cada código debería ser de un solo uso y expirar rápido, o uno capturado puede reproducirse
- Pedir a los usuarios que envíen una cantidad significativa para iniciar sesión. El pago es una prueba, así que la cantidad debería ser trivial
- Almacenar la dirección sin procesar cuando un identificador específico de la aplicación haría el mismo trabajo
- Suponer que la firma de mensajes funciona en todas partes. Revisa las wallets que tus usuarios realmente tienen
- Tratar un memo como secreto después del hecho. Demuestra que el remitente actuó, no es una contraseña

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Proyectos que exploran esto

Estos fueron creados para la categoría **Zcash Login** de [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon). Son experimentos más que productos terminados, y muestran lo diferente que puede construirse la misma idea.

- **ZecAuth** - un protocolo de conexión de wallet para Zcash, en el espíritu de lo que hace WalletConnect en otros lugares. La app muestra un código QR o un enlace `zecauth://` que lleva un desafío junto con las capacidades que está solicitando, como iniciar sesión, solicitudes de pago o acceso de visualización. Sin transacción, sin comisión, sin interacción con la cadena. Incluye una especificación escrita del protocolo junto con el código
- **ZShield** - convierte una dirección blindada en un DID de W3C y una identidad OpenID Connect. El navegador genera un par de claves, el servidor emite un nonce mediante una interfaz de estilo ZIP 304, la wallet lo firma y el servidor devuelve un JWT. Como el resultado es compatible con OIDC, las apps existentes pueden consumirlo sin una integración a medida
- **ZecPass** - demuestra la propiedad mediante un memo firmado, y está construido para que la app nunca llegue a conocer la dirección del usuario en absoluto. Deriva un hash con alcance de aplicación para usarlo como identificador estable, mantiene los desafíos de un solo uso y limitados en el tiempo, e incluye un botón de React listo para usar con una biblioteca de verificación para Node.js
- **Portal** - inicio de sesión enviando una transacción blindada con un código de un solo uso en el memo, funcionando en mainnet. El mismo flujo se reutiliza para desbloquear contenido de pago y para enviar o recibir dinero desde un enlace
- **ZcashMe** - usa un pago blindado como prueba de identidad, y se centra en la brecha entre escritorio y móvil para que iniciar sesión en un portátil no requiera una extensión del navegador
- **ZBooks** - una herramienta de contabilidad y pagos que trata el inicio de sesión con Zcash como una primitiva de autenticación reutilizable en lugar del producto en sí, y lee datos de tesorería mediante una Unified Full Viewing Key

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Páginas relacionadas

- [Memos](/using-zcash/memos) - cómo funcionan los memos cifrados y cómo viaja dentro de uno un código de inicio de sesión
- [Viewing Keys](/zcash-tech/viewing-keys) - otorgar acceso de solo lectura sin entregar poder de gasto
- [Mantener registros con ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec) - la misma idea de divulgación selectiva, aplicada a la contabilidad
- [Enviar dinero sin vincular la identidad](/zcash-use-cases/send-money-without-linking-identity) - por qué la reutilización de direcciones socava la privacidad

<br/>
