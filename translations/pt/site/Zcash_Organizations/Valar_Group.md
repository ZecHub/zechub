<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

[Visite o site](https://valargroup.dev/)

<img width="200" height="200" alt="254678133" src="/content-images/0dc8c697-bcad-492a-b024-89b502d27af4-4c0d4552c2.webp" />


## Declaração de missão

Valar Group é uma organização de engenharia independente focada na escalabilidade do Zcash, no fortalecimento da governança dos detentores de moedas e na melhoria da privacidade, do desempenho e da resiliência de longo prazo do protocolo.

Seu trabalho se concentra em infraestrutura no nível do protocolo: votação privada de detentores de tokens, software de nó integral de alto desempenho, tecnologia de sincronização de carteiras e atualizações da rede que tornam as Zcash blindadas mais utilizáveis em maior escala.

A organização busca oferecer aos detentores de ZEC uma forma de expressar preferências de maneira privada, oferecer aos operadores de nós um software mais rápido e mais capaz, e oferecer às carteiras ferramentas que preservem a privacidade do usuário enquanto reduzem o custo de participar da rede.

## Histórico

Valar Group é liderada por Dev Ojha (ValarDragon), cofundador da Osmosis e membro da equipe que lançou Cosmos. Na última década, ele trabalhou com zk-SNARKs, consenso BFT e sistemas DeFi em produção.

O trabalho público do grupo no Zcash ganhou destaque à medida que o ecossistema migrou para equipes de protocolo independentes após a reorganização do desenvolvimento principal em 2026. Valar Group surgiu como uma das organizações que constroem a próxima geração da infraestrutura do Zcash, ao lado do Project Tachyon, Shielded Labs, ZODL e da Zcash Foundation.

Um tema recorrente em seu trabalho é que as propriedades de privacidade do Zcash devem ir além dos pagamentos. Se os detentores são chamados a votar sobre emissão, tempos de bloco ou o escopo de uma atualização da rede, eles devem poder fazer isso a partir de saldos blindados sem revelar identidades, saldos ou votos individuais. Esse requisito levou Valar Group a projetar e lançar uma chain dedicada à votação dos detentores de moedas.

A mesma experiência em escalabilidade e criptografia também moldou seu trabalho com nós e sincronização. Blocos mais rápidos, sincronização de carteiras mais leve e um nó integral mais capaz são tratados como pré-requisitos para um dinheiro privado que possa ser usado na escala de uma rede de pagamentos, e não apenas como reserva de valor.

## Visão

Os materiais públicos e o trabalho em projetos de Valar Group apontam para uma rede Zcash que possa:

- Suportar a votação privada e auditável dos detentores de moedas como um processo de governança repetível.
- Escalar pagamentos em proof-of-work sem sacrificar a privacidade blindada.
- Reduzir gargalos de carteiras e nós por meio de PIR, pruning e propagação de blocos mais rápida.
- Aumentar a diversidade de implementações lançando uma pilha de nó integral independente.
- Contribuir para a preparação pós-quântica e para atualizações do protocolo formalmente revisadas.

A organização atua como colaboradora independente, não como dona do protocolo. As mudanças no protocolo continuam passando por ZIPs, implementação, revisão e sinalização da comunidade. O papel de Valar Group é projetar, implementar, operar e disponibilizar como código aberto os sistemas que tornam esses processos viáveis.

## Áreas estratégicas

O trabalho de Valar Group se agrupa em quatro áreas.

### Governança privada dos detentores de moedas

O Zcash não usa controle automático on-chain do protocolo. As consultas aos detentores de moedas são sinais consultivos que alimentam um processo mais amplo de consenso aproximado. Valar Group construiu a Tokenholder Voting Chain para que esses sinais possam ser coletados a partir de saldos blindados sem expor a identidade do eleitor nem o tamanho de cada voto.

O design atual usa:

- Uma chain de aplicação dedicada, baseada no SDK Cosmos, para orquestrar as rodadas de votação.
- Provas de snapshot sobre notes Ironwood gastáveis.
- Criptografia homomórfica dos valores dos votos.
- Private Information Retrieval para provas de não pertencimento de nulificadores.
- Um multisig de coordenadores e uma autoridade eleitoral distribuída.

O objetivo é substituir os processos anteriores de votação de detentores de tokens por um sistema reutilizável, auditado e integrável às carteiras, que outras organizações possam operar e cuja apuração possam fazer de forma independente.

### Software de nó e escalabilidade da rede

Valar Group colabora com o Project Tachyon no Zakura, um nó integral Zcash construído a partir do código-base do Zebra. O Zakura é posicionado como um nó de alto desempenho para operadores que precisam de sincronização inicial mais rápida, pruning, bootstrap por snapshot e um caminho de compatibilidade para antigos usuários do `zcashd`.

O trabalho relacionado à escalabilidade inclui:

- Tempos-alvo de bloco mais rápidos, incluindo experimentos com blocos de 25 segundos em testnets do NU7.
- Propagação de blocos peer-to-peer aprimorada.
- Recursos de nó integral destinados a manter o Zcash utilizável à medida que a atividade blindada cresce.

### Infraestrutura de carteiras e sincronização

Historicamente, as carteiras blindadas precisam escanear grandes quantidades de dados da chain. Valar Group desenvolve sistemas PIR para que as carteiras possam buscar as provas de que precisam sem baixar conjuntos completos de nulificadores nem revelar quais notes lhes interessam.

Esse trabalho aparece tanto na pilha de votação quanto em pesquisas mais amplas sobre sincronização de carteiras. O grupo também contribuiu com trabalhos de confiabilidade do lado da carteira, incluindo o envio de transações para múltiplos servidores e melhorias na seleção de servidores usadas na pilha mobile do ZODL.

### Atualizações do protocolo e coordenação do ecossistema

Valar Group foi uma das organizações que se comprometeram publicamente com a resposta Ironwood após a vulnerabilidade no circuito do Orchard. O Ironwood introduziu um novo pool blindado, isolou o pool Orchard original atrás de uma catraca e restaurou um caminho para verificar de forma independente a oferta circulante. Valar Group trabalhou com o Project Tachyon, Shielded Labs, ZODL e a Zcash Foundation em arquitetura, implementação de regras de consenso e coordenação do ecossistema.

O grupo também participa da definição do escopo do NU7, da operação de testnets e da edição de ZIP. Dev Ojha consta como editor de ZIP.

## Iniciativas atuais

### Tokenholder Voting Chain / Shielded Vote

O Shielded Vote é o protocolo de governança privada de Valar Group para o Zcash. Os detentores votam com saldos blindados sem revelar valores individuais nem vincular votos a identidades.

As principais propriedades incluem:

- Uma única sessão online para votar, em vez de um processo de commit/reveal de vários dias.
- Uma assinatura de snapshot compatível com Keystone que delega os direitos de voto a uma hotkey sem colocar os fundos em risco.
- Valores de voto criptografados usando ElGamal homomórfico.
- Consultas PIR para que os nulificadores não vazem durante as provas de snapshot.
- Divisão de votos e envio com relay atrasado para reduzir a correlação temporal.
- Apurações auditáveis publicamente.

Em agosto de 2026, Valar Group e o Project Tachyon usaram essa pilha para a votação dos detentores de moedas do NU7. A elegibilidade exigia ZEC blindado e gastável em Ironwood na altura 3.459.350 da mainnet. A votação ocorreu de 25 de agosto a 14 de setembro de 2026, com um limite de participação de 1.000.000 ZEC para que o resultado fosse considerado representativo. As perguntas abordaram a suavização da emissão do NSM, o momento da reemissão, a descontinuação do Sprout/v4, tempos de bloco de 25 segundos e o escopo/prontidão do NU7.

A coordenação da chain padrão usa um multisig 2 de 5 entre o Project Tachyon, Valar Group, a Zcash Foundation, ZODL e Shielded Labs. Um conjunto separado de validadores detém as partes da chave de descriptografia de cada rodada. Nenhum validador sozinho consegue recuperar votos individuais; é necessário um limite mínimo de validadores para produzir a apuração final.

As interfaces públicas para operadores e auditores incluem:

- [Configuração da chain de votação](https://setup.valargroup.org)
- [Auditor da apuração](https://tally.valargroup.org)
- [Interface do coordenador](https://svote.valargroup.org/)
- [Configuração do servidor PIR](https://setup-pir.valargroup.org)
- [Documentação do Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

O Zakura é um nó integral Zcash desenvolvido em colaboração entre Valar Group e o Project Tachyon. Ele é derivado do Zebra e adiciona sincronização mais rápida, pruning nativo, bootstrap por snapshot, caminhos de compatibilidade com o `zcashd` e trabalhos experimentais de P2P de alto desempenho.

A Zcash Foundation recebeu o projeto publicamente de forma positiva, observando que o Zebra foi lançado sob licenças permissivas para que equipes independentes pudessem fazer fork e aprimorá-lo, e que vários colaboradores de Zakura já haviam contribuído upstream para o Zebra.

### Private Information Retrieval

Valar Group mantém serviços e bibliotecas PIR para dois problemas relacionados:

- Provar que uma note não estava gasta em uma altura de snapshot sem revelar seu nulificador.
- Reduzir os dados que as carteiras precisam buscar para sincronizar ou votar.

Essa é uma dependência central do Shielded Vote e um componente fundamental para uma UX de carteira privada mais rápida.

### Engenharia de Ironwood e NU7

Valar Group fez parte do compromisso conjunto de junho de 2026 com o Ironwood e contribuiu para a implementação das regras de consenso e para o trabalho nos clientes em torno do novo pool. Também operou a infraestrutura de testnet do NU7, incluindo scripts de adesão e nós públicos hospedados em `nu7.valargroup.dev`.

### Bibliotecas de protocolo de código aberto

A organização `valargroup` no GitHub publica a pilha de votação e de nó como repositórios públicos, incluindo:

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — chain específica de aplicação para votação privada on-chain
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — biblioteca de votação blindada do lado do cliente, provas, armazenamento e FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — circuitos Halo2 de delegação e de voto
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — PIR para provas de não pertencimento de nulificadores
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — configuração de descoberta de serviços para carteiras
- [`zebra`](https://github.com/valargroup/zebra) — fork de desenvolvimento de Zebra/Zakura de Valar Group

## As equipes

Valar Group é liderada por **Dev Ojha** (ValarDragon). As páginas públicas de equipe associadas a Zakura listam os seguintes engenheiros afiliados à Valar:

- **Dev Ojha** — Mantenedor; lidera Valar Group. Suas áreas de foco incluem a votação de detentores de tokens, o trabalho pós-quântico, Zakura e PIR.
- **Roman Akhtariev** — Engenheiro principal. Anteriormente engenheiro principal na Osmosis; seu trabalho inclui a sincronização de carteiras com PIR, a votação de detentores de tokens e o desempenho de sincronização do Zakura.
- **Evan Forbes** — Engenheiro principal. Ex-líder de consenso e engenheiro fundador da Celestia; seu trabalho inclui a preparação para tempos de bloco mais rápidos e uma pilha P2P baseada em QUIC.
- **Adam Tucker** — Engenheiro principal. Ex-engenheiro da Osmosis; seu trabalho inclui a votação de detentores de tokens com Roman Akhtariev, a confiabilidade das carteiras e a integração do Ironwood em toda a pilha.

O próprio Zakura é mantido em conjunto com o Project Tachyon, liderado por Sean Bowe. As duas organizações colaboram de perto, mas permanecem separadas.

## Estrutura organizacional

Valar Group opera como uma organização de engenharia independente. Ela não faz parte da Zcash Foundation, da ZODL, da Shielded Labs nem da Zcash Community Grants.

No design da chain de votação, Valar Group é uma das cinco organizações coordenadoras. Esse papel é um parâmetro do sistema de votação, e não uma reivindicação de controle exclusivo sobre a governança do Zcash. Outras equipes podem rodar validadores, criar chains de votação alternativas ou auditar as apurações publicadas usando as ferramentas públicas.

Informações adicionais sobre o tipo de pessoa jurídica, a composição do conselho e a governança interna não foram publicadas com o mesmo nível de detalhe que as de organizações mais antigas do Zcash.

## Financiamento

Declarações públicas no fórum em meados de 2026 descrevem Valar Group e o Project Tachyon como financiados por doações privadas. Diferentemente da rodada de venture capital divulgada por ZODL ou dos anúncios públicos de doações de Shielded Labs, Valar Group não publicou uma lista detalhada de doadores nem um cronograma de subsídios.

Esse modelo de financiamento mantém a equipe independente do caminho histórico do Development Fund / recompensa de bloco, mas também significa menos visibilidade pública sobre o tamanho do orçamento e as fontes de financiamento.

## Papel no ecossistema Zcash

Valar Group é uma das organizações de protocolo independentes que se formaram no cenário de desenvolvimento do Zcash em 2026. Nesse cenário:

- A **Zcash Foundation** continua a gestão da comunidade e Zebra.
- A **ZODL** se concentra no produto de carteira e na continuidade do protocolo após a separação da ECC.
- A **Shielded Labs** se concentra em sustentabilidade, segurança e pesquisa sobre consenso.
- O **Project Tachyon** se concentra em recursão, verificação formal e escalabilidade de longo prazo.
- A **Valar Group** se concentra na votação privada dos detentores de moedas, no desempenho dos nós, em PIR e na engenharia necessária para operar esses sistemas em produção.

Sua contribuição característica é tornar a governança blindada operacional. A votação do NU7 é o primeiro grande uso dessa pilha: os detentores provam saldos em Ironwood, carteiras como a ZODL e a Vizor podem integrar o fluxo, e qualquer pessoa pode auditar a apuração sem saber como um determinado detentor votou.

O trabalho da mesma equipe com nós e sincronização busca sustentar a outra metade desse quadro. A votação privada é menos útil se as carteiras não conseguem sincronizar, os nós não conseguem acompanhar ou as atualizações não podem ser implementadas rapidamente. Valar Group trata governança, software de nó e infraestrutura de carteiras como um único problema: tornar o Zcash privado utilizável em escala sem concentrar o poder operacional em uma única organização.

## Recursos

- [Site de Valar Group](https://valargroup.dev/)
- [Valar Group GitHub](https://github.com/valargroup)
- [Documentação do Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)
- [Configuração da chain de votação](https://setup.valargroup.org)
- [Auditor da apuração](https://tally.valargroup.org)
- [Interface do coordenador](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakura: sobre / equipe](https://zakura.com/about/)
- [Tópico do fórum sobre a votação dos detentores de moedas do NU7](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Tópico do fórum sobre a Coinholder Voting Chain](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
