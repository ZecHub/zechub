<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Recursos para Programadores

Os recursos de que precisa para desenvolver sobre Zcash, agrupados pela finalidade de cada um em vez de listados num único monte.

A stack mudou muito em 2026. zcashd, que executou a rede durante a maior parte da sua história, chegou ao fim de vida a 18 de julho de 2026, na altura de bloco 3417100, e todos os nós não modificados foram encerrados nessa altura e recusar-se-ão a reiniciar. Os guias escritos para zcashd são agora história, em vez de um ponto de partida, pelo que esta página está organizada em torno do que o substituiu.

## A stack em resumo

| Camada | O que utilizar | Comece por |
|:--|:--|:--|
| Nó completo | Zebra ou Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Wallet de nó completo | Zallet, em beta | [The Zallet Book](https://zcash.github.io/zallet/) |
| Servidor de wallet leve | Zaino ou lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Bibliotecas de wallet | As crates librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Dispositivos móveis | SDKs para Android e iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Especificação | Especificação do protocolo e ZIPs | [zips.z.cash](https://zips.z.cash) |

## Nós

Um nó valida o consenso e mantém a cadeia. Existem duas implementações em desenvolvimento ativo.

[Zebra](/zcash-tech/zebra-full-node) é o nó da Zcash Foundation, escrito em Rust, e é aquele que a maioria dos guias agora pressupõe. [The Zebra Book](https://zebra.zfnd.org/) abrange a sua instalação e execução, e o [repositório](https://github.com/ZcashFoundation/zebra) é onde o desenvolvimento acontece.

[Zakura](/zcash-tech/zakura-node) é um nó mais recente, descrito pelos seus autores como um "nó completo Zcash compatível com o consenso, criado para escala", com sincronização mais rápida, poda de blocos e um modo de compatibilidade com zcashd. É liderado por Sean Bowe, cofundador de Zcash, e Dev Ojha. É open source sob a licença Apache 2.0 em [zakura-core/zakura](https://github.com/zakura-core/zakura).

O ZecHub tem uma página de [Nós Completos](/zcash-tech/full-nodes) que abrange os compromissos entre ambos.

## A wallet de nó completo

zcashd incluía uma wallet com o nó. Essa wallet desapareceu, e [Zallet](https://github.com/zcash/zallet) é a substituta. The Zallet Book descreve-a como "uma wallet Zcash de nó completo escrita em Rust", que está a ser "criada como substituta da wallet zcashd".

Leia o aviso de segurança antes de depender dela. Zallet está em beta, "não foi totalmente revista", alterações incompatíveis "podem ocorrer a qualquer momento, obrigando-o a eliminar e recriar a sua wallet Zallet", e nem todos os métodos RPC de zcashd foram ainda portados.

Se estiver a migrar uma configuração existente, o ZecHub tem um [guia de migração de zcashd para Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) e uma [referência rápida do Zallet](/using-zcash/zallet-quick-reference-guide).

## Servidores de wallet leve

A maioria das wallets não executa um nó. Comunicam com um servidor que mantém a cadeia e devolve uma visão compacta da mesma.

[lightwalletd](https://github.com/zcash/lightwalletd) é o serviço original, escrito em Go, descrito como "um serviço de backend que fornece uma interface eficiente em largura de banda para a blockchain Zcash". [Zaino](/zcash-tech/zaino) é o indexador mais recente, escrito em Rust, e lê a partir de um validador completo em vez de manter a sua própria cópia da cadeia.

A documentação do [Protocolo de Cliente Leve](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) abrange o próprio protocolo. A página de [Nós Lightwallet](/zcash-tech/lightwallet-nodes) explica o que estes servidores podem e não podem ver sobre um utilizador, algo que vale a pena compreender antes de escolher um.

## Criar uma wallet

A maior parte do trabalho com wallets ocorre nas crates Rust sob [librustzcash](https://github.com/zcash/librustzcash), nas quais os SDKs móveis e várias wallets de desktop se baseiam. Cada crate está documentada em [docs.rs](https://docs.rs).

| Crate | Para que serve |
|:--|:--|
| zcash_client_backend | "APIs para criar clientes leves Zcash blindados", incluindo sincronização e construção de transações |
| zcash_client_sqlite | "Um cliente leve Zcash baseado em SQLite", a camada de armazenamento para o anterior |
| zcash_keys | "Gestão de chaves e endereços Zcash" |
| zcash_primitives | "Implementações em Rust dos primitivos Zcash" |
| zcash_protocol | "Constantes de rede e tipos de valores do protocolo Zcash" |
| orchard | "O protocolo de transações blindadas Orchard" |
| sapling-crypto | "Biblioteca criptográfica para Zcash Sapling" |
| pczt | "Ferramentas para trabalhar com transações Zcash parcialmente criadas", utilizadas para assinatura por hardware e em múltiplos dispositivos |
| zip321 | URIs de pedidos de pagamento, conforme especificado em ZIP 321 |

Para dispositivos móveis, o [SDK Android](https://github.com/zcash/zcash-android-wallet-sdk) e o [SDK iOS](https://github.com/zcash/zcash-swift-wallet-sdk) envolvem essas bibliotecas. O repositório iOS chamava-se anteriormente ZcashLightClientKit, pelo que as ligações e os artigos mais antigos utilizam esse nome.

## Especificação e criptografia

A [especificação do protocolo](https://zips.z.cash/protocol/protocol.pdf) é a autoridade sobre o funcionamento de Zcash, incluindo [codificações de endereços e chaves](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

Os [ZIPs](https://zips.z.cash) são onde as alterações são propostas e especificadas, e o índice mostra quais são rascunhos e quais são finais. As alterações de consenso são lançadas em atualizações de rede, e o ZecHub acompanha-as na página de [Atualizações de Rede](/start-here/network-upgrades).

Para a criptografia subjacente, leia [The halo2 Book](https://zcash.github.io/halo2/index.html) e [The Orchard Book](https://zcash.github.io/orchard/), juntamente com a documentação das crates [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) e [orchard](https://docs.rs/orchard/latest/orchard/). [The FROST Book](https://frost.zfnd.org/) abrange assinaturas de limiar, e o ZecHub tem uma página sobre [FROST](/zcash-tech/frost).

## Testnet

Testnet é uma cadeia separada com moedas sem valor, chamadas TAZ. Tanto Zebra como Zakura podem executar nela, e o [guia de testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) abrange a configuração de nós.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) é um explorador de blocos testnet funcional, com uma contraparte mainnet em [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Obter TAZ é a parte incómoda, porque as faucets associadas a partir da documentação mais antiga deixaram de responder. [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) é uma faucet gerida pela comunidade que executa "o seu próprio nó, wallet e miner", paga "pequenas quantias blindadas z2z" e restringe os pedidos com "proof of work no navegador em vez de um fornecedor de captcha". É open source sob a licença MIT. Se estiver indisponível, pergunte no Discord de I&D de Zcash, que é o que a própria documentação de Zcash sugere.

## Documentação geral

A [Documentação de Zcash](https://zcash.readthedocs.io/en/latest/) continua a ser a fonte individual mais abrangente, cobrindo conceitos do protocolo, integração e mineração. Leia-a com algum cuidado. Está versionada em relação a zcashd, pelo que partes dela descrevem um nó que já não funciona, enquanto as secções sobre o protocolo e clientes leves continuam úteis. O [Modelo de Ameaças da Aplicação Zcash Wallet](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), aí disponível, merece ser lido antes de projetar qualquer coisa que toque na privacidade dos utilizadores.

Se é novo em blockchains em geral, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) é a recomendação habitual para os fundamentos partilhados e pode ser lido integralmente de forma gratuita. Não abrange transações blindadas.

## Outras ferramentas mencionadas por programadores

[Arti](https://docs.rs/arti/latest/arti/) é a implementação de Tor em Rust, utilizada por zcash_client_backend para encaminhar tráfego de wallets. [Tailscale](https://github.com/tailscale/tailscale) surge para ligar a um nó que execute você próprio. [warp2](https://github.com/hhanh00/warp2) é uma implementação de sincronização rápida de Hanh, embora não seja atualizada desde 2023.

## Comunidade e eventos

O [Discord de I&D de Zcash](https://discord.gg/6AK7keWFaK) é onde o desenvolvimento de protocolos e wallets é discutido, e o [Fórum da Comunidade Zcash](https://forum.zcashcommunity.com/) reúne propostas mais extensas e tópicos de suporte.

Os resultados dos hackathons recentes são uma boa imagem do que as pessoas estão a criar: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) e o [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Recursos retirados

Mantidos porque artigos mais antigos fazem ligação para eles e porque continuam a ser a referência para o comportamento do nó retirado. Não comece aqui.

[The Zcashd Book](https://zcash.github.io/zcash/) e a [referência RPC de zcashd](https://zcash.github.io/rpc/) documentam software que chegou ao [fim de vida](https://zcash.github.io/zcash/user/end-of-life.html) em julho de 2026. O repositório [zcash/zcash](https://github.com/zcash/zcash) está arquivado.

Se tiver um recurso a adicionar, ou detetar algo aqui que tenha ficado desatualizado, abra uma issue ou um pull request. As equipas nem sempre têm capacidade para manter tudo atualizado, e assinalar aquilo que encontrou ajuda a orientar os guias.

**Última atualização:** agosto de 2026
