<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Sincronización de billeteras [Wallet Syncing]

## TL;DR

* Debido a que las transacciones blindadas [shielded] de Zcash ocultan sus detalles, un servidor no puede simplemente consultar el saldo de una billetera como puede hacerlo con monedas transparentes [transparent] como Bitcoin o Ethereum.
* Las billeteras ligeras descargan pequeños «bloques compactos» [compact blocks] de un servidor especializado (lightwalletd) y descifran por sí mismas los datos pertinentes con sus claves privadas.
* Descifrar y procesar esos bloques lleva tiempo, por lo que las billeteras usan métodos de sincronización más rápidos para permitirte usar tus fondos antes.
* Enfoques destacados: Warp Sync (YWallet), gasto antes de la sincronización [Spend-before-sync] (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) y el DAGSync propuesto.
* Estos métodos generalmente intercambian memoria adicional o capacidad de procesamiento por una sincronización más rápida.

## Explicación principal

### Cómo funciona la sincronización de Zcash

Zcash usa pruebas zero-knowledge [proofs] para proteger los detalles de las transacciones frente a partes no autorizadas. Esta privacidad [privacy] dificulta la sincronización de las billeteras ligeras porque no almacenan toda la blockchain localmente y, en su lugar, dependen de un servidor para obtener la información necesaria. Con Bitcoin o Ethereum, los servidores pueden indexar la blockchain y devolver rápidamente los datos de la cuenta. Pero con Zcash, el servidor no puede ver los detalles de las transacciones. Entonces, ¿cómo puede una billetera ligera sincronizar su saldo e historial sin descargar y descifrar por sí misma toda la blockchain?

Zcash resuelve este problema combinando varios enfoques. Cuenta con un servidor especializado, lightwalletd, que filtra los datos de un nodo completo [full node] y conserva solo lo necesario para identificar transacciones. Estos datos se denominan bloques compactos y son mucho más pequeños que los bloques originales. Las billeteras ligeras primero descargan estos bloques compactos del servidor lightwalletd y luego los descifran con sus claves privadas.

Incluso descifrar y procesar estos bloques compactos puede llevar un tiempo considerable, especialmente cuando hay muchas transacciones por bloque. Por ello, las billeteras usan distintos métodos para acelerar la sincronización y permitirte usar tus fondos lo antes posible.

## Visual / Analogía

Imagina la blockchain como una enorme sala de correo llena de cajas cerradas. Con una moneda transparente, el empleado de la sala de correo puede leer las etiquetas y decirte al instante qué cajas son tuyas. Con Zcash, las etiquetas están ocultas — por lo que tu billetera debe tomar sus claves y revisar discretamente las cajas por sí misma para encontrar las que puede abrir. Los métodos de sincronización siguientes son distintas estrategias para revisar esas cajas más rápido.

## Análisis detallado

### Warp Sync

Warp sync es una función de YWallet que omite los pasos intermedios de descifrar y procesar cada bloque compacto, saltando directamente al resultado final.

Para hacerlo, utiliza matemáticas y criptografía para calcular el resultado final sin recorrer cada paso.

Warp sync puede procesar miles de bloques por segundo, mucho más rápido que el método de sincronización habitual. Esto significa que los usuarios de YWallet pueden disfrutar de un rendimiento rápido y fluido, incluso con cientos de miles de transacciones y notas [notes] recibidas en sus cuentas.

Además de esta técnica de omisión de pasos, YWallet puede procesar varios bloques simultáneamente, distribuyendo la carga entre el hardware disponible para hacer el proceso aún más rápido.

