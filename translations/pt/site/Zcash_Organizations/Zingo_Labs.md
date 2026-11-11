#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Site oficial](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs é uma equipe de visionários dedicada a melhorar a experiência humana. Acreditamos que a tecnologia deve beneficiar a humanidade e que prosperamos por meio de interações consensuais. Estamos identificando os padrões que tornam isso possível.

Zingo Lab Cyan funciona como uma DAO blindada. Guardamos nossos fundos em um tesouro onde cada membro tem uma chave de visualização. Os fundos são gastos do tesouro quando os membros votam a favor de uma proposta.

## Projetos

### Zingo! Wallet ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet é uma carteira Zcash completa, projetada para ser fácil de usar, embora inclua alguns recursos avançados para usuários mais experientes. Suporta pools transparentes, Sapling e Ironwood, possui um catálogo de endereços para pagamentos recorrentes e está disponível em vários idiomas. Foi a primeira carteira a oferecer suporte ao Orchard e a implementar formatos NU5.

Uma das principais funcionalidades do Zingo! é sua capacidade de usar o campo de memorando para oferecer informações valiosas sobre suas transações.

Zingo! está disponível para dispositivos móveis e PCs. Você encontrará todos os downloads [aqui](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Uma API e um aplicativo de teste que expõe funcionalidades do Zcash para consumo por aplicativos. Zingolib disponibiliza tanto uma biblioteca para zingo-mobile quanto um aplicativo cli incluído chamado zingo-cli, uma carteira leve de linha de comando que se comunica com um indexador de chain como [Zaino](/zcash-tech/zaino).

### Indexador Zaino ([GitHub](https://github.com/zingolabs/zaino))
Zaino é um indexador em Rust para a blockchain do Zcash, desenvolvido pela equipe Zingo. É o indexador na stack [Z3](/zcash-tech/z3-stack): indexa dados da chain de um validador [Zebra](/zcash-tech/zebra-full-node) e atende carteiras, exploradores e outros clientes. É o caminho sucessor do lightwalletd.

Zaino oferece funcionalidades essenciais tanto para light clients, como carteiras e aplicativos que não exigem o histórico completo da blockchain, quanto para clientes ou carteiras completos. Também oferece suporte a exploradores de blocos, concedendo acesso tanto à blockchain finalizada quanto à melhor chain não finalizada e ao mempool gerenciado por um validador integral Zebra.

`zcashd` atingiu sua interrupção de fim do suporte em 18 de julho de 2026, no bloco 3.417.100, e não oferece suporte ao Ironwood (NU6.3). Zaino lê dados de um validador Zebra.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Um conjunto de utilitários que inicia e gerencia processos do Zcash. Isso é usado para testes de integração no desenvolvimento de:
- clientes leves
- indexadores
- validadores

Seu objetivo é oferecer um ambiente de testes altamente adaptável e robusto para nós principais (validadores), como Zebra, indexadores como Zaino e carteiras de light clients como zingo-cli.

A stack padrão que ele inicia é Zebrad, zainod e zcash-devtool. Os processos legados `zcashd` e lightwalletd ficam atrás de um recurso `legacy-stack` sem suporte e estão programados para remoção.

Além de disponibilizar ferramentas para iniciar, armazenar em cache e carregar dados da chain do Zcash (para mainnet, testnet e regtest), zcash-local-net é usado pela suíte de testes do Zaino para avaliar os serviços Lightwallet RPC hospedados no Zaino (consulte a [documentação de testes do Zaino](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
