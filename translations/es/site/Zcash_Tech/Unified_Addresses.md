# Unified Address (ZIP-316) Validación

*Esta es una guía de aprendizaje, no un decodificador empaquetado ni una biblioteca de pagos para copiar y pegar. Explica cómo se estructura una Unified Address para que puedas entender qué hacen internamente las bibliotecas mantenidas. Para cualquier cosa que gestione fondos reales, consulta la especificación de [ZIP-316](https://zips.z.cash/zip-0316) y las implementaciones oficiales enlazadas a continuación.*

---

## Panorama general

Una Unified Address (UA) es una única cadena de dirección que contiene varios tipos de receptores: **Transparent**, **Sapling**, **Orchard** o una combinación. La wallet que realiza el pago selecciona automáticamente el mejor pool de receptores que admita.

Piensa en una UA como un sobre sellado que contiene varias tarjetas etiquetadas. Cada tarjeta representa una forma distinta de llegar hasta ti. Para comprobar una dirección, una aplicación debe:

1. **Abrir el sobre:** Decodificar la cadena de texto.
2. **Desordenar el contenido:** Deshacer la mezcla protectora (**F4Jumble**).
3. **Leer cada tarjeta:** Extraer receptores individuales.
4. **Aplicar las reglas del protocolo:** Ignorar o rechazar entradas según el rango de su typecode.

---

## Por qué no basta con «simplemente decodificar Bech32m»

Una UA utiliza la codificación de texto Bech32m, pero decodificar Bech32m por sí solo no revela los receptores utilizables.

ZIP-316 mezcla deliberadamente la carga útil mediante **F4Jumble** antes de codificarla. F4Jumble garantiza que alterar incluso un solo carácter de la dirección cambie por completo la salida decodificada. Esto evita ataques de maleabilidad de direcciones, en los que un atacante intercambia bytes en medio de una dirección mientras el prefijo y el sufijo siguen pareciendo válidos.

> **Regla clave:** La protección contra la maleabilidad solo funciona si tu aplicación ejecuta la canalización completa de decodificación y validación. La decodificación parcial elimina la seguridad y mantiene todo el riesgo.

---

## La canalización de decodificación, paso a paso

### Paso 1: Decodificar Bech32m y comprobar la red
- **Parte legible para humanos (HRP):** `u` identifica mainnet; `utest` identifica testnet. *(Las UA de mainnet comienzan con `u1`, donde `1` es el separador Bech32.)*
- **Límite de longitud:** Bech32m estándar aplica un límite de 90 caracteres. Las UA normalmente superan este límite, por lo que las comprobaciones de longitud estándar deben desactivarse en el decodificador.
- Convierte las palabras Bech32m de 5 bits de nuevo en bytes estándar de 8 bits.

### Paso 2: Invertir F4Jumble
F4Jumble es una red Feistel de 4 rondas basada en BLAKE2b:
- **Longitud de la mitad izquierda:** `min(64, floor(length / 2))` bytes. El límite de 64 bytes corresponde al tamaño máximo de salida de BLAKE2b. La mitad derecha contiene la carga útil restante.
- **Funciones hash:** Alterna G y H mediante etiquetas de personalización fijas (`UA_F4Jumble_G` y `UA_F4Jumble_H`).
- **Orden de las rondas:** La codificación directa ejecuta G(0) → H(0) → G(1) → H(1). La inversión (desmezcla) ejecuta H(1) → G(1) → H(0) → G(0).
- **Comprobación de rango:** Rechaza entradas fuera de los límites de tamaño de carga útil de ZIP-316.

### Paso 3: Eliminar el relleno y verificar el HRP
Antes de mezclar, el codificador añade 16 bytes que contienen el HRP, rellenados con ceros.
- Elimina los 16 bytes finales después de desmezclar.
- Confirma que el HRP incorporado coincide con la red esperada (`u` o `utest`). Esto evita que direcciones de testnet se acepten accidentalmente en mainnet.

### Paso 4: Extraer receptores
La carga útil restante consta de entradas `(typecode, length, content)`, donde el typecode y la longitud se almacenan como enteros de tamaño compacto (un solo byte para valores pequeños). Typecodes de receptores conocidos:

| Typecode | Tipo de receptor       | Longitud del contenido |
| :------- | :--------------------- | :--------------------- |
| `0x00`   | Transparent (P2PKH)    | 20 bytes               |
| `0x01`   | Transparent (P2SH)     | 20 bytes               |
| `0x02`   | Sapling                | 43 bytes               |
| `0x03`   | Orchard                | 43 bytes               |

Además de estos, ZIP-316 reserva dos rangos adicionales para compatibilidad futura:

- **`0xC0`–`0xDF` (metadatos que no son MUST-understand):** los consumidores deben ignorar los elementos de metadatos que no reconozcan en este rango.
- **`0xE0` y `0xE1` (metadatos de expiración MUST-understand asignados):** el registro actual de ZIP-316 los asigna a la altura y hora de expiración de la dirección. Los consumidores deben entender estos elementos o rechazar la dirección.
- **`0xE2`–`0xFC` (metadatos MUST-understand sin asignar):** los consumidores deben rechazar la dirección si encuentran un elemento no reconocido en este rango.

Para tipos de receptores conocidos, verifica que la longitud codificada coincida con la longitud de contenido especificada para el tipo. Para elementos de metadatos, usa su longitud codificada de tamaño compacto para determinar la longitud del contenido. Rechaza entradas truncadas o cualquier byte adicional al final.

**Orden de receptores preferido.** Una vez que una dirección se analiza correctamente, una wallet o herramienta de pago debe elegir el mejor receptor en este orden: Orchard, luego Sapling y después transparent.

---

## Reglas obligatorias de rechazo de ZIP-316

**Decodificar correctamente no hace que una dirección sea válida.** Las wallets oficiales de Zcash rechazan estrictamente las direcciones que infringen las siguientes reglas. Las herramientas web también deben rechazarlas para evitar fallos en los pagos:

- **Receptores blindados ausentes:** La dirección **debe** contener al menos un receptor Sapling o Orchard. Una UA con solo receptores transparent no es válida según ZIP-316.
- **Typecodes duplicados:** Cada tipo de receptor puede aparecer como máximo una vez.
- **Typecodes sin ordenar:** Los receptores deben aparecer en orden de typecode estrictamente ascendente.
- **Receptores transparent en conflicto:** Una UA puede contener P2PKH o P2SH, pero **nunca ambos**.
- **Entradas o relleno malformados:** Los prefijos de red no coincidentes, las cargas útiles truncadas o las longitudes no coincidentes deben provocar un rechazo inmediato.
- **Typecodes no reconocidos:** Los consumidores deben ignorar los elementos no reconocidos, excepto los elementos del rango de metadatos MUST-understand (`0xE0`–`0xFC`), que deben rechazar cuando no los reconozcan. En el registro actual, `0xE0` y `0xE1` son tipos de expiración asignados, mientras que `0xE2`–`0xFC` no están asignados. Independientemente de ello, rechaza cualquier dirección que no cumpla las reglas de validez obligatorias anteriores, incluido el requisito de contar con un receptor Sapling o Orchard.

---

## Prácticas recomendadas para desarrolladores

- **Compara receptores analizados, no cadenas sin procesar.** Decodifica primero las direcciones antes de comprobar la igualdad.
- **Usa bibliotecas mantenidas para cualquier cosa que gestione fondos.** Compila crates oficiales de Rust (como `zcash_address`) en WebAssembly en lugar de implementar decodificadores personalizados de JavaScript.
- **Ten cuidado con los analizadores escritos a mano.** Si escribes uno para aprender, trátalo como un proyecto de estudio y pruébalo con los vectores oficiales de abajo antes de confiarle nada.

---

## Especificaciones oficiales e implementaciones de referencia

- **[ZIP-316: Direcciones unificadas y claves de visualización](https://zips.z.cash/zip-0316)**
- **[crate zcash_address (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[crate f4jumble (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Vectores de prueba oficiales:**
  - [Vectores de prueba de F4Jumble](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Vectores de prueba de Unified Address](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Glosario

| Término | Significado |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Cadena de dirección única que agrupa varios pools de receptores. |
| **Receiver** | Tipo de destino de pago específico (transparent, Sapling o Orchard). |
| **Bech32m** | Esquema de codificación de texto utilizado para cadenas UA. |
| **HRP** | Parte legible para humanos o prefijo de red (`u` o `utest`). |
| **F4Jumble** | Algoritmo de ofuscación reversible que garantiza la integridad de la dirección. |
| **Typecode** | Número en cada entrada que define el tipo de receptor en la carga útil. |
| **Malleability** | Modificación no autorizada de los bytes de una dirección sin detección. |

Véase también: [Claves de visualización](./Viewing_Keys.md)
