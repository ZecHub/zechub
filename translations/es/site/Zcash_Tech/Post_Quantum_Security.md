<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Seguridad poscuántica en Zcash

## TL;DR

- Las computadoras cuánticas son un riesgo futuro porque podrían romper parte de la criptografía de clave pública que usan hoy las blockchains.
- "Poscuántico" significa criptografía que funciona en computadoras normales, pero está diseñada para resistir ataques de futuras computadoras cuánticas.
- Zcash no es completamente poscuántico hoy.
- El Zcash blindado reduce la cantidad de datos públicos de transacciones que futuros atacantes pueden estudiar, pero el uso blindado no es lo mismo que una resistencia cuántica completa.
- Zcash se está preparando mediante investigación, ZIP y propuestas de actualización como ZIP 2005 y Project Tachyon.
- Una migración poscuántica segura tiene que proteger al mismo tiempo los fondos, la privacidad, las billeteras, los exchanges y las reglas de consenso.

## ¿Qué es la computación cuántica?

Una computadora normal almacena información como bits. Cada bit es `0` o `1`.

Una computadora cuántica usa bits cuánticos, llamados qubits. Los qubits pueden ser usados por algoritmos especiales que resuelven algunos problemas matemáticos mucho más rápido que las computadoras normales.

Eso no significa que una computadora cuántica sea más rápida en todo. El riesgo es específico. Parte de la criptografía depende de problemas matemáticos que son muy difíciles para las computadoras normales, pero mucho más fáciles para una computadora cuántica suficientemente grande.

Para las blockchains, el ejemplo más importante es la criptografía de clave pública. Las claves públicas y las firmas se usan para demostrar que un usuario está autorizado a gastar monedas.

## Por qué las blockchains se preocupan

Las blockchains usan criptografía para varios trabajos diferentes:

| Herramienta criptográfica | Qué hace | Impacto cuántico |
| --- | --- | --- |
| Firmas digitales | Demuestran que el propietario autorizó un gasto | Alto riesgo para los sistemas comunes de curva elíptica |
| Funciones hash | Construyen direcciones, compromisos, árboles de Merkle y desafíos | Menor riesgo, pero los márgenes de seguridad importan |
| Pruebas de conocimiento cero | Demuestran que las transacciones blindadas son válidas sin revelar detalles | Depende del sistema de pruebas y de sus supuestos |
| Acuerdo de claves | Ayuda a las billeteras a cifrar datos de notas para los receptores | Necesita una revisión cuidadosa bajo un modelo de amenaza cuántica |

Una computadora cuántica suficientemente potente podría amenazar muchos esquemas de firma usados hoy, incluidas las firmas de curva elíptica. Esto importa porque una firma es lo que permite a la red saber que una transacción fue autorizada por la clave correcta.

Las funciones hash son diferentes. El algoritmo de Grover puede acelerar la búsqueda por fuerza bruta, pero no rompe las funciones hash de la misma manera directa. Márgenes de seguridad mayores pueden ayudar.

## ¿Qué es la criptografía poscuántica?

La criptografía poscuántica es criptografía diseñada para seguir siendo segura tanto frente a computadoras normales como frente a futuras computadoras cuánticas.

No significa que la criptografía use una computadora cuántica. Significa que el sistema se basa en problemas matemáticos difíciles diferentes.

En 2024, NIST publicó los primeros estándares poscuánticos finalizados:

- **ML-KEM** para establecimiento de claves
- **ML-DSA** para firmas digitales
- **SLH-DSA** para firmas digitales basadas en hash

Estos estándares son un gran hito, pero una blockchain no puede simplemente cambiar un algoritmo por otro de la noche a la mañana. Las reglas de consenso, las billeteras, las hardware wallets, los tamaños de transacción, las comisiones y la privacidad deben tenerse en cuenta.

## Cómo aparece el riesgo cuántico on-chain

Una forma sencilla de pensar en el riesgo es:

1. Un usuario crea un par de claves.
2. La clave pública o los datos de firma pueden aparecer on-chain.
3. Un futuro atacante cuántico podría ser capaz de usar ese material público para aprender la clave privada.
4. Si los fondos siguen estando controlados por esa clave, podrían estar en riesgo.

