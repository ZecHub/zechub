<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST y custodia de umbral [threshold custody] para ZEC blindado [shielded]

> Para conocer todos los detalles criptográficos del protocolo FROST, consulta la página técnica de [FROST](FROST.md).

La custodia de umbral FROST sigue surgiendo en las conversaciones sobre Zcash — fue la categoría principal en el Hackathon 2026 de ZecHub — pero el concepto no siempre se explica en lenguaje sencillo. Esta página abarca qué significa, cuándo realmente la necesitas, las ventajas y desventajas, y qué herramientas la admiten hoy.

---

## En resumen

- **FROST** permite que un grupo de titulares de claves controle colectivamente una dirección Zcash blindada sin que ninguna persona posea la clave privada completa.
- Un umbral **t-de-n** significa que t personas deben firmar conjuntamente para gastar; t-1 o menos no pueden mover los fondos por sí solas.
- Las transacciones se ven como cualquier otra transacción blindada — no hay ninguna huella on-chain que revele que se utilizó la firma de umbral.
- Esto es fundamentalmente distinto de la multifirma transparente (que es pública on-chain y que Zcash admite desde hace tiempo) — FROST funciona dentro del pool blindado.
- Es útil para DAO, exchanges, servicios de custodia, ahorros conjuntos y tesorerías de equipos — en cualquier lugar donde un único punto de fallo de claves sea inaceptable.

---

## ¿Qué es FROST en lenguaje sencillo?

Imagina que tres socios comerciales poseen cada uno una parte de una clave. Para gastar desde su billetera compartida, dos de los tres deben estar de acuerdo y firmar conjuntamente. La transacción resultante se ve idéntica a un envío individual normal — ningún observador puede saber por la blockchain que participaron varias personas.

FROST (**Firmas de umbral Schnorr flexibles y optimizadas por rondas**) es el protocolo criptográfico que hace esto posible para Zcash blindado [shielded]. Fue creado por Chelsea Komlo (Universidad de Waterloo / Zcash Foundation) e Ian Goldberg.

Las propiedades clave:

- **Umbral**: solo deben participar firmantes t-de-n (p. ej., 2-de-3, 3-de-5)
- **Blindado**: funciona dentro del pool de privacidad Orchard — los montos, el remitente y el receptor permanecen privados
- **Indistinguible**: la firma final se parece a cualquier otra transacción blindada de Zcash
- **Sin custodia**: ninguna parte posee nunca la clave completa — ni siquiera el coordinador

---

## ¿Cuándo deberías usar custodia de umbral?

La custodia de umbral tiene sentido cuando **perder una clave o a una persona no debería significar perder los fondos**.

| Situación | Por qué ayuda la custodia de umbral |
|-----------|----------------------------|
| **Tesorería de DAO o equipo** | Ningún administrador individual puede vaciar los fondos unilateralmente; requiere consenso |
| **Exchange o custodio** | Distribuye el riesgo de claves entre zonas de seguridad o empleados |
| **Almacenamiento en frío personal (con familiares de confianza)** | 2-de-3 entre tú y dos familiares — si mueres o pierdes el acceso, los fondos no se pierden |
| **Depósito en garantía** | Comprador, vendedor y árbitro poseen cada uno una participación; los fondos se liberan cuando dos están de acuerdo |
| **Desembolso de subvenciones de alto valor** | Al estilo de ZCG: requiere múltiples firmantes independientes antes de pagar |
| **Gestión de claves de desarrolladores** | Evita amenazas internas — ningún ingeniero individual puede vaciar un fondo de protocolo |

Probablemente **no** necesitas custodia de umbral para una billetera personal que controlas por tu cuenta, montos pequeños o situaciones donde la coordinación adicional pese más que la reducción de riesgo.

---

## ¿En qué se diferencia de la multifirma transparente?

Zcash admite desde hace tiempo la multifirma transparente — múltiples claves necesarias para gastar desde una dirección t. Pero la multifirma transparente tiene un costo de privacidad significativo: **la estructura de multifirma, todas las claves públicas y todos los firmantes son visibles en la blockchain**.

FROST resuelve esto al operar dentro del pool blindado:

| | Multifirma transparente | Umbral FROST (blindado) |
|--|---------------------|--------------------------|
| Pool | Transparente (público) | Orchard (blindado) |
| Firmantes visibles on-chain | Sí — todas las claves públicas quedan expuestas | No — indistinguible de un gasto de un solo firmante |
| Montos visibles | Sí | No |
| Coordinación necesaria | Script on-chain | Ronda de comunicación off-chain |
| Privacidad | Ninguna | Privacidad blindada completa |

---

## Ventajas, desventajas y limitaciones

FROST es potente, pero implica ventajas y desventajas reales que deberías comprender antes de utilizarlo:

### Sobrecarga de coordinación
Los firmantes deben estar conectados simultáneamente (o casi) para completar una ronda de firma. Si tus firmantes t están repartidos entre zonas horarias o tienen conexiones poco fiables, gastar requiere una coordinación que una billetera individual no necesita.

### No hay firma si el quórum no está disponible
Si no hay suficientes titulares de claves disponibles (por enfermedad, viaje o falta de respuesta), los fondos no se pueden gastar temporalmente. Elige cuidadosamente tu umbral y número de participaciones — 2-de-3 es más resiliente que 2-de-2.

