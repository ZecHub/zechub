# O ETF de Zcash da Grayscale (ZCSH)

**O Zcash não lançou um ETF. A Grayscale lançou**, ao converter um fundo que
administra desde 2017. O Zcash é um protocolo — não tem empresa, tesouro ou conselho დირექტivo
que pudesse emitir um fundo. A Grayscale é uma gestora independente de ativos que compra
ZEC no mercado aberto como qualquer outra pessoa.

Essa distinção é o aspecto mais frequentemente mal interpretado sobre o ZCSH, e é por onde
esta página começa. Em 25 de agosto de 2026, o fundo começou a ser negociado na NYSE Arca como
*O ETF de Zcash*, o primeiro produto de Zcash negociado em bolsa à vista nos EUA, e é
agora um dos maiores detentores individuais de ZEC existentes.

![Como funciona o ETF Grayscale Zcash: os investidores compram ações ZCSH por meio de uma corretora e recebem apenas exposição ao preço, enquanto o trust mantém os ZEC na Coinbase Custody em carteiras transparentes; Authorized Participants criam e resgatam ações em lotes de 10.000 por dinheiro, e a Sponsor's Fee é paga com os ZEC do trust, de modo que o ZEC por ação diminui ao longo do tempo](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## O mesmo fundo, três fases

| When | O que mudou |
| --- | --- |
| October 2017 | Lançado como uma colocação privada, somente para investidores credenciados |
| October 2021 | Ações cotadas na OTCQX sob o ticker ZCSH, negociadas com desconto em relação ao NAV |
| 25 August 2026 | Torna-se um ETP resgatável na NYSE Arca e remove "Trust" do nome |

A etapa de 2026 não é meramente cosmética. Um trust cotado em OTC não tem mecanismo
de resgate, portanto suas ações podem se distanciar, com prêmio ou desconto, do valor
dos ativos subjacentes, às vezes de forma acentuada — exatamente o que
aconteceu entre 2021 e 2026. Um produto negociado em bolsa com mecanismos de
criação e resgate funcionais tem uma via de arbitragem que mantém o preço da ação
atrelado ao valor patrimonial líquido. Mudar de um para o outro muda a forma como o
instrumento se comporta como um título mobiliário.

## Quem faz o quê

| Role | Parte |
| --- | --- |
| Sponsor | Grayscale Investments Sponsors, LLC |
| Trustee | CSC Delaware Trust Company |
| Administrator and transfer agent | Bank of New York Mellon |
| Prime broker | Coinbase, Inc. — obtém ZEC para o trust |
| Authorised participants | Jane Street, Virtu — criam e resgatam ações |
| Marketing agent | Foreside Fund Services |
| **Custodian** | **Coinbase Custody Trust Company, LLC** — o único local onde o ZEC real existe |

Nenhuma dessas partes, isoladamente, é o fundo. A estrutura é o acordo
entre elas, que é o que o diagrama acima apresenta. Várias dessas funções
estavam ausentes ou mal apresentadas na cobertura da imprensa no momento da listagem; a lista aqui
segue a declaração de registro Form S-3 da Grayscale na EDGAR.

## Como as ações são criadas e resgatadas

Apenas os Participantes Autorizados — corretoras registradas sob contrato com
o Patrocinador — podem criar ou resgatar ações, e apenas em blocos de 10.000,
chamados Baskets. Um investidor comum nunca lida com esse mecanismo; compra
e vende ações existentes na bolsa, como qualquer outro título listado.

O mecanismo é atualmente **em dinheiro**, não em espécie. Um Participante Autorizado
deposita dinheiro em uma conta em dinheiro ou recebe dinheiro dela, e um provedor de
liquidez terceirizado é quem efetivamente adquire ou se desfaz dos ZEC. A
declaração de registro também descreve um processo em espécie, no qual um
Participante Autorizado depositaria ZEC diretamente junto ao Trust ou receberia
ZEC dele — mas declara claramente que "a aprovação regulatória em espécie não
foi obtida" e poderá nunca ser.

Assim, no processo em dinheiro, o ZEC muda de mãos entre o provedor de liquidez
e o mercado, nunca entre o investidor e o Trust. Ninguém no percurso do investidor de varejo
interage com um endereço de Zcash.

## A taxa é paga em ZEC

A taxa do patrocinador é de **2,5% ao ano**, na data da listagem. É acumulada diariamente como uma
porcentagem do valor patrimonial líquido e é, nas palavras do registro, "pagável em ZEC
ao Patrocinador diariamente em atraso".

A consequência é estrutural, e não incidental. A taxa sai dos
ZEC do fundo, portanto a quantidade de ZEC que sustenta cada ação diminui um pouco todos os
dias. Uma ação não é uma quantidade fixa de ZEC mantida indefinidamente; é um direito
sobre uma quantidade que diminui lentamente. Quem compara uma exposição de longo prazo ao ZCSH com
simplesmente manter ZEC precisa levar isso em conta na comparação.

Para contextualizar, 2,5% é aproximadamente dez vezes a taxa de um ETF à vista de bitcoin típico.
A Grayscale afirmou que as receitas iniciais da taxa do patrocinador serão direcionadas novamente
para o desenvolvimento do ecossistema do Zcash.

## O que um acionista realmente possui

Uma ação representa exposição ao preço do ZEC. Não é ZEC.

Um acionista não pode enviar uma transação blindada, não pode anexar um memorando, não pode
manter um endereço unificado e não pode fazer autocustódia. Nenhuma das propriedades que
distinguem o Zcash de outros ativos está disponível por meio do invólucro — o
invólucro transmite preço e nada mais. Para um investidor cujo objetivo é obter exposição
em uma conta de corretagem ou aposentadoria, esse é exatamente o objetivo. Para
quem se interessa pelo Zcash por sua privacidade, o ETF não substitui uma
carteira, e os dois não são realmente alternativas entre si.

## O ZEC é mantido abertamente

Há uma ironia adicional na estrutura, e é o ponto mais marcante desta
página. A Coinbase Custody mantém os ZEC do Trust em endereços **transparentes**,
e não blindados. As participações do fundo são visíveis na chain,
rastreáveis até o custodiante e observáveis em tempo real por qualquer pessoa que queira
observar. Nada neste fundo usa um endereço blindado.

Isso não é um descuido. A infraestrutura de fundos regulados é construída em torno de auditoria
e atestação, e um saldo blindado é precisamente aquilo que um auditor não consegue
verificar de forma independente. O próprio suporte da Coinbase reflete a mesma assimetria: ele
pode receber ZEC enviado de um endereço blindado, mas não envia ZEC para
um.

Assim, o maior detentor institucional de um ativo de privacidade o mantém na única
forma que não oferece privacidade. Este ponto baseia-se em reportagens, e não nos
documentos protocolados — o S-3 descreve a custódia das chaves privadas do Trust, mas não
caracteriza os tipos de endereço — e é apresentado aqui com essa ressalva.

## Quanto ZEC está envolvido

Na listagem, em 25 de agosto de 2026, o fundo detinha aproximadamente **387.000 ZEC**, com
cerca de **313 milhões de dólares** sob gestão.

Em uma perspectiva de longo prazo: em 30 de setembro de 2025, o registro declara que o Trust detinha
cerca de **2,4% do ZEC em circulação**. Ambos os números variam — o primeiro com o
preço do ZEC e com criações e resgates, o segundo à medida que a taxa é paga
das participações — portanto, obtenha um valor atual no registro mais recente ou
na divulgação diária do próprio fundo, e não nesta página.

## Fontes

Todas as fontes são primárias e estão na EDGAR sob o CIK 1720265, salvo indicação em contrário.

- [Grayscale Zcash Trust (ZEC) — índice de registros da EDGAR](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Declaração de registro do Form S-3, novembro de 2025](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — as funções das entidades, os mecanismos de criação e resgate, a taxa do Patrocinador e a porcentagem de ZEC em circulação
- [Form 10-K para o ano encerrado em 31 de dezembro de 2024](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [O ETF de Zcash começa a ser negociado na NYSE Arca, 25 de agosto de 2026](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Página do fundo Grayscale Zcash Trust](https://www.grayscale.com/funds/grayscale-zcash-trust) — datas de início e divulgação atual
- [O primeiro ETF de moeda de privacidade: análise do registro de Zcash da Grayscale](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — fonte secundária; a única encontrada que afirma que os ZEC do Trust são mantidos em endereços transparentes

Os valores correspondem às datas indicadas e variam. Verificado em 30 de setembro de 2026.
Apenas para fins educativos, não constitui recomendação de investimento.
