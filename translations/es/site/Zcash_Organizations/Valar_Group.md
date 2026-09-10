<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

[Visitar sitio web](https://valargroup.dev/)

<<img width="200" height="200" alt="254678133" src="https://github.com/user-attachments/assets/0dc8c697-bcad-492a-b024-89b502d27af4" />


## Declaración de misión

Valar Group es una organización de ingeniería independiente centrada en escalar Zcash, fortalecer la gobernanza de los poseedores de monedas y mejorar la privacidad, el rendimiento y la resiliencia a largo plazo del protocolo.

Su trabajo se concentra en infraestructura a nivel de protocolo: votación privada de poseedores de tokens, software de nodos completos de alto rendimiento, tecnología de sincronización de wallets y actualizaciones de red que hacen que Zcash blindado sea más utilizable a mayor escala.

La organización busca dar a los poseedores de ZEC una forma de expresar sus preferencias de manera privada, proporcionar a los operadores de nodos software más rápido y capaz, y ofrecer a las wallets herramientas que preserven la privacidad del usuario mientras reducen el costo de participar en la red.

## Antecedentes

Valar Group está dirigido por Dev Ojha (ValarDragon), cofundador de Osmosis y miembro del equipo que lanzó Cosmos. Durante la última década ha trabajado en zk-SNARKs, consenso BFT y sistemas DeFi en producción.

El trabajo público del grupo en Zcash cobró relevancia a medida que el ecosistema se orientaba hacia equipos de protocolo independientes tras la reorganización de 2026 del desarrollo central. Valar Group surgió como una de las organizaciones que construyen la próxima generación de infraestructura de Zcash junto con Project Tachyon, Shielded Labs, ZODL y la Zcash Foundation.

Un tema recurrente en su trabajo es que las propiedades de privacidad de Zcash deberían extenderse más allá de los pagos. Si se pide a los poseedores que voten sobre emisión, tiempos de bloque o el alcance de las actualizaciones de red, deberían poder hacerlo desde saldos blindados sin revelar identidades, saldos o votos individuales. Ese requisito llevó a Valar Group a diseñar y lanzar una cadena dedicada para la votación de poseedores de monedas.

El mismo trasfondo en escalabilidad y criptografía también dio forma a su trabajo de nodos y sincronización. Los bloques más rápidos, la sincronización más ligera de wallets y un nodo completo más capaz se consideran requisitos previos para dinero privado que pueda utilizarse a la escala de una red de pagos, en lugar de únicamente como reserva de valor.

## Visión

Los materiales públicos y el trabajo en proyectos de Valar Group apuntan hacia una red Zcash que pueda:

- Admitir votación privada y auditable de poseedores de monedas como un proceso de gobernanza repetible.
- Escalar pagos de prueba de trabajo sin sacrificar la privacidad blindada.
- Reducir los cuellos de botella de wallets y nodos mediante PIR, poda y propagación más rápida de bloques.
- Aumentar la diversidad de implementaciones mediante el lanzamiento de una pila independiente de nodos completos.
- Contribuir a la preparación poscuántica y a actualizaciones de protocolo revisadas formalmente.

La organización trabaja como colaborador independiente, no como propietaria del protocolo. Los cambios al protocolo siguen pasando por ZIP, implementación, revisión y señalización comunitaria. El rol de Valar Group es diseñar, implementar, operar y publicar como código abierto los sistemas que hacen prácticos esos procesos.

## Áreas estratégicas

El trabajo de Valar Group se agrupa en torno a cuatro áreas.

### Gobernanza privada de poseedores de monedas

Zcash no utiliza control automático del protocolo en cadena. Las encuestas de poseedores de monedas son señales consultivas que alimentan un proceso más amplio de consenso aproximado. Valar Group construyó la Tokenholder Voting Chain para que esas señales puedan recopilarse desde saldos blindados sin exponer la identidad del votante ni el tamaño de cada voto individual.

El diseño actual utiliza:

- Una cadena de aplicación dedicada de Cosmos SDK para orquestar rondas de votación.
- Pruebas de snapshot frente a notas Ironwood gastables.
- Cifrado homomórfico de los importes de voto.
- Recuperación privada de información para pruebas de no pertenencia de nullifiers.
- Una multisig de coordinadores y una autoridad electoral distribuida.

El objetivo es reemplazar los procesos anteriores de votación de poseedores de tokens por un sistema reutilizable, auditado e integrable con wallets que otras organizaciones puedan operar y contabilizar de forma independiente.

### Software de nodos y escalabilidad de red

Valar Group colabora con Project Tachyon en Zakura, un nodo completo de Zcash construido a partir de la base de código de Zebra. Zakura se posiciona como un nodo de alto rendimiento para operadores que necesitan una sincronización inicial más rápida, poda, arranque mediante snapshots y una ruta de compatibilidad para antiguos usuarios de `zcashd`.

El trabajo de escalabilidad relacionado incluye:

- Tiempos objetivo de bloque más rápidos, incluidos experimentos con bloques de 25 segundos en testnets de NU7.
- Propagación mejorada de bloques entre pares.
- Funciones de nodo completo destinadas a mantener Zcash utilizable a medida que crece la actividad blindada.

### Infraestructura de wallets y sincronización

Históricamente, las wallets blindadas deben escanear grandes cantidades de datos de la cadena. Valar Group desarrolla sistemas PIR para que las wallets puedan obtener las pruebas que necesitan sin descargar conjuntos completos de nullifiers ni revelar qué notas les interesan.

Este trabajo aparece tanto en la pila de votación como en una investigación más amplia sobre sincronización de wallets. El grupo también ha contribuido trabajo de fiabilidad del lado de la wallet, incluido el envío de transacciones a múltiples servidores y mejoras en la selección de servidores utilizadas en la pila móvil de ZODL.

### Actualizaciones de protocolo y coordinación del ecosistema

Valar Group fue una de las organizaciones que se comprometieron públicamente con la respuesta Ironwood tras la vulnerabilidad del circuito Orchard. Ironwood introdujo un nuevo pool blindado, selló el pool Orchard original detrás de un turnstile y restauró una vía para verificar independientemente el suministro circulante. Valar Group trabajó con Project Tachyon, Shielded Labs, ZODL y la Zcash Foundation en la arquitectura, la implementación de reglas de consenso y la coordinación del ecosistema.

El grupo también participa en la definición del alcance de NU7, la operación de testnets y la edición de ZIP. Dev Ojha figura como editor de ZIP.

## Iniciativas actuales

### Tokenholder Voting Chain / Shielded Vote

Shielded Vote es el protocolo de gobernanza privada de Valar Group para Zcash. Los poseedores votan con saldos blindados sin revelar importes individuales ni vincular los votos con identidades.

Las propiedades clave incluyen:

- Una sesión en línea para votar, en lugar de un proceso de compromiso/revelación de varios días.
- Una firma de snapshot compatible con Keystone que delega derechos de voto a una hotkey sin poner los fondos en riesgo.
- Importes de voto cifrados mediante ElGamal homomórfico.
- Consultas PIR para que los nullifiers no se filtren durante las pruebas de snapshot.
- División de votos y envío diferido de retransmisiones para reducir la correlación temporal.
- Recuentos auditables públicamente.

En agosto de 2026, Valar Group y Project Tachyon utilizaron esta pila para la votación de poseedores de monedas de NU7. La elegibilidad requería ZEC blindado gastable en Ironwood a la altura 3,459,350 de mainnet. La votación se realizó del 25 de agosto al 14 de septiembre de 2026, con un umbral de participación de 1,000,000 ZEC para que el resultado se considerara representativo. Las preguntas abarcaban el suavizado de emisión de NSM, el calendario de reemisión, la descontinuación de Sprout/v4, tiempos de bloque de 25 segundos y el alcance/preparación de NU7.

La coordinación de la cadena predeterminada utiliza una multisig de 2 de 5 entre Project Tachyon, Valar Group, la Zcash Foundation, ZODL y Shielded Labs. Un conjunto separado de validadores mantiene participaciones de claves de descifrado por ronda. Ningún validador individual puede recuperar votos individuales; se requiere un umbral de validadores para producir el recuento final.

Las interfaces públicas para operadores y auditores incluyen:

- [Configuración de la cadena de votación](https://setup.valargroup.org)
- [Auditor de recuentos](https://tally.valargroup.org)
- [Interfaz de coordinadores](https://svote.valargroup.org/)
- [Configuración del servidor PIR](https://setup-pir.valargroup.org)
- [Documentación de Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura es un nodo completo de Zcash desarrollado como una colaboración entre Valar Group y Project Tachyon. Se deriva de Zebra y añade sincronización más rápida, poda nativa, arranque mediante snapshots, rutas de compatibilidad con `zcashd` y trabajo experimental de P2P de alto rendimiento.

La Zcash Foundation recibió públicamente el proyecto, señalando que Zebra fue publicado bajo licencias permisivas para que equipos independientes pudieran bifurcarlo y mejorarlo, y que varios colaboradores de Zakura ya habían contribuido upstream a Zebra.

### Recuperación privada de información

Valar Group mantiene servicios y bibliotecas PIR para dos problemas relacionados:

- Demostrar que una nota no se había gastado a una altura de snapshot sin revelar su nullifier.
- Reducir los datos que las wallets deben obtener para sincronizarse o votar.

Esta es una dependencia central de Shielded Vote y un componente fundamental para una UX más rápida de wallets privadas.

### Ingeniería de Ironwood y NU7

Valar Group formó parte del compromiso conjunto de junio de 2026 con Ironwood y contribuyó a la implementación de reglas de consenso y al trabajo de clientes en torno al nuevo pool. También operó infraestructura de testnet de NU7, incluidos scripts de unión y nodos públicos alojados en `nu7.valargroup.dev`.

### Bibliotecas de protocolo de código abierto

La organización de GitHub `valargroup` publica la pila de votación y nodos como repositorios públicos, incluidos:

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — cadena específica de aplicación para votación privada en cadena
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — biblioteca de votación blindada del lado del cliente, pruebas, almacenamiento y FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — circuitos de delegación y voto Halo2
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — PIR para pruebas de no pertenencia de nullifiers
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — configuración de descubrimiento de servicios de wallet
- [`zebra`](https://github.com/valargroup/zebra) — bifurcación de desarrollo de Zebra/Zakura de Valar Group

## Los equipos

Valar Group está dirigido por **Dev Ojha** (ValarDragon). Las páginas públicas del equipo asociadas con Zakura enumeran a los siguientes ingenieros afiliados a Valar:

- **Dev Ojha** — Mantenedor; dirige Valar Group. Las áreas de enfoque incluyen votación de poseedores de tokens, trabajo poscuántico, Zakura y PIR.
- **Roman Akhtariev** — Ingeniero principal. Anteriormente ingeniero principal en Osmosis; su trabajo incluye sincronización de wallets mediante PIR, votación de poseedores de tokens y rendimiento de sincronización de Zakura.
- **Evan Forbes** — Ingeniero principal. Exlíder de consenso y fundador de ingeniería de Celestia; su trabajo incluye preparación para tiempos de bloque más rápidos y una pila P2P QUIC.
- **Adam Tucker** — Ingeniero principal. Exingeniero de Osmosis; su trabajo incluye votación de poseedores de tokens con Roman Akhtariev, fiabilidad de wallets e integración de Ironwood en toda la pila.

Zakura se mantiene conjuntamente con Project Tachyon, dirigido por Sean Bowe. Las dos organizaciones colaboran estrechamente, pero permanecen separadas.

## Estructura organizativa

Valar Group opera como una organización de ingeniería independiente. No forma parte de la Zcash Foundation, ZODL, Shielded Labs ni Zcash Community Grants.

En el diseño de la cadena de votación, Valar Group es una de las cinco organizaciones coordinadoras. Ese rol es un parámetro del sistema de votación, no una afirmación de control exclusivo sobre la gobernanza de Zcash. Otros equipos pueden ejecutar validadores, establecer cadenas de votación alternativas o auditar los recuentos publicados mediante las herramientas públicas.

No se ha publicado información adicional sobre el tipo de entidad legal, la composición de la junta y la gobernanza interna con el mismo nivel de detalle que las organizaciones más antiguas de Zcash.

## Financiación

Las declaraciones públicas del foro de mediados de 2026 describen a Valar Group y Project Tachyon como financiados mediante donaciones privadas. A diferencia de la ronda de capital de riesgo divulgada por ZODL o los anuncios públicos de donaciones de Shielded Labs, Valar Group no ha publicado una lista detallada de donantes ni un calendario de subvenciones.

Ese modelo de financiación mantiene al equipo independiente de la vía histórica del Fondo de Desarrollo / recompensa de bloque, pero también implica menos visibilidad pública sobre el tamaño del presupuesto y las fuentes de financiación.

## Rol en el ecosistema de Zcash

Valar Group es una de las organizaciones de protocolo independientes que se formaron en torno al panorama de desarrollo de Zcash de 2026. En ese panorama:

- La **Zcash Foundation** continúa con la administración comunitaria y Zebra.
- **ZODL** se centra en el producto de wallet y la continuidad del protocolo tras la división de ECC.
- **Shielded Labs** se centra en sostenibilidad, seguridad e investigación de consenso.
- **Project Tachyon** se centra en recursión, verificación formal y escalabilidad a largo plazo.
- **Valar Group** se centra en votación privada de poseedores de monedas, rendimiento de nodos, PIR y la ingeniería necesaria para operar esos sistemas en producción.

Su contribución distintiva es hacer operativa la gobernanza blindada. La votación de NU7 es el primer uso importante de esa pila: los poseedores demuestran saldos de Ironwood, wallets como Zodl y Vizor pueden integrar el flujo, y cualquiera puede auditar el recuento sin saber cómo votó un poseedor en particular.

El trabajo de nodos y sincronización del mismo equipo busca respaldar la otra mitad de esa visión. La votación privada es menos útil si las wallets no pueden sincronizarse, los nodos no pueden mantenerse al día o las actualizaciones no pueden implementarse rápidamente. Valar Group trata la gobernanza, el software de nodos y la infraestructura de wallets como un solo problema: hacer que Zcash privado sea utilizable a escala sin concentrar el poder operativo en una única organización.

## Recursos

- [Sitio web de Valar Group](https://valargroup.dev/)
- [GitHub de Valar Group](https://github.com/valargroup)
- [Documentación de Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)
- [Configuración de la cadena de votación](https://setup.valargroup.org)
- [Auditor de recuentos](https://tally.valargroup.org)
- [Interfaz de coordinadores](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Acerca de Zakura / equipo](https://zakura.com/about/)
- [Hilo del foro sobre la votación de poseedores de monedas de NU7](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Hilo del foro sobre Coinholder Voting Chain](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
