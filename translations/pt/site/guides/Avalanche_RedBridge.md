# Zcash Avalanche RedBridge

A Zcash Avalanche RedBridge é uma ponte descentralizada que permite a interoperabilidade entre as blockchains Zcash (ZEC) e Avalanche (AVAX). Essa ponte foi projetada para facilitar a transferência fluida de ZEC para a blockchain Avalanche, aproveitando o alto throughput, as baixas taxas e os mecanismos de consenso ecológicos do Avalanche, enquanto preserva os recursos centrados em privacidade do Zcash.

A RedBridge suporta uma ampla variedade de casos de uso, incluindo finanças descentralizadas (DeFi) cross-chain, transações privadas e compartilhamento de liquidez, dando aos detentores de Zcash maior acesso ao ecossistema Avalanche. Essa ponte é operada por meio de um conjunto de nós descentralizados e de um oráculo, conhecido como **ZavaX**, que garante a transferência confiável de dados e a verificação de preços entre Zcash e Avalanche.

### Principais recursos

Interoperabilidade com preservação da privacidade: permite que os usuários de Zcash mantenham a privacidade enquanto usam aplicações DeFi no Avalanche.
Oráculo descentralizado ZavaX: integra um sistema de oráculo para garantir dados de preço ZEC/AVAX precisos, permitindo operações cross-chain sem necessidade de confiança.
Escalável e ecológica: usa o modelo de consenso do Avalanche, oferecendo transações de alta velocidade com impacto ambiental mínimo.
Suporte a DeFi e DApps: os detentores de Zcash agora podem participar de diversas plataformas DeFi no Avalanche sem abrir mão da privacidade.

### Componentes técnicos

**ZavaX Oracle descentralizado**
Descrição: o ZavaX Oracle é essencial para a ponte, fornecendo feeds de preços cross-chain e permitindo conversões de ZEC para AVAX sem necessidade de confiança.
[Link para o oráculo](https://zavax-oracle.red.dev)

**Contrato da ponte cross-chain**
Descrição: a arquitetura de contratos inteligentes que suporta a ponte Zcash Avalanche, gerenciando depósitos, conversões e saques de ZEC.

**Integração da camada de privacidade**
Descrição: garante que os recursos de privacidade do Zcash sejam preservados durante todo o processo de transferência pela ponte, permitindo transações cross-chain privadas.

## Entregas e documentação

**Ponte de sub-rede elástica Zcash no Avalanche**: [Proposta de subsídio](https://forum.zcashcommunity.com/t/zcash-elastic-subnet-bridge-on-avalanche/44220)
Abaixo estão as principais entregas e os recursos técnicos concluídos para o projeto Zcash Avalanche RedBridge:

Entrega 1.1: PoC preliminar que permite consultar transações de Zcash na testnet a partir de uma sub-rede Avalanche na testnet com uma CLI, publicada no GitHub e com uma sub-rede de um nó na testnet do Avalanche. https://github.com/red-dev-inc/redbridge-oracle

Entrega 2.1: [Arquitetura](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)


### Marco 3, 31 de março de 2024

A entrega 3.1 foi concluída, apresentando nossa análise sobre a adoção de FROST em vez de BLS para assinaturas de limiar na ponte ZavaX. Essa mudança aproveita bibliotecas auditadas da Zcash Foundation e proporciona melhor integração e segurança. https://github.com/ZcashFoundation/frost

Entrega 3.2: design de UX e UI para a GUI concluído, detalhando nossas melhorias de segurança para a sub-rede ZavaX Oracle, respaldadas por resultados de testes de penetração. Para mais detalhes, incluindo a configuração do servidor e os resultados dos testes, veja [Avaliação de segurança](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/deployment-notes.md)
[Relatório de auditoria](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/pen-testing-report-2024-09.md)
Além disso, a equipe mudou o nome de ZavaX para redbridge e trocou nosso token de staking de ZAX para RBR.

### Marco 4, 30 de abril de 2024
Entrega 4.1: implantação totalmente funcional nas testnets do Zcash e do Avalanche, com uma sub-rede de 3 validadores e suporte a CLI

### Marco 5, 31 de maio de 2024
Entrega 5.1: GUI: integração da ponte ao Core ou a um webapp

Marco 6, 30 de junho de 2024
Entrega 6.1: aprovação na auditoria de software
Entrega 6.2: publicação do código-fonte auditado em um repositório público no GitHub

Dê uma olhada no [repositório GitHub](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)
  
Para mais detalhes técnicos, os usuários são incentivados a revisar o repositório e a documentação do projeto RedBridge para [explorar](https://github.com/red-dev-inc/red-bridge) os detalhes da integração, os frameworks de teste e os protocolos de segurança.


![img1](/content-images/b8c5d267-1711-458a-8a32-1df9d56fae8a-a93ff66932.webp)


* Entregas: 
No 1º trimestre de 2025, a equipe anunciou o lançamento do [site de demonstração red·bridge](https://redbridge-demo.red.dev/index.html), onde qualquer pessoa pode experimentar a experiência do usuário, dar feedback e sugerir melhorias. Ele também serve como uma forma fácil de apresentar o projeto a pessoas sem conhecimento técnico.

* A equipe usou Zebra na versão final do red·bridge. Para testá-lo, eles atualizaram dois dos três nós da blockchain de teste, ZavaX Oracle, que roda na testnet Fuji do Avalanche. O último nó foi atualizado com sucesso e agora [ZavaX Oracle](https://web.archive.org/web/20260823181644/https://zavax-oracle.red.dev/) roda no Zebra!

* No 1º trimestre de 2025, o site da red.bridge foi programado para oferecer quatro visualizações: red, Dark, Light e Zebra, ao contrário da versão inicial, que era só red.

* Outro ponto é que a equipe ativará a L1 red·bridge ao vivo na mainnet do Avalanche em dezembro de 2025. Inicialmente, ela servirá como oráculo para a blockchain Zcash e, logo depois, também para o Bitcoin. Cada requisição custará 0,001 AVAX em token de gas. Essa versão permitirá que qualquer L1 ou contrato inteligente no Avalanche consulte dados do Zcash e do Bitcoin de forma barata e descentralizada.

* No 2º trimestre, a equipe enviou um marco referente à ACP-77 (conhecida como Avalanche9000) à Avalanche Foundation, para tornar a operação de um guardião da red.bridge mais cedo possível e mais acessível para todos. Inicialmente, os validadores precisavam fazer staking de cerca de 2000 AVAX; no entanto, com os custos do Avalanche9000, os validadores passaram a precisar de apenas 1 AVAX (por mês). Além disso, esse marco também finaliza o plano de usar a implementação de FROST da ZF, que dá a cada guardião uma parte de assinatura para o controle seguro e distribuído da carteira da ponte.

* No 1º e no 2º trimestres de 2026, a red.bridge realizará o airdrop do seu token RBR (antigo ZAX) para os membros das comunidades Zcash e Avalanche. Segundo o fundador da red.dev, eles realizarão uma testnet incentivada, na qual os usuários terão a chance de ganhar RBR enquanto ajudam a testar a ponte.
