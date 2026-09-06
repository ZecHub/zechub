<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Recursos para Desenvolvedores

Os recursos de que precisa para desenvolver sobre Zcash, agrupados pela finalidade de cada um em vez de reunidos numa única lista.

A stack mudou bastante em 2026. zcashd, que operou a rede durante a maior parte da sua história, chegou ao fim de vida a 18 de julho de 2026, à altura de bloco 3417100, e todos os nós não modificados foram encerrados nessa altura e recusarão reiniciar. Os guias escritos para zcashd são agora história, e não um ponto de partida; por isso, esta página está organizada em torno do que o substituiu.

## A stack em resumo

| Camada | O que utilizar | Comece por |
|:--|:--|:--|
| Nó completo | Zebra ou Zakura | [O Livro do Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Carteira de nó completo | Zallet, em beta | [O Livro do Zallet](https://zcash.github.io/zallet/) |
| Servidor de carteira leve | Zaino ou lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Bibliotecas para carteiras | As crates de librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Dispositivos móveis | SDKs para Android e iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Especificação | Especificação do protocolo e ZIPs | [zips.z.cash](https://zips.z.cash) |

## Nós

Um nó valida o consenso e mantém a cadeia. Existem duas implementações em desenvolvimento ativo.

[Zebra](/zcash-tech/zebra-full-node) é o nó da Zcash Foundation, escrito em Rust, e aquele que a maioria dos guias agora pressupõe. [O Livro do Zebra](https://zebra.zfnd.org/) abrange a sua instalação e execução, e o [repositório](https://github.com/ZcashFoundation/zebra) é onde o desenvolvimento acontece.

[Zakura](/zcash-tech/zakura-node) é um nó mais recente, descrito pelos seus autores como um "nó completo Zcash compatível com o consenso, construído para escalar", com sincronização mais rápida, poda de blocos e um modo de compatibilidade com zcashd. É liderado por Sean Bowe, cofundador da Zcash, e Dev Ojha. É open source sob a licença Apache 2.0 em [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub tem uma página sobre [Nós Completos](/zcash-tech/full-nodes) que abrange os compromissos entre eles.

## A carteira de nó completo

zcashd incluía uma carteira com o nó. Essa carteira desapareceu, e [Zallet](https://github.com/zcash/zallet) é a substituição. O Livro do Zallet descreve-a como "uma carteira Zcash de nó completo escrita em Rust", que está a ser "construída como substituta da carteira zcashd".

Leia o aviso de segurança antes de depender dela. Zallet está em beta, "não foi totalmente revista", podem ocorrer alterações incompatíveis "a qualquer momento, exigindo que elimine e recrie a sua carteira Zallet", e nem todos os métodos RPC de zcashd foram ainda portados.

Se estiver a migrar uma configuração existente, ZecHub tem um [guia de migração de zcashd para Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) e uma [referência rápida do Zallet](/using-zcash/zallet-quick-reference-guide).

## Servidores de carteiras leves

A maioria das carteiras não executa um nó. Comunicam com um servidor que mantém a cadeia e devolve uma vista compacta da mesma.

[lightwalletd](https://github.com/zcash/lightwalletd) é o serviço original, escrito em Go, descrito como "um serviço de backend que fornece uma interface eficiente em largura de banda para a blockchain Zcash". [Zaino](/zcash-tech/zaino) é o indexador mais recente, escrito em Rust, e lê a partir de um validador completo em vez de manter a sua própria cópia da cadeia.

A documentação do [Protocolo de Cliente Leve](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) abrange o próprio protocolo. A página [Nós Lightwallet](/zcash-tech/lightwallet-nodes) explica o que estes servidores podem e não podem ver sobre um utilizador, algo que vale a pena compreender antes de escolher um.

## Criar uma carteira

A maior parte do trabalho com carteiras ocorre nas crates Rust sob [librustzcash](https://github.com/zcash/librustzcash), nas quais os SDKs móveis e várias carteiras de desktop se baseiam. Cada crate está documentada em [docs.rs](https://docs.rs).

| Crate | Para que serve |
|:--|:--|
| zcash_client_backend | "APIs para criar clientes leves Zcash blindados", incluindo sincronização e construção de transações |
| zcash_client_sqlite | "Um cliente leve Zcash baseado em SQLite", a camada de armazenamento para o anterior |
| zcash_keys | "Gestão de chaves e endereços Zcash" |
| zcash_primitives | "Implementações Rust das primitivas Zcash" |
| zcash_protocol | "Constantes de rede e tipos de valores do protocolo Zcash" |
| orchard | "O protocolo de transações blindadas Orchard" |
| sapling-crypto | "Biblioteca criptográfica para Zcash Sapling" |
| pczt | "Ferramentas para trabalhar com transações Zcash parcialmente criadas", utilizadas para assinaturas de hardware e em vários dispositivos |
| zip321 | URIs de pedidos de pagamento, conforme especificado em ZIP 321 |

Para dispositivos móveis, o [SDK Android](https://github.com/zcash/zcash-android-wallet-sdk) e o [SDK iOS](https://github.com/zcash/zcash-swift-wallet-sdk) encapsulam essas bibliotecas. O repositório iOS chamava-se anteriormente ZcashLightClientKit, pelo que as ligações e artigos mais antigos usam esse nome.

## Especificação e criptografia

A [especificação do protocolo](https://zips.z.cash/protocol/protocol.pdf) é a autoridade sobre o funcionamento de Zcash, incluindo [codificações de endereços e chaves](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIPs](https://zips.z.cash) são onde as alterações são propostas e especificadas, e o índice mostra quais são rascunhos e quais são finais. As alterações de consenso são lançadas em atualizações de rede, e ZecHub acompanha-as na página [Atualizações de Rede](/start-here/network-upgrades).

Para a criptografia subjacente, leia [O Livro halo2](https://zcash.github.io/halo2/index.html) e [O Livro Orchard](https://zcash.github.io/orchard/), juntamente com a documentação das crates [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) e [orchard](https://docs.rs/orchard/latest/orchard/). [O Livro FROST](https://frost.zfnd.org/) abrange assinaturas de limiar, e ZecHub tem uma página sobre [FROST](/zcash-tech/frost).

## Rede de teste

A rede de teste é uma cadeia separada com moedas sem valor, chamadas TAZ. Tanto Zebra como Zakura podem ser executados nela, e o [guia da rede de teste](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) abrange a configuração de nós.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) é um explorador de blocos funcional da rede de teste, com uma versão equivalente da rede principal em [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Obter TAZ é a parte complicada. As faucets públicas aparecem e desaparecem, e as indicadas na documentação mais antiga não respondiam quando esta página foi escrita. A via fiável é perguntar no Discord de I&D da Zcash, que é o que a própria documentação da Zcash sugere.

## Documentação geral

[Documentação Zcash](https://zcash.readthedocs.io/en/latest/) continua a ser a fonte única mais abrangente, cobrindo conceitos do protocolo, integração e mineração. Leia-a com algum cuidado. Está versionada para zcashd, pelo que partes dela descrevem um nó que já não é executado, enquanto as secções sobre o protocolo e clientes leves permanecem úteis. O [Modelo de Ameaças da Aplicação de Carteira Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), que se encontra aí, merece ser lido antes de conceber algo que afete a privacidade dos utilizadores.

Se é novo em blockchains em geral, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) é a recomendação habitual para os fundamentos partilhados, e pode ser lido integralmente de forma gratuita. Não abrange transações blindadas.

## Outras ferramentas mencionadas por desenvolvedores

[Arti](https://docs.rs/arti/latest/arti/) é a implementação Rust de Tor, utilizada por zcash_client_backend para encaminhar tráfego de carteiras. [Tailscale](https://github.com/tailscale/tailscale) é referido para a ligação a um nó que execute por conta própria. [warp2](https://github.com/hhanh00/warp2) é uma implementação de sincronização rápida de Hanh, embora não seja atualizada desde 2023.

## Comunidade e eventos

O [Discord de I&D da Zcash](https://discord.gg/6AK7keWFaK) é onde o desenvolvimento de protocolos e carteiras é discutido, e o [Fórum da Comunidade Zcash](https://forum.zcashcommunity.com/) acolhe propostas mais extensas e tópicos de suporte.

Os resultados de hackathons recentes dão uma boa imagem do que as pessoas estão a criar: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) e o [Hackathon Zypherpunk 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Recursos descontinuados

Mantidos porque artigos mais antigos fazem ligações para eles, e porque continuam a ser a referência para o comportamento do nó descontinuado. Não comece aqui.

[O Livro Zcashd](https://zcash.github.io/zcash/) e a [referência RPC de zcashd](https://zcash.github.io/rpc/) documentam software que chegou ao [fim de vida](https://zcash.github.io/zcash/user/end-of-life.html) em julho de 2026. O repositório [zcash/zcash](https://github.com/zcash/zcash) está arquivado.

Se tiver um recurso a adicionar, ou detetar algo aqui que tenha ficado desatualizado, abra uma issue ou um pull request. As equipas nem sempre têm capacidade para manter tudo atualizado, e assinalar o que encontrou ajuda a orientar os guias.

**Última atualização:** agosto de 2026
