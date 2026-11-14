---
published: 2026-04-14
---

<a href="https://github.com/zechub/zechub/edit/main/site/Research/Dash_Zcash_Orchard_Integration.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Integração do Zcash Orchard ao Dash



## Introdução

Em fevereiro de 2026, a rede Dash anunciou a integração do pool blindado Orchard do Zcash à chain Dash Evolution. Essa foi uma das colaborações de privacidade cross-chain mais significativas no espaço das criptomoedas, já que o Dash adotou a criptografia de conhecimento zero de ponta do Zcash para complementar seu modelo de privacidade existente, baseado em CoinJoin. A integração valida a posição do Zcash como líder em tecnologia de privacidade e abre um novo capítulo para a colaboração de privacidade cross-chain.

Este artigo explica o que é o protocolo Orchard, como o Dash o está implementando, por que ele é importante para ambos os ecossistemas e o que ele sinaliza para o panorama mais amplo das moedas de privacidade.


## O que é o protocolo Zcash Orchard?

O Orchard é o pool blindado mais avançado do Zcash, ativado com a Network Upgrade 5 (NU5) em meados de 2022. Ele representa o ápice de anos de pesquisa criptográfica na Electric Coin Company (ECC) e na comunidade Zcash.

### Tecnologia central: Halo 2

O Orchard é construído sobre o sistema de provas **Halo 2**, uma implementação zk-SNARK de alto desempenho escrita em Rust. O Halo 2 trouxe dois grandes avanços:

- **Sem configuração confiável**: Os pools blindados anteriores do Zcash (Sprout e Sapling) dependiam de cerimônias de computação multipartidária para gerar parâmetros criptográficos. Se a aleatoriedade secreta ("lixo tóxico") dessas cerimônias não fosse destruída adequadamente, ela poderia, teoricamente, ser usada para criar tokens blindados falsificados. O Halo 2 elimina totalmente essa exigência por meio de uma técnica chamada **amortização aninhada**, que agrupa múltiplas instâncias de problemas difíceis ao longo de ciclos de curvas elípticas, de modo que as provas computacionais possam raciocinar sobre si mesmas.

- **Composição recursiva de provas**: Uma única prova pode atestar a correção de praticamente um número ilimitado de outras provas, comprimindo uma grande quantidade de computação em uma forma compacta e verificável. Isso é essencial para a escalabilidade e para futuras atualizações.

### Como funciona a privacidade do Orchard

Em uma transação tradicional de blockchain, o remetente, o destinatário e o valor ficam todos visíveis on-chain. Em uma transação blindada do Orchard, as provas de conhecimento zero garantem matematicamente que:

- A transação é válida (entradas são iguais às saídas, nenhum token é criado do nada)
- O remetente tem fundos suficientes
- Não ocorreu gasto duplo

Tudo isso é verificado **sem revelar** quem enviou os fundos, quem os recebeu ou quanto foi transferido. Como disse o CTO do Dash, Samuel Westrich, em vez de ocultar os rastros das transações por meio de mistura, as provas de conhecimento zero garantem que "não há rastro, para começo de conversa".

### Actions substituem entradas e saídas

O Orchard introduziu o conceito de **Actions** para substituir o modelo tradicional de entradas e saídas. Cada Action agrupa um gasto e uma saída, o que reduz a quantidade de metadados de transação expostos. Isso dificulta que observadores realizem análises de tráfego ou ataques heurísticos contra transações blindadas.


## O que é a chain Dash Evolution?

Para entender a integração, é importante entender a arquitetura do Dash.

### Arquitetura de duas chains

O Dash opera um sistema de duas chains:

- **Dash Core (camada 1)**: A blockchain original de prova de trabalho, protegida por mineradores e masternodes. É nela que vive o token nativo DASH e onde opera a mistura de privacidade CoinJoin.

- **Dash Evolution (camada de plataforma)**: Uma chain secundária construída ao lado da Core que oferece suporte a contratos inteligentes, aplicativos descentralizados e gerenciamento de identidade. A Evolution usa um mecanismo de consenso Tendermint modificado, chamado **Tenderdash**, e é validada por Evolution Masternodes que protegem as duas chains simultaneamente.

A chain Evolution é onde a integração do Orchard acontece. Essa escolha de design permite que o Dash introduza privacidade criptográfica avançada sem modificar a já comprovada chain Core.


## Como a integração funciona

### Arquitetura técnica

O Dash fez um fork do crate de código aberto Orchard Rust do Zcash e o adaptou para a chain Evolution. A integração segue uma estrutura de **pool de créditos protegido**:

