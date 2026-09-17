![alt text](image-1.png)
# Ironwood: Provar que o dinheiro não pode ser falsificado

### Como Zcash respondeu a um bug com uma prova verificada por máquina

> **Série:** *Verificação Formal* · **Parte 3 de 3**
> **Público:** iniciantes. As Partes 1 e 2 introduziram a verificação formal e o bug Orchard; este final mostra as duas ideias a encontrarem-se num sistema real. Tudo o que é necessário é relembrado ao longo do texto.
> **O que vai aprender:** uma compreensão precisa do que Zcash realmente provou sobre a sua nova pool "Ironwood", como a prova está estruturada, o que abrange e o que não abrange, como a pool antiga foi retirada de forma segura e porque isto aponta para um novo padrão para construir dinheiro criptográfico.

Na Parte 1 aprendemos o que significa *provar* que um sistema está correto. Na Parte 2 vimos uma falha real que os testes não detetaram durante quatro anos: uma multiplicação de curva elíptica insuficientemente restringida que poderia ter permitido falsificação invisível ilimitada. Este artigo é a resolução: como Zcash respondeu não apenas com uma correção, mas com uma prova verificada por máquina de que toda esta classe de bugs desapareceu.

---

## 1. Porque deve importar-se?

Quando um bug ameaça dinheiro, a resposta habitual é corrigi-lo e seguir em frente. Zcash fez algo mais ambicioso. Juntamente com uma nova pool protegida chamada **Ironwood**, ativada a 28 de julho de 2026, os seus engenheiros publicaram uma **prova matemática verificada por máquina**, com mais de **2.700 teoremas** escritos no assistente de prova **Lean**, estabelecendo que a nova pool não pode criar moedas falsificadas sob as suas premissas declaradas. A prova é pública, no repositório open-source `ironwood`, e exigiu a três equipas de investigadores e criptógrafos bem mais de um mês para ser concluída.

Isto importa para além de Zcash. É uma das demonstrações mais claras no mundo real de que é possível pegar num sistema financeiro em funcionamento, escrever com precisão o que significa "sem falsificação" e *prová-lo*, em vez de esperar que os testes tenham sido suficientemente completos. Transforma uma promessa num teorema.

---

## 2. A ideia central: provar a especificação, eliminar a classe de bug

A Parte 2 terminou com a perceção que tornou isto possível. Recorde-a, porque tudo aqui assenta nela:

> Um bug de falsificação *indetetável* só pode existir na **especificação** do protocolo, a descrição matemática do que o circuito deve impor. Qualquer coisa detetável surgiria na contabilidade pública. Assim, provar que a especificação é sólida elimina de uma só vez toda a classe de bugs de falsificação oculta.

Porque é que existe "apenas na especificação"? Porque cada bloco regista permanentemente o conteúdo completo de cada transação, incluindo as suas provas. Se o *software* aceitasse incorretamente uma transação inválida, qualquer pessoa poderia reproduzir o histórico através de software corrigido e vê-lo. Essa evidência é permanente e pública. Apenas uma falha na *matemática* subjacente pode permanecer oculta para sempre, pois não há uma "versão correta" contra a qual reproduzir. É essa a falha a que a verificação formal se destina.

Os testes verificam o *comportamento em entradas amostradas*, e o bug Orchard ocultou-se precisamente porque nenhuma entrada amostrada o atingiu. Uma prova sobre a especificação abrange **todas** as entradas em simultâneo, incluindo os casos-limite que ninguém pensaria em experimentar. É o único tipo de garantia suficientemente forte para retirar com confiança uma falha invisível com quatro anos.

![alt text](image-2.png)

---

## 3. O que foi exatamente provado

A prova estabelece uma única propriedade principal, construída sobre uma propriedade mais profunda.

### Integridade do saldo (a propriedade principal)

> **Integridade do saldo:** o valor oculto armazenado na pool protegida nunca excede o valor público líquido que entrou nela.

