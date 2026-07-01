# Pruebas de conocimiento cero: demostrar que tienes razón sin decir por qué
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![texto alternativo](image-23.png)

### La cortina que permite al mundo verificar lo que nunca puede ver

> **Serie:** *Zcash desde primeros principios* . **Artículo 5 . Pruebas de conocimiento cero**
> **Audiencia:** personas recién llegadas. Nos apoyamos en todos los artículos anteriores (campos finitos, curvas, compromisos, árboles de Merkle), pero cada idea se retoma cuando la necesitamos.
> **Con qué te irás:** una comprensión intuitiva y correcta de qué es una prueba de conocimiento cero, las tres garantías que ofrece, cómo se prueban afirmaciones arbitrarias y qué impulsa Sapling y Orchard de Zcash.

Este es el artículo hacia el que toda la serie ha estado avanzando. Desde el [Artículo 0](article-0-shielded-transaction.md) en adelante, no dejamos de decir que un pago se valida "detrás de una cortina", se demuestra que es correcto sin revelar nada. Una prueba de conocimiento cero es esa cortina. Es la pieza que por fin resuelve la paradoja con la que abrimos: *¿cómo puede el público verificar una transacción que no tiene permitido ver?*

---

## 1. ¿Por qué debería importarte?

Recordemos la contradicción en el corazón de Zcash:

- Una blockchain es confiable porque es **verificable públicamente**.
- Los pagos de Zcash son **completamente privados**: montos, remitente, receptor, todo oculto.

Esto parece mutuamente excluyente. La verificación parece *requerir* mirar. La privacidad *prohíbe* mirar. Si no puedes reconciliar ambas cosas, no puedes tener dinero privado en el que cualquiera confíe.

Una **prueba de conocimiento cero (ZKP)** es esa reconciliación. Permite que un **probador** convenza a un **verificador** de que una afirmación es verdadera **sin revelar nada más allá del hecho de que es verdadera.** Sin montos. Sin identidades. Sin nota. Solo: *"todo aquí obedece las reglas."* Construyamos la intuición antes de entrar en cualquier mecanismo.

---

## 2. La intuición: tres pruebas cotidianas

**Demostrar que conoces una contraseña, sin decirla.** Un sitio web podría verificar que conoces tu contraseña observando cómo desbloqueas algo que solo la contraseña puede desbloquear, sin ver nunca la contraseña en sí. Demuestras *conocimiento* sin *divulgación*.

**El amigo daltónico y dos pelotas.** Tienes una pelota roja y una verde que se ven idénticas para tu amigo daltónico. Quieres convencerlo de que son *de colores distintos* sin decirle cuál es cuál. Él esconde ambas detrás de la espalda, opcionalmente las intercambia, y te muestra una. Tú dices si las intercambió. Si las pelotas realmente son diferentes, siempre aciertas. Si fueran idénticas, estarías adivinando, acertando solo la mitad de las veces. Tras 20 rondas, tu racha perfecta lo convence de que son distintas, pero aun así nunca aprende cuál pelota es roja. **Está convencido de un hecho sin aprender nada más.** Eso es conocimiento cero en miniatura.

**La cueva.** Una cueva en forma de anillo tiene una puerta mágica al fondo que solo se abre con una palabra secreta. Afirmas conocer la palabra. Para demostrarlo sin revelarla: un verificador espera fuera mientras tú entras y eliges al azar el pasaje izquierdo o derecho. Entonces el verificador grita por qué lado quiere que *salgas*. Si de verdad conoces la palabra, siempre puedes cumplir (puedes abrir la puerta para cambiar de lado si hace falta). Si estás fingiendo, solo puedes salir por el lado correcto por suerte, 50/50 en cada ronda. Repite esto 20 veces y las probabilidades de que un farsante sobreviva son de menos de una entre un millón.

Esa historia de la cueva demuestra discretamente las **tres garantías** que toda prueba de conocimiento cero debe ofrecer.

---

## 3. Las tres garantías

![texto alternativo](image-24.png)

| Garantía | En la historia de la cueva | En Zcash |
|---|---|---|
| **Completitud** | Si conoces la palabra, siempre sales por el lado correcto | Una transacción válida siempre produce una prueba aceptada |
| **Solidez** | Un farsante es descubierto con una probabilidad abrumadora | Una transacción fraudulenta (dinero falsificado, doble gasto) no puede producir una prueba aceptada |
| **Conocimiento cero** | El verificador nunca oye la palabra secreta | La red nunca conoce montos, direcciones ni qué nota es |

Si falla una sola de estas, el sistema se rompe: sin completitud, los usuarios honestos son rechazados; sin solidez, los falsificadores imprimen dinero; sin conocimiento cero, la privacidad se evapora.

---

## 4. De una cueva a *cualquier* afirmación: circuitos y testigos

La cueva demuestra un hecho simpático. Zcash necesita demostrar una afirmación rica: *"conozco una nota no gastada en el árbol, estoy autorizado a gastarla, su nulificador está calculado correctamente y mis entradas igualan mis salidas."* ¿Cómo pasamos de pelotas y cuevas a eso?

