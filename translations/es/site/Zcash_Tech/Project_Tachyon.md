<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Proyecto Tachyon

## Resumen

- Tachyon es un rediseño propuesto de la forma en que las billeteras [wallets] de Zcash encuentran y gastan fondos blindados [shielded], concebido para permitir que la red crezca hasta cantidades muy grandes de usuarios
- Hoy, una billetera debe intentar descifrar una gran parte de la blockchain para descubrir qué pagos son suyos, y esa es la principal razón por la que la sincronización blindada se siente lenta
- Tachyon sustituye eso por la **sincronización inconsciente [oblivious synchronization]**, de modo que una billetera obtiene lo que necesita sin escanearlo todo y sin decirle a un servidor qué partes quería
- También traslada los detalles de pago fuera de la blockchain y a la propia solicitud de pago, lo que simplifica el protocolo pero desplaza la responsabilidad a las billeteras
- Es una propuesta, publicada por primera vez en abril de 2025. **No forma parte de NU7** y **no se ha implementado**, y requiere un esfuerzo de ingeniería de la escala de la actualización [upgrade] Sapling

<br/>

## Para quién es esto

- Cualquiera que haya visto sincronizarse una billetera blindada y se haya preguntado por qué tarda tanto
- Recién llegados que siguen viendo mencionado Tachyon junto a la escalabilidad [scaling] de NU7 y Zcash
- Lectores que quieren primero la idea y después la criptografía

<br/>

## El problema que resuelve Tachyon

Zcash oculta para quién es un pago. Ese es todo el propósito, y crea un problema incómodo: si nadie puede saber a quién pertenece un pago, ¿cómo encuentra la tuya tu propia billetera?

En Bitcoin esto es fácil. Las direcciones [addresses] son públicas, así que una billetera puede preguntar a un servidor «¿qué se envió a esta dirección?» y obtener una respuesta. Una billetera de Zcash no puede hacer esa pregunta, porque hacerla revelaría exactamente aquello que el pool blindado está diseñado para ocultar.

Por lo tanto, Zcash hace algo diferente. El remitente cifra los detalles del pago y los introduce dentro de la propia transacción [transaction]. Después, tu billetera procesa las transacciones de la cadena [chain] e intenta descifrar cada una. Casi todos los intentos fallan. Los pocos que tienen éxito son tus pagos. Esto se llama **descifrado de prueba [trial decryption]**, y es privado, correcto y lento.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

El inconveniente es de qué depende el trabajo. El esfuerzo que realiza tu billetera está determinado por el tamaño de la cadena, no por cuántos pagos has recibido realmente. Alguien que nunca ha recibido un solo pago realiza casi tanto trabajo como alguien que los recibe a diario. A medida que Zcash crece, eso empeora para todos. En palabras de la propuesta, «simplemente no escala».

<br/>

## Qué cambia Tachyon

Tachyon ataca el problema desde su raíz: deja de usar la blockchain como canal de entrega de secretos de pago.

En su lugar, los detalles que necesitas viajan con la propia solicitud de pago, fuera de banda. Una solicitud de pago, un URI o un código QR transporta la información que antes se cifraba en la transacción. Sean Bowe describe esto como adoptar por primera vez los **pagos fuera de banda [out-of-band payments]** en un protocolo blindado de Zcash.

Una vez que la cadena ya no transporta esa información, tu billetera ya no tiene motivo para buscarla, y el problema del descifrado de prueba desaparece.

Sin embargo, tu billetera todavía necesita conocer el estado actual de la cadena para gastar. Esa es la segunda mitad del diseño, la **sincronización inconsciente**: una forma de que una billetera obtenga las cosas específicas que necesita sin revelar al servidor qué cosas solicitó.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Qué significaría para alguien que usa una billetera

