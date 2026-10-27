![Texto alternativo](image-1.png)
# Ironwood: Provar que o dinheiro não pode ser falsificado

### Como o Zcash respondeu a um bug com uma prova verificada por máquina

> **Série:** *Verificação formal* · **Parte 3 de 3**
> **Público:** iniciantes. As partes 1 e 2 apresentaram a verificação formal e o bug Orchard; este final mostra as duas ideias se encontrando em um sistema real. Tudo o que é necessário é relembrado ao longo do texto.
> **O que você vai aprender:** uma compreensão precisa do que o Zcash realmente provou sobre seu novo pool blindado "Ironwood", como a prova está estruturada, o que ela abrange e o que não abrange, como o pool antigo foi desativado com segurança e por que isso aponta para um novo padrão para criar dinheiro criptográfico.

Na Parte 1, aprendemos o que significa *provar* que um sistema está correto. Na Parte 2, vimos uma falha real que os testes não detectaram durante quatro anos: uma multiplicação de curva elíptica com restrições insuficientes que poderia ter permitido falsificação invisível ilimitada. Este artigo é a resolução: como o Zcash respondeu não apenas com uma correção, mas com uma prova verificada por máquina de que toda essa classe de bugs foi eliminada.

---

## 1. Por que você deveria se importar?

Quando um bug ameaça o dinheiro, a resposta habitual é corrigi-lo e seguir em frente. O Zcash fez algo mais ambicioso. Junto com um novo pool blindado chamado **Ironwood**, ativado em 28 de julho de 2026, seus engenheiros publicaram uma **prova matemática verificada por máquina**, com mais de **2.700 teoremas** escritos no assistente de provas **Lean**, estabelecendo que o novo pool não pode criar moedas falsificadas sob suas premissas declaradas. A prova é pública, no repositório open-source `ironwood`, e exigiu de três equipes de pesquisadores e criptógrafos bem mais de um mês para ser concluída.

Isso importa para além do Zcash. É uma das demonstrações mais claras no mundo real de que é possível pegar um sistema financeiro em funcionamento, escrever com precisão o que significa "sem falsificação" e *prová-lo*, em vez de esperar que os testes tenham sido suficientemente completos. Isso transforma uma promessa em um teorema.

---

## 2. A ideia central: provar a especificação, eliminar a classe de bugs

A Parte 2 terminou com a percepção que tornou isso possível. Relembre-a, porque tudo aqui se baseia nela:

> Um bug de falsificação *indetectável* só pode existir na **especificação** do protocolo, a descrição matemática do que o circuito deve impor. Qualquer coisa detectável surgiria na contabilidade pública. Assim, provar que a especificação é sólida elimina de uma só vez toda a classe de bugs de falsificação oculta.

Por que "apenas na especificação"? Porque cada bloco registra permanentemente o conteúdo completo de cada transação, incluindo suas provas. Se o *software* aceitasse incorretamente uma transação inválida, qualquer pessoa poderia reproduzir o histórico usando software corrigido e vê-la. Essa evidência é permanente e pública. Apenas uma falha na *matemática* subjacente pode permanecer oculta para sempre, pois não há uma "versão correta" com a qual comparar. É essa a falha à qual a verificação formal se destina.

Os testes verificam o *comportamento em entradas amostradas*, e o bug Orchard se ocultou precisamente porque nenhuma entrada amostrada o atingiu. Uma prova sobre a especificação abrange **todas** as entradas simultaneamente, incluindo os casos-limite que ninguém pensaria em experimentar. É o único tipo de garantia suficientemente forte para desativar com confiança uma falha invisível de quatro anos.

![Texto alternativo](image-2.png)

---

## 3. O que foi exatamente provado

A prova estabelece uma única propriedade principal, construída sobre uma propriedade mais profunda.

### Integridade do saldo (a propriedade principal)

> **Integridade do saldo:** o valor oculto armazenado no pool blindado nunca excede o valor público líquido que entrou nele.

