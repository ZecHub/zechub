# O protocolo blindado, de ponta a ponta
##### Pesquisa original de [Annkkitaaa](https://github.com/Annkkitaaa)

![Texto alternativo](/content-images/image-27-4094293ec0.webp)

### Montando cada peça em uma única transação privada do Zcash

> **Série:** *Zcash from First Principles* . **Artigo 6 . O protocolo blindado** (final)
> **Público:** iniciantes que leram os Artigos 0 a 5. É aqui que tudo se conecta.
> **O que você vai levar:** um modelo mental completo e correto de uma transação blindada do Zcash, com cada conceito da série em seu devido lugar e cada ciclo do Artigo 0 fechado.

Começamos, no [Artigo 0](article-0-shielded-transaction.md), com um paradoxo e uma história sobre envelopes lacrados em um quadro público. Depois passamos cinco artigos construindo as partes: corpos finitos, curvas elípticas, compromissos, árvores de Merkle e provas de conhecimento zero. Agora vamos juntá-las e observar um pagamento privado real funcionando, do início ao fim.

---

## 1. Por que isso importa?

Individualmente, cada peça que você aprendeu é engenhosa. Mas a *mágica* do Zcash está em como elas se encaixam. Um nulificador sozinho não oferece privacidade. Um compromisso sozinho não impede falsificação. Uma prova sozinha não prova nada útil. É a **montagem** que transforma cinco componentes em dinheiro que é ao mesmo tempo privado e confiável.

Este artigo é essa montagem. Ao final, a frase *"a rede verifica uma transação que ela não consegue ver"* vai parecer não um paradoxo, mas uma consequência óbvia de partes que você já entende.

---

## 2. O elenco, remontado

Aqui está a série inteira em uma página, mapeada da história do Artigo 0 para o mecanismo real.

| Elemento da história do Artigo 0 | Componente real | Construído a partir de |
|---|---|---|
| O dinheiro dentro de um envelope | **Note** (valor, destinatário, aleatoriedade) | codificado como elementos de corpo (Art 1) |
| O envelope opaco e lacrado | **Compromisso de note** | compromisso de Pedersen / Sinsemilla (Art 2, 3) |
| O quadro público | **Árvore de compromissos de note** (`anchor` = sua raiz) | árvore de Merkle incremental (Art 4) |
| O token do vazio | **Nulificador** | um hash compatível com ZK de note + chave secreta (Art 2, 3) |
| "dinheiro que entra é igual ao dinheiro que sai" | **Compromissos de valor + verificação de saldo** | compromissos homomórficos de Pedersen (Art 2, 3) |
| A mágica por trás da cortina | **Prova de conhecimento zero** | zk-SNARK sobre um circuito aritmético (Art 5) |
| "Só você pode ler seu envelope" | **Note criptografada + chaves de visualização** | criptografia + hierarquia de chaves (este artigo) |

---

## 3. De onde vêm as chaves

Tudo o que um usuário pode fazer flui de um único segredo, a **chave de gastos**, por meio de uma hierarquia unidirecional (cada seta é uma derivação irreversível, cortesia dos alçapões dos Artigos 2 e 3):

![Texto alternativo](/content-images/image-32-f443f9bb72.webp)

Duas coisas que vale a pena notar, ambas consequências dos artigos anteriores:

- A divisão permite que você distribua uma **chave de visualização** (por exemplo, para um auditor) que revela suas transações **sem** conceder o poder de gastar. A privacidade é seletiva, não tudo ou nada.
- Cada derivação é **unidirecional**: possuir uma chave de visualização nunca permite que alguém recupere a chave de gastos, exatamente o alçapão da curva elíptica do Artigo 2 fazendo seu trabalho.

---

## 4. Gastando uma note: as quatro alegações

Para gastar uma note de forma privada, você precisa convencer a rede de quatro coisas ao mesmo tempo **sem revelar a note, seu valor, sua posição ou sua identidade.** Cada alegação é satisfeita por um componente que você já conhece.

![Texto alternativo](/content-images/image-31-86309af194.webp)

A prova não revela **nenhum** dos fatos subjacentes (qual note, de qual chave, qual valor). Ela revela apenas que *as quatro alegações são verdadeiras.* Esse é todo o truque do Zcash blindado, expresso em um único diagrama.

---

## 5. O truque do saldo de valor (a recompensa que guardamos)

Nos Artigos 2 e 3 observamos que compromissos de Pedersen **se somam**: o compromisso para `v_1` mais o compromisso para `v_2` é um compromisso para `v_1 + v_2`. É aqui que isso compensa.

Cada note de entrada e saída carrega um **compromisso de valor**: um compromisso de Pedersen `v.G + r.H` que oculta seu valor `v`. Como eles se somam, a rede pode calcular:

```
(sum of input value commitments) − (sum of output value commitments)
```

