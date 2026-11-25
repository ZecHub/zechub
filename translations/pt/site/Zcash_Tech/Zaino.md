<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Indexador Zaino

## Resumo

* **Zebra** valida a chain de Zcash.
* **Zaino** indexa os dados da chain de Zebra e disponibiliza APIs para clientes.
* **Zallet** é o componente de carteira da stack Z3. Na configuração padrão do Z3, Zallet se comunica diretamente com Zebra e não precisa do serviço independente Zaino.
* O serviço independente Zaino é útil quando operadores precisam de um endpoint gRPC compatível com lightwalletd, um proxy JSON-RPC ou uma infraestrutura para carteiras leves, exploradores, faucets e serviços semelhantes.
* Zaino é uma infraestrutura ativa, mas os operadores devem consultar a documentação oficial de Zaino e do Z3 para verificar os detalhes atuais de implantação antes de executá-lo em produção.

## Explicação principal

Zaino é um indexador Rust para a blockchain Zcash. Ele lê dados da chain de um nó integral Zebra. Ele disponibiliza os dados necessários para carteiras, exploradores, faucets e outros serviços, sem tornar Zebra responsável por cada índice voltado para clientes.

### O que Zaino faz

Zaino fica entre Zebra e os softwares clientes. Zebra é o nó de consenso: ele baixa, verifica e acompanha a blockchain Zcash. Zaino usa Zebra como fonte de dados da chain e prepara visualizações indexadas que os aplicativos clientes podem consultar com eficiência.

Essa separação mantém as funções claras:

| Componente | Função |
|:--|:--|
| Zebra | Nó integral e validador |
| Zaino | Indexador e serviço de API para clientes |
| Zallet | Serviço de carteira |
| lightwalletd | Servidor antigo de carteira leve que Zaino foi projetado para substituir ou complementar |

Zaino oferece funcionalidades para light clients, clientes completos ou carteiras e exploradores de blocos. Ele dá acesso à chain finalizada, à melhor chain ainda não finalizada e aos dados da mempool mantidos por Zebra.

### Como se encaixa na Zcash Stack atual

A stack Z3 atual é construída em torno de Zebra, Zallet e Zaino opcional.

Na implantação padrão do Z3, Zebra e Zallet são executados juntos. Zallet se conecta diretamente a Zebra, então um operador que executa apenas uma stack local de carteira não precisa iniciar o serviço independente Zaino.

Zaino é adicionado quando o operador quer atender clientes externos. No Z3, ele é executado por trás do perfil Compose `indexer` e adiciona:

* um endpoint gRPC compatível com lightwalletd para clientes de carteiras leves
* um proxy JSON-RPC para exploradores, faucets e backends de serviços
* um banco de dados do indexador separado do estado da chain de Zebra

Isso torna Zaino especialmente relevante para backends de carteiras, operadores de infraestrutura pública, exploradores, faucets e desenvolvedores que testam serviços que precisam de dados indexados da chain Zcash.

### Zaino e lightwalletd

lightwalletd é o servidor original de carteira leve. Zaino é o caminho sucessor baseado em Rust para essa função. Seu objetivo é oferecer APIs compatíveis sempre que possível, para que carteiras e serviços possam migrar sem precisar ser totalmente reescritos de uma só vez.

Isso não significa que todas as implantações de lightwalletd já tenham migrado para Zaino. Os operadores devem tratar Zaino como parte da stack atual baseada em Zebra e consultar a documentação, as versões e os painéis de serviço mais recentes do projeto antes de decidir o que executar.

## Visual / Analogia

Imagine a blockchain Zcash como um enorme arquivo de páginas de um livro-razão.

Zebra é o arquivista. Ele recebe cada página nova, verifica se ela segue as regras e a arquiva no lugar certo.

Zaino é o balcão de consulta diante do arquivo. Ele lê o que Zebra arquivou, cria catálogos para consultas rápidas e responde aos visitantes com agilidade. Carteiras leves, exploradores e faucets chegam a esse balcão com perguntas como "o que há neste bloco?" ou "quais transações estão aguardando na mempool?". O balcão de consulta nunca decide quais páginas são autênticas. Essa tarefa cabe ao arquivista.

Zallet, na configuração padrão do Z3, trabalha no mesmo prédio e vai direto ao arquivista. Não precisa do balcão de consulta.

### Alguns diagramas que mostram como Zaino funciona

#### Arquitetura interna de Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Arquitetura do serviço ativo de Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Arquitetura do sistema de Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Aprofundamento

### Observações para operadores

O caminho de implantação oficial mais simples está no repositório do Z3. O Z3 inclui Zaino como serviço opcional:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Execute primeiro a configuração normal do Z3 e aguarde Zebra sincronizar antes de iniciar serviços dependentes na mainnet ou testnet.

Zaino disponibiliza dois tipos de serviços de rede. O serviço gRPC é a API voltada para o lightwallet. O serviço JSON-RPC destina-se a loopback ou redes privadas confiáveis, a menos que uma camada externa ofereça proteção. Não exponha à internet pública um endpoint JSON-RPC sem autenticação ou criptografia.

## Erros comuns

**Tratar Zaino como um nó integral.** Zaino não é o validador. Zebra valida a chain; Zaino indexa os dados de Zebra.

**Presumir que toda implantação do Z3 precisa do Zaino independente.** Zallet pode se conectar diretamente a Zebra na stack padrão do Z3. Inicie Zaino quando precisar do serviço independente de indexador para clientes externos.

**Apresentar recursos planejados como se já estivessem disponíveis.** Zaino está em desenvolvimento ativo, então consulte as notas da versão e a documentação atuais antes de descrever um recurso como disponível.

**Expor o JSON-RPC sem os devidos cuidados.** A interface JSON-RPC de Zaino destina-se a loopback ou redes privadas confiáveis, a menos que seja protegida por outra camada.

## Páginas relacionadas

- [Nós de lightwallet](/zcash-tech/lightwallet-nodes): os servidores aos quais as carteiras leves se conectam, lightwalletd e Zaino, e como alternar entre eles.
- [Zinder](/zcash-tech/zinder), outro indexador Rust, da Zcash Foundation (alfa)
- [Zebra Nó integral](/zcash-tech/zebra-full-node): o nó do qual Zaino lê os dados da chain.
- [Zallet](/zcash-tech/zallet): a carteira de nó integral da stack Z3.
- [Stack Z3](/zcash-tech/z3-stack): Zebra, Zallet e o indexador opcional Zaino, reunidos em um pacote.
- [Benchmark de indexadores: Zaino vs. Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer): uma comparação reproduzível de dois indexadores de lightwallet.
- [Nós integrais](/zcash-tech/full-nodes): uma visão geral dos softwares de nó integral Zcash.
- [Zcash Sincronização de carteiras](/zcash-tech/zcash-wallet-syncing): por que carteiras blindadas precisam de um processo de sincronização.

### Recursos

* Repositório [Zaino GitHub](https://github.com/zingolabs/zaino)
* Versões [Zaino](https://github.com/zingolabs/zaino/releases)
* Documentação gerada [Zaino](https://zingolabs.github.io/zaino/)
* Repositório de implantação do Z3 [](https://github.com/ZcashFoundation/z3)
* Documentação de [Zebra](https://zebra.zfnd.org/)
* Discussão sobre subsídios e projetos [Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Última atualização:** nov 2026
