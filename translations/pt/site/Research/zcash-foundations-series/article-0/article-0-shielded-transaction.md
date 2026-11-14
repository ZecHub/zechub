# Como uma transação blindada do Zcash realmente funciona
##### Pesquisa original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-fedc371488.webp)

### A intuição antes da matemática: um passo a passo sem fórmulas dos pagamentos privados

> **Série:** *Zcash a partir dos primeiros princípios* . **Artigo 0 . A âncora**
> **Público:** iniciantes completos. Não pressupomos nenhum conhecimento de criptografia, de blockchain ou de matemática.
> **O que você vai levar daqui:** um modelo mental correto de como o Zcash esconde *quem pagou a quem, e quanto*, e ainda assim permite que o mundo inteiro verifique que nenhum dinheiro foi falsificado ou gasto duas vezes.

Cada artigo seguinte desta série dá um zoom em uma peça da máquina que você está prestes a conhecer. Então, se alguma palavra aqui parecer vaga, *ótimo*. É uma promessa de que voltaremos a ela e a explicaremos direito.

---

## 1. Por que você deveria se importar?

Imagine que seu extrato bancário estivesse pregado em um muro na praça da cidade. Para sempre. Qualquer pessoa (seu senhorio, seu empregador, um desconhecido, um futuro empregador, um governo) poderia ler cada pagamento de aluguel, cada conta médica, cada doação, cada café, e rastrear exatamente para quem você enviou dinheiro e quem enviou dinheiro para você.

Isso não é uma hipótese distópica. **É mais ou menos assim que o Bitcoin funciona.**

O Bitcoin costuma ser chamado de "anônimo", mas não é. Ele é *pseudônimo*: seu nome não está no registro, mas cada transação, cada valor e cada ligação entre endereços são públicos e permanentes. Todo o campo da "análise de chain" existe para arrancar esse fino pseudônimo e associar endereços a pessoas reais. Assim que um dos seus endereços é ligado a você, todo o seu histórico financeiro se desenrola.

O Zcash foi criado para responder a uma pergunta enganosamente difícil:

> **É possível ter um dinheiro completamente privado, que esconda o remetente, o destinatário e o valor, e que ainda assim permita a qualquer pessoa verificar que as regras foram seguidas?**

Esses dois objetivos brigam entre si. Um registro público é verificável *porque* todos podem vê-lo. Privacidade significa que ninguém pode vê-lo. Então como o público pode verificar algo que não tem permissão para olhar?

Resolver esse paradoxo é toda a história desta série. Vamos começar.

---

## 2. Existem dois mundos dentro do Zcash

Antes de qualquer coisa, vamos esclarecer um equívoco comum: **o Zcash não é "a moeda privada". É uma moeda que oferece privacidade como opção.** Na verdade, ele começou como um fork do Bitcoin e carrega dois sistemas paralelos na mesma blockchain.

| | **Mundo transparente** | **Mundo blindado** |
|---|---|---|
| Privacidade | Público, igual ao Bitcoin | Privado |
| Os endereços começam com | `t...` | `z...` ou `u...` |
| Remetente / destinatário / valor | **Visíveis** para todos | **Ocultos** de todos |
| Tecnologia de base | Registro público no estilo do Bitcoin | Compromissos criptográficos + provas de conhecimento zero |

O dinheiro pode até atravessar a fronteira entre eles: mover fundos *para dentro* do mundo blindado se chama *blindagem*, e movê-los de volta para fora é *desblindagem*.

O mundo transparente é "o Bitcoin que você já entende mais ou menos". É o **mundo blindado** que contém toda a bela criptografia, e esse é o único mundo que interessa a esta série.

![alt text](/content-images/image-1-f821d24c6f.webp)

---

## 3. A intuição: envelopes lacrados em um mural público

Aqui está a única imagem mental que você deve levar para o resto do artigo. Voltaremos a ela o tempo todo.

Imagine um enorme **mural público** que todas as pessoas da Terra podem ver o tempo todo.

* **Receber dinheiro** significa que alguém prende um **envelope lacrado e opaco** no mural. Dentro do envelope está *quanto dinheiro ele contém* e *um segredo que só o destinatário pode ler*, porque o envelope está trancado com a chave pessoal desse destinatário. O mundo inteiro vê que *um envelope apareceu*. Ninguém além do dono consegue ver o que há dentro.