Lee más sobre [Warp Sync](https://ywallet.app/warp/)

> Warp sync se describe aquí como una técnica de sincronización. Ywallet ya no recibe mantenimiento y no se actualizará para Ironwood, por lo que no es una billetera que se deba instalar hoy.

### Gasto antes de la sincronización

El gasto antes de la sincronización es una nueva función de Zcash Mobile Wallet SDK V2 que permite a los usuarios gastar fondos instantáneamente al abrir su billetera, sin esperar a que finalice la sincronización completa de la billetera. Esta función acelera el descubrimiento del saldo disponible para gastar de la billetera y mejora la experiencia de usuario.

El gasto antes de la sincronización funciona mediante un algoritmo de sincronización de bloques compactos que procesa bloques del servidor lightwalletd en un orden no lineal. Esto significa que, en lugar de esperar a que un bloque se procese por completo antes de continuar, las billeteras pueden usar un poco más de memoria y capacidad de procesamiento para examinar diferentes secciones de la blockchain. Por lo general, examina distintos rangos, buscando transacciones más recientes mientras se descargan y procesan los bloques más antiguos. Si se descubre una nota reciente sin gastar, estará disponible de inmediato.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Desarrollado por el equipo de Zecwallet, Blaze sync es un algoritmo de sincronización para billeteras ligeras que examina la blockchain hacia atrás, comenzando por el bloque más alto y reciente y retrocediendo.

Esto permite a la billetera encontrar notas gastadas antes que las recibidas, mientras pone a disposición notas previamente no gastadas sin esperar a que finalice el proceso completo de sincronización.

Además, utiliza Out-of-Order Sync desacoplando entre sí los componentes de la sincronización — descargar bloques, realizar descifrados de prueba y actualizar testigos — y procesándolos en paralelo. Esto requiere más recursos de memoria y CPU, pero aumenta la velocidad de sincronización en X5.

### DAGSync

DAGSync es un algoritmo de sincronización propuesto que busca mejorar la experiencia de usuario de las billeteras blindadas de Zcash al acelerar la sincronización.

Utiliza un [Grafo Acíclico Dirigido (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) para representar las dependencias entre notas, testigos y anuladores [nullifiers] en una billetera de Zcash.

Un DAG es una estructura de datos que consta de nodos [nodes] y aristas, donde cada arista tiene una dirección que indica una relación entre dos nodos. Un DAG no tiene ciclos, lo que significa que no hay forma de comenzar desde un nodo y seguir las aristas de regreso al mismo nodo.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Implicaciones prácticas

Curiosamente, todos estos mecanismos buscan abordar las preguntas planteadas por Zcash Security en su publicación sobre [Mensajería privada escalable](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) y su relación con los sistemas de pago privados. Algunos incluso dan el paso adicional de descargar todos los datos de memo de los servidores, excepto los datos exclusivos de una dirección [address], aumentando la privacidad a costa de algunos recursos adicionales.

Además, Zcash Foundation ha estado analizando otras alternativas para mejorar el rendimiento de las billeteras ligeras. Ese es el caso de [Recuperación de mensajes inconsciente (OMR)](https://zfnd.org/oblivious-message-retrieval/), una construcción que la fundación ha estado estudiando «para determinar si ofrece una posible solución a los recientes problemas de rendimiento que han afectado a los usuarios de billeteras de Zcash».

## Errores comunes

**Suponer que el servidor lightwalletd conoce tu saldo.** El servidor solo entrega bloques compactos; tu billetera los descifra e interpreta localmente con tus propias claves.

**Detener la sincronización demasiado pronto.** Algunos métodos ponen a disposición fondos recientes que se pueden gastar antes de que se complete una sincronización total, pero el historial y las notas más antiguas pueden seguir en proceso.

**Comparar directamente la sincronización de Zcash con la sincronización de una red transparente.** Una ruta más lenta puede ser el costo de preservar la privacidad, no un defecto — la billetera está realizando un trabajo que, de otro modo, haría un servidor de moneda pública al leer abiertamente tu cuenta.


## Páginas relacionadas

- [Nodos de Lightwallet](/zcash-tech/lightwallet-nodes) — la infraestructura de lightwalletd de la que dependen las billeteras ligeras.
- [Claves de visualización](/zcash-tech/viewing-keys) — las claves que usan las billeteras para detectar y descifrar sus propias notas.
- [Pepper Sync](/zcash-tech/pepper-sync) — otro enfoque para la sincronización de billeteras de Zcash.
- [FROST](/zcash-tech/frost) — autoridad de firma distribuida para ZEC blindado.
