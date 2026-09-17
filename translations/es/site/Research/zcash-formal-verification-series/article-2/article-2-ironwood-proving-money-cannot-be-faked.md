![alt text](image-1.png)
# Ironwood: Demostrar que el dinero no puede falsificarse

### Cómo Zcash respondió a un error con una prueba verificada por máquina

> **Serie:** *Verificación formal* · **Parte 3 de 3**
> **Audiencia:** principiantes. Las partes 1 y 2 presentan la verificación formal y el error de Orchard; este final muestra cómo ambas ideas se encuentran en un sistema real. Recordaremos todo lo necesario a medida que avancemos.
> **Con qué te quedarás:** una comprensión precisa de lo que Zcash demostró realmente sobre su nuevo pool «Ironwood», cómo está estructurada la prueba, qué cubre y qué no, cómo se retiró de forma segura el pool antiguo y por qué esto apunta a un nuevo estándar para crear dinero criptográfico.

En la Parte 1 aprendimos qué significa *demostrar* que un sistema es correcto. En la Parte 2 vimos un fallo real que las pruebas no detectaron durante cuatro años: una multiplicación de curva elíptica con restricciones insuficientes que podría haber permitido falsificación invisible e ilimitada. Este artículo es la resolución: cómo Zcash respondió no solo con un parche, sino con una prueba verificada por máquina de que toda esta clase de error ha desaparecido.

---

## 1. ¿Por qué debería importarte?

Cuando un error amenaza el dinero, la respuesta habitual es parchearlo y seguir adelante. Zcash hizo algo más ambicioso. Junto con un nuevo pool blindado llamado **Ironwood**, activado el 28 de julio de 2026, sus ingenieros publicaron una **prueba matemática verificada por máquina**, con más de **2.700 teoremas** escritos en el asistente de pruebas **Lean**, que establece que el nuevo pool no puede crear monedas falsificadas bajo sus supuestos declarados. La prueba es pública, está en el repositorio de código abierto de `ironwood`, y requirió más de un mes de trabajo de tres equipos de investigadores y criptógrafos.

Esto importa más allá de Zcash. Es una de las demostraciones más claras en el mundo real de que se puede tomar un sistema financiero activo, definir con precisión qué significa «sin falsificación» y *demostrarlo*, en lugar de esperar que las pruebas hayan sido exhaustivas. Convierte una promesa en un teorema.

---

## 2. La idea central: demostrar la especificación, eliminar la clase de error

La Parte 2 terminó con la idea que hizo esto posible. Recuérdala, porque todo aquí se basa en ella:

> Un error de falsificación *indetectable* solo puede residir en la **especificación** del protocolo, la descripción matemática de lo que el circuito debe imponer. Cualquier cosa detectable aparecería en la contabilidad pública. Por tanto, demostrar que la especificación es sólida elimina de una vez toda la clase de errores de falsificación oculta.

¿Por qué «solo en la especificación»? Porque cada bloque registra permanentemente el contenido completo de cada transacción, incluidas sus pruebas. Si el *software* aceptara erróneamente una transacción inválida, cualquiera podría reproducir el historial con software corregido y detectarlo. Esa evidencia es permanente y pública. Solo un fallo en las *matemáticas* subyacentes puede ocultarse para siempre, porque no existe una «versión correcta» con la cual reproducirlo. Ese es el fallo al que apunta la verificación formal.

Las pruebas comprueban el *comportamiento en entradas muestreadas*, y el error de Orchard se ocultó precisamente porque ninguna entrada muestreada lo activó. Una prueba sobre la especificación cubre **todas** las entradas simultáneamente, incluidos los casos límite que nadie pensaría probar. Ese es el único tipo de garantía suficientemente fuerte para retirar con confianza un fallo invisible de cuatro años.

![alt text](image-2.png)

---

## 3. Qué se demostró exactamente

La prueba establece una única propiedad principal, construida sobre otra más profunda.

### Integridad del balance (la propiedad principal)

> **Integridad del balance:** el valor oculto almacenado en el pool blindado nunca excede el valor público neto que ha entrado en él.

