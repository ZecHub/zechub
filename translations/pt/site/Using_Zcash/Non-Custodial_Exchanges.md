<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Alt Text" width="50"/>   Corretoras não custodiantes

[Corretoras não custodiantes de Zcash](/dex)

No mundo em constante evolução do trading de criptomoedas, as corretoras não custodiantes, também conhecidas como Corretoras Descentralizadas ou DEXs, permitem que os usuários negociem sem entregar seus fundos a uma conta em uma corretora. Você mantém suas próprias chaves, mas isso não significa que ninguém mais esteja envolvido. Dependendo da rota, uma conversão pode passar por um site ou app de carteira, um serviço de roteamento, contratos inteligentes, solucionadores e pontes.

As corretoras listadas acima permitem que você obtenha e negocie Zcash a partir da sua própria carteira. O grau de privacidade de uma conversão depende do serviço, da rede da qual você paga e de o seu ZEC acabar em um endereço blindado. As seções abaixo explicam a diferença.

### **Entendendo as corretoras não custodiantes**

As corretoras não custodiantes, também conhecidas como Corretoras Descentralizadas (DEXs), são plataformas que facilitam o trading de criptomoedas sem exigir que os usuários depositem seus fundos na própria corretora. Em vez disso, os usuários mantêm o controle de suas chaves privadas e negociam a partir de suas próprias carteiras. Conversões cross-chain ainda dependem de outras partes para cotar, rotear e liquidar a negociação (veja abaixo).

Isso pode melhorar a segurança, pois os usuários não dependem da corretora para guardar seus ativos, reduzindo o risco de ataques ou má gestão. Isso não torna uma conversão privada por si só. As transações em corretoras não custodiantes frequentemente usam contratos inteligentes, que são públicos, e o serviço que você usa ainda pode ver seus endereços e detalhes de conexão.

Uma vantagem fundamental das corretoras de criptomoedas não custodiantes reside no maior controle que proporcionam aos usuários sobre seus ativos. Como essas corretoras não retêm os ativos, os usuários desfrutam de propriedade e autoridade completas sobre suas moedas digitais.

### **Corretoras não custodiantes vs corretoras custodiantes**

**#1 Segurança**: As corretoras não custodiantes eliminam a necessidade de manter fundos em uma conta central de corretora. Os usuários mantêm o controle de suas chaves privadas, reduzindo o risco de ataques, ataques internos e falhas de plataforma que corretoras custodiantes podem sofrer. Conversões cross-chain ainda podem reter fundos por pouco tempo em um endereço de depósito ou ponte enquanto a negociação é liquidada.

**#2 Privacidade**: As conversões não custodiantes geralmente não precisam de uma conta em corretora, portanto você frequentemente não precisa se registrar com um e-mail ou documento de identificação. Isso não é o mesmo que anonimato. O depósito que você envia na rede de origem (por exemplo, Solana ou Ethereum) é público nessa chain, e o serviço ainda pode ver os endereços da sua carteira, endereço IP e detalhes da conversão. A privacidade no lado do Zcash depende de onde o seu ZEC chega (veja abaixo).

**#3 Descentralização**: As corretoras não custodiantes se alinham mais estreitamente ao espírito descentralizado das criptomoedas. Os usuários têm maior autonomia e controle sobre suas atividades de trading, em conformidade com os princípios mais amplos da tecnologia blockchain.

Quando se trata de Corretoras Custodiantes, o nível de descentralização costuma ser bastante reduzido na maioria das corretoras centralizadas, nas quais a equipe ou os responsáveis pela corretora gerenciam os dados ou informações dos usuários.

**#4 Adaptabilidade a regulamentações em mudança**: As corretoras não custodiantes são frequentemente mais adaptáveis a ambientes regulatórios em mudança. Como não detêm fundos dos usuários, podem ter menos desafios de conformidade em comparação com as corretoras custodiantes.

**#5 Inovação e experimentação**: As corretoras não custodiantes frequentemente impulsionam a inovação no espaço cripto. Elas incentivam o desenvolvimento de tecnologias descentralizadas, como criadores de mercado automatizados (AMMs) e aplicativos de finanças descentralizadas (DeFi).

**#6 Acessibilidade global**: As corretoras não custodiantes frequentemente proporcionam acesso a criptomoedas para usuários de todo o mundo, incluindo regiões onde obstáculos regulatórios podem limitar a disponibilidade de serviços de corretoras custodiantes.

**#7 Sem requisitos de KYC**: Muitas corretoras não custodiantes não pedem documentos de identificação antecipadamente. A maioria ainda verifica endereços de carteira em bancos de dados de conformidade, e uma conversão pode ser atrasada, bloqueada ou recusada se algo for sinalizado. Consulte os termos do serviço antes de depender dele.

### **O que o Zcash protege e o que não protege**

A privacidade do Zcash vem dos endereços blindados. Quando o ZEC se move entre endereços blindados, o remetente, destinatário, valor e memorando são criptografados na chain do Zcash. Consulte [Pools blindados](/using-zcash/shielded-pools) para saber como isso funciona.

