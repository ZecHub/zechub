<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ¿Es Zcash poscuántico?

## Respuesta corta

No, todavía no.

Desde la actualización Ironwood, Zcash es **recuperable ante ataques cuánticos** para los fondos mantenidos en el pool Ironwood. Es un paso real, pero no es lo mismo que tener seguridad poscuántica. ZIP 2005, la especificación en la que se basa, lo dice directamente: el cambio "por sí solo no hace que el protocolo sea seguro contra adversarios cuánticos". Prepara los fondos Ironwood para que puedan moverse mediante un futuro Protocolo de Recuperación cuando se desactive la criptografía actual.

Esta página distingue lo que Zcash protege hoy, lo que cambió Ironwood, lo que sigue expuesto y lo que es únicamente una propuesta. La [tabla de estado](#status-table) cerca del final muestra la situación de cada elemento y cuándo se verificó por última vez.

<br/>

## Para quién es esto

- Cualquiera que haya visto "recuperable ante ataques cuánticos" y lo haya interpretado como "a prueba de computación cuántica"
- Titulares que deciden si mover fondos a Ironwood
- Redactores y moderadores que necesitan una respuesta con fuentes a la que dirigir a las personas

Para información de contexto sobre la computación cuántica en sí, comienza con [Seguridad poscuántica en Zcash](/zcash-tech/post-quantum-security).

<br/>

## Por qué la pregunta es confusa

"Poscuántico" se usa como si fuera una sola propiedad. Para Zcash son al menos cuatro preguntas distintas, y tienen respuestas diferentes:

1. **Privacidad.** ¿Puede un atacante cuántico ver quién pagó a quién y cuánto?
2. **Gasto.** ¿Puede un atacante cuántico gastar monedas que no le pertenecen?
3. **Inflación.** ¿Puede un atacante cuántico crear ZEC de la nada?
4. **Recuperación.** Si hay que desactivar la criptografía actual, ¿los usuarios honestos aún pueden recuperar sus fondos?

Ironwood solo cambia la respuesta a la cuarta pregunta, y únicamente para las notas del pool Ironwood.

La amenaza detrás de todo esto es un atacante que puede calcular logaritmos discretos en las curvas elípticas que usa Zcash. Un ordenador cuántico suficientemente grande que ejecute el algoritmo de Shor sería una forma de lograrlo. ZIP 2005 señala que hallar un **único** logaritmo discreto basta para provocar inflación arbitraria o robar fondos.

<br/>

## Lo que Zcash protege hoy

Esta tabla describe el protocolo tal como funciona ahora, frente a un atacante capaz de romper logaritmos discretos. Se aplica a todos los pools blindados, incluido Ironwood, porque Ironwood utiliza el mismo circuito Orchard, pruebas Halo 2 y firmas RedPallas que Orchard.

| Propiedad | Frente a un atacante cuántico hoy | Lo que cambió Ironwood |
|---|---|---|
| Privacidad | Se mantiene si el atacante no conoce tu dirección blindada. Las pruebas y las firmas rerandomizadas no filtran información adicional. Si el atacante sí conoce la dirección, puede descifrar las notas enviadas a ella, incluso las antiguas guardadas de la cadena. | Nada. ZIP 2005: "La situación con respecto a la privacidad no cambia para ningún pool". |
| Gasto | No está protegido. Un atacante podría falsificar pruebas o firmas de gasto y robar de cualquier pool blindado, incluso de direcciones que nunca haya visto. | Nada todavía. La protección solo llega después de un futuro cambio al Protocolo de Recuperación. |
| Inflación | No está protegida. Un atacante podría falsificar una prueba aparentemente válida y crear ZEC dentro de cualquier pool blindado, posiblemente sin que nadie lo note. El único límite es el [torniquete](/zcash-tech/the-turnstile): ningún pool puede pagar más que su saldo registrado. | Nada todavía. Las notas Ironwood ahora se comprometen con todo su contenido de una manera que un atacante cuántico no debería poder falsificar, que es lo que necesita un futuro Protocolo de Recuperación para mantener sólida la oferta. |
| Recuperación | Las notas Sprout, Sapling y Orchard no tienen vía de recuperación. Una vez que se desactiven sus protocolos, todo lo que quede en ellas será inaccesible. | En principio, toda nota Ironwood es recuperable. Ninguna nota Sapling o Orchard lo es. |

El ZEC transparente es un caso aparte. Sus firmas ECDSA pueden falsificarse una vez que se conoce la clave pública. Para una dirección transparente normal, eso ocurre la primera vez que gastas desde ella, y también hay una ventana breve mientras una transacción permanece sin confirmar en el mempool. ZIP 2005 no cambia nada de eso.

<br/>

## Lo que cambió Ironwood

Ironwood es la actualización de red NU6.3. Se activó en Mainnet en el bloque 3,428,143 el 28 de julio de 2026. Su objetivo principal fue la integridad de la oferta tras el error de solidez Orchard (consulta la página [Ironwood](/zcash-tech/ironwood)), y la recuperabilidad cuántica de ZIP 2005 se incluyó como parte de ella.

- **Un nuevo formato de nota.** Toda nota de salida Ironwood usa el formato recuperable ante ataques cuánticos (byte inicial del texto plano de la nota `0x03`). La aleatoriedad de la nota ahora se deriva de todos sus campos, por lo que la nota queda vinculada a su contenido mediante un hash y no solo por matemáticas de curvas elípticas.
- **Una vía de recuperación solo para notas Ironwood.** ZIP 326 afirma explícitamente que toda nota Ironwood es recuperable y que ninguna nota Orchard lo es. Una configuración de wallet no cambia eso.
- **Orchard dejó de aceptar valor nuevo.** Las recompensas Coinbase ya no pueden ir a Orchard, y Orchard ya no puede enviar a una dirección Orchard diferente, por lo que el nuevo valor blindado llega a Ironwood.
- **Se indica a las wallets que muevan todo.** ZIP 2005 dice que las wallets DEBERÍAN mover todos los fondos que controlan, incluidos los fondos transparentes, Sprout y Sapling, a notas Ironwood tan pronto como sea práctico, y seguir haciéndolo a medida que lleguen nuevos fondos.

Lo que no cambió Ironwood: la criptografía usada hoy para gastar y demostrar, el cifrado de notas y cualquier aspecto del ZEC transparente.

<br/>

## Limitaciones que permanecen

**Existe una ventana de exposición.** Desde la activación de Ironwood hasta que se desactiven los protocolos antiguos, un atacante cuántico aún podría robar, inflar o bloquear fondos en todos los pools blindados. ZIP 2005 denomina a esto el "período crítico de exposición" y advierte que un ataque durante este período aún podría perjudicar la capacidad de un titular para recuperarse posteriormente. Por eso dice que Zcash debe desactivar Orchard, Sapling y Sprout **antes** de que los ataques cuánticos sean factibles.

**La desactivación no tiene fecha.** Ningún ZIP programa desactivar Orchard o Sapling. ZIP 2003, un borrador y candidato a NU7, deshabilitaría los gastos Sprout al no permitir transacciones de versión 4. En abril de 2026 se inició en el foro una discusión sobre un modo de solo retiro Sapling.

**El Protocolo de Recuperación no está terminado.** ZIP 2005 solo lo esboza y dice que los detalles "están sujetos a cambios". No se ha implementado nada al respecto.

**Cosechar ahora, descifrar después.** Los textos cifrados de notas de Ironwood, Orchard, Sapling y Sprout son todos públicos en la cadena. Alguien puede guardarlos hoy y descifrarlos más tarde si también conoce la dirección receptora. Cada dirección que publiques o compartas forma parte de ese riesgo. ZIP 2005 dice que "se están considerando otros cambios de protocolo" para transferencias futuras.

**Los fondos transparentes no están cubiertos.** Las direcciones desde las que se ha gastado, o que se han reutilizado, tienen claves públicas expuestas. La recuperabilidad de algunas direcciones transparentes solo es una idea por ahora (ZIP 2007, véase más abajo).

**Las configuraciones FROST tienen una salvedad adicional.** Con FROST, cada participante posee una clave de gasto cuántica (`qsk`), y un atacante cuántico que la posea podría ser capaz de robar. ZIP 2005 recomienda mover los fondos FROST a un protocolo totalmente poscuántico con soporte de umbral cuando exista uno.

<br/>

## Propuestas e investigación

Ninguna de estas está activa.

- **Protocolo de Recuperación.** El mecanismo que permitiría realmente gastar fondos Ironwood después del cambio. Esbozado en ZIP 2005, pero no especificado.
- **ZIP 2007, recuperabilidad para algunas direcciones transparentes.** Solo un número ZIP reservado con discusión en [zips#1302](https://github.com/zcash/zips/issues/1302). La idea es que las salidas P2PKH y P2SH cuyas claves públicas nunca se hayan revelado podrían ser recuperables, con garantías más débiles que Ironwood.
- **Privacidad poscuántica para direcciones conocidas.** Abierta desde 2022 en [zips#1133](https://github.com/zcash/zips/issues/1133), que señala que Zcash ya está "destinado a tener privacidad poscuántica" cuando las direcciones se mantienen secretas y pregunta cómo extenderla a direcciones conocidas, por ejemplo con un esquema de encapsulación de claves poscuántico como Kyber (ahora ML-KEM). En junio de 2026, [zips#1307](https://github.com/zcash/zips/issues/1307) propuso un ZIP para documentar las propiedades actuales de privacidad y posibles soluciones.
- **Proyecto Tachyon.** Una actualización de escalabilidad propuesta. Su sitio afirma que obtendría "privacidad poscuántica completa" como efecto secundario, al mover la entrega de pagos fuera de la cadena y usar intercambio de claves poscuántico. Su biblioteca de datos con pruebas, Ragu, se describe como "todavía en construcción". Consulta [Proyecto Tachyon](/zcash-tech/project-tachyon).
- **Un Zcash totalmente poscuántico.** Pruebas, firmas y compromisos poscuánticos en conjunto. Se sigue en [zips#1134](https://github.com/zcash/zips/issues/1134), abierto desde 2016. No hay especificación ni cronograma.

<br/>

## Tabla de estado

Verificado por última vez el 13 de septiembre de 2026. El estado del encabezado de un ZIP y su estado en la red son cosas distintas: ZIP 2005 sigue diciendo "Propuesto" en su encabezado, aunque sus reglas se aplican en Mainnet desde julio de 2026.

| Elemento | Estado de ZIP | Estado de la red | Fecha | Fuente |
|---|---|---|---|---|
| Pool Ironwood con notas recuperables ante ataques cuánticos (NU6.3) | ZIP 2005 Propuesto, ZIP 229 y ZIP 258 Borrador | **Activado** en Mainnet | 28 jul. 2026, bloque 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard cerrado a valor nuevo | ZIP 2006 Reservado, reglas en ZIP 258 | **Activado** en Mainnet | 28 jul. 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Wallets moviendo fondos a Ironwood | Guía en ZIP 2005, ZIP 318 y ZIP 326 (Borrador) | Recomendado, depende de tu wallet | Desde el 28 jul. 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Protocolo de Recuperación | Esbozado solo dentro de ZIP 2005 | **No implementado** | Sin fecha | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Desactivación de Orchard y Sapling | Sin ZIP | **No programada** | Discusión Sapling desde abr. 2026 | [Foro](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Deshabilitar gastos Sprout (ZIP 2003) | Borrador, candidato a NU7 | **No activado** | Sin fecha | [ZIP 2003](https://zips.z.cash/zip-2003) |
| Recuperabilidad transparente (ZIP 2007) | Reservado | **Propuesta** | ZIP reservado el 5 jul. 2025, discusión abierta el 17 jun. 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Privacidad poscuántica para direcciones conocidas | Incidencias abiertas, sin ZIP | **Investigación** | #1133 abierta el 18 ago. 2022, #1307 abierta el 23 jun. 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Proyecto Tachyon | Sin ZIP | **Propuesta**, en desarrollo | Publicado por primera vez en abr. 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Protocolo totalmente poscuántico | Incidencia abierta, sin ZIP | **Trabajo futuro** | #1134 abierta el 28 mar. 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

En las encuestas de opinión Zcash Foundation de NU7 (febrero de 2026), la recuperabilidad cuántica tuvo un 90,5 % de apoyo de ZCAP y un 94,6 % de los poseedores de monedas, y Tachyon tuvo un apoyo casi universal. Fueron encuestas de opinión, no decisiones sobre lo que se incorpora a NU7.

<br/>

## Qué puedes hacer ahora

- **Mueve tus fondos a Ironwood.** Las notas Sapling y Orchard nunca serán recuperables. Mover valor entre pools muestra el importe en la cadena, así que ZIP 318 hace que las wallets dividan los saldos en importes fijos y los envíen gradualmente. Deja que tu wallet lo haga en lugar de mover todo de una vez.
- **No publiques direcciones blindadas que no necesites.** La privacidad frente a un futuro atacante cuántico depende de que no conozca tu dirección. Las direcciones unificadas son baratas de generar, así que proporciona una nueva a cada pagador. ZIP 229 recomienda la rotación de direcciones por esta razón.
- **No reutilices direcciones transparentes.** Cuando gastas desde una, su clave pública queda en la cadena para siempre.
- **Mantén segura tu frase semilla.** En el Protocolo de Recuperación descrito, un gasto de recuperación debe demostrar que conoces tu clave de gasto, y las wallets normales derivan esa clave de la semilla.
- **Ignora las afirmaciones de que "Zcash es a prueba de computación cuántica".** Todavía no lo es, y quienes redactan las especificaciones lo dicen.

<br/>

## Malentendidos comunes

- **"Ironwood es poscuántico."** No. Usa la misma criptografía Orchard, y ZIP 2005 dice que la función "no hace que el protocolo Orchard sea seguro frente a ataques cuánticos".
- **"Recuperable ante ataques cuánticos significa seguro frente a ordenadores cuánticos hoy."** No. Significa que los fondos Ironwood podrían recuperarse tras un futuro cambio, siempre que ese cambio ocurra a tiempo.
- **"El Zcash blindado ya tiene privacidad poscuántica."** Solo cuando el atacante no conoce tu dirección. Las direcciones conocidas están expuestas en todos los pools.
- **"Tachyon ya añadió privacidad poscuántica."** Tachyon es una propuesta. Nada de ello está activo.
- **"Los ordenadores cuánticos rompen todas las partes de Zcash."** Las funciones hash solo se debilitan, no se rompen, con los ataques cuánticos conocidos. La recuperabilidad cuántica se basa precisamente en esa diferencia.

<br/>

## Páginas relacionadas

- [Seguridad poscuántica en Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [El torniquete](/zcash-tech/the-turnstile)
- [Proyecto Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Pools blindados](/using-zcash/shielded-pools)

<br/>

## Fuentes

- [ZIP 2005: Ironwood Recuperabilidad cuántica](https://zips.z.cash/zip-2005)
- [ZIP 229: Formato de transacción versión 6](https://zips.z.cash/zip-0229)
- [ZIP 258: Despliegue de la actualización de red NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318: Migración de Orchard a Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326: Consecuencias de NU6.3 para las wallets](https://zips.z.cash/zip-0326)
- [ZIP 2003: No permitir transacciones de versión 4](https://zips.z.cash/zip-2003)
- [ZIP 209: Prohibir saldos negativos de los pools de valor blindado de la cadena](https://zips.z.cash/zip-0209)
- [zips#1302: Recuperabilidad cuántica de un subconjunto del protocolo transparente](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Privacidad poscuántica para Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Privacidad de Zcash frente a adversarios cuánticos y capaces de romper logaritmos discretos](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Zcash totalmente poscuántico](https://github.com/zcash/zips/issues/1134)
- [Hoja de ruta del proyecto Tachyon](https://tachyon.z.cash/roadmap/)
- [NU7 Resultados de la encuesta: lo que escuchamos y hacia dónde vamos a partir de aquí](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Bloque 3,428,143 en Blockchair](https://blockchair.com/zcash/block/3428143)
- [Solicitud en el foro: ¿Es Zcash poscuántico?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