Esta es la propiedad antifalsificación expresada de forma sencilla. El dinero puede entrar en el pool blindado (visiblemente de forma pública) y salir de él (también de forma pública), pero dentro, donde los importes están ocultos, no se puede crear valor de la nada. Veámoslo con un pequeño libro mayor (aritmética verificada):

- **Transacción honesta:** entradas por valor de `5 + 3 = 8` producen salidas por valor de `4 + 4 = 8`. El valor que entra equivale al que sale. La integridad del balance se mantiene. ✓
- **Un intento de falsificación:** las mismas entradas por valor de `8`, pero salidas de `4 + 4 + 2 = 10`. Eso acuñaría `2` unidades de la nada. La integridad del balance **prohíbe** esto: el pool nunca puede pagar más de lo que ha recibido. ✗

La integridad del balance es la afirmación matemática de que el segundo escenario nunca puede producir una transacción válida.

### Solidez del conocimiento (el motor subyacente)

Para garantizar la integridad del balance, los investigadores primero tuvieron que demostrar una propiedad más profunda y sutil sobre el propio sistema de pruebas de conocimiento cero. La solidez ordinaria («solo las afirmaciones verdaderas tienen un testigo», como en la Parte 2) resulta ser *insuficiente* para un pool blindado, por una razón fascinante: dado que una transacción oculta puede contener cualquier cosa, casi toda afirmación técnicamente *tiene* algún testigo. Por ello, los investigadores demostraron una propiedad más fuerte:

> **Solidez del conocimiento:** cualquiera que pueda producir una prueba de transacción válida debe *poseer realmente* un testigo válido, es decir, monedas reales, correctamente derivadas y en la dirección correcta.

La herramienta formal para ello es un **extractor**: un procedimiento que, dado cualquier probador capaz de convencer al verificador, puede extraer de él el testigo real. Si siempre se puede extraer un testigo, entonces el probador convincente realmente debía tener uno. En el lenguaje de la Parte 2, la solidez del conocimiento es la promesa formal de que **no existe una brecha de solidez**, ninguna restricción ausente que permita colarse a una afirmación falsa. Es exactamente la propiedad cuya *ausencia* constituía el error de Orchard. Demostrar que está presente, para todos los probadores posibles, cierra esa puerta de golpe.

![alt text](image-3.png)

---

## 4. Cómo se construyó la prueba

La verificación requirió un serio esfuerzo humano, no fue el resultado de pulsar un botón:

- Escrita en el asistente de pruebas **Lean** (de la Parte 1: una máquina que comprueba cada paso lógico).
- Consta de **más de 2.700 teoremas**, disponibles públicamente en el repositorio de `ironwood`.
- Fue producida por **tres equipos** de investigadores y criptógrafos durante **más de un mes**, incluido trabajo liderado por Tal Derei de Project Tachyon, con contribuciones de Gregor Mitscha-Baude de zkSecurity y Daira-Emma Hopwood del Open Development Lab de Zcash, además de una prueba independiente y paralela de solidez por otros criptógrafos.

Para razonar sobre esta propiedad, el modelo de Lean describe un **libro mayor** completo como una lista de transacciones, cada una con sus acciones, su valor público declarado y sus firmas. Un predicado que los investigadores llaman **ValidLedger** transcribe directamente las reglas de consenso de la red: el testigo de cada acción debe satisfacer las condiciones exigidas, ningún marcador de gasto (nullifier) puede aparecer dos veces, cada estado de árbol referido debe ser uno que el sistema haya alcanzado realmente y cada firma debe verificarse. Los teoremas cuantifican entonces sobre **cada libro mayor válido**. Esa expresión, «cada libro mayor válido», es el punto central: no una muestra, sino todos ellos; un superconjunto de cualquier cosa que un atacante real pudiera ensamblar.

El resultado de integridad del balance se compone de varios teoremas a nivel de libro mayor, cada uno demostrando que una ruta hacia la falsificación está cerrada: que cada gasto corresponde a una salida real anterior, que el valor total se conserva, que una nota recibida sigue siendo gastable y no puede ser robada, y que gastar exige la autorización adecuada. Una pieza separada, la **firma vinculante**, enlaza los valores ocultos de cada transacción con el importe público que declara, de modo que la contabilidad oculta y la pública no puedan discrepar silenciosamente.

