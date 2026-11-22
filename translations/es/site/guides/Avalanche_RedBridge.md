# Zcash Avalanche RedBridge

El Zcash Avalanche RedBridge es un puente [bridge] descentralizado [decentralized] que permite la interoperabilidad entre las blockchains Zcash (ZEC) y Avalanche (AVAX). Este puente está diseñado para facilitar la transferencia fluida de ZEC a la blockchain de Avalanche, aprovechando el alto rendimiento, las bajas tarifas [fees] y los mecanismos de consenso ecológicos de Avalanche, al tiempo que preserva las características centradas en la privacidad [privacy] de Zcash.

RedBridge admite una amplia variedad de casos de uso [use cases], incluidas las finanzas descentralizadas cross-chain (DeFi), las transacciones [transactions] privadas y el intercambio de liquidez, proporcionando a los titulares de Zcash mayor accesibilidad al ecosistema de Avalanche. Este puente funciona mediante un conjunto de nodos [nodes] descentralizados y un oráculo, conocido como **ZavaX**, que garantiza una transferencia de datos y una verificación de precios fiables entre Zcash y Avalanche.

### Características principales

Interoperabilidad que preserva la privacidad: Permite a los usuarios de Zcash mantener la privacidad mientras utilizan aplicaciones DeFi en Avalanche.
Oráculo descentralizado ZavaX: Integra un sistema de oráculo para garantizar datos precisos de precios de ZEC/AVAX, permitiendo operaciones cross-chain sin confianza.
Escalable y ecológico: Utiliza el modelo de consenso de Avalanche, proporcionando transacciones de alta velocidad con un impacto ambiental mínimo.
Soporte para DeFi y DApps: Los titulares de Zcash ahora pueden participar en diversas plataformas DeFi en Avalanche sin comprometer la privacidad.

### Componentes técnicos

**ZavaX Oracle descentralizado**
Descripción: El ZavaX Oracle es crucial para el puente, ya que proporciona fuentes de precios cross-chain y permite conversiones sin confianza de ZEC a AVAX.
[Enlace al oráculo](https://zavax-oracle.red.dev)

**Contrato de puente cross-chain**
Descripción: La arquitectura de contratos inteligentes [smart contract] que respalda el puente Avalanche Zcash, gestionando depósitos, conversiones y retiros de ZEC.

**Integración de la capa de privacidad**
Descripción: Garantiza que las características de privacidad de Zcash se preserven durante todo el proceso de conexión mediante el puente, permitiendo transacciones cross-chain privadas.

## Entregables y documentación

**Puente de subred Elastic Zcash en Avalanche**: [Propuesta de subvención](https://forum.zcashcommunity.com/t/zcash-elastic-subnet-bridge-on-avalanche/44220)
A continuación se presentan los principales entregables y recursos técnicos completados para el proyecto Zcash Avalanche RedBridge:

Entregable 1.1: PoC preliminar que admite consultar transacciones de la testnet Zcash desde una subred de Avalanche en testnet mediante una CLI, publicado en GitHub y con una subred de un nodo en la testnet de Avalanche. https://github.com/red-dev-inc/redbridge-oracle

Entregable 2.1: [Arquitectura](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)


### Hito 3, 31 de marzo de 2024

El entregable 3.1 está completo y presenta nuestro análisis sobre la adopción de FROST en lugar de BLS para firmas [signatures] de umbral en el puente ZavaX. Este cambio aprovecha bibliotecas auditadas de Zcash Foundation y facilita una mejor integración y seguridad. https://github.com/ZcashFoundation/frost

El entregable 3.2, diseño de UX y UI para la GUI, está completado y detalla nuestras mejoras de seguridad para la subred ZavaX Oracle, respaldadas por resultados de pruebas de penetración. Para obtener más detalles, incluida la configuración del servidor y los resultados de las pruebas, [Evaluación de seguridad](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/deployment-notes.md)
[Informe de auditoría](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/pen-testing-report-2024-09.md)
Además, el equipo cambió la marca de ZavaX a redbridge y modificó su token de staking de ZAX a RBR.

### Hito 4, 30 de abril de 2024
Entregable 4.1: Implementación totalmente funcional en las testnets de Zcash y Avalanche, con una subred de 3 validadores y soporte de CLI

### Hito 5, 31 de mayo de 2024
Entregable 5.1: GUI: integración del puente en Core o Webapp

Hito 6, 30 de junio de 2024
Entregable 6.1: Superación satisfactoria de la auditoría de software
Entregable 6.2: Publicación del código fuente auditado en un repositorio público de GitHub

Echa un vistazo al repositorio [GitHub](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)
  
Para obtener más detalles técnicos, se recomienda a los usuarios revisar el repositorio y la documentación del proyecto RedBridge para [explorar](https://github.com/red-dev-inc/red-bridge) los aspectos específicos de la integración [integration specifics], los marcos de pruebas [testing frameworks] y los protocolos de seguridad [security protocols].


![img1](/content-images/b8c5d267-1711-458a-8a32-1df9d56fae8a-a93ff66932.webp)


* Entregables: 
En el primer trimestre de 2025, el equipo anunció el lanzamiento del [red·bridge sitio web de demostración](https://redbridge-demo.red.dev/index.html), donde cualquier persona puede probar la experiencia de usuario, dar comentarios y sugerir mejoras. También sirve como una forma sencilla de presentar el proyecto a personas no técnicas.

* El equipo utilizó Zebra para la versión final de red·bridge. Para probarlo, actualizaron dos de los tres nodos de su blockchain de prueba, ZavaX Oracle, que se ejecuta en la testnet Fuji de Avalanche. El último nodo se actualizó correctamente, y ahora [ZavaX Oracle](https://web.archive.org/web/20260823181644/https://zavax-oracle.red.dev/) se ejecuta en Zebra.

* En el primer trimestre de 2025, el sitio web red.bridge fue programado para ofrecer cuatro vistas: roja, Dark, Light y Zebra, a diferencia de la versión inicial, que era roja.

* Otro punto es que el equipo activará la L1 red·bridge en vivo en la mainnet de Avalanche en diciembre de 2025. Inicialmente, servirá como oráculo para la blockchain Zcash y, poco después, también para Bitcoin. Cada solicitud costará 0,001 AVAX en token de gas. Esta implementación permitirá que cualquier L1 o contrato inteligente en Avalanche consulte de manera económica datos de Zcash y Bitcoin de forma descentralizada.

* En el segundo trimestre, el equipo presentó el hito ACP-77 (conocido como Avalanche9000) ante la Avalanche Foundation para hacer que operar un guardián de red.bridge fuera más temprano y asequible para todos. Inicialmente, los validadores debían hacer staking de alrededor de 2000 AVAX; sin embargo, con los costes de Avalanche9000, los validadores solo necesitaban 1 AVAX al mes. Además, este hito también finaliza el plan de utilizar la implementación FROST de ZF, que proporciona a cada Guardián una participación de firma para el control seguro y distribuido de la billetera del puente.

* En el primer y segundo trimestre de 2026, red.bridge organizaría el airdrop de su token RBR (anteriormente ZAX) para los miembros de la comunidad Zcash y Avalanche. Según el fundador de red.dev, organizarán una testnet incentivada en la que los usuarios tendrán la oportunidad de ganar RBR mientras ayudan a probar el puente.
