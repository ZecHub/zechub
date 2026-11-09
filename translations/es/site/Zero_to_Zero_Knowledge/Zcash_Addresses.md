# Zero to Zero Knowledge: Transacciones transparentes [Transparent] vs blindadas [Shielded] y direcciones unificadas [Unified Addresses]

**Serie:** Zero to Zero Knowledge

Si estás aprendiendo sobre Zcash por primera vez, descubrirás que hay dos tipos de transacciones disponibles: **Transparentes** y **Blindadas**.  

Hoy aprenderemos sobre ellas y cubriremos una de las nuevas funcionalidades del ecosistema #Zcash, las **Direcciones unificadas**.

---

## Transacciones transparentes vs blindadas

- Las **Transacciones transparentes** usan **direcciones-t** (codificadas en Base58). Todo es públicamente visible, igual que en Bitcoin.  
- Las **Transacciones blindadas** usan direcciones codificadas para los pool Sapling o Orchard. Estas ocultan al remitente, al receptor y el importe mediante pruebas zero-knowledge [zero-knowledge proofs].

Una **Transacción blindada** se refiere a cualquier transacción con direcciones codificadas para los pool Sapling/Orchard.

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

Las **Direcciones unificadas (UA)** están diseñadas para **unificar** transacciones blindadas o transparentes en una sola dirección [address].

---

## Tipos de dirección en Zcash

Hay 3 tipos de dirección en uso:

1. **(T) Transparente** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Dirección unificada** – Bech32m  

El número de caracteres (y, por tanto, el tamaño del código QR) aumenta con cada tipo.

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Cómo funcionan las direcciones unificadas

Las direcciones y claves se codifican como una secuencia de bytes (**Codificación sin procesar [Raw Encoding]**).  
Una **Codificación de receptor [Receiver Encoding]** incluye toda la información necesaria para transferir un activo mediante un protocolo específico.

La codificación sin procesar de una Dirección unificada es una combinación de codificaciones (código de tipo, longitud, dirección) de receptores:

- UA: `0x03`  
- Sapling: `0x02`  
- Transparente: `0x01`  

**Importante**: Debe haber **al menos una dirección de pago blindada [shielded payment address]** en cada UA. (Las direcciones Sprout ya no son compatibles después de la actualización Canopy.)

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Especificación completa: **[ZIP-316: Direcciones unificadas](https://zips.z.cash/zip-0316)**

---

## Beneficios de las direcciones unificadas

- **Más fácil para los exchanges**: Ahora pueden admitir depósitos/retiros blindados de forma más segura.  
- **Preparadas para el futuro**: Se pueden añadir nuevos pool blindados sin romper las billeteras [wallets].  
- **Blindadas por defecto [Shielded-by-Default]**: Cada UA contiene al menos una dirección blindada, por lo que la privacidad [privacy] siempre está disponible.

Este es un cambio fundamental que ya está ayudando a que más ZEC se mueva al pool blindado.

---

## Transacciones y acciones [Actions] de Orchard

Orchard introdujo un nuevo concepto llamado **Acciones**:

- Reducen la filtración de metadatos al usar un **único ancla [single anchor]** para todas las Acciones de una transacción.  
- Fusionan los campos de Gasto + Salida (V4) en un único compromiso de valor [value commitment].  
- Esto permite optimizaciones de rendimiento del sistema de pruebas Halo2.

Daira explica las posiciones de las anclas (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Balance de valor y privacidad

En algunos casos (p. ej., transacciones entre pool), los importes pueden ser visibles para un observador externo. Sin embargo, `valueBalanceSapling` y `valueBalanceOrchard` usan **compromisos homomórficos [homomorphic commitments]** para demostrar el total de ZEC en los pool blindados y evitar la falsificación.

Lee más: [ZIP 209: Prohibir balances de pool de valor de cadena fuera de rango](https://zips.z.cash/zip-0209)

---

## Mejoras futuras

El equipo de ECC está trabajando en nuevos métodos RPC en `zcashd` (que reemplazan a `z_sendmany`) que permitirán a los usuarios previsualizar y aceptar/rechazar una transacción propuesta según sus características de privacidad.

---

## Recomendación

Este hilo originalmente apuntaba a **YWallet**, por el plan de transacción que mostraba antes de pulsar enviar. YWallet ya no recibe mantenimiento y no se actualizará para Ironwood, por lo que ya no puede seguir la red [chain]. Elige en su lugar una billetera con mantenimiento de la página [Billeteras](https://zechub.wiki/wallets), y prefiere una que te indique qué revelará una transacción antes de enviarla.

Excelente artículo sobre la privacidad de las transacciones: https://medium.com/@hanh.huynh/

---

**Hilo original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Esta página fue recopilada a partir del hilo original de Zero to Zero Knowledge para la wiki de ZecHub.*
