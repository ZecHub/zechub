<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Texto alternativo" width="50"/>   Exchanges sin custodia [Non-Custodial Exchanges]

## Resumen

* Un exchange sin custodia te permite hacer swap de monedas desde tu propia billetera [wallet]. Conservas tus claves privadas y ninguna cuenta de exchange mantiene tus fondos.
* Conservar tus claves te protege de hackeos y fallos de exchanges. La privacidad [privacy] es una cuestión aparte.
* El depósito que envías desde otra red [chain], como Solana o Ethereum, es público en esa red. El servicio de swap también ve tus direcciones y datos de conexión.
* Algunas rutas de swap entregan ZEC a una dirección transparente [transparent], que es pública.
* Tu ZEC se vuelve privado una vez que está en una dirección blindada [shielded]. Blíndalo en tu propia billetera antes de gastarlo.

## Explicación principal

[Zcash Exchanges sin custodia](/dex)

En el mundo en constante evolución del trading de criptomonedas, los exchanges sin custodia, también conocidos como Exchanges Descentralizados o DEXs, permiten a los usuarios operar sin entregar sus fondos a una cuenta de exchange. Conservas tus propias claves, pero eso no significa que nadie más esté involucrado. Dependiendo de la ruta, un swap puede pasar por un sitio web o una aplicación de billetera, un servicio de enrutamiento, contratos inteligentes, solucionadores y puentes [bridges].

Los exchanges enumerados arriba te permiten obtener y operar Zcash desde tu propia billetera. El nivel de privacidad de un swap depende del servicio, de la red desde la que pagues y de si tu ZEC termina en una dirección blindada. Las secciones a continuación explican la diferencia.

### **Comprender los exchanges sin custodia**

Los exchanges sin custodia, también conocidos como Exchanges Descentralizados (DEXs), son plataformas que facilitan el trading de criptomonedas sin exigir a los usuarios que depositen sus fondos en el propio exchange. En cambio, los usuarios mantienen el control de sus claves privadas y operan desde sus propias billeteras. Los swaps cross-chain aún dependen de otras partes para cotizar, enrutar y liquidar la operación (consulta más abajo).

Esto puede mejorar la seguridad, ya que los usuarios no dependen del exchange para mantener sus activos, lo que reduce el riesgo de hackeos o mala gestión. No hace que un swap sea privado por sí solo. Las transacciones [transactions] en exchanges sin custodia suelen usar contratos inteligentes [smart contracts], que son públicos, y el servicio que utilizas aún puede ver tus direcciones y detalles de conexión.

Una ventaja clave de los exchanges de criptomonedas sin custodia reside en el mayor control que proporcionan a los usuarios sobre sus activos. Como estos exchanges no retienen los activos, los usuarios disfrutan de propiedad y autoridad completas sobre sus monedas digitales.

### **Exchanges sin custodia frente a exchanges custodios**

**#1 Seguridad**: Los exchanges sin custodia eliminan la necesidad de mantener fondos en una cuenta central de exchange. Los usuarios conservan el control de sus claves privadas, lo que reduce el riesgo de hackeos, ataques internos y fallos de plataforma que pueden experimentar los exchanges en custodia [custodial]. Los swaps cross-chain aún pueden mantener fondos durante poco tiempo en una dirección de depósito o puente mientras se liquida la operación.

**#2 Privacidad**: Los swaps sin custodia normalmente no necesitan una cuenta de exchange, por lo que a menudo evitas registrarte con un correo electrónico o identificación. Eso no es lo mismo que anonimato. El depósito que envías en la red de origen (por ejemplo, Solana o Ethereum) es público en esa red, y el servicio aún puede ver las direcciones de tu billetera, tu dirección IP y los detalles del swap. La privacidad en el lado de Zcash depende de dónde llegue tu ZEC (consulta más abajo).

**#3 Descentralización**: Los exchanges sin custodia se alinean más estrechamente con el espíritu descentralizado [decentralized] de las criptomonedas. Los usuarios tienen mayor autonomía y control sobre sus actividades de trading, en consonancia con los principios más amplios de la tecnología blockchain.

En cuanto a los Exchanges Custodios, el nivel de Descentralización suele ser bastante mínimo en la mayoría de los exchanges centralizados, que hacen que el equipo u oficiales del exchange gestionen los datos o información de los usuarios en el exchange.

**#4 Adaptabilidad a regulaciones cambiantes**: Los exchanges sin custodia suelen ser más adaptables a entornos regulatorios cambiantes. Como no mantienen fondos de usuarios, podrían tener menos desafíos de cumplimiento en comparación con los exchanges custodios.

