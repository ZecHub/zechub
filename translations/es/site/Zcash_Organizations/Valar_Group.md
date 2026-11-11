<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

[Visitar sitio web](https://valargroup.dev/)

<img width="200" height="200" alt="254678133" src="/content-images/0dc8c697-bcad-492a-b024-89b502d27af4-4c0d4552c2.webp" />


## Declaración de misión

Valar Group es una organización independiente de ingeniería centrada en la escalabilidad [scaling] de Zcash, el fortalecimiento de la gobernanza [governance] de los tenedores de monedas y la mejora de la privacidad [privacy], el rendimiento y la resiliencia a largo plazo del protocolo.

Su trabajo se concentra en infraestructura a nivel de protocolo: votación privada de tenedores de tokens, software de nodo completo [full node] de alto rendimiento, tecnología de sincronización de billeteras [wallets] y actualizaciones de red [network upgrades] que hacen que Zcash blindado [shielded] sea más utilizable a mayor escala.

La organización pretende brindar a los tenedores de ZEC una forma de expresar preferencias de manera privada, proporcionar a los operadores de nodos software más rápido y capaz, y dar a las billeteras herramientas [tools] que preserven la privacidad del usuario mientras reducen el costo de participar en la red [chain].

## Antecedentes

Valar Group está liderada por Dev Ojha (ValarDragon), cofundador de Osmosis y miembro del equipo que lanzó Cosmos. Durante la última década, ha trabajado en zk-SNARKs, consenso BFT y sistemas DeFi en producción.

El trabajo público del grupo en Zcash cobró relevancia a medida que el ecosistema transitaba hacia equipos independientes de protocolo después de la reorganización de 2026 del desarrollo central. Valar Group surgió como una de las organizaciones que construyen la próxima generación de infraestructura de Zcash junto con Project Tachyon, Shielded Labs, ZODL y Zcash Foundation.

Un tema recurrente en su trabajo es que las propiedades de privacidad de Zcash deberían extenderse más allá de los pagos [payments]. Si se pide a los tenedores que voten sobre emisión, tiempos de bloque [block] o el alcance de una actualización de red, deberían poder hacerlo desde saldos blindados sin revelar identidades, saldos ni votos individuales. Ese requisito llevó a Valar Group a diseñar y lanzar una cadena dedicada para la votación de tenedores de monedas.

El mismo trasfondo en escalabilidad y criptografía también dio forma a su trabajo de nodos y sincronización. Los bloques más rápidos, la sincronización más ligera de billeteras y un nodo completo más capaz se consideran requisitos previos para dinero privado que pueda usarse a escala de red de pagos, en lugar de solo como reserva de valor.

## Visión

Los materiales públicos y el trabajo de proyectos de Valar Group apuntan hacia una red de Zcash que pueda:

- Admitir votación privada y auditable de tenedores de monedas como un proceso repetible de gobernanza.
- Escalar pagos de prueba de trabajo sin sacrificar la privacidad blindada.
- Reducir los cuellos de botella de billeteras y nodos mediante PIR, poda y propagación más rápida de bloques.
- Aumentar la diversidad de implementaciones mediante el lanzamiento de una pila independiente de nodo completo.
- Contribuir a la preparación poscuántica y a actualizaciones de protocolo revisadas formalmente.

La organización trabaja como contribuyente independiente, no como propietaria del protocolo. Los cambios de protocolo aún pasan por ZIP, implementación, revisión y señalización comunitaria. El papel de Valar Group es diseñar, implementar, operar y publicar como código abierto los sistemas que hacen prácticos esos procesos.

## Áreas estratégicas

El trabajo de Valar Group se agrupa en cuatro áreas.

### Gobernanza privada de tenedores de monedas

Zcash no utiliza control automático de protocolo on-chain. Las encuestas de tenedores de monedas son señales consultivas que alimentan un proceso más amplio de consenso aproximado. Valar Group construyó la Tokenholder Voting Chain para que esas señales puedan recopilarse desde saldos blindados sin exponer la identidad del votante ni el tamaño de su voto individual.

El diseño actual utiliza:

- Una cadena de aplicación SDK dedicada de Cosmos para orquestar rondas de votación.
- Pruebas de instantáneas contra notas [notes] de Ironwood gastables.
- Cifrado homomórfico [encryption] de los importes de voto.
- Recuperación privada de información para pruebas de no pertenencia de anuladores [nullifiers].
- Una multifirma de coordinadores y una autoridad electoral distribuida.

El objetivo es sustituir los procesos anteriores de votación de tenedores de tokens por un sistema reutilizable, auditado e integrable con billeteras que otras organizaciones puedan operar y contabilizar de forma independiente.

### Software de nodos y escalabilidad de red

Valar Group colabora con Project Tachyon en Zakura, un nodo completo de Zcash construido a partir de la base de código de Zebra. Zakura se posiciona como un nodo de alto rendimiento para operadores que necesitan sincronización inicial más rápida, poda, arranque mediante instantáneas y una ruta de compatibilidad para antiguos usuarios de `zcashd`.

El trabajo de escalabilidad relacionado incluye:

- Tiempos de bloque objetivo más rápidos, incluidos experimentos de bloques de 25 segundos en testnets de NU7.
- Propagación de bloques entre pares mejorada.
- Funciones de nodo completo destinadas a mantener Zcash utilizable a medida que crece la actividad blindada.

### Infraestructura de billeteras y sincronización

Históricamente, las billeteras blindadas deben escanear grandes cantidades de datos de la cadena. Valar Group desarrolla sistemas PIR para que las billeteras puedan obtener las pruebas que necesitan sin descargar conjuntos completos de anuladores ni revelar qué notas les interesan.

Este trabajo aparece tanto en la pila de votación como en investigación más amplia de sincronización de billeteras. El grupo también ha contribuido trabajo de fiabilidad del lado de la billetera, incluida la presentación de transacciones a múltiples servidores y mejoras de selección de servidores utilizadas en la pila móvil de ZODL.

### Actualizaciones de protocolo y coordinación del ecosistema

Valar Group fue una de las organizaciones que se comprometieron públicamente con la respuesta de Ironwood tras la vulnerabilidad del circuito de Orchard. Ironwood introdujo un nuevo pool blindado, selló el pool original de Orchard detrás de un turnstile y restauró una vía para verificar de forma independiente el suministro circulante. Valar Group trabajó con Project Tachyon, Shielded Labs, ZODL y Zcash Foundation en arquitectura, implementación de reglas de consenso y coordinación del ecosistema.

El grupo también participa en la definición del alcance de NU7, la operación de testnets y la edición de ZIP. Dev Ojha figura como editor de ZIP.

## Iniciativas actuales

### Tokenholder Voting Chain / Shielded Vote

Shielded Vote es el protocolo privado de gobernanza de Valar Group para Zcash. Los tenedores votan con saldos blindados sin revelar importes individuales ni vincular votos con identidades.

Las propiedades clave incluyen:

- Una sesión en línea para votar, en lugar de un proceso de compromiso/revelación de varios días.
- Una firma de instantánea compatible con Keystone que delega derechos de voto a una hotkey sin poner fondos en riesgo.
- Importes de voto cifrados mediante ElGamal homomórfico.
- Consultas PIR para que los anuladores no se filtren durante las pruebas de instantáneas.
- División de votos y envío diferido por retransmisión para reducir la correlación temporal.
- Recuentos auditables públicamente.

En agosto de 2026, Valar Group y Project Tachyon utilizaron esta pila para la votación de tenedores de monedas de NU7. La elegibilidad requería ZEC blindado gastable en Ironwood a la altura de mainnet 3,459,350. La votación se realizó del 25 de agosto al 14 de septiembre de 2026, con un umbral de participación de 1,000,000 ZEC para que el resultado se considerara representativo. Las preguntas abarcaban el suavizado de emisión de NSM, el calendario de reemisión, la descontinuación de Sprout/v4, tiempos de bloque de 25 segundos y el alcance/preparación de NU7.

La coordinación de la cadena predeterminada utiliza una multifirma de 2 de 5 entre Project Tachyon, Valar Group, Zcash Foundation, ZODL y Shielded Labs. Un conjunto de validadores independiente posee participaciones de claves de descifrado por ronda. Ningún validador individual puede recuperar votos individuales; se requiere un umbral de validadores para producir el recuento final.

Las interfaces públicas para operadores y auditores incluyen:

- [Configuración de la cadena de votación](https://setup.valargroup.org)
- [Auditor de recuento](https://tally.valargroup.org)
- [Interfaz de coordinador](https://svote.valargroup.org/)
- [Configuración del servidor PIR](https://setup-pir.valargroup.org)
- [Documentación de Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura es un nodo completo de Zcash desarrollado como colaboración entre Valar Group y Project Tachyon. Se deriva de Zebra y añade sincronización más rápida, poda nativa, arranque mediante instantáneas, rutas de compatibilidad de `zcashd` y trabajo experimental P2P de alto rendimiento.

Zcash Foundation acogió públicamente el proyecto, señalando que Zebra se publicó bajo licencias permisivas para que equipos independientes pudieran bifurcarlo y mejorarlo, y que varios colaboradores de Zakura ya habían contribuido aguas arriba a Zebra.

### Recuperación privada de información

Valar Group mantiene servicios y bibliotecas PIR para dos problemas relacionados:

- Probar que una nota no había sido gastada a una altura de instantánea sin revelar su anulador.
- Reducir los datos que las billeteras deben obtener para sincronizarse o votar.

Esta es una dependencia central de Shielded Vote y un bloque de construcción para una UX de billetera privada más rápida.

### Ingeniería de Ironwood y NU7

Valar Group formó parte del compromiso conjunto de junio de 2026 con Ironwood y contribuyó a la implementación de reglas de consenso y al trabajo de cliente alrededor del nuevo pool. También operó infraestructura de testnet de NU7, incluidos scripts de incorporación y nodos públicos alojados bajo `nu7.valargroup.dev`.

### Bibliotecas de protocolo de código abierto

La organización `valargroup` GitHub publica la pila de votación y nodos como repositorios públicos, incluidos:

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — cadena [chain] específica de la aplicación para votación privada on-chain
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — biblioteca de votación blindada [shielded] del lado del cliente, pruebas, almacenamiento y FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — circuitos de delegación y votación de Halo2
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — PIR para pruebas de no pertenencia de anuladores [nullifier]
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — configuración de descubrimiento de servicios de billetera [wallet]
- [`zebra`](https://github.com/valargroup/zebra) — bifurcación de desarrollo de Valar Group para Zebra/Zakura

## Los equipos

Valar Group está liderada por **Dev Ojha** (ValarDragon). Las páginas públicas del equipo asociadas con Zakura enumeran a los siguientes ingenieros afiliados a Valar:

- **Dev Ojha** — Mantenedor; lidera Valar Group. Las áreas de enfoque incluyen votación de tenedores de tokens, trabajo poscuántico, Zakura y PIR.
- **Roman Akhtariev** — Ingeniero principal. Anteriormente ingeniero principal en Osmosis; su trabajo incluye sincronización de billetera PIR, votación de tenedores de tokens y rendimiento de sincronización de Zakura.
- **Evan Forbes** — Ingeniero principal. Antiguo líder de consenso y cofundador ingeniero de Celestia; su trabajo incluye preparación para tiempos de bloque más rápidos y una pila QUIC P2P.
- **Adam Tucker** — Ingeniero principal. Antiguo ingeniero de Osmosis; su trabajo incluye votación de tenedores de tokens con Roman Akhtariev, fiabilidad de billeteras e integración de Ironwood en toda la pila.

Zakura se mantiene conjuntamente con Project Tachyon, liderado por Sean Bowe. Las dos organizaciones colaboran estrechamente, pero siguen siendo independientes.

## Estructura organizativa

Valar Group opera como una organización independiente de ingeniería. No forma parte de Zcash Foundation, ZODL, Shielded Labs ni Zcash Community Grants.

En el diseño de la cadena de votación, Valar Group es una de las cinco organizaciones coordinadoras. Ese papel es un parámetro del sistema de votación, no una reclamación de control exclusivo sobre la gobernanza de Zcash. Otros equipos pueden ejecutar validadores, establecer cadenas de votación alternativas o auditar los recuentos publicados mediante las herramientas públicas.

No se ha publicado información adicional sobre el tipo de entidad legal, la composición del consejo y la gobernanza interna con el mismo nivel de detalle que el de organizaciones anteriores de Zcash.

## Financiación

Las declaraciones públicas en foros de mediados de 2026 describen a Valar Group y Project Tachyon como financiados mediante donaciones privadas. A diferencia de la ronda de capital divulgada de ZODL o los anuncios públicos de donaciones de Shielded Labs, Valar Group no ha publicado una lista detallada de donantes ni un calendario de subvenciones.

Ese modelo de financiación mantiene al equipo independiente de la vía histórica de Development Fund / recompensas de bloque, pero también implica menor visibilidad pública sobre el tamaño del presupuesto y las fuentes de financiación.

## Papel en el ecosistema de Zcash

Valar Group es una de las organizaciones independientes de protocolo que se formaron alrededor del panorama de desarrollo de 2026 de Zcash. En ese panorama:

- Zcash Foundation continúa con la administración comunitaria y Zebra.
- ZODL se centra en el producto de billetera y la continuación del protocolo tras la división de ECC.
- Shielded Labs se centra en sostenibilidad, seguridad e investigación de consenso.
- Project Tachyon se centra en recursión, verificación formal y escalabilidad a largo plazo.
- Valar Group se centra en votación privada de tenedores de monedas, rendimiento de nodos, PIR y la ingeniería necesaria para operar esos sistemas en producción.

Su contribución distintiva es hacer operativa la gobernanza blindada. La votación de NU7 es el primer uso importante de esa pila: los tenedores prueban saldos de Ironwood, billeteras como ZODL y Vizor pueden integrar el flujo, y cualquiera puede auditar el recuento sin conocer cómo votó un tenedor concreto.

El trabajo de nodos y sincronización del mismo equipo pretende respaldar la otra mitad de esa visión. La votación privada es menos útil si las billeteras no pueden sincronizarse, los nodos no pueden seguir el ritmo o las actualizaciones no pueden implementarse con rapidez. Valar Group trata la gobernanza, el software de nodos y la infraestructura de billeteras como un único problema: hacer que Zcash privado sea utilizable a escala sin concentrar el poder operativo en una sola organización.

## Recursos

- [Sitio web de Valar Group](https://valargroup.dev/)
- [Valar Group GitHub](https://github.com/valargroup)
- [Documentación de Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)
- [Configuración de la cadena de votación](https://setup.valargroup.org)
- [Auditor de recuento](https://tally.valargroup.org)
- [Interfaz de coordinador](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakura acerca de / equipo](https://zakura.com/about/)
- [NU7 hilo del foro sobre la votación de tenedores de monedas](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Hilo del foro sobre Coinholder Voting Chain](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