Esta é a propriedade anti-falsificação em termos simples. O dinheiro pode entrar na pool protegida (publicamente visível) e sair dela (publicamente visível), mas, no interior, onde os montantes estão ocultos, não pode ser criado valor do nada. Vejamo-lo de forma concreta com um pequeno livro-razão (aritmética verificada):

- **Transação honesta:** entradas no valor de `5 + 3 = 8` produzem saídas no valor de `4 + 4 = 8`. O valor de entrada é igual ao valor de saída. A integridade do saldo mantém-se. ✓
- **Uma tentativa de falsificação:** as mesmas entradas no valor de `8`, mas saídas de `4 + 4 + 2 = 10`. Isto criaria `2` unidades do nada. A integridade do saldo **proíbe** isto: a pool nunca pode pagar mais do que aquilo que entrou nela. ✗

A integridade do saldo é a afirmação matemática de que o segundo cenário nunca pode produzir uma transação válida.

### Solidez do conhecimento (o mecanismo subjacente)

Para garantir a integridade do saldo, os investigadores tiveram primeiro de provar uma propriedade mais profunda e subtil sobre o próprio sistema de provas de conhecimento zero. A solidez comum (o princípio da Parte 2 de que "apenas afirmações verdadeiras têm uma testemunha") acaba por ser *insuficiente* para uma pool protegida, por uma razão fascinante: como uma transação oculta pode conter qualquer coisa, quase todas as afirmações tecnicamente *têm* alguma testemunha. Por isso, os investigadores provaram uma propriedade mais forte:

> **Solidez do conhecimento:** qualquer pessoa que consiga produzir uma prova de transação válida tem de *possuir efetivamente* uma testemunha válida, isto é, moedas reais, corretamente derivadas, no endereço certo.

A ferramenta formal para isto é um **extrator**: um procedimento que, dado qualquer provador capaz de convencer o verificador, consegue extrair dele a testemunha real. Se uma testemunha pode ser sempre extraída, então um provador convincente tinha realmente de possuir uma. Na linguagem da Parte 2, a solidez do conhecimento é a promessa formal de que não existe **nenhuma lacuna de solidez**, nenhuma restrição em falta que permita a passagem de uma afirmação falsa. É precisamente a propriedade cuja *ausência* constituiu o bug Orchard. Provar a sua presença, para todos os provadores possíveis, é o que fecha essa porta.

![alt text](image-3.png)

---

## 4. Como a prova foi construída

A verificação foi um esforço humano sério, não um resultado obtido com o premir de um botão:

- Escrita no assistente de prova **Lean** (da Parte 1: uma máquina que verifica cada passo lógico).
- Composta por **mais de 2.700 teoremas**, disponíveis publicamente no repositório `ironwood`.
- Produzida por **três equipas** de investigadores e criptógrafos durante **mais de um mês**, incluindo trabalho liderado por Tal Derei, do Project Tachyon, com contribuições de Gregor Mitscha-Baude, da zkSecurity, e Daira-Emma Hopwood, do Open Development Lab Zcash, além de uma prova independente e paralela de solidez por outros criptógrafos.

Para raciocinar sobre a propriedade, o modelo Lean descreve um **livro-razão** completo como uma lista de transações, cada uma contendo as suas ações, o seu valor público declarado e as suas assinaturas. Um predicado a que os investigadores chamam **ValidLedger** transcreve diretamente as regras de consenso da rede: a testemunha de cada ação deve satisfazer as condições exigidas, nenhum marcador de gasto (nullifier) pode surgir duas vezes, cada estado de árvore referido deve ser um estado que o sistema realmente alcançou, e cada assinatura deve ser verificada. Os teoremas quantificam então sobre **todos** os livros-razão válidos. Essa expressão, "todos os livros-razão válidos", é o ponto essencial: não uma amostra, mas todos eles, um superconjunto de qualquer coisa que um atacante real pudesse alguma vez montar.

O resultado de integridade do saldo é reunido a partir de vários teoremas ao nível do livro-razão, cada um provando que uma via para a falsificação está fechada: que cada gasto corresponde a uma saída real anterior, que o valor total é conservado, que uma nota recebida permanece gastável e não pode ser roubada, e que o gasto exige autorização adequada. Uma parte separada, a **assinatura de vinculação**, liga os valores ocultos de cada transação ao montante público que declara, para que a contabilidade oculta e a pública não possam divergir silenciosamente.

