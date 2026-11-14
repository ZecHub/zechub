<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> O Sapling entrou em operação na mainnet do Zcash no bloco 419.200 (29 de outubro de 2018, 02:15 UTC).

O que você vai aprender: o Sapling tornou os pagamentos privados em Zcash rápidos e leves o suficiente para rodar em um celular ou em uma carteira de hardware.

O Sapling foi a segunda grande atualização da rede do Zcash e foi ativado no segundo aniversário do Zcash. Foi um hard fork de consenso que reformulou a forma como as transações blindadas (privadas) são montadas. A implantação é definida pela ZIP 205, as novas regras de assinatura de transações pela ZIP 243, e ambas se baseiam na ZIP 200, o mecanismo de atualização da rede. Todos os detalhes estão na Especificação do Protocolo Zcash. Electric Coin Company desenvolveu a atualização e lançou a primeira versão com suporte a ela, o zcashd 2.0.0, em agosto de 2018. Na chain, a rede identifica as regras do Sapling pelo seu consensus branch id.

Por que isso importa. Antes do Sapling, fazer um pagamento realmente privado significava esperar minutos enquanto seu computador consumia gigabytes de memória para construir a prova. Isso era lento e pesado demais para a maioria das pessoas, então muitos usuários, corretoras e lojas deixavam de lado as transações blindadas e enviavam ZEC às claras. O Sapling reduziu o trabalho para poucos segundos e cerca de 40 megabytes de memória. Essa única mudança é o que tornou prático usar o ZEC blindado no dia a dia, em celulares comuns e em carteiras de hardware.

## TL;DR

- O Sapling foi a segunda grande atualização da rede do Zcash, ativada no bloco 419.200 (29 de outubro de 2018, 02:15 UTC), no segundo aniversário do Zcash.
- Ele reformulou as transações blindadas em torno de dois circuitos criados para fins específicos (Spend e Output), substituindo o único e lento circuito JoinSplit do Sprout (ZIP 205, ZIP 243).
- O resultado: a construção de provas caiu de minutos e gigabytes de memória para poucos segundos e cerca de 40 MB, leve o suficiente para celulares e carteiras de hardware.
- Novos recursos: endereços diversificados (muitos endereços de pagamento não vinculáveis a partir de uma única chave), chaves de visualização para acesso apenas de auditoria e separação entre a geração da prova e a assinatura.
- Seus parâmetros vieram de uma cerimônia multipartidária em duas fases (Powers of Tau + MPC do Sapling); a segurança se mantém se pelo menos um participante tiver sido honesto.

## Analogia visual

O Sprout era um mensageiro particular que levava cada carta a pé de um lado ao outro do país: perfeitamente privado, mas lento e exaustivo. O Sapling transformou esse mesmo mensageiro em um ciclista com uma mochila leve: continua privado, mas rápido o suficiente para as entregas do dia a dia. E as novas chaves de visualização são como dar a um auditor uma janela clara para o diário de bordo do mensageiro, sem nunca entregar as chaves da carga.


## O que mudou

O coração do Sapling é uma forma mais rápida de construir a prova de conhecimento zero que mantém uma transação blindada privada. O design original do Sprout usava um único circuito de prova (o circuito JoinSplit), que era lento e consumia muita memória. O Sapling o substituiu por dois circuitos criados para fins específicos, um circuito Spend e um circuito Output, descritos na Especificação do Protocolo Zcash. O resultado é uma grande queda no custo. Segundo Electric Coin Company, uma transação blindada pode ser construída em apenas alguns segundos usando cerca de 40 megabytes de memória. A referência do Sprout anterior ao Sapling era muito mais pesada, na ordem de minutos e vários gigabytes de memória (esses números do lado do Sprout são a referência aproximada amplamente citada).

![Custo de transação blindada no Sprout versus Sapling](/content-images/sapling-before-after-a045b0b48f.webp)

## Novas chaves

