![alt text](image-1.png)
# O que é verificação formal?

### Como provar que um programa está correto, em vez de apenas torcer para que esteja

> **Série:** *Série verificação formal* · **Parte 1 de 3**
> **Público:** iniciantes absolutos. Não é necessário conhecimento prévio de matemática, programação ou criptografia.
> **O que você vai levar daqui:** uma compreensão clara do que significa *provar* que um software está correto, por que isso é fundamentalmente diferente de testá-lo, o que é uma prova verificada por máquina e os limites precisos (e honestos) do que essa prova pode prometer.

A maioria dos softwares é considerada confiável porque foi *testada*: nós a executamos com muitas entradas e observamos como ela se comporta. A verificação formal faz uma pergunta mais ousada. Podemos *provar*, com certeza matemática, que um sistema faz o que deve para **toda** entrada possível, incluindo aquelas que ninguém jamais pensou em testar? Este artigo constrói essa ideia desde o início. Primeiro a intuição; nenhum símbolo até que ele seja merecido.

---

## 1. Por que você deveria se importar?

Aqui está uma história real, e ela é o motivo pelo qual esta série existe.

Em 2022, a criptomoeda focada em privacidade Zcash lançou uma nova pool blindada chamada Orchard, permitindo que as pessoas fizessem transações com os valores ocultos. Durante quatro anos ela funcionou perfeitamente e passou por repetidas auditorias profissionais. Então, em mai de 2026, um pesquisador de segurança, raciocinando cuidadosamente sobre a matemática subjacente (com a ajuda de ferramentas de IA), encontrou um único ponto **subrestrito** na matemática do sistema. Essa única lacuna poderia ter permitido que um atacante criasse uma quantidade *ilimitada* de dinheiro falsificado e, como os valores eram ocultos, ninguém teria visto isso acontecer. A falha esteve presente o tempo todo.

Ela não foi detectada por testes. Todos os testes tinham passado durante quatro anos. Ela foi detectada por alguém *raciocinando sobre a matemática*. E, quando a equipe a corrigiu, não se limitou a aplicar um patch e seguir em frente. Ela escreveu uma **prova matemática verificada por máquina**, com mais de 2.700 teoremas individuais, de que a substituição não poderia conter essa classe de falha de forma alguma.

Isso é verificação formal, e é isto que ela oferece: não "testamos muitos casos e eles funcionaram", mas "provamos que vale para todos os casos". Para sistemas em que um único caso não detectado é catastrófico (dinheiro, aeronaves, dispositivos médicos, criptografia), essa diferença é tudo.

O ponto cego dos testes foi identificado há décadas pelo cientista da computação Edsger Dijkstra, e continua verdadeiro:

> **Testes podem mostrar a *presença* de bugs, mas nunca a sua *ausência*.**

Se um teste passa, você aprendeu que o sistema funciona *com aquela entrada*. Você não aprendeu nada sobre as entradas que não testou, e os bugs perigosos quase sempre estão nos casos que ninguém testou.

---

## 2. A intuição: verificar portas vs. provar o prédio

Imagine que você é responsável por um prédio com mil portas e que seu trabalho é garantir que todas as portas estejam trancadas à noite.

- **A abordagem dos testes:** dê uma volta e teste uma amostra das portas. Teste cinquenta, cem, quinhentas. Todas as que você testa estão trancadas, então sua confiança aumenta. Mas você não testou todas, e a única porta destrancada pode ser justamente uma que você pulou.
- **A abordagem da verificação formal:** examine *o próprio sistema de travamento* e prove, a partir do seu projeto, que apertar o botão "trancar" necessariamente aciona todas as portas. Agora você não precisa testar portas individuais. Você mostrou que *nenhuma porta possível pode ficar destrancada*, porque o mecanismo torna isso impossível.

A diferença está entre **amostrar a realidade** e **provar uma propriedade do projeto**. Testes amostram. A verificação formal prova. Essa é a ideia inteira, e todo o resto é a maquinaria para fazer isso com rigor.

