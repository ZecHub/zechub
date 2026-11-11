# Como o Zcash está organizado

## Resumo rápido

- O Zcash não é construído por uma única empresa, mas por muitas organizações independentes, cada uma responsável por uma parte diferente do trabalho
- Durante a maior parte de sua história, duas organizações lideraram o desenvolvimento: a Electric Coin Company e a Zcash Foundation
- Em janeiro de 2026, toda a equipe da Electric Coin Company pediu demissão após uma disputa de governança, e o ecossistema se reorganizou em várias equipes independentes
- Hoje, o protocolo, o software de nó, as carteiras, a pesquisa, a escalabilidade e o financiamento são conduzidos por grupos separados
- Nenhuma organização isolada controla o Zcash; a rede é open source e sem permissão, e continuou funcionando normalmente durante todas as mudanças

<br/>

## Para quem é isto

- Pessoas novas tentando entender quem realmente desenvolve e mantém o Zcash
- Qualquer pessoa confusa com os muitos nomes de organizações no ecossistema
- Colaboradores decidindo com quem trabalhar ou para onde enviar uma proposta

<br/>

## Por que isto importa

Entender a estrutura torna todo o resto mais fácil. Isso informa quem mantém o código do qual você depende, de quem você deve se aproximar para obter um subsídio e quem é responsável pela parte da rede que importa para você. Também revela uma das forças discretas do Zcash: como o trabalho está distribuído entre grupos independentes, nenhum ponto único de falha pode capturar ou paralisar o projeto.

Esta página é um mapa. Para cada organização que já possui uma página completa nesta wiki, você encontrará uma note curta e um link para ler mais, em vez de uma repetição do que está escrito lá.

<br/>

## Como funcionava antes

Durante a maior parte da história do Zcash, duas organizações lideraram o caminho.

A Electric Coin Company lançou o Zcash em 2016 e empregava grande parte da equipe principal de desenvolvimento. Ela era supervisionada pela Bootstrap, um conselho sem fins lucrativos criado para apoiar o Zcash. A Zcash Foundation trabalhava ao seu lado como uma organização sem fins lucrativos independente, focada na administração do protocolo e na construção de um nó independente. Ambas eram financiadas em grande parte por uma parcela da recompensa de bloco reservada para o desenvolvimento.

Essa estrutura de dois pilares se manteve por anos, mas dependia desse financiamento compartilhado e de as duas organizações permanecerem alinhadas. À medida que o financiamento original para desenvolvimento evoluiu e seu futuro de longo prazo se tornou menos certo, a questão de como pagar pelo trabalho contínuo se tornou mais urgente. Essa questão de financiamento está em segundo plano em grande parte do que mudou depois, e é parte do motivo pelo qual algumas equipes agora captam capital externo, enquanto outras dependem de subsídios.

<br/>

## A reorganização de 2026

Em janeiro de 2026, a estrutura mudou drasticamente. Em 7 de janeiro, o diretor-executivo da Electric Coin Company, Josh Swihart, anunciou no X que toda a equipe da empresa havia pedido demissão.

A Bootstrap era uma organização sem fins lucrativos criada em 2020 para governar a Electric Coin Company, que havia se tornado uma subsidiária integralmente controlada por ela. O desacordo entre a equipe da empresa e esse conselho se acumulou ao longo do tempo e envolveu várias questões, incluindo a direção da organização, como o desenvolvimento deveria ser financiado e o futuro da carteira Zashi, que a equipe queria transferir para uma empresa privada para captar capital externo. Swihart descreveu a saída como uma demissão construtiva, um termo jurídico que significa que as condições foram alteradas de forma tão grave que a demissão foi efetivamente forçada, e afirmou que a maioria do conselho havia deixado de estar alinhada com a missão do Zcash.

O outro lado do relato importa por uma questão de justiça. A Bootstrap enquadrou o conflito como uma questão de governança e conformidade jurídica de uma organização sem fins lucrativos. O fundador do Zcash, Zooko Wilcox, defendeu publicamente os membros do conselho citados na disputa, afirmando que havia trabalhado com eles por muitos anos e os considerava pessoas de alta integridade, ao mesmo tempo deixando claro que não estava tomando partido no desacordo em si.

