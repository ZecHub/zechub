# O torniquete

## TL;DR

- O torniquete é uma regra pública de contabilidade que acompanha quanto valor entra e sai de cada pool shielded
- Permite que qualquer pessoa verifique que uma pool nunca paga mais do que aquilo que nela foi colocado, mesmo que as transações no seu interior sejam privadas
- Isto protege a oferta de ZEC contra um bug oculto, porque moedas falsificadas não podem sair de uma pool sem quebrar a contagem
- Funciona sem enfraquecer a privacidade, uma vez que apenas os totais das pools são públicos, nunca as transações individuais
- O torniquete é a razão pela qual a migração de Orchard para Ironwood consegue provar que a oferta shielded é sólida

<br/>

## A quem se destina

- Qualquer pessoa que queira compreender como a Zcash mantém fiável a sua oferta privada
- Utilizadores que estão a acompanhar a migração de Orchard para Ironwood e se perguntam como é que ela prova que a oferta é real
- Pessoas novas no ecossistema curiosas sobre como um sistema de dinheiro privado pode, ainda assim, ser auditado

<br/>

## O desafio

A Zcash shielded oculta montantes, remetentes e destinatários. Essa privacidade é o objetivo. Mas isso levanta uma questão difícil: se ninguém consegue ver o interior da pool shielded, como é que alguém sabe que a quantidade total de ZEC está correta? Como se audita dinheiro que não se consegue ver?

Se algum bug alguma vez permitisse a alguém forjar moedas dentro de uma pool shielded, a falsificação ficaria escondida pela mesma privacidade que protege os utilizadores honestos. Sem uma salvaguarda, essa incerteza minaria a confiança em toda a oferta. O torniquete é a salvaguarda que resolve isto.

<br/>

## O que é o torniquete

Pense em cada pool shielded como uma sala com uma única porta de entrada e saída contabilizada. Sempre que valor entra na pool vindo de fora, ou sai dela para outro lugar, passa por essa porta e é registado publicamente. As transações dentro da sala mantêm-se privadas, mas o total acumulado à porta é visível para todos.

A regra é simples: uma pool nunca pode deixar sair mais valor do que aquele que entrou. Os nodes rejeitam qualquer bloco que faça o saldo de uma pool descer abaixo de zero. O montante que se acredita estar dentro de uma pool é conhecido em todos os momentos, porque é simplesmente o total que entrou menos o total que saiu. Esta contagem pública é o torniquete.

<br/>

## Como funciona

A Zcash teve várias pools shielded ao longo da sua história, como Sprout, Sapling e Orchard. O valor move-se entre a cadeia transparente e estas pools, e por vezes também entre as próprias pools. O torniquete vigia esses movimentos:

1. Quando ZEC entra numa pool shielded, o montante é adicionado ao saldo público dessa pool
2. Quando ZEC sai de uma pool, o montante é subtraído
3. A rede rejeita qualquer bloco que torne o saldo de uma pool negativo, o que significaria que saiu mais do que alguma vez entrou
4. As transações shielded individuais mantêm-se totalmente privadas, apenas os totais das pools são públicos

A rede acompanha desta forma um saldo para cada pool de valor, incluindo Sprout, Sapling, Orchard, a nova pool Ironwood, bem como os saldos transparentes e de lockbox. Por causa disto, mesmo que o conteúdo exato de uma pool esteja oculto, o máximo que dela pode sair está sempre limitado por aquilo que nela entrou. Nenhuma inflação oculta pode escapar para circulação.

<br/>

## Como o saldo de valor é verificado

A contagem à porta só é fiável porque cada transação é obrigada a provar que moveu um montante verdadeiro, apesar de o próprio montante permanecer oculto. Cada transação shielded publica um número honesto: o valor líquido que move para dentro ou para fora da pool, chamado value balance. Um value balance positivo significa que fundos saíram da pool para o lado transparente; um value balance negativo significa que os fundos entraram. Os detalhes privados permanecem selados, mas esta única figura líquida é pública, e é isso que o torniquete soma.

A parte engenhosa é a forma como uma transação prova que esse número público é honesto sem revelar os montantes privados por trás dele. O mecanismo difere consoante a pool, e esta é a verdadeira maquinaria do torniquete.