![alt text](image-2.png)

---

## 3. Os três pilares de qualquer verificação formal

Toda verificação formal, por mais avançada que seja, é construída a partir de exatamente três ingredientes. Tenha-os bem claros e o resto é detalhe.

| Pilar | Significado simples | Analogia do prédio |
|---|---|---|
| **Especificação** | Uma declaração precisa do que "correto" *significa* | "Todas as portas devem estar trancadas à noite" |
| **Sistema** | A coisa real sendo verificada (um programa, um circuito, um protocolo) | O prédio e seu mecanismo de travamento |
| **Prova** | Um argumento rigoroso de que o sistema sempre atende à especificação | A demonstração lógica de que apertar "trancar" tranca todas as portas |

E um quarto ingrediente, mais discreto, torna tudo confiável:

- **Um verificador automático.** A prova não é escrita por um humano e apenas conferida a olho. Ela é passada a um programa (um **assistente de provas**, também chamado de **provador de teoremas**) que verifica *cada passo lógico*. Um humano pode dar explicações vagas ou cometer um erro sutil; a máquina não aceitará um passo que não decorra estritamente do anterior. É por isso que dizemos que o resultado é **verificado por máquina**.

![alt text](image-3.png)

Os assistentes de provas que você pode ouvir mencionados incluem **Lean**, **Rocq** (antigo Coq) e **Isabelle**. Eles são, na prática, motores de verificação lógica extraordinariamente rigorosos. A prova do Zcash na nossa história de abertura foi escrita em **Lean**. Vale notar que modelos de IA modernos são cada vez mais usados para ajudar a *escrever* essas provas, com humanos orientando-os, o que reduziu esforços que antes levavam anos para semanas. A máquina continua verificando cada passo, então a aceleração não custa nenhuma certeza.

---

## 4. O que é, de fato, uma prova

A palavra "prova" pode parecer intimidadora, então vamos desmistificá-la com um exemplo concreto e verificável. Nada de criptografia, apenas aritmética escolar.

**Afirmação:** para todo número inteiro não negativo `n`, a soma `0 + 1 + 2 + ... + n` é igual a `n(n+1)/2`.

Você poderia *testar* isso. `n = 5` dá `0+1+2+3+4+5 = 15`, e `5 × 6 / 2 = 15`. ✓ Confere. Teste `n = 10`: a soma é `55`, e a fórmula dá `10 × 11 / 2 = 55`. ✓ (Esses valores foram calculados e confirmados; a afirmação de fato vale para todo `n` de 0 a 999 quando verificada diretamente.)

Mas testar valores, mesmo mil deles, nunca chega a "para **todo** número inteiro não negativo". Existem infinitos. Uma **prova** fecha essa lacuna infinita com um argumento finito, usando uma técnica chamada **indução**:

