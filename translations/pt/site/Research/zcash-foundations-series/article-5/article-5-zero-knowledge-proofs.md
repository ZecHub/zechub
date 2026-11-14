# Provas de conhecimento zero: provar que você está certo sem dizer por quê
##### Pesquisa original de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-23-71534bece9.webp)

### A cortina que permite ao mundo verificar o que ele nunca pode ver

> **Série:** *Zcash a partir dos primeiros princípios* . **Artigo 5 . Provas de conhecimento zero**
> **Público:** iniciantes. Usamos todos os artigos anteriores (corpos finitos, curvas, compromissos, árvores de Merkle), mas cada ideia é relembrada quando precisamos dela.
> **O que você vai levar daqui:** um entendimento intuitivo e correto do que é uma prova de conhecimento zero, das três garantias que ela oferece, de como afirmações arbitrárias são provadas e do que impulsiona o Sapling e o Orchard do Zcash.

Este é o artigo rumo ao qual toda a série vinha subindo. Desde o [Artigo 0](article-0-shielded-transaction.md), repetimos que um pagamento é validado "atrás de uma cortina", comprovado como correto sem revelar nada. Uma prova de conhecimento zero é essa cortina. É a peça que finalmente resolve o paradoxo com que começamos: *como o público pode verificar uma transação que não tem permissão para ver?*

---

## 1. Por que você deveria se importar?

Relembre a contradição no centro do Zcash:

- Uma blockchain é confiável porque é **publicamente verificável**.
- Os pagamentos no Zcash são **completamente privados**: valores, remetente e destinatário, tudo oculto.

Essas duas coisas parecem mutuamente exclusivas. Verificar parece *exigir* olhar. A privacidade *proíbe* olhar. Se você não consegue conciliá-las, não pode ter um dinheiro privado em que todos confiem.

Uma **prova de conhecimento zero (ZKP)** é essa conciliação. Ela permite que um **provador** convença um **verificador** de que uma afirmação é verdadeira **sem revelar nada além do fato de que ela é verdadeira.** Nada de valores. Nada de identidades. Nada de note. Apenas: *"tudo aqui obedece às regras."* Vamos construir a intuição antes de qualquer maquinaria.

---

## 2. A intuição: três provas do dia a dia

**Provar que você sabe uma senha sem dizê-la.** Um site poderia verificar que você sabe sua senha observando você desbloquear algo que só a senha desbloqueia, sem nunca ver a senha em si. Você prova *conhecimento* sem *divulgação*.

**O amigo daltônico e as duas bolas.** Você segura uma bola vermelha e uma bola verde que parecem idênticas para o seu amigo daltônico. Você quer convencê-lo de que elas têm *cores diferentes* sem dizer qual é qual. Ele esconde as duas atrás das costas, opcionalmente faz a conversão de posição entre elas e mostra uma para você. Você diz se ele fez a conversão. Se as bolas realmente forem diferentes, você sempre acerta. Se fossem idênticas, você estaria chutando e acertaria só metade das vezes. Depois de 20 rodadas, sua sequência ininterrupta de acertos o convence de que elas são diferentes, mas ele nunca descobre qual bola é a vermelha. **Ele fica convencido de um fato sem aprender mais nada.** Isso é conhecimento zero em miniatura.

**A caverna.** Uma caverna em forma de anel tem, ao fundo, uma porta mágica que só abre com uma palavra secreta. Você afirma conhecer a palavra. Para provar isso sem revelá-la: um verificador espera do lado de fora enquanto você entra e escolhe ao acaso a passagem da esquerda ou da direita. Em seguida, o verificador grita por qual lado quer que você *saia*. Se você realmente conhece a palavra, sempre consegue obedecer (pode abrir a porta para trocar de lado, se necessário). Se estiver blefando, só consegue sair pelo lado certo por sorte, 50/50 em cada rodada. Repita 20 vezes e as chances de um blefador sobreviver são menores que uma em um milhão.

Essa história da caverna demonstra discretamente as **três garantias** que toda prova de conhecimento zero precisa oferecer.

---

## 3. As três garantias

![alt text](/content-images/image-24-b559d31849.webp)

| Garantia | Na história da caverna | No Zcash |
|---|---|---|
| **Completude** | Se você conhece a palavra, sempre sai pelo lado certo | Uma transação válida sempre produz uma prova aceita |
| **Solidez** | Um blefador é pego com probabilidade esmagadora | Uma transação fraudulenta (dinheiro forjado, gasto duplo) não consegue produzir uma prova aceita |
| **Conhecimento zero** | O verificador nunca ouve a palavra secreta | A rede nunca descobre valores, endereços ou qual note foi usada |

Se qualquer uma delas falhar, o sistema quebra: sem completude, usuários honestos são rejeitados; sem solidez, falsificadores imprimem dinheiro; sem conhecimento zero, a privacidade evapora.

---

## 4. Da caverna a *qualquer* afirmação: circuitos e testemunhas

