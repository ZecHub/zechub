# Cómo funciona realmente una transacción blindada [Shielded] de Zcash
##### Investigación original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-fedc371488.webp)

### La intuición antes de las matemáticas: un recorrido sin fórmulas por los pagos privados

> **Serie:** *Zcash desde los primeros principios* . **Artículo 0 . El ancla**
> **Audiencia:** Personas completamente nuevas. No se requieren conocimientos de criptografía, blockchain ni matemáticas.
> **Lo que aprenderás:** Un modelo mental correcto de cómo Zcash oculta *quién pagó a quién y cuánto*, al tiempo que permite que todo el mundo verifique que no se falsificó ni se gastó dos veces ningún dinero.

Cada artículo posterior de esta serie profundiza en una pieza de la máquina que estás a punto de conocer. Así que, si una palabra aquí parece vaga, *bien*. Es una promesa de que volveremos a ella y la entenderemos adecuadamente.

---

## 1. ¿Por qué debería importarte?

Imagina que el extracto de tu banco estuviera clavado en una pared de la plaza del pueblo. Para siempre. Cualquiera (el propietario de tu vivienda, tu empleador, un desconocido, un futuro empleador, un gobierno) podría leer cada pago de alquiler, cada factura médica, cada donación, cada café y rastrear exactamente a quién enviaste dinero y quién te lo envió.

No se trata de una hipótesis distópica. **Así es, aproximadamente, como funciona Bitcoin.**

A menudo se llama a Bitcoin «anónimo», pero no lo es. Es *seudónimo*: tu nombre no está en el libro mayor, pero cada transacción [transaction], importe y vínculo entre direcciones [addresses] es público y permanente. Todo el campo del «chain analysis» existe para desvelar ese fino seudónimo y vincular direcciones con personas reales. Una vez que una de tus direcciones se vincula contigo, tu historial financiero queda expuesto.

Zcash se creó para responder a una pregunta engañosamente difícil:

> **¿Podemos tener dinero completamente privado, que oculte al remitente, al receptor y el importe, permitiendo aun así que cualquiera verifique que se cumplieron las reglas?**

Esos dos objetivos entran en conflicto. Un libro mayor público es verificable *porque* todos pueden verlo. La privacidad [privacy] significa que nadie puede verlo. Entonces, ¿cómo puede el público verificar algo que no tiene permitido observar?

Resolver esa paradoja es toda la historia de esta serie. Empecemos.

---

## 2. Hay dos mundos dentro de Zcash

Antes que nada, aclaremos un error común: **Zcash no es «la moneda privada». Es una moneda que ofrece privacidad como opción.** De hecho, comenzó como un fork de Bitcoin y mantiene dos sistemas paralelos en la misma blockchain.

| | **Mundo transparente [Transparent]** | **Mundo blindado** |
|---|---|---|
| Privacidad | Público, igual que Bitcoin | Privado |
| Las direcciones empiezan por | `t...` | `z...` o `u...` |
| Remitente / receptor / importe | **Visible** para todos | **Oculto** para todos |
| Tecnología subyacente | Libro mayor público al estilo Bitcoin | Compromisos criptográficos + pruebas zero-knowledge |

El dinero incluso puede cruzar la frontera entre ambos: mover fondos *hacia* el mundo blindado se llama *shielding*, y volver a sacarlos se llama *deshielding*.

El mundo transparente es «el Bitcoin que ya entiendes aproximadamente». Es el **mundo blindado** el que contiene toda la hermosa criptografía, y es el único mundo que importa a esta serie.

![alt text](/content-images/image-1-f821d24c6f.webp)

---

## 3. La intuición: sobres sellados en un tablero público

Esta es la única imagen mental que debes conservar durante el resto del artículo. Volveremos a ella constantemente.

Imagina un enorme **tablón de anuncios público** que todas las personas de la Tierra pueden ver en todo momento.

* **Recibir dinero** significa que alguien fija un **sobre sellado y opaco** en el tablero. Dentro del sobre está *cuánto dinero contiene* y *un secreto que solo el receptor puede leer*, porque el sobre está bloqueado con la clave personal de ese receptor. Todo el mundo ve que *apareció un sobre*. Nadie salvo el propietario puede ver qué hay dentro.

* **El tablero solo crece.** Los sobres nunca se retiran ni se borran. Se fijan nuevos sobres encima, para siempre.