---

## 5. Onde a matemática encontra o software

Uma questão subtil e honesta: a prova diz respeito a um modelo matemático, mas a rede executa *código Rust*. Como sabemos que o código corresponde ao modelo?

A equipa traçou uma fronteira cuidadosa a que chama a **impressão digital** do verificador. Acima da fronteira, as provas em Lean raciocinam sobre o verificador enquanto objeto matemático preciso. Abaixo dela encontra-se a implementação Rust comum. O argumento fundamental é o mesmo da Parte 2:

> Qualquer forma de o software real se desviar do modelo provado seria um bug de *implementação*, e os bugs de implementação só podem produzir falsificação *detetável*, porque cada prova aceite é registada permanentemente e pode ser reproduzida através de software corrigido.

Assim, a prova trata da classe indetetável (a especificação), e o registo público permanente trata da classe detetável (a implementação). Entre ambas, não existe lugar onde um bug de falsificação *indetetável* se possa esconder. A equipa também fez uma verificação cruzada, executando o verificador real e confirmando que reproduz exatamente a impressão digital em casos capturados.

---

## 6. A ressalva mais importante: "sob as premissas declaradas"

A Parte 1 insistiu que uma prova garante que o sistema cumpre a especificação *sob as premissas declaradas*, e nunca significa "nunca haverá bugs". A equipa de Zcash foi admiravelmente precisa quanto a isto, e uma escrita educativa honesta também deve sê-lo.

A prova reduz a segurança de Ironwood a um pequeno conjunto de premissas padrão, claramente identificadas. Em particular, a sua solidez assenta na dificuldade do **problema do logaritmo discreto** na curva elíptica usada por Ironwood (uma premissa bem estudada, para a qual o melhor ataque conhecido exigiria da ordem de `2^126` operações, muito para além de qualquer computação viável), juntamente com premissas de modelação padrão para a função hash. Vale a pena declarar claramente dois limites:

- **É válida sob essas premissas criptográficas.** Se uma premissa fundamental fosse quebrada, a garantia deixaria de se aplicar. Isto é normal e inevitável; praticamente toda a criptografia implementada assenta em tais premissas.
- **Abrange a integridade do saldo, não a privacidade.** A prova diz respeito à solidez do fornecimento (sem dinheiro falso). **Não** afirma provar as garantias separadas de privacidade da pool, que são uma propriedade diferente com argumentos diferentes.

Longe de enfraquecer a conquista, nomear estes limites é o que a torna fiável. A afirmação é exata: *sob premissas criptográficas padrão, esta pool não pode criar moedas falsas indetetáveis.* Isto é um teorema, não uma esperança, e o seu âmbito preciso é declarado abertamente.

![alt text](image-4.png)

---

## 7. Retirar a pool antiga com segurança: a catraca

Provar que a *nova* pool é sólida ainda deixa uma questão: e a antiga pool Orchard, onde a falha existiu durante quatro anos? Não é possível tornar o seu passado visível. Mas é possível limitar o seu futuro.

Zcash introduziu um mecanismo chamado **turnstile**. A regra é simples e poderosa:

> O valor só pode sair da pool antiga até ao montante que comprovadamente entrou nela.

Como o dinheiro que entra e sai de uma pool protegida é publicamente visível (apenas a atividade *dentro* dela é oculta), o turnstile permite que toda a rede verifique que não sai mais do que alguma vez entrou. Se moedas falsificadas tivessem sido criadas dentro da pool antiga, atingiriam este limite e não conseguiriam sair. E, à medida que os fundos honestos migram para fora e não surge nenhum excedente, a comunidade obtém forte evidência pública de que a falha nunca foi explorada. É o mais próximo de auditar o fornecimento de uma pool privada sem quebrar a sua privacidade, e aproxima a integridade do fornecimento do modelo transparente de uma cadeia como Bitcoin, preservando simultaneamente a privacidade de Zcash.