- **La sincronización deja de crecer con la cadena.** El tiempo que tu billetera dedicaría a ponerse al día seguiría tu propia actividad en lugar del tamaño de Zcash.
- **Los pagos se parecen más a entregarle una factura a alguien.** La solicitud de pago lleva lo que necesita el destinatario, por lo que el intercambio entre remitente y destinatario importa más que hoy.
- **Las billeteras asumen más responsabilidad.** Debido a que la cadena ya no conserva una copia cifrada de tus detalles de pago, perder los datos de tu billetera importa más. La copia de seguridad y la recuperación pasan de ser una característica del protocolo a algo que el software de billetera debe hacer bien.
- **Algunas piezas conocidas se trasladan o desaparecen.** Tachyon elimina del protocolo central la diversificación de claves, las claves de visualización [viewing keys] y las direcciones de pago, dejándolas en la capa de billetera. Esta es una de las partes más importantes de la propuesta y todavía se está analizando.

<br/>

## Una mirada más detallada para lectores técnicos

Tachyon se describe como un cambio compatible de forma inversa para el protocolo Orchard. Podría implementarse ya sea como una actualización del pool Orchard existente o como un pool blindado independiente al que se llega mediante un [turnstile](https://zechub.wiki/zcash-tech/the-turnstile), el mismo mecanismo que utilizó Zcash para Ironwood. La elección afecta la implementación, no el diseño.

Conserva varias cosas de Orchard: la rerandomización de claves RedPallas, los compromisos [commitments] de valor homomórficos y las firmas de vinculación, así como la estructura de claves particionada que permite a un dispositivo delegar la generación de pruebas sin ceder la autoridad de gasto.

El trabajo de escalabilidad se apoya en los **datos portadores de pruebas [proof-carrying data]**, una técnica en la que los datos viajan junto a una prueba de su propia corrección, de modo que combinarlos con otros datos portadores de pruebas produce algo que hereda y amplía esas pruebas. Esto permite comprimir una gran cantidad de trabajo verificado en algo pequeño y rápido de comprobar. Halo, descubierto por el equipo detrás de Zcash, fue lo que hizo que los datos portadores de pruebas fueran lo bastante prácticos para desarrollarlos.

La tercera vertiente son los **agregados de transacciones blindadas [shielded transaction aggregates]**, que cambian cómo se comunican los cambios de estado blindado y tienen efectos posteriores en cómo funciona la firma.

<br/>

## Estado del trabajo

Tachyon es una **propuesta, no una característica implementada**. Se publicó en abril de 2025, y una publicación de seguimiento en mayo de 2025 analizó las implicaciones para el consenso. Se nombró como candidato para NU7, la siguiente actualización después de Ironwood, pero el alcance de NU7 acordado el 17 de septiembre de 2026 no lo incluye: [ZIP 259](https://zips.z.cash/zip-0259) enumera lo que implementa NU7, y el anuncio del [foro](https://forum.zcashcommunity.com/t/nu7-timeline/57655) dice que no aparece ningún formato de transacción nuevo en él. No se ha establecido ninguna fecha de activación para Tachyon.

El propio autor lo presenta como un plan viable en lugar de una investigación especulativa, pero que necesita un esfuerzo de ingeniería comparable al de Sapling, con algunas preguntas más difíciles deliberadamente dejadas para más adelante.

El trabajo relacionado ya es visible. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), un nodo completo [full node] publicado en julio de 2026, es un esfuerzo conjunto entre Project Tachyon y Valar Group, y adelanta algunos de estos cambios a nivel de red. La investigación sobre [recuperación privada de información](https://zechub.wiki/zcash-tech/private-information-retrieval) apunta al mismo cuello de botella de escaneo desde otro ángulo.

<br/>

## Ideas erróneas comunes

- **Tachyon no está activo.** Ninguna billetera lo usa hoy, y ninguna actualización lo ha activado.
- **Tachyon no es lo mismo que Ironwood.** Ironwood se activó en julio de 2026 y abordó el pool Orchard y el turnstile. Tachyon es una propuesta independiente y posterior sobre escalabilidad.
- **Tachyon no es una reducción de privacidad.** El objetivo es mantener la indistinguibilidad del libro mayor mientras se elimina el coste de escalabilidad, no intercambiar privacidad por velocidad.
- **La verificación de zk-SNARK nunca fue el cuello de botella.** La propuesta deja claro que la parte lenta es cómo las billeteras descubren y coordinan el estado, no el coste de comprobar las pruebas.
- **Tachyon no está en NU7.** En algún momento fue nombrado como candidato, pero el alcance acordado en septiembre de 2026 cubre bloques de 25 segundos, reciclaje de tarifas y el fin de las transacciones de versión 4, sin ningún formato de transacción nuevo ([ZIP 259](https://zips.z.cash/zip-0259)).

<br/>

## Glosario

| Término | Significado |
|---|---|
| Trial decryption | Intentar descifrar las transacciones una por una para encontrar las dirigidas a ti |
| In-band secret distribution | Introducir el secreto de pago dentro de la transacción en la blockchain, como hace Zcash hoy |
| Out-of-band payment | Transmitir los detalles de pago directamente entre remitente y destinatario en lugar de a través de la cadena |
| Oblivious synchronization | Obtener los datos de la cadena que necesita una billetera sin revelar qué datos se solicitaron |
| Proof-carrying data (PCD) | Datos que viajan con una prueba de su propia corrección, de modo que las pruebas pueden combinarse y comprimirse |
| Shielded transaction aggregate | La forma de Tachyon de agrupar cambios de estado blindado, cambiando cómo se comunican y firman |
| ledger indistinguishability | La propiedad de que las transacciones blindadas no pueden distinguirse unas de otras |

<br/>

## Preguntas frecuentes

**¿Esto hará que mi billetera se sincronice más rápido?** Ese es el objetivo. El tiempo de sincronización seguiría tu propia actividad en lugar del tamaño de la cadena. Aún no se ha implementado nada, por lo que todavía no hay una cifra medida que citar.

**¿Debo hacer algo ahora?** No. Tachyon es una propuesta. Si se adopta, llegaría mediante una actualización de red [network upgrade] con el aviso habitual.

**¿Eliminar las claves de visualización significa perder la capacidad de compartir acceso de lectura?** La propuesta traslada esa capacidad fuera del protocolo central y a la capa de billetera. Cómo se verá eso en la práctica es una de las preguntas abiertas.

**¿Está mi dinero en riesgo si se implementa Tachyon?** La implementación usaría una actualización Orchard o un turnstile, ambos diseñados para que el valor se mueva bajo reglas de contabilidad pública. La página de Ironwood explica cómo funciona un turnstile.

<br/>

## Páginas relacionadas

- [Recuperación privada de información](https://zechub.wiki/zcash-tech/private-information-retrieval) - otro enfoque para el mismo cuello de botella de escaneo de billeteras
- [Zakura Nodo](https://zechub.wiki/zcash-tech/zakura-node) - un nodo construido en parte a partir del esfuerzo de ingeniería de Tachyon
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - la actualización que se activó en julio de 2026, a menudo confundida con Tachyon
- [El Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - el mecanismo que Tachyon podría usar si se implementa como su propio pool
- [Seguridad poscuántica](https://zechub.wiki/zcash-tech/post-quantum-security) - dónde se sitúa Tachyon junto al trabajo de protocolo a más largo plazo
- [Cómo se organiza Zcash](https://zechub.wiki/start-here/how-zcash-is-organized) - quién está realizando este trabajo y cómo encaja el ecosistema

<br/>

## Recursos

- [Tachyon: Escalando Zcash con sincronización inconsciente](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 de abril de 2025, la propuesta original
- [Tachyaction a distancia](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 de mayo de 2025, implicaciones de consenso y protocolo, escrito para desarrolladores de protocolos
- [El blog de Sean Bowe](https://seanbowe.com/blog/) - donde se publica la serie Tachyon
- [tachyon.z.cash](https://tachyon.z.cash/) - sitio del proyecto
