# Corpos Finitos: O Sistema Numérico em que a Criptografia Vive
##### Pesquisa Original de [Annkkitaaa](https://github.com/Annkkitaaa)

![texto alternativo](image-5.png)

### Por que o "dar a volta" é o fundamento secreto do Zcash

> **Série:** *Zcash from First Principles* . **Artigo 1 . Corpos Finitos**
> **Público:** iniciantes. Pressupomos apenas a aritmética escolar comum (somar, multiplicar, dividir). Nenhum conhecimento prévio de criptografia ou matemática avançada.
> **O que você levará deste artigo:** uma compreensão intuitiva e correta de corpos finitos, por que criptógrafos os usam e onde eles aparecem dentro do Zcash.

No [Artigo 0](article-0-shielded-transaction.md) conhecemos cinco personagens: a nota, o commitment, a árvore de commitment de notas, o nullifier e a prova de conhecimento zero. Deixamos uma ponta solta: *de onde vêm, de fato, todas as chaves e receitas secretas?* Elas vêm de números. Mas não dos números comuns com os quais você cresceu. Elas vêm de um sistema numérico especial e autocontido chamado **corpo finito**, e quase toda parte da criptografia no Zcash é construída sobre ele.

Este artigo desenvolve essa ideia aos poucos. Como prometido, primeiro a intuição. Sem fórmulas até que elas se justifiquem.

---

## 1. Por que isso deveria importar para você?

Os números comuns têm um problema para a criptografia: há infinitamente muitos deles, e eles vazam informação.

Pense no que acontece quando um número fica *maior*. Se eu disser que um cálculo secreto produziu `8,142,067`, você já sabe bastante: é um número de sete dígitos, é ímpar, é "razoavelmente grande". O tamanho é uma pista. E pistas são exatamente o que um sistema de privacidade não pode se dar ao luxo de revelar.

A criptografia quer um sistema numérico em que:

- existam **finitamente muitos** valores, para que um computador possa armazenar qualquer um deles exatamente, sem arredondamento e sem overflow,
- os valores **não revelem seu tamanho**, porque o sistema não tem uma noção real de "maior",
- você ainda possa **somar, subtrair, multiplicar e dividir** livremente e de forma reversível, porque receitas criptográficas precisam de álgebra de verdade para funcionar, e
- o espaço possa ser **astronomicamente grande**, para que adivinhar seja inútil.

Essa lista de desejos tem um nome. É um **corpo finito**. Vamos construir a intuição para um antes de escrever um único símbolo.

---

## 2. A intuição: um relógio

Você já usa um corpo finito todos os dias. É o relógio na sua parede.

Em um relógio de 12 horas, os números *dão a volta*. Comece às 10 horas, some 5 horas, e você não cai em "15 horas", você cai em **3 horas**. O relógio tem apenas doze posições, e contar além do topo simplesmente volta ao início.

![texto alternativo](image-9.png)

Três coisas acabaram de acontecer, e elas são o ponto central deste artigo inteiro:

1. **O mundo é finito.** Há exatamente doze posições, não importa quanto tempo você conte.
2. **Somar continua funcionando.** Você pode somar horas o dia inteiro; sempre cairá em uma posição válida do relógio.
3. **O tamanho deixou de importar.** "3 horas" não diz se você contou 3 horas, ou 15, ou 27. O dar a volta *apagou a informação de tamanho.* Esse apagamento é exatamente a propriedade favorável à privacidade que queríamos.

Essa aritmética com volta tem um nome formal: **aritmética modular**. O relógio funciona "módulo 12", escrito **mod 12**. Matemáticos preferem contar posições começando em 0, então um "relógio mod 12" na verdade tem as posições `0, 1, 2, ..., 11`. Um relógio mod 7 teria posições de `0` a `6`.

> **A única regra:** para calcular qualquer coisa "mod p", faça a aritmética comum, depois divida por `p` e mantenha apenas o resto.
> Exemplo em mod 7: `5 + 4 = 9`, e `9` deixa resto `2` depois de dividir por `7`, então `5 + 4 = 2 (mod 7)`.

---

## 3. De um relógio a um corpo

Um relógio nos permite somar. Um **corpo** é o upgrade: um sistema numérico em que as quatro operações se comportam bem, incluindo a mais delicada, a divisão.

Informalmente, um **corpo** é qualquer conjunto de "números" em que você pode **somar, subtrair, multiplicar e dividir** (por qualquer coisa exceto zero), e todas as regras familiares continuam valendo: a ordem não importa para adição ou multiplicação, parênteses podem ser reagrupados, existe um `0` e um `1`, e todo número tem um negativo e (exceto o `0`) um recíproco.

Os números racionais formam um corpo. Os números reais formam um corpo. O que queremos é um corpo *finito*.

Aqui está o resultado principal, e ele é belo:

> **Pegue os números inteiros `0, 1, ..., p-1` e faça toda a aritmética mod `p`. Se `p` é um número primo, o resultado é um corpo finito.** Nós o escrevemos como `F_p` (lê-se "F subscrito p").

