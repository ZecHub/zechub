# A catraca

## TL;DR

- A catraca é uma regra pública de contabilidade que acompanha quanto valor entra e sai de cada pool blindado
- Ela permite que qualquer pessoa verifique que um pool nunca paga mais do que recebeu, mesmo que as transações nele sejam privadas
- Isso protege a oferta de ZEC contra um bug oculto, porque moedas falsificadas não podem sair de um pool sem quebrar a contagem
- Os pagamentos dentro de um pool permanecem privados. Uma transação que move ZEC entre pools mostra o valor que move
- A catraca é a razão pela qual a migração de Orchard para Ironwood consegue provar que a oferta blindada é sólida

<br/>

## Para quem é

- Qualquer pessoa que queira entender como o Zcash mantém sua oferta privada confiável
- Usuários que acompanham a migração de Orchard para Ironwood e se perguntam como ela prova que a oferta é real
- Pessoas novas no tema que têm curiosidade em saber como um sistema monetário privado ainda pode ser auditado

<br/>

## O desafio

O Zcash blindado oculta valores, remetentes e destinatários. Essa privacidade é o objetivo. Mas isso levanta uma questão difícil: se ninguém consegue ver o interior do pool blindado, como alguém sabe que a quantidade total de ZEC está correta? Como se audita dinheiro que não se consegue ver?

Se algum bug permitisse que alguém forjasse moedas dentro de um pool blindado, a falsificação ficaria escondida pela mesma privacidade que protege usuários honestos. Sem uma salvaguarda, essa incerteza minaria a confiança em toda a oferta. A catraca é a salvaguarda que resolve isso.

<br/>

## O que é a catraca

Pense em cada pool blindado como uma sala com uma única porta contabilizada. Sempre que um valor entra no pool vindo de fora, ou sai dele para outro lugar, passa por essa porta e é contabilizado publicamente. As transações dentro da sala permanecem privadas, mas o total acumulado na porta é visível para todos.

A regra é simples: um pool nunca pode deixar sair mais valor do que entrou. Os nós rejeitam qualquer bloco que faça o saldo de um pool ficar abaixo de zero. A quantidade que se acredita estar dentro de um pool é conhecida o tempo todo, porque é simplesmente o total que entrou menos o total que saiu. Essa contagem pública é a catraca.

<br/>

## Como funciona

O Zcash teve vários pools blindados ao longo de sua história, como Sprout, Sapling e Orchard. O valor se move entre a chain transparente e esses pools e, às vezes, também entre os próprios pools. A catraca observa esses movimentos:

1. Quando ZEC entra em um pool blindado, o valor é adicionado ao saldo público desse pool
2. Quando ZEC sai de um pool, o valor é subtraído
3. A rede rejeita qualquer bloco que torne negativo o saldo de um pool, o que significaria que saiu mais do que entrou
4. Cada transação mostra apenas seu fluxo líquido para dentro ou para fora de um pool, seu saldo de valor. Para um pagamento dentro de um único pool, isso é apenas a taxa

A rede acompanha dessa forma um saldo para cada pool de valor, incluindo Sprout, Sapling, Orchard, o novo pool Ironwood e os saldos transparente e lockbox. Por causa disso, mesmo que o conteúdo exato de um pool esteja oculto, o máximo que pode sair é limitado pelo que entrou. Nenhuma inflação oculta pode escapar para a circulação.

<br/>

## Como o saldo de valor é verificado

A contagem na porta só é confiável porque cada transação é obrigada a provar que moveu um valor verdadeiro, embora o próprio valor permaneça oculto. Cada transação blindada publica um número honesto: o valor líquido que move para dentro ou para fora do pool, chamado de saldo de valor. Um saldo de valor positivo significa que os fundos saíram do pool para o lado transparente; um negativo significa que os fundos entraram. Os detalhes privados permanecem selados, mas esse único valor líquido é público, e é isso que a catraca soma.

A parte engenhosa é como uma transação prova que esse número público é honesto sem revelar os valores privados por trás dele. O mecanismo difere conforme o pool, e essa é a verdadeira mecânica da catraca.

