# Árvores de Merkle: Como o Blockchain Se Lembra de Cada Nota
##### Pesquisa original de [Annkkitaaa](https://github.com/Annkkitaaa)

![texto alternativo](image-19.png)

### Resumindo milhões de commitments em uma única impressão digital minúscula

> **Série:** *Zcash from First Principles* . **Artigo 4 . Árvores de Merkle**
> **Público:** iniciantes. Partimos do [Artigo 3 (hashing e commitments)](article-3-hashing-commitments.md). Se você sabe o que é uma impressão digital e um commitment, está pronto.
> **O que você vai levar:** uma visão intuitiva e correta das árvores de Merkle, de como provar pertencimento sem revelar a qual item você se refere, e exatamente como isso se torna a árvore de note commitments do Zcash.

O [Artigo 0](article-0-shielded-transaction.md) descreveu um "quadro público" que guarda cada nota já criada e que só cresce. A esta altura você já pode adivinhar o que está preso nele: **commitments** (Artigo 3), os envelopes lacrados. Mas um quadro real conteria *centenas de milhões* deles. Como a rede armazena isso, verifica isso e permite que você prove que seu envelope está no quadro sem apontar para ele? A resposta é uma das estruturas mais elegantes da ciência da computação: a **árvore de Merkle.**

---

## 1. Por que isso importa para você?

Dois problemas aparecem no momento em que você tem uma lista pública gigante de commitments.

**Problema um: integridade em escala.** Se a lista tem 300 milhões de entradas, como alguém confirma que *nem uma única* foi alterada secretamente? Verificar novamente 300 milhões de itens a cada olhada é inviável.

**Problema dois: pertencimento privado.** Para gastar uma nota (Artigo 0), você precisa provar que seu commitment realmente está no quadro. Mas se você apontar para ele ("é a entrada número 4,201,337!"), acabou de se desanonimizar. Você precisa provar *"meu envelope está em algum lugar deste quadro"* sem revelar **qual** deles.

Uma árvore de Merkle resolve ambos de uma vez. Ela comprime a lista inteira em uma única impressão digital e permite provar pertencimento com uma prova minúscula que oculta a posição.

---

## 2. A intuição: um torneio de impressões digitais

Imagine uma chave de torneio eliminatório, mas em vez de jogadores avançando, **impressões digitais são combinadas.**

- Na base, cada pedaço de dado recebe sua própria impressão digital (seu hash do Artigo 3). Essas são as **folhas.**
- Junte-as em pares. As duas impressões digitais de cada par são hasheadas *juntas* em uma impressão digital pai.
- Agrupe os pais em pares, hasheie cada par junto, e assim por diante.
- Continue até que uma **única impressão digital** fique no topo. Essa campeã é a **raiz de Merkle.**

![texto alternativo](image-20.png)

A propriedade mais importante decorre diretamente do efeito avalanche (Artigo 3):

> **A raiz é uma impressão digital de *tudo* o que está abaixo dela.** Mude qualquer folha, mesmo em um único bit, e sua impressão digital muda, o que muda seu pai, o que muda *aquele* pai, até o topo. **A raiz muda.** Portanto, um único pequeno valor de raiz certifica a integridade da lista inteira. Isso resolve o Problema um.

---

## 3. Uma árvore real, calculada exatamente

Vamos construir a árvore de quatro folhas acima com impressões digitais SHA-256 reais sobre as folhas `A, B, C, D` (digests mostrados truncados para facilitar a leitura):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Tudo é apenas "hashear uma coisa e depois hashear pares de hashes". Nada mais exótico do que o Artigo 3, organizado em forma de árvore.

---

## 4. A parte inteligente: provar pertencimento sem revelar a posição

Agora o Problema dois. Digamos que você queira provar que a folha `C` está na árvore, para alguém que conhece apenas a **raiz**. Você *não* entrega a árvore inteira. Você entrega apenas as impressões digitais necessárias para subir de `C` até a raiz, chamadas de **caminho de autenticação** (ou **prova de Merkle**):

