<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST y custodia con umbral para ZEC blindado

> Para conocer todos los detalles criptográficos del protocolo FROST, consulta la [página técnica de FROST](FROST.md).

La custodia con umbral FROST sigue apareciendo en las conversaciones sobre Zcash — fue la categoría principal del ZecHub Hackathon 2026 — pero el concepto no siempre se explica en un lenguaje sencillo. Esta página cubre qué significa, cuándo realmente la necesitas, las compensaciones, y qué herramientas la admiten hoy.

---

## TL;DR

- **FROST** permite que un grupo de poseedores de claves controle colectivamente una dirección blindada de Zcash sin que ninguna persona tenga la clave privada completa.
- Un umbral **t-de-n** significa: t personas deben cofirmar para gastar; cualquier grupo de t-1 o menos no puede mover los fondos por sí solo.
- Las transacciones se ven como cualquier otra transacción blindada — no hay ninguna huella on-chain que revele que se usó firma con umbral.
- Esto es fundamentalmente diferente del multisig transparente (que es público on-chain y Zcash ha soportado durante mucho tiempo) — FROST funciona dentro del pool blindado.
- Es útil para DAOs, exchanges, servicios de custodia, ahorros compartidos y tesorerías de equipo — en cualquier lugar donde un único punto de fallo en las claves sea inaceptable.

---

## ¿Qué es FROST en lenguaje sencillo?

Imagina que tres socios comerciales tienen cada uno una parte de una clave. Para gastar desde su wallet compartida, dos de los tres deben ponerse de acuerdo y cofirmar. La transacción resultante se ve idéntica a un envío individual normal — ningún observador puede saber por la blockchain que participaron varias personas.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) es el protocolo criptográfico que hace esto posible para Zcash blindado. Fue creado por Chelsea Komlo (University of Waterloo / Zcash Foundation) e Ian Goldberg.

Las propiedades clave:

- **Umbral**: solo t firmantes de n necesitan participar (por ejemplo, 2-de-3, 3-de-5)
- **Blindado**: funciona dentro del pool de privacidad Orchard — los importes, el remitente y el destinatario permanecen privados
- **Indistinguible**: la firma final se ve como cualquier otra transacción blindada de Zcash
- **Sin custodia**: ninguna parte tiene nunca la clave completa — ni siquiera el coordinador

---

## ¿Cuándo deberías usar custodia con umbral?

La custodia con umbral tiene sentido cuando **perder una clave o a una persona no debería significar perder los fondos**.

| Situación | Por qué ayuda la custodia con umbral |
|-----------|----------------------------|
| **Tesorería de DAO o de equipo** | Ningún administrador puede drenar fondos unilateralmente; requiere consenso |
| **Exchange o custodio** | Distribuye el riesgo de las claves entre zonas de seguridad o empleados |
| **Almacenamiento en frío personal (con familiares de confianza)** | 2-de-3 entre tú + dos familiares — si mueres o pierdes el acceso, los fondos no se pierden |
| **Depósito en garantía** | Comprador, vendedor y árbitro tienen cada uno una participación; los fondos se liberan cuando dos están de acuerdo |
| **Desembolso de subvenciones de alto valor** | Estilo ZCG: requiere múltiples firmantes independientes antes de pagar |
| **Gestión de claves para desarrolladores** | Previene amenazas internas — ningún ingeniero individual puede drenar un fondo del protocolo |

Probablemente **no** necesites custodia con umbral para una wallet personal que controlas tú solo, montos pequeños, o situaciones en las que la sobrecarga adicional de coordinación supera la reducción del riesgo.

---

## ¿En qué se diferencia del multisig transparente?

Zcash ha soportado durante mucho tiempo el multisig transparente — se requieren múltiples claves para gastar desde una t-address. Pero el multisig transparente tiene un coste de privacidad significativo: **la estructura multisig, todas las claves públicas y todos los firmantes son visibles en la blockchain**.

FROST resuelve esto operando dentro del pool blindado:

| | Multisig transparente | Umbral FROST (blindado) |
|--|---------------------|--------------------------|
| Pool | Transparente (público) | Orchard (blindado) |
| Firmantes visibles on-chain | Sí — todas las claves públicas quedan expuestas | No — indistinguible de un gasto con un solo firmante |
| Importes visibles | Sí | No |
| Coordinación requerida | Script on-chain | Ronda de comunicación off-chain |
| Privacidad | Ninguna | Privacidad blindada completa |

---

## Compensaciones y limitaciones

FROST es potente, pero viene con compensaciones reales que deberías entender antes de usarlo:

### Sobrecarga de coordinación
Los firmantes deben estar en línea al mismo tiempo (o casi) para completar una ronda de firma. Si tus t firmantes están repartidos en distintas zonas horarias o tienen conexiones poco fiables, gastar requiere una coordinación que una wallet individual no necesita.

### No hay firma si el quórum no está disponible
Si no hay suficientes poseedores de claves disponibles (enfermos, de viaje, sin responder), los fondos quedan temporalmente imposibles de gastar. Elige tu umbral y el número de participaciones con cuidado — 2-de-3 es más resiliente que 2-de-2.

