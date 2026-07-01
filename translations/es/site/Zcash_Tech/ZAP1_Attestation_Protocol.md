# Protocolo de Atestación ZAP1

ZAP1 es un protocolo de atestación de código abierto para Zcash. Escribe eventos estructurados del ciclo de vida en un árbol de Merkle BLAKE2b y ancla la raíz del árbol on-chain mediante memos blindados Orchard. Las pruebas son verificables públicamente. Los datos de los eventos permanecen privados.

## Cómo funciona

Los operadores registran tipos de eventos (despliegues, pagos, transferencias, etc.) y los envían a una instancia de ZAP1. Cada evento produce un hash de hoja usando BLAKE2b-256 con separación de dominio. Las hojas se acumulan en un árbol de Merkle. Cuando se alcanza un umbral, la raíz del árbol se codifica como un memo ZAP1:09 y se ancla a Zcash en una transacción blindada.

Cualquiera que tenga un hash de hoja puede verificar la ruta completa desde la hoja hasta la raíz y el anclaje on-chain, sin confiar en el operador.

## Propiedades clave

- **Agnóstico de la aplicación**: cualquier operador de Zcash puede definir sus propios tipos de eventos y cadenas de personalización
- **Preserva la privacidad**: las cargas útiles de los eventos se hashean antes del anclaje. Solo los hashes van on-chain.
- **Verificable de forma independiente**: la verificación solo necesita el paquete de prueba y acceso a la cadena. No se requiere confianza en el operador.
- **Compatible con ZIP 302**: ZAP1 está convergiendo hacia un `partType` de ZIP 302 para la carga útil de atestación

## Qué existe

- Implementación de referencia (Rust, con licencia MIT)
- SDK de verificación en crates.io (Rust + 83KB WASM)
- SDK de JavaScript en npm
- Decodificador universal de memos (identifica memos ZAP1, ZIP 302 TVLV, texto, binarios y vacíos)
- Kit de conformidad con 29 comprobaciones de API y 14 comprobaciones de protocolo
- Diseño de firma de umbral FROST 2-de-3 para la difusión de anclajes entre múltiples partes
- Borrador de ZIP PR #1243 en revisión
- 4 anclajes en mainnet con 14 hojas hasta marzo de 2026

## Arquitectura

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Cada operador ejecuta su propia instancia de ZAP1 con sus propias claves, árbol de Merkle y anclajes. No hay estado compartido entre operadores.

## Dónde aprender más

- Código fuente: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- SDK de verificación: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Decodificador de memos: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Especificación del protocolo: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- Borrador de ZIP: [PR #1243](https://github.com/zcash/zips/pull/1243)
- API en vivo: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Guía del operador: [frontiercompute.io/operators.html](https://frontiercompute.io/operators.html)
