<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash foi lançado em 28 de outubro de 2016, com o pool blindado Sprout.

> **Aviso:** NU7 foi ativado na mainnet na altura 3.543.405 em 6 de novembro de 2026 (UTC; veja [ZIP 259](https://zips.z.cash/zip-0259)). Desde então, ZEC que ainda está no pool Sprout não pode ser gasto, porque as transações da versão 4 não são mais válidas (ZIP 2003). Para entender o contexto das opções de recuperação, leia [Recuperando fundos](../using-zcash/recovering-funds).

O que você vai aprender: Sprout é onde Zcash começou, a primeira vez que um dinheiro privado e verificável funcionou em uma blockchain ativa.

Sprout é o lançamento original da rede Zcash, e não uma [atualização da rede](../start-here/network-upgrades) posterior. Ele entrou no ar no bloco gênese em 28 de outubro de 2016. Nenhum ZIP numerado define Sprout: o processo de ZIP começou mais tarde com Overwinter, então Sprout é descrito pela Especificação do Protocolo Zcash original e pela construção Zerocash na qual foi baseado. A [Electric Coin Company](../zcash-organizations/electric-coin-company) (na época, a Zerocoin Electric Coin Company), liderada por Zooko Wilcox, o construiu e lançou. Sprout introduziu as primeiras transações blindadas zk-SNARK práticas e o pool blindado original, para que as pessoas pudessem enviar ZEC com o remetente, o destinatário e o valor ocultos, enquanto a rede ainda verificava se os saldos fechavam. O nome indicava uma chain jovem, em brotamento, que a equipe esperava que crescesse.

Por que isso importa. Todas as blockchains públicas antes de Sprout deixavam seus pagamentos à mostra: qualquer pessoa podia ver quem pagou a quem e quanto. Sprout foi a primeira rede ativa e sem permissão a ocultar esses detalhes e ainda assim provar que ninguém estava trapaceando. Isso importa para a privacidade financeira comum, aquela que você espera do dinheiro em espécie ou de um extrato bancário que ninguém mais pode ler. Também provou que uma privacidade on-chain forte podia funcionar na prática, para além de um projeto no papel. A Cerimônia de configuração confiável que tornou isso possível se tornou uma referência para trabalhos posteriores de criptografia, e o sistema de provas lento e pesado em memória com o qual Sprout foi lançado é exatamente o que levou a equipe a construir o Sapling dois anos depois.

## Primeiro pool blindado

Sprout criou dois tipos de endereços. Os endereços transparentes (t-addresses) funcionam como no Bitcoin, com os detalhes visíveis no registro público. Os endereços blindados (z-addresses) enviam fundos para o [pool blindado](../using-zcash/shielded-pools) Sprout, onde o remetente, o destinatário e o valor permanecem ocultos. O truque são as [zk-SNARKs](../zcash-tech/zk-snarks), provas de conhecimento zero que permitem que uma transação mostre que é válida, sem gasto duplo e com saldos que fecham, sem revelar nenhum dos detalhes. Sprout foi a primeira vez que isso funcionou em produção em uma criptomoeda ativa.

![Transações transparentes expõem remetente, destinatário e valor, enquanto as transações blindadas do Sprout ocultam todos esses dados e continuam verificáveis](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## A Cerimônia

As zk-SNARKs no Sprout precisavam de um conjunto de parâmetros públicos, e gerá-los com segurança exigia uma configuração única chamada Cerimônia. Seis participantes, em locais separados e distantes, geraram cada um uma parte secreta, chamada de resíduo tóxico. Se alguém algum dia juntasse todas as partes, poderia falsificar ZEC do nada. O projeto transformou esse risco em uma regra simples: desde que pelo menos um participante destruísse sua parte, o segredo completo nunca poderia ser reconstruído, e a falsificação continuaria impossível. Entre os participantes nomeados publicamente estão Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd e Derek Hinch, do NCC Group. Um participante optou por permanecer anônimo.

![A Cerimônia: seis participantes geram fragmentos privados e depois destroem o resíduo tóxico, restando apenas os parâmetros públicos do Sprout](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## A origem

Sprout é a base sobre a qual todas as mudanças posteriores são construídas. Quando o mecanismo de atualização da rede chegou com o Overwinter, ele rotulou as regras originais como consensus branch id 0, o que simplesmente significa que nenhuma atualização foi aplicada ainda. Tudo desde então (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6 e assim por diante) está sobre a chain que Sprout iniciou. O lançamento foi anunciado em agosto de 2016 para uma gênese em 28 de outubro, a Cerimônia ocorreu nas semanas anteriores, e o timestamp fixo no código do bloco gênese indica 28 de outubro de 2016, às 07:56 UTC.

![Linha do tempo do anúncio em agosto de 2016, passando pela Cerimônia de parâmetros, até o lançamento do Sprout em 28 de outubro de 2016](/content-images/sprout-timeline-348766352a.webp)

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| zk-SNARK | Uma prova de conhecimento zero que mostra que uma transação é válida sem revelar o remetente, o destinatário ou o valor |
| Shielded pool | O lado privado do Zcash, onde valores e partes ficam ocultos. O pool Sprout foi o primeiro |
| z-address and t-address | Um z-address é blindado e mantém os detalhes privados. Um t-address é transparente e mostra os detalhes no registro público |
| The Ceremony | A configuração multipartidária de 2016 que gerou os parâmetros públicos do Sprout e depois descartou o resíduo tóxico |
| Toxic waste | As partes secretas de chave da Cerimônia que precisavam ser destruídas para que ZEC não pudesse ser falsificado |
| Consensus branch id 0 | O rótulo para as regras do Sprout, que significa a base antes de qualquer atualização da rede |

## Perguntas frequentes

O Sprout muda meu ZEC ou minha privacidade hoje? Não. Sprout é história, o lançamento que iniciou a chain onde o seu ZEC está. Suas moedas e sua privacidade hoje dependem da carteira e do pool blindado que você usa agora, e não de algo que você precise fazer em relação ao Sprout.

Por que não existe um número de ZIP para o Sprout? O processo de ZIP começou mais tarde, com a atualização Overwinter. Sprout é o lançamento original, descrito pela Especificação do Protocolo Zcash e pela construção Zerocash na qual foi baseado. O ZIP 200 só menciona o Sprout em retrospecto, como consensus branch id 0, a base antes de qualquer atualização.

Eu precisava confiar nas seis pessoas da Cerimônia? A configuração foi construída para que bastasse que uma delas fosse honesta. Cada uma tinha uma parte secreta e, desde que um único participante destruísse a sua, o segredo completo nunca poderia ser reconstruído e ninguém poderia falsificar ZEC. Cinco participantes foram nomeados publicamente e um permaneceu anônimo.

O pool Sprout é o que minha carteira usa agora? Provavelmente não. Sprout foi o primeiro pool blindado, mas atualizações posteriores, como o Sapling, introduziram um design blindado mais rápido, e a maioria das carteiras usa pools mais novos hoje. Sprout ainda importa como o trabalho que provou que transações privadas e verificáveis podiam funcionar em uma rede ativa.

O que tornou o Sprout diferente do Bitcoin? O Bitcoin coloca cada pagamento em um registro público, onde valores e endereços são visíveis. Sprout adicionou transações blindadas que ocultam o remetente, o destinatário e o valor, ao mesmo tempo que permitem que a rede confirme que a transação é válida. Ele também manteve os endereços transparentes, então os dois estilos convivem na mesma chain.

## Teste seu entendimento

Sprout é frequentemente chamado de atualização da rede com uma altura de ativação. Por que isso não está bem correto?

<details>
<summary>Resposta</summary>

Sprout é o lançamento original do Zcash, e não uma atualização posterior. Ele está ativo desde o bloco gênese (bloco 0) em 28 de outubro de 2016, então não há uma altura de ativação a indicar. O mecanismo de atualização da rede veio depois e rotulou as regras do Sprout como consensus branch id 0, a base antes de qualquer atualização.
</details>

### Recursos

[ZIP 200: Mecanismo de atualização da rede](https://zips.z.cash/zip-0200)

[Atualizações da rede do Zcash](https://z.cash/upgrade/)

[Electric Coin Company: lançamento do Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: O design da Cerimônia](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Veja também

[Pools blindados](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Série: [Índice de atualizações da rede](../start-here/network-upgrades) · Próximo: [Overwinter](../zcash-tech/overwinter)
