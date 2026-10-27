<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling entrou em funcionamento na mainnet do Zcash no bloco 419.200 (29 de outubro de 2018, 02:15 UTC).

O que você aprenderá: Sapling tornou os pagamentos privados com Zcash rápidos e leves o suficiente para funcionar em um celular ou em uma carteira de hardware.

Sapling foi a segunda grande atualização da rede do Zcash, ativada no segundo aniversário do Zcash. Foi um hard fork de consenso que reconstruiu a forma como as transações blindadas (privadas) são montadas. A implementação é definida pela ZIP 205, as novas regras de assinatura de transações pela ZIP 243, e ambas se baseiam na ZIP 200, o mecanismo de atualização da rede. Todos os detalhes estão na Especificação do Protocolo Zcash. A Electric Coin Company desenvolveu a atualização e lançou a primeira versão com suporte a ela, zcashd 2.0.0, em agosto de 2018. On-chain, a rede identifica as regras de Sapling pelo seu consensus branch id.

Por que isso importa. Antes de Sapling, fazer um pagamento verdadeiramente privado significava esperar minutos enquanto seu computador processava gigabytes de memória para construir a prova. Isso era lento e pesado demais para a maioria das pessoas, por isso muitos usuários, corretoras e lojas evitavam as transações blindadas e enviavam ZEC abertamente. Sapling reduziu esse trabalho para alguns segundos e cerca de 40 megabytes de memória. Essa única mudança tornou o uso de ZEC blindado prático no dia a dia, em celulares comuns e em carteiras de hardware.

## O que mudou

O coração de Sapling é uma forma mais rápida de construir a prova de conhecimento zero que mantém uma transação blindada privada. O design original de Sprout usava um único circuito de prova (o circuito JoinSplit), que era lento e consumia muita memória. Sapling o substituiu por dois circuitos desenvolvidos para essa finalidade, um circuito Spend e um circuito Output, descritos na Especificação do Protocolo Zcash. O resultado é uma grande redução de custo. Segundo a Electric Coin Company, uma transação blindada pode ser construída em apenas alguns segundos usando cerca de 40 megabytes de memória. A referência pré-Sapling de Sprout era muito mais pesada, na ordem de minutos e vários gigabytes de memória (esses valores de Sprout são a referência aproximada amplamente citada).

![Custo de transação blindada: Sprout versus Sapling](/content-images/sapling-before-after-a045b0b48f.webp)

## Novas chaves

Sapling também introduziu um novo conjunto de endereços e chaves blindados. Uma chave pode derivar muitos endereços diversificados, que são endereços de pagamento separados que um observador externo não consegue vincular entre si. Sapling também adicionou chaves de visualização: uma chave de visualização completa ou de entrada permite que você compartilhe a capacidade de ver os detalhes das transações de uma carteira sem conceder a capacidade de gastar seus fundos. Isso é útil para auditoria, contabilidade ou simplesmente para provar que um pagamento foi feito.

Uma mudança relacionada é que Sapling separou a tarefa de construir a prova da tarefa de assinar a transação. O dispositivo que constrói a prova de conhecimento zero não precisa mais ser o dispositivo que detém a autoridade de gasto. Esse desacoplamento permite que uma carteira de hardware mantenha sua chave de gastos isolada enquanto um dispositivo separado faz o trabalho de prova mais pesado.

