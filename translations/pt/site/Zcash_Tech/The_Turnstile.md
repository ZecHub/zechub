# O torniquete

## TL;DR

- O torniquete é uma regra pública de contabilidade que acompanha quanto valor entra e sai de cada pool blindado
- Permite a qualquer pessoa verificar que um pool nunca paga mais do que aquilo que nele foi colocado, mesmo que as transações no seu interior sejam privadas
- Isto protege a oferta de ZEC contra um bug oculto, porque moedas falsificadas não podem sair de um pool sem quebrar a contagem
- Funciona sem enfraquecer a privacidade, uma vez que apenas os totais do pool são públicos, nunca as transações individuais
- O torniquete é a razão pela qual a migração de Orchard para Ironwood consegue provar que a oferta blindada é sólida

<br/>

## A quem se destina

- Qualquer pessoa que queira compreender como a Zcash mantém fiável a sua oferta privada
- Utilizadores que acompanham a migração de Orchard para Ironwood e se perguntam como é que ela prova que a oferta é real
- Pessoas novas no tema que tenham curiosidade em saber como um sistema monetário privado pode ainda assim ser auditado

<br/>

## O desafio

A Zcash blindada oculta montantes, remetentes e destinatários. Essa privacidade é o objetivo. Mas isso levanta uma questão difícil: se ninguém consegue ver o interior do pool blindado, como é que alguém sabe que a quantidade total de ZEC está correta? Como se audita dinheiro que não se consegue ver?

Se algum bug alguma vez permitisse a alguém forjar moedas dentro de um pool blindado, a falsificação ficaria escondida pela mesma privacidade que protege os utilizadores honestos. Sem uma salvaguarda, essa incerteza minaria a confiança em toda a oferta. O torniquete é a salvaguarda que resolve isto.

<br/>

## O que é o torniquete

Pense em cada pool blindado como uma sala com uma única porta contada. Sempre que valor entra no pool vindo de fora, ou sai dele para outro lugar, passa por essa porta e é contabilizado publicamente. As transações dentro da sala permanecem privadas, mas o total acumulado à porta é visível para todos.

A regra é simples: um pool nunca pode deixar sair mais valor do que aquele que entrou. Os nós rejeitam qualquer bloco que faça o saldo de um pool descer abaixo de zero. A quantidade que se acredita estar dentro de um pool é conhecida em todos os momentos, porque é simplesmente o total que entrou menos o total que saiu. Esta contagem pública é o torniquete.

<br/>

## Como funciona

A Zcash teve vários pools blindados ao longo da sua história, como Sprout, Sapling e Orchard. O valor desloca-se entre a cadeia transparente e estes pools, e por vezes também entre os próprios pools. O torniquete observa esses movimentos:

1. Quando ZEC entra num pool blindado, o montante é acrescentado ao saldo público desse pool
2. Quando ZEC sai de um pool, o montante é subtraído
3. A rede rejeita qualquer bloco que torne negativo o saldo de um pool, o que significaria que saiu mais do que alguma vez entrou
4. As transações blindadas individuais continuam totalmente privadas, apenas os totais dos pools são públicos

A rede acompanha desta forma um saldo para cada pool de valor, incluindo Sprout, Sapling, Orchard, o novo pool Ironwood, e os saldos transparentes e lockbox. Por causa disto, mesmo que o conteúdo exato de um pool esteja oculto, o máximo que alguma vez pode sair está limitado pelo que entrou. Nenhuma inflação oculta pode escapar para a circulação.

<br/>

## Como o saldo de valor é verificado

A contagem à porta só é fiável porque cada transação é obrigada a provar que moveu um montante verdadeiro, apesar de o próprio montante permanecer oculto. Cada transação blindada publica um número honesto: o valor líquido que move para dentro ou para fora do pool, chamado o seu saldo de valor. Um saldo de valor positivo significa que os fundos saíram do pool para o lado transparente; um negativo significa que os fundos entraram. Os detalhes privados permanecem selados, mas este único valor líquido é público, e é isso que o torniquete soma.

A parte engenhosa é a forma como uma transação prova que esse número público é honesto sem revelar os montantes privados por trás dele. O mecanismo difere consoante o pool, e esta é a verdadeira maquinaria do torniquete.

