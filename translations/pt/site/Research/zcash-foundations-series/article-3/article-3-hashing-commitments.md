# Hashing e Commitments: O Envelope Selado Mágico
##### Pesquisa original de [Annkkitaaa](https://github.com/Annkkitaaa)

![texto alternativo](image-15.png)

### Como trancar um segredo em público e nunca mais poder mentir sobre ele

> **Série:** *Zcash from First Principles* . **Artigo 3 . Hashing e Commitments**
> **Público:** iniciantes. Partimos do [Artigo 1 (campos finitos)](article-1-finite-fields.md) e do [Artigo 2 (curvas elípticas)](article-2-elliptic-curves.md), mas a intuição se sustenta por si só.
> **O que você vai levar daqui:** uma compreensão clara de funções hash, do que "hiding" e "binding" realmente significam, e de como o Zcash constrói os note commitments que ancoram cada pagamento privado.

No [Artigo 0](article-0-shielded-transaction.md) descrevemos um "envelope selado mágico": algo que você pode prender em um quadro público para provar que um envelope existe enquanto esconde o que há dentro, e que você nunca mais poderá trocar depois. Prometemos explicar como algo assim é possível. Este é esse artigo. Precisamos de dois ingredientes: **funções hash** e **commitments**.

---

## 1. Por que isso deveria importar para você?

Imagine que você prevê o resultado de uma eleição e quer provar, *depois*, que acertou com antecedência. Você não pode simplesmente anunciar sua previsão (isso influencia as pessoas ou convida a acusações de que você a mudou). E também não pode mantê-la totalmente secreta (aí não poderá provar nada mais tarde).

O que você quer é uma forma de **fixar um valor agora, em público, de tal maneira que:**

- ninguém consiga dizer o que você fixou (ele permanece secreto por enquanto), e
- mais tarde, quando você o revelar, você **não possa mentir** sobre o que era.

Esse mecanismo de "fixar agora, revelar depois, sem mentir" é chamado de **commitment**, e ele está por toda parte no Zcash. O valor e o proprietário de uma note ficam presos em um commitment no momento em que a note é criada. Para construir commitments, primeiro precisamos do seu cavalo de batalha: a função hash.

---

## 2. A intuição: uma impressão digital para dados

Uma **função hash** pega quaisquer dados, desde uma única letra até uma biblioteca inteira, e os comprime em uma string curta de tamanho fixo chamada **digest** ou **hash**. Pense nela como uma **impressão digital para dados**.

![texto alternativo](image-16.png)

Uma boa impressão digital criptográfica tem quatro propriedades. Guarde-as como intuições, não como equações:

| Propriedade | Significado simples | Por que isso importa |
|---|---|---|
| **Determinística** | A mesma entrada sempre gera a mesma impressão digital | Você pode verificar novamente uma impressão digital a qualquer momento |
| **Rápida no sentido direto** | Calcular a impressão digital é rápido | É prático usá-la em toda parte |
| **Unidirecional (resistente à pré-imagem)** | Dada uma impressão digital, você não consegue encontrar a entrada que a produziu | Esconde os dados originais |
| **Resistente a colisões** | Você não consegue encontrar duas entradas diferentes com a mesma impressão digital | Ninguém pode forjar uma correspondência |

E mais um comportamento que faz essas impressões digitais parecerem quase mágicas:

### O efeito avalanche (verificado)

Mude a entrada na menor quantidade possível e a impressão digital muda *completamente*, sem qualquer semelhança com a anterior. Aqui estão duas impressões digitais SHA-256 reais de mensagens que diferem por um único caractere:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

De 64 dígitos hexadecimais, **59 são diferentes.** Um caractere entra, uma impressão digital totalmente não relacionada sai. É por isso que você não pode ajustar uma entrada gradualmente em direção a uma impressão digital-alvo: não existe nenhum sinal de "mais quente / mais frio" para seguir.

---

## 3. Da impressão digital ao commitment

Aqui vai uma ideia tentadora, mas falha: para fazer commitment de um valor secreto `v`, basta publicar sua impressão digital `H(v)`.

Isso faz um bom **binding** (você não pode depois alegar um `v` diferente, porque isso exigiria uma colisão). Mas **falha em esconder.** Se o conjunto de valores possíveis for pequeno, um atacante simplesmente calcula a impressão digital de cada candidato e compara. Fazendo commitment de "sim" ou "não"? Ele aplica hash aos dois e descobre instantaneamente qual você escolheu. A determinismo, nossa amiga há um momento, agora está vazando o segredo.

