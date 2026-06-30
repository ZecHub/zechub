# Cómo funciona realmente una transacción blindada de Zcash
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![texto alternativo](image.png)

### La intuición antes de las matemáticas: un recorrido sin fórmulas por los pagos privados

> **Serie:** *Zcash from First Principles* . **Artículo 0 . El ancla**
> **Público:** principiantes absolutos. No se asumen conocimientos de criptografía, blockchain ni matemáticas.
> **Con qué te irás:** un modelo mental correcto de cómo Zcash oculta *quién pagó a quién y cuánto*, mientras sigue permitiendo que todo el mundo verifique que no se falsificó dinero ni se gastó dos veces.

Cada artículo posterior de esta serie hace zoom en una pieza de la máquina que estás a punto de conocer. Así que si una palabra aquí te parece vaga, *perfecto*. Es la promesa de que volveremos sobre ella y la entenderemos como se debe.

---

## 1. ¿Por qué debería importarte?

Imagina que tu extracto bancario estuviera clavado en una pared de la plaza del pueblo. Para siempre. Cualquiera (tu casero, tu empleador, un desconocido, un futuro empleador, un gobierno) podría leer cada pago de alquiler, cada factura médica, cada donación, cada café, y rastrear exactamente a quién enviaste dinero y quién te envió dinero a ti.

Eso no es una hipótesis distópica. **Eso es, más o menos, cómo funciona Bitcoin.**

A Bitcoin se le suele llamar "anónimo", pero no lo es. Es *seudónimo*: tu nombre no aparece en el libro mayor, pero cada transacción, cantidad y vínculo entre direcciones es público y permanente. Todo el campo del "análisis de cadenas" existe para retirar ese fino velo seudónimo y vincular direcciones con personas reales. En cuanto una de tus direcciones se relaciona contigo, tu historial financiero empieza a desenrollarse.

Zcash se construyó para responder a una pregunta engañosamente difícil:

> **¿Podemos tener dinero completamente privado, que oculte emisor, receptor y cantidad, y aun así permita que cualquiera verifique que se siguieron las reglas?**

Esos dos objetivos chocan entre sí. Un libro mayor público es verificable *porque* todo el mundo puede verlo. La privacidad significa que nadie puede verlo. Entonces, ¿cómo puede el público verificar algo que no tiene permitido mirar?

Resolver esa paradoja es toda la historia de esta serie. Empecemos.

---

## 2. Hay dos mundos dentro de Zcash

Antes que nada, aclaremos un malentendido común: **Zcash no es "la moneda privada". Es una moneda que ofrece privacidad como opción.** De hecho, empezó su vida como un fork de Bitcoin, y lleva dos sistemas paralelos en la misma blockchain.

| | **Mundo transparente** | **Mundo blindado** |
|---|---|---|
| Privacidad | Público, igual que Bitcoin | Privado |
| Las direcciones empiezan con | `t...` | `z...` o `u...` |
| Emisor / receptor / cantidad | **Visible** para todos | **Oculto** para todos |
| Tecnología subyacente | Libro mayor público estilo Bitcoin | Compromisos criptográficos + pruebas de conocimiento cero |

El dinero incluso puede cruzar la frontera entre ambos: mover fondos *al* mundo blindado se llama *shielding*, y moverlos de vuelta hacia afuera se llama *deshielding*.

El mundo transparente es "Bitcoin que ya entiendes más o menos". Es el **mundo blindado** el que contiene toda la criptografía hermosa, y es el único mundo que le importa a esta serie.

![texto alternativo](image-1.png)

---

## 3. La intuición: sobres sellados en un tablero público

Aquí tienes la única imagen mental que debes llevar contigo durante el resto del artículo. Volveremos a ella constantemente.

Imagina un enorme **tablón público de anuncios** que todo el mundo en la Tierra puede ver en todo momento.

* **Recibir dinero** significa que alguien fija en el tablón un **sobre sellado y opaco**. Dentro del sobre están *cuánto dinero contiene* y *un secreto que solo el destinatario puede leer*, porque el sobre está bloqueado con la clave personal de ese destinatario. Todo el mundo ve que *ha aparecido un sobre*. Nadie salvo el dueño puede ver lo que hay dentro.

* **El tablón solo crece.** Los sobres nunca se arrancan ni se borran. Se siguen fijando sobres nuevos encima, para siempre.

