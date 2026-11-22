# Biblioteca Zcash

Um glossário abrangente de termos, conceitos e recursos importantes relacionados ao Zcash. Esta é a biblioteca única para consultar termos de notas de versão, tópicos do fórum ou changelogs de carteiras.

### Navegação rápida
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| Termo | Definição |
|------|-----------|
| Actions | Em vez de criar várias provas individuais para cada Spend e Output, o protocolo Orchard as combina em uma única Action. |
| Addresses | O Zcash tem endereços blindados (zaddr) e transparentes (taddr). Endereços unificados (UA) agrupam vários tipos de receptores para que a carteira que envia possa escolher o melhor que ambos os lados suportam. Especificados na [ZIP 316](https://zips.z.cash/zip-0316). [Endereços unificados](/zcash-tech/unified-addresses) |
| Arborist Call | Uma chamada quinzenal com atualizações sobre o desenvolvimento do protocolo e as pesquisas do Zcash. Realizada no Fórum da Comunidade Zcash e no Discord. [Notas das reuniões](https://github.com/ZcashCommunityGrants/arboretum-notes) / [Anúncios no fórum](https://forum.zcashcommunity.com) |
| Auto-shielding | Permite que os usuários (mais especificamente, suas carteiras) movam automaticamente fundos de um endereço transparente para o pool ZEC blindado mais recente. |

## B

| Termo | Definição |
|------|-----------|
| Benchmarking | Os mineradores podem enviar métricas sobre a eficiência de vários hardwares usados para minerar Zcash. [Veja aqui](https://zcashbenchmarks.info) |
| Block | Um bloco é um registro na blockchain do Zcash que contém um conjunto de transações enviadas na rede. A cada 25 segundos, em média, um novo bloco é adicionado à blockchain (75 segundos antes da ativação da NU7 em novembro de 2026). |
| Block Explorer | Uma ferramenta online para visualizar todas as transações, passadas e atuais, na blockchain. [Explorador de blocos Zcash](https://zcashexplorer.app/) |
| Blogs | [Blog ZODL (anteriormente Electric Coin Co)](https://zodl.com/blog/) / [Blog Zcash Foundation](https://zfnd.org/blog/) / [Newsletter ZecHub](https://zechub.substack.com/) |
| Blossom | A 3ª grande atualização da rede do Zcash. [Mais informações](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| Termo | Definição |
|------|-----------|
| Canopy | A 5ª grande atualização da rede do Zcash. [Mais informações](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | Permite que quem se compromete assuma um compromisso com um polinômio por meio de uma string curta, que pode ser usada por um verificador para confirmar as avaliações declaradas do polinômio comprometido. Útil para reduzir os custos de comunicação no protocolo Zcash. |
| Community | [Fórum oficial da comunidade Zcash](https://forum.zcashcommunity.com) / [Discord da comunidade Zcash](https://discord.com/channels/669694001464737815/669694001921654794) / [Discord de P&D Zcash](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | Um design de consenso híbrido proposto, que executaria prova de participação junto com a prova de trabalho já existente do Zcash. A Shielded Labs lidera o trabalho e opera uma rede de testes, a Feature Net, a partir do repositório `crosslink_monolith`. O repositório do protótipo anterior `zebra-crosslink` foi desativado em novembro de 2026. O Crosslink não faz parte do Zcash hoje. [Crosslink protocolo](/zcash-tech/crosslink-protocol) |
| CrossPay | Um recurso da carteira ZODL que permite gastar ZEC blindado enquanto o destinatário recebe no ativo e na chain de sua preferência, com roteamento via NEAR Intents em vez de uma corretora centralizada. |
| Cypherpunk Zero | Um universo criativo e um esforço colaborativo entre ECC, o ilustrador Stranger Wolf, a Mighty Jaxx e parceiros selecionados do ecossistema. [Redes sociais do Cypherpunk Zero](https://x.com/cypherpunkZero) / [Coleção OpenSea](https://opensea.io/collection/cypherpunk-zero) |

## D

| Termo | Definição |
|------|-----------|
| DeFi | Projetos que integram o ZEC com DeFi: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [NEAR Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [THORSwap](https://app.thorswap.finance/) |
| Deshielding | Refere-se a uma transação enviada de um zaddr (endereço blindado) para um taddr (endereço transparente). A origem da transação não é visível, mas os fundos entram em um pool de valor visível publicamente. |
| Developer Resources | [Recursos para desenvolvedores](https://www.zcashcommunity.com/developers/) |
| Documentation | [Documentação oficial](https://zcash.readthedocs.io/en/latest/) |

## E

| Termo | Definição |
|------|-----------|
| ECC | A Electric Coin Company, a equipe que lançou o protocolo Zcash, anteriormente conhecida como Zcash Company. Toda a sua equipe de engenharia pediu demissão em janeiro de 2026, após uma disputa de governança com o conselho da Bootstrap, e passou a formar a ZODL. |
| ECDSA | O Elliptic Curve Digital Signature Algorithm é um esquema de assinatura digital criptograficamente seguro. O algoritmo de assinatura/verificação ECDSA se baseia na multiplicação de pontos em curvas elípticas. |
| Education | Vídeos educativos que explicam o Zcash [aqui](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | Um campo adicional em transações enviadas para endereços blindados que fica visível para o destinatário de um pagamento. O memorando criptografado é visível apenas para o remetente e o destinatário. |
| Equihash | O algoritmo de mineração de prova de trabalho orientado à memória usado no Zcash. |
| Events | O calendário de eventos relacionados ao Zcash pode ser visto no [Luma](https://luma.com/zcash) e no [Zcash Foundation](https://zfnd.org/zf-events/) |
| Exchanges | [Lista de corretoras que suportam o Zcash](https://z.cash/exchanges/) |

## F

| Termo | Definição |
|------|-----------|
| Fiat-Shamir | Uma técnica para transformar uma prova interativa de conhecimento em uma assinatura digital. Dessa forma, um fato (por exemplo, o conhecimento de um segredo) pode ser provado publicamente sem revelar as informações subjacentes. |
| Formal Verification | Provar matematicamente que um sistema se comporta exatamente como especificado, em vez de depender apenas de testes. O circuito Action do Ironwood foi verificado dessa forma por colaboradores da zkSecurity e da ZODL usando o provador de teoremas Lean, para demonstrar a ausência de bugs de solidez. |
| Founders Reward | A recompensa dos fundadores representa 20 por cento da recompensa total de bloco. Ela é deduzida do valor de cada bloco e distribuída de forma transparente para impulsionar o desenvolvimento e o crescimento do protocolo. |
| Free2Z | Uma ferramenta para conteúdo anônimo e doações privadas, com tecnologia do Zcash. [Free2Z](https://free2z.com) |
| FROST | Esquema de assinatura com limiar Schnorr flexível e otimizado em rodadas. [Artigo de pesquisa](https://eprint.iacr.org/2020/852) |

## G

| Termo | Definição |
|------|-----------|
| Governance | As decisões do processo ZIP são registradas na especificação do Zcash, bem como no software que executa a rede. As mudanças são ratificadas on-chain quando a maioria da rede adota a atualização sem quebrar o consenso. [Histórico completo do protocolo](https://zfnd.org/protocol-agreements-and-major-decisions/) |

## H

| Termo | Definição |
|------|-----------|
| Halo | Permite atualizações de circuitos sem a necessidade de configurações confiáveis, tornando o protocolo blindado do Zcash mais ágil para futuras melhorias e extensões. [Explicação técnica](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | Carteiras hierárquicas determinísticas geram uma série de pares de chaves a partir de uma única seed, oferecendo praticidade e facilidade de gerenciamento, além de um alto nível de segurança. |
| Heartwood | A 4ª grande atualização da rede do Zcash. [Mais informações](https://z.cash/upgrade/heartwood/) |

## I

| Termo | Definição |
|------|-----------|
| Index | O índice ZCX da CoinDesk representa uma cotação spot em tempo real, equivalente em USD, para o Zcash. [Índice de preços](https://www.coindesk.com/indices/zcx/) |
| Integrations | Você pode aceitar pagamentos em Zcash por meio de vários provedores terceirizados. [Processadores de pagamento](https://z.cash/zcash-for-business/) |
| Interactive Proof System | Uma máquina abstrata que modela a computação como a troca de mensagens entre duas partes: um provador e um verificador. |
| Investment | Várias opções financeiras estão disponíveis para investidores institucionais ou family offices que desejam ter exposição ao Zcash. [Lista completa](https://z.cash/investors/) |
| Ironwood | Atualização da rede NU6.3, ativa na mainnet desde o bloco 3.428.143, em 28 de julho de 2026. O Ironwood adiciona um novo pool blindado construído sobre o circuito Orchard corrigido e sela o pool Orchard original, para que qualquer pessoa possa verificar que a oferta circulante é honesta. Suas regras de consenso são especificadas na [ZIP 258](https://zips.z.cash/zip-0258). [Ironwood](/zcash-tech/ironwood) |

## J

| Termo | Definição |
|------|-----------|
| JubJub | Uma curva elíptica projetada para ser implementada de forma eficiente em circuitos zk-SNARK. |

## K

| Termo | Definição |
|------|-----------|
| Keystone Wallet | Uma carteira de hardware air-gapped com suporte nativo a Zcash (blindado Orchard), compatível com ZODL para assinatura offline. [Keystone](https://keyst.one) |

## L

| Termo | Definição |
|------|-----------|
| Layer-1 | Refere-se a uma rede base e à sua infraestrutura subjacente. Blockchains de camada 1 podem validar e finalizar transações sem precisar de outra rede. O Zcash é uma blockchain L1. |
| librustzcash | Um workspace Rust que contém todos os crates e dependências para trabalhar com o Zcash. [repositório](https://github.com/zcash/librustzcash) |
| lightwalletd | Um servidor sem estado que fornece informações da blockchain para light clients. [lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| Termo | Definição |
|------|-----------|
| Metrics | As métricas da rede estão disponíveis [aqui](https://tokenterminal.com/explorer/projects/zcash/metrics/all) |
| Metadata | Dados gerados junto com uma transação Zcash de um usuário. Podem incluir a altura do bloco, a versão da transação, a altura de expiração etc. |
| Mobile SDK | Um SDK leve que conecta Android a Zcash, permitindo que apps Android de terceiros enviem e recebam transações blindadas. [GitHub](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | O processo em que, para cada bloco, os nós da rede Zcash competem fazendo cálculos matemáticos complexos para encontrar uma solução com base em uma dificuldade que se ajusta automaticamente. [Guia](https://z.cash/mining-zcash/) |
| Multisignature | Um endereço que exige várias assinaturas de chaves privadas para gastar fundos. Atualmente, a funcionalidade multisig é suportada apenas por endereços transparentes. |

## N

| Termo | Definição |
|------|-----------|
| Network Sustainability Mechanism (NSM) | Uma proposta da Shielded Labs para queimar uma parte das taxas de transação, para que o orçamento de segurança de longo prazo do protocolo não dependa inteiramente da emissão. Especificada na ZIP 234, em análise em 2026. |
| Nighthawk | Uma antiga carteira móvel do Zcash, da Nighthawk Apps. Suas carteiras Zcash não recebem mais manutenção, e a Nighthawk Wallet 3.0 foi criada para DarkFi. Para mover fundos de uma seed antiga da Nighthawk, consulte [Recuperação de fundos](/using-zcash/recovering-funds). |
| Noir Wallet | Uma carteira em forma de extensão de navegador para Zcash, apoiada pela Zcash Community Grants, criada para conectar ZEC blindado diretamente a aplicativos de navegador, em vez de depender de QR codes e transferências manuais. [zknoir.com](https://www.zknoir.com/) |
| NU5 | A 6ª grande atualização da rede do Zcash, que introduziu o pool blindado Orchard e os Unified Addresses. [Mais informações](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | A 7ª grande atualização da rede do Zcash, que ajustou o subsídio de bloco para financiar o programa Zcash Community Grants e o Deferred Dev Fund Lockbox. Ativada no final de 2024. [Mais informações](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | A atualização da rede posterior à Ironwood, ativada na mainnet na altura 3.543.405, em 6 de novembro de 2026 (UTC). Conforme a [ZIP 259](https://zips.z.cash/zip-0259), ela traz blocos de 25 segundos (ZIP 218), o mecanismo de sustentabilidade da rede com reciclagem de taxas (ZIPs 235 e 237) e o fim das transações da versão 4, o que deixa os fundos Sprout impossíveis de gastar (ZIP 2003). Ela não adiciona nenhum novo formato de transação; Tachyon e Zcash Shielded Assets não fazem parte dela. |

## O

| Termo | Definição |
|------|-----------|
| Oblivious Synchronization | Um método em desenvolvimento no Projeto Tachyon que permite que uma carteira solicite a um servidor não confiável os dados de que precisa, sem revelar sobre quais notes está perguntando. O servidor nunca descobre seus nulificadores, porque o protocolo os faz evoluir de forma não vinculável. [Artigo](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard | O pool blindado introduzido na NU5. O Ironwood o selou depois que um bug de solidez foi encontrado, então você não pode mais enviar nem receber dentro do Orchard. Os fundos só saem pela catraca. [Pools blindados](/using-zcash/shielded-pools) |
| Overwinter | A 1ª atualização da rede do Zcash. [Mais informações](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| Termo | Definição |
|------|-----------|
| Payments | É possível usar Zcash em compras do dia a dia por meio de vários provedores de pagamento diferentes. [Apps de pagamento](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | Uma primitiva em que os dados viajam junto com uma prova da sua própria correção, de modo que combinar dados também combina as provas. O Projeto Tachyon reconstrói o protocolo blindado em torno de PCD, permitindo que cada carteira carregue uma prova recursiva de que seu próprio saldo está correto, em vez de escanear a chain novamente. A implementação em Zcash é o [Ragu](https://github.com/tachyon-zcash/ragu), que segue o Halo e não precisa de configuração confiável. |
| Peer-to-Peer Network | Redes P2P se baseiam no conceito de descentralização. É a arquitetura fundamental da tecnologia blockchain. |
| PIR (Private Information Retrieval) | Técnicas que permitem buscar um registro em um servidor sem que o servidor saiba qual registro você pediu. Em pesquisa ativa para o Zcash como forma de as carteiras leves obterem o que precisam sem vazar o que estão procurando. |
| Podcast | [Radiolab (cerimônia Zcash)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| Termo | Definição |
|------|-----------|
| QR Code | Um código legível por máquina usado para codificar endereços Zcash para facilitar a leitura. Unified Addresses (UAs) costumam ser compartilhados por meio de códigos QR nas carteiras Zcash modernas. |
| Quantum Recoverability | Uma propriedade das notes Ironwood, especificada na [ZIP 2005](https://zips.z.cash/zip-2005), que mantém recuperável o registro on-chain de uma moeda caso um futuro computador quântico quebre a criptografia que a protege hoje. É um caminho de recuperação, e não resistência quântica, e se aplica às notes Ironwood, não aos fundos Sprout, Sapling ou Orchard existentes. |

## R

| Termo | Definição |
|------|-----------|
| Recovery Phrase | Uma sequência de 12 ou 24 letras e números usada para fazer backup e restaurar uma carteira. No Zcash, essa frase regenera as chaves de gastos e as chaves de visualização, o que a torna essencial para a recuperação dos fundos e para a segurança. |

## S

| Termo | Definição |
|------|-----------|
| Sapling | Uma grande atualização da rede que introduziu melhorias significativas de eficiência para transações blindadas e abriu caminho para a adoção em dispositivos móveis. Ativada no bloco 419200. |
| Selective Disclosure | Permite que o dono de um endereço blindado compartilhe seletivamente chaves de visualização ou divulgações de pagamento com terceiros, mantendo os dados privados para todos os demais. |
| Shielded Address | Também chamado de zaddr. Começa com z. Oculta remetente, destinatário, valor e memorando usando zk-SNARKs. |
| Shielded Labs | Uma organização independente que trabalha na economia do protocolo e no consenso do Zcash. Atualmente lidera o Crosslink e o Network Sustainability Mechanism. [GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | Uma transação exclusivamente entre endereços blindados. Totalmente privada na blockchain. |
| Sol/s | Soluções por segundo - mede o desempenho de mineração Equihash. |
| Spending Key | A chave privada que permite gastar a partir de um endereço blindado (também permite ver o saldo e o histórico). |
| Sprout | A versão original do protocolo blindado do Zcash (lançada em 2016). |

## T

| Termo | Definição |
|------|-----------|
| Tachyon | O programa de escalabilidade do Zcash. Não faz parte da NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) e não tem data de ativação. Ele faz as carteiras deixarem de escanear todos os blocos e passarem a usar um estado de carteira portador de provas, sincronização oblívia e estado de nó podável, visando uma vazão blindada na casa dos milhares de transações por segundo. [Site do projeto](https://tachyon.z.cash/overview/) |
| TAZ | Zcash da testnet (moeda de teste sem valor). |
| Testnet | Uma blockchain separada para testar atualizações e recursos antes da mainnet. |
| Trailing Finality Layer (TFL) | Pesquisa sobre a adição de uma camada de finalidade por trás da chain de prova de trabalho do Zcash, para que blocos recentes possam ser finalizados sem substituir a mineração. O Crosslink é o design que surgiu dessa pesquisa. |
| Transaction | Um pagamento entre usuários, enviado à rede e, em algum momento, confirmado em um bloco. |
| Transaction Expiry | Um limite de altura de bloco até o qual um pagamento não minerado pode ser incluído. Um pagamento comum com altura de expiração N diferente de zero pode ser minerado no bloco N ou antes, mas não no N+1. Uma altura de 0 desativa a expiração. Isso não é um temporizador de reembolso automático. [ZIP 203](https://zips.z.cash/zip-0203) |
| Transaction Fee | A taxa padrão é 0,0001 ZEC. Taxas mais altas têm prioridade; taxas muito baixas podem causar atrasos ou expiração. |
| Transparent Address | Também chamado de taddr. Começa com t. Totalmente público (como o Bitcoin). |
| Transparent Transaction | Uma transação exclusivamente entre endereços transparentes - tudo fica publicamente visível. |
| Turnstile | A regra contábil que acompanha quanto valor entra e sai de cada pool blindado, para que nenhum pool possa liberar mais do que recebeu. Usada em cada transição de pool na história do Zcash e, atualmente, protegendo a migração do Orchard para o Ironwood. [Mais informações](/zcash-tech/the-turnstile) |

## U

| Termo | Definição |
|------|-----------|
| Unified Address | Formato moderno de endereço (introduzido na NU5) que funciona para pagamentos transparentes e blindados em uma única string. |
| Upgrade Activation | A altura de bloco específica em que uma atualização da rede (por exemplo, NU5, NU6) é ativada automaticamente. |

## V

| Termo | Definição |
|------|-----------|
| Viewing Key | Uma chave privada que permite ver o saldo e o histórico de transações de um endereço blindado sem poder gastar os fundos. |

## W

| Termo | Definição |
|------|-----------|
| Wallet | Software ou hardware que armazena chaves privadas e permite enviar/receber ZEC. Carteiras ativas incluem ZODL (iOS/Android), Zingo! (celular/desktop), Zkool (celular/desktop), Zallet (carteira de nó integral, em beta) e Keystone (hardware). Para uma lista completa, veja [Carteiras do ecossistema Zcash](https://z.cash/ecosystem/?wallets=#tag-wallets) |
| WebZjs | O primeiro SDK JavaScript para o Zcash, criado pela ChainSafe para ambientes de navegador. É a base do snap Zcash Shielded Wallet, que trouxe ZEC blindado ao MetaMask. |

## X

| Termo | Definição |
|------|-----------|
| XZC | Um ticker antigo do Zcash usado em algumas corretoras legadas. O ticker oficial é ZEC. |

## Y

| Termo | Definição |
|------|-----------|
| YWallet | Uma carteira Zcash focada em privacidade, com suporte a endereços Orchard, Sapling e transparentes, conhecida pela sincronização rápida. Não é mais mantida: seu desenvolvedor confirmou que ela não será atualizada para a Ironwood, então não consegue mais acompanhar a rede. A Zkool, do mesmo desenvolvedor, é a sucessora mantida. |

## Z

| Termo | Definição |
|------|-----------|
| Zcash | Criptomoeda focada em privacidade que usa zk-SNARKs. Faz a ponte entre pagamentos transparentes (no estilo do Bitcoin) e totalmente blindados. |
| Zcash Foundation | Organização independente sem fins lucrativos que apoia o ecossistema Zcash, financia o desenvolvimento e promove a privacidade. |
| Zcash Network | Rede peer-to-peer de nós que valida transações e mantém a blockchain. |
| ZEC | O código oficial de moeda do Zcash (algumas corretoras ainda mostram XZC). |
| Z3 stack | Os três programas que, juntos, substituem o zcashd: Zebra para o nó, Zaino para a indexação e Zallet para a carteira. [Z3 stack](/zcash-tech/z3-stack) |
| Zerocash | O protocolo acadêmico (2014) no qual o Zcash se baseia. |
| Zaino | Um indexador que fornece dados de carteira a partir de um nó Zebra, escrito em Rust pela Zingo Labs. Ele assume o trabalho de indexação que o zcashd fazia para as carteiras leves. [Zaino](/zcash-tech/zaino) |
| Zakura | Um nó integral Zcash separado, construído para escala, liderado por Sean Bowe e Dev Ojha. Ele sincroniza mais rápido, faz a poda de blocos nativamente e pode executar o zcashd sobre si mesmo para softwares que ainda dependem dele. [Nó Zakura](/zcash-tech/zakura-node) |
| Zallet | A carteira que substitui a carteira do zcashd. Migre o `wallet.dat` existente em vez de começar do zero. [Zallet](/zcash-tech/zallet) e a [referência rápida da Zallet](/using-zcash/zallet-quick-reference-guide) |
| Zebra | O nó integral que substitui o zcashd, mantido pela Zcash Foundation. Execute-o se você precisa de um nó de validação. [Nó integral Zebra](/zcash-tech/zebra-full-node) |
| zcashd | O nó integral e carteira original do Zcash, agora aposentado. A versão 6.20.0 se desligou sozinha no bloco 3417100, em 18 de julho de 2026, e nunca deu suporte à NU6.3. Em vez dele, execute o Z3 stack ou o Zakura. [Guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet) |
| ZIP | Zcash Improvement Proposal - o processo de governança da comunidade usado para propor e ratificar mudanças no protocolo. [Repositório ZIP](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab. A organização independente fundada no início de 2026 por Josh Swihart e pela antiga equipe de engenharia da Electric Coin Company, depois que pediram demissão por causa de uma disputa de governança com a Bootstrap. Ela levantou mais de US$ 25 milhões em financiamento seed em março de 2026 e mantém a carteira ZODL, que foi renomeada de Zashi em fevereiro de 2026. [zodl.com](https://zodl.com) |
| zk-SNARKs | Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge — a criptografia por trás das transações blindadas do Zcash. Permite provar uma afirmação (por exemplo, um gasto válido) sem revelar nenhuma informação secreta. |
| ZSA (Zcash Shielded Assets) | Tokens emitidos por usuários que herdam a privacidade blindada do Zcash, permitindo que outros ativos além do ZEC circulem de forma privada na rede. Especificados na [ZIP 226](https://zips.z.cash/zip-0226). Não fazem parte da NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) e não têm data de ativação. |

---

**Última atualização:** outubro de 2026
**Quer contribuir?** [Edite esta página no GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