No pool Sprout original, cada transação usa um JoinSplit. Um JoinSplit gasta duas notas ocultas e cria duas novas, e transporta dois campos públicos: vpub_old, o valor que entra no pool blindado a partir do lado transparente, e vpub_new, o valor que sai do pool e regressa ao lado transparente. Cada JoinSplit tem de se equilibrar por si só, e a sua prova de conhecimento zero garante que as entradas ocultas e as saídas ocultas somam corretamente. O saldo do pool de Sprout é simplesmente o total acumulado de todos os vpub_old menos todos os vpub_new ao longo da cadeia. É por isso que Sprout é um exemplo útil mais adiante: como vpub_old é a única forma de o valor entrar no pool, uma única regra que o desligue pode selar o pool de vez.

Em Sapling, Orchard e Ironwood, o saldo é provado de uma forma mais inteligente, usando uma assinatura de ligação. Em vez de cada transferência se equilibrar isoladamente, a transação inteira compromete-se com cada montante oculto usando um compromisso de valor. Um compromisso de valor é um envelope selado para um número, construído com um compromisso de Pedersen homomórfico, que tem uma propriedade especial: os envelopes podem ser somados e subtraídos sem serem abertos. A rede soma todos os compromissos de entrada, subtrai todos os compromissos de saída, e compara o resultado com o único valor líquido declarado pela transação, o seu campo valueBalance. Apenas uma transação cujos montantes ocultos correspondam genuinamente a esse valueBalance público pode produzir uma assinatura de ligação válida sobre os compromissos combinados. Se alguém tentasse mover mais valor do que declarou, os compromissos não bateriam certo, a assinatura de ligação não seria verificada, e a transação seria rejeitada. Ironwood usa o mesmo protocolo de Orchard, por isso funciona da mesma forma.

É isto também que torna segura a verificação de uma transferência entre pools. Quando os fundos passam de um pool blindado para outro, por exemplo de Orchard para Ironwood, a transação não consegue esconder os montantes da contabilidade. Cada pool tem o seu próprio saldo de valor que tem de ser satisfeito pelas suas próprias provas: o lado de Orchard tem de mostrar uma saída correspondente através da sua assinatura de ligação, e o lado de Ironwood tem de mostrar a entrada correspondente através da sua própria. O valor que sai de um pool e o valor que entra no outro são ambos provados de forma independente, pelo que um movimento entre pools é, na verdade, duas passagens pelo torniquete a acontecerem numa só transação, uma de saída e outra de entrada, e ambas são contabilizadas publicamente apesar de os montantes subjacentes permanecerem privados.

Portanto, o torniquete não é uma questão de confiança. Cada transação prova matematicamente o seu próprio efeito líquido, a rede soma esses efeitos líquidos provados por pool, e uma regra de consenso (ZIP 209) rejeita qualquer bloco que faça o saldo de um pool ficar negativo. Prova ao nível da transação, aplicação ao nível da cadeia.

<br/>

## Porque é importante

O torniquete dá à Zcash três coisas ao mesmo tempo.

Primeiro, compartimentaliza o risco. Um bug criptográfico num pool fica contido nesse pool, porque o torniquete impede que valor falsificado atravesse para a oferta em geral.

Segundo, permite à comunidade verificar a oferta retrospetivamente. Se mais tarde for descoberto um bug, o registo do torniquete mostra se alguma vez saiu de um pool mais valor do que aquele que entrou. Um registo limpo é uma forte evidência de que nenhuma falsificação foi explorada.

Terceiro, preserva a privacidade enquanto faz tudo isto. Apenas os totais ao nível dos pools são públicos. As suas transações individuais permanecem blindadas. Auditabilidade e privacidade coexistem, o que é invulgar e uma das forças discretas da Zcash.

<br/>

## O torniquete em ação

O torniquete não é novo, e foi usado em momentos-chave da história da Zcash.

Quando a Zcash passou do pool Sprout original para o mais recente pool Sapling, o torniquete protegeu a transição. Mais tarde, o pool Sprout foi restringido para que não pudesse receber novas entradas, o que incentivou os utilizadores a migrar enquanto o torniquete mantinha a contabilidade honesta. Anos depois, o facto de nenhum valor ter saído indevidamente de Sprout continua a servir de evidência de que a sua criptografia inicial nunca foi explorada com sucesso.