No pool Sprout original, cada transação usa um JoinSplit. Um JoinSplit gasta duas notes ocultas e cria duas novas, e contém dois campos públicos: vpub_old, o valor que entra no pool blindado a partir do lado transparente, e vpub_new, o valor que sai do pool e retorna ao lado transparente. Cada JoinSplit precisa se equilibrar por si só, e sua prova de conhecimento zero garante que as entradas ocultas e as saídas ocultas somem corretamente. O saldo do pool Sprout é simplesmente o total acumulado de todos os vpub_old menos todos os vpub_new ao longo da chain. É por isso que Sprout é um exemplo útil mais adiante: como vpub_old é a única forma de valor entrar no pool, uma única regra que o desative pode selar o pool para sempre.

Em Sapling, Orchard e Ironwood, o saldo é provado de uma forma mais inteligente, usando uma assinatura de ligação. Em vez de cada transferência se equilibrar isoladamente, a transação inteira assume um compromisso com cada valor oculto usando um compromisso de valor. Um compromisso de valor é um envelope selado para um número, construído com um compromisso de Pedersen homomórfico, que tem uma propriedade especial: os envelopes podem ser somados e subtraídos sem serem abertos. A rede soma todos os compromissos de entrada, subtrai todos os compromissos de saída e compara o resultado com o único valor líquido declarado pela transação, seu campo valueBalance. Apenas uma transação cujos valores ocultos correspondam genuinamente a esse valueBalance público pode produzir uma assinatura de ligação válida sobre os compromissos combinados. Se alguém tentasse mover mais valor do que declarou, os compromissos não bateriam, a assinatura de ligação não seria verificada e a transação seria rejeitada. Ironwood usa o mesmo protocolo do Orchard, por isso funciona da mesma forma.

É isso também que torna segura a verificação de uma transferência entre pools. Quando os fundos passam de um pool blindado para outro, por exemplo de Orchard para Ironwood, a transação não consegue esconder os valores da contabilidade. Cada pool tem seu próprio saldo de valor que precisa ser satisfeito por suas próprias provas: o lado de Orchard precisa mostrar uma saída correspondente por meio de sua assinatura de ligação, e o lado de Ironwood precisa mostrar a entrada correspondente por meio da sua própria. O valor que sai de um pool e o valor que entra no outro são ambos provados de forma independente, portanto um movimento entre pools é, na verdade, duas passagens pela catraca acontecendo em uma única transação, uma de saída e outra de entrada, e ambas são contabilizadas publicamente embora os valores subjacentes permaneçam privados.

Portanto, a catraca não é uma questão de confiança. Cada transação prova matematicamente seu próprio efeito líquido, a rede soma esses efeitos líquidos provados por pool, e uma regra de consenso (ZIP 209) rejeita qualquer bloco que faça o saldo de um pool ficar negativo. Prova no nível da transação, aplicação no nível da chain.

<br/>

## Por que é importante

A catraca dá ao Zcash três coisas ao mesmo tempo.

Primeiro, ela compartimentaliza o risco. Um bug criptográfico em um pool fica contido nesse pool, porque a catraca impede que valor falsificado atravesse para a oferta em geral.

Segundo, ela permite que a comunidade verifique a oferta retrospectivamente. Se um bug for descoberto mais tarde, o registro da catraca mostra se algum dia saiu de um pool mais valor do que entrou nele. Um registro limpo é uma forte evidência de que nenhuma falsificação foi explorada.

Terceiro, ela mantém privados os pagamentos dentro de um pool enquanto faz tudo isso. Cada transação publica apenas seu fluxo líquido de entrada ou saída de um pool, que, no caso de um pagamento dentro de um único pool, é apenas a taxa. Uma transferência entre pools, como de Orchard para Ironwood, mostra o valor que atravessa. Auditabilidade e privacidade coexistem, o que é incomum e uma das forças discretas do Zcash.

<br/>

## A catraca em ação

A catraca não é nova e foi usada em momentos-chave da história do Zcash.

Quando o Zcash passou do pool Sprout original para o pool Sapling mais recente, a catraca protegeu a transição. Mais tarde, o pool Sprout foi restringido para que não pudesse receber novas entradas, o que incentivou os usuários a migrar enquanto a catraca mantinha a contabilidade honesta. Anos depois, o fato de nenhum valor ter saído indevidamente de Sprout continua sendo evidência de que sua criptografia inicial nunca foi explorada com sucesso.

