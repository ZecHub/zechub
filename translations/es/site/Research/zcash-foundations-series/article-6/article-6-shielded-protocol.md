# El protocolo blindado [Shielded], de principio a fin
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-27-4094293ec0.webp)

### Ensamblando cada pieza en una transacción [transaction] privada Zcash

> **Serie:** *Zcash desde los primeros principios* . **Artículo 6 . El protocolo blindado** (final)
> **Público:** principiantes que han leído los artículos 0 al 5. Aquí es donde todo se conecta.
> **Con qué te quedarás:** un modelo mental completo y correcto de una transacción blindada Zcash, con cada concepto de la serie en su lugar adecuado y cada ciclo del artículo 0 cerrado.

Comenzamos, en [Artículo 0](article-0-shielded-transaction.md), con una paradoja y una historia sobre sobres sellados en un tablero público. Después dedicamos cinco artículos a construir las piezas: campos finitos, curvas elípticas, compromisos [commitments], árboles de Merkle y pruebas zero-knowledge [zero-knowledge proofs]. Ahora las unimos y observamos cómo funciona un pago privado real, de principio a fin.

---

## 1. ¿Por qué debería importarte?

Individualmente, cada pieza que has aprendido es ingeniosa. Pero la *magia* de Zcash está en cómo se entrelazan. Un anulador [nullifier] por sí solo no proporciona privacidad [privacy]. Un compromiso por sí solo no evita la falsificación. Una prueba por sí sola no demuestra nada útil. Es el **ensamblaje** lo que convierte cinco componentes en dinero que es simultáneamente privado y confiable.

Este artículo es el ensamblaje. Al final, la frase *«la red verifica una transacción que no puede ver»* no parecerá una paradoja, sino una consecuencia obvia de piezas que ya comprendes.

---

## 2. El elenco, reensamblado

Aquí está toda la serie en una página, mapeada desde la historia del artículo 0 hasta la maquinaria real.

| Elemento de la historia del artículo 0 | Componente real | Construido a partir de |
|---|---|---|
| El dinero dentro de un sobre | **Nota** (valor, destinatario, aleatoriedad) | codificada como elementos de campo (Art 1) |
| El sobre opaco sellado | **Compromiso de nota** | compromiso Pedersen / Sinsemilla (Art 2, 3) |
| El tablero público | **Árbol de compromisos de notas** (ancla = su raíz) | árbol de Merkle incremental (Art 4) |
| El token del vacío | **Anulador** | un hash compatible con ZK de la nota + clave secreta (Art 2, 3) |
| «El dinero entrante equivale al saliente» | **Compromisos de valor + comprobación de balance** | compromisos Pedersen homomórficos (Art 2, 3) |
| La magia tras el telón | **Prueba zero-knowledge** | zk-SNARK sobre un circuito aritmético (Art 5) |
| «Solo tú puedes leer tu sobre» | **Nota cifrada + claves de visualización [viewing keys]** | cifrado [encryption] + jerarquía de claves (este artículo) |

---

## 3. De dónde provienen las claves

Todo lo que un usuario puede hacer fluye desde un único secreto, la **clave de gasto [spending key]**, a través de una jerarquía unidireccional (cada flecha es una derivación irreversible, gracias a las trampas de los artículos 2 y 3):

![alt text](/content-images/image-32-f443f9bb72.webp)

Hay dos cosas que vale la pena notar, ambas consecuencias de artículos anteriores:

- La división te permite entregar una **clave de visualización** (por ejemplo, a un auditor) que revela tus transacciones **sin** conceder la capacidad de gastar. La privacidad es selectiva, no absoluta.
- Cada derivación es **unidireccional**: poseer una clave de visualización nunca permite a nadie recuperar la clave de gasto, exactamente la trampa de curva elíptica del artículo 2 haciendo su trabajo.

---

## 4. Gastar una nota: las cuatro afirmaciones

Para gastar una nota de forma privada, debes convencer a la red de cuatro cosas a la vez **sin revelar la nota, su valor, su posición ni tu identidad.** Cada afirmación es satisfecha por un componente que ya conoces.

![alt text](/content-images/image-31-86309af194.webp)

La prueba no revela **ninguno** de los hechos subyacentes (qué nota, la clave de quién, qué valor). Solo revela que *las cuatro afirmaciones son verdaderas.* Ese es todo el truco de Zcash blindado, expresado en un diagrama.

---

## 5. El truco del balance de valor (la recompensa que reservamos)

En los artículos 2 y 3 observamos que los compromisos Pedersen **se suman**: el compromiso de `v_1` más el compromiso de `v_2` es un compromiso de `v_1 + v_2`. Aquí es donde eso da frutos.

Cada nota de entrada y salida lleva un **compromiso de valor**: un compromiso Pedersen `v.G + r.H` que oculta su cantidad `v`. Como se suman, la red puede calcular:

```
(sum of input value commitments) − (sum of output value commitments)
```

