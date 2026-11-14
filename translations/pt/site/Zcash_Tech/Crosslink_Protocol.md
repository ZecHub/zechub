<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Protocolo Crosslink

## TL;DR

* O protocolo Crosslink é um design proposto para a etapa híbrida de prova de trabalho/prova de participação (PoW/PoS) do Zcash. Ele integra o PoW a um protocolo de tolerância a falhas bizantinas (BFT), permitindo finalidade garantida desde que o PoW ou o PoS permaneça seguro.
* O PoS híbrido introduz notários que validam blocos com base em ZEC em staking — inicialmente estáticos, depois eleitos com base em ZEC em staking.
* O Crosslink pretende oferecer dois livros-razão: um **livro-razão finalizado (LOG_fin)**, que garante segurança contra reversões, e um **livro-razão de menor latência (LOG_ba)**, que o estende em no máximo *L* blocos.
* Um **modo de segurança** é ativado se o livro-razão finalizado ficar mais de *L* blocos para trás: o PoW continua, mas as atividades econômicas são pausadas até que o problema seja resolvido.
* Com o tempo, os validadores PoS receberão uma parcela crescente das recompensas, reduzindo os ganhos dos mineradores PoW; o protocolo introduz as mudanças gradualmente.
* O protocolo está sendo desenvolvido pela Shielded Labs, com um roteiro para integrar o Crosslink 2* ao cliente Zebra da Zcash.
* O Crosslink não está ativo na mainnet do Zcash. Ele roda na Feature Net da Shielded Labs, uma rede de teste da qual qualquer pessoa pode participar. Veja "Onde o Crosslink está" abaixo.

## Explicação principal

### Introdução: o PoS híbrido do Zcash e o protocolo Crosslink

O protocolo Crosslink é um marco na evolução do Zcash, conduzindo-o rumo a um modelo híbrido de **prova de participação (PoS)** e **prova de trabalho (PoW)**. O PoW tradicional, embora confiável para garantir a segurança da rede, enfrenta críticas pelo consumo de energia e pelos riscos de centralização associados à mineração industrial. O Crosslink introduz um sistema híbrido, unindo a robustez comprovada do PoW à eficiência e às vantagens de governança do PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Essa transição está alinhada às tendências globais de inovação em blockchain, em que os projetos estão migrando para mecanismos ambientalmente sustentáveis e descentralizados. O modelo de consenso duplo do Crosslink garante que o Zcash mantenha suas fortes garantias criptográficas de privacidade enquanto evolui para enfrentar os desafios contemporâneos.

A abordagem de prova de participação (PoS) híbrida combina a prova de trabalho (PoW) tradicional com o PoS, buscando resolver vulnerabilidades como ataques de 51% enquanto mantém a descentralização e reduz o consumo de energia. O PoS híbrido introduz notários que validam blocos com base em ZEC em staking. Esse mecanismo foi projetado para melhorar a segurança da chain e a validação de checkpoints, oferecendo uma alternativa mais robusta aos sistemas puramente PoW.

### Por que PoS/PoW híbrido como primeiro teste?

* Representa um avanço rumo ao PoS puro.
* Permite casos de uso simultâneos de mineração e staking, além da integração entre ecossistemas.
* Mitiga possíveis problemas de segurança do protocolo PoS até que ele tenha mais stake de validadores e mais confiança.
* A abordagem geral já foi demonstrada pelo Ethereum em produção.

### O que é o Crosslink

O protocolo Crosslink é um design proposto para a etapa híbrida de prova de trabalho/prova de participação (PoW/PoS) do Zcash. Ele integra o PoW a um protocolo de tolerância a falhas bizantinas (BFT), permitindo finalidade garantida desde que o PoW ou o PoS permaneça seguro. O design busca fortalecer a segurança e a descentralização da rede ao incorporar a validação com staking, mantendo a participação dos mineradores. Uma característica fundamental da proposta, chamada Crosslink 2, simplifica a arquitetura ao unificar os proponentes BFT e os mineradores. Essa abordagem simplificada minimiza as mudanças estruturais e permite o uso de uma camada BFT "fictícia", facilitando a prototipagem e a implantação sem abrir mão de altos padrões de segurança.

