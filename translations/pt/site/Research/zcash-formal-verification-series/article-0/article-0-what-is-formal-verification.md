![Texto alternativo](image-1.png)
# O que é verificação formal?

### Como provar que um programa está correto, em vez de apenas esperar que esteja

> **Série:** *Série de verificação formal* · **Parte 1 de 3**
> **Público:** iniciantes completos. Não é necessário ter conhecimentos de matemática, programação ou criptografia.
> **O que você vai aprender:** uma compreensão clara do que significa *provar* que o software está correto, por que isso é fundamentalmente diferente de testá-lo, o que é uma prova verificada por máquina e os limites precisos (e honestos) do que essa prova pode garantir.

A maior parte do software é considerada confiável porque foi *testada*: nós o executamos com muitas entradas e observamos seu comportamento. A verificação formal faz uma pergunta mais ousada. Podemos *provar*, com certeza matemática, que um sistema faz o que deve para **todas** as entradas possíveis, incluindo aquelas que ninguém jamais pensou em testar? Este artigo desenvolve essa ideia desde o início. Primeiro a intuição, sem símbolos até que sejam necessários.

---

## 1. Por que você deveria se importar?

Aqui está uma história verdadeira, e é por isso que esta série existe.

Em 2022, a criptomoeda focada em privacidade Zcash lançou um novo pool blindado chamado Orchard, permitindo que as pessoas realizassem transações com os valores ocultos. Durante quatro anos, ele funcionou sem falhas e passou por repetidas auditorias profissionais. Então, em maio de 2026, um pesquisador de segurança que analisava cuidadosamente a matemática subjacente (com a ajuda de ferramentas de IA) encontrou um único ponto **sub-restrito** na matemática do sistema. Essa única lacuna poderia ter permitido que um invasor criasse uma quantidade *ilimitada* de dinheiro falsificado e, como os valores estavam ocultos, ninguém teria visto isso acontecer. A falha esteve presente o tempo todo.

Ela não foi detectada por testes. Todos os testes passaram durante quatro anos. Foi detectada por alguém que *raciocinou sobre a matemática*. E, quando a equipe a corrigiu, não apenas aplicou uma correção e seguiu em frente. Ela escreveu uma **prova matemática verificada por máquina**, com mais de 2.700 teoremas individuais, de que a substituição não poderia conter essa classe de falha de forma alguma.

Isso é verificação formal, e é isso que ela oferece: não "tentamos muitos casos e eles funcionaram", mas "provamos que isso vale para todos os casos". Para sistemas em que um único caso ignorado é catastrófico (dinheiro, aeronaves, dispositivos médicos, criptografia), essa diferença é tudo.

O ponto cego dos testes foi identificado há décadas pelo cientista da computação Edsger Dijkstra, e continua verdadeiro:

> **Os testes podem mostrar a *presença* de erros, mas nunca sua *ausência*.**

Se um teste passa, você aprendeu que o sistema funciona *com essa entrada*. Você não aprendeu nada sobre as entradas que não testou, e os erros perigosos quase sempre estão nos casos que ninguém testou.

---

## 2. A intuição: verificar portas vs. provar o edifício

Imagine que você é responsável por um edifício com mil portas e que seu trabalho é garantir que todas as portas estejam trancadas à noite.

- **A abordagem de teste:** caminhe pelo edifício e teste uma amostra de portas. Teste cinquenta, cem, quinhentas. Todas as que você testa estão trancadas, então sua confiança aumenta. Mas você não testou todas, e a única porta destrancada pode ser uma que você pulou.
- **A abordagem de verificação formal:** examine o *próprio sistema de travamento* e prove, a partir de seu projeto, que pressionar o botão "trancar" necessariamente trava todas as portas. Agora, você não precisa testar portas individuais. Você mostrou que *nenhuma porta possível pode ficar destrancada*, porque o mecanismo torna isso impossível.

A diferença está entre **amostrar a realidade** e **provar uma propriedade do projeto**. Os testes fazem amostragens. A verificação formal prova. Essa é toda a ideia, e todo o resto é mecanismo para fazer isso rigorosamente.

