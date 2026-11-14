# Curvas elípticas: onde nascem as chaves e os compromissos do Zcash
##### Pesquisa original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-10-c1097b22d7.webp)

### Uma rua de mão única construída com pontos de uma curva

> **Série:** *Zcash a partir dos primeiros princípios* . **Artigo 2 . Curvas elípticas**
> **Público:** iniciantes. Pressupomos apenas o [Artigo 1 (corpos finitos)](article-1-finite-fields.md): aritmética que dá a volta módulo um número primo. Nenhum outro conhecimento prévio é necessário.
> **O que você vai levar daqui:** uma imagem intuitiva e correta das curvas elípticas, do "alçapão" que as torna úteis e de exatamente como o Zcash as transforma em chaves e compromissos.

O [Artigo 1](article-1-finite-fields.md) nos deu um ambiente perfeito para a aritmética: o corpo finito. Mas um corpo, sozinho, é apenas um conjunto de números. Para construir chaves e os "envelopes lacrados" do [Artigo 0](article-0-shielded-transaction.md), o Zcash precisa de um objeto com um tipo especial de dificuldade, que vale em uma direção só: fácil de calcular para frente, praticamente impossível de reverter. Esse objeto é uma **curva elíptica**. Este artigo a constrói do zero, com a intuição antes da álgebra.

---

## 1. Por que você deveria se importar?

Todo sistema de privacidade precisa de uma **rua de mão única**: uma operação trivial de percorrer para frente e, na prática, impossível de percorrer de volta.

Veja o motivo. Sua **chave secreta** é um número que você mantém escondido. Sua **chave pública** (e o seu endereço) é derivada dela e mostrada ao mundo. Toda a segurança do sistema depende de um único fato: *dada a chave pública, ninguém consegue fazer o caminho inverso até a sua chave secreta.* Se conseguisse, poderia gastar o seu dinheiro.

Então precisamos de uma operação matemática em que:

- ir **para frente** (secreta -> pública) seja rápido e fácil, mas
- ir **para trás** (pública -> secreta) seja tão difícil que todos os computadores da Terra, trabalhando durante toda a vida do universo, não terminariam.

A multiplicação comum em um corpo finito não é suficiente; a divisão a desfaz instantaneamente (esse era justamente o ponto do Artigo 1). Precisamos de algo sem um botão de "desfazer" fácil. As curvas elípticas oferecem exatamente isso e, de bônus, seus pontos se combinam de um jeito perfeito para construir compromissos. Vamos ver como.

---

## 2. A intuição: uma curva cujos pontos você pode "somar"

Esqueça a criptografia por um momento. Uma **curva elíptica** é simplesmente o conjunto de pontos `(x, y)` que satisfazem uma equação da forma:

```
y^2 = x^3 + ax + b
```

Com números comuns, ela parece uma curva suave e sinuosa, muitas vezes com um laço arredondado e duas caudas:

![alt text](/content-images/image-14-1d2e8c25d2.webp)

A parte realmente surpreendente: **você pode "somar" dois pontos dessa curva e obter um terceiro ponto na mesma curva.** Isso não é a soma comum de coordenadas. É uma regra geométrica, e é mais fácil *ver* do que explicar.

### A regra da corda (somando dois pontos diferentes)

Para somar `P + Q`:

1. Trace uma reta passando por `P` e `Q`.
2. Essa reta cruza a curva em exatamente mais um lugar. Chame-o de `R*`.
3. **Reflita `R*` em relação ao eixo horizontal.** Essa reflexão é a resposta, `P + Q`.

![alt text](/content-images/image-11-61f3df1989.webp)

### A regra da tangente (somando um ponto a ele mesmo)

Para calcular `P + P` (escrito `2P`), não há um segundo ponto para traçar uma reta, então você usa a reta **tangente** em `P` e depois segue a mesma receita: "terceira interseção, depois reflita".

Essa é a operação inteira. Duas regras geométricas. Com elas, os pontos de uma curva elíptica formam o que os matemáticos chamam de **grupo**: um conjunto com uma "soma" bem-comportada. Ele tem até um "zero".

