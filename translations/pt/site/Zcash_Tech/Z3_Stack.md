<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Stack Z3

A **Stack Z3** é a plataforma de nó empacotada da Zcash Foundation: **Zebra** (nó completo) + **Zallet** (wallet de nó completo), com um indexador **Zaino** opcional. É a substituição prevista para um processo `zcashd` autónomo, que agrupava consenso e uma wallet num único binário e chegou ao fim de vida em 18 de julho de 2026.

A implementação de referência é o projeto Docker Compose em [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## Resumo

* Z3 **não é um novo cliente de consenso**. É a forma de executar a stack pós-`zcashd` em conjunto: Zebra valida a cadeia, Zallet guarda as chaves e disponibiliza RPC de wallet, e Zaino (opcional) utiliza o protocolo gRPC lightwalletd.
* `zcashd` agrupava nó + wallet. Z3 **separa essas funções**. Exchanges, pools de mineração e outros operadores de wallets de nós completos migram para esta combinação, em vez de apenas para Zebra.
* Podem ser executados três projetos Compose isolados num único host: **mainnet**, **testnet** e **regtest**.
* A primeira sincronização da mainnet demora cerca de **24–72 horas** e ocupa aproximadamente **300 GB**. A regtest fica operacional em segundos e é o local certo para aprender a stack.
* Zallet incorpora as bibliotecas de indexador da Zaino e comunica com Zebra através de JSON-RPC. O serviço Zaino autónomo só é necessário se pretender um endpoint compatível com lightwalletd para wallets externas.
* Zallet está em **beta**. Alterações incompatíveis podem exigir a eliminação e recriação da wallet. Não o trate como software de custódia concluído para valores elevados.

---

## Porque existe o Z3

Durante a maior parte da vida da Zcash, `zcashd` era simultaneamente o nó completo de referência e a única wallet de nó completo em produção. Esse design foi aquilo com que exchanges, pools e entidades de custódia se integraram.

`zcashd` foi descontinuado. O consenso passou para [Zebra](/zcash-tech/zebra-full-node) (e agora também para [Zakura](/zcash-tech/zakura-node)). A wallet incorporada passou para [Zallet](https://github.com/zcash/zallet). O serviço de wallets leves está a migrar de [lightwalletd](/zcash-tech/lightwallet-nodes) para [Zaino](/zcash-tech/zaino).

Estas três componentes são repositórios separados, têm ciclos de lançamento distintos e configurações separadas. Z3 é a cola: imagens fixadas, verificações de estado que mantêm a wallet inativa até o nó estar sincronizado, portas e volumes por rede, e um percurso documentado para operadores.

O nome é uma abreviatura informal do ecossistema — Zebra, Zaino, Zallet — embora o ficheiro Compose predefinido só inicie Zebra e Zallet. Zaino é um perfil Compose, não um terceiro processo obrigatório.

---

## Arquitetura

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| Componente | Função no Z3 | Obrigatório? |
| --- | --- | --- |
| **Zebra** | Sincroniza e valida a cadeia, gossip, JSON-RPC, endpoint de estado | Sim |
| **Zallet** | Wallet de nó completo. Incorpora bibliotecas Zaino. Liga-se diretamente ao JSON-RPC de Zebra. **Não** chama o contentor Zaino autónomo | Sim |
| **Zaino** | Indexador autónomo. gRPC compatível com lightwalletd para clientes leves externos, além de um proxy JSON-RPC para exploradores e faucets | Não — `--profile indexer` |

Z3 fixa as versões das imagens em `docker-compose.yml`. Substitua-as com `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` ou `Z3_ZALLET_IMAGE` se precisar de uma tag diferente.

---

## Como isto difere de zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Linguagem | C++ (fork de Bitcoin) | Serviços Rust, orquestrados com Docker Compose |
| Modelo de processo | Um binário: nó + wallet | Contentores de nó e wallet separados |
| Consenso | Descontinuado (fim de vida em 18 de julho de 2026) | Zebra (ou outro nó compatível) |
| Wallet | `wallet.dat` integrada | Zallet, diretório de dados cifrado com age |
| Clientes leves | Normalmente um lightwalletd separado | Perfil Zaino opcional |
| Configuração | `zcash.conf` | Ficheiros por rede em `config/<network>/`, além de ficheiros de ambiente Compose |
| Redes num único host | Conflitos de portas problemáticos | Suporte nativo: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Se ainda tiver uma wallet `zcashd`, utilize o guia de migração da ZecHub [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) e o comando `migrate-zcashd-wallet` da Zallet, em vez de copiar `wallet.dat` para o volume Z3.

---

## Redes

Z3 consiste em três projetos Compose independentes. Não partilham portas nem volumes.

| Rede | Nome do projeto | Utilize-a para | Primeira sincronização | Fundos reais |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Produção | 24–72 horas | Sim |
| **testnet** | `z3-testnet` | Ambiente de preparação na rede pública de teste | 2–12 horas | Não (ZEC de teste) |
| **regtest** | `z3-regtest` | Prática local: blocos instantâneos, sem pares | Segundos | Não |

Os novos operadores devem começar na **regtest**, confirmar os fluxos de RPC e wallet e, depois, avançar para testnet ou mainnet.

---

## Portas predefinidas do host

As três redes destinam-se a coexistir na mesma máquina. Os valores abaixo são os predefinidos publicados; todos podem ser substituídos através da variável de ambiente `Z3_*` correspondente. A matriz canónica é [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Serviço | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC de Zebra | 8232 | 18232 | 29232 |
| P2P de Zebra | 8233 | 18233 | (não publicado) |
| Estado de Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC de Zaino (perfil de indexador) | 8137 | 18137 | 28137 |
| JSON-RPC de Zaino (perfil de indexador) | 8237 | 18237 | 28237 |
| RPC de Zallet | 28232 | 40232 | 50232 |

Dentro da rede Compose, os serviços são resolvidos pelo nome (`zebra`, `zaino`, `zallet`).

---

## Dados e cópias de segurança

| Volume | O que contém | Fazer cópia de segurança? |
| --- | --- | --- |
| `z3-<network>-chain` | Estado da cadeia de Zebra (~300 GB na mainnet) | Opcional — pode ser sincronizado novamente |
| `z3-<network>-zallet` | Base de dados cifrada da wallet **e** a identidade age que a desbloqueia | **Sim — este é o único volume que tem obrigatoriamente de ter cópia de segurança** |
| `z3-<network>-zaino` | Estado do indexador (apenas com o perfil de indexador) | Opcional — pode ser reconstruído |
| `z3-<network>-cookie` | Cookie RPC de Zebra | Não — é regenerado |

Para colocar o estado da cadeia noutro disco antes do primeiro arranque:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` para a stack e preserva os volumes. Adicionar `-v` elimina-os e força uma sincronização completa. Inclua `--profile "*"` para que os serviços condicionados por perfil (indexador, monitorização) sejam efetivamente encerrados.

---

## Primeiros passos

Pré-requisitos: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` é necessário apenas para regtest.

### Regtest (a forma mais rápida de ver a stack)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Consulte [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) para comandos de teste.

### Mainnet (arranque em duas fases)

Zebra tem de terminar a sincronização antes de Zallet ser útil. Iniciar Zallet cedo faz com que entre num ciclo de reinicialização até `/ready` ser verdadeiro.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

A testnet segue o mesmo fluxo com `.env.testnet` e `./scripts/check-zebra-readiness.sh 18080`.

As alterações em `config/<network>/` permanecem locais e sobrevivem a `git pull`.

### Perfis opcionais

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

As portas predefinidas do Grafana são 3000 (mainnet), 13000 (testnet) e 23000 (regtest).

---

## Notas para operadores

* **Imagens fixadas.** Z3 não muda silenciosamente para `:latest`. Atualize uma fixação numa alteração revista ou defina `Z3_<SERVICE>_IMAGE`.
* **Contentores não-root.** As capacidades Linux são removidas. As verificações de estado impedem a wallet de iniciar até Zebra estar pronto. A política de reinicialização está ativa por predefinição.
* **Registos.** Z3 não fixa um controlador de registos. Defina limites de tamanho na configuração do daemon Docker, ou os registos crescerão sem limite num nó ativo 24/7.
* **P2P.** A mainnet e a testnet publicam a porta P2P de Zebra. Atrás de NAT, defina `ZEBRA_NETWORK__EXTERNAL_ADDR` para o endereço que os pares devem marcar. A regtest não tem pares.
* **Zaino em ARM.** A imagem upstream Zaino é apenas `linux/amd64`. Em Apple Silicon, é executada sob emulação, salvo se a compilar a partir do código-fonte. Zebra e Zallet são multi-arquitetura.
* **Hosts partilhados.** Não existem limites de CPU nem de memória definidos por predefinição. Adicione `deploy.resources.limits` num ficheiro de substituição se a máquina não for dedicada ao nó.

Lista de verificação semelhante a produção e FAQ: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Quem deve executar Z3

**Adequado para**

* Exchanges, entidades de custódia e pools de mineração que utilizavam `zcashd` como nó e wallet
* Operadores que pretendem um RPC de wallet de nó completo suportado contra um Zebra sincronizado
* Programadores que precisam de mainnet, testnet e regtest lado a lado
* Qualquer pessoa que implemente um endpoint privado compatível com lightwalletd através do perfil Zaino

**Normalmente, a ferramenta errada**

* Utilizadores finais que apenas precisam de enviar e receber ZEC — utilizem uma wallet leve como ZODL / Zashi, Zingo ou YWallet
* Pessoas que apenas querem validar a cadeia — executem apenas Zebra (ou Zakura)
* Pessoas que apenas querem servir blocos compactos — executem Zebra + Zaino, ou Zebra + lightwalletd, sem Zallet

---

## Páginas relacionadas

* [Zebra Nó Completo](/zcash-tech/zebra-full-node) — nó de consenso que Z3 encapsula
* [Zaino](/zcash-tech/zaino) — perfil de indexador opcional
* [Nós Completos](/zcash-tech/full-nodes) — Zebra, Zakura e o zcashd descontinuado
* [Nós lightwallet](/zcash-tech/lightwallet-nodes) — com o que os clientes leves comunicam
* [Zakura Nó](/zcash-tech/zakura-node) — nó completo alternativo; não é o que Z3 disponibiliza atualmente
* [Guia de Migração: zcashd para Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Recursos para Programadores](/start-here/developer-resources)

---

## Recursos

* [Repositório Z3](https://github.com/ZcashFoundation/z3)
* [Contrato Z3 (portas, volumes, nomes de projetos)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [O Livro de Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [O Livro de Zallet](https://zcash.github.io/zallet/)
* [Zcash Fórum da Comunidade — atualizações Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Lançador Z3](https://github.com/Jubrilabdulazeez/z3-launcher) — plano de controlo comunitário sobre a stack Compose oficial (Hackathon ZecHub)
