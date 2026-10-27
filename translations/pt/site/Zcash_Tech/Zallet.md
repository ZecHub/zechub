<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet é uma carteira de Zcash de nó integral escrita em Rust. É a substituta da carteira que antes estava integrada em `zcashd`. Depois que `zcashd` chegou à interrupção de fim de suporte em 18 de julho de 2026, na altura do bloco 3417100, as funções de consenso e carteira foram separadas: **Zebra** ou **Zakura** validam a chain, e **Zallet** guarda chaves, analisa notes e disponibiliza o JSON-RPC da carteira.

Zallet está atualmente em **beta**. Não foi totalmente auditado. Alterações incompatíveis podem exigir a exclusão e recriação da carteira. Não o considere uma custódia de produção para grandes quantidades de ZEC sem ler os avisos de segurança no [The Zallet Book](https://zcash.github.io/zallet/).

---

## Resumo

- Zallet é uma **carteira RPC de nó integral**, não uma carteira móvel leve nem um nó de consenso.
- Substitui a parte de carteira do `zcashd`. A parte de nó é [Zebra](Zebra_Full_Node.md) ou [Zakura](Zakura_Node.md).
- Escrita em **Rust**, com dupla licença MIT / Apache-2.0, mantida em [zcash/zallet](https://github.com/zcash/zallet).
- Lançamento publicado mais recente no final de agosto de 2026: **v0.1.0-beta.3**.
- Comunica-se com os dados da chain por meio de um de dois backends: **zebra-state** (`ReadStateService` direto contra um `zebrad` local) ou **Zaino**.
- Disponibiliza um subconjunto de JSON-RPC **compatível com zcashd**. Alguns métodos foram alterados; outros foram deliberadamente omitidos.
- O material de chaves é sempre criptografado com **age**. O histórico de transações, endereços e chaves de visualização ficam em texto simples em `wallet.db`.
- Inclui três binários em um único arquivo assinado: `zallet` (iniciador), `zallet-zebra` e `zallet-zaino`.
- Documentação oficial: [The Zallet Book](https://zcash.github.io/zallet/).

---

## Por que Zallet existe

`zcashd` incluía em um único processo um nó de consenso derivado do Bitcoin Core e uma carteira. Esse design deixou de existir.

| Função | Pilha anterior | Pilha atual |
|------|-----------|---------------|
| Consenso / P2P | `zcashd` | Zebra (`zebrad`) ou Zakura |
| Carteira / chaves / saldos | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Indexador de light client | `lightwalletd` | Zaino ou `lightwalletd` |

Separar a carteira do nó significa:

- O software do nó pode ser substituído (Zebra vs Zakura) sem mover chaves.
- A análise da carteira e a autoridade de gastos ficam em um processo que pode ser isolado separadamente.
- A semântica de RPC pode evoluir para contas ZIP 32, Unified Addresses e PCZTs, em vez de permanecer congelada nas particularidades de `zcashd`.

Zallet é a carteira destinada a operadores que anteriormente executavam `zcashd` como carteira quente, backend de corretora, faucet ou carteira de pagamentos de mineração.

---

## Status

Zallet está em **beta**.

Na prática, isso significa:

- Alterações incompatíveis podem ocorrer em qualquer beta. Você pode ter que excluir o diretório de dados e recomeçar.
- Nem todos os RPCs de carteira do `zcashd` foram migrados.
- A semântica de alguns métodos migrados difere da do `zcashd`. As integrações devem ler a página [de semântica alterada](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Os crates estão em desenvolvimento e não foram totalmente auditados.
- Zallet **não** é uma biblioteca Rust. Não há garantias se você depender dele como uma.

O feedback deve ser enviado para as [issues do GitHub](https://github.com/zcash/zallet/issues/new) ou para o canal `#wallet-dev` no [Discord de P&D do Zcash](https://discord.gg/xpzPR53xtU).

Está prevista uma fase estável posterior, quando existir a superfície RPC pretendida. Espera-se então que os chamadores migrem para os métodos do Zallet, incluindo as diferenças semânticas documentadas.

---

## Arquitetura

Zallet está dividido em três workspaces Cargo para que os dois backends de chain possam acompanhar grafos de dependências diferentes.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Os três binários abrem a **mesma** `wallet.db`. O iniciador escolhe um backend em tempo de execução; não é necessário recompilar para alternar.

Implementação típica:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet é uma **carteira de nó integral**: espera um nó de validação local. Não é um light client. Para carteiras leves e servidores de blocos compactos, veja [Zaino](Zaino.md) e [Nós Lightwallet](Lightwallet_Nodes.md).

A pilha compose [Z3](https://github.com/ZcashFoundation/z3) da Zcash Foundation executa Zebra + Zallet em conjunto, com Zaino independente opcional para light clients externos.

---

## Contas, endereços e chaves

Zallet é construído em torno de contas ZIP 32, e não da conta única implícita do `zcashd`.

- Uma carteira pode guardar **múltiplos mnemônicos BIP 39**. Cada mnemônico é uma raiz de gastos independente, identificada por uma **impressão digital da seed** (`zip32seedfp1…`).
- As **contas** são derivadas de uma seed com um índice de conta ZIP 32. Dentro de uma instância do Zallet, também têm um **UUID** local. A identidade portátil de uma conta é `(seedfp, account index)`.
- Os endereços são **Unified Addresses ZIP 316**, produzidos com `z_getaddressforaccount`. Uma conta pode ter muitos endereços diversificados; os receptores blindados não podem ser associados on-chain.
- As chaves de gastos importadas (`z_importkey`) e os endereços somente para visualização (`z_importaddress`) tornam-se contas UUID não abrangidas por nenhum mnemônico.
- As chaves de visualização podem ser exportadas e importadas (`z_exportviewingkey`, `z_importviewingkey`), incluindo chaves de visualização completas unificadas e chaves de visualização de entrada.

`getnewaddress` não está implementado. Use `z_getnewaccount` e `z_getaddressforaccount`.

Se `keystore.require_backup` estiver ativo (a forma migrada de `zcashd` de `walletrequirebackup`), Zallet recusa derivar nova autoridade de gasto a partir de um mnemónico cuja cópia de segurança não tenha sido confirmada.

---

## Criptografia e backups

O material de chaves é **sempre** criptografado. Não existe um modo não criptografado nem um RPC `encryptwallet` — esse método do `zcashd` nunca foi totalmente suportado.

- A configuração cria uma identidade **age**, com o caminho padrão `{datadir}/encryption-identity.txt`.
- Os mnemônicos e as chaves de gastos importadas são armazenados como textos criptografados age em `wallet.db`.
- O restante do banco de dados **não** é criptografado. O histórico, os endereços e as chaves de visualização podem ser lidos se alguém obtiver o arquivo.
- A identidade pode ser protegida por frase secreta (`generate-encryption-identity -p`). Desbloqueie com o RPC `walletpassphrase`; bloqueie com `walletlock`.
- Perder o arquivo de identidade ou sua frase secreta torna as chaves de gastos irrecuperáveis. Faça backup da identidade, de cada mnemônico e de qualquer cópia de `wallet.db` que você mantiver (separadamente, criptografada).

Copiar `wallet.db` enquanto Zallet está em execução não é um backup seguro. O SQLite pode ficar inconsistente. Prefira um processo parado ou aguarde por um comando oficial de backup online.

---

## JSON-RPC

Zallet implementa um subconjunto dos RPCs de carteira do `zcashd` por HTTP com autenticação Basic. Vincule ao loopback. O uso remoto deve passar por um túnel criptografado. `rpc.allow_insecure_remote_bind` existe e não é seguro.

Diferenças notáveis em relação ao `zcashd`:

- Os campos de saldo em `getwalletinfo` estão vazios. Use `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- As taxas seguem a **ZIP 317**. Não existe `settxfee`.
- A construção de gastos está migrando para **PCZTs** (transações Zcash parcialmente criadas, ZIP 374). Os RPCs PCZT foram introduzidos na série beta.
- Um **bloqueio global de sincronização** bloqueia os RPCs de saldo e gastos enquanto a carteira está se atualizando ou se recuperando de uma reorganização (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Os métodos deliberadamente omitidos incluem `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` e `encryptwallet`. As substituições estão listadas no [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Primeiros passos

Os caminhos de instalação oficiais (pacotes Debian, Docker, binários de lançamento) estão no [guia de instalação](https://zcash.github.io/zallet/guide/installation/index.html). Os arquivos de lançamento chamam-se `zallet-<version>-<arch>.tar.gz` e contêm os três binários.

Fluxo mínimo para uma nova carteira:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Aponte `[indexer]` para um endpoint JSON-RPC local de `zebrad`. O backend zebra também requer `[indexer.read_state_service]` e um `zebrad` compilado com o recurso de indexador, para que Zallet possa ler diretamente o estado da chain.

Imagens reproduzíveis podem ser criadas com [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, armazenamento de imagens containerd, GNU Make).

---

## Migrar do zcashd

Mantenha o antigo diretório de dados do `zcashd` até confirmar os saldos e testar uma restauração.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` só está disponível em compilações com o recurso `zcashd-import`. A leitura de `wallet.dat` requer `db_dump` do **Berkeley DB 6.2**, a versão usada pelo `zcashd`.

Notas passo a passo para operadores: [Guia de migração: zcashd para Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Como Zallet se relaciona com outros softwares

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| O que é | Carteira RPC de nó integral | Servidor de carteira com foco em blindado | Carteiras para usuários finais | Nó de consenso | Indexador / substituto do lightwalletd |
| Substitui | Carteira do `zcashd` | Não é um clone direto do `zcashd` | Apps móveis/para desktop | Nó do `zcashd` | `lightwalletd` |
| Requer um nó local | Sim | Sim (Zebra por padrão) | Não (light client) | É o próprio nó | Sim |
| Compatibilidade RPC com zcashd | Projetado como caminho de compatibilidade | Apenas um pequeno subconjunto escolhido | N/A | Modo de compatibilidade parcial / Zakura | API diferente |
| Modelo de custódia | O operador guarda as chaves em `wallet.db` | Servidor recuperável por seed | Chaves no dispositivo do usuário | Sem carteira | Sem chaves |

Zallet e **zecd** podem ambos ficar à frente do Zebra. Escolha Zallet quando precisar da interface de carteira `z_*` e de um caminho de migração a partir de `wallet.dat`. Escolha zecd quando quiser um servidor com foco em blindado que explicitamente *não* seja um clone do `zcashd`.

Existe um produto de consumo separado em [zallet.io](https://www.zallet.io/) que reutiliza o nome. Esse app não é este projeto.

---

## Páginas relacionadas

- [Nós integrais](Full_Nodes.md) — Zebra, Zakura e o nó `zcashd` descontinuado
- [Nó integral Zebra](Zebra_Full_Node.md) — o nó que o backend padrão do Zallet lê
- [Nó Zakura](Zakura_Node.md) — nó de validação alternativo
- [Zaino](Zaino.md) — backend de indexador e servidor de light client
- [zecd](ZECD.md) — outro design de servidor de carteira em librustzcash
- [Sincronização de carteiras Zcash](Zcash_Wallet_Syncing.md) — como as carteiras blindadas analisam a chain
- [Chaves de visualização](Viewing_Keys.md)

## Recursos

- [The Zallet Book](https://zcash.github.io/zallet/)
- [zcash/zallet no GitHub](https://github.com/zcash/zallet)
- [Lançamentos](https://github.com/zcash/zallet/releases)
- [Semântica alterada do JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Guia de migração do ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Guia do ZecHub para Raspberry Pi (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (pilha compose do Zebra + Zallet)](https://github.com/ZcashFoundation/z3)
- [Discord de P&D do Zcash](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
