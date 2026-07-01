# RedBridge de Zcash Avalanche

RedBridge de Zcash Avalanche es un puente descentralizado que permite la interoperabilidad entre las blockchains de Zcash (ZEC) y Avalanche (AVAX). Este puente está diseñado para facilitar la transferencia fluida de ZEC a la blockchain de Avalanche, aprovechando el alto rendimiento, las bajas comisiones y los mecanismos de consenso ecológicos de Avalanche, al tiempo que preserva las características centradas en la privacidad de Zcash.

RedBridge admite una amplia gama de casos de uso, incluyendo finanzas descentralizadas (DeFi) entre cadenas, transacciones privadas y compartición de liquidez, empoderando a los poseedores de Zcash con una accesibilidad ampliada al ecosistema de Avalanche. Este puente opera a través de un conjunto de nodos descentralizados y un oráculo, conocido como **ZavaX**, que garantiza una transferencia de datos fiable y la verificación de precios entre Zcash y Avalanche.

### Características clave

Interoperabilidad que preserva la privacidad: Permite a los usuarios de Zcash mantener la privacidad mientras utilizan aplicaciones DeFi en Avalanche.
Oráculo descentralizado ZavaX: Integra un sistema de oráculo para garantizar datos de precios precisos de ZEC/AVAX, permitiendo operaciones entre cadenas sin confianza.
Escalable y ecológico: Utiliza el modelo de consenso de Avalanche, proporcionando transacciones de alta velocidad con un impacto ambiental mínimo.
Compatibilidad con DeFi y DApps: Los poseedores de Zcash ahora pueden participar en diversas plataformas DeFi en Avalanche sin comprometer la privacidad.

### Componentes técnicos

**Oráculo descentralizado ZavaX**
Descripción: El oráculo ZavaX es crucial para el puente, ya que proporciona fuentes de precios entre cadenas y permite conversiones de ZEC a AVAX sin confianza.
[Enlace al Oráculo](https://zavax-oracle.red.dev)

**Contrato de puente entre cadenas**
Descripción: La arquitectura de contratos inteligentes que soporta el puente Zcash Avalanche, gestionando depósitos, conversiones y retiros de ZEC.

**Integración de capa de privacidad**
Descripción: Garantiza que las funciones de privacidad de Zcash se conserven durante todo el proceso del puente, permitiendo transacciones privadas entre cadenas.

## Entregables y documentación

**Puente de subred elástica de Zcash en Avalanche**: [Propuesta de subvención](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
A continuación se presentan los principales entregables y recursos técnicos completados para el proyecto RedBridge de Zcash Avalanche:

Entregable 1.1: PoC preliminar que admite la consulta de transacciones de testnet de Zcash desde una subred de Avalanche de testnet con una CLI, publicado en Github y con una subred de un nodo en la testnet de Avalanche. https://github.com/red-dev-inc/zavax-oracle

Entregable 2.1: [Arquitectura](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### Hito 3 31 de marzo de 2024

El entregable 3.1 está completo, presentando nuestro análisis sobre la adopción de FROST en lugar de BLS para firmas umbral en el puente ZavaX. Este cambio aprovecha bibliotecas auditadas de la Zcash Foundation y facilita una mejor integración y seguridad. https://github.com/ZcashFoundation/frost

Entregable 3.2 Diseño UX y UI para la GUI completado, detallando nuestras mejoras de seguridad para la subred del oráculo ZavaX, respaldadas por resultados de pruebas de penetración. Para más detalles, incluyendo la configuración del servidor y los resultados de las pruebas [Evaluación de seguridad](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[Informe de auditoría](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
Además, el equipo cambió su marca de ZavaX a redbridge y cambió su token de staking de ZAX a RBR.

### Hito 4 30 de abril de 2024
Entregable 4.1 Despliegue totalmente funcional en las testnets de Zcash y Avalanche, con una subred de 3 validadores, con soporte CLI

### Hito 5 31 de mayo de 2024
Entregable 5.1 GUI: integración del puente en Core o Webapp

Hito 6 30 de junio de 2024
Entregable 6.1 Aprobación satisfactoria de la auditoría del software
Entregable 6.2 Publicación del código fuente auditado en un repositorio público de Github

Echa un vistazo al [repositorio de Github](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)
  
Para más detalles técnicos, se anima a los usuarios a revisar el repositorio y la documentación del proyecto RedBridge para [explorar](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/) los detalles específicos de la integración, los marcos de pruebas y los protocolos de seguridad.


![img1](https://github.com/user-attachments/assets/b8c5d267-1711-458a-8a32-1df9d56fae8a)


* Entregables: 
En el Q1 de 2025, el equipo anunció el lanzamiento del [sitio web de demostración de red·bridge](https://redbridge-demo.red.dev/index.html), donde cualquiera puede probar la experiencia de usuario, dar retroalimentación y sugerir mejoras. También sirve como una manera sencilla de presentar el proyecto a personas no técnicas.

* El equipo utilizó Zebra para la versión final de red·bridge. Para probarlo, actualizaron dos de los tres nodos de su blockchain de prueba, ZavaX Oracle, que funciona en la testnet Fuji de Avalanche. El último nodo se actualizó correctamente, ¡ahora [Zavax Oracle](https://zavax-oracle.red.dev/) funciona con ZEBRA!

* En el Q1 de 2025, el sitio web red.bridge fue programado para ofrecer cuatro vistas: red, Dark, Light y Zebra, a diferencia de la versión inicial, que era red.

* Otro punto es que el equipo activará la L1 de red·bridge en vivo en la mainnet de Avalanche en diciembre de 2025. Inicialmente, servirá como un oráculo para la blockchain de Zcash y luego, poco después, también para Bitcoin. En este contexto, cada solicitud costará 0.001 AVAX en gas token. Esta implementación permitirá que cualquier L1 o contrato inteligente en Avalanche consulte de forma económica datos de Zcash y Bitcoin de manera descentralizada.

* En el Q2, el equipo presentó un hito ACP-77 (conocido como Avalanche9000) a la Avalanche Foundation para hacer que la operación de un guardian de red.bridge sea más temprana y más asequible para todos. Inicialmente, los validadores necesitaban hacer staking de alrededor de 2000 AVAX; sin embargo, con los costos de Avalanche9000, los validadores solo necesitaban 1 AVAX (mes). Además, este hito también finaliza el plan para usar la implementación FROST de ZF, que otorga a cada Guardian una participación de firma para un control seguro y distribuido de la wallet del puente.

* Entre el Q1 y el Q2 de 2026, red.bridge alojaría el airdrop de su token RBR (anteriormente ZAX) para los miembros de las comunidades de Zcash y Avalanche. Según el fundador de red.dev, organizarán una testnet incentivada en la que los usuarios tendrán la oportunidad de ganar RBR mientras ayudan a probar el puente.