A correção é uma palavra: **aleatoriedade.**

> **Um commitment é a impressão digital do seu valor misturada com um número aleatório novo:**
> `commitment = H(v, r)` onde `r` é um valor aleatório secreto de "blinding".

Agora o mesmo `v` produz um commitment com aparência diferente toda vez, porque `r` é diferente. As duas propriedades que queríamos finalmente passam a valer ao mesmo tempo:

![texto alternativo](image-17.png)

Para **abrir** (revelar) o commitment mais tarde, você publica `v` e `r`; qualquer pessoa recalcula `H(v, r)` e verifica se coincide. Você ficou preso àquele valor. Esse é o envelope selado mágico do Artigo 0, tornado real.

> **Duas conclusões para levar para sempre:** *binding* vem do fato de o hash ser resistente a colisões; *hiding* vem do fator de blinding aleatório `r`.

---

## 4. Duas formas de construir o envelope

Existem duas receitas comuns, e o Zcash usa ambas.

| | **Commitment baseado em hash** | **Pedersen commitment** (do Artigo 2) |
|---|---|---|
| Receita | `H(v, r)` | `v.G + r.H` (pontos em uma curva) |
| Hiding vem de | o `r` aleatório | o `r` aleatório |
| Binding vem de | resistência a colisões | o alçapão da curva elíptica (ECDLP) |
| Poder especial | simples e rápido | os commitments **se somam** (homomórfico) |

Essa última linha é o motivo de os Pedersen commitments importarem tanto no Zcash. Como `commit(v_1) + commit(v_2)` é um `commit(v_1 + v_2)` válido, o protocolo pode depois provar que **o dinheiro que entra é igual ao dinheiro que sai** somando commitments, tudo isso sem revelar um único valor. Vamos guardar esse fato para o Artigo 6.

---

## 5. Uma sutileza que molda todo o Zcash: hashing amigável para ZK

Aqui está uma percepção que a maioria das introduções deixa passar, e é exatamente o ponto "matemática encontra engenharia" que vale destacar.

SHA-256 é uma impressão digital excelente para a computação do dia a dia. Mas o Zcash não apenas *calcula* hashes; ele precisa **provar, dentro de uma prova de conhecimento zero, que um hash foi calculado corretamente** (o Artigo 5 explica por quê). E aqui está a pegadinha: uma prova de conhecimento zero funciona na linguagem da **aritmética de campos finitos** (Artigo 1), enquanto SHA-256 é construído com operações de manipulação de bits (deslocamentos, ANDs, XORs). Expressar toda essa manipulação de bits em aritmética de campo é enormemente caro, tornando as provas grandes e lentas.

Por isso, os criptógrafos do Zcash projetaram funções hash cujos mecanismos internos *já são* aritmética de campo, tornando-as baratas de provar:

![texto alternativo](image-18.png)

Essa única pressão de engenharia, *"tem que ser barato de provar,"* é o motivo pelo qual o Zcash inventou e adotou funções hash especiais em vez de recorrer ao SHA-256 em toda parte.

---

## 6. Onde isso vive no Zcash

O Zcash usou hashes diferentes ao longo de seus designs, cada um escolhido para a tarefa:

| Design | Hashes usados | Onde |
|---|---|---|
| **Sprout** (o mais antigo) | **SHA-256** | Note commitments e a árvore |
| **Sapling** | **Pedersen hashes**, mais **BLAKE2** | Pedersen para note commitments e a árvore de Merkle; BLAKE2 para derivação de chaves e nullifiers |
| **Orchard** (atual) | **Sinsemilla**, mais **Poseidon** | Sinsemilla para note commitments e a árvore de Merkle; Poseidon para o nullifier, todos projetados para circuitos aritméticos |

Os nomes a reconhecer são **Pedersen** e **Sinsemilla** (hashes no estilo de commitments construídos a partir de pontos de curva, então herdam o superpoder de "se somar" e são baratos de provar) e **Poseidon** (um hash de aritmética de campo criado especificamente para circuitos de conhecimento zero). Quando o Artigo 0 disse que o conteúdo de uma note é selado em um commitment, *é esta* a maquinaria que faz a selagem.

Assim, o ciclo aberto no Artigo 0, *"como um envelope selado pode esconder seu conteúdo e ainda assim ser impossível de falsificar?"*, agora está fechado: **hiding vem de um fator de blinding aleatório, binding vem da resistência a colisões ou do alçapão da curva.**

