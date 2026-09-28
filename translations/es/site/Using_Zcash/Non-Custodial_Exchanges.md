<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Alt Text" width="50"/>   Exchanges sin custodia

[Zcash Exchanges sin custodia](/dex)

En el mundo en constante evolución del comercio de criptomonedas, los exchanges sin custodia, también conocidos como Exchanges Descentralizados o DEX, permiten a los usuarios operar sin entregar sus fondos a una cuenta de exchange. Conservas tus propias claves, pero eso no significa que nadie más participe. Dependiendo de la ruta, un intercambio puede pasar por un sitio web o una aplicación de wallet, un servicio de enrutamiento, contratos inteligentes, solucionadores y bridges.

Los exchanges enumerados arriba te permiten obtener e intercambiar Zcash desde tu propia wallet. El nivel de privacidad de un intercambio depende del servicio, de la red desde la que pagas y de si tu ZEC termina en una dirección blindada. Las secciones siguientes explican la diferencia.

### **Comprender los exchanges sin custodia**

Los exchanges sin custodia, también conocidos como Exchanges Descentralizados (DEX), son plataformas que facilitan el comercio de criptomonedas sin exigir a los usuarios depositar sus fondos en el propio exchange. En su lugar, los usuarios mantienen el control de sus claves privadas y operan desde sus propias wallets. Los intercambios entre cadenas aún dependen de otras partes para cotizar, enrutar y liquidar la operación (ver abajo).

Esto puede mejorar la seguridad, ya que los usuarios no dependen del exchange para custodiar sus activos, lo cual reduce el riesgo de hackeos o mala gestión. No hace que un intercambio sea privado por sí solo. Las transacciones en exchanges sin custodia suelen usar contratos inteligentes, que son públicos, y el servicio que utilizas aún puede ver tus direcciones y detalles de conexión.

Una ventaja clave de los exchanges de criptomonedas sin custodia radica en el mayor control que proporcionan a los usuarios sobre sus activos. Como estos exchanges no retienen los activos, los usuarios disfrutan de propiedad y autoridad completas sobre sus monedas digitales.

### **Exchanges sin custodia frente a exchanges con custodia**

**#1 Seguridad**: Los exchanges sin custodia eliminan la necesidad de mantener fondos en una cuenta centralizada de exchange. Los usuarios conservan el control de sus claves privadas, reduciendo el riesgo de hackeos, ataques internos y fallos de plataforma que pueden experimentar los exchanges con custodia. Los intercambios entre cadenas aún pueden retener fondos durante poco tiempo en una dirección de depósito o bridge mientras se liquida la operación.

**#2 Privacidad**: Los intercambios sin custodia normalmente no necesitan una cuenta de exchange, por lo que a menudo evitas registrarte con un correo electrónico o identificación. Eso no es lo mismo que anonimato. El depósito que envías en la red de origen (por ejemplo, Solana o Ethereum) es público en esa cadena, y el servicio aún puede ver las direcciones de tu wallet, tu dirección IP y los detalles del intercambio. La privacidad en el lado de Zcash depende de dónde llegue tu ZEC (ver abajo).

**#3 Descentralización**: Los exchanges sin custodia se alinean más estrechamente con el espíritu descentralizado de las criptomonedas. Los usuarios tienen mayor autonomía y control sobre sus actividades de comercio, en consonancia con los principios más amplios de la tecnología blockchain.

En los exchanges con custodia, el nivel de descentralización suele ser bastante mínimo en la mayoría de los exchanges centralizados, lo que da lugar a que el equipo o los responsables del exchange administren los datos o la información de los usuarios en el exchange.

**#4 Adaptabilidad a regulaciones cambiantes**: Los exchanges sin custodia suelen ser más adaptables a entornos regulatorios cambiantes. Puesto que no retienen fondos de los usuarios, podrían enfrentar menos retos de cumplimiento en comparación con los exchanges con custodia.

**#5 Innovación y experimentación**: Los exchanges sin custodia impulsan con frecuencia la innovación en el espacio cripto. Fomentan el desarrollo de tecnologías descentralizadas, como los creadores de mercado automatizados (AMM) y las aplicaciones de finanzas descentralizadas (DeFi).

**#6 Accesibilidad global**: Los exchanges sin custodia a menudo proporcionan acceso a criptomonedas a usuarios de todo el mundo, incluidas regiones donde los obstáculos regulatorios podrían limitar la disponibilidad de servicios de exchanges con custodia.

**#7 Sin requisitos KYC**: Muchos exchanges sin custodia no solicitan documentos de identidad de entrada. La mayoría aún revisa las direcciones de wallet frente a bases de datos de cumplimiento, y un intercambio puede retrasarse, bloquearse o rechazarse si se detecta algo. Revisa los términos del servicio antes de depender de él.

### **Qué protege Zcash y qué no**

La privacidad de Zcash proviene de las direcciones blindadas. Cuando ZEC se mueve entre direcciones blindadas, el remitente, el destinatario, el importe y la nota se cifran en la cadena de Zcash. Consulta [Pools blindados](/using-zcash/shielded-pools) para saber cómo funciona.

