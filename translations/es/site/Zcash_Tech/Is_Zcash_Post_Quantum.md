<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# ¿Es Zcash poscuántico?

## Respuesta corta

No, todavía no.

Desde la actualización de Ironwood, Zcash es **recuperable frente a la computación cuántica** para los fondos mantenidos en el pool Ironwood. Es un paso real, pero no es lo mismo que ser seguro frente a la computación cuántica. ZIP 2005, la especificación que lo respalda, lo dice directamente: el cambio «no hace por sí solo que el protocolo sea seguro contra adversarios cuánticos». Prepara los fondos de Ironwood para que puedan moverse mediante un futuro Protocolo de Recuperación una vez que se desactive la criptografía actual.

Esta página separa lo que Zcash protege hoy, lo que cambió Ironwood, lo que sigue expuesto y lo que es solo una propuesta. La [tabla de estado](#status-table) cerca del final muestra la situación de cada parte y cuándo se verificó por última vez.

<br/>

## Para quién es esto

- Cualquier persona que haya visto «recuperable frente a la computación cuántica» y lo haya entendido como «resistente a la computación cuántica»
- Titulares que deciden si mover fondos a Ironwood
- Redactores y moderadores que necesitan una respuesta con fuentes a la que dirigir a la gente

Como contexto sobre la computación cuántica en sí, empieza con [Seguridad poscuántica en Zcash](/zcash-tech/post-quantum-security).

<br/>

## Por qué la pregunta es confusa

«Poscuántico» se usa como si fuera una sola propiedad. Para Zcash hay al menos cuatro preguntas separadas, y tienen respuestas distintas:

1. **Privacidad [Privacy].** ¿Puede un atacante cuántico ver quién pagó a quién y cuánto?
2. **Gasto [Spending].** ¿Puede un atacante cuántico gastar monedas que no le pertenecen?
3. **Inflación [Inflation].** ¿Puede un atacante cuántico crear ZEC de la nada?
4. **Recuperación [Recovery].** Si hay que desactivar la criptografía actual, ¿pueden los usuarios honestos recuperar sus fondos?

Ironwood solo cambia la respuesta a la cuarta pregunta, y únicamente para las notas [notes] en el pool Ironwood.

La amenaza detrás de todo esto es un atacante que puede calcular logaritmos discretos en las curvas elípticas que utiliza Zcash. Un ordenador cuántico suficientemente grande que ejecute el algoritmo de Shor sería una forma de hacerlo. ZIP 2005 señala que encontrar un **solo** logaritmo discreto basta para causar inflación arbitraria o robar fondos.

<br/>

## Qué protege Zcash hoy

Esta tabla describe el protocolo tal como funciona ahora, frente a un atacante que puede romper logaritmos discretos. Se aplica a todos los pools blindados [shielded], incluido Ironwood, porque Ironwood utiliza el mismo circuito Orchard, pruebas Halo 2 y firmas RedPallas que Orchard.

| Propiedad | Frente a un atacante cuántico hoy | Lo que cambió Ironwood |
|---|---|---|
| Privacidad | Se mantiene si el atacante no conoce tu dirección blindada. Las pruebas y las firmas rerandomizadas no filtran nada adicional. Si el atacante conoce la dirección, puede descifrar las notas enviadas a ella, incluidas las antiguas guardadas de la red. | Nada. ZIP 2005: «La situación con respecto a la privacidad no cambia para ningún pool». |
| Gasto | No está protegido. Un atacante podría falsificar pruebas o firmas de gasto y robar de cualquier pool blindado, incluso de direcciones que nunca haya visto. | Todavía nada. La protección solo llega después de un futuro cambio al Protocolo de Recuperación. |
| Inflación | No está protegida. Un atacante podría falsificar una prueba que parezca válida y crear ZEC dentro de cualquier pool blindado, posiblemente sin que nadie lo note. El único límite es el [turnstile](/zcash-tech/the-turnstile): ningún pool puede pagar más que su saldo registrado. | Todavía nada. Las notas de Ironwood ahora se comprometen con todos sus contenidos de una forma que un atacante cuántico no debería poder falsificar, que es lo que necesita un futuro Protocolo de Recuperación para mantener sólido el suministro. |
| Recuperación | Las notas de Sprout, Sapling y Orchard no tienen ruta de recuperación. Una vez que se desactiven sus protocolos, todo lo que quede en ellas será inaccesible. | Cada nota de Ironwood es recuperable en principio. Ninguna nota de Sapling ni Orchard lo es. |

ZEC transparente es un caso separado. Sus firmas ECDSA pueden falsificarse una vez que se conoce la clave pública. Para una dirección transparente normal, eso sucede la primera vez que gastas desde ella, y también hay una ventana breve mientras una transacción permanece sin confirmar en el mempool. ZIP 2005 no cambia nada de eso.

<br/>

## Qué cambió Ironwood

Ironwood es la actualización de red [network upgrade] NU6.3. Se activó en Mainnet en el bloque 3.428.143 el 28 de julio de 2026. Su objetivo principal era la integridad del suministro después del error de solidez de Orchard (consulta la página [Ironwood](/zcash-tech/ironwood)), y la recuperabilidad cuántica de ZIP 2005 se incluyó como parte de ella.

- **Un nuevo formato de nota.** Cada nota de salida de Ironwood utiliza el formato recuperable frente a la computación cuántica (byte inicial del texto plano de la nota `0x03`). La aleatoriedad de la nota ahora se deriva de todos sus campos, de modo que la nota queda vinculada a sus contenidos mediante un hash en vez de solo mediante matemáticas de curvas elípticas.
- **Una ruta de recuperación solo para notas de Ironwood.** ZIP 326 especifica claramente que cada nota de Ironwood es recuperable y ninguna nota de Orchard lo es. Una configuración de la billetera [wallet] no cambia eso.
- **Orchard dejó de aceptar valor nuevo.** Las recompensas de Coinbase ya no pueden ir a Orchard, y Orchard ya no puede enviar a una dirección Orchard diferente, por lo que el nuevo valor blindado llega a Ironwood.
- **Se indica a las billeteras que muevan todo.** ZIP 2005 indica que las billeteras DEBERÍAN mover todos los fondos que controlan, incluidos los fondos transparentes, de Sprout y Sapling, a notas de Ironwood tan pronto como sea práctico, y seguir haciéndolo a medida que lleguen fondos nuevos.

Lo que Ironwood no cambió: la criptografía utilizada hoy para gastar y demostrar, el cifrado de notas y cualquier aspecto de ZEC transparente.

<br/>

## Limitaciones que permanecen

**Existe una ventana de exposición.** Desde la activación de Ironwood hasta que se desactiven los protocolos antiguos, un atacante cuántico aún podría robar, inflar o bloquear fondos en todos los pools blindados. ZIP 2005 denomina a esto el «período crítico de exposición» y advierte que un ataque durante él aún podría perjudicar la capacidad de un titular para recuperarse más adelante. Por eso dice que Zcash debe desactivar Orchard, Sapling y Sprout **antes** de que los ataques cuánticos se vuelvan viables.

**La desactivación no tiene fecha, salvo para Sprout.** Ningún ZIP programa la desactivación de Orchard o Sapling. Sprout es diferente: [ZIP 259](https://zips.z.cash/zip-0259) enumera ZIP 2003 entre los cambios que despliega NU7, por lo que las transacciones de versión 4 pasan a ser inválidas cuando se activa NU7 y cualquier ZEC que quede en el pool Sprout se vuelve imposible de gastar. La activación en Mainnet está establecida para el bloque 3.543.405, prevista para el 5 de noviembre de 2026 ([ZIP 259](https://zips.z.cash/zip-0259), [anuncio en el foro](https://forum.zcashcommunity.com/t/nu7-timeline/57655)). En abril de 2026 comenzó en el foro una discusión sobre un modo de solo retiro para Sapling.

**El Protocolo de Recuperación no está terminado.** ZIP 2005 solo lo esboza y dice que los detalles «están sujetos a cambios». No se ha desplegado nada de él.

**Cosechar ahora, descifrar después.** Los textos cifrados de las notas para Ironwood, Orchard, Sapling y Sprout son todos públicos en la red. Alguien puede guardarlos hoy y descifrarlos más adelante, si también conoce la dirección receptora. Cada dirección que publicas o entregas forma parte de ese riesgo. ZIP 2005 dice que «se están considerando otros cambios de protocolo» para transferencias futuras.

**Los fondos transparentes no están cubiertos.** Las direcciones desde las que se ha gastado, o que se han reutilizado, tienen claves públicas expuestas. La recuperabilidad para algunas direcciones transparentes es solo una idea por ahora (ZIP 2007, véase más abajo).

**Las configuraciones de FROST tienen una salvedad adicional.** Con FROST, cada participante posee una clave de gasto cuántica (`qsk`), y un atacante cuántico que la posea puede ser capaz de robar. ZIP 2005 recomienda mover los fondos de FROST a un protocolo completamente poscuántico con soporte de umbral cuando exista uno.

<br/>

## Propuestas e investigación

Ninguna de estas está activa.

- **Protocolo de Recuperación.** El mecanismo que realmente permitiría gastar fondos de Ironwood después del cambio. Se esboza en ZIP 2005, pero no está especificado.
- **ZIP 2007, recuperabilidad para algunas direcciones transparentes.** Solo es un número ZIP reservado con discusión en [zips#1302](https://github.com/zcash/zips/issues/1302). La idea es que las salidas P2PKH y P2SH cuyas claves públicas nunca se hayan revelado podrían ser recuperables, con garantías más débiles que Ironwood.
- **Privacidad poscuántica para direcciones conocidas.** Abierta desde 2022 en [zips#1133](https://github.com/zcash/zips/issues/1133), que señala que Zcash «ya pretende ser privado frente a la computación cuántica» cuando las direcciones se mantienen secretas y pregunta cómo extenderlo a direcciones conocidas, por ejemplo con un esquema de encapsulación de claves poscuántico como Kyber (ahora ML-KEM). En junio de 2026, [zips#1307](https://github.com/zcash/zips/issues/1307) propuso un ZIP para documentar las propiedades de privacidad actuales y posibles soluciones.
- **Proyecto Tachyon.** Una actualización de escalabilidad propuesta. Su sitio dice que obtendría «privacidad poscuántica completa» como efecto secundario, al trasladar la entrega de pagos fuera de la cadena y utilizar intercambio de claves poscuántico. Su biblioteca de datos con pruebas, Ragu, se describe como «aún en construcción». Consulta [Proyecto Tachyon](/zcash-tech/project-tachyon).
- **Un Zcash completamente poscuántico.** Pruebas, firmas y compromisos poscuánticos juntos. Se sigue en [zips#1134](https://github.com/zcash/zips/issues/1134), abierto desde 2016. No hay especificación ni calendario.

<br/>

## Tabla de estado

Última comprobación el 13 de septiembre de 2026, excepto la fila de Sprout, que se actualizó el 9 de octubre de 2026. El estado del encabezado de un ZIP y su estado en la red son cosas distintas: ZIP 2005 aún dice «Propuesto» en su encabezado, aunque sus reglas se aplican en Mainnet desde julio de 2026.

| Elemento | Estado de ZIP | Estado de la red | Fecha | Fuente |
|---|---|---|---|---|
| Pool de Ironwood con notas recuperables frente a la computación cuántica (NU6.3) | ZIP 2005 Propuesto, ZIP 229 y ZIP 258 Borrador | **Activado** en Mainnet | 28 jul 2026, bloque 3.428.143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard cerrado a valor nuevo | ZIP 2006 Reservado, reglas en ZIP 258 | **Activado** en Mainnet | 28 jul 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Billeteras moviendo fondos a Ironwood | Guía en ZIP 2005, ZIP 318 y ZIP 326 (Borrador) | Recomendado, depende de tu billetera | Desde el 28 jul 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Protocolo de Recuperación | Esbozado solo dentro de ZIP 2005 | **No implementado** | Sin fecha | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Desactivación de Orchard y Sapling | Sin ZIP | **No programado** | Discusión de Sapling desde abr 2026 | [Foro](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Deshabilitar gastos de Sprout (ZIP 2003) | Propuesto, desplegado por NU7 según ZIP 259 (Propuesto) | **No activado** | Altura de Mainnet 3.543.405, prevista para 5 nov 2026 | [ZIP 2003](https://zips.z.cash/zip-2003), [ZIP 259](https://zips.z.cash/zip-0259) |
| Recuperabilidad transparente (ZIP 2007) | Reservado | **Propuesta** | ZIP reservado el 5 jul 2025, discusión abierta el 17 jun 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Privacidad poscuántica para direcciones conocidas | Problemas abiertos, sin ZIP | **Investigación** | #1133 abierto el 18 ago 2022, #1307 abierto el 23 jun 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Proyecto Tachyon | Sin ZIP | **Propuesta**, en desarrollo | Publicado por primera vez en abr 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Protocolo completamente poscuántico | Problema abierto, sin ZIP | **Trabajo futuro** | #1134 abierto el 28 mar 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

En las encuestas de opinión de Zcash Foundation de NU7 (febrero de 2026), la recuperabilidad cuántica tuvo un apoyo del 90,5 % de ZCAP y del 94,6 % de los titulares de monedas, y Tachyon tuvo un apoyo casi universal. Eran encuestas de opinión, no decisiones sobre lo que entra en NU7.

<br/>

## Qué puedes hacer ahora

- **Mueve tus fondos a Ironwood.** Las notas de Sapling y Orchard nunca serán recuperables. Mover valor entre pools muestra el importe on-chain, por lo que ZIP 318 hace que las billeteras dividan los saldos en importes fijos y los envíen con el tiempo. Deja que tu billetera lo haga en vez de moverlo todo de una vez.
- **No publiques direcciones blindadas que no necesites.** La privacidad frente a un futuro atacante cuántico depende de que no conozca tu dirección. Las direcciones unificadas son baratas de generar, así que entrega una nueva a cada pagador. ZIP 229 recomienda la rotación de direcciones por este motivo.
- **No reutilices direcciones transparentes.** Una vez que gastas desde una, su clave pública queda en la red para siempre.
- **Mantén segura tu frase semilla [seed phrase].** En el Protocolo de Recuperación tal como está esbozado, un gasto de recuperación debe demostrar que conoces tu clave de gasto, y las billeteras normales derivan esa clave de la semilla.
- **Ignora las afirmaciones de que «Zcash es resistente a la computación cuántica».** Todavía no lo es, y quienes redactan las especificaciones lo dicen.

<br/>

## Malentendidos comunes

- **«Ironwood es poscuántico».** No. Ejecuta la misma criptografía de Orchard, y ZIP 2005 dice que la característica «no hace que el protocolo Orchard sea seguro contra ataques cuánticos».
- **«Recuperable frente a la computación cuántica significa seguro hoy frente a ordenadores cuánticos».** No. Significa que los fondos de Ironwood podrían recuperarse después de un cambio futuro, siempre que ese cambio ocurra a tiempo.
- **«El Zcash blindado ya tiene privacidad poscuántica».** Solo cuando el atacante no conoce tu dirección. Las direcciones conocidas están expuestas en todos los pools.
- **«Tachyon ya añadió privacidad poscuántica».** Tachyon es una propuesta. Nada de ello está activo.
- **«Los ordenadores cuánticos rompen todas las partes de Zcash».** Las funciones hash solo se debilitan, no se rompen, mediante ataques cuánticos conocidos. La recuperabilidad cuántica se basa precisamente en esa diferencia.

<br/>

## Páginas relacionadas

- [Seguridad poscuántica en Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [El Turnstile](/zcash-tech/the-turnstile)
- [Proyecto Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Pools blindados](/using-zcash/shielded-pools)

<br/>

## Fuentes

- [ZIP 2005: Ironwood Recuperabilidad cuántica](https://zips.z.cash/zip-2005)
- [ZIP 229: Formato de transacción versión 6](https://zips.z.cash/zip-0229)
- [ZIP 258: Despliegue de la actualización de red NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318: Migración de Orchard a Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326: Consecuencias de NU6.3 para las billeteras](https://zips.z.cash/zip-0326)
- [ZIP 2003: Prohibir transacciones de versión 4](https://zips.z.cash/zip-2003)
- [ZIP 209: Prohibir saldos negativos de pools de valor blindado de la red](https://zips.z.cash/zip-0209)
- [zips#1302: Recuperabilidad cuántica de un subconjunto del protocolo transparente](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Privacidad poscuántica para Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Privacidad de Zcash frente a adversarios cuánticos y que rompen logaritmos discretos](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Zcash completamente poscuántico](https://github.com/zcash/zips/issues/1134)
- [Hoja de ruta del proyecto Tachyon](https://tachyon.z.cash/roadmap/)
- [NU7 Resultados de las encuestas: lo que escuchamos y hacia dónde vamos desde aquí](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Bloque 3.428.143 en ZecBlock](https://zecblock.com/block/3428143)
- [Solicitud en el foro: ¿Es Zcash poscuántico?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