Duas coisas não estavam em disputa. Nenhuma das partes alegou qualquer conduta criminosa, portanto foi um desacordo corporativo e de governança, e não um caso jurídico. E a própria rede Zcash não foi afetada: permaneceu open source, sem permissão, segura e totalmente operacional durante todo o processo, um ponto que tanto Swihart quanto Wilcox enfatizaram aos usuários.

O que se seguiu foi uma reorganização, e não um colapso. A antiga equipe da empresa formou a ZODL mais tarde em 2026 e, separadamente, três ex-membros do conselho da Bootstrap formaram a Sovright. O desenvolvimento assumiu uma forma mais distribuída entre várias equipes independentes.

As declarações descritas aqui foram feitas publicamente no X em 7 de janeiro de 2026 por Josh Swihart (@jswihart) e Zooko Wilcox (@zooko), onde as publicações originais podem ser lidas na íntegra.

<br/>

## Quem desenvolve o Zcash agora

Hoje, o trabalho está distribuído entre organizações independentes, cada uma responsável por uma parte clara.

### As duas organizações da divisão de 2026

1. ZODL, o Zcash Open Development Lab, foi formado pela antiga equipe da Electric Coin Company e é liderado por Josh Swihart. Captou mais de vinte e cinco milhões de dólares de investidores externos e trabalha no desenvolvimento central do protocolo, incluindo o sistema de provas Halo 2, que alimenta as transações blindadas mais recentes do Zcash, e na carteira ZODL, uma carteira móvel blindada por padrão anteriormente chamada Zashi. Veja [ZODL](https://zechub.wiki/zcash-organizations/zodl).
2. Sovright é uma organização sem fins lucrativos formada por três ex-membros do conselho da Bootstrap. Ela se concentra em ferramentas e suporte para o ecossistema e desenvolveu o Argos, uma ferramenta para ajudar usuários iniciais a recuperar fundos presos em uma carteira antiga e sem manutenção. Veja [Sovright](https://zechub.wiki/zcash-organizations/sovright).

### Administração do protocolo, pesquisa e software de nó

3. A Zcash Foundation mantém o Zebra, o nó em Rust que se torna o nó principal da rede à medida que o cliente mais antigo zcashd é descontinuado. Ela também administra a organização Zcash no GitHub, o site z.cash e a conta principal do Zcash no X, e colabora com a ZecHub para ajudar a gerenciar alguns desses ativos. Veja [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation).
4. Shielded Labs é uma organização sem fins lucrativos independente, financiada por doações e sediada na Suíça. Ela se concentra em pesquisa e sustentabilidade de longo prazo, incluindo o mecanismo de sustentabilidade da rede que financia o desenvolvimento futuro e o trabalho Crosslink para adicionar finalidade proof of stake ao Zcash, e financiou a auditoria de segurança que descobriu a vulnerabilidade do pool Orchard em 2026. Veja [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs).
5. A Electric Coin Company continua fazendo parte da história como a organização que criou e lançou o Zcash em 2016. Veja [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company).

### Escalabilidade e criptografia

6. Project Tachyon é um esforço de escalabilidade liderado pelo criptógrafo Sean Bowe. Ele propõe uma nova forma de as carteiras sincronizarem com a blockchain, chamada sincronização oblivious, que reduz o tamanho das transações e, como efeito colateral, aproxima o Zcash da privacidade pós-quântica. Seu trabalho está documentado em [tachyon.z.cash](https://tachyon.z.cash/).
7. O Valar Group é um laboratório de pesquisa e engenharia criptográfica que trabalha no protocolo Zcash para dinheiro digital privado, pós-quântico e escalável. Ele colabora estreitamente com o Project Tachyon no trabalho de escalabilidade e computação quântica. Saiba mais sobre seu trabalho em [valargroup.dev](https://valargroup.dev/).

### Organizações regionais e comunitárias

8. Obscura Labs é uma organização independente registrada na Nigéria, focada na África e em mercados emergentes, construindo infraestrutura e caminhos para a adoção. Veja [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs).

### Educação

9. ZecHub é um centro de educação descentralizado para o Zcash. Membros da comunidade trabalham juntos para criar, validar e promover conteúdo que ajuda as pessoas a entender o ecossistema e aprender como participar, por meio de tutoriais, documentação da wiki, um podcast e uma newsletter semanal. A wiki que você está lendo agora faz parte da ZecHub, e a Zcash Foundation colabora com ela para ajudar a gerenciar alguns recursos da comunidade.

### Financiamento

10. Zcash Community Grants financia colaboradores independentes e projetos da comunidade a partir de uma parcela da recompensa de bloco, distribuindo o trabalho entre muitas equipes além das organizações centrais. Veja [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants).
11. A Financial Privacy Foundation apoia o ecossistema do Zcash e projetos da comunidade. Veja [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation).

Todas essas organizações mantêm repositórios open source, portanto seu trabalho pode ser lido, verificado e desenvolvido por qualquer pessoa. E as organizações não contam toda a história. Muitas contribuições significativas vêm de indivíduos e empresas contratadas financiadas por subsídios, e não apenas das organizações centrais. Ao lado delas estão equipes de carteiras, comunidades regionais, desenvolvedores independentes e investidores que possuem e apoiam ZEC sem desenvolver o protocolo. A lista acima é a espinha dorsal, não o panorama completo.

<br/>

## Por onde começar como iniciante

A organização que importa para você depende do que você quer fazer.

1. Para usar o Zcash, você precisa de uma carteira, portanto a ZODL e sua carteira são um ponto de partida natural.
2. Para executar um nó ou entender o software da rede, consulte a Zcash Foundation e seu nó Zebra.
3. Para financiar um projeto ou contribuir com trabalho remunerado, consulte a Zcash Community Grants.
4. Para acompanhar a pesquisa e o futuro do protocolo, acompanhe Shielded Labs, Project Tachyon e o Valar Group.

<br/>

## Continue aprendendo

Esta wiki existe para ajudar você a se aprofundar, portanto o melhor próximo passo é continuar lendo-a. Alguns bons tópicos para iniciantes:

- [O que são ZEC e Zcash](https://zechub.wiki/start-here/what-is-zec-and-zcash) para os fundamentos da rede e da moeda
- [Guia para novos usuários](https://zechub.wiki/start-here/new-user-guide) para um primeiro passo a passo de uso do Zcash
- [Pools blindados](https://zechub.wiki/using-zcash/shielded-pools) para entender como o Zcash mantém as transações privadas
- [A catraca](https://zechub.wiki/zcash-tech/the-turnstile) para entender como a oferta de moedas permanece verificável
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) para o pool blindado para o qual a rede está migrando
- [Atualizações da rede](https://zechub.wiki/start-here/network-upgrades) para entender como o Zcash muda ao longo do tempo
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) para a criptografia por trás da privacidade

Cada página leva a mais conteúdo, portanto você pode seguir o fio até onde quiser.

<br/>

## Equívocos comuns

- O Zcash não é propriedade nem é controlado por uma única empresa; nenhuma organização pode mudar ou interromper a rede por conta própria
- A disputa de 2026 não afetou a rede, os fundos nem a privacidade; foi um desacordo organizacional, e o protocolo funcionou normalmente durante todo o processo
- A saída da equipe da Electric Coin Company não encerrou o Zcash; o trabalho passou para novas organizações independentes
- Ter muitas organizações é uma força, não uma fraqueza; isso remove pontos únicos de falha e mantém o projeto resiliente
- Possuir ou promover ZEC não é o mesmo que desenvolver o Zcash; investidores e divulgadores fazem parte da comunidade, mas são distintos das equipes que desenvolvem o protocolo

<br/>

## Páginas relacionadas

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - o laboratório de desenvolvimento formado pela antiga equipe da Electric Coin Company
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - a organização sem fins lucrativos formada por ex-membros do conselho da Bootstrap
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - administradora do protocolo e do nó Zebra
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - pesquisa e sustentabilidade do protocolo
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - a empresa que lançou o Zcash em 2016
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - infraestrutura e adoção na África e em mercados emergentes
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - financiamento para colaboradores independentes
