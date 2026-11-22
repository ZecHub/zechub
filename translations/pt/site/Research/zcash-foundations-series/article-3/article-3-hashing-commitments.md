# Hashing e compromissos: o envelope selado mágico
##### Pesquisa original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-15-0c16784b27.webp)

### Como trancar um segredo em público sem nunca poder mentir sobre ele

> **Série:** *Zcash a partir dos primeiros princípios* . **Artigo 3 . Hashing e compromissos**
> **Público:** iniciantes. Partimos do [Artigo 1 (corpos finitos)](article-1-finite-fields.md) e do [Artigo 2 (curvas elípticas)](article-2-elliptic-curves.md), mas a intuição se sustenta sozinha.
> **O que você vai levar daqui:** uma compreensão clara das funções hash, do que "ocultação" e "vinculação" realmente significam e de como o Zcash constrói os compromissos de note que ancoram todo pagamento privado.

No [Artigo 0](article-0-shielded-transaction.md), descrevemos um "envelope selado mágico": algo que você pode fixar em um quadro público, que prova que um envelope existe enquanto esconde o que há dentro, e que você nunca poderá trocar depois. Prometemos explicar como isso é possível. Este é esse artigo. Precisamos de dois ingredientes: **funções hash** e **compromissos**.

---

## 1. Por que você deveria se importar?

Imagine que você prevê o resultado de uma eleição e quer provar, *depois*, que acertou com antecedência. Você não pode simplesmente anunciar sua previsão (isso influencia as pessoas ou dá margem a acusações de que você a mudou). E também não pode mantê-la totalmente em segredo (aí não conseguirá provar nada depois).

O que você quer é uma forma de **fixar um valor agora, em público, de modo que:**

- ninguém consiga saber o que você fixou (ele permanece secreto por enquanto), e
- depois, quando você o revelar, você **não possa mentir** sobre o que era.

Esse mecanismo de "fixar agora, revelar depois, sem mentir" se chama **compromisso**, e ele está em toda parte no Zcash. O valor e o dono de uma note ficam trancados em um compromisso no momento em que a note é criada. Para construir compromissos, primeiro precisamos da ferramenta que faz o trabalho pesado: a função hash.

---

## 2. A intuição: uma impressão digital para dados

Uma **função hash** recebe qualquer dado, seja uma única letra ou uma biblioteca inteira, e o comprime em uma string curta e de tamanho fixo chamada **digest** ou **hash**. Pense nela como uma **impressão digital para dados.**

![alt text](/content-images/image-16-52fdf62c87.webp)

Uma boa impressão digital criptográfica tem quatro propriedades. Guarde-as como intuições, não como equações:

| Propriedade | Significado simples | Por que importa |
|---|---|---|
| **Determinística** | A mesma entrada sempre gera a mesma impressão digital | Você pode reverificar uma impressão digital a qualquer momento |
| **Rápida no sentido direto** | Calcular a impressão digital é rápido | Prática para usar em todo lugar |
| **Unidirecional (resistente a pré-imagem)** | Dada uma impressão digital, você não consegue encontrar a entrada que a gerou | Esconde os dados originais |
| **Resistente a colisões** | Você não consegue encontrar duas entradas diferentes com a mesma impressão digital | Ninguém consegue forjar uma correspondência |

E mais um comportamento que faz as impressões digitais parecerem quase mágicas:

### O efeito avalanche (verificado)

Mude a entrada na menor quantidade possível e a impressão digital muda *completamente*, sem nenhuma semelhança com a anterior. Aqui estão duas impressões digitais SHA-256 reais de mensagens que diferem em um único caractere:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

Dos 64 dígitos hexadecimais, **59 são diferentes.** Um caractere a mais na entrada, uma impressão digital totalmente sem relação na saída. É por isso que você não consegue ir ajustando uma entrada em direção a uma impressão digital-alvo: não existe um sinal de "quente / frio" para seguir.

---

## 3. Da impressão digital ao compromisso

Aqui vai uma ideia tentadora, mas falha: para se comprometer com um valor secreto `v`, basta publicar sua impressão digital `H(v)`.

Isso *vincula* você direitinho (você não pode depois alegar um `v` diferente, porque isso exigiria uma colisão). Mas **não consegue esconder.** Se o conjunto de valores possíveis for pequeno, um atacante simplesmente calcula a impressão digital de cada candidato e compara. Comprometer-se com "sim" ou "não"? Ele calcula o hash de ambos e descobre na hora qual você escolheu. O determinismo, nosso amigo há um instante, agora está vazando o segredo.

