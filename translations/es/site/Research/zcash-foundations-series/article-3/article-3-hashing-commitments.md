# Hashing y Compromisos: El sobre sellado mágico
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![texto alternativo](image-15.png)

### Cómo guardar un secreto en público y no poder mentir jamás sobre él

> **Serie:** *Zcash desde primeros principios* . **Artículo 3 . Hashing y compromisos**
> **Público:** personas recién llegadas. Nos basamos en el [Artículo 1 (campos finitos)](article-1-finite-fields.md) y el [Artículo 2 (curvas elípticas)](article-2-elliptic-curves.md), pero la intuición se sostiene por sí sola.
> **Con qué te irás:** una comprensión clara de las funciones hash, de lo que realmente significan "ocultamiento" y "vinculación", y de cómo Zcash construye los compromisos de notas que anclan cada pago privado.

En el [Artículo 0](article-0-shielded-transaction.md) describimos un "sobre sellado mágico": algo que puedes fijar en un tablero público que demuestra que existe un sobre mientras oculta lo que hay dentro, y que además nunca puedes sustituir más tarde. Prometimos explicar cómo es posible algo así. Este es ese artículo. Necesitamos dos ingredientes: **funciones hash** y **compromisos**.

---

## 1. ¿Por qué debería importarte?

Imagina que predices el resultado de una elección y quieres demostrar, *después*, que lo anticipaste con antelación. No puedes simplemente anunciar tu predicción (eso influye en la gente o invita a acusaciones de que la cambiaste). Y tampoco puedes mantenerla totalmente en secreto (entonces no podrás demostrar nada más adelante).

Lo que quieres es una forma de **fijar un valor ahora, en público, de modo que:**

- nadie pueda saber qué fijaste (por ahora permanece en secreto), y
- más tarde, cuando lo reveles, **no puedas mentir** sobre cuál era.

Este mecanismo de "bloquear ahora, revelar después, sin mentiras" se llama **compromiso**, y está en todas partes en Zcash. El valor y el propietario de una nota quedan bloqueados en un compromiso en el momento en que se crea la nota. Para construir compromisos, primero necesitamos su caballo de batalla: la función hash.

---

## 2. La intuición: una huella dactilar para los datos

Una **función hash** toma cualquier dato, desde una sola letra hasta una biblioteca entera, y lo aplasta hasta convertirlo en una cadena corta de tamaño fijo llamada **digest** o **hash**. Piensa en ello como una **huella dactilar de los datos.**

![texto alternativo](image-16.png)

Una buena huella dactilar criptográfica tiene cuatro propiedades. Mantenlas como intuiciones, no como ecuaciones:

| Propiedad | Significado sencillo | Por qué importa |
|---|---|---|
| **Determinista** | La misma entrada siempre da la misma huella dactilar | Puedes volver a comprobar una huella dactilar en cualquier momento |
| **Rápida hacia adelante** | Calcular la huella dactilar es rápido | Es práctica para usarla en todas partes |
| **De una sola dirección (resistente a preimagen)** | Dada una huella dactilar, no puedes encontrar la entrada que la produjo | Oculta los datos originales |
| **Resistente a colisiones** | No puedes encontrar dos entradas distintas con la misma huella dactilar | Nadie puede falsificar una coincidencia |

Y un comportamiento más que hace que las huellas dactilares parezcan casi mágicas:

### El efecto avalancha (verificado)

Cambia la entrada en la cantidad más mínima y la huella dactilar cambia *por completo*, sin ningún parecido con la anterior. Aquí tienes dos huellas SHA-256 reales de mensajes que difieren en un solo carácter:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

De 64 dígitos hexadecimales, **59 son distintos.** Un solo carácter entra y sale una huella dactilar completamente no relacionada. Por eso no puedes empujar una entrada hacia una huella dactilar objetivo: no hay ninguna señal de "más caliente / más frío" que seguir.

---

## 3. De la huella dactilar al compromiso

Aquí va una idea tentadora pero defectuosa: para comprometerte con un valor secreto `v`, simplemente publica su huella dactilar `H(v)`.

Esto te *vincula* muy bien (no puedes afirmar después un `v` distinto, porque eso requeriría una colisión). Pero **falla al ocultar.** Si el conjunto de valores posibles es pequeño, un atacante simplemente calcula la huella de cada candidato y compara. ¿Comprometerte con "sí" o "no"? Calculan ambos hashes y descubren al instante cuál elegiste. El determinismo, que hace un momento era nuestro amigo, ahora está filtrando el secreto.

La solución se resume en una palabra: **aleatoriedad.**

