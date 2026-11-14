![alt text](image-1.png)
# Ironwood: provando que o dinheiro não pode ser falsificado

### Como o Zcash respondeu a um bug com uma prova verificada por máquina

> **Série:** *Verificação formal* · **Parte 3 de 3**
> **Público:** iniciantes. As partes 1 e 2 apresentaram a verificação formal e o bug do Orchard; este final mostra as duas ideias se encontrando em um sistema real. Tudo o que for necessário será relembrado ao longo do caminho.
> **O que você vai levar:** uma compreensão precisa do que o Zcash realmente provou sobre o seu novo pool "Ironwood", como a prova está estruturada, o que ela cobre e o que não cobre, como o pool antigo foi aposentado com segurança e por que isso aponta para um novo padrão na construção de dinheiro criptográfico.

Na parte 1, aprendemos o que significa *provar* que um sistema está correto. Na parte 2, vimos uma falha real que os testes deixaram passar por quatro anos, uma multiplicação de curva elíptica subrestrita que poderia ter permitido falsificação invisível ilimitada. Este artigo é o desfecho: como o Zcash respondeu não apenas com uma correção, mas com uma prova verificada por máquina de que toda a classe desse bug deixou de existir.

---

## 1. Por que você deveria se importar?

Quando um bug ameaça o dinheiro, a resposta habitual é corrigi-lo e seguir em frente. O Zcash fez algo mais ambicioso. Junto com um novo pool blindado chamado **Ironwood**, ativado em 28 de julho de 2026, seus engenheiros publicaram uma **prova matemática verificada por máquina**, com mais de **2.700 teoremas** escritos no assistente de provas **Lean**, estabelecendo que o novo pool não pode criar moedas falsificadas sob as suposições declaradas. A prova é pública, está no repositório de código aberto `ironwood`, e levou bem mais de um mês para ser concluída por três equipes de pesquisadores e criptógrafos.

Isso importa para além do Zcash. É uma das demonstrações mais claras no mundo real de que é possível pegar um sistema financeiro em funcionamento, escrever com precisão o que "nenhuma falsificação" significa e *prová-lo*, em vez de torcer para que seus testes tenham sido completos. Isso transforma uma promessa em um teorema.

---

## 2. A ideia central: provar a especificação, eliminar a classe de bug

A parte 2 terminou com a percepção que tornou isso possível. Relembre-a, porque tudo aqui depende dela:

> Um bug de falsificação *indetectável* só pode existir na **especificação** do protocolo, a descrição matemática do que o circuito deve impor. Qualquer coisa detectável apareceria na contabilidade pública. Portanto, provar que a especificação é sólida elimina de uma só vez toda a classe de bugs de falsificação oculta.

Por que "só na especificação"? Porque cada bloco registra permanentemente o conteúdo completo de cada transação, incluindo suas provas. Se o *software* aceitasse erroneamente uma transação inválida, qualquer pessoa poderia reprocessar o histórico em um software corrigido e ver isso. Essa evidência é permanente e pública. Somente uma falha na *matemática* subjacente pode ficar oculta para sempre, porque não existe uma "versão correta" contra a qual reprocessar. Essa é a falha que a verificação formal tem como alvo.

Os testes verificam o *comportamento em entradas amostradas*, e o bug do Orchard ficou escondido justamente porque nenhuma entrada amostrada o atingiu. Uma prova sobre a especificação cobre **todas** as entradas simultaneamente, incluindo os casos extremos que ninguém pensaria em testar. Esse é o único tipo de garantia forte o suficiente para aposentar com confiança uma falha invisível de quatro anos.

![alt text](image-2.png)

---

## 3. O que exatamente foi provado

A prova estabelece uma única propriedade principal, construída a partir de outra mais profunda que está por baixo dela.

### Integridade do saldo (a principal)

> **Integridade do saldo:** o valor oculto armazenado no pool blindado nunca excede o valor público líquido que entrou nele.

