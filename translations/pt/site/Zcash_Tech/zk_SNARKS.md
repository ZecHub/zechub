<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP & ZK-SNARKS

## TL;DR

- **zk-SNARKs** = argumentos de conhecimento sucintos e não interativos de conhecimento zero
- Eles permitem que uma parte **prove que sabe algo** sem revelar a própria informação
- Zcash usa zk-SNARKs para provar que uma transação é válida (valores corretos, entradas não gastas) **sem revelar remetente, destinatário ou valor**
- "Sucinto" significa que a prova é minúscula e rápida de verificar, mesmo para afirmações complexas
- O pool Orchard usa o Halo 2, um sistema zk-SNARK que **não exige configuração confiável**

---

## O que é uma prova?

As provas são a base de toda a matemática. Uma prova é uma afirmação ou teorema que você está tentando provar e a sequência de deduções feitas para declarar que o teorema foi provado. Por exemplo, a afirmação de que a soma de todos os ângulos de um triângulo é 180° pode ser verificada de forma independente por qualquer pessoa (o verificador).

**Provas** 

Provador ---> Faz a afirmação ---> Verificador escolhe ---> Aceita/Rejeita 

(Tanto o provador quanto o verificador são algoritmos)

Na ciência da computação, o termo para provas verificáveis de forma eficiente é provas NP. Essas provas curtas podem ser verificadas em tempo polinomial. A ideia geral é: "Existe uma solução para um teorema e ela é passada ao verificador para que ele a confira"


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


Em uma linguagem NP, duas condições devem ser satisfeitas: 

Completude: afirmações verdadeiras serão aceitas pelo verificador (permite que provadores honestos cheguem à verificação)

Correção: afirmações falsas não terão provas (para qualquer estratégia de um provador desonesto, ele não conseguirá provar a correção de uma afirmação incorreta).


### Provas interativas e probabilísticas

**Interação**: em vez de apenas ler a prova, o verificador interage com o provador, trocando mensagens ao longo de várias rodadas.

**Aleatoriedade**: as solicitações do verificador ao provador são aleatórias, e o provador deve ser capaz de responder corretamente a cada uma delas. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


Usando interação e aleatoriedade em conjunto, é possível provar uma afirmação a um verificador cego em tempo polinomial probabilístico (PPT). 

As provas interativas conseguem verificar de forma eficiente mais do que as provas NP?

Provas NP vs. provas IP:

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

### O que é conhecimento zero?

O que um verificador consegue calcular depois de uma interação é idêntico ao que ele conseguiria provar antes dela. A interação ao longo de várias rodadas entre o provador e o verificador não aumentou o poder computacional do verificador.

**O Paradigm da simulação**

Esse experimento está presente em toda a criptografia. Ele apresenta uma "visão real" e uma "visão simulada". 

Visão real: todos os históricos possíveis de interações entre o provador e o verificador (P,V)

Visão simulada: o verificador simula todas as interações possíveis entre o provador e o verificador 

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

Um distinguidor de tempo polinomial tenta determinar se está olhando para a visão real ou para a simulada e solicita repetidamente uma amostra de ambas.

Diz-se que as duas visões são "computacionalmente indistinguíveis" se, para todos os algoritmos/estratégias de distinção, mesmo depois de receber um número polinomial de amostras da visão real ou da simulada, a probabilidade é >1/2. 

**Argumentos de conhecimento de conhecimento zero**

Um protocolo interativo (P,V) é de conhecimento zero se existir um simulador (algoritmo) tal que, para todo verificador de tempo polinomial probabilístico (quando o teorema é correto), as distribuições de probabilidade que distinguem a visão real da simulada sejam computacionalmente indistinguíveis. 

Os protocolos interativos são úteis quando há um único verificador. Um exemplo seria um auditor fiscal em um aplicativo de "prova de impostos" de conhecimento zero.

## O que é um SNARK?

**Argumento de conhecimento sucinto e não interativo**

