# Como uma Transação Shielded de Zcash Realmente Funciona
##### Pesquisa original de [Annkkitaaa](https://github.com/Annkkitaaa)

![texto alternativo](image.png)

### A intuição antes da matemática: uma explicação sem fórmulas sobre pagamentos privados

> **Série:** *Zcash from First Principles* . **Artigo 0 . A Âncora**
> **Público:** iniciantes completos. Nenhum conhecimento de criptografia, blockchain ou matemática é necessário.
> **O que você vai levar daqui:** um modelo mental correto de como Zcash oculta *quem pagou quem, e quanto*, ao mesmo tempo em que permite que o mundo inteiro verifique que nenhum dinheiro foi forjado ou gasto duas vezes.

Cada artigo posterior desta série amplia uma parte da máquina que você está prestes a conhecer. Então, se uma palavra aqui parecer vaga, *ótimo*. Isso é uma promessa de que voltaremos a ela e a explicaremos corretamente.

---

## 1. Por que você deveria se importar?

Imagine se o seu extrato bancário fosse pregado numa parede na praça da cidade. Para sempre. Qualquer pessoa (seu senhorio, seu empregador, um estranho, um futuro empregador, um governo) poderia ler cada pagamento de aluguel, cada conta médica, cada doação, cada café, e rastrear exatamente para quem você enviou dinheiro e quem enviou dinheiro para você.

Isso não é uma hipótese distópica. **É aproximadamente assim que o Bitcoin funciona.**

Bitcoin é frequentemente chamado de "anônimo", mas não é. Ele é *pseudônimo*: seu nome não está no registro, mas cada transação, valor e vínculo entre endereços é público e permanente. Todo o campo de "análise de cadeia" existe para desfazer esse pseudônimo frágil e vincular endereços a pessoas reais. Assim que um dos seus endereços é ligado a você, seu histórico financeiro se desenrola.

Zcash foi criado para responder a uma pergunta enganosamente difícil:

> **Podemos ter dinheiro que seja completamente privado, ocultando remetente, destinatário e valor, e ainda assim permitindo que qualquer pessoa verifique que as regras foram seguidas?**

Esses dois objetivos entram em conflito. Um registro público é verificável *porque* todos podem vê-lo. Privacidade significa que ninguém pode vê-lo. Então, como o público pode verificar algo que não tem permissão para observar?

Resolver esse paradoxo é toda a história desta série. Vamos começar.

---

## 2. Existem dois mundos dentro de Zcash

Antes de qualquer coisa, vamos esclarecer um equívoco comum: **Zcash não é "a moeda privada". É uma moeda que oferece privacidade como opção.** Na verdade, ela começou como um fork do Bitcoin e carrega dois sistemas paralelos na mesma blockchain.

| | **Mundo transparente** | **Mundo shielded** |
|---|---|---|
| Privacidade | Público, como o Bitcoin | Privado |
| Os endereços começam com | `t...` | `z...` ou `u...` |
| Remetente / destinatário / valor | **Visível** para todos | **Oculto** para todos |
| Tecnologia subjacente | Registro público no estilo do Bitcoin | Compromissos criptográficos + provas de conhecimento zero |

O dinheiro pode até atravessar a fronteira entre eles: mover fundos *para dentro* do mundo shielded é chamado de *shielding*, e movê-los de volta para fora é chamado de *deshielding*.

O mundo transparente é "o Bitcoin que você já entende mais ou menos". É o **mundo shielded** que contém toda a bela criptografia, e é o único mundo com o qual esta série se importa.

![texto alternativo](image-1.png)

---

## 3. A intuição: envelopes lacrados num quadro público

Aqui está a única imagem mental que você deve carregar pelo resto do artigo. Voltaremos a ela o tempo todo.

Imagine um enorme **quadro de avisos público** que todos na Terra podem ver o tempo todo.

* **Receber dinheiro** significa que alguém prende um **envelope lacrado e opaco** no quadro. Dentro do envelope está *quanto dinheiro ele contém* e *um segredo que somente o destinatário pode ler*, porque o envelope está trancado com a chave pessoal desse destinatário. O mundo inteiro vê que *um envelope apareceu*. Ninguém além do dono pode ver o que está dentro.

* **O quadro só cresce.** Os envelopes nunca são arrancados nem apagados. Novos envelopes são fixados por cima, para sempre.

