# De cero a conocimiento cero: Frases semilla mnemotécnicas

**Serie:** De cero a conocimiento cero

Las frases semilla mnemotécnicas sustentan uno de los aspectos más importantes de las criptomonedas: la **autocustodia**.  
Hoy aprenderemos cómo se genera y se utiliza una frase semilla en las wallets.

---

## ¿Qué son las frases semilla mnemotécnicas?

Las frases de recuperación están definidas por la especificación **BIP-39**, el tipo de frase de recuperación más común utilizado hoy en día.

La creación de frases de recuperación comienza generando **aleatoriedad**. Más entropía significa mayor seguridad. Se considera que **128 bits** de entropía son suficientes para la mayoría de los usuarios.

![Concepto de frase semilla](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

Dependiendo de la longitud de la entropía inicial, la frase de recuperación tendrá entre **12 y 24 palabras**.

---

## Paso a paso: cómo se genera una frase semilla de 12 palabras

### 1. Generar entropía
Comenzamos generando **128 bits** de entropía.

### 2. Añadir checksum
Aplicamos hash a la entropía usando **SHA256**. Los primeros bits de este hash se convierten en el checksum.  
Esto nos da una huella única para nuestra entropía.

![Diagrama de entropía + checksum](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. Dividir en fragmentos de 11 bits
Los 132 bits totales (128 de entropía + 4 de checksum) se separan en fragmentos de 11 bits.

### 4. Asignar a la lista de palabras
Cada secuencia de 11 bits se convierte en un número decimal (0-2047).  
Las listas de palabras BIP-39 contienen exactamente **2048 palabras** (inglés, español, chino, etc.).

Estos números se utilizan para encontrar la palabra correspondiente en la lista de palabras.

![Ejemplo de asignación de palabras](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

**Resultado:** ¡Ahora tenemos una frase de recuperación segura, legible para humanos y de 12 palabras!

---

## De frase de recuperación -> seed -> direcciones de pago

Usando la frase de recuperación, una wallet puede generar claves para crear direcciones de pago y diferentes cuentas de wallet.

Las claves generadas son **determinísticas**: la misma entrada siempre produce la misma salida.

### Generación de la seed
La seed de la wallet se deriva de la frase mnemotécnica usando una **Key Derivation Function (KDF)**:

- En **Bitcoin**: PBKDF2  
- En **Zcash**: Blake2b-256/512

Esto produce una seed de **64 bytes (512 bits)**.

![De seed a claves maestras](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### Claves maestras
La seed se divide en dos secuencias de 32 bytes:
- **Master Spending Key**
- **Master Chain Code**

Estas se utilizan en las **Hierarchical Deterministic (HD) Wallets** para la derivación de claves hijas.

---

## Funcionalidades específicas de Zcash (ZIP-32)

En Zcash, la **autoridad de visualización** o la **autoridad de gasto** pueden delegarse de forma independiente para subárboles sin comprometer la seed maestra.

**ZIP-32** define el estándar de generación jerárquica determinística de claves adaptado a las funciones de privacidad de Zcash.

A partir de una **Expanded Spending Key** derivamos:
- Full Viewing Key
- Incoming Viewing Key
- Conjunto de direcciones de pago

Diferentes mecanismos de derivación producen direcciones externas adecuadas para entregarlas a remitentes a través de pools blindados (Sapling y Orchard).

![Jerarquía de derivación de claves de Zcash](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

Zcash también admite **direcciones internas** para operaciones de wallet como el Auto-Shielding.

---

## Recursos

- [ZIP-32: Wallets blindadas jerárquicas determinísticas](https://zips.z.cash/zip-0032)  
- [Especificación del protocolo de Zcash (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Resumen de wallets blindadas por defecto](https://zechub.wiki)

---

**Hilo original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*Esta página fue compilada a partir del hilo original de Zero to Zero Knowledge para la wiki de ZecHub.*
