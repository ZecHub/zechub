<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transacciones

ZEC es un activo digital ampliamente utilizado para pagos, que ofrece sólidas funciones de privacidad que lo hacen adecuado para diversas transacciones, como pagar a amigos, hacer compras o donar. Para maximizar la privacidad y la seguridad, es esencial entender cómo funcionan los distintos tipos de transacciones dentro de Zcash.

## TL;DR

- Zcash admite dos tipos de transacción: **shielded**, que mantiene los detalles privados, y **transparent**, que los registra públicamente.
- Las direcciones shielded comienzan con `u` o `z`. Las direcciones transparent comienzan con `t` y se comportan de forma muy similar a una dirección de Bitcoin.
- La elección es tuya en cada pago. La privacidad es una opción que Zcash te ofrece, no una configuración que otra persona decide por ti.
- Retirar desde un exchange es el lugar más común donde la gente pierde privacidad. Si el exchange solo admite retiros transparent, protege los fondos tú mismo una vez que lleguen.
- Las comisiones siguen [ZIP 317](https://zips.z.cash/zip-0317) y aumentan con el tamaño de la transacción. Las wallets que todavía envían la antigua comisión fija pueden ver sus transacciones retrasadas.
- La mayoría de las transacciones de Zcash tienen una altura de expiración bajo [ZIP 203](https://zips.z.cash/zip-0203). Si una transacción expira antes de ser minada, no puede confirmarse después de esa altura de expiración y puede ser necesario enviarla de nuevo.

## Transacciones Shielded

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Las transacciones shielded ocurren cuando mueves ZEC a tu wallet shielded. La dirección de tu wallet shielded comienza con `u` o `z`. Al enviar transacciones shielded, tú y las personas con las que transaccionas pueden mantener un nivel de privacidad que no es posible en redes de pago públicas por defecto.

Enviar una transacción shielded es más fácil cuando usas una wallet que admite la red actual de Zcash y los pools shielded actuales. Antes de confiar en una wallet para la privacidad, verifica si admite envíos shielded, recepción shielded y el pool que planeas usar. Al retirar ZEC desde un exchange, verifica si el exchange admite retiros shielded o transparent. Si solo admite retiros transparent, mueve los fondos a una wallet con capacidad shielded después de que lleguen.

Usar transacciones shielded para enviar y recibir fondos es la mejor manera de preservar la privacidad y reducir el riesgo de filtrar datos de pago.

## Transacciones Transparent

Las transacciones transparent funcionan de manera similar a las transacciones de Bitcoin. Los detalles de la transacción son visibles públicamente en la blockchain, incluidas las direcciones transparent y los valores transparent. Las transacciones transparent deben evitarse cuando la privacidad es una prioridad.

Las direcciones transparent siguen siendo útiles en algunas situaciones, especialmente cuando un exchange o servicio no admite direcciones shielded. Si recibes ZEC en una dirección transparent, considera protegerlo antes de hacer pagos posteriores.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Una Manera Sencilla de Visualizarlo

Una transacción transparent es una postal. El cartero la entrega, pero cualquiera que la manipule en el camino puede leer el mensaje, ver quién la envió y ver quién la recibe.

Una transacción shielded es un sobre sellado. El servicio postal sigue confirmando que una carta real con franqueo real pasó por el sistema, y nadie puede falsificar una ni enviar la misma carta dos veces. Lo que contiene el sobre queda entre el remitente y el destinatario.

Lo importante es que Zcash te permite decidir cuál enviar, pago por pago.

## Comisiones de Zcash

Zcash no usa unidades de gas al estilo de Ethereum. Las comisiones de transacción de Zcash se pagan en ZEC, normalmente medidas en **zatoshis**. Un ZEC equivale a 100,000,000 zatoshis.

[ZIP 317](https://zips.z.cash/zip-0317) define un mecanismo de comisión convencional que escala con la complejidad de la transacción. En lugar de que cada transacción use la antigua comisión fija de 1,000 zatoshis, la comisión convencional se basa en "acciones lógicas" como entradas, salidas y acciones shielded. Las transacciones simples suelen comenzar alrededor de 10,000 zatoshis, o 0.0001 ZEC, y las transacciones más complejas pueden requerir más.

En la mayoría de las wallets actuales, los usuarios no deberían necesitar calcular manualmente las comisiones de ZIP 317. La wallet debería elegir automáticamente una comisión adecuada. Si una wallet todavía usa la antigua comisión fija o te permite establecer una comisión muy por debajo de la comisión convencional de ZIP 317, la transacción puede retrasarse, perder prioridad, ser descartada por algunos nodos o no retransmitirse de forma fiable.

## Solución de Problemas de Transacciones Atascadas

Una transacción de Zcash no es final solo porque aparezca en tu wallet. Se vuelve final para el uso ordinario después de que es minada en un bloque y recibe suficientes confirmaciones para tu situación. Los exchanges y servicios pueden requerir más confirmaciones de las que una wallet muestra por defecto.

Usa este árbol de decisión antes de reenviar:

1. **¿Tu wallet muestra un ID de transacción?**
   - Si no, es posible que la wallet aún no haya creado o retransmitido la transacción. Revisa el estado de sincronización, la conexión a internet, la versión de la wallet y cualquier mensaje de error de la wallet.
   - Si sí, copia el ID de transacción y continúa.
2. **¿La transacción está confirmada en un bloque?**
   - Si sí, espera la cantidad de confirmaciones requerida por tu wallet, exchange, comercio o servicio.
   - Si no, continúa.
3. **¿La transacción ha alcanzado su altura de expiración?**
   - Si no, no reenvíes manualmente el mismo pago todavía. La transacción original aún puede confirmarse.
   - Si sí, la transacción no puede ser minada después de esa altura de expiración. Tu wallet puede marcarla como expirada o fallida, y puede que necesites crear una nueva transacción.
4. **¿La transacción aparece en un servidor o explorador pero no en otro?**
   - Trátalo como un problema de visibilidad de red, no como prueba de que la transacción falló. Distintos nodos pueden tener diferentes vistas de mempool.
   - Espera, resincroniza tu wallet o cambia a otro servidor de confianza si tu wallet lo admite.
5. **¿La transacción desapareció después de aparecer como confirmada?**
   - Una reorganización corta de la cadena puede eliminar temporalmente una transacción de la mejor cadena.
   - Espera más bloques. Si la transacción reaparece, sigue esperando confirmaciones. Si no reaparece y luego expira, crea una nueva transacción.
6. **¿La wallet te está pidiendo que la reenvíes?**
   - Sigue la guía actual de la wallet solo después de comprobar que la transacción anterior está expirada, fallida o ya no es válida.
   - Si no estás seguro, pide soporte antes de volver a enviar.

## Pendiente, Expirada, Descartada y Reorganizada

- **Pending** significa que la transacción ha sido creada o retransmitida, pero aún no ha sido minada en un bloque.
- **Expired** significa que la altura de expiración de la transacción ya pasó. Bajo ZIP 203, una transacción con altura de expiración no puede ser minada después de esa altura.
- **Dropped** significa que uno o más nodos ya no conservan la transacción en su mempool. Esto puede suceder por expiración, comisiones bajas, política de mempool, comportamiento tras reinicio o diferencias de retransmisión.
- **Reorged** significa que un bloque que antes contenía la transacción ya no forma parte de la mejor cadena. La transacción puede ser minada de nuevo más tarde, o puede volver a pendiente si sigue siendo válida.

## Cuándo No Reenviar

No reenvíes de inmediato solo porque una transacción esté pendiente, sea lenta o falte en un explorador. Reenviar demasiado pronto puede causar confusión y, dependiendo de cómo la wallet construya el nuevo pago, podría generar el riesgo de pagar dos veces.

Es mejor esperar o pedir soporte primero cuando:

- La transacción tiene un ID de transacción y no ha expirado.
- Un servidor la muestra mientras otro no.
- Fue minada recientemente pero perdió confirmaciones después de una posible reorganización.
- El servicio receptor no ha terminado de contar las confirmaciones.
- Tu wallet todavía se está sincronizando.

Por lo general, es más seguro reenviar solo después de que la wallet marque claramente la transacción como expirada o fallida, o después de que soporte confirme que la transacción original no puede confirmarse.

## Comprobaciones Seguras para la Privacidad

Puedes comprobar el estado básico de una transacción sin exponer más información de la necesaria:

- Comprueba si tu wallet está completamente sincronizada.
- Comprueba si la app de la wallet está actualizada.
- Comprueba si la transacción tiene un ID de transacción.
- Comprueba si la transacción está confirmada, pendiente, expirada o fallida.
- Comprueba la altura actual del bloque y compárala con la altura de expiración de la transacción si tu wallet la muestra.
- Para las transacciones transparent, un explorador de bloques puede mostrar la transacción pública, las direcciones, los valores y las confirmaciones.
- Para las transacciones shielded, un explorador de bloques puede mostrar que existe una transacción, pero no puede mostrar el remitente shielded, el destinatario, la cantidad ni los detalles del memo.

## Qué No Compartir Públicamente

Nunca publiques esto en un chat público, redes sociales o un rastreador de incidencias:

- Frase semilla o frase de recuperación
- Clave de gasto, clave privada o respaldo de la wallet
- Full Viewing Key
- Capturas de pantalla que muestren saldos, direcciones completas, memos, códigos QR o detalles de cuenta del exchange
- Documentos de identidad personales o registros de recuperación de cuenta

Un ID de transacción es público en la cadena, pero aun así puede conectar tu consulta de soporte con tu identidad. Si la privacidad importa, compártelo solo con un canal de soporte de confianza.

## Qué Necesitan los Equipos de Soporte

Al pedir ayuda al soporte de una wallet, exchange o servicio, comparte solo la información mínima útil:

- Nombre de la wallet o del servicio
- Versión de la app y sistema operativo
- Si la transacción es shielded, transparent o entre direcciones shielded y transparent
- ID de transacción, si te sientes cómodo compartiéndolo
- Hora aproximada de envío
- Si la wallet está completamente sincronizada
- Estado actual mostrado por la wallet
- Mensaje de error exacto, con los datos privados eliminados
- Captura de pantalla con saldos, direcciones, memos y detalles de cuenta ocultos

Los equipos de soporte no necesitan tu frase semilla, clave de gasto, clave privada ni Full Viewing Key.

## Errores Comunes

- **Suponer que cualquier wallet que liste ZEC puede enviarlo de forma privada.** Varias wallets multimoneda solo admiten el lado transparent de Zcash. Comprueba los pools compatibles de la wallet antes de confiar en ella para la privacidad. La página de [Wallets](https://zechub.wiki/using-zcash/wallets) enumera esto para cada opción.
- **Retirar a una dirección transparent y dejar los fondos allí.** El retiro en sí es público, y todo movimiento posterior desde esa dirección también permanece público. Protege los fondos una vez que lleguen.
- **Tratar la privacidad como algo que activas una sola vez.** Cada transacción es una elección independiente. Enviar shielded hoy no deshace un pago transparent que hiciste la semana pasada.
- **Reutilizar una dirección transparent para todo.** Como la actividad transparent es visible permanentemente, una sola dirección reutilizada va vinculando gradualmente pagos que no tenían por qué estar conectados.
- **Enviar con una comisión predeterminada desactualizada.** Las wallets que no han adoptado ZIP 317 pueden seguir enviando la antigua comisión fija, lo que puede dejar una transacción sin confirmar.
- **Reenviar antes de la expiración.** Una transacción pendiente aún puede confirmarse hasta que expire. Revisa el estado de expiración antes de crear otro pago.

## Nota

Ten en cuenta que la forma más segura de usar ZEC es usar transacciones shielded siempre que el remitente, el destinatario, la wallet y el servicio las admitan. Algunas wallets y exchanges admiten [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), que pueden combinar varios tipos de receptor de Zcash en una sola dirección.

## Recursos

- [ZIP 203: Expiración de Transacciones](https://zips.z.cash/zip-0203)
- [ZIP 317: Mecanismo Proporcional de Comisión por Transferencia](https://zips.z.cash/zip-0317)
- [ZIPs de Zcash](https://zips.z.cash/)

## Páginas Relacionadas

- [Wallets](/using-zcash/wallets) - qué wallets admiten envío shielded y cuáles son solo transparent
- [Pools Shielded](/using-zcash/shielded-pools) - Sapling y Orchard, los pools donde viven tus fondos shielded
- [Memos](/using-zcash/memos) - mensajes cifrados que pueden viajar con una transacción shielded
- [Direcciones Transparent de Exchange](/using-zcash/transparent-exchange-addresses) - direcciones TEX y por qué los exchanges las usan
- [Exchanges con Custodia](/using-zcash/custodial-exchanges) - qué exchanges admiten retiros shielded

## Convertidor de ZEC a ZAT
