<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Processadores de pagamentos do Zcash

Formas de aceitar ZEC como comerciante, comparadas lado a lado. Cada entrada foi verificada no próprio site e na API do fornecedor em **29 de julho de 2026**.

O suporte a ativos de privacidade muda com frequência, por isso cada linha inclui sua própria data de verificação. Se você estiver lendo isto meses depois, verifique o site do fornecedor antes de integrar.

<div class="processor-table">

| Processor | Custody | Shielded ZEC | Self-host | Merchant fee | Regions / KYC | Verified |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Não custodial | Sim, Orchard via Unified Addresses | Sim, open source | 1% por pagamento, grátis se hospedado por conta própria | Sem KYC, regiões não informadas | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Não custodial, apenas chave de visualização | Sim, apenas blindado (Sapling, Orchard, UA) | Sim, open source | Nenhuma, você paga apenas as taxas de rede | Global, sem KYC | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Não custodial | Sim, Sapling e Orchard | Não, serviço hospedado | Sessão pré-paga, preço não publicado | KYC não informado, regiões não informadas | 2026-07-29 |
| [Flexa](https://flexa.co/) | Autocustódia do cliente, o comerciante recebe em moeda fiduciária | O cliente gasta fundos blindados, lado recebedor não documentado | Não | 1% por pagamento | EUA e 37 países SEPA, ZEC na UE não confirmado | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Não custodial por padrão | Não, apenas endereço transparente | Não | 0,5%, ou 1% com conversão | Global, exceto onde proibido, sem KYC para começar | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | Custodiante, apesar do marketing | Não documentado | Não | 0,5% API, 1,5% white label | Sem KYC para receber | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Custodiante, off-chain | Não, depósitos blindados rejeitados | Não | Grátis de carteira para carteira, 0,8% em pagamentos ao comerciante | Restrito geograficamente, ZEC removido em FR, ES, IT, PL | 2026-07-29 |

</div>

### O que significam as colunas

**Custody** indica se o processador mantém seu ZEC sob custódia. Não custodial significa que ele vai para uma carteira que você controla.

**Shielded ZEC** indica se você pode receber pagamentos no pool blindado. Apenas transparente significa que o valor e os endereços são públicos na blockchain.

**Self-host** indica se você pode executar o software por conta própria, sem nenhuma empresa no meio.

**Merchant fee** exclui as taxas de rede do Zcash, que alguém paga em todos os casos.

Quando um fornecedor não publica alguma informação, a entrada diz "não informado" ou "não documentado" em vez de adivinhar. Isso não é o mesmo que "não".

### Qual escolher

Para ter o máximo de privacidade e controle, use **BTCPay Server** ou **CipherPay** hospedado por conta própria. Ambos são blindados, open source e não mantêm fundos para você.

Para aceitar pagamentos em uma loja física em vez de online, use **Flexa**.

Para um gateway hospedado em que pagamentos transparentes sejam aceitáveis, use **NOWPayments** ou **Plisio**.

Vale a pena repetir uma ressalva: um processador apenas transparente publica cada valor de pagamento e endereço na blockchain. E com qualquer processador não custodial hospedado, você entrega sua chave de visualização, para que a empresa possa ver seus pagamentos mesmo sem poder gastá-los. Hospedar por conta própria é a única forma de evitar isso.

<div class="processor-note">

**Aviso sobre o serviço ZGo, 29 de julho de 2026.** O backend do ZGo em api.zgo.cash retornou HTTP 503 em todos os endpoints enquanto esta página estava sendo verificada. O projeto não está abandonado e seu mantenedor esteve ativo na comunidade este mês, mas confirme que o serviço está funcionando antes de depender dele.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Tipo de suporte**: Blindado (Orchard, via Unified Addresses)
- **Descrição**: Aceite Zcash em minutos, não custodial, zero dados do comprador, sem intermediário.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

Você fornece ao CipherPay uma chave somente de visualização, por isso os pagamentos vão diretamente para sua própria carteira e ele nunca mantém fundos. Ele usa um endereço novo para cada fatura.

Apenas Orchard. Não há suporte para Sapling nem para endereços transparentes, mesmo que o README do repositório mencione Sapling.

Custa 1% por pagamento e absolutamente nada se você o executar por conta própria. Tudo é open source, como binário Rust com SQLite ou como imagem Docker. Não há KYC, e os compradores não precisam de conta.

As integrações abrangem Shopify, WooCommerce, uma API REST, checkout hospedado, links de pagamento e QR presencial.

Há dois aspectos a considerar. Ele foi lançado em fevereiro de 2026 e não tem auditoria de segurança publicada. E, no plano hospedado, o operador mantém sua chave de visualização, por isso pode ver seus pagamentos. Hospedar por conta própria elimina isso. Os pagamentos blindados também são finais, por isso um reembolso exige que o comprador forneça um endereço.

**Última verificação:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Tipo de suporte**: Apenas blindado (Sapling, Orchard, Unified Address)
- **Descrição**: O BTCPay Server é um processador de pagamentos em criptomoedas open source e hospedado por conta própria.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

A opção mais forte em termos de custódia. O backend da carteira é somente de visualização e não mantém seed nem chave secreta, por isso mesmo um servidor comprometido não consegue gastar seu dinheiro.

Apenas blindado, abrangendo Sapling, Orchard e Unified Addresses. Não há alternativa transparente, por isso não conte com uma.

Para instalá-lo, você precisa do fork Docker btcpay-zcash no ramo feat/zec, além de uma chave de visualização exportada de uma carteira como Zkool ou Zingo. Por padrão, ele se comunica com um lightwalletd remoto, ou você pode executar Zebra e lightwalletd por conta própria.

Uma limitação importante: o plugin usa uma única carteira Zcash para todas as lojas em uma instância, por isso não o execute em um servidor compartilhado. O suporte a carteiras por loja está sendo desenvolvido.

O próprio software não cobra nenhuma taxa. Você paga as taxas de rede do Zcash e seus custos de hospedagem.

**Última verificação:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Tipo de suporte**: Blindado (Sapling e Orchard)
- **Descrição**: ZGo é uma plataforma de pagamentos eletrônicos que vai diretamente do seu cliente até você, sem terceiros envolvidos.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

Um caixa que funciona no navegador, por isso um laptop, tablet ou celular se transforma no checkout. Há também um plugin para WooCommerce e uma API REST. Foi desenvolvido pela Vergara Technologies e financiado por Zcash Community Grants, incluindo a migração de zcashd para Zebra.

Os fundos vão diretamente do cliente para sua carteira, sem ninguém no meio.

Blindado, abrangendo Sapling e Orchard por meio de Unified Addresses, e segue o ZIP 321. Nenhuma fonte atual diz que ele suporta endereços transparentes, por isso esta página não afirma mais que ele os suporta.

Você não consegue realmente hospedá-lo por conta própria. O ZGo executa a infraestrutura do Zcash para você e não publica nenhum guia de implantação. O código-fonte é público no próprio servidor Git do mantenedor, embora a cópia no GitLab que as pessoas costumam encontrar seja um mirror desatualizado de 2022.

Ele também não é gratuito. O ZGo vende sessões pré-pagas e exige uma sessão Pro para WooCommerce, mas a página de preços está atualmente inacessível, por isso nenhum valor é informado aqui.

**Última verificação:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Tipo de suporte**: O cliente gasta fundos blindados, lado recebedor não documentado
- **Descrição**: Flexa é uma rede de pagamentos que permite aos clientes gastar ativos digitais, incluindo Zcash, em estabelecimentos de varejo a partir de uma carteira de autocustódia.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

A Flexa não é um gateway de checkout, por isso não substitui as outras opções aqui. O cliente abre uma carteira compatível com Flexa, como Zodl, mostra um código de uso único e a loja o escaneia. Não há fatura em ZEC nem plugin de e-commerce.

O cliente mantém suas próprias moedas até o momento em que paga. Como comerciante, você nunca recebe ZEC. A Flexa faz o pagamento para você na moeda que escolher, por isso eles cuidam da parte cripto.

O próprio anúncio da Flexa descreve a integração com o Zcash como pagamento com ZEC blindado. O tipo de endereço no qual a Flexa recebe não é publicado em lugar nenhum.

A taxa é de 1% por pagamento, com conversão e custódia incluídas sem custo adicional.

Funciona nos Estados Unidos e, desde julho de 2026, em 37 países e territórios SEPA. Não é informado se, em particular, ZEC pode ser gasto na Europa.

**Última verificação:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Tipo de suporte**: Apenas transparente
- **Descrição**: NOWPayments é um gateway de pagamentos cripto que permite aos comerciantes aceitar facilmente pagamentos e doações em Zcash.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Sem suporte blindado. A documentação deles diz para você definir um endereço transparente para o Zcash, e ZEC é a única moeda que eles destacam dessa forma. Cada pagamento que você recebe é público na blockchain.

Não custodial por padrão. As FAQs deles dizem que não armazenam fundos e nunca mantêm chaves privadas. Há um saldo custodiante opcional, por isso verifique as configurações da sua conta se precisar ter certeza.

As taxas são de 0,5% para um pagamento direto ou de 1% para pagamentos multimoeda, de taxa fixa ou com "taxa paga pelo usuário", além das taxas de rede.

Disponível globalmente, exceto onde a lei o proíbe. Você não precisa de KYC para começar a aceitar cripto, apenas para sacar moeda fiduciária.

**Última verificação:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Tipo de suporte**: Transparente (não documentado)
- **Descrição**: Plisio é um gateway de pagamentos em criptomoedas que permite às empresas aceitar pagamentos em Zcash.
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Trate-a como custodiante. O marketing da Plisio a chama de não custodial, mas suas próprias páginas de ajuda descrevem saldos mantidos na plataforma, cold storage e um processo de saque. A alegação de não custodial não pôde ser confirmada.

A Plisio nunca diz quais tipos de endereços do Zcash usa, por isso presuma que sejam transparentes até que alguém confirme o contrário.

A carteira é gratuita, o gateway e a API custam 0,5%, e White Label custa 1,5%. White Label é uma reformulação da marca do serviço hospedado deles, não hospedagem por conta própria.

Você não precisa de KYC para receber pagamentos, e nenhuma lista de países restritos é publicada.

**Última verificação:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Tipo de suporte**: Apenas transparente, depósitos blindados rejeitados
- **Descrição**: Binance Pay é uma plataforma de pagamentos em criptomoedas que aceita pagamentos em Zcash.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

A Binance rejeita ZEC enviado de endereços blindados. Essa rejeição é a razão pela qual os endereços TEX foram criados.

É totalmente custodiante. Os pagamentos circulam off-chain entre carteiras Binance Pay, e você precisa de uma conta Binance verificada.

As transferências de carteira para carteira são gratuitas, os pagamentos ao comerciante custam 0,8%, limitados a 5 USD, e os comerciantes Mini Program pagam 1%.

Verifique a disponibilidade onde você está antes de depender dele. Binance Pay não é oferecido em alguns países e setores, ZEC foi removido para usuários na França, Espanha, Itália e Polônia desde 2023, e o serviço no EEE sofreu interrupções sob o MiCA.

**Última verificação:** 2026-07-29

---

### Não aceitam mais ZEC

Ambos estavam listados aqui anteriormente. A lista atual de moedas de cada provedor foi verificada em 29 de julho de 2026, e o Zcash desapareceu de ambos.

**CoinPayments** não lista ZEC em sua lista de moedas v2, em sua lista legada nem em sua API de moedas ativas, e seu artigo sobre o Zcash agora redireciona para a página inicial.

**CoinGate** não lista ZEC em sua página de moedas aceitas nem em sua API pública. Nenhuma deslistagem foi anunciada, portanto o motivo e a data são desconhecidos.

Se algum deles voltar a incluir o Zcash, adicione-o novamente com uma nova data de verificação.

### Mantendo esta página precisa

O suporte a privacy coins varia, portanto esta página só é tão boa quanto sua última verificação. Quando você a revisar:

1. Verifique a própria lista de moedas ou API do provedor. As listas de terceiros estavam desatualizadas para ambos os processadores removidos acima.
2. Verifique quais tipos de endereços do Zcash são aceitos. "Suporta Zcash" geralmente significa apenas endereços transparentes.
3. Atualize a data de verificação na tabela e na seção desse provedor.
