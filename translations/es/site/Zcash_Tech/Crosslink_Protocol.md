### Protocolo Crosslink

#### **Introducción: PoS híbrido de Zcash y el protocolo Crosslink**

El Protocolo Crosslink es un desarrollo histórico en la evolución de Zcash, orientándolo hacia un modelo **híbrido de Proof-of-Stake (PoS)** y **Proof-of-Work (PoW)**. El PoW tradicional, aunque fiable para garantizar la seguridad de la red, recibe críticas por su consumo energético y por los riesgos de centralización asociados a la minería industrial. Crosslink introduce un sistema híbrido, fusionando la solidez comprobada de PoW con las ventajas de eficiencia y gobernanza de PoS.

![imagen](https://github.com/user-attachments/assets/a2ffb19d-e570-4723-b669-a66e14fc6b71)

Esta transición se alinea con las tendencias globales en la innovación blockchain, donde los proyectos están pasando a mecanismos sostenibles desde el punto de vista medioambiental y descentralizados. El modelo de consenso dual de Crosslink garantiza que Zcash mantenga sus sólidas garantías criptográficas de privacidad mientras evoluciona para afrontar los desafíos contemporáneos.

El enfoque híbrido de Proof-of-Stake (PoS) combina el tradicional Proof-of-Work (PoW) con PoS, con el objetivo de abordar vulnerabilidades como los ataques del 51% mientras mantiene la descentralización y reduce el consumo energético. El PoS híbrido introduce notarios que validan bloques en función del ZEC en staking. Este mecanismo está diseñado para mejorar la seguridad de la cadena y la validación de checkpoints, ofreciendo una alternativa más robusta a los sistemas de PoW puro​.

¿Por qué PoS/PoW híbrido como primera prueba?
Permite avanzar hacia un PoS puro
Habilita casos de uso simultáneos de minería y staking, así como cruces entre ecosistemas.
Mitiga posibles problemas de seguridad del protocolo PoS hasta que tenga una mayor participación de validadores en staking y más confianza.
El enfoque general ya ha sido demostrado por Ethereum en producción

---


### CROSSLINK
El protocolo Crosslink es un diseño propuesto para la etapa híbrida de Proof-of-Work/Proof-of-Stake (PoW/PoS) de Zcash. Integra PoW con un protocolo de Byzantine Fault Tolerance (BFT), permitiendo una finalidad garantizada siempre que PoW o PoS sigan siendo seguros. El diseño tiene como objetivo reforzar la seguridad y la descentralización de la red incorporando validación con staking, al tiempo que mantiene la participación de los mineros. Una característica clave de la propuesta, llamada Crosslink 2, simplifica la arquitectura al unificar a los proponentes BFT y los mineros. Este enfoque simplificado minimiza los cambios estructurales y permite el uso de una capa BFT "dummy", lo que facilita la creación de prototipos y el despliegue manteniendo altos estándares de seguridad.

El plan de implementación incluye una hoja de ruta con costes estimados de ingeniería para integrar Crosslink 2* en el cliente Zebra de Zcash. Este despliegue por fases se centra en equilibrar los incentivos de las partes interesadas, reducir las interrupciones y alinearse con los objetivos de Zcash en cuanto a escalabilidad, usabilidad y descentralización. La creciente confianza en las sólidas propiedades de seguridad del protocolo refuerza aún más su potencial como un paso clave en la evolución de Zcash. Al abordar la eficiencia energética y mejorar los mecanismos de consenso, Crosslink ofrece una solución con visión de futuro para los desafíos cambiantes de blockchain. Para más detalles, consulta el [repositorio de GitHub](https://github.com/ShieldedLabs/crosslink-deployment) y el [Foro de la Comunidad Zcash](https://forum.zcashcommunity.com).

![imagen](https://github.com/user-attachments/assets/b34afda4-fe33-448f-b0dd-279fd6cef1f5)


#### **Objetivos y metas de Crosslink**

El Protocolo Crosslink está diseñado para abordar varios objetivos estratégicos cruciales para el futuro de Zcash:

1. **Descentralización**:
   - Al incorporar PoS, Zcash reduce su dependencia del hardware especializado de PoW (ASICs), que a menudo concentra el poder de minería entre unos pocos grandes operadores.
   - PoS permite la participación de una comunidad más amplia, donde los poseedores de monedas ponen en staking sus activos para asegurar la red, garantizando un consenso más distribuido.
   - Al introducir validación con staking, el protocolo garantiza que los participantes económicos desempeñen un papel activo en el consenso, reduciendo la dependencia exclusiva de la minería.

2. **Gobernanza mejorada**:
   - Los poseedores de monedas obtienen derechos de voto mediante el staking, lo que les permite influir en las decisiones sobre actualizaciones de red, asignaciones de financiación y prioridades del ecosistema. Este mecanismo democrático alinea la evolución del protocolo con los intereses de la comunidad.

3. **Eficiencia energética**:
   - La transición parcial a PoS reduce significativamente las demandas energéticas, alineando a Zcash con las iniciativas globales de sostenibilidad. PoS es inherentemente menos intensivo en recursos en comparación con el PoW, que exige una gran carga computacional. Los sistemas híbridos buscan reducir el uso de energía en comparación con los sistemas basados únicamente en PoW, manteniendo al mismo tiempo una alta seguridad​

4. **Seguridad económica y sostenibilidad**:
   - La combinación de PoW y PoS diversifica los incentivos económicos para los participantes de la red, garantizando una seguridad robusta sin depender en exceso de un único mecanismo.
   - El staking también introduce un modelo de recompensas predecible para los participantes, creando una propuesta atractiva para inversores a largo plazo.
 
5. Mayor seguridad: Crosslink pretende mejorar la resiliencia de la red frente a ataques de reorganización de cadena integrando PoS junto con PoW.

### Objetivos de seguridad y rendimiento de Crosslink

El protocolo Crosslink tiene como objetivo proporcionar dos tipos de libros contables para Zcash: un **libro contable finalizado (LOG_fin)** y un **libro contable de menor latencia (LOG_ba)**. El libro contable finalizado garantiza seguridad frente a rollbacks bajo supuestos razonables sobre el protocolo de Byzantine Fault Tolerance (BFT) o de blockchain (BC). Está diseñado para seguir activo y seguro incluso bajo particiones de red, con una latencia ligeramente superior al doble de la blockchain actual de Zcash para confirmaciones de bloques equivalentes.

El libro contable de menor latencia extiende el libro contable finalizado en no más de *L* bloques. Garantiza seguridad frente a rollbacks únicamente bajo el protocolo blockchain y mantiene una latencia y seguridad no peores que el modelo actual de Zcash. En el diseño simplificado Crosslink 2*, el libro contable de menor latencia simplifica el desarrollo y la adopción al funcionar como una cadena PoW.

![imagen](https://github.com/user-attachments/assets/fd039664-4852-4fb0-8c88-0615f1ed116e)


### Disponibilidad acotada y modo de seguridad

Crosslink incorpora un **Modo de Seguridad** para abordar los riesgos asociados a que el libro contable de menor latencia se adelante mucho al libro contable finalizado. Esto evita discrepancias, como estados de cuenta desequilibrados o brechas de seguridad no verificadas en soluciones temporales por parte de proveedores de servicios. El Modo de Seguridad se activa si el libro contable finalizado se retrasa más de una constante de *L* bloques. Durante este estado, la blockchain continúa las operaciones PoW (garantizando la seguridad básica), pero las actividades económicas se pausan hasta que se resuelva el problema. Este mecanismo está diseñado para recuperarse de condiciones excepcionales como ataques importantes, al tiempo que respalda políticas de rollback basadas en gobernanza.


---

#### **Impacto en los ingresos de los mineros PoW**

Crosslink reconoce el papel fundamental de los mineros PoW en el desarrollo temprano de Zcash mientras se prepara para un cambio gradual:

- **Reducción de recompensas por bloque**:
   - Con el tiempo, los validadores PoS recibirán una proporción creciente de las recompensas, reduciendo los ingresos de los mineros PoW. Esta redistribución refleja el papel decreciente de PoW en el modelo híbrido.
   
- **Transición justa**:
   - El protocolo introduce cambios de forma gradual, garantizando que los mineros dispongan de tiempo suficiente para adaptarse o explorar nuevos roles dentro del ecosistema Zcash, como pasar al staking o contribuir a otros servicios de red.

- **Mitigación de riesgos de centralización**:
   - Los pools de staking PoS están diseñados para evitar la concentración de poder, ofreciendo a los participantes más pequeños la oportunidad de participar en igualdad de condiciones. Este enfoque inclusivo contrarresta la concentración actual observada en la minería basada en ASIC.

- Los mineros PoW experimentarán una reducción de ingresos a medida que parte de la recompensa por bloque se reasigne a los validadores PoS. Esta reasignación garantiza un sistema de incentivos equilibrado, recompensando tanto a mineros como a stakers por asegurar la red.
- Se planifica una transición gradual para mitigar el impacto económico sobre los mineros y, al mismo tiempo, fomentar la participación de las partes interesadas​

---

#### **Detalles técnicos y despliegue**

El Protocolo Crosslink está siendo desarrollado y desplegado activamente por Shielded Labs en colaboración con socios clave del ecosistema como ZODL. La implementación del protocolo incluye:
- Establecer mecanismos de staking seguros para los participantes de PoS.
- Modificar la estructura de recompensas para equilibrar los incentivos entre mineros y stakers.
- Garantizar compatibilidad retroactiva y una experiencia de usuario fluida durante la transición.
- Sistema de notarios: El protocolo incorpora notarios que firman los bloques. Inicialmente se utilizan notarios estáticos, con una transición hacia un sistema dinámico en el que los notarios son elegidos en función del ZEC en staking.​
- Lógica de activación: La introducción de Crosslink requiere cambios en las reglas de consenso de Zcash, incluida la definición del proceso de distribución del staking y la actualización de las reglas del protocolo de red para admitir consenso híbrido​
- Despliegue por fases: El protocolo se implementará por etapas para garantizar la estabilidad de la red y la adaptación de la comunidad. Las fases iniciales se centran en la implementación técnica, seguidas por la integración de la gobernanza para seleccionar notarios​.

Puedes explorar los detalles técnicos y seguir su progreso a través del [Repositorio de Despliegue de Crosslink en GitHub](https://github.com/ShieldedLabs/crosslink-deployment).

---

#### **Recursos adicionales**
- Perspectivas de la comunidad: [Foro de la Comunidad Zcash - Debates sobre Crosslink](https://forum.zcashcommunity.com)
- Actualizaciones oficiales: [Blog de Electric Coin Company](https://electriccoin.co)
- Enfoque en sostenibilidad: [Por qué el PoS híbrido es importante para Zcash](https://forum.zcashcommunity.com)

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

Este mecanismo de consenso dual refuerza el compromiso de Zcash con la privacidad, la sostenibilidad y la descentralización, posicionándolo como un líder con visión de futuro en el espacio blockchain.
