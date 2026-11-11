# Recuperação privada de informações

## TL;DR

- A recuperação privada de informações, ou PIR, permite que um dispositivo obtenha um item do banco de dados de um servidor sem que o servidor saiba qual item foi solicitado
- O Zcash precisa disso porque uma carteira privada não pode perguntar a um servidor quais transações são suas sem se denunciar
- Hoje, as carteiras baixam e analisam muito mais dados do que precisam, o que é uma das principais razões pelas quais a sincronização é lenta
- O PIR permitiria que uma carteira obtivesse apenas seus próprios dados de forma privada, removendo esse gargalo e mantendo a privacidade intacta
- É uma área de pesquisa ativa para o Zcash, poderosa em teoria e que está sendo tornada prática para carteiras reais

<br/>

## Para quem é

- Qualquer pessoa que já se perguntou como uma carteira privada encontra suas próprias moedas sem revelar quais são
- Iniciantes que continuam vendo o PIR mencionado junto ao trabalho de escalabilidade do Zcash
- Leitores que querem primeiro o conceito e só depois a criptografia por trás dele

<br/>

## O problema que o PIR resolve para o Zcash

O Zcash esconde para quem é uma transação. Essa privacidade cria uma questão incômoda: se a rede não consegue ver quais transações pertencem a você, como sua própria carteira as encontra?

Hoje, a resposta é direta. Uma carteira não pode perguntar a um servidor quais transações são minhas, porque essa pergunta revelaria exatamente aquilo que o Zcash está tentando esconder. Por isso, a carteira baixa uma grande quantidade de dados e testa cada item localmente para ver o que pertence a ela. Funciona e preserva a privacidade, mas é lento e pesado. Essa análise é uma das principais razões pelas quais a sincronização da carteira pode parecer lenta.

O ideal seria uma forma de uma carteira pedir a um servidor precisamente seus próprios dados e recebê-los sem que o servidor jamais soubesse o que foi solicitado. É exatamente isso que a recuperação privada de informações fornece.

<br/>

## O que é o PIR

A recuperação privada de informações é um método criptográfico que permite a um cliente ler uma entrada do banco de dados de um servidor sem revelar ao servidor qual entrada ele leu.

Imagine uma biblioteca onde você pode receber exatamente o livro que quer, mas o bibliotecário nunca descobre qual livro entregou a você. Você recebe seu item, e seu interesse permanece privado. O PIR é a versão matemática dessa ideia, aplicada a qualquer banco de dados.

O conceito vem sendo estudado em criptografia há décadas. Foi introduzido pela primeira vez em 1995 por Chor, Goldreich, Kushilevitz e Sudan, que descreveram a abordagem com múltiplos servidores, e a primeira versão com um único servidor surgiu em 1997, de Kushilevitz e Ostrovsky. Não é algo que o Zcash tenha inventado; é um campo estabelecido que o Zcash está agora aplicando a um problema real e persistente.

<br/>

## Como o PIR funciona, em um primeiro nível

Existem duas formas gerais de construir o PIR, e a diferença é importante.

A primeira usa múltiplos servidores. O cliente envia a cada um de vários servidores uma parte da consulta e combina suas respectivas respostas localmente. Nenhum servidor isolado vê o suficiente para descobrir o que foi solicitado. Isso é eficiente, mas depende de os servidores não conspirarem entre si, algo difícil de garantir no mundo real.

A segunda usa um único servidor e criptografia engenhosa em vez de múltiplas partes. Aqui o cliente depende de uma ferramenta especial chamada criptografia homomórfica, e essa é a direção mais útil para implementações reais, porque não precisa de múltiplos servidores que não colaborem entre si.

<br/>

## O mecanismo: criptografia homomórfica

A criptografia homomórfica é um tipo de criptografia que permite a um servidor calcular sobre dados enquanto eles permanecem criptografados. O servidor produz uma resposta criptografada correta sem nunca ver os valores subjacentes.

Esta é a ideia por trás do PIR com um único servidor construído dessa forma. O cliente quer o item número três de uma lista. Ele constrói uma consulta que é, na prática, um sim criptografado para a posição três e um não criptografado para todas as outras posições. Para o servidor, essa consulta é apenas ruído sem significado; ele não consegue perceber qual posição contém o sim.

O servidor então combina seu banco de dados com essa consulta criptografada usando as propriedades especiais da criptografia homomórfica, multiplicando cada item armazenado pelo sim ou não criptografado correspondente e somando os resultados. O resultado é um único pacote criptografado que contém exatamente o item que o cliente queria, e nada revela qual era. O cliente descriptografa esse pacote e lê seu item. O servidor respondeu à pergunta sem nunca conhecer a pergunta.