Essa é a propriedade antifalsificação em sua forma mais simples. O dinheiro pode entrar no pool blindado (de forma publicamente visível) e sair dele (de forma publicamente visível), mas lá dentro, onde os valores estão ocultos, nenhum valor pode ser criado do nada. Vamos tornar isso concreto com um pequeno livro-razão (aritmética verificada):

- **Transação honesta:** entradas no valor de `5 + 3 = 8` produzem saídas no valor de `4 + 4 = 8`. O valor que entra é igual ao valor que sai. A integridade do saldo se mantém. ✓
- **Uma tentativa de falsificação:** as mesmas entradas no valor de `8`, mas com saídas de `4 + 4 + 2 = 10`. Isso criaria `2` unidades do nada. A integridade do saldo **proíbe** isso: o pool nunca pode pagar mais do que entrou nele. ✗

A integridade do saldo é a afirmação matemática de que o segundo cenário nunca pode produzir uma transação válida.

### Solidez de conhecimento (o motor por baixo)

Para garantir a integridade do saldo, os pesquisadores primeiro tiveram que provar uma propriedade mais profunda e sutil sobre o próprio sistema de provas de conhecimento zero. A solidez comum (o "só afirmações verdadeiras têm uma testemunha" da parte 2) acaba *não sendo suficiente* para um pool blindado, por um motivo fascinante: como uma transação oculta pode conter qualquer coisa, quase toda afirmação tecnicamente *tem* alguma testemunha. Por isso, os pesquisadores provaram uma propriedade mais forte:

> **Solidez de conhecimento:** qualquer pessoa capaz de produzir uma prova de transação válida deve *realmente possuir* uma testemunha válida, ou seja, moedas reais, corretamente derivadas, no endereço certo.

A ferramenta formal para isso é um **extrator**: um procedimento que, dado qualquer provador capaz de convencer o verificador, consegue extrair dele a testemunha real. Se uma testemunha sempre pode ser extraída, então um provador convincente realmente precisava ter uma. Na linguagem da parte 2, a solidez de conhecimento é a promessa formal de que **não existe lacuna de solidez**, nenhuma restrição ausente que deixaria passar uma afirmação falsa. É exatamente a propriedade cuja *ausência* era o bug do Orchard. Provar que ela está presente, para todos os provadores possíveis, é o que fecha essa porta de vez.

![alt text](image-3.png)

---

## 4. Como a prova foi construída

A verificação foi um esforço humano sério, não um resultado obtido apertando um botão:

- Escrita no assistente de provas **Lean** (da parte 1: uma máquina que verifica cada passo lógico).
- Composta por **mais de 2.700 teoremas**, disponíveis publicamente no repositório `ironwood`.
- Produzida por **três equipes** de pesquisadores e criptógrafos ao longo de **mais de um mês**, incluindo trabalho liderado por Tal Derei, do Project Tachyon, com contribuições de Gregor Mitscha-Baude, da zkSecurity, e Daira-Emma Hopwood, do Zcash Open Development Lab, além de uma prova de solidez paralela e independente feita por outros criptógrafos.

Para raciocinar sobre a propriedade, o modelo em Lean descreve um **livro-razão** inteiro como uma lista de transações, cada uma com suas ações, seu valor público declarado e suas assinaturas. Um predicado que os pesquisadores chamam de **ValidLedger** transcreve diretamente as regras de consenso da rede: a testemunha de cada ação deve satisfazer as condições exigidas, nenhum marcador de gasto (nulificador) pode aparecer duas vezes, todo estado de árvore referenciado deve ser um que o sistema realmente alcançou, e toda assinatura deve ser verificada. Os teoremas então quantificam sobre **todo** livro-razão válido. Essa expressão, "todo livro-razão válido", é o ponto principal: não uma amostra, mas todos eles, um superconjunto de qualquer coisa que um atacante real poderia montar.

O resultado de integridade do saldo é construído a partir de vários teoremas no nível do livro-razão, cada um provando que uma via de falsificação está fechada: que todo gasto corresponde a uma saída real anterior, que o valor total é conservado, que uma note recebida continua gastável e não pode ser roubada, e que gastar exige a devida autorização. Uma peça separada, a **assinatura de vinculação**, liga os valores ocultos de cada transação ao valor público que ela declara, de modo que a contabilidade oculta e a pública não possam divergir silenciosamente.

