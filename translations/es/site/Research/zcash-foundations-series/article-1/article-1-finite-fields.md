# Campos finitos: el sistema numérico en el que vive la criptografía
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![texto alternativo](image-5.png)

### Por qué “dar la vuelta” es la base secreta de Zcash

> **Serie:** *Zcash desde primeros principios* . **Artículo 1 . Campos finitos**
> **Público:** principiantes. Suponemos solo aritmética escolar ordinaria (sumar, multiplicar, dividir). No se requieren conocimientos previos de criptografía ni de matemáticas superiores.
> **Lo que te llevarás:** una comprensión intuitiva y correcta de los campos finitos, por qué los criptógrafos los usan y dónde aparecen dentro de Zcash.

En el [Artículo 0](article-0-shielded-transaction.md) conocimos a cinco personajes: la nota, el compromiso, el árbol de compromisos de notas, el nulificador y la prueba de conocimiento cero. Dejamos una cuestión abierta: *¿de dónde salen realmente todas las claves y las recetas secretas?* Vienen de números. Pero no de los números ordinarios con los que creciste. Vienen de un sistema numérico especial y autocontenido llamado **campo finito**, y casi toda la criptografía de Zcash está construida sobre él.

Este artículo desarrolla esa idea poco a poco. Como prometimos, primero la intuición. Sin fórmulas hasta que realmente se las ganen.

---

## 1. ¿Por qué debería importarte?

Los números ordinarios tienen un problema para la criptografía: hay infinitamente muchos, y filtran información.

Piensa en lo que ocurre cuando un número se hace *más grande*. Si te digo que un cálculo secreto produjo `8,142,067`, ya sabes bastante: es un número de siete cifras, es impar, es “bastante grande”. El tamaño es una pista. Y las pistas son exactamente lo que un sistema de privacidad no puede permitirse revelar.

La criptografía quiere un sistema numérico donde:

- haya **una cantidad finita** de valores, de modo que una computadora pueda almacenar cualquiera de ellos exactamente, sin redondeo ni desbordamiento,
- los valores **no filtren su tamaño**, porque el sistema no tiene una noción real de “más grande”,
- aún puedas **sumar, restar, multiplicar y dividir** libremente y de forma reversible, porque las recetas criptográficas necesitan álgebra real para funcionar, y
- el espacio pueda hacerse **astronómicamente grande**, de modo que adivinar sea inútil.

Esa lista de deseos tiene un nombre. Es un **campo finito**. Construyamos la intuición de uno antes de escribir un solo símbolo.

---

## 2. La intuición: un reloj

Ya usas un campo finito todos los días. Es el reloj de tu pared.

En un reloj de 12 horas, los números *dan la vuelta*. Empieza en las 10, suma 5 horas, y no llegas a “las 15”, sino a **las 3**. El reloj solo tiene doce posiciones, y contar más allá de la parte superior simplemente te devuelve al inicio.

![texto alternativo](image-9.png)

Acaban de ocurrir tres cosas que son el punto central de este artículo:

1. **El mundo es finito.** Hay exactamente doce posiciones, por mucho que cuentes.
2. **La suma sigue funcionando.** Puedes sumar horas todo el día; siempre llegas a una posición válida del reloj.
3. **El tamaño dejó de importar.** “Las 3” no te dice si contaste 3 horas, o 15, o 27. El dar la vuelta *borró la información del tamaño.* Ese borrado es precisamente la propiedad favorable a la privacidad que queríamos.

Esta aritmética con vuelta tiene un nombre formal: **aritmética modular**. El reloj funciona “módulo 12”, escrito **mod 12**. Los matemáticos prefieren contar posiciones empezando desde 0, así que un “reloj mod 12” en realidad tiene las posiciones `0, 1, 2, ..., 11`. Un reloj mod 7 tendría las posiciones `0` hasta `6`.

> **La única regla:** para calcular cualquier cosa “mod p”, haz la aritmética ordinaria, luego divide por `p` y conserva solo el resto.
> Ejemplo mod 7: `5 + 4 = 9`, y `9` deja resto `2` al dividirlo por `7`, así que `5 + 4 = 2 (mod 7)`.

---

## 3. De un reloj a un campo

Un reloj nos permite sumar. Un **campo** es la mejora: un sistema numérico donde las cuatro operaciones se comportan bien, incluida la más delicada, la división.

De manera informal, un **campo** es cualquier colección de “números” donde puedes **sumar, restar, multiplicar y dividir** (por cualquier cosa excepto cero), y todas las reglas familiares siguen valiendo: el orden no importa para la suma ni para la multiplicación, los paréntesis se pueden reagrupar, existe un `0` y un `1`, y cada número tiene un negativo y (excepto `0`) un recíproco.

Los números racionales forman un campo. Los números reales forman un campo. Lo que queremos es uno *finito*.

Aquí está el resultado principal, y es hermoso:

> **Toma los números enteros `0, 1, ..., p-1` y haz toda la aritmética mod `p`. Si `p` es un número primo, el resultado es un campo finito.** Lo escribimos `F_p` (léase “F sub p”).

