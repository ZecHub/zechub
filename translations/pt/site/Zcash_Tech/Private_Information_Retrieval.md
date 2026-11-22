# Recuperação privada de informações

## Resumo

- A recuperação privada de informações, ou PIR, permite que um dispositivo busque um item no banco de dados de um servidor sem que o servidor saiba qual item foi solicitado
- Zcash precisa disso porque uma carteira privada não pode perguntar a um servidor quais transações são suas sem se identificar
- Hoje, as carteiras baixam e examinam muito mais dados do que precisam, o que é um dos principais motivos para a sincronização ser lenta
- A PIR permitiria que uma carteira buscasse apenas os próprios dados de forma privada, eliminando esse gargalo e preservando a privacidade
- É uma área ativa de pesquisa para Zcash, poderosa em teoria e que está sendo tornada prática para carteiras reais
- Uma demonstração ao vivo já está disponível: [ZecBlock Private](https://private.zecblock.com) é o primeiro explorador de blocos Zcash completo baseado em PIR (transações, blocos e endereços)

## Para quem é este conteúdo

- Qualquer pessoa que já tenha se perguntado como uma carteira privada encontra suas próprias moedas sem revelar quais são
- Iniciantes que continuam vendo PIR ser mencionada junto com o trabalho de escalabilidade do Zcash
- Leitores que querem entender o conceito primeiro e a criptografia por trás dele depois
- Qualquer pessoa curiosa para conhecer um explorador de blocos funcional baseado em PIR

## O problema que a PIR resolve para Zcash

Zcash oculta para quem é uma transação. Essa privacidade cria uma pergunta difícil: se a rede não consegue ver quais transações pertencem a você, como sua carteira encontra essas transações?

Hoje, a resposta é direta. Uma carteira não pode perguntar a um servidor quais transações são minhas, porque essa pergunta revelaria exatamente o que Zcash tenta ocultar. Por isso, a carteira baixa uma grande quantidade de dados e verifica cada item localmente para descobrir o que pertence a ela. Funciona e preserva a privacidade, mas é lento e exige muitos recursos. Essa verificação é um dos principais motivos para a sincronização da carteira parecer demorada.

O ideal seria a carteira poder pedir ao servidor exatamente os próprios dados e recebê-los sem que o servidor jamais soubesse o que foi solicitado. É exatamente isso que a recuperação privada de informações oferece.

## O que é PIR

A recuperação privada de informações é um método criptográfico que permite que um cliente leia uma entrada do banco de dados de um servidor sem revelar ao servidor qual entrada leu.

Imagine uma biblioteca em que você recebe exatamente o livro que quer, mas o bibliotecário nunca descobre qual livro entregou. Você recebe o item e seu interesse continua privado. A PIR é a versão matemática dessa ideia, aplicada a qualquer banco de dados.

O conceito vem sendo estudado em criptografia há décadas. Foi apresentado pela primeira vez em 1995 por Chor, Goldreich, Kushilevitz e Sudan, que descreveram a abordagem com vários servidores. A primeira versão com um único servidor veio em 1997, de Kushilevitz e Ostrovsky. Não foi algo que Zcash inventou: é um campo estabelecido que Zcash está aplicando agora a um problema real e persistente.

## Como a PIR funciona: uma primeira explicação

Há duas formas gerais de criar PIR, e a diferença é importante.

A primeira usa vários servidores. O cliente envia uma parte da consulta a cada um de vários servidores e combina as respostas localmente. Nenhum servidor isolado vê informações suficientes para descobrir o que foi solicitado. Essa abordagem é eficiente, mas depende de os servidores não conspirarem entre si, algo difícil de garantir no mundo real.

A segunda usa um único servidor e criptografia sofisticada em vez de várias partes. Nesse caso, o cliente depende de uma ferramenta especial chamada criptografia homomórfica. Essa é a abordagem mais útil para implementações reais, porque não precisa de vários servidores que não conspirem entre si.

## O mecanismo: criptografia homomórfica

A criptografia homomórfica é um tipo de criptografia que permite que um servidor processe dados enquanto eles permanecem criptografados. O servidor produz uma resposta criptografada correta sem jamais ver os valores originais.

Veja como funciona a PIR com um único servidor construída dessa forma. O cliente quer o item número três de uma lista. Ele cria uma consulta que, na prática, é um "sim" criptografado para a posição três e um "não" criptografado para todas as outras posições. Para o servidor, essa consulta é apenas ruído sem sentido: ele não consegue identificar qual posição contém o "sim".

Em seguida, o servidor combina o banco de dados com essa consulta criptografada usando as propriedades especiais da criptografia homomórfica. Ele multiplica cada item armazenado pelo "sim" ou "não" criptografado correspondente e soma os resultados. O resultado é um único pacote criptografado que contém exatamente o item desejado pelo cliente, sem revelar qual era. O cliente descriptografa o pacote e lê o item. O servidor respondeu à pergunta sem jamais saber qual era a pergunta.

Uma versão mais forte, chamada PIR simétrica, acrescenta uma segunda garantia: o cliente aprende somente o item que pediu e nada sobre as outras entradas do banco de dados. Isso protege tanto o banco de dados quanto o cliente.

## Um olhar mais detalhado para leitores técnicos

Os esquemas modernos com um único servidor são construídos sobre criptografia de reticulados, geralmente com base na hipótese de aprendizado com erros. A consulta do cliente é um vetor de textos cifrados: a criptografia de um na posição desejada e de zero nas demais. A criptografia é homomórfica aditivamente, então o servidor pode somar textos cifrados e multiplicá-los por entradas do banco de dados em texto simples sem descriptografar.

O servidor trata o banco de dados como uma matriz, aplica o vetor de seleção criptografado e retorna um único texto cifrado que, quando descriptografado, resulta na linha desejada. Como a consulta é indistinguível de ruído aleatório, o servidor não obtém informações sobre o índice.

O obstáculo histórico sempre foi o custo. De forma ingênua, o servidor precisa acessar cada entrada do banco de dados para cada consulta, o que exige muito processamento. Os textos cifrados também são grandes, o que exige muita largura de banda. Pesquisas recentes enfrentam esse problema com pré-processamento. Esquemas como SimplePIR e FrodoPIR permitem que o servidor prepare o banco de dados com antecedência e forneça a cada cliente uma pequena dica, transferindo grande parte do trabalho para uma etapa offline e tornando rápidas as consultas ao vivo. Um benefício adicional é que construções baseadas em reticulados também são consideradas resistentes a ataques quânticos, o que está alinhado à mudança mais ampla de Zcash em direção à privacidade pós-quântica.

## PIR no Zcash

A PIR faz parte dos esforços para tornar o Zcash privado e rápido em grande escala.

O objetivo é resolver o gargalo da verificação da carteira descrito anteriormente. A equipe do Valar Group está desenvolvendo técnicas de recuperação privada de informações para que uma carteira possa buscar os próprios dados em um servidor sem que o servidor saiba quais entradas foram solicitadas. Uma aplicação concreta é verificar nulificadores de forma privada. Um nulificador é um marcador único publicado quando uma note é gasta, que impede que os mesmos fundos sejam gastos duas vezes. Muitas vezes, uma carteira precisa verificar se determinado nulificador já apareceu, ou seja, se uma note continua não gasta. Fazer isso por meio de um servidor hoje pode revelar qual note está sendo consultada. A recuperação privada de informações permite que a carteira faça essa pergunta sem revelar com qual nulificador está preocupada. Isso se soma a outros trabalhos de escalabilidade, incluindo o Project Tachyon e novos softwares de nó, que buscam remover os limites de desempenho que hoje dificultam o uso de carteiras privadas.

É importante ser transparente sobre o estágio atual. Trata-se de pesquisa e engenharia em andamento, não de um recurso concluído e lançado. O conceito está bem estabelecido e a direção está definida, mas tornar a PIR eficiente o bastante para carteiras usadas no dia a dia em dispositivos comuns é justamente a parte difícil que está sendo trabalhada agora.

## Exemplo ao vivo: ZecBlock Private

Em novembro de 2026, ZecBlock lançou **ZecBlock Private** (private.zecblock.com), uma versão de seu explorador que usa recuperação privada de informações para consultas de transações, blocos e endereços.

Este é o primeiro explorador de blocos Zcash completo (que inclui transações, blocos e endereços) criado com base em PIR. Demonstrações anteriores de exploradores com PIR se limitavam a consultas mais restritas, como saldos de endereços.

### Como funcionam as consultas privadas

- A consulta (ID da transação, altura/hash do bloco ou endereço) é criptografada inteiramente no navegador antes de ser enviada.
- O servidor processa todo o conjunto de dados publicado sem saber qual registro foi solicitado.
- O servidor retorna uma única resposta criptografada que somente o navegador pode descriptografar.
- Uma busca por algo que existe é indistinguível de uma busca por algo que não existe (mesmo tamanho e formato da solicitação).

Após cada busca, o site mostra um breve resumo do que foi enviado, facilitando a inspeção da propriedade de privacidade.

### Etapas de verificação

Cada publicação de dados é assinada. O navegador verifica a assinatura de cada resultado antes de exibi-lo, impedindo que um servidor mal-intencionado ou com erros substitua os dados por outros.

### Atualização dos dados

Novos blocos são publicados a cada poucos segundos. Os dados do explorador privado normalmente ficam a cerca de 20 segundos de diferença em relação ao explorador ZecBlock comum.

### Custos de largura de banda

A PIR é mais cara do que uma consulta comum porque o servidor precisa acessar todo o conjunto de dados:

- Consulta de transação: cerca de 1,2 MB enviados
- Consulta de endereço: cerca de 0,4 MB enviados

Esse é o custo prático para impedir que o servidor saiba o conteúdo da consulta.

### Implementação no cliente

O cliente do navegador é um wrapper de Rust → WebAssembly (atualmente no repositório ZecBlock, em `prototype/pir-browser`). Ele é construído sobre bibliotecas de PIR de código aberto do Valar Group. O wrapper ainda não foi publicado como um pacote npm independente, mas isso está nos planos.

### Diferença em relação à PIR para carteiras

ZecBlock Private demonstra o uso de PIR para dados de chain **públicos** (consultar uma transação, um bloco ou um endereço conhecido sem revelar qual deles). Isso **não** resolve o problema mais difícil de a carteira descobrir de forma privada quais notes pertencem a uma chave de visualização ou verificar de forma privada quais nulificadores correspondem a notes não gastas. Essas continuam sendo áreas de pesquisa ativa.

## Equívocos comuns

- A PIR oculta qual item você solicitou, mas não necessariamente oculta o fato de que você entrou em contato com o servidor; os metadados no nível da rede são uma questão separada
- A PIR não é exclusiva do Zcash; é uma ferramenta criptográfica geral que Zcash está aplicando à privacidade das carteiras
- A sincronização mais rápida com PIR é um objetivo em andamento, não um recurso já presente nas carteiras
- Baixar tudo e examinar os dados localmente, que é a abordagem atual, preserva a privacidade, mas é lento; a PIR busca preservar a privacidade e eliminar a lentidão

## Páginas relacionadas

- [Zcash Sincronização da carteira](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - por que a sincronização funciona da forma atual
- [Nós lightwallet](https://zechub.wiki/zcash-tech/lightwallet-nodes) - o modelo de light client que a PIR poderia melhorar
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - a outra principal ferramenta criptográfica por trás da privacidade do Zcash
- [Segurança pós-quântica](https://zechub.wiki/zcash-tech/post-quantum-security) - por que os métodos baseados em reticulados são importantes para o futuro
- [ZecBlock](https://zecblock.com) - o principal explorador público
- [Valar Group](https://zechub.wiki/zcash-organizations/valar-group) - desenvolvedores das bibliotecas de PIR usadas pelo protótipo do explorador e pela pesquisa sobre carteiras
