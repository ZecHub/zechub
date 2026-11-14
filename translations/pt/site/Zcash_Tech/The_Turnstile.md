# A catraca

## Resumo

- A catraca é uma regra contábil pública que acompanha quanto valor entra e sai de cada pool blindado
- Ela permite que qualquer pessoa verifique que um pool nunca paga mais do que recebeu, mesmo que as transações dentro dele sejam privadas
- Isso protege a oferta de ZEC contra um bug oculto, porque moedas falsificadas não conseguem sair de um pool sem quebrar a contagem
- Os pagamentos dentro de um pool continuam privados. Uma transação que movimenta ZEC entre pools mostra o valor que movimenta
- A catraca é o motivo pelo qual a migração de Orchard para Ironwood consegue provar que a oferta blindada é íntegra

<br/>

## Para quem é

- Qualquer pessoa que queira entender como o Zcash mantém sua oferta privada confiável
- Usuários que estão acompanhando a migração de Orchard para Ironwood e se perguntam como ela prova que a oferta é real
- Iniciantes curiosos para saber como um sistema de dinheiro privado ainda pode ser auditado

<br/>

## O desafio

O Zcash blindado oculta valores, remetentes e destinatários. Essa privacidade é o objetivo. Mas ela levanta uma pergunta difícil: se ninguém consegue ver dentro do pool blindado, como alguém sabe que a quantidade total de ZEC está correta? Como você audita um dinheiro que não consegue ver?

Se algum dia um bug permitisse que alguém falsificasse moedas dentro de um pool blindado, a falsificação ficaria escondida pela mesma privacidade que protege os usuários honestos. Sem uma proteção, essa incerteza abalaria a confiança em toda a oferta. A catraca é a proteção que resolve isso.

<br/>

## O que é a catraca

Pense em cada pool blindado como uma sala com uma única porta, onde tudo é contado. Toda vez que um valor entra no pool vindo de fora, ou sai dele para ir a outro lugar, ele passa pela porta e é contabilizado publicamente. As transações dentro da sala continuam privadas, mas o total acumulado na porta fica visível para todos.

A regra é simples: um pool nunca pode deixar sair mais valor do que entrou. Os nós rejeitam qualquer bloco que levaria o saldo de um pool abaixo de zero. O valor que se considera estar dentro de um pool é conhecido o tempo todo, porque é simplesmente o total que entrou menos o total que saiu. Essa contagem pública é a catraca.

<br/>

## Como funciona

O Zcash teve vários pools blindados ao longo de sua história, como Sprout, Sapling e Orchard. O valor se movimenta entre a chain transparente e esses pools e, às vezes, entre os próprios pools. A catraca observa essas movimentações:

1. Quando o ZEC entra em um pool blindado, o valor é somado ao saldo público desse pool
2. Quando o ZEC sai de um pool, o valor é subtraído
3. A rede rejeita qualquer bloco que faria o saldo de um pool ficar negativo, ou seja, que tivesse saído mais do que jamais entrou
4. Cada transação mostra apenas seu fluxo líquido de entrada ou saída de um pool, seu saldo de valor. Para um pagamento dentro de um único pool, isso é apenas a taxa

A rede acompanha dessa forma um saldo para cada pool de valor, incluindo Sprout, Sapling, Orchard, o novo pool Ironwood e os saldos transparente e do lockbox. Por isso, mesmo que o conteúdo exato de um pool esteja oculto, o máximo que pode sair dele é limitado pelo que entrou. Nenhuma inflação oculta consegue escapar para circulação.

<br/>

## Como o saldo de valor é verificado

A contagem na porta só é confiável porque cada transação é obrigada a provar que movimentou um valor verdadeiro, mesmo que o próprio valor continue oculto. Cada transação blindada publica um único número honesto: o valor líquido que ela movimenta para dentro ou para fora do pool, chamado de saldo de valor. Um saldo de valor positivo significa que fundos saíram do pool para o lado transparente; um negativo significa que fundos entraram. Os detalhes privados continuam lacrados, mas esse único número líquido é público, e é ele que a catraca soma.

A parte engenhosa é como uma transação prova que esse número público é honesto sem revelar os valores privados por trás dele. O mecanismo varia conforme o pool, e esse é o verdadeiro maquinário da catraca.

