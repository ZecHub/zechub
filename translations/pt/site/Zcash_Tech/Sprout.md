---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash foi lançada em 28 de outubro de 2016, com o pool blindado Sprout.

O que vais retirar daqui: Sprout é onde Zcash começou, a primeira vez que dinheiro privado e verificável funcionou numa blockchain ativa.

Sprout é o lançamento original da rede Zcash, não uma [atualização de rede](../start-here/network-upgrades) posterior. Entrou em funcionamento no bloco génese, em 28 de outubro de 2016. Nenhum ZIP numerado define Sprout: o processo ZIP começou mais tarde com Overwinter, por isso Sprout é descrito pela especificação original do protocolo Zcash e pela construção Zerocash em que se baseou. A [Electric Coin Company](../zcash-organizations/electric-coin-company) (então chamada Zerocoin Electric Coin Company), liderada por Zooko Wilcox, construiu-a e lançou-a. Sprout introduziu as primeiras transações blindadas zk-SNARK práticas e o pool blindado original, para que as pessoas pudessem enviar ZEC com o remetente, o destinatário e o montante ocultos, enquanto a rede continuava a verificar que os saldos batiam certo. O nome sinalizava uma cadeia jovem, a despontar, que a equipa esperava ver crescer.

Porque isto importa. Todas as blockchains públicas antes de Sprout expunham os teus pagamentos: qualquer pessoa podia ver quem pagou a quem e quanto. Sprout foi a primeira rede ativa e sem permissões a ocultar esses detalhes e, ainda assim, a provar que ninguém estava a fazer batota. Isto importa para a privacidade financeira comum, do tipo que esperas de dinheiro físico ou de um extrato bancário que mais ninguém consegue ler. Também provou que uma forte privacidade on-chain podia funcionar na prática, para além de um desenho em papel. A Ceremony de trusted setup que o tornou possível tornou-se um ponto de referência para trabalhos criptográficos posteriores, e o sistema de prova lento e pesado em memória com que Sprout foi lançado é precisamente o que levou a equipa a criar Sapling dois anos depois.

## Primeiro pool blindado

Sprout criou dois tipos de endereços. Os endereços transparentes (t-addresses) funcionam como no Bitcoin, com os detalhes visíveis no registo público. Os endereços blindados (z-addresses) enviam fundos para o [pool blindado](../using-zcash/shielded-pools) de Sprout, onde o remetente, o destinatário e o montante permanecem ocultos. O truque são os [zk-SNARKs](../zcash-tech/zk-snarks), provas de conhecimento zero que permitem a uma transação mostrar que é válida, sem gasto duplo e com saldos que batem certo, sem revelar nenhum dos detalhes. Sprout foi a primeira vez que isto funcionou em produção numa criptomoeda ativa.

