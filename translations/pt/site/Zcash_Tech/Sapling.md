---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling entrou em funcionamento na mainnet da Zcash no bloco 419.200 (29 de outubro de 2018, 02:15 UTC).

O que vais retirar daqui: Sapling tornou os pagamentos privados em Zcash rápidos e leves o suficiente para funcionarem num telemóvel ou numa hardware wallet.

Sapling foi a segunda grande atualização da rede Zcash, ativada no segundo aniversário da Zcash. Foi um hard fork de consenso que reconstruiu a forma como as transações shielded (privadas) são montadas. A implementação é definida pela ZIP 205, as novas regras de assinatura de transações pela ZIP 243, e ambas assentam na ZIP 200, o mecanismo de atualização da rede. Todos os detalhes estão na Especificação do Protocolo Zcash. A Electric Coin Company desenvolveu a atualização e lançou a primeira versão com suporte para a mesma, zcashd 2.0.0, em agosto de 2018. On-chain, a rede identifica as regras de Sapling pelo seu consensus branch id.

Porque isto importa. Antes de Sapling, fazer um pagamento verdadeiramente privado significava esperar minutos enquanto o teu computador processava gigabytes de memória para construir a prova. Isso era demasiado lento e pesado para a maioria das pessoas, por isso muitos utilizadores, exchanges e lojas ignoravam as transações shielded e enviavam ZEC às claras em vez disso. Sapling reduziu esse trabalho para alguns segundos e cerca de 40 megabytes de memória. Essa única mudança foi o que tornou o uso de ZEC shielded prático no dia a dia, em telemóveis comuns e em hardware wallets.

## O que mudou

O coração de Sapling é uma forma mais rápida de construir a zero-knowledge proof que mantém uma transação shielded privada. O design original de Sprout usava um único circuito de prova (o circuito JoinSplit), que era lento e consumia muita memória. Sapling substituiu-o por dois circuitos feitos para esse fim, um circuito Spend e um circuito Output, descritos na Especificação do Protocolo Zcash. O resultado é uma grande redução de custo. Segundo a Electric Coin Company, uma transação shielded pode ser construída em apenas alguns segundos usando cerca de 40 megabytes de memória. A referência de base pré-Sapling do lado de Sprout era muito mais pesada, na ordem de minutos e vários gigabytes de memória (estes valores do lado de Sprout são a referência aproximada amplamente citada).

