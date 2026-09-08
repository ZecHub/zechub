# Como Zcash está organizado

## Resumo rápido

- Zcash não é construído por uma única empresa, é construído por muitas organizações independentes que detêm cada uma uma parte diferente do trabalho
- Durante a maior parte da sua história, duas organizações lideraram o desenvolvimento, a Electric Coin Company e a Zcash Foundation
- Em janeiro de 2026, toda a equipa da Electric Coin Company demitiu-se após uma disputa de governação, e o ecossistema reorganizou-se em várias equipas independentes
- Hoje, o protocolo, o software de nó, as wallets, a investigação, a escalabilidade e o financiamento são tratados por grupos separados
- Nenhuma organização isolada controla Zcash, a rede é open source e permissionless, e continuou a funcionar normalmente ao longo de todas as mudanças

<br/>

## A quem se destina

- Pessoas novas que estão a tentar perceber quem realmente constrói e mantém Zcash
- Qualquer pessoa confusa com os muitos nomes de organizações no ecossistema
- Contribuidores a decidir com quem trabalhar ou para onde enviar uma proposta

<br/>

## Porque isto importa

Compreender a estrutura torna tudo o resto mais fácil. Diz-lhe quem mantém o código de que depende, de quem se deve aproximar para obter uma bolsa, e quem é responsável pela parte da rede que lhe interessa. Também revela um dos pontos fortes discretos de Zcash: porque o trabalho está distribuído por grupos independentes, nenhum ponto único de falha pode capturar ou travar o projeto.

Esta página é um mapa. Para cada organização que já tem uma página completa nesta wiki, encontrará uma nota curta e uma ligação para ler mais, em vez de uma repetição do que já está lá escrito.

<br/>

## Como costumava funcionar

Durante a maior parte da história de Zcash, duas organizações lideraram o caminho.

A Electric Coin Company lançou Zcash em 2016 e empregava grande parte da equipa principal de desenvolvimento. Era supervisionada pela Bootstrap, um conselho sem fins lucrativos criado para apoiar Zcash. A Zcash Foundation trabalhava ao seu lado como uma organização sem fins lucrativos independente, focada na administração do protocolo e na construção de um nó independente. Ambas eram financiadas em grande parte por uma porção da recompensa de bloco reservada para desenvolvimento.

Esta estrutura de dois pilares manteve-se durante anos, mas dependia desse financiamento partilhado e de as duas organizações permanecerem alinhadas. À medida que o financiamento original para desenvolvimento evoluiu e o seu futuro a longo prazo se tornou menos certo, a questão de como pagar o trabalho contínuo tornou-se mais premente. Essa questão do financiamento está no pano de fundo de muito do que mudou a seguir, e é parte da razão pela qual algumas equipas agora angariam capital externo enquanto outras dependem de bolsas.

<br/>

## A reorganização de 2026

Em janeiro de 2026, a estrutura mudou de forma acentuada. A 7 de janeiro, o diretor executivo da Electric Coin Company, Josh Swihart, anunciou no X que toda a equipa da empresa se tinha demitido.

A Bootstrap era uma organização sem fins lucrativos criada em 2020 para governar a Electric Coin Company, que se tinha tornado uma subsidiária sua integralmente detida. O desacordo entre a equipa da empresa e este conselho foi-se acumulando ao longo do tempo e tocou em várias questões, incluindo a direção da organização, como o desenvolvimento deveria ser financiado, e o futuro da wallet Zashi, que a equipa queria transferir para uma empresa privada para angariar capital externo. Swihart descreveu a saída como uma dispensa construtiva, um termo jurídico que significa que as condições foram alteradas de forma tão severa que a demissão foi, na prática, forçada, e disse que a maioria do conselho se tinha desalinado da missão de Zcash.

O outro lado do relato importa por uma questão de justiça. A Bootstrap enquadrou o conflito como uma questão de governação e de conformidade legal de uma organização sem fins lucrativos. O fundador de Zcash, Zooko Wilcox, defendeu publicamente os membros do conselho nomeados na disputa, dizendo que tinha trabalhado com eles durante muitos anos e que os considerava pessoas de elevada integridade, deixando ao mesmo tempo claro que não estava a tomar partido na própria divergência.