> **Un compromiso es la huella dactilar de tu valor mezclada con un número aleatorio nuevo:**
> `commitment = H(v, r)` donde `r` es un valor aleatorio secreto de "cegado".

Ahora el mismo `v` produce un compromiso de aspecto distinto cada vez, porque `r` es distinto. Las dos propiedades que queríamos por fin se cumplen a la vez:

![texto alternativo](image-17.png)

Para **abrir** (revelar) el compromiso más tarde, publicas `v` y `r`; cualquiera vuelve a calcular `H(v, r)` y comprueba que coincide. Quedas fijado. Ese es el sobre sellado mágico del Artículo 0, hecho realidad.

> **Dos ideas clave para recordar siempre:** *binding* proviene de que el hash sea resistente a colisiones; *hiding* proviene del factor de cegado aleatorio `r`.

---

## 4. Dos formas de construir el sobre

Hay dos recetas comunes, y Zcash usa ambas.

| | **Compromiso basado en hash** | **Compromiso de Pedersen** (del Artículo 2) |
|---|---|---|
| Receta | `H(v, r)` | `v.G + r.H` (puntos en una curva) |
| El ocultamiento viene de | el `r` aleatorio | el `r` aleatorio |
| La vinculación viene de | resistencia a colisiones | la trampa de la curva elíptica (ECDLP) |
| Poder especial | simple y rápido | los compromisos **se suman** (homomórfico) |

Esa última fila es la razón por la que los compromisos de Pedersen importan tanto en Zcash. Como `commit(v_1) + commit(v_2)` es un `commit(v_1 + v_2)` válido, el protocolo puede demostrar después que **el dinero que entra es igual al dinero que sale** sumando compromisos, todo ello sin revelar ni una sola cantidad. Guardamos ese hecho para el Artículo 6.

---

## 5. Una sutileza que da forma a todo Zcash: el hashing amigable con ZK

Aquí hay una idea que la mayoría de las introducciones pasan por alto, y es precisamente el punto "matemáticas se encuentran con ingeniería" que vale la pena destacar.

SHA-256 es una huella dactilar excelente para la computación cotidiana. Pero Zcash no solo *calcula* hashes; también tiene que **demostrar, dentro de una prueba de conocimiento cero, que un hash se calculó correctamente** (el Artículo 5 explica por qué). Y aquí está la trampa: una prueba de conocimiento cero funciona en el lenguaje de la **aritmética de campos finitos** (Artículo 1), mientras que SHA-256 está construido a partir de operaciones de manipulación de bits (desplazamientos, ANDs, XORs). Expresar toda esa manipulación de bits en aritmética de campos es enormemente costoso, lo que hace que las pruebas sean enormes y lentas.

Así que los criptógrafos de Zcash diseñaron funciones hash cuyos mecanismos internos *ya son* aritmética de campos, lo que las hace baratas de demostrar:

![texto alternativo](image-18.png)

Esta única presión de ingeniería, *"debe ser barato de demostrar"*, es la razón por la que Zcash inventó y adoptó funciones hash especiales en lugar de recurrir a SHA-256 para todo.

---

## 6. Dónde vive esto en Zcash

Zcash ha usado distintos hashes en sus diseños, cada uno elegido para su función:

| Diseño | Hashes usados | Dónde |
|---|---|---|
| **Sprout** (el primero) | **SHA-256** | Compromisos de notas y el árbol |
| **Sapling** | **Hashes de Pedersen**, además de **BLAKE2** | Pedersen para compromisos de notas y el árbol de Merkle; BLAKE2 para derivación de claves y nullifiers |
| **Orchard** (actual) | **Sinsemilla**, además de **Poseidon** | Sinsemilla para compromisos de notas y el árbol de Merkle; Poseidon para el nullifier, todo diseñado para circuitos aritméticos |

Los nombres que debes reconocer son **Pedersen** y **Sinsemilla** (hashes de estilo compromiso construidos a partir de puntos de curva, por lo que heredan el superpoder de "sumarse" y se demuestran de forma barata) y **Poseidon** (un hash de aritmética de campos creado específicamente para circuitos de conocimiento cero). Cuando el Artículo 0 dijo que el contenido de una nota queda sellado en un compromiso, *esta* es la maquinaria que realiza ese sellado.

Así que el bucle abierto del Artículo 0, *"¿cómo puede un sobre sellado ocultar su contenido y al mismo tiempo ser imposible de falsificar?"*, ahora queda cerrado: **ocultamiento gracias a un factor de cegado aleatorio, vinculación gracias a la resistencia a colisiones o a la trampa de la curva.**

---

## 7. Una advertencia honesta

