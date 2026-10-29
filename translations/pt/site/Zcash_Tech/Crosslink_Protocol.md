<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Crosslink Protocol

## TL;DR

* O protocolo Crosslink é um projeto proposto para a fase híbrida Proof-of-Work/Proof-of-Stake (PoW/PoS) do Zcash. Ele integra PoW a um protocolo de Tolerância a Falhas Bizantinas (BFT), permitindo finalidade garantida desde que PoW ou PoS permaneça seguro.
* O PoS híbrido introduz notários que validam blocos com base em ZEC em staking — inicialmente estáticos e, posteriormente, eleitos com base em ZEC em staking.
* O Crosslink visa fornecer dois livros-razão: um **livro-razão finalizado (LOG_fin)** para segurança contra reversões e um **livro-razão de menor latência (LOG_ba)** que o estende em no máximo *L* blocos.
* Um **Modo de segurança** é ativado se o livro-razão finalizado ficar atrasado em mais de *L* blocos: o PoW continua, mas as atividades econômicas são pausadas até que o problema seja resolvido.
* Com o tempo, os validadores de PoS receberão uma parcela crescente das recompensas, reduzindo os ganhos dos mineradores de PoW; o protocolo introduz mudanças gradualmente.
* O protocolo está sendo desenvolvido pela Shielded Labs, com um roteiro para integrar o Crosslink 2* ao cliente Zebra do Zcash.
* O Crosslink não está ativo na mainnet do Zcash. Ele funciona na Feature Net da Shielded Labs, uma rede de testes à qual qualquer pessoa pode aderir. Consulte abaixo "Em que ponto está o Crosslink".

## Explicação principal

### Introdução: PoS híbrido do Zcash e o protocolo Crosslink

O protocolo Crosslink é um desenvolvimento marcante na evolução do Zcash, direcionando-o para um modelo de **Proof-of-Stake (PoS) híbrido** e **Proof-of-Work (PoW)**. O PoW tradicional, embora confiável para garantir a segurança da rede, é criticado pelo consumo de energia e pelos riscos de centralização associados à mineração industrial. O Crosslink introduz um sistema híbrido, combinando a robustez comprovada do PoW com as vantagens de eficiência e governança do PoS.