### O ponto no infinito (o zero da curva)

Todo sistema numérico precisa de um `0`, aquilo que não muda nada quando você soma. Em uma curva elíptica, esse papel é desempenhado por um ponto extra especial chamado **ponto no infinito**, escrito `O`. Você pode imaginá-lo como "infinitamente lá em cima", o lugar onde as retas verticais se encontram. Somar `O` a qualquer ponto o deixa inalterado, exatamente como somar `0`.

---

## 3. Das figuras para um corpo finito

A curva suave acima é a *intuição*. Mas o Zcash não usa números reais (eles arredondam e vazam tamanho, conforme o Artigo 1). Ele usa uma curva elíptica **sobre um corpo finito**: a mesma equação `y^2 = x^3 + ax + b`, mas com toda a aritmética feita módulo um número primo.

Quando você faz isso, a curva bonita se despedaça em uma **nuvem de pontos desconectados**, um ponto para cada par `(x, y)` que satisfaz a equação módulo `p`. Ela deixa de parecer uma curva. Mas aqui está o ponto crucial:

> **A álgebra da regra da corda e da tangente continua funcionando perfeitamente.** As mesmas fórmulas que encontravam `P + Q` geometricamente agora o calculam com aritmética de corpo finito. Os pontos continuam formando um grupo, com o mesmo `0` (o ponto no infinito).

Vamos tornar isso concreto com um exemplo minúsculo e totalmente verificado.

### Uma curva completa, calculada com exatidão

Considere `y^2 = x^3 + 2x + 2` sobre o corpo finito `F_17`. Calculando todos os pontos válidos, obtemos exatamente **18 pontos, mais o ponto no infinito = 19 no total.** Alguns deles:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Agora escolha o ponto `G = (5, 1)` e continue somando-o a ele mesmo. Veja o que acontece (cada linha abaixo foi calculada, não chutada):

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

Duas coisas para observar:

- Ele **visita todos os 18 pontos finitos e então cai em `O`** no passo 19; depois disso, se repetiria para sempre. O ponto inicial `G` "gera" o grupo inteiro, por isso o chamamos de **gerador**.
- É um grupo verificado: por exemplo, `1G + 2G = (5,1) + (6,3) = (10,6)`, que é exatamente `3G`.  A soma é internamente consistente, como um grupo exige.

---

## 4. O alçapão: multiplicação escalar

Aquela tabela de `1G, 2G, 3G, ...` é o coração de tudo. Somar repetidamente um ponto a ele mesmo se chama **multiplicação escalar**: o ponto `kG` significa "`G` somado a ele mesmo `k` vezes".

Agora vem a mágica. Considere as duas direções:

| Direção | Pergunta | Dificuldade |
|---|---|---|
| **Para frente** | Dados `k` e `G`, calcule `kG` | **Fácil.** Mesmo para um `k` astronomicamente grande, um truque chamado *dobrar e somar* chega lá em algumas centenas de passos |
| **Para trás** | Dados `G` e `kG`, recupere `k` | **Na prática, impossível** em uma curva criptográfica real |

Essa assimetria é a **rua de mão única** de que precisávamos na Seção 1. O problema inverso ("qual `k` produziu este ponto?") se chama **Problema do Logaritmo Discreto em Curvas Elípticas (ECDLP)** e, nas curvas que o Zcash usa, nenhum método conhecido o resolve antes da morte térmica do universo.

![alt text](/content-images/image-12-86b9ace6cb.webp)

> Na nossa curva de brinquedo `F_17`, você *poderia* simplesmente ler `k` na tabela, porque ela tem apenas 19 pontos. Curvas reais têm cerca de `2^(255)` pontos. A tabela teria mais linhas do que existem átomos no universo, então "ler na tabela" não é uma opção. O tamanho pequeno é o que torna a curva de brinquedo didática e também o motivo de ela não ser segura.

---

## 5. Como nascem as chaves (a recompensa)

Agora temos tudo o que é necessário para explicar uma chave criptográfica real, e é surpreendentemente simples:

