![alt text](image-1.png)
# El bug de Orchard: cuando un sistema de pruebas tiene una brecha

### Cómo una línea de matemáticas con restricciones insuficientes podría haber acuñado dinero invisible ilimitado

> **Serie:** *Serie de verificación formal* · **Parte 2 de 3**
> **Público:** personas recién llegadas. La parte 1 presentó la verificación formal; aquí conocemos el verdadero bug que la volvió urgente. Todo lo necesario se explica desde cero.
> **Con qué te quedarás:** una imagen intuitiva pero precisa de cómo un sistema de pruebas criptográficas puede contener una brecha de solidez, qué fue exactamente el bug "Orchard" de Zcash, por qué esta clase de bug puede permanecer oculta durante años y por qué ya ha ocurrido antes.

En la parte 1 dijimos que las pruebas pueden mostrar la presencia de bugs, pero nunca su ausencia, y que los bugs más peligrosos viven en la *especificación* de un sistema, sus matemáticas subyacentes. Este artículo es el estudio de caso. En 2026 se encontró un fallo en el pool blindado Orchard de Zcash que podría haber permitido a un atacante crear dinero falsificado ilimitado de forma invisible. Había sobrevivido cuatro años y auditorías repetidas. Comprenderlo, y comprender sus predecesores, es la motivación más clara posible para demostrar que los sistemas son correctos.

---

## 1. ¿Por qué debería importarte?

Zcash es una criptomoneda con un modo privado. En su pool blindado, los importes, los remitentes y los receptores de las transacciones están **ocultos**. Esta privacidad se crea mediante **pruebas de conocimiento cero**: pruebas criptográficas que demuestran que una transacción cumple todas las reglas sin revelar su contenido.

Ese diseño tiene una doble cara. En un libro mayor transparente como el de Bitcoin, si alguien creara monedas de la nada, las cifras infladas serían visibles para todos, y la red podría detectarlo y revertirlo. En un pool blindado, las cifras se ocultan por diseño. Por lo tanto, si el propio sistema de pruebas tuviera un fallo que permitiera que una transacción inválida pareciera válida, la falsificación sería **indetectable**. No podrías detectarla inspeccionando el libro mayor, porque este es deliberadamente opaco.

Ese es exactamente el riesgo que se materializó en Orchard. Para entenderlo, debemos observar qué está comprobando realmente una prueba de conocimiento cero.

---

## 2. La intuición: una prueba solo es tan buena como su lista de verificación

Imagina a un agente fronterizo que debe aprobar a viajeros sin ver directamente sus documentos. En su lugar, cada viajero completa una **lista de verificación**, y el agente aprueba a cualquiera cuya lista esté completamente marcada. La lista está diseñada para que *solo un viajero legítimo pueda marcar todas las casillas.*

Ahora supón que a la lista le falta una casilla crucial, por ejemplo, «el pasaporte no está caducado». Casi todo el mundo sigue completándola honestamente y nada parece ir mal. Pero una persona con un pasaporte caducado *también* puede marcar todas las casillas restantes y pasar sin problemas. El sistema parece funcionar bien en el uso cotidiano. La brecha solo importa para alguien que la busque.

Una prueba de conocimiento cero funciona como esa lista de verificación. No revela los detalles privados; comprueba que satisfagan un conjunto fijo de condiciones. Y si por accidente se omite una condición necesaria, algunas entradas inválidas *también* pueden pasar, mientras todo sigue pareciendo normal.

Precisemos qué significa «lista de condiciones», porque ahí es exactamente donde estaba el bug.

---

## 3. Las matemáticas: circuitos, restricciones y solidez

Bajo el capó, la afirmación «esta transacción es válida» se codifica como un **circuito**: una colección fija de condiciones aritméticas, llamadas **restricciones**, escritas como ecuaciones sobre números. Para crear una prueba válida, quien prueba debe proporcionar valores secretos (el **testigo**) que satisfagan *todas* las restricciones. La prueba convence a un verificador de que existe tal testigo, sin revelarlo.

