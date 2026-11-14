<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

A Zallet é uma carteira de nó integral do Zcash escrita em Rust. Ela substitui a carteira que antes vinha incorporada ao `zcashd`. Depois que o `zcashd` atingiu sua parada de fim de suporte em 18 de julho de 2026, na altura de bloco 3417100, as funções de consenso e de carteira foram separadas: o **Zebra** ou o **Zakura** validam a chain, e a **Zallet** guarda as chaves, escaneia as notes e expõe o JSON-RPC da carteira.

A Zallet está atualmente em **beta**. Ela ainda não foi totalmente revisada. Mudanças incompatíveis podem exigir que você exclua e recrie a carteira. Não a trate como custódia de produção para grandes quantias de ZEC sem ler os avisos de segurança em [The Zallet Book](https://zcash.github.io/zallet/).

---

## TL;DR

- A Zallet é uma **carteira RPC de nó integral**, não uma carteira leve para celular nem um nó de consenso.
- Ela substitui a metade de carteira do `zcashd`. A metade de nó é o [Zebra](Zebra_Full_Node.md) ou o [Zakura](Zakura_Node.md).
- Escrita em **Rust**, com licença dupla MIT / Apache-2.0, mantida em [zcash/zallet](https://github.com/zcash/zallet).
- Versão mais recente publicada no fim de agosto de 2026: **v0.1.0-beta.3**.
- Acessa os dados da chain por meio de um de dois backends: **zebra-state** (`ReadStateService` direto em um `zebrad` local) ou **Zaino**.
- Expõe um subconjunto de **JSON-RPC compatível com o zcashd**. Alguns métodos mudaram; outros foram omitidos de propósito.
- O material de chaves é sempre criptografado com **age**. O histórico de transações, os endereços e as chaves de visualização ficam em texto claro em `wallet.db`.
- Inclui três binários em um único arquivo compactado assinado: `zallet` (inicializador), `zallet-zebra` e `zallet-zaino`.
- Documentação oficial: [The Zallet Book](https://zcash.github.io/zallet/).

---

## Por que a Zallet existe

O `zcashd` reunia em um único processo um nó de consenso derivado do Bitcoin Core e uma carteira. Esse design ficou para trás.

| Função | Stack antiga | Stack atual |
|------|-----------|---------------|
| Consenso / P2P | `zcashd` | Zebra (`zebrad`) ou Zakura |
| Carteira / chaves / saldos | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Indexador de light client | `lightwalletd` | Zaino ou `lightwalletd` |

Separar a carteira do nó significa que:

- O software do nó pode ser trocado (Zebra vs Zakura) sem mover as chaves.
- O escaneamento da carteira e a autoridade de gasto ficam em um processo que pode ser protegido separadamente.
- A semântica do RPC pode evoluir em direção às contas ZIP 32, aos Unified Addresses e aos PCZTs, em vez de ficar congelada nas peculiaridades do `zcashd`.

A Zallet é a carteira destinada aos operadores que antes executavam o `zcashd` como carteira quente, backend de corretora, faucet ou carteira de pagamentos de mineração.

---

## Status

A Zallet está em **beta**.

Na prática, isso significa que:

- Mudanças incompatíveis podem chegar em qualquer versão beta. Talvez você precise excluir o diretório de dados e começar de novo.
- Nem todo RPC de carteira do `zcashd` foi portado.
- A semântica de alguns métodos portados é diferente da do `zcashd`. As integrações devem consultar a [página de semântica alterada](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Os crates estão em desenvolvimento e não foram totalmente revisados.
- A Zallet **não** é uma biblioteca Rust. Não há garantias se você depender dela como tal.

Envie seu feedback pelas [issues de GitHub](https://github.com/zcash/zallet/issues/new) ou pelo canal `#wallet-dev` no [Discord de R&D do Zcash](https://discord.gg/xpzPR53xtU).

Uma fase estável está planejada para quando a superfície de RPC pretendida estiver pronta. A partir daí, quem faz chamadas deverá migrar para os métodos da Zallet, incluindo as diferenças semânticas documentadas.

---

## Arquitetura

A Zallet é dividida em três workspaces do Cargo para que os dois backends de chain possam seguir grafos de dependências diferentes.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Os três binários abrem o **mesmo** `wallet.db`. O inicializador escolhe um backend em tempo de execução; você não precisa recompilar para trocar.

Implantação típica:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

A Zallet é uma **carteira de nó integral**: ela precisa de um nó validador local. Ela não é um light client. Para carteiras leves e servidores de blocos compactos, veja [Zaino](Zaino.md) e [Nós de lightwallet](Lightwallet_Nodes.md).

A stack de compose [Z3](https://github.com/ZcashFoundation/z3) de Zcash Foundation executa Zebra + Zallet juntos, com um Zaino autônomo opcional para light clients externos.

---

## Contas, endereços e chaves

A Zallet é construída em torno de contas ZIP 32, e não da conta implícita única do `zcashd`.

- Uma carteira pode guardar **vários mnemônicos BIP 39**. Cada mnemônico é uma raiz de gasto independente, identificada por uma **impressão digital da seed** (`zip32seedfp1…`).
- As **contas** são derivadas de uma seed com um índice de conta ZIP 32. Dentro de uma instância da Zallet, elas também têm um **UUID** local. A identidade portátil de uma conta é `(seedfp, account index)`.
- Os endereços são **Unified Addresses ZIP 316**, gerados com `z_getaddressforaccount`. Uma conta pode ter muitos endereços diversificados; os receptores blindados não podem ser vinculados on-chain.
- Chaves de gastos importadas (`z_importkey`) e endereços somente leitura (`z_importaddress`) se tornam contas UUID que não são cobertas por nenhum mnemônico.
- As chaves de visualização podem ser exportadas e importadas (`z_exportviewingkey`, `z_importviewingkey`), incluindo chaves de visualização completas unificadas e chaves de visualização de entrada.

`getnewaddress` não está implementado. Use `z_getnewaccount` e `z_getaddressforaccount`.

Se `keystore.require_backup` estiver ativado (a forma migrada do `walletrequirebackup` do `zcashd`), a Zallet se recusa a derivar nova autoridade de gasto a partir de um mnemônico cujo backup não tenha sido confirmado.

---

## Criptografia e backups

O material de chaves é **sempre** criptografado. Não existe modo sem criptografia nem o RPC `encryptwallet` — esse método do `zcashd` nunca teve suporte completo.

- A configuração cria uma identidade **age**, com caminho padrão `{datadir}/encryption-identity.txt`.
- Os mnemônicos e as chaves de gastos importadas são armazenados como textos cifrados age em `wallet.db`.
- O restante do banco de dados **não** é criptografado. O histórico, os endereços e as chaves de visualização ficam legíveis se alguém obtiver o arquivo.
- A identidade pode ser protegida por senha (`generate-encryption-identity -p`). Desbloqueie com o RPC `walletpassphrase`; bloqueie com `walletlock`.
- Se você perder o arquivo de identidade ou a senha dele, as chaves de gastos se tornam irrecuperáveis. Faça backup da identidade, de cada mnemônico e (separadamente, com criptografia) de qualquer cópia `wallet.db` que você guardar.

Copiar `wallet.db` enquanto a Zallet está em execução não é um backup seguro. O SQLite pode ficar corrompido. Prefira fazer a cópia com o processo parado ou aguarde um comando oficial de backup online.

---

## JSON-RPC

A Zallet implementa um subconjunto dos RPCs de carteira do `zcashd` via HTTP com autenticação Basic. Vincule-a ao loopback. O uso remoto deve passar por um túnel criptografado. `rpc.allow_insecure_remote_bind` existe, mas é inseguro.

Diferenças notáveis em relação ao `zcashd`:

- Os campos de saldo em `getwalletinfo` estão vazios. Use `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- As taxas seguem o **ZIP 317**. Não existe `settxfee`.
- A construção de gastos está migrando para **PCZTs** (Partially Created Zcash Transactions, ZIP 374). Os RPCs PCZT chegaram na série beta.
- Um **bloqueio de sincronização** global bloqueia os RPCs de saldo e de gasto enquanto a carteira está se atualizando ou se recuperando de uma reorg (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Os métodos omitidos intencionalmente incluem `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` e `encryptwallet`. As substituições estão listadas no [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Primeiros passos

Os caminhos oficiais de instalação (pacotes Debian, Docker, binários de release) estão no [guia de instalação](https://zcash.github.io/zallet/guide/installation/index.html). Os arquivos compactados de release se chamam `zallet-<version>-<arch>.tar.gz` e contêm os três binários.

Fluxo mínimo para criar uma carteira nova:

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

Aponte a `[indexer]` para um endpoint JSON-RPC local do `zebrad`. O backend zebra também precisa de `[indexer.read_state_service]` e de um `zebrad` compilado com o recurso de indexador, para que a Zallet possa ler o estado da chain diretamente.

Imagens reproduzíveis podem ser criadas com [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, armazenamento de imagens do containerd, GNU Make).

---

## Migrando do zcashd

Mantenha o datadir antigo do `zcashd` até confirmar os saldos e testar uma restauração.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` só está disponível em builds com o recurso `zcashd-import`. Para ler `wallet.dat`, é preciso o `db_dump` do **Berkeley DB 6.2**, a versão que o `zcashd` usava.

Notas passo a passo para operadores: [Guia de migração: do zcashd para Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Como a Zallet se relaciona com outros softwares

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| O que é | Carteira RPC de nó integral | Servidor de carteira com foco em blindagem | Carteiras para usuários finais | Nó de consenso | Indexador / substituto do lightwalletd |
| Substitui | Carteira do `zcashd` | Não é um clone direto do `zcashd` | Apps móveis/desktop | Nó do `zcashd` | `lightwalletd` |
| Precisa de um nó local | Sim | Sim (Zebra por padrão) | Não (light client) | Ele *é* o nó | Sim |
| Compatibilidade com o RPC do zcashd | Projetada como caminho de compatibilidade | Apenas um pequeno subconjunto escolhido | N/A | Parcial / modo de compatibilidade Zakura | API diferente |
| Modelo de custódia | O operador guarda as chaves em `wallet.db` | Servidor recuperável pela seed | Chaves no dispositivo do usuário | Sem carteira | Sem chaves |

Tanto a Zallet quanto o **zecd** podem ficar na frente do Zebra. Escolha a Zallet quando precisar da superfície de carteira do `z_*` e de um caminho de migração a partir do `wallet.dat`. Escolha o zecd quando quiser um servidor com foco em blindagem que explicitamente *não* seja um clone do `zcashd`.

Existe um produto separado para consumidores em [zallet.io](https://www.zallet.io/) que usa o mesmo nome. Esse app não é este projeto.

---

## Páginas relacionadas

- [Nós integrais](Full_Nodes.md) — Zebra, Zakura e o nó `zcashd` aposentado
- [Nó integral Zebra](Zebra_Full_Node.md) — o nó que o backend padrão da Zallet lê
- [Nó Zakura](Zakura_Node.md) — nó validador alternativo
- [Zaino](Zaino.md) — backend indexador e servidor de light client
- [zecd](ZECD.md) — outro design de servidor de carteira sobre o librustzcash
- [Sincronização de carteiras Zcash](Zcash_Wallet_Syncing.md) — como as carteiras blindadas escaneiam a chain
- [Chaves de visualização](Viewing_Keys.md)

## Recursos

- [The Zallet Book](https://zcash.github.io/zallet/)
- [zcash/zallet no GitHub](https://github.com/zcash/zallet)
- [Versões](https://github.com/zcash/zallet/releases)
- [Semântica alterada do JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Guia de migração do ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Guia do ZecHub para Raspberry Pi (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (stack de compose Zebra + Zallet)](https://github.com/ZcashFoundation/z3)
- [Discord de R&D do Zcash](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
