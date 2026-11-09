<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Halo

## En resumen

Halo es un sistema de pruebas zero-knowledge (ZKP) sin confianza [trustless] y recursivo, descubierto por Sean Bowe en Electric Coin Co. Elimina la necesidad de una configuración confiable [trusted setup] y hace práctica la composición recursiva de pruebas, que es la base de la actual hoja de ruta de escalabilidad y seguridad de Zcash.

- **Qué es:** una construcción zk-SNARK con recursión eficiente y sin ceremonia de configuración confiable.
- **Por qué importa:** el pool blindado [shielded pool] Orchard de Zcash, activado con NU5 en 2022, funciona con Halo 2, la implementación en producción de esta investigación.
- **Propiedad clave:** no hay «residuos tóxicos» de las ceremonias de configuración, y las pruebas pueden dar fe de una cantidad prácticamente ilimitada de otras pruebas.
- **Licencias:** Halo 2 es de código abierto bajo [MIT y Apache 2.0](https://github.com/zcash/halo2#readme), por lo que cualquiera en el ecosistema puede desarrollar sobre él.

---

## Explicación principal

Halo es un sistema de pruebas zero-knowledge sin confianza y recursivo, descubierto por Sean Bowe en Electric Coin Co. Elimina la configuración confiable y permite una mayor escalabilidad de la blockchain Zcash. Halo fue el primer sistema de pruebas zero-knowledge que fue a la vez eficiente y recursivo, ampliamente considerado un avance científico.

![halo](/content-images/_unavailable.svg "halo")

### Los dos componentes

- **Esquema sucinto de compromiso polinómico.** Permite a quien realiza un compromiso comprometerse con un polinomio mediante una cadena corta que un verificador puede utilizar para confirmar las evaluaciones declaradas del polinomio comprometido.
- **Prueba de oráculo interactivo polinómico.** El verificador pide al demostrador (un algoritmo) que abra todos los compromisos en puntos de su elección, utilizando el esquema de compromiso polinómico, y comprueba que la identidad se cumpla entre ellos.

### Sin configuración confiable

zk-SNARKs se basa en una cadena de referencia común (CRS) como parámetro público para demostrar y verificar. Esta CRS debe ser generada de antemano por una parte de confianza. Hasta hace poco, eran necesarios elaborados cálculos seguros multipartitos (MPC), como los realizados por la red Aztec y Zcash, para mitigar el riesgo implicado durante esta [ceremonia de configuración confiable](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Los anteriores pools blindados Sprout y Sapling de Zcash utilizaban los sistemas de prueba zk BCTV14 y Groth16. Aunque eran seguros, tenían limitaciones: no eran escalables porque estaban vinculados a una única aplicación, los «residuos tóxicos» (restos de material criptográfico generados durante la ceremonia génesis) podían persistir, y existía un elemento de confianza (aunque mínimo) al considerar aceptable la ceremonia.

Halo elimina la configuración confiable al colapsar repetidamente múltiples instancias de problemas difíciles sobre ciclos de curvas elípticas, de modo que las pruebas computacionales puedan razonar eficientemente sobre sí mismas (amortización anidada). Un efecto secundario es que la cadena de referencia estructurada (el resultado de una ceremonia) se vuelve actualizable, lo que permite aplicaciones como los contratos inteligentes.

Halo ofrece a los usuarios dos garantías importantes sobre la seguridad de un sistema de pruebas zero-knowledge a gran escala. En primer lugar, permite a los usuarios demostrar que nadie involucrado en la ceremonia génesis ha creado una puerta trasera secreta para ejecutar transacciones fraudulentas. En segundo lugar, permite a los usuarios demostrar que el sistema se ha mantenido seguro con el tiempo, incluso mientras ha sufrido actualizaciones y cambios.

[La explicación de Sean Bowe en Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Visual / Analogía

### La cadena de notarios

Piensa en una zk-SNARK normal como un documento notariado: un sello, una verificación y listo. Ahora imagina que necesitas demostrar que una pila de diez mil documentos es auténtica. Sin recursión, un verificador tendría que comprobar cada sello.

Halo convierte cada documento verificado en un sello en el documento *siguiente*, hasta que toda la pila se reduce a un único documento con un único sello. Comprobar el último documento basta para confiar en toda la cadena y, de forma crucial, el notario de Halo (el sistema de demostración) fabrica sus propios sellos sin necesitar nunca una autoridad externa que configure su sello.

### Por qué importa eliminar la configuración confiable

En los sistemas anteriores, el «sello» (la CRS) procedía de una ceremonia. Los participantes debían destruir el material intermedio y todos tenían que confiar en que lo hicieran. El sello de Halo es producido únicamente por las matemáticas: no hay nada que destruir, nada que filtrar y ninguna ceremonia en la que confiar.

---

## Análisis detallado

### Pruebas recursivas

La composición recursiva de pruebas permite que una sola prueba dé fe de la corrección de una cantidad prácticamente ilimitada de otras pruebas, comprimiendo una gran cantidad de computación (e información). Es un componente esencial para la escalabilidad, porque permite que la red escale horizontalmente mientras grupos de participantes todavía pueden confiar en la integridad del resto de la red.

Antes de Halo, lograr la composición recursiva de pruebas requería un gran gasto computacional y una configuración confiable. Uno de los principales descubrimientos fue una técnica denominada **amortización anidada**: composición recursiva mediante un esquema de compromiso polinómico basado en el argumento de producto interno, que mejora masivamente el rendimiento mientras evita la configuración confiable.

El documento [Halo](https://eprint.iacr.org/2019/1021.pdf) describe plenamente este esquema de compromiso polinómico y descubrió que existía dentro de él una nueva técnica de agregación. La técnica permite verificar un gran número de pruebas creadas independientemente casi tan rápido como se verifica una sola prueba. Por sí sola, ya ofrecía una alternativa mejor al anterior zk-SNARKs utilizado en Zcash.

### Halo 2

Halo 2 es una implementación zk-SNARK de alto rendimiento escrita en Rust que elimina la necesidad de una configuración confiable, a la vez que prepara el terreno para la escalabilidad en Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Incluye una generalización del enfoque denominada **esquema de acumulación**. Esta formalización revela cómo funciona realmente la amortización anidada: al añadir pruebas a un objeto llamado **acumulador**, donde cada prueba razona sobre el estado anterior del acumulador, todas las pruebas anteriores pueden comprobarse (por inducción) simplemente comprobando el estado actual del acumulador.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

En paralelo, muchos otros equipos estaban descubriendo IOP polinómicos más eficientes que Sonic (utilizado en Halo 1), como Marlin. El más eficiente de estos protocolos es PLONK, que ofrece una enorme flexibilidad para diseñar implementaciones eficientes basadas en necesidades específicas de la aplicación y proporciona un tiempo de demostrador 5× mejor que Sonic.

[Descripción general de PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo en el ecosistema más amplio

Electric Coin Company celebró un acuerdo con Protocol Labs, la Fundación Filecoin y la Ethereum Foundation para explorar I+D de Halo, incluido cómo podría utilizarse la tecnología en sus respectivas redes. El acuerdo busca proporcionar una mejor escalabilidad, interoperabilidad y privacidad entre ecosistemas y para Web 3.0.

Además, Halo 2 está bajo las [licencias de código abierto MIT y Apache 2.0](https://github.com/zcash/halo2#readme), lo que significa que cualquiera en el ecosistema puede desarrollar con el sistema de demostración.

**Filecoin.** Desde su implementación, la biblioteca halo2 ha sido adoptada en proyectos como zkEVM, y existe una posible integración de Halo 2 en el sistema de pruebas para la Máquina Virtual Filecoin. Filecoin requiere numerosas y costosas pruebas de espacio-tiempo y pruebas de replicación; Halo 2 es fundamental para comprimir el uso de espacio y escalar mejor la red. [FilecoinVídeo de la Fundación con Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Ambos ecosistemas también se beneficiarían si los pagos de almacenamiento Filecoin pudieran realizarse en ZEC, otorgando la misma privacidad a las compras de almacenamiento que existe en las transferencias blindadas Zcash, incluido el cifrado de archivos en el almacenamiento Filecoin y el soporte para clientes móviles que adjunten contenido multimedia a un memo cifrado Zcash. [ECC × FilecoinPublicación del blog](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Se está desarrollando una prueba Halo 2 para una Función de Retardo Verificable (VDF) eficiente. Una VDF es una primitiva criptográfica con muchos casos de uso potenciales, incluida la aleatoriedad de propósito general para contratos inteligentes y la elección de líderes en Proof of Stake. ECC, la Fundación Filecoin, Protocol Labs y la Ethereum Foundation también están trabajando con [SupraNational](https://www.supranational.net/), un proveedor especializado en criptografía acelerada por hardware, para el posible desarrollo mediante GPU y ASIC de la VDF. El grupo [Privacy and Scaling Explorations](https://appliedzkp.org/) está investigando formas adicionales en que las pruebas Halo 2 pueden mejorar la privacidad y la escalabilidad de Ethereum.

### Otros proyectos que utilizan Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — un protocolo de swap atómico multichain que preserva la privacidad
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — un zkRollup L2 en Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html) — una blockchain zkEVM L1 privada
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — un zkRollup L2 en Ethereum

---

## Implicaciones prácticas

**Para Zcash mismo**

- El pool blindado Orchard, activado con NU5, es la implementación de este nuevo sistema de pruebas en la red Zcash. Está protegido por el mismo diseño turnstile utilizado entre Sprout y Sapling, con la intención de retirar gradualmente los pools blindados más antiguos.
- Tras NU5 (mediados de 2022), la integración de pruebas recursivas se volvió posible, y llegaron varias mejoras de privacidad, en particular la introducción de «Acciones» que sustituyen entradas/salidas, lo que reduce la cantidad de metadatos de las transacciones.
- Eliminar las configuraciones confiables elimina un riesgo sistémico que, de otro modo, tendría que repetirse en cada actualización importante del protocolo.

**Para titulares y operadores**

- La composición recursiva de pruebas tiene el potencial de comprimir cantidades ilimitadas de computación, crear sistemas distribuidos auditables y mejorar la capacidad de la Capa 1 para los operadores de nodos completos, algo relevante para extensiones como los Shielded Assets de Zcash y los diseños a más largo plazo de Zcash.

---

## Errores comunes

| Creencia común | Lo que realmente ocurre |
| --- | --- |
| «Halo es una futura actualización que Zcash está esperando». | Orchard, activo en mainnet desde NU5 (2022), ya funciona con Halo 2. |
| «Sin configuración confiable significa que no hay parámetros en absoluto». | Halo todavía utiliza parámetros estructurados; la diferencia es que no contienen residuos tóxicos y pueden generarse y actualizarse sin una ceremonia en la que los participantes deban confiar. |
| «Halo 2 y el documento Halo son lo mismo». | El [documento](https://eprint.iacr.org/2019/1021.pdf) describe el esquema de compromiso polinómico y la amortización anidada; Halo 2 es la implementación Rust en producción con un esquema de acumulación y aritmetización PLONKish. |
| «La recursión solo ayuda a escalar la verificación de bloques». | La recursión también comprime la computación a nivel de aplicación; consulta las pruebas de espacio-tiempo/replicación de Filecoin y el trabajo de VDF para Ethereum. |

---

## Páginas relacionadas

- [zk-SNARKs](/zcash-tech/zk-snarks) — la categoría tecnológica general a la que pertenece Halo
- [Halo (documento de investigación)](https://eprint.iacr.org/2019/1021.pdf) — la publicación original
- [Ironwood](/zcash-tech/ironwood) y [El Turnstile](/zcash-tech/the-turnstile) — cómo migran los pools blindados mientras se retiran los más antiguos
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — una extensión que se beneficia de las pruebas recursivas
- [Zebra Nodo completo](/zcash-tech/zebra-full-node) — la implementación de nodo que valida pruebas en la red

## Más información

- [Una introducción a ZKP y Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 con Daira y Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Blog explicativo técnico](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentación**

- [Recursos de Halo 2](https://github.com/mhchia/awesome-halo2)
- [Documentación de Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
