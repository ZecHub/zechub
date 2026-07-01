# De cero a conocimiento cero: Transacciones Transparentes vs Blindadas y Unified Addresses

**Serie:** De cero a conocimiento cero

Si estás aprendiendo sobre Zcash por primera vez, descubrirás que hay dos tipos de transacciones disponibles: **Transparentes** y **Blindadas**.  

Hoy aprenderemos sobre ellas y cubriremos una de las nuevas funciones del ecosistema de #Zcash, **Unified Addresses**.

---

## Transacciones Transparentes vs Blindadas

- Las **Transacciones Transparentes** usan **t-addresses** (codificadas en Base58). Todo es visible públicamente, igual que en Bitcoin.  
- Las **Transacciones Blindadas** usan direcciones codificadas para los pools **Sapling** u **Orchard**. Estas ocultan al remitente, al receptor y el monto mediante pruebas de conocimiento cero.

**Transacción Blindada** se refiere a cualquier transacción con direcciones codificadas para los pools Sapling/Orchard.

![Introducción a Transparentes vs Blindadas](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

Las **Unified Addresses (UAs)** están diseñadas para **unificar** las transacciones blindadas o transparentes en una sola dirección.

---

## Tipos de direcciones en Zcash

Hay 3 tipos de dirección en uso:

1. **(T) Transparente** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

El número de caracteres (y por lo tanto el tamaño del código QR) aumenta con cada tipo.

![Comparación de tipos de direcciones](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![Comparación del tamaño del código QR](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Cómo funcionan las Unified Addresses

Las direcciones y claves se codifican como una secuencia de bytes (**Raw Encoding**).  
Un **Receiver Encoding** incluye toda la información necesaria para transferir un activo usando un protocolo específico.

La codificación en bruto de una Unified Address es una combinación de codificaciones (typecode, length, addr) de receptores:

- UA: `0x03`  
- Sapling: `0x02`  
- Transparent: `0x01`  

**Importante**: Debe haber **al menos una dirección de pago blindada** en cada UA. (Las direcciones Sprout ya no son compatibles después de la actualización Canopy.)

![Estructura de codificación de UA](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Especificación completa: **[ZIP-316: Unified Addresses](https://zips.z.cash/zip-0316)**

---

## Beneficios de las Unified Addresses

- **Más fácil para los exchanges** - Ahora pueden admitir depósitos/retiros blindados de forma más segura.  
- **Preparadas para el futuro** - Se pueden añadir nuevos pools blindados sin romper las wallets.  
- **Blindado por defecto** - Cada UA contiene al menos una dirección blindada, por lo que la privacidad siempre está disponible.

Este es un cambio fundamental que ya está ayudando a que más ZEC se mueva hacia el pool blindado.

---

## Transacciones y Actions de Orchard

Orchard introdujo un nuevo concepto llamado **Actions**:

- Reducen la filtración de metadatos al usar un **ancla única** para todas las Actions de una transacción.  
- Fusionan los campos de (V4) Spend + Output en un único compromiso de valor.  
- Esto permite optimizaciones de rendimiento del sistema de pruebas Halo2.

Daira explica las posiciones del Anchor (zcon3):

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

En algunos casos (p. ej., transacciones entre pools) los montos pueden ser visibles para un observador externo. Sin embargo, `valueBalanceSapling` y `valueBalanceOrchard` usan **compromisos homomórficos** para probar el total de ZEC en los pools blindados y evitar la falsificación.

Lee más: [Defensa contra la falsificación en los pools blindados](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Mejoras futuras

El equipo de ECC está trabajando en nuevos métodos RPC en `zcashd` (que reemplazarán `z_sendmany`) que permitirán a los usuarios previsualizar y aceptar/rechazar una transacción propuesta según sus características de privacidad.

---

## Recomendación

¡Prueba la última versión de **YWallet**!  
Ya muestra un "Plan de transacción" en pantalla antes de que pulses enviar, ayudándote a tomar decisiones más privadas.

Gran artículo sobre privacidad de transacciones: https://medium.com/@hanh.huynh/

---

**Hilo original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Esta página fue compilada a partir del hilo original de Zero to Zero Knowledge para la wiki de ZecHub.*