Esta é a propriedade antifalsificação em termos simples. O dinheiro pode entrar no pool blindado (publicamente visível) e sair dele (publicamente visível), mas, no interior, onde os valores estão ocultos, nenhum valor pode ser criado do nada. Vamos torná-lo concreto com um pequeno livro-razão (aritmética verificada):

- **Transação honesta:** entradas no valor de `5 + 3 = 8` produzem saídas no valor de `4 + 4 = 8`. O valor de entrada é igual ao valor de saída. A integridade do saldo é mantida. ✓
- **Uma tentativa de falsificação:** as mesmas entradas no valor de `8`, mas saídas de `4 + 4 + 2 = 10`. Isso criaria `2` unidades do nada. A integridade do saldo **proíbe** isso: o pool nunca pode pagar mais do que aquilo que entrou nele. ✗

A integridade do saldo é a afirmação matemática de que o segundo cenário nunca pode produzir uma transação válida.

### Solidez do conhecimento (o mecanismo subjacente)

Para garantir a integridade do saldo, os pesquisadores primeiro tiveram de provar uma propriedade mais profunda e sutil sobre o próprio sistema de provas de conhecimento zero. A solidez comum (o princípio da Parte 2 de que "apenas afirmações verdadeiras têm uma testemunha") acaba sendo *insuficiente* para um pool blindado, por uma razão fascinante: como uma transação oculta pode conter qualquer coisa, quase todas as afirmações tecnicamente *têm* alguma testemunha. Por isso, os pesquisadores provaram uma propriedade mais forte:

> **Solidez do conhecimento:** qualquer pessoa que consiga produzir uma prova de transação válida precisa *realmente possuir* uma testemunha válida, isto é, moedas reais, corretamente derivadas, no endereço certo.

A ferramenta formal para isso é um **extrator**: um procedimento que, dado qualquer provador capaz de convencer o verificador, consegue extrair dele a testemunha real. Se uma testemunha sempre pode ser extraída, então um provador convincente realmente precisava possuir uma. Na linguagem da Parte 2, a solidez do conhecimento é a promessa formal de que não existe **nenhuma lacuna de solidez**, nenhuma restrição ausente que permita que uma afirmação falsa passe. É precisamente a propriedade cuja *ausência* constituiu o bug Orchard. Provar sua presença, para todos os provadores possíveis, é o que fecha essa porta.

![Texto alternativo](image-3.png)

---

## 4. Como a prova foi construída

A verificação foi um esforço humano sério, não um resultado obtido ao apertar um botão:

- Escrita no assistente de provas **Lean** (da Parte 1: uma máquina que verifica cada passo lógico).
- Composta por **mais de 2.700 teoremas**, disponíveis publicamente no repositório `ironwood`.
- Produzida por **três equipes** de pesquisadores e criptógrafos durante **mais de um mês**, incluindo trabalho liderado por Tal Derei, do Project Tachyon, com contribuições de Gregor Mitscha-Baude, da zkSecurity, e Daira-Emma Hopwood, do Zcash Open Development Lab, além de uma prova independente e paralela de solidez por outros criptógrafos.

Para raciocinar sobre a propriedade, o modelo Lean descreve um **livro-razão** inteiro como uma lista de transações, cada uma contendo suas ações, seu valor público declarado e suas assinaturas. Um predicado que os pesquisadores chamam de **ValidLedger** transcreve diretamente as regras de consenso da rede: a testemunha de cada ação deve satisfazer as condições exigidas, nenhum marcador de gasto (nulificador) pode aparecer duas vezes, cada estado de árvore referenciado deve ser um estado que o sistema realmente alcançou, e cada assinatura deve ser verificada. Os teoremas então quantificam sobre **todos** os livros-razão válidos. Essa expressão, "todos os livros-razão válidos", é o ponto central: não uma amostra, mas todos eles, um superconjunto de qualquer coisa que um atacante real poderia montar.

