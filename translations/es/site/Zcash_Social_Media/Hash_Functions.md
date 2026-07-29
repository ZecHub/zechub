# De cero a conocimiento cero: Funciones hash

**Introducción de la serie**  
¡Bienvenidos a una nueva serie: **De cero a conocimiento cero**!  

En esta serie aprenderemos los fundamentos de una amplia gama de tecnologías que forman parte de nuestros protocolos de preservación de la privacidad.

---

## Parte 1: Funciones hash

Hoy comenzamos con las **Funciones hash**, una pieza clave de la criptografía utilizada en las blockchains. Más adelante en esta serie cubriremos algunos temas que dependen de sus propiedades.

### ¿Qué es una función hash?

Las funciones hash toman una entrada de cualquier longitud y producen una salida de longitud fija.

- **Mensaje al que se le aplicará hash** = Entrada  
- **El algoritmo que se utiliza** = Función hash  
- **Salida resultante** = Valor hash  


![Diagrama de función hash](https://pbs.twimg.com/media/Fn_NkFHXgAEtgse.png)

### ¡Pruébalo tú mismo!

¡Vamos a entenderlo de forma práctica usando esta herramienta!  
Introduce cualquier texto arbitrario para producir una salida de longitud fija. Observa cómo varía la salida según el diferente algoritmo de hash.

**Pruébalo:** https://cryptii.com/pipes/hash-function

---

### Propiedades de las funciones hash criptográficas

Las funciones hash criptográficas deben tener estas **3 propiedades**:

1. **Unidireccionales** - Debe ser inviable revertir una función hash  
2. **Resistentes a colisiones** - Dos entradas diferentes no deben producir la misma salida hash  
3. **Determinísticas** - Para cualquier entrada, una función hash siempre debe dar el mismo resultado

---

### Funciones hash comunes

Existen varias clases de funciones hash. Algunos ejemplos:

- Secure Hashing Algorithm (**SHA-3**)  
- Message Digest Algorithm 5 (**MD5**)  
- **BLAKE2b** - Utilizada en la derivación de claves de Zcash

**Una introducción a BLAKE2 por Zooko**: https://www.zfnd.org/blog/blake2/

---

### Usos reales de las funciones hash

#### 1. Hash de integridad (comprobaciones de integridad de datos)
Las comprobaciones de integridad de datos son un ejemplo de "Hash de integridad". Se utilizan para generar sumas de verificación en archivos de datos y proporcionar al usuario una garantía de corrección.

![Ejemplo de hash de integridad](https://pbs.twimg.com/media/Fn_Or0MWIAI6sgx.png)

#### 2. Árboles de Merkle (árboles hash)
Un **árbol hash** o **árbol de Merkle** está compuesto por ramas y nodos hoja que están etiquetados con el hash criptográfico de un bloque de datos.

![Diagrama de árbol de Merkle](https://pbs.twimg.com/media/Fn_O7ndWIAY5PA-.jpg)

Los árboles de Merkle son un ejemplo de un **esquema de compromiso criptográfico**. La raíz del árbol se considera un compromiso y se demuestra que los nodos hoja forman parte del compromiso original.

Verifican los datos almacenados o transferidos en redes P2P, garantizando que los datos recibidos de los pares no hayan sido alterados.

#### 3. Árbol de compromiso de notas en Zcash
En los pools blindados de Zcash **Sapling** y **Orchard**, el **Árbol de compromiso de notas** se utiliza para verificar que las transacciones sean válidas según el consenso mientras oculta perfectamente el remitente, el destinatario y las cantidades consumidas.

#### 4. Hash de firma (bloques al estilo Bitcoin)
**SHA256** es un ejemplo de "Hash de firma" utilizado para hacer cumplir la inmutabilidad de cada bloque en la cadena de Bitcoin. Los mineros utilizan el hash del bloque anterior + un hash de todas las transacciones del bloque actual (`hashMerkleRoot`) + marca de tiempo + valor aleatorio / dificultad de la red para los nuevos bloques.

![Diagrama de bloque SHA256](https://pbs.twimg.com/media/Fn_PaVZXoAApHPf.jpg)

#### 5. Equihash (minería de Zcash)
**Equihash** es el algoritmo hash utilizado en la minería de Zcash. También lo utilizan redes como Komodo y Horizen.

**Blog original de Zcash sobre Equihash**: https://electriccoin.co/blog/equihash/

---

### Lectura adicional

Para desarrollar una mayor comprensión de los diferentes tipos de funciones hash y sus usos asociados, este es un recurso excelente:  
https://en.wikipedia.org/wiki/Hash_function

---

**Hilo de ZecHub (@ZecHub)**  
Hilo original en X: https://x.com/ZecHub/status/1621240109663227906  

---

*Esta página fue compilada a partir del hilo original de Zero to Zero Knowledge para la wiki de ZecHub.*
