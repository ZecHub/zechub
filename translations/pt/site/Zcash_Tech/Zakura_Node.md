<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Nó Zakura

> 🇧🇷 [Versão em Português](/pt/zcash-tech/zakura-node)

Zakura é uma implementação gratuita e open-source de nó integral para o Zcash, criada para escalar. Derivada de [Zebra](Zebra_Full_Node.md) e desenvolvida por meio de uma colaboração entre o **Valar Group** e o **Project Tachyon**, Zakura oferece sincronização drasticamente mais rápida, poda nativa de blocos e uma camada de compatibilidade para ferramentas legadas de `zcashd`. A versão 1.0.0 foi lançada em 15 de julho de 2026.

---

## Resumo

- Zakura é um **nó integral do Zcash compatível com o consenso** — uma alternativa ao Zebra e ao zcashd, derivada do Zebra.
- A sincronização da blockchain é aproximadamente **5× mais rápida que a do Zebra**; a inicialização por snapshot é concluída em **menos de 2 minutos**.
- A **poda nativa de blocos** permite que operadores executem um nó integral com muito menos espaço em disco (~11 GB para um snapshot podado, em comparação com 300 GB para um nó integral do Zebra).
- Um **modo de compatibilidade RPC do zcashd** permite que carteiras e integrações existentes funcionem sem modificações.
- Uma **camada experimental de transporte P2P** (desativada por padrão) busca propagação de blocos em menos de 500 ms, com gossip resistente a DoS.
- Compatível com **Ironwood (NU6.3)**, a atualização da rede do Zcash ativada em meados de 2026.
- **Zakura Common** (v1.3.0, agosto de 2026) acelera a criptografia que as carteiras usam para criar transações privadas: de mais de 3 segundos para menos de 200 ms em muitos casos, segundo os benchmarks da Zakura.
- Liderado por **Sean Bowe** (cofundador do Zcash, Project Tachyon) e **Dev Ojha** (Valar Group).

---

## O que é Zakura?

Zakura é um nó integral do Zcash projetado do zero para estar pronto para produção em escala. Embora compartilhe compatibilidade de consenso com o Zebra — o que significa que valida e segue as mesmas regras do protocolo do Zcash — Zakura introduz melhorias significativas de engenharia voltadas a reduzir a barreira para executar um nó integral do Zcash.

O projeto é um esforço conjunto entre o **Project Tachyon** (liderado por Sean Bowe, um dos engenheiros criptográficos originais do Zcash) e o **Valar Group** (liderado por Dev Ojha). Juntos, eles se concentram em melhorias de próxima geração do protocolo do Zcash, e Zakura serve como o nó de referência para esse trabalho.

---

## Funcionalidades principais

### Sincronização da chain 5× mais rápida

Zakura alcança uma sincronização da blockchain aproximadamente 5× mais rápida em comparação com o Zebra. Isso o torna significativamente mais prático para operadores que precisam iniciar um nó rapidamente ou se recuperar de períodos de inatividade.

### Inicialização por snapshot

Zakura publica snapshots pré-criados da chain que reduzem drasticamente o tempo de sincronização inicial:

| Método de inicialização | Tempo |
|-----------------|------|
| Snapshot de arquivo | ~37 minutos |
| Snapshot podado | **Menos de 2 minutos** |
| Zebra (sincronização completa) | ~20 horas |

Snapshots podados têm aproximadamente **11 GB**, permitindo uma inicialização do nó **680× mais rápida** em comparação com a sincronização desde a gênese.

### Poda nativa de blocos

Zakura oferece suporte a poda configurável de blocos, permitindo que operadores de nós definam quanto do histórico da chain desejam manter. Isso torna prático executar um nó integral em hardware com armazenamento limitado — útil para validadores, desenvolvedores e provedores de infraestrutura que não precisam de todo o histórico da chain.

### Modo de compatibilidade RPC do zcashd

