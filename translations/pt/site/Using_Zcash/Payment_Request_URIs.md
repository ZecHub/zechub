<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# URIs de solicitação de pagamento do Zcash

## TL;DR

* Uma URI de solicitação de pagamento é um link que começa com `zcash:` e traz os detalhes de um pagamento: o endereço, o valor e um memorando opcional.
* Compartilhada como QR code ou como link clicável, ela permite que sua carteira preencha o pagamento para você. Você confere os detalhes e aprova.
* O [ZIP 321](https://zips.z.cash/zip-0321) define o formato. Ele surgiu a partir do BIP 21 do Bitcoin.
* Uma única solicitação pode pagar vários destinatários em uma só transação.
* O ZecHub hospeda um widget de pagamento e um gerador, para que uma loja possa adicionar um botão de pagamento em Zcash sem precisar escrever a URI à mão.

## Explicação principal

Uma URI de solicitação de pagamento é um link `zcash:` definido pelo [ZIP 321](https://zips.z.cash/zip-0321). Carteiras compatíveis leem o endereço, o valor e o memorando opcional a partir do link ou do QR e preenchem uma transação automaticamente. Sem contas extras e sem nenhum processador no meio do caminho.

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
    Criar uma solicitação de pagamento
  </a>
</div>

A demonstração do widget é um modal ZIP-321 funcional: QR, copiar endereço/URI, link curto e "Abrir na carteira". A página de ferramentas é o gerador, caso você queira definir primeiro seu próprio endereço e valor.

### Anatomia

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Campo | Obrigatório | Observações |
| --- | --- | --- |
| address | sim | Prefira um endereço unificado (`u1` / `utest1`) |
| amount | não | ZEC decimal com `.` como separador e no máximo 8 casas decimais (`0.5`, não `0,5`) |
| memo | não | Somente para endereços blindados. Os bytes UTF-8 do memorando (no máximo 512), codificados em base64url sem o preenchimento `=`: `Thanks!` se torna `VGhhbmtzIQ`, e não o texto simples |
| label | não | Nome legível exibido por algumas carteiras. Use percent-encoding para espaços e caracteres reservados (`Coffee%20shop`); um `+` é um sinal de mais literal, não um espaço |

Regras completas: [ZIP 321](https://zips.z.cash/zip-0321).

### Casos de uso

- Checkout: preencha o preço e um memorando do pedido para que o cliente só precise confirmar na carteira
- Faturas: compartilhe um único link ou QR
- Doações: incorpore o widget em um site
- P2P: envie um link `zcash:` no chat

### Incorporar em um site

Aponte este script para o seu próprio endereço blindado. Uma cópia hospedada está disponível em ZecHub:

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

Obrigatórios: `data-address`, `data-amount`, `data-target`.

Experimente primeiro o botão hospedado: [Abrir widget de pagamento](/zcash-payment-uri).

### Vídeos

Como criar solicitações de pagamento com Zcash:

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

Como adicionar um widget de doação em Zcash ao seu site:

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

## Visual / analogia

Pense em um formulário de transferência bancária com campos para o número da conta, o valor e uma observação dizendo a que se refere o pagamento. Preenchê-lo à mão é lento, e um único dígito errado manda o dinheiro para o lugar errado.

Uma URI de solicitação de pagamento é esse formulário, já preenchido pela loja. O QR code é uma foto do formulário. A câmera do seu celular lê a foto, a carteira copia cada campo para o lugar certo, e você confere os números e assina.

Um link em uma página da web faz o mesmo trabalho. Clicar nele entrega o formulário preenchido à sua carteira.

## Aprofundamento

### Um exemplo real

Aqui está um exemplo do ZIP 321, escrito para a testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Ele solicita 1 ZEC para um endereço Sapling blindado. O memorando decodificado é "This is a simple memo." A mensagem "Thank you for your purchase" é o texto que a carteira mostra na tela.

### Regras que uma carteira verifica

O formato do valor é rigoroso. `amount=0.5` e `amount=50` são válidos. `amount=50,000.00`, `amount=.5` e `amount=0.123456789` são inválidos: o ponto é o único separador decimal, e pode haver no máximo 8 dígitos depois dele. Nenhum valor pode ultrapassar 21.000.000 ZEC.

Na URI bruta, o memorando é codificado em base64url e pode conter até 512 bytes depois de decodificado. Um memorando anexado a um endereço transparente torna toda a solicitação inválida, porque endereços transparentes não podem carregar memorandos. Endereços Sprout não são permitidos de forma alguma, e uma solicitação que não siga a gramática do ZIP 321 deve ser rejeitada.

Existem mais dois campos além dos da tabela acima. `message` é uma descrição do pagamento para a carteira exibir. `req-asset` é reservado para ativos personalizados, conforme definido no ZIP 227.

### Pagando várias pessoas de uma vez

Cada pagamento extra recebe um número de índice adicionado aos nomes de seus parâmetros, por exemplo `address.1`, `amount.1` e `memo.1`. A carteira monta uma única transação que paga todos da lista. Isso é útil para um checkout que divide um pagamento ou para um grupo de doações enviadas juntas.

### De onde veio o formato

O Bitcoin tem dois padrões mais antigos para solicitações de pagamento: o BIP 21, um link simples para um único destinatário, e o BIP 70, um protocolo mais pesado para pagamentos complexos. O ZIP 321 segue um caminho intermediário: um formato de link com espaço para vários destinatários. A discussão começou em 2018 no repositório de ZIPs do Zcash, onde o número 321 foi escolhido para fazer referência ao BIP 21, e o próprio ZIP foi criado em agosto de 2020.

## Páginas relacionadas

- [Memorandos](/using-zcash/memos): para que serve o campo de memorando em uma solicitação de pagamento.
- [Processadores de pagamento](/using-zcash/payment-processors): serviços que processam pagamentos para lojas.
- [Carteiras](/using-zcash/wallets): use o filtro "Payment Request" para encontrar carteiras que leem esses links.
- [Ativos blindados do Zcash](/zcash-tech/zcash-shielded-assets): os ativos personalizados aos quais o `req-asset` se refere.
- [O que são endereços TEX do Zcash?](/using-zcash/transparent-exchange-addresses): outra regra de endereço que sua carteira verifica antes de pagar.

**Última atualização:** outubro de 2026
