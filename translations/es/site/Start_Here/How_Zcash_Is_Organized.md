# Cómo se organiza Zcash

## TL;DR

- Zcash no es construido por una sola empresa, sino por muchas organizaciones independientes que se encargan cada una de una parte distinta del trabajo
- Durante la mayor parte de su historia, dos organizaciones lideraron el desarrollo: Electric Coin Company y Zcash Foundation
- En enero de 2026, todo el equipo de Electric Coin Company renunció tras una disputa de gobernanza, y el ecosistema se reorganizó en varios equipos independientes
- Hoy el protocolo, el software de nodo, las wallets, la investigación, el escalado y la financiación están a cargo de grupos separados
- Ninguna organización individual controla Zcash, la red es open source y sin permisos, y siguió funcionando con normalidad durante todos los cambios

<br/>

## Para quién es esto

- Personas nuevas que intentan entender quién construye y mantiene realmente Zcash
- Cualquiera que esté confundido por los muchos nombres de organizaciones dentro del ecosistema
- Colaboradores que están decidiendo con quién trabajar o a dónde enviar una propuesta

<br/>

## Por qué importa

Entender la estructura hace que todo lo demás sea más fácil. Te dice quién mantiene el código del que dependes, a quién acudir para una subvención y quién es responsable de la parte de la red que te interesa. También revela una de las fortalezas silenciosas de Zcash: como el trabajo está distribuido entre grupos independientes, no existe un único punto de fallo que pueda capturar o paralizar el proyecto.

Esta página es un mapa. Para cada organización que ya tiene una página completa en esta wiki, encontrarás una nota breve y un enlace para leer más, en lugar de repetir lo que ya está escrito allí.

<br/>

## Cómo solía funcionar

Durante la mayor parte de la historia de Zcash, dos organizaciones marcaron el camino.

Electric Coin Company lanzó Zcash en 2016 y empleó a gran parte del equipo principal de desarrollo. Estaba supervisada por Bootstrap, una junta sin fines de lucro creada para apoyar a Zcash. Zcash Foundation trabajaba junto a ella como una organización independiente sin fines de lucro, enfocada en la custodia del protocolo y en construir un nodo independiente. Ambas se financiaban en gran medida con una porción de la recompensa por bloque reservada para el desarrollo.

Esta estructura de dos pilares se mantuvo durante años, pero dependía de esa financiación compartida y de que ambas organizaciones siguieran alineadas. A medida que la financiación original del desarrollo evolucionó y su futuro a largo plazo se volvió menos seguro, la cuestión de cómo pagar el trabajo continuo se volvió más urgente. Esa cuestión de financiación está en el trasfondo de gran parte de lo que cambió después, y es parte de la razón por la que algunos equipos ahora recaudan capital externo mientras que otros dependen de subvenciones.

<br/>

## La reorganización de 2026

En enero de 2026 la estructura cambió de forma brusca. El 7 de enero, el director ejecutivo de Electric Coin Company, Josh Swihart, anunció en X que todo el equipo de la empresa había renunciado.

Bootstrap era una organización sin fines de lucro creada en 2020 para gobernar Electric Coin Company, que se había convertido en una subsidiaria de su propiedad total. El desacuerdo entre el equipo de la empresa y esta junta se fue acumulando con el tiempo y tocó varios temas, entre ellos la dirección de la organización, cómo debía financiarse el desarrollo y el futuro de la wallet Zashi, que el equipo quería trasladar a una empresa privada para recaudar capital externo. Swihart describió la salida como un despido constructivo, un término legal que significa que las condiciones cambiaron tan severamente que la renuncia fue, en la práctica, forzada, y dijo que una mayoría de la junta había dejado de estar alineada con la misión de Zcash.

La otra versión también importa por una cuestión de equidad. Bootstrap enmarcó el conflicto como un asunto de gobernanza y cumplimiento legal de una organización sin fines de lucro. El fundador de Zcash, Zooko Wilcox, defendió públicamente a los miembros de la junta nombrados en la disputa, diciendo que había trabajado con ellos durante muchos años y que los consideraba personas de alta integridad, dejando claro al mismo tiempo que no estaba tomando partido en el desacuerdo en sí.