Na pool Sprout original, cada transação usa um JoinSplit. Um JoinSplit gasta duas notes ocultas e cria duas novas, e transporta dois campos públicos: vpub_old, o valor que entra na pool shielded a partir do lado transparente, e vpub_new, o valor que sai da pool de volta para o lado transparente. Cada JoinSplit tem de fechar contas por si só, e a sua zero knowledge proof garante que os inputs ocultos e os outputs ocultos somam corretamente. O saldo da pool Sprout é simplesmente o total acumulado de todos os vpub_old menos todos os vpub_new ao longo da cadeia. É por isso que Sprout é um exemplo útil mais adiante: porque vpub_old é a única forma de valor entrar na pool, uma única regra que o desative pode selar a pool para sempre.

Em Sapling, Orchard e Ironwood, o saldo é provado de forma mais inteligente, usando uma binding signature. Em vez de cada transferência fechar contas isoladamente, a transação inteira faz um compromisso com cada montante oculto usando um value commitment. Um value commitment é um envelope selado para um número, construído com um homomorphic Pedersen commitment, que tem uma propriedade especial: os envelopes podem ser somados e subtraídos sem serem abertos. A rede soma todos os commitments de input, subtrai todos os commitments de output e compara o resultado com a única figura líquida declarada pela transação, o seu campo valueBalance. Só uma transação cujos montantes ocultos correspondam genuinamente a esse valueBalance público consegue produzir uma binding signature válida sobre os commitments combinados. Se alguém tentasse mover mais valor do que aquele que declarou, os commitments não bateriam certo, a binding signature não seria verificada e a transação seria rejeitada. Ironwood usa o mesmo protocolo de Orchard, por isso funciona da mesma forma.

É também isto que torna segura a verificação de uma transferência entre pools. Quando os fundos se movem de uma pool shielded para outra, por exemplo de Orchard para Ironwood, a transação não consegue esconder os montantes da contabilidade. Cada pool tem o seu próprio value balance que tem de ser satisfeito pelas suas próprias proofs: o lado de Orchard tem de mostrar uma saída correspondente através da sua binding signature, e o lado de Ironwood tem de mostrar a entrada correspondente através da sua. O valor que sai de uma pool e o valor que entra na outra são ambos provados de forma independente, pelo que um movimento entre pools é, na verdade, duas passagens pelo torniquete a acontecerem numa única transação, uma saída e uma entrada, e ambas são contabilizadas publicamente embora os montantes subjacentes permaneçam privados.

Portanto, o torniquete não é confiança. Cada transação prova matematicamente o seu próprio efeito líquido, a rede soma esses efeitos líquidos provados por pool, e uma regra de consenso (ZIP 209) rejeita qualquer bloco que faça o saldo de uma pool ficar negativo. Prova ao nível da transação, aplicação ao nível da cadeia.

<br/>

## Porque é importante

O torniquete dá à Zcash três coisas ao mesmo tempo.

Em primeiro lugar, compartimenta o risco. Um bug criptográfico numa pool fica contido nessa pool, porque o torniquete impede que valor falsificado atravesse para a oferta em geral.

Em segundo lugar, permite à comunidade verificar a oferta retrospetivamente. Se um bug for descoberto mais tarde, o registo do torniquete mostra se alguma vez saiu mais valor de uma pool do que aquele que nela entrou. Um registo limpo é uma forte evidência de que não houve exploração de falsificação.

Em terceiro lugar, preserva a privacidade ao fazer tudo isto. Apenas os totais ao nível da pool são públicos. As suas transações individuais permanecem shielded. A auditabilidade e a privacidade coexistem, o que é invulgar e uma das forças discretas da Zcash.

<br/>

## O torniquete em ação

O torniquete não é novo, e já foi usado em momentos-chave da história da Zcash.

Quando a Zcash passou da pool Sprout original para a mais recente pool Sapling, o torniquete protegeu a transição. Mais tarde, a pool Sprout foi restringida para não poder receber novos influxos, o que incentivou os utilizadores a migrar enquanto o torniquete mantinha a contabilidade honesta. Anos depois, o facto de nunca ter saído valor de Sprout de forma indevida constitui evidência de que a sua criptografia inicial nunca foi explorada com sucesso.

