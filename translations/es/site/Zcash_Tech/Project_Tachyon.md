<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Proyecto Tachyon

## TL;DR

- Tachyon es un rediseño propuesto de la forma en que las wallets de Zcash encuentran y gastan fondos protegidos, pensado para permitir que la red crezca hasta alcanzar cantidades muy grandes de usuarios
- Hoy una wallet tiene que intentar descifrar una enorme parte de la blockchain para descubrir qué pagos son suyos, y esa es la razón principal por la que la sincronización protegida se siente lenta
- Tachyon reemplaza esto con **sincronización oblivious**, de modo que una wallet obtiene lo que necesita sin escanearlo todo y sin informar a un servidor qué partes solicitó
- También traslada los detalles del pago fuera de la blockchain y a la propia solicitud de pago, lo que simplifica el protocolo pero desplaza la responsabilidad a las wallets
- Es una propuesta, publicada por primera vez en abril de 2025 y nombrada como candidata para NU7. **No ha sido implementada**, y requiere un esfuerzo de ingeniería a la escala de la actualización Sapling

<br/>

## Para quién es esto

- Cualquiera que haya visto sincronizarse una wallet protegida y se haya preguntado por qué tarda tanto
- Personas nuevas que ven constantemente menciones de Tachyon junto a NU7 y la escalabilidad de Zcash
- Lectores que quieren entender primero la idea y después la criptografía

<br/>

## El problema que resuelve Tachyon

Zcash oculta para quién es un pago. Ese es el objetivo principal, y crea un problema incómodo: si nadie puede saber a quién pertenece un pago, ¿cómo encuentra el tuyo tu propia wallet?

En Bitcoin esto es sencillo. Las direcciones son públicas, así que una wallet puede preguntarle a un servidor "¿qué se envió a esta dirección?" y recibir una respuesta. Una wallet de Zcash no puede hacer esa pregunta, porque plantearla revelaría exactamente aquello que el pool protegido está diseñado para ocultar.

Por ello, Zcash hace algo diferente. El remitente cifra los detalles del pago y los incluye dentro de la propia transacción. Después, tu wallet recorre las transacciones de la cadena e intenta descifrar cada una. Casi todos los intentos fallan. Los pocos que tienen éxito son tus pagos. Esto se llama **descifrado de prueba**, y es privado, correcto y lento.

![Actualmente, una wallet de Zcash descarga cada transacción protegida e intenta descifrar cada una, fallando en casi todos los intentos, para encontrar los pocos pagos que le pertenecen](/content-images/tachyon-scanning-today.svg)

El problema está en aquello de lo que depende el trabajo. El esfuerzo de tu wallet viene determinado por el tamaño de la cadena, no por cuántos pagos has recibido realmente. Alguien que nunca ha recibido un solo pago realiza casi tanto trabajo como alguien que los recibe a diario. A medida que Zcash crece, esto empeora para todos. En palabras de la propuesta, "simplemente no escala".

<br/>

## Qué cambia Tachyon

Tachyon aborda el problema desde su raíz: deja de usar la blockchain como canal de entrega para los secretos de pago.

En cambio, los detalles que necesitas viajan con la propia solicitud de pago, fuera de banda. Una solicitud de pago, un URI o un código QR contiene la información que antes se cifraba en la transacción. Sean Bowe describe esto como adoptar por primera vez los **pagos fuera de banda** en un protocolo protegido de Zcash.

Una vez que la cadena ya no transporta esa información, tu wallet deja de tener un motivo para buscarla, y el problema del descifrado de prueba desaparece.

Sin embargo, tu wallet todavía necesita conocer el estado actual de la cadena para poder gastar. Esa es la segunda mitad del diseño, la **sincronización oblivious**: una manera de que una wallet obtenga las cosas específicas que necesita sin revelar al servidor qué cosas solicitó.