A solução é uma palavra: **aleatoriedade.**

> **Um compromisso é a impressão digital do seu valor misturado com um número aleatório novo:**
> `commitment = H(v, r)`, em que `r` é um valor secreto e aleatório de "cegamento".

Agora o mesmo `v` produz um compromisso de aparência diferente a cada vez, porque `r` é diferente. As duas propriedades que queríamos finalmente valem ao mesmo tempo:

![alt text](/content-images/image-17-3ec4617665.webp)

Para **abrir** (revelar) o compromisso depois, você publica `v` e `r`; qualquer pessoa recalcula `H(v, r)` e verifica se corresponde. Você está preso ao que fixou. Esse é o envelope selado mágico do Artigo 0, tornado real.

> **Duas lições para levar para sempre:** a *vinculação* vem do hash ser resistente a colisões; a *ocultação* vem do fator de cegamento aleatório `r`.

---

## 4. Duas formas de construir o envelope

Existem duas receitas comuns, e o Zcash usa ambas.

| | **Compromisso baseado em hash** | **Compromisso de Pedersen** (do Artigo 2) |
|---|---|---|
| Receita | `H(v, r)` | `v.G + r.H` (pontos em uma curva) |
| Ocultação vem de | o `r` aleatório | o `r` aleatório |
| Vinculação vem de | resistência a colisões | o alçapão da curva elíptica (ECDLP) |
| Poder especial | simples e rápido | os compromissos **se somam** (homomórfico) |

Essa última linha é o motivo pelo qual os compromissos de Pedersen importam tanto no Zcash. Como `commit(v_1) + commit(v_2)` é um `commit(v_1 + v_2)` válido, o protocolo pode depois provar que **o dinheiro que entra é igual ao dinheiro que sai** somando compromissos, tudo isso sem revelar um único valor. Estamos guardando esse fato para o Artigo 6.

---

## 5. Uma sutileza que molda todo o Zcash: hashing amigável a ZK

Aqui está uma percepção que a maioria das introduções deixa passar, e é exatamente o ponto em que "a matemática encontra a engenharia" que vale a pena destacar.

O SHA-256 é uma excelente impressão digital para a computação do dia a dia. Mas o Zcash não apenas *calcula* hashes; ele precisa **provar, dentro de uma prova de conhecimento zero, que um hash foi calculado corretamente** (o Artigo 5 explica por quê). E aqui está o problema: uma prova de conhecimento zero funciona na linguagem da **aritmética de corpos finitos** (Artigo 1), enquanto o SHA-256 é construído com operações de manipulação de bits (deslocamentos, ANDs, XORs). Expressar toda essa manipulação de bits em aritmética de corpos é extremamente caro, tornando as provas enormes e lentas.

Por isso, os criptógrafos do Zcash projetaram funções hash cujo funcionamento interno *já* é aritmética de corpos, tornando-as baratas de provar:

![alt text](/content-images/image-18-89ade807ad.webp)

Essa única pressão de engenharia, *"precisa ser barato de provar"*, é o motivo pelo qual o Zcash inventou e adotou funções hash especiais em vez de recorrer ao SHA-256 em todo lugar.

---

## 6. Onde isso aparece no Zcash

O Zcash usou hashes diferentes ao longo de seus designs, cada um escolhido para a tarefa:

| Design | Hashes usados | Onde |
|---|---|---|
| **Sprout** (o mais antigo) | **SHA-256** | Compromissos de note e a árvore |
| **Sapling** | **Hashes de Pedersen**, além de **BLAKE2** | Pedersen para compromissos de note e a árvore Merkle; BLAKE2 para derivação de chaves e nulificadores |
| **Orchard** (atual) | **Sinsemilla**, além de **Poseidon** | Sinsemilla para compromissos de note e a árvore Merkle; Poseidon para o nulificador, todos projetados para circuitos aritméticos |

Os nomes que você deve reconhecer são **Pedersen** e **Sinsemilla** (hashes no estilo de compromisso construídos a partir de pontos de curva, então herdam o superpoder de "se somar" e são baratos de provar) e **Poseidon** (um hash de aritmética de corpos criado especificamente para circuitos de conhecimento zero). Quando o Artigo 0 disse que o conteúdo de uma note é selado em um compromisso, *esta* é a engrenagem que faz a selagem.

Assim, a questão em aberto do Artigo 0, *"como um envelope selado pode esconder seu conteúdo e ainda assim ser impossível de forjar?"*, agora está resolvida: **ocultação graças a um fator de cegamento aleatório, vinculação graças à resistência a colisões ou ao alçapão da curva.**

