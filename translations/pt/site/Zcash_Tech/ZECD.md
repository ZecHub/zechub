<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# zecd — Servidor de carteira Shielded-First

> 🇧🇷 [Versão em Português](/pt/zcash-tech/zecd)

zecd é um servidor de carteira shielded-first para o Zcash, construído sobre [librustzcash](https://github.com/zcash/librustzcash) e exposto por meio do dialeto JSON-RPC do Bitcoin Core. Ele oferece aos desenvolvedores e integradores de pagamentos uma API familiar e compatível com Bitcoin para interagir com o Zcash — ao mesmo tempo que torna o Orchard (o pool mais privado) o padrão. Desenvolvido por [zec.rocks](https://zec.rocks), o zecd foi projetado para substituir a funcionalidade de carteira do `zcashd` em implantações modernas e cloud-native.

**Versão atual:** 0.5.0-rc3 (13 de julho de 2026) — com suporte ao Ironwood (NU6.3). Instale por meio de `cargo install zecd` ou use a imagem oficial do Docker.

---

## TL;DR

- zecd é um **daemon de carteira (servidor)** — não um nó integral. Ele gerencia chaves, varredura, proving e RPC sem usar o protocolo P2P do Zcash.
- Ele usa o **dialeto JSON-RPC do Bitcoin Core**: os mesmos nomes de métodos, formatos de campos, autenticação e códigos de erro — muitos clientes RPC de Bitcoin funcionam com o Zcash imediatamente.
- Endereços **Orchard (blindados) são o padrão**; o suporte a pools transparentes (t-address) e Sapling exige ativação explícita por carteira.
- Ele se conecta a um **nó integral [Zebra](Zebra_Full_Node.md) auto-hospedado** por meio de JSON-RPC local — sem necessidade de lightwalletd.
- **Sem estado por design**: toda a carteira pode ser recuperada apenas a partir da frase semente, tornando o diretório de dados descartável.
- **Não é um substituto direto do zcashd**: implementa apenas um subconjunto dos métodos RPC do Zcash, com diferenças de design intencionais para privacidade e segurança.
- As taxas seguem a **ZIP-317** (cálculo determinístico de taxas); taxas definidas pelo usuário são rejeitadas.
- Suporta **memorandos blindados (ZIP-302)** por meio da familiar interface RPC do Bitcoin.

---

## Que problema o zecd resolve?

`zcashd` era o nó e a carteira originais do Zcash combinados — derivado da base de código C++ do Bitcoin em 2016. Com o tempo, isso criou fricção: o código é difícil de manter, a carteira está fortemente acoplada ao nó, e os endereços transparentes são apresentados como opções de primeira classe ao lado dos blindados.

O zecd separa a responsabilidade da carteira do consenso. É uma **camada de carteira dedicada** que fica entre os aplicativos e um nó integral Zebra, fornecendo:

- Uma implementação Rust limpa e moderna construída sobre librustzcash (a mesma biblioteca que suporta Zodl e Zingo)
- Um design com privacidade por padrão (endereços Orchard, salvo configuração em contrário)
- Uma interface RPC compatível com Bitcoin que elimina a necessidade de aprender ferramentas específicas do Zcash
- Arquitetura sem estado, recuperável por frase semente, adequada a implantações em contêineres e na nuvem

---

## Arquitetura

O zecd opera em um modelo de três camadas:

```
A sua app / cliente Bitcoin RPC
        ↓  JSON-RPC
       zecd
   (chaves, varrimento, proving, RPC)
        ↓  JSON-RPC (apenas local)
       Zebra
   (nó completo — consenso, mempool, dados da cadeia)
```

O zecd se comunica com o Zebra **exclusivamente por meio de JSON-RPC local** — sem rede peer-to-peer, sem indexadores de terceiros, sem lightwalletd. A conexão com o Zebra é deliberadamente apenas local: o zecd se recusará a enviar credenciais para um host globalmente roteável, a menos que seja explicitamente configurado para um túnel seguro fora de banda (por exemplo, WireGuard ou SSH).

---

## Principais funcionalidades

### Shielded-First, Orchard por padrão

O zecd usa endereços unificados Orchard como o tipo de endereço padrão. Os pools Sapling e transparente (t-address) exigem configuração explícita por carteira. Esse design reduz o risco de envios transparentes acidentais — uma armadilha comum de privacidade em ferramentas mais antigas do Zcash.

A política de privacidade é configurável por chamada ou globalmente em `[spend] privacy_policy`:

| Política | Comportamento |
|--------|----------|
| `AllowRevealedRecipients` | Permite envios para destinatários transparentes; revela o valor e o destinatário on-chain |
| `AllowRevealedAmounts` | Permite envios entre pools (Sapling↔Orchard), mas rejeita destinatários transparentes |
| `FullPrivacy` | Apenas envios totalmente blindados dentro do mesmo pool; rejeita destinatários transparentes e envios entre pools |
| `AllowFullyTransparent` | Também permite envios t→t financiados por UTXOs transparentes |

### Compatibilidade com RPC do Bitcoin Core

O zecd implementa o dialeto JSON-RPC do Bitcoin Core com conformidade em:

- Nomes dos métodos (por exemplo, `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Nomes e tipos dos campos nas respostas
- Estrutura do envelope JSON-RPC 1.0
- Autenticação básica, entradas `rpcauth` e autenticação por arquivo cookie
- Códigos de erro e mapeamento de status HTTP (HTTP 500 com corpo de erro, semântica 401)

Isso significa que muitas bibliotecas existentes de pagamentos em Bitcoin, integrações com corretoras e ferramentas de monitoramento podem interagir com o Zcash por meio do zecd com poucas ou nenhuma alteração de código.

A suíte de conformidade (mais de 140 verificações) é executada em cada PR contra um daemon regtest ativo e também foi validada na testnet pública.

### Memorandos blindados (ZIP-302)

O zecd expõe o recurso de memorandos blindados do Zcash por meio da familiar interface RPC do Bitcoin — algo indisponível nas ferramentas padrão do Bitcoin:

- `sendtoaddress` aceita um memorando hexadecimal opcional como parâmetro extra ao final (até 512 bytes; rejeitado para destinatários transparentes)
- As entradas do histórico de transações de `listtransactions` e `gettransaction` incluem os campos `memo` (hex) e `memoStr` (texto decodificado) quando uma saída contém um
- Envios de valor zero para um destinatário blindado são suportados para casos de uso apenas com memorando (o padrão "memo-only-send" de `z_sendmany`)

Isso torna o zecd adequado para aplicativos que precisam de mensagens privadas on-chain junto com pagamentos.

### Sem estado por design

O zecd não persiste **nenhum estado off-chain que uma restauração apenas com a frase semente não pudesse reconstruir**. O banco de dados da carteira (`data.sqlite`) é inteiramente derivável da frase semente — os fundos blindados são recuperados incondicionalmente; os fundos transparentes são recuperados até o limite de lacuna configurado.

Para restaurar uma carteira a partir da frase semente:

```sh
zecd init --restore --birthday <block-height>
```

Isso torna o diretório de dados **descartável**: um contêiner sem volume persistente, reconstruído a partir da frase semente a cada inicialização, não perde nada crítico. Os operadores são responsáveis por acompanhar os endereços que distribuem — o zecd só se lembra dos endereços depois que eles recebem fundos on-chain.

Os rótulos estão intencionalmente ausentes. Como os rótulos não têm fonte on-chain e não podem ser reconstruídos a partir da frase semente, o zecd simplesmente não os suporta. Chamar métodos de rótulos retorna um erro `method-not-found` (`-32601`).

### Sem dependência de lightwalletd

O zecd deriva blocos compactos, estado da tree e visibilidade do mempool diretamente do JSON-RPC do Zebra. Não há lightwalletd para operar ou manter — reduzindo a complexidade operacional de implantações auto-hospedadas.

### Implantações cloud-native e em contêineres

A arquitetura sem estado do zecd foi projetada para ambientes Docker e Kubernetes:

- Stack completa do Docker Compose (`zebra → zecd`) disponível no repositório
- Endpoint de integridade na porta `9233` com sondas de prontidão configuráveis (`synced` ou `connected`)
- Opção de logging JSON estruturado para pipelines de agregação de logs
- Taxas determinísticas ZIP-317 — sem fee oracle nem configuração manual de taxas
- `bootstrap_from_keys` (ativo por padrão): um diretório de dados vazio ao lado de `keys.toml` reconstrói automaticamente a carteira na inicialização — implante montando um Secret e iniciando com um PVC vazio

---

## Modelos de custódia

O zecd suporta três modelos de custódia de chaves, adequados a diferentes requisitos de implantação e segurança:

### 1. Não criptografado (padrão — desbloqueio automático)

A frase mnemônica em `keys.toml` é encapsulada em um **arquivo de identidade age** (`identity.txt`). Com `auto_unlock = true` por padrão, a frase semente é descriptografada na memória durante a inicialização, permitindo envios sem supervisão e sem necessidade de chamada `walletpassphrase`.

Melhor para: processadores automatizados de pagamentos, hot wallets de corretoras, ambientes de desenvolvimento.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Armazene `identity.txt` **fora** do diretório de dados na mainnet — qualquer pessoa que leia ambos os arquivos terá autoridade de gasto.

### 2. Criptografado (protegido por passphrase)

A frase mnemônica é encapsulada com uma passphrase (age scrypt) em vez de um arquivo de identidade. A carteira inicia bloqueada; `walletpassphrase "<pass>" <timeout>` a desbloqueia pela duração informada e a bloqueia novamente automaticamente ao final — correspondendo ao comportamento de carteira criptografada do Bitcoin Core.

Melhor para: hot wallets em que a autoridade de gasto sem supervisão não é necessária; fluxos de trabalho interativos de operadores.

```sh
zecd init --datadir ./data --encrypt
# mais tarde: walletpassphrase "my-passphrase" 300
```

### 3. Apenas visualização (UFVK — sem chave de gasto)

Inicializada com uma Unified Full Viewing Key (UFVK) exportada de outra carteira. Pode receber, fazer varredura e informar saldos — mas não pode assinar transações. Ideal para monitoramento, faturamento ou nós de auditoria separados da carteira de assinatura.

```sh
# No anfitrião da wallet de assinatura:
zecd export-ufvk

# No anfitrião apenas de observação:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Backup e recuperação

Os fundos são recuperáveis **somente a partir da frase mnemônica**. Todo o resto é cache.

| Artifact | Localização | O que protege | Fazer backup? |
|----------|----------|-----------------|----------|
| **24-word mnemonic** | Mostrada uma vez em `zecd init` | Os fundos — perda = perda permanente | **Sim — offline (papel/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Frase semente criptografada + birthday + rede | **Sim — como um Secret** |
| `identity.txt` | `[keys] age_identity` | Descriptografa `keys.toml` (autoridade de gasto) | **Sim — separadamente de `keys.toml`** |
| Birthday height | Dentro de `keys.toml` | Torna a restauração rápida (qualquer altura antes da primeira tx) | Registre com a frase mnemônica |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Cache da carteira — reconstruído a partir da frase semente na restauração | Não — descartável |
| `blocks/` | `<wallet dir>/blocks/` | Cache de blocos compactos | Não — nunca envie; pode ficar grande |
| `.cookie` | `<datadir>/.cookie` | Cookie RPC efêmero | Não — regenerado na inicialização |

> **O diretório de dados deve ser local ao host.** O bloqueio de instância única do zecd (`<datadir>/.lock`) é um bloqueio consultivo do SO — não se estende entre hosts. Nunca compartilhe um diretório de dados com leitura e escrita entre máquinas (NFS, Kubernetes `ReadWriteMany`) — duas instâncias do zecd corromperiam o banco de dados da carteira. Use volumes `ReadWriteOnce` no Kubernetes.

---

## Lista segura de métodos RPC

Para implantações em que um vazamento de credenciais seria catastrófico, o zecd permite restringir a superfície RPC a um subconjunto escolhido de métodos:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Qualquer método que não esteja na lista retorna `-32601` (HTTP 404) — indistinguível de um método que não existe, portanto um servidor bloqueado não revela nada sobre o que desativou. Um emissor de faturas somente para recebimento pode desativar `sendtoaddress`, `sendmany` e `stop` para minimizar o raio de impacto de um cliente comprometido.

---

## Principais diferenças em relação ao RPC do Bitcoin Core

Os desenvolvedores que migram de ferramentas do Bitcoin ou zcashd devem estar cientes destas divergências intencionais:

| Behavior | Bitcoin Core | zecd |
|----------|-------------|------|
| Address format | `1...` / `bc1...` | `u1...` (Orchard Unified Address) — não interpretável como endereço Bitcoin por clientes que fazem parsing de strings |
| Labels | Armazenamento completo de rótulos | Não implementado — `setlabel`, `listlabels`, etc. retornam `-32601` |
| Taxas | Definidas pelo usuário; mercado de taxas | Apenas ZIP-317 determinística; `settxfee`, `fee_rate`, `subtractfeefromamount` rejeitados com `-8` |
| Memos | Não suportados | `sendtoaddress` aceita memorando hexadecimal; o histórico tem campos `memo` + `memoStr` |
| Confirmações para gastar | 1 | 3 (troco próprio) / 10 (terceiros) — configurável via `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` em reorg | Volta até a bifurcação | Retorna `-5` (Bloco não encontrado) se o cursor for removido por uma reorg — redefina a base com uma chamada sem parâmetros |
| Destinatários duplicados em `sendmany` | Erro | O parser JSON colapsa duplicados (vence o último) antes que o zecd os veja — não liste o mesmo endereço duas vezes |
| Saldo durante a sincronização inicial | Bloqueia ou aquecimento | Fornece saldo parcial — controle a automação usando `GET /readyz` (retorna 503 até estar totalmente sincronizado e a fila de melhorias estar esgotada) |
| `minconf 0` em `getbalance` | Saldo com 0 confirmações | Fornecido como 1 — uma note blindada nunca pode ser gasta sem ser minerada |

---

## Início rápido

**Pré-requisitos:** Zebra em execução local com `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Instale a partir de crates.io (0.4.3+):

```sh
cargo install zecd
```

Ou compile a partir do código-fonte:

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

**Interaja via curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Interaja via Python (usando uma biblioteca Bitcoin RPC):**

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

**Restaure a partir da seed:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# cole a sua mnemonic de 24 palavras quando solicitado
```

---

## Portas padrão

| Rede | zecd RPC | Zebra RPC (backend) | Saúde |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## zecd vs. zcashd vs. Zaino

| | zcashd | Zaino | zecd |
|--|--------|-------|------|
| Função | Nó integral + carteira | Indexador (substitui lightwalletd) | Somente servidor de carteira |
| Linguagem | C++ | Rust | Rust |
| Estado | Descontinuado | Ativo | Ativo (v0.5.0-rc3, jul 2026) |
| Pool padrão | Transparente | N/A | Orchard (blindado) |
| Dialeto RPC | Específico do zcashd | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Requer nó integral | Sim (próprio) | Zebra ou zcashd | Zebra |
| Recuperação sem estado | Não | N/A | Sim (apenas seed) |
| Memorandos blindados | Sim (`z_sendmany`) | N/A | Sim (interface Bitcoin RPC) |
| Somente visualização (UFVK) | Sim | Sim | Sim |
| Nativo da nuvem | Não | Parcial | Sim |
| Instalação | Compilação/binário | Compilação | `cargo install zecd` |

---

## Páginas relacionadas

- [Nó integral Zebra](Zebra_Full_Node.md) — o nó integral ao qual o zecd se conecta
- [Indexador Zaino](Zaino.md) — abordagem alternativa de indexador (substitui lightwalletd)
- [Nó Zakura](Zakura_Node.md) — outra implementação de nó integral (fork do Zebra)
- [Chaves de visualização](Viewing_Keys.md) — como o zecd varre a chain usando chaves de visualização de conta
- [Carteiras](/using-zcash/wallets) — visão geral do ecossistema de carteiras

## Recursos

- [zecd GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [Manual de operações do zecd](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — biblioteca central de criptografia do Zcash](https://github.com/zcash/librustzcash)
- [ZIP-317: Mecanismo de taxa de transferência proporcional](https://zips.z.cash/zip-0317)
- [ZIP-302: Memorandos blindados](https://zips.z.cash/zip-0302)
- [Carteira Zodl (compatível com librustzcash)](https://github.com/zodl-inc/zodl-ios)
