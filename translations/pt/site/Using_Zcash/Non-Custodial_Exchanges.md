<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Alt Text" width="50"/>   Exchanges Não-Custodiais

[Zcash Exchanges Não-Custodiais](/dex)

No mundo em constante evolução do trading de criptomoedas, as exchanges não-custodiais, também conhecidas como Exchanges Descentralizadas ou DEXs, permitem aos utilizadores negociar sem entregarem os seus fundos a uma conta numa exchange. Mantém as suas próprias chaves, mas isso não significa que mais ninguém esteja envolvido. Dependendo da rota, uma troca pode passar por um website ou aplicação de wallet, um serviço de encaminhamento, contratos inteligentes, solucionadores e bridges.

As exchanges acima indicadas permitem-lhe obter e negociar Zcash a partir da sua própria wallet. O grau de privacidade de uma troca depende do serviço, da rede a partir da qual paga e de se o seu ZEC acaba num endereço blindado. As secções abaixo explicam a diferença.

### **Compreender as Exchanges Não-Custodiais**

As exchanges não-custodiais, também conhecidas como Exchanges Descentralizadas (DEXs), são plataformas que facilitam o trading de criptomoedas sem exigirem que os utilizadores depositem os seus fundos na própria exchange. Em vez disso, os utilizadores mantêm o controlo das suas chaves privadas e negociam a partir das suas próprias wallets. As trocas entre cadeias continuam a depender de outras partes para cotar, encaminhar e liquidar a negociação (ver abaixo).

Isto pode melhorar a segurança, pois os utilizadores não dependem da exchange para guardar os seus ativos, reduzindo o risco de ataques ou má gestão. Não torna, por si só, uma troca privada. As transações em exchanges não-custodiais utilizam frequentemente contratos inteligentes, que são públicos, e o serviço que utiliza pode ainda ver os seus endereços e detalhes de ligação.

Uma vantagem fundamental das exchanges de criptomoedas não-custodiais reside no maior controlo que proporcionam aos utilizadores sobre os seus ativos. Como estas exchanges não retêm os ativos, os utilizadores desfrutam de propriedade e autoridade completas sobre as suas moedas digitais.

### **Exchanges Não-Custodiais Vs Exchanges Custodiais**

**#1 Segurança**: As exchanges não-custodiais eliminam a necessidade de manter fundos numa conta central de exchange. Os utilizadores mantêm o controlo das suas chaves privadas, reduzindo o risco de ataques, ataques internos e falhas de plataforma que as exchanges custodiais podem sofrer. As trocas entre cadeias ainda podem reter fundos por pouco tempo num endereço de depósito ou bridge enquanto a negociação é liquidada.

**#2 Privacidade**: As trocas não-custodiais geralmente não precisam de uma conta de exchange, pelo que frequentemente não é necessário registar-se com um email ou identificação. Isto não é o mesmo que anonimato. O depósito que envia na rede de origem (por exemplo, Solana ou Ethereum) é público nessa cadeia, e o serviço pode ainda ver os seus endereços de wallet, endereço IP e detalhes da troca. A privacidade no lado Zcash depende de onde o seu ZEC chega (ver abaixo).

**#3 Descentralização**: As exchanges não-custodiais alinham-se mais estreitamente com o espírito descentralizado das criptomoedas. Os utilizadores têm maior autonomia e controlo sobre as suas atividades de trading, em conformidade com os princípios mais amplos da tecnologia blockchain.

Quando se trata de Exchanges Custodiais, o nível de Descentralização é frequentemente bastante reduzido na maioria das exchanges centralizadas, que fazem com que a equipa ou os responsáveis da exchange façam a gestão dos dados ou informações dos utilizadores na exchange.

**#4 Adaptabilidade a Regulamentos em Mudança**: As exchanges não-custodiais são frequentemente mais adaptáveis a ambientes regulatórios em mudança. Uma vez que não detêm fundos dos utilizadores, podem ter menos desafios de conformidade em comparação com as exchanges custodiais.

**#5 Inovação e Experimentação**: As exchanges não-custodiais impulsionam frequentemente a inovação no espaço cripto. Incentivam o desenvolvimento de tecnologias descentralizadas, tais como criadores de mercado automatizados (AMMs) e aplicações de finanças descentralizadas (DeFi).

**#6 Acessibilidade Global**: As exchanges não-custodiais proporcionam frequentemente acesso a criptomoedas a utilizadores de todo o mundo, incluindo regiões onde obstáculos regulatórios podem limitar a disponibilidade de serviços de exchanges custodiais.

**#7 Sem Requisitos KYC**: Muitas exchanges não-custodiais não pedem documentos de identificação antecipadamente. A maioria ainda verifica endereços de wallet em bases de dados de conformidade, e uma troca pode ser atrasada, bloqueada ou recusada se algo for sinalizado. Consulte os termos do serviço antes de depender dele.

### **O Que Zcash Protege e o Que Não Protege**

A privacidade de Zcash provém dos endereços blindados. Quando ZEC se move entre endereços blindados, o remetente, destinatário, montante e memorando são encriptados na cadeia Zcash. Consulte [Shielded Pools](/using-zcash/shielded-pools) para saber como isto funciona.

