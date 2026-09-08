<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Crosslink Protocol

## Resumen rápido

* El protocolo Crosslink es un diseño propuesto para la etapa híbrida de Proof-of-Work/Proof-of-Stake (PoW/PoS) de Zcash. Integra PoW con un protocolo de Byzantine Fault Tolerance (BFT), lo que permite una finalidad asegurada siempre que PoW o PoS sigan siendo seguros.
* El PoS híbrido introduce notarios que validan bloques en función del ZEC en stake; al principio serán estáticos y, más adelante, serán elegidos en función del ZEC en stake.
* Crosslink busca proporcionar dos libros mayores: un **libro mayor finalizado (LOG_fin)** para seguridad frente a rollbacks, y un **libro mayor de menor latencia (LOG_ba)** que lo extiende en no más de *L* bloques.
* Un **Modo de Seguridad** se activa si el libro mayor finalizado se retrasa más de *L* bloques: PoW continúa, pero las actividades económicas se pausan hasta que se resuelva el problema.
* Con el tiempo, los validadores PoS recibirán una porción cada vez mayor de las recompensas, reduciendo las ganancias de los mineros PoW; el protocolo introduce los cambios de forma gradual.
* El protocolo está siendo desarrollado por Shielded Labs, con una hoja de ruta para integrar Crosslink 2* en el cliente Zebra de Zcash.

## Explicación principal

### Introducción: PoS híbrido de Zcash y el protocolo Crosslink

El protocolo Crosslink es un desarrollo clave en la evolución de Zcash, que lo orienta hacia un modelo **Hybrid Proof-of-Stake (PoS)** y **Proof-of-Work (PoW)**. El PoW tradicional, aunque fiable para garantizar la seguridad de la red, recibe críticas por el consumo de energía y los riesgos de centralización asociados con la minería industrial. Crosslink introduce un sistema híbrido que combina la solidez comprobada de PoW con las ventajas de eficiencia y gobernanza de PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Esta transición se alinea con las tendencias globales en la innovación blockchain, donde los proyectos están cambiando hacia mecanismos sostenibles desde el punto de vista ambiental y descentralizados. El modelo de consenso dual de Crosslink garantiza que Zcash mantenga sus sólidas garantías criptográficas de privacidad mientras evoluciona para afrontar los desafíos contemporáneos.

El enfoque híbrido de Proof-of-Stake (PoS) combina el Proof-of-Work (PoW) tradicional con PoS, con el objetivo de abordar vulnerabilidades como los ataques del 51% manteniendo la descentralización y reduciendo el consumo de energía. El PoS híbrido introduce notarios que validan bloques en función del ZEC en stake. Este mecanismo está diseñado para mejorar la seguridad de la cadena y la validación de checkpoints, ofreciendo una alternativa más robusta que los sistemas puramente PoW.

### ¿Por qué PoS/PoW híbrido como primera prueba?

* Hace avanzar hacia un PoS puro.
* Permite casos de uso concurrentes de minería y staking, así como la convergencia del ecosistema.
* Mitiga posibles problemas de seguridad del protocolo PoS hasta que tenga una mayor participación de validadores y más confianza.
* Ethereum ya ha demostrado el enfoque general en producción.

### Qué es Crosslink

El protocolo Crosslink es un diseño propuesto para la etapa híbrida de Proof-of-Work/Proof-of-Stake (PoW/PoS) de Zcash. Integra PoW con un protocolo de Byzantine Fault Tolerance (BFT), lo que permite una finalidad asegurada siempre que PoW o PoS sigan siendo seguros. El diseño busca reforzar la seguridad y la descentralización de la red incorporando validación con stake mientras mantiene la participación de los mineros. Una característica clave de la propuesta, llamada Crosslink 2, simplifica la arquitectura al unificar a los proponentes BFT y a los mineros. Este enfoque simplificado minimiza los cambios estructurales y permite el uso de una capa BFT "dummy", lo que facilita la creación de prototipos y el despliegue manteniendo altos estándares de seguridad.

