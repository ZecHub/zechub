<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Tem ZEC na Solana? Mova-o para o Zcash blindado

Esta página é para você se o ZEC apareceu na sua carteira Solana porque você possui ZCAT ou outro token Solana que paga seus detentores em ZEC. Você não precisa vender nada para fazer isso. Você moverá o ZEC que já tem da Solana para uma carteira Zcash e ficará com ele blindado.

Executamos todos os passos abaixo com uma transferência real em 27 de setembro de 2026, começando com 0.00266336 ZEC na Phantom. As taxas, os tempos e as telas nesta página são os que observamos.

---

## TL;DR

- O ZEC na sua carteira Solana é um **token Solana** (mint `A7bd…QXaS`) garantido 1:1 por ZEC reais que a NEAR OmniBridge mantém na chain do Zcash — "ZEC de papel" que existe no registro público da Solana e não pode ser blindado lá.
- O processo tem duas etapas: **deposite** o token em solswap.org (NEAR Intents) e depois **retire-o** em near.com para o endereço `u1` blindado da sua carteira. Não use o botão Swap da própria Phantom — ele não vai ajudar você.
- Use uma carteira que o [diretório do ZecHub](/wallets) marque como **Ironwood: Ready** e mantenha um pouco de SOL na Phantom para a taxa da Solana.
- Nosso teste real (27 de setembro de 2026, 0.00266336 ZEC): o depósito chegou em 9 segundos, a retirada levou cerca de 8 minutos e o custo total foi de ~0.00025 ZEC + 0.0016 SOL.
- Linha de segurança: assine solicitações de mensagem apenas em `near.com`/`solswap.org` com `intents.near` na mensagem, nunca digite sua frase semente e cole um `u1`, nunca um `t1`.

## Analogia visual

O ZEC na Solana funciona como uma **ficha de cassino**. Ele vale como dinheiro, e o cassino — a NEAR OmniBridge — promete cédulas reais (ZEC nativo) a qualquer pessoa que devolver a ficha. Mas a ficha é apenas uma linha no registro do cassino: todos podem ver quem a possui, e seu valor depende de os sistemas do cassino continuarem sólidos. Retirar pelo near.com é como ir ao caixa e trocar a ficha por dinheiro. Quando as cédulas estão em um pool blindado, elas ficam na sua própria carteira opaca — ninguém mais consegue ver o valor ou o detentor.

---

## O que você realmente possui

O ZEC na sua carteira Solana é um token na Solana, não moedas na rede Zcash. A NEAR OmniBridge o emite e mantém ZEC reais na chain do Zcash para garanti-lo; a ponte está ativa na Solana desde outubro de 2025. Sua parte na Solana funciona com mensagens Wormhole e NEAR Chain Signatures, não com um light client do Zcash, portanto o lado da Solana é tão sólido quanto esses dois sistemas. As pessoas o chamam de "ZEC de papel". Ele acompanha o preço do ZEC, mas todos os saldos e todas as transferências ficam no registro público da Solana sob o endereço da sua carteira e não podem ser blindados enquanto permanecerem lá.

Confirme que o seu é o token verdadeiro. Na Phantom, toque em **ZEC** e role até **Sobre o Zcash**. O endereço do contrato deve ser:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Painel About Zcash do Phantom mostrando o endereço do contrato A7bd…QXaS na rede Solana](/content-images/01-phantom-zec-mint-4a718bc213.webp)

A Phantom o encurta para `A7bd…QXaS`, então compare os primeiros e os últimos caracteres ou procure o endereço completo no [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS). Qualquer outro token "ZEC" na sua carteira, independentemente do nome ou logotipo, não é este. Deixe-o em paz.

---

## Por que movê-lo

O ZEC blindado é o propósito do Zcash. Quando seu ZEC está em um pool blindado, o remetente, o destinatário e o valor de cada pagamento são criptografados na chain do Zcash. Ninguém navegando em um explorador consegue ver seu saldo.

Você já possui ZEC. Movê-lo para uma carteira Zcash dá a você a parte que o torna Zcash e tira a ponte da equação: o ZEC nativo na sua própria carteira não depende de ninguém honrar um resgate.