No pool Sprout original, cada transação usa um JoinSplit. Um JoinSplit gasta duas notes ocultas e cria duas novas, e carrega dois campos públicos: vpub_old, o valor que entra no pool blindado vindo do lado transparente, e vpub_new, o valor que sai do pool de volta para o lado transparente. Cada JoinSplit precisa fechar o saldo por conta própria, e sua prova de conhecimento zero garante que as entradas ocultas e as saídas ocultas somem corretamente. O saldo do pool Sprout é simplesmente o total acumulado de todos os vpub_old menos todos os vpub_new ao longo da chain. É por isso que o Sprout é um exemplo útil mais adiante: como vpub_old é a única forma de um valor entrar no pool, uma única regra que o desative pode lacrar o pool para sempre.

No Sapling, no Orchard e no Ironwood, o saldo é provado de uma forma mais inteligente, usando uma assinatura de vinculação. Em vez de cada transferência fechar o saldo sozinha, a transação inteira se compromete com cada valor oculto usando um compromisso de valor. Um compromisso de valor é um envelope lacrado para um número, construído com um compromisso de Pedersen homomórfico, que tem uma propriedade especial: os envelopes podem ser somados e subtraídos sem serem abertos. A rede soma todos os compromissos de entrada, subtrai todos os compromissos de saída e compara o resultado com o único número líquido declarado pela transação, seu campo valueBalance. Somente uma transação cujos valores ocultos realmente correspondam a esse valueBalance público consegue produzir uma assinatura de vinculação válida sobre os compromissos combinados. Se alguém tentasse movimentar mais valor do que declarou, os compromissos não fechariam, a assinatura de vinculação não seria verificada e a transação seria rejeitada. O Ironwood usa o mesmo protocolo Orchard, então funciona da mesma forma.

É também isso que torna segura a verificação de uma transferência entre pools. Quando fundos passam de um pool blindado para outro, por exemplo de Orchard para Ironwood, a transação não consegue esconder os valores da contabilidade. Cada pool tem seu próprio saldo de valor, que precisa ser satisfeito por suas próprias provas: o lado Orchard precisa mostrar uma saída correspondente por meio de sua assinatura de vinculação, e o lado Ironwood precisa mostrar a entrada correspondente por meio da sua. O valor que sai de um pool e o valor que entra no outro são provados de forma independente, então uma movimentação entre pools é, na verdade, duas passagens pela catraca acontecendo em uma única transação, uma de saída e outra de entrada, e ambas são contabilizadas publicamente, mesmo que os valores subjacentes continuem privados.

Portanto, a catraca não depende de confiança. Cada transação prova matematicamente seu próprio efeito líquido, a rede soma esses efeitos líquidos provados por pool, e uma regra de consenso (ZIP 209) rejeita qualquer bloco que levaria o saldo de um pool a ficar negativo. Prova no nível da transação, aplicação no nível da chain.

<br/>

## Por que isso importa

A catraca dá ao Zcash três coisas ao mesmo tempo.

Primeiro, ela compartimenta o risco. Um bug criptográfico em um pool fica contido nesse pool, porque a catraca impede que valor falsificado passe para a oferta mais ampla.

Segundo, ela permite que a comunidade verifique a oferta retroativamente. Se um bug for descoberto mais tarde, o registro da catraca mostra se algum dia saiu mais valor de um pool do que entrou nele. Um registro limpo é uma forte evidência de que nenhuma falsificação foi explorada.

Terceiro, ela mantém privados os pagamentos dentro de um pool enquanto faz tudo isso. Cada transação publica apenas seu fluxo líquido de entrada ou saída de um pool, que, para um pagamento dentro de um único pool, é apenas a taxa. Uma transferência entre pools, como de Orchard para Ironwood, mostra o valor que atravessa. Auditabilidade e privacidade coexistem, o que é incomum e é um dos pontos fortes discretos do Zcash.

<br/>

## A catraca em ação

A catraca não é nova e já foi usada em momentos-chave da história do Zcash.

Quando o Zcash passou do pool Sprout original para o pool Sapling mais novo, a catraca protegeu a transição. O pool Sprout foi depois restringido para não poder receber novas entradas, o que incentivou os usuários a migrar enquanto a catraca mantinha a contabilidade honesta. Anos depois, o fato de nenhum valor jamais ter saído indevidamente do Sprout é uma evidência de que sua criptografia inicial nunca foi explorada com sucesso.