1. **Bloqueio**: Os usuários bloqueiam seus ativos DASH na Dash Core
2. **Emissão**: Tokens "Credits" pareados são emitidos na chain Evolution
3. **Transferência**: Os Credits podem ser transferidos anonimamente usando as provas de conhecimento zero do Orchard, com remetente, destinatário e valor totalmente blindados
4. **Queima**: Os tokens são queimados na Evolution para resgatar os ativos DASH subjacentes na Core

Esse modelo é análogo a um *two-way peg* entre as chains Core e Evolution, mas com privacidade total de conhecimento zero para as transações no lado da Evolution.

### Implementação em fases

A integração está planejada em duas fases:

**Fase 1 (março de 2026, pendente de auditorias de cibersegurança):**
- Implantar pools blindados Orchard na chain Evolution
- Oferecer suporte a transferências blindadas básicas de Credits Dash entre partes
- Concluir auditorias de segurança independentes antes da ativação na mainnet

**Fase 2 (atualizações posteriores):**
- Estender os recursos de privacidade do Orchard a **ativos do mundo real tokenizados (RWAs)** emitidos na Evolution
- Permitir operações que preservam a privacidade em interações com DeFi e contratos inteligentes na plataforma
- Levar a blindagem de conhecimento zero a qualquer tipo de token, não apenas à moeda nativa

### Sincronização em dispositivos móveis

Uma barreira de usabilidade historicamente difícil para os sistemas de privacidade de conhecimento zero tem sido a sincronização lenta em dispositivos móveis. A equipe do Dash indicou que a arquitetura da Evolution pode permitir uma **sincronização mais rápida de dados blindados em dispositivos móveis**, o que seria uma melhoria significativa para os usuários do dia a dia. Esse trabalho está sendo validado no momento.


## Por que isso importa: CoinJoin vs. Orchard

### A privacidade existente do Dash: CoinJoin

O Dash tradicionalmente oferece privacidade por meio do **CoinJoin**, um mecanismo de mistura não custodiante. O CoinJoin funciona combinando as entradas e saídas de transações de vários usuários em uma única transação, o que torna difícil (mas não impossível) para observadores rastrear quais entradas correspondem a quais saídas.

O CoinJoin tem limitações:

- **Opcional**: Os usuários precisam ativar manualmente a mistura na carteira Dash Core
- **Ofuscação, não criptografia**: Os rastros das transações continuam existindo on-chain; eles apenas ficam mais difíceis de seguir
- **Suscetível a análises**: Com recursos e dados suficientes, empresas de análise de chain já demonstraram a capacidade de desanonimizar algumas transações CoinJoin
- **Conjunto de anonimato limitado**: A privacidade oferecida depende de quantos outros usuários estão misturando ao mesmo tempo

### O avanço qualitativo do Orchard

O Orchard representa uma abordagem fundamentalmente diferente da privacidade:

- **Garantias criptográficas**: A privacidade é assegurada pela matemática, não pelo comportamento coletivo
- **Sem rastro**: Não há rastros de transações para analisar, porque remetente, destinatário e valor nunca são gravados na chain em texto simples
- **Conjunto blindado maior**: Todas as transações Orchard compartilham um pool blindado comum, aumentando o conjunto de anonimato
- **Sem configuração confiável**: O sistema de provas Halo 2 elimina quaisquer suposições de confiança residuais

A integração não substitui o CoinJoin na Dash Core. Em vez disso, o Orchard oferece uma **camada criptográfica complementar** na chain Evolution, dando aos usuários do Dash a escolha entre a mistura leve do CoinJoin e a privacidade matemática das provas de conhecimento zero.


## O que isso significa para o Zcash

A integração do Dash traz implicações significativas para o ecossistema Zcash.

### Validação da tecnologia do Zcash

Quando outro grande projeto de criptomoeda adota a pilha criptográfica do Zcash, isso funciona como uma validação externa da maturidade, da segurança e da qualidade de design da tecnologia. Samuel Westrich, CTO do Dash Core Group, observou:

> "Eu me interesso pessoalmente pela tecnologia de provas ZK e por seus usos em blockchain desde os primeiros artigos, em 2014. Ao longo dos anos, temos acompanhado o Zcash. Com o lançamento mais recente do crate Orchard, sentimos que era um bom momento para investigar a adição da tecnologia à nossa chain Evolution, mais recente."

Ele acrescentou que "o Orchard é de código aberto e maduro; integrá-lo tem sido mais fácil do que o esperado".