La propiedad que necesitamos de este sistema tiene un nombre:

> **Solidez:** debe ser imposible producir una prueba válida para una afirmación *falsa*. Solo las afirmaciones verdaderas deberían tener testigos que satisfagan todas las restricciones.

La solidez es la garantía contra la falsificación. Si se mantiene la solidez, una prueba válida significa realmente «ocurrió una transacción real que cumple las reglas». Si la solidez tiene una brecha, una prueba válida podría no significar nada en absoluto.

### Qué hace una restricción ausente (un ejemplo verificado)

Las restricciones a menudo necesitan forzar que un valor sea simple. Un ejemplo común: forzar que un valor `b` sea un único **bit**, ya sea `0` o `1`. La forma estándar de hacerlo es con una restricción:

```
b × (b − 1) = 0
```

¿Por qué funciona? Un producto es cero solo cuando uno de sus factores es cero. Por lo tanto, `b × (b − 1) = 0` fuerza `b = 0` o `b = 1`, y nada más. Al comprobar cada valor de 0 a 16 (en una aritmética que vuelve a empezar en 17), los *únicos* valores que lo satisfacen son exactamente **0 y 1**. ✓

Ahora imagina que esa línea se **omite accidentalmente** del circuito. De repente, `b` no tiene restricciones. Quien prueba deshonestamente puede establecer `b` en `5`, o `9`, o en cualquier valor, y aun así satisfacer las restricciones restantes. Esa única línea ausente es una **brecha de solidez**: las afirmaciones falsas ahora tienen testigos que las satisfacen.

Esto no es hipotético. Durante el desarrollo se encontró una restricción booleana ausente de exactamente este tipo en el primer diseño blindado de Zcash, Sprout, y se corrigió antes del lanzamiento. La aplicación insuficiente de restricciones es uno de los errores más comunes y peligrosos al construir estos circuitos.

![alt text](image-2.png)

Esta es toda la forma del bug de Orchard, a pequeña escala. Ahora, el caso real.

---

## 4. Qué fue realmente el bug de Orchard

Las pruebas blindadas de Zcash se basan en **curvas elípticas**, objetos matemáticos cuyos puntos pueden combinarse y «multiplicarse» por números, operaciones que el circuito debe imponer mediante restricciones. El circuito contiene componentes que realizan la **multiplicación de curvas elípticas** y comprueban que se haya realizado correctamente.

Según la divulgación de Shielded Labs y del investigador Taylor Hornby, el fallo de Orchard fue precisamente este:

> Un **elemento con restricciones insuficientes del circuito Orchard** hizo posible introducir **entradas falsas arbitrarias en una multiplicación de curva elíptica y aun así hacer que la comprobación de multiplicación pasara.**

En términos sencillos, a la lista de verificación del circuito le faltaban las casillas que deberían haber determinado esa multiplicación. Debido a la brecha, un atacante con suficiente experiencia podía construir una prueba de transacción que el sistema aceptaría aunque la transacción creara valor de la nada. Eso es **falsificación**, y como los importes en el pool blindado están ocultos, habría sido **indetectable** desde el libro mayor. Más tarde, el equipo de Tachyon describió el mismo fallo a nivel de código como líneas ausentes en el circuito que alteraban silenciosamente las ecuaciones subyacentes.

Los paralelismos con nuestra historia de la lista de verificación son exactos:

| Historia de la lista de verificación | El bug de Orchard |
|---|---|
| Falta una casilla de «pasaporte no caducado» | Falta una restricción en una multiplicación de curva elíptica |
| Un viajero con pasaporte caducado pasa de todos modos | Entradas falsas arbitrarias pasan la comprobación de multiplicación |
| Nadie más se ve afectado, así que nada parece ir mal | Las transacciones normales funcionaban perfectamente, ocultando el fallo |
| Solo alguien que lo busca encuentra la brecha | Hizo falta un experto que sondeara deliberadamente las matemáticas del circuito |