O mesmo desenho protege agora a passagem de Orchard para Ironwood. Em 2026 foi encontrado e corrigido um bug de solidez no sistema de provas de Orchard. Não há qualquer evidência de que tenha sido explorado, mas como a atividade blindada é privada, a certeza era impossível. A resposta é selar o antigo pool Orchard e fazer com que todos migrem os seus fundos através do torniquete para Ironwood, um novo pool que usa o protocolo corrigido. Forçar os fundos a passar pelo torniquete significa que quaisquer moedas falsificadas hipotéticas deixadas para trás não podem acompanhar, e, quando a migração estiver concluída, qualquer pessoa poderá confirmar que a oferta blindada é sólida.

<br/>

## Descontinuação unidirecional de pools

O torniquete torna possível retirar um pool antigo de circulação em segurança, apenas numa direção, sem nunca quebrar a garantia da oferta. O truque é fechar a entrada enquanto se deixa a saída aberta.

Sprout é o exemplo mais claro. Para o descontinuar, a ZIP 211 acrescentou uma única regra de consenso: a partir da sua altura de ativação, o campo vpub_old de cada JoinSplit tem de ser zero. Como vpub_old é a única forma de o valor entrar em Sprout, forçá-lo a zero significa que nenhum valor novo pode voltar a entrar, ao mesmo tempo que o valor ainda pode sair para o lado transparente ou seguir para Sapling. O pool tornou-se unidirecional. Só pode escoar, nunca encher. O torniquete continua a contar durante todo o processo, por isso o saldo pode descer à medida que os fundos saem, mas nunca pode subir, e nunca pode ficar negativo.

A migração de Orchard para Ironwood usa a mesma ideia. Na atualização NU6.3, o pool Orchard é fechado a novas entradas, e as wallets passam a ser orientadas para enviar os fundos de Orchard através do torniquete para o novo pool Ironwood. Orchard torna-se um pool unidirecional que só pode esvaziar. Como cada saída é uma passagem pelo torniquete que tem de ser provada, qualquer valor falsificado hipotético deixado para trás em Orchard não pode acompanhar discretamente os fundos honestos para fora. Fica preso num pool que apenas escoa e que é vigiado à porta. Com o tempo, isto conduz o antigo pool para o vazio e permite a qualquer pessoa confirmar que o valor que saiu nunca foi superior ao valor que entrou honestamente.

Esta é a razão mais profunda pela qual o torniquete importa para lá da simples contabilidade. É o mecanismo que permite à Zcash descontinuar um pool blindado, seja para reduzir a complexidade como aconteceu com Sprout, seja para recuperar de um bug descoberto como em Orchard, mantendo ao mesmo tempo uma garantia contínua, pública e comprovável sobre a oferta.

<br/>

## Equívocos comuns

- O torniquete não revela as suas transações. Apenas contabiliza os totais dos pools, não quem enviou o quê a quem
- Não apanha um falsificador pelo nome. Limita a quantidade que pode sair de um pool, e é isso que protege a oferta
- Não é uma invenção nova para Ironwood. Protegeu todas as grandes transições entre pools blindados na história da Zcash
- Um total público de pool não enfraquece a privacidade. A privacidade está nas transações dentro do pool, que permanecem ocultas

<br/>

## Recursos

1. [ZIP 209: Proibir saldos de pools de valor da cadeia fora do intervalo](https://zips.z.cash/zip-0209) - a regra de consenso por trás do torniquete
2. [ZIP 211: Desativar a adição de novo valor ao pool de valor da cadeia Sprout](https://zips.z.cash/zip-0211) - como o pool Sprout foi fechado a novos depósitos
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - a atualização que introduz o pool Ironwood e direciona o valor através do torniquete
4. [Aplicação do torniquete contra a falsificação](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - a explicação original da Electric Coin Company
5. [Especificação do Protocolo Zcash](https://zips.z.cash/protocol/protocol.pdf) - consulte as secções sobre saldo e assinatura de ligação para todos os detalhes
6. [Pools de valor, o Livro Zebra](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - como um nó acompanha o saldo de valor de cada pool

<br/>

## Páginas relacionadas

- [Pools blindados](https://zechub.wiki/using-zcash/shielded-pools) - como as transações blindadas da Zcash mantêm os detalhes privados
- [Halo](https://zechub.wiki/zcash-tech/halo) - o sistema de provas por trás do pool Orchard
- [Atualizações de rede](https://zechub.wiki/start-here/network-upgrades) - como a Zcash ativa alterações como novos pools blindados