O resultado de integridade do saldo é reunido a partir de vários teoremas no nível do livro-razão, cada um provando que uma via para a falsificação está fechada: que cada gasto corresponde a uma saída real anterior, que o valor total é conservado, que uma note recebida permanece gastável e não pode ser roubada, e que o gasto exige autorização adequada. Uma parte separada, a **assinatura de vinculação**, vincula os valores ocultos de cada transação ao valor público que ela declara, para que a contabilidade oculta e a pública não possam divergir silenciosamente.

---

## 5. Onde a matemática encontra o software

Uma questão sutil e honesta: a prova trata de um modelo matemático, mas a rede executa *código Rust*. Como sabemos que o código corresponde ao modelo?

A equipe traçou uma fronteira cuidadosa que chama de **impressão digital** do verificador. Acima da fronteira, as provas em Lean raciocinam sobre o verificador como um objeto matemático preciso. Abaixo dela está a implementação Rust comum. O argumento fundamental é o mesmo da Parte 2:

> Qualquer forma de o software real se desviar do modelo provado seria um bug de *implementação*, e bugs de implementação só podem produzir falsificação *detectável*, porque cada prova aceita é registrada permanentemente e pode ser reproduzida usando software corrigido.

Assim, a prova trata da classe indetectável (a especificação), e o registro público permanente trata da classe detectável (a implementação). Entre ambas, não há lugar onde um bug de falsificação *indetectável* possa se esconder. A equipe também fez uma verificação cruzada, executando o verificador real e confirmando que ele reproduz exatamente a impressão digital em casos capturados.

---

## 6. A ressalva mais importante: "sob as premissas declaradas"

A Parte 1 insistiu que uma prova garante que o sistema atende à especificação *sob as premissas declaradas*, e nunca significa "nunca haverá bugs". A equipe do Zcash foi admiravelmente precisa quanto a isso, e uma escrita educativa honesta também deve ser.

A prova reduz a segurança de Ironwood a um pequeno conjunto de premissas padrão, claramente identificadas. Em particular, sua solidez se baseia na dificuldade do **problema do logaritmo discreto** na curva elíptica usada por Ironwood (uma premissa bem estudada, para a qual o melhor ataque conhecido exigiria da ordem de `2^126` operações, muito além de qualquer computação viável), juntamente com premissas de modelagem padrão para a função hash. Vale a pena declarar claramente dois limites:

- **É válida sob essas premissas criptográficas.** Se uma premissa fundamental fosse quebrada, a garantia deixaria de se aplicar. Isso é normal e inevitável; praticamente toda a criptografia implementada se baseia em tais premissas.
- **Abrange a integridade do saldo, não a privacidade.** A prova trata da solidez da oferta (sem dinheiro falso). **Não** afirma provar as garantias separadas de privacidade do pool, que são uma propriedade diferente com argumentos diferentes.

Longe de enfraquecer a conquista, nomear esses limites é o que a torna confiável. A afirmação é exata: *sob premissas criptográficas padrão, este pool não pode criar moedas falsas indetectáveis.* Isso é um teorema, não uma esperança, e seu escopo preciso é declarado abertamente.

![Texto alternativo](image-4.png)

---

## 7. Desativando o pool antigo com segurança: a catraca

Provar que o *novo* pool é sólido ainda deixa uma questão: e o antigo pool Orchard, onde a falha existiu durante quatro anos? Você não pode tornar seu passado visível. Mas pode limitar seu futuro.

O Zcash introduziu um mecanismo chamado **turnstile**. A regra é simples e poderosa:

> O valor só pode sair do pool antigo até o valor que comprovadamente entrou nele.

Como o dinheiro que entra e sai de um pool blindado é publicamente visível (apenas a atividade *dentro* dele é oculta), a catraca permite que toda a rede verifique que não sai mais do que jamais entrou. Se moedas falsificadas tivessem sido criadas dentro do pool antigo, atingiriam esse limite e não conseguiriam sair. E, à medida que os fundos honestos migram para fora e nenhum excedente surge, a comunidade obtém forte evidência pública de que a falha nunca foi explorada. É o mais próximo de auditar a oferta de um pool privado sem quebrar sua privacidade, e aproxima a integridade da oferta do modelo transparente de uma chain como Bitcoin, preservando simultaneamente a privacidade do Zcash.