> Para provar que `C` está na árvore, forneça:
> - seu irmão `hD`, e
> - seu tio `hAB`.

O verificador, conhecendo apenas a raiz, recomputa a subida:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Calculado de verdade: isso produz `1b3faa3fcc5e...`, que **corresponde à raiz.** A folha está comprovadamente na árvore.

![texto alternativo](image-21.png)

Duas coisas tornam isso poderoso:

- **É minúsculo.** Para 4 folhas, você forneceu 2 hashes. Para uma árvore com `n` folhas, você fornece apenas cerca de **log_2(n)** hashes. Para um bilhão de folhas, isso dá aproximadamente **30 hashes**, não um bilhão. A prova quase não cresce enquanto a árvore explode de tamanho.
- **É a semente da privacidade.** A prova mostra que sua folha está *em algum lugar* da árvore. Quando essa mesma verificação é feita *dentro de uma prova de conhecimento zero* (Artigo 5), até mesmo o próprio caminho fica oculto, então você prova "minha nota está na árvore" sem revelar nem a nota nem sua posição. Isso resolve completamente o Problema dois.

---

## 5. De uma árvore de Merkle à árvore de note commitments do Zcash

Agora podemos afirmar com precisão o que realmente é o "quadro público" do Artigo 0:

> A **árvore de note commitments** é uma árvore de Merkle cujas **folhas são note commitments.** Toda vez que uma nota é criada em qualquer lugar do mundo, seu commitment é anexado como a próxima folha, e a raiz é atualizada.

Alguns detalhes reais:

- **Ela só cresce.** As folhas são anexadas, nunca removidas. Isso é chamado de **árvore de Merkle incremental.** (Combina com o "o quadro nunca arranca nada" do Artigo 0.)
- **A raiz é chamada de *anchor*.** Quando você gasta, sua transação faz referência a um anchor recente e prova, em conhecimento zero, que o commitment da sua nota está na árvore com essa raiz.
- **Profundidade fixa.** As árvores shielded do Zcash têm profundidade **32**, o que significa que podem conter até `2^(32)` (mais de quatro bilhões) notas.
- **Hashing amigável para ZK.** A árvore não é construída com SHA-256. Sapling faz o hash da árvore com **Pedersen hashes** e Orchard usa **Sinsemilla** (ambos do Artigo 3), precisamente para que a subida de pertencimento seja barata de provar dentro de um circuito.

![texto alternativo](image-22.png)

### Uma coisa que a árvore *não* resolve: gastos duplos

A árvore prova que uma nota **existe**. Ela não impede, por si só, que você gaste a mesma nota duas vezes. Esse trabalho pertence ao **conjunto de nullifiers** do Artigo 0: uma coleção separada de "tokens anulados". Quando você gasta, publica o nullifier da nota, e a rede rejeita qualquer nullifier que já tenha visto antes.

Assim, as duas estruturas públicas desempenham papéis complementares, e mantê-las separadas é exatamente o que rompe o vínculo entre o nascimento de uma nota e sua morte:

| Estrutura | Pergunta que responde | Atualizada quando |
|---|---|---|
| **Árvore de note commitments** | "Esta nota existe?" | Uma nota é **criada** (commitment anexado) |
| **Conjunto de nullifiers** | "Esta nota já foi gasta?" | Uma nota é **gasta** (nullifier publicado) |

---

## 6. Um aviso honesto

Simplificações, como sempre. Árvores de Merkle incrementais reais acompanham nós de "fronteira" para que a raiz possa ser atualizada sem reconstruir tudo; a rede mantém uma janela de anchors recentes, não apenas o mais recente, para que as carteiras não quebrem a cada novo bloco; e folhas vazias usam um valor de padding definido. Também desenhamos árvores binárias com potências de dois bem organizadas. Nada disso muda a intuição: folhas de commitments, hasheadas em pares até uma única raiz, com provas curtas de pertencimento. A contabilidade exata volta no artigo sobre o protocolo.

---

## 7. Resumo