* **Gastar dinero** significa colocarse detrás de una cortina, demostrar *"soy el dueño de uno de los sobres no gastados de este tablón, y tengo derecho a abrirlo"*, luego dejar una **ficha de anulación** única en un contenedor público de "gastados" y fijar **sobres nuevos** para quien estés pagando.

Ese pequeño ritual (fijar una ficha de anulación, fijar sobres nuevos, todo desde detrás de una cortina) *es* un pago de Zcash. Todo lo demás son detalles.

Ahora pongámosles sus nombres reales a esos elementos.

---

## 4. Los cinco sustantivos

Estos cinco términos forman todo el vocabulario de Zcash blindado. Apréndelos como una *historia*, no como un glosario, y se te quedarán grabados.

| En la historia | Término real de Zcash | Qué es realmente |
|---|---|---|
| El contenido del sobre (cantidad + dueño + un secreto) | **Note** | La "moneda" privada: una porción de valor que pertenece a alguien |
| El sobre sellado y opaco en el tablón | **Note commitment** | Un sello criptográfico que prueba que un sobre existe mientras oculta lo que hay dentro |
| El propio tablón de anuncios | **Note commitment tree** | Un registro append-only de *cada note creada alguna vez* |
| La ficha de anulación en el contenedor de "gastados" | **Nullifier** | Un marcador único que significa "esta note ya ha sido gastada" |
| La magia "detrás de la cortina" | **Zero-knowledge proof** | Una prueba de que todo el gasto es válido, sin revelar nada de ello |

Si no recuerdas nada más de este artículo, recuerda esta tabla. Todo lo que sigue es simplemente *por qué* cada pieza tiene que tener esa forma.

---

## 5. Por qué cada pieza tiene la forma que tiene

Esta es la parte que la mayoría de las explicaciones se saltan, y es justamente la parte que separa "me memoricé algunas palabras" de "entiendo el diseño". Cada una de las cinco piezas existe para resolver **un problema específico.**

### El note commitment: ocultar el contenido, pero hacer imposible la falsificación

Un sobre normal puede abrirse con vapor. Un **note commitment** criptográfico no. Piensa en él como un sobre *mágicamente* sellado, completamente opaco, con dos superpoderes:

- **Ocultación**: mirar el sobre sellado no te dice *nada* sobre la cantidad o el dueño que hay dentro.
- **Vinculación**: una vez sellado, el contenido no puede intercambiarse. No puedes afirmar más tarde que el sobre contenía una cantidad distinta.

¿Cómo puede un sello hacer ambas cosas a la vez? Esa es una pregunta real y con respuesta. Es el tema del **Artículo 3 (commitments)**. Por ahora, acepta el sobre como magia y sigue adelante.

### El nullifier: la parte realmente ingeniosa

Cuando gastas una note, publicas su **nullifier**, la "ficha de anulación". Esta ficha se calcula a partir de *la propia note* **y** *tu clave secreta*. Esa receta aporta tres propiedades al mismo tiempo, y cada una importa:

1. **Solo el propietario puede crearlo.** Necesitas la clave secreta para calcularlo, así que nadie puede gastar tus notes por ti.
2. **Siempre es la *misma* ficha para una note determinada.** Si intentas gastar la misma note dos veces, producirías la ficha de anulación *idéntica* ambas veces, y el contenedor público de "gastados" ya la contiene. Doble gasto rechazado. 
3. **Nadie puede rastrearla de vuelta a su sobre.** La ficha de anulación parece completamente no relacionada con el sobre del que salió.

Esa tercera propiedad es el **corazón de la privacidad de Zcash**, y merece su propia sección más abajo.

### La zero-knowledge proof: la propia cortina

Todo ocurre detrás de una cortina, y lo que entregas al mundo después es una **zero-knowledge proof**, un tipo de certificado imposible de falsificar. Atestigua silenciosamente todo esto a la vez:

- *el sobre que estoy gastando realmente está fijado en el tablón* (es una note real y existente),
- *de verdad tengo derecho a abrirlo* (poseo la clave correcta),
- *mi ficha de anulación está calculada correctamente* (no hay trampa en la verificación de doble gasto),
- *mis sobres nuevos contienen exactamente la misma cantidad de dinero que el anterior*: **no se crea dinero de la nada.**

