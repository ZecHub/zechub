# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> Aceite doações privadas em ZEC como uma organização sem fins lucrativos dos EUA

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermediário - 10 min
</span>

> Esta página contém informações gerais, não aconselhamento jurídico ou fiscal. As regras tributárias dos EUA mudam, por isso confirme cada etapa com seu contador ou consultor tributário. Todas as regras abaixo incluem links para suas fontes do IRS, verificadas em outubro de 2026 com base na Publication 526 (para declarações de 2025) e no Form 8283 (revisão de dezembro de 2025). As perguntas frequentes sobre moeda virtual do IRS foram redigidas para transações anteriores a 2025, por isso confira-as com as orientações atuais.

## TL;DR

- Mantenha as doações em uma carteira blindada controlada pela sua organização, e não na carteira pessoal de um membro da equipe
- O IRS trata ZEC como propriedade, portanto uma doação de ZEC é uma contribuição não monetária
- Para uma doação de 250 USD ou mais, envie ao doador uma confirmação por escrito que descreva o ZEC, mas não atribua a ele um valor em dólares
- Para doações superiores a 5 000 USD, o doador precisa de uma avaliação qualificada, e sua organização assina o Form 8283
- Se vender ZEC no prazo de três anos após recebê-lo e tiver assinado a Seção B do Form 8283 do doador, apresente o Form 8282
- Um doador que permanece anônimo para você geralmente não pode solicitar uma dedução de 250 USD ou mais

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Para quem é?

- Instituições de caridade, igrejas e grupos comunitários 501(c)(3) dos EUA que desejam aceitar ZEC
- Tesoureiros, contadores e membros do conselho que estão configurando doações em cripto
- Doadores que querem saber o que uma organização sem fins lucrativos precisa deles

Para indivíduos e criadores, consulte [Receba doações de forma privada](/zcash-use-cases/receive-donations-privately).

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> O problema

A maioria dos serviços de doações em cripto para instituições de caridade dos EUA fornece a você um endereço transparente ou converte a doação por você. Em um endereço transparente, qualquer pessoa pode ver cada doação, seu valor e seu saldo. Um doador que faz uma doação privada de propósito perde essa privacidade no momento em que a doação chega.

Uma organização sem fins lucrativos também tem documentação que um indivíduo não tem: recibos de doadores, formulários do IRS para doações maiores e uma declaração anual. A privacidade e essa documentação podem funcionar em conjunto, desde que você planeje ambas antes de chegar a primeira doação.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> O que permanece privado e o que não permanece

| | Doação blindada para seu endereço blindado |
|---|---|
| O público | Não consegue ver o doador, seu endereço nem o valor |
| Sua organização | Vê o valor e qualquer memorando; vê o doador apenas se ele informar você |
| Seu contador | Vê o que você compartilhar, por exemplo com uma [chave de visualização](/zcash-tech/viewing-keys) |
| Quando você vender | Se sua corretora aceitar apenas depósitos transparentes, o valor que você retirar do pool blindado se tornará público (consulte [a catraca](/zcash-tech/the-turnstile)) |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> O que você precisa

- Uma política de aceitação de doações, aprovada pelo seu conselho, que abranja criptomoedas
- Uma [carteira](/using-zcash/wallets) com endereços blindados, controlada pela organização
- Uma conta em uma corretora em nome da organização, caso você planeje converter ZEC em dólares
- Um contador que já tenha lidado com doações não monetárias

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Guia passo a passo

### Passo 1: Defina sua política

Registre por escrito e obtenha a aprovação do seu conselho para:
- Quem pode movimentar fundos e se duas pessoas devem aprovar cada movimentação
- Se você vende cada doação imediatamente ou mantém algum ZEC
- Se você aceita doações anônimas e até qual valor

### Passo 2: Configure uma carteira controlada pela organização

- Crie a carteira em um dispositivo da organização, e não em um celular pessoal
- Guarde a frase semente offline, com dois responsáveis que possam acessá-la individualmente
- Para controle compartilhado, consulte [Gerencie um tesouro comunitário privado](/zcash-use-cases/private-community-treasury)

### Passo 3: Publique um endereço blindado

- Compartilhe um endereço exclusivamente blindado em sua página de doações. Um [endereço unificado](/using-zcash/unified-addresses) começa com `u1`, mas também pode conter um receptor transparente, e uma doação proveniente de uma carteira exclusivamente transparente então chega publicamente. Use o endereço exclusivamente blindado da sua carteira, caso ela ofereça um.
- Não publique um endereço transparente (ele começa com `t1` ou `t3`)
- Peça aos doadores que desejam um recibo para inserir seu e-mail no [memorando](/using-zcash/memos). O memorando é criptografado, portanto apenas sua organização pode lê-lo.

### Passo 4: Registre cada doação

