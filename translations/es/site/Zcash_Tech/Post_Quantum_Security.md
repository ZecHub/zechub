<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Seguridad poscuántica [Post-Quantum Security] en Zcash

## Resumen

- Las computadoras cuánticas [quantum computers] son un riesgo futuro porque podrían quebrar parte de la criptografía de clave pública utilizada hoy por las blockchains.
- «Poscuántica» [Post-quantum] se refiere a criptografía que se ejecuta en computadoras normales, pero está diseñada para resistir ataques de futuras computadoras cuánticas.
- Zcash no es completamente poscuántico hoy.
- El uso blindado [Shielded] de Zcash reduce la cantidad de datos públicos de transacciones que los futuros atacantes pueden estudiar, pero el uso blindado no equivale a una resistencia cuántica total.
- Zcash se está preparando mediante investigación, ZIP y propuestas de actualización como ZIP 2005 y el Proyecto Tachyon.
- Una migración poscuántica segura debe proteger al mismo tiempo los fondos, la privacidad [privacy], las billeteras [wallets], los exchanges [exchanges] y las reglas de consenso [consensus].

Para conocer qué cambió Ironwood y consultar un estado fechado de cada componente, vea [¿Es Zcash poscuántico?](/zcash-tech/is-zcash-post-quantum).

## ¿Qué Es La Computación Cuántica?

Una computadora normal almacena información como bits. Cada bit es `0` o `1`.

Una computadora cuántica utiliza bits cuánticos, llamados cúbits. Los cúbits pueden ser utilizados por algoritmos especiales que resuelven algunos problemas matemáticos mucho más rápido que las computadoras normales.

Eso no significa que una computadora cuántica sea más rápida en todo. El riesgo es específico. Parte de la criptografía depende de problemas matemáticos que son muy difíciles para las computadoras normales, pero mucho más fáciles para una computadora cuántica suficientemente grande.

Para las blockchains, el ejemplo más importante es la criptografía de clave pública. Las claves públicas y las firmas [signatures] se utilizan para demostrar que un usuario tiene permiso para gastar monedas.

## Por Qué Importan Las Blockchains

Las blockchains utilizan criptografía para varios trabajos distintos:

| Herramienta criptográfica | Qué hace | Impacto cuántico |
| --- | --- | --- |
| Firmas digitales | Demuestran que el propietario autorizó un gasto | Riesgo alto para los sistemas comunes de curva elíptica |
| Funciones hash | Crean direcciones [addresses], compromisos [commitments], árboles de Merkle y desafíos | Riesgo menor, pero los márgenes de seguridad importan |
| Pruebas zero-knowledge [Zero-knowledge proofs] | Demuestran que las transacciones blindadas son válidas sin revelar detalles | Depende del sistema de prueba y de las suposiciones |
| Acuerdo de claves | Ayuda a las billeteras a cifrar [encrypt] los datos de notas [notes] para los receptores | Requiere una revisión cuidadosa bajo un modelo de amenaza cuántica |

Una computadora cuántica suficientemente potente podría amenazar muchos esquemas de firma utilizados hoy, incluidas las firmas de curva elíptica. Esto importa porque una firma es lo que permite a la red saber que una transacción fue autorizada por la clave correcta.

Las funciones hash son diferentes. El algoritmo de Grover puede acelerar la búsqueda por fuerza bruta, pero no rompe las funciones hash de la misma forma directa. Unos márgenes de seguridad mayores pueden ayudar.

## ¿Qué Es La Criptografía Poscuántica?

La criptografía poscuántica es criptografía diseñada para mantenerse segura tanto frente a computadoras normales como frente a futuras computadoras cuánticas.

No significa que la criptografía utilice una computadora cuántica. Significa que el sistema se basa en diferentes problemas matemáticos difíciles.

En 2024, NIST publicó los primeros estándares poscuánticos finalizados:

- **ML-KEM** para el establecimiento de claves
- **ML-DSA** para firmas digitales
- **SLH-DSA** para firmas digitales basadas en hash

Estos estándares son un hito importante, pero una blockchain no puede simplemente cambiar un algoritmo por otro de la noche a la mañana. Deben considerarse las reglas de consenso, las billeteras, los hardware wallets, los tamaños de las transacciones, las tarifas [fees] y la privacidad.

## Cómo Aparece El Riesgo Cuántico On-Chain

Una forma sencilla de pensar sobre el riesgo es:

