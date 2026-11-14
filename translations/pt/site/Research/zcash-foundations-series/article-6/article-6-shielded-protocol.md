# O protocolo blindado, de ponta a ponta
##### Pesquisa original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-27-4094293ec0.webp)

### Montando todas as peças em uma transação Zcash privada

> **Série:** *Zcash a partir dos primeiros princípios* . **Artigo 6 . O protocolo blindado** (final)
> **Público:** iniciantes que leram os Artigos 0 a 5. É aqui que tudo se conecta.
> **O que você vai levar daqui:** um modelo mental completo e correto de uma transação Zcash blindada, com cada conceito da série no seu devido lugar e cada questão do Artigo 0 respondida.

Começamos, no [Artigo 0](article-0-shielded-transaction.md), com um paradoxo e uma história sobre envelopes lacrados em um quadro público. Depois, passamos cinco artigos construindo as partes: corpos finitos, curvas elípticas, compromissos, árvores de Merkle e provas de conhecimento zero. Agora vamos juntar tudo e ver um pagamento privado real funcionar, do início ao fim.

---

## 1. Por que você deveria se importar?

Individualmente, cada peça que você aprendeu é engenhosa. Mas a *mágica* do Zcash está na forma como elas se encaixam. Um nulificador sozinho não oferece privacidade. Um compromisso sozinho não impede falsificações. Uma prova sozinha não prova nada de útil. É a **montagem** que transforma cinco componentes em dinheiro que é, ao mesmo tempo, privado e confiável.

Este artigo é a montagem. Ao final, a frase *"a rede verifica uma transação que não consegue ver"* não vai parecer um paradoxo, e sim uma consequência óbvia de partes que você já entende.

---

## 2. O elenco, reunido

Aqui está a série inteira em uma única página, mapeada da história do Artigo 0 para o mecanismo real.

| Elemento da história do Artigo 0 | Componente real | Construído a partir de |
|---|---|---|
| O dinheiro dentro de um envelope | **Note** (valor, destinatário, aleatoriedade) | codificada como elementos de corpo (Art 1) |
| O envelope lacrado e opaco | **Compromisso de note** | compromisso Pedersen / Sinsemilla (Art 2, 3) |
| O quadro público | **Árvore de compromissos de notes** (âncora = sua raiz) | árvore Merkle incremental (Art 4) |
| O token de anulação | **Nulificador** | um hash amigável a ZK da note + chave secreta (Art 2, 3) |
| "Dinheiro que entra é igual a dinheiro que sai" | **Compromissos de valor + verificação de saldo** | compromissos Pedersen homomórficos (Art 2, 3) |
| A mágica por trás da cortina | **Prova de conhecimento zero** | zk-SNARK sobre um circuito aritmético (Art 5) |
| "Só você pode ler o seu envelope" | **Note criptografada + chaves de visualização** | criptografia + hierarquia de chaves (este artigo) |

---

## 3. De onde vêm as chaves

Tudo o que um usuário pode fazer deriva de um único segredo, a **chave de gastos**, por meio de uma hierarquia de mão única (cada seta é uma derivação irreversível, graças aos alçapões dos Artigos 2 e 3):

![alt text](/content-images/image-32-f443f9bb72.webp)

Duas coisas merecem atenção, ambas consequências de artigos anteriores:

- A divisão permite que você entregue uma **chave de visualização** (por exemplo, a um auditor) que revela suas transações **sem** conceder o poder de gastar. A privacidade é seletiva, não tudo ou nada.
- Cada derivação é **de mão única**: possuir uma chave de visualização nunca permite que alguém recupere a chave de gastos, exatamente o alçapão da curva elíptica do Artigo 2 fazendo o seu trabalho.

---

## 4. Gastando uma note: as quatro afirmações

Para gastar uma note de forma privada, você precisa convencer a rede de quatro coisas ao mesmo tempo **sem revelar a note, seu valor, sua posição ou sua identidade.** Cada afirmação é satisfeita por um componente que você já conhece.

![alt text](/content-images/image-31-86309af194.webp)

A prova **não** revela nenhum dos fatos subjacentes (qual note, de quem é a chave, qual valor). Ela revela apenas que *as quatro afirmações são verdadeiras.* Esse é todo o truque do Zcash blindado, resumido em um único diagrama.

---

## 5. O truque do equilíbrio de valores (a recompensa que guardamos)

Lá nos Artigos 2 e 3, observamos que os compromissos Pedersen **se somam**: o compromisso com `v_1` mais o compromisso com `v_2` é um compromisso com `v_1 + v_2`. É aqui que isso compensa.

Cada note de entrada e de saída carrega um **compromisso de valor**: um compromisso Pedersen `v.G + r.H` que oculta seu montante `v`. Como eles se somam, a rede pode calcular:

```
(sum of input value commitments) − (sum of output value commitments)
```