* **Gastar dinero** significa ponerse detrás de una cortina, demostrar *«Poseo uno de los sobres sin gastar de este tablero y tengo permiso para abrirlo»*, luego depositar un **token de anulación** único en un contenedor público de «gastados» y fijar **sobres nuevos** para quien estés pagando.

Ese pequeño ritual (fijar un token de anulación, fijar sobres nuevos, todo desde detrás de una cortina) *es* un pago de Zcash. Todo lo demás son detalles.

Ahora asignemos a esos elementos sus nombres reales.

---

## 4. Los cinco sustantivos

Estos cinco términos constituyen todo el vocabulario de Zcash blindado. Apréndelos como una *historia*, no como un glosario, y se te quedarán.

| En la historia | Término real de Zcash | Qué es realmente |
|---|---|---|
| El contenido del sobre (importe + propietario + un secreto) | **Nota [Note]** | La «moneda» privada: una porción de valor que pertenece a alguien |
| El sobre sellado y opaco en el tablero | **Compromiso de nota [Note commitment]** | Un sello criptográfico que demuestra que un sobre existe mientras oculta lo que contiene |
| El propio tablón de anuncios | **Árbol de compromisos de notas [Note commitment tree]** | Un registro de solo adición de *cada nota creada* |
| El token de anulación en el contenedor de «gastados» | **Anulador [Nullifier]** | Un marcador único que significa «esta nota ya se ha gastado» |
| La magia «detrás de la cortina» | **Prueba zero-knowledge [Zero-knowledge proof]** | Una prueba de que todo el gasto es válido sin revelar nada de ello |

Si no recuerdas nada más de este artículo, recuerda esta tabla. Todo lo que sigue explica simplemente *por qué* cada pieza debe tener esa forma.

---

## 5. Por qué cada pieza tiene la forma que tiene

Esta es la parte que la mayoría de las explicaciones omiten, y es precisamente la parte que separa «Memoricé algunas palabras» de «Entiendo el diseño». Cada una de las cinco piezas existe para resolver **un problema específico.**

### El compromiso de nota: ocultar el contenido, pero hacer imposible la falsificación

Un sobre común puede abrirse con vapor. Un **compromiso de nota** criptográfico no. Piensa en él como un sobre completamente opaco, sellado *mágicamente*, con dos superpoderes:

- **Ocultación**: Mirar el sobre sellado no te dice *nada* sobre el importe ni el propietario dentro.
- **Vinculación**: Una vez sellado, no se puede sustituir el contenido. No puedes afirmar después que el sobre contenía un importe diferente.

¿Cómo puede un sello hacer ambas cosas a la vez? Esa es una pregunta real con respuesta. Es el tema del **Artículo 3 (compromisos)**. Por ahora, acepta el sobre como magia y sigue adelante.

### El anulador: la parte realmente ingeniosa

Cuando gastas una nota, publicas su **anulador**, el «token de anulación». Este token se calcula a partir de *la propia nota* **y** *tu clave secreta*. Esa fórmula proporciona tres propiedades simultáneamente, y cada una importa:

1. **Solo el propietario puede crearlo.** Necesitas la clave secreta para calcularlo, así que nadie puede gastar tus notas por ti.
2. **Siempre es el *mismo* token para una nota determinada.** Intenta gastar la misma nota dos veces y producirías el token de anulación *idéntico* en ambas ocasiones, y el contenedor público de «gastados» ya lo contiene. Doble gasto rechazado. 
3. **Nadie puede rastrearlo hasta su sobre.** El token de anulación parece completamente ajeno al sobre del que procede.

Esa tercera propiedad es el **corazón de la privacidad de Zcash**, y merece su propia sección más abajo.

### La prueba zero-knowledge: la propia cortina

Todo sucede detrás de una cortina, y lo que entregas al mundo después es una **prueba zero-knowledge**, un tipo de certificado imposible de falsificar. Atestigua silenciosamente todo esto a la vez:

- *el sobre que gasto realmente está fijado al tablero* (es una nota real y existente),
- *realmente tengo permiso para abrirlo* (poseo la clave correcta),
- *mi token de anulación está calculado correctamente* (sin hacer trampas en la comprobación de doble gasto),
- *mis nuevos sobres contienen exactamente tanto dinero como el anterior*: **no se crea dinero de la nada.**

