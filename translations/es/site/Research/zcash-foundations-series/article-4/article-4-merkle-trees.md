# Árboles de Merkle: Cómo la Blockchain Recuerda Cada Nota
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![texto alternativo](image-19.png)

### Resumiendo millones de compromisos en una sola huella diminuta

> **Serie:** *Zcash desde Primeros Principios* . **Artículo 4 . Árboles de Merkle**
> **Público:** principiantes. Partimos del [Artículo 3 (hashing y compromisos)](article-3-hashing-commitments.md). Si sabes qué es una huella digital y qué es un compromiso, estás listo.
> **Con qué te irás:** una imagen intuitiva y correcta de los árboles de Merkle, cómo demostrar pertenencia sin revelar qué elemento quieres decir y exactamente cómo esto se convierte en el árbol de compromisos de notas de Zcash.

El [Artículo 0](article-0-shielded-transaction.md) describió un "tablero público" que contiene cada nota creada y que solo crece con el tiempo. A estas alturas ya puedes adivinar qué está fijado en él: **compromisos** (Artículo 3), los sobres sellados. Pero un tablero real contendría *cientos de millones* de ellos. ¿Cómo almacena eso la red, cómo lo verifica y cómo te permite demostrar que tu sobre está en el tablero sin señalarlo? La respuesta es una de las estructuras más elegantes de la informática: el **árbol de Merkle.**

---

## 1. ¿Por qué debería importarte?

Dos problemas aparecen en el momento en que tienes una lista pública gigante de compromisos.

**Problema uno: integridad a escala.** Si la lista tiene 300 millones de entradas, ¿cómo puede alguien confirmar que *ni una sola* ha sido alterada en secreto? Volver a comprobar 300 millones de elementos en cada vistazo no tiene esperanza.

**Problema dos: pertenencia privada.** Para gastar una nota (Artículo 0), debes demostrar que tu compromiso realmente está en el tablero. Pero si lo señalas ("¡es la entrada número 4,201,337!"), acabas de desanonimizarte. Necesitas demostrar *"mi sobre está en algún lugar de este tablero"* sin revelar **cuál** es.

Un árbol de Merkle resuelve ambos problemas a la vez. Comprime toda la lista en una sola huella digital y te permite demostrar pertenencia con una prueba diminuta que oculta la posición.

---

## 2. La intuición: un torneo de huellas digitales

Imagina un cuadro de torneo eliminatorio, pero en lugar de que avancen jugadores, **se combinan huellas digitales.**

- En la parte inferior, cada dato obtiene su propia huella digital (su hash del Artículo 3). Estas son las **hojas.**
- Emparejalas. Las dos huellas de cada par se hashean *juntas* en una sola huella digital padre.
- Empareja los padres, hashea cada par junto, y así sucesivamente.
- Sigue hasta que una **única huella digital** quede en la parte superior. Ese campeón es la **raíz de Merkle.**

![texto alternativo](image-20.png)

La propiedad más importante se desprende directamente del efecto avalancha (Artículo 3):

> **La raíz es una huella digital de *todo* lo que está debajo de ella.** Cambia cualquier hoja, aunque sea en un solo bit, y su huella cambia, lo que cambia su padre, lo que cambia *ese* padre, hasta llegar arriba. **La raíz cambia.** Así que un pequeño valor de raíz certifica la integridad de toda la lista. Eso resuelve el Problema uno.

---

## 3. Un árbol real, calculado exactamente

Construyamos el árbol de cuatro hojas de arriba con huellas SHA-256 reales sobre las hojas `A, B, C, D` (los resúmenes se muestran truncados para facilitar la lectura):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Todo es simplemente "hashear una cosa y luego hashear pares de hashes". Nada más exótico que el Artículo 3, organizado en forma de árbol.

---

## 4. La parte ingeniosa: demostrar pertenencia sin revelar la posición

Ahora el Problema dos. Digamos que quieres demostrar que la hoja `C` está en el árbol, ante alguien que solo conoce la **raíz**. *No* le entregas todo el árbol. Le entregas solo las huellas digitales necesarias para subir desde `C` hasta la raíz, llamadas la **ruta de autenticación** (o **prueba de Merkle**):