### Expansão do ecossistema

O crate Orchard é distribuído sob as licenças de código aberto MIT e Apache 2.0. Cada integração feita por outro projeto amplia a base de usuários das primitivas criptográficas do Zcash, aumenta o número de desenvolvedores familiarizados com o código e pode levar a melhorias no projeto original que beneficiam o próprio Zcash.

### Reconhecimento cross-chain

A entrada do Dash na lista de projetos que usam o Halo 2 e o Orchard coloca o Zcash ao lado de projetos como Filecoin, Ethereum e diversas soluções de zkRollup que adotaram ou exploraram a tecnologia Halo 2. Esse ecossistema crescente fortalece os efeitos de rede em torno da pesquisa de privacidade do Zcash.

### O Zcash como padrão de privacidade

A integração posiciona a tecnologia do Zcash como um **padrão emergente do setor para a privacidade em blockchain**, assim como o TLS se tornou o padrão para a criptografia na web. Quando projetos concorrentes escolhem adotar as ferramentas do Zcash em vez de construir as suas próprias, isso demonstra a qualidade e a confiabilidade da ciência subjacente.


## Impacto mais amplo nas criptomoedas de privacidade

### A narrativa da privacidade

A integração chega em um período de interesse elevado por tecnologias de privacidade em todo o setor de criptomoedas. As moedas de privacidade tiveram altas de mais de 80% no início de 2026, impulsionadas pela crescente conscientização sobre a vigilância financeira e o valor da privacidade nas transações.

### Contexto regulatório

A integração também chega em um cenário de pressão regulatória sobre os tokens de privacidade. Em janeiro de 2026, a Autoridade de Serviços Financeiros de Dubai (DFSA) proibiu as corretoras de criptomoedas regulamentadas de vender tokens de privacidade, incluindo ZEC e XMR, a novos usuários. Embora a proibição não impeça os cidadãos de manter esses tokens, ela evidencia a tensão entre a privacidade dos usuários e a conformidade regulatória.

Integrações de privacidade cross-chain como Dash-Orchard podem influenciar a forma como os reguladores enxergam a tecnologia de privacidade. O fato de que recursos de privacidade podem ser adotados como componentes modulares por qualquer blockchain sugere que proibir tokens específicos pode ser menos eficaz do que se envolver com a tecnologia subjacente.

### Parcerias futuras

A integração do Dash abre um precedente para outros projetos de blockchain. Se o Orchard pode ser implantado com sucesso em uma chain com mecanismos de consenso e arquitetura diferentes, isso demonstra que a tecnologia de privacidade do Zcash é realmente portátil. Isso pode incentivar novas adoções em todo o ecossistema, incluindo:

- Redes de camada 2 em busca de recursos de privacidade
- Protocolos DeFi que querem blindar os dados das transações dos usuários
- Plataformas de ativos do mundo real que exigem transferências confidenciais
- Blockchains corporativas que precisam de privacidade em conformidade com a regulamentação


## Conclusão

A integração do protocolo Orchard do Zcash à chain Evolution do Dash representa um marco na colaboração de privacidade cross-chain. Para o Dash, ela significa um salto qualitativo do modelo de ofuscação do CoinJoin para as garantias de privacidade criptográfica do Orchard. Para o Zcash, ela confirma que os anos de pesquisa sobre o Halo 2 e o pool blindado Orchard produziram uma tecnologia robusta e madura o suficiente para ser adotada por outros grandes projetos.

Mais importante ainda, essa integração sinaliza que a privacidade nas criptomoedas não é uma competição de soma zero entre projetos. A tecnologia de privacidade de código aberto se beneficia de uma adoção mais ampla, de revisões mais abrangentes e do desenvolvimento compartilhado. À medida que o Orchard do Zcash se espalha pelo ecossistema blockchain, todo o espaço se aproxima de um futuro em que a privacidade financeira é o padrão, e não a exceção.


## Leitura complementar

- [Documentação do Halo 2](https://zcash.github.io/halo2/)
- [Crate Zcash Orchard (GitHub)](https://github.com/zcash/orchard)
- [Repositório Halo 2 GitHub](https://github.com/zcash/halo2)
- [Documentação da plataforma Dash Evolution](https://docs.dash.org/en/stable/)
- [Cointelegraph: Dash integra o pool de privacidade Zcash](https://cointelegraph.com/news/dash-integrates-z-cash-orchard-privacy)
- [HackerNoon: Dash leva a privacidade Zcash Orchard à chain Evolution](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions)
