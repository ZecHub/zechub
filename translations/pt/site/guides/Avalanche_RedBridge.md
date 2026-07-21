# Zcash Avalanche RedBridge

A Zcash Avalanche RedBridge é uma ponte descentralizada que permite a interoperabilidade entre as blockchains Zcash (ZEC) e Avalanche (AVAX). Esta ponte foi projetada para facilitar a transferência contínua de ZEC para a blockchain Avalanche, aproveitando o alto rendimento, as baixas taxas e os mecanismos de consenso ecológicos da Avalanche, ao mesmo tempo em que preserva os recursos centrados em privacidade da Zcash.

A RedBridge oferece suporte a uma ampla variedade de casos de uso, incluindo finanças descentralizadas (DeFi) cross-chain, transações privadas e compartilhamento de liquidez, capacitando os detentores de Zcash com maior acessibilidade ao ecossistema Avalanche. Esta ponte é operada por meio de um conjunto de nós descentralizados e um oráculo, conhecido como **ZavaX**, que garante transferência confiável de dados e verificação de preços entre Zcash e Avalanche.

### Principais Recursos

Interoperabilidade com Preservação de Privacidade: Permite que usuários de Zcash mantenham a privacidade ao utilizar aplicações DeFi na Avalanche.
Oráculo Descentralizado ZavaX: Integra um sistema de oráculo para garantir dados precisos de preço ZEC/AVAX, permitindo operações cross-chain sem confiança.
Escalável e Ecológico: Utiliza o modelo de consenso da Avalanche, oferecendo transações de alta velocidade com impacto ambiental mínimo.
Suporte para DeFi e DApps: Os detentores de Zcash agora podem participar de várias plataformas DeFi na Avalanche sem comprometer a privacidade.

### Componentes Técnicos

**Oráculo Descentralizado ZavaX**
Descrição: O oráculo ZavaX é crucial para a ponte, fornecendo feeds de preços cross-chain e permitindo conversões sem confiança de ZEC para AVAX.
[Link para o Oráculo](https://zavax-oracle.red.dev)

**Contrato de Ponte Cross-Chain**
Descrição: A arquitetura de contrato inteligente que dá suporte à ponte Zcash Avalanche, gerenciando depósitos, conversões e saques de ZEC.

**Integração da Camada de Privacidade**
Descrição: Garante que os recursos de privacidade da Zcash sejam preservados durante todo o processo de ponte, permitindo transações privadas cross-chain.

## Entregáveis e Documentação

**Ponte Zcash Elastic Subnet na Avalanche**: [Proposta de Subsídio](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
Abaixo estão os principais entregáveis e recursos técnicos concluídos para o projeto Zcash Avalanche RedBridge:

Entregável 1.1: PoC preliminar que oferece suporte à consulta de transações Zcash na testnet a partir de uma subnet Avalanche de testnet com uma CLI, publicada no Github e com uma subnet de um nó na testnet da Avalanche. https://github.com/red-dev-inc/zavax-oracle

Entregável 2.1: [Arquitetura](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### Marco 3 31 de março de 2024

O Entregável 3.1 está concluído, apresentando nossa análise sobre a adoção de FROST em vez de BLS para assinaturas de limiar na ponte ZavaX. Essa mudança aproveita bibliotecas auditadas da Zcash Foundation e facilita melhor integração e segurança. https://github.com/ZcashFoundation/frost

Entregável 3.2 Design de UX e UI para GUI concluído, detalhando nossos aprimoramentos de segurança para a subnet do Oráculo ZavaX, com suporte dos resultados de testes de penetração. Para mais detalhes, incluindo configuração de servidor e resultados de testes [Avaliação de Segurança](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[Relatório de Auditoria](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
Além disso, a equipe fez o rebranding de ZavaX para redbridge e alterou nosso token de staking de ZAX para RBR.

### Marco 4 30 de abril de 2024
Entregável 4.1 Implantação totalmente funcional nas testnets de Zcash e Avalanche, com uma Subnet de 3 validadores, com suporte a CLI

### Marco 5 31 de maio de 2024
Entregável 5.1 GUI: integração da ponte no Core ou Webapp

Marco 6 30 de junho de 2024
Entregável 6.1 Aprovação bem-sucedida na auditoria de software
Entregável 6.2 Publicação do código-fonte auditado em um repositório público no Github

Dê uma olhada no [repositório do Github](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)
  
Para mais detalhes técnicos, os usuários são incentivados a revisar o repositório e a documentação do projeto RedBridge para [explorar](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/) os detalhes da integração, frameworks de teste e protocolos de segurança.


![img1](https://github.com/user-attachments/assets/b8c5d267-1711-458a-8a32-1df9d56fae8a)


* Entregáveis: 
No 1º trimestre de 2025, a equipe anunciou o lançamento do [site de demonstração do red·bridge](https://redbridge-demo.red.dev/index.html), onde qualquer pessoa pode experimentar a experiência do usuário, dar feedback e sugerir melhorias. Ele também serve como uma forma fácil de apresentar o projeto a pessoas não técnicas.

* A equipe usou Zebra para a versão final do red·bridge. Para testá-lo, eles atualizaram dois dos três nós em sua blockchain de teste, ZavaX Oracle, que roda na testnet Fuji da Avalanche. O último nó foi atualizado com sucesso, agora o [Zavax Oracle](https://zavax-oracle.red.dev/) agora roda em ZEBRA!

* No 1º trimestre de 2025, o site red.bridge foi programado para oferecer quatro visualizações: red, Dark, Light e Zebra, em vez da versão inicial, que era red.

* Outro ponto é que a equipe ativará a L1 do red·bridge ao vivo na mainnet da Avalanche em dezembro de 2025. Inicialmente, ela servirá como um oráculo para a blockchain Zcash e, logo depois, também para o Bitcoin. Nesse contexto, cada solicitação custará 0.001 AVAX em token de gas. Essa construção permitirá que qualquer L1 ou contrato inteligente na Avalanche consulte dados da Zcash e do Bitcoin de forma descentralizada e barata.

* No 2º trimestre, a equipe enviou um marco ACP-77 (conhecido como Avalanche9000) para a Avalanche Foundation para tornar a operação de um guardião do red.bridge mais antecipada e mais acessível para todos. Inicialmente, os validadores precisavam fazer stake de cerca de 2000 AVAX; no entanto, com os custos do Avalanche9000, os validadores precisavam de apenas 1 AVAX (mês). Além disso, esse marco também finaliza o plano de usar a implementação FROST da ZF, que dá a cada Guardião uma participação de assinatura para o controle seguro e distribuído da carteira da ponte.

* No 1º e 2º trimestres de 2026, o red.bridge hospedaria o airdrop de seu token RBR (anteriormente ZAX) para os membros das comunidades Zcash e Avalanche. De acordo com o fundador da red.dev, eles realizarão uma testnet incentivada na qual os usuários terão a chance de ganhar RBR enquanto ajudam a testar a ponte.
