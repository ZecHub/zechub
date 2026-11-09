# Zero to Zero Knowledge: Frases semilla [Mnemonic Seed Phrases] mnemónicas

**Serie:** Zero to Zero Knowledge

Las frases semilla mnemónicas sustentan uno de los aspectos más importantes de las criptomonedas: la **autocustodia [self-custody]**.  
Hoy aprenderemos cómo se genera y utiliza una frase semilla en las billeteras [wallets].

---

## ¿Qué son las frases semilla mnemónicas?

Las frases de recuperación [Recovery phrases] están definidas por la especificación **BIP-39**, el tipo de frase de recuperación más común utilizado actualmente.

La creación de frases de recuperación comienza generando **aleatoriedad [randomness]**. Una mayor entropía significa mayor seguridad. Se considera que **128 bits** de entropía son suficientes para la mayoría de los usuarios.

![Seed phrase concept](/content-images/FooM3qWWACgrwzn-f222c4081f.webp)

Según la longitud de la entropía inicial, la frase de recuperación tendrá entre **12 y 24 palabras**.

---

## Paso a paso: cómo se genera una frase semilla de 12 palabras

### 1. Generar entropía
Comenzamos generando **128 bits** de entropía.

### 2. Añadir suma de comprobación
Aplicamos hash a la entropía mediante **SHA256**. Los primeros bits de este hash se convierten en la suma de comprobación [checksum].  
Esto nos proporciona una huella digital única para nuestra entropía.

![Entropy + Checksum diagram](/content-images/FooNoOEXgAAu-g6-613238fa7e.webp)

### 3. Dividir en bloques de 11 bits
Los 132 bits totales (128 de entropía + 4 de suma de comprobación) se separan en bloques de 11 bits.

### 4. Asignar a la lista de palabras
Cada secuencia de 11 bits se convierte en un número decimal (0-2047).  
Las listas de palabras BIP-39 contienen exactamente **2048 palabras** (inglés, español, chino, etc.).

Estos números se utilizan para encontrar la palabra correspondiente en la lista de palabras.

![Word mapping example](/content-images/FooN9rfXEBoQuU2-d11331fc0a.webp)

**Resultado:** ¡Ahora tenemos una frase de recuperación segura y legible por humanos de 12 palabras!

---

## De la frase de recuperación -> semilla -> direcciones de pago

Mediante la frase de recuperación, una billetera puede generar claves para crear direcciones de pago y diferentes cuentas de billetera.

Las claves generadas son **deterministas [deterministic]**: la misma entrada siempre produce la misma salida.

### Generación de semilla
La semilla de la billetera se deriva de la frase mnemónica mediante una **función de derivación de claves [Key Derivation Function (KDF)]**:

- En **Bitcoin**: PBKDF2  
- En **Zcash**: Blake2b-256/512

Esto produce una semilla de **64 bytes (512 bits)**.

![Seed to master keys](/content-images/FooOuumXEAgcBm1-dc7c66b84a.webp)

### Claves maestras
La semilla se divide en dos secuencias de 32 bytes:
- **Clave maestra de gasto [Master Spending Key]**
- **Código de cadena maestro [Master Chain Code]**

Estas se utilizan en las **billeteras deterministas jerárquicas [Hierarchical Deterministic (HD) Wallets]** para la derivación de claves secundarias.

---

## Características específicas de Zcash (ZIP-32)

En Zcash, la **autoridad de visualización [viewing authority]** o la **autoridad de gasto [spending authority]** puede delegarse de forma independiente para subárboles sin comprometer la semilla maestra.

**ZIP-32** define el estándar de generación jerárquica determinista de claves adaptado a las características de privacidad de Zcash.

A partir de una **clave de gasto expandida [Expanded Spending Key]** derivamos:
- Full Viewing Key
- Incoming Viewing Key
- Conjunto de direcciones de pago

Distintos mecanismos de derivación producen direcciones externas adecuadas para proporcionar a los remitentes en los pools blindados [shielded pools] (Sapling y Orchard).

![Zcash key derivation hierarchy](/content-images/FooPKd4XEBUQhJ6-af133c01bf.webp)

Zcash también admite **direcciones internas [internal addresses]** para operaciones de billetera como el blindaje automático [Auto-Shielding].

---

## Recursos

- [ZIP-32: Billeteras deterministas jerárquicas blindadas Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032)  
- [Zcash Especificación del protocolo [Protocol Specification] (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Descripción general de las billeteras blindadas por defecto Shielded-by-default wallets overview](https://zechub.wiki)

---

**Hilo original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*Esta página fue recopilada a partir del hilo original de Zero to Zero Knowledge para la wiki de ZecHub.*
