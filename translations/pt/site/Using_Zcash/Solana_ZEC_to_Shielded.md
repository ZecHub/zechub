<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Recebeu ZEC na Solana? Mova para Zcash blindado

Esta página é para você se ZEC apareceu na sua carteira Solana porque você tem ZCAT ou outro token Solana que paga seus detentores em ZEC. Você não precisa vender nada para seguir o guia. Você vai mover o ZEC que já tem da Solana para uma carteira Zcash e terminar com ele blindado.

Executamos cada etapa abaixo com uma transferência real em 27 de setembro de 2026, começando com 0,00266336 ZEC na Phantom. As taxas, os tempos e as telas desta página são o que vimos.

---

## Resumo

- O ZEC na sua carteira Solana é um **token Solana** (mint `A7bd…QXaS`) lastreado 1:1 por ZEC real que a NEAR OmniBridge mantém na chain do Zcash. É um "ZEC de papel" que fica no livro-razão público da Solana e não pode ser blindado lá.
- O caminho tem duas etapas: **deposite** o token no solswap.org (NEAR Intents) e depois **saque** no near.com para o endereço `u1` blindado da sua carteira. Não use o botão Swap da própria Phantom, porque ele não ajuda você.
- Use uma carteira que o [ZecHub diretório](/wallets) marca como **Ironwood: Ready** e mantenha um pouco de SOL na Phantom para a taxa da Solana.
- Nosso teste real (27 de setembro de 2026, 0,00266336 ZEC): o depósito caiu em 9 segundos, o saque levou cerca de 8 minutos e o custo total foi de ~0,00025 ZEC + 0,0016 SOL.
- Regra de segurança: só assine pedidos de mensagem em `near.com`/`solswap.org` com `intents.near` na mensagem, nunca digite sua frase semente e cole um `u1`, nunca um `t1`.

## Analogia visual

O ZEC na Solana funciona como uma **ficha de cassino**. Ela vale como dinheiro, e o cassino (a NEAR OmniBridge) promete cédulas de verdade (ZEC nativo) a quem devolver a ficha. Mas a ficha é só uma linha no livro-razão do cassino: todo mundo pode ver quem a tem, e o valor dela depende de os sistemas do cassino continuarem funcionando bem. Sacar pelo near.com é ir até o caixa e trocar a ficha. Quando as cédulas estão em uma pool blindada, elas ficam na sua própria carteira opaca, e ninguém consegue mais ver o valor nem quem as tem.

---

## O que você realmente tem

O ZEC na sua carteira Solana é um token na Solana, não moedas na rede Zcash. A NEAR OmniBridge emite esse token e mantém ZEC real na chain do Zcash como lastro. A ponte está ativa na Solana desde outubro de 2025. A parte Solana funciona com mensagens do Wormhole e com Chain Signatures da NEAR, não com um light client do Zcash, então o lado Solana só é tão confiável quanto esses dois sistemas. As pessoas chamam isso de "ZEC de papel". Ele acompanha o preço do ZEC, mas cada saldo e cada transferência ficam no livro-razão público da Solana sob o endereço da sua carteira, e ele não pode ser blindado enquanto estiver lá.

Confira se o seu é o token verdadeiro. Na Phantom, toque em **ZEC** e role até **About Zcash**. O endereço do contrato precisa ser:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Painel Sobre Zcash do Phantom mostrando o endereço do contrato A7bd…QXaS na rede Solana](/content-images/01-phantom-zec-mint-4a718bc213.webp)

A Phantom abrevia o endereço para `A7bd…QXaS`, então compare os primeiros e os últimos caracteres ou consulte o endereço completo no [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS). Qualquer outro token "ZEC" na sua carteira, seja qual for o nome ou o logo, não é este. Deixe-o de lado.

---

## Por que mover

O ZEC blindado é a razão de ser do Zcash. Quando seu ZEC está em uma pool blindada, o remetente, o destinatário e o valor de cada pagamento ficam criptografados na chain do Zcash. Ninguém que esteja navegando em um explorador consegue ver seu saldo.