Então `F_7 = {0, 1, 2, 3, 4, 5, 6}` com aritmética estilo relógio mod 7 é um verdadeiro corpo finito. Vamos vê-lo respirar.

### Multiplicação em F_7 (verificada)

Cada entrada é `(linha x coluna) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Olhe para as linhas de `1` até `6`: cada uma contém cada valor não nulo `1..6` exatamente uma vez. Esse padrão de "sem repetições, sem faltar nada" é a impressão digital visível de um corpo.

### Divisão: a mágica que exige um primo

Divisão é apenas "multiplicar pelo recíproco". Em `F_7`, o recíproco (ou **inverso**) de um número `a` é o valor `a^(-1)` para o qual `a x a^(-1) = 1`. Lendo diretamente da tabela:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Verifique um: `2 x 4 = 8 = 1 (mod 7)`. Então "dividir por 2" em `F_7` significa "multiplicar por 4". Todo elemento não nulo tem um parceiro. **É isso que faz de `F_7` um corpo.**

---

## 4. Por que o módulo precisa ser primo

Esta é a ideia mais importante do artigo, então vamos torná-la concreta em vez de abstrata.

Veja o que quebra se tentarmos ingenuamente construir um "corpo" mod `6` (e `6` *não* é primo):

> Existe algum `x` tal que `2 x x = 1 (mod 6)`? Verificando todos: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **A resposta `1` nunca aparece.** Então `2` não tem recíproco mod 6. Pior ainda, `2 x 3 = 6 = 0 (mod 6)`: dois números não nulos se multiplicaram para dar zero.

Essa segunda frase é uma catástrofe para a aritmética. Duas coisas não nulas se multiplicando para dar zero (chamadas de **divisor de zero**) significam que a divisão está quebrada, e um sistema com divisão quebrada não é um corpo. Isso acontece precisamente porque `6` fatoriza como `2 x 3`.

Um primo, por definição, não tem esses fatores. Então mod um primo, divisores de zero não podem aparecer, todo elemento não nulo ganha um recíproco limpo, e a estrutura é um corpo adequado.

![texto alternativo](image-8.png)

> **Frase reutilizável para seus artigos:** *entra módulo primo, sai divisão limpa.*

---

## 5. A única fórmula que vale a pena conhecer: como computadores encontram inversos

Lemos inversos em uma tabela para `F_7`, mas o primo do Zcash tem centenas de dígitos; nenhuma tabela é possível. Há um atalho clássico, e é a única fórmula deste artigo.

**O Pequeno Teorema de Fermat** diz que, para um primo `p` e qualquer `a` não nulo:

```
a^(p-1) = 1   (mod p)
```

Reorganize isso (removendo um fator de `a`) e você obtém o inverso de graça:

```
a^(-1) = a^(p-2)   (mod p)
```

Teste em `F_7` (`p = 7`, então `p - 2 = 5`): o inverso de `2` deve ser `2^5 = 32 = 4 (mod 7)`. E de fato nossa tabela dizia `2^(-1) = 4`. Computadores elevam números a grandes potências extremamente rápido, então isso transforma "encontrar o recíproco" em um cálculo rápido e exato mesmo para primos gigantescos.

Você não precisa memorizar isso. Precisa saber que **divisão em um corpo finito é uma operação rápida e exata**, e é exatamente por isso que os criptógrafos ficam felizes em construir sobre ela.

---

## 6. Por que a criptografia se apaixonou por corpos finitos

Juntando a intuição, aqui está o caso completo em uma página.

| Propriedade de `F_p` | Por que um sistema de privacidade a quer |
|---|---|
| **Finito** | Um computador armazena qualquer elemento exatamente; sem arredondamento, sem overflow, sem imprecisão de ponto flutuante |
| **Dar a volta** | Apaga o "tamanho", então um valor não revela nada sobre como foi produzido |
| **As quatro operações funcionam** | Receitas criptográficas (chaves, commitments, provas) precisam de álgebra genuína, não apenas contagem |
| **Tamanho escolhível** | Escolha um primo de 255 bits ou 381 bits e o corpo terá mais elementos do que há átomos no universo observável; adivinhar é inútil |
| **Exato e determinístico** | Duas partes honestas calculando a mesma coisa sempre obtêm resultados idênticos, do que as provas dependem |

Um corpo finito é, em uma frase, **um playground perfeitamente fechado, perfeitamente exato e perfeitamente enorme para a aritmética.** Todo o resto no Zcash é construído brincando dentro dele.

---

## 7. Onde isso vive no Zcash

Você não precisa aceitar "Zcash usa corpos finitos" por fé. Aqui está o mapa concreto (a maquinaria mais profunda fica para artigos posteriores; isto é apenas para mostrar que as impressões digitais são reais).

- **Sapling** (um design shielded mais antigo) constrói suas provas sobre uma curva chamada **BLS12-381**, cujo corpo base usa um primo de **381 bits**. Toda coordenada, chave e elemento de prova é um elemento de um corpo finito construído sobre esse primo.
- **Orchard** (o design shielded atual) usa um par de curvas chamadas **Pallas and Vesta** (as curvas "Pasta"), cujos corpos usam primos de aproximadamente **255 bits**.
- O **note commitment**, o **nullifier** e os números dentro de uma **prova de conhecimento zero** do Artigo 0 são todos, no fundo, elementos de um desses corpos finitos. Quando o protocolo diz "compute este commitment", ele quer dizer "faça esta aritmética mod aquele primo".

![texto alternativo](image-7.png)

Então a resposta para a pergunta em aberto do Artigo 0, *"de onde vêm as receitas secretas?"*, começa aqui: **tudo começa como aritmética em um corpo finito.** No próximo artigo, vamos pegar esse corpo e construir os objetos reais, pontos em uma curva elíptica, que se tornam chaves e commitments.

---

## 8. Um aviso honesto

Para manter o texto amigável para iniciantes, simplificamos algumas coisas verdadeiras. Corpos finitos não existem apenas na forma `F_p`; você também pode construir corpos com `p^n` elementos (chamados de **corpos de extensão**), e eles importam para os "pairings" dos quais o sistema de provas do Sapling depende. Também pulamos a lista completa dos axiomas de corpo e passamos rapidamente por como primos desse tamanho são escolhidos e validados. Nada disso muda a intuição que você agora tem; apenas a refina. Vamos recolocar a precisão, com sinalizadores, quando um artigo posterior precisar disso.

---

## 9. Resumo

- A criptografia precisa de um sistema numérico que seja **finito, exato, cego ao tamanho, totalmente invertível e enorme.** Esse sistema é um **corpo finito**.
- A intuição é a de um **relógio**: aritmética que **dá a volta** (aritmética modular), o que convenientemente apaga o "tamanho" de um número.
- Fazer aritmética com os números `0..p-1` mod um **primo** `p` produz um corpo real `F_p`, em que você também pode **dividir** porque todo elemento não nulo tem um inverso.
- O módulo **precisa ser primo**: um módulo composto cria divisores de zero (como `2 x 3 = 0 mod 6`) e quebra a divisão.
- Computadores encontram inversos rapidamente via **O Pequeno Teorema de Fermat** (`a^(-1) = a^(p-2)`).
- Em **Zcash**, toda chave, commitment, nullifier e elemento de prova é, em última análise, um elemento de um grande corpo finito (corpos Pasta de 255 bits para Orchard, um corpo de 381 bits para a BLS12-381 do Sapling).

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Aritmética modular** | Aritmética que dá a volta ao atingir um valor fixo, como um relógio |
| **mod p** | "Divida por `p` e mantenha o resto" |
| **Corpo** | Um sistema numérico em que somar, subtrair, multiplicar e dividir funcionam |
| **Corpo finito `F_p`** | Os números `0..p-1` com aritmética feita mod um primo `p` |
| **Inverso (recíproco)** | O elemento `a^(-1)` tal que `a x a^(-1) = 1`; "dividir por `a`" significa multiplicar por ele |
| **Divisor de zero** | Dois valores não nulos cujo produto é zero; a coisa que arruína módulos compostos |
| **Primo** | Um número inteiro maior que 1 sem fatores além de 1 e dele mesmo |

---

## FAQ

**Por que não usar apenas inteiros comuns ou decimais?**
Decimais arredondam e derivam; inteiros crescem sem limite e revelam tamanho. Corpos finitos são exatos, limitados e cegos ao tamanho, o que a criptografia exige.

**"Dar a volta" perde informação?**
De propósito, sim. Apagar o tamanho de valores intermediários é uma funcionalidade, não um bug, para a privacidade.

**Um primo maior é sempre mais seguro?**
De forma geral, um corpo maior significa mais valores possíveis e mais dificuldade para adivinhar, mas a segurança depende da construção inteira, não apenas do tamanho do corpo. Artigos posteriores tornam isso preciso.

**Por que esses primos específicos (255 bits, 381 bits) no Zcash?**
Eles são escolhidos para que as curvas construídas sobre eles tenham a estrutura e a eficiência corretas para o sistema de provas. Essa "estrutura correta" é o tema dos próximos dois artigos.

---

### Teste sua intuição

Em `F_7`, quanto é `5 - 6`? (Lembre-se: permaneça dentro de `{0,...,6}` dando a volta.) *(Resposta abaixo.)*

<details><summary>Resposta</summary>

`5 - 6 = -1`, e `-1` envolvido em `F_7` é `6` (porque `6 + 1 = 7 = 0`). Então `5 - 6 = 6 (mod 7)`. A subtração nunca sai do corpo; ela apenas dá a volta no outro sentido.
</details>

---

### O que vem a seguir

**Artigo 2 . Curvas elípticas:** pegamos o corpo finito que acabamos de construir e o usamos para desenhar um tipo estranho de curva cujos pontos podem ser "somados" entre si. Esses pontos se tornam as chaves e commitments do Zcash, e escondem uma trapdoor de mão única que torna possível todo o sistema de privacidade. Intuição primeiro, como sempre.

*Parte da série* Zcash from First Principles *para [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
