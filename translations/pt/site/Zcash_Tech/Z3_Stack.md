<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack

O **Z3 Stack** é a plataforma de nó empacotada da Zcash Foundation: **Zebra** (nó integral) + **Zallet** (carteira de nó integral), com um indexador **Zaino** opcional. Ele é o substituto previsto para um processo `zcashd` independente, que reunia consenso e uma carteira em um único binário e chegou ao fim da vida útil em 18 de julho de 2026.

A implementação de referência é o projeto Docker Compose em [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## Resumo

* O Z3 **não é um novo cliente de consenso**. Ele é a forma de executar em conjunto o stack pós-`zcashd`: o Zebra valida a chain, a Zallet guarda as chaves e fornece o RPC da carteira, e o Zaino (opcional) fala o protocolo gRPC do lightwalletd.
* O `zcashd` reunia nó + carteira. O Z3 **separa essas funções**. Corretoras, pools de mineração e outros operadores de carteiras de nó integral migram para essa combinação, e não apenas para o Zebra.
* Três projetos Compose isolados podem ser executados em um único host: **mainnet**, **testnet** e **regtest**.
* A primeira sincronização da mainnet leva cerca de **24–72 horas** e ocupa cerca de **300 GB**. A regtest sobe em segundos e é o lugar certo para aprender o stack.
* A Zallet incorpora as bibliotecas de indexação do Zaino e se comunica com o Zebra via JSON-RPC. O serviço Zaino independente só é necessário se você quiser um endpoint compatível com o lightwalletd para carteiras externas.
* A Zallet está em **beta**. Mudanças incompatíveis podem exigir a exclusão e a recriação da carteira. Não a trate como um software de custódia finalizado para grandes quantias.

---

## Por que o Z3 existe

Durante a maior parte da vida do Zcash, o `zcashd` foi ao mesmo tempo o nó integral de referência e a única carteira de nó integral em produção. Foi com esse design que corretoras, pools e custodiantes fizeram suas integrações.

O `zcashd` foi aposentado. O consenso passou para o [Zebra](/zcash-tech/zebra-full-node) (e agora também para o [Zakura](/zcash-tech/zakura-node)). A carteira embutida passou para a [Zallet](https://github.com/zcash/zallet). O serviço para light wallets está passando do [lightwalletd](/zcash-tech/lightwallet-nodes) para o [Zaino](/zcash-tech/zaino).

Essas três peças são repositórios separados, ciclos de lançamento separados e configurações separadas. O Z3 é o que as une: imagens fixadas, verificações de saúde que mantêm a carteira desligada até o nó estar sincronizado, portas e volumes por rede, e um caminho documentado para operadores.

O nome é uma abreviação informal do ecossistema — Zebra, Zaino, Zallet —, embora o arquivo Compose padrão inicie apenas o Zebra e a Zallet. O Zaino é um perfil do Compose, não um terceiro processo obrigatório.

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
| **Zebra** | Sincroniza e valida a chain, gossip, JSON-RPC, endpoint de saúde | Sim |
| **Zallet** | Carteira de nó integral. Incorpora bibliotecas do Zaino. Conecta-se diretamente ao JSON-RPC do Zebra. **Não** chama o contêiner Zaino independente | Sim |
| **Zaino** | Indexador independente. gRPC compatível com o lightwalletd para light clients externos, além de um proxy JSON-RPC para exploradores e faucets | Não — `--profile indexer` |

O Z3 fixa as versões das imagens em `docker-compose.yml`. Substitua com `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` ou `Z3_ZALLET_IMAGE` se precisar de outra tag.

---

## Diferenças em relação ao zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Linguagem | C++ (fork do Bitcoin) | Serviços em Rust, orquestrados com Docker Compose |
| Modelo de processo | Um binário: nó + carteira | Contêineres separados para nó e carteira |
| Consenso | Aposentado (EOS em 18 de julho de 2026) | Zebra (ou outro nó compatível) |
| Carteira | `wallet.dat` embutida | Zallet, datadir criptografado com age |
| Light clients | Normalmente um lightwalletd separado | Perfil Zaino opcional |
| Configuração | `zcash.conf` | Arquivos por rede em `config/<network>/` mais arquivos env do Compose |
| Redes em um único host | Conflitos de porta trabalhosos | Suporte nativo: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Se você ainda tem uma carteira `zcashd`, use o [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet) da ZecHub e o comando `migrate-zcashd-wallet` da Zallet, em vez de copiar o `wallet.dat` para o volume do Z3.

---

## Redes

O Z3 é composto por três projetos Compose independentes. Eles não compartilham portas nem volumes.

| Rede | Nome do projeto | Use para | Primeira sincronização | Fundos reais |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Produção | 24–72 horas | Sim |
| **testnet** | `z3-testnet` | Homologação na rede de testes pública | 2–12 horas | Não (ZEC de teste) |
| **regtest** | `z3-regtest` | Prática local: blocos instantâneos, sem peers | Segundos | Não |

Novos operadores devem começar pela **regtest**, confirmar os fluxos de RPC e da carteira e depois passar para a testnet ou a mainnet.

---

## Portas padrão do host

As três redes foram pensadas para coexistir em uma única máquina. Os valores abaixo são os padrões publicados; cada um pode ser substituído pela variável de ambiente `Z3_*` correspondente. A matriz canônica é [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Serviço | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC do Zebra | 8232 | 18232 | 29232 |
| P2P do Zebra | 8233 | 18233 | (não publicada) |
| Saúde do Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC do Zaino (perfil indexer) | 8137 | 18137 | 28137 |
| JSON-RPC do Zaino (perfil indexer) | 8237 | 18237 | 28237 |
| RPC da Zallet | 28232 | 40232 | 50232 |

Dentro da rede do Compose, os serviços são resolvidos pelo nome (`zebra`, `zaino`, `zallet`).

---

## Dados e backups

| Volume | O que contém | Fazer backup? |
| --- | --- | --- |
| `z3-<network>-chain` | Estado da chain do Zebra (~300 GB na mainnet) | Opcional — pode ser ressincronizado |
| `z3-<network>-zallet` | Banco de dados criptografado da carteira **e** a identidade age que o desbloqueia | **Sim — este é o único volume que precisa de backup** |
| `z3-<network>-zaino` | Estado do indexador (apenas com o perfil indexer) | Opcional — pode ser reconstruído |
| `z3-<network>-cookie` | Cookie RPC do Zebra | Não — é regenerado |

Para colocar o estado da chain em outro disco antes da primeira inicialização:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

O `docker compose --env-file .env.<network> --profile "*" down` para o stack e mantém os volumes. Adicionar `-v` os exclui e força uma ressincronização completa. Inclua `--profile "*"` para que os serviços condicionados a perfis (indexador, monitoramento) sejam realmente desmontados.

---

## Primeiros passos

Pré-requisitos: Docker Engine, Docker Compose v2.24.4+, Git. O `openssl` é necessário apenas para a regtest.

### Regtest (a forma mais rápida de ver o stack)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Consulte [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) para ver os comandos de teste.

### Mainnet (inicialização em duas fases)

O Zebra precisa terminar a sincronização antes que a Zallet seja útil. Iniciar a Zallet antes da hora faz com que ela entre em loop de reinicialização até que `/ready` seja verdadeiro.

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

As edições em `config/<network>/` permanecem locais e sobrevivem a um `git pull`.

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

* **Imagens fixadas.** O Z3 não passa silenciosamente para `:latest`. Atualize uma versão fixada em uma alteração revisada ou defina `Z3_<SERVICE>_IMAGE`.
* **Contêineres sem root.** As capacidades Linux são removidas. As verificações de saúde seguram a carteira até que o Zebra esteja pronto. A política de reinicialização vem ativada por padrão.
* **Logs.** O Z3 não fixa um driver de logging. Defina limites de tamanho na configuração do daemon do Docker, ou os logs crescerão sem limite em um nó que roda 24 horas por dia.
* **P2P.** A mainnet e a testnet publicam a porta P2P do Zebra. Atrás de NAT, defina `ZEBRA_NETWORK__EXTERNAL_ADDR` com o endereço que os peers devem discar. A regtest não tem peers.
* **Zaino em ARM.** A imagem upstream do Zaino é apenas `linux/amd64`. No Apple Silicon, ela roda sob emulação, a menos que você compile a partir do código-fonte. O Zebra e a Zallet são multiarquitetura.
* **Hosts compartilhados.** Nenhum limite de CPU ou memória é definido por padrão. Adicione `deploy.resources.limits` em um arquivo de override se a máquina não for dedicada ao nó.

Checklist e FAQ orientados para produção: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Quem deve executar o Z3

**Indicado para**

* Corretoras, custodiantes e pools de mineração que usavam o `zcashd` como nó mais carteira
* Operadores que querem um RPC de carteira de nó integral com suporte, conectado a um Zebra sincronizado
* Desenvolvedores que precisam da mainnet, da testnet e da regtest lado a lado
* Qualquer pessoa que queira montar um endpoint privado compatível com o lightwalletd por meio do perfil Zaino

**Normalmente a ferramenta errada**

* Usuários finais que só precisam enviar e receber ZEC — use uma light wallet como ZODL / Zashi, Zingo ou YWallet
* Pessoas que só querem validar a chain — execute apenas o Zebra (ou o Zakura)
* Pessoas que só querem servir blocos compactos — execute Zebra + Zaino, ou Zebra + lightwalletd, sem a Zallet

---

## Páginas relacionadas

* [Nó integral Zebra](/zcash-tech/zebra-full-node) — o nó de consenso que o Z3 encapsula
* [Zaino](/zcash-tech/zaino) — perfil de indexador opcional
* [Nós integrais](/zcash-tech/full-nodes) — Zebra, Zakura e o aposentado zcashd
* [Nós para light wallets](/zcash-tech/lightwallet-nodes) — com o que os light clients se comunicam
* [Nó Zakura](/zcash-tech/zakura-node) — nó integral alternativo; não é o que o Z3 distribui hoje
* [Guia de migração: do zcashd para Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Recursos para desenvolvedores](/start-here/developer-resources)

---

## Recursos

* [Repositório do Z3](https://github.com/ZcashFoundation/z3)
* [Contrato do Z3 (portas, volumes, nomes de projeto)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [O livro do Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [O livro do Zallet](https://zcash.github.io/zallet/)
* [Fórum da comunidade Zcash — atualizações do Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — painel de controle comunitário sobre o stack Compose oficial (Hackathon ZecHub)
