<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## Resumen

* FROST (Firmas de umbral Schnorr flexibles y optimizadas por rondas [Flexible Round-Optimised Schnorr Threshold Signatures]) es un protocolo de firma de umbral [threshold signature] y generación distribuida de claves: varios firmantes poseen cada uno una parte de una clave privada común, y un número umbral de ellos debe cooperar para producir una firma.
* Dado que el resultado es una única firma Schnorr, una transacción realizada de esta forma parece una transacción ordinaria en la red.
* Requiere rondas mínimas de comunicación, puede ejecutarse en paralelo e identificar y excluir a un participante que se comporte incorrectamente.
* Para Zcash, esto significa que FROST permite a múltiples partes geográficamente separadas controlar la autoridad de gasto de los ZEC blindados [shielded] — útil para custodia, depósito en garantía, servicios sin custodia y Zcash Shielded Assets (ZSA).
* Fue creado por Chelsea Komlo (University of Waterloo, Zcash Foundation) e Ian Goldberg (University of Waterloo).

## Explicación principal

### ¿Qué es una firma Schnorr?

Una firma digital Schnorr es un conjunto de algoritmos: (KeyGen, Sign, Verify).

Las firmas Schnorr tienen varias ventajas. Una ventaja clave es que, cuando se utilizan múltiples claves para firmar el mismo mensaje, las firmas resultantes se pueden combinar en una única firma. Esto puede reducir significativamente el tamaño de los pagos multifirma y otras transacciones relacionadas con multifirma.

### ¿Qué es FROST?

**Firmas de Umbral Schnorr Flexibles Optimizadas por Rondas** -
*Creado por Chelsea Komlo (Universidad de Waterloo, Zcash Foundation) e Ian Goldberg (Universidad de Waterloo).*

FROST es un protocolo de firma de umbral y generación distribuida de claves que requiere un número mínimo de rondas de comunicación y puede ejecutarse en paralelo. El protocolo FROST es una versión de umbral del esquema de firma Schnorr.

A diferencia de las firmas en un entorno de una sola parte, las firmas de umbral requieren cooperación entre un número umbral de firmantes, cada uno con una parte de una clave privada común.