Você já tem ZEC. Mover para uma carteira Zcash dá a você justamente a parte que faz dele Zcash, e ainda tira a ponte da equação: ZEC nativo na sua própria carteira não depende de ninguém honrar um resgate.

[Quem pode ver seu pagamento em Zcash?](/start-here/who-can-see-your-zcash-payment) explica exatamente o que fica oculto.

---

## Escolha uma carteira Zcash

A ZecHub não escolhe uma para você. Escolha no [ZecHub diretório de carteiras](/wallets) e confira duas etiquetas no card da carteira antes de instalá-la:

- **Ironwood: Ready.** Ironwood é a pool para onde vai o novo ZEC blindado desde a [Ironwood atualização](/zcash-tech/ironwood) de 28 de julho de 2026. A pool Orchard, mais antiga, não aceita mais novos fundos.
- **Automatic Shielding.** É útil se um pagamento chegar transparente: a carteira move esse ZEC para a pool blindada por você. Não trate essa etiqueta como substituta de **Ironwood: Ready**. Uma carteira pode ter Automatic Shielding e mesmo assim não ter uma pool Ironwood (hoje o diretório mostra a Edge nessa situação). A maioria das outras carteiras mostra um botão **Shield** no lugar.

Instale a carteira pelo link do card no diretório, não por um resultado de busca ou anúncio. Anote a frase semente em papel e guarde offline.

Sua carteira mostra dois tipos de endereço:

