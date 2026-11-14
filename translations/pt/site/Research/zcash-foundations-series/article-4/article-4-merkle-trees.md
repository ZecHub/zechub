# Árvores Merkle: como o blockchain se lembra de cada note
##### Pesquisa original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-19-cfbdcf8f78.webp)

### Resumindo milhões de compromissos em uma minúscula impressão digital

> **Série:** *Zcash a partir dos primeiros princípios* . **Artigo 4 . Árvores Merkle**
> **Público:** iniciantes. Partimos do [Artigo 3 (hashing e compromissos)](article-3-hashing-commitments.md). Se você sabe o que são uma impressão digital e um compromisso, está pronto.
> **O que você vai levar daqui:** uma visão intuitiva e correta das árvores Merkle, de como provar que um item faz parte delas sem revelar qual item é e de como exatamente isso se torna a árvore de compromissos de notes do Zcash.

O [Artigo 0](article-0-shielded-transaction.md) descreveu um "quadro público" que guarda todas as notes já criadas e que só cresce. A esta altura você já imagina o que fica pregado nele: **compromissos** (Artigo 3), os envelopes lacrados. Mas um quadro real guardaria *centenas de milhões* deles. Como a rede armazena tudo isso, verifica tudo isso e permite que você prove que o seu envelope está no quadro sem apontar para ele? A resposta é uma das estruturas mais elegantes da ciência da computação: a **árvore Merkle.**

---

## 1. Por que você deveria se importar?

Dois problemas aparecem no momento em que você tem uma lista pública gigante de compromissos.

**Problema um: integridade em escala.** Se a lista tem 300 milhões de entradas, como alguém confirma que *nenhuma* delas foi alterada em segredo? Reverificar 300 milhões de itens a cada consulta é inviável.

**Problema dois: pertencimento privado.** Para gastar uma note (Artigo 0), você precisa provar que o seu compromisso realmente está no quadro. Mas, se você apontar para ele ("é a entrada número 4.201.337!"), acaba de se desanonimizar. Você precisa provar *"meu envelope está em algum lugar deste quadro"* sem revelar **qual** é.

Uma árvore Merkle resolve os dois de uma vez. Ela comprime a lista inteira em uma única impressão digital e permite que você prove o pertencimento com uma prova minúscula, que esconde a posição.

---

## 2. A intuição: um torneio de impressões digitais

Imagine a chave de um torneio eliminatório, mas, em vez de jogadores avançando, **impressões digitais vão sendo combinadas.**

- Na base, cada dado recebe sua própria impressão digital (seu hash, do Artigo 3). Essas são as **folhas.**
- Agrupe-as em pares. As duas impressões digitais de cada par passam juntas pelo hash, gerando uma impressão digital pai.
- Agrupe os pais em pares, aplique o hash a cada par e assim por diante.
- Continue até que reste uma **única impressão digital** no topo. Essa campeã é a **raiz Merkle.**

![alt text](/content-images/image-20-f5d57e425a.webp)

A propriedade mais importante de todas decorre diretamente do efeito avalanche (Artigo 3):

> **A raiz é uma impressão digital de *tudo* o que está abaixo dela.** Altere qualquer folha, nem que seja um único bit, e a impressão digital dela muda, o que muda o pai dela, o que muda o pai *desse* pai, e assim até o topo. **A raiz muda.** Portanto, um único valor pequeno de raiz certifica a integridade da lista inteira. Isso resolve o Problema um.

---

## 3. Uma árvore real, calculada com exatidão

Vamos construir a árvore de quatro folhas acima com impressões digitais SHA-256 reais sobre as folhas `A, B, C, D` (os digests aparecem truncados para facilitar a leitura):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Tudo se resume a "aplicar o hash a algo e, depois, aplicar o hash a pares de hashes". Nada mais exótico do que o Artigo 3, organizado em uma árvore.

---

## 4. A parte engenhosa: provar o pertencimento sem revelar a posição

Agora o Problema dois. Digamos que você queira provar que a folha `C` está na árvore para alguém que só conhece a **raiz**. Você *não* entrega a árvore inteira. Você entrega apenas as impressões digitais necessárias para subir de `C` até a raiz, o chamado **caminho de autenticação** (ou **prova Merkle**):

