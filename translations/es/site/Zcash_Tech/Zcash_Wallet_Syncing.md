<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sincronización de Wallet de Zcash

## TL;DR

* Debido a que las transacciones blindadas de Zcash ocultan sus detalles, un servidor no puede simplemente consultar el saldo de una wallet como puede hacerlo con monedas transparentes como Bitcoin o Ethereum.
* Las wallets ligeras descargan pequeños «bloques compactos» de un servidor especializado (lightwalletd) y descifran por sí mismas los datos relevantes con sus claves privadas.
* Descifrar y procesar esos bloques lleva tiempo, por lo que las wallets usan métodos de sincronización más rápidos para permitirte usar tus fondos antes.
* Enfoques destacados: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) y el DAGSync propuesto.
* Estos métodos generalmente intercambian memoria o potencia de procesamiento adicional por una sincronización más rápida.

## Explicación básica

### Cómo funciona la sincronización de Zcash

Zcash utiliza pruebas de conocimiento cero para blindar los detalles de las transacciones ante partes no autorizadas. Esta privacidad hace que la sincronización sea más difícil para las wallets ligeras, ya que no almacenan toda la blockchain localmente y, en su lugar, dependen de un servidor para obtener la información necesaria. Con Bitcoin o Ethereum, los servidores pueden indexar la blockchain y devolver rápidamente los datos de una cuenta. Pero con Zcash, el servidor no puede ver los detalles de las transacciones. Entonces, ¿cómo puede una wallet ligera sincronizar su saldo e historial sin descargar y descifrar por sí misma toda la blockchain?

Zcash resuelve este problema combinando varios enfoques. Cuenta con un servidor especializado, lightwalletd, que filtra datos de un nodo completo y conserva solo lo necesario para identificar transacciones. Estos datos se denominan bloques compactos y son mucho más pequeños que los bloques originales. Las wallets ligeras primero descargan estos bloques compactos del servidor lightwalletd y luego los descifran con sus claves privadas.

Incluso descifrar y procesar estos bloques compactos puede llevar un tiempo considerable, especialmente cuando hay muchas transacciones por bloque. Por eso, las wallets utilizan distintos métodos para acelerar la sincronización y permitirte usar tus fondos lo antes posible.

## Visual / Analogía

Imagina la blockchain como una enorme sala de correo llena de cajas cerradas. Con una moneda transparente, el empleado de la sala de correo puede leer las etiquetas y decirte al instante qué cajas son tuyas. Con Zcash, las etiquetas están ocultas; por eso tu wallet debe tomar sus claves y revisar discretamente las cajas por sí misma para encontrar aquellas que puede abrir. Los métodos de sincronización que se describen a continuación son distintas estrategias para revisar esas cajas más rápido.

## Análisis en profundidad

### Warp Sync

Warp sync es una función de YWallet que omite los pasos intermedios de descifrar y procesar cada bloque compacto, pasando directamente al resultado final.

Para ello, utiliza matemáticas y criptografía para calcular el resultado final sin pasar por cada paso.

Warp sync puede procesar miles de bloques por segundo, mucho más rápido que el método de sincronización habitual. Esto significa que los usuarios de YWallet pueden disfrutar de un rendimiento rápido y fluido, incluso con cientos de miles de transacciones y notas recibidas en sus cuentas.

Además de esta técnica de omisión de pasos, YWallet puede procesar varios bloques simultáneamente, distribuyendo la carga entre el hardware disponible para hacer el proceso aún más rápido.