Para dejar claro lo grave que fue: el investigador, con ayuda de IA, escribió un *exploit completo y funcional* y confirmó en una red de pruebas local que producía monedas falsificadas ilimitadas e indetectables. Fue un fallo real y explotable, no una preocupación teórica.

---

## 5. Por qué permaneció oculto durante cuatro años

El bug vivió en Orchard desde su activación en **mayo de 2022** hasta la corrección de emergencia en **junio de 2026**, pasando por auditorías profesionales repetidas de algunos de los mejores criptógrafos del mundo. ¿Cómo?

Porque, como advirtió la parte 1, **las pruebas muestrean casos, y este fallo vivía en un caso que nadie muestreó.** Las transacciones ordinarias nunca activaban la restricción ausente, por lo que todas las pruebas pasaban y cada día de operación normal parecía impecable. El fallo solo era accesible construyendo deliberadamente un testigo inusual dirigido directamente a la brecha. Finalmente se encontró no ejecutando pruebas, sino *razonando sobre las matemáticas del circuito*.

El propio descubrimiento es una señal de hacia dónde se dirige la seguridad. En abril de 2026, Shielded Labs contrató al investigador de seguridad **Taylor Hornby** específicamente para buscar exactamente este tipo de fallo. Poco después del lanzamiento de un nuevo modelo de IA de frontera (Claude Opus 4.8 de Anthropic) a finales de mayo de 2026, Hornby lo utilizó, junto con un entorno de análisis personalizado y métodos tradicionales, en una revisión dirigida del circuito Orchard. El **29 de mayo de 2026**, la revisión encontró la vulnerabilidad.

Dos hechos sobrios de la divulgación merecen expresarse claramente:

- El equipo no encontró **ninguna evidencia** de que el bug hubiera sido explotado y considera poco probable una explotación previa (había evadido años de escrutinio experto y fue encontrado mediante un esfuerzo deliberado de sombrero blanco). Pero la propia naturaleza de un fallo *indetectable* implica que el libro mayor por sí solo no puede demostrar por completo que nunca ocurrió.
- El descubrimiento causó una turbulencia significativa, incluida una fuerte caída en el precio del activo, precisamente porque la *posibilidad* de falsificación oculta es tan grave para el dinero.

![alt text](image-3.png)

---

## 6. No fue la primera vez

El bug de Orchard pertenece a una familia recurrente, y ver esa familia es lo que hace que la verificación formal parezca no opcional sino inevitable. Un fallo de falsificación siempre se remonta a una de tres fuentes (la taxonomía de la parte 1): la **especificación** (las propias matemáticas), la **implementación** (código que no sigue matemáticas correctas) o una **suposición rota**. Y, fundamentalmente:

> Un bug de falsificación es **indetectable** solo si vive en la **especificación**. Los bugs de implementación dejan evidencia pública permanente, porque cada bloque registra el contenido completo de cada transacción, de modo que reproducir el historial con software corregido expondría cualquier transacción que el código con el bug hubiera aceptado erróneamente.

La propia historia de Zcash ilustra el patrón:

| Bug (año) | Fuente | ¿Detectable? |
|---|---|---|
| Fallo de compromiso de Zerocash (2016, antes del lanzamiento) | Especificación (un hash truncado rompió una propiedad vinculante) | Indetectable |
| Fallo de solidez de configuración de confianza (2018) | Especificación (un error en el artículo subyacente sobre zk-SNARK) | Indetectable |
| Colisión de consultas del sistema de pruebas (2025) | Especificación (una comprobación ausente en el sistema de pruebas) | Detectable |
| Bug de validación de subgrupo de curva (2016) | Implementación (una comprobación de subgrupo ausente) | Detectable |
| **Multiplicación con restricciones insuficientes de Orchard (2026)** | **Especificación (el circuito)** | **Indetectable** |

