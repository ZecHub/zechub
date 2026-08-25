<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Protocolo Crosslink

## TL;DR

* O protocolo Crosslink é uma proposta de design para a fase híbrida de Proof-of-Work/Proof-of-Stake (PoW/PoS) da Zcash. Integra PoW com um protocolo de Byzantine Fault Tolerance (BFT), permitindo finalidade assegurada desde que PoW ou PoS permaneça seguro.
* O PoS híbrido introduz notários que validam blocos com base em ZEC em stake — inicialmente estáticos, mais tarde eleitos com base em ZEC em stake.
* O Crosslink visa fornecer dois livros-razão: um **livro-razão finalizado (LOG_fin)** para segurança contra rollback, e um **livro-razão de menor latência (LOG_ba)** que o prolonga em não mais do que *L* blocos.
* Um **Modo de Segurança** é ativado se o livro-razão finalizado ficar para trás por mais de *L* blocos: o PoW continua, mas as atividades económicas ficam em pausa até que o problema seja resolvido.
* Ao longo do tempo, os validadores PoS receberão uma fatia crescente das recompensas, reduzindo os ganhos dos mineradores PoW; o protocolo introduz as alterações gradualmente.
* O protocolo está a ser desenvolvido pela Shielded Labs, com um roadmap para integrar o Crosslink 2* no cliente Zebra da Zcash.

## Explicação Principal

### Introdução: PoS Híbrido da Zcash e o Protocolo Crosslink

O Protocolo Crosslink é um desenvolvimento marcante na evolução da Zcash, orientando-a para um modelo **Hybrid Proof-of-Stake (PoS)** e **Proof-of-Work (PoW)**. O PoW tradicional, embora fiável para garantir a segurança da rede, enfrenta críticas pelo consumo de energia e pelos riscos de centralização associados à mineração industrial. O Crosslink introduz um sistema híbrido, combinando a robustez comprovada do PoW com as vantagens de eficiência e governação do PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Esta transição alinha-se com as tendências globais de inovação em blockchain, onde os projetos estão a migrar para mecanismos ambientalmente sustentáveis e descentralizados. O modelo de consenso duplo do Crosslink garante que a Zcash mantém as suas fortes garantias de privacidade criptográfica, ao mesmo tempo que evolui para responder aos desafios contemporâneos.

A abordagem híbrida Proof-of-Stake (PoS) combina o tradicional Proof-of-Work (PoW) com PoS, com o objetivo de resolver vulnerabilidades como ataques de 51%, ao mesmo tempo que mantém a descentralização e reduz o consumo de energia. O PoS híbrido introduz notários que validam blocos com base em ZEC em stake. Este mecanismo foi concebido para melhorar a segurança da cadeia e a validação de checkpoints, oferecendo uma alternativa mais robusta aos sistemas puramente PoW.

### Porque PoS/PoW híbrido como primeiro teste?

* Faz avançar o progresso em direção a PoS puro.
* Permite casos de uso simultâneos de mineração e staking, bem como sobreposição de ecossistemas.
* Mitiga possíveis problemas de segurança com o protocolo PoS até este ter maior stake de validadores e maior confiança.
* A abordagem geral já foi demonstrada pela Ethereum em produção.

### O que é o Crosslink

O protocolo Crosslink é uma proposta de design para a fase híbrida de Proof-of-Work/Proof-of-Stake (PoW/PoS) da Zcash. Integra PoW com um protocolo de Byzantine Fault Tolerance (BFT), permitindo finalidade assegurada desde que PoW ou PoS permaneça seguro. O design visa reforçar a segurança e a descentralização da rede ao incorporar validação com stake, mantendo ao mesmo tempo a participação dos mineradores. Uma característica-chave da proposta, chamada Crosslink 2, simplifica a arquitetura ao unificar os proponentes BFT e os mineradores. Esta abordagem simplificada minimiza alterações estruturais e permite o uso de uma camada BFT "dummy", tornando mais fácil a prototipagem e a implementação, mantendo elevados padrões de segurança.