> Para demostrar que `C` está en el árbol, proporciona:
> - su hermano `hD`, y
> - su tío `hAB`.

El verificador, conociendo solo la raíz, vuelve a calcular la subida:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Calculado de verdad: esto produce `1b3faa3fcc5e...`, que **coincide con la raíz.** Se demuestra que la hoja está en el árbol.

![texto alternativo](image-21.png)

Dos cosas hacen que esto sea poderoso:

- **Es diminuto.** Para 4 hojas proporcionaste 2 hashes. Para un árbol de `n` hojas proporcionas solo alrededor de **log_2(n)** hashes. Para mil millones de hojas, eso son aproximadamente **30 hashes**, no mil millones. La prueba casi no crece aunque el árbol explote en tamaño.
- **Es la semilla de la privacidad.** La prueba muestra que tu hoja está *en algún lugar* del árbol. Cuando esta misma comprobación se realiza *dentro de una prueba de conocimiento cero* (Artículo 5), incluso la propia ruta queda oculta, así que demuestras "mi nota está en el árbol" sin revelar ni la nota ni su posición. Eso resuelve por completo el Problema dos.

---

## 5. De un árbol de Merkle al árbol de compromisos de notas de Zcash

Ahora podemos afirmar con precisión qué es realmente el "tablero público" del Artículo 0:

> El **árbol de compromisos de notas** es un árbol de Merkle cuyas **hojas son compromisos de notas.** Cada vez que se crea una nota en cualquier lugar del mundo, su compromiso se añade como la siguiente hoja y la raíz se actualiza.

Algunos detalles reales:

- **Solo crece.** Las hojas se añaden, nunca se eliminan. Esto se llama un **árbol de Merkle incremental.** (Coincide con la idea del Artículo 0 de que "el tablero nunca arranca nada".)
- **La raíz se llama *anchor*.** Cuando gastas, tu transacción hace referencia a un anchor reciente y demuestra, en conocimiento cero, que el compromiso de tu nota está en el árbol con esa raíz.
- **Profundidad fija.** Los árboles blindados de Zcash tienen profundidad **32**, lo que significa que pueden contener hasta `2^(32)` (más de cuatro mil millones) de notas.
- **Hashing compatible con ZK.** El árbol no se construye con SHA-256. Sapling hashea el árbol con **Pedersen hashes** y Orchard usa **Sinsemilla** (ambos del Artículo 3), precisamente para que la subida de pertenencia sea barata de demostrar dentro de un circuito.

![texto alternativo](image-22.png)

### Una cosa que el árbol *no* maneja: los double-spends

El árbol demuestra que una nota **existe**. No impide, por sí solo, que gastes la misma nota dos veces. Ese trabajo pertenece al **conjunto de nullifiers** del Artículo 0: una colección separada de "tokens anulados". Cuando gastas, publicas el nullifier de la nota, y la red rechaza cualquier nullifier que ya haya visto antes.

Así que las dos estructuras públicas desempeñan papeles complementarios, y mantenerlas separadas es exactamente lo que corta el vínculo entre el nacimiento de una nota y su muerte:

| Estructura | Pregunta que responde | Cuándo se actualiza |
|---|---|---|
| **Árbol de compromisos de notas** | "¿Existe esta nota?" | Se **crea** una nota (se añade el compromiso) |
| **Conjunto de nullifiers** | "¿Ya se ha gastado esta nota?" | Se **gasta** una nota (se publica el nullifier) |

---

## 6. Un descargo de responsabilidad honesto

Simplificaciones, como siempre. Los árboles de Merkle incrementales reales rastrean nodos de "frontera" para que la raíz pueda actualizarse sin reconstruirlo todo; la red mantiene una ventana de anchors recientes, no solo el más reciente, para que las wallets no se rompan con cada bloque nuevo; y las hojas vacías usan un valor de relleno definido. También dibujamos árboles binarios con potencias de dos ordenadas. Nada de esto cambia la intuición: hojas de compromisos, hasheadas por pares hasta una sola raíz, con pruebas de pertenencia cortas. La contabilidad exacta vuelve en el artículo sobre el protocolo.

---

## 7. Resumen

