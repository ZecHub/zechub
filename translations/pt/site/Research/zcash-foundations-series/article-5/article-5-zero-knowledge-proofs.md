# Provas de Conhecimento Zero: Provando que Você Está Certo Sem Dizer Por Quê
##### Pesquisa original de [Annkkitaaa](https://github.com/Annkkitaaa)

![texto alternativo](image-23.png)

### A cortina que permite ao mundo verificar o que ele nunca pode ver

> **Série:** *Zcash from First Principles* . **Artigo 5 . Provas de Conhecimento Zero**
> **Público:** iniciantes. Partimos de todos os artigos anteriores (campos finitos, curvas, compromissos, árvores de Merkle), mas cada ideia é retomada quando precisamos dela.
> **O que você vai levar daqui:** uma compreensão intuitiva e correta do que é uma prova de conhecimento zero, das três garantias que ela oferece, de como afirmações arbitrárias são provadas e do que dá poder ao Sapling e ao Orchard do Zcash.

Este é o artigo para o qual toda a série vinha convergindo. Desde o [Artigo 0](article-0-shielded-transaction.md), continuamos dizendo que um pagamento é validado "atrás de uma cortina", provado como correto sem revelar nada. Uma prova de conhecimento zero é essa cortina. É a peça que finalmente resolve o paradoxo com que abrimos: *como o público pode verificar uma transação que não tem permissão para ver?*

---

## 1. Por que isso deveria importar para você?

Lembre-se da contradição no coração do Zcash:

- Uma blockchain é confiável porque é **publicamente verificável**.
- Os pagamentos em Zcash são **completamente privados**: valores, remetente, destinatário, tudo oculto.

Isso parece mutuamente exclusivo. Verificação parece *exigir* olhar. Privacidade *proíbe* olhar. Se você não conseguir reconciliar as duas coisas, não poderá ter dinheiro privado em que qualquer pessoa confie.

Uma **prova de conhecimento zero (ZKP)** é essa reconciliação. Ela permite que um **proponente** convença um **verificador** de que uma afirmação é verdadeira **sem revelar nada além do fato de que ela é verdadeira.** Nenhum valor. Nenhuma identidade. Nenhuma nota. Apenas: *"tudo aqui obedece às regras."* Vamos construir a intuição antes de qualquer mecanismo.

---

## 2. A intuição: três provas do dia a dia

**Provar que você sabe uma senha, sem dizê-la.** Um site poderia verificar que você sabe sua senha observando você desbloquear algo que só a senha desbloqueia, sem nunca ver a própria senha. Você prova *conhecimento* sem *divulgação*.

**O amigo daltônico e duas bolas.** Você segura uma bola vermelha e uma bola verde que parecem idênticas para seu amigo daltônico. Você quer convencê-lo de que elas têm *cores diferentes* sem dizer qual é qual. Ele esconde as duas atrás das costas, opcionalmente as troca de lugar, e lhe mostra uma delas. Você diz se ele trocou ou não. Se as bolas realmente forem diferentes, você sempre acerta. Se fossem idênticas, você estaria chutando, acertando apenas metade das vezes. Depois de 20 rodadas, sua sequência perfeita o convence de que elas são diferentes, mas ele nunca descobre qual bola é vermelha. **Ele fica convencido de um fato sem aprender mais nada.** Isso é conhecimento zero em miniatura.

**A caverna.** Uma caverna em forma de anel tem uma porta mágica no fundo que só se abre com uma palavra secreta. Você afirma conhecer a palavra. Para provar isso sem revelá-la: um verificador espera do lado de fora enquanto você entra e escolhe aleatoriamente a passagem da esquerda ou da direita. O verificador então grita de qual lado quer que você *saia*. Se você realmente conhece a palavra, sempre pode obedecer (você pode abrir a porta para trocar de lado, se necessário). Se estiver blefando, só poderá sair pelo lado certo por sorte, 50/50 em cada rodada. Repita isso 20 vezes e a chance de um blefador sobreviver é menor que uma em um milhão.

Essa história da caverna demonstra discretamente as **três garantias** que toda prova de conhecimento zero precisa oferecer.

---

## 3. As três garantias

![texto alternativo](image-24.png)

| Garantia | Na história da caverna | No Zcash |
|---|---|---|
| **Completude** | Se você conhece a palavra, sempre sai pelo lado certo | Uma transação válida sempre produz uma prova aceita |
| **Solidez** | Um blefador é pego com probabilidade esmagadora | Uma transação fraudulenta (dinheiro forjado, gasto duplo) não pode produzir uma prova aceita |
| **Conhecimento zero** | O verificador nunca ouve a palavra secreta | A rede nunca aprende valores, endereços ou qual nota é |

Se qualquer uma delas falhar, o sistema quebra: sem completude, usuários honestos são rejeitados; sem solidez, falsificadores imprimem dinheiro; sem conhecimento zero, a privacidade evapora.

---

## 4. De uma caverna para *qualquer* afirmação: circuitos e testemunhas

