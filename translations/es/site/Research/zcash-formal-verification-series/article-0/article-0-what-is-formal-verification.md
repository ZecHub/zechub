![alt text](image-1.png)
# ¿Qué Es La Verificación Formal [Formal Verification]?

### Cómo demuestras que un programa es correcto, en lugar de simplemente esperar que lo sea

> **Serie:** *Serie de Verificación Formal* · **Parte 1 de 3**
> **Público:** principiantes absolutos. No se asumen conocimientos de matemáticas, programación ni criptografía.
> **Con qué te quedarás:** una comprensión clara de lo que significa *demostrar* que un software es correcto, por qué eso es fundamentalmente distinto de probarlo, qué es una prueba verificada por una máquina y los límites precisos (y honestos) de lo que dicha prueba puede prometer.

Se confía en la mayor parte del software porque ha sido *probado*: lo ejecutamos con muchas entradas y observamos su comportamiento. La verificación formal plantea una pregunta más audaz. ¿Podemos *demostrar*, con certeza matemática, que un sistema hace lo que debe hacer para **cada** entrada posible, incluidas aquellas que nadie pensó en probar? Este artículo desarrolla esa idea desde cero. Primero la intuición, sin símbolos hasta que sean necesarios.

---

## 1. ¿Por qué debería importarte?

Esta es una historia real y la razón por la que existe esta serie.

En 2022, la criptomoneda centrada en la privacidad Zcash lanzó un nuevo pool blindado llamado Orchard, que permitía a las personas realizar transacciones con los importes ocultos. Durante cuatro años funcionó sin fallos y superó repetidas auditorías profesionales. Después, en mayo de 2026, un investigador de seguridad que razonaba cuidadosamente sobre las matemáticas subyacentes (con ayuda de herramientas de IA) encontró un único punto **con restricciones insuficientes** en las matemáticas del sistema. Ese único vacío podría haber permitido a un atacante crear una cantidad *ilimitada* de dinero falsificado y, como los importes estaban ocultos, nadie habría visto que ocurría. El fallo había estado presente todo el tiempo.

No se detectó mediante pruebas. Todas las pruebas habían pasado durante cuatro años. Lo detectó alguien *razonando sobre las matemáticas*. Y cuando el equipo lo corrigió, no se limitó a aplicar un parche y seguir adelante. Escribieron una **prueba matemática verificada por una máquina**, con más de 2.700 teoremas individuales, que demostraba que el reemplazo no podía contener en absoluto esa clase de fallo.

Eso es la verificación formal, y esto es lo que te ofrece: no «probamos muchos casos y funcionaron», sino «demostramos que se cumple para cada caso». Para sistemas en los que un solo caso omitido es catastrófico (dinero, aeronaves, dispositivos médicos, criptografía), esa diferencia lo es todo.

El punto ciego de las pruebas fue nombrado hace décadas por el científico informático Edsger Dijkstra, y sigue siendo cierto:

> **Las pruebas pueden mostrar la *presencia* de errores, pero nunca su *ausencia*.**

Si una prueba pasa, has aprendido que el sistema funciona *con esa entrada*. No has aprendido nada sobre las entradas que no probaste, y los errores peligrosos casi siempre están en los casos que nadie probó.

---

## 2. La intuición: comprobar puertas frente a demostrar el edificio

Imagina que eres responsable de un edificio con mil puertas y que tu trabajo consiste en garantizar que todas estén cerradas con llave por la noche.

- **El enfoque de las pruebas:** recorres el lugar y pruebas una muestra de puertas. Pruebas cincuenta, cien, quinientas. Todas las que pruebas están cerradas, así que tu confianza aumenta. Pero no las has probado todas, y la puerta sin cerrar podría ser una de las que omitiste.
- **El enfoque de la verificación formal:** examinas el *propio sistema de cierre* y demuestras, a partir de su diseño, que pulsar el botón «cerrar» activa necesariamente cada puerta. Ahora no necesitas probar puertas individuales. Has demostrado que *ninguna puerta posible puede quedar sin cerrar*, porque el mecanismo lo hace imposible.