Simplificamos para mantener la claridad. Los esquemas de compromiso reales especifican exactamente cómo se codifican `v` y `r` y qué generadores se usan; tanto "hiding" como "binding" vienen en variantes (perfecto frente a computacional) con definiciones de seguridad precisas; y no mostramos los mecanismos internos de Pedersen, Sinsemilla o Poseidon. Nada de eso cambia la intuición: un compromiso es una huella dactilar más aleatoriedad que oculta ahora y vincula para siempre. Los detalles volverán, señalados, cuando el artículo sobre el protocolo los necesite.

---

## 8. Resumen

- Una **función hash** es una **huella dactilar para los datos**: determinista, rápida hacia adelante, de una sola dirección, resistente a colisiones, con **efecto avalancha** (entra un bit y sale una huella dactilar totalmente distinta).
- Un **compromiso** te permite **fijar un valor en público ahora y revelarlo más tarde sin poder mentir sobre él.**
- Publicar una huella dactilar desnuda `H(v)` vincula pero **no** oculta. Añadir un factor de cegado aleatorio, `H(v, r)`, corrige eso: **ocultamiento gracias a `r`, vinculación gracias a la resistencia a colisiones.**
- Zcash usa tanto compromisos **basados en hash** como compromisos de **Pedersen**; además, los compromisos de Pedersen **se suman**, algo que el Artículo 6 aprovechará para demostrar el equilibrio de valor de forma privada.
- Como los hashes deben ser **demostrados** dentro de pruebas de conocimiento cero, Zcash usa hashes **amigables con ZK** construidos a partir de aritmética de campos (**Pedersen**, **Sinsemilla**, **Poseidon**) en lugar de SHA-256 para todo.

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Hash function** | Aplasta cualquier dato hasta convertirlo en una huella dactilar corta de tamaño fijo (digest) |
| **Digest** | La huella dactilar de salida de una función hash |
| **Preimage resistance** | No se puede revertir un digest para recuperar su entrada (de una sola dirección) |
| **Collision resistance** | No se pueden encontrar dos entradas con el mismo digest |
| **Avalanche effect** | Un cambio minúsculo en la entrada cambia por completo el digest |
| **Commitment** | Fija un valor ahora, revélalo después, sin poder mentir sobre él |
| **Blinding factor (`r`)** | El número aleatorio nuevo que hace que un compromiso oculte |
| **ZK-friendly hash** | Un hash construido con aritmética de campos para que sea barato de demostrar |

---

## FAQ

**¿Por qué no cifrar simplemente el valor en lugar de comprometerse con él?**
El cifrado trata de *secreto que luego puedes descifrar*. Un compromiso trata de *vinculación*: la garantía de que no puedes cambiar tu respuesta más tarde. Son trabajos distintos.

**Si los compromisos ocultan el valor, ¿cómo puede alguien comprobar las reglas?**
Ese es el papel de las pruebas de conocimiento cero (Artículo 5): demuestran que el valor oculto cumple las reglas sin revelarlo.

**¿SHA-256 está roto, ya que Zcash lo evita en algunos lugares?**
No. SHA-256 está bien y Zcash sigue usándolo. Simplemente es caro de *demostrar dentro de un circuito*, y por eso existen hashes amigables con ZK para ese trabajo específico.

**¿De dónde viene el `r` aleatorio y quién lo conserva?**
Se genera de nuevo cuando se crea la nota y lo conoce el propietario de la nota. Es parte de lo que hace que cada nota sea única y privada.

---

### Pon a prueba tu intuición

Te comprometes con tu predicción electoral como `H(v, r)` y la publicas. Un amigo insiste en que deberías publicar solo `H(v)` para mantenerlo más simple. En una frase, ¿por qué es una mala idea si solo hay dos resultados posibles? *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

Con solo dos resultados, tu amigo puede simplemente calcular `H("win")` y `H("lose")` por su cuenta y compararlos con el digest publicado, aprendiendo al instante cuál es tu predicción. El hash desnudo vincula pero no oculta; el `r` aleatorio es lo que detiene este ataque de adivinar y comprobar.
</details>

---

### Qué sigue

**Artículo 4 . Árboles de Merkle:** ahora tenemos millones de compromisos acumulándose. El Artículo 4 muestra cómo Zcash los organiza en un único árbol cuya pequeña huella dactilar raíz representa toda la historia, y cómo puedes demostrar que tu nota está en ese árbol sin revelar cuál es. Esa es la forma real del "tablero público" del Artículo 0.

*Parte de la serie* Zcash desde primeros principios *para [ZecHub](https://zechub.org). Licencia CC BY-SA 4.0.*
