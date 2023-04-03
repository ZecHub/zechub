# Halo


## ¿Qué es Halo?

Halo es una prueba de conocimiento cero recursiva y sin confianza (ZKP) descubierta por Sean Bowe en Electric Coin Co. Elimina la configuración de confianza y permite una mayor escalabilidad de la blockchain de Zcash. Halo fue el primer sistema de prueba de conocimiento cero que es eficiente y recursivo, ampliamente considerado como un avance científico.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Componentes**

Succinct Polynomial Commitment Scheme: permite que un comprometido se comprometa con un polinomio con una cadena corta que puede ser utilizada por un verificador para confirmar evaluaciones reclamadas del polinomio comprometido.

Polynomial Interactive Oracle Proof: el verificador solicita al probador (algoritmo) que abra todos los compromisos en varios puntos de su elección utilizando el esquema de compromiso polinómico y verifica que la identidad se cumpla entre ellos.


### Sin configuración de confianza

zkSNARK depende de una cadena de referencia común (CRS) como parámetro público para demostrar y verificar. Esta CRS debe ser generada de antemano por una parte de confianza. Hasta hace poco, eran necesarias elaboradas computaciones seguras multiparte (MPC) como las realizadas por la red Aztec y Zcash para mitigar el riesgo involucrado durante esta [ceremonia de configuración de confianza](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Anteriormente, los pools de protección Sprout y Sapling de Zcash utilizaban los sistemas de prueba de zk BCTV14 y Groth 16. Si bien eran seguros, había limitaciones. No eran escalables ya que estaban vinculados a una sola aplicación, los "residuos tóxicos" (restos del material criptográfico generado durante una ceremonia de génesis) podían persistir y había un elemento de confianza (aunque mínimo) para que los usuarios consideren la ceremonia aceptable.

Al colapsar repetidamente múltiples instancias de problemas difíciles juntos a lo largo de ciclos de curvas elípticas para que las pruebas computacionales puedan ser utilizadas para razonar sobre sí mismas eficientemente (Nested amortization), se elimina la necesidad de una configuración de confianza. Esto también significa que la cadena de referencia estructurada (resultado de la ceremonia) es actualizable, lo que permite aplicaciones como contratos inteligentes.

Halo permite a un usuario demostrar tanto que nadie involucrado en el establecimiento inicial del sistema de prueba de conocimiento cero a gran escala ha creado una puerta trasera secreta con la que ejecutar transacciones fraudulentas y que el estado seguro ha existido a lo largo de las actualizaciones y cambios del sistema.

[Explicación de Sean Bowes en Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)



### Pruebas Recursivas

La composición de pruebas recursivas permite que una única prueba certifique la corrección de prácticamente cualquier otra cantidad de pruebas, lo que permite comprimir una gran cantidad de cálculos (e información). Este es un componente esencial para la escalabilidad, no solo porque nos permite escalar horizontalmente la red mientras se permite a grupos de participantes confiar en la integridad del resto de la red.

Antes de Halo, lograr la composición de pruebas recursivas requería un gran gasto computacional y una configuración de confianza. Uno de los principales descubrimientos fue una técnica llamada "Nested amortization". Esta técnica permite la composición recursiva mediante el esquema de compromiso polinomial basado en el argumento de producto interno, mejorando enormemente el rendimiento y evitando la configuración de confianza.

En el [documento de Halo](https://eprint.iacr.org/2019/1021.pdf), describimos completamente este esquema de compromiso polinomial y descubrimos que existía una nueva técnica de agregación en él. La técnica permite verificar una gran cantidad de pruebas creadas de manera independiente casi tan rápido como verificar una sola prueba. Solo esto ofrecería una mejor alternativa a las zk-SNARK utilizadas anteriormente en Zcash.


### Halo 2

Halo 2 es una implementación de alto rendimiento de zk-SNARK escrita en Rust que elimina la necesidad de una configuración de confianza al mismo tiempo que establece la base para la escalabilidad en Zcash.

![halo2image](https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg "halo2")

Incluye una generalización de nuestro enfoque llamada "esquema de acumulación". Esta nueva formalización explica cómo funciona nuestra técnica de Nested amortization; agregando pruebas a un objeto llamado "acumulador", donde las pruebas razonan sobre el estado anterior del acumulador, podemos verificar que todas las pruebas anteriores fueron correctas (por inducción) simplemente verificando el estado actual del acumulador.

![Accumulatorimage](https://i.imgur.com/l4HrYgE.png "accumulator")

Al mismo tiempo, muchos otros equipos estaban descubriendo nuevas pruebas de polinomios interactivos que eran más eficientes que Sonic (utilizado en Halo 1), como Marlin.

El protocolo más eficiente de estos nuevos esquemas es PLONK, que otorga una enorme flexibilidad en el diseño de implementaciones eficientes basadas en necesidades específicas de la aplicación y proporciona un tiempo de demostración 5 veces mejor que Sonic.

[Resumen de PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### ¿Cómo beneficia esto a Zcash?

El pool Orchard Shielded se activó con NU5 y es la implementación de este nuevo sistema de pruebas en la red de Zcash. Protegido por el mismo diseño de torniquete utilizado entre Sprout y Sapling con la intención de retirar gradualmente los pools protegidos más antiguos. Esto fomenta la migración a un sistema de prueba completamente sin confianza, refuerza la confianza en la solidez de la base monetaria y reduce la complejidad de implementación y la superficie de ataque de Zcash en general. Después de la activación de NU5 a mediados de 2022, se hizo posible la integración de pruebas recursivas (aunque esto no está completo). También se hicieron varias mejoras de privacidad tangencialmente. La introducción de 'Acciones' para reemplazar las entradas/salidas ayudó a reducir la cantidad de metadatos de transacciones.

Las configuraciones de confianza generalmente son difíciles de coordinar y presentan un riesgo sistémico. Sería necesario repetirlas para cada importante actualización de protocolo. Eliminarlas presenta una mejora sustancial para implementar de manera segura nuevas actualizaciones de protocolo.

La composición de pruebas recursivas tiene el potencial de comprimir cantidades ilimitadas de cómputo, creando sistemas distribuidos auditables, haciendo que Zcash sea altamente capaz, especialmente con el cambio a Proof of Stake. Esto también es útil para extensiones como los Zvash Shielded Assets y para mejorar la capacidad de la Layer 1 en el extremo superior del uso de nodos completos en los próximos años para Zcash.


## Halo en el ecosistema más amplio

Electric Coin Company ha firmado un acuerdo con Protocol Labs, la Filecoin Foundation y la Ethereum Foundation para explorar la investigación y el desarrollo de Halo, incluyendo cómo la tecnología podría ser utilizada en sus respectivas redes. El acuerdo tiene como objetivo proporcionar una mejor escalabilidad, interoperabilidad y privacidad en los ecosistemas y para la Web 3.0.

Además, Halo 2 se encuentra bajo las [licencias de código abierto MIT y Apache 2.0](https://github.com/zcash/halo2#readme), lo que significa que cualquier persona en el ecosistema puede construir con el sistema de prueba.

### Filecoin

Desde su implementación, la biblioteca halo2 ha sido adoptada en proyectos como zkEVM, hay una integración potencial de Halo 2 en el sistema de prueba para la Filecoin Virtual Machine. Filecoin requiere numerosas pruebas costosas de espacio-tiempo / pruebas de replicación. Halo2 será fundamental para comprimir el uso del espacio, mejorando la escalabilidad de la red.

[Video de la Filecoin Foundation con Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Además, sería altamente beneficioso para los ecosistemas de Filecoin y Zcash si los pagos de almacenamiento de Filecoin se pudieran realizar en ZEC, lo que proporcionaría el mismo nivel de privacidad para las compras de almacenamiento que existe en las transferencias blindadas de Zcash. Este soporte agregaría la capacidad de cifrar archivos en el almacenamiento de Filecoin y agregar soporte a los clientes móviles para que puedan "adjuntar" medios o archivos a un memo cifrado de Zcash.

[Publicación de blog de ECC x Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Implementación de una prueba Halo 2 para la eficiente Verifiable Delay Function (VDF) que se está desarrollando. Un VDF es un primitivo criptográfico que tiene muchos casos de uso potenciales.

Puede ser utilizado como fuente de aleatoriedad de propósito general, incluyendo su uso en aplicaciones de contratos inteligentes, así como la elección de líderes en Proof of Stake en Ethereum y otros protocolos.

ECC, la Filecoin Foundation, Protocol Labs y la Ethereum Foundation también trabajarán con [SupraNational](https://www.supranational.net/), un proveedor especializado en criptografía acelerada por hardware, para el potencial diseño y desarrollo de GPU y ASIC para VDF.

[El grupo de Privacy and Scaling Exploration](https://appliedzkp.org/) también está investigando diferentes formas en que las pruebas de Halo 2 pueden mejorar la privacidad y escalabilidad del ecosistema de Ethereum. Este grupo se integra en la Ethereum Foundation y tiene un amplio enfoque en pruebas de conocimiento cero y primitivas criptográficas.

## Otros proyectos que utilizan Halo

+ [Anoma, un protocolo de intercambio atómico multicanal que preserva la privacidad](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, un zkRollup L2 en Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, una cadena privada L1 zkEVM](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, un zkRollup L2 en Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Más información**:

[An introduction to zkp and halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 with Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Technical Explainer Blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Community Showcase - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentación**

[Recursos de Halo 2](https://github.com/adria0/awesome-halo2)

[Documentación de Halo 2](https://zcash.github.io/halo2/)

[Halo 2 en Github](https://github.com/zcash/halo2)