A caverna prova um fato curioso. O Zcash precisa provar uma afirmação rica: *"eu conheço uma nota não gasta na árvore, estou autorizado a gastá-la, seu anulador é calculado corretamente, e minhas entradas são iguais às minhas saídas."* Como passamos de bolas e cavernas para isso?

A ponte é uma ideia que conecta toda esta série:

> **Qualquer afirmação que você possa verificar com uma computação pode ser reescrita como um circuito aritmético:** uma rede de adições e multiplicações sobre um campo finito (Artigo 1).

Pense no circuito como uma lista de restrições aritméticas que são *todas satisfeitas apenas se a afirmação for verdadeira.* As entradas privadas que fazem tudo bater, sua nota, sua chave, o caminho de Merkle, são chamadas de **testemunha**.

![texto alternativo](image-25.png)

É por isso que passamos o Artigo 1 em campos finitos e o Artigo 3 em hashes amigáveis para ZK: o circuito fala a linguagem da aritmética de campos, então toda operação dentro da afirmação (incluindo hashing e a subida na árvore de Merkle do Artigo 4) precisa ser expressa dessa forma. Quanto mais barato for expressar cada operação, menor e mais rápida será a prova.

---

## 5. Tornando isso prático: não interativo e sucinto

A caverna exigia muitas rodadas de ida e volta. Isso é impraticável para uma blockchain, onde uma prova precisa ser publicada uma vez e verificada por todos, para sempre. Duas melhorias resolvem isso.

**Não interativo (a ideia de Fiat-Shamir).** Em vez de um verificador ao vivo gritando desafios aleatórios, o proponente gera os "desafios aleatórios" por conta própria ao fazer o *hash* de sua própria prova até aquele ponto. Como um bom hash é imprevisível (Artigo 3), o proponente não consegue preparar os desafios a seu favor. A conversa longa e interativa colapsa em uma **única prova autocontida** que qualquer pessoa pode verificar depois, sem interação.

**Sucinto.** Os melhores sistemas tornam a prova **minúscula e rápida de verificar, não importa o tamanho da afirmação.** Essa é a parte genuinamente espantosa.

> Uma prova Groth16 (o sistema que o Sapling usa) tem cerca de **192 bytes** e é verificada em milissegundos, *quer a afirmação que ela prova seja pequena ou enorme.* Algumas centenas de bytes podem atestar uma computação envolvendo muitos milhares de restrições.

Junte essas duas propriedades e você obtém a sigla que verá em toda parte:

> **zk-SNARK** = **z**ero-**k**nowledge **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. Conhecimento zero (não revela nada), sucinto (minúsculo e rápido), não interativo (de uma vez só), argumento de conhecimento (o proponente realmente *conhece* uma testemunha válida).

---

## 6. O único porém: configuração confiável

Não existe almoço grátis. Muitos SNARKs precisam de uma **configuração** única que produza parâmetros públicos para o circuito. A configuração gera aleatoriedade secreta como subproduto, e esse segredo precisa ser **destruído.** Se alguém o mantivesse, poderia forjar provas, ou seja, **forjar dinheiro** (embora, crucialmente, ainda assim não pudesse *quebrar* a privacidade).

Esse segredo residual é apelidado de **lixo tóxico.** Para descartá-lo com segurança, o Zcash realizou elaboradas **cerimônias multipartes** nas quais muitos participantes independentes contribuíram com aleatoriedade; contanto que *ao menos um* deles tenha destruído sua parte honestamente, o lixo tóxico é irrecuperável.

![texto alternativo](image-26.png)

Sistemas mais novos eliminam completamente essa exigência, e essa é uma das maiores razões pelas quais o Zcash evoluiu seu sistema de provas ao longo do tempo.

---

## 7. Onde isso vive no Zcash

| Design | Sistema de prova | Configuração confiável? | Baseado em |
|---|---|---|---|
| **Sprout** (o mais antigo) | zk-SNARK inicial | Sim | cerimônia original |
| **Sapling** | **Groth16** | Sim (a cerimônia multipartes "Powers of Tau" + cerimônia Sapling) | **BLS12-381** (Artigo 2) |
| **Orchard** (atual) | **Halo 2** | **Sem configuração confiável** | **Pallas / Vesta** (Artigo 2) |

A marcha de Sprout para Sapling e depois para Orchard é, em grande parte, uma história de provas ficando menores, mais rápidas e abandonando a configuração confiável. **Halo 2**, usado por Orchard, não precisa de cerimônia alguma e foi construído para suportar *recursão* (provas que verificam outras provas), razão pela qual Orchard usa o **ciclo** de curvas Pallas/Vesta do Artigo 2: cada curva é ajustada para verificar provas escritas sobre a outra.

Isso fecha o maior ciclo iniciado no Artigo 0. A mágica "atrás da cortina" é um **zk-SNARK**: ele prova que sua transação satisfaz um circuito aritmético que codifica todas as regras, sem revelar nada além do único bit "válido".

---

## 8. Um aviso honesto

