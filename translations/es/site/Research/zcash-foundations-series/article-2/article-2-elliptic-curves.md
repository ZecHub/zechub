# Curvas elípticas: donde nacen las claves y los compromisos de Zcash
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![texto alternativo](image-10.png)

### Una calle de un solo sentido construida a partir de puntos sobre una curva

> **Serie:** *Zcash desde primeros principios* . **Artículo 2 . Curvas elípticas**
> **Público:** personas recién llegadas. Suponemos solo [el Artículo 1 (campos finitos)](article-1-finite-fields.md): aritmética que se envuelve módulo un primo. No se necesita ningún otro conocimiento previo.
> **Con qué te irás:** una imagen intuitiva y correcta de las curvas elípticas, la "trampa" que las hace útiles y exactamente cómo Zcash las convierte en claves y compromisos.

El [Artículo 1](article-1-finite-fields.md) nos dio un terreno de juego perfecto para la aritmética: el campo finito. Pero un campo por sí solo son solo números. Para construir claves y los "sobres sellados" del [Artículo 0](article-0-shielded-transaction.md), Zcash necesita un objeto con un tipo especial de dificultad unidireccional: fácil de calcular hacia delante, prácticamente imposible de revertir. Ese objeto es una **curva elíptica**. Este artículo la construye desde cero, con intuición antes que álgebra.

---

## 1. ¿Por qué debería importarte?

Todo sistema de privacidad necesita una **calle de un solo sentido**: una operación que sea trivial de recorrer hacia delante y efectivamente imposible de recorrer hacia atrás.

He aquí por qué. Tu **clave secreta** es un número que mantienes oculto. Tu **clave pública** (y tu dirección) se derivan de ella y se muestran al mundo. Toda la seguridad del sistema descansa en un hecho: *dada la clave pública, nadie puede retroceder hasta tu clave secreta.* Si pudieran, podrían gastar tu dinero.

Así que necesitamos una operación matemática donde:

- ir **hacia delante** (secreto -> público) sea rápido y fácil, pero
- ir **hacia atrás** (público -> secreto) sea tan difícil que todas las computadoras de la Tierra trabajando durante la vida del universo no terminarían.

La multiplicación simple en campos finitos no basta; la división la deshace al instante (ese era precisamente el punto del Artículo 1). Necesitamos algo sin un botón fácil de "deshacer". Las curvas elípticas proporcionan exactamente eso y, además, sus puntos se combinan de una forma perfecta para construir compromisos. Veamos cómo.

---

## 2. La intuición: una curva cuyos puntos puedes "sumar"

Olvida la criptografía por un momento. Una **curva elíptica** es simplemente el conjunto de puntos `(x, y)` que satisfacen una ecuación de la forma:

```
y^2 = x^3 + ax + b
```

Sobre los números ordinarios, se ve como una curva suave y ondulante, a menudo con un lazo redondeado y dos colas:

![texto alternativo](image-14.png)

La parte realmente sorprendente: **puedes "sumar" dos puntos de esta curva para obtener un tercer punto en la misma curva.** No es una suma ordinaria de coordenadas. Es una regla geométrica, y es más fácil de *ver* que de explicar.

### La regla de la cuerda (sumar dos puntos distintos)

Para sumar `P + Q`:

1. Traza una línea recta que pase por `P` y `Q`.
2. Esa línea corta la curva exactamente en un lugar más. Llámalo `R*`.
3. **Refleja `R*` respecto del eje horizontal.** Ese reflejo es la respuesta, `P + Q`.

![texto alternativo](image-11.png)

### La regla de la tangente (sumar un punto consigo mismo)

Para calcular `P + P` (escrito `2P`), no hay un segundo punto por el que trazar una línea, así que usas en su lugar la línea **tangente** en `P`, y luego sigues la misma receta de "tercera intersección y luego reflejar".

Esa es toda la operación. Dos reglas geométricas. Con ellas, los puntos de una curva elíptica forman lo que los matemáticos llaman un **grupo**: un conjunto con una "suma" bien comportada. Incluso tiene un "cero".

### El punto en el infinito (el cero de la curva)

