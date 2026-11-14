<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Recursos para desenvolvedores

Os recursos de que você precisa para construir no Zcash, agrupados pela finalidade de cada um em vez de listados em uma única pilha.

O stack mudou bastante em 2026. O zcashd, que operou a rede durante a maior parte de sua história, chegou ao fim da vida útil em 18 de julho de 2026 na altura de bloco 3417100, e todos os nós não modificados foram desligados nessa altura e se recusarão a reiniciar. Os guias escritos para o zcashd agora são história, e não um ponto de partida, por isso esta página está organizada em torno do que o substituiu.

## Visão geral do stack

| Camada | O que usar | Comece por |
|:--|:--|:--|
| Nó integral | Zebra ou Zakura | [O livro do Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Carteira de nó integral | Zallet, em beta | [O livro da Zallet](https://zcash.github.io/zallet/) |
| Servidor de carteira leve | Zaino ou lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Bibliotecas de carteira | Os crates do librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobile | SDKs para Android e iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Especificação | Especificação do protocolo e ZIPs | [zips.z.cash](https://zips.z.cash) |

## Nós

Um nó valida o consenso e mantém a chain. Existem duas implementações em desenvolvimento ativo.

O [Zebra](/zcash-tech/zebra-full-node) é o nó da Zcash Foundation, escrito em Rust, e é o que a maioria dos guias pressupõe atualmente. [O livro do Zebra](https://zebra.zfnd.org/) explica como instalá-lo e executá-lo, e o [repositório](https://github.com/ZcashFoundation/zebra) é onde o desenvolvimento acontece.

O [Zakura](/zcash-tech/zakura-node) é um nó mais recente, descrito por seus autores como um "nó integral do Zcash compatível com o consenso, construído para escalar", com sincronização mais rápida, poda de blocos e um modo de compatibilidade com o zcashd. Ele é liderado por Sean Bowe, cofundador da Zcash, e Dev Ojha. É open source sob a licença Apache 2.0 em [zakura-core/zakura](https://github.com/zakura-core/zakura).

O ZecHub tem uma página sobre [nós integrais](/zcash-tech/full-nodes) que aborda as vantagens e desvantagens de cada um.

## A carteira de nó integral

O zcashd incluía uma carteira junto com o nó. Essa carteira não existe mais, e a [Zallet](https://github.com/zcash/zallet) é a substituta. O livro da Zallet a descreve como "uma carteira de nó integral do Zcash escrita em Rust" que está sendo "construída como substituta da carteira do zcashd".

Leia o aviso de segurança antes de depender dela. A Zallet está em beta, "não foi totalmente revisada", mudanças incompatíveis "podem ocorrer a qualquer momento, exigindo que você exclua e recrie sua carteira Zallet", e nem todos os métodos RPC do zcashd foram portados ainda.

Se você estiver migrando uma configuração existente, o ZecHub tem um [guia de migração do zcashd para o Zebra e a Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) e uma [referência rápida da Zallet](/using-zcash/zallet-quick-reference-guide).

## Servidores de carteira leve

A maioria das carteiras não executa um nó. Elas se comunicam com um servidor que mantém a chain e devolve uma visão compacta dela.

O [lightwalletd](https://github.com/zcash/lightwalletd) é o serviço original, escrito em Go, descrito como "um serviço de backend que fornece uma interface eficiente em largura de banda para a blockchain do Zcash". O [Zaino](/zcash-tech/zaino) é o indexador mais recente, escrito em Rust, e lê os dados de um validador completo em vez de manter sua própria cópia da chain.

A documentação do [protocolo de light client](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) aborda o próprio protocolo. A página sobre [nós de carteira leve](/zcash-tech/lightwallet-nodes) explica o que esses servidores podem e não podem ver sobre um usuário, o que vale a pena entender antes de escolher um.

## Construindo uma carteira

A maior parte do trabalho com carteiras acontece nos crates do Rust em [librustzcash](https://github.com/zcash/librustzcash), sobre os quais os SDKs mobile e várias carteiras desktop são construídos. Cada crate está documentado no [docs.rs](https://docs.rs).

| Crate | Para que serve |
|:--|:--|
| zcash_client_backend | "APIs para criar light clients blindados do Zcash", incluindo sincronização e construção de transações |
| zcash_client_sqlite | "Um light client do Zcash baseado em SQLite", a camada de armazenamento do anterior |
| zcash_keys | "Gerenciamento de chaves e endereços do Zcash" |
| zcash_primitives | "Implementações em Rust das primitivas do Zcash" |
| zcash_protocol | "Constantes de rede e tipos de valor do protocolo Zcash" |
| orchard | "O protocolo de transações blindadas Orchard" |
| sapling-crypto | "Biblioteca criptográfica para Zcash Sapling" |
| pczt | "Ferramentas para trabalhar com transações do Zcash parcialmente criadas", usadas para assinatura em hardware e em vários dispositivos |
| zip321 | URIs de solicitação de pagamento, conforme especificado na ZIP 321 |

Para mobile, o [SDK para Android](https://github.com/zcash/zcash-android-wallet-sdk) e o [SDK para iOS](https://github.com/zcash/zcash-swift-wallet-sdk) encapsulam essas bibliotecas. O repositório do iOS se chamava anteriormente ZcashLightClientKit, por isso links e artigos mais antigos usam esse nome.

## Especificação e criptografia

A [especificação do protocolo](https://zips.z.cash/protocol/protocol.pdf) é a referência oficial sobre como o Zcash funciona, incluindo as [codificações de endereços e chaves](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

As [ZIPs](https://zips.z.cash) são onde as mudanças são propostas e especificadas, e o índice mostra quais são rascunhos e quais são finais. As mudanças de consenso são lançadas em atualizações da rede, e o ZecHub acompanha essas atualizações na página [Atualizações da rede](/start-here/network-upgrades).

Para a criptografia subjacente, leia [O livro do halo2](https://zcash.github.io/halo2/index.html) e [O livro do Orchard](https://zcash.github.io/orchard/), junto com a documentação dos crates [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) e [orchard](https://docs.rs/orchard/latest/orchard/). [O livro do FROST](https://frost.zfnd.org/) aborda assinaturas de limiar, e o ZecHub tem uma página sobre [FROST](/zcash-tech/frost).

## Testnet

A testnet é uma chain separada com moedas sem valor, chamadas TAZ. Tanto o Zebra quanto o Zakura podem rodar nela, e o [guia da testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) aborda a configuração do nó.

O [testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) é um explorador de blocos da testnet que funciona, com um equivalente para a mainnet em [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Obter TAZ é a parte complicada, porque os faucets indicados na documentação mais antiga pararam de responder. O [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) é um faucet mantido pela comunidade que executa "seu próprio nó, carteira e minerador", paga "gotas blindadas z2z" e controla as solicitações com "prova de trabalho no navegador em vez de um fornecedor de captcha". Ele é open source sob a licença MIT. Se ele estiver indisponível, pergunte no Zcash de P&D Discord, que é o que a própria documentação do Zcash sugere.

## Documentação geral

A [documentação do Zcash](https://zcash.readthedocs.io/en/latest/) ainda é a fonte única mais abrangente, cobrindo conceitos do protocolo, integração e mineração. Leia-a com certo cuidado. Ela é versionada com base no zcashd, então partes dela descrevem um nó que não está mais em execução, enquanto as seções sobre o protocolo e sobre light client continuam úteis. O [modelo de ameaças do aplicativo de carteira Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) que está lá vale a pena ser lido antes de projetar qualquer coisa que afete a privacidade do usuário.

Se você é novo em blockchains em geral, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) é a recomendação habitual para os fundamentos comuns e pode ser lido gratuitamente na íntegra. Ele não aborda transações blindadas.

## Outras ferramentas mencionadas por desenvolvedores

O [Arti](https://docs.rs/arti/latest/arti/) é a implementação em Rust do Tor, usada pelo zcash_client_backend para rotear o tráfego da carteira. O [Tailscale](https://github.com/tailscale/tailscale) costuma ser citado para se conectar a um nó que você mesmo executa. O [warp2](https://github.com/hhanh00/warp2) é uma implementação de sincronização rápida feita por Hanh, embora não seja atualizado desde 2023.

## Comunidade e eventos

O [Zcash de P&D Discord](https://discord.gg/6AK7keWFaK) é onde o desenvolvimento do protocolo e das carteiras é discutido, e o [fórum da comunidade Zcash](https://forum.zcashcommunity.com/) reúne propostas mais longas e tópicos de suporte.

Os resultados de hackathons recentes dão uma boa ideia do que as pessoas estão construindo: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) e o [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Recursos descontinuados

Mantidos porque artigos mais antigos apontam para eles e porque ainda são a referência sobre como o nó descontinuado se comportava. Não comece por aqui.

[O livro do zcashd](https://zcash.github.io/zcash/) e a [referência RPC do zcashd](https://zcash.github.io/rpc/) documentam um software que chegou ao [fim da vida útil](https://zcash.github.io/zcash/user/end-of-life.html) em julho de 2026. O repositório [zcash/zcash](https://github.com/zcash/zcash) está arquivado.

Se você tem um recurso para adicionar ou encontrar algo aqui que esteja desatualizado, abra uma issue ou um pull request. As equipes nem sempre têm capacidade de manter tudo atualizado, e apontar os problemas que você encontrou ajuda a orientar os guias.

**Última atualização:** agosto de 2026
