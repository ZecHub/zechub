# Árboles de Merkle [Merkle Trees]: Cómo la blockchain recuerda cada nota [Note]
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-19-cfbdcf8f78.webp)

### Resumir millones de compromisos [commitments] en una diminuta huella digital

> **Serie:** *Zcash desde primeros principios* . **Artículo 4 . Árboles de Merkle**
> **Audiencia:** principiantes. Partimos de [Artículo 3 (hashing y compromisos)](article-3-hashing-commitments.md). Si sabes qué son una huella digital y un compromiso, estás listo.
> **Con qué terminarás:** una imagen intuitiva y correcta de los árboles de Merkle, cómo demostrar pertenencia sin revelar a qué elemento te refieres y exactamente cómo esto se convierte en el árbol de compromisos de notas de Zcash.

[Artículo 0](article-0-shielded-transaction.md) describió un «tablero público» que contiene cada nota creada y que solo crece. A estas alturas puedes adivinar qué está fijado en él: **compromisos** (Artículo 3), los sobres sellados. Pero un tablero real contendría *cientos de millones* de ellos. ¿Cómo almacena la red eso, lo verifica y te permite demostrar que tu sobre está en el tablero sin señalarlo? La respuesta es una de las estructuras más elegantes de la informática: el **árbol de Merkle.**

---

## 1. ¿Por qué debería importarte?

Dos problemas aparecen en cuanto tienes una lista pública gigantesca de compromisos.

**Problema uno: integridad a escala.** Si la lista tiene 300 millones de entradas, ¿cómo puede alguien confirmar que *ni una sola* ha sido alterada en secreto? Volver a comprobar 300 millones de elementos en cada vistazo es imposible.

**Problema dos: pertenencia privada.** Para gastar una nota (Artículo 0), debes demostrar que tu compromiso está realmente en el tablero. Pero si lo señalas («¡es la entrada número 4.201.337!»), acabas de desanonimizarte. Necesitas demostrar *«mi sobre está en algún lugar de este tablero»* sin revelar **cuál** es.

Un árbol de Merkle resuelve ambos problemas a la vez. Comprime toda la lista en una sola huella digital y te permite demostrar pertenencia con una prueba diminuta que oculta la posición.

---

## 2. La intuición: un torneo de huellas digitales

Imagina un cuadro de torneo eliminatorio, pero en lugar de que avancen jugadores, **se combinan huellas digitales.**

- En la parte inferior, cada dato obtiene su propia huella digital (su hash del Artículo 3). Estas son las **hojas.**
- Emparejalas. Las dos huellas digitales de cada par se someten a hash *juntas* para formar una huella digital padre.
- Empareja los padres, aplica hash a cada par y continúa.
- Sigue hasta que una **única huella digital** quede en la parte superior. Esa campeona es la **raíz de Merkle.**

![alt text](/content-images/image-20-f5d57e425a.webp)

La propiedad más importante se desprende directamente del efecto avalancha (Artículo 3):

> **La raíz es una huella digital de *todo* lo que está debajo.** Cambia cualquier hoja, aunque sea en un bit, y su huella digital cambia, lo que cambia a su padre, lo que cambia a *ese* padre, hasta arriba. **La raíz cambia.** Por tanto, un pequeño valor de raíz certifica la integridad de toda la lista. Eso resuelve el Problema uno.

---

## 3. Un árbol real, calculado exactamente

Construyamos el árbol de cuatro hojas anterior con huellas digitales SHA-256 reales sobre las hojas `A, B, C, D` (los resúmenes se muestran truncados para facilitar la lectura):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Todo consiste simplemente en «aplicar hash a una cosa y luego aplicar hash a pares de hashes». Nada más exótico que el Artículo 3, organizado en un árbol.

---

## 4. La parte ingeniosa: demostrar pertenencia sin revelar la posición

Ahora el Problema dos. Supongamos que quieres demostrar que la hoja `C` está en el árbol a alguien que solo conoce la **raíz**. No le entregas todo el árbol. Le entregas únicamente las huellas digitales necesarias para ascender desde `C` hasta la raíz, llamadas la **ruta de autenticación** (o **prueba de Merkle**):

> Para demostrar que `C` está en el árbol, proporciona:
> - su hermana `hD`, y
> - su tío `hAB`.

