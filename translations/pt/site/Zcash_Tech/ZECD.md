---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# ZECD — Servidor de Wallet Shielded-First

> 🇧🇷 [Versão em Português](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD é um servidor de wallet shielded-first para Zcash, construído sobre [librustzcash](https://github.com/zcash/librustzcash) e exposto através do dialeto JSON-RPC do Bitcoin Core. Dá aos programadores e integradores de pagamentos uma API familiar, compatível com Bitcoin, para interagir com Zcash — ao mesmo tempo que torna Orchard (a pool mais privada) a opção predefinida. Desenvolvido por [zec.rocks](https://zec.rocks), o ZECD foi concebido para substituir a funcionalidade de wallet do `zcashd` em implementações modernas e cloud-native.

**Versão atual:** 0.5.0-rc3 (13 de julho de 2026) — com suporte para Ironwood (NU6.3). Instale através de `cargo install zecd` ou use a imagem Docker oficial.

---

## TL;DR

- ZECD é um **daemon de wallet (servidor)** — não um nó completo. Trata de chaves, varrimento, proving e RPC sem falar o protocolo P2P do Zcash.
- Fala o **dialeto JSON-RPC do Bitcoin Core**: mesmos nomes de métodos, formatos dos campos, autenticação e códigos de erro — muitos clientes RPC de Bitcoin funcionam com Zcash imediatamente.
- Os endereços **Orchard (shielded) são a opção predefinida**; o suporte a transparentes (t-address) e Sapling requer ativação explícita por wallet.
- Liga-se a um **nó completo [Zebra](Zebra_Full_Node.md) auto-hospedado** via JSON-RPC local — sem necessidade de lightwalletd.
- **Sem estado por conceção**: toda a wallet pode ser recuperada apenas a partir da seed phrase, tornando o diretório de dados descartável.
- **Não é um substituto direto do zcashd**: implementa apenas um subconjunto dos métodos RPC do Zcash, com diferenças de conceção intencionais para privacidade e segurança.
- As taxas seguem a **ZIP-317** (cálculo determinístico de taxas); taxas definidas pelo utilizador são rejeitadas.
- Suporta **memos shielded (ZIP-302)** através da familiar interface RPC do Bitcoin.

---

## Que Problema o ZECD Resolve?

`zcashd` era o nó e wallet original do Zcash combinados — derivado da base de código C++ do Bitcoin em 2016. Com o tempo, isto criou fricção: o código é difícil de manter, a wallet está fortemente acoplada ao nó, e os endereços transparentes são apresentados como opções de primeira classe ao lado dos shielded.

O ZECD separa a responsabilidade da wallet do consenso. É uma **camada de wallet dedicada** que fica entre as aplicações e um nó completo Zebra, fornecendo:

- Uma implementação Rust limpa e moderna construída sobre librustzcash (a mesma biblioteca que suporta Zodl e Zingo)
- Um design de privacidade por defeito (endereços Orchard salvo configuração em contrário)
- Uma interface RPC compatível com Bitcoin que elimina a necessidade de aprender ferramentas específicas de Zcash
- Arquitetura sem estado, recuperável por seed, adequada a implementações contentorizadas e na cloud

---

## Arquitetura

O ZECD opera num modelo de três camadas:

```
A sua app / cliente Bitcoin RPC
        ↓  JSON-RPC
       ZECD
   (chaves, varrimento, proving, RPC)
        ↓  JSON-RPC (apenas local)
       Zebra
   (nó completo — consenso, mempool, dados da cadeia)
```

O ZECD comunica com o Zebra **exclusivamente através de JSON-RPC local** — sem rede peer-to-peer, sem indexadores de terceiros, sem lightwalletd. A ligação ao Zebra é deliberadamente apenas local: o ZECD recusar-se-á a enviar credenciais para um anfitrião globalmente acessível, a menos que seja explicitamente configurado para um túnel seguro fora de banda (por exemplo, WireGuard ou SSH).

---

## Funcionalidades Principais

### Shielded-First, Orchard por Defeito

O ZECD usa Unified Addresses Orchard como tipo de endereço predefinido. As pools Sapling e transparente (t-address) requerem configuração explícita por wallet. Este design reduz o risco de envios transparentes acidentais — uma armadilha comum de privacidade em ferramentas Zcash mais antigas.

A política de privacidade é configurável por chamada ou globalmente em `[spend] privacy_policy`:

| Política | Comportamento |
|--------|----------|
| `AllowRevealedRecipients` (predefinida) | Permite envios para destinatários transparentes; revela montante e destinatário on-chain |
| `AllowRevealedAmounts` | Permite envios entre pools (Sapling↔Orchard), mas rejeita destinatários transparentes |
| `FullPrivacy` | Apenas envios totalmente shielded dentro da mesma pool; rejeita destinatários transparentes e envios entre pools |
| `AllowFullyTransparent` | Também permite envios t→t financiados a partir de transparent UTXOs |

### Compatibilidade com RPC do Bitcoin Core

O ZECD implementa o dialeto JSON-RPC do Bitcoin Core com conformidade em:

- Nomes dos métodos (por exemplo, `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Nomes e tipos dos campos nas respostas
- Estrutura do envelope JSON-RPC 1.0
- Basic auth, entradas `rpcauth` e autenticação por ficheiro cookie
- Códigos de erro e mapeamento de estado HTTP (HTTP 500 com corpo de erro, semântica 401)

Isto significa que muitas bibliotecas de pagamentos Bitcoin, integrações com exchanges e ferramentas de monitorização existentes podem interagir com Zcash através do ZECD com poucas ou nenhumas alterações de código.

A suíte de conformidade (mais de 140 verificações) é executada em cada PR contra um daemon regtest ativo e foi também validada contra a testnet pública.

### Memos Shielded (ZIP-302)

O ZECD expõe a funcionalidade de memos shielded do Zcash através da familiar interface RPC do Bitcoin — algo indisponível nas ferramentas padrão do Bitcoin:

- `sendtoaddress` aceita um memo hexadecimal opcional como parâmetro extra no fim (até 512 bytes; rejeitado para destinatários transparentes)
- As entradas do histórico de transações de `listtransactions` e `gettransaction` incluem os campos `memo` (hex) e `memoStr` (texto descodificado) quando um output o transporta
- Envios de montante zero para um destinatário shielded são suportados para casos de uso apenas com memo (o padrão "memo-only-send" de `z_sendmany`)

Isto torna o ZECD adequado para aplicações que necessitam de mensagens privadas on-chain juntamente com pagamentos.

### Sem Estado por Conceção

O ZECD não persiste **nenhum estado off-chain que uma restauração apenas com seed não pudesse reconstruir**. A base de dados da wallet (`data.sqlite`) é inteiramente derivável da seed phrase — os fundos shielded são recuperados incondicionalmente; os fundos transparentes são recuperados até ao gap limit configurado.

Para restaurar uma wallet a partir da seed:

```sh
zecd init --restore --birthday <block-height>
```

Isto torna o diretório de dados **descartável**: um contentor sem volume persistente, reconstruído a partir da seed em cada arranque, não perde nada de crítico. Os operadores são responsáveis por seguir os endereços que distribuem — o ZECD só se lembra dos endereços depois de estes receberem fundos on-chain.

As labels estão intencionalmente ausentes. Como as labels não têm fonte on-chain e não podem ser reconstruídas a partir da seed, o ZECD simplesmente não as suporta. Chamar métodos de labels devolve um erro `method-not-found` (`-32601`).

### Sem Dependência de lightwalletd

O ZECD deriva compact blocks, estado da tree e visibilidade da mempool diretamente do JSON-RPC do Zebra. Não há lightwalletd para operar ou manter — reduzindo a complexidade operacional para implementações auto-hospedadas.

### Implementações Cloud-Native e Contentorizadas

A arquitetura sem estado do ZECD foi concebida para ambientes Docker e Kubernetes:

- Stack Docker Compose completa (`zebra → zecd`) disponível no repositório
- Endpoint de saúde na porta `9233` com sondas de prontidão configuráveis (`synced` ou `connected`)
- Opção de logging JSON estruturado para pipelines de agregação de logs
- Taxas determinísticas ZIP-317 — sem fee oracle nem configuração manual de taxas
- `bootstrap_from_keys` (ativo por defeito): um diretório de dados vazio ao lado de `keys.toml` reconstrói automaticamente a wallet no arranque — implemente montando um Secret e arrancando com um PVC vazio

---

## Modelos de Custódia

O ZECD suporta três modelos de custódia de chaves, adequados a diferentes requisitos de implementação e segurança:

### 1. Não Encriptado (Predefinido — Desbloqueio Automático)

A seed mnemonic em `keys.toml` é encapsulada num **ficheiro de identidade age** (`identity.txt`). Com `auto_unlock = true` por defeito, a seed é desencriptada para a memória no arranque, permitindo envios sem supervisão e sem necessidade de chamada `walletpassphrase`.

Melhor para: processadores de pagamentos automatizados, hot wallets de exchanges, ambientes de desenvolvimento.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Guarde `identity.txt` **fora** do diretório de dados na mainnet — qualquer pessoa que leia ambos os ficheiros tem autoridade para gastar.

### 2. Encriptado (Protegido por Passphrase)

A mnemonic é encapsulada com uma passphrase (age scrypt) em vez de um ficheiro de identidade. A wallet arranca bloqueada; `walletpassphrase "<pass>" <timeout>` desbloqueia-a pela duração indicada e volta a bloqueá-la automaticamente no fim — correspondendo ao comportamento de wallet encriptada do Bitcoin Core.

Melhor para: hot wallets onde a autoridade de gasto sem supervisão não é necessária; fluxos de trabalho interativos de operadores.

```sh
zecd init --datadir ./data --encrypt
# mais tarde: walletpassphrase "my-passphrase" 300
```

### 3. Apenas Observação (UFVK — Sem Chave de Gasto)

Inicializada com uma Unified Full Viewing Key (UFVK) exportada de outra wallet. Pode receber, varrer e reportar saldos — mas não pode assinar transações. Ideal para monitorização, faturação ou nós de auditoria separados da wallet de assinatura.

```sh
# No anfitrião da wallet de assinatura:
zecd export-ufvk

# No anfitrião apenas de observação:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Backup e Recuperação

Os fundos são recuperáveis **apenas a partir da mnemonic**. Tudo o resto é cache.

| Artefacto | Localização | O que protege | Fazer backup? |
|----------|----------|-----------------|----------|
| **mnemonic de 24 palavras** | Mostrada uma vez em `zecd init` | Os fundos — perda = perda permanente | **Sim — offline (papel/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Seed encriptada + birthday + rede | **Sim — como um Secret** |
| `identity.txt` | `[keys] age_identity` | Desencripta `keys.toml` (autoridade de gasto) | **Sim — separadamente de `keys.toml`** |
| Altura birthday | Dentro de `keys.toml` | Torna a restauração rápida (qualquer altura antes da primeira tx) | Registar com a mnemonic |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Cache da wallet — reconstruída a partir da seed na restauração | Não — descartável |
| `blocks/` | `<wallet dir>/blocks/` | Cache de compact blocks | Não — nunca enviar; pode crescer bastante |
| `.cookie` | `<datadir>/.cookie` | Cookie RPC efémero | Não — regenerado no arranque |

> **O diretório de dados tem de ser local ao anfitrião.** O bloqueio de instância única do ZECD (`<datadir>/.lock`) é um bloqueio consultivo do SO — não se estende entre anfitriões. Nunca partilhe um diretório de dados com leitura-escrita entre máquinas (NFS, Kubernetes `ReadWriteMany`) — duas instâncias ZECD corromperiam a base de dados da wallet. Use volumes `ReadWriteOnce` no Kubernetes.

---

## Lista Segura de Métodos RPC

Para implementações onde uma fuga de credenciais seria catastrófica, o ZECD suporta restringir a superfície RPC a um subconjunto escolhido de métodos:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Qualquer método que não esteja na lista devolve `-32601` (HTTP 404) — indistinguível de um método que não existe, pelo que um servidor bloqueado não revela nada sobre o que desativou. Um emissor de faturas apenas de receção pode desativar `sendtoaddress`, `sendmany` e `stop` para minimizar o raio de impacto de um cliente comprometido.

---

## Diferenças Principais em Relação ao RPC do Bitcoin Core

Os programadores que migram de ferramentas Bitcoin ou zcashd devem estar cientes destas divergências intencionais:

| Comportamento | Bitcoin Core | ZECD |
|----------|-------------|------|
| Formato de endereço | `1...` / `bc1...` | `u1...` (Orchard Unified Address) — não interpretável como endereço Bitcoin por clientes que fazem parsing de strings |
| Labels | Armazenamento completo de labels | Não implementado — `setlabel`, `listlabels`, etc. devolvem `-32601` |
| Taxas | Definidas pelo utilizador; mercado de taxas | Apenas ZIP-317 determinística; `settxfee`, `fee_rate`, `subtractfeefromamount` rejeitados com `-8` |
| Memos | Não suportados | `sendtoaddress` aceita memo hex; o histórico tem campos `memo` + `memoStr` |
| Confirmações para gastar | 1 | 3 (troco próprio) / 10 (terceiros) — configurável via `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` em reorg | Regride até à bifurcação | Devolve `-5` (Bloco não encontrado) se o cursor for removido por reorg — redefina a base com uma chamada sem parâmetros |
| Destinatários duplicados em `sendmany` | Erro | O parser JSON colapsa duplicados (vence o último) antes de o ZECD os ver — não liste o mesmo endereço duas vezes |
| Saldo durante sincronização inicial | Bloqueia ou warm-up | Serve saldo parcial — condicione a automação a `GET /readyz` (devolve 503 até estar totalmente sincronizado e a fila de melhorias esgotada) |
| `minconf 0` em `getbalance` | Saldo com 0 confirmações | Servido como 1 — uma note shielded nunca é gastável sem mineração |

---

## Início Rápido

**Pré-requisitos:** Zebra em execução local com `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Instalar a partir de crates.io (0.4.3+):

```sh
cargo install zecd
```

Ou compilar a partir do código-fonte:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Inicializar uma wallet testnet (gera uma mnemonic de 24 palavras e uma conta)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Iniciar o daemon (sincroniza em segundo plano, serve JSON-RPC na porta 18232)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**Interagir via curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Interagir via Python (usando uma biblioteca Bitcoin RPC):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # devolve um Orchard Unified Address u1...
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Enviar com um memo shielded
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # memo hex
```

**Restaurar a partir da seed:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# cole a sua mnemonic de 24 palavras quando solicitado
```

---

## Portas Predefinidas

| Rede | ZECD RPC | Zebra RPC (backend) | Saúde |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## ZECD vs. zcashd vs. Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
| Função | Nó completo + wallet | Indexador (substitui lightwalletd) | Apenas servidor de wallet |
| Linguagem | C++ | Rust | Rust |
| Estado | Descontinuado | Ativo | Ativo (v0.5.0-rc3, jul 2026) |
| Pool predefinida | Transparente | N/A | Orchard (shielded) |
| Dialeto RPC | específico do zcashd | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Requer nó completo | Sim (próprio) | Zebra ou zcashd | Zebra |
| Recuperação sem estado | Não | N/A | Sim (apenas seed) |
| Memos shielded | Sim (`z_sendmany`) | N/A | Sim (superfície Bitcoin RPC) |
| Apenas observação (UFVK) | Sim | Sim | Sim |
| Cloud-native | Não | Parcial | Sim |
| Instalação | Compilação/binário | Compilação | `cargo install zecd` |

---

## Páginas Relacionadas

- [Zebra Full Node](Zebra_Full_Node.md) — o nó completo ao qual o ZECD se liga
- [Zaino Indexer](Zaino.md) — abordagem alternativa de indexador (substitui lightwalletd)
- [Zakura Node](Zakura_Node.md) — outra implementação de nó completo (fork de Zebra)
- [Viewing Keys](Viewing_Keys.md) — como o ZECD varre a cadeia usando chaves de visualização de conta
- [Wallets](/using-zcash/wallets) — visão geral do ecossistema de wallets

## Recursos

- [ZECD GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [Runbook de Operações do ZECD](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — biblioteca central de criptografia Zcash](https://github.com/zcash/librustzcash)
- [ZIP-317: Mecanismo de Taxa de Transferência Proporcional](https://zips.z.cash/zip-0317)
- [ZIP-302: Memos Shielded](https://zips.z.cash/zip-0302)
- [wallet Zodl (compatível com librustzcash)](https://github.com/zodl-inc/zodl-ios)
