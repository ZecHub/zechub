# Indexador Zaino

Zaino é um indexador em Rust para a blockchain do Zcash. Lê dados da chain a partir de um nó integral Zebra e fornece os dados de que carteiras, exploradores, faucets e outros serviços necessitam, sem tornar o próprio Zebra responsável por cada índice destinado a clientes.

## Em resumo

* **Zebra** valida a chain do Zcash.
* **Zaino** indexa os dados da chain do Zebra e expõe APIs voltadas para clientes.
* **Zallet** é o componente de carteira na stack Z3. Na configuração padrão do Z3, Zallet se comunica diretamente com Zebra e não requer o serviço autônomo Zaino.
* O serviço autônomo Zaino é útil quando os operadores precisam de um endpoint gRPC compatível com lightwalletd, de um proxy JSON-RPC ou de infraestrutura para carteiras leves, exploradores, faucets e serviços semelhantes.
* Zaino é uma infraestrutura ativa, mas os operadores devem consultar a documentação oficial de Zaino e do Z3 para obter detalhes atuais de implantação antes de usá-lo em produção.

## O que o Zaino faz

Zaino fica entre Zebra e o software cliente. Zebra é o nó de consenso: baixa, verifica e acompanha a blockchain do Zcash. Zaino usa Zebra como fonte de dados da chain e depois prepara visualizações indexadas que os aplicativos clientes podem consultar com eficiência.

Esta separação mantém as funções claras:

| Componente | Função |
|:--|:--|
| Zebra | Nó integral e validador |
| Zaino | Indexador e serviço de API voltado para clientes |
| Zallet | Serviço de carteira |
| lightwalletd | Servidor de carteira leve mais antigo que o Zaino foi projetado para substituir ou complementar |

Zaino disponibiliza funcionalidades para light clients, clientes integrais ou carteiras e exploradores de blocos. Dá acesso à chain finalizada, à melhor chain não finalizada e aos dados da mempool mantidos pelo Zebra.

## Como se encaixa na stack atual do Zcash

A stack Z3 atual é construída em torno de Zebra, Zallet e do Zaino opcional.

Na implantação padrão do Z3, Zebra e Zallet são executados juntos. Zallet se conecta diretamente ao Zebra, portanto um operador que execute apenas uma stack de carteira local não precisa iniciar o serviço autônomo Zaino.

Zaino é adicionado quando o operador quer atender clientes externos. No Z3, ele é executado por meio do perfil Compose `indexer` e adiciona:

* um endpoint gRPC compatível com lightwalletd para clientes de carteiras leves
* um proxy JSON-RPC para exploradores, faucets e backends de serviços
* um banco de dados do indexador separado do estado da chain do Zebra

Isso torna o Zaino particularmente relevante para backends de carteiras, operadores de infraestrutura pública, exploradores, faucets e desenvolvedores que testam serviços que precisam de dados indexados da chain do Zcash.

## Zaino e lightwalletd

lightwalletd é o servidor original de carteira leve. Zaino é o caminho sucessor baseado em Rust para essa função. Seu objetivo é fornecer APIs compatíveis sempre que possível, para que carteiras e serviços possam migrar sem precisarem ser completamente reescritos de uma só vez.

Isso não significa que todas as implantações do lightwalletd já tenham migrado para o Zaino. Os operadores devem tratar o Zaino como parte da stack atual baseada no Zebra e consultar a documentação, as versões e os painéis de serviço mais recentes do projeto antes de escolher o que executar.

## Notas para operadores

O caminho oficial de implantação mais simples é o repositório Z3. O Z3 inclui Zaino como serviço opcional:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Execute primeiro a configuração normal do Z3 e aguarde o Zebra sincronizar antes de iniciar serviços dependentes na mainnet ou testnet.

Zaino expõe dois tipos de serviço de rede. O serviço gRPC é a API voltada para carteiras leves. O serviço JSON-RPC destina-se a loopback ou redes privadas confiáveis, a menos que uma camada externa forneça proteção. Não exponha à internet pública um endpoint JSON-RPC sem autenticação ou criptografia.

## Alguns diagramas que mostram como o Zaino funciona

### Arquitetura interna do Zaino

![Arquitetura interna do Zaino](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Arquitetura do serviço ativo do Zaino

![Arquitetura do serviço ao vivo da Zebra](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Arquitetura do sistema Zaino

![Arquitetura do sistema Zaino](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Erros comuns

**Tratar o Zaino como um nó integral.** Zaino não é o validador. Zebra valida a chain; Zaino indexa dados do Zebra.

**Presumir que toda implantação do Z3 precisa do Zaino autônomo.** Zallet pode se conectar diretamente ao Zebra na stack padrão do Z3. Inicie o Zaino quando precisar do serviço de indexador autônomo para clientes externos.

**Apresentar funcionalidades planejadas como se já estivessem implantadas.** Zaino está em desenvolvimento ativo; consulte as notas de lançamento e a documentação atuais antes de descrever uma funcionalidade como disponível.

**Expor JSON-RPC sem cuidado.** A interface JSON-RPC do Zaino destina-se a loopback ou redes privadas confiáveis, a menos que seja protegida por outra camada.

## Onde posso saber mais?

* [Repositório do Zaino no GitHub](https://github.com/zingolabs/zaino)
* [Versões do Zaino](https://github.com/zingolabs/zaino/releases)
* [Documentação gerada do Zaino](https://zingolabs.github.io/zaino/)
* [Repositório de implantação do Z3](https://github.com/ZcashFoundation/z3)
* [Documentação do Zebra](https://zebra.zfnd.org/)
* [Discussão sobre o subsídio e o projeto Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Última atualização:** agosto de 2026
