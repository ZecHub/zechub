![alt text](image-1.png)
# El error de Orchard: cuando un sistema de pruebas tiene una brecha

### Cómo una línea matemática con restricciones insuficientes podría haber acuñado dinero invisible ilimitado

> **Serie:** *Serie de verificación formal* · **Parte 2 de 3**
> **Público:** principiantes. La parte 1 presentó la verificación formal; aquí conocemos el error real que la hizo urgente. Todo lo necesario se explica desde cero.
> **Lo que aprenderás:** una imagen intuitiva pero precisa de cómo un sistema de pruebas criptográficas puede contener una brecha de solidez, qué fue exactamente el error «Orchard» de Zcash de 2026, por qué esta clase de error puede ocultarse durante años y por qué ya ha ocurrido antes.

En la parte 1 dijimos que las pruebas pueden mostrar la presencia de errores, pero nunca su ausencia, y que los errores más peligrosos viven en la *especificación* de un sistema, su matemática subyacente. Este artículo es el estudio de caso. En 2026 se encontró un fallo en el pool blindado [shielded pool] de Orchard de Zcash que podría haber permitido a un atacante crear dinero falsificado ilimitado de forma invisible. Había sobrevivido cuatro años y auditorías repetidas. Comprenderlo, así como a sus predecesores, es la motivación más clara posible para demostrar que los sistemas son correctos.

---

## 1. ¿Por qué debería importarte?

Zcash es una criptomoneda con un modo privado. En su pool blindado, los importes, remitentes y destinatarios de las transacciones están **ocultos**. Esta privacidad [privacy] se crea mediante **pruebas zero-knowledge [zero-knowledge proofs]**: pruebas criptográficas de que una transacción cumple todas las reglas, sin revelar su contenido.

Ese diseño tiene un doble filo. En un libro mayor transparente como el de Bitcoin, si alguien hiciera aparecer monedas de la nada, las cifras infladas serían visibles para todos, y la red podría detectarlo y revertirlo. En un pool blindado, las cifras están ocultas por diseño. Por tanto, si el propio sistema de pruebas tuviera un fallo que permitiera que una transacción no válida pareciera válida, la falsificación sería **indetectable**. No podrías detectarla inspeccionando el libro mayor, porque este es deliberadamente opaco.

Ese es exactamente el riesgo que se materializó en Orchard. Para comprenderlo, debemos observar qué comprueba realmente una prueba zero-knowledge.

---

## 2. La intuición: una prueba solo es tan buena como su lista de verificación

Imagina a un agente de fronteras que debe aprobar a viajeros sin ver directamente sus documentos. En su lugar, cada viajero rellena una **lista de verificación**, y el agente aprueba a cualquiera cuya lista esté completamente marcada. La lista está diseñada para que *solo un viajero legítimo pueda marcar todas las casillas.*

Ahora supón que falta una casilla crucial en la lista, por ejemplo, «el pasaporte no está caducado». Casi todo el mundo sigue rellenándola honestamente y nada parece ir mal. Pero una persona con un pasaporte caducado *también* puede marcar todas las casillas restantes y pasar sin obstáculos. El sistema parece funcionar bien en el uso cotidiano. La brecha solo le importa a alguien que la busque.

Una prueba zero-knowledge funciona como esa lista de verificación. No revela los detalles privados; comprueba que satisfacen un conjunto fijo de condiciones. Y si se omite accidentalmente una condición necesaria, algunas entradas no válidas *también* pueden pasar, mientras todo sigue pareciendo normal.

Precisemos qué significa «lista de condiciones», porque ahí es exactamente donde vivía el error.

---

## 3. La matemática: circuitos, restricciones y solidez

Bajo el capó, la afirmación «esta transacción es válida» se codifica como un **circuito [circuit]**: una colección fija de condiciones aritméticas, llamadas **restricciones [constraints]**, escritas como ecuaciones sobre números. Para generar una prueba válida, el probador debe proporcionar valores secretos (el **testigo [witness]**) que satisfagan *cada* restricción. La prueba convence a un verificador de que existe tal testigo, sin revelarlo.