---

## 5. Onde a matemática encontra o software

Uma pergunta sutil e honesta: a prova trata de um modelo matemático, mas a rede executa *código Rust*. Como sabemos que o código corresponde ao modelo?

A equipe traçou uma fronteira cuidadosa, que chama de **impressão digital** do verificador. Acima da fronteira, as provas em Lean raciocinam sobre o verificador como um objeto matemático preciso. Abaixo dela fica a implementação comum em Rust. O argumento principal é o mesmo da parte 2:

> Qualquer forma pela qual o software real pudesse se desviar do modelo provado seria um bug de *implementação*, e bugs de implementação só podem produzir falsificação *detectável*, porque toda prova aceita fica registrada permanentemente e pode ser reprocessada em um software corrigido.

Assim, a prova trata da classe indetectável (a especificação), e o registro público permanente trata da classe detectável (a implementação). Entre os dois, não sobra lugar para um bug de falsificação *indetectável* se esconder. A equipe também fez uma verificação cruzada, executando o verificador real e confirmando que ele reproduz exatamente a impressão digital nos casos capturados.

---

## 6. A ressalva mais importante: "sob suposições declaradas"

A parte 1 insistiu que uma prova garante que o sistema atende à especificação *sob suposições declaradas*, e nunca significa "nenhum bug, jamais". A equipe do Zcash foi admiravelmente precisa exatamente sobre isso, e um texto educacional honesto também deve ser.

A prova reduz a segurança do Ironwood a um pequeno conjunto de suposições padrão, claramente nomeadas. Em particular, sua solidez se apoia na dificuldade do **problema do logaritmo discreto** na curva elíptica que o Ironwood usa (uma suposição bem estudada, em que o melhor ataque conhecido levaria da ordem de `2^126` operações, muito além de qualquer computação viável), junto com suposições de modelagem padrão para a função de hash. Vale a pena declarar duas fronteiras com clareza:

- **Ela vale sob essas suposições criptográficas.** Se uma suposição fundamental fosse quebrada, a garantia deixaria de valer. Isso é padrão e inevitável; praticamente toda a criptografia em uso se apoia em suposições assim.
- **Ela cobre a integridade do saldo, não a privacidade.** A prova trata da solidez da oferta (nada de dinheiro falso). Ela **não** pretende provar as garantias de privacidade do pool, que são uma propriedade diferente, com argumentos diferentes.

Longe de diminuir a conquista, nomear essas fronteiras é o que a torna confiável. A afirmação é exata: *sob suposições criptográficas padrão, este pool não pode criar moedas falsificadas indetectáveis.* Isso é um teorema, não uma esperança, e seu escopo preciso é declarado abertamente.

![alt text](image-4.png)

---

## 7. Aposentando o pool antigo com segurança: a catraca

Provar que o pool *novo* é sólido ainda deixa uma pergunta: e o pool Orchard *antigo*, onde a falha existiu por quatro anos? Não é possível revelar o seu passado. Mas é possível limitar o seu futuro.

O Zcash introduziu um mecanismo chamado **catraca**. A regra é simples e poderosa:

> O valor só pode sair do pool antigo até o montante que comprovadamente entrou nele.

Como o dinheiro que entra e sai de um pool blindado é publicamente visível (apenas a atividade *dentro* dele fica oculta), a catraca permite que toda a rede verifique que não sai mais do que jamais entrou. Se moedas falsificadas tivessem sido criadas dentro do pool antigo, elas esbarrariam nesse limite e não conseguiriam sair. E, à medida que os fundos honestos migram para fora e nenhum excedente aparece, a comunidade ganha fortes evidências públicas de que a falha nunca foi explorada. É o mais próximo que se pode chegar de auditar a oferta de um pool privado sem quebrar sua privacidade, e aproxima a integridade da oferta do modelo transparente de uma chain como o Bitcoin, preservando a privacidade do Zcash.

