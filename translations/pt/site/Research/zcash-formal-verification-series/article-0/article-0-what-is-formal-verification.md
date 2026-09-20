![alt text](image-1.png)
# O que é a verificação formal?

### Como provar que um programa está correto, em vez de apenas esperar que esteja

> **Série:** *Série de Verificação Formal* · **Parte 1 de 3**
> **Público:** iniciantes completos. Não são assumidos conhecimentos de matemática, programação ou criptografia.
> **O que levará consigo:** uma compreensão clara do que significa *provar* que o software está correto, por que isso é fundamentalmente diferente de o testar, o que é uma prova verificada por máquina e os limites precisos (e honestos) do que tal prova pode garantir.

A maior parte do software é considerada fiável porque foi *testada*: executamo-lo com muitas entradas e observamos o seu comportamento. A verificação formal coloca uma questão mais ousada. Podemos *provar*, com certeza matemática, que um sistema faz o que deve para **todas** as entradas possíveis, incluindo aquelas que ninguém alguma vez pensou experimentar? Este artigo constrói essa ideia desde o início. Primeiro a intuição, sem símbolos até eles serem merecidos.

---

## 1. Porque deve importar-se?

Aqui está uma história verdadeira, e é a razão pela qual esta série existe.

Em 2022, a criptomoeda centrada na privacidade Zcash lançou uma nova pool blindada chamada Orchard, permitindo que as pessoas realizassem transações com os montantes ocultos. Durante quatro anos, funcionou sem falhas e passou por repetidas auditorias profissionais. Depois, em maio de 2026, um investigador de segurança que analisava cuidadosamente a matemática subjacente (com a ajuda de ferramentas de IA) encontrou um único ponto **sub-restrito** na matemática do sistema. Essa única lacuna poderia ter permitido a um atacante criar uma quantidade *ilimitada* de dinheiro falsificado e, como os montantes estavam ocultos, ninguém teria visto isso acontecer. A falha estivera presente durante todo o tempo.

Não foi detetada por testes. Todos os testes tinham passado durante quatro anos. Foi detetada por alguém que *analisou a matemática*. E, quando a equipa a corrigiu, não se limitou a aplicar uma correção e seguir em frente. Escreveu uma **prova matemática verificada por máquina**, com mais de 2.700 teoremas individuais, de que a substituição não podia conter de todo essa classe de falha.

Isto é verificação formal, e é isto que ela lhe oferece: não «experimentámos muitos casos e funcionaram», mas «provámos que se verifica em todos os casos». Para sistemas em que um único caso não considerado é catastrófico (dinheiro, aeronaves, dispositivos médicos, criptografia), essa diferença é tudo.

O ponto cego dos testes foi identificado há décadas pelo cientista informático Edsger Dijkstra, e continua a ser verdade:

> **Os testes podem mostrar a *presença* de erros, mas nunca a sua *ausência*.**

Se um teste passa, aprendeu que o sistema funciona *com essa entrada*. Não aprendeu nada sobre as entradas que não experimentou, e os erros perigosos estão quase sempre nos casos que ninguém experimentou.

---

## 2. A intuição: verificar portas vs. provar o edifício

Imagine que é responsável por um edifício com mil portas e que o seu trabalho é garantir que todas as portas ficam trancadas à noite.

- **A abordagem de teste:** percorra o edifício e experimente uma amostra de portas. Experimente cinquenta, cem, quinhentas. Todas as que experimenta estão trancadas, por isso a sua confiança aumenta. Mas não as experimentou todas, e a única porta destrancada pode ser uma que ignorou.
- **A abordagem de verificação formal:** examine o *próprio sistema de fecho* e prove, a partir da sua conceção, que premir o botão «trancar» aciona necessariamente todas as portas. Agora, não precisa de experimentar portas individualmente. Mostrou que *nenhuma porta possível pode ficar destrancada*, porque o mecanismo torna isso impossível.

A diferença está entre **amostrar a realidade** e **provar uma propriedade da conceção**. Os testes fazem amostragens. A verificação formal prova. Essa é toda a ideia, e todo o resto é maquinaria para a executar rigorosamente.