**#5 Innovación y experimentación**: Los exchanges sin custodia impulsan con frecuencia la innovación en el espacio cripto. Fomentan el desarrollo de tecnologías descentralizadas, como los creadores de mercado automatizados (AMM) y las aplicaciones de finanzas descentralizadas (DeFi).

**#6 Accesibilidad global**: Los exchanges sin custodia suelen proporcionar acceso a criptomonedas a usuarios de todo el mundo, incluidas regiones donde los obstáculos regulatorios podrían limitar la disponibilidad de servicios de exchanges custodios.

**#7 Sin requisitos KYC**: Muchos exchanges sin custodia no solicitan documentos de identidad por adelantado. La mayoría aún examina las direcciones de billetera con bases de datos de cumplimiento, y un swap puede retrasarse, bloquearse o rechazarse si se marca algo. Revisa los términos del servicio antes de depender de él.

### **Qué protege Zcash y qué no**

La privacidad de Zcash proviene de las direcciones blindadas. Cuando ZEC se mueve entre direcciones blindadas, el remitente, destinatario, importe y memo están cifrados [encrypted] en la red de Zcash. Consulta [Pools blindados](/using-zcash/shielded-pools) para saber cómo funciona esto.

Un swap tiene partes que Zcash no puede ocultar:

- **La red de origen.** Los fondos que envías desde Solana, Ethereum u otra cadena pública son visibles en esa cadena, incluida tu dirección y el importe.
- **La dirección receptora.** Algunas rutas de swap entregan ZEC a una dirección transparente. Por ejemplo, NEAR Intents enumera ZEC como compatible solo con [direcciones transparentes](https://docs.near-intents.org/resources/chain-support). Los ZEC enviados a una dirección transparente (t1 o t3) son públicos, al igual que Bitcoin. Blindarlos después protege lo que hagas a continuación, pero la transferencia entrante y la transacción de blindaje siguen siendo visibles.
- **El servicio.** La aplicación y cualquier servicio de enrutamiento ven las direcciones e importes que les proporcionas, además de datos de conexión como tu dirección IP.

Envía los ZEC a una billetera que controles y blíndalos antes de gastarlos. [Usar ZEC de forma privada](/guides/using-zec-privately) explica los siguientes pasos.

### **Quién participa en un swap**

Toma como ejemplo un swap enrutado a través del servicio 1Click de NEAR Intents. Sus [términos de la API](https://docs.near-intents.org/security-compliance/terms-of-service) tratan estos elementos como partes separadas:

- **La interfaz**: El sitio web o la billetera que utilizas. Puede ser operada por Intents Technology o por un tercero con sus propios términos.
- **1Click**: Un servicio de enrutamiento y liquidación operado por Intents Technology Limited. Envías fondos a una dirección de depósito creada para tu cotización. La documentación dice que 1Click no toma custodia, pero los términos señalan que los activos pueden mantenerse o bloquearse en infraestructura de puentes mientras una transferencia está en curso.
- **El protocolo**: Los contratos inteligentes de NEAR Intents.
- **Solucionadores**: Terceros independientes que ejecutan la cotización.
- **Puentes**: Los movimientos nativos de ZEC pasan por el PoA Bridge, que opera Intents Technology.

NEAR Intents también [examina los flujos de cotizaciones integrados](https://docs.near-intents.org/security-compliance/risk-and-compliance) frente a varias bases de datos AML, y afirma que la cobertura varía según el flujo y la integración. Según sus términos, un swap marcado puede retrasarse, bloquearse, congelarse o rechazarse.

### **Qué compartes durante un swap**

- La dirección de ZEC que recibe el swap y una dirección de reembolso en la red de origen.
- El activo y el importe, y la transacción de depósito que envías, que es pública en la cadena de origen.
- Datos de conexión. Los términos de 1Click indican que Intents Technology puede recopilar metadatos de solicitudes, direcciones IP y direcciones de billetera, y la política de privacidad de near.com enumera información de dirección IP, ubicación, navegador y dispositivo.
- Cualquier elemento que agregue la aplicación, como otras direcciones de billetera conectadas. Las aplicaciones también pueden someter tu billetera a sus propias verificaciones de cumplimiento.

## Visual / Analogía

Un exchange custodio funciona como un banco. Abres una cuenta, dejas tu dinero en su bóveda y le pides al banco que opere por ti.

Un swap sin custodia funciona como una ventanilla de cambio de divisas en una calle concurrida. Pasas efectivo por la ventanilla, recibes una divisa diferente a cambio y nunca dejas dinero con el empleado. Las personas en la calle pueden verte acercarte y entregar tu efectivo, tal como cualquiera puede ver tu depósito en la cadena de origen. El empleado ve tu cara y el importe.

Lo que sucede después de la ventanilla depende de ti. Guarda las nuevas monedas en un sobre sellado, utiliza una dirección blindada y nadie podrá seguirlas desde allí.

## Implicaciones prácticas

### **Dónde consultar términos y soporte**

Los términos cambian, así que lee las versiones actuales antes de realizar un swap grande.

- **Empieza por la aplicación que utilizas.** Es tu principal punto de contacto. Los términos de la API de 1Click indican que Intents Technology no tiene una relación directa con los usuarios de aplicaciones creadas sobre ella.
- **NEAR Intents:** Los términos y la política de privacidad en near.com/terms y near.com/privacy, además de los [términos de la API de 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) y [riesgo y cumplimiento](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Seguimiento y soporte:** Busca un swap en el [NEAR Intents Explorador](https://explorer.near-intents.org) o pregunta en el [NEAR Intents Telegram](https://t.me/near_intents).
- **Reembolsos:** Un swap fallido puede devolverse a la dirección de reembolso que proporcionaste, pero los términos de near.com indican que un reembolso no está garantizado. Los términos de 1Click también indican que no se consideran solicitudes de recuperación por errores de usuarios inferiores a USD 300.

Ahora, exploremos algunos de los exchanges sin custodia accesibles que facilitan el trading de Zcash. Utilizar estas plataformas te proporcionará una forma conveniente de adquirir más monedas Zcash.

### **Resumen**

Los exchanges sin custodia, o DEXs, te permiten operar desde tu propia billetera mientras mantienes el control de tus claves privadas. Eso mejora la seguridad, pero la privacidad depende de la ruta: la cadena de origen es pública, el servicio ve tus direcciones y datos de conexión, y tu ZEC solo es privado una vez que está en una dirección blindada.

Aunque los exchanges sin custodia ofrecen ventajas atractivas, es importante reconocer que podrían tener inconvenientes, como posibles problemas de liquidez y una curva de aprendizaje más pronunciada para usuarios con menos experiencia.

Como ocurre con cualquier decisión financiera, los traders deben evaluar cuidadosamente sus prioridades, tolerancia al riesgo y familiaridad con la tecnología antes de elegir entre opciones de exchanges sin custodia y custodios.

## Errores comunes

- **Tratar «sin custodia» como «privado».** Conservar tus claves protege tus fondos frente al fallo de un exchange. El depósito en la cadena de origen es público y el servicio ve tus direcciones y dirección IP.
- **Dejar los ZEC intercambiados en una dirección transparente.** Si la ruta paga a una dirección t1 o t3, mueve los ZEC a una dirección blindada en tu propia billetera antes de gastarlos.
- **Omitir la comprobación de la dirección de reembolso.** Un swap fallido puede volver a la dirección de reembolso que proporcionaste, y los reembolsos no están garantizados. Revisa esa dirección antes de enviar.
- **Interpretar «sin KYC» como «sin comprobaciones».** La mayoría de los servicios examina las direcciones de billetera con bases de datos de cumplimiento, por lo que un swap marcado puede retrasarse o bloquearse.

## Páginas relacionadas

- [DEX](/using-zcash/dex): Exchanges sin custodia que admiten ZEC.
- [Swaps centralizados](/using-zcash/centralized-swaps): Servicios de swap instantáneo que funcionan sin una cuenta de exchange.
- [Exchanges custodios](/using-zcash/custodial-exchanges): Exchanges que mantienen tus fondos en una cuenta.
- [Pools blindados](/using-zcash/shielded-pools): Donde tu ZEC se vuelve privado después de un swap.
- [Direcciones unificadas](/using-zcash/unified-addresses): La dirección de `u1` que la mayoría de las billeteras te da para recibir ZEC.
- [Solana ZEC a blindado](/using-zcash/solana-zec-to-shielded): Mover ZEC desde Solana a una dirección blindada.
- [Usar ZEC de forma privada](/guides/using-zec-privately): Qué hacer con tus ZEC una vez que lleguen.
- [Quién puede ver tu pago de Zcash](/start-here/who-can-see-your-zcash-payment): Qué permanece visible en cada lado de un pago.

**Última actualización:** Octubre de 2026
