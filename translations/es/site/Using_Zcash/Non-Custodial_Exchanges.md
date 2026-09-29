<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Alt Text" width="50"/>   Exchanges no custodiales

[Zcash Exchanges no custodiales](/dex)

En el mundo en constante evolución del comercio de criptomonedas, los exchanges no custodiales, también conocidos como Exchanges Descentralizados o DEX, permiten a los usuarios comerciar sin entregar sus fondos a una cuenta de exchange. Conservas tus propias claves, pero eso no significa que nadie más intervenga. Dependiendo de la ruta, un swap puede pasar por un sitio web o una aplicación de wallet, un servicio de enrutamiento, contratos inteligentes, solucionadores y bridges.

Los exchanges enumerados anteriormente te permiten obtener y comerciar Zcash desde tu propia wallet. El nivel de privacidad de un swap depende del servicio, de la red desde la que pagues y de si tus ZEC terminan en una dirección blindada. Las secciones siguientes explican la diferencia.

### **Comprender los exchanges no custodiales**

Los exchanges no custodiales, también conocidos como Exchanges Descentralizados (DEX), son plataformas que facilitan el comercio de criptomonedas sin exigir a los usuarios depositar sus fondos en el propio exchange. En cambio, los usuarios mantienen el control de sus claves privadas y comercian desde sus propias wallets. Los swaps entre cadenas aún dependen de otras partes para cotizar, enrutar y liquidar la operación (ver más abajo).

Esto puede mejorar la seguridad, ya que los usuarios no dependen del exchange para custodiar sus activos, lo que reduce el riesgo de hackeos o mala gestión. No hace que un swap sea privado por sí solo. Las transacciones en exchanges no custodiales suelen utilizar contratos inteligentes, que son públicos, y el servicio que uses aún puede ver tus direcciones y datos de conexión.

Una ventaja clave de los exchanges de criptomonedas no custodiales reside en el mayor control que proporcionan a los usuarios sobre sus activos. Como estos exchanges no retienen los activos, los usuarios disfrutan de propiedad y autoridad completas sobre sus monedas digitales.

### **Exchanges no custodiales frente a exchanges custodiales**

**#1 Seguridad**: Los exchanges no custodiales eliminan la necesidad de mantener fondos en una cuenta central de exchange. Los usuarios conservan el control de sus claves privadas, reduciendo el riesgo de hackeos, ataques internos y fallos de plataforma que pueden experimentar los exchanges custodiales. Los swaps entre cadenas aún pueden mantener fondos durante un breve periodo en una dirección de depósito o bridge mientras se liquida la operación.

**#2 Privacidad**: Los swaps no custodiales normalmente no necesitan una cuenta de exchange, por lo que a menudo evitas registrarte con un correo electrónico o documento de identidad. Esto no es lo mismo que anonimato. El depósito que envías en la red de origen (por ejemplo, Solana o Ethereum) es público en esa cadena, y el servicio aún puede ver tus direcciones de wallet, dirección IP y detalles del swap. La privacidad en el lado de Zcash depende de dónde terminen tus ZEC (ver más abajo).

**#3 Descentralización**: Los exchanges no custodiales se alinean más estrechamente con el espíritu descentralizado de las criptomonedas. Los usuarios tienen mayor autonomía y control sobre sus actividades de comercio, en línea con los principios más amplios de la tecnología blockchain.

En lo que respecta a los exchanges custodiales, el nivel de descentralización suele ser bastante mínimo en la mayoría de los exchanges centralizados, lo que da lugar a que el equipo o los responsables del exchange gestionen los datos o la información de los usuarios en el exchange.

**#4 Adaptabilidad a regulaciones cambiantes**: Los exchanges no custodiales suelen ser más adaptables a entornos regulatorios cambiantes. Puesto que no custodian fondos de usuarios, podrían tener menos desafíos de cumplimiento que los exchanges custodiales.

**#5 Innovación y experimentación**: Los exchanges no custodiales impulsan con frecuencia la innovación en el espacio cripto. Fomentan el desarrollo de tecnologías descentralizadas, como los creadores de mercado automatizados (AMM) y las aplicaciones de finanzas descentralizadas (DeFi).

**#6 Accesibilidad global**: Los exchanges no custodiales suelen proporcionar acceso a criptomonedas a usuarios de todo el mundo, incluidas regiones donde los obstáculos regulatorios podrían limitar la disponibilidad de servicios de exchanges custodiales.

**#7 Sin requisitos de KYC**: Muchos exchanges no custodiales no solicitan documentos de identidad por adelantado. La mayoría aún examina las direcciones de wallet frente a bases de datos de cumplimiento, y un swap puede retrasarse, bloquearse o rechazarse si se señala algo. Consulta los términos del servicio antes de depender de él.

### **Qué protege Zcash y qué no**

La privacidad de Zcash proviene de las direcciones blindadas. Cuando ZEC se mueve entre direcciones blindadas, el remitente, destinatario, importe y memo se cifran en la cadena de Zcash. Consulta [Pools blindados](/using-zcash/shielded-pools) para saber cómo funciona esto.