Definição ampla: uma prova sucinta de que uma afirmação é verdadeira. A prova deve ser curta e rápida de verificar. Nos SNARKs, uma única mensagem é enviada do provador ao verificador. O verificador pode então escolher aceitar ou rejeitar. 

exemplo de afirmação: "Eu conheço uma mensagem (m) tal que SHA256(m)=0"

Em um zk-SNARK, a prova não revela nada sobre a mensagem (m).

**Polinômios**: somas de termos que contêm uma constante (como 1, 2, 3), variáveis (como x, y, z) e expoentes de variáveis (como x², y³). 

exemplo: "3x² + 8x + 17"

**Circuito aritmético**: um modelo para calcular polinômios. De forma mais geral, pode ser definido como um grafo acíclico direcionado em que, em cada nó do grafo, é executada uma operação aritmética. O circuito é composto por portas de adição, portas de multiplicação e algumas portas constantes. Da mesma forma que os circuitos booleanos transportam bits nos fios, os circuitos aritméticos transportam números inteiros.


<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

Neste exemplo, o provador quer convencer o verificador de que conhece uma solução para o circuito aritmético.  

**Compromissos**: para isso, o provador coloca todos os valores (privados e públicos) associados ao circuito em um compromisso. Os compromissos ocultam suas entradas usando uma função cuja saída é irreversível.

O Sha256 é um exemplo de função hash que pode ser usada em um esquema de compromisso.

Depois que o provador se compromete com os valores, os compromissos são enviados ao verificador (com a confiança de que ele não consegue descobrir nenhum dos valores originais). O provador pode então demonstrar ao verificador o conhecimento de cada um dos valores nos nós do grafo. 

**Transformada de Fiat-Shamir**

Para tornar o protocolo *não interativo*, o provador gera a aleatoriedade (usada para o desafio oculto) em nome do verificador usando uma função hash criptográfica. Isso é conhecido como oráculo aleatório. O provador pode então enviar uma única mensagem ao verificador, que pode verificar se ela está correta. 

Para formar um SNARK que possa ser usado para circuitos genéricos, são necessários dois elementos:

Esquema de compromisso funcional: permite que quem se compromete faça um compromisso com um polinômio por meio de uma string curta, que pode ser usada por um verificador para confirmar as avaliações declaradas do polinômio comprometido.

Oráculo interativo polinomial: o verificador pede ao provador (algoritmo) que abra todos os compromissos em vários pontos de sua escolha, usando o esquema de compromisso polinomial, e verifica se a identidade se mantém verdadeira entre eles.

**Configuração**

Os procedimentos de configuração ajudam o verificador ao resumir um circuito e gerar parâmetros públicos. 

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**Tipos de configuração de pré-processamento**:

