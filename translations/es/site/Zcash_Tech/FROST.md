<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>
# FROST


## TL;DR

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) es un protocolo de firma umbral y generación distribuida de claves: varios firmantes poseen cada uno una parte de una clave privada común, y un número umbral de ellos debe cooperar para producir una firma.
* Debido a que el resultado es una única firma Schnorr, una transacción realizada de esta manera parece una transacción ordinaria en la red.
* Requiere un número mínimo de rondas de comunicación, puede ejecutarse en paralelo y puede identificar y excluir a un participante que actúe de forma indebida.
* Para Zcash, esto significa que FROST permite que múltiples partes, separadas geográficamente, controlen la autoridad de gasto de ZEC blindado, lo que resulta útil para custodia, depósito en garantía, servicios sin custodia y Zcash Shielded Assets (ZSA).
* Fue creado por Chelsea Komlo (University of Waterloo, Zcash Foundation) e Ian Goldberg (University of Waterloo).

## Explicación básica

### ¿Qué es una firma Schnorr?

Una firma digital Schnorr es un conjunto de algoritmos: (KeyGen, Sign, Verify).

Las firmas Schnorr tienen varias ventajas. Una ventaja clave es que, cuando se usan múltiples claves para firmar el mismo mensaje, las firmas resultantes pueden combinarse en una sola firma. Esto puede reducir significativamente el tamaño de los pagos multifirma y otras transacciones relacionadas con multifirma.

### ¿Qué es FROST?

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*Creado por Chelsea Komlo (University of Waterloo, Zcash Foundation) e Ian Goldberg (University of Waterloo).*

FROST es un protocolo de firma umbral y generación distribuida de claves que requiere un número mínimo de rondas de comunicación y puede ejecutarse en paralelo. El protocolo FROST es una versión umbral del esquema de firma Schnorr.

A diferencia de las firmas en un entorno de una sola parte, las firmas umbral requieren cooperación entre un número umbral de firmantes, cada uno con una parte de una clave privada común.