Lee más sobre [Warp Sync](https://ywallet.app/warp/)

> Warp sync se describe aquí como una técnica de sincronización. Ywallet ya no recibe mantenimiento y no se actualizará para Ironwood, por lo que no es una wallet que debas instalar hoy.

### Spend-before-sync

Spend-before-sync es una nueva función de Zcash Mobile Wallet SDK V2 que permite a los usuarios gastar fondos instantáneamente al abrir su wallet, sin esperar a la sincronización completa de la wallet. Esta función acelera la detección del saldo disponible para gastar de la wallet y mejora la experiencia de usuario.

Spend-before-sync funciona mediante un algoritmo de sincronización de bloques compactos que procesa bloques del servidor lightwalletd en un orden no lineal. Esto significa que, en lugar de esperar a que un bloque se procese completamente antes de continuar, las wallets pueden usar un poco más de memoria y potencia de procesamiento para escanear diferentes secciones de la blockchain. Por lo general, escanea distintos rangos, buscando transacciones más recientes mientras se descargan y procesan los bloques más antiguos. Si se descubre una nota reciente no gastada, estará disponible de inmediato.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Desarrollado por el equipo de Zecwallet, Blaze sync es un algoritmo de sincronización para wallets ligeras que escanea la blockchain hacia atrás, comenzando por el bloque más alto y reciente y avanzando hacia atrás.

Esto permite que la wallet encuentre notas gastadas antes que las recibidas, mientras hace disponibles las notas previamente no gastadas sin esperar a que finalice el proceso de sincronización completo.

Además, utiliza Out-of-Order Sync al desacoplar entre sí los componentes de la sincronización —descargar bloques, realizar descifrados de prueba y actualizar testigos— y procesarlos en paralelo. Esto requiere más memoria y recursos de CPU, pero aumenta la velocidad de sincronización en X5.

### DAGSync

DAGSync es un algoritmo de sincronización propuesto que pretende mejorar la experiencia de usuario de las wallets blindadas de Zcash acelerando la sincronización.

Utiliza un [Grafo Acíclico Dirigido (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) para representar las dependencias entre notas, testigos y anuladores en una wallet de Zcash.

Un DAG es una estructura de datos que consta de nodos y aristas, donde cada arista tiene una dirección que indica una relación entre dos nodos. Un DAG no tiene ciclos, lo que significa que no hay forma de comenzar desde un nodo y seguir las aristas de vuelta al mismo nodo.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Implicaciones prácticas

Curiosamente, todos estos mecanismos buscan abordar las preguntas planteadas por Zcash Security en su publicación sobre [Mensajería privada escalable](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) y su relación con los sistemas de pagos privados. Algunos incluso dan el paso adicional de descargar todos los datos de memo de los servidores, excepto los datos exclusivos de una dirección, aumentando la privacidad a costa de algunos recursos adicionales.

Además, la Zcash Foundation ha estado analizando otras alternativas para mejorar el rendimiento de las wallets ligeras. Ese es el caso de [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), una construcción que la fundación ha estado estudiando «para determinar si ofrece una posible solución a los recientes problemas de rendimiento que han afectado a los usuarios de wallets de Zcash».

## Errores comunes

**Suponer que el servidor lightwalletd conoce tu saldo.** El servidor solo entrega bloques compactos; tu wallet los descifra e interpreta localmente con tus propias claves.

**Detener la sincronización demasiado pronto.** Algunos métodos hacen que los fondos recientes disponibles para gastar estén accesibles antes de que se complete una sincronización total, pero el historial y las notas más antiguas pueden seguir procesándose.

**Comparar directamente la sincronización de Zcash con la de una cadena transparente.** Una ruta más lenta puede ser el coste de preservar la privacidad, no un defecto: la wallet está realizando trabajo que, de otro modo, un servidor de una moneda pública haría leyendo abiertamente tu cuenta.


## Páginas relacionadas

- [Nodos de Lightwallet](/zcash-tech/lightwallet-nodes) — la infraestructura de lightwalletd de la que dependen las wallets ligeras.
- [Claves de visualización](/zcash-tech/viewing-keys) — las claves que las wallets utilizan para detectar y descifrar sus propias notas.
- [Pepper Sync](/zcash-tech/pepper-sync) — otro enfoque para la sincronización de wallets de Zcash.
- [FROST](/zcash-tech/frost) — autoridad de firma distribuida para ZEC blindado.
