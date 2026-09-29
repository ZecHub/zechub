<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet é uma wallet de Zcash de nó completo escrita em Rust. É a substituta da wallet que antes estava integrada em `zcashd`. Depois de `zcashd` ter chegado à sua interrupção de Fim de Suporte em 18 de julho de 2026, à altura de bloco 3417100, as funções de consenso e wallet foram separadas: **Zebra** ou **Zakura** validam a cadeia, e **Zallet** guarda chaves, analisa notas e disponibiliza o JSON-RPC da wallet.

Zallet encontra-se atualmente em **beta**. Não foi totalmente auditado. Alterações incompatíveis podem exigir a eliminação e recriação da wallet. Não o considere uma custódia de produção para grandes quantidades de ZEC sem ler os avisos de segurança no [The Zallet Book](https://zcash.github.io/zallet/).

---

## Resumo

- Zallet é uma **wallet RPC de nó completo**, não uma wallet móvel leve nem um nó de consenso.
- Substitui a componente de wallet de `zcashd`. A componente de nó é [Zebra](Zebra_Full_Node.md) ou [Zakura](Zakura_Node.md).
- Escrita em **Rust**, com dupla licença MIT / Apache-2.0, mantida em [zcash/zallet](https://github.com/zcash/zallet).
- Lançamento publicado mais recente no final de agosto de 2026: **v0.1.0-beta.3**.
- Comunica com os dados da cadeia através de um de dois backends: **zebra-state** (`ReadStateService` direto contra um `zebrad` local) ou **Zaino**.
- Disponibiliza um subconjunto de JSON-RPC **compatível com zcashd**. Alguns métodos foram alterados; outros foram deliberadamente omitidos.
- O material de chaves é sempre cifrado com **age**. O histórico de transações, endereços e chaves de visualização ficam em texto simples em `wallet.db`.
- Inclui três binários num único arquivo assinado: `zallet` (iniciador), `zallet-zebra` e `zallet-zaino`.
- Documentação oficial: [The Zallet Book](https://zcash.github.io/zallet/).

---

## Porque existe Zallet

`zcashd` incluía num único processo um nó de consenso derivado do Bitcoin Core e uma wallet. Esse design deixou de existir.

| Função | Pilha anterior | Pilha atual |
|------|-----------|---------------|
| Consenso / P2P | `zcashd` | Zebra (`zebrad`) ou Zakura |
| Wallet / chaves / saldos | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Indexador de cliente leve | `lightwalletd` | Zaino ou `lightwalletd` |

Separar a wallet do nó significa:

- O software do nó pode ser substituído (Zebra vs Zakura) sem mover chaves.
- A análise da wallet e a autoridade para gastar ficam num processo que pode ser isolado separadamente.
- A semântica de RPC pode evoluir para contas ZIP 32, Unified Addresses e PCZTs, em vez de permanecer congelada nas particularidades de `zcashd`.

Zallet é a wallet destinada a operadores que anteriormente executavam `zcashd` como wallet quente, backend de exchange, faucet ou wallet de pagamentos de mineração.

---

## Estado

Zallet está em **beta**.

Na prática, isto significa:

- Alterações incompatíveis podem chegar em qualquer beta. Poderá ter de eliminar o diretório de dados e recomeçar.
- Nem todos os RPCs de wallet de `zcashd` foram migrados.
- A semântica de alguns métodos migrados difere de `zcashd`. As integrações têm de ler a página [de semântica alterada](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Os crates estão em desenvolvimento e não foram totalmente auditados.
- Zallet **não** é uma biblioteca Rust. Não existem garantias se depender dela como tal.

O feedback deve ser enviado para as [issues do GitHub](https://github.com/zcash/zallet/issues/new) ou para o canal `#wallet-dev` no Discord de I&D [Zcash](https://discord.gg/xpzPR53xtU).

Está prevista uma fase estável posterior, quando existir a superfície RPC pretendida. Espera-se então que os chamadores migrem para os métodos de Zallet, incluindo as diferenças semânticas documentadas.

---

## Arquitetura

Zallet está dividido por três workspaces Cargo para que os dois backends de cadeia possam acompanhar grafos de dependências diferentes.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Os três binários abrem a **mesma** `wallet.db`. O iniciador escolhe um backend em tempo de execução; não é necessário recompilar para mudar.

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

Zallet é uma **wallet de nó completo**: espera um nó de validação local. Não é um cliente leve. Para wallets leves e servidores de blocos compactos, veja [Zaino](Zaino.md) e [Nós Lightwallet](Lightwallet_Nodes.md).

A pilha compose [Z3](https://github.com/ZcashFoundation/z3) de Zcash Foundation executa Zebra + Zallet em conjunto, com Zaino autónomo opcional para clientes leves externos.

---

## Contas, endereços e chaves

Zallet é construído em torno de 32 contas ZIP, e não da conta única implícita de `zcashd`.

- Uma wallet pode guardar **múltiplos mnemónicos BIP 39**. Cada mnemónico é uma raiz de gasto independente, identificada por uma **impressão digital da seed** (`zip32seedfp1…`).
- As **contas** são derivadas de uma seed com um índice de conta ZIP 32. Dentro de uma instância de Zallet, também têm um **UUID** local. A identidade portátil de uma conta é `(seedfp, account index)`.
- Os endereços são **Unified Addresses ZIP 316**, produzidos com `z_getaddressforaccount`. Uma conta pode ter muitos endereços diversificados; os recetores protegidos não podem ser associados na cadeia.
- As chaves de gasto importadas (`z_importkey`) e os endereços apenas de observação (`z_importaddress`) tornam-se contas UUID não abrangidas por qualquer mnemónico.
- As chaves de visualização podem ser exportadas e importadas (`z_exportviewingkey`, `z_importviewingkey`), incluindo chaves de visualização completas unificadas e chaves de visualização de entrada.

`getnewaddress` não está implementado. Utilize `z_getnewaccount` e `z_getaddressforaccount`.

Se `keystore.require_backup` estiver ativo (a forma migrada de `zcashd` de `walletrequirebackup`), Zallet recusa derivar nova autoridade de gasto a partir de um mnemónico cuja cópia de segurança não tenha sido confirmada.

---

## Cifragem e cópias de segurança

O material de chaves é **sempre** cifrado. Não existe um modo não cifrado nem um RPC `encryptwallet` — esse método de `zcashd` nunca foi totalmente suportado.

- A configuração cria uma identidade **age**, com o caminho predefinido `{datadir}/encryption-identity.txt`.
- Os mnemónicos e as chaves de gasto importadas são armazenados como textos cifrados age em `wallet.db`.
- O restante da base de dados **não** é cifrado. O histórico, os endereços e as chaves de visualização são legíveis se alguém obtiver o ficheiro.
- A identidade pode ser protegida por palavra-passe (`generate-encryption-identity -p`). Desbloqueie com o RPC `walletpassphrase`; bloqueie com `walletlock`.
- Perder o ficheiro de identidade ou a respetiva palavra-passe torna as chaves de gasto irrecuperáveis. Faça cópias de segurança da identidade, de cada mnemónico e de qualquer cópia `wallet.db` que guardar (separadamente, cifrada).

Copiar `wallet.db` enquanto Zallet está em execução não é uma cópia de segurança segura. O SQLite pode ficar inconsistente. Prefira um processo parado ou aguarde por um comando oficial de cópia de segurança online.

---

## JSON-RPC

Zallet implementa um subconjunto dos RPCs de wallet de `zcashd` através de HTTP com autenticação Basic. Associe à loopback. A utilização remota deve passar por um túnel cifrado. `rpc.allow_insecure_remote_bind` existe e não é seguro.

Diferenças notáveis relativamente a `zcashd`:

- Os campos de saldo em `getwalletinfo` estão vazios. Utilize `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- As taxas seguem a **ZIP 317**. Não existe `settxfee`.
- A construção de gastos está a migrar para **PCZTs** (transações Zcash parcialmente criadas, ZIP 374). Os RPCs PCZT chegaram na série beta.
- Um **bloqueio global de sincronização** bloqueia os RPCs de saldo e gasto enquanto a wallet está a recuperar o atraso ou a recuperar de uma reorganização (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Os métodos deliberadamente omitidos incluem `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` e `encryptwallet`. As substituições estão listadas no [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Primeiros passos

Os caminhos de instalação oficiais (pacotes Debian, Docker, binários de lançamento) estão no [guia de instalação](https://zcash.github.io/zallet/guide/installation/index.html). Os arquivos de lançamento chamam-se `zallet-<version>-<arch>.tar.gz` e contêm os três binários.

Fluxo mínimo para uma nova wallet:

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

Aponte `[indexer]` para um endpoint JSON-RPC local de `zebrad`. O backend zebra também requer `[indexer.read_state_service]` e um `zebrad` compilado com a funcionalidade de indexador, para que Zallet possa ler diretamente o estado da cadeia.

Imagens reproduzíveis podem ser criadas com [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, armazenamento de imagens containerd, GNU Make).

---

## Migrar de zcashd

Mantenha o antigo diretório de dados de `zcashd` até ter confirmado os saldos e testado um restauro.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` só está disponível em compilações com a funcionalidade `zcashd-import`. A leitura de `wallet.dat` requer `db_dump` do **Berkeley DB 6.2**, a versão utilizada por `zcashd`.

Notas passo a passo para operadores: [Guia de Migração: zcashd para Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Como Zallet se relaciona com outro software

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| O que é | Wallet RPC de nó completo | Servidor de wallet com foco em shielded | Wallets para utilizadores finais | Nó de consenso | Indexador / substituto de lightwalletd |
| Substitui | Wallet de `zcashd` | Não é um clone direto de `zcashd` | Aplicações móveis/de desktop | Nó de `zcashd` | `lightwalletd` |
| Requer um nó local | Sim | Sim (Zebra por predefinição) | Não (cliente leve) | É o próprio nó | Sim |
| Compatibilidade RPC de zcashd | Concebida como caminho de compatibilidade | Apenas pequeno subconjunto escolhido | N/D | Modo de compatibilidade parcial / Zakura | API diferente |
| Modelo de custódia | O operador guarda as chaves em `wallet.db` | Servidor recuperável através de seed | Chaves no dispositivo do utilizador | Sem wallet | Sem chaves |

Zallet e **zecd** podem ambos ficar à frente de Zebra. Escolha Zallet quando precisar da interface de wallet de `z_*` e de um caminho de migração a partir de `wallet.dat`. Escolha zecd quando quiser um servidor com foco em shielded que explicitamente *não* seja um clone de `zcashd`.

Existe um produto de consumo separado em [zallet.io](https://www.zallet.io/) que reutiliza o nome. Essa aplicação não é este projeto.

---

## Páginas relacionadas

- [Nós Completos](Full_Nodes.md) — Zebra, Zakura e o nó `zcashd` descontinuado
- [Zebra Nó Completo](Zebra_Full_Node.md) — o nó que o backend predefinido de Zallet lê
- [Zakura Nó](Zakura_Node.md) — nó de validação alternativo
- [Zaino](Zaino.md) — backend de indexador e servidor de cliente leve
- [ZECD](ZECD.md) — outro design de servidor de wallet em librustzcash
- [Zcash Sincronização de Wallets](Zcash_Wallet_Syncing.md) — como as wallets shielded analisam a cadeia
- [Chaves de Visualização](Viewing_Keys.md)

## Recursos

- [The Zallet Book](https://zcash.github.io/zallet/)
- [zcash/zallet no GitHub](https://github.com/zcash/zallet)
- [Lançamentos](https://github.com/zcash/zallet/releases)
- [Semântica JSON-RPC alterada](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Guia de migração de ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Guia para Raspberry Pi de ZecHub (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (pilha compose Zebra + Zallet)](https://github.com/ZcashFoundation/z3)
- [Discord de I&D de Zcash](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