O Sapling também introduziu um novo conjunto de endereços blindados e chaves. Uma única chave pode derivar muitos endereços diversificados, que são endereços de pagamento separados que um observador externo não consegue vincular entre si. O Sapling adicionou também as chaves de visualização: uma chave de visualização completa ou de entrada permite compartilhar a capacidade de ver os detalhes das transações de uma carteira sem entregar a capacidade de gastar seus fundos. Isso é útil para auditoria, contabilidade ou simplesmente para provar que um pagamento foi feito.

Uma mudança relacionada é que o Sapling separou a tarefa de construir a prova da tarefa de assinar a transação. O dispositivo que constrói a prova de conhecimento zero não precisa mais ser o dispositivo que detém a autoridade de gasto. Essa separação é o que permite que uma carteira de hardware mantenha sua chave de gastos isolada enquanto outro dispositivo faz o trabalho mais pesado de geração da prova.

![O dispositivo de prova entrega a prova a um dispositivo de assinatura separado](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## A configuração confiável

Os circuitos do Sapling dependem de um conjunto de parâmetros públicos que precisaram ser gerados com cuidado. Se uma única parte os tivesse produzido sozinha e guardado os dados secretos restantes (o "lixo tóxico"), essa parte poderia ter forjado provas. Para evitar isso, os parâmetros vieram de uma cerimônia multipartidária em duas fases. A fase 1, chamada Powers of Tau, era independente de circuito, ou seja, não estava ligada aos circuitos específicos do Sapling. A fase 2, o MPC do Sapling, era específica do circuito. Cada fase permanece segura desde que pelo menos um participante tenha sido honesto e destruído seu lixo tóxico, então a cerimônia só falha se absolutamente todos os participantes entrarem em conluio.

## Como foi ativado

O Sapling veio depois do Overwinter, a atualização de junho de 2018 que preparou o mecanismo de atualização da rede. Electric Coin Company definiu a altura de ativação na mainnet no zcashd 2.0.0, lançado em agosto de 2018, e a rede passou a seguir as regras do Sapling quando o bloco 419.200 foi minerado. Na chain, esse momento é marcado pelo consensus branch id do Sapling.

![Linha do tempo do lançamento do Zcash até a ativação do Sapling](/content-images/sapling-timeline-6cad184c30.webp)

## Erros comuns

- **Supor que os pagamentos blindados sempre foram utilizáveis.** Antes do Sapling, a construção de provas levava minutos e gigabytes de memória, então a maioria dos usuários, corretoras e lojas evitava completamente as transações blindadas.
- **Dizer que os endereços do Sapling são iguais aos do Sprout.** O Sapling introduziu seus próprios tipos de endereço e de chave (além de endereços diversificados e chaves de visualização); as chaves do Sprout não são interoperáveis com os endereços do Sapling.
- **Acreditar que a configuração confiável era "o segredo de uma empresa".** Foi uma cerimônia multipartidária: as provas só poderiam ser forjadas se todos os participantes entrassem em conluio.
- **Pensar que o Sapling mudou a emissão ou os saldos.** Ele mudou a forma como as transações blindadas são construídas; nenhum valor em ZEC foi afetado.
- **Supor que a geração da prova e a assinatura precisam acontecer no mesmo dispositivo.** A separação introduzida pelo Sapling é justamente o que permite que as carteiras de hardware mantenham as chaves de gastos isoladas enquanto outro dispositivo constrói as provas.


## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Shielded transaction | Uma transação privada em Zcash que oculta o remetente, o destinatário e o valor. |
| Sprout | O protocolo blindado original com que o Zcash foi lançado, mais lento e mais pesado que o Sapling. |
| Spend and Output circuits | Os dois novos circuitos de prova do Sapling que substituíram o único circuito JoinSplit do Sprout. |
| Diversified address | Um entre muitos endereços de pagamento não vinculáveis que você pode derivar de uma única chave. |
| Viewing Key | Uma chave que permite a alguém ver as transações de uma carteira sem poder gastar a partir dela. |
| Consensus branch id | Um código curto que informa à rede quais regras de atualização uma transação segue. |

## Perguntas frequentes

O Sapling mudou a quantidade de ZEC que eu tenho? Não. O Sapling mudou a forma como as transações blindadas são construídas, não a quantidade de ZEC que alguém possui nem a oferta total. Seu saldo não foi afetado.

Meu ZEC continua privado depois do Sapling? Sim, e mais utilizável. O Sapling manteve a forte privacidade das transações blindadas e as tornou rápidas e baratas o suficiente para serem realmente usadas. Os fundos blindados continuam ocultos da mesma forma.

Preciso fazer alguma coisa? Nenhuma ação é necessária da sua parte como detentor. O Sapling foi uma atualização da rede adotada pelos softwares de carteiras e de nós. As carteiras modernas já oferecem suporte aos endereços Sapling.

Qual é a diferença entre o Sprout e o Sapling? O Sprout foi o primeiro protocolo blindado e usava um único circuito de prova lento e que consumia muita memória. O Sapling o substituiu por circuitos Spend e Output mais rápidos, adicionou chaves de visualização e endereços diversificados e tornou as transações blindadas leves o suficiente para celulares e carteiras de hardware.

Por que algumas fontes dizem 28 de outubro e outras 29 de outubro? A altura de ativação foi definida com antecedência para coincidir com 28 de outubro de 2018. O bloco que de fato acionou a mudança, o bloco 419.200, foi minerado nas primeiras horas de 29 de outubro, em UTC. Em muitos fusos horários locais, ainda era 28 de outubro. Em ambos os casos, é o mesmo bloco e o mesmo momento.

O que é uma chave de visualização? Uma chave de visualização permite compartilhar o acesso de leitura a uma carteira blindada. Quem tem uma chave de visualização completa ou de entrada pode ver os detalhes das transações da carteira, mas não pode gastar seus fundos. Veja [Chaves de visualização](../zcash-tech/viewing-keys) para saber mais.

## Teste seu entendimento

No Sprout, por que tantas pessoas evitavam as transações blindadas, e como o Sapling resolveu isso?

<details>
<summary>Answer</summary>
No Sprout, construir uma transação blindada levava minutos e usava gigabytes de memória, então era lento e pesado demais para a maioria dos usuários, corretoras e lojas. O Sapling introduziu circuitos Spend e Output mais rápidos, que reduziram o trabalho para poucos segundos e cerca de 40 megabytes, tornando as transações blindadas práticas em celulares comuns e em carteiras de hardware.
</details>

### Recursos

- [ZIP 205: Implantação da atualização da rede Sapling](https://zips.z.cash/zip-0205)
- [ZIP 243: Validação de assinaturas de transações para o Sapling](https://zips.z.cash/zip-0243)
- [Zcash: página da atualização Sapling](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: anúncio do Sapling](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Anunciando o MPC do Sapling](https://electriccoin.co/blog/sapling-mpc/)

### Veja também

- [Pools blindados](../using-zcash/shielded-pools)
- [Chaves de visualização](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Atualizações da rede do Zcash](../start-here/network-upgrades)
- [Carteiras](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

## Páginas relacionadas

- [Chaves de visualização](./Viewing_Keys.md): o recurso de compartilhamento para auditoria introduzido pelo Sapling
- [Sprout](./Sprout.md): o protocolo blindado original que o Sapling substituiu
- [Blossom](./Blossom.md): a próxima atualização da série (tempo de bloco, não criptografia)
- [zk_SNARKS](./zk_SNARKS.md): a tecnologia de conhecimento zero por trás dos circuitos


Série: [Índice de atualizações da rede](../start-here/network-upgrades) · Anterior: [Overwinter](../zcash-tech/overwinter) · Próxima: [Blossom](../zcash-tech/blossom)
