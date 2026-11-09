# Firma en frío blindada [Shielded Cold Signing]

> **Idea clave:** La billetera complementaria ve todo lo necesario para crear y supervisar una transacción blindada. Solo el hardware wallet conserva la autoridad para autorizar un gasto. Esa división es el objetivo completo de la firma en frío blindada.

El blindaje en Zcash implica mover fondos desde una dirección pública y transparente hacia una privada y blindada, ocultando los detalles de la transacción mediante las funciones de privacidad de Zcash.

### ¿Qué cambia cuando blindas ZEC?

Con una transacción transparente de Zcash, información como:

- dirección del remitente
- dirección del destinatario
- importe transferido

puede observarse en la blockchain.

Cuando blindas ZEC, tus fondos se trasladan a un pool privado (como Ironwood). La blockchain puede verificar que una transacción es válida sin revelar los detalles privados de tu transacción. Desde la actualización NU6.3 del 28 de julio de 2026, los fondos recién blindados pasan al pool Ironwood, ya que el pool Orchard más antiguo ya no acepta nuevos depósitos, aunque todavía permite retiros.

### Componentes de una transacción blindada

### 1. La nota (el registro de saldo blindado)

Una nota es un registro criptográfico privado que representa una cantidad no gastada de ZEC perteneciente a un usuario.

A diferencia de una blockchain pública, donde los saldos se muestran en texto claro, una nota blindada cifra el valor y los detalles de propiedad para que los observadores on-chain no puedan ver quién posee los fondos.

Al iniciar una transacción, la billetera complementaria examina el registro, identifica las notas no gastadas del usuario y selecciona qué notas gastar.

### 2. El anulador (el mecanismo de detección de doble gasto)

Dado que los detalles de una nota están ocultos del registro público, la red necesita un mecanismo para detectar el doble gasto sin revelar qué nota se está gastando.

Un anulador es un marcador criptográfico único derivado de una nota específica. Cuando se gasta una nota, su anulador se publica en la blockchain.

La red verifica que el anulador no se haya registrado anteriormente. Si no se ha registrado, el gasto puede aceptarse. Es fundamental que un observador externo no pueda usar el anulador para determinar de qué nota específica procede.

La billetera complementaria deriva y construye el anulador adecuado como parte del ensamblaje de los datos de la transacción.

## Claves

Las claves son elementos de información criptográfica que controlan el acceso a tus fondos y permiten que tu billetera realice operaciones como recibir, visualizar y gastar ZEC.

Una billetera contiene varias claves diferentes, cada una con una finalidad distinta, igual que una sola cuenta puede tener credenciales separadas para acceso de lectura y acceso de escritura.

Las claves son fundamentales para la relación entre la billetera complementaria y el hardware wallet, porque las diferentes claves tienen distintas finalidades y solo una de ellas debe mantenerse resguardada.

Es importante saber que cada pool blindado construye sus claves como un árbol de derivación, donde las flechas apuntan desde un componente hacia todo aquello que puede derivarse de él. Los usuarios que desean recibir pagos blindados deben tener una dirección de pago blindada, que se genera a partir de una clave de gasto.

### La jerarquía de claves

**1. Clave de gasto**

Esta es la clave más sensible en materia de seguridad. Otorga la capacidad criptográfica de autorizar el gasto de ZEC.

Esta es la clave a la que se hace referencia cuando en otra parte de este informe se menciona que «el hardware wallet conserva la clave».

En una arquitectura de firma en frío, la clave de gasto se mantiene dentro del hardware wallet y nunca se expone a la billetera complementaria. La billetera complementaria no debería necesitar poseer esta clave en absoluto.

Tanto en Sapling como en Orchard, las jerarquías de claves derivan la autoridad de gasto y las capacidades de visualización como dos ramas distintas de una clave de gasto raíz:

