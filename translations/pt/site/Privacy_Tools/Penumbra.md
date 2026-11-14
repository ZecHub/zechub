# Penumbra 

Penumbra é uma rede de camada 1 com prova de participação, totalmente blindada, e uma corretora descentralizada no ecossistema Cosmos. Seu pool blindado intercadeias pode guardar ativos de chains conectadas via IBC. Os usuários podem transferir, fazer staking, realizar conversões e fornecer liquidez dentro do Penumbra sem publicar os saldos de suas contas individuais nem vincular essas ações à sua identidade. Isso não significa que todos os dados da rede ou da DEX sejam privados.

![image.png](/content-images/_unavailable.svg)

## Tecnologia usada no IBC do Penumbra 

Integração IBC: o protocolo Inter-Blockchain Communication (IBC) conecta o Penumbra a outras chains compatíveis com IBC. Uma transferência IBC de entrada blinda os fundos quando eles entram no Penumbra; uma transferência de saída os desblinda quando eles saem. A atividade em uma chain de contraparte transparente continua pública, incluindo o endereço de destino de um depósito de entrada. O [limite da privacidade acompanha o limite do IBC](https://guide.penumbra.zone/overview/interchain-privacy).

Provas de conhecimento zero (ZKPs): o Penumbra usa provas de conhecimento zero geradas no lado do cliente para mostrar que as atualizações de estado criptografadas são válidas sem publicar os dados privados das transações do usuário. As carteiras escaneiam e descriptografam localmente os dados visíveis para elas; um nó público não consegue simplesmente retornar o saldo privado de um usuário.

![image.png](/content-images/_unavailable.svg)

Corretora descentralizada com privacidade: o Penumbra inclui uma DEX para negociar ativos dentro do seu pool blindado. Os resultados individuais das conversões são privados, enquanto os resultados da execução em lote e as posições de liquidez anônimas são públicos. Essas distinções são importantes quando se descreve o que a corretora oculta.

## Casos de uso

Transações seguras: as transferências dentro do pool blindado do Penumbra protegem o remetente, o destinatário, o valor e o tipo de ativo. Os usuários podem revelar seletivamente sua atividade a terceiros autorizados. Compartilhar apenas um endereço de recebimento não expõe os saldos do seu dono. Essas propriedades não se estendem à atividade pública em outra chain depois que os fundos são sacados.

Staking: o token nativo de staking do Penumbra é o **UM**. Delegar UM a um validador gera tokens de delegação que representam cotas no pool de delegação desse validador. O total em stake no pool de cada validador é público, enquanto as delegações individuais são anônimas. A remoção da delegação cria primeiro tokens de desvinculação específicos do validador, que continuam expostos a slashing até o fim do período de desvinculação. Consulte o [guia oficial de staking blindado](https://guide.penumbra.zone/overview/staking).

Conversões de tokens: as intenções de conversão são agrupadas por par de negociação e executadas em lote no final de cada bloco. Isso elimina a ordenação das intenções de conversão dentro do bloco como uma vantagem para os traders; trata-se de um mecanismo específico, não de uma garantia de que nenhuma forma de MEV possa existir. Os resultados do lote são gravados no estado público da chain, e os usuários resgatam de forma privada sua parte do resultado para o pool blindado. O [guia da DEX](https://guide.penumbra.zone/overview/dex) descreve a execução em lote e a arbitragem automática do protocolo.

Formação de mercado: os provedores de liquidez criam posições de liquidez concentrada anônimas. A liquidez e as funções de negociação das posições são públicas, mas não estão vinculadas à identidade do provedor.
