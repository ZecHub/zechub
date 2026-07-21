<a href="https://github.com/zechub/zechub/edit/main/site/zechubglobal/zcashbrasil/zcashtech/zakura.md" target="_blank">
  <img src="https://img.shields.io/badge/Editar-blue" alt="Editar Página"/>
</a>

# Zakura Node

> 🇺🇸 [English version](/zcash-tech/zakura-node)

Zakura é uma implementação de full node Zcash livre, de código aberto e construída para escala. Derivada (fork) do [Zebra](Zebra_Full_Node.md) e desenvolvida em colaboração entre o **Valar Group** e o **Project Tachyon**, o Zakura entrega sincronização dramaticamente mais rápida, poda nativa de blocos e uma camada de compatibilidade para o `zcashd` legado. A versão 1.0.0 foi lançada em 15 de julho de 2026.

---

## TL;DR

- Zakura é um **full node Zcash compatível com o consenso** — uma alternativa ao Zebra e ao zcashd, derivado do Zebra.
- A sincronização da blockchain é aproximadamente **5× mais rápida que o Zebra**; o bootstrap por snapshot completa em **menos de 2 minutos**.
- A **poda nativa de blocos** permite que operadores rodem um full node com muito menos espaço em disco (~11 GB no snapshot podado vs. 300 GB do Zebra completo).
- Um **modo de compatibilidade com o RPC do zcashd** permite que carteiras e integrações existentes funcionem sem modificações.
- Uma **camada P2P experimental** (desativada por padrão) tem como alvo propagação de blocos em menos de 500ms com protocolo gossip resistente a DoS.
- Compatível com **Ironwood (NU6.3)**, a atualização de rede Zcash ativada em meados de 2026.
- Liderado por **Sean Bowe** (cofundador da Zcash, Project Tachyon) e **Dev Ojha** (Valar Group).

---

## O que é o Zakura?

Zakura é um full node Zcash projetado para ser adequado para produção em escala. Embora compartilhe compatibilidade de consenso com o Zebra — ou seja, valida e segue as mesmas regras de protocolo Zcash — o Zakura introduz melhorias significativas de engenharia com o objetivo de reduzir a barreira para rodar um full node Zcash.

O projeto é uma iniciativa conjunta entre o **Project Tachyon** (liderado por Sean Bowe, um dos engenheiros criptográficos originais da Zcash) e o **Valar Group** (liderado por Dev Ojha). Juntos, focam em melhorias de protocolo Zcash de próxima geração, e o Zakura serve como o nó de referência para esse trabalho.

---

## Recursos Principais

### Sincronização 5× Mais Rápida

O Zakura alcança aproximadamente 5× mais velocidade de sincronização da blockchain em comparação ao Zebra. Isso o torna significativamente mais prático para operadores que precisam iniciar um nó rapidamente ou se recuperar de tempo de inatividade.

### Bootstrap por Snapshot

O Zakura publica snapshots pré-construídos da cadeia que reduzem drasticamente o tempo de sincronização inicial:

| Método de Bootstrap | Tempo |
|--------------------|-------|
| Snapshot arquivo completo | ~37 minutos |
| Snapshot podado | **Menos de 2 minutos** |
| Zebra (sync completo) | ~20 horas |

Os snapshots podados têm aproximadamente **11 GB**, permitindo um bootstrap de nó **680× mais rápido** em comparação à sincronização desde o bloco genesis.

### Poda Nativa de Blocos

O Zakura suporta poda de blocos configurável, permitindo que operadores definam quanto do histórico da cadeia manter. Isso torna prático rodar um full node em hardware com armazenamento limitado — útil para validadores, desenvolvedores e provedores de infraestrutura que não precisam do histórico completo da cadeia.

### Modo de Compatibilidade com RPC do zcashd

O Zakura inclui um modo de compatibilidade que reproduz a interface JSON-RPC legada do `zcashd`. Carteiras, exchanges e integrações existentes que dependem dos RPCs do `zcashd` podem migrar para o Zakura sem necessidade de alterações no código.

### Camada P2P Experimental

O Zakura vem com uma camada de transporte peer-to-peer de próxima geração, atualmente **desativada por padrão**. Quando ativada, tem como objetivos:

- Propagação de blocos com latência máxima abaixo de 500ms na rede
- Agregação de mempool para retransmissão de transações mais eficiente
- Protocolo gossip resistente a DoS para melhorar a resiliência da rede

Esta camada representa uma prévia das melhorias futuras ao nível de rede Zcash sendo desenvolvidas no âmbito do Project Tachyon.

### Compatível com Ironwood (NU6.3)

O Zakura é totalmente compatível com a atualização de rede Ironwood (NU6.3), ativada na mainnet Zcash em meados de 2026.

---

## Como o Zakura se Compara a Outros Nós Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Linguagem | C++ (fork do Bitcoin) | Rust | Rust (fork do Zebra) |
| Status | Descontinuado | Ativo | Ativo (v1.0.0, jul 2026) |
| Velocidade de sync | Base | ~1× | ~5× mais rápido |
| Poda de blocos | Não | Não | Sim |
| Compatibilidade RPC zcashd | Nativa | Parcial | Sim (modo compat) |
| Bootstrap por snapshot | Não | Não | Sim (<2 min) |
| P2P experimental | Não | Não | Sim (opt-in) |

---

## Como Começar

Opções de download, snapshots e documentação de configuração estão disponíveis em:

- **Guia de download e configuração:** [zakura.com/download](https://zakura.com/download/)
- **Snapshots da cadeia:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Código fonte:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Páginas Relacionadas

- [Zebra Full Node](/zcash-tech/zebra-full-node) — o nó Zcash do qual o Zakura foi derivado
- [Zaino Indexer](/zcash-tech/zaino) — indexador em Rust compatível com Zebra e Zakura
- [Full Nodes](/zcash-tech/full-nodes) — visão geral das opções de full node Zcash
- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — alternativas de clientes leves

## Recursos

- [Apresentando o Zakura — anúncio](https://zakura.com/announcements/introducing-zakura/)
- [Zakura no GitHub](https://github.com/zakura-core/zakura)
- [Site oficial do Zakura](https://zakura.com/)
- [Zakura no X/Twitter](https://x.com/ZakuraZcash)