![O dispositivo de prova entrega a prova a um dispositivo de assinatura separado](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## A configuração confiável

Os circuitos de Sapling dependem de um conjunto de parâmetros públicos que precisou ser gerado com cuidado. Se uma única parte os tivesse produzido sozinha e mantido os dados secretos restantes (o "toxic waste"), essa parte poderia ter forjado provas. Para evitar isso, os parâmetros vieram de uma cerimônia de múltiplas partes em duas fases. A Fase 1, chamada Powers of Tau, era independente de circuitos, o que significa que não estava vinculada aos circuitos específicos de Sapling. A Fase 2, a Sapling MPC, era específica de circuito. Cada fase permanece segura desde que pelo menos um participante tenha sido honesto e destruído seu toxic waste, portanto a cerimônia só falha se todos os participantes conspirarem entre si.

## Como foi ativado

Sapling veio depois de Overwinter, a atualização de junho de 2018 que preparou o mecanismo de atualização da rede. A Electric Coin Company definiu a altura de ativação da mainnet em zcashd 2.0.0, lançado em agosto de 2018, e a rede mudou para as regras de Sapling quando o bloco 419.200 foi minerado. On-chain, esse momento é marcado pelo consensus branch id de Sapling.

![Linha do tempo desde o lançamento do Zcash até a ativação de Sapling](/content-images/sapling-timeline-6cad184c30.webp)

## Glossário

| Term | Significado em linguagem simples |
|---|---|
| Shielded transaction | Uma transação privada do Zcash que oculta o remetente, o destinatário e o valor. |
| Sprout | O protocolo blindado original com o qual o Zcash foi lançado, mais lento e pesado que Sapling. |
| Spend and Output circuits | Os dois novos circuitos de prova de Sapling que substituíram o único circuito JoinSplit de Sprout. |
| Diversified address | Um dos muitos endereços de pagamento não vinculáveis que você pode derivar de uma única chave. |
| Viewing Key | Uma chave que permite a alguém ver as transações de uma carteira sem poder gastar seus fundos. |
| Consensus branch id | Um código curto que informa à rede quais regras de atualização uma transação segue. |

## FAQ

Sapling alterou a quantidade de ZEC que eu possuo? Não. Sapling alterou a forma como as transações blindadas são construídas, não a quantidade de ZEC que alguém possui nem a oferta total. Seu saldo não foi afetado.

Meu ZEC continua privado depois de Sapling? Sim, e está mais fácil de usar. Sapling manteve a forte privacidade das transações blindadas e as tornou rápidas e baratas o suficiente para serem realmente usadas. Os fundos blindados permanecem ocultos da mesma forma.

Preciso fazer alguma coisa? Nenhuma ação é necessária da sua parte como titular. Sapling foi uma atualização da rede adotada pelos softwares de carteiras e nós. As carteiras modernas já oferecem suporte a endereços Sapling.

Qual é a diferença entre Sprout e Sapling? Sprout foi o primeiro protocolo blindado e usava um único circuito de prova lento e que consumia muita memória. Sapling o substituiu por circuitos Spend e Output mais rápidos, adicionou chaves de visualização e endereços diversificados, e tornou as transações blindadas leves o suficiente para celulares e carteiras de hardware.

Por que algumas fontes dizem 28 de outubro e outras 29 de outubro? A altura de ativação foi definida com antecedência para atingir 28 de outubro de 2018. O bloco que realmente desencadeou a mudança, o bloco 419.200, foi minerado nas primeiras horas de 29 de outubro UTC. Em muitos fusos horários locais, ainda era 28 de outubro. É o mesmo bloco e o mesmo momento em ambos os casos.

O que é uma chave de visualização? Uma chave de visualização permite que você compartilhe acesso de leitura a uma carteira blindada. Alguém com uma chave de visualização completa ou de entrada pode ver os detalhes das transações da carteira, mas não pode gastar seus fundos. Veja [Chaves de visualização](../zcash-tech/viewing-keys) para saber mais.

## Teste sua compreensão

No Sprout, por que tantas pessoas evitavam as transações blindadas, e como Sapling resolveu isso?

<details>
<summary>Resposta</summary>
No Sprout, construir uma transação blindada levava minutos e usava gigabytes de memória, por isso era lento e pesado demais para a maioria dos usuários, corretoras e lojas. Sapling introduziu circuitos Spend e Output mais rápidos que reduziram o trabalho para alguns segundos e cerca de 40 megabytes, tornando as transações blindadas práticas em celulares do dia a dia e carteiras de hardware.
</details>

### Recursos

- [ZIP 205: Implementação da atualização da rede Sapling](https://zips.z.cash/zip-0205)
- [ZIP 243: Validação de assinatura de transação para Sapling](https://zips.z.cash/zip-0243)
- [Página de atualização do Zcash Sapling](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: anúncio do Sapling](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Announcing the Sapling MPC](https://electriccoin.co/blog/sapling-mpc/)

### Ver também

- [Pools blindados](../using-zcash/shielded-pools)
- [Chaves de visualização](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Atualizações da rede do Zcash](../start-here/network-upgrades)
- [Carteiras](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Série: [Índice de atualizações da rede](../start-here/network-upgrades) · Anterior: [Overwinter](../zcash-tech/overwinter) · Próximo: [Blossom](../zcash-tech/blossom)
