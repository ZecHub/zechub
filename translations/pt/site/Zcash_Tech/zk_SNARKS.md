<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# ZKP & ZK-SNARKS

## TL;DR

- **ZK-SNARKs** = Argumentos de Conhecimento Sucintos Não Interativos de Conhecimento Zero
- Elas permitem que uma parte **prove que sabe algo** sem revelar a própria informação
- Zcash usa ZK-SNARKs para provar que uma transação é válida (valores corretos, entradas não gastas) **sem revelar remetente, destinatário ou valor**
- "Sucinto" significa que a prova é minúscula e rápida de verificar, mesmo para afirmações complexas
- O pool Orchard usa Halo 2, um sistema ZK-SNARK **sem necessidade de trusted setup**

---

## O que é uma Prova?

Provas são a base de toda a matemática. Uma prova é uma afirmação ou teorema que você está tentando provar e uma sequência de derivações feita para declarar que o teorema foi provado. ex. todos os ângulos de um triângulo somam 180° podem ser verificados independentemente por qualquer pessoa (verificador).

**Provas** 

Provador ---> Faz uma Afirmação ---> Verificador Escolhe ---> Aceitar/Rejeitar 

(Tanto o provador quanto o verificador são algoritmos)

Na ciência da computação, o termo para provas verificáveis de forma eficiente é provas NP. Essas provas curtas podem ser verificadas em tempo polinomial. A ideia geral é: "Existe uma solução para um teorema e ela é passada ao verificador para conferência"


<a href="">
    <img width="853" height="396" alt="Linguagem NP1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


Em uma linguagem NP = duas condições devem ser atendidas: 

Completude: Afirmações verdadeiras serão aceitas pelo verificador (permite que provadores honestos alcancem a verificação)

Solidez: Afirmações falsas não terão provas (para qualquer estratégia de provador desonesto, eles não conseguirão provar a correção de uma afirmação incorreta).


### Provas Interativas & Probabilísticas

**Interação**: Em vez de apenas ler a prova, o verificador interage com um provador em ida e volta ao longo de várias rodadas de mensagens.

**Aleatoriedade**: As solicitações do verificador ao provador são aleatórias, e o provador deve ser capaz de responder corretamente a cada uma delas. 


<a href="">
 <img width="855" height="399" alt="Modelo IP1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


Usando interação e aleatoriedade juntas, é possível provar uma afirmação a um verificador cego em Tempo Polinomial Probabilístico (PPT). 

As Provas Interativas conseguem verificar de forma eficiente mais do que provas NP?

Provas NP vs provas IP:

|  Afirmação   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  sim      |  sim   |
|    CO-NP     |  não      |  sim   |
|    #P        |  não      |  sim   |
|    PSPACE    |  não      |  sim   |


NP - Existe uma solução para uma afirmação

CO-NP - Provar que não existem soluções para uma afirmação

#P - Contar quantas soluções existem para uma afirmação

PSPACE  - Provar uma alternância de diferentes afirmações

### O que é Conhecimento Zero?

O que um verificador pode computar após uma interação é idêntico ao que ele poderia provar antes. A interação ao longo de várias rodadas entre o provador e o verificador não aumentou o poder computacional do verificador.

**O Paradigma da Simulação (Simulation Paradigm)**

Esse experimento existe em toda a criptografia. Ele apresenta uma "Visão Real" e uma "Visão Simulada". 

Visão Real: Todos os possíveis históricos de interações entre Provador e Verificador (P,V)

Visão Simulada: O verificador simula todas as possíveis interações entre Provador e Verificador 

<a href="">
    <img width="850" height="397" alt="simulação1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

Um distinguidor em tempo polinomial tenta determinar se está olhando para a visão real ou para a simulada e solicita repetidamente uma amostra de ambas.

Diz-se que as duas visões são "computacionalmente indistinguíveis" se, para todos os algoritmos/estratégias de distinção, mesmo após receber um número polinomial de amostras da visão real ou simulada, a probabilidade for >1/2. 

