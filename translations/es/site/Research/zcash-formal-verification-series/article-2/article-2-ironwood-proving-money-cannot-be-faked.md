![alt text](image-1.png)
# Ironwood: Demostrar Que El Dinero No Puede Falsificarse

### Cómo Zcash respondió a un error con una prueba [proof] verificada por una máquina

> **Serie:** *Verificación Formal [Formal Verification]* · **Parte 3 de 3**
> **Público:** principiantes. Las partes 1 y 2 presentan la verificación formal y el error de Orchard; este final muestra cómo ambas ideas se unen en un sistema real. Recordaremos todo lo necesario a medida que avancemos.
> **Con qué te quedarás:** una comprensión precisa de lo que Zcash demostró realmente sobre su nuevo pool [pool] «Ironwood», cómo está estructurada la prueba, qué cubre y qué no, cómo se retiró el antiguo pool de forma segura y por qué esto apunta a un nuevo estándar para construir dinero criptográfico.

En la Parte 1 aprendimos qué significa *demostrar* que un sistema es correcto. En la Parte 2 vimos un defecto real que las pruebas no detectaron durante cuatro años: una multiplicación de curva elíptica con restricciones insuficientes que podría haber permitido una falsificación invisible e ilimitada. Este artículo es la resolución: cómo Zcash respondió no solo con un parche, sino con una prueba verificada por una máquina de que toda esa clase de error ha desaparecido.

---

## 1. ¿Por qué debería importarte?

Cuando un error amenaza el dinero, la respuesta habitual es corregirlo y seguir adelante. Zcash hizo algo más ambicioso. Junto con un nuevo pool blindado [shielded] llamado **Ironwood**, activado el 28 de julio de 2026, sus ingenieros publicaron una **prueba matemática verificada por una máquina**, con más de **2.700 teoremas** escritos en el asistente de pruebas **Lean**, que establece que el nuevo pool no puede crear monedas falsificadas bajo sus supuestos declarados. La prueba es pública, está en el repositorio de código abierto `ironwood` y requirió más de un mes de trabajo de tres equipos de investigadores y criptógrafos.

Esto importa más allá de Zcash. Es una de las demostraciones más claras del mundo real de que se puede tomar un sistema financiero en funcionamiento, escribir con precisión qué significa «sin falsificación» y *demostrarlo*, en vez de esperar que las pruebas hayan sido exhaustivas. Convierte una promesa en un teorema.

---

## 2. La idea central: demostrar la especificación, eliminar la clase de error

La Parte 2 terminó con la idea que hizo esto posible. Recuérdala, porque todo lo que sigue se apoya en ella:

> Un error de falsificación *indetectable* solo puede existir en la **especificación** del protocolo, la descripción matemática de lo que el circuito debe imponer. Cualquier cosa detectable aparecería en la contabilidad pública. Por tanto, demostrar que la especificación es sólida elimina de una vez toda la clase de errores de falsificación oculta.

¿Por qué «solo en la especificación»? Porque cada bloque [block] registra permanentemente el contenido completo de cada transacción [transaction], incluidas sus pruebas. Si el *software* aceptara erróneamente una transacción inválida, cualquiera podría reproducir el historial con software corregido y detectarlo. Esa evidencia es permanente y pública. Solo un defecto en las *matemáticas* subyacentes puede ocultarse para siempre, porque no existe una «versión correcta» con la cual reproducirlo. Ese es el defecto al que apunta la verificación formal.

Las pruebas comprueban el *comportamiento en entradas muestreadas*, y el error de Orchard se ocultó precisamente porque ninguna entrada muestreada lo alcanzó. Una prueba sobre la especificación cubre **todas** las entradas simultáneamente, incluidos los casos límite que nadie pensaría probar. Ese es el único tipo de garantía suficientemente fuerte para retirar con confianza un defecto invisible de cuatro años.

![alt text](image-2.png)

---

## 3. Qué se demostró exactamente

La prueba establece una única propiedad principal, construida sobre otra más profunda.

### Integridad del saldo (la idea principal)

> **Integridad del saldo:** el valor oculto almacenado en el pool blindado nunca supera el valor público neto que ha entrado en él.