Uma troca tem componentes que Zcash não consegue ocultar:

- **A rede de origem.** Os fundos que envia a partir de Solana, Ethereum ou outra cadeia pública são visíveis nessa cadeia, incluindo o seu endereço e o montante.
- **O endereço de receção.** Algumas rotas de troca entregam ZEC a um endereço transparente. Por exemplo, Near Intents lista ZEC como suportado apenas para [endereços transparentes](https://docs.near-intents.org/resources/chain-support). O ZEC enviado para um endereço transparente (t1 ou t3) é público, tal como Bitcoin. Blindá-lo posteriormente protege o que fizer a seguir, mas a transferência recebida e a transação de blindagem permanecem visíveis.
- **O serviço.** A aplicação e qualquer serviço de encaminhamento veem os endereços e montantes que lhes fornece, além de dados de ligação como o seu endereço IP.

Envie o ZEC para uma wallet que controla e blinde-o antes de o gastar. [Utilizar ZEC de Forma Privada](/guides/using-zec-privately) aborda os próximos passos.

### **Quem Está Envolvido numa Troca**

Tomemos como exemplo uma troca encaminhada através do serviço 1Click de Near Intents. Os seus [termos da API](https://docs.near-intents.org/security-compliance/terms-of-service) tratam estes elementos como partes distintas:

- **A interface**: o website ou a wallet que utiliza. Pode ser operada pela Intents Technology ou por terceiros com os seus próprios termos.
- **1Click**: um serviço de encaminhamento e liquidação operado pela Intents Technology Limited. Envia fundos para um endereço de depósito criado para a sua cotação. A documentação diz que 1Click não toma custódia, mas os termos indicam que os ativos podem ser retidos ou bloqueados em infraestrutura de bridge enquanto uma transferência está em curso.
- **O protocolo**: os contratos inteligentes de Near Intents.
- **Solucionadores**: terceiros independentes que preenchem a cotação.
- **Bridges**: o ZEC nativo move-se através da PoA Bridge, operada pela Intents Technology.

Near Intents também [verifica fluxos de cotações integrados](https://docs.near-intents.org/security-compliance/risk-and-compliance) em várias bases de dados AML e afirma que a cobertura varia consoante o fluxo e a integração. Nos termos do serviço, uma troca sinalizada pode ser atrasada, bloqueada, congelada ou rejeitada.

### **O Que Partilha Durante uma Troca**

- O endereço ZEC que recebe a troca e um endereço de reembolso na rede de origem.
- O ativo e o montante, bem como a transação de depósito que envia, que é pública na cadeia de origem.
- Dados de ligação. Os termos do 1Click dizem que a Intents Technology pode recolher metadados de pedidos, endereços IP e endereços de wallet, e a política de privacidade em near.com lista endereço IP, localização, informações do navegador e do dispositivo.
- Tudo o que a aplicação acrescentar, como outros endereços de wallet ligados. As aplicações também podem submeter a sua wallet às suas próprias verificações de conformidade.

### **Onde Consultar Termos e Suporte**

Os termos mudam, por isso leia as versões atuais antes de fazer uma troca de grande valor.

- **Comece pela aplicação que utiliza.** É o seu principal ponto de contacto. Os termos da API 1Click dizem que a Intents Technology não tem uma relação direta com os utilizadores das aplicações criadas sobre ela.
- **Near Intents:** os termos e a política de privacidade em near.com/terms e near.com/privacy, além dos [termos da API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) e de [risco e conformidade](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Acompanhamento e suporte:** procure uma troca no [Near Intents Explorer](https://explorer.near-intents.org) ou peça ajuda no [Near Intents Telegram](https://t.me/near_intents).
- **Reembolsos:** uma troca falhada pode ser devolvida ao endereço de reembolso que forneceu, mas os termos de near.com dizem que um reembolso não é garantido. Os termos do 1Click também indicam que pedidos de recuperação por erros do utilizador inferiores a USD 300 não são considerados.

Agora, vamos explorar algumas das exchanges não-custodiais acessíveis que facilitam o trading de Zcash. Utilizar estas plataformas proporcionar-lhe-á uma forma conveniente de adquirir mais moedas Zcash.

### **Resumo**

As exchanges não-custodiais, ou DEXs, permitem-lhe negociar a partir da sua própria wallet enquanto mantém o controlo das suas chaves privadas. Isto ajuda a segurança, mas a privacidade depende da rota: a cadeia de origem é pública, o serviço vê os seus endereços e dados de ligação, e o seu ZEC só é privado quando se encontra num endereço blindado.

Embora as exchanges não-custodiais ofereçam vantagens convincentes, é importante reconhecer que podem apresentar desvantagens, como potenciais problemas de liquidez e uma curva de aprendizagem mais acentuada para utilizadores menos experientes.

Como em qualquer decisão financeira, os traders devem avaliar cuidadosamente as suas prioridades, tolerância ao risco e familiaridade com a tecnologia antes de escolher entre opções de exchanges não-custodiais e custodiais.