* **O mural só cresce.** Os envelopes nunca são arrancados ou apagados. Novos envelopes são presos por cima, para sempre.

* **Gastar dinheiro** significa ir para trás de uma cortina, provar *"eu sou dono de um dos envelopes não gastos deste mural e tenho permissão para abri-lo"*, depois jogar um **token de anulação** único em uma lixeira pública de "gastos" e prender **novos envelopes** para quem você está pagando.

Esse pequeno ritual (jogar um token de anulação, prender novos envelopes, tudo por trás de uma cortina) *é* um pagamento no Zcash. Todo o resto é detalhe.

Agora vamos dar a esses objetos seus nomes reais.

---

## 4. Os cinco substantivos

Estes cinco termos são todo o vocabulário do Zcash blindado. Aprenda-os como uma *história*, não como um glossário, e eles vão ficar na memória.

| Na história | Termo real do Zcash | O que realmente é |
|---|---|---|
| O conteúdo do envelope (valor + dono + um segredo) | **Note** | A "moeda" privada: uma porção de valor que pertence a alguém |
| O envelope lacrado e opaco no mural | **Compromisso da note** | Um lacre criptográfico que prova que um envelope existe enquanto esconde o que há dentro |
| O próprio mural | **Árvore de compromissos de notes** | Um registro que só aceita acréscimos de *todas as notes já criadas* |
| O token de anulação na lixeira de "gastos" | **Nulificador** | Um marcador único que significa "esta note já foi gasta" |
| A mágica "por trás da cortina" | **Prova de conhecimento zero** | Uma prova de que todo o gasto é válido, sem revelar nada dele |

Se você não lembrar de mais nada deste artigo, lembre-se desta tabela. Tudo o que vem a seguir é apenas o *porquê* de cada peça ter o formato que tem.

---

## 5. Por que cada peça tem o formato que tem

Esta é a parte que a maioria das explicações pula, e é exatamente a parte que separa "eu decorei algumas palavras" de "eu entendo o design". Cada uma das cinco peças existe para resolver **um problema específico.**

### O compromisso da note: esconder o conteúdo, mas tornar a falsificação impossível

Um envelope comum pode ser aberto com vapor. Um **compromisso da note** criptográfico, não. Pense nele como um envelope *magicamente* lacrado e totalmente opaco, com dois superpoderes:

- **Ocultação**: olhar para o envelope lacrado não diz *nada* sobre o valor ou o dono que estão dentro.
- **Vinculação**: depois de lacrado, o conteúdo não pode ser trocado. Você não pode afirmar depois que o envelope continha um valor diferente.

Como um lacre pode fazer as duas coisas ao mesmo tempo? É uma pergunta real e que tem resposta. Ela é o tema do **Artigo 3 (compromissos)**. Por enquanto, aceite o envelope como mágica e siga em frente.

### O nulificador: a parte realmente engenhosa

Quando você gasta uma note, você publica o seu **nulificador**, o "token de anulação". Esse token é calculado a partir *da própria note* **e** *da sua chave secreta*. Essa receita garante três propriedades ao mesmo tempo, e cada uma delas importa:

1. **Só o dono pode criá-lo.** Você precisa da chave secreta para calculá-lo, então ninguém pode gastar suas notes por você.
2. **É sempre o *mesmo* token para uma determinada note.** Se você tentar gastar a mesma note duas vezes, produzirá o token de anulação *idêntico* nas duas vezes, e a lixeira pública de "gastos" já o contém. Gasto duplo rejeitado. 
3. **Ninguém consegue rastreá-lo até o seu envelope.** O token de anulação parece totalmente sem relação com o envelope de onde veio.

Essa terceira propriedade é o **coração da privacidade do Zcash**, e merece uma seção própria mais adiante.

### A prova de conhecimento zero: a própria cortina

Tudo acontece por trás de uma cortina, e o que você entrega ao mundo depois é uma **prova de conhecimento zero**, uma espécie de certificado impossível de falsificar. Ela atesta silenciosamente tudo isto de uma só vez:

- *o envelope que estou gastando realmente está preso no mural* (é uma note real, que existe),
- *eu realmente tenho permissão para abri-lo* (tenho a chave certa),
- *meu token de anulação foi calculado corretamente* (sem trapacear na verificação de gasto duplo),
- *meus novos envelopes contêm exatamente a mesma quantia que o antigo*: **nenhum dinheiro criado do nada.**

