<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

[Visitar o website](https://valargroup.dev/)

<<img width="200" height="200" alt="254678133" src="https://github.com/user-attachments/assets/0dc8c697-bcad-492a-b024-89b502d27af4" />


## Declaração de Missão

Valar Group é uma organização de engenharia independente focada em escalar Zcash, reforçar a governação dos detentores de moedas e melhorar a privacidade, o desempenho e a resiliência a longo prazo do protocolo.

O seu trabalho concentra-se em infraestrutura ao nível do protocolo: votação privada de detentores de tokens, software de nós completos de alto desempenho, tecnologia de sincronização de carteiras e atualizações de rede que tornam Zcash blindado mais utilizável a maior escala.

A organização pretende dar aos detentores de ZEC uma forma de expressar preferências de forma privada, dar aos operadores de nós software mais rápido e mais capaz, e dar às carteiras ferramentas que preservem a privacidade dos utilizadores ao mesmo tempo que reduzem o custo de participação na rede.

## Contexto

Valar Group é liderado por Dev Ojha (ValarDragon), cofundador da Osmosis e membro da equipa que lançou Cosmos. Ao longo da última década, trabalhou em zk-SNARKs, consenso BFT e sistemas DeFi em produção.

O trabalho público do grupo em Zcash tornou-se proeminente à medida que o ecossistema avançava para equipas de protocolo independentes após a reorganização de 2026 do desenvolvimento principal. Valar Group surgiu como uma das organizações a desenvolver a próxima geração de infraestrutura Zcash juntamente com Project Tachyon, Shielded Labs, ZODL e a Zcash Foundation.

Um tema recorrente no seu trabalho é que as propriedades de privacidade de Zcash devem ir além dos pagamentos. Se for pedido aos detentores que votem sobre emissão, tempos de bloco ou o âmbito de atualizações da rede, devem poder fazê-lo a partir de saldos blindados sem revelar identidades, saldos ou votos individuais. Esse requisito levou Valar Group a conceber e disponibilizar uma cadeia dedicada à votação de detentores de moedas.

O mesmo historial de escalabilidade e criptografia também moldou o seu trabalho sobre nós e sincronização. Blocos mais rápidos, sincronização mais leve de carteiras e um nó completo mais capaz são tratados como pré-requisitos para dinheiro privado que possa ser usado à escala de uma rede de pagamentos, em vez de apenas como reserva de valor.

## Visão

Os materiais públicos e o trabalho de projeto de Valar Group apontam para uma rede Zcash que possa:

- Suportar votação privada e auditável de detentores de moedas como um processo de governação repetível.
- Escalar pagamentos de prova de trabalho sem sacrificar a privacidade blindada.
- Reduzir os estrangulamentos das carteiras e dos nós através de PIR, poda e propagação mais rápida de blocos.
- Aumentar a diversidade de implementações através da disponibilização de uma stack de nó completo independente.
- Contribuir para a preparação pós-quântica e atualizações de protocolo formalmente revistas.

A organização trabalha como contribuidor independente, não como proprietária do protocolo. As alterações ao protocolo continuam a passar por ZIPs, implementação, revisão e sinalização da comunidade. O papel de Valar Group é conceber, implementar, operar e disponibilizar em código aberto os sistemas que tornam esses processos práticos.

## Áreas Estratégicas

O trabalho de Valar Group agrupa-se em torno de quatro áreas.

### Governação Privada de Detentores de Moedas

Zcash não utiliza controlo automático do protocolo on-chain. As sondagens de detentores de moedas são sinais consultivos que alimentam um processo mais amplo de consenso aproximado. Valar Group desenvolveu a Tokenholder Voting Chain para que esses sinais possam ser recolhidos a partir de saldos blindados sem expor a identidade do eleitor ou o tamanho do voto individual.

O design atual utiliza:

- Uma cadeia de aplicação dedicada baseada em Cosmos SDK para orquestrar rondas de votação.
- Provas de snapshot contra notas Ironwood gastáveis.
- Encriptação homomórfica dos montantes de voto.
- Private Information Retrieval para provas de não pertença de nullifiers.
- Uma multisig de coordenadores e uma autoridade eleitoral distribuída.

O objetivo é substituir processos anteriores de votação de detentores de tokens por um sistema reutilizável, auditado e integrável em carteiras, que outras organizações possam operar e contabilizar de forma independente.

### Software de Nós e Escalabilidade da Rede

Valar Group colabora com Project Tachyon em Zakura, um nó completo Zcash construído a partir da base de código Zebra. Zakura está posicionado como um nó de alto desempenho para operadores que necessitam de sincronização inicial mais rápida, poda, inicialização por snapshot e um caminho de compatibilidade para antigos utilizadores de `zcashd`.

O trabalho de escalabilidade relacionado inclui:

- Tempos de bloco alvo mais rápidos, incluindo experiências com blocos de 25 segundos em testnets NU7.
- Propagação de blocos peer-to-peer melhorada.
- Funcionalidades de nó completo destinadas a manter Zcash utilizável à medida que a atividade blindada cresce.

### Infraestrutura de Carteiras e Sincronização

Historicamente, as carteiras blindadas têm de analisar grandes quantidades de dados da cadeia. Valar Group desenvolve sistemas PIR para que as carteiras possam obter as provas de que necessitam sem descarregar conjuntos completos de nullifiers ou revelar quais as notas que lhes interessam.

Este trabalho surge tanto na stack de votação como em investigação mais ampla sobre sincronização de carteiras. O grupo também contribuiu para trabalho de fiabilidade do lado da carteira, incluindo submissão de transações a vários servidores e melhorias na seleção de servidores utilizadas na stack móvel de ZODL.

### Atualizações de Protocolo e Coordenação do Ecossistema

Valar Group foi uma das organizações que se comprometeu publicamente com a resposta Ironwood após a vulnerabilidade do circuito Orchard. Ironwood introduziu um novo pool blindado, selou o pool Orchard original por trás de uma catraca e restaurou uma via para verificar independentemente a oferta circulante. Valar Group trabalhou com Project Tachyon, Shielded Labs, ZODL e a Zcash Foundation na arquitetura, implementação de regras de consenso e coordenação do ecossistema.

O grupo também participa na definição do âmbito de NU7, operação de testnets e edição de ZIPs. Dev Ojha está listado como editor de ZIP.

## Iniciativas Atuais

### Tokenholder Voting Chain / Shielded Vote

Shielded Vote é o protocolo de governação privada de Valar Group para Zcash. Os detentores votam com saldos blindados sem revelar montantes individuais nem associar votos a identidades.

As propriedades principais incluem:

- Uma sessão online para votar, em vez de um processo de commit/reveal de vários dias.
- Uma assinatura de snapshot compatível com Keystone que delega direitos de voto a uma hotkey sem colocar fundos em risco.
- Montantes de voto encriptados utilizando ElGamal homomórfico.
- Consultas PIR para que os nullifiers não sejam revelados durante as provas de snapshot.
- Divisão de votos e submissão por retransmissão retardada para reduzir a correlação temporal.
- Apuramentos publicamente auditáveis.

Em agosto de 2026, Valar Group e Project Tachyon utilizaram esta stack para a votação de detentores de moedas NU7. A elegibilidade exigia ZEC blindado gastável em Ironwood à altura 3,459,350 da mainnet. A votação decorreu de 25 de agosto a 14 de setembro de 2026, com um limiar de participação de 1,000,000 ZEC para que o resultado fosse tratado como representativo. As questões abrangeram suavização da emissão NSM, calendário de reemissão, descontinuação de Sprout/v4, tempos de bloco de 25 segundos e âmbito/prontidão de NU7.

A coordenação da cadeia predefinida utiliza uma multisig 2-de-5 entre Project Tachyon, Valar Group, a Zcash Foundation, ZODL e Shielded Labs. Um conjunto de validadores separado detém partes das chaves de desencriptação por ronda. Nenhum validador individual pode recuperar votos individuais; é necessário um limiar de validadores para produzir o apuramento final.

As interfaces públicas para operadores e auditores incluem:

- [Configuração da cadeia de votação](https://setup.valargroup.org)
- [Auditor de apuramento](https://tally.valargroup.org)
- [UI do coordenador](https://svote.valargroup.org/)
- [Configuração do servidor PIR](https://setup-pir.valargroup.org)
- [Documentação de Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura é um nó completo Zcash desenvolvido através de uma colaboração entre Valar Group e Project Tachyon. Deriva de Zebra e adiciona sincronização mais rápida, poda nativa, inicialização por snapshot, caminhos de compatibilidade com `zcashd` e trabalho P2P experimental de alto desempenho.

A Zcash Foundation acolheu publicamente o projeto, observando que Zebra foi disponibilizado sob licenças permissivas para que equipas independentes o pudessem bifurcar e melhorar, e que vários contribuidores de Zakura já tinham contribuído a montante para Zebra.

### Private Information Retrieval

Valar Group mantém serviços e bibliotecas PIR para dois problemas relacionados:

- Provar que uma nota não foi gasta numa altura de snapshot sem revelar o seu nullifier.
- Reduzir os dados que as carteiras têm de obter para sincronizar ou votar.

Esta é uma dependência central de Shielded Vote e um bloco de construção para uma UX de carteira privada mais rápida.

### Engenharia Ironwood e NU7

Valar Group fez parte do compromisso conjunto de junho de 2026 com Ironwood e contribuiu para a implementação de regras de consenso e trabalho nos clientes em torno do novo pool. Também operou infraestrutura de testnet NU7, incluindo scripts de entrada e nós públicos alojados em `nu7.valargroup.dev`.

### Bibliotecas de Protocolo em Código Aberto

A organização GitHub `valargroup` publica a stack de votação e nós como repositórios públicos, incluindo:

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — cadeia específica da aplicação para votação privada on-chain
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — biblioteca de votação blindada do lado do cliente, provas, armazenamento e FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — circuitos de delegação e voto Halo2
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — PIR para provas de não pertença de nullifiers
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — configuração de descoberta de serviços de carteira
- [`zebra`](https://github.com/valargroup/zebra) — bifurcação de desenvolvimento Zebra/Zakura de Valar Group

## As Equipas

Valar Group é liderado por **Dev Ojha** (ValarDragon). As páginas públicas da equipa associadas a Zakura listam os seguintes engenheiros afiliados à Valar:

- **Dev Ojha** — Responsável pela manutenção; lidera Valar Group. As áreas de foco incluem votação de detentores de tokens, trabalho pós-quântico, Zakura e PIR.
- **Roman Akhtariev** — Engenheiro principal. Anteriormente engenheiro principal na Osmosis; o seu trabalho inclui sincronização de carteiras PIR, votação de detentores de tokens e desempenho de sincronização de Zakura.
- **Evan Forbes** — Engenheiro principal. Antigo líder de consenso e engenheiro fundador da Celestia; o seu trabalho inclui preparação para tempos de bloco mais rápidos e uma stack P2P QUIC.
- **Adam Tucker** — Engenheiro principal. Antigo engenheiro da Osmosis; o seu trabalho inclui votação de detentores de tokens com Roman Akhtariev, fiabilidade de carteiras e integração de Ironwood em toda a stack.

O próprio Zakura é mantido conjuntamente com Project Tachyon, liderado por Sean Bowe. As duas organizações colaboram estreitamente, mas permanecem separadas.

## Estrutura Organizacional

Valar Group opera como uma organização de engenharia independente. Não faz parte da Zcash Foundation, ZODL, Shielded Labs ou Zcash Community Grants.

No design da cadeia de votação, Valar Group é uma das cinco organizações coordenadoras. Esse papel é um parâmetro do sistema de votação, não uma reivindicação de controlo exclusivo sobre a governação de Zcash. Outras equipas podem operar validadores, criar cadeias de votação alternativas ou auditar os apuramentos publicados a partir das ferramentas públicas.

Informação adicional sobre o tipo de entidade jurídica, composição do conselho e governação interna não foi publicada com o mesmo detalhe que nas organizações Zcash mais antigas.

## Financiamento

Declarações públicas no fórum de meados de 2026 descrevem Valar Group e Project Tachyon como financiados através de doações privadas. Ao contrário da ronda de investimento divulgada de ZODL ou dos anúncios públicos de doações de Shielded Labs, Valar Group não publicou uma lista detalhada de doadores ou calendário de subsídios.

Esse modelo de financiamento mantém a equipa independente do percurso histórico do Development Fund / recompensa de bloco, mas também significa menos visibilidade pública sobre a dimensão do orçamento e as fontes de financiamento.

## Papel no Ecossistema Zcash

Valar Group é uma das organizações de protocolo independentes que se formaram no panorama de desenvolvimento de Zcash em 2026. Nesse panorama:

- A **Zcash Foundation** continua a administração comunitária e Zebra.
- **ZODL** concentra-se no produto de carteira e na continuidade do protocolo após a separação da ECC.
- **Shielded Labs** concentra-se em sustentabilidade, segurança e investigação de consenso.
- **Project Tachyon** concentra-se em recursão, verificação formal e escalabilidade a longo prazo.
- **Valar Group** concentra-se em votação privada de detentores de moedas, desempenho de nós, PIR e a engenharia necessária para operar esses sistemas em produção.

A sua contribuição distintiva é tornar operacional a governação blindada. A votação NU7 é a primeira grande utilização dessa stack: os detentores provam saldos Ironwood, carteiras como Zodl e Vizor podem integrar o fluxo, e qualquer pessoa pode auditar o apuramento sem saber como votou um determinado detentor.

O trabalho da mesma equipa sobre nós e sincronização destina-se a apoiar a outra metade desse quadro. A votação privada é menos útil se as carteiras não conseguirem sincronizar, os nós não conseguirem acompanhar ou as atualizações não puderem ser implementadas rapidamente. Valar Group trata a governação, o software de nós e a infraestrutura de carteiras como um só problema: tornar Zcash privado utilizável à escala sem concentrar o poder operacional numa única organização.

## Recursos

- [Website de Valar Group](https://valargroup.dev/)
- [GitHub de Valar Group](https://github.com/valargroup)
- [Documentação de Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)
- [Configuração da cadeia de votação](https://setup.valargroup.org)
- [Auditor de apuramento](https://tally.valargroup.org)
- [UI do coordenador](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Sobre / equipa de Zakura](https://zakura.com/about/)
- [Tópico do fórum sobre a votação de detentores de moedas NU7](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Tópico do fórum sobre Coinholder Voting Chain](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
