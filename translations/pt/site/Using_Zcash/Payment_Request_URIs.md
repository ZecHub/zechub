<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# URIs de solicitação de pagamento do Zcash

## Em resumo

* Um URI de solicitação de pagamento é um link que começa com `zcash:` e contém os detalhes de um pagamento: o endereço, o valor e um memorando opcional.
* Compartilhado como código QR ou link clicável, ele permite que sua carteira preencha o pagamento para você. Você verifica os detalhes e aprova.
* A [ZIP 321](https://zips.z.cash/zip-0321) define o formato. Ela teve origem no BIP 21 do Bitcoin.
* Uma solicitação pode pagar vários destinatários em uma única transação.
* O ZecHub disponibiliza um widget de pagamento e um gerador, para que uma loja possa adicionar um botão de pagamento com Zcash sem escrever o URI manualmente.

## Explicação principal

Um URI de solicitação de pagamento é um link `zcash:` definido pela [ZIP 321](https://zips.z.cash/zip-0321). As carteiras compatíveis leem o endereço, o valor e o memorando opcional do link ou código QR e preenchem uma transação. Sem contas adicionais, sem intermediários de processamento.

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

A demonstração do widget é um modal ZIP-321 ao vivo: QR, copiar endereço/URI, link curto e Abrir na carteira. A página de ferramentas é o gerador se você quiser definir primeiro seu próprio endereço e valor.

### Anatomia

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Campo | Obrigatório | Observações |
| --- | --- | --- |
| address | sim | Prefira um Unified Address (`u1` / `utest1`) |
| amount | não | ZEC decimal com `.` como separador e, no máximo, 8 casas decimais (`0.5`, não `0,5`) |
| memo | não | Apenas endereços blindados. Os bytes UTF-8 do memorando (no máximo 512), codificados em base64url sem preenchimento `=`: `Thanks!` torna-se `VGhhbmtzIQ`, e não o texto simples |
| label | não | Nome legível para humanos exibido por algumas carteiras. Codifique espaços e caracteres reservados em porcentagem (`Coffee%20shop`); um `+` é um sinal de mais literal, não um espaço |

Regras completas: [ZIP 321](https://zips.z.cash/zip-0321).

### Casos de uso

- Checkout: preencha o preço e um memorando do pedido para que o cliente apenas confirme na carteira
- Faturas: compartilhe um link ou QR
- Doações: incorpore o widget em um site
- P2P: envie um link `zcash:` no chat

### Incorporar em um site

Aponte este script para seu próprio endereço blindado. A cópia hospedada está no ZecHub:

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

Experimente primeiro o botão hospedado: [Abrir widget de pagamento](/zcash-payment-uri).

### Vídeos

Como criar solicitações de pagamento com Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Como criar solicitações de pagamento com Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Adicionar um widget de doações com Zcash ao seu site:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adicionar um widget de doações com Zcash ao seu site"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Visual / Analogia

Pense em um formulário de transferência bancária com campos para o número da conta, o valor e uma observação indicando a finalidade do pagamento. Preenchê-lo manualmente é lento, e um dígito errado envia o dinheiro para o lugar errado.

Um URI de solicitação de pagamento é esse formulário, preenchido pela loja. O código QR é uma foto do formulário. A câmera do seu celular lê a foto, a carteira copia todos os campos para o lugar certo, e você verifica os números e assina.

Um link em uma página web faz o mesmo. Clicar nele entrega o formulário preenchido à sua carteira.

## Análise aprofundada

### Um exemplo real

Aqui está um exemplo da ZIP 321, escrito para a testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Ele solicita 1 ZEC para um endereço Sapling blindado. O memorando é decodificado como "This is a simple memo." A mensagem "Thank you for your purchase" é o texto que a carteira mostra na tela.

### Regras que uma carteira verifica

O formato do valor é rigoroso. `amount=0.5` e `amount=50` são válidos. `amount=50,000.00`, `amount=.5` e `amount=0.123456789` são inválidos: o ponto é o único separador decimal, e pode haver no máximo 8 dígitos depois dele. Nenhum valor pode exceder 21.000.000 ZEC.

No URI bruto, o memorando é codificado em base64url e pode conter até 512 bytes depois de decodificado. Um memorando associado a um endereço transparente torna toda a solicitação inválida, porque endereços transparentes não podem conter memorandos. Endereços Sprout não são permitidos de forma alguma, e uma solicitação que não segue a gramática da ZIP 321 deve ser rejeitada.

Existem mais dois campos além dos da tabela acima. `message` é uma descrição do pagamento para a carteira exibir. `req-asset` é reservado para Custom Assets, conforme definido na ZIP 227.

### Pagar várias pessoas de uma vez

Cada pagamento adicional recebe um número de índice adicionado aos nomes de seus parâmetros, por exemplo `address.1`, `amount.1` e `memo.1`. A carteira cria uma única transação que paga todas as pessoas da lista. Isso é útil para um checkout que divide um pagamento ou para um grupo de doações enviadas juntas.

### De onde veio o formato

O Bitcoin tem dois padrões mais antigos para solicitações de pagamento: BIP 21, um link simples para um destinatário, e BIP 70, um protocolo mais pesado para pagamentos complexos. A ZIP 321 segue um caminho intermediário, um formato de link com espaço para vários destinatários. A discussão começou em 2018 no repositório de ZIPs do Zcash, onde o número 321 foi escolhido para remeter ao BIP 21, e a própria ZIP foi criada em agosto de 2020.

## Páginas relacionadas

- [Memorandos](/using-zcash/memos): para que serve o campo de memorando em uma solicitação de pagamento.
- [Processadores de pagamento](/using-zcash/payment-processors): serviços que processam pagamentos para lojas.
- [Carteiras](/using-zcash/wallets): use o filtro Solicitação de pagamento para encontrar carteiras que leem estes links.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets): os Custom Assets aos quais `req-asset` se refere.
- [O que são endereços TEX do Zcash?](/using-zcash/transparent-exchange-addresses): outra regra de endereço que sua carteira lê antes de pagar.

**Última atualização:** outubro de 2026