Las blockchains transparentes exponen mucha información por diseño. Las direcciones, los montos y los vínculos entre transacciones son públicos. El material de clave pública también puede hacerse visible cuando se gastan monedas.

Esta es una razón por la que reutilizar direcciones es perjudicial. La reutilización da a los observadores más datos para conectar hoy y da a futuros atacantes más material histórico para analizar.

## ¿Qué tiene de diferente Zcash?

Zcash admite tanto transacciones transparentes como blindadas.

El Zcash transparente funciona más como el uso de una blockchain pública al estilo Bitcoin. Las direcciones, los montos y las relaciones entre transacciones son visibles.

El Zcash blindado es diferente. Las transacciones blindadas usan pruebas de conocimiento cero para que la red pueda verificar que una transacción sigue las reglas sin revelar el remitente, el receptor ni el monto.

Esto le da a Zcash una importante ventaja de privacidad:

- Se publican menos datos de transacciones para que todos los vean.
- Los usuarios evitan crear un grafo público de pagos cuando permanecen blindados.
- Los futuros observadores tienen menos historial financiero público que analizar.
- La divulgación selectiva puede ocurrir mediante viewing keys en lugar de registros públicos por defecto.

Pero el Zcash blindado no es automáticamente poscuántico. Los pools blindados aún dependen de supuestos criptográficos. La autorización de gasto, los compromisos de notas, los nullifiers, los sistemas de pruebas, el cifrado y las claves de las billeteras necesitan una revisión cuidadosa.

La versión corta:

> El uso blindado reduce la exposición pública, pero Zcash aún necesita actualizaciones poscuánticas deliberadas.

## Mapa de riesgos de Zcash

| Área | Explicación para principiantes | Preocupación poscuántica |
| --- | --- | --- |
| Direcciones transparentes | Direcciones públicas y grafo público de transacciones | Riesgos similares a otras blockchains transparentes |
| Autorización de gasto | La prueba de que un usuario está autorizado a gastar | Los esquemas de firma pueden necesitar reemplazo o migración |
| Notas blindadas | Registros privados de valor dentro de los pools blindados | Algunos componentes pueden necesitar nuevos supuestos o herramientas de recuperación |
| zk-SNARKs | Pruebas de que las transacciones blindadas son válidas | Los supuestos del sistema de pruebas necesitan revisión |
| Escaneo de billeteras | Cómo las billeteras encuentran y descifran notas recibidas | El acuerdo de claves y el cifrado de notas necesitan revisión |
| Migración | Mover fondos a una criptografía más segura | Debe evitar tanto la pérdida de fondos como las filtraciones de privacidad |

## Cómo se está preparando Zcash

### Zcash tiene un proceso de actualización de red

Zcash ya ha cambiado su criptografía antes. Sapling hizo que las transacciones blindadas fueran más fáciles de usar. NU5 introdujo Orchard, Unified Address, y Halo 2.

Esto importa porque la preparación poscuántica no es un parche de software de una sola línea. Requiere actualizaciones de red coordinadas, cambios en las billeteras, auditorías y tiempo para que los usuarios migren.

Las actualizaciones pasadas de Zcash muestran que el ecosistema tiene experiencia moviéndose desde criptografía antigua hacia diseños más nuevos.

### Halo y Orchard redujeron supuestos anteriores

Halo 2 es usado por Orchard, el pool blindado moderno de Zcash. Una mejora importante es que Halo eliminó la necesidad de una configuración confiable para el sistema de pruebas de Orchard.

Eso no es lo mismo que seguridad poscuántica. Sigue siendo relevante porque muestra que Zcash puede reemplazar componentes criptográficos fundamentales cuando hay mejores diseños disponibles.

### ZIP 2005 se enfoca en la recuperabilidad cuántica

ZIP 2005 se titula "Orchard Quantum Recoverability". Propone cambios destinados a ayudar a los usuarios de Orchard a recuperar o migrar fondos si los ataques cuánticos contra supuestos antiguos llegan a ser prácticos.

La recuperabilidad no es lo mismo que una seguridad poscuántica completa. Es más limitada y aun así útil:

