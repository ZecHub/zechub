<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Memos

## En resumen

* Un memo es una nota [note] corta que adjuntas a un pago [payment] enviado a una dirección [address] blindada [shielded]. Está cifrado [encrypted], por lo que las personas que observan la blockchain no pueden leerlo.
* El campo de memo admite hasta 512 bytes de texto.
* Las personas usan memos para indicar quién envió un pago y para qué era, o para enviar un mensaje privado.
* Los pagos a direcciones transparentes no pueden incluir un memo.
* Un enlace de [solicitud de pago](/using-zcash/payment-request-uris) puede completar el memo por ti para que una tienda pueda etiquetar cada pedido.

## Explicación principal

### Envío de memos cifrados

Al enviar una transacción Z2Z (de blindada a blindada), puedes incluir un memo (mensaje) en la transacción. Este memo puede usarse para varias cosas diferentes.

### Firma de transacciones

Los memos se usan principalmente para firmar pagos. Dado que las transacciones blindadas cifran tus datos, no puedes ver quién te envió ZEC ni para qué podría haber sido ZEC. Los usuarios pueden usar el campo de memo para firmar con su nombre o seudónimo y permitir que su contraparte sepa de quién procedía la transacción. También pueden describir para qué era la transacción.

### Envío de un mensaje

Otro caso de uso del memo cifrado es enviar un mensaje a alguien con una z-addr. Estos mensajes pueden tratar sobre cualquier cosa, ya sea un [recordatorio para un amigo](https://twitter.com/iansagstette/status/1542142468505870336) o un [mensaje sensible que debe permanecer lo más privado posible](https://twitter.com/InsideZcash/status/1545800146352578560).

### Notas de amor en la blockchain

Hubo una persona que envió a su pareja una nota de amor en uno de los primeros bloques de la blockchain Zcash. Alguien descubrió que su pareja le había enviado un archivo mediante un memo Zcash. Este archivo era una entrada para un evento especial en el extranjero al que ella y su amante distante habían hablado de asistir juntos. El memo era una nota de amor.

## Visual / Analogía

Piensa en un pago blindado como un sobre sellado con dinero dentro. El memo es una nota doblada junto con el dinero.

La blockchain es la oficina de correos. Transporta el sobre y registra que llegó, pero nunca lo abre. La persona que abre el sobre lee la nota. Un pago transparente es una postal, por lo que no hay ningún sobre en el que doblar una nota.

## Análisis detallado

### Qué cabe en un memo

El campo de memo siempre tiene exactamente 512 bytes. Un memo de texto más corto se rellena con bytes cero antes de cifrarse, de modo que cada memo parece tener el mismo tamaño on-chain.

La mayoría de los memos son texto UTF-8 sin formato. [ZIP 302](https://zips.z.cash/zip-0302) también reserva los memos que comienzan con un byte de `0xF5` o superior para otros tipos de datos, y un memo de `0xF6` seguido de ceros significa «sin memo».

Cada salida blindada de una transacción lleva su propio memo, por lo que una transacción que paga a varias personas puede incluir una nota diferente para cada una de ellas.

### Avanzado

> **Histórico. Esta demostración ya no funciona como se indica.**
>
> La demostración de abajo usa zcashd, y su [script de recepción](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) lee memos mediante `zcash-cli`. zcashd alcanzó su detención automática de fin de soporte el 18 de julio de 2026, por lo que ese script no puede acceder a un nodo en funcionamiento y no se ha migrado.
>
> Leer memos blindados desde la línea de comandos sigue funcionando en Zallet: `zallet rpc z_listunspent` devuelve cada nota blindada recibida con el mismo campo `memoStr` que lee el script. Consulta la [Zallet Guía de referencia rápida](/using-zcash/zallet-quick-reference-guide) para ver el comando, y la [guía de migración a Zebra y Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) para mover un nodo fuera de zcashd. Zallet sigue en fase beta.
>
> Esta sección se conserva como registro histórico de la demostración Magic-Wormhole.

¡Aquí tienes cómo usar memos blindados de Zcash con la CLI de Magic-Wormhole y zcashd para enviar archivos de forma segura de un ordenador a otro!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMOSTRACIÓN: Transferencia de archivos cifrada con Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Páginas relacionadas

- [URI de solicitud de pago](/using-zcash/payment-request-uris): incluye un memo en un enlace `zcash:` o código QR.
- [Transacciones](/using-zcash/transactions): tipos de transacciones blindadas y transparentes.
- [Pools blindados](/using-zcash/shielded-pools): donde se encuentran las notas blindadas que contienen memos.
- [Billeteras](/using-zcash/wallets): usa el filtro Shielded Memo para encontrar billeteras compatibles con memos.
- [Zallet Guía de referencia rápida](/using-zcash/zallet-quick-reference-guide): lee memos recibidos desde la línea de comandos.
- [Zcash Herramientas para creadores](/using-zcash/creators-and-tips): herramientas de propinas que envían un mensaje junto con la propina.

### Recursos

[El campo de memo cifrado](https://electriccoin.co/blog/encrypted-memo-field/)

**Última actualización:** octubre de 2026
