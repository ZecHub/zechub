<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nó Zakura

> 🇧🇷 [Versão em Português](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura é uma implementação gratuita e open-source de nó completo para Zcash, criada para escalar. Derivado de [Zebra](Zebra_Full_Node.md) e desenvolvido através de uma colaboração entre o **Valar Group** e o **Project Tachyon**, o Zakura oferece sincronização dramaticamente mais rápida, poda nativa de blocos e uma camada de compatibilidade para ferramentas legadas de `zcashd`. A versão 1.0.0 foi lançada a 15 de julho de 2026.

---

## Resumo

- Zakura é um **nó completo Zcash compatível com o consenso** — uma alternativa ao Zebra e ao zcashd, derivada do Zebra.
- A sincronização da blockchain é aproximadamente **5× mais rápida do que no Zebra**; o arranque por snapshot conclui-se em **menos de 2 minutos**.
- A **poda nativa de blocos** permite aos operadores executar um nó completo com muito menos espaço em disco (~11 GB para um snapshot podado vs. 300 GB para um nó Zebra completo).
- Um **modo de compatibilidade RPC do zcashd** permite que wallets e integrações existentes funcionem sem modificações.
- Uma **camada experimental de transporte P2P** (desativada por predefinição) visa propagação de blocos em menos de 500 ms com gossip resistente a DoS.
- Compatível com **Ironwood (NU6.3)**, a atualização de rede Zcash ativada em meados de 2026.
- Liderado por **Sean Bowe** (cofundador da Zcash, Project Tachyon) e **Dev Ojha** (Valar Group).

---

## O que é o Zakura?

Zakura é um nó completo Zcash concebido de raiz para estar pronto para produção em escala. Embora partilhe compatibilidade de consenso com o Zebra — o que significa que valida e segue as mesmas regras do protocolo Zcash — o Zakura introduz melhorias significativas de engenharia destinadas a reduzir a barreira à execução de um nó completo Zcash.

O projeto é um esforço conjunto entre o **Project Tachyon** (liderado por Sean Bowe, um dos engenheiros criptográficos originais da Zcash) e o **Valar Group** (liderado por Dev Ojha). Em conjunto, concentram-se em melhorias de próxima geração ao protocolo Zcash, e o Zakura serve como o nó de referência para esse trabalho.

---

## Funcionalidades Principais

### Sincronização da Cadeia 5× Mais Rápida

O Zakura alcança uma sincronização da blockchain aproximadamente 5× mais rápida em comparação com o Zebra. Isto torna-o significativamente mais prático para operadores que precisam de iniciar um nó rapidamente ou recuperar de períodos de indisponibilidade.

### Arranque por Snapshot

O Zakura publica snapshots pré-construídos da cadeia que reduzem drasticamente o tempo de sincronização inicial:

| Método de Arranque | Tempo |
|-----------------|------|
| Snapshot de arquivo | ~37 minutos |
| Snapshot podado | **Menos de 2 minutos** |
| Zebra (sincronização completa) | ~20 horas |

Os snapshots podados têm aproximadamente **11 GB**, permitindo um arranque de nó **680× mais rápido** em comparação com a sincronização a partir do genesis.

### Poda Nativa de Blocos

O Zakura suporta poda configurável de blocos, permitindo aos operadores de nós definir quanta história da cadeia pretendem reter. Isto torna prático executar um nó completo em hardware com armazenamento limitado — útil para validadores, programadores e fornecedores de infraestrutura que não necessitam da cadeia histórica completa.

### Modo de Compatibilidade RPC do zcashd

O Zakura inclui um modo de compatibilidade que reproduz a interface JSON-RPC legada do `zcashd`. Wallets, exchanges e integrações existentes que dependem de RPCs do `zcashd` podem mudar para o Zakura sem exigir alterações de código.

### Camada Experimental de Transporte P2P

O Zakura inclui uma camada de transporte peer-to-peer de próxima geração, atualmente **desativada por predefinição**. Quando ativada, tem como objetivos:

- Propagação de blocos em menos de 500 ms no pior caso em toda a rede
- Agregação de mempool para retransmissão de transações mais eficiente
- Protocolo gossip resistente a DoS para melhorar a resiliência da rede

Esta camada representa uma antevisão de futuras melhorias ao nível da rede Zcash que estão a ser desenvolvidas no âmbito do Project Tachyon.

### Compatível com Ironwood (NU6.3)

O Zakura é totalmente compatível com a atualização de rede Ironwood (NU6.3), ativada na mainnet da Zcash em meados de 2026.

---

## Como o Zakura se Relaciona com Outros Nós Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Linguagem | C++ (derivado do Bitcoin) | Rust | Rust (derivado do Zebra) |
| Estado | Descontinuado | Ativo | Ativo (v1.0.0, jul 2026) |
| Velocidade de sincronização | Referência | ~1× | ~5× mais rápido |
| Poda de blocos | Não | Não | Sim |
| Compatibilidade RPC do zcashd | Nativa | Parcial | Sim (modo de compatibilidade) |
| Arranque por snapshot | Não | Não | Sim (<2 min) |
| P2P experimental | Não | Não | Sim (opt-in) |

---

## Como Começar

As opções de download, snapshots e a documentação de configuração estão disponíveis em:

- **Guia de download e configuração:** [zakura.com/download](https://zakura.com/download/)
- **Snapshots da cadeia:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Código-fonte:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Páginas Relacionadas

- [Nó Completo Zebra](Zebra_Full_Node.md) — o nó completo Zcash upstream de que o Zakura foi derivado
- [Indexer Zaino](Zaino.md) — um indexador baseado em Rust compatível com Zebra e Zakura
- [Nós Completos](Full_Nodes.md) — visão geral das opções de nós completos Zcash
- [Nós Lightwallet](Lightwallet_Nodes.md) — alternativas leves de cliente

## Recursos

- [Apresentação do Zakura — anúncio](https://zakura.com/announcements/introducing-zakura/)
- [GitHub do Zakura](https://github.com/zakura-core/zakura)
- [Website do Zakura](https://zakura.com/)
- [Zakura no X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