- La seguridad poscuántica completa intenta evitar que los ataques cuánticos funcionen.
- La recuperabilidad ofrece a los usuarios honestos una mejor vía si la criptografía antigua deja de ser segura.

Para principiantes, piensa en esto como un plan de salida de emergencia. No reemplaza todo el edificio, pero ayuda a las personas a salir de la habitación vieja de forma segura si la cerradura antigua se debilita.

### Project Tachyon apunta a mejoras de protocolo más amplias

Project Tachyon es una propuesta de actualización de Zcash enfocada en escala, sincronización y crecimiento del estado. Su sitio público dice que la propuesta busca reducir el tamaño de las transacciones, disminuir el crecimiento del estado de los validadores y obtener privacidad poscuántica completa como efecto secundario.

Debido a que Tachyon es una propuesta, todavía depende de trabajo de ingeniería, revisión y aprobación de la comunidad antes de su activación. Se entiende mejor como parte de la investigación activa y la dirección de actualización de Zcash, no como una función que los usuarios ya tengan hoy.

### La investigación y los estándares están avanzando

El mundo más amplio de la criptografía también está avanzando. Los estándares poscuánticos de NIST dan a los implementadores componentes más sólidos para firmas y establecimiento de claves. Los investigadores de conocimiento cero siguen estudiando sistemas de pruebas que puedan sostenerse bajo supuestos cuánticos.

Zcash puede beneficiarse de ese trabajo, pero aun así tiene que adaptarlo a una blockchain que preserve la privacidad.

## Posibles enfoques de actualización futura

### Autorización de gasto poscuántica

Zcash podría eventualmente necesitar una autorización de gasto que no dependa de esquemas de firma vulnerables a la computación cuántica.

Esto podría usar firmas poscuánticas, firmas híbridas u otro diseño. Un diseño híbrido usa tanto verificaciones clásicas como poscuánticas durante un período de transición, para que el sistema no dependa de un solo supuesto.

El desafío es el tamaño y el costo. Las firmas poscuánticas pueden ser más grandes que las firmas actuales, lo que afecta el tamaño de las transacciones, el ancho de banda, las comisiones, las billeteras móviles y las hardware wallets.

### Nuevos formatos de direcciones y claves

La nueva criptografía suele necesitar nuevas claves y direcciones. Los usuarios necesitarían una ruta de migración clara desde los formatos antiguos hacia formatos más seguros.

La migración debería ser simple en las billeteras. La mayoría de los usuarios no debería tener que entender cada detalle criptográfico para mantenerse segura.

### Migración que preserve la privacidad

La migración es especialmente sensible para Zcash. Si muchos usuarios mueven fondos desde pools antiguos a nuevos pools siguiendo patrones evidentes, la propia migración podría filtrar información.

Un buen plan de migración necesita proteger:

- Los fondos de los usuarios
- La privacidad de los usuarios
- La compatibilidad de las billeteras
- El soporte de los exchanges
- El soporte de hardware wallets
- La seguridad del consenso de la red

### Revisión del sistema de pruebas poscuántico

Reemplazar firmas no es suficiente. El diseño blindado de Zcash también depende de pruebas de conocimiento cero y compromisos.

El trabajo futuro podría necesitar revisar o reemplazar:

- Los supuestos de zk-SNARK
- Los compromisos polinomiales
- Los hashes de desafío Fiat-Shamir
- Los compromisos de notas
- La construcción de nullifiers
- Los supuestos del árbol de Merkle
- El cifrado de notas y el comportamiento de las viewing keys

Algunos componentes pueden ser aceptables con parámetros ajustados. Otros componentes pueden necesitar nuevos diseños.

## Ejemplos para principiantes

### Ejemplo 1: La cerradura antigua

Imagina una caja fuerte con una cerradura que hoy es fuerte. Una nueva herramienta inventada en el futuro podría abrir esa cerradura antigua rápidamente.

La criptografía poscuántica es como reemplazar la cerradura por un diseño que no se espera que la nueva herramienta pueda romper.

Para una blockchain, reemplazar la cerradura es difícil porque cada billetera, nodo, exchange y dispositivo de hardware debe entender el nuevo diseño.