[Quem consegue ver seu pagamento em Zcash?](/start-here/who-can-see-your-zcash-payment) explica exatamente o que permanece oculto.

---

## Escolha uma carteira Zcash

O ZecHub não escolhe uma para você. Escolha no [diretório de carteiras do ZecHub](/wallets) e verifique dois rótulos no cartão da carteira antes de instalá-la:

- **Ironwood: Ready.** Ironwood é o pool para onde vai o novo ZEC blindado desde a atualização [Ironwood](/zcash-tech/ironwood), em 28 de julho de 2026. O pool Orchard mais antigo não aceita mais novos fundos.
- **Blindagem automática.** Útil se um pagamento chegar transparente: a carteira move esse ZEC para o pool blindado para você. Não trate esse rótulo como substituto de **Ironwood: Ready**. Uma carteira pode ter Blindagem automática e ainda não ter um pool Ironwood (a Edge está nesse estado no diretório hoje). A maioria das outras carteiras mostra um botão **Blindar**.

Instale a carteira pelo link no cartão dela no diretório, não por um resultado de busca ou anúncio. Escreva a frase semente em papel e mantenha-a offline.

Sua carteira mostra dois tipos de endereço:

![Tela de recebimento de uma carteira Zcash com um endereço blindado começando com u1 e um endereço transparente começando com t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| Começa com | Tipo | O que o público vê |
|---|---|---|
| `u1` | Unified Address | Nada sobre você, mas somente quando o pagamento chega a um pool blindado |
| `t1` | Endereço transparente | Seu endereço e o valor, para sempre, como na Solana |

Use um `u1` que sua carteira identifica como blindado. Um `u1` é um conjunto de receptores, e algumas carteiras incluem nele um receptor transparente ao lado do blindado. Um remetente que só pode pagar para endereços transparentes usará esse, e seu pagamento chegará publicamente mesmo que você tenha colado um `u1`. O endereço blindado da nossa carteira de teste não tem receptor transparente, então isso não poderia acontecer. [Pools blindados](/using-zcash/shielded-pools) aborda os receptores com mais detalhes. Algumas carteiras mostram um novo `u1` sempre que você abre Receber; isso é normal, e todos pertencem a você. A captura de tela de recebimento e o campo de destinatário no near.com nesta página usam prefixos `u1` diferentes por esse motivo.

Usamos a ZODL no nosso teste porque era a carteira que já tínhamos configurado. Apenas as carteiras que o diretório marca como **Ironwood: Ready** podem receber novo valor blindado.

---

## Mova-o

O processo tem duas partes: coloque seu ZEC em NEAR Intents pela Phantom e depois envie-o para seu endereço Zcash. Usamos [solswap.org](https://solswap.org), um site criado pela NEAR para usuários da Solana, na primeira parte, e [near.com](https://near.com), o próprio app da NEAR, na segunda. O guia do ZecHub, [Como fazer swap por ZEC na Phantom Wallet](/using-zcash/solswap), aborda as telas do solswap com mais detalhes. Não use o botão **Swap** da própria Phantom para isso: você já possui o token, e fazer swap dele não leva você a lugar nenhum.

Mantenha um pouco de SOL na Phantom para a taxa da Solana.

### 1. Deposite seu ZEC no solswap.org

1. Abra a Phantom, vá para a aba do navegador, digite `solswap.org` você mesmo e conecte sua carteira.
2. Toque em **Deposit**. Defina **Asset** como **Zcash**, **Network** como **Solana** e o método como **Wallet**.
3. Insira o valor (ou toque em **Max**) e aprove a transação na Phantom.

![Tela Deposit do solswap com Zcash como o ativo, Solana como a rede e Wallet como o método](/content-images/03-solswap-deposit-425691e62f.webp)

Nosso depósito chegou ao bloco da Solana às 15:09:08 (UTC+1), e o solswap o mostrou como **Completed** nove segundos depois.

![Histórico de depósitos do solswap mostrando Completed, +0,0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

Seu ZEC agora está no seu saldo do NEAR Intents. Sua chave da Phantom autoriza cada saída dele, os solvers do NEAR Intents realizam a entrega, e o NEAR Intents pode reter um saldo para análise de conformidade (veja as notas de confiança abaixo).

### 2. Envie-o para seu endereço Zcash no near.com

O solswap também tem uma página **Withdraw**, mas ela não funcionou para nós. O **Received amount** e a **Fee** permaneceram em "–", e o botão não fez nada, independentemente de escolhermos Zcash ou Solana como rede.

![Formulário Withdraw do solswap com o valor recebido e a taxa travados em um traço](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

Se isso acontecer com você, seu ZEC não está preso. O saldo está vinculado à chave da sua carteira, não ao site, então qualquer app do NEAR Intents no qual você entrar com essa carteira pode acessá-lo. Terminamos no near.com:

1. Vá para `near.com` e entre com a mesma carteira Phantom.
2. Seu saldo do solswap aparece em **Move legacy assets** (o near.com chama os saldos de apps mais antigos do NEAR Intents de "legacy"). Toque em **Withdraw** na linha do ZEC. Você não precisa de **Move**.

![Página Move legacy assets do near.com listando 0,0026 ZEC com os botões Move e Withdraw](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. Defina **Network** como **Zcash**, cole o endereço `u1` da sua carteira como **Recipient** e confira os primeiros e os últimos seis caracteres com sua carteira.

![Formulário Withdraw legacy asset do near.com com Zcash como a rede e um destinatário u1, recebimento de pelo menos 0,00233164 ZEC, cerca de 2 minutos](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. Toque em **Review withdrawal**, leia o resumo e toque em **Send**.

![Tela Review send do near.com: rede Zcash, destinatário recebe pelo menos 0,00233164 ZEC, taxa de 0 ZEC, você paga 0,00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. A Phantom pede que você **Sign Message** para o near.com. Essa assinatura é o que autoriza o NEAR Intents a mover seu saldo. Ela não custa SOL, mas isso não a torna inofensiva: um site imitador pode mostrar a mesma solicitação e esvaziar seu saldo do NEAR Intents com ela. Antes de tocar em **Confirm**, confira todos estes itens e toque em **Cancel** se algum falhar:
   - O site indicado na solicitação é `near.com`. (O depósito na etapa 1 era uma solicitação comum de transação da Phantom vinda de `solswap.org`; confira esse nome da mesma forma.)
   - Abra **Message** e encontre `"verifying_contract": "intents.near"`.
   - A mensagem é um texto legível, como na captura de tela. Se for um bloco ilegível, ou se o site não corresponder ao da sua barra de endereços, rejeite-a.
   - Ela nunca pede sua frase semente. Assinar nunca envolve digitá-la.

![Solicitação Sign Message do Phantom em near.com na rede Solana](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. O near.com mostra **Processing send**, **Sending** e **Complete**. **View on explorer** abre o registro da transferência no NEAR Intents.

![Tela de status do near.com: Sending 0,0023 ZEC, todas as três etapas concluídas](/content-images/10-nearcom-complete-c641093c46.webp)

![Registro do explorador de NEAR Intents: criado às 3:59:28 PM, sacado para o endereço u1 às 4:07:55 PM, com o ID da transação de saque de Zcash](/content-images/11-intents-explorer-f93f87814e.webp)

### Quanto custou nosso teste e quanto tempo levou

| | Nosso teste |
|---|---|
| ZEC depositado pela Phantom | 0.00266336 ZEC |
| ZEC recebido na carteira Zcash | 0.00241336 ZEC, blindado |
| Custo no lado do ZEC | 0.00025 ZEC (o near.com mostrou "Fee 0 ZEC"; o custo está embutido na cotação) |
| SOL gasto no depósito | 0.00156844 SOL, dos quais 0.00008 SOL foram a taxa de rede |
| Mínimo | Nenhum atingido. O solswap listava um depósito mínimo de 0.00000001 ZEC, e o near.com aceitou 0.0026 ZEC |
| Depósito, da Phantom para o solswap | 9 segundos |
| Retirada, da assinatura no near.com ao ZEC na carteira Zcash | Cerca de 8 minutos (o near.com estimou cerca de 2) |

Registros: depósito na Solana [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) no bloco 3,498,141. As taxas e os tempos mudam conforme a carga da rede, então a tela de revisão é a palavra final quando você fizer isso.

A ponte da NEAR publica um mínimo de 0.01 ZEC e uma taxa de 0.00047 ZEC para suas retiradas padrão de Zcash. O near.com não aplicou nenhum dos dois ao nosso 0.0026 ZEC. Se um app recusar um valor pequeno, tente o near.com antes de fazer uma recarga.

### Outras rotas e no que cada uma confia

Todas as rotas que saem da Solana confiam na OmniBridge, porque a ponte mantém o ZEC que garante seu token. Além disso:

- **A rota acima** confia no NEAR Intents. Sua assinatura autoriza a transferência, os solvers entregam o ZEC no lado do Zcash, e o NEAR Intents pode reter fundos para análise de conformidade; em 2026, um detentor de Zcash [relatou uma grande conversão retida por semanas](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). Você também conecta sua carteira a dois sites, então confira a barra de endereços sempre.
- **Carteiras com NEAR Intents integrado** (procure o recurso NEAR Intents no [diretório](/wallets)) usam o mesmo sistema de dentro da carteira Zcash. A mesma confiança, menos sites. Não testamos isso com ZEC na Solana.
- **Uma corretora**, somente se aceitar depósitos desse token na rede Solana, o que a maioria não faz. Você entrega a custódia e normalmente sua identidade, e muitas corretoras enviam ZEC apenas para endereços `t1`. Veja [corretoras custodiantes](/using-zcash/custodial-exchanges).

---

## Blinde-o e confirme

Ele chegou blindado. Nosso ZEC foi para um endereço `u1` e chegou direto ao pool blindado Ironwood. Não houve etapa transparente nem nada para blindar manualmente. A carteira o listou como **Receiving…** com um ícone de blindagem às 16:07 (UTC+1), enquanto coletava confirmações.

![Atividade da carteira do Zcash mostrando o recebimento de 0,00241336 ZEC com um ícone de escudo](/content-images/12-zodl-receiving-cb9f41511d.webp)

Para conferir você mesmo, abra a transação na sua carteira e copie o ID da transação.

![Detalhes da transação da carteira do Zcash com o ID da transação e o registro de data e hora](/content-images/13-zodl-tx-details-b08434d680.webp)

Cole-o no [explorador de blocos do Zcash](https://mainnet.zcashexplorer.app). Não se confunda com o resumo. O nosso mostra **Shielded Inputs / Outputs 0 / 0** e **Transferred from/to shielded pool 0.0 ZEC**, porque o resumo do explorador ainda não contabiliza o Ironwood. Os endereços `t1` que você vê estão no lado de envio (o ZEC que ele gastou e o troco que reteve), não no seu.

![Resumo do explorador para a transação: duas entradas transparentes, uma saída transparente, 0/0 blindadas](/content-images/14-explorer-summary-6153afb265.webp)

Clique em **Raw TX: JSON** e procure por `ironwood`. Um `valueBalance` negativo ali significa que ZEC está entrando no pool Ironwood. O nosso foi `-0.00241336`, exatamente o que chegou, e nada na transação mostra quem o recebeu.

![JSON bruto da transação com a seção ironwood destacada: valueBalance -0.00241336, destaque adicionado](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[O que um explorador de blocos consegue ver](/zcash-tech/what-a-block-explorer-can-see) explica os demais campos.

### Se você colar um endereço `t1`

Não enviamos para um, mas o resultado é previsível. O ZEC chega ao saldo transparente da sua carteira, e o explorador mostra seu endereço `t1` e o valor para qualquer pessoa, permanentemente. Uma carteira com blindagem automática então o move para o pool blindado; caso contrário, toque em **Shield**, o que custa uma pequena taxa de rede. A transação de blindagem também é pública, pois ela gasta a partir do seu endereço `t1`. Nada se perde, mas a ligação entre esse depósito e sua carteira permanece na chain. Cole o `u1`.

---

## Mantenha-se seguro

Novos detentores são alvos. Quase todos os golpes que você verá são um destes:

- **Tipo de endereço errado.** Um endereço Zcash começa com `u1`, `t1`, `zs` ou `tex1`. Um endereço Solana não tem nenhum desses prefixos. Nunca envie ZEC nativo para um endereço Solana e nunca envie o token Solana para um endereço Zcash.
- **Serviços somente transparentes.** Algumas pontes, sites de conversão e corretoras só podem enviar para endereços `t1`. Isso funciona se você blindar o ZEC assim que ele chegar. Só não o deixe lá.
- **Carteiras falsas.** Instale somente pelo link no cartão do [diretório de carteiras](/wallets) ou pela listagem oficial da loja de apps para a qual ele aponta. Apps falsos de carteiras de criptomoedas conseguem entrar nas lojas de apps e parecem exatamente com os verdadeiros.
- **Phishing de frase semente.** Nenhuma carteira, ponte, site de conversão, agente de suporte, moderador ou airdrop precisa da sua frase semente. Assinar uma mensagem nunca envolve digitá-la. Quem a pedir está tentando roubar você. [Recuperação de fundos](/using-zcash/recovering-funds) aborda a versão desse golpe de "vamos recuperar sua carteira".
- **Tokens fraudulentos e sites de "resgate".** Tokens chamados ZEC, Zcash ou algo parecido aparecem em carteiras Solana sem solicitação, geralmente com um link para "resgatar" mais. Conectar sua carteira a esse link pode esvaziá-la. Confira o endereço do contrato no topo desta página e ignore todo o resto.
- **Solicitações de assinatura maliciosas.** Uma solicitação de "Sign Message" pode mover seu saldo do NEAR Intents sem nenhuma taxa de SOL. Assine apenas em `near.com` ou `solswap.org` e apenas quando a mensagem indicar `intents.near` (a etapa 5 acima mostra o que conferir).
- **Sites imitadores.** Digite `solswap.org` e `near.com` você mesmo ou use favoritos. Não siga links de DMs, respostas ou anúncios.

---

## Erros comuns

- **Usar o botão Swap da Phantom** em vez do fluxo de depósito. Você já possui o token — fazer swap apenas troca um ZEC de papel por outro token e não aproxima você do ZEC nativo.
- **Colar um endereço `t1`**, ou um `u1` que oculta um receptor transparente, quando sua carteira oferece um `u1` apenas blindado. O depósito chega publicamente e fica vinculado permanentemente à sua carteira.
- **Presumir que os fundos estão presos** quando a página Withdraw do solswap mostra "–". O saldo acompanha sua chave da Phantom, não o site — conclua a retirada no near.com.
- **Assinar uma mensagem sem verificá-la.** Um site imitador pode esvaziar seu saldo do NEAR Intents com uma única assinatura. O site deve ser `near.com` e a mensagem deve conter `"verifying_contract": "intents.near"`.
- **Confundir os dois tickers "ZEC".** O token Solana e o ZEC nativo do Zcash compartilham um nome, mas não uma rede — enviar qualquer um para a outra chain resulta em sua perda.

## O que fazer com ZEC blindado

- Mantenha-o privado quando o gastar: [Usando ZEC de forma privada](/guides/using-zec-privately)
- Encontre lugares que o aceitam: [Lugares para gastar ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Envie-o com uma mensagem privada anexada: [Memorandos](/using-zcash/memos)
- Pague alguém sem associar sua identidade: [Enviar dinheiro sem associar a identidade](/zcash-use-cases/send-money-without-linking-identity)

---

## Páginas relacionadas

- [Como converter para ZEC na carteira Phantom](/using-zcash/solswap) — as telas do solswap em mais detalhes
- [Pools blindados](/using-zcash/shielded-pools) — o que são os pools Ironwood/Orchard e como os destinatários funcionam
- [Quem pode ver seu pagamento em Zcash?](/start-here/who-can-see-your-zcash-payment) — o que a blindagem realmente oculta
- [Carteiras](/wallets) — o diretório; verifique a etiqueta **Ironwood: Pronta**
- [Corretoras custodiantes](/using-zcash/custodial-exchanges) — a contrapartida que essa opção evita
- [Recuperando fundos](/using-zcash/recovering-funds) — o que você deve manter em segurança para nunca perder o acesso
