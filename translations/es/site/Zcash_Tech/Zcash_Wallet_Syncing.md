<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Sincronización de monederos Zcash

## TL;DR

* Debido a que las transacciones blindadas de Zcash ocultan sus detalles, un servidor no puede simplemente consultar el saldo de un monedero de la forma en que puede hacerlo con monedas transparentes como Bitcoin o Ethereum.
* Los monederos ligeros descargan pequeños “bloques compactos” desde un servidor especializado (`lightwalletd`) y descifran ellos mismos los datos relevantes con sus claves privadas.
* Descifrar y procesar esos bloques lleva tiempo, por lo que los monederos utilizan métodos de sincronización más rápidos para permitirte usar tus fondos antes.
* Enfoques destacados: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) y el propuesto DAGSync.
* Estos métodos, por lo general, intercambian memoria adicional o potencia de procesamiento por una sincronización más rápida.

## Explicación principal

### Cómo funciona la sincronización de Zcash

Zcash utiliza pruebas de conocimiento cero para blindar los detalles de las transacciones frente a partes no autorizadas. Esta privacidad hace que la sincronización sea más difícil para los monederos ligeros porque no almacenan toda la blockchain localmente y, en su lugar, dependen de un servidor para obtener la información necesaria. Con Bitcoin o Ethereum, los servidores pueden indexar la blockchain y devolver los datos de la cuenta rápidamente. Pero con Zcash, el servidor no puede ver los detalles de las transacciones. Entonces, ¿cómo puede un monedero ligero sincronizar su saldo e historial sin descargar y descifrar por sí mismo toda la blockchain?

Zcash resuelve este problema combinando varios enfoques. Tiene un servidor especializado, `lightwalletd`, que filtra los datos de un nodo completo y conserva solo lo necesario para la identificación de transacciones. Estos datos se llaman bloques compactos, y son mucho más pequeños que los bloques originales. Los monederos ligeros primero descargan estos bloques compactos desde el servidor `lightwalletd` y luego los descifran con sus claves privadas.

Incluso descifrar y procesar estos bloques compactos puede llevar un tiempo considerable, especialmente cuando hay muchas transacciones por bloque. Por eso los monederos usan diferentes métodos para acelerar la sincronización y permitirte usar tus fondos lo antes posible.

## Visual / Analogía

Piensa en la blockchain como una enorme sala de correo llena de cajas cerradas con llave. Con una moneda transparente, el empleado de la sala de correo puede leer las etiquetas y decirte al instante cuáles cajas son tuyas. Con Zcash, las etiquetas están ocultas, así que tu monedero tiene que tomar sus llaves y revisar silenciosamente las cajas por sí mismo para encontrar aquellas que puede abrir. Los métodos de sincronización a continuación son distintas estrategias para revisar esas cajas más rápido.

## Análisis en profundidad

### Warp Sync

Warp sync es una función de YWallet que omite los pasos intermedios de descifrar y procesar cada bloque compacto, saltando directamente al resultado final.

Para lograrlo, utiliza matemáticas y criptografía para calcular el resultado final sin pasar por cada paso.

Warp sync puede procesar miles de bloques por segundo, mucho más rápido que el método de sincronización habitual. Esto significa que los usuarios de YWallet pueden disfrutar de un rendimiento rápido y fluido, incluso con cientos de miles de transacciones y notas recibidas en sus cuentas.

Además de esta técnica de omitir pasos, YWallet puede procesar múltiples bloques simultáneamente, distribuyendo la carga entre el hardware disponible para hacer el proceso aún más rápido.

