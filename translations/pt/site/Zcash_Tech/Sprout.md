<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> O Zcash foi lançado em 28 de outubro de 2016, com o pool blindado Sprout.

> **Aviso:** NU7 torna os ZEC ainda no pool Sprout impossíveis de gastar assim que for ativada (altura de ativação da mainnet 3.543.405, prevista para 5 de novembro de 2026; consulte [ZIP 259](https://zips.z.cash/zip-0259)). Se você tiver fundos no Sprout, leia [Recuperar fundos](../using-zcash/recovering-funds) e migre-os primeiro.

O que você aprenderá: Sprout é onde o Zcash começou, a primeira vez que dinheiro privado e verificável funcionou em uma blockchain ativa.

Sprout é o lançamento original da rede Zcash, não uma [atualização da rede](../start-here/network-upgrades) posterior. Entrou em funcionamento no bloco gênese, em 28 de outubro de 2016. Nenhum ZIP numerado define Sprout: o processo ZIP começou mais tarde com Overwinter, por isso Sprout é descrito pela especificação original do protocolo Zcash e pela construção Zerocash em que se baseou. A [Electric Coin Company](../zcash-organizations/electric-coin-company) (então chamada Zerocoin Electric Coin Company), liderada por Zooko Wilcox, construiu-o e o lançou. Sprout introduziu as primeiras transações blindadas zk-SNARK práticas e o pool blindado original, para que as pessoas pudessem enviar ZEC com o remetente, o destinatário e o valor ocultos, enquanto a rede continuava verificando que os saldos correspondiam. O nome sinalizava uma chain jovem, que estava brotando e que a equipe esperava ver crescer.

Por que isso importa. Todas as blockchains públicas antes de Sprout expunham seus pagamentos: qualquer pessoa podia ver quem pagou a quem e quanto. Sprout foi a primeira rede ativa e sem permissão a ocultar esses detalhes e, ainda assim, provar que ninguém estava trapaceando. Isso importa para a privacidade financeira comum, do tipo que você espera de dinheiro em espécie ou de um extrato bancário que ninguém mais consegue ler. Também provou que uma forte privacidade on-chain podia funcionar na prática, além de um projeto no papel. A Ceremony de configuração confiável que tornou isso possível tornou-se um ponto de referência para trabalhos criptográficos posteriores, e o sistema de provas lento e que exigia muita memória com o qual Sprout foi lançado é precisamente o que levou a equipe a criar Sapling dois anos depois.

## Primeiro pool blindado

Sprout criou dois tipos de endereços. Os endereços transparentes (t-addresses) funcionam como no Bitcoin, com os detalhes visíveis no registro público. Os endereços blindados (z-addresses) enviam fundos para o [pool blindado](../using-zcash/shielded-pools) de Sprout, onde o remetente, o destinatário e o valor permanecem ocultos. O truque são os [zk-SNARKs](../zcash-tech/zk-snarks), provas de conhecimento zero que permitem que uma transação mostre que é válida, sem gasto duplo e com saldos correspondentes, sem revelar nenhum dos detalhes. Sprout foi a primeira vez que isso funcionou em produção em uma criptomoeda ativa.

![As transações transparentes expõem remetente, destinatário e valor, enquanto as transações blindadas de Sprout ocultam os três e continuam verificáveis](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## A Ceremony

Os zk-SNARKs em Sprout precisavam de um conjunto de parâmetros públicos, e gerá-los com segurança exigiu uma configuração única chamada Ceremony. Seis participantes, em locais separados e distantes, geraram cada um uma parte secreta, chamada toxic waste. Se alguém alguma vez reunisse todas as partes, poderia forjar ZEC do nada. O projeto transformou esse risco em uma regra simples: desde que pelo menos um participante destruísse sua parte, o segredo completo nunca poderia ser reconstruído, portanto a falsificação permaneceria impossível. Os participantes cujos nomes foram divulgados publicamente incluem Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd e Derek Hinch da NCC Group. Um participante escolheu permanecer anônimo.

![A Ceremony: seis participantes geram fragmentos privados e depois destroem o toxic waste, deixando apenas os parâmetros públicos de Sprout](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## A origem

Sprout é a base sobre a qual todas as alterações posteriores se apoiam. Quando o mecanismo de atualização da rede chegou com Overwinter, passou a identificar as regras originais como consensus branch id 0, o que significa simplesmente que ainda não foi aplicada nenhuma atualização. Tudo o que veio depois (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6 e seguintes) se apoia na chain que Sprout iniciou. O lançamento foi anunciado em agosto de 2016 para um gênese em 28 de outubro, a Ceremony ocorreu nas semanas anteriores, e o timestamp codificado no bloco gênese indica 28 de outubro de 2016, às 07:56 UTC.

![Linha do tempo desde o anúncio de agosto de 2016, passando pela Ceremony dos parâmetros, até o lançamento de Sprout em 28 de outubro de 2016](/content-images/sprout-timeline-348766352a.webp)

## Glossário

| Term | Significado em linguagem simples |
|---|---|
| zk-SNARK | Uma prova de conhecimento zero que mostra que uma transação é válida sem revelar o remetente, o destinatário ou o valor |
| Shielded pool | O lado privado do Zcash, onde os valores e as partes ficam ocultos. O pool Sprout foi o primeiro |
| z-address and t-address | Um z-address é blindado e mantém os detalhes privados. Um t-address é transparente e mostra os detalhes no registro público |
| The Ceremony | A configuração multipartidária de 2016 que gerou os parâmetros públicos de Sprout e depois descartou o toxic waste |
| Toxic waste | As partes da chave secreta da Ceremony que tiveram de ser destruídas para que não fosse possível forjar ZEC |
| Consensus branch id 0 | A designação das regras de Sprout, que significa a base antes de qualquer atualização da rede |

## FAQ

Sprout altera meu ZEC ou minha privacidade hoje? Não. Sprout é história, o lançamento que iniciou a chain em que seu ZEC existe. Suas moedas e sua privacidade hoje dependem da carteira e do pool blindado que você usa agora, não de algo que você precise fazer em relação a Sprout.

Por que não existe um número ZIP para Sprout? O processo ZIP começou mais tarde, com a atualização Overwinter. Sprout é o lançamento original, descrito pela especificação do protocolo Zcash e pela construção Zerocash em que se baseou. O ZIP 200 só menciona Sprout retrospectivamente, como consensus branch id 0, a base anterior a qualquer atualização.

Eu precisava confiar nas seis pessoas da Ceremony? A configuração foi concebida para que você precisasse apenas de uma delas agindo honestamente. Cada uma detinha uma parte secreta, e desde que um único participante destruísse a sua, o segredo completo nunca poderia ser reconstruído e ninguém poderia forjar ZEC. Cinco participantes foram identificados publicamente e um permaneceu anônimo.

O pool Sprout é aquele que minha carteira usa agora? Provavelmente não. Sprout foi o primeiro pool blindado, mas atualizações posteriores como Sapling introduziram um projeto blindado mais rápido, e a maioria das carteiras usa pools mais recentes hoje. Sprout continua sendo importante como o trabalho que provou que transações privadas e verificáveis podiam funcionar em uma rede ativa.

O que tornava Sprout diferente do Bitcoin? O Bitcoin coloca todos os pagamentos em um registro público onde os valores e os endereços são visíveis. Sprout acrescentou transações blindadas que ocultam o remetente, o destinatário e o valor, ao mesmo tempo que permitem que a rede confirme que a transação é válida. Também manteve os endereços transparentes, por isso ambos os estilos coexistem na mesma chain.

## Teste sua compreensão

Sprout é muitas vezes descrito como uma atualização da rede com uma altura de ativação. Por que isso não está totalmente certo?

<details>
<summary>Resposta</summary>

Sprout é o lançamento original do Zcash, não uma atualização posterior. Está ativo desde o bloco gênese (bloco 0) em 28 de outubro de 2016, por isso não existe uma altura de ativação para apontar. O mecanismo de atualização da rede surgiu mais tarde e identificou as regras de Sprout como consensus branch id 0, a base anterior a qualquer atualização.
</details>

### Recursos

[ZIP 200: Mecanismo de atualização da rede](https://zips.z.cash/zip-0200)

[Atualizações da rede Zcash](https://z.cash/upgrade/)

[Electric Coin Company: lançamento do Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: The Design of the Ceremony](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Ver também

[Pools blindados](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Atualizações da rede Zcash](../start-here/network-upgrades)

[O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Série: [índice de atualizações da rede](../start-here/network-upgrades) · Próximo: [Overwinter](../zcash-tech/overwinter)