Provas de conhecimento zero são um campo profundo, e ficamos no nível da intuição de propósito. Não definimos os limites precisos de probabilidade em solidez, a forma exata de um circuito aritmético (R1CS, PLONKish e assim por diante), como polinômios e compromissos transformam um circuito em uma prova curta, nem os verdadeiros mecanismos internos de Groth16 e Halo 2. A caverna é uma prova *interativa*; os sistemas de produção são não interativos e muito mais intrincados. Nada disso muda o núcleo: provar que um circuito é satisfeito por uma testemunha secreta, com completude, solidez e sem revelar nada. O maquinário daria uma série inteira por si só.

---

## 9. Resumo

- Uma **prova de conhecimento zero** permite que um proponente convença um verificador de que uma afirmação é verdadeira **sem revelar mais nada**, resolvendo o paradoxo entre verificação e privacidade.
- Ela deve satisfazer três garantias: **completude** (afirmações verdadeiras convencem), **solidez** (afirmações falsas não conseguem) e **conhecimento zero** (o verificador aprende apenas "é verdade").
- Afirmações arbitrárias se tornam **circuitos aritméticos** sobre um campo finito; as entradas secretas que satisfazem o circuito são a **testemunha**. É por isso que campos finitos e hashes amigáveis para ZK importavam.
- **Fiat-Shamir** torna as provas **não interativas** (de uma vez só); os melhores sistemas também são **sucintos** (uma prova Groth16 tem cerca de **192 bytes** e é verificada em milissegundos independentemente do tamanho da afirmação). Juntas: um **zk-SNARK**.
- Alguns SNARKs precisam de uma **configuração confiável** cujo **lixo tóxico** residual deve ser destruído (via cerimônias multipartes); um comprometimento permitiria forjar dinheiro, mas **não** quebrar a privacidade.
- **Sapling** usa **Groth16** (configuração confiável, BLS12-381); **Orchard** usa **Halo 2** (sem configuração confiável, Pallas/Vesta, amigável à recursão).

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Prova de conhecimento zero** | Convencer alguém de que uma afirmação é verdadeira sem revelar mais nada |
| **Proponente / Verificador** | Quem produz a prova / quem a verifica |
| **Completude** | Afirmações verdadeiras sempre são aceitas (vindas de um proponente honesto) |
| **Solidez** | Afirmações falsas são rejeitadas (trapaceiros não vencem exceto por sorte) |
| **Testemunha** | As entradas secretas que tornam a afirmação verdadeira |
| **Circuito aritmético** | Uma afirmação reescrita como somas e multiplicações sobre um campo finito |
| **Não interativo (Fiat-Shamir)** | Uma prova de uma só vez que não precisa de ida e volta ao vivo |
| **Sucinto** | A prova é minúscula e rápida de verificar, independentemente do tamanho da afirmação |
| **zk-SNARK** | Zero-knowledge Succinct Non-interactive ARgument of Knowledge |
| **Configuração confiável / lixo tóxico** | Geração única de parâmetros cujo segredo residual deve ser destruído |

---

## FAQ

**Se a prova não revela nada, como verificá-la pode significar alguma coisa?**
Porque a matemática é organizada de tal forma que *apenas* uma testemunha real e válida pode produzir uma prova que passe. Passar na verificação é, por si só, a evidência; nenhuma divulgação é necessária.

**Alguém poderia falsificar uma prova?**
A solidez torna isso inviável. A única exceção é um SNARK cujo lixo tóxico da configuração confiável foi preservado; é exatamente por isso que as cerimônias para destruí-lo importam.

**Uma configuração confiável comprometida vaza meus dados privados?**
Não. Ela permitiria que um atacante forjasse dinheiro *novo*, mas **não** revela valores, endereços ou notas. Privacidade e solidez são garantias separadas.

**Por que o Zcash mudou os sistemas de prova ao longo do tempo?**
Para obter provas menores e mais rápidas e, com Halo 2, eliminar totalmente a configuração confiável e permitir recursão.

---

### Teste sua intuição

Na caverna, por que é essencial que o verificador escolha o lado da saída *depois* que o proponente já entrou, em vez de anunciá-lo antes? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Se o verificador anunciasse o lado primeiro, um blefador que não conhece a palavra poderia simplesmente entrar por aquele lado desde o início e voltar caminhando por ele, sem nunca precisar da porta. Escolher *depois* que o proponente se compromete com uma passagem força um blefador a depender da sorte (50/50 por rodada), o que é justamente o que torna rodadas repetidas convincentes. Essa ordem de "comprometer-se primeiro, depois ser desafiado" é exatamente o que Fiat-Shamir preserva ao derivar o desafio a partir de um hash da prova já comprometida do proponente.
</details>

---

### O que vem a seguir

**Artigo 6 . O protocolo shielded, de ponta a ponta:** o final. Pegamos cada peça, notas, compromissos, a árvore de compromissos de notas, anuladores, balanço de valor e a prova de conhecimento zero, e montamos uma transação shielded completa do Zcash, fechando cada um dos ciclos abertos lá no Artigo 0.

*Parte da série* Zcash from First Principles *para [ZecHub](https://zechub.org). Licenciado sob CC BY-SA 4.0.*