### Ceremonia de generación de claves
Configurar FROST requiere una ceremonia de generación distribuida de claves (DKG) en la que los n participantes estén en línea juntos. Esto ocurre una sola vez, pero debe hacerse con cuidado — si los participantes se ven comprometidos durante la DKG, la seguridad se debilita.

### Las herramientas aún están madurando
FROST para Zcash blindado es relativamente nuevo. El estándar IETF (draft-irtf-cfrg-frost) es maduro, pero las integraciones en wallets son limitadas. Espera algunas asperezas en comparación con una wallet estándar de clave única.

### Complejidad de recuperación
Perder una participación no es el fin del mundo (ese es justamente el objetivo del umbral), pero los planes de recuperación deben documentarse con antelación. ¿Quién guarda las copias de respaldo? ¿Qué ocurre si se pierden dos participaciones al mismo tiempo?

---

## ¿Quién está construyendo con FROST en Zcash?

### Zcash Foundation — frost.zfnd.org
La Zcash Foundation ha lanzado una implementación funcional de FROST y un sitio de demostración. Esta es la implementación de referencia utilizada para pruebas y desarrollo.

### Demo FROST de YWallet
YWallet (una wallet de Zcash de alto rendimiento) tiene una integración temprana de demo FROST. Consulta la [guía de la Demo FROST de YWallet](/guides/Ywallet_FROST_Demo) para obtener instrucciones paso a paso.

### ZecHub Hackathon 2026 — Proyectos de la categoría FROST

La categoría FROST fue la más competitiva en el ZecHub Hackathon 2026. Proyectos destacados:

- **ZecVault** — depósito en garantía blindado 2-de-3 liquidado en mainnet (umbral FROST)
- **Steward** — custodia con umbral para Zcash blindado con una UX centrada en la recuperación

### Coinbase
Coinbase construyó una implementación de FROST en producción para sus sistemas de firma con umbral (para Bitcoin), con modificaciones que eliminan la etapa de preprocesamiento y distribuyen el rol de agregador entre todos los participantes. Su experiencia valida el modelo de seguridad de FROST a escala de producción.

---

## Cómo funciona una sesión de firma (simplificado)

1. **Configuración (una vez):** Los n participantes ejecutan una ceremonia de generación distribuida de claves (DKG). Cada uno obtiene una participación privada; se deriva una clave pública compartida. Ninguna parte conoce la clave privada completa.

2. **Coordinar a los firmantes:** Cuando se necesita un gasto, un coordinador (que puede ser uno de los firmantes) recopila compromisos de t participantes dispuestos a firmar.

3. **Ronda 1:** Cada firmante participante genera un nonce y transmite un compromiso (público, no sensible).

4. **Ronda 2:** Cada firmante participante calcula su firma parcial usando su participación privada y la transmite.

5. **Agregación:** El coordinador combina las t firmas parciales en una firma Schnorr final — indistinguible on-chain de una firma de una sola parte.

6. **Difusión:** La transacción se difunde a la red de Zcash como de costumbre.

Si algún firmante envía una firma parcial incorrecta, el protocolo lo identifica y aborta (queda excluido de futuras sesiones). La coordinación ocurre off-chain — la blockchain solo ve la transacción final.

---

## Elegir tus parámetros de umbral

| Configuración | Resiliencia | Riesgo |
|-------|-----------|------|
| 1-de-1 | Sin resiliencia — punto único de fallo | Pérdida de la clave = pérdida permanente |
| 2-de-2 | Deben estar ambos firmantes — sin tolerancia a fallos | Uno no disponible = fondos congelados |
| 2-de-3 | Una participación puede perderse o no estar disponible | Menor margen de seguridad que 3-de-5 |
| 3-de-5 | Se pueden perder dos participaciones; seguridad sólida | Mayor sobrecarga de coordinación |
| 3-de-7 | Nivel institucional; tolera dos fallos | Alto coste de coordinación |

Un punto de partida práctico para la mayoría de los equipos: **2-de-3** (resiliente, coordinación mínima) o **3-de-5** (institucional, mayor seguridad).

---

## Páginas relacionadas

- [FROST — Análisis técnico en profundidad](FROST.md) — detalles criptográficos del protocolo (DKG, rondas de firma, pruebas de seguridad)
- [Guía de la Demo FROST de YWallet](/guides/Ywallet_FROST_Demo) — demostración práctica paso a paso
- [Demo FROST (frostdemo)](/guides/frostdemo) — recorrido de la demo de Zcash Foundation
- [Viewing Keys](Viewing_Keys.md) — acceso de solo lectura a direcciones blindadas (complementario a la custodia con umbral)
- [Activos blindados de Zcash](Zcash_Shielded_Assets.md) — FROST también es una infraestructura clave para la emisión de ZSA

## Recursos

- [Artículo de investigación de FROST (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [Borrador del estándar IETF de FROST (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Implementación FROST de Zcash Foundation](https://frost.zfnd.org)
- [Chelsea Komlo — What are Threshold Signatures? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Threshold Digital Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Firmas Schnorr robustas asíncronas con umbral (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
