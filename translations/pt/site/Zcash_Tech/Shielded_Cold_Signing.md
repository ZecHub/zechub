# Assinatura a frio blindada

> **Ideia-chave:** A carteira complementar vê tudo o que é necessário para construir e monitorar uma transação blindada. Apenas a carteira de hardware detém a autoridade para autorizar um gasto. Essa separação é todo o objetivo da assinatura a frio blindada.

A blindagem no Zcash envolve mover fundos de um endereço público e transparente para um endereço privado e blindado, ocultando os detalhes da transação com os recursos de privacidade do Zcash.

### O que muda quando você blinda ZEC?

Em uma transação transparente do Zcash, informações como:

- Endereço do remetente
- Endereço do destinatário
- Valor transferido

Podem ser observadas na blockchain.

Quando você blinda ZEC, seus fundos passam para um pool privado (como Ironwood). A blockchain consegue verificar que uma transação é válida sem revelar os detalhes privados da transação. Desde a atualização NU6.3, em 28 de julho de 2026, os fundos recém-blindados entram no pool Ironwood, pois o pool Orchard mais antigo já não aceita novos depósitos, embora ainda permita saques.

### Componentes de uma transação blindada

### 1. A note (o registro do saldo blindado)

Uma note é um registro criptográfico privado que representa uma quantia não gasta de ZEC pertencente a um usuário.

Ao contrário de uma blockchain pública, em que os saldos são apresentados em texto simples, uma note blindada criptografa o valor e os detalhes de propriedade para que os observadores on-chain não consigam ver quem possui os fundos.

Ao iniciar uma transação, a carteira complementar examina o registro, identifica as notes não gastas do usuário e seleciona quais gastar.

### 2. O nulificador (o mecanismo de detecção de gasto duplo)

Como os detalhes de uma note estão ocultos do registro público, a rede precisa de um mecanismo para detectar gasto duplo sem revelar qual note está sendo gasta.

Um nulificador é um marcador criptográfico único derivado de uma note específica. Quando uma note é gasta, seu nulificador é publicado na blockchain.

A rede verifica que o nulificador não foi registrado anteriormente. Caso não tenha sido, o gasto pode ser aceito. Fundamentalmente, um observador externo não consegue usar o nulificador para determinar de qual note específica ele provém.

A carteira complementar deriva e constrói o nulificador adequado como parte da montagem dos dados da transação.

## Chaves

As chaves são elementos de informação criptográfica que controlam o acesso aos seus fundos e permitem que sua carteira execute operações como receber, visualizar e gastar ZEC.

Uma carteira contém várias chaves diferentes, cada uma com uma finalidade distinta, assim como uma única conta pode ter credenciais separadas para acesso de leitura e acesso de escrita.

As chaves são centrais para a relação entre a carteira complementar e a carteira de hardware, porque chaves diferentes têm finalidades diferentes e apenas uma delas precisa permanecer armazenada com segurança.

É importante saber que cada pool blindado constrói suas chaves como uma árvore de derivação, em que as setas apontam de um componente para tudo o que pode ser derivado dele. Os usuários que desejam receber pagamentos blindados precisam ter um endereço de pagamento blindado, gerado a partir de uma chave de gastos.

### A hierarquia de chaves

**1. Chave de gastos**

Esta é a chave mais sensível em termos de segurança. Ela dá a capacidade criptográfica de autorizar o gasto de ZEC.

Esta é a chave à qual se refere sempre que a expressão “a carteira de hardware detém a chave” aparece neste relatório.

Em uma arquitetura de assinatura a frio, a chave de gastos é mantida dentro da carteira de hardware e nunca exposta à carteira complementar. A carteira complementar não deve precisar ter esta chave.

Tanto em Sapling quanto em Orchard, as hierarquias de chaves derivam a autoridade de gasto e as capacidades de visualização como dois ramos distintos a partir de uma chave de gastos raiz:

