<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Protocolo Crosslink

## Resumen

* El protocolo Crosslink es un diseño propuesto para la etapa híbrida de Prueba de Trabajo/Prueba de Participación (PoW/PoS) de Zcash. Integra PoW con un protocolo de Tolerancia a Fallos Bizantinos (BFT), habilitando finalidad asegurada siempre que PoW o PoS permanezca seguro.
* El PoS híbrido introduce notarios que validan bloques basándose en ZEC apostado — inicialmente estáticos, luego elegidos según el ZEC apostado.
* Crosslink apunta a proporcionar dos libros de registro: un **libro finalizado (LOG_fin)** para seguridad contra reversiones, y un **libro de menor latencia (LOG_ba)** que lo extiende por no más de *L* bloques.
* Un **Modo de Seguridad** se activa si el libro finalizado queda rezagado por más de *L* bloques: PoW continúa, pero las actividades económicas se pausan hasta que el problema se resuelva.
* Con el tiempo, los validadores de PoS recibirán una parte creciente de las recompensas, reduciendo las ganancias de los mineros PoW; el protocolo introduce cambios gradualmente.
* El protocolo está siendo desarrollado por Shielded Labs, con una hoja de ruta para integrar Crosslink 2* en el cliente Zebra de Zcash.
* Crosslink no está activo en la red principal de Zcash. Funciona en la Feature Net de Shielded Labs, una red de prueba a la que cualquiera puede unirse. Consulte "Dónde se encuentra Crosslink" a continuación.

## Explicación Principal

### Introducción: PoS Híbrido de Zcash y el Protocolo Crosslink

El Protocolo Crosslink es un desarrollo histórico en la evolución de Zcash, dirigiéndolo hacia un modelo **Híbrido de Prueba de Participación (PoS)** y **Prueba de Trabajo (PoW)**. El PoW tradicional, aunque confiable para garantizar la seguridad de la red, enfrenta críticas por el consumo energético y los riesgos de centralización asociados con la minería industrial. Crosslink introduce un sistema híbrido, fusionando la robustez probada de PoW con la eficiencia y las ventajas de gobernanza de PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Esta transición se alinea con las tendencias globales en innovación blockchain, donde los proyectos están cambiando hacia mecanismos ambientalmente sostenibles y descentralizados. El modelo de consenso dual de Crosslink asegura que Zcash mantenga sus fuertes garantías de privacidad criptográfica mientras evoluciona para enfrentar los desafíos contemporáneos.

El enfoque híbrido de Prueba de Participación (PoS) combina la Prueba de Trabajo (PoW) tradicional con PoS, con el objetivo de abordar vulnerabilidades como los ataques del 51% mientras mantiene la descentralización y reduce el consumo energético. El PoS híbrido introduce notarios que validan bloques basándose en ZEC apostado. Este mecanismo está diseñado para mejorar la seguridad de la cadena y la validación de puntos de control, ofreciendo una alternativa más robusta a los sistemas de PoW puro.

### ¿Por qué PoS/PoW Híbrido como primera prueba?

* Avanza hacia PoS puro.
* Permite casos de uso concurrentes de minería y staking y cruce de ecosistemas.
* Mitiga posibles problemas de seguridad con el protocolo PoS hasta que tenga mayor participación de validadores y confianza.
* El enfoque general ha sido demostrado por Ethereum en producción.

### Qué es Crosslink

El protocolo Crosslink es un diseño propuesto para la etapa híbrida de Prueba de Trabajo/Prueba de Participación (PoW/PoS) de Zcash. Integra PoW con un protocolo de Tolerancia a Fallos Bizantinos (BFT), habilitando finalidad asegurada siempre que PoW o PoS permanezca seguro. El diseño apunta a fortalecer la seguridad y descentralización de la red incorporando validación apostada mientras mantiene la participación de los mineros. Una característica clave de la propuesta, llamada Crosslink 2, simplifica la arquitectura unificando los proponentes de BFT y los mineros. Este enfoque simplificado minimiza los cambios estructurales y permite el uso de una capa BFT "ficticia", facilitando la creación de prototipos y el despliegue mientras mantiene altos estándares de seguridad.