![Tela Receber de uma carteira Zcash com um endereço blindado começando com u1 e um endereço transparente começando com t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| Começa com | Tipo | O que o público vê |
|---|---|---|
| `u1` | Endereço unificado | Nada sobre você, mas só quando o pagamento cai em uma pool blindada |
| `t1` | Endereço transparente | Seu endereço e o valor, para sempre, como no Solana |

Use um `u1` que sua carteira identifica como blindado. Um `u1` é um conjunto de receptores, e algumas carteiras colocam nele um receptor transparente ao lado do blindado. Um remetente que só consegue pagar endereços transparentes vai usar esse receptor, e seu pagamento chega público mesmo que você tenha colado um `u1`. O endereço blindado da nossa carteira de teste não tem receptor transparente, então isso não poderia acontecer. [Pools blindadas](/using-zcash/shielded-pools) fala sobre receptores com mais detalhes. Algumas carteiras mostram um `u1` novo toda vez que você abre a tela de recebimento. Isso é normal, e todos pertencem a você. Por esse motivo, a captura de tela de recebimento e o campo de destinatário do near.com nesta página usam prefixos de `u1` diferentes.

Usamos a ZODL no nosso teste porque era a carteira que já tínhamos configurado. Só carteiras que o diretório marca como **Ironwood: Ready** podem receber novo valor blindado.

---

## Faça a transferência

O caminho tem duas partes: colocar seu ZEC no NEAR Intents a partir da Phantom e depois enviá-lo para o seu endereço Zcash. Usamos o [solswap.org](https://solswap.org), um site criado pela NEAR para usuários da Solana, na primeira parte, e o [near.com](https://near.com), o app da própria NEAR, na segunda. O guia [Como fazer swap para ZEC na Phantom Wallet](/using-zcash/solswap) da ZecHub mostra as telas do solswap com mais detalhes. Não use o botão **Swap** da própria Phantom para isso: você já tem o token, e fazer swap dele não leva você a lugar nenhum.

Mantenha um pouco de SOL na Phantom para a taxa da Solana.

### 1. Deposite seu ZEC no solswap.org

1. Abra a Phantom, vá até a aba do navegador, digite `solswap.org` você mesmo e conecte sua carteira.
2. Toque em **Deposit**. Defina **Asset** como **Zcash**, **Network** como **Solana** e o método como **Wallet**.
3. Insira o valor (ou toque em **Max**) e aprove a transação na Phantom.

![Tela de depósito do solswap com Zcash como ativo, Solana como rede e Carteira como método](/content-images/03-solswap-deposit-425691e62f.webp)

Nosso depósito entrou no bloco da Solana às 15:09:08 (UTC+1), e o solswap o mostrou como **Completed** nove segundos depois.

![Histórico de depósitos do solswap mostrando Concluído, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

Seu ZEC agora está no seu saldo NEAR Intents. Sua chave Phantom autoriza cada movimentação para fora dele, os solvers da NEAR Intents fazem a entrega, e a NEAR Intents pode reter um saldo para análise de compliance (veja as observações sobre confiança abaixo).

### 2. Envie para o seu endereço Zcash no near.com

O solswap também tem uma página **Withdraw**, mas ela não funcionou para nós. **Received amount** e **Fee** continuaram em "–" e o botão não fazia nada, quer escolhêssemos Zcash ou Solana como rede.

![Formulário de saque do solswap com o valor recebido e a taxa travados em um traço](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

Se isso acontecer com você, seu ZEC não está preso. O saldo está vinculado à chave da sua carteira, não ao site, então qualquer app NEAR Intents em que você entrar com essa carteira consegue acessá-lo. Nós terminamos no near.com:

1. Acesse `near.com` e entre com a mesma carteira Phantom.
2. Seu saldo do solswap aparece em **Move legacy assets** (o near.com chama de "legacy" os saldos de apps NEAR Intents mais antigos). Toque em **Withdraw** na linha ZEC. Você não precisa de **Move**.

![Página Mover ativos legados do near.com listando 0.0026 ZEC com os botões Mover e Sacar](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. Defina **Network** como **Zcash**, cole o endereço `u1` da sua carteira como **Recipient** e confira os seis primeiros e os seis últimos caracteres com a sua carteira.

![Formulário Sacar ativo legado do near.com com Zcash como rede e um destinatário u1, receber pelo menos 0.00233164 ZEC, cerca de 2 minutos](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. Toque em **Review withdrawal**, leia o resumo e toque em **Send**.

![Tela Revisar envio do near.com: rede Zcash, o destinatário recebe pelo menos 0.00233164 ZEC, taxa 0 ZEC, você paga 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. A Phantom pede que você faça **Sign Message** para o near.com. Essa assinatura é o que autoriza a NEAR Intents a mover seu saldo. Ela não custa SOL, mas isso não a torna inofensiva: um site falso pode mostrar o mesmo pedido e esvaziar seu saldo NEAR Intents com ele. Antes de tocar em **Confirm**, verifique todos os itens abaixo e toque em **Cancel** se qualquer um falhar:
   - O site indicado no pedido é `near.com`. (O depósito da etapa 1 foi um pedido de transação comum da Phantom vindo de `solswap.org`. Confira esse nome lá da mesma forma.)
   - Abra **Message** e encontre `"verifying_contract": "intents.near"`.
   - A mensagem é um texto legível como o da captura de tela. Se for um bloco ilegível, ou se o site não corresponder ao da sua barra de endereço, rejeite.
   - Ela nunca pede sua frase semente. Assinar nunca envolve digitá-la.

![Solicitação Sign Message do Phantom vinda de near.com na rede Solana](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. O near.com mostra **Processing send**, **Sending** e **Complete**. **View on explorer** abre o registro da transferência no NEAR Intents.

![Tela de status do near.com: Enviando 0.0023 ZEC, todas as três etapas concluídas](/content-images/10-nearcom-complete-c641093c46.webp)

![Registro do explorador NEAR Intents: criado às 3:59:28 PM, sacado para o endereço u1 às 4:07:55 PM, com o ID da transação de saque Zcash](/content-images/11-intents-explorer-f93f87814e.webp)

### Quanto nosso teste custou e quanto tempo levou

| | Nosso teste |
|---|---|
| ZEC depositado da Phantom | 0,00266336 ZEC |
| ZEC recebido na carteira Zcash | 0,00241336 ZEC, blindado |
| Custo no lado ZEC | 0,00025 ZEC (o near.com mostrou "Fee 0 ZEC"; o custo está embutido na cotação) |
| SOL gasto no depósito | 0,00156844 SOL, dos quais 0,00008 SOL foram a taxa de rede |
| Mínimo | Nenhum foi atingido. O solswap indicava um depósito mínimo de 0,00000001 ZEC, e o near.com aceitou 0,0026 ZEC |
| Depósito, da Phantom para o solswap | 9 segundos |
| Saque, da assinatura no near.com até o ZEC na carteira Zcash | Cerca de 8 minutos (o near.com estimou cerca de 2) |

Registros: depósito na Solana [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) no bloco 3.498.141. As taxas e os tempos mudam conforme a carga da rede, então a tela de revisão é a palavra final quando você fizer o processo.

A ponte da NEAR divulga um mínimo de 0,01 ZEC e uma taxa de 0,00047 ZEC para seus saques Zcash padrão. O near.com não aplicou nenhum dos dois aos nossos 0,0026 ZEC. Se um app recusar um valor pequeno, tente o near.com antes de fazer uma recarga.

### Outros caminhos e em quem cada um confia

Todo caminho para sair da Solana confia na OmniBridge, porque a ponte guarda o ZEC que lastreia seu token. Além disso:

- **O caminho acima** confia na NEAR Intents. Sua assinatura autoriza a transferência, os solvers entregam o ZEC no lado Zcash, e a NEAR Intents pode reter fundos para análise de compliance. Em 2026, um detentor de Zcash [relatou uma conversão grande retida por semanas](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). Você também conecta sua carteira a dois sites, então confira a barra de endereço toda vez.
- **Carteiras com NEAR Intents integrado** (procure o recurso NEAR Intents no [diretório](/wallets)) usam o mesmo sistema de dentro da carteira Zcash. A confiança é a mesma, com menos sites. Não testamos isso com ZEC na Solana.
- **Uma corretora**, mas só se ela aceitar depósitos deste token na rede Solana, o que a maioria não faz. Você entrega a custódia e geralmente sua identidade, e muitas corretoras só enviam ZEC para endereços `t1`. Veja [corretoras custodiantes](/using-zcash/custodial-exchanges).

---

## Blinde e confira

Ele chegou blindado. Nosso ZEC foi para um endereço `u1` e caiu direto na pool blindada Ironwood. Não houve etapa transparente nem nada para blindar manualmente. A carteira o mostrou como **Receiving…** com um ícone de escudo às 16:07 (UTC+1) enquanto acumulava confirmações.

![Atividade da carteira Zcash mostrando Recebendo 0.00241336 ZEC com um ícone de escudo](/content-images/12-zodl-receiving-cb9f41511d.webp)

Para conferir você mesmo, abra a transação na sua carteira e copie o ID da transação.

![Detalhes da transação na carteira Zcash com o ID da transação e o registro de data e hora](/content-images/13-zodl-tx-details-b08434d680.webp)

Cole no [explorador de blocos do Zcash](https://mainnet.zcashexplorer.app). Não se confunda com o resumo. O nosso mostra **Shielded Inputs / Outputs 0 / 0** e **Transferred from/to shielded pool 0.0 ZEC**, porque o resumo do explorador ainda não conta Ironwood. Os endereços `t1` que você vê são do lado do envio (o ZEC que foi gasto e o troco que ficou), não os seus.

![Resumo do explorador para a transação: duas entradas transparentes, uma saída transparente, 0/0 blindado](/content-images/14-explorer-summary-6153afb265.webp)

Clique em **Raw TX: JSON** e procure `ironwood`. Um `valueBalance` negativo ali é ZEC entrando na pool Ironwood. O nosso foi `-0.00241336`, exatamente o que chegou, e nada na transação mostra quem o recebeu.

![JSON da transação bruta com a seção ironwood destacada: valueBalance -0.00241336 (destaque adicionado)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see) explica os demais campos.

### Se você colar um endereço `t1`

Não enviamos para um, mas o resultado é previsível. O ZEC chega ao saldo transparente da sua carteira, e o explorador mostra seu endereço `t1` e o valor para qualquer pessoa, permanentemente. Uma carteira com blindagem automática então o move para a pool blindada. Caso contrário, toque em **Shield**, o que custa uma pequena taxa de rede. A transação de blindagem também é pública, já que gasta a partir do seu endereço `t1`. Nada se perde, mas o vínculo entre aquele depósito e sua carteira fica na chain. Cole o `u1`.

---

## Mantenha-se seguro

Novos detentores viram alvo. Quase todo golpe que você vai ver é um destes:

- **Tipo de endereço errado.** Um endereço Zcash começa com `u1`, `t1`, `zs` ou `tex1`. Um endereço Solana não tem nenhum desses prefixos. Nunca envie ZEC nativo para um endereço Solana e nunca envie o token Solana para um endereço Zcash.
- **Serviços só transparentes.** Algumas pontes, sites de conversão e corretoras só conseguem enviar para endereços `t1`. Isso funciona se você blindar o ZEC assim que ele chegar. Só não o deixe lá.
- **Carteiras falsas.** Instale apenas pelo link do card no [diretório de carteiras](/wallets) ou pela página oficial na loja de apps para onde ele aponta. Apps falsos de carteira cripto às vezes entram nas lojas de apps, e eles parecem exatamente com os verdadeiros.
- **Phishing de frase semente.** Nenhuma carteira, ponte, site de conversão, atendente de suporte, moderador ou airdrop precisa da sua frase semente. Assinar uma mensagem nunca envolve digitá-la. Quem pedir está tentando roubar você. [Recuperação de fundos](/using-zcash/recovering-funds) fala da versão "vamos recuperar sua carteira" desse golpe.
- **Tokens golpistas e sites de "claim".** Tokens chamados ZEC, Zcash ou algo parecido aparecem sem pedido em carteiras Solana, muitas vezes com um link para "resgatar" mais. Conectar sua carteira a esse link pode esvaziá-la. Confira o endereço do contrato do início desta página e ignore todo o resto.
- **Pedidos de assinatura maliciosos.** Um pedido "Sign Message" pode mover seu saldo NEAR Intents sem nenhuma taxa em SOL. Só assine no `near.com` ou no `solswap.org`, e só quando a mensagem citar `intents.near` (a etapa 5 acima mostra o que conferir).
- **Sites falsos.** Digite `solswap.org` e `near.com` você mesmo ou use favoritos. Não siga links de DMs, respostas ou anúncios.

---

## Erros comuns

- **Usar o botão Swap da Phantom** em vez do fluxo de depósito. Você já tem o token, e fazer swap só troca um ZEC de papel por outro token, sem aproximar você do ZEC nativo.
- **Colar um endereço `t1`**, ou um `u1` que esconde um receptor transparente, quando sua carteira oferece um `u1` só blindado. O depósito chega público e o vincula à sua carteira permanentemente.
- **Achar que os fundos estão presos** quando a página Withdraw do solswap mostra "–". O saldo acompanha sua chave Phantom, não o site. Termine o saque no near.com.
- **Assinar uma mensagem sem conferir.** Um site falso pode esvaziar seu saldo NEAR Intents com uma única assinatura. O site precisa ser `near.com` e a mensagem precisa conter `"verifying_contract": "intents.near"`.
- **Confundir os dois tickers "ZEC".** O token Solana e o ZEC Zcash nativo têm o mesmo nome, mas não a mesma rede. Enviar qualquer um deles para a outra chain faz você perdê-lo.

## O que fazer com ZEC blindado

- Mantenha a privacidade quando gastar: [Usando ZEC com privacidade](/guides/using-zec-privately)
- Encontre lugares que aceitam: [Onde gastar ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Envie com uma mensagem privada anexada: [Memorandos](/using-zcash/memos)
- Pague alguém sem vincular sua identidade: [Enviar dinheiro sem vincular a identidade](/zcash-use-cases/send-money-without-linking-identity)

---

## Páginas relacionadas

- [Como fazer swap para ZEC na Phantom Wallet](/using-zcash/solswap): as telas do solswap com mais detalhes
- [Pools blindadas](/using-zcash/shielded-pools): o que são as pools Ironwood/Orchard e como os receptores funcionam
- [Quem pode ver seu pagamento em Zcash?](/start-here/who-can-see-your-zcash-payment): o que a blindagem realmente oculta
- [Carteiras](/wallets): o diretório. Confira a etiqueta **Ironwood: Ready**
- [Corretoras custodiantes](/using-zcash/custodial-exchanges): a desvantagem que este caminho evita
- [Recuperação de fundos](/using-zcash/recovering-funds): o que guardar com segurança para nunca perder o acesso