El plan de implementación incluye una hoja de ruta con costes de ingeniería estimados para integrar Crosslink 2* en el cliente Zebra de Zcash. Este despliegue por fases se centra en equilibrar los incentivos de las partes interesadas, reducir las interrupciones y alinearse con los objetivos de Zcash en escalabilidad, usabilidad y descentralización. La creciente confianza en las sólidas propiedades de seguridad del protocolo consolida aún más su potencial como un paso clave en la evolución de Zcash. Al abordar la eficiencia energética y mejorar los mecanismos de consenso, Crosslink ofrece una solución orientada al futuro frente a los desafíos cambiantes de blockchain. Para más detalles, consulta el [repositorio de GitHub](https://github.com/ShieldedLabs/crosslink-deployment) y el [Foro de la Comunidad Zcash](https://forum.zcashcommunity.com).

### Metas y objetivos de Crosslink

El protocolo Crosslink está diseñado para abordar varios objetivos estratégicos cruciales para el futuro de Zcash:

1. **Descentralización**:
   * Al incorporar PoS, Zcash reduce la dependencia del hardware especializado de PoW (ASIC), que a menudo concentra el poder de minería en unos pocos grandes operadores.
   * PoS permite la participación de una comunidad más amplia, donde los poseedores de monedas ponen sus activos en stake para asegurar la red, garantizando un consenso más distribuido.
   * Al introducir validación con stake, el protocolo garantiza que los participantes económicos desempeñen un papel activo en el consenso, reduciendo la dependencia exclusiva de la minería.
2. **Gobernanza mejorada**:
   * Los poseedores de monedas obtienen derechos de voto mediante el staking, lo que les permite influir en las decisiones sobre actualizaciones de red, asignaciones de fondos y prioridades del ecosistema. Este mecanismo democrático alinea la evolución del protocolo con los intereses de la comunidad.
3. **Eficiencia energética**:
   * La transición parcial a PoS reduce significativamente las demandas de energía, alineando a Zcash con iniciativas globales de sostenibilidad. PoS consume inherentemente menos recursos en comparación con PoW, que requiere una gran carga computacional. Los sistemas híbridos buscan reducir el uso de energía en comparación con los sistemas basados solo en PoW manteniendo una alta seguridad.
4. **Seguridad económica y sostenibilidad**:
   * La combinación de PoW y PoS diversifica los incentivos económicos para los participantes de la red, garantizando una seguridad sólida sin depender en exceso de un único mecanismo.
   * El staking también introduce un modelo de recompensas predecible para los participantes, creando una propuesta atractiva para los inversores a largo plazo.
5. **Mayor seguridad**: Crosslink busca mejorar la resiliencia de la red frente a ataques de reorganización de cadena integrando PoS junto con PoW.

## Visual / Analogía

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Piensa en un servicio de paquetería que emite dos documentos distintos para la misma entrega. El primero es un escaneo de seguimiento: aparece rápido, te dice dónde es más probable que esté el paquete y, en ocasiones, se corrige. El segundo es un recibo de entrega firmado: llega más tarde, pero una vez existe nadie lo discute.

El libro mayor de menor latencia es el escaneo de seguimiento, y el libro mayor finalizado es el recibo firmado. Ambos describen la misma cadena de eventos; se diferencian en la rapidez con la que aparecen y en la firmeza con la que se sostienen.

El Modo de Seguridad es lo que hace el depósito cuando los recibos firmados dejan de llegar mientras los escaneos siguen acumulándose. Los paquetes siguen moviéndose por el edificio, pero la oficina deja de pagar basándose solo en los escaneos hasta que las firmas se pongan al día.

## Análisis en profundidad

### Objetivos de seguridad y rendimiento de Crosslink

El protocolo Crosslink busca proporcionar dos tipos de libros mayores para Zcash: un **libro mayor finalizado (LOG_fin)** y un **libro mayor de menor latencia (LOG_ba)**. El libro mayor finalizado garantiza seguridad frente a rollbacks bajo supuestos razonables sobre el protocolo de Byzantine Fault Tolerance (BFT) o el protocolo blockchain (BC). Está diseñado para seguir siendo activo y seguro incluso bajo particiones de red, con una latencia ligeramente superior al doble de la blockchain actual de Zcash para confirmaciones de bloque equivalentes.

El libro mayor de menor latencia extiende el libro mayor finalizado en no más de *L* bloques. Garantiza seguridad frente a rollbacks bajo el protocolo blockchain por sí solo y mantiene una latencia y seguridad no peores que las del modelo actual de Zcash. En el diseño simplificado Crosslink 2*, el libro mayor de menor latencia simplifica el desarrollo y la adopción al funcionar como una cadena PoW.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Disponibilidad acotada y Modo de Seguridad

Crosslink incorpora un **Modo de Seguridad** para abordar los riesgos asociados con que el libro mayor de menor latencia se adelante demasiado al libro mayor finalizado. Esto evita discrepancias, como estados de cuenta desequilibrados o brechas de seguridad no verificadas en soluciones temporales de los proveedores de servicios. El Modo de Seguridad se activa si el libro mayor finalizado se retrasa más de una constante de *L* bloques. Durante este estado, la blockchain continúa con las operaciones PoW (garantizando la seguridad básica), pero las actividades económicas se pausan hasta que se resuelva el problema. Este mecanismo está diseñado para recuperarse de condiciones excepcionales, como grandes ataques, al tiempo que respalda políticas de rollback basadas en gobernanza.

### Detalles técnicos y despliegue

El protocolo Crosslink está siendo desarrollado y desplegado activamente por Shielded Labs en colaboración con socios clave del ecosistema como Zodl. La implementación del protocolo incluye:

* Establecer mecanismos de staking seguros para los participantes de PoS.
* Modificar la estructura de recompensas para equilibrar los incentivos entre mineros y stakers.
* Garantizar compatibilidad retroactiva y una experiencia de usuario fluida durante la transición.
* Sistema de notarios: el protocolo incorpora notarios que dan conformidad a los bloques. Inicialmente se usan notarios estáticos, con una transición a un sistema dinámico en el que los notarios son elegidos en función del ZEC en stake.
* Lógica de activación: la introducción de Crosslink requiere cambios en las reglas de consenso de Zcash, incluida la definición del proceso de distribución del stake y la actualización de las reglas del protocolo de red para admitir consenso híbrido.
* Despliegue por fases: el protocolo se implementará por etapas para garantizar la estabilidad de la red y la adaptación de la comunidad. Las fases iniciales se centran en la implementación técnica, seguidas de la integración de la gobernanza para seleccionar notarios.

Puedes explorar los detalles técnicos y seguir su progreso a través del [Repositorio de despliegue de Crosslink en GitHub](https://github.com/ShieldedLabs/crosslink-deployment).

## Implicaciones prácticas

### Impacto en los ingresos de los mineros PoW

Crosslink reconoce el papel fundamental de los mineros PoW en el desarrollo temprano de Zcash mientras se prepara para un cambio gradual:

* **Reducción de las recompensas por bloque**:
  * Con el tiempo, los validadores PoS recibirán una porción cada vez mayor de las recompensas, reduciendo las ganancias de los mineros PoW. Esta redistribución refleja el papel decreciente de PoW en el modelo híbrido.
* **Transición justa**:
  * El protocolo introduce los cambios gradualmente, asegurando que los mineros tengan tiempo suficiente para adaptarse o explorar nuevos roles dentro del ecosistema de Zcash, como pasar al staking o contribuir a otros servicios de la red.
* **Mitigación de los riesgos de centralización**:
  * Los pools de staking PoS están diseñados para evitar la concentración de poder, ofreciendo a los participantes más pequeños la oportunidad de participar en igualdad de condiciones. Este enfoque inclusivo contrarresta la concentración actual observada en la minería basada en ASIC.
* Los mineros PoW experimentarán una reducción de ingresos, ya que parte de la recompensa por bloque se reasignará a los validadores PoS. Esta reasignación garantiza un sistema equilibrado de incentivos, recompensando tanto a mineros como a stakers por asegurar la red.
* Se planea una transición gradual para mitigar el impacto económico en los mineros mientras se fomenta la participación de las partes interesadas.

Este mecanismo de doble consenso refuerza el compromiso de Zcash con la privacidad, la sostenibilidad y la descentralización, posicionándolo como un líder con visión de futuro en el espacio blockchain.

## Errores comunes

**Interpretar Crosslink como una regla de consenso activa**. Esta página describe un diseño propuesto con un plan de despliegue por fases. Introducirlo requiere cambios en las reglas de consenso de Zcash, y para eso existen la hoja de ruta y el trabajo de integración en Zebra.

**Suponer que PoS reemplaza a la minería**. Crosslink es un diseño híbrido: la producción de bloques PoW continúa junto con la validación con stake. Incluso en el Modo de Seguridad, la blockchain continúa con las operaciones PoW mientras las actividades económicas están pausadas.

**Tratar la "finalidad" como una confirmación más rápida**. El libro mayor finalizado está diseñado para una latencia ligeramente superior al doble de la blockchain actual de Zcash para confirmaciones de bloque equivalentes. Lo que añade es seguridad frente a rollbacks, no velocidad; el libro mayor de menor latencia es la vista rápida.

**Confundir los dos libros mayores**. LOG_ba no es una cadena separada: extiende el libro mayor finalizado en no más de *L* bloques y, en el diseño Crosslink 2*, funciona como una cadena PoW.

## Páginas relacionadas

- [Nodo completo Zebra](/zcash-tech/zebra-full-node) — el cliente en el que se planea integrar Crosslink 2*.
- [Nodos completos](/zcash-tech/full-nodes) — cómo los nodos validan hoy las reglas de consenso, antes de cualquier cambio hacia un consenso híbrido.
- [Actualizaciones de red](/start-here/network-upgrades) — cómo los cambios en las reglas de consenso llegan a la red Zcash.
- [Política monetaria de Zcash](/start-here/zcash-monetary-policy) — la estructura de recompensas por bloque que Crosslink redistribuiría.

## Recursos adicionales

- Perspectivas de la comunidad: [Foro de la Comunidad Zcash - Debates sobre Crosslink](https://forum.zcashcommunity.com)
- Actualizaciones oficiales: [Blog de Electric Coin Company](https://electriccoin.co)
- Enfoque en sostenibilidad: [Por qué el PoS híbrido importa para Zcash](https://forum.zcashcommunity.com)

  Referencia:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div>
