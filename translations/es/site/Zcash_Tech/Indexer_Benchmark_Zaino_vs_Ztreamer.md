# Comparativa de indexadores: Zaino vs Ztreamer

Zaino y Ztreamer son dos indexadores que sirven el protocolo gRPC lightwallet, la API que las wallets ligeras Zcash utilizan para sincronizarse. Esta página resume una comparación independiente y reproducible de ambos: si devuelven las mismas respuestas, cuánto tardan en construir su índice y con qué rapidez sirven a las wallets.

## TL;DR

* Ambos indexadores devuelven datos correctos de la cadena. Todas las respuestas que pudieron verificarse frente a Zebra coincidieron, por lo que las wallets pueden utilizar cualquiera de los dos.
* Las diferencias encontradas corresponden a convenciones y casos límite: códigos de error, el orden de bytes de un hash, cómo se cuenta una dirección duplicada y algunas estructuras de respuesta JSON-RPC.
* Ztreamer construye su índice aproximadamente 6× más rápido con la misma CPU. Zaino empieza a responder después de 6 segundos al reenviar solicitudes a Zebra mientras lo construye.
* Ztreamer sirve más rápido en todos los escenarios medidos: 13–17× más bloques por segundo para una descarga completa de wallet.
* Gran parte de la latencia de Zaino proviene de una configuración de socket ausente (`TCP_NODELAY`), que añade unos 40 ms a muchas solicitudes. Es una corrección de una línea.

## Qué se comparó

| Compilación | Nodo de respaldo | Motivo |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (backend `direct`) | Última versión estable de Zaino |
| Zaino 0.9.0 | Zebra 6.4.2 (backend `direct`) | La versión medida en la comparación publicada por Ztreamer |
| Ztreamer v0.1.0 | Nodo Zakura integrado | Última etiqueta de Ztreamer |
| Ztreamer master | Zakura 1.5.1 integrado | Lo que compilan las instrucciones de instalación de Ztreamer |

Los dos utilizan diseños diferentes:

* **Zaino** se ejecuta como un proceso independiente junto a un nodo completo [Zebra](Zebra_Full_Node.md), lee el estado de Zebra y mantiene su propio índice. Es el indexador de la pila [Z3](Z3_Stack.md). Consulta [Zaino](Zaino.md).
* **Ztreamer** integra un nodo [Zakura](Zakura_Node.md) (un fork de Zebra) en el mismo proceso y mantiene un índice de bloques compactos.

## Cómo se midió

* **Los mismos datos para todos.** Cada compilación comenzó desde la misma instantánea de testnet Zcash Foundation, congelada en la altura 4,382,897, por lo que todas indexaron exactamente la misma cadena.
* **Cualquiera puede repetirlo.** Todo se ejecuta en runners gratuitos alojados por GitHub: haz un fork del repositorio y ejecuta un workflow.
* **Tres ejecuciones por compilación**, cada una desde un índice vacío. El servidor y el generador de carga se ejecutaron en núcleos de CPU independientes.
* **Compatibilidad:** los 20 métodos gRPC del protocolo lightwallet (274 casos de prueba), comparados byte por byte entre compilaciones y verificados frente al JSON-RPC de Zebra. También se verificaron los 28 métodos JSON-RPC que sirve Zaino.
* **Rendimiento:** tiempo y recursos para construir el índice, latencia por solicitud, rendimiento de rangos de bloques, de 1 a 128 clientes concurrentes y una descarga completa de wallet desde la activación de Sapling hasta la punta.

## Resultados

### Construcción del índice

Medianas de tres ejecuciones:

| Compilación | Índice completado | Primera respuesta | Tamaño del índice en disco |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1,395 s | 6 s | 22.06 GiB |
| Zaino 0.9.0 | 1,211 s | 6 s | 22.06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1.44 GiB |
| Ztreamer master | 159 s | 158 s | 1.44 GiB |

Zaino puede utilizarse casi de inmediato porque reenvía las solicitudes a Zebra mientras se construye. Ztreamer no sirve nada hasta que su índice está completo. Con el mismo modelo de CPU, Zaino 0.10.1 tardó entre 6 y 6.5× más que Ztreamer v0.1.0 y utilizó entre 7.5 y 8× más tiempo de CPU (Zebra incluido).

### Servicio

Medianas de tres ejecuciones, en bloques por segundo salvo que se indique lo contrario:

| Escenario | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Rango de bloques de 1,000 bloques | 11,414 | 179,486 |
| Descarga completa de wallet (280,000 → punta) | 11,124 | 189,041 |
| Rango de bloques de 1,000 bloques, 128 clientes | 110,093 | 229,527 |
| Bloque único, 128 clientes (solicitudes/s) | 6,843 | 11,044 |

Con 128 clientes, la diferencia se reduce a aproximadamente 2×, porque ambos servidores estaban limitados a dos núcleos de CPU.

### El mínimo de 40 ms

En Zaino, seis de doce RPC tienen una latencia mediana de aproximadamente 40 ms, y cada RPC tiene un percentil 99 de alrededor de 41 ms. La causa es la forma en que Zaino configura su listener gRPC: la opción de socket `TCP_NODELAY` nunca se activa, por lo que el sistema operativo retiene respuestas pequeñas hasta 40 ms.

Activar la opción desde fuera, sin cambiar el binario de Zaino, eliminó el mínimo. Por ejemplo, `GetTreeState` bajó de 40.3 ms a 0.75 ms (Ztreamer: 0.63 ms). El streaming masivo de bloques no cambió, por lo que la diferencia de rendimiento anterior es real.

### Diferencias de compatibilidad

* **Zaino 0.9.0** incluye datos transparentes en `GetBlock` de forma predeterminada, cuando el protocolo indica que el valor predeterminado es solo datos blindados. Esto se corrigió en 0.10.1.
* **`GetSubtreeRoots`:** el campo `completingBlockHash` utiliza órdenes de bytes opuestos en los dos indexadores. Las wallets actuales no leen este campo.
* **Códigos de error:** Zaino devuelve `INTERNAL` para entradas incorrectas; Ztreamer devuelve `INVALID_ARGUMENT` o `NOT_FOUND`.
* Las **direcciones duplicadas** en `GetTaddressBalanceStream` se cuentan dos veces, excepto en Ztreamer master.
* **JSON-RPC:** Zaino de `getrawtransaction` con verbosidad 0 devuelve un objeto en lugar de una cadena hexadecimal, a diferencia de Zebra y zcashd.

## Limitaciones

* **Solo testnet.** Los bloques de testnet son más pequeños que los de mainnet, por lo que los tiempos y tamaños absolutos no corresponden a mainnet. La comparación es relativa, con entradas idénticas.
* **Máquinas de CI compartidas** con varios modelos de CPU. El informe completo proporciona comparaciones con la misma CPU para las cifras principales.
* **No medido:** reorganizaciones, seguimiento de una punta de cadena en vivo, carga del mempool y TLS.

## Dónde aprender más

* Informe completo: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Repositorio de benchmarks: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Datos sin procesar: [versión results-2026-10-10](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
