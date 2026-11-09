# Pruebas zero-knowledge [Zero-Knowledge Proofs]: demostrar que tienes razón sin decir por qué
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-23-71534bece9.webp)

### La cortina que permite al mundo verificar lo que nunca podrá ver

> **Serie:** *Zcash desde los primeros principios* . **Artículo 5 . Pruebas zero-knowledge**
> **Audiencia:** principiantes. Nos basamos en cada artículo anterior (campos finitos, curvas, compromisos, árboles de Merkle), pero retomamos cada idea cuando la necesitamos.
> **Con qué te quedarás:** una comprensión intuitiva y correcta de qué es una prueba zero-knowledge, las tres garantías que ofrece, cómo se demuestran afirmaciones arbitrarias y qué potencia los Zcash de Sapling y Orchard.

Este es el artículo hacia el que ha avanzado toda la serie. Desde [Artículo 0](article-0-shielded-transaction.md) hemos seguido diciendo que un pago [payment] se valida «detrás de una cortina», se demuestra correcto sin revelar nada. Una prueba zero-knowledge es esa cortina. Es la pieza que finalmente resuelve la paradoja con la que comenzamos: *¿cómo puede el público verificar una transacción [transaction] que no tiene permitido ver?*

---

## 1. ¿Por qué debería importarte?

Recuerda la contradicción en el corazón de Zcash:

- Una blockchain es fiable porque es **verificable públicamente**.
- Los pagos de Zcash son **completamente privados**: importes, remitente, receptor, todo está oculto.

Esto parece mutuamente excluyente. La verificación parece *requerir* mirar. La privacidad [privacy] *prohíbe* mirar. Si no puedes conciliarlas, no puedes tener dinero privado en el que cualquiera confíe.

Una **prueba zero-knowledge (ZKP)** es la conciliación. Permite a un **demostrador** convencer a un **verificador** de que una afirmación es verdadera **sin revelar nada más allá del hecho de que es verdadera.** Sin importes. Sin identidades. Sin notas [notes]. Solo: *«todo aquí cumple las reglas».* Construyamos la intuición antes de abordar cualquier mecanismo.

---

## 2. La intuición: tres pruebas cotidianas

**Demostrar que conoces una contraseña sin decirla.** Un sitio web podría verificar que conoces tu contraseña observándote desbloquear algo que solo la contraseña desbloquea, sin ver nunca la contraseña misma. Demuestras *conocimiento* sin *divulgación*.

**El amigo daltónico y dos pelotas.** Tienes una pelota roja y una verde que parecen idénticas para tu amigo daltónico. Quieres convencerlo de que son de *colores diferentes* sin decirle cuál es cuál. Él oculta ambas detrás de su espalda, puede intercambiarlas y te muestra una. Dices si las intercambió. Si las pelotas realmente son diferentes, siempre aciertas. Si fueran idénticas, estarías adivinando y acertarías solo la mitad de las veces. Después de 20 rondas, tu racha ininterrumpida lo convence de que son diferentes, pero nunca aprende qué pelota es roja. **Está convencido de un hecho sin aprender nada más.** Eso es zero-knowledge en miniatura.

**La cueva.** Una cueva en forma de anillo tiene una puerta mágica al fondo que solo se abre con una palabra secreta. Afirmas conocer la palabra. Para demostrarlo sin revelarla: un verificador espera afuera mientras entras y eliges al azar el pasaje izquierdo o derecho. Entonces el verificador grita por qué lado quiere que *salgas*. Si realmente conoces la palabra, siempre puedes cumplirlo (puedes abrir la puerta para cambiar de lado si es necesario). Si estás fingiendo, solo puedes salir por el lado correcto por suerte, 50/50 en cada ronda. Repite esto 20 veces y las probabilidades de que un farsante sobreviva son inferiores a una entre un millón.