O milagre é que a prova **não** revela nenhum desses fatos. Nem o valor, nem os endereços, nem qual envelope. Ela apenas convence você de que *cada afirmação acima é verdadeira*. Como isso é sequer possível é o tema do **Artigo 5 (provas de conhecimento zero)**, o ponto alto da série.

---

## 6. A vida de uma única note

Uma note *nasce*, *vive* no mural e, em algum momento, *morre*, e, o que é crucial, seu nascimento e sua morte parecem não ter relação para quem está observando.

![alt text](/content-images/image-2-0eca0ea4f7.webp)

---

## 7. Um pagamento, do início ao fim

Vamos ver a Alice pagar o Bob, com cada etapa pública e privada identificada.

![alt text](/content-images/image-4-7af0dfe795.webp)

Repare na assimetria que faz a privacidade funcionar:

- **A note antiga da Alice** morre por meio de um *nulificador* na lixeira de gastos.
- **A note nova do Bob** nasce por meio de um *compromisso* novo no mural.
- Para todos que estão observando, esses dois eventos **não têm nenhuma ligação visível.** O rastro do dinheiro esfria.

> **Como o Bob sabe que foi pago?** A note dele é criptografada *para a chave dele*. Ele examina o mural continuamente e só os envelopes *dele* se abrem para ele, como ter a única chave que serve em um conjunto específico de fechaduras. O mecanismo por trás disso são as **chaves de visualização**, um tema para depois.

---

## 8. O que o mundo vê e o que permanece oculto

| Fato sobre o pagamento | Visível para o público? |
|---|---|
| Que *uma* transação blindada aconteceu |  Sim |
| Que ela obedeceu a todas as regras (sem falsificação, sem gasto duplo) |  Sim (por meio da prova) |
| **Quem** enviou o dinheiro |  Oculto |
| **Quem** o recebeu |  Oculto |
| **Quanto** foi enviado |  Oculto |
| **Qual** note anterior foi gasta |  Oculto |

Esta é a solução do paradoxo da Seção 1. O público verifica as *regras*, não o *conteúdo*. Verificação e privacidade param de brigar, porque a prova de conhecimento zero permite checar a primeira sem tocar na segunda.

---

## 9. O coração da questão: por que o envelope e o token de anulação não podem ser ligados

Se você entender esta única ideia, vai entender por que o Zcash é privado. Leia devagar.

- Um **envelope (compromisso)** é preso no mural quando uma note **nasce**.
- Um **token de anulação (nulificador)** é jogado na lixeira quando essa mesma note é **gasta**, possivelmente meses depois.
- Eles são produzidos por **receitas secretas diferentes**, e **não existe nenhuma matemática pública** que transforme um no outro.

Então, um observador externo vê um fluxo de envelopes aparecendo e um fluxo de tokens de anulação aparecendo, mas **não consegue fazer a correspondência entre eles**. Ele não pode dizer "o token de anulação jogado hoje corresponde ao envelope preso em março passado". A ligação existe *apenas* no conhecimento secreto do dono da note, e a prova de conhecimento zero confirma que a ligação é válida *sem revelá-la.*

Essa ligação rompida é exatamente aquilo de que as empresas de análise de chain se alimentam no Bitcoin, e aquilo que o Zcash corta deliberadamente.

> **Teste sua intuição:** Se os nulificadores fossem calculados *apenas* a partir da note (sem envolver nenhuma chave secreta), qual das três propriedades da Seção 5 deixaria de valer, e por que isso destruiria silenciosamente a privacidade? *(Resposta no final.)*

---

## 10. Um aviso honesto

Este é um **modelo mental**, não a especificação. Para manter o texto acessível a iniciantes, simplificamos discretamente várias coisas reais: o Zcash já teve vários designs blindados (Sprout, depois Sapling, agora Orchard); transações reais podem gastar e criar *várias* notes de uma vez; "o mural" é tecnicamente um tipo específico de árvore, não um quadro de avisos literal; e o equilíbrio de valores é garantido com uma contabilidade criptográfica adicional. Nenhum desses detalhes muda a história que você acabou de aprender; eles a refinam. Vamos acrescentar a precisão de volta, um artigo de cada vez, e sinalizar claramente sempre que fizermos isso.

Um bom conteúdo educacional ganha confiança dizendo o que deixou de fora. Esta seção é essa promessa.

---

## 11. Os fios que deixamos soltos (seu mapa da série)