Se a transação estiver balanceada (nenhum dinheiro criado ou destruído), as partes `v` se cancelam exatamente, restando apenas um compromisso de **valor zero**, ofuscado pela aleatoriedade remanescente. O remetente prova que conhece essa aleatoriedade remanescente produzindo uma pequena assinatura chamada **assinatura de vinculação.** Uma assinatura de vinculação válida só é possível quando os valores realmente se equilibram, **e ainda assim nem um único valor foi revelado.**

> Esta é a ilustração mais clara de toda a série do *porquê* de precisarmos de compromissos homomórficos baseados em curvas. A regra "dinheiro que entra é igual ao dinheiro que sai" é aplicada **somando envelopes lacrados** e verificando se o resultado é lacrado em zero.

---

## 6. Uma transação completa, observada de ponta a ponta

Vamos montar Alice pagando Bob. Usaremos a estrutura clara de Sapling de "lado de gasto / lado de saída" como modelo didático.

**Uma transação blindada agrupa dois tipos de descrições:**

| Descrição de gasto (consome uma note) | Descrição de saída (cria uma note) |
|---|---|
| compromisso de valor da entrada | compromisso de valor da saída |
| o **anchor** contra o qual ela prova (uma raiz da árvore) | o novo **compromisso de note** (uma nova folha) |
| o **nulificador** da note gasta | uma **ephemeral key** para criptografia |
| uma chave pública rerandomizada + assinatura de autorização de gasto | a **note criptografada** (ciphertext para o destinatário) |
| o **zk-SNARK** que prova as quatro alegações | um **zk-SNARK** que prova que a saída está bem formada |

Além de uma **assinatura de vinculação** sobre o pacote inteiro, impondo o saldo de valor (Seção 5).

![Texto alternativo](/content-images/image-30-98511eb2d0.webp)

Acompanhe a privacidade: a rede verificou o anchor, verificou que o nulificador era novo, verificou a prova e verificou o saldo. Ela aceitou um pagamento válido **sem ter aprendido nenhum valor, nenhum endereço e nem qual note foi gasta.** Enquanto isso, o **nulificador** da note gasta (sua morte) e o novo **compromisso** de Bob (o nascimento da note dele) ficam em duas estruturas públicas diferentes sem ligação visível entre eles, o elo rompido do Artigo 0.

---

## 7. Fechando cada ciclo do Artigo 0

O Artigo 0 abriu deliberadamente várias perguntas. Aqui estão todas elas, fechadas.

| Ciclo aberto no Artigo 0 | Fechado por |
|---|---|
| Como um envelope lacrado, mas impossível de falsificar, é possível? | Compromissos: ocultação pela aleatoriedade, vínculo pela resistência a colisões / pelo alçapão da curva (Art 3) |
| De onde vêm as chaves e as receitas secretas? | Aritmética em corpos e multiplicação escalar em curvas elípticas (Art 1, 2) |
| O que exatamente é "o quadro"? | Uma árvore de Merkle incremental de compromissos de note; sua raiz é o anchor (Art 4) |
| Por que o token do vazio não pode ser ligado ao seu envelope? | O nulificador é um hash com chave mantido em um conjunto separado dos compromissos (Art 2, 3, 4) |
| Como você prova validade sem revelar nada? | Um zk-SNARK sobre um circuito aritmético que codifica as quatro alegações (Art 5) |
| Como o destinatário descobre que foi pago? | A note é criptografada para o endereço dele; ele faz descriptografia de teste com uma chave de visualização (este artigo) |
| Como "dinheiro que entra = dinheiro que sai" é imposto de forma privada? | Compromissos de valor homomórficos + a assinatura de vinculação (Seç 5) |

O paradoxo da primeira página, *verificar o que você não consegue ver*, agora está completamente dissolvido. A rede verifica **alegações sobre dados ocultos**, nunca os próprios dados.

---

## 8. Sapling vs Orchard, em uma frase

Ensinamos com a estrutura de Sapling porque sua divisão é a mais clara. O design atual, **Orchard**, refina em vez de substituir essas ideias:

| | **Sapling** | **Orchard** |
|---|---|---|
| Unidade de transação | descrições separadas de **Spend** e **Output** | **Actions** unificadas (cada uma faz um gasto + uma saída) |
| Sistema de prova | **Groth16** (configuração confiável) | **Halo 2** (sem configuração confiável) |
| Curvas | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Hash de compromisso | Pedersen | Sinsemilla |

Todo conceito deste artigo se aplica diretamente; Orchard principalmente agrupa gasto e saída e troca por um sistema de prova sem cerimônia. Os cinco pilares permanecem inalterados.

---

## 9. Um aviso honesto

Esta é a imagem mais completa da série, mas ainda é um modelo. Nós comprimimos as codificações exatas em corpo de uma note, as fórmulas precisas de derivação de chaves, a rerandomização das chaves de gastos, endereços diversificados, campos de memorando, tratamento de taxas, a diferença entre compromissos de valor e compromissos de note em todos os detalhes e o papel preciso de cada assinatura. Também apresentamos um fluxo canônico; transações reais podem carregar muitos gastos e saídas ao mesmo tempo e podem misturar partes transparentes e blindadas. A fonte autorizada é a Especificação do Protocolo Zcash. O que você agora tem é a forma correta; a especificação preenche cada medida.

