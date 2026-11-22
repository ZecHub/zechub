# O ETF Grayscale Zcash (ZCSH)

**O Zcash não lançou um ETF. Quem lançou foi a Grayscale**, ao converter um fundo que ela
administra desde 2017. O Zcash é um protocolo: ele não tem empresa, tesouro nem conselho
que possa emitir um fundo. A Grayscale é uma gestora de ativos independente que compra
ZEC no mercado aberto, como qualquer outra pessoa.

Essa distinção é o ponto mais mal compreendido sobre o ZCSH, e é por ela que
esta página começa. Em 25 de agosto de 2026, o fundo começou a ser negociado na NYSE Arca como
*The Zcash ETF*, o primeiro produto negociado em bolsa à vista de Zcash nos EUA, e ele é
hoje um dos maiores detentores individuais de ZEC que existem.

![Como funciona o Grayscale Zcash ETF: os investidores compram cotas ZCSH por meio de uma corretora e recebem apenas exposição ao preço, enquanto o trust mantém os ZEC na Coinbase Custody em carteiras transparentes; os Authorized Participants criam e resgatam cotas em lotes de 10,000 em dinheiro, e a Sponsor's Fee é paga com os ZEC do trust, então a quantidade de ZEC por cota diminui com o tempo](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## O mesmo fundo, três etapas

| Quando | O que mudou |
| --- | --- |
| Outubro de 2017 | Lançado como colocação privada, apenas para investidores credenciados |
| Outubro de 2021 | Cotas cotadas na OTCQX sob o ticker ZCSH, negociadas com desconto em relação ao NAV |
| 25 de agosto de 2026 | Torna-se um ETP resgatável na NYSE Arca e retira "Trust" do nome |

A etapa de 2026 não é cosmética. Um trust cotado no mercado OTC não tem mecanismo
de resgate, então suas cotas podem se afastar do valor dos ativos que as lastreiam,
com prêmio ou desconto, às vezes de forma acentuada. Foi exatamente isso que
aconteceu entre 2021 e 2026. Um produto negociado em bolsa com criação e resgate
funcionando tem um caminho de arbitragem que mantém o preço da cota
atrelado ao valor patrimonial líquido. Passar de um formato para o outro muda o
comportamento do fundo como valor mobiliário.

## Quem faz o quê

| Função | Parte |
| --- | --- |
| Patrocinador | Grayscale Investments Sponsors, LLC |
| Trustee | CSC Delaware Trust Company |
| Administrador e agente de transferência | The Bank of New York Mellon |
| Prime broker | Coinbase, Inc., que obtém ZEC para o trust |
| Participantes autorizados | Jane Street, Virtu, que criam e resgatam cotas |
| Agente de marketing | Foreside Fund Services |
| **Custodiante** | **Coinbase Custody Trust Company, LLC**, o único lugar onde os ZEC de fato existem |

Nenhuma dessas partes, sozinha, é o fundo. A estrutura é o arranjo
entre elas, e é isso que o diagrama acima mostra. Várias dessas funções
estavam ausentes ou distorcidas na cobertura da imprensa na época da listagem. A lista aqui
segue a declaração de registro Form S-3 da Grayscale no EDGAR.

## Como as cotas são criadas e resgatadas

Somente os participantes autorizados (corretoras registradas com contrato com
o patrocinador) podem criar ou resgatar cotas, e apenas em lotes de 10.000,
chamados de cestas. Um investidor comum nunca mexe nesse mecanismo: ele compra
e vende cotas já existentes na bolsa, como qualquer outro valor mobiliário listado.

Atualmente, o mecanismo é em **dinheiro**, não em espécie. Um participante autorizado
deposita dinheiro em uma conta, ou recebe dinheiro dela, e quem de fato obtém
ou vende os ZEC é um provedor de liquidez terceirizado. A
declaração de registro também descreve um processo em espécie, no qual um
participante autorizado depositaria ZEC diretamente no trust ou receberia
ZEC dele. Mas ela afirma claramente que "a aprovação regulatória para operações em espécie não
foi obtida", e talvez nunca seja.

Portanto, no processo em dinheiro, os ZEC trocam de mãos entre o provedor de liquidez
e o mercado, nunca entre o investidor e o trust. Ninguém no caminho do investidor de varejo
mexe em um endereço Zcash.

## A taxa é paga em ZEC

A taxa do patrocinador é de **2,5% ao ano**, na data da listagem. Ela é calculada diariamente como
porcentagem do valor patrimonial líquido e, nas palavras do documento, é "paga em ZEC
ao patrocinador diariamente, de forma postecipada".

A consequência é estrutural, não acidental. A taxa sai dos
ZEC do fundo, então a quantidade de ZEC que lastreia cada cota diminui um pouco a cada
dia. Uma cota não é uma quantidade fixa de ZEC mantida indefinidamente. É um direito
sobre uma quantidade que encolhe aos poucos. Quem compara a exposição de longo prazo via ZCSH com
simplesmente manter ZEC precisa incluir isso na comparação.

Para efeito de comparação, 2,5% é cerca de dez vezes a taxa de um ETF típico de bitcoin à vista.
A Grayscale afirmou que a receita inicial da taxa do patrocinador será direcionada de volta
ao desenvolvimento do ecossistema Zcash.

## O que um cotista realmente possui

Uma cota é exposição ao preço do ZEC. Ela não é ZEC.

Um cotista não pode enviar uma transação blindada, não pode anexar um memorando, não pode
ter um endereço unificado e não pode fazer autocustódia. Nenhuma das propriedades que
distinguem o Zcash de outros ativos está disponível por meio do fundo: ele
transmite o preço e nada mais. Para um investidor que quer exposição
dentro de uma conta de corretagem ou de previdência, é exatamente essa a ideia. Para
quem se interessa pelo Zcash por causa da privacidade, o ETF não substitui
uma carteira, e na verdade os dois nem são alternativas um ao outro.

## Os ZEC ficam à vista

Há mais uma ironia na estrutura, e ela é o ponto mais marcante desta
página. A Coinbase Custody guarda os ZEC do trust em endereços **transparentes**,
não em endereços blindados. As posições do fundo são visíveis na chain,
rastreáveis até o custodiante e observáveis em tempo real por qualquer pessoa que queira
olhar. Nada neste fundo usa um endereço blindado.

Isso não é um descuido. A infraestrutura de fundos regulados é construída em torno de auditoria
e atestação, e um saldo blindado é justamente o que um auditor não consegue
verificar de forma independente. O próprio suporte da Coinbase reflete a mesma assimetria: ela
recebe ZEC enviados de um endereço blindado, mas não envia ZEC para
um.

Assim, o maior detentor institucional de um ativo de privacidade o mantém na única
forma que não tem privacidade. Esta informação vem de reportagens, e não dos
documentos oficiais (o S-3 descreve a custódia das chaves privadas do trust, mas não
especifica os tipos de endereço), e é apresentada aqui com essa ressalva.

## Quantos ZEC estão envolvidos

Na listagem, em 25 de agosto de 2026, o fundo detinha aproximadamente **387.000 ZEC**, com
cerca de **US$ 313 milhões** sob gestão.

Para uma visão mais ampla: em 30 de setembro de 2025, o documento informa que o trust detinha
cerca de **2,4% dos ZEC em circulação**. Os dois números variam: o primeiro com o
preço do ZEC e com as criações e resgates, o segundo à medida que a taxa é paga
com as posições do fundo. Por isso, use um valor atualizado do documento mais recente ou
da divulgação diária do próprio fundo, e não desta página.

## Fontes

Todas primárias, todas no EDGAR sob o CIK 1720265, salvo indicação em contrário.

- [Índice de documentos EDGAR do Grayscale Zcash Trust (ZEC)](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Declaração de registro Form S-3, novembro de 2025](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm): funções das entidades, mecânica de criação e resgate, taxa do patrocinador e porcentagem dos ZEC em circulação
- [Form 10-K referente ao exercício encerrado em 31 de dezembro de 2024](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [O ETF Zcash começa a ser negociado na NYSE Arca, 25 de agosto de 2026](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Página do fundo Zcash Trust da Grayscale](https://www.grayscale.com/funds/grayscale-zcash-trust): datas de criação e divulgação atual
- [O primeiro ETF de moeda de privacidade: por dentro do documento Zcash da Grayscale](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/): fonte secundária, a única encontrada que afirma que os ZEC do trust são mantidos em endereços transparentes

Os valores se referem às datas indicadas e vão variar. Verificado em 30 de setembro de 2026.
Apenas para fins educacionais, não é recomendação de investimento.