Así que `F_7 = {0, 1, 2, 3, 4, 5, 6}` con aritmética estilo reloj mod 7 es un auténtico campo finito. Veámoslo respirar.

### Multiplicación en F_7 (verificada)

Cada entrada es `(row x column) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Mira las filas de `1` a `6`: cada una contiene cada valor no nulo `1..6` exactamente una vez. Ese patrón de “sin repeticiones, sin que falte nada” es la huella visible de un campo.

### División: la magia que necesita un primo

Dividir es simplemente “multiplicar por el recíproco”. En `F_7`, el recíproco (o **inverso**) de un número `a` es el valor `a^(-1)` para el que `a x a^(-1) = 1`. Leyéndolos directamente de la tabla:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Comprueba uno: `2 x 4 = 8 = 1 (mod 7)`. Así que “dividir entre 2” en `F_7` significa “multiplicar por 4”. Cada elemento no nulo tiene una pareja. **Eso es lo que hace que `F_7` sea un campo.**

---

## 4. Por qué el módulo debe ser primo

Esta es la idea más importante de todo el artículo, así que hagámosla concreta en lugar de abstracta.

Observa qué se rompe si intentamos ingenuamente construir un “campo” mod `6` (y `6` *no* es primo):

> ¿Existe algún `x` tal que `2 x x = 1 (mod 6)`? Comprobándolos todos: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **La respuesta `1` nunca aparece.** Así que `2` no tiene recíproco mod 6. Peor aún, `2 x 3 = 6 = 0 (mod 6)`: dos números no nulos se multiplicaron para dar cero.

Esa segunda frase es una catástrofe para la aritmética. Dos cosas no nulas que se multiplican para dar cero (lo que se llama un **divisor de cero**) significa que la división está rota, y un sistema con la división rota no es un campo. Ocurre precisamente porque `6` se factoriza como `2 x 3`.

Un primo, por definición, no tiene tales factores. Así que mod un primo, no pueden aparecer divisores de cero, todo elemento no nulo obtiene un recíproco limpio, y la estructura es un campo propiamente dicho.

![texto alternativo](image-8.png)

> **Frase reutilizable para tus artículos:** *entra un módulo primo, sale una división limpia.*

---

## 5. La única fórmula que vale la pena conocer: cómo las computadoras encuentran inversos

Leímos los inversos directamente de una tabla para `F_7`, pero el primo de Zcash tiene cientos de cifras; ninguna tabla es posible. Hay un atajo clásico, y es la única fórmula de este artículo.

**El pequeño teorema de Fermat** dice que para un primo `p` y cualquier `a` no nulo:

```
a^(p-1) = 1   (mod p)
```

Reordénalo (separa un factor de `a`) y obtienes el inverso gratis:

```
a^(-1) = a^(p-2)   (mod p)
```

Pruébalo en `F_7` (`p = 7`, así que `p - 2 = 5`): el inverso de `2` debería ser `2^5 = 32 = 4 (mod 7)`. Y en efecto nuestra tabla decía `2^(-1) = 4`. Las computadoras elevan a potencias grandes extremadamente rápido, así que esto convierte “encontrar el recíproco” en un cálculo rápido y exacto incluso para primos gigantescos.

No necesitas memorizar esto. Necesitas saber que **la división en un campo finito es una operación rápida y exacta**, que es exactamente por lo que los criptógrafos están encantados de construir sobre ella.

---

## 6. Por qué la criptografía se enamoró de los campos finitos

Juntando toda la intuición, aquí está el caso completo en una sola página.

| Property of `F_p` | Why a privacy system wants it |
|---|---|
| **Finite** | A computer stores any element exactly; no rounding, no overflow, no floating-point fuzz |
| **Wrap-around** | Erases "size," so a value leaks nothing about how it was produced |
| **All four operations work** | Cryptographic recipes (keys, commitments, proofs) need genuine algebra, not just counting |
| **Choosable size** | Pick a 255-bit or 381-bit prime and the field has more elements than there are atoms in the observable universe; guessing is hopeless |
| **Exact and deterministic** | Two honest parties computing the same thing always get identical results, which proofs depend on |

Un campo finito es, en una sola frase, **un patio de juegos perfectamente cerrado, perfectamente exacto y perfectamente enorme para la aritmética.** Todo lo demás en Zcash se construye jugando dentro de él.

---

## 7. Dónde vive esto en Zcash

No tienes que aceptar por fe que “Zcash usa campos finitos”. Aquí tienes el mapa concreto (la maquinaria más profunda quedará para artículos posteriores; esto es solo para mostrar que las huellas son reales).

- **Sapling** (un diseño shielded más antiguo) construye sus pruebas sobre una curva llamada **BLS12-381**, cuyo campo base usa un primo de **381 bits** de longitud. Cada coordenada, clave y elemento de prueba es un elemento de un campo finito construido sobre ese primo.
- **Orchard** (el diseño shielded actual) usa un par de curvas llamadas **Pallas y Vesta** (las curvas “Pasta”), cuyos campos usan primos de aproximadamente **255 bits** de longitud.
- El **compromiso de nota**, el **nulificador** y los números dentro de una **prueba de conocimiento cero** del Artículo 0 son todos, en el fondo, elementos de uno de estos campos finitos. Cuando el protocolo dice “calcula este compromiso”, quiere decir “haz esta aritmética mod ese primo”.

![texto alternativo](image-7.png)

Así que la respuesta a la pregunta abierta del Artículo 0, *“¿de dónde vienen las recetas secretas?”*, empieza aquí: **todo comienza como aritmética en un campo finito.** En el próximo artículo tomaremos ese campo y construiremos los objetos reales, puntos sobre una curva elíptica, que se convierten en claves y compromisos.

---

## 8. Un descargo honesto

Para mantenerlo amigable para principiantes simplificamos algunas cosas verdaderas. Los campos finitos no vienen solo en la variante `F_p`; también puedes construir campos con `p^n` elementos (llamados **campos de extensión**), y esos importan para los “emparejamientos” de los que depende el sistema de pruebas de Sapling. También omitimos la lista completa de axiomas de campo y pasamos por alto cómo se eligen y validan primos de este tamaño. Nada de eso cambia la intuición que ahora tienes; la refina. Volveremos a añadir la precisión, con señalizaciones, cuando un artículo posterior la necesite.

---

## 9. Resumen

- La criptografía necesita un sistema numérico que sea **finito, exacto, ciego al tamaño, totalmente invertible y enorme.** Ese sistema es un **campo finito**.
- La intuición es un **reloj**: aritmética que **da la vuelta** (aritmética modular), lo que convenientemente borra el “tamaño” de un número.
- Hacer aritmética con los números `0..p-1` mod un **primo** `p` da un campo real `F_p`, donde también puedes **dividir** porque cada elemento no nulo tiene un inverso.
- El módulo **debe ser primo**: un módulo compuesto crea divisores de cero (como `2 x 3 = 0 mod 6`) y rompe la división.
- Las computadoras encuentran inversos rápidamente mediante **el pequeño teorema de Fermat** (`a^(-1) = a^(p-2)`).
- En **Zcash**, cada clave, compromiso, nulificador y elemento de prueba es en última instancia un elemento de un gran campo finito (campos Pasta de 255 bits para Orchard, un campo de 381 bits para BLS12-381 de Sapling).

---

## Glosario

| Term | Plain-English meaning |
|---|---|
| **Modular arithmetic** | Arithmetic that wraps around after reaching a fixed value, like a clock |
| **mod p** | "Divide by `p` and keep the remainder" |
| **Field** | A number system where add, subtract, multiply, and divide all work |
| **Finite field `F_p`** | The numbers `0..p-1` with arithmetic done mod a prime `p` |
| **Inverse (reciprocal)** | The element `a^(-1)` with `a x a^(-1) = 1`; "dividing by `a`" means multiplying by it |
| **Zero divisor** | Two nonzero values whose product is zero; the thing that ruins composite moduli |
| **Prime** | A whole number greater than 1 with no factors except 1 and itself |

---

## Preguntas frecuentes

**¿Por qué no usar simplemente enteros o decimales ordinarios?**
Los decimales redondean y se desvían; los enteros crecen sin límite y filtran tamaño. Los campos finitos son exactos, acotados y ciegos al tamaño, que es lo que requiere la criptografía.

**¿“Dar la vuelta” hace perder información?**
A propósito, sí. Borrar el tamaño de los valores intermedios es una característica, no un fallo, para la privacidad.

**¿Un primo más grande es siempre más seguro?**
En términos generales, un campo más grande significa más valores posibles y más dificultad para adivinar, pero la seguridad depende de toda la construcción, no solo del tamaño del campo. Los artículos posteriores lo precisarán.

**¿Por qué esos primos específicos (255 bits, 381 bits) en Zcash?**
Se eligen para que las curvas construidas sobre ellos tengan la estructura y la eficiencia adecuadas para el sistema de pruebas. Esa “estructura adecuada” es el tema de los dos próximos artículos.

---

### Pon a prueba tu intuición

En `F_7`, ¿cuánto es `5 - 6`? (Recuerda: permanece dentro de `{0,...,6}` dando la vuelta). *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

`5 - 6 = -1`, y `-1` envuelto dentro de `F_7` es `6` (porque `6 + 1 = 7 = 0`). Así que `5 - 6 = 6 (mod 7)`. La resta nunca sale del campo; simplemente da la vuelta en la otra dirección.
</details>

---

### Qué sigue

**Artículo 2 . Curvas elípticas:** tomamos el campo finito que acabamos de construir y lo usamos para dibujar un tipo extraño de curva cuyos puntos pueden “sumarse” entre sí. Esos puntos se convierten en las claves y compromisos de Zcash, y esconden una trampa de una sola dirección que hace posible todo el sistema de privacidad. Intuición primero, como siempre.

*Parte de la serie* Zcash desde primeros principios *para [ZecHub](https://zechub.org). Licencia CC BY-SA 4.0.*