---

## 10. Resumo

- Uma transação blindada entrelaça todos os cinco componentes: uma **note** (o valor), seu **compromisso** na **árvore de compromissos de note**, um **nulificador** para impedir gasto duplo, **compromissos de valor** para o saldo e um **zk-SNARK** ligando tudo isso.
- Gastar prova **quatro alegações ao mesmo tempo**: a note existe, você está autorizado, seu nulificador está correto e o valor se equilibra, em **conhecimento zero**, sem revelar nenhum dos fatos subjacentes.
- O **saldo de valor** é imposto **somando compromissos homomórficos** e verificando se eles lacram em zero, por meio da **assinatura de vinculação**, sem que nenhum valor seja divulgado.
- Os poderes de um usuário fluem de uma única **chave de gastos** por uma **hierarquia unidirecional**, permitindo **chaves de visualização** que revelam sem conceder poder de gasto.
- A rede **verifica alegações sobre dados ocultos**, dissolvendo o paradoxo verificar versus privacidade do Artigo 0. Todo ciclo aberto ali agora está fechado.
- **Orchard** refina **Sapling** (Actions unificadas, Halo 2 sem configuração confiável, curvas Pasta, Sinsemilla) sem mudar os cinco pilares.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Spending key** | O único segredo-raiz do qual derivam todas as chaves de um usuário |
| **Viewing Key** | Revela suas transações a um portador sem permitir que ele gaste |
| **Spend description** | A parte de uma tx que consome uma note (nulificador, anchor, prova) |
| **Output description** | A parte de uma tx que cria uma note (compromisso, ciphertext, prova) |
| **Action (Orchard)** | Uma unidade unificada que faz um gasto e uma saída juntos |
| **Value commitment** | Um compromisso homomórfico de Pedersen para um valor |
| **Binding signature** | A assinatura que prova que os valores se equilibram sem revelá-los |
| **Anchor** | A raiz da árvore contra a qual um gasto prova pertencimento |
| **Trial decryption** | Um destinatário testando novos compromissos para encontrar notes destinadas a ele |

---

## FAQ

**A rede alguma vez vê o valor ou quem pagou a quem?**
Não. Ela verifica a prova, a novidade do nulificador, o anchor e a assinatura de vinculação. Todos os valores privados permanecem ocultos.

**O que me impede de gastar uma note duas vezes?**
O nulificador. Gastar o publica; a rede rejeita qualquer nulificador já presente no conjunto de nulificadores. A mesma note sempre gera o mesmo nulificador.

**Como o saldo pode ser verificado se os valores estão ocultos?**
Compromissos de valor se somam homomorficamente; os compromissos de uma transação balanceada se cancelam em um compromisso de zero, o que a assinatura de vinculação prova.

**Posso provar minhas transações a um auditor sem abrir mão do controle?**
Sim. Entregue uma chave de visualização. Ela revela sua atividade blindada, mas não pode autorizar gastos, graças à hierarquia unidirecional de chaves.

**Sapling está obsoleto agora que Orchard existe?**
Ambos existiram na rede; Orchard é o design atual. Os conceitos são compartilhados, então entender um permite compreender o outro.

---

### Teste sua intuição

Um amigo diz: "Como a prova esconde o valor, um ladrão poderia simplesmente afirmar que suas saídas valem mais do que suas entradas e imprimir dinheiro grátis." Usando a Seção 5, explique em duas frases por que isso falha. *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Os valores estão ocultos, mas cada um é encapsulado em um compromisso de valor homomórfico, e a rede soma todos os compromissos de entrada e subtrai todos os compromissos de saída; se os valores ocultos não se equilibrassem, o resultado não resultaria em zero e **nenhuma assinatura de vinculação válida poderia ser produzida.** O ladrão pode ocultar *quanto*, mas não pode fazer valores desequilibrados passarem na verificação de saldo, então imprimir dinheiro grátis é impossível sem revelar nada e ainda assim ser pego pela aritmética.
</details>

---

### A série completa

Agora você percorreu o caminho de um único paradoxo até um pagamento privado completo:

![Texto alternativo](/content-images/cd8bbb40-57b8-4854-b9cf-97f2485d126a-8847fae521.webp)


A partir daqui, o próximo arco natural vai mais fundo: o funcionamento interno de Groth16 e Halo 2, cerimônias de configuração confiável, os circuitos de Sapling e Orchard em detalhe, derivação de chaves e endereços diversificados e a evolução do protocolo ao longo das atualizações da rede. Mas a fundação agora está no lugar, e cada um desses tópicos já tem uma base à qual se conectar.

*Parte da série* Zcash from First Principles *para [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
