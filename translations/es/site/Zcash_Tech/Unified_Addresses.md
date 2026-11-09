# Validación de Dirección Unificada [Unified Address] (ZIP-316)

*Esta es una guía de aprendizaje, no un decodificador empaquetado ni una biblioteca de pagos para copiar y pegar. Explica cómo se estructura una Dirección Unificada para que puedas comprender qué hacen las bibliotecas mantenidas internamente. Para cualquier cosa que maneje fondos reales, remítete a la especificación [ZIP-316](https://zips.z.cash/zip-0316) y a las implementaciones oficiales enlazadas a continuación.*

---

## Panorama general

Una Dirección Unificada (UA) es una única cadena de dirección que contiene varios tipos de receptores [receiver]: **Transparente [Transparent]**, **Sapling**, **Orchard**, o una combinación. La billetera [wallet] que realiza el pago selecciona automáticamente el mejor pool que admite.

Piensa en una UA como un sobre sellado que contiene varias tarjetas etiquetadas. Cada tarjeta representa una forma diferente de llegar a ti. Para comprobar una dirección, una aplicación debe:

1. **Abrir el sobre:** Decodificar la cadena de texto.
2. **Desordenar el contenido:** Deshacer la mezcla protectora (**F4Jumble**).
3. **Leer cada tarjeta:** Extraer los receptores individuales.
4. **Aplicar las reglas del protocolo:** Ignorar o rechazar entradas según su rango de typecode.

---

## Por qué «simplemente decodificar Bech32m» no es suficiente

Una UA utiliza codificación de texto Bech32m, pero decodificar Bech32m por sí solo no revela los receptores utilizables.

ZIP-316 mezcla deliberadamente la carga útil [payload] mediante **F4Jumble** antes de codificarla. F4Jumble garantiza que alterar incluso un solo carácter de la dirección cambie por completo el resultado decodificado. Esto evita ataques de maleabilidad de direcciones, en los que un atacante intercambia bytes en medio de una dirección mientras mantiene el prefijo y el sufijo con apariencia válida.

> **Regla clave:** La protección contra la maleabilidad solo funciona si tu aplicación ejecuta la canalización completa de decodificación y validación. La decodificación parcial elimina la seguridad y mantiene todo el riesgo.

---

## La canalización de decodificación, paso a paso

### Paso 1: Decodificar Bech32m y comprobar la red
- **Parte legible para humanos [Human-readable part] (HRP):** `u` identifica la red principal; `utest` identifica la red de prueba. *(Las UA de la red principal comienzan con `u1`, donde `1` es el separador Bech32.)*
- **Límite de longitud:** Bech32m estándar aplica un límite de 90 caracteres. Las UA suelen superar este límite, por lo que las comprobaciones de longitud estándar deben deshabilitarse en el decodificador.
- Convierte las palabras Bech32m de 5 bits de nuevo a bytes estándar de 8 bits.

### Paso 2: Invertir F4Jumble
F4Jumble es una red de Feistel de 4 rondas construida sobre BLAKE2b:
- **Longitud de la mitad izquierda:** `min(64, floor(length / 2))` bytes. El límite de 64 bytes corresponde al tamaño máximo de salida de BLAKE2b. La mitad derecha contiene la carga útil restante.
- **Funciones hash:** Alterna G y H mediante etiquetas de personalización fijas (`UA_F4Jumble_G` y `UA_F4Jumble_H`).
- **Orden de las rondas:** La codificación hacia adelante ejecuta G(0) → H(0) → G(1) → H(1). La inversión (desmezcla) ejecuta H(1) → G(1) → H(0) → G(0).
- **Comprobación de rango:** Rechaza entradas fuera de los límites de tamaño de carga útil de ZIP-316.

### Paso 3: Eliminar el relleno y verificar el HRP
Antes de mezclar, el codificador añade 16 bytes que contienen el HRP, rellenados con ceros.
- Elimina los 16 bytes finales tras desmezclar.
- Confirma que el HRP incorporado coincide con la red esperada (`u` o `utest`). Esto evita que direcciones de red de prueba sean aceptadas accidentalmente en la red principal.

### Paso 4: Extraer receptores
La carga útil restante consta de entradas `(typecode, length, content)`, donde el typecode y la longitud se almacenan como enteros de tamaño compacto (un solo byte para valores pequeños). Typecodes de receptores conocidos:

| Typecode | Tipo de receptor       | Longitud del contenido |
| :------- | :--------------------- | :--------------------- |
| `0x00`   | Transparente (P2PKH)   | 20 bytes               |
| `0x01`   | Transparente (P2SH)    | 20 bytes               |
| `0x02`   | Sapling                 | 43 bytes               |
| `0x03`   | Orchard                 | 43 bytes               |

Además de estos, ZIP-316 reserva otros dos rangos para compatibilidad futura:

- **`0xC0`–`0xDF` (metadatos de DEBE-entender [MUST-understand] no obligatorios):** Los consumidores deben ignorar los elementos de metadatos que no reconozcan en este rango.
- **`0xE0` y `0xE1` (metadatos de caducidad DEBE-entender asignados):** El registro actual de ZIP-316 los asigna a la altura y hora de caducidad de la dirección. Los consumidores deben comprender estos elementos o rechazar la dirección.
- **`0xE2`–`0xFC` (metadatos DEBE-entender no asignados):** Los consumidores deben rechazar la dirección si encuentran un elemento no reconocido en este rango.

Para tipos de receptores conocidos, verifica que la longitud codificada coincida con la longitud de contenido especificada por el tipo. Para elementos de metadatos, utiliza su longitud codificada de tamaño compacto para determinar la longitud del contenido. Rechaza entradas truncadas o cualquier byte final.

**Orden preferido de receptores.** Una vez que una dirección se analiza correctamente, una billetera o herramienta de pago debe elegir el mejor receptor en este orden: Orchard, luego Sapling y después transparente.

---

## Reglas obligatorias de rechazo de ZIP-316

**Decodificar correctamente no hace válida una dirección.** Las billeteras oficiales de Zcash rechazan estrictamente las direcciones que infringen las siguientes reglas. Las herramientas web también deben rechazarlas para evitar fallos de pago:

- **Receptores blindados [shielded] faltantes:** La dirección **debe** contener al menos un receptor Sapling o Orchard. Una UA con solo receptores transparentes no es válida según ZIP-316.
- **Typecodes duplicados:** Cada tipo de receptor puede aparecer como máximo una vez.
- **Typecodes sin ordenar:** Los receptores deben aparecer en orden estrictamente ascendente de typecode.
- **Receptores transparentes en conflicto:** Una UA puede contener P2PKH o P2SH, pero **nunca ambos**.
- **Entradas o relleno malformados:** Los prefijos de red no coincidentes, las cargas útiles truncadas o las longitudes no coincidentes deben provocar un rechazo inmediato.
- **Typecodes no reconocidos:** Los consumidores deben ignorar los elementos no reconocidos, excepto los elementos del rango de metadatos DEBE-entender (`0xE0`–`0xFC`), que deben rechazar si no los reconocen. En el registro actual, `0xE0` y `0xE1` son tipos de caducidad asignados, mientras que `0xE2`–`0xFC` no están asignados. De forma independiente, rechaza cualquier dirección que no cumpla las reglas obligatorias de validez anteriores, incluido el requisito de un receptor Sapling o Orchard.

---

## Mejores prácticas para desarrolladores

- **Compara receptores analizados, no cadenas sin procesar.** Decodifica primero las direcciones antes de comprobar su igualdad.
- **Utiliza bibliotecas mantenidas para cualquier cosa que maneje fondos.** Compila crates oficiales de Rust (como `zcash_address`) a WebAssembly en lugar de implementar decodificadores personalizados de JavaScript.
- **Ten cuidado con los analizadores escritos a mano.** Si escribes uno para aprender, trátalo como un proyecto de estudio y pruébalo con los vectores oficiales siguientes antes de confiarle cualquier cosa.

---

## Especificaciones oficiales e implementaciones de referencia

- **[ZIP-316: Direcciones Unificadas y claves de visualización](https://zips.z.cash/zip-0316)**
- **[crate zcash_address (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[crate f4jumble (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Vectores de prueba oficiales:**
  - [Vectores de prueba de F4Jumble](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Vectores de prueba de Direcciones Unificadas](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Glosario

| Término | Significado |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Cadena de dirección única que agrupa varios pools de receptores. |
| **Receiver** | Tipo específico de destino de pago (transparente, Sapling o Orchard). |
| **Bech32m** | Esquema de codificación de texto utilizado para cadenas UA. |
| **HRP** | Parte legible para humanos o prefijo de red (`u` o `utest`). |
| **F4Jumble** | Algoritmo de ofuscación reversible que garantiza la integridad de la dirección. |
| **Typecode** | Número de cada entrada que define el tipo de receptor en la carga útil. |
| **Malleability** | Modificación no autorizada de los bytes de una dirección sin detección. |

Consulta también: [Claves de visualización](./Viewing_Keys.md)