> **Escolha um número secreto `k`. Publique o ponto `kG`. Só isso.**
> `k` é a sua **chave privada**. `kG` é a sua **chave pública**. A rua de mão única (ECDLP) garante que ninguém consegue levar `kG` de volta até `k`.

Essa única ideia, *uma chave pública é um escalar secreto vezes um gerador fixo*, é a semente das chaves de gastos, das chaves de visualização e dos endereços do Zcash. A árvore completa de chaves acrescenta mais estrutura por cima, mas todo galho cresce a partir dessa raiz.

### Bônus: por que pontos de curva dão compromissos perfeitos

Lembre-se do "envelope lacrado" (compromisso) do Artigo 0, que precisava **esconder** seu conteúdo e, ao mesmo tempo, ser **impossível de falsificar**. As curvas elípticas nos dão um jeito limpo de construir um. Pegue dois pontos geradores fixos e públicos, `G` e `H`, um valor secreto `v` e um número aleatório de ocultação `r`, e forme:

```
Commitment  =  v.G  +  r.H
```

Isso é um **compromisso de Pedersen**, e ele tem as duas propriedades que queríamos:

- **Ocultação:** o `r` aleatório espalha o resultado pela curva inteira, então o ponto não revela nada sobre `v`.
- **Vinculação:** o ECDLP torna inviável encontrar um `(v, r)` *diferente* que gere o mesmo ponto, então você não pode mudar de ideia sobre aquilo com que se comprometeu.

Uma propriedade bônus acaba sendo valiosíssima mais adiante: esses compromissos **se somam**. O compromisso com `v_1` mais o compromisso com `v_2` é um compromisso válido com `v_1 + v_2`. Esse comportamento "homomórfico" é como o Zcash vai provar, mais adiante, que o dinheiro que *entra* em uma transação é igual ao dinheiro que *sai*, sem revelar nenhum valor. Vamos colher esse fruto por volta do Artigo 6.

---

## 6. Onde isso vive no Zcash

As impressões digitais são concretas e verificáveis.

| Design do Zcash | Curvas que usa | Função |
|---|---|---|
| **Sapling** (mais antigo) | **BLS12-381** mais uma curva embutida chamada **Jubjub** | A BLS12-381 sustenta o sistema de provas; a Jubjub é construída sobre o corpo escalar da BLS12-381 para que as operações de chaves e compromissos sejam baratas de executar *dentro* de uma prova de conhecimento zero |
| **Orchard** (atual) | **Pallas** e **Vesta** (o ciclo "Pasta") | A Pallas carrega as chaves e os compromissos do Orchard; o par Pallas/Vesta é organizado de forma especial para tornar provas avançadas eficientes |

Os motivos pelos quais uma curva é "embutida" no corpo de outra, e por que um *ciclo* de duas curvas é útil, são reais e importantes, mas pertencem aos artigos sobre sistemas de provas. Por enquanto, a conclusão é sólida: **toda chave do Zcash é um escalar vezes um gerador, e todo compromisso do Zcash é uma soma de pontos de curva**, que vivem em uma dessas curvas nomeadas.

![alt text](/content-images/image-13-ffdd703c60.webp)

---

## 7. Um aviso honesto

Algumas simplificações mantiveram este texto legível. Usamos a forma **curta de Weierstrass** (`y^2 = x^3 + ax + b`); as curvas do Zcash costumam ser escritas em outras formas equivalentes (a Jubjub é uma curva de *Edwards torcida*), escolhidas por eficiência e segurança, mas a ideia de grupo é idêntica. Não definimos as fórmulas exatas de soma de pontos (elas são a versão algébrica de "terceira interseção, depois reflita") e deixamos de lado sutilezas como a ordem da curva, cofatores e "emparelhamentos", que se tornam importantes nos artigos sobre sistemas de provas. Nada disso muda a intuição; só a deixa mais precisa.

---

## 8. Resumo

