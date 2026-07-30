<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# ZKP y ZK-SNARKS

## TL;DR

- **ZK-SNARKs** = Argumentos de conocimiento sucintos no interactivos de conocimiento cero
- Permiten que una parte **demuestre que sabe algo** sin revelar la información en sí
- Zcash usa ZK-SNARKs para demostrar que una transacción es válida (cantidades correctas, entradas no gastadas) **sin revelar remitente, receptor ni cantidad**
- "Sucinto" significa que la prueba es pequeña y rápida de verificar incluso para afirmaciones complejas
- El pool Orchard usa Halo 2, un sistema ZK-SNARK con **sin configuración confiable requerida**

---

## ¿Qué es una prueba?

Las pruebas son la base de todas las matemáticas. Una prueba es una afirmación o teorema que intentas demostrar y una secuencia de derivaciones realizadas para declarar que el teorema ha sido demostrado. Por ejemplo, que todos los ángulos de un triángulo suman 180° puede ser comprobado de forma independiente por cualquiera (verificador).

**Pruebas** 

Demostrador ---> Hace una afirmación ---> El verificador elige ---> Aceptar/Rechazar 

(Tanto el demostrador como el verificador son algoritmos)

En informática, el término para pruebas verificables de manera eficiente es pruebas NP. Estas pruebas cortas pueden verificarse en tiempo polinómico. La idea general es "Existe una solución para un teorema y se le entrega al verificador para que la compruebe"


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


En un lenguaje NP = deben cumplirse dos condiciones: 

Completitud: Las afirmaciones verdaderas serán aceptadas por el verificador (permite que demostradores honestos alcancen la verificación)

Solidez: Las afirmaciones falsas no tendrán pruebas (para toda estrategia de demostrador tramposo, no podrán demostrar la corrección de una afirmación incorrecta).


### Pruebas interactivas y probabilísticas

**Interacción**: En lugar de simplemente leer la prueba, el verificador interactúa con un demostrador de ida y vuelta durante varias rondas de mensajes.

**Aleatoriedad**: Las solicitudes del verificador al demostrador se aleatorizan y el demostrador debe poder responder correctamente a cada una. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


Usando interacción y aleatoriedad juntas, es posible demostrar una afirmación a un verificador ciego en tiempo polinómico probabilístico (PPT). 

¿Pueden las pruebas interactivas verificar eficientemente más que las pruebas NP?

Pruebas NP vs pruebas IP:

|  Afirmación   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  sí       |  sí    |
|    CO-NP     |  no       |  sí    |
|    #P        |  no       |  sí    |
|    PSPACE    |  no       |  sí    |


NP - Existe una solución para una afirmación

CO-NP - Demostrar que no existen soluciones para una afirmación

#P - Contar cuántas soluciones existen para una afirmación

PSPACE  - Demostrar una alternancia de diferentes afirmaciones

### ¿Qué es conocimiento cero?

Lo que un verificador puede calcular después de una interacción es idéntico a lo que podía demostrar antes. La interacción durante múltiples rondas entre el demostrador y el verificador no ha incrementado la potencia computacional del verificador.

**El paradigma de simulación (Simulation Paradigm)**

Este experimento existe en toda la criptografía. Presenta una "Vista real" y una "Vista simulada". 

Vista real: Todos los historiales posibles de interacciones entre Demostrador y Verificador (P,V)

Vista simulada: El verificador simula todas las interacciones posibles entre Demostrador y Verificador 

<a href="">
    <img width="850" height="397" alt="simulation1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

Un distinguidor de tiempo polinómico intenta determinar si está viendo la vista real o la simulada y solicita repetidamente una muestra de ambas.

Se dice que las dos vistas son "computacionalmente indistinguibles" si para todos los algoritmos/estrategias distinguidoras, incluso después de recibir un número polinómico de muestras de la vista real o simulada, la probabilidad es >1/2. 

**Argumentos de conocimiento de conocimiento cero**

