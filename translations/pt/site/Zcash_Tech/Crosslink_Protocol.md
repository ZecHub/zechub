### Protocolo Crosslink

#### **Introdução: Zcash Híbrido PoS e o Protocolo Crosslink**

O Protocolo Crosslink é um desenvolvimento marcante na evolução da Zcash, conduzindo-a para um modelo **Híbrido de Proof-of-Stake (PoS)** e **Proof-of-Work (PoW)**. O PoW tradicional, embora confiável para garantir a segurança da rede, enfrenta críticas pelo consumo de energia e pelos riscos de centralização associados à mineração industrial. O Crosslink introduz um sistema híbrido, unindo a robustez comprovada do PoW com as vantagens de eficiência e governança do PoS.

![imagem](https://github.com/user-attachments/assets/a2ffb19d-e570-4723-b669-a66e14fc6b71)

Essa transição está alinhada com as tendências globais de inovação em blockchain, nas quais os projetos estão migrando para mecanismos ambientalmente sustentáveis e descentralizados. O modelo de consenso duplo do Crosslink garante que a Zcash mantenha suas fortes garantias de privacidade criptográfica enquanto evolui para enfrentar os desafios contemporâneos.

A abordagem híbrida de Proof-of-Stake (PoS) combina o tradicional Proof-of-Work (PoW) com PoS, com o objetivo de enfrentar vulnerabilidades como ataques de 51% enquanto mantém a descentralização e reduz o consumo de energia. O PoS híbrido introduz notários que validam blocos com base em ZEC em stake. Esse mecanismo foi projetado para melhorar a segurança da cadeia e a validação de checkpoints, oferecendo uma alternativa mais robusta aos sistemas puramente PoW​.

Por que usar PoS/PoW Híbrido como primeiro teste?
Isso representa progresso em direção ao PoS puro
Isso permite casos de uso simultâneos de mineração e staking, além de integração entre ecossistemas.
Isso mitiga possíveis problemas de segurança do protocolo PoS até que ele tenha maior stake de validadores e mais confiança.
A abordagem geral foi demonstrada pelo Ethereum em produção

---


### CROSSLINK
O protocolo Crosslink é um design proposto para a fase híbrida de Proof-of-Work/Proof-of-Stake (PoW/PoS) da Zcash. Ele integra PoW com um protocolo de Byzantine Fault Tolerance (BFT), permitindo finalidade assegurada desde que PoW ou PoS permaneça seguro. O design tem como objetivo fortalecer a segurança e a descentralização da rede ao incorporar validação com stake, mantendo a participação dos mineradores. Um recurso-chave da proposta, chamado Crosslink 2, simplifica a arquitetura ao unificar propositores BFT e mineradores. Essa abordagem simplificada minimiza mudanças estruturais e permite o uso de uma camada BFT "dummy", tornando mais fácil prototipar e implantar, mantendo altos padrões de segurança.

O plano de implementação inclui um roteiro com custos estimados de engenharia para integrar o Crosslink 2* ao cliente Zebra da Zcash. Essa implantação em fases foca em equilibrar os incentivos das partes interessadas, reduzir a disrupção e alinhar-se aos objetivos da Zcash de escalabilidade, usabilidade e descentralização. A crescente confiança nas robustas propriedades de segurança do protocolo reforça ainda mais seu potencial como um passo-chave na evolução da Zcash. Ao abordar a eficiência energética e aprimorar os mecanismos de consenso, o Crosslink oferece uma solução voltada para o futuro diante dos desafios em evolução da blockchain. Para mais detalhes, consulte o [repositório no GitHub](https://github.com/ShieldedLabs/crosslink-deployment) e o [Fórum da Comunidade Zcash](https://forum.zcashcommunity.com).

![imagem](https://github.com/user-attachments/assets/b34afda4-fe33-448f-b0dd-279fd6cef1f5)


#### **Objetivos e Metas do Crosslink**

O Protocolo Crosslink foi projetado para atender a vários objetivos estratégicos cruciais para o futuro da Zcash:

1. **Descentralização**:
   - Ao incorporar PoS, a Zcash reduz a dependência de hardware PoW especializado (ASICs), que frequentemente concentra o poder de mineração entre poucos grandes operadores.
   - O PoS permite a participação de uma comunidade mais ampla, na qual os detentores de moedas fazem stake de seus ativos para proteger a rede, garantindo um consenso mais distribuído.
   - Ao introduzir validação com stake, o protocolo garante que participantes econômicos desempenhem um papel ativo no consenso, reduzindo a dependência exclusiva da mineração.

2. **Governança Aprimorada**:
   - Os detentores de moedas obtêm direitos de voto por meio do staking, permitindo-lhes influenciar decisões sobre upgrades da rede, alocação de financiamento e prioridades do ecossistema. Esse mecanismo democrático alinha a evolução do protocolo aos interesses da comunidade.

3. **Eficiência Energética**:
   - A transição parcial para PoS reduz significativamente as demandas energéticas, alinhando a Zcash às iniciativas globais de sustentabilidade. O PoS é inerentemente menos intensivo em recursos em comparação com o PoW computacionalmente pesado. Sistemas híbridos visam reduzir o uso de energia em comparação com sistemas exclusivamente PoW, mantendo alta segurança​

4. **Segurança Econômica e Sustentabilidade**:
   - A combinação de PoW e PoS diversifica os incentivos econômicos para os participantes da rede, garantindo segurança robusta sem dependência excessiva de um único mecanismo.
   - O staking também introduz um modelo de recompensa previsível para os participantes, criando uma proposta atraente para investidores de longo prazo.
 
5. Maior Segurança: o Crosslink busca aumentar a resiliência da rede contra ataques de reorganização de cadeia ao integrar PoS junto com PoW.


### Metas de Segurança e Desempenho do Crosslink

O protocolo Crosslink tem como objetivo fornecer dois tipos de ledger para a Zcash: um **ledger finalizado (LOG_fin)** e um **ledger de menor latência (LOG_ba)**. O ledger finalizado garante segurança contra rollback sob pressupostos razoáveis sobre o protocolo de Byzantine Fault Tolerance (BFT) ou o protocolo blockchain (BC). Ele foi projetado para permanecer ativo e seguro mesmo sob partições de rede, com uma latência ligeiramente superior ao dobro da blockchain atual da Zcash para confirmações de bloco equivalentes.

O ledger de menor latência estende o ledger finalizado em no máximo *L* blocos. Ele garante segurança contra rollback apenas sob o protocolo blockchain e mantém latência e segurança não piores que o modelo existente da Zcash. No design simplificado Crosslink 2*, o ledger de menor latência simplifica o desenvolvimento e a adoção ao funcionar como uma cadeia PoW.

![imagem](https://github.com/user-attachments/assets/fd039664-4852-4fb0-8c88-0615f1ed116e)


### Disponibilidade Limitada e Modo de Segurança

O Crosslink incorpora um **Modo de Segurança** para lidar com riscos associados ao ledger de menor latência avançar muito à frente do ledger finalizado. Isso evita discrepâncias, como estados de conta desequilibrados ou lacunas de segurança não verificadas em soluções temporárias adotadas por provedores de serviço. O Modo de Segurança é ativado se o ledger finalizado ficar para trás em mais de uma constante de *L* blocos. Durante esse estado, a blockchain continua as operações PoW (garantindo segurança básica), mas as atividades econômicas são pausadas até que o problema seja resolvido. Esse mecanismo foi projetado para se recuperar de condições excepcionais, como grandes ataques, ao mesmo tempo em que dá suporte a políticas de rollback baseadas em governança.


---

#### **Impacto na Receita dos Mineradores de PoW**

O Crosslink reconhece o papel fundamental dos mineradores de PoW no desenvolvimento inicial da Zcash enquanto se prepara para uma mudança gradual:

- **Recompensas de Bloco Reduzidas**:
   - Com o tempo, validadores PoS receberão uma parcela crescente das recompensas, reduzindo os ganhos dos mineradores de PoW. Essa redistribuição reflete o papel decrescente do PoW no modelo híbrido.
   
- **Transição Justa**:
   - O protocolo introduz mudanças gradualmente, garantindo que os mineradores tenham tempo suficiente para se adaptar ou explorar novos papéis dentro do ecossistema Zcash, como migrar para staking ou contribuir para outros serviços da rede.

- **Mitigação dos Riscos de Centralização**:
   - Pools de staking PoS são projetados para evitar concentração de poder, oferecendo aos participantes menores a chance de participar em condições iguais. Essa abordagem inclusiva combate a concentração atual observada na mineração baseada em ASIC.

- Os mineradores de PoW terão sua receita reduzida à medida que parte da recompensa de bloco for realocada para validadores PoS. Essa realocação garante um sistema de incentivos equilibrado, recompensando tanto mineradores quanto stakers por proteger a rede.
- Está planejada uma transição gradual para mitigar o impacto econômico sobre os mineradores enquanto promove a participação das partes interessadas​

---

#### **Detalhes Técnicos e Implantação**

O Protocolo Crosslink está sendo ativamente desenvolvido e implantado pela Shielded Labs em colaboração com parceiros-chave do ecossistema, como Zodl. A implementação do protocolo inclui:
- Estabelecimento de mecanismos seguros de staking para participantes de PoS.
- Modificação da estrutura de recompensas para equilibrar os incentivos entre mineradores e stakers.
- Garantia de compatibilidade retroativa e de uma experiência de usuário fluida durante a transição.
- Sistema de Notários: o protocolo incorpora notários que aprovam blocos. Inicialmente, são usados notários estáticos, com transição para um sistema dinâmico no qual os notários são eleitos com base em ZEC em stake.​
- Lógica de Ativação: a introdução do Crosslink exige mudanças nas regras de consenso da Zcash, incluindo a definição do processo de distribuição de stake e a atualização das regras do protocolo de rede para dar suporte ao consenso híbrido​
- Implantação em Fases: o protocolo será lançado em etapas para garantir a estabilidade da rede e a adaptação da comunidade. As fases iniciais focam na implementação técnica, seguidas pela integração da governança para selecionar notários​.

Você pode explorar os detalhes técnicos e acompanhar seu progresso por meio do [Repositório de Implantação do Crosslink no GitHub](https://github.com/ShieldedLabs/crosslink-deployment).

---

#### **Recursos Adicionais**
- Insights da comunidade: [Fórum da Comunidade Zcash - Discussões sobre Crosslink](https://forum.zcashcommunity.com)
- Atualizações oficiais: [Blog da Electric Coin Company](https://electriccoin.co)
- Foco em sustentabilidade: [Por que o PoS Híbrido é importante para a Zcash](https://forum.zcashcommunity.com)

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

Esse mecanismo de consenso duplo reforça o compromisso da Zcash com privacidade, sustentabilidade e descentralização, posicionando-a como uma líder voltada para o futuro no espaço blockchain.