![alt text](image-5.png)

A própria Ironwood reutiliza o circuito de prova *corrigido*, começa de novo com uma pool vazia e adiciona proteções orientadas para o futuro (incluindo disposições para que os fundos possam continuar recuperáveis caso futuros computadores quânticos venham a ameaçar a criptografia atual). A nova atividade protegida passa agora por Ironwood, enquanto a antiga pool Orchard fica limitada a levantamentos.

---

## 8. O panorama mais amplo: criptografia de alta garantia

Ironwood faz parte de uma mudança mais ampla na forma como Zcash constrói. O seu esforço de escalabilidade de próxima geração (uma arquitetura chamada **Tachyon**, construída sobre provas recursivas e um toolkit chamado **Ragu**) está a ser desenvolvido segundo uma filosofia por vezes chamada **criptografia de alta garantia**: tratar a verificação formal por máquina não como uma reflexão tardia, mas como uma parte normal da disponibilização de novos sistemas criptográficos.

A lógica é convincente. A criptografia de ponta é precisamente onde a intuição humana é mais fraca e onde um caso-limite subtil e não testado pode permanecer oculto durante anos, como Orchard demonstrou. Provar a especificação é a única técnica que se estende a "todas as entradas possíveis" e fecha essas lacunas por construção. A equipa sinalizou que pretende alargar este escrutínio ao longo do tempo, em direção à implementação e mais além. Espere ver este padrão adotado mais amplamente, dentro e fora de Zcash.

---

## 9. Uma ressalva honesta

Simplificámos para maior clareza. O desenvolvimento real em Lean é muito mais detalhado do que o esboço apresentado aqui, com definições precisas de ações, afirmações, compromissos, nullifiers e assinaturas; "integridade do saldo" e "solidez do conhecimento" têm definições formais exatas que apresentámos apenas em palavras; a redução à dificuldade do logaritmo discreto passa por vários modelos intermédios (um modelo algébrico do provador e um modelo de oráculo aleatório da hash) que comprimimos em "premissas padrão"; e descrevemos a impressão digital e o turnstile a um nível conceptual. Nada disto altera a história essencial: uma especificação de "sem falsificação", uma prova verificada por máquina sobre todos os livros-razão válidos, uma declaração explícita e honesta do âmbito e das premissas, e uma retirada segura da pool defeituosa. Para o relato autorizado, consulte os textos de verificação publicados pelo Project Tachyon e o repositório de provas `ironwood`.

---

## 10. Resumo

- Zcash respondeu ao bug Orchard não apenas com uma correção, mas com uma **prova verificada por máquina** (com mais de **2.700 teoremas** em **Lean**, disponível publicamente) para a sua nova pool **Ironwood**.
- A prova estabelece a **integridade do saldo** (a pool nunca paga mais do que aquilo que entrou publicamente), construída sobre a **solidez do conhecimento** (uma prova válida exige que o provador detenha efetivamente uma testemunha genuína, verificada através de um **extrator**). A solidez do conhecimento é precisamente a propriedade cuja lacuna constituiu o bug Orchard.
- Raciocina sobre **todos os livros-razão válidos**, não sobre casos amostrados, o que fecha a classe de bugs de falsificação oculta que os testes não detetaram.
- A lacuna entre matemática e software é tratada por uma fronteira de **impressão digital**: os bugs indetetáveis são excluídos pela prova, e qualquer desvio de implementação seria **detetável** no registo público permanente.
- A garantia é declarada com precisão: é válida sob a **dificuldade do logaritmo discreto e premissas hash padrão**, e abrange **falsificação, não privacidade**. Esta honestidade é uma característica, não uma fraqueza.
- O **turnstile** retira com segurança a pool antiga, limitando as suas saídas aos seus depósitos verificáveis, expondo qualquer falsificação e criando evidência pública de integridade do fornecimento.
- Ironwood reflete um movimento em direção à **criptografia de alta garantia**, em que a verificação formal é uma parte normal da construção de dinheiro criptográfico inovador.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Ironwood** | A nova pool protegida de Zcash (2026), substituindo a pool defeituosa Orchard |
| **Integridade do saldo** | A pool nunca paga mais valor do que aquele que entrou publicamente |
| **Solidez do conhecimento** | Uma prova válida exige que o provador detenha uma testemunha genuína |
| **Extrator** | Um procedimento que extrai a testemunha de qualquer provador convincente |
| **Lean** | O assistente de prova usado para verificar a verificação por máquina |
| **ValidLedger** | O modelo formal das regras de consenso sobre o qual os teoremas raciocinam |
| **Impressão digital** | A fronteira entre a matemática provada e o software Rust em execução |
| **Sob as premissas declaradas** | A prova é válida desde que as premissas criptográficas indicadas se mantenham |
| **Turnstile** | Uma regra que limita as saídas de uma pool aos seus depósitos verificáveis |
| **Criptografia de alta garantia** | Construir criptografia com verificação formal como etapa padrão |