Configuração confiável por circuito - Executada separadamente para cada circuito. A string de referência comum (CRS) resultante contém parâmetros públicos usados por provadores e verificadores. É o material secreto intermediário da configuração ("lixo tóxico"), e não a CRS, que deve ser mantido em segredo e destruído. A [explicação sobre os parâmetros públicos](https://zodl.com/snark-parameters/) do ECC distingue os dois.

Se o material secreto de configuração necessário for retido ou recuperado, um provador desonesto pode conseguir produzir provas de afirmações falsas. Em uma cerimônia MPC, a segurança pode depender de pelo menos um participante seguir o protocolo e destruir sua contribuição secreta.

Configuração confiável, mas universal - Uma única configuração confiável produz parâmetros que podem ser usados para derivar chaves de prova e de verificação para vários circuitos dentro dos limites de tamanho suportados. Isso ainda envolve uma suposição de destruição do segredo; universal não significa transparente.

Configuração transparente (sem configuração confiável) - Os parâmetros públicos podem ser gerados sem uma armadilha secreta de configuração que alguém precise ser confiável para destruir. Isso não significa que a geração de provas não use aleatoriedade ou que o sistema não tenha parâmetros públicos. O [livro do Halo 2](https://zcash.github.io/halo2/background/pc-ipa.html#setup) dá um exemplo de parâmetros públicos de grupo.


**Tipos de construções de provas SNARK**:

[Groth16](https://eprint.iacr.org/2016/260): exige configuração confiável, mas tem provas muito curtas que podem ser verificadas rapidamente.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[PLONK](https://eprint.iacr.org/2019/953): configuração confiável universal.

[DARK](https://eprint.iacr.org/2019/1229)/[Halo](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): sem configuração confiável, mas produzem provas um pouco mais longas ou podem levar mais tempo para o provador executar. 

Os SNARKs são úteis quando são necessários vários verificadores, como em uma blockchain como o Zcash ou em um zk-Rollup como o [Aztec](https://docs.aztec.network), para que vários nós validadores não precisem interagir ao longo de várias rodadas com cada prova. 

## Como os zk-SNARK são implementados no Zcash?

De modo geral, as provas de conhecimento zero são uma ferramenta para garantir um comportamento honesto em protocolos sem revelar nenhuma informação. 

O Zcash é uma blockchain pública que viabiliza transações privadas. Os zk-SNARK são usados para provar que uma transação privada é válida segundo as regras de consenso da rede, sem revelar nenhum outro detalhe sobre a transação. 

[Vídeo explicativo](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Nesta palestra, Ariel Gabizon descreve a árvore de compromissos de notes do Zcash, a avaliação polinomial cega e os desafios homomorficamente ocultos, e como eles são implementados na rede. 

Leia o [livro do Halo2](https://zcash.github.io/halo2/index.html) para mais informações.

## Outras aplicações de conhecimento zero 

zk-SNARKs oferecem várias vantagens em uma variedade de aplicações diferentes. Vamos ver alguns exemplos.

**Escalabilidade**: é alcançada por meio da "terceirização da computação". Não há uma necessidade estrita de conhecimento zero para que uma chain L1 verifique o trabalho de um serviço off-chain. As transações não são necessariamente privadas em uma zk-EVM.

A vantagem de um serviço de Rollup baseado em provas (zk-Rollup) é processar um lote de centenas/milhares de transações, e a L1 consegue verificar uma prova sucinta de que todas as transações foram processadas corretamente, aumentando a vazão de transações da rede por um fator de 100 ou 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**Interoperabilidade**: é alcançada em uma ponte zk "bloqueando" ativos em uma chain de origem e provando à chain de destino que os ativos foram bloqueados (prova de consenso).

**Conformidade**: projetos como o [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) conseguem provar que uma transação privada está em conformidade com as leis bancárias locais sem revelar os detalhes da transação. 

**Combate à desinformação**: entre vários exemplos fora do universo da blockchain e das criptomoedas, está o uso da geração de provas em imagens processadas por veículos de notícias e de mídia, para permitir que os espectadores verifiquem de forma independente a origem de uma imagem e todas as operações realizadas nela. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Para saber mais: 

[Bibliografia de conhecimento zero - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARKs com Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 e SNARKs sem configurações confiáveis - Sean Bowe no Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Provas de conhecimento zero com Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Provas interativas de conhecimento zero - artigo da Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Aula 1: introdução e história das ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Explicação simples dos circuitos aritméticos - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[A escalabilidade é chata, a privacidade está morta: provas ZK, para que servem?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Páginas relacionadas

- [Pools blindados](/using-zcash/shielded-pools) — Como os zk-SNARKs são usados nos pools de valor Zcash
- [Halo](/zcash-tech/halo) — O sistema zk-SNARK do Zcash que elimina as configurações confiáveis
- [Segurança pós-quântica no Zcash](/zcash-tech/post-quantum-security) - Como os futuros riscos quânticos se relacionam com a criptografia Zcash
- [Ativos blindados do Zcash](/zcash-tech/zcash-shielded-assets) — ZSAs construídos com a tecnologia zk-SNARK
- [O que é o ZEC e o Zcash](/start-here/what-is-zec-and-zcash) — Introdução ao Zcash e ao seu modelo de privacidade
- [Quem pode ver o seu pagamento em Zcash?](/start-here/who-can-see-your-zcash-payment) — O que permanece público e o que a blindagem oculta