1. **Caso Base:** para `n = 0`, a soma é apenas `0`, e a fórmula dá `0 × 1 / 2 = 0`. Elas coincidem. ✓
2. **Passo indutivo:** *suponha* que a fórmula vale para algum número `k`. Agora some o próximo número, `k+1`. A soma até `k+1` é `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Uma linha de álgebra reorganiza isso em `(k+1)(k+2)/2`, que é exatamente a fórmula com `k+1` no lugar de `k`. ✓

Como vale no início (0) e cada passo a leva ao número seguinte, ela vale para **todos** os números inteiros não negativos, para sempre, em um único argumento finito. Isso é uma prova. Um assistente de provas faz exatamente esse raciocínio, mas verifica mecanicamente que cada passo, incluindo a "linha de álgebra", realmente decorre do que veio antes.

> O salto que vale a pena absorver: uma prova transforma "infinitos casos" em um **argumento finito e verificável**. Esse é o superpoder que falta estruturalmente aos testes.

---

## 5. Onde os bugs realmente vivem

A verificação formal é poderosa em parte por causa de uma percepção esclarecedora sobre *de onde* os bugs vêm, para começo de conversa. Qualquer falha em um sistema de verificação de regras tem origem em um de três lugares:

| Origem de um bug | O que significa | Podemos eliminá-lo com uma prova? |
|---|---|---|
| **A especificação** | A própria matemática ou as regras estão erradas (uma condição faltando, uma definição ruim) | **Sim**, diretamente; este é o território natural da verificação formal |
| **A implementação** | O código não executa fielmente uma especificação correta | Em parte; muitas vezes essas falhas deixam evidências detectáveis |
| **Uma suposição quebrada** | Algo em que todo o sistema se apoia se revela falso | Não; as suposições são a base irredutível |

Essa taxonomia importa mais do que parece, e as Partes 2 e 3 giram em torno dela. Os bugs mais profundos e perigosos, aqueles que podem ficar escondidos para sempre, tendem a viver na **especificação**: a descrição matemática do que o sistema deve fazer. E a especificação é exatamente o que uma prova verificada por máquina pode examinar diretamente, todos os casos de uma vez. É por isso que os esforços sérios de verificação formal miram ali primeiro.

![alt text](image-4.png)

---

## 6. A ressalva mais importante de toda a área

A verificação formal é poderosa, mas sua promessa é precisa, e entendê-la mal leva as pessoas ao erro. Então, vamos enunciá-la com cuidado:

> **Uma prova garante que o *sistema* atende à *especificação*, sob *suposições* declaradas. Nada mais.**

Daí decorrem quatro consequências, e cada uma importa:

- **Se a especificação estiver errada, a prova não vale nada.** Se você provar que "todas as portas trancam", mas o requisito real era "todas as *janelas* trancam", você provou a coisa errada, perfeitamente. A verificação confirma que você construiu *o que especificou*, não que especificou a coisa certa.
- **Se uma definição estiver sutilmente mal formulada, a garantia se estreita silenciosamente.** Uma prova sobre uma definição ligeiramente errada de "saldo" pode estabelecer menos do que você imagina e, ainda assim, passar em todas as verificações. É por isso que as definições no centro de uma verificação devem ser curtas, padronizadas e abertamente revisáveis por humanos.
- **Se as suposições falharem, a garantia deixa de valer.** As provas se apoiam em suposições ("o hardware da fechadura não está fisicamente quebrado"). Se uma suposição for falsa na realidade, a conclusão não precisa ser válida.
- **Isso não significa "nunca haverá bugs".** Significa "nenhum bug do tipo descartado por esta especificação, dadas estas suposições". Uma afirmação mais restrita, mais honesta e muito mais útil.

Longe de enfraquecer a verificação formal, essa precisão é a sua força. Ela diz a você *exatamente* o que está recebendo. Como veremos na Parte 3, a equipe do Zcash declarar seu escopo e suas suposições com clareza ("provamos a solidez do suprimento, sob estas suposições nomeadas, e não a privacidade") é um modelo dessa honestidade.

![alt text](image-5.png)

---

## 7. Um aviso honesto

Para manter o texto legível, simplificamos. Especificações reais são escritas em linguagens formais precisas, não em frases em inglês; existem vários *estilos* de verificação formal (prova interativa de teoremas, verificação de modelos, métodos baseados em SMT) adequados a problemas diferentes; e escrever essas provas continua sendo um trabalho especializado e trabalhoso, mesmo com assistência de IA. Também deixamos de lado como um assistente de provas representa a lógica internamente. Nada disso muda o essencial: uma especificação, um sistema e uma prova verificada por máquina de que os dois concordam, sob suposições declaradas. Os detalhes voltarão conforme precisarmos deles.

---

## 8. Resumo

- **Testes** amostram entradas específicas e podem mostrar que um bug está presente, nunca que os bugs estão ausentes. Os bugs perigosos se escondem nos casos que ninguém amostra.
- A **verificação formal** prova que uma propriedade vale para **todo** caso possível, em um argumento finito e verificável.
- Toda verificação tem três pilares: uma **especificação** (o que significa correto), um **sistema** (a coisa verificada) e uma **prova** de que eles concordam, além de um **assistente de provas** (como o **Lean**) que verifica cada passo por máquina.
- Uma **prova** (por exemplo, por **indução**) reduz infinitos casos a um único argumento finito.
- Os bugs vivem na **especificação**, na **implementação** ou em uma **suposição quebrada**. A verificação formal mira diretamente a especificação, que é onde os bugs mais profundos e escondidos costumam viver.
- A garantia é precisa: o sistema atende **à especificação**, sob **suposições declaradas**. Uma especificação errada, uma definição mal formulada ou uma suposição quebrada a anulam, e ela nunca significa "nunca haverá bugs".

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Formal verification** | Provar, matematicamente, que um sistema atende a uma especificação em todos os casos |
| **Specification** | Uma declaração precisa do que significa "comportamento correto" |
| **System** | O programa, circuito ou protocolo real que está sendo verificado |
| **Proof** | Uma cadeia finita de passos lógicos que estabelece uma afirmação para todos os casos |
| **Proof assistant / theorem prover** | Software (Lean, Rocq, Isabelle) que verifica cada passo de uma prova |
| **Machine-checked** | Verificado passo a passo por um computador, não apenas pela leitura humana |
| **Induction** | Uma técnica de prova: verdadeira no início, e cada passo a leva ao seguinte |
| **Assumption** | Uma condição em que a prova se apoia; se for falsa, a garantia pode não valer |

---

## Perguntas frequentes

**A verificação formal substitui os testes?**
Não. Eles se complementam. Os testes detectam problemas práticos e suposições equivocadas a baixo custo; a verificação descarta classes inteiras de bugs que os testes talvez nunca amostrassem.

**Se ela é tão poderosa, por que nem tudo é verificado formalmente?**
Ela é cara e exige habilidade especializada, embora a assistência de IA esteja reduzindo esse custo. Ela é reservada para sistemas em que um bug raro seria catastrófico, que é exatamente onde seu custo compensa.

**Um sistema verificado formalmente ainda pode falhar?**
Sim, se a especificação estava errada, se uma definição foi mal formulada, se uma suposição não se confirmou ou se a falha está fora do que foi especificado. A prova cobre apenas o que afirma cobrir.

**Uma prova verificada por máquina é mais confiável do que uma feita por humanos?**
Para provas grandes e complexas, geralmente sim. Uma máquina não deixa passar uma lacuna sutil nem aceita uma explicação vaga, embora ainda confie na especificação e nas definições que recebeu.

**Se a IA ajuda a escrever a prova, por que confiar nela?**
Porque o assistente de provas verifica cada passo mecanicamente. A IA propõe passos; a máquina os verifica. Um passo errado é simplesmente rejeitado, então a IA acelera o trabalho sem enfraquecer a garantia.

---

### Teste sua intuição

Você prova que o software de um banco "nunca deixa o saldo de uma conta ficar negativo". Um ano depois, ainda há dinheiro desaparecendo. Como as duas coisas podem ser verdadeiras ao mesmo tempo? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

A prova garantiu exatamente uma propriedade: os saldos nunca ficam negativos. O dinheiro pode desaparecer de maneiras que essa propriedade nunca abordou, por exemplo, um bug que move fundos para a conta errada (ainda com saldo não negativo), ou uma falha em uma parte do sistema que nunca foi especificada. A verificação fez exatamente o que prometeu e nada mais. Esta é a ressalva da Seção 6 na prática: uma prova cobre a especificação, não toda noção concebível de "correto".
</details>

---

### O que vem a seguir

**Parte 2 · O bug do Orchard:** voltamos à história real de 2026 por completo. Um sistema de privacidade ocultava valores usando provas criptográficas, e uma única linha subrestrita na sua matemática fazia com que essas provas pudessem ser levadas a mentir, permitindo uma falsificação invisível e ilimitada. Veremos exatamente o que significa "um circuito subrestrito", por que essa classe de bug pode ficar escondida para sempre e por que isso já aconteceu mais de uma vez.

*Parte da série* Verificação formal *para [ZecHub](https://zechub.org).*
