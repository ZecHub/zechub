# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> Aceite donativos privados em ZEC como uma organização sem fins lucrativos dos EUA

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermédio - 10 min
</span>

> Esta página contém informações gerais, não aconselhamento jurídico ou fiscal. As regras fiscais dos EUA mudam, por isso confirme cada passo com o seu contabilista ou consultor fiscal. Todas as regras abaixo incluem ligações para as respetivas fontes do IRS, verificadas em outubro de 2026 com base na Publication 526 (para declarações de 2025) e no Form 8283 (revisão de dezembro de 2025). As FAQ sobre moeda virtual do IRS foram redigidas para transações anteriores a 2025, por isso confirme-as com as orientações atuais.

## TL;DR

- Mantenha os donativos numa wallet blindada controlada pela sua organização, e não na wallet pessoal de um membro da equipa
- O IRS trata ZEC como propriedade, pelo que uma oferta de ZEC é uma contribuição não monetária
- Para uma oferta de 250 USD ou mais, envie ao doador um reconhecimento escrito que descreva o ZEC, mas não lhe atribua um valor em dólares
- Para ofertas superiores a 5 000 USD, o doador precisa de uma avaliação qualificada, e a sua organização assina o Form 8283
- Se vender ZEC no prazo de três anos após o receber e tiver assinado a Secção B do Form 8283 do doador, apresente o Form 8282
- Um doador que permaneça anónimo para si, em geral, não pode pedir uma dedução de 250 USD ou mais

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> A quem se destina?

- Instituições de caridade, igrejas e grupos comunitários 501(c)(3) dos EUA que pretendam aceitar ZEC
- Tesoureiros, contabilistas e membros do conselho que estejam a configurar donativos em cripto
- Doadores que querem saber o que uma organização sem fins lucrativos precisa deles

Para indivíduos e criadores, consulte [Receba donativos de forma privada](/zcash-use-cases/receive-donations-privately).

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> O problema

A maioria dos serviços de donativos em cripto para instituições de caridade dos EUA fornece-lhe um endereço transparente ou converte a oferta por si através de um. Num endereço transparente, qualquer pessoa pode ver cada oferta, o respetivo montante e o seu saldo. Um doador que faz um donativo privado de propósito perde essa privacidade no momento em que a oferta chega.

Uma organização sem fins lucrativos também tem documentação que um indivíduo não tem: recibos de doadores, formulários do IRS para ofertas maiores e uma declaração anual. A privacidade e essa documentação podem funcionar em conjunto, desde que as planeie antes de chegar a primeira oferta.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> O que permanece privado e o que não permanece

| | Oferta blindada para o seu endereço blindado |
|---|---|
| O público | Não consegue ver o doador, o seu endereço nem o montante |
| A sua organização | Vê o montante e qualquer memo; vê o doador apenas se este lho disser |
| O seu contabilista | Vê o que partilhar, por exemplo com uma [chave de visualização](/zcash-tech/viewing-keys) |
| Quando vende | Se a sua exchange aceitar apenas depósitos transparentes, o montante que retirar do conjunto blindado torna-se público (consulte [a catraca](/zcash-tech/the-turnstile)) |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> O que precisa

- Uma política de aceitação de ofertas, aprovada pelo seu conselho, que abranja criptomoedas
- Uma [wallet](/using-zcash/wallets) com endereços blindados, controlada pela organização
- Uma conta numa exchange em nome da organização, caso planeie converter ZEC em dólares
- Um contabilista que tenha lidado com ofertas não monetárias

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Guia passo a passo

### Passo 1: Defina a sua política

Registe por escrito e obtenha a aprovação do seu conselho para:
- Quem pode mover fundos e se duas pessoas têm de aprovar cada movimento
- Se vende cada oferta imediatamente ou mantém algum ZEC
- Se aceita ofertas anónimas e até que montante

### Passo 2: Configure uma wallet controlada pela organização

- Crie a wallet num dispositivo da organização, e não num telemóvel pessoal
- Guarde a frase-semente offline, junto de dois responsáveis que possam aceder-lhe individualmente
- Para controlo partilhado, consulte [Gerir uma tesouraria comunitária privada](/zcash-use-cases/private-community-treasury)

### Passo 3: Publique um endereço blindado

- Partilhe um endereço apenas blindado na sua página de donativos. Um [endereço unificado](/using-zcash/unified-addresses) começa por `u1`, mas também pode conter um recetor transparente, e uma oferta proveniente de uma wallet apenas transparente chega então publicamente. Utilize o endereço apenas blindado da sua wallet, caso esta disponibilize um.
- Não publique um endereço transparente (começa por `t1` ou `t3`)
- Peça aos doadores que pretendam um recibo para colocarem o respetivo e-mail no [memo](/using-zcash/memos). O memo é encriptado, pelo que apenas a sua organização o pode ler.

### Passo 4: Registe cada oferta