![alt text](image-2.png)

---

## 3. Os três pilares de qualquer verificação formal

Qualquer verificação formal, por mais avançada que seja, é construída a partir de exatamente três ingredientes. Mantenha-os claros e o resto são pormenores.

| Pilar | Significado simples | Analogia do edifício |
|---|---|---|
| **Especificação** | Uma afirmação precisa do que *significa* estar «correto» | «Todas as portas têm de estar trancadas à noite» |
| **Sistema** | A coisa efetivamente verificada (um programa, um circuito, um protocolo) | O edifício e o seu mecanismo de fecho |
| **Prova** | Um argumento rigoroso de que o sistema cumpre sempre a especificação | A demonstração lógica de que premir «trancar» tranca todas as portas |

E um quarto ingrediente, mais discreto, torna tudo fiável:

- **Um verificador automático.** A prova não é escrita por uma pessoa e simplesmente analisada a olho. É fornecida a um programa (um **assistente de provas**, também chamado **demonstrador de teoremas**) que verifica *cada passo lógico individual*. Uma pessoa pode gesticular ou cometer um erro subtil; a máquina não aceitará um passo que não resulte estritamente do anterior. É por isso que dizemos que o resultado é **verificado por máquina**.

![alt text](image-3.png)

Entre os assistentes de provas que poderá ouvir mencionar estão **Lean**, **Rocq** (anteriormente Coq) e **Isabelle**. São, na prática, motores extraordinariamente rigorosos de verificação lógica. A prova Zcash da nossa história inicial foi escrita em **Lean**. É importante notar que os modelos modernos de IA são cada vez mais utilizados para ajudar a *escrever* estas provas, com orientação humana, o que reduziu esforços que antes demoravam anos para semanas. A máquina continua a verificar cada passo, pelo que a aceleração não reduz a certeza.

---

## 4. O que uma prova realmente é

A palavra «prova» pode parecer intimidante, por isso vamos desmistificá-la com um exemplo concreto e verificável. Sem criptografia, apenas aritmética escolar.

**Afirmação:** para cada número inteiro não negativo `n`, a soma `0 + 1 + 2 + ... + n` é igual a `n(n+1)/2`.

Poderia *testar* isto. `n = 5` dá `0+1+2+3+4+5 = 15`, e `5 × 6 / 2 = 15`. ✓ Corresponde. Experimente `n = 10`: a soma é `55`, e a fórmula dá `10 × 11 / 2 = 55`. ✓ (Estes valores são calculados e confirmados; a afirmação verifica-se, de facto, para todos os `n` de 0 a 999 quando verificada diretamente.)

Mas testar valores, mesmo mil deles, nunca alcança «para **todos** os números inteiros não negativos». Existem infinitamente muitos. Uma **prova** fecha essa lacuna infinita num argumento finito, usando uma técnica chamada **indução**:

1. **Caso base:** para `n = 0`, a soma é apenas `0`, e a fórmula dá `0 × 1 / 2 = 0`. São iguais. ✓
2. **Passo indutivo:** *suponha* que a fórmula se verifica para algum número `k`. Agora adicione o número seguinte, `k+1`. A soma até `k+1` é `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Uma linha de álgebra reorganiza isto para `(k+1)(k+2)/2`, que é exatamente a fórmula com `k+1` em vez de `k`. ✓

Como se verifica no início (0) e cada passo a transporta para o número seguinte, verifica-se para **todos** os números inteiros não negativos, para sempre, num único argumento finito. Isto é uma prova. Um assistente de provas faz exatamente este raciocínio, mas verifica mecanicamente que cada passo, incluindo a «linha de álgebra», decorre realmente do que veio antes.

> O salto que vale a pena assimilar: uma prova transforma «infinitos casos» num **argumento finito e verificável**. Esse é o superpoder que os testes estruturalmente não possuem.

---

## 5. Onde os erros realmente vivem

A verificação formal é poderosa, em parte, devido a uma ideia esclarecedora sobre *onde* os erros surgem originalmente. Qualquer falha num sistema de verificação de regras pode ser atribuída a um de três lugares:

| Origem de um erro | O que significa | Podemos eliminá-lo por prova? |
|---|---|---|
| **A especificação** | A própria matemática ou regras estão erradas (uma condição em falta, uma má definição) | **Sim**, diretamente; este é o terreno da verificação formal |
| **A implementação** | O código não executa fielmente uma especificação correta | Parcialmente; muitas vezes, estas falhas deixam evidências detetáveis |
| **Uma suposição falhada** | Algo de que todo o sistema depende acaba por ser falso | Não; as suposições são a base irredutível |

Esta taxonomia importa mais do que parece, e as Partes 2 e 3 dependem dela. Os erros mais profundos e perigosos, aqueles que podem permanecer ocultos para sempre, tendem a residir na **especificação**: a descrição matemática do que o sistema deve fazer. E a especificação é exatamente aquilo que uma prova verificada por máquina pode examinar diretamente, todos os casos de uma vez. É por isso que os esforços sérios de verificação formal começam por aí.

![alt text](image-4.png)

---

## 6. A ressalva mais importante de toda a área

A verificação formal é poderosa, mas a sua promessa é precisa, e compreendê-la mal induz as pessoas em erro. Por isso, formulemo-la cuidadosamente:

> **Uma prova garante que o *sistema* cumpre a *especificação*, sob as *suposições* declaradas. Nada mais.**

Daqui decorrem quatro consequências, e cada uma importa:

- **Se a especificação estiver errada, a prova não vale nada.** Se provar que «todas as portas trancam», mas o requisito real era «todas as *janelas* trancam», provou a coisa errada, perfeitamente. A verificação confirma que construiu *o que especificou*, não que especificou a coisa certa.
- **Se uma definição for formulada de forma subtilmente errada, a garantia restringe-se silenciosamente.** Uma prova sobre uma definição ligeiramente errada de «saldo» pode estabelecer menos do que pensa, mantendo-se válida em todas as verificações. É por isso que as definições no centro de uma verificação devem ser curtas, normalizadas e abertamente analisáveis por pessoas.
- **Se as suposições falharem, a garantia deixa de se aplicar.** As provas assentam em suposições («o hardware da fechadura não está fisicamente avariado»). Se uma suposição for falsa na realidade, a conclusão pode não se verificar.
- **Não significa «nunca haverá erros».** Significa «não existem erros do tipo excluído por esta especificação, dadas estas suposições». É uma afirmação mais limitada, mais honesta e muito mais útil.

Longe de enfraquecer a verificação formal, esta precisão é a sua força. Diz-lhe *exatamente* o que está a obter. Como veremos na Parte 3, a equipa Zcash, ao declarar claramente o seu âmbito e as suas suposições («provámos a solidez do fornecimento, sob estas suposições identificadas, e não a privacidade»), é um modelo dessa honestidade.

![alt text](image-5.png)

---

## 7. Uma ressalva honesta

Para manter isto legível, simplificámos. As especificações reais são escritas em linguagens formais precisas, não em frases em inglês; existem vários *estilos* de verificação formal (demonstração interativa de teoremas, verificação de modelos, métodos baseados em SMT) adequados a diferentes problemas; e escrever estas provas continua a ser um trabalho qualificado e exigente, mesmo com assistência de IA. Também omitimos como um assistente de provas representa internamente a lógica. Nada disto altera o essencial: uma especificação, um sistema e uma prova verificada por máquina de que os dois estão de acordo, sob suposições declaradas. Os pormenores regressarão quando forem necessários.

---

## 8. Resumo

- **Os testes** fazem amostragens de entradas específicas e podem mostrar que um erro está presente, nunca que os erros estão ausentes. Os erros perigosos escondem-se nos casos que ninguém amostra.
- **A verificação formal** prova que uma propriedade se verifica em **todos** os casos possíveis, num argumento finito e verificável.
- Cada verificação tem três pilares: uma **especificação** (o que significa estar correto), um **sistema** (a coisa verificada) e uma **prova** de que estão de acordo, além de um **assistente de provas** (como o **Lean**) que verifica cada passo por máquina.
- Uma **prova** (por exemplo, por **indução**) reduz infinitos casos a um único argumento finito.
- Os erros residem na **especificação**, na **implementação** ou numa **suposição falhada**. A verificação formal visa diretamente a especificação, que é onde os erros mais profundos e ocultos tendem a residir.
- A garantia é precisa: o sistema cumpre **a especificação**, sob **suposições declaradas**. Uma especificação errada, uma definição mal formulada ou uma suposição falhada anulam-na, e nunca significa «nunca haverá erros».

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Verificação formal** | Provar, matematicamente, que um sistema cumpre uma especificação em todos os casos |
| **Especificação** | Uma afirmação precisa do que significa um «comportamento correto» |
| **Sistema** | O programa, circuito ou protocolo efetivamente verificado |
| **Prova** | Uma cadeia finita de passos lógicos que estabelece uma afirmação para todos os casos |
| **Assistente de provas / demonstrador de teoremas** | Software (Lean, Rocq, Isabelle) que verifica cada passo de uma prova |
| **Verificado por máquina** | Verificado passo a passo por um computador, não apenas por leitura humana |
| **Indução** | Uma técnica de prova: é verdadeira no início, e cada passo transporta-a para o seguinte |
| **Suposição** | Uma condição de que a prova depende; se for falsa, a garantia pode não se verificar |

---

## Perguntas frequentes

**A verificação formal substitui os testes?**
Não. Complementam-se. Os testes detetam de forma económica problemas práticos e suposições erradas; a verificação exclui classes inteiras de erros que os testes poderiam nunca amostrar.

**Se é tão poderosa, porque não é tudo formalmente verificado?**
É dispendiosa e exige competências especializadas, embora a assistência de IA esteja a reduzir esse custo. É reservada para sistemas em que um erro raro seria catastrófico, que é exatamente onde o seu custo compensa.

**Um sistema formalmente verificado ainda pode falhar?**
Sim, se a especificação estiver errada, uma definição tiver sido mal formulada, uma suposição não se verificar ou a falha estiver fora do que foi especificado. A prova cobre apenas aquilo que afirma cobrir.

**Uma prova verificada por máquina é mais fiável do que uma prova humana?**
Para provas grandes e intrincadas, geralmente sim. Uma máquina não ignorará uma lacuna subtil nem aceitará uma afirmação sem demonstração, embora continue a confiar na especificação e nas definições que lhe foram dadas.

**Se a IA ajuda a escrever a prova, porque devemos confiar nela?**
Porque o assistente de provas verifica cada passo mecanicamente. A IA propõe passos; a máquina verifica-os. Um passo errado é simplesmente rejeitado, pelo que a IA acelera o trabalho sem enfraquecer a garantia.

---

### Teste a sua intuição

Prova que o software de um banco «nunca permite que o saldo de uma conta fique negativo». Um ano depois, o dinheiro continua a desaparecer. Como podem ambas as coisas ser verdadeiras ao mesmo tempo? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

A prova garantiu exatamente uma propriedade: os saldos nunca ficam negativos. O dinheiro pode desaparecer de formas que essa propriedade nunca abordou, por exemplo, devido a um erro que transfere fundos para a conta errada (ainda assim não negativa), ou a uma falha numa parte do sistema que nunca foi especificada. A verificação fez precisamente o que prometeu e nada mais. Esta é a ressalva da Secção 6 em ação: uma prova cobre a especificação, não todas as noções concebíveis de «correto».
</details>

---

### O que se segue

**Parte 2 · O erro Orchard:** voltamo-nos para a história real de 2026 na íntegra. Um sistema de privacidade ocultava montantes usando provas criptográficas, e uma linha sub-restrita na sua matemática significava que essas provas podiam ser levadas a mentir, permitindo falsificação invisível ilimitada. Veremos exatamente o que significa «um circuito sub-restrito», porque esta classe de erro pode permanecer oculta para sempre e porque já aconteceu mais do que uma vez.

*Parte da* série de Verificação Formal *para [ZecHub](https://zechub.org).*
