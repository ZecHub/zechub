# Como o Zcash é organizado

## Resumo

- O Zcash não é construído por uma única empresa, e sim por muitas organizações independentes, cada uma responsável por uma parte diferente do trabalho
- Durante a maior parte de sua história, duas organizações lideraram o desenvolvimento: a Electric Coin Company e a Zcash Foundation
- Em janeiro de 2026, toda a equipe da Electric Coin Company pediu demissão após uma disputa de governança, e o ecossistema se reorganizou em várias equipes independentes
- Hoje, o protocolo, o software de nó, as carteiras, a pesquisa, a escalabilidade e o financiamento estão a cargo de grupos separados
- Nenhuma organização controla sozinha o Zcash: a rede é de código aberto e sem permissão, e continuou funcionando normalmente durante todas as mudanças

<br/>

## Para quem é esta página

- Iniciantes que querem entender quem realmente constrói e mantém o Zcash
- Qualquer pessoa confusa com os muitos nomes de organizações no ecossistema
- Colaboradores decidindo com quem trabalhar ou para onde enviar uma proposta

<br/>

## Por que isso importa

Entender a estrutura facilita todo o resto. Ela mostra quem mantém o código do qual você depende, a quem recorrer para pedir um subsídio e quem é responsável pela parte da rede que mais interessa a você. Ela também revela uma das forças discretas do Zcash: como o trabalho está distribuído entre grupos independentes, não existe um ponto único de falha capaz de capturar ou paralisar o projeto.

Esta página é um mapa. Para cada organização que já tem uma página completa nesta wiki, você vai encontrar uma breve nota e um link para ler mais, em vez de uma repetição do que já está escrito lá.

<br/>

## Como funcionava antes

Durante a maior parte da história do Zcash, duas organizações estiveram à frente.

A Electric Coin Company lançou o Zcash em 2016 e empregava grande parte da equipe principal de desenvolvimento. Ela era supervisionada por Bootstrap, um conselho sem fins lucrativos criado para apoiar o Zcash. A Zcash Foundation atuava ao lado dela como uma organização sem fins lucrativos independente, dedicada à gestão do protocolo e à construção de um nó independente. As duas eram financiadas em grande parte por uma parcela da recompensa de bloco reservada para o desenvolvimento.

Essa estrutura de dois pilares se manteve por anos, mas dependia desse financiamento compartilhado e de as duas organizações continuarem alinhadas. À medida que o financiamento original do desenvolvimento evoluiu e seu futuro a longo prazo ficou menos certo, a questão de como pagar pelo trabalho contínuo ficou mais urgente. Essa questão do financiamento está por trás de boa parte do que mudou em seguida, e é um dos motivos pelos quais algumas equipes hoje captam capital externo enquanto outras dependem de subsídios.

<br/>

## A reorganização de 2026

Em janeiro de 2026, a estrutura mudou drasticamente. Em 7 de janeiro, o CEO da Electric Coin Company, Josh Swihart, anunciou no X que toda a equipe da empresa havia pedido demissão.

Bootstrap era uma organização sem fins lucrativos criada em 2020 para governar a Electric Coin Company, que havia se tornado sua subsidiária integral. O desacordo entre a equipe da empresa e esse conselho foi se acumulando ao longo do tempo e envolveu várias questões, entre elas o rumo da organização, a forma de financiar o desenvolvimento e o futuro da carteira Zashi, que a equipe queria transferir para uma empresa privada a fim de captar capital externo. Swihart descreveu a saída como uma "demissão construtiva", termo jurídico que significa que as condições foram alteradas de forma tão severa que o pedido de demissão foi, na prática, forçado, e afirmou que a maioria do conselho havia deixado de estar alinhada com a missão do Zcash.

O outro lado da história também importa, por uma questão de justiça. Bootstrap apresentou o conflito como uma questão de governança e de conformidade legal de uma organização sem fins lucrativos. Zooko Wilcox, fundador de Zcash, defendeu publicamente os membros do conselho citados na disputa, dizendo que havia trabalhado com eles por muitos anos e os considerava pessoas de grande integridade, mas deixando claro que não estava tomando partido no desacordo em si.

