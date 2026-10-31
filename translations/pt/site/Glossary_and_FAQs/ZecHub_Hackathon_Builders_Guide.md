# Guia do construtor para hackathons da ZecHub

## TL;DR

- Saiba por que você está construindo antes de escrever código; a utilidade vale mais do que a complexidade
- Mantenha a simplicidade; uma ideia pequena bem executada vale mais do que uma grande ideia deixada inacabada
- Aprenda cedo a stack de infraestrutura do Zcash; é a parte mais íngreme da subida
- Se o seu app movimenta fundos, ele tem que funcionar na mainnet; construa na testnet e depois prove isso na mainnet
- A documentação e uma demonstração clara podem importar mais do que o próprio produto
- Vencer é uma linha de partida; constrói sua reputação e abre portas na comunidade

<br/>

## Para quem é

- Construtores de primeira viagem que participam de um hackathon da ZecHub ou do Zcash
- Desenvolvedores de outros ecossistemas que são novos no Zcash
- Qualquer pessoa que queira transformar um projeto de hackathon em algo duradouro

<br/>

## Comece pelo porquê

Antes de abrir seu editor, saiba qual problema você está resolvendo e por que alguém se importaria. Um bom teste é simples: se aquilo que você está construindo não existisse, alguém sentiria sua falta? Construa algo que você usaria. A privacidade é a razão de existir do Zcash, por isso entenda por que a privacidade importa para as pessoas para quem você está construindo e depois deixe que isso molde todo o projeto.

<br/>

## Aprenda primeiro a stack

A surpresa mais comum para construtores vindos de outras chains é a curva de aprendizado da infraestrutura do Zcash, não a programação. Dê a si mesmo tempo para entender como as peças se encaixam antes de projetar seu app. Comece pela stack principal, muitas vezes chamada Z ao cubo: zebrad, um servidor light e uma carteira. Depois, familiarize-se com as ferramentas de desenvolvedor:

1. Leia a página para desenvolvedores na wiki em [zechub.wiki/developers](https://zechub.wiki/developers); é a primeira parada recomendada
2. Explore o zingolib e o zingo-cli, cujas chamadas cobrem a maior parte do que um projeto precisa em várias categorias
3. Veja o librustzcash e a carteira de referência ZODL para blocos de construção de nível mais baixo
4. Para um projeto FROST, use o frostd da Zcash Foundation e o frost-core em crates.io, e conte com IA para ajudar com definições, embora usar FROST de forma segura continue exigindo esforço e tempo reais

<br/>

## Entenda o que significa mainnet

Várias categorias exigem que seu app interaja com a mainnet do Zcash. Na prática, isso significa que seu projeto, ou alguém que o use, incluindo um agente de IA, envia ou recebe fundos reais na mainnet, ou então constrói e melhora as ferramentas que tornam isso possível. Se seu app faz transações, você tem que demonstrá-las na mainnet em sua submissão.

Construa na testnet enquanto desenvolve. A atividade na mainnet custa ZEC reais e só ficará mais cara com o tempo, por isso a testnet é o local recomendado para iterar. Mude para a mainnet para a prova final. Tenha um detalhe em mente ao projetar seu fluxo: quando os fundos chegam a um endereço blindado, sua carteira tem que analisá-los e encontrá-los antes que possam ser gastos, e essa análise demora um pouco. Inclua essa pequena espera no seu app em vez de assumir que os fundos recebidos estão prontos para uso imediato.

<br/>

## Mantenha a simplicidade

Uma ideia simples e bem executada já venceu muitas vezes uma ideia complexa. Os jurados já viram um conceito básico vencer um projeto tecnicamente mais ambicioso no mesmo evento, porque resolvia um problema real e era fácil de entender. Assuma menos do que você acha que consegue terminar. Ignorar detalhes, definir um escopo grande demais e pular a fase de pesquisa são os erros que custam prêmios aos construtores. Torne seu projeto fácil de entender e fácil de executar, do conceito central ao primeiro comando.

<br/>

## Ganhe os primeiros 30 segundos

Os avaliadores formam rapidamente uma impressão forte, por isso a apresentação, o tema e os visuais têm um peso real, assim como o grau de novidade da sua solução. A documentação e uma demonstração clara não são aspectos secundários. Comunicar sua ideia é, às vezes, mais importante do que a própria ideia, porque, se ninguém entender o que você construiu, ela não poderá ter sucesso. A avaliação tende a equilibrar profundidade técnica, experiência do usuário, originalidade e utilidade prática, e uma boa documentação valoriza todos esses aspectos.

<br/>

## Olhe para as categorias mais difíceis e menos concorridas

Se você quer uma competição menos concorrida, as categorias mais difíceis costumam ter menos inscrições simplesmente porque menos pessoas as tentam. A categoria de Accounting é uma boa opção para iniciantes que querem evitar trabalho com transações on-chain. FROST é poderoso e pouco usado, e constitui uma base sólida para um projeto. A comunidade não prescreve o que deve ser construído, por isso construir sobre uma ferramenta capaz que o ecossistema já tem, em vez de começar do zero, é uma jogada inteligente.

<br/>

## Depois do hackathon

Vencer não é o fim do caminho. Vencer reforça seu portfólio e sua reputação, abre portas na comunidade e pode levar a financiamento por meio de propostas.

1. Leve um projeto forte mais longe, como proposta para a ZecHub DAO ou para a Zcash Community Grants, com um roadmap, marcos e uma justificativa do orçamento
2. Mantenha-se ativo na comunidade, no fórum, no Discord e no X
3. Participe das reuniões de P&D da Arborist, publique ideias e peça feedback
4. Continue construindo mesmo que não vença e fique atento ao próximo hackathon

<br/>

## Páginas relacionadas

- [Recursos para desenvolvedores](https://zechub.wiki/developers) - a primeira parada para construtores do Zcash
- [Nó integral Zebra](https://zechub.wiki/zcash-tech/zebra-full-node) - o nó na base da stack
- [FROST](https://zechub.wiki/zcash-tech/frost) - assinaturas de limiar para projetos avançados

<br/>

<small>Este guia foi moldado pelas contribuições dos principais colaboradores da ZecHub: squirrel, Dismad e Tron.</small>
