<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP y ZK-SNARKS

## TL;DR

- **zk-SNARKs** = Argumentos de conocimiento sucintos no interactivos zero-knowledge
- Permiten que una parte **demuestre que sabe algo** sin revelar la información en sí
- Zcash utiliza zk-SNARKs para demostrar que una transacción [transaction] es válida (cantidades correctas, entradas no gastadas) **sin revelar al remitente, al receptor ni la cantidad**
- «Sucinto» significa que la prueba [proof] es pequeña y rápida de verificar incluso para afirmaciones complejas
- El pool [pool] Orchard utiliza Halo 2, un sistema zk-SNARK que **no requiere configuración confiable [trusted setup]**

---

## ¿Qué es una prueba?

Las pruebas son la base de todas las matemáticas. Una prueba es una afirmación o teorema que intentas demostrar y una secuencia de derivaciones realizadas para declarar que el teorema ha sido demostrado. Por ejemplo, cualquier persona (verificador) puede comprobar independientemente que todos los ángulos de un triángulo suman 180°.

**Pruebas** 

Demostrador ---> Hace una afirmación ---> El verificador elige ---> Aceptar/Rechazar 

(Tanto el demostrador como el verificador son algoritmos)

En informática, el término para las pruebas verificables eficientemente es pruebas NP. Estas pruebas cortas pueden verificarse en tiempo polinómico. La idea general es: «Existe una solución para un teorema y se entrega al verificador para que la compruebe»


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


En un lenguaje NP deben cumplirse dos condiciones: 

Completitud: Las afirmaciones verdaderas serán aceptadas por el verificador (permite que los demostradores honestos alcancen la verificación)

Solidez: Las afirmaciones falsas no tendrán pruebas (para cualquier estrategia de demostrador tramposo, no podrá demostrar la corrección de una afirmación incorrecta).


### Pruebas interactivas y probabilísticas

**Interacción**: En lugar de limitarse a leer la prueba, el verificador intercambia mensajes con un demostrador durante varias rondas.

**Aleatoriedad**: Las solicitudes del verificador al demostrador son aleatorias y el demostrador debe poder responder correctamente a cada una. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


Utilizando conjuntamente la interacción y la aleatoriedad, es posible demostrar una afirmación a un verificador ciego en tiempo polinómico probabilístico (PPT). 

¿Pueden las pruebas interactivas verificar eficientemente más que las pruebas NP?

Pruebas NP frente a pruebas IP:

|  Afirmación   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  sí      |  sí   |
|    CO-NP     |  no       |  sí   |
|    #P        |  no       |  sí   |
|    PSPACE    |  no       |  sí   |


NP - Existe una solución para una afirmación

CO-NP - Demostrar que no existen soluciones para una afirmación

#P - Contar cuántas soluciones existen para una afirmación

PSPACE  - Demostrar una alternancia de diferentes afirmaciones

### ¿Qué es Zero Knowledge?

Lo que un verificador puede calcular después de una interacción es idéntico a lo que podría demostrar antes. La interacción durante varias rondas entre el demostrador y el verificador no ha aumentado el poder computacional del verificador.

**La simulación Paradigm**

Este experimento existe en toda la criptografía. Presenta una «vista real» y una «vista simulada». 

Vista real: Todos los historiales posibles de interacciones entre el demostrador y el verificador (P,V)

Vista simulada: El verificador simula todas las interacciones posibles entre el demostrador y el verificador 

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

Un distinguidor de tiempo polinómico intenta determinar si está observando la vista real o la simulada y solicita repetidamente una muestra de ambas.

Se dice que las dos vistas son «computacionalmente indistinguibles» si, para todos los algoritmos/estrategias de distinción, incluso después de recibir un número polinómico de muestras reales o simuladas, la probabilidad es >1/2. 

**Argumentos de conocimiento Zero-Knowledge**

Un protocolo interactivo (P,V) es zero-knowledge si existe un simulador (algoritmo) tal que, para cada verificador probabilístico de tiempo polinómico (cuando el teorema es correcto), las distribuciones de probabilidad que determinan la vista real de la simulada son computacionalmente indistinguibles. 

Los protocolos interactivos son útiles cuando hay un único verificador. Un ejemplo sería un auditor fiscal en una aplicación zero-knowledge de «prueba de impuestos».