- Uma **árvore de Merkle** faz hash dos dados em **folhas** e depois faz hash de **pares para cima** até restar uma única **raiz**.
- Graças ao efeito avalanche, a **raiz é uma impressão digital da lista inteira**: mude uma folha e a raiz muda. Um único valor pequeno certifica um conjunto de dados enorme.
- Uma **prova de pertencimento (caminho de autenticação)** é apenas o conjunto de hashes irmãos ao longo da subida até a raiz, cerca de **log_2(n)** hashes, então as provas permanecem minúsculas mesmo para bilhões de folhas.
- Feita **dentro de uma prova de conhecimento zero**, essa verificação de pertencimento oculta *qual* folha você quer dizer, provando "minha nota está na árvore" sem revelar a nota nem sua posição.
- A **árvore de note commitments** do Zcash é uma árvore de Merkle **incremental** de note commitments, profundidade **32**, cuja raiz é o **anchor**; Sapling a hasheia com **Pedersen** e Orchard com **Sinsemilla**.
- A árvore prova **existência**; o **conjunto de nullifiers** separado impede **gastos duplos**. Mantê-los separados é o que desvincula o nascimento de uma nota de sua morte.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Árvore de Merkle** | Uma árvore de hashes; as folhas são impressões digitais dos dados, os pais fazem hash de seus filhos |
| **Folha** | Um nó na base; no Zcash, um note commitment |
| **Raiz de Merkle** | A única impressão digital no topo que resume a árvore inteira |
| **Caminho de autenticação / prova de Merkle** | Os hashes irmãos necessários para provar que uma folha está na árvore |
| **Árvore de Merkle incremental** | Uma árvore de Merkle append-only (folhas são apenas adicionadas) |
| **Anchor** | Uma raiz de Merkle à qual um gasto faz referência como "o estado da árvore contra o qual estou provando" |
| **Conjunto de nullifiers** | A coleção separada de marcadores de gasto que bloqueia gastos duplos |

---

## FAQ

**Por que uma árvore e não apenas uma lista longa de hashes?**
Uma lista plana obrigaria você a revelar ou processar cada entrada para provar pertencimento. Uma árvore oferece provas de tamanho logarítmico e uma única raiz para integridade.

**O verificador precisa da árvore inteira?**
Não. O verificador só precisa da **raiz** mais o seu curto caminho de autenticação. Esse é exatamente o ponto.

**Por que profundidade 32 especificamente?**
Ela limita a árvore a cerca de quatro bilhões de notas, o que dá uma boa margem, ao mesmo tempo em que mantém a prova de pertencimento (e seu custo dentro do circuito) em um tamanho fixo e administrável.

**Se a raiz muda com cada nova nota, como provas antigas continuam válidas?**
A rede se lembra de uma janela de raízes recentes (anchors), então uma prova feita contra um anchor um pouco mais antigo ainda verifica. O artigo sobre o protocolo explica isso com precisão.

---

### Teste sua intuição

Na nossa árvore de 4 folhas, suponha que um atacante troque secretamente a folha `C` por um valor diferente, mas deixe a raiz publicada inalterada. O que dá errado para ele e por que ele não consegue corrigir isso discretamente? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Mudar `C` muda `hC` (efeito avalanche), o que muda `hCD = H(hC, hD)`, o que muda `ROOT = H(hAB, hCD)`. Então a raiz recomputada não corresponde mais à raiz publicada, e a adulteração é detectada. Para "corrigir isso discretamente", ele precisaria encontrar um `C` diferente que produzisse o *mesmo* `hC`, o que é uma colisão de hash, inviável pelo Artigo 3. A integridade se mantém.
</details>

---

### O que vem a seguir

**Artigo 5 . Provas de conhecimento zero:** o crescendo. Agora já construímos notas, commitments e a árvore, e continuamos dizendo "provado em conhecimento zero". O Artigo 5 finalmente explica como você pode provar que uma afirmação é verdadeira, que sua nota está na árvore, que seu nullifier está correto, que o dinheiro fecha, sem revelar nada disso.

*Parte da série* Zcash from First Principles *para [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
