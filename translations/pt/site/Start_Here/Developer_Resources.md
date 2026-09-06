<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Recursos para Desenvolvedores

Os recursos de que precisa para desenvolver em Zcash, agrupados pela finalidade de cada um em vez de listados num único conjunto.

A stack mudou bastante em 2026. zcashd, que operou a rede durante a maior parte da sua história, chegou ao fim de vida em 18 de julho de 2026, à altura de bloco 3417100, e todos os nós sem alterações desligaram-se nessa altura e recusarão reiniciar. Os guias escritos para zcashd são agora história, e não um ponto de partida, por isso esta página está organizada em torno do que o substituiu.

## A stack num relance

| Camada | O que utilizar | Comece por |
|:--|:--|:--|
| Nó completo | Zebra ou Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Wallet de nó completo | Zallet, em beta | [The Zallet Book](https://zcash.github.io/zallet/) |
| Servidor de wallet leve | Zaino ou lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Bibliotecas de wallet | As crates librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobile | SDKs para Android e iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Especificação | Especificação do protocolo e ZIPs | [zips.z.cash](https://zips.z.cash) |

## Nós

Um nó valida o consenso e mantém a cadeia. Existem duas implementações em desenvolvimento ativo.

[Zebra](/zcash-tech/zebra-full-node) é o nó da Zcash Foundation, escrito em Rust, e é aquele que a maioria dos guias atualmente pressupõe. [The Zebra Book](https://zebra.zfnd.org/) explica como o instalar e executar, e o [repositório](https://github.com/ZcashFoundation/zebra) é onde o desenvolvimento acontece.

[Zakura](/zcash-tech/zakura-node) é um nó mais recente, descrito pelos seus autores como um "nó completo Zcash compatível com o consenso, criado para escalar", com sincronização mais rápida, poda de blocos e um modo de compatibilidade com zcashd. É liderado por Sean Bowe, cofundador de Zcash, e Dev Ojha. É open source sob a licença Apache 2.0 em [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub tem uma página de [Nós Completos](/zcash-tech/full-nodes) que aborda as vantagens e desvantagens entre eles.

## A wallet de nó completo

zcashd incluía uma wallet com o nó. Essa wallet desapareceu, e [Zallet](https://github.com/zcash/zallet) é a substituta. The Zallet Book descreve-a como "uma wallet Zcash de nó completo escrita em Rust", que está a ser "criada como substituta da wallet zcashd".

Leia o aviso de segurança antes de depender dela. Zallet está em beta, "não foi totalmente revista", podem ocorrer alterações incompatíveis "a qualquer momento, exigindo que elimine e recrie a sua wallet Zallet", e nem todos os métodos RPC de zcashd foram ainda portados.

Se estiver a migrar uma configuração existente, ZecHub tem um [guia de migração de zcashd para Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) e uma [referência rápida de Zallet](/using-zcash/zallet-quick-reference-guide).

## Servidores de wallet leve

A maioria das wallets não executa um nó. Comunicam com um servidor que mantém a cadeia e devolve uma visão compacta da mesma.

[lightwalletd](https://github.com/zcash/lightwalletd) é o serviço original, escrito em Go, descrito como "um serviço de backend que fornece uma interface eficiente em largura de banda para a blockchain Zcash". [Zaino](/zcash-tech/zaino) é o indexador mais recente, escrito em Rust, e lê a partir de um validador completo em vez de manter a sua própria cópia da cadeia.

A documentação do [Protocolo de Cliente Leve](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) explica o próprio protocolo. A página de [Nós de Wallet Leve](/zcash-tech/lightwallet-nodes) aborda o que estes servidores podem e não podem ver sobre um utilizador, algo que vale a pena compreender antes de escolher um.

## Criar uma wallet

A maior parte do trabalho em wallets acontece nas crates Rust em [librustzcash](https://github.com/zcash/librustzcash), nas quais os SDKs mobile e várias wallets desktop se baseiam. Cada crate está documentada em [docs.rs](https://docs.rs).

| Crate | Para que serve |
|:--|:--|
| zcash_client_backend | "APIs para criar clientes leves Zcash protegidos", incluindo sincronização e construção de transações |
| zcash_client_sqlite | "Um cliente leve Zcash baseado em SQLite", a camada de armazenamento para o anterior |
| zcash_keys | "Gestão de chaves e endereços Zcash" |
| zcash_primitives | "Implementações Rust dos primitivos Zcash" |
| zcash_protocol | "Constantes de rede e tipos de valores do protocolo Zcash" |
| orchard | "O protocolo de transações protegidas Orchard" |
| sapling-crypto | "Biblioteca criptográfica para Zcash Sapling" |
| pczt | "Ferramentas para trabalhar com transações Zcash parcialmente criadas", usadas para assinatura por hardware e em vários dispositivos |
| zip321 | URIs de pedidos de pagamento, conforme especificado em ZIP 321 |

Para mobile, o [SDK Android](https://github.com/zcash/zcash-android-wallet-sdk) e o [SDK iOS](https://github.com/zcash/zcash-swift-wallet-sdk) envolvem essas bibliotecas. O repositório iOS chamava-se anteriormente ZcashLightClientKit, pelo que links e artigos mais antigos utilizam esse nome.

## Especificação e criptografia

A [especificação do protocolo](https://zips.z.cash/protocol/protocol.pdf) é a autoridade sobre o funcionamento de Zcash, incluindo as [codificações de endereços e chaves](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

Os [ZIPs](https://zips.z.cash) são onde as alterações são propostas e especificadas, e o índice mostra quais são rascunhos e quais são finais. As alterações de consenso são lançadas em atualizações de rede, e ZecHub acompanha-as na página de [Atualizações de Rede](/start-here/network-upgrades).

Para a criptografia subjacente, leia [The halo2 Book](https://zcash.github.io/halo2/index.html) e [The Orchard Book](https://zcash.github.io/orchard/), juntamente com a documentação das crates [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) e [orchard](https://docs.rs/orchard/latest/orchard/). [The FROST Book](https://frost.zfnd.org/) aborda assinaturas de limiar, e ZecHub tem uma página sobre [FROST](/zcash-tech/frost).

## Testnet

A testnet é uma cadeia separada com moedas sem valor, chamadas TAZ. Tanto Zebra como Zakura podem ser executados nela, e o [guia da testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) aborda a configuração de nós.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) é um explorador de blocos testnet funcional, com uma versão mainnet em [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Obter TAZ é a parte mais complicada. Faucets públicos aparecem e desaparecem, e aqueles associados na documentação mais antiga não estavam a responder quando esta página foi escrita. A via fiável é perguntar no Discord de I&D de Zcash, que é o que a própria documentação de Zcash sugere.

## Documentação geral

A [Documentação Zcash](https://zcash.readthedocs.io/en/latest/) continua a ser a fonte única mais abrangente, cobrindo conceitos do protocolo, integração e mineração. Leia-a com algum cuidado. Está versionada para zcashd, pelo que partes dela descrevem um nó que já não funciona, embora as secções sobre o protocolo e clientes leves continuem úteis. Vale a pena ler o [Modelo de Ameaças da Aplicação de Wallet Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), que aí se encontra, antes de conceber algo que interfira com a privacidade dos utilizadores.

Se é novo em blockchains em geral, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) é a recomendação habitual para os fundamentos partilhados, e pode ser lido integralmente de forma gratuita. Não aborda transações protegidas.

## Outras ferramentas mencionadas por desenvolvedores

[Arti](https://docs.rs/arti/latest/arti/) é a implementação Rust de Tor, usada por zcash_client_backend para encaminhar o tráfego da wallet. [Tailscale](https://github.com/tailscale/tailscale) é mencionado para ligar a um nó que execute pessoalmente. [warp2](https://github.com/hhanh00/warp2) é uma implementação de sincronização rápida de Hanh, embora não tenha sido atualizada desde 2023.

## Comunidade e eventos

O [Discord de I&D de Zcash](https://discord.gg/6AK7keWFaK) é onde se discute o desenvolvimento do protocolo e de wallets, e o [Fórum da Comunidade Zcash](https://forum.zcashcommunity.com/) acolhe propostas mais extensas e tópicos de apoio.

Os resultados de hackathons recentes dão uma boa imagem do que as pessoas estão a construir: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) e o [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Recursos descontinuados

Mantidos porque artigos mais antigos lhes associam links e porque continuam a ser a referência sobre o comportamento do nó descontinuado. Não comece por aqui.

[The Zcashd Book](https://zcash.github.io/zcash/) e a [referência RPC de zcashd](https://zcash.github.io/rpc/) documentam software que chegou ao [fim de vida](https://zcash.github.io/zcash/user/end-of-life.html) em julho de 2026. O repositório [zcash/zcash](https://github.com/zcash/zcash) está arquivado.

Se tiver um recurso a acrescentar, ou encontrar algo aqui que esteja desatualizado, abra uma issue ou um pull request. As equipas nem sempre têm capacidade para manter tudo atualizado, e assinalar aquilo com que se deparou ajuda a orientar os guias.

**Última atualização:** agosto de 2026