---

## 7. Um aviso honesto

Simplificamos para manter tudo claro. Esquemas de compromisso reais especificam exatamente como `v` e `r` são codificados e quais geradores são usados; "ocultação" e "vinculação" têm, cada uma, variantes (perfeita vs. computacional) com definições de segurança precisas; e não mostramos o funcionamento interno de Pedersen, Sinsemilla ou Poseidon. Nada disso muda a intuição: um compromisso é uma impressão digital mais aleatoriedade, que esconde agora e vincula para sempre. Os detalhes voltam, devidamente sinalizados, quando o artigo sobre o protocolo precisar deles.

---

## 8. Resumo

- Uma **função hash** é uma **impressão digital para dados**: determinística, rápida no sentido direto, unidirecional, resistente a colisões e com um **efeito avalanche** (um bit diferente na entrada, uma impressão digital totalmente diferente na saída).
- Um **compromisso** permite que você **fixe um valor em público agora e o revele depois sem poder mentir.**
- Publicar uma impressão digital pura `H(v)` vincula, mas **não** esconde. Adicionar um fator de cegamento aleatório, `H(v, r)`, resolve isso: **ocultação graças a `r`, vinculação graças à resistência a colisões.**
- O Zcash usa compromissos **baseados em hash** e de **Pedersen**; os compromissos de Pedersen, além disso, **se somam**, o que o Artigo 6 vai explorar para provar o equilíbrio de valores de forma privada.
- Como os hashes precisam ser **provados** dentro de provas de conhecimento zero, o Zcash usa hashes **amigáveis a ZK** construídos a partir de aritmética de corpos (**Pedersen**, **Sinsemilla**, **Poseidon**) em vez de SHA-256 em todo lugar.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Hash function** | Comprime qualquer dado em uma impressão digital curta e de tamanho fixo (digest) |
| **Digest** | A impressão digital de saída de uma função hash |
| **Preimage resistance** | Não é possível reverter um digest de volta à sua entrada (unidirecional) |
| **Collision resistance** | Não é possível encontrar duas entradas com o mesmo digest |
| **Avalanche effect** | Uma pequena mudança na entrada muda completamente o digest |
| **Commitment** | Fixar um valor agora, revelar depois, sem poder mentir sobre ele |
| **Blinding factor (`r`)** | O número aleatório novo que faz um compromisso esconder |
| **ZK-friendly hash** | Um hash construído a partir de aritmética de corpos para ser barato de provar |

---

## Perguntas frequentes

**Por que não simplesmente criptografar o valor em vez de se comprometer com ele?**
A criptografia trata de *sigilo que você pode descriptografar depois*. Um compromisso trata de *vinculação*: a garantia de que você não pode mudar sua resposta depois. São tarefas diferentes.

**Se os compromissos escondem o valor, como alguém verifica as regras?**
Esse é o papel das provas de conhecimento zero (Artigo 5): elas provam que o valor escondido obedece às regras sem revelá-lo.

**O SHA-256 está quebrado, já que o Zcash o evita em alguns lugares?**
Não. O SHA-256 funciona bem e o Zcash ainda o usa. Ele só é caro de *provar dentro de um circuito*, e é por isso que existem hashes amigáveis a ZK para essa tarefa específica.

**De onde vem o `r` aleatório, e quem o guarda?**
Ele é gerado na hora em que a note é criada e é conhecido pelo dono da note. Ele faz parte do que torna cada note única e privada.

---

### Teste sua intuição

Você se compromete com sua previsão eleitoral como `H(v, r)` e a publica. Um amigo insiste que você deveria publicar apenas `H(v)` para simplificar. Em uma frase, por que essa é uma má ideia se houver apenas dois resultados possíveis? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Com apenas dois resultados, seu amigo pode simplesmente calcular `H("win")` e `H("lose")` por conta própria e comparar com o digest que você publicou, descobrindo sua previsão na hora. O hash puro vincula, mas não esconde; o `r` aleatório é o que impede esse ataque de adivinhar e verificar.
</details>

---

### O que vem a seguir

**Artigo 4 . Árvores Merkle:** agora temos milhões de compromissos se acumulando. O Artigo 4 mostra como o Zcash os organiza em uma única árvore cuja minúscula impressão digital da raiz representa todo o histórico, e como você pode provar que sua note está nessa árvore sem revelar qual é. Essa é a forma real do "quadro público" do Artigo 0.

*Parte da série* Zcash a partir dos primeiros princípios *para [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
