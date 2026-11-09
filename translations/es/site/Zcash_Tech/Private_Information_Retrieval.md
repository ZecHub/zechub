# Recuperación privada de información [Private information retrieval]

## TL;DR

- La recuperación privada de información, o PIR, permite que un dispositivo obtenga un elemento de la base de datos de un servidor sin que el servidor sepa qué elemento se solicitó
- Zcash necesita esto porque una billetera privada [private wallet] no puede preguntar a un servidor qué transacciones son suyas sin delatarse
- Actualmente, las billeteras descargan y escanean muchos más datos de los que necesitan, lo cual es una razón importante por la que la sincronización es lenta
- PIR permitiría que una billetera obtenga solo sus propios datos de forma privada, eliminando ese cuello de botella mientras mantiene intacta la privacidad
- Es un área activa de investigación para Zcash, potente en teoría y que se está haciendo práctica para billeteras reales

<br/>

## Para quién es esto

- Cualquiera que se haya preguntado cómo una billetera privada encuentra sus propias monedas sin revelar cuáles son
- Personas recién llegadas que siguen viendo PIR mencionado junto al trabajo de escalabilidad [scaling] de Zcash
- Lectores que quieren entender primero el concepto y después la criptografía que lo sustenta

<br/>

## El problema que PIR resuelve para Zcash

Zcash oculta para quién es una transacción. Esa privacidad plantea una pregunta incómoda: si la red no puede ver qué transacciones te pertenecen, ¿cómo las encuentra tu propia billetera?

Actualmente, la respuesta es directa. Una billetera no puede preguntar a un servidor qué transacciones son mías, porque esa pregunta revelaría exactamente lo que Zcash intenta ocultar. Por eso, la billetera descarga una gran cantidad de datos y prueba cada elemento localmente para ver qué le pertenece. Funciona y preserva la privacidad, pero es lento y pesado. Este escaneo es una de las principales razones por las que la sincronización de la billetera puede sentirse lenta.

Lo ideal sería que una billetera pudiera pedir a un servidor exactamente sus propios datos y recibirlos sin que el servidor supiera nunca qué se solicitó. Eso es exactamente lo que proporciona la recuperación privada de información.

<br/>

## Qué es PIR

La recuperación privada de información es un método criptográfico que permite a un cliente leer una entrada de la base de datos de un servidor sin revelar al servidor qué entrada leyó.

Imagina una biblioteca donde puedes recibir exactamente el libro que quieres, pero el bibliotecario nunca sabe qué libro te entregó. Obtienes tu elemento y tu interés permanece privado. PIR es la versión matemática de esa idea, aplicada a cualquier base de datos.

El concepto se ha estudiado en criptografía durante décadas. Fue introducido por primera vez en 1995 por Chor, Goldreich, Kushilevitz y Sudan, quienes describieron el enfoque de múltiples servidores, y la primera versión de servidor único llegó en 1997 de la mano de Kushilevitz y Ostrovsky. No es algo que Zcash haya inventado, es un campo establecido que Zcash está aplicando ahora a un problema real y persistente.

<br/>

## Cómo funciona PIR, en un primer nivel

Hay dos formas generales de construir PIR, y la diferencia importa.

La primera utiliza múltiples servidores. El cliente envía a cada uno de varios servidores una parte de la consulta y combina sus respuestas localmente. Ningún servidor individual ve lo suficiente como para saber qué se solicitó. Esto es eficiente, pero depende de que los servidores no colaboren entre sí, algo difícil de garantizar en el mundo real.

La segunda utiliza un único servidor y criptografía ingeniosa en lugar de múltiples partes. Aquí el cliente se apoya en una herramienta especial llamada cifrado homomórfico [homomorphic encryption], y esta es la dirección más útil para implementaciones reales, porque no necesita múltiples servidores que no colaboren.

<br/>

## El mecanismo: cifrado homomórfico

El cifrado homomórfico es un tipo de cifrado que permite a un servidor realizar cálculos sobre datos mientras estos permanecen cifrados. El servidor produce una respuesta cifrada correcta sin ver nunca los valores subyacentes.

Esta es la idea detrás de PIR de servidor único construido de esta manera. El cliente quiere el elemento número tres de una lista. Construye una consulta que es, en efecto, un sí cifrado para la posición tres y un no cifrado para todas las demás posiciones. Para el servidor, esta consulta es simplemente ruido sin sentido, no puede distinguir qué posición contiene el sí.

