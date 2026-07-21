# Curvas Elípticas: Onde Nascem as Chaves e os Compromissos da Zcash
##### Pesquisa original de [Annkkitaaa](https://github.com/Annkkitaaa)

![texto alternativo](image-10.png)

### Uma rua de mão única construída a partir de pontos em uma curva

> **Série:** *Zcash from First Principles* . **Artigo 2 . Curvas Elípticas**
> **Público:** iniciantes. Assumimos apenas o [Artigo 1 (campos finitos)](article-1-finite-fields.md): aritmética que dá a volta em mod um primo. Nenhum outro conhecimento prévio é necessário.
> **O que você vai levar daqui:** uma imagem intuitiva e correta das curvas elípticas, a "porta de alçapão" que as torna úteis, e exatamente como a Zcash as transforma em chaves e compromissos.

O [Artigo 1](article-1-finite-fields.md) nos deu um playground perfeito para a aritmética: o campo finito. Mas um campo, por si só, é apenas números. Para construir chaves e os "envelopes lacrados" do [Artigo 0](article-0-shielded-transaction.md), a Zcash precisa de um objeto com um tipo especial de dificuldade unidirecional: fácil de calcular para frente, praticamente impossível de reverter. Esse objeto é uma **curva elíptica**. Este artigo a constrói do zero, intuição antes da álgebra.

---

## 1. Por que isso importa para você?

Todo sistema de privacidade precisa de uma **rua de mão única**: uma operação que seja trivial de percorrer para frente e efetivamente impossível de percorrer de volta.

Eis o porquê. Sua **chave secreta** é um número que você mantém oculto. Sua **chave pública** (e seu endereço) é derivada dela e mostrada ao mundo. Toda a segurança do sistema repousa em um fato: *dada a chave pública, ninguém consegue voltar até sua chave secreta.* Se conseguisse, poderia gastar seu dinheiro.

Então precisamos de uma operação matemática em que:

- ir **para frente** (segredo -> público) seja rápido e fácil, mas
- ir **para trás** (público -> segredo) seja tão difícil que todos os computadores da Terra trabalhando durante toda a vida do universo não terminariam.

A multiplicação simples em campo finito não é suficiente; a divisão a desfaz instantaneamente (esse era justamente o ponto do Artigo 1). Precisamos de algo sem um botão fácil de "desfazer". As curvas elípticas fornecem exatamente isso e, de bônus, seus pontos se combinam de um jeito perfeito para construir compromissos. Vamos ver como.

---

## 2. A intuição: uma curva cujos pontos você pode "somar"

Esqueça a criptografia por um momento. Uma **curva elíptica** é apenas o conjunto de pontos `(x, y)` que satisfazem uma equação da forma:

```
y^2 = x^3 + ax + b
```

Sobre os números comuns, ela se parece com uma curva suave e ondulada, muitas vezes com um laço arredondado e duas caudas:

![texto alternativo](image-14.png)

A parte realmente surpreendente: **você pode "somar" dois pontos nessa curva para obter um terceiro ponto na mesma curva.** Isso não é a soma comum das coordenadas. É uma regra geométrica, e é mais fácil de *ver* do que de descrever.

### A regra da corda (somando dois pontos diferentes)

Para somar `P + Q`:

1. Desenhe uma linha reta passando por `P` e `Q`.
2. Essa linha atinge a curva em exatamente mais um ponto. Chame-o de `R*`.
3. **Reflita `R*` em relação ao eixo horizontal.** Esse reflexo é a resposta, `P + Q`.

![texto alternativo](image-11.png)

### A regra da tangente (somando um ponto consigo mesmo)

Para calcular `P + P` (escrito `2P`), não há um segundo ponto para traçar uma linha, então você usa a linha **tangente** em `P`, e depois segue a mesma receita de "terceira interseção, depois refletir".

Essa é a operação inteira. Duas regras geométricas. Com elas, os pontos de uma curva elíptica formam o que os matemáticos chamam de **grupo**: um conjunto com uma "adição" bem-comportada. Ele até tem um "zero".

