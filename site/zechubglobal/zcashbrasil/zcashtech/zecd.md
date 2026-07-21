<a href="https://github.com/zechub/zechub/edit/main/site/zechubglobal/zcashbrasil/zcashtech/zecd.md" target="_blank">
  <img src="https://img.shields.io/badge/Editar-blue" alt="Editar Página"/>
</a>

# ZECD — Servidor de Carteira Shielded-First

> 🇺🇸 [English version](/zcash-tech/zecd)

ZECD é um servidor de carteira Zcash com foco em privacidade, construído sobre a [librustzcash](https://github.com/zcash/librustzcash) e exposto através do dialeto JSON-RPC do Bitcoin Core. Ele oferece aos desenvolvedores e integradores de pagamento uma API familiar e compatível com Bitcoin para interagir com Zcash — com o Orchard (o pool mais privado) como padrão. Desenvolvido por [zec.rocks](https://zec.rocks), o ZECD foi projetado para substituir a funcionalidade de carteira do `zcashd` em implantações modernas e cloud-native.

**Versão atual:** 0.5.0-rc3 (13 de julho de 2026) — com suporte a Ironwood (NU6.3). Instale via `cargo install zecd` ou use a imagem Docker oficial.

---

## TL;DR

- ZECD é um **daemon de carteira (servidor)** — não é um nó completo. Ele gerencia chaves, escaneamento, provas e RPC sem falar o protocolo P2P do Zcash.
- Fala o **dialeto JSON-RPC do Bitcoin Core**: mesmos nomes de métodos, estruturas de resposta, autenticação e códigos de erro — muitos clientes RPC Bitcoin funcionam com Zcash sem modificações.
- **Endereços Orchard (shielded) são o padrão**; suporte a transparente (t-address) e Sapling requer ativação explícita por carteira.
- Conecta-se a um **nó completo [Zebra](Zebra_Full_Node.md) auto-hospedado** via JSON-RPC local — sem necessidade de lightwalletd.
- **Stateless por design**: toda a carteira é recuperável apenas com a frase semente, tornando o diretório de dados descartável.
- **Não é compatível com zcashd**: implementa apenas um subconjunto dos métodos RPC do Zcash, com diferenças de design intencionais para privacidade e segurança.
- Taxas seguem o **ZIP-317** (cálculo determinístico); taxas definidas pelo usuário são rejeitadas.
- Suporta **memos shielded (ZIP-302)** através da superfície RPC familiar do Bitcoin.

---

## Qual Problema o ZECD Resolve?

O `zcashd` foi o nó e carteira original do Zcash — derivado do código C++ do Bitcoin em 2016. Com o tempo, isso criou fricção: o código é difícil de manter, a carteira está fortemente acoplada ao nó, e endereços transparentes são apresentados como opções de primeira classe ao lado dos shielded.

O ZECD separa a responsabilidade da carteira do consenso. É uma **camada de carteira dedicada** que fica entre aplicações e um nó completo Zebra, fornecendo:

- Uma implementação moderna em Rust sobre librustzcash (a mesma biblioteca que alimenta Zashi e Zodl)
- Design com privacidade como padrão (endereços Orchard, salvo configuração explícita)
- Uma interface RPC compatível com Bitcoin que elimina a necessidade de aprender ferramentas específicas do Zcash
- Arquitetura stateless e recuperável por semente, adequada para implantações em containers e nuvem

---

## Arquitetura

O ZECD opera em um modelo de três camadas:

```
Sua app / cliente Bitcoin RPC
        ↓  JSON-RPC
       ZECD
   (chaves, escaneamento, provas, RPC)
        ↓  JSON-RPC (apenas local)
       Zebra
   (nó completo — consenso, mempool, dados da cadeia)
```

O ZECD se comunica com o Zebra **exclusivamente via JSON-RPC local** — sem rede P2P, sem indexadores de terceiros, sem lightwalletd. A conexão com o Zebra é deliberadamente local: o ZECD se recusa a enviar credenciais a um host com roteamento público, a não ser que configurado explicitamente para um túnel seguro externo (ex: WireGuard ou SSH).

---

## Recursos Principais

### Shielded-First, Orchard como Padrão

O ZECD usa Unified Addresses Orchard como tipo de endereço padrão. Os pools Sapling e transparente (t-address) requerem configuração explícita por carteira. Este design reduz o risco de envios transparentes acidentais — uma armadilha de privacidade comum em ferramentas Zcash antigas.

A política de privacidade é configurável por chamada ou globalmente em `[spend] privacy_policy`:

| Política | Comportamento |
|----------|---------------|
| `AllowRevealedRecipients` (padrão) | Permite envios para destinatários transparentes; revela valor e destinatário na cadeia |
| `AllowRevealedAmounts` | Permite envios cross-pool (Sapling↔Orchard) mas rejeita destinatários transparentes |
| `FullPrivacy` | Apenas envios totalmente shielded dentro de um pool; rejeita transparentes e cross-pool |
| `AllowFullyTransparent` | Também permite envios t→t financiados de UTXOs transparentes |

### Compatibilidade com Bitcoin Core RPC

O ZECD implementa o dialeto JSON-RPC do Bitcoin Core com conformidade em:

- Nomes de métodos (ex: `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Nomes e tipos de campos nas respostas
- Estrutura do envelope JSON-RPC 1.0
- Autenticação Basic, entradas `rpcauth` e arquivo cookie
- Códigos de erro e mapeamento de status HTTP

Isso significa que muitas bibliotecas de pagamento Bitcoin, integrações de exchanges e ferramentas de monitoramento existentes podem interagir com Zcash via ZECD com poucas ou nenhuma alteração de código.

A suite de conformidade (140+ verificações) roda em cada PR contra um daemon regtest ao vivo e também foi validada na testnet pública.

### Memos Shielded (ZIP-302)

O ZECD expõe o recurso de memo shielded do Zcash pela superfície RPC familiar do Bitcoin:

- `sendtoaddress` aceita um memo hex opcional como parâmetro extra (até 512 bytes; rejeitado para destinatários transparentes)
- Entradas do histórico de transações em `listtransactions` e `gettransaction` incluem campos `memo` (hex) e `memoStr` (texto decodificado) quando uma saída contém um memo
- Envios de valor zero para um destinatário shielded são suportados para casos de uso "memo-only" (padrão `z_sendmany`)

Isso torna o ZECD adequado para aplicações que precisam de mensagens privadas on-chain junto com pagamentos.

### Stateless por Design

O ZECD **não persiste nenhum estado off-chain que uma restauração somente com semente não pudesse reconstruir**. O banco de dados da carteira (`data.sqlite`) é inteiramente derivável da frase semente — fundos shielded são recuperados incondicionalmente; fundos transparentes são recuperados até o limite de gap configurado.

Para restaurar uma carteira a partir da semente:

```sh
zecd init --restore --birthday <altura-do-bloco>
```

Isso torna o diretório de dados **descartável**: um container sem volume persistente, reconstruído a partir da semente a cada inicialização, não perde nada crítico.

Labels são intencionalmente ausentes. Como labels não têm fonte on-chain e não podem ser reconstruídas a partir da semente, o ZECD simplesmente não as suporta. Chamar métodos de label retorna um erro `method-not-found` (`-32601`).

### Sem Dependência do lightwalletd

O ZECD deriva blocos compactos, estado da árvore e visibilidade do mempool diretamente do JSON-RPC do Zebra. Não há lightwalletd para operar ou manter.

### Implantações Cloud-Native

A arquitetura stateless do ZECD foi projetada para Docker e Kubernetes:

- Stack Docker Compose completa (`zebra → zecd`) disponível no repositório
- Endpoint de saúde na porta `9233` com probes de readiness configuráveis (`synced` ou `connected`)
- Opção de log JSON estruturado para pipelines de agregação de logs
- Taxas determinísticas ZIP-317
- `bootstrap_from_keys` (padrão ativo): um diretório de dados vazio ao lado de `keys.toml` reconstrói automaticamente a carteira no boot — implante montando um Secret e iniciando com um PVC vazio

---

## Modelos de Custódia

O ZECD suporta três modelos de custódia de chaves, adequados para diferentes requisitos de implantação e segurança:

### 1. Não Criptografado (Padrão — Auto-Unlock)

A frase semente em `keys.toml` é encapsulada em um **arquivo de identidade age** (`identity.txt`). Com o padrão `auto_unlock = true`, a semente é descriptografada na memória na inicialização, então envios são autônomos — sem necessidade de chamar `walletpassphrase`.

Ideal para: processadores de pagamento automatizados, hot wallets de exchanges, ambientes de desenvolvimento.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Guarde o `identity.txt` **fora** do diretório de dados em produção — quem lê os dois arquivos tem autoridade de gasto.

### 2. Criptografado (Protegido por Senha)

A frase semente é encapsulada com uma senha (age scrypt) em vez de um arquivo de identidade. A carteira inicia bloqueada; `walletpassphrase "<senha>" <timeout>` desbloqueia pelo tempo definido e bloqueia automaticamente ao final — espelhando o comportamento de carteira criptografada do Bitcoin Core.

Ideal para: hot wallets onde autoridade de gasto autônoma não é necessária; fluxos de operador interativos.

```sh
zecd init --datadir ./data --encrypt
# depois: walletpassphrase "minha-senha" 300
```

### 3. Watch-Only (UFVK — Sem Chave de Gasto)

Inicializado com uma Unified Full Viewing Key (UFVK) exportada de outra carteira. Pode receber, escanear e reportar saldos — mas não pode assinar transações. Ideal para monitoramento, geração de faturas ou nós de auditoria separados da carteira de assinatura.

```sh
# Na máquina da carteira de assinatura:
zecd export-ufvk

# Na máquina watch-only:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <altura>
```

---

## Backup e Recuperação

Os fundos são recuperáveis **apenas com a frase semente**. Todo o resto é cache.

| Artefato | Local | O que protege | Fazer backup? |
|----------|-------|---------------|---------------|
| **Frase semente de 24 palavras** | Exibida uma vez no `zecd init` | Os fundos — perda = perda permanente | **Sim — offline (papel/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Semente criptografada + birthday + rede | **Sim — como Secret** |
| `identity.txt` | `[keys] age_identity` | Descriptografa `keys.toml` (autoridade de gasto) | **Sim — separado do `keys.toml`** |
| Birthday height | Dentro de `keys.toml` | Torna a restauração rápida | Registrar com a frase semente |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Cache da carteira — reconstruído na restauração | Não — descartável |
| `blocks/` | `<wallet dir>/blocks/` | Cache de blocos compactos | Não — nunca enviar; pode crescer muito |
| `.cookie` | `<datadir>/.cookie` | Cookie RPC efêmero | Não — regenerado no boot |

> **O diretório de dados deve ser local ao host.** O lock de instância única (`<datadir>/.lock`) é um advisory lock do OS — não se estende entre hosts. Nunca compartilhe um diretório de dados leitura-escrita entre máquinas (NFS, Kubernetes `ReadWriteMany`) — duas instâncias ZECD corromperiam o DB da carteira. Use volumes `ReadWriteOnce` no Kubernetes.

---

## Lista de Permissões de Métodos RPC

Para implantações onde um vazamento de credencial seria crítico, o ZECD suporta restringir a superfície RPC a um subconjunto escolhido de métodos:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Qualquer método fora da lista retorna `-32601` (HTTP 404) — indistinguível de um método que não existe. Um integrador receive-only pode desabilitar `sendtoaddress`, `sendmany` e `stop` para minimizar o raio de explosão de uma credencial comprometida.

---

## Diferenças Chave em Relação ao Bitcoin Core RPC

Desenvolvedores migrando de ferramentas Bitcoin ou zcashd devem estar cientes destas divergências intencionais:

| Comportamento | Bitcoin Core | ZECD |
|---------------|-------------|------|
| Formato de endereço | `1...` / `bc1...` | `u1...` (Orchard Unified Address) — não parseável como endereço Bitcoin por clientes que analisam a string |
| Labels | Armazenamento completo | Não implementado — `setlabel`, `listlabels`, etc. retornam `-32601` |
| Taxas | Configuráveis pelo usuário | Apenas ZIP-317 determinístico; `settxfee`, `fee_rate`, `subtractfeefromamount` rejeitados com `-8` |
| Memos | Não suportados | `sendtoaddress` aceita memo hex; histórico inclui campos `memo` + `memoStr` |
| Confirmações para gastar | 1 | 3 (change própria) / 10 (terceiros) — configurável via `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` em reorg | Volta ao ponto de fork | Retorna `-5` (Block not found) se cursor foi reorganizado — re-baseline com chamada sem parâmetros |
| Saldo durante sync inicial | Bloqueia ou warm-up | Serve saldo parcial — garante automação via `GET /readyz` (retorna 503 até sync completo e backlog de enhancement drenado) |
| `minconf 0` no `getbalance` | Saldo 0-conf | Servido como 1 — nota shielded nunca é gastável não minerada |

---

## Início Rápido

**Pré-requisitos:** Zebra rodando localmente com `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Instalar do crates.io (0.4.3+):

```sh
cargo install zecd
```

```sh
# 1. Inicializar carteira testnet (gera mnemônica de 24 palavras e uma conta)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Iniciar o daemon (sincroniza em background, serve JSON-RPC na porta 18232)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**Interagir via Python (usando biblioteca Bitcoin RPC):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
addr = rpc.getnewaddress()          # retorna endereço Orchard u1...
print(rpc.getbalance())
# Enviar com memo shielded
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")
```

**Restaurar a partir da semente:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# cole sua frase mnemônica de 24 palavras quando solicitado
```

---

## Portas Padrão

| Rede | RPC ZECD | RPC Zebra (backend) | Saúde |
|------|----------|---------------------|-------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## ZECD vs. zcashd vs. Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
| Função | Nó completo + carteira | Indexador (substitui lightwalletd) | Servidor de carteira |
| Linguagem | C++ | Rust | Rust |
| Status | Descontinuado | Ativo | Ativo (v0.5.0-rc3, jul 2026) |
| Pool padrão | Transparente | N/A | Orchard (shielded) |
| Dialeto RPC | zcashd específico | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Requer nó completo | Sim (próprio) | Zebra ou zcashd | Zebra |
| Recuperação stateless | Não | N/A | Sim (apenas semente) |
| Memos shielded | Sim (`z_sendmany`) | N/A | Sim (superfície Bitcoin RPC) |
| Watch-only (UFVK) | Sim | Sim | Sim |
| Cloud-native | Não | Parcial | Sim |
| Instalação | Build/binário | Build | `cargo install zecd` |

---

## Páginas Relacionadas

- [Zebra Full Node](/zcash-tech/zebra-full-node) — o nó completo ao qual o ZECD se conecta
- [Zaino Indexer](/zcash-tech/zaino) — abordagem alternativa de indexador (substitui lightwalletd)
- [Zakura Node](/zcash-tech/zakura-node) — outra implementação de nó completo (fork do Zebra)
- [Viewing Keys](/zcash-tech/viewing-keys) — como o ZECD escaneia a cadeia usando viewing keys de conta
- [Carteiras](/using-zcash/wallets) — visão geral do ecossistema de carteiras

## Recursos

- [ZECD no GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [Runbook de Operações do ZECD](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — biblioteca de criptografia principal do Zcash](https://github.com/zcash/librustzcash)
- [ZIP-317: Mecanismo de Taxa de Transferência Proporcional](https://zips.z.cash/zip-0317)
- [ZIP-302: Memos Shielded](https://zips.z.cash/zip-0302)
- [Carteira Zodl (compatível com librustzcash)](https://github.com/zodl-inc/zodl-ios)