Esa historia de la cueva demuestra discretamente las **tres garantías** que toda prueba zero-knowledge debe ofrecer.

---

## 3. Las tres garantías

![alt text](/content-images/image-24-b559d31849.webp)

| Garantía | En la historia de la cueva | En Zcash |
|---|---|---|
| **Completitud** | Si conoces la palabra, siempre sales por el lado correcto | Una transacción válida siempre produce una prueba aceptada |
| **Solidez** | Un farsante es descubierto con probabilidad abrumadora | Una transacción fraudulenta (dinero falsificado, doble gasto) no puede producir una prueba aceptada |
| **Zero-knowledge** | El verificador nunca oye la palabra secreta | La red nunca conoce importes, direcciones [addresses] ni qué nota es |

Si alguna de estas falla, el sistema se rompe: sin completitud, los usuarios honestos son rechazados; sin solidez, los falsificadores imprimen dinero; sin zero-knowledge, la privacidad se evapora.

---

## 4. De una cueva a *cualquier* afirmación: circuitos y testigos

La cueva demuestra un hecho ingenioso. Zcash necesita demostrar una afirmación compleja: *«conozco una nota no gastada en el árbol, estoy autorizado a gastarla, su anulador [nullifier] se calcula correctamente y mis entradas son iguales a mis salidas».* ¿Cómo pasamos de pelotas y cuevas a eso?

El puente es una idea que une toda esta serie:

> **Cualquier afirmación que puedas comprobar mediante un cálculo puede reescribirse como un circuito aritmético:** una red de sumas y multiplicaciones sobre un campo finito (Artículo 1).

Piensa en el circuito como una lista de restricciones aritméticas que *solo se satisfacen todas si la afirmación es verdadera.* Las entradas privadas que hacen que todo encaje, tu nota, tu clave, la ruta de Merkle, se llaman el **testigo [witness].**

![alt text](/content-images/image-25-2479377e43.webp)

Por eso dedicamos el Artículo 1 a los campos finitos y el Artículo 3 a los hashes compatibles con ZK: el circuito habla aritmética de campos, por lo que cada operación dentro de la afirmación (incluido el hashing y el ascenso de Merkle del Artículo 4) debe expresarse de esa forma. Cuanto más barata sea cada operación de expresar, más pequeña y rápida será la prueba.

---

## 5. Hacerlo práctico: no interactivo y sucinto

La cueva necesitaba muchas rondas de ida y vuelta. Eso no es práctico para una blockchain, donde una prueba debe publicarse una vez y ser comprobada por todos, para siempre. Dos mejoras lo resuelven.

**No interactivo (la idea de Fiat-Shamir).** En lugar de que un verificador en vivo grite desafíos aleatorios, el demostrador genera los «desafíos aleatorios» por sí mismo mediante el *hashing* de su propia prueba hasta ese momento. Como un buen hash es impredecible (Artículo 3), el demostrador no puede preparar los desafíos a su favor. La conversación extensa se reduce a una **única prueba autosuficiente** que cualquiera puede comprobar más tarde, sin interacción.

**Sucinto.** Los mejores sistemas hacen que la prueba sea **minúscula y rápida de verificar, sin importar cuán grande sea la afirmación.** Esta es la parte realmente asombrosa.

> Una prueba Groth16 (el sistema que utiliza Sapling) tiene aproximadamente **192 bytes** y se verifica en milisegundos, *tanto si la afirmación que demuestra es pequeña como enorme.* Unos pocos cientos de bytes pueden certificar un cálculo que involucra muchos miles de restricciones.

Si unes ambas cosas, obtienes el acrónimo que verás en todas partes:

> **zk-SNARK** = **z**ero-**k**nowledge **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. Zero-knowledge (no revela nada), sucinto (minúsculo y rápido), no interactivo (de una sola vez), argumento de conocimiento (el demostrador realmente *conoce* un testigo válido).

---

## 6. El único inconveniente: configuración confiable

