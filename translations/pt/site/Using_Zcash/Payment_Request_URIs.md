<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Zcash URIs de Pedido de Pagamento

Um URI de pedido de pagamento é uma ligação `zcash:` definida pela [ZIP 321](https://zips.z.cash/zip-0321). As wallets compatíveis leem o endereço, o montante e a nota opcional a partir da ligação ou do QR e preenchem previamente uma transação. Sem contas adicionais, sem processador intermediário.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Abrir widget de pagamento
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Criar um pedido de pagamento
  </a>
</div>

A demonstração do widget é um modal ZIP-321 em direto: QR, copiar endereço/URI, ligação curta e Abrir na Wallet. A página de ferramentas é o gerador, caso pretenda definir primeiro o seu próprio endereço e montante.

## Anatomia

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Campo | Obrigatório | Notas |
| --- | --- | --- |
| address | sim | Prefira um Unified Address (`u1` / `utest1`) |
| amount | não | ZEC decimal |
| memo | não | Apenas transferências blindadas |
| label | não | Nome legível por humanos apresentado por algumas wallets |

Regras completas: [ZIP 321](https://zips.z.cash/zip-0321).

## Casos de utilização

- **Checkout** — preencha previamente o preço e uma nota da encomenda para que o cliente apenas confirme na sua wallet
- **Faturas** — partilhe uma ligação ou QR
- **Donativos** — incorpore o widget num site
- **P2P** — envie uma ligação `zcash:` no chat

## Incorporar num site

Aponte este script para o seu próprio endereço blindado. A cópia alojada encontra-se em ZecHub:

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

Obrigatório: `data-address`, `data-amount`, `data-target`.

Experimente primeiro o botão alojado: [Abrir widget de pagamento](/zcash-payment-uri).

## Vídeos

Como criar Pedidos de Pagamento com Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Como criar Pedidos de Pagamento com Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Adicionar um Widget de Donativos Zcash ao seu Website:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adicionar um Widget de Donativos Zcash ao seu Website"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
