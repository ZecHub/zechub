# Recuperación privada de información

## TL;DR

- La recuperación privada de información, o PIR, permite que un dispositivo obtenga un elemento de la base de datos de un servidor sin que el servidor sepa qué elemento se solicitó
- Zcash necesita esto porque una wallet privada no puede preguntarle a un servidor qué transacciones le pertenecen sin delatarse
- Hoy las wallets descargan y escanean muchos más datos de los que necesitan, lo que es una de las principales razones por las que la sincronización es lenta
- PIR permitiría que una wallet obtenga solo sus propios datos de forma privada, eliminando ese cuello de botella mientras mantiene la privacidad intacta
- Es un área de investigación activa para Zcash, poderosa en teoría, y que se está volviendo práctica para wallets reales

<br/>

## Para quién es esto

- Cualquiera que se haya preguntado cómo una wallet privada encuentra sus propias monedas sin filtrar cuáles son
- Personas nuevas que siguen viendo que PIR se menciona junto con el trabajo de escalado de Zcash
- Lectores que quieren primero el concepto y después la criptografía que hay debajo

<br/>

## El problema que PIR resuelve para Zcash

Zcash oculta para quién es una transacción. Esa privacidad crea una pregunta incómoda: si la red no puede ver qué transacciones te pertenecen, ¿cómo las encuentra tu propia wallet?

Hoy la respuesta es directa. Una wallet no puede preguntarle a un servidor qué transacciones son mías, porque esa pregunta revelaría exactamente lo que Zcash intenta ocultar. Así que, en cambio, la wallet descarga una gran cantidad de datos y prueba cada elemento localmente para ver qué le pertenece. Funciona y preserva la privacidad, pero es lento y pesado. Este escaneo es una de las principales razones por las que la sincronización de la wallet puede sentirse lenta.

Lo ideal sería una forma de que una wallet le pida a un servidor precisamente sus propios datos, y los reciba, sin que el servidor llegue a saber jamás qué se solicitó. Eso es exactamente lo que proporciona la recuperación privada de información.

<br/>

## Qué es PIR

La recuperación privada de información es un método criptográfico que permite que un cliente lea una entrada de la base de datos de un servidor sin revelar al servidor qué entrada leyó.

Imagina una biblioteca donde puedes recibir exactamente el libro que quieres, pero el bibliotecario nunca sabe qué libro te entregó. Obtienes tu elemento y tu interés sigue siendo privado. PIR es la versión matemática de esa idea, aplicada a cualquier base de datos.

El concepto ha sido estudiado en criptografía durante décadas. Se introdujo por primera vez en 1995 por Chor, Goldreich, Kushilevitz y Sudan, quienes describieron el enfoque de múltiples servidores, y la primera versión de servidor único llegó después en 1997 de la mano de Kushilevitz y Ostrovsky. No es algo que Zcash haya inventado, es un campo consolidado que Zcash está aplicando ahora a un problema real y persistente.

<br/>

## Cómo funciona PIR, a un primer nivel

Hay dos formas generales de construir PIR, y la diferencia importa.

La primera usa múltiples servidores. El cliente envía a cada uno de varios servidores una parte de la consulta y combina sus respuestas localmente. Ningún servidor individual ve lo suficiente como para saber qué se solicitó. Esto es eficiente, pero depende de que los servidores no coludan entre sí, algo difícil de garantizar en el mundo real.

La segunda usa un solo servidor y criptografía ingeniosa en lugar de múltiples partes. Aquí el cliente se apoya en una herramienta especial llamada cifrado homomórfico, y esta es la dirección más útil para implementaciones reales, porque no necesita múltiples servidores que no coludan.

<br/>

## El mecanismo: cifrado homomórfico

El cifrado homomórfico es un tipo de cifrado que permite que un servidor haga cálculos sobre datos mientras estos permanecen cifrados. El servidor produce una respuesta cifrada correcta sin ver nunca los valores subyacentes.

Esta es la idea detrás de PIR de servidor único construido de esta manera. El cliente quiere el elemento número tres de una lista. Construye una consulta que es, en efecto, un sí cifrado para la posición tres y un no cifrado para todas las demás posiciones. Para el servidor, esta consulta es solo ruido sin sentido, no puede distinguir qué posición contiene el sí.

