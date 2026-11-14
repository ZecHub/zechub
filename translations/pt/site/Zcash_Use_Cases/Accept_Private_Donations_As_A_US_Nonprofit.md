# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> Aceite doações privadas em ZEC como organização sem fins lucrativos dos EUA

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermediário - 10 min
</span>

> Esta página traz informações gerais, não aconselhamento jurídico ou tributário. As regras fiscais dos EUA mudam, então confira cada etapa com seu contador ou consultor tributário. Cada regra abaixo tem link para a fonte da IRS, verificada em outubro de 2026 com base na Publication 526 (para as declarações de 2025) e no Form 8283 (revisão de dezembro de 2025). O FAQ da IRS sobre moedas virtuais foi escrito para transações anteriores a 2025, então confira-o com as orientações atuais.

## Resumo

- Mantenha as doações em uma carteira blindada controlada pela sua organização, não na carteira pessoal de um funcionário
- O IRS trata o ZEC como propriedade, então uma doação em ZEC é uma contribuição não monetária
- Para uma doação de US$ 250 ou mais, envie ao doador um reconhecimento por escrito que descreva o ZEC mas não atribua a ele um valor em dólares
- Para doações acima de US$ 5.000, o doador precisa de uma avaliação qualificada, e você assina o Form 8283 dele
- Se você vender o ZEC dentro de três anos após recebê-lo e tiver assinado a Section B do Form 8283 do doador, apresente o Form 8282
- Um doador que permanece anônimo para você geralmente não pode deduzir uma doação de US$ 250 ou mais

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Para quem é este guia?

- Instituições de caridade 501(c)(3), igrejas e grupos comunitários dos EUA que querem aceitar ZEC
- Tesoureiros, contadores e membros do conselho que estão configurando doações em cripto
- Doadores que querem saber o que uma organização sem fins lucrativos precisa deles

Para pessoas físicas e criadores de conteúdo, veja [Receba doações de forma privada](/zcash-use-cases/receive-donations-privately).

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> O problema

A maioria dos serviços de doação em cripto para instituições de caridade dos EUA fornece um endereço transparente ou converte a doação para você por meio de um. Em um endereço transparente, qualquer pessoa pode ver cada doação, o valor dela e o seu saldo. Um doador que doa de forma privada de propósito perde essa privacidade no momento em que a doação chega.

Uma organização sem fins lucrativos também tem uma papelada que uma pessoa física não tem: recibos para doadores, formulários da IRS para doações maiores e uma declaração anual. A privacidade e essa papelada podem funcionar juntas, desde que você as planeje antes da chegada da primeira doação.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> O que permanece privado e o que não permanece

| | Doação blindada para o seu endereço blindado |
|---|---|
| O público | Não consegue ver o doador, o seu endereço nem o valor |
| Sua organização | Vê o valor e qualquer memorando; vê o doador apenas se ele contar a você |
| Seu contador | Vê o que você compartilhar, por exemplo, com uma [chave de visualização](/zcash-tech/viewing-keys) |
| Quando você vende | Se a sua corretora aceita apenas depósitos transparentes, o valor que você retira da pool blindada se torna público (veja [a catraca](/zcash-tech/the-turnstile)) |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> O que você precisa

- Uma política de aceitação de doações, aprovada pelo seu conselho, que inclua criptomoedas
- Uma [carteira](/using-zcash/wallets) com endereços blindados, controlada pela organização
- Uma conta em uma corretora em nome da organização, se você planeja converter ZEC em dólares
- Um contador que já tenha lidado com doações não monetárias

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Guia passo a passo

### Passo 1: Defina sua política

Registre por escrito, e peça ao seu conselho que aprove:
- Quem pode movimentar fundos e se duas pessoas precisam aprovar cada movimentação
- Se você vende cada doação imediatamente ou mantém parte em ZEC
- Se você aceita doações anônimas e até qual valor

### Passo 2: Configure uma carteira controlada pela organização

- Crie a carteira em um dispositivo da organização, não em um celular pessoal
- Guarde a frase semente offline, com dois diretores que possam acessá-la individualmente
- Para controle compartilhado, veja [Administre um tesouro comunitário privado](/zcash-use-cases/private-community-treasury)

### Passo 3: Publique um endereço blindado

- Compartilhe um endereço somente blindado na sua página de doações. Um [endereço unificado](/using-zcash/unified-addresses) começa com `u1`, mas também pode conter um receptor transparente, e então uma doação vinda de uma carteira somente transparente chega de forma pública. Use o endereço somente blindado da sua carteira, se ela oferecer um.
- Não publique um endereço transparente (ele começa com `t1` ou `t3`)
- Peça aos doadores que querem um recibo que coloquem o e-mail no [memorando](/using-zcash/memos). O memorando é criptografado, então somente a sua organização pode lê-lo.

### Passo 4: Registre cada doação