Esta es la propiedad contra la falsificación expresada de forma sencilla. El dinero puede entrar en el pool blindado —de forma públicamente visible— y salir de él —también de forma públicamente visible—, pero dentro, donde las cantidades están ocultas, no puede crearse valor de la nada. Veámoslo con un pequeño registro contable (aritmética verificada):

- **Transacción honesta:** las entradas por valor de `5 + 3 = 8` producen salidas por valor de `4 + 4 = 8`. El valor que entra equivale al que sale. La integridad del saldo se mantiene. ✓
- **Un intento de falsificación:** las mismas entradas por valor de `8`, pero salidas de `4 + 4 + 2 = 10`. Eso acuñaría `2` unidades de la nada. La integridad del saldo **prohíbe** esto: el pool nunca puede pagar más de lo que entró en él. ✗

La integridad del saldo es la afirmación matemática de que el segundo escenario nunca puede producir una transacción válida.

### Solidez del conocimiento (el motor subyacente)

Para garantizar la integridad del saldo, los investigadores primero tuvieron que demostrar una propiedad más profunda y sutil del propio sistema de pruebas zero-knowledge [zero-knowledge]. La solidez ordinaria —«solo las afirmaciones verdaderas tienen un testigo», como en la Parte 2— resulta ser *insuficiente* para un pool blindado, por una razón fascinante: como una transacción oculta puede contener cualquier cosa, casi toda afirmación técnicamente *tiene* algún testigo. Por eso los investigadores demostraron una propiedad más fuerte:

> **Solidez del conocimiento:** cualquiera que pueda producir una prueba de transacción válida debe *poseer realmente* un testigo válido; es decir, monedas reales, derivadas correctamente y en la dirección [address] correcta.

La herramienta formal para ello es un **extractor**: un procedimiento que, dado cualquier demostrador que pueda convencer al verificador, puede extraer de él el testigo real. Si siempre puede extraerse un testigo, entonces un demostrador convincente realmente debía tener uno. En el lenguaje de la Parte 2, la solidez del conocimiento es la promesa formal de que no existe **ninguna brecha de solidez**, ninguna restricción ausente que permita que una afirmación falsa se filtre. Es exactamente la propiedad cuya *ausencia* constituía el error de Orchard. Demostrar su presencia, para todos los demostradores posibles, cierra esa puerta de golpe.

![alt text](image-3.png)

---

## 4. Cómo se construyó la prueba

La verificación requirió un serio esfuerzo humano, no fue un resultado de pulsar un botón:

- Se escribió en el asistente de pruebas **Lean** (de la Parte 1: una máquina que comprueba cada paso lógico).
- Comprende **más de 2.700 teoremas**, disponibles públicamente en el repositorio `ironwood`.
- Fue producida por **tres equipos** de investigadores y criptógrafos durante **más de un mes**, incluido el trabajo liderado por Tal Derei del Proyecto Tachyon, con contribuciones de Gregor Mitscha-Baude de zkSecurity y Daira-Emma Hopwood del Open Development Lab de Zcash, además de una prueba independiente y paralela de solidez realizada por otros criptógrafos.

Para razonar sobre la propiedad, el modelo de Lean describe un **registro contable** completo como una lista de transacciones, cada una con sus acciones, su valor público declarado y sus firmas [signature]. Un predicado que los investigadores llaman **ValidLedger** transcribe directamente las reglas de consenso [consensus] de la red: el testigo de cada acción debe satisfacer las condiciones requeridas, ningún marcador de gasto (anulador [nullifier]) puede aparecer dos veces, cada estado de árbol referenciado debe ser uno que el sistema haya alcanzado realmente y cada firma debe verificarse. Los teoremas cuantifican entonces sobre **cada registro válido**. Esa expresión, «cada registro válido», es el punto central: no una muestra, sino todos ellos, un superconjunto de cualquier cosa que un atacante real pudiera llegar a construir.

