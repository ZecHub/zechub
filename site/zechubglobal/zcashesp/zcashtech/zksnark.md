# ZKP & ZK-SNARKS


## ¿Qué es una Prueba?

Las Pruebas son las bases para todas las matemáticas. Una prueba es un reclamo o teorema que estás intentando demostrar una secuencia de derivaciones realizadas para declarar que el teorema ha sido demostrado. Ej. Todos los ángulos de un triángulo total de 180° pueden ser comprobados independientemente por cualquiera (verificador).


**Pruebas**

Probador ---> Hace el reclamo ---> Verificador elige ---> Acepta/Rechaza

(Ambos, el probador y el verificador, son algoritmos)

En informática los términos para prueba eficientemente verificables es Prueba NP. Estas pruebas cortas pueden ser verificables en tiempo polinomial. La idea general es “Existe una solución para un teorema y es pasado al verificador para comprobarlo”

![NPlanguage](https://github.com/ZecHub/zechub/assets/27905787/e8089f44-bd9a-4056-82df-19af0a880a01 "Lenguajes NP")

En un lenguaje-NP = dos condiciones se deben cumplir:

Integridad: los reclamos auténticos serán aceptados por el verificador (permite a los probadores honestos alcanzar la verificación)

Solidez: los reclamos falsos no tendrán pruebas (para todas las estrategias tramposas, el probador tramposo será incapaz de probar la correctitud del reclamo incorrecto).
 

### Pruebas Interactivas y Probabilística

**Interacción**: en lugar de solo leer la prueba, el verificador se compromete con un probador de varias rondas de mensajes.

**Aleatoriedad**: las solicitudes del verificador al probador son aleatorias y el probador debe ser capaz de responder correctamente a cada uno.

![Mod Pruebas Interactivo](https://github.com/ZecHub/zechub/assets/27905787/af082a5d-583e-4b10-99c2-39dff196ab11 "Protocolo Pruebas Interactivas")

Usando interacción y aleatoriedad juntas, es posible probar un reclamo para un verificador a ciegas en Tiempo Probabilístico Polinómico [Probabilistic Polynomial Time (PPT)].

¿Pueden las Pruebas Interactivas verificar más efectivamente que las pruebas NP?

Pruebas NP vs. Pruebas IP:

|  Enunciado   |    NP     | IP     |

|--------------|-----------|--------|

|    NP        |  si       |  si    |

|    CO-NP     |  no       |  si    |

|    #P        |  no       |  si    |

|    PSPACE    |  no       |  si    |


NP – Existe una solución para un enunciado

CO-NP – Probar que no hay soluciones para un enunciado

#P – Contar cuantas soluciones existen para un enunciado

PSPACE – Probar una alternancia de enunciados diferentes
 

### ¿Qué es Conocimiento Cero (Zero Knowledge)?

Lo que un verificador puede calcular después de una interacción es idéntico a lo que podía demostrar antes. La interacción a través de múltiples rondas entre el probador y el verificador no incrementa potencia de cálculo del verificador.
 
**El Paradigma de la Simulación**

Este experimento existe en toda la criptografía. Presenta una “Vista Real” y una “Vista Simulada”.
 
Vista Real: todas las posibles historias de interacciones entre Probadores y Verificadores (P, V)

Vista Simulada: el verificador simula todas las interacciones posibles entre el Probador y el Verificador

![Indistinguibilidad Computacional](https://github.com/ZecHub/zechub/assets/27905787/2af8aa93-3af6-4597-b39d-91c58ea352d0 "Paradigma de la Simulación")

Un diferenciador de tiempo polinomial hace un intento para determinar, ya sea que están viendo la vista real o la simulada y solicitar una muestra de ambas repetidamente.

Se dice que los dos puntos de vista son “computacionalmente indistinguibles” si para todos los algoritmos/estrategias son distinguibles, incluso después de recibir un número polinomial de muestras reales o simuladas la probabilidad es >1/2.

**Argumentos de conocimiento Zero-Knowledge**

Un protocolo interactivo (P,V) es conocimiento cero (zero-knowledge) si existe un simulador (algoritmo) tal que para cada verificador de probabilidad en tiempo polinómico (cuando el teorema es correcto), las distribuciones de probabilidad determinen que la vista real es computacionalmente indistinguible de la vista simulada.

Los Protocolos Interactivos son útiles cuando hay un solo verificador. Un ejemplo podría ser un auditor de hacienda en una aplicación de “prueba de impuestos” de conocimiento cero.


## ¿Qué es un SNARK?

**Argumento de Conocimiento Sucinto No Interactivo**

Definición amplia: una prueba sucinta de que un enunciado es verdad. La prueba debe ser corta y rápida de verificar. En SNARKS un solo mensaje es enviado desde el probador al verificador. El verificador puede entonces escoger, aceptar o rechazar.

Ejemplo de enunciado: “Yo conozco un mensaje (m) tal que SHA256(m)=0”

En un zk-SNARK la prueba no revela nada acerca del mensaje (m)

**Polinomios**: la suma de los términos contienen una constante (como 1,2,3), las variables (como x, y, z), y los exponentes de las variables (como x², y³).

Ejemplo: "3x² + 8x + 17"

**Circuito aritmético**: un modelo para calcular polinomios. Generalmente se puede definir como un Gráfico Acíclico Dirigido (Directed Acyclic Graph – DAG), donde en cada nodo del gráfico se realiza una operación aritmética. El circuito consta de puertas de suma, puertas de multiplicación y algunas puertas constantes. En la misma manera que los circuitos Booleanos transportan bits en cables, los circuitos aritméticos transportan enteros.

![Circuitos](https://github.com/ZecHub/zechub/assets/27905787/1466af84-6f21-4845-bb7c-7b617b773593 "DAG")

En este ejemplo, el probador quiere convencer al verificador que conoce la solución para el circuito aritmético.

**Commitments**: para hacer esto, el probador pondrá todos los valores (privados y públicos) asociados al circuito dentro del commitment. Los commitment ocultan sus entradas usando una función cuya salida es irreversible.

SHA-256 es un ejemplo de una función de hash que puede utilizarse en un esquema de commitment.

Después de que el probador commits los valores, los commitments son enviados al verificador (confiando en que no puedan descubrir ninguno de los valores originales). El probador es entonces capaz de mostrar al verificador que conoce cada uno de los valores de los nodos del gráfico.

**Transformación Fiat-Shamir**

Para hacer el protocolo *no interactivo*, el probador genera aleatoriedad (utilizado para el desafío oculto) en nombre del verificador utilizando una función hash criptográfica. Esto es conocido como el oráculo aleatorio. El probador puede entonces enviar un mensaje único al verificador que podrá comprobar que es correcta.

Para formar un SNARK que pueda ser usado por circuitos generales, dos elementos son requeridos:

Esquema de commitment funcional: permite a un committer hacer commit de un polinomio con una secuencia corta que puede ser usada por un verificador para confirmar evaluaciones reclamadas de los polinomios committed.

Oráculo interactivo de polinomios: el verificador pide al probador (algoritmo) que abra todos los commitments en varios puntos de su elección usando el esquema de commitment polinómico y comprueba si la identidad es cierta entre ellos.


**Configuración**

Los procedimientos de configuración ayudan al verificador resumiendo un circuito y emitiendo parámetros públicos.

![Configuraciones de Procedimientos](https://github.com/ZecHub/zechub/assets/27905787/8bc11ba9-c5f3-4982-bc01-d8574d66de9e "Configuración")


**Tipos de configuración de preprocesamiento**:

Configuración de confianza por circuito: es ejecutado una vez por circuito. Es específico para un circuito y el secreto y la aleatoriedad secreta (cadena de referencia común) debe mantenerse en secreto y destruirse.

Una configuración comprometida en este método significa que un probador deshonesto puede probar falsos enunciados.

Configuración confiable, pero universal: solo tienes que ejecutar configuraciones confiables una vez y es capaz entonces de procesar múltiples circuitos determinísticamente.

Configuración Transparente (configuración no confiable): el procesamiento de algoritmo no utiliza ningún secreto aleatorio en absoluto.

**Tipos de construcciones de pruebas SNARK**:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Requiere configuración confiable, pero tiene muy pocas pruebas que puedan ser verificadas rápidamente.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): Universalmente Confiable.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Configuración no confiable, pero produce ligeramente pruebas más largas o puede tomar más tiempo al probador ejecutarla.

Los SNARKS son útiles cuando se necesitan varios verificadores, por ejemplo en una cadena de bloques como Zcash o zk-rollup como [Aztec](https://docs.aztec.network), para que varios nodos de validación no tengan que interactuar durante varias rondas con cada prueba.
 

## ¿Cómo son las zk-SNARK implementados en Zcash?

Generalmente, las pruebas de conocimiento cero (zero-knowledge proofs) son herramientas para fortalecer el comportamiento honesto en protocolos sin revelar ninguna información.

Zcash es una cadena de bloques pública que facilita las transacciones privadas. Las zk-SNARK son usadas para probar que una transacción privada es válida dentro de las reglas de consenso de la red sin revelar ningún otro detalle acerca de la transacción.

[Video Explicativo – En Inglés](https://www.youtube.com/watch?v=Kx4cIkCY2EA) – En esta ponencia Ariel Gabizon proporciona descripciones del Árbol de Commitment de Notas Zcash (Zcash Note Commitment Tree), Evaluación de polinomios a ciegas (Blind Polynomial Evaluation) y Retos homomórficos ocultos (Homomorphically Hidden Challenges) y como son implementados en la red.

Lee el [libro Halo2 – En Inglés](https://zcash.github.io/halo2/index.html) para más información.
 

## Otras aplicaciones de Conocimiento Cero (Zero-Knowledge)

zk-SNARK proporciona varias ventajas en una variedad de aplicaciones diferentes. Echemos un vistazo a algunos ejemplos.

**Escalabilidad**: esto se logra por la 'Externalización del Cálculo'. No hay necesidad estricta de conocimiento cero para que una cadena L1 verifique el trabajo de un servicio fuera de la cadena. Las transacciones no son necesariamente privadas en un zk-EVM.

La ventaja de un servicio Rollup basado en pruebas (zk-Rollup) es procesar un lote de cientos/miles de transacciones y que la L1 sea capaz de verificar una prueba sucinta que todas las transacciones fueron procesadas correctamente, escalando el rendimiento de las transacciones de la red por un factor de 100 o de 1000.

![ZKVM](https://github.com/ZecHub/zechub/assets/27905787/5d2d039a-0eb2-464d-8f30-7eb68badc015 "ZKVM")

**Interoperabilidad**: esto se logra en un zk-Bridge por 'bloqueo' de activos en una cadena de origen y probando a la cadena objetivo que los activos han sido bloqueados (prueba de consenso).

**Cumplimiento (Compliance)**: proyectos como [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) son capaces de probar que una transacción privada está cumpliendo con las leyes bancarias locales sin revelar los detalles de la transacción.

**Combatir la desinformación**: entre varios ejemplos fuera de blockchain y criptomoneda, el uso de la generación de pruebas en las imágenes procesadas por los noticieros y medios de comunicación para permitir que los espectadores puedan verificar de forma independiente la fuente una imagen y todas las operaciones realizadas en ella. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f

____

Aprendizaje continuo:

[Zero-Knowledge Bibliography - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK's with Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 and SNARKs without Trusted Setups - Sean Bowe on Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Zero knowledge Proofs with Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Interactive Zero-Knowledge Proofs - Chainlink article](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Lecture 1: Introduction and History of ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Simple Explanation of Arithmetic Circuits - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Scalability is Boring, Privacy is Dead: ZK-Proofs, What are They Good for?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

![image](https://github.com/ZecHub/zechub/assets/27905787/f263db93-a39c-4f8b-873c-88a0cf79f629)
