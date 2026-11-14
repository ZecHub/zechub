<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Processador de pagamentos ZGo: aceitando Zcash sem custódia

O ZGo é um processador de pagamentos não custodiante para Zcash. O cliente paga em ZEC a partir da própria carteira, o ZGo monitora a blockchain do Zcash em busca da transação e os fundos chegam diretamente à carteira do comerciante por meio de uma transferência blindada. O ZGo nunca retém o dinheiro no meio do caminho.

Este guia explica como funciona o fluxo de pagamento, como criar uma conta e como integrar o ZGo ao Xero e ao WooCommerce. Ele também aborda os dois erros que causam a maioria dos problemas na primeira configuração.

## Nesta página

1. [Por que usar o ZGo](#why-use-zgo)
2. [Como o ZGo funciona](#how-zgo-works)
3. [Criando uma conta](#setting-up-an-account)
4. [ZGo com o Xero](#zgo-with-xero)
5. [ZGo com o WooCommerce](#zgo-with-woocommerce)
6. [Recursos](#features)
7. [Erros comuns](#common-mistakes)
8. [Conclusão](#conclusion)
9. [Links úteis](#resources)

## Por que usar o ZGo

A maioria dos processadores de pagamentos em criptomoedas é custodiante. Os fundos primeiro caem na conta do processador e só depois são repassados ao comerciante. Isso significa que um terceiro controla temporariamente o dinheiro e pode congelá-lo, atrasá-lo ou reportá-lo.

O ZGo adota a abordagem oposta. Os pagamentos vão da carteira do cliente diretamente para a carteira do comerciante por meio de uma transação blindada do Zcash. O processador apenas gera a fatura e observa a blockchain até a confirmação. Não há saldo intermediário, nem fluxo de saque, nem terceiros que possam travar a liquidação.

Para o comerciante, isso significa três coisas práticas: custódia total do ZEC recebido, privacidade de transação blindada por padrão e nenhuma dependência de um provedor centralizado continuar online ou solvente.

## Como o ZGo funciona

O fluxo de pagamento é o mesmo, seja o ZGo usado de forma independente, pelo Xero ou pelo WooCommerce:

1. O comerciante gera uma solicitação de pagamento no ZGo, que aparece como um QR code com o valor, o ID da fatura e um endereço de recebimento Zcash.
2. O cliente escaneia o QR code com uma carteira Zcash (os tipos de endereço Orchard, Sapling e transparente são todos aceitos no plugin para WordPress) e aprova o pagamento.
3. A transação é transmitida à rede Zcash como uma transferência blindada da carteira do cliente para a carteira do comerciante.
4. O ZGo monitora a blockchain do Zcash em busca da transação.
5. Após cinco confirmações, o ZGo marca o pagamento como final e notifica qualquer integração conectada (Xero, WooCommerce ou um webhook).

O limite de cinco confirmações é o número-chave. Qualquer coisa antes disso é um pagamento em andamento, não um pagamento recebido. O atendimento do pedido, as atualizações de estoque e qualquer ação irreversível do lado do comerciante devem aguardar a etapa 5.

O ZGo roda em qualquer navegador moderno, no computador ou no celular, sem instalação de nenhum dos lados. O cliente precisa de uma carteira Zcash; o comerciante precisa de uma carteira Zcash e de uma conta no ZGo.

<img width="672" height="378" alt="ZGo payment request and blockchain monitoring overview" src="/content-images/de50885b-b068-4157-bbda-0981ca23efc8-a00a274776.webp" />

## Criando uma conta

Para criar uma conta no ZGo, é necessária uma carteira Zcash com uma pequena quantia de ZEC. Esse pequeno saldo em ZEC cobre a taxa on-chain da transação de inicialização da conta. Qualquer carteira Zcash conhecida serve para isso; consulte [Carteiras ZecHub](https://zechub.wiki/wallets) para ver as opções atuais.

A configuração básica:

1. Abra [zgo.cash](https://zgo.cash/) em um navegador.
2. Crie uma conta usando uma carteira Zcash sob controle do comerciante. Essa carteira precisa deter as chaves. Um endereço de depósito de corretora não funciona (veja [Erros comuns](#common-mistakes)).
3. Verifique a carteira enviando a pequena transação de inicialização.
4. Configure o endereço de recebimento. Todos os pagamentos processados por essa conta cairão nessa carteira.

Depois que a conta estiver ativa, o mesmo comerciante pode usar o ZGo para pagamentos avulsos (um único QR code em um evento temporário) ou integrá-lo a uma configuração permanente pelo Xero ou pelo WooCommerce.

## ZGo com o Xero

O [Xero](https://www.xero.com/) é uma plataforma de contabilidade na nuvem usada por muitas pequenas e médias empresas. A integração ZGo–Xero permite que o comerciante emita uma fatura no Xero, que o cliente a pague em ZEC e que o Xero marque automaticamente a fatura como paga assim que a transação for confirmada.

Como funciona:

1. O comerciante cria uma fatura no Xero normalmente.
2. O ZGo adiciona uma opção de pagamento em Zcash à fatura.
3. O cliente paga em ZEC pela própria carteira.
4. O ZGo monitora a [blockchain do Zcash](https://z.cash/) em busca da transação.
5. Após cinco confirmações, o ZGo informa o pagamento ao Xero, que marca a fatura como liquidada.

O ZEC cai na carteira do comerciante, e não em uma conta controlada pelo ZGo ou pelo Xero. O registro contábil no Xero fica sincronizado automaticamente com a liquidação on-chain.

Para a primeira configuração, siga o passo a passo dedicado: [Configuração da integração com o Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo com o WooCommerce

Para lojas online que rodam em [WooCommerce](https://woocommerce.com/) e [WordPress](https://wordpress.org/), o ZGo oferece um plugin dedicado. O plugin adiciona o Zcash como forma de pagamento no checkout e atualiza o status do pedido automaticamente quando o pagamento é confirmado.

<img width="672" height="378" alt="ZGo WooCommerce plugin checkout and order flow" src="/content-images/55a791bb-1947-4f55-b5b9-55083be8ed49-2bc8d2571e.webp" />

Fluxo completo dentro de uma loja WooCommerce:

1. O cliente chega ao checkout e seleciona Zcash como forma de pagamento.
2. O plugin gera uma solicitação de pagamento e exibe o QR code na página de checkout.
3. O cliente paga a partir da própria carteira.
4. A transação é transmitida à rede Zcash e o ZGo começa a monitorá-la.
5. Após cinco confirmações, o ZGo informa ao plugin que o pagamento é final.
6. O plugin marca o pedido no WooCommerce como pago e atualiza o banco de dados de pedidos.

O pedido só está pago quando a etapa 6 é concluída. Os estados anteriores (transmissão, primeiras confirmações) podem ser mostrados ao cliente como "pagamento recebido, aguardando confirmação", mas o estoque, o atendimento do pedido e qualquer automação posterior devem aguardar o estado final.

O plugin também instala um painel administrativo dentro do WordPress, onde o comerciante pode acompanhar os pedidos e os pagamentos em ZEC recebidos junto com a visualização normal de pedidos do WooCommerce. O plugin aceita todos os tipos de endereço Zcash atuais: Orchard, Sapling e transparente. Clientes que pagam a partir de qualquer carteira compatível podem concluir a transação.

## Recursos

**Não custodiante.** Os pagamentos vão diretamente da carteira do cliente para a carteira do comerciante por meio de transações blindadas. O ZGo nunca retém os fundos no meio do caminho, e o comerciante mantém controle total durante todo o processo.

**Implantação flexível.** O ZGo pode ser usado por uma única tarde em uma feira temporária, em um ponto de venda permanente ou como backend de uma loja online pelas integrações com o Xero ou o WooCommerce.

**Baseado no navegador.** Nenhuma instalação, nem do lado do cliente nem do lado do comerciante. O ZGo roda em qualquer navegador moderno, no computador ou no celular.

**Compatibilidade com carteiras.** As principais carteiras Zcash, incluindo as que aceitam os tipos de endereço Orchard, Sapling e transparente, podem pagar uma fatura do ZGo sem configuração extra do lado do cliente.

**Integrações.** Integrações diretas com o Xero (contabilidade) e o WooCommerce (e-commerce) cobrem, de imediato, os dois fluxos de trabalho mais comuns dos comerciantes.

## Erros comuns

**Considerar o pedido pago antes de cinco confirmações.** Uma transação transmitida não é o mesmo que um pagamento confirmado. A transação ainda pode não ser confirmada ou ser substituída. Só após cinco confirmações o ZGo informa o pagamento como final, e só então o pedido deve ser marcado como pago nos sistemas seguintes. Se o comerciante configurar o estoque ou o atendimento do pedido para serem acionados no evento de transmissão, pagamentos fraudulentos ou malsucedidos causarão prejuízos reais.

**Apontar o ZGo para um endereço de depósito de corretora.** Parece um endereço Zcash, mas os endereços de depósito de corretoras são controlados pela corretora, não pelo comerciante. A corretora detém as chaves, o que significa que a corretora detém os fundos, e isso anula o motivo de usar um processador não custodiante. O endereço de carteira configurado no ZGo deve ser de uma carteira cuja frase semente o comerciante controla diretamente.

**Tratar o ZGo como uma carteira.** O ZGo é um processador de pagamentos, não uma carteira. Ele não armazena chaves, não mantém saldos e não permite que o comerciante gaste fundos. É necessária uma carteira Zcash separada, sob controle do comerciante, para receber o dinheiro que o ZGo encaminha.

## Conclusão

O ZGo oferece aos comerciantes uma forma de aceitar pagamentos em Zcash sem abrir mão da custódia, sem depender de um intermediário e sem expor detalhes das transações em uma chain pública. As duas integrações (Xero e WooCommerce) cobrem os fluxos de trabalho mais comuns dos comerciantes; para todo o resto, o ZGo pode ser usado de forma independente em qualquer navegador.

Para a configuração, o caminho é curto: obtenha uma carteira Zcash, crie uma conta em [zgo.cash](https://zgo.cash/) e comece a gerar solicitações de pagamento diretamente ou instale a integração correspondente.

## Links úteis

- [Site oficial do ZGo](https://zgo.cash/)
- [Passo a passo da configuração da integração com o Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) e [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Página inicial do projeto Zcash](https://z.cash/)
- [Carteiras ZecHub](https://zechub.wiki/wallets), a lista de carteiras Zcash compatíveis
- [Visão geral dos processadores de pagamentos ZecHub](https://zechub.wiki/payment-processors), o ZGo no contexto de outras opções de pagamento em Zcash
- [Plugin Zcash para BTCPayServer](https://zechub.wiki/guides/btcpayserver-zcash-plugin), o guia ZecHub relacionado para uma alternativa auto-hospedada
