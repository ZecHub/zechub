<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# FROST & Custódia por Threshold para ZEC Blindado

> Para todos os detalhes criptográficos do protocolo FROST, consulte a [página técnica do FROST](FROST.md).

A custódia por threshold com FROST surge constantemente nas conversas sobre Zcash — foi o tema principal no ZecHub Hackathon 2026 — mas o conceito nem sempre é explicado em linguagem simples. Esta página aborda o que significa, quando realmente precisa dela, os trade-offs e quais as ferramentas que a suportam atualmente.

---

## Resumo rápido

- **FROST** permite que um grupo de detentores de chaves controle coletivamente um endereço blindado de Zcash sem que qualquer pessoa detenha a chave privada completa.
- Um threshold **t-of-n** significa: t pessoas têm de coassinar para gastar; quaisquer t-1 ou menos não conseguem mover os fundos sozinhas.
- As transações parecem-se com qualquer outra transação blindada — não há qualquer rasto on-chain que revele que foi usada assinatura por threshold.
- Isto é fundamentalmente diferente da multisig transparente (que é pública on-chain e que o Zcash suporta há muito tempo) — FROST funciona dentro da pool blindada.
- É útil para DAOs, exchanges, serviços de custódia, poupanças conjuntas e tesourarias de equipa — em qualquer contexto onde um ponto único de falha da chave seja inaceitável.

---

## O que é FROST em linguagem simples?

Imagine três sócios de uma empresa, cada um com uma parte de uma chave. Para gastar a partir da sua wallet partilhada, quaisquer dois dos três têm de concordar e coassinar. A transação resultante parece idêntica a um envio individual normal — nenhum observador consegue perceber pela blockchain que estiveram envolvidas várias pessoas.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) é o protocolo criptográfico que torna isto possível para Zcash blindado. Foi criado por Chelsea Komlo (University of Waterloo / Zcash Foundation) e Ian Goldberg.

As propriedades principais:

- **Threshold**: apenas t signatários de n precisam de participar (por exemplo, 2-of-3, 3-of-5)
- **Blindado**: funciona dentro da pool de privacidade Orchard — montantes, remetente e destinatário mantêm-se privados
- **Indistinguível**: a assinatura final parece-se com qualquer outra transação blindada de Zcash
- **Sem custódia**: nenhuma parte detém alguma vez a chave completa — nem sequer o coordenador

---

## Quando deve usar custódia por threshold?

A custódia por threshold faz sentido quando **perder uma chave ou uma pessoa não deve significar perder os fundos**.

| Situação | Porque é que a custódia por threshold ajuda |
|-----------|----------------------------|
| **Tesouraria de DAO ou equipa** | Nenhum administrador isolado pode drenar fundos unilateralmente; exige consenso |
| **Exchange ou custodiante** | Distribui o risco da chave por várias zonas de segurança ou colaboradores |
| **Cold storage pessoal (com família de confiança)** | 2-of-3 entre si + dois familiares — se morrer ou perder o acesso, os fundos não se perdem |
| **Escrow** | Comprador, vendedor e árbitro detêm cada um uma parte; os fundos são libertados quando dois concordam |
| **Desembolso de subsídios de elevado valor** | Ao estilo ZCG: exige vários signatários independentes antes de pagar |
| **Gestão de chaves de developers** | Evita ameaças internas — nenhum engenheiro isolado pode drenar um fundo de protocolo |

Provavelmente **não** precisa de custódia por threshold para uma wallet pessoal que controla sozinho, montantes pequenos ou situações em que a sobrecarga adicional de coordenação supera a redução de risco.

---

## Em que difere da multisig transparente?

O Zcash suporta há muito tempo multisig transparente — várias chaves necessárias para gastar a partir de um t-address. Mas a multisig transparente tem um custo significativo de privacidade: **a estrutura multisig, todas as chaves públicas e todos os signatários são visíveis na blockchain**.

FROST resolve isto ao operar dentro da pool blindada:

| | Multisig transparente | Threshold FROST (blindado) |
|--|---------------------|--------------------------|
| Pool | Transparente (pública) | Orchard (blindada) |
| Signatários visíveis on-chain | Sim — todas as chaves públicas expostas | Não — indistinguível de um gasto com um único signatário |
| Montantes visíveis | Sim | Não |
| Coordenação necessária | Script on-chain | Ronda de comunicação off-chain |
| Privacidade | Nenhuma | Privacidade blindada total |

---

## Trade-offs e limitações

FROST é poderoso, mas traz trade-offs reais que deve compreender antes de o usar:

### Sobrecarga de coordenação
Os signatários têm de estar online ao mesmo tempo (ou quase) para concluir uma ronda de assinatura. Se os seus t signatários estiverem espalhados por vários fusos horários ou tiverem ligações pouco fiáveis, gastar exige coordenação que uma wallet individual não exige.

### Não há assinatura se o quórum estiver indisponível
Se não estiverem disponíveis detentores de chaves suficientes (doentes, em viagem, sem resposta), os fundos ficam temporariamente impossíveis de gastar. Escolha cuidadosamente o seu threshold e o número de partes — 2-of-3 é mais resiliente do que 2-of-2.

