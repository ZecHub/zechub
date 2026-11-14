# Assinatura a frio blindada

> **Ideia principal:** A carteira complementar vê tudo o que é necessário para montar e monitorar uma transação blindada. Somente a carteira de hardware tem a autoridade para autorizar um gasto. Essa divisão é todo o propósito da assinatura a frio blindada.

Blindar no Zcash consiste em mover fundos de um endereço público e transparente para um endereço privado e blindado, ocultando os detalhes da transação por meio dos recursos de privacidade do Zcash.

### O que muda quando você blinda ZEC?

Em uma transação transparente de Zcash, informações como:

- endereço do remetente
- endereço do destinatário
- valor transferido

podem ser observadas na blockchain.

Quando você blinda ZEC, seus fundos vão para um pool privado (como o Ironwood). A blockchain consegue verificar que uma transação é válida sem revelar os detalhes privados da sua transação. Desde a atualização NU6.3, em 28 de julho de 2026, os fundos recém-blindados vão para o pool Ironwood, já que o pool Orchard, mais antigo, não aceita mais novos depósitos, embora ainda permita saques.

### Componentes de uma transação blindada

### 1. A note (o registro do saldo blindado)

Uma note é um registro criptográfico privado que representa um valor não gasto de ZEC pertencente a um usuário.

Ao contrário de uma blockchain pública, em que os saldos são listados em texto claro, uma note blindada criptografa o valor e os detalhes de propriedade, de modo que observadores on-chain não conseguem ver quem é o dono dos fundos.

Ao iniciar uma transação, a carteira complementar varre o registro, identifica as notes não gastas do usuário e seleciona quais notes serão gastas.

### 2. O nulificador (o mecanismo de detecção de gasto duplo)

Como os detalhes de uma note ficam ocultos do registro público, a rede precisa de um mecanismo para detectar o gasto duplo sem revelar qual note está sendo gasta.

Um nulificador é um marcador criptográfico único derivado de uma note específica. Quando uma note é gasta, seu nulificador é publicado na blockchain.

A rede verifica se o nulificador já foi registrado anteriormente. Se não foi, o gasto pode ser aceito. O mais importante é que um observador externo não consegue usar o nulificador para determinar de qual note específica ele veio.

A carteira complementar deriva e constrói o nulificador apropriado como parte da montagem dos dados da transação.

## Chaves

Chaves são informações criptográficas que controlam o acesso aos seus fundos e permitem que sua carteira realize operações como receber, visualizar e gastar ZEC.

Uma carteira contém várias chaves diferentes, cada uma com uma finalidade distinta, assim como uma única conta pode ter credenciais separadas para acesso de leitura e acesso de escrita.

As chaves são centrais na relação entre a carteira complementar e a carteira de hardware, porque chaves diferentes têm finalidades diferentes, e apenas uma delas precisa ficar trancada.

É importante saber que cada pool blindado constrói suas chaves como uma árvore de derivação, em que as setas apontam de um componente para tudo o que pode ser derivado dele. Os usuários que desejam receber pagamentos blindados precisam ter um endereço de pagamento blindado, que é gerado a partir de uma chave de gastos.

### A hierarquia de chaves

**1. Chave de gastos**

Esta é a chave mais sensível em termos de segurança. Ela dá a capacidade criptográfica de autorizar o gasto de ZEC.

É a esta chave que se refere sempre que a expressão "a carteira de hardware guarda a chave" aparece em outras partes deste relatório.

Em uma arquitetura de assinatura a frio, a chave de gastos é mantida dentro da carteira de hardware e nunca é exposta à carteira complementar. A carteira complementar não deveria precisar possuir essa chave de forma alguma.

Tanto no Sapling quanto no Orchard, as hierarquias de chaves derivam a autoridade de gasto e as capacidades de visualização como dois ramos distintos a partir de uma chave de gastos raiz:

- **Sapling:** Uma chave de gastos expandida (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) deriva as chaves de autorização de prova (𝑎𝑘,𝑛𝑠𝑘) e as chaves de visualização completas (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘), que, por sua vez, geram as chaves de visualização de entrada (𝑖𝑣𝑘) e os endereços diversificados.
- **Orchard:** Uma chave de gastos raiz (𝑠𝑘) se ramifica diretamente em uma chave de autorização de gastos (𝑎𝑠𝑘) e uma chave de visualização completa (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Essa divisão estrutural fornece a base criptográfica formal para o isolamento de chaves em hardware, no qual a carteira exporta o ramo de visualização (UFVK) para o computador host, para a sincronização do saldo e a montagem de transações, enquanto mantém o ramo de autorização de gastos permanentemente trancado no dispositivo.

A derivação de chaves é estritamente unidirecional. Isso significa que as chaves de visualização não podem ser revertidas para reconstruir a autoridade de gasto. Essa irreversibilidade criptográfica torna seguro exportar uma Unified Full Viewing Key (UFVK), porque ela concede visibilidade completa da carteira sem expor os segredos de gasto guardados no dispositivo.

**2. Chaves de visualização**

O Zcash separa a capacidade de ver a atividade blindada da capacidade de gastá-la. Uma chave de visualização permite que uma carteira ou outra parte autorizada veja informações sobre transações blindadas sem conceder autoridade de gasto.

- **Full Viewing Key (FVK), encapsulada como uma Unified Full Viewing Key (UFVK):** derivada deliberadamente da chave de gastos, ela permite que o software detecte e descriptografe a atividade blindada da carteira, identificando assim as transações. Ela também permite calcular saldos sem poder autorizar um gasto. A melhor forma de descrevê-la é como uma derivada menos privada da chave de gastos, e não como uma cópia mais fraca da seed.

A Full Viewing Key (FVK) oferece visibilidade completa somente leitura, mantendo uma separação de segurança rigorosa. Ao descriptografar os textos cifrados tanto das notes recebidas quanto das enviadas (por meio de seu componente de chave de visualização de saída), uma carteira complementar que tenha apenas a FVK consegue exibir um histórico de transações completo e identificado, e não apenas um saldo corrente.

Vários endereços de pagamento diversificados e não vinculáveis compartilham a mesma FVK e a mesma chave de visualização de entrada (IVK), o que permite gerar endereços ilimitados sem aumentar a carga de varredura da blockchain.

Essa separação funcional forma a base dos fluxos de trabalho de assinatura a frio. Toda a varredura contínua da chain, o acompanhamento do histórico e o gerenciamento de endereços são transferidos para o software host, enquanto a autoridade de gasto permanece isolada no dispositivo de hardware.

![Diagramas de derivação de chaves](/content-images/key-derivation-diagrams.webp)

### A distinção crucial: UFVK vs. chave de gastos

> **A UFVK pode ser compartilhada. A chave de gastos deve permanecer na carteira de hardware.**
>
> A carteira complementar usa a chave de visualização para monitorar a carteira, detectar fundos recebidos, identificar notes e ajudar a preparar transações. Ela não tem a chave privada necessária para autorizar gastos.

Como dito anteriormente, a separação das chaves é a base da arquitetura de assinatura a frio.

A carteira complementar pode fazer a maior parte do trabalho necessário para preparar uma transação sem nunca ter controle sobre os fundos. A carteira de hardware só precisa receber a transação preparada e realizar a operação final de assinatura.

Os fabricantes de carteiras de hardware não precisam inventar essa separação por conta própria. O design de chaves do Zcash já separa as capacidades de visualização da autoridade de gasto no nível do protocolo, e os fabricantes simplesmente constroem suas funções de assinatura e exportação sobre essa estrutura existente. O protocolo permite que informações como um endereço blindado ou uma chave de visualização completa sejam derivadas de uma chave de gastos, enquanto a própria chave de gastos permanece privada, o que possibilita que carteiras de hardware como Ledger, Keystone e Hito forneçam ao software complementar as informações de visualização de que ele precisa, sem nunca expor a chave privada capaz de gastar os fundos.

### O que a carteira complementar realmente faz com as informações das chaves

Usando o material da chave de visualização, a carteira complementar pode:

- identificar seus fundos e notes
- determinar quais notes podem ser gastas
- derivar ou identificar os endereços relevantes
- construir a transação
- gerar ou coordenar as provas necessárias
- preparar a transação para assinatura

É importante saber que precisar construir uma transação não é o mesmo que precisar da chave de gastos privada. Esse desacoplamento é uma das principais ideias de segurança por trás da integração com carteiras de hardware.

## Construção e autorização de transações blindadas

Estes são os processos envolvidos na criação e na autorização da transação. Em termos simples, esses processos são o que a carteira realmente faz com esses dados para enviar dinheiro:

### Construção da transação (montagem da transação blindada)

A construção da transação é o processo de reunir as informações necessárias para criar uma transação Zcash válida a partir do pagamento pretendido pelo usuário.

O processo de construção da transação combina as notes selecionadas, os destinatários, os valores, as taxas, os nulificadores e outros dados necessários em uma estrutura de transação. No caso de transações blindadas, ele também prepara as informações necessárias para a geração das provas de conhecimento zero e das assinaturas exigidas.

Em geral, é a carteira complementar que realiza esta etapa. Ela:

- Seleciona as notes a serem gastas
- Determina as entradas e saídas da transação
- Calcula os valores necessários
- Prepara os dados da transação que depois serão provados e assinados.

Em uma configuração de assinatura a frio, os dados resultantes da transação podem ser empacotados em uma PCZT e repassados à carteira de hardware para a etapa de assinatura, que é crítica para a segurança.

### Prova (demonstração da validade perante o protocolo)

A prova se refere à geração de provas de conhecimento zero (como Halo 2 ou Groth16) que demonstram que uma transação segue as regras do protocolo Zcash.

A prova ajuda a rede a garantir que:

- O usuário que está gastando está autorizado a gastar as notes
- As notes realmente existem
- Os nulificadores correspondentes são únicos
- O total das entradas é igual ao total das saídas mais as taxas.

Ela faz tudo isso sem revelar nenhum detalhe privado subjacente.

A geração de provas exige muito poder computacional. Transferir essa responsabilidade para o dispositivo complementar evita que a carteira de hardware trave ou fique sem memória.

### Assinatura (autorização do gasto)

A assinatura é fundamentalmente diferente da prova. Uma assinatura digital funciona como um carimbo de autorização explícito produzido pelo detentor da chave privada.

Enquanto uma prova de conhecimento zero verifica a validade da transação, uma assinatura digital comprova a autoridade de gasto. A assinatura certifica que o verdadeiro dono aprova os parâmetros específicos da transferência.

A assinatura exige pouquíssimo poder computacional, o que a torna ideal para uma carteira de hardware.

### O que é a assinatura a frio blindada?

A assinatura a frio blindada é um método de autorizar uma transação blindada do Zcash mantendo as chaves de gastos privadas isoladas da carteira complementar conectada à internet. A transação pode ser construída e preparada em um computador on-line, enquanto uma carteira de hardware separada, mantida off-line ou isolada de outra forma, usa suas chaves protegidas para autorizar a transação.

O processo pode ser simplificado assim:

![Processo de assinatura a frio blindada](/content-images/cold-signing-process.webp)

A carteira complementar envia os parâmetros estruturados da transação ao dispositivo de hardware, que assina o conteúdo internamente sem nunca liberar a chave de gastos privada para a máquina host.

## Carteiras complementares e carteiras de hardware

As transações blindadas podem envolver tanto uma carteira complementar quanto uma carteira de hardware, cada uma com uma função distinta.

### Carteira complementar

O que é uma carteira complementar?

A carteira complementar roda em um computador ou dispositivo móvel e realiza a maior parte das tarefas envolvidas na criação da transação, como:

- Selecionar as notes a serem gastas
- Construir a transação
- Calcular os dados necessários da transação
- Coordenar a geração das provas de conhecimento zero exigidas.

### Por que uma carteira complementar é útil?

A carteira complementar cuida do processo de criação da transação, mas, se o computador for infectado por malware, um invasor pode conseguir:

- ver o que você está fazendo,
- modificar uma transação não assinada,
- tentar enganar você para que aprove algo.

A carteira complementar não precisa ter acesso à chave privada armazenada na carteira de hardware; portanto, ela pode cuidar da construção da transação e de outras tarefas computacionais, enquanto a carteira de hardware fornece a barreira de segurança para a chave privada.

### Carteira de hardware

Uma carteira de hardware é um dispositivo físico off-line que isola suas chaves privadas de celulares ou computadores conectados, funcionando como um cofre seguro para seus criptoativos.

### Por que uma carteira de hardware é útil?

Se o seu computador for infectado por malware, um invasor pode conseguir:

- ver o que você está fazendo,
- modificar uma transação não assinada,
- tentar enganar você para que aprove algo.

A chave privada não pode simplesmente ser extraída da carteira de hardware; por isso, o dispositivo pode atuar como uma barreira de segurança.

Imagem das capacidades da carteira complementar vs. carteira de hardware

A separação entre essas duas carteiras é especialmente importante para transações blindadas, porque elas são mais complexas do que as transações transparentes e envolvem componentes como notes blindadas, nulificadores, compromissos, provas de conhecimento zero e assinaturas de transação.

Seria impraticável que a carteira de hardware realizasse todas as operações computacionais. Em vez disso, a carteira complementar prepara a transação e fornece as informações necessárias à carteira de hardware para a assinatura, enquanto a chave de gastos privada permanece isolada dentro do dispositivo de hardware.

## Isolamento de chaves

> Isolamento de chaves significa que as chaves privadas capazes de autorizar um gasto nunca saem da carteira de hardware. O aplicativo complementar pode preparar a transação, mas não pode assiná-la.

O isolamento de chaves consiste em manter as chaves privadas necessárias para autorizar uma transação separadas da carteira complementar e do dispositivo em que ela roda. Em uma configuração de assinatura a frio blindada, a carteira complementar pode montar a transação e coordenar as provas necessárias, enquanto a carteira de hardware mantém isoladas as chaves de gastos privadas, que são sensíveis.

Se o computador ou celular complementar for comprometido, um invasor pode conseguir interferir na transação antes que ela seja assinada, mas, idealmente, não consegue extrair a chave privada da carteira de hardware. Assim, a chave permanece dentro do limite de segurança do dispositivo de hardware.

Essa separação permite que a carteira complementar faça a montagem da transação e as tarefas computacionais sem ter acesso direto ao material de chave necessário para autorizar a transação.

![Key isolation](/content-images/key-isolation.webp)

A distinção principal é que "chave de visualização" não significa que o aplicativo recebe uma versão mais fraca da seed.

No Zcash, uma Full Viewing Key (FVK/UFVK) é derivada propositalmente da chave de gastos e permite a quem a possui detectar e descriptografar a atividade blindada relevante, mas não autorizar gastos. A FVK é um derivado menos secreto da chave de gastos.

**Uma ressalva importante sobre privacidade:**

É bom saber que o aplicativo não consegue roubar os fundos tendo apenas a UFVK, mas consegue ver a atividade blindada privada da carteira.

Por isso, é mais preciso descrever o aplicativo complementar como alguém que tem *autoridade de visualização*, em vez de simplesmente dizer que ele tem "informações públicas".

A forma mais simples de resumir a ideia é: a carteira complementar recebe material de chave suficiente para saber o que está acontecendo com a carteira, mas não o suficiente para autorizar o que acontece com os fundos dela. Já a carteira de hardware mantém a autoridade de gasto isolada e só a usa quando o usuário aprova uma transação.

Esse é o modelo central de isolamento de chaves por trás desses projetos de carteiras de hardware blindadas para Zcash, e é o mesmo modelo que aparece, implementação por implementação, no Ledger, no Keystone e no Hito, que serão abordados em breve.

## PCZT

PCZT significa Partially Created Zcash Transaction, ou seja, uma transação parcialmente criada. É o pacote que leva uma transação Zcash, junto com as informações necessárias para concluí-la, de uma etapa para outra.

Trata-se de um formato padronizado para uma transação Zcash enquanto ela ainda está sendo montada. Ele permite que diferentes participantes ou dispositivos executem partes diferentes do processo de criação da transação e repassem entre si a transação parcialmente concluída.

Em protocolos de criptomoedas de conhecimento zero como o Zcash, montar uma transação é muito mais complexo do que assinar uma simples transferência pública. Transações blindadas exigem provas de conhecimento zero que demandam muito processamento, como as geradas com Halo 2 ou Groth16. Por isso, dispositivos de baixo consumo, como carteiras de hardware, podem não ter memória e capacidade de processamento suficientes para executar todo o fluxo da transação.

A introdução do PCZT resolve vários desafios centrais da arquitetura de criptomoedas blindadas. O PCZT é um formato de dados intermediário padronizado que divide a criação da transação em funções modulares e independentes. Ele permite que um computador complementar potente cuide da montagem da transação e da geração das provas, enquanto a carteira de hardware offline fica restrita à autorização e à assinatura.

### Limitações do hardware e do armazenamento a frio

Embora as carteiras de hardware ofereçam um ambiente seguro para proteger as chaves de gastos privadas, elas normalmente têm pouca RAM, pouco poder de processamento e capacidade limitada de transferência de dados em comparação com computadores complementares. Essas restrições tornam inviável que elas gerem provas de conhecimento zero, que exigem muito processamento, ou que mantenham todo o estado da transação durante o processo de montagem.

Por isso, a carteira complementar pode cuidar das tarefas computacionalmente pesadas, enquanto a carteira de hardware se concentra na operação crítica para a segurança: autorizar a transação com suas chaves de gastos protegidas.

Fica a pergunta: se o dispositivo é tão limitado, como ele ainda consegue fazer verificação *suficiente* para ser confiável?

Resumindo, uma carteira de hardware não pode aceitar qualquer valor de um computador complementar e simplesmente assiná-lo. Ela precisa de informações suficientes para confirmar que o valor assinado corresponde à transação que o usuário pretende autorizar. Isso cria um equilíbrio difícil: o dispositivo precisa analisar e verificar o suficiente para proteger o processo de assinatura, mas opera sob limites rígidos de memória, processamento, tamanho do firmware e complexidade de implementação.

O tratamento do PCZT Orchard pelo Ledger é um exemplo desse desafio: ele sugere que uma análise especializada, dependente do circuito, pode tornar a implementação mais viável em dispositivos limitados, mas também pode exigir mudanças de firmware quando as estruturas de transação ou os circuitos suportados evoluem.

Duas iniciativas em andamento mostram respostas diferentes para essa mesma limitação.

O Grant #423 apresentou uma proposta de pesquisa sobre um pipeline de geração de provas totalmente em tempo constante, adequado para arquiteturas de carteiras de hardware de código aberto e para computadores comuns. O objetivo era investigar uma infraestrutura criptográfica que pudesse ser implementada com segurança em ambientes como C ou Rust, reduzindo a complexidade e o trabalho de manutenção do suporte blindado ao Zcash.

Outra abordagem é a do **Zcash SeedSigner** proposto, um assinador de código aberto e air-gapped, construído com componentes baratos e fáceis de encontrar. O fluxo proposto mantém o computador complementar separado do dispositivo de assinatura, passando um PCZT através do isolamento físico para verificação e assinatura no próprio dispositivo.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Juntas, essas abordagens mostram o desafio de engenharia mais amplo por trás das carteiras de hardware blindadas: a montagem da transação e a geração das provas podem acontecer fora do dispositivo crítico para a segurança, mas o assinador ainda precisa ter informações e capacidade de verificação suficientes para autorizar com segurança a transação resultante.

### O PCZT viabiliza a arquitetura dividida

O padrão Partially Created Zcash Transaction (PCZT) é a estrutura de dados formal que conecta a carteira complementar à carteira de hardware.

A carteira complementar consegue fazer sozinha a seleção de notes, calcular os nulificadores e gerar a prova de conhecimento zero. Isso é possível porque as informações necessárias para essas etapas, incluindo a chave usada para derivar os nulificadores, vêm da chave de visualização, e não de algo ligado à autoridade de gasto. Em seguida, a carteira complementar empacota esses elementos em um contêiner PCZT.

O PCZT é entregue à carteira de hardware, que lê o contexto da transação (como valores e endereços dos destinatários), aplica a assinatura com suas chaves de gastos protegidas e devolve o PCZT atualizado ao dispositivo complementar.

Esse projeto estabelece um limite de segurança rígido: um hardware hospedeiro potente pode fazer os cálculos complexos de conhecimento zero sem precisar acessar as chaves de gastos, enquanto dispositivos de armazenamento a frio de baixo consumo podem garantir a segurança financeira sem precisar processar criptografia pesada.

### Concessões de privacidade do prover

Delegar a geração das provas de conhecimento zero à carteira complementar ou a outro prover mantém as chaves de gastos isoladas, mas ainda exige que o prover acesse informações sensíveis da transação, como valores das notes, endereços dos destinatários e compromissos.

O PCZT mantém a separação arquitetural ao garantir que essas informações possam ser fornecidas para a geração das provas sem transferir as chaves de gastos privadas necessárias para a autorização.

Isso garante que a autoridade de geração de provas fique separada da autoridade de gasto. O prover pode executar a pesada geração das provas sem obter a autoridade criptográfica para gastar os fundos do usuário.

### Interoperabilidade do PCZT

À medida que o PCZT se torna uma parte importante dos fluxos de carteiras de hardware, multiassinatura e assinatura air-gapped do Zcash, a interoperabilidade entre implementações independentes ganha cada vez mais importância.

Uma proposta de junho de 2026 apresentada por AngryDavee observou que já existiam implementações de PCZT em projetos como Ledger, Keystone, Hito, OneKey e a implementação de referência em librustzcash. No entanto, a proposta identificou a falta de testes compartilhados para confirmar que essas implementações interpretam os PCZTs de forma consistente.

A solução proposta era um conjunto de testes de interoperabilidade de código aberto, com vetores de teste canônicos de PCZT e testes entre implementações cobrindo todo o fluxo criar → assinar → finalizar. A proposta também previa testar os limites entre funções, como o Combiner, em que informações parcialmente assinadas por diferentes assinadores podem ser combinadas antes de a transação ser finalizada.

Isso é especialmente relevante para carteiras de hardware, porque o PCZT permite separar a montagem da transação da assinatura: uma carteira complementar pode montar a transação e preparar um PCZT, enquanto um dispositivo de hardware recebe as informações de assinatura necessárias e executa a operação de assinatura, que é crítica para a segurança.

A proposta não foi implementada porque a Zcash Community Grants decidiu não seguir com o subsídio depois de analisar a proposta e considerar o feedback da comunidade. Por isso, o conjunto de testes entre implementações proposto não foi desenvolvido por meio desse subsídio. Trata-se, portanto, de uma resposta proposta a um desafio identificado de interoperabilidade do PCZT, e não de um padrão que exista atualmente em todo o Zcash.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### O ciclo de vida de um PCZT

| # | Etapa | Descrição |
|---|---|---|
| 1 | Creator | Inicializa o PCZT com os metadados globais da transação, incluindo versões da transação, IDs de ramificação de consenso e flags de pool. |
| 2 | Constructor | Preenche a transação com as entradas e saídas pretendidas nos pools transparente, Sapling, Orchard ou Ironwood. |
| 3 | IO Finalizer | Declara o conjunto de entradas e saídas como concluído, calcula as chaves da assinatura de vinculação e assina gastos fictícios quando necessário. |
| 4 | Updater | Anexa os dados de contexto necessários para os participantes seguintes, como full viewing keys, âncoras e testemunhas Merkle. |
| 5 | Prover e Signer | Executa a geração das provas de conhecimento zero e a assinatura criptográfica. Nas versões modernas do PCZT, essas duas tarefas são totalmente independentes e podem ocorrer em sequência ou em paralelo. |
| 6 | Combiner | Mescla de forma determinística várias instâncias de PCZT quando dispositivos diferentes trabalham ao mesmo tempo em aspectos da mesma transação. As regras de mesclagem exigem resolução rigorosa de conflitos para evitar perda acidental de dados. |
| 7 | Spend Finalizer e Extractor | Valida todos os elementos criptográficos necessários, remove os metadados de contexto intermediários e produz a transação Zcash finalizada, pronta para ser transmitida à rede. |

## Implementações reais de carteiras de hardware

### Visão geral

| Dispositivo   | O que o aplicativo complementar recebe              | O que fica no dispositivo          | Transporte      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / FVK Orchard, endereços            | Autoridade de gasto                | USB / BLE      |
| Keystone | UFVK + Unified Address                   | Seed / chaves de gastos            | QR (air-gapped)|
| Hito     | UFVK, Unified Address, impressão digital da seed  | Seed e chaves de gastos privadas    | QR / local     |


Várias implementações de carteiras de hardware foram desenvolvidas para explorar como as transações blindadas do Zcash podem ser suportadas mantendo as chaves de gastos sensíveis isoladas da carteira complementar. O Ledger, o Keystone e o Hito representam abordagens diferentes para integrar a proteção de chaves baseada em hardware ao fluxo de transações do Zcash.

![Implementações reais de carteiras de hardware](/content-images/hardware-wallet-implementations.webp)

Para entender como eles protegem os fundos blindados, é importante distinguir entre chaves de gastos e chaves de visualização. Nos três casos, a divisão segue o mesmo formato:

| Dispositivo | O que o aplicativo complementar pode receber | O que permanece protegido no dispositivo |
|---|---|---|
| Ledger | UFVK / FVK Orchard, endereços e informações públicas | Autoridade de gasto / material de chave privada |
| Keystone | UFVK + Unified Address | Seed / chaves de gastos |
| Hito | UFVK, Unified Address, impressão digital da seed e informações da rede | Seed e chaves de gastos privadas |

### Ledger como ambiente de assinatura em hardware

A Ledger é uma empresa de carteiras de hardware. Seus dispositivos são construídos em torno de um Secure Element, um chip dedicado projetado para guardar material de chave privada e mantê-lo fisicamente isolado do restante do dispositivo e de tudo o que estiver conectado a ele. Esse Secure Element é justamente o que torna um dispositivo Ledger confiável para armazenamento a frio. Isso significa que, mesmo que o computador ou o celular conectado a ele esteja comprometido, as chaves dentro do Secure Element não podem ser extraídas.

Sozinho, porém, um dispositivo Ledger não sabe lidar com nenhuma criptomoeda específica. Ele precisa de um aplicativo instalado que saiba trabalhar com a criptografia própria de cada moeda.

Como um dispositivo Ledger não sabe lidar com nenhuma criptomoeda específica, ele precisa de um aplicativo que conheça a criptografia daquela moeda. Para o Zcash, houve duas gerações:

- O aplicativo original "Zcash Shielded", desenvolvido pela Zondax, usado com carteiras complementares como a Zkool e que está sendo descontinuado em 5 de novembro de 2026, e
- O aplicativo Zcash mais recente da Ledger (3.9.4+), usado nativamente pelo Ledger Wallet Desktop 4.21+ para ZEC blindado Ironwood.

O modelo de isolamento de chaves descrito abaixo vale para os dois.

A Zkool é a carteira complementar no seu celular ou computador que se comunica com esse aplicativo. Ela monta a transação e a envia ao Ledger; o aplicativo Zondax no dispositivo então a assina e devolve a assinatura.

Ou seja, o Zondax é o software que roda no hardware, e a Zkool é o software que roda fora dele, usando o aplicativo da Zondax para se comunicar com o dispositivo.

### O que sai do Ledger?

O software Zcash da Ledger inclui uma função específica para exportar a chave de visualização da carteira, que é a chave que permite a um software ver saldos e transações sem poder gastar nada.

Essa função pode retornar uma de duas coisas:

- Uma Unified Full Viewing Key (UFVK), que é a full viewing key que cobre todos os pools blindados do Zcash de uma só vez, ou
- Uma Orchard Full Viewing Key (FVK)

Em ambos os casos, o que sai é sempre e somente uma chave de visualização. Não importa qual versão você solicite, essa função não tem como retornar a única informação que de fato permitiria a alguém movimentar os fundos: a chave de gastos.

E é exatamente esse o objetivo da forma como ela foi construída: ela foi projetada para que a única coisa que consiga exportar seja algo seguro para entregar a um aplicativo complementar.

A hierarquia de chaves do Zcash é estruturada de modo que, para cada pool blindado, a chave de gastos deriva duas coisas separadas:

- Uma chave de autorização de gasto, e
- Uma full viewing key

A FVK pode então derivar outras capacidades próprias relacionadas à visualização, mas em nenhum momento esse caminho de derivação leva de volta à autoridade de gasto. Depois que uma chave passa para o lado de visualização da hierarquia, ela permanece ali e não pode ser usada para reconstruir a chave de autoridade de gasto da qual se originou.

O Ironwood segue esse mesmo padrão, já que reutiliza a construção de chaves e de notes subjacente do Orchard. No entanto, ele é um pool distinto no nível do consenso, com sua própria árvore de compromissos e seu próprio conjunto de nulificadores. Isso significa que uma UFVK é, na verdade, um pacote de chaves de visualização por pool (transparente, Sapling, Orchard e agora Ironwood), e não uma única chave plana.

Uma UFVK exportada antes da ativação do Ironwood não inclui uma chave de visualização Ironwood, já que esse pool ainda não existia. É exatamente por isso que as carteiras precisaram ser atualizadas para reconhecer e derivar UFVKs compatíveis com Ironwood após a atualização NU6.3.

### O que fica no Ledger?

A autoridade de gasto permanece no dispositivo.

O Signer Ledger recebe uma transação/PCZT do hospedeiro e gera a assinatura de autorização de gasto de acordo com o pool de onde a transação gasta (o pool Ironwood, pois a integração atual da Ledger suporta apenas Ironwood). A assinatura é então produzida no dispositivo, e o hospedeiro recebe apenas a assinatura, não a chave de gastos privada.

Isso também está de acordo com o modelo de segurança geral da Ledger. Seu Secure Element isola o material de chave privada, e os requisitos de segurança de aplicativos da Ledger proíbem expressamente que os aplicativos exponham esses segredos ao hospedeiro.

O assinador da Ledger pode exportar a FVK/UFVK e, de forma independente, assinar transações. As duas capacidades são oferecidas por funções separadas, e não agrupadas em uma só.

### O que isso significa na prática?

Suponha que a sua Ledger contenha 10 ZEC.

A carteira complementar pode ter a UFVK e, portanto, concluir: "Esta carteira recebeu 10 ZEC." Ela pode escanear e exibir transações e saldos.

Mas, se alguém comprometer a carteira complementar, a UFVK sozinha não dá a essa pessoa a capacidade de criar a assinatura de autorização de gasto.

O objetivo de ter uma assinatura de autorização de gasto separada é permitir que dispositivos limitados, como carteiras de hardware, autorizem gastos blindados sem precisar gerar eles mesmos a prova zk-SNARK completa.

### Aplicativo Ledger da Zondax: o lado da carteira de hardware

#### O que é a Zondax?

A Zondax é uma empresa de desenvolvimento terceirizada que criou o aplicativo Ledger Zcash. É o aplicativo de firmware que de fato roda no hardware Ledger e dá ao dispositivo, antes de tudo, a capacidade de entender e processar transações Zcash.

A Zondax é uma desenvolvedora externa. O hardware Ledger não tem capacidade nativa de processar transações Zcash, e essa capacidade vem inteiramente do software da Zondax.

### Implementação original de Ledger da Zcash

O repositório do aplicativo Ledger Zcash da Zondax contém o software que roda em um dispositivo Ledger. Inicialmente, o aplicativo era focado em transações blindadas Sapling, antes de o Orchard existir como o principal pool blindado do Zcash; portanto, o suporte a Sapling era tudo o que um dispositivo Ledger conseguia fazer com ZEC blindado.

Sua arquitetura ilustra a separação: o lado hospedeiro/complementar prepara as informações da transação, enquanto o Ledger cuida das operações de chave sensíveis e da assinatura.

Mesmo nessa primeira versão do suporte a carteiras de hardware para Zcash, os princípios centrais, ou seja, montagem e geração de provas no hospedeiro e assinatura isolada no dispositivo, já faziam parte do projeto.

### Evolução em direção ao Orchard

O trabalho da Ledger avançou em direção a Orchard + PCZT. Foi uma transição significativa, e não uma pequena atualização, já que o Orchard usa um sistema de provas diferente (Halo 2, em comparação com o Groth16 do Sapling) e uma construção de notes e chaves diferente. Por isso, estender um firmware só para Sapling para lidar com assinaturas Orchard exigiu uma nova base criptográfica no lado do dispositivo, e não apenas um patch de firmware.

No entanto, à medida que o Zcash avançava em direção ao Ironwood, a Zondax e a Ledger passaram a concentrar o desenvolvimento no suporte direto ao Ironwood, em vez de concluir uma implementação para Orchard apenas para depois reformulá-la para o Ironwood. Isso representa mais uma etapa na evolução da implementação Ledger, já que o Ironwood se baseia na arquitetura criptográfica do Orchard, mas introduz um pool blindado separado e outras mudanças no protocolo.

### O que acontece dentro desse aplicativo Ledger

O fluxo resultante é descrito assim:

1. O hospedeiro monta um PCZT.
2. O hospedeiro envia as informações relevantes da transação ao dispositivo Ledger.
3. O dispositivo produz as assinaturas de autorização de gasto Orchard.
4. O hospedeiro cuida de tudo o que vem depois disso, incluindo a assinatura de vinculação e a montagem final da transação.

O aplicativo que roda dentro do Ledger nunca vê nem produz nada além da própria assinatura de autorização de gasto, e todo o trabalho computacionalmente pesado ou que exige muitos dados (geração de provas, vinculação, montagem) fica no hospedeiro, que não precisa receber a confiança de guardar material de chave.

### Integração blindada nativa da Ledger: Ledger Wallet Desktop

A integração Zcash mais recente da Ledger é um exemplo concreto de como a montagem de transações blindadas e a assinatura crítica para a segurança podem ser separadas entre o software complementar e uma carteira de hardware.

Com o Ledger Wallet Desktop 4.21+ e o aplicativo de dispositivo Zcash 3.9.4+, os usuários podem enviar e receber ZEC blindado Ironwood diretamente pelo Ledger Wallet Desktop. A integração suporta transferências de privado para privado, blindagem a partir do pool transparente, desblindagem para o pool transparente, endereços de recebimento privados e memorandos. As transações são verificadas e assinadas no dispositivo Ledger, em vez de depender apenas das informações apresentadas pelo computador.

Uma parte fundamental dessa arquitetura é a separação entre as capacidades de visualização e de gasto. Durante a sincronização do saldo privado, o Ledger exporta uma Unified Full Viewing Key (UFVK), que fica armazenada localmente no computador. A UFVK permite que o Ledger Wallet Desktop detecte as transações blindadas relevantes e determine o saldo da carteira, mas não dá autoridade para gastar os fundos. A autoridade de gasto, crítica para a segurança, permanece no dispositivo Ledger, que executa a operação final de assinatura. Isso cria um limite claro entre o computador, que gerencia o estado da carteira e monta as transações, e o dispositivo de hardware, que protege a capacidade necessária para autorizar gastos.

No entanto, a integração atual é exclusiva para Ironwood. Ela não exibe nem gerencia fundos Orchard ou Sapling pelo Ledger Wallet Desktop. Isso é historicamente relevante, porque o desenvolvimento anterior de Zcash da Ledger estava associado ao suporte blindado Orchard, antes de a implementação evoluir em direção ao protocolo Ironwood.

A transição também evidencia a importância da compatibilidade de chaves e contas. A Ledger tem um aplicativo mais antigo, o "Zcash Shielded", desenvolvido pela Zondax e usado por integrações como a YWallet e o zkool, que agora está sendo descontinuado. Como esse aplicativo mais antigo usava um esquema de derivação diferente para contas blindadas, suas contas Sapling não podem simplesmente ser reproduzidas pelo novo aplicativo Ledger.

A integração, portanto, ilustra tanto o progresso quanto as limitações que ainda existem no suporte a carteiras de hardware blindadas. A Ledger agora consegue oferecer uma experiência Ironwood completa, em que o software complementar cuida da sincronização da carteira e da preparação das transações, enquanto o dispositivo de hardware continua sendo o limite de segurança para os gastos.

Ao mesmo tempo, a compatibilidade com contas antigas, o suporte a apenas alguns pools blindados específicos, os limites de tamanho de transação do hardware, as restrições de plataforma e as limitações de processamento e de firmware envolvidas na análise e verificação de transações blindadas mostram que o suporte de carteiras de hardware ao Zcash depende não só das capacidades do protocolo, mas também do projeto e dos recursos de cada implementação.

### Zkool + Ledger: usando o aplicativo oficial Zondax

Como sucessora da Ywallet, a Zkool herdou o objetivo da assinatura a frio blindada, mas seguiu outro caminho para alcançá-lo, moldado diretamente pelo fato de que a criptografia sozinha não torna uma integração utilizável se o aplicativo de assinatura não puder ser distribuído com segurança.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Uso do aplicativo Zondax pela Zkool

A Zkool passou a usar o aplicativo oficial Ledger Zcash desenvolvido pela Zondax, em vez do aplicativo proprietário Ledger da Ywallet, que foi abandonado. Em vez de manter um aplicativo personalizado que a loja da Ledger não aceitaria, a Zkool se baseou no aplicativo que já era aceito e distribuído pelo próprio ecossistema da Ledger.

Com essa mudança, os usuários deixaram de precisar instalar um aplicativo Ledger personalizado e não assinado para usar essa integração, já que o aplicativo da Zondax era distribuído oficialmente pelo ecossistema da Ledger.

Ledger definiu 5 de novembro de 2026 como o fim do suporte a este antigo aplicativo Zcash Shielded, à medida que o descontinua. A Zkool se preparou para isso: a [versão 6.30.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.30.0) (12 de setembro de 2026) adicionou suporte ao novo aplicativo oficial Zcash da Ledger, ao lado do aplicativo Zondax. Quando você cria uma conta Ledger, a Zkool agora pergunta qual aplicativo o dispositivo executa (Oficial ou Zondax). Uma conta com o aplicativo Oficial abrange as pools transparente e Ironwood: a Zkool pode importar a UFVK dela a partir do dispositivo e assina transações v6 com o aplicativo Oficial. Uma conta com o aplicativo Zondax mantém a configuração mais antiga, transparente + Sapling ([zkool2#1242](https://github.com/hhanh00/zkool2/pull/1242)).

### Pools blindados suportados

Segundo o desenvolvedor da Ywallet, a integração Ledger da Zkool usava o aplicativo oficial Ledger desenvolvido pela Zondax e suportava Zcash transparente e blindado. No entanto, o suporte blindado era limitado ao Sapling e não incluía o Orchard, além de outras limitações da integração, como um máximo de cinco entradas e saídas de cada tipo e a falta de compatibilidade com o Ledger Live.

Essa limitação refletia o escopo da implementação Zondax Ledger subjacente na época. O trabalho anterior da Zondax com o Ledger oferecia suporte a Sapling, e o lançamento posterior do app Zcash Shielded Ledger, em 2024, inicialmente excluía Orchard e Unified Addresses. Portanto, uma integração construída em torno desse aplicativo herdava os recursos e as limitações da implementação de carteira de hardware da qual dependia.

A situação evoluiu depois com o lançamento do app dedicado Zcash Shielded Ledger, em novembro de 2024. A Zondax afirmou que o aplicativo havia sido lançado oficialmente pelo Ledger Live e, mais tarde, publicou orientações de integração e pacotes Rust e JavaScript para permitir que outras carteiras se integrassem a ele. No lançamento, porém, o aplicativo se comunicava exclusivamente com o Zecwallet Lite Desktop, enquanto integrações mais amplas com carteiras ainda estavam em desenvolvimento.

A etapa seguinte foi o desenvolvimento do aplicativo Zcash mais recente da Ledger, baseado em Rust. Em junho de 2026, a Ledger informou que o compartilhamento de UFVK e a geração de Unified Address Orchard haviam sido implementados, enquanto a assinatura de transações Orchard e ClearSign ainda estavam em desenvolvimento. A Ledger também afirmou que o trabalho seria levado adiante para o caminho Ironwood à medida que o protocolo mudasse.

Em seguida, a Ironwood exigiu atualizações em todo o ecossistema de carteiras Zcash. A Zkool lançou suporte à migração de Orchard para Ironwood a partir da versão 6.24.0 e continuou aprimorando a migração e o fluxo de transações nas versões seguintes. Separadamente, a Ledger incorporou a assinatura PCZT v2 ao seu novo aplicativo em 27 de julho, embora a implementação ainda não tivesse concluído a revisão da Ledger e a implantação no Ledger Live até 20 de agosto, um marco que já foi entregue, com o Ledger Wallet Desktop 4.21+ agora oferecendo suporte nativo a Ironwood diretamente.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Assim, essa evolução é mais bem entendida não como uma única atualização de Zondax para Ironwood, mas como vários desenvolvimentos relacionados: a implementação Zondax original focada em Sapling, o app Zcash Shielded Ledger de 2024, o aplicativo Ledger Rust mais recente com suporte a Orchard e PCZT, a integração nativa da própria Ledger no Ledger Wallet Desktop e as atualizações paralelas em carteiras como a Zkool, à medida que o ecossistema fazia a transição para o Ironwood.

### Suporte atual de dispositivos e plataformas Ledger para Zcash

O suporte a Zcash no Ledger depende

- Do modelo do dispositivo
- Do aplicativo instalado
- Da plataforma usada para gerenciá-lo e,
- De a transação ser transparente ou blindada.

Em 21 de julho de 2026 (última atualização da Ledger), o app Zcash Shielded é compatível com o Nano S Plus, o Stax e o Flex, mas ainda não com o Nano X nem com o Nano Gen5.

O Nano X e os outros modelos, exceto o Nano S original, ainda podem usar o app Zcash clássico, que oferece suporte a transações transparentes e ao gasto de fundos blindados para endereços transparentes (desblindagem), mas não à assinatura de blindado para blindado. O Nano S original não é compatível com nenhum dos dois apps, porque a Ledger está descontinuando o suporte ao dispositivo e seu app Zcash mais recente não está disponível para ele. Os dispositivos se conectam ao Ledger Wallet (antigo Ledger Live), o aplicativo complementar da Ledger, disponível no desktop para Windows, macOS e Linux e no celular para iOS e Android.

A Ledger adicionou Zcash blindado nativo ao Ledger Wallet Desktop, construído sobre a pool Ironwood, o que elimina a necessidade de uma carteira complementar separada. O ZEC blindado ainda não é compatível com o app para celular da Ledger para iOS e Android, embora o suporte para celular esteja planejado para uma versão futura.

Fora do software da própria Ledger, o uso blindado depende de uma carteira complementar compatível e das plataformas que ela suporta. Como a Ledger continua expandindo o suporte a Ironwood, a compatibilidade depende do modelo do dispositivo, do firmware, da versão do app e do sistema operacional, de modo que o suporte geral a Zcash não garante necessariamente a compatibilidade.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### Assinatura a frio com YWallet: uma abordagem anterior

A Ywallet é uma carteira complementar, separada tanto da Ledger quanto da Zondax, que seguiu seu próprio caminho rumo à assinatura a frio blindada.

A Ywallet é historicamente importante porque explorou a assinatura a frio para o Zcash, ou seja, o dispositivo de assinatura podia ser mantido separado da carteira online.

Para concretizar essa arquitetura no hardware Ledger, a Ywallet construiu seu próprio aplicativo Ledger, um app proprietário, distinto do app Zondax abordado na seção anterior. Isso significava que a Ywallet não dependia da implementação Sapling existente da Zondax; ela tinha seu próprio firmware executando o lado da assinatura nessa relação.

### Por que a integração era importante

Ter o código de criptografia e de assinatura não é suficiente. A integração com carteiras de hardware não é um problema puramente criptográfico; é também, inevitavelmente, um problema de distribuição e de plataforma. No mínimo, ela envolve:

- Aprovação/distribuição do aplicativo: se a loja oficial de apps do fabricante do hardware aceitará e distribuirá o app
- Segurança do firmware/aplicativo: se o app atende aos requisitos de segurança do fabricante para lidar com material de chaves
- Protocolos de comunicação: como a carteira complementar e o dispositivo de fato trocam dados de transação
- Compatibilidade com a carteira: se os formatos de dados e o fluxo do app de assinatura correspondem ao que a carteira complementar espera
- Pools blindadas suportadas: para quais entre Sapling, Orchard (e agora Ironwood) o app consegue de fato assinar

O app Ledger proprietário da Ywallet atendia aos requisitos criptográficos e de arquitetura; ele conseguia assinar transações Zcash blindadas, mas não foi aceito na loja oficial de apps da Ledger.

### O abandono do app Ledger proprietário

Como o app não foi aceito oficialmente, a Ywallet teria que pedir aos usuários que instalassem firmware não assinado para usá-lo, o que representa um comprometimento real da segurança dos usuários, e a Ywallet optou por não pedir isso a eles. Assim, a Ywallet acabou abandonando essa integração específica em vez de seguir esse caminho.

Em vez de retomar um app proprietário, o desenvolvimento posterior (por meio da Zkool, sucessora da Ywallet) passou a adotar o app Ledger oficial construído pela Zondax, trocando uma implementação personalizada e rejeitada por uma padronizada, já aceita no ecossistema de distribuição da Ledger. Foi essa mudança que acabou tornando possível novamente uma integração Ledger funcional.

### O legado da Ywallet

Mesmo depois que a própria Ywallet se afastou do desenvolvimento ativo, seu criador, Hanh, que também é membro da ZCG, continuou sendo uma voz relevante no ecossistema, especialmente quando a migração da Ironwood trouxe à tona problemas relatados envolvendo fundos que pareciam ter desaparecido.

**ZODL: um usuário real ficou sem ver seus fundos após a migração Orchard → Ironwood**

Um usuário, Jmo0615, relatou que fundos antes visíveis em sua carteira ZODL não apareciam mais após a migração de Orchard para Ironwood. Ele afirmou que havia restaurado a seed original, redefinido e recuperado a carteira e deixado a ZODL versão 3.14.1 (1) sincronizar completamente. Também confirmou que nenhuma carteira de hardware Keystone estava envolvida.

Não ficou comprovado que os fundos tenham sido de fato perdidos. Em vez disso, suspeita-se de um problema relacionado à descoberta da carteira ou à migração, em que fundos antes visíveis deixaram de ser exibidos após a transição para o Ironwood. Fundos que não são detectados ou exibidos não devem ser automaticamente descritos como fundos perdidos permanentemente, e essa distinção é importante para entender problemas de migração.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: "notes bloqueadas" podem explicar fundos aparentemente indisponíveis**

Outro aspecto importante das carteiras blindadas é como o estado da carteira pode afetar os fundos que o usuário consegue de fato gastar. Hanh explicou que um usuário pode bloquear uma note acidentalmente por meio do controle de moedas, um recurso que permite escolher manualmente quais notes são usadas para gastar. Nessa situação, a note ainda pode existir na carteira, mas estar marcada como indisponível para gasto.

Isso evidencia uma distinção importante ao investigar problemas de carteira. A quantidade de ZEC existente em uma carteira nem sempre é igual à quantidade disponível para gastar no momento. Fatores como a seleção de notes, a sincronização, o estado da migração, a recuperação da carteira e as configurações de controle de moedas podem afetar o saldo exibido ou gastável. Portanto, relatos de "fundos desaparecidos" devem distinguir cuidadosamente entre fundos que não são detectados ou exibidos, fundos que são detectados mas estão indisponíveis para gasto e fundos que foram de fato perdidos.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**O que é a Keystone?**

A Keystone é uma carteira de hardware air-gapped. Seu dispositivo de assinatura não tem nenhuma conexão direta, com ou sem fio, com o app complementar durante o próprio processo de assinatura, comunicando-se por meio de QR codes. Aqui, ela é pareada com a Zashi (agora renomeada Zodl), a carteira complementar nativa do Zcash, e esse pareamento torna o princípio de isolamento de chaves excepcionalmente explícito e fácil de acompanhar.

**O fluxo Keystone/Zashi**

A integração Zcash da Keystone com a Zashi torna essa separação particularmente explícita. Quando você conecta a Keystone à Zashi, a Unified Full Viewing Key é transferida da Keystone para a Zashi.

Então o fluxo é:

![Fluxo de visualização com Keystone e Zashi](/content-images/keystone-zashi-viewing-flow.webp)

**O que a Zashi pode fazer com a UFVK?**

A Zashi pode usá-la para:

- identificar transações blindadas recebidas
- determinar saldos
- obter informações sobre a atividade blindada

Mas ela não pode gastar os fundos simplesmente por ter a UFVK.

A UFVK é uma "capacidade de visualização" que permite conhecer saldos e transações, mas não permite gastar.

### O que fica dentro da Keystone?

A seed/autoridade de gasto permanece na Keystone. A Zashi não recebe a seed, a chave de gastos nem a chave privada de autorização de gasto. Ela recebe a UFVK, as informações de endereço e as informações necessárias para operar apenas em modo de visualização.

Juntas, essas duas metades completam o quadro. O que sai do dispositivo, como a UFVK, os endereços e as informações somente de observação, é suficiente para que a Zashi monitore a conta, mas nada do que sai do dispositivo é suficiente para movimentar fundos a partir dele.

É por isso que a integração entre Zashi e Keystone pode oferecer armazenamento a frio blindado. O aplicativo de carteira pode monitorar a conta sem possuir a autoridade necessária para gastar a partir dela. A integração foi lançada especificamente para permitir o armazenamento a frio de ZEC blindado.

Quando você quiser gastar:

![Fluxo de gastos com Keystone e Zashi](/content-images/keystone-spend-flow.webp)

## 3. Hito

A Hito segue um modelo de isolamento de chaves muito semelhante ao da Keystone, mas sua implementação é mais recente. Em vez de ser pareada com uma carteira complementar existente como a Zashi, a Hito vem com sua própria carteira Android, e o processo de integração inicial entre o dispositivo de hardware e esse app Android está documentado nos marcos de desenvolvimento da Hito.

**Integração inicial: o que o app Hito recebe**

A carteira Android usa:

- a Unified Full Viewing Key (UFVK)
- o Unified Address
- a impressão digital da seed ZIP-32
- as informações de rede

ao fazer a integração inicial da conta de hardware.

Observe que o aplicativo Android nunca recebe a seed nem as chaves privadas de gastos da carteira de hardware.

![Hito onboarding](/content-images/hito-onboarding.webp)

**O que o app Hito recebe?**

As informações documentadas da integração inicial incluem:

- UFVK
- Unified Address
- Impressão digital da seed ZIP-32
- Rede

A UFVK fornece à carteira Android as informações de que ela precisa para operar a conta como uma carteira com capacidade de visualização, sem receber a seed. A impressão digital da seed é um identificador de tamanho fixo derivado da seed, usado para reconhecer qual conta é qual; ela não é a seed em si e não confere nenhuma capacidade de gasto, e é por isso que sua presença não contradiz a afirmação acima de que o app "nunca recebe a seed".

**O que fica na Hito?**

A seed propriamente dita, as chaves privadas de gastos e a autoridade de assinatura permanecem no dispositivo de hardware. A Hito então realiza a assinatura offline.

O marco atual da Hito afirma que todo o fluxo de criação, exportação, assinatura offline e importação está operacional, com transporte BLE e exportação por QR BBQr da PCZT assinada.

Vale a pena nomear esse fluxo explicitamente, já que ele é a instância concreta do ciclo completo abordado anteriormente neste relatório: a carteira Android cria a PCZT não assinada, exporta-a para a Hito, a Hito assina offline com seu material de chaves isolado e a PCZT assinada é importada de volta para a carteira Android.

Em nenhum momento a seed ou a chave de gastos atravessa essa fronteira, em qualquer direção.

![Fluxo de assinatura do Hito](/content-images/hito-signing-flow.webp)

## Do Orchard ao Ironwood: a evolução do suporte a carteiras de hardware

Orchard é uma pool blindada no protocolo Zcash que permite aos usuários armazenar e transacionar ZEC com privacidade aprimorada. Introduzido na atualização da rede 5 (NU5), o Orchard usa o sistema de provas Halo 2 e uma arquitetura criptográfica redesenhada para dar suporte a transações blindadas sem revelar informações sensíveis da transação, como o remetente, o destinatário ou o valor.

Ironwood é uma pool blindada introduzida na atualização da rede NU6.3 do Zcash como sucessora da pool Orchard. Ela usa o protocolo criptográfico Orchard e, ao mesmo tempo, introduz mudanças pensadas para melhorar a segurança de longo prazo dos fundos blindados, incluindo a recuperabilidade quântica e garantias mais fortes sobre a integridade da oferta.

Antes de tudo, é essencial esclarecer que o Ironwood não substituiu o protocolo Orchard por um sistema criptográfico totalmente novo. O Ironwood foi introduzido como uma nova pool blindada construída a partir do protocolo Orchard existente. Isso significa que eles têm a mesma estrutura de Action, o mesmo sistema de provas Halo 2 e as mesmas construções de note e de chaves.

O Ironwood tem sua própria árvore de compromissos de notes, seu próprio conjunto de nulificadores, sua própria âncora e sua própria pool de valor, então, no nível do consenso, ele é de fato uma pool separada. Mas, do ponto de vista criptográfico, ele é uma extensão do Orchard, e não uma reconstrução.

Ele foi projetado dessa forma para:

1. **Integridade da oferta.** Em 29 de maio de 2026, o pesquisador de segurança Taylor Hornby divulgou de forma privada uma falha crítica de solidez no sistema de provas de conhecimento zero do Orchard, que poderia ter permitido a criação de ZEC falsificados sem deixar rastro on-chain. Como os dados de transação do Orchard são privados, ninguém consegue verificar de forma independente que nenhum ZEC falsificado foi criado antes da correção. Selar a pool antiga e começar uma nova do zero resolve esse problema de um jeito que corrigir o Orchard no lugar não conseguiria.
2. **Garantir a recuperabilidade quântica.** O Ironwood foi projetado para que seus fundos possam participar de um futuro mecanismo de recuperação caso as premissas de logaritmo discreto subjacentes venham a ser quebradas.
3. **Minimizar as mudanças de implementação.** Em vez de projetar um protocolo blindado totalmente novo, a arquitetura comprovada do Orchard foi reaproveitada. Isso significou que muito menos código novo de transação, de provas, de carteira e de carteira de hardware precisou ser escrito do zero.

### A linha do tempo pública

- 29 de maio: a vulnerabilidade do Orchard é divulgada.
- Junho: as transações Orchard são temporariamente restringidas enquanto uma correção inicial é lançada por meio do NU6.2. Em 12 de junho, um desenvolvedor do núcleo estabelece 21 de julho como meta para a atualização completa; mais tarde, ela atrasa uma semana. A comunidade levantou a preocupação de que os donos de Keystone seriam os últimos a migrar, e um desenvolvedor do núcleo então responde que o Keystone daria suporte ao Ironwood desde o primeiro dia, com o firmware previsto para 3 de julho, dependendo da finalização das constantes de assinatura e das mudanças na API do Orchard por parte do núcleo do Zcash.
- Início de julho: o NU6.3 chega à testnet; o Zebra 6.0.0 é lançado em 10 de julho.
- 27–28 de julho: o trabalho de assinatura PCZT v2 do Ironwood do Ledger é mesclado em um branch de integração. O Ironwood (NU6.3) é ativado em 28 de julho no bloco 3.428.143, selando a pool original Orchard atrás de uma catraca que limita a quantidade de ZEC que pode sair do Orchard ao valor que foi legitimamente depositado nele, e introduz um novo formato de transação.

O Zebra passa a ser o nó obrigatório, já que o zcashd não oferece suporte às novas regras de consenso. Os endereços não mudam porque o Ironwood reaproveita a estrutura de receptor do Orchard, então as carteiras direcionam os endereços existentes para a nova pool automaticamente. O que as carteiras precisam, sim, é de uma funcionalidade de migração, já que os fundos no Orchard precisam, em algum momento, ser movidos para o Ironwood pelos seus donos, e novas saídas que recebam Orchard agora estão totalmente bloqueadas pelo consenso.

### O que mudou tecnicamente

Os formatos de transação passaram da versão 5 para a versão 6, de modo que uma única transação pode conter um componente Ironwood ao lado dos componentes Sapling/Orchard/transparentes existentes. O PCZT foi estendido no mesmo ritmo:

- A codificação passou do PCZT v1 para o v2.
- Um bundle Ironwood separado agora fica ao lado dos bundles Sapling e Orchard.
- Transações v6 e um novo sighash v6 são suportados.
- Os textos em claro das notes ganharam uma nova versão (V3).

A mudança no sighash é a que mais importa especificamente para as carteiras de hardware. Na v6, as âncoras Orchard e Ironwood são excluídas do hash da assinatura e alimentam apenas o digest dos dados de autorização. Essa é uma mudança real de firmware, não apenas um aumento de versão. O dispositivo precisa implementar o novo sighash corretamente e recalculá-lo por conta própria, em vez de confiar no que o app complementar afirma que está sendo aprovado.

O contrato de isolamento em si não mudou: o dispositivo continua retornando apenas a assinatura de autorização de gasto, nunca `alpha`, e nunca produz a assinatura de vinculação; o host também continua cuidando das provas e de todo o resto.

Uma regra do assinante, porém, mudou com a v6: os gastos fictícios de preenchimento são assinados pelo finalizador de IO, e não pelo dispositivo, já que o dispositivo não tem como verificá-los com dados reais de notes. A função de assinante do dispositivo os ignora, em vez de ser solicitada a assinar algo que não consegue verificar. As taxas exibidas agora também somam os saldos de valor do Orchard e do Ironwood juntos, já que uma transação v6 pode gastar de qualquer uma das pools na mesma transação.

Acertar essa contabilidade das pools importa na prática, não só na teoria. Um bug recente na própria carteira Zcash do Brave é uma boa ilustração: o cálculo de taxas assumia que todas as entradas blindadas pertenciam à pool legada Orchard, o que gerava ações duplicadas e estimativas de taxa incorretas sempre que uma transação de fato envolvia o Ironwood. Esse é exatamente o tipo de erro que o princípio "recalcule você mesmo, não confie no host", por trás da assinatura em carteiras de hardware, existe para detectar. Uma carteira complementar errou a contabilidade das pools, e só um dispositivo verificando sua própria conta de forma independente apontaria isso antes de aprovar a assinatura.

### A situação de cada assinante

**O Ledger acabou de mudar todo o cenário.** Em 23 de setembro de 2026, a Ledger lançou suporte nativo a Zcash blindado diretamente no Ledger Wallet Desktop, sem precisar mais de um app complementar separado. Sua chave de gastos fica no dispositivo, o computador faz a matemática da transação e você aprova tudo na tela antes da assinatura. Ele só oferece suporte ao Ironwood, não às pools antigas Orchard ou Sapling. A desvantagem é que o antigo app "Zcash Shielded", criado pela Zondax, que exigia uma carteira complementar como a Zkool para funcionar, está sendo descontinuado. A Ledger definiu 5 de novembro de 2026 como a data em que retiraria esse app antigo de circulação, então os fundos ainda mantidos por meio dele devem ser movidos para uma conta no novo app.

**O Keystone está em boa forma.** O firmware 3.0.2 adicionou suporte completo ao Ironwood em julho, e o firmware 3.2.2 (11 de novembro de 2026) adicionou suporte ao NU7 às edições Web3 e Cypherpunk ([notas de versão](https://github.com/KeystoneHQ/keystone3-firmware/releases/tag/3.2.2)). Com o NU7 ativo na Mainnet, atualize para a versão 3.2.2 ou mais recente antes de assinar.

**O Hito já avançou além do marco inicial na testnet.** Ele assinou e enviou com sucesso sua primeira transação real de Orchard para Ironwood em hardware físico (inicialmente na testnet). Atualizações posteriores confirmaram fluxos na mainnet (Ironwood→Ironwood, Ironwood→transparente, entre outros) em hardware de produção. O firmware estável e um lançamento mais amplo ainda estão em andamento.

**A Zkool funciona com os dois apps da Ledger.** O app da Zondax é o que está sendo descontinuado no Ledger. A Zkool, que dependia desse app para se comunicar com dispositivos Ledger, se adaptou antes do prazo: desde a [6.30.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.30.0) (12 de setembro de 2026), ela também funciona com o novo app oficial Zcash da Ledger, importando a UFVK do dispositivo e assinando transações v6 (Ironwood), e continua oferecendo suporte a contas do app da Zondax. As versões seguintes continuaram aprimorando o caminho Ledger (a 6.32.0 importa contas Ledger por meio da API GraphQL da Zkool, e a 6.36.0 corrigiu uma falha com respostas curtas da Ledger). Assim, a Zkool continua sendo uma opção para os usuários de Ledger que querem uma carteira complementar em vez da Ledger Wallet Desktop.

A migração em si é o maior efeito colateral. Como o valor que passa entre as pools é público, as carteiras distribuem as transferências em denominações padrão ao longo do tempo, em vez de mover um saldo em um único bloco visível, o que significa muitas transações para assinar em cada migração, e é exatamente por isso que a assinatura em lote do PCZT foi tão importante para as carteiras de hardware.

O trabalho de firmware do Ledger também esbarrou em limites de hardware: um gasto real de note podia chegar a dezenas de milhares de syscalls criptográficas em um único comando, disparando o watchdog do dispositivo. A correção moveu a aritmética de corpo finito para o software e exigiu um estado de rascunho compartilhado para caber dentro das restrições de pilha do Nano X.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### A evolução em uma imagem

![A evolução em uma única imagem](/content-images/orchard-to-ironwood-evolution.webp)
