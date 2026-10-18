# Do Zero ao Conhecimento Zero: Protocolo Lelantus

**Série:** Do Zero ao Conhecimento Zero

Hoje vamos dar uma olhada no **Lelantus**!

Lançado em 2019, este protocolo se baseia no Zerocoin. Ele é usado na moeda **Firo** (anteriormente Zcoin) para permitir transações privadas on-chain. Ele se assemelha ao Zcash em alguns aspectos, mas é claramente diferente na maioria deles.

![Introdução ao Lelantus](/content-images/Fsk18DgXsAEc0Ob-a8cd9a85d1.webp)

---

## Fundamentos dos Protocolos Zcash vs Firo

- **Zcash** - Baseia-se no protocolo **Zerocash**  
- **Firo (Zcoin)** - Baseia-se no protocolo **Zerocoin**

![Comparação entre Zerocash e Zerocoin](/content-images/Fsk2Fk7WcAA81ty-92158edf6b.webp)

---

## Evolução dos Protocolos de Privacidade do Firo

Semelhante ao Zcash, o Firo usa endereços blindados para alcançar pagamentos anônimos.

**Linha do tempo:**
- **Zerocoin** - Solidez comprometida
- **Sigma** - Sistema de denominações fixas
- **Lelantus 1.0** - Faltavam provas de segurança corretas

![Evolução do protocolo](/content-images/Fsk2NdaWAAAKVgH-f84ae27c48.webp)

---

## Limitações do Protocolo Sigma

O protocolo Σ (Sigma) usado nas versões anteriores do Zcoin/Firo tinha uma grande limitação: os usuários só podiam cunhar denominações fixas.

Isso criava conjuntos de anonimato menores e abria espaço para ataques de temporização entre as operações de mint e redeem (além do problema do "troco contaminado").

![Denominações do Sigma](/content-images/Fsk2fxfWcAMUBDo-333a8f9df3.webp)

---

## Como o Lelantus Melhora a Privacidade

**Lelantus** resolve o problema das denominações fixas ao permitir mints a partir de um único conjunto maior.

Principais benefícios:
- Elimina conjuntos de anonimato de denominações fixas
- Reduz ataques de temporização entre burn/redeem
- Remove o problema do troco contaminado

**Limitação**: O tamanho do conjunto está atualmente limitado a **65,000 moedas**.

![Vantagens do Lelantus](/content-images/Fsk2wK3X0AA6MEe-06f29b3621.webp)

---

## Compromissos de Moeda

Um **compromisso de moeda** é um compromisso com dupla ocultação que codifica o número de série da moeda e o valor da moeda.

Eles funcionam de forma semelhante às **Notes** no Zcash.

O compromisso de moeda é publicado e armazenado no ledger quando a moeda é criada (por meio de transações Mint ou Spend).

![Diagrama de compromisso de moeda](/content-images/Fsk3AWNX0AIHya8-0ed01a73c1.webp)

---

## Modelo Basecoin < - > Zerocoin

O Lelantus usa o modelo clássico **basecoin < - > zerocoin**.

**Recurso importante**: Resgates parciais agora são possíveis, mantendo o restante e os valores ocultos.

Assim como no Zcash, as transações transparentes devem ser explicitamente selecionadas pelo usuário.

![Fluxo do Lelantus](/content-images/Fsk3HrjXgAMgqmX-4d727febf5.webp)

---

## Provas One-of-Many

O Lelantus utiliza **Provas One-of-Many** para extrair os valores de entrada necessários para provar o saldo sem revelar as origens das entradas — e sem exigir uma trusted setup.

Essas provas também são usadas no **Triptych** (mencionado em nosso tópico sobre CryptoNote).

![Provas One-of-Many](/content-images/Fsk3Z0nWIAAPD4k-b76f087018.webp)

---

## Privacidade na Camada de Rede: Dandelion++

Os nós do Firo usam o mesmo Network Magic que o Magicbean do Zcash.

Assim como o Monero, o Firo implementou **Dandelion++** para adicionar privacidade ao ofuscar o endereço IP do transmissor da transação.

**Fases do Dandelion++:**
- **Fase Stem** - A transação é retransmitida para um único nó aleatório em vez de todos os peers
- **Fase Fluff** - Iniciada aleatoriamente, depois muda para o modo normal de gossip

Isso torna muito mais difícil rastrear a origem de uma transação por meio de análise de rede.

![Explicação do Dandelion++](/content-images/Fsk4A8VWcAU84MR-538b054cab.webp)

---

## Futuro: Lelantus-Spark

**Lelantus-Spark** (planejado para mais tarde em 2023) introduz dois níveis de visibilidade opt-in usando **derivação no estilo ZIP-32** e endereços diversificados.

Também adicionará suporte para:
- Multisig
- Ativos Confidenciais Definidos pelo Usuário

Esses recursos são paralelos aos Zcash Shielded Assets.

![Anúncio do Lelantus-Spark](/content-images/Fsk4jXeXsAACQ3h-b53294b16e.webp)

---

**Tópico original por ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*Esta página foi compilada a partir do tópico original Zero to Zero Knowledge para a wiki do ZecHub.*