El puente es una idea que conecta toda esta serie:

> **Cualquier afirmación que puedas verificar con un cálculo puede reescribirse como un circuito aritmético:** una red de sumas y multiplicaciones sobre un campo finito (Artículo 1).

Piensa en el circuito como una lista de restricciones aritméticas que *solo se satisfacen todas si la afirmación es verdadera.* Las entradas privadas que hacen que todo cuadre, tu nota, tu clave, la ruta de Merkle, se llaman el **testigo**.

![texto alternativo](image-25.png)

Por eso dedicamos el Artículo 1 a los campos finitos y el Artículo 3 a los hashes amigables con ZK: el circuito habla aritmética de campos, así que cada operación dentro de la afirmación (incluido el hash y la subida por el árbol de Merkle del Artículo 4) tiene que expresarse de esa manera. Cuanto más barata sea cada operación de expresar, más pequeña y rápida será la prueba.

---

## 5. Hacerlo práctico: no interactivo y sucinto

La cueva necesitaba muchas rondas de ida y vuelta. Eso es impráctico para una blockchain, donde una prueba debe publicarse una vez y ser comprobada por todo el mundo, para siempre. Dos mejoras arreglan esto.

**No interactivo (la idea de Fiat-Shamir).** En lugar de un verificador en vivo lanzando desafíos aleatorios a gritos, el probador genera por sí mismo los "desafíos aleatorios" *hasheando* su propia prueba hasta ese momento. Como un buen hash es impredecible (Artículo 3), el probador no puede cocinar los desafíos a su favor. La conversación parlanchina se colapsa en una **única prueba autocontenida** que cualquiera puede verificar más tarde, sin interacción.

**Sucinto.** Los mejores sistemas hacen que la prueba sea **minúscula y rápida de verificar, sin importar lo grande que sea la afirmación.** Esta es la parte realmente asombrosa.

> Una prueba Groth16 (el sistema que usa Sapling) tiene aproximadamente **192 bytes** y se verifica en milisegundos, *ya sea que la afirmación que demuestra sea pequeña o enorme.* Unos pocos cientos de bytes pueden dar fe de un cálculo que involucra muchos miles de restricciones.

Si juntas ambas cosas, obtienes el acrónimo que verás en todas partes:

> **zk-SNARK** = **z**ero-**k**nowledge **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. Conocimiento cero (no revela nada), sucinto (pequeño y rápido), no interactivo (de una sola vez), argumento de conocimiento (el probador realmente *conoce* un testigo válido).

---

## 6. La única trampa: configuración de confianza

No hay almuerzo gratis. Muchos SNARKs necesitan una **configuración** única que produzca parámetros públicos para el circuito. La configuración genera aleatoriedad secreta como subproducto, y ese secreto debe ser **destruido.** Si alguien lo conservara, podría falsificar pruebas, es decir, **falsificar dinero** (aunque, de forma crucial, aun así *no* podría romper la privacidad).

A este secreto residual se le apoda **residuo tóxico**. Para deshacerse de él de forma segura, Zcash realizó elaboradas **ceremonias multipartitas** en las que muchos participantes independientes aportaron aleatoriedad; siempre que *al menos uno* destruyera honestamente su parte, el residuo tóxico se vuelve irrecuperable.

![texto alternativo](image-26.png)

Los sistemas más nuevos eliminan por completo este requisito, y esa es una de las razones más importantes por las que Zcash evolucionó su sistema de pruebas con el tiempo.

---

## 7. Dónde vive esto en Zcash

| Diseño | Sistema de pruebas | ¿Configuración de confianza? | Basado en |
|---|---|---|---|
| **Sprout** (el primero) | zk-SNARK temprano | Sí | ceremonia original |
| **Sapling** | **Groth16** | Sí (la ceremonia multipartita "Powers of Tau" + ceremonia Sapling) | **BLS12-381** (Artículo 2) |
| **Orchard** (actual) | **Halo 2** | **Sin configuración de confianza** | **Pallas / Vesta** (Artículo 2) |

La marcha de Sprout a Sapling y a Orchard es, en gran medida, una historia de pruebas cada vez más pequeñas y rápidas, y de desprenderse de la configuración de confianza. **Halo 2**, usado por Orchard, no necesita ninguna ceremonia y está construido para admitir *recursión* (pruebas que verifican otras pruebas), por lo que Orchard usa el **ciclo** de curvas Pallas/Vesta del Artículo 2: cada curva está ajustada para verificar pruebas escritas sobre la otra.

Esto cierra el bucle más grande desde el Artículo 0. La magia de "detrás de la cortina" es un **zk-SNARK**: demuestra que tu transacción satisface un circuito aritmético que codifica todas las reglas, sin revelar nada más que el bit único "válida".

---

## 8. Un descargo de responsabilidad honesto

