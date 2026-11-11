# Curvas elípticas: donde nacen las claves y los compromisos de Zcash
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-10-c1097b22d7.webp)

### Una calle de sentido único construida con puntos de una curva

> **Serie:** *Zcash desde primeros principios* . **Artículo 2 . Curvas elípticas**
> **Público:** principiantes. Solo asumimos [Artículo 1 (campos finitos)](article-1-finite-fields.md): aritmética que se envuelve módulo un primo. No se necesita ningún otro conocimiento previo.
> **Con qué te quedarás:** una imagen intuitiva y correcta de las curvas elípticas, la «trampa» que las hace útiles y exactamente cómo Zcash las convierte en claves y compromisos.

[Artículo 1](article-1-finite-fields.md) nos dio un terreno de juego perfecto para la aritmética: el campo finito. Pero un campo por sí solo son solo números. Para construir claves y los «sobres sellados» de [Artículo 0](article-0-shielded-transaction.md), Zcash necesita un objeto con un tipo especial de dificultad unidireccional: fácil de calcular hacia delante, prácticamente imposible de invertir. Ese objeto es una **curva elíptica [elliptic curve]**. Este artículo la construye desde cero, con intuición antes que álgebra.

---

## 1. ¿Por qué debería importarte?

Todo sistema de privacidad [privacy] necesita una **calle de sentido único [one-way street]**: una operación que sea trivial de recorrer hacia delante y prácticamente imposible de recorrer hacia atrás.

Esta es la razón. Tu **clave secreta [secret key]** es un número que mantienes oculto. Tu **clave pública [public key]** (y tu dirección [address]) se deriva de ella y se muestra al mundo. Toda la seguridad del sistema descansa sobre un hecho: *dada la clave pública, nadie puede retroceder hasta tu clave secreta.* Si pudiera, podría gastar tu dinero.

Así que necesitamos una operación matemática en la que:

- Ir **hacia delante** (secreto -> público) sea rápido y fácil, pero
- Ir **hacia atrás** (público -> secreto) sea tan difícil que todos los ordenadores de la Tierra trabajando durante la vida del universo no terminarían.

La multiplicación simple en campos finitos no es suficiente; la división la deshace al instante (ese era el punto entero del Artículo 1). Necesitamos algo sin un botón fácil de «deshacer». Las curvas elípticas proporcionan exactamente eso y, como ventaja adicional, sus puntos se combinan de una manera perfecta para construir compromisos. Veamos cómo.

---

## 2. La intuición: una curva cuyos puntos puedes «sumar»

Olvida la criptografía por un momento. Una **curva elíptica** es simplemente el conjunto de puntos `(x, y)` que satisfacen una ecuación de la forma:

```
y^2 = x^3 + ax + b
```

Sobre números ordinarios parece una curva suave y ondulante, a menudo con un bucle redondeado y dos colas:

![alt text](/content-images/image-14-1d2e8c25d2.webp)

La parte realmente sorprendente: **puedes «sumar» dos puntos de esta curva para obtener un tercer punto de la misma curva.** Esto no es una suma ordinaria de coordenadas. Es una regla geométrica, y es más fácil *verla* que explicarla.

### La regla de la cuerda (sumar dos puntos distintos)

Para sumar `P + Q`:

1. Dibuja una línea recta a través de `P` y `Q`.
2. Esa línea corta la curva en exactamente un lugar más. Llámalo `R*`.
3. **Refleja `R*` respecto al eje horizontal.** Ese reflejo es la respuesta, `P + Q`.

![alt text](/content-images/image-11-61f3df1989.webp)

### La regla de la tangente (sumar un punto a sí mismo)

Para calcular `P + P` (escrito `2P`), no hay un segundo punto a través del cual dibujar una línea, así que usa en su lugar la línea **tangente [tangent]** en `P` y luego sigue la misma receta de «tercera intersección, luego reflejar».

Esa es toda la operación. Dos reglas geométricas. Con ellas, los puntos de una curva elíptica forman lo que los matemáticos llaman un **grupo [group]**: un conjunto con una «suma» que se comporta correctamente. Incluso tiene un «cero».

### El punto en el infinito (el cero de la curva)

