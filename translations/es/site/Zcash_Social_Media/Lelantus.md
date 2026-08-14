# De cero a conocimiento cero: Protocolo Lelantus

**Serie:** De cero a conocimiento cero

¡Hoy echamos un vistazo a **Lelantus**!

Lanzado en 2019, este protocolo se basa en Zerocoin. Se utiliza en la moneda **Firo** (anteriormente Zcoin) para habilitar transacciones privadas on-chain. Se parece a Zcash en algunos aspectos, pero es claramente diferente en la mayoría de ellos.

![Introducción a Lelantus](/content-images/Fsk18DgXsAEc0Ob-a8cd9a85d1.webp)

---

## Fundamentos de los protocolos Zcash vs Firo

- **Zcash** - Se basa en el protocolo **Zerocash**  
- **Firo (Zcoin)** - Se basa en el protocolo **Zerocoin**

![Comparación entre Zerocash y Zerocoin](/content-images/Fsk2Fk7WcAA81ty-92158edf6b.webp)

---

## Evolución de los protocolos de privacidad de Firo

Al igual que Zcash, Firo utiliza direcciones blindadas para lograr pagos anónimos.

**Cronología:**
- **Zerocoin** - Integridad comprometida
- **Sigma** - Sistema de denominaciones fijas
- **Lelantus 1.0** - Carecía de pruebas de seguridad correctas

![Evolución del protocolo](/content-images/Fsk2NdaWAAAKVgH-f84ae27c48.webp)

---

## Limitaciones del protocolo Sigma

El protocolo Σ (Sigma) utilizado en versiones anteriores de Zcoin/Firo tenía una limitación importante: los usuarios solo podían acuñar denominaciones fijas.

Esto generaba conjuntos de anonimato más pequeños y abría la puerta a ataques de temporización entre las operaciones de acuñación y canje (además del problema del "cambio contaminado").

![Denominaciones de Sigma](/content-images/Fsk2fxfWcAMUBDo-333a8f9df3.webp)

---

## Cómo Lelantus mejora la privacidad

**Lelantus** resuelve el problema de las denominaciones fijas al permitir acuñaciones desde un único conjunto más grande.

Beneficios clave:
- Elimina los conjuntos de anonimato de denominaciones fijas
- Reduce los ataques de temporización entre burn/redeem
- Elimina el problema del cambio contaminado

**Limitación**: El tamaño del conjunto está actualmente limitado a **65,000 coins**.

![Ventajas de Lelantus](/content-images/Fsk2wK3X0AA6MEe-06f29b3621.webp)

---

## Compromisos de moneda

Un **compromiso de moneda** es un compromiso con doble cegamiento que codifica el número de serie de la moneda y el valor de la moneda.

Funcionan de manera similar a las **Notes** en Zcash.

El compromiso de moneda se publica y almacena en el libro mayor cuando la moneda se crea (mediante transacciones Mint o Spend).

![Diagrama de compromiso de moneda](/content-images/Fsk3AWNX0AIHya8-0ed01a73c1.webp)

---

## Modelo Basecoin < - > Zerocoin

Lelantus utiliza el modelo clásico **basecoin < - > zerocoin**.

**Característica importante**: Ahora son posibles los canjes parciales mientras se mantiene oculto el resto y los importes.

Al igual que en Zcash, las transacciones transparentes deben ser seleccionadas explícitamente por el usuario.

![Flujo de Lelantus](/content-images/Fsk3HrjXgAMgqmX-4d727febf5.webp)

---

## Pruebas One-of-Many

Lelantus utiliza **One-of-Many Proofs** para extraer los valores de entrada necesarios para demostrar el balance sin revelar el origen de las entradas, y sin requerir una trusted setup.

Estas pruebas también se utilizan en **Triptych** (mencionado en nuestro hilo sobre CryptoNote).

![Pruebas One-of-Many](/content-images/Fsk3Z0nWIAAPD4k-b76f087018.webp)

---

## Privacidad de la capa de red: Dandelion++

Los nodos de Firo utilizan la misma Network Magic que el Magicbean de Zcash.

Al igual que Monero, Firo implementó **Dandelion++** para añadir privacidad al ofuscar la dirección IP del emisor de la transacción.

**Fases de Dandelion++:**
- **Fase stem** - La transacción se retransmite a un único nodo aleatorio en lugar de a todos los pares
- **Fase fluff** - Se inicia aleatoriamente y luego cambia al modo normal de gossip

Esto hace que sea mucho más difícil rastrear el origen de una transacción mediante análisis de red.

![Explicación de Dandelion++](/content-images/Fsk4A8VWcAU84MR-538b054cab.webp)

---

## Futuro: Lelantus-Spark

**Lelantus-Spark** (previsto para más adelante en 2023) introduce dos niveles de visibilidad opcional usando **derivación estilo ZIP-32** y direcciones diversificadas.

También añadirá soporte para:
- Multisig
- Activos confidenciales definidos por el usuario

Estas características son paralelas a Zcash Shielded Assets.

![Anuncio de Lelantus-Spark](/content-images/Fsk4jXeXsAACQ3h-b53294b16e.webp)

---

**Hilo original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*Esta página fue compilada a partir del hilo original Zero to Zero Knowledge para la wiki de ZecHub.*
