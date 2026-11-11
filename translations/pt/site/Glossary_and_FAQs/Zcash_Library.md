# Biblioteca do Zcash

Um glossário abrangente de termos-chave, conceitos e recursos relacionados ao Zcash. Esta é a biblioteca central para consultar termos de notas de lançamento, tópicos de fóruns ou registros de alterações de carteiras.

### Navegação rápida
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| Termo | Definição |
|------|-----------|
| Actions | Em vez de criar várias provas individuais para cada Spend e Output, o protocolo Orchard as une em uma única Action. |
| Addresses | O Zcash tem endereços Shielded (zaddr) e Transparent (taddr). Os endereços Unified (UA) agrupam vários tipos de receiver para que uma carteira remetente possa escolher o melhor que ambas as partes suportam. Especificados em [ZIP 316](https://zips.z.cash/zip-0316). [Endereços Unified](/zcash-tech/unified-addresses) |
| Arborist Call | Uma chamada quinzenal que abrange atualizações sobre o protocolo do Zcash e o desenvolvimento de pesquisas. Realizada no Fórum da Comunidade Zcash e no Discord. [Notas da reunião](https://github.com/ZcashCommunityGrants/arboretum-notes) / [Anúncios no fórum](https://forum.zcashcommunity.com) |
| Auto-shielding | Permite que os usuários, mais especificamente suas carteiras, movam automaticamente fundos de um endereço transparente para o pool de ZEC blindado mais recente. |

## B

| Termo | Definição |
|------|-----------|
| Benchmarking | Os mineradores podem enviar métricas sobre a eficiência de vários equipamentos usados para minerar Zcash. [Veja aqui](https://zcashbenchmarks.info) |
| Block | Um Block é um registro na blockchain do Zcash que contém um conjunto de transações enviadas na rede. Aproximadamente a cada 75 segundos, em média, um novo bloco é acrescentado à blockchain. |
| Block Explorer | Uma ferramenta online para ver todas as transações, passadas e atuais, na blockchain. [Explorador de blocos do Zcash](https://zcashexplorer.app/) |
| Blogs | [ZODL Blog (anteriormente Electric Coin Co)](https://zodl.com/blog/) / [Zcash Foundation Blog](https://zfnd.org/blog/) / [ZecHub Newsletter](https://zechub.substack.com/) |
| Blossom | A 3ª grande atualização da rede do Zcash. [Mais informações](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| Termo | Definição |
|------|-----------|
| Canopy | A 5ª grande atualização da rede do Zcash. [Mais informações](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | Permite que alguém assuma um compromisso com um polinômio por meio de uma sequência curta que pode ser usada por um verificador para confirmar avaliações reivindicadas do polinômio comprometido. Útil para reduzir os custos de comunicação no protocolo do Zcash. |
| Community | [O Fórum oficial da comunidade Zcash](https://forum.zcashcommunity.com) / [Discord da comunidade Zcash](https://discord.com/channels/669694001464737815/669694001921654794) / [Discord de P&D do Zcash](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | Um modelo de consenso híbrido proposto que executaria proof-of-stake junto ao proof-of-work existente do Zcash. A Shielded Labs lidera o trabalho e mantém um protótipo no repositório `zebra-crosslink`. Atualmente, Crosslink não faz parte do Zcash. [Protocolo Crosslink](/zcash-tech/crosslink-protocol) |
| CrossPay | Um recurso da carteira ZODL que permite gastar ZEC blindado enquanto o destinatário recebe o pagamento no ativo e na chain que preferir, encaminhado por meio do NEAR Intents em vez de uma corretora centralizada. |
| Cypherpunk Zero | Um universo criativo e esforço colaborativo entre a ECC, o ilustrador Stranger Wolf, a Mighty Jaxx e parceiros selecionados do ecossistema. [Redes sociais do Cypherpunk Zero](https://x.com/cypherpunkZero) / [Coleção OpenSea](https://opensea.io/collection/cypherpunk-zero) |

## D

| Termo | Definição |
|------|-----------|
| DeFi | Projetos que integram ZEC com DeFi: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [NEAR Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [THORSwap](https://app.thorswap.finance/) |
| Deshielding | Refere-se a uma transação enviada de um zaddr (endereço blindado) para um taddr (endereço transparente). A origem da transação não é visível, mas os fundos entram em um pool de valor publicamente visível. |
| Developer Resources | [Recursos para desenvolvedores](https://www.zcashcommunity.com/developers/) |
| Documentation | [Documentação oficial](https://zcash.readthedocs.io/en/latest/) |

## E

| Termo | Definição |
|------|-----------|
| ECC | A Electric Coin Company, a equipe que lançou o protocolo do Zcash, anteriormente conhecida como Zcash Company. Toda a sua equipe de engenharia se demitiu em janeiro de 2026 após uma disputa de governança com o conselho da Bootstrap e passou a formar a ZODL. |
| ECDSA | Elliptic Curve Digital Signature Algorithm é um esquema de assinatura digital criptograficamente seguro. O algoritmo de assinatura/verificação ECDSA baseia-se na multiplicação de pontos em curvas elípticas. |
| Education | Vídeos educativos que explicam o Zcash [aqui](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | Um campo adicional para transações enviadas a endereços blindados que é visível ao destinatário de um pagamento. O memorando criptografado é visível apenas ao remetente e ao destinatário. |
| Equihash | O algoritmo de mineração proof-of-work orientado à memória usado no Zcash. |
| Events | O calendário de eventos relacionados ao Zcash pode ser consultado no [Luma](https://luma.com/zcash) e na [Zcash Foundation](https://zfnd.org/zf-events/) |
| Exchanges | [Lista de corretoras que oferecem suporte ao Zcash](https://z.cash/exchanges/) |

## F

| Termo | Definição |
|------|-----------|
| Fiat-Shamir | Uma técnica para pegar uma prova interativa de conhecimento e criar uma assinatura digital com base nela. Dessa forma, algum fato, por exemplo o conhecimento de um segredo, pode ser provado publicamente sem revelar as informações subjacentes. |
| Formal Verification | Provar matematicamente que um sistema se comporta exatamente como especificado, em vez de depender apenas de testes. O circuito Ironwood Action foi verificado dessa forma por colaboradores da zkSecurity e da ZODL usando o provador de teoremas Lean, para demonstrar a ausência de falhas de solidez. |
| Founders Reward | A recompensa dos fundadores representa 20 por cento da recompensa total por bloco e é deduzida do valor de cada bloco e distribuída de forma transparente para impulsionar o desenvolvimento e o crescimento do protocolo. |
| Free2Z | Uma ferramenta para conteúdo anônimo e doações privadas alimentada pelo Zcash. [Free2Z](https://free2z.com) |
| FROST | Esquema de assinatura Schnorr threshold flexível e otimizado por rodadas. [Artigo de pesquisa](https://eprint.iacr.org/2020/852) |

## G

| Termo | Definição |
|------|-----------|
| Governance | As decisões do processo ZIP são registradas na especificação do Zcash, assim como no software que executa a rede. As alterações são ratificadas on-chain quando a maioria da rede adota a atualização e não quebra o consenso. [Histórico completo do protocolo](https://zfnd.org/protocol-agreements-and-major-decisions/) |

## H

| Termo | Definição |
|------|-----------|
| Halo | Permite atualizações de circuitos sem a necessidade de configurações confiáveis, tornando o protocolo blindado do Zcash mais ágil para futuras melhorias e extensões. [Explicação técnica](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | As carteiras hierárquicas determinísticas geram uma série de pares de chaves a partir de uma seed, proporcionando conveniência e facilidade de gerenciamento, bem como alto nível de segurança. |
| Heartwood | A 4ª grande atualização da rede do Zcash. [Mais informações](https://z.cash/upgrade/heartwood/) |

## I

| Termo | Definição |
|------|-----------|
| Index | O Índice ZCX da CoinDesk representa uma taxa spot em tempo real, equivalente em USD, para o Zcash. [Índice de preço](https://www.coindesk.com/indices/zcx/) |
| Integrations | Você pode aceitar pagamentos em Zcash por meio de vários provedores terceirizados. [Processadores de pagamento](https://z.cash/zcash-for-business/) |
| Interactive Proof System | Uma máquina abstrata que modela a computação como a troca de mensagens entre duas partes: um Prover e um Verifier. |
| Investment | Há várias opções financeiras disponíveis para investidores institucionais ou family offices que desejam obter exposição ao Zcash. [Lista completa](https://z.cash/investors/) |
| Ironwood | Atualização da rede NU6.3, ativa na mainnet desde o bloco 3,428,143 em 28 de julho de 2026. Ironwood adiciona um novo pool blindado construído com base no circuito Orchard corrigido e sela o pool Orchard original, para que qualquer pessoa possa verificar que a oferta circulante é legítima. Suas regras de consenso estão especificadas em [ZIP 258](https://zips.z.cash/zip-0258). [Ironwood](/zcash-tech/ironwood) |

## J

| Termo | Definição |
|------|-----------|
| JubJub | Uma curva elíptica concebida para ser implementada de forma eficiente em circuitos zk-SNARK. |

## K

| Termo | Definição |
|------|-----------|
| Keystone Wallet | Uma carteira de hardware air-gapped com suporte nativo ao Zcash (Orchard blindado), compatível com ZODL para assinatura a frio. [Keystone](https://keyst.one) |

## L

| Termo | Definição |
|------|-----------|
| Layer-1 | Refere-se a uma rede de base e à sua infraestrutura subjacente. As blockchains Layer-1 podem validar e finalizar transações sem a necessidade de outra rede. O Zcash é uma blockchain L1. |
| librustzcash | Um workspace em Rust que contém todos os crates e dependências para trabalhar com o Zcash. [repo](https://github.com/zcash/librustzcash) |
| lightwalletd | Um servidor sem estado que fornece informações da blockchain a light clients. [lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| Termo | Definição |
|------|-----------|
| Metrics | As métricas da rede estão disponíveis [aqui](https://tokenterminal.com/explorer/projects/zcash/metrics/all) |
| Metadata | Dados gerados junto com a transação de Zcash de um usuário. Isso pode incluir altura do bloco, versão da transação ou altura de expiração etc. |
| Mobile SDK | Um SDK leve que conecta o Android ao Zcash, permitindo que apps Android de terceiros enviem e recebam transações blindadas. [GitHub](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | O processo em que, para cada bloco, os nós da rede do Zcash competem realizando cálculos matemáticos complexos para encontrar uma solução com base em uma dificuldade autoajustável. [Guia](https://z.cash/mining-zcash/) |
| Multisignature | Um endereço que requer múltiplas assinaturas de chave privada para gastar fundos. Atualmente, a funcionalidade multisig é suportada apenas por endereços transparentes. |

## N

| Termo | Definição |
|------|-----------|
| Network Sustainability Mechanism (NSM) | Uma proposta da Shielded Labs para queimar uma parte das taxas de transação, de modo que o orçamento de segurança de longo prazo do protocolo não dependa inteiramente da emissão. Especificada na ZIP 234, em revisão em 2026. |
| Nighthawk | Uma carteira móvel para o Zcash. [Website](https://nighthawkwallet.com) |
| Noir Wallet | Uma carteira de extensão de navegador para o Zcash, apoiada pela Zcash Community Grants, criada para conectar ZEC blindado diretamente a aplicativos no navegador, em vez de depender de códigos QR e transferências manuais. [zknoir.com](https://www.zknoir.com/) |
| NU5 | A 6ª grande atualização da rede do Zcash, que introduz o pool blindado Orchard e os Unified Addresses. [Mais informações](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | A 7ª grande atualização da rede do Zcash, que ajusta o subsídio por bloco para financiar o programa Zcash Community Grants e o Deferred Dev Fund Lockbox. Ativada no final de 2024. [Mais informações](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | A atualização da rede após Ironwood, prevista para a mainnet em 5 de novembro de 2026. De acordo com [ZIP 259](https://zips.z.cash/zip-0259), introduz blocos de 25 segundos (ZIP 218), o Network Sustainability Mechanism com reciclagem de taxas (ZIPs 235 e 237) e o fim das transações da versão 4, o que torna os fundos Sprout impossíveis de gastar (ZIP 2003). Não acrescenta nenhum novo formato de transação; Tachyon e Zcash Shielded Assets não fazem parte dela. |

## O

| Termo | Definição |
|------|-----------|
| Oblivious Synchronization | Um método em desenvolvimento no Project Tachyon que permite que uma carteira solicite os dados de que precisa a um servidor não confiável sem revelar sobre quais notes está pedindo informações. O servidor nunca aprende seus nulificadores, porque o protocolo faz com que evoluam de forma não vinculável. [Descrição](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard | O pool blindado introduzido na NU5. Ironwood o selou após a descoberta de uma falha de solidez, portanto você não pode mais enviar nem receber dentro do Orchard. Os fundos saem apenas pela catraca. [Pools blindados](/using-zcash/shielded-pools) |
| Overwinter | A 1ª atualização da rede do Zcash. [Mais informações](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| Termo | Definição |
|------|-----------|
| Payments | É possível usar o Zcash para compras do dia a dia por meio de vários provedores de pagamento diferentes. [Apps de pagamento](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | Um primitivo em que os dados viajam junto com uma prova de sua própria correção, de modo que combinar dados também combina as provas. O Projeto Tachyon reconstrói o protocolo blindado em torno de PCD, permitindo que cada carteira transporte uma prova recursiva de que seu próprio saldo está correto, em vez de reexaminar a chain. A implementação do Zcash é [Ragu](https://github.com/tachyon-zcash/ragu), que segue Halo e não necessita de configuração confiável. |
| Peer-to-Peer Network | As redes P2P baseiam-se no conceito de descentralização. A arquitetura fundamental da tecnologia blockchain. |
| PIR (Private Information Retrieval) | Técnicas que permitem buscar um registro de um servidor sem que ele saiba qual registro você solicitou. Estão em pesquisa ativa para o Zcash como uma forma de light clients obterem o que precisam sem revelar o que estão procurando. |
| Podcast | [Radiolab (Cerimônia do Zcash)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| Termo | Definição |
|------|-----------|
| QR Code | Um código legível por máquina usado para codificar endereços do Zcash para leitura fácil. Os Unified Addresses (UAs) são normalmente compartilhados por códigos QR nas carteiras modernas do Zcash. |
| Quantum Recoverability | Uma propriedade das notes Ironwood, especificada em [ZIP 2005](https://zips.z.cash/zip-2005), que mantém o registro on-chain de uma moeda recuperável se um futuro computador quântico quebrar a criptografia que a protege hoje. É um caminho de recuperação, e não resistência quântica, e aplica-se às notes Ironwood, não aos fundos existentes de Sprout, Sapling ou Orchard. |

## R

| Termo | Definição |
|------|-----------|
| Recovery Phrase | Uma sequência de 12 ou 24 letras e números usada para fazer backup e restaurar uma carteira. No Zcash, essa frase regenera chaves de gastos e chaves de visualização, tornando-a essencial para a recuperação de fundos e a segurança. |

## S

| Termo | Definição |
|------|-----------|
| Sapling | Uma grande atualização da rede que introduziu melhorias significativas de eficiência para transações blindadas e abriu caminho para a adoção móvel. Ativada no bloco 419200. |
| Selective Disclosure | Permite ao proprietário de um endereço blindado compartilhar seletivamente chaves de visualização ou divulgações de pagamento com terceiros, mantendo os dados privados de todos os outros. |
| Shielded Address | Também chamado de zaddr. Começa com z. Oculta remetente, destinatário, valor e memorando usando zk-SNARKs. |
| Shielded Labs | Uma organização independente que trabalha na economia do protocolo e no consenso do Zcash. Atualmente lidera o Crosslink e o Network Sustainability Mechanism. [GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | Uma transação exclusivamente entre endereços blindados. Totalmente privada na blockchain. |
| Sol/s | Soluções por segundo - mede o desempenho da mineração Equihash. |
| Spending Key | A chave privada que permite gastar a partir de um endereço blindado (também permite ver o saldo e o histórico). |
| Sprout | A versão original blindada do protocolo do Zcash (lançada em 2016). |

## T

| Termo | Definição |
|------|-----------|
| Tachyon | O programa de escalabilidade do Zcash. Não faz parte da NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) e não tem data de ativação. Afasta as carteiras da análise de cada bloco, em direção a um estado de carteira com provas, sincronização oblivious e estado de nó que pode ser removido, com o objetivo de alcançar milhares de transações blindadas por segundo. [Site do projeto](https://tachyon.z.cash/overview/) |
| TAZ | Testnet do Zcash (moeda de teste sem valor). |
| Testnet | Uma blockchain separada para testar atualizações e funcionalidades antes da mainnet. |
| Trailing Finality Layer (TFL) | Pesquisa sobre a adição de uma camada de finalidade por trás da chain proof-of-work do Zcash, para que blocos recentes possam ser finalizados sem substituir a mineração. Crosslink é o design que resultou desse trabalho. |
| Transaction | Um pagamento entre usuários, enviado à rede e eventualmente confirmado em um bloco. |
| Transaction Expiry | As transações expiram após aproximadamente 25 minutos (20 blocos) se não forem confirmadas; os fundos retornam automaticamente. |
| Transaction Fee | A taxa padrão é 0.0001 ZEC. Taxas mais altas recebem prioridade; taxas muito baixas podem causar atrasos ou expiração. |
| Transparent Address | Também chamado de taddr. Começa com t. Totalmente público (como o Bitcoin). |
| Transparent Transaction | Uma transação exclusivamente entre endereços transparentes - tudo é publicamente visível. |
| Turnstile | A regra contábil que acompanha quanto valor entra e sai de cada pool blindado, para que nenhum pool possa liberar mais do que recebeu. Foi usada em todas as transições de pool na história do Zcash e está atualmente protegendo a migração de Orchard para Ironwood. [Mais informações](/zcash-tech/the-turnstile) |

## U

| Termo | Definição |
|------|-----------|
| Unified Address | Formato de endereço moderno (introduzido na NU5) que funciona tanto para pagamentos transparentes quanto blindados em uma única string. |
| Upgrade Activation | A altura de bloco específica em que uma atualização da rede (por exemplo, NU5, NU6) é ativada automaticamente. |

## V

| Termo | Definição |
|------|-----------|
| Viewing Key | Uma chave privada que permite ver o saldo e o histórico de transações de um endereço blindado sem poder gastar os fundos. |

## W

| Termo | Definição |
|------|-----------|
| Wallet | Software ou hardware que armazena chaves privadas e permite enviar/receber ZEC. As carteiras ativas incluem ZODL (iOS/Android), Zingo! (mobile/desktop), Nighthawk (Android), Zkool (mobile/desktop), Zallet (em breve) e Keystone (hardware). Para uma lista completa, veja [Carteiras do ecossistema Zcash](https://z.cash/ecosystem/?wallets=#tag-wallets) |
| WebZjs | O primeiro SDK JavaScript para Zcash, desenvolvido pela ChainSafe para ambientes de navegador. Está na base do snap Zcash Shielded Wallet que levou ZEC blindado ao MetaMask. |

## X

| Termo | Definição |
|------|-----------|
| XZC | Um símbolo de ticker antigo para o Zcash usado em algumas corretoras legadas. O ticker oficial é ZEC. |

## Y

| Termo | Definição |
|------|-----------|
| YWallet | Uma carteira do Zcash focada em privacidade, com suporte para Orchard, Sapling e endereços transparentes, conhecida pela sincronização rápida. Não é mais mantida: seu desenvolvedor confirmou que não será atualizada para Ironwood, então não consegue mais acompanhar a rede. Zkool, do mesmo desenvolvedor, é a sucessora mantida. |

## Z

| Termo | Definição |
|------|-----------|
| Zcash | Criptomoeda focada em privacidade que usa zk-SNARKs. Faz a ponte entre pagamentos transparentes (estilo Bitcoin) e pagamentos totalmente blindados. |
| Zcash Foundation | Organização sem fins lucrativos independente que apoia o ecossistema do Zcash, financia o desenvolvimento e promove a privacidade. |
| Zcash Network | Rede peer-to-peer de nós que valida transações e mantém a blockchain. |
| ZEC | O código oficial da moeda do Zcash (algumas corretoras ainda mostram XZC). |
| Z3 stack | Os três programas que, em conjunto, substituem o zcashd: Zebra para o nó, Zaino para indexação, Zallet para a carteira. [Z3 stack](/zcash-tech/z3-stack) |
| Zerocash | O protocolo acadêmico (2014) no qual o Zcash se baseia. |
| Zaino | Um indexador que fornece dados de carteira a partir de um nó Zebra, escrito em Rust pela Zingo Labs. Assume o trabalho de indexação que o zcashd realizava para carteiras light. [Zaino](/zcash-tech/zaino) |
| Zakura | Um nó integral separado do Zcash, desenvolvido para escalabilidade, liderado por Sean Bowe e Dev Ojha. Sincroniza mais rápido, remove blocos nativamente e pode executar o zcashd sobre si mesmo para softwares que ainda dependem dele. [Nó Zakura](/zcash-tech/zakura-node) |
| Zallet | A carteira que substitui a carteira zcashd. Mova uma `wallet.dat` existente em vez de começar do zero. [Zallet](/zcash-tech/zallet) e a [referência rápida da Zallet](/using-zcash/zallet-quick-reference-guide) |
| Zebra | O nó integral que substitui o zcashd, mantido pela Zcash Foundation. Execute-o se precisar de um nó de validação. [Nó integral Zebra](/zcash-tech/zebra-full-node) |
| zcashd | O nó integral e a carteira originais do Zcash, agora descontinuados. A versão 6.20.0 foi encerrada no bloco 3417100 em 18 de julho de 2026 e nunca teve suporte para NU6.3. Em vez disso, execute a Z3 stack ou o Zakura. [Guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet) |
| ZIP | Zcash Improvement Proposal - o processo de governança da comunidade usado para propor e ratificar alterações ao protocolo. [Repositório ZIP](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab. A organização independente fundada no início de 2026 por Josh Swihart e pela antiga equipe de engenharia da Electric Coin Company, após renunciarem devido a uma disputa de governança com a Bootstrap. Arrecadou mais de 25 milhões de dólares em financiamento seed em março de 2026 e mantém a carteira ZODL, que foi renomeada de Zashi em fevereiro de 2026. [zodl.com](https://zodl.com) |
| zk-SNARKs | Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge — a criptografia que impulsiona as transações blindadas do Zcash. Permite provar uma afirmação (por exemplo, um gasto válido) sem revelar nenhuma informação secreta. |
| ZSA (Zcash Shielded Assets) | Tokens emitidos por usuários que herdam a privacidade blindada do Zcash, permitindo que ativos além de ZEC se movam de forma privada na rede. Especificados na [ZIP 226](https://zips.z.cash/zip-0226). Não fazem parte da NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) e não têm data de ativação. |

---

**Última atualização:** outubro de 2026
**Quer contribuir?** [Edite esta página no GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
