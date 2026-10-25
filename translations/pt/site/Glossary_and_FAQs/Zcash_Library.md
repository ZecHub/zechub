# Biblioteca Zcash

Um glossário abrangente de termos-chave, conceitos e recursos relacionados com Zcash. Esta é a biblioteca central para consultar termos de notas de lançamento, tópicos de fóruns ou registos de alterações de wallets.

### Navegação Rápida
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| Termo | Definição |
|------|-----------|
| Actions | Em vez de criar várias provas individuais para cada Spend e Output, o protocolo Orchard funde-as numa única Action. |
| Addresses | O Zcash tem endereços Shielded (zaddr) e Transparent (taddr). Os endereços Unified (UA) agrupam vários tipos de receiver para que uma wallet remetente possa escolher o melhor suportado por ambas as partes. Especificados em [ZIP 316](https://zips.z.cash/zip-0316). [Endereços Unified](/zcash-tech/unified-addresses) |
| Arborist Call | Uma chamada quinzenal que abrange atualizações sobre o protocolo Zcash e o desenvolvimento de investigação. Realizada no Fórum da Comunidade Zcash e no Discord. [Notas da Reunião](https://github.com/ZcashCommunityGrants/arboretum-notes) / [Anúncios no Fórum](https://forum.zcashcommunity.com) |
| Auto-shielding | Permite aos utilizadores (mais especificamente, às suas wallets) mover automaticamente fundos de um endereço transparente para a pool de ZEC shielded mais recente. |

## B

| Termo | Definição |
|------|-----------|
| Benchmarking | Os mineradores podem submeter métricas sobre a eficiência de vários equipamentos usados para minerar Zcash. [Ver aqui](https://zcashbenchmarks.info) |
| Block | Um Block é um registo na blockchain Zcash que contém um conjunto de transações enviadas na rede. Aproximadamente a cada 75 segundos, em média, um novo bloco é acrescentado à blockchain. |
| Block Explorer | Uma ferramenta online para ver todas as transações, passadas e atuais, na blockchain. [Zcash Explorador de Blocos](https://zcashexplorer.app/) |
| Blogs | [ZODL Blog (anteriormente Electric Coin Co)](https://zodl.com/blog/) / [Zcash Foundation Blog](https://zfnd.org/blog/) / [ZecHub Newsletter](https://zechub.substack.com/) |
| Blossom | A 3.ª Grande Atualização de Rede para Zcash. [Mais informação](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| Termo | Definição |
|------|-----------|
| Canopy | A 5.ª Grande Atualização de Rede do Zcash. [Mais informação](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | Permite a quem faz um compromisso comprometer-se com um polinómio através de uma cadeia curta que pode ser usada por um verificador para confirmar avaliações reivindicadas do polinómio comprometido. Útil para reduzir os custos de comunicação no protocolo Zcash. |
| Community | [O Fórum Oficial da Comunidade Zcash](https://forum.zcashcommunity.com) / [Zcash Comunidade Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash I&D Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | Um modelo de consenso híbrido proposto que executaria proof-of-stake juntamente com o proof-of-work existente do Zcash. A Shielded Labs lidera o trabalho e mantém um protótipo no repositório `zebra-crosslink`. Atualmente, Crosslink não faz parte de Zcash. [Crosslink protocolo](/zcash-tech/crosslink-protocol) |
| CrossPay | Uma funcionalidade na wallet ZODL que permite gastar ZEC shielded enquanto o destinatário é pago no ativo e na chain que preferir, com encaminhamento através de NEAR Intents em vez de uma exchange centralizada. |
| Cypherpunk Zero | Um universo criativo e esforço colaborativo entre a ECC, o ilustrador Stranger Wolf, a Mighty Jaxx e parceiros selecionados do ecossistema. [Redes sociais do Cypherpunk Zero](https://x.com/cypherpunkZero) / [OpenSea Coleção](https://opensea.io/collection/cypherpunk-zero) |

## D

| Termo | Definição |
|------|-----------|
| DeFi | Projetos que integram ZEC com DeFi: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [NEAR Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [THORSwap](https://app.thorswap.finance/) |
| Deshielding | Refere-se a uma transação enviada de um zaddr (endereço shielded) para um taddr (endereço transparente). A origem da transação não é visível, no entanto os fundos entram numa pool de valor publicamente visível. |
| Developer Resources | [Recursos para Programadores](https://www.zcashcommunity.com/developers/) |
| Documentation | [Documentação Oficial](https://zcash.readthedocs.io/en/latest/) |

## E

| Termo | Definição |
|------|-----------|
| ECC | A Electric Coin Company, a equipa que lançou o protocolo Zcash, anteriormente conhecida como Zcash Company. Toda a sua equipa de engenharia se demitiu em janeiro de 2026 na sequência de uma disputa de governação com o conselho da Bootstrap, e passou depois a formar a ZODL. |
| ECDSA | Elliptic Curve Digital Signature Algorithm é um esquema de assinatura digital criptograficamente seguro. O algoritmo de assinatura/verificação ECDSA baseia-se na multiplicação de pontos em curvas elípticas. |
| Education | Vídeos educativos que explicam o Zcash [aqui](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | Um campo adicional para transações enviadas para endereços shielded que é visível para o destinatário de um pagamento. O memo encriptado é visível apenas para o remetente e para o destinatário. |
| Equihash | O algoritmo de mineração proof-of-work orientado para memória utilizado no Zcash. |
| Events | O calendário de eventos relacionados com Zcash pode ser consultado no [Luma](https://luma.com/zcash) e na [Zcash Foundation](https://zfnd.org/zf-events/) |
| Exchanges | [Lista de Exchanges que suportam Zcash](https://z.cash/exchanges/) |

## F

| Termo | Definição |
|------|-----------|
| Fiat-Shamir | Uma técnica para pegar numa prova interativa de conhecimento e criar com base nela uma assinatura digital. Desta forma, algum facto (por exemplo, o conhecimento de um segredo) pode ser provado publicamente sem revelar a informação subjacente. |
| Formal Verification | Provar matematicamente que um sistema se comporta exatamente como especificado, em vez de depender apenas de testes. O circuito Ironwood Action foi verificado desta forma por contribuidores da zkSecurity e da ZODL, usando o provador de teoremas Lean, para demonstrar a ausência de falhas de solidez. |
| Founders Reward | A recompensa dos fundadores representa 20 por cento da recompensa total por bloco e é deduzida do valor de cada bloco e distribuída de forma transparente para impulsionar o desenvolvimento e o crescimento do protocolo. |
| Free2Z | Uma ferramenta para conteúdo anónimo e donativos privados alimentada por Zcash. [Free2Z](https://free2z.com) |
| FROST | Esquema de assinatura Schnorr threshold flexível e otimizado por rondas. [Artigo de Investigação](https://eprint.iacr.org/2020/852) |

## G

| Termo | Definição |
|------|-----------|
| Governance | As decisões do processo ZIP são escritas na especificação do Zcash, bem como no software que executa a rede. As alterações são ratificadas on-chain quando a maioria da rede adota a atualização e não quebra o consenso. [Histórico Completo do Protocolo](https://zfnd.org/protocol-agreements-and-major-decisions/) |

## H

| Termo | Definição |
|------|-----------|
| Halo | Permite atualizações de circuitos sem necessidade de trusted setups, tornando o protocolo shielded do Zcash mais ágil para futuras melhorias e extensões. [Explicação Técnica](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | As wallets hierárquicas determinísticas geram uma série de pares de chaves a partir de uma seed, proporcionando conveniência e facilidade de gestão, bem como um elevado nível de segurança. |
| Heartwood | A 4.ª Grande Atualização de Rede do Zcash. [Mais informação](https://z.cash/upgrade/heartwood/) |

## I

| Termo | Definição |
|------|-----------|
| Index | O Índice ZCX da CoinDesk representa uma taxa spot em tempo real, equivalente em USD, para Zcash. [Índice de Preço](https://www.coindesk.com/indices/zcx/) |
| Integrations | Pode aceitar pagamentos em Zcash através de vários fornecedores terceiros. [Processadores de Pagamento](https://z.cash/zcash-for-business/) |
| Interactive Proof System | Uma máquina abstrata que modela a computação como a troca de mensagens entre duas partes: um Prover e um Verifier. |
| Investment | Estão disponíveis várias opções financeiras para investidores institucionais ou family offices que pretendam obter exposição a Zcash. [Lista completa](https://z.cash/investors/) |
| Ironwood | Atualização de rede NU6.3, ativa na mainnet desde o bloco 3.428.143 em 28 de julho de 2026. Ironwood adiciona uma nova pool blindada construída com base no circuito Orchard corrigido e sela a pool Orchard original, para que qualquer pessoa possa verificar que a oferta circulante é legítima. As suas regras de consenso estão especificadas em [ZIP 258](https://zips.z.cash/zip-0258). [Ironwood](/zcash-tech/ironwood) |

## J

| Termo | Definição |
|------|-----------|
| JubJub | Uma curva elíptica concebida para ser implementada de forma eficiente em circuitos zk-SNARK. |

## K

| Termo | Definição |
|------|-----------|
| Keystone Wallet | Uma hardware wallet air-gapped com suporte nativo para Zcash (Orchard shielded), compatível com ZODL para assinatura a frio. [Keystone](https://keyst.one) |

## L

| Termo | Definição |
|------|-----------|
| Layer-1 | Refere-se a uma rede de base e à sua infraestrutura subjacente. As blockchains Layer-1 podem validar e finalizar transações sem necessidade de outra rede. O Zcash é uma blockchain L1. |
| librustzcash | Um workspace em Rust que contém todos os crates e dependências para trabalhar com Zcash. [repo](https://github.com/zcash/librustzcash) |
| lightwalletd | Um servidor sem estado que fornece informação da blockchain a clientes leves. [lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| Termo | Definição |
|------|-----------|
| Metrics | As métricas da rede estão disponíveis [aqui](https://tokenterminal.com/explorer/projects/zcash/metrics/all) |
| Metadata | Dados gerados em conjunto com a transação Zcash de um utilizador. Isto pode incluir altura do bloco, versão da transação ou altura de expiração, etc. |
| Mobile SDK | Um SDK leve que liga o Android ao Zcash, permitindo que aplicações Android de terceiros enviem e recebam transações shielded. [GitHub](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | O processo em que, para cada bloco, os nós da rede Zcash competem realizando cálculos matemáticos complexos para encontrar uma solução com base numa dificuldade autoajustável. [Guia](https://z.cash/mining-zcash/) |
| Multisignature | Um endereço que requer múltiplas assinaturas de chave privada para gastar fundos. Atualmente, a funcionalidade multisig é suportada apenas por endereços transparentes. |

## N

| Termo | Definição |
|------|-----------|
| Network Sustainability Mechanism (NSM) | Uma proposta da Shielded Labs para queimar uma parte das taxas de transação, de modo a que o orçamento de segurança de longo prazo do protocolo não dependa inteiramente da emissão. Especificada na ZIP 234, em revisão em 2026. |
| Nighthawk | Uma wallet móvel para Zcash. [Website](https://nighthawkwallet.com) |
| Noir Wallet | Uma wallet de extensão de navegador para Zcash, apoiada pela Zcash Community Grants, criada para ligar ZEC shielded diretamente a aplicações no navegador, em vez de depender de códigos QR e transferências manuais. [zknoir.com](https://www.zknoir.com/) |
| NU5 | A 6.ª Grande Atualização de Rede do Zcash, que introduz a pool shielded Orchard e os Unified Addresses. [Mais informação](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | A 7.ª Grande Atualização de Rede do Zcash, que ajusta o subsídio por bloco para financiar o programa Zcash Community Grants e o Deferred Dev Fund Lockbox. Ativada no final de 2024. [Mais informação](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | A atualização de rede após Ironwood, prevista para a mainnet em 5 de novembro de 2026. De acordo com [ZIP 259](https://zips.z.cash/zip-0259), introduz blocos de 25 segundos (ZIP 218), o Network Sustainability Mechanism com reciclagem de taxas (ZIPs 235 e 237) e o fim das transações da versão 4, o que torna os fundos Sprout impossíveis de gastar (ZIP 2003). Não acrescenta nenhum novo formato de transação; Tachyon e Zcash Shielded Assets não fazem parte dela. |

## O

| Termo | Definição |
|------|-----------|
| Oblivious Synchronization | Um método em desenvolvimento no Project Tachyon que permite a uma wallet pedir os dados de que precisa a um servidor não confiável sem revelar sobre que notas está a pedir informações. O servidor nunca aprende os teus nullifiers, porque o protocolo faz com que evoluam de forma não associável. [Descrição](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard | A pool blindada introduzida em NU5. Ironwood selou-a após ser encontrada uma falha de solidez, pelo que já não podes enviar nem receber dentro de Orchard. Os fundos saem apenas através do torniquete. [Pools blindadas](/using-zcash/shielded-pools) |
| Overwinter | A 1.ª Atualização de Rede do Zcash. [Mais informação](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| Termo | Definição |
|------|-----------|
| Payments | É possível usar Zcash para compras do dia a dia através de vários fornecedores de pagamento diferentes. [Aplicações de Pagamento](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | Um primitivo em que os dados viajam juntamente com uma prova da sua própria correção, de modo que combinar dados também combina as provas. O Projeto Tachyon reconstrói o protocolo shielded em torno de PCD, permitindo que cada wallet transporte uma prova recursiva de que o seu próprio saldo está correto, em vez de voltar a analisar a cadeia. A implementação de Zcash é [Ragu](https://github.com/tachyon-zcash/ragu), que segue Halo e não necessita de trusted setup. |
| Peer-to-Peer Network | As redes P2P baseiam-se no conceito de descentralização. A arquitetura fundamental da tecnologia blockchain. |
| PIR (Private Information Retrieval) | Técnicas que permitem obter um registo de um servidor sem que o servidor descubra qual o registo que pediste. Está em investigação ativa para Zcash como forma de as light wallets obterem o que precisam sem revelar o que estão a procurar. |
| Podcast | [Radiolab (Cerimónia Zcash)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| Termo | Definição |
|------|-----------|
| QR Code | Um código legível por máquina usado para codificar endereços Zcash para fácil leitura. Os Unified Addresses (UAs) são tipicamente partilhados através de códigos QR nas wallets modernas de Zcash. |
| Quantum Recoverability | Uma propriedade das notas Ironwood, especificada em [ZIP 2005](https://zips.z.cash/zip-2005), que mantém o registo on-chain de uma moeda recuperável se um futuro computador quântico quebrar a criptografia que a protege hoje. É um caminho de recuperação, e não resistência quântica, e aplica-se às notas Ironwood, não aos fundos existentes de Sprout, Sapling ou Orchard. |

## R

| Termo | Definição |
|------|-----------|
| Recovery Phrase | Uma sequência de 12 ou 24 letras e números usada para fazer backup e restaurar uma wallet. No Zcash, esta frase regenera chaves de gasto e de visualização, tornando-a crítica para a recuperação de fundos e a segurança. |

## S

| Termo | Definição |
|------|-----------|
| Sapling | Uma grande atualização de rede que introduziu melhorias significativas de eficiência para transações shielded e abriu caminho à adoção móvel. Ativada no bloco 419200. |
| Selective Disclosure | Permite ao proprietário de um endereço shielded partilhar seletivamente viewing keys ou divulgações de pagamento com terceiros, mantendo os dados privados de todos os outros. |
| Shielded Address | Também chamado zaddr. Começa por z. Oculta remetente, destinatário, montante e memo usando zk-SNARKs. |
| Shielded Labs | Uma organização independente que trabalha na economia do protocolo e no consenso do Zcash. Atualmente lidera o Crosslink e o Network Sustainability Mechanism. [GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | Uma transação exclusivamente entre endereços shielded. Totalmente privada na blockchain. |
| Sol/s | Soluções por segundo - mede o desempenho de mineração Equihash. |
| Spending Key | A chave privada que permite gastar a partir de um endereço shielded (também permite ver saldo e histórico). |
| Sprout | A versão original do protocolo shielded do Zcash (lançada em 2016). |

## T

| Termo | Definição |
|------|-----------|
| Tachyon | O programa de escalabilidade da Zcash. Não faz parte da NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) e não tem data de ativação. Afasta as wallets da análise de cada bloco, em direção a um estado de wallet com provas, sincronização oblivious e estado de nó podável, com o objetivo de alcançar milhares de transações shielded por segundo. [Site do projeto](https://tachyon.z.cash/overview/) |
| TAZ | Testnet Zcash (moeda de teste sem valor). |
| Testnet | Uma blockchain separada para testar atualizações e funcionalidades antes da mainnet. |
| Trailing Finality Layer (TFL) | Investigação sobre a adição de uma camada de finalidade por detrás da cadeia proof-of-work da Zcash, para que os blocos recentes possam ser finalizados sem substituir a mineração. Crosslink é o design que resultou desse trabalho. |
| Transaction | Um pagamento entre utilizadores, submetido à rede e eventualmente confirmado num bloco. |
| Transaction Expiry | As transações expiram após aproximadamente 25 minutos (20 blocos) se não forem confirmadas; os fundos regressam automaticamente. |
| Transaction Fee | A taxa predefinida é 0.0001 ZEC. Taxas mais altas recebem prioridade; taxas muito baixas podem causar atrasos ou expiração. |
| Transparent Address | Também chamado taddr. Começa por t. Totalmente público (como o Bitcoin). |
| Transparent Transaction | Uma transação exclusivamente entre endereços transparentes - tudo é publicamente visível. |
| Turnstile | A regra contabilística que acompanha quanto valor entra e sai de cada pool shielded, para que nenhum pool possa libertar mais do que aquilo que recebeu. Foi usada em todas as transições de pool na história da Zcash e está atualmente a proteger a migração de Orchard para Ironwood. [Mais informação](/zcash-tech/the-turnstile) |

## U

| Termo | Definição |
|------|-----------|
| Unified Address | Formato de endereço moderno (introduzido na NU5) que funciona tanto para pagamentos transparentes como shielded numa só string. |
| Upgrade Activation | A altura de bloco específica em que uma atualização de rede (por exemplo, NU5, NU6) é ativada automaticamente. |

## V

| Termo | Definição |
|------|-----------|
| Viewing Key | Uma chave privada que permite ver o saldo e o histórico de transações de um endereço shielded sem poder gastar os fundos. |

## W

| Termo | Definição |
|------|-----------|
| Wallet | Software ou hardware que armazena chaves privadas e permite enviar/receber ZEC. As wallets ativas incluem ZODL (iOS/Android), Zingo! (móvel/desktop), Nighthawk (Android), Zkool (móvel/desktop), Zallet (em breve) e Keystone (hardware). Para uma lista completa, veja [Wallets do Ecossistema Zcash](https://z.cash/ecosystem/?wallets=#tag-wallets) |
| WebZjs | O primeiro SDK JavaScript para Zcash, desenvolvido pela ChainSafe para ambientes de navegador. Está na base do snap Zcash Shielded Wallet que levou ZEC shielded ao MetaMask. |

## X

| Termo | Definição |
|------|-----------|
| XZC | Um símbolo ticker mais antigo para Zcash usado em algumas exchanges antigas. O ticker oficial é ZEC. |

## Y

| Termo | Definição |
|------|-----------|
| YWallet | Uma wallet Zcash focada na privacidade, com suporte para Orchard, Sapling e endereços transparentes, conhecida pela sincronização rápida. Já não é mantida: o seu programador confirmou que não será atualizada para Ironwood, pelo que já não consegue acompanhar a rede. Zkool, do mesmo programador, é a sucessora mantida. |

## Z

| Termo | Definição |
|------|-----------|
| Zcash | Criptomoeda focada na privacidade que usa zk-SNARKs. Faz a ponte entre pagamentos transparentes (estilo Bitcoin) e pagamentos totalmente shielded. |
| Zcash Foundation | Organização sem fins lucrativos independente que apoia o ecossistema Zcash, financia o desenvolvimento e promove a privacidade. |
| Zcash Network | Rede peer-to-peer de nós que valida transações e mantém a blockchain. |
| ZEC | O código oficial da moeda para Zcash (algumas exchanges ainda mostram XZC). |
| Z3 stack | Os três programas que, em conjunto, substituem o zcashd: Zebra para o nó, Zaino para indexação, Zallet para a wallet. [Z3 stack](/zcash-tech/z3-stack) |
| Zerocash | O protocolo académico (2014) em que o Zcash se baseia. |
| Zaino | Um indexador que fornece dados de wallet a partir de um nó Zebra, escrito em Rust por Zingo Labs. Assume o trabalho de indexação que o zcashd realizava para wallets leves. [Zaino](/zcash-tech/zaino) |
| Zakura | Um nó completo Zcash separado, desenvolvido para escala, liderado por Sean Bowe e Dev Ojha. Sincroniza mais depressa, remove blocos nativamente e pode executar zcashd sobre si próprio para software que ainda depende dele. [Zakura nó](/zcash-tech/zakura-node) |
| Zallet | A wallet que substitui a wallet zcashd. Transfira uma `wallet.dat` existente em vez de começar de novo. [Zallet](/zcash-tech/zallet) e a [Zallet referência rápida](/using-zcash/zallet-quick-reference-guide) |
| Zebra | O nó completo que substitui o zcashd, mantido pela Zcash Foundation. Execute-o se precisar de um nó de validação. [Zebra nó completo](/zcash-tech/zebra-full-node) |
| zcashd | O nó completo e wallet Zcash originais, agora descontinuados. A versão 6.20.0 encerrou-se no bloco 3417100 em 18 de julho de 2026 e nunca suportou NU6.3. Em vez disso, execute a Z3 stack ou o Zakura. [Guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet) |
| ZIP | Zcash Improvement Proposal - o processo de governação da comunidade usado para propor e ratificar alterações ao protocolo. [ZIP Repositório](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab. A organização independente fundada no início de 2026 por Josh Swihart e pela antiga equipa de engenharia da Electric Coin Company, após a sua demissão devido a um conflito de governação com a Bootstrap. Angariou mais de 25 milhões de dólares em financiamento seed em março de 2026 e mantém a wallet ZODL, que foi renomeada de Zashi em fevereiro de 2026. [zodl.com](https://zodl.com) |
| zk-SNARKs | Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge — a criptografia que alimenta as transações shielded de Zcash. Permite provar uma afirmação (por exemplo, um gasto válido) sem revelar qualquer informação secreta. |
| ZSA (Zcash Shielded Assets) | Tokens emitidos por utilizadores que herdam a privacidade shielded de Zcash, permitindo que ativos além de ZEC se movam de forma privada na rede. Especificados na [ZIP 226](https://zips.z.cash/zip-0226). Não fazem parte da NU7 ([ZIP 259](https://zips.z.cash/zip-0259)) e não têm data de ativação. |

---

**Última atualização:** outubro de 2026
**Quer contribuir?** [Editar esta página no GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