El milagro es que la prueba no revela **ninguno** de esos hechos. Ni la cantidad, ni las direcciones, ni qué sobre es. Solo te convence de que *cada una de las afirmaciones anteriores es verdadera*. Cómo eso es siquiera posible será el **Artículo 5 (zero-knowledge proofs)**, el gran clímax de la serie.

---

## 6. La vida de una sola note

Una note *nace*, *vive* en el tablón y, finalmente, *muere*, y lo crucial es que su nacimiento y su muerte parecen no estar relacionados para cualquiera que esté mirando.

![texto alternativo](image-2.png)

---

## 7. Un pago, de principio a fin

Veamos cómo Alice le paga a Bob, con cada paso público y privado etiquetado.

![texto alternativo](image-4.png)

Observa la asimetría que hace que la privacidad funcione:

- **La note antigua de Alice** muere mediante un *nullifier* en el contenedor de gastados.
- **La note nueva de Bob** nace mediante un *commitment* nuevo en el tablón.
- Para cualquiera que esté mirando, estos dos eventos no tienen **ninguna conexión visible**. El rastro del dinero se enfría.

> **¿Cómo sabe Bob siquiera que le han pagado?** Su note está cifrada *para su clave*. Él escanea continuamente el tablón y solo *sus* sobres se abren para él, como tener la única llave que encaja en un conjunto específico de cerraduras. La maquinaria detrás de esto son las **viewing keys**, un tema posterior.

---

## 8. Lo que ve el mundo vs. lo que permanece oculto

| Hecho sobre el pago | ¿Visible para el público? |
|---|---|
| Que ocurrió *una* transacción blindada |  Sí |
| Que obedeció todas las reglas (sin falsificación ni doble gasto) |  Sí (mediante la prueba) |
| **Quién** envió el dinero |  Oculto |
| **Quién** lo recibió |  Oculto |
| **Cuánto** se envió |  Oculto |
| **Qué** note anterior se gastó |  Oculto |

Esta es la resolución de la paradoja de la Sección 1. El público verifica las *reglas*, no el *contenido*. Verificación y privacidad dejan de luchar, porque la zero-knowledge proof te permite comprobar lo primero sin tocar lo segundo.

---

## 9. El corazón del asunto: por qué no se puede vincular el sobre y la ficha de anulación

Si entiendes esta única idea, entiendes por qué Zcash es privado. Léela despacio.

- Un **sobre (commitment)** se fija en el tablón cuando una note **nace**.
- Una **ficha de anulación (nullifier)** se deja en el contenedor cuando esa misma note se **gasta**, quizá meses después.
- Se producen mediante **recetas secretas diferentes**, y no existe **ninguna matemática pública** que convierta una en la otra.

Así que un observador externo ve un flujo de sobres que aparecen y un flujo de fichas de anulación que aparecen, pero **no puede emparejarlos**. No puede decir "la ficha de anulación depositada hoy corresponde al sobre fijado en marzo pasado". El vínculo existe *solo* dentro del conocimiento secreto del dueño de la note, y la zero-knowledge proof confirma que el vínculo es válido *sin revelarlo.*

Ese vínculo roto es precisamente de lo que se alimentan las empresas de análisis de cadenas en Bitcoin, y lo que Zcash corta deliberadamente.

> **Pon a prueba tu intuición:** si los nullifiers se calcularan en cambio *solo* a partir de la note (sin ninguna clave secreta), ¿cuál de las tres propiedades de la Sección 5 se rompería y por qué eso destruiría silenciosamente la privacidad? *(Respuesta al final.)*

---

## 10. Una advertencia honesta

Este es un **modelo mental**, no la especificación. Para que sea accesible para principiantes, hemos simplificado discretamente varias cosas reales: Zcash ha tenido varios diseños blindados (Sprout, luego Sapling, ahora Orchard); las transacciones reales pueden gastar y crear *varias* notes a la vez; "el tablón" es técnicamente un tipo específico de árbol, no un tablón literal con chinchetas; y el equilibrio de valor se hace cumplir con cierta contabilidad criptográfica adicional. Ninguno de esos detalles cambia la historia que acabas de aprender; la refinan. Iremos recuperando la precisión, un artículo a la vez, y señalaremos claramente cada vez que lo hagamos.

El buen contenido educativo se gana la confianza diciendo qué ha dejado fuera. Esta sección es esa promesa.

---

## 11. Los bucles que abrimos (tu mapa de la serie)

