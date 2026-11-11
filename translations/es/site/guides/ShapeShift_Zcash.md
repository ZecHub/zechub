<a href="https://github.com/zechub/zechub/edit/main/site/guides/ShapeShift_Zcash.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# ShapeShift y Zcash: Trading descentralizado con privacidad primero

---

## Introducción

La privacidad [privacy] y la autocustodia [self-custody] son principios fundamentales de las criptomonedas, pero muchos usuarios aún dependen de exchanges centralizados que exigen verificación de identidad y mantienen los fondos de los usuarios. La integración entre ShapeShift y Zcash reúne una plataforma de exchange totalmente descentralizada y una de las criptomonedas que mejor preservan la privacidad, ofreciendo a los usuarios una forma de operar con ZEC sin sacrificar la privacidad ni el control de sus activos.

Este artículo explica qué es ShapeShift, cómo funciona Zcash, cómo puedes hacer swap de ZEC en ShapeShift y por qué esta alianza es importante para el futuro de las finanzas privadas y descentralizadas.

---

## ¿Qué es ShapeShift?

[ShapeShift](https://shapeshift.com/) es una plataforma de criptomonedas descentralizada y de código abierto que permite a los usuarios operar, rastrear y gestionar activos digitales en múltiples blockchains sin crear una cuenta, presentar documentos de identidad ni ceder la custodia de sus fondos.

### Breve historia

ShapeShift fue fundada originalmente en 2014 por Erik Voorhees como un exchange de criptomonedas centralizado con sede en Suiza. La plataforma se hizo popular rápidamente por su interfaz sencilla, que permitía a los usuarios hacer swap de una criptomoneda por otra sin crear una cuenta.

En 2021, ShapeShift experimentó una transformación radical. La empresa disolvió su estructura corporativa y pasó a ser una **Organización Autónoma Descentralizada (DAO)**, gobernada por los poseedores del **token FOX**. Como parte de esta transición, se distribuyeron mediante airdrop aproximadamente 340 millones de tokens FOX a más de un millón de usuarios, convirtiéndolo en uno de los mayores airdrops de la historia de las criptomonedas. Desde entonces, todas las decisiones importantes sobre la plataforma se han tomado mediante propuestas y votaciones de gobernanza comunitaria.

### Características principales

- **Sin custodia**: Los usuarios operan directamente desde sus propias billeteras [wallets]. ShapeShift nunca mantiene tus fondos.
- **No requiere KYC**: No hay verificación de identidad, creación de cuenta ni recopilación de datos personales.
- **Soporte multichain**: Acceso a más de 10.000 activos en más de 15 blockchains, incluidos Bitcoin, Ethereum, Cosmos y Zcash.
- **Agregación de DEX**: ShapeShift enruta las operaciones a través de protocolos descentralizados como THORChain, 0x y otros para encontrar las mejores tarifas.
- **Swaps cross-chain**: Haz swap de activos de forma nativa entre distintas blockchains sin usar tokens envueltos ni puentes centralizados.
- **Totalmente de código abierto**: Toda la plataforma, incluida la aplicación móvil, es de código abierto y no tiene backend propietario más allá de los datos de la blockchain.

---

## Cómo funciona Zcash

[Zcash](https://z.cash/) (ZEC) es una criptomoneda construida sobre sólidos fundamentos criptográficos que brinda a los usuarios la capacidad de realizar transacciones de forma privada. Lanzada en 2016, Zcash es un fork de Bitcoin que añade tecnología avanzada de privacidad mientras conserva el suministro fijo de Bitcoin de 21 millones de monedas y el consenso de prueba de trabajo [proof-of-work].

### Transacciones blindadas y pruebas zero-knowledge

La innovación central de Zcash es el uso de **pruebas zero-knowledge** (específicamente, una forma denominada **zk-SNARKs**). Estas pruebas criptográficas permiten a una parte demostrar a otra que una afirmación es verdadera sin revelar información alguna más allá de la validez de la propia afirmación.

En la práctica, esto significa que las transacciones de Zcash pueden estar totalmente **blindadas**: la dirección del remitente, la dirección del receptor y el importe de la transacción están cifrados en la blockchain. La red aún puede verificar que la transacción es válida (sin doble gasto, saldos correctos) sin ver jamás esos detalles.

### Tipos de transacciones

Zcash admite dos tipos de direcciones:

- **Direcciones transparentes** (direcciones t): Funcionan como las direcciones de Bitcoin, donde los detalles de las transacciones son visibles públicamente en la blockchain.
- **Direcciones blindadas** (direcciones z): Utilizan pruebas zero-knowledge para mantener privados los detalles de las transacciones.

Los usuarios pueden enviar ZEC entre direcciones transparentes y blindadas. Para obtener la máxima privacidad, las transacciones de una dirección blindada a otra no revelan información públicamente.

### Direcciones unificadas

Las billeteras modernas de Zcash, como [Zodl](https://zodl.com), utilizan **direcciones unificadas**, que combinan receptores transparentes y blindados en una única dirección. Esto simplifica la experiencia del usuario y utiliza por defecto el mayor nivel de privacidad disponible.

### Por qué importa la privacidad

La privacidad financiera no consiste en ocultar malas acciones. Protege a las personas frente a la vigilancia, la recolección corporativa de datos y los ataques dirigidos. Al igual que no querrías que el saldo de tu cuenta bancaria fuera visible para el público, las transacciones de criptomonedas merecen el mismo nivel de confidencialidad. Zcash ofrece esto por diseño.

---

## Cómo hacer swap de ZEC en ShapeShift

La plataforma ShapeShift permite a los usuarios adquirir y operar con ZEC mediante un proceso totalmente descentralizado. Así es como funciona.

### Paso 1: Visita ShapeShift

Ve a [app.shapeshift.com](https://app.shapeshift.com/) en tu navegador web o descarga la aplicación móvil de ShapeShift. No se requiere crear una cuenta ni verificar la identidad.

### Paso 2: Conecta tu billetera

Conecta una billetera compatible de autocustodia. ShapeShift admite varias billeteras, entre ellas:

- **KeepKey** (hardware wallet)
- **MetaMask**
- **XDEFI / Ctrl Wallet**
- **Keplr** (para activos basados en Cosmos)
- **Billeteras compatibles con WalletConnect**

Dado que harás swap hacia o desde ZEC, asegúrate de tener lista una billetera compatible con Zcash (como Zodl) para recibir tus fondos.

### Paso 3: Selecciona tu par de swap

Usa la interfaz de swap para seleccionar el activo desde el que deseas operar (por ejemplo, BTC, ETH o un token ERC-20) y establece ZEC como activo de destino. La interfaz de ShapeShift está diseñada con un diseño limpio estilo Uniswap, optimizado tanto para ordenadores de escritorio como para dispositivos móviles.

### Paso 4: Introduce el importe y revisa

Introduce el importe que deseas intercambiar. ShapeShift enrutará la operación a través del mejor protocolo descentralizado disponible (como THORChain para swaps cross-chain) y mostrará la tarifa estimada, las comisiones y el importe de salida.

### Paso 5: Confirma y ejecuta

Revisa los detalles de la transacción y confirma. El swap se ejecuta on-chain a través de protocolos descentralizados. Tus ZEC se enviarán a la dirección que especificaste. Ningún intermediario mantiene jamás tus fondos.

### Paso 6: Blinda tus ZEC

Cuando lleguen tus ZEC, utiliza la función **blindar** de tu billetera Zcash (disponible en billeteras como Zodl) para mover los fondos al pool blindado. Esto garantiza que tu saldo y tus futuras transacciones permanezcan totalmente privados.

### Pares cross-chain compatibles

ShapeShift permite swaps de ZEC en múltiples ecosistemas de blockchain, entre ellos:

- **Bitcoin** (BTC) &lt;-&gt; ZEC
- **Ethereum** (ETH) &lt;-&gt; ZEC
- Activos de **Arbitrum** &lt;-&gt; ZEC
- Tokens del ecosistema **Cosmos** &lt;-&gt; ZEC

---

## Por qué importa esta integración

### Recuperar la privacidad en DeFi

La mayoría de los exchanges descentralizados tratan la privacidad como algo secundario. Las transacciones en DEX basados en Ethereum, por ejemplo, son totalmente transparentes: cualquiera puede rastrear el historial de tu billetera, los saldos de tokens y los patrones de trading. La integración ShapeShift-Zcash desafía esta norma al proporcionar acceso a ZEC blindado mediante una plataforma descentralizada sin KYC.

Como afirmó Houston Morgan, responsable del flujo de trabajo de crecimiento y comunidad de ShapeShift: *«La privacidad no debería dar miedo, pero operar con ZEC en exchanges centralizados a menudo sí. Su propia estructura y riesgo legal acaban con la verdadera privacidad».*

### Del deslistado a la opción predeterminada

La historia hace que esta integración sea aún más significativa. En 2020, cuando ShapeShift todavía era una empresa centralizada, **deslistó las monedas de privacidad**, incluido Zcash, debido a la presión regulatoria. La transición a una estructura DAO liberó a ShapeShift de esas restricciones. Ahora, como protocolo gobernado por la comunidad, ShapeShift no solo ha vuelto a listar Zcash, sino que lo ha convertido en una parte central de su estrategia de privacidad.

Con el lanzamiento de **ShapeShift v4.0** en diciembre de 2025, Zcash se convirtió en el **activo principal de pago y enrutamiento que preserva la privacidad** de la plataforma. La privacidad se posiciona ahora como una característica predeterminada, no como un complemento opcional, con ZEC integrado directamente en la billetera y la infraestructura de enrutamiento de ShapeShift.

### Apoyo de Zcash Community Grants

El programa [Zcash Community Grants](https://zcashcommunitygrants.org/) asignó **50.000 $** para respaldar la infraestructura técnica y los esfuerzos de marketing de ShapeShift para la integración de Zcash. Esta financiación ayudó al equipo de ShapeShift a asociarse con **Liquify**, un proveedor de infraestructura de Web3 que admite más de 90 blockchains, para gestionar puntos finales de llamada a procedimiento remoto (RPC) que permiten una ejecución más rápida y una mayor fiabilidad de la red.

### Impulsar las finanzas descentralizadas

Esta integración demuestra que la privacidad y la descentralización pueden funcionar juntas en DeFi. Los usuarios pueden:

- **Hacer swap** de activos entre cadenas sin intermediarios centralizados
- **Mantener la autocustodia total** de sus fondos durante todo el proceso
- **Acceder a ZEC blindado** sin KYC ni recopilación de datos
- **Participar en la gobernanza** mediante el token FOX para dar forma al futuro de la plataforma

A medida que los entornos regulatorios se endurecen en todo el mundo, con regiones como la UE explorando restricciones sobre las tecnologías que preservan la privacidad, plataformas como ShapeShift proporcionan una importante infraestructura alternativa para la privacidad financiera.

---

## Resumen

| Característica | Detalles |
|---|---|
| **Plataforma** | ShapeShift DAO (descentralizada, de código abierto) |
| **Gobernanza** | Poseedores del token FOX |
| **Soporte de Zcash** | Trading completo de ZEC con soporte para transacciones blindadas |
| **KYC requerido** | No |
| **Custodia** | Sin custodia (los usuarios conservan sus propias claves) |
| **Swaps cross-chain** | BTC, ETH, Arbitrum, Cosmos y más |
| **Infraestructura** | Impulsada por Liquify (soporte RPC para más de 90 blockchains) |
| **Financiación de Zcash Community Grants** | 50.000 $ para soporte técnico y de marketing |

La integración de ShapeShift y Zcash representa un avance significativo para la privacidad en las finanzas descentralizadas. Al combinar la infraestructura de trading multichain y sin custodia de ShapeShift con la tecnología de pruebas zero-knowledge de Zcash, los usuarios obtienen acceso a un trading de criptomonedas realmente privado y sin permisos. Para cualquiera que valore la privacidad financiera y la autosoberanía, esta integración proporciona una vía práctica y accesible para utilizar ZEC sin concesiones.

---

### Recursos

[ShapeShift Plataforma](https://shapeshift.com/)

[Zcash Sitio web oficial](https://z.cash/)

[Zodl Billetera](https://zodl.com)

[ShapeShift Gobernanza DAO (token FOX)](https://web.archive.org/web/20210126180411/https://shapeshift.com/fox-token)

[Zcash Community Grants](https://zcashcommunitygrants.org/)

[ShapeShift integra Zcash para reforzar la privacidad onchain (crypto.news)](https://crypto.news/shapeshift-integrates-zcash-to-enable-true-onchain-privacy/)

[ShapeShift presenta v4.0 y vuelve a centrar la privacidad y la autocustodia en DeFi (Invezz)](https://invezz.com/news/2025/12/18/shapeshift-unveils-version-4-0-re-centering-privacy-and-self-custody-in-defi/)

[ShapeShift lanza soporte para transacciones blindadas de Zcash (Cointelegraph)](https://cointelegraph.com/news/shapeshift-rolls-out-support-for-shielded-zcash-transactions-for-true-privacy)