Para cada doação, registre:
- Data e hora do recebimento
- Valor em ZEC
- Valor em dólares americanos naquele momento e a fonte de preço que você usou
- ID da transação e memorando

O IRS trata o ZEC como propriedade ([Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)), então isso é uma contribuição não monetária na sua contabilidade. Para dar ao seu contador acesso somente leitura, veja [Mantendo registros com ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec).

### Passo 5: Emita reconhecimento para doações de US$ 250 ou mais

Um doador não pode deduzir uma doação única de US$ 250 ou mais sem um reconhecimento por escrito seu ([Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)). Para uma doação em ZEC, inclua:
- O nome da sua organização
- A data em que você a recebeu
- Uma descrição da doação, por exemplo "1,5 ZEC". Não atribua um valor em dólares: avaliar a doação é tarefa do doador.
- Se você deu algo em troca, por exemplo "Nenhum bem ou serviço foi fornecido em troca desta contribuição."

O doador precisa tê-lo antes de apresentar a declaração de imposto de renda ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)). As organizações costumam enviá-lo até 31 de janeiro do ano seguinte; enviá-lo imediatamente é o mais simples.

### Passo 6: Assine o Form 8283 para doações acima de US$ 5.000

Se um doador declarar mais de US$ 5.000, ele precisa de uma avaliação qualificada. Cripto não conta como valor mobiliário negociado publicamente, então a exigência de avaliação se aplica a ela ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)). O doador traz a você o [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf), e você assina a parte do donatário na Section B. Sua assinatura confirma que você recebeu o ZEC naquela data; ela não confirma o valor declarado pelo doador ([FAQ da IRS, Q36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Passo 7: Converta em dólares, se precisar

- Verifique quais corretoras aceitam depósitos blindados em [Corretoras custodiantes](/using-zcash/custodial-exchanges). Muitas aceitam apenas depósitos transparentes.
- Se a sua aceita apenas depósitos transparentes, mova o ZEC da sua carteira blindada para a corretora em uma única etapa, no momento da venda. Esse valor se torna público, mas suas outras doações e o seu saldo permanecem privados.
- Se você vender o ZEC dentro de três anos após recebê-lo e tiver assinado a Section B do Form 8283 do doador, apresente o [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf) em até 125 dias após a venda e envie uma cópia ao doador ([FAQ da IRS, Q37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Passo 8: Informe na sua declaração anual

Informe as doações em ZEC como contribuições não monetárias na sua declaração da série Form 990, com o [Schedule M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990), se ele se aplicar a você. Pergunte ao seu contador como listar doações anônimas.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Doadores anônimos: o que eles podem e não podem deduzir

- Privacidade em relação ao público não é o mesmo que anonimato em relação a você. Um doador pode doar de forma privada e ainda assim compartilhar o e-mail no memorando para receber um recibo.
- Um doador que permanece anônimo para você não pode receber um reconhecimento, então não pode deduzir uma doação única de US$ 250 ou mais.
- Acima de US$ 5.000, o doador também precisa de uma avaliação e da sua assinatura no Form 8283, o que significa revelar a você quem ele é.
- Para o doador, uma doação em ZEC mantido por mais de um ano geralmente é dedutível pelo valor justo de mercado, sem imposto sobre ganho de capital sobre a doação ([FAQ da IRS, Q34–Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

Informe isso na sua página de doações, para que os doadores possam escolher antes de doar.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erros comuns a evitar

- Manter doações na carteira pessoal de um funcionário
- Publicar um endereço transparente, ou um endereço de depósito de corretora, como seu endereço de doação
- Colocar um valor em dólares no reconhecimento
- Vender dentro de três anos e esquecer o Form 8282
- Prometer dedução fiscal a doadores anônimos

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Resultado

Você pode:
- Aceitar ZEC sem expor seus doadores ou o seu saldo
- Fornecer aos doadores a documentação de que precisam para deduzir a doação
- Manter registros que o seu contador e o seu auditor podem verificar

<br/>

## Fontes

- [IRS: Perguntas frequentes sobre transações com moedas virtuais](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions) (Q34–Q37 tratam de instituições de caridade)
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771: Contribuições beneficentes, comprovação e divulgação](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526: Contribuições beneficentes](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561: Determinação do valor de bens doados](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012: avaliações para doações em cripto](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) e [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Relacionados

- [Receba doações de forma privada](/zcash-use-cases/receive-donations-privately) - a mesma ideia para pessoas físicas
- [Mantendo registros com ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec) - memorandos e chaves de visualização para a sua contabilidade
- [Viewing Keys](/zcash-tech/viewing-keys) - acesso somente leitura para um contador ou auditor
- [A catraca](/zcash-tech/the-turnstile) - o que se torna público quando o ZEC sai de uma pool blindada

<br/>

## Próximo passo

- [Administre um tesouro comunitário privado](/zcash-use-cases/private-community-treasury)

<br/>