### O ponto no infinito (o zero da curva)

Todo sistema numérico precisa de um `0`, a coisa que não muda nada quando você soma a ela. Em uma curva elíptica, esse papel é desempenhado por um ponto extra especial chamado **ponto no infinito**, escrito `O`. Você pode imaginá-lo como "infinitamente para cima", o lugar onde as linhas verticais se encontram. Somar `O` a qualquer ponto o deixa inalterado, exatamente como somar `0`.

---

## 3. Das figuras para um campo finito

A curva suave acima é a *intuição*. Mas a Zcash não usa números reais (eles arredondam e vazam tamanho, como vimos no Artigo 1). Ela usa uma curva elíptica **sobre um campo finito**: a mesma equação `y^2 = x^3 + ax + b`, mas com toda a aritmética feita mod um primo.

Quando você faz isso, a curva bonita se estilhaça em uma **dispersão de pontos desconectados**, um ponto para cada par `(x, y)` que satisfaz a equação mod `p`. Ela deixa até de parecer uma curva. Mas aqui está o ponto crucial:

> **A álgebra da regra da corda e tangente ainda funciona perfeitamente.** As mesmas fórmulas que encontravam `P + Q` geometricamente agora o calculam com aritmética de campo finito. Os pontos continuam formando um grupo, com o mesmo `0` (o ponto no infinito).

Vamos tornar isso concreto com um exemplo pequeno e totalmente verificado.

### Uma curva completa, calculada exatamente

Tome `y^2 = x^3 + 2x + 2` sobre o campo finito `F_17`. Calcular todos os pontos válidos dá exatamente **18 pontos, mais o ponto no infinito = 19 no total.** Alguns deles:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Agora escolha o ponto `G = (5, 1)` e continue somando-o a si mesmo. Veja o que acontece (cada linha abaixo foi calculada, não adivinhada):

