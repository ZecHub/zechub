# Zinder Indexador

Zinder é um indexador Zcash auto-hospedado, escrito em Rust e publicado pela Zcash Foundation. Ele lê a chain uma vez a partir de um nó integral Zebra ou Zakura, armazena uma visão consistente dela e a disponibiliza para várias carteiras, aplicativos e exploradores ao mesmo tempo. Carteiras leves existentes podem acessá-lo por meio de um adaptador compatível com lightwalletd.

> **Zinder está em alpha.** O próprio README informa que a API nativa, a superfície de compatibilidade com lightwalletd, os formatos de armazenamento e a topologia de implantação podem mudar, e que uma versão marcada não é uma promessa de estabilidade. Fixe versões exatas e espere atualizações com mudanças incompatíveis.

## Resumo

* **Zebra** ou **Zakura** valida a chain. **Zinder** indexa o que o nó tem e disponibiliza esses dados aos clientes.
* Há duas formas de conexão: a própria API gRPC de Zinder, `WalletQuery`, e um adaptador separado que fala o protocolo `CompactTxStreamer` de lightwalletd, para que carteiras criadas para lightwalletd possam se conectar a ele sem alterações no código.
* Cada leitura fica vinculada a um estado da chain (uma "epoch"), para que um lote de sincronização nunca misture dados de duas pontas concorrentes da chain. As chaves e a varredura de dados blindados permanecem na carteira.
* Foi desenvolvido para um operador executar um nó e atender a muitos consumidores. Os endpoints públicos devem ficar atrás de TLS, autenticação e limites de taxa configurados por você.
* As versões são lançadas rapidamente (da 0.7.0 à 0.12.0 entre 10 e 14 de novembro de 2026), e várias delas incluíram mudanças incompatíveis. Leia o changelog antes de cada atualização.

## Onde Zinder se encaixa

Carteiras leves nunca se comunicam diretamente com um nó integral. Elas pedem a um indexador blocos compactos, estados das árvores e dados de transações (veja [Nós Lightwallet](/zcash-tech/lightwallet-nodes)). O ecossistema Zcash agora tem vários indexadores capazes de fazer isso:

