<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Alt Text" width="50"/>   Corretoras não custodiantes

## TL;DR

* Uma corretora não custodiante permite que você faça a conversão de moedas a partir da sua própria carteira. Você mantém suas chaves privadas, e nenhuma conta em corretora guarda seus fundos.
* Manter suas chaves protege você contra ataques hackers e falências de corretoras. A privacidade é uma questão à parte.
* O depósito que você envia de outra chain, como Solana ou Ethereum, é público nessa chain. O serviço de conversão também vê seus endereços e seus dados de conexão.
* Algumas rotas de conversão entregam ZEC em um endereço transparente, que é público.
* Seu ZEC se torna privado quando está em um endereço blindado. Blinde-o na sua própria carteira antes de gastá-lo.

## Explicação principal

[Zcash Corretoras não custodiantes](/dex)

No mundo em constante evolução da negociação de criptomoedas, as corretoras não custodiantes, também conhecidas como corretoras descentralizadas ou DEXs, permitem que os usuários negociem sem entregar seus fundos a uma conta em corretora. Você mantém suas próprias chaves, mas isso não significa que ninguém mais esteja envolvido. Dependendo da rota, uma conversão pode passar por um site ou aplicativo de carteira, um serviço de roteamento, contratos inteligentes, solvers e pontes.

As corretoras listadas acima permitem que você obtenha e negocie Zcash a partir da sua própria carteira. O nível de privacidade de uma conversão depende do serviço, da rede da qual você paga e de o seu ZEC acabar ou não em um endereço blindado. As seções abaixo explicam a diferença.

### **Entendendo as corretoras não custodiantes**

As corretoras não custodiantes, também conhecidas como corretoras descentralizadas (DEXs), são plataformas que facilitam a negociação de criptomoedas sem exigir que os usuários depositem seus fundos na própria corretora. Em vez disso, os usuários mantêm o controle de suas chaves privadas e negociam a partir de suas próprias carteiras. As conversões cross-chain ainda dependem de outras partes para cotar, rotear e liquidar a negociação (veja abaixo).

Isso pode melhorar a segurança, já que os usuários não dependem da corretora para guardar seus ativos, o que reduz o risco de ataques hackers ou de má gestão. Por si só, isso não torna uma conversão privada. As transações em corretoras não custodiantes geralmente usam contratos inteligentes, que são públicos, e o serviço que você usa ainda pode ver seus endereços e detalhes de conexão.

Uma vantagem importante das corretoras de criptomoedas não custodiantes está no maior controle que elas oferecem aos usuários sobre seus ativos. Como essas corretoras não retêm os ativos, os usuários têm propriedade e autoridade completas sobre suas moedas digitais.

### **Corretoras não custodiantes vs. corretoras custodiantes**

**#1 Segurança**: As corretoras não custodiantes eliminam a necessidade de manter fundos em uma conta centralizada de corretora. Os usuários mantêm o controle de suas chaves privadas, reduzindo o risco de ataques hackers, ataques internos e falhas de plataforma que as corretoras custodiantes podem sofrer. As conversões cross-chain ainda podem reter fundos por um curto período em um endereço de depósito ou em uma ponte enquanto a negociação é liquidada.

**#2 Privacidade**: As conversões não custodiantes geralmente não exigem uma conta em corretora, então muitas vezes você evita o cadastro com e-mail ou documento de identidade. Isso não é o mesmo que anonimato. O depósito que você envia na rede de origem (por exemplo, Solana ou Ethereum) é público nessa chain, e o serviço ainda pode ver os endereços da sua carteira, seu endereço IP e os detalhes da conversão. A privacidade do lado do Zcash depende de onde o seu ZEC chega (veja abaixo).

**#3 Descentralização**: As corretoras não custodiantes estão mais alinhadas com o espírito descentralizado das criptomoedas. Os usuários têm maior autonomia e controle sobre suas atividades de negociação, de acordo com os princípios mais amplos da tecnologia blockchain.

No caso das corretoras custodiantes, o nível de descentralização costuma ser bastante mínimo na maioria das corretoras centralizadas, o que faz com que a equipe ou os responsáveis da corretora administrem os dados ou as informações dos usuários na corretora.

**#4 Adaptabilidade a mudanças regulatórias**: As corretoras não custodiantes costumam ser mais adaptáveis a ambientes regulatórios em mudança. Como não guardam os fundos dos usuários, elas podem enfrentar menos desafios de conformidade em comparação com as corretoras custodiantes.