**Argumentos de Conhecimento Zero**

Um protocolo interativo (P,V) é de conhecimento zero se existir um simulador (algoritmo) tal que, para todo verificador probabilístico em tempo polinomial (quando o teorema está correto), as distribuições de probabilidade que determinam a visão real a partir da simulada sejam computacionalmente indistinguíveis. 

Protocolos Interativos são úteis quando há um único verificador. Um exemplo seria um auditor fiscal em uma aplicação de 'prova de impostos' com conhecimento zero.

## O que é um SNARK?

**Argumento de Conhecimento Sucinto Não Interativo**

Definição ampla - Uma prova sucinta de que uma afirmação é verdadeira. A prova deve ser curta e rápida de verificar. Em SNARKS, uma única mensagem é enviada do Provador ao Verificador. O verificador então pode escolher aceitar ou rejeitar. 

exemplo de afirmação: "Eu conheço uma mensagem (m) tal que SHA256(m)=0"

Em um zk-SNARK, a prova não revela nada sobre a mensagem (m).

**Polinômios**: Somatórios de termos contendo uma constante (como 1,2,3), variáveis (como x,y,z) e expoentes de variáveis (como x², y³). 

exemplo: "3x² + 8x + 17"

**Circuito Aritmético**: Um modelo para computar polinômios. De forma mais geral, ele pode ser definido como um Grafo Acíclico Direcionado no qual, em cada nó do grafo, é realizada uma operação aritmética. O circuito consiste em portas de adição, portas de multiplicação e algumas portas constantes. Da mesma forma que circuitos booleanos carregam bits em fios, circuitos aritméticos carregam inteiros.


<a href="">
<img width="785" height="368" alt="circuito1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

Neste exemplo, o provador quer convencer o verificador de que conhece uma solução para o circuito aritmético.  

**Compromissos**: Para fazer isso, o provador colocará todos os valores (privados e públicos) associados ao circuito em um compromisso. Compromissos ocultam suas entradas usando uma função cuja saída é irreversível.

Sha256 é um exemplo de função hash que pode ser usada em um esquema de compromisso.

Depois que o provador se compromete com os valores, os compromissos são enviados ao verificador (com a confiança de que ele não conseguirá descobrir nenhum dos valores originais). O provador então consegue mostrar ao verificador que conhece cada um dos valores nos nós do grafo. 

**Transformação Fiat-Shamir**

Para tornar o protocolo *não interativo*, o provador gera aleatoriedade (usada para o desafio oculto) em nome do verificador usando uma função hash criptográfica. Isso é conhecido como oráculo aleatório. O provador pode então enviar uma única mensagem ao verificador, que poderá conferir se ela está correta. 

Para formar um SNARK que possa ser usado em circuitos gerais, dois elementos são necessários:

Esquema de compromisso funcional: Permite que um remetente se comprometa com um polinômio usando uma string curta que pode ser usada por um verificador para confirmar avaliações alegadas do polinômio comprometido.

Oráculo interativo polinomial: O verificador pede ao provador (algoritmo) para abrir todos os compromissos em vários pontos de sua escolha usando um esquema de compromisso polinomial e verifica se a identidade se mantém verdadeira entre eles.

**Setup**

Procedimentos de setup ajudam o verificador resumindo um circuito e gerando parâmetros públicos. 

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

**Tipos de setup de pré-processamento**:

Trusted Setup por circuito - É executado uma vez por circuito. É específico para um circuito e a aleatoriedade secreta (Common Reference String) deve ser mantida em segredo + destruída. 

Um setup comprometido nesse método significa que um provador desonesto pode provar afirmações falsas. 

Trusted but Universal Setup - Só precisa executar trusted setup uma vez e depois consegue pré-processar deterministicamente múltiplos circuitos. 

Transparent Setup (No Trusted Setup)- O algoritmo de pré-processamento não usa nenhuma aleatoriedade secreta. 