- Um sistema de privacidade precisa de uma **rua de mão única**: fácil para frente, inviável para trás. As curvas elípticas oferecem uma.
- Uma **curva elíptica** é o conjunto de pontos que satisfazem `y^2 = x^3 + ax + b`, e seus pontos podem ser **somados** pela regra geométrica da **corda e da tangente**, com um **ponto no infinito** especial fazendo o papel de zero.
- Sobre um **corpo finito**, a curva se torna uma nuvem de pontos, mas a mesma soma continua funcionando e os pontos formam um **grupo**. (Exemplo verificado: `y^2 = x^3 + 2x + 2` sobre `F_17` tem 19 pontos, e `G = (5,1)` gera todos eles.)
- A **multiplicação escalar** `kG` é fácil de calcular, mas inviável de reverter: o **ECDLP**. Esse é o alçapão.
- **Chaves:** chave privada `k`, chave pública `kG`. **Compromissos:** forma de Pedersen `v.G + r.H`, que esconde, vincula e, convenientemente, **se soma**.
- No **Zcash**, o Sapling usa **BLS12-381 + Jubjub** e o Orchard usa as curvas **Pallas/Vesta (Pasta)**; toda chave e todo compromisso vivem nelas.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Elliptic curve** | Pontos que satisfazem `y^2 = x^3 + ax + b`, com uma "soma" especial de pontos |
| **Point addition** | A regra da corda e da tangente: reta por dois pontos, pegue a terceira interseção, reflita |
| **Point at infinity (`O`)** | O "zero" da curva; somá-lo não muda nada |
| **Generator (`G`)** | Um ponto base cujos múltiplos acabam cobrindo o grupo inteiro |
| **Scalar multiplication (`kG`)** | Somar `G` a ele mesmo `k` vezes; fácil para frente, difícil de reverter |
| **ECDLP** | O problema difícil de recuperar `k` a partir de `kG`; a base da segurança |
| **Pedersen commitment** | `v.G + r.H`; um envelope lacrado que esconde, vincula e se soma |

---

## Perguntas frequentes

**Por que curvas em vez de simplesmente números grandes módulo um primo?**
Ambos podem fornecer uma rua de mão única, mas as curvas elípticas alcançam a mesma segurança com chaves muito menores e operações mais rápidas, e a aritmética de seus pontos é ideal para compromissos.

**Está provado que o ECDLP é difícil?**
Não está *provado* que é impossível, mas décadas de esforço intenso não encontraram nenhum ataque eficiente contra curvas bem escolhidas. A segurança se apoia nessa suposição amplamente testada.

**Um computador quântico poderia quebrar isso?**
Um computador quântico grande o suficiente poderia quebrar o ECDLP. Essa é uma preocupação de longo prazo conhecida em todo o setor e uma área de pesquisa ativa; as curvas atuais continuam seguras contra computadores clássicos.

**Por que o Zcash usa mais de uma curva?**
Tarefas diferentes. Uma curva sustenta o sistema de provas de conhecimento zero; outra (embutida no corpo da primeira) torna eficientes as operações de chaves e compromissos dentro da prova. Os próximos artigos explicam por que esse par é importante.

---

### Teste sua intuição

Usando a tabela verificada da Seção 3, quanto é `9G + 10G` na nossa curva de brinquedo? E o que a resposta diz sobre `G`? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

`9 + 10 = 19`, e vimos que `19G = O`, o ponto no infinito. Portanto, `9G + 10G = O`. Isso significa que `10G` é o **negativo** (inverso aditivo) de `9G`: dois pontos cuja soma é o ponto "zero". Em uma curva, o negativo de um ponto é simplesmente sua imagem espelhada em relação ao eixo x e, de fato, `9G = (7,6)` e `10G = (7,11)` compartilham o mesmo `x` e têm valores de `y` cuja soma é `17 = 0 (mod 17)`. A estrutura é perfeitamente consistente, que é exatamente o que "é um grupo" garante.
</details>

---

### O que vem a seguir

**Artigo 3 . Hashing e compromissos:** vamos abrir de verdade o "envelope lacrado mágico". Você já viu uma forma de construir um compromisso a partir de pontos de curva; a seguir, vamos perguntar o que ocultação e vinculação realmente significam, conhecer as funções de hash e conectar ambos aos compromissos de note que ancoram todo pagamento no Zcash.

*Parte da série* Zcash a partir dos primeiros princípios *para [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
