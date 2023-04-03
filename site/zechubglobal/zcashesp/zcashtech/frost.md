# FROST


## ¿Qué es una firma Schnorr?

Una firma digital Schnorr es un conjunto de algoritmos: (KeyGen, Sign, Verify).

Las firmas Schnorr tienen varias ventajas. Una ventaja clave es que cuando se utilizan varias claves para firmar el mismo mensaje, las firmas resultantes pueden combinarse en una sola firma. Esto se puede utilizar para reducir significativamente el tamaño de los pagos multisig y otras transacciones relacionadas con multisig.


## ¿Qué es FROST?

**Firmas de umbral Schnorr flexibles y optimizadas por rondas** -
*Creado por Chelsea Komlo (Universidad de Waterloo, Fundación Zcash) e Ian Goldberg (Universidad de Waterloo).*

FROST es un protocolo de firma de umbral y generación de claves distribuidas que ofrece un número mínimo de rondas de comunicación y es seguro para ejecutarse en paralelo. El protocolo FROST es una versión de umbral del esquema de firma Schnorr.

A diferencia de las firmas en un entorno de una sola parte, las firmas de umbral requieren cooperación entre un número umbral de firmantes que tienen una parte de una clave privada común.

[What are Threshold Signatures? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

En consecuencia, generar firmas en un entorno de umbral impone una sobrecarga debido a las rondas de red entre los firmantes, lo que resulta costoso cuando las partes secretas se almacenan en dispositivos limitados por la red o cuando la coordinación ocurre en redes no confiables.

La sobrecarga de red durante las operaciones de firma se reduce mediante el empleo de una técnica novedosa para proteger contra ataques de falsificación aplicables a otros esquemas.

FROST mejora los protocolos de firma de umbral ya que se pueden realizar un número ilimitado de operaciones de firma de manera segura en paralelo (concurrencia).

Puede utilizarse como un protocolo de dos rondas donde los firmantes envían y reciben un total de 2 mensajes, u optimizarse como un protocolo de firma de una sola ronda con una etapa de preprocesamiento.

FROST logra mejoras de eficiencia al permitir que el protocolo se cancele en presencia de un participante que se comporta mal (quien luego es identificado y excluido de futuras operaciones).

Se proporcionan pruebas de seguridad que demuestran que FROST es seguro contra ataques de mensaje elegido asumiendo que el problema del logaritmo discreto es difícil y que el adversario controla menos participantes que el umbral [aquí](https://eprint.iacr.org/2020/852.pdf#page=16).


## ¿Cómo funciona FROST?

El protocolo FROST contiene dos componentes importantes:

En primer lugar, n participantes ejecutan un *protocolo de generación de claves distribuidas (DKG)* para generar una clave de verificación común; al final, cada participante obtiene una parte de clave secreta privada y una parte de clave de verificación pública.

Después, cualquier grupo de t participantes de un total de n, pueden ejecutar un *protocolo de firma de umbral* para generar colaborativamente una firma Schnorr válida.

![Threshold sign](https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg "thresholdsign")


**Generación de claves distribuidas (DKG)**

El objetivo de esta fase es generar partes de clave secretas de larga duración y una clave de verificación conjunta. Esta fase es realizada por n participantes.

FROST construye su propia fase de generación de clave sobre [Pedersen’s DKG (GJKR03)](https://blog.gtank.cc/notes-on-threshold-signatures/), en la que utiliza tanto el esquema de compartición de secretos de Shamir como el de compartición verificable de secretos de Feldman como subrutinas. Además, cada participante debe demostrar el conocimiento de su propio secreto enviando a otros participantes una prueba de conocimiento nulo, que es una firma de Schnorr. Este paso adicional protege contra ataques de claves maliciosas en el entorno donde t ≥ n/2.

Al final del protocolo DKG, se genera una clave de verificación conjunta vk. Además, cada participante Pᵢ tiene un valor (i, skᵢ) que es su parte de clave secreta de larga duración y una parte de clave de verificación vkᵢ = skᵢ * G. La parte de clave de verificación vkᵢ de un participante Pᵢ se utiliza por otros participantes para verificar la corrección de las partes de firma de Pᵢ en la fase de firma, mientras que la clave de verificación vk se utiliza por partes externas para verificar las firmas emitidas por el grupo.

**Firma de umbral**

Esta fase se basa en técnicas conocidas que emplean compartición de secretos aditivos y conversión de comparticiones a fin de generar noces para cada firma de forma no interactiva. Esta fase también utiliza técnicas de enlace para evitar ataques de falsificación conocidos sin limitar la concurrencia.

Preprocesamiento: En la etapa de preprocesamiento, cada participante prepara un número fijo de pares de puntos de curva elíptica (EC) para su posterior uso, que se ejecuta una sola vez para varias fases de firma de umbral.

![Preprocessing](https://i.ibb.co/nQD1c3n/preprocess.png "preprocess stage")

Firma de la Ronda 1: Cada participante Pᵢ comienza generando un único par de noce privado (dᵢ, eᵢ) y el par correspondiente de puntos de EC (Dᵢ, Eᵢ) y transmite este par de puntos a todos los demás participantes. Cada participante almacena estos pares de puntos de EC recibidos para su uso posterior. Las rondas de firma 2 y 3 son las operaciones reales en las que t de n participantes cooperan para crear una firma Schnorr válida.

Firma de la Ronda 2: Para crear una firma Schnorr válida, cualquier t de los participantes trabajan juntos para ejecutar esta ronda. La técnica central detrás de esta ronda es la compartición de secretos aditivos t de t.

Este paso evita el ataque de falsificación porque los atacantes no pueden combinar partes de firma en distintas operaciones de firma o permutar el conjunto de firmantes o puntos publicados para cada firmante.

![Signing protocol](https://i.ibb.co/b5rJbXx/sign.png "signing protocol")

Habiendo calculado el desafío c, cada participante es capaz de calcular la respuesta zᵢ al desafío utilizando los nonce de un solo uso y las partes secretas a largo plazo, que son partes secretas de Shamir t-de-n (grado t-1) de la clave de larga duración del grupo. Al final de la segunda ronda de firma, cada participante transmite zᵢ a los demás participantes.

[Lea el artículo completo](https://eprint.iacr.org/2020/852.pdf)


## ¿Beneficia a Zcash?

Absolutamente sí. La introducción de FROST en Zcash permitirá que múltiples partes, separadas geográficamente, controlen la autoridad de gasto de ZEC protegido. Una ventaja es que las transacciones transmitidas utilizando este esquema de firma serán indistinguibles de otras transacciones en la red, manteniendo una fuerte resistencia al seguimiento de pagos y limitando la cantidad de datos de la blockchain disponibles para su análisis.

En la práctica, esto permite la construcción de una serie de nuevas aplicaciones en la red, desde proveedores de custodia hasta otros servicios no custodiales.

FROST también se convertirá en un componente esencial en la emisión y gestión segura de los Zcash Shielded Assets (ZSA), lo que permitirá una gestión más segura de la autoridad de gasto en organizaciones de desarrollo y custodios de ZEC como exchanges, al distribuir aún más la confianza y proporcionar esta capacidad a los usuarios de Zcash.


## Uso de FROST en el ecosistema más amplio

**FROST en [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Con el fin de mejorar la eficiencia de los sistemas de firma de umbral de Coinbase, desarrollaron una versión de FROST. La implementación de Coinbase realiza pequeños cambios con respecto al borrador original de FROST.

Optaron por no utilizar el rol de agregador de firmas. En su lugar, cada participante es un agregador de firmas. Este diseño es más seguro: todos los participantes del protocolo verifican lo que otros han calculado para lograr un mayor nivel de seguridad y reducir el riesgo. La etapa de preprocesamiento (de un solo uso) también se eliminó para acelerar la implementación, en su lugar hay una tercera ronda de firma.

___

**[ROAST](https://eprint.iacr.org/2022/550.pdf) de Blockstream**

Una mejora específica de la aplicación de FROST propuesta para su uso en la [Blockstream's Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) para Bitcoin.

"ROAST es un simple envoltorio alrededor de esquemas de firma de umbral como FROST. Garantiza que un quórum de firmantes honestos, por ejemplo, los funcionarios de Liquid, siempre puedan obtener una firma válida incluso en presencia de firmantes disruptivos cuando las conexiones de red tienen latencia arbitrariamente alta".

___

**FROST en IETF**

La Internet Engineering Task Force, fundada en 1986, es la principal organización de desarrollo de estándares para Internet. El IETF hace estándares voluntarios que a menudo son adoptados por los usuarios de Internet, los operadores de redes y los proveedores de equipos, y así ayuda a dar forma a la trayectoria del desarrollo de Internet.

La versión 11 de FROST (variante de dos rondas) se ha [presentado a IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). .

Este es un paso importante para la evaluación completa de FROST como un nuevo esquema de firma de umbral estándar para su uso en Internet, en dispositivos de hardware y para otros servicios en los años venideros.
___


Aprendizaje adicional:

[Artículo de Coinbase - Threshold Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Explicación y ejemplo](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Video corto sobre firmas digitales de Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___