Todo sistema numérico necesita un `0`, la cosa que no cambia nada cuando la sumas. En una curva elíptica, ese papel lo desempeña un punto extra especial llamado el **punto en el infinito**, escrito `O`. Puedes imaginarlo como "infinitamente arriba", el lugar donde se encuentran las líneas verticales. Sumar `O` a cualquier punto lo deja sin cambios, exactamente igual que sumar `0`.

---

## 3. De las imágenes a un campo finito

La curva suave de arriba es la *intuición*. Pero Zcash no usa números reales (redondean y filtran tamaño, según el Artículo 1). Usa una curva elíptica **sobre un campo finito**: la misma ecuación `y^2 = x^3 + ax + b`, pero con toda la aritmética hecha módulo un primo.

Cuando haces eso, la bonita curva se rompe en una **dispersión de puntos desconectados**, un punto por cada par `(x, y)` que satisface la ecuación módulo `p`. Deja de parecerse a una curva. Pero aquí está lo crucial:

> **El álgebra de la regla de cuerda y tangente sigue funcionando perfectamente.** Las mismas fórmulas que encontraban `P + Q` geométricamente ahora lo calculan con aritmética de campo finito. Los puntos siguen formando un grupo, con el mismo `0` (el punto en el infinito).

Hagamos esto real con un ejemplo pequeño y completamente verificado.

### Una curva completa, calculada exactamente

Tomemos `y^2 = x^3 + 2x + 2` sobre el campo finito `F_17`. Al calcular cada punto válido obtenemos exactamente **18 puntos, más el punto en el infinito = 19 en total.** Algunos de ellos:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Ahora elige el punto `G = (5, 1)` y sigue sumándolo consigo mismo. Observa lo que ocurre (cada línea de abajo fue calculada, no adivinada):

