<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transacciones

ZEC es un activo digital ampliamente utilizado para pagos, que ofrece sólidas funciones de privacidad que lo hacen adecuado para diversas transacciones, como pagar a amigos, realizar compras o hacer donaciones. Para maximizar la privacidad y la seguridad, es esencial comprender cómo funcionan los distintos tipos de transacciones dentro de Zcash.

## TL;DR

- Zcash admite dos tipos de transacción: **blindadas**, que mantienen los detalles privados, y **transparentes**, que los registran públicamente.
- Las direcciones blindadas comienzan con `u` o `z`. Las direcciones transparentes comienzan con `t` y se comportan de forma muy similar a una dirección de Bitcoin.
- La elección es tuya en cada pago. La privacidad es una opción que Zcash te ofrece, no una configuración que otra persona decide por ti.
- Retirar fondos de un exchange es el lugar más común donde las personas pierden privacidad. Si el exchange solo admite retiros transparentes, blinda los fondos tú mismo una vez que lleguen.
- Las comisiones siguen [ZIP 317](https://zips.z.cash/zip-0317) y aumentan con el tamaño de la transacción. Las wallets que aún envían la antigua comisión fija pueden ver sus transacciones retrasadas.
- La mayoría de las transacciones de Zcash tienen una altura de expiración conforme a [ZIP 203](https://zips.z.cash/zip-0203). Si una transacción expira antes de ser minada, no puede confirmarse después de esa altura de expiración y podría necesitar enviarse de nuevo.

## Transacciones blindadas

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

Las transacciones blindadas ocurren cuando mueves ZEC a tu wallet blindada. La dirección de tu wallet blindada comienza con `u` o `z`. Al enviar transacciones blindadas, tú y las personas con quienes realizas transacciones pueden mantener un nivel de privacidad imposible en redes de pago públicas por defecto.

Enviar una transacción blindada es más fácil cuando utilizas una wallet compatible con la red actual de Zcash y los pools blindados actuales. Antes de confiar en una wallet para proteger tu privacidad, comprueba si admite envíos blindados, recepciones blindadas y el pool que planeas utilizar. Al retirar ZEC de un exchange, verifica si el exchange admite retiros blindados o transparentes. Si solo admite retiros transparentes, mueve los fondos a una wallet con capacidad de blindaje después de que lleguen.

Usar transacciones blindadas para enviar y recibir fondos es la mejor manera de preservar la privacidad y reducir el riesgo de filtrar datos de pago.

## Transacciones transparentes

Las transacciones transparentes funcionan de forma similar a las transacciones de Bitcoin. Los detalles de la transacción son visibles públicamente en la blockchain, incluidas las direcciones y los valores transparentes. Las transacciones transparentes deben evitarse cuando la privacidad sea una prioridad.

Las direcciones transparentes siguen siendo útiles en algunas situaciones, especialmente cuando un exchange o servicio no admite direcciones blindadas. Si recibes ZEC en una dirección transparente, considera blindarlo antes de realizar pagos posteriores.

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

## Una forma sencilla de imaginarlo

Una transacción transparente es una postal. El cartero la entrega, pero cualquiera que la manipule durante el trayecto puede leer el mensaje, ver quién la envió y quién la recibe.

Una transacción blindada es un sobre sellado. El servicio postal aún confirma que una carta real con franqueo real pasó por el sistema, y nadie puede falsificar una ni enviar la misma carta dos veces. Lo que contiene el sobre permanece entre el remitente y el destinatario.

Lo importante es que Zcash te permite decidir cuál enviar, pago a pago.

## Comisiones de Zcash

Zcash no utiliza unidades de gas al estilo de Ethereum. Las comisiones de transacción de Zcash se pagan en ZEC, normalmente medidas en **zatoshis**. Un ZEC equivale a 100,000,000 zatoshis.

[ZIP 317](https://zips.z.cash/zip-0317) define un mecanismo de comisión convencional que se escala según la complejidad de la transacción. En lugar de que cada transacción use la antigua comisión fija de 1,000 zatoshis, la comisión convencional se basa en "acciones lógicas", como entradas, salidas y acciones blindadas. Las transacciones simples suelen comenzar alrededor de 10,000 zatoshis, o 0.0001 ZEC, y las transacciones más complejas pueden requerir más.

En la mayoría de las wallets actuales, los usuarios no deberían necesitar calcular manualmente las comisiones de ZIP 317. La wallet debería elegir automáticamente una comisión adecuada. Si una wallet aún usa la antigua comisión fija o te permite establecer una comisión muy inferior a la comisión convencional de ZIP 317, la transacción puede retrasarse, recibir menor prioridad, ser descartada por algunos nodos o no retransmitirse de forma fiable.

## Solución de problemas de transacciones atascadas

Una transacción de Zcash no es definitiva solo porque aparezca en tu wallet. Se vuelve definitiva para el uso habitual después de ser minada en un bloque y recibir suficientes confirmaciones para tu situación. Los exchanges y servicios pueden requerir más confirmaciones de las que una wallet muestra por defecto.

Utiliza este árbol de decisiones antes de reenviar:

1. **¿Tu wallet muestra un ID de transacción?**
   - Si no, es posible que la wallet aún no haya creado o transmitido la transacción. Comprueba el estado de sincronización, la conexión a internet, la versión de la wallet y cualquier mensaje de error de la wallet.
   - Si sí, copia el ID de la transacción y continúa.
2. **¿La transacción está confirmada en un bloque?**
   - Si sí, espera el número de confirmaciones requerido por tu wallet, exchange, comercio o servicio.
   - Si no, continúa.
3. **¿La transacción ha alcanzado su altura de expiración?**
   - Si no, aún no reenvíes manualmente el mismo pago. La transacción original todavía podría confirmarse.
   - Si sí, la transacción no puede minarse después de esa altura de expiración. Tu wallet podría marcarla como expirada o fallida, y es posible que debas crear una nueva transacción.
4. **¿La transacción aparece en un servidor o explorador, pero no en otro?**
   - Trata esto como un problema de visibilidad de la red, no como prueba de que la transacción falló. Distintos nodos pueden tener diferentes vistas del mempool.
   - Espera, vuelve a sincronizar tu wallet o cambia a otro servidor de confianza si tu wallet lo admite.
5. **¿La transacción desapareció después de aparecer como confirmada?**
   - Una reorganización corta de la cadena puede eliminar temporalmente una transacción de la mejor cadena.
   - Espera más bloques. Si la transacción vuelve a aparecer, continúa esperando confirmaciones. Si no vuelve a aparecer y después expira, crea una nueva transacción.
6. **¿La wallet te pide que reenvíes?**
   - Sigue la guía actual de la wallet solo después de comprobar que la transacción anterior está expirada, fallida o ya no es válida.
   - Si no estás seguro, pide ayuda al soporte antes de enviar de nuevo.

## Pendiente, expirada, descartada y reorganizada

- **Pendiente** significa que la transacción se ha creado o transmitido, pero aún no se ha minado en un bloque.
- **Expirada** significa que la altura de expiración de la transacción ha pasado. Según ZIP 203, una transacción con una altura de expiración no puede minarse después de esa altura.
- **Descartada** significa que uno o más nodos ya no mantienen la transacción en su mempool. Esto puede ocurrir debido a la expiración, comisiones bajas, la política del mempool, el comportamiento tras reinicios o diferencias de retransmisión.
- **Reorganizada** significa que un bloque que contenía previamente la transacción ya no forma parte de la mejor cadena. La transacción puede minarse de nuevo más tarde, o puede volver a estar pendiente si sigue siendo válida.

## Cuándo no reenviar

No reenvíes inmediatamente solo porque una transacción esté pendiente, sea lenta o no aparezca en un explorador. Reenviar demasiado pronto puede causar confusión y, según cómo la wallet genere el nuevo pago, podría implicar el riesgo de pagar dos veces.

Espera o solicita ayuda al soporte primero cuando:

- La transacción tiene un ID de transacción y no ha expirado.
- Un servidor la muestra mientras otro no.
- Fue minada recientemente pero perdió confirmaciones después de una posible reorganización.
- El servicio receptor no ha terminado de contar las confirmaciones.
- Tu wallet aún se está sincronizando.

Normalmente es más seguro reenviar solo después de que la wallet marque claramente la transacción como expirada o fallida, o después de que el soporte confirme que la transacción original no puede confirmarse.

## Comprobaciones seguras para la privacidad

Puedes comprobar el estado básico de una transacción sin exponer más información de la necesaria:

- Comprueba si tu wallet está completamente sincronizada.
- Comprueba si la aplicación de la wallet está actualizada.
- Comprueba si la transacción tiene un ID de transacción.
- Comprueba si la transacción está confirmada, pendiente, expirada o fallida.
- Comprueba la altura actual del bloque y compárala con la altura de expiración de la transacción si tu wallet la muestra.
- Para las transacciones transparentes, un explorador de bloques puede mostrar la transacción pública, las direcciones, los valores y las confirmaciones.
- Para las transacciones blindadas, un explorador de bloques puede mostrar que existe una transacción, pero no puede mostrar el remitente blindado, el destinatario, el importe ni los detalles de la nota.

## Qué no compartir públicamente

Nunca publiques lo siguiente en un chat público, redes sociales o un rastreador de incidencias:

- Frase semilla o frase de recuperación
- Clave de gasto, clave privada o copia de seguridad de la wallet
- Clave de visualización completa
- Capturas de pantalla que muestren saldos, direcciones completas, notas, códigos QR o detalles de cuentas de exchange
- Documentos de identidad personales o registros de recuperación de cuentas

Un ID de transacción es público en la cadena, pero aún puede vincular tu solicitud de soporte con tu identidad. Si la privacidad es importante, compártelo solo con un canal de soporte de confianza.

## Lo que necesitan los equipos de soporte

Al pedir ayuda al soporte de una wallet, exchange o servicio, comparte solo la información útil mínima:

- Nombre de la wallet o servicio
- Versión de la aplicación y sistema operativo
- Si la transacción es blindada, transparente o entre direcciones blindadas y transparentes
- ID de transacción, si te sientes cómodo compartiéndolo
- Hora aproximada de envío
- Si la wallet está completamente sincronizada
- Estado actual mostrado por la wallet
- Mensaje de error exacto, con los datos privados eliminados
- Captura de pantalla con saldos, direcciones, notas y detalles de cuenta ocultos

Los equipos de soporte no necesitan tu frase semilla, clave de gasto, clave privada ni clave de visualización completa.

## Errores comunes

- **Suponer que cualquier wallet que incluya ZEC puede enviarlo de forma privada.** Varias wallets multidivisa solo admiten el lado transparente de Zcash. Comprueba los pools compatibles con la wallet antes de confiar en ella para proteger tu privacidad. La página de [Wallets](https://zechub.wiki/using-zcash/wallets) enumera esto para cada opción.
- **Retirar a una dirección transparente y dejar allí los fondos.** El retiro en sí es público, y cada movimiento posterior desde esa dirección también seguirá siendo público. Blinda los fondos una vez que lleguen.
- **Tratar la privacidad como algo que se activa una sola vez.** Cada transacción es una elección independiente. Enviar de forma blindada hoy no deshace un pago transparente que realizaste la semana pasada.
- **Reutilizar una dirección transparente para todo.** Dado que la actividad transparente es permanentemente visible, una sola dirección reutilizada vincula gradualmente pagos que no tenían razón para estar conectados.
- **Enviar con una comisión predeterminada desactualizada.** Las wallets que no han adoptado ZIP 317 aún pueden enviar la antigua comisión fija, lo que puede dejar una transacción sin confirmar.
- **Reenviar antes de la expiración.** Una transacción pendiente aún puede confirmarse hasta que expire. Comprueba el estado de expiración antes de crear otro pago.

## Nota

Ten en cuenta que la forma más segura de usar ZEC es mediante transacciones blindadas siempre que el remitente, el destinatario, la wallet y el servicio sean compatibles con ellas. Algunas wallets y exchanges admiten [direcciones unificadas](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), que pueden combinar varios tipos de receptores de Zcash en una sola dirección.

## Recursos

- [ZIP 203: Expiración de transacciones](https://zips.z.cash/zip-0203)
- [ZIP 317: Mecanismo de comisión de transferencia proporcional](https://zips.z.cash/zip-0317)
- [ZIPs de Zcash](https://zips.z.cash/)

## Páginas relacionadas

- [Wallets](/using-zcash/wallets) - qué wallets admiten envíos blindados y cuáles son solo transparentes
- [Pools blindados](/using-zcash/shielded-pools) - Sapling y Orchard, los pools en los que se encuentran tus fondos blindados
- [Notas](/using-zcash/memos) - mensajes cifrados que pueden acompañar una transacción blindada
- [Direcciones transparentes de exchanges](/using-zcash/transparent-exchange-addresses) - direcciones TEX y por qué los exchanges las utilizan
- [Exchanges con custodia](/using-zcash/custodial-exchanges) - qué exchanges admiten retiros blindados

## Convertidor de ZEC a ZAT
