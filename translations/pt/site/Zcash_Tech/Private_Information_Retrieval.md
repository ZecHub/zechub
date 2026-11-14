# Recuperação privada de informações

## TL;DR

- A recuperação privada de informações, ou PIR, permite que um dispositivo busque um item do banco de dados de um servidor sem que o servidor saiba qual item foi solicitado
- Zcash precisa disso porque uma carteira privada não pode perguntar a um servidor quais transações são suas sem se denunciar
- Hoje, as carteiras baixam e escaneiam muito mais dados do que precisam, o que é um dos principais motivos pelos quais a sincronização é lenta
- A PIR permitiria que uma carteira buscasse apenas os próprios dados de forma privada, eliminando esse gargalo e mantendo a privacidade intacta
- É uma área de pesquisa ativa para o Zcash, poderosa na teoria e que está sendo tornada prática para carteiras reais

<br/>

## Para quem é

- Qualquer pessoa que já se perguntou como uma carteira privada encontra as próprias moedas sem revelar quais são
- Iniciantes que veem a PIR sendo mencionada junto com o trabalho de escalabilidade do Zcash
- Leitores que querem primeiro o conceito e, depois, a criptografia por trás dele

<br/>

## O problema que a PIR resolve para o Zcash

O Zcash oculta para quem uma transação é destinada. Essa privacidade cria uma questão incômoda: se a rede não consegue ver quais transações pertencem a você, como a sua própria carteira as encontra?

Hoje a resposta é direta. Uma carteira não pode perguntar a um servidor quais transações são suas, porque essa pergunta revelaria exatamente o que o Zcash está tentando ocultar. Então, em vez disso, a carteira baixa uma grande quantidade de dados e testa cada item localmente para ver o que lhe pertence. Funciona e preserva a privacidade, mas é lento e pesado. Esse escaneamento é um dos principais motivos pelos quais a sincronização da carteira pode parecer lenta.

O ideal seria uma forma de a carteira pedir a um servidor exatamente os seus próprios dados e recebê-los, sem que o servidor jamais soubesse o que foi solicitado. É exatamente isso que a recuperação privada de informações oferece.

<br/>

## O que é a PIR

A recuperação privada de informações é um método criptográfico que permite que um cliente leia uma entrada do banco de dados de um servidor sem revelar ao servidor qual entrada leu.

Imagine uma biblioteca onde você pode receber exatamente o livro que deseja, mas o bibliotecário nunca descobre qual livro entregou a você. Você recebe o seu item e o seu interesse continua privado. A PIR é a versão matemática dessa ideia, aplicada a qualquer banco de dados.

O conceito é estudado na criptografia há décadas. Ele foi apresentado pela primeira vez em 1995 por Chor, Goldreich, Kushilevitz e Sudan, que descreveram a abordagem com múltiplos servidores, e a primeira versão com um único servidor veio em 1997, de Kushilevitz e Ostrovsky. Não é algo que o Zcash inventou: é um campo consolidado que o Zcash está agora aplicando a um problema real e persistente.

<br/>

## Como a PIR funciona, em um primeiro nível

Há duas formas gerais de construir a PIR, e a diferença importa.

A primeira usa múltiplos servidores. O cliente envia a cada um de vários servidores uma parte da consulta e combina as respostas localmente. Nenhum servidor isolado vê o suficiente para saber o que foi solicitado. Isso é eficiente, mas depende de os servidores não estarem em conluio entre si, o que é difícil de garantir no mundo real.

A segunda usa um único servidor e uma criptografia engenhosa em vez de múltiplas partes. Aqui o cliente depende de uma ferramenta especial chamada criptografia homomórfica, e essa é a direção mais útil para implantações reais, porque não precisa de múltiplos servidores que não estejam em conluio.

<br/>

## O mecanismo: criptografia homomórfica

A criptografia homomórfica é um tipo de criptografia que permite que um servidor faça cálculos sobre dados enquanto eles continuam criptografados. O servidor produz uma resposta criptografada correta sem nunca ver os valores subjacentes.

Esta é a ideia por trás da PIR com um único servidor construída dessa forma. O cliente quer o item número três de uma lista. Ele monta uma consulta que é, na prática, um "sim" criptografado para a posição três e um "não" criptografado para todas as outras posições. Para o servidor, essa consulta é apenas um ruído sem sentido: ele não consegue dizer qual posição contém o "sim".