Si la transacción está equilibrada (no se crea ni destruye dinero), las partes `v` se cancelan exactamente, dejando solo un compromiso con valor **cero**, cegado por aleatoriedad restante. El remitente demuestra que conoce esa aleatoriedad restante produciendo una pequeña firma [signature] llamada **firma vinculante.** Una firma vinculante válida solo es posible cuando los valores realmente se equilibran, **sin que se revele una sola cantidad.**

> Esta es la ilustración más clara de toda la serie de *por qué* necesitábamos compromisos homomórficos basados en curvas. La regla de «el dinero entrante equivale al saliente» se aplica **sumando sobres sellados** y comprobando que el resultado se sella a cero.

---

## 6. Una transacción completa, observada de principio a fin

Armemos el pago de Alice a Bob. Usaremos la clara estructura de «lado de gasto / lado de salida» de Sapling como modelo pedagógico.

**Una transacción blindada agrupa dos tipos de descripciones:**

| Descripción de gasto (consume una nota) | Descripción de salida (crea una nota) |
|---|---|
| compromiso de valor de la entrada | compromiso de valor de la salida |
| el **ancla** contra la que demuestra (una raíz de árbol) | el nuevo **compromiso de nota** (una nueva hoja) |
| el **anulador** de la nota gastada | una **clave efímera** para el cifrado |
| una clave pública rerandomizada + firma de autorización de gasto | la **nota cifrada** (texto cifrado para el destinatario) |
| la **zk-SNARK** que demuestra las cuatro afirmaciones | una **zk-SNARK** que demuestra que la salida está bien formada |

Además, una **firma vinculante** sobre todo el conjunto, que aplica el balance de valor (Sección 5).

![alt text](/content-images/image-30-98511eb2d0.webp)

Sigue la privacidad: la red comprobó el ancla, comprobó que el anulador era nuevo, verificó la prueba y verificó el balance. Aceptó un pago válido **sin haber aprendido ninguna cantidad, ninguna dirección [address] ni qué nota se gastó.** Mientras tanto, el **anulador** de la nota gastada (su muerte) y el nuevo **compromiso** de Bob (el nacimiento de su nota) se encuentran en dos estructuras públicas distintas sin vínculo visible entre ellos, el vínculo cortado del artículo 0.

---

## 7. Cerrando cada ciclo del artículo 0

El artículo 0 abrió deliberadamente preguntas. Aquí están todas, cerradas.

| Ciclo abierto en el artículo 0 | Cerrado por |
|---|---|
| ¿Cómo es posible un sobre sellado pero imposible de falsificar? | Compromisos: ocultamiento mediante aleatoriedad, vinculación mediante resistencia a colisiones / la trampa de la curva (Art 3) |
| ¿De dónde provienen las claves y las recetas secretas? | Aritmética de campos y multiplicación escalar de curva elíptica (Art 1, 2) |
| ¿Qué es exactamente «el tablero»? | Un árbol de Merkle incremental de compromisos de notas; su raíz es el ancla (Art 4) |
| ¿Por qué el token del vacío no puede vincularse con su sobre? | El anulador es un hash con clave que se mantiene en un conjunto separado de los compromisos (Art 2, 3, 4) |
| ¿Cómo demuestras validez sin revelar nada? | Una zk-SNARK sobre un circuito aritmético que codifica las cuatro afirmaciones (Art 5) |
| ¿Cómo descubre el destinatario que recibió un pago? | La nota se cifra para su dirección; realiza descifrado de prueba con una clave de visualización (este artículo) |
| ¿Cómo se aplica privadamente «el dinero entrante = el dinero saliente»? | Compromisos de valor homomórficos + la firma vinculante (Sec 5) |

La paradoja de la primera página, *verificar lo que no puedes ver*, ahora está completamente resuelta. La red verifica **afirmaciones sobre datos ocultos**, nunca los datos mismos.

---

## 8. Sapling frente a Orchard, en pocas palabras

Enseñamos con la estructura de Sapling porque su división es la más clara. El diseño actual, **Orchard**, refina estas ideas en lugar de reemplazarlas:

| | **Sapling** | **Orchard** |
|---|---|---|
| Unidad de transacción | descripciones separadas de **Gasto** y **Salida** | **Acciones** unificadas (cada una realiza un gasto + una salida) |
| Sistema de pruebas | **Groth16** (configuración confiable [trusted setup]) | **Halo 2** (sin configuración confiable) |
| Curvas | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Hash de compromiso | Pedersen | Sinsemilla |

Cada concepto de este artículo se traslada directamente; Orchard principalmente agrupa gasto y salida, e incorpora un sistema de pruebas sin ceremonia. Los cinco pilares no cambian.

---

## 9. Una advertencia honesta

Esta es la imagen más completa de la serie, pero sigue siendo un modelo. Comprimimos las codificaciones exactas de campo de una nota, las fórmulas precisas de derivación de claves, la rerandomización de claves de gasto, las direcciones diversificadas, los campos memo, el manejo de tarifas [fee], la diferencia entre compromisos de valor y compromisos de notas en todo detalle, y la función precisa de cada firma. También presentamos un flujo canónico; las transacciones reales pueden llevar muchos gastos y salidas a la vez, y pueden mezclar partes transparentes [transparent] y blindadas. La fuente autorizada es la especificación del protocolo Zcash. Lo que ahora tienes es la forma correcta; la especificación completa cada medida.