* **Gastar dinheiro** significa entrar atrás de uma cortina, provar *"eu possuo um dos envelopes não gastos deste quadro, e tenho permissão para abri-lo"*, depois deixar um **token de anulação** único numa caixa pública de "gastos" e prender **novos envelopes** para quem você está pagando.

Esse pequeno ritual (prender um token de anulação, prender novos envelopes, tudo por trás de uma cortina) *é* um pagamento em Zcash. Todo o resto são detalhes.

Agora vamos dar a esses elementos seus nomes reais.

---

## 4. Os cinco substantivos

Estes cinco termos são todo o vocabulário do Zcash shielded. Aprenda-os como uma *história*, não como um glossário, e eles vão fixar.

| Na história | Termo real em Zcash | O que realmente é |
|---|---|---|
| O conteúdo do envelope (valor + dono + um segredo) | **Note** | A "moeda" privada: uma porção de valor pertencente a alguém |
| O envelope lacrado e opaco no quadro | **Note commitment** | Um selo criptográfico que prova que um envelope existe enquanto oculta o que há dentro |
| O próprio quadro de avisos | **Note commitment tree** | Um registro anexável apenas no fim de *cada note já criada* |
| O token de anulação na caixa de "gastos" | **Nullifier** | Um marcador único que significa "esta note já foi gasta" |
| A mágica "por trás da cortina" | **Zero-knowledge proof** | Uma prova de que todo o gasto é válido, sem revelar nada dele |

Se você não se lembrar de mais nada deste artigo, lembre-se desta tabela. Tudo o que vem a seguir é apenas o *porquê* de cada peça precisar ter o formato que tem.

---

## 5. Por que cada peça tem o formato que tem

Esta é a parte que a maioria das explicações pula, e é exatamente a parte que separa "memorizei algumas palavras" de "entendo o design". Cada uma das cinco peças existe para resolver **um problema específico.**

### O note commitment: ocultar o conteúdo, mas tornar a falsificação impossível

Um envelope comum pode ser aberto com vapor. Um **note commitment** criptográfico não pode. Pense nele como um envelope *magicamente* lacrado, totalmente opaco, com dois superpoderes:

- **Ocultação**: olhar para o envelope lacrado não diz *nada* sobre o valor ou o dono que estão dentro.
- **Vinculação**: uma vez lacrado, o conteúdo não pode ser trocado. Você não pode depois afirmar que o envelope continha outro valor.

Como um selo pode fazer as duas coisas ao mesmo tempo? Essa é uma pergunta real e respondível. Esse é o tema do **Artigo 3 (commitments)**. Por enquanto, aceite o envelope como mágico e siga em frente.

### O nullifier: a parte genuinamente engenhosa

Quando você gasta uma note, você publica seu **nullifier**, o "token de anulação". Esse token é calculado a partir *da própria note* **e** *da sua chave secreta*. Essa receita compra três propriedades ao mesmo tempo, e cada uma importa:

1. **Somente o dono pode criá-lo.** Você precisa da chave secreta para calculá-lo, então ninguém pode gastar suas notes por você.
2. **Ele é sempre o *mesmo* token para uma determinada note.** Tente gastar a mesma note duas vezes e você produzirá o *mesmo* token de anulação nas duas vezes, e a caixa pública de "gastos" já o conterá. Gasto duplo rejeitado.
3. **Ninguém consegue rastreá-lo de volta ao seu envelope.** O token de anulação parece completamente sem relação com o envelope de onde veio.

Essa terceira propriedade é o **coração da privacidade de Zcash**, e merece sua própria seção abaixo.

### A zero-knowledge proof: a própria cortina

Tudo acontece atrás de uma cortina, e o que você entrega ao mundo depois é uma **zero-knowledge proof**, um tipo de certificado impossível de falsificar. Ela atesta silenciosamente tudo isso de uma vez:

- *o envelope que estou gastando realmente está preso ao quadro* (é uma note real, existente),
- *eu realmente tenho permissão para abri-lo* (eu possuo a chave correta),
- *meu token de anulação foi calculado corretamente* (sem trapacear na verificação de gasto duplo),
- *meus novos envelopes contêm exatamente a mesma quantidade de dinheiro que o antigo*: **nenhum dinheiro foi criado do nada.**