Las pruebas de conocimiento cero son un campo profundo y nos quedamos en el nivel de la intuición a propósito. No definimos los límites de probabilidad precisos en la solidez, la forma exacta de un circuito aritmético (R1CS, PLONKish y demás), cómo los polinomios y los compromisos convierten un circuito en una prueba corta, ni los verdaderos detalles internos de Groth16 y Halo 2. La cueva es una prueba *interactiva*; los sistemas de producción no son interactivos y son mucho más intrincados. Nada de eso cambia el núcleo: demostrar que un circuito es satisfecho por un testigo secreto, de forma completa, sólida y sin revelar nada. El mecanismo da para toda una serie por sí solo.

---

## 9. Resumen

- Una **prueba de conocimiento cero** permite que un probador convenza a un verificador de que una afirmación es verdadera **sin revelar nada más**, resolviendo la paradoja entre verificación y privacidad.
- Debe satisfacer tres garantías: **completitud** (las afirmaciones verdaderas convencen), **solidez** (las afirmaciones falsas no pueden hacerlo) y **conocimiento cero** (el verificador solo aprende "es verdad").
- Las afirmaciones arbitrarias se convierten en **circuitos aritméticos** sobre un campo finito; las entradas secretas que satisfacen el circuito son el **testigo**. Por eso importaban los campos finitos y los hashes amigables con ZK.
- **Fiat-Shamir** hace que las pruebas sean **no interactivas** (de una sola vez); los mejores sistemas también son **sucintos** (una prueba Groth16 ocupa unos **192 bytes** y se verifica en milisegundos sin importar el tamaño de la afirmación). Juntas: un **zk-SNARK**.
- Algunos SNARKs necesitan una **configuración de confianza** cuyo **residuo tóxico** debe destruirse (mediante ceremonias multipartitas); un compromiso permitiría falsificar dinero, pero **no** romper la privacidad.
- **Sapling** usa **Groth16** (configuración de confianza, BLS12-381); **Orchard** usa **Halo 2** (sin configuración de confianza, Pallas/Vesta, amigable con la recursión).

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Prueba de conocimiento cero** | Convencer a alguien de que una afirmación es verdadera sin revelar nada más |
| **Probador / Verificador** | Quien hace la prueba / quien la comprueba |
| **Completitud** | Las afirmaciones verdaderas siempre son aceptadas (de un probador honesto) |
| **Solidez** | Las afirmaciones falsas son rechazadas (los tramposos no pueden ganar salvo por suerte) |
| **Testigo** | Las entradas secretas que hacen verdadera la afirmación |
| **Circuito aritmético** | Una afirmación reescrita como sumas y multiplicaciones sobre un campo finito |
| **No interactivo (Fiat-Shamir)** | Una prueba de una sola vez que no necesita ida y vuelta en vivo |
| **Sucinto** | La prueba es minúscula y rápida de verificar sin importar el tamaño de la afirmación |
| **zk-SNARK** | Zero-knowledge Succinct Non-interactive ARgument of Knowledge |
| **Configuración de confianza / residuo tóxico** | Generación única de parámetros cuyo secreto residual debe destruirse |

---

## Preguntas frecuentes

**Si la prueba no revela nada, ¿cómo puede significar algo comprobarla?**
Porque las matemáticas están organizadas de modo que *solo* un testigo real y válido puede producir una prueba que pase. Superar la verificación es en sí mismo la evidencia; no hace falta divulgación.

**¿Podría alguien falsificar una prueba?**
La solidez hace que esto sea inviable. La única excepción es un SNARK cuyo residuo tóxico de la configuración de confianza haya sido conservado; justamente por eso importan las ceremonias para destruirlo.

**¿Una configuración de confianza comprometida filtraría mis datos privados?**
No. Permitiría a un atacante falsificar dinero *nuevo*, pero **no** revela montos, direcciones ni notas. La privacidad y la solidez son garantías separadas.

**¿Por qué Zcash cambió de sistemas de prueba con el tiempo?**
Para obtener pruebas más pequeñas y rápidas y, con Halo 2, eliminar por completo la configuración de confianza y habilitar la recursión.

---

### Pon a prueba tu intuición

En la cueva, ¿por qué es esencial que el verificador elija el lado de salida *después* de que el probador ya haya entrado, en lugar de anunciarlo de antemano? *(Respuesta abajo.)*

<details><summary>Respuesta</summary>

Si el verificador anunciara el lado primero, un farsante que no conoce la palabra podría simplemente entrar por ese lado desde el principio y volver a salir caminando, sin necesitar nunca la puerta. Elegir *después* de que el probador se compromete con un pasaje obliga a un farsante a depender de la suerte (50/50 por ronda), y eso es lo que hace convincentes las rondas repetidas. Este orden de "primero comprometerse, luego recibir el desafío" es exactamente lo que Fiat-Shamir preserva al derivar el desafío a partir de un hash de la prueba ya comprometida por el probador.
</details>

---

### Qué sigue

**Artículo 6 . El protocolo blindado, de extremo a extremo:** el final. Tomamos cada pieza, notas, compromisos, el árbol de compromisos de notas, nulificadores, balance de valor y la prueba de conocimiento cero, y ensamblamos una transacción blindada completa de Zcash, cerrando hasta el último bucle abierto allá por el Artículo 0.

*Parte de la serie* Zcash desde primeros principios *para [ZecHub](https://zechub.org). Licencia CC BY-SA 4.0.*
