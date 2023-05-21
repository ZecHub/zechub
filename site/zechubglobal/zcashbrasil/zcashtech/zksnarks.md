# ZKP & ZK-SNARKS

## O que é uma Prova?

As provas são a base de toda a matemática. Uma prova é uma afirmação ou teorema que você está tentando provar e uma sequência de derivações feitas para declarar que o teorema foi provado. por exemplo. todos os ângulos em um triângulo totalizando 180° podem ser verificados independentemente por qualquer pessoa (verificador).

**Provas**

Provedor ---> Faz Reivindicação ---> Verificador Escolhe ---> Aceitar/Rejeitar

(Tanto o provador quanto o verificador são algoritmos)

Na ciência da computação, o termo para provas verificáveis ​​de forma eficiente é provas NP. Estas provas curtas podem ser verificadas em tempo polinomial. A ideia geral é "Existe uma solução para um teorema e é passada para o verificador para verificá-la"

![Provas NP](https://cdn.discordapp.com/attachments/860525418008674327/1070395089559494716/NPlanguage.jpg "NP Language")


Em uma linguagem NP = duas condições devem ocorrer:

Integridade: Reivindicações verdadeiras serão aceitas pelo verificador (permite que provadores honestos alcancem a verificação)

Solidez: Reivindicações falsas não terão provas (para todas as estratégias de provador de trapaça, eles serão incapazes de provar a exatidão da afirmação incorreta).


### Provas interativas e probabilísticas

**Interação**: Em vez de apenas ler a prova, o verificador interage com um provador em várias rodadas de mensagens.

**Aleatoriedade**: As solicitações do verificador para o provador são aleatórias e o provador deve ser capaz de responder corretamente a cada uma delas.

![Provas de IP](https://cdn.discordapp.com/attachments/860525418008674327/1070395089194594345/IPmodel.jpg "Protocolo IP")

Usando interação e aleatoriedade juntas, é possível provar uma afirmação para um verificador cego em Tempo Polinomial Probabilístico (PPT).

As provas interativas podem verificar com eficiência mais do que as provas NP?

Provas NP vs provas IP:

| Declaração | NP | PI |
|--------------|-----------|--------|
| NP | sim | sim |
| CO-NP | não | sim |
| #P | não | sim |
| ESPAÇO | não | sim |


NP - Existe uma solução para uma declaração

CO-NP - Provando que não há soluções para uma declaração

#P - Para contar quantas soluções existem para uma declaração

PSPACE - Provando uma alternância de declarações diferentes

### O que é Conhecimento Zero?

O que um verificador pode calcular após uma interação é idêntico ao que eles poderiam provar antes. A interação em várias rodadas entre o provador e o verificador não aumentou o poder computacional do verificador.

**O Paradigma da Simulação**

Esse experimento existe em toda a criptografia. Apresenta uma "Visualização Real" e uma "Visualização Simulada".

Real View: Todos os históricos possíveis de interações entre Provedor e Verificador (P,V)

Visualização Simulada: O verificador simula todas as interações possíveis entre o Provedor e o Verificador

![paradigma de simulação](https://cdn.discordapp.com/attachments/860525418008674327/1070395090259947520/simulation.jpg "Paradigma de simulação")

Um diferenciador de tempo polinomial tenta determinar se eles estão olhando para a visão real ou simulada e solicita uma amostra de ambos repetidamente.

As duas visualizações são ditas "computacionalmente indistinguíveis" se para todos os algoritmos/estratégias de distinção, mesmo após receber um número polinomial de amostras reais ou simuladas, a probabilidade é >1/2.

**Argumentos de conhecimento de conhecimento zero**

Um protocolo interativo (P,V) é de conhecimento zero se existe um simulador (algoritmo) tal que para cada verificador de probabilidade em tempo polinomial (quando o teorema está correto), as distribuições de probabilidade que determinam a visão real da simulada são computacionalmente indistinguíveis.

Protocolos interativos são úteis quando há um único verificador. Um exemplo seria um auditor fiscal em um aplicativo de 'prova de impostos' de conhecimento zero.

## O que é um SNARK?

**Argumento de conhecimento não interativo sucinto**

Definição ampla - Uma prova sucinta de que uma afirmação é verdadeira. A prova deve ser curta e rápida de verificar. No SNARKS, uma única mensagem é enviada do Provedor para o Verificador. O verificador pode então escolher aceitar ou rejeitar.

declaração de exemplo: "Eu conheço uma mensagem (m) tal que SHA256(m)=0"

Em um zk-SNARK a prova não revela nada sobre a mensagem (m).

**Polinômios**: Somas de termos contendo uma constante (como 1,2,3), variáveis ​​(como x,y,z) e expoentes de variáveis ​​(como x², y³).

exemplo: "3x² + 8x + 17"

**Circuito Aritmético**: Um modelo para computar polinômios. De forma mais geral, pode ser definido como um gráfico acíclico direcionado no qual, em cada nó do gráfico, uma operação aritmética é executada. O circuito consiste em portas de adição, portas de multiplicação e algumas portas constantes. Da mesma forma que os circuitos booleanos transportam bits em fios, os circuitos aritméticos transportam inteiros.

![circuito](https://cdn.discordapp.com/attachments/860525418008674327/1070405388048011305/circuit.jpg "DAG")

Neste exemplo, o provador quer convencer o verificador de que conhece uma solução para o circuito aritmético.

**Compromissos**: Para isso, o provador colocará todos os valores (privados e públicos) associados ao circuito em um compromisso. Os compromissos ocultam suas entradas usando uma função cuja saída é irreversível.

Sha256 é um exemplo de função hash que pode ser usada em um esquema de compromisso.

Depois que o provador se compromete com os valores, os compromissos são enviados ao verificador (tendo a certeza de que não conseguirão descobrir nenhum dos valores originais). O provador é então capaz de mostrar ao verificador o conhecimento de cada um dos valores nos nós do grafo.

**Transformada Fiat-Shamir**

Para tornar o protocolo *não interativo*, o provador gera aleatoriedade (usada para o desafio oculto) em nome do verificador usando uma função hash criptográfica. Isso é conhecido como oráculo aleatório. O provador pode enviar uma única mensagem ao verificador, que pode verificar se está correto.

Para formar um SNARK que pode ser usado para circuitos gerais são necessários dois elementos:

Esquema de confirmação funcional: permite que um committer se comprometa com um polinômio com uma string curta que pode ser usada por um verificador para confirmar as avaliações reivindicadas do polinômio confirmado.

Oráculo interativo polinomial: O verificador pede ao provador (algoritmo) para abrir todos os compromissos em vários pontos de sua escolha usando o esquema de compromisso polinomial e verifica se a identidade é verdadeira entre eles.

**Configurar**

Os procedimentos de configuração ajudam o verificador resumindo um circuito e gerando parâmetros públicos.

![Configuração](https://cdn.discordapp.com/attachments/860525418008674327/1070395089899229245/setup.jpg "Configuração")

**Tipos de configuração de pré-processamento**:

Configuração confiável por circuito - é executada uma vez por circuito. É específico para um circuito e a aleatoriedade secreta (Common Reference String) deve ser mantida em segredo + destruída.

Uma configuração comprometida neste método significa que um provador desonesto pode provar declarações falsas.

Configuração confiável, mas universal - só precisa executar a configuração confiável uma vez e pode pré-processar de forma determinista vários circuitos.

Configuração transparente (sem configuração confiável) - O algoritmo de pré-processamento não usa nenhuma aleatoriedade secreta.


**Tipos de construções à prova de SNARK**:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Requer configuração confiável, mas possui provas muito curtas que podem ser verificadas rapidamente.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): Configuração universalmente confiável.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Nenhuma configuração confiável, mas produz provas um pouco mais longas ou pode levar mais tempo para o provador ser executado.

SNARKS são úteis quando vários verificadores são necessários, como um blockchain como Zcash ou zk-Rollup como [Aztec](https://docs.aztec.network) para que vários nós de validação não tenham que interagir em várias rodadas com cada um prova.

## Como os zk-SNARK são implementados no Zcash?

Geralmente, as provas de conhecimento zero são uma ferramenta para impor um comportamento honesto em protocolos sem revelar nenhuma informação.

Zcash é um blockchain público que facilita transações privadas. Os zk-SNARK são usados ​​para provar que uma transação privada é válida dentro das regras de consenso da rede sem revelar nenhum outro detalhe sobre a transação.

[Vídeo Explicativo](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Nesta palestra, Ariel Gabizon fornece descrições da Árvore de Compromisso de Nota Zcash, Avaliação Polinomial Cega e Desafios Homomorficamente Ocultos e como eles são implementados no rede.

Leia o [livro Halo2](https://zcash.github.io/halo2/index.html) para mais informações.

## Outros aplicativos de conhecimento zero

O zk-SNARKS oferece várias vantagens em uma variedade de aplicações diferentes. Vamos dar uma olhada em alguns exemplos.

**Escalabilidade**: Isso é obtido por 'Computação terceirizada'. Não há necessidade estrita de conhecimento zero para uma cadeia L1 para verificar o trabalho de um serviço fora da cadeia. As transações não são necessariamente privadas em um zk-EVM.

A vantagem de um serviço Rollup baseado em prova (zk-Rollup) é processar um lote de centenas/milhares de transações e o L1 é capaz de verificar uma prova sucinta de que todas as transações foram processadas corretamente, dimensionando a taxa de transferência da rede por um fator de 100 ou 1000.

![zkvm](https://cdn.discordapp.com/attachments/860525418008674327/1070395090612265000/zkvm.jpg "ZKVM")

**Interoperabilidade**: Isso é alcançado em um zk-Bridge 'bloqueando' ativos em uma cadeia de origem e provando à cadeia de destino que os ativos foram bloqueados (prova de consenso).

**Conformidade**: Projetos como o [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) são capazes de provar que uma transação privada está em conformidade com o sistema bancário local leis sem revelar os detalhes da transação.

**Combate à desinformação**: entre vários exemplos fora de blockchain e criptomoeda, o uso de geração de provas em imagens que foram processadas por meios de comunicação e notícias para permitir que os espectadores verifiquem independentemente a origem de uma imagem e todas as operações realizadas nela. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Aprendizado adicional:

[Bibliografia Zero-Knowledge - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK com Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 e SNARKs sem configurações confiáveis ​​- Sean Bowe nos laboratórios de distopia](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Provas de conhecimento zero com Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Provas interativas de conhecimento zero - artigo Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Aula 1: Introdução e História do ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Explicação Simples de Circuitos Aritméticos - Médio](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[A escalabilidade é chata, a privacidade está morta: ZK-Proofs, para que servem?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

