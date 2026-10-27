<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# FROST & Custódia por threshold para ZEC blindado

> Para todos os detalhes criptográficos do protocolo FROST, consulte a [página técnica do FROST](FROST.md).

A custódia por threshold com FROST surge constantemente nas conversas sobre Zcash — foi o tema principal no ZecHub Hackathon 2026 — mas o conceito nem sempre é explicado em linguagem simples. Esta página aborda o que significa, quando você realmente precisa dela, os trade-offs e quais ferramentas a oferecem atualmente.

---

## Resumo rápido

- **FROST** permite que um grupo de detentores de chaves controle coletivamente um endereço blindado do Zcash sem que qualquer pessoa detenha a chave privada completa.
- Um threshold **t-of-n** significa: t pessoas precisam coassinar para gastar; quaisquer t-1 ou menos não conseguem mover os fundos sozinhas.
- As transações parecem qualquer outra transação blindada — não há nenhum rastro on-chain que revele que a assinatura por threshold foi usada.
- Isso é fundamentalmente diferente da multisig transparente (que é pública on-chain e que o Zcash oferece há muito tempo) — FROST funciona dentro do pool blindado.
- É útil para DAOs, corretoras, serviços de custódia, poupanças conjuntas e tesouros de equipes — em qualquer contexto onde um único ponto de falha da chave seja inaceitável.

---

## O que é FROST em linguagem simples?

Imagine três sócios de uma empresa, cada um com uma parte de uma chave. Para gastar a partir da carteira compartilhada, quaisquer dois dos três precisam concordar e coassinar. A transação resultante parece idêntica a um envio individual normal — nenhum observador consegue perceber pela blockchain que várias pessoas estiveram envolvidas.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) é o protocolo criptográfico que torna isso possível para o Zcash blindado. Foi criado por Chelsea Komlo (University of Waterloo / Zcash Foundation) e Ian Goldberg.

As propriedades principais:

- **Threshold**: apenas t signatários de n precisam participar (por exemplo, 2-of-3, 3-of-5)
- **Blindado**: funciona dentro do pool de privacidade Orchard — valores, remetente e destinatário permanecem privados
- **Indistinguível**: a assinatura final parece qualquer outra transação blindada do Zcash
- **Sem custódia**: nenhuma parte jamais detém a chave completa — nem mesmo o coordenador

---

## Quando você deve usar custódia por threshold?

A custódia por threshold faz sentido quando **perder uma chave ou uma pessoa não deve significar perder os fundos**.

| Situação | Por que a custódia por threshold ajuda |
|-----------|----------------------------|
| **Tesouraria de DAO ou equipe** | Nenhum administrador sozinho pode drenar fundos unilateralmente; exige consenso |
| **Corretora ou custodiante** | Distribui o risco da chave entre várias zonas de segurança ou funcionários |
| **Cold storage pessoal (com família de confiança)** | 2-of-3 entre você + dois familiares — se você morrer ou perder o acesso, os fundos não serão perdidos |
| **Escrow** | Comprador, vendedor e árbitro detêm cada um uma parte; os fundos são liberados quando dois concordam |
| **Desembolso de subsídios de alto valor** | No estilo da ZCG: exige vários signatários independentes antes do pagamento |
| **Gestão de chaves de desenvolvedores** | Evita ameaças internas — nenhum desenvolvedor sozinho pode drenar um fundo de protocolo |

Provavelmente você **não** precisa de custódia por threshold para uma carteira pessoal que controla sozinho, valores pequenos ou situações em que a sobrecarga adicional de coordenação supera a redução de risco.

---

## Como ela difere da multisig transparente?

O Zcash oferece há muito tempo multisig transparente — várias chaves são necessárias para gastar a partir de um t-address. Mas a multisig transparente tem um custo significativo de privacidade: **a estrutura multisig, todas as chaves públicas e todos os signatários são visíveis na blockchain**.

FROST resolve isso ao operar dentro do pool blindado:

| | Multisig transparente | Threshold FROST (blindado) |
|--|---------------------|--------------------------|
| Pool | Transparente (público) | Orchard (blindado) |
| Signatários visíveis on-chain | Sim — todas as chaves públicas expostas | Não — indistinguível de um gasto com um único signatário |
| Montantes visíveis | Sim | Não |
| Coordenação necessária | Script on-chain | Rodada de comunicação off-chain |
| Privacidade | Nenhuma | Privacidade blindada total |

---

## Trade-offs e limitações

FROST é poderoso, mas traz trade-offs reais que você deve entender antes de usá-lo:

### Sobrecarga de coordenação
Os signatários precisam estar online ao mesmo tempo (ou quase) para concluir uma rodada de assinatura. Se seus t signatários estiverem espalhados por vários fusos horários ou tiverem conexões pouco confiáveis, gastar exige uma coordenação que uma carteira individual não exige.

### Não há assinatura se o quórum estiver indisponível
Se não houver detentores de chaves suficientes disponíveis (doentes, viajando, sem responder), os fundos ficam temporariamente impossíveis de gastar. Escolha cuidadosamente seu threshold e o número de partes — 2-of-3 é mais resiliente do que 2-of-2.