El plan de implementación incluye una hoja de ruta con costos de ingeniería estimados para integrar Crosslink 2* en el cliente Zebra de Zcash. Este despliegue por fases se centra en equilibrar los incentivos de las partes interesadas, reducir la disrupción y alinearse con los objetivos de Zcash para escalabilidad, usabilidad y descentralización. La creciente confianza en las robustas propiedades de seguridad del protocolo solidifica aún más su potencial como paso clave en la evolución de Zcash. Al abordar la eficiencia energética y mejorar los mecanismos de consenso, Crosslink ofrece una solución con visión de futuro para los desafíos cambiantes de blockchain. Para más detalles, consulte el [repositorio en GitHub](https://github.com/ShieldedLabs/zebra-crosslink) y el [Foro de la Comunidad Zcash](https://forum.zcashcommunity.com).

### Objetivos y Metas de Crosslink

El Protocolo Crosslink está diseñado para abordar varios objetivos estratégicos cruciales para el futuro de Zcash:

1. **Descentralización**:
   * Al incorporar PoS, Zcash reduce la dependencia de hardware especializado de PoW (ASICs), que a menudo concentra el poder de minería entre unos pocos grandes operadores.
   * PoS permite la participación de una comunidad más amplia, donde los titulares de monedas apuestan sus activos para asegurar la red, garantizando un consenso más distribuido.
   * Al introducir la validación apostada, el protocolo asegura que los participantes económicos desempeñen un papel activo en el consenso, reduciendo la dependencia exclusiva de la minería.
2. **Gobernanza Mejorada**:
   * Los titulares de monedas obtienen derechos de voto a través del staking, permitiéndoles influir en decisiones sobre actualizaciones de red, asignaciones de fondos y prioridades del ecosistema. Este mecanismo democrático alinea la evolución del protocolo con los intereses de la comunidad.
3. **Eficiencia Energética**:
   * La transición parcial a PoS reduce significativamente las demandas energéticas, alineando a Zcash con iniciativas globales de sostenibilidad. PoS es inherentemente menos intensivo en recursos comparado con el PoW computacionalmente pesado. Los sistemas híbridos buscan reducir el consumo energético comparado con los sistemas solo de PoW mientras mantienen alta seguridad.
4. **Seguridad y Sostenibilidad Económica**:
   * Combinar PoW y PoS diversifica los incentivos económicos para los participantes de la red, asegurando una seguridad robusta sin depender excesivamente de un solo mecanismo.
   * El staking también introduce un modelo de recompensas predecible para los participantes, creando una propuesta atractiva para inversores a largo plazo.
5. **Mayor Seguridad**: Crosslink busca mejorar la resiliencia de la red contra ataques de reorganización de cadena al integrar PoS junto con PoW.

## Visual / Analogía

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Piense en un servicio de paquetería que emite dos documentos diferentes para la misma entrega. El primero es un escaneo de seguimiento: aparece rápidamente, le dice dónde está probablemente el paquete, y ocasionalmente se corrige. El segundo es un recibo de entrega firmado: llega después, pero una vez que existe nadie lo disputa.

El libro de menor latencia es el escaneo de seguimiento, y el libro finalizado es el recibo firmado. Ambos describen la misma cadena de eventos; difieren en qué tan rápido aparecen y qué tan firmemente se mantienen.

El Modo de Seguridad es lo que hace el depósito cuando los recibos firmados dejan de llegar mientras los escaneos siguen acumulándose. Los paquetes siguen moviéndose por el edificio — pero la oficina deja de pagar contra los escaneos solos hasta que las firmas se pongan al día.

## Análisis Profundo

### Objetivos de Seguridad y Rendimiento de Crosslink

El protocolo Crosslink apunta a proporcionar dos tipos de libros de registro para Zcash: un **libro finalizado (LOG_fin)** y un **libro de menor latencia (LOG_ba)**. El libro finalizado asegura seguridad contra reversiones bajo supuestos razonables sobre el protocolo de Tolerancia a Fallos Bizantinos (BFT) o el protocolo blockchain (BC). Está diseñado para permanecer activo y seguro incluso bajo particiones de red, con una latencia ligeramente superior al doble de la blockchain actual de Zcash para confirmaciones de bloque equivalentes.

El libro de menor latencia extiende el libro finalizado por no más de *L* bloques. Asegura seguridad contra reversiones bajo el protocolo blockchain solo y mantiene latencia y seguridad no peor que el modelo actual de Zcash. En el diseño simplificado Crosslink 2*, el libro de menor latencia simplifica el desarrollo y la adopción al funcionar como una cadena PoW.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Disponibilidad Limitada y Modo de Seguridad

Crosslink incorpora un **Modo de Seguridad** para abordar los riesgos asociados con que el libro de menor latencia se adelante demasiado al libro finalizado. Esto previene discrepancias, como estados de cuenta desequilibrados o brechas de seguridad no verificadas en soluciones temporales de proveedores de servicios. El Modo de Seguridad se activa si el libro finalizado queda rezagado por más de una constante *L* bloques. Durante este estado, la blockchain continúa las operaciones de PoW (asegurando seguridad básica), pero las actividades económicas se pausan hasta que el problema se resuelva. Este mecanismo está diseñado para recuperarse de condiciones excepcionales como ataques mayores mientras apoya políticas de reversión basadas en gobernanza.

### Detalles Técnicos y Despliegue

El Protocolo Crosslink está siendo desarrollado y desplegado activamente por Shielded Labs en colaboración con socios clave del ecosistema como ZODL. La implementación del protocolo incluye:

* Establecer mecanismos seguros de staking para participantes de PoS.
* Modificar la estructura de recompensas para equilibrar incentivos entre mineros y apostadores.
* Asegurar compatibilidad retroactiva y una experiencia de usuario fluida durante la transición.
* Sistema de Notarios: El protocolo incorpora notarios que firman bloques. Inicialmente se usan notarios estáticos, haciendo la transición a un sistema dinámico donde los notarios se eligen basándose en el ZEC apostado.
* Lógica de Activación: La introducción de Crosslink requiere cambios en las reglas de consenso de Zcash, incluyendo la definición del proceso de distribución de participación y la actualización de las reglas del protocolo de red para soportar consenso híbrido.
* Despliegue por Fases: El protocolo se implementará en etapas para asegurar la estabilidad de la red y la adaptación de la comunidad. Las fases iniciales se centran en la implementación técnica, seguidas por la integración de gobernanza para seleccionar notarios.

El prototipo anterior y su documentación se encuentran en el [repositorio zebra-crosslink en GitHub](https://github.com/ShieldedLabs/zebra-crosslink) y en [The zebra-crosslink Book](https://shieldedlabs.github.io/zebra-crosslink/). El trabajo actual se describe en la siguiente sección.

### Dónde se encuentra Crosslink

Crosslink sigue siendo una propuesta. La [FAQ de Crosslink](https://shieldedlabs.net/crosslink-faq/) de Shielded Labs dice que "necesitaría pasar por el proceso de gobernanza estándar de Zcash" antes de poder activarse en la red principal.

Lo que existe hoy es la **Feature Net**: una red de prueba administrada por Shielded Labs, con su propia moneda de prueba, cTAZ, donde cualquiera puede minar, hacer staking y ejecutar un finalizador. La [Versión 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), publicada el 1 de octubre de 2026, comienza como prueba de trabajo simple y activa Crosslink en etapas: staking desde el bloque 20.736, el primer roster de finalizadores tomado en el bloque 34.560, y finalidad BFT desde el bloque 36.288 ([fuente](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)).

Dos cosas en esta página han cambiado desde que fue escrita:

* **El rol llamado notario aquí se llama finalizador** en el software y las notas de versión de Shielded Labs. Los apostadores delegan monedas a un finalizador, y los finalizadores con más participación votan para finalizar bloques.
* **El código se ha movido.** El repositorio zebra-crosslink anterior fue actualizado por última vez en abril de 2026. Las versiones de Feature Net provienen de [crosslink_monolith](https://github.com/ShieldedLabs/crosslink_monolith/releases), y el diseño está documentado en el [libro de Crosslink](https://shieldedlabs.github.io/crosslink_book/).

Para probarlo usted mismo, siga la guía de [Crosslink Feature Net](/guides/crosslink-feature-net). Para observar la red sin ejecutar nada, abra la pestaña Crosslink en [ZecHub Tools](https://zechub.wiki/tools?tool=crosslink).

## Implicaciones Prácticas

### Impacto en los Ingresos de los Mineros PoW

Crosslink reconoce el papel fundamental de los mineros PoW en el desarrollo temprano de Zcash mientras se prepara para un cambio gradual:

* **Recompensas de Bloque Reducidas**:
  * Con el tiempo, los validadores de PoS recibirán una parte creciente de las recompensas, reduciendo las ganancias de los mineros PoW. Esta redistribución refleja el papel decreciente de PoW en el modelo híbrido.
* **Transición Justa**:
  * El protocolo introduce cambios gradualmente, asegurando que los mineros tengan tiempo suficiente para adaptarse o explorar nuevos roles dentro del ecosistema de Zcash, como hacer la transición al staking o contribuir a otros servicios de red.
* **Mitigación de Riesgos de Centralización**:
  * Los pools de staking de PoS están diseñados para prevenir la concentración de poder, ofreciendo a los jugadores más pequeños la oportunidad de participar en igualdad de condiciones. Este enfoque inclusivo contrarresta la concentración actual vista en la minería basada en ASIC.
* Los mineros PoW experimentarán ingresos reducidos ya que parte de la recompensa de bloque se reasigna a los validadores de PoS. Esta reasignación asegura un sistema de incentivos equilibrado, recompensando tanto a mineros como a apostadores por asegurar la red.
* Se planea una transición gradual para mitigar el impacto económico en los mineros mientras se fomenta la participación de los interesados.

Este mecanismo de consenso dual refuerza el compromiso de Zcash con la privacidad, la sostenibilidad y la descentralización, posicionándolo como un líder con visión de futuro en el espacio blockchain.

## Errores Comunes

**Leer Crosslink como una regla de consenso activa**. Esta página describe un diseño propuesto con un plan de despliegue por fases. Su introducción requiere cambios en las reglas de consenso de Zcash, que es para lo que sirven la hoja de ruta y el trabajo de integración con Zebra.

**Asumir que PoS reemplaza a la minería**. Crosslink es un diseño híbrido: la producción de bloques PoW continúa junto con la validación apostada. Incluso en Modo de Seguridad, la blockchain continúa las operaciones de PoW mientras las actividades económicas se pausan.

**Tratar la "finalidad" como confirmación más rápida**. El libro finalizado está diseñado para una latencia ligeramente superior al doble de la blockchain actual de Zcash para confirmaciones de bloque equivalentes. Lo que añade es seguridad contra reversiones, no velocidad — el libro de menor latencia es la vista rápida.

**Confundir los dos libros de registro**. LOG_ba no es una cadena separada: extiende el libro finalizado por no más de *L* bloques, y en el diseño Crosslink 2* funciona como una cadena PoW.

## Páginas Relacionadas

- [Crosslink Feature Net](/guides/crosslink-feature-net) — instale la aplicación de escritorio de Feature Net, haga staking a un finalizador y verifique su posición.
- [Nodo Completo Zebra](/zcash-tech/zebra-full-node) — el cliente en el que se planea integrar Crosslink 2*.
- [Nodos Completos](/zcash-tech/full-nodes) — cómo los nodos validan las reglas de consenso hoy, antes de cualquier cambio de consenso híbrido.
- [Actualizaciones de Red](/start-here/network-upgrades) — cómo los cambios en las reglas de consenso llegan a la red de Zcash.
- [Política Monetaria de Zcash](/start-here/zcash-monetary-policy) — la estructura de recompensa de bloque que Crosslink redistribuiría.

## Recursos Adicionales

- Discusión de la comunidad: [Crosslink: Incentivized Feature Net, en el Foro de la Comunidad Zcash](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)
- Actualizaciones oficiales: [Crosslink en Shielded Labs](https://shieldedlabs.net/crosslink/) y las [versiones de Feature Net](https://github.com/ShieldedLabs/crosslink_monolith/releases)
- Referencia de diseño: [El libro de Crosslink](https://shieldedlabs.github.io/crosslink_book/)

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