Luego, el servidor combina su base de datos con esta consulta cifrada usando las propiedades especiales del cifrado homomórfico, multiplicando cada elemento almacenado por el sí o no cifrado correspondiente y sumando los resultados. El resultado es un único paquete cifrado que contiene exactamente el elemento que quería el cliente, y nada revela cuál era. El cliente descifra ese paquete y lee su elemento. El servidor ha respondido la pregunta sin conocer nunca la pregunta.

Una versión más sólida, llamada PIR simétrico [symmetric PIR], añade una segunda garantía: el cliente aprende solo el elemento que solicitó y nada sobre ninguna otra entrada de la base de datos. Eso protege la base de datos, además del cliente.

<br/>

## Una mirada más detallada para lectores técnicos

Los esquemas modernos de servidor único se basan en criptografía de retículas [lattice cryptography], normalmente en el supuesto de aprendizaje con errores [learning with errors]. La consulta del cliente es un vector de textos cifrados, un cifrado de uno en el índice objetivo y cero en los demás, y el cifrado es homomórfico aditivo, por lo que el servidor puede sumar textos cifrados y multiplicarlos por entradas de base de datos en texto plano sin descifrar.

El servidor trata la base de datos como una matriz, aplica el vector de selección cifrado y devuelve un único texto cifrado que se descifra en la fila deseada. Como la consulta es indistinguible del ruido aleatorio, el servidor no obtiene información sobre el índice.

El obstáculo histórico siempre ha sido el coste. De forma ingenua, el servidor debe procesar cada entrada de la base de datos para cada consulta, lo que es costoso en computación, y los textos cifrados son grandes, lo que es costoso en ancho de banda. Investigaciones recientes abordan esto con preprocesamiento: esquemas como SimplePIR y FrodoPIR permiten al servidor preparar la base de datos de antemano y proporcionar a cada cliente una pequeña pista, trasladando gran parte del trabajo a una fase sin conexión para que las consultas en vivo sean rápidas. Un beneficio secundario útil es que las construcciones basadas en retículas también se consideran resistentes a ataques cuánticos, lo que se alinea con el avance más amplio de Zcash hacia la privacidad poscuántica.

<br/>

## PIR en Zcash

PIR forma parte del esfuerzo por hacer que Zcash sea privado y rápido a escala.

El objetivo es el cuello de botella del escaneo de billeteras descrito antes. El trabajo en Valar Group está desarrollando técnicas de recuperación privada de información para que una billetera pueda obtener sus propios datos de un servidor sin que el servidor sepa qué entradas se solicitaron. Una aplicación concreta es comprobar anuladores [nullifiers] de forma privada. Un anulador es un marcador único publicado cuando se gasta una nota, lo que evita que los mismos fondos se gasten dos veces. Una billetera a menudo necesita comprobar si ya ha aparecido un anulador determinado, es decir, si una nota sigue sin gastarse, y hacerlo mediante un servidor hoy puede revelar sobre qué nota se pregunta. La recuperación privada de información permite a la billetera hacer esa pregunta sin revelar qué anulador le importa. Esto se sitúa junto a otros trabajos de escalabilidad, incluido el Proyecto Tachyon y nuevo software de nodo, orientados a eliminar los límites de rendimiento que hoy frenan a las billeteras privadas.

Es importante ser honestos sobre la etapa en la que se encuentra. Esto es investigación e ingeniería activas, no una función terminada y lanzada. El concepto está bien establecido y la dirección está definida, pero hacer que PIR sea lo bastante eficiente para las billeteras cotidianas en dispositivos normales es precisamente la parte difícil en la que se está trabajando ahora.

<br/>

## Conceptos erróneos comunes

- PIR oculta qué elemento solicitaste, pero no oculta necesariamente que contactaste al servidor; los metadatos a nivel de red son una cuestión distinta
- PIR no es exclusivo de Zcash, es una herramienta criptográfica general que Zcash está aplicando a la privacidad de las billeteras
- La sincronización más rápida gracias a PIR es un objetivo en progreso, no una función ya presente en las billeteras
- Descargar todo y escanear localmente, el enfoque actual, es privado pero lento; PIR pretende mantener la privacidad mientras elimina la lentitud

<br/>

## Páginas relacionadas

- [Zcash Sincronización de billeteras](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - por qué la sincronización funciona hoy de esa manera
- [Nodos de clientes ligeros](https://zechub.wiki/zcash-tech/lightwallet-nodes) - el modelo de cliente ligero que PIR mejoraría
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - la otra herramienta criptográfica principal detrás de la privacidad de Zcash
- [Seguridad poscuántica](https://zechub.wiki/zcash-tech/post-quantum-security) - por qué los métodos basados en retículas son importantes para el futuro
