# Transações

ZEC é usado principalmente para pagamentos. Pense em retribuir a um amigo, comprar um café ou doar para uma causa importante para você. 

Este é o caso de uso mais forte do ZEC devido aos seus fortes recursos de privacidade. Existem várias maneiras diferentes de executar uma transação com a Zcash e, para preservar a privacidade do usuário, é importante entender qual transação você está executando.

#### Transações Blindadas

As transações blindadas (shieldeds) ocorrem quando você move o ZEC para sua carteira blindada. O endereço da sua carteira blindada começa com "U" ou "Z". Ao enviar transações blindadas, você garante que você e as pessoas com quem está negociando mantenham um nível de privacidade que não é possível em outras redes de pagamento P2P.

Enviar uma transação blindada é muito fácil, você só precisa se certificar de duas coisas. A primeira é que você está usando o tipo certo de carteira. A maneira mais fácil de garantir que você está usando o tipo certo de carteira é baixando uma carteira destacada nos site oficiais: [z.cash/wallets](https://z.cash/wallets) ou [zechub.wiki/wallets](https://zechub.wiki/wallets). A segunda coisa importante é mover o ZEC para uma carteira blindada.

Ao retirar o ZEC de uma Exchange, você precisa saber se a Exchange oferece suporte a saques blindados ou transparentes. Se eles oferecerem suporte a saques blindados, você pode simplesmente retirar o ZEC para seu endereço blindado. Se a Exchange oferecer suporte apenas a saques transparentes, você precisará usar **[YWallet](https://ywallet.app)** e proteger automaticamente seu ZEC assim que o receber.

Você faz isso enviando ZEC para o seu endereço (T) transparente na YWallet e, em seguida, protegendo-o [enviando-o para uma Pool Blindada].

Nas configurações da Ywallet, você pode expor os componentes S (sapling), T (transparent) e O (orchard) que compõem seu endereço unificado (que começa com U) - Consulte [Guia](https://zechub.notion.site/Visualizando-Zcash-Addresses-27c0bcc423fa48f68374a0d6c317213b).

Ao executar a transação, você seleciona a quantidade de ZEC que deseja enviar, digita o endereço blindado, escreve um [memorando](https://zechub.wiki/using-zcash/memos#content) (mensagem criptografada) e, em seguida, finaliza a transação. Tudo o que você precisa garantir ao executar uma transação blindada é que a pessoa para quem você está enviando o ZEC forneça seu **endereço blindado**.

*Usar apenas transações blidnadas para enviar e receber fundos é a melhor maneira de manter a privacidade e reduzir o risco de vazamento de dados*

#### Transações Transparentes

Qualquer tipo de transação, fora de uma transação blindada, deve ser considerada uma transação transparente. O processo de executar uma transação transparente funciona de maneira semelhante às transações blindadas, exceto que você não pode enviar um memorando. Você pode enviar ZEC de seu endereço blindado para um endereço transparente, mas isso não é recomendado porque há risco de vazamento de dados.

Transações transparentes acontecem em uma blockchain transparente, como o Bitcoin. Isso significa que qualquer pessoa com o endereço da sua carteira pode ver todas as suas atividades no blockchain. Ao usar o ZEC em transações transparentes, você perde a privacidade que as transações blindadas fornecem.

Transações transparentes causaram confusão em torno da privacidade da ZEC no passado. A melhor maneira de ter a melhor privacidade ao usar o ZEC é mantendo-o em uma carteira blindada e realizando transações apenas de forma privada. 

#### Recursos

- [Enviando uma transação ZEC blindada](https://www.youtube.com/watch?v=9WJSMxag2IQ)

#### Observação

Observe que a maneira mais segura de usar o ZEC é usar apenas transações blindadas. Algumas carteiras estão em processo de implementação de [endereços unificados](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20é,dentrode%20o%20maisamplo%20Zcash%20ecossistema.) que permite que usuários e exchanges combinem endereços transparentes e blindados juntos.