Uma conversão tem partes que o Zcash não consegue ocultar:

- **A rede de origem.** Os fundos que você envia da Solana, Ethereum ou outra chain pública ficam visíveis nessa chain, incluindo seu endereço e o valor.
- **O endereço de recebimento.** Algumas rotas de conversão entregam ZEC a um endereço transparente. Por exemplo, o NEAR Intents lista o ZEC como compatível apenas com [endereços transparentes](https://docs.near-intents.org/resources/chain-support). O ZEC enviado para um endereço transparente (t1 ou t3) é público, assim como o Bitcoin. Blindá-lo depois protege o que você fizer em seguida, mas a transferência recebida e a transação de blindagem continuam visíveis.
- **O serviço.** O app e qualquer serviço de roteamento veem os endereços e valores que você fornece, além de dados de conexão como seu endereço IP.

Envie o ZEC para uma carteira que você controla e blinde-o antes de gastá-lo. [Usando ZEC de forma privada](/guides/using-zec-privately) aborda os próximos passos.

### **Quem está envolvido em uma conversão**

Use como exemplo uma conversão roteada pelo serviço 1Click do NEAR Intents. Os [termos da API](https://docs.near-intents.org/security-compliance/terms-of-service) tratam estes como elementos separados:

- **A interface**: o site ou a carteira que você usa. Ela pode ser operada pela Intents Technology ou por terceiros com seus próprios termos.
- **1Click**: um serviço de roteamento e liquidação operado pela Intents Technology Limited. Você envia fundos para um endereço de depósito criado para sua cotação. A documentação diz que o 1Click não assume custódia, mas os termos observam que os ativos podem ser retidos ou bloqueados em infraestrutura de ponte enquanto uma transferência está em andamento.
- **O protocolo**: os contratos inteligentes do NEAR Intents.
- **Solucionadores**: terceiros independentes que preenchem a cotação.
- **Pontes**: o ZEC nativo se move pela PoA Bridge, operada pela Intents Technology.

O NEAR Intents também [verifica fluxos de cotações integrados](https://docs.near-intents.org/security-compliance/risk-and-compliance) em vários bancos de dados de AML e afirma que a cobertura varia conforme o fluxo e a integração. Segundo seus termos, uma conversão sinalizada pode ser atrasada, bloqueada, congelada ou rejeitada.

### **O que você compartilha durante uma conversão**

- O endereço ZEC que recebe a conversão e um endereço de reembolso na rede de origem.
- O ativo e o valor, bem como a transação de depósito que você envia, que é pública na chain de origem.
- Dados de conexão. Os termos do 1Click dizem que a Intents Technology pode coletar metadados de solicitações, endereços IP e endereços de carteira, e a política de privacidade em near.com lista endereço IP, localização, informações do navegador e do dispositivo.
- Tudo o que o app adicionar, como outros endereços de carteira conectados. Os apps também podem submeter sua carteira às próprias verificações de conformidade.

### **Onde consultar termos e suporte**

Os termos mudam, portanto leia as versões atuais antes de fazer uma conversão de grande valor.

- **Comece pelo app que você usa.** Ele é seu principal ponto de contato. Os termos da API do 1Click dizem que a Intents Technology não tem relação direta com usuários de apps criados com ela.
- **NEAR Intents:** os termos e a política de privacidade em near.com/terms e near.com/privacy, além dos [termos da API do 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) e de [risco e conformidade](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Acompanhamento e suporte:** procure uma conversão no [Explorador do NEAR Intents](https://explorer.near-intents.org) ou peça ajuda no [Telegram do NEAR Intents](https://t.me/near_intents).
- **Reembolsos:** uma conversão que falhou pode ser devolvida ao endereço de reembolso que você forneceu, mas os termos do near.com dizem que um reembolso não é garantido. Os termos do 1Click também dizem que solicitações de recuperação por erros do usuário abaixo de USD 300 não são consideradas.

Agora, vamos explorar algumas das corretoras não custodiantes acessíveis que facilitam o trading de Zcash. Usar essas plataformas oferecerá a você uma maneira conveniente de adquirir mais moedas de Zcash.

### **Resumo**

As corretoras não custodiantes, ou DEXs, permitem que você negocie a partir da sua própria carteira enquanto mantém o controle de suas chaves privadas. Isso ajuda na segurança, mas a privacidade depende da rota: a chain de origem é pública, o serviço vê seus endereços e dados de conexão, e seu ZEC só é privado quando está em um endereço blindado.

Embora as corretoras não custodiantes ofereçam vantagens atraentes, é importante reconhecer que podem apresentar desvantagens, como possíveis problemas de liquidez e uma curva de aprendizado mais acentuada para usuários menos experientes.

Como em qualquer decisão financeira, os traders devem avaliar cuidadosamente suas prioridades, tolerância ao risco e familiaridade com a tecnologia antes de escolher entre opções de corretoras não custodiantes e custodiantes.