![Con Tachyon, el remitente entrega al destinatario los detalles del pago fuera de banda, y la wallet usa sincronización oblivious para recuperar únicamente los datos que necesita en vez de escanear toda la cadena](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Qué significaría para alguien que usa una wallet

- **La sincronización deja de crecer junto con la cadena.** El tiempo que tu wallet dedica a ponerse al día seguiría tu propia actividad en lugar del tamaño de Zcash.
- **Los pagos se parecen más a entregarle una factura a alguien.** La solicitud de pago contiene lo que necesita el destinatario, por lo que el intercambio entre remitente y destinatario importa más que hoy.
- **Las wallets asumen más responsabilidad.** Dado que la cadena ya no conserva una copia cifrada de los detalles de tu pago, perder los datos de tu wallet importa más. La copia de seguridad y la recuperación dejan de ser una característica del protocolo y pasan a ser algo que el software de la wallet debe resolver correctamente.
- **Algunas piezas conocidas se trasladan o desaparecen.** Tachyon saca la diversificación de claves, las claves de visualización y las direcciones de pago del protocolo central, dejándolas en la capa de la wallet. Esta es una de las partes más importantes de la propuesta y aún se está desarrollando.

<br/>

## Una mirada más cercana para lectores técnicos

Tachyon se describe como un cambio compatible de forma inversa para el protocolo Orchard. Podría desplegarse como una actualización del pool Orchard existente o como un pool protegido separado al que se accede mediante un [torniquete](https://zechub.wiki/zcash-tech/the-turnstile), el mismo mecanismo que Zcash utilizó para Ironwood. La elección afecta al despliegue, no al diseño.

Conserva varias cosas de Orchard: la rerandomización de claves RedPallas, los compromisos de valor homomórficos y las firmas de enlace, y la estructura de claves particionada que permite a un dispositivo delegar la generación de pruebas sin ceder autoridad de gasto.

El trabajo de escalabilidad se apoya en los **datos portadores de pruebas**, una técnica en la que los datos viajan junto a una prueba de su propia corrección, de modo que combinarlos con otros datos portadores de pruebas produce algo que hereda y amplía esas pruebas. Esto permite comprimir una gran cantidad de trabajo verificado en algo pequeño y rápido de comprobar. Halo, descubierto por el equipo detrás de Zcash, fue lo que hizo que los datos portadores de pruebas fueran lo bastante prácticos como para construir sobre ellos.

El tercer elemento son los **agregados de transacciones protegidas**, que cambian cómo se comunican los cambios de estado protegidos y tienen efectos secundarios en el funcionamiento de la firma.

<br/>

## Estado del trabajo

Tachyon es una **propuesta, no una funcionalidad implementada**. Se publicó en abril de 2025, y una publicación posterior de mayo de 2025 analizó las implicaciones de consenso. Se nombra como candidato para NU7, la próxima gran actualización después de Ironwood, pero el contenido de NU7 se decide mediante una votación de los poseedores de monedas y no hay nada decidido sobre Tachyon.

El propio autor lo presenta como un plan ejecutable en lugar de investigación especulativa, pero uno que necesita un esfuerzo de ingeniería comparable a Sapling, con algunas preguntas más difíciles deliberadamente dejadas para más adelante.

El trabajo relacionado ya es visible. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), un nodo completo lanzado en julio de 2026, es un esfuerzo conjunto entre Project Tachyon y Valar Group y adelanta algunos de estos cambios a nivel de red. La investigación sobre [recuperación privada de información](https://zechub.wiki/zcash-tech/private-information-retrieval) apunta al mismo cuello de botella de escaneo desde un ángulo distinto.

<br/>

## Ideas erróneas comunes

- **Tachyon no está activo.** Ninguna wallet lo utiliza hoy, y ninguna actualización lo ha activado.
- **Tachyon no es lo mismo que Ironwood.** Ironwood se activó en julio de 2026 y trató el pool Orchard y el torniquete. Tachyon es una propuesta posterior e independiente sobre escalabilidad.
- **Tachyon no reduce la privacidad.** El objetivo es mantener la indistinguibilidad del libro mayor mientras se elimina el coste de escalabilidad, no intercambiar privacidad por velocidad.
- **La verificación de zk-SNARK nunca fue el cuello de botella.** La propuesta deja claro que la parte lenta es cómo las wallets descubren y coordinan el estado, no el coste de comprobar las pruebas.
- **"Orientado a NU7" no es un compromiso.** Lo que se incluya en NU7 se decide mediante una votación.

<br/>

## Glosario

| Término | Significado |
|---|---|
| Descifrado de prueba | Intentar descifrar las transacciones una por una para encontrar las que están dirigidas a ti |
| Distribución de secretos en banda | Colocar el secreto de pago dentro de la transacción en la blockchain, como hace Zcash hoy |
| Pago fuera de banda | Transmitir los detalles del pago directamente entre remitente y destinatario en vez de hacerlo a través de la cadena |
| Sincronización oblivious | Obtener los datos de la cadena que necesita una wallet sin revelar qué datos se solicitaron |
| Datos portadores de pruebas (PCD) | Datos que viajan con una prueba de su propia corrección, de modo que las pruebas pueden combinarse y comprimirse |
| Agregado de transacciones protegidas | La forma de Tachyon de agrupar cambios de estado protegidos, cambiando cómo se comunican y firman |
| indistinguibilidad del libro mayor | La propiedad de que las transacciones protegidas no pueden distinguirse entre sí |

<br/>

## Preguntas frecuentes

**¿Esto hará que mi wallet se sincronice más rápido?** Ese es el objetivo. El tiempo de sincronización seguiría tu propia actividad en lugar del tamaño de la cadena. No se ha implementado nada, así que todavía no hay una cifra medida que citar.

**¿Debo hacer algo ahora?** No. Tachyon es una propuesta. Si se adopta, llegaría mediante una actualización de red con el aviso habitual.

**¿Eliminar las claves de visualización significa perder la capacidad de compartir acceso de lectura?** La propuesta traslada esa capacidad fuera del protocolo central y a la capa de la wallet. Cómo se verá esto en la práctica es una de las preguntas abiertas.

**¿Mi dinero estará en riesgo si se implementa Tachyon?** El despliegue utilizaría una actualización de Orchard o un torniquete, ambos diseñados para que el valor se mueva bajo reglas públicas de contabilidad. La página de Ironwood explica cómo funciona un torniquete.

<br/>

## Páginas relacionadas

- [Recuperación privada de información](https://zechub.wiki/zcash-tech/private-information-retrieval) - otro enfoque para el mismo cuello de botella de escaneo de wallets
- [Nodo Zakura](https://zechub.wiki/zcash-tech/zakura-node) - un nodo construido en parte a partir del esfuerzo de ingeniería de Tachyon
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - la actualización que se activó en julio de 2026, a menudo confundida con Tachyon
- [El torniquete](https://zechub.wiki/zcash-tech/the-turnstile) - el mecanismo que Tachyon podría utilizar si se despliega como su propio pool
- [Seguridad poscuántica](https://zechub.wiki/zcash-tech/post-quantum-security) - dónde se sitúa Tachyon junto al trabajo de protocolo a más largo plazo
- [Cómo se organiza Zcash](https://zechub.wiki/start-here/how-zcash-is-organized) - quién realiza este trabajo y cómo encaja el ecosistema

<br/>

## Recursos

- [Tachyon: Escalando Zcash con sincronización oblivious](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 de abril de 2025, la propuesta original
- [Tachyaction a distancia](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 de mayo de 2025, implicaciones de consenso y protocolo, escrito para desarrolladores de protocolos
- [Blog de Sean Bowe](https://seanbowe.com/blog/) - donde se publica la serie Tachyon
- [tachyon.z.cash](https://tachyon.z.cash/) - sitio del proyecto