Duas coisas não estavam em disputa. Nenhuma das partes alegou qualquer conduta criminosa, por isso tratou-se de um desacordo corporativo e de governação, e não de um caso legal. E a própria rede Zcash não foi afetada, permaneceu open source, permissionless, segura e totalmente operacional durante todo o processo, um ponto que tanto Swihart como Wilcox sublinharam aos utilizadores.

O que se seguiu foi uma reorganização e não um colapso. A antiga equipa da empresa avançou mais tarde, em 2026, para formar a ZODL, e separadamente três antigos membros do conselho da Bootstrap formaram a Sovright. O desenvolvimento assentou numa forma mais distribuída entre várias equipas independentes.

As declarações aqui descritas foram feitas publicamente no X a 7 de janeiro de 2026, por Josh Swihart (@jswihart) e Zooko Wilcox (@zooko), onde as publicações originais podem ser lidas na íntegra.

<br/>

## Quem constrói Zcash agora

O trabalho hoje está distribuído por organizações independentes, cada uma responsável por uma parte clara.

### As duas organizações da cisão de 2026

1. ZODL, o Zcash Open Development Lab, foi formado pela antiga equipa da Electric Coin Company e liderado por Josh Swihart. Angariou mais de vinte e cinco milhões de dólares junto de investidores externos e trabalha no desenvolvimento do protocolo central, incluindo o sistema de provas Halo 2 que alimenta as mais recentes transações shielded de Zcash, e na wallet ZODL, uma wallet móvel shielded por defeito anteriormente chamada Zashi. Veja [ZODL](https://zechub.wiki/zcash-organizations/zodl).
2. Sovright é uma organização sem fins lucrativos formada por três antigos membros do conselho da Bootstrap. Foca-se em ferramentas e apoio para o ecossistema, e construiu o Argos, uma ferramenta para ajudar os primeiros utilizadores a recuperar fundos presos numa wallet antiga e sem manutenção. Veja [Sovright](https://zechub.wiki/zcash-organizations/sovright).

### Administração do protocolo, investigação e software de nó

3. A Zcash Foundation mantém o Zebra, o nó em Rust que se torna o nó principal da rede à medida que o cliente mais antigo zcashd é retirado. Também administra a organização Zcash no GitHub, o site z.cash e a conta principal de Zcash no X, e colabora com a ZecHub para ajudar a gerir alguns desses ativos. Veja [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation).
4. Shielded Labs é uma organização sem fins lucrativos independente, financiada por donativos e sediada na Suíça. Foca-se na investigação e na sustentabilidade de longo prazo, incluindo o mecanismo de sustentabilidade da rede que financia o desenvolvimento futuro e o trabalho Crosslink sobre a adição de finalidade proof of stake a Zcash, e financiou a auditoria de segurança que descobriu a vulnerabilidade da pool Orchard em 2026. Veja [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs).
5. A Electric Coin Company continua a fazer parte da história como a organização que criou e lançou Zcash em 2016. Veja [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company).

### Escalabilidade e criptografia

6. Project Tachyon é um esforço de escalabilidade liderado pelo criptógrafo Sean Bowe. Propõe uma nova forma de as wallets sincronizarem com a blockchain, chamada sincronização oblivious, que reduz o tamanho das transações e, como efeito secundário, aproxima Zcash da privacidade pós-quântica. O seu trabalho está documentado em [tachyon.z.cash](https://tachyon.z.cash/).
7. O Valar Group é um laboratório de investigação e engenharia criptográfica que trabalha no protocolo Zcash para dinheiro digital privado, pós-quântico e escalável. Colabora de perto com Project Tachyon no trabalho de escalabilidade e de computação quântica. Mais sobre o seu trabalho em [valargroup.dev](https://valargroup.dev/).

### Organizações regionais e comunitárias

8. Obscura Labs é uma organização independente registada na Nigéria, focada em África e nos mercados emergentes, construindo infraestrutura e caminhos para a adoção. Veja [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs).

### Educação

9. ZecHub é um centro de educação descentralizado para Zcash. Os membros da comunidade trabalham em conjunto para criar, validar e promover conteúdos que ajudam as pessoas a compreender o ecossistema e a aprender como participar, através de tutoriais, documentação wiki, um podcast e uma newsletter semanal. A wiki que está agora a ler faz parte da ZecHub, e a Zcash Foundation colabora com ela para ajudar a gerir alguns recursos comunitários.

### Financiamento

10. Zcash Community Grants financia contribuidores independentes e projetos da comunidade a partir de uma porção da recompensa de bloco, distribuindo o trabalho por muitas equipas para lá das organizações centrais. Veja [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants).
11. A Financial Privacy Foundation apoia o ecossistema Zcash e projetos da comunidade. Veja [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation).

Todas estas organizações mantêm repositórios open source, pelo que o seu trabalho pode ser lido, verificado e desenvolvido por qualquer pessoa. E as organizações não contam a história toda. Muitas contribuições significativas vêm de indivíduos e de empresas contratadas financiadas através de bolsas, em vez de virem apenas das organizações centrais. Ao lado delas estão equipas de wallets, comunidades regionais, programadores independentes e investidores que detêm e apoiam ZEC sem construir o protocolo. A lista acima é a espinha dorsal, não o quadro completo.

<br/>

## Onde começar como recém-chegado

Que organização lhe importa depende do que quer fazer.

1. Para usar Zcash, precisa de uma wallet, por isso a ZODL e a sua wallet são um ponto de partida natural.
2. Para correr um nó ou compreender o software da rede, olhe para a Zcash Foundation e para o seu nó Zebra.
3. Para financiar um projeto ou contribuir com trabalho remunerado, olhe para Zcash Community Grants.
4. Para acompanhar a investigação e o futuro do protocolo, acompanhe Shielded Labs, Project Tachyon e o Valar Group.

<br/>

## Continue a aprender

Esta wiki existe para o ajudar a aprofundar, por isso o melhor passo seguinte é continuar a lê-la. Alguns bons tópicos a seguir para quem está a começar:

- [O que são ZEC e Zcash](https://zechub.wiki/start-here/what-is-zec-and-zcash) para os princípios básicos da rede e da moeda
- [Guia para Novos Utilizadores](https://zechub.wiki/start-here/new-user-guide) para um primeiro percurso de utilização de Zcash
- [Pools Shielded](https://zechub.wiki/using-zcash/shielded-pools) para perceber como Zcash mantém as transações privadas
- [O turnstile](https://zechub.wiki/zcash-tech/the-turnstile) para perceber como a oferta monetária permanece verificável
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) para a pool shielded para a qual a rede está a migrar
- [Atualizações de Rede](https://zechub.wiki/start-here/network-upgrades) para perceber como Zcash muda ao longo do tempo
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) para a criptografia por detrás da privacidade

Cada página remete para mais conteúdo, por isso pode seguir o fio até onde quiser.

<br/>

## Equívocos comuns

- Zcash não é possuído nem controlado por nenhuma empresa isolada, nenhuma organização sozinha pode alterar ou parar a rede
- A disputa de 2026 não afetou a rede, os fundos nem a privacidade, foi um desacordo organizacional, e o protocolo funcionou normalmente durante todo o processo
- A saída da equipa da Electric Coin Company não acabou com Zcash, o trabalho passou para novas organizações independentes
- Ter muitas organizações é uma força, não uma fraqueza, remove pontos únicos de falha e mantém o projeto resiliente
- Deter ou promover ZEC não é o mesmo que construir Zcash, investidores e divulgadores fazem parte da comunidade, mas são distintos das equipas que desenvolvem o protocolo

<br/>

## Páginas relacionadas

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - o laboratório de desenvolvimento formado pela antiga equipa da Electric Coin Company
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - a organização sem fins lucrativos formada por antigos membros do conselho da Bootstrap
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - administradora do protocolo e do nó Zebra
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - investigação e sustentabilidade do protocolo
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - a empresa que lançou Zcash em 2016
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - infraestrutura e adoção em África e mercados emergentes
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - financiamento para contribuidores independentes
