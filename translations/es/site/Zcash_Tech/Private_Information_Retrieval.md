# Recuperación privada de información

## En resumen

- La recuperación privada de información, o PIR, permite que un dispositivo obtenga un elemento de la base de datos de un servidor sin que este sepa cuál se solicitó
- Zcash la necesita porque una billetera privada no puede preguntarle a un servidor cuáles transacciones le pertenecen sin revelar su identidad
- Actualmente, las billeteras descargan y analizan muchos más datos de los que necesitan, lo que explica en gran medida por qué la sincronización es lenta
- PIR permitiría que una billetera obtuviera en privado solo sus propios datos, eliminando ese cuello de botella y manteniendo la privacidad
- Es un área de investigación activa para Zcash, potente en teoría y cada vez más práctica para billeteras reales
- Ya hay una demostración en funcionamiento: [ZecBlock Private](https://private.zecblock.com) es el primer explorador de bloques completo basado en PIR de Zcash (transacciones, bloques y direcciones)

## ¿Para quién es?

- Para cualquiera que se haya preguntado cómo encuentra una billetera privada sus propias monedas sin revelar cuáles son
- Para quienes acaban de llegar y ven mencionar PIR junto con el trabajo de escalabilidad de Zcash
- Para lectores que quieren entender primero el concepto y después la criptografía que lo sustenta
- Para cualquiera que tenga curiosidad por un explorador de bloques basado en PIR que ya funciona

## El problema que PIR resuelve para Zcash

Zcash oculta a quién va dirigida una transacción. Esa privacidad plantea una pregunta incómoda: si la red no puede ver qué transacciones te pertenecen, ¿cómo las encuentra tu propia billetera?

Hoy la respuesta es contundente. Una billetera no puede preguntarle a un servidor cuáles transacciones son mías, porque esa pregunta revelaría justo lo que Zcash intenta ocultar. En su lugar, la billetera descarga una gran cantidad de datos y comprueba cada elemento localmente para ver cuáles le pertenecen. Funciona y preserva la privacidad, pero es lento y consume muchos recursos. Este análisis es una de las principales razones por las que la sincronización de la billetera puede sentirse lenta.

Lo ideal sería que una billetera pudiera pedirle a un servidor exactamente sus propios datos y recibirlos sin que el servidor llegara a saber qué se solicitó. Eso es precisamente lo que permite la recuperación privada de información.

## Qué es PIR

La recuperación privada de información es un método criptográfico que permite que un cliente lea una entrada de la base de datos de un servidor sin revelarle cuál leyó.

Imagina una biblioteca donde recibes el libro exacto que quieres, pero el bibliotecario nunca sabe cuál te entregó. Obtienes lo que buscas y tu interés sigue siendo privado. PIR es la versión matemática de esa idea, aplicada a cualquier base de datos.

Este concepto se estudia en criptografía desde hace décadas. Chor, Goldreich, Kushilevitz y Sudan lo presentaron por primera vez en 1995 mediante un enfoque con varios servidores. La primera versión con un solo servidor llegó en 1997, a cargo de Kushilevitz y Ostrovsky. No es algo que Zcash haya inventado: es un campo consolidado que Zcash aplica ahora a un problema real y persistente.

## Cómo funciona PIR: una primera aproximación

Hay dos formas generales de construir PIR, y la diferencia es importante.

La primera utiliza varios servidores. El cliente envía a cada uno de ellos una parte de la consulta y combina las respuestas localmente. Ningún servidor por sí solo ve suficiente información para saber qué se solicitó. Es un método eficiente, pero depende de que los servidores no se pongan de acuerdo entre sí, algo difícil de garantizar en el mundo real.

La segunda utiliza un solo servidor y criptografía ingeniosa en lugar de varias partes. En este caso, el cliente depende de una herramienta especial llamada cifrado homomórfico. Este enfoque resulta más útil para implementaciones reales porque no necesita varios servidores que no se pongan de acuerdo.

## El mecanismo: el cifrado homomórfico

El cifrado homomórfico es un tipo de cifrado que permite que un servidor calcule sobre datos mientras estos permanecen cifrados. El servidor produce una respuesta cifrada correcta sin llegar a ver los valores subyacentes.

Así funciona el PIR con un solo servidor construido de esta manera. El cliente quiere el elemento número 3 de una lista. Crea una consulta que equivale a un «sí» cifrado para la posición 3 y un «no» cifrado para todas las demás. Para el servidor, la consulta no es más que ruido sin sentido: no puede distinguir en qué posición está el «sí».

A continuación, el servidor combina su base de datos con esta consulta cifrada mediante las propiedades especiales del cifrado homomórfico: multiplica cada elemento almacenado por el «sí» o el «no» cifrado correspondiente y suma los resultados. El resultado es un único paquete cifrado que contiene exactamente el elemento que quería el cliente, sin revelar cuál es. El cliente descifra ese paquete y lee el elemento. El servidor ha respondido sin saber siquiera cuál era la pregunta.

Una versión más potente, llamada PIR simétrico, añade una segunda garantía: el cliente solo obtiene el elemento que solicitó y no aprende nada sobre las demás entradas de la base de datos. Esto protege tanto la base de datos como al cliente.

## Una mirada más detallada para lectores técnicos

Los esquemas modernos con un solo servidor se basan en la criptografía de retículas, normalmente en el supuesto de aprendizaje con errores. La consulta del cliente es un vector de textos cifrados: cifra un 1 en el índice objetivo y un 0 en los demás. El cifrado es homomórfico respecto de la suma, por lo que el servidor puede sumar textos cifrados y multiplicarlos por las entradas en texto claro de la base de datos sin descifrarlos.

El servidor trata la base de datos como una matriz, aplica el vector de selección cifrado y devuelve un único texto cifrado que, al descifrarse, revela la fila solicitada. Como la consulta es indistinguible del ruido aleatorio, el servidor no obtiene información sobre el índice.

El principal obstáculo histórico siempre ha sido el costo. En un enfoque directo, el servidor debe acceder a todas las entradas de la base de datos en cada consulta, lo cual requiere mucho cómputo. Además, los textos cifrados son grandes y consumen mucho ancho de banda. Las investigaciones recientes abordan estos problemas con preprocesamiento. Esquemas como SimplePIR y FrodoPIR permiten que el servidor prepare la base de datos con antelación y entregue a cada cliente un pequeño resumen. Así trasladan gran parte del trabajo a una fase sin conexión y agilizan las consultas en tiempo real. Otra ventaja importante es que las construcciones basadas en retículas también se consideran resistentes a los ataques cuánticos, en consonancia con la apuesta más amplia de Zcash por la privacidad poscuántica.

## PIR en Zcash

PIR forma parte del esfuerzo por hacer que Zcash sea privado y rápido a gran escala.

El objetivo es resolver el cuello de botella del análisis de la billetera descrito antes. El trabajo en Valar Group desarrolla técnicas de recuperación privada de información para que una billetera pueda obtener sus datos de un servidor sin que este sepa qué entradas se solicitaron. Una aplicación concreta consiste en comprobar anuladores en privado. Un anulador es un identificador único que se publica cuando se gasta una nota y que impide gastar los mismos fondos dos veces. A menudo, una billetera necesita comprobar si ya apareció un anulador determinado; en otras palabras, si una nota aún no se ha gastado. Hoy, hacerlo a través de un servidor puede revelar qué nota se está consultando. La recuperación privada de información permite que la billetera haga esa consulta sin revelar qué anulador le interesa. Esto complementa otros trabajos de escalabilidad, como Project Tachyon y el nuevo software de nodos, cuyo objetivo es eliminar los límites de rendimiento que hoy frenan a las billeteras privadas.

Es importante ser claros sobre la etapa en la que se encuentra este trabajo. Se trata de investigación y desarrollo activos, no de una función terminada y disponible. El concepto está bien establecido y el rumbo está definido, pero el reto actual consiste precisamente en hacer que PIR sea lo bastante eficiente para las billeteras cotidianas en dispositivos comunes.

## Ejemplo en funcionamiento: ZecBlock Private

En noviembre de 2026, ZecBlock lanzó **ZecBlock Private** (private.zecblock.com), una versión de su explorador que utiliza recuperación privada de información para buscar transacciones, bloques y direcciones.

Es el primer explorador de bloques completo de Zcash (que abarca transacciones, bloques y direcciones) basado en PIR. Las demostraciones anteriores de exploradores con PIR se limitaban a consultas más acotadas, como los saldos de direcciones.

### Cómo funcionan las consultas privadas

- La consulta (ID de transacción, altura/hash del bloque o dirección) se cifra por completo en el navegador antes de enviarse.
- El servidor procesa todo el conjunto de datos publicado sin saber qué registro se solicitó.
- El servidor devuelve una única respuesta cifrada que solo puede descifrar el navegador.
- Una búsqueda de algo que existe es indistinguible de una búsqueda de algo que no existe (tienen el mismo tamaño y formato de solicitud).

Después de cada búsqueda, el sitio muestra un breve resumen de lo que se envió, para que sea fácil comprobar la propiedad de privacidad.

### Pasos de verificación

Cada publicación de datos está firmada. El navegador verifica la firma de cada resultado antes de mostrarlo, de modo que un servidor malicioso o defectuoso no puede sustituir los datos por otros.

### Actualización de los datos

Se publican nuevos bloques cada pocos segundos. Los datos del explorador privado suelen tener un retraso de unos 20 segundos respecto al explorador habitual de ZecBlock.

### Costos de ancho de banda

PIR consume más recursos que una consulta normal porque el servidor debe acceder a todo el conjunto de datos:

- Consulta de transacción: se cargan aproximadamente 1,2 MB
- Consulta de dirección: se cargan aproximadamente 0,4 MB

Este es el costo práctico de que el servidor no sepa nada sobre la consulta.

### Implementación del cliente

El cliente del navegador es un contenedor de Rust → WebAssembly (actualmente en el repositorio de ZecBlock bajo `prototype/pir-browser`). Está construido sobre bibliotecas PIR de código abierto de Valar Group. El contenedor aún no se ha publicado como paquete npm independiente, pero está previsto hacerlo.

### Diferencias con el PIR para billeteras

ZecBlock Private demuestra el uso de PIR para datos públicos de la cadena (buscar una transacción, un bloque o una dirección conocidos sin revelar cuál). **No** resuelve el problema más difícil de las billeteras: descubrir en privado qué notas corresponden a una clave de visualización o comprobar en privado los anuladores de notas sin gastar. Esos temas siguen siendo áreas de investigación activa.

## Conceptos erróneos comunes

- PIR oculta qué elemento solicitaste, pero no necesariamente oculta que te conectaste al servidor; los metadatos a nivel de red son un asunto aparte
- PIR no es exclusivo de Zcash: es una herramienta criptográfica general que Zcash aplica a la privacidad de las billeteras
- La sincronización más rápida mediante PIR es un objetivo en curso, no una función que ya esté disponible en las billeteras
- Descargarlo todo y analizarlo localmente, que es el método actual, preserva la privacidad, pero es lento; PIR busca mantener la privacidad y eliminar la lentitud

## Páginas relacionadas

- [Zcash Sincronización de la billetera](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - por qué la sincronización funciona como lo hace actualmente
- [Nodos de Lightwallet](https://zechub.wiki/zcash-tech/lightwallet-nodes) - el modelo de cliente ligero que PIR podría mejorar
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - la otra herramienta criptográfica importante detrás de la privacidad de Zcash
- [Seguridad poscuántica](https://zechub.wiki/zcash-tech/post-quantum-security) - por qué los métodos basados en retículas serán importantes en el futuro
- [ZecBlock](https://zecblock.com) - el principal explorador público
- [Valar Group](https://zechub.wiki/zcash-organizations/valar-group) - los desarrolladores de las bibliotecas PIR que usan tanto el prototipo del explorador como la investigación sobre billeteras