O milagre é que a prova não revela **nenhum** desses fatos. Nem o valor, nem os endereços, nem qual envelope é. Ela apenas convence você de que *cada afirmação acima é verdadeira*. Como isso é sequer possível é o tema do **Artigo 5 (zero-knowledge proofs)**, o clímax da série.

---

## 6. A vida de uma única note

Uma note *nasce*, *vive* no quadro e, eventualmente, *morre* e, crucialmente, seu nascimento e sua morte parecem não ter relação para qualquer observador.

![texto alternativo](image-2.png)

---

## 7. Um pagamento, do início ao fim

Vamos observar Alice pagar Bob, com cada passo público e privado rotulado.

![texto alternativo](image-4.png)

Observe a assimetria que faz a privacidade funcionar:

- **A antiga note de Alice** morre por meio de um *nullifier* na caixa de gastos.
- **A nova note de Bob** nasce por meio de um novo *commitment* no quadro.
- Para todos que observam, esses dois eventos não têm **nenhuma conexão visível.** O rastro do dinheiro esfria.

> **Como Bob sequer sabe que foi pago?** A note dele é criptografada *para a chave dele*. Ele examina continuamente o quadro e apenas os envelopes *dele* se abrem para ele, como se tivesse a única chave que serve para um conjunto específico de fechaduras. O mecanismo por trás disso são as **viewing keys**, um tópico posterior.

---

## 8. O que o mundo vê vs. o que permanece oculto

| Fato sobre o pagamento | Visível ao público? |
|---|---|
| Que ocorreu *uma* transação shielded |  Sim |
| Que ela obedeceu a todas as regras (sem falsificação, sem gasto duplo) |  Sim (por meio da prova) |
| **Quem** enviou o dinheiro |  Oculto |
| **Quem** o recebeu |  Oculto |
| **Quanto** foi enviado |  Oculto |
| **Qual** note anterior foi gasta |  Oculto |

Esta é a resolução do paradoxo da Seção 1. O público verifica as *regras*, não o *conteúdo*. Verificação e privacidade deixam de brigar, porque a zero-knowledge proof permite verificar a primeira sem tocar no segundo.

---

## 9. O coração da questão: por que o envelope e o token de anulação não podem ser ligados

Se você entender esta única ideia, você entende por que Zcash é privado. Leia devagar.

- Um **envelope (commitment)** é preso ao quadro quando uma note **nasce**.
- Um **token de anulação (nullifier)** é deixado na caixa quando essa mesma note é **gasta**, possivelmente meses depois.
- Eles são produzidos por **receitas secretas diferentes**, e não existe **nenhuma matemática pública** que transforme um no outro.

Assim, um observador externo vê um fluxo de envelopes aparecendo e um fluxo de tokens de anulação aparecendo, mas **não consegue associá-los**. Ele não pode dizer "o token de anulação descartado hoje corresponde ao envelope preso em março passado". O vínculo existe *somente* dentro do conhecimento secreto do dono da note, e a zero-knowledge proof confirma que esse vínculo é válido *sem revelá-lo.*

Esse vínculo quebrado é aquilo de que as empresas de análise de cadeia se alimentam no Bitcoin, e aquilo que Zcash deliberadamente corta.

> **Teste sua intuição:** Se os nullifiers fossem calculados *apenas* a partir da note (sem nenhuma chave secreta envolvida), qual das três propriedades da Seção 5 deixaria de valer, e por que isso destruiria silenciosamente a privacidade? *(Resposta no final.)*

---

## 10. Um aviso honesto

Este é um **modelo mental**, não a especificação. Para mantê-lo amigável para iniciantes, simplificamos silenciosamente várias coisas reais: Zcash teve múltiplos designs shielded (Sprout, depois Sapling, agora Orchard); transações reais podem gastar e criar *várias* notes de uma só vez; "o quadro" é tecnicamente um tipo específico de árvore, não um mural literal; e o balanceamento de valor é imposto com alguma contabilidade criptográfica adicional. Nenhum desses detalhes muda a história que você acabou de aprender; eles a refinam. Vamos adicionar a precisão de volta, um artigo de cada vez, e sinalizar claramente sempre que fizermos isso.

Um bom conteúdo educacional conquista confiança ao dizer o que deixou de fora. Esta seção é essa promessa.