| Indexador | Linguagem | Mantenedor | Conecta-se a | Observações |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | Comunidade ECC / Zcash | Zebra ou zcashd | O servidor original para carteiras leves |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra ou zcashd | Perfil opcional de indexador na stack Z3 |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | Nó Zakura integrado | Veja o benchmark [Zaino vs Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 ou Zakura 1.8.6 (nó de arquivo) | Alpha. API nativa, adaptador lightwalletd e leituras opcionais para exploradores |

A documentação de Zinder explica diretamente quando essa é a escolha certa: ele é mais adequado quando o acesso à chain precisa continuar disponível além de um único processo de carteira, atender a vários consumidores independentes ou permanecer separado do código de uma carteira específica. Para uma única carteira fortemente integrada, um indexador integrado pode ser mais simples; um consumidor que precisa apenas de dados que o nó já possui pode usar diretamente o RPC de Zebra.

## Como é construído

Zinder divide o trabalho em processos separados, cada um com uma única função:

| Ambiente de execução | Função |
|:--|:--|
| `zinder-ingest` | O único gravador no armazenamento canônico da chain (RocksDB). Acompanha o nó, gerencia reorganizações e mantém o estado ativo do mempool |
| `zinder-projector` | O único gravador no armazenamento da carteira. Cria e acompanha a visão da chain organizada para a carteira |
| `zinder-query` | Disponibiliza a API gRPC nativa `WalletQuery` |
| `zinder-compat-lightwalletd` | Disponibiliza a API `CompactTxStreamer` de lightwalletd usando os mesmos dados |

Uma camada opcional para exploradores (`zinder-explorer` com `ExplorerQuery`) disponibiliza resumos de blocos, detalhes de transações, visualizações do mempool e busca. Um adaptador opcional disponibiliza a API REST e a API WebSocket do explorador CipherScan. Nenhum dos dois faz parte das imagens de lançamento.

Cada ambiente de execução expõe `/healthz`, `/readyz` e `/metrics`. Os leitores só informam que estão prontos quando suas cópias do armazenamento da chain e do armazenamento da carteira apontam exatamente para o mesmo estado da chain.

## Formas de conexão

* **Carteiras leves existentes** mantêm sua integração com lightwalletd e apontam para `zinder-compat-lightwalletd`. A documentação de Zinder distingue compatibilidade com o protocolo de suporte: uma carteira específica só é considerada compatível depois que sua versão atual passa pela certificação de ponta a ponta. A versão 0.10.0 corrigiu o campo de versão do protocolo `GetLightdInfo` para que Zingo possa sincronizar.
* **Clientes nativos** chamam `zinder-query` para leituras vinculadas a um estado, blocos compactos, fluxos de eventos da chain e do mempool e resultados de transmissão com motivos de rejeição tipados.
* **Aplicativos Rust** usam o crate `zinder-client`, um SDK voltado a conexões remotas que se conecta a `zinder-query` sem vincular a stack de armazenamento.
* **Exploradores e backends** combinam as leituras da carteira com a camada opcional `ExplorerQuery`.

## Como executar

O guia de início rápido do projeto inicia um nó com a [stack Z3](/zcash-tech/z3-stack) e, em seguida, Zinder usando o Compose Docker a partir do checkout de Zinder:

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

Os arquivos de ambiente para Mainnet e para um nó Zakura (`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`) ficam ao lado dele. Desde a versão 0.11.0, o arquivo Compose não presume mais que você esteja usando Z3: o arquivo de ambiente precisa especificar a rede do nó, o volume de cookies e o endereço RPC.

Portas padrão no host (a Testnet adiciona 10000):

| Serviço | Mainnet | Testnet |
|:--|:--|:--|
| gRPC nativo `WalletQuery` | 9102 | 19102 |
| gRPC compatível com lightwalletd | 9067 | 19067 |
| Disponibilidade: ingest / projector / query / compat | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

As duas portas da carteira ficam vinculadas ao loopback. Verifique-as com:

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

Outras formas de implantação:

* **Imagens de lançamento** no `ghcr.io/zcashfoundation/`: os quatro ambientes de execução, além de `zinder-wallet-serving` (ingest, projector e consulta nativa em um contêiner para hosts que podem anexar um volume a um contêiner; sem adaptador lightwalletd) e `zinder-canonical-runtime` (somente ingest).
* **Binários Linux** para x86-64 (exige uma CPU x86-64-v3) e AArch64, com glibc 2.34 ou mais recente. Debian 12 é a versão de referência certificada. Cada lançamento inclui um SBOM e a procedência assinada SLSA.

### O que o nó precisa oferecer

* Um **nó de arquivo**. Desde a versão 0.11.0, `zinder-ingest` se recusa a iniciar com um nó podado.
* Zebra **7.0.0** ou Zakura **1.8.6**. Essas são as duas versões de nó certificadas pelos canais de lançamento.
* Para a imagem `zinder-wallet-serving`, o **endpoint gRPC do indexador** do nó (`ZINDER_NODE__INDEXER_GRPC_ADDR`, Zebra `indexer_listen_addr`, porta 8155 na Mainnet). Um indexador Zakura em um endereço que não seja de loopback exige TLS mútuo, compatível com Zinder desde a versão 0.11.0.

### Dimensionamento para Mainnet

De acordo com o manual de operação do serviço de carteiras:

* No mínimo **8 GB de memória**. Picos medidos: ingest usa cerca de 2,6 GiB, projector cerca de 2,7 GiB durante a construção e query até cerca de 1,4 GiB.
* Mantenha cerca de **130 GB livres** no volume quando o armazenamento da carteira para Mainnet estiver sendo construído.
* Uma construção medida para Mainnet desde o genesis levou cerca de **quatro horas** para o armazenamento da chain (com cerca de 310 GB na área temporária) e **mais de duas horas** para o armazenamento da carteira. Os prazos de construção incluídos atendem apenas à Testnet: aumente-os para pelo menos 24 h e 12 h na Mainnet, ou a construção será reiniciada e nunca terminará.

## Notas importantes sobre as versões

| Versão | Data | Mudanças para operadores |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | A janela padrão de reorganização passou para 1000 blocos, profundidade em que Zebra 7 e Zakura finalizam blocos. A mudança é irreversível: versões mais antigas não conseguem abrir os armazenamentos atualizados |
| 0.9.0 | 2026-11-12 | Novas imagens `zinder-wallet-serving` e `zinder-canonical-runtime` |
| 0.10.0 | 2026-11-13 | **Primeira versão que decodifica blocos NU7.** A versão 0.9.0 e as anteriores param no primeiro bloco NU7. Revisão 8 do protocolo nativo: atualize ingest e query juntos, assim como os clientes nativos |
| 0.11.1 | 2026-11-14 | Zakura 1.8.6 certificado junto com Zebra 7.0.0; TLS mútuo para o indexador do nó; nós podados são recusados. A versão 0.11.0 foi lançada apenas como crates, então implante a versão 0.11.1 |
| 0.12.0 | 2026-11-14 | Correções de disponibilidade e desligamento; a reprodução do explorador ficou mais rápida e é pausada quando há pouco espaço em disco |

## Erros comuns

**Tratá-lo como software pronto para produção.** O projeto se define como alpha. Nas palavras do próprio projeto, uma implantação local bem-sucedida com Compose "não é, por si só, uma certificação para produção".

**Conectá-lo a um nó podado.** O ingest é encerrado ao iniciar. Use um nó de arquivo Zebra ou Zakura.

**Expor as portas gRPC diretamente.** Há um motivo para as duas portas da carteira ficarem vinculadas ao loopback. Antes de abrir o acesso à internet, configure TLS, autenticação, limites de taxa e cotas em um proxy sob seu controle.

**Atualizar um ambiente de execução por vez.** Várias versões alteram a revisão do protocolo nativo ou o formato de armazenamento. Atualize os serviços Zinder juntos e atualize os clientes nativos na mesma migração.

**Presumir que uma carteira tem suporte porque o protocolo é compatível.** O adaptador lightwalletd fala o protocolo, mas Zinder só declara compatibilidade com uma carteira específica depois que sua versão atual passa pela certificação de ponta a ponta.

## Páginas relacionadas

* [Nós Lightwallet](/zcash-tech/lightwallet-nodes) — o que um servidor para carteiras leves faz e o que consegue ver
* [Zaino](/zcash-tech/zaino) — o indexador Zingo Labs Rust
* [Benchmark de indexadores: Zaino vs Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Stack Z3](/zcash-tech/z3-stack) — Zebra + Zallet, a configuração de nó usada pelo guia de início rápido de Zinder
* [Zebra nó integral ](/zcash-tech/zebra-full-node) e [Zakura nó ](/zcash-tech/zakura-node) — os dois nós certificados por Zinder

## Onde posso saber mais?

* Repositório [Zinder GitHub](https://github.com/ZcashFoundation/zinder)
* Versões [Zinder](https://github.com/ZcashFoundation/zinder/releases) e [changelog](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [O que Zinder é e não é](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* Guias de operação: [Implantação em uma VM](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) e [imagem para serviço de carteiras](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md)

**Última atualização:** novembro de 2026