Se a transação estiver equilibrada (nenhum dinheiro criado ou destruído), as partes `v` se cancelam exatamente, restando apenas um compromisso com **valor zero**, mascarado pela aleatoriedade restante. O remetente prova que conhece essa aleatoriedade restante produzindo uma pequena assinatura chamada **assinatura de vinculação.** Uma assinatura de vinculação válida só é possível quando os valores realmente se equilibram, **e ainda assim nenhum montante foi revelado.**

> Esta é a ilustração mais clara de toda a série do *porquê* precisávamos de compromissos homomórficos baseados em curvas. A regra "dinheiro que entra é igual a dinheiro que sai" é garantida **somando envelopes lacrados** e verificando se o resultado se lacra em zero.

---

## 6. Uma transação completa, acompanhada de ponta a ponta

Vamos montar a Alice pagando o Bob. Usaremos a estrutura clara de "lado do gasto / lado da saída" do Sapling como modelo didático.

**Uma transação blindada agrupa dois tipos de descrições:**

| Descrição de gasto (consome uma note) | Descrição de saída (cria uma note) |
|---|---|
| compromisso de valor da entrada | compromisso de valor da saída |
| a **âncora** contra a qual ela prova (uma raiz da árvore) | o novo **compromisso de note** (uma nova folha) |
| o **nulificador** da note gasta | uma **chave efêmera** para criptografia |
| uma chave pública re-randomizada + assinatura de autorização de gasto | a **note criptografada** (texto cifrado para o destinatário) |
| a **zk-SNARK** que prova as quatro afirmações | uma **zk-SNARK** que prova que a saída está bem formada |

Além disso, uma **assinatura de vinculação** sobre o pacote inteiro, garantindo o equilíbrio de valores (Seção 5).

![alt text](/content-images/image-30-98511eb2d0.webp)

Acompanhe a privacidade: a rede verificou a âncora, verificou que o nulificador era inédito, verificou a prova e verificou o equilíbrio. Ela aceitou um pagamento válido **sem ter descoberto nenhum montante, nenhum endereço e nem qual note foi gasta.** Enquanto isso, o **nulificador** da note gasta (a sua morte) e o novo **compromisso** do Bob (o nascimento da note dele) ficam em duas estruturas públicas diferentes, sem nenhuma ligação visível entre eles, o elo rompido do Artigo 0.

---

## 7. Respondendo a todas as questões do Artigo 0

O Artigo 0 deixou questões em aberto de propósito. Aqui estão todas elas, respondidas.

| Questão aberta no Artigo 0 | Respondida por |
|---|---|
| Como é possível um envelope lacrado e ao mesmo tempo impossível de falsificar? | Compromissos: ocultação pela aleatoriedade, vinculação pela resistência a colisões / o alçapão da curva (Art 3) |
| De onde vêm as chaves e as receitas secretas? | Aritmética de corpos e multiplicação escalar em curvas elípticas (Art 1, 2) |
| O que exatamente é "o quadro"? | Uma árvore Merkle incremental de compromissos de notes; sua raiz é a âncora (Art 4) |
| Por que o token de anulação não pode ser ligado ao seu envelope? | O nulificador é um hash com chave mantido em um conjunto separado dos compromissos (Art 2, 3, 4) |
| Como você prova a validade sem revelar nada? | Um zk-SNARK sobre um circuito aritmético que codifica as quatro afirmações (Art 5) |
| Como o destinatário descobre que foi pago? | A note é criptografada para o endereço dele; ele faz a descriptografia por tentativa com uma chave de visualização (este artigo) |
| Como "dinheiro que entra = dinheiro que sai" é garantido de forma privada? | Compromissos de valor homomórficos + a assinatura de vinculação (Seç 5) |

O paradoxo da primeira página, *verificar o que você não consegue ver*, agora está totalmente desfeito. A rede verifica **afirmações sobre dados ocultos**, nunca os próprios dados.

---

## 8. Sapling vs Orchard, em poucas palavras

Ensinamos com a estrutura do Sapling porque a divisão dele é a mais clara. O design atual, **Orchard**, refina essas ideias em vez de substituí-las:

| | **Sapling** | **Orchard** |
|---|---|---|
| Unidade de transação | descrições de **Gasto** e de **Saída** separadas | **Ações** unificadas (cada uma faz um gasto + uma saída) |
| Sistema de provas | **Groth16** (configuração confiável) | **Halo 2** (sem configuração confiável) |
| Curvas | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Hash de compromisso | Pedersen | Sinsemilla |

Todos os conceitos deste artigo se aplicam diretamente; o Orchard basicamente agrupa gasto e saída e adota um sistema de provas sem cerimônia. Os cinco pilares continuam os mesmos.

---

## 9. Um aviso honesto

Este é o retrato mais completo da série, mas ainda é um modelo. Simplificamos as codificações exatas de uma note em elementos de corpo, as fórmulas precisas de derivação de chaves, a re-randomização das chaves de gasto, os endereços diversificados, os campos de memorando, o tratamento das taxas, a diferença completa e detalhada entre compromissos de valor e compromissos de note, e o papel exato de cada assinatura. Também apresentamos um único fluxo canônico; transações reais podem conter muitos gastos e saídas ao mesmo tempo e podem misturar partes transparentes e blindadas. A fonte oficial é a Especificação do Protocolo Zcash. O que você tem agora é o formato correto; a especificação preenche cada medida.