- Un **árbol de Merkle** hashea datos en **hojas**, y luego hashea **pares hacia arriba** hasta que queda una sola **raíz**.
- Gracias al efecto avalancha, la **raíz es una huella digital de toda la lista**: cambia una hoja y cambia la raíz. Un pequeño valor certifica un conjunto de datos enorme.
- Una **prueba de pertenencia (ruta de autenticación)** no es más que los hashes hermanos a lo largo de la subida hasta la raíz, alrededor de **log_2(n)** hashes, por lo que las pruebas siguen siendo diminutas incluso para miles de millones de hojas.
- Realizada **dentro de una prueba de conocimiento cero**, esa comprobación de pertenencia oculta *qué* hoja quieres decir, demostrando "mi nota está en el árbol" sin revelar la nota ni su posición.
- El **árbol de compromisos de notas** de Zcash es un árbol de Merkle **incremental** de compromisos de notas, de profundidad **32**, cuya raíz es el **anchor**; Sapling lo hashea con **Pedersen** y Orchard con **Sinsemilla**.
- El árbol demuestra **existencia**; el **conjunto de nullifiers** separado evita los **double-spends**. Mantenerlos separados es lo que desvincula el nacimiento de una nota de su muerte.

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Árbol de Merkle** | Un árbol de hashes; las hojas son huellas digitales de datos, los padres hashean a sus hijos |
| **Hoja** | Un nodo inferior; en Zcash, un compromiso de nota |
| **Raíz de Merkle** | La única huella digital superior que resume todo el árbol |
| **Ruta de autenticación / prueba de Merkle** | Los hashes hermanos necesarios para demostrar que una hoja está en el árbol |
| **Árbol de Merkle incremental** | Un árbol de Merkle de solo anexado (las hojas solo se añaden) |
| **Anchor** | Una raíz de Merkle que un gasto referencia como "el estado del árbol contra el que estoy demostrando" |
| **Conjunto de nullifiers** | La colección separada de marcadores de gasto que bloquea los double-spends |

---

## Preguntas frecuentes

**¿Por qué un árbol y no simplemente una lista larga de hashes?**
Una lista plana te obligaría a revelar o procesar cada entrada para demostrar pertenencia. Un árbol te da pruebas de tamaño logarítmico y una sola raíz para la integridad.

**¿El verificador necesita todo el árbol?**
No. El verificador solo necesita la **raíz** más tu ruta de autenticación corta. Ese es justamente el punto.

**¿Por qué profundidad 32 específicamente?**
Limita el árbol a unos cuatro mil millones de notas, lo que deja margen de sobra, mientras mantiene la prueba de pertenencia (y su coste dentro del circuito) en un tamaño fijo y manejable.

**Si la raíz cambia con cada nota nueva, cómo siguen siendo válidas las pruebas antiguas?**
La red recuerda una ventana de raíces recientes (anchors), así que una prueba hecha contra un anchor algo más antiguo sigue verificándose. El artículo sobre el protocolo lo precisa.

---

### Pon a prueba tu intuición

En nuestro árbol de 4 hojas, supón que un atacante sustituye en secreto la hoja `C` por un valor distinto pero deja la raíz publicada sin cambios. ¿Qué sale mal para él y por qué no puede arreglarlo discretamente? *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

Cambiar `C` cambia `hC` (efecto avalancha), lo que cambia `hCD = H(hC, hD)`, lo que cambia `ROOT = H(hAB, hCD)`. Así que la raíz recalculada ya no coincide con la raíz publicada, y la manipulación se detecta. Para "arreglarlo discretamente" necesitaría encontrar un `C` diferente que produzca el *mismo* `hC`, lo que sería una colisión de hash, inviable según el Artículo 3. La integridad se mantiene.
</details>

---

### Qué sigue

**Artículo 5 . Pruebas de conocimiento cero:** el crescendo. Ya hemos construido notas, compromisos y el árbol, y seguimos diciendo "demostrado en conocimiento cero". El Artículo 5 por fin explica cómo puedes demostrar que una afirmación es verdadera, que tu nota está en el árbol, que tu nullifier es correcto y que el dinero cuadra, sin revelar nada de ello.

*Parte de la serie* Zcash desde Primeros Principios *para [ZecHub](https://zechub.org). Licencia CC BY-SA 4.0.*
