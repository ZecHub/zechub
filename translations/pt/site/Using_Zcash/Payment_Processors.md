---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Processadores de Pagamento Zcash

Formas de aceitar ZEC como comerciante, comparadas lado a lado. Cada entrada foi verificada no próprio site e API do fornecedor em **29 de julho de 2026**.

O suporte para ativos de privacidade muda com frequência, por isso cada linha inclui a sua própria data de verificação. Se estiver a ler isto meses depois, verifique o site do fornecedor antes de integrar.

<div class="processor-table">

| Processor | Custody | Shielded ZEC | Self-host | Merchant fee | Regions / KYC | Verified |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Não custodial | Sim, Orchard via Unified Addresses | Sim, open source | 1% por pagamento, grátis se autoalojado | Sem KYC, regiões não indicadas | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Não custodial, apenas view key | Sim, apenas shielded (Sapling, Orchard, UA) | Sim, open source | Nenhuma, paga apenas as taxas de rede | Global, sem KYC | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Não custodial | Sim, Sapling e Orchard | Não, serviço alojado | Sessão pré-paga, preço não publicado | KYC não indicado, regiões não indicadas | 2026-07-29 |
| [Flexa](https://flexa.co/) | Autocustódia do cliente, o comerciante liquida em moeda fiduciária | O cliente gasta shielded, lado de receção não documentado | Não | 1% por pagamento | EUA e 37 países SEPA, ZEC na UE não confirmado | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Não custodial por defeito | Não, apenas endereço transparente | Não | 0,5%, ou 1% com conversão | Global exceto onde proibido, sem KYC para começar | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | Custodial, apesar do marketing | Não documentado | Não | 0,5% API, 1,5% white label | Sem KYC para receber | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Custodial, off-chain | Não, depósitos shielded rejeitados | Não | Grátis wallet-to-wallet, 0,8% levantamentos | Restrito geograficamente, ZEC removido em FR, ES, IT, PL | 2026-07-29 |

</div>

### O que significam as colunas

**Custody** indica se o processador mantém o seu ZEC sob custódia. Não custodial significa que vai para uma wallet que controla.

**Shielded ZEC** indica se pode receber pagamentos no pool shielded. Apenas transparente significa que o montante e os endereços são públicos na blockchain.

**Self-host** indica se pode executar o software por si próprio, sem nenhuma empresa pelo meio.

**Merchant fee** exclui as taxas de rede Zcash, que alguém paga em todos os casos.

Quando um fornecedor não publica alguma informação, a entrada diz "não indicado" ou "não documentado" em vez de adivinhar. Isso não é o mesmo que "não".

### Qual escolher

Para máxima privacidade e controlo, use **BTCPay Server** ou um **CipherPay** autoalojado. Ambos são shielded, open source e não guardam fundos por si.

Para aceitar pagamentos numa loja física em vez de online, use **Flexa**.

Para um gateway alojado em que pagamentos transparentes sejam aceitáveis, use **NOWPayments** ou **Plisio**.

Vale a pena repetir uma ressalva: um processador apenas transparente publica cada montante de pagamento e endereço na blockchain. E com qualquer processador não custodial alojado entrega a sua viewing key, pelo que a empresa pode ver os seus pagamentos mesmo não podendo gastá-los. O autoalojamento é a única forma de evitar isso.

<div class="processor-note">

**Aviso sobre o serviço ZGo, 29 de julho de 2026.** O backend do ZGo em api.zgo.cash devolveu HTTP 503 em todos os endpoints enquanto esta página estava a ser verificada. O projeto não está abandonado e o seu mantenedor esteve ativo na comunidade este mês, mas confirme que o serviço está a funcionar antes de depender dele.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Support Type**: Shielded (Orchard, via Unified Addresses)
- **Description**: Aceite Zcash em minutos, não custodial, zero dados do comprador, sem intermediário.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

Fornece ao CipherPay uma view-only key, por isso os pagamentos vão diretamente para a sua própria wallet e ele nunca detém fundos. Usa um endereço novo para cada fatura.

Apenas Orchard. Não há suporte para Sapling nem transparente, mesmo que o README do repositório mencione Sapling.

Custa 1% por pagamento, e absolutamente nada se o executar por si. Tudo é open source, como binário Rust com SQLite ou como imagem Docker. Não há KYC, e os compradores não precisam de conta.

As integrações abrangem Shopify, WooCommerce, uma API REST, checkout alojado, links de pagamento e QR presenciais.

Há dois aspetos a ponderar. Foi lançado em fevereiro de 2026 e não tem auditoria de segurança publicada. E no plano alojado o operador detém a sua viewing key, pelo que pode ver os seus pagamentos. O autoalojamento elimina isso. Os pagamentos shielded também são finais, por isso um reembolso exige que o comprador lhe dê um endereço.

**Última verificação:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Support Type**: Apenas shielded (Sapling, Orchard, Unified Address)
- **Description**: O BTCPay Server é um processador de pagamentos em criptomoedas open-source e autoalojado.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

A opção mais forte em termos de custódia. O backend da wallet é apenas de visualização e não guarda seed nem chave secreta, por isso mesmo um servidor comprometido não consegue gastar o seu dinheiro.

Apenas shielded, abrangendo Sapling, Orchard e Unified Addresses. Não há alternativa transparente, por isso não planeie a contar com uma.

Para o instalar precisa do fork Docker btcpay-zcash no ramo feat/zec, além de uma viewing key exportada de uma wallet como Ywallet ou Zingo. Por defeito comunica com um lightwalletd remoto, ou pode executar Zebra e lightwalletd por si.

Uma limitação importante: o plugin usa uma única wallet Zcash para todas as lojas numa instância, por isso não o execute num servidor partilhado. Está a ser desenvolvido suporte para wallets por loja.

O próprio software não cobra nenhuma taxa. Paga as taxas de rede Zcash e os custos de alojamento que tiver.

**Última verificação:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Support Type**: Shielded (Sapling e Orchard)
- **Description**: ZGo é uma plataforma de pagamentos eletrónicos que vai diretamente do seu cliente para si, sem terceiros envolvidos.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

Uma caixa de pagamento que funciona no navegador, por isso um portátil, tablet ou telemóvel transforma-se no checkout. Há também um plugin WooCommerce e uma API REST. Foi desenvolvido pela Vergara Technologies e financiado por Zcash Community Grants, incluindo a migração de zcashd para Zebra.

Os fundos vão diretamente do cliente para a sua wallet, sem ninguém pelo meio.

Shielded, abrangendo Sapling e Orchard através de Unified Addresses, e segue o ZIP 321. Nenhuma fonte atual diz que suporte endereços transparentes, por isso esta página já não afirma que o faz.

Não é realmente possível autoalojá-lo. O ZGo executa a infraestrutura Zcash por si e não publica nenhum guia de implementação. O código-fonte é público no próprio servidor Git do mantenedor, embora a cópia no GitLab que as pessoas costumam encontrar seja um mirror desatualizado de 2022.

Também não é gratuito. O ZGo vende sessões pré-pagas e exige uma sessão Pro para WooCommerce, mas a página de preços está atualmente inacessível, por isso não é indicado aqui nenhum valor.

**Última verificação:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Support Type**: O cliente gasta shielded, lado de receção não documentado
- **Description**: Flexa é uma rede de pagamentos que permite aos clientes gastar ativos digitais, incluindo Zcash, em locais de retalho a partir de uma wallet de autocustódia.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

A Flexa não é um gateway de checkout, por isso não substitui as outras opções aqui. O cliente abre uma wallet compatível com Flexa, como Zodl, mostra um código de utilização única e a loja faz a leitura. Não há fatura em ZEC nem plugin de e-commerce.

O cliente mantém as suas próprias moedas até ao momento em que paga. Enquanto comerciante, nunca recebe ZEC. A Flexa liquida consigo na moeda que escolher, pelo que a parte cripto é tratada por eles.

O próprio anúncio da Flexa descreve a integração com Zcash como pagamento com ZEC shielded. O tipo de endereço para o qual a Flexa recebe não está publicado em lado nenhum.

A taxa é de 1% por pagamento, com conversão e custódia incluídas sem custo adicional.

Funciona nos Estados Unidos e, desde julho de 2026, em 37 países e territórios SEPA. Não é indicado se, em particular, ZEC pode ser gasto na Europa.

**Última verificação:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Support Type**: Apenas transparente
- **Description**: NOWPayments é um gateway de pagamentos cripto que permite aos comerciantes aceitar facilmente pagamentos e donativos em Zcash.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Sem suporte shielded. A documentação deles diz-lhe para definir um endereço transparente para Zcash, e ZEC é a única moeda que destacam dessa forma. Cada pagamento que recebe é público na blockchain.

Não custodial por defeito. As FAQ deles dizem que não armazenam fundos e nunca detêm chaves privadas. Existe um saldo custodial opcional, por isso verifique as definições da sua conta se precisar de ter a certeza.

As taxas são 0,5% para um pagamento simples, ou 1% para pagamentos multimoeda, com taxa fixa ou "taxa paga pelo utilizador", com as taxas de rede por cima.

Disponível globalmente exceto onde a lei o proíbe. Não precisa de KYC para começar a aceitar cripto, apenas para levantar moeda fiduciária.

**Última verificação:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Support Type**: Transparente (não documentado)
- **Description**: Plisio é um gateway de pagamentos em criptomoedas que permite às empresas aceitar pagamentos em Zcash.
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Trate-o como custodial. O marketing da Plisio chama-lhe não custodial, mas as suas próprias páginas de ajuda descrevem saldos mantidos na plataforma, cold storage e um processo de levantamento. A alegação de não custodial não pôde ser confirmada.

A Plisio nunca diz que tipos de endereços Zcash usa, por isso assuma transparente até que alguém confirme o contrário.

A wallet é gratuita, o gateway e a API custam 0,5%, e White Label custa 1,5%. White Label é uma reformulação da marca do serviço alojado deles, não autoalojamento.

Não precisa de KYC para receber pagamentos, e não é publicada nenhuma lista de países restringidos.

**Última verificação:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Support Type**: Apenas transparente, depósitos shielded rejeitados
- **Description**: Binance Pay é uma plataforma de pagamentos em criptomoedas que suporta pagamentos em Zcash.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

A Binance rejeita ZEC enviado de endereços shielded. Essa rejeição é a razão pela qual os endereços TEX foram criados.

É totalmente custodial. Os pagamentos circulam off-chain entre wallets Binance Pay, e precisa de uma conta Binance verificada.

As transferências wallet-to-wallet são gratuitas, os pagamentos ao comerciante custam 0,8% com limite máximo de 5 USD, e os comerciantes Mini Program pagam 1%.

Verifique a disponibilidade na sua localização antes de depender dela. Binance Pay não é oferecido em alguns países e setores, ZEC foi removido para utilizadores em França, Espanha, Itália e Polónia desde 2023, e o serviço no EEE tem sofrido interrupções ao abrigo do MiCA.

**Última verificação:** 2026-07-29

---

### Já não aceitam ZEC

Ambos estes estavam anteriormente listados aqui. A lista ativa de moedas de cada fornecedor foi verificada em 29 de julho de 2026 e Zcash desapareceu de ambos.

**CoinPayments** não lista ZEC na sua lista de moedas v2, na sua lista legada, nem na sua API de moedas ativas, e o seu artigo sobre Zcash redireciona agora para a página inicial.

**CoinGate** não lista ZEC na sua página de moedas suportadas nem na sua API pública. Não foi anunciado nenhum delisting, por isso a razão e a data são desconhecidas.

Se algum deles voltar a incluir Zcash, adicione-o novamente com uma nova data de verificação.

### Manter esta página correta

O suporte para privacy coins muda, por isso esta página vale apenas tanto quanto a sua última verificação. Quando a rever:

1. Verifique a própria lista de moedas ou API do fornecedor. As listas de terceiros estavam desatualizadas para ambos os processadores removidos acima.
2. Verifique que tipos de endereços Zcash são suportados. "Suporta Zcash" normalmente significa apenas endereços transparentes.
3. Atualize a data de verificação na tabela e na secção desse fornecedor.