O mesmo design agora protege a passagem de Orchard para Ironwood. Em 2026, um bug de integridade foi encontrado e corrigido no sistema de provas Orchard. Não há evidência de que ele tenha sido explorado algum dia, mas, como a atividade blindada é privada, era impossível ter certeza. A resposta é lacrar o antigo pool Orchard e fazer com que todos migrem seus fundos pela catraca para o Ironwood, um pool novo que usa o protocolo corrigido. Obrigar os fundos a passar pela catraca significa que quaisquer moedas falsificadas hipotéticas deixadas para trás não conseguem acompanhá-los e, quando a migração terminar, qualquer pessoa poderá confirmar que a oferta blindada é íntegra.

<br/>

## Descontinuação de pool em sentido único

A catraca torna possível aposentar um pool antigo com segurança, em um único sentido, sem nunca quebrar a garantia da oferta. O truque é fechar a entrada e deixar a saída aberta.

O Sprout é o exemplo mais claro. Para descontinuá-lo, a ZIP 211 adicionou uma única regra de consenso: a partir de sua altura de ativação, o campo vpub_old de cada JoinSplit precisa ser zero. Como vpub_old é a única forma de um valor entrar no Sprout, forçá-lo a zero significa que nenhum valor novo pode entrar nunca mais, enquanto o valor ainda pode sair para o lado transparente ou seguir para o Sapling. O pool passou a ser de sentido único. Ele só pode esvaziar, nunca encher. A catraca continua contando o tempo todo, então o saldo pode cair à medida que os fundos saem, mas nunca pode subir, e nunca pode ficar negativo.

A migração de Orchard para Ironwood usa a mesma ideia. Na atualização NU6.3, o pool Orchard é fechado para novas entradas, e as carteiras são orientadas a enviar os fundos do Orchard pela catraca para o novo pool Ironwood. O Orchard se torna um pool de sentido único que só pode esvaziar. Como cada saída é uma passagem pela catraca que precisa ser provada, qualquer valor falsificado hipotético deixado para trás no Orchard não consegue sair discretamente junto com os fundos honestos. Ele fica preso em um pool que só esvazia e é vigiado na porta. Com o tempo, isso leva o pool antigo a ficar vazio e permite que qualquer pessoa confirme que o valor que saiu nunca foi maior do que o valor que entrou honestamente.

Esse é o motivo mais profundo pelo qual a catraca importa além da simples contabilidade. Ela é o mecanismo que permite ao Zcash descontinuar um pool blindado, seja para reduzir a complexidade, como no caso do Sprout, seja para se recuperar de um bug descoberto, como no caso do Orchard, mantendo uma garantia contínua, pública e comprovável sobre a oferta.

<br/>

## Equívocos comuns

- A catraca não revela quem enviou o que para quem. Ela mostra, sim, o valor de qualquer transação que movimenta ZEC entre pools
- Ela não identifica um falsificador pelo nome. Ela limita quanto pode sair de um pool, e é isso que protege a oferta
- Ela não é uma invenção nova criada para Ironwood. Ela protegeu todas as grandes transições de pools blindados na história do Zcash
- Um total público do pool não enfraquece a privacidade dos pagamentos dentro do pool. Movimentar ZEC entre pools mostra o valor movimentado, e é por isso que a ZIP 318 pede que as carteiras migrem em valores padronizados ao longo do tempo

<br/>

## Recursos

1. [ZIP 209: Proibir saldos de pool de valor da chain fora do intervalo](https://zips.z.cash/zip-0209) - a regra de consenso por trás da catraca
2. [ZIP 211: Desativar a adição de novo valor ao pool de valor da chain Sprout](https://zips.z.cash/zip-0211) - como o pool Sprout foi fechado para novos depósitos
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - a atualização que introduz o pool Ironwood e direciona o valor pela catraca
4. [Aplicação da catraca contra falsificação](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - a explicação original da Electric Coin Company
5. [Especificação do protocolo Zcash](https://zips.z.cash/protocol/protocol.pdf) - veja as seções sobre saldo e assinatura de vinculação para todos os detalhes
6. [Pools de valor, o livro do Zebra](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - como um nó acompanha o saldo de valor de cada pool

<br/>

## Páginas relacionadas

- [Pools blindados](https://zechub.wiki/using-zcash/shielded-pools) - como as transações blindadas do Zcash mantêm os detalhes privados
- [Halo](https://zechub.wiki/zcash-tech/halo) - o sistema de provas por trás do pool Orchard
- [Atualizações da rede](https://zechub.wiki/start-here/network-upgrades) - como o Zcash ativa mudanças como novos pools blindados
