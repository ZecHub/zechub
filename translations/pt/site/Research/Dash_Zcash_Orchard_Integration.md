---
published: 2026-04-14
---

<a href="https://github.com/zechub/zechub/edit/main/site/Research/Dash_Zcash_Orchard_Integration.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Integração do Dash com Orchard da Zcash



## Introdução

Em fevereiro de 2026, a rede Dash anunciou a integração da pool blindada Orchard da Zcash na chain Evolution do Dash. Isso marcou uma das colaborações de privacidade cross-chain mais significativas no espaço das criptomoedas, já que o Dash adotou a criptografia de ponta de conhecimento zero da Zcash para complementar seu modelo de privacidade existente baseado em CoinJoin. A integração valida a posição da Zcash como líder em tecnologia de privacidade e abre um novo capítulo para a colaboração de privacidade cross-chain.

Este artigo explica o que é o protocolo Orchard, como o Dash o está implementando, por que isso importa para ambos os ecossistemas e o que isso sinaliza para o cenário mais amplo das privacy coins.


## O que é o protocolo Zcash Orchard?

Orchard é a pool blindada mais avançada da Zcash, ativada com o Network Upgrade 5 (NU5) em meados de 2022. Ela representa o ápice de anos de pesquisa criptográfica na Electric Coin Company (ECC) e na comunidade da Zcash.

### Tecnologia central: Halo 2

Orchard é construído sobre o sistema de provas **Halo 2**, uma implementação de zk-SNARK de alto desempenho escrita em Rust. O Halo 2 introduziu dois grandes avanços:

- **Sem Trusted Setup**: As pools blindadas anteriores da Zcash (Sprout e Sapling) dependiam de cerimônias de computação multipartidária para gerar parâmetros criptográficos. Se a aleatoriedade secreta ("toxic waste") dessas cerimônias não fosse destruída adequadamente, ela poderia teoricamente ser usada para criar tokens blindados falsificados. O Halo 2 elimina completamente essa exigência por meio de uma técnica chamada **nested amortization**, que colapsa múltiplas instâncias de problemas difíceis ao longo de ciclos de curvas elípticas, para que provas computacionais possam raciocinar sobre si mesmas.

- **Composição recursiva de provas**: Uma única prova pode atestar a correção de praticamente um número ilimitado de outras provas, comprimindo uma grande quantidade de computação em uma forma compacta e verificável. Isso é essencial para escalabilidade e futuras atualizações.

### Como funciona a privacidade do Orchard

Em uma transação tradicional de blockchain, o remetente, o destinatário e o valor ficam todos visíveis on-chain. Em uma transação blindada do Orchard, provas de conhecimento zero garantem matematicamente que:

- A transação é válida (as entradas são iguais às saídas, nenhum token é criado do nada)
- O remetente possui fundos suficientes
- Nenhum gasto duplo ocorreu

Tudo isso é verificado **sem revelar** quem enviou os fundos, quem os recebeu ou quanto foi transferido. Como afirmou Samuel Westrich, CTO do Dash, em vez de obscurecer os rastros de transação por meio de mixing, as provas de conhecimento zero garantem que "não há rastro algum para começar."

### Actions substituem entradas e saídas

O Orchard introduziu o conceito de **Actions** para substituir o modelo tradicional de entrada/saída. Cada Action agrupa um gasto e uma saída, o que reduz a quantidade de metadados de transação vazados. Isso dificulta que observadores realizem análise de tráfego ou ataques heurísticos em transações blindadas.


## O que é a chain Evolution do Dash?

Para entender a integração, é importante compreender a arquitetura do Dash.

### Arquitetura de dupla chain

O Dash opera um sistema de dupla chain:

- **Dash Core (Camada 1)**: A blockchain original de proof-of-work, protegida por miners e masternodes. É onde o token nativo DASH existe e onde a mistura de privacidade CoinJoin opera.

- **Dash Evolution (Camada de Plataforma)**: Uma chain secundária construída ao lado do Core que oferece suporte a funcionalidades de smart contracts, aplicações descentralizadas e gerenciamento de identidade. A Evolution usa um mecanismo de consenso Tendermint modificado chamado **Tenderdash** e é validada por Evolution Masternodes que protegem ambas as chains simultaneamente.

A chain Evolution é onde a integração do Orchard acontece. Essa escolha de design permite que o Dash introduza privacidade criptográfica avançada sem modificar a comprovada chain Core.


## Como a integração funciona

### Arquitetura técnica

