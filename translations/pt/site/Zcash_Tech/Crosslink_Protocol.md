<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Crosslink Protocol

## TL;DR

* O protocolo Crosslink é um design proposto para a fase híbrida Proof-of-Work/Proof-of-Stake (PoW/PoS) de Zcash. Integra PoW com um protocolo de Tolerância a Falhas Bizantinas (BFT), permitindo uma finalidade assegurada desde que PoW ou PoS permaneça seguro.
* O PoS híbrido introduz notários que validam blocos com base em ZEC em staking — inicialmente estáticos, mais tarde eleitos com base em ZEC em staking.
* Crosslink visa disponibilizar dois livros-razão: um **livro-razão finalizado (LOG_fin)** para segurança contra reversões, e um **livro-razão de menor latência (LOG_ba)** que o estende em não mais de *L* blocos.
* Um **Modo de Segurança** é ativado se o livro-razão finalizado ficar atrasado em mais de *L* blocos: o PoW continua, mas as atividades económicas são pausadas até que o problema seja resolvido.
* Com o tempo, os validadores PoS receberão uma parcela crescente das recompensas, reduzindo os ganhos dos mineradores PoW; o protocolo introduz mudanças gradualmente.
* O protocolo está a ser desenvolvido por Shielded Labs, com um roteiro para integrar Crosslink 2* no cliente Zebra de Zcash.
* Crosslink não está ativo na mainnet de Zcash. Funciona na Feature Net de Shielded Labs, uma rede de testes à qual qualquer pessoa pode aderir. Consulte abaixo “Em que ponto está Crosslink”.

## Explicação Principal

### Introdução: PoS Híbrido de Zcash e o Protocolo Crosslink

O Protocolo Crosslink é um desenvolvimento marcante na evolução de Zcash, orientando-o para um modelo de **Proof-of-Stake (PoS) Híbrido** e **Proof-of-Work (PoW)**. O PoW tradicional, embora fiável para garantir a segurança da rede, é criticado pelo consumo de energia e pelos riscos de centralização associados à mineração industrial. Crosslink introduz um sistema híbrido, combinando a robustez comprovada do PoW com as vantagens de eficiência e governação do PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Esta transição está alinhada com as tendências globais de inovação em blockchain, nas quais os projetos estão a migrar para mecanismos ambientalmente sustentáveis e descentralizados. O modelo de consenso duplo da Crosslinks garante que Zcash mantém as suas fortes garantias de privacidade criptográfica, ao mesmo tempo que evolui para responder aos desafios contemporâneos.

A abordagem híbrida Proof-of-Stake (PoS) combina o tradicional Proof-of-Work (PoW) com PoS, visando resolver vulnerabilidades como ataques de 51%, ao mesmo tempo que mantém a descentralização e reduz o consumo de energia. O PoS híbrido introduz notários que validam blocos com base em ZEC em staking. Este mecanismo foi concebido para melhorar a segurança da cadeia e a validação de pontos de controlo, oferecendo uma alternativa mais robusta aos sistemas exclusivamente PoW.

### Porquê PoS/PoW híbrido como primeiro teste?

* Constitui um avanço rumo ao PoS puro.
* Permite casos de uso simultâneos de mineração e staking, bem como cruzamento entre ecossistemas.
* Mitiga possíveis problemas de segurança com o protocolo PoS até que este tenha maior stake e confiança dos validadores.
* A abordagem geral foi demonstrada pelo Ethereum em produção.

### O que é Crosslink

O protocolo Crosslink é um design proposto para a fase híbrida Proof-of-Work/Proof-of-Stake (PoW/PoS) de Zcash. Integra PoW com um protocolo de Tolerância a Falhas Bizantinas (BFT), permitindo uma finalidade assegurada desde que PoW ou PoS permaneça seguro. O design visa reforçar a segurança e a descentralização da rede através da incorporação de validação com staking, mantendo simultaneamente a participação dos mineradores. Uma funcionalidade essencial da proposta, denominada Crosslink 2, simplifica a arquitetura ao unificar os proponentes BFT e os mineradores. Esta abordagem simplificada minimiza alterações estruturais e permite o uso de uma camada BFT “fictícia”, facilitando a criação de protótipos e a implementação, ao mesmo tempo que mantém padrões elevados de segurança.

