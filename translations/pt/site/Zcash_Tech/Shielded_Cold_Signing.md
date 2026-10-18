# Assinatura a Frio Blindada

> **Ideia-chave:** A wallet complementar vê tudo o que é necessário para construir e monitorizar uma transação blindada. Apenas a wallet de hardware detém a autoridade para autorizar um gasto. Essa separação é todo o objetivo da assinatura a frio blindada.

A blindagem em Zcash envolve mover fundos de um endereço público e transparente para um endereço privado e blindado, ocultando os detalhes da transação com as funcionalidades de privacidade de Zcash.

### O que muda quando blinda ZEC?

Numa transação transparente de Zcash, informações como:

- endereço do remetente
- endereço do destinatário
- montante transferido

podem ser observadas na blockchain.

Quando blinda ZEC, os seus fundos passam para um pool privado (como Ironwood). A blockchain consegue verificar que uma transação é válida sem revelar os detalhes privados da transação. Desde a atualização NU6.3, em 28 de julho de 2026, os fundos recém-blindados entram no pool Ironwood, uma vez que o pool Orchard mais antigo já não aceita novos depósitos, embora ainda permita levantamentos.

### Componentes de uma transação blindada

### 1. A nota (o registo do saldo blindado)

Uma nota é um registo criptográfico privado que representa uma quantia não gasta de ZEC pertencente a um utilizador.

Ao contrário de uma blockchain pública, onde os saldos são apresentados em texto simples, uma nota blindada cifra o valor e os detalhes de propriedade para que os observadores on-chain não consigam ver quem possui os fundos.

Ao iniciar uma transação, a wallet complementar examina o registo, identifica as notas não gastas do utilizador e seleciona quais gastar.

### 2. O anulador (o mecanismo de deteção de gasto duplo)

Como os detalhes de uma nota estão ocultos do registo público, a rede precisa de um mecanismo para detetar gasto duplo sem revelar qual nota está a ser gasta.

Um anulador é um marcador criptográfico único derivado de uma nota específica. Quando uma nota é gasta, o seu anulador é publicado na blockchain.

A rede verifica que o anulador não foi registado anteriormente. Caso não tenha sido, o gasto pode ser aceite. Fundamentalmente, um observador externo não consegue usar o anulador para determinar de que nota específica provém.

A wallet complementar deriva e constrói o anulador adequado como parte da montagem dos dados da transação.

## Chaves

As chaves são elementos de informação criptográfica que controlam o acesso aos seus fundos e permitem que a sua wallet execute operações como receber, visualizar e gastar ZEC.

Uma wallet contém várias chaves diferentes, cada uma com uma finalidade distinta, tal como uma única conta pode ter credenciais separadas para acesso de leitura e acesso de escrita.

As chaves são centrais para a relação entre a wallet complementar e a wallet de hardware, porque chaves diferentes têm finalidades diferentes e apenas uma delas precisa de permanecer guardada em segurança.

É importante saber que cada pool blindado constrói as suas chaves como uma árvore de derivação, onde as setas apontam de um componente para tudo aquilo que pode ser derivado dele. Os utilizadores que pretendam receber pagamentos blindados têm de possuir um endereço de pagamento blindado, gerado a partir de uma chave de gasto.

### A hierarquia de chaves

**1. Chave de gasto**

Esta é a chave mais sensível em termos de segurança. Dá a capacidade criptográfica de autorizar o gasto de ZEC.

Esta é a chave a que se refere sempre que surge neste relatório a expressão “a wallet de hardware detém a chave”.

Numa arquitetura de assinatura a frio, a chave de gasto é mantida dentro da wallet de hardware e nunca exposta à wallet complementar. A wallet complementar não deve necessitar de possuir esta chave.

Tanto em Sapling como em Orchard, as hierarquias de chaves derivam a autoridade de gasto e as capacidades de visualização como dois ramos distintos a partir de uma chave de gasto raiz:

- **Sapling:** Uma chave de gasto expandida (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) deriva chaves de autorização de prova (𝑎𝑘,𝑛𝑠𝑘) e chaves de visualização completas (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘), que por sua vez produzem chaves de visualização de entrada (𝑖𝑣𝑘) e endereços diversificados.
- **Orchard:** Uma chave de gasto raiz (𝑠𝑘) ramifica-se diretamente numa chave de autorização de gasto (𝑎𝑠𝑘) e numa chave de visualização completa (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Esta separação estrutural fornece a base criptográfica formal para o isolamento de chaves de hardware, que envolve a wallet exportar o ramo de visualização (UFVK) para o computador anfitrião para sincronização de saldo e construção de transações, mantendo simultaneamente o ramo de autorização de gasto permanentemente bloqueado no dispositivo.

A derivação de chaves é estritamente unidirecional. Isto significa que as chaves de visualização não podem ser invertidas para reconstruir a autoridade de gasto. A irreversibilidade criptográfica torna segura a exportação de uma Full Viewing Key Unificada (UFVK), porque concede visibilidade completa da wallet sem expor segredos de gasto no dispositivo.

**2. Chaves de visualização**

Zcash separa a capacidade de ver atividade blindada da capacidade de a gastar. Uma chave de visualização permite que uma wallet ou outra parte autorizada veja informações sobre transações blindadas sem conceder autoridade de gasto.

- **Full Viewing Key (FVK), envolvida como uma Full Viewing Key Unificada (UFVK):** derivada deliberadamente da chave de gasto, permite que o software detete e decifre a atividade blindada da wallet, identificando assim as transações. Também permite calcular saldos sem poder autorizar um gasto. É melhor descrita como um derivado menos privado da chave de gasto, e não como uma cópia mais fraca da seed.

A Full Viewing Key (FVK) fornece visibilidade completa apenas de leitura, mantendo uma separação de segurança rigorosa. Ao decifrar textos cifrados de notas recebidas e enviadas (através do seu componente de chave de visualização de saída), uma wallet complementar apenas com FVK pode apresentar um histórico de transações completo e identificado, em vez de apenas um saldo corrente.

Vários endereços de pagamento diversificados e não associáveis partilham a mesma FVK e chave de visualização de entrada (IVK), permitindo a geração ilimitada de endereços sem aumentar a sobrecarga de análise da blockchain.

Esta separação funcional constitui a base dos fluxos de trabalho de assinatura a frio. Toda a análise contínua da cadeia, acompanhamento de histórico e gestão de endereços são transferidos para o software anfitrião, enquanto a autoridade de gasto permanece isolada no dispositivo de hardware.

![Key derivation diagrams](/content-images/key-derivation-diagrams.webp)

### A distinção crítica: UFVK vs. chave de gasto

> **A UFVK pode ser partilhada. A chave de gasto tem de permanecer na wallet de hardware.**
>
> A wallet complementar utiliza a chave de visualização para monitorizar a wallet, detetar fundos recebidos, identificar notas e ajudar a preparar transações. Não possui a chave privada necessária para autorizar gastos.

Como referido anteriormente, a separação de chaves é a base da arquitetura de assinatura a frio.

A wallet complementar consegue executar a maior parte do trabalho necessário para preparar uma transação sem nunca controlar os fundos. A wallet de hardware apenas precisa de receber a transação preparada e executar a operação final de assinatura.

Os fabricantes de wallets de hardware não precisam de inventar esta separação. O design de chaves de Zcash já separa as capacidades de visualização da autoridade de gasto ao nível do protocolo, e os fabricantes simplesmente desenvolvem as suas funções de assinatura e exportação sobre essa estrutura existente. O protocolo permite que informações como um endereço blindado ou chave de visualização completa sejam derivadas de uma chave de gasto, enquanto a própria chave de gasto permanece privada, permitindo que wallets de hardware como Ledger, Keystone e Hito forneçam ao software complementar as informações de visualização de que necessita sem nunca expor a chave privada capaz de gastar os fundos.

### O que a wallet complementar realmente faz com as informações de chave

Usando o material da chave de visualização, a wallet complementar pode:

- identificar os seus fundos e notas
- determinar quais as notas que podem ser gastas
- derivar ou identificar endereços relevantes
- construir a transação
- gerar ou coordenar as provas necessárias
- preparar a transação para assinatura

É importante saber que precisar de construir uma transação não é o mesmo que precisar da chave privada de gasto. Esse desacoplamento é uma das ideias centrais de segurança por trás da integração de wallets de hardware.

## Construção e autorização de transações blindadas

Estes são os processos envolvidos na criação e autorização da transação. Em termos simples, estes processos são aquilo que a wallet realmente faz com esses dados para enviar dinheiro:

### Construção da transação (montagem da transação blindada)

A construção de uma transação é o processo de montar as informações necessárias para criar uma transação Zcash válida a partir do pagamento pretendido pelo utilizador.

O processo de construção da transação combina as notas selecionadas, destinatários, montantes, taxas, anuladores e outros dados de transação necessários numa estrutura de transação. Para transações blindadas, também prepara as informações necessárias para gerar as provas de conhecimento zero e assinaturas exigidas.

Em geral, a wallet complementar executa esta fase. Ela:

- Seleciona as notas a gastar
- Determina as entradas e saídas da transação
- Calcula os valores necessários
- Prepara os dados da transação que serão posteriormente provados e assinados.

Numa configuração de assinatura a frio, os dados de transação resultantes podem ser empacotados num PCZT e transmitidos à wallet de hardware para a etapa de assinatura crítica para a segurança.

### Provação (demonstração da validade do protocolo)

A provação refere-se à geração de provas de conhecimento zero (como Halo 2 ou Groth16) que demonstram que uma transação segue as regras do protocolo Zcash.

A prova ajuda a rede a garantir:

- O utilizador que gasta está autorizado a gastar as notas
- As notas existem realmente
- Os anuladores correspondentes são únicos
- O total das entradas é igual ao total das saídas mais as taxas.

Faz tudo isto sem revelar quaisquer detalhes privados subjacentes.

A geração de provas é computacionalmente intensa. Transferir esta responsabilidade para o dispositivo complementar impede que a wallet de hardware bloqueie ou fique sem memória.

### Assinatura (autorização do gasto)

A assinatura é fundamentalmente distinta da provação. Uma assinatura digital funciona como um carimbo explícito de autorização produzido pelo detentor da chave privada.

Enquanto uma prova de conhecimento zero verifica a validade da transação, uma assinatura digital prova a autoridade de gasto. A assinatura certifica que o verdadeiro proprietário aprova os parâmetros específicos da transferência.

A assinatura requer poder computacional mínimo, o que a torna ideal para uma wallet de hardware.

### O que é assinatura a frio blindada?

A assinatura a frio blindada é um método de autorizar uma transação blindada de Zcash mantendo as chaves privadas de gasto isoladas da wallet complementar ligada à Internet. A transação pode ser construída e preparada num computador online, enquanto uma wallet de hardware separada, mantida offline ou isolada de outra forma, utiliza as suas chaves protegidas para autorizar a transação.

O processo pode ser simplificado como:

![Shielded cold signing process](/content-images/cold-signing-process.webp)

A wallet complementar envia os parâmetros estruturados da transação ao dispositivo de hardware, que assina internamente a carga útil sem nunca libertar a chave privada de gasto para a máquina anfitriã.

## Wallets complementares e de hardware

As transações blindadas podem envolver tanto uma wallet complementar como uma wallet de hardware, cada uma com uma função distinta.

### Wallet complementar

O que é uma wallet complementar?

A wallet complementar funciona num computador ou dispositivo móvel e executa a maioria das tarefas envolvidas na criação da transação, tais como:

- Selecionar as notas a gastar
- Construir a transação
- Calcular os dados de transação necessários
- Coordenar a geração das provas de conhecimento zero exigidas.

### Porque é útil uma wallet complementar?

A wallet complementar trata do processo de criação da transação, mas, se o computador for infetado com malware, um atacante poderá conseguir:

- ver o que está a fazer,
- modificar uma transação não assinada,
- tentar enganá-lo para aprovar algo.

A wallet complementar não precisa de ter acesso à chave privada armazenada na wallet de hardware; por isso, pode tratar da construção da transação e de outras tarefas computacionais enquanto a wallet de hardware fornece o limite de segurança para a chave privada.

### Wallet de hardware

Uma wallet de hardware é um dispositivo físico offline que isola as suas chaves privadas de telemóveis ou computadores ligados, funcionando como um cofre seguro para os seus criptoativos.

### Porque é útil uma wallet de hardware?

Se o seu computador for infetado com malware, um atacante poderá conseguir:

- ver o que está a fazer,
- modificar uma transação não assinada,
- tentar enganá-lo para aprovar algo.

A chave privada não pode ser simplesmente extraída da wallet de hardware, pelo que o dispositivo pode atuar como um limite de segurança.

Imagem das capacidades da wallet complementar versus hardware

A separação entre estas duas wallets é particularmente importante para transações blindadas porque são mais complexas do que transações transparentes e envolvem componentes como notas blindadas, anuladores, compromissos, provas de conhecimento zero e assinaturas de transação.

Seria impraticável que a wallet de hardware executasse todas as operações computacionais. Em vez disso, a wallet complementar prepara a transação e fornece as informações necessárias à wallet de hardware para assinatura, enquanto a chave privada de gasto permanece isolada dentro do dispositivo de hardware.

## Isolamento de chaves

> Isolamento de chaves significa que as chaves privadas que podem autorizar um gasto nunca saem da wallet de hardware. A componente complementar pode preparar a transação; não pode assiná-la.

O isolamento de chaves refere-se a manter as chaves privadas necessárias para autorizar uma transação separadas da wallet complementar e do dispositivo em que esta funciona. Numa configuração de assinatura a frio blindada, a wallet complementar pode construir a transação e coordenar as provas necessárias, enquanto a wallet de hardware mantém as chaves privadas de gasto sensíveis isoladas.

Se o computador ou telemóvel complementar for comprometido, um atacante poderá conseguir interagir com a transação antes de esta ser assinada, mas idealmente não consegue extrair a chave privada da wallet de hardware. Por conseguinte, a chave permanece dentro do limite de segurança do dispositivo de hardware.

Esta separação permite que a wallet complementar execute a construção de transações e tarefas computacionais sem lhe conceder acesso direto ao material de chave necessário para autorizar a transação.

![Key isolation](/content-images/key-isolation.webp)

A distinção fundamental a fazer é que “chave de visualização” não significa que a aplicação recebe uma versão mais fraca da seed.

Em Zcash, uma Full Viewing Key (FVK/UFVK) é deliberadamente derivada da chave de gasto e confere ao titular a capacidade de detetar e decifrar atividade blindada relevante, mas não de autorizar gastos. A FVK é um derivado menos secreto da chave de gasto.

**Uma importante ressalva de privacidade:**

Por isso, deve saber-se que a aplicação não pode roubar os fundos apenas com a UFVK, mas consegue ver a atividade blindada privada da wallet.

É por isso que é mais rigoroso descrever a aplicação complementar como tendo *autoridade de visualização*, em vez de simplesmente dizer que possui “informação pública”.

A forma mais simples de expor toda a ideia é dizer que a wallet complementar recebe material de chave suficiente para saber o que está a acontecer à wallet, mas não material de chave suficiente para autorizar o que acontece aos fundos da wallet. A wallet de hardware, contudo, mantém a autoridade de gasto isolada e utiliza-a apenas quando o utilizador aprova uma transação.

Este é o modelo central de isolamento de chaves por trás destes designs de wallets de hardware blindadas de Zcash, e é o mesmo modelo que surge, implementação a implementação, em Ledger, Keystone e Hito, que serão abordados em breve.

## PCZT

PCZT significa Transação Zcash Parcialmente Criada. É o pacote que transporta uma transação Zcash e as informações necessárias para a concluir de uma fase para outra.

É um formato normalizado para uma transação Zcash enquanto a transação ainda está a ser construída. Permite que diferentes participantes ou dispositivos executem diferentes partes do processo de criação da transação e transmitam entre si a transação parcialmente concluída.

Construir uma transação é significativamente mais complexo do que assinar uma simples transferência pública em protocolos de criptomoeda de conhecimento zero como Zcash. As transações blindadas requerem provas de conhecimento zero computacionalmente intensivas, como as geradas usando Halo 2 ou Groth16. Consequentemente, dispositivos de baixa potência, como wallets de hardware, podem não ter memória e capacidade de processamento para tratar de todo o fluxo de trabalho da transação.

A introdução de PCZT enfrenta vários desafios centrais da arquitetura cripto blindada. PCZT é um formato de dados intermédio normalizado que divide a criação de transações em funções modulares e independentes. Permite que um computador complementar potente trate da montagem de transações e geração de provas, restringindo uma wallet de hardware offline estritamente à autorização e assinatura.

### Limitações de hardware e armazenamento a frio

Embora as wallets de hardware proporcionem um ambiente seguro para proteger chaves privadas de gasto, normalmente têm RAM, poder computacional e capacidades de transferência de dados limitados em comparação com computadores complementares. Estas restrições tornam impraticável que executem geração computacionalmente intensa de provas de conhecimento zero ou mantenham o estado completo da transação exigido durante o processo de construção.

Como resultado, a wallet complementar pode tratar das tarefas computacionalmente exigentes, enquanto a wallet de hardware permanece concentrada na operação crítica para a segurança de autorizar a transação com as suas chaves de gasto protegidas.

Leva-nos a perguntar: se o dispositivo é tão limitado, como consegue ainda realizar verificação *suficiente* para ser fiável?

Simplificando, uma wallet de hardware não pode aceitar um valor arbitrário de um computador complementar e assiná-lo. Precisa de informação suficiente para determinar que o valor assinado corresponde à transação que o utilizador pretende autorizar. Isto cria um equilíbrio difícil, porque o dispositivo deve efetuar análise e verificação suficientes para proteger o processo de assinatura, operando dentro de limites estritos de memória, computação, tamanho de firmware e complexidade de implementação.

O tratamento de Ledger Orchard PCZT é um exemplo deste desafio, sugerindo que a análise especializada dependente de circuitos pode tornar a implementação mais gerível em dispositivos limitados, mas também pode exigir alterações de firmware quando evoluem as estruturas ou circuitos de transação suportados.

Dois esforços em curso ilustram respostas diferentes a esta mesma restrição.

Uma proposta de investigação para um pipeline de provação totalmente em tempo constante adequado a arquiteturas de wallets de hardware open-source e computadores comuns foi apresentada no Grant #423. O objetivo era investigar infraestrutura criptográfica que pudesse ser implementada com segurança em ambientes como C ou Rust, reduzindo simultaneamente a complexidade e o peso de manutenção do suporte blindado de Zcash.

Contudo, uma abordagem alternativa é representada pelo proposto **Zcash SeedSigner**, um assinante open-source e isolado por air gap, construído a partir de componentes baratos e facilmente disponíveis. O fluxo de trabalho proposto mantém o computador complementar separado do dispositivo de assinatura, transmitindo um PCZT através de um air gap para verificação e assinatura no dispositivo.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Juntas, estas abordagens ilustram o desafio de engenharia mais amplo por trás das wallets de hardware blindadas: a construção e provação de transações podem ocorrer fora do dispositivo crítico para a segurança, mas o assinante ainda tem de possuir informação e capacidade de verificação suficientes para autorizar com segurança a transação resultante.

### PCZT permite a arquitetura dividida

A norma Transação Zcash Parcialmente Criada (PCZT) é a estrutura de dados formal que liga a wallet complementar à wallet de hardware.

Uma wallet complementar consegue tratar da seleção de notas, calcular os anuladores e gerar a prova de conhecimento zero por si só. Isto é possível porque as informações necessárias para estes passos, incluindo a chave utilizada para derivar anuladores, provêm da chave de visualização e não de algo ligado à autoridade de gasto. A wallet complementar empacota então estes elementos num contentor PCZT.

O PCZT é entregue à wallet de hardware, que lê o contexto da transação (como montantes e endereços de destinatários), aplica a assinatura utilizando as suas chaves de gasto protegidas e devolve o PCZT atualizado ao dispositivo complementar.

Este design estabelece um limite de segurança rigoroso: hardware anfitrião potente pode executar matemática complexa de conhecimento zero sem necessitar de acesso a chaves de gasto, enquanto dispositivos de armazenamento a frio de baixa potência podem impor segurança financeira sem precisarem de calcular criptografia pesada.

### Compromissos de privacidade do provador

Embora delegar a geração de provas de conhecimento zero à wallet complementar ou a outro provador mantenha as chaves de gasto isoladas, ainda exige que o provador aceda a informações sensíveis da transação, como valores de notas, endereços de destinatários e compromissos.

O PCZT mantém a separação arquitetural ao garantir que estas informações podem ser fornecidas para provação sem transferir as chaves privadas de gasto necessárias para a autorização.

Isto garante que a autoridade de provação está separada da autoridade de gasto. O provador pode executar a geração de provas computacionalmente intensiva sem obter a autoridade criptográfica para gastar os fundos do utilizador.

### Interoperabilidade de PCZT

À medida que PCZT se torna uma parte importante dos fluxos de trabalho de wallet de hardware, multifirma e assinatura por air gap de Zcash, a interoperabilidade entre implementações independentes torna-se cada vez mais importante.

Uma proposta de junho de 2026 por AngryDavee observou que já existiam implementações de PCZT em projetos incluindo Ledger, Keystone, Hito, OneKey e a implementação de referência em librustzcash. Contudo, a proposta identificou a falta de testes partilhados para confirmar que estas implementações interpretam PCZTs de forma consistente.

A solução proposta foi uma suite de testes de interoperabilidade open-source contendo vetores de teste canónicos de PCZT e testes entre implementações que abrangem o fluxo completo criar → assinar → finalizar. Também propôs testar limites de funções como o Combinador, onde informações parcialmente assinadas de diferentes assinantes podem ser combinadas antes de uma transação ser finalizada.

Isto é particularmente relevante para wallets de hardware porque PCZT permite separar a construção e a assinatura de transações: uma wallet complementar pode construir uma transação e preparar um PCZT, enquanto um dispositivo de hardware recebe as informações de assinatura necessárias e executa a operação de assinatura crítica para a segurança.

A proposta não foi implementada porque Zcash Community Grants decidiu não avançar com a bolsa após analisar a proposta e considerar o feedback da comunidade. Como resultado, a suite de testes entre implementações proposta não foi desenvolvida através desta bolsa. É, portanto, uma resposta proposta a um desafio identificado de interoperabilidade de PCZT, e não uma norma que atualmente exista em Zcash.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### O ciclo de vida de um PCZT

| # | Fase | Descrição |
|---|---|---|
| 1 | Criador | Inicializa o PCZT com metadados globais da transação, incluindo versões da transação, IDs de ramos de consenso e indicadores de pool. |
| 2 | Construtor | Preenche a transação com as entradas e saídas pretendidas nos pools transparente, Sapling, Orchard ou Ironwood. |
| 3 | Finalizador de E/S | Declara o conjunto de entradas e saídas completo, calcula chaves de assinatura de ligação e assina gastos fictícios quando necessário. |
| 4 | Atualizador | Anexa dados de contexto necessários para participantes subsequentes, como chaves de visualização completas, âncoras e testemunhas Merkle. |
| 5 | Provador e assinante | Executa a geração de provas de conhecimento zero e a assinatura criptográfica. Em versões modernas de PCZT, estas duas tarefas são totalmente independentes e podem ocorrer sequencialmente ou em paralelo. |
| 6 | Combinador | Funde deterministicamente múltiplas instâncias de PCZT se dispositivos diferentes trabalharem simultaneamente em aspetos da mesma transação. As regras de fusão exigem resolução rigorosa de conflitos para evitar perda acidental de dados. |
| 7 | Finalizador de gastos e extrator | Valida todos os elementos criptográficos necessários, remove metadados intermédios de contexto e produz a transação Zcash finalizada, pronta para difusão na rede. |

## Implementações reais de wallets de hardware

### Resumo

| Dispositivo   | O que a componente complementar recebe              | O que permanece no dispositivo          | Transporte      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / Orchard FVK, endereços            | Autoridade de gasto                | USB / BLE      |
| Keystone | UFVK + Unified Address                   | Seed / chaves de gasto              | QR (air-gapped)|
| Hito     | UFVK, Unified Address, impressão digital da seed  | Seed e chaves privadas de gasto    | QR / local     |

Várias implementações de wallets de hardware foram desenvolvidas para explorar como as transações blindadas de Zcash podem ser suportadas mantendo as chaves de gasto sensíveis isoladas da wallet complementar. Ledger, Keystone e Hito representam abordagens diferentes para integrar proteção de chaves baseada em hardware no fluxo de trabalho de transações Zcash.

![Real world hardware wallet implementations](/content-images/hardware-wallet-implementations.webp)

Para compreender como protegem os fundos blindados, é importante distinguir entre chaves de gasto e chaves de visualização. Nas três, a divisão segue a mesma estrutura:

| Dispositivo | O que a aplicação complementar pode receber | O que permanece protegido no dispositivo |
|---|---|---|
| Ledger | UFVK / Orchard FVK, endereços e informação pública | Autoridade de gasto / material de chave privada |
| Keystone | UFVK + Unified Address | Seed / chaves de gasto |
| Hito | UFVK, Unified Address, impressão digital da seed e informação de rede | Seed e chaves privadas de gasto |

### Ledger como ambiente de assinatura de hardware

Ledger é uma empresa de wallets de hardware. Os seus dispositivos são construídos em torno de um Secure Element, um chip dedicado concebido para guardar material de chave privada e mantê-lo fisicamente isolado do resto do dispositivo e de tudo o que lhe esteja ligado. Esse Secure Element é toda a razão pela qual um dispositivo Ledger é fiável para armazenamento a frio. Isto significa que, mesmo se o computador ou telemóvel ligado a ele for comprometido, as chaves dentro do Secure Element não podem ser extraídas.

Por si só, contudo, um dispositivo Ledger está vazio em relação a qualquer criptomoeda específica. Precisa de ter instalada uma aplicação que saiba tratar a criptografia particular dessa moeda.

Um dispositivo Ledger está vazio em relação a qualquer criptomoeda específica, pelo que precisa de uma aplicação que conheça a criptografia dessa moeda. Para Zcash existiram duas gerações:

- A aplicação original “Zcash Shielded”, desenvolvida por Zondax, utilizada com wallets complementares como Zkool e retirada em 5 de novembro de 2026; e
- A aplicação Zcash mais recente de Ledger (3.9.4+), utilizada nativamente por Ledger Wallet Desktop 4.21+ para Ironwood blindado de ZEC.

O modelo de isolamento de chaves abaixo aplica-se a ambas.

Zkool é a wallet complementar no seu telemóvel ou computador que comunica com essa aplicação. Constrói a transação, envia-a para o Ledger, a aplicação Zondax no dispositivo assina-a e envia a assinatura de volta.

Assim, Zondax é o software a funcionar no hardware; Zkool é o software a funcionar fora dele, utilizando a aplicação de Zondax para comunicar com o dispositivo.

### O que sai do Ledger?

O software Zcash de Ledger inclui uma função específica para exportar a chave de visualização da wallet, a chave que permite ao software ver saldos e transações sem conseguir gastar nada.

Esta função pode devolver uma de duas coisas:

- Uma Full Viewing Key Unificada (UFVK), que é a chave de visualização completa que abrange simultaneamente todos os pools blindados de Zcash; ou
- Uma Orchard Full Viewing Key (FVK)

De qualquer forma, o que sai é apenas uma chave de visualização. Independentemente da versão solicitada, esta função não tem forma de devolver a única informação que realmente permitiria a alguém mover fundos: a chave de gasto.

Esse é todo o objetivo da sua construção: foi concebida para que a única coisa que consegue exportar seja algo seguro para entregar a uma aplicação complementar.

A hierarquia de chaves de Zcash está estruturada de tal modo que, para cada pool blindado, a chave de gasto deriva duas coisas separadas:

- Uma chave de autorização de gasto; e
- Uma chave de visualização completa

A FVK pode então derivar capacidades adicionais relacionadas com visualização, mas em nenhum momento esse caminho de derivação conduz de volta à autoridade de gasto. Depois de uma chave se ramificar para o lado de visualização da hierarquia, permanece aí e não pode ser usada para reconstruir a chave de autoridade de gasto de que proveio.

Ironwood segue este mesmo padrão, pois reutiliza a construção subjacente de chaves e notas de Orchard. Contudo, é um pool distinto ao nível do consenso, com a sua própria árvore de compromissos e conjunto de anuladores. Isto significa que uma UFVK é realmente um conjunto de chaves de visualização por pool (transparente, Sapling, Orchard e agora Ironwood), e não uma única chave plana.

Uma UFVK exportada antes da ativação de Ironwood não incluirá uma chave de visualização Ironwood, uma vez que esse pool ainda não existia. É precisamente por isso que as wallets tiveram de atualizar-se para reconhecer e derivar UFVKs compatíveis com Ironwood após a atualização NU6.3.

### O que permanece em Ledger?

A autoridade de gasto permanece no dispositivo.

O Signer de Ledger recebe uma transação/PCZT do anfitrião e gera a assinatura de autorização de gasto consoante o pool de onde a transação gasta (o pool Ironwood, porque a integração atual de Ledger suporta apenas Ironwood). A assinatura é então produzida no dispositivo, e o anfitrião recebe apenas a assinatura, não a chave privada de gasto.

Isto também é consistente com o modelo geral de segurança de Ledger. O seu Secure Element isola material de chave privada, e os requisitos de segurança de aplicações de Ledger proíbem especificamente que as aplicações exponham esses segredos ao anfitrião.

O assinante de Ledger pode exportar a FVK/UFVK enquanto executa independentemente a assinatura de transações. As duas capacidades são fornecidas através de funções separadas, não agrupadas numa só.

### O que significa isto na prática?

Suponha que o seu Ledger contém 10 ZEC.

A wallet complementar pode ter a UFVK e, portanto, determinar: “Esta wallet recebeu 10 ZEC.” Pode analisar e apresentar transações e saldos.

Mas, se alguém comprometer a wallet complementar, a UFVK por si só não lhe concede a capacidade de criar a assinatura de autorização de gasto.

O propósito da assinatura de autorização de gasto separada é permitir que dispositivos limitados, como wallets de hardware, autorizem gastos blindados sem terem de realizar a prova zk-SNARK completa.

### Aplicação Zondax Ledger; o lado da wallet de hardware

#### O que é Zondax?

Zondax é uma empresa de desenvolvimento terceira que construiu a aplicação Ledger Zcash. É a aplicação de firmware real que funciona no hardware Ledger e dá ao dispositivo a capacidade de compreender e processar transações Zcash.

Zondax é um desenvolvedor externo. O hardware Ledger não tem capacidade inata para processar transações Zcash, e essa capacidade provém inteiramente do software de Zondax.

### Implementação original de Zcash Ledger

O repositório da aplicação Ledger Zcash de Zondax é o software que funciona num dispositivo Ledger. A aplicação concentrava-se inicialmente em transações blindadas Sapling, antes de Orchard existir como o principal pool blindado de Zcash, pelo que o suporte de Sapling era a extensão do que um dispositivo Ledger conseguia fazer com ZEC blindado.

A sua arquitetura ilustra a separação, com o lado anfitrião/complementar a preparar as informações da transação enquanto o Ledger trata das operações sensíveis de chave e da assinatura.

Mesmo nesta primeira versão do suporte de wallet de hardware Zcash, os princípios centrais — construção e provação no anfitrião, depois assinatura isolada no dispositivo — já eram o design.

### Evolução para Orchard

O trabalho de Ledger avançou para Orchard + PCZT. Foi uma transição significativa, e não uma pequena atualização, dado que Orchard utiliza um sistema de provação diferente (Halo 2, em vez do Groth16 de Sapling) e uma construção diferente de notas e chaves; assim, expandir o firmware apenas de Sapling para tratar da assinatura de Orchard exigiu novas bases criptográficas no lado do dispositivo, e não apenas uma correção de firmware.

Contudo, à medida que Zcash avançava para Ironwood, Zondax e Ledger mudaram o foco do seu desenvolvimento para suportar Ironwood diretamente, em vez de concluir uma implementação de Orchard apenas para posteriormente redesenhá-la para Ironwood. Isto representa uma etapa adicional na evolução da implementação de Ledger, pois Ironwood baseia-se na arquitetura criptográfica de Orchard, introduzindo simultaneamente um pool blindado separado e alterações adicionais ao protocolo.

### O que acontece dentro desta aplicação Ledger

O fluxo resultante é descrito como:

1. O anfitrião constrói um PCZT.
2. O anfitrião envia as informações relevantes da transação ao dispositivo Ledger.
3. O dispositivo produz as assinaturas de autorização de gasto Orchard.
4. O anfitrião trata de tudo o que se segue, incluindo a assinatura de ligação e a montagem final da transação.

A aplicação executada dentro do Ledger nunca vê nem produz nada além da própria assinatura de autorização de gasto, e todo o trabalho computacionalmente pesado ou que exige muitos dados (provação, ligação, montagem) permanece no anfitrião, que não precisa de ser confiado com material de chave.

### Integração blindada nativa de Ledger; Ledger Wallet Desktop

A integração mais recente de Ledger Zcash fornece um exemplo concreto de como a construção de transações blindadas e a assinatura crítica para a segurança podem ser separadas entre software complementar e uma wallet de hardware.

Com Ledger Wallet Desktop 4.21+ e a aplicação do dispositivo Zcash 3.9.4+, os utilizadores podem enviar e receber Ironwood blindado de ZEC diretamente através de Ledger Wallet Desktop. A integração suporta transferências privadas para privadas, blindagem a partir do pool transparente, desblindagem para o pool transparente, endereços privados de receção e memorandos. As transações são verificadas e assinadas no dispositivo Ledger, em vez de dependerem apenas das informações apresentadas pelo computador.

Uma parte essencial desta arquitetura é a separação entre capacidades de visualização e gasto. Durante a sincronização de saldo privado, o Ledger exporta uma Full Viewing Key Unificada (UFVK), que é armazenada localmente no computador. A UFVK permite que Ledger Wallet Desktop detete transações blindadas relevantes e determine o saldo da wallet, mas não fornece autoridade para gastar os fundos. A autoridade de gasto crítica para a segurança permanece no dispositivo Ledger, que executa a operação final de assinatura. Isto cria um limite claro entre o computador, que gere o estado da wallet e constrói transações, e o dispositivo de hardware, que protege a capacidade necessária para autorizar gastos.

Contudo, a integração atual é especificamente apenas de Ironwood. Não apresenta nem gere fundos Orchard ou Sapling através de Ledger Wallet Desktop. Isto é historicamente significativo porque o desenvolvimento anterior de Ledger Zcash estava associado ao suporte blindado de Orchard antes de a implementação evoluir para o protocolo Ironwood.

A transição também destaca a importância da compatibilidade de chaves e contas. Ledger tem uma aplicação “Zcash Shielded” mais antiga, desenvolvida por Zondax e utilizada por integrações como YWallet e zkool, que está agora a ser descontinuada. Como essa aplicação antiga utilizava um esquema de derivação diferente para contas blindadas, as suas contas Sapling não podem ser simplesmente reproduzidas pela nova aplicação Ledger.

Assim, a integração ilustra tanto o progresso como as limitações restantes do suporte de wallets de hardware blindadas. Ledger consegue agora proporcionar uma experiência Ironwood completa, em que o software complementar trata da sincronização da wallet e preparação das transações, enquanto o dispositivo de hardware permanece como limite de segurança para gastos.

Ao mesmo tempo, a compatibilidade histórica de contas, o suporte apenas para pools blindados específicos, os limites de tamanho de transações de hardware, as restrições de plataforma e as limitações computacionais e de firmware envolvidas na análise e verificação de transações blindadas mostram que o suporte de wallets de hardware para Zcash depende não apenas das capacidades do protocolo, mas também do design e recursos de cada implementação individual.

### Zkool + Ledger — utilização da aplicação oficial Zondax

Como sucessor de Ywallet, Zkool herdou o objetivo da assinatura a frio blindada, mas tomou um caminho diferente para o alcançar, moldado diretamente pelo facto de que a criptografia, por si só, não torna uma integração utilizável se a aplicação de assinatura não puder ser distribuída com segurança.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Utilização de Zkool da aplicação Zondax

Zkool avançou para a utilização da aplicação oficial Ledger Zcash, desenvolvida por Zondax, em vez da aplicação proprietária abandonada Ledger de Ywallet. Em vez de manter uma aplicação personalizada que a loja de Ledger não aceitaria, Zkool baseou-se na aplicação que já era aceite e distribuída pelo próprio ecossistema de Ledger.

Esta mudança significou que os utilizadores deixaram de precisar de depender da instalação de uma aplicação Ledger personalizada não assinada para utilizar esta integração, uma vez que a aplicação de Zondax era oficialmente distribuída através do ecossistema de Ledger.

Contudo, esta integração enfrenta uma alteração importante em 5 de novembro de 2026, quando o suporte para a aplicação legada Zcash Shielded está previsto terminar à medida que Ledger a elimina gradualmente. Como a integração Zkool de Ledger depende desta aplicação, a alteração suscita questões sobre a futura disponibilidade da ligação existente. O impacto preciso em Zkool depende de poder continuar a utilizar a aplicação legada fora de Ledger Wallet ou de transitar para uma alternativa compatível.

### Pools blindados suportados

Segundo o desenvolvedor de Ywallet, a integração Ledger de Zkool utilizava a aplicação oficial Ledger desenvolvida por Zondax e suportava tanto Zcash transparente como blindado. Contudo, o seu suporte blindado estava limitado a Sapling e não suportava Orchard, além de outras limitações de integração, como um máximo de cinco entradas e saídas de cada tipo e ausência de compatibilidade com Ledger Live.

Esta limitação refletia o âmbito da implementação subjacente de Zondax Ledger naquele momento. O trabalho anterior Ledger de Zondax fornecia suporte a Sapling, e o lançamento subsequente, em 2024, da aplicação Zcash Shielded Ledger excluía inicialmente Orchard e Unified Addresses. Por conseguinte, uma integração construída em torno dessa aplicação herdava as capacidades e limitações da implementação de wallet de hardware da qual dependia.

A situação evoluiu posteriormente com o lançamento da aplicação dedicada Zcash Shielded Ledger em novembro de 2024. Zondax afirmou que a aplicação tinha sido oficialmente lançada através de Ledger Live e publicou posteriormente orientações de integração e pacotes Rust e JavaScript para permitir a integração por outras wallets. No lançamento, contudo, a aplicação comunicava exclusivamente com Zecwallet Lite Desktop, enquanto integrações mais amplas de wallets ainda estavam em desenvolvimento.

A fase seguinte foi o desenvolvimento da aplicação Rust baseada em Ledger mais recente de Zcash. Em junho de 2026, Ledger comunicou que a partilha de UFVK e a geração de Orchard Unified Address tinham sido implementadas, enquanto a assinatura de transações Orchard e ClearSign ainda estavam em desenvolvimento. Ledger também afirmou que o trabalho prosseguiria no caminho Ironwood à medida que o protocolo mudasse.

Ironwood exigiu posteriormente atualizações em todo o ecossistema de wallets Zcash. Zkool lançou suporte para migração Orchard para Ironwood a partir da versão 6.24.0, e continuou a aperfeiçoar o pipeline de migração e transações em versões posteriores. Ledger, separadamente, integrou a assinatura v2 de PCZT na sua nova aplicação em 27 de julho, embora a implementação ainda não tivesse concluído a revisão de Ledger e a disponibilização no Ledger Live em 20 de agosto, um marco que entretanto foi concluído, com Ledger Wallet Desktop 4.21+ a oferecer agora suporte nativo a Ironwood diretamente.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Assim, a evolução é mais bem entendida não como uma única atualização de Zondax para Ironwood, mas como vários desenvolvimentos relacionados: a implementação original de Sapling focada em Zondax, a aplicação Zcash Shielded Ledger de 2024, a aplicação mais recente Ledger Rust com suporte a Orchard e PCZT, a integração nativa de Ledger no Ledger Wallet Desktop e atualizações paralelas de wallets como Zkool à medida que o ecossistema transitava para Ironwood.

### Suporte atual de dispositivo e plataforma Ledger para Zcash

O suporte de Zcash em Ledger depende de:

- O modelo do dispositivo
- A aplicação instalada
- A plataforma utilizada para o gerir; e
- Se a transação é transparente ou blindada.

Em 21 de julho de 2026 (a última atualização de Ledger), a aplicação Zcash Shielded é suportada no Nano S Plus, Stax e Flex, mas ainda não no Nano X nem no Nano Gen5.

O Nano X e os outros modelos, exceto o Nano S original, ainda podem utilizar a aplicação clássica Zcash, que suporta transações transparentes e o gasto de fundos blindados para endereços transparentes (desblindagem), mas não assinatura de blindado para blindado. O Nano S original não suporta nenhuma das aplicações, porque Ledger está a eliminar gradualmente o suporte ao dispositivo e a sua aplicação Zcash mais recente não está disponível nele. Os dispositivos ligam-se a Ledger Wallet (anteriormente Ledger Live), a aplicação complementar de Ledger, disponível em desktop para Windows, macOS e Linux, e em dispositivos móveis para iOS e Android.

Ledger adicionou Zcash blindado nativo ao Ledger Wallet Desktop, construído sobre o pool Ironwood, eliminando a necessidade de uma wallet complementar separada. O ZEC blindado ainda não é suportado na aplicação móvel de Ledger para iOS e Android, embora o suporte móvel esteja previsto para uma versão futura.

Fora do software do próprio Ledger, a utilização blindada depende de uma wallet complementar compatível e das plataformas que esta suporta. À medida que Ledger continua a expandir o suporte a Ironwood, a compatibilidade depende do modelo do dispositivo, firmware, versão da aplicação e sistema operativo, pelo que o suporte geral a Zcash não garante necessariamente compatibilidade.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### Assinatura a frio YWallet; uma abordagem anterior

Ywallet é uma wallet complementar, separada tanto de Ledger como de Zondax, que seguiu o seu próprio caminho em direção à assinatura a frio blindada.

Ywallet é historicamente importante porque explorou a assinatura a frio para Zcash, o que significa que o dispositivo de assinatura podia ser mantido separado da wallet online.

Para concretizar essa arquitetura no hardware Ledger, Ywallet construiu a sua própria aplicação Ledger, uma aplicação proprietária, distinta da aplicação Zondax abrangida na secção anterior. Isto significava que Ywallet não dependia da implementação Sapling existente de Zondax; tinha o seu próprio firmware a executar o lado de assinatura da relação.

### Porque a integração era importante

Ter a criptografia e o código de assinatura não é suficiente. A integração de wallets de hardware não é apenas um problema criptográfico; é também inevitavelmente um problema de distribuição e plataforma. No mínimo, envolve:

- Aprovação/distribuição da aplicação — se a loja oficial de aplicações do fabricante de hardware aceita e distribui a aplicação
- Segurança de firmware/aplicação — se a aplicação cumpre os requisitos de segurança do fabricante para tratamento de material de chave
- Protocolos de comunicação — como a wallet complementar e o dispositivo realmente trocam dados de transação
- Compatibilidade com a wallet — se os formatos de dados e o fluxo da aplicação de assinatura correspondem ao que a wallet complementar espera
- Pools blindados suportados — para quais de Sapling, Orchard (e agora Ironwood) a aplicação consegue realmente assinar

A aplicação proprietária Ledger de Ywallet cumpria os requisitos criptográficos e arquiteturais; conseguia assinar transações blindadas Zcash, mas não foi aceite na loja oficial de aplicações de Ledger.

### Transição para longe da aplicação proprietária Ledger

Como a aplicação não foi oficialmente aceite, Ywallet teria de pedir aos utilizadores que instalassem firmware não assinado para a utilizar; isto é um verdadeiro compromisso de segurança para os utilizadores, e Ywallet optou por não lhes pedir isso. Por isso, Ywallet acabou por abandonar essa integração específica em vez de seguir esse caminho.

Em vez de reavivar uma aplicação proprietária, o desenvolvimento posterior (através de Zkool, sucessor de Ywallet) avançou para a aplicação Ledger oficial construída por Zondax, trocando uma implementação personalizada rejeitada por uma padronizada já aceite no ecossistema de distribuição de Ledger. Essa mudança foi o que acabou por tornar novamente possível uma integração Ledger funcional.

### O legado de Ywallet

Mesmo depois de o próprio Ywallet se ter afastado do desenvolvimento ativo, o seu criador, Hanh, que também é membro de ZCG, continuou a ser uma voz relevante no ecossistema, particularmente quando a migração de Ironwood revelou problemas relatados de fundos que pareciam ter desaparecido.

**ZODL: um utilizador real teve fundos em falta após a migração Orchard → Ironwood**

Um utilizador, Jmo0615, relatou que fundos anteriormente visíveis na sua wallet ZODL deixaram de aparecer após a migração de Orchard para Ironwood. Declarou que tinha restaurado a seed original, reiniciado e recuperado a wallet, e permitido que a versão 3.14.1 (1) de ZODL sincronizasse totalmente. Também confirmou que não estava envolvida nenhuma wallet de hardware Keystone.

Não foi estabelecido que os fundos tenham realmente sido perdidos. Em vez disso, suspeita-se que seja um problema relacionado com descoberta ou migração da wallet, no qual fundos anteriormente visíveis deixaram de ser apresentados após a transição para Ironwood. Fundos que não são detetados ou apresentados não devem ser automaticamente descritos como fundos permanentemente perdidos, e esta distinção é importante para compreender problemas de migração.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: “notas bloqueadas” podem explicar fundos aparentemente indisponíveis**

Outro aspeto importante das wallets blindadas é como o estado da wallet pode afetar os fundos que um utilizador realmente pode gastar. Hanh explicou que um utilizador pode bloquear acidentalmente uma nota através do controlo de moedas, uma funcionalidade que permite aos utilizadores escolher manualmente quais as notas utilizadas para gastar. Nesta situação, uma nota pode continuar a existir na wallet, mas ser marcada como indisponível para gasto.

Isto destaca uma distinção importante ao investigar problemas de wallet. A quantidade de ZEC existente numa wallet nem sempre é igual à quantia atualmente disponível para gastar. Fatores como seleção de notas, sincronização, estado de migração, recuperação de wallet e definições de controlo de moedas podem afetar o saldo apresentado ou disponível para gastar. Por conseguinte, relatos de “fundos em falta” devem distinguir cuidadosamente entre fundos que não são detetados ou apresentados, fundos que são detetados mas indisponíveis para gastar, e fundos que realmente foram perdidos.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**O que é Keystone?**

Keystone é uma wallet de hardware isolada por air gap. O seu dispositivo de assinatura não tem ligação direta por cabo ou sem fios à aplicação complementar durante o próprio processo de assinatura, comunicando antes através de códigos QR. Está aqui emparelhada com Zashi (agora renomeada Zodl), a wallet complementar nativa de Zcash, e esse emparelhamento torna o princípio de isolamento de chaves invulgarmente explícito e fácil de seguir.

**O fluxo Keystone/Zashi**

A integração Zcash de Keystone com Zashi torna esta separação particularmente explícita. Quando liga Keystone a Zashi, a Full Viewing Key Unificada é transferida de Keystone para Zashi.

Assim, o fluxo é:

![Keystone and Zashi viewing flow](/content-images/keystone-zashi-viewing-flow.webp)

**O que pode Zashi fazer com a UFVK?**

Zashi pode usá-la para:

- identificar transações blindadas recebidas
- determinar saldos
- obter informações sobre atividade blindada

Mas não pode gastar os fundos simplesmente porque possui a UFVK.

A UFVK é uma “capacidade de visualização” que permite conhecer saldos e transações, mas não permite gastar.

### O que permanece dentro de Keystone?

A seed/autoridade de gasto permanece em Keystone. Zashi não recebe a seed, a chave de gasto nem a chave privada de autorização de gasto. Recebe a UFVK, informações de endereço e as informações necessárias para operação apenas de visualização.

Juntas, estas duas metades completam o quadro. O que sai do dispositivo, como a UFVK, endereços e informações apenas de observação, é suficiente para Zashi monitorizar a conta, mas nada que saia do dispositivo é suficiente para retirar fundos dela.

É por isso que a integração Zashi e Keystone pode fornecer armazenamento a frio blindado. A aplicação de wallet pode monitorizar a conta sem possuir a autoridade necessária para gastar a partir dela. A integração foi lançada especificamente para permitir armazenamento a frio de ZEC blindado.

Quando pretende gastar:

![Keystone and Zashi spending flow](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito segue um modelo de isolamento de chaves muito semelhante ao de Keystone, mas a sua implementação é mais recente. Em vez de emparelhar com uma wallet complementar existente como Zashi, Hito é fornecida com a sua própria wallet Android, e o processo de onboarding entre o dispositivo de hardware e essa aplicação Android está documentado nos marcos de desenvolvimento de Hito.

**Onboarding: o que recebe a aplicação Hito**

A wallet Android utiliza:

- a Full Viewing Key Unificada (UFVK)
- Unified Address
- impressão digital da seed ZIP-32
- informação de rede

ao integrar a conta de hardware.

Note que a aplicação Android nunca recebe a seed ou chaves privadas de gasto da wallet de hardware.

![Hito onboarding](/content-images/hito-onboarding.webp)

**O que recebe a aplicação Hito?**

As informações de onboarding documentadas incluem:

- UFVK
- Unified Address
- impressão digital da seed ZIP-32
- Rede

A UFVK dá à wallet Android as informações necessárias para operar a conta como uma wallet com capacidade de visualização sem receber a seed. A impressão digital da seed é um identificador de comprimento fixo derivado da seed, utilizado para reconhecer qual conta é qual; não é a própria seed e não confere qualquer capacidade de gasto, razão pela qual a sua presença não contradiz a afirmação “nunca recebe a seed” acima.

**O que permanece em Hito?**

A seed real, as chaves privadas de gasto e a autoridade de assinatura permanecem no dispositivo de hardware. Hito executa então a assinatura offline.

O marco atual de Hito indica que todo o fluxo de criação, exportação, assinatura offline e importação está operacional, apresentando transporte BLE e exportação QR BBQr do PCZT assinado.

Vale a pena nomear explicitamente esse fluxo, pois é a instância concreta do ciclo completo abordado anteriormente neste relatório: a wallet Android cria o PCZT não assinado, exporta-o para Hito, Hito assina offline com o seu material de chave isolado, e o PCZT assinado é importado novamente para a wallet Android.

Em momento algum a seed ou chave de gasto atravessa essa fronteira em qualquer direção.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## Orchard para Ironwood: a evolução do suporte de wallets de hardware

Orchard é um pool blindado no protocolo Zcash que permite aos utilizadores armazenar e transacionar ZEC com privacidade melhorada. Introduzido na Network Upgrade 5 (NU5), Orchard utiliza o sistema de provação Halo 2 e uma arquitetura criptográfica redesenhada para suportar transações blindadas sem revelar informações sensíveis da transação, como remetente, destinatário ou montante.

Ironwood é um pool blindado introduzido na atualização de rede NU6.3 de Zcash como sucessor do pool Orchard. Utiliza o protocolo criptográfico Orchard, introduzindo simultaneamente alterações concebidas para melhorar a segurança de longo prazo dos fundos blindados, incluindo recuperabilidade quântica e garantias mais fortes sobre a integridade da oferta.

À partida, é essencial esclarecer que Ironwood não substituiu o protocolo Orchard por um sistema criptográfico inteiramente novo. Ironwood foi introduzido como um novo pool blindado construído a partir do protocolo Orchard existente. Isto significa que têm a mesma estrutura Action, o mesmo sistema de provação Halo 2 e as mesmas construções de notas e chaves.

Ironwood tem a sua própria árvore de compromissos de notas, conjunto de anuladores, âncora e pool de valor, pelo que, ao nível do consenso, é um pool genuinamente separado. Mas criptograficamente, é uma extensão de Orchard, e não uma reconstrução.

Foi concebido assim para:

1. **Integridade da oferta.** Em 29 de maio de 2026, o investigador de segurança Taylor Hornby divulgou privadamente uma falha crítica de solidez no sistema de provas de conhecimento zero de Orchard, uma falha que poderia ter permitido criar ZEC falsificado sem deixar um rasto on-chain. Como os dados de transação de Orchard são privados, ninguém consegue verificar independentemente que nenhum ZEC falsificado foi criado antes da correção. Selar o pool antigo e iniciar um novo com saldo zero resolve esse problema de uma forma que corrigir Orchard no local não conseguiria.
2. **Garantir recuperabilidade quântica.** Ironwood foi concebido para que os seus fundos possam participar num futuro mecanismo de recuperação se as pressuposições subjacentes de logaritmo discreto forem alguma vez quebradas.
3. **Minimizar alterações de implementação.** Em vez de conceber um protocolo blindado inteiramente novo, a arquitetura comprovada de Orchard foi reutilizada. Isto significou que foi necessário escrever de raiz muito menos código novo de transação, provação, wallet e wallet de hardware.

### A cronologia pública

- 29 de maio: É divulgada a vulnerabilidade de Orchard.
- Junho: As transações Orchard são temporariamente restringidas enquanto uma correção inicial é disponibilizada através de NU6.2. Em 12 de junho, um desenvolvedor central aponta 21 de julho como alvo para a atualização completa; posteriormente, esta atrasa uma semana. Foi levantada uma preocupação comunitária de que os proprietários de Keystone seriam os últimos a migrar; um desenvolvedor central respondeu então que Keystone suportaria Ironwood desde o primeiro dia, com firmware previsto para 3 de julho, dependente da finalização das constantes de assinatura e de alterações à API Orchard do núcleo de Zcash.
- Início de julho: NU6.3 chega à testnet; Zebra 6.0.0 é lançado em 10 de julho.
- 27–28 de julho: O trabalho de assinatura v2 de Ledger Ironwood PCZT é integrado num ramo de integração. Ironwood (NU6.3) ativa em 28 de julho, no bloco 3 428 143, selando o pool original Orchard por trás de uma catraca que limita quanto ZEC pode sair de Orchard à quantia legitimamente depositada nele, e introduz um novo formato de transação.

Zebra torna-se o nó obrigatório, pois zcashd não suporta as novas regras de consenso. Os endereços não mudam porque Ironwood reutiliza a estrutura de destinatário de Orchard, pelo que as wallets encaminham automaticamente os endereços existentes para o novo pool. O que as wallets precisam é de funcionalidade de migração, pois os fundos Orchard terão de acabar por ser movidos pelos seus proprietários para Ironwood, e novas saídas que recebem Orchard estão agora completamente bloqueadas por consenso.

### O que mudou tecnicamente

Os formatos de transação passaram da versão 5 para a versão 6, pelo que uma única transação pode transportar um componente Ironwood juntamente com componentes existentes Sapling/Orchard/transparentes. PCZT foi estendido em conformidade:

- A codificação passou de PCZT v1 para v2.
- Um bundle Ironwood separado está agora ao lado dos bundles Sapling e Orchard.
- As transações v6 e um novo sighash v6 são suportados.
- Os textos simples das notas receberam uma nova versão (V3).

A alteração de sighash é mais importante especificamente para wallets de hardware. Em v6, as âncoras Orchard e Ironwood são excluídas do hash de assinatura e alimentam apenas o resumo de dados de autorização. Trata-se de uma verdadeira alteração de firmware, não apenas de uma atualização de versão. Um dispositivo tem de implementar corretamente o novo sighash e recalculá-lo ele próprio, em vez de confiar no que a aplicação complementar afirma que está a aprovar.

O contrato de isolamento em si não mudou: o dispositivo ainda devolve apenas a assinatura de autorização de gasto, nunca `alpha`, e nunca produz a assinatura de ligação; o anfitrião continua também a tratar da provação e de tudo o resto.

Uma regra de assinante mudou com v6, contudo: gastos fictícios de preenchimento são assinados pelo Finalizador de E/S, e não pelo dispositivo, pois o dispositivo não tem forma de os verificar contra dados de notas reais. A função de Assinante do dispositivo ignora-os, em vez de lhe ser pedido que assine algo que não consegue verificar. As taxas apresentadas também agora somam os saldos de valor Orchard e Ironwood, pois uma transação v6 pode gastar de qualquer pool na mesma transação.

Acertar essa contabilização de pools importa na prática, não apenas em teoria. Um bug recente na wallet Zcash do próprio Brave é uma ilustração útil: o cálculo de taxas assumia que todas as entradas blindadas pertenciam ao pool Orchard legado, levando a ações duplicadas e estimativas de taxa incorretas sempre que uma transação envolvia de facto Ironwood. Essa é precisamente a classe de erro que o princípio “recalcule-o você mesmo, não confie no anfitrião”, por trás da assinatura de wallets de hardware, existe para detetar. Uma wallet complementar calculou incorretamente a contabilização do pool, e apenas um dispositivo a verificar independentemente a sua própria matemática assinalaria isso antes de o aprovar.

### Onde está cada assinante

**Ledger acabou de mudar todo o panorama.** Em 23 de setembro de 2026, Ledger lançou suporte nativo a Zcash blindado diretamente dentro de Ledger Wallet Desktop, sem ser necessária outra aplicação complementar. A sua chave de gasto permanece no dispositivo, o computador faz os cálculos da transação e aprova tudo no ecrã antes de ser assinado. Suporta apenas Ironwood, não os pools antigos Orchard ou Sapling. A desvantagem é que a aplicação legada “Zcash Shielded”, desenvolvida por Zondax e que exigia uma wallet complementar como Zkool para funcionar, está a ser descontinuada. Ledger está a retirar essa aplicação antiga da disponibilidade em 5 de novembro, pelo que quem ainda a utiliza precisa de mover os seus fundos antes dessa data.

**Keystone está em boa forma.** O firmware 3.0.2 adicionou suporte completo a Ironwood em julho, e esse continua a ser o requisito estável atual. Contudo, essa versão ou posterior é necessária para assinar qualquer coisa.

**Hito progrediu além do marco inicial de testnet.** Assinou e submeteu com sucesso a sua primeira transação real de Orchard para Ironwood em hardware físico (inicialmente em testnet). Atualizações posteriores confirmaram fluxos de mainnet (Ironwood→Ironwood, Ironwood→Transparente e outros) em hardware de produção. O firmware estável e a disponibilização mais ampla continuam em curso.

Zondax e Zkool encontram-se atualmente em mudança. A aplicação de Zondax é a que está a ser retirada em Ledger. Zkool, que dependia dessa aplicação para comunicar com dispositivos Ledger, não indicou o que acontecerá a essa função quando a aplicação antiga desaparecer. Não é claro se continuará a ser relevante para utilizadores de Ledger daqui em diante, ou se o seu futuro estará sobretudo noutros dispositivos.

A própria migração é o maior efeito em cadeia. Como a quantia que atravessa pools é pública, as wallets distribuem transferências por denominações padrão ao longo do tempo, em vez de moverem um saldo num único bloco visível, o que significa muitas transações para assinar por migração e é precisamente a razão pela qual a assinatura em lote de PCZT foi tão importante para wallets de hardware.

O trabalho de firmware de Ledger também encontrou limites de hardware: um gasto de nota real podia alcançar dezenas de milhares de chamadas de sistema criptográficas num único comando, acionando o watchdog do dispositivo. A correção transferiu a aritmética de campos para software e exigiu um estado temporário partilhado para caber dentro das restrições de pilha de Nano X.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### A evolução numa imagem

![The evolution in one picture](/content-images/orchard-to-ironwood-evolution.webp)