### Ceremonia de generación de claves
Configurar FROST requiere una ceremonia de generación distribuida de claves (DKG) en la que los n participantes estén conectados juntos. Es un evento único, pero debe realizarse cuidadosamente — si los participantes se ven comprometidos durante la DKG, la seguridad queda socavada.

### Las herramientas aún están madurando
FROST para Zcash blindado es relativamente nuevo. El estándar IETF (draft-irtf-cfrg-frost) es maduro, pero las integraciones con billeteras son limitadas. Espera algunas asperezas en comparación con una billetera estándar de una sola clave.

### Complejidad de recuperación
Perder una participación no es el fin del mundo (ese es el objetivo del umbral), pero los planes de recuperación deben documentarse de antemano. ¿Quién conserva las copias de seguridad? ¿Qué sucede si se pierden dos participaciones simultáneamente?

---

## ¿Quién está desarrollando con FROST en Zcash?

### Zcash Foundation — frost.zfnd.org
La Zcash Foundation ha entregado una implementación funcional de FROST y un sitio de demostración. Esta es la implementación de referencia utilizada para pruebas y desarrollo.

### Demostración de Ywallet FROST
Ywallet tuvo una integración de demostración temprana de FROST, explicada en la guía de demostración de [Ywallet FROST](/guides/Ywallet_FROST_Demo). Ywallet ya no recibe mantenimiento y no se actualizará para Ironwood, así que lee la guía como contexto y no como algo que ejecutar hoy. Zkool, del mismo desarrollador, es el sucesor mantenido e incluye la multifirma FROST entre sus funciones.

### Hackathon 2026 de ZecHub — Proyectos de la categoría FROST

La categoría FROST fue la más competitiva en el Hackathon 2026 de ZecHub. Proyectos destacados:

- **ZecVault** — depósito en garantía blindado 2-de-3 liquidado en mainnet (umbral FROST)
- **Steward** — custodia de umbral para Zcash blindado con una UX centrada en la recuperación

### Coinbase
Coinbase desarrolló una implementación de producción de FROST para sus sistemas de firma de umbral (para Bitcoin), con modificaciones que eliminan la etapa de preprocesamiento y distribuyen el rol de agregador entre todos los participantes. Su experiencia valida el modelo de seguridad de FROST a escala de producción.

---

## Cómo funciona una sesión de firma (simplificado)

1. **Configuración (una vez):** Los n participantes ejecutan una ceremonia de generación distribuida de claves (DKG). Cada uno recibe una participación privada; se deriva una clave pública compartida. Ninguna parte conoce la clave privada completa.

2. **Coordinar firmantes:** Cuando se necesita un gasto, un coordinador (que puede ser uno de los firmantes) recopila compromisos de t participantes dispuestos a firmar.

3. **Ronda 1:** Cada firmante participante genera un nonce y transmite un compromiso (público, no sensible).

4. **Ronda 2:** Cada firmante participante calcula su firma parcial utilizando su participación privada y la transmite.

5. **Agregación:** El coordinador combina las t firmas parciales en una firma final Schnorr — indistinguible on-chain de una firma de una sola parte.

6. **Difusión:** La transacción se transmite a la red Zcash de forma normal.

Si algún firmante envía una firma parcial incorrecta, el protocolo lo identifica y aborta (queda excluido de futuras sesiones). La coordinación ocurre off-chain — la blockchain solo ve la transacción final.

---

## Elección de los parámetros de umbral

| Configuración | Resiliencia | Riesgo |
|-------|-----------|------|
| 1-de-1 | Sin resiliencia — punto único de fallo | Pérdida de clave = pérdida permanente |
| 2-de-2 | Deben estar ambos firmantes — sin tolerancia a fallos | Uno no disponible = fondos bloqueados |
| 2-de-3 | Se puede perder o no estar disponible una participación | Margen de seguridad menor que 3-de-5 |
| 3-de-5 | Se pueden perder dos participaciones; seguridad sólida | Mayor sobrecarga de coordinación |
| 3-de-7 | Nivel institucional; tolera dos fallos | Alto costo de coordinación |

Un punto de partida práctico para la mayoría de los equipos: **2-de-3** (resiliente, coordinación mínima) o **3-de-5** (institucional, mayor seguridad).

---

## Páginas relacionadas

- [FROST — Análisis técnico detallado](FROST.md) — detalles criptográficos del protocolo (DKG, rondas de firma, pruebas de seguridad)
- [Ywallet Guía de demostración de FROST](/guides/Ywallet_FROST_Demo) — contexto; Ywallet ya no recibe mantenimiento
- [Claves de visualización](Viewing_Keys.md) — acceso de solo lectura a direcciones blindadas (complementario a la custodia de umbral)
- [Zcash Activos blindados](Zcash_Shielded_Assets.md) — FROST también es infraestructura clave para la emisión de ZSA

## Recursos

- [Artículo de investigación de FROST (Komlo y Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [Borrador del estándar IETF de FROST (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Implementación de Zcash Foundation FROST](https://frost.zfnd.org)
- [Chelsea Komlo — ¿Qué son las firmas de umbral? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Firmas digitales de umbral](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Firmas de umbral Schnorr asíncronas robustas (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