El milagro es que la prueba no revela **ninguno** de esos hechos. Ni el importe, ni las direcciones, ni qué sobre es. Solo te convence de que *cada afirmación anterior es verdadera*. Cómo es esto posible siquiera es el **Artículo 5 (pruebas zero-knowledge)**, el clímax de la serie.

---

## 6. La vida de una sola nota

Una nota *nace*, *vive* en el tablero y, finalmente, *muere*; y, fundamentalmente, su nacimiento y su muerte parecen no tener relación para cualquiera que esté observando.

![alt text](/content-images/image-2-0eca0ea4f7.webp)

---

## 7. Un pago, de principio a fin

Veamos cómo Alice paga a Bob, con cada paso público y privado identificado.

![alt text](/content-images/image-4-7af0dfe795.webp)

Observa la asimetría que hace funcionar la privacidad:

- La **nota antigua de Alice** muere mediante un *anulador* en el contenedor de gastados.
- La **nota nueva de Bob** nace mediante un *compromiso* nuevo en el tablero.
- Para todos los que observan, estos dos eventos no tienen **ninguna conexión visible.** El rastro del dinero se enfría.

> **¿Cómo sabe Bob siquiera que le han pagado?** Su nota está cifrada [encrypted] *para su clave*. Escanea continuamente el tablero y solo *sus* sobres se abren para él, como si tuviera la única llave que encaja en un conjunto específico de cerraduras. La maquinaria detrás de esto son las **claves de visualización [viewing keys]**, un tema posterior.

---

## 8. Lo que ve el mundo frente a lo que permanece oculto

| Hecho sobre el pago | ¿Visible para el público? |
|---|---|
| Que ocurrió *una* transacción blindada |  Sí |
| Que obedeció todas las reglas (sin falsificación ni doble gasto) |  Sí (mediante la prueba) |
| **Quién** envió el dinero |  Oculto |
| **Quién** lo recibió |  Oculto |
| **Cuánto** se envió |  Oculto |
| **Qué** nota anterior se gastó |  Oculto |

Esta es la resolución de la paradoja de la Sección 1. El público verifica las *reglas*, no los *contenidos*. La verificación y la privacidad dejan de entrar en conflicto, porque la prueba zero-knowledge permite comprobar la primera sin tocar los segundos.

---

## 9. El corazón de todo: por qué no se pueden vincular el sobre y el token de anulación

Si entiendes esta idea, entiendes por qué Zcash es privado. Léela despacio.

- Un **sobre (compromiso)** se fija al tablero cuando una nota **nace**.
- Un **token de anulación (anulador)** se deposita en el contenedor cuando esa misma nota se **gasta**, posiblemente meses después.
- Se producen mediante **fórmulas secretas diferentes**, y no existe **ninguna matemática pública** que convierta uno en el otro.

Así que un observador externo ve una secuencia de sobres que aparecen y una secuencia de tokens de anulación que aparecen, pero **no puede emparejarlos**. No puede decir «el token de anulación depositado hoy corresponde al sobre fijado el pasado marzo». El vínculo existe *solo* dentro del conocimiento secreto del propietario de la nota, y la prueba zero-knowledge confirma que el vínculo es válido *sin revelarlo.*

Ese vínculo roto es aquello de lo que se alimentan las empresas de chain analysis en Bitcoin, y lo que Zcash corta deliberadamente.

> **Pon a prueba tu intuición:** Si los anuladores se calcularan únicamente a partir de la nota (sin involucrar una clave secreta), ¿cuál de las tres propiedades de la Sección 5 se rompería y por qué eso destruiría silenciosamente la privacidad? *(Respuesta al final.)*

---

## 10. Una advertencia honesta

Este es un **modelo mental**, no la especificación. Para hacerlo apto para principiantes hemos simplificado silenciosamente varias cosas reales: Zcash ha tenido varios diseños blindados (Sprout, luego Sapling, ahora Orchard); las transacciones reales pueden gastar y crear *varias* notas a la vez; «el tablero» es técnicamente un tipo específico de árbol, no un tablón literal; y el equilibrio de valor se aplica mediante cierta contabilidad criptográfica adicional. Ninguno de esos detalles cambia la historia que acabas de aprender; la perfeccionan. Añadiremos de nuevo la precisión, un artículo a la vez, e indicaremos claramente cuándo lo hagamos.

El buen contenido educativo se gana la confianza diciendo qué dejó fuera. Esta sección es esa promesa.

---

## 11. Los bucles que abrimos (tu mapa de la serie)