Todo sistema numérico necesita un `0`, aquello que no cambia nada al sumarlo. En una curva elíptica, ese papel lo desempeña un punto especial adicional llamado el **punto en el infinito [point at infinity]**, escrito `O`. Puedes imaginarlo como «infinitamente arriba», el lugar donde se encuentran las líneas verticales. Sumar `O` a cualquier punto lo deja sin cambios, exactamente igual que sumar `0`.

---

## 3. De imágenes a un campo finito

La curva suave de arriba es la *intuición*. Pero Zcash no usa números reales (se redondean y filtran tamaño, según el Artículo 1). Usa una curva elíptica **sobre un campo finito [finite field]**: la misma ecuación `y^2 = x^3 + ax + b`, pero con toda la aritmética hecha módulo un primo.

Cuando haces eso, la bonita curva se rompe en una **dispersión de puntos desconectados**, un punto por cada par `(x, y)` que satisface la ecuación módulo `p`. Deja de parecer una curva en absoluto. Pero aquí está lo crucial:

> **El álgebra de la regla de la cuerda y la tangente sigue funcionando perfectamente.** Las mismas fórmulas que encontraban `P + Q` geométricamente ahora lo calculan con aritmética de campos finitos. Los puntos siguen formando un grupo, con el mismo `0` (el punto en el infinito).

Hagamos esto real con un ejemplo diminuto y completamente verificado.

### Una curva completa, calculada exactamente

Toma `y^2 = x^3 + 2x + 2` sobre el campo finito `F_17`. Calcular cada punto válido da exactamente **18 puntos, más el punto en el infinito = 19 en total.** Algunos de ellos:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Ahora elige el punto `G = (5, 1)` y sigue sumándolo a sí mismo. Observa lo que ocurre (cada línea de abajo fue calculada, no adivinada):

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

Dos cosas que debes notar:

- **Visita los 18 puntos finitos y luego llega a `O`** en el paso 19; después se repetiría para siempre. El punto inicial `G` «genera» todo el grupo, así que lo llamamos un **generador [generator]**.
- Es un grupo verificado: por ejemplo, `1G + 2G = (5,1) + (6,3) = (10,6)`, que es exactamente `3G`. La suma es internamente consistente, tal como exige un grupo.

---

## 4. La trampa: multiplicación escalar

Esa tabla de `1G, 2G, 3G, ...` es el corazón de todo. Sumar repetidamente un punto a sí mismo se llama **multiplicación escalar [scalar multiplication]**: el punto `kG` significa «`G` sumado a sí mismo `k` veces».

Ahora la magia. Considera las dos direcciones:

| Dirección | Pregunta | Dificultad |
|---|---|---|
| **Hacia delante** | Dados `k` y `G`, calcula `kG` | **Fácil.** Incluso para `k` astronómicamente grande, un truco llamado *double-and-add* llega allí en unos pocos cientos de pasos |
| **Hacia atrás** | Dados `G` y `kG`, recupera `k` | **Efectivamente imposible** en una curva criptográfica real |

Esa asimetría es la **calle de sentido único** que necesitábamos en la Sección 1. El problema inverso («¿qué `k` produjo este punto?») se llama el **Problema del Logaritmo Discreto de Curvas Elípticas [Elliptic Curve Discrete Logarithm Problem] (ECDLP)** y, en las curvas que usa Zcash, ningún método conocido lo resuelve antes de la muerte térmica del universo.

![alt text](/content-images/image-12-86b9ace6cb.webp)

> En nuestra curva de juguete `F_17` podrías simplemente leer `k` de la tabla, porque solo tiene 19 puntos. Las curvas reales tienen alrededor de `2^(255)` puntos. La tabla tendría más filas que átomos hay en el universo, por lo que «leerlo» no es una opción. Su pequeñez es lo que hace que la curva de juguete sea enseñable y también la razón por la que no es segura.

---

## 5. Cómo nacen las claves (la recompensa)

Ahora tenemos todo lo necesario para explicar una clave criptográfica real, y es sorprendentemente sencillo:

> **Elige un número secreto `k`. Publica el punto `kG`. Eso es todo.**
> `k` es tu **clave privada [private key]**. `kG` es tu **clave pública**. La calle de sentido único (ECDLP) garantiza que nadie puede llevar `kG` de vuelta a `k`.