Zakura inclui um modo de compatibilidade que reproduz a interface JSON-RPC legada do `zcashd`. Carteiras, corretoras e integrações existentes que dependem de RPCs do `zcashd` podem migrar para Zakura sem precisar alterar o código.

### Camada experimental de transporte P2P

Zakura inclui uma camada de transporte peer-to-peer de próxima geração, atualmente **desativada por padrão**. Quando ativada, ela busca:

- Propagação de blocos no pior caso em menos de 500 ms pela rede
- Agregação da mempool para retransmissão mais eficiente de transações
- Protocolo de gossip resistente a DoS para melhorar a resiliência da rede

Essa camada representa uma prévia de futuras melhorias no nível da rede do Zcash desenvolvidas no Project Tachyon.

### Compatível com Ironwood (NU6.3)

Zakura é totalmente compatível com a atualização da rede Ironwood (NU6.3), ativada na mainnet do Zcash em meados de 2026.

---

## Zakura Common: criptografia de carteira mais rápida

Em agosto de 2026, a equipe da Zakura lançou Zakura Common, um conjunto de forks acelerados das bibliotecas de criptografia das quais as carteiras e os nós do Zcash dependem. Zakura adotou a nova stack na versão 1.3.0, e a Vizor Wallet está entre as primeiras carteiras a integrá-la.

![Pagamento privado com Zcash: verificação de zk-SNARK de 4 a 8 vezes mais rápida, criação de transações reduzida de mais de 3 segundos para menos de 200 ms, geração de provas mais de 14 vezes mais rápida em dispositivos móveis, hashing 21 vezes mais rápido, descriptografia de teste 1,5 vez mais rápida e bibliotecas open source que não exigem atualização de protocolo](/content-images/zakuracommonspeedups.webp)

Segundo os próprios benchmarks da Zakura:

| Operação | Aceleração |
|--|--|
| Geração de provas em dispositivos móveis | mais de 14× (desktop: mais de 5×) |
| Hashing Sinsemilla | mais de 21× |
| Verificação de zk-SNARK | 4–8× |
| Descriptografia de tentativa | mais de 1,5× |

Para os usuários, a mudança mais visível é o tempo de espera. Criar uma transação privada costumava levar mais de três segundos em uma carteira. Com Zakura Common, isso pode levar menos de 200 ms em muitos casos. Esse é o tempo que seu dispositivo leva preparando a transação, não o tempo de que a rede precisa para confirmá-la.


---

## Como Zakura se relaciona com outros nós do Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Linguagem | C++ (derivado do Bitcoin) | Rust | Rust (derivado do Zebra) |
| Estado | Descontinuado | Ativo | Ativo (v1.0.0, jul 2026) |
| Velocidade de sincronização | Referência | ~1× | ~5× mais rápido |
| Poda de blocos | Não | Não | Sim |
| Compatibilidade RPC com zcashd | Nativa | Parcial | Sim (modo de compatibilidade) |
| Inicialização por snapshot | Não | Não | Sim (menos de 2 min) |
| P2P experimental | Não | Não | Sim (opt-in) |

---

## Primeiros passos

As opções de download, snapshots e a documentação de configuração estão disponíveis em:

- **Guia de download e configuração:** [zakura.com/download](https://zakura.com/download/)
- **Snapshots da chain:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Código-fonte:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Páginas relacionadas

- [Nó integral Zebra](Zebra_Full_Node.md) — o nó integral do Zcash original do qual Zakura foi derivado
- [Indexador Zaino](Zaino.md) — um indexador baseado em Rust compatível com Zebra e Zakura
- [Nós integrais](Full_Nodes.md) — visão geral das opções de nós integrais do Zcash
- [Nós Lightwallet](Lightwallet_Nodes.md) — alternativas de clientes leves

## Recursos

- [Apresentando Zakura — anúncio](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Site da Zakura](https://zakura.com/)
- [Zakura no X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Anúncio do Zakura Common](https://zakura.com/announcements/zakura-common/)
