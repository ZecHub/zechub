<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# zecd — Servidor de carteira com prioridade para o blindado

zecd é um servidor de carteira com prioridade para endereços blindados para o Zcash, construído sobre [librustzcash](https://github.com/zcash/librustzcash) e exposto por meio do dialeto JSON-RPC do Bitcoin Core. Ele oferece aos desenvolvedores e integradores de pagamentos uma API familiar e compatível com Bitcoin para interagir com o Zcash, ao mesmo tempo em que torna o Orchard (o pool mais privado) o padrão. Desenvolvido por [zec.rocks](https://zec.rocks), zecd foi projetado para substituir a funcionalidade de carteira do `zcashd` em implantações modernas e nativas da nuvem.

**Versão atual:** 0.5.0-rc3 (13 de julho de 2026), com suporte ao Ironwood (NU6.3). Instale via `cargo install zecd` ou use a imagem oficial do Docker.

---

## Resumo

- zecd é um **daemon de carteira (servidor)**, não um nó integral. Ele cuida das chaves, da varredura, da geração de provas e do RPC sem falar o protocolo P2P do Zcash.
- Ele fala o **dialeto JSON-RPC do Bitcoin Core**: mesmos nomes de métodos, formatos de campos, autenticação e códigos de erro. Muitos clientes RPC de Bitcoin funcionam com Zcash sem nenhuma alteração.
- **Endereços Orchard (blindados) são o padrão**; o suporte a endereços transparentes (t-address) e a Sapling exige ativação explícita por carteira.
- Ele se conecta a um **nó integral [Zebra](Zebra_Full_Node.md) auto-hospedado** via JSON-RPC local, sem necessidade de lightwalletd.
- **Sem estado por design**: a carteira inteira pode ser recuperada apenas a partir da frase semente, o que torna o diretório de dados descartável.
- **Não é um substituto direto do zcashd**: implementa apenas um subconjunto dos métodos RPC do Zcash, com diferenças de design intencionais em prol da privacidade e da segurança.
- As taxas seguem o **ZIP-317** (cálculo determinístico de taxas); taxas especificadas pelo usuário são rejeitadas.
- Suporta **memorandos blindados (ZIP-302)** por meio da interface RPC familiar do Bitcoin.

---

## Que problema zecd resolve?

`zcashd` era o nó e a carteira originais do Zcash combinados, um fork da base de código C++ do Bitcoin feito em 2016. Com o tempo, isso gerou atritos: o código é difícil de manter, a carteira está fortemente acoplada ao nó e os endereços transparentes são apresentados como opções de primeira classe ao lado dos blindados.

zecd separa a responsabilidade da carteira do consenso. Trata-se de uma **camada de carteira dedicada** que fica entre os aplicativos e um nó integral Zebra, oferecendo:

- Uma implementação limpa e moderna em Rust construída sobre librustzcash (a mesma biblioteca que alimenta Zodl e Zingo)
- Design com privacidade por padrão (endereços Orchard, salvo configuração em contrário)
- Uma interface RPC compatível com Bitcoin que elimina a necessidade de aprender ferramentas específicas do Zcash
- Arquitetura sem estado e recuperável pela frase semente, adequada a implantações em contêineres e na nuvem

---

## Arquitetura

zecd opera em um modelo de três camadas:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       zecd
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

zecd se comunica com Zebra **exclusivamente via JSON-RPC local**: sem rede peer-to-peer, sem indexadores de terceiros, sem lightwalletd. A conexão com Zebra é deliberadamente apenas local: zecd se recusa a enviar credenciais para um host roteável globalmente, a menos que esteja explicitamente configurado para um túnel seguro fora de banda (por exemplo, WireGuard ou SSH).

---

## Principais recursos

### Prioridade para o blindado, Orchard por padrão

zecd usa Unified Addresses Orchard como tipo de endereço padrão. Os pools Sapling e transparente (t-address) exigem configuração explícita por carteira. Esse design reduz o risco de envios transparentes acidentais, uma armadilha de privacidade comum em ferramentas mais antigas do Zcash.

A política de privacidade é configurável por chamada ou globalmente em `[spend] privacy_policy`:

| Política | Comportamento |
|--------|----------|
| `AllowRevealedRecipients` (padrão) | Permite envios para destinatários transparentes; revela o valor e o destinatário on-chain |
| `AllowRevealedAmounts` | Permite envios entre pools (Sapling↔Orchard), mas rejeita destinatários transparentes |
| `FullPrivacy` | Apenas envios totalmente blindados dentro de um mesmo pool; rejeita destinatários transparentes e envios entre pools |
| `AllowFullyTransparent` | Também permite envios t→t financiados a partir de UTXOs transparentes |

### Compatibilidade com o RPC do Bitcoin Core

zecd implementa o dialeto JSON-RPC do Bitcoin Core com conformidade em:

- Nomes de métodos (por exemplo, `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Nomes e tipos de campos nas respostas
- Estrutura de envelope JSON-RPC 1.0
- Autenticação básica, entradas `rpcauth` e autenticação por arquivo de cookie
- Códigos de erro e mapeamento de status HTTP (HTTP 500 com corpo de erro, semântica 401)

Isso significa que muitas bibliotecas de pagamento de Bitcoin, integrações de corretoras e ferramentas de monitoramento existentes podem interagir com Zcash via zecd com pouca ou nenhuma alteração de código.

O conjunto de testes de conformidade (mais de 140 verificações) é executado em cada PR contra um daemon regtest ativo e também foi validado na testnet pública.

### Memorandos blindados (ZIP-302)

zecd expõe o recurso de memorando blindado do Zcash por meio da interface RPC familiar do Bitcoin, algo indisponível nas ferramentas padrão do Bitcoin:

- `sendtoaddress` aceita um memorando hexadecimal opcional como parâmetro final extra (até 512 bytes; rejeitado para destinatários transparentes)
- As entradas do histórico de transações de `listtransactions` e `gettransaction` incluem os campos `memo` (hexadecimal) e `memoStr` (texto decodificado) quando uma saída contém um memorando
- Envios de valor zero para um destinatário blindado são suportados para casos de uso apenas com memorando (o padrão `z_sendmany` "memo-only-send")

Isso torna zecd adequado para aplicativos que precisam de mensagens privadas on-chain junto com pagamentos.

### Sem estado por design

zecd não persiste **nenhum estado off-chain que uma restauração apenas pela frase semente não consiga reconstruir**. O banco de dados da carteira (`data.sqlite`) é inteiramente derivável da frase semente: os fundos blindados são recuperados incondicionalmente; os fundos transparentes são recuperados até o limite de lacuna configurado.

Para restaurar uma carteira a partir da frase semente:

```sh
zecd init --restore --birthday <block-height>
```

Isso torna o diretório de dados **descartável**: um contêiner sem volume persistente, reconstruído a partir da frase semente a cada inicialização, não perde nada crítico. Os operadores são responsáveis por rastrear os endereços que distribuem, pois zecd só se lembra dos endereços depois que eles recebem fundos on-chain.

Os rótulos estão intencionalmente ausentes. Como os rótulos não têm fonte on-chain e não podem ser reconstruídos a partir da frase semente, zecd simplesmente não os suporta. Chamar métodos de rótulo retorna um erro `method-not-found` (`-32601`).

### Sem dependência de lightwalletd

zecd deriva blocos compactos, estado da árvore e visibilidade da mempool diretamente do JSON-RPC do Zebra. Não há lightwalletd para operar ou manter, o que reduz a complexidade operacional em implantações auto-hospedadas.

### Implantações nativas da nuvem e em contêineres

A arquitetura sem estado do zecd foi projetada para ambientes Docker e Kubernetes:

- Stack completa do Docker Compose (`zebra → zecd`) disponível no repositório
- Endpoint de integridade na porta `9233` com sondas de prontidão configuráveis (`synced` ou `connected`)
- Opção de log estruturado em JSON para pipelines de agregação de logs
- Taxas determinísticas ZIP-317, sem oráculo de taxas nem configuração manual de taxas
- `bootstrap_from_keys` (ativado por padrão): um diretório de dados vazio ao lado de `keys.toml` reconstrói automaticamente a carteira na inicialização; implante montando um Secret e iniciando com um PVC vazio

---

## Modelos de custódia

zecd suporta três modelos de custódia de chaves, adequados a diferentes requisitos de implantação e segurança:

### 1. Não criptografado (padrão, desbloqueio automático)

O mnemônico da frase semente em `keys.toml` é encapsulado com um **arquivo de identidade age** (`identity.txt`). Com o `auto_unlock = true` padrão, a frase semente é descriptografada na memória durante a inicialização, de modo que os envios ocorrem sem supervisão e nenhuma chamada `walletpassphrase` é necessária.

Ideal para: processadores de pagamento automatizados, carteiras quentes de corretoras, ambientes de desenvolvimento.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Armazene `identity.txt` **fora** do diretório de dados na mainnet: qualquer pessoa que leia os dois arquivos tem autoridade de gasto.

### 2. Criptografado (protegido por senha)

O mnemônico é encapsulado com uma senha (age scrypt) em vez de um arquivo de identidade. A carteira inicia bloqueada; `walletpassphrase "<pass>" <timeout>` a desbloqueia pelo período informado e a bloqueia novamente ao fim do tempo, replicando o comportamento da carteira criptografada do Bitcoin Core.

Ideal para: carteiras quentes em que a autoridade de gasto sem supervisão não é necessária; fluxos de trabalho interativos de operadores.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Somente observação (UFVK, sem chave de gasto)

Inicializada com uma Unified Full Viewing Key (UFVK) exportada de outra carteira. Pode receber, varrer e informar saldos, mas não pode assinar transações. Ideal para nós de monitoramento, faturamento ou auditoria separados da carteira de assinatura.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Backup e recuperação

Os fundos podem ser recuperados **apenas com o mnemônico**. Todo o resto é cache.

| Artefato | Local | O que protege | Fazer backup? |
|----------|----------|-----------------|----------|
| **Mnemônico de 24 palavras** | Exibido uma única vez em `zecd init` | Os fundos: perda = perda permanente | **Sim, offline (papel/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Frase semente criptografada + aniversário + rede | **Sim, como um Secret** |
| `identity.txt` | `[keys] age_identity` | Descriptografa `keys.toml` (autoridade de gasto) | **Sim, separadamente de `keys.toml`** |
| Altura de aniversário | Dentro de `keys.toml` | Torna a restauração rápida (qualquer altura antes da primeira transação) | Registre junto com o mnemônico |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Cache da carteira, reconstruído a partir da frase semente na restauração | Não, descartável |
| `blocks/` | `<wallet dir>/blocks/` | Cache de blocos compactos | Não, nunca distribua; pode ficar grande |
| `.cookie` | `<datadir>/.cookie` | Cookie RPC efêmero | Não, regenerado na inicialização |

> **O diretório de dados deve ser local ao host.** O bloqueio de instância única do zecd (`<datadir>/.lock`) é um bloqueio consultivo do sistema operacional e não abrange vários hosts. Nunca compartilhe um diretório de dados com leitura e gravação entre máquinas (NFS, Kubernetes `ReadWriteMany`): duas instâncias de zecd corromperiam o banco de dados da carteira. Use volumes `ReadWriteOnce` no Kubernetes.

---

## Lista de métodos RPC permitidos

Para implantações em que o vazamento de uma credencial seria catastrófico, zecd permite restringir a interface RPC a um subconjunto escolhido de métodos:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Qualquer método fora da lista retorna `-32601` (HTTP 404), indistinguível de um método inexistente, de modo que um servidor restrito não revela nada sobre o que desativou. Um emissor de faturas que apenas recebe pode desativar `sendtoaddress`, `sendmany` e `stop` para minimizar o raio de impacto de um cliente comprometido.

---

## Principais diferenças em relação ao RPC do Bitcoin Core

Desenvolvedores que estão migrando de ferramentas do Bitcoin ou do zcashd devem estar cientes destas divergências intencionais:

| Comportamento | Bitcoin Core | zecd |
|----------|-------------|------|
| Formato de endereço | `1...` / `bc1...` | `u1...` (Unified Address Orchard), não pode ser interpretado como endereço Bitcoin por clientes que analisam strings |
| Rótulos | Armazenamento completo de rótulos | Não implementado: `setlabel`, `listlabels` etc. retornam `-32601` |
| Taxas | Definidas pelo usuário; mercado de taxas | Apenas ZIP-317 determinístico; `settxfee`, `fee_rate`, `subtractfeefromamount` rejeitados com `-8` |
| Memorandos | Não suportados | `sendtoaddress` aceita memorando hexadecimal; o histórico tem os campos `memo` + `memoStr` |
| Confirmações para gastar | 1 | 3 (troco próprio) / 10 (terceiros), configurável via `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` em reorg | Retrocede até o fork | Retorna `-5` (Block not found) se o cursor for removido pela reorg; restabeleça a linha de base com uma chamada sem parâmetros |
| Destinatários duplicados em `sendmany` | Erro | O parser JSON junta os duplicados (o último prevalece) antes que zecd os veja; não liste o mesmo endereço duas vezes |
| Saldo durante a sincronização inicial | Bloqueia ou aquece | Fornece saldo parcial; condicione a automação a `GET /readyz` (retorna 503 até a sincronização completa e o esvaziamento da fila de aprimoramento) |
| `minconf 0` em `getbalance` | Saldo com 0 confirmações | Tratado como 1: uma note blindada nunca pode ser gasta sem ser minerada |

---

## Início rápido

**Pré-requisitos:** Zebra em execução local com `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Instale a partir do crates.io (0.4.3+):

```sh
cargo install zecd
```

Ou compile a partir do código-fonte:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Initialize a testnet wallet (generates a 24-word mnemonic and an account)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Start the daemon (syncs in background, serves JSON-RPC on port 18232)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**Interaja via curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Interaja via Python (usando uma biblioteca RPC de Bitcoin):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Send with a shielded memo
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**Restaure a partir da frase semente:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Portas padrão

| Rede | RPC do zecd | RPC do Zebra (backend) | Integridade |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## zecd vs. zcashd vs. Zaino

| | zcashd | Zaino | zecd |
|--|--------|-------|------|
| Função | Nó integral + carteira | Indexador (substitui lightwalletd) | Apenas servidor de carteira |
| Linguagem | C++ | Rust | Rust |
| Status | Descontinuado | Ativo | Ativo (v0.5.0-rc3, jul 2026) |
| Pool padrão | Transparente | N/A | Orchard (blindado) |
| Dialeto RPC | Específico do zcashd | gRPC (lightwalletd) | JSON-RPC do Bitcoin Core |
| Requer nó integral | Sim (próprio) | Zebra ou zcashd | Zebra |
| Recuperação sem estado | Não | N/A | Sim (apenas frase semente) |
| Memorandos blindados | Sim (`z_sendmany`) | N/A | Sim (interface RPC do Bitcoin) |
| Somente observação (UFVK) | Sim | Sim | Sim |
| Nativo da nuvem | Não | Parcial | Sim |
| Instalação | Compilação/binário | Compilação | `cargo install zecd` |

---

## Páginas relacionadas

- [Nó integral Zebra](Zebra_Full_Node.md): o nó integral ao qual zecd se conecta
- [Indexador Zaino](Zaino.md): abordagem alternativa de indexador (substitui lightwalletd)
- [Nó Zakura](Zakura_Node.md): outra implementação de nó integral (fork do Zebra)
- [Chaves de visualização](Viewing_Keys.md): como zecd varre a chain usando as chaves de visualização da conta
- [Carteiras](/using-zcash/wallets): visão geral do ecossistema de carteiras

## Recursos

- [zecd GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [Manual de operações do zecd](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash: biblioteca central de criptografia do Zcash](https://github.com/zcash/librustzcash)
- [ZIP-317: mecanismo de taxa de transferência proporcional](https://zips.z.cash/zip-0317)
- [ZIP-302: memorandos blindados](https://zips.z.cash/zip-0302)
- [Carteira Zodl (compatível com librustzcash)](https://github.com/zodl-inc/zodl-ios)