La propiedad que necesitamos de este sistema tiene un nombre:

> **Solidez [Soundness]:** debe ser imposible producir una prueba válida para una afirmación *falsa*. Solo las afirmaciones verdaderas deberían tener testigos que satisfagan todas las restricciones.

La solidez es la garantía contra la falsificación. Si la solidez se mantiene, una prueba válida realmente significa «ocurrió una transacción real que cumple las reglas». Si la solidez tiene una brecha, una prueba válida podría no significar nada en absoluto.

### Qué hace una restricción ausente (un ejemplo verificado)

Las restricciones suelen necesitar forzar que un valor sea simple. Un ejemplo común: forzar que un valor `b` sea un único **bit**, ya sea `0` o `1`. La forma estándar de hacerlo es con una restricción:

```
b × (b − 1) = 0
```

¿Por qué funciona? Un producto es cero solo cuando uno de sus factores es cero. Por tanto, `b × (b − 1) = 0` fuerza `b = 0` o `b = 1`, y nada más. Al comprobar cada valor de 0 a 16 (en una aritmética que vuelve a empezar en 17), los *únicos* valores que lo satisfacen son exactamente **0 y 1**. ✓

Ahora imagina que esa línea se **omite accidentalmente** del circuito. De repente, `b` no tiene restricciones. Un probador deshonesto puede establecer `b` en `5`, o `9`, o cualquier valor, y aun así satisfacer las restricciones restantes. Esa única línea ausente es una **brecha de solidez [soundness gap]**: las afirmaciones falsas ahora tienen testigos satisfactorios.

Esto no es hipotético. Durante el desarrollo se encontró una restricción booleana ausente exactamente de este tipo en el primer diseño blindado de Zcash, Sprout, y se corrigió antes del lanzamiento. Aplicar restricciones insuficientes es uno de los errores más frecuentes y peligrosos al construir estos circuitos.

![alt text](image-2.png)

Esta es toda la forma del error de Orchard, a pequeña escala. Ahora veamos el caso real.

---

## 4. Qué fue realmente el error de Orchard

Las pruebas blindadas de Zcash se construyen sobre **curvas elípticas**, objetos matemáticos cuyos puntos pueden combinarse y «multiplicarse» por números, operaciones que el circuito debe imponer mediante restricciones. El circuito contiene componentes que realizan **multiplicación de curvas elípticas** y comprueban que se hizo correctamente.

Según la divulgación de Shielded Labs y del investigador Taylor Hornby, el fallo de Orchard fue precisamente este:

> Un **elemento con restricciones insuficientes del circuito de Orchard** hizo posible introducir **entradas falsas arbitrarias en una multiplicación de curva elíptica y aun así conseguir que la comprobación de multiplicación pasara.**

En términos sencillos, a la lista de verificación del circuito le faltaban las casillas que debían haber fijado esa multiplicación. Debido a la brecha, un atacante con suficiente experiencia podía construir una prueba de transacción que el sistema aceptaría aunque la transacción creara valor de la nada. Eso es **falsificación**, y dado que los importes del pool blindado están ocultos, habría sido **indetectable** desde el libro mayor. Posteriormente, el equipo de Tachyon describió el mismo fallo a nivel de código como líneas ausentes en el circuito que alteraban silenciosamente las ecuaciones subyacentes.

Los paralelismos con nuestra historia de la lista de verificación son exactos:

| Historia de la lista de verificación | El error de Orchard |
|---|---|
| Falta una casilla de «pasaporte no caducado» | Falta una restricción en una multiplicación de curva elíptica |
| Un viajero con pasaporte caducado pasa de todos modos | Entradas falsas arbitrarias pasan la comprobación de multiplicación |
| Nadie más se ve afectado, por lo que nada parece ir mal | Las transacciones normales funcionaban perfectamente y ocultaban el fallo |
| Solo alguien que la busca encuentra la brecha | Un experto tuvo que examinar deliberadamente la matemática del circuito |

