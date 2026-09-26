<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Zakura Nó

> 🇧🇷 [Versão em Português](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura é uma implementação gratuita e open-source de nó completo para Zcash, criada para escalar. Derivada de [Zebra](Zebra_Full_Node.md) e desenvolvida através de uma colaboração entre o **Valar Group** e o **Project Tachyon**, Zakura oferece sincronização drasticamente mais rápida, poda nativa de blocos e uma camada de compatibilidade para ferramentas legadas de `zcashd`. A versão 1.0.0 foi lançada a 15 de julho de 2026.

---

## Resumo

- Zakura é um **nó completo de Zcash compatível com o consenso** — uma alternativa a Zebra e zcashd, derivada de Zebra.
- A sincronização da blockchain é aproximadamente **5× mais rápida do que Zebra**; o arranque através de snapshot é concluído em **menos de 2 minutos**.
- A **poda nativa de blocos** permite aos operadores executar um nó completo com muito menos espaço em disco (~11 GB para um snapshot podado, face a 300 GB para um nó completo de Zebra).
- Um **modo de compatibilidade RPC de zcashd** permite que wallets e integrações existentes funcionem sem modificações.
- Uma **camada experimental de transporte P2P** (desativada por predefinição) visa a propagação de blocos em menos de 500 ms, com gossip resistente a DoS.
- Compatível com **Ironwood (NU6.3)**, a atualização de rede de Zcash ativada em meados de 2026.
- **Zakura Common** (v1.3.0, agosto de 2026) acelera a criptografia que as wallets utilizam para criar transações privadas: de mais de 3 segundos para menos de 200 ms em muitos casos, segundo os benchmarks de Zakura.
- Liderado por **Sean Bowe** (cofundador de Zcash, Project Tachyon) e **Dev Ojha** (Valar Group).

---

## O que é Zakura?

Zakura é um nó completo de Zcash concebido de raiz para estar pronto para produção em escala. Embora partilhe compatibilidade de consenso com Zebra — o que significa que valida e segue as mesmas regras de protocolo de Zcash — Zakura introduz melhorias significativas de engenharia destinadas a reduzir a barreira à execução de um nó completo de Zcash.

O projeto é um esforço conjunto entre o **Project Tachyon** (liderado por Sean Bowe, um dos engenheiros criptográficos originais de Zcash) e o **Valar Group** (liderado por Dev Ojha). Juntos, concentram-se em melhorias de próxima geração do protocolo de Zcash, e Zakura serve como o nó de referência para esse trabalho.

---

## Funcionalidades Principais

### Sincronização da Cadeia 5× Mais Rápida

Zakura alcança uma sincronização da blockchain aproximadamente 5× mais rápida em comparação com Zebra. Isto torna-o significativamente mais prático para operadores que precisam de iniciar um nó rapidamente ou recuperar de períodos de inatividade.

### Arranque através de Snapshot

Zakura publica snapshots pré-construídos da cadeia que reduzem drasticamente o tempo de sincronização inicial:

| Método de arranque | Tempo |
|-----------------|------|
| Snapshot de arquivo | ~37 minutos |
| Snapshot podado | **Menos de 2 minutos** |
| Zebra (sincronização completa) | ~20 horas |

Os snapshots podados têm aproximadamente **11 GB**, permitindo um arranque do nó **680× mais rápido** em comparação com a sincronização desde a génese.

### Poda Nativa de Blocos

Zakura suporta poda de blocos configurável, permitindo que os operadores de nós definam quanta história da cadeia pretendem reter. Isto torna prático executar um nó completo em hardware com armazenamento limitado — útil para validadores, programadores e fornecedores de infraestrutura que não necessitam da cadeia histórica completa.

### Modo de Compatibilidade RPC de zcashd

Zakura inclui um modo de compatibilidade que reproduz a interface JSON-RPC legada de `zcashd`. Wallets, exchanges e integrações existentes que dependem de RPCs de `zcashd` podem mudar para Zakura sem necessitarem de alterações de código.

### Camada Experimental de Transporte P2P

Zakura inclui uma camada de transporte peer-to-peer de próxima geração, atualmente **desativada por predefinição**. Quando ativada, visa:

- Propagação de blocos no pior caso em menos de 500 ms pela rede
- Agregação da mempool para retransmissão de transações mais eficiente
- Protocolo de gossip resistente a DoS para melhorar a resiliência da rede

Esta camada representa uma antevisão de futuras melhorias ao nível da rede de Zcash, desenvolvidas no âmbito do Project Tachyon.

### Compatível com Ironwood (NU6.3)

Zakura é totalmente compatível com a atualização de rede Ironwood (NU6.3), ativada na mainnet de Zcash em meados de 2026.

---

## Zakura Common: Criptografia de Wallet Mais Rápida

Em agosto de 2026, a equipa de Zakura lançou Zakura Common, um conjunto de forks acelerados das bibliotecas de criptografia em que as wallets e os nós de Zcash se baseiam. Zakura adotou a nova stack na versão 1.3.0, e a Vizor Wallet está entre as primeiras wallets a integrá-la.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Segundo os próprios benchmarks de Zakura:

| Operação | Aceleração |
|--|--|
| Geração de provas em dispositivos móveis | mais de 14× (desktop: mais de 5×) |
| Hashing Sinsemilla | mais de 21× |
| Verificação de zk-SNARK | 4–8× |
| Desencriptação de tentativa | mais de 1,5× |

Para os utilizadores, a mudança mais visível é o tempo de espera. Construir uma transação privada costumava demorar mais de três segundos numa wallet. Com Zakura Common, pode demorar menos de 200 ms em muitos casos. Este é o tempo que o seu dispositivo passa a preparar a transação, não o tempo de que a rede necessita para a confirmar.


---

## Como Zakura se Relaciona com Outros Nós de Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Linguagem | C++ (derivado de Bitcoin) | Rust | Rust (derivado de Zebra) |
| Estado | Descontinuado | Ativo | Ativo (v1.0.0, jul. 2026) |
| Velocidade de sincronização | Referência | ~1× | ~5× mais rápido |
| Poda de blocos | Não | Não | Sim |
| Compatibilidade RPC de zcashd | Nativa | Parcial | Sim (modo de compatibilidade) |
| Arranque por snapshot | Não | Não | Sim (menos de 2 min) |
| P2P experimental | Não | Não | Sim (opt-in) |

---

## Primeiros Passos

As opções de download, snapshots e documentação de configuração estão disponíveis em:

- **Guia de download e configuração:** [zakura.com/download](https://zakura.com/download/)
- **Snapshots da cadeia:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Código-fonte:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Páginas Relacionadas

- [Zebra Nó Completo](Zebra_Full_Node.md) — o nó completo de Zcash a montante do qual Zakura foi derivado
- [Zaino Indexador](Zaino.md) — um indexador baseado em Rust compatível com Zebra e Zakura
- [Nós Completos](Full_Nodes.md) — visão geral das opções de nós completos de Zcash
- [Nós Lightwallet](Lightwallet_Nodes.md) — alternativas de clientes leves

## Recursos

- [Apresentação de Zakura — anúncio](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Website de Zakura](https://zakura.com/)
- [Zakura no X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Anúncio de Zakura Common](https://zakura.com/announcements/zakura-common/)
