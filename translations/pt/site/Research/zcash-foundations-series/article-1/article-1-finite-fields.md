# Corpos finitos: o sistema numérico onde vive a criptografia
##### Pesquisa original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-5-6e8a8950f8.webp)

### Por que "dar a volta" é a base secreta do Zcash

> **Série:** *Zcash a partir dos primeiros princípios* . **Artigo 1 . Corpos finitos**
> **Público:** iniciantes. Pressupomos apenas a aritmética comum da escola (somar, multiplicar, dividir). Nenhum conhecimento prévio de criptografia ou de matemática avançada.
> **O que você vai levar daqui:** uma compreensão intuitiva e correta dos corpos finitos, de por que os criptógrafos os usam e de onde eles aparecem dentro do Zcash.

No [Artigo 0](article-0-shielded-transaction.md) conhecemos cinco personagens: a note, o compromisso, a árvore de compromissos de notes, o nulificador e a prova de conhecimento zero. Deixamos uma ponta solta: *de onde vêm, afinal, todas as chaves e receitas secretas?* Elas vêm de números. Mas não dos números comuns com os quais você cresceu. Elas vêm de um sistema numérico especial e autocontido chamado **corpo finito**, e quase toda a criptografia do Zcash é construída sobre ele.

Este artigo constrói essa ideia devagar. Como prometido, a intuição vem primeiro. Nenhuma fórmula até que ela valha a pena.

---

## 1. Por que você deveria se importar?

Os números comuns têm um problema para a criptografia: eles são infinitos e vazam informação.

Pense no que acontece quando um número fica *maior*. Se eu disser que um cálculo secreto produziu `8,142,067`, você já sabe bastante coisa: é um número de sete dígitos, é ímpar, é "razoavelmente grande". O tamanho é uma pista. E pistas são exatamente o que um sistema de privacidade não pode se dar ao luxo de entregar.

A criptografia quer um sistema numérico em que:

- haja **um número finito** de valores, para que um computador possa armazenar qualquer um deles com exatidão, sem arredondamento e sem overflow,
- os valores **não vazem seu tamanho**, porque o sistema não tem uma noção real de "maior",
- ainda seja possível **somar, subtrair, multiplicar e dividir** livremente e de forma reversível, porque as receitas criptográficas precisam de álgebra de verdade para funcionar, e
- o espaço possa ser **astronomicamente grande**, para que adivinhar seja inútil.

Essa lista de desejos tem um nome. É um **corpo finito**. Vamos construir a intuição de um antes de escrever um único símbolo.

---

## 2. A intuição: um relógio

Você já usa um corpo finito todos os dias. É o relógio na sua parede.

Em um relógio de 12 horas, os números *dão a volta*. Comece às 10 horas, some 5 horas, e você não chega às "15 horas", chega às **3 horas**. O relógio tem só doze posições, e contar além do topo simplesmente volta ao início.

![alt text](/content-images/image-9-30b39f4cc5.webp)

Acabaram de acontecer três coisas que são o ponto central deste artigo:

1. **O mundo é finito.** Há exatamente doze posições, não importa quanto tempo você conte.
2. **A soma continua funcionando.** Você pode somar horas o dia inteiro; sempre cai em uma posição válida do relógio.
3. **O tamanho deixou de importar.** "3 horas" não diz se você contou 3 horas, 15 ou 27. A volta *apagou a informação de tamanho.* Esse apagamento é exatamente a propriedade favorável à privacidade que queríamos.

Essa aritmética de dar a volta tem um nome formal: **aritmética modular**. O relógio funciona "módulo 12", escrito **mod 12**. Os matemáticos preferem contar as posições a partir de 0, então um "relógio mod 12" na verdade tem as posições `0, 1, 2, ..., 11`. Um relógio mod 7 teria as posições de `0` a `6`.

> **A única regra:** para calcular qualquer coisa "mod p", faça a aritmética comum, depois divida por `p` e fique só com o resto.
> Exemplo mod 7: `5 + 4 = 9`, e `9` deixa resto `2` ao ser dividido por `7`, então `5 + 4 = 2 (mod 7)`.

---

## 3. Do relógio ao corpo

Um relógio nos permite somar. Um **corpo** é a evolução: um sistema numérico em que as quatro operações funcionam bem, inclusive a mais complicada, a divisão.

Informalmente, um **corpo** é qualquer coleção de "números" em que você pode **somar, subtrair, multiplicar e dividir** (por qualquer coisa, exceto zero), e todas as regras conhecidas continuam valendo: a ordem não importa na soma nem na multiplicação, os parênteses podem ser reagrupados, existem um `0` e um `1`, e todo número tem um oposto e (exceto o `0`) um inverso.

Os números racionais formam um corpo. Os números reais formam um corpo. O que queremos é um corpo *finito*.

Aqui está o resultado principal, e ele é lindo:

> **Pegue os números inteiros `0, 1, ..., p-1` e faça toda a aritmética mod `p`. Se `p` for um número primo, o resultado é um corpo finito.** Escrevemos `F_p` (lê-se "F índice p").