![Texto alternativo](image-5.png)

A própria Ironwood reutiliza o circuito de prova *corrigido*, começa de novo com um pool vazio e adiciona proteções voltadas para o futuro (incluindo disposições para que os fundos possam permanecer recuperáveis caso futuros computadores quânticos venham a ameaçar a criptografia atual). A nova atividade blindada agora passa por Ironwood, enquanto o antigo pool Orchard fica limitado a saques.

---

## 8. O panorama mais amplo: criptografia de alta garantia

Ironwood faz parte de uma mudança mais ampla na forma como o Zcash é construído. Seu esforço de escalabilidade de próxima geração (uma arquitetura chamada **Tachyon**, construída sobre provas recursivas e um toolkit chamado **Ragu**) está sendo desenvolvido segundo uma filosofia às vezes chamada de **criptografia de alta garantia**: tratar a verificação formal por máquina não como uma reflexão tardia, mas como uma parte normal da disponibilização de novos sistemas criptográficos.

A lógica é convincente. A criptografia de ponta é precisamente onde a intuição humana é mais fraca e onde um caso-limite sutil e não testado pode permanecer oculto durante anos, como Orchard demonstrou. Provar a especificação é a única técnica que se estende a "todas as entradas possíveis" e fecha essas lacunas por construção. A equipe sinalizou que pretende ampliar esse escrutínio ao longo do tempo, em direção à implementação e além. Espere ver esse padrão ser adotado mais amplamente, dentro e fora do Zcash.

---

## 9. Uma ressalva honesta

Simplificamos para maior clareza. O desenvolvimento real em Lean é muito mais detalhado do que o esboço apresentado aqui, com definições precisas de ações, afirmações, compromissos, nulificadores e assinaturas; "integridade do saldo" e "solidez do conhecimento" têm definições formais exatas que apresentamos apenas em palavras; a redução à dificuldade do logaritmo discreto passa por vários modelos intermediários (um modelo algébrico do provador e um modelo de oráculo aleatório da hash) que comprimimos em "premissas padrão"; e descrevemos a impressão digital e a catraca em um nível conceitual. Nada disso altera a história essencial: uma especificação de "sem falsificação", uma prova verificada por máquina sobre todos os livros-razão válidos, uma declaração explícita e honesta do escopo e das premissas, e uma desativação segura do pool defeituoso. Para o relato autorizado, consulte os textos de verificação publicados pelo Project Tachyon e o repositório de provas `ironwood`.

---

## 10. Resumo

- O Zcash respondeu ao bug Orchard não apenas com uma correção, mas com uma **prova verificada por máquina** (com mais de **2.700 teoremas** em **Lean**, disponível publicamente) para seu novo pool **Ironwood**.
- A prova estabelece a **integridade do saldo** (o pool nunca paga mais do que aquilo que entrou publicamente), construída sobre a **solidez do conhecimento** (uma prova válida exige que o provador realmente possua uma testemunha genuína, verificada por meio de um **extrator**). A solidez do conhecimento é precisamente a propriedade cuja lacuna constituiu o bug Orchard.
- Ela raciocina sobre **todos os livros-razão válidos**, não sobre casos amostrados, o que fecha a classe de bugs de falsificação oculta que os testes não detectaram.
- A lacuna entre matemática e software é tratada por uma fronteira de **impressão digital**: os bugs indetectáveis são excluídos pela prova, e qualquer desvio de implementação seria **detectável** no registro público permanente.
- A garantia é declarada com precisão: é válida sob a **dificuldade do logaritmo discreto e premissas hash padrão**, e abrange **falsificação, não privacidade**. Essa honestidade é uma característica, não uma fraqueza.
- A **catraca** desativa com segurança o pool antigo, limitando suas saídas aos seus depósitos verificáveis, expondo qualquer falsificação e criando evidência pública de integridade da oferta.
- Ironwood reflete um movimento em direção à **criptografia de alta garantia**, em que a verificação formal é uma parte normal da criação de dinheiro criptográfico inovador.