Para dejar clara la gravedad: el investigador, con ayuda de IA, escribió un *exploit funcional completo* y confirmó en una red de prueba local que producía monedas falsificadas ilimitadas e indetectables. Era un fallo real y explotable, no una preocupación teórica.

---

## 5. Por qué permaneció oculto durante cuatro años

El error vivió en Orchard desde su activación en **mayo de 2022** hasta la corrección de emergencia en **junio de 2026**, a través de auditorías profesionales repetidas realizadas por algunos de los mejores criptógrafos del mundo. ¿Cómo?

Porque, como advirtió la parte 1, **las pruebas muestrean casos, y este fallo vivía en un caso que nadie muestreó.** Las transacciones ordinarias nunca ejercitaban la restricción ausente, por lo que todas las pruebas pasaban y cada día de operación normal parecía impecable. El fallo solo podía alcanzarse construyendo deliberadamente un testigo inusual dirigido exactamente a la brecha. Finalmente se encontró no ejecutando pruebas, sino *razonando sobre la matemática del circuito*.

El propio descubrimiento es una señal de hacia dónde se dirige la seguridad. En abril de 2026, Shielded Labs contrató específicamente al investigador de seguridad **Taylor Hornby** para buscar exactamente esta clase de fallo. Poco después de que se lanzara un nuevo modelo de IA de frontera (Claude Opus 4.8 de Anthropic) a finales de mayo de 2026, Hornby lo utilizó, junto con un entorno de análisis personalizado y métodos tradicionales, en una revisión dirigida del circuito de Orchard. El **29 de mayo de 2026**, la revisión encontró la vulnerabilidad.

Conviene expresar claramente dos hechos sobrios de la divulgación:

- El equipo no encontró **ninguna evidencia** de que el error se hubiera explotado y considera improbable una explotación previa (había evadido años de escrutinio experto y se encontró mediante un esfuerzo deliberado de sombrero blanco). Pero la propia naturaleza de un fallo *indetectable* significa que el libro mayor por sí solo no puede demostrar completamente que nunca ocurrió.
- El descubrimiento provocó una agitación considerable, incluida una fuerte caída en el precio del activo, precisamente porque la *posibilidad* de falsificación oculta es muy grave para el dinero.

![alt text](image-3.png)

---

## 6. Esta no fue la primera vez

El error de Orchard pertenece a una familia recurrente, y ver esa familia es lo que hace que la verificación formal parezca no opcional, sino inevitable. Un fallo de falsificación siempre se remonta a una de tres fuentes (la taxonomía de la parte 1): la **especificación** (la propia matemática), la **implementación** (código que no sigue la matemática correcta) o una **suposición rota**. Y, de forma crucial:

> Un error de falsificación es **indetectable** solo si vive en la **especificación**. Los errores de implementación dejan evidencia pública permanente, porque cada bloque registra el contenido completo de cada transacción, de modo que reproducir el historial con software corregido expondría cualquier transacción que el código defectuoso hubiera aceptado erróneamente.

La propia historia de Zcash ilustra el patrón:

| Error (año) | Fuente | ¿Detectable? |
|---|---|---|
| Fallo de compromiso de Zerocash (2016, antes del lanzamiento) | Especificación (un hash truncado rompía una propiedad de vinculación) | Indetectable |
| Fallo de solidez de la configuración confiable (2018) | Especificación (un error en el artículo subyacente de zk-SNARK) | Indetectable |
| Colisión de consultas del sistema de pruebas (2025) | Especificación (una comprobación ausente en el sistema de pruebas) | Detectable |
| Error de validación de subgrupo de curva (2016) | Implementación (una comprobación de subgrupo ausente) | Detectable |
| **Multiplicación con restricciones insuficientes de Orchard (2026)** | **Especificación (el circuito)** | **Indetectable** |