![Custo de transação shielded: Sprout versus Sapling](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## Novas chaves

Sapling também introduziu um novo conjunto de endereços e chaves shielded. Uma chave pode derivar muitos endereços diversificados, que são endereços de pagamento separados que um observador externo não consegue associar entre si. Sapling também adicionou viewing keys: uma full viewing key ou incoming viewing key permite-te partilhar a capacidade de ver os detalhes das transações de uma wallet sem entregar a capacidade de gastar os seus fundos. Isto é útil para auditoria, contabilidade ou simplesmente para provar que um pagamento foi efetuado.

Uma alteração relacionada é que Sapling separou a tarefa de construir a prova da tarefa de assinar a transação. O dispositivo que constrói a zero-knowledge proof já não precisa de ser o dispositivo que detém a autoridade de gasto. Este desacoplamento é o que permite que uma hardware wallet mantenha a tua spending key isolada enquanto um dispositivo separado faz o trabalho de prova mais pesado.

![O dispositivo de prova entrega a prova a um dispositivo de assinatura separado](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## A trusted setup

Os circuitos de Sapling dependem de um conjunto de parâmetros públicos que teve de ser gerado com cuidado. Se uma única entidade os tivesse produzido sozinha e guardado os dados secretos remanescentes (os "toxic waste"), essa entidade poderia ter forjado provas. Para evitar isso, os parâmetros resultaram de uma cerimónia em duas fases, com múltiplas partes. A Fase 1, chamada Powers of Tau, era circuit-agnostic, o que significa que não estava ligada aos circuitos específicos de Sapling. A Fase 2, a Sapling MPC, era específica do circuito. Cada fase mantém-se segura desde que pelo menos um participante tenha sido honesto e destruído os seus toxic waste, por isso a cerimónia só falha se todos os participantes conspirarem entre si.

## Como foi ativado

Sapling veio depois de Overwinter, a atualização de junho de 2018 que preparou o mecanismo de atualização da rede. A Electric Coin Company definiu a altura de ativação da mainnet em zcashd 2.0.0, lançado em agosto de 2018, e a rede mudou para as regras de Sapling quando o bloco 419.200 foi minerado. On-chain, esse momento é assinalado pelo consensus branch id de Sapling.

![Linha temporal desde o lançamento da Zcash até à ativação de Sapling](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Transação shielded | Uma transação privada de Zcash que oculta o remetente, o destinatário e o montante. |
| Sprout | O protocolo shielded original com que a Zcash foi lançada, mais lento e pesado do que Sapling. |
| Circuitos Spend e Output | Os dois novos circuitos de prova de Sapling que substituíram o único circuito JoinSplit de Sprout. |
| Endereço diversificado | Um entre muitos endereços de pagamento não associáveis que podes derivar a partir de uma única chave. |
| Viewing key | Uma chave que permite a alguém ver as transações de uma wallet sem poder gastar a partir dela. |
| Consensus branch id | Um código curto que diz à rede quais as regras de atualização que uma transação segue. |

## FAQ

Sapling alterou a quantidade de ZEC que possuo? Não. Sapling alterou a forma como as transações shielded são construídas, não a quantidade de ZEC que qualquer pessoa detém nem a oferta total. O teu saldo não foi afetado.

O meu ZEC continua privado depois de Sapling? Sim, e mais utilizável. Sapling manteve a forte privacidade das transações shielded e tornou-as rápidas e baratas o suficiente para serem efetivamente usadas. Os fundos shielded continuam ocultos da mesma forma.

Tenho de fazer alguma coisa? Não é necessária qualquer ação da tua parte enquanto detentor. Sapling foi uma atualização da rede adotada pelo software de wallets e de nós. As wallets modernas já suportam endereços Sapling.

Qual é a diferença entre Sprout e Sapling? Sprout foi o primeiro protocolo shielded e usava um circuito de prova único, lento e pesado em memória. Sapling substituiu-o por circuitos Spend e Output mais rápidos, adicionou viewing keys e endereços diversificados, e tornou as transações shielded leves o suficiente para telemóveis e hardware wallets.

Porque é que algumas fontes dizem 28 de outubro e outras 29 de outubro? A altura de ativação foi definida com antecedência para apontar para 28 de outubro de 2018. O bloco que efetivamente desencadeou a mudança, o bloco 419.200, foi minerado nas primeiras horas de 29 de outubro UTC. Em muitos fusos horários locais isso ainda era 28 de outubro. É o mesmo bloco e o mesmo momento em ambos os casos.

O que é uma viewing key? Uma viewing key permite-te partilhar acesso de leitura a uma wallet shielded. Alguém com uma full viewing key ou incoming viewing key pode ver os detalhes das transações da wallet, mas não pode gastar os seus fundos. Vê [Viewing Keys](../zcash-tech/viewing-keys) para mais informações.

## Testa a tua compreensão

Em Sprout, porque é que tantas pessoas evitavam as transações shielded, e como é que Sapling resolveu isso?

<details>
<summary>Resposta</summary>
Em Sprout, construir uma transação shielded demorava minutos e usava gigabytes de memória, por isso era demasiado lento e pesado para a maioria dos utilizadores, exchanges e lojas. Sapling introduziu circuitos Spend e Output mais rápidos que reduziram o trabalho para alguns segundos e cerca de 40 megabytes, tornando as transações shielded práticas em telemóveis do dia a dia e hardware wallets.
</details>

### Recursos

- [ZIP 205: Implementação da Atualização de Rede Sapling](https://zips.z.cash/zip-0205)
- [ZIP 243: Validação de Assinatura de Transação para Sapling](https://zips.z.cash/zip-0243)
- [Página da atualização Zcash Sapling](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: anúncio de Sapling](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: anúncio da Sapling MPC](https://electriccoin.co/blog/sapling-mpc/)

### Ver também

- [Shielded Pools](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKS](../zcash-tech/zk-snarks)
- [Atualizações de Rede Zcash](../start-here/network-upgrades)
- [Wallets](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Série: [Índice de Atualizações de Rede](../start-here/network-upgrades) · Anterior: [Overwinter](../zcash-tech/overwinter) · Seguinte: [Blossom](../zcash-tech/blossom)
