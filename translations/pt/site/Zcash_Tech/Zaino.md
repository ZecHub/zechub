# Indexador Zaino

Zaino é um Indexador, desenvolvido em Rust pela equipa Zingo, que tem como objetivo substituir lightwalletd e impulsionar o projeto de descontinuação do zcashd.

Zaino oferece funcionalidades essenciais tanto para clientes leves, como carteiras e aplicações que não requerem o histórico completo da blockchain, quanto para clientes completos ou carteiras. Também oferece suporte a exploradores de blocos, concedendo acesso tanto à blockchain finalizada quanto à melhor cadeia não finalizada e à mempool geridas por um validador completo Zebra ou Zcashd.

## Por que um novo Indexador?

A principal razão é preparar-se para o futuro. Zcashd e lightwalletd foram construídos em 2016 a partir de um fork do código do bitcoind, usando C plus plus. A plataforma e o código usados para construir ambos os serviços estão a começar a envelhecer, tornando-se difíceis de escalar, manter e usar para desenvolver funcionalidades modernas.

Rust é uma linguagem moderna, robusta e segura que permite ao Zcash preparar-se para o desenvolvimento futuro, convidando novos programadores a criar muitas novas funcionalidades no e ao redor do ecossistema Zcash.

Ainda assim, Zaino procura ser retrocompatível sempre que possível, fornecendo APIs e interfaces que ajudam a reduzir o atrito na adoção e a garantir que o ecossistema Zcash em geral possa beneficiar das melhorias do Zaino sem reescritas significativas nem curvas de aprendizagem acentuadas.

Além disso, Zaino permitirá separar a funcionalidade do cliente leve do nó completo, através de acesso RPC e de uma biblioteca completa de cliente, permitindo aos programadores integrar Zaino e aceder diretamente aos dados da cadeia a partir da sua aplicação de cliente leve, mantendo os dados sensíveis do nó Zebra isolados e seguros.

## Alguns diagramas que mostram como o Zaino funciona

### Arquitetura Interna do Zaino
![Arquitetura Interna do Zaino](https://i.ibb.co/mRTNtfy/image-2025-01-02-190143429.png)

### Arquitetura do Serviço Ativo do Zaino
![Arquitetura do Serviço Ativo do Zebra](https://i.ibb.co/x7dbRY8/image-2025-01-02-190349017.png)

### Arquitetura do Sistema Zaino
![Arquitetura do Sistema Zaino](https://i.ibb.co/wwL0XZv/image-2025-01-02-190448037.png)


## Onde posso aprender mais?
Pode ler mais sobre o Indexador Zaino no [tópico oficial do Fórum da Comunidade Zcash](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation/48545/38) ou na sua [página oficial no Github](https://github.com/zingolabs/zaino)
