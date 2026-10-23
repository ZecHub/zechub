<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash URI de solicitudes de pago

## En resumen

* Una URI de solicitud de pago es un enlace que comienza con `zcash:` y contiene los detalles de un pago: la dirección, el importe y un memo opcional.
* Compartido como código QR o enlace clicable, permite que tu wallet complete el pago por ti. Tú verificas los detalles y lo apruebas.
* [ZIP 321](https://zips.z.cash/zip-0321) define el formato. Surgió a partir de BIP 21 de Bitcoin.
* Una solicitud puede pagar a varios destinatarios en una sola transacción.
* ZecHub aloja un widget de pagos y un generador, por lo que una tienda puede añadir un botón de pago de Zcash sin escribir la URI a mano.

## Explicación básica

Una URI de solicitud de pago es un enlace `zcash:` definido por [ZIP 321](https://zips.z.cash/zip-0321). Los wallets compatibles leen la dirección, el importe y el memo opcional desde el enlace o QR, y rellenan previamente una transacción. No se requieren cuentas adicionales ni un procesador intermediario.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Abrir widget de pagos
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Crear una solicitud de pago
  </a>
</div>

La demostración del widget es una ventana modal ZIP-321 en vivo: QR, copiar dirección/URI, enlace corto y Abrir en Wallet. La página de herramientas es el generador si primero quieres establecer tu propia dirección e importe.

### Anatomía

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Campo | Obligatorio | Notas |
| --- | --- | --- |
| address | sí | Se prefiere una Unified Address (`u1` / `utest1`) |
| amount | no | ZEC decimal con `.` como separador y un máximo de 8 decimales (`0.5`, no `0,5`) |
| memo | no | Solo direcciones blindadas. Los bytes UTF-8 del memo (como máximo 512), codificados en base64url sin relleno `=`: `Thanks!` se convierte en `VGhhbmtzIQ`, no en texto sin formato |
| label | no | Nombre legible para humanos mostrado por algunos wallets. Codifica porcentualmente los espacios y caracteres reservados (`Coffee%20shop`); un `+` es un signo más literal, no un espacio |

Reglas completas: [ZIP 321](https://zips.z.cash/zip-0321).

### Casos de uso

- Pago: completa previamente el precio y un memo de pedido para que el cliente solo confirme en su wallet
- Facturas: comparte un enlace o QR
- Donaciones: inserta el widget en un sitio web
- P2P: envía un enlace `zcash:` en un chat

### Insertar en un sitio web

Apunta este script a tu propia dirección blindada. La copia alojada se encuentra en ZecHub:

```html
<div id="zcash-pay"></div>
<script
  src="https://zechub.wiki/zcash-payment-request-widget.embed.v2.js"
  data-target="#zcash-pay"
  data-address="u1..."
  data-amount="0.01"
  data-label="Pay with Zcash"
  data-memo="order-42"
  data-theme="dark"
  data-api-base="https://zechub.wiki/api"
></script>
```

Obligatorio: `data-address`, `data-amount`, `data-target`.

Prueba primero el botón alojado: [Abrir widget de pagos](/zcash-payment-uri).

### Vídeos

Cómo crear solicitudes de pago con Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="How to make Payment Requests with Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Cómo añadir un widget de donaciones de Zcash a tu sitio web:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adding a Zcash Donation Widget to your Website"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Visual / Analogía

Piensa en un formulario de transferencia bancaria con campos para el número de cuenta, el importe y una nota que indica para qué es el pago. Rellenarlo a mano es lento, y un solo dígito incorrecto envía el dinero al lugar equivocado.

Una URI de solicitud de pago es ese formulario, completado por la tienda. El código QR es una foto del formulario. La cámara de tu teléfono lee la foto, el wallet copia cada campo en su lugar, y tú verificas los números y firmas.

Un enlace en una página web cumple la misma función. Al hacer clic, entrega el formulario completado a tu wallet.

## Análisis detallado

### Un ejemplo real

Aquí tienes un ejemplo de ZIP 321, escrito para testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Solicita 1 ZEC a una dirección Sapling blindada. El memo se decodifica como "This is a simple memo." El mensaje "Thank you for your purchase" es el texto que el wallet muestra en pantalla.

### Reglas que verifica un wallet

El formato del importe es estricto. `amount=0.5` y `amount=50` son válidos. `amount=50,000.00`, `amount=.5` y `amount=0.123456789` no son válidos: el punto es el único separador decimal y puede haber como máximo 8 dígitos después de él. Ningún importe puede superar 21.000.000 ZEC.

En la URI sin procesar, el memo está codificado en base64url y puede contener hasta 512 bytes una vez decodificado. Un memo adjunto a una dirección transparente hace que toda la solicitud sea inválida, porque las direcciones transparentes no pueden contener memos. Las direcciones Sprout no están permitidas en absoluto, y se debe rechazar una solicitud que no siga la gramática de ZIP 321.

Existen dos campos más además de los de la tabla anterior. `message` es una descripción del pago que el wallet debe mostrar. `req-asset` está reservado para Custom Assets, según se define en ZIP 227.

### Pagar a varias personas a la vez

Cada pago adicional recibe un número de índice añadido a los nombres de sus parámetros, por ejemplo `address.1`, `amount.1` y `memo.1`. El wallet crea una sola transacción que paga a todas las personas de la lista. Esto es útil para un pago que divide un importe o para un grupo de donaciones enviadas juntas.

### De dónde provino el formato

Bitcoin tiene dos estándares más antiguos para solicitudes de pago: BIP 21, un enlace simple para un destinatario, y BIP 70, un protocolo más complejo para pagos complejos. ZIP 321 adopta un camino intermedio: un formato de enlace con espacio para varios destinatarios. La discusión comenzó en 2018 en el repositorio de ZIPs Zcash, donde se eligió el número 321 como eco de BIP 21, y el propio ZIP se creó en agosto de 2020.

## Páginas relacionadas

- [Memos](/using-zcash/memos): para qué sirve el campo memo en una solicitud de pago.
- [Procesadores de pagos](/using-zcash/payment-processors): servicios que gestionan pagos para tiendas.
- [Wallets](/using-zcash/wallets): usa el filtro Payment Request para encontrar wallets que leen estos enlaces.
- [Zcash Activos blindados](/zcash-tech/zcash-shielded-assets): los Custom Assets a los que se refiere `req-asset`.
- [¿Qué son las direcciones TEX de Zcash?](/using-zcash/transparent-exchange-addresses): otra regla de direcciones que tu wallet lee antes de pagar.

**Última actualización:** octubre de 2026
