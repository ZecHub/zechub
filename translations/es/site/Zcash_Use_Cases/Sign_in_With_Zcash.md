# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Iniciar sesión con Zcash

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Intermedio - 7 min</span>

## Resumen

- Inicie sesión demostrando que controla una dirección de Zcash, en lugar de usar una contraseña
- Dos diseños están en uso: **firmar un desafío**, o **enviar un pago blindado con un código en el memo**
- Debido a que las direcciones blindadas ocultan el saldo y el historial, demostrar control no expone sus finanzas
- El patrón es incipiente. Aún no hay un estándar ratificado, y las implementaciones no son interoperables

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> ¿Para quién es esto?

- Desarrolladores que desean inicio de sesión sin contraseña sin recopilar datos personales
- Usuarios que preferirían no dar su dirección de correo electrónico a cada sitio
- Cualquiera que quiera iniciar sesión sin vincular su historial financiero a una cuenta

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> El Problema

La mayoría de las opciones de inicio de sesión filtran algo:

- **Contraseñas y correo electrónico** crean una cuenta vinculada a su identidad, y ambos terminan en filtraciones de datos
- **Inicio de sesión social** le dice al proveedor de identidad cada lugar donde inicia sesión y cuándo
- **Inicio de sesión con monedero en cadenas transparentes** es peor de lo que parece. Conectar un monedero puede entregar al sitio todo su saldo e historial de transacciones, permanentemente

Normalmente está eligiendo entre conveniencia y divulgación.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> ¿Por qué Zcash?

Zcash separa *demostrar control* de *revelar finanzas*:

- **Las direcciones blindadas** mantienen los saldos y el historial de transacciones privados, por lo que demostrar que posee una no dice nada sobre lo que tiene
- **Los memos cifrados** pueden llevar un código de inicio de sesión de un solo uso de forma privada dentro de una transacción
- **Las claves de visualización** permiten divulgación selectiva, para que una aplicación pueda recibir acceso de lectura exactamente a lo que necesita y nada más

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Cómo Funciona

Han surgido dos enfoques. Ambos terminan con la aplicación manteniendo un identificador estable para usted y sin contraseña.

### Enfoque 1: Firmar un desafío

1. La aplicación genera un desafío aleatorio de un solo uso
2. Su monedero firma ese desafío con la clave detrás de su dirección
3. La aplicación verifica la firma e inicia su sesión

No se transmite nada, por lo que no hay tarifa ni espera por un bloque. La especificación relevante es [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304), que aún es un borrador, por lo que el soporte de los monederos para la firma de mensajes varía.

### Enfoque 2: Demostrarlo con un pago blindado

1. La aplicación genera un código de un solo uso y muestra una solicitud de pago
2. Usted envía una pequeña transacción blindada con ese código en el memo
3. La aplicación observa el memo, coincide el código e inicia su sesión

Esto funciona con monederos que ya soportan memos hoy, que son la mayoría. La desventaja es que cuesta una tarifa de red y debe esperar la confirmación.

### Mantener la dirección privada

Una aplicación no necesita almacenar su dirección para reconocerlo. Algunas implementaciones la combinan con un hash junto con un valor específico de la aplicación, de modo que cada sitio ve un identificador diferente y estable para el mismo usuario. Eso evita que los sitios comparen notas para vincular sus cuentas.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Compromisos

Vale la pena entenderlos antes de construir sobre esto o depender de ello.

| | Desafío firmado | Pago blindado |
|---|---|---|
| Costo | Gratis | Tarifa de red por inicio de sesión |
| Velocidad | Instantáneo | Espera confirmación |
| Soporte de monederos | Limitado, ZIP 304 es un borrador | Amplio, solo necesita memos |
| Deja registro en cadena | No | Sí, existe una transacción |

Limitaciones compartidas:

- **Sin recuperación de cuenta por defecto.** Perder la clave significa perder la cuenta, a menos que la aplicación diseñe una ruta de recuperación
- **La reutilización de direcciones puede vincularle.** Usar la misma dirección en muchos sitios recrea el problema de rastreo, por eso los identificadores específicos de aplicación importan
- **Sin estándar ratificado.** Cada proyecto tiene su propio esquema, por lo que un inicio de sesión construido para uno no funciona con otro
- **No es anonimato por sí solo.** Oculta sus finanzas de la aplicación, pero la aplicación aún puede perfilar lo que hace una vez que está dentro

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Errores Comunes a Evitar

- Reutilizar un código de desafío. Cada código debe ser de un solo uso y expirar rápidamente, o uno capturado puede ser reproducido
- Pedir a los usuarios que envíen una cantidad significativa para iniciar sesión. El pago es una prueba, así que la cantidad debe ser trivial
- Almacenar la dirección sin procesar cuando un identificador específico de aplicación haría el mismo trabajo
- Asumir que la firma de mensajes funciona en todas partes. Verifique los monederos que sus usuarios realmente tienen
- Tratar un memo como secreto después del hecho. Demuestra que el remitente actuó, no es una contraseña

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Proyectos que Exploran Esto

Estos fueron construidos para la pista de **Zcash Login** del [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon). Son experimentos más que productos terminados, y muestran lo diferente que se puede construir la misma idea.

- **ZecAuth** - un protocolo de conexión de monedero para Zcash, en el espíritu de lo que hace WalletConnect en otros contextos. La aplicación muestra un código QR o un enlace `zecauth://` que lleva un desafío más las capacidades que está solicitando, como inicio de sesión, solicitudes de pago o acceso de visualización. Sin transacción, sin tarifa, sin interacción con la cadena. Incluye una especificación de protocolo escrita junto con el código
- **ZShield** - convierte una dirección blindada en un DID W3C y una identidad OpenID Connect. El navegador genera un par de claves, el servidor emite un nonce a través de una interfaz estilo ZIP 304, el monedero lo firma, y el servidor devuelve un JWT. Debido a que el resultado es compatible con OIDC, las aplicaciones existentes pueden consumirlo sin integración a medida
- **ZecPass** - demuestra la propiedad a través de un memo firmado, y está construido de modo que la aplicación nunca conoce la dirección del usuario. Deriva un hash con alcance de aplicación para usar como identificador estable, mantiene los desafíos de un solo uso y con tiempo limitado, e incluye un botón React y una biblioteca de verificación Node listas para integrar
- **Portal** - inicio de sesión enviando una transacción blindada con un código de un solo uso en el memo, funcionando en la red principal. El mismo flujo se reutiliza para desbloquear contenido de pago y para enviar o recibir dinero desde un enlace
- **ZcashMe** - usa un pago blindado como prueba de identidad, y se enfoca en la brecha entre escritorio y móvil para que iniciar sesión en un portátil no requiera una extensión de navegador
- **ZBooks** - una herramienta de contabilidad y pagos que trata el inicio de sesión con Zcash como una primitiva de autenticación reutilizable en lugar del producto en sí, y lee datos del tesoro a través de una Unified Full Viewing Key

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Páginas relacionadas

- [Memos](/using-zcash/memos) - cómo funcionan los memos cifrados y cómo un código de inicio de sesión viaja dentro de uno
- [Claves de Visualización](/zcash-tech/viewing-keys) - otorgar acceso de solo lectura sin entregar el poder de gasto
- [Mantener Registros con ZEC Blindado](/zcash-use-cases/keeping-records-with-shielded-zec) - la misma idea de divulgación selectiva, aplicada a la contabilidad
- [Enviar Dinero sin Vincular Identidad](/zcash-use-cases/send-money-without-linking-identity) - por qué la reutilización de direcciones socava la privacidad

<br/>
