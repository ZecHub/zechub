# Funciones hash [Hashing] y compromisos [Commitments]: El sobre sellado mágico
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-15-0c16784b27.webp)

### Cómo guardar un secreto en público y no poder mentir jamás sobre él

> **Serie:** *Zcash desde los primeros principios* . **Artículo 3 . Funciones hash y compromisos**
> **Audiencia:** principiantes. Nos basamos en [Artículo 1 (campos finitos)](article-1-finite-fields.md) y [Artículo 2 (curvas elípticas)](article-2-elliptic-curves.md), pero la intuición se sostiene por sí sola.
> **Con qué te quedarás:** una comprensión clara de las funciones hash, de lo que realmente significan «ocultamiento» y «vinculación», y de cómo Zcash construye los compromisos de notas que anclan cada pago privado.

En [Artículo 0](article-0-shielded-transaction.md) describimos un «sobre sellado mágico»: algo que puedes fijar a un tablero público y que demuestra que existe un sobre mientras oculta lo que contiene, y que nunca puedes sustituir después. Prometimos explicar cómo es posible tal cosa. Este es ese artículo. Necesitamos dos ingredientes: **funciones hash** y **compromisos**.

---

## 1. ¿Por qué debería importarte?

Imagina que predices el resultado de unas elecciones y quieres demostrar, *después*, que lo anticipaste. No puedes simplemente anunciar tu predicción (eso influye a las personas o invita a acusaciones de que la cambiaste). Tampoco puedes mantenerla completamente secreta (entonces no podrás demostrar nada más tarde).

Lo que quieres es una forma de **fijar un valor ahora, en público, de modo que:**

- Nadie pueda saber qué fijaste (por ahora permanece secreto), y
- Más tarde, cuando lo reveles, **no puedas mentir** sobre cuál era.

Este mecanismo de «fijar ahora, revelar después, sin mentiras» se llama **compromiso**, y está presente en todas partes de Zcash. El valor y el propietario de una nota quedan fijados en un compromiso en el momento en que se crea la nota. Para construir compromisos, primero necesitamos su herramienta principal: la función hash.

---

## 2. La intuición: una huella digital para los datos

Una **función hash** toma cualquier dato, una sola letra o una biblioteca entera, y lo reduce a una cadena corta de tamaño fijo llamada **resumen** o **hash**. Piensa en ella como una **huella digital para los datos.**

![alt text](/content-images/image-16-52fdf62c87.webp)

Una buena huella digital criptográfica tiene cuatro propiedades. Considéralas intuiciones, no ecuaciones:

| Propiedad | Significado sencillo | Por qué importa |
|---|---|---|
| **Determinista** | La misma entrada siempre genera la misma huella digital | Puedes volver a verificar una huella digital en cualquier momento |
| **Rápida de calcular** | Calcular la huella digital es rápido | Es práctico usarla en todas partes |
| **Unidireccional (resistente a la preimagen)** | Dada una huella digital, no puedes encontrar la entrada que la produjo | Oculta los datos originales |
| **Resistente a colisiones** | No puedes encontrar dos entradas distintas con la misma huella digital | Nadie puede falsificar una coincidencia |

Y un comportamiento más que hace que las huellas digitales parezcan casi mágicas:

### El efecto avalancha (verificado)

Cambia la entrada en la cantidad más mínima y la huella digital cambia *por completo*, sin parecerse a la anterior. Aquí hay dos huellas digitales SHA-256 reales de mensajes que difieren en un único carácter:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

De 64 dígitos hexadecimales, **59 son diferentes.** Un carácter de entrada, una huella digital completamente inconexa de salida. Por eso no puedes acercar gradualmente una entrada hacia una huella digital objetivo: no hay ninguna señal de «más caliente / más frío» que seguir.

---

## 3. De la huella digital al compromiso

Aquí hay una idea tentadora pero defectuosa: para comprometerte con un valor secreto `v`, simplemente publica su huella digital `H(v)`.

Esto te *vincula* bien (no puedes afirmar más tarde un `v` diferente, porque eso requeriría una colisión). Pero **no logra ocultarlo.** Si el conjunto de valores posibles es pequeño, un atacante simplemente calcula la huella digital de cada candidato y las compara. ¿Te comprometes con «sí» o «no»? Calculan el hash de ambos y averiguan al instante cuál elegiste. El determinismo, nuestro amigo hace un momento, ahora está filtrando el secreto.

La solución es una palabra: **aleatoriedad.**

> **Un compromiso es la huella digital de tu valor mezclada con un número aleatorio nuevo:**
> `commitment = H(v, r)` donde `r` es un valor secreto aleatorio de «cegado».