Un protocolo interactivo (P,V) es de conocimiento cero si existe un simulador (algoritmo) tal que, para todo verificador probabilístico de tiempo polinómico (cuando el teorema es correcto), las distribuciones de probabilidad que determinan la vista real frente a la simulada son computacionalmente indistinguibles. 

Los protocolos interactivos son útiles cuando hay un único verificador. Un ejemplo sería un auditor fiscal en una aplicación de "prueba de impuestos" con conocimiento cero.

## ¿Qué es un SNARK?

**Argumento de conocimiento sucinto no interactivo**

Definición amplia: una prueba sucinta de que una afirmación es verdadera. La prueba debe ser corta y rápida de verificar. En los SNARKS se envía un único mensaje del Demostrador al Verificador. El verificador puede entonces elegir aceptar o rechazar. 

ejemplo de afirmación: "Conozco un mensaje (m) tal que SHA256(m)=0"

En un zk-SNARK la prueba no revela nada sobre el mensaje (m).

**Polinomios**: Sumas de términos que contienen una constante (como 1,2,3), variables (como x,y,z) y exponentes de variables (como x², y³). 

ejemplo: "3x² + 8x + 17"

**Circuito aritmético**: Un modelo para calcular polinomios. De manera más general, puede definirse como un grafo acíclico dirigido en el que, en cada nodo del grafo, se realiza una operación aritmética. El circuito consiste en puertas de suma, puertas de multiplicación y algunas puertas constantes. De la misma manera que los circuitos booleanos transportan bits por cables, los circuitos aritméticos transportan enteros.


<a href="">
<img width="785" height="368" alt="circuit1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

En este ejemplo, el demostrador quiere convencer al verificador de que conoce una solución al circuito aritmético.  

**Compromisos**: Para hacer esto, el demostrador colocará todos los valores (privados y públicos) asociados con el circuito dentro de un compromiso. Los compromisos ocultan sus entradas usando una función cuya salida es irreversible.

Sha256 es un ejemplo de función hash que puede usarse en un esquema de compromisos.

Después de que el demostrador se compromete con los valores, los compromisos se envían al verificador (con la certeza de que no podrá descubrir ninguno de los valores originales). El demostrador puede entonces mostrar al verificador que conoce cada uno de los valores en los nodos del grafo. 

**Transformación Fiat-Shamir**

Para hacer el protocolo *no interactivo*, el demostrador genera aleatoriedad (usada para el desafío oculto) en nombre del verificador usando una función hash criptográfica. Esto se conoce como el oráculo aleatorio. El demostrador puede entonces enviar un único mensaje al verificador, que luego puede comprobar que es correcto. 

Para formar un SNARK que pueda usarse para circuitos generales se requieren dos elementos:

Esquema de compromisos funcionales: Permite a quien se compromete comprometerse con un polinomio mediante una cadena corta que puede ser usada por un verificador para confirmar evaluaciones declaradas del polinomio comprometido.

Oráculo interactivo de polinomios: El verificador pide al demostrador (algoritmo) que abra todos los compromisos en varios puntos de su elección usando un esquema de compromiso de polinomios y comprueba que se mantenga la identidad entre ellos.

**Configuración**

Los procedimientos de configuración ayudan al verificador resumiendo un circuito y generando parámetros públicos. 

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

**Tipos de configuración de preprocesamiento**:

Configuración confiable por circuito - Se ejecuta una vez por circuito. Es específica de un circuito y la aleatoriedad secreta (Common Reference String) debe mantenerse en secreto y destruirse. 

Una configuración comprometida en este método significa que un demostrador deshonesto puede demostrar afirmaciones falsas. 

Configuración confiable pero universal - Solo tiene que ejecutar la configuración confiable una vez y luego puede preprocesar de manera determinista múltiples circuitos. 

Configuración transparente (sin configuración confiable)- El algoritmo de preprocesamiento no usa ninguna aleatoriedad secreta en absoluto. 