Un intercambio tiene partes que Zcash no puede ocultar:

- **La red de origen.** Los fondos que envías desde Solana, Ethereum u otra cadena pública son visibles en esa cadena, incluida tu dirección y el importe.
- **La dirección receptora.** Algunas rutas de intercambio entregan ZEC a una dirección transparente. Por ejemplo, Near Intents enumera ZEC como compatible únicamente con [direcciones transparentes](https://docs.near-intents.org/resources/chain-support). El ZEC enviado a una dirección transparente (t1 o t3) es público, al igual que Bitcoin. Blindarlo después protege lo que hagas a continuación, pero la transferencia entrante y la transacción de blindaje siguen siendo visibles.
- **El servicio.** La aplicación y cualquier servicio de enrutamiento ven las direcciones y los importes que les proporcionas, además de datos de conexión como tu dirección IP.

Envía el ZEC a una wallet que controles y blíndalo antes de gastarlo. [Usar ZEC de forma privada](/guides/using-zec-privately) explica los siguientes pasos.

### **Quién participa en un intercambio**

Tomemos como ejemplo un intercambio enrutado mediante el servicio 1Click de Near Intents. Sus [términos de la API](https://docs.near-intents.org/security-compliance/terms-of-service) tratan estos elementos como partes separadas:

- **La interfaz**: el sitio web o la wallet que utilizas. Puede estar gestionada por Intents Technology o por un tercero con sus propios términos.
- **1Click**: un servicio de enrutamiento y liquidación gestionado por Intents Technology Limited. Envías fondos a una dirección de depósito creada para tu cotización. La documentación indica que 1Click no toma custodia, pero los términos señalan que los activos pueden mantenerse o bloquearse en infraestructura de bridge mientras una transferencia está en curso.
- **El protocolo**: los contratos inteligentes de Near Intents.
- **Solucionadores**: terceros independientes que completan la cotización.
- **Bridges**: ZEC nativo se mueve mediante el PoA Bridge, que opera Intents Technology.

Near Intents también [revisa los flujos de cotización integrados](https://docs.near-intents.org/security-compliance/risk-and-compliance) frente a varias bases de datos AML, e indica que la cobertura varía según el flujo y la integración. Según sus términos, un intercambio marcado puede retrasarse, bloquearse, congelarse o rechazarse.

### **Qué compartes durante un intercambio**

- La dirección de ZEC que recibe el intercambio y una dirección de reembolso en la red de origen.
- El activo y el importe, y la transacción de depósito que envías, que es pública en la cadena de origen.
- Datos de conexión. Los términos de 1Click indican que Intents Technology puede recopilar metadatos de solicitudes, direcciones IP y direcciones de wallet, y la política de privacidad de near.com enumera la dirección IP, la ubicación y la información del navegador y dispositivo.
- Cualquier elemento que la aplicación añada, como otras direcciones de wallet conectadas. Las aplicaciones también pueden someter tu wallet a sus propias verificaciones de cumplimiento.

### **Dónde consultar los términos y el soporte**

Los términos cambian, así que lee las versiones actuales antes de realizar un intercambio importante.

- **Empieza por la aplicación que utilizas.** Es tu principal punto de contacto. Los términos de la API de 1Click indican que Intents Technology no tiene una relación directa con los usuarios de las aplicaciones creadas sobre ella.
- **Near Intents:** los términos y la política de privacidad en near.com/terms y near.com/privacy, además de los [términos de la API de 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) y [riesgo y cumplimiento](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Seguimiento y soporte:** busca un intercambio en el [Explorador de Near Intents](https://explorer.near-intents.org) o pregunta en el [Near Intents Telegram](https://t.me/near_intents).
- **Reembolsos:** un intercambio fallido puede devolverse a la dirección de reembolso que proporcionaste, pero los términos de near.com indican que un reembolso no está garantizado. Los términos de 1Click también indican que no se consideran solicitudes de recuperación por errores de usuario inferiores a USD 300.

Ahora, exploremos algunos de los exchanges sin custodia accesibles que facilitan el comercio de Zcash. Utilizar estas plataformas te proporcionará una forma conveniente de adquirir más monedas Zcash.

### **Resumen**

Los exchanges sin custodia, o DEX, te permiten operar desde tu propia wallet mientras mantienes el control de tus claves privadas. Esto ayuda a la seguridad, pero la privacidad depende de la ruta: la cadena de origen es pública, el servicio ve tus direcciones y datos de conexión, y tu ZEC solo es privado una vez que se encuentra en una dirección blindada.

Aunque los exchanges sin custodia ofrecen ventajas convincentes, es importante reconocer que podrían conllevar inconvenientes, como posibles problemas de liquidez y una curva de aprendizaje más pronunciada para los usuarios menos experimentados.

Como con cualquier decisión financiera, los traders deben evaluar cuidadosamente sus prioridades, tolerancia al riesgo y familiaridad con la tecnología antes de elegir entre opciones de exchanges sin custodia y con custodia.