---

## 10. Resumo

- Uma transação blindada encaixa os cinco componentes: uma **note** (o valor), seu **compromisso** na **árvore de compromissos de notes**, um **nulificador** para impedir gastos duplos, **compromissos de valor** para o equilíbrio e um **zk-SNARK** que une tudo.
- Gastar prova **quatro afirmações ao mesmo tempo**, a note existe, você está autorizado, o nulificador dela está correto e os valores se equilibram, com **conhecimento zero**, sem revelar nenhum dos fatos subjacentes.
- O **equilíbrio de valores** é garantido **somando compromissos homomórficos** e verificando se eles se lacram em zero, por meio da **assinatura de vinculação**, sem revelar nenhum montante.
- Os poderes de um usuário derivam de uma única **chave de gastos** por meio de uma **hierarquia de mão única**, o que possibilita **chaves de visualização** que revelam sem conceder o poder de gastar.
- A rede **verifica afirmações sobre dados ocultos**, desfazendo o paradoxo verificação vs privacidade do Artigo 0. Todas as questões abertas lá agora estão respondidas.
- O **Orchard** refina o **Sapling** (Ações unificadas, Halo 2 sem configuração confiável, curvas Pasta, Sinsemilla) sem mudar os cinco pilares.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Spending key** | O segredo raiz único do qual derivam todas as chaves de um usuário |
| **Viewing Key** | Revela suas transações a quem a possui, sem permitir que essa pessoa gaste |
| **Spend description** | A parte de uma tx que consome uma note (nulificador, âncora, prova) |
| **Output description** | A parte de uma tx que cria uma note (compromisso, texto cifrado, prova) |
| **Action (Orchard)** | Uma unidade unificada que faz um gasto e uma saída juntos |
| **Value commitment** | Um compromisso Pedersen homomórfico com um montante |
| **Binding signature** | A assinatura que prova que os valores se equilibram sem revelá-los |
| **Anchor** | A raiz da árvore contra a qual um gasto prova pertencimento |
| **Trial decryption** | Um destinatário testando novos compromissos para encontrar notes destinadas a ele |

---

## Perguntas frequentes

**A rede chega a ver o montante ou quem pagou quem?**
Não. Ela verifica a prova, se o nulificador é inédito, a âncora e a assinatura de vinculação. Todos os valores privados permanecem ocultos.

**O que me impede de gastar uma note duas vezes?**
O nulificador. Gastar a note o publica; a rede rejeita qualquer nulificador que já esteja no conjunto de nulificadores. A mesma note sempre gera o mesmo nulificador.

**Como o equilíbrio pode ser verificado se os montantes estão ocultos?**
Os compromissos de valor se somam de forma homomórfica; os compromissos de uma transação equilibrada se cancelam em um compromisso com zero, o que a assinatura de vinculação prova.

**Posso provar minhas transações a um auditor sem abrir mão do controle?**
Sim. Entregue uma chave de visualização. Ela revela sua atividade blindada, mas não pode autorizar gastos, graças à hierarquia de chaves de mão única.

**O Sapling está obsoleto agora que o Orchard existe?**
Ambos existiram na rede; o Orchard é o design atual. Os conceitos são compartilhados, então entender um dá a você o outro.

---

### Teste sua intuição

Um amigo diz: "Como a prova oculta o montante, um ladrão poderia simplesmente afirmar que suas saídas valem mais do que suas entradas e imprimir dinheiro de graça." Usando a Seção 5, explique em duas frases por que isso não funciona. *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Os montantes estão ocultos, mas cada um está envolto em um compromisso de valor homomórfico, e a rede soma todos os compromissos de entrada e subtrai todos os compromissos de saída; se os valores ocultos não se equilibrassem, o resultado não se lacraria em zero e **nenhuma assinatura de vinculação válida poderia ser produzida.** O ladrão pode ocultar *quanto*, mas não pode fazer valores desequilibrados passarem na verificação de equilíbrio, então imprimir dinheiro de graça é impossível: mesmo sem revelar nada, ele ainda seria pego pela aritmética.
</details>

---

### A série, completa

Agora você percorreu o caminho de um único paradoxo até um pagamento privado completo:

![alt text](/content-images/cd8bbb40-57b8-4854-b9cf-97f2485d126a-8847fae521.webp)


A partir daqui, o próximo arco natural vai mais fundo: o funcionamento interno do Groth16 e do Halo 2, as cerimônias de configuração confiável, os circuitos do Sapling e do Orchard em detalhe, a derivação de chaves e os endereços diversificados, e a evolução do protocolo ao longo das atualizações da rede. Mas a base agora está pronta, e cada um desses temas tem onde se apoiar.

*Parte da série* Zcash a partir dos primeiros princípios *para [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