No hay almuerzo gratis. Muchos SNARK necesitan una **configuración confiable [trusted setup]** única que produzca parámetros públicos para el circuito. La configuración genera aleatoriedad secreta como subproducto, y ese secreto debe ser **destruido.** Si alguien lo conservara, podría falsificar pruebas, es decir, **falsificar dinero** (aunque, crucialmente, aun así no podría vulnerar la privacidad).

Este secreto residual recibe el apodo de **residuo tóxico [toxic waste].** Para eliminarlo de forma segura, Zcash llevó a cabo elaboradas **ceremonias multipartitas** en las que muchos participantes independientes aportaron aleatoriedad; siempre que *al menos uno* destruyera honestamente su parte, el residuo tóxico sería irrecuperable.

![alt text](/content-images/image-26-cdad6625cd.webp)

Los sistemas más recientes eliminan este requisito por completo, una de las mayores razones por las que Zcash evolucionó su sistema de pruebas con el tiempo.

---

## 7. Dónde vive esto en Zcash

| Diseño | Sistema de pruebas | ¿Configuración confiable? | Basado en |
|---|---|---|---|
| **Sprout** (el más antiguo) | zk-SNARK temprano | Sí | ceremonia original |
| **Sapling** | **Groth16** | Sí (la ceremonia multipartita «Powers of Tau» + Sapling) | **BLS12-381** (Artículo 2) |
| **Orchard** (actual) | **Halo 2** | **Sin configuración confiable** | **Pallas / Vesta** (Artículo 2) |

La evolución de Sprout a Sapling y a Orchard es en gran medida una historia de pruebas cada vez más pequeñas y rápidas, que abandonan la configuración confiable. **Halo 2**, utilizado por Orchard, no necesita ninguna ceremonia y está diseñado para admitir *recursión* (pruebas que verifican otras pruebas), razón por la cual Orchard utiliza el **ciclo** de curvas Pallas/Vesta del Artículo 2: cada curva está ajustada para verificar pruebas escritas sobre la otra.

Esto cierra el mayor ciclo del Artículo 0. La magia «detrás del telón» es un **zk-SNARK**: demuestra que tu transacción [transaction] satisface un circuito aritmético que codifica todas las reglas, sin revelar nada más que el único bit «válido».

---

## 8. Una aclaración honesta

Las pruebas zero-knowledge son un campo profundo y nos mantuvimos deliberadamente en el nivel intuitivo. No definimos los límites de probabilidad precisos de la solidez, la forma exacta de un circuito aritmético (R1CS, PLONKish, etc.), cómo los polinomios y los compromisos [commitments] convierten un circuito en una prueba corta, ni los mecanismos internos reales de Groth16 y Halo 2. La cueva es una prueba *interactiva*; los sistemas de producción son no interactivos y mucho más complejos. Nada de eso cambia el núcleo: demostrar que un circuito es satisfecho por un testigo secreto, de forma completa, sólida y sin revelar nada. El mecanismo es toda una serie por sí mismo.

---

## 9. Resumen