- **Sapling:** Una clave de gasto expandida (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) deriva claves de autorización de pruebas (𝑎𝑘,𝑛𝑠𝑘) y claves de visualización completas (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘), que a su vez generan claves de visualización entrantes (𝑖𝑣𝑘) y direcciones diversificadas.
- **Orchard:** Una clave de gasto raíz (𝑠𝑘) se ramifica directamente en una clave de autorización de gasto (𝑎𝑠𝑘) y una clave de visualización completa (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Esta división estructural proporciona la base criptográfica formal para el aislamiento de claves de hardware, que implica que la billetera exporte la rama de visualización (UFVK) al ordenador anfitrión para la sincronización de saldos y la creación de transacciones, mientras mantiene la rama de autorización de gasto bloqueada permanentemente en el dispositivo.

La derivación de claves es estrictamente unidireccional. Esto significa que las claves de visualización no pueden invertirse para reconstruir la autoridad de gasto. La irreversibilidad criptográfica hace que exportar una Full Viewing Key unificada (UFVK) sea seguro, ya que concede visibilidad completa de la billetera sin exponer los secretos de gasto en el dispositivo.

**2. Claves de visualización**

Zcash separa la capacidad de ver actividad blindada de la capacidad de gastarla. Una clave de visualización permite a una billetera u otra parte autorizada ver información sobre transacciones blindadas sin conceder autoridad de gasto.

- **Full Viewing Key (FVK), incluida como una Full Viewing Key unificada (UFVK):** Derivada deliberadamente de la clave de gasto, permite al software detectar y descifrar la actividad blindada de la billetera, identificando así las transacciones. También le permite calcular saldos sin poder autorizar un gasto. Se describe mejor como un derivado menos privado de la clave de gasto, no como una copia más débil de la semilla.

La Full Viewing Key (FVK) proporciona visibilidad completa de solo lectura, al tiempo que mantiene una estricta separación de seguridad. Al descifrar tanto los textos cifrados de notas entrantes como salientes, mediante su componente de clave de visualización saliente, una billetera complementaria que solo dispone de FVK puede mostrar un historial completo y etiquetado de transacciones, en lugar de solo un saldo acumulado.

Varias direcciones de pago diversificadas e invinculables comparten la misma FVK y clave de visualización entrante (IVK), lo que permite generar direcciones ilimitadas sin aumentar la sobrecarga de exploración de la blockchain.

Esta separación funcional constituye la base de los flujos de trabajo de firma en frío. Toda la exploración continua de la red, el seguimiento del historial y la gestión de direcciones se delegan al software anfitrión, mientras que la autoridad de gasto permanece aislada en el dispositivo hardware.

![Key derivation diagrams](/content-images/key-derivation-diagrams.webp)

### La distinción crítica: UFVK frente a clave de gasto

> **La UFVK puede compartirse. La clave de gasto debe permanecer en el hardware wallet.**
>
> La billetera complementaria utiliza la clave de visualización para supervisar la billetera, detectar fondos entrantes, identificar notas y ayudar a preparar transacciones. No dispone de la clave privada necesaria para autorizar gastos.

Como se indicó anteriormente, la separación de claves es la base de la arquitectura de firma en frío.

La billetera complementaria puede realizar la mayor parte del trabajo necesario para preparar una transacción sin llegar a controlar los fondos. El hardware wallet solo necesita recibir la transacción preparada y realizar la operación final de firma.

Los fabricantes de hardware wallet no necesitan inventar esta separación por sí mismos. El diseño de claves de Zcash ya separa las capacidades de visualización de la autoridad de gasto a nivel de protocolo, y los fabricantes simplemente construyen sus funciones de firma y exportación sobre esa estructura existente. El protocolo permite derivar información como una dirección blindada o una clave de visualización completa a partir de una clave de gasto, mientras que la propia clave de gasto permanece privada, lo que permite a hardware wallets como Ledger, Keystone y Hito proporcionar al software complementario la información de visualización que necesita sin exponer nunca la clave privada que puede gastar los fondos.

### Lo que realmente hace la billetera complementaria con la información de claves

Mediante el material de la clave de visualización, la billetera complementaria puede:

- identificar tus fondos y notas
- determinar qué notas pueden gastarse
- derivar o identificar direcciones relevantes
- construir la transacción
- generar o coordinar las pruebas necesarias
- preparar la transacción para su firma

Es importante saber que necesitar construir una transacción no es lo mismo que necesitar la clave privada de gasto. Esa desvinculación es una de las ideas de seguridad fundamentales detrás de la integración de hardware wallets.

## Construcción y autorización de transacciones blindadas

Estos son los procesos implicados en la creación y autorización de la transacción. En términos simples, estos procesos son lo que la billetera realmente hace con esos datos para enviar dinero:

### Construcción de la transacción (ensamblaje de la transacción blindada)

La construcción de transacciones es el proceso de ensamblar la información necesaria para crear una transacción Zcash válida a partir del pago previsto por el usuario.

El proceso de construcción de la transacción combina las notas seleccionadas, los destinatarios, los importes, las tarifas, los anuladores y otros datos necesarios de la transacción en una estructura de transacción. En el caso de las transacciones blindadas, también prepara la información necesaria para generar las pruebas zero-knowledge y las firmas requeridas.

Por lo general, la billetera complementaria realiza esta etapa. Esta

- Selecciona las notas que se gastarán
- Determina las entradas y salidas de la transacción
- Calcula los valores necesarios
- Prepara los datos de la transacción que posteriormente se probarán y firmarán.

En una configuración de firma en frío, los datos resultantes de la transacción pueden empaquetarse en un PCZT y pasarse al hardware wallet para el paso de firma crítico para la seguridad.

### Generación de pruebas (demostración de la validez del protocolo)

La generación de pruebas se refiere a la creación de pruebas zero-knowledge (como Halo 2 o Groth16) que demuestran que una transacción sigue las reglas del protocolo Zcash.

La prueba ayuda a la red a garantizar:

- Que el usuario que gasta está autorizado a gastar las notas
- Que las notas existen realmente
- Que los anuladores correspondientes son únicos
- Que el total de entradas es igual al total de salidas más las tarifas.

Hace todo esto sin revelar ningún detalle privado subyacente.

La generación de pruebas exige un uso intensivo de recursos computacionales. Delegar esta responsabilidad al dispositivo complementario evita que el hardware wallet se bloquee o se quede sin memoria.

### Firma (autorización del gasto)

La firma es fundamentalmente distinta de la generación de pruebas. Una firma digital actúa como un sello explícito de autorización producido por el titular de la clave privada.

Mientras que una prueba zero-knowledge verifica la validez de la transacción, una firma digital demuestra la autoridad de gasto. La firma certifica que el verdadero propietario aprueba los parámetros específicos de la transferencia.

La firma requiere una potencia de cálculo mínima, lo que la hace ideal para un hardware wallet.

### ¿Qué es la firma en frío blindada?

La firma en frío blindada es un método para autorizar una transacción blindada de Zcash mientras se mantienen las claves privadas de gasto aisladas de la billetera complementaria conectada a Internet. La transacción puede construirse y prepararse en un ordenador en línea, mientras que un hardware wallet independiente, mantenido sin conexión o aislado de otro modo, utiliza sus claves protegidas para autorizar la transacción.

El proceso puede simplificarse así:

![Shielded cold signing process](/content-images/cold-signing-process.webp)

La billetera complementaria envía los parámetros estructurados de la transacción al dispositivo hardware, que firma internamente la carga útil sin liberar nunca la clave privada de gasto a la máquina anfitriona.

## Billeteras complementarias y hardware wallets

Las transacciones blindadas pueden implicar tanto una billetera complementaria como un hardware wallet, y cada uno cumple una función distinta.

### Billetera complementaria

¿Qué es una billetera complementaria?

La billetera complementaria se ejecuta en un ordenador o dispositivo móvil y realiza la mayoría de las tareas implicadas en la creación de la transacción, como:

- Seleccionar las notas que se gastarán
- Construir la transacción
- Calcular los datos necesarios de la transacción
- Coordinar la generación de las pruebas zero-knowledge requeridas.

### ¿Por qué es útil una billetera complementaria?

La billetera complementaria gestiona el proceso de creación de transacciones, pero si el ordenador contrae malware, un atacante podría:

- ver lo que estás haciendo,
- modificar una transacción sin firmar,
- intentar engañarte para que apruebes algo.

La billetera complementaria no necesita tener acceso a la clave privada almacenada en el hardware wallet, por lo que puede gestionar la construcción de transacciones y otras tareas computacionales mientras el hardware wallet proporciona el límite de seguridad para la clave privada.

### Hardware wallet

Un hardware wallet es un dispositivo físico sin conexión que aísla tus claves privadas de teléfonos u ordenadores conectados, y actúa como una caja fuerte segura para tus activos criptográficos.

### ¿Por qué es útil un hardware wallet?

Si tu ordenador contrae malware, un atacante podría:

- ver lo que estás haciendo,
- modificar una transacción sin firmar,
- intentar engañarte para que apruebes algo.

La clave privada no puede extraerse simplemente del hardware wallet, por lo que el dispositivo puede actuar como un límite de seguridad.

Imagen de las capacidades de la billetera complementaria frente al hardware wallet

La separación entre estas dos billeteras es especialmente importante para las transacciones blindadas porque son más complejas que las transacciones transparentes e implican componentes como notas blindadas, anuladores, compromisos, pruebas zero-knowledge y firmas de transacciones.

No sería práctico que el hardware wallet realizara cada operación computacional. En su lugar, la billetera complementaria prepara la transacción y proporciona la información necesaria al hardware wallet para la firma, mientras que la clave privada de gasto permanece aislada dentro del dispositivo hardware.

## Aislamiento de claves

> El aislamiento de claves significa que las claves privadas que pueden autorizar un gasto nunca salen del hardware wallet. La billetera complementaria puede preparar la transacción [transaction]; no puede firmarla.

El aislamiento de claves se refiere a mantener las claves privadas necesarias para autorizar una transacción separadas de la billetera complementaria [wallet] y del dispositivo en el que se ejecuta. En una configuración de firma en frío blindada [shielded], la billetera complementaria puede construir la transacción y coordinar las pruebas [proofs] necesarias, mientras que el hardware wallet mantiene aisladas las claves privadas de gasto sensibles.

Si el ordenador o teléfono complementario se ve comprometido, un atacante puede ser capaz de interactuar con la transacción antes de que se firme, pero idealmente no puede extraer la clave privada del hardware wallet. Por lo tanto, la clave permanece dentro del perímetro de seguridad del dispositivo de hardware.

Esta separación permite a la billetera complementaria realizar la construcción de transacciones y tareas computacionales sin darle acceso directo al material de claves necesario para autorizar la transacción.

![Key isolation](/content-images/key-isolation.webp)

La distinción clave que hay que hacer es que «clave de visualización [viewing key]» no significa que la aplicación reciba una versión más débil de la semilla.

En Zcash, una Full Viewing Key (FVK/UFVK) se deriva deliberadamente de la clave de gasto y otorga a su poseedor la capacidad de detectar y descifrar actividad blindada relevante, pero no de autorizar gastos. La FVK es un derivado menos secreto de la clave de gasto.

**Una advertencia importante sobre la privacidad [privacy]:**

Por tanto, debe saberse que la aplicación no puede robar los fondos solo con la UFVK, pero puede ver la actividad blindada privada de la billetera.

Por eso es más preciso describir la aplicación complementaria como poseedora de *autoridad de visualización*, en lugar de simplemente decir que tiene «información pública».

La forma más sencilla de expresar toda la idea es que la billetera complementaria obtiene suficiente material de claves para saber qué está ocurriendo con la billetera, pero no suficiente material de claves para autorizar lo que ocurre con los fondos de la billetera. Sin embargo, el hardware wallet mantiene aislada la autoridad de gasto y la utiliza únicamente cuando el usuario aprueba una transacción.

Ese es el modelo central de aislamiento de claves detrás de estos diseños de hardware wallet blindados de Zcash y es el mismo modelo que aparece, implementación por implementación, en Ledger, Keystone y Hito, que se abordarán pronto.

## PCZT

PCZT significa Transacción Zcash Creada Parcialmente. Es el paquete que transporta una transacción de Zcash y la información necesaria para completarla de una etapa a otra.

Es un formato estandarizado para una transacción de Zcash mientras la transacción aún se está construyendo. Permite que diferentes participantes o dispositivos realicen distintas partes del proceso de creación de la transacción y se pasen entre ellos la transacción parcialmente completada.

Construir una transacción es significativamente más complejo que firmar una transferencia pública sencilla en protocolos de criptomonedas zero-knowledge [zero-knowledge] como Zcash. Las transacciones blindadas requieren pruebas zero-knowledge computacionalmente intensivas, como las generadas mediante Halo 2 o Groth16. Como resultado, los dispositivos de baja potencia, como los hardware wallets, pueden carecer de la memoria y la capacidad de procesamiento necesarias para gestionar todo el flujo de trabajo de la transacción.

La introducción de PCZT aborda varios desafíos centrales de la arquitectura criptográfica blindada. PCZT es un formato de datos intermedio estandarizado que divide la creación de transacciones en funciones modulares e independientes. Permite que un potente ordenador complementario gestione el ensamblaje de transacciones y la generación de pruebas, mientras restringe un hardware wallet sin conexión estrictamente a la autorización y la firma.

### Limitaciones del hardware y del almacenamiento en frío

Aunque los hardware wallets proporcionan un entorno seguro para proteger las claves privadas de gasto, normalmente tienen RAM, potencia informática y capacidades de transferencia de datos limitadas en comparación con los ordenadores complementarios. Estas limitaciones hacen poco práctico que realicen una generación de pruebas zero-knowledge computacionalmente intensiva o que mantengan el estado completo de la transacción requerido durante el proceso de construcción de esta.

Como resultado, la billetera complementaria puede gestionar las tareas computacionalmente exigentes, mientras que el hardware wallet se mantiene centrado en la operación crítica para la seguridad de autorizar la transacción con sus claves de gasto protegidas.

Esto hace preguntarse: si el dispositivo está tan limitado, ¿cómo sigue realizando *suficiente* verificación para ser confiable?

Pues, en términos sencillos, un hardware wallet no puede aceptar un valor arbitrario de un ordenador complementario y firmarlo. Necesita información suficiente para establecer que el valor que se firma corresponde a la transacción que el usuario pretende autorizar. Esto crea un equilibrio difícil porque el dispositivo debe realizar suficiente análisis y verificación para proteger el proceso de firma, mientras opera dentro de límites estrictos de memoria, cómputo, tamaño de firmware y complejidad de implementación.

La gestión de Orchard PCZT de Ledger es un ejemplo de este desafío, lo que sugiere que el análisis especializado dependiente de circuitos puede hacer que la implementación sea más manejable en dispositivos limitados, pero también puede requerir cambios de firmware cuando evolucionan las estructuras o circuitos de transacción compatibles.

Dos esfuerzos en curso ilustran respuestas diferentes a esta misma limitación.

Una propuesta de investigación sobre una canalización de pruebas completamente de tiempo constante adecuada para arquitecturas de hardware wallet de código abierto y ordenadores convencionales se presentó en la subvención [grant] n.º 423. El objetivo era investigar infraestructura criptográfica que pueda implementarse de forma segura en entornos como C o Rust, a la vez que se reduce la complejidad y la carga de mantenimiento del soporte de Zcash blindado.

Sin embargo, un enfoque alternativo está representado por el propuesto **Zcash SeedSigner**, que es un firmante de código abierto aislado por aire, construido a partir de componentes económicos y fácilmente disponibles. Su flujo de trabajo propuesto mantiene el ordenador complementario separado del dispositivo de firma, pasando un PCZT a través de un espacio aislado por aire para la verificación y firma en el dispositivo.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

En conjunto, estos enfoques ilustran el desafío de ingeniería más amplio detrás de los hardware wallets blindados: la construcción y la generación de pruebas de transacciones pueden tener lugar fuera del dispositivo crítico para la seguridad, pero el firmante debe seguir teniendo suficiente información y capacidad de verificación para autorizar con seguridad la transacción resultante.

### PCZT permite la arquitectura dividida

El estándar de Transacción Zcash Creada Parcialmente (PCZT) es la estructura formal de datos que conecta la billetera complementaria y el hardware wallet.

Una billetera complementaria puede gestionar la selección de notas [note], calcular los anuladores [nullifiers] y generar por sí sola la prueba zero-knowledge. Esto es posible porque la información necesaria para estos pasos, incluida la clave utilizada para derivar anuladores, procede de la clave de visualización en lugar de cualquier elemento vinculado a la autoridad de gasto. A continuación, la billetera complementaria empaqueta estos elementos en un contenedor PCZT.

El PCZT se entrega al hardware wallet, que lee el contexto de la transacción —como los importes y las direcciones [addresses] de los destinatarios—, aplica la firma usando sus claves de gasto protegidas y devuelve el PCZT actualizado al dispositivo complementario.

Este diseño establece un límite de seguridad estricto: un hardware anfitrión potente puede realizar complejas operaciones matemáticas zero-knowledge sin necesitar acceso a las claves de gasto, mientras que los dispositivos de almacenamiento en frío de baja potencia pueden imponer seguridad financiera sin necesidad de calcular criptografía pesada.

### Compromisos de privacidad del generador de pruebas

Aunque delegar la generación de pruebas zero-knowledge a la billetera complementaria u otro generador de pruebas mantiene aisladas las claves de gasto, aún requiere que el generador de pruebas acceda a información sensible de la transacción, como valores de notas, direcciones de destinatarios y compromisos [commitments].

El PCZT mantiene la separación arquitectónica al garantizar que esta información pueda proporcionarse para la generación de pruebas sin transferir las claves privadas de gasto necesarias para la autorización.

Esto garantiza que la autoridad para generar pruebas esté separada de la autoridad de gasto. El generador de pruebas puede realizar la generación de pruebas computacionalmente intensiva sin obtener la autoridad criptográfica para gastar los fondos del usuario.

### Interoperabilidad de PCZT

A medida que PCZT se convierte en una parte importante de los flujos de trabajo de hardware wallet, multifirma y firma aislada por aire de Zcash, la interoperabilidad entre implementaciones independientes se vuelve cada vez más importante.

Una propuesta de junio de 2026 de AngryDavee señaló que ya existían implementaciones de PCZT en proyectos que incluían Ledger, Keystone, Hito, OneKey y la implementación de referencia en librustzcash. Sin embargo, la propuesta identificó una falta de pruebas compartidas para confirmar que estas implementaciones interpretan los PCZT de manera coherente.

La solución propuesta fue un conjunto de pruebas de interoperabilidad de código abierto que contenía vectores de prueba canónicos de PCZT y pruebas entre implementaciones que cubrían el flujo de trabajo completo crear → firmar → finalizar. También propuso probar límites de funciones como el Combinador, donde la información parcialmente firmada de diferentes firmantes puede combinarse antes de finalizar una transacción.

Esto es especialmente relevante para los hardware wallets porque PCZT permite separar la construcción y la firma de transacciones: una billetera complementaria puede construir una transacción y preparar un PCZT, mientras que un dispositivo de hardware recibe la información de firma necesaria y realiza la operación de firma crítica para la seguridad.

La propuesta no se implementó porque Zcash Community Grants decidió no seguir adelante con la subvención después de revisar la propuesta y considerar los comentarios de la comunidad. Como resultado, el conjunto de pruebas entre implementaciones propuesto no se desarrolló mediante esta subvención. Por lo tanto, es una respuesta propuesta a un desafío de interoperabilidad de PCZT identificado, no un estándar que exista actualmente en Zcash.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### El ciclo de vida de un PCZT

| # | Etapa | Descripción |
|---|---|---|
| 1 | Creador | Inicializa el PCZT con metadatos globales de la transacción, incluidas las versiones de transacción, los ID de ramas de consenso [consensus] y los indicadores de pool. |
| 2 | Constructor | Rellena la transacción con las entradas y salidas previstas en los pools transparente [transparent], Sapling, Orchard o Ironwood. |
| 3 | Finalizador de E/S | Declara completo el conjunto de entradas y salidas, calcula las claves de firma vinculante y firma gastos ficticios cuando es necesario. |
| 4 | Actualizador | Adjunta los datos de contexto necesarios para participantes posteriores, como claves de visualización completas, anclas y testigos de Merkle. |
| 5 | Generador de pruebas y firmante | Ejecuta la generación de pruebas zero-knowledge y la firma criptográfica. En las versiones modernas de PCZT, estas dos tareas son totalmente independientes y pueden realizarse secuencialmente o en paralelo. |
| 6 | Combinador | Fusiona determinísticamente varias instancias de PCZT si diferentes dispositivos trabajan simultáneamente en aspectos de la misma transacción. Las reglas de fusión requieren una resolución estricta de conflictos para evitar pérdidas accidentales de datos. |
| 7 | Finalizador de gastos y extractor | Valida todos los elementos criptográficos necesarios, elimina los metadatos de contexto intermedios y produce la transacción Zcash finalizada lista para su difusión en la red [chain]. |

## Implementaciones reales de hardware wallets

### De un vistazo

| Dispositivo   | Lo que recibe el complemento              | Lo que permanece en el dispositivo          | Transporte      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / Orchard FVK, direcciones            | Autoridad de gasto                | USB / BLE      |
| Keystone | UFVK + Dirección Unificada                   | Semilla / claves de gasto              | QR (aislado por aire)|
| Hito     | UFVK, Dirección Unificada, huella de semilla  | Semilla y claves privadas de gasto    | QR / local     |


Se han desarrollado varias implementaciones de hardware wallet para explorar cómo pueden admitirse las transacciones blindadas de Zcash mientras se mantienen las claves de gasto sensibles aisladas de la billetera complementaria. Ledger, Keystone y Hito representan enfoques diferentes para integrar la protección de claves basada en hardware con el flujo de trabajo de transacciones de Zcash.

![Real world hardware wallet implementations](/content-images/hardware-wallet-implementations.webp)

Para entender cómo protegen los fondos blindados, es importante distinguir entre claves de gasto y claves de visualización. En los tres casos, la división sigue la misma estructura:

| Dispositivo | Lo que puede recibir la aplicación complementaria | Lo que permanece protegido en el dispositivo |
|---|---|---|
| Ledger | UFVK / Orchard FVK, direcciones e información pública | Autoridad de gasto / material de claves privadas |
| Keystone | UFVK + Dirección Unificada | Semilla / claves de gasto |
| Hito | UFVK, Dirección Unificada, huella de semilla e información de red | Semilla y claves privadas de gasto |

### Ledger como entorno de firma de hardware

Ledger es una empresa de hardware wallet. Sus dispositivos se construyen en torno a un Elemento Seguro, que es un chip dedicado diseñado para almacenar material de claves privadas y mantenerlo físicamente aislado del resto del dispositivo y de cualquier cosa conectada a él. Ese Elemento Seguro es la razón fundamental por la que un dispositivo Ledger es confiable para el almacenamiento en frío. Esto significa que, incluso si el ordenador o teléfono conectado a él se ve comprometido, las claves dentro del Elemento Seguro no pueden extraerse.

Sin embargo, por sí solo, un dispositivo Ledger está vacío con respecto a cualquier criptomoneda específica. Necesita una aplicación instalada que sepa cómo manejar la criptografía particular de esa moneda.

Un dispositivo Ledger está vacío con respecto a cualquier criptomoneda específica, por lo que necesita una aplicación que conozca la criptografía de esa moneda. Para Zcash ha habido dos generaciones:

- La aplicación original «Zcash Shielded» creada por Zondax, utilizada con billeteras complementarias como Zkool y que se retirará el 5 de noviembre de 2026, y
- La nueva aplicación Zcash de Ledger (3.9.4+), utilizada de forma nativa por Ledger Wallet Desktop 4.21+ para Ironwood blindado de ZEC.

El modelo de aislamiento de claves que aparece a continuación se aplica a ambos.

Zkool es la billetera complementaria de tu teléfono u ordenador que se comunica con esa aplicación. Construye la transacción, la envía al Ledger y, a continuación, la aplicación Zondax del dispositivo la firma y devuelve la firma.

Por tanto, Zondax es el software que se ejecuta en el hardware, y Zkool es el software que se ejecuta fuera de él usando la aplicación de Zondax para comunicarse con el dispositivo.

### ¿Qué sale del Ledger?

El software Zcash de Ledger incluye una función específica para exportar la clave de visualización de la billetera, que es la clave que permite al software ver saldos y transacciones sin poder gastar nada.

Esta función puede devolver una de dos cosas:

- Una Full Viewing Key Unificada de Visualización Completa (UFVK), que es la clave de visualización completa que cubre todos los pools blindados de Zcash a la vez, o
- Una Orchard Full Viewing Key (FVK)

De cualquier forma, lo que sale siempre es únicamente una clave de visualización. Sin importar qué versión solicites, esta función no tiene forma de devolver la única pieza de información que realmente permitiría a alguien mover fondos: la clave de gasto.

Ese es precisamente el objetivo de cómo está construida: está diseñada de modo que lo único que puede exportar es algo seguro para entregar a una aplicación complementaria.

La jerarquía de claves de Zcash está estructurada de tal manera que, para cada pool blindado, la clave de gasto deriva dos elementos separados:

- Una clave de autorización de gasto, y
- Una clave de visualización completa

La FVK puede derivar después otras capacidades propias relacionadas con la visualización, pero en ningún momento esa ruta de derivación conduce de vuelta a la autoridad de gasto. Una vez que una clave se ha ramificado hacia el lado de visualización de la jerarquía, permanece allí y no puede utilizarse para reconstruir la clave de autoridad de gasto de la que procede.

Ironwood sigue este mismo patrón, ya que reutiliza la construcción subyacente de claves y notas de Orchard. Sin embargo, es un pool distinto a nivel de consenso, con su propio árbol de compromisos y conjunto de anuladores. Eso significa que una UFVK es en realidad un paquete de claves de visualización por pool —transparente, Sapling, Orchard y ahora Ironwood—, no una única clave plana.

Una UFVK exportada antes de que se activara Ironwood no incluirá una clave de visualización Ironwood, ya que ese pool aún no existía. Precisamente por eso las billeteras tuvieron que actualizarse para reconocer y derivar UFVK compatibles con Ironwood después de la actualización 3 de NU6.

### ¿Qué permanece en Ledger?

La autoridad de gasto permanece en el dispositivo.

El firmante Ledger recibe una transacción/PCZT del anfitrión y genera la firma de autorización de gasto según el pool del que gaste la transacción —el pool Ironwood porque la integración actual de Ledger solo admite Ironwood—. La firma se produce entonces en el dispositivo, y el anfitrión recibe únicamente la firma, no la clave privada de gasto.

Esto también es coherente con el modelo general de seguridad de Ledger. Su Elemento Seguro aísla el material de claves privadas, y los requisitos de seguridad de aplicaciones de Ledger prohíben específicamente que las aplicaciones expongan esos secretos al anfitrión.

El firmante de Ledger puede exportar la FVK/UFVK mientras realiza de forma independiente la firma de transacciones. Ambas capacidades se proporcionan mediante funciones separadas, no agrupadas en una sola.

### ¿Qué significa eso en la práctica?

Supongamos que tu Ledger contiene 10 ZEC.

La billetera complementaria puede tener la UFVK y, por tanto, determinar: «Esta billetera ha recibido 10 ZEC». Puede escanear y mostrar transacciones y saldos.

Pero si alguien compromete la billetera complementaria, la UFVK por sí sola no le da la capacidad de crear la firma de autorización de gasto.

El propósito de la firma de autorización de gasto independiente es permitir que dispositivos limitados como los hardware wallets autoricen gastos blindados sin tener que realizar por sí mismos toda la prueba de zk-SNARK.

### Aplicación Zondax Ledger; el lado del hardware wallet

#### ¿Qué es Zondax?

Zondax es una empresa de desarrollo externa que creó la aplicación Ledger Zcash. Es la aplicación de firmware real que se ejecuta en el hardware Ledger y proporciona al dispositivo la capacidad de comprender y procesar transacciones Zcash desde el principio.

Zondax es un desarrollador externo. El hardware Ledger no tiene capacidad inherente para procesar transacciones Zcash, y esa capacidad procede enteramente del software de Zondax.

### Implementación original de Zcash Ledger

El repositorio de la aplicación Ledger Zcash de Zondax es el software que se ejecuta en un dispositivo Ledger. La aplicación se centró inicialmente en transacciones blindadas de Sapling, antes de que Orchard existiera como el pool blindado principal de Zcash, por lo que el soporte de Sapling era el alcance de lo que un dispositivo Ledger podía hacer con ZEC blindado.

Su arquitectura ilustra la separación: el lado del anfitrión/complementario prepara la información de la transacción, mientras que Ledger gestiona las operaciones sensibles de claves y la firma.

Incluso en esta primera versión del soporte de hardware wallet de Zcash, los principios básicos —construcción y generación de pruebas en el anfitrión, seguida de firma aislada en el dispositivo— ya formaban parte del diseño.

### Evolución hacia Orchard

El trabajo de Ledger avanzó hacia Orchard + PCZT. Esta fue una transición significativa, en lugar de una actualización menor, dado que Orchard utiliza un sistema de pruebas diferente (Halo 2, frente al Groth16 de Sapling) y una construcción de notas y claves distinta, por lo que ampliar el firmware exclusivo de Sapling para gestionar la firma de Orchard requería nuevas bases criptográficas del lado del dispositivo, no solo un parche de firmware.

Sin embargo, a medida que Zcash avanzaba hacia Ironwood, Zondax y Ledger trasladaron su enfoque de desarrollo hacia el soporte directo de Ironwood, en lugar de completar una implementación de Orchard solo para rediseñarla posteriormente para Ironwood. Esto representa una etapa adicional en la evolución de la implementación de Ledger, ya que Ironwood se basa en la arquitectura criptográfica de Orchard al tiempo que introduce un pool blindado separado y cambios adicionales en el protocolo.

### Qué ocurre dentro de esta aplicación Ledger

El flujo resultante se describe de la siguiente manera:

1. El anfitrión construye un PCZT.
2. El anfitrión envía la información relevante de la transacción al dispositivo Ledger.
3. El dispositivo produce las firmas de autorización de gasto de Orchard.
4. El anfitrión gestiona todo lo posterior, incluida la firma vinculante y el ensamblaje final de la transacción.

La aplicación que se ejecuta dentro de Ledger nunca ve ni produce nada más allá de la propia firma de autorización de gasto, y todo el trabajo computacionalmente pesado o que requiere muchos datos —generación de pruebas, vinculación, ensamblaje— permanece en el anfitrión, donde no es necesario confiarle el material de claves.

### Integración blindada nativa de Ledger; Ledger Wallet Desktop

La integración más reciente de Ledger con Zcash proporciona un ejemplo concreto de cómo la construcción de transacciones blindadas y la firma crítica para la seguridad pueden separarse entre el software complementario y un hardware wallet.

Con Ledger Wallet Desktop 4.21+ y la aplicación para dispositivos Zcash 3.9.4+, los usuarios pueden enviar y recibir Ironwood blindado de ZEC directamente mediante Ledger Wallet Desktop. La integración admite transferencias de privado a privado, blindaje desde el pool transparente, desblindaje al pool transparente, direcciones de recepción privadas y memos. Las transacciones se verifican y firman en el dispositivo Ledger en lugar de depender únicamente de la información presentada por el ordenador.

Una parte clave de esta arquitectura es la separación de las capacidades de visualización y gasto. Durante la sincronización de saldo privado, el Ledger exporta una Full Viewing Key Unificada de Visualización Completa (UFVK), que se almacena localmente en el ordenador. La UFVK permite a Ledger Wallet Desktop detectar transacciones blindadas relevantes y determinar el saldo de la billetera, pero no proporciona autoridad para gastar los fondos. La autoridad de gasto crítica para la seguridad permanece en el dispositivo Ledger, que realiza la operación de firma final. Esto crea un límite claro entre el ordenador, que gestiona el estado de la billetera y construye transacciones, y el dispositivo de hardware, que protege la capacidad necesaria para autorizar gastos.

Sin embargo, la integración actual es específicamente exclusiva de Ironwood. No muestra ni gestiona fondos Orchard o Sapling mediante Ledger Wallet Desktop. Esto es históricamente significativo porque el desarrollo anterior de Ledger para Zcash estaba asociado con el soporte blindado de Orchard antes de que la implementación evolucionara hacia el protocolo Ironwood.

La transición también destaca la importancia de la compatibilidad de claves y cuentas. Ledger tiene una aplicación antigua «Zcash Shielded», desarrollada por Zondax y utilizada por integraciones como YWallet y zkool, que ahora se está retirando. Debido a que esa aplicación antigua utilizaba un esquema de derivación diferente para las cuentas blindadas, sus cuentas Sapling no pueden reproducirse simplemente con la nueva aplicación Ledger.

Por tanto, la integración ilustra tanto el progreso como las limitaciones restantes del soporte de hardware wallet blindado. Ledger puede ofrecer ahora una experiencia completa de Ironwood en la que el software complementario gestiona la sincronización de la billetera y la preparación de transacciones, mientras que el dispositivo de hardware sigue siendo el límite de seguridad para el gasto.

Al mismo tiempo, la compatibilidad histórica de cuentas, el soporte de solo pools blindados específicos, los límites de tamaño de transacciones de hardware, las restricciones de plataforma y las limitaciones computacionales y de firmware implicadas en el análisis y la verificación de transacciones blindadas muestran que el soporte de hardware wallet para Zcash depende no solo de las capacidades del protocolo, sino también del diseño y los recursos de cada implementación individual.

### Zkool + Ledger — uso de la aplicación oficial Zondax

Como sucesor de Ywallet, Zkool heredó el objetivo de la firma en frío blindada, pero adoptó un camino diferente para lograrlo, determinado directamente por el hecho de que la criptografía por sí sola no hace que una integración sea utilizable si la aplicación de firma no puede distribuirse de forma segura.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Uso de Zkool de la aplicación Zondax

Zkool avanzó hacia el uso de la aplicación oficial Ledger Zcash desarrollada por Zondax, en lugar de la aplicación propietaria abandonada Ledger de Ywallet. En lugar de mantener una aplicación personalizada que la tienda de Ledger no aceptaría, Zkool se basó en la aplicación que ya estaba aceptada y distribuida mediante el propio ecosistema de Ledger.

Ese cambio significó que los usuarios ya no necesitaban depender de instalar una aplicación personalizada sin firmar de Ledger para utilizar esta integración, puesto que la aplicación de Zondax se distribuía oficialmente mediante el ecosistema de Ledger.

Sin embargo, esta integración afronta un cambio importante el 5 de noviembre de 2026, cuando está previsto que finalice el soporte para la aplicación heredada Zcash Shielded a medida que Ledger la elimina gradualmente. Como la integración Ledger de Zkool depende de esta aplicación, el cambio plantea preguntas sobre la futura disponibilidad de la conexión existente. El impacto preciso sobre Zkool depende de si puede seguir utilizando la aplicación heredada fuera de Ledger Wallet o pasar a una alternativa compatible.

### Pools blindados compatibles

Según el desarrollador de Ywallet, la integración Ledger de Zkool utilizaba la aplicación oficial Ledger desarrollada por Zondax y admitía tanto Zcash transparente como blindado. Sin embargo, su soporte blindado se limitaba a Sapling y no admitía Orchard, junto con otras limitaciones de integración, como un máximo de cinco entradas y salidas de cada tipo y la ausencia de compatibilidad con Ledger Live.

Esta limitación reflejaba el alcance de la implementación subyacente de Zondax Ledger en aquel momento. El trabajo previo de Zondax sobre Ledger proporcionó compatibilidad con Sapling, y su posterior lanzamiento en 2024 de la aplicación Zcash Shielded Ledger excluyó inicialmente Orchard y las direcciones unificadas. Por lo tanto, una integración construida en torno a esa aplicación heredaba las capacidades y limitaciones de la implementación de hardware wallet de la que dependía.

La situación evolucionó posteriormente con el lanzamiento de la aplicación dedicada Zcash Shielded Ledger en noviembre de 2024. Zondax declaró que la aplicación había sido lanzada oficialmente a través de Ledger Live y posteriormente publicó orientación de integración y paquetes Rust y JavaScript para permitir que otras billeteras se integraran con ella. Sin embargo, en el lanzamiento, la aplicación se comunicaba exclusivamente con Zecwallet Lite Desktop, mientras se seguían desarrollando integraciones más amplias con billeteras.

La siguiente etapa fue el desarrollo de la nueva aplicación Ledger basada en Rust de Zcash. Para junio de 2026, Ledger informó que se habían implementado el intercambio de UFVK y la generación de direcciones unificadas de Orchard, mientras que la firma de transacciones de Orchard y ClearSign seguían en desarrollo. Ledger también declaró que el trabajo continuaría en la ruta Ironwood a medida que cambiara el protocolo.

Ironwood requirió posteriormente actualizaciones en todo el ecosistema de billeteras Zcash. Zkool lanzó compatibilidad con la migración de Orchard a Ironwood a partir de la versión 6.24.0, y continuó refinando la migración y el flujo de transacciones en versiones posteriores. Por separado, Ledger incorporó la firma v2 de PCZT en su nueva aplicación el 27 de julio, aunque la implementación aún no había completado la revisión de Ledger ni el lanzamiento de Ledger Live para el 20 de agosto, un hito que desde entonces se ha completado, y Ledger Wallet Desktop 4.21+ ahora ofrece compatibilidad nativa con Ironwood directamente.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Por lo tanto, la evolución se entiende mejor no como una única actualización de Zondax a Ironwood, sino como varios desarrollos relacionados: la implementación original de Sapling centrada en Zondax, la aplicación Zcash Shielded Ledger de 2024, la nueva aplicación Ledger Rust con compatibilidad con Orchard y PCZT, la propia integración nativa de Ledger en Ledger Wallet Desktop y las actualizaciones paralelas de billeteras como Zkool a medida que el ecosistema pasaba a Ironwood.

### Compatibilidad actual de dispositivos y plataformas Ledger con Zcash

La compatibilidad con Zcash en Ledger depende de

- El modelo del dispositivo
- La aplicación instalada
- La plataforma utilizada para gestionarlo y
- Si la transacción es transparente o blindada [shielded].

Al 21 de julio de 2026 (la última actualización de Ledger), la aplicación Zcash Shielded es compatible con Nano S Plus, Stax y Flex, pero aún no con Nano X ni Nano Gen5.

Nano X y los demás modelos, excepto el Nano S original, aún pueden usar la aplicación clásica Zcash, que admite transacciones transparentes y el gasto de fondos blindados hacia direcciones transparentes (desblindaje), pero no la firma de blindado a blindado. El Nano S original no admite ninguna de las dos aplicaciones, porque Ledger está eliminando gradualmente la compatibilidad con el dispositivo y su aplicación Zcash más reciente no está disponible en él. Los dispositivos se conectan a Ledger Wallet (anteriormente Ledger Live), la aplicación complementaria de Ledger, disponible en escritorio para Windows, macOS y Linux, y en móvil para iOS y Android.

Ledger ha añadido Zcash blindado nativo a Ledger Wallet Desktop, basado en el pool Ironwood, lo que elimina la necesidad de una billetera complementaria separada. ZEC blindado aún no es compatible con la aplicación móvil de Ledger para iOS y Android, aunque se planea la compatibilidad móvil para una versión futura.

Fuera del propio software de Ledger, el uso blindado depende de una billetera complementaria compatible y de las plataformas que admita. A medida que Ledger continúa ampliando la compatibilidad con Ironwood, la compatibilidad depende del modelo de dispositivo, el firmware, la versión de la aplicación y el sistema operativo, por lo que la compatibilidad general con Zcash no garantiza necesariamente la compatibilidad.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### Firma en frío de YWallet; un enfoque anterior

Ywallet es una billetera complementaria, independiente tanto de Ledger como de Zondax, que siguió su propio camino hacia la firma en frío blindada.

Ywallet es históricamente importante porque exploró la firma en frío para Zcash, lo que significa que el dispositivo de firma podía mantenerse separado de la billetera en línea.

Para materializar esa arquitectura en el hardware Ledger, Ywallet construyó su propia aplicación Ledger, una aplicación propietaria distinta de la aplicación Zondax tratada en la sección anterior. Esto significaba que Ywallet no dependía de la implementación existente de Zondax de Sapling; tenía su propio firmware ejecutando el lado de firma de la relación.

### Por qué era importante la integración

Tener la criptografía y el código de firma no es suficiente. La integración de hardware wallet no es un problema puramente criptográfico; también es un problema inevitable de distribución y plataforma. Como mínimo, implica:

- Aprobación/distribución de la aplicación — si la tienda oficial de aplicaciones del fabricante de hardware aceptará y distribuirá la aplicación
- Seguridad del firmware/de la aplicación — si la aplicación cumple los requisitos de seguridad del fabricante para manejar material de claves
- Protocolos de comunicación — cómo la billetera complementaria y el dispositivo intercambian realmente los datos de las transacciones
- Compatibilidad con la billetera — si los formatos de datos y el flujo de la aplicación de firma coinciden con lo que espera la billetera complementaria
- Pools blindados compatibles — para cuáles de Sapling, Orchard y (ahora Ironwood) puede firmar realmente la aplicación

La aplicación propietaria Ledger de Ywallet cumplía los requisitos criptográficos y arquitectónicos; podía firmar transacciones blindadas de Zcash, pero no fue aceptada en la tienda oficial de aplicaciones de Ledger.

### Transición fuera de la aplicación propietaria Ledger

Dado que la aplicación no fue aceptada oficialmente, Ywallet habría tenido que pedir a los usuarios que instalaran firmware sin firmar para usarla; esto supone un compromiso de seguridad real para los usuarios, y Ywallet decidió no pedirles eso. Por lo tanto, Ywallet finalmente abandonó esa integración concreta en lugar de seguir ese camino.

En lugar de revivir una aplicación propietaria, el desarrollo posterior (a través de Zkool, el sucesor de Ywallet) avanzó hacia la aplicación Ledger construida oficialmente por Zondax, intercambiando una implementación personalizada y rechazada por una estandarizada ya aceptada en el ecosistema de distribución de Ledger. Ese cambio fue lo que finalmente hizo posible de nuevo una integración funcional de Ledger.

### El legado de Ywallet

Incluso después de que Ywallet se apartara del desarrollo activo, su creador, Hanh, que también resulta ser miembro de ZCG, siguió siendo una voz relevante en el ecosistema, particularmente cuando la migración de Ironwood reveló problemas reportados relacionados con fondos que parecían haber desaparecido.

**ZODL: un usuario real experimentó fondos faltantes después de la migración Orchard → Ironwood**

Un usuario, Jmo0615, informó que los fondos previamente visibles en su billetera ZODL dejaron de aparecer después de la migración de Orchard a Ironwood. Declaró que había restaurado la semilla original, restablecido y recuperado la billetera, y permitido que ZODL versión 3.14.1 (1) se sincronizara por completo. También confirmó que no estaba involucrada ninguna hardware wallet Keystone.

No se ha establecido que los fondos se hayan perdido realmente. Más bien, se sospecha que se trata de un problema relacionado con el descubrimiento o la migración de la billetera, en el que los fondos previamente visibles ya no se mostraban después de la transición a Ironwood. Los fondos que no se detectan o muestran no deberían describirse automáticamente como fondos perdidos permanentemente, y esta distinción es importante para comprender los problemas de migración.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: las «notas bloqueadas» pueden explicar fondos aparentemente no disponibles**

Otro aspecto importante de las billeteras blindadas es cómo el estado de la billetera puede afectar los fondos que un usuario realmente puede gastar. Hanh explicó que un usuario puede bloquear accidentalmente una nota mediante el control de monedas, una función que permite a los usuarios elegir manualmente qué notas se utilizan para gastar. En esta situación, una nota puede seguir existiendo en la billetera, pero estar marcada como no disponible para gastar.

Esto destaca una distinción importante al investigar problemas de billeteras. La cantidad de ZEC que existe en una billetera no siempre es la misma que la cantidad actualmente disponible para gastar. Factores como la selección de notas, la sincronización, el estado de migración, la recuperación de la billetera y la configuración de control de monedas pueden afectar el saldo mostrado o disponible para gastar. Por lo tanto, los informes de «fondos faltantes» deben distinguir cuidadosamente entre fondos que no se detectan o muestran, fondos que se detectan pero no están disponibles para gastar y fondos que realmente se han perdido.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**¿Qué es Keystone?**

Keystone es una hardware wallet aislada del aire. Su dispositivo de firma no tiene conexión directa, por cable o inalámbrica, con la aplicación complementaria durante el propio proceso de firma, sino que se comunica mediante códigos QR. Aquí se empareja con Zashi (ahora renombrada como Zodl), la billetera complementaria nativa de Zcash, y ese emparejamiento hace que el principio de aislamiento de claves sea excepcionalmente explícito y fácil de seguir.

**El flujo Keystone/Zashi**

La integración de Zcash de Keystone con Zashi hace esta separación particularmente explícita. Cuando conectas Keystone a Zashi, la Full Viewing Key unificada se transfiere de Keystone a Zashi.

Por lo tanto, el flujo es:

![Keystone and Zashi viewing flow](/content-images/keystone-zashi-viewing-flow.webp)

**¿Qué puede hacer Zashi con la UFVK?**

Zashi puede usarla para:

- Identificar transacciones blindadas entrantes
- Determinar saldos
- Obtener información sobre actividad blindada

Pero no puede gastar los fondos simplemente porque tiene la UFVK.

La UFVK es una «capacidad de visualización» que permite conocer saldos y transacciones, pero no permite gastar.

### ¿Qué permanece dentro de Keystone?

La autoridad de semilla/gasto permanece en Keystone. Zashi no recibe la semilla, la clave de gasto ni la clave privada de autorización de gasto. Recibe la UFVK, información de direcciones y la información necesaria para operar solo en modo de visualización.

En conjunto, estas dos mitades completan el panorama. Lo que sale del dispositivo, como la UFVK, las direcciones y la información de solo visualización, es suficiente para que Zashi supervise la cuenta, pero nada de lo que sale del dispositivo es suficiente para sacar fondos de ella.

Por eso la integración de Zashi y Keystone puede proporcionar almacenamiento en frío blindado. La aplicación de billetera puede supervisar la cuenta sin poseer la autoridad necesaria para gastar desde ella. La integración se lanzó específicamente para permitir el almacenamiento en frío de ZEC blindado.

Cuando quieras gastar:

![Keystone and Zashi spending flow](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito sigue un modelo de aislamiento de claves muy similar al de Keystone, pero su implementación es más reciente. En lugar de emparejarse con una billetera complementaria existente como Zashi, Hito se entrega con su propia billetera Android, y el proceso de incorporación entre el dispositivo de hardware y esa aplicación Android está documentado en los hitos de desarrollo de Hito.

**Incorporación: qué recibe la aplicación Hito**

La billetera Android utiliza:

- La Full Viewing Key unificada (UFVK)
- Dirección unificada
- Huella digital de semilla ZIP-32
- Información de red

Al incorporar la cuenta de hardware.

Ten en cuenta que la aplicación Android nunca recibe la semilla ni las claves privadas de gasto de la hardware wallet.

![Hito onboarding](/content-images/hito-onboarding.webp)

**¿Qué obtiene la aplicación Hito?**

La información de incorporación documentada incluye:

- UFVK
- Dirección unificada
- Huella digital de semilla ZIP-32
- Red

La UFVK proporciona a la billetera Android la información necesaria para operar la cuenta como una billetera con capacidad de visualización sin recibir la semilla. La huella digital de la semilla es un identificador de longitud fija derivado de la semilla, utilizado para reconocer qué cuenta es cuál; no es la semilla en sí ni concede capacidad alguna de gasto, por lo que su presencia no contradice la afirmación anterior de que «nunca recibe la semilla».

**¿Qué permanece en Hito?**

La semilla real, las claves privadas de gasto y la autoridad de firma permanecen en el dispositivo de hardware. Luego, Hito realiza la firma sin conexión.

El hito actual de Hito establece que todo el flujo de creación, exportación, firma sin conexión e importación está operativo, con transporte BLE y exportación QR BBQr de la PCZT firmada.

Vale la pena nombrar explícitamente ese flujo, ya que es el caso concreto del ciclo completo tratado anteriormente en este informe: la billetera Android crea la PCZT sin firmar, la exporta a Hito, Hito firma sin conexión con su material de claves aislado y la PCZT firmada se importa de nuevo en la billetera Android.

En ningún momento la semilla ni la clave de gasto cruzan ese límite en ninguna dirección.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## Orchard a Ironwood: La evolución del soporte para hardware wallet

Orchard es un pool blindado [shielded pool] en el protocolo Zcash que permite a los usuarios almacenar y realizar transacciones con ZEC con una privacidad [privacy] mejorada. Introducido en la actualización de red [Network Upgrade] 5 (NU5), Orchard utiliza el sistema de pruebas [proving system] Halo 2 y una arquitectura criptográfica rediseñada para admitir transacciones blindadas sin revelar información sensible de la transacción, como el remitente, el destinatario o el importe.

Ironwood es un pool blindado [shielded pool] introducido en la actualización de red [network upgrade] Zcash NU6.3 como sucesor del pool Orchard. Utiliza el protocolo criptográfico Orchard e introduce cambios diseñados para mejorar la seguridad a largo plazo de los fondos blindados, incluida la recuperabilidad cuántica y garantías más sólidas sobre la integridad del suministro.

Al principio, es esencial aclarar que Ironwood no sustituyó el protocolo Orchard por un sistema criptográfico totalmente nuevo. Ironwood se introdujo como un nuevo pool blindado construido a partir del protocolo Orchard existente. Esto significa que tienen la misma estructura de Action, el mismo sistema de pruebas Halo 2 y las mismas construcciones de notas [note] y claves.

Ironwood tiene su propio árbol de compromisos [commitment] de notas, conjunto de anuladores [nullifier], ancla y pool de valor, por lo que, en el nivel de consenso [consensus], es un pool realmente independiente. Pero criptográficamente, es una extensión de Orchard en lugar de una reconstrucción.

Se diseñó de este modo para:

1. **Integridad del suministro.** El 29 de mayo de 2026, el investigador de seguridad Taylor Hornby reveló de forma privada una falla crítica de solidez en el sistema de pruebas zero-knowledge [zero-knowledge proof] de Orchard, que podría haber permitido crear ZEC falsificados sin dejar rastro on-chain. Debido a que los datos de transacción de Orchard son privados, nadie puede verificar de forma independiente que no se crearan ZEC falsificados antes de la corrección. Sellar el pool antiguo e iniciar uno nuevo desde cero resuelve ese problema de una forma que corregir Orchard directamente no podía.
2. **Garantizar la recuperabilidad cuántica.** Ironwood se diseñó para que sus fondos puedan participar en un futuro mecanismo de recuperación si alguna vez se vulneran los supuestos subyacentes del logaritmo discreto.
3. **Minimizar los cambios de implementación.** En lugar de diseñar un protocolo blindado totalmente nuevo, se reutilizó la arquitectura probada de Orchard. Esto significó que hubo que escribir desde cero mucho menos código nuevo para transacciones, pruebas, billeteras [wallet] y hardware wallet.

### La cronología pública

- 29 de mayo: Se revela la vulnerabilidad de Orchard.
- Junio: Las transacciones de Orchard se restringen temporalmente mientras se publica una corrección inicial mediante NU6.2. El 12 de junio, un desarrollador principal fija el 21 de julio como objetivo para la actualización completa; posteriormente se retrasa una semana. Se planteó una preocupación en la comunidad de que los propietarios de Keystone serían los últimos en migrar, y un desarrollador principal respondió entonces que Keystone admitiría Ironwood desde el primer día, con el firmware previsto para el 3 de julio, a la espera de las constantes de firma finalizadas y de los cambios de API de Orchard procedentes del núcleo de Zcash.
- Principios de julio: NU6.3 llega a testnet; Zebra 6.0.0 se publica el 10 de julio.
- 27–28 de julio: El trabajo de firma PCZT v2 de Ledger para Ironwood se integra en una rama de integración. Ironwood (NU6.3) se activa el 28 de julio en el bloque 3.428.143, sellando el pool Orchard original tras un turnstile que limita la cantidad de ZEC que puede salir de Orchard al importe que se depositó legítimamente en él e introduce un nuevo formato de transacción.

Zebra se convierte en el nodo [node] obligatorio, ya que zcashd no admite las nuevas reglas de consenso. Las direcciones [address] no cambian porque Ironwood reutiliza la estructura de receptor de Orchard, de modo que las billeteras dirigen automáticamente las direcciones existentes al nuevo pool. Lo que las billeteras sí necesitan es funcionalidad de migración, ya que los fondos de Orchard deben acabar trasladándose a Ironwood por sus propietarios, y las nuevas salidas que reciben Orchard ahora están completamente bloqueadas por consenso.

### Qué cambió técnicamente

Los formatos de transacción pasaron de la versión 5 a la versión 6, por lo que una sola transacción puede incluir un componente Ironwood junto con los componentes existentes Sapling/Orchard/transparentes [transparent]. PCZT se extendió de forma correspondiente:

- La codificación pasó de PCZT v1 a v2.
- Un bundle Ironwood independiente ahora se sitúa junto a los de Sapling y Orchard.
- Se admiten las transacciones v6 y un nuevo sighash v6.
- Los textos sin formato de las notas obtuvieron una nueva versión (V3).

El cambio de sighash es el más importante específicamente para los hardware wallet. En v6, las anclas de Orchard y Ironwood se excluyen del hash de firma y solo alimentan el resumen de datos de autorización. Se trata de un cambio real de firmware, no solo de un aumento de versión. Un dispositivo tiene que implementar correctamente el nuevo sighash y recalcularlo por sí mismo, en lugar de confiar en lo que afirma aprobar la aplicación complementaria.

El contrato de aislamiento en sí no cambió: el dispositivo sigue devolviendo únicamente la firma de autorización de gasto, nunca `alpha`, y nunca produce la firma vinculante; el host también sigue encargándose de las pruebas y de todo lo demás.

Sin embargo, una regla de firmante sí cambió con v6: los gastos de relleno ficticios los firma el finalizador [finalizer] de E/S en lugar del dispositivo, ya que este no tiene forma de verificarlos con datos de notas reales. El rol de Signer del dispositivo los omite en vez de solicitarle que firme algo que no puede comprobar. Las tarifas [fees] mostradas también suman ahora los saldos de valor de Orchard y Ironwood, ya que una transacción v6 puede gastar desde cualquiera de los dos pools en la misma transacción.

Acertar con esa contabilidad de pools importa en la práctica, no solo en teoría. Un error reciente en la propia billetera Zcash de Brave es una ilustración útil: su cálculo de tarifas asumía que todas las entradas blindadas pertenecían al pool Orchard heredado, lo que provocaba acciones duplicadas y estimaciones de tarifas incorrectas siempre que una transacción involucraba realmente a Ironwood. Esa es exactamente la clase de error que el principio de «recalcúlalo tú mismo, no confíes en el host» detrás de la firma de hardware wallet pretende detectar. Una billetera complementaria calculó mal la contabilidad del pool y solo un dispositivo que comprobara sus propias matemáticas de forma independiente lo señalaría antes de aprobarlo.

### Situación de cada firmante

**Ledger acaba de cambiar todo el panorama.** El 23 de septiembre de 2026, Ledger incorporó soporte blindado nativo para Zcash directamente dentro de Ledger Wallet Desktop, sin necesidad de una aplicación complementaria independiente. Tu clave de gasto permanece en el dispositivo, el ordenador realiza los cálculos de la transacción y apruebas todo en pantalla antes de que se firme. Solo admite Ironwood, no los pools antiguos Orchard ni Sapling. La desventaja es que la aplicación heredada «Zcash Shielded», creada por Zondax y que requería una billetera complementaria como Zkool para funcionar, se está descontinuando. Ledger retirará esa aplicación antigua de la disponibilidad el 5 de noviembre, por lo que cualquiera que todavía la use debe mover sus fondos antes de entonces.

**Keystone está en buena situación.** El firmware 3.0.2 añadió soporte completo para Ironwood en julio, y ese sigue siendo el requisito actual y estable. Sin embargo, se necesita esa versión o una posterior para firmar cualquier cosa.

**Hito ha avanzado más allá del hito inicial de testnet.** Firmó y envió correctamente su primera transacción real de Orchard a Ironwood en hardware físico, inicialmente en testnet. Las actualizaciones posteriores confirmaron flujos de mainnet (Ironwood→Ironwood, Ironwood→Transparente y otros) en hardware de producción. El firmware estable y una publicación más amplia siguen en curso.

Zondax y Zkool se encuentran actualmente en transición. La aplicación de Zondax es la que se retira en Ledger. Zkool, que dependía de esa aplicación para comunicarse con dispositivos Ledger, no ha indicado qué ocurrirá con esa función una vez que desaparezca la aplicación antigua. No está claro si seguirá siendo relevante para los usuarios de Ledger en adelante, o si su futuro estará principalmente con otros dispositivos.

La propia migración es el mayor efecto en cadena. Debido a que el importe que cruza los pools es público, las billeteras distribuyen las transferencias en denominaciones estándar a lo largo del tiempo, en lugar de mover un saldo en un único bloque visible, lo que implica muchas transacciones que firmar por migración y es precisamente la razón por la que la firma por lotes de PCZT fue tan importante para los hardware wallet.

El trabajo de firmware de Ledger también se topó con límites de hardware: un gasto de nota real podía alcanzar decenas de miles de llamadas al sistema criptográficas en un solo comando, activando el watchdog del dispositivo. La corrección trasladó la aritmética de campos al software y requirió un estado de memoria temporal compartido para ajustarse a las restricciones de pila de Nano X.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### La evolución en una imagen

![The evolution in one picture](/content-images/orchard-to-ironwood-evolution.webp)