El verificador, conociendo solo la raíz, vuelve a calcular el ascenso:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Calculado realmente: esto produce `1b3faa3fcc5e...`, que **coincide con la raíz.**  Queda demostrado que la hoja está en el árbol.

![alt text](/content-images/image-21-d9e5d6eaf6.webp)

Dos cosas hacen que esto sea potente:

- **Es diminuto.** Para 4 hojas proporcionaste 2 hashes. Para un árbol de `n` hojas proporcionas solo aproximadamente **log_2(n)** hashes. Para mil millones de hojas, son aproximadamente **30 hashes**, no mil millones. La prueba apenas crece mientras el árbol explota en tamaño.
- **Es la semilla de la privacidad [privacy].** La prueba muestra que tu hoja está *en algún lugar* del árbol. Cuando esta misma comprobación se realiza *dentro de una prueba zero-knowledge* (Artículo 5), incluso la propia ruta queda oculta, de modo que demuestras «mi nota está en el árbol» sin revelar ni la nota ni su posición. Eso resuelve completamente el Problema dos.

---

## 5. De un árbol de Merkle al árbol de compromisos de notas de Zcash

Ahora podemos expresar con precisión qué es realmente el «tablero público» del Artículo 0:

> El **árbol de compromisos de notas** es un árbol de Merkle cuyas **hojas son compromisos de notas.** Cada vez que se crea una nota en cualquier parte del mundo, su compromiso se añade como la siguiente hoja y se actualiza la raíz.

Algunos detalles reales:

- **Solo crece.** Las hojas se añaden, nunca se eliminan. Esto se llama un **árbol de Merkle incremental.** (Coincide con «el tablero nunca desmonta nada» del Artículo 0).
- **La raíz se llama el *ancla*.** Cuando gastas, tu transacción referencia un ancla reciente y demuestra, en conocimiento cero, que el compromiso de tu nota se encuentra en el árbol con esa raíz.
- **Profundidad fija.** Los árboles blindados de Zcash tienen profundidad **32**, lo que significa que pueden contener hasta `2^(32)` (más de cuatro mil millones) notas.
- **Hashing compatible con ZK.** El árbol no se construye con SHA-256. Sapling aplica hash al árbol con **hashes Pedersen** y Orchard usa **Sinsemilla** (ambos del Artículo 3), precisamente para que el ascenso de pertenencia sea barato de demostrar dentro de un circuito.

![alt text](/content-images/image-22-518354b8d5.webp)

### Algo que el árbol *no* maneja: gastos dobles

El árbol demuestra que una nota **existe**. No impide, por sí mismo, que gastes la misma nota dos veces. Ese trabajo corresponde al **conjunto de anuladores [nullifier set]** del Artículo 0: una colección separada de «tokens anulados». Cuando gastas, publicas el anulador de la nota y la red rechaza cualquier anulador que haya visto antes.

Por tanto, las dos estructuras públicas desempeñan funciones complementarias, y mantenerlas separadas es precisamente lo que rompe el vínculo entre el nacimiento y la muerte de una nota:

| Estructura | Pregunta que responde | Se actualiza cuando |
|---|---|---|
| **Árbol de compromisos de notas** | «¿Existe esta nota?» | Se **crea** una nota (se añade el compromiso) |
| **Conjunto de anuladores** | «¿Ya se ha gastado esta nota?» | Se **gasta** una nota (se publica el anulador) |

---

## 6. Una advertencia honesta

Simplificaciones, como siempre. Los árboles de Merkle incrementales reales rastrean nodos de «frontera» para que la raíz pueda actualizarse sin reconstruirlo todo; la red conserva una ventana de anclas recientes, no solo la última, para que las billeteras no se rompan con cada bloque nuevo; y las hojas vacías usan un valor de relleno definido. También dibujamos árboles binarios con potencias de dos ordenadas. Nada de esto cambia la intuición: hojas de compromisos, sometidas a hash por pares hasta una raíz, con pruebas de pertenencia cortas. La contabilidad exacta regresa en el artículo sobre el protocolo.

---

## 7. Resumen