Ahora el mismo `v` produce un compromiso de aspecto diferente cada vez, porque `r` es diferente. Por fin se cumplen las dos propiedades que queríamos:

![alt text](/content-images/image-17-3ec4617665.webp)

Para **abrir** (revelar) el compromiso más tarde, publicas `v` y `r`; cualquiera vuelve a calcular `H(v, r)` y comprueba que coincide. Estás vinculado. Ese es el sobre sellado mágico del Artículo 0, hecho realidad.

> **Dos conclusiones para recordar siempre:** la *vinculación* procede de que el hash sea resistente a colisiones; el *ocultamiento* procede del factor de cegado aleatorio `r`.

---

## 4. Dos formas de construir el sobre

Hay dos recetas comunes, y Zcash utiliza ambas.

| | **Compromiso basado en hash** | **Compromiso de Pedersen** (del Artículo 2) |
|---|---|---|
| Receta | `H(v, r)` | `v.G + r.H` (puntos en una curva) |
| Ocultamiento mediante | el `r` aleatorio | el `r` aleatorio |
| Vinculación mediante | resistencia a colisiones | la trampa de la curva elíptica (ECDLP) |
| Poder especial | simple y rápido | los compromisos **se suman** (homomórficos) |

Esa última fila explica por qué los compromisos de Pedersen importan tanto en Zcash. Dado que `commit(v_1) + commit(v_2)` es un `commit(v_1 + v_2)` válido, el protocolo puede demostrar más tarde que **el dinero que entra equivale al dinero que sale** sumando compromisos, todo sin revelar una sola cantidad. Guardamos ese hecho para el Artículo 6.

---

## 5. Una sutileza que da forma a todo Zcash: hashing apto para ZK

Aquí hay una idea que la mayoría de las introducciones pasan por alto, y es exactamente el punto de «las matemáticas se encuentran con la ingeniería» que vale la pena destacar.

SHA-256 es una huella digital excelente para la informática cotidiana. Pero Zcash no solo *calcula* hashes; debe **demostrar, dentro de una prueba zero-knowledge, que un hash se calculó correctamente** (el Artículo 5 explica por qué). Y aquí está el problema: una prueba zero-knowledge trabaja en el lenguaje de la **aritmética de campos finitos** (Artículo 1), mientras que SHA-256 se basa en operaciones de manipulación de bits (desplazamientos, AND, XOR). Expresar toda esa manipulación de bits en aritmética de campos es enormemente costoso, lo que hace que las pruebas sean enormes y lentas.

Por eso los criptógrafos de Zcash diseñaron funciones hash cuyos componentes internos son *ya* aritmética de campos, lo que hace que sean baratas de demostrar:

![alt text](/content-images/image-18-89ade807ad.webp)

Esta única presión de ingeniería, *«debe ser barato de demostrar»*, explica por qué Zcash inventó y adoptó funciones hash especiales en lugar de recurrir a SHA-256 para todo.

---

## 6. Dónde vive esto en Zcash

Zcash ha utilizado distintos hashes en sus diseños, cada uno elegido para su función:

| Diseño | Hashes utilizados | Dónde |
|---|---|---|
| **Sprout** (el más antiguo) | **SHA-256** | Compromisos de notas y el árbol |
| **Sapling** | **Hashes de Pedersen**, además de **BLAKE2** | Pedersen para los compromisos de notas y el árbol de Merkle; BLAKE2 para la derivación de claves y los anuladores |
| **Orchard** (actual) | **Sinsemilla**, además de **Poseidon** | Sinsemilla para los compromisos de notas y el árbol de Merkle; Poseidon para el anulador, todos diseñados para circuitos aritméticos |

Los nombres que debes reconocer son **Pedersen** y **Sinsemilla** (hashes de estilo compromiso construidos a partir de puntos de curva, por lo que heredan el superpoder de «sumarse» y son baratos de demostrar) y **Poseidon** (un hash de aritmética de campos diseñado específicamente para circuitos zero-knowledge). Cuando el Artículo 0 dijo que el contenido de una nota queda sellado en un compromiso, *esta* es la maquinaria que realiza el sellado.

Así que el asunto pendiente del Artículo 0, *«¿cómo puede un sobre sellado ocultar su contenido y, aun así, ser imposible de falsificar?»*, ahora queda resuelto: **ocultamiento mediante un factor de cegado aleatorio, vinculación mediante resistencia a colisiones o la trampa de la curva.**

---

## 7. Una aclaración honesta