![As transações transparentes expõem remetente, destinatário e montante, enquanto as transações blindadas de Sprout ocultam os três e continuam a ser verificáveis](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## A Ceremony

Os zk-SNARKs em Sprout precisavam de um conjunto de parâmetros públicos, e gerá-los em segurança exigiu uma configuração única chamada Ceremony. Seis participantes, em locais separados e distantes, geraram cada um uma parte secreta, chamada toxic waste. Se alguém alguma vez reunisse todas as partes, poderia forjar ZEC do nada. O desenho transformou esse risco numa regra simples: desde que pelo menos um participante destruísse a sua parte, o segredo completo nunca poderia ser reconstruído, pelo que a falsificação permaneceria impossível. Os participantes cujos nomes foram divulgados publicamente incluem Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd e Derek Hinch da NCC Group. Um participante escolheu manter-se anónimo.

![A Ceremony: seis participantes geram fragmentos privados e depois destroem o toxic waste, deixando apenas os parâmetros públicos de Sprout](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## A origem

Sprout é a base sobre a qual todas as alterações posteriores assentam. Quando o mecanismo de atualização de rede chegou com Overwinter, passou a identificar as regras originais como consensus branch id 0, o que significa simplesmente que ainda não foi aplicada nenhuma atualização. Tudo o que veio depois (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6 e seguintes) assenta na cadeia que Sprout iniciou. O lançamento foi anunciado em agosto de 2016 para um génese a 28 de outubro, a Ceremony decorreu nas semanas anteriores, e o timestamp codificado no bloco génese indica 28 de outubro de 2016, às 07:56 UTC.

![Linha temporal desde o anúncio de agosto de 2016, passando pela Ceremony dos parâmetros, até ao lançamento de Sprout em 28 de outubro de 2016](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| zk-SNARK | Uma prova de conhecimento zero que mostra que uma transação é válida sem revelar o remetente, o destinatário ou o montante |
| Pool blindado | O lado privado de Zcash, onde os montantes e as partes ficam ocultos. O pool Sprout foi o primeiro |
| z-address e t-address | Um z-address é blindado e mantém os detalhes privados. Um t-address é transparente e mostra os detalhes no registo público |
| The Ceremony | A configuração multipartidária de 2016 que gerou os parâmetros públicos de Sprout e depois descartou o toxic waste |
| Toxic waste | As partes da chave secreta da Ceremony que tiveram de ser destruídas para que não fosse possível forjar ZEC |
| Consensus branch id 0 | A designação das regras de Sprout, que significa a base antes de qualquer atualização de rede |

## FAQ

Sprout altera o meu ZEC ou a minha privacidade hoje? Não. Sprout é história, o lançamento que iniciou a cadeia em que o teu ZEC existe. As tuas moedas e a tua privacidade hoje dependem da wallet e do pool blindado que usas agora, não de algo que precises de fazer em relação a Sprout.

Porque não existe um número ZIP para Sprout? O processo ZIP começou mais tarde, com a atualização Overwinter. Sprout é o lançamento original, descrito pela especificação do protocolo Zcash e pela construção Zerocash em que se baseou. O ZIP 200 só menciona Sprout retrospetivamente, como consensus branch id 0, a base anterior a qualquer atualização.

Precisava de confiar nas seis pessoas da Ceremony? A configuração foi concebida para que só precisasses de uma delas a agir honestamente. Cada uma detinha uma parte secreta, e desde que um único participante destruísse a sua, o segredo completo nunca poderia ser reconstruído e ninguém poderia forjar ZEC. Cinco participantes foram identificados publicamente e um permaneceu anónimo.

O pool Sprout é aquele que a minha wallet usa agora? Provavelmente não. Sprout foi o primeiro pool blindado, mas atualizações posteriores como Sapling introduziram um desenho blindado mais rápido, e a maioria das wallets usa hoje pools mais recentes. Sprout continua a ser importante como o trabalho que provou que transações privadas e verificáveis podiam funcionar numa rede ativa.

O que tornava Sprout diferente do Bitcoin? O Bitcoin coloca todos os pagamentos num registo público onde os montantes e os endereços são visíveis. Sprout acrescentou transações blindadas que ocultam o remetente, o destinatário e o montante, ao mesmo tempo que permitem à rede confirmar que a transação é válida. Também manteve os endereços transparentes, por isso ambos os estilos coexistem na mesma cadeia.

## Testa a tua compreensão

Sprout é muitas vezes descrito como uma atualização de rede com uma altura de ativação. Porque é que isso não está totalmente certo?

<details>
<summary>Resposta</summary>

Sprout é o lançamento original de Zcash, não uma atualização posterior. Está ativa desde o bloco génese (bloco 0) em 28 de outubro de 2016, por isso não existe uma altura de ativação a que se possa apontar. O mecanismo de atualização de rede surgiu mais tarde e identificou as regras de Sprout como consensus branch id 0, a base anterior a qualquer atualização.
</details>

### Recursos

[ZIP 200: Mecanismo de Atualização de Rede](https://zips.z.cash/zip-0200)

[Atualizações de rede Zcash](https://z.cash/upgrade/)

[Electric Coin Company: lançamento de Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: o desenho da Ceremony](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Ver também

[Pools Blindados](../using-zcash/shielded-pools)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Atualizações de Rede Zcash](../start-here/network-upgrades)

[O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Série: [índice de Atualizações de Rede](../start-here/network-upgrades) · Seguinte: [Overwinter](../zcash-tech/overwinter)