### Cerimônia de geração de chaves
Configurar FROST requer uma cerimônia de geração distribuída de chaves (DKG) em que todos os n participantes estejam online ao mesmo tempo. É um evento único, mas precisa ser feito com cuidado — se os participantes forem comprometidos durante o DKG, a segurança será prejudicada.

### As ferramentas ainda estão amadurecendo
FROST para o Zcash blindado é relativamente recente. A norma IETF (draft-irtf-cfrg-frost) está madura, mas as integrações com carteiras são limitadas. Espere algumas arestas a serem aparadas em comparação com uma carteira padrão de chave única.

### Complexidade da recuperação
Perder uma parte não é o fim do mundo (esse é o propósito do threshold), mas os planos de recuperação precisam ser documentados antecipadamente. Quem guarda os backups? O que acontece se duas partes forem perdidas ao mesmo tempo?

---

## Quem está desenvolvendo com FROST no Zcash?

### Zcash Foundation — frost.zfnd.org
A Zcash Foundation lançou uma implementação funcional de FROST e um site de demonstração. Esta é a implementação de referência usada para testes e desenvolvimento.

### Demo FROST do Ywallet
Ywallet teve uma integração de demonstração inicial do FROST, explicada no [guia da Demo FROST do Ywallet](/guides/Ywallet_FROST_Demo). Ywallet não é mais mantida e não será atualizada para Ironwood, por isso leia o guia como contexto, e não como algo para executar hoje. Zkool, do mesmo desenvolvedor, é a sucessora mantida e inclui multisig FROST entre seus recursos.

### ZecHub Hackathon 2026 — Projetos da categoria FROST

A categoria FROST foi a mais competitiva no ZecHub Hackathon 2026. Projetos de destaque:

- **ZecVault** — escrow blindado 2-of-3 liquidado na mainnet (threshold FROST)
- **Steward** — custódia por threshold para o Zcash blindado com uma UX focada na recuperação

### Coinbase
A Coinbase desenvolveu uma implementação FROST de produção para seus sistemas de assinatura por threshold (para Bitcoin), com modificações que removem a etapa de pré-processamento e distribuem o papel do agregador entre todos os participantes. Sua experiência valida o modelo de segurança do FROST em escala de produção.

---

## Como funciona uma sessão de assinatura (simplificado)

1. **Configuração (uma vez):** Todos os n participantes executam uma cerimônia de geração distribuída de chaves (DKG). Cada um recebe uma parte privada; uma chave pública compartilhada é derivada. Nenhuma parte conhece a chave privada completa.

2. **Coordenar signatários:** Quando um gasto é necessário, um coordenador (que pode ser um dos signatários) coleta compromissos de t participantes dispostos a assinar.

3. **Rodada 1:** Cada signatário participante gera um nonce e transmite um compromisso (público, não sensível).

4. **Rodada 2:** Cada signatário participante calcula sua assinatura parcial usando sua parte privada e a transmite.

5. **Agregação:** O coordenador combina as t assinaturas parciais em uma assinatura Schnorr final — indistinguível on-chain de uma assinatura de uma única parte.

6. **Transmissão:** A transação é transmitida para a rede Zcash normalmente.

Se algum signatário enviar uma assinatura parcial inválida, o protocolo o identifica e aborta (ele é excluído de sessões futuras). A coordenação acontece off-chain — a blockchain vê apenas a transação final.

---

## Escolhendo seus parâmetros de threshold

| Setup | Resiliência | Risco |
|-------|-----------|------|
| 1-of-1 | Sem resiliência — ponto único de falha | Perda da chave = perda permanente |
| 2-of-2 | É necessário ter ambos os signatários — sem tolerância a falhas | Um indisponível = fundos congelados |
| 2-of-3 | Uma parte pode ser perdida ou ficar indisponível | Margem de segurança menor do que a de 3-of-5 |
| 3-of-5 | Duas partes podem ser perdidas; segurança forte | Maior sobrecarga de coordenação |
| 3-of-7 | Nível institucional; tolera duas falhas | Alto custo de coordenação |

Um ponto de partida prático para a maioria das equipes: **2-of-3** (resiliente, coordenação mínima) ou **3-of-5** (institucional, maior segurança).

---

## Páginas relacionadas

- [FROST — Análise técnica aprofundada](FROST.md) — detalhes criptográficos do protocolo (DKG, rodadas de assinatura, provas de segurança)
- [Guia da Demo FROST do Ywallet](/guides/Ywallet_FROST_Demo) — contexto: Ywallet não é mais mantida
- [Chaves de visualização](Viewing_Keys.md) — acesso somente de leitura a endereços blindados (complementar à custódia por threshold)
- [Ativos blindados do Zcash](Zcash_Shielded_Assets.md) — FROST também é uma infraestrutura-chave para a emissão de ZSA

## Recursos

- [Artigo de pesquisa sobre FROST (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [Projeto de norma IETF para FROST (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Implementação FROST da Zcash Foundation](https://frost.zfnd.org)
- [Chelsea Komlo — O que são Threshold Signatures? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Threshold Digital Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Robust Async Schnorr Threshold Signatures (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
