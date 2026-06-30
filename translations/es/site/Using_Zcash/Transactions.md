<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>


# Transacciones

ZEC es un activo digital ampliamente utilizado para pagos, que ofrece sólidas funciones de privacidad que lo hacen adecuado para diversas transacciones, como pagar a amigos, realizar compras o hacer donaciones. Para maximizar la privacidad y la seguridad, es esencial comprender cómo funcionan los distintos tipos de transacciones dentro de Zcash.

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

Las transacciones blindadas ocurren cuando mueves ZEC a tu billetera blindada. La dirección de tu billetera blindada comienza con una U o una Z. Al enviar transacciones blindadas, te aseguras de que tú y las personas con las que realizas transacciones mantengan un nivel de privacidad que no es posible en otras redes de pago P2P. Enviar una transacción blindada es muy fácil, solo tienes que asegurarte de dos cosas. La primera es que estás usando el tipo de billetera correcto. La forma más sencilla de asegurarte de que estás usando el tipo correcto de billetera es descargar una [billetera](https://zechub.wiki/wallets). La segunda cosa importante es mover ZEC a una billetera blindada. Al retirar ZEC de un exchange, necesitas saber si el exchange admite retiros blindados o transparentes. Si admite retiros blindados, simplemente puedes retirar ZEC a tu dirección blindada. Si el exchange solo admite retiros transparentes, entonces necesitas usar YWallet y blindar automáticamente tu ZEC una vez recibido. Usar solo transacciones blindadas para enviar y recibir fondos es la mejor manera de mantener la privacidad y reducir el riesgo de filtrar datos.

## Transacciones transparentes

Las transacciones transparentes funcionan de manera similar, pero carecen de protecciones de privacidad, lo que hace que los detalles de la transacción sean públicamente visibles en la blockchain. Las transacciones transparentes deben evitarse cuando la privacidad es una prioridad. Nota: Las billeteras transparentes pueden encontrar problemas debido a ZIP-317, que requiere comisiones proporcionales a la complejidad de la transacción. Las comisiones predeterminadas pueden provocar rechazos o retrasos, por lo que la personalización de las comisiones es crucial.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="¡Aprende sobre las billeteras blindadas 🛡️Zcash!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Gestión de comisiones para transacciones transparentes

Guía de ZIP-317: La estructura de comisiones se ajusta según la complejidad de la transacción, lo que requiere ajustes más allá de la comisión estándar de 0.00001 ZEC.
Ejemplo de cálculo: Una transacción simple de una sola nota podría requerir una comisión de 0.0001 ZEC, aumentando aproximadamente 0.00005 ZEC por cada nota adicional.

Editar comisiones en las billeteras

Trust Wallet: Accede a la configuración avanzada tocando el ícono de engranaje mientras creas una transacción. Ajusta cuidadosamente los campos Miner Tip Gwei y Max Fee Gwei para evitar que la transacción falle. Trust Wallet solo cobra comisiones de red.
Coinomi Wallet: Ofrece tres opciones de comisión dinámica: Low, Normal, High, según las condiciones de la red. Para ajustes manuales, selecciona Custom en las monedas compatibles o usa Change Fee en la esquina superior derecha. Los usuarios pueden establecer comisiones por byte o por kilobyte, lo que afecta los tiempos de confirmación. Se recomienda usar las opciones dinámicas si no estás seguro.

Esta versión incorpora orientación sobre la gestión de comisiones, opciones de comisiones dinámicas y configuraciones de personalización en Trust Wallet y Coinomi, proporcionando a los usuarios detalles completos para el control de comisiones.

#### Recursos

[ZIPS](https://zips.z.cash/)

#### Nota

Ten en cuenta que la forma más segura de usar ZEC es utilizando solo transacciones blindadas. Algunas billeteras están en proceso de implementar [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) que permiten a los usuarios y a los exchanges combinar direcciones transparentes y blindadas. 

## Convertidor de ZEC a ZAT