A caverna prova um fato curioso. O Zcash precisa provar uma afirmação rica: *"Eu conheço uma note não gasta na árvore, tenho autorização para gastá-la, seu nulificador foi calculado corretamente e minhas entradas são iguais às minhas saídas."* Como passamos de bolas e cavernas para isso?

A ponte é uma ideia que amarra toda esta série:

> **Qualquer afirmação que você consegue checar com um cálculo pode ser reescrita como um circuito aritmético:** uma rede de adições e multiplicações sobre um corpo finito (Artigo 1).

Pense no circuito como uma lista de restrições aritméticas que *só são todas satisfeitas se a afirmação for verdadeira.* As entradas privadas que fazem tudo bater, sua note, sua chave, o caminho de Merkle, são chamadas de **testemunha.**

![alt text](/content-images/image-25-2479377e43.webp)

É por isso que dedicamos o Artigo 1 aos corpos finitos e o Artigo 3 aos hashes amigáveis a ZK: o circuito fala a língua da aritmética de corpos, então cada operação dentro da afirmação (incluindo o hashing e a escalada de Merkle do Artigo 4) precisa ser expressa dessa forma. Quanto mais barato for expressar cada operação, menor e mais rápida será a prova.

---

## 5. Tornando isso prático: não interativa e sucinta

A caverna precisava de muitas rodadas de ida e volta. Isso é inviável para uma blockchain, onde uma prova precisa ser publicada uma única vez e checada por todos, para sempre. Duas melhorias resolvem isso.

**Não interativa (a ideia de Fiat-Shamir).** Em vez de um verificador ao vivo gritando desafios aleatórios, o próprio provador gera os "desafios aleatórios" fazendo o *hash* da sua prova até aquele ponto. Como um bom hash é imprevisível (Artigo 3), o provador não consegue manipular os desafios a seu favor. A conversa cheia de idas e vindas se reduz a uma **única prova autocontida** que qualquer pessoa pode checar depois, sem interação.

**Sucinta.** Os melhores sistemas tornam a prova **minúscula e rápida de verificar, não importa o tamanho da afirmação.** Esta é a parte genuinamente impressionante.

> Uma prova Groth16 (o sistema que o Sapling usa) tem cerca de **192 bytes** e é verificada em milissegundos, *seja a afirmação que ela prova pequena ou enorme.* Algumas centenas de bytes podem atestar um cálculo envolvendo muitos milhares de restrições.

Junte tudo isso e você chega à sigla que verá em todo lugar:

> **zk-SNARK** = **z**ero-**k**nowledge **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. Conhecimento zero (não revela nada), sucinto (minúsculo e rápido), não interativo (de uma só vez), argumento de conhecimento (o provador realmente *conhece* uma testemunha válida).

---

## 6. O único porém: a configuração confiável

Não existe almoço grátis. Muitos SNARKs precisam de uma **configuração** única que produz parâmetros públicos para o circuito. Essa configuração gera, como subproduto, uma aleatoriedade secreta, e esse segredo precisa ser **destruído.** Se alguém o guardasse, poderia forjar provas, ou seja, **forjar dinheiro** (embora, e isso é crucial, ainda *não* conseguisse quebrar a privacidade).

Esse segredo remanescente tem o apelido de **lixo tóxico.** Para descartá-lo com segurança, o Zcash realizou elaboradas **cerimônias multipartes**, nas quais muitos participantes independentes contribuíram cada um com aleatoriedade; desde que *pelo menos um* tenha destruído sua parte honestamente, o lixo tóxico é irrecuperável.

![alt text](/content-images/image-26-cdad6625cd.webp)

Sistemas mais novos eliminam totalmente essa exigência, e esse é um dos maiores motivos pelos quais o Zcash evoluiu seu sistema de provas ao longo do tempo.

---

## 7. Onde isso aparece no Zcash

| Design | Sistema de provas | Configuração confiável? | Construído sobre |
|---|---|---|---|
| **Sprout** (o mais antigo) | zk-SNARK inicial | Sim | Cerimônia original |
| **Sapling** | **Groth16** | Sim (a cerimônia multipartes "Powers of Tau" + Sapling) | **BLS12-381** (Artigo 2) |
| **Orchard** (atual) | **Halo 2** | **Sem configuração confiável** | **Pallas / Vesta** (Artigo 2) |

A evolução do Sprout para o Sapling e para o Orchard é, em grande parte, uma história de provas ficando menores, mais rápidas e se livrando da configuração confiável. O **Halo 2**, usado pelo Orchard, não precisa de cerimônia alguma e foi construído para suportar *recursão* (provas que verificam outras provas), e é por isso que o Orchard usa o **ciclo** de curvas Pallas/Vesta do Artigo 2: cada curva é ajustada para verificar provas escritas sobre a outra.

Isso fecha o maior ciclo aberto no Artigo 0. A mágica "atrás da cortina" é um **zk-SNARK**: ele prova que sua transação satisfaz um circuito aritmético que codifica todas as regras, sem revelar nada além do único bit "válida".

---

## 8. Um aviso honesto