- Una **prueba zero-knowledge** permite a un demostrador convencer a un verificador de que una afirmación es verdadera **sin revelar nada más**, resolviendo la paradoja entre verificación y privacidad.
- Debe satisfacer tres garantías: **completitud** (las afirmaciones verdaderas convencen), **solidez** (las afirmaciones falsas no pueden hacerlo) y **zero-knowledge** (el verificador solo aprende «es verdadera»).
- Las afirmaciones arbitrarias se convierten en **circuitos aritméticos** sobre un campo finito; las entradas secretas que satisfacen el circuito son el **testigo**. Por eso fueron importantes los campos finitos y los hashes compatibles con ZK.
- **Fiat-Shamir** hace que las pruebas sean **no interactivas** (de una sola vez); los mejores sistemas también son **sucintos** (una prueba Groth16 tiene aproximadamente **192 bytes** y se verifica en milisegundos independientemente del tamaño de la afirmación). En conjunto: un **zk-SNARK**.
- Algunos SNARK necesitan una **configuración confiable** cuyo **residuo tóxico** debe destruirse (mediante ceremonias multipartitas); una vulneración permitiría falsificar dinero, pero **no** vulnerar la privacidad.
- **Sapling** utiliza **Groth16** (configuración confiable, BLS12-381); **Orchard** utiliza **Halo 2** (sin configuración confiable, Pallas/Vesta, compatible con recursión).

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Zero-knowledge proof** | Convencer a alguien de que una afirmación es verdadera sin revelar nada más |
| **Prover / Verifier** | Quien realiza la prueba / quien la comprueba |
| **Completeness** | Las afirmaciones verdaderas siempre se aceptan (de un demostrador honesto) |
| **Soundness** | Las afirmaciones falsas se rechazan (los tramposos no pueden ganar salvo por suerte) |
| **Witness** | Las entradas secretas que hacen verdadera la afirmación |
| **Arithmetic circuit** | Una afirmación reescrita como sumas y multiplicaciones sobre un campo finito |
| **Non-interactive (Fiat-Shamir)** | Una prueba de una sola vez que no necesita interacción en vivo |
| **Succinct** | La prueba es minúscula y rápida de verificar independientemente del tamaño de la afirmación |
| **zk-SNARK** | Zero-knowledge Succinct Non-interactive ARgument of Knowledge |
| **Trusted setup / toxic waste** | Generación única de parámetros cuyo secreto residual debe destruirse |

---

## Preguntas frecuentes

**Si la prueba no revela nada, ¿cómo puede significar algo comprobarla?**
Porque las matemáticas están organizadas de modo que *solo* un testigo real y válido puede producir una prueba aprobada. Superar la comprobación es en sí misma la evidencia, sin necesidad de divulgación.

**¿Podría alguien falsificar una prueba?**
La solidez hace que esto sea inviable. La única excepción es un SNARK cuyo residuo tóxico de la configuración confiable haya sido conservado; precisamente por eso importan las ceremonias para destruirlo.

**¿Una configuración confiable vulnerada filtra mis datos privados?**
No. Permitiría a un atacante falsificar dinero *nuevo*, pero **no** revela importes, direcciones ni notas. La privacidad y la solidez son garantías separadas.

**¿Por qué Zcash cambió de sistemas de pruebas con el tiempo?**
Para obtener pruebas más pequeñas y rápidas y, con Halo 2, eliminar por completo la configuración confiable y habilitar la recursión.

---

### Pon a prueba tu intuición

En la cueva, ¿por qué es esencial que el verificador elija el lado de salida *después* de que el demostrador ya haya entrado, en lugar de anunciarlo de antemano? *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

Si el verificador anunciara primero el lado, un farsante que no conoce la palabra podría simplemente entrar por ese lado desde el principio y salir tranquilamente, sin necesitar nunca la puerta. Elegir *después* de que el demostrador se comprometa con un pasaje obliga a un farsante a depender de la suerte (50/50 por ronda), lo que hace que las rondas repetidas sean convincentes. Este orden de «comprometerse primero y luego recibir el desafío» es exactamente lo que Fiat-Shamir preserva al derivar el desafío de un hash de la prueba ya comprometida del demostrador.
</details>

---

### Qué sigue

**Artículo 6 . El protocolo blindado [shielded], de principio a fin:** el final. Tomamos cada pieza, notas, compromisos, el árbol de compromisos de notas, anuladores, balance de valor y la prueba zero-knowledge, y ensamblamos una transacción blindada completa de Zcash, cerrando cada uno de los ciclos abiertos en el Artículo 0.

*Parte de la serie* Zcash desde los primeros principios *para [ZecHub](https://zechub.org). Con licencia CC BY-SA 4.0.*