O Dash fez um fork do crate Rust Orchard open-source da Zcash e o adaptou para a chain Evolution. A integração segue uma estrutura de **protected credit pool**:

1. **Lock**: Os usuários bloqueiam seus ativos DASH no Dash Core
2. **Mint**: Tokens "Credits" atrelados são cunhados na chain Evolution
3. **Transfer**: Os Credits podem ser transferidos anonimamente usando as provas de conhecimento zero do Orchard, com remetente, destinatário e valor totalmente blindados
4. **Burn**: Os tokens são queimados na Evolution para resgatar os ativos DASH subjacentes no Core

Esse modelo é análogo a um two-way peg entre as chains Core e Evolution, mas com privacidade total de conhecimento zero para as transações no lado da Evolution.

### Implementação em fases

A integração está planejada em duas fases:

**Fase 1 (março de 2026, pendente de auditorias de cibersegurança):**
- Implantar pools blindadas Orchard na chain Evolution
- Oferecer suporte a transferências blindadas básicas de Dash Credits entre partes
- Conclusão de auditorias de segurança independentes antes da ativação na mainnet

**Fase 2 (atualizações subsequentes):**
- Estender os recursos de privacidade do Orchard a **ativos do mundo real tokenizados (RWAs)** emitidos na Evolution
- Permitir operações que preservam a privacidade para interações de DeFi e smart contracts na plataforma
- Levar blindagem de conhecimento zero para qualquer tipo de token, não apenas para a moeda nativa

### Sincronização móvel

Uma barreira histórica de usabilidade para sistemas de privacidade de conhecimento zero tem sido a sincronização lenta em dispositivos móveis. A equipe do Dash indicou que a arquitetura da Evolution pode possibilitar uma **sincronização móvel mais rápida de dados blindados**, o que seria uma melhoria significativa para usuários do dia a dia. Esse trabalho está atualmente em validação.


## Por que isso importa: CoinJoin vs. Orchard

### A privacidade existente do Dash: CoinJoin

Tradicionalmente, o Dash oferece privacidade por meio do **CoinJoin**, um mecanismo de mixing sem custódia. O CoinJoin funciona combinando entradas e saídas de transações de múltiplos usuários em uma única transação, dificultando (mas não impossibilitando) que observadores rastreiem quais entradas correspondem a quais saídas.

O CoinJoin tem limitações:

- **Opt-in**: Os usuários precisam ativar manualmente o mixing na carteira Dash Core
- **Ofuscação, não criptografia**: Os rastros de transação ainda existem on-chain; eles apenas ficam mais difíceis de seguir
- **Suscetível à análise**: Com recursos e dados suficientes, empresas de análise de chain demonstraram a capacidade de desanonimizar algumas transações CoinJoin
- **Conjunto de anonimato limitado**: A privacidade fornecida depende de quantos outros usuários estão fazendo mixing simultaneamente

### O avanço qualitativo do Orchard

O Orchard representa uma abordagem fundamentalmente diferente para a privacidade:

- **Garantias criptográficas**: A privacidade é imposta pela matemática, não pelo comportamento da multidão
- **Sem rastro**: Não há rastros de transação para analisar porque remetente, destinatário e valor nunca são gravados na chain em texto simples
- **Conjunto blindado maior**: Todas as transações Orchard compartilham uma pool blindada comum, aumentando o conjunto de anonimato
- **Sem trusted setup**: O sistema de provas Halo 2 elimina quaisquer pressupostos residuais de confiança

A integração não substitui o CoinJoin no Dash Core. Em vez disso, o Orchard fornece uma **camada criptográfica complementar** na chain Evolution, dando aos usuários do Dash a opção entre o mixing leve do CoinJoin e a privacidade matemática das provas de conhecimento zero.


## O que isso significa para a Zcash

A integração do Dash traz implicações significativas para o ecossistema da Zcash.

### Validação da tecnologia da Zcash

Quando outro grande projeto de criptomoeda adota a stack criptográfica da Zcash, isso serve como validação externa da maturidade, segurança e qualidade de design da tecnologia. Samuel Westrich, CTO do Dash Core Group, observou:

> "Tenho interesse pessoal na tecnologia de provas ZK e em seus usos em blockchain desde os primeiros artigos em 2014. Ao longo dos anos, temos acompanhado a Zcash. Com o lançamento mais recente do crate Orchard, sentimos que era um bom momento para investigar a adição da tecnologia à nossa chain Evolution mais recente."