**Tipos de construções de prova SNARK**:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Requer Trusted Setup, mas tem provas muito curtas que podem ser verificadas rapidamente.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): Universally Trusted Setup.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): No Trusted Setup, mas produzem provas um pouco mais longas ou podem levar mais tempo para o provador executar. 

SNARKS são úteis quando múltiplos verificadores são necessários, como em uma blockchain como Zcash ou um zk-Rollup como [Aztec](https://docs.aztec.network), para que múltiplos nós validadores não precisem interagir ao longo de várias rodadas com cada prova. 

## Como os zk-SNARK's são implementados em Zcash?

De forma geral, provas de conhecimento zero são uma ferramenta para impor comportamento honesto em protocolos sem revelar nenhuma informação. 

Zcash é uma blockchain pública que viabiliza transações privadas. zk-SNARK's são usados para provar que uma transação privada é válida dentro das regras de consenso da rede sem revelar quaisquer outros detalhes sobre a transação. 

[Vídeo explicativo](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Nesta palestra, Ariel Gabizon apresenta descrições da Árvore de Compromissos de Notas do Zcash, Avaliação Polinomial Cega e Desafios Ocultos Homomorficamente, e como eles são implementados na rede. 

Leia o [livro do Halo2](https://zcash.github.io/halo2/index.html) para mais informações.

## Outras Aplicações de Conhecimento Zero 

zk-SNARKS oferecem várias vantagens em uma variedade de aplicações diferentes. Vamos ver alguns exemplos.

**Escalabilidade**: Isso é alcançado por meio de 'Terceirização da Computação'. Não há necessidade estrita de conhecimento zero para que uma cadeia L1 verifique o trabalho de um serviço off-chain. As transações não são necessariamente privadas em uma zk-EVM.

A vantagem de um serviço Rollup baseado em prova (zk-Rollup) é processar um lote de centenas/milhares de transações, e a L1 consegue verificar uma prova sucinta de que todas as transações foram processadas corretamente, escalando a taxa de transferência de transações da rede por um fator de 100 ou 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


**Interoperabilidade**: Isso é alcançado em uma zk-Bridge ao 'travar' ativos em uma cadeia de origem e provar para a cadeia de destino que os ativos foram travados (prova de consenso).

**Conformidade**: Projetos como [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) conseguem provar que uma transação privada está em conformidade com as leis bancárias locais sem revelar os detalhes da transação. 

**Combate à Desinformação**: Entre vários exemplos fora de blockchain e criptomoedas, está o uso de geração de provas em imagens que foram processadas por veículos de notícias e mídia, permitindo que os espectadores verifiquem independentemente a origem de uma imagem e todas as operações realizadas nela. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Aprendizado adicional: 

[Bibliografia de Conhecimento Zero - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK's com Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 e SNARKs sem Trusted Setups - Sean Bowe no Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Provas de conhecimento zero com Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Provas Interativas de Conhecimento Zero - artigo da Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Aula 1: Introdução e História de ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Explicação simples de circuitos aritméticos - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Escalabilidade é Entediante, Privacidade Está Morta: ZK-Proofs, Para que Servem?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Páginas relacionadas

- [Shielded Pools](/using-zcash/shielded-pools) — Como ZK-SNARKs são usados nos pools de valor do Zcash
- [Halo](/zcash-tech/halo) — O sistema ZK-SNARK do Zcash que elimina trusted setups
- [Segurança Pós-Quântica no Zcash](/zcash-tech/post-quantum-security) - Como riscos quânticos futuros se relacionam com a criptografia do Zcash
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSAs construídos sobre tecnologia ZK-SNARK
- [O que são ZEC e Zcash](/start-here/what-is-zec-and-zcash) — Introdução ao Zcash e seu modelo de privacidade
- [Privacidade como Princípio Fundamental](/privacy/privacy-as-a-core-principle) — Por que a privacidade financeira importa