1. Un usuario crea un par de claves.
2. La clave pública o los datos de firma pueden aparecer on-chain.
3. Un futuro atacante cuántico podría utilizar ese material público para obtener la clave privada.
4. Si los fondos siguen controlados por esa clave, pueden estar en riesgo.

Las blockchains transparentes [transparent] exponen mucha información por diseño. Las direcciones, los importes y los vínculos entre transacciones son públicos. El material de clave pública también puede hacerse visible cuando se gastan monedas.

Esta es una razón por la que reutilizar direcciones es perjudicial. La reutilización da a los observadores más datos que conectar hoy y proporciona a los futuros atacantes más material histórico que analizar.

## ¿Qué Es Diferente En Zcash?

Zcash admite transacciones tanto transparentes como blindadas.

El uso transparente de Zcash funciona más como el uso de una blockchain pública al estilo de Bitcoin. Las direcciones, los importes y las relaciones entre transacciones son visibles.

El uso blindado de Zcash es diferente. Las transacciones blindadas utilizan pruebas zero-knowledge para que la red pueda verificar que una transacción sigue las reglas sin revelar el remitente, el receptor ni el importe.

Esto proporciona a Zcash una importante ventaja de privacidad:

- Se publican menos datos de transacciones para que todos los vean.
- Los usuarios evitan crear un grafo público de pagos cuando se mantienen blindados.
- Los futuros observadores tienen menos historial financiero público que analizar.
- La divulgación selectiva [selective disclosure] puede realizarse mediante claves de visualización [viewing keys], en lugar de registros públicos por defecto.

Pero el uso blindado de Zcash no es automáticamente poscuántico. Los pools [pools] blindados todavía dependen de suposiciones criptográficas. La autorización de gasto, los compromisos de notas, los anuladores [nullifiers], los sistemas de prueba, el cifrado, y las claves de billetera necesitan una revisión cuidadosa.

La versión corta:

> El uso blindado reduce la exposición pública, pero Zcash todavía necesita actualizaciones poscuánticas deliberadas.

## Mapa De Riesgos De Zcash

| Área | Explicación para principiantes | Preocupación poscuántica |
| --- | --- | --- |
| Direcciones transparentes | Direcciones públicas y grafo público de transacciones | Riesgos similares a otras blockchains transparentes |
| Autorización de gasto | La prueba de que un usuario tiene permiso para gastar | Los esquemas de firma podrían necesitar sustitución o migración |
| Notas blindadas | Registros privados de valor dentro de pools blindados | Algunos componentes podrían necesitar nuevas suposiciones o herramientas de recuperación |
| zk-SNARKs | Pruebas de que las transacciones blindadas son válidas | Las suposiciones del sistema de prueba necesitan revisión |
| Escaneo de billetera | Cómo las billeteras encuentran y descifran las notas recibidas | El acuerdo de claves y el cifrado de notas necesitan revisión |
| Migración | Trasladar fondos a una criptografía más segura | Debe evitar tanto la pérdida de fondos como las filtraciones de privacidad |

## Cómo Se Está Preparando Zcash

### Zcash Tiene Un Proceso De Actualización De Red

Zcash ha cambiado antes su criptografía. Sapling hizo que las transacciones blindadas fueran más fáciles de utilizar. NU5 introdujo Orchard, direcciones unificadas y Halo 2.

Esto importa porque la preparación poscuántica no es un parche de software de una sola línea. Requiere actualizaciones de red coordinadas, cambios en las billeteras, auditorías y tiempo para que los usuarios migren.

Las actualizaciones anteriores de Zcash demuestran que el ecosistema tiene experiencia pasando de criptografía más antigua hacia diseños más nuevos.

### Halo Y Orchard Redujeron Suposiciones Antiguas

Halo 2 es utilizado por Orchard, el pool blindado moderno de Zcash. Una mejora importante es que Halo eliminó la necesidad de una configuración confiable [trusted setup] para el sistema de pruebas Orchard.

Eso no es lo mismo que seguridad poscuántica. Sigue siendo relevante porque demuestra que Zcash puede sustituir grandes componentes criptográficos básicos cuando hay mejores diseños disponibles.

### ZIP 2005 Se Centra En La Recuperabilidad Cuántica

