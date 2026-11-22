# Zero to Zero Knowledge: Protocolo Lelantus

**Série:** Zero to Zero Knowledge

Hoje vamos conhecer o **Lelantus**!

Lançado em 2019, este protocolo é baseado no Zerocoin. Ele é usado na moeda **Firo** (antiga Zcoin) para permitir transações on-chain privadas. Ele se parece com o Zcash em alguns pontos, mas é bem diferente na maioria dos aspectos.

![Lelantus intro](/content-images/Fsk18DgXsAEc0Ob-a8cd9a85d1.webp)

---

## Fundamentos dos protocolos Zcash e Firo

- **Zcash** - Baseado no protocolo **Zerocash**  
- **Firo (Zcoin)** - Baseado no protocolo **Zerocoin**

![Comparação entre Zerocash e Zerocoin](/content-images/Fsk2Fk7WcAA81ty-92158edf6b.webp)

---

## Evolução dos protocolos de privacidade do Firo

Assim como o Zcash, o Firo usa endereços blindados para realizar pagamentos anônimos.

**Linha do tempo:**
- **Zerocoin** - Solidez comprometida
- **Sigma** - Sistema de denominações fixas
- **Lelantus 1.0** - Não tinha provas de segurança corretas

![Protocol evolution](/content-images/Fsk2NdaWAAAKVgH-f84ae27c48.webp)

---

## Limitações do protocolo Sigma

O protocolo Σ (Sigma), usado nas versões anteriores do Zcoin/Firo, tinha uma grande limitação: os usuários só podiam cunhar denominações fixas.

Isso gerava conjuntos de anonimato menores e abria espaço para ataques de temporização entre as operações de cunhagem e resgate (além do problema do "troco contaminado").

![Sigma denominations](/content-images/Fsk2fxfWcAMUBDo-333a8f9df3.webp)

---

## Como o Lelantus melhora a privacidade

O **Lelantus** resolve o problema das denominações fixas ao permitir cunhagens a partir de um único conjunto maior.

Principais benefícios:
- Elimina os conjuntos de anonimato de denominação fixa
- Reduz os ataques de temporização entre queima e resgate
- Elimina o problema do troco contaminado

**Limitação**: Atualmente, o tamanho do conjunto é limitado a **65.000 moedas**.

![Lelantus advantages](/content-images/Fsk2wK3X0AA6MEe-06f29b3621.webp)

---

## Compromissos de moeda

Um **compromisso de moeda** é um compromisso duplamente cego que codifica o número de série e o valor da moeda.

Eles funcionam de forma semelhante às **notes** no Zcash.

O compromisso de moeda é publicado e armazenado no livro-razão quando a moeda é criada (por meio de transações Mint ou Spend).

![Diagrama de compromisso de moeda](/content-images/Fsk3AWNX0AIHya8-0ed01a73c1.webp)

---

## Modelo Basecoin < - > Zerocoin

O Lelantus usa o modelo clássico **basecoin < - > zerocoin**.

**Recurso importante**: Agora é possível fazer resgates parciais mantendo o restante e os valores ocultos.

Assim como no Zcash, as transações transparentes precisam ser selecionadas explicitamente pelo usuário.

![Lelantus flow](/content-images/Fsk3HrjXgAMgqmX-4d727febf5.webp)

---

## Provas One-of-Many

O Lelantus usa **provas One-of-Many** para extrair os valores de entrada necessários para comprovar o saldo sem revelar a origem das entradas, e sem exigir uma configuração confiável.

Essas provas também são usadas no **Triptych** (mencionado em nossa thread sobre o CryptoNote).

![One-of-Many Proofs](/content-images/Fsk3Z0nWIAAPD4k-b76f087018.webp)

---

## Privacidade na camada de rede: Dandelion++

Os nós do Firo usam o mesmo Network Magic do Magicbean do Zcash.

Assim como o Monero, o Firo implementou o **Dandelion++** para aumentar a privacidade, ocultando o endereço IP de quem transmite a transação.

**Fases do Dandelion++:**
- **Fase stem** - A transação é retransmitida para um único nó aleatório, em vez de para todos os pares
- **Fase fluff** - Iniciada aleatoriamente, depois muda para o modo gossip normal

Isso torna muito mais difícil rastrear a origem de uma transação por meio de análise de rede.

![Dandelion++ explanation](/content-images/Fsk4A8VWcAU84MR-538b054cab.webp)

---

## Futuro: Lelantus-Spark

O **Lelantus-Spark** (previsto para o final de 2023) introduz dois níveis de visibilidade opcional usando **derivação no estilo ZIP-32** e endereços diversificados.

Ele também vai adicionar suporte a:
- Multisig
- Ativos confidenciais definidos pelo usuário

Esses recursos são equivalentes aos ativos blindados do Zcash.

![Lelantus-Spark announcement](/content-images/Fsk4jXeXsAACQ3h-b53294b16e.webp)

---

**Thread original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*Esta página foi compilada a partir da thread original do Zero to Zero Knowledge para a wiki do ZecHub.*
