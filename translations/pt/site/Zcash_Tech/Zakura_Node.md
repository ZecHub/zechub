<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nó Zakura

O Zakura é uma implementação de nó integral gratuita e de código aberto para o Zcash, construída para escalar. Derivado do [Zebra](Zebra_Full_Node.md) e desenvolvido por meio de uma colaboração entre a **Valar Group** e o **Project Tachyon**, o Zakura oferece sincronização muito mais rápida, poda nativa de blocos e uma camada de compatibilidade com as ferramentas legadas do `zcashd`. A versão 1.0.0 foi lançada em 15 de julho de 2026. Desde então, os lançamentos vieram rapidamente: a 1.7.0 (22 de outubro de 2026) ativou o NU7 na Mainnet, e a série 1.8 veio em seguida, em novembro.

---

## TL;DR

- O Zakura é um **nó integral do Zcash compatível com o consenso**, uma alternativa ao Zebra e ao zcashd, derivado do Zebra.
- A sincronização da blockchain é aproximadamente **5× mais rápida que a do Zebra**; a inicialização a partir de snapshot termina em **menos de 2 minutos**.
- A **poda nativa de blocos** permite que os operadores executem um nó integral com muito menos espaço em disco (~11 GB no snapshot podado contra 300 GB de um nó Zebra completo).
- Um **modo de compatibilidade de RPC com o zcashd** permite que carteiras e integrações existentes funcionem sem modificações.
- Uma **camada de transporte P2P experimental** (desativada por padrão) busca propagação de blocos abaixo de 500 ms com gossip resistente a DoS.
- Compatível com o **Ironwood (NU6.3)**, a atualização da rede do Zcash ativada em meados de 2026.
- Segue o **NU7**: o Zakura 1.7.0 é a versão que o ativa na Mainnet. Cada versão também para em um bloco de fim de suporte algumas semanas após o lançamento, então planeje atualizar regularmente (veja "Antes de executar", abaixo).
- O **Zakura Common** (v1.3.0, agosto de 2026) acelera a criptografia que as carteiras usam para criar transações privadas: de mais de 3 segundos para menos de 200 ms em muitos casos, segundo os benchmarks da Zakura.
- Liderado por **Sean Bowe** (cofundador da Zcash, Project Tachyon) e **Dev Ojha** (Valar Group).

---

## O que é o Zakura?

O Zakura é um nó integral do Zcash projetado desde o início para estar pronto para produção em escala. Embora compartilhe a compatibilidade de consenso com o Zebra, ou seja, valide e siga as mesmas regras do protocolo Zcash, o Zakura introduz melhorias de engenharia significativas que visam reduzir a barreira para executar um nó integral do Zcash.

O projeto é um esforço conjunto entre o **Project Tachyon** (liderado por Sean Bowe, um dos engenheiros criptográficos originais do Zcash) e a **Valar Group** (liderada por Dev Ojha). Juntos, eles se concentram em melhorias de próxima geração para o protocolo Zcash, e o Zakura serve como o nó de referência para esse trabalho.

---

## Principais recursos

### Sincronização da chain 5× mais rápida

O Zakura alcança uma sincronização da blockchain aproximadamente 5× mais rápida em comparação com o Zebra. Isso o torna muito mais prático para operadores que precisam colocar um nó no ar rapidamente ou se recuperar de um período fora do ar.

### Inicialização a partir de snapshot

O Zakura publica snapshots da chain pré-construídos que reduzem drasticamente o tempo de sincronização inicial:

| Método de Bootstrap | Tempo |
|-----------------|------|
| Snapshot de arquivo | ~37 minutos |
| Snapshot podado | **Menos de 2 minutos** |
| Zebra (sincronização completa) | ~20 horas |

Os snapshots podados têm aproximadamente **11 GB**, permitindo uma inicialização do nó **680× mais rápida** em comparação com a sincronização a partir do bloco gênese.

### Poda nativa de blocos