![Texto alternativo](image-2.png)

---

## 3. Os três pilares de qualquer verificação formal

Toda verificação formal, por mais avançada que seja, é construída com exatamente três ingredientes. Tenha-os claramente em mente, e o resto serão detalhes.

| Pilar | Significado simples | Analogia do edifício |
|---|---|---|
| **Especificação** | Uma afirmação precisa do que *significa* estar "correto" | "Todas as portas devem estar trancadas à noite" |
| **Sistema** | O que está sendo efetivamente verificado (um programa, um circuito, um protocolo) | O edifício e seu mecanismo de travamento |
| **Prova** | Um argumento rigoroso de que o sistema sempre atende à especificação | A demonstração lógica de que pressionar "trancar" trava todas as portas |

E um quarto ingrediente, mais discreto, torna tudo confiável:

- **Um verificador automático.** A prova não é escrita por uma pessoa e simplesmente analisada superficialmente. Ela é fornecida a um programa (um **assistente de provas**, também chamado de **demonstrador de teoremas**) que verifica *cada passo lógico individual*. Uma pessoa pode gesticular ou cometer um erro sutil; a máquina não aceitará um passo que não decorra estritamente do anterior. É por isso que dizemos que o resultado é **verificado por máquina**.

![Texto alternativo](image-3.png)

Entre os assistentes de provas que você pode ouvir mencionar estão **Lean**, **Rocq** (anteriormente Coq) e **Isabelle**. Na prática, eles são mecanismos de verificação lógica extraordinariamente rigorosos. A prova do Zcash na história inicial foi escrita em **Lean**. Vale destacar que modelos modernos de IA são cada vez mais usados para ajudar a *escrever* essas provas, com humanos orientando-os, o que reduziu esforços que antes levavam anos para semanas. A máquina continua verificando cada passo, portanto a aceleração não reduz a certeza.

---

## 4. O que uma prova realmente é

A palavra "prova" pode parecer intimidadora, então vamos desmistificá-la com um exemplo concreto e verificável. Sem criptografia, apenas aritmética escolar.

**Afirmação:** para cada número inteiro não negativo `n`, a soma `0 + 1 + 2 + ... + n` é igual a `n(n+1)/2`.

Você poderia *testar* isso. `n = 5` resulta em `0+1+2+3+4+5 = 15`, e `5 × 6 / 2 = 15`. ✓ Corresponde. Teste `n = 10`: a soma é `55`, e a fórmula resulta em `10 × 11 / 2 = 55`. ✓ (Esses valores são calculados e confirmados; a afirmação de fato vale para todos os `n` de 0 a 999 quando verificada diretamente.)

Mas testar valores, mesmo mil deles, nunca chega a "para **todos** os números inteiros não negativos". Existem infinitamente muitos. Uma **prova** fecha essa lacuna infinita em um argumento finito, usando uma técnica chamada **indução**:

1. **Caso Base:** para `n = 0`, a soma é apenas `0`, e a fórmula resulta em `0 × 1 / 2 = 0`. Eles são iguais. ✓
2. **Passo indutivo:** *suponha* que a fórmula vale para algum número `k`. Agora adicione o próximo número, `k+1`. A soma até `k+1` é `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Uma linha de álgebra reorganiza isso para `(k+1)(k+2)/2`, que é exatamente a fórmula com `k+1` no lugar de `k`. ✓

Como ela vale no início (0) e cada passo a leva ao próximo número, ela vale para **todos** os números inteiros não negativos, para sempre, em um único argumento finito. Isso é uma prova. Um assistente de provas faz exatamente esse raciocínio, mas verifica mecanicamente que cada passo, incluindo a "linha de álgebra", realmente decorre do que veio antes.

> O salto que vale a pena absorver: uma prova transforma "infinitos casos" em um **argumento finito e verificável**. Esse é o superpoder que os testes não têm estruturalmente.

---

## 5. Onde os erros realmente vivem

A verificação formal é poderosa, em parte, por causa de uma ideia esclarecedora sobre *onde* os erros surgem. Qualquer falha em um sistema de verificação de regras pode ser atribuída a um de três lugares:

| Origem de um erro | O que significa | Podemos eliminá-lo por prova? |
|---|---|---|
| **A especificação** | A própria matemática ou as regras estão erradas (uma condição ausente, uma definição ruim) | **Sim**, diretamente; este é o terreno da verificação formal |
| **A implementação** | O código não executa fielmente uma especificação correta | Parcialmente; muitas vezes, essas falhas deixam evidências detectáveis |
| **Uma suposição que falhou** | Algo do qual todo o sistema depende acaba sendo falso | Não; as suposições são a base irredutível |

Essa taxonomia importa mais do que parece, e as Partes 2 e 3 dependem dela. Os erros mais profundos e perigosos, aqueles que podem permanecer ocultos para sempre, tendem a estar na **especificação**: a descrição matemática do que o sistema deve fazer. E a especificação é exatamente o que uma prova verificada por máquina pode examinar diretamente, todos os casos de uma só vez. É por isso que os esforços sérios de verificação formal começam por aí.

![Texto alternativo](image-4.png)

---

## 6. A ressalva mais importante de toda a área

A verificação formal é poderosa, mas sua promessa é precisa, e entendê-la mal leva as pessoas ao erro. Portanto, vamos formulá-la cuidadosamente:

> **Uma prova garante que o *sistema* atende à *especificação*, sob as *suposições* declaradas. Nada mais.**

Quatro consequências decorrem disso, e cada uma importa:

- **Se a especificação estiver errada, a prova não vale nada.** Se você provar que "todas as portas trancam", mas o requisito real era "todas as *janelas* trancam", você provou a coisa errada, perfeitamente. A verificação confirma que você construiu *o que especificou*, não que especificou a coisa certa.
- **Se uma definição for formulada de forma sutilmente errada, a garantia se restringe silenciosamente.** Uma prova sobre uma definição ligeiramente errada de "saldo" pode estabelecer menos do que você pensa, mantendo-se válida em todas as verificações. É por isso que as definições no centro de uma verificação devem ser curtas, padronizadas e abertamente revisáveis por humanos.
- **Se as suposições falharem, a garantia deixa de se aplicar.** As provas se baseiam em suposições ("o hardware da fechadura não está fisicamente quebrado"). Se uma suposição for falsa na realidade, a conclusão pode não valer.
- **Isso não significa "nunca haverá erros".** Significa "não há erros do tipo excluído por esta especificação, dadas estas suposições". É uma afirmação mais limitada, mais honesta e muito mais útil.

Longe de enfraquecer a verificação formal, essa precisão é sua força. Ela diz *exatamente* o que você está recebendo. Como veremos na Parte 3, a equipe do Zcash, ao declarar claramente seu escopo e suas suposições ("provamos a solidez do fornecimento, sob estas suposições nomeadas, e não a privacidade"), é um modelo dessa honestidade.

![Texto alternativo](image-5.png)

---

## 7. Uma ressalva honesta

Para manter isto legível, simplificamos. As especificações reais são escritas em linguagens formais precisas, não em frases em inglês; existem vários *estilos* de verificação formal (demonstração interativa de teoremas, verificação de modelos, métodos baseados em SMT) adequados a diferentes problemas; e escrever essas provas continua sendo um trabalho especializado e exigente, mesmo com assistência de IA. Também omitimos como um assistente de provas representa internamente a lógica. Nada disso altera o essencial: uma especificação, um sistema e uma prova verificada por máquina de que os dois estão de acordo, sob suposições declaradas. Os detalhes voltarão quando precisarmos deles.

---

## 8. Resumo

- **Os testes** fazem amostragens de entradas específicas e podem mostrar que um erro está presente, mas nunca que os erros estão ausentes. Os erros perigosos se escondem nos casos que ninguém testa.
- **A verificação formal** prova que uma propriedade vale para **todos** os casos possíveis, em um argumento finito e verificável.
- Toda verificação tem três pilares: uma **especificação** (o que significa estar correto), um **sistema** (o que é verificado) e uma **prova** de que eles estão de acordo, além de um **assistente de provas** (como o **Lean**) que verifica cada passo por máquina.
- Uma **prova** (por exemplo, por **indução**) reduz infinitos casos a um único argumento finito.
- Os erros residem na **especificação**, na **implementação** ou em uma **suposição falhada**. A verificação formal visa diretamente a especificação, onde os erros mais profundos e ocultos tendem a estar.
- A garantia é precisa: o sistema atende **à especificação**, sob **suposições declaradas**. Uma especificação errada, uma definição mal formulada ou uma suposição falhada a anulam, e ela nunca significa "nunca haverá erros".

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Formal verification** | Provar, matematicamente, que um sistema atende a uma especificação em todos os casos |
| **Specification** | Uma afirmação precisa do que significa "comportamento correto" |
| **System** | O programa, circuito ou protocolo efetivamente verificado |
| **Proof** | Uma cadeia finita de passos lógicos que estabelece uma afirmação para todos os casos |
| **Proof assistant / theorem prover** | Software (Lean, Rocq, Isabelle) que verifica cada passo de uma prova |
| **Machine-checked** | Verificado passo a passo por um computador, não apenas por leitura humana |
| **Induction** | Uma técnica de prova: é verdadeira no início, e cada passo a leva ao próximo |
| **Assumption** | Uma condição da qual a prova depende; se for falsa, a garantia pode não valer |

---

## Perguntas frequentes

**A verificação formal substitui os testes?**
Não. Eles se complementam. Os testes detectam de forma econômica problemas práticos e suposições erradas; a verificação exclui classes inteiras de erros que os testes talvez nunca testem.

**Se ela é tão poderosa, por que nem tudo é formalmente verificado?**
Ela é cara e exige habilidades especializadas, embora a assistência de IA esteja reduzindo esse custo. É reservada para sistemas em que um erro raro seria catastrófico, que é exatamente onde seu custo compensa.

**Um sistema formalmente verificado ainda pode falhar?**
Sim, se a especificação estava errada, uma definição foi mal formulada, uma suposição não valeu ou a falha está fora do que foi especificado. A prova cobre apenas o que afirma cobrir.

**Uma prova verificada por máquina é mais confiável do que uma prova humana?**
Para provas grandes e complexas, geralmente sim. Uma máquina não ignorará uma lacuna sutil nem aceitará uma afirmação sem demonstração, embora continue confiando na especificação e nas definições que recebeu.

**Se a IA ajuda a escrever a prova, por que confiar nela?**
Porque o assistente de provas verifica cada passo mecanicamente. A IA propõe passos; a máquina os verifica. Um passo errado é simplesmente rejeitado, então a IA acelera o trabalho sem enfraquecer a garantia.

---

### Teste sua intuição

Você prova que o software de um banco "nunca permite que o saldo de uma conta fique negativo". Um ano depois, o dinheiro continua desaparecendo. Como ambas as coisas podem ser verdadeiras ao mesmo tempo? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

A prova garantiu exatamente uma propriedade: os saldos nunca ficam negativos. O dinheiro pode desaparecer de formas que essa propriedade nunca abordou, por exemplo, devido a um erro que transfere fundos para a conta errada (ainda assim não negativa), ou a uma falha em uma parte do sistema que nunca foi especificada. A verificação fez precisamente o que prometeu e nada mais. Esta é a ressalva da Seção 6 em ação: uma prova cobre a especificação, não todas as noções concebíveis de "correto".
</details>

---

### O que vem a seguir

**Parte 2 · O erro do Orchard:** vamos abordar a história real de 2026 em detalhes. Um sistema de privacidade ocultava valores usando provas criptográficas, e uma linha sub-restrita em sua matemática significava que essas provas podiam ser levadas a mentir, permitindo falsificação invisível ilimitada. Veremos exatamente o que significa "um circuito sub-restrito", por que essa classe de erro pode permanecer oculta para sempre e por que isso já aconteceu mais de uma vez.

*Parte da* série de verificação formal *para [ZecHub](https://zechub.org).*
