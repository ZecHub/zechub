# El Protocolo Blindado, de extremo a extremo
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![texto alternativo](image-27.png)

### Ensamblando cada pieza en una transacción privada de Zcash

> **Serie:** *Zcash desde Primeros Principios* . **Artículo 6 . El Protocolo Blindado** (final)
> **Audiencia:** personas nuevas que hayan leído los Artículos 0 al 5. Aquí es donde todo se conecta.
> **Lo que te llevarás:** un modelo mental completo y correcto de una transacción blindada de Zcash, con cada concepto de la serie en su lugar adecuado y cada ciclo del Artículo 0 cerrado.

Comenzamos, en el [Artículo 0](article-0-shielded-transaction.md), con una paradoja y una historia sobre sobres sellados en un tablero público. Luego pasamos cinco artículos construyendo las piezas: campos finitos, curvas elípticas, compromisos, árboles de Merkle y pruebas de conocimiento cero. Ahora las unimos y observamos cómo funciona un pago privado real, de principio a fin.

---

## 1. ¿Por qué debería importarte?

Individualmente, cada pieza que has aprendido es ingeniosa. Pero la *magia* de Zcash está en cómo encajan entre sí. Un nullifier por sí solo no da privacidad. Un compromiso por sí solo no evita la falsificación. Una prueba por sí sola no prueba nada útil. Es el **ensamblaje** lo que convierte cinco componentes en dinero que es simultáneamente privado y confiable.

Este artículo es ese ensamblaje. Al final, la frase *"la red verifica una transacción que no puede ver"* se sentirá no como una paradoja, sino como una consecuencia obvia de piezas que ya entiendes.

---

## 2. El reparto, reensamblado

Aquí está toda la serie en una sola página, mapeada desde la historia del Artículo 0 hasta la maquinaria real.

| Elemento de la historia del Artículo 0 | Componente real | Construido a partir de |
|---|---|---|
| El dinero dentro de un sobre | **Note** (valor, destinatario, aleatoriedad) | codificado como elementos de campo (Art 1) |
| El sobre opaco sellado | **Compromiso de note** | compromiso Pedersen / Sinsemilla (Art 2, 3) |
| El tablero público | **Árbol de compromisos de notes** (anchor = su raíz) | árbol de Merkle incremental (Art 4) |
| La ficha del vacío | **Nullifier** | un hash amigable con ZK de la note + clave secreta (Art 2, 3) |
| "el dinero que entra es igual al dinero que sale" | **Compromisos de valor + comprobación de balance** | compromisos Pedersen homomórficos (Art 2, 3) |
| La magia detrás de la cortina | **Prueba de conocimiento cero** | zk-SNARK sobre un circuito aritmético (Art 5) |
| "Solo tú puedes leer tu sobre" | **Note cifrada + viewing keys** | cifrado + jerarquía de claves (este artículo) |

---

## 3. De dónde vienen las claves

Todo lo que un usuario puede hacer fluye desde un único secreto, la **spending key**, a través de una jerarquía unidireccional (cada flecha es una derivación irreversible, cortesía de las trapdoors de los Artículos 2 y 3):

![texto alternativo](image-32.png)

Hay dos cosas dignas de notar, ambas consecuencias de artículos anteriores:

- La separación te permite entregar una **viewing key** (por ejemplo, a un auditor) que revela tus transacciones **sin** otorgar el poder de gastar. La privacidad es selectiva, no un todo o nada.
- Cada derivación es **unidireccional**: poseer una viewing key nunca permite a nadie recuperar la spending key, exactamente la trapdoor de curva elíptica del Artículo 2 cumpliendo su función.

---

## 4. Gastar una note: las cuatro afirmaciones

Para gastar una note de forma privada, debes convencer a la red de cuatro cosas a la vez **sin revelar la note, su valor, su posición ni tu identidad.** Cada afirmación es satisfecha por un componente que ya conoces.

![texto alternativo](image-31.png)

La prueba no revela **ninguno** de los hechos subyacentes (qué note, de quién es la clave, qué valor). Solo revela que *las cuatro afirmaciones se cumplen.* Ese es todo el truco del Zcash blindado, expresado en un diagrama.

---

## 5. El truco del balance de valor (la recompensa que reservamos)

Allá por los Artículos 2 y 3 señalamos que los compromisos Pedersen **se suman**: el compromiso de `v_1` más el compromiso de `v_2` es un compromiso de `v_1 + v_2`. Aquí es donde eso rinde frutos.

Cada note de entrada y de salida lleva un **compromiso de valor**: un compromiso Pedersen `v.G + r.H` que oculta su cantidad `v`. Como estos se suman, la red puede calcular:

```
(suma de los compromisos de valor de entrada) − (suma de los compromisos de valor de salida)
```