**Tipos de construcciones de pruebas SNARK**:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Requiere una configuración confiable, pero tiene pruebas muy cortas que pueden verificarse rápidamente.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): Configuración confiable universal.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Sin configuración confiable, pero producen pruebas ligeramente más largas o pueden tardar más en ejecutarse para el demostrador. 

Los SNARKS son útiles cuando se necesitan múltiples verificadores, como en una blockchain como Zcash o un zk-Rollup como [Aztec](https://docs.aztec.network), para que múltiples nodos validadores no tengan que interactuar durante varias rondas con cada prueba. 

## ¿Cómo se implementan los zk-SNARK en Zcash?

En general, las pruebas de conocimiento cero son una herramienta para imponer un comportamiento honesto en los protocolos sin revelar ninguna información. 

Zcash es una blockchain pública que facilita transacciones privadas. Los zk-SNARK se usan para demostrar que una transacción privada es válida dentro de las reglas de consenso de la red sin revelar ningún otro detalle sobre la transacción. 

[Video explicativo](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - En esta charla, Ariel Gabizon ofrece descripciones del árbol de compromisos de notas de Zcash, la evaluación polinómica ciega y los desafíos ocultos homomórficamente, y cómo se implementan en la red. 

Lee el [libro de Halo2](https://zcash.github.io/halo2/index.html) para más información.

## Otras aplicaciones de conocimiento cero 

zk-SNARKS ofrecen varias ventajas en una variedad de aplicaciones diferentes. Veamos algunos ejemplos.

**Escalabilidad**: Esto se logra mediante la "externalización del cómputo". No existe una necesidad estricta de conocimiento cero para que una cadena L1 verifique el trabajo de un servicio off-chain. Las transacciones no son necesariamente privadas en una zk-EVM.

La ventaja de un servicio Rollup basado en pruebas (zk-Rollup) es procesar un lote de cientos/miles de transacciones y que la L1 pueda verificar una prueba sucinta de que todas las transacciones se procesaron correctamente, escalando el rendimiento de transacciones de la red por un factor de 100 o 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


**Interoperabilidad**: Esto se logra en un zk-Bridge "bloqueando" activos en una cadena de origen y demostrando a la cadena de destino que los activos han sido bloqueados (prueba de consenso).

**Cumplimiento**: Proyectos como [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) pueden demostrar que una transacción privada cumple con las leyes bancarias locales sin revelar los detalles de la transacción. 

**Lucha contra la desinformación**: Entre varios ejemplos fuera de la blockchain y las criptomonedas, está el uso de generación de pruebas sobre imágenes procesadas por medios de noticias y comunicación para permitir que los espectadores verifiquen de forma independiente la fuente de una imagen y todas las operaciones realizadas sobre ella. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Aprendizaje adicional: 

[Bibliografía de conocimiento cero - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK's con Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 y SNARKs sin configuraciones confiables - Sean Bowe en Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Pruebas de conocimiento cero con Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Pruebas interactivas de conocimiento cero - artículo de Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Lección 1: Introducción e historia de ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Explicación simple de los circuitos aritméticos - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[La escalabilidad es aburrida, la privacidad está muerta: ZK-Proofs, ¿para qué sirven?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Páginas relacionadas

- [Pools blindados](/using-zcash/shielded-pools) — Cómo se usan ZK-SNARKs en los pools de valor de Zcash
- [Halo](/zcash-tech/halo) — El sistema ZK-SNARK de Zcash que elimina las configuraciones confiables
- [Seguridad post-cuántica en Zcash](/zcash-tech/post-quantum-security) - Cómo los futuros riesgos cuánticos se relacionan con la criptografía de Zcash
- [Activos blindados de Zcash](/zcash-tech/zcash-shielded-assets) — ZSAs construidos sobre tecnología ZK-SNARK
- [Qué es ZEC y Zcash](/start-here/what-is-zec-and-zcash) — Introducción a Zcash y su modelo de privacidad
- [La privacidad como principio fundamental](/privacy/privacy-as-a-core-principle) — Por qué importa la privacidad financiera
