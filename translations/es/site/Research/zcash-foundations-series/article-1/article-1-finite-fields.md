# Campos finitos [Finite Fields]: el sistema numérico en el que vive la criptografía
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-5-6e8a8950f8.webp)

### Por qué «volver al inicio» es la base secreta de Zcash

> **Serie:** *Zcash desde los primeros principios* . **Artículo 1 . Campos finitos**
> **Público:** principiantes. Suponemos únicamente aritmética escolar ordinaria (sumar, multiplicar, dividir). No se requieren conocimientos previos de criptografía ni matemáticas avanzadas.
> **Con qué te quedarás:** una comprensión intuitiva y correcta de los campos finitos, por qué los criptógrafos los utilizan y dónde aparecen dentro de Zcash.

En [Artículo 0](article-0-shielded-transaction.md) conocimos a cinco personajes: la nota [note], el compromiso [commitment], el árbol de compromisos de notas, el anulador [nullifier] y la prueba zero-knowledge [zero-knowledge proof]. Dejamos un cabo suelto: *¿de dónde proceden realmente todas las claves y recetas secretas?* Proceden de los números. Pero no de los números ordinarios con los que creciste. Proceden de un sistema numérico especial y autosuficiente llamado **campo finito**, y casi cada parte de la criptografía en Zcash está construida sobre él.

Este artículo desarrolla esa idea poco a poco. Como prometimos, primero la intuición. Sin fórmulas hasta que se justifiquen.

---

## 1. ¿Por qué debería importarte?

Los números ordinarios tienen un problema para la criptografía: hay infinitos y filtran información.

Piensa en lo que ocurre cuando un número se hace *más grande*. Si te digo que un cálculo secreto produjo `8,142,067`, ya sabes bastante: es un número de siete dígitos, es impar y es «bastante grande». El tamaño es una pista. Y las pistas son precisamente lo que un sistema de privacidad [privacy] no puede permitirse revelar.

La criptografía necesita un sistema numérico donde:

- haya **una cantidad finita** de valores, para que un ordenador pueda almacenar cualquiera de ellos exactamente, sin redondeos ni desbordamientos,
- los valores **no filtren su tamaño**, porque el sistema no tiene una noción real de «más grande»,
- aún puedas **sumar, restar, multiplicar y dividir** libre y reversiblemente, porque las recetas criptográficas necesitan álgebra real para funcionar, y
- el espacio pueda hacerse **astronómicamente grande**, de modo que adivinar sea imposible.

Esa lista de deseos tiene un nombre. Es un **campo finito**. Construyamos la intuición para uno antes de escribir un solo símbolo.

---

## 2. La intuición: un reloj

Ya utilizas un campo finito todos los días. Es el reloj de tu pared.

En un reloj de 12 horas, los números *vuelven al inicio*. Empieza a las 10, suma 5 horas, y no llegas a las «15», sino a las **3**. El reloj solo tiene doce posiciones, y contar más allá de la parte superior simplemente vuelve al comienzo.

![alt text](/content-images/image-9-30b39f4cc5.webp)

Acaban de ocurrir tres cosas que constituyen el punto central de este artículo:

1. **El mundo es finito.** Hay exactamente doce posiciones, sin importar cuánto tiempo cuentes.
2. **La suma sigue funcionando.** Puedes sumar horas todo el día; siempre llegas a una posición válida del reloj.
3. **El tamaño dejó de importar.** «Las 3» no te dice si contaste 3 horas, 15 o 27. Volver al inicio *borró la información de tamaño.* Ese borrado es precisamente la propiedad favorable para la privacidad que queríamos.

Esta aritmética de volver al inicio tiene un nombre formal: **aritmética modular**. El reloj funciona «módulo 12», escrito **mod 12**. Los matemáticos prefieren contar las posiciones desde 0, por lo que un «reloj mod 12» realmente tiene las posiciones `0, 1, 2, ..., 11`. Un reloj mod 7 tendría las posiciones `0` hasta `6`.