---

## 7. Um aviso honesto

Simplificamos para manter a clareza. Esquemas reais de commitment especificam exatamente como `v` e `r` são codificados e quais geradores são usados; "hiding" e "binding" vêm em variantes (perfeito vs. computacional) com definições de segurança precisas; e não mostramos os mecanismos internos de Pedersen, Sinsemilla ou Poseidon. Nada disso muda a intuição: um commitment é uma impressão digital mais aleatoriedade que esconde agora e vincula para sempre. Os detalhes voltarão, sinalizados, quando o artigo sobre o protocolo precisar deles.

---

## 8. Resumo

- Uma **função hash** é uma **impressão digital para dados**: determinística, rápida no sentido direto, unidirecional, resistente a colisões, com **efeito avalanche** (um bit entra, uma impressão digital totalmente diferente sai).
- Um **commitment** permite que você **fixe um valor em público agora e o revele depois sem poder mentir.**
- Publicar uma impressão digital pura `H(v)` faz binding, mas **não** esconde. Adicionar um fator de blinding aleatório, `H(v, r)`, resolve isso: **hiding vem de `r`, binding vem da resistência a colisões.**
- O Zcash usa tanto commitments **baseados em hash** quanto **Pedersen**; os Pedersen commitments, além disso, **se somam**, algo que o Artigo 6 vai explorar para provar o balanceamento de valor em privado.
- Como hashes precisam ser **provados** dentro de provas de conhecimento zero, o Zcash usa hashes **amigáveis para ZK** construídos a partir de aritmética de campo (**Pedersen**, **Sinsemilla**, **Poseidon**) em vez de SHA-256 em toda parte.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Hash function** | Comprime quaisquer dados em uma impressão digital curta de tamanho fixo (digest) |
| **Digest** | A impressão digital de saída de uma função hash |
| **Preimage resistance** | Não dá para reverter um digest de volta para sua entrada (unidirecional) |
| **Collision resistance** | Não dá para encontrar duas entradas com o mesmo digest |
| **Avalanche effect** | Uma pequena mudança na entrada altera completamente o digest |
| **Commitment** | Fixar um valor agora, revelar depois, sem poder mentir sobre ele |
| **Blinding factor (`r`)** | O número aleatório novo que faz um commitment esconder |
| **ZK-friendly hash** | Um hash construído com aritmética de campo para ser barato de provar |

---

## FAQ

**Por que não simplesmente criptografar o valor em vez de fazer commitment dele?**
Criptografia trata de *sigilo que você pode descriptografar depois*. Um commitment trata de *binding*: a garantia de que você não pode mudar sua resposta depois. São trabalhos diferentes.

**Se commitments escondem o valor, como alguém verifica as regras?**
Esse é o papel das provas de conhecimento zero (Artigo 5): elas provam que o valor oculto obedece às regras sem revelá-lo.

**O SHA-256 está quebrado, já que o Zcash o evita em alguns lugares?**
Não. SHA-256 está ótimo e o Zcash ainda o usa. Só que é caro de *provar dentro de um circuito*, e é por isso que existem hashes amigáveis para ZK para esse trabalho específico.

**De onde vem o `r` aleatório, e quem o guarda?**
Ele é gerado do zero quando a note é criada e é conhecido pelo proprietário da note. É parte do que torna cada note única e privada.

---

### Teste sua intuição

Você faz commitment da sua previsão eleitoral como `H(v, r)` e a publica. Um amigo insiste que você deveria publicar só `H(v)` para simplificar. Em uma frase, por que isso é uma má ideia se houver apenas dois resultados possíveis? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Com apenas dois resultados, seu amigo pode simplesmente calcular `H("win")` e `H("lose")` por conta própria e comparar com o digest que você publicou, descobrindo instantaneamente sua previsão. O hash puro faz binding, mas não esconde; o `r` aleatório é o que impede esse ataque de adivinhação e verificação.
</details>

---

### O que vem a seguir

**Artigo 4 . Árvores de Merkle:** agora temos milhões de commitments se acumulando. O Artigo 4 mostra como o Zcash os organiza em uma única árvore cuja pequena impressão digital raiz representa todo o histórico, e como você pode provar que sua note está nessa árvore sem revelar qual é. Essa é a forma real do "quadro público" do Artigo 0.

*Parte da série* Zcash from First Principles *para [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
