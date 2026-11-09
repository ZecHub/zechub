# Cómo se organiza Zcash

## En resumen

- Zcash no fue creado por una sola empresa, sino por muchas organizaciones independientes, cada una responsable de una parte diferente del trabajo
- Durante la mayor parte de su historia, dos organizaciones lideraron el desarrollo: Electric Coin Company y Zcash Foundation
- En enero de 2026, todo el equipo de Electric Coin Company renunció tras una disputa de gobernanza [governance], y el ecosistema se reorganizó en varios equipos independientes
- Hoy, el protocolo, el software de nodo [node], las billeteras [wallets], la investigación, la escalabilidad [scaling] y la financiación están a cargo de grupos separados
- Ninguna organización controla Zcash, la red es de código abierto y sin permisos [permissionless], y siguió funcionando normalmente durante cada cambio

<br/>

## Para quién es esto

- Personas recién llegadas que intentan entender quién realmente crea y mantiene Zcash
- Cualquier persona confundida por los numerosos nombres de organizaciones en el ecosistema
- Colaboradores que deciden con quién trabajar o a dónde enviar una propuesta

<br/>

## Por qué esto importa

Comprender la estructura hace que todo lo demás sea más fácil. Te indica quién mantiene el código del que dependes, a quién dirigirte para solicitar una subvención [grant] y quién es responsable de la parte de la red que te importa. También revela una de las fortalezas discretas de Zcash: dado que el trabajo se distribuye entre grupos independientes, ningún punto único de fallo puede capturar o detener el proyecto.

Esta página es un mapa. Para cada organización que ya tiene una página completa en esta wiki, encontrarás una nota breve y un enlace para leer más, en lugar de repetir lo que ya está escrito allí.

<br/>

## Cómo funcionaba antes

Durante la mayor parte de la historia de Zcash, dos organizaciones lideraron el camino.

Electric Coin Company lanzó Zcash en 2016 y empleó a gran parte del equipo principal de desarrollo. Estaba supervisada por Bootstrap, una junta sin fines de lucro creada para apoyar a Zcash. Zcash Foundation trabajaba junto a ella como una organización sin fines de lucro independiente, centrada en la custodia del protocolo y en crear un nodo independiente. Ambas fueron financiadas en gran medida por una parte de la recompensa de bloque [block reward] reservada para el desarrollo.

Esta estructura de dos pilares se mantuvo durante años, pero dependía de esa financiación compartida y de que las dos organizaciones permanecieran alineadas. A medida que la financiación original para el desarrollo evolucionó y su futuro a largo plazo se volvió menos seguro, la cuestión de cómo pagar el trabajo continuo se volvió más apremiante. Esa cuestión de financiación está en el trasfondo de gran parte de lo que cambió después, y es parte de la razón por la que algunos equipos ahora recaudan capital externo mientras otros dependen de subvenciones.

<br/>

## La reorganización de 2026

En enero de 2026, la estructura cambió drásticamente. El 7 de enero, el director ejecutivo de Electric Coin Company, Josh Swihart, anunció en X que todo el equipo de la empresa había renunciado.

Bootstrap era una organización sin fines de lucro creada en 2020 para gobernar Electric Coin Company, que se había convertido en una filial de su propiedad total. El desacuerdo entre el equipo de la empresa y esta junta se acumuló con el tiempo y abordó varios temas, incluida la dirección de la organización, cómo debía financiarse el desarrollo y el futuro de la billetera Zashi, que el equipo quería trasladar a una empresa privada para recaudar capital externo. Swihart describió la salida como un despido constructivo, un término legal que significa que las condiciones cambiaron de forma tan grave que la renuncia fue efectivamente forzada, y afirmó que una mayoría de la junta se había alejado de la misión de Zcash.

La otra versión de los hechos importa por equidad. Bootstrap presentó el conflicto como una cuestión de gobernanza y cumplimiento legal de organizaciones sin fines de lucro. El fundador de Zcash, Zooko Wilcox, defendió públicamente a los miembros de la junta mencionados en la disputa, afirmando que había trabajado con ellos durante muchos años y que los consideraba personas de gran integridad, al tiempo que dejó claro que no tomaba partido en el desacuerdo en sí.