Lee más sobre [Warp Sync](https://ywallet.app/warp/)

### Spend-before-sync

Spend-before-sync es una nueva función del Zcash Mobile Wallet SDK V2 que permite a los usuarios gastar fondos instantáneamente al abrir su monedero, sin esperar a la sincronización completa del monedero. Esta función acelera el descubrimiento del saldo gastable del monedero y mejora la experiencia del usuario.

Spend-before-sync funciona utilizando un algoritmo de sincronización de bloques compactos que procesa bloques del servidor `lightwalletd` en un orden no lineal. Esto significa que, en lugar de esperar a que un bloque se procese por completo antes de continuar, los monederos pueden usar un poco más de memoria y potencia de procesamiento para escanear diferentes secciones de la blockchain. Normalmente, escanea distintos rangos, buscando transacciones más recientes mientras los bloques más antiguos se descargan y procesan. Si se descubre una nota reciente no gastada, se pondrá a disposición de inmediato.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Desarrollado por el equipo de Zecwallet, Blaze sync es un algoritmo de sincronización para monederos ligeros que escanea la blockchain hacia atrás, comenzando por el bloque más alto y más reciente, y avanzando en retroceso.

Esto permite que el monedero encuentre las notas gastadas antes que las recibidas, al mismo tiempo que pone a disposición notas previamente no gastadas sin esperar a que finalice todo el proceso de sincronización.

Además, utiliza Out-of-Order Sync desacoplando entre sí los componentes de la sincronización —descarga de bloques, realización de descifrados de prueba y actualización de testigos— y procesándolos en paralelo. Esto requiere más memoria y recursos de CPU, pero aumenta la velocidad de sincronización en X5.
### DAGSync

DAGSync es un algoritmo de sincronización propuesto que busca mejorar la experiencia de usuario de las billeteras blindadas de Zcash al acelerar la sincronización.

Utiliza un [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) para representar las dependencias entre notas, testigos y nullifiers en una billetera de Zcash.

Un DAG es una estructura de datos que consiste en nodos y aristas, donde cada arista tiene una dirección que indica una relación entre dos nodos. Un DAG no tiene ciclos, lo que significa que no hay forma de comenzar desde un nodo y seguir las aristas de regreso al mismo nodo.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## Implicaciones prácticas

Curiosamente, todos estos mecanismos buscan abordar las preguntas planteadas por Zcash Security en su publicación sobre [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) y su relación con los sistemas de pago privados. Algunos incluso dan el paso adicional de descargar todos los datos de memos desde los servidores, excepto los datos exclusivos de una dirección, aumentando la privacidad a costa de un poco más de recursos.

Además, la Zcash Foundation ha estado analizando otras alternativas para mejorar el rendimiento de las billeteras ligeras. Ese es el caso de [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), una construcción que la fundación ha estado estudiando “para determinar si ofrece una posible solución a los recientes problemas de rendimiento que han afectado a los usuarios de billeteras de Zcash”.

## Errores comunes

**Suponer que el servidor lightwalletd conoce tu saldo.** El servidor solo entrega bloques compactos; tu billetera los descifra e interpreta localmente con tus propias claves.

**Detener la sincronización demasiado pronto.** Algunos métodos hacen que los fondos gastables recientes estén disponibles antes de que se complete una sincronización total, pero el historial antiguo y las notas aún pueden seguir en proceso.

**Comparar directamente la sincronización de Zcash con la sincronización de una cadena transparente.** Un proceso más lento puede ser el costo de preservar la privacidad, no un defecto: la billetera está haciendo un trabajo que, de otro modo, un servidor de monedas públicas haría leyendo tu cuenta abiertamente.


## Páginas relacionadas

- [Nodos Lightwallet](/zcash-tech/lightwallet-nodes) — la infraestructura de lightwalletd de la que dependen las billeteras ligeras.
- [Viewing Keys](/zcash-tech/viewing-keys) — las claves que usan las billeteras para detectar y descifrar sus propias notas.
- [Pepper Sync](/zcash-tech/pepper-sync) — otro enfoque para la sincronización de billeteras de Zcash.
- [FROST](/zcash-tech/frost) — autoridad de firma distribuida para ZEC blindado.
