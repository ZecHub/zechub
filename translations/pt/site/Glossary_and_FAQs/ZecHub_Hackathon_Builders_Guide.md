# Guia do builder para o hackathon do ZecHub

## TL;DR

- Saiba por que você está construindo antes de escrever código: utilidade vale mais que complexidade
- Mantenha a simplicidade: uma ideia pequena bem executada vale mais que uma ideia grande inacabada
- Aprenda cedo a stack de infraestrutura do Zcash, pois é a parte mais íngreme da subida
- Se o seu app movimenta fundos, ele precisa funcionar na mainnet: construa na testnet e depois comprove na mainnet
- A documentação e uma demo clara podem importar mais que o próprio produto
- Vencer é um ponto de partida: constrói sua reputação e abre portas na comunidade

<br/>

## Para quem é este guia

- Builders estreantes que vão participar de um hackathon do ZecHub ou do Zcash
- Desenvolvedores de outros ecossistemas que estão começando no Zcash
- Qualquer pessoa que queira transformar um projeto de hackathon em algo duradouro

<br/>

## Comece pelo porquê

Antes de abrir o seu editor, saiba qual problema você está resolvendo e por que alguém se importaria com isso. Um bom teste é simples: se aquilo que você está construindo não existisse, alguém sentiria falta? Construa algo que você mesmo usaria. A privacidade é a razão de existir do Zcash, então entenda por que a privacidade importa para as pessoas para quem você está construindo e deixe isso orientar todo o projeto.

<br/>

## Aprenda a stack primeiro

A surpresa mais comum para builders vindos de outras chains é a curva de aprendizado da infraestrutura do Zcash, não a programação. Reserve tempo para entender como as peças se encaixam antes de projetar o seu app. Comece pela stack principal, muitas vezes chamada de "Z ao cubo": zebrad, um servidor leve e uma carteira. Depois, familiarize-se com as ferramentas para desenvolvedores:

1. Leia a página de desenvolvedores da wiki em [zechub.wiki/developers](https://zechub.wiki/developers), que é o primeiro ponto de parada recomendado
2. Explore o zingolib e a zingo-cli, cujas chamadas cobrem a maior parte do que um projeto precisa em todas as trilhas
3. Veja o librustzcash e a carteira de referência ZODL para blocos de construção de nível mais baixo
4. Para um projeto com FROST, use o frostd da Zcash Foundation e o frost-core do crates.io, e conte com a IA para ajudar com as definições, embora usar o FROST com segurança ainda exija esforço e tempo de verdade

<br/>

## Entenda o que significa mainnet

Várias trilhas exigem que o seu app interaja com a mainnet do Zcash. Na prática, isso significa que o seu projeto, ou alguém que o utilize, incluindo um agente de IA, envia ou recebe fundos reais na mainnet, ou então que ele constrói e aprimora as ferramentas que tornam isso possível. Se o seu app faz transações, você precisa demonstrá-las na mainnet na sua submissão.

Construa na testnet durante o desenvolvimento. A atividade na mainnet custa ZEC de verdade e só vai ficar mais cara com o tempo, então a testnet é o lugar recomendado para iterar. Mude para a mainnet para a prova final. Tenha um detalhe em mente ao projetar o seu fluxo: quando os fundos chegam a um endereço blindado, a sua carteira precisa escanear e encontrá-los antes que possam ser gastos, e esse escaneamento leva um pouco de tempo. Incorpore essa breve espera ao seu app, em vez de presumir que os fundos recebidos estão prontos para uso imediatamente.

<br/>

## Mantenha a simplicidade

Uma ideia simples e bem executada já venceu uma complexa muitas vezes. Os jurados já viram um conceito básico vencer um projeto tecnicamente mais ambicioso no mesmo evento, porque resolvia um problema real e era fácil de entender. Assuma menos do que você acha que consegue terminar. Ignorar detalhes, definir um escopo grande demais e pular a pesquisa são os erros que custam prêmios aos builders. Torne o seu projeto fácil de entender e fácil de executar, do conceito central ao primeiro comando.

<br/>

## Conquiste os primeiros 30 segundos

Os avaliadores formam uma impressão forte rapidamente, então a apresentação, o tema e o visual têm peso real, junto com o quanto a sua solução é inovadora. Documentação e uma demo clara não são detalhes de última hora. Comunicar a sua ideia às vezes é mais importante que a própria ideia, porque, se ninguém entender o que você construiu, o projeto não tem como dar certo. O julgamento costuma equilibrar profundidade técnica, experiência do usuário, originalidade e utilidade prática, e uma documentação sólida eleva todos esses aspectos.

<br/>

## Considere as trilhas mais difíceis e menos concorridas

Se você quer uma competição menos acirrada, as trilhas mais difíceis costumam ter menos inscrições simplesmente porque menos pessoas se arriscam nelas. A trilha de Contabilidade é uma boa opção para iniciantes que querem evitar o trabalho com transações on-chain. O FROST é poderoso e pouco utilizado, e serve como uma base sólida para um projeto. A comunidade não determina o que construir, então construir sobre uma ferramenta capaz que o ecossistema já tem, em vez de começar do zero, é uma escolha inteligente.

<br/>

## Depois do hackathon

Vencer não é o fim da estrada. A vitória fortalece o seu portfólio e a sua reputação, abre portas na comunidade e pode levar a financiamento por meio de propostas.

1. Leve um projeto forte adiante como uma proposta para a DAO da ZecHub ou para a Zcash Community Grants, com um roadmap, marcos e uma justificativa de orçamento
2. Mantenha-se ativo na comunidade, no fórum, no Discord e no X
3. Participe das reuniões de P&D do Arborist, publique ideias e peça feedback
4. Continue construindo mesmo que você não vença, e fique atento ao próximo hackathon

<br/>

## Páginas relacionadas

- [Recursos para desenvolvedores](https://zechub.wiki/developers) - o primeiro ponto de parada para builders do Zcash
- [Nó integral Zebra](https://zechub.wiki/zcash-tech/zebra-full-node) - o nó na base da stack
- [FROST](https://zechub.wiki/zcash-tech/frost) - assinaturas de limiar para projetos avançados

<br/>

<small>Este guia foi elaborado com contribuições dos colaboradores principais do ZecHub squirrel, Dismad e Tron.</small>