Então `F_7 = {0, 1, 2, 3, 4, 5, 6}` com aritmética de relógio mod 7 é um corpo finito de verdade. Vamos vê-lo em ação.

### Multiplicação em F_7 (verificada)

Cada entrada é `(row x column) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Observe as linhas de `1` a `6`: cada uma contém todos os valores não nulos `1..6` exatamente uma vez. Esse padrão de "nenhuma repetição, nada faltando" é a impressão digital visível de um corpo.

### Divisão: a mágica que precisa de um primo

Dividir é apenas "multiplicar pelo inverso". Em `F_7`, o inverso de um número `a` é o valor `a^(-1)` para o qual `a x a^(-1) = 1`. Lendo diretamente da tabela:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Confira um: `2 x 4 = 8 = 1 (mod 7)`.  Então "dividir por 2" em `F_7` significa "multiplicar por 4". Todo elemento não nulo tem um parceiro. **É isso que faz de `F_7` um corpo.**

---

## 4. Por que o módulo precisa ser primo

Esta é a ideia mais importante do artigo, então vamos torná-la concreta em vez de abstrata.

Veja o que quebra se tentarmos ingenuamente construir um "corpo" mod `6` (e `6` *não* é primo):

> Existe algum `x` com `2 x x = 1 (mod 6)`? Verificando todos: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **A resposta `1` nunca aparece.** Então `2` não tem inverso mod 6. Pior ainda, `2 x 3 = 6 = 0 (mod 6)`: dois números não nulos multiplicados resultando em zero.

Essa segunda frase é uma catástrofe para a aritmética. Duas coisas não nulas cuja multiplicação dá zero (chamadas de **divisores de zero**) significam que a divisão está quebrada, e um sistema com a divisão quebrada não é um corpo. Isso acontece exatamente porque `6` se fatora como `2 x 3`.

Um primo, por definição, não tem esses fatores. Então, módulo um primo, nenhum divisor de zero pode aparecer, todo elemento não nulo ganha um inverso limpo e a estrutura é um corpo de verdade.

![alt text](/content-images/image-8-573914db92.webp)

> **Frase reutilizável para os seus artigos:** *entra módulo primo, sai divisão limpa.*

---

## 5. A única fórmula que vale a pena conhecer: como os computadores encontram inversos

Lemos os inversos em uma tabela para `F_7`, mas o primo do Zcash tem centenas de dígitos; nenhuma tabela é possível. Existe um atalho clássico, e é a única fórmula deste artigo.

O **Pequeno Teorema de Fermat** diz que, para um primo `p` e qualquer `a` não nulo:

```
a^(p-1) = 1   (mod p)
```

Reorganize (separe um fator de `a`) e você obtém o inverso de graça:

```
a^(-1) = a^(p-2)   (mod p)
```

Teste em `F_7` (`p = 7`, então `p - 2 = 5`): o inverso de `2` deveria ser `2^5 = 32 = 4 (mod 7)`. E de fato nossa tabela dizia `2^(-1) = 4`.  Os computadores elevam a potências grandes muito rapidamente, então isso transforma "encontrar o inverso" em um cálculo rápido e exato, mesmo para primos gigantescos.

Você não precisa memorizar isso. Precisa saber que **a divisão em um corpo finito é uma operação rápida e exata**, e é exatamente por isso que os criptógrafos ficam felizes em construir sobre ela.

---

## 6. Por que a criptografia se apaixonou pelos corpos finitos

Juntando a intuição, aqui está o argumento completo em uma página.

| Propriedade de `F_p` | Por que um sistema de privacidade a quer |
|---|---|
| **Finito** | Um computador armazena qualquer elemento com exatidão; sem arredondamento, sem overflow, sem imprecisão de ponto flutuante |
| **Dar a volta** | Apaga o "tamanho", então um valor não vaza nada sobre como foi produzido |
| **As quatro operações funcionam** | As receitas criptográficas (chaves, compromissos, provas) precisam de álgebra genuína, não apenas de contagem |
| **Tamanho escolhível** | Escolha um primo de 255 bits ou de 381 bits e o corpo terá mais elementos do que há átomos no universo observável; adivinhar é inútil |
| **Exato e determinístico** | Duas partes honestas calculando a mesma coisa sempre obtêm resultados idênticos, algo de que as provas dependem |

Um corpo finito é, em uma frase, **um playground para aritmética perfeitamente fechado, perfeitamente exato e perfeitamente enorme.** Todo o resto do Zcash é construído brincando dentro dele.

---

## 7. Onde isso vive no Zcash

Você não precisa acreditar na palavra de que "o Zcash usa corpos finitos". Aqui está o mapa concreto (a maquinaria mais profunda fica para artigos futuros; isto serve só para mostrar que as impressões digitais são reais).

- O **Sapling** (um design blindado mais antigo) constrói suas provas sobre uma curva chamada **BLS12-381**, cujo corpo base usa um primo de **381 bits**. Cada coordenada, chave e elemento de prova é um elemento de um corpo finito construído sobre esse primo.
- O **Orchard** (o design blindado atual) usa um par de curvas chamadas **Pallas e Vesta** (as curvas "Pasta"), cujos corpos usam primos de aproximadamente **255 bits**.
- O **compromisso de note**, o **nulificador** e os números dentro de uma **prova de conhecimento zero** do Artigo 0 são todos, no fundo, elementos de um desses corpos finitos. Quando o protocolo diz "calcule este compromisso", quer dizer "faça esta aritmética módulo aquele primo".

![alt text](/content-images/image-7-c81fe982f0.webp)

Então a resposta à pergunta em aberto do Artigo 0, *"de onde vêm as receitas secretas?"*, começa aqui: **tudo começa como aritmética em um corpo finito.** No próximo artigo, vamos pegar esse corpo e construir os objetos reais, pontos em uma curva elíptica, que se tornam chaves e compromissos.

---

## 8. Um aviso honesto

Para manter o texto acessível a iniciantes, simplificamos algumas coisas verdadeiras. Os corpos finitos não existem apenas na versão `F_p`; também é possível construir corpos com `p^n` elementos (chamados de **corpos de extensão**), e eles são importantes para os "emparelhamentos" dos quais depende o sistema de provas do Sapling. Também pulamos a lista completa de axiomas de corpo e passamos por cima de como primos desse tamanho são escolhidos e validados. Nada disso muda a intuição que você agora tem; apenas a refina. Vamos devolver a precisão, com avisos, quando um artigo futuro precisar dela.

---

## 9. Resumo

- A criptografia precisa de um sistema numérico que seja **finito, exato, cego ao tamanho, totalmente invertível e enorme.** Esse sistema é um **corpo finito**.
- A intuição é um **relógio**: aritmética que **dá a volta** (aritmética modular), o que convenientemente apaga o "tamanho" de um número.
- Fazer aritmética com os números `0..p-1` módulo um **primo** `p` dá um corpo de verdade `F_p`, no qual você também pode **dividir**, porque todo elemento não nulo tem um inverso.
- O módulo **precisa ser primo**: um módulo composto cria divisores de zero (como `2 x 3 = 0 mod 6`) e quebra a divisão.
- Os computadores encontram inversos rapidamente pelo **Pequeno Teorema de Fermat** (`a^(-1) = a^(p-2)`).
- No **Zcash**, toda chave, compromisso, nulificador e elemento de prova é, em última instância, um elemento de um grande corpo finito (corpos Pasta de 255 bits para o Orchard, um corpo de 381 bits para a BLS12-381 do Sapling).

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Modular arithmetic** | Aritmética que dá a volta ao atingir um valor fixo, como um relógio |
| **mod p** | "Divida por `p` e fique com o resto" |
| **Field** | Um sistema numérico em que somar, subtrair, multiplicar e dividir funcionam |
| **Finite field `F_p`** | Os números `0..p-1` com a aritmética feita módulo um primo `p` |
| **Inverse (reciprocal)** | O elemento `a^(-1)` com `a x a^(-1) = 1`; "dividir por `a`" significa multiplicar por ele |
| **Zero divisor** | Dois valores não nulos cujo produto é zero; o que arruína os módulos compostos |
| **Prime** | Um número inteiro maior que 1 sem fatores além de 1 e dele mesmo |

---

## Perguntas frequentes

**Por que não usar simplesmente inteiros comuns ou decimais?**
Os decimais arredondam e acumulam erros; os inteiros crescem sem limite e vazam o tamanho. Os corpos finitos são exatos, limitados e cegos ao tamanho, e é isso que a criptografia exige.

**"Dar a volta" faz perder informação?**
De propósito, sim. Apagar o tamanho dos valores intermediários é uma característica, não um defeito, para a privacidade.

**Um primo maior é sempre mais seguro?**
De modo geral, um corpo maior significa mais valores possíveis e adivinhação mais difícil, mas a segurança depende de toda a construção, não só do tamanho do corpo. Os próximos artigos tornam isso preciso.

**Por que esses primos específicos (255 bits, 381 bits) no Zcash?**
Eles são escolhidos para que as curvas construídas sobre eles tenham a estrutura e a eficiência certas para o sistema de provas. Essa "estrutura certa" é o tema dos próximos dois artigos.

---

### Teste sua intuição

Em `F_7`, quanto é `5 - 6`? (Lembre-se: fique dentro de `{0,...,6}` dando a volta.) *(Resposta abaixo.)*

<details><summary>Resposta</summary>

`5 - 6 = -1`, e `-1` dando a volta para dentro de `F_7` é `6` (porque `6 + 1 = 7 = 0`). Então `5 - 6 = 6 (mod 7)`. A subtração nunca sai do corpo; ela apenas dá a volta no outro sentido.
</details>

---

### O que vem a seguir

**Artigo 2 . Curvas elípticas:** vamos pegar o corpo finito que acabamos de construir e usá-lo para desenhar um tipo estranho de curva cujos pontos podem ser "somados". Esses pontos se tornam as chaves e os compromissos do Zcash, e escondem um alçapão de mão única que torna possível todo o sistema de privacidade. A intuição vem primeiro, como sempre.

*Parte da série* Zcash a partir dos primeiros princípios *para o [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