---

## FAQ

**A prova significa que Ironwood não tem bugs?**
Não, e não afirma isso. Prova uma propriedade precisa, a integridade do saldo, sob as premissas declaradas. Isto exclui a falsificação indetetável, não todos os bugs concebíveis.

**A prova garante que as minhas transações são privadas?**
Não. A verificação abrange a solidez do fornecimento (sem dinheiro falso), não as garantias separadas de privacidade da pool. Estas são justificadas de forma diferente.

**Porque confiar numa prova escrita por humanos (e IA)?**
Porque é verificada por máquina. O assistente de prova Lean verifica mecanicamente cada passo, pelo que a confiança assenta na especificação e nas premissas indicadas, não no cuidado de qualquer humano ou IA em cada etapa.

**O que acontece às moedas que ainda estão na antiga pool Orchard?**
Podem ser levantadas, mas apenas até ao montante que comprovadamente entrou, imposto pelo turnstile. Isto protege a integridade do fornecimento e ajuda a demonstrar que a falha antiga nunca foi explorada.

**Este é o fim da história?**
É um marco, não uma meta final. A futura arquitetura de Zcash (Tachyon, com o toolkit Ragu) está a ser construída com a verificação formal como prática padrão, estendendo esta abordagem ainda mais.

---

### Teste a sua intuição

Alguém afirma: "Como Ironwood foi formalmente verificada, agora é impossível que alguma coisa corra mal com Zcash." Usando ideias das três partes, indique duas razões distintas pelas quais essa afirmação é demasiado forte. *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Primeiro, a prova abrange uma propriedade *específica* (integridade do saldo) sob *premissas declaradas* (dificuldade do logaritmo discreto e modelação hash padrão). Se uma premissa criptográfica fosse quebrada, ou se surgisse um problema fora do que foi especificado (por exemplo, na privacidade, no software de wallet ou em algum componente não provado), a prova nada diria sobre isso. Segundo, a verificação formal garante que o sistema cumpre *a especificação que foi escrita*; se essa especificação não capturasse algum requisito real, a prova certificaria fielmente a coisa errada. Ambos os pontos reiteram a ressalva da Parte 1: uma prova é exata e limitada, poderosa precisamente porque o seu âmbito é honesto, não uma garantia geral de que nunca poderá acontecer nada de errado.
</details>

---

### A série completa

Ao longo de três partes passámos de uma ideia geral a uma aplicação em funcionamento: o que significa **provar** que o software está correto em vez de o testar (Parte 1), como um circuito real insuficientemente restringido poderia ter criado dinheiro invisível (Parte 2), e como uma prova de **integridade do saldo** verificada por máquina retirou definitivamente essa classe de bug (Parte 3). O fio condutor é uma única promessa honesta: não "nunca haverá bugs", mas "esta propriedade precisa é válida para todos os casos, sob as premissas declaradas". Para dinheiro que oculta os seus próprios montantes, essa promessa é exatamente aquela que vale a pena provar.

*Parte da série* Formal Verification *para [ZecHub](https://zechub.org).*