- Un **árbol de Merkle** aplica hash a los datos para crear **hojas**, y luego aplica hash a **pares hacia arriba** hasta que queda una única **raíz**.
- Gracias al efecto avalancha, la **raíz es una huella digital de toda la lista**: cambia una hoja y la raíz cambia. Un pequeño valor certifica un enorme conjunto de datos.
- Una **prueba de pertenencia (ruta de autenticación)** consiste simplemente en las hermanas durante el ascenso hasta la raíz, aproximadamente **log_2(n)** hashes, por lo que las pruebas siguen siendo diminutas incluso para miles de millones de hojas.
- Realizada **dentro de una prueba zero-knowledge**, esa comprobación de pertenencia oculta *qué* hoja quieres decir, demostrando «mi nota está en el árbol» sin revelar la nota ni su posición.
- El **árbol de compromisos de notas** de Zcash es un árbol de Merkle **incremental** de compromisos de notas, con profundidad **32**, cuya raíz es el **ancla**; Sapling le aplica hash con **Pedersen** y Orchard con **Sinsemilla**.
- El árbol demuestra la **existencia**; el **conjunto de anuladores** separado evita los **gastos dobles**. Mantenerlos separados es lo que desvincula el nacimiento de una nota de su muerte.

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Merkle tree** | Un árbol de hashes; las hojas son huellas digitales de datos y los padres aplican hash a sus hijos |
| **Leaf** | Un nodo inferior; en Zcash, un compromiso de nota |
| **Merkle root** | La única huella digital superior que resume todo el árbol |
| **Authentication path / Merkle proof** | Los hashes hermanos necesarios para demostrar que una hoja está en el árbol |
| **Incremental Merkle tree** | Un árbol de Merkle solo de adición (las hojas únicamente se añaden) |
| **Anchor** | Una raíz de Merkle a la que un gasto hace referencia como «el estado del árbol contra el que estoy demostrando» |
| **Nullifier set** | La colección separada de marcadores de gasto que bloquea los gastos dobles |

---

## Preguntas frecuentes

**¿Por qué un árbol y no solo una lista larga de hashes?**
Una lista plana te obligaría a revelar o procesar cada entrada para demostrar pertenencia. Un árbol te proporciona pruebas de tamaño logarítmico y una única raíz para la integridad.

**¿El verificador necesita todo el árbol?**
No. El verificador solo necesita la **raíz** más tu ruta de autenticación corta. Ese es el objetivo principal.

**¿Por qué profundidad 32 específicamente?**
Limita el árbol a aproximadamente cuatro mil millones de notas, lo que proporciona un amplio margen, mientras mantiene la prueba de pertenencia (y su coste dentro del circuito) en un tamaño fijo y manejable.

**Si la raíz cambia con cada nueva nota, ¿cómo siguen siendo válidas las pruebas antiguas?**
La red recuerda una ventana de raíces recientes (anclas), por lo que una prueba realizada contra un ancla algo más antigua sigue verificándose. El artículo sobre el protocolo lo precisa.

---

### Pon a prueba tu intuición

En nuestro árbol de 4 hojas, supongamos que un atacante intercambia en secreto la hoja `C` por un valor diferente, pero deja la raíz publicada sin cambios. ¿Qué les sale mal y por qué no pueden arreglarlo silenciosamente? *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

Cambiar `C` cambia `hC` (efecto avalancha), lo que cambia `hCD = H(hC, hD)`, lo que cambia `ROOT = H(hAB, hCD)`. Por tanto, la raíz recalculada ya no coincide con la raíz publicada y se detecta la manipulación. Para «arreglarlo silenciosamente», tendrían que encontrar un `C` diferente que produzca el *mismo* `hC`, lo cual es una colisión de hash, inviable según el Artículo 3. La integridad se mantiene.
</details>

---

### Qué sigue

**Artículo 5 . Pruebas zero-knowledge:** el crescendo. Ya hemos construido notas, compromisos y el árbol, y seguimos diciendo «demostrado en conocimiento cero». El Artículo 5 finalmente explica cómo puedes demostrar que una afirmación es verdadera, que tu nota está en el árbol, que tu anulador es correcto y que el dinero está equilibrado, sin revelar nada de ello.

*Parte de la serie* Zcash desde primeros principios *para [ZecHub](https://zechub.org). Con licencia CC BY-SA 4.0.*