| Passo | Ponto | Passo | Ponto |
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` | **O (infinito)** |
| `10G` | (7, 11) | | |

Duas coisas a notar:

- Ele **visita todos os 18 pontos finitos e então chega a `O`** no passo 19, depois se repetiria para sempre. O ponto inicial `G` "gera" o grupo inteiro, então o chamamos de **gerador**.
- É um grupo verificado: por exemplo, `1G + 2G = (5,1) + (6,3) = (10,6)`, que é exatamente `3G`. A soma é internamente consistente, exatamente como um grupo exige.

---

## 4. A porta de alçapão: multiplicação escalar

Essa tabela de `1G, 2G, 3G, ...` é o coração de tudo. Somar repetidamente um ponto a si mesmo é chamado de **multiplicação escalar**: o ponto `kG` significa "`G` somado a si mesmo `k` vezes".

Agora vem a mágica. Considere as duas direções:

| Direção | Pergunta | Dificuldade |
|---|---|---|
| **Para frente** | Dado `k` e `G`, calcular `kG` | **Fácil.** Mesmo para `k` astronomicamente grandes, um truque chamado *double-and-add* chega lá em algumas centenas de passos |
| **Para trás** | Dado `G` e `kG`, recuperar `k` | **Efetivamente impossível** em uma curva criptográfica real |

Essa assimetria é a **rua de mão única** de que precisávamos na Seção 1. O problema inverso ("qual `k` produziu este ponto?") é chamado de **Elliptic Curve Discrete Logarithm Problem (ECDLP)** e, nas curvas que a Zcash usa, nenhum método conhecido o resolve antes da morte térmica do universo.

![texto alternativo](image-12.png)

> Em nossa curva de brinquedo `F_17` você *poderia* simplesmente ler `k` na tabela, porque ela só tem 19 pontos. Curvas reais têm algo em torno de `2^(255)` pontos. A tabela teria mais linhas do que há átomos no universo, então "ler na tabela" não é uma opção. O tamanho pequeno é o que torna a curva de brinquedo didática e também o motivo de ela não ser segura.

---

## 5. Como as chaves nascem (a recompensa)

Agora temos tudo o que é necessário para explicar uma chave criptográfica real, e isso é surpreendentemente simples:

> **Escolha um número secreto `k`. Publique o ponto `kG`. Só isso.**
> `k` é sua **chave privada**. `kG` é sua **chave pública**. A rua de mão única (ECDLP) garante que ninguém pode voltar de `kG` para `k`.

Essa ideia única, *uma chave pública é um escalar secreto vezes um gerador fixo*, é a semente das spending keys, viewing keys e endereços da Zcash. A árvore completa de chaves adiciona mais estrutura por cima, mas cada ramo cresce a partir desta raiz.

### Bônus: por que pontos de curva formam compromissos perfeitos

Lembre-se do "envelope lacrado" (compromisso) do Artigo 0, que precisava **ocultar** seu conteúdo e ainda assim ser **impossível de falsificar**. As curvas elípticas nos dão uma forma limpa de construir isso. Pegue dois pontos geradores fixos e públicos `G` e `H`, um valor secreto `v` e um número aleatório de cegamento `r`, e forme:

```
Commitment  =  v.G  +  r.H
```

Isso é um **compromisso de Pedersen**, e ele tem as duas propriedades que queríamos:

- **Ocultação:** o `r` aleatório espalha o resultado por toda a curva, então o ponto não revela nada sobre `v`.
- **Vinculação:** o ECDLP torna inviável encontrar um `(v, r)` *diferente* que produza o mesmo ponto, então você não pode mudar de ideia sobre aquilo com que se comprometeu.

Uma propriedade extra acaba sendo valiosíssima depois: esses compromissos **se somam**. O compromisso com `v_1` mais o compromisso com `v_2` é um compromisso válido com `v_1 + v_2`. Esse comportamento "homomórfico" é como a Zcash provará mais tarde que o dinheiro entrando *em* uma transação é igual ao dinheiro saindo *dela*, sem revelar nenhum valor. Vamos aproveitar isso por volta do Artigo 6.

---

## 6. Onde isso vive na Zcash

As marcas disso são concretas e verificáveis.

| Design da Zcash | Curvas que usa | Papel |
|---|---|---|
| **Sapling** (mais antiga) | **BLS12-381** mais uma curva embutida chamada **Jubjub** | BLS12-381 carrega o sistema de provas; Jubjub é construída sobre o campo escalar de BLS12-381 para que as operações de chave e compromisso sejam baratas de executar *dentro* de uma prova de conhecimento zero |
| **Orchard** (atual) | **Pallas** e **Vesta** (o ciclo "Pasta") | Pallas carrega as chaves e compromissos de Orchard; o pareamento Pallas/Vesta é organizado especialmente para tornar provas avançadas eficientes |

As razões pelas quais uma curva é "embutida" dentro do campo de outra, e por que um *ciclo* de duas curvas é útil, são reais e importantes, mas pertencem aos artigos sobre o sistema de provas. Por enquanto, a conclusão é sólida: **toda chave da Zcash é um escalar vezes um gerador, e todo compromisso da Zcash é uma soma de pontos de curva**, vivendo em uma dessas curvas nomeadas.

![texto alternativo](image-13.png)

---

## 7. Um aviso honesto

Algumas simplificações mantiveram isto legível. Usamos a forma **short Weierstrass** (`y^2 = x^3 + ax + b`); as curvas da Zcash muitas vezes são escritas em outras formas equivalentes (Jubjub é uma curva *twisted Edwards*) escolhidas por eficiência e segurança, mas a ideia de grupo é idêntica. Não definimos as fórmulas exatas de soma de pontos (elas são a versão algébrica de "terceira interseção, depois refletir"), e deixamos de lado sutilezas como ordem da curva, cofatores e "pairings", que se tornam importantes nos artigos sobre o sistema de provas. Nada disso muda a intuição; apenas a refina.

---

## 8. Resumo

- Um sistema de privacidade precisa de uma **rua de mão única**: fácil para frente, inviável para trás. As curvas elípticas fornecem isso.
- Uma **curva elíptica** é o conjunto de pontos que satisfazem `y^2 = x^3 + ax + b`, e seus pontos podem ser **somados** pela regra geométrica da **corda e tangente**, com um **ponto no infinito** especial agindo como zero.
- Sobre um **campo finito**, a curva se torna uma dispersão de pontos, mas a mesma soma ainda funciona e os pontos formam um **grupo**. (Exemplo verificado: `y^2 = x^3 + 2x + 2` sobre `F_17` tem 19 pontos, e `G = (5,1)` gera todos eles.)
- A **multiplicação escalar** `kG` é fácil de calcular, mas inviável de reverter: o **ECDLP**. Essa é a porta de alçapão.
- **Chaves:** chave privada `k`, chave pública `kG`. **Compromissos:** forma de Pedersen `v.G + r.H`, que oculta, vincula e convenientemente **se soma**.
- Na **Zcash**, Sapling usa **BLS12-381 + Jubjub** e Orchard usa as curvas **Pallas/Vesta (Pasta)**; toda chave e compromisso vive nelas.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Curva elíptica** | Pontos que satisfazem `y^2 = x^3 + ax + b`, com uma "soma" especial de pontos |
| **Soma de pontos** | A regra da corda e tangente: linha através de dois pontos, pega a terceira interseção, reflete |
| **Ponto no infinito (`O`)** | O "zero" da curva; somá-lo não muda nada |
| **Gerador (`G`)** | Um ponto base cujos múltiplos acabam cobrindo o grupo inteiro |
| **Multiplicação escalar (`kG`)** | Somar `G` a si mesmo `k` vezes; fácil para frente, difícil de reverter |
| **ECDLP** | O problema difícil de recuperar `k` a partir de `kG`; a base da segurança |
| **Compromisso de Pedersen** | `v.G + r.H`; um envelope lacrado que oculta, vincula e se soma |

---

## FAQ

**Por que curvas em vez de apenas números grandes mod um primo?**
Ambos podem fornecer uma rua de mão única, mas as curvas elípticas alcançam a mesma segurança com chaves muito menores e operações mais rápidas, e sua aritmética de pontos é ideal para compromissos.

**Está provado que o ECDLP é difícil?**
Não está *provado* que seja impossível, mas décadas de esforço intenso não encontraram nenhum ataque eficiente contra curvas bem escolhidas. A segurança repousa nessa suposição amplamente testada.

**Um computador quântico poderia quebrar isso?**
Um computador quântico suficientemente grande poderia quebrar o ECDLP. Essa é uma preocupação conhecida de longo prazo em toda a indústria e uma área ativa de pesquisa; as curvas atuais permanecem seguras contra computadores clássicos.

**Por que a Zcash usa mais de uma curva?**
Trabalhos diferentes. Uma curva carrega o sistema de provas de conhecimento zero; outra (embutida no campo da primeira) torna eficientes as operações de chave e compromisso dentro da prova. Os próximos artigos explicam por que esse pareamento importa.

---

### Teste sua intuição

Usando a tabela verificada da Seção 3, quanto vale `9G + 10G` em nossa curva de brinquedo? E o que a resposta diz sobre `G`? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

`9 + 10 = 19`, e vimos que `19G = O`, o ponto no infinito. Então `9G + 10G = O`. Isso significa que `10G` é o **negativo** (inverso aditivo) de `9G`: dois pontos que somam o ponto "zero". Em uma curva, o negativo de um ponto é apenas sua imagem espelhada em relação ao eixo x, e de fato `9G = (7,6)` e `10G = (7,11)` compartilham o mesmo `x` e têm valores de `y` cuja soma é `17 = 0 (mod 17)`. A estrutura é perfeitamente consistente, e é exatamente isso que "é um grupo" garante.
</details>

---

### O que vem a seguir

**Artigo 3 . Hashing e compromissos:** vamos abrir de vez o "envelope lacrado mágico". Você já viu uma maneira de construir um compromisso a partir de pontos de curva; em seguida vamos perguntar o que ocultação e vinculação realmente significam, conhecer funções hash e conectar ambos aos compromissos de notas que ancoram cada pagamento da Zcash.

*Parte da série* Zcash from First Principles *para [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
