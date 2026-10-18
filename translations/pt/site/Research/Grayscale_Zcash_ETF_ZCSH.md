# O ETF de Grayscale Zcash (ZCSH)

**Zcash não lançou um ETF. Grayscale lançou**, ao converter um fundo que
gere desde 2017. Zcash é um protocolo — não tem empresa, tesouraria ou conselho
que pudesse emitir um fundo. Grayscale é um gestor de ativos independente que compra
ZEC no mercado aberto como qualquer outra pessoa.

Essa distinção é o aspeto mais frequentemente mal interpretado sobre ZCSH, e é aqui
que esta página começa. Em 25 de agosto de 2026, o fundo começou a ser negociado na NYSE Arca como
*O ETF de Zcash*, o primeiro produto negociado em bolsa à vista de Zcash nos EUA, e é
agora um dos maiores detentores individuais de ZEC existentes.

![How the Grayscale Zcash ETF works: investors buy ZCSH shares through a brokerage and receive price exposure only, while the trust holds the ZEC at Coinbase Custody in transparent wallets; Authorized Participants create and redeem shares in baskets of 10,000 for cash, and the Sponsor's Fee is paid out of the trust's ZEC, so ZEC per share declines over time](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## O mesmo fundo, três fases

| Quando | O que mudou |
| --- | --- |
| Outubro de 2017 | Lançado como colocação privada, apenas para investidores acreditados |
| Outubro de 2021 | Ações cotadas na OTCQX sob o ticker ZCSH, negociadas com desconto face ao NAV |
| 25 de agosto de 2026 | Torna-se um ETP resgatável na NYSE Arca e elimina “Trust” do nome |

A etapa de 2026 não é meramente cosmética. Um trust cotado em OTC não tem mecanismo
de resgate, pelo que as suas ações podem afastar-se, com prémio ou desconto, do valor
dos ativos subjacentes, por vezes de forma acentuada — precisamente o que
aconteceu entre 2021 e 2026. Um produto negociado em bolsa com criação e resgate
funcionais tem uma via de arbitragem que mantém o preço da ação
ligado ao valor líquido dos ativos. Mudar de um para o outro muda a forma como o
instrumento se comporta enquanto valor mobiliário.

## Quem faz o quê

| Função | Parte |
| --- | --- |
| Patrocinador | Grayscale Investments Sponsors, LLC |
| Fiduciário | CSC Delaware Trust Company |
| Administrador e agente de transferência | O Bank of New York Mellon |
| Corretor principal | Coinbase, Inc. — obtém ZEC para o trust |
| Participantes autorizados | Jane Street, Virtu — criam e resgatam ações |
| Agente de marketing | Foreside Fund Services |
| **Custodiante** | **Coinbase Custody Trust Company, LLC** — o único local onde existe ZEC real |

Nenhuma destas partes, por si só, é o fundo. A estrutura é o acordo
entre elas, que é o que o diagrama acima apresenta. Várias destas funções
estavam ausentes ou mal apresentadas na cobertura jornalística na altura da cotação; a lista aqui
segue a declaração de registo Form S-3 da Grayscale na EDGAR.

## Como as ações são criadas e resgatadas

Apenas os Participantes Autorizados — corretoras registadas ao abrigo de acordo com
o Patrocinador — podem criar ou resgatar ações, e apenas em blocos de 10 000,
denominados Baskets. Um investidor comum nunca interage com este mecanismo; compra
e vende ações existentes na bolsa, como qualquer outro valor cotado.

O mecanismo é atualmente **em numerário**, não em espécie. Um Participante Autorizado
deposita numerário numa conta de numerário, ou recebe numerário dela, e um fornecedor de
liquidez terceiro é quem efetivamente adquire ou aliena os ZEC. A
declaração de registo também descreve um processo em espécie, no qual um
Participante Autorizado depositaria ZEC diretamente junto do Trust ou receberia
ZEC deste — mas declara claramente que “a Aprovação Regulamentar em Espécie não
foi obtida” e poderá nunca ser.

Assim, no processo em numerário, ZEC muda de mãos entre o fornecedor de liquidez
e o mercado, nunca entre o investidor e o Trust. Ninguém no percurso de retalho
interage com um endereço de Zcash.

## A comissão é paga em ZEC

A comissão do patrocinador é de **2,5% ao ano**, à data da cotação. É acumulada diariamente como
percentagem do valor líquido dos ativos e é, nas palavras do registo, “pagável em ZEC
ao Patrocinador diariamente em atraso”.

A consequência é estrutural, e não incidental. A comissão sai dos
ZEC do fundo, pelo que a quantidade de ZEC que suporta cada ação diminui um pouco todos os
dias. Uma ação não é uma quantidade fixa de ZEC mantida indefinidamente; é um direito
sobre uma quantidade que diminui lentamente. Quem comparar uma exposição de longo prazo a ZCSH com
simplesmente deter ZEC precisa de incluir isso na comparação.

Como contexto, 2,5% é aproximadamente dez vezes a comissão de um ETF à vista de bitcoin típico.
Grayscale afirmou que as receitas iniciais da comissão do patrocinador serão direcionadas de volta
para o desenvolvimento do ecossistema de Zcash.

## O que um acionista realmente possui

Uma ação representa exposição ao preço de ZEC. Não é ZEC.

Um acionista não pode enviar uma transação blindada, não pode anexar uma nota, não pode
deter um endereço unificado e não pode fazer autocustódia. Nenhuma das propriedades que
distinguem Zcash de outros ativos está disponível através do invólucro — o
invólucro transmite preço e nada mais. Para um investidor cujo objetivo é obter exposição
numa conta de corretagem ou de reforma, esse é precisamente o objetivo. Para
quem se interessa por Zcash pela privacidade, o ETF não substitui uma
wallet, e os dois não são realmente alternativas entre si.

## O ZEC é detido abertamente

Há uma ironia adicional na estrutura, e é o ponto mais marcante desta
página. Coinbase Custody detém os ZEC do Trust em endereços **transparentes**,
e não blindados. As participações do fundo são visíveis na chain,
rastreáveis até ao custodiante e observáveis em tempo real por qualquer pessoa que queira
consultar. Nada neste fundo utiliza um endereço blindado.

Isto não é uma omissão. A infraestrutura de fundos regulados é construída em torno de auditoria
e atestação, e um saldo blindado é precisamente aquilo que um auditor não consegue
verificar de forma independente. O próprio suporte da Coinbase reflete a mesma assimetria: pode
receber ZEC enviados de um endereço blindado, mas não envia ZEC para
um.

Assim, o maior detentor institucional de um ativo de privacidade mantém-no na única
forma que não oferece privacidade. Este ponto baseia-se em reportagem, e não nos
registos — o S-3 descreve a custódia das chaves privadas do Trust, mas não
caracteriza os tipos de endereço — e é aqui apresentado com essa ressalva.

## Quanto ZEC está envolvido

Na cotação, em 25 de agosto de 2026, o fundo detinha aproximadamente **387 000 ZEC**, com
cerca de **313 milhões de dólares** sob gestão.

Numa perspetiva mais longa: em 30 de setembro de 2025, o registo declara que o Trust detinha
cerca de **2,4% do ZEC em circulação**. Ambos os números variam — o primeiro com o
preço de ZEC e com criações e resgates, o segundo à medida que a comissão é paga
a partir das participações — por isso, obtenha um valor atual a partir do registo mais recente ou
da divulgação diária do próprio fundo, e não desta página.

## Fontes

Todas primárias, todas na EDGAR sob o CIK 1720265, salvo indicação em contrário.

- [Grayscale Zcash Trust (ZEC) — índice de registos da EDGAR](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Declaração de registo Form S-3, novembro de 2025](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — as funções das entidades, mecanismos de criação e resgate, comissão do Patrocinador e percentagem de ZEC em circulação
- [Form 10-K para o ano terminado em 31 de dezembro de 2024](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [O ETF de Zcash começa a ser negociado na NYSE Arca, 25 de agosto de 2026](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale página do fundo Zcash Trust](https://www.grayscale.com/funds/grayscale-zcash-trust) — datas de início e divulgação atual
- [A primeira ETF de moeda de privacidade: análise do registo de Grayscale da Zcash](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — fonte secundária; a única encontrada que afirma que os ZEC do Trust são detidos em endereços transparentes

Os valores são os das datas indicadas e irão variar. Verificado em 30 de setembro de 2026.
Apenas para fins educativos, não constitui aconselhamento de investimento.