[¿Qué son las firmas umbral? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

En consecuencia, generar firmas en un entorno umbral genera sobrecarga debido a las rondas de red entre firmantes, lo que lo hace costoso cuando las participaciones secretas se almacenan en dispositivos con limitaciones de red o cuando la coordinación ocurre a través de redes poco confiables.

La sobrecarga de red durante las operaciones de firma se reduce mediante el uso de una técnica novedosa que protege contra ataques de falsificación y que también es aplicable a otros esquemas.

FROST mejora los protocolos de firma umbral al permitir que un número ilimitado de operaciones de firma se realicen de forma segura en paralelo (concurrencia).

Puede usarse tanto como un protocolo de 2 rondas, donde los firmantes envían y reciben 2 mensajes en total, como un protocolo de firma optimizado de una sola ronda con una etapa de preprocesamiento.

FROST logra sus mejoras de eficiencia en parte al permitir que el protocolo se aborte en presencia de un participante que actúe de forma indebida, quien luego es identificado y excluido de operaciones futuras.

Las pruebas de seguridad que demuestran que FROST es seguro frente a ataques de mensaje elegido, asumiendo que el problema del logaritmo discreto es difícil y que el adversario controla menos participantes que el umbral, se proporcionan [aquí](https://eprint.iacr.org/2020/852.pdf#page=16).

### ¿Cómo funciona FROST?

El protocolo FROST contiene dos componentes importantes:

Primero, n participantes ejecutan un protocolo de generación distribuida de claves (DKG) para generar una clave común de verificación. Al final, cada participante obtiene una participación de clave secreta privada y una participación de clave pública de verificación.

Después, cualquier conjunto de t de n participantes puede ejecutar un protocolo de firma umbral para generar colaborativamente una firma Schnorr válida.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## Visual / Analogía

Piensa en FROST como una caja de seguridad que solo se abre cuando varios titulares autorizados giran sus llaves juntos, pero no se requiere a todos los titulares; solo a un número determinado (por ejemplo, cualquiera 3 de 5). Una vez que la caja está abierta, un observador externo no puede saber qué titulares de llaves se presentaron, ni siquiera que participó más de uno. Del mismo modo, un grupo puede autorizar conjuntamente una transacción de Zcash mientras la red solo ve una firma ordinaria.

## Análisis profundo

**Generación distribuida de claves (DKG)**

El objetivo de esta fase es generar participaciones de claves secretas de larga duración y una clave conjunta de verificación. Esta fase es ejecutada por n participantes.

FROST construye su propia fase de generación de claves sobre el DKG de Pedersen (GJKR03), que utiliza tanto el esquema de compartición secreta de Shamir como el esquema de compartición secreta verificable de Feldman como subrutinas. Además, cada participante debe demostrar conocimiento de su propio secreto enviando una prueba de conocimiento cero a los demás participantes, que en sí misma es una firma Schnorr. Este paso adicional protege contra ataques de clave maliciosa cuando t ≥ n/2.

Al final del protocolo DKG, se genera una clave conjunta de verificación vk. Cada participante Pᵢ posee un valor (i, skᵢ ) que es su participación secreta de larga duración y una participación de clave de verificación vkᵢ = skᵢ *G. La participación de clave de verificación vkᵢ del participante Pᵢ es utilizada por otros participantes para verificar la corrección de las participaciones de firma de Pᵢ durante la fase de firma, mientras que la clave de verificación vk es utilizada por partes externas para verificar las firmas emitidas por el grupo.

**Firma umbral**

Esta fase se basa en técnicas conocidas que emplean compartición aditiva de secretos y conversión de participaciones para generar de manera no interactiva el nonce de cada firma. También aprovecha técnicas de vinculación para evitar ataques de falsificación conocidos sin limitar la concurrencia.

En la etapa de preprocesamiento, cada participante prepara un número fijo de pares de puntos de Curva Elíptica (EC) para uso posterior. Esta etapa se ejecuta una vez a lo largo de múltiples fases de firma umbral.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Ronda de firma 1: Cada participante Pᵢ comienza generando un único par privado de nonces (dᵢ, eᵢ) y el correspondiente par de puntos EC (Dᵢ, Eᵢ), y luego difunde este par de puntos a todos los demás participantes. Cada participante almacena estos pares de puntos EC para uso posterior. Las rondas de firma 2 y 3 son las operaciones reales en las que t de n participantes cooperan para crear una firma Schnorr válida.

Ronda de firma 2: Los participantes trabajan juntos para crear una firma Schnorr válida. La técnica central detrás de esta ronda es la compartición aditiva de secretos t-de-t.

Este paso previene ataques de falsificación porque los atacantes no pueden combinar participaciones de firma entre operaciones de firma distintas ni permutar el conjunto de firmantes o los puntos publicados para cada firmante.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Habiendo calculado el desafío c, cada participante puede calcular la respuesta zᵢ usando los nonces de un solo uso y las participaciones secretas de largo plazo, que son participaciones secretas de Shamir t-de-n (de grado t-1) de la clave de larga duración del grupo. Al final de la ronda de firma 2, cada participante difunde zᵢ a los demás participantes.

[Lee el artículo completo](https://eprint.iacr.org/2020/852.pdf)
### Uso de FROST en el ecosistema en general

**FROST en [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Para mejorar la eficiencia de los sistemas de firmas umbral de Coinbase, desarrollaron una versión de FROST. Esta implementación de Coinbase introduce ligeros cambios respecto al borrador original de FROST.

Optaron por no utilizar el rol de agregador de firmas. En su lugar, cada participante es un agregador de firmas. Este diseño es más seguro: todos los participantes del protocolo verifican los cálculos de los demás, logrando así un mayor nivel de seguridad y reduciendo el riesgo. La etapa de preprocesamiento de una sola vez también se eliminó para acelerar la implementación, utilizando en su lugar una tercera ronda de firma.

---

**[ROAST](https://eprint.iacr.org/2022/550.pdf) de Blockstream**

Se propone una mejora específica para aplicaciones sobre FROST para su uso en [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) para Bitcoin.

“ROAST es un envoltorio simple alrededor de esquemas de firma umbral como FROST. Garantiza que un quórum de firmantes honestos, por ejemplo, los funcionarios de Liquid, siempre pueda obtener una firma válida incluso en presencia de firmantes disruptivos cuando las conexiones de red tienen una latencia arbitrariamente alta.”

---

**FROST en IETF**

La Internet Engineering Task Force, fundada en 1986, es la principal organización de desarrollo de estándares para Internet. La IETF desarrolla estándares voluntarios que a menudo son adoptados por usuarios de Internet, operadores de red y proveedores de equipos, ayudando a dar forma a la trayectoria de Internet.

La versión 11 de FROST (variante de dos rondas) ha sido [presentada al IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Este es un paso importante hacia la evaluación completa de FROST como un nuevo estándar de esquema de firma umbral para su uso en todo internet, en dispositivos de hardware y para otros servicios en los próximos años.


## Implicaciones prácticas

Absolutamente sí. La introducción de FROST en Zcash permitirá que múltiples partes, separadas geográficamente, controlen la autoridad de gasto de ZEC blindado. Las transacciones difundidas utilizando este esquema de firma serán indistinguibles de otras transacciones en la red, manteniendo una fuerte resistencia al rastreo de pagos y limitando la cantidad de datos de la blockchain disponibles para análisis.

En la práctica, esto permite construir una amplia gama de nuevas aplicaciones en la red, que van desde proveedores de escrow hasta otros servicios sin custodia.

FROST también se convertirá en un componente esencial en la emisión y gestión seguras de Zcash Shielded Assets (ZSA), permitiendo una gestión más segura de la autoridad de gasto dentro de organizaciones de desarrollo y custodios de ZEC como los exchanges, al mismo tiempo que proporciona esta capacidad a los usuarios de Zcash.

## Errores comunes

**Confundir FROST con el multisig tradicional on-chain**. El multisig tradicional puede revelar múltiples firmantes o múltiples firmas on-chain. FROST produce una única firma Schnorr agregada, por lo que una transacción es indistinguible de una transacción con una sola firma.

**Suponer que menos que el umbral puede firmar**. Solo un número umbral (t-de-n) de participantes actuando conjuntamente puede producir una firma válida; cualquier grupo más pequeño no puede.

**Suponer que FROST oculta todo off-chain**. FROST protege la firma on-chain, pero la coordinación entre firmantes sigue ocurriendo off-chain y requiere sus propios controles de privacidad y seguridad.


## Páginas relacionadas

- [Halo](/zcash-tech/halo) — el sistema de pruebas recursivo y sin confianza utilizado en el pool Orchard de Zcash.
- [Viewing Keys](/zcash-tech/viewing-keys) — divulgación selectiva para transacciones blindadas.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — donde FROST ayuda a gestionar la autoridad de gasto/emisión.
- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) — otra pieza central de la infraestructura de privacidad de Zcash.


## Más recursos para aprender

[Artículo de Coinbase - Firmas Umbral](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Explicación y ejemplo](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Video corto sobre las firmas digitales Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
