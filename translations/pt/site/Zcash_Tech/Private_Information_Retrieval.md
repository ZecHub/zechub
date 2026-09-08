# Recuperação privada de informação

## TL;DR

- A recuperação privada de informação, ou PIR, permite que um dispositivo obtenha um item da base de dados de um servidor sem que o servidor saiba qual foi o item pedido
- O Zcash precisa disto porque uma wallet privada não pode perguntar a um servidor quais transações são suas sem se denunciar
- Hoje, as wallets descarregam e analisam muito mais dados do que precisam, o que é uma das principais razões pelas quais a sincronização é lenta
- O PIR permitiria a uma wallet obter apenas os seus próprios dados de forma privada, removendo esse estrangulamento e mantendo a privacidade intacta
- É uma área de investigação ativa para o Zcash, poderosa em teoria, e que está a ser tornada prática para wallets reais

<br/>

## A quem se destina

- Qualquer pessoa que se tenha perguntado como é que uma wallet privada encontra as suas próprias moedas sem revelar quais são
- Iniciantes que continuam a ver o PIR mencionado ao lado do trabalho de escalabilidade do Zcash
- Leitores que querem primeiro o conceito e só depois a criptografia subjacente

<br/>

## O problema que o PIR resolve para o Zcash

O Zcash esconde para quem é uma transação. Essa privacidade cria uma questão incómoda: se a rede não consegue ver quais transações lhe pertencem, como é que a sua própria wallet as encontra?

Hoje, a resposta é direta. Uma wallet não pode perguntar a um servidor quais transações são minhas, porque essa pergunta revelaria exatamente aquilo que o Zcash está a tentar esconder. Por isso, em vez disso, a wallet descarrega uma grande quantidade de dados e testa cada item localmente para ver o que lhe pertence. Funciona, e preserva a privacidade, mas é lento e pesado. Esta análise é uma das principais razões pelas quais a sincronização da wallet pode parecer lenta.

O ideal seria uma forma de uma wallet pedir a um servidor precisamente os seus próprios dados, e recebê-los, sem que o servidor alguma vez soubesse o que foi pedido. É exatamente isso que a recuperação privada de informação fornece.

<br/>

## O que é o PIR

A recuperação privada de informação é um método criptográfico que permite a um cliente ler uma entrada de uma base de dados de um servidor sem revelar ao servidor qual foi a entrada lida.

Imagine uma biblioteca onde pode receber exatamente o livro que quer, mas o bibliotecário nunca descobre qual foi o livro que lhe entregou. Recebe o seu item e o seu interesse mantém-se privado. O PIR é a versão matemática dessa ideia, aplicada a qualquer base de dados.

O conceito tem sido estudado em criptografia há décadas. Foi introduzido pela primeira vez em 1995 por Chor, Goldreich, Kushilevitz e Sudan, que descreveram a abordagem com múltiplos servidores, e a primeira versão com um único servidor surgiu em 1997 por Kushilevitz e Ostrovsky. Não é algo que o Zcash tenha inventado, é um campo estabelecido que o Zcash está agora a aplicar a um problema real e persistente.

<br/>

## Como o PIR funciona, num primeiro nível

Existem duas formas gerais de construir PIR, e a diferença é importante.

A primeira usa múltiplos servidores. O cliente envia a cada um de vários servidores uma parte da consulta e combina localmente as respetivas respostas. Nenhum servidor isolado vê o suficiente para descobrir o que foi pedido. Isto é eficiente, mas depende de os servidores não conluiarem entre si, algo difícil de garantir no mundo real.

A segunda usa um único servidor e criptografia engenhosa em vez de múltiplas partes. Aqui o cliente depende de uma ferramenta especial chamada encriptação homomórfica, e esta é a direção mais útil para implementações reais, porque não precisa de múltiplos servidores que não colaborem entre si.

<br/>

## O mecanismo: encriptação homomórfica

A encriptação homomórfica é um tipo de encriptação que permite a um servidor calcular sobre dados enquanto estes permanecem encriptados. O servidor produz uma resposta encriptada correta sem nunca ver os valores subjacentes.

Eis a ideia por trás do PIR com um único servidor construído desta forma. O cliente quer o item número três de uma lista. Constrói uma consulta que é, na prática, um sim encriptado para a posição três e um não encriptado para todas as outras posições. Para o servidor, esta consulta é apenas ruído sem significado, não consegue perceber qual a posição que contém o sim.

