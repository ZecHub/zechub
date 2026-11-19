# Zaino Indexer

Zaino é um indexador Rust para a blockchain do Zcash. Ele lê os dados da chain a partir de um nó integral Zebra e fornece os dados de que carteiras, exploradores, faucets e outros serviços precisam, sem tornar o próprio Zebra responsável por todos os índices voltados aos clientes.

## Resumo

* **Zebra** valida a chain do Zcash.
* **Zaino** indexa os dados da chain do Zebra e expõe APIs voltadas aos clientes.
* **Zallet** é o componente de carteira da stack Z3. Na configuração padrão do Z3, a Zallet se comunica diretamente com o Zebra e não exige o serviço independente Zaino.
* O serviço independente Zaino é útil quando os operadores precisam de um endpoint gRPC compatível com o lightwalletd, de um proxy JSON-RPC ou de infraestrutura para carteiras leves, exploradores, faucets e serviços semelhantes.
* Zaino é uma infraestrutura ativa, mas os operadores devem consultar a documentação oficial do Zaino e do Z3 para obter os detalhes atuais de implantação antes de executá-lo em produção.

## O que o Zaino faz

O Zaino fica entre o Zebra e o software cliente. O Zebra é o nó de consenso: ele baixa, verifica e acompanha a blockchain do Zcash. O Zaino usa o Zebra como fonte de dados da chain e, em seguida, prepara visualizações indexadas que os aplicativos clientes podem consultar com eficiência.

Essa separação mantém os papéis bem definidos:

| Componente | Função |
|:--|:--|
| Zebra | Nó integral e validador |
| Zaino | Indexador e serviço de API voltado aos clientes |
| Zallet | Serviço de carteira |
| lightwalletd | Servidor de carteira leve mais antigo que o Zaino foi projetado para substituir ou complementar |

O Zaino oferece funcionalidades para light clients, clientes completos ou carteiras e exploradores de blocos. Ele dá acesso à chain finalizada, à melhor chain não finalizada e aos dados da mempool mantidos pelo Zebra.

## Como isso se encaixa na Zcash Stack atual

A stack Z3 atual é construída em torno do Zebra, da Zallet e, opcionalmente, do Zaino.

Na implantação padrão do Z3, o Zebra e a Zallet são executados juntos. A Zallet acessa o Zebra diretamente, então um operador que executa apenas uma stack de carteira local não precisa iniciar o serviço independente Zaino.

O Zaino é adicionado quando o operador quer atender clientes externos. No Z3, ele é executado por trás do perfil `indexer` do Compose e adiciona:

* um endpoint gRPC compatível com o lightwalletd para clientes de carteiras leves
* um proxy JSON-RPC para exploradores, faucets e backends de serviços
* um banco de dados do indexador separado do estado da chain do Zebra

Isso torna o Zaino especialmente relevante para backends de carteiras, operadores de infraestrutura pública, exploradores, faucets e desenvolvedores que testam serviços que precisam de dados indexados da chain do Zcash.

## Zaino e lightwalletd

O lightwalletd é o servidor original de carteiras leves. O Zaino é o caminho sucessor, baseado no Rust, para essa função. Seu objetivo é fornecer APIs compatíveis sempre que possível, para que carteiras e serviços possam migrar sem precisar ser totalmente reescritos de uma só vez.

Isso não significa que todas as implantações do lightwalletd já tenham migrado para o Zaino. Os operadores devem considerar o Zaino como parte da stack atual baseada no Zebra e consultar a documentação, as versões e os painéis de serviço mais recentes do projeto antes de escolher o que executar.

## Notas para operadores

O caminho de implantação oficial mais fácil é o repositório do Z3. O Z3 inclui o Zaino como serviço opcional:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Execute primeiro a configuração normal do Z3 e aguarde o Zebra sincronizar antes de iniciar os serviços dependentes na mainnet ou na testnet.

O Zaino expõe dois tipos de serviço de rede. O serviço gRPC é a API voltada às carteiras leves. O serviço JSON-RPC é destinado a loopback ou a redes privadas confiáveis, a menos que uma camada externa forneça proteção. Não exponha um endpoint JSON-RPC sem autenticação ou sem criptografia à internet pública.

## Alguns diagramas que mostram como o Zaino funciona

### Arquitetura interna do Zaino

![Arquitetura interna do Zaino](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Arquitetura do serviço em produção do Zaino

![Arquitetura do serviço Zebra Live](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Arquitetura do sistema do Zaino

![Arquitetura de sistema do Zaino](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Erros comuns

**Tratar o Zaino como um nó integral.** O Zaino não é o validador. O Zebra valida a chain; o Zaino indexa os dados do Zebra.

**Presumir que toda implantação do Z3 precisa do Zaino independente.** A Zallet pode acessar o Zebra diretamente na stack padrão do Z3. Inicie o Zaino quando precisar do serviço de indexação independente para clientes externos.

**Apresentar recursos planejados como se já estivessem implantados.** O Zaino está em desenvolvimento ativo, então consulte as notas de versão e a documentação atuais antes de descrever um recurso como disponível.

**Expor o JSON-RPC sem cuidado.** A interface JSON-RPC do Zaino é destinada a loopback ou a redes privadas confiáveis, a menos que esteja protegida por outra camada.

## Onde posso saber mais?

* [Repositório do Zaino GitHub](https://github.com/zingolabs/zaino)
* [Versões do Zaino](https://github.com/zingolabs/zaino/releases)
* [Documentação gerada do Zaino](https://zingolabs.github.io/zaino/)
* [Repositório de implantação do Z3](https://github.com/ZcashFoundation/z3)
* [Documentação do Zebra](https://zebra.zfnd.org/)
* [Discussão sobre o subsídio e o projeto Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)
* [Zinder](/zcash-tech/zinder), outro Rust indexador, do Zcash Foundation (alfa)

**Última atualização:** ago 2026
