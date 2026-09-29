# Zaino Indexador

Zaino é um indexador em Rust para a blockchain Zcash. Lê dados da cadeia a partir de um nó completo Zebra e fornece os dados de que wallets, exploradores, faucets e outros serviços necessitam, sem tornar o próprio Zebra responsável por todos os índices voltados para clientes.

## Em resumo

* **Zebra** valida a cadeia Zcash.
* **Zaino** indexa os dados da cadeia de Zebra e expõe APIs voltadas para clientes.
* **Zallet** é o componente de wallet na stack Z3. Na configuração predefinida do Z3, Zallet comunica diretamente com Zebra e não requer o serviço autónomo Zaino.
* O serviço autónomo Zaino é útil quando os operadores necessitam de um endpoint gRPC compatível com lightwalletd, de um proxy JSON-RPC ou de infraestrutura para wallets leves, exploradores, faucets e serviços semelhantes.
* Zaino é infraestrutura ativa, mas os operadores devem consultar a documentação oficial de Zaino e do Z3 para obter detalhes atuais de implementação antes de o utilizar em produção.

## O que faz Zaino

Zaino situa-se entre Zebra e o software cliente. Zebra é o nó de consenso: descarrega, verifica e acompanha a blockchain Zcash. Zaino utiliza Zebra como fonte de dados da cadeia e prepara depois vistas indexadas que as aplicações cliente podem consultar eficazmente.

Esta separação mantém as funções claras:

| Componente | Função |
|:--|:--|
| Zebra | Nó completo e validador |
| Zaino | Indexador e serviço de API voltado para clientes |
| Zallet | Serviço de wallet |
| lightwalletd | Servidor de wallet leve mais antigo que Zaino foi concebido para substituir ou complementar |

Zaino disponibiliza funcionalidades para clientes leves, clientes completos ou wallets e exploradores de blocos. Dá acesso à cadeia finalizada, à melhor cadeia não finalizada e aos dados da mempool mantidos por Zebra.

## Como se enquadra na stack atual de Zcash

A stack Z3 atual é construída em torno de Zebra, Zallet e do opcional Zaino.

Na implementação predefinida do Z3, Zebra e Zallet são executados em conjunto. Zallet liga-se diretamente a Zebra, pelo que um operador que execute apenas uma stack de wallet local não precisa de iniciar o serviço autónomo Zaino.

Zaino é adicionado quando o operador pretende servir clientes externos. No Z3, é executado através do perfil Compose `indexer` e adiciona:

* um endpoint gRPC compatível com lightwalletd para clientes de wallets leves
* um proxy JSON-RPC para exploradores, faucets e backends de serviços
* uma base de dados do indexador separada do estado da cadeia de Zebra

Isto torna Zaino particularmente relevante para backends de wallets, operadores de infraestrutura pública, exploradores, faucets e programadores que testam serviços que necessitam de dados indexados da cadeia Zcash.

## Zaino e lightwalletd

lightwalletd é o servidor original de wallet leve. Zaino é o caminho sucessor, baseado em Rust, para esta função. O seu objetivo é fornecer APIs compatíveis sempre que possível, para que wallets e serviços possam migrar sem terem de ser completamente reescritos de uma só vez.

Isso não significa que todas as implementações de lightwalletd já tenham migrado para Zaino. Os operadores devem tratar Zaino como parte da stack atual baseada em Zebra e consultar a documentação, as versões e os painéis de serviço mais recentes do projeto antes de escolherem o que executar.

## Notas para operadores

O caminho de implementação oficial mais simples é o repositório Z3. O Z3 inclui Zaino como serviço opcional:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Execute primeiro a configuração normal do Z3 e aguarde que Zebra sincronize antes de iniciar serviços dependentes na mainnet ou testnet.

Zaino expõe dois tipos de serviço de rede. O serviço gRPC é a API destinada a wallets leves. O serviço JSON-RPC destina-se a loopback ou redes privadas de confiança, salvo se uma camada externa fornecer proteção. Não exponha à Internet pública um endpoint JSON-RPC sem autenticação ou encriptação.

## Alguns diagramas que mostram como Zaino funciona

### Arquitetura interna de Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Arquitetura do serviço ativo de Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Arquitetura do sistema de Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Erros comuns

**Tratar Zaino como um nó completo.** Zaino não é o validador. Zebra valida a cadeia; Zaino indexa dados de Zebra.

**Presumir que cada implementação Z3 necessita de Zaino autónomo.** Zallet pode ligar-se diretamente a Zebra na stack Z3 predefinida. Inicie Zaino quando necessitar do serviço autónomo de indexador para clientes externos.

**Apresentar funcionalidades planeadas como se já estivessem implementadas.** Zaino está em desenvolvimento ativo; consulte as notas da versão e a documentação atuais antes de descrever uma funcionalidade como disponível.

**Expor JSON-RPC sem cuidado.** A interface JSON-RPC de Zaino destina-se a loopback ou redes privadas de confiança, exceto se for protegida por outra camada.

## Onde posso saber mais?

* [Repositório GitHub de Zaino](https://github.com/zingolabs/zaino)
* [Versões de Zaino](https://github.com/zingolabs/zaino/releases)
* [Documentação gerada de Zaino](https://zingolabs.github.io/zaino/)
* [Repositório de implementação Z3](https://github.com/ZcashFoundation/z3)
* [Documentação de Zebra](https://zebra.zfnd.org/)
* [Discussão sobre a bolsa e o projeto Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Última atualização:** agosto de 2026
