<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# FROST 


## ¿Qué es una firma Schnorr?

Una firma digital Schnorr es un conjunto de algoritmos: (KeyGen, Sign, Verify).

Las firmas Schnorr tienen varias ventajas. Una ventaja clave es que cuando se utilizan múltiples claves para firmar el mismo mensaje, las firmas resultantes pueden combinarse en una sola firma. Esto puede utilizarse para reducir significativamente el tamaño de los pagos multifirma y otras transacciones relacionadas con multifirma.


## ¿Qué es FROST?

**Flexible Round-Optimized Schnorr Threshold Signatures** -
*Creado por Chelsea Komlo (University of Waterloo, Zcash Foundation) e Ian Goldberg (University of Waterloo).*

FROST es un protocolo de firma umbral y generación distribuida de claves que ofrece un número mínimo de rondas de comunicación y es seguro para ejecutarse en paralelo. El protocolo FROST es una versión umbral del esquema de firma Schnorr.

A diferencia de las firmas en un entorno de una sola parte, las firmas umbral requieren la cooperación entre un número umbral de firmantes, cada uno con una participación de una clave privada común. 

[¿Qué son las firmas umbral? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

En consecuencia, generar firmas en un entorno umbral impone sobrecarga debido a las rondas de red entre firmantes, lo que resulta costoso cuando las participaciones secretas se almacenan en dispositivos con limitaciones de red o cuando la coordinación ocurre sobre redes no confiables.

La sobrecarga de red durante las operaciones de firma se reduce empleando una técnica novedosa para proteger contra ataques de falsificación aplicables a otros esquemas.
 
FROST mejora los protocolos de firma umbral, ya que un número ilimitado de operaciones de firma puede realizarse de forma segura en paralelo (concurrencia).
 
Puede utilizarse como un protocolo de 2 rondas en el que los firmantes envían y reciben 2 mensajes en total, o bien optimizarse a un protocolo de firma de una sola ronda con una etapa de preprocesamiento. 

FROST logra sus mejoras de eficiencia en parte al permitir que el protocolo se aborte en presencia de un participante malicioso (que luego es identificado y excluido de futuras operaciones).
 
Las pruebas de seguridad que demuestran que FROST es seguro contra ataques de mensaje elegido, asumiendo que el problema del logaritmo discreto es difícil y que el adversario controla menos participantes que el umbral, se proporcionan [aquí](https://eprint.iacr.org/2020/852.pdf#page=16).


## ¿Cómo funciona FROST?

El protocolo FROST contiene dos componentes importantes:

Primero, n participantes ejecutan un *protocolo de generación distribuida de claves (DKG)* para generar una clave común de verificación; al final, cada participante obtiene una participación secreta de clave privada y una participación de clave pública de verificación. 

Después, cualquier subconjunto de t de n participantes puede ejecutar un *protocolo de firma umbral* para generar colaborativamente una firma Schnorr válida. 

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

**Generación distribuida de claves (DKG)**

El objetivo de esta fase es generar participaciones secretas de clave de larga duración y una clave conjunta de verificación. Esta fase es ejecutada por n participantes. 

FROST construye su propia fase de generación de claves sobre [Pedersens DKG (GJKR03)](https://blog.gtank.cc/notes-on-threshold-signatures/)  en la que utiliza tanto el esquema de compartición secreta de Shamir como el esquema de compartición secreta verificable de Feldman como subrutinas. Además, cada participante debe demostrar conocimiento de su propio secreto enviando a los demás participantes una prueba de conocimiento cero, que en sí misma es una firma Schnorr. Este paso adicional protege contra ataques de clave maliciosa en el entorno donde t ≥ n/2.

Al final del protocolo DKG, se genera una clave conjunta de verificación vk. Además, cada participante P ᵢ mantiene un valor (i, sk ᵢ ) que es su participación secreta de larga duración y una participación de clave de verificación vk ᵢ = sk ᵢ *G. La participación de clave de verificación vk ᵢ de P ᵢ es utilizada por otros participantes para verificar la corrección de las participaciones de firma de P ᵢ en la fase de firma, mientras que la clave de verificación vk es utilizada por partes externas para verificar firmas emitidas por el grupo.

**Firma umbral**

Esta fase se basa en técnicas conocidas que emplean compartición aditiva de secretos y conversión de participaciones para generar de forma no interactiva el nonce de cada firma. Esta fase también aprovecha técnicas de vinculación para evitar ataques de falsificación conocidos sin limitar la concurrencia.

Preprocesamiento: En la etapa de preprocesamiento, cada participante prepara un número fijo de pares de puntos de Curva Elíptica (EC) para su uso posterior, lo que se ejecuta una sola vez para múltiples fases de firma umbral.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Ronda de firma 1: Cada participante Pᵢ comienza generando un único par privado de nonces (dᵢ, eᵢ) y el correspondiente par de puntos EC (Dᵢ, Eᵢ), y difunde este par de puntos a todos los demás participantes. Cada participante almacena estos pares de puntos EC recibidos para su uso posterior. Las rondas de firma 2 y 3 son las operaciones reales en las que t de n participantes cooperan para crear una firma Schnorr válida.

Ronda de firma 2: Para crear una firma Schnorr válida, cualquier conjunto de t participantes trabaja en conjunto para ejecutar esta ronda. La técnica central detrás de esta ronda es la compartición aditiva de secretos t-de-t.

Este paso previene el ataque de falsificación porque los atacantes no pueden combinar participaciones de firma entre operaciones de firma distintas ni permutar el conjunto de firmantes o los puntos publicados para cada firmante. 

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Una vez calculado el desafío c, cada participante puede calcular la respuesta zᵢ al desafío utilizando los nonces de un solo uso y las participaciones secretas de largo plazo, que son participaciones secretas de Shamir t-de-n (de grado t-1) de la clave de larga duración del grupo. Al final de la ronda de firma 2, cada participante difunde zᵢ a los demás participantes.

[Lee el artículo completo](https://eprint.iacr.org/2020/852.pdf)


## ¿Beneficia a Zcash?

Absolutamente sí. La introducción de FROST en Zcash permitirá que múltiples partes, separadas geográficamente, controlen la autoridad de gasto de ZEC blindado. Una ventaja es que las transacciones transmitidas usando este esquema de firma serán indistinguibles de otras transacciones en la red, manteniendo una fuerte resistencia al rastreo de pagos y limitando la cantidad de datos de blockchain disponibles para análisis. 

En la práctica, esto permite construir en la red toda una gama de nuevas aplicaciones, desde proveedores de depósito en garantía hasta otros servicios no custodiales. 

FROST también se convertirá en un componente esencial en la emisión y gestión segura de Zcash Shielded Assets (ZSA), permitiendo una gestión más segura de la autoridad de gasto dentro de organizaciones de desarrollo y custodios de ZEC como los exchanges, al distribuir aún más la confianza mientras proporciona esta capacidad también a los usuarios de Zcash. 


## Uso de FROST en el ecosistema más amplio

**FROST en [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Para mejorar la eficiencia de los sistemas de firma umbral de Coinbase, desarrollaron una versión de FROST. La implementación de Coinbase realiza ligeros cambios respecto al borrador original de FROST.

Optaron por no utilizar el rol de agregador de firmas. En su lugar, cada participante es un agregador de firmas. Este diseño es más seguro: todos los participantes del protocolo verifican lo que otros han calculado para lograr un mayor nivel de seguridad y reducir el riesgo. La etapa de preprocesamiento (de una sola vez) también fue eliminada para acelerar la implementación, teniendo en su lugar una tercera ronda de firma.

___

**[ROAST](https://eprint.iacr.org/2022/550.pdf) por Blockstream** 

Una mejora específica de aplicación sobre FROST propuesta para su uso en [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) para Bitcoin.

"ROAST es un contenedor simple alrededor de esquemas de firma umbral como FROST. Garantiza que un quórum de firmantes honestos, por ejemplo, los functionaries de Liquid, siempre pueda obtener una firma válida incluso en presencia de firmantes disruptivos cuando las conexiones de red tienen una latencia arbitrariamente alta." 

___

**FROST en IETF**

Internet Engineering Task Force, fundada en 1986, es la principal organización de desarrollo de estándares para Internet. IETF crea estándares voluntarios que a menudo son adoptados por usuarios de Internet, operadores de red y fabricantes de equipos, y así ayuda a dar forma a la trayectoria del desarrollo de Internet.

La versión 11 de FROST (variante de dos rondas) ha sido [presentada a IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). 

Este es un paso importante para la evaluación completa de FROST como un nuevo estándar de esquema de firma umbral para su uso en Internet, en dispositivos de hardware y para otros servicios en los próximos años. 
___


Aprendizaje adicional:

[Artículo de Coinbase - Firmas umbral](https://www.coinbase.com/blog/threshold-digital-signatures)

[Compartición secreta de Shamir - Explicación y ejemplo](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Video corto sobre firmas digitales Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