Provas de conhecimento zero são um campo profundo, e ficamos de propósito no nível da intuição. Não definimos os limites exatos de probabilidade da solidez, a forma exata de um circuito aritmético (R1CS, PLONKish e assim por diante), como polinômios e compromissos transformam um circuito em uma prova curta, nem o funcionamento interno real do Groth16 e do Halo 2. A caverna é uma prova *interativa*; os sistemas em produção são não interativos e muito mais intrincados. Nada disso muda o essencial: provar que um circuito é satisfeito por uma testemunha secreta, com completude, com solidez e sem revelar nada. A maquinaria daria uma série inteira só para ela.

---

## 9. Resumo

- Uma **prova de conhecimento zero** permite que um provador convença um verificador de que uma afirmação é verdadeira **sem revelar mais nada**, resolvendo o paradoxo entre verificação e privacidade.
- Ela precisa satisfazer três garantias: **completude** (afirmações verdadeiras convencem), **solidez** (afirmações falsas não convencem) e **conhecimento zero** (o verificador só descobre que "é verdade").
- Afirmações arbitrárias se tornam **circuitos aritméticos** sobre um corpo finito; as entradas secretas que satisfazem o circuito são a **testemunha**. É por isso que os corpos finitos e os hashes amigáveis a ZK eram importantes.
- **Fiat-Shamir** torna as provas **não interativas** (de uma só vez); os melhores sistemas também são **sucintos** (uma prova Groth16 tem cerca de **192 bytes** e é verificada em milissegundos, independentemente do tamanho da afirmação). Juntando tudo: um **zk-SNARK**.
- Alguns SNARKs precisam de uma **configuração confiável** cujo **lixo tóxico** remanescente deve ser destruído (por meio de cerimônias multipartes); um comprometimento permitiria forjar dinheiro, mas **não** quebrar a privacidade.
- O **Sapling** usa **Groth16** (configuração confiável, BLS12-381); o **Orchard** usa **Halo 2** (sem configuração confiável, Pallas/Vesta, amigável à recursão).

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Zero-knowledge proof** | Convencer alguém de que uma afirmação é verdadeira sem revelar mais nada |
| **Prover / Verifier** | Quem faz a prova / quem a checa |
| **Completeness** | Afirmações verdadeiras são sempre aceitas (vindas de um provador honesto) |
| **Soundness** | Afirmações falsas são rejeitadas (trapaceiros não vencem, exceto por sorte) |
| **Witness** | As entradas secretas que tornam a afirmação verdadeira |
| **Arithmetic circuit** | Uma afirmação reescrita como adições e multiplicações sobre um corpo finito |
| **Non-interactive (Fiat-Shamir)** | Uma prova de uma só vez, sem necessidade de idas e vindas ao vivo |
| **Succinct** | A prova é minúscula e rápida de verificar, independentemente do tamanho da afirmação |
| **zk-SNARK** | Zero-knowledge Succinct Non-interactive ARgument of Knowledge |
| **Trusted setup / toxic waste** | Geração única de parâmetros cujo segredo remanescente deve ser destruído |

---

## Perguntas frequentes

**Se a prova não revela nada, como checá-la pode significar alguma coisa?**
Porque a matemática é organizada de forma que *somente* uma testemunha real e válida consegue produzir uma prova aprovada. Passar na checagem já é a evidência, sem necessidade de divulgação.

**Alguém poderia falsificar uma prova?**
A solidez torna isso inviável. A única exceção é um SNARK cujo lixo tóxico da configuração confiável foi guardado; é exatamente por isso que as cerimônias para destruí-lo são importantes.

**Uma configuração confiável comprometida vaza meus dados privados?**
Não. Ela permitiria que um atacante forjasse dinheiro *novo*, mas **não** revela valores, endereços nem notes. Privacidade e solidez são garantias separadas.

**Por que o Zcash mudou de sistema de provas ao longo do tempo?**
Para obter provas menores e mais rápidas e, com o Halo 2, eliminar totalmente a configuração confiável e permitir a recursão.

---

### Teste sua intuição

Na caverna, por que é essencial que o verificador escolha o lado de saída *depois* que o provador já entrou, em vez de anunciá-lo antes? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Se o verificador anunciasse o lado antes, um blefador que não conhece a palavra poderia simplesmente entrar por esse lado desde o início e sair tranquilamente, sem nunca precisar da porta. Escolher *depois* que o provador se compromete com uma passagem obriga o blefador a depender da sorte (50/50 por rodada), e é isso que torna as rodadas repetidas convincentes. Essa ordem de "comprometer-se primeiro, depois ser desafiado" é exatamente o que Fiat-Shamir preserva ao derivar o desafio de um hash da prova com que o provador já se comprometeu.
</details>

---

### O que vem a seguir

**Artigo 6 . O protocolo blindado, de ponta a ponta:** o final. Pegamos cada peça, notes, compromissos, a árvore de compromissos de notes, nulificadores, balanço de valor e a prova de conhecimento zero, e montamos uma transação blindada completa do Zcash, fechando cada um dos ciclos abertos lá no Artigo 0.

*Parte da série* Zcash a partir dos primeiros princípios *para [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