Dos cosas no estaban en disputa. Ninguna parte alegó conducta criminal alguna, por lo que se trató de un desacuerdo corporativo y de gobernanza, no de un caso legal. Y la propia red Zcash no se vio afectada: permaneció de código abierto, sin permisos, segura y plenamente operativa durante todo el proceso, un punto que tanto Swihart como Wilcox recalcaron a los usuarios.

Lo que siguió fue una reorganización, no un colapso. El antiguo equipo de la empresa pasó a formar ZODL más tarde en 2026 y, por separado, tres antiguos miembros de la junta de Bootstrap formaron Sovright. El desarrollo adoptó una forma más distribuida entre varios equipos independientes.

Las declaraciones descritas aquí fueron hechas públicamente en X el 7 de enero de 2026 por Josh Swihart (@jswihart) y Zooko Wilcox (@zooko), donde se pueden leer las publicaciones originales completas.

<br/>

## Quién desarrolla Zcash ahora

El trabajo actual se distribuye entre organizaciones independientes, cada una responsable de una parte clara.

### Las dos organizaciones surgidas de la división de 2026

1. ZODL, el Open Development Lab de Zcash, fue formado por el antiguo equipo de Electric Coin Company y está liderado por Josh Swihart. Recaudó más de veinticinco millones de dólares de inversores externos y trabaja en el desarrollo central del protocolo, incluido el sistema de pruebas [proving system] Halo 2 que impulsa las transacciones blindadas [shielded transactions] más recientes de Zcash, y en la billetera ZODL, una billetera móvil blindada por defecto anteriormente llamada Zashi. Consulta [ZODL](https://zechub.wiki/zcash-organizations/zodl).
2. Sovright es una organización sin fines de lucro formada por tres antiguos miembros de la junta de Bootstrap. Se centra en herramientas [tools] y apoyo para el ecosistema, y creó Argos, una herramienta para ayudar a los primeros usuarios a recuperar fondos varados en una billetera antigua sin mantenimiento. Consulta [Sovright](https://zechub.wiki/zcash-organizations/sovright).

### Custodia del protocolo, investigación y software de nodo

3. Zcash Foundation mantiene Zebra, el nodo Rust que se convierte en el nodo principal de la red a medida que se retira el cliente antiguo zcashd. También custodia la organización Zcash GitHub, el sitio web z.cash y la cuenta principal de Zcash en X, y se asocia con ZecHub para ayudar a administrar algunos de esos activos. Consulta [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation).
4. Shielded Labs es una organización sin fines de lucro independiente, financiada por donaciones y con sede en Suiza. Se centra en la investigación y la sostenibilidad a largo plazo, incluido el mecanismo de sostenibilidad de la red que financia el desarrollo futuro y el trabajo de Crosslink para añadir finalidad de prueba de participación a Zcash, y financió la auditoría de seguridad que descubrió la vulnerabilidad del pool [pool] Orchard en 2026. Consulta [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs).
5. Electric Coin Company sigue formando parte de la historia como la organización que creó y lanzó Zcash en 2016. Consulta [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company).

### Escalabilidad y criptografía

6. El proyecto Tachyon es una iniciativa de escalabilidad liderada por el criptógrafo Sean Bowe. Propone una nueva forma para que las billeteras se sincronicen con la blockchain, llamada sincronización inconsciente, que reduce las transacciones y, como efecto secundario, acerca a Zcash a la privacidad poscuántica. Su trabajo está documentado en [tachyon.z.cash](https://tachyon.z.cash/).
7. Valar Group es un laboratorio de investigación e ingeniería criptográfica que trabaja en el protocolo Zcash para efectivo digital privado y poscuántico a escala. Colabora estrechamente con el proyecto Tachyon en el trabajo de escalabilidad y computación cuántica. Más información sobre su trabajo está en [valargroup.dev](https://valargroup.dev/).

### Organizaciones regionales y comunitarias

8. Obscura Labs es una organización independiente registrada en Nigeria, centrada en África y los mercados emergentes, que crea infraestructura y vías de adopción. Consulta [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs).

### Educación

9. ZecHub es un centro educativo descentralizado [decentralized] para Zcash. Los miembros de la comunidad trabajan juntos para crear, validar y promover contenido que ayuda a las personas a comprender el ecosistema y aprender a participar, mediante tutoriales, documentación wiki, un pódcast y un boletín [newsletter] semanal. La wiki que estás leyendo ahora forma parte de ZecHub, y Zcash Foundation se asocia con ella para ayudar a administrar algunos recursos comunitarios.

### Financiación

10. Zcash Community Grants financia a colaboradores independientes y proyectos comunitarios a partir de una parte de la recompensa de bloque, distribuyendo el trabajo entre muchos equipos más allá de las organizaciones principales. Consulta [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants).
11. La Financial Privacy Foundation apoya al ecosistema Zcash y a proyectos comunitarios. Consulta [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation).

Todas estas organizaciones mantienen repositorios de código abierto, por lo que cualquiera puede leer, comprobar y aprovechar su trabajo. Y las organizaciones no son toda la historia. Muchas contribuciones significativas provienen de individuos y de empresas contratadas financiadas mediante subvenciones, en lugar de solo de las organizaciones principales. Junto a ellas se encuentran equipos de billeteras, comunidades regionales, desarrolladores [developers] independientes e inversores que poseen y apoyan ZEC sin crear el protocolo. La lista anterior es la columna vertebral, no la imagen completa.

<br/>

## Por dónde empezar como persona recién llegada

La organización que te importa depende de lo que quieras hacer.

1. Para usar Zcash, necesitas una billetera, por lo que ZODL y su billetera son un punto de partida natural.
2. Para ejecutar un nodo o comprender el software de la red, consulta Zcash Foundation y su nodo Zebra.
3. Para financiar un proyecto o contribuir con trabajo remunerado, consulta Zcash Community Grants.
4. Para seguir la investigación y el futuro del protocolo, sigue a Shielded Labs, el proyecto Tachyon y Valar Group.

<br/>

## Sigue aprendiendo

Esta wiki existe para ayudarte a profundizar, así que el mejor siguiente paso es seguir leyéndola. Algunos buenos temas para continuar como persona recién llegada:

- [Qué es ZEC y Zcash](https://zechub.wiki/start-here/what-is-zec-and-zcash) para conocer los fundamentos de la red y la moneda
- [Guía para nuevos usuarios](https://zechub.wiki/start-here/new-user-guide) para un primer recorrido por el uso de Zcash
- [Pools blindados](https://zechub.wiki/using-zcash/shielded-pools) para saber cómo Zcash mantiene privadas las transacciones
- [El turnstile](https://zechub.wiki/zcash-tech/the-turnstile) para saber cómo el suministro de monedas sigue siendo verificable
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) para conocer el pool blindado al que está migrando la red
- [Actualizaciones de red](https://zechub.wiki/start-here/network-upgrades) para saber cómo Zcash cambia con el tiempo
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) para conocer la criptografía detrás de la privacidad

Cada página enlaza con más contenido, así que puedes seguir el hilo hasta donde quieras.

<br/>

## Ideas erróneas comunes

- Zcash no es propiedad ni está controlado por una sola empresa; ninguna organización puede cambiar o detener la red por sí sola
- La disputa de 2026 no afectó a la red, los fondos ni la privacidad; fue un desacuerdo organizativo y el protocolo funcionó normalmente durante todo el proceso
- La salida del equipo de Electric Coin Company no puso fin a Zcash; el trabajo se trasladó a nuevas organizaciones independientes
- Tener muchas organizaciones es una fortaleza, no una debilidad; elimina puntos únicos de fallo y mantiene la resiliencia del proyecto
- Poseer o promover ZEC no es lo mismo que crear Zcash; los inversores y evangelistas forman parte de la comunidad, pero son distintos de los equipos que desarrollan el protocolo

<br/>

## Páginas relacionadas

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - el laboratorio de desarrollo formado por el antiguo equipo de Electric Coin Company
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - la organización sin fines de lucro formada por antiguos miembros de la junta de Bootstrap
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - custodio del protocolo y del nodo Zebra
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - investigación y sostenibilidad del protocolo
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - la empresa que lanzó Zcash en 2016
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - infraestructura y adopción en África y mercados emergentes
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - financiación para colaboradores independientes