---

## Glossário

| Term | Significado em linguagem simples |
|---|---|
| **Ironwood** | O novo pool blindado do Zcash (2026), substituindo o pool Orchard defeituoso |
| **Balance integrity** | O pool nunca paga mais valor do que aquele que entrou publicamente nele |
| **Knowledge soundness** | Uma prova válida exige que o provador possua uma testemunha genuína |
| **Extractor** | Um procedimento que extrai a testemunha de qualquer provador convincente |
| **Lean** | O assistente de provas usado para verificar a prova por máquina |
| **ValidLedger** | O modelo formal das regras de consenso sobre o qual os teoremas raciocinam |
| **Fingerprint** | A fronteira entre a matemática provada e o software Rust em execução |
| **Under stated assumptions** | A prova é válida desde que as premissas criptográficas indicadas se mantenham |
| **Turnstile** | Uma regra que limita as saídas de um pool aos seus depósitos verificáveis |
| **High-assurance cryptography** | Criar criptografia com verificação formal como etapa padrão |

---

## FAQ

**A prova significa que Ironwood não tem bugs?**
Não, e não afirma isso. Ela prova uma propriedade precisa, a integridade do saldo, sob as premissas declaradas. Isso exclui a falsificação indetectável, não todos os bugs concebíveis.

**A prova garante que suas transações são privadas?**
Não. A verificação abrange a solidez da oferta (sem dinheiro falso), não as garantias separadas de privacidade do pool. Elas são justificadas de forma diferente.

**Por que confiar em uma prova escrita por humanos (e IA)?**
Porque ela é verificada por máquina. O assistente de provas Lean verifica mecanicamente cada passo, então a confiança se baseia na especificação e nas premissas indicadas, não no cuidado de qualquer humano ou IA em cada etapa.

**O que acontece às moedas que ainda estão no antigo pool Orchard?**
Elas podem ser sacadas, mas apenas até o valor que comprovadamente entrou, imposto pela catraca. Isso protege a integridade da oferta e ajuda a demonstrar que a falha antiga nunca foi explorada.

**Este é o fim da história?**
É um marco, não uma linha de chegada. A futura arquitetura do Zcash (Tachyon, com o toolkit Ragu) está sendo construída com a verificação formal como prática padrão, ampliando ainda mais essa abordagem.

---

### Teste sua intuição

Alguém afirma: "Como Ironwood foi formalmente verificada, agora é impossível que alguma coisa dê errado com o Zcash." Usando ideias das três partes, indique duas razões distintas pelas quais essa afirmação é forte demais. *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Primeiro, a prova abrange uma propriedade *específica* (integridade do saldo) sob *premissas declaradas* (dificuldade do logaritmo discreto e modelagem hash padrão). Se uma premissa criptográfica fosse quebrada, ou se surgisse um problema fora do que foi especificado (por exemplo, na privacidade, no software de carteira ou em algum componente não provado), a prova não diria nada sobre isso. Segundo, a verificação formal garante que o sistema atende *à especificação que foi escrita*; se essa especificação não capturasse algum requisito real, a prova certificaria fielmente a coisa errada. Ambos os pontos reafirmam a ressalva da Parte 1: uma prova é exata e limitada, poderosa precisamente porque seu escopo é honesto, não uma garantia geral de que nada jamais poderá dar errado.
</details>

---

### A série completa

Ao longo de três partes, passamos de uma ideia geral a uma aplicação em funcionamento: o que significa **provar** que o software está correto em vez de testá-lo (Parte 1), como um circuito real sub-restringido poderia ter criado dinheiro invisível (Parte 2) e como uma prova de **integridade do saldo** verificada por máquina eliminou essa classe de bug de vez (Parte 3). O fio condutor é uma única promessa honesta: não "nunca haverá bugs", mas "esta propriedade precisa é válida para todos os casos, sob as premissas declaradas". Para dinheiro que oculta seus próprios valores, essa promessa é exatamente a que vale a pena provar.

*Parte da série* Formal Verification *para [ZecHub](https://zechub.org).*