Dois pontos não estavam em disputa. Nenhuma das partes alegou qualquer conduta criminosa, então tratou-se de um desacordo corporativo e de governança, e não de um caso judicial. Além disso, a própria rede Zcash não foi afetada: ela permaneceu de código aberto, sem permissão, segura e totalmente operacional o tempo todo, um ponto que tanto Swihart quanto Wilcox enfatizaram aos usuários.

O que veio depois foi uma reorganização, e não um colapso. A antiga equipe da empresa fundou a ZODL mais tarde em 2026 e, separadamente, três ex-membros do conselho de Bootstrap fundaram a Sovright. O desenvolvimento se acomodou em um formato mais distribuído, entre várias equipes independentes.

As declarações descritas aqui foram feitas publicamente no X em 7 de janeiro de 2026 por Josh Swihart (@jswihart) e Zooko Wilcox (@zooko), onde as publicações originais podem ser lidas na íntegra.

<br/>

## Quem constrói o Zcash hoje

Hoje o trabalho está distribuído entre organizações independentes, cada uma responsável por uma parte bem definida.

### As duas organizações surgidas da separação de 2026

1. A ZODL, o Laboratório de Desenvolvimento Aberto do Zcash, foi fundada pela antiga equipe da Electric Coin Company e é liderada por Josh Swihart. Ela captou mais de vinte e cinco milhões de dólares de investidores externos e trabalha no desenvolvimento do protocolo principal, incluindo o sistema de provas Halo 2, que viabiliza as transações blindadas mais recentes do Zcash, e na carteira ZODL, uma carteira móvel blindada por padrão, antes chamada Zashi. Veja [ZODL](https://zechub.wiki/zcash-organizations/zodl).
2. A Sovright é uma organização sem fins lucrativos fundada por três ex-membros do conselho de Bootstrap. Ela se dedica a ferramentas e suporte para o ecossistema, e desenvolveu o Argos, uma ferramenta para ajudar os primeiros usuários a recuperar fundos presos em uma carteira antiga e sem manutenção. Veja [Sovright](https://zechub.wiki/zcash-organizations/sovright).

### Gestão do protocolo, pesquisa e software de nó

3. A Zcash Foundation mantém o Zebra, o nó Rust que se torna o nó principal da rede à medida que o cliente mais antigo, o zcashd, é aposentado. Ela também administra a organização Zcash no GitHub, o site z.cash e a conta principal do Zcash no X, e tem uma parceria com ZecHub para ajudar a gerenciar alguns desses ativos. Veja [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation).
4. A Shielded Labs é uma organização sem fins lucrativos independente, financiada por doações e sediada na Suíça. Ela se dedica à pesquisa e à sustentabilidade a longo prazo, incluindo o mecanismo de sustentabilidade da rede que financia o desenvolvimento futuro e o trabalho do Crosslink para adicionar finalidade por prova de participação ao Zcash, e financiou a auditoria de segurança que descobriu a vulnerabilidade no pool Orchard em 2026. Veja [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs).
5. A Electric Coin Company continua fazendo parte da história como a organização que criou e lançou o Zcash em 2016. Veja [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company).

### Escalabilidade e criptografia

6. O Projeto Tachyon é uma iniciativa de escalabilidade liderada pelo criptógrafo Sean Bowe. Ele propõe uma nova forma de as carteiras se sincronizarem com a blockchain, chamada "sincronização oblívia", que reduz o tamanho das transações e, como efeito colateral, leva o Zcash em direção à privacidade pós-quântica. Seu trabalho está documentado em [tachyon.z.cash](https://tachyon.z.cash/).
7. O Valar Group é um laboratório de pesquisa e engenharia em criptografia que trabalha no protocolo Zcash, voltado para dinheiro digital privado e pós-quântico em larga escala. Ele colabora de perto com o Projeto Tachyon no trabalho de escalabilidade e de computação quântica. Mais informações sobre seu trabalho estão em [valargroup.dev](https://valargroup.dev/).

### Organizações regionais e comunitárias

8. Obscura Labs é uma organização independente registrada na Nigéria, com foco na África e em mercados emergentes, que constrói infraestrutura e caminhos de adoção. Veja [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs).

### Educação

9. O ZecHub é um centro educacional descentralizado para o Zcash. Membros da comunidade trabalham juntos para criar, validar e divulgar conteúdo que ajuda as pessoas a entender o ecossistema e a aprender como participar, por meio de tutoriais, documentação na wiki, um podcast e uma newsletter semanal. A wiki que você está lendo agora faz parte do ZecHub, e a Zcash Foundation tem uma parceria com ele para ajudar a gerenciar alguns recursos da comunidade.

### Financiamento

10. A Zcash Community Grants financia colaboradores independentes e projetos comunitários com uma parcela da recompensa de bloco, distribuindo o trabalho entre muitas equipes além das organizações principais. Veja [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants).
11. A Financial Privacy Foundation apoia o ecossistema Zcash e projetos comunitários. Veja [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation).

Todas essas organizações mantêm repositórios de código aberto, então qualquer pessoa pode ler, verificar e dar continuidade ao trabalho delas. E as organizações não são a história toda. Muitas contribuições importantes vêm de indivíduos e de empresas contratadas financiadas por subsídios, e não apenas das organizações principais. Ao lado delas estão equipes de carteiras, comunidades regionais, desenvolvedores independentes e investidores que possuem e apoiam o ZEC sem construir o protocolo. A lista acima é a espinha dorsal, não o quadro completo.

<br/>

## Por onde começar se você é iniciante

A organização que importa para você depende do que você quer fazer.

1. Para usar o Zcash, você precisa de uma carteira, então ZODL e sua carteira são um ponto de partida natural.
2. Para rodar um nó ou entender o software da rede, procure a Zcash Foundation e seu nó Zebra.
3. Para financiar um projeto ou contribuir com trabalho remunerado, procure a Zcash Community Grants.
4. Para acompanhar a pesquisa e o futuro do protocolo, siga a Shielded Labs, o Projeto Tachyon e o Valar Group.

<br/>

## Continue aprendendo

Esta wiki existe para ajudar você a se aprofundar, então o melhor próximo passo é continuar lendo. Alguns bons temas para um iniciante seguir:

- [O que são ZEC e Zcash](https://zechub.wiki/start-here/what-is-zec-and-zcash), para o básico sobre a rede e a moeda
- [Guia do novo usuário](https://zechub.wiki/start-here/new-user-guide), para um primeiro passo a passo sobre como usar o Zcash
- [Pools blindados](https://zechub.wiki/using-zcash/shielded-pools), para entender como o Zcash mantém as transações privadas
- [A catraca](https://zechub.wiki/zcash-tech/the-turnstile), para entender como a oferta de moedas continua verificável
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood), para conhecer o pool blindado para o qual a rede está migrando
- [Atualizações da rede](https://zechub.wiki/start-here/network-upgrades), para entender como o Zcash muda ao longo do tempo
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks), para conhecer a criptografia por trás da privacidade

Cada página leva a outras, então você pode seguir o fio até onde quiser.

<br/>

## Equívocos comuns

- O Zcash não pertence a nenhuma empresa nem é controlado por ela: nenhuma organização sozinha pode alterar ou parar a rede
- A disputa de 2026 não afetou a rede, os fundos nem a privacidade: foi um desacordo organizacional, e o protocolo funcionou normalmente o tempo todo
- A saída da equipe da Electric Coin Company não acabou com o Zcash: o trabalho passou para novas organizações independentes
- Ter muitas organizações é uma força, não uma fraqueza: isso elimina pontos únicos de falha e mantém o projeto resiliente
- Possuir ou promover ZEC não é o mesmo que construir Zcash: investidores e divulgadores fazem parte da comunidade, mas são distintos das equipes que desenvolvem o protocolo

<br/>

## Páginas relacionadas

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - o laboratório de desenvolvimento fundado pela antiga equipe da Electric Coin Company
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - a organização sem fins lucrativos fundada por ex-membros do conselho de Bootstrap
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - gestora do protocolo e do nó Zebra
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - pesquisa e sustentabilidade do protocolo
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - a empresa que lançou o Zcash em 2016
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - infraestrutura e adoção na África e em mercados emergentes
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - financiamento para colaboradores independentes
