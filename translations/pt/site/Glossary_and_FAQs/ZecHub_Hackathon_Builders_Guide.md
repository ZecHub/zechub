---
# Guia do construtor para hackathons da ZecHub

## TL;DR

- Saiba por que está a construir antes de escrever código; a utilidade vale mais do que a complexidade
- Mantenha a simplicidade; uma ideia pequena bem executada vale mais do que uma grande ideia deixada inacabada
- Aprenda cedo a stack de infraestrutura da Zcash; é a parte mais íngreme da subida
- Se a sua app movimenta fundos, tem de funcionar na mainnet; construa na testnet e depois prove-o na mainnet
- A documentação e uma demonstração clara podem importar mais do que o próprio produto
- Vencer é uma linha de partida; constrói a sua reputação e abre portas na comunidade

<br/>

## A quem se destina

- Construtores de primeira viagem que entram num hackathon da ZecHub ou da Zcash
- Programadores de outros ecossistemas que são novos na Zcash
- Qualquer pessoa que queira transformar um projeto de hackathon em algo duradouro

<br/>

## Comece pelo porquê

Antes de abrir o seu editor, saiba que problema está a resolver e por que razão alguém se haveria de importar. Um bom teste é simples: se aquilo que está a construir não existisse, alguém sentiria a sua falta? Construa algo que você próprio usaria. A privacidade é a razão de existir da Zcash, por isso compreenda por que motivo a privacidade importa para as pessoas para quem está a construir, e depois deixe que isso molde todo o projeto.

<br/>

## Aprenda primeiro a stack

A surpresa mais comum para construtores vindos de outras chains é a curva de aprendizagem da infraestrutura da Zcash, não a programação. Dê a si próprio tempo para compreender como as peças se encaixam antes de desenhar a sua app. Comece pela stack principal, muitas vezes chamada Z ao cubo: zebrad, um servidor light e uma wallet. Depois familiarize-se com as ferramentas de desenvolvimento:

1. Leia a página para programadores na wiki em [zechub.wiki/developers](https://zechub.wiki/developers); é a primeira paragem recomendada
2. Explore o zingolib e o zingo-cli, cujas chamadas cobrem a maior parte do que um projeto precisa em várias categorias
3. Veja o librustzcash e a wallet de referência ZODL para blocos de construção de nível mais baixo
4. Para um projeto FROST, use o frostd da Zcash Foundation e o frost-core em crates.io, e apoie-se em IA para ajudar com definições, embora usar FROST de forma segura continue a exigir esforço e tempo reais

<br/>

## Compreenda o que significa mainnet

Várias categorias exigem que a sua app interaja com a mainnet da Zcash. Na prática, isto significa que o seu projeto, ou alguém que o utilize, incluindo um agente de IA, envia ou recebe fundos reais na mainnet, ou então constrói e melhora as ferramentas que tornam isso possível. Se a sua app faz transações, tem de as demonstrar na mainnet na sua submissão.

Construa na testnet enquanto desenvolve. A atividade na mainnet custa ZEC reais e só ficará mais cara com o tempo, por isso a testnet é o local recomendado para iterar. Mude para a mainnet para a prova final. Tenha um detalhe em mente ao desenhar o seu fluxo: quando os fundos chegam a um endereço shielded, a sua wallet tem de os analisar e encontrar antes de poderem ser gastos, e essa análise demora um pouco. Inclua essa pequena espera na sua app em vez de assumir que os fundos recebidos estão prontos a usar imediatamente.

<br/>

## Mantenha a simplicidade

Uma ideia simples e bem executada já venceu muitas vezes uma ideia complexa. Os jurados já viram um conceito básico vencer um projeto tecnicamente mais ambicioso no mesmo evento, porque resolvia um problema real e era fácil de compreender. Assuma menos do que aquilo que pensa que consegue terminar. Ignorar detalhes, definir um âmbito demasiado grande e saltar a fase de pesquisa são os erros que custam prémios aos construtores. Torne o seu projeto fácil de compreender e fácil de executar, desde o conceito central até ao primeiro comando.

<br/>

## Ganhe os primeiros 30 segundos

Os avaliadores formam rapidamente uma impressão forte, por isso a apresentação, o tema e os visuais têm um peso real, a par do grau de novidade da sua solução. A documentação e uma demonstração clara não são aspetos secundários. Comunicar a sua ideia é, por vezes, mais importante do que a própria ideia, porque se ninguém perceber o que construiu, isso não pode ter sucesso. A avaliação tende a equilibrar profundidade técnica, experiência do utilizador, originalidade e utilidade prática, e uma boa documentação valoriza todos esses aspetos.

<br/>

## Olhe para as categorias mais difíceis e menos concorridas

Se quer uma competição menos concorrida, as categorias mais difíceis costumam ter menos inscrições simplesmente porque menos pessoas as tentam. A categoria de Accounting é uma boa opção para iniciantes que querem evitar trabalho com transações on-chain. FROST é poderoso e pouco usado, e constitui uma base sólida para um projeto. A comunidade não prescreve o que deve ser construído, por isso construir sobre uma ferramenta capaz que o ecossistema já tem, em vez de começar do zero, é uma jogada inteligente.

<br/>

## Depois do hackathon

Vencer não é o fim do caminho. Vencer reforça o seu portefólio e a sua reputação, abre portas na comunidade e pode levar a financiamento através de propostas.

1. Leve um projeto forte mais longe, como proposta para a ZecHub DAO ou para a Zcash Community Grants, com um roadmap, marcos e uma justificação do orçamento
2. Mantenha-se ativo na comunidade, no fórum, no Discord e no X
3. Junte-se às reuniões de I&D da Arborist, publique ideias e peça feedback
4. Continue a construir mesmo que não vença, e fique atento ao próximo hackathon

<br/>

## Páginas relacionadas

- [Recursos para Programadores](https://zechub.wiki/developers) - a primeira paragem para construtores na Zcash
- [Nó Completo Zebra](https://zechub.wiki/zcash-tech/zebra-full-node) - o nó na base da stack
- [FROST](https://zechub.wiki/zcash-tech/frost) - assinaturas de limiar para projetos avançados

<br/>

<small>Este guia foi moldado por contributos dos principais colaboradores da ZecHub: squirrel, Dismad e Tron.</small>
