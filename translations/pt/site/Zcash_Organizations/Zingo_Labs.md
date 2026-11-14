#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Site oficial](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

A ZingoLabs é uma equipe de visionários dedicada a melhorar a experiência humana. Acreditamos que a tecnologia deve beneficiar a humanidade e que prosperamos por meio de interações consensuais. Estamos identificando os padrões que tornam isso possível.

A Zingo Lab Cyan opera como uma DAO blindada. Guardamos nossos fundos em um tesouro no qual cada membro tem uma chave de visualização. Os fundos do tesouro são gastos quando os membros votam a favor de uma proposta.

## Projetos

### Carteira Zingo! ([GitHub](https://github.com/zingolabs/zingo-mobile))
A carteira Zingo é uma carteira Zcash completa, projetada para ser fácil de usar, embora inclua alguns recursos avançados para usuários mais experientes. Ela oferece suporte às pools transparente, Sapling e Ironwood, tem um catálogo de endereços para pagamentos recorrentes e está disponível em vários idiomas. Foi a primeira carteira a oferecer suporte a Orchard e a implementar os formatos NU5.

Um dos principais recursos da Zingo! é a capacidade de usar o campo de memorando para oferecer informações valiosas sobre suas transações.

A Zingo! está disponível para dispositivos móveis e PCs. Você encontra todos os downloads [aqui](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Uma API e um aplicativo de teste que expõem as funcionalidades do Zcash para uso por aplicativos. O Zingolib fornece tanto uma biblioteca para o zingo-mobile quanto um aplicativo de linha de comando incluído chamado zingo-cli, uma carteira leve de linha de comando que se comunica com um indexador de chain como o [Zaino](/zcash-tech/zaino).

### Indexador Zaino ([GitHub](https://github.com/zingolabs/zaino))
O Zaino é um indexador em Rust para a blockchain do Zcash, desenvolvido pela equipe Zingo. Ele é o indexador da [stack Z3](/zcash-tech/z3-stack): indexa os dados da chain a partir de um validador [Zebra](/zcash-tech/zebra-full-node) e atende carteiras, exploradores e outros clientes. Ele é o caminho sucessor do lightwalletd.

O Zaino oferece recursos essenciais tanto para light clients, como carteiras e aplicativos que não precisam do histórico completo da blockchain, quanto para clientes ou carteiras completos. Ele também oferece suporte a exploradores de blocos, dando acesso tanto à blockchain finalizada quanto à melhor chain não finalizada e à mempool gerenciadas por um validador completo Zebra.

O `zcashd` atingiu sua parada de fim de suporte em 18 de julho de 2026, no bloco 3.417.100, e não oferece suporte ao Ironwood (NU6.3). O Zaino lê um validador Zebra.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Um conjunto de utilitários que inicia e gerencia processos Zcash. Ele é usado para testes de integração no desenvolvimento de:
- light clients
- indexadores
- validadores

Seu objetivo é oferecer um ambiente de testes altamente adaptável e robusto para nós principais (validadores) como o Zebra, indexadores como o Zaino e carteiras light client como a zingo-cli.

A stack padrão que ele inicia é composta por Zebrad, zainod e zcash-devtool. Os processos legados `zcashd` e lightwalletd ficam atrás de um recurso `legacy-stack` sem suporte e têm remoção programada.

Além de fornecer ferramentas para iniciar, armazenar em cache e carregar dados de chain do Zcash (para mainnet, testnet e regtest), o zcash-local-net é usado pelo conjunto de testes do Zaino para avaliar os serviços RPC Lightwallet hospedados no Zaino (consulte a [Zainodocumentação de testes](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
