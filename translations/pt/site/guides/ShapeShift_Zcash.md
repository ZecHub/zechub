<a href="https://github.com/zechub/zechub/edit/main/site/guides/ShapeShift_Zcash.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ShapeShift e Zcash: negociação descentralizada com privacidade em primeiro lugar

---

## Introdução

Privacidade e autocustódia são princípios fundamentais das criptomoedas, mas muitos usuários ainda dependem de corretoras centralizadas que exigem verificação de identidade e guardam os fundos dos usuários. A integração entre ShapeShift e Zcash une uma plataforma de corretora totalmente descentralizada e uma das criptomoedas de preservação de privacidade mais avançadas, oferecendo aos usuários uma forma de negociar ZEC sem abrir mão da privacidade ou do controle sobre seus ativos.

Este artigo explica o que é a ShapeShift, como o Zcash funciona, como você pode fazer a conversão de ZEC na ShapeShift e por que essa parceria é importante para o futuro das finanças privadas e descentralizadas.

---

## O que é a ShapeShift?

[ShapeShift](https://shapeshift.com/) é uma plataforma de criptomoedas descentralizada e de código aberto que permite aos usuários negociar, acompanhar e gerenciar ativos digitais em várias blockchains sem criar uma conta, enviar documentos de identidade ou entregar a custódia de seus fundos.

### Um breve histórico

A ShapeShift foi fundada originalmente em 2014 por Erik Voorhees como uma corretora de criptomoedas centralizada sediada na Suíça. A plataforma rapidamente se tornou popular por sua interface simples, que permitia aos usuários converter uma criptomoeda em outra sem criar uma conta.

Em 2021, a ShapeShift passou por uma transformação radical. A empresa dissolveu sua estrutura corporativa e se transformou em uma **Organização Autônoma Descentralizada (DAO)**, governada pelos detentores do **token FOX**. Como parte dessa transição, aproximadamente 340 milhões de tokens FOX foram distribuídos via airdrop para mais de um milhão de usuários, tornando-o um dos maiores airdrops da história das criptomoedas. A partir de então, todas as decisões importantes sobre a plataforma passaram a ser tomadas por meio de propostas e votações de governança da comunidade.

### Principais recursos

- **Não custodiante**: os usuários negociam diretamente de suas próprias carteiras. A ShapeShift nunca guarda seus fundos.
- **Sem KYC**: sem verificação de identidade, sem criação de conta e sem coleta de dados pessoais.
- **Suporte multichain**: acesso a mais de 10.000 ativos em mais de 15 blockchains, incluindo Bitcoin, Ethereum, Cosmos e Zcash.
- **Agregação de DEX**: a ShapeShift direciona as negociações por protocolos descentralizados como THORChain, 0x e outros para encontrar as melhores cotações.
- **Conversões cross-chain**: converta ativos nativamente entre blockchains diferentes sem usar tokens encapsulados ou pontes centralizadas.
- **Totalmente de código aberto**: toda a plataforma, incluindo o aplicativo para celular, é de código aberto, sem backend proprietário além dos dados da blockchain.

---

## Como o Zcash funciona

[Zcash](https://z.cash/) (ZEC) é uma criptomoeda construída sobre sólidas bases criptográficas que dão aos usuários a capacidade de realizar transações de forma privada. Lançado em 2016, o Zcash é um fork do Bitcoin que adiciona tecnologia avançada de privacidade, mantendo a oferta fixa de 21 milhões de moedas do Bitcoin e o consenso de prova de trabalho.

### Transações blindadas e provas de conhecimento zero

A principal inovação do Zcash é o uso de **provas de conhecimento zero** (especificamente, uma forma chamada **zk-SNARKs**). Essas provas criptográficas permitem que uma parte prove a outra que uma afirmação é verdadeira sem revelar nenhuma informação além da validade da própria afirmação.

Na prática, isso significa que as transações do Zcash podem ser totalmente **blindadas**: o endereço do remetente, o endereço do destinatário e o valor da transação são todos criptografados na blockchain. A rede ainda consegue verificar que a transação é válida (sem gasto duplo, saldos corretos) sem nunca ver esses detalhes.

### Tipos de transação

O Zcash suporta dois tipos de endereços:

- **Endereços transparentes** (t-addresses): funcionam como endereços do Bitcoin, em que os detalhes da transação ficam publicamente visíveis na blockchain.
- **Endereços blindados** (z-addresses): usam provas de conhecimento zero para manter os detalhes da transação privados.

Os usuários podem enviar ZEC entre endereços transparentes e blindados. Para máxima privacidade, transações de um endereço blindado para outro não revelam nenhuma informação publicamente.

### Endereços unificados

Carteiras modernas do Zcash, como a [Zodl](https://zodl.com), usam **endereços unificados**, que combinam receptores transparentes e blindados em um único endereço. Isso simplifica a experiência do usuário e adota por padrão o mais alto nível de privacidade disponível.

### Por que a privacidade importa

Privacidade financeira não tem a ver com esconder irregularidades. Ela protege as pessoas contra vigilância, coleta de dados por empresas e ataques direcionados. Assim como você não gostaria que o saldo da sua conta bancária fosse visível ao público, as transações com criptomoedas merecem o mesmo nível de confidencialidade. O Zcash oferece isso por design.

---

## Como fazer a conversão de ZEC na ShapeShift

A plataforma ShapeShift permite que os usuários adquiram e negociem ZEC por meio de um processo totalmente descentralizado. Veja como funciona.

### Passo 1: acesse a ShapeShift

Acesse [app.shapeshift.com](https://app.shapeshift.com/) no seu navegador ou baixe o aplicativo da ShapeShift para celular. Não é necessário criar conta nem verificar identidade.

### Passo 2: conecte sua carteira

Conecte uma carteira de autocustódia compatível. A ShapeShift suporta várias carteiras, incluindo:

- **KeepKey** (carteira de hardware)
- **MetaMask**
- **XDEFI / Ctrl Wallet**
- **Keplr** (para ativos baseados em Cosmos)
- **Carteiras compatíveis com WalletConnect**

Como você está fazendo uma conversão de ou para ZEC, certifique-se de ter uma carteira compatível com Zcash (como a Zodl) pronta para receber seus fundos.

### Passo 3: selecione o par de conversão

Use a interface de conversão para selecionar o ativo que você quer negociar (por exemplo, BTC, ETH ou um token ERC-20) e defina ZEC como ativo de destino. A interface da ShapeShift tem um layout limpo, no estilo Uniswap, otimizado tanto para desktop quanto para celular.

### Passo 4: insira o valor e revise

Insira o valor que você deseja converter. A ShapeShift vai direcionar a negociação pelo melhor protocolo descentralizado disponível (como THORChain para conversões cross-chain) e exibir a cotação estimada, as taxas e o valor de saída.

### Passo 5: confirme e execute

Revise os detalhes da transação e confirme. A conversão é executada on-chain por meio de protocolos descentralizados. Seus ZEC serão entregues no endereço que você especificou. Nenhum intermediário guarda seus fundos em momento algum.

### Passo 6: blinde seus ZEC

Assim que seus ZEC chegarem, use a função **blindar** da sua carteira Zcash (disponível em carteiras como a Zodl) para mover os fundos para o pool blindado. Isso garante que seu saldo e suas transações futuras permaneçam totalmente privados.

### Pares cross-chain suportados

A ShapeShift permite conversões de ZEC em vários ecossistemas de blockchain, incluindo:

- **Bitcoin** (BTC) &lt;-&gt; ZEC
- **Ethereum** (ETH) &lt;-&gt; ZEC
- Ativos da **Arbitrum** &lt;-&gt; ZEC
- Tokens do ecossistema **Cosmos** &lt;-&gt; ZEC

---

## Por que essa integração importa

### Recuperando a privacidade no DeFi

A maioria das corretoras descentralizadas trata a privacidade como algo secundário. As transações em DEXs baseadas em Ethereum, por exemplo, são totalmente transparentes: qualquer pessoa pode rastrear o histórico da sua carteira, seus saldos de tokens e seus padrões de negociação. A integração ShapeShift-Zcash desafia essa norma ao oferecer acesso a ZEC blindados por meio de uma plataforma descentralizada e sem KYC.

Como afirmou Houston Morgan, líder da frente de crescimento e comunidade da ShapeShift: *"A privacidade não deveria assustar, mas negociar ZEC em corretoras centralizadas muitas vezes assusta. A própria estrutura delas e o risco jurídico acabam com a verdadeira privacidade."*

### Da remoção à opção padrão

O histórico torna essa integração ainda mais significativa. Em 2020, quando a ShapeShift ainda era uma empresa centralizada, ela **removeu as moedas de privacidade** de sua listagem, incluindo o Zcash, sob pressão regulatória. A transição para uma estrutura de DAO libertou a ShapeShift dessas restrições. Agora, como um protocolo governado pela comunidade, a ShapeShift não apenas voltou a listar o Zcash, como também o tornou parte central de sua estratégia de privacidade.

Com o lançamento da **ShapeShift v4.0** em dez de 2025, o Zcash se tornou o **principal ativo de pagamento e roteamento com preservação de privacidade** da plataforma. A privacidade agora é posicionada como um recurso padrão, e não como um complemento opcional, com o ZEC integrado diretamente à carteira e à infraestrutura de roteamento da ShapeShift.

### Apoio da Zcash Community Grants

O programa [Zcash Community Grants](https://zcashcommunitygrants.org/) destinou **US$ 50.000** para apoiar a infraestrutura técnica e os esforços de marketing da ShapeShift para a integração do Zcash. Esse financiamento ajudou a equipe da ShapeShift a firmar parceria com a **Liquify**, uma provedora de infraestrutura de Web3 que suporta mais de 90 blockchains, para gerenciar os endpoints de chamada de procedimento remoto (RPC), garantindo execução mais rápida e maior confiabilidade da rede.

### Promovendo as finanças descentralizadas

Essa integração demonstra que privacidade e descentralização podem andar juntas no DeFi. Os usuários podem:

- **Converter** ativos entre chains sem intermediários centralizados
- **Manter a autocustódia total** de seus fundos durante todo o processo
- **Acessar ZEC blindados** sem KYC nem coleta de dados
- **Participar da governança** por meio do token FOX para moldar o futuro da plataforma

À medida que os ambientes regulatórios se tornam mais rígidos no mundo todo, com regiões como a UE estudando restrições a tecnologias de preservação de privacidade, plataformas como a ShapeShift oferecem uma importante infraestrutura alternativa para a privacidade financeira.

---

## Resumo

| Recurso | Detalhes |
|---|---|
| **Plataforma** | ShapeShift DAO (descentralizada, de código aberto) |
| **Governança** | Detentores do token FOX |
| **Suporte ao Zcash** | Negociação completa de ZEC com suporte a transações blindadas |
| **KYC exigido** | Não |
| **Custódia** | Não custodiante (os usuários guardam suas próprias chaves) |
| **Conversões cross-chain** | BTC, ETH, Arbitrum, Cosmos e outros |
| **Infraestrutura** | Fornecida pela Liquify (suporte a RPC de mais de 90 blockchains) |
| **Financiamento da Zcash Community Grants** | US$ 50.000 para suporte técnico e de marketing |

A integração entre ShapeShift e Zcash representa um avanço significativo para a privacidade nas finanças descentralizadas. Ao combinar a infraestrutura de negociação não custodiante e multichain da ShapeShift com a tecnologia de provas de conhecimento zero do Zcash, os usuários ganham acesso a negociações de criptomoedas verdadeiramente privadas e sem permissão. Para quem valoriza a privacidade financeira e a autossoberania, essa integração oferece um caminho prático e acessível para usar ZEC sem concessões.

---

### Recursos

[Plataforma ShapeShift](https://shapeshift.com/)

[Site oficial do Zcash](https://z.cash/)

[Carteira Zodl](https://zodl.com)

[Governança da ShapeShift DAO (token FOX)](https://web.archive.org/web/20210126180411/https://shapeshift.com/fox-token)

[Zcash Community Grants](https://zcashcommunitygrants.org/)

[ShapeShift integra o Zcash para reforçar a privacidade on-chain (crypto.news)](https://crypto.news/shapeshift-integrates-zcash-to-enable-true-onchain-privacy/)

[ShapeShift lança a v4.0, recolocando a privacidade e a autocustódia no centro do DeFi (Invezz)](https://invezz.com/news/2025/12/18/shapeshift-unveils-version-4-0-re-centering-privacy-and-self-custody-in-defi/)

[ShapeShift lança suporte a transações blindadas de Zcash (Cointelegraph)](https://cointelegraph.com/news/shapeshift-rolls-out-support-for-shielded-zcash-transactions-for-true-privacy)