O plano de implementação inclui um roteiro com custos de engenharia estimados para integrar o Crosslink 2* ao cliente Zebra da Zcash. Essa implantação em fases se concentra em equilibrar os incentivos das partes interessadas, reduzir interrupções e se alinhar aos objetivos do Zcash de escalabilidade, usabilidade e descentralização. A crescente confiança nas robustas propriedades de segurança do protocolo reforça ainda mais seu potencial como um passo fundamental na evolução do Zcash. Ao tratar da eficiência energética e aprimorar os mecanismos de consenso, o Crosslink oferece uma solução voltada para o futuro diante dos desafios em evolução da blockchain. Para mais detalhes, consulte o [repositório do GitHub](https://github.com/ShieldedLabs/zebra-crosslink) e o [Fórum da comunidade Zcash](https://forum.zcashcommunity.com).

### Metas e objetivos do Crosslink

O protocolo Crosslink foi projetado para atender a vários objetivos estratégicos cruciais para o futuro do Zcash:

1. **Descentralização**:
   * Ao incorporar o PoS, o Zcash reduz a dependência de hardware especializado de PoW (ASICs), que muitas vezes concentra o poder de mineração nas mãos de poucos grandes operadores.
   * O PoS permite a participação de uma comunidade mais ampla, em que os detentores de moedas fazem staking de seus ativos para proteger a rede, garantindo um consenso mais distribuído.
   * Ao introduzir a validação com staking, o protocolo garante que os participantes econômicos tenham um papel ativo no consenso, reduzindo a dependência exclusiva da mineração.
2. **Governança aprimorada**:
   * Os detentores de moedas obtêm direito de voto por meio do staking, o que lhes permite influenciar decisões sobre atualizações da rede, alocação de recursos e prioridades do ecossistema. Esse mecanismo democrático alinha a evolução do protocolo aos interesses da comunidade.
3. **Eficiência energética**:
   * A transição parcial para o PoS reduz significativamente a demanda de energia, alinhando o Zcash às iniciativas globais de sustentabilidade. O PoS é, por natureza, menos intensivo em recursos do que o PoW, que exige muito processamento. Os sistemas híbridos buscam reduzir o uso de energia em comparação com sistemas apenas PoW, mantendo alta segurança.
4. **Segurança e sustentabilidade econômicas**:
   * Combinar PoW e PoS diversifica os incentivos econômicos para os participantes da rede, garantindo uma segurança robusta sem depender excessivamente de um único mecanismo.
   * O staking também introduz um modelo de recompensas previsível para os participantes, criando uma proposta atraente para investidores de longo prazo.
5. **Maior segurança**: o Crosslink busca aumentar a resiliência da rede contra ataques de reorganização da chain ao integrar o PoS junto ao PoW.

## Visual / analogia

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Pense em uma transportadora que emite dois documentos diferentes para a mesma entrega. O primeiro é um registro de rastreamento: ele aparece rapidamente, informa onde o pacote provavelmente está e, de vez em quando, é corrigido. O segundo é um comprovante de entrega assinado: ele chega mais tarde, mas, uma vez emitido, ninguém o contesta.

O livro-razão de menor latência é o registro de rastreamento, e o livro-razão finalizado é o comprovante assinado. Ambos descrevem a mesma sequência de eventos; eles diferem na rapidez com que aparecem e na firmeza com que se mantêm.

O modo de segurança é o que o depósito faz quando os comprovantes assinados param de chegar enquanto os registros de rastreamento continuam se acumulando. Os pacotes continuam circulando pelo prédio — mas o escritório para de fazer pagamentos com base apenas nos registros de rastreamento até que as assinaturas os alcancem.

## Aprofundamento

### Objetivos de segurança e desempenho do Crosslink

O protocolo Crosslink pretende oferecer dois tipos de livro-razão para o Zcash: um **livro-razão finalizado (LOG_fin)** e um **livro-razão de menor latência (LOG_ba)**. O livro-razão finalizado garante segurança contra reversões sob suposições razoáveis sobre o protocolo de tolerância a falhas bizantinas (BFT) ou o protocolo de blockchain (BC). Ele foi projetado para permanecer ativo e seguro mesmo durante partições da rede, com uma latência um pouco maior que o dobro da blockchain atual do Zcash para confirmações de blocos equivalentes.

O livro-razão de menor latência estende o livro-razão finalizado em no máximo *L* blocos. Ele garante segurança contra reversões apenas sob o protocolo de blockchain e mantém latência e segurança não piores que as do modelo atual do Zcash. No design simplificado do Crosslink 2*, o livro-razão de menor latência facilita o desenvolvimento e a adoção ao funcionar como uma chain PoW.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Disponibilidade limitada e modo de segurança

O Crosslink incorpora um **modo de segurança** para lidar com os riscos de o livro-razão de menor latência avançar muito à frente do livro-razão finalizado. Isso evita discrepâncias, como saldos de contas desequilibrados ou falhas de segurança não verificadas em soluções temporárias adotadas por provedores de serviços. O modo de segurança é ativado se o livro-razão finalizado ficar para trás por mais de uma constante de *L* blocos. Nesse estado, a blockchain continua as operações de PoW (garantindo a segurança básica), mas as atividades econômicas são pausadas até que o problema seja resolvido. Esse mecanismo foi projetado para recuperar a rede de condições excepcionais, como ataques de grande porte, ao mesmo tempo que dá suporte a políticas de reversão baseadas em governança.

### Detalhes técnicos e implantação

O protocolo Crosslink está sendo ativamente desenvolvido e implantado pela Shielded Labs em colaboração com parceiros importantes do ecossistema, como a ZODL. A implementação do protocolo inclui:

* Estabelecer mecanismos de staking seguros para os participantes do PoS.
* Modificar a estrutura de recompensas para equilibrar os incentivos entre mineradores e stakers.
* Garantir a compatibilidade retroativa e uma experiência de usuário contínua durante a transição.
* Sistema de notários: o protocolo incorpora notários que aprovam os blocos. Inicialmente são usados notários estáticos, com a transição para um sistema dinâmico em que os notários são eleitos com base em ZEC em staking.
* Lógica de ativação: a introdução do Crosslink exige mudanças nas regras de consenso do Zcash, incluindo a definição do processo de distribuição do stake e a atualização das regras do protocolo de rede para dar suporte ao consenso híbrido.
* Implantação em fases: o protocolo será lançado em etapas para garantir a estabilidade da rede e a adaptação da comunidade. As fases iniciais se concentram na implementação técnica, seguidas pela integração da governança para a seleção dos notários.

O protótipo anterior e sua documentação estão no [repositório zebra-crosslink no GitHub](https://github.com/ShieldedLabs/zebra-crosslink) e no [livro do zebra-crosslink](https://shieldedlabs.github.io/zebra-crosslink/). O trabalho atual é descrito na próxima seção.

### Onde o Crosslink está

O Crosslink ainda é uma proposta. O [FAQ do Crosslink](https://shieldedlabs.net/crosslink-faq/) da Shielded Labs afirma que ele "precisaria passar pelo processo padrão de governança do Zcash" antes de poder ser ativado na mainnet.

O que existe hoje é a **Feature Net**: uma rede de teste operada pela Shielded Labs, com sua própria moeda de teste, a cTAZ, em que qualquer pessoa pode minerar, fazer staking e operar um finalizador. A [versão 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), lançada em 1º de outubro de 2026, começa como prova de trabalho pura e ativa o Crosslink em etapas: staking a partir do bloco 20.736, a primeira lista de finalizadores definida no bloco 34.560 e finalidade BFT a partir do bloco 36.288 ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)).

Duas coisas nesta página mudaram desde que ela foi escrita:

* **O papel chamado aqui de notário é chamado de finalizador** no software e nas notas de lançamento da Shielded Labs. Os stakers delegam moedas a um finalizador, e os finalizadores com mais stake votam para finalizar os blocos.
* **O código mudou de lugar.** O repositório zebra-crosslink citado acima foi atualizado pela última vez em abr de 2026. Os lançamentos do Feature Net vêm do [crosslink_monolith](https://github.com/ShieldedLabs/crosslink_monolith/releases), e o design está descrito no [livro do Crosslink](https://shieldedlabs.github.io/crosslink_book/).

Para experimentar você mesmo, siga o guia [Crosslink Feature Net](/guides/crosslink-feature-net). Para acompanhar a rede sem executar nada, abra a aba Crosslink em [Ferramentas ZecHub](https://zechub.wiki/tools?tool=crosslink).

## Implicações práticas

### Impacto na receita dos mineradores PoW

O Crosslink reconhece o papel fundamental dos mineradores PoW no desenvolvimento inicial do Zcash, ao mesmo tempo que se prepara para uma mudança gradual:

* **Recompensas de bloco reduzidas**:
  * Com o tempo, os validadores PoS receberão uma parcela crescente das recompensas, reduzindo os ganhos dos mineradores PoW. Essa redistribuição reflete o papel cada vez menor do PoW no modelo híbrido.
* **Transição justa**:
  * O protocolo introduz as mudanças gradualmente, garantindo que os mineradores tenham tempo suficiente para se adaptar ou explorar novos papéis no ecossistema Zcash, como migrar para o staking ou contribuir com outros serviços da rede.
* **Mitigação dos riscos de centralização**:
  * Os pools de staking PoS foram projetados para evitar a concentração de poder, oferecendo aos participantes menores a chance de participar em condições de igualdade. Essa abordagem inclusiva combate a concentração observada atualmente na mineração baseada em ASICs.
* Os mineradores PoW terão sua receita reduzida, já que parte da recompensa de bloco será realocada para os validadores PoS. Essa realocação garante um sistema de incentivos equilibrado, recompensando tanto mineradores quanto stakers por protegerem a rede.
* Está prevista uma transição gradual para mitigar o impacto econômico sobre os mineradores e, ao mesmo tempo, incentivar a participação das partes interessadas.

Esse mecanismo de consenso duplo reforça o compromisso do Zcash com a privacidade, a sustentabilidade e a descentralização, posicionando-o como um líder visionário no espaço blockchain.

## Erros comuns

**Interpretar o Crosslink como uma regra de consenso ativa**. Esta página descreve um design proposto com um plano de implantação em fases. Introduzi-lo exige mudanças nas regras de consenso do Zcash, e é para isso que servem o roteiro e o trabalho de integração com o Zebra.

**Presumir que o PoS substitui a mineração**. O Crosslink é um design híbrido: a produção de blocos por PoW continua junto com a validação com staking. Mesmo no modo de segurança, a blockchain continua as operações de PoW enquanto as atividades econômicas ficam pausadas.

**Tratar a "finalidade" como uma confirmação mais rápida**. O livro-razão finalizado foi projetado para uma latência um pouco maior que o dobro da blockchain atual do Zcash para confirmações de blocos equivalentes. O que ele acrescenta é segurança contra reversões, não velocidade — o livro-razão de menor latência é a visão rápida.

**Confundir os dois livros-razão**. O LOG_ba não é uma chain separada: ele estende o livro-razão finalizado em no máximo *L* blocos e, no design do Crosslink 2*, funciona como uma chain PoW.

## Páginas relacionadas

- [Crosslink Feature Net](/guides/crosslink-feature-net) — instale o app de desktop Feature Net, faça staking com um finalizador e confira sua posição.
- [Nó integral Zebra](/zcash-tech/zebra-full-node) — o cliente ao qual está previsto integrar o Crosslink 2*.
- [Nós integrais](/zcash-tech/full-nodes) — como os nós validam as regras de consenso hoje, antes de qualquer mudança para o consenso híbrido.
- [Atualizações da rede](/start-here/network-upgrades) — como as mudanças nas regras de consenso chegam à rede Zcash.
- [Política monetária do Zcash](/start-here/zcash-monetary-policy) — a estrutura de recompensas de bloco que o Crosslink redistribuiria.

## Recursos adicionais

- Discussão da comunidade: [Crosslink: Feature Net incentivada, no Fórum da comunidade Zcash](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)
- Atualizações oficiais: [Crosslink em Shielded Labs](https://shieldedlabs.net/crosslink/) e os [lançamentos do Feature Net](https://github.com/ShieldedLabs/crosslink_monolith/releases)
- Referência de design: [O livro do Crosslink](https://shieldedlabs.github.io/crosslink_book/)

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