Si la transacción está balanceada (no se crea ni se destruye dinero), las partes `v` se cancelan exactamente, dejando solo un compromiso de **valor cero**, cegado por la aleatoriedad sobrante. El remitente prueba que conoce esa aleatoriedad sobrante produciendo una pequeña firma llamada **binding signature.** Una binding signature válida solo es posible cuando los valores realmente cuadran, **y aun así no se reveló ni una sola cantidad.**

> Esta es la ilustración más limpia de toda la serie de *por qué* necesitábamos compromisos homomórficos basados en curvas. La regla de "el dinero que entra es igual al dinero que sale" se hace cumplir **sumando sobres sellados** y comprobando que el resultado selle a cero.

---

## 6. Una transacción completa, observada de extremo a extremo

Ensamblemos a Alice pagándole a Bob. Usaremos la clara estructura "lado de gasto / lado de salida" de Sapling como modelo didáctico.

**Una transacción blindada agrupa dos tipos de descripciones:**

| Descripción de gasto (consume una note) | Descripción de salida (crea una note) |
|---|---|
| compromiso de valor de la entrada | compromiso de valor de la salida |
| el **anchor** contra el que prueba (una raíz de árbol) | el nuevo **compromiso de note** (una nueva hoja) |
| el **nullifier** de la note gastada | una **clave efímera** para el cifrado |
| una clave pública rerandomizada + firma de autorización de gasto | la **note cifrada** (texto cifrado para el destinatario) |
| el **zk-SNARK** que prueba las cuatro afirmaciones | un **zk-SNARK** que prueba que la salida está bien formada |

Más una **binding signature** sobre todo el conjunto, que hace cumplir el balance de valor (Sección 5).

![texto alternativo](image-30.png)

Sigue el rastro de la privacidad: la red comprobó el anchor, comprobó que el nullifier era nuevo, verificó la prueba y verificó el balance. Aceptó un pago válido **sin haber aprendido ninguna cantidad, ninguna dirección y tampoco qué note se gastó.** Mientras tanto, el **nullifier** de la note gastada (su muerte) y el nuevo **compromiso** de Bob (el nacimiento de su note) se encuentran en dos estructuras públicas distintas sin ningún vínculo visible entre ambos, el vínculo cortado del Artículo 0.

---

## 7. Cerrando cada ciclo del Artículo 0

El Artículo 0 abrió deliberadamente preguntas. Aquí están todas, cerradas.

| Ciclo abierto en el Artículo 0 | Cerrado por |
|---|---|
| ¿Cómo es posible un sobre sellado pero imposible de falsificar? | Compromisos: ocultamiento por aleatoriedad, vinculación por resistencia a colisiones / la trapdoor de la curva (Art 3) |
| ¿De dónde vienen las claves y las recetas secretas? | Aritmética de campos y multiplicación escalar en curvas elípticas (Art 1, 2) |
| ¿Qué es exactamente "el tablero"? | Un árbol de Merkle incremental de compromisos de notes; su raíz es el anchor (Art 4) |
| ¿Por qué la ficha del vacío no puede vincularse con su sobre? | El nullifier es un hash con clave mantenido en un conjunto separado de los compromisos (Art 2, 3, 4) |
| ¿Cómo pruebas validez sin revelar nada? | Un zk-SNARK sobre un circuito aritmético que codifica las cuatro afirmaciones (Art 5) |
| ¿Cómo sabe el destinatario que le pagaron? | La note se cifra a su dirección; la descifra por prueba con una viewing key (este artículo) |
| ¿Cómo se hace cumplir en privado "dinero que entra = dinero que sale"? | Compromisos de valor homomórficos + la binding signature (Sec 5) |

La paradoja de la primera página, *verificar lo que no puedes ver*, ahora está completamente disuelta. La red verifica **afirmaciones sobre datos ocultos**, nunca los datos mismos.

---

## 8. Sapling vs Orchard, de un solo aliento

Enseñamos con la estructura de Sapling porque su división es la más clara. El diseño actual, **Orchard**, refina estas ideas en lugar de reemplazarlas:

| | **Sapling** | **Orchard** |
|---|---|---|
| Unidad de transacción | descripciones separadas de **Spend** y **Output** | **Actions** unificadas (cada una hace un gasto + una salida) |
| Sistema de prueba | **Groth16** (trusted setup) | **Halo 2** (sin trusted setup) |
| Curvas | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Hash de compromiso | Pedersen | Sinsemilla |

Cada concepto de este artículo se traslada directamente; Orchard principalmente agrupa gasto y salida y sustituye el sistema de prueba por uno sin ceremonia. Los cinco pilares no cambian.

---

## 9. Una aclaración honesta

Esta es la imagen más completa de la serie, pero sigue siendo un modelo. Comprimimos las codificaciones exactas en campo de una note, las fórmulas precisas de derivación de claves, la rerandomización de las claves de gasto, las direcciones diversificadas, los campos memo, el manejo de comisiones, la diferencia entre compromisos de valor y compromisos de notes en todo detalle, y el papel preciso de cada firma. También presentamos un flujo canónico; las transacciones reales pueden llevar muchos gastos y salidas a la vez y pueden mezclar partes transparentes y blindadas. La fuente autorizada es la Especificación del Protocolo de Zcash. Lo que ahora tienes es la forma correcta; la especificación completa cada medida.