El hilo conductor es contundente: los fallos que podrían ocultarse para siempre son los que están en las matemáticas. Esa es precisamente la clase que una prueba de la especificación verificada por máquina puede eliminar, todos los casos a la vez. Las pruebas y las auditorías muestrean; solo demostrar las matemáticas cubre cada entrada.

---

## 7. La respuesta

Los desarrolladores de Zcash actuaron con rapidez y por etapas:

1. **Remediación de emergencia (para el 1-2 de junio de 2026).** A los pocos días de la divulgación, una actualización de emergencia de la red cerró la ventana de vulnerabilidad, añadiendo las restricciones ausentes para que las matemáticas del circuito volvieran a ser sólidas.
2. **Un nuevo comienzo demostrable («Ironwood», activado el 28 de julio de 2026).** En lugar de confiar indefinidamente en una versión parcheada del antiguo pool, la comunidad lanzó un pool blindado completamente nuevo, Ironwood, basado en el circuito corregido pero empezando desde cero y acompañado de una prueba formal de corrección verificada por máquina.

Ese segundo paso es donde la verificación formal entra en la historia, y es el tema de la parte 3. Vale la pena adelantar la comprensión sobre la que actuó el equipo, porque conecta toda esta serie:

> Un fallo de falsificación *indetectable* solo puede vivir en la **especificación** del protocolo. Así que, si puedes **demostrar que la especificación** excluye la falsificación, eliminas toda la clase de bug que permaneció oculta aquí durante cuatro años.

Esa es exactamente la idea del primer pilar de la parte 1: verifica la especificación y cierras la brecha que las pruebas nunca podrían cerrar.

---

## 8. Una advertencia honesta

Simplificamos deliberadamente. El circuito real implica cientos de regiones y muchos miles de restricciones, y el fallo real es técnicamente más intrincado que una única comprobación de bit ausente; usamos la comprobación de bit porque muestra exactamente la *forma* de un circuito con restricciones insuficientes y porque ese error exacto es real en la historia de Zcash. El fallo preciso de Orchard fue una multiplicación de curva elíptica con restricciones insuficientes, como se indica en la divulgación oficial. También comprimimos el cronograma de divulgación y remediación. Para la explicación técnica autorizada, consulta la divulgación de Shielded Labs y los artículos de Project Tachyon.

---

## 9. Resumen

- El pool blindado de Zcash oculta los importes mediante **pruebas de conocimiento cero**, por lo que un fallo en esas pruebas podría permitir una **falsificación invisible**.
- Un sistema de pruebas comprueba un **circuito** fijo de **restricciones**; su propiedad crucial es la **solidez**: solo las afirmaciones verdaderas deberían tener un **testigo** que las satisfaga.
- Una **restricción ausente** crea una **brecha de solidez**, permitiendo que pasen afirmaciones falsas. (Caso de ejemplo verificado: `b(b−1)=0` fuerza `b` a 0 o 1; si se elimina, `b` puede ser cualquier cosa. Esta clase exacta de bug es real en la historia de Zcash.)
- El **bug de Orchard** fue una **multiplicación de curva elíptica con restricciones insuficientes**: entradas falsas arbitrarias podían pasar la comprobación de multiplicación, permitiendo falsificación ilimitada e indetectable. Se demostró un exploit funcional en una red de pruebas.
- Permaneció oculto durante **cuatro años** (de mayo de 2022 a junio de 2026) porque las pruebas muestrean casos y nunca lo muestrearon; se encontró razonando sobre las matemáticas, con ayuda de IA, el 29 de mayo de 2026.
- La falsificación indetectable solo puede vivir en la **especificación**, y Zcash ya ha visto antes esta familia de bugs. Zcash respondió con una corrección de emergencia y un nuevo pool verificado formalmente, **Ironwood**, el tema de la parte 3.

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Shielded pool** | El modo privado de Zcash donde se ocultan los importes y las partes |
| **Zero-knowledge proof** | Una prueba de que una afirmación oculta es válida, sin revelar nada más |
| **Circuit** | El conjunto fijo de condiciones aritméticas que una transacción válida debe satisfacer |
| **Constraint** | Una condición (ecuación) dentro del circuito |
| **Witness** | Los valores secretos que satisfacen las restricciones |
| **Soundness** | La garantía de que solo las afirmaciones verdaderas pueden producir una prueba válida |
| **Soundness gap** | Una restricción ausente que permite que pasen afirmaciones falsas |
| **Under-constrained** | Un circuito al que le falta una condición necesaria, la raíz del bug de Orchard |
| **Detectable / undetectable** | Si la explotación dejaría evidencia en el libro mayor público |