### Ejemplo 2: La caja pública de recibos

Los datos transparentes de blockchain son como poner cada recibo en una caja pública para siempre. Aunque hoy nadie pueda leer todos los patrones, las herramientas futuras podrían aprender más más adelante.

El Zcash blindado intenta evitar publicar esos recibos en primer lugar. Eso ayuda a la privacidad a largo plazo, pero la cerradura que protege el sistema blindado aún tiene que revisarse para un futuro cuántico.

### Ejemplo 3: El plan de salida

La recuperabilidad es como planificar una ruta de salida antes de que haya un incendio. Esperas no necesitarla, pero es mucho más seguro diseñarla temprano que durante una emergencia.

ZIP 2005 encaja en esta idea para las notas de Orchard.

## Qué pueden hacer hoy los usuarios

Los usuarios no necesitan entrar en pánico. Las grandes computadoras cuánticas públicas capaces de romper la criptografía desplegada en blockchains no están disponibles hoy.

Los buenos hábitos siguen ayudando:

- Preferir el uso de Zcash blindado cuando sea posible.
- Evitar reutilizar direcciones.
- Mantener las billeteras actualizadas.
- Seguir los anuncios de actualizaciones de red de Zcash.
- Estar atentos a los ZIP y a la orientación de las billeteras sobre recuperabilidad o migración.
- No asumir que la actividad transparente es privada.
- No mover fondos basándose en rumores; esperar una orientación clara de desarrolladores de confianza de Zcash y de los equipos de billeteras.

## Desafíos

Las actualizaciones poscuánticas son difíciles para cualquier blockchain.

Los desafíos comunes incluyen:

- Claves y firmas más grandes
- Transacciones más grandes
- Mayores costos de verificación
- Más uso de ancho de banda
- Nuevas auditorías de seguridad
- Soporte para hardware wallets
- Rendimiento de billeteras móviles
- Integración con exchanges y custodios
- Filtraciones de privacidad durante la migración
- Acuerdo de la comunidad sobre cambios de consenso

Para Zcash, la parte más difícil no es solo mantener las monedas gastables. La parte difícil es mantenerlas gastables mientras se preserva la privacidad que hace diferente a Zcash.

## Resumen

Las computadoras cuánticas podrían eventualmente amenazar parte de la criptografía usada por las blockchains. La criptografía poscuántica es la respuesta a largo plazo, pero debe desplegarse con cuidado.

Zcash no es completamente poscuántico hoy. Sin embargo, Zcash tiene fortalezas útiles: las transacciones blindadas reducen la exposición pública, la red tiene un historial de actualizaciones criptográficas y la investigación actual, como ZIP 2005 y Project Tachyon, ya está orientada a futuros riesgos cuánticos.

Para principiantes, la idea principal es simple: la privacidad hoy reduce la exposición futura de datos, y las actualizaciones cuidadosas pueden ayudar a Zcash a avanzar hacia una seguridad más fuerte en la era cuántica sin sacrificar la usabilidad.

## Páginas relacionadas

- [Pools blindados](/using-zcash/shielded-pools) - Cómo las transacciones blindadas de Zcash protegen los detalles de las transacciones
- [Halo](/zcash-tech/halo) - El sistema de pruebas de Zcash sin una configuración confiable
- [ZKP y ZK-SNARKS](/zcash-tech/zk-snarks) - Cómo funcionan las pruebas de conocimiento cero en Zcash
- [Viewing Keys](/zcash-tech/viewing-keys) - Cómo funciona la divulgación selectiva para el Zcash blindado
- [Activos blindados de Zcash](/zcash-tech/zcash-shielded-assets) - Futuros activos blindados y soporte para activos privados
- [La privacidad como principio central](/privacy/privacy-as-a-core-principle) - Por qué importa la privacidad financiera

## Referencias

- [NIST: Primeros estándares finalizados de cifrado poscuántico](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Proyecto de Criptografía Poscuántica de NIST](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Project Tachyon](https://tachyon.z.cash/)
- [Especificación del protocolo Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Libro de Halo 2](https://zcash.github.io/halo2/)