El hilo conductor es contundente: los fallos que podrían ocultarse para siempre son los de la matemática. Esa es precisamente la clase que una prueba de la especificación verificada por máquina puede eliminar, todos los casos a la vez. Las pruebas y las auditorías muestrean; solo demostrar la matemática cubre cada entrada.

---

## 7. La respuesta

Los desarrolladores de Zcash actuaron rápidamente y por etapas:

1. **Corrección de emergencia (para el 1-2 de junio de 2026).** A los pocos días de la divulgación, una actualización de red de emergencia cerró la ventana de vulnerabilidad, añadiendo las restricciones ausentes para que la matemática del circuito volviera a ser sólida.
2. **Un nuevo comienzo demostrable («Ironwood», activado el 28 de julio de 2026).** En lugar de confiar indefinidamente en una versión parcheada del pool antiguo, la comunidad lanzó un pool blindado completamente nuevo, Ironwood, basado en el circuito corregido pero comenzando desde cero y acompañado por una prueba formal de corrección verificada por máquina.

Ese segundo paso es donde la verificación formal entra en la historia, y es el tema de la parte 3. Vale la pena adelantar la conclusión sobre la que actuó el equipo, porque conecta toda esta serie:

> Un fallo de falsificación *indetectable* solo puede vivir en la **especificación** del protocolo. Por tanto, si puedes **demostrar que la especificación** excluye la falsificación, eliminas toda la clase de errores que se ocultó aquí durante cuatro años.

Esa es exactamente la idea del primer pilar de la parte 1: verifica la especificación y cierras la brecha que las pruebas nunca podrían cerrar.

---

## 8. Una aclaración honesta

Simplificamos deliberadamente. El circuito real implica cientos de regiones y muchos miles de restricciones, y el fallo real es técnicamente más intrincado que una sola comprobación de bit ausente; usamos la comprobación de bit porque muestra exactamente la *forma* de un circuito con restricciones insuficientes, y porque ese error exacto es real en la historia de Zcash. El fallo preciso de Orchard fue una multiplicación de curva elíptica con restricciones insuficientes, tal como se indica en la divulgación oficial. También condensamos el calendario de divulgación y corrección. Para consultar el relato técnico autorizado, revisa la divulgación de Shielded Labs y los textos de Project Tachyon.

---

## 9. Resumen

- El pool blindado de Zcash oculta los importes mediante **pruebas zero-knowledge**, por lo que un fallo en esas pruebas podría permitir **falsificación invisible**.
- Un sistema de pruebas comprueba un **circuito** fijo de **restricciones**; su propiedad crucial es la **solidez**: solo las afirmaciones verdaderas deberían tener un **testigo** satisfactorio.
- Una **restricción ausente** crea una **brecha de solidez**, permitiendo que pasen afirmaciones falsas. (Caso de ejemplo verificado: `b(b−1)=0` fuerza que `b` sea 0 o 1; si se elimina, `b` puede ser cualquier valor. Esta clase exacta de error es real en la historia de Zcash).
- El **error de Orchard** fue una **multiplicación de curva elíptica con restricciones insuficientes**: entradas falsas arbitrarias podían pasar la comprobación de multiplicación, permitiendo falsificación ilimitada e indetectable. Se demostró un exploit funcional en una red de prueba.
- Permaneció oculto durante **cuatro años** (de mayo de 2022 a junio de 2026) porque las pruebas muestrean casos y nunca lo muestrearon; se encontró razonando sobre la matemática, con ayuda de IA, el 29 de mayo de 2026.
- La falsificación indetectable solo puede vivir en la **especificación**, y Zcash ya ha visto antes esta familia de errores. Zcash respondió con una corrección de emergencia y un nuevo pool verificado formalmente, **Ironwood**, tema de la parte 3.

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Shielded pool** | El modo privado de Zcash donde los importes y las partes están ocultos |
| **Zero-knowledge proof** | Una prueba de que una afirmación oculta es válida, sin revelar nada más |
| **Circuit** | El conjunto fijo de condiciones aritméticas que debe satisfacer una transacción válida |
| **Constraint** | Una condición (ecuación) dentro del circuito |
| **Witness** | Los valores secretos que satisfacen las restricciones |
| **Soundness** | La garantía de que solo las afirmaciones verdaderas pueden producir una prueba válida |
| **Soundness gap** | Una restricción ausente que permite que pasen afirmaciones falsas |
| **Under-constrained** | Un circuito al que le falta una condición que necesitaba, la raíz del error de Orchard |
| **Detectable / undetectable** | Si la explotación dejaría evidencia en el libro mayor público |