> Para provar que `C` está na árvore, forneça:
> - sua irmã `hD`, e
> - sua tia `hAB`.

O verificador, conhecendo apenas a raiz, refaz a subida:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Calculado de verdade: isso resulta em `1b3faa3fcc5e...`, que **coincide com a raiz.**  Fica provado que a folha está na árvore.

![alt text](/content-images/image-21-d9e5d6eaf6.webp)

Duas coisas tornam isso poderoso:

- **É minúsculo.** Para 4 folhas, você forneceu 2 hashes. Para uma árvore de `n` folhas, você fornece apenas cerca de **log_2(n)** hashes. Para um bilhão de folhas, isso dá aproximadamente **30 hashes**, e não um bilhão. A prova mal cresce enquanto a árvore explode de tamanho.
- **É a semente da privacidade.** A prova mostra que a sua folha está *em algum lugar* da árvore. Quando essa mesma verificação é feita *dentro de uma prova de conhecimento zero* (Artigo 5), até o próprio caminho fica oculto, de modo que você prova "minha note está na árvore" sem revelar nem a note nem a posição dela. Isso resolve completamente o Problema dois.

---

## 5. De uma árvore Merkle à árvore de compromissos de notes do Zcash

Agora podemos dizer com precisão o que o "quadro público" do Artigo 0 realmente é:

> A **árvore de compromissos de notes** é uma árvore Merkle cujas **folhas são compromissos de notes.** Toda vez que uma note é criada em qualquer lugar do mundo, o compromisso dela é acrescentado como a próxima folha, e a raiz é atualizada.

Alguns detalhes reais:

- **Ela só cresce.** Folhas são acrescentadas, nunca removidas. Isso se chama **árvore Merkle incremental.** (Corresponde ao "o quadro nunca derruba nada" do Artigo 0.)
- **A raiz se chama *âncora*.** Quando você gasta, a sua transação faz referência a uma âncora recente e prova, com conhecimento zero, que o compromisso da sua note está na árvore com aquela raiz.
- **Profundidade fixa.** As árvores blindadas do Zcash têm profundidade **32**, o que significa que podem conter até `2^(32)` (mais de quatro bilhões de) notes.
- **Hashing amigável a ZK.** A árvore não é construída com SHA-256. O Sapling aplica à árvore **hashes de Pedersen** e o Orchard usa **Sinsemilla** (ambos do Artigo 3), justamente para que a subida de pertencimento seja barata de provar dentro de um circuito.

![alt text](/content-images/image-22-518354b8d5.webp)

### Algo que a árvore *não* resolve: gastos duplos

A árvore prova que uma note **existe**. Ela não impede, por si só, que você gaste a mesma note duas vezes. Essa tarefa cabe ao **conjunto de nulificadores** do Artigo 0: uma coleção separada de "tokens de anulação". Quando você gasta, publica o nulificador da note, e a rede rejeita qualquer nulificador que já tenha visto antes.

Assim, as duas estruturas públicas têm papéis complementares, e mantê-las separadas é exatamente o que corta o vínculo entre o nascimento e a morte de uma note:

| Estrutura | Pergunta que responde | Atualizada quando |
|---|---|---|
| **Árvore de compromissos de notes** | "Esta note existe?" | Uma note é **criada** (compromisso acrescentado) |
| **Conjunto de nulificadores** | "Esta note já foi gasta?" | Uma note é **gasta** (nulificador publicado) |

---

## 6. Um aviso honesto

Simplificações, como sempre. Árvores Merkle incrementais reais acompanham nós de "fronteira" para que a raiz possa ser atualizada sem reconstruir tudo; a rede mantém uma janela de âncoras recentes, e não apenas a mais nova, para que as carteiras não quebrem a cada novo bloco; e as folhas vazias usam um valor de preenchimento definido. Também desenhamos árvores binárias com potências de dois bem arrumadas. Nada disso muda a intuição: folhas de compromissos, com hash aplicado em pares até uma única raiz, com provas de pertencimento curtas. A contabilidade exata volta no artigo sobre o protocolo.

---

## 7. Resumo