---

## 5. Donde las matemáticas se encuentran con el software

Una pregunta sutil y honesta: la prueba trata sobre un modelo matemático, pero la red ejecuta *código Rust*. ¿Cómo sabemos que el código coincide con el modelo?

El equipo trazó un límite cuidadoso al que llama la **huella** del verificador. Por encima de este límite, las pruebas de Lean razonan sobre el verificador como un objeto matemático preciso. Por debajo se encuentra la implementación habitual en Rust. El argumento clave es el mismo de la Parte 2:

> Cualquier manera en que el software real pudiera desviarse del modelo demostrado sería un error de *implementación*, y los errores de implementación solo pueden producir falsificación *detectable*, porque cada prueba aceptada queda registrada permanentemente y puede reproducirse con software corregido.

Así, la prueba aborda la clase indetectable (la especificación), y el registro público permanente aborda la clase detectable (la implementación). Entre ambas, no queda lugar donde pueda esconderse un error de falsificación *indetectable*. El equipo también realizó una comprobación cruzada ejecutando el verificador real y confirmando que reproduce exactamente la huella en casos capturados.

---

## 6. La advertencia más importante: «bajo los supuestos declarados»

La Parte 1 insistió en que una prueba garantiza que el sistema cumple la especificación *bajo los supuestos declarados*, y nunca significa «nunca habrá errores». El equipo de Zcash fue admirablemente preciso sobre esto, y una redacción educativa honesta también debe serlo.

La prueba reduce la seguridad de Ironwood a un pequeño conjunto de supuestos estándar, claramente nombrados. En particular, su solidez descansa en la dificultad del **problema del logaritmo discreto** en la curva elíptica que usa Ironwood (un supuesto bien estudiado, cuyo mejor ataque conocido requeriría del orden de `2^126` operaciones, mucho más allá de cualquier cálculo viable), junto con supuestos de modelado estándar para la función hash. Merece la pena expresar claramente dos límites:

- **Se cumple bajo esos supuestos criptográficos.** Si se rompiera un supuesto fundamental, la garantía dejaría de aplicarse. Esto es estándar e inevitable; prácticamente toda la criptografía desplegada se apoya en tales supuestos.
- **Cubre la integridad del balance, no la privacidad.** La prueba trata sobre la solidez del suministro (sin dinero falso). **No** pretende demostrar las garantías independientes de privacidad del pool, que son una propiedad diferente con argumentos distintos.

Lejos de debilitar el logro, nombrar estos límites es lo que lo hace confiable. La afirmación es exacta: *bajo supuestos criptográficos estándar, este pool no puede crear monedas falsificadas indetectables*. Es un teorema, no una esperanza, y su alcance preciso se declara abiertamente.

![alt text](image-4.png)

---

## 7. Retirar el pool antiguo de forma segura: el torniquete

Demostrar que el pool *nuevo* es sólido deja otra pregunta: ¿qué ocurre con el pool antiguo de Orchard, donde el fallo existió durante cuatro años? No se puede volver visible su pasado. Pero sí se puede limitar su futuro.

Zcash introdujo un mecanismo llamado el **torniquete**. La regla es simple y poderosa:

> El valor solo puede salir del pool antiguo hasta la cantidad que entró en él de forma verificable.

Dado que el dinero que entra y sale de un pool blindado es visible públicamente (solo la actividad *dentro* permanece oculta), el torniquete permite que toda la red compruebe que no sale más de lo que nunca entró. Si se hubieran creado monedas falsificadas dentro del pool antiguo, alcanzarían este límite y no podrían salir. Y a medida que los fondos honestos migran fuera y no aparece ningún excedente, la comunidad obtiene una sólida evidencia pública de que el fallo nunca se explotó. Es lo más parecido a auditar el suministro de un pool privado sin romper su privacidad, y acerca la integridad del suministro al modelo transparente de una cadena como Bitcoin, mientras preserva la privacidad de Zcash.

