<a href="https://github.com/zechub/zechub/edit/main/site/zechubglobal/zcashbrasil/zcashtech/zecd.md" target="_blank">
  <img src="https://img.shields.io/badge/Editar-blue" alt="Editar Página"/>
</a>

# ZECD — Servidor de Carteira Shielded-First

> 🇺🇸 [English version](/zcash-tech/zecd)

ZECD é um servidor de carteira Zcash com foco em privacidade, construído sobre a [librustzcash](https://github.com/zcash/librustzcash) e exposto através do dialeto JSON-RPC do Bitcoin Core. Ele oferece aos desenvolvedores e integradores de pagamento uma API familiar e compatível com Bitcoin para interagir com Zcash — com o Orchard (o pool mais privado) como padrão. Desenvolvido por [zec.rocks](https://zec.rocks), o ZECD foi projetado para substituir a funcionalidade de carteira do `zcashd` em implantações modernas e cloud-native.

---

## TL;DR

- ZECD é um **daemon de carteira (servidor)** — não é um nó completo. Ele gerencia chaves, escaneamento, provas e RPC sem falar o protocolo P2P do Zcash.
- Fala o **dialeto JSON-RPC do Bitcoin Core**: mesmos nomes de métodos, estruturas de resposta, autenticação e códigos de erro — muitos clientes RPC Bitcoin funcionam com Zcash sem modificações.
- **Endereços Orchard (shielded) são o padrão**; suporte a transparente (t-address) e Sapling requer ativação explícita por carteira.
- Conecta-se a um **nó completo [Zebra](Zebra_Full_Node.md) auto-hospedado** via JSON-RPC local — sem necessidade de lightwalletd.
- **Stateless por design**: toda a carteira é recuperável apenas com a frase semente, tornando o diretório de dados descartável.
- **Não é compatível com zcashd**: implementa apenas um subconjunto dos métodos RPC do Zcash, com diferenças de design intencionais para privacidade e segurança.
- Taxas seguem o **ZIP-317** (cálculo determinístico); taxas definidas pelo usuário são rejeitadas.

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

A política de privacidade é configurável:

| Política | Comportamento |
|----------|---------------|
| `AllowRevealedRecipients` (padrão) | Permite envios para destinatários transparentes |
| `FullPrivacy` | Apenas envios para pool shielded único; sem destinatários transparentes |
| `AllowFullyTransparent` | Também permite envios t→t financiados de UTXOs transparentes |

### Compatibilidade com Bitcoin Core RPC

O ZECD implementa o dialeto JSON-RPC do Bitcoin Core com conformidade em:

- Nomes de métodos (ex: `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`)
- Nomes e tipos de campos nas respostas
- Estrutura do envelope JSON-RPC 1.0
- Autenticação Basic e arquivo cookie
- Códigos de erro e mapeamento de status HTTP

Isso significa que muitas bibliotecas de pagamento Bitcoin, integrações de exchanges e ferramentas de monitoramento existentes podem interagir com Zcash via ZECD com poucas ou nenhuma alteração de código.

> **Nota:** O ZECD é intencionalmente **não** retrocompatível com o `zcashd`. Implementa apenas um subconjunto dos métodos `z_*`, e métodos relacionados a labels (`setlabel`, `listlabels`, etc.) não são implementados por design (veja *Stateless por Design* abaixo).

### Stateless por Design

O ZECD **não persiste nenhum estado off-chain que uma restauração somente com semente não pudesse reconstruir**. O banco de dados da carteira (`data.sqlite`) é inteiramente derivável da frase semente — fundos shielded são recuperados incondicionalmente; fundos transparentes são recuperados até o limite de gap configurado.

Para restaurar uma carteira a partir da semente:

```sh
zecd init --restore --birthday <altura-do-bloco>
```

Isso torna o diretório de dados **descartável**: um container sem volume persistente, reconstruído a partir da semente a cada inicialização, não perde nada crítico. Operadores são responsáveis por rastrear os endereços que distribuem — o ZECD só se lembra de endereços após receberem fundos on-chain.

Labels são intencionalmente ausentes. Como labels não têm fonte on-chain e não podem ser reconstruídas a partir da semente, o ZECD simplesmente não as suporta. Chamar métodos de label retorna um erro `method-not-found` (`-32601`).

### Sem Dependência do lightwalletd

O ZECD deriva blocos compactos, estado da árvore e visibilidade do mempool diretamente do JSON-RPC do Zebra. Não há lightwalletd para operar ou manter — reduzindo a complexidade operacional para implantações auto-hospedadas.

### Implantações Cloud-Native e em Containers

A arquitetura stateless do ZECD foi projetada para ambientes Docker e Kubernetes:

- Stack Docker Compose completa (`zebra → zecd`) disponível no repositório
- Endpoint de saúde na porta `9233` com probes de readiness configuráveis (`synced` ou `alive`)
- Opção de log JSON estruturado para pipelines de agregação de logs
- Taxas determinísticas ZIP-317 — sem oracle de taxas ou configuração manual

### Compatibilidade de Semente com Outras Carteiras librustzcash

O ZECD é compatível com outras carteiras baseadas em librustzcash, incluindo o [Zodl](https://github.com/zodl-inc/zodl-ios) (iOS/Android). Se algo der errado com um deployment ZECD, a frase semente pode ser inserida em qualquer outra carteira librustzcash para acessar os fundos.

---

## Início Rápido

O ZECD ainda não está publicado no crates.io; compile a partir do código-fonte ou use o stack Docker.

**Pré-requisitos:** um nó Zebra rodando localmente com `rpc.listen_addr = 127.0.0.1:18234` (testnet).

```sh
# 1. Inicializar uma carteira testnet (gera mnemônica de 24 palavras e uma conta)
cargo run --release -- --datadir ./data --testnet \
    init --wallet default --account-name primary

# 2. Iniciar o daemon (sincroniza em background, serve JSON-RPC na porta 18232)
cargo run --release -- --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**Interagir via curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Interagir via Python (usando biblioteca Bitcoin RPC):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress("invoice-1")  # retorna um endereço Orchard Unified Address u1...
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))
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
| Status | Descontinuado | Ativo | Ativo |
| Pool padrão | Transparente | N/A | Orchard (shielded) |
| Dialeto RPC | zcashd específico | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Requer nó completo | Sim (próprio) | Zebra ou zcashd | Zebra |
| Recuperação stateless | Não | N/A | Sim (apenas semente) |
| Cloud-native | Não | Parcial | Sim |

---

## Páginas Relacionadas

- [Zebra Full Node](/zcash-tech/zebra-full-node) — o nó completo ao qual o ZECD se conecta
- [Zaino Indexer](/zcash-tech/zaino) — abordagem alternativa de indexador (substitui lightwalletd)
- [Zakura Node](/zcash-tech/zakura-node) — outra implementação de nó completo (fork do Zebra)
- [Viewing Keys](/zcash-tech/viewing-keys) — como o ZECD escaneia a cadeia usando viewing keys de conta
- [Carteiras](/using-zcash/wallets) — visão geral do ecossistema de carteiras

## Recursos

- [ZECD no GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [zec.rocks](https://zec.rocks)
- [librustzcash — biblioteca de criptografia principal do Zcash](https://github.com/zcash/librustzcash)
- [Carteira Zodl (compatível com librustzcash)](https://github.com/zodl-inc/zodl-ios)
- [ZIP-317: Mecanismo de Taxa de Transferência Proporcional](https://zips.z.cash/zip-0317)