![alt text](image-5.png)

O próprio Ironwood reutiliza o circuito de prova *corrigido*, começa do zero com um pool vazio e adiciona proteções voltadas para o futuro (incluindo disposições para que os fundos possam continuar recuperáveis caso futuros computadores quânticos venham a ameaçar a criptografia atual). A nova atividade blindada agora passa pelo Ironwood, enquanto o pool Orchard antigo fica restrito a saques.

---

## 8. O panorama geral: criptografia de alta garantia

O Ironwood faz parte de uma mudança mais ampla na forma como o Zcash é construído. Seu esforço de escalabilidade de próxima geração (uma arquitetura chamada **Tachyon**, construída sobre provas recursivas e um kit de ferramentas chamado **Ragu**) está sendo desenvolvido sob uma filosofia às vezes chamada de **criptografia de alta garantia**: tratar a verificação formal por máquina não como algo secundário, mas como parte padrão do lançamento de novos sistemas criptográficos.

A lógica é convincente. A criptografia de ponta é exatamente onde a intuição humana é mais fraca e onde um caso extremo sutil e não testado pode ficar escondido por anos, como o Orchard mostrou. Provar a especificação é a única técnica que escala para "todas as entradas possíveis" e fecha essas lacunas por construção. A equipe sinalizou que pretende ampliar esse escrutínio com o tempo, em direção à implementação e além. Espere ver esse padrão sendo adotado de forma mais ampla, no Zcash e fora dele.

---

## 9. Um aviso honesto

Simplificamos para maior clareza. O desenvolvimento real em Lean é muito mais detalhado do que este esboço, com definições precisas de ações, afirmações, compromissos, nulificadores e assinaturas; "integridade do saldo" e "solidez de conhecimento" têm definições formais exatas que apresentamos apenas em palavras; a redução à dificuldade do logaritmo discreto passa por vários modelos intermediários (um modelo algébrico do provador e um modelo de oráculo aleatório do hash) que resumimos como "suposições padrão"; e descrevemos a impressão digital e a catraca em nível conceitual. Nada disso muda a história essencial: uma especificação de "nenhuma falsificação", uma prova verificada por máquina sobre todos os livros-razão válidos, uma declaração explícita e honesta de escopo e suposições, e uma aposentadoria segura do pool com falha. Para o relato oficial, consulte os relatórios de verificação publicados pelo Project Tachyon e o repositório de provas `ironwood`.

---

## 10. Resumo

- O Zcash respondeu ao bug do Orchard não apenas com uma correção, mas com uma **prova verificada por máquina** (mais de **2.700 teoremas** em **Lean**, disponíveis publicamente) para o seu novo pool **Ironwood**.
- A prova estabelece a **integridade do saldo** (o pool nunca paga mais do que entrou nele publicamente), construída sobre a **solidez de conhecimento** (uma prova válida exige que o provador realmente tenha uma testemunha genuína, verificada por meio de um **extrator**). A solidez de conhecimento é exatamente a propriedade cuja lacuna era o bug do Orchard.
- Ela raciocina sobre **todo livro-razão válido**, não sobre casos amostrados, e é isso que fecha a classe de bugs de falsificação oculta que os testes deixaram passar.
- A lacuna entre a matemática e o software é tratada por uma fronteira de **impressão digital**: bugs indetectáveis são descartados pela prova, e qualquer desvio de implementação seria **detectável** no registro público permanente.
- A garantia é declarada com precisão: ela vale sob a **dificuldade do logaritmo discreto e suposições padrão de hash**, e cobre a **falsificação, não a privacidade**. Essa honestidade é uma qualidade, não uma fraqueza.
- A **catraca** aposenta com segurança o pool antigo, limitando suas saídas aos depósitos verificáveis, expondo qualquer falsificação e construindo evidências públicas da integridade da oferta.
- O Ironwood reflete um movimento em direção à **criptografia de alta garantia**, em que a verificação formal é parte padrão da construção de novos tipos de dinheiro criptográfico.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Ironwood** | O novo pool blindado do Zcash (2026), que substitui o pool Orchard com falha |
| **Balance integrity** | O pool nunca paga mais valor do que entrou nele publicamente |
| **Knowledge soundness** | Uma prova válida exige que o provador tenha uma testemunha genuína |
| **Extractor** | Um procedimento que extrai a testemunha de qualquer provador convincente |
| **Lean** | O assistente de provas usado para verificar a prova por máquina |
| **ValidLedger** | O modelo formal das regras de consenso sobre o qual os teoremas raciocinam |
| **Fingerprint** | A fronteira entre a matemática provada e o software Rust em execução |
| **Under stated assumptions** | A prova vale desde que as suposições criptográficas nomeadas sejam válidas |
| **Turnstile** | Uma regra que limita as saídas de um pool aos seus depósitos verificáveis |
| **High-assurance cryptography** | Construir criptografia com a verificação formal como etapa padrão |

