# Detección de pagos blindados: cuánto cuesta escanear

Una empresa que acepta ZEC blindado tiene que encontrar los pagos entrantes. En el pool transparente, basta con una consulta al índice. En los pools blindados, nadie puede indexar los pagos por dirección, así que la billetera o el backend debe comprobar cada salida blindada de la red con sus propias claves. Esta página explica cómo funciona, cuánto cuesta y cómo elegir un diseño de cuentas que mantenga los costos bajo control.

## En resumen

* El costo de detectar pagos blindados aumenta con el número de **claves de visualización** que supervisas, no con el número de direcciones que entregas
* Una cuenta puede generar una dirección **diversificada** nueva e invinculable para cada cliente o factura sin costo adicional de escaneo
* Una clave de visualización muestra **toda la cuenta**. Si un auditor solo debe ver a un cliente, ese cliente necesita su propia cuenta, y cada cuenta añade trabajo de escaneo en cada bloque
* Dimensiona el escáner para **bloques completos**, no para el promedio. Mainnet ya produce rachas de bloques casi completos
* Mide el costo por prueba en tu propio hardware antes de dimensionar nada

## Por qué los pagos blindados no se pueden indexar

Con las direcciones transparentes, un nodo puede leer la dirección de cada salida y crear un índice que relacione direcciones con salidas. Zebra lo ofrece mediante `getaddressutxos` y `getaddresstxids`.

Una acción blindada no tiene una dirección legible. Incluye un compromiso de nota, una clave pública efímera y una nota cifrada. Ninguno de esos bytes indica a quién va dirigido el pago, así que ni el nodo ni un [indexer](Lightwallet_Nodes.md) pueden crear un índice de direcciones.

Por eso, la búsqueda funciona al revés. La billetera toma cada salida blindada y pregunta «¿es mía?» intentando descifrarla. Esto se llama **descifrado de prueba**. [Viewing keys](Viewing_Keys.md) explica qué revelan las claves, y [Zcash sincronización de la billetera](Zcash_Wallet_Syncing.md) explica cómo las billeteras programan este trabajo.

## Cómo funciona una prueba

Para el formato de acción del protocolo Orchard, que usan tanto los pools Orchard como los Ironwood:

1. **Acuerdo de claves:** multiplica la clave pública efímera de la acción por tu clave de visualización entrante. Es una multiplicación escalar en la curva Pallas y representa la mayor parte del costo
2. **Derivación de claves:** aplica un hash al secreto compartido para obtener una clave simétrica
3. **Descifra los primeros 52 bytes** de la nota: el diversificador, el valor y `rseed`
4. **Reconstruye el compromiso de la nota** a partir de lo que descifraste
5. **Compáralo** con `cmx` de la acción. Si coinciden, la nota es tuya

Solo descubres si la nota es tuya en el paso 5, así que **un fallo cuesta casi lo mismo que un acierto**. Casi todas las acciones de la red pertenecen a otra persona, así que casi todo el trabajo corresponde a intentos fallidos.

## La fórmula del costo

```text
work per block = K × I × A × t

K  accounts you watch
I  incoming viewing keys per account (2: external and internal)
A  shielded actions in the block
t  time for one trial on one core
```

No hay ningún término para las direcciones. Las billeteras prueban tanto la clave externa (las direcciones que entregas) como la clave interna (el cambio), por eso `I = 2`. Esto se ve en los bucles `for scope in [Scope::External, Scope::Internal]` de librustzcash, en su `zcash_client_backend/src/scanning.rs`.

