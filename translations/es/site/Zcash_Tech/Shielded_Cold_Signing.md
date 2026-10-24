# Firma en frío blindada

> **Idea clave:** La wallet complementaria ve todo lo necesario para crear y supervisar una transacción blindada. Solo la wallet de hardware conserva la autoridad para autorizar un gasto. Esa división es el objetivo completo de la firma en frío blindada.

El blindaje en Zcash implica mover fondos desde una dirección pública y transparente hacia una privada y blindada, ocultando los detalles de la transacción mediante las funciones de privacidad de Zcash.

### ¿Qué cambia al blindar ZEC?

Con una transacción transparente de Zcash, información como:

- dirección del remitente
- dirección del destinatario
- cantidad transferida

puede observarse en la blockchain.

Cuando blindas ZEC, tus fondos se trasladan a un pool privado (como Ironwood). La blockchain puede verificar que una transacción es válida sin revelar los detalles privados de tu transacción. Desde la actualización NU6.3 del 28 de julio de 2026, los fondos recién blindados pasan al pool Ironwood, ya que el antiguo pool Orchard ya no acepta nuevos depósitos, aunque sigue permitiendo retiros.

### Componentes de una transacción blindada

### 1. La nota (el registro de saldo blindado)

Una nota es un registro criptográfico privado que representa una cantidad no gastada de ZEC propiedad de un usuario.

A diferencia de una blockchain pública, donde los saldos se muestran en texto claro, una nota blindada cifra los detalles del valor y de la propiedad para que los observadores on-chain no puedan ver quién posee los fondos.

Al iniciar una transacción, la wallet complementaria escanea el libro mayor, identifica las notas no gastadas del usuario y selecciona qué notas gastar.

### 2. El nulificador (el mecanismo de detección de doble gasto)

Dado que los detalles de una nota están ocultos del libro mayor público, la red necesita un mecanismo para detectar el doble gasto sin revelar qué nota se está gastando.

Un nulificador es un marcador criptográfico único derivado de una nota específica. Cuando se gasta una nota, su nulificador se publica en la blockchain.

La red verifica que el nulificador no se haya registrado previamente. Si no lo ha sido, el gasto puede aceptarse. Fundamentalmente, un observador externo no puede usar el nulificador para determinar de qué nota específica procede.

La wallet complementaria deriva y construye el nulificador adecuado como parte del ensamblaje de los datos de la transacción.

## Claves

Las claves son piezas criptográficas de información que controlan el acceso a tus fondos y permiten que tu wallet realice operaciones como recibir, visualizar y gastar ZEC.

Una wallet contiene varias claves diferentes, cada una con una finalidad distinta, igual que una sola cuenta puede tener credenciales separadas para acceso de lectura y acceso de escritura.

Las claves son centrales para la relación entre la wallet complementaria y la wallet de hardware, porque distintas claves tienen distintos fines, y solo una de ellas debe permanecer guardada bajo llave.

Es importante saber que cada pool blindado construye sus claves como un árbol de derivación, donde las flechas apuntan desde un componente hacia todo lo que puede derivarse de él. Los usuarios que desean recibir pagos blindados deben tener una dirección de pago blindada, que se genera a partir de una clave de gasto.

### La jerarquía de claves

**1. Clave de gasto**

Esta es la clave más sensible desde el punto de vista de la seguridad. Proporciona la capacidad criptográfica para autorizar el gasto de ZEC.

Esta es la clave a la que se hace referencia siempre que en otra parte de este informe aparece “la wallet de hardware conserva la clave”.

En una arquitectura de firma en frío, la clave de gasto se conserva dentro de la wallet de hardware y nunca se expone a la wallet complementaria. La wallet complementaria no debería necesitar poseer esta clave en absoluto.

Tanto en Sapling como en Orchard, las jerarquías de claves derivan la autoridad de gasto y las capacidades de visualización como dos ramas distintas a partir de una clave raíz de gasto:

- **Sapling:** Una clave de gasto expandida (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) deriva claves de autorización de pruebas (𝑎𝑘,𝑛𝑠𝑘) y claves de visualización completas (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘), que a su vez generan claves de visualización entrantes (𝑖𝑣𝑘) y direcciones diversificadas.
- **Orchard:** Una clave raíz de gasto (𝑠𝑘) se ramifica directamente en una clave de autorización de gasto (𝑎𝑠𝑘) y una clave de visualización completa (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Esta división estructural proporciona la base criptográfica formal para el aislamiento de claves de hardware, que implica que la wallet exporte la rama de visualización (UFVK) al ordenador anfitrión para sincronizar saldos y construir transacciones, mientras mantiene la rama de autorización de gasto bloqueada permanentemente en el dispositivo.

La derivación de claves es estrictamente unidireccional. Esto significa que las claves de visualización no pueden invertirse para reconstruir la autoridad de gasto. La irreversibilidad criptográfica hace seguro exportar una Unified Full Viewing Key (UFVK), porque concede visibilidad completa de la wallet sin exponer secretos de gasto en el dispositivo.

**2. Claves de visualización**

Zcash separa la capacidad de ver la actividad blindada de la capacidad de gastarla. Una clave de visualización permite a una wallet u otra parte autorizada ver información sobre transacciones blindadas sin conceder autoridad de gasto.

- **Full Viewing Key (FVK), envuelta como una Unified Full Viewing Key (UFVK):** derivada deliberadamente de la clave de gasto, permite al software detectar y descifrar la actividad blindada de la wallet, identificando así las transacciones. También le permite calcular saldos sin poder autorizar un gasto. Se describe mejor como un derivado menos privado de la clave de gasto, no como una copia más débil de la semilla.

La Full Viewing Key (FVK) proporciona visibilidad completa de solo lectura, a la vez que mantiene una estricta separación de seguridad. Al descifrar los textos cifrados de las notas tanto entrantes como salientes (mediante su componente de clave de visualización saliente), una wallet complementaria que solo tiene FVK puede mostrar un historial de transacciones completo y etiquetado, en vez de solamente un saldo acumulado.

Múltiples direcciones de pago diversificadas no vinculables comparten la misma FVK y clave de visualización entrante (IVK), lo que permite generar direcciones ilimitadas sin aumentar la carga de escaneo de la blockchain.

Esta separación funcional forma la base de los flujos de trabajo de firma en frío. Todo el escaneo continuo de la cadena, seguimiento del historial y gestión de direcciones se delega al software anfitrión, mientras la autoridad de gasto permanece aislada en el dispositivo de hardware.

![Key derivation diagrams](/content-images/key-derivation-diagrams.webp)

### La distinción crítica: UFVK frente a clave de gasto

> **La UFVK puede compartirse. La clave de gasto debe permanecer en la wallet de hardware.**
>
> La wallet complementaria utiliza la clave de visualización para supervisar la wallet, detectar fondos entrantes, identificar notas y ayudar a preparar transacciones. No tiene la clave privada necesaria para autorizar gastos.

Como se indicó anteriormente, la separación de claves es la base de la arquitectura de firma en frío.

La wallet complementaria puede realizar la mayor parte del trabajo necesario para preparar una transacción sin tener jamás control sobre los fondos. La wallet de hardware solo necesita recibir la transacción preparada y realizar la operación final de firma.

Los fabricantes de wallets de hardware no necesitan inventar esta separación por sí mismos. El diseño de claves de Zcash ya separa las capacidades de visualización de la autoridad de gasto a nivel de protocolo, y los fabricantes simplemente construyen sus funciones de firma y exportación sobre esa estructura existente. El protocolo permite derivar información como una dirección blindada o una clave de visualización completa a partir de una clave de gasto, mientras la propia clave de gasto permanece privada, lo que permite a wallets de hardware como Ledger, Keystone y Hito proporcionar al software complementario la información de visualización que necesita sin exponer nunca la clave privada que puede gastar los fondos.

### Qué hace realmente la wallet complementaria con la información de claves

Usando el material de la clave de visualización, la wallet complementaria puede:

- identificar tus fondos y notas
- determinar qué notas pueden gastarse
- derivar o identificar direcciones pertinentes
- construir la transacción
- generar o coordinar las pruebas necesarias
- preparar la transacción para la firma

Es importante saber que necesitar construir una transacción no es lo mismo que necesitar la clave privada de gasto. Ese desacoplamiento es una de las ideas de seguridad centrales detrás de la integración de wallets de hardware.

## Construcción y autorización de transacciones blindadas

Estos son los procesos implicados en crear y autorizar la transacción. En términos simples, estos procesos son lo que la wallet hace realmente con esos datos para enviar dinero:

### Construcción de transacciones (ensamblaje de la transacción blindada)

La construcción de transacciones es el proceso de reunir la información requerida para crear una transacción válida de Zcash a partir del pago que pretende realizar el usuario.

El proceso de construcción de transacciones combina las notas seleccionadas, destinatarios, cantidades, comisiones, nulificadores y otros datos de transacción necesarios en una estructura de transacción. Para las transacciones blindadas, también prepara la información necesaria para generar las pruebas de conocimiento cero y firmas requeridas.

La wallet complementaria generalmente realiza esta etapa. Esta:

- Selecciona las notas que se gastarán
- Determina las entradas y salidas de la transacción
- Calcula los valores necesarios
- Prepara los datos de transacción que posteriormente serán probados y firmados.

En una configuración de firma en frío, los datos resultantes de la transacción pueden empaquetarse en un PCZT y pasarse a la wallet de hardware para el paso de firma crítico para la seguridad.

### Prueba (demostración de la validez del protocolo)

La prueba se refiere a la generación de pruebas de conocimiento cero (como Halo 2 o Groth16) que demuestran que una transacción sigue las reglas del protocolo Zcash.

La prueba ayuda a la red a garantizar:

- El usuario que gasta está autorizado para gastar las notas
- Las notas existen realmente
- Los nulificadores correspondientes son únicos
- El total de entradas equivale al total de salidas más las comisiones.

Hace todo esto sin revelar ningún detalle privado subyacente.

La generación de pruebas es computacionalmente intensiva. Delegar esta responsabilidad al dispositivo complementario evita que la wallet de hardware se bloquee o se quede sin memoria.

### Firma (autorización del gasto)

La firma es fundamentalmente distinta de la generación de pruebas. Una firma digital actúa como un sello explícito de autorización producido por el titular de la clave privada.

Mientras una prueba de conocimiento cero verifica la validez de la transacción, una firma digital demuestra la autoridad de gasto. La firma certifica que el verdadero propietario aprueba los parámetros específicos de la transferencia.

Firmar requiere una potencia de cálculo mínima, por lo que es ideal para una wallet de hardware.

### ¿Qué es la firma en frío blindada?

La firma en frío blindada es un método para autorizar una transacción blindada de Zcash mientras se mantienen las claves privadas de gasto aisladas de la wallet complementaria conectada a Internet. La transacción puede construirse y prepararse en un ordenador en línea, mientras una wallet de hardware independiente, mantenida fuera de línea o aislada de otra forma, usa sus claves protegidas para autorizar la transacción.

El proceso puede simplificarse así:

![Shielded cold signing process](/content-images/cold-signing-process.webp)

La wallet complementaria envía los parámetros estructurados de la transacción al dispositivo de hardware, que firma internamente la carga útil sin liberar jamás la clave privada de gasto a la máquina anfitriona.

## Wallets complementarias y de hardware

Las transacciones blindadas pueden implicar tanto una wallet complementaria como una wallet de hardware, y cada una cumple una función distinta.

### Wallet complementaria

¿Qué es una wallet complementaria?

La wallet complementaria se ejecuta en un ordenador o dispositivo móvil y realiza la mayoría de las tareas involucradas en crear la transacción, como:

- Seleccionar las notas que se gastarán
- Construir la transacción
- Calcular los datos necesarios de la transacción
- Coordinar la generación de las pruebas de conocimiento cero requeridas.

### ¿Por qué es útil una wallet complementaria?

La wallet complementaria gestiona el proceso de creación de la transacción, pero si el ordenador se infecta con malware, un atacante podría:

- ver lo que haces,
- modificar una transacción sin firmar,
- intentar engañarte para que apruebes algo.

La wallet complementaria no necesita acceder a la clave privada almacenada en la wallet de hardware; por tanto, puede gestionar la construcción de transacciones y otras tareas computacionales mientras la wallet de hardware proporciona el límite de seguridad para la clave privada.

### Wallet de hardware

Una wallet de hardware es un dispositivo físico sin conexión que aísla tus claves privadas de teléfonos u ordenadores conectados, y actúa como una bóveda segura para tus activos cripto.

### ¿Por qué es útil una wallet de hardware?

Si tu ordenador se infecta con malware, un atacante podría:

- ver lo que haces,
- modificar una transacción sin firmar,
- intentar engañarte para que apruebes algo.

La clave privada no puede extraerse simplemente de la wallet de hardware; por tanto, el dispositivo puede actuar como un límite de seguridad.

Imagen: capacidades de la wallet complementaria frente a la de hardware

La separación entre estas dos wallets es particularmente importante para las transacciones blindadas porque son más complejas que las transacciones transparentes e implican componentes como notas blindadas, nulificadores, compromisos, pruebas de conocimiento cero y firmas de transacciones.

No sería práctico que la wallet de hardware realizara cada operación computacional. En su lugar, la wallet complementaria prepara la transacción y proporciona la información necesaria a la wallet de hardware para la firma, mientras la clave privada de gasto permanece aislada dentro del dispositivo de hardware.

## Aislamiento de claves

> El aislamiento de claves significa que las claves privadas que pueden autorizar un gasto nunca salen de la wallet de hardware. La complementaria puede preparar la transacción; no puede firmarla.

El aislamiento de claves se refiere a mantener las claves privadas requeridas para autorizar una transacción separadas de la wallet complementaria y del dispositivo en el que se ejecuta. En una configuración de firma en frío blindada, la wallet complementaria puede construir la transacción y coordinar las pruebas requeridas, mientras la wallet de hardware mantiene aisladas las sensibles claves privadas de gasto.

Si el ordenador o teléfono complementario se ve comprometido, un atacante podría interactuar con la transacción antes de que se firme, pero idealmente no puede extraer la clave privada de la wallet de hardware. Por tanto, la clave permanece dentro del límite de seguridad del dispositivo de hardware.

Esta separación permite a la wallet complementaria realizar la construcción de transacciones y tareas computacionales sin darle acceso directo al material de claves requerido para autorizar la transacción.

![Key isolation](/content-images/key-isolation.webp)

La distinción clave que debe hacerse es que “clave de visualización” no significa que la aplicación reciba una versión más débil de la semilla.

En Zcash, una Full Viewing Key (FVK/UFVK) se deriva deliberadamente de la clave de gasto y concede a su titular la capacidad de detectar y descifrar actividad blindada relevante, pero no de autorizar gastos. La FVK es un derivado menos secreto de la clave de gasto.

**Una advertencia importante sobre privacidad:**

Por tanto, debe saberse que la aplicación no puede robar los fondos solo con la UFVK, pero sí puede ver la actividad blindada privada de la wallet.

Por eso es más preciso describir la aplicación complementaria como poseedora de *autoridad de visualización*, en lugar de decir simplemente que tiene “información pública”.

La forma más sencilla de expresar toda la idea es que la wallet complementaria recibe suficiente material de claves para saber qué está ocurriendo con la wallet, pero no suficiente material de claves para autorizar qué ocurre con los fondos de la wallet. Sin embargo, la wallet de hardware mantiene la autoridad de gasto aislada y la utiliza únicamente cuando el usuario aprueba una transacción.

Ese es el modelo central de aislamiento de claves detrás de estos diseños de wallets de hardware blindadas de Zcash y es el mismo modelo que aparece, implementación por implementación, en Ledger, Keystone y Hito, que se cubrirán próximamente.

## PCZT

PCZT significa transacción de Zcash parcialmente creada. Es el paquete que transporta una transacción de Zcash y la información necesaria para terminarla de una etapa a otra.

Es un formato estandarizado para una transacción de Zcash mientras aún se está construyendo. Permite a distintos participantes o dispositivos realizar diferentes partes del proceso de creación de la transacción y pasarse entre ellos la transacción parcialmente completada.

Construir una transacción es significativamente más complejo que firmar una transferencia pública simple en protocolos de criptomonedas de conocimiento cero como Zcash. Las transacciones blindadas requieren pruebas de conocimiento cero computacionalmente intensivas, como las generadas mediante Halo 2 o Groth16. Como resultado, los dispositivos de bajo consumo como las wallets de hardware pueden carecer de la memoria y capacidad de procesamiento para gestionar el flujo de trabajo completo de la transacción.

La introducción de PCZT aborda varios desafíos centrales de la arquitectura cripto blindada. PCZT es un formato de datos intermedio estandarizado que divide la creación de transacciones en funciones modulares e independientes. Permite a un potente ordenador complementario gestionar el ensamblaje de transacciones y la generación de pruebas, al tiempo que restringe una wallet de hardware fuera de línea estrictamente a la autorización y la firma.

### Limitaciones del hardware y del almacenamiento en frío

Aunque las wallets de hardware proporcionan un entorno seguro para proteger claves privadas de gasto, normalmente tienen RAM, potencia de cálculo y capacidades de transferencia de datos limitadas en comparación con los ordenadores complementarios. Estas restricciones hacen poco práctico que realicen la generación de pruebas de conocimiento cero computacionalmente intensivas o mantengan el estado completo de la transacción requerido durante el proceso de construcción.

Como resultado, la wallet complementaria puede gestionar las tareas computacionalmente exigentes, mientras la wallet de hardware se concentra en la operación crítica para la seguridad de autorizar la transacción con sus claves de gasto protegidas.

Esto hace preguntarse: si el dispositivo tiene tantas restricciones, ¿cómo sigue haciendo *suficiente* verificación como para ser fiable?

Pues, expresado de forma sencilla, una wallet de hardware no puede aceptar un valor arbitrario de un ordenador complementario y firmarlo. Necesita información suficiente para establecer que el valor firmado corresponde a la transacción que el usuario pretende autorizar. Esto crea un equilibrio difícil porque el dispositivo debe realizar suficiente análisis y verificación para proteger el proceso de firma, mientras opera con límites estrictos de memoria, cálculo, tamaño de firmware y complejidad de implementación.

El manejo de Ledger Orchard PCZT es un ejemplo de este desafío, que sugiere que el análisis especializado dependiente de circuitos puede hacer la implementación más manejable en dispositivos restringidos, pero también puede requerir cambios de firmware cuando evolucionan las estructuras o circuitos de transacción compatibles.

Dos esfuerzos en curso ilustran respuestas diferentes a esta misma restricción.

Una propuesta de investigación sobre una canalización de pruebas completamente de tiempo constante, adecuada para arquitecturas de wallets de hardware de código abierto y ordenadores convencionales, se presentó en la subvención n.º 423. El objetivo era investigar infraestructura criptográfica que pudiera implementarse de forma segura en entornos como C o Rust, reduciendo a la vez la complejidad y carga de mantenimiento del soporte blindado de Zcash.

Sin embargo, un enfoque alternativo está representado por el propuesto **Zcash SeedSigner**, un firmante de código abierto y aislado por aire construido con componentes económicos y fácilmente disponibles. Su flujo de trabajo propuesto mantiene separado el ordenador complementario del dispositivo de firma, pasando un PCZT a través de un espacio aislado para su verificación y firma en el dispositivo.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

En conjunto, estos enfoques ilustran el desafío de ingeniería más amplio detrás de las wallets de hardware blindadas: la construcción y prueba de transacciones pueden realizarse fuera del dispositivo crítico para la seguridad, pero el firmante debe seguir teniendo suficiente información y capacidad de verificación para autorizar con seguridad la transacción resultante.

### PCZT permite la arquitectura dividida

El estándar de transacción de Zcash parcialmente creada (PCZT) es la estructura de datos formal que conecta la wallet complementaria y la wallet de hardware.

Una wallet complementaria puede gestionar la selección de notas, calcular los nulificadores y generar la prueba de conocimiento cero por sí sola. Esto es posible porque la información necesaria para estos pasos, incluida la clave utilizada para derivar nulificadores, procede de la clave de visualización en lugar de cualquier elemento vinculado a la autoridad de gasto. Luego, la wallet complementaria empaqueta estos elementos en un contenedor PCZT.

El PCZT se entrega a la wallet de hardware, que lee el contexto de la transacción (como cantidades y direcciones de destinatarios), aplica la firma usando sus claves de gasto protegidas y devuelve el PCZT actualizado al dispositivo complementario.

Este diseño establece un límite de seguridad estricto: un potente hardware anfitrión puede realizar complejas matemáticas de conocimiento cero sin necesitar acceso a las claves de gasto, mientras que los dispositivos de almacenamiento en frío de bajo consumo pueden imponer seguridad financiera sin tener que calcular criptografía pesada.

### Compromisos de privacidad del probador

Aunque delegar la generación de pruebas de conocimiento cero a la wallet complementaria u otro probador mantiene aisladas las claves de gasto, todavía exige que el probador acceda a información sensible de la transacción, como valores de notas, direcciones de destinatarios y compromisos.

El PCZT mantiene la separación arquitectónica al garantizar que esta información pueda proporcionarse para la prueba sin transferir las claves privadas de gasto necesarias para la autorización.

Esto garantiza que la autoridad de prueba esté separada de la autoridad de gasto. El probador puede realizar la generación de pruebas computacionalmente intensiva sin adquirir la autoridad criptográfica para gastar los fondos del usuario.

### Interoperabilidad de PCZT

A medida que PCZT se convierte en una parte importante de los flujos de trabajo de wallets de hardware, multifirma y firma aislada por aire de Zcash, la interoperabilidad entre implementaciones independientes se vuelve cada vez más importante.

Una propuesta de junio de 2026 de AngryDavee señaló que ya existían implementaciones de PCZT en proyectos como Ledger, Keystone, Hito, OneKey y la implementación de referencia en librustzcash. Sin embargo, la propuesta identificó una falta de pruebas compartidas para confirmar que estas implementaciones interpretan los PCZT de manera consistente.

La solución propuesta era una suite de pruebas de interoperabilidad de código abierto que contuviera vectores de prueba canónicos de PCZT y pruebas entre implementaciones que cubrieran el flujo de trabajo completo crear → firmar → finalizar. También propuso probar límites de funciones como el Combinador, donde información parcialmente firmada de distintos firmantes puede combinarse antes de finalizar una transacción.

Esto es particularmente relevante para las wallets de hardware porque PCZT permite separar la construcción y la firma de transacciones: una wallet complementaria puede construir una transacción y preparar un PCZT, mientras un dispositivo de hardware recibe la información de firma requerida y realiza la operación de firma crítica para la seguridad.

La propuesta no se implementó porque Zcash Community Grants decidió no continuar con la subvención después de revisar la propuesta y considerar los comentarios de la comunidad. Como resultado, la suite de pruebas entre implementaciones propuesta no se desarrolló mediante esta subvención. Por tanto, es una respuesta propuesta a un desafío identificado de interoperabilidad de PCZT, no un estándar que exista actualmente en todo Zcash.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### El ciclo de vida de un PCZT

| # | Etapa | Descripción |
|---|---|---|
| 1 | Creador | Inicializa el PCZT con metadatos globales de transacción, incluidas versiones de transacción, ID de ramas de consenso y indicadores de pools. |
| 2 | Constructor | Rellena la transacción con las entradas y salidas previstas en pools transparentes, Sapling, Orchard o Ironwood. |
| 3 | Finalizador de E/S | Declara completo el conjunto de entradas y salidas, calcula las claves de firma de vinculación y firma gastos ficticios cuando se requiere. |
| 4 | Actualizador | Adjunta los datos de contexto necesarios para participantes posteriores, como claves de visualización completas, anclas y testigos de Merkle. |
| 5 | Probador y firmante | Ejecuta la generación de pruebas de conocimiento cero y la firma criptográfica. En las versiones modernas de PCZT, estas dos tareas son totalmente independientes y pueden realizarse secuencialmente o en paralelo. |
| 6 | Combinador | Fusiona determinísticamente múltiples instancias de PCZT si distintos dispositivos trabajan simultáneamente en aspectos de la misma transacción. Las reglas de fusión exigen una estricta resolución de conflictos para evitar pérdidas accidentales de datos. |
| 7 | Finalizador de gasto y extractor | Valida todos los elementos criptográficos necesarios, elimina los metadatos de contexto intermedios y produce la transacción finalizada de Zcash lista para transmitirse a la red. |

## Implementaciones de wallets de hardware en el mundo real

### De un vistazo

| Dispositivo   | Lo que recibe la complementaria              | Lo que permanece en el dispositivo          | Transporte      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / Orchard FVK, direcciones            | Autoridad de gasto                | USB / BLE      |
| Keystone | UFVK + Unified Address                   | Semilla / claves de gasto              | QR (aislado por aire)|
| Hito     | UFVK, Unified Address, huella de semilla  | Semilla y claves privadas de gasto    | QR / local     |


Se han desarrollado varias implementaciones de wallets de hardware para explorar cómo se pueden admitir transacciones blindadas de Zcash manteniendo las sensibles claves de gasto aisladas de la wallet complementaria. Ledger, Keystone y Hito representan enfoques diferentes para integrar protección de claves basada en hardware con el flujo de trabajo de transacciones de Zcash.

![Real world hardware wallet implementations](/content-images/hardware-wallet-implementations.webp)

Para entender cómo protegen los fondos blindados, es importante distinguir entre claves de gasto y claves de visualización. En los tres casos, la división sigue la misma forma:

| Dispositivo | Lo que puede recibir la aplicación complementaria | Lo que permanece protegido en el dispositivo |
|---|---|---|
| Ledger | UFVK / Orchard FVK, direcciones e información pública | Autoridad de gasto / material de clave privada |
| Keystone | UFVK + Unified Address | Semilla / claves de gasto |
| Hito | UFVK, Unified Address, huella de semilla e información de red | Semilla y claves privadas de gasto |

### Ledger como entorno de firma de hardware

Ledger es una empresa de wallets de hardware. Sus dispositivos se construyen alrededor de un Secure Element, que es un chip dedicado diseñado para conservar material de claves privadas y mantenerlo físicamente aislado del resto del dispositivo y de cualquier cosa conectada a él. Ese Secure Element es la razón completa por la que un dispositivo Ledger es fiable para almacenamiento en frío. Esto significa que, incluso si el ordenador o teléfono conectado está comprometido, las claves dentro del Secure Element no pueden extraerse.

Por sí solo, sin embargo, un dispositivo Ledger está vacío con respecto a cualquier criptomoneda específica. Necesita una aplicación instalada que sepa manejar la criptografía particular de esa moneda.

Un dispositivo Ledger está vacío con respecto a cualquier criptomoneda específica; por tanto, necesita una aplicación que conozca la criptografía de esa moneda. Para Zcash ha habido dos generaciones:

- La aplicación original “Zcash Shielded” creada por Zondax, utilizada con wallets complementarias como Zkool y retirada el 5 de noviembre de 2026, y
- La aplicación más reciente Zcash de Ledger (3.9.4+), utilizada de forma nativa por Ledger Wallet Desktop 4.21+ para Ironwood blindado ZEC.

El siguiente modelo de aislamiento de claves se aplica a ambas.

Zkool es la wallet complementaria de tu teléfono u ordenador que se comunica con esa aplicación. Construye la transacción, la envía a Ledger, la aplicación Zondax del dispositivo la firma y devuelve la firma.

Por tanto, Zondax es el software que se ejecuta en el hardware, Zkool es el software que se ejecuta fuera de él y utiliza la aplicación de Zondax para comunicarse con el dispositivo.

### ¿Qué sale de Ledger?

El software Zcash de Ledger incluye una función específica para exportar la clave de visualización de la wallet, que es la clave que permite al software ver saldos y transacciones sin poder gastar nada.

Esta función puede devolver una de dos cosas:

- Una Unified Full Viewing Key (UFVK), que es la clave de visualización completa que cubre todos los pools blindados de Zcash de una vez, o
- Una Orchard Full Viewing Key (FVK)

En cualquier caso, lo que sale siempre es solamente una clave de visualización. No importa qué versión solicites, esta función no tiene forma de devolver la única pieza de información que realmente permitiría a alguien mover fondos: la clave de gasto.

Ese es el objetivo completo de su construcción: está diseñada de modo que lo único que puede exportar es algo seguro de entregar a una aplicación complementaria.

La jerarquía de claves de Zcash está estructurada de tal manera que, para cada pool blindado, la clave de gasto deriva dos elementos separados:

- Una clave de autorización de gasto, y
- Una clave de visualización completa

La FVK puede después derivar otras capacidades relacionadas con visualización por sí misma, pero en ningún momento esa ruta de derivación vuelve a conducir a la autoridad de gasto. Una vez que una clave se ha ramificado al lado de visualización de la jerarquía, permanece allí y no puede utilizarse para reconstruir la clave de autoridad de gasto de la que procedía.

Ironwood sigue este mismo patrón, puesto que reutiliza la construcción subyacente de claves y notas de Orchard. Sin embargo, es un pool distinto a nivel de consenso, con su propio árbol de compromisos y conjunto de nulificadores. Esto significa que una UFVK es en realidad un conjunto de claves de visualización por pool (transparente, Sapling, Orchard y ahora Ironwood), no una sola clave plana.

Una UFVK exportada antes de que se activara Ironwood no incluirá una clave de visualización Ironwood, puesto que ese pool aún no existía. Esta es precisamente la razón por la que las wallets tuvieron que actualizarse para reconocer y derivar UFVK compatibles con Ironwood después de la actualización NU6.3.

### ¿Qué permanece en Ledger?

La autoridad de gasto permanece en el dispositivo.

El firmante de Ledger recibe una transacción/PCZT del anfitrión y genera la firma de autorización de gasto en función del pool desde el que gasta la transacción (el pool Ironwood porque la integración actual de Ledger solo admite Ironwood). La firma se produce entonces en el dispositivo, y el anfitrión recibe solamente la firma, no la clave privada de gasto.

Esto también es coherente con el modelo general de seguridad de Ledger. Su Secure Element aísla el material de claves privadas, y los requisitos de seguridad de aplicaciones de Ledger prohíben específicamente que las aplicaciones expongan esos secretos al anfitrión.

El firmante de Ledger puede exportar la FVK/UFVK mientras realiza de forma independiente la firma de transacciones. Ambas capacidades se proporcionan mediante funciones separadas, no agrupadas en una sola.

### ¿Qué significa eso en la práctica?

Supongamos que tu Ledger contiene 10 ZEC.

La wallet complementaria puede tener la UFVK y, por tanto, determinar: “Esta wallet ha recibido 10 ZEC”. Puede escanear y mostrar transacciones y saldos.

Pero si alguien compromete la wallet complementaria, la UFVK por sí sola no le concede la capacidad de crear la firma de autorización de gasto.

La finalidad de la firma de autorización de gasto separada es permitir a dispositivos restringidos como las wallets de hardware autorizar gastos blindados sin tener que realizar ellos mismos la prueba completa de zk-SNARK.

### Aplicación Zondax Ledger; el lado de la wallet de hardware

#### ¿Qué es Zondax?

Zondax es una empresa de desarrollo externa que creó la aplicación Ledger Zcash. Es la aplicación de firmware real que se ejecuta en hardware Ledger y que concede al dispositivo la capacidad de comprender y procesar transacciones de Zcash desde el principio.

Zondax es un desarrollador externo. El hardware Ledger no tiene una capacidad innata para procesar transacciones de Zcash, y esa capacidad procede enteramente del software de Zondax.

### Implementación original de Zcash Ledger

El repositorio de aplicaciones Ledger Zcash de Zondax es el software que se ejecuta en un dispositivo Ledger. La aplicación se centró inicialmente en transacciones blindadas de Sapling, antes de que Orchard existiera como el pool blindado principal de Zcash, por lo que el soporte de Sapling era el alcance de lo que un dispositivo Ledger podía hacer con ZEC blindado.

Su arquitectura ilustra la separación: el lado anfitrión/complementario prepara la información de la transacción mientras Ledger gestiona las operaciones sensibles de claves y la firma.

Incluso en esta primera versión del soporte de wallet de hardware de Zcash, los principios centrales —construcción y prueba en el anfitrión, seguida de firma aislada en el dispositivo— ya formaban parte del diseño.

### Evolución hacia Orchard

El trabajo de Ledger avanzó hacia Orchard + PCZT. Esta fue una transición significativa y no una actualización menor, dado que Orchard utiliza un sistema de pruebas diferente (Halo 2, frente al Groth16 de Sapling) y una construcción de notas y claves distinta; por tanto, ampliar firmware exclusivo de Sapling para manejar la firma de Orchard requirió nuevas bases criptográficas en el lado del dispositivo, no solo un parche de firmware.

Sin embargo, a medida que Zcash avanzaba hacia Ironwood, Zondax y Ledger cambiaron su enfoque de desarrollo hacia admitir Ironwood directamente, en lugar de completar una implementación de Orchard para después rediseñarla para Ironwood. Esto representa una etapa adicional en la evolución de la implementación de Ledger, ya que Ironwood se basa en la arquitectura criptográfica de Orchard mientras introduce un pool blindado separado y cambios adicionales de protocolo.

### Qué ocurre dentro de esta aplicación Ledger

El flujo resultante se describe así:

1. El anfitrión construye un PCZT.
2. El anfitrión envía la información pertinente de la transacción al dispositivo Ledger.
3. El dispositivo produce las firmas de autorización de gasto Orchard.
4. El anfitrión gestiona todo lo posterior, incluida la firma de vinculación y el ensamblaje final de la transacción.

La aplicación que se ejecuta dentro de Ledger nunca ve ni produce nada más allá de la propia firma de autorización de gasto, y todo el trabajo computacionalmente pesado o que requiere muchos datos (prueba, vinculación, ensamblaje) permanece en el anfitrión, donde no necesita ser confiable con material de claves.

### Integración blindada nativa de Ledger; Ledger Wallet Desktop

La integración más reciente de Ledger con Zcash proporciona un ejemplo concreto de cómo la construcción de transacciones blindadas y la firma crítica para la seguridad pueden separarse entre el software complementario y una wallet de hardware.

Con Ledger Wallet Desktop 4.21+ y la aplicación de dispositivo Zcash 3.9.4+, los usuarios pueden enviar y recibir Ironwood blindado ZEC directamente a través de Ledger Wallet Desktop. La integración admite transferencias privadas a privadas, blindaje desde el pool transparente, desblindaje al pool transparente, direcciones privadas de recepción y memos. Las transacciones se verifican y firman en el dispositivo Ledger en lugar de depender únicamente de la información presentada por el ordenador.

Una parte clave de esta arquitectura es la separación entre capacidades de visualización y gasto. Durante la sincronización de saldo privado, Ledger exporta una Unified Full Viewing Key (UFVK), que se almacena localmente en el ordenador. La UFVK permite a Ledger Wallet Desktop detectar transacciones blindadas pertinentes y determinar el saldo de la wallet, pero no proporciona autoridad para gastar los fondos. La autoridad de gasto crítica para la seguridad permanece en el dispositivo Ledger, que realiza la operación de firma final. Esto crea un límite claro entre el ordenador, que gestiona el estado de la wallet y construye transacciones, y el dispositivo de hardware, que protege la capacidad necesaria para autorizar gastos.

Sin embargo, la integración actual es específicamente solo para Ironwood. No muestra ni administra fondos de Orchard o Sapling mediante Ledger Wallet Desktop. Esto es significativo históricamente porque el desarrollo anterior de Ledger de Zcash estaba asociado con soporte blindado de Orchard antes de que la implementación evolucionara hacia el protocolo Ironwood.

La transición también pone de relieve la importancia de la compatibilidad de claves y cuentas. Ledger tiene una aplicación anterior “Zcash Shielded” desarrollada por Zondax y utilizada por integraciones como YWallet y zkool, que ahora está siendo retirada. Dado que esa aplicación anterior utilizaba un esquema de derivación diferente para cuentas blindadas, sus cuentas de Sapling no pueden reproducirse simplemente mediante la nueva aplicación Ledger.

Por tanto, la integración ilustra tanto el progreso como las limitaciones restantes del soporte de wallets de hardware blindadas. Ledger puede ahora proporcionar una experiencia completa de Ironwood en la que el software complementario gestiona la sincronización de la wallet y la preparación de transacciones, mientras el dispositivo de hardware permanece como el límite de seguridad para el gasto.

Al mismo tiempo, la compatibilidad histórica de cuentas, el soporte de solo pools blindados específicos, los límites de tamaño de transacciones de hardware, las restricciones de plataforma y las limitaciones computacionales y de firmware implicadas en analizar y verificar transacciones blindadas muestran que el soporte de wallets de hardware para Zcash depende no solo de las capacidades del protocolo, sino también del diseño y recursos de cada implementación individual.

### Zkool + Ledger — usando la aplicación oficial Zondax

Como sucesor de Ywallet, Zkool heredó el objetivo de la firma en frío blindada, pero tomó un camino distinto para alcanzarlo, uno determinado directamente por el hecho de que la criptografía por sí sola no hace utilizable una integración si la aplicación de firma no puede distribuirse de forma segura.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Uso de la aplicación Zondax por parte de Zkool

Zkool avanzó hacia el uso de la aplicación oficial Ledger Zcash desarrollada por Zondax, en lugar de la aplicación propietaria abandonada Ledger de Ywallet. En vez de mantener una aplicación personalizada que la tienda de Ledger no aceptaría, Zkool se basó en la aplicación que ya estaba aceptada y distribuida a través del propio ecosistema de Ledger.

Ese cambio significó que los usuarios ya no necesitaban depender de instalar una aplicación personalizada sin firmar de Ledger para usar esta integración, ya que la aplicación de Zondax se distribuía oficialmente a través del ecosistema de Ledger.

Sin embargo, esta integración afronta un cambio importante el 5 de noviembre de 2026, cuando está previsto que el soporte para la aplicación heredada Zcash Shielded finalice mientras Ledger la elimina gradualmente. Como la integración de Zkool con Ledger depende de esta aplicación, el cambio plantea dudas sobre la disponibilidad futura de la conexión existente. El impacto preciso en Zkool depende de si puede continuar utilizando la aplicación heredada fuera de Ledger Wallet o pasar a una alternativa compatible.

### Pools blindados admitidos

Según el desarrollador de Ywallet, la integración de Zkool con Ledger usaba la aplicación oficial Ledger desarrollada por Zondax y admitía tanto Zcash transparente como blindado. Sin embargo, su soporte blindado se limitaba a Sapling y no admitía Orchard, junto con otras limitaciones de integración, como un máximo de cinco entradas y salidas de cada tipo y la ausencia de compatibilidad con Ledger Live.

Esta limitación reflejaba el alcance de la implementación subyacente de Zondax Ledger en aquel momento. El trabajo anterior de Zondax con Ledger proporcionaba soporte de Sapling, y su posterior lanzamiento en 2024 de la aplicación Zcash Shielded Ledger excluía inicialmente Orchard y Unified Addresses. Por tanto, una integración construida alrededor de esa aplicación heredó las capacidades y limitaciones de la implementación de wallet de hardware de la que dependía.

La situación evolucionó posteriormente con el lanzamiento de la aplicación dedicada Zcash Shielded Ledger en noviembre de 2024. Zondax indicó que la aplicación se había publicado oficialmente mediante Ledger Live y después publicó guías de integración y paquetes Rust y JavaScript para permitir que otras wallets se integraran con ella. Sin embargo, en el lanzamiento, la aplicación se comunicaba exclusivamente con Zecwallet Lite Desktop, mientras se seguían desarrollando integraciones con wallets más amplias.

La siguiente etapa fue el desarrollo de la aplicación más reciente de Ledger basada en Rust Zcash. En junio de 2026, Ledger informó de que se habían implementado el intercambio de UFVK y la generación de Orchard Unified Address, mientras la firma de transacciones de Orchard y ClearSign seguían en desarrollo. Ledger también declaró que el trabajo continuaría en la ruta de Ironwood a medida que cambiara el protocolo.

Ironwood posteriormente requirió actualizaciones en todo el ecosistema de wallets Zcash. Zkool lanzó soporte para la migración de Orchard a Ironwood a partir de la versión 6.24.0, y siguió refinando la migración y la canalización de transacciones en versiones posteriores. Ledger, por separado, fusionó la firma v2 de PCZT en su nueva aplicación el 27 de julio, aunque la implementación todavía no había completado la revisión de Ledger ni el despliegue de Ledger Live el 20 de agosto, un hito que desde entonces se ha lanzado, y Ledger Wallet Desktop 4.21+ ahora ofrece soporte nativo de Ironwood directamente.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Por tanto, la evolución se entiende mejor no como una sola actualización de Zondax a Ironwood, sino como varios desarrollos relacionados: la implementación original Zondax centrada en Sapling, la aplicación Zcash Shielded Ledger de 2024, la aplicación más reciente Ledger Rust con soporte de Orchard y PCZT, la integración nativa propia de Ledger en Ledger Wallet Desktop y actualizaciones paralelas de wallets como Zkool mientras el ecosistema transitaba a Ironwood.

### Compatibilidad actual de dispositivos y plataformas Ledger para Zcash

La compatibilidad de Zcash en Ledger depende de

- El modelo de dispositivo
- La aplicación instalada
- La plataforma utilizada para administrarlo y,
- Si la transacción es transparente o blindada.

A fecha del 21 de julio de 2026 (la última actualización de Ledger), la aplicación Zcash Shielded es compatible con Nano S Plus, Stax y Flex, pero todavía no con Nano X ni Nano Gen5.

Nano X y los demás modelos, excepto el Nano S original, aún pueden usar la aplicación clásica Zcash, que admite transacciones transparentes y el gasto de fondos blindados hacia direcciones transparentes (desblindaje), pero no la firma de blindado a blindado. El Nano S original no admite ninguna de las dos aplicaciones, porque Ledger está eliminando gradualmente el soporte para el dispositivo y su aplicación más reciente Zcash no está disponible en él. Los dispositivos se conectan a Ledger Wallet (anteriormente Ledger Live), la aplicación complementaria de Ledger, disponible en escritorio para Windows, macOS y Linux, y en móvil para iOS y Android.

Ledger ha añadido Zcash blindado nativo a Ledger Wallet Desktop, construido sobre el pool Ironwood, lo que elimina la necesidad de una wallet complementaria independiente. ZEC blindado todavía no es compatible con la aplicación móvil de Ledger para iOS y Android, aunque se prevé soporte móvil en una versión futura.

Fuera del propio software de Ledger, el uso blindado depende de una wallet complementaria compatible y de las plataformas que admita. A medida que Ledger sigue ampliando el soporte de Ironwood, la compatibilidad depende del modelo de dispositivo, firmware, versión de aplicación y sistema operativo, de modo que el soporte general de Zcash no garantiza necesariamente la compatibilidad.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### Firma en frío de YWallet; un enfoque anterior

Ywallet es una wallet complementaria, independiente tanto de Ledger como de Zondax, que siguió su propio camino hacia la firma en frío blindada.

Ywallet es históricamente importante porque exploró la firma en frío para Zcash, lo que significaba que el dispositivo de firma podía mantenerse separado de la wallet en línea.

Para implementar esa arquitectura en hardware Ledger, Ywallet construyó su propia aplicación Ledger, una aplicación propietaria, distinta de la aplicación Zondax tratada en la sección anterior. Esto significaba que Ywallet no dependía de la implementación existente Sapling de Zondax; tenía su propio firmware ejecutando el lado de firma de la relación.

### Por qué importaba la integración

Tener la criptografía y el código de firma no es suficiente. La integración de una wallet de hardware no es un problema puramente criptográfico; también es inevitablemente un problema de distribución y plataforma. Como mínimo, implica:

- Aprobación/distribución de aplicaciones — si la tienda oficial de aplicaciones del fabricante de hardware aceptará y distribuirá la aplicación
- Seguridad de firmware/aplicaciones — si la aplicación cumple los requisitos de seguridad del fabricante para manejar material de claves
- Protocolos de comunicación — cómo intercambian realmente los datos de transacción la wallet complementaria y el dispositivo
- Compatibilidad con la wallet — si los formatos de datos y flujo de la aplicación de firma coinciden con lo que espera la wallet complementaria
- Pools blindados admitidos — para cuáles de Sapling, Orchard y, ahora, Ironwood puede firmar realmente la aplicación

La aplicación propietaria Ledger de Ywallet cumplía los requisitos criptográficos y arquitectónicos; podía firmar transacciones blindadas de Zcash, pero no fue aceptada en la tienda oficial de aplicaciones de Ledger.

### Transición fuera de la aplicación propietaria Ledger

Dado que la aplicación no fue aceptada oficialmente, Ywallet habría tenido que pedir a los usuarios que instalaran firmware sin firmar para usarla; esto supone un compromiso de seguridad real para los usuarios, y Ywallet decidió no pedirles eso. Por tanto, Ywallet finalmente abandonó esa integración concreta en lugar de seguir ese camino.

En vez de revivir una aplicación propietaria, el desarrollo posterior (mediante Zkool, sucesor de Ywallet) avanzó hacia la aplicación oficial Ledger creada por Zondax, sustituyendo una implementación personalizada rechazada por una estandarizada ya aceptada en el ecosistema de distribución de Ledger. Ese cambio fue lo que finalmente hizo posible de nuevo una integración funcional de Ledger.

### El legado de Ywallet

Incluso después de que Ywallet se alejara del desarrollo activo, su creador, Hanh, que también es miembro de ZCG, siguió siendo una voz relevante en el ecosistema, especialmente cuando la migración de Ironwood reveló problemas reportados sobre fondos que parecían haber desaparecido.

**ZODL: un usuario real experimentó fondos faltantes después de la migración Orchard → Ironwood**

Un usuario, Jmo0615, informó de que los fondos que antes eran visibles en su wallet ZODL ya no aparecían después de la migración de Orchard a Ironwood. Indicó que había restaurado la semilla original, reiniciado y recuperado la wallet, y permitido que la versión 3.14.1 (1) de ZODL se sincronizara por completo. También confirmó que no estaba implicada ninguna wallet de hardware Keystone.

No se ha establecido que los fondos se hayan perdido realmente. Más bien, se sospecha que es un problema relacionado con el descubrimiento o la migración de la wallet, en el que fondos anteriormente visibles dejaron de mostrarse después de la transición a Ironwood. Los fondos que no se detectan o muestran no deben describirse automáticamente como fondos que se han perdido permanentemente, y esta distinción es importante para comprender los problemas de migración.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: las “notas bloqueadas” pueden explicar fondos aparentemente no disponibles**

Otro aspecto importante de las wallets blindadas es cómo el estado de la wallet puede afectar a los fondos que un usuario puede gastar realmente. Hanh explicó que un usuario puede bloquear accidentalmente una nota mediante el control de monedas, una función que permite a los usuarios elegir manualmente qué notas se utilizan para gastar. En esta situación, una nota puede seguir existiendo en la wallet, pero estar marcada como no disponible para gastar.

Esto destaca una distinción importante al investigar problemas de wallets. La cantidad de ZEC que existe en una wallet no siempre es la misma que la cantidad disponible actualmente para gastar. Factores como la selección de notas, sincronización, estado de migración, recuperación de la wallet y configuración del control de monedas pueden afectar al saldo mostrado o disponible para gastar. Por tanto, los informes de “fondos faltantes” deben distinguir cuidadosamente entre fondos no detectados o mostrados, fondos detectados pero no disponibles para gastar y fondos que realmente se han perdido.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**¿Qué es Keystone?**

Keystone es una wallet de hardware aislada por aire. Su dispositivo de firma no tiene conexión directa por cable o inalámbrica con la aplicación complementaria durante el propio proceso de firma, sino que se comunica mediante códigos QR. Aquí se combina con Zashi (ahora renombrada como Zodl), la wallet complementaria nativa de Zcash, y esa combinación hace que el principio de aislamiento de claves sea especialmente explícito y fácil de rastrear.

**El flujo Keystone/Zashi**

La integración Zcash de Keystone con Zashi hace esta separación particularmente explícita. Cuando conectas Keystone a Zashi, la Unified Full Viewing Key se transfiere de Keystone a Zashi.

Por tanto, el flujo es:

![Keystone and Zashi viewing flow](/content-images/keystone-zashi-viewing-flow.webp)

**¿Qué puede hacer Zashi con la UFVK?**

Zashi puede usarla para:

- identificar transacciones blindadas entrantes
- determinar saldos
- obtener información sobre actividad blindada

Pero no puede gastar los fondos simplemente porque tenga la UFVK.

La UFVK es una “capacidad de visualización” que permite conocer saldos y transacciones, pero no permite gastar.

### ¿Qué permanece dentro de Keystone?

La semilla/autoridad de gasto permanece en Keystone. Zashi no recibe la semilla, la clave de gasto ni la clave privada de autorización de gasto. Recibe la UFVK, información de direcciones y la información necesaria para una operación de solo visualización.

Juntas, estas dos mitades completan el panorama. Lo que sale del dispositivo, como la UFVK, direcciones e información de solo visualización, es suficiente para que Zashi supervise la cuenta, pero nada de lo que sale del dispositivo es suficiente para mover fondos fuera de ella.

Por eso la integración Zashi y Keystone puede proporcionar almacenamiento en frío blindado. La aplicación de wallet puede supervisar la cuenta sin poseer la autoridad requerida para gastar desde ella. La integración se lanzó específicamente para permitir el almacenamiento en frío de ZEC blindado.

Cuando deseas gastar:

![Keystone and Zashi spending flow](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito sigue un modelo de aislamiento de claves muy similar al de Keystone, pero su implementación es más reciente. En vez de emparejarse con una wallet complementaria existente como Zashi, Hito incluye su propia wallet Android, y el proceso de incorporación entre el dispositivo de hardware y esa aplicación Android está documentado en los hitos de desarrollo de Hito.

**Incorporación: qué recibe la aplicación Hito**

La wallet Android utiliza:

- la Unified Full Viewing Key (UFVK)
- Unified Address
- huella de semilla ZIP-32
- información de red

al incorporar la cuenta de hardware.

Ten en cuenta que la aplicación Android nunca recibe la semilla ni las claves privadas de gasto de la wallet de hardware.

![Hito onboarding](/content-images/hito-onboarding.webp)

**¿Qué recibe la aplicación Hito?**

La información documentada de incorporación incluye:

- UFVK
- Unified Address
- huella de semilla ZIP-32
- Red

La UFVK proporciona a la wallet Android la información que necesita para operar la cuenta como una wallet con capacidad de visualización sin recibir la semilla. La huella de la semilla es un identificador de longitud fija derivado de la semilla, usado para reconocer qué cuenta es cuál; no es la semilla y no concede ninguna capacidad de gasto, por lo que su presencia no contradice la afirmación anterior de que “nunca recibe la semilla”.

**¿Qué permanece en Hito?**

La semilla real, las claves privadas de gasto y la autoridad de firma permanecen en el dispositivo de hardware. Hito realiza entonces la firma fuera de línea.

El hito actual de Hito indica que todo el flujo de creación, exportación, firma fuera de línea e importación está operativo, con transporte BLE y exportación QR BBQr del PCZT firmado.

Conviene nombrar explícitamente ese flujo, ya que es el caso concreto del ciclo completo cubierto antes en este informe: la wallet Android crea el PCZT sin firmar, lo exporta a Hito, Hito firma fuera de línea con su material de claves aislado y el PCZT firmado se importa de vuelta a la wallet Android.

En ningún momento la semilla o la clave de gasto cruza ese límite en ninguna dirección.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## De Orchard a Ironwood: la evolución del soporte de wallets de hardware

Orchard es un pool blindado del protocolo Zcash que permite a los usuarios almacenar y realizar transacciones de ZEC con privacidad mejorada. Introducido en Network Upgrade 5 (NU5), Orchard utiliza el sistema de pruebas Halo 2 y una arquitectura criptográfica rediseñada para admitir transacciones blindadas sin revelar información sensible de la transacción, como remitente, destinatario o cantidad.

Ironwood es un pool blindado introducido en la actualización de red NU6.3 de Zcash como sucesor del pool Orchard. Utiliza el protocolo criptográfico Orchard mientras introduce cambios diseñados para mejorar la seguridad a largo plazo de los fondos blindados, incluida la recuperabilidad cuántica y garantías más sólidas sobre la integridad del suministro.

Desde el principio, es esencial aclarar que Ironwood no sustituyó el protocolo Orchard por un sistema criptográfico completamente nuevo. Ironwood se introdujo como un nuevo pool blindado construido a partir del protocolo Orchard existente. Esto significa que tienen la misma estructura de Action, el mismo sistema de pruebas Halo 2 y las mismas construcciones de notas y claves.

Ironwood tiene su propio árbol de compromisos de notas, conjunto de nulificadores, ancla y pool de valor, por lo que a nivel de consenso es un pool genuinamente separado. Pero criptográficamente es una extensión de Orchard y no una reconstrucción.

Fue diseñado de esta manera para:

1. **Integridad del suministro.** El 29 de mayo de 2026, el investigador de seguridad Taylor Hornby divulgó de forma privada un fallo crítico de solidez en el sistema de pruebas de conocimiento cero de Orchard, uno que podría haber permitido crear ZEC falsificado sin dejar un rastro on-chain. Como los datos de transacción de Orchard son privados, nadie puede verificar de forma independiente que no se hubiera creado ZEC falsificado antes de la corrección. Sellar el pool antiguo y empezar uno nuevo en cero resuelve ese problema de una forma que corregir Orchard directamente no podía.
2. **Garantizar la recuperabilidad cuántica.** Ironwood fue diseñado para que sus fondos puedan participar en un futuro mecanismo de recuperación si alguna vez se rompen las suposiciones subyacentes de logaritmo discreto.
3. **Minimizar el cambio de implementación.** En lugar de diseñar un protocolo blindado completamente nuevo, se reutilizó la arquitectura probada de Orchard. Esto significó que debía escribirse desde cero mucho menos código nuevo de transacciones, pruebas, wallets y wallets de hardware.

### La cronología pública

- 29 de mayo: se divulga la vulnerabilidad de Orchard.
- Junio: las transacciones de Orchard se restringen temporalmente mientras se distribuye una corrección inicial mediante NU6.2. El 12 de junio, un desarrollador principal fija como objetivo el 21 de julio para la actualización completa; después se retrasa una semana. Se planteó una preocupación comunitaria de que los propietarios de Keystone serían los últimos en migrar; un desarrollador principal respondió entonces que Keystone admitiría Ironwood desde el primer día, con firmware previsto para el 3 de julio, pendiente de constantes de firma finalizadas y cambios de API de Orchard del núcleo de Zcash.
- Principios de julio: NU6.3 llega a testnet; Zebra 6.0.0 se publica el 10 de julio.
- 27–28 de julio: el trabajo de firma v2 de Ledger Ironwood PCZT se fusiona en una rama de integración. Ironwood (NU6.3) se activa el 28 de julio en el bloque 3.428.143, sellando el pool original Orchard tras un torniquete que limita cuánto ZEC puede salir de Orchard a la cantidad que se depositó legítimamente en él, e introduce un nuevo formato de transacción.

Zebra se convierte en el nodo requerido, ya que zcashd no admite las nuevas reglas de consenso. Las direcciones no cambian porque Ironwood reutiliza la estructura de receptor de Orchard, de modo que las wallets enrutan automáticamente las direcciones existentes al nuevo pool. Lo que las wallets sí necesitan es funcionalidad de migración, puesto que los fondos de Orchard deben trasladarse finalmente a Ironwood por sus propietarios, y las nuevas salidas que reciben Orchard ahora están bloqueadas completamente por consenso.

### Qué cambió técnicamente

Los formatos de transacción pasaron de la versión 5 a la versión 6, de modo que una sola transacción puede llevar un componente Ironwood junto con los componentes existentes Sapling/Orchard/transparentes. PCZT se amplió en consecuencia:

- La codificación pasó de PCZT v1 a v2.
- Un paquete Ironwood separado ahora se sitúa junto a los de Sapling y Orchard.
- Se admiten transacciones v6 y un nuevo sighash v6.
- Los textos claros de notas obtuvieron una nueva versión (V3).

El cambio de sighash es especialmente importante para las wallets de hardware. En v6, las anclas Orchard y Ironwood se excluyen del hash de firma y solo alimentan el resumen de datos de autorización. Es un cambio real de firmware, no solo un aumento de versión. Un dispositivo debe implementar correctamente el nuevo sighash y recalcularlo por sí mismo en lugar de confiar en lo que afirma aprobar la aplicación complementaria.

El contrato de aislamiento en sí no cambió: el dispositivo sigue devolviendo únicamente la firma de autorización de gasto, nunca `alpha`, y tampoco produce la firma de vinculación; el anfitrión continúa gestionando las pruebas y todo lo demás.

Sin embargo, una regla de firmante sí cambió con v6: los gastos de relleno ficticios los firma el finalizador de E/S en vez del dispositivo, puesto que el dispositivo no tiene forma de verificarlos con datos de notas reales. La función de firmante del dispositivo los omite en vez de que se le pida firmar algo que no puede comprobar. Las comisiones mostradas también suman ahora los saldos de valor de Orchard y Ironwood, puesto que una transacción v6 puede gastar desde cualquiera de los dos pools en la misma transacción.

Acertar con esa contabilidad de pools importa en la práctica, no solo en teoría. Un error reciente en la wallet Zcash propia de Brave es una ilustración útil: su cálculo de comisiones suponía que todas las entradas blindadas pertenecían al pool heredado Orchard, lo que causaba acciones duplicadas y estimaciones de comisión incorrectas cada vez que una transacción involucraba realmente Ironwood. Esa es exactamente la clase de error que el principio “recalcúlalo tú mismo, no confíes en el anfitrión” detrás de la firma de wallets de hardware pretende detectar. Una wallet complementaria calculó mal la contabilidad del pool y solo un dispositivo que comprobara independientemente sus propias cuentas lo señalaría antes de firmar.

### Situación de cada firmante

**Ledger acaba de cambiar todo el panorama.** El 23 de septiembre de 2026, Ledger lanzó soporte nativo para Zcash blindado directamente dentro de Ledger Wallet Desktop; ya no hace falta una aplicación complementaria separada. Tu clave de gasto permanece en el dispositivo, el ordenador realiza los cálculos de la transacción y apruebas todo en pantalla antes de que se firme. Solo admite Ironwood, no los antiguos pools Orchard ni Sapling. El inconveniente es que la aplicación heredada “Zcash Shielded” creada por Zondax, que requería una wallet complementaria como Zkool para funcionar, está siendo descontinuada. Ledger retirará esa aplicación antigua de disponibilidad el 5 de noviembre, por lo que cualquiera que siga utilizándola debe mover sus fondos antes de entonces.

**Keystone está en buena situación.** El firmware 3.0.2 añadió compatibilidad total con Ironwood en julio, y sigue siendo el requisito estable actual. Sin embargo, esa versión o una posterior es necesaria para firmar cualquier cosa.

**Hito ha avanzado más allá del hito inicial de testnet.** Firmó y envió con éxito su primera transacción real de Orchard a Ironwood en hardware físico (inicialmente en testnet). Actualizaciones posteriores confirmaron flujos de mainnet (Ironwood→Ironwood, Ironwood→Transparente y otros) en hardware de producción. El firmware estable y un lanzamiento más amplio siguen en curso.

Zondax y Zkool están actualmente en transición. La aplicación de Zondax es la que se está retirando en Ledger. Zkool, que dependía de esa aplicación para comunicarse con dispositivos Ledger, no ha indicado qué ocurrirá con esa función una vez desaparezca la antigua aplicación. No está claro si seguirá siendo relevante para los usuarios de Ledger en adelante o si su futuro estará principalmente con otros dispositivos.

La migración en sí es el mayor efecto en cadena. Dado que la cantidad que cruza pools es pública, las wallets distribuyen las transferencias entre denominaciones estándar a lo largo del tiempo en vez de mover un saldo en un solo bloque visible, lo que supone muchas transacciones que firmar por migración, y es precisamente la razón por la que la firma por lotes de PCZT fue tan importante para las wallets de hardware.

El trabajo de firmware de Ledger también encontró límites de hardware: un gasto de nota real podía alcanzar decenas de miles de llamadas al sistema criptográficas en un único comando, activando el watchdog del dispositivo. La corrección trasladó la aritmética de campos al software y requirió un estado de memoria temporal compartido para ajustarse a las restricciones de pila de Nano X.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### La evolución en una imagen

![The evolution in one picture](/content-images/orchard-to-ironwood-evolution.webp)
