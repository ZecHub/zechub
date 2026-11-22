<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# FROST e custódia por limiar para ZEC blindado

> Para os detalhes criptográficos completos do protocolo FROST, consulte a [página técnica sobre FROST](FROST.md).

A custódia por limiar com FROST aparece com frequência nas conversas sobre Zcash (foi a trilha principal do ZecHub Hackathon 2026), mas o conceito nem sempre é explicado em linguagem simples. Esta página explica o que ela significa, quando você realmente precisa dela, quais são os prós e contras e quais ferramentas a suportam hoje.

---

## Resumo

- O **FROST** permite que um grupo de detentores de chaves controle coletivamente um endereço blindado de Zcash sem que nenhuma pessoa sozinha tenha a chave privada completa.
- Um limiar **t-de-n** significa que t pessoas precisam coassinar para gastar; t-1 pessoas ou menos não conseguem movimentar os fundos sozinhas.
- As transações parecem iguais a qualquer outra transação blindada, sem nenhum rastro on-chain revelando que foi usada uma assinatura por limiar.
- Isso é fundamentalmente diferente do multisig transparente (que é público on-chain e que o Zcash suporta há muito tempo): o FROST funciona dentro da pool blindada.
- É útil para DAOs, corretoras, serviços de custódia, poupanças conjuntas e tesouros de equipes, ou seja, em qualquer situação em que um único ponto de falha da chave seja inaceitável.

---

## O que é FROST em linguagem simples?

Imagine três sócios, cada um com um pedaço de uma chave. Para gastar da carteira compartilhada, quaisquer dois dos três precisam concordar e coassinar. A transação resultante é idêntica a um envio individual comum: nenhum observador consegue perceber pela blockchain que várias pessoas estiveram envolvidas.

O FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) é o protocolo criptográfico que torna isso possível para o Zcash blindado. Ele foi criado por Chelsea Komlo (University of Waterloo / Zcash Foundation) e Ian Goldberg.

As principais propriedades:

- **Limiar**: apenas t de n signatários precisam participar (por exemplo, 2-de-3, 3-de-5)
- **Blindado**: funciona dentro da pool de privacidade Orchard, e os valores, o remetente e o destinatário permanecem privados
- **Indistinguível**: a assinatura final parece igual à de qualquer outra transação blindada Zcash
- **Não custodiante**: nenhuma parte tem a chave completa em momento algum, nem mesmo o coordenador

---

## Quando você deve usar a custódia por limiar?

A custódia por limiar faz sentido quando **perder uma chave ou uma pessoa não deve significar perder os fundos**.

| Situação | Por que a custódia por limiar ajuda |
|-----------|----------------------------|
| **DAO ou tesouro de equipe** | Nenhum administrador sozinho consegue esvaziar os fundos unilateralmente; é necessário consenso |
| **Corretora ou custodiante** | Distribui o risco das chaves entre zonas de segurança ou funcionários |
| **Armazenamento a frio pessoal (com familiares de confiança)** | 2-de-3 entre você e dois familiares: se você morrer ou perder o acesso, os fundos não se perdem |
| **Escrow** | Comprador, vendedor e árbitro têm uma parte cada; os fundos são liberados quando dois concordam |
| **Distribuição de subsídios de alto valor** | No estilo da ZCG: exige vários signatários independentes antes do pagamento |
| **Gestão de chaves de desenvolvedores** | Evita ameaças internas: nenhum engenheiro sozinho consegue esvaziar um fundo do protocolo |

Você provavelmente **não** precisa de custódia por limiar para uma carteira pessoal que só você controla, para valores pequenos ou para situações em que o esforço adicional de coordenação supera a redução de risco.

---

## Qual é a diferença em relação ao multisig transparente?

O Zcash suporta há muito tempo o multisig transparente, em que várias chaves são necessárias para gastar de um t-address. Mas o multisig transparente tem um custo de privacidade significativo: **a estrutura multisig, todas as chaves públicas e todos os signatários ficam visíveis na blockchain**.

O FROST resolve isso operando dentro da pool blindada:

| | Multisig transparente | Limiar FROST (blindado) |
|--|---------------------|--------------------------|
| Pool | Transparente (pública) | Orchard (blindada) |
| Signatários visíveis on-chain | Sim, todas as chaves públicas ficam expostas | Não, indistinguível de um gasto com um único signatário |
| Valores visíveis | Sim | Não |
| Coordenação necessária | Script on-chain | Rodada de comunicação off-chain |
| Privacidade | Nenhuma | Privacidade blindada completa |

---

## Prós, contras e limitações

O FROST é poderoso, mas traz contrapartidas reais que você deve entender antes de usá-lo:

### Esforço de coordenação
Os signatários precisam estar online ao mesmo tempo (ou quase) para concluir uma rodada de assinatura. Se os seus t signatários estiverem espalhados por fusos horários diferentes ou tiverem conexões instáveis, gastar exige uma coordenação que uma carteira individual não exige.

### Sem assinatura se o quórum não estiver disponível
Se detentores de chaves suficientes estiverem indisponíveis (doentes, viajando, sem responder), os fundos ficam temporariamente impossíveis de gastar. Escolha o seu limiar e o número de partes com cuidado: 2-de-3 é mais resiliente do que 2-de-2.

