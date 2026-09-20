![alt text](image-1.png)
# ¿Qué es la verificación formal?

### Cómo demostrar que un programa es correcto, en lugar de simplemente esperar que lo sea

> **Serie:** *Serie de verificación formal* · **Parte 1 de 3**
> **Público:** personas completamente nuevas. No se presupone conocimiento de matemáticas, programación ni criptografía.
> **Con qué te quedarás:** una comprensión clara de lo que significa *demostrar* que un software es correcto, por qué eso es fundamentalmente distinto de probarlo, qué es una prueba verificada por una máquina y los límites precisos (y honestos) de lo que dicha prueba puede prometer.

La mayor parte del software es confiable porque ha sido *probado*: lo ejecutamos con muchas entradas y observamos su comportamiento. La verificación formal plantea una pregunta más audaz. ¿Podemos *demostrar*, con certeza matemática, que un sistema hace lo que debe para **cada** entrada posible, incluidas aquellas que a nadie se le ocurrió intentar? Este artículo desarrolla esa idea desde cero. Primero la intuición, sin símbolos hasta que sean necesarios.

---

## 1. ¿Por qué debería importarte?

Aquí tienes una historia real, y es la razón por la que existe esta serie.

En 2022, la criptomoneda centrada en la privacidad Zcash lanzó un nuevo pool blindado llamado Orchard, que permitía a las personas realizar transacciones con los importes ocultos. Durante cuatro años funcionó sin problemas y superó repetidas auditorías profesionales. Luego, en mayo de 2026, un investigador de seguridad que razonaba cuidadosamente sobre las matemáticas subyacentes (con ayuda de herramientas de IA) encontró un único punto **con restricciones insuficientes** en las matemáticas del sistema. Esa única brecha podría haber permitido a un atacante crear una cantidad *ilimitada* de dinero falsificado y, como los importes estaban ocultos, nadie habría visto que ocurría. El fallo había estado presente todo el tiempo.

No fue detectado mediante pruebas. Todas las pruebas habían pasado durante cuatro años. Fue detectado por alguien que *razonó sobre las matemáticas*. Y cuando el equipo lo corrigió, no se limitó a aplicar un parche y seguir adelante. Escribieron una **prueba matemática verificada por una máquina**, con más de 2.700 teoremas individuales, de que el reemplazo no podía contener en absoluto esa clase de fallo.

Eso es la verificación formal, y esto es lo que te ofrece: no «probamos muchos casos y funcionaron», sino «demostramos que se cumple para cada caso». Para sistemas en los que un solo caso omitido es catastrófico (dinero, aeronaves, dispositivos médicos, criptografía), esa diferencia lo es todo.

El punto ciego de las pruebas fue señalado hace décadas por el científico informático Edsger Dijkstra, y sigue siendo cierto:

> **Las pruebas pueden mostrar la *presencia* de errores, pero nunca su *ausencia*.**

Si una prueba pasa, has aprendido que el sistema funciona *con esa entrada*. No has aprendido nada sobre las entradas que no probaste, y los errores peligrosos casi siempre están en los casos que nadie intentó.

---

## 2. La intuición: comprobar puertas frente a demostrar el edificio

Imagina que eres responsable de un edificio con mil puertas y que tu trabajo es garantizar que todas las puertas estén cerradas con llave por la noche.

- **El enfoque de las pruebas:** recorrer el lugar y probar una muestra de puertas. Pruebas cincuenta, cien, quinientas. Todas las que pruebas están cerradas, así que aumenta tu confianza. Pero no las has probado todas, y la única puerta sin cerrar podría ser una que omitiste.
- **El enfoque de la verificación formal:** examinar el *propio sistema de cierre* y demostrar, a partir de su diseño, que pulsar el botón «cerrar» activa necesariamente todas las puertas. Ahora no necesitas probar puertas individuales en absoluto. Has mostrado que *ninguna puerta posible puede quedar sin cerrar*, porque el mecanismo lo hace imposible.

La diferencia está entre **muestrear la realidad** y **demostrar una propiedad del diseño**. Las pruebas muestrean. La verificación formal demuestra. Esa es toda la idea, y todo lo demás es la maquinaria para hacerlo rigurosamente.