El resultado de integridad del saldo se compone de varios teoremas a nivel de registro, cada uno demostrando que una vía de falsificación está cerrada: que cada gasto corresponde a una salida real anterior, que el valor total se conserva, que una nota [note] recibida sigue siendo gastable y no puede ser robada, y que gastar requiere autorización adecuada. Una pieza independiente, la **firma vinculante**, conecta los valores ocultos de cada transacción con la cantidad pública que declara, para que la contabilidad oculta y pública no pueda discrepar silenciosamente.

---

## 5. Donde las matemáticas se encuentran con el software

Una pregunta sutil y honesta: la prueba trata sobre un modelo matemático, pero la red ejecuta código de Rust. ¿Cómo sabemos que el código coincide con el modelo?

El equipo trazó un límite cuidadoso que denomina la **huella** del verificador. Por encima del límite, las pruebas de Lean razonan sobre el verificador como un objeto matemático preciso. Por debajo se encuentra la implementación ordinaria de Rust. El argumento clave es el mismo de la Parte 2:

> Cualquier forma en que el software real pudiera desviarse del modelo demostrado sería un error de *implementación*, y los errores de implementación solo pueden producir falsificación *detectable*, porque cada prueba aceptada queda registrada permanentemente y puede reproducirse con software corregido.

Así, la prueba aborda la clase indetectable —la especificación— y el registro público permanente aborda la clase detectable —la implementación—. Entre ambas, no hay lugar donde pueda ocultarse un error de falsificación *indetectable*. El equipo también realizó una comprobación cruzada ejecutando el verificador real y confirmando que reproduce la huella exactamente en casos capturados.

---

## 6. La advertencia más importante: «bajo supuestos declarados»

La Parte 1 insistió en que una prueba garantiza que el sistema cumple la especificación *bajo supuestos declarados*, y nunca significa «ningún error jamás». El equipo de Zcash fue admirablemente preciso al respecto, y una redacción educativa honesta también debe serlo.

La prueba reduce la seguridad de Ironwood a un pequeño conjunto de supuestos estándar y claramente nombrados. En particular, su solidez se basa en la dificultad del **problema del logaritmo discreto** en la curva elíptica que utiliza Ironwood —un supuesto bien estudiado, para el cual el mejor ataque conocido requeriría del orden de `2^126` operaciones, muy por encima de cualquier cálculo viable—, junto con supuestos estándar de modelado para la función hash. Conviene expresar claramente dos límites:

- **Se mantiene bajo esos supuestos criptográficos.** Si se quebrara un supuesto fundamental, la garantía dejaría de aplicarse. Esto es estándar e inevitable; prácticamente toda la criptografía desplegada se basa en tales supuestos.
- **Cubre la integridad del saldo, no la privacidad [privacy].** La prueba trata sobre la solidez del suministro —sin dinero falso—. **No** afirma demostrar las garantías independientes de privacidad del pool, que son una propiedad distinta con argumentos diferentes.

Lejos de debilitar el logro, nombrar estos límites es lo que lo hace confiable. La afirmación es exacta: *bajo supuestos criptográficos estándar, este pool no puede crear monedas falsificadas indetectables.* Es un teorema, no una esperanza, y su alcance preciso se declara abiertamente.

![alt text](image-4.png)

---

## 7. Retirar el antiguo pool de forma segura: el turnstile

Demostrar que el pool *nuevo* es sólido aún deja una pregunta: ¿qué ocurre con el pool antiguo de Orchard, donde el defecto existió durante cuatro años? No se puede desocultar su pasado. Pero sí se puede limitar su futuro.

Zcash introdujo un mecanismo llamado **turnstile**. La regla es sencilla y poderosa:

> El valor solo puede salir del antiguo pool hasta la cantidad que haya entrado verificablemente en él.

Como el dinero que entra y sale de un pool blindado es públicamente visible —solo la actividad *dentro* está oculta—, el turnstile permite que toda la red compruebe que no salga más de lo que entró jamás. Si se hubieran creado monedas falsificadas dentro del antiguo pool, alcanzarían este límite y no lograrían salir. Y a medida que los fondos honestos migren hacia fuera sin que aparezca ningún exceso, la comunidad obtiene sólida evidencia pública de que el defecto nunca fue explotado. Es lo más parecido a auditar el suministro de un pool privado sin quebrantar su privacidad, y acerca la integridad del suministro al modelo transparente de una cadena [chain] como Bitcoin, mientras preserva la privacidad de Zcash.

