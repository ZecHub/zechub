<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Zcash URIs de pedidos de pagamento

## Em resumo

* Um URI de pedido de pagamento é uma ligação que começa por `zcash:` e contém os detalhes de um pagamento: o endereço, o montante e uma nota opcional.
* Partilhado como código QR ou ligação clicável, permite que a sua wallet preencha o pagamento por si. Confirma os detalhes e aprova.
* [ZIP 321](https://zips.z.cash/zip-0321) define o formato. Teve origem no BIP 21 do Bitcoin.
* Um pedido pode pagar a vários destinatários numa única transação.
* ZecHub disponibiliza um widget de pagamento e um gerador, pelo que uma loja pode adicionar um botão de pagamento Zcash sem escrever o URI manualmente.

## Explicação fundamental

Um URI de pedido de pagamento é uma ligação `zcash:` definida pela [ZIP 321](https://zips.z.cash/zip-0321). As wallets compatíveis leem o endereço, o montante e a nota opcional a partir da ligação ou do QR e preenchem previamente uma transação. Sem contas adicionais, sem intermediários de processamento.

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

A demonstração do widget é um modal ZIP-321 em direto: QR, copiar endereço/URI, ligação curta e Abrir na Wallet. A página de ferramentas é o gerador, se quiser definir primeiro o seu próprio endereço e montante.

### Anatomia

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Campo | Obrigatório | Notas |
| --- | --- | --- |
| address | sim | Prefira um Unified Address (`u1` / `utest1`) |
| amount | não | ZEC decimal com `.` como separador e, no máximo, 8 casas decimais (`0.5`, não `0,5`) |
| memo | não | Apenas endereços shielded. Os bytes UTF-8 da nota (no máximo 512), codificados em base64url sem preenchimento `=`: `Thanks!` torna-se `VGhhbmtzIQ`, e não o texto simples |
| label | não | Nome legível por humanos apresentado por algumas wallets. Codifique percentualmente espaços e caracteres reservados (`Coffee%20shop`); um `+` é um sinal de mais literal, não um espaço |

Regras completas: [ZIP 321](https://zips.z.cash/zip-0321).

### Casos de utilização

- Checkout: preencha previamente o preço e uma nota de encomenda para que o cliente apenas confirme na wallet
- Faturas: partilhe uma ligação ou QR
- Donativos: incorpore o widget num site
- P2P: envie uma ligação `zcash:` numa conversa

### Incorporar num site

Aponte este script para o seu próprio endereço shielded. A cópia alojada está em ZecHub:

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

### Vídeos

Como criar pedidos de pagamento com Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Como criar pedidos de pagamento com Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Adicionar um widget de donativos Zcash ao seu website:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adicionar um widget de donativos Zcash ao seu website"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Visual / Analogia

Pense num formulário de transferência bancária com campos para o número de conta, o montante e uma nota que indica a finalidade do pagamento. Preenchê-lo manualmente é lento, e um dígito errado envia o dinheiro para o lugar errado.

Um URI de pedido de pagamento é esse formulário, preenchido pela loja. O código QR é uma fotografia do formulário. A câmara do seu telemóvel lê a fotografia, a wallet copia todos os campos para o lugar certo, e confirma os números e assina.

Uma ligação numa página web faz o mesmo. Clicar nela entrega o formulário preenchido à sua wallet.

## Análise aprofundada

### Um exemplo real

Eis um exemplo da ZIP 321, escrito para a testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Solicita 1 ZEC para um endereço Sapling shielded. A nota descodifica para "This is a simple memo." A mensagem "Thank you for your purchase" é o texto que a wallet apresenta no ecrã.

### Regras que uma wallet verifica

O formato do montante é rigoroso. `amount=0.5` e `amount=50` são válidos. `amount=50,000.00`, `amount=.5` e `amount=0.123456789` são inválidos: o ponto é o único separador decimal, e pode haver no máximo 8 algarismos depois dele. Nenhum montante pode exceder 21 000 000 ZEC.

No URI em bruto, a nota é codificada em base64url e pode conter até 512 bytes depois de descodificada. Uma nota associada a um endereço transparente torna todo o pedido inválido, porque os endereços transparentes não podem conter notas. Os endereços Sprout não são permitidos de todo, e um pedido que não siga a gramática da ZIP 321 tem de ser rejeitado.

Existem mais dois campos além dos da tabela acima. `message` é uma descrição do pagamento a apresentar pela wallet. `req-asset` está reservado para Custom Assets, conforme definido na ZIP 227.

### Pagar a várias pessoas de uma vez

Cada pagamento adicional recebe um número de índice acrescentado aos nomes dos seus parâmetros, por exemplo `address.1`, `amount.1` e `memo.1`. A wallet cria uma única transação que paga a todas as pessoas da lista. Isto é útil para um checkout que divide um pagamento ou para um grupo de donativos enviados em conjunto.

### De onde veio o formato

O Bitcoin tem duas normas mais antigas para pedidos de pagamento: BIP 21, uma ligação simples para um destinatário, e BIP 70, um protocolo mais pesado para pagamentos complexos. A ZIP 321 segue um caminho intermédio, um formato de ligação com espaço para vários destinatários. A discussão começou em 2018 no repositório de ZIPs Zcash, onde o número 321 foi escolhido por fazer eco ao BIP 21, e a própria ZIP foi criada em agosto de 2020.

## Páginas relacionadas

- [Notas](/using-zcash/memos): para que serve o campo de nota num pedido de pagamento.
- [Processadores de pagamento](/using-zcash/payment-processors): serviços que processam pagamentos para lojas.
- [Wallets](/using-zcash/wallets): utilize o filtro Pedido de pagamento para encontrar wallets que leem estas ligações.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets): os Custom Assets aos quais `req-asset` se refere.
- [O que são endereços TEX Zcash?](/using-zcash/transparent-exchange-addresses): outra regra de endereço que a sua wallet lê antes de pagar.

**Última atualização:** outubro de 2026
