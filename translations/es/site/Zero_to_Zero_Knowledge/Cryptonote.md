# Zero to Zero Knowledge: Protocolo CryptoNote

**Serie:** Zero to Zero Knowledge

¡Uno interesante hoy!  
El protocolo **CryptoNote** permite una sólida privacidad [privacy] on-chain. Hoy aprenderemos todas sus características clave y cómo ha sido implementado por varios proyectos de privacidad destacados.

![CryptoNote intro](/content-images/FrXr5P8WIAAvx36-88db0c8250.webp)

---

## Antecedentes

El whitepaper original de CryptoNote fue publicado bajo el seudónimo **«Nicolas van Saberhagen»**.  

**Bytecoin** fue la primera criptomoneda en implementar el protocolo. El proyecto más conocido que lo utiliza hoy es **Monero (XMR)**. También se ha utilizado en TurtleCoin, Aeon y varios otros.

---

## Características principales de CryptoNote

El protocolo CryptoNote ofrece tres características principales:

1. **Inrastreabilidad e invinculabilidad [Unlinkability]** de las transacciones [transactions]
2. **Prueba [Proof] de Trabajo igualitaria** (resistente a ASIC) 
3. **Emisión dinámica**

---

## 1. Inrastreabilidad - Firmas [Signatures] de anillo

La inrastreabilidad se logra principalmente mediante **firmas de anillo**.

Al enviar una transacción, tu clave pública real se mezcla con varias claves señuelo (el «anillo»), todas con la misma cantidad de monedas. Esto hace que sea extremadamente difícil determinar quién envió realmente las monedas.

El **tamaño del anillo** afecta significativamente al conjunto de anonimato. Los anillos más grandes proporcionan mejor privacidad.

![Ring Signatures explanation](/content-images/FrXteGHXgAANE0F-f11593a0d9.webp)

**Comparación con Zcash**:  
El conjunto de anonimato de Zcash es el número total de transacciones realizadas *alguna vez* en un pool blindado [shielded] determinado (mucho mayor que los tamaños típicos de los anillos de CryptoNote).

---

## Ring CT (Transacciones confidenciales)

El modelo **Ring CT** mejoró enormemente la privacidad en las monedas basadas en CryptoNote.

En lugar de ocultar únicamente al remitente, Ring CT también **ofusca los importes de las transacciones** entre el remitente y el destinatario.

![Ring CT diagram](/content-images/FrXuivgWYAAze7B-260071c1b3.webp)

Utiliza:
- Criptografía de curva elíptica
- Compromisos [Commitments] de Pedersen
- Cifrado [Encryption] homomórfico

Las **pruebas** se utilizan para demostrar que el importe es mayor que 0 y está dentro de rangos válidos **sin revelar los valores reales**.

Las **direcciones [Addresses] furtivas** también añaden direcciones de un solo uso para el destinatario.

![Stealth Addresses + Proofs](/content-images/FrXut5aWAAMhuRb-f3ce8ea3fd.webp)

---

## 2. Prueba de Trabajo igualitaria (ePoW)

CryptoNote busca crear un sistema de minado [mining] más justo al ser resistente a los ASIC.

Utiliza el algoritmo **CryptoNight** (una función intensiva en memoria). A diferencia de SHA256 de Bitcoin, CryptoNight está diseñado para reducir la brecha entre los mineros [miners] de CPU, GPU y ASIC.

**Pasos de CryptoNight:**
1. Inicializar una gran área de memoria (scratchpad) con datos seudoaleatorios
2. Realizar numerosas operaciones de lectura/escritura en el scratchpad
3. Aplicar hash a todo el scratchpad para producir el valor final

![CryptoNight mining](/content-images/FrXvNs3XsAA37LG-5779657f5c.webp)

(Nota: Monero desde entonces ha dejado CryptoNight para utilizar otros algoritmos.)

---

## 3. Emisión dinámica

En lugar de eventos repentinos de halving (como Bitcoin), CryptoNote utiliza una **recompensa de bloque [block] que disminuye gradualmente**.

Esto crea una curva de emisión mucho más fluida con el tiempo.

![Dynamic emission curve](/content-images/FrXv8wpXoAEjUxW-e2bbaebced.webp)

**Conexión con Zcash**:  
Los desarrolladores [developers] de Zcash han debatido implementar una curva de emisión más fluida en el futuro, potencialmente mediante un «Fondo de Posteridad Zcash».

---

## Conclusión

CryptoNote ha demostrado ser un enfoque sólido y probado en batalla para la privacidad on-chain. Muchas de sus innovaciones han influido en el ecosistema más amplio de las monedas de privacidad.

Algunos investigadores creen que las características de CryptoNote podrían eventualmente combinarse con pools blindados zero-knowledge sin necesidad de confianza.

---

**Hilo original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*Esta página fue recopilada a partir del hilo original de Zero to Zero Knowledge para la wiki de ZecHub.*