O Zakura suporta poda de blocos configurável, permitindo que os operadores de nós definam quanto do histórico da chain manter. Isso torna prático executar um nó integral em hardware com armazenamento limitado, o que é útil para validadores, desenvolvedores e provedores de infraestrutura que não precisam da chain histórica completa.

### Modo de compatibilidade de RPC com o zcashd

O Zakura inclui um modo de compatibilidade que reproduz a interface JSON-RPC legada do `zcashd`. Carteiras, corretoras e integrações existentes que dependem das RPCs do `zcashd` podem migrar para o Zakura sem precisar de alterações no código.

### Camada de transporte P2P experimental

O Zakura vem com uma camada de transporte peer-to-peer de próxima geração, atualmente **desativada por padrão**. Quando ativada, ela busca:

- Propagação de blocos abaixo de 500 ms no pior caso em toda a rede
- Agregação da mempool para um repasse de transações mais eficiente
- Protocolo de gossip resistente a DoS para melhorar a resiliência da rede

Essa camada é uma prévia de futuras melhorias no nível de rede do Zcash que estão sendo desenvolvidas no âmbito do Project Tachyon.

### Compatível com o Ironwood (NU6.3)

O Zakura é totalmente compatível com a atualização da rede Ironwood (NU6.3), ativada na mainnet do Zcash em meados de 2026.

### NU7