Cada «volveremos a esto» anterior es un hilo. Aquí es donde se ata cada uno:

![alt text](/content-images/image-29-27ef4636ff.webp)

| Cabo suelto de este artículo | Dónde se resuelve |
|---|---|
| ¿Cómo puede un sobre sellado ocultar algo *y* ser imposible de falsificar? | Artículo 3: compromisos |
| ¿De dónde proceden las claves y las fórmulas secretas? | Artículos 1 y 2: campos y curvas |
| ¿Qué *es* exactamente «el tablero»? | Artículo 4: árboles de Merkle |
| ¿Cómo puedes demostrar algo sin revelar nada? | Artículo 5: pruebas zero-knowledge |
| ¿Cómo encajan las cinco piezas en el Zcash real? | Artículo 6: el protocolo blindado |

---

## 12. Resumen

- Bitcoin es **transparente**; Zcash ofrece un mundo **blindado** donde el remitente, el receptor y el importe están ocultos.
- La aparente paradoja (*privado pero verificable públicamente*) es el punto central, y puede resolverse.
- Un pago blindado consta de cinco piezas interconectadas: una **nota** (la moneda), un **compromiso de nota** (el sobre sellado), el **árbol de compromisos de notas** (el tablero público), un **anulador** (el token de anulación que evita los dobles gastos) y una **prueba zero-knowledge** (la cortina que demuestra la validez sin revelar nada).
- La privacidad descansa finalmente en **un vínculo cortado**: nadie externo puede conectar el nacimiento de una nota (compromiso) con su muerte (anulador).
- El público verifica las **reglas**, nunca los **contenidos**.

Ahora tienes el mapa. El resto de la serie lo completa.

---

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| **Note** | Una unidad privada de valor, el equivalente de Zcash a una moneda o un billete |
| **Note commitment** | Un sello criptográfico que demuestra que una nota existe sin revelarla |
| **Note commitment tree** | El registro público de solo adición de todos los compromisos de notas |
| **Nullifier** | Un marcador único de «gastada» publicado cuando se utiliza una nota, que evita los dobles gastos |
| **Zero-knowledge proof** | Una prueba de que una afirmación es verdadera sin revelar nada más allá de su veracidad |
| **Shielding / deshielding** | Mover fondos hacia / fuera del mundo privado blindado |
| **Viewing Key** | La clave que permite al propietario detectar y leer las notas dirigidas a él |

---

## Preguntas frecuentes

**¿Zcash es siempre privado?**
No. La privacidad se aplica al mundo *blindado* (direcciones `z...`/`u...`). Las transacciones transparentes (`t...`) son públicas, como Bitcoin.

**Si todo está oculto, ¿qué impide que alguien imprima dinero gratis?**
La prueba zero-knowledge. Obliga matemáticamente a que las salidas de cada transacción estén respaldadas por entradas reales y sin gastar, *mientras* mantiene secretos los importes.

**¿Se puede gastar la misma nota dos veces?**
No. Gastar una nota publica su anulador; un segundo intento publicaría el anulador idéntico, que ya está en el contenedor de «gastados», por lo que la red lo rechaza.

**¿Pueden los externos vincular un remitente con un receptor?**
No. El compromiso (el nacimiento de la nota) y el anulador (la muerte de la nota) no pueden ser emparejados por nadie sin el conocimiento secreto del propietario.

---

### Respuesta a la prueba de intuición (Sección 9)

Si el anulador se calculara *solo* a partir de la nota, sin clave secreta, entonces **cualquiera** podría calcularlo, rompiendo la propiedad n.º 1 (solo el propietario puede gastar). Peor aún, el anulador ahora podría derivarse directamente de la información pública sobre la nota, lo que permitiría a los observadores **vincular el anulador con su compromiso**, rompiendo la propiedad n.º 3 y deshaciendo silenciosamente la privacidad de todo el sistema. La clave secreta es lo que hace que el token de anulación sea a la vez *exclusivamente tuyo* e *invinculable [unlinkable].*

---

### Lo siguiente

**Artículo 1 . Campos finitos:** El extraño y hermoso sistema numérico en el que la aritmética «da la vuelta», y la razón por la que cada pieza de criptografía de esta serie existe allí. Empezaremos, como siempre, con intuición, sin fórmulas hasta que las merezcan.

*Parte de la serie* Zcash desde los primeros principios *para [ZecHub](https://zechub.org). Con licencia CC BY-SA 4.0.*
