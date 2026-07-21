<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Halo


## ¿Qué es Halo?

Halo es una prueba de conocimiento cero (ZKP) recursiva y sin confianza descubierta por Sean Bowe en Electric Coin Co. Elimina la configuración de confianza y permite una mayor escalabilidad de la blockchain de Zcash. Halo fue el primer sistema de prueba de conocimiento cero que es a la vez eficiente y recursivo, ampliamente considerado como un avance científico.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Componentes**

Esquema sucinto de compromiso polinómico: permite a un emisor comprometerse con un polinomio mediante una cadena corta que puede ser utilizada por un verificador para confirmar las evaluaciones declaradas del polinomio comprometido.

Prueba interactiva de oráculo polinómico: el verificador pide al probador (algoritmo) que abra todos los compromisos en varios puntos de su elección usando el esquema de compromiso polinómico y comprueba que la identidad se mantiene entre ellos. 


### Sin configuración de confianza

Los zkSNARKs dependen de una common reference string (CRS) como parámetro público para probar y verificar. Esta CRS debe generarse por adelantado por una parte de confianza. Hasta hace poco, eran necesarias complejas computaciones seguras multipartitas (MPC) como las realizadas por la red Aztec y Zcash para mitigar el riesgo involucrado durante esta [ceremonia de configuración de confianza](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Anteriormente, los pools blindados Sprout y Sapling de Zcash utilizaban los sistemas de zk-proving BCTV14 y Groth 16. Aunque eran seguros, tenían limitaciones. No eran escalables, ya que estaban vinculados a una única aplicación; los "toxic waste" (remanentes del material criptográfico generado durante la ceremonia génesis) podían persistir; y existía un elemento de confianza (aunque mínimo) para que los usuarios consideraran aceptable la ceremonia.

Al colapsar repetidamente múltiples instancias de problemas difíciles a lo largo de ciclos de curvas elípticas, de modo que las pruebas computacionales puedan utilizarse para razonar eficientemente sobre sí mismas (amortización anidada), se elimina la necesidad de una configuración de confianza. Esto también significa que la structured reference string (salida de la ceremonia) es actualizable, lo que habilita aplicaciones como los contratos inteligentes.

Halo proporciona a los usuarios dos garantías importantes con respecto a la seguridad del sistema de prueba de conocimiento cero a gran escala. En primer lugar, permite a los usuarios demostrar que nadie que haya participado en la ceremonia génesis ha creado una puerta trasera secreta para ejecutar transacciones fraudulentas. En segundo lugar, permite a los usuarios demostrar que el sistema ha permanecido seguro con el tiempo, incluso mientras ha pasado por actualizaciones y cambios.

[Explicación de Sean Bowe en Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Pruebas recursivas

La composición recursiva de pruebas permite que una sola prueba certifique la corrección de una cantidad prácticamente ilimitada de otras pruebas, lo que permite comprimir una gran cantidad de computación (e información). Este es un componente esencial para la escalabilidad, no menos importante porque nos permite escalar horizontalmente la red mientras seguimos permitiendo que grupos de participantes confíen en la integridad del resto de la red.

Antes de Halo, lograr la composición recursiva de pruebas requería un gran gasto computacional y una configuración de confianza. Uno de los principales descubrimientos fue una técnica llamada **amortización anidada**. Esta técnica permite la composición recursiva utilizando el esquema de compromiso polinómico basado en el argumento de producto interno, mejorando enormemente el rendimiento y evitando la configuración de confianza.

En el [artículo de Halo](https://eprint.iacr.org/2019/1021.pdf), describimos completamente este esquema de compromiso polinómico y descubrimos que en él existía una nueva técnica de agregación. La técnica permite que un gran número de pruebas creadas independientemente se verifiquen casi tan rápido como verificar una sola prueba. Esto por sí solo ofrecería una mejor alternativa a los zk-SNARKs anteriores utilizados en Zcash.


### Halo 2

Halo 2 es una implementación zk-SNARK de alto rendimiento escrita en Rust que elimina la necesidad de una configuración de confianza, al tiempo que prepara el terreno para la escalabilidad en Zcash. 

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

Incluye una generalización de nuestro enfoque llamada **esquema de acumulación**. Esta nueva formalización expone cómo funciona realmente nuestra técnica de amortización anidada; al añadir pruebas a un objeto llamado **acumulador,** donde las pruebas razonan sobre el estado previo del acumulador, podemos comprobar que todas las pruebas anteriores eran correctas (por inducción) simplemente comprobando el estado actual del acumulador.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



En paralelo, muchos otros equipos estaban descubriendo nuevos IOPs polinómicos que eran más eficientes que Sonic (usado en Halo 1), como Marlin. 

El más eficiente de estos nuevos protocolos es PLONK, que otorga una enorme flexibilidad para diseñar implementaciones eficientes basadas en necesidades específicas de la aplicación y proporciona un tiempo del probador 5 veces mejor que Sonic.

[Visión general de PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### ¿Cómo beneficia esto a Zcash?

El pool blindado Orchard se activó con NU5 y es la implementación de este nuevo sistema de prueba en la red Zcash. Está protegido por el mismo diseño de torniquete utilizado entre Sprout y Sapling, con la intención de retirar gradualmente los pools blindados más antiguos. Esto fomenta la migración hacia un sistema de prueba totalmente sin confianza, reforzando la confianza en la solidez de la base monetaria y reduciendo la complejidad de implementación y la superficie de ataque de Zcash en general. Tras la activación de NU5 a mediados de 2022, la integración de pruebas recursivas pasó a ser posible (aunque esto no está completo). También se realizaron varias mejoras de privacidad de forma tangencial. La introducción de las 'Actions' para reemplazar entradas/salidas ayudó a reducir la cantidad de metadatos de las transacciones. 

Las configuraciones de confianza suelen ser difíciles de coordinar y presentaban un riesgo sistémico. Sería necesario repetirlas para cada actualización importante del protocolo. Eliminarlas supone una mejora sustancial para implementar de forma segura nuevas actualizaciones del protocolo. 

La composición recursiva de pruebas tiene el potencial de comprimir cantidades ilimitadas de computación, crear sistemas distribuidos auditables y hacer que Zcash sea altamente capaz, particularmente con el cambio hacia Proof of Stake. Esto también es útil para extensiones como Zcash Shielded Assets y para mejorar la capacidad de Capa 1 en el extremo superior del uso de nodos completos en los próximos años para Zcash.


## Halo en el ecosistema más amplio 

Electric Coin Company ha firmado un acuerdo con Protocol Labs, la Filecoin Foundation y la Ethereum Foundation para explorar la I+D de Halo, incluyendo cómo podría usarse la tecnología en sus respectivas redes. El acuerdo tiene como objetivo proporcionar mejor escalabilidad, interoperabilidad y privacidad entre ecosistemas y para la Web 3.0.

Además, Halo 2 está bajo las [licencias open-source MIT y Apache 2.0](https://github.com/zcash/halo2#readme), lo que significa que cualquiera dentro del ecosistema puede construir con el sistema de pruebas.

### Filecoin

Desde su despliegue, la biblioteca halo2 ha sido adoptada en proyectos como zkEVM, y existe una posible integración de Halo 2 en el sistema de pruebas de la Filecoin Virtual Machine. Filecoin requiere numerosas y costosas pruebas de spacetime / pruebas de replicación. Halo2 será fundamental para comprimir el uso del espacio y escalar mejor la red.

[Video de Filecoin Foundation con Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Además, sería muy beneficioso para los ecosistemas de Filecoin y Zcash que los pagos de almacenamiento de Filecoin pudieran realizarse en ZEC, proporcionando el mismo nivel de privacidad para las compras de almacenamiento que existe en las transferencias blindadas de Zcash. Este soporte añadiría la capacidad de cifrar archivos en el almacenamiento de Filecoin y añadir soporte a clientes móviles para que pudieran **adjuntar** medios o archivos a un memo cifrado de Zcash. 

[Entrada del blog de ECC x Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Se está desarrollando la implementación de una prueba Halo 2 para la eficiente Verifiable Delay Function (VDF). Una VDF es una primitiva criptográfica que tiene muchos casos de uso potenciales. 

Puede utilizarse como fuente de aleatoriedad de propósito general, incluyendo su uso en aplicaciones de contratos inteligentes, así como en la elección de líderes en Proof of Stake en Ethereum y otros protocolos.

ECC, la Filecoin Foundation, Protocol Labs y la Ethereum Foundation también trabajarán con [SupraNational](https://www.supranational.net/), un proveedor especializado en criptografía acelerada por hardware, para el posible diseño y desarrollo de GPU y ASIC de la VDF.

El grupo [Privacy and Scaling Exploration](https://appliedzkp.org/) también está investigando diferentes formas en que las pruebas Halo 2 pueden mejorar la privacidad y la escalabilidad para el ecosistema Ethereum. Este grupo depende de la Ethereum foundation y tiene un enfoque amplio en pruebas de conocimiento cero y primitivas criptográficas. 

## Otros proyectos que usan Halo

+ [Anoma, un protocolo multichain de intercambios atómicos que preserva la privacidad](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, un zkRollup L2 en Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, una blockchain privada zkEVM de L1](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, un zkRollup L2 en Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Para seguir aprendiendo**:

[Una introducción a zkp y Halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 con Daira y Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Blog explicativo técnico](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Presentación comunitaria de Halo 2 - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentación**

[Recursos de Halo 2](https://github.com/adria0/awesome-halo2)

[Documentación de Halo 2](https://zcash.github.io/halo2/)

[GitHub de Halo 2](https://github.com/zcash/halo2)
