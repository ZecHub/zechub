<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Zcash URI de solicitudes de pago

Una URI de solicitud de pago es un enlace `zcash:` definido por [ZIP 321](https://zips.z.cash/zip-0321). Las wallets compatibles leen la dirección, el importe y la nota opcional del enlace o QR y rellenan previamente una transacción. Sin cuentas adicionales ni procesador intermediario.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Abrir widget de pago
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Crear una solicitud de pago
  </a>
</div>

La demostración del widget es un modal ZIP-321 en vivo: QR, copiar dirección/URI, enlace corto y Abrir en Wallet. La página de herramientas es el generador si primero quieres establecer tu propia dirección e importe.

## Anatomía

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Campo | Obligatorio | Notas |
| --- | --- | --- |
| address | sí | Se prefiere una Unified Address (`u1` / `utest1`) |
| amount | no | ZEC decimal |
| memo | no | Solo transferencias blindadas |
| label | no | Nombre legible para humanos mostrado por algunas wallets |

Reglas completas: [ZIP 321](https://zips.z.cash/zip-0321).

## Casos de uso

- **Pago** — rellena previamente el precio y una nota de pedido para que el cliente solo confirme en su wallet
- **Facturas** — comparte un enlace o QR
- **Donaciones** — inserta el widget en un sitio
- **P2P** — envía un enlace `zcash:` en el chat

## Insertar en un sitio

Dirige este script a tu propia dirección blindada. La copia alojada está en ZecHub:

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

Prueba primero el botón alojado: [Abrir widget de pago](/zcash-payment-uri).

## Videos

Cómo crear solicitudes de pago con Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Cómo crear solicitudes de pago con Zcash"
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
    title="Cómo añadir un widget de donaciones de Zcash a tu sitio web"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