O plano de implementação inclui um roteiro com custos de engenharia estimados para integrar Crosslink 2* no cliente Zebra de Zcash. Esta implementação faseada concentra-se em equilibrar os incentivos das partes interessadas, reduzir perturbações e alinhar-se com os objetivos de Zcash para escalabilidade, usabilidade e descentralização. A crescente confiança nas robustas propriedades de segurança do protocolo consolida ainda mais o seu potencial como um passo fundamental na evolução de Zcash. Ao abordar a eficiência energética e melhorar os mecanismos de consenso, Crosslink oferece uma solução orientada para o futuro face aos desafios em evolução da blockchain. Para mais detalhes, consulte o repositório [GitHub](https://github.com/ShieldedLabs/zebra-crosslink) e o Fórum da Comunidade [Zcash](https://forum.zcashcommunity.com).

### Finalidades e Objetivos de Crosslink

O Protocolo Crosslink foi concebido para abordar vários objetivos estratégicos cruciais para o futuro de Zcash:

1. **Descentralização**:
   * Ao incorporar PoS, Zcash reduz a dependência de hardware PoW especializado (ASICs), que frequentemente concentra o poder de mineração entre alguns grandes operadores.
   * O PoS permite a participação de uma comunidade mais ampla, na qual os detentores de moedas colocam os seus ativos em staking para proteger a rede, garantindo um consenso mais distribuído.
   * Ao introduzir validação com staking, o protocolo garante que os participantes económicos desempenham um papel ativo no consenso, reduzindo a dependência exclusiva da mineração.
2. **Governação Melhorada**:
   * Os detentores de moedas obtêm direitos de voto através do staking, permitindo-lhes influenciar decisões sobre atualizações da rede, alocações de financiamento e prioridades do ecossistema. Este mecanismo democrático alinha a evolução do protocolo com os interesses da comunidade.
3. **Eficiência Energética**:
   * A transição parcial para PoS reduz significativamente as necessidades energéticas, alinhando Zcash com iniciativas globais de sustentabilidade. O PoS é intrinsecamente menos intensivo em recursos quando comparado com o PoW computacionalmente exigente. Os sistemas híbridos visam reduzir o uso de energia em comparação com sistemas exclusivamente PoW, mantendo simultaneamente elevada segurança.
4. **Segurança Económica e Sustentabilidade**:
   * A combinação de PoW e PoS diversifica os incentivos económicos para os participantes da rede, garantindo segurança robusta sem dependência excessiva de um único mecanismo.
   * O staking também introduz um modelo de recompensas previsível para os participantes, criando uma proposta atrativa para investidores de longo prazo.
5. **Segurança Acrescida**: Crosslink visa melhorar a resiliência da rede contra ataques de reorganização da cadeia ao integrar PoS juntamente com PoW.

## Visual / Analogia

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Pense num serviço de entregas que emite dois documentos diferentes para a mesma entrega. O primeiro é uma atualização de rastreio: surge rapidamente, indica-lhe onde a encomenda provavelmente está e, ocasionalmente, é corrigido. O segundo é um comprovativo de entrega assinado: chega mais tarde, mas, quando existe, ninguém o contesta.

O livro-razão de menor latência é a atualização de rastreio, e o livro-razão finalizado é o comprovativo assinado. Ambos descrevem a mesma cadeia de acontecimentos; diferem na rapidez com que surgem e na firmeza com que se mantêm.

O Modo de Segurança é o que o depósito faz quando os comprovativos assinados deixam de chegar enquanto as atualizações continuam a acumular-se. As encomendas continuam a circular pelo edifício — mas o escritório deixa de efetuar pagamentos com base apenas nas atualizações até que as assinaturas acompanhem o ritmo.

## Análise Detalhada

### Objetivos de Segurança e Desempenho de Crosslink

O protocolo Crosslink visa fornecer dois tipos de livros-razão para Zcash: um **livro-razão finalizado (LOG_fin)** e um **livro-razão de menor latência (LOG_ba)**. O livro-razão finalizado garante segurança contra reversões sob pressupostos razoáveis sobre o protocolo de Tolerância a Falhas Bizantinas (BFT) ou de blockchain (BC). Foi concebido para permanecer ativo e seguro mesmo durante partições de rede, com uma latência ligeiramente superior ao dobro da blockchain atual de Zcash para confirmações de bloco equivalentes.

O livro-razão de menor latência estende o livro-razão finalizado em não mais de *L* blocos. Garante segurança contra reversões apenas sob o protocolo de blockchain e mantém latência e segurança não piores do que o modelo existente de Zcash. No design simplificado Crosslink 2*, o livro-razão de menor latência simplifica o desenvolvimento e a adoção ao funcionar como uma cadeia PoW.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Disponibilidade Limitada e Modo de Segurança

Crosslink incorpora um **Modo de Segurança** para lidar com os riscos associados a um livro-razão de menor latência que avance muito à frente do livro-razão finalizado. Isto evita discrepâncias, tais como estados de conta desequilibrados ou lacunas de segurança não verificadas em soluções temporárias de prestadores de serviços. O Modo de Segurança é ativado se o livro-razão finalizado ficar atrasado em mais do que uma constante de *L* blocos. Durante este estado, a blockchain continua as operações PoW (garantindo a segurança básica), mas as atividades económicas são pausadas até que o problema seja resolvido. Este mecanismo foi concebido para recuperar de condições excecionais, como ataques graves, ao mesmo tempo que suporta políticas de reversão baseadas em governação.

### Detalhes Técnicos e Implementação

O Protocolo Crosslink está a ser ativamente desenvolvido e implementado por Shielded Labs em colaboração com parceiros fundamentais do ecossistema, como ZODL. A implementação do protocolo inclui:

* Estabelecer mecanismos de staking seguros para participantes PoS.
* Modificar a estrutura de recompensas para equilibrar os incentivos entre mineradores e stakers.
* Garantir compatibilidade retroativa e uma experiência de utilizador sem interrupções durante a transição.
* Sistema de Notários: o protocolo incorpora notários que aprovam blocos. Inicialmente, são utilizados notários estáticos, transitando para um sistema dinâmico em que os notários são eleitos com base em ZEC em staking.
* Lógica de Ativação: a introdução de Crosslink requer alterações às regras de consenso de Zcash, incluindo a definição do processo de distribuição de stake e a atualização das regras do protocolo de rede para suportar consenso híbrido.
* Implementação Faseada: o protocolo será lançado por etapas para garantir a estabilidade da rede e a adaptação da comunidade. As fases iniciais concentram-se na implementação técnica, seguidas pela integração da governação para selecionar notários.

O protótipo anterior e a respetiva documentação encontram-se no repositório zebra-crosslink de [ no GitHub](https://github.com/ShieldedLabs/zebra-crosslink) e em [O Livro zebra-crosslink](https://shieldedlabs.github.io/zebra-crosslink/). O trabalho atual é descrito na secção seguinte.

### Em que ponto está Crosslink

Crosslink continua a ser uma proposta. As FAQ de Shielded Labs [Crosslink](https://shieldedlabs.net/crosslink-faq/) afirmam que “teria de passar pelo processo de governação padrão de Zcash” antes de poder ser ativado na mainnet.

O que existe atualmente é a **Feature Net**: uma rede de testes gerida por Shielded Labs, com a sua própria moeda de teste, cTAZ, onde qualquer pessoa pode minerar, fazer staking e executar um finalizador. A [Versão 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), lançada em 1 de outubro de 2026, começa como proof-of-work simples e ativa Crosslink por etapas: staking a partir do bloco 20 736, a primeira lista de finalizadores obtida no bloco 34 560 e finalidade BFT a partir do bloco 36 288 ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)).

Duas coisas nesta página mudaram desde que foi escrita:

* **A função aqui chamada notário é chamada finalizador** no software e nas notas de lançamento de Shielded Labs. Os stakers delegam moedas a um finalizador, e os finalizadores com mais stake votam para finalizar blocos.
* **O código mudou de localização.** O repositório zebra-crosslink acima foi atualizado pela última vez em abril de 2026. As versões de Feature Net provêm de [crosslink_monolith](https://github.com/ShieldedLabs/crosslink_monolith/releases), e o design está documentado no livro [Crosslink](https://shieldedlabs.github.io/crosslink_book/).

Para experimentar, siga o guia [Crosslink Feature Net](/guides/crosslink-feature-net). Para observar a rede sem executar nada, abra o separador Crosslink em [ZecHub Tools](https://zechub.wiki/tools?tool=crosslink).

## Implicações Práticas

### Impacto nas Receitas dos Mineradores PoW

Crosslink reconhece o papel fundamental dos mineradores PoW no desenvolvimento inicial de Zcash, ao mesmo tempo que se prepara para uma mudança gradual:

* **Recompensas de Bloco Reduzidas**:
  * Com o tempo, os validadores PoS receberão uma parcela crescente das recompensas, reduzindo os ganhos dos mineradores PoW. Esta redistribuição reflete o papel decrescente do PoW no modelo híbrido.
* **Transição Justa**:
  * O protocolo introduz mudanças gradualmente, garantindo que os mineradores têm tempo suficiente para se adaptar ou explorar novas funções no ecossistema de Zcash, como a transição para staking ou a contribuição para outros serviços de rede.
* **Mitigação dos Riscos de Centralização**:
  * Os pools de staking PoS são concebidos para evitar a concentração de poder, oferecendo aos participantes menores a oportunidade de participar em pé de igualdade. Esta abordagem inclusiva contraria a concentração atual observada na mineração baseada em ASIC.
* Os mineradores PoW terão receitas reduzidas, pois parte da recompensa de bloco é realocada para os validadores PoS. Esta realocação garante um sistema de incentivos equilibrado, recompensando tanto os mineradores como os stakers por protegerem a rede.
* Está prevista uma transição gradual para mitigar o impacto económico nos mineradores, promovendo simultaneamente a participação das partes interessadas.

Este mecanismo de consenso duplo reforça o compromisso de Zcash com a privacidade, a sustentabilidade e a descentralização, posicionando-o como líder orientado para o futuro no espaço blockchain.

## Erros Comuns

**Interpretar Crosslink como uma regra de consenso ativa**. Esta página descreve um design proposto com um plano de implementação faseado. A sua introdução requer alterações às regras de consenso de Zcash, que é o objetivo do roteiro e do trabalho de integração de Zebra.

**Assumir que o PoS substitui a mineração**. Crosslink é um design híbrido: a produção de blocos PoW continua juntamente com a validação com staking. Mesmo no Modo de Segurança, a blockchain continua as operações PoW enquanto as atividades económicas são pausadas.

**Tratar a “finalidade” como confirmação mais rápida**. O livro-razão finalizado foi concebido para uma latência ligeiramente superior ao dobro da blockchain atual de Zcash para confirmações de bloco equivalentes. O que acrescenta é segurança contra reversões, não velocidade — o livro-razão de menor latência é a visão rápida.

**Confundir os dois livros-razão**. LOG_ba não é uma cadeia separada: estende o livro-razão finalizado em não mais de *L* blocos e, no design Crosslink 2*, funciona como uma cadeia PoW.

## Páginas Relacionadas

- [Crosslink Feature Net](/guides/crosslink-feature-net) — instale a aplicação de desktop Feature Net, faça staking para um finalizador e verifique a sua posição.
- [Zebra Nó Completo](/zcash-tech/zebra-full-node) — o cliente no qual está planeada a integração de Crosslink 2*.
- [ Nós Completos](/zcash-tech/full-nodes) — como os nós validam atualmente as regras de consenso, antes de qualquer alteração de consenso híbrido.
- [ Atualizações de Rede](/start-here/network-upgrades) — como as alterações às regras de consenso chegam à rede Zcash.
- [Zcash Política Monetária](/start-here/zcash-monetary-policy) — a estrutura de recompensas de bloco que Crosslink redistribuiria.

## Recursos Adicionais

- Discussão comunitária: [Crosslink: Feature Net Incentivado, no Fórum da Comunidade Zcash](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)
- Atualizações oficiais: [Crosslink em Shielded Labs](https://shieldedlabs.net/crosslink/) e as versões [Feature Net](https://github.com/ShieldedLabs/crosslink_monolith/releases)
- Referência de design: [O livro Crosslink](https://shieldedlabs.github.io/crosslink_book/)

  Referência:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div>
