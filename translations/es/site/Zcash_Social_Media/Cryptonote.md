# De cero a conocimiento cero: Protocolo CryptoNote

**Serie:** De cero a conocimiento cero

¡Una interesante hoy!  
El protocolo **CryptoNote** permite una sólida privacidad on-chain. Hoy aprendemos todas sus características clave y cómo ha sido implementado por varios proyectos de privacidad destacados.

![Introducción a CryptoNote](https://pbs.twimg.com/media/FrXr5P8WIAAvx36.jpg)

---

## Antecedentes

El whitepaper original de CryptoNote fue publicado bajo el seudónimo de **"Nicolas van Saberhagen"**.  

**Bytecoin** fue la primera criptomoneda en implementar el protocolo. El proyecto más conocido que lo utiliza hoy es **Monero (XMR)**. También se ha utilizado en TurtleCoin, Aeon y varios otros.

---

## Características principales de CryptoNote

El Protocolo CryptoNote ofrece tres características principales:

1. **No trazabilidad e imposibilidad de vinculación** de las transacciones
2. **Prueba de trabajo igualitaria** (resistente a ASIC) 
3. **Emisión dinámica**

---

## 1. No trazabilidad - Firmas de anillo

La no trazabilidad se logra principalmente mediante **Firmas de Anillo**.

Al enviar una transacción, tu clave pública real se mezcla con varias claves señuelo (el "anillo"), todas con la misma cantidad de monedas. Esto hace extremadamente difícil determinar quién envió realmente las monedas.

El **tamaño del anillo** afecta significativamente el conjunto de anonimato. Los anillos más grandes proporcionan mejor privacidad.

![Explicación de las Firmas de Anillo](https://pbs.twimg.com/media/FrXteGHXgAANE0F.png)

**Comparación con Zcash**:  
El conjunto de anonimato de Zcash es el número total de transacciones realizadas *alguna vez* en un determinado pool blindado (mucho mayor que los tamaños de anillo típicos de CryptoNote).

---

## Ring CT (Transacciones confidenciales)

El modelo **Ring CT** mejoró enormemente la privacidad en las monedas basadas en CryptoNote.

En lugar de ocultar solo al remitente, Ring CT también **ofusca los montos de las transacciones** entre remitente y destinatario.

![Diagrama de Ring CT](https://pbs.twimg.com/media/FrXuivgWYAAze7B.png)

Utiliza:
- Criptografía de curva elíptica
- Compromisos de Pedersen
- Cifrado homomórfico

Se utilizan **pruebas** para demostrar que la cantidad es mayor que 0 y está dentro de rangos válidos **sin revelar los valores reales**.

Las **Direcciones ocultas** también añaden direcciones de un solo uso para el destinatario.

![Direcciones ocultas + Pruebas](https://pbs.twimg.com/media/FrXut5aWAAMhuRb.jpg)

---

## 2. Prueba de trabajo igualitaria (ePoW)

CryptoNote busca crear un sistema de minería más justo al ser resistente a los ASIC.

Utiliza el algoritmo **CryptoNight** (una función memory-hard). A diferencia de SHA256 de Bitcoin, CryptoNight está diseñado para cerrar la brecha entre los mineros de CPU, GPU y ASIC.

**Pasos de CryptoNight:**
1. Inicializar una gran área de memoria (scratchpad) con datos seudoaleatorios
2. Realizar numerosas operaciones de lectura/escritura en el scratchpad
3. Hashear todo el scratchpad para producir el valor final

![Minería con CryptoNight](https://pbs.twimg.com/media/FrXvNs3XsAA37LG.jpg)

(Nota: desde entonces, Monero se ha alejado de CryptoNight y ha pasado a otros algoritmos).

---

## 3. Emisión dinámica

En lugar de eventos repentinos de halving (como Bitcoin), CryptoNote utiliza una **recompensa por bloque que disminuye gradualmente**.

Esto crea una curva de emisión mucho más suave a lo largo del tiempo.

![Curva de emisión dinámica](https://pbs.twimg.com/media/FrXv8wpXoAEjUxW.png)

**Conexión con Zcash**:  
Los desarrolladores de Zcash han debatido implementar en el futuro una curva de emisión más suave, potencialmente mediante un "Zcash Posterity Fund".

---

## Conclusión

CryptoNote ha demostrado ser un enfoque sólido y probado en batalla para la privacidad on-chain. Muchas de sus innovaciones han influido en el ecosistema más amplio de monedas de privacidad.

Algunos investigadores creen que las características de CryptoNote podrían eventualmente combinarse con pools blindados trustless de conocimiento cero.

---

**Hilo original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*Esta página fue compilada a partir del hilo original de Zero to Zero Knowledge para la wiki de ZecHub.*
