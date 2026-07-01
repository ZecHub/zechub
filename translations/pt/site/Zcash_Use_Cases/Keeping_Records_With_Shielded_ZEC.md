# Mantendo registros com ZEC blindado

## TL;DR

- Fundos blindados são privados, mas você ainda pode manter registros financeiros limpos e completos
- Memos funcionam como itens de linha no seu livro-razão, como um número de fatura ou para que um pagamento foi feito
- Uma viewing key permite que você, ou alguém que você escolher, como um contador, revise seu histórico sem torná-lo público
- Você pode totalizar receitas e gastos de qualquer período, que é o que você precisa para relatórios ou impostos
- Nada disso enfraquece sua privacidade, porque você decide quem vê o quê

<br/>

## Para quem é isto?

- Freelancers e pequenas empresas que recebem em ZEC
- Qualquer pessoa que precise manter a contabilidade enquanto preserva a privacidade
- Pessoas preparando registros para um contador ou para impostos

<br/>

## O desafio

Privacidade e manutenção de registros podem parecer opostas. Se as suas transações são blindadas, os valores e endereços ficam ocultos do público, então como você mantém uma contabilidade adequada ou mostra sua renda a um contador?

Com Zcash, isso é um falso dilema. Transações blindadas ocultam sua atividade de todos por padrão, mas o Zcash também oferece ferramentas para divulgar seus próprios registros às pessoas que precisam deles, nos seus termos. Você permanece privado para o mundo e aberto para o seu contador ao mesmo tempo.

<br/>

## Memos são o seu livro-razão

Toda transação blindada (z para z) pode carregar um [memo](/using-zcash/memos) criptografado. Para fins de registro, o memo é onde você escreve para que o pagamento foi feito: um número de fatura, o nome de um cliente, um código de projeto ou uma nota curta como "aluguel de março".

Como o memo viaja com a transação e só pode ser lido pelas partes envolvidas, ele se torna um item de linha privado na sua contabilidade. Quando você ou seu cliente incluem um memo claro em cada pagamento, seu histórico de transações se transforma em um livro-razão utilizável em vez de uma lista de valores sem contexto.

Um hábito simples: combine com os clientes de sempre incluir o número da fatura no memo. Depois, relacionar pagamentos a faturas se torna direto.

<br/>

## Revisando seu próprio histórico

Para manter a contabilidade, você precisa ver sua própria atividade. Sua carteira mantém as chaves que descriptografam suas transações blindadas, então sua carteira pode mostrar o quadro completo: datas, valores, quais foram recebidas, quais foram enviadas e os memos anexados.

Esta é a parte que o público não pode ver, mas você pode, porque os dados são seus. Revisar seu histórico regularmente, em vez de apenas no fim do ano, mantém seus registros precisos e torna os erros mais fáceis de detectar.

<br/>

## Compartilhando registros com um contador

Quando você precisa que outra pessoa veja sua atividade blindada, como um contador ou auditor, você não precisa entregar suas spending keys nem tornar nada público. Você compartilha uma [viewing key](/zcash-tech/viewing-keys).

Uma full viewing key é somente leitura. Ela permite que o portador veja transações de entrada e saída de um endereço, incluindo valores e memos, mas nunca permite mover seus fundos. Isso a torna a coisa segura a fornecer a um contador. Ele obtém exatamente a visibilidade de que precisa, seu dinheiro permanece sob seu controle e o resto do mundo continua sem ver nada.

Isso se chama divulgação seletiva, e é uma das razões práticas pelas quais o Zcash blindado funciona a favor de uma contabilidade honesta, e não contra ela.

<br/>

## Totalizando um período

Para a maioria dos relatórios, você precisa de totais ao longo de um intervalo de tempo: quanto recebeu neste trimestre, quanto enviou, sua posição líquida. Como você pode revisar todo o seu próprio histórico, pode somar isso para qualquer período que escolher: um mês, um trimestre ou um ano.

Manter os memos consistentes torna isso mais fácil, porque você pode agrupar pagamentos pelo motivo deles, e não apenas por data e valor.

<br/>

## Uma observação sobre impostos

As regras tributárias diferem por país e mudam com o tempo, então esta é uma informação geral e não uma orientação tributária. Em muitos lugares, receber ou se desfazer de criptomoeda pode ter consequências fiscais, e pode ser esperado que você mantenha registros do que recebeu, quando e qual era seu valor naquele momento.

A boa notícia é que o Zcash blindado não impede você de cumprir essas obrigações. Você pode manter registros privados completos, totalizá-los para o período exigido pela sua autoridade fiscal e divulgá-los a um contador ou autoridade tributária usando uma viewing key, sem tornar sua atividade pública. Se você não tiver certeza de quais são suas obrigações, fale com um profissional qualificado no seu país.

<br/>

## Erros comuns a evitar

- Pular memos, o que deixa você com valores e sem contexto no fim do ano
- Reutilizar um único endereço para tudo, o que dificulta separar clientes ou finalidades
- Esperar até a temporada de impostos para revisar um ano de histórico em vez de manter registros continuamente
- Compartilhar uma spending key quando uma viewing key de somente leitura é tudo de que um contador precisa

<br/>

## Páginas relacionadas

- [Memos](/using-zcash/memos) - como memos criptografados funcionam
- [Viewing Keys](/zcash-tech/viewing-keys) - como exportar e compartilhar acesso de somente leitura
- [Configuração de Privacidade para Freelancers](/zcash-use-cases/freelance-privacy-setup) - receber renda de forma privada, a etapa anterior à manutenção de registros