O servidor combina então a sua base de dados com esta consulta encriptada usando as propriedades especiais da encriptação homomórfica, multiplicando cada item armazenado pelo correspondente sim ou não encriptado e somando os resultados. O que sai é um único pacote encriptado que contém exatamente o item que o cliente queria, e nada revela qual era. O cliente desencripta esse pacote e lê o seu item. O servidor respondeu à pergunta sem nunca conhecer a pergunta.

Uma versão mais forte, chamada PIR simétrico, acrescenta uma segunda garantia: o cliente aprende apenas o item que pediu e nada sobre qualquer outra entrada da base de dados. Isso protege a base de dados, bem como o cliente.

<br/>

## Uma análise mais detalhada para leitores técnicos

Os esquemas modernos com um único servidor são construídos sobre criptografia de reticulados, mais frequentemente sobre a hipótese learning with errors. A consulta do cliente é um vetor de textos cifrados, uma encriptação de um no índice alvo e zero nos restantes, e a encriptação é homomórfica aditiva, pelo que o servidor pode somar textos cifrados e multiplicá-los por entradas em texto simples da base de dados sem desencriptar.

O servidor trata a base de dados como uma matriz, aplica o vetor de seleção encriptado e devolve um único texto cifrado que se desencripta para a linha pretendida. Como a consulta é indistinguível de ruído aleatório, o servidor não obtém qualquer informação sobre o índice.

O obstáculo histórico foi sempre o custo. De forma ingénua, o servidor tem de tocar em cada entrada da base de dados para cada consulta, o que é dispendioso em computação, e os textos cifrados são grandes, o que é dispendioso em largura de banda. A investigação recente ataca isto com pré-processamento; esquemas como SimplePIR e FrodoPIR permitem ao servidor preparar a base de dados antecipadamente e dar a cada cliente uma pequena pista, transferindo grande parte do trabalho para uma fase offline para que as consultas em tempo real se tornem rápidas. Um benefício colateral útil é que as construções baseadas em reticulados também são consideradas resistentes a ataques quânticos, o que está alinhado com o movimento mais amplo do Zcash em direção à privacidade pós-quântica.

<br/>

## PIR no Zcash

O PIR faz parte do esforço para tornar o Zcash simultaneamente privado e rápido à escala.

O estrangulamento da análise da wallet descrito anteriormente é o alvo. O trabalho no Valar Group está a desenvolver técnicas de recuperação privada de informação para que uma wallet possa obter os seus próprios dados de um servidor sem que o servidor saiba quais entradas foram pedidas. Uma aplicação concreta é verificar nullifiers de forma privada. Um nullifier é um marcador único publicado quando uma note é gasta, o que impede que os mesmos fundos sejam gastos duas vezes. Uma wallet precisa frequentemente de verificar se um determinado nullifier já apareceu, por outras palavras, se uma note ainda não foi gasta, e fazer isso através de um servidor hoje pode revelar sobre que note se está a perguntar. A recuperação privada de informação permite à wallet fazer essa pergunta sem revelar qual o nullifier que lhe interessa. Isto surge em paralelo com outro trabalho de escalabilidade, incluindo o Project Tachyon e novo software de nó, com o objetivo de remover os limites de desempenho que hoje travam as wallets privadas.

É importante ser honesto quanto à fase em que isto está. Trata-se de investigação e engenharia ativas, não de uma funcionalidade acabada e já disponibilizada. O conceito está bem estabelecido e a direção está definida, mas tornar o PIR suficientemente eficiente para wallets do dia a dia em dispositivos comuns é precisamente a parte difícil em que se está a trabalhar agora.

<br/>

## Equívocos comuns

- O PIR esconde qual o item que pediu, mas não esconde necessariamente o facto de ter contactado o servidor; os metadados ao nível da rede são uma preocupação separada
- O PIR não é exclusivo do Zcash, é uma ferramenta criptográfica geral que o Zcash está a aplicar à privacidade das wallets
- A sincronização mais rápida graças ao PIR é um objetivo em progresso, não uma funcionalidade já presente nas wallets
- Descarregar tudo e analisar localmente, a abordagem atual, é privado mas lento; o PIR pretende manter a privacidade removendo a lentidão

<br/>

## Páginas relacionadas

- [Sincronização de Wallets Zcash](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - porque é que a sincronização funciona hoje da forma como funciona
- [Nós Lightwallet](https://zechub.wiki/zcash-tech/lightwallet-nodes) - o modelo de cliente leve que o PIR melhoraria
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - a outra grande ferramenta criptográfica por trás da privacidade do Zcash
- [Segurança Pós-Quântica](https://zechub.wiki/zcash-tech/post-quantum-security) - porque é que os métodos baseados em reticulados são importantes para o futuro