---

## 11. Os laços que abrimos (seu mapa da série)

Cada "voltaremos a isso" acima é um fio. Aqui está onde cada um deles é amarrado:

![texto alternativo](image-29.png)

| Ponta solta deste artigo | Onde ela é resolvida |
|---|---|
| Como um envelope lacrado pode ao mesmo tempo ocultar *e* ser infalsificável? | Artigo 3: commitments |
| De onde vêm as chaves e as receitas secretas? | Artigos 1 e 2: campos e curvas |
| O que *é* "o quadro", exatamente? | Artigo 4: árvores de Merkle |
| Como você pode provar algo sem revelar nada? | Artigo 5: zero-knowledge proofs |
| Como as cinco peças se encaixam no Zcash real? | Artigo 6: o protocolo shielded |

---

## 12. Resumo

- Bitcoin é **transparente**; Zcash oferece um mundo **shielded** em que remetente, destinatário e valor ficam ocultos.
- O aparente paradoxo (*privado, mas publicamente verificável*) é todo o ponto, e ele pode ser resolvido.
- Um pagamento shielded é composto de cinco peças interligadas: uma **note** (a moeda), um **note commitment** (o envelope lacrado), a **note commitment tree** (o quadro público), um **nullifier** (o token de anulação que impede gastos duplos) e uma **zero-knowledge proof** (a cortina que prova validade sem revelar nada).
- A privacidade, em última instância, repousa sobre **um vínculo rompido**: ninguém de fora consegue conectar o nascimento de uma note (commitment) à sua morte (nullifier).
- O público verifica as **regras**, nunca o **conteúdo**.

Agora você tem o mapa. O restante da série o preenche.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Note** | Uma unidade privada de valor, o equivalente em Zcash a uma moeda ou cédula |
| **Note commitment** | Um selo criptográfico que prova que uma note existe sem revelá-la |
| **Note commitment tree** | O registro público anexável apenas no fim de todos os note commitments |
| **Nullifier** | Um marcador único de "gasto" publicado quando uma note é usada, impedindo gastos duplos |
| **Zero-knowledge proof** | Uma prova de que uma afirmação é verdadeira sem revelar nada além de sua veracidade |
| **Shielding / deshielding** | Mover fundos para dentro / para fora do mundo privado shielded |
| **Viewing key** | A chave que permite ao dono detectar e ler notes endereçadas a ele |

---

## FAQ

**Zcash é sempre privado?**
Não. A privacidade se aplica ao mundo *shielded* (endereços `z...`/`u...`). As transações transparentes (`t...`) são públicas, como no Bitcoin.

**Se tudo está oculto, o que impede alguém de imprimir dinheiro de graça?**
A zero-knowledge proof. Ela força matematicamente que as saídas de cada transação sejam respaldadas por entradas reais e não gastas, *enquanto* mantém os valores em segredo.

**A mesma note pode ser gasta duas vezes?**
Não. Gastar uma note publica seu nullifier; uma segunda tentativa publicaria o nullifier idêntico, que já está na caixa de "gastos", então a rede a rejeita.

**Pessoas de fora podem ligar um remetente a um destinatário?**
Não. O commitment (nascimento da note) e o nullifier (morte da note) não podem ser associados por ninguém sem o conhecimento secreto do dono.

---

### Resposta ao teste de intuição (Seção 9)

Se o nullifier fosse calculado *apenas* a partir da note, sem nenhuma chave secreta, então **qualquer um** poderia calculá-lo, quebrando a propriedade #1 (somente o dono pode gastar). Pior ainda, o nullifier passaria a ser derivável diretamente de informações públicas sobre a note, o que poderia permitir que observadores **ligassem o nullifier de volta ao seu commitment**, quebrando a propriedade #3 e desfazendo silenciosamente a privacidade de todo o sistema. A chave secreta é o que torna o token de anulação ao mesmo tempo *exclusivamente seu* e *não associável.*

---

### O que vem a seguir

**Artigo 1 . Campos finitos:** o estranho e belo sistema numérico em que a aritmética "dá a volta", e a razão pela qual cada peça da criptografia desta série vive ali. Vamos começar, como sempre, com intuição; sem fórmulas até que elas sejam merecidas.

*Parte da série* Zcash from First Principles *para [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
