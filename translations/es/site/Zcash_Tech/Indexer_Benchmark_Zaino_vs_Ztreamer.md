# Referencia de indexadores: Zaino frente a Ztreamer

Zaino y Ztreamer son dos indexadores [indexers] que proporcionan el protocolo gRPC lightwallet, la API que las billeteras [wallet] ligeras de Zcash utilizan para sincronizarse. Esta página resume una comparación independiente y reproducible de ambos: si devuelven las mismas respuestas, cuánto tardan en construir su índice y con qué rapidez atienden a las billeteras.

## En resumen

* Ambos indexadores devuelven datos correctos de la cadena [chain]. Todas las respuestas que pudieron comprobarse frente a Zebra coincidieron, por lo que las billeteras pueden utilizar cualquiera de los dos.
* Las diferencias encontradas son convenciones y casos límite: códigos de error, el orden de bytes de un hash, cómo se contabiliza una dirección [address] duplicada y algunas formas de respuesta JSON-RPC.
* Ztreamer construye su índice unas 6× más rápido en la misma CPU. Zaino comienza a responder después de 6 segundos al reenviar solicitudes a Zebra mientras lo construye.
* Ztreamer responde más rápido en todos los escenarios medidos: 13–17× más bloques [blocks] por segundo para una descarga completa de billetera.
* Gran parte de la latencia de Zaino procede de una configuración de socket ausente (`TCP_NODELAY`), que añade unos 40 ms a muchas solicitudes. Es una corrección de una sola línea.

## Qué se comparó

| Compilación | Nodo de respaldo | Por qué |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (backend de `direct`) | Última versión estable de Zaino |
| Zaino 0.9.0 | Zebra 6.4.2 (backend de `direct`) | La versión medida en la propia comparación publicada de Ztreamer |
| Ztreamer v0.1.0 | Nodo Zakura integrado | Última etiqueta de Ztreamer |
| Ztreamer master | Zakura 1.5.1 integrado | Lo que construyen las instrucciones de instalación de Ztreamer |

Los dos utilizan diseños distintos:

* **Zaino** se ejecuta como un proceso independiente junto a un nodo completo [Zebra](Zebra_Full_Node.md), lee el estado de Zebra y mantiene su propio índice. Es el indexador de la pila [Z3](Z3_Stack.md). Consulte [Zaino](Zaino.md).
* **Ztreamer** integra un nodo [Zakura](Zakura_Node.md) (una bifurcación [fork] de Zebra) en el mismo proceso y mantiene un índice de bloques compactos.

## Cómo se midió

* **Los mismos datos para todos.** Cada compilación comenzó desde la misma instantánea de testnet de Zcash Foundation, congelada en la altura 4.382.897, de modo que todas indexaron exactamente la misma cadena.
* **Cualquiera puede repetirlo.** Todo se ejecuta en runners alojados por GitHub y gratuitos: bifurque el repositorio y ejecute un flujo de trabajo.
* **Tres ejecuciones por compilación**, cada una desde un índice vacío. El servidor y el generador de carga se ejecutaron en núcleos de CPU distintos.
* **Compatibilidad:** Los 20 métodos gRPC del protocolo lightwallet (274 casos de prueba), comparados byte a byte entre compilaciones y comprobados frente al JSON-RPC de Zebra. También se comprobaron los 28 métodos JSON-RPC que proporciona Zaino.
* **Rendimiento:** Tiempo y recursos para construir el índice, latencia por solicitud, rendimiento de rangos de bloques, de 1 a 128 clientes simultáneos y una descarga completa de billetera desde la activación de Sapling hasta la punta.

## Resultados

### Construcción del índice

Medianas de tres ejecuciones:

| Compilación | Índice completo | Primera respuesta | Tamaño del índice en disco |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1.395 s | 6 s | 22,06 GiB |
| Zaino 0.9.0 | 1.211 s | 6 s | 22,06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1,44 GiB |
| Ztreamer master | 159 s | 158 s | 1,44 GiB |

Zaino puede utilizarse casi de inmediato porque reenvía solicitudes a Zebra mientras se construye. Ztreamer no proporciona nada hasta que su índice está completo. En el mismo modelo de CPU, Zaino 0.10.1 tardó entre 6 y 6,5× más que Ztreamer v0.1.0 y utilizó entre 7,5 y 8× más tiempo de CPU (Zebra incluido).

### Servicio

Medianas de tres ejecuciones, en bloques por segundo salvo indicación contraria:

| Escenario | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Rango de bloques de 1.000 bloques | 11.414 | 179.486 |
| Descarga completa de billetera (280.000 → punta) | 11.124 | 189.041 |
| Rango de bloques de 1.000 bloques, 128 clientes | 110.093 | 229.527 |
| Bloque único, 128 clientes (solicitudes/s) | 6.843 | 11.044 |

Con 128 clientes, la diferencia se reduce a aproximadamente 2×, porque ambos servidores estaban limitados a dos núcleos de CPU.

### El umbral de 40 ms

En Zaino, seis de doce RPC tienen una latencia mediana de aproximadamente 40 ms, y cada RPC tiene un percentil 99 de alrededor de 41 ms. La causa es la forma en que Zaino configura su escucha gRPC: la opción de socket `TCP_NODELAY` nunca se activa, por lo que el sistema operativo retiene respuestas pequeñas hasta 40 ms.

Activar la opción desde fuera, sin cambiar el binario de Zaino, eliminó el umbral. Por ejemplo, `GetTreeState` bajó de 40,3 ms a 0,75 ms (Ztreamer: 0,63 ms). La transmisión masiva de bloques no cambió, por lo que la diferencia de rendimiento anterior es real.

### Diferencias de compatibilidad

* **Zaino 0.9.0** incluye datos transparentes [transparent] en `GetBlock` de forma predeterminada, cuando el protocolo indica que el valor predeterminado es solo datos blindados [shielded]. Esto se corrigió en 0.10.1.
* **`GetSubtreeRoots`:** El campo `completingBlockHash` utiliza órdenes de bytes opuestos en los dos indexadores. Las billeteras actuales no leen este campo.
* **Códigos de error:** Zaino devuelve `INTERNAL` para entradas incorrectas; Ztreamer devuelve `INVALID_ARGUMENT` o `NOT_FOUND`.
* Las **direcciones duplicadas** en `GetTaddressBalanceStream` se contabilizan dos veces, excepto en Ztreamer master.
* **JSON-RPC:** El `getrawtransaction` de Zaino con verbosidad 0 devuelve un objeto en lugar de una cadena hexadecimal, a diferencia de Zebra y zcashd.

## Limitaciones

* **Solo testnet.** Los bloques de testnet son más pequeños que los de mainnet, por lo que los tiempos y tamaños absolutos no son cifras de mainnet. La comparación es relativa, con entradas idénticas.
* **Máquinas de CI compartidas** con varios modelos de CPU. El informe completo ofrece comparaciones con la misma CPU para las cifras principales.
* **No se midió:** Reorganizaciones, seguimiento de una punta de cadena activa, carga de mempool y TLS.

## Dónde obtener más información

* Informe completo: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Repositorio de referencia: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Datos sin procesar: [results-2026-10-10 release](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