---

## Preguntas frecuentes

**¿Se creó realmente Zcash falsificado?**
No se encontró evidencia de explotación y el equipo lo considera improbable. Pero, dado que el fallo habría sido indetectable desde el libro mayor, este por sí solo no puede demostrar completamente que nunca ocurrió, razón por la cual la respuesta fue tan exhaustiva.

**¿Por qué ocultar importes hace que un error sea peor?**
En una cadena transparente, las monedas acuñadas son visibles y pueden detectarse y revertirse. Cuando los importes están ocultos para preservar la privacidad, un error de falsificación no produce ninguna anomalía visible, por lo que puede persistir sin ser detectado.

**¿Por qué años de auditorías no lo detectaron?**
Las auditorías y las pruebas examinan en gran medida el comportamiento en casos realistas. Este fallo solo aparecía con una entrada inusual elaborada deliberadamente y dirigida a un caso límite matemático, que la revisión rutinaria no ejercitaba. Se encontró mediante razonamiento dirigido sobre el circuito, no mediante pruebas.

**¿Realmente basta una restricción ausente?**
Sí. Un sistema de pruebas solo es tan fuerte como su conjunto completo de restricciones. Basta omitir una condición necesaria para que pasen afirmaciones no válidas.

**¿Qué papel desempeñó la IA?**
Un investigador utilizó un modelo de IA de frontera junto con un entorno personalizado y métodos tradicionales para revisar la matemática del circuito y encontrar el fallo. La IA se utiliza cada vez más en ambos lados de la seguridad, lo que forma parte de por qué demostrar ahora que los sistemas son correctos importa tanto.

---

### Pon a prueba tu intuición

Supón que una transacción blindada debe demostrar que «el dinero que entra es igual al dinero que sale», pero el circuito olvida restringir un valor de salida. ¿Qué podría hacer un probador deshonesto y por qué el libro mayor público parecería completamente normal? *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

Con esa salida sin restricciones, el probador podría establecerla por encima de lo que permiten las entradas reales, creando valor de la nada, una falsificación. La prueba seguiría verificándose, porque la restricción ausente es lo único que habría detectado el desequilibrio. Y dado que el pool blindado oculta los importes, el libro mayor solo muestra que «ocurrió una transacción válida», sin ningún desequilibrio visible que active una alarma. La falsificación es real pero invisible, que es exactamente por qué la solidez del circuito importa tanto y exactamente por qué debe demostrarse en lugar de probarse.
</details>

---

### Qué sigue

**Parte 3 · Ironwood:** la corrección no fue solo un parche. Los ingenieros de Zcash construyeron un nuevo pool blindado y lo acompañaron con una prueba matemática verificada por máquina, de más de 2.700 teoremas escritos en el asistente de pruebas Lean, de que no puede crear dinero falsificado bajo sus supuestos declarados. Veremos qué significan «integridad de balance» y «solidez de conocimiento», exactamente qué cubre y qué no cubre la prueba, y cómo se retiró de forma segura el pool antiguo.

*Parte de la* serie de verificación formal *para [ZecHub](https://zechub.org).*
