<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Processadores de pagamento Zcash

Formas de aceitar ZEC como comerciante, comparadas lado a lado. Cada item foi conferido no site e na API do próprio provedor em **29 de julho de 2026**, com exceção do Zcash Payment Service, adicionado em **1 de novembro de 2026**.

O suporte a ativos de privacidade muda com frequência, por isso cada linha traz a própria data de verificação. Se você estiver lendo isto meses depois, consulte o site do provedor antes de fazer a integração.

<div class="processor-table">

| Processador | Custódia | ZEC blindado | Auto-hospedagem | Taxa do comerciante | Regiões / KYC | Verificado |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Não custodiante | Sim, Orchard via Unified Addresses | Sim, código aberto | 1% por pagamento, grátis se auto-hospedado | Sem KYC, regiões não informadas | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Não custodiante, apenas chave de visualização | Sim, apenas blindado (Sapling, Orchard, UA) | Sim, código aberto | Nenhuma, você paga apenas as taxas de rede | Global, sem KYC | 2026-07-29 |
| [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service) | Não custodiante, apenas chave de visualização de entrada | Sim, apenas blindado (Sapling e Orchard) | Sim, apenas auto-hospedado, código aberto | Nenhuma, você paga apenas as taxas de rede | Sem conta, sem KYC | 2026-11-01 |
| [ZGo](https://zgo.cash/) | Não custodiante | Sim, Sapling e Orchard | Não, serviço hospedado | Sessão pré-paga, preço não publicado | Sem KYC informado, regiões não informadas | 2026-07-29 |
| [Flexa](https://flexa.co/) | Autocustódia do cliente, o comerciante recebe em moeda fiduciária | O cliente gasta blindado, lado do recebimento não documentado | Não | 1% por pagamento | EUA e 37 países SEPA, ZEC na UE não confirmado | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Não custodiante por padrão | Não, apenas endereço transparente | Não | 0,5%, ou 1% com conversão | Global, exceto onde proibido, sem KYC para começar | 2026-07-29 |
| [Plisio — pagamentos suspensos](https://plisio.net/) | Custodiante, apesar do marketing | Não documentado | Não | 0,5% API, 1,5% white label | Sem KYC para receber | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Custodiante, off-chain | Não, depósitos blindados rejeitados | Não | Grátis de carteira para carteira, 0,8% nos saques | Restrição geográfica, ZEC removido em FR, ES, IT, PL | 2026-07-29 |

</div>

### O que significam as colunas

**Custódia** indica se o processador guarda seus ZEC. Não custodiante significa que os fundos vão para uma carteira que você controla.

**ZEC blindado** indica se você pode receber pagamentos na pool blindada. Apenas transparente significa que o valor e os endereços ficam públicos na blockchain.

**Auto-hospedagem** indica se você pode rodar o software por conta própria, sem nenhuma empresa no meio.

**Taxa do comerciante** não inclui as taxas de rede do Zcash, que alguém paga em todos os casos.

Quando um provedor não publica alguma informação, o item diz "não informado" ou "não documentado" em vez de adivinhar. Isso não é o mesmo que "não".

### Qual escolher

Para o máximo de privacidade e controle, use o **BTCPay Server**, um **CipherPay** auto-hospedado ou o **Zcash Payment Service**, se você puder adicionar um pouco de código ao seu site. Os três são blindados, de código aberto e não guardam fundos para você.

Para receber pagamentos em uma loja física em vez de online, use o **Flexa**.

Para um gateway hospedado em que pagamentos transparentes sejam aceitáveis, use o **NOWPayments**. O **Plisio** suspendeu os pagamentos (veja o aviso datado no item dele abaixo), então não o escolha por enquanto.

Uma ressalva que vale repetir: um processador apenas transparente publica o valor e o endereço de cada pagamento na blockchain. E, com qualquer processador hospedado não custodiante, você entrega sua chave de visualização, então a empresa pode ver seus pagamentos, mesmo que não possa gastá-los. A auto-hospedagem é a única forma de evitar isso.

<div class="processor-note">

**Aviso sobre o serviço ZGo, 29 de julho de 2026.** O backend do ZGo em api.zgo.cash retornou HTTP 503 em todos os endpoints enquanto esta página era verificada. O projeto não foi abandonado e seu mantenedor esteve ativo na comunidade neste mês, mas confirme que o serviço está funcionando antes de depender dele.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="Logo do CipherPay" class="processor-logo" />
- **Tipo de suporte**: Blindado (Orchard, via Unified Addresses)
- **Descrição**: Aceite Zcash em minutos, não custodiante, zero dados do comprador, sem intermediários.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="Logo do CipherPay" width="200" hidden />

Você fornece ao CipherPay uma chave somente de visualização, então os pagamentos vão direto para a sua própria carteira e ele nunca guarda fundos. Ele usa um endereço novo para cada fatura.

Apenas Orchard. Não há suporte a Sapling nem a transparente, embora o README do repositório mencione Sapling.

Custa 1% por pagamento, e nada se você mesmo o rodar. Tudo é de código aberto, como um binário Rust com SQLite ou como uma imagem Docker. Não há KYC, e os compradores não precisam de conta.

As integrações incluem Shopify, WooCommerce, uma API REST, checkout hospedado, links de pagamento e QR presencial.

Há dois pontos a considerar. Ele foi lançado em fevereiro de 2026 e não tem auditoria de segurança publicada. E, no plano hospedado, o operador guarda sua chave de visualização, então pode ver seus pagamentos. A auto-hospedagem elimina isso. Pagamentos blindados também são definitivos, então um reembolso exige que o comprador forneça um endereço a você.

**Última verificação:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="Logo do BTCPay Server" class="processor-logo" />
- **Tipo de suporte**: Apenas blindado (Sapling, Orchard, Unified Address)
- **Descrição**: O BTCPay Server é um processador de pagamentos em criptomoedas de código aberto e auto-hospedado.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="Logo do BTCPay Server" width="200" hidden />

A opção mais forte em termos de custódia. O backend da carteira é somente de visualização e não guarda nenhuma seed nem chave secreta, então nem mesmo um servidor comprometido consegue gastar o seu dinheiro.

Apenas blindado, cobrindo Sapling, Orchard e Unified Addresses. Não há alternativa transparente, então não conte com uma.

Para instalá-lo, você precisa do fork btcpay-zcash do Docker no branch feat/zec, além de uma chave de visualização exportada de uma carteira como Zkool ou Zingo. Por padrão, ele se comunica com um lightwalletd remoto, ou você pode rodar o Zebra e o lightwalletd por conta própria.

Uma limitação que você deve conhecer: o plugin usa uma única carteira Zcash para todas as lojas de uma instância, então não o rode em um servidor compartilhado. Carteiras por loja estão em desenvolvimento.

Não há taxa pelo software em si. Você paga as taxas de rede do Zcash e o custo da sua hospedagem.

**Última verificação:** 2026-07-29

---

## [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)
- **Tipo de suporte**: Apenas blindado (Sapling e Orchard)
- **Descrição**: Um processador de pagamentos Zcash gratuito e auto-hospedado para comerciantes online, executado como um contêiner Docker ou incorporado como um crate Rust.
- **URL**: [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)

Um processador gratuito e de código aberto (MIT) criado por Andrew Arnott, que já o usa para pagamentos reais no próprio aplicativo.

Ele só guarda uma chave de visualização de entrada (uma UIVK). Consegue ver os pagamentos chegando, mas não pode gastá-los, então nem mesmo um servidor comprometido consegue movimentar seus fundos. A chave fica no seu próprio servidor, então nenhuma empresa vê seus pagamentos.

Cada checkout recebe um novo endereço unificado com receptores Sapling e Orchard e nenhum transparente. Os pagamentos vão direto para a sua própria carteira.

Não há taxa, conta nem medidor de uso. Você paga as taxas de rede do Zcash e a sua hospedagem.

Ele é apenas auto-hospedado: um contêiner Docker, ou um crate Rust dentro de um aplicativo que você já roda. Ele lê a chain a partir de um servidor lightwalletd que você escolhe, então você não precisa de um nó integral.

A configuração exige código, não um plugin. No checkout, o seu site pede ao serviço um endereço de pagamento e um QR code, e o serviço avisa o seu site quando o dinheiro chega por meio de webhooks assinados. Há um cliente npm para backends JavaScript e TypeScript, e uma [loja de demonstração](https://github.com/nerdcash/zcash-payment-demo-store) de código aberto para usar como modelo. Não há plugin para Shopify ou WooCommerce, então você precisa ter controle do código do seu site, ou um desenvolvedor que tenha.

Pontos a considerar. Ele é novo: o repositório começou em junho de 2026, o cliente npm está na versão 0.1, ainda não há releases marcadas e não há auditoria de segurança publicada. A API não tem login próprio, então mantenha-a em uma rede privada e nunca a exponha à internet. E, como em qualquer pagamento blindado, um reembolso exige que o comprador forneça um endereço a você.

**Última verificação:** 2026-11-01

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="Logo do ZGo" class="processor-logo" />
- **Tipo de suporte**: Blindado (Sapling e Orchard)
- **Descrição**: O ZGo é uma plataforma de pagamento eletrônico que vai diretamente do seu cliente para você, sem terceiros envolvidos.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="Logo do ZGo" width="200" hidden />

Um caixa que roda no navegador, de modo que um notebook, tablet ou celular se torna o ponto de venda. Há também um plugin para WooCommerce e uma API REST. Foi criado pela Vergara Technologies e financiado pela Zcash Community Grants, incluindo a migração do zcashd para o Zebra.

Os fundos vão do cliente direto para a sua carteira, sem ninguém no meio.

Blindado, cobrindo Sapling e Orchard por meio de Unified Addresses, e segue o ZIP 321. Nenhuma fonte atual diz que ele lida com endereços transparentes, então esta página não afirma mais isso.

Na prática, não é possível auto-hospedá-lo. O ZGo opera a infraestrutura do Zcash para você e não publica nenhum guia de implantação. O código-fonte é público no servidor Git do próprio mantenedor, embora a cópia no GitLab que as pessoas costumam encontrar seja um espelho desatualizado de 2022.

Também não é gratuito. O ZGo vende sessões pré-pagas e exige uma sessão Pro para o WooCommerce, mas a página de preços está inacessível no momento, então nenhum valor é citado aqui.

**Última verificação:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Logo do Flexa" class="processor-logo" />
- **Tipo de suporte**: O cliente gasta blindado, lado do recebimento não documentado
- **Descrição**: O Flexa é uma rede de pagamentos que permite aos clientes gastar ativos digitais, incluindo Zcash, em lojas físicas a partir de uma carteira de autocustódia.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Logo do Flexa" width="200" hidden />

O Flexa não é um gateway de checkout, então não substitui os outros desta página. O cliente abre uma carteira compatível com Flexa, como a Zodl, mostra um código de uso único e a loja o escaneia. Não há fatura em ZEC nem plugin de e-commerce.

O cliente mantém as próprias moedas até o momento do pagamento. Você, como comerciante, nunca recebe ZEC. O Flexa faz o acerto com você na moeda que você escolher, então a parte cripto fica por conta dele.

O próprio anúncio do Flexa descreve a integração com o Zcash como pagamento com ZEC blindado. Para qual tipo de endereço o Flexa recebe não está publicado em lugar nenhum.

A taxa é de 1% por pagamento, com conversão e custódia incluídas sem custo extra.

Funciona nos Estados Unidos e, desde julho de 2026, em 37 países e territórios SEPA. Não está informado se o ZEC especificamente pode ser gasto na Europa.

**Última verificação:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="Logo do NOWPayments" class="processor-logo processor-logo-wide" />
- **Tipo de suporte**: Apenas transparente
- **Descrição**: O NOWPayments é um gateway de pagamento cripto que permite aos comerciantes aceitar pagamentos e doações em Zcash com facilidade.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="Logo do NOWPayments" width="200" hidden />

Sem suporte a blindado. A documentação deles orienta você a definir um endereço transparente para Zcash, e ZEC é a única moeda que eles destacam dessa forma. Todo pagamento que você recebe fica público na blockchain.

Não custodiante por padrão. O FAQ deles diz que não armazenam fundos e nunca guardam chaves privadas. Existe um saldo de custódia opcional, então verifique as configurações da sua conta se precisar ter certeza.

As taxas são de 0,5% para um pagamento simples, ou 1% para pagamentos multimoeda, com taxa fixa ou com "taxa paga pelo usuário", com as taxas de rede à parte.

Disponível globalmente, exceto onde a lei proíbe. Você não precisa de KYC para começar a aceitar cripto, apenas para sacar em moeda fiduciária.

**Última verificação:** 2026-07-29

---

## [Plisio](https://plisio.net/) <img src="/content-images/plisio-wordmark.png" alt="Logo do Plisio" class="processor-logo processor-logo-wide" />

> **Pagamentos suspensos — verificado em 12 de novembro de 2026.** A [página inicial](https://plisio.net/) do Plisio diz que os pagamentos de entrada e de saída estão temporariamente suspensos enquanto trabalhos de restauração estão em andamento. Consulte o provedor antes de enviar fundos. A página específica de Zcash retorna 404 no momento; isso não comprova que o ZEC foi removido. Os detalhes de taxa, custódia e suporte a endereços abaixo foram revisados pela última vez em 29 de julho de 2026 e não foram verificados novamente.

- **Tipo de suporte**: Transparente (não documentado)
- **Descrição**: O Plisio é um gateway de pagamento em criptomoedas que já listou suporte a Zcash. O processamento de pagamentos está suspenso no momento; veja o aviso datado acima.
- **URL**: [Plisio](https://plisio.net/)
<img src="/content-images/plisio-wordmark.png" alt="Logo do Plisio" width="200" hidden />

Trate-o como custodiante. O marketing do Plisio o chama de não custodiante, mas as próprias páginas de ajuda descrevem saldos mantidos na plataforma, armazenamento a frio e um processo de saque. A alegação de não custodiante não pôde ser confirmada.

O Plisio nunca diz quais tipos de endereço Zcash usa, então presuma que seja transparente até que alguém confirme o contrário.

A carteira é gratuita, o gateway e a API custam 0,5% e o White Label custa 1,5%. O White Label é uma versão com outra marca do serviço hospedado deles, não auto-hospedagem.

Você não precisa de KYC para receber pagamentos, e nenhuma lista de países restritos é publicada.

**Última verificação:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Logo do Binance Pay" class="processor-logo" />
- **Tipo de suporte**: Apenas transparente, depósitos blindados rejeitados
- **Descrição**: O Binance Pay é uma plataforma de pagamento em criptomoedas que aceita pagamentos em Zcash.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Logo do Binance Pay" width="200" hidden />

A Binance recusa ZEC enviado de endereços blindados. Essa recusa é o motivo pelo qual os endereços TEX foram criados.

É totalmente custodiante. Os pagamentos circulam off-chain entre carteiras Binance Pay, e você precisa de uma conta Binance verificada.

Transferências de carteira para carteira são gratuitas, os saques para comerciantes custam 0,8% com limite de 5 USD, e os comerciantes de Mini Program pagam 1%.

Verifique a disponibilidade onde você está antes de depender dele. O Binance Pay não é oferecido em alguns países e setores, o ZEC foi removido para usuários na França, Espanha, Itália e Polônia desde 2023, e o serviço no EEE foi afetado pela MiCA.

**Última verificação:** 2026-07-29

---

### Não aceitam mais ZEC

Os dois abaixo já estiveram listados aqui. A lista de moedas ativa de cada provedor foi verificada em 29 de julho de 2026, e o Zcash não aparece mais em nenhuma delas.

A **CoinPayments** não lista ZEC na lista de moedas v2, na lista legada nem na API de moedas ativas, e o artigo sobre Zcash agora redireciona para a página inicial.

A **CoinGate** não lista ZEC na página de moedas suportadas nem na API pública. Nenhuma remoção foi anunciada, então o motivo e a data são desconhecidos.

Se algum deles voltar a aceitar Zcash, adicione-o novamente com uma nova data de verificação.

### Como manter esta página precisa

O suporte a moedas de privacidade muda bastante, então esta página só é tão boa quanto a última verificação. Ao revisá-la:

1. Consulte a lista de moedas ou a API do próprio provedor. Listas de terceiros estavam desatualizadas para os dois processadores removidos acima.
2. Verifique quais tipos de endereço Zcash são suportados. "Suporta Zcash" geralmente significa apenas endereços transparentes.
3. Atualize a data de verificação na tabela e na seção desse provedor.