![alt text](image-2.png)

---

## 3. Los tres pilares de toda verificación formal

Toda verificación formal, sin importar lo avanzada que sea, se construye con exactamente tres ingredientes. Compréndelos claramente y el resto son detalles.

| Pilar | Significado sencillo | Analogía del edificio |
|---|---|---|
| **Especificación** | Una declaración precisa de lo que *significa* «correcto» | «Todas las puertas deben estar cerradas con llave por la noche» |
| **Sistema** | La cosa real que se está comprobando (un programa, un circuito, un protocolo) | El edificio y su mecanismo de cierre |
| **Prueba** | Un argumento riguroso de que el sistema siempre cumple la especificación | La demostración lógica de que pulsar «cerrar» cierra todas las puertas |

Y un cuarto ingrediente, más silencioso, hace que todo el conjunto sea fiable:

- **Un verificador automático.** La prueba no la escribe una persona para que simplemente otra la revise por encima. Se introduce en un programa (un **asistente de pruebas**, también llamado **demostrador de teoremas**) que comprueba *cada uno de los pasos lógicos*. Una persona puede hacer gestos vagos o cometer un error sutil; la máquina no aceptará un paso que no se siga estrictamente. Por eso decimos que el resultado está **verificado por una máquina**.

![alt text](image-3.png)

Entre los asistentes de pruebas que quizá escuches mencionar están **Lean**, **Rocq** (antes Coq) e **Isabelle**. Son, en efecto, motores extraordinariamente estrictos para comprobar lógica. La prueba de Zcash de nuestra historia inicial se escribió en **Lean**. Cabe destacar que los modelos modernos de IA se usan cada vez más para ayudar a *escribir* estas pruebas, guiados por personas, lo que ha reducido esfuerzos que antes llevaban años a semanas. La máquina sigue comprobando cada paso, de modo que la aceleración no sacrifica ninguna certeza.

---

## 4. Qué es realmente una prueba

La palabra «prueba» puede parecer intimidante, así que desmitifiquémosla con un ejemplo concreto y comprobable. Sin criptografía, solo aritmética escolar.

**Afirmación:** para cada número entero no negativo `n`, la suma `0 + 1 + 2 + ... + n` es igual a `n(n+1)/2`.

Podrías *probar* esto. `n = 5` da `0+1+2+3+4+5 = 15`, y `5 × 6 / 2 = 15`. ✓ Coincide. Prueba `n = 10`: la suma es `55` y la fórmula da `10 × 11 / 2 = 55`. ✓ (Estos valores se calculan y confirman; de hecho, la afirmación se cumple para cada `n` de 0 a 999 al comprobarse directamente).

Pero probar valores, incluso mil de ellos, nunca alcanza «para **cada** número entero no negativo». Hay infinitos. Una **prueba** cierra esa brecha infinita con un argumento finito, mediante una técnica llamada **inducción**:

1. **Caso base:** para `n = 0`, la suma es simplemente `0` y la fórmula da `0 × 1 / 2 = 0`. Coinciden. ✓
2. **Paso inductivo:** *supón* que la fórmula se cumple para algún número `k`. Ahora suma el siguiente número, `k+1`. La suma hasta `k+1` es `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Una línea de álgebra reordena esto como `(k+1)(k+2)/2`, que es exactamente la fórmula con `k+1` en lugar de `k`. ✓

Como se cumple al inicio (0) y cada paso la lleva al siguiente número, se cumple para **todos** los números enteros no negativos, para siempre, en un único argumento finito. Eso es una prueba. Un asistente de pruebas realiza exactamente este razonamiento, pero verifica mecánicamente que cada paso, incluida la «línea de álgebra», se siga realmente de lo anterior.

> El salto que vale la pena interiorizar: una prueba convierte «infinitos casos» en un **argumento finito y comprobable**. Esa es la superpotencia que las pruebas carecen estructuralmente.

---

## 5. Dónde viven realmente los errores

La verificación formal es poderosa en parte por una idea esclarecedora sobre *dónde* surgen los errores en primer lugar. Cualquier fallo en un sistema que comprueba reglas se remonta a uno de tres lugares:

| Origen de un error | Qué significa | ¿Podemos eliminarlo mediante una prueba? |
|---|---|---|
| **La especificación** | Las matemáticas o las reglas mismas son erróneas (falta una condición, hay una mala definición) | **Sí**, directamente; este es el terreno propio de la verificación formal |
| **La implementación** | El código no ejecuta fielmente una especificación correcta | En parte; a menudo tales fallos dejan evidencias detectables |
| **Una suposición rota** | Algo de lo que depende todo el sistema resulta ser falso | No; las suposiciones son el fundamento irreducible |

Esta taxonomía importa más de lo que parece, y las Partes 2 y 3 giran en torno a ella. Los errores más profundos y peligrosos, los que pueden permanecer ocultos para siempre, suelen vivir en la **especificación**: la descripción matemática de lo que se supone que debe hacer el sistema. Y la especificación es exactamente lo que una prueba verificada por una máquina puede examinar directamente, todos los casos a la vez. Por eso los esfuerzos serios de verificación formal apuntan primero allí.

![alt text](image-4.png)

---

## 6. La advertencia más importante de todo el campo

La verificación formal es poderosa, pero su promesa es precisa, y malinterpretarla desvía a las personas. Así que expresémosla con cuidado:

> **Una prueba garantiza que el *sistema* cumple la *especificación*, bajo las *suposiciones* declaradas. Nada más.**

De ello se siguen cuatro consecuencias, y cada una importa:

- **Si la especificación es errónea, la prueba no vale nada.** Si demuestras que «todas las puertas se cierran» pero el requisito real era que «todas las *ventanas* se cierren», has demostrado la cosa equivocada a la perfección. La verificación comprueba que construiste *lo que especificaste*, no que especificaste lo correcto.
- **Si una definición está formulada de manera sutilmente incorrecta, la garantía se reduce silenciosamente.** Una prueba sobre una definición ligeramente errónea de «saldo» podría establecer menos de lo que crees y aun así pasar todas las comprobaciones. Por eso las definiciones en el núcleo de una verificación deben ser breves, estándar y abiertamente revisables por personas.
- **Si fallan las suposiciones, la garantía deja de aplicarse.** Las pruebas descansan sobre suposiciones («el hardware de la cerradura no está físicamente roto»). Si una suposición es falsa en la realidad, la conclusión no tiene por qué cumplirse.
- **No significa «nunca habrá errores».** Significa «no habrá errores del tipo descartado por esta especificación, dadas estas suposiciones». Es una afirmación más limitada, más honesta y mucho más útil.

Lejos de debilitar la verificación formal, esta precisión es su fortaleza. Te dice *exactamente* lo que estás obteniendo. Como veremos en la Parte 3, el equipo de Zcash que declara claramente su alcance y sus suposiciones («demostramos la solidez del suministro, bajo estas suposiciones nombradas, y no la privacidad») es un modelo de esa honestidad.

![alt text](image-5.png)

---

## 7. Una aclaración honesta

Para mantener esto legible, simplificamos. Las especificaciones reales se escriben en lenguajes formales precisos, no en frases en inglés; existen varios *estilos* de verificación formal (demostración interactiva de teoremas, comprobación de modelos, métodos basados en SMT) adecuados para distintos problemas; y escribir estas pruebas sigue siendo un trabajo especializado y exigente incluso con ayuda de IA. También omitimos cómo un asistente de pruebas representa internamente la lógica. Nada de esto cambia el núcleo: una especificación, un sistema y una prueba verificada por una máquina de que ambos coinciden, bajo suposiciones declaradas. Los detalles regresarán cuando los necesitemos.

---

## 8. Resumen

- Las **pruebas** muestrean entradas específicas y pueden mostrar que hay un error, pero nunca que los errores están ausentes. Los errores peligrosos se esconden en los casos que nadie muestrea.
- La **verificación formal** demuestra que una propiedad se cumple para **cada** caso posible, mediante un argumento finito y comprobable.
- Toda verificación tiene tres pilares: una **especificación** (lo que significa correcto), un **sistema** (la cosa comprobada) y una **prueba** de que coinciden, además de un **asistente de pruebas** (como **Lean**) que verifica cada paso mediante una máquina.
- Una **prueba** (por ejemplo, mediante **inducción**) reduce infinitos casos a un único argumento finito.
- Los errores viven en la **especificación**, la **implementación** o una **suposición rota**. La verificación formal se dirige directamente a la especificación, que es donde suelen vivir los errores más profundos y ocultos.
- La garantía es precisa: el sistema cumple **la especificación**, bajo **suposiciones declaradas**. Una especificación errónea, una definición mal formulada o una suposición rota la anulan, y nunca significa «nunca habrá errores».

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Verificación formal** | Demostrar matemáticamente que un sistema cumple una especificación en todos los casos |
| **Especificación** | Una declaración precisa de lo que significa «comportamiento correcto» |
| **Sistema** | El programa, circuito o protocolo real que se está comprobando |
| **Prueba** | Una cadena finita de pasos lógicos que establece una afirmación para todos los casos |
| **Asistente de pruebas / demostrador de teoremas** | Software (Lean, Rocq, Isabelle) que comprueba cada paso de una prueba |
| **Verificado por una máquina** | Verificado paso a paso por una computadora, no solo mediante lectura humana |
| **Inducción** | Una técnica de prueba: es verdadera al inicio y cada paso la lleva al siguiente |
| **Suposición** | Una condición de la que depende la prueba; si es falsa, la garantía puede no cumplirse |

---

## Preguntas frecuentes

**¿La verificación formal reemplaza las pruebas?**
No. Se complementan. Las pruebas detectan problemas prácticos y suposiciones erróneas de manera económica; la verificación descarta clases completas de errores que las pruebas quizá nunca muestreen.

**Si es tan poderosa, ¿por qué no todo se verifica formalmente?**
Es costosa y exige habilidades especializadas, aunque la ayuda de IA está reduciendo ese coste. Se reserva para sistemas en los que un error poco frecuente sería catastrófico, que es precisamente donde su coste compensa.

**¿Un sistema verificado formalmente aún puede fallar?**
Sí, si la especificación era errónea, una definición estaba mal formulada, una suposición no se cumplía o el fallo se encuentra fuera de lo especificado. La prueba solo cubre aquello que afirma cubrir.

**¿Una prueba verificada por una máquina es más fiable que una humana?**
Para pruebas grandes e intrincadas, generalmente sí. Una máquina no pasará por alto una brecha sutil ni aceptará una afirmación sin justificación, aunque sigue confiando en la especificación y las definiciones que recibió.

**Si la IA ayuda a escribir la prueba, ¿por qué confiar en ella?**
Porque el asistente de pruebas comprueba mecánicamente cada paso. La IA propone pasos; la máquina los verifica. Un paso erróneo simplemente se rechaza, por lo que la IA acelera el trabajo sin debilitar la garantía.

---

### Pon a prueba tu intuición

Demuestras que el software de un banco «nunca permite que el saldo de una cuenta sea negativo». Un año después, el dinero sigue desapareciendo. ¿Cómo pueden ser ciertas ambas cosas a la vez? *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

La prueba garantizaba exactamente una propiedad: que los saldos nunca fueran negativos. El dinero puede desaparecer de formas que esa propiedad nunca abordó, por ejemplo, por un error que mueve fondos a la cuenta equivocada (que aun así no queda en negativo), o por un fallo en una parte del sistema que nunca se especificó. La verificación hizo exactamente lo que prometía y nada más. Esta es la advertencia de la Sección 6 en acción: una prueba cubre la especificación, no toda noción concebible de «correcto».
</details>

---

### Qué sigue

**Parte 2 · El error de Orchard:** nos adentramos en la historia real de 2026 en su totalidad. Un sistema de privacidad ocultaba importes mediante pruebas criptográficas, y una línea con restricciones insuficientes en sus matemáticas significaba que esas pruebas podían hacerse mentir, permitiendo falsificación invisible ilimitada. Veremos exactamente qué significa «un circuito con restricciones insuficientes», por qué esta clase de error puede ocultarse para siempre y por qué ha ocurrido más de una vez.

*Parte de la* serie de verificación formal *para [ZecHub](https://zechub.org).*