- Uma **árvore Merkle** aplica o hash aos dados para formar **folhas** e, depois, aplica o hash a **pares, subindo** até que reste uma única **raiz**.
- Graças ao efeito avalanche, a **raiz é uma impressão digital da lista inteira**: altere uma folha e a raiz muda. Um único valor pequeno certifica um enorme conjunto de dados.
- Uma **prova de pertencimento (caminho de autenticação)** é apenas o conjunto de irmãs ao longo da subida até a raiz, cerca de **log_2(n)** hashes, então as provas continuam minúsculas mesmo com bilhões de folhas.
- Feita **dentro de uma prova de conhecimento zero**, essa verificação de pertencimento esconde *qual* folha você quer dizer, provando "minha note está na árvore" sem revelar a note nem a posição dela.
- A **árvore de compromissos de notes** do Zcash é uma árvore Merkle **incremental** de compromissos de notes, com profundidade **32**, cuja raiz é a **âncora**; o Sapling aplica a ela o hash **Pedersen** e o Orchard, o **Sinsemilla**.
- A árvore prova a **existência**; o **conjunto de nulificadores**, separado, impede **gastos duplos**. Mantê-los separados é o que desvincula o nascimento de uma note da sua morte.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Merkle tree** | Uma árvore de hashes; as folhas são impressões digitais dos dados, e os pais aplicam o hash aos seus filhos |
| **Leaf** | Um nó da base; no Zcash, um compromisso de note |
| **Merkle root** | A única impressão digital do topo, que resume a árvore inteira |
| **Authentication path / Merkle proof** | Os hashes irmãos necessários para provar que uma folha está na árvore |
| **Incremental Merkle tree** | Uma árvore Merkle que só recebe acréscimos (folhas são apenas adicionadas) |
| **Anchor** | Uma raiz Merkle à qual um gasto faz referência como "o estado da árvore em relação ao qual estou provando" |
| **Nullifier set** | A coleção separada de marcadores de gasto que bloqueia os gastos duplos |

---

## Perguntas frequentes

**Por que uma árvore, e não apenas uma longa lista de hashes?**
Uma lista simples obrigaria você a revelar ou processar todas as entradas para provar o pertencimento. Uma árvore oferece provas de tamanho logarítmico e uma única raiz para a integridade.

**O verificador precisa da árvore inteira?**
Não. O verificador só precisa da **raiz** e do seu curto caminho de autenticação. Essa é justamente a ideia.

**Por que exatamente profundidade 32?**
Ela limita a árvore a cerca de quatro bilhões de notes, o que dá folga de sobra, e mantém a prova de pertencimento (e seu custo dentro do circuito) com um tamanho fixo e administrável.

**Se a raiz muda a cada nova note, como as provas antigas continuam válidas?**
A rede se lembra de uma janela de raízes recentes (âncoras), então uma prova feita em relação a uma âncora um pouco mais antiga ainda é verificada. O artigo sobre o protocolo explica isso com precisão.

---

### Teste a sua intuição

Na nossa árvore de 4 folhas, suponha que um atacante substitua em segredo a folha `C` por um valor diferente, mas deixe inalterada a raiz publicada. O que dá errado para ele, e por que ele não consegue consertar isso discretamente? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Alterar `C` altera `hC` (efeito avalanche), o que altera `hCD = H(hC, hD)`, o que altera `ROOT = H(hAB, hCD)`. Assim, a raiz recalculada deixa de coincidir com a raiz publicada, e a adulteração é detectada. Para "consertar discretamente", ele precisaria encontrar um `C` diferente que produzisse o *mesmo* `hC`, o que é uma colisão de hash, inviável segundo o Artigo 3. A integridade se mantém.
</details>

---

### O que vem a seguir

**Artigo 5 . Provas de conhecimento zero:** o ápice. Já construímos as notes, os compromissos e a árvore, e continuamos dizendo "provado com conhecimento zero". O Artigo 5 finalmente explica como você pode provar que uma afirmação é verdadeira (que a sua note está na árvore, que o seu nulificador está correto, que os valores se equilibram) sem revelar nada disso.

*Parte da série* Zcash a partir dos primeiros princípios *para [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
