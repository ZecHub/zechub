<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>


# Transacciones

ZEC es un activo digital ampliamente utilizado para pagos, que ofrece sólidas funciones de privacidad [privacy] que lo hacen adecuado para diversas transacciones, como pagar a amigos, realizar compras o hacer donaciones. Para maximizar la privacidad y la seguridad, es esencial comprender cómo funcionan los distintos tipos de transacciones dentro de Zcash.

## TL;DR

- Zcash admite dos tipos de transacción: **blindada [shielded]**, que mantiene los detalles privados, y **transparente [transparent]**, que los registra públicamente.
- Las direcciones [addresses] blindadas comienzan con `u` o `z`. Las direcciones transparentes comienzan con `t` y se comportan de forma muy similar a una dirección de Bitcoin.
- La elección es tuya en cada pago [payment]. La privacidad es una opción que Zcash te ofrece, no una configuración que otra persona decide por ti.
- Retirar fondos de un exchange es el caso más común en el que las personas pierden privacidad. Si el exchange solo admite retiros transparentes, blinda los fondos tú mismo una vez que lleguen.
- Las tarifas [fees] siguen [ZIP 317](https://zips.z.cash/zip-0317) y aumentan con el tamaño de la transacción. Las billeteras [wallets] que todavía envían la antigua tarifa fija pueden ver sus transacciones retrasadas.
- La mayoría de las transacciones de Zcash tienen una altura de expiración conforme a [ZIP 203](https://zips.z.cash/zip-0203). Si una transacción expira antes de ser minada, no puede confirmarse después de esa altura de expiración y podría necesitar enviarse nuevamente.

## Transacciones blindadas

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash explicado: transacciones blindadas de Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Las transacciones blindadas ocurren cuando mueves ZEC a tu billetera blindada. La dirección de tu billetera blindada comienza con `u` o `z`. Al enviar transacciones blindadas, tú y las personas con quienes realizas transacciones pueden mantener un nivel de privacidad que no es posible en redes de pago públicas por defecto.

Enviar una transacción blindada es más sencillo cuando usas una billetera que admite la red actual de Zcash y los pools blindados actuales. Antes de confiar en una billetera para preservar la privacidad, comprueba si admite envíos blindados, recepciones blindadas y el pool que planeas usar. Al retirar ZEC de un exchange, comprueba si el exchange admite retiros blindados o transparentes. Si solo admite retiros transparentes, mueve los fondos a una billetera compatible con transacciones blindadas después de que lleguen.

Usar transacciones blindadas para enviar y recibir fondos es la mejor manera de preservar la privacidad y reducir el riesgo de filtrar datos de pagos.

## Transacciones transparentes

Las transacciones transparentes funcionan de forma similar a las transacciones de Bitcoin. Los detalles de las transacciones son públicamente visibles en la blockchain, incluidas las direcciones y los valores transparentes. Las transacciones transparentes deben evitarse cuando la privacidad sea una prioridad.

Las direcciones transparentes siguen siendo útiles en algunas situaciones, especialmente cuando un exchange o servicio no admite direcciones blindadas. Si recibes ZEC en una dirección transparente, considera blindarlo antes de realizar pagos posteriores.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="¡Aprende sobre las billeteras blindadas de Zcash!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Una forma sencilla de imaginarlo

Una transacción transparente es una postal. El cartero la entrega, pero cualquiera que la manipule en el camino puede leer el mensaje, ver quién la envió y ver quién la recibe.

Una transacción blindada es un sobre sellado. El servicio postal sigue confirmando que una carta real con franqueo real pasó por el sistema, y nadie puede falsificar una ni enviar la misma carta dos veces. Lo que contiene el sobre permanece entre el remitente y el destinatario.

La parte importante es que Zcash te permite decidir cuál enviar, pago por pago.

## Tarifas de Zcash

Deja que tu billetera calcule la tarifa de red y revísala antes de enviar. Las tarifas se pagan en ZEC: **1 ZEC = 100.000.000 zatoshis**. Una tarifa en dólares estadounidenses también depende del tipo de cambio de ZEC.

### Por qué dos pagos pueden tener tarifas diferentes

[ZIP 317](https://zips.z.cash/zip-0317#fee-calculation) calcula la tarifa convencional a partir de **acciones lógicas** (logical actions), en lugar de un porcentaje del monto enviado:

```text
fee in zatoshis = marginal fee × max(2, logical actions)
```

Las acciones lógicas miden los componentes de una transacción. Por ejemplo, una transacción solo de Orchard usa su número de acciones Orchard; una transacción solo de Sapling usa el mayor entre su número de gastos y de salidas. Las contribuciones de distintos pools se suman. Los componentes transparentes usan un cálculo basado en el tamaño. Consulta ZIP 317 para ver la fórmula completa, incluidos Ironwood y Sprout heredado.

Por lo tanto, gastar muchas notas [notes] pequeñas recibidas o usar varios pools puede costar más que un pago más sencillo del mismo valor. El número de destinatarios por sí solo no sirve como calculadora de tarifas: el cambio y el relleno [padding] también influyen.

Estos ejemplos parten de un recuento de acciones lógicas [logical-action count] ya calculado:

| Acciones lógicas | A 5.000 zatoshis por acción | A 1.000 zatoshis por acción |
| --- | --- | --- |
| 2 | 10.000 zatoshis / 0,0001 ZEC | 2.000 zatoshis / 0,00002 ZEC |
| 3 | 15.000 zatoshis / 0,00015 ZEC | 3.000 zatoshis / 0,00003 ZEC |
| 10 | 50.000 zatoshis / 0,0005 ZEC | 10.000 zatoshis / 0,0001 ZEC |

### Qué tarifa marginal se aplica

**Verificado el 11 de noviembre de 2026:** ZIP 317 indica la revisión 2 y [ZIP 2009](https://zips.z.cash/zip-2009) como propuestos. Antes de la revisión 2, la tarifa marginal es de 5000 zatoshis. La revisión 2 establece 1000, lo que da un mínimo de 2000 zatoshis en lugar de 10 000.

La propuesta especifica la altura de Mainnet **3.590.000**, prevista aproximadamente para el 19 de noviembre de 2026, y la altura de Testnet **4.465.026**. Una estimación de calendario no es la condición de activación. Para las billeteras, la altura relevante es la del bloque en el que se espera que se mine la transacción; los nodos usan la altura del siguiente bloque. Vuelve a consultar las especificaciones enlazadas y las indicaciones de versión de tu billetera a medida que cambie el despliegue.

No fuerces manualmente la tarifa más baja solo porque una propuesta o una versión de software la mencione. ZIP 2009 exige que los nodos implementen la nueva política de retransmisión antes de que las billeteras adopten la tarifa; los nodos que usan los parámetros antiguos pueden negarse a retransmitir la transacción con la tarifa más baja. Testnet y Mainnet también tienen alturas de activación diferentes.

### Si la estimación parece incorrecta

Comprueba que tu billetera esté actualizada y sincronizada. Compara por separado su tarifa de red con el cargo por retiro del servicio que envía: una cotización del servicio no es la fórmula ZIP 317. Para un pago pendiente, sigue los [pasos de solución de problemas que aparecen a continuación](#troubleshooting-stuck-transactions) antes de volver a enviar.

ZIP 317 es una política de billeteras y nodos, no una regla de consenso que exija esta tarifa exacta. Pagar la tarifa convencional mejora la compatibilidad de retransmisión; no garantiza un tiempo de confirmación.

## Solución de problemas de transacciones atascadas

Una transacción de Zcash no es definitiva solo porque aparezca en tu billetera. Se vuelve definitiva para el uso habitual después de ser minada en un bloque [block] y recibir suficientes confirmaciones para tu situación. Los exchanges y servicios pueden requerir más confirmaciones de las que una billetera muestra por defecto.

La expiración es una **altura de bloque** (block height), no una cuenta regresiva fija. Para un pago ordinario con una altura de expiración distinta de cero, esa altura es el último bloque en el que puede ser minado. Por ejemplo, un pago que expira en la altura 3539 puede incluirse en el bloque 3539; el bloque 3540 ya es demasiado tarde. Una altura de expiración de 0 significa que un pago ordinario no tiene expiración. Consulta [ZIP 203](https://zips.z.cash/zip-0203).

Los valores predeterminados no son plazos universales. El ZIP 203 especifica 40 bloques después de Blossom, aproximadamente 50 minutos con un espaciado objetivo de 75 segundos. El cambio propuesto de NU7 recomienda 120 bloques con un espaciado objetivo de 25 segundos, también aproximadamente 50 minutos ([ZIP 218](https://zips.z.cash/zip-0218)). La configuración y las implementaciones de las billeteras pueden variar, y los intervalos reales entre bloques cambian. Comprueba la altura de expiración de la transacción concreta en lugar de calcular cuándo reenviarla.

La expiración no revierte un pago ya minado ni crea una transacción de reembolso. Si la original expiró sin haber sido minada, nunca se liquidó on-chain. Es posible que tu billetera necesite sincronizarse antes de volver a mostrar los fondos asociados como disponibles para gastar.

Usa este árbol de decisiones antes de reenviar:

1. **¿Tu billetera muestra un ID de transacción?**
   - Si no, es posible que la billetera aún no haya creado o transmitido la transacción. Revisa el estado de sincronización, la conexión a internet, la versión de la billetera y cualquier mensaje de error de la billetera.
   - Si es así, copia el ID de transacción y continúa.
2. **¿La transacción está confirmada en un bloque?**
   - Si es así, espera el número de confirmaciones que exija tu billetera, exchange, comercio o servicio.
   - Si no, continúa.
3. **¿La transacción no minada ha superado su altura de expiración distinta de cero?**
   - Si no, no reenvíes manualmente el mismo pago todavía. La transacción original aún podría confirmarse.
   - Si es así, deja que la billetera se sincronice y verifica que la original no se haya minado en esa altura o antes. Luego sigue las indicaciones de la billetera para crear una transacción de reemplazo si es necesario.
4. **¿La transacción aparece en un servidor o explorador pero no en otro?**
   - Trátalo como un problema de visibilidad en la red, no como una prueba de que la transacción falló. Distintos nodos pueden tener vistas diferentes de la mempool.
   - Espera, vuelve a sincronizar tu billetera o cambia a otro servidor de confianza si tu billetera lo permite.
5. **¿La transacción desapareció después de aparecer como confirmada?**
   - Una breve reorganización de la red puede eliminar temporalmente una transacción de la cadena principal.
   - Espera a que se generen más bloques. Si la transacción vuelve a aparecer, sigue esperando las confirmaciones. Si no vuelve y más tarde expira, crea una nueva transacción.
6. **¿La billetera te pide que reenvíes?**
   - Sigue las indicaciones actuales de la billetera solo después de comprobar que la transacción anterior ha expirado, ha fallado o ya no es válida.
   - Si tienes dudas, consulta al soporte antes de volver a enviar.

## Pendientes, expiradas, descartadas y reorganizadas

- **Pendiente** significa que la transacción se ha creado o difundido, pero aún no ha sido minada en un bloque.
- **Expirada** significa que la altura de expiración de la transacción ha pasado. Conforme a ZIP 203, una transacción con una altura de expiración no puede ser minada después de esa altura.
- **Descartada** significa que uno o más nodos ya no conservan la transacción en su mempool. Esto puede ocurrir debido a la expiración, tarifas bajas, políticas del mempool, comportamiento tras reinicios o diferencias de retransmisión.
- **Reorganizada** significa que un bloque que contenía previamente la transacción ya no forma parte de la mejor cadena. La transacción puede ser minada nuevamente más adelante o puede volver a estar pendiente si sigue siendo válida.

## Cuándo no reenviar

No reenvíes inmediatamente solo porque una transacción esté pendiente, sea lenta o falte en un explorador. Reenviar demasiado pronto puede causar confusión y, según cómo la billetera construya el nuevo pago, podría implicar el riesgo de pagar dos veces.

Espera u obtén asistencia primero cuando:

- La transacción tiene un ID de transacción y no ha expirado.
- Un servidor la muestra mientras que otro no.
- Fue minada recientemente, pero perdió confirmaciones después de una posible reorganización.
- El servicio receptor no ha terminado de contar las confirmaciones.
- Tu billetera aún se está sincronizando.

Normalmente es más seguro reenviar solo después de que la billetera marque claramente la transacción como expirada o fallida, o después de que el soporte confirme que la transacción original no puede confirmarse.

## Comprobaciones seguras para la privacidad

Puedes comprobar el estado básico de una transacción sin exponer más información de la necesaria:

- Comprueba si tu billetera está completamente sincronizada.
- Comprueba si la aplicación de billetera está actualizada.
- Comprueba si la transacción tiene un ID de transacción.
- Comprueba si la transacción está confirmada, pendiente, expirada o fallida.
- Comprueba la altura actual del bloque y compárala con la altura de expiración de la transacción si tu billetera la muestra.
- Para las transacciones transparentes, un explorador de bloques puede mostrar la transacción pública, las direcciones, los valores y las confirmaciones.
- Para las transacciones blindadas, un explorador de bloques puede mostrar que existe una transacción, pero no puede mostrar el remitente, destinatario, importe ni detalles del memo blindados.

## Qué no compartir públicamente

Nunca publiques lo siguiente en un chat público, redes sociales o un rastreador de incidencias:

- Frase semilla [seed phrase] o frase de recuperación
- Claves de gasto [spending key], clave privada o copia de seguridad de la billetera
- Full Viewing Key
- Capturas de pantalla que muestren saldos, direcciones completas, memos, códigos QR o detalles de cuentas de exchange
- Documentos de identidad personales o registros de recuperación de cuentas

Un ID de transacción es público en la red, pero aún puede vincular tu pregunta de soporte con tu identidad. Si la privacidad es importante, compártelo únicamente con un canal de soporte de confianza.

## Qué necesitan los equipos de soporte

Al pedir ayuda al soporte de una billetera, exchange o servicio, comparte solo la información útil mínima:

- Nombre de la billetera o servicio
- Versión de la aplicación y sistema operativo
- Si la transacción es blindada, transparente o entre direcciones blindadas y transparentes
- ID de transacción, si te sientes cómodo compartiéndolo
- Hora aproximada de envío
- Si la billetera está completamente sincronizada
- Estado actual mostrado por la billetera
- Mensaje de error exacto, con los datos privados eliminados
- Captura de pantalla con saldos, direcciones, memos y detalles de cuenta ocultos

Los equipos de soporte no necesitan tu frase semilla, claves de gasto, clave privada ni claves de visualización completas.

## Errores comunes

- **Suponer que cualquier billetera que incluya ZEC puede enviarlo de forma privada.** Varias billeteras multidivisa solo admiten el lado transparente de Zcash. Comprueba los pools compatibles con la billetera antes de depender de ella para preservar la privacidad. La página [Billeteras](https://zechub.wiki/using-zcash/wallets) enumera esto para cada opción.
- **Retirar a una dirección transparente y dejar allí los fondos.** El retiro en sí es público, y cada movimiento posterior desde esa dirección también seguirá siendo público. Blinda los fondos una vez que lleguen.
- **Tratar la privacidad como algo que activas una sola vez.** Cada transacción es una elección separada. Enviar una transacción blindada hoy no deshace un pago transparente que realizaste la semana pasada.
- **Reutilizar una dirección transparente para todo.** Debido a que la actividad transparente es permanentemente visible, una única dirección reutilizada vincula gradualmente pagos que no tenían motivo para estar conectados.
- **Enviar con una tarifa predeterminada desactualizada.** Las billeteras que no han adoptado ZIP 317 aún pueden enviar la antigua tarifa fija, lo que puede dejar una transacción sin confirmar.
- **Reenviar antes de la expiración.** Una transacción pendiente aún puede confirmarse hasta que expire. Comprueba el estado de expiración antes de crear otro pago.

## Nota

Ten en cuenta que la forma más segura de utilizar ZEC es usar transacciones blindadas siempre que el remitente, el destinatario, la billetera y el servicio las admitan. Algunas billeteras y exchanges admiten [direcciones unificadas](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), que pueden combinar múltiples tipos de receptores de Zcash en una sola dirección.

## Recursos

- [ZIP 203: Expiración de transacciones](https://zips.z.cash/zip-0203)
- [ZIP 317: Mecanismo proporcional de tarifas de transferencia](https://zips.z.cash/zip-0317)
- [Zcash ZIPs](https://zips.z.cash/)

## Páginas relacionadas

- [Billeteras](/using-zcash/wallets) - qué billeteras admiten envíos blindados y cuáles son solo transparentes
- [Divulgaciones de pago](/zcash-tech/payment-disclosures) - cómo un remitente puede demostrar detalles seleccionados de un pago blindado
- [Pools blindados](/using-zcash/shielded-pools) - Sapling y Orchard, los pools en los que viven tus fondos blindados
- [Memos](/using-zcash/memos) - mensajes cifrados que pueden viajar con una transacción blindada
- [Direcciones transparentes de exchanges](/using-zcash/transparent-exchange-addresses) - direcciones TEX y por qué los exchanges las usan
- [Exchanges custodios](/using-zcash/custodial-exchanges) - qué exchanges admiten retiros blindados

## Conversor de ZEC a ZAT