![alt text](image-5.png)

Ironwood reutiliza el circuito de prueba *corregido*, comienza de nuevo con un pool vacío y añade protecciones orientadas al futuro —incluidas disposiciones para que los fondos puedan seguir siendo recuperables si las futuras computadoras cuánticas alguna vez amenazan la criptografía actual—. La nueva actividad blindada ahora fluye por Ironwood, mientras que el antiguo pool de Orchard queda restringido a retiros.

---

## 8. La visión general: criptografía de alta garantía

Ironwood forma parte de un cambio más amplio en la manera en que Zcash construye. Su esfuerzo de escalabilidad [scaling] de próxima generación —una arquitectura llamada **Tachyon**, basada en pruebas recursivas y en un conjunto de herramientas llamado **Ragu**— se desarrolla bajo una filosofía a veces llamada **criptografía de alta garantía**: tratar la verificación formal comprobada por máquina no como una ocurrencia tardía, sino como una parte estándar del lanzamiento de sistemas criptográficos novedosos.

La lógica es convincente. La criptografía de vanguardia es precisamente donde la intuición humana es más débil y donde un caso límite sutil y no probado puede ocultarse durante años, como mostró Orchard. Demostrar la especificación es la única técnica que se extiende a «todas las entradas posibles» y cierra esas brechas por construcción. El equipo ha señalado que pretende ampliar este escrutinio con el tiempo, hacia la implementación y más allá. Es de esperar que este estándar se adopte más ampliamente, dentro y fuera de Zcash.

---

## 9. Una aclaración honesta

Simplificamos para aportar claridad. El desarrollo real en Lean es mucho más detallado que el esquema presentado aquí, con definiciones precisas de acciones, afirmaciones, compromisos [commitment], anuladores y firmas; «integridad del saldo» y «solidez del conocimiento» tienen definiciones formales exactas que expresamos solo con palabras; la reducción a la dificultad del logaritmo discreto pasa por varios modelos intermedios —un modelo algebraico del demostrador y un modelo de oráculo aleatorio del hash— que comprimimos en «supuestos estándar»; y describimos la huella y el turnstile a nivel conceptual. Nada de esto cambia la historia esencial: una especificación de «sin falsificación», una prueba verificada por una máquina sobre todos los registros válidos, una declaración explícita y honesta del alcance y los supuestos, y un retiro seguro del pool defectuoso. Para consultar la explicación autorizada, revisa los informes de verificación publicados por el Proyecto Tachyon y el repositorio de pruebas `ironwood`.

---

## 10. Resumen

- Zcash respondió al error de Orchard no solo con un parche, sino con una **prueba verificada por una máquina** —más de **2.700 teoremas** en **Lean**, disponibles públicamente— para su nuevo pool **Ironwood**.
- La prueba establece la **integridad del saldo** —el pool nunca paga más de lo que entró públicamente en él—, basada en la **solidez del conocimiento** —una prueba válida requiere que el demostrador posea realmente un testigo genuino, verificado mediante un **extractor**—. La solidez del conocimiento es exactamente la propiedad cuya brecha era el error de Orchard.
- Razona sobre **cada registro válido**, no sobre casos muestreados, lo cual cierra la clase de errores de falsificación oculta que las pruebas no detectaron.
- La brecha entre matemáticas y software se aborda mediante un límite de **huella**: los errores indetectables quedan descartados por la prueba, y cualquier desviación de implementación sería **detectable** en el registro público permanente.
- La garantía se declara con precisión: se mantiene bajo la **dificultad del logaritmo discreto y supuestos hash estándar**, y cubre la **falsificación, no la privacidad**. Esta honestidad es una característica, no una debilidad.
- El **turnstile** retira de forma segura el antiguo pool al limitar sus salidas a sus depósitos verificables, exponiendo cualquier falsificación y generando evidencia pública de integridad del suministro.
- Ironwood refleja un movimiento hacia la **criptografía de alta garantía**, donde la verificación formal es una parte estándar de la construcción de dinero criptográfico novedoso.

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Ironwood** | El nuevo pool blindado de Zcash (2026), que reemplaza el pool defectuoso Orchard |
| **Balance integrity** | El pool nunca paga más valor del que entró públicamente en él |
| **Knowledge soundness** | Una prueba válida exige que el demostrador posea un testigo genuino |
| **Extractor** | Un procedimiento que extrae el testigo de cualquier demostrador convincente |
| **Lean** | El asistente de pruebas usado para verificar la demostración mediante una máquina |
| **ValidLedger** | El modelo formal de las reglas de consenso sobre el que razonan los teoremas |
| **Fingerprint** | El límite entre las matemáticas demostradas y el software de Rust en ejecución |
| **Under stated assumptions** | La prueba se mantiene siempre que se mantengan los supuestos criptográficos nombrados |
| **Turnstile** | Una regla que limita las salidas de un pool a sus depósitos verificables |
| **High-assurance cryptography** | Construir criptografía con verificación formal como paso estándar |

