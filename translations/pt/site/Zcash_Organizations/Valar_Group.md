<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

[Visite o site](https://valargroup.dev/)

<img width="200" height="200" alt="254678133" src="/content-images/0dc8c697-bcad-492a-b024-89b502d27af4-4c0d4552c2.webp" />


## Declaração de missão

Valar Group é uma organização independente de engenharia focada em ampliar o Zcash, fortalecer a governança dos detentores de moedas e melhorar a privacidade, o desempenho e a resiliência de longo prazo do protocolo.

Seu trabalho concentra-se em infraestrutura no nível do protocolo: votação privada de detentores de tokens, software de nós integrais de alto desempenho, tecnologia de sincronização de carteiras e atualizações da rede que tornam o Zcash blindado mais utilizável em maior escala.

A organização pretende dar aos detentores de ZEC uma forma de expressar preferências de maneira privada, dar aos operadores de nós um software mais rápido e mais capaz, e dar às carteiras ferramentas que preservem a privacidade dos usuários ao mesmo tempo que reduzem o custo de participação na rede.

## Contexto

Valar Group é liderado por Dev Ojha (ValarDragon), cofundador da Osmosis e membro da equipe que lançou Cosmos. Ao longo da última década, trabalhou em zk-SNARKs, consenso BFT e sistemas DeFi em produção.

O trabalho público do grupo no Zcash tornou-se proeminente à medida que o ecossistema avançava para equipes independentes de protocolo após a reorganização de 2026 do desenvolvimento principal. Valar Group surgiu como uma das organizações que desenvolvem a próxima geração de infraestrutura do Zcash junto com Project Tachyon, Shielded Labs, ZODL e a Zcash Foundation.

Um tema recorrente em seu trabalho é que as propriedades de privacidade do Zcash devem ir além dos pagamentos. Se for pedido aos detentores que votem sobre emissão, tempos de bloco ou o escopo de atualizações da rede, eles devem poder fazê-lo a partir de saldos blindados sem revelar identidades, saldos ou votos individuais. Esse requisito levou a Valar Group a projetar e disponibilizar uma chain dedicada à votação de detentores de moedas.

O mesmo histórico de escalabilidade e criptografia também moldou seu trabalho sobre nós e sincronização. Blocos mais rápidos, sincronização mais leve de carteiras e um nó integral mais capaz são tratados como pré-requisitos para dinheiro privado que possa ser usado na escala de uma rede de pagamentos, em vez de apenas como reserva de valor.

## Visão

Os materiais públicos e o trabalho de projeto da Valar Group apontam para uma rede Zcash que possa:

- Suportar votação privada e auditável de detentores de moedas como um processo repetível de governança.
- Ampliar pagamentos de prova de trabalho sem sacrificar a privacidade blindada.
- Reduzir os gargalos das carteiras e dos nós por meio de PIR, poda e propagação mais rápida de blocos.
- Aumentar a diversidade de implementações disponibilizando uma stack independente de nó integral.
- Contribuir para a preparação pós-quântica e atualizações de protocolo revisadas formalmente.

A organização trabalha como contribuidora independente, não como proprietária do protocolo. As alterações ao protocolo continuam passando por ZIPs, implementação, revisão e sinalização da comunidade. O papel da Valar Group é projetar, implementar, operar e disponibilizar em código aberto os sistemas que tornam esses processos práticos.

## Áreas estratégicas

O trabalho da Valar Group se agrupa em torno de quatro áreas.

### Governança privada de detentores de moedas

O Zcash não utiliza controle automático do protocolo on-chain. As enquetes de detentores de moedas são sinais consultivos que alimentam um processo mais amplo de consenso aproximado. A Valar Group desenvolveu a Tokenholder Voting Chain para que esses sinais possam ser coletados a partir de saldos blindados sem expor a identidade do eleitor ou o tamanho do voto individual.

O design atual utiliza:

- Uma chain de aplicativo dedicada baseada em Cosmos SDK para orquestrar rodadas de votação.
- Provas de snapshot contra notes Ironwood que podem ser gastas.
- Criptografia homomórfica dos valores de voto.
- Private Information Retrieval para provas de não pertencimento de nulificadores.
- Uma multisig de coordenadores e uma autoridade eleitoral distribuída.

O objetivo é substituir processos anteriores de votação de detentores de tokens por um sistema reutilizável, auditado e integrável em carteiras, que outras organizações possam operar e contabilizar de forma independente.

### Software de nós e escalabilidade da rede

A Valar Group colabora com Project Tachyon no Zakura, um nó integral do Zcash construído a partir da base de código do Zebra. Zakura está posicionado como um nó de alto desempenho para operadores que precisam de sincronização inicial mais rápida, poda, inicialização por snapshot e um caminho de compatibilidade para antigos usuários de `zcashd`.

O trabalho relacionado à escalabilidade inclui:

- Tempos-alvo de bloco mais rápidos, incluindo experiências com blocos de 25 segundos em testnets NU7.
- Propagação de blocos peer-to-peer aprimorada.
- Funcionalidades de nó integral destinadas a manter o Zcash utilizável à medida que a atividade blindada cresce.

### Infraestrutura de carteiras e sincronização

Historicamente, as carteiras blindadas precisam analisar grandes quantidades de dados da chain. A Valar Group desenvolve sistemas PIR para que as carteiras possam obter as provas de que precisam sem baixar conjuntos completos de nulificadores ou revelar quais notes lhes interessam.

Esse trabalho aparece tanto na stack de votação quanto em pesquisas mais amplas sobre sincronização de carteiras. O grupo também contribuiu para o trabalho de confiabilidade do lado da carteira, incluindo envio de transações a vários servidores e melhorias na seleção de servidores usadas na stack móvel da ZODL.

### Atualizações de protocolo e coordenação do ecossistema

A Valar Group foi uma das organizações que se comprometeram publicamente com a resposta Ironwood após a vulnerabilidade do circuito Orchard. Ironwood introduziu um novo pool blindado, selou o pool Orchard original por trás de uma catraca e restaurou uma maneira de verificar independentemente a oferta circulante. A Valar Group trabalhou com Project Tachyon, Shielded Labs, ZODL e a Zcash Foundation na arquitetura, implementação de regras de consenso e coordenação do ecossistema.

O grupo também participa da definição do escopo de NU7, operação de testnets e edição de ZIPs. Dev Ojha está listado como editor de ZIP.

## Iniciativas atuais

### Tokenholder Voting Chain / Shielded Vote

Shielded Vote é o protocolo de governança privada da Valar Group para o Zcash. Os detentores votam com saldos blindados sem revelar valores individuais nem associar votos a identidades.

As principais propriedades incluem:

- Uma sessão online para votar, em vez de um processo de commit/reveal de vários dias.
- Uma assinatura de snapshot compatível com Keystone que delega direitos de voto a uma hotkey sem colocar fundos em risco.
- Valores de voto criptografados usando ElGamal homomórfico.
- Consultas PIR para que os nulificadores não sejam revelados durante as provas de snapshot.
- Divisão de votos e envio por retransmissão atrasada para reduzir a correlação temporal.
- Apurações publicamente auditáveis.

Em agosto de 2026, a Valar Group e o Project Tachyon usaram esta stack para a votação de detentores de moedas NU7. A elegibilidade exigia ZEC blindado que pudesse ser gasto em Ironwood na altura 3,459,350 da mainnet. A votação ocorreu de 25 de agosto a 14 de setembro de 2026, com um limite de participação de 1,000,000 ZEC para que o resultado fosse tratado como representativo. As questões abrangeram suavização da emissão NSM, calendário de reemissão, descontinuação de Sprout/v4, tempos de bloco de 25 segundos e escopo/prontidão de NU7.

A coordenação da chain predefinida utiliza uma multisig 2-de-5 entre Project Tachyon, Valar Group, a Zcash Foundation, ZODL e Shielded Labs. Um conjunto separado de validadores detém partes das chaves de descriptografia por rodada. Nenhum validador individual pode recuperar votos individuais; é necessário um limite de validadores para produzir a apuração final.

As interfaces públicas para operadores e auditores incluem:

- [Configuração da chain de votação](https://setup.valargroup.org)
- [Auditor de apuração](https://tally.valargroup.org)
- [UI do coordenador](https://svote.valargroup.org/)
- [Configuração do servidor PIR](https://setup-pir.valargroup.org)
- [Documentação do Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura é um nó integral do Zcash desenvolvido por meio de uma colaboração entre Valar Group e Project Tachyon. Deriva do Zebra e adiciona sincronização mais rápida, poda nativa, inicialização por snapshot, caminhos de compatibilidade com `zcashd` e trabalho experimental de alto desempenho em P2P.

A Zcash Foundation acolheu publicamente o projeto, observando que o Zebra foi disponibilizado sob licenças permissivas para que equipes independentes pudessem bifurcá-lo e aprimorá-lo, e que vários colaboradores do Zakura já haviam contribuído upstream para o Zebra.

### Private Information Retrieval

A Valar Group mantém serviços e bibliotecas PIR para dois problemas relacionados:

- Provar que uma note não foi gasta em uma altura de snapshot sem revelar seu nulificador.
- Reduzir os dados que as carteiras precisam obter para sincronizar ou votar.

Esta é uma dependência central do Shielded Vote e um bloco de construção para uma UX de carteira privada mais rápida.

### Engenharia Ironwood e NU7

A Valar Group fez parte do compromisso conjunto de junho de 2026 com Ironwood e contribuiu para a implementação de regras de consenso e trabalho nos clientes em torno do novo pool. Também operou infraestrutura de testnet NU7, incluindo scripts de entrada e nós públicos hospedados em `nu7.valargroup.dev`.

### Bibliotecas de protocolo em código aberto

A organização GitHub `valargroup` publica a stack de votação e os nós como repositórios públicos, incluindo:

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — chain específica do aplicativo para votação privada on-chain
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — biblioteca de votação blindada do lado do cliente, provas, armazenamento e FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — circuitos Halo2 de delegação e voto
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — PIR para provas de não pertencimento de nulificadores
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — configuração de descoberta de serviços de carteira
- [`zebra`](https://github.com/valargroup/zebra) — bifurcação de desenvolvimento Zebra/Zakura da Valar Group

## As equipes

Valar Group é liderado por **Dev Ojha** (ValarDragon). As páginas públicas da equipe associadas ao Zakura listam os seguintes engenheiros afiliados à Valar:

- **Dev Ojha** — Responsável pela manutenção; lidera a Valar Group. As áreas de foco incluem votação de detentores de tokens, trabalho pós-quântico, Zakura e PIR.
- **Roman Akhtariev** — Engenheiro principal. Anteriormente engenheiro principal na Osmosis; seu trabalho inclui sincronização de carteiras PIR, votação de detentores de tokens e desempenho de sincronização do Zakura.
- **Evan Forbes** — Engenheiro principal. Antigo líder de consenso e engenheiro fundador da Celestia; seu trabalho inclui preparação para tempos de bloco mais rápidos e uma stack P2P QUIC.
- **Adam Tucker** — Engenheiro principal. Antigo engenheiro da Osmosis; seu trabalho inclui votação de detentores de tokens com Roman Akhtariev, confiabilidade de carteiras e integração do Ironwood em toda a stack.

O próprio Zakura é mantido em conjunto com o Project Tachyon, liderado por Sean Bowe. As duas organizações colaboram estreitamente, mas permanecem separadas.

## Estrutura organizacional

Valar Group opera como uma organização independente de engenharia. Não faz parte da Zcash Foundation, ZODL, Shielded Labs ou Zcash Community Grants.

No design da chain de votação, Valar Group é uma das cinco organizações coordenadoras. Esse papel é um parâmetro do sistema de votação, não uma reivindicação de controle exclusivo sobre a governança do Zcash. Outras equipes podem operar validadores, criar chains de votação alternativas ou auditar as apurações publicadas usando as ferramentas públicas.

Informações adicionais sobre o tipo de entidade jurídica, composição do conselho e governança interna não foram publicadas com o mesmo nível de detalhe que nas organizações mais antigas do Zcash.

## Financiamento

Declarações públicas no fórum de meados de 2026 descrevem Valar Group e Project Tachyon como financiados por meio de doações privadas. Ao contrário da rodada de investimento divulgada da ZODL ou dos anúncios públicos de doações da Shielded Labs, Valar Group não publicou uma lista detalhada de doadores ou um calendário de subsídios.

Esse modelo de financiamento mantém a equipe independente da trajetória histórica do Development Fund / recompensa de bloco, mas também significa menos visibilidade pública sobre o tamanho do orçamento e as fontes de financiamento.

## Papel no ecossistema Zcash

Valar Group é uma das organizações de protocolo independentes que se formaram no cenário de desenvolvimento do Zcash em 2026. Nesse cenário:

- A **Zcash Foundation** continua responsável pela administração comunitária e pelo Zebra.
- **ZODL** concentra-se no produto de carteira e na continuidade do protocolo após a separação da ECC.
- **Shielded Labs** concentra-se em sustentabilidade, segurança e pesquisa de consenso.
- **Project Tachyon** concentra-se em recursão, verificação formal e escalabilidade de longo prazo.
- **Valar Group** concentra-se em votação privada de detentores de moedas, desempenho dos nós, PIR e a engenharia necessária para operar esses sistemas em produção.

Sua contribuição distintiva é tornar operacional a governança blindada. A votação NU7 é a primeira grande utilização dessa stack: os detentores provam saldos Ironwood, carteiras como ZODL e Vizor podem integrar o fluxo, e qualquer pessoa pode auditar a apuração sem saber como um determinado detentor votou.

O trabalho da mesma equipe sobre nós e sincronização destina-se a apoiar a outra metade desse quadro. A votação privada é menos útil se as carteiras não conseguirem sincronizar, os nós não conseguirem acompanhar ou as atualizações não puderem ser implementadas rapidamente. Valar Group trata a governança, o software de nós e a infraestrutura de carteiras como um só problema: tornar o Zcash privado utilizável em escala sem concentrar o poder operacional em uma única organização.

## Recursos

- [Site da Valar Group](https://valargroup.dev/)
- [GitHub da Valar Group](https://github.com/valargroup)
- [Documentação do Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)
- [Configuração da chain de votação](https://setup.valargroup.org)
- [Auditor de apuração](https://tally.valargroup.org)
- [UI do coordenador](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Sobre / equipe da Zakura](https://zakura.com/about/)
- [Tópico do fórum sobre a votação de detentores de moedas NU7](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Tópico do fórum sobre Coinholder Voting Chain](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
