<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Recursos para Desenvolvedores

Os recursos de que precisa para desenvolver sobre Zcash, agrupados pelo fim a que cada um se destina em vez de estarem listados todos juntos.

A stack mudou bastante em 2026. `zcashd`, que executou a rede durante a maior parte da sua história, chegou ao fim de vida em 18 de julho de 2026 na altura de bloco 3417100, e todos os nós sem modificações desligaram-se nessa altura e recusar-se-ão a reiniciar. Os guias escritos para `zcashd` são agora história em vez de um ponto de partida, por isso esta página está organizada em torno do que o substituiu.

## A stack em resumo

| Camada | O que usar | Começar com |
|:--|:--|:--|
| Nó completo | Zebra ou Zakura | [O Livro do Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Wallet de nó completo | Zallet, em beta | [O Livro do Zallet](https://zcash.github.io/zallet/) |
| Servidor de wallet leve | Zaino ou lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Bibliotecas de wallet | As crates de librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobile | SDKs Android e iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Especificação | Especificação do protocolo e ZIPs | [zips.z.cash](https://zips.z.cash) |

## Nós

Um nó valida o consenso e mantém a cadeia. Existem duas implementações em desenvolvimento ativo.

[Zebra](/zcash-tech/zebra-full-node) é o nó da Zcash Foundation, escrito em Rust, e é aquele que a maioria dos guias agora assume. [O Livro do Zebra](https://zebra.zfnd.org/) cobre a sua instalação e execução, e o [repositório](https://github.com/ZcashFoundation/zebra) é onde o desenvolvimento acontece.

[Zakura](/zcash-tech/zakura-node) é um nó mais recente, descrito pelos seus autores como um "nó completo de Zcash compatível com o consenso, construído para escalar", com sincronização mais rápida, pruning de blocos e um modo de compatibilidade com `zcashd`. É liderado por Sean Bowe, cofundador da Zcash, e Dev Ojha. É open source sob a licença Apache 2.0 em [zakura-core/zakura](https://github.com/zakura-core/zakura).

O ZecHub tem uma página de [Nós Completos](/zcash-tech/full-nodes) que cobre os trade-offs entre eles.

## A wallet de nó completo

`zcashd` incluía uma wallet com o nó. Essa wallet desapareceu, e [Zallet](https://github.com/zcash/zallet) é a substituição. O Livro do Zallet descreve-o como "uma wallet Zcash de nó completo escrita em Rust" que está a ser "construída como substituição da wallet de zcashd".

Leia o aviso de segurança antes de depender dele. Zallet está em beta, "não foi totalmente revisto", alterações incompatíveis "podem ocorrer a qualquer momento, exigindo que elimine e recrie a sua wallet Zallet", e nem todos os métodos RPC de `zcashd` foram ainda migrados.

Se estiver a migrar uma configuração existente, o ZecHub tem um [guia de migração de zcashd para Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) e uma [referência rápida do Zallet](/using-zcash/zallet-quick-reference-guide).

## Servidores de wallet leve

A maioria das wallets não executa um nó. Ligam-se a um servidor que mantém a cadeia e devolve uma visão compacta da mesma.

[lightwalletd](https://github.com/zcash/lightwalletd) é o serviço original, escrito em Go, descrito como "um serviço backend que fornece uma interface eficiente em largura de banda para a blockchain Zcash". [Zaino](/zcash-tech/zaino) é o indexador mais recente, escrito em Rust, e lê a partir de um validador completo em vez de manter a sua própria cópia da cadeia.

A documentação do [Protocolo do Cliente Leve](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) cobre o próprio protocolo. A página [Nós de Lightwallet](/zcash-tech/lightwallet-nodes) cobre o que estes servidores podem e não podem ver sobre um utilizador, algo que vale a pena compreender antes de escolher um.

## Construir uma wallet

A maior parte do trabalho com wallets acontece nas crates Rust em [librustzcash](https://github.com/zcash/librustzcash), sobre as quais os SDKs mobile e várias wallets desktop são construídos. Cada crate está documentada em [docs.rs](https://docs.rs).

| Crate | Para que serve |
|:--|:--|
| zcash_client_backend | "APIs para criar clientes leves blindados de Zcash", incluindo sincronização e construção de transações |
| zcash_client_sqlite | "Um cliente leve de Zcash baseado em SQLite", a camada de armazenamento para o anterior |
| zcash_keys | "Gestão de chaves e endereços Zcash" |
| zcash_primitives | "Implementações em Rust dos primitivos de Zcash" |
| zcash_protocol | "Constantes de rede e tipos de valor do protocolo Zcash" |
| orchard | "O protocolo Orchard de transações blindadas" |
| sapling-crypto | "Biblioteca criptográfica para Zcash Sapling" |
| pczt | "Ferramentas para trabalhar com transações Zcash parcialmente criadas", usadas para assinatura por hardware e em vários dispositivos |
| zip321 | URIs de pedidos de pagamento, conforme especificado na ZIP 321 |

Para mobile, o [SDK Android](https://github.com/zcash/zcash-android-wallet-sdk) e o [SDK iOS](https://github.com/zcash/zcash-swift-wallet-sdk) encapsulam essas bibliotecas. O repositório iOS chamava-se anteriormente ZcashLightClientKit, por isso ligações e artigos mais antigos usam esse nome.

## Especificação e criptografia

A [especificação do protocolo](https://zips.z.cash/protocol/protocol.pdf) é a autoridade sobre como o Zcash funciona, incluindo [codificações de endereços e chaves](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

As [ZIPs](https://zips.z.cash) são onde as alterações são propostas e especificadas, e o índice mostra quais são rascunhos e quais são finais. As alterações de consenso são lançadas em network upgrades, e o ZecHub acompanha-as na página de [Network Upgrades](/start-here/network-upgrades).

Para a criptografia subjacente, leia [O Livro do halo2](https://zcash.github.io/halo2/index.html) e [O Livro do Orchard](https://zcash.github.io/orchard/), juntamente com a documentação das crates [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) e [orchard](https://docs.rs/orchard/latest/orchard/). [O Livro do FROST](https://frost.zfnd.org/) cobre assinaturas de limiar, e o ZecHub tem uma página sobre [FROST](/zcash-tech/frost).

## Testnet

A testnet é uma cadeia separada com moedas sem valor, chamadas TAZ. Tanto Zebra como Zakura podem executá-la, e o [guia da testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) cobre a configuração do nó.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) é um explorador de blocos de testnet funcional, com um equivalente de mainnet em [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Obter TAZ é a parte incómoda. As faucets públicas aparecem e desaparecem, e as ligadas na documentação mais antiga não estavam a responder quando esta página foi escrita. A via fiável é perguntar no Discord de I&D da Zcash, que é o que a própria documentação da Zcash sugere.

## Documentação geral

A [Documentação da Zcash](https://zcash.readthedocs.io/en/latest/) continua a ser a fonte única mais abrangente, cobrindo conceitos do protocolo, integração e mineração. Leia-a com algum cuidado. Está versionada em relação ao `zcashd`, por isso partes dela descrevem um nó que já não funciona, enquanto as secções sobre o protocolo e clientes leves continuam úteis. O [Modelo de Ameaças da Aplicação Wallet Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), que se encontra aí, vale a pena ser lido antes de desenhar qualquer coisa que toque na privacidade do utilizador.

Se é novo em blockchains de forma geral, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) é a recomendação habitual para os fundamentos partilhados, e pode ser lido gratuitamente na íntegra. Não cobre transações blindadas.

## Outras ferramentas mencionadas por programadores

[Arti](https://docs.rs/arti/latest/arti/) é a implementação Rust do Tor, usada por `zcash_client_backend` para encaminhar o tráfego da wallet. [Tailscale](https://github.com/tailscale/tailscale) surge para ligar a um nó que execute você mesmo. [warp2](https://github.com/hhanh00/warp2) é uma implementação de sincronização rápida por Hanh, embora não tenha sido atualizada desde 2023.

## Comunidade e eventos

O [Discord de I&D da Zcash](https://discord.gg/6AK7keWFaK) é onde se discute o desenvolvimento do protocolo e de wallets, e o [Fórum da Comunidade Zcash](https://forum.zcashcommunity.com/) acolhe propostas mais longas e tópicos de suporte.

Os resultados recentes de hackathons dão uma boa imagem do que as pessoas estão a construir: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) e o [Hackathon Zypherpunk 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Recursos descontinuados

Mantidos porque artigos mais antigos ligam para eles, e porque continuam a ser a referência de como o nó descontinuado se comportava. Não comece por aqui.

[O Livro do Zcashd](https://zcash.github.io/zcash/) e a [referência RPC de zcashd](https://zcash.github.io/rpc/) documentam software que chegou ao [fim de vida](https://zcash.github.io/zcash/user/end-of-life.html) em julho de 2026. O repositório [zcash/zcash](https://github.com/zcash/zcash) está arquivado.

Se tiver um recurso a acrescentar, ou detetar aqui algo que tenha ficado desatualizado, abra uma issue ou um pull request. As equipas nem sempre têm capacidade para manter tudo atualizado, e assinalar aquilo com que se deparou ajuda a orientar os guias.

**Última atualização:** agosto de 2026
