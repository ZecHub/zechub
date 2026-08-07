---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transacciones

ZEC es un activo digital ampliamente utilizado para pagos, que ofrece sólidas funciones de privacidad que lo hacen adecuado para diversas transacciones como pagar a amigos, hacer compras o donar. Para maximizar la privacidad y la seguridad, es esencial comprender cómo funcionan los diferentes tipos de transacciones dentro de Zcash.

## Resumen rápido

- Zcash admite dos tipos de transacción: **blindadas**, que mantienen los detalles en privado, y **transparentes**, que los registran públicamente.
- Las direcciones blindadas comienzan con `u` o `z`. Las direcciones transparentes comienzan con `t` y se comportan de forma muy similar a una dirección de Bitcoin.
- La elección es tuya en cada pago. La privacidad es una opción que Zcash te ofrece, no una configuración que otra persona decide por ti.
- Retirar desde un exchange es el lugar más común donde las personas pierden privacidad. Si el exchange solo admite retiros transparentes, blinda los fondos tú mismo en cuanto lleguen.
- Las comisiones siguen [ZIP 317](https://zips.z.cash/zip-0317) y aumentan con el tamaño de la transacción. Las wallets que aún envían la antigua comisión fija pueden ver sus transacciones retrasadas.

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

Las transacciones blindadas ocurren cuando mueves ZEC a tu wallet blindada. La dirección de tu wallet blindada comienza con una U o una Z. Al enviar transacciones blindadas, te aseguras de que tú y las personas con las que transactúas mantengan un nivel de privacidad que no es posible en otras redes de pago P2P. Enviar una transacción blindada es muy fácil, solo tienes que asegurarte de dos cosas. La primera es que estás utilizando el tipo de wallet correcto. La forma más sencilla de asegurarte de que estás usando el tipo correcto de wallet es descargar una [wallet](https://zechub.wiki/wallets). La segunda cosa importante es mover ZEC a una wallet blindada. Al retirar ZEC desde un exchange, necesitas saber si el exchange admite retiros blindados o transparentes. Si admite retiros blindados, simplemente puedes retirar ZEC a tu dirección blindada. Si el exchange solo admite retiros transparentes, entonces necesitas usar YWallet y blindar automáticamente tu ZEC una vez recibido. Utilizar únicamente transacciones blindadas para enviar y recibir fondos es la mejor manera de mantener la privacidad y reducir el riesgo de filtrar datos

## Transacciones transparentes

Las transacciones transparentes funcionan de manera similar, pero carecen de protecciones de privacidad, lo que hace que los detalles de la transacción sean visibles públicamente en la blockchain. Las transacciones transparentes deben evitarse cuando la privacidad es una prioridad. Nota: Las wallets transparentes pueden encontrar problemas debido a ZIP-317, que exige comisiones proporcionales a la complejidad de la transacción. Las comisiones predeterminadas pueden provocar rechazos o demoras, por lo que la personalización de la comisión es crucial.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Una manera sencilla de imaginarlo

Una transacción transparente es una postal. El cartero la entrega, pero cualquiera que la manipule por el camino puede leer el mensaje, ver quién la envió y ver quién la recibe.

Una transacción blindada es un sobre sellado. El servicio postal sigue confirmando que una carta real con franqueo real pasó por el sistema, y nadie puede falsificar una ni enviar la misma carta dos veces. Lo que contiene el sobre queda entre el remitente y el destinatario.

La parte importante es que Zcash te permite decidir cuál enviar, pago por pago.

## Gestión de comisiones para transacciones transparentes

Guía de ZIP-317: La estructura de comisiones escala con la complejidad de la transacción, lo que requiere ajustes más allá de la comisión estándar de 0.00001 ZEC.
Ejemplo de cálculo: Una transacción simple de una sola nota podría requerir una comisión de 0.0001 ZEC, aumentando aproximadamente 0.00005 ZEC por cada nota adicional.

Editar comisiones en wallets

Trust Wallet: Accede a la configuración avanzada tocando el icono de engranaje mientras creas una transacción. Ajusta cuidadosamente los campos Miner Tip Gwei y Max Fee Gwei para evitar que la transacción falle. Trust Wallet solo cobra comisiones de red.
Coinomi Wallet: Ofrece tres opciones de comisión dinámica: Low, Normal y High según las condiciones de la red. Para ajustes manuales, selecciona Custom en las monedas compatibles o usa Change Fee en la esquina superior derecha. Los usuarios pueden establecer comisiones por byte o kilobyte, lo que afecta los tiempos de confirmación. Se recomienda usar las opciones dinámicas si no estás seguro.

## Errores comunes

- **Suponer que cualquier wallet que liste ZEC puede enviarlo de forma privada.** Varias wallets multicripto solo admiten el lado transparente de Zcash. Verifica los pools compatibles de la wallet antes de confiar en ella para la privacidad. La página de [Wallets](https://zechub.wiki/using-zcash/wallets) enumera esto para cada opción.
- **Retirar a una dirección transparente y dejar allí los fondos.** El retiro en sí es público, y cualquier movimiento posterior desde esa dirección también seguirá siendo público. Blinda los fondos en cuanto lleguen.
- **Tratar la privacidad como algo que activas una sola vez.** Cada transacción es una elección independiente. Enviar de forma blindada hoy no deshace un pago transparente que hiciste la semana pasada.
- **Reutilizar una dirección transparente para todo.** Debido a que la actividad transparente es permanentemente visible, una sola dirección reutilizada vincula gradualmente pagos que no tenían ninguna razón para estar conectados.
- **Enviar con una comisión predeterminada desactualizada.** Las wallets que no han adoptado ZIP 317 todavía pueden enviar la antigua comisión fija, lo que puede hacer que una transacción quede sin confirmar.

## Nota

Ten en cuenta que la forma más segura de usar ZEC es utilizar únicamente transacciones blindadas. Algunas wallets están en proceso de implementar [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) que permiten a los usuarios y exchanges combinar direcciones transparentes y blindadas.

## Recursos

[ZIPS](https://zips.z.cash/)

## Páginas relacionadas

- [Wallets](/using-zcash/wallets) — qué wallets admiten envíos blindados y cuáles son solo transparentes
- [Pools blindados](/using-zcash/shielded-pools) — Sapling y Orchard, los pools donde viven tus fondos blindados
- [Memos](/using-zcash/memos) — mensajes cifrados que pueden acompañar una transacción blindada
- [Direcciones transparentes de exchange](/using-zcash/transparent-exchange-addresses) — direcciones TEX y por qué las usan los exchanges
- [Exchanges con custodia](/using-zcash/custodial-exchanges) — qué exchanges admiten retiros blindados

## Convertidor de ZEC a ZAT