ZIP 2005 se titula «Recuperabilidad cuántica de Orchard». Propone cambios destinados a ayudar a los usuarios de Orchard a recuperar o migrar fondos si los ataques cuánticos contra suposiciones antiguas se vuelven prácticos.

La recuperabilidad no es lo mismo que la seguridad poscuántica total. Es más limitada y aun así útil:

- La seguridad poscuántica total busca evitar que los ataques cuánticos funcionen.
- La recuperabilidad proporciona a los usuarios honestos una mejor vía si la criptografía antigua deja de ser segura.

Para principiantes, piense en esto como un plan de salida de emergencia. No reemplaza todo el edificio, pero ayuda a las personas a salir de forma segura de la habitación antigua si la cerradura antigua se debilita.

### El Proyecto Tachyon Considera Mejoras Más Amplias Del Protocolo

El Proyecto Tachyon es una propuesta de actualización de Zcash centrada en la escala, la sincronización y el crecimiento del estado. Su sitio público indica que la propuesta busca reducir las transacciones, disminuir el crecimiento del estado de los validadores y obtener como efecto secundario privacidad poscuántica total.

Debido a que Tachyon es una propuesta, todavía depende de trabajo de ingeniería, revisión y aprobación de la comunidad antes de su activación. Se entiende mejor como parte de la investigación activa y la dirección de actualización de Zcash, no como una función que los usuarios ya tengan hoy.

### La Investigación Y Los Estándares Avanzan

El mundo más amplio de la criptografía también está avanzando. Los estándares poscuánticos de NIST proporcionan a los implementadores componentes más sólidos para firmas y establecimiento de claves. Los investigadores zero-knowledge siguen estudiando sistemas de prueba que puedan sostenerse bajo suposiciones cuánticas.

Zcash puede beneficiarse de ese trabajo, pero aún debe adaptarlo a una blockchain que preserva la privacidad.

## Posibles Enfoques Para Futuras Actualizaciones

### Autorización De Gasto Poscuántica

Zcash podría necesitar finalmente una autorización de gasto que no dependa de esquemas de firma vulnerables a los ataques cuánticos.

Esto podría utilizar firmas poscuánticas, firmas híbridas u otro diseño. Un diseño híbrido utiliza comprobaciones clásicas y poscuánticas durante un período de transición, de modo que el sistema no dependa de una sola suposición.

El desafío es el tamaño y el costo. Las firmas poscuánticas pueden ser más grandes que las firmas actuales, lo que afecta al tamaño de las transacciones, el ancho de banda, las tarifas, las billeteras móviles y los hardware wallets.

### Nuevos Formatos De Direcciones Y Claves

La nueva criptografía suele necesitar nuevas claves y direcciones. Los usuarios necesitarían una vía de migración clara desde formatos antiguos hacia formatos más seguros.

La migración debería ser sencilla en las billeteras. La mayoría de los usuarios no debería tener que entender cada detalle criptográfico para mantenerse segura.

### Migración Que Preserva La Privacidad

La migración es especialmente sensible para Zcash. Si muchos usuarios trasladan fondos de pools antiguos a pools nuevos siguiendo patrones evidentes, la propia migración podría filtrar información.

Un buen plan de migración debe proteger:

- Los fondos de los usuarios
- La privacidad de los usuarios
- La compatibilidad de las billeteras
- El soporte de exchanges
- El soporte de hardware wallets
- La seguridad del consenso de la red

### Revisión Del Sistema De Pruebas Poscuántico

Reemplazar las firmas no es suficiente. El diseño blindado de Zcash también depende de pruebas zero-knowledge y compromisos.

El trabajo futuro podría necesitar revisar o reemplazar:

- Las suposiciones de zk-SNARK
- Los compromisos polinómicos
- Los hashes de desafío Fiat-Shamir
- Los compromisos de notas
- La construcción de anuladores
- Las suposiciones de los árboles de Merkle
- El cifrado de notas y el comportamiento de las claves de visualización

Algunos componentes podrían ser aceptables con parámetros ajustados. Otros componentes podrían necesitar nuevos diseños.

## Ejemplos Para Principiantes

### Ejemplo 1: La Cerradura Antigua

Imagine una caja fuerte con una cerradura que hoy es resistente. Una nueva herramienta inventada en el futuro podría abrir rápidamente esa cerradura antigua.

La criptografía poscuántica es como reemplazar la cerradura por un diseño que no se espera que la nueva herramienta pueda romper.