## ¿Qué es un SNARK?

**Argumento de conocimiento sucinto no interactivo**

Definición general: Una prueba sucinta de que una afirmación es verdadera. La prueba debe ser corta y rápida de verificar. En los SNARKS se envía un único mensaje del demostrador al verificador. El verificador puede entonces elegir aceptar o rechazar. 

Ejemplo de afirmación: «Conozco un mensaje (m) tal que SHA256(m)=0»

En un zk-SNARK la prueba no revela nada sobre el mensaje (m).

**Polinomios**: Sumas de términos que contienen una constante (como 1,2,3), variables (como x,y,z) y exponentes de variables (como x², y³). 

Ejemplo: «3x² + 8x + 17»

**Circuito aritmético**: Un modelo para calcular polinomios. De forma más general, puede definirse como un grafo acíclico dirigido en el que se realiza una operación aritmética en cada nodo del grafo. El circuito consta de compuertas de suma, compuertas de multiplicación y algunas compuertas constantes. De la misma manera que los circuitos booleanos transportan bits por cables, los circuitos aritméticos transportan enteros.


<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

En este ejemplo, el demostrador quiere convencer al verificador de que conoce una solución para el circuito aritmético.  

**Compromisos [commitments]**: Para ello, el demostrador colocará todos los valores (privados y públicos) asociados con el circuito en un compromiso. Los compromisos ocultan sus entradas mediante una función cuya salida es irreversible.

Sha256 es un ejemplo de función hash que puede utilizarse en un esquema de compromisos.

Después de que el demostrador se compromete con los valores, los compromisos se envían al verificador (confiando en que no puede descubrir ninguno de los valores originales). El demostrador puede entonces mostrar al verificador que conoce cada uno de los valores en los nodos del grafo. 

**Transformación Fiat-Shamir**

Para hacer que el protocolo sea *no interactivo*, el demostrador genera aleatoriedad (utilizada para el desafío oculto) en nombre del verificador mediante una función hash criptográfica. Esto se conoce como el oráculo aleatorio. El demostrador puede entonces enviar un único mensaje al verificador, quien puede comprobar que sea correcto. 

Para formar un SNARK que pueda utilizarse para circuitos generales se requieren dos elementos:

Esquema de compromisos funcional: Permite que quien se compromete se comprometa con un polinomio mediante una cadena corta que puede utilizar un verificador para confirmar las evaluaciones declaradas del polinomio comprometido.

Oráculo interactivo de polinomios: El verificador pide al demostrador (algoritmo) que abra todos los compromisos en varios puntos de su elección mediante el esquema de compromisos polinómicos y comprueba que se cumple la identidad entre ellos.

**Configuración**

Los procedimientos de configuración ayudan al verificador resumiendo un circuito y generando parámetros públicos. 

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**Tipos de configuración de preprocesamiento**:

Configuración confiable [trusted setup] por circuito - Se realiza por separado para cada circuito. La cadena de referencia común (CRS) resultante contiene parámetros públicos utilizados por los probadores y verificadores. Es el material intermedio secreto de configuración («desechos tóxicos»), y no la CRS, lo que debe mantenerse en secreto y destruirse. La [explicación de los parámetros públicos](https://zodl.com/snark-parameters/) de ECC distingue ambos.

Si el material secreto de configuración [secret setup material] requerido se conserva o recupera, un demostrador deshonesto puede ser capaz de producir pruebas de afirmaciones falsas. En una ceremonia MPC [MPC ceremony], la seguridad puede depender de que al menos un participante siga el protocolo y destruya su contribución secreta.

Configuración confiable pero universal [Trusted but universal setup] - Una única configuración confiable produce parámetros que pueden utilizarse para derivar claves de prueba y verificación para varios circuitos dentro de los límites de tamaño admitidos. Esto todavía implica una suposición de destrucción del secreto; universal no significa transparente.

Configuración transparente [Transparent setup] (sin configuración confiable [no trusted setup]) - Los parámetros públicos [public parameters] pueden generarse sin una trampa secreta de configuración que se deba confiar que alguien destruya. No significa que la generación de pruebas no use aleatoriedad [randomness] ni que el sistema no tenga parámetros públicos. El libro [Halo 2](https://zcash.github.io/halo2/background/pc-ipa.html#setup) ofrece un ejemplo de parámetros de grupo públicos.


**Tipos de construcciones de pruebas SNARK**:

[Groth16](https://eprint.iacr.org/2016/260): Requiere configuración confiable, pero tiene pruebas muy cortas que pueden verificarse rápidamente.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[PLONK](https://eprint.iacr.org/2019/953): Configuración confiable universal.

[DARK](https://eprint.iacr.org/2019/1229)/[Halo](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): No requieren configuración confiable, pero producen pruebas ligeramente más largas o pueden tardar más en ejecutarse para el demostrador. 

Los SNARKS son útiles cuando se necesitan varios verificadores, como una blockchain como Zcash o un zk-Rollup como [Aztec](https://docs.aztec.network), para que varios nodos validadores no tengan que interactuar durante varias rondas con cada prueba. 

## ¿Cómo se implementan los zk-SNARK en Zcash?

En general, las pruebas zero-knowledge son una herramienta para imponer un comportamiento honesto en los protocolos sin revelar ninguna información. 

Zcash es una blockchain pública que facilita transacciones privadas. Los zk-SNARK se utilizan para demostrar que una transacción privada es válida dentro de las reglas de consenso de la red sin revelar ningún otro detalle sobre la transacción. 

[Explicación en vídeo](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - En esta conferencia, Ariel Gabizon describe el árbol de compromisos de notas Zcash, la evaluación polinómica ciega y los desafíos ocultos homomórficamente, y cómo se implementan en la red. 

Lee el [libro Halo2](https://zcash.github.io/halo2/index.html) para obtener más información.

## Otras aplicaciones Zero-Knowledge 

Los zk-SNARKs proporcionan varias ventajas en una variedad de aplicaciones diferentes. Veamos algunos ejemplos.

**Escalabilidad [scalability]**: Esto se logra mediante la «externalización del cálculo». No existe una necesidad estricta de zero-knowledge para que una red L1 verifique el trabajo de un servicio off-chain. Las transacciones no son necesariamente privadas en una zk-EVM.

La ventaja de un servicio Rollup basado en pruebas (zk-Rollup) es procesar un lote de cientos/miles de transacciones y que la L1 pueda verificar una prueba sucinta de que todas las transacciones se procesaron correctamente, escalando el rendimiento de transacciones de la red por un factor de 100 o 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**Interoperabilidad**: Esto se logra en un zk-Bridge «bloqueando» activos en una cadena de origen y demostrando a la cadena de destino que los activos han sido bloqueados (prueba de consenso).

**Cumplimiento normativo**: Proyectos como [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) pueden demostrar que una transacción privada cumple con las leyes bancarias locales sin revelar los detalles de la transacción. 

**Lucha contra la desinformación**: Entre varios ejemplos fuera de blockchain y las criptomonedas, se encuentra el uso de generación de pruebas sobre imágenes procesadas por medios de noticias y comunicación para permitir que los espectadores verifiquen independientemente la fuente de una imagen y todas las operaciones realizadas en ella. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Aprendizaje adicional: 

[Bibliografía Zero-Knowledge - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARKs con Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 y SNARKs sin configuraciones confiables - Sean Bowe en Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Pruebas Zero Knowledge con Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Pruebas Zero-Knowledge interactivas - Artículo de Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Lección 1: Introducción e historia de ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Explicación sencilla de circuitos aritméticos - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[La escalabilidad es aburrida, la privacidad está muerta: Pruebas ZK, ¿para qué sirven?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Páginas relacionadas

- [Pools blindados](/using-zcash/shielded-pools) — Cómo se utilizan los zk-SNARKs en los pools de valor Zcash
- [Halo](/zcash-tech/halo) — El sistema zk-SNARK de Zcash que elimina las configuraciones confiables
- [Seguridad poscuántica en Zcash](/zcash-tech/post-quantum-security) - Cómo los riesgos cuánticos futuros se relacionan con la criptografía Zcash
- [Zcash Activos blindados](/zcash-tech/zcash-shielded-assets) — ZSAs construidos sobre la tecnología zk-SNARK
- [¿Qué es ZEC y Zcash](/start-here/what-is-zec-and-zcash) — Introducción a Zcash y su modelo de privacidad
- [¿Quién puede ver tu pago Zcash?](/start-here/who-can-see-your-zcash-payment) — Qué permanece público y qué oculta el blindaje