Esta única idea, *una clave pública es un escalar secreto multiplicado por un generador fijo*, es la semilla de las claves de gasto, claves de visualización y direcciones de Zcash. El árbol completo de claves añade más estructura encima, pero cada rama crece desde esta raíz.

### Extra: por qué los puntos de curva son compromisos perfectos

Recuerda el «sobre sellado» (compromiso [commitment]) del Artículo 0, que debía **ocultar** su contenido y, a la vez, ser **imposible de falsificar**. Las curvas elípticas nos dan una forma limpia de construir uno. Toma dos puntos generadores fijos y públicos `G` y `H`, un valor secreto `v` y un número de cegamiento aleatorio `r`, y forma:

```
Commitment  =  v.G  +  r.H
```

Este es un **compromiso de Pedersen [Pedersen commitment]**, y tiene las dos propiedades que queríamos:

- **Ocultamiento [hiding]:** el `r` aleatorio dispersa el resultado por toda la curva, así que el punto no revela nada sobre `v`.
- **Vinculación [binding]:** el ECDLP hace inviable encontrar un `(v, r)` *diferente* que dé el mismo punto, así que no puedes cambiar de opinión sobre aquello a lo que te comprometiste.

Una propiedad adicional resulta ser invaluable más adelante: estos compromisos **se suman**. El compromiso de `v_1` más el compromiso de `v_2` es un compromiso válido de `v_1 + v_2`. Ese comportamiento «homomórfico» es como Zcash demostrará más adelante que el dinero que entra *en* una transacción es igual al dinero que sale, sin revelar ninguna cantidad. Lo aprovecharemos alrededor del Artículo 6.

---

## 6. Dónde vive esto en Zcash

Las huellas son concretas y comprobables.

| Diseño de Zcash | Curvas que usa | Función |
|---|---|---|
| **Sapling** (anterior) | **BLS12-381** más una curva incorporada llamada **Jubjub** | BLS12-381 lleva el sistema de pruebas; Jubjub está construida sobre el campo escalar de BLS12-381 para que las operaciones de claves y compromisos sean baratas de realizar *dentro* de una prueba zero-knowledge |
| **Orchard** (actual) | **Pallas** y **Vesta** (el ciclo «Pasta») | Pallas lleva las claves y compromisos de Orchard; el emparejamiento Pallas/Vesta está dispuesto especialmente para hacer eficientes las pruebas avanzadas |

Las razones por las que una curva se «incorpora» dentro del campo de otra y por las que un *ciclo* de dos curvas es útil son reales e importantes, pero pertenecen a los artículos sobre sistemas de pruebas. Por ahora, la conclusión es sólida: **cada clave de Zcash es un escalar multiplicado por un generador, y cada compromiso de Zcash es una suma de puntos de curva**, que vive en una de estas curvas con nombre.

![alt text](/content-images/image-13-ffdd703c60.webp)

---

## 7. Una aclaración honesta

Algunas simplificaciones mantuvieron esto legible. Usamos la forma de **Weierstrass corta [short Weierstrass]** (`y^2 = x^3 + ax + b`); las curvas de Zcash suelen escribirse en otras formas equivalentes (Jubjub es una curva *twisted Edwards*) elegidas por eficiencia y seguridad, pero la idea de grupo es idéntica. No definimos las fórmulas exactas de suma de puntos (son la versión algebraica de «tercera intersección, luego reflejar») y dejamos de lado sutilezas como el orden de la curva, los cofactores y los «emparejamientos», que se vuelven importantes en los artículos sobre sistemas de pruebas. Nada de esto cambia la intuición; la afina.

---

## 8. Resumen