Ele acrescentou que "Orchard é open source e maduro; integrá-lo foi mais fácil do que o esperado."

### Expansão do ecossistema

O crate Orchard é lançado sob as licenças open-source MIT e Apache 2.0. Cada integração por outro projeto expande a base de usuários dos primitivos criptográficos da Zcash, aumenta o número de desenvolvedores familiarizados com a base de código e potencialmente leva a melhorias upstream que beneficiam a própria Zcash.

### Reconhecimento cross-chain

A entrada do Dash na lista de projetos que usam Halo 2 e Orchard coloca a Zcash ao lado de projetos como Filecoin, Ethereum e múltiplas soluções zkRollup que adotaram ou exploraram a tecnologia Halo 2. Esse ecossistema em crescimento fortalece os efeitos de rede em torno da pesquisa de privacidade da Zcash.

### Zcash como padrão de privacidade

A integração posiciona a tecnologia da Zcash como um emergente **padrão da indústria para privacidade em blockchain**, assim como o TLS se tornou o padrão para criptografia na web. Quando projetos concorrentes escolhem adotar as ferramentas da Zcash em vez de construir as suas próprias, isso demonstra a qualidade e a confiabilidade da ciência subjacente.


## Impacto mais amplo nas criptomoedas de privacidade

### A narrativa da privacidade

A integração acontece durante um período de maior interesse em tecnologia de privacidade em toda a indústria de criptomoedas. As privacy coins registraram altas de mais de 80% no início de 2026, impulsionadas pela crescente conscientização sobre vigilância financeira e pelo valor da privacidade transacional.

### Contexto regulatório

A integração também ocorre em um cenário de pressão regulatória sobre tokens de privacidade. Em janeiro de 2026, a Financial Services Authority (DFSA) de Dubai proibiu exchanges reguladas de cripto de vender tokens de privacidade, incluindo ZEC e XMR, para novos usuários. Embora a proibição não impeça cidadãos de manter esses tokens, ela destaca a tensão entre privacidade do usuário e conformidade regulatória.

Integrações de privacidade cross-chain como Dash-Orchard podem influenciar a forma como reguladores enxergam a tecnologia de privacidade. O fato de que recursos de privacidade podem ser adotados como componentes modulares por qualquer blockchain sugere que proibir tokens específicos pode ser menos eficaz do que lidar com a tecnologia subjacente.

### Parcerias futuras

A integração do Dash estabelece um precedente para outros projetos de blockchain. Se o Orchard pode ser implantado com sucesso em uma chain com mecanismos de consenso e arquitetura diferentes, isso demonstra que a tecnologia de privacidade da Zcash é realmente portável. Isso pode incentivar novas adoções em todo o ecossistema, incluindo:

- Redes Layer-2 em busca de recursos de privacidade
- Protocolos DeFi que desejam blindar dados de transação dos usuários
- Plataformas de ativos do mundo real que exigem transferências confidenciais
- Blockchains empresariais que precisam de privacidade compatível com exigências regulatórias


## Conclusão

A integração do protocolo Orchard da Zcash na chain Evolution do Dash representa um marco na colaboração de privacidade cross-chain. Para o Dash, isso significa um salto qualitativo do modelo de ofuscação do CoinJoin para as garantias de privacidade criptográfica do Orchard. Para a Zcash, isso confirma que os anos de pesquisa em Halo 2 e na pool blindada Orchard produziram uma tecnologia robusta e madura o suficiente para ser adotada por outros grandes projetos.

Mais importante ainda, essa integração sinaliza que a privacidade em criptomoedas não é uma competição de soma zero entre projetos. A tecnologia de privacidade open-source se beneficia de adoção mais ampla, revisão mais abrangente e desenvolvimento compartilhado. À medida que o Orchard da Zcash se espalha pelo ecossistema de blockchain, todo o setor se aproxima de um futuro em que a privacidade financeira é o padrão, não a exceção.


## Leitura adicional

- [Documentação do Halo 2](https://zcash.github.io/halo2/)
- [Crate Orchard da Zcash (GitHub)](https://github.com/zcash/orchard)
- [Repositório GitHub do Halo 2](https://github.com/zcash/halo2)
- [Documentação da plataforma Dash Evolution](https://docs.dash.org/en/stable/)
- [Cointelegraph: Dash integra a pool de privacidade da Zcash](https://cointelegraph.com/news/dash-integrates-z-cash-orchard-privacy)
- [HackerNoon: Dash leva a privacidade Orchard da Zcash para a chain Evolution](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions)