**#5 Inovação e experimentação**: As corretoras não custodiantes frequentemente impulsionam a inovação no setor cripto. Elas incentivam o desenvolvimento de tecnologias descentralizadas, como formadores de mercado automatizados (AMMs) e aplicações de finanças descentralizadas (DeFi).

**#6 Acessibilidade global**: As corretoras não custodiantes costumam oferecer acesso a criptomoedas para usuários do mundo todo, inclusive em regiões onde obstáculos regulatórios podem limitar a disponibilidade de serviços de corretoras custodiantes.

**#7 Sem exigências de KYC**: Muitas corretoras não custodiantes não pedem documentos de identidade logo de início. A maioria ainda verifica endereços de carteira em bancos de dados de conformidade, e uma conversão pode ser atrasada, bloqueada ou recusada se algo for sinalizado. Confira os termos do serviço antes de confiar nele.

### **O que o Zcash protege e o que não protege**

A privacidade do Zcash vem dos endereços blindados. Quando ZEC circula entre endereços blindados, o remetente, o destinatário, o valor e o memorando são criptografados na chain do Zcash. Veja [Pools blindados](/using-zcash/shielded-pools) para entender como isso funciona.

Uma conversão tem partes que o Zcash não consegue ocultar:

- **A rede de origem.** Os fundos que você envia de Solana, Ethereum ou outra chain pública ficam visíveis nessa chain, incluindo seu endereço e o valor.
- **O endereço de recebimento.** Algumas rotas de conversão entregam ZEC em um endereço transparente. Por exemplo, NEAR Intents lista ZEC como compatível [apenas com endereços transparentes](https://docs.near-intents.org/resources/chain-support). ZEC enviado para um endereço transparente (t1 ou t3) é público, de forma muito parecida com o Bitcoin. Blindá-lo depois protege o que você fizer em seguida, mas a transferência recebida e a transação de blindagem continuam visíveis.
- **O serviço.** O aplicativo e qualquer serviço de roteamento veem os endereços e valores que você fornece, além de dados de conexão, como seu endereço IP.

Envie o ZEC para uma carteira que você controla e blinde-o antes de gastá-lo. [Usando o ZEC de forma privada](/guides/using-zec-privately) aborda os próximos passos.

### **Quem está envolvido em uma conversão**

Tome como exemplo uma conversão roteada pelo serviço 1Click do NEAR Intents. Seus [termos da API](https://docs.near-intents.org/security-compliance/terms-of-service) tratam estas partes como separadas:

- **A interface**: o site ou a carteira que você usa. Ela pode ser operada pela Intents Technology ou por terceiros com seus próprios termos.
- **1Click**: um serviço de roteamento e liquidação operado pela Intents Technology Limited. Você envia fundos para um endereço de depósito criado para a sua cotação. A documentação diz que o 1Click não assume a custódia, mas os termos observam que os ativos podem ficar retidos ou bloqueados na infraestrutura da ponte enquanto uma transferência está em andamento.
- **O protocolo**: os contratos inteligentes do NEAR Intents.
- **Solvers**: terceiros independentes que executam a cotação.
- **Pontes**: o ZEC nativo circula pela PoA Bridge, operada pela Intents Technology.

O NEAR Intents também [verifica os fluxos de cotação integrados](https://docs.near-intents.org/security-compliance/risk-and-compliance) em vários bancos de dados de AML e diz que a cobertura varia conforme o fluxo e a integração. De acordo com seus termos, uma conversão sinalizada pode ser atrasada, bloqueada, congelada ou rejeitada.

### **O que você compartilha durante uma conversão**

- O endereço ZEC que recebe a conversão e um endereço de reembolso na rede de origem.
- O ativo e o valor, além da transação de depósito que você envia, que é pública na chain de origem.
- Dados de conexão. Os termos do 1Click dizem que a Intents Technology pode coletar metadados das solicitações, endereços IP e endereços de carteira, e a política de privacidade em near.com lista endereço IP, localização, navegador e informações do dispositivo.
- Qualquer coisa que o aplicativo acrescente, como outros endereços de carteira conectados. Os aplicativos também podem submeter sua carteira às próprias verificações de conformidade.

## Visual / analogia

Uma corretora custodiante funciona como um banco. Você abre uma conta, deixa seu dinheiro no cofre dele e pede ao banco que negocie por você.

Uma conversão não custodiante funciona como o guichê de uma casa de câmbio em uma rua movimentada. Você passa o dinheiro pelo guichê, recebe outra moeda de volta e nunca deixa dinheiro com o atendente. As pessoas na rua podem ver você se aproximar e entregar seu dinheiro, assim como qualquer um pode ver seu depósito na chain de origem. O atendente vê seu rosto e o valor.

O que acontece depois do guichê depende de você. Coloque as novas moedas em um envelope lacrado, use um endereço blindado, e ninguém conseguirá segui-las a partir daí.

## Implicações práticas

### **Onde consultar os termos e o suporte**

Os termos mudam, então leia as versões atuais antes de uma conversão de valor alto.

- **Comece pelo aplicativo que você usa.** Ele é o seu principal ponto de contato. Os termos da API do 1Click dizem que a Intents Technology não tem relação direta com os usuários dos aplicativos construídos sobre ela.
- **NEAR Intents:** os termos e a política de privacidade em near.com/terms e near.com/privacy, além dos [termos da API do 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) e de [risco e conformidade](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Rastreamento e suporte:** consulte uma conversão no [NEAR Intents Explorer](https://explorer.near-intents.org) ou pergunte no [NEAR Intents Telegram](https://t.me/near_intents).
- **Reembolsos:** uma conversão que falhar pode ser devolvida ao endereço de reembolso que você informou, mas os termos de near.com dizem que o reembolso não é garantido. Os termos do 1Click também dizem que pedidos de recuperação por erros do usuário abaixo de USD 300 não são considerados.

Agora, vamos explorar algumas das corretoras não custodiantes acessíveis que facilitam a negociação de Zcash. Usar essas plataformas oferece a você uma forma prática de adquirir mais moedas Zcash.

### **Resumo**

As corretoras não custodiantes, ou DEXs, permitem que você negocie a partir da sua própria carteira mantendo o controle das suas chaves privadas. Isso ajuda na segurança, mas a privacidade depende da rota: a chain de origem é pública, o serviço vê seus endereços e dados de conexão, e o seu ZEC só se torna privado quando está em um endereço blindado.

Embora as corretoras não custodiantes ofereçam vantagens atraentes, é importante reconhecer que elas podem ter desvantagens, como possíveis problemas de liquidez e uma curva de aprendizado mais íngreme para usuários menos experientes.

Como em qualquer decisão financeira, os traders devem avaliar com cuidado suas prioridades, sua tolerância ao risco e sua familiaridade com a tecnologia antes de escolher entre corretoras não custodiantes e custodiantes.

## Erros comuns

- **Tratar "não custodiante" como "privado".** Manter suas chaves protege seus fundos contra a falência de uma corretora. O depósito na chain de origem é público, e o serviço vê seus endereços e seu endereço IP.
- **Deixar o ZEC convertido em um endereço transparente.** Se a rota fizer o pagamento em um endereço t1 ou t3, mova o ZEC para um endereço blindado na sua própria carteira antes de gastá-lo.
- **Deixar de conferir o endereço de reembolso.** Uma conversão que falhar pode voltar para o endereço de reembolso que você informou, e os reembolsos não são garantidos. Confira esse endereço antes de enviar.
- **Entender "sem KYC" como "sem verificações".** A maioria dos serviços verifica endereços de carteira em bancos de dados de conformidade, então uma conversão sinalizada pode ser atrasada ou bloqueada.

## Páginas relacionadas

- [DEX](/using-zcash/dex): corretoras não custodiantes compatíveis com ZEC.
- [Conversões centralizadas](/using-zcash/centralized-swaps): serviços de conversão instantânea que funcionam sem uma conta em corretora.
- [Corretoras custodiantes](/using-zcash/custodial-exchanges): corretoras que guardam seus fundos em uma conta.
- [Pools blindados](/using-zcash/shielded-pools): onde o seu ZEC se torna privado após uma conversão.
- [Endereços unificados](/using-zcash/unified-addresses): o endereço `u1` que a maioria das carteiras fornece para você receber ZEC.
- [Solana ZEC para blindado](/using-zcash/solana-zec-to-shielded): como mover ZEC de Solana para um endereço blindado.
- [Usando o ZEC de forma privada](/guides/using-zec-privately): o que fazer com o seu ZEC quando ele chegar.
- [Quem pode ver o seu pagamento em Zcash](/start-here/who-can-see-your-zcash-payment): o que continua visível em cada lado de um pagamento.

**Última atualização:** outubro de 2026
