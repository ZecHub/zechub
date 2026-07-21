<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Processador de Pagamentos ZGo: Aceitando Zcash Sem Custódia

ZGo é um processador de pagamentos sem custódia para Zcash. Um cliente paga em ZEC a partir da sua própria carteira, o ZGo monitora a blockchain do Zcash em busca da transação, e os fundos chegam diretamente à carteira do comerciante por meio de uma transferência blindada. O ZGo nunca mantém o dinheiro em posse em nenhum momento intermediário.

Este guia explica como o fluxo de pagamento funciona, como configurar uma conta e como integrar o ZGo com o Xero e o WooCommerce. Também aborda os dois erros que causam a maioria dos problemas na configuração inicial.

## Nesta página

1. [Por que usar o ZGo](#why-use-zgo)
2. [Como o ZGo funciona](#how-zgo-works)
3. [Configurando uma conta](#setting-up-an-account)
4. [ZGo com Xero](#zgo-with-xero)
5. [ZGo com WooCommerce](#zgo-with-woocommerce)
6. [Recursos](#features)
7. [Erros comuns](#common-mistakes)
8. [Conclusão](#conclusion)
9. [Recursos adicionais](#resources)

## Por que usar o ZGo

A maioria dos processadores de pagamento em criptomoedas é custodial. Os fundos primeiro chegam à conta do processador e são encaminhados ao comerciante depois, o que significa que um terceiro controla temporariamente o dinheiro e pode congelá-lo, atrasá-lo ou reportar informações sobre ele.

O ZGo adota a abordagem oposta. Os pagamentos vão da carteira do cliente diretamente para a carteira do comerciante por meio de uma transação blindada do Zcash. O processador apenas gera a fatura e observa a blockchain para confirmação. Não há saldo intermediário, nem fluxo de saque, nem terceiro que possa atrasar a liquidação.

Para um comerciante, isso significa três coisas práticas: custódia total do ZEC recebido, privacidade de transação blindada por padrão e nenhuma dependência de um provedor centralizado permanecer online ou solvente.

## Como o ZGo funciona

O fluxo de pagamento é o mesmo independentemente de o ZGo ser usado de forma autônoma, por meio do Xero ou por meio do WooCommerce:

1. O comerciante gera uma solicitação de pagamento no ZGo, que é exibida como um código QR com o valor, o ID da fatura e um endereço de recebimento Zcash.
2. O cliente escaneia o QR com uma carteira Zcash (os tipos de endereço Orchard, Sapling e Transparent são todos compatíveis no plugin do WordPress) e aprova o pagamento.
3. A transação é transmitida para a rede Zcash como uma transferência blindada da carteira do cliente para a carteira do comerciante.
4. O ZGo monitora a blockchain do Zcash em busca da transação.
5. Após cinco confirmações, o ZGo marca o pagamento como final e notifica qualquer integração conectada (Xero, WooCommerce ou um webhook).

O limite de cinco confirmações é o número-chave. Qualquer coisa antes disso é um pagamento em andamento, não um pagamento recebido. O cumprimento de pedidos, as atualizações de inventário e qualquer ação irreversível do lado do comerciante devem esperar pela etapa 5.

O ZGo funciona em qualquer navegador moderno em desktop ou mobile, sem necessidade de instalação em nenhum dos lados. O cliente precisa de uma carteira Zcash; o comerciante precisa de uma carteira Zcash e de uma conta ZGo.

<img width="672" height="378" alt="Visão geral da solicitação de pagamento do ZGo e do monitoramento da blockchain" src="https://github.com/user-attachments/assets/de50885b-b068-4157-bbda-0981ca23efc8" />

## Configurando uma conta

Para criar uma conta ZGo, é necessária uma carteira Zcash com uma pequena quantidade de ZEC. Esse pequeno saldo em ZEC cobre a taxa on-chain da transação de inicialização da conta. Qualquer carteira Zcash principal funciona para isso; veja [Carteiras ZecHub](https://zechub.wiki/wallets) para as opções atuais.

A configuração básica:

1. Abra [zgo.cash](https://zgo.cash/) em um navegador.
2. Crie uma conta usando uma carteira Zcash sob controle do comerciante. Essa carteira deve possuir as chaves. Um endereço de depósito de exchange não funcionará (veja [Erros comuns](#common-mistakes)).
3. Verifique a carteira enviando a pequena transação de inicialização.
4. Configure o endereço de recebimento. Todos os pagamentos processados por essa conta chegarão a esta carteira.

Assim que a conta estiver ativa, o mesmo comerciante pode usar o ZGo para pagamentos avulsos (um único código QR em um evento pop-up) ou integrá-lo a uma configuração permanente por meio do Xero ou do WooCommerce.

## ZGo com Xero

[Xero](https://www.xero.com/) é uma plataforma de contabilidade em nuvem usada por muitas pequenas e médias empresas. A integração ZGo–Xero permite que um comerciante emita uma fatura no Xero, que o cliente a pague em ZEC, e que o Xero marque automaticamente a fatura como paga assim que a transação for confirmada.

Como funciona:

1. O comerciante cria uma fatura no Xero como de costume.
2. O ZGo adiciona uma opção de pagamento em Zcash à fatura.
3. O cliente paga em ZEC por meio da sua carteira.
4. O ZGo monitora a [blockchain do Zcash](https://z.cash/) em busca da transação.
5. Após cinco confirmações, o ZGo informa o pagamento de volta ao Xero, que marca a fatura como liquidada.

O ZEC chega à carteira do comerciante, não a qualquer conta controlada pelo ZGo ou pelo Xero. O registro contábil no Xero permanece sincronizado com a liquidação on-chain automaticamente.

Para a configuração inicial, siga o passo a passo dedicado: [Configuração da Integração com Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo com WooCommerce

Para lojas online que funcionam com [WooCommerce](https://woocommerce.com/) e [WordPress](https://wordpress.org/), o ZGo oferece um plugin dedicado. O plugin adiciona o Zcash como método de pagamento no checkout e gerencia automaticamente o estado do pedido quando o pagamento é confirmado.

<img width="672" height="378" alt="Checkout do plugin ZGo WooCommerce e fluxo do pedido" src="https://github.com/user-attachments/assets/55a791bb-1947-4f55-b5b9-55083be8ed49" />

Fluxo completo dentro de uma loja WooCommerce:

1. O cliente chega ao checkout e seleciona Zcash como método de pagamento.
2. O plugin gera uma solicitação de pagamento e mostra o código QR na página de checkout.
3. O cliente paga a partir da sua carteira.
4. A transação é transmitida para a rede Zcash e o ZGo começa a monitorá-la.
5. Após cinco confirmações, o ZGo informa o pagamento como final ao plugin.
6. O plugin marca o pedido do WooCommerce como pago e atualiza o banco de dados de pedidos.

O pedido só está pago quando a etapa 6 é concluída. Estados anteriores (transmissão, primeiras confirmações) podem ser mostrados ao cliente como "pagamento recebido, aguardando confirmação", mas o inventário, o cumprimento e qualquer automação posterior devem esperar pelo estado final.

O plugin também instala um painel administrativo dentro do WordPress, onde o comerciante pode monitorar pedidos e pagamentos recebidos em ZEC junto com a visualização normal de pedidos do WooCommerce. O plugin suporta todos os tipos atuais de endereço Zcash: Orchard, Sapling e Transparent. Clientes pagando a partir de qualquer carteira compatível podem concluir a transação.

## Recursos

**Sem custódia.** Os pagamentos vão diretamente da carteira do cliente para a carteira do comerciante por meio de transações blindadas. O ZGo nunca mantém os fundos em posse em nenhum momento intermediário, e o comerciante mantém controle total o tempo todo.

**Implantação flexível.** O ZGo pode ser usado por uma única tarde em um mercado pop-up, em uma configuração permanente de ponto de venda ou como backend de uma loja online por meio das integrações com Xero ou WooCommerce.

**Baseado em navegador.** Sem necessidade de instalação nem do lado do cliente nem do comerciante. O ZGo funciona em qualquer navegador moderno em desktop ou mobile.

**Compatibilidade com carteiras.** As principais carteiras Zcash, incluindo as que suportam os tipos de endereço Orchard, Sapling e Transparent, podem pagar uma fatura do ZGo sem configuração adicional do lado do cliente.

**Integrações.** As integrações diretas com Xero (contabilidade) e WooCommerce (e-commerce) cobrem os dois fluxos de trabalho comerciais mais comuns prontos para uso.

## Erros comuns

**Tratar o pedido como pago antes de cinco confirmações.** Uma transação transmitida não é o mesmo que um pagamento confirmado. A transação ainda pode falhar em ser confirmada ou ser substituída. Somente após cinco confirmações o ZGo informa o pagamento como final, e somente então o pedido deve ser marcado como pago nos sistemas posteriores. Se um comerciante configurar inventário ou cumprimento para serem acionados no evento de transmissão, pagamentos fraudulentos ou falhos causarão perdas reais.

**Apontar o ZGo para um endereço de depósito de exchange.** Parece um endereço Zcash, mas endereços de depósito de exchange são controlados pela exchange, não pelo comerciante. A exchange detém as chaves, o que significa que a exchange detém os fundos, o que anula o motivo de usar um processador sem custódia. O endereço de carteira configurado no ZGo deve ser o de uma carteira cuja seed phrase o comerciante controle diretamente.

**Tratar o ZGo como uma carteira.** O ZGo é um processador de pagamentos, não uma carteira. Ele não armazena chaves, não mantém saldos e não permite que o comerciante gaste fundos. É necessária uma carteira Zcash separada, sob controle do comerciante, para receber o dinheiro que o ZGo encaminha.

## Conclusão

O ZGo oferece aos comerciantes uma forma de aceitar pagamentos em Zcash sem abrir mão da custódia, sem depender de um intermediário e sem expor detalhes da transação em uma cadeia pública. As duas integrações (Xero e WooCommerce) cobrem os fluxos de trabalho comerciais mais comuns; para todo o resto, o ZGo pode ser usado de forma autônoma em qualquer navegador.

Para a configuração, o caminho é curto: obtenha uma carteira Zcash, crie uma conta em [zgo.cash](https://zgo.cash/) e então comece a gerar solicitações de pagamento diretamente ou instale a integração relevante.

## Recursos adicionais

- [Site oficial do ZGo](https://zgo.cash/)
- [Passo a passo da Configuração da Integração com Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) e [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Página inicial do projeto Zcash](https://z.cash/)
- [Carteiras ZecHub](https://zechub.wiki/wallets), a lista de carteiras Zcash compatíveis
- [Visão geral dos Processadores de Pagamento do ZecHub](https://zechub.wiki/payment-processors), o ZGo no contexto de outras opções de pagamento em Zcash
- [Plugin Zcash para BTCPayServer](https://zechub.wiki/guides/btcpayserver-zcash-plugin), o guia relacionado do ZecHub para uma alternativa auto-hospedada