Para una blockchain, reemplazar la cerradura es difícil porque cada billetera, nodo, exchange y dispositivo de hardware debe entender el nuevo diseño.

### Ejemplo 2: La Caja Pública De Recibos

Los datos transparentes de una blockchain son como poner cada recibo en una caja pública para siempre. Aunque hoy nadie pueda interpretar cada patrón, las herramientas futuras podrían aprender más después.

El uso blindado de Zcash intenta evitar publicar esos recibos desde el principio. Eso ayuda a la privacidad a largo plazo, pero la cerradura que protege el sistema blindado aún debe revisarse para un futuro cuántico.

### Ejemplo 3: El Plan De Salida

La recuperabilidad es como planificar una ruta de salida antes de que haya un incendio. Espera no necesitarla, pero es mucho más seguro diseñarla con antelación que durante una emergencia.

ZIP 2005 se ajusta a esta idea para las notas de Orchard.

## Qué Pueden Hacer Los Usuarios Hoy

Los usuarios no necesitan entrar en pánico. Las computadoras cuánticas públicas grandes capaces de quebrar la criptografía de blockchain desplegada no están disponibles hoy.

Los buenos hábitos siguen ayudando:

- Prefiera el uso blindado de Zcash cuando sea posible.
- Evite reutilizar direcciones.
- Mantenga las billeteras actualizadas.
- Siga los anuncios de actualización de red de Zcash.
- Esté atento a los ZIP y a la orientación de las billeteras sobre recuperabilidad o migración.
- No asuma que la actividad transparente es privada.
- No traslade fondos basándose en rumores; espere una orientación clara de desarrolladores de Zcash y equipos de billeteras de confianza.

## Desafíos

Las actualizaciones poscuánticas son difíciles para todas las blockchains.

Los desafíos comunes incluyen:

- Claves y firmas más grandes
- Transacciones más grandes
- Costos de verificación más altos
- Mayor uso de ancho de banda
- Nuevas auditorías de seguridad
- Soporte de hardware wallets
- Rendimiento de billeteras móviles
- Integración de exchanges y custodia
- Filtraciones de privacidad durante la migración
- Acuerdo comunitario sobre cambios de consenso

Para Zcash, la parte más difícil no es solo mantener las monedas gastables. La parte difícil es mantenerlas gastables mientras se preserva la privacidad que hace diferente a Zcash.

## Resumen

Las computadoras cuánticas podrían amenazar finalmente parte de la criptografía utilizada por las blockchains. La criptografía poscuántica es la respuesta a largo plazo, pero debe desplegarse cuidadosamente.

Zcash no es completamente poscuántico hoy. Sin embargo, Zcash tiene fortalezas útiles: las transacciones blindadas reducen la exposición pública, la red tiene un historial de actualizaciones criptográficas y la investigación actual, como ZIP 2005 y el Proyecto Tachyon, ya está orientada a futuros riesgos cuánticos.

Para principiantes, la idea principal es sencilla: la privacidad actual reduce la exposición futura de datos, y las actualizaciones cuidadosas pueden ayudar a Zcash a avanzar hacia una seguridad más sólida en la era cuántica sin sacrificar la usabilidad.

## Páginas Relacionadas

- [¿Es Zcash poscuántico?](/zcash-tech/is-zcash-post-quantum) - Qué cambió Ironwood, qué sigue expuesto y una tabla de estado fechada
- [Pools blindados](/using-zcash/shielded-pools) - Cómo las transacciones blindadas de Zcash protegen los detalles de las transacciones
- [Halo](/zcash-tech/halo) - El sistema de pruebas de Zcash sin una configuración confiable
- [ZKP y zk-SNARKs](/zcash-tech/zk-snarks) - Cómo funcionan las pruebas zero-knowledge en Zcash
- [Claves de visualización](/zcash-tech/viewing-keys) - Cómo funciona la divulgación selectiva para Zcash blindado
- [Activos blindados de Zcash](/zcash-tech/zcash-shielded-assets) - Futuros activos blindados y soporte de activos privados

## Referencias

- [NIST: Primeros estándares de cifrado poscuántico finalizados](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Proyecto de criptografía poscuántica de NIST](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Recuperabilidad cuántica de Orchard](https://zips.z.cash/zip-2005)
- [Proyecto Tachyon](https://tachyon.z.cash/)
- [Especificación del protocolo Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Libro de Halo 2](https://zcash.github.io/halo2/)