[ZIP 218](https://zips.z.cash/zip-0218) limita las acciones blindadas a **330 por bloque**, así que `A` es como máximo 330.

## Direcciones diversificadas: muchas direcciones, una clave

Una dirección del protocolo Orchard consta de un diversificador `d` (11 bytes) y una clave de transmisión derivada de la misma clave de visualización entrante. [ZIP 32](https://zips.z.cash/zip-0032) deriva cada diversificador de un índice de 88 bits mediante cifrado FF1, así que una cuenta tiene **2^88 direcciones**, todas válidas para el protocolo Orchard.

Esto ofrece dos ventajas prácticas a un backend de pagos:

* **Las direcciones son invinculables.** Sin la clave de visualización, dos direcciones diversificadas de una misma cuenta parecen pertenecer a dos billeteras distintas
* **Los pagos se relacionan con las facturas sin una tabla de búsqueda.** Cuando un descifrado de prueba funciona, la nota descifrada contiene `d`. La clave diversificadora de la cuenta descifra `d` para recuperar su índice, así que, si el índice es el número de factura, sabes qué factura se pagó

Antes de mostrar cada dirección a un cliente, inclúyela en una [dirección unificada](../Using_Zcash/Unified_Addresses.md) ([ZIP 316](https://zips.z.cash/zip-0316)).

## El inconveniente: una clave de visualización muestra toda la cuenta

No puedes limitar una clave de visualización a una sola dirección diversificada, porque todas las direcciones de la cuenta usan la misma clave. Por lo tanto, la cuenta también es la unidad de divulgación. Quien obtenga la clave de visualización de una cuenta verá todos los pagos a todas las direcciones de esa cuenta.

Así, tres decisiones quedan vinculadas:

| Diseño | Costo de escaneo | Qué se puede mostrar a un auditor |
|:--|:--|:--|
| Una cuenta, una dirección diversificada por cliente | Una clave, sin importar el número de clientes | Todo o nada |
| Una cuenta por cliente | Una clave por cliente, en cada bloque | Un cliente a la vez |
| Una cuenta por cliente y período | Una clave por cliente y período | Un cliente durante un período |

Elige el diseño de cuentas desde el principio. Dividir una cuenta más adelante implica trasladar sus fondos a cuentas nuevas, lo que cuesta comisiones y crea un patrón visible.

## Cuánto cuesta en la práctica

Estas cifras corresponden a un núcleo de portátil (Apple M3 Pro, compilación de lanzamiento), con `try_compact_note_decryption` de `zcash_note_encryption` 0.5.1 y acciones Ironwood reales de testnet:

| Medición | Valor |
|:--|:--|
| Una prueba, una clave a la vez | unos 82 µs |
| Una prueba, en lotes de 10 o 100 claves | unos 42 µs |

Procesar en lotes reduce el costo aproximadamente a la mitad, y el escáner de librustzcash también procesa en lotes por esa razón.

Con `t = 42 µs` y bloques completos de 330 acciones:

| Cuentas supervisadas | Tiempo de CPU por bloque completo | Núcleos necesarios para seguir el ritmo de los bloques completos |
|:--|:--|:--|
| 1 | 28 ms | 0,001 |
| 1.000.000 (una por cliente) | 7,7 horas | unos 1.109 |

El mismo millón de clientes con direcciones diversificadas en una sola cuenta cuesta 28 ms por bloque completo. La única diferencia es dónde se establece el límite entre cuentas.

## Dimensiona para las rachas, no para los promedios

En los 5.000 bloques de mainnet hasta la altura 3.582.677 (muestra tomada el 17 de noviembre de 2026):

* El 62 % de los bloques no tuvo salidas blindadas y la mediana fue cero
* El promedio fue de 12,3 salidas blindadas por bloque
* 153 bloques entre las alturas 3.579.935 y 3.580.346, unas tres horas de red, tuvieron más de 250 salidas cada uno, a menudo consecutivamente. Contenían el 75 % de todas las salidas de la muestra

Un escáner dimensionado para el promedio se quedará atrás durante una racha así. Deja margen (por ejemplo, planea usar la mitad de cada intervalo de 25 segundos entre bloques) y dimensiona para el límite máximo.

## Los bloques compactos ayudan con el ancho de banda, no con el número de pruebas

Las billeteras ligeras escanean bloques compactos de un servidor lightwallet. Una acción compacta ocupa 148 bytes, frente a los 820 de una acción completa. Conserva solo lo que necesita una prueba: la clave efímera, los primeros 52 bytes del texto cifrado, el anulador y `cmx`. Los datos transparentes solo se envían si el cliente los solicita.

Los bloques compactos reducen el tamaño de la descarga. No reducen el número de pruebas, porque todavía hay que probar cada acción con cada clave.

## Lista de comprobación para un backend de pagos

* Decide quién tendrá que ver qué antes de crear las cuentas
* Siempre que las reglas de divulgación lo permitan, genera una dirección diversificada por factura desde una sola cuenta
* Mide `t` en tu propio hardware con el procesamiento por lotes activado
* Dimensiona el escaneo de la punta de la red para 330 acciones por bloque, con margen
* Divide los reescaneos por rangos de altura entre varios procesos. El historial no cambia, así que se puede paralelizar fácilmente
* Recuerda que también hay que volver a escanear cada cuenta nueva desde su altura de inicio

## Más información

* [ZIP 218: intervalo objetivo de 25 segundos entre bloques](https://zips.z.cash/zip-0218), incluidos los límites de acciones por bloque
* [ZIP 32: billeteras jerárquicas deterministas blindadas](https://zips.z.cash/zip-0032)
* [ZIP 316: direcciones unificadas y claves de visualización unificadas](https://zips.z.cash/zip-0316)
* [Protocolo Lightwallet: compact_formats.proto](https://github.com/zcash/lightwallet-protocol/tree/main/walletrpc)
* [librustzcash](https://github.com/zcash/librustzcash): escaneo `zcash_client_backend` y `zcash_note_encryption`
* [Una clave de visualización, un millón de clientes](https://udokaam.dev/writing/one-viewing-key-a-million-customers/): mediciones completas y código de laboratorio para reproducirlas
