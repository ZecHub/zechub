<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Memorandos

## TL;DR

* Un memorando es una nota breve que adjuntas a un pago enviado a una dirección protegida. Está cifrado, por lo que las personas que observan la blockchain no pueden leerlo.
* El campo de memorando contiene hasta 512 bytes de texto.
* Las personas usan memorandos para indicar quién envió un pago y para qué era, o para enviar un mensaje privado.
* Los pagos a direcciones transparentes no pueden llevar un memorando.
* Un [enlace de solicitud de pago](/using-zcash/payment-request-uris) puede completar el memorando por ti para que una tienda pueda etiquetar cada pedido.

## Explicación básica

### Envío de memorandos cifrados

Al enviar una transacción Z2Z (de protegida a protegida), puedes incluir un memorando (mensaje) en la transacción. Este memorando se puede usar para varias cosas diferentes.

### Firma de transacciones

Los memorandos se utilizan principalmente para firmar pagos. Dado que las transacciones protegidas cifran tus datos, no puedes ver quién te envió ZEC ni para qué podría haber sido ZEC. Los usuarios pueden usar el campo de memorando para firmar con su nombre o seudónimo y permitir que su contraparte sepa de quién provenía la transacción. También pueden describir para qué era la transacción.

### Envío de un mensaje

Otro caso de uso del memorando cifrado es enviar un mensaje a alguien con una z-addr. Estos mensajes pueden tratar sobre cualquier cosa, ya sea un [recordatorio para un amigo](https://twitter.com/iansagstette/status/1542142468505870336) o un [mensaje sensible que debe mantenerse lo más privado posible](https://twitter.com/InsideZcash/status/1545800146352578560).

### Notas de amor en la blockchain

Hubo una persona que envió a su pareja una nota de amor en uno de los primeros bloques de la blockchain Zcash. Alguien descubrió que su pareja le había enviado un archivo mediante un memorando Zcash. Este archivo era una entrada para un evento especial en el extranjero al que ella y su amante distante habían estado hablando de asistir juntos. El memorando era una nota de amor.

## Visual / Analogía

Piensa en un pago protegido como un sobre sellado con dinero dentro. El memorando es una nota doblada junto con el dinero.

La blockchain es la oficina de correos. Transporta el sobre y registra que llegó, pero nunca lo abre. La persona que abre el sobre lee la nota. Un pago transparente es una postal, por lo que no hay un sobre en el que doblar una nota.

## Análisis detallado

### Qué cabe en un memorando

El campo de memorando siempre tiene exactamente 512 bytes. Un memorando de texto más corto se rellena con bytes cero antes de cifrarse, de modo que cada memorando tiene el mismo tamaño en cadena.

La mayoría de los memorandos son texto UTF-8 simple. [ZIP 302](https://zips.z.cash/zip-0302) también reserva los memorandos que comienzan con un byte de `0xF5` o superior para otros tipos de datos, y un memorando de `0xF6` seguido de ceros significa «sin memorando».

Cada salida protegida de una transacción lleva su propio memorando, por lo que una transacción que paga a varias personas puede incluir una nota diferente para cada una de ellas.

### Avanzado

> **Histórico. Esta demostración ya no funciona como está escrita.**
>
> La demostración a continuación usa zcashd, y su [script de recepción](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) lee memorandos mediante `zcash-cli`. zcashd alcanzó su detención automática de fin de soporte el 18 de julio de 2026, por lo que ese script no puede conectarse a un nodo en funcionamiento y no ha sido migrado.
>
> Leer memorandos protegidos desde la línea de comandos todavía funciona en Zallet: `zallet rpc z_listunspent` devuelve cada nota protegida recibida con el mismo campo `memoStr` que lee el script. Consulta la [Zallet Guía de referencia rápida](/using-zcash/zallet-quick-reference-guide) para ver el comando, y la [guía de migración a Zebra y Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) para mover un nodo fuera de zcashd. Zallet sigue en beta.
>
> Esta sección se conserva como registro histórico de la demostración Magic-Wormhole.

¡Así es como se usan los memorandos protegidos Zcash con la CLI Magic-Wormhole y zcashd para enviar archivos de forma segura de un ordenador a otro!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Transferencia de archivos cifrada con Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Páginas relacionadas

- [URI de solicitud de pago](/using-zcash/payment-request-uris): incluye un memorando en un enlace `zcash:` o código QR.
- [Transacciones](/using-zcash/transactions): tipos de transacciones protegidas y transparentes.
- [Pools protegidos](/using-zcash/shielded-pools): donde se encuentran las notas protegidas que contienen memorandos.
- [Wallets](/using-zcash/wallets): usa el filtro de memorandos protegidos para encontrar wallets compatibles con memorandos.
- [Zallet Guía de referencia rápida](/using-zcash/zallet-quick-reference-guide): lee memorandos recibidos desde la línea de comandos.
- [Herramientas de Zcash para creadores](/using-zcash/creators-and-tips): herramientas de propinas que envían un mensaje junto con la propina.

### Recursos

[El campo de memorando cifrado](https://electriccoin.co/blog/encrypted-memo-field/)

**Última actualización:** octubre de 2026
