<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Recursos para desenvolvedores

Os recursos de que você precisa para desenvolver no Zcash, agrupados pela finalidade de cada um em vez de listados em um único monte.

A stack mudou muito em 2026. zcashd, que operou a rede durante a maior parte de sua história, chegou ao fim de vida em 18 de julho de 2026, na altura do bloco 3417100, e todos os nós não modificados foram desligados nessa altura e vão se recusar a reiniciar. Os guias escritos para zcashd agora são história, em vez de um ponto de partida, por isso esta página está organizada em torno do que o substituiu.

## A stack em resumo

| Layer | O que usar | Comece com |
|:--|:--|:--|
| Full node | Zebra ou Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Full node wallet | Zallet, em beta | [The Zallet Book](https://zcash.github.io/zallet/) |
| Light wallet server | Zaino ou lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Wallet libraries | As crates do librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobile | SDKs para Android e iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Specification | Especificação do protocolo e ZIPs | [zips.z.cash](https://zips.z.cash) |

## Nós

Um nó valida o consenso e mantém a chain. Existem duas implementações em desenvolvimento ativo.

[Zebra](/zcash-tech/zebra-full-node) é o nó da Zcash Foundation, escrito em Rust, e é aquele que a maioria dos guias agora pressupõe. [The Zebra Book](https://zebra.zfnd.org/) abrange sua instalação e execução, e o [repositório](https://github.com/ZcashFoundation/zebra) é onde o desenvolvimento acontece.

[Zakura](/zcash-tech/zakura-node) é um nó mais recente, descrito por seus autores como um "nó integral do Zcash compatível com o consenso, criado para escalar", com sincronização mais rápida, poda de blocos e um modo de compatibilidade com zcashd. É liderado por Sean Bowe, cofundador do Zcash, e Dev Ojha. É open source sob a licença Apache 2.0 em [zakura-core/zakura](https://github.com/zakura-core/zakura).

O ZecHub tem uma página de [Nós integrais](/zcash-tech/full-nodes) que abrange as vantagens e desvantagens entre eles.

## A carteira de nó integral

zcashd incluía uma carteira com o nó. Essa carteira desapareceu, e [Zallet](https://github.com/zcash/zallet) é a substituta. The Zallet Book a descreve como "uma carteira do Zcash de nó integral escrita em Rust", que está sendo "criada como substituta da carteira zcashd".

Leia o aviso de segurança antes de depender dela. Zallet está em beta, "não foi totalmente revisada", alterações incompatíveis "podem ocorrer a qualquer momento, obrigando você a excluir e recriar sua carteira Zallet", e nem todos os métodos RPC de zcashd foram portados ainda.

Se você estiver migrando uma configuração existente, o ZecHub tem um [guia de migração de zcashd para Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) e uma [referência rápida do Zallet](/using-zcash/zallet-quick-reference-guide).

## Servidores de carteira leve

A maioria das carteiras não executa um nó. Elas se comunicam com um servidor que mantém a chain e retorna uma visão compacta dela.

[lightwalletd](https://github.com/zcash/lightwalletd) é o serviço original, escrito em Go, descrito como "um serviço de backend que fornece uma interface eficiente em largura de banda para a blockchain do Zcash". [Zaino](/zcash-tech/zaino) é o indexador mais recente, escrito em Rust, e lê a partir de um validador integral em vez de manter sua própria cópia da chain.

A documentação do [Protocolo do light client](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) abrange o próprio protocolo. A página de [Nós do Lightwallet](/zcash-tech/lightwallet-nodes) explica o que esses servidores podem e não podem ver sobre um usuário, algo que vale a pena compreender antes de escolher um.

## Criar uma carteira

A maior parte do trabalho com carteiras ocorre nas crates Rust sob [librustzcash](https://github.com/zcash/librustzcash), nas quais os SDKs móveis e várias carteiras de desktop se baseiam. Cada crate está documentada em [docs.rs](https://docs.rs).

| Crate | Para que serve |
|:--|:--|
| zcash_client_backend | "APIs para criar light clients blindados do Zcash", incluindo sincronização e construção de transações |
| zcash_client_sqlite | "Um light client do Zcash baseado em SQLite", a camada de armazenamento para o anterior |
| zcash_keys | "Gerenciamento de chaves e endereços do Zcash" |
| zcash_primitives | "Implementações em Rust dos primitivos do Zcash" |
| zcash_protocol | "Constantes de rede e tipos de valores do protocolo Zcash" |
| orchard | "O protocolo Orchard de transações blindadas" |
| sapling-crypto | "Biblioteca criptográfica para Zcash Sapling" |
| pczt | "Ferramentas para trabalhar com transações do Zcash parcialmente criadas", usadas para assinaturas por hardware e em múltiplos dispositivos |
| zip321 | URIs de solicitações de pagamento, conforme especificado em ZIP 321 |

Para dispositivos móveis, o [SDK do Android](https://github.com/zcash/zcash-android-wallet-sdk) e o [SDK do iOS](https://github.com/zcash/zcash-swift-wallet-sdk) envolvem essas bibliotecas. O repositório iOS chamava-se anteriormente ZcashLightClientKit, por isso links e artigos mais antigos usam esse nome.

## Especificação e criptografia

A [especificação do protocolo](https://zips.z.cash/protocol/protocol.pdf) é a referência sobre como o Zcash funciona, incluindo [codificações de endereços e chaves](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

Os [ZIPs](https://zips.z.cash) são onde as alterações são propostas e especificadas, e o índice mostra quais são rascunhos e quais são finais. As alterações de consenso são lançadas em atualizações da rede, e o ZecHub as acompanha na página de [Atualizações da rede](/start-here/network-upgrades).

Para a criptografia subjacente, leia [The halo2 Book](https://zcash.github.io/halo2/index.html) e [The Orchard Book](https://zcash.github.io/orchard/), juntamente com a documentação das crates [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) e [orchard](https://docs.rs/orchard/latest/orchard/). [The FROST Book](https://frost.zfnd.org/) abrange assinaturas de limiar, e o ZecHub tem uma página sobre [FROST](/zcash-tech/frost).

## Testnet

Testnet é uma chain separada com moedas sem valor, chamadas TAZ. Tanto Zebra quanto Zakura podem operar nela, e o [guia de testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) abrange a configuração de nós.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) é um explorador de blocos testnet funcional, com uma contraparte mainnet em [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Obter TAZ é a parte complicada, porque as faucets associadas a partir da documentação mais antiga deixaram de responder. [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) é uma faucet gerenciada pela comunidade que opera "seu próprio nó, carteira e minerador", paga "pequenas quantias blindadas z2z" e restringe as solicitações com "prova de trabalho no navegador em vez de um fornecedor de captcha". É open source sob a licença MIT. Se estiver indisponível, pergunte no Discord de P&D do Zcash, que é o que a própria documentação do Zcash sugere.

## Documentação geral

A [Documentação do Zcash](https://zcash.readthedocs.io/en/latest/) continua sendo a fonte individual mais abrangente, cobrindo conceitos do protocolo, integração e mineração. Leia-a com algum cuidado. Ela é versionada em relação a zcashd, por isso partes dela descrevem um nó que não funciona mais, enquanto as seções sobre o protocolo e light clients continuam úteis. O [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), disponível ali, merece ser lido antes de projetar qualquer coisa que envolva a privacidade do usuário.

Se você é novo em blockchains em geral, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) é a recomendação habitual para os fundamentos compartilhados e pode ser lido integralmente de forma gratuita. Não abrange transações blindadas.

## Outras ferramentas mencionadas por desenvolvedores

[Arti](https://docs.rs/arti/latest/arti/) é a implementação de Tor em Rust, usada por zcash_client_backend para encaminhar o tráfego das carteiras. [Tailscale](https://github.com/tailscale/tailscale) é usado para se conectar a um nó que você mesmo opera. [warp2](https://github.com/hhanh00/warp2) é uma implementação de sincronização rápida de Hanh, embora não seja atualizada desde 2023.

## Comunidade e eventos

O [Discord de P&D do Zcash](https://discord.gg/6AK7keWFaK) é onde o desenvolvimento de protocolos e carteiras é discutido, e o [Fórum da Comunidade Zcash](https://forum.zcashcommunity.com/) reúne propostas mais extensas e tópicos de suporte.

Os resultados dos hackathons recentes são uma boa imagem do que as pessoas estão criando: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) e o [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Recursos descontinuados

Mantidos porque artigos mais antigos têm links para eles e porque continuam sendo a referência para o comportamento do nó descontinuado. Não comece aqui.

[The zcashd Book](https://zcash.github.io/zcash/) e a [referência RPC de zcashd](https://zcash.github.io/rpc/) documentam software que chegou ao [fim de vida](https://zcash.github.io/zcash/user/end-of-life.html) em julho de 2026. O repositório [zcash/zcash](https://github.com/zcash/zcash) está arquivado.

Se você tiver um recurso para adicionar, ou detectar algo aqui que tenha ficado desatualizado, abra uma issue ou um pull request. As equipes nem sempre têm capacidade para manter tudo atualizado, e sinalizar o que você encontrou ajuda a orientar os guias.

**Última atualização:** agosto de 2026