Cada "voltaremos a isso" acima é um fio. Veja onde cada um deles é amarrado:

![alt text](/content-images/image-29-27ef4636ff.webp)

| Ponta solta deste artigo | Onde é resolvida |
|---|---|
| Como um envelope lacrado pode ser ao mesmo tempo oculto *e* impossível de falsificar? | Artigo 3: compromissos |
| De onde vêm as chaves e as receitas secretas? | Artigos 1 e 2: corpos e curvas |
| O que *é* exatamente "o mural"? | Artigo 4: árvores de Merkle |
| Como você pode provar algo sem revelar nada? | Artigo 5: provas de conhecimento zero |
| Como as cinco peças se encaixam no Zcash real? | Artigo 6: o protocolo blindado |

---

## 12. Resumo

- O Bitcoin é **transparente**; o Zcash oferece um mundo **blindado** em que o remetente, o destinatário e o valor ficam ocultos.
- O aparente paradoxo (*privado e, ainda assim, verificável publicamente*) é justamente o ponto central, e ele tem solução.
- Um pagamento blindado é formado por cinco peças interligadas: uma **note** (a moeda), um **compromisso da note** (o envelope lacrado), a **árvore de compromissos de notes** (o mural público), um **nulificador** (o token de anulação que impede gastos duplos) e uma **prova de conhecimento zero** (a cortina que prova a validade sem revelar nada).
- A privacidade se apoia, no fim das contas, em **uma única ligação rompida**: ninguém de fora consegue conectar o nascimento de uma note (compromisso) à sua morte (nulificador).
- O público verifica as **regras**, nunca o **conteúdo**.

Agora você tem o mapa. O restante da série vai preenchê-lo.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Note** | Uma unidade privada de valor, o equivalente no Zcash a uma moeda ou cédula |
| **Note commitment** | Um lacre criptográfico que prova que uma note existe sem revelá-la |
| **Note commitment tree** | O registro público, que só aceita acréscimos, de todos os compromissos de notes |
| **Nullifier** | Um marcador único de "gasto" publicado quando uma note é usada, impedindo gastos duplos |
| **Zero-knowledge proof** | Uma prova de que uma afirmação é verdadeira sem revelar nada além da sua veracidade |
| **Shielding / deshielding** | Mover fundos para dentro / para fora do mundo blindado privado |
| **Viewing Key** | A chave que permite ao dono detectar e ler as notes endereçadas a ele |

---

## Perguntas frequentes

**O Zcash é sempre privado?**
Não. A privacidade se aplica ao mundo *blindado* (endereços `z...`/`u...`). As transações transparentes (`t...`) são públicas, como no Bitcoin.

**Se tudo está oculto, o que impede alguém de imprimir dinheiro de graça?**
A prova de conhecimento zero. Ela obriga matematicamente que as saídas de cada transação sejam lastreadas por entradas reais e não gastas, *ao mesmo tempo* em que mantém os valores em segredo.

**A mesma note pode ser gasta duas vezes?**
Não. Gastar uma note publica o seu nulificador; uma segunda tentativa publicaria o nulificador idêntico, que já está na lixeira de "gastos", então a rede a rejeita.

**Pessoas de fora conseguem ligar um remetente a um destinatário?**
Não. O compromisso (o nascimento da note) e o nulificador (a morte da note) não podem ser associados por ninguém sem o conhecimento secreto do dono.

---

### Resposta ao teste de intuição (Seção 9)

Se o nulificador fosse calculado *apenas* a partir da note, sem nenhuma chave secreta, então **qualquer pessoa** poderia calculá-lo, quebrando a propriedade nº 1 (só o dono pode gastar). Pior ainda, o nulificador passaria a poder ser derivado diretamente de informações públicas sobre a note, o que poderia permitir que observadores **ligassem o nulificador ao seu compromisso**, quebrando a propriedade nº 3 e desfazendo silenciosamente a privacidade de todo o sistema. É a chave secreta que torna o token de anulação ao mesmo tempo *exclusivamente seu* e *não vinculável.*

---

### O que vem a seguir

**Artigo 1 . Corpos finitos:** o estranho e belo sistema numérico em que a aritmética "dá a volta", e o motivo pelo qual toda a criptografia desta série vive ali. Começaremos, como sempre, pela intuição, sem fórmulas até que elas sejam merecidas.

*Parte da série* Zcash a partir dos primeiros princípios *para [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