| Paso | Punto | Paso | Punto |
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` | **O (infinito)** |
| `10G` | (7, 11) | | |

Dos cosas a notar:

- **Recorre los 18 puntos finitos y luego cae en `O`** en el paso 19, y después se repetiría para siempre. El punto inicial `G` "genera" todo el grupo, así que lo llamamos un **generador**.
- Es un grupo verificado: por ejemplo, `1G + 2G = (5,1) + (6,3) = (10,6)`, que es exactamente `3G`.  La suma es internamente consistente, tal como exige un grupo.

---

## 4. La trampa: multiplicación escalar

Esa tabla de `1G, 2G, 3G, ...` es el corazón de todo. Sumar repetidamente un punto consigo mismo se llama **multiplicación escalar**: el punto `kG` significa "`G` sumado consigo mismo `k` veces".

Ahora viene la magia. Considera las dos direcciones:

| Dirección | Pregunta | Dificultad |
|---|---|---|
| **Hacia delante** | Dados `k` y `G`, calcular `kG` | **Fácil.** Incluso para `k` astronómicamente grandes, un truco llamado *double-and-add* llega allí en unos pocos cientos de pasos |
| **Hacia atrás** | Dados `G` y `kG`, recuperar `k` | **Efectivamente imposible** en una curva criptográfica real |

Esa asimetría es la **calle de un solo sentido** que necesitábamos en la Sección 1. El problema inverso ("¿qué `k` produjo este punto?") se llama el **Problema del Logaritmo Discreto en Curvas Elípticas (ECDLP)**, y en las curvas que usa Zcash, ningún método conocido lo resuelve antes de la muerte térmica del universo.

![texto alternativo](image-12.png)

> En nuestra curva de juguete `F_17` sí *podrías* simplemente leer `k` de la tabla, porque solo tiene 19 puntos. Las curvas reales tienen alrededor de `2^(255)` puntos. La tabla tendría más filas que átomos hay en el universo, así que "leerlo de la tabla" no es una opción. Ese tamaño pequeño es lo que hace que la curva de juguete sea enseñable y también por qué no es segura.

---

## 5. Cómo nacen las claves (la recompensa)

Ahora ya tenemos todo lo necesario para explicar una clave criptográfica real, y es sorprendentemente simple:

> **Elige un número secreto `k`. Publica el punto `kG`. Eso es todo.**
> `k` es tu **clave privada**. `kG` es tu **clave pública**. La calle de un solo sentido (ECDLP) garantiza que nadie puede hacer retroceder `kG` hasta `k`.

Esta única idea, *una clave pública es un escalar secreto multiplicado por un generador fijo*, es la semilla de las spending keys, viewing keys y direcciones de Zcash. El árbol completo de claves añade más estructura por encima, pero cada rama crece desde esta raíz.

### Extra: por qué los puntos de curva son compromisos perfectos

Recuerda el "sobre sellado" (compromiso) del Artículo 0, que tenía que **ocultar** su contenido y, al mismo tiempo, ser **imposible de falsificar**. Las curvas elípticas nos ofrecen una forma limpia de construir uno. Toma dos puntos generadores públicos y fijos `G` y `H`, un valor secreto `v` y un número aleatorio de cegado `r`, y forma:

```
Commitment  =  v.G  +  r.H
```

Esto es un **compromiso de Pedersen**, y tiene las dos propiedades que queríamos:

- **Ocultación:** el valor aleatorio `r` dispersa el resultado por toda la curva, así que el punto no revela nada sobre `v`.
- **Vinculación:** el ECDLP hace inviable encontrar un `(v, r)` *distinto* que dé el mismo punto, así que no puedes cambiar de idea sobre aquello a lo que te comprometiste.

Una propiedad extra resulta no tener precio más adelante: estos compromisos **se suman**. El compromiso de `v_1` más el compromiso de `v_2` es un compromiso válido de `v_1 + v_2`. Ese comportamiento "homomórfico" es la forma en que Zcash demostrará más adelante que el dinero que entra *en* una transacción es igual al dinero que sale, sin revelar ninguna cantidad. Cobraremos ese valor hacia el Artículo 6.

---

## 6. Dónde vive esto en Zcash

Las huellas son concretas y comprobables.

| Diseño de Zcash | Curvas que usa | Papel |
|---|---|---|
| **Sapling** (más antiguo) | **BLS12-381** más una curva incrustada llamada **Jubjub** | BLS12-381 lleva el sistema de pruebas; Jubjub está construida sobre el campo escalar de BLS12-381 para que las operaciones de claves y compromisos sean baratas de ejecutar *dentro* de una prueba de conocimiento cero |
| **Orchard** (actual) | **Pallas** y **Vesta** (el ciclo "Pasta") | Pallas lleva las claves y compromisos de Orchard; el emparejamiento Pallas/Vesta está especialmente dispuesto para hacer eficientes las pruebas avanzadas |

Las razones por las que una curva se "incrusta" dentro del campo de otra, y por las que un *ciclo* de dos curvas es útil, son reales e importantes, pero pertenecen a los artículos sobre sistemas de prueba. Por ahora, la conclusión es sólida: **cada clave de Zcash es un escalar multiplicado por un generador, y cada compromiso de Zcash es una suma de puntos de curva**, que viven en una de estas curvas con nombre.

![texto alternativo](image-13.png)

---

## 7. Una advertencia honesta

Se hicieron algunas simplificaciones para mantener esto legible. Usamos la forma **Weierstrass corta** (`y^2 = x^3 + ax + b`); las curvas de Zcash a menudo se escriben en otras formas equivalentes (Jubjub es una curva *twisted Edwards*) elegidas por eficiencia y seguridad, pero la idea de grupo es idéntica. No definimos las fórmulas exactas de suma de puntos (son la versión algebraica de "tercera intersección y luego reflejar"), y dejamos de lado sutilezas como el orden de la curva, los cofactors y los "pairings", que se vuelven importantes en los artículos sobre sistemas de prueba. Nada de esto cambia la intuición; la afina.

---

## 8. Resumen

- Un sistema de privacidad necesita una **calle de un solo sentido**: fácil hacia delante, inviable hacia atrás. Las curvas elípticas proporcionan una.
- Una **curva elíptica** es el conjunto de puntos que satisfacen `y^2 = x^3 + ax + b`, y sus puntos pueden **sumarse** mediante la regla geométrica de **cuerda y tangente**, con un **punto en el infinito** especial que actúa como cero.
- Sobre un **campo finito**, la curva se convierte en una dispersión de puntos, pero la misma suma sigue funcionando y los puntos forman un **grupo**. (Ejemplo verificado: `y^2 = x^3 + 2x + 2` sobre `F_17` tiene 19 puntos, y `G = (5,1)` los genera todos.)
- La **multiplicación escalar** `kG` es fácil de calcular pero inviable de revertir: el **ECDLP**. Esa es la trampa.
- **Claves:** clave privada `k`, clave pública `kG`. **Compromisos:** forma de Pedersen `v.G + r.H`, que oculta, vincula y además **se suma** convenientemente.
- En **Zcash**, Sapling usa **BLS12-381 + Jubjub** y Orchard usa las curvas **Pallas/Vesta (Pasta)**; toda clave y todo compromiso viven sobre ellas.

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Curva elíptica** | Puntos que satisfacen `y^2 = x^3 + ax + b`, con una "suma" especial de puntos |
| **Suma de puntos** | La regla de cuerda y tangente: línea a través de dos puntos, tomar el tercer cruce, reflejar |
| **Punto en el infinito (`O`)** | El "cero" de la curva; sumarlo no cambia nada |
| **Generador (`G`)** | Un punto base cuyos múltiplos acaban cubriendo todo el grupo |
| **Multiplicación escalar (`kG`)** | Sumar `G` consigo mismo `k` veces; fácil hacia delante, difícil de revertir |
| **ECDLP** | El problema difícil de recuperar `k` a partir de `kG`; la base de la seguridad |
| **Compromiso de Pedersen** | `v.G + r.H`; un sobre sellado que oculta, vincula y se suma |

---

## Preguntas frecuentes

**¿Por qué curvas en lugar de simplemente números grandes módulo un primo?**
Ambos pueden proporcionar una calle de un solo sentido, pero las curvas elípticas alcanzan la misma seguridad con claves mucho más pequeñas y operaciones más rápidas, y su aritmética de puntos es ideal para compromisos.

**¿Está demostrado que el ECDLP es difícil?**
No está *demostrado* que sea imposible, pero décadas de esfuerzo intenso no han encontrado ningún ataque eficiente contra curvas bien elegidas. La seguridad descansa sobre esa suposición bien comprobada.

**¿Podría una computadora cuántica romper esto?**
Una computadora cuántica lo bastante grande podría romper el ECDLP. Es una preocupación conocida a largo plazo en toda la industria y un área activa de investigación; las curvas actuales siguen siendo seguras frente a computadoras clásicas.

**¿Por qué Zcash usa más de una curva?**
Distintos trabajos. Una curva lleva el sistema de pruebas de conocimiento cero; otra (incrustada en el campo de la primera) hace eficientes las operaciones de claves y compromisos dentro de la prueba. Los próximos artículos explican por qué esa combinación importa.

---

### Pon a prueba tu intuición

Usando la tabla verificada de la Sección 3, ¿qué es `9G + 10G` en nuestra curva de juguete? ¿Y qué te dice la respuesta sobre `G`? *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

`9 + 10 = 19`, y vimos que `19G = O`, el punto en el infinito. Así que `9G + 10G = O`. Esto significa que `10G` es el **negativo** (inverso aditivo) de `9G`: dos puntos que suman el punto "cero". En una curva, el negativo de un punto es simplemente su imagen especular respecto del eje x, y de hecho `9G = (7,6)` y `10G = (7,11)` comparten la misma `x` y tienen valores de `y` que suman `17 = 0 (mod 17)`. La estructura es perfectamente consistente, que es exactamente lo que garantiza "es un grupo".
</details>

---

### Qué sigue

**Artículo 3 . Hashing y compromisos:** vamos a abrir correctamente el "sobre sellado mágico". Ahora ya has visto una forma de construir un compromiso a partir de puntos de curva; a continuación preguntaremos qué significan realmente ocultación y vinculación, conoceremos las funciones hash y conectaremos ambas cosas con los compromisos de nota que anclan cada pago de Zcash.

*Parte de la serie* Zcash desde primeros principios *para [ZecHub](https://zechub.org). Licencia CC BY-SA 4.0.*