---

## Preguntas frecuentes

**¿Realmente se crearon Zcash falsificados?**
No se encontró evidencia de explotación y el equipo lo considera poco probable. Pero, dado que el fallo habría sido indetectable desde el libro mayor, el libro mayor por sí solo no puede demostrar por completo que nunca ocurrió, por lo que la respuesta fue tan exhaustiva.

**¿Por qué ocultar los importes hace que un bug sea peor?**
En una cadena transparente, las monedas acuñadas son visibles y pueden detectarse y revertirse. Cuando los importes se ocultan por privacidad, un bug de falsificación no produce ninguna anomalía visible, por lo que puede persistir sin ser detectado.

**¿Por qué años de auditorías no lo detectaron?**
Las auditorías y las pruebas examinan principalmente el comportamiento en casos realistas. Este fallo solo surgía con una entrada inusual creada deliberadamente y dirigida a un caso límite matemático, que la revisión rutinaria no activaba. Se encontró mediante razonamiento dirigido sobre el circuito, no mediante pruebas.

**¿De verdad basta una restricción ausente?**
Sí. Un sistema de pruebas solo es tan fuerte como su conjunto completo de restricciones. Basta con omitir una condición necesaria para que las afirmaciones inválidas pasen.

**¿Qué papel desempeñó la IA?**
Un investigador utilizó un modelo de IA de frontera junto con un entorno personalizado y métodos tradicionales para revisar las matemáticas del circuito y encontrar el fallo. La IA se usa cada vez más en ambos lados de la seguridad, lo cual forma parte de por qué ahora es tan importante demostrar que los sistemas son correctos.

---

### Pon a prueba tu intuición

Supón que una transacción blindada debe demostrar «el dinero que entra es igual al dinero que sale», pero el circuito olvida restringir un valor de salida. ¿Qué podría hacer quien prueba deshonestamente y por qué el libro mayor público parecería completamente normal? *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

Con esa salida sin restricciones, quien prueba podría establecerla por encima de lo que permiten las entradas reales, creando valor de la nada: una falsificación. La prueba seguiría verificándose porque la restricción ausente es lo único que habría detectado el desequilibrio. Y como el pool blindado oculta los importes, el libro mayor solo muestra que «ocurrió una transacción válida», sin desequilibrio visible que active una alarma. La falsificación es real pero invisible, que es exactamente por qué la solidez del circuito importa tanto y exactamente por qué debe demostrarse en lugar de probarse.
</details>

---

### Qué sigue

**Parte 3 · Ironwood:** la corrección no fue solo un parche. Los ingenieros de Zcash construyeron un nuevo pool blindado y lo acompañaron con una prueba matemática verificada por máquina, más de 2700 teoremas escritos en el asistente de demostración Lean, de que no puede crear dinero falsificado bajo sus supuestos establecidos. Veremos qué significan la «integridad del balance» y la «solidez del conocimiento», exactamente qué cubre y qué no cubre la prueba, y cómo se retiró de forma segura el antiguo pool.

*Parte de la* serie de verificación formal *para [ZecHub](https://zechub.org).*