Simplificamos para mantener la claridad. Los esquemas de compromiso reales especifican exactamente cómo se codifican `v` y `r` y qué generadores se utilizan; «ocultamiento» y «vinculación» tienen cada uno variantes (perfecta frente a computacional) con definiciones precisas de seguridad; y no mostramos los detalles internos de Pedersen, Sinsemilla o Poseidon. Nada de eso cambia la intuición: un compromiso es una huella digital más aleatoriedad que oculta ahora y vincula para siempre. Los detalles regresarán, señalados, cuando el artículo del protocolo los necesite.

---

## 8. Resumen

- Una **función hash** es una **huella digital para los datos**: determinista, rápida de calcular, unidireccional, resistente a colisiones, con un **efecto avalancha** (un bit de entrada, una huella digital de salida totalmente distinta).
- Un **compromiso** te permite **fijar un valor en público ahora y revelarlo más tarde sin poder mentir.**
- Publicar una huella digital sin más `H(v)` vincula, pero **no** oculta. Añadir un factor de cegado aleatorio, `H(v, r)`, soluciona eso: **ocultamiento mediante `r`, vinculación mediante resistencia a colisiones.**
- Zcash utiliza compromisos **basados en hash** y de **Pedersen**; los compromisos de Pedersen además **se suman**, lo que el Artículo 6 aprovechará para demostrar el equilibrio de valor de forma privada.
- Puesto que los hashes deben ser **demostrados** dentro de pruebas zero-knowledge, Zcash utiliza hashes **aptos para ZK** construidos a partir de aritmética de campos (**Pedersen**, **Sinsemilla**, **Poseidon**) en lugar de SHA-256 para todo.

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Hash function** | Reduce cualquier dato a una huella digital corta de tamaño fijo (resumen) |
| **Digest** | La huella digital de salida de una función hash |
| **Preimage resistance** | No se puede revertir un resumen a su entrada (unidireccional) |
| **Collision resistance** | No se pueden encontrar dos entradas con el mismo resumen |
| **Avalanche effect** | Un pequeño cambio en la entrada cambia completamente el resumen |
| **Commitment** | Fija un valor ahora, revélalo después, no puedes mentir sobre él |
| **Blinding factor (`r`)** | El número aleatorio nuevo que hace que un compromiso oculte |
| **ZK-friendly hash** | Un hash construido a partir de aritmética de campos, por lo que es barato de demostrar |

---

## Preguntas frecuentes

**¿Por qué no cifrar simplemente el valor en lugar de comprometerse con él?**
El cifrado trata de *secreto que puedes descifrar más tarde*. Un compromiso trata de *vinculación*: la garantía de que no puedes cambiar tu respuesta más tarde. Son tareas diferentes.

**Si los compromisos ocultan el valor, ¿cómo puede alguien comprobar las reglas?**
Ese es el papel de las pruebas zero-knowledge (Artículo 5): demuestran que el valor oculto cumple las reglas sin revelarlo.

**¿Está roto SHA-256, dado que Zcash lo evita en algunos lugares?**
No. SHA-256 está bien y Zcash sigue utilizándolo. Simplemente es costoso de *demostrar dentro de un circuito*, por lo que existen hashes aptos para ZK para esa tarea específica.

**¿De dónde procede el `r` aleatorio y quién lo conserva?**
Se genera de nuevo cuando se crea la nota y lo conoce el propietario de la nota. Es parte de lo que hace que cada nota sea única y privada.

---

### Pon a prueba tu intuición

Te comprometes con tu predicción electoral como `H(v, r)` y la publicas. Un amigo insiste en que deberías publicar solo `H(v)` para mantenerlo más sencillo. En una frase, ¿por qué es una mala idea si solo hay dos resultados posibles? *(Respuesta a continuación.)*

<details><summary>Respuesta</summary>

Con solo dos resultados, tu amigo puede simplemente calcular `H("win")` y `H("lose")` por sí mismo y compararlos con tu resumen publicado, aprendiendo al instante tu predicción. El hash sin más vincula, pero no oculta; el `r` aleatorio es lo que detiene este ataque de adivinación y comprobación.
</details>

---

### Qué sigue

**Artículo 4 . Árboles de Merkle:** ahora tenemos millones de compromisos acumulándose. El Artículo 4 muestra cómo Zcash los organiza en un único árbol cuya diminuta huella digital de raíz representa todo el historial, y cómo puedes demostrar que tu nota está en ese árbol sin revelar cuál es. Esa es la verdadera forma del «tablero público» del Artículo 0.

*Parte de la serie* Zcash desde los primeros principios *para [ZecHub](https://zechub.org). Con licencia CC BY-SA 4.0.*