- Un sistema de privacidad necesita una **calle de sentido único**: fácil hacia delante, inviable hacia atrás. Las curvas elípticas proporcionan una.
- Una **curva elíptica** es el conjunto de puntos que satisfacen `y^2 = x^3 + ax + b`, y sus puntos pueden **sumarse** mediante la regla geométrica de la **cuerda y la tangente [chord-and-tangent]**, con un **punto en el infinito** especial que actúa como cero.
- Sobre un **campo finito** la curva se convierte en una dispersión de puntos, pero la misma suma sigue funcionando y los puntos forman un **grupo**. (Ejemplo verificado: `y^2 = x^3 + 2x + 2` sobre `F_17` tiene 19 puntos, y `G = (5,1)` los genera todos.)
- La **multiplicación escalar** `kG` es fácil de calcular pero inviable de invertir: el **ECDLP**. Esa es la trampa.
- **Claves:** clave privada `k`, clave pública `kG`. **Compromisos:** forma de Pedersen `v.G + r.H`, que oculta, vincula y convenientemente **se suma**.
- En **Zcash**, Sapling usa **BLS12-381 + Jubjub** y Orchard usa las curvas **Pallas/Vesta (Pasta)**; cada clave y compromiso vive en ellas.

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Elliptic curve** | Puntos que satisfacen `y^2 = x^3 + ax + b`, con una «suma» especial de puntos |
| **Point addition** | La regla de la cuerda y la tangente: línea a través de dos puntos, toma el tercer corte, refleja |
| **Point at infinity (`O`)** | El «cero» de la curva; sumarlo no cambia nada |
| **Generator (`G`)** | Un punto base cuyos múltiplos terminan cubriendo todo el grupo |
| **Scalar multiplication (`kG`)** | Sumar `G` a sí mismo `k` veces; fácil hacia delante, difícil de invertir |
| **ECDLP** | El problema difícil de recuperar `k` a partir de `kG`; el fundamento de seguridad |
| **Pedersen commitment** | `v.G + r.H`; un sobre sellado que oculta, vincula y se suma |

---

## Preguntas frecuentes

**¿Por qué curvas en lugar de solo números grandes módulo un primo?**
Ambos pueden proporcionar una calle de sentido único, pero las curvas elípticas logran la misma seguridad con claves mucho más pequeñas y operaciones más rápidas, y su aritmética de puntos es ideal para compromisos.

**¿Está demostrado que el ECDLP sea difícil?**
No está *demostrado* que sea imposible, pero décadas de esfuerzo intenso no han encontrado ningún ataque eficiente contra curvas bien elegidas. La seguridad se basa en esa suposición ampliamente comprobada.

**¿Podría un ordenador cuántico romper esto?**
Un ordenador cuántico suficientemente grande podría romper el ECDLP. Esa es una preocupación conocida a largo plazo en toda la industria y un área activa de investigación; las curvas actuales siguen siendo seguras frente a ordenadores clásicos.

**¿Por qué Zcash usa más de una curva?**
Trabajos diferentes. Una curva lleva el sistema de pruebas zero-knowledge; otra (incorporada en el campo de la primera) hace eficientes las operaciones de claves y compromisos dentro de la prueba. Los próximos artículos explican por qué importa ese emparejamiento.

---

### Pon a prueba tu intuición

Usando la tabla verificada de la Sección 3, ¿cuánto es `9G + 10G` en nuestra curva de juguete? ¿Y qué te dice la respuesta sobre `G`? *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

`9 + 10 = 19`, y vimos que `19G = O`, el punto en el infinito. Por tanto, `9G + 10G = O`. Esto significa que `10G` es el **negativo [negative]** (inverso aditivo) de `9G`: dos puntos que se suman al punto «cero». En una curva, el negativo de un punto es simplemente su imagen especular respecto al eje x y, de hecho, `9G = (7,6)` y `10G = (7,11)` comparten la misma `x` y tienen valores de `y` que suman `17 = 0 (mod 17)`. La estructura es perfectamente consistente, que es exactamente lo que garantiza «es un grupo».
</details>

---

### Lo siguiente

**Artículo 3 . Hashing y compromisos:** abriremos correctamente el «sobre sellado mágico». Ya has visto una forma de construir un compromiso a partir de puntos de curva; a continuación preguntaremos qué significan realmente ocultamiento y vinculación, conoceremos las funciones hash y conectaremos ambos conceptos con los compromisos de notas que anclan cada pago de Zcash.

*Parte de la serie* Zcash desde primeros principios *para [ZecHub](https://zechub.org). Con licencia CC BY-SA 4.0.*