### Cerimónia de geração de chaves
Configurar FROST requer uma cerimónia de geração distribuída de chaves (DKG) em que todos os n participantes estão online em simultâneo. É um evento único, mas tem de ser feito com cuidado — se os participantes forem comprometidos durante o DKG, a segurança fica enfraquecida.

### As ferramentas ainda estão a amadurecer
FROST para Zcash blindado é relativamente recente. A norma IETF (draft-irtf-cfrg-frost) está madura, mas as integrações em wallets são limitadas. Espere algumas arestas por limar em comparação com uma wallet padrão de chave única.

### Complexidade da recuperação
Perder uma parte não é o fim do mundo (esse é o propósito do threshold), mas os planos de recuperação têm de ser documentados antecipadamente. Quem guarda as cópias de segurança? O que acontece se duas partes forem perdidas em simultâneo?

---

## Quem está a construir com FROST no Zcash?

### Zcash Foundation — frost.zfnd.org
A Zcash Foundation disponibilizou uma implementação funcional de FROST e um site de demonstração. Esta é a implementação de referência usada para testes e desenvolvimento.

### Demo FROST do YWallet
YWallet (uma wallet Zcash de elevado desempenho) tem uma integração demo inicial do FROST. Consulte o [guia da Demo FROST do YWallet](/guides/Ywallet_FROST_Demo) para instruções passo a passo.

### ZecHub Hackathon 2026 — Projetos da categoria FROST

A categoria FROST foi a mais competitiva no ZecHub Hackathon 2026. Projetos de destaque:

- **ZecVault** — escrow blindado 2-of-3 liquidado na mainnet (threshold FROST)
- **Steward** — custódia por threshold para Zcash blindado com uma UX focada na recuperação

### Coinbase
A Coinbase desenvolveu uma implementação FROST de produção para os seus sistemas de assinatura por threshold (para Bitcoin), com modificações que removem a fase de pré-processamento e distribuem o papel do agregador entre todos os participantes. A sua experiência valida o modelo de segurança do FROST à escala de produção.

---

## Como funciona uma sessão de assinatura (simplificado)

1. **Configuração (uma vez):** Todos os n participantes executam uma cerimónia de geração distribuída de chaves (DKG). Cada um recebe uma parte privada; é derivada uma chave pública partilhada. Nenhuma parte conhece a chave privada completa.

2. **Coordenar signatários:** Quando é necessário um gasto, um coordenador (que pode ser um dos signatários) recolhe compromissos de t participantes dispostos a assinar.

3. **Ronda 1:** Cada signatário participante gera um nonce e difunde um compromisso (público, não sensível).

4. **Ronda 2:** Cada signatário participante calcula a sua assinatura parcial usando a sua parte privada e difunde-a.

5. **Agregação:** O coordenador combina as t assinaturas parciais numa assinatura Schnorr final — indistinguível on-chain de uma assinatura de uma única parte.

6. **Difusão:** A transação é difundida para a rede Zcash normalmente.

Se algum signatário enviar uma assinatura parcial inválida, o protocolo identifica-o e aborta (é excluído de sessões futuras). A coordenação acontece off-chain — a blockchain vê apenas a transação final.

---

## Escolher os seus parâmetros de threshold

| Setup | Resiliência | Risco |
|-------|-----------|------|
| 1-of-1 | Sem resiliência — ponto único de falha | Perda da chave = perda permanente |
| 2-of-2 | É necessário ter ambos os signatários — sem tolerância a falhas | Um indisponível = fundos congelados |
| 2-of-3 | Uma parte pode ser perdida ou ficar indisponível | Margem de segurança inferior à de 3-of-5 |
| 3-of-5 | Duas partes podem ser perdidas; segurança forte | Maior sobrecarga de coordenação |
| 3-of-7 | Nível institucional; tolera duas falhas | Custo elevado de coordenação |

Um ponto de partida prático para a maioria das equipas: **2-of-3** (resiliente, coordenação mínima) ou **3-of-5** (institucional, segurança superior).

---

## Páginas relacionadas

- [FROST — Análise Técnica Aprofundada](FROST.md) — detalhes criptográficos do protocolo (DKG, rondas de assinatura, provas de segurança)
- [Guia da Demo FROST do YWallet](/guides/Ywallet_FROST_Demo) — demonstração prática passo a passo
- [Demo FROST (frostdemo)](/guides/ywallet-frost-demo) — tutorial da demo da Zcash Foundation
- [Viewing Keys](Viewing_Keys.md) — acesso apenas de leitura a endereços blindados (complementar à custódia por threshold)
- [Zcash Shielded Assets](Zcash_Shielded_Assets.md) — FROST é também uma infraestrutura-chave para a emissão de ZSA

## Recursos

- [Artigo de investigação sobre FROST (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [Projeto de norma IETF para FROST (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Implementação FROST da Zcash Foundation](https://frost.zfnd.org)
- [Chelsea Komlo — O que são Threshold Signatures? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Threshold Digital Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Robust Async Schnorr Threshold Signatures (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