Para cada oferta, registe:
- Data e hora de receção
- Montante em ZEC
- Valor em dólares dos EUA nesse momento e a fonte de preço utilizada
- ID da transação e memo

O IRS trata ZEC como propriedade ([Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)), pelo que se trata de uma contribuição não monetária nos seus registos. Para conceder ao seu contabilista acesso só de leitura, consulte [Manter registos com ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec).

### Passo 5: Confirme ofertas de 250 USD ou mais

Um doador não pode deduzir uma única oferta de 250 USD ou mais sem um reconhecimento escrito seu ([Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)). Para uma oferta de ZEC, inclua:
- O nome da sua organização
- A data em que a recebeu
- Uma descrição da oferta, por exemplo, "1,5 ZEC". Não indique um valor em dólares: avaliar a oferta é responsabilidade do doador.
- Se forneceu algo em troca, por exemplo, "Não foram fornecidos bens ou serviços em troca desta contribuição."

O doador tem de o possuir antes de apresentar a declaração de impostos ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)). As organizações geralmente enviam-no até 31 de janeiro do ano seguinte; enviá-lo de imediato é mais simples.

### Passo 6: Assine o Form 8283 para ofertas superiores a 5 000 USD

Se um doador reclamar mais de 5 000 USD, necessita de uma avaliação qualificada. As criptomoedas não contam como valores mobiliários negociados publicamente, pelo que a avaliação se aplica a elas ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)). O doador entrega-lhe o [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf), e a sua organização assina a parte do beneficiário na Secção B. A sua assinatura confirma que recebeu o ZEC nessa data; não confirma o valor atribuído pelo doador ([FAQ do IRS, P36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Passo 7: Converta em dólares, se necessário

- Verifique quais exchanges aceitam depósitos blindados em [Exchanges com custódia](/using-zcash/custodial-exchanges). Muitas aceitam apenas depósitos transparentes.
- Se a sua aceitar apenas depósitos transparentes, mova o ZEC da sua wallet blindada para a exchange numa só etapa, no momento da venda. Esse montante torna-se público, mas as suas outras ofertas e o seu saldo permanecem privados.
- Se vender ZEC no prazo de três anos após o receber, e tiver assinado a Secção B do Form 8283 do doador, apresente o [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf) no prazo de 125 dias após a venda e envie uma cópia ao doador ([FAQ do IRS, P37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Passo 8: Declare na sua declaração anual

Declare as ofertas de ZEC como contribuições não monetárias na sua declaração da série Form 990, com o [Schedule M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990) se este se aplicar ao seu caso. Pergunte ao seu contabilista como listar ofertas anónimas.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Doadores anónimos: o que podem e não podem reclamar

- A privacidade perante o público não é o mesmo que o anonimato perante si. Um doador pode contribuir de forma privada e ainda assim partilhar o seu e-mail no memo para obter um recibo.
- Um doador que permaneça anónimo para si não pode obter um reconhecimento, pelo que não pode deduzir uma única oferta de 250 USD ou mais.
- Acima de 5 000 USD, o doador também precisa de uma avaliação e da sua assinatura no Form 8283, o que significa dizer-lhe quem é.
- Para o doador, uma oferta de ZEC mantida por mais de um ano é geralmente dedutível pelo valor justo de mercado, sem imposto sobre mais-valias sobre a oferta ([FAQ do IRS, P34–P35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

Diga isto na sua página de donativos, para que os doadores possam escolher antes de contribuir.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erros comuns a evitar

- Manter ofertas na wallet pessoal de um membro da equipa
- Publicar um endereço transparente, ou um endereço de depósito de uma exchange, como endereço de donativos
- Indicar um valor em dólares no reconhecimento
- Vender no prazo de três anos e esquecer o Form 8282
- Prometer uma dedução fiscal a doadores anónimos

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Resultado

Pode:
- Aceitar ZEC sem expor os seus doadores nem o seu saldo
- Fornecer aos doadores a documentação de que precisam para reclamar uma dedução
- Manter registos que o seu contabilista e auditor possam verificar

<br/>

## Fontes

- [IRS: Perguntas frequentes sobre transações com moeda virtual](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions) (P34–P37 abrangem instituições de caridade)
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771: Contribuições de caridade, comprovação e divulgação](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526: Contribuições de caridade](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561: Determinação do valor de propriedade doada](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012: avaliações para ofertas em cripto](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) e [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Relacionado

- [Receba donativos de forma privada](/zcash-use-cases/receive-donations-privately) - a mesma ideia para indivíduos
- [Manter registos com ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec) - memos e chaves de visualização para a sua contabilidade
- [Chaves de visualização](/zcash-tech/viewing-keys) - acesso só de leitura para um contabilista ou auditor
- [A catraca](/zcash-tech/the-turnstile) - o que se torna público quando ZEC sai de um conjunto blindado

<br/>

## Próximo passo

- [Gerir uma tesouraria comunitária privada](/zcash-use-cases/private-community-treasury)

<br/>