![alt text](image-5.png)

Ironwood reutiliza el circuito de prueba *corregido*, comienza desde cero con un pool vacío y añade protecciones orientadas al futuro (incluidas disposiciones para que los fondos pudieran seguir siendo recuperables si los futuros ordenadores cuánticos llegaran a amenazar la criptografía actual). La nueva actividad blindada ahora fluye por Ironwood, mientras que el pool antiguo de Orchard queda restringido a retiros.

---

## 8. El panorama general: criptografía de alta garantía

Ironwood forma parte de un cambio más amplio en la forma en que construye Zcash. Su esfuerzo de escalabilidad de próxima generación (una arquitectura llamada **Tachyon**, construida sobre pruebas recursivas y un conjunto de herramientas llamado **Ragu**) se está desarrollando bajo una filosofía a veces llamada **criptografía de alta garantía**: tratar la verificación formal comprobada por máquina no como una ocurrencia tardía, sino como una parte estándar de lanzar sistemas criptográficos novedosos.

La lógica es convincente. La criptografía de vanguardia es precisamente donde la intuición humana es más débil y donde un caso límite sutil, sin probar, puede ocultarse durante años, como mostró Orchard. Demostrar la especificación es la única técnica que escala a «todas las entradas posibles» y cierra esas brechas por construcción. El equipo ha indicado que pretende extender este escrutinio más allá con el tiempo, hacia la implementación y aún más. Cabe esperar que este estándar sea adoptado más ampliamente, dentro y fuera de Zcash.

---

## 9. Una advertencia honesta

Simplificamos para mayor claridad. El desarrollo real en Lean es mucho más detallado que el esquema presentado aquí, con definiciones precisas de acciones, afirmaciones, compromisos, nullifiers y firmas; «integridad del balance» y «solidez del conocimiento» tienen definiciones formales exactas que aquí solo expresamos con palabras; la reducción a la dificultad del logaritmo discreto pasa por varios modelos intermedios (un modelo algebraico del probador y un modelo de oráculo aleatorio del hash) que comprimimos en «supuestos estándar»; y describimos la huella y el torniquete a nivel conceptual. Nada de esto cambia la historia esencial: una especificación de «sin falsificación», una prueba verificada por máquina sobre todos los libros mayores válidos, una declaración explícita y honesta del alcance y los supuestos, y un retiro seguro del pool defectuoso. Para la explicación autorizada, consulta los informes de verificación publicados por Project Tachyon y el repositorio de pruebas de `ironwood`.

---

## 10. Resumen

- Zcash respondió al error de Orchard no solo con un parche, sino con una **prueba verificada por máquina** (más de **2.700 teoremas** en **Lean**, disponibles públicamente) para su nuevo pool **Ironwood**.
- La prueba establece la **integridad del balance** (el pool nunca paga más de lo que entró públicamente), basada en la **solidez del conocimiento** (una prueba válida exige que el probador posea realmente un testigo genuino, comprobado mediante un **extractor**). La solidez del conocimiento es exactamente la propiedad cuya brecha constituía el error de Orchard.
- Razona sobre **cada libro mayor válido**, no sobre casos muestreados, que es lo que cierra la clase de error de falsificación oculta que las pruebas no detectaron.
- La brecha entre matemáticas y software se aborda mediante un límite de **huella**: la prueba descarta los errores indetectables, y cualquier desviación de implementación sería **detectable** en el registro público permanente.
- La garantía se declara con precisión: se sostiene bajo la **dificultad del logaritmo discreto y supuestos estándar sobre hash**, y cubre la **falsificación, no la privacidad**. Esta honestidad es una virtud, no una debilidad.
- El **torniquete** retira de forma segura el pool antiguo al limitar sus salidas a sus depósitos verificables, exponiendo cualquier falsificación y construyendo evidencia pública de integridad del suministro.
- Ironwood refleja un avance hacia la **criptografía de alta garantía**, donde la verificación formal es una parte estándar de crear dinero criptográfico novedoso.

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Ironwood** | El nuevo pool blindado de Zcash (2026), que reemplaza el pool defectuoso de Orchard |
| **Integridad del balance** | El pool nunca paga más valor del que entró públicamente |
| **Solidez del conocimiento** | Una prueba válida exige que el probador posea un testigo genuino |
| **Extractor** | Un procedimiento que extrae el testigo de cualquier probador convincente |
| **Lean** | El asistente de pruebas utilizado para comprobar la verificación por máquina |
| **ValidLedger** | El modelo formal de las reglas de consenso sobre el que razonan los teoremas |
| **Huella** | El límite entre las matemáticas demostradas y el software Rust en ejecución |
| **Bajo los supuestos declarados** | La prueba se cumple siempre que se cumplan los supuestos criptográficos nombrados |
| **Torniquete** | Una regla que limita las salidas de un pool a sus depósitos verificables |
| **Criptografía de alta garantía** | Crear criptografía con verificación formal como un paso estándar |

