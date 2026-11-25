<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Indexer do Zaino

## Resumo

* **Zebra** valida a chain do Zcash.
* **Zaino** indexa os dados da chain do Zebra e expõe APIs voltadas aos clientes.
* **Zallet** é o componente de carteira da stack Z3. Na configuração padrão do Z3, a Zallet se comunica diretamente com o Zebra e não exige o serviço independente Zaino.
* O serviço independente Zaino é útil quando os operadores precisam de um endpoint gRPC compatível com o lightwalletd, de um proxy JSON-RPC ou de infraestrutura para carteiras leves, exploradores, faucets e serviços semelhantes.
* Zaino é uma infraestrutura ativa, mas os operadores devem consultar a documentação oficial do Zaino e do Z3 para obter os detalhes atuais de implantação antes de executá-lo em produção.

## Explicação principal

Zaino é um indexador Rust para a blockchain Zcash. Ele lê dados da chain de um nó integral Zebra. Ele disponibiliza os dados necessários para carteiras, exploradores, faucets e outros serviços, sem tornar Zebra responsável por cada índice voltado para clientes.

### O que Zaino faz

O Zaino fica entre o Zebra e o software cliente. O Zebra é o nó de consenso: ele baixa, verifica e acompanha a blockchain do Zcash. O Zaino usa o Zebra como fonte de dados da chain e, em seguida, prepara visualizações indexadas que os aplicativos clientes podem consultar com eficiência.

Essa separação mantém os papéis bem definidos:

| Componente | Função |
|:--|:--|
| Zebra | Nó integral e validador |
| Zaino | Indexador e serviço de API voltado aos clientes |
| Zallet | Serviço de carteira |
| lightwalletd | Servidor de carteira leve mais antigo que o Zaino foi projetado para substituir ou complementar |

Zaino oferece funcionalidades para light clients, clientes completos ou carteiras e exploradores de blocos. Ele dá acesso à chain finalizada, à melhor chain ainda não finalizada e aos dados da mempool mantidos por Zebra.

### Como se encaixa na Zcash Stack atual

A stack Z3 atual é construída em torno do Zebra, da Zallet e, opcionalmente, do Zaino.

Na implantação padrão do Z3, o Zebra e a Zallet são executados juntos. A Zallet acessa o Zebra diretamente, então um operador que executa apenas uma stack de carteira local não precisa iniciar o serviço independente Zaino.

O Zaino é adicionado quando o operador quer atender clientes externos. No Z3, ele é executado por trás do perfil `indexer` do Compose e adiciona:

* um endpoint gRPC compatível com o lightwalletd para clientes de carteiras leves
* um proxy JSON-RPC para exploradores, faucets e backends de serviços
* um banco de dados do indexador separado do estado da chain do Zebra

Isso torna o Zaino especialmente relevante para backends de carteiras, operadores de infraestrutura pública, exploradores, faucets e desenvolvedores que testam serviços que precisam de dados indexados da chain do Zcash.

### Zaino e lightwalletd

O lightwalletd é o servidor original de carteiras leves. O Zaino é o caminho sucessor, baseado no Rust, para essa função. Seu objetivo é fornecer APIs compatíveis sempre que possível, para que carteiras e serviços possam migrar sem precisar ser totalmente reescritos de uma só vez.

Isso não significa que todas as implantações do lightwalletd já tenham migrado para o Zaino. Os operadores devem considerar o Zaino como parte da stack atual baseada no Zebra e consultar a documentação, as versões e os painéis de serviço mais recentes do projeto antes de escolher o que executar.

## Visual / Analogia

Imagine a blockchain Zcash como um enorme arquivo de páginas de um livro-razão.

Zebra é o arquivista. Ele recebe cada página nova, verifica se ela segue as regras e a arquiva no lugar certo.

Zaino é o balcão de consulta diante do arquivo. Ele lê o que Zebra arquivou, cria catálogos para consultas rápidas e responde aos visitantes com agilidade. Carteiras leves, exploradores e faucets chegam a esse balcão com perguntas como "o que há neste bloco?" ou "quais transações estão aguardando na mempool?". O balcão de consulta nunca decide quais páginas são autênticas. Essa tarefa cabe ao arquivista.

Zallet, na configuração padrão do Z3, trabalha no mesmo prédio e vai direto ao arquivista. Não precisa do balcão de consulta.

### Alguns diagramas que mostram como Zaino funciona

#### Arquitetura interna de Zaino

![Arquitetura interna do Zaino](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Arquitetura do serviço ativo de Zaino

![Arquitetura do serviço Zebra Live](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Arquitetura do sistema de Zaino

![Arquitetura de sistema do Zaino](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Aprofundamento

### Observações para operadores

O caminho de implantação oficial mais fácil é o repositório do Z3. O Z3 inclui o Zaino como serviço opcional:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Execute primeiro a configuração normal do Z3 e aguarde o Zebra sincronizar antes de iniciar os serviços dependentes na mainnet ou na testnet.

Zaino disponibiliza dois tipos de serviços de rede. O serviço gRPC é a API voltada para o lightwallet. O serviço JSON-RPC destina-se a loopback ou redes privadas confiáveis, a menos que uma camada externa ofereça proteção. Não exponha à internet pública um endpoint JSON-RPC sem autenticação ou criptografia.

## Erros comuns

**Tratar o Zaino como um nó integral.** O Zaino não é o validador. O Zebra valida a chain; o Zaino indexa os dados do Zebra.

**Presumir que toda implantação do Z3 precisa do Zaino independente.** A Zallet pode acessar o Zebra diretamente na stack padrão do Z3. Inicie o Zaino quando precisar do serviço de indexação independente para clientes externos.

**Apresentar recursos planejados como se já estivessem implantados.** O Zaino está em desenvolvimento ativo, então consulte as notas de versão e a documentação atuais antes de descrever um recurso como disponível.

**Expor o JSON-RPC sem cuidado.** A interface JSON-RPC do Zaino é destinada a loopback ou a redes privadas confiáveis, a menos que esteja protegida por outra camada.

## Páginas relacionadas

- [Nós de lightwallet](/zcash-tech/lightwallet-nodes): os servidores aos quais as carteiras leves se conectam, lightwalletd e Zaino, e como alternar entre eles.
- [Zinder](/zcash-tech/zinder), outro indexador Rust, da Zcash Foundation (alfa)
- [Nó integral do Zebra](/zcash-tech/zebra-full-node): o nó do qual Zaino lê os dados da chain.
- [Zallet](/zcash-tech/zallet): a carteira de nó integral da stack Z3.
- [Stack Z3](/zcash-tech/z3-stack): Zebra, Zallet e o indexador opcional Zaino, reunidos em um pacote.
- [Benchmark de indexadores: Zaino vs. Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer): uma comparação reproduzível de dois indexadores de lightwallet.
- [Nós integrais](/zcash-tech/full-nodes): uma visão geral dos softwares de nó integral Zcash.
- [Sincronização de carteiras do Zcash](/zcash-tech/zcash-wallet-syncing): por que carteiras blindadas precisam de um processo de sincronização.

### Recursos

* Repositório [GitHub do Zaino](https://github.com/zingolabs/zaino)
* Versões [Zaino](https://github.com/zingolabs/zaino/releases)
* Documentação gerada [Zaino](https://zingolabs.github.io/zaino/)
* Repositório de implantação do Z3 [](https://github.com/ZcashFoundation/z3)
* Documentação de [Zebra](https://zebra.zfnd.org/)
* Discussão sobre subsídios e projetos [Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Última atualização:** nov 2026