[¿Qué son las firmas de umbral? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Por consiguiente, generar firmas en un entorno de umbral genera sobrecarga debido a las rondas de red entre firmantes, lo que resulta costoso cuando las partes secretas se almacenan en dispositivos con limitaciones de red o cuando la coordinación ocurre a través de redes poco fiables.

La sobrecarga de red durante las operaciones de firma se reduce mediante el uso de una técnica novedosa que protege contra ataques de falsificación y también es aplicable a otros esquemas.

FROST mejora los protocolos de firma de umbral al permitir que un número ilimitado de operaciones de firma se realice de forma segura en paralelo (concurrencia).

Puede utilizarse como un protocolo de 2 rondas, en el que los firmantes envían y reciben 2 mensajes en total, o como un protocolo de firma optimizado de una sola ronda con una etapa de preprocesamiento.

FROST logra sus mejoras de eficiencia, en parte, al permitir que el protocolo se aborte en presencia de un participante que se comporte incorrectamente, quien luego se identifica y excluye de operaciones futuras.

Las pruebas de seguridad que demuestran que FROST es seguro contra ataques de mensajes elegidos, suponiendo que el problema del logaritmo discreto es difícil y que el adversario controla menos participantes que el umbral, se proporcionan [aquí](https://eprint.iacr.org/2020/852.pdf#page=16).

### ¿Cómo funciona FROST?

El protocolo FROST contiene dos componentes importantes:

Primero, n participantes ejecutan un protocolo de generación distribuida de claves (DKG) para generar una clave de verificación común. Al final, cada participante obtiene una parte de clave secreta privada y una parte de clave de verificación pública.

Posteriormente, cualesquiera t de n participantes pueden ejecutar un protocolo de firma de umbral para generar colaborativamente una firma Schnorr válida.

<a href="">
    <img src="/content-images/1634081807-frost-flexible-round-optimize-3697a713d9.webp" alt="" width="400" height="300"/>
</a>

## Visual / Analogía

Piensa en FROST como una caja de seguridad que solo se abre cuando varios titulares autorizados de llaves giran sus llaves juntos, pero no se requiere que participen todos los titulares; basta con un número determinado de ellos (por ejemplo, cualesquiera 3 de 5). Una vez abierta la caja, un observador externo no puede saber qué titulares de llaves participaron, ni siquiera que intervino más de uno. Del mismo modo, un grupo puede autorizar conjuntamente una transacción Zcash mientras la red solo ve una firma de apariencia ordinaria.

## Análisis detallado

**Generación distribuida de claves (DKG)**

El objetivo de esta fase es generar partes de claves secretas duraderas y una clave de verificación conjunta. Esta fase es ejecutada por n participantes.

FROST construye su propia fase de generación de claves sobre el DKG de Pedersen (GJKR03), que utiliza tanto el intercambio de secretos de Shamir como los esquemas de intercambio verificable de secretos de Feldman como subrutinas. Además, cada participante debe demostrar el conocimiento de su propio secreto enviando una prueba zero-knowledge [zero-knowledge proof] a los demás participantes, que en sí misma es una firma Schnorr. Este paso adicional protege contra ataques de claves maliciosas cuando t ≥ n/2.

Al final del protocolo DKG, se genera una clave de verificación conjunta vk. Cada participante Pᵢ posee un valor (i, skᵢ ) que es su parte secreta duradera y una parte de clave de verificación vkᵢ = skᵢ *G. La parte de clave de verificación vkᵢ del participante Pᵢ es utilizada por otros participantes para verificar la corrección de las partes de firma de Pᵢ durante la fase de firma, mientras que la clave de verificación vk es utilizada por partes externas para verificar las firmas emitidas por el grupo.

**Firma de umbral**

Esta fase se basa en técnicas conocidas que emplean el intercambio aditivo de secretos y la conversión de partes para generar de forma no interactiva el nonce de cada firma. También aprovecha técnicas de vinculación para evitar ataques de falsificación conocidos sin limitar la concurrencia.

En la etapa de preprocesamiento, cada participante prepara un número fijo de pares de puntos de Curva Elíptica (EC) para su uso posterior. Esta etapa se ejecuta una vez para múltiples fases de firma de umbral.

<a href="">
    <img src="/content-images/preprocess-5cbb14f892.webp" alt="" width="400" height="300"/>
</a>

Ronda de firma 1: Cada participante Pᵢ comienza generando un único par de nonce privado (dᵢ, eᵢ) y el par correspondiente de puntos EC (Dᵢ, Eᵢ), y luego transmite este par de puntos a todos los demás participantes. Cada participante almacena estos pares de puntos EC para su uso posterior. Las rondas de firma 2 y 3 son las operaciones reales en las que t de n participantes cooperan para crear una firma Schnorr válida.

Ronda de firma 2: Los participantes trabajan juntos para crear una firma Schnorr válida. La técnica central detrás de esta ronda es el intercambio aditivo de secretos t de t.

Este paso evita ataques de falsificación porque los atacantes no pueden combinar partes de firma entre operaciones de firma distintas ni permutar el conjunto de firmantes o los puntos publicados para cada firmante.

<a href="">
    <img src="/content-images/sign-402794d36a.webp" alt="" width="400" height="300"/>
</a>

Una vez calculado el desafío c, cada participante puede calcular la respuesta zᵢ utilizando los nonces de un solo uso y las partes secretas a largo plazo, que son partes secretas de Shamir t de n (grado t-1) de la clave duradera del grupo. Al final de la ronda de firma 2, cada participante transmite zᵢ a los demás participantes.

[Lee el documento completo](https://eprint.iacr.org/2020/852.pdf)

### Uso de FROST en el ecosistema más amplio

**FROST en [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Para mejorar la eficiencia de los sistemas de firma de umbral de Coinbase, desarrollaron una versión de FROST. Esta implementación de Coinbase introduce pequeños cambios respecto al borrador original de FROST.

Optaron por no utilizar el rol de agregador de firmas. En su lugar, cada participante es un agregador de firmas. Este diseño es más seguro: todos los participantes en el protocolo verifican los cálculos de los demás, logrando así un mayor nivel de seguridad y reduciendo el riesgo. También se eliminó la etapa única de preprocesamiento para acelerar la implementación, utilizando en su lugar una tercera ronda de firma.

---

**[ROAST](https://eprint.iacr.org/2022/550.pdf) por Blockstream**

Se propone una mejora específica para aplicaciones de FROST para su uso en [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) para Bitcoin.

«ROAST es un envoltorio simple para esquemas de firma de umbral como FROST. Garantiza que un cuórum de firmantes honestos, por ejemplo, los operadores de Liquid, siempre pueda obtener una firma válida incluso en presencia de firmantes disruptivos cuando las conexiones de red tienen una latencia arbitrariamente alta».

---

**FROST en IETF**

El Internet Engineering Task Force, fundado en 1986, es la principal organización de desarrollo de estándares para Internet. El IETF desarrolla estándares voluntarios que suelen ser adoptados por usuarios de Internet, operadores de red y proveedores de equipos, ayudando a configurar la trayectoria de Internet.

La versión 11 de FROST (variante de dos rondas) ha sido [enviada a IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Este es un paso importante hacia la evaluación completa de FROST como un nuevo estándar de esquema de firma de umbral para su uso en Internet, en dispositivos de hardware y para otros servicios en los próximos años.


## Implicaciones prácticas

Absolutamente sí. La introducción de FROST en Zcash permitirá que múltiples partes, separadas geográficamente, controlen la autoridad de gasto de ZEC blindados. Las transacciones transmitidas utilizando este esquema de firma serán indistinguibles de otras transacciones en la red, manteniendo una fuerte resistencia al seguimiento de pagos y limitando la cantidad de datos de blockchain disponibles para análisis.

En la práctica, esto permite construir una amplia variedad de nuevas aplicaciones en la red, desde proveedores de depósito en garantía hasta otros servicios sin custodia.

FROST también se convertirá en un componente esencial para la emisión y gestión seguras de Zcash Shielded Assets (ZSA), permitiendo una gestión más segura de la autoridad de gasto dentro de las organizaciones de desarrollo y los custodios ZEC, como los exchanges, al tiempo que proporciona esta capacidad a los usuarios de Zcash.

## Errores comunes

**Confundir FROST con multifirma on-chain tradicional**. La multifirma tradicional puede revelar múltiples firmantes o múltiples firmas on-chain. FROST produce una única firma Schnorr agregada, por lo que una transacción es indistinguible de una transacción con una sola firma.

**Suponer que pueden firmar menos participantes que el umbral**. Solo un número umbral (t de n) de participantes que actúan conjuntamente puede producir una firma válida; cualquier grupo menor no puede hacerlo.

**Suponer que FROST oculta todo off-chain**. FROST protege la firma on-chain, pero la coordinación entre firmantes sigue ocurriendo off-chain y requiere sus propios controles de privacidad y seguridad.


## Páginas relacionadas

- [Halo](/zcash-tech/halo) — el sistema de pruebas recursivo y sin confianza utilizado en el pool Orchard de Zcash.
- [Claves de visualización](/zcash-tech/viewing-keys) — divulgación selectiva para transacciones blindadas.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — donde FROST ayuda a gestionar la autoridad de gasto/emisión.
- [Zcash Sincronización de billeteras](/zcash-tech/zcash-wallet-syncing) — otra pieza fundamental de la infraestructura de privacidad de Zcash.


## Más información

[Coinbase Artículo - Firmas de umbral](https://www.coinbase.com/blog/threshold-digital-signatures)

[Intercambio de secretos de Shamir - Explicación y ejemplo](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Vídeo corto sobre firmas digitales Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