O servidor então combina o seu banco de dados com essa consulta criptografada usando as propriedades especiais da criptografia homomórfica, multiplicando cada item armazenado pelo "sim" ou "não" criptografado correspondente e somando os resultados. O que sai é um único pacote criptografado que contém exatamente o item que o cliente queria, e nada revela qual foi. O cliente descriptografa esse pacote e lê o seu item. O servidor respondeu à pergunta sem nunca conhecer a pergunta.

Uma versão mais forte, chamada PIR simétrica, acrescenta uma segunda garantia: o cliente fica sabendo apenas o item que pediu e nada sobre qualquer outra entrada do banco de dados. Isso protege tanto o banco de dados quanto o cliente.

<br/>

## Um olhar mais detalhado para leitores técnicos

Os esquemas modernos com um único servidor são construídos com base em criptografia de reticulados, mais comumente na suposição de aprendizado com erros. A consulta do cliente é um vetor de textos cifrados, uma criptografia de um no índice-alvo e de zero nas demais posições, e a criptografia é aditivamente homomórfica, de modo que o servidor pode somar textos cifrados e multiplicá-los por entradas do banco de dados em texto claro sem descriptografar.

O servidor trata o banco de dados como uma matriz, aplica o vetor de seleção criptografado e retorna um único texto cifrado que, ao ser descriptografado, resulta na linha desejada. Como a consulta é indistinguível de um ruído aleatório, o servidor não obtém nenhuma informação sobre o índice.

O obstáculo histórico sempre foi o custo. De forma ingênua, o servidor precisa acessar todas as entradas do banco de dados a cada consulta, o que é caro em processamento, e os textos cifrados são grandes, o que é caro em largura de banda. Pesquisas recentes atacam esse problema com pré-processamento: esquemas como SimplePIR e FrodoPIR permitem que o servidor prepare o banco de dados com antecedência e entregue a cada cliente uma pequena dica, transferindo grande parte do trabalho para uma fase offline, de modo que as consultas em tempo real se tornem rápidas. Um benefício adicional útil é que as construções baseadas em reticulados também são consideradas resistentes a ataques quânticos, o que se alinha ao movimento mais amplo do Zcash em direção à privacidade pós-quântica.

<br/>

## PIR no Zcash

A PIR faz parte do esforço para tornar o Zcash ao mesmo tempo privado e rápido em larga escala.

O alvo é o gargalo de escaneamento das carteiras descrito anteriormente. Um trabalho na Valar Group está desenvolvendo técnicas de recuperação privada de informações para que uma carteira possa buscar os próprios dados em um servidor sem que o servidor saiba quais entradas foram solicitadas. Uma aplicação concreta é a verificação privada de nulificadores. Um nulificador é um marcador único publicado quando uma note é gasta, o que impede que os mesmos fundos sejam gastos duas vezes. Muitas vezes, uma carteira precisa verificar se determinado nulificador já apareceu, ou seja, se uma note ainda não foi gasta, e fazer isso hoje por meio de um servidor pode revelar sobre qual note está sendo feita a consulta. A recuperação privada de informações permite que a carteira faça essa pergunta sem revelar qual nulificador lhe interessa. Isso se soma a outros trabalhos de escalabilidade, incluindo o Projeto Tachyon e novos softwares de nó, voltados a eliminar os limites de desempenho que hoje restringem as carteiras privadas.

É importante ser honesto sobre o estágio atual. Trata-se de pesquisa e engenharia em andamento, não de um recurso finalizado e lançado. O conceito é bem estabelecido e a direção está definida, mas tornar a PIR eficiente o bastante para carteiras do dia a dia em dispositivos comuns é justamente a parte difícil em que se está trabalhando agora.

<br/>

## Equívocos comuns

- A PIR oculta qual item você solicitou, mas não necessariamente oculta o fato de você ter contatado o servidor; os metadados no nível da rede são uma questão separada
- A PIR não é exclusiva do Zcash: é uma ferramenta criptográfica geral que o Zcash está aplicando à privacidade das carteiras
- A sincronização mais rápida graças à PIR é um objetivo em andamento, não um recurso já presente nas carteiras
- Baixar tudo e escanear localmente, a abordagem atual, é privado, mas lento; a PIR busca manter a privacidade eliminando a lentidão

<br/>

## Páginas relacionadas

- [Sincronização de carteiras do Zcash](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - por que a sincronização funciona do jeito que funciona hoje
- [Nós de lightwallet](https://zechub.wiki/zcash-tech/lightwallet-nodes) - o modelo de light client que a PIR aprimoraria
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - a outra grande ferramenta criptográfica por trás da privacidade do Zcash
- [Segurança pós-quântica](https://zechub.wiki/zcash-tech/post-quantum-security) - por que os métodos baseados em reticulados são importantes para o futuro