### Cerimônia de geração de chaves
Configurar o FROST exige uma cerimônia de geração distribuída de chaves (DKG) em que todos os n participantes estejam online juntos. É um evento único, mas precisa ser feito com cuidado: se algum participante for comprometido durante a DKG, a segurança fica prejudicada.

### As ferramentas ainda estão amadurecendo
O FROST para Zcash blindado é relativamente novo. O padrão IETF (draft-irtf-cfrg-frost) está maduro, mas as integrações em carteiras são limitadas. Espere algumas arestas a aparar em comparação com uma carteira padrão de chave única.

### Complexidade da recuperação
Perder uma parte da chave não é o fim do mundo (esse é justamente o objetivo do limiar), mas os planos de recuperação precisam ser documentados com antecedência. Quem guarda os backups? O que acontece se duas partes forem perdidas ao mesmo tempo?

---

## Quem está construindo com FROST no Zcash?

### Zcash Foundation — frost.zfnd.org
A Zcash Foundation lançou uma implementação funcional do FROST e um site de demonstração. Esta é a implementação de referência usada para testes e desenvolvimento.

### Demo Ywallet FROST
A Ywallet teve uma integração de demonstração inicial do FROST, explicada no [guia da demo Ywallet FROST](/guides/Ywallet_FROST_Demo). A Ywallet não recebe mais manutenção e não será atualizada para o Ironwood, então leia o guia como contexto e não como algo para executar hoje. A Zkool, do mesmo desenvolvedor, é a sucessora mantida e lista o multisig FROST entre os seus recursos.

### ZecHub Hackathon 2026: projetos da trilha FROST

A trilha FROST foi a mais concorrida do ZecHub Hackathon 2026. Projetos de destaque:

- **ZecVault**: escrow blindado 2-de-3 liquidado na mainnet (limiar FROST)
- **Steward**: custódia por limiar para Zcash blindado, com uma UX focada em recuperação

### Coinbase
A Coinbase construiu uma implementação do FROST em produção para os seus sistemas de assinatura por limiar (para Bitcoin), com modificações que eliminam a etapa de pré-processamento e distribuem o papel de agregador entre todos os participantes. A experiência deles valida o modelo de segurança do FROST em escala de produção.

---

## Como funciona uma sessão de assinatura (simplificado)

1. **Configuração (uma vez):** Todos os n participantes realizam uma cerimônia de geração distribuída de chaves (DKG). Cada um recebe uma parte privada, e uma chave pública compartilhada é derivada. Nenhuma parte conhece a chave privada completa.

2. **Coordenar os signatários:** Quando é preciso fazer um gasto, um coordenador (que pode ser um dos signatários) coleta compromissos de t participantes dispostos a assinar.

3. **Rodada 1:** Cada signatário participante gera um nonce e transmite um compromisso (público, não sensível).

4. **Rodada 2:** Cada signatário participante calcula a sua assinatura parcial usando a sua parte privada e a transmite.

5. **Agregação:** O coordenador combina as t assinaturas parciais em uma única assinatura Schnorr final, indistinguível on-chain de uma assinatura de uma única parte.

6. **Transmissão:** A transação é transmitida para a rede Zcash normalmente.

Se algum signatário enviar uma assinatura parcial inválida, o protocolo o identifica e aborta (ele é excluído das sessões futuras). A coordenação acontece off-chain: a blockchain só vê a transação final.

---

## Como escolher os parâmetros do limiar

| Configuração | Resiliência | Risco |
|-------|-----------|------|
| 1-de-1 | Sem resiliência: ponto único de falha | Perda da chave = perda permanente |
| 2-de-2 | Os dois signatários são obrigatórios: sem tolerância a falhas | Um indisponível = fundos congelados |
| 2-de-3 | Uma parte pode ser perdida ou ficar indisponível | Margem de segurança menor que 3-de-5 |
| 3-de-5 | Duas partes podem ser perdidas; segurança forte | Mais esforço de coordenação |
| 3-de-7 | Nível institucional; tolera duas falhas | Alto custo de coordenação |

Um ponto de partida prático para a maioria das equipes: **2-de-3** (resiliente, coordenação mínima) ou **3-de-5** (institucional, segurança maior).

---

## Páginas relacionadas

- [FROST: análise técnica aprofundada](FROST.md) — detalhes criptográficos do protocolo (DKG, rodadas de assinatura, provas de segurança)
- [Guia da demo Ywallet FROST](/guides/Ywallet_FROST_Demo) — contexto; a Ywallet não recebe mais manutenção
- [Viewing Keys](Viewing_Keys.md) — acesso somente leitura a endereços blindados (complementar à custódia por limiar)
- [Ativos blindados Zcash](Zcash_Shielded_Assets.md) — o FROST também é uma infraestrutura essencial para a emissão de ZSAs

## Recursos

- [Artigo de pesquisa sobre o FROST (Komlo e Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [Rascunho do padrão IETF FROST (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Implementação FROST da Zcash Foundation](https://frost.zfnd.org)
- [Chelsea Komlo: o que são assinaturas por limiar? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase: assinaturas digitais por limiar](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST: Robust Async Schnorr Threshold Signatures (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