---

## 10. Resumen

- Una transacción blindada entrelaza los cinco componentes: una **nota** (el valor), su **compromiso** en el **árbol de compromisos de notas**, un **anulador** para evitar gastos dobles, **compromisos de valor** para el balance y una **zk-SNARK** que los vincula todos.
- Gastar demuestra **cuatro afirmaciones a la vez**: la nota existe, estás autorizado, su anulador es correcto y el valor se equilibra, en **zero knowledge**, sin revelar ninguno de los hechos subyacentes.
- El **balance de valor** se aplica **sumando compromisos homomórficos** y comprobando que se sellan a cero, mediante la **firma vinculante**, sin divulgar ninguna cantidad.
- Las capacidades de un usuario fluyen desde una **clave de gasto** a través de una **jerarquía unidireccional**, habilitando **claves de visualización** que revelan sin conceder capacidad de gasto.
- La red **verifica afirmaciones sobre datos ocultos**, resolviendo la paradoja entre verificación y privacidad del artículo 0. Cada ciclo abierto allí está ahora cerrado.
- **Orchard** refina **Sapling** (Acciones unificadas, Halo 2 sin configuración confiable, curvas Pasta, Sinsemilla) sin cambiar los cinco pilares.

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Spending key** | El único secreto raíz del que derivan todas las claves de un usuario |
| **Viewing Key** | Revela tus transacciones a quien la posee sin permitirle gastarlas |
| **Spend description** | La parte de una tx que consume una nota (anulador, ancla, prueba) |
| **Output description** | La parte de una tx que crea una nota (compromiso, texto cifrado, prueba) |
| **Action (Orchard)** | Una unidad unificada que realiza un gasto y una salida conjuntamente |
| **Value commitment** | Un compromiso Pedersen homomórfico de una cantidad |
| **Binding signature** | La firma que demuestra que los valores se equilibran sin revelarlos |
| **Anchor** | La raíz de árbol contra la que un gasto demuestra pertenencia |
| **Trial decryption** | Un destinatario prueba nuevos compromisos para encontrar notas destinadas a él |

---

## Preguntas frecuentes

**¿La red llega a ver la cantidad o quién pagó a quién?**
No. Verifica la prueba, la novedad del anulador, el ancla y la firma vinculante. Todos los valores privados permanecen ocultos.

**¿Qué me impide gastar una nota dos veces?**
El anulador. Gastar la publica; la red rechaza cualquier anulador que ya esté en el conjunto de anuladores. La misma nota siempre produce el mismo anulador.

**¿Cómo puede comprobarse el balance si las cantidades están ocultas?**
Los compromisos de valor se suman homomórficamente; los compromisos de una transacción equilibrada se cancelan en un compromiso de cero, lo cual demuestra la firma vinculante.

**¿Puedo demostrar mis transacciones a un auditor sin ceder el control?**
Sí. Entrega una clave de visualización. Revela tu actividad blindada, pero no puede autorizar gastos, gracias a la jerarquía de claves unidireccional.

**¿Está Sapling obsoleto ahora que existe Orchard?**
Ambos han existido en la red; Orchard es el diseño actual. Los conceptos son compartidos, así que comprender uno te permite comprender el otro.

---

### Pon a prueba tu intuición

Un amigo dice: «Puesto que la prueba oculta la cantidad, un ladrón podría simplemente afirmar que sus salidas valen más que sus entradas e imprimir dinero gratis». Usando la Sección 5, explica en dos oraciones por qué esto falla. *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

Las cantidades están ocultas, pero cada una está envuelta en un compromiso de valor homomórfico, y la red suma todos los compromisos de entrada y resta todos los compromisos de salida; si los valores ocultos no estuvieran equilibrados, el resultado no se sellaría a cero y **no podría producirse ninguna firma vinculante válida.** El ladrón puede ocultar *cuánto*, pero no puede hacer que valores desequilibrados superen la comprobación de balance, por lo que imprimir dinero gratis es imposible sin no revelar nada y aun así ser detectado por la aritmética.
</details>

---

### La serie, completa

Ahora has viajado desde una única paradoja hasta un pago privado completo:

![alt text](/content-images/cd8bbb40-57b8-4854-b9cf-97f2485d126a-8847fae521.webp)


A partir de aquí, el siguiente arco natural profundiza: el funcionamiento interno de Groth16 y Halo 2, las ceremonias de configuración confiable, los circuitos Sapling y Orchard en detalle, la derivación de claves y las direcciones diversificadas, y la evolución del protocolo a través de las actualizaciones de red. Pero la base ya está establecida, y cada uno de esos temas tiene un lugar al que unirse.

*Parte de la serie* Zcash desde los primeros principios *para [ZecHub](https://zechub.org). Con licencia CC BY-SA 4.0.*