Cada "volveremos a esto" de arriba es un hilo. Aquí es donde se cierra cada uno:

![texto alternativo](image-29.png)

| Cabo suelto de este artículo | Dónde se resuelve |
|---|---|
| ¿Cómo puede un sobre sellado ocultar *y* ser imposible de falsificar? | Artículo 3: commitments |
| ¿De dónde salen las claves y las recetas secretas? | Artículos 1 y 2: campos y curvas |
| ¿Qué *es* exactamente "el tablón"? | Artículo 4: árboles de Merkle |
| ¿Cómo puedes demostrar algo sin revelar nada? | Artículo 5: zero-knowledge proofs |
| ¿Cómo encajan las cinco piezas en el Zcash real? | Artículo 6: el protocolo blindado |

---

## 12. Resumen

- Bitcoin es **transparente**; Zcash ofrece un mundo **blindado** donde emisor, receptor y cantidad quedan ocultos.
- La aparente paradoja (*privado pero verificable públicamente*) es precisamente el punto central, y tiene solución.
- Un pago blindado son cinco piezas interconectadas: una **note** (la moneda), un **note commitment** (el sobre sellado), el **note commitment tree** (el tablón público), un **nullifier** (la ficha de anulación que evita los dobles gastos) y una **zero-knowledge proof** (la cortina que demuestra validez sin revelar nada).
- La privacidad, en última instancia, descansa sobre **un vínculo cortado**: nadie desde fuera puede conectar el nacimiento de una note (commitment) con su muerte (nullifier).
- El público verifica las **reglas**, nunca el **contenido**.

Ahora ya tienes el mapa. El resto de la serie lo irá completando.

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Note** | Una unidad privada de valor, el equivalente en Zcash a una moneda o billete |
| **Note commitment** | Un sello criptográfico que prueba que una note existe sin revelarla |
| **Note commitment tree** | El registro público append-only de todos los note commitments |
| **Nullifier** | Un marcador único de "gastado" que se publica cuando se usa una note, evitando dobles gastos |
| **Zero-knowledge proof** | Una prueba de que una afirmación es verdadera sin revelar nada más allá de su veracidad |
| **Shielding / deshielding** | Mover fondos hacia / fuera del mundo privado blindado |
| **Viewing key** | La clave que permite al propietario detectar y leer las notes dirigidas a él |

---

## Preguntas frecuentes

**¿Zcash es siempre privado?**
No. La privacidad se aplica al mundo *blindado* (direcciones `z...`/`u...`). Las transacciones transparentes (`t...`) son públicas, como en Bitcoin.

**Si todo está oculto, ¿qué impide que alguien imprima dinero gratis?**
La zero-knowledge proof. Obliga matemáticamente a que las salidas de cada transacción estén respaldadas por entradas reales y no gastadas, *mientras* mantiene en secreto las cantidades.

**¿Se puede gastar la misma note dos veces?**
No. Gastar una note publica su nullifier; un segundo intento publicaría el nullifier idéntico, que ya está en el contenedor de "gastados", por lo que la red lo rechaza.

**¿Pueden los observadores externos vincular a un emisor con un receptor?**
No. El commitment (el nacimiento de la note) y el nullifier (la muerte de la note) no pueden ser emparejados por nadie sin el conocimiento secreto del propietario.

---

### Respuesta a la prueba de intuición (Sección 9)

Si el nullifier se calculara *solo* a partir de la note, sin clave secreta, entonces **cualquiera** podría calcularlo, rompiendo la propiedad n.º 1 (solo el propietario puede gastar). Peor aún, el nullifier pasaría a ser derivable directamente de información pública sobre la note, lo que podría permitir a los observadores **vincular el nullifier con su commitment**, rompiendo la propiedad n.º 3 y deshaciendo silenciosamente la privacidad de todo el sistema. La clave secreta es lo que hace que la ficha de anulación sea a la vez *exclusivamente tuya* y *no vinculable.*

---

### Qué sigue

**Artículo 1 . Campos finitos:** el extraño y hermoso sistema numérico donde la aritmética "da la vuelta", y la razón por la que cada pieza de criptografía de esta serie vive ahí. Empezaremos, como siempre, por la intuición, sin fórmulas hasta que se las haya ganado.

*Parte de la serie* Zcash from First Principles *para [ZecHub](https://zechub.org). Licencia CC BY-SA 4.0.*