O mesmo design protege agora a passagem de Orchard para Ironwood. Em 2026 foi encontrado e corrigido um bug de soundness no sistema de proving de Orchard. Não há qualquer evidência de que tenha sido explorado, mas como a atividade shielded é privada, a certeza era impossível. A resposta é selar a antiga pool Orchard e fazer com que todos migrem os seus fundos através do torniquete para Ironwood, uma pool nova que usa o protocolo corrigido. Forçar os fundos a passar pelo torniquete significa que quaisquer moedas falsificadas hipotéticas deixadas para trás não podem seguir o mesmo caminho, e quando a migração estiver concluída qualquer pessoa poderá confirmar que a oferta shielded é sólida.

<br/>

## Descontinuação de pools num só sentido

O torniquete torna possível retirar uma pool antiga de forma segura, apenas num sentido, sem nunca quebrar a garantia sobre a oferta. O truque é fechar a entrada enquanto se deixa a saída aberta.

Sprout é o exemplo mais claro. Para a descontinuar, o ZIP 211 acrescentou uma única regra de consenso: a partir da sua altura de ativação, o campo vpub_old de cada JoinSplit tem de ser zero. Como vpub_old é a única forma de valor entrar em Sprout, forçá-lo a zero significa que nunca mais poderá entrar novo valor, enquanto o valor ainda pode sair para o lado transparente ou seguir para Sapling. A pool tornou-se de sentido único. Só pode esvaziar, nunca encher. O torniquete continua a contar durante todo o processo, por isso o saldo pode descer à medida que os fundos saem, mas nunca pode subir, e nunca pode ficar negativo.

A migração de Orchard para Ironwood usa a mesma ideia. Na atualização NU6.3, a pool Orchard é fechada a novos influxos, e as wallets são orientadas para enviar os fundos de Orchard através do torniquete para a nova pool Ironwood. Orchard torna-se uma pool de sentido único que só pode esvaziar. Como cada saída é uma passagem pelo torniquete que tem de ser provada, qualquer valor falsificado hipotético deixado em Orchard não pode seguir discretamente os fundos honestos para fora. Fica preso numa pool que apenas drena e que é vigiada à porta. Com o tempo, isto empurra a antiga pool para o vazio e permite que qualquer pessoa confirme que o valor que saiu nunca foi superior ao valor que honestamente entrou.

Esta é a razão mais profunda pela qual o torniquete importa para além da simples contabilidade. É o mecanismo que permite à Zcash descontinuar uma pool shielded, quer para reduzir complexidade, como aconteceu com Sprout, quer para recuperar de um bug descoberto, como no caso de Orchard, mantendo ao mesmo tempo uma garantia contínua, pública e comprovável sobre a oferta.

<br/>

## Equívocos comuns

- O torniquete não revela as suas transações. Apenas contabiliza os totais das pools, não quem enviou o quê a quem
- Não identifica um falsificador pelo nome. Limita quanto pode sair de uma pool, e é isso que protege a oferta
- Não é uma invenção nova para Ironwood. Protegeu todas as grandes transições entre pools shielded na história da Zcash
- Um total público de pool não enfraquece a privacidade. A privacidade está nas transações dentro da pool, que permanecem ocultas

<br/>

## Recursos

1. [ZIP 209: Proibir saldos de pools de valor da cadeia fora do intervalo](https://zips.z.cash/zip-0209) - a regra de consenso por detrás do torniquete
2. [ZIP 211: Desativar a adição de novo valor à pool de valor da cadeia Sprout](https://zips.z.cash/zip-0211) - como a pool Sprout foi fechada a novos depósitos
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - a atualização que introduz a pool Ironwood e direciona o valor através do torniquete
4. [Aplicação do torniquete contra a falsificação](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - a explicação original da Electric Coin Company
5. [Especificação do Protocolo Zcash](https://zips.z.cash/protocol/protocol.pdf) - veja as secções sobre saldo e binding signature para todos os detalhes
6. [Value Pools, o Livro do Zebra](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - como um node acompanha o value balance de cada pool

<br/>

## Páginas relacionadas

- [Pools Shielded](https://zechub.wiki/using-zcash/shielded-pools) - como as transações shielded da Zcash mantêm os detalhes privados
- [Halo](https://zechub.wiki/zcash-tech/halo) - o sistema de proof por detrás da pool Orchard
- [Atualizações de Rede](https://zechub.wiki/start-here/network-upgrades) - como a Zcash ativa alterações como novas pools shielded