---

## 10. Resumen

- Una transacción blindada entrelaza los cinco componentes: una **note** (el valor), su **compromiso** en el **árbol de compromisos de notes**, un **nullifier** para evitar dobles gastos, **compromisos de valor** para el balance, y un **zk-SNARK** que lo une todo.
- Gastar prueba **cuatro afirmaciones a la vez**: la note existe, estás autorizado, su nullifier es correcto y el valor cuadra, en **conocimiento cero**, sin revelar ninguno de los hechos subyacentes.
- El **balance de valor** se hace cumplir **sumando compromisos homomórficos** y comprobando que sellen a cero, mediante la **binding signature**, sin revelar ninguna cantidad.
- Los poderes de un usuario fluyen desde una sola **spending key** a través de una **jerarquía unidireccional**, lo que habilita **viewing keys** que revelan sin conceder poder de gasto.
- La red **verifica afirmaciones sobre datos ocultos**, disolviendo la paradoja entre verificar y privacidad del Artículo 0. Cada ciclo abierto allí queda ahora cerrado.
- **Orchard** refina **Sapling** (Actions unificadas, Halo 2 sin trusted setup, curvas Pasta, Sinsemilla) sin cambiar los cinco pilares.

---

## Glosario

| Término | Significado en lenguaje claro |
|---|---|
| **Spending key** | El único secreto raíz del que derivan todas las claves de un usuario |
| **Viewing key** | Revela tus transacciones a quien la posee sin permitirle gastar |
| **Spend description** | La parte de una tx que consume una note (nullifier, anchor, prueba) |
| **Output description** | La parte de una tx que crea una note (compromiso, ciphertext, prueba) |
| **Action (Orchard)** | Una unidad unificada que realiza un gasto y una salida juntos |
| **Value commitment** | Un compromiso Pedersen homomórfico de una cantidad |
| **Binding signature** | La firma que prueba que los valores cuadran sin revelarlos |
| **Anchor** | La raíz del árbol contra la que un gasto prueba pertenencia |
| **Trial decryption** | Un destinatario probando nuevos compromisos para encontrar notes destinadas a él |

---

## Preguntas frecuentes

**¿La red llega a ver alguna vez la cantidad o quién pagó a quién?**
No. Verifica la prueba, la novedad del nullifier, el anchor y la binding signature. Todos los valores privados permanecen ocultos.

**¿Qué me impide gastar una note dos veces?**
El nullifier. Gastar la publica; la red rechaza cualquier nullifier que ya esté en el conjunto de nullifiers. La misma note siempre produce el mismo nullifier.

**¿Cómo puede comprobarse el balance si las cantidades están ocultas?**
Los compromisos de valor se suman homomórficamente; los compromisos de una transacción balanceada se cancelan hasta un compromiso de cero, lo que la binding signature prueba.

**¿Puedo demostrar mis transacciones a un auditor sin ceder el control?**
Sí. Entrega una viewing key. Revela tu actividad blindada, pero no puede autorizar gastos, gracias a la jerarquía unidireccional de claves.

**¿Sapling está obsoleto ahora que existe Orchard?**
Ambos han existido en la red; Orchard es el diseño actual. Los conceptos son compartidos, así que entender uno te da el otro.

---

### Pon a prueba tu intuición

Un amigo dice: "Como la prueba oculta la cantidad, un ladrón podría simplemente afirmar que sus salidas valen más que sus entradas e imprimir dinero gratis". Usando la Sección 5, explica en dos frases por qué esto falla. *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

Las cantidades están ocultas, pero cada una está envuelta en un compromiso de valor homomórfico, y la red suma todos los compromisos de entrada y resta todos los compromisos de salida; si los valores ocultos no cuadraran, el resultado no sellaría a cero y **no podría producirse ninguna binding signature válida.** El ladrón puede ocultar *cuánto*, pero no puede hacer que valores desbalanceados superen la comprobación de balance, así que imprimir dinero gratis es imposible sin revelar nada y aun así ser atrapado por la aritmética.
</details>

---

### La serie, completa

Ahora has viajado desde una única paradoja hasta un pago privado completo:

![texto alternativo](https://github.com/user-attachments/assets/cd8bbb40-57b8-4854-b9cf-97f2485d126a)


A partir de aquí, el siguiente arco natural profundiza más: el funcionamiento interno de Groth16 y Halo 2, las ceremonias de trusted setup, los circuitos de Sapling y Orchard en detalle, la derivación de claves y las direcciones diversificadas, y la evolución del protocolo a través de las actualizaciones de red. Pero la base ya está colocada, y cada uno de esos temas ya tiene un lugar al que conectarse.

*Parte de la serie* Zcash desde Primeros Principios *para [ZecHub](https://zechub.org). Licencia CC BY-SA 4.0.*