---

## Perguntas frequentes

**A prova significa que o Ironwood está livre de bugs?**
Não, e ela não afirma isso. Ela prova uma propriedade precisa, a integridade do saldo, sob suposições declaradas. Isso descarta a falsificação indetectável, não todo bug imaginável.

**A prova garante que minhas transações são privadas?**
Não. A verificação cobre a solidez da oferta (nada de dinheiro falso), não as garantias de privacidade do pool, que são separadas. Essas são demonstradas de outra forma.

**Por que confiar em uma prova escrita por humanos (e por IA)?**
Porque ela é verificada por máquina. O assistente de provas Lean verifica cada passo mecanicamente, de modo que a confiança se apoia na especificação e nas suposições nomeadas, e não no cuidado de algum humano ou IA em cada passo.

**O que acontece com as moedas que ainda estão no pool Orchard antigo?**
Elas podem ser sacadas, mas apenas até o montante que comprovadamente entrou, o que é imposto pela catraca. Isso protege a integridade da oferta e ajuda a demonstrar que a falha antiga nunca foi explorada.

**Este é o fim da história?**
É um marco, não uma linha de chegada. A arquitetura futura do Zcash (Tachyon, com o kit de ferramentas Ragu) está sendo construída com a verificação formal como prática padrão, ampliando ainda mais essa abordagem.

---

### Teste sua intuição

Alguém afirma: "Como o Ironwood é formalmente verificado, agora é impossível que algo dê errado com o Zcash." Usando ideias das três partes, dê dois motivos distintos pelos quais essa afirmação é forte demais. *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Primeiro, a prova cobre uma propriedade *específica* (integridade do saldo) sob *suposições declaradas* (dificuldade do logaritmo discreto e modelagem padrão de hash). Se uma suposição criptográfica fosse quebrada, ou se surgisse um problema fora do que foi especificado (por exemplo, na privacidade, no software da carteira ou em algum componente não provado), a prova não diz nada sobre isso. Segundo, a verificação formal garante que o sistema atende *à especificação que foi escrita*; se essa especificação deixasse de capturar algum requisito real, a prova certificaria fielmente a coisa errada. Os dois pontos reafirmam a ressalva da parte 1: uma prova é exata e limitada, poderosa justamente porque seu escopo é honesto, e não uma garantia geral de que nada pode dar errado.
</details>

---

### A série, completa

Ao longo de três partes, passamos de uma ideia geral a uma aplicação real: o que significa **provar** que um software está correto em vez de testá-lo (parte 1), como um circuito real subrestrito poderia ter criado dinheiro invisível (parte 2) e como uma prova verificada por máquina da **integridade do saldo** aposentou essa classe de bug de vez (parte 3). O fio condutor é uma única promessa honesta: não "nenhum bug, jamais", mas "esta propriedade precisa vale para todos os casos, sob suposições declaradas". Para um dinheiro que oculta os próprios valores, essa é exatamente a promessa que vale a pena provar.

*Parte da série* Verificação formal *para [ZecHub](https://zechub.org).*
