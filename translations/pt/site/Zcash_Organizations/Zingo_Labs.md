#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Website Oficial](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs é uma equipa de visionários dedicada a melhorar a experiência humana. Acreditamos que a tecnologia deve beneficiar a humanidade e que prosperamos através de interações consensuais. Estamos a identificar os padrões que tornam isto possível.

Zingo Lab Cyan funciona como uma DAO Shielded. Guardamos os nossos fundos numa tesouraria onde cada membro tem uma chave de visualização. Os fundos são gastos a partir da tesouraria quando os membros votam a favor de uma proposta.

## Projetos

### Zingo! Wallet ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet é uma carteira Zcash completa, concebida para ser fácil de utilizar, embora inclua algumas funcionalidades avançadas para utilizadores mais experientes. Suporta pools transparentes, Sapling e Ironwood, possui um livro de endereços para pagamentos recorrentes e está disponível em vários idiomas. Foi a primeira carteira a suportar Orchard e a implementar formatos NU5.

Uma das principais funcionalidades de Zingo! é a sua capacidade de utilizar o campo Memo para oferecer informações valiosas sobre as suas transações.

Zingo! está disponível para dispositivos móveis e PCs. Encontrará todos os downloads [aqui](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Uma API e aplicação de teste que expõe funcionalidades do zcash para consumo por aplicações. Zingolib disponibiliza tanto uma biblioteca para zingo-mobile como uma aplicação cli incluída denominada zingo-cli, uma carteira leve de linha de comandos que comunica com um indexador de cadeia como [Zaino](/zcash-tech/zaino).

### Zaino Indexador ([GitHub](https://github.com/zingolabs/zaino))
Zaino é um indexador Rust para a blockchain Zcash, desenvolvido pela equipa Zingo. É o indexador na stack [Z3](/zcash-tech/z3-stack): indexa dados da cadeia a partir de um validador [Zebra](/zcash-tech/zebra-full-node) e serve carteiras, exploradores e outros clientes. É o sucessor de lightwalletd.

Zaino oferece funcionalidades essenciais tanto para clientes leves, como carteiras e aplicações que não requerem o histórico completo da blockchain, como para clientes ou carteiras completos. Também suporta exploradores de blocos, concedendo acesso tanto à blockchain finalizada como à melhor cadeia não finalizada e à mempool gerida por um validador completo Zebra.

`zcashd` atingiu a sua interrupção de Fim de Suporte em 18 de julho de 2026, no bloco 3.417.100, e não suporta Ironwood (NU6.3). Zaino lê um validador Zebra.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Um conjunto de utilitários que inicia e gere processos Zcash. Isto é utilizado para testes de integração no desenvolvimento de:
- clientes leves
- indexadores
- validadores

O seu objetivo é oferecer um ambiente de testes altamente adaptável e robusto para nós principais (validadores), como Zebra, indexadores como Zaino e carteiras de clientes leves como zingo-cli.

A stack predefinida que inicia é Zebrad, zainod e zcash-devtool. Os processos legados `zcashd` e lightwalletd encontram-se por detrás de uma funcionalidade `legacy-stack` não suportada e estão programados para remoção.

Além de disponibilizar ferramentas para iniciar, colocar em cache e carregar dados da cadeia Zcash (para mainnet, testnet e regtest), zcash-local-net é utilizado a partir da suíte de testes de Zaino para avaliar os serviços Lightwallet RPC alojados em Zaino (consulte a documentação de testes [Zaino](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