> **La única regla:** para calcular algo «mod p», realiza la aritmética ordinaria, luego divide entre `p` y conserva solo el resto.
> Ejemplo mod 7: `5 + 4 = 9`, y `9` deja un resto de `2` tras dividir entre `7`, por lo tanto `5 + 4 = 2 (mod 7)`.

---

## 3. De un reloj a un campo

Un reloj nos permite sumar. Un **campo** es la mejora: un sistema numérico donde se comportan las cuatro operaciones, incluida la más complicada, la división.

De manera informal, un **campo** es cualquier colección de «números» donde puedes **sumar, restar, multiplicar y dividir** (por cualquier cosa salvo cero), y todas las reglas conocidas se siguen cumpliendo: el orden no importa para la suma ni la multiplicación, los paréntesis pueden reagruparse, hay un `0` y un `1`, y cada número tiene un negativo y (salvo `0`) un recíproco.

Los números racionales forman un campo. Los números reales forman un campo. Lo que queremos es uno *finito*.

Este es el resultado principal, y es hermoso:

> **Toma los números enteros `0, 1, ..., p-1` y realiza toda la aritmética mod `p`. Si `p` es un número primo, el resultado es un campo finito.** Lo escribimos como `F_p` (se lee «F sub p»).

Por tanto, `F_7 = {0, 1, 2, 3, 4, 5, 6}` con aritmética estilo reloj mod 7 es un auténtico campo finito. Veamos cómo respira.

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

Observa las filas de `1` a `6`: cada una contiene cada valor distinto de cero `1..6` exactamente una vez. Ese patrón de «sin repeticiones, sin nada ausente» es la huella visible de un campo.

### División: la magia que necesita un primo

Dividir es simplemente «multiplicar por el recíproco». En `F_7`, el recíproco (o **inverso**) de un número `a` es el valor `a^(-1)` para el cual `a x a^(-1) = 1`. Leyéndolos directamente de la tabla:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Comprueba uno: `2 x 4 = 8 = 1 (mod 7)`.  Por tanto, «dividir entre 2» en `F_7` significa «multiplicar por 4». Cada elemento distinto de cero tiene un compañero. **Eso es lo que convierte a `F_7` en un campo.**

---

## 4. Por qué el módulo debe ser primo

Esta es la idea más importante del artículo, así que hagámosla concreta en lugar de abstracta.

Observa lo que falla si intentamos ingenuamente construir un «campo» mod `6` (y `6` *no* es primo):

> ¿Existe algún `x` con `2 x x = 1 (mod 6)`? Comprobándolos todos: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **La respuesta `1` nunca aparece.** Por tanto, `2` no tiene recíproco mod 6. Peor aún, `2 x 3 = 6 = 0 (mod 6)`: dos números distintos de cero se multiplicaron para dar cero.

Esa segunda frase es una catástrofe para la aritmética. Dos cosas distintas de cero que se multiplican y dan cero (llamadas un **divisor de cero**) significan que la división está rota, y un sistema con división rota no es un campo. Ocurre precisamente porque `6` se factoriza como `2 x 3`.

Un primo, por definición, no tiene tales factores. Por tanto, mod un primo, no pueden aparecer divisores de cero, cada elemento distinto de cero obtiene un recíproco limpio y la estructura es un campo adecuado.

![alt text](/content-images/image-8-573914db92.webp)

> **Frase reutilizable para tus artículos:** *módulo primo dentro, división limpia fuera.*

---

## 5. La única fórmula que vale la pena conocer: cómo los ordenadores encuentran inversos

Leímos los inversos en una tabla para `F_7`, pero el primo de Zcash tiene cientos de dígitos; ninguna tabla es posible. Existe un atajo clásico, y es la única fórmula de este artículo.

**El pequeño teorema de Fermat** dice que para un primo `p` y cualquier `a` distinto de cero:

```
a^(p-1) = 1   (mod p)
```

Reordénalo (separa un factor de `a`) y obtienes el inverso gratuitamente:

```
a^(-1) = a^(p-2)   (mod p)
```

Pruébalo en `F_7` (`p = 7`, por lo que `p - 2 = 5`): el inverso de `2` debería ser `2^5 = 32 = 4 (mod 7)`. Y, efectivamente, nuestra tabla decía `2^(-1) = 4`.  Los ordenadores elevan a potencias grandes con enorme rapidez, así que esto convierte «encontrar el recíproco» en un cálculo rápido y exacto incluso para primos gigantescos.

No necesitas memorizar esto. Necesitas saber que **la división en un campo finito es una operación rápida y exacta**, que es precisamente la razón por la que los criptógrafos están encantados de construir sobre ella.

---

## 6. Por qué la criptografía se enamoró de los campos finitos

Uniendo la intuición, aquí está todo el caso en una página.

| Propiedad de `F_p` | Por qué un sistema de privacidad la quiere |
|---|---|
| **Finito** | Un ordenador almacena cualquier elemento exactamente; sin redondeos, desbordamientos ni imprecisión de coma flotante |
| **Vuelta al inicio** | Borra el «tamaño», por lo que un valor no filtra nada sobre cómo se produjo |
| **Las cuatro operaciones funcionan** | Las recetas criptográficas (claves, compromisos, pruebas) necesitan álgebra auténtica, no solo contar |
| **Tamaño elegible** | Elige un primo de 255 bits o 381 bits y el campo tendrá más elementos que átomos hay en el universo observable; adivinar es imposible |
| **Exacto y determinista** | Dos partes honestas que calculan lo mismo siempre obtienen resultados idénticos, de lo que dependen las pruebas |

Un campo finito es, en una frase, **un espacio de juego perfectamente cerrado, perfectamente exacto y perfectamente enorme para la aritmética.** Todo lo demás en Zcash se construye jugando dentro de él.

---

## 7. Dónde vive esto en Zcash

No tienes que aceptar por fe que «Zcash usa campos finitos». Aquí está el mapa concreto (la maquinaria más profunda es para artículos posteriores; esto es solo para mostrar que las huellas son reales).

- **Sapling** (un diseño blindado [shielded] más antiguo) construye sus pruebas sobre una curva llamada **BLS12-381**, cuyo campo base usa un primo de **381 bits** de longitud. Cada coordenada, clave y elemento de prueba es un elemento de un campo finito construido sobre ese primo.
- **Orchard** (el diseño blindado actual) utiliza un par de curvas llamadas **Pallas y Vesta** (las curvas «Pasta»), cuyos campos usan primos de aproximadamente **255 bits** de longitud.
- El **compromiso de nota**, el **anulador** y los números dentro de una **prueba zero-knowledge** del Artículo 0 son todos, en el fondo, elementos de uno de estos campos finitos. Cuando el protocolo dice «calcula este compromiso», significa «realiza esta aritmética mod ese primo».

![alt text](/content-images/image-7-c81fe982f0.webp)

Por tanto, la respuesta a la pregunta abierta del Artículo 0, *«¿de dónde proceden las recetas secretas?»*, empieza aquí: **todo comienza como aritmética en un campo finito.** En el próximo artículo tomaremos ese campo y construiremos los objetos reales, puntos sobre una curva elíptica, que se convierten en claves y compromisos.

---

## 8. Una advertencia honesta

Para mantenerlo accesible a principiantes simplificamos algunas verdades. Los campos finitos no solo existen en la variante `F_p`; también puedes construir campos con `p^n` elementos (llamados **campos de extensión**), y esos importan para los «emparejamientos» en los que se basa el sistema de pruebas de Sapling. También omitimos la lista completa de axiomas de campo y pasamos por alto cómo se eligen y validan primos de este tamaño. Nada de eso cambia la intuición que ahora tienes; la refina. Recuperaremos la precisión, con advertencias, cuando un artículo posterior la necesite.