- **Sapling:** Uma chave de gastos expandida (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) deriva chaves de autorização de prova (𝑎𝑘,𝑛𝑠𝑘) e chaves de visualização completas (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘), que, por sua vez, produzem chaves de visualização de entrada (𝑖𝑣𝑘) e endereços diversificados.
- **Orchard:** Uma chave de gastos raiz (𝑠𝑘) ramifica-se diretamente em uma chave de autorização de gasto (𝑎𝑠𝑘) e uma chave de visualização completa (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Esta separação estrutural fornece a base criptográfica formal para o isolamento de chaves de hardware, que envolve a carteira exportar o ramo de visualização (UFVK) para o computador anfitrião para sincronização de saldo e construção de transações, mantendo simultaneamente o ramo de autorização de gasto permanentemente bloqueado no dispositivo.

A derivação de chaves é estritamente unidirecional. Isto significa que as chaves de visualização não podem ser invertidas para reconstruir a autoridade de gasto. A irreversibilidade criptográfica torna segura a exportação de uma Full Viewing Key Unificada (UFVK), porque concede visibilidade completa da carteira sem expor segredos de gasto no dispositivo.

**2. Chaves de visualização**

O Zcash separa a capacidade de ver atividade blindada da capacidade de gastá-la. Uma chave de visualização permite que uma carteira ou outra parte autorizada veja informações sobre transações blindadas sem conceder autoridade de gasto.

- **Full Viewing Key (FVK), envolvida como uma Full Viewing Key Unificada (UFVK):** Derivada deliberadamente da chave de gastos, permite que o software detecte e descriptografe a atividade blindada da carteira, identificando assim as transações. Também permite calcular saldos sem poder autorizar um gasto. É melhor descrita como um derivado menos privado da chave de gastos, e não como uma cópia mais fraca da seed.

A Full Viewing Key (FVK) fornece visibilidade completa somente para leitura, mantendo uma separação de segurança rigorosa. Ao descriptografar textos cifrados de notes recebidas e enviadas (por meio de seu componente de chave de visualização de saída), uma carteira complementar apenas com FVK pode apresentar um histórico de transações completo e identificado, em vez de apenas um saldo atual.

Vários endereços de pagamento diversificados e não vinculáveis compartilham a mesma FVK e chave de visualização de entrada (IVK), permitindo a geração ilimitada de endereços sem aumentar a sobrecarga de análise da blockchain.

Esta separação funcional constitui a base dos fluxos de trabalho de assinatura a frio. Toda a análise contínua da chain, o acompanhamento de histórico e a gestão de endereços são transferidos para o software anfitrião, enquanto a autoridade de gasto permanece isolada no dispositivo de hardware.

![Diagramas de derivação de chaves](/content-images/key-derivation-diagrams.webp)

### A distinção crítica: UFVK vs. chave de gastos

> **A UFVK pode ser compartilhada. A chave de gastos precisa permanecer na carteira de hardware.**
>
> A carteira complementar utiliza a chave de visualização para monitorar a carteira, detectar fundos recebidos, identificar notes e ajudar a preparar transações. Não possui a chave privada necessária para autorizar gastos.

Como mencionado anteriormente, a separação de chaves é a base da arquitetura de assinatura a frio.

A carteira complementar consegue executar a maior parte do trabalho necessário para preparar uma transação sem nunca controlar os fundos. A carteira de hardware apenas precisa receber a transação preparada e executar a operação final de assinatura.

Os fabricantes de carteiras de hardware não precisam inventar esta separação. O design de chaves do Zcash já separa as capacidades de visualização da autoridade de gasto no nível do protocolo, e os fabricantes simplesmente desenvolvem suas funções de assinatura e exportação sobre essa estrutura existente. O protocolo permite que informações como um endereço blindado ou chave de visualização completa sejam derivadas de uma chave de gastos, enquanto a própria chave de gastos permanece privada, permitindo que carteiras de hardware como Ledger, Keystone e Hito forneçam ao software complementar as informações de visualização de que ele precisa sem nunca expor a chave privada capaz de gastar os fundos.

### O que a carteira complementar realmente faz com as informações da chave

Usando o material da chave de visualização, a carteira complementar pode:

- Identificar seus fundos e notes
- Determinar quais notes podem ser gastas
- Derivar ou identificar endereços relevantes
- Construir a transação
- Gerar ou coordenar as provas necessárias
- Preparar a transação para assinatura

É importante saber que precisar construir uma transação não é o mesmo que precisar da chave privada de gastos. Esse desacoplamento é uma das ideias centrais de segurança por trás da integração de carteiras de hardware.

## Construção e autorização de transações blindadas

Estes são os processos envolvidos na criação e autorização da transação. Em termos simples, estes processos são o que a carteira realmente faz com esses dados para enviar dinheiro:

### Construção da transação (montagem da transação blindada)

A construção de uma transação é o processo de montar as informações necessárias para criar uma transação válida do Zcash a partir do pagamento pretendido pelo usuário.

O processo de construção da transação combina as notes selecionadas, destinatários, valores, taxas, nulificadores e outros dados de transação necessários em uma estrutura de transação. Para transações blindadas, também prepara as informações necessárias para gerar as provas de conhecimento zero e assinaturas exigidas.

Em geral, a carteira complementar executa esta fase. Ela:

- Seleciona as notes a gastar
- Determina as entradas e saídas da transação
- Calcula os valores necessários
- Prepara os dados da transação que serão posteriormente comprovados e assinados.

Em uma configuração de assinatura a frio, os dados de transação resultantes podem ser empacotados em um PCZT e transmitidos à carteira de hardware para a etapa de assinatura crítica para a segurança.

### Geração de provas (demonstração da validade do protocolo)

A geração de provas refere-se à geração de provas de conhecimento zero (como Halo 2 ou Groth16) que demonstram que uma transação segue as regras do protocolo Zcash.

A prova ajuda a rede a garantir:

- O usuário que gasta está autorizado a gastar as notes
- As notes realmente existem
- Os nulificadores correspondentes são únicos
- O total das entradas é igual ao total das saídas mais as taxas.

Faz tudo isso sem revelar quaisquer detalhes privados subjacentes.

A geração de provas exige muito processamento. Transferir esta responsabilidade para o dispositivo complementar impede que a carteira de hardware fique bloqueada ou sem memória.

### Assinatura (autorização do gasto)

A assinatura é fundamentalmente distinta da geração de provas. Uma assinatura digital funciona como um carimbo explícito de autorização produzido pelo detentor da chave privada.

Enquanto uma prova de conhecimento zero verifica a validade da transação, uma assinatura digital prova a autoridade de gasto. A assinatura certifica que o verdadeiro proprietário aprova os parâmetros específicos da transferência.

A assinatura requer poder computacional mínimo, o que a torna ideal para uma carteira de hardware.

### O que é assinatura a frio blindada?

A assinatura a frio blindada é um método de autorizar uma transação blindada do Zcash mantendo as chaves privadas de gastos isoladas da carteira complementar conectada à Internet. A transação pode ser construída e preparada em um computador online, enquanto uma carteira de hardware separada, mantida offline ou isolada de outra forma, utiliza suas chaves protegidas para autorizar a transação.

O processo pode ser simplificado como:

![Processo de assinatura offline blindada](/content-images/cold-signing-process.webp)

A carteira complementar envia os parâmetros estruturados da transação ao dispositivo de hardware, que assina internamente a carga útil sem nunca liberar a chave privada de gastos para a máquina anfitriã.

## Carteiras complementares e de hardware

As transações blindadas podem envolver tanto uma carteira complementar quanto uma carteira de hardware, cada uma com uma função distinta.

### Carteira complementar

O que é uma carteira complementar?

A carteira complementar funciona em um computador ou dispositivo móvel e executa a maioria das tarefas envolvidas na criação da transação, tais como:

- Selecionar as notes a gastar
- Construir a transação
- Calcular os dados necessários da transação
- Coordenar a geração das provas de conhecimento zero exigidas.

### Por que uma carteira complementar é útil?

A carteira complementar cuida do processo de criação da transação, mas, se o computador for infectado por malware, um invasor poderá conseguir:

- ver o que você está fazendo,
- modificar uma transação não assinada,
- tentar enganá-lo para aprovar algo.

A carteira complementar não precisa ter acesso à chave privada armazenada na carteira de hardware; por isso, pode cuidar da construção da transação e de outras tarefas computacionais enquanto a carteira de hardware fornece o limite de segurança para a chave privada.

### Carteira de hardware

Uma carteira de hardware é um dispositivo físico offline que isola suas chaves privadas de celulares ou computadores conectados, funcionando como um cofre seguro para seus criptoativos.

### Por que uma carteira de hardware é útil?

Se o seu computador for infectado por malware, um invasor poderá conseguir:

- ver o que você está fazendo,
- modificar uma transação não assinada,
- tentar enganá-lo para aprovar algo.

A chave privada não pode ser simplesmente extraída da carteira de hardware, portanto o dispositivo pode atuar como um limite de segurança.

Imagem das capacidades da carteira complementar versus hardware

A separação entre estas duas carteiras é particularmente importante para transações blindadas porque elas são mais complexas do que transações transparentes e envolvem componentes como notes blindadas, nulificadores, compromissos, provas de conhecimento zero e assinaturas de transação.

Seria impraticável que a carteira de hardware executasse todas as operações computacionais. Em vez disso, a carteira complementar prepara a transação e fornece as informações necessárias à carteira de hardware para assinatura, enquanto a chave de gastos privada permanece isolada dentro do dispositivo de hardware.

## Isolamento de chaves

> Isolamento de chaves significa que as chaves privadas que podem autorizar um gasto nunca saem da carteira de hardware. O componente complementar pode preparar a transação; não pode assiná-la.

O isolamento de chaves refere-se a manter as chaves privadas necessárias para autorizar uma transação separadas da carteira complementar e do dispositivo em que ela funciona. Em uma configuração de assinatura a frio blindada, a carteira complementar pode construir a transação e coordenar as provas necessárias, enquanto a carteira de hardware mantém as chaves privadas de gastos sensíveis isoladas.

Se o computador ou celular complementar for comprometido, um invasor poderá conseguir interagir com a transação antes de ela ser assinada, mas idealmente não consegue extrair a chave privada da carteira de hardware. Portanto, a chave permanece dentro do limite de segurança do dispositivo de hardware.

Esta separação permite que a carteira complementar execute a construção de transações e tarefas computacionais sem conceder a ela acesso direto ao material de chave necessário para autorizar a transação.

![Isolamento de chaves](/content-images/key-isolation.webp)

A distinção fundamental é que “chave de visualização” não significa que o aplicativo recebe uma versão mais fraca da seed.

No Zcash, uma Full Viewing Key (FVK/UFVK) é deliberadamente derivada da chave de gastos e confere ao titular a capacidade de detectar e decifrar atividade blindada relevante, mas não de autorizar gastos. A FVK é um derivado menos secreto da chave de gastos.

**Uma importante ressalva de privacidade:**

Por isso, você deve saber que o aplicativo não pode roubar os fundos apenas com a UFVK, mas consegue ver a atividade blindada privada da carteira.

É por isso que é mais rigoroso descrever o aplicativo complementar como tendo *autoridade de visualização*, em vez de simplesmente dizer que possui “informação pública”.

A forma mais simples de explicar toda a ideia é dizer que a carteira complementar recebe material de chave suficiente para saber o que está acontecendo com a carteira, mas não material de chave suficiente para autorizar o que acontece aos fundos da carteira. A carteira de hardware, contudo, mantém a autoridade de gastos isolada e a utiliza apenas quando o usuário aprova uma transação.

Este é o modelo central de isolamento de chaves por trás destes designs de carteiras de hardware blindadas do Zcash, e é o mesmo modelo que surge, implementação por implementação, em Ledger, Keystone e Hito, que serão abordados em breve.

## PCZT

PCZT significa Transação Zcash Parcialmente Criada. É o pacote que transporta uma transação Zcash e as informações necessárias para concluí-la de uma etapa para outra.

É um formato padronizado para uma transação Zcash enquanto ela ainda está sendo construída. Permite que diferentes participantes ou dispositivos executem diferentes partes do processo de criação da transação e transmitam entre si a transação parcialmente concluída.

Construir uma transação é significativamente mais complexo do que assinar uma simples transferência pública em protocolos de criptomoeda de conhecimento zero como o Zcash. As transações blindadas requerem provas de conhecimento zero computacionalmente intensivas, como as geradas usando Halo 2 ou Groth16. Consequentemente, dispositivos de baixa potência, como carteiras de hardware, podem não ter memória e capacidade de processamento para lidar com todo o fluxo de trabalho da transação.

A introdução de PCZT enfrenta vários desafios centrais da arquitetura cripto blindada. PCZT é um formato de dados intermediário padronizado que divide a criação de transações em funções modulares e independentes. Permite que um computador complementar potente lide com a montagem de transações e a geração de provas, restringindo uma carteira de hardware offline estritamente à autorização e à assinatura.

### Limitações de hardware e armazenamento a frio

Embora as carteiras de hardware proporcionem um ambiente seguro para proteger chaves privadas de gastos, normalmente têm RAM, poder computacional e capacidades de transferência de dados limitados em comparação com computadores complementares. Essas restrições tornam impraticável que executem a geração computacionalmente intensa de provas de conhecimento zero ou mantenham o estado completo da transação exigido durante o processo de construção.

Como resultado, a carteira complementar pode lidar com as tarefas computacionalmente exigentes, enquanto a carteira de hardware permanece concentrada na operação crítica para a segurança de autorizar a transação com suas chaves de gastos protegidas.

Isso nos leva a perguntar: se o dispositivo é tão limitado, como ele ainda consegue realizar verificação *suficiente* para ser confiável?

Simplificando, uma carteira de hardware não pode aceitar um valor arbitrário de um computador complementar e assiná-lo. Ela precisa de informações suficientes para determinar que o valor assinado corresponde à transação que o usuário pretende autorizar. Isso cria um equilíbrio difícil, porque o dispositivo deve efetuar análise e verificação suficientes para proteger o processo de assinatura, operando dentro de limites estritos de memória, computação, tamanho de firmware e complexidade de implementação.

O tratamento de Ledger Orchard PCZT é um exemplo deste desafio, sugerindo que a análise especializada dependente de circuitos pode tornar a implementação mais gerenciável em dispositivos limitados, mas também pode exigir alterações de firmware quando as estruturas ou os circuitos de transação compatíveis evoluem.

Dois esforços em andamento ilustram respostas diferentes a esta mesma restrição.

Uma proposta de pesquisa para um pipeline de geração de provas totalmente em tempo constante adequado a arquiteturas de carteiras de hardware open-source e computadores comuns foi apresentada no Grant #423. O objetivo era investigar infraestrutura criptográfica que pudesse ser implementada com segurança em ambientes como C ou Rust, reduzindo simultaneamente a complexidade e o peso de manutenção do suporte blindado do Zcash.

Contudo, uma abordagem alternativa é representada pelo proposto **Zcash SeedSigner**, um assinante open-source e isolado por air gap, construído a partir de componentes baratos e facilmente disponíveis. O fluxo de trabalho proposto mantém o computador complementar separado do dispositivo de assinatura, transmitindo um PCZT através de um air gap para verificação e assinatura no dispositivo.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Juntas, estas abordagens ilustram o desafio de engenharia mais amplo por trás das carteiras de hardware blindadas: a construção e a geração de provas de transações podem ocorrer fora do dispositivo crítico para a segurança, mas o assinante ainda precisa possuir informações e capacidade de verificação suficientes para autorizar com segurança a transação resultante.

### PCZT permite a arquitetura dividida

A norma Transação Zcash Parcialmente Criada (PCZT) é a estrutura de dados formal que conecta a carteira complementar à carteira de hardware.

Uma carteira complementar consegue lidar com a seleção de notes, calcular os nulificadores e gerar a prova de conhecimento zero por conta própria. Isso é possível porque as informações necessárias para estas etapas, incluindo a chave usada para derivar nulificadores, provêm da chave de visualização e não de algo ligado à autoridade de gastos. A carteira complementar então empacota estes elementos em um contêiner PCZT.

O PCZT é entregue à carteira de hardware, que lê o contexto da transação (como valores e endereços dos destinatários), aplica a assinatura usando suas chaves de gastos protegidas e devolve o PCZT atualizado ao dispositivo complementar.

Este design estabelece um limite de segurança rigoroso: hardware anfitrião potente pode executar matemática complexa de conhecimento zero sem precisar de acesso a chaves de gastos, enquanto dispositivos de armazenamento a frio de baixa potência podem impor segurança financeira sem precisar calcular criptografia pesada.

### Compromissos de privacidade do provador

Embora delegar a geração de provas de conhecimento zero à carteira complementar ou a outro provador mantenha as chaves de gastos isoladas, ainda exige que o provador acesse informações sensíveis da transação, como valores de notes, endereços dos destinatários e compromissos.

O PCZT mantém a separação arquitetural ao garantir que estas informações podem ser fornecidas para a geração de provas sem transferir as chaves privadas de gastos necessárias para a autorização.

Isso garante que a autoridade de geração de provas está separada da autoridade de gastos. O provador pode executar a geração de provas computacionalmente intensiva sem obter a autoridade criptográfica para gastar os fundos do usuário.

### Interoperabilidade de PCZT

À medida que PCZT se torna uma parte importante dos fluxos de trabalho de carteira de hardware, multifirma e assinatura por air gap do Zcash, a interoperabilidade entre implementações independentes torna-se cada vez mais importante.

Uma proposta de junho de 2026 por AngryDavee observou que já existiam implementações de PCZT em projetos incluindo Ledger, Keystone, Hito, OneKey e a implementação de referência em librustzcash. Contudo, a proposta identificou a falta de testes compartilhados para confirmar que estas implementações interpretam PCZTs de forma consistente.

A solução proposta foi uma suíte de testes de interoperabilidade open-source contendo vetores de teste canônicos de PCZT e testes entre implementações que abrangem o fluxo completo criar → assinar → finalizar. Também propôs testar limites de funções como o Combinador, em que informações parcialmente assinadas de diferentes assinantes podem ser combinadas antes de uma transação ser finalizada.

Isso é particularmente relevante para carteiras de hardware porque PCZT permite separar a construção e a assinatura de transações: uma carteira complementar pode construir uma transação e preparar um PCZT, enquanto um dispositivo de hardware recebe as informações de assinatura necessárias e executa a operação de assinatura crítica para a segurança.

A proposta não foi implementada porque Zcash Community Grants decidiu não avançar com o subsídio após analisar a proposta e considerar o feedback da comunidade. Como resultado, a suíte de testes entre implementações proposta não foi desenvolvida por meio deste subsídio. É, portanto, uma resposta proposta a um desafio identificado de interoperabilidade de PCZT, e não uma norma que atualmente exista no Zcash.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### O ciclo de vida de um PCZT

| # | Fase | Descrição |
|---|---|---|
| 1 | Criador | Inicializa o PCZT com metadados globais da transação, incluindo versões da transação, IDs de ramos de consenso e indicadores de pool. |
| 2 | Construtor | Preenche a transação com as entradas e saídas pretendidas nos pools transparente, Sapling, Orchard ou Ironwood. |
| 3 | Finalizador de E/S | Declara o conjunto completo de entradas e saídas, calcula chaves de assinatura de ligação e assina gastos fictícios quando necessário. |
| 4 | Atualizador | Anexa dados de contexto necessários para participantes subsequentes, como chaves de visualização completas, âncoras e testemunhas Merkle. |
| 5 | Provador e assinante | Executa a geração de provas de conhecimento zero e a assinatura criptográfica. Em versões modernas de PCZT, estas duas tarefas são totalmente independentes e podem ocorrer sequencialmente ou em paralelo. |
| 6 | Combinador | Mescla deterministicamente múltiplas instâncias de PCZT se dispositivos diferentes trabalharem simultaneamente em aspectos da mesma transação. As regras de mesclagem exigem resolução rigorosa de conflitos para evitar perda acidental de dados. |
| 7 | Finalizador de gastos e extrator | Valida todos os elementos criptográficos necessários, remove metadados intermediários de contexto e produz a transação Zcash finalizada, pronta para transmissão na rede. |

## Implementações reais de carteiras de hardware

### Resumo

| Dispositivo   | O que o componente complementar recebe              | O que permanece no dispositivo          | Transporte      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / Orchard FVK, endereços            | Autoridade de gastos                | USB / BLE      |
| Keystone | UFVK + Unified Address                   | Seed / chaves de gastos              | QR (air-gapped)|
| Hito     | UFVK, Unified Address, impressão digital da seed  | Seed e chaves privadas de gastos    | QR / local     |

Várias implementações de carteiras de hardware foram desenvolvidas para explorar como as transações blindadas do Zcash podem ser suportadas mantendo as chaves de gastos sensíveis isoladas da carteira complementar. Ledger, Keystone e Hito representam abordagens diferentes para integrar proteção de chaves baseada em hardware ao fluxo de trabalho de transações Zcash.

![Implementações reais de carteiras de hardware](/content-images/hardware-wallet-implementations.webp)

Para compreender como protegem os fundos blindados, é importante distinguir entre chaves de gastos e chaves de visualização. Nas três, a divisão segue a mesma estrutura:

| Dispositivo | O que o aplicativo complementar pode receber | O que permanece protegido no dispositivo |
|---|---|---|
| Ledger | UFVK / Orchard FVK, endereços e informação pública | Autoridade de gastos / material de chave privada |
| Keystone | UFVK + Unified Address | Seed / chaves de gastos |
| Hito | UFVK, Unified Address, impressão digital da seed e informações de rede | Seed e chaves privadas de gastos |

### Ledger como ambiente de assinatura de hardware

Ledger é uma empresa de carteiras de hardware. Seus dispositivos são construídos em torno de um Secure Element, um chip dedicado projetado para guardar material de chave privada e mantê-lo fisicamente isolado do restante do dispositivo e de tudo o que está conectado a ele. Esse Secure Element é toda a razão pela qual um dispositivo Ledger é confiável para armazenamento a frio. Isso significa que, mesmo se o computador ou celular conectado a ele for comprometido, as chaves dentro do Secure Element não podem ser extraídas.

Por si só, contudo, um dispositivo Ledger está vazio em relação a qualquer criptomoeda específica. Ele precisa ter instalado um aplicativo que saiba lidar com a criptografia particular dessa moeda.

Um dispositivo Ledger está vazio em relação a qualquer criptomoeda específica, portanto precisa de um aplicativo que conheça a criptografia dessa moeda. Para o Zcash existiram duas gerações:

- O aplicativo original “Zcash Shielded”, desenvolvido por Zondax, usado com carteiras complementares como Zkool e retirado em 5 de novembro de 2026; e
- O aplicativo Zcash mais recente da Ledger (3.9.4+), usado nativamente por Ledger Wallet Desktop 4.21+ para Ironwood blindado de ZEC.

O modelo de isolamento de chaves abaixo aplica-se a ambos.

Zkool é a carteira complementar no seu celular ou computador que se comunica com esse aplicativo. Ela constrói a transação, envia-a ao Ledger, o aplicativo Zondax no dispositivo a assina e envia a assinatura de volta.

Assim, Zondax é o software em execução no hardware; Zkool é o software em execução fora dele, usando o aplicativo da Zondax para se comunicar com o dispositivo.

### O que sai do Ledger?

O software Zcash do Ledger inclui uma função específica para exportar a chave de visualização da carteira, a chave que permite ao software ver saldos e transações sem conseguir gastar nada.

Esta função pode retornar uma de duas coisas:

- Uma chave de visualização completa unificada (UFVK), que é a chave de visualização completa que abrange simultaneamente todos os pools blindados do Zcash; ou
- Uma chave de visualização completa Orchard (FVK)

De qualquer forma, o que sai é apenas uma chave de visualização. Independentemente da versão solicitada, esta função não consegue retornar a única informação que realmente permitiria a alguém mover fundos: a chave de gastos.

Esse é todo o objetivo de sua construção: ela foi concebida para que a única coisa que consegue exportar seja algo seguro para entregar a um aplicativo complementar.

A hierarquia de chaves do Zcash está estruturada de tal modo que, para cada pool blindado, a chave de gastos deriva duas coisas separadas:

- Uma chave de autorização de gastos; e
- Uma chave de visualização completa

A FVK pode então derivar capacidades adicionais relacionadas à visualização, mas em nenhum momento esse caminho de derivação leva de volta à autoridade de gastos. Depois que uma chave se ramifica para o lado de visualização da hierarquia, ela permanece ali e não pode ser usada para reconstruir a chave de autoridade de gastos da qual veio.

Ironwood segue este mesmo padrão, pois reutiliza a construção subjacente de chaves e notes de Orchard. Contudo, é um pool distinto no nível do consenso, com sua própria árvore de compromissos e conjunto de nulificadores. Isso significa que uma UFVK é realmente um conjunto de chaves de visualização por pool (transparente, Sapling, Orchard e agora Ironwood), e não uma única chave simples.

Uma UFVK exportada antes da ativação de Ironwood não incluirá uma chave de visualização Ironwood, já que esse pool ainda não existia. É precisamente por isso que as carteiras tiveram de ser atualizadas para reconhecer e derivar UFVKs compatíveis com Ironwood após a atualização NU6.3.

### O que permanece no Ledger?

A autoridade de gastos permanece no dispositivo.

O Signer do Ledger recebe uma transação/PCZT do anfitrião e gera a assinatura de autorização de gastos conforme o pool do qual a transação gasta (o pool Ironwood, porque a integração atual do Ledger suporta apenas Ironwood). A assinatura é então produzida no dispositivo, e o anfitrião recebe apenas a assinatura, não a chave privada de gastos.

Isso também é consistente com o modelo geral de segurança do Ledger. Seu Secure Element isola material de chave privada, e os requisitos de segurança dos aplicativos do Ledger proíbem especificamente que os aplicativos exponham esses segredos ao anfitrião.

O assinante do Ledger pode exportar a FVK/UFVK enquanto executa de forma independente a assinatura de transações. As duas capacidades são fornecidas por funções separadas, não agrupadas em uma só.

### O que isso significa na prática?

Suponha que seu Ledger contém 10 ZEC.

A carteira complementar pode ter a UFVK e, portanto, determinar: "Esta carteira recebeu 10 ZEC." Ela pode analisar e apresentar transações e saldos.

Mas, se alguém comprometer a carteira complementar, a UFVK por si só não lhe concede a capacidade de criar a assinatura de autorização de gastos.

O propósito da assinatura de autorização de gastos separada é permitir que dispositivos limitados, como carteiras de hardware, autorizem gastos blindados sem terem de realizar a prova zk-SNARK completa.

### Aplicativo Zondax Ledger; o lado da carteira de hardware

#### O que é Zondax?

Zondax é uma empresa terceirizada de desenvolvimento que construiu o aplicativo Ledger Zcash. É o aplicativo de firmware real que funciona no hardware Ledger e dá ao dispositivo a capacidade de compreender e processar transações Zcash.

Zondax é um desenvolvedor externo. O hardware Ledger não tem capacidade inata para processar transações Zcash, e essa capacidade vem inteiramente do software da Zondax.

### Implementação original do Ledger Zcash

O repositório do aplicativo Ledger Zcash da Zondax é o software que funciona em um dispositivo Ledger. Inicialmente, o aplicativo se concentrava em transações blindadas Sapling, antes de Orchard existir como o principal pool blindado do Zcash, de modo que o suporte a Sapling era a extensão do que um dispositivo Ledger conseguia fazer com ZEC blindado.

Sua arquitetura ilustra a separação, com o lado anfitrião/complementar preparando as informações da transação enquanto o Ledger lida com as operações sensíveis de chave e a assinatura.

Mesmo nesta primeira versão do suporte a carteira de hardware do Zcash, os princípios centrais — construção e geração de provas no anfitrião, depois assinatura isolada no dispositivo — já faziam parte do design.

### Evolução para Orchard

O trabalho do Ledger avançou para Orchard + PCZT. Foi uma transição significativa, e não uma pequena atualização, dado que Orchard usa um sistema de geração de provas diferente (Halo 2, em vez do Groth16 de Sapling) e uma construção diferente de notes e chaves; assim, expandir o firmware apenas de Sapling para lidar com a assinatura de Orchard exigiu novas bases criptográficas no lado do dispositivo, e não apenas uma correção de firmware.

Contudo, à medida que o Zcash avançava para Ironwood, Zondax e Ledger mudaram o foco de seu desenvolvimento para suportar Ironwood diretamente, em vez de concluir uma implementação de Orchard apenas para posteriormente redesenhá-la para Ironwood. Isso representa uma etapa adicional na evolução da implementação do Ledger, pois Ironwood se baseia na arquitetura criptográfica de Orchard, introduzindo simultaneamente um pool blindado separado e alterações adicionais ao protocolo.

### O que acontece dentro deste aplicativo Ledger

O fluxo resultante é descrito da seguinte forma:

1. O anfitrião constrói um PCZT.
2. O anfitrião envia as informações relevantes da transação ao dispositivo Ledger.
3. O dispositivo produz as assinaturas de autorização de gastos Orchard.
4. O anfitrião lida com tudo o que vem a seguir, incluindo a assinatura de ligação e a montagem final da transação.

O aplicativo executado dentro do Ledger nunca vê nem produz nada além da própria assinatura de autorização de gastos, e todo o trabalho computacionalmente pesado ou que exige muitos dados (geração de provas, ligação, montagem) permanece no anfitrião, que não precisa ser confiado com material de chave.

### Integração blindada nativa do Ledger; Ledger Wallet Desktop

A integração mais recente do Ledger Zcash fornece um exemplo concreto de como a construção de transações blindadas e a assinatura crítica para a segurança podem ser separadas entre um software complementar e uma carteira de hardware.

Com Ledger Wallet Desktop 4.21+ e o aplicativo do dispositivo Zcash 3.9.4+, os usuários podem enviar e receber ZEC Ironwood blindado diretamente pelo Ledger Wallet Desktop. A integração suporta transferências privadas para privadas, blindagem a partir do pool transparente, desblindagem para o pool transparente, endereços privados de recebimento e memorandos. As transações são verificadas e assinadas no dispositivo Ledger, em vez de dependerem apenas das informações apresentadas pelo computador.

Uma parte essencial desta arquitetura é a separação entre capacidades de visualização e gastos. Durante a sincronização de saldo privado, o Ledger exporta uma chave de visualização completa unificada (UFVK), que é armazenada localmente no computador. A UFVK permite que o Ledger Wallet Desktop detecte transações blindadas relevantes e determine o saldo da carteira, mas não fornece autoridade para gastar os fundos. A autoridade de gastos crítica para a segurança permanece no dispositivo Ledger, que executa a operação final de assinatura. Isso cria um limite claro entre o computador, que gerencia o estado da carteira e constrói transações, e o dispositivo de hardware, que protege a capacidade necessária para autorizar gastos.

Contudo, a integração atual é especificamente apenas para Ironwood. Ela não apresenta nem gerencia fundos Orchard ou Sapling pelo Ledger Wallet Desktop. Isso é historicamente significativo porque o desenvolvimento anterior do Ledger Zcash estava associado ao suporte blindado de Orchard antes de a implementação evoluir para o protocolo Ironwood.

A transição também destaca a importância da compatibilidade de chaves e contas. O Ledger tem um aplicativo "Zcash Shielded" mais antigo, desenvolvido pela Zondax e usado por integrações como YWallet e zkool, que está sendo descontinuado. Como esse aplicativo antigo usava um esquema de derivação diferente para contas blindadas, suas contas Sapling não podem ser simplesmente reproduzidas pelo novo aplicativo Ledger.

Assim, a integração ilustra tanto o progresso quanto as limitações restantes do suporte a carteiras de hardware blindadas. O Ledger agora consegue proporcionar uma experiência Ironwood completa, em que o software complementar lida com a sincronização da carteira e a preparação das transações, enquanto o dispositivo de hardware permanece como limite de segurança para gastos.

Ao mesmo tempo, a compatibilidade histórica de contas, o suporte apenas a pools blindados específicos, os limites de tamanho de transações de hardware, as restrições de plataforma e as limitações computacionais e de firmware envolvidas na análise e verificação de transações blindadas mostram que o suporte a carteiras de hardware para o Zcash depende não apenas das capacidades do protocolo, mas também do design e dos recursos de cada implementação individual.

### Zkool + Ledger — uso do aplicativo oficial Zondax

Como sucessor da Ywallet, Zkool herdou o objetivo da assinatura a frio blindada, mas tomou um caminho diferente para alcançá-lo, moldado diretamente pelo fato de que a criptografia, por si só, não torna uma integração utilizável se o aplicativo de assinatura não puder ser distribuído com segurança.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Uso do aplicativo Zondax pelo Zkool

Zkool passou a usar o aplicativo oficial Ledger Zcash, desenvolvido pela Zondax, em vez do aplicativo Ledger proprietário abandonado da Ywallet. Em vez de manter um aplicativo personalizado que a loja do Ledger não aceitaria, Zkool se baseou no aplicativo que já era aceito e distribuído pelo próprio ecossistema do Ledger.

Essa mudança significou que os usuários deixaram de precisar depender da instalação de um aplicativo Ledger personalizado não assinado para usar esta integração, já que o aplicativo da Zondax era distribuído oficialmente pelo ecossistema do Ledger.

Contudo, esta integração enfrenta uma alteração importante em 5 de novembro de 2026, quando o suporte ao aplicativo legado Zcash Shielded está previsto para terminar à medida que o Ledger o elimina gradualmente. Como a integração do Zkool com o Ledger depende deste aplicativo, a alteração levanta questões sobre a disponibilidade futura da conexão existente. O impacto preciso no Zkool depende de poder continuar usando o aplicativo legado fora do Ledger Wallet ou de migrar para uma alternativa compatível.

### Pools blindados suportados

Segundo o desenvolvedor da Ywallet, a integração do Zkool com o Ledger usava o aplicativo oficial Ledger desenvolvido pela Zondax e suportava tanto Zcash transparente quanto blindado. Contudo, seu suporte blindado era limitado a Sapling e não suportava Orchard, além de outras limitações de integração, como um máximo de cinco entradas e saídas de cada tipo e ausência de compatibilidade com o Ledger Live.

Essa limitação refletia o escopo da implementação subjacente da Zondax para o Ledger naquele momento. O trabalho anterior da Zondax com o Ledger fornecia suporte a Sapling, e o lançamento subsequente, em 2024, do aplicativo Zcash Shielded Ledger excluía inicialmente Orchard e Unified Addresses. Consequentemente, uma integração construída em torno desse aplicativo herdava as capacidades e limitações da implementação de carteira de hardware da qual dependia.

A situação evoluiu posteriormente com o lançamento do aplicativo dedicado Zcash Shielded Ledger em novembro de 2024. A Zondax afirmou que o aplicativo havia sido lançado oficialmente pelo Ledger Live e publicou posteriormente orientações de integração e pacotes Rust e JavaScript para permitir a integração por outras carteiras. No lançamento, contudo, o aplicativo se comunicava exclusivamente com o Zecwallet Lite Desktop, enquanto integrações mais amplas de carteiras ainda estavam em desenvolvimento.

A fase seguinte foi o desenvolvimento do aplicativo Rust mais recente do Zcash baseado no Ledger. Em junho de 2026, o Ledger informou que o compartilhamento de UFVK e a geração de Orchard Unified Address haviam sido implementados, enquanto a assinatura de transações Orchard e ClearSign ainda estavam em desenvolvimento. O Ledger também afirmou que o trabalho prosseguiria no caminho Ironwood à medida que o protocolo mudasse.

Ironwood exigiu posteriormente atualizações em todo o ecossistema de carteiras do Zcash. Zkool lançou suporte para migração de Orchard para Ironwood a partir da versão 6.24.0 e continuou a aperfeiçoar o pipeline de migração e transações em versões posteriores. Separadamente, o Ledger integrou a assinatura v2 de PCZT em seu novo aplicativo em 27 de julho, embora a implementação ainda não tivesse concluído a revisão do Ledger e a disponibilização no Ledger Live em 20 de agosto, um marco que entretanto foi concluído, com o Ledger Wallet Desktop 4.21+ agora oferecendo suporte nativo a Ironwood diretamente.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Assim, a evolução é mais bem entendida não como uma única atualização da Zondax para Ironwood, mas como vários desenvolvimentos relacionados: a implementação original focada em Sapling da Zondax, o aplicativo Zcash Shielded Ledger de 2024, o aplicativo Rust mais recente do Ledger com suporte a Orchard e PCZT, a integração nativa do Ledger no Ledger Wallet Desktop e atualizações paralelas de carteiras como Zkool à medida que o ecossistema transitava para Ironwood.

### Suporte atual a dispositivos e plataformas Ledger para Zcash

O suporte ao Zcash no Ledger depende de:

- O modelo do dispositivo
- O aplicativo instalado
- A plataforma usada para gerenciá-lo; e
- Se a transação é transparente ou blindada.

Em 21 de julho de 2026 (a última atualização do Ledger), o aplicativo Zcash Shielded é compatível com Nano S Plus, Stax e Flex, mas ainda não com Nano X nem Nano Gen5.

O Nano X e os outros modelos, exceto o Nano S original, ainda podem usar o aplicativo clássico Zcash, que suporta transações transparentes e o gasto de fundos blindados para endereços transparentes (desblindagem), mas não assinatura de blindado para blindado. O Nano S original não suporta nenhum dos aplicativos, porque o Ledger está eliminando gradualmente o suporte ao dispositivo e seu aplicativo Zcash mais recente não está disponível nele. Os dispositivos se conectam ao Ledger Wallet (anteriormente Ledger Live), o aplicativo complementar do Ledger, disponível para desktop em Windows, macOS e Linux, e em dispositivos móveis com iOS e Android.

O Ledger adicionou Zcash blindado nativo ao Ledger Wallet Desktop, construído sobre o pool Ironwood, eliminando a necessidade de uma carteira complementar separada. O ZEC blindado ainda não é suportado no aplicativo móvel do Ledger para iOS e Android, embora o suporte móvel esteja previsto para uma versão futura.

Fora do software do próprio Ledger, o uso blindado depende de uma carteira complementar compatível e das plataformas que ela suporta. À medida que o Ledger continua a expandir o suporte ao Ironwood, a compatibilidade depende do modelo do dispositivo, firmware, versão do aplicativo e sistema operacional, de modo que o suporte geral ao Zcash não garante necessariamente compatibilidade.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### Assinatura a frio da YWallet; uma abordagem anterior

Ywallet é uma carteira complementar, separada tanto do Ledger quanto da Zondax, que seguiu seu próprio caminho em direção à assinatura a frio blindada.

Ywallet é historicamente importante porque explorou a assinatura a frio para o Zcash, o que significa que o dispositivo de assinatura podia ser mantido separado da carteira online.

Para concretizar essa arquitetura no hardware Ledger, Ywallet construiu seu próprio aplicativo Ledger, um aplicativo proprietário, distinto do aplicativo Zondax abordado na seção anterior. Isso significava que Ywallet não dependia da implementação Sapling existente da Zondax; ela tinha seu próprio firmware executando o lado de assinatura da relação.

### Por que a integração era importante

Ter a criptografia e o código de assinatura não é suficiente. A integração de carteiras de hardware não é apenas um problema criptográfico; ela também é inevitavelmente um problema de distribuição e plataforma. No mínimo, envolve:

- Aprovação/distribuição do aplicativo — se a loja oficial de aplicativos do fabricante de hardware aceita e distribui o aplicativo
- Segurança de firmware/aplicativo — se o aplicativo cumpre os requisitos de segurança do fabricante para o tratamento de material de chave
- Protocolos de comunicação — como a carteira complementar e o dispositivo realmente trocam dados de transação
- Compatibilidade com a carteira — se os formatos de dados e o fluxo do aplicativo de assinatura correspondem ao que a carteira complementar espera
- Pools blindados suportados — para quais entre Sapling, Orchard (e agora Ironwood) o aplicativo realmente consegue assinar

O aplicativo Ledger proprietário da Ywallet cumpria os requisitos criptográficos e arquiteturais; conseguia assinar transações Zcash blindadas, mas não foi aceito na loja oficial de aplicativos do Ledger.

### Transição para longe do aplicativo Ledger proprietário

Como o aplicativo não foi oficialmente aceito, Ywallet teria de pedir aos usuários que instalassem firmware não assinado para usá-lo; isso é um verdadeiro compromisso de segurança para os usuários, e Ywallet optou por não pedir isso a eles. Por isso, Ywallet acabou abandonando essa integração específica em vez de seguir esse caminho.

Em vez de reviver um aplicativo proprietário, o desenvolvimento posterior (por meio de Zkool, sucessor da Ywallet) avançou para o aplicativo Ledger oficial construído pela Zondax, trocando uma implementação personalizada rejeitada por uma padronizada já aceita no ecossistema de distribuição do Ledger. Essa mudança foi o que acabou tornando novamente possível uma integração funcional com o Ledger.

### O legado da Ywallet

Mesmo depois de o próprio Ywallet ter deixado o desenvolvimento ativo, seu criador, Hanh, que também é membro da ZCG, continuou sendo uma voz relevante no ecossistema, especialmente quando a migração para Ironwood revelou relatos de fundos que pareciam ter desaparecido.

**ZODL: um usuário real teve fundos ausentes após a migração Orchard → Ironwood**

Um usuário, Jmo0615, relatou que fundos antes visíveis em sua carteira ZODL deixaram de aparecer após a migração de Orchard para Ironwood. Declarou que tinha restaurado a seed original, reiniciado e recuperado a carteira, e permitido que a versão 3.14.1 (1) de ZODL sincronizasse totalmente. Também confirmou que nenhuma carteira de hardware Keystone estava envolvida.

Não foi estabelecido que os fundos tenham realmente sido perdidos. Em vez disso, suspeita-se que seja um problema relacionado à descoberta ou migração da carteira, no qual fundos antes visíveis deixaram de ser exibidos após a transição para Ironwood. Fundos que não são detectados ou exibidos não devem ser automaticamente descritos como fundos permanentemente perdidos, e essa distinção é importante para compreender problemas de migração.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: “notes bloqueadas” podem explicar fundos aparentemente indisponíveis**

Outro aspecto importante das carteiras blindadas é como o estado da carteira pode afetar os fundos que um usuário realmente pode gastar. Hanh explicou que um usuário pode bloquear acidentalmente uma note por meio do controle de moedas, uma funcionalidade que permite aos usuários escolher manualmente quais notes são usadas para gastar. Nessa situação, uma note pode continuar existindo na carteira, mas ser marcada como indisponível para gasto.

Isso destaca uma distinção importante ao investigar problemas de carteira. A quantidade de ZEC existente em uma carteira nem sempre é igual à quantia atualmente disponível para gastar. Fatores como seleção de notes, sincronização, estado de migração, recuperação de carteira e configurações de controle de moedas podem afetar o saldo exibido ou disponível para gastar. Portanto, relatos de “fundos ausentes” devem distinguir cuidadosamente entre fundos que não são detectados ou exibidos, fundos que são detectados mas indisponíveis para gastar e fundos que realmente foram perdidos.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**O que é Keystone?**

Keystone é uma carteira de hardware isolada por air gap. Seu dispositivo de assinatura não tem conexão direta por cabo ou sem fio com o aplicativo complementar durante o próprio processo de assinatura, comunicando-se em vez disso por códigos QR. Está aqui emparelhada com Zashi (agora renomeada Zodl), a carteira complementar nativa do Zcash, e esse emparelhamento torna o princípio de isolamento de chaves incomumente explícito e fácil de acompanhar.

**O fluxo Keystone/Zashi**

A integração do Zcash da Keystone com Zashi torna essa separação particularmente explícita. Quando você conecta Keystone ao Zashi, a Full Viewing Key Unificada é transferida da Keystone para Zashi.

Assim, o fluxo é:

![Fluxo de visualização do Keystone e Zashi](/content-images/keystone-zashi-viewing-flow.webp)

**O que Zashi pode fazer com a UFVK?**

Zashi pode usá-la para:

- identificar transações blindadas recebidas
- determinar saldos
- obter informações sobre atividade blindada

Mas não pode gastar os fundos simplesmente porque possui a UFVK.

A UFVK é uma “capacidade de visualização” que permite conhecer saldos e transações, mas não permite gastar.

### O que permanece dentro da Keystone?

A seed/autoridade de gastos permanece na Keystone. Zashi não recebe a seed, a chave de gastos nem a chave privada de autorização de gastos. Recebe a UFVK, informações de endereço e as informações necessárias apenas para operação de visualização.

Juntas, essas duas metades completam o quadro. O que sai do dispositivo, como a UFVK, endereços e informações apenas de visualização, é suficiente para Zashi monitorar a conta, mas nada que saia do dispositivo é suficiente para retirar fundos dela.

É por isso que a integração entre Zashi e Keystone pode fornecer armazenamento a frio blindado. O aplicativo de carteira pode monitorar a conta sem possuir a autoridade necessária para gastar a partir dela. A integração foi lançada especificamente para permitir armazenamento a frio de ZEC blindado.

Quando você quiser gastar:

![Fluxo de gastos do Keystone e Zashi](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito segue um modelo de isolamento de chaves muito semelhante ao da Keystone, mas sua implementação é mais recente. Em vez de emparelhar com uma carteira complementar existente como Zashi, Hito é fornecida com sua própria carteira Android, e o processo de onboarding entre o dispositivo de hardware e esse aplicativo Android está documentado nos marcos de desenvolvimento da Hito.

**Onboarding: o que recebe o aplicativo Hito**

A carteira Android usa:

- a Full Viewing Key Unificada (UFVK)
- Unified Address
- impressão digital da seed ZIP-32
- informações de rede

ao integrar a conta de hardware.

Observe que o aplicativo Android nunca recebe a seed ou chaves privadas de gastos da carteira de hardware.

![Hito onboarding](/content-images/hito-onboarding.webp)

**O que recebe o aplicativo Hito?**

As informações de onboarding documentadas incluem:

- UFVK
- Unified Address
- impressão digital da seed ZIP-32
- Rede

A UFVK fornece à carteira Android as informações necessárias para operar a conta como uma carteira com capacidade de visualização sem receber a seed. A impressão digital da seed é um identificador de comprimento fixo derivado da seed, usado para reconhecer qual conta é qual; não é a própria seed e não concede nenhuma capacidade de gasto, razão pela qual sua presença não contradiz a afirmação “nunca recebe a seed” acima.

**O que permanece na Hito?**

A seed real, as chaves privadas de gastos e a autoridade de assinatura permanecem no dispositivo de hardware. Hito então executa a assinatura offline.

O marco atual da Hito indica que todo o fluxo de criação, exportação, assinatura offline e importação está operacional, apresentando transporte BLE e exportação QR BBQr do PCZT assinado.

Vale a pena nomear explicitamente esse fluxo, pois é a instância concreta do ciclo completo abordado anteriormente neste relatório: a carteira Android cria o PCZT não assinado, exporta-o para Hito, Hito assina offline com seu material de chave isolado, e o PCZT assinado é importado novamente para a carteira Android.

Em nenhum momento a seed ou chave de gastos atravessa essa fronteira em qualquer direção.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## Orchard para Ironwood: a evolução do suporte a carteiras de hardware

Orchard é um pool blindado no protocolo Zcash que permite aos usuários armazenar e transacionar ZEC com privacidade aprimorada. Introduzido na atualização da rede 5 (NU5), Orchard usa o sistema de provas Halo 2 e uma arquitetura criptográfica redesenhada para suportar transações blindadas sem revelar informações sensíveis da transação, como remetente, destinatário ou valor.

Ironwood é um pool blindado introduzido na atualização da rede NU6.3 do Zcash como sucessor do pool Orchard. Usa o protocolo criptográfico Orchard, introduzindo simultaneamente alterações projetadas para melhorar a segurança de longo prazo dos fundos blindados, incluindo recuperabilidade quântica e garantias mais fortes sobre a integridade da oferta.

De início, é essencial esclarecer que Ironwood não substituiu o protocolo Orchard por um sistema criptográfico inteiramente novo. Ironwood foi introduzido como um novo pool blindado construído a partir do protocolo Orchard existente. Isso significa que eles têm a mesma estrutura Action, o mesmo sistema de provas Halo 2 e as mesmas construções de notes e chaves.

Ironwood tem sua própria árvore de compromissos de notes, conjunto de nulificadores, âncora e pool de valor, portanto, no nível do consenso, é um pool genuinamente separado. Mas, criptograficamente, é uma extensão de Orchard, e não uma reconstrução.

Foi projetado assim para:

1. **Integridade da oferta.** Em 29 de maio de 2026, o pesquisador de segurança Taylor Hornby divulgou privadamente uma falha crítica de solidez no sistema de provas de conhecimento zero de Orchard, uma falha que poderia ter permitido criar ZEC falsificado sem deixar um rastro on-chain. Como os dados de transação de Orchard são privados, ninguém consegue verificar independentemente que nenhum ZEC falsificado foi criado antes da correção. Selar o pool antigo e iniciar um novo com saldo zero resolve esse problema de uma forma que corrigir Orchard no local não conseguiria.
2. **Garantir recuperabilidade quântica.** Ironwood foi projetado para que seus fundos possam participar de um futuro mecanismo de recuperação se as premissas subjacentes de logaritmo discreto forem quebradas algum dia.
3. **Minimizar alterações de implementação.** Em vez de projetar um protocolo blindado inteiramente novo, a arquitetura comprovada de Orchard foi reutilizada. Isso significou que foi necessário escrever do zero muito menos código novo de transação, provas, carteira e carteira de hardware.

### A cronologia pública

- 29 de maio: A vulnerabilidade de Orchard é divulgada.
- Junho: As transações Orchard são temporariamente restringidas enquanto uma correção inicial é disponibilizada por meio da NU6.2. Em 12 de junho, um desenvolvedor central aponta 21 de julho como meta para a atualização completa; posteriormente, ela atrasa uma semana. Foi levantada uma preocupação da comunidade de que os proprietários de Keystone seriam os últimos a migrar; um desenvolvedor central respondeu então que Keystone suportaria Ironwood desde o primeiro dia, com firmware previsto para 3 de julho, dependendo da finalização das constantes de assinatura e de alterações à API Orchard do núcleo do Zcash.
- Início de julho: A NU6.3 chega à testnet; Zebra 6.0.0 é lançado em 10 de julho.
- 27–28 de julho: O trabalho de assinatura v2 do Ledger Ironwood PCZT é integrado em um ramo de integração. Ironwood (NU6.3) é ativado em 28 de julho, no bloco 3 428 143, selando o pool original Orchard por trás de uma catraca que limita quanto ZEC pode sair de Orchard à quantia legitimamente depositada nele, e introduzindo um novo formato de transação.

Zebra torna-se o nó obrigatório, pois zcashd não suporta as novas regras de consenso. Os endereços não mudam porque Ironwood reutiliza a estrutura de destinatário de Orchard, portanto as carteiras encaminham automaticamente os endereços existentes para o novo pool. O que as carteiras precisam é de funcionalidade de migração, pois os fundos Orchard terão de acabar sendo movidos por seus proprietários para Ironwood, e novas saídas que recebem Orchard agora estão completamente bloqueadas pelo consenso.

### O que mudou tecnicamente

Os formatos de transação passaram da versão 5 para a versão 6, portanto uma única transação pode transportar um componente Ironwood junto com componentes existentes Sapling/Orchard/transparentes. PCZT foi estendido de acordo:

- A codificação passou de PCZT v1 para v2.
- Um bundle Ironwood separado agora fica ao lado dos bundles Sapling e Orchard.
- As transações v6 e um novo sighash v6 são suportados.
- Os textos simples das notes receberam uma nova versão (V3).

A alteração de sighash é mais importante especificamente para carteiras de hardware. Em v6, as âncoras Orchard e Ironwood são excluídas do hash de assinatura e alimentam apenas o resumo de dados de autorização. Trata-se de uma verdadeira alteração de firmware, não apenas de uma atualização de versão. Um dispositivo tem de implementar corretamente o novo sighash e recalculá-lo por conta própria, em vez de confiar no que o aplicativo complementar afirma que está aprovando.

O contrato de isolamento em si não mudou: o dispositivo ainda devolve apenas a assinatura de autorização de gastos, nunca `alpha`, e nunca produz a assinatura de ligação; o anfitrião também continua cuidando das provas e de todo o resto.

Uma regra de assinante mudou com v6, porém: gastos fictícios de preenchimento são assinados pelo Finalizador de E/S, e não pelo dispositivo, pois o dispositivo não tem como verificá-los em relação a dados de notes reais. A função de Assinante do dispositivo os ignora, em vez de ser solicitado que assine algo que não consegue verificar. As taxas exibidas também agora somam os saldos de valor Orchard e Ironwood, pois uma transação v6 pode gastar de qualquer pool na mesma transação.

Acertar essa contabilização de pools importa na prática, não apenas em teoria. Um bug recente na carteira Zcash da própria Brave é uma ilustração útil: o cálculo de taxas assumia que todas as entradas blindadas pertenciam ao pool Orchard legado, levando a ações duplicadas e estimativas de taxa incorretas sempre que uma transação envolvia de fato Ironwood. Essa é precisamente a classe de erro que o princípio “recalcule você mesmo, não confie no anfitrião”, por trás da assinatura de carteiras de hardware, existe para detectar. Uma carteira complementar calculou incorretamente a contabilização do pool, e apenas um dispositivo que verificasse independentemente sua própria matemática apontaria isso antes de aprová-la.

### Onde está cada assinante

**Ledger acabou de mudar todo o cenário.** Em 23 de setembro de 2026, Ledger lançou suporte nativo ao Zcash blindado diretamente dentro de Ledger Wallet Desktop, sem a necessidade de outro aplicativo complementar. Sua chave de gastos permanece no dispositivo, o computador faz os cálculos da transação e você aprova tudo na tela antes de ser assinado. Suporta apenas Ironwood, não os pools antigos Orchard ou Sapling. A desvantagem é que o aplicativo legado “Zcash Shielded”, desenvolvido pela Zondax e que exigia uma carteira complementar como Zkool para funcionar, está sendo descontinuado. Ledger está retirando esse aplicativo antigo da disponibilidade em 5 de novembro, portanto quem ainda o usa precisa mover seus fundos antes dessa data.

**Keystone está em boa forma.** O firmware 3.0.2 adicionou suporte completo a Ironwood em julho, e esse continua sendo o requisito estável atual. Porém, essa versão ou posterior é necessária para assinar qualquer coisa.

**Hito progrediu além do marco inicial de testnet.** Assinou e enviou com sucesso sua primeira transação real de Orchard para Ironwood em hardware físico (inicialmente em testnet). Atualizações posteriores confirmaram fluxos de mainnet (Ironwood→Ironwood, Ironwood→Transparente e outros) em hardware de produção. O firmware estável e a disponibilização mais ampla continuam em andamento.

Zondax e Zkool estão atualmente em transição. O aplicativo da Zondax é o que está sendo retirado na Ledger. Zkool, que dependia desse aplicativo para se comunicar com dispositivos Ledger, não indicou o que acontecerá com essa função quando o aplicativo antigo desaparecer. Não está claro se continuará sendo relevante para usuários de Ledger daqui em diante ou se seu futuro estará principalmente em outros dispositivos.

A própria migração é o maior efeito em cadeia. Como a quantia que atravessa pools é pública, as carteiras distribuem transferências por denominações padrão ao longo do tempo, em vez de mover um saldo em um único bloco visível, o que significa muitas transações para assinar por migração e é precisamente a razão pela qual a assinatura em lote de PCZT foi tão importante para carteiras de hardware.

O trabalho de firmware da Ledger também encontrou limites de hardware: um gasto de note real podia alcançar dezenas de milhares de chamadas de sistema criptográficas em um único comando, acionando o watchdog do dispositivo. A correção transferiu a aritmética de campos para software e exigiu um estado temporário compartilhado para caber dentro das restrições de pilha do Nano X.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### A evolução em uma imagem

![A evolução em uma imagem](/content-images/orchard-to-ironwood-evolution.webp)
