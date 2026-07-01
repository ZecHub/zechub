<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Sincronización de billeteras Zcash

### Cómo funciona la sincronización de Zcash

Para entender cómo funciona warp sync, permíteme explicar un poco más sobre Zcash. Es una criptomoneda orientada a la privacidad que utiliza una tecnología llamada pruebas de conocimiento cero para proteger los detalles de las transacciones frente a cualquier persona que no esté autorizada a verlos. Esto significa que las transacciones registradas en la blockchain están cifradas u ocultas, y solo el remitente y el receptor pueden descifrarlas con sus claves privadas.

Sin embargo, esto también plantea un desafío para las billeteras ligeras, que son aplicaciones que no almacenan todos los datos de la blockchain en el dispositivo, sino que dependen de un servidor para proporcionarles la información necesaria. Con monedas sin privacidad, como Bitcoin o Ethereum, el servidor puede indexar fácilmente la blockchain y mantener una base de datos de cada cuenta. Cuando una billetera ligera solicita los datos específicos de su cuenta, el servidor puede devolverlos rápidamente.

Pero con Zcash, el servidor no puede hacer eso, porque no puede ver los detalles de las transacciones. Entonces, ¿cómo puede una billetera ligera sincronizar el saldo de su cuenta y el historial de transacciones sin descargar y descifrar por sí misma todos los datos de la blockchain?

Zcash resuelve este problema utilizando un enfoque mixto. Tiene un servidor especializado llamado lightwalletd que filtra los datos de un nodo completo y conserva solo los datos necesarios para la identificación de transacciones. Estos datos se llaman compact blocks, y son mucho más pequeños que los bloques originales. Las billeteras ligeras solo tienen que descargar estos compact blocks desde el servidor lightwalletd, y luego descifrarlos ellas mismas con sus claves privadas.

Sin embargo, incluso descifrar y procesar estos compact blocks puede llevar una cantidad significativa de tiempo, especialmente si hay muchas transacciones en cada bloque. Por eso, cada billetera tiene su propio método alternativo para acelerar el proceso de sincronización y permitirte usar tus fondos lo antes posible.

### Warp Sync
Warp sync es una función de YWallet que le permite omitir los pasos intermedios de descifrar y procesar cada compact block, y en su lugar saltar directamente al resultado final.

Para hacerlo utiliza matemáticas y criptografía ingeniosas para calcular el resultado final sin tener que pasar por cada paso. 

Warp sync puede procesar miles de bloques por segundo, mucho más rápido que el método de sincronización habitual. Esto significa que los usuarios de YWallet pueden disfrutar de un rendimiento rápido y fluido, incluso con cientos de miles de transacciones y notas recibidas en sus cuentas.

Además de esta técnica de **omisión de pasos**, YWallet también es capaz de procesar varios bloques al mismo tiempo, distribuyendo la carga en el hardware disponible y haciendo que el proceso sea todavía más rápido.

Lee más sobre [Warp Sync](https://ywallet.app/warp/)

### Spend-before-sync
Spend-before-sync es una nueva función implementada en Zcash Mobile Wallet SDK V2, que permite a los usuarios gastar fondos instantáneamente al abrir su billetera, sin tener que esperar a una sincronización completa de la billetera. Esta función acelera el descubrimiento del saldo gastable de la billetera y mejora la experiencia del usuario.

Spend-before-sync funciona utilizando un algoritmo de sincronización de compact blocks que procesa bloques del servidor lightwalletd en un orden no lineal; esto significa que, en lugar de esperar a que un bloque sea procesado antes de pasar al otro, las billeteras ahora pueden usar un poco más de memoria y potencia de procesamiento para escanear diferentes secciones de la blockchain. Normalmente escaneará en distintos rangos, buscando transacciones más nuevas al mismo tiempo que se descargan y procesan los bloques más antiguos. Si se descubre una nota reciente no gastada, se pondrá a disposición inmediatamente.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync
Desarrollado por el equipo de Zecwallet, Blaze sync es un algoritmo de sincronización para billeteras ligeras que comienza a escanear la blockchain "hacia atrás", empezando desde el bloque más alto y más reciente, y retrocediendo desde allí.

Esto permite que la billetera encuentre notas gastadas antes que las recibidas, mientras pone a disposición las que ya no están gastadas, sin esperar a que termine el proceso completo de sincronización.

Además de eso, utiliza Out of Order Sync, desacoplando "los componentes de la sincronización entre sí: descarga de bloques, descifrados de prueba, actualización de testigos", y procesándolos en paralelo, consumiendo algo más de memoria y recursos de CPU, pero aumentando la velocidad de sincronización X5.

### DAGSync

DAGSync es un algoritmo de sincronización propuesto que busca mejorar la experiencia de usuario de las billeteras blindadas de Zcash, haciendo que la sincronización sea más rápida.

Se basa en [la idea de usar un Directed Acyclic Graph](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) (DAG) para representar las dependencias entre notas, testigos y nullifiers en una billetera Zcash. 

Un DAG es una estructura de datos que consiste en nodos y aristas, donde cada arista tiene una dirección que indica una relación entre dos nodos. Un DAG no tiene ciclos, lo que significa que no hay forma de comenzar desde un nodo y seguir las aristas de vuelta al mismo nodo.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

---

Curiosamente, todos estos mecanismos intentan resolver las cuestiones planteadas por Zcash Security en su publicación sobre [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) y su relación con los sistemas de pago privados, algunos incluso dando el paso adicional de descargar todos los datos de memo desde los servidores, excepto aquellos exclusivos de una dirección, aumentando la privacidad a costa de un poco más de recursos.

Además, la Zcash Foundation ha estado analizando otras alternativas para mejorar el rendimiento de las billeteras ligeras. Ese es el caso de [Oblivious Message Retrieval (OMR](https://zfnd.org/oblivious-message-retrieval/)), una construcción que la fundación ha estado estudiando "para determinar si ofrece una posible solución a los recientes problemas de rendimiento que han afectado a los usuarios de billeteras Zcash"
