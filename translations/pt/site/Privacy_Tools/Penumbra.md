# Penumbra 

Penumbra é uma rede de camada 1 totalmente blindada, proof-of-stake e uma corretora descentralizada no ecossistema Cosmos. Seu pool blindado interchain pode manter ativos de chains conectadas por IBC. Os usuários podem transferir, fazer staking, realizar conversões e fornecer liquidez dentro de Penumbra sem publicar os saldos individuais de suas contas nem vincular essas ações à sua identidade. Isso não significa que todos os dados da rede ou da DEX sejam privados.

![image.png](/content-images/_unavailable.svg)

## Tecnologia usada no IBC de Penumbra 

Integração IBC: O protocolo Inter-Blockchain Communication (IBC) conecta Penumbra a outras chains habilitadas para IBC. Uma transferência IBC de entrada blinda os fundos à medida que eles entram em Penumbra; uma transferência de saída os torna não blindados à medida que saem. A atividade em uma chain contraparte transparente permanece pública, incluindo o endereço de destino de um depósito de entrada. A [fronteira de privacidade segue a fronteira do IBC](https://guide.penumbra.zone/overview/interchain-privacy).

Provas de conhecimento zero (ZKPs): Penumbra usa provas de conhecimento zero no lado do cliente para demonstrar que as atualizações de estado criptografadas são válidas sem publicar os dados privados de transação de um usuário. As carteiras examinam e descriptografam localmente os dados visíveis para elas; um nó público não pode simplesmente retornar o saldo privado de um usuário.

![image.png](/content-images/_unavailable.svg)

Corretora descentralizada com privacidade: Penumbra inclui uma DEX para negociar ativos dentro de seu pool blindado. Os resultados individuais das conversões são privados, enquanto os resultados da execução em lote e as posições anônimas de liquidez são públicos. Essas distinções são importantes ao descrever o que a corretora oculta.

## Casos de uso

Transações seguras: As transferências dentro do pool blindado de Penumbra protegem o remetente, o destinatário, o valor e o tipo de ativo. Os usuários podem divulgar seletivamente a atividade a terceiros autorizados. Compartilhar apenas um endereço de recebimento não expõe os saldos de seu proprietário. Essas propriedades não se estendem à atividade pública em outra chain após os fundos serem retirados.

Staking: O token nativo de staking de Penumbra é **UM**. Delegar UM a um validador retorna tokens de delegação que representam participações no pool de delegação desse validador. O staking total no pool de cada validador é público, enquanto as delegações individuais são anônimas. A retirada da delegação primeiro cria tokens de desvinculação específicos do validador, que permanecem expostos a slashing até o fim do período de desvinculação. Consulte o [guia oficial de staking blindado](https://guide.penumbra.zone/overview/staking).

Conversões de tokens: As intenções de conversão são agrupadas por par de negociação e executadas em lote ao fim de cada bloco. Isso remove a ordenação intrabloco das intenções de conversão como uma ferramenta para traders; é um mecanismo específico, não uma garantia de que nenhuma forma de MEV possa existir. Os resultados em lote são gravados no estado público da chain, e os usuários reivindicam privadamente sua parte do resultado para o pool blindado. O [guia da DEX](https://guide.penumbra.zone/overview/dex) descreve a execução em lote e a arbitragem automática do protocolo.

Formação de mercado: Os provedores de liquidez criam posições anônimas de liquidez concentrada. A liquidez e as funções de negociação das posições são públicas, mas não estão vinculadas à identidade do provedor.