---

## Preguntas frecuentes

**¿La prueba significa que Ironwood no tiene errores?**
No, y no afirma eso. Demuestra una propiedad precisa, la integridad del saldo, bajo supuestos declarados. Eso descarta la falsificación indetectable, no todo error imaginable.

**¿La prueba garantiza que mis transacciones son privadas?**
No. La verificación cubre la solidez del suministro —sin dinero falso—, no las garantías de privacidad independientes del pool. Estas se argumentan de forma distinta.

**¿Por qué confiar en una prueba escrita por humanos (y por IA)?**
Porque está verificada por una máquina. El asistente de pruebas Lean comprueba mecánicamente cada paso, por lo que la confianza se basa en la especificación y en los supuestos nombrados, no en el cuidado de un humano o de una IA en cada paso.

**¿Qué sucede con las monedas que siguen en el antiguo pool de Orchard?**
Pueden retirarse, pero solo hasta la cantidad que entró verificablemente, aplicada por el turnstile. Esto protege la integridad del suministro y ayuda a demostrar que el antiguo defecto nunca fue explotado.

**¿Es este el final de la historia?**
Es un hito, no una meta final. La arquitectura futura de Zcash —Tachyon, con el conjunto de herramientas Ragu— se está construyendo con la verificación formal como práctica estándar, extendiendo este enfoque aún más.

---

### Pon a prueba tu intuición

Alguien afirma: «Como Ironwood está verificado formalmente, ahora es imposible que algo salga mal alguna vez con Zcash». Usando ideas de las tres partes, da dos razones distintas por las que esa afirmación es demasiado fuerte. *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

Primero, la prueba cubre una propiedad *específica* —la integridad del saldo— bajo *supuestos declarados* —la dificultad del logaritmo discreto y el modelado hash estándar—. Si se quebrara un supuesto criptográfico, o si surgiera un problema fuera de lo especificado —por ejemplo, en la privacidad, en el software de billetera o en algún componente no demostrado—, la prueba no dice nada al respecto. Segundo, la verificación formal garantiza que el sistema cumple *la especificación que se escribió*; si esa especificación no capturara algún requisito real, la prueba certificaría fielmente lo equivocado. Ambos puntos reformulan la advertencia de la Parte 1: una prueba es exacta y limitada, poderosa precisamente porque su alcance es honesto, no una garantía general de que nada pueda salir mal jamás.
</details>

---

### La serie completa

A lo largo de tres partes pasamos de una idea general a una aplicación en funcionamiento: qué significa **demostrar** que un software es correcto en lugar de probarlo (Parte 1), cómo un circuito real con restricciones insuficientes podría haber acuñado dinero invisible (Parte 2), y cómo una prueba verificada por una máquina de **integridad del saldo** retiró para siempre esa clase de error (Parte 3). El hilo conductor es una única promesa honesta: no «ningún error jamás», sino «esta propiedad precisa se mantiene en todos los casos, bajo supuestos declarados». Para un dinero que oculta sus propias cantidades, esa es exactamente la promesa que vale la pena demostrar.

*Parte de la serie* Formal Verification *para [ZecHub](https://zechub.org).*