![Imagem](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Essa transição está alinhada às tendências globais de inovação em blockchain, nas quais os projetos estão migrando para mecanismos ambientalmente sustentáveis e descentralizados. O modelo de consenso duplo do Crosslink garante que o Zcash mantenha suas fortes garantias de privacidade criptográfica enquanto evolui para enfrentar desafios contemporâneos.

A abordagem híbrida Proof-of-Stake (PoS) combina o tradicional Proof-of-Work (PoW) com PoS, visando resolver vulnerabilidades como ataques de 51%, ao mesmo tempo que mantém a descentralização e reduz o consumo de energia. O PoS híbrido introduz notários que validam blocos com base em ZEC em staking. Esse mecanismo foi projetado para melhorar a segurança da chain e a validação de pontos de controle, oferecendo uma alternativa mais robusta aos sistemas exclusivamente de PoW.

### Por que PoS/PoW híbrido como primeiro teste?

* Constitui um avanço rumo ao PoS puro.
* Permite casos de uso simultâneos de mineração e staking, bem como integração entre ecossistemas.
* Mitiga possíveis problemas de segurança com o protocolo PoS até que ele tenha maior stake e confiança dos validadores.
* A abordagem geral foi demonstrada pelo Ethereum em produção.

### O que é o Crosslink

O protocolo Crosslink é um projeto proposto para a fase híbrida Proof-of-Work/Proof-of-Stake (PoW/PoS) do Zcash. Ele integra PoW a um protocolo de Tolerância a Falhas Bizantinas (BFT), permitindo finalidade garantida desde que PoW ou PoS permaneça seguro. O projeto visa reforçar a segurança e a descentralização da rede por meio da incorporação de validação com staking, mantendo simultaneamente a participação dos mineradores. Uma funcionalidade essencial da proposta, denominada Crosslink 2, simplifica a arquitetura ao unificar os proponentes BFT e os mineradores. Essa abordagem simplificada minimiza alterações estruturais e permite o uso de uma camada BFT "fictícia", facilitando a criação de protótipos e a implementação, ao mesmo tempo que mantém padrões elevados de segurança.

O plano de implementação inclui um roteiro com custos estimados de engenharia para integrar o Crosslink 2* ao cliente Zebra do Zcash. Essa implementação em fases concentra-se em equilibrar os incentivos das partes interessadas, reduzir interrupções e alinhar-se aos objetivos do Zcash de escalabilidade, usabilidade e descentralização. A crescente confiança nas robustas propriedades de segurança do protocolo consolida ainda mais seu potencial como um passo fundamental na evolução do Zcash. Ao abordar a eficiência energética e melhorar os mecanismos de consenso, o Crosslink oferece uma solução voltada para o futuro diante dos desafios em evolução da blockchain. Para mais detalhes, consulte o repositório [GitHub](https://github.com/ShieldedLabs/zebra-crosslink) e o Fórum da Comunidade [Zcash](https://forum.zcashcommunity.com).

### Finalidades e objetivos do Crosslink

O protocolo Crosslink foi projetado para abordar vários objetivos estratégicos cruciais para o futuro do Zcash:

1. **Descentralização**:
   * Ao incorporar PoS, o Zcash reduz a dependência de hardware especializado de PoW (ASICs), que frequentemente concentra o poder de mineração entre alguns grandes operadores.
   * O PoS permite a participação de uma comunidade mais ampla, na qual os detentores de moedas colocam seus ativos em staking para proteger a rede, garantindo um consenso mais distribuído.
   * Ao introduzir validação com staking, o protocolo garante que os participantes econômicos desempenhem um papel ativo no consenso, reduzindo a dependência exclusiva da mineração.
2. **Governança aprimorada**:
   * Os detentores de moedas obtêm direitos de voto por meio do staking, o que lhes permite influenciar decisões sobre atualizações da rede, alocações de financiamento e prioridades do ecossistema. Esse mecanismo democrático alinha a evolução do protocolo aos interesses da comunidade.
3. **Eficiência energética**:
   * A transição parcial para PoS reduz significativamente as necessidades energéticas, alinhando o Zcash a iniciativas globais de sustentabilidade. O PoS é inerentemente menos intensivo em recursos quando comparado ao PoW computacionalmente exigente. Os sistemas híbridos visam reduzir o uso de energia em comparação com sistemas exclusivamente de PoW, mantendo simultaneamente alta segurança.
4. **Segurança econômica e sustentabilidade**:
   * A combinação de PoW e PoS diversifica os incentivos econômicos para os participantes da rede, garantindo segurança robusta sem dependência excessiva de um único mecanismo.
   * O staking também introduz um modelo de recompensas previsível para os participantes, criando uma proposta atraente para investidores de longo prazo.
5. **Segurança ampliada**: o Crosslink visa melhorar a resiliência da rede contra ataques de reorganização da chain ao integrar PoS ao PoW.

## Visual / analogia

![Imagem](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Pense em um serviço de entregas que emite dois documentos diferentes para a mesma entrega. O primeiro é uma atualização de rastreamento: aparece rapidamente, informa onde a encomenda provavelmente está e, ocasionalmente, é corrigido. O segundo é um comprovante de entrega assinado: chega mais tarde, mas, quando existe, ninguém o contesta.

O livro-razão de menor latência é a atualização de rastreamento, e o livro-razão finalizado é o comprovante assinado. Ambos descrevem a mesma chain de eventos; diferem na rapidez com que aparecem e na firmeza com que se mantêm.

O Modo de segurança é o que o depósito faz quando os comprovantes assinados deixam de chegar enquanto as atualizações continuam se acumulando. As encomendas continuam circulando pelo edifício — mas o escritório deixa de efetuar pagamentos com base apenas nas atualizações até que as assinaturas acompanhem o ritmo.

## Análise detalhada

### Objetivos de segurança e desempenho do Crosslink

O protocolo Crosslink visa fornecer dois tipos de livros-razão para o Zcash: um **livro-razão finalizado (LOG_fin)** e um **livro-razão de menor latência (LOG_ba)**. O livro-razão finalizado garante segurança contra reversões sob pressupostos razoáveis sobre o protocolo de Tolerância a Falhas Bizantinas (BFT) ou de blockchain (BC). Ele foi projetado para permanecer ativo e seguro mesmo durante partições de rede, com uma latência ligeiramente superior ao dobro da blockchain atual do Zcash para confirmações de bloco equivalentes.

O livro-razão de menor latência estende o livro-razão finalizado em no máximo *L* blocos. Ele garante segurança contra reversões apenas sob o protocolo de blockchain e mantém latência e segurança não piores do que o modelo existente do Zcash. No projeto simplificado Crosslink 2*, o livro-razão de menor latência simplifica o desenvolvimento e a adoção ao funcionar como uma chain de PoW.

![Imagem](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Disponibilidade limitada e modo de segurança

O Crosslink incorpora um **Modo de segurança** para lidar com os riscos associados a um livro-razão de menor latência que avance muito à frente do livro-razão finalizado. Isso evita discrepâncias, como estados de conta desequilibrados ou lacunas de segurança não verificadas em soluções temporárias de prestadores de serviços. O Modo de segurança é ativado se o livro-razão finalizado ficar atrasado em mais de uma constante de *L* blocos. Durante esse estado, a blockchain continua as operações de PoW (garantindo a segurança básica), mas as atividades econômicas são pausadas até que o problema seja resolvido. Esse mecanismo foi projetado para se recuperar de condições excepcionais, como ataques graves, ao mesmo tempo que oferece suporte a políticas de reversão baseadas em governança.

### Detalhes técnicos e implementação

O protocolo Crosslink está sendo ativamente desenvolvido e implementado pela Shielded Labs em colaboração com parceiros fundamentais do ecossistema, como a ZODL. A implementação do protocolo inclui:

* Estabelecer mecanismos seguros de staking para participantes de PoS.
* Modificar a estrutura de recompensas para equilibrar os incentivos entre mineradores e stakers.
* Garantir compatibilidade retroativa e uma experiência do usuário sem interrupções durante a transição.
* Sistema de notários: o protocolo incorpora notários que aprovam blocos. Inicialmente, são usados notários estáticos, com transição para um sistema dinâmico em que os notários são eleitos com base em ZEC em staking.
* Lógica de ativação: a introdução do Crosslink requer alterações às regras de consenso do Zcash, incluindo a definição do processo de distribuição de stake e a atualização das regras do protocolo de rede para oferecer suporte ao consenso híbrido.
* Implementação em fases: o protocolo será lançado por etapas para garantir a estabilidade da rede e a adaptação da comunidade. As fases iniciais concentram-se na implementação técnica, seguidas pela integração da governança para selecionar notários.

O protótipo anterior e sua documentação estão no [repositório zebra-crosslink no GitHub](https://github.com/ShieldedLabs/zebra-crosslink) e em [The zebra-crosslink Book](https://shieldedlabs.github.io/zebra-crosslink/). O trabalho atual é descrito na próxima seção.

### Em que ponto está o Crosslink

O Crosslink continua sendo uma proposta. O [FAQ do Crosslink](https://shieldedlabs.net/crosslink-faq/) da Shielded Labs afirma que ele "precisaria passar pelo processo padrão de governança do Zcash" antes de poder ser ativado na mainnet.

O que existe atualmente é a **Feature Net**: uma rede de testes operada pela Shielded Labs, com sua própria moeda de teste, cTAZ, onde qualquer pessoa pode minerar, fazer staking e executar um finalizador. A [Versão 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), lançada em 1 de outubro de 2026, começa como proof-of-work simples e ativa o Crosslink por etapas: staking a partir do bloco 20,736, a primeira lista de finalizadores obtida no bloco 34,560 e finalidade BFT a partir do bloco 36,288 ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)).

Duas coisas nesta página mudaram desde que ela foi escrita:

* **A função chamada de notário aqui é chamada de finalizador** no software e nas notas de lançamento da Shielded Labs. Os stakers delegam moedas a um finalizador, e os finalizadores com mais stake votam para finalizar blocos.
* **O código mudou de localização.** O repositório zebra-crosslink acima foi atualizado pela última vez em abril de 2026. As versões da Feature Net vêm de [crosslink_monolith](https://github.com/ShieldedLabs/crosslink_monolith/releases), e o projeto está documentado no [livro Crosslink](https://shieldedlabs.github.io/crosslink_book/).

Para experimentar você mesmo, siga o guia [Crosslink Feature Net](/guides/crosslink-feature-net). Para observar a rede sem executar nada, abra a aba Crosslink em [ZecHub Tools](https://zechub.wiki/tools?tool=crosslink).

## Implicações práticas

### Impacto nas receitas dos mineradores de PoW

O Crosslink reconhece o papel fundamental dos mineradores de PoW no desenvolvimento inicial do Zcash, ao mesmo tempo que se prepara para uma mudança gradual:

* **Recompensas de bloco reduzidas**:
  * Com o tempo, os validadores de PoS receberão uma parcela crescente das recompensas, reduzindo os ganhos dos mineradores de PoW. Essa redistribuição reflete o papel decrescente do PoW no modelo híbrido.
* **Transição justa**:
  * O protocolo introduz mudanças gradualmente, garantindo que os mineradores tenham tempo suficiente para se adaptar ou explorar novas funções no ecossistema do Zcash, como fazer a transição para staking ou contribuir com outros serviços de rede.
* **Mitigação dos riscos de centralização**:
  * Os pools de staking de PoS são projetados para evitar a concentração de poder, oferecendo aos participantes menores a oportunidade de participar em pé de igualdade. Essa abordagem inclusiva combate a concentração atual observada na mineração baseada em ASIC.
* Os mineradores de PoW terão receitas reduzidas, pois parte da recompensa de bloco é realocada para os validadores de PoS. Essa realocação garante um sistema de incentivos equilibrado, recompensando tanto os mineradores quanto os stakers por protegerem a rede.
* Está prevista uma transição gradual para mitigar o impacto econômico sobre os mineradores, promovendo simultaneamente a participação das partes interessadas.

Esse mecanismo de consenso duplo reforça o compromisso do Zcash com a privacidade, a sustentabilidade e a descentralização, posicionando-o como um líder voltado para o futuro no espaço da blockchain.

## Erros comuns

**Interpretar o Crosslink como uma regra de consenso ativa**. Esta página descreve um projeto proposto com um plano de implementação em fases. Sua introdução requer alterações às regras de consenso do Zcash, que é o objetivo do roteiro e do trabalho de integração do Zebra.

**Supor que o PoS substitui a mineração**. O Crosslink é um projeto híbrido: a produção de blocos de PoW continua juntamente com a validação com staking. Mesmo no Modo de segurança, a blockchain continua as operações de PoW enquanto as atividades econômicas são pausadas.

**Tratar a "finalidade" como confirmação mais rápida**. O livro-razão finalizado foi projetado para ter uma latência ligeiramente superior ao dobro da blockchain atual do Zcash para confirmações de bloco equivalentes. O que ele acrescenta é segurança contra reversões, não velocidade — o livro-razão de menor latência é a visualização rápida.

**Confundir os dois livros-razão**. LOG_ba não é uma chain separada: ele estende o livro-razão finalizado em no máximo *L* blocos e, no projeto Crosslink 2*, funciona como uma chain de PoW.

## Páginas relacionadas

- [Crosslink Feature Net](/guides/crosslink-feature-net) — instale o app de desktop da Feature Net, faça staking para um finalizador e verifique sua posição.
- [Zebra Nó integral](/zcash-tech/zebra-full-node) — o cliente ao qual está planejada a integração do Crosslink 2*.
- [Nós integrais](/zcash-tech/full-nodes) — como os nós validam atualmente as regras de consenso, antes de qualquer alteração de consenso híbrido.
- [Atualizações da rede](/start-here/network-upgrades) — como as alterações às regras de consenso chegam à rede do Zcash.
- [Política monetária do Zcash](/start-here/zcash-monetary-policy) — a estrutura de recompensas de bloco que o Crosslink redistribuiria.

## Recursos adicionais

- Discussão da comunidade: [Crosslink: Incentivized Feature Net, no Fórum da Comunidade Zcash](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)
- Atualizações oficiais: [Crosslink na Shielded Labs](https://shieldedlabs.net/crosslink/) e as [versões da Feature Net](https://github.com/ShieldedLabs/crosslink_monolith/releases)
- Referência de projeto: [The Crosslink book](https://shieldedlabs.github.io/crosslink_book/)

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