O Zakura 1.7.0, lançado em 22 de outubro de 2026, é a versão que ativa o NU7 na Mainnet ([notas de versão](https://github.com/zakura-core/zakura/releases/tag/v1.7.0)). Um nó precisa da versão 1.7.0 ou mais recente para seguir a chain após a atualização. [NU7](NU7.md) explica o que a atualização muda.

---

## Zakura Common: criptografia de carteira mais rápida

Em agosto de 2026, a equipe da Zakura lançou o Zakura Common, um conjunto de forks acelerados das bibliotecas de criptografia das quais as carteiras e os nós do Zcash dependem. O Zakura migrou para a nova stack na versão 1.3.0, e a Vizor Wallet está entre as primeiras carteiras a integrá-lo.

![Pagamento privado em Zcash: verificação zk-SNARK de 4 a 8 vezes mais rápida, construção de transações de mais de 3 segundos para menos de 200 ms, geração de provas mais de 14 vezes mais rápida no celular, hashing 21 vezes mais rápido, decriptação de teste 1.5 vez mais rápida e bibliotecas de código aberto que não exigem atualização do protocolo](/content-images/zakuracommonspeedups.webp)

De acordo com os próprios benchmarks da Zakura:

| Operação | Aceleração |
|--|--|
| Geração de provas no celular | mais de 14× (desktop: mais de 5×) |
| Hashing Sinsemilla | mais de 21× |
| Verificação zk-SNARK | 4–8× |
| Descriptografia de teste | mais de 1,5× |

Para os usuários, a mudança mais visível é o tempo de espera. Criar uma transação privada costumava levar mais de três segundos em uma carteira. Com o Zakura Common, isso pode levar menos de 200 ms em muitos casos. Esse é o tempo que seu dispositivo gasta preparando a transação, não o tempo que a rede precisa para confirmá-la.


---

## Como o Zakura se relaciona com outros nós do Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Linguagem | C++ (derivado do Bitcoin) | Rust | Rust (derivado do Zebra) |
| Status | Descontinuado | Ativo | Ativo (v1.0.0 jul 2026; v1.8.8 nov 2026) |
| Velocidade de sincronização | Referência | ~1× | ~5× mais rápido |
| Poda de blocos | Não | Não | Sim |
| Compatibilidade de RPC com o zcashd | Nativa | Parcial | Sim (modo de compatibilidade) |
| Inicialização a partir de snapshot | Não | Não | Sim (menos de 2 min) |
| P2P experimental | Não | Não | Sim (opcional) |

---

## Primeiros passos

Opções de download, snapshots e documentação de configuração estão disponíveis em:

- **Guia de download e configuração:** [zakura.com/download](https://zakura.com/download/)
- **Snapshots da chain:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Código-fonte:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- **Notas de versão:** [github.com/zakura-core/zakura/releases](https://github.com/zakura-core/zakura/releases)

### Servindo carteiras leves

Zakura não é um servidor de carteiras leves. Ele não implementa o `CompactTxStreamer`, o protocolo gRPC usado por carteiras leves como a Zodl (antiga Zashi), então uma carteira não consegue se conectar diretamente ao `zakurad`. Para atender carteiras leves, execute um destes na frente dele:

- [Zaino](Zaino.md) (preferencial)
- [lightwalletd](Lightwallet_Nodes.md)
- [Ztreamer](https://github.com/zcashlabs/ztreamer), o indexador e servidor de carteira leve do Zcash Labs, que lê a chain a partir de um nó Zakura, seja incorporado ao seu próprio processo ou remoto via JSON-RPC

O gRPC de indexação do próprio Zakura (`indexer_listen_addr` na seção `[rpc]`, desativado por padrão) é uma interface separada: fluxos de blocos, mempool e ponta da chain para softwares confiáveis que você mesmo executa, e não o protocolo de carteiras leves. Texto sem criptografia só é permitido em loopback, e qualquer outro endereço exige TLS mútuo ([referência de configuração](https://github.com/zakura-core/zakura/blob/v1.8.7/crates/zakura-rpc/src/config/rpc.rs)).

### Antes de executar

Alguns pontos das notas de versão da 1.8 que costumam pegar os operadores de surpresa:

- **As versões expiram.** Cada versão do Zakura tem uma altura de fim de suporte, e um nó da Mainnet que a executa para nesse bloco. As versões 1.8.x são "Suportadas na Mainnet até o bloco 3.643.309, por volta de 3 de dezembro de 2026", com avisos de atualização cerca de três dias antes ([v1.8.8](https://github.com/zakura-core/zakura/releases/tag/v1.8.8)). Verifique a versão mais recente antes dessa data e não fixe uma versão antiga em scripts ou templates de implantação sem um plano para atualizá-la.
- **Requisito de CPU x86-64 desde a 1.8.0.** Os binários das versões e as imagens Docker usam instruções BMI2/ADX, o que significa Intel Broadwell, AMD Zen ou mais recente. Em uma CPU mais antiga, o `zakurad` é encerrado na inicialização com um erro que indica as extensões ausentes. Compile a partir do código-fonte com `--features portable` para executar nessas máquinas ([v1.8.0](https://github.com/zakura-core/zakura/releases/tag/v1.8.0)).
- **Configurações antigas geradas e P2P nativo.** O `zakurad generate` costumava gravar `peer_memory_budget_bytes = 8589934592` (8 GiB). Desde a 1.8.3, isso admite cerca de metade das conexões P2P nativas, e com 4 GiB ou menos um nó que executa P2P nativo não inicia. Aumente `[network.zakura] peer_memory_budget_bytes` para pelo menos 15 GiB ou apague a linha para usar o novo padrão de 15 GiB ([v1.8.3](https://github.com/zakura-core/zakura/releases/tag/v1.8.3)).
- **As ferramentas de estado foram movidas para o `zakurad`.** Desde a 1.8.3, os binários independentes `zakura-prune-state` e `zakura-rollback-state` não são mais distribuídos, inclusive no Docker. Use `zakurad prune-state` e `zakurad rollback-state` no lugar deles. Eles recebem os mesmos argumentos, mas carregam `zakura.toml`, então passe `--cache-dir` para apontar para um diretório de estado específico.

---

## Páginas relacionadas

- [Nó integral Zebra](Zebra_Full_Node.md): o nó integral Zcash original do qual o Zakura foi derivado
- [Indexador Zaino](Zaino.md): um indexador baseado em Rust compatível com o Zebra e o Zakura
- [Nós integrais](Full_Nodes.md): visão geral das opções de nó integral do Zcash
- [Nós lightwallet](Lightwallet_Nodes.md): alternativas de clientes leves

## Recursos

- [Apresentando o Zakura: anúncio](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Site do Zakura](https://zakura.com/)
- [Zakura no X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Anúncio do Zakura Common](https://zakura.com/announcements/zakura-common/)