---

## Preguntas frecuentes

**¿La prueba significa que Ironwood no tiene errores?**
No, y no pretende afirmarlo. Demuestra una propiedad precisa, la integridad del balance, bajo los supuestos declarados. Eso descarta la falsificación indetectable, no todos los errores concebibles.

**¿La prueba garantiza que mis transacciones sean privadas?**
No. La verificación cubre la solidez del suministro (sin dinero falso), no las garantías independientes de privacidad del pool. Estas se argumentan de otra manera.

**¿Por qué confiar en una prueba escrita por humanos (y por IA)?**
Porque está verificada por máquina. El asistente de pruebas Lean comprueba mecánicamente cada paso, de modo que la confianza se basa en la especificación y los supuestos nombrados, no en el cuidado de un humano o una IA en cada paso.

**¿Qué ocurre con las monedas que siguen en el antiguo pool de Orchard?**
Pueden retirarse, pero solo hasta la cantidad que entró de forma verificable, según impone el torniquete. Esto protege la integridad del suministro y ayuda a demostrar que el antiguo fallo nunca fue explotado.

**¿Es este el final de la historia?**
Es un hito, no una línea de meta. La arquitectura futura de Zcash (Tachyon, con el conjunto de herramientas Ragu) se está creando con la verificación formal como práctica estándar, extendiendo más este enfoque.

---

### Pon a prueba tu intuición

Alguien afirma: «Puesto que Ironwood está verificado formalmente, ahora es imposible que algo salga mal alguna vez con Zcash». Usando ideas de las tres partes, da dos razones distintas por las que esa afirmación es demasiado fuerte. *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

Primero, la prueba cubre una propiedad *específica* (integridad del balance) bajo *supuestos declarados* (dificultad del logaritmo discreto y modelado estándar de hash). Si se rompiera un supuesto criptográfico o surgiera un problema fuera de lo especificado (por ejemplo, en la privacidad, en el software de wallet o en algún componente no demostrado), la prueba no dice nada al respecto. Segundo, la verificación formal garantiza que el sistema cumple *la especificación que se escribió*; si esa especificación no capturara algún requisito real, la prueba certificaría fielmente algo equivocado. Ambos puntos reformulan la advertencia de la Parte 1: una prueba es exacta y acotada, potente precisamente porque su alcance es honesto, no una garantía general de que nunca pueda salir nada mal.
</details>

---

### La serie completa

A lo largo de tres partes pasamos de una idea general a una aplicación activa: qué significa **demostrar** que el software es correcto en lugar de probarlo (Parte 1), cómo un circuito real con restricciones insuficientes podría haber acuñado dinero invisible (Parte 2), y cómo una prueba verificada por máquina de la **integridad del balance** retiró definitivamente esa clase de error (Parte 3). El hilo conductor es una única promesa honesta: no «nunca habrá errores», sino «esta propiedad precisa se cumple en todos los casos, bajo los supuestos declarados». Para dinero que oculta sus propios importes, esa promesa es exactamente la que vale la pena demostrar.

*Parte de la* serie de Verificación formal *para [ZecHub](https://zechub.org).*