O mesmo projeto agora protege a passagem de Orchard para Ironwood. Em 2026, foi encontrado e corrigido um bug de solidez no sistema de provas de Orchard. Não há evidências de que ele tenha sido explorado, mas como a atividade blindada é privada, a certeza era impossível. A resposta é selar o antigo pool Orchard e fazer com que todos migrem seus fundos pela catraca para Ironwood, um novo pool que usa o protocolo corrigido. Forçar os fundos a passar pela catraca significa que quaisquer moedas falsificadas hipotéticas deixadas para trás não podem acompanhar, e, quando a migração estiver concluída, qualquer pessoa poderá confirmar que a oferta blindada é sólida.

<br/>

## Descontinuação unidirecional de pools

A catraca torna possível descontinuar um pool antigo com segurança, em apenas uma direção, sem nunca quebrar a garantia da oferta. O truque é fechar a entrada enquanto deixa a saída aberta.

Sprout é o exemplo mais claro. Para descontinuá-lo, a ZIP 211 acrescentou uma única regra de consenso: a partir de sua altura de ativação, o campo vpub_old de cada JoinSplit precisa ser zero. Como vpub_old é a única forma de valor entrar em Sprout, forçá-lo a zero significa que nenhum valor novo pode entrar novamente, enquanto o valor ainda pode sair para o lado transparente ou seguir para Sapling. O pool se tornou unidirecional. Ele só pode escoar, nunca encher. A catraca continua contando durante todo o processo, portanto o saldo pode cair à medida que os fundos saem, mas nunca pode subir e nunca pode ficar negativo.

A migração de Orchard para Ironwood usa a mesma ideia. Na atualização NU6.3, o pool Orchard é fechado para novas entradas, e as carteiras passam a ser orientadas a enviar os fundos de Orchard pela catraca para o novo pool Ironwood. Orchard se torna um pool unidirecional que só pode esvaziar. Como cada saída é uma passagem pela catraca que precisa ser provada, qualquer valor falsificado hipotético deixado para trás em Orchard não pode acompanhar discretamente os fundos honestos para fora. Ele fica preso em um pool que apenas escoa e é vigiado na porta. Com o tempo, isso leva o pool antigo ao esvaziamento e permite que qualquer pessoa confirme que o valor que saiu nunca foi maior do que o valor que entrou honestamente.

Essa é a razão mais profunda pela qual a catraca importa além da simples contabilidade. É o mecanismo que permite ao Zcash descontinuar um pool blindado, seja para reduzir a complexidade, como aconteceu com Sprout, seja para se recuperar de um bug descoberto, como em Orchard, mantendo ao mesmo tempo uma garantia contínua, pública e comprovável sobre a oferta.

<br/>

## Equívocos comuns

- A catraca não revela quem enviou o quê para quem. Ela mostra, contudo, o valor de qualquer transação que mova ZEC entre pools
- Ela não identifica um falsificador pelo nome. Limita a quantidade que pode sair de um pool, e é isso que protege a oferta
- Ela não é uma invenção nova para Ironwood. Protegeu todas as grandes transições entre pools blindados na história do Zcash
- Um total público de um pool não enfraquece a privacidade dos pagamentos dentro do pool. Mover ZEC entre pools mostra o valor movido, razão pela qual a ZIP 318 pede às carteiras que migrem em valores padrão ao longo do tempo

<br/>

## Recursos

1. [ZIP 209: Proibir saldos de pools de valor da chain fora do intervalo](https://zips.z.cash/zip-0209) - a regra de consenso por trás da catraca
2. [ZIP 211: Desativar a adição de novo valor ao pool de valor da chain Sprout](https://zips.z.cash/zip-0211) - como o pool Sprout foi fechado para novos depósitos
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - a atualização que introduz o pool Ironwood e direciona o valor pela catraca
4. [Aplicação da catraca contra a falsificação](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - a explicação original da Electric Coin Company
5. [Especificação do protocolo Zcash](https://zips.z.cash/protocol/protocol.pdf) - consulte as seções sobre saldo e assinatura de ligação para todos os detalhes
6. [Pools de valor, o livro Zebra](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - como um nó acompanha o saldo de valor de cada pool

<br/>

## Páginas relacionadas

- [Pools blindados](https://zechub.wiki/using-zcash/shielded-pools) - como as transações blindadas do Zcash mantêm os detalhes privados
- [Halo](https://zechub.wiki/zcash-tech/halo) - o sistema de provas por trás do pool Orchard
- [Atualizações da rede](https://zechub.wiki/start-here/network-upgrades) - como o Zcash ativa alterações como novos pools blindados