Para cada doação, registre:
- Data e hora do recebimento
- Valor em ZEC
- Valor em dólares dos EUA naquele momento e a fonte de preço usada
- ID da transação e memorando

O IRS trata ZEC como propriedade ([Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)), portanto isso é uma contribuição não monetária em seus registros. Para conceder ao seu contador acesso somente para leitura, consulte [Mantendo registros com ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec).

### Passo 5: Confirme doações de 250 USD ou mais

Um doador não pode deduzir uma única doação de 250 USD ou mais sem uma confirmação por escrito sua ([Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)). Para uma doação de ZEC, inclua:
- O nome da sua organização
- A data em que você a recebeu
- Uma descrição da doação, por exemplo, "1,5 ZEC". Não indique um valor em dólares: avaliar a doação é responsabilidade do doador.
- Se você forneceu algo em troca, por exemplo, "Nenhum bem ou serviço foi fornecido em troca desta contribuição."

O doador deve tê-la antes de apresentar sua declaração de impostos ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)). As organizações geralmente a enviam até 31 de janeiro do ano seguinte; enviá-la imediatamente é mais simples.

### Passo 6: Assine o Form 8283 para doações superiores a 5 000 USD

Se um doador solicitar mais de 5 000 USD, ele precisa de uma avaliação qualificada. Cripto não conta como valor mobiliário negociado publicamente, portanto a avaliação se aplica a ela ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)). O doador entrega a você o [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf), e sua organização assina a parte do beneficiário na Seção B. Sua assinatura confirma que você recebeu o ZEC naquela data; não confirma o valor atribuído pelo doador ([FAQ do IRS, P36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Passo 7: Converta em dólares, se necessário

- Verifique quais corretoras aceitam depósitos blindados em [Corretoras custodiantes](/using-zcash/custodial-exchanges). Muitas aceitam apenas depósitos transparentes.
- Se a sua aceitar apenas depósitos transparentes, mova o ZEC da sua carteira blindada para a corretora em uma única etapa, no momento da venda. Esse valor se tornará público, mas suas outras doações e seu saldo permanecerão privados.
- Se vender ZEC no prazo de três anos após recebê-lo e tiver assinado a Seção B do Form 8283 do doador, apresente o [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf) no prazo de 125 dias após a venda e envie uma cópia ao doador ([FAQ do IRS, P37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Passo 8: Informe em sua declaração anual

Informe as doações de ZEC como contribuições não monetárias em sua declaração da série Form 990, com o [Schedule M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990) se ele se aplicar ao seu caso. Pergunte ao seu contador como listar doações anônimas.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Doadores anônimos: o que podem e não podem solicitar

- Privacidade perante o público não é o mesmo que anonimato perante você. Um doador pode contribuir de forma privada e ainda assim compartilhar seu e-mail no memorando para obter um recibo.
- Um doador que permaneça anônimo para você não pode obter uma confirmação, portanto não pode deduzir uma única doação de 250 USD ou mais.
- Acima de 5 000 USD, o doador também precisa de uma avaliação e da sua assinatura no Form 8283, o que significa informar a você quem ele é.
- Para o doador, uma doação de ZEC mantida por mais de um ano geralmente é dedutível pelo valor justo de mercado, sem imposto sobre ganhos de capital sobre a doação ([FAQ do IRS, P34–P35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

Diga isso em sua página de doações, para que os doadores possam escolher antes de doar.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erros comuns a evitar

- Manter doações na carteira pessoal de um membro da equipe
- Publicar um endereço transparente ou um endereço de depósito de uma corretora como seu endereço de doações
- Indicar um valor em dólares na confirmação
- Vender no prazo de três anos e esquecer o Form 8282
- Prometer uma dedução tributária a doadores anônimos

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Resultado

Você pode:
- Aceitar ZEC sem expor seus doadores nem seu saldo
- Fornecer aos doadores a documentação de que precisam para solicitar uma dedução
- Manter registros que seu contador e auditor possam verificar

<br/>

## Fontes

- [IRS: Perguntas frequentes sobre transações com moeda virtual](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions) (P34–P37 abrangem instituições de caridade)
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771: Contribuições de caridade, comprovação e divulgação](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526: Contribuições de caridade](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561: Determinação do valor de propriedade doada](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012: avaliações para doações em cripto](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) e [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Relacionado

- [Receba doações de forma privada](/zcash-use-cases/receive-donations-privately) - a mesma ideia para indivíduos
- [Mantenha registros com ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec) - memorandos e chaves de visualização para sua contabilidade
- [Chaves de visualização](/zcash-tech/viewing-keys) - acesso somente para leitura para um contador ou auditor
- [A catraca](/zcash-tech/the-turnstile) - o que se torna público quando ZEC sai de um pool blindado

<br/>

## Próximo passo

- [Administre um tesouro comunitário privado](/zcash-use-cases/private-community-treasury)

<br/>