Uma versão mais forte, chamada PIR simétrico, acrescenta uma segunda garantia: o cliente aprende apenas o item que solicitou e nada sobre qualquer outra entrada do banco de dados. Isso protege o banco de dados e o cliente.

<br/>

## Uma análise mais detalhada para leitores técnicos

Os esquemas modernos com um único servidor são construídos sobre criptografia de reticulados, mais frequentemente sobre a hipótese de learning with errors. A consulta do cliente é um vetor de textos cifrados, uma criptografia de um no índice-alvo e zero nos demais, e a criptografia é homomórfica aditiva, de modo que o servidor pode somar textos cifrados e multiplicá-los por entradas do banco de dados em texto simples sem descriptografar.

O servidor trata o banco de dados como uma matriz, aplica o vetor de seleção criptografado e devolve um único texto cifrado que é descriptografado para a linha desejada. Como a consulta é indistinguível de ruído aleatório, o servidor não obtém nenhuma informação sobre o índice.

O obstáculo histórico sempre foi o custo. De forma ingênua, o servidor precisa acessar cada entrada do banco de dados para cada consulta, o que é caro em computação, e os textos cifrados são grandes, o que é caro em largura de banda. Pesquisas recentes enfrentam isso com pré-processamento; esquemas como SimplePIR e FrodoPIR permitem que o servidor prepare o banco de dados antecipadamente e dê a cada cliente uma pequena dica, transferindo grande parte do trabalho para uma fase offline para que as consultas em tempo real se tornem rápidas. Um benefício colateral útil é que as construções baseadas em reticulados também são consideradas resistentes a ataques quânticos, o que está alinhado com o movimento mais amplo do Zcash em direção à privacidade pós-quântica.

<br/>

## PIR no Zcash

O PIR faz parte do esforço para tornar o Zcash simultaneamente privado e rápido em escala.

O gargalo de análise da carteira descrito anteriormente é o alvo. O trabalho no Valar Group está desenvolvendo técnicas de recuperação privada de informações para que uma carteira possa obter seus próprios dados de um servidor sem que o servidor saiba quais entradas foram solicitadas. Uma aplicação concreta é verificar nulificadores de forma privada. Um nulificador é um marcador único publicado quando uma note é gasta, o que impede que os mesmos fundos sejam gastos duas vezes. Uma carteira frequentemente precisa verificar se um determinado nulificador já apareceu, ou seja, se uma note ainda não foi gasta, e fazer isso por meio de um servidor hoje pode revelar sobre qual note ela está perguntando. A recuperação privada de informações permite que a carteira faça essa pergunta sem revelar qual nulificador é importante para ela. Isso ocorre junto a outros trabalhos de escalabilidade, incluindo o Project Tachyon e um novo software de nó, com o objetivo de remover os limites de desempenho que hoje impedem as carteiras privadas.

É importante ser honesto quanto ao estágio em que isso está. Trata-se de pesquisa e engenharia ativas, não de uma funcionalidade concluída e já lançada. O conceito está bem estabelecido e a direção está definida, mas tornar o PIR suficientemente eficiente para carteiras do dia a dia em dispositivos comuns é precisamente a parte difícil em que se está trabalhando agora.

<br/>

## Equívocos comuns

- O PIR esconde qual item você solicitou, mas não esconde necessariamente o fato de você ter entrado em contato com o servidor; os metadados no nível da rede são uma preocupação separada
- O PIR não é exclusivo do Zcash, é uma ferramenta criptográfica geral que o Zcash está aplicando à privacidade das carteiras
- A sincronização mais rápida graças ao PIR é um objetivo em andamento, não uma funcionalidade já presente nas carteiras
- Baixar tudo e analisar localmente, a abordagem atual, é privado, mas lento; o PIR busca manter a privacidade e eliminar a lentidão

<br/>

## Páginas relacionadas

- [Sincronização de carteiras Zcash](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - por que a sincronização funciona hoje da forma como funciona
- [Nós Lightwallet](https://zechub.wiki/zcash-tech/lightwallet-nodes) - o modelo de light client que o PIR melhoraria
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - a outra grande ferramenta criptográfica por trás da privacidade do Zcash
- [Segurança pós-quântica](https://zechub.wiki/zcash-tech/post-quantum-security) - por que os métodos baseados em reticulados são importantes para o futuro