Luego el servidor combina su base de datos con esta consulta cifrada usando las propiedades especiales del cifrado homomórfico, multiplicando cada elemento almacenado por el sí o no cifrado correspondiente y sumando los resultados. Lo que sale es un único paquete cifrado que contiene exactamente el elemento que el cliente quería, y nada revela cuál era. El cliente descifra ese paquete y lee su elemento. El servidor ha respondido la pregunta sin llegar a conocer nunca la pregunta.

Una versión más fuerte, llamada PIR simétrico, añade una segunda garantía: el cliente aprende solo el elemento que pidió y nada sobre cualquier otra entrada de la base de datos. Eso protege la base de datos además del cliente.

<br/>

## Una mirada más de cerca para lectores técnicos

Los esquemas modernos de servidor único se basan en criptografía de retículas, más comúnmente en la suposición de learning with errors. La consulta del cliente es un vector de ciphertexts, un cifrado de uno en el índice objetivo y cero en el resto, y el cifrado es homomórfico aditivo, por lo que el servidor puede sumar ciphertexts y multiplicarlos por entradas en texto plano de la base de datos sin descifrarlos.

El servidor trata la base de datos como una matriz, aplica el vector de selección cifrado y devuelve un único ciphertext que se descifra en la fila deseada. Como la consulta es indistinguible de ruido aleatorio, el servidor no obtiene ninguna información sobre el índice.

El obstáculo histórico siempre ha sido el costo. De forma ingenua, el servidor debe tocar cada entrada de la base de datos para cada consulta, lo cual es costoso en computación, y los ciphertexts son grandes, lo cual es costoso en ancho de banda. La investigación reciente aborda esto con preprocesamiento; esquemas como SimplePIR y FrodoPIR permiten que el servidor prepare la base de datos por adelantado y entregue a cada cliente una pista pequeña, desplazando gran parte del trabajo a una fase offline para que las consultas en vivo se vuelvan rápidas. Un beneficio adicional útil es que también se considera que las construcciones basadas en retículas resisten ataques cuánticos, lo que encaja con el movimiento más amplio de Zcash hacia la privacidad post-cuántica.

<br/>

## PIR en Zcash

PIR es parte del esfuerzo por hacer que Zcash sea tanto privado como rápido a escala.

El cuello de botella del escaneo de wallet descrito antes es el objetivo. El trabajo en Valar Group está desarrollando técnicas de recuperación privada de información para que una wallet pueda obtener sus propios datos de un servidor sin que el servidor sepa qué entradas se solicitaron. Una aplicación concreta es verificar nullifiers de forma privada. Un nullifier es un marcador único que se publica cuando una note se gasta, lo que evita que los mismos fondos se gasten dos veces. Una wallet a menudo necesita verificar si un nullifier dado ya ha aparecido, en otras palabras, si una note sigue sin gastarse, y hacerlo a través de un servidor hoy puede filtrar sobre qué note se está preguntando. La recuperación privada de información permite que la wallet haga esa pregunta sin revelar qué nullifier le importa. Esto acompaña a otros trabajos de escalado, incluidos Project Tachyon y nuevo software de nodos, orientados a eliminar los límites de rendimiento que hoy frenan a las wallets privadas.

Es importante ser honestos sobre la etapa en la que está esto. Se trata de investigación e ingeniería activas, no de una función terminada y ya lanzada. El concepto está bien establecido y la dirección está definida, pero lograr que PIR sea lo bastante eficiente para wallets de uso diario en dispositivos comunes es precisamente la parte difícil en la que se está trabajando ahora.

<br/>

## Ideas erróneas comunes

- PIR oculta qué elemento solicitaste, no necesariamente oculta que contactaste al servidor en absoluto; los metadatos a nivel de red son una preocupación aparte
- PIR no es exclusivo de Zcash, es una herramienta criptográfica general que Zcash está aplicando a la privacidad de las wallets
- Una sincronización más rápida gracias a PIR es un objetivo en progreso, no una función ya presente en las wallets
- Descargar todo y escanear localmente, el enfoque actual, es privado pero lento; PIR busca mantener la privacidad mientras elimina esa lentitud

<br/>

## Páginas relacionadas

- [Sincronización de wallets de Zcash](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - por qué la sincronización funciona hoy de la manera en que lo hace
- [Nodos de lightwallet](https://zechub.wiki/zcash-tech/lightwallet-nodes) - el modelo de cliente ligero que PIR mejoraría
- [ZK-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - la otra gran herramienta criptográfica detrás de la privacidad de Zcash
- [Seguridad post-cuántica](https://zechub.wiki/zcash-tech/post-quantum-security) - por qué los métodos basados en retículas importan para el futuro
