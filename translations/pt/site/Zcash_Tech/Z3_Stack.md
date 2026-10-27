<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Stack Z3

A **Stack Z3** é a plataforma empacotada de nó da Zcash Foundation: **Zebra** (nó integral) + **Zallet** (carteira de nó integral), com um indexador **Zaino** opcional. É a substituição prevista para um processo `zcashd` autônomo, que agrupava consenso e uma carteira em um único binário e chegou ao fim de vida em 18 de julho de 2026.

A implementação de referência é o projeto Docker Compose em [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## Resumo

* Z3 **não é um novo cliente de consenso**. É a forma de executar a stack pós-`zcashd` em conjunto: Zebra valida a chain, Zallet guarda as chaves e disponibiliza RPC de carteira, e Zaino (opcional) utiliza o protocolo gRPC lightwalletd.
* `zcashd` agrupava nó + carteira. Z3 **separa essas funções**. Corretoras, pools de mineração e outros operadores de carteiras de nós integrais migram para esta combinação, em vez de apenas para Zebra.
* É possível executar três projetos Compose isolados em um único host: **mainnet**, **testnet** e **regtest**.
* A primeira sincronização da mainnet demora cerca de **24–72 horas** e ocupa aproximadamente **300 GB**. A regtest fica operacional em segundos e é o lugar certo para aprender sobre a stack.
* Zallet incorpora as bibliotecas de indexador da Zaino e se comunica com Zebra por meio de JSON-RPC. O serviço Zaino autônomo só é necessário se você quiser um endpoint compatível com lightwalletd para carteiras externas.
* Zallet está em **beta**. Alterações incompatíveis podem exigir a exclusão e recriação da carteira. Não a trate como software de custódia concluído para valores elevados.

---

## Por que o Z3 existe

Durante a maior parte da vida do Zcash, `zcashd` era simultaneamente o nó integral de referência e a única carteira de nó integral em produção. Esse design foi aquele com que corretoras, pools e entidades de custódia se integraram.

`zcashd` foi descontinuado. O consenso passou para [Zebra](/zcash-tech/zebra-full-node) (e agora também para [Zakura](/zcash-tech/zakura-node)). A carteira incorporada passou para [Zallet](https://github.com/zcash/zallet). O serviço de carteiras leves está migrando de [lightwalletd](/zcash-tech/lightwallet-nodes) para [Zaino](/zcash-tech/zaino).

Estes três componentes são repositórios separados, têm ciclos de lançamento distintos e configurações separadas. Z3 é a cola: imagens fixadas, verificações de estado que mantêm a carteira inativa até o nó estar sincronizado, portas e volumes por rede, e um caminho documentado para operadores.

O nome é uma abreviação informal do ecossistema — Zebra, Zaino, Zallet — embora o arquivo Compose padrão só inicie Zebra e Zallet. Zaino é um perfil Compose, não um terceiro processo obrigatório.

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
| **Zebra** | Sincroniza e valida a chain, gossip, JSON-RPC, endpoint de estado | Sim |
| **Zallet** | Carteira de nó integral. Incorpora bibliotecas Zaino. Conecta-se diretamente ao JSON-RPC de Zebra. **Não** chama o contêiner Zaino autônomo | Sim |
| **Zaino** | Indexador autônomo. gRPC compatível com lightwalletd para light clients externos, além de um proxy JSON-RPC para exploradores e faucets | Não — `--profile indexer` |

Z3 fixa as versões das imagens em `docker-compose.yml`. Substitua-as com `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` ou `Z3_ZALLET_IMAGE` se precisar de uma tag diferente.

---

## Como isso difere do zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Linguagem | C++ (fork de Bitcoin) | Serviços Rust, orquestrados com Docker Compose |
| Modelo de processo | Um binário: nó + carteira | Contêineres de nó e carteira separados |
| Consenso | Descontinuado (fim de vida em 18 de julho de 2026) | Zebra (ou outro nó compatível) |
| Carteira | `wallet.dat` integrada | Zallet, diretório de dados criptografado com age |
| Clientes leves | Normalmente um lightwalletd separado | Perfil Zaino opcional |
| Configuração | `zcash.conf` | Arquivos por rede em `config/<network>/`, além de arquivos de ambiente Compose |
| Redes num único host | Conflitos de portas problemáticos | Suporte nativo: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Se você ainda tiver uma carteira `zcashd`, use o guia de migração da ZecHub [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet) e o comando `migrate-zcashd-wallet` da Zallet, em vez de copiar `wallet.dat` para o volume Z3.

---

## Redes

Z3 consiste em três projetos Compose independentes. Não compartilham portas nem volumes.

| Rede | Nome do projeto | Use-a para | Primeira sincronização | Fundos reais |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Produção | 24–72 horas | Sim |
| **testnet** | `z3-testnet` | Ambiente de preparação na rede pública de teste | 2–12 horas | Não (ZEC de teste) |
| **regtest** | `z3-regtest` | Prática local: blocos instantâneos, sem pares | Segundos | Não |

Novos operadores devem começar na **regtest**, confirmar os fluxos de RPC e da carteira e, depois, avançar para testnet ou mainnet.

---

## Portas padrão do host

As três redes destinam-se a coexistir na mesma máquina. Os valores abaixo são os padrões publicados; todos podem ser substituídos por meio da variável de ambiente `Z3_*` correspondente. A matriz canônica é [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

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

## Dados e backups

| Volume | O que contém | Fazer backup? |
| --- | --- | --- |
| `z3-<network>-chain` | Estado da chain de Zebra (~300 GB na mainnet) | Opcional — pode ser sincronizado novamente |
| `z3-<network>-zallet` | Banco de dados criptografado da carteira **e** a identidade age que a desbloqueia | **Sim — este é o único volume do qual você obrigatoriamente precisa fazer backup** |
| `z3-<network>-zaino` | Estado do indexador (apenas com o perfil de indexador) | Opcional — pode ser reconstruído |
| `z3-<network>-cookie` | Cookie RPC de Zebra | Não — é regenerado |

Para colocar o estado da chain em outro disco antes da primeira inicialização:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` desliga a stack e preserva os volumes. Adicionar `-v` os exclui e força uma sincronização completa. Inclua `--profile "*"` para que os serviços condicionados por perfil (indexador, monitoramento) sejam efetivamente encerrados.

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

### Mainnet (inicialização em duas fases)

Zebra precisa terminar a sincronização antes de Zallet ser útil. Iniciar Zallet cedo faz com que ele entre em um ciclo de reinicialização até `/ready` ser verdadeiro.

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

As portas padrão do Grafana são 3000 (mainnet), 13000 (testnet) e 23000 (regtest).

---

## Notas para operadores

* **Imagens fixadas.** Z3 não muda silenciosamente para `:latest`. Atualize uma fixação em uma alteração revisada ou defina `Z3_<SERVICE>_IMAGE`.
* **Contêineres não root.** As capacidades Linux são removidas. As verificações de estado impedem a carteira de iniciar até Zebra estar pronto. A política de reinicialização está ativa por padrão.
* **Registros.** Z3 não fixa um controlador de registros. Defina limites de tamanho na configuração do daemon Docker, ou os registros crescerão sem limite em um nó ativo 24/7.
* **P2P.** A mainnet e a testnet publicam a porta P2P de Zebra. Atrás de NAT, defina `ZEBRA_NETWORK__EXTERNAL_ADDR` para o endereço que os pares devem discar. A regtest não tem pares.
* **Zaino em ARM.** A imagem upstream Zaino é apenas `linux/amd64`. Em Apple Silicon, ela é executada sob emulação, a menos que você a compile a partir do código-fonte. Zebra e Zallet são multi-arquitetura.
* **Hosts compartilhados.** Não há limites de CPU nem de memória definidos por padrão. Adicione `deploy.resources.limits` em um arquivo de substituição se a máquina não for dedicada ao nó.

Lista de verificação semelhante à produção e FAQ: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Quem deve executar Z3

**Adequado para**

* Corretoras, entidades de custódia e pools de mineração que utilizavam `zcashd` como nó e carteira
* Operadores que querem um RPC de carteira de nó integral suportado em relação a um Zebra sincronizado
* Desenvolvedores que precisam de mainnet, testnet e regtest lado a lado
* Qualquer pessoa que implemente um endpoint privado compatível com lightwalletd por meio do perfil Zaino

**Normalmente, a ferramenta errada**

* Usuários finais que apenas precisam enviar e receber ZEC — use uma carteira leve como ZODL / Zashi, Zingo ou YWallet
* Pessoas que apenas querem validar a chain — execute apenas Zebra (ou Zakura)
* Pessoas que apenas querem servir blocos compactos — execute Zebra + Zaino, ou Zebra + lightwalletd, sem Zallet

---

## Páginas relacionadas

* [Nó integral Zebra](/zcash-tech/zebra-full-node) — nó de consenso que Z3 encapsula
* [Zaino](/zcash-tech/zaino) — perfil de indexador opcional
* [Nós integrais](/zcash-tech/full-nodes) — Zebra, Zakura e o zcashd descontinuado
* [Nós lightwallet](/zcash-tech/lightwallet-nodes) — com os quais os light clients se comunicam
* [Nó Zakura](/zcash-tech/zakura-node) — nó integral alternativo; não é o que Z3 disponibiliza atualmente
* [Guia de migração: zcashd para Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Recursos para desenvolvedores](/start-here/developer-resources)

---

## Recursos

* [Repositório Z3](https://github.com/ZcashFoundation/z3)
* [Contrato Z3 (portas, volumes, nomes de projetos)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [O livro do Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [O livro do Zallet](https://zcash.github.io/zallet/)
* [Fórum da comunidade Zcash — atualizações do Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Iniciador Z3](https://github.com/Jubrilabdulazeez/z3-launcher) — plano de controle comunitário sobre a stack Compose oficial (Hackathon ZecHub)