Dos cosas no estaban en disputa. Ninguna parte alegó conducta criminal alguna, por lo que se trató de un desacuerdo corporativo y de gobernanza, no de un caso legal. Y la propia red de Zcash no se vio afectada: siguió siendo open source, sin permisos, segura y plenamente operativa en todo momento, un punto que tanto Swihart como Wilcox subrayaron ante los usuarios.

Lo que siguió fue una reorganización, no un colapso. El antiguo equipo de la empresa pasó a formar ZODL más adelante en 2026 y, por separado, tres antiguos miembros de la junta de Bootstrap formaron Sovright. El desarrollo adoptó una forma más distribuida entre varios equipos independientes.

Las declaraciones descritas aquí se hicieron públicamente en X el 7 de enero de 2026 por Josh Swihart (@jswihart) y Zooko Wilcox (@zooko), donde pueden leerse íntegramente las publicaciones originales.

<br/>

## Quién construye Zcash ahora

Hoy el trabajo está distribuido entre organizaciones independientes, cada una con una parte clara a su cargo.

### Las dos organizaciones surgidas de la división de 2026

1. ZODL, el Zcash Open Development Lab, fue formado por el antiguo equipo de Electric Coin Company y está liderado por Josh Swihart. Recaudó más de veinticinco millones de dólares de inversores externos y trabaja en el desarrollo del protocolo central, incluido el sistema de pruebas Halo 2 que impulsa las transacciones blindadas más nuevas de Zcash, y en la wallet ZODL, una wallet móvil blindada por defecto antes llamada Zashi. Ver [ZODL](https://zechub.wiki/zcash-organizations/zodl).
2. Sovright es una organización sin fines de lucro formada por tres antiguos miembros de la junta de Bootstrap. Se enfoca en herramientas y apoyo para el ecosistema, y construyó Argos, una herramienta para ayudar a los primeros usuarios a recuperar fondos que habían quedado atrapados en una wallet antigua y sin mantenimiento. Ver [Sovright](https://zechub.wiki/zcash-organizations/sovright).

### Custodia del protocolo, investigación y software de nodo

3. Zcash Foundation mantiene Zebra, el nodo en Rust que se convierte en el nodo principal de la red a medida que el cliente más antiguo `zcashd` se retira. También custodia la organización de GitHub de Zcash, el sitio web z.cash y la cuenta principal de Zcash en X, y colabora con ZecHub para ayudar a gestionar algunos de esos recursos. Ver [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation).
4. Shielded Labs es una organización independiente sin fines de lucro, financiada por donaciones y con sede en Suiza. Se centra en la investigación y la sostenibilidad a largo plazo, incluido el mecanismo de sostenibilidad de la red que financia el desarrollo futuro y el trabajo de Crosslink para añadir finalidad proof of stake a Zcash, y financió la auditoría de seguridad que descubrió la vulnerabilidad del pool Orchard en 2026. Ver [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs).
5. Electric Coin Company sigue siendo parte de la historia como la organización que creó y lanzó Zcash en 2016. Ver [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company).

### Escalado y criptografía

6. Project Tachyon es un esfuerzo de escalado liderado por el criptógrafo Sean Bowe. Propone una nueva forma para que las wallets se sincronicen con la blockchain, llamada sincronización oblivious, que reduce el tamaño de las transacciones y, como efecto secundario, acerca a Zcash a la privacidad post-cuántica. Su trabajo está documentado en [tachyon.z.cash](https://tachyon.z.cash/).
7. Valar Group es un laboratorio de investigación e ingeniería criptográfica que trabaja en el protocolo Zcash para dinero digital privado, post-cuántico y escalable. Colabora estrechamente con Project Tachyon en el trabajo de escalado y de resistencia cuántica. Más información sobre su trabajo está en [valargroup.dev](https://valargroup.dev/).

### Organizaciones regionales y comunitarias

8. Obscura Labs es una organización independiente registrada en Nigeria, enfocada en África y en los mercados emergentes, construyendo infraestructura y vías de adopción. Ver [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs).

### Educación

9. ZecHub es un centro educativo descentralizado para Zcash. Los miembros de la comunidad trabajan juntos para crear, validar y promover contenido que ayude a las personas a entender el ecosistema y aprender cómo participar, a través de tutoriales, documentación en la wiki, un podcast y un boletín semanal. La wiki que estás leyendo ahora forma parte de ZecHub, y Zcash Foundation colabora con ella para ayudar a gestionar algunos recursos comunitarios.

### Financiación

10. Zcash Community Grants financia a colaboradores independientes y proyectos comunitarios con una porción de la recompensa por bloque, distribuyendo el trabajo entre muchos equipos más allá de las organizaciones principales. Ver [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants).
11. Financial Privacy Foundation apoya al ecosistema Zcash y a los proyectos comunitarios. Ver [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation).

Todas estas organizaciones mantienen repositorios open source, por lo que cualquiera puede leer, revisar y aprovechar su trabajo. Y las organizaciones no cuentan toda la historia. Muchas contribuciones importantes provienen de personas individuales y de empresas contratadas financiadas mediante subvenciones, no solo de las organizaciones principales. Junto a ellas están los equipos de wallets, las comunidades regionales, los desarrolladores independientes y los inversores que poseen y apoyan ZEC sin construir el protocolo. La lista anterior es la columna vertebral, no el panorama completo.

<br/>

## Dónde empezar como persona nueva

Qué organización te importa depende de lo que quieras hacer.

1. Para usar Zcash, necesitas una wallet, así que ZODL y su wallet son un punto de partida natural.
2. Para ejecutar un nodo o entender el software de la red, mira a Zcash Foundation y su nodo Zebra.
3. Para financiar un proyecto o contribuir con trabajo remunerado, mira a Zcash Community Grants.
4. Para seguir la investigación y el futuro del protocolo, sigue a Shielded Labs, Project Tachyon y Valar Group.

<br/>

## Sigue aprendiendo

Esta wiki existe para ayudarte a profundizar, así que el mejor siguiente paso es seguir leyéndola. Algunos buenos temas para continuar si eres nuevo:

- [Qué son ZEC y Zcash](https://zechub.wiki/start-here/what-is-zec-and-zcash) para lo básico sobre la red y la moneda
- [Guía para nuevos usuarios](https://zechub.wiki/start-here/new-user-guide) para un primer recorrido por el uso de Zcash
- [Pools blindados](https://zechub.wiki/using-zcash/shielded-pools) para entender cómo Zcash mantiene privadas las transacciones
- [El turnstile](https://zechub.wiki/zcash-tech/the-turnstile) para entender cómo el suministro de monedas sigue siendo verificable
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) para conocer el pool blindado al que la red está migrando
- [Actualizaciones de red](https://zechub.wiki/start-here/network-upgrades) para entender cómo Zcash cambia con el tiempo
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) para la criptografía detrás de la privacidad

Cada página enlaza a más contenido, así que puedes seguir el hilo tan lejos como quieras.

<br/>

## Ideas equivocadas comunes

- Zcash no es propiedad ni está controlado por una sola empresa; ninguna organización por sí sola puede cambiar o detener la red
- La disputa de 2026 no afectó la red, los fondos ni la privacidad; fue un desacuerdo organizativo, y el protocolo funcionó con normalidad en todo momento
- La salida del equipo de Electric Coin Company no puso fin a Zcash; el trabajo se trasladó a nuevas organizaciones independientes
- Tener muchas organizaciones es una fortaleza, no una debilidad; elimina puntos únicos de fallo y mantiene la resiliencia del proyecto
- Poseer o promover ZEC no es lo mismo que construir Zcash; los inversores y los evangelizadores forman parte de la comunidad, pero son distintos de los equipos que desarrollan el protocolo

<br/>

## Páginas relacionadas

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - el laboratorio de desarrollo formado por el antiguo equipo de Electric Coin Company
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - la organización sin fines de lucro formada por antiguos miembros de la junta de Bootstrap
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - custodio del protocolo y del nodo Zebra
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - investigación y sostenibilidad del protocolo
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - la empresa que lanzó Zcash en 2016
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - infraestructura y adopción en África y mercados emergentes
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - financiación para colaboradores independientes