Un swap tiene partes que Zcash no puede ocultar:

- **La red de origen.** Los fondos que envías desde Solana, Ethereum u otra cadena pública son visibles en esa cadena, incluida tu dirección y el importe.
- **La dirección de recepción.** Algunas rutas de swap envían ZEC a una dirección transparente. Por ejemplo, Near Intents enumera ZEC como compatible únicamente con [direcciones transparentes](https://docs.near-intents.org/resources/chain-support). Los ZEC enviados a una dirección transparente (t1 o t3) son públicos, al igual que Bitcoin. Blindarlos después protege lo que hagas a continuación, pero la transferencia entrante y la transacción de blindaje siguen siendo visibles.
- **El servicio.** La aplicación y cualquier servicio de enrutamiento ven las direcciones y los importes que les proporcionas, además de datos de conexión como tu dirección IP.

Envía los ZEC a una wallet que controles y blíndalos antes de gastarlos. [Uso privado de ZEC](/guides/using-zec-privately) cubre los pasos siguientes.

### **Quién interviene en un swap**

Tomemos como ejemplo un swap enrutado mediante el servicio 1Click de Near Intents. Sus [términos de la API](https://docs.near-intents.org/security-compliance/terms-of-service) tratan estos elementos como partes separadas:

- **La interfaz**: el sitio web o la wallet que utilizas. Puede estar gestionada por Intents Technology o por un tercero con sus propios términos.
- **1Click**: un servicio de enrutamiento y liquidación gestionado por Intents Technology Limited. Envías fondos a una dirección de depósito creada para tu cotización. La documentación indica que 1Click no toma custodia, pero los términos señalan que los activos pueden mantenerse o bloquearse en infraestructura de bridges mientras una transferencia está en curso.
- **El protocolo**: los contratos inteligentes de Near Intents.
- **Solucionadores**: terceros independientes que completan la cotización.
- **Bridges**: los ZEC nativos se mueven a través del PoA Bridge, operado por Intents Technology.

Near Intents también [examina los flujos de cotizaciones integrados](https://docs.near-intents.org/security-compliance/risk-and-compliance) frente a varias bases de datos AML, e indica que la cobertura varía según el flujo y la integración. Según sus términos, un swap señalado puede retrasarse, bloquearse, congelarse o rechazarse.

### **Qué compartes durante un swap**

- La dirección de ZEC que recibe el swap y una dirección de reembolso en la red de origen.
- El activo y el importe, así como la transacción de depósito que envías, que es pública en la cadena de origen.
- Datos de conexión. Los términos de 1Click indican que Intents Technology puede recopilar metadatos de solicitudes, direcciones IP y direcciones de wallet, y la política de privacidad de near.com enumera dirección IP, ubicación e información del navegador y dispositivo.
- Todo lo que añada la aplicación, como otras direcciones de wallet conectadas. Las aplicaciones también pueden someter tu wallet a sus propios controles de cumplimiento.

### **Dónde consultar términos y soporte**

Los términos cambian, así que lee las versiones actuales antes de realizar un swap grande.

- **Comienza con la aplicación que utilizas.** Es tu principal punto de contacto. Los términos de la API de 1Click indican que Intents Technology no tiene una relación directa con los usuarios de las aplicaciones creadas sobre ella.
- **Near Intents:** los términos y la política de privacidad en near.com/terms y near.com/privacy, además de los [términos de la API de 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) y [riesgo y cumplimiento](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Seguimiento y soporte:** busca un swap en el [Explorador de Near Intents](https://explorer.near-intents.org) o pregunta en el [Near Intents Telegram](https://t.me/near_intents).
- **Reembolsos:** un swap fallido puede devolverse a la dirección de reembolso que proporcionaste, pero los términos de near.com indican que un reembolso no está garantizado. Los términos de 1Click también indican que no se consideran solicitudes de recuperación por errores de usuario inferiores a USD 300.

Ahora, exploremos algunos de los exchanges no custodiales accesibles que facilitan el comercio de Zcash. Utilizar estas plataformas te proporcionará un medio conveniente para adquirir más monedas Zcash.

### **Resumen**

Los exchanges no custodiales, o DEX, te permiten comerciar desde tu propia wallet mientras conservas el control de tus claves privadas. Esto ayuda a la seguridad, pero la privacidad depende de la ruta: la cadena de origen es pública, el servicio ve tus direcciones y datos de conexión, y tus ZEC solo son privados una vez que se encuentran en una dirección blindada.

Aunque los exchanges no custodiales ofrecen ventajas atractivas, es importante reconocer que podrían conllevar inconvenientes, como posibles problemas de liquidez y una curva de aprendizaje más pronunciada para usuarios menos experimentados.

Como con cualquier decisión financiera, los traders deben evaluar cuidadosamente sus prioridades, tolerancia al riesgo y familiaridad con la tecnología antes de elegir entre opciones de exchange no custodiales y custodiales.