La diferencia está entre **muestrear la realidad** y **demostrar una propiedad del diseño**. Las pruebas muestrean. La verificación formal demuestra. Esa es toda la idea, y todo lo demás es la maquinaria para hacerlo rigurosamente.

![alt text](image-2.png)

---

## 3. Los tres pilares de cualquier verificación formal

Toda verificación formal, por avanzada que sea, se construye a partir de exactamente tres ingredientes. Compréndelos claramente y el resto son detalles.

| Pilar | Significado sencillo | Analogía del edificio |
|---|---|---|
| **Especificación** | Una declaración precisa de lo que *significa* «correcto» | «Todas las puertas deben estar cerradas con llave por la noche» |
| **Sistema** | Lo que realmente se comprueba (un programa, un circuito, un protocolo) | El edificio y su mecanismo de cierre |
| **Prueba** | Un argumento riguroso de que el sistema siempre cumple la especificación | La demostración lógica de que pulsar «cerrar» cierra todas las puertas |

Y un cuarto ingrediente, más discreto, hace que todo el proceso sea fiable:

- **Un verificador automático.** La prueba no la escribe una persona para que otra simplemente la revise por encima. Se entrega a un programa (un **asistente de pruebas**, también llamado **demostrador de teoremas**) que comprueba *cada paso lógico individual*. Una persona puede hacer gestos vagos o cometer un error sutil; la máquina no aceptará un paso que no se derive estrictamente de lo anterior. Por eso decimos que el resultado está **verificado por una máquina**.

![alt text](image-3.png)

Entre los asistentes de pruebas que puedes oír mencionar están **Lean**, **Rocq** (antes Coq) e **Isabelle**. En efecto, son motores de comprobación lógica extraordinariamente estrictos. La prueba de Zcash de nuestra historia inicial se escribió en **Lean**. Cabe destacar que los modelos modernos de IA se usan cada vez más para ayudar a *escribir* estas pruebas, guiados por personas, lo que ha reducido esfuerzos que antes tardaban años a semanas. La máquina sigue comprobando cada paso, así que la aceleración no reduce ninguna certeza.

---

## 4. Qué es realmente una prueba

La palabra «prueba» puede parecer intimidante, así que desmitifiquémosla con un ejemplo concreto y comprobable. Sin criptografía, solo aritmética escolar.

**Afirmación:** para todo número entero `n`, la suma `0 + 1 + 2 + ... + n` es igual a `n(n+1)/2`.

Podrías *probar* esto. `n = 5` da `0+1+2+3+4+5 = 15`, y `5 × 6 / 2 = 15`. ✓ Coincide. Prueba `n = 10`: la suma es `55` y la fórmula da `10 × 11 / 2 = 55`. ✓ (Estos valores se calculan y confirman; de hecho, la afirmación se cumple para cada `n` de 0 a 999 cuando se comprueba directamente.)

Pero probar valores, incluso mil de ellos, nunca alcanza «para **cada** número entero». Hay infinitos. Una **prueba** cierra esa brecha infinita mediante un argumento finito, usando una técnica llamada **inducción**:

