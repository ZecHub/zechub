# ¿Qué son las direcciones TEX de Zcash?

Las direcciones TEX de Zcash representan un tipo único de dirección de recepción. Acrónimo de dirección "Transparent Exchange", es una codificación **única**, de tipo Unified (bech32m), de una sola dirección Transparent p2pkh.

Su único propósito es informar a una billetera compatible que debe realizar una transacción solo Transparent (T -> T).

La lógica es la siguiente: al detectar una dirección TEX, una billetera compatible la decodifica para obtener el receptor Transparent que contiene. Luego, la billetera envía los fondos requeridos para la tx desde el pool Shielded a una dirección Transparent efímera, separada y controlada por el usuario (Z -> T). Después envía esos fondos al receptor Transparent decodificado de la dirección TEX (T -> T).  

La propuesta técnica para las direcciones TEX se describe en Zcash [ZIP 320](https://zips.z.cash/zip-0320), que define un tipo de dirección exclusivamente para recibir fondos desde direcciones Transparent.

![TEX](https://i.ibb.co/8m7HPqV/ZashiTex.png)


Aunque las direcciones TEX aún no están ampliamente adoptadas, es posible que los usuarios de Zcash deban utilizarlas eventualmente.

## Cuándo necesito una dirección TEX

### **Necesitas** una dirección TEX cuando envías fondos a una dirección Transparent usando una billetera que no admite el envío directo a una dirección Transparent. 
Ciertas billeteras simplemente no permiten enviar directamente a una dirección Transparent y **puede que el destinatario no proporcione un equivalente TEX**. Por lo tanto, **convertir** de una dirección Transparent a una dirección TEX puede ser necesario en ocasiones. Esto puede lograrse manualmente ejecutando la implementación de referencia descrita en zip-320. Se puede encontrar una instancia alojada de un **Convertidor de Transparent a TEX** [AQUÍ](https://690e9524c66a3ecac5d54eff--jade-brioche-873777.netlify.app/).

### Necesitas una dirección TEX cuando envías fondos a un exchange centralizado que **REQUIERE que esos fondos provengan de una fuente Transparent**. 
Actualmente, [Binance](https://www.binance.com/) es el único exchange centralizado que utiliza direcciones TEX (y son la razón principal de la creación de TEX). 
Las direcciones TEX informan a una billetera compatible que todos los fondos enviados a esa dirección deben ser transparentes y excluyen que cualquier valor shielded sea enviado a dicha dirección.
Si un exchange como Binance rechaza el valor enviado, tiene los medios necesarios para devolver ese valor a la dirección de la que provino. También ayuda a entidades como Binance a cumplir con las leyes y regulaciones impuestas por los gobiernos u otras autoridades.


## ¿Qué billeteras admiten direcciones TEX?

Puedes ver la lista más actualizada en nuestra página de [wallets](https://zechub.wiki/wallets). Usa el **filtro de direcciones TEX.**
