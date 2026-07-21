#  <img src="https://github.com/user-attachments/assets/e38b13a9-d410-426a-a1e6-2dde105d56c4" alt="Texto Alternativo" width="50"/> ZingoLabs

[Site Oficial](https://zingolabs.org/) - [Github](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs é uma equipe de visionários dedicada a aprimorar a experiência humana. Acreditamos que a tecnologia deve beneficiar a humanidade e que prosperamos por meio de interações consensuais. Estamos identificando os padrões que tornam isso possível.

O Zingo Lab Cyan opera como uma Shielded DAO. Armazenamos nossos fundos em uma tesouraria onde cada membro tem uma Viewing Key. Os fundos são gastos da tesouraria quando os membros votam a favor de uma proposta.

## Projetos

### Zingo! Wallet ([Github](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet é uma carteira Zcash completa, projetada para ser fácil de usar, embora inclua alguns recursos avançados para usuários mais experientes. Ela oferece suporte aos pools transparent, Sapling e Orchard, possui um catálogo de endereços para pagamentos recorrentes e está disponível em vários idiomas. Foi a primeira carteira a oferecer suporte ao Orchard e a implementar os formatos NU5.

Uma das principais funcionalidades da Zingo! é sua capacidade de usar o campo Memo para oferecer informações valiosas sobre suas transações.

Zingo! está disponível para dispositivos móveis e PCs. Você encontrará todos os downloads [aqui](https://zingolabs.org/)

### Zingolib ([Github](https://github.com/zingolabs/zingolib))
Uma API e um aplicativo de teste que expõem funcionalidades do zcash para consumo por aplicativos. O Zingolib fornece tanto uma biblioteca para o zingo-mobile quanto uma aplicação cli incluída para interagir com o zcashd via lightwalletd chamada Zingo-cli, um cliente proxy de lightwalletd em linha de comando.

### Zaino Indexer ([Github](https://github.com/zingolabs/zaino))
Zaino é um indexador desenvolvido em Rust pela equipe Zingo, com o objetivo de substituir o lightwalletd e impulsionar o projeto de descontinuação do zcashd.

Zaino oferece recursos essenciais tanto para clientes leves, como carteiras e aplicações que não exigem o histórico completo da blockchain, quanto para clientes completos ou carteiras. Ele também oferece suporte a exploradores de blocos, concedendo acesso tanto à blockchain finalizada quanto à melhor cadeia não finalizada e à mempool gerenciadas por um validador completo Zebra ou Zcashd.

###  ZLN (zcash-local-net) ([Github](https://github.com/zingolabs/zcash-local-net))
Um conjunto de utilitários que inicia e gerencia processos Zcash. Isso é usado para testes de integração no desenvolvimento de:
- clientes leves
- indexadores
- validadores

Seu objetivo é oferecer um ambiente de testes altamente adaptável e robusto para nós centrais (validadores), como zcash e zebra, indexadores como lightwallet e zaino e, no mínimo, o zingo-cli como uma carteira de cliente leve.

Este repositório foi projetado para comparar a funcionalidade de vários validadores (como Zcashd e Zebrad) e indexadores (como Lightwalletd e Zaino) para facilitar a migração durante o processo de descontinuação do Zcashd.

Além de fornecer ferramentas para iniciar, armazenar em cache e carregar dados da cadeia Zcash (para mainnet, testnet e regtest), o zcash-zocal-net inclui uma série de testes para comparar as capacidades do Lightwalletd e do Zaino em todos os serviços Lightwallet RPC. Esses testes podem ser executados diretamente a partir do Zaino (veja [https://github.com/zingolabs/zaino/blob/dev/docs/testing.md](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)]) para avaliar os serviços Lightwallet RPC hospedados no Zaino.