1. **Caso Base:** para `n = 0`, la suma es simplemente `0` y la fórmula da `0 × 1 / 2 = 0`. Coinciden. ✓
2. **Paso inductivo:** *supón* que la fórmula se cumple para algún número `k`. Ahora suma el siguiente número, `k+1`. La suma hasta `k+1` es `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Una línea de álgebra reorganiza esto como `(k+1)(k+2)/2`, que es exactamente la fórmula con `k+1` en lugar de `k`. ✓

Como se cumple al comienzo (0) y cada paso la lleva al siguiente número, se cumple para **todos** los números enteros, para siempre, en un único argumento finito. Eso es una prueba. Un asistente de pruebas realiza exactamente este razonamiento, pero verifica mecánicamente que cada paso, incluida la «línea de álgebra», se derive realmente de lo anterior.

> El salto que vale la pena asimilar: una prueba convierte «infinitos casos» en un **argumento finito y comprobable**. Esa es la superpotencia que las pruebas carecen estructuralmente.

---

## 5. Dónde viven realmente los errores

La verificación formal es poderosa en parte por una idea esclarecedora sobre *dónde* se originan los errores. Cualquier fallo en un sistema que comprueba reglas se remonta a uno de tres lugares:

| Origen de un error | Qué significa | ¿Podemos demostrar que no existe? |
|---|---|---|
| **La especificación** | Las propias matemáticas o reglas son incorrectas (falta una condición, hay una definición errónea) | **Sí**, directamente; este es el terreno propio de la verificación formal |
| **La implementación** | El código no ejecuta fielmente una especificación correcta | En parte; a menudo esos fallos dejan evidencia detectable |
| **Una suposición rota** | Algo de lo que depende todo el sistema resulta ser falso | No; las suposiciones son el fundamento irreductible |

Esta taxonomía importa más de lo que parece, y las Partes 2 y 3 giran en torno a ella. Los errores más profundos y peligrosos, aquellos que pueden permanecer ocultos para siempre, tienden a estar en la **especificación**: la descripción matemática de lo que se supone que debe hacer el sistema. Y la especificación es exactamente lo que una prueba verificada por una máquina puede examinar directamente, todos los casos a la vez. Por eso los esfuerzos serios de verificación formal apuntan primero allí.

![alt text](image-4.png)

---

## 6. La advertencia más importante de todo el campo

La verificación formal es poderosa, pero su promesa es precisa, y malinterpretarla lleva a la gente por mal camino. Así que expresémosla cuidadosamente:

> **Una prueba garantiza que el *sistema* cumple la *especificación*, bajo las *suposiciones* declaradas. Nada más.**

De ello se derivan cuatro consecuencias, y cada una importa:

- **Si la especificación es incorrecta, la prueba no vale nada.** Si demuestras que «cada puerta se cierra» pero el requisito real era que «cada *ventana* se cierre», has demostrado perfectamente lo equivocado. La verificación comprueba que construiste *lo que especificaste*, no que especificaste lo correcto.
- **Si una definición se formula incorrectamente de forma sutil, la garantía se reduce silenciosamente.** Una prueba sobre una definición ligeramente incorrecta de «saldo» podría establecer menos de lo que crees y aun así superar cada comprobación. Por eso las definiciones en el corazón de una verificación deben ser breves, estándar y revisables abiertamente por personas.
- **Si las suposiciones fallan, la garantía deja de aplicarse.** Las pruebas se basan en suposiciones («el hardware de la cerradura no está físicamente roto»). Si una suposición es falsa en la realidad, la conclusión no tiene por qué cumplirse.
- **No significa «nunca habrá errores».** Significa «no habrá errores del tipo excluido por esta especificación, dadas estas suposiciones». Es una afirmación más limitada, más honesta y mucho más útil.

Lejos de debilitar la verificación formal, esta precisión es su fortaleza. Te dice *exactamente* qué estás obteniendo. Como veremos en la Parte 3, el equipo de Zcash que declara claramente su alcance y sus suposiciones («demostramos la solidez del suministro, bajo estas suposiciones nombradas, y no la privacidad») es un modelo de esa honestidad.

![alt text](image-5.png)

---

## 7. Una aclaración honesta

Para mantener esto legible, simplificamos. Las especificaciones reales se escriben en lenguajes formales precisos, no en frases en inglés; existen varios *estilos* de verificación formal (demostración interactiva de teoremas, comprobación de modelos, métodos basados en SMT) adecuados para distintos problemas; y escribir estas pruebas sigue siendo un trabajo especializado y exigente incluso con asistencia de IA. También omitimos cómo un asistente de pruebas representa internamente la lógica. Nada de esto cambia lo esencial: una especificación, un sistema y una prueba verificada por una máquina de que ambos concuerdan, bajo las suposiciones declaradas. Los detalles volverán cuando los necesitemos.

---

## 8. Resumen

- Las **pruebas** muestrean entradas específicas y pueden mostrar que existe un error, pero nunca que los errores están ausentes. Los errores peligrosos se ocultan en los casos que nadie muestrea.
- La **verificación formal** demuestra que una propiedad se cumple para **cada** caso posible, mediante un argumento finito y comprobable.
- Toda verificación tiene tres pilares: una **especificación** (qué significa correcto), un **sistema** (lo que se comprueba) y una **prueba** de que concuerdan, además de un **asistente de pruebas** (como **Lean**) que verifica mecánicamente cada paso.
- Una **prueba** (por ejemplo, mediante **inducción**) reduce infinitos casos a un único argumento finito.
- Los errores viven en la **especificación**, la **implementación** o una **suposición rota**. La verificación formal apunta directamente a la especificación, que es donde tienden a vivir los errores más profundos y ocultos.
- La garantía es precisa: el sistema cumple **la especificación**, bajo **suposiciones declaradas**. Una especificación incorrecta, una definición mal formulada o una suposición rota la anulan, y nunca significa «nunca habrá errores».

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Formal verification** | Demostrar matemáticamente que un sistema cumple una especificación en todos los casos |
| **Specification** | Una declaración precisa de lo que significa «comportamiento correcto» |
| **System** | El programa, circuito o protocolo real que se comprueba |
| **Proof** | Una cadena finita de pasos lógicos que establece una afirmación para todos los casos |
| **Proof assistant / theorem prover** | Software (Lean, Rocq, Isabelle) que comprueba cada paso de una prueba |
| **Machine-checked** | Verificado paso a paso por una computadora, no solo mediante lectura humana |
| **Induction** | Una técnica de prueba: verdadera al inicio, y cada paso la lleva al siguiente |
| **Assumption** | Una condición de la que depende la prueba; si es falsa, la garantía puede no cumplirse |

---

## Preguntas frecuentes

**¿La verificación formal sustituye a las pruebas?**
No. Se complementan. Las pruebas detectan problemas prácticos y suposiciones equivocadas de manera económica; la verificación excluye clases enteras de errores que las pruebas podrían no muestrear nunca.

**Si es tan poderosa, ¿por qué no se verifica formalmente todo?**
Es costosa y requiere habilidades especializadas, aunque la asistencia de IA está reduciendo ese coste. Se reserva para sistemas en los que un error poco frecuente sería catastrófico, que es precisamente donde su coste se justifica.

**¿Un sistema verificado formalmente puede seguir fallando?**
Sí, si la especificación era incorrecta, una definición estaba mal formulada, una suposición no se cumplía o el fallo está fuera de lo especificado. La prueba solo cubre aquello que afirma cubrir.

**¿Una prueba verificada por una máquina es más fiable que una humana?**
Para pruebas grandes e intrincadas, generalmente sí. Una máquina no pasará por alto una laguna sutil ni aceptará una explicación vaga, aunque sigue confiando en la especificación y las definiciones que se le proporcionaron.

**Si la IA ayuda a escribir la prueba, ¿por qué confiar en ella?**
Porque el asistente de pruebas comprueba mecánicamente cada paso. La IA propone pasos; la máquina los verifica. Un paso incorrecto simplemente se rechaza, por lo que la IA acelera el trabajo sin debilitar la garantía.

---

### Pon a prueba tu intuición

Demuestras que el software de un banco «nunca permite que el saldo de una cuenta sea negativo». Un año después, el dinero sigue desapareciendo. ¿Cómo pueden ser ciertas ambas cosas a la vez? *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

La prueba garantizaba exactamente una propiedad: los saldos nunca son negativos. El dinero puede desaparecer de maneras que esa propiedad nunca abordó, por ejemplo, un error que mueve fondos a la cuenta equivocada (que sigue teniendo un saldo no negativo), o un fallo en una parte del sistema que nunca se especificó. La verificación hizo exactamente lo que prometía y nada más. Esta es la advertencia de la Sección 6 en acción: una prueba cubre la especificación, no toda noción concebible de «correcto».
</details>

---

### Qué sigue

**Parte 2 · El error de Orchard:** abordamos la historia real de 2026 en detalle. Un sistema de privacidad ocultaba importes mediante pruebas criptográficas, y una línea con restricciones insuficientes en sus matemáticas significaba que esas pruebas podían hacerse mentir, permitiendo falsificaciones invisibles ilimitadas. Veremos exactamente qué significa «un circuito con restricciones insuficientes», por qué esta clase de error puede ocultarse para siempre y por qué ha ocurrido más de una vez.

*Parte de la* serie de Verificación Formal *para [ZecHub](https://zechub.org).*