---

## 9. Resumen

- La criptografía necesita un sistema numérico que sea **finito, exacto, ciego al tamaño, completamente invertible y enorme.** Ese sistema es un **campo finito**.
- La intuición es un **reloj**: aritmética que **vuelve al inicio** (aritmética modular), que convenientemente borra el «tamaño» de un número.
- Realizar aritmética con los números `0..p-1` mod un `p` **primo** proporciona un campo real `F_p`, donde también puedes **dividir** porque cada elemento distinto de cero tiene un inverso.
- El módulo **debe ser primo**: un módulo compuesto crea divisores de cero (como `2 x 3 = 0 mod 6`) y rompe la división.
- Los ordenadores encuentran inversos rápidamente mediante **el pequeño teorema de Fermat** (`a^(-1) = a^(p-2)`).
- En **Zcash**, cada clave, compromiso, anulador y elemento de prueba es, en última instancia, un elemento de un gran campo finito (campos Pasta de 255 bits para Orchard, un campo de 381 bits para BLS12-381 de Sapling).

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Modular arithmetic** | Aritmética que vuelve al inicio después de alcanzar un valor fijo, como un reloj |
| **mod p** | «Divide entre `p` y conserva el resto» |
| **Field** | Un sistema numérico donde sumar, restar, multiplicar y dividir funcionan |
| **Finite field `F_p`** | Los números `0..p-1` con aritmética realizada mod un primo `p` |
| **Inverse (reciprocal)** | El elemento `a^(-1)` con `a x a^(-1) = 1`; «dividir entre `a`» significa multiplicar por él |
| **Zero divisor** | Dos valores distintos de cero cuyo producto es cero; lo que arruina los módulos compuestos |
| **Prime** | Un número entero mayor que 1 sin factores salvo 1 y él mismo |

---

## Preguntas frecuentes

**¿Por qué no usar simplemente enteros o decimales ordinarios?**
Los decimales redondean y se desvían; los enteros crecen sin límite y filtran el tamaño. Los campos finitos son exactos, acotados y ciegos al tamaño, que es lo que requiere la criptografía.

**¿«Volver al inicio» pierde información?**
A propósito, sí. Borrar el tamaño de los valores intermedios es una característica, no un error, para la privacidad.

**¿Un primo más grande siempre es más seguro?**
En términos generales, un campo más grande significa más valores posibles y una adivinación más difícil, pero la seguridad depende de toda la construcción, no solo del tamaño del campo. Los artículos posteriores lo precisan.

**¿Por qué estos primos específicos (255 bits, 381 bits) en Zcash?**
Se eligen para que las curvas construidas sobre ellos tengan la estructura y eficiencia adecuadas para el sistema de pruebas. Esa «estructura adecuada» es el tema de los dos próximos artículos.

---

### Pon a prueba tu intuición

En `F_7`, ¿cuánto es `5 - 6`? (Recuerda: permanece dentro de `{0,...,6}` volviendo al inicio.) *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

`5 - 6 = -1`, y `-1` al volver al inicio dentro de `F_7` es `6` (porque `6 + 1 = 7 = 0`). Por tanto, `5 - 6 = 6 (mod 7)`. La resta nunca sale del campo; simplemente vuelve al inicio en la otra dirección.
</details>

---

### Qué sigue

**Artículo 2 . Curvas elípticas:** tomamos el campo finito que acabamos de construir y lo usamos para dibujar un tipo extraño de curva cuyos puntos pueden «sumarse». Esos puntos se convierten en las claves y compromisos de Zcash, y ocultan una trampa unidireccional que hace posible todo el sistema de privacidad. Primero la intuición, como siempre.

*Parte de la serie* Zcash desde los primeros principios *para [ZecHub](https://zechub.org). Con licencia CC BY-SA 4.0.*
