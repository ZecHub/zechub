# Zero to Zero Knowledge: Protocolo Lelantus

**Serie:** Zero to Zero Knowledge

¡Hoy echamos un vistazo a **Lelantus**!

Lanzado en 2019, este protocolo se basa en Zerocoin. Se utiliza en la moneda **Firo** (anteriormente Zcoin) para habilitar transacciones on-chain privadas [private on-chain transactions]. Se asemeja a Zcash en algunos aspectos, pero es claramente diferente en la mayoría de ellos.

![Lelantus intro](/content-images/Fsk18DgXsAEc0Ob-a8cd9a85d1.webp)

---

## Fundamentos de los protocolos Zcash frente a Firo

- **Zcash** - Se basa en el protocolo **Zerocash**  
- **Firo (Zcoin)** - Se basa en el protocolo **Zerocoin**

![Zerocash vs Zerocoin comparison](/content-images/Fsk2Fk7WcAA81ty-92158edf6b.webp)

---

## Evolución de los protocolos de privacidad [Privacy] de Firo

De forma similar a Zcash, Firo utiliza direcciones blindadas [shielded addresses] para lograr pagos anónimos.

**Cronología:**
- **Zerocoin** - Solidez comprometida
- **Sigma** - Sistema de denominaciones fijas
- **Lelantus 1.0** - Carecía de pruebas de seguridad correctas

![Protocol evolution](/content-images/Fsk2NdaWAAAKVgH-f84ae27c48.webp)

---

## Limitaciones del protocolo Sigma

El protocolo Σ (Sigma) utilizado en versiones anteriores de Zcoin/Firo tenía una limitación importante: los usuarios solo podían acuñar denominaciones fijas.

Esto creó conjuntos de anonimato más pequeños y abrió la puerta a ataques de temporización entre las operaciones de acuñación y canje (además del problema del «cambio contaminado»).

![Sigma denominations](/content-images/Fsk2fxfWcAMUBDo-333a8f9df3.webp)

---

## Cómo Lelantus mejora la privacidad

**Lelantus** resuelve el problema de las denominaciones fijas al permitir acuñaciones desde un único conjunto más grande.

Beneficios clave:
- Elimina los conjuntos de anonimato de denominaciones fijas
- Reduce los ataques de temporización entre quema/canje
- Elimina el problema del cambio contaminado

**Limitación**: El tamaño del conjunto está actualmente limitado a **65.000 monedas**.

![Lelantus advantages](/content-images/Fsk2wK3X0AA6MEe-06f29b3621.webp)

---

## Compromisos de moneda

Un **compromiso de moneda [coin commitment]** es un compromiso con doble cegamiento que codifica el número de serie y el valor de la moneda.

Estos funcionan de forma similar a las **Notas [Notes]** en Zcash.

El compromiso de moneda se publica y almacena en el libro mayor cuando se crea la moneda (mediante transacciones de acuñación o gasto).

![Coin commitment diagram](/content-images/Fsk3AWNX0AIHya8-0ed01a73c1.webp)

---

## Modelo Basecoin < - > Zerocoin

Lelantus utiliza el modelo clásico **basecoin < - > zerocoin**.

**Característica importante**: Ahora son posibles los canjes parciales manteniendo ocultos el resto y las cantidades.

Al igual que Zcash, las transacciones transparentes [transparent transactions] deben ser seleccionadas explícitamente por el usuario.

![Lelantus flow](/content-images/Fsk3HrjXgAMgqmX-4d727febf5.webp)

---

## Pruebas One-of-Many

Lelantus utiliza **Pruebas One-of-Many [One-of-Many Proofs]** para extraer los valores de entrada necesarios para demostrar el equilibrio sin revelar los orígenes de las entradas, y sin requerir una configuración confiable [trusted setup].

Estas pruebas también se utilizan en **Triptych** (mencionado en nuestro hilo sobre CryptoNote).

![One-of-Many Proofs](/content-images/Fsk3Z0nWIAAPD4k-b76f087018.webp)

---

## Privacidad de la capa de red: Dandelion++

Los nodos [nodes] de Firo utilizan la misma Network Magic que Magicbean de Zcash.

Al igual que Monero, Firo implementó **Dandelion++** para añadir privacidad al ofuscar la dirección IP del emisor de la transacción.

**Fases de Dandelion++:**
- **Fase Stem** - La transacción se retransmite a un único nodo aleatorio en lugar de a todos los pares
- **Fase Fluff** - Se inicia aleatoriamente y luego cambia al modo normal de difusión

Esto hace que sea mucho más difícil rastrear el origen de una transacción mediante análisis de red.

![Dandelion++ explanation](/content-images/Fsk4A8VWcAU84MR-538b054cab.webp)

---

## Futuro: Lelantus-Spark

**Lelantus-Spark** (previsto para finales de 2023) introduce dos niveles de visibilidad voluntaria utilizando derivación de estilo **ZIP-32** y direcciones diversificadas.

También añadirá soporte para:
- Multisig
- Activos confidenciales definidos por el usuario

Estas características son paralelas a los Shielded Assets de Zcash.

![Lelantus-Spark announcement](/content-images/Fsk4jXeXsAACQ3h-b53294b16e.webp)

---

**Hilo original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*Esta página fue recopilada a partir del hilo original de Zero to Zero Knowledge para la wiki de ZecHub.*