O plano de implementação inclui um roadmap com custos estimados de engenharia para integrar o Crosslink 2* no cliente Zebra da Zcash. Esta implementação faseada foca-se em equilibrar os incentivos das partes interessadas, reduzir a disrupção e alinhar-se com os objetivos da Zcash em matéria de escalabilidade, usabilidade e descentralização. A crescente confiança nas robustas propriedades de segurança do protocolo reforça ainda mais o seu potencial como um passo-chave na evolução da Zcash. Ao abordar a eficiência energética e melhorar os mecanismos de consenso, o Crosslink oferece uma solução virada para o futuro face aos desafios em evolução da blockchain. Para mais detalhes, consulte o [repositório GitHub](https://github.com/ShieldedLabs/crosslink-deployment) e o [Fórum da Comunidade Zcash](https://forum.zcashcommunity.com).

### Finalidades e Objetivos do Crosslink

O Protocolo Crosslink foi concebido para responder a vários objetivos estratégicos cruciais para o futuro da Zcash:

1. **Descentralização**:
   * Ao incorporar PoS, a Zcash reduz a dependência de hardware PoW especializado (ASICs), que muitas vezes concentra o poder de mineração em alguns grandes operadores.
   * O PoS permite a participação de uma comunidade mais ampla, onde os detentores de moedas colocam os seus ativos em stake para proteger a rede, garantindo um consenso mais distribuído.
   * Ao introduzir validação com stake, o protocolo garante que os participantes económicos desempenham um papel ativo no consenso, reduzindo a dependência exclusiva da mineração.
2. **Governação Reforçada**:
   * Os detentores de moedas ganham direitos de voto através do staking, permitindo-lhes influenciar decisões sobre upgrades da rede, alocações de financiamento e prioridades do ecossistema. Este mecanismo democrático alinha a evolução do protocolo com os interesses da comunidade.
3. **Eficiência Energética**:
   * A transição parcial para PoS reduz significativamente as exigências energéticas, alinhando a Zcash com iniciativas globais de sustentabilidade. O PoS é inerentemente menos intensivo em recursos em comparação com o PoW computacionalmente pesado. Os sistemas híbridos visam reduzir o uso de energia em comparação com sistemas apenas PoW, mantendo ao mesmo tempo elevada segurança.
4. **Segurança Económica e Sustentabilidade**:
   * A combinação de PoW e PoS diversifica os incentivos económicos para os participantes da rede, assegurando segurança robusta sem depender excessivamente de um único mecanismo.
   * O staking também introduz um modelo de recompensas previsível para os participantes, criando uma proposta atrativa para investidores de longo prazo.
5. **Maior Segurança**: O Crosslink visa aumentar a resiliência da rede contra ataques de reorganização da cadeia ao integrar PoS juntamente com PoW.

## Visual / Analogia

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Imagine um serviço de encomendas que emite dois documentos diferentes para a mesma entrega. O primeiro é uma leitura de rastreamento: aparece rapidamente, diz-lhe onde a encomenda muito provavelmente está, e é corrigido ocasionalmente. O segundo é um comprovativo de entrega assinado: chega mais tarde, mas, uma vez existente, ninguém o contesta.

O livro-razão de menor latência é a leitura de rastreamento, e o livro-razão finalizado é o comprovativo assinado. Ambos descrevem a mesma cadeia de eventos; diferem na rapidez com que aparecem e na firmeza com que se mantêm.

O Modo de Segurança é o que o depósito faz quando os comprovativos assinados deixam de chegar enquanto as leituras continuam a acumular-se. As encomendas continuam a circular pelo edifício, mas o escritório deixa de efetuar pagamentos com base apenas nas leituras até que as assinaturas alcancem a situação.

## Análise Aprofundada

### Objetivos de Segurança e Desempenho do Crosslink

O protocolo Crosslink visa fornecer dois tipos de livros-razão para a Zcash: um **livro-razão finalizado (LOG_fin)** e um **livro-razão de menor latência (LOG_ba)**. O livro-razão finalizado garante segurança contra rollback sob pressupostos razoáveis sobre o protocolo Byzantine Fault Tolerance (BFT) ou blockchain (BC). Foi concebido para se manter ativo e seguro mesmo sob partições de rede, com uma latência ligeiramente superior ao dobro da atual blockchain da Zcash para confirmações de bloco equivalentes.

O livro-razão de menor latência prolonga o livro-razão finalizado em não mais do que *L* blocos. Garante segurança contra rollback apenas com base no protocolo blockchain e mantém latência e segurança não piores do que o modelo existente da Zcash. No design simplificado do Crosslink 2*, o livro-razão de menor latência simplifica o desenvolvimento e a adoção ao funcionar como uma cadeia PoW.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Disponibilidade Limitada e Modo de Segurança

O Crosslink incorpora um **Modo de Segurança** para responder aos riscos associados ao facto de o livro-razão de menor latência avançar muito mais do que o livro-razão finalizado. Isto evita discrepâncias, como estados de conta desequilibrados ou lacunas de segurança não verificadas em soluções temporárias por parte de prestadores de serviços. O Modo de Segurança é ativado se o livro-razão finalizado ficar para trás por mais do que uma constante *L* blocos. Durante este estado, a blockchain continua as operações PoW (garantindo segurança básica), mas as atividades económicas ficam suspensas até que o problema seja resolvido. Este mecanismo foi concebido para recuperar de condições excecionais, como grandes ataques, ao mesmo tempo que suporta políticas de rollback baseadas em governação.

### Detalhes Técnicos e Implementação

O Protocolo Crosslink está a ser desenvolvido e implementado ativamente pela Shielded Labs em colaboração com parceiros-chave do ecossistema, como a Zodl. A implementação do protocolo inclui:

* Estabelecer mecanismos de staking seguros para participantes PoS.
* Modificar a estrutura de recompensas para equilibrar os incentivos entre mineradores e stakers.
* Garantir compatibilidade retroativa e uma experiência de utilizador fluida durante a transição.
* Sistema de Notários: O protocolo incorpora notários que assinam blocos. Inicialmente, são usados notários estáticos, transitando depois para um sistema dinâmico em que os notários são eleitos com base em ZEC em stake.
* Lógica de Ativação: A introdução do Crosslink exige alterações às regras de consenso da Zcash, incluindo a definição do processo de distribuição de stake e a atualização das regras do protocolo de rede para suportar consenso híbrido.
* Implementação Faseada: O protocolo será lançado por fases para garantir a estabilidade da rede e a adaptação da comunidade. As fases iniciais concentram-se na implementação técnica, seguidas da integração de governação para selecionar os notários.

Pode explorar os detalhes técnicos e acompanhar o seu progresso através do [Repositório de Implementação do Crosslink no GitHub](https://github.com/ShieldedLabs/crosslink-deployment).

## Implicações Práticas

### Impacto na Receita dos Mineradores PoW

O Crosslink reconhece o papel fundamental dos mineradores PoW no desenvolvimento inicial da Zcash, ao mesmo tempo que se prepara para uma mudança gradual:

* **Redução das Recompensas por Bloco**:
  * Ao longo do tempo, os validadores PoS receberão uma fatia crescente das recompensas, reduzindo os ganhos dos mineradores PoW. Esta redistribuição reflete o papel decrescente do PoW no modelo híbrido.
* **Transição Justa**:
  * O protocolo introduz alterações gradualmente, assegurando que os mineradores têm tempo suficiente para se adaptar ou explorar novos papéis dentro do ecossistema Zcash, como a transição para staking ou o contributo para outros serviços da rede.
* **Mitigação dos Riscos de Centralização**:
  * As pools de staking PoS são concebidas para evitar a concentração de poder, oferecendo aos participantes mais pequenos a possibilidade de participar em pé de igualdade. Esta abordagem inclusiva contraria a concentração atual observada na mineração baseada em ASIC.
* Os mineradores PoW verão a sua receita reduzida, uma vez que parte da recompensa de bloco é realocada para validadores PoS. Esta realocação assegura um sistema de incentivos equilibrado, recompensando tanto mineradores como stakers por protegerem a rede.
* Está planeada uma transição gradual para mitigar o impacto económico nos mineradores, ao mesmo tempo que promove a participação das partes interessadas.

Este mecanismo de consenso duplo reforça o compromisso da Zcash com a privacidade, a sustentabilidade e a descentralização, posicionando-a como uma líder orientada para o futuro no espaço blockchain.

## Erros Comuns

**Interpretar o Crosslink como uma regra de consenso ativa**. Esta página descreve uma proposta de design com um plano de implementação faseado. A sua introdução exige alterações às regras de consenso da Zcash, e é para isso que servem o roadmap e o trabalho de integração no Zebra.

**Assumir que o PoS substitui a mineração**. O Crosslink é um design híbrido: a produção de blocos PoW continua em paralelo com a validação com stake. Mesmo no Modo de Segurança, a blockchain continua as operações PoW enquanto as atividades económicas ficam em pausa.

**Tratar "finalidade" como confirmação mais rápida**. O livro-razão finalizado foi concebido com uma latência ligeiramente superior ao dobro da atual blockchain da Zcash para confirmações de bloco equivalentes. O que acrescenta é segurança contra rollback, não velocidade — o livro-razão de menor latência é a vista rápida.

**Confundir os dois livros-razão**. O LOG_ba não é uma cadeia separada: prolonga o livro-razão finalizado em não mais do que *L* blocos e, no design Crosslink 2*, funciona como uma cadeia PoW.

## Páginas Relacionadas

- [Nó Completo Zebra](/zcash-tech/zebra-full-node) — o cliente no qual está planeada a integração do Crosslink 2*.
- [Nós Completos](/zcash-tech/full-nodes) — como os nós validam hoje as regras de consenso, antes de qualquer alteração para consenso híbrido.
- [Upgrades de Rede](/start-here/network-upgrades) — como as alterações às regras de consenso chegam à rede Zcash.
- [Política Monetária da Zcash](/start-here/zcash-monetary-policy) — a estrutura de recompensas por bloco que o Crosslink redistribuiria.

## Recursos Adicionais

- Perspetivas da comunidade: [Fórum da Comunidade Zcash - Discussões sobre Crosslink](https://forum.zcashcommunity.com)
- Atualizações oficiais: [Blog da Electric Coin Company](https://electriccoin.co)
- Foco na sustentabilidade: [Porque o PoS Híbrido é Importante para a Zcash](https://forum.zcashcommunity.com)

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
