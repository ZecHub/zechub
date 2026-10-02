<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Tem ZEC na Solana? Mova-o para Zcash blindado

Esta página é para si se ZEC apareceu na sua wallet Solana porque possui ZCAT, ou outro token Solana que paga aos seus detentores em ZEC. Não precisa de vender nada para o fazer. Vai mover o ZEC que já tem da Solana para uma wallet Zcash e acabará por tê-lo blindado.

Executámos todos os passos abaixo com uma transferência real em 27 de setembro de 2026, começando com 0.00266336 ZEC em Phantom. As taxas, os tempos e os ecrãs nesta página são os que observámos.

---

## O que realmente possui

O ZEC na sua wallet Solana é um token na Solana, não moedas na rede Zcash. O NEAR OmniBridge emite-o e mantém ZEC reais na cadeia Zcash para o respaldar; a bridge está ativa na Solana desde outubro de 2025. A sua parte na Solana funciona com mensagens Wormhole e NEAR Chain Signatures, não com um cliente leve Zcash, pelo que o lado da Solana é apenas tão sólido quanto esses dois sistemas. As pessoas chamam-lhe "ZEC de papel". Acompanha o preço de ZEC, mas todos os saldos e todas as transferências ficam no livro-razão público da Solana sob o endereço da sua wallet, e não pode ser blindado enquanto permanecer lá.

Confirme que o seu é o token real. Em Phantom, toque em **ZEC** e desloque-se até **Sobre Zcash**. O endereço do contrato tem de ser:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/01-phantom-zec-mint.png)

Phantom encurta-o para `A7bd…QXaS`, por isso compare os primeiros e os últimos carateres, ou procure o endereço completo em [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS). Qualquer outro token "ZEC" na sua wallet, independentemente do nome ou logótipo, não é este. Deixe-o em paz.

---

## Porquê movê-lo

ZEC blindado é o objetivo de Zcash. Quando o seu ZEC está numa pool blindada, o remetente, o destinatário e o montante de cada pagamento são encriptados na cadeia Zcash. Ninguém que navegue num explorador consegue ver o seu saldo.

Já possui ZEC. Movê-lo para uma wallet Zcash dá-lhe a componente que o torna Zcash, e remove a bridge da equação: o ZEC nativo na sua própria wallet não depende de alguém honrar um resgate.

[Quem consegue ver o seu pagamento em Zcash?](/start-here/who-can-see-your-zcash-payment) explica exatamente o que permanece oculto.

---

## Escolha uma wallet Zcash

ZecHub não escolhe uma por si. Escolha no diretório de wallets [ZecHub](/wallets) e verifique dois rótulos no cartão da wallet antes de a instalar:

- **Ironwood: Pronta.** Ironwood é a pool onde entra o novo ZEC blindado desde a atualização [Ironwood](/zcash-tech/ironwood) em 28 de julho de 2026. A pool Orchard mais antiga já não aceita novos fundos.
- **Blindagem automática.** Útil se um pagamento chegar de forma transparente: a wallet move esse ZEC para a pool blindada por si. Não trate este rótulo como substituto de **Ironwood: Pronta**. Uma wallet pode ter Blindagem automática e ainda assim não ter uma pool Ironwood (a Edge encontra-se nesse estado no diretório atualmente). A maioria das outras wallets mostra antes um botão **Blindar**.

Instale a wallet a partir da ligação no cartão do diretório, não de um resultado de pesquisa nem de um anúncio. Escreva a frase-semente em papel e mantenha-a offline.

A sua wallet mostra dois tipos de endereço:

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/02-zodl-receive.png)

| Começa por | Tipo | O que o público vê |
|---|---|---|
| `u1` | Unified Address | Nada sobre si, mas apenas quando o pagamento chega a uma pool blindada |
| `t1` | Endereço transparente | O seu endereço e o montante, para sempre, como na Solana |

Utilize um `u1` que a sua wallet identifique como blindado. Um `u1` é um conjunto de recetores, e algumas wallets incluem nele um recetor transparente ao lado do blindado. Um remetente que só possa pagar para endereços transparentes usará esse, e o seu pagamento chegará de forma pública, mesmo que tenha colado um `u1`. O endereço blindado da nossa wallet de teste não tem recetor transparente, por isso isso não podia acontecer. [Pools blindadas](/using-zcash/shielded-pools) aborda os recetores com mais detalhe. Algumas wallets mostram um novo `u1` sempre que abre Receber; isso é normal, e todos lhe pertencem. A captura de ecrã de receção e o campo de destinatário near.com nesta página usam prefixos `u1` diferentes por esse motivo.

Usámos ZODL no nosso teste porque era a wallet que já tínhamos configurado. Apenas as wallets que o diretório assinala como **Ironwood: Pronta** podem receber novo valor blindado.

---

## Mova-o

A rota tem duas partes: colocar o seu ZEC em NEAR Intents a partir de Phantom e, depois, enviá-lo para o seu endereço Zcash. Usámos [solswap.org](https://solswap.org), um site criado pela NEAR para utilizadores da Solana, para a primeira parte, e [near.com](https://near.com), a aplicação da própria NEAR, para a segunda. O guia de ZecHub, [Como trocar por ZEC na Wallet Phantom](/using-zcash/solswap), aborda os ecrãs do solswap com mais detalhe. Não utilize o botão **Trocar** da própria Phantom para isto: já possui o token, e trocá-lo não o leva a lado nenhum.

Mantenha algum SOL em Phantom para a taxa da Solana.

### 1. Deposite o seu ZEC em solswap.org

1. Abra Phantom, vá ao separador do navegador, escreva `solswap.org` manualmente e ligue a sua wallet.
2. Toque em **Depositar**. Defina **Ativo** como **Zcash**, **Rede** como **Solana** e o método como **Wallet**.
3. Introduza o montante (ou toque em **Máx.**) e aprove a transação em Phantom.

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/03-solswap-deposit.png)

O nosso depósito chegou ao bloco Solana às 15:09:08 (UTC+1), e o solswap apresentou-o como **Concluído** nove segundos depois.

![solswap deposit history showing Completed, +0.0026 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/04-solswap-deposit-complete.png)

O seu ZEC encontra-se agora no saldo de NEAR Intents. A sua chave Phantom autoriza todos os movimentos de saída, os resolvedores NEAR Intents efetuam a entrega, e NEAR Intents pode reter um saldo para análise de conformidade (consulte as notas de confiança abaixo).

### 2. Envie-o para o seu endereço Zcash em near.com

O solswap também tem uma página **Levantar**, mas não funcionou para nós. O **Montante recebido** e a **Taxa** mantiveram-se em "–", e o botão não fez nada, quer escolhêssemos Zcash quer Solana como rede.

![solswap Withdraw form with the received amount and fee stuck at a dash](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/05-solswap-withdraw-blank.png)

Se isso lhe acontecer, o seu ZEC não ficou bloqueado. O saldo está associado à chave da sua wallet, não ao site, pelo que qualquer aplicação NEAR Intents onde inicie sessão com essa wallet consegue aceder-lhe. Terminámos em near.com:

1. Vá a `near.com` e inicie sessão com a mesma wallet Phantom.
2. O seu saldo solswap aparece em **Mover ativos legados** (near.com chama "legados" aos saldos de aplicações NEAR Intents mais antigas). Toque em **Levantar** na linha ZEC. Não precisa de **Mover**.

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/06-nearcom-legacy-assets.png)

3. Defina **Rede** como **Zcash**, cole o endereço `u1` da sua wallet como **Destinatário** e compare os primeiros e os últimos seis carateres com a sua wallet.

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/07-nearcom-withdraw.png)

4. Toque em **Rever levantamento**, leia o resumo e toque em **Enviar**.

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/08-nearcom-review.png)

5. Phantom pede-lhe que **Assine a mensagem** para near.com. Esta assinatura é o que autoriza NEAR Intents a mover o seu saldo. Não custa SOL, mas isso não a torna inofensiva: um site imitador pode mostrar o mesmo pedido e esvaziar o seu saldo NEAR Intents com ele. Antes de tocar em **Confirmar**, verifique tudo isto e toque em **Cancelar** se alguma condição falhar:
   - O site indicado no pedido é `near.com`. (O depósito no passo 1 era um pedido comum de transação Phantom de `solswap.org`; verifique esse nome da mesma forma.)
   - Abra **Mensagem** e encontre `"verifying_contract": "intents.near"`.
   - A mensagem é texto legível, como na captura de ecrã. Se for um bloco ilegível, ou se o site não corresponder ao que está na barra de endereços, rejeite-a.
   - Nunca lhe pede a frase-semente. Assinar nunca envolve escrevê-la.

![Phantom Sign Message request from near.com on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/09-phantom-sign-message.png)

6. near.com mostra **A processar envio**, **A enviar** e **Concluído**. **Ver no explorador** abre o registo NEAR Intents da transferência.

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/10-nearcom-complete.png)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/11-intents-explorer.png)

### Quanto custou o nosso teste e quanto tempo demorou

| | O nosso teste |
|---|---|
| ZEC depositado a partir de Phantom | 0.00266336 ZEC |
| ZEC recebido na wallet Zcash | 0.00241336 ZEC, blindado |
| Custo no lado ZEC | 0.00025 ZEC (near.com mostrou "Taxa 0 ZEC"; o custo está incluído no preço da cotação) |
| SOL gasto no depósito | 0.00156844 SOL, dos quais 0.00008 SOL foram a taxa de rede |
| Mínimo | Nenhum atingido. solswap indicava um depósito mínimo de 0.00000001 ZEC, e near.com aceitou 0.0026 ZEC |
| Depósito, Phantom para solswap | 9 segundos |
| Levantamento, desde a assinatura em near.com até ZEC na wallet Zcash | Cerca de 8 minutos (near.com estimou cerca de 2) |

Registos: depósito Solana [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) no bloco 3,498,141. As taxas e os tempos mudam consoante a carga da rede, pelo que o ecrã de revisão é a palavra final quando o fizer.

A bridge da NEAR publica um mínimo de 0.01 ZEC e uma taxa de 0.00047 ZEC para os seus levantamentos Zcash padrão. near.com não aplicou nenhum dos dois ao nosso ZEC de 0.0026. Se uma aplicação recusar um montante pequeno, experimente near.com antes de adicionar fundos.

### Outras rotas e em que cada uma confia

Todas as rotas que saem da Solana confiam no OmniBridge, porque a bridge mantém o ZEC que respalda o seu token. Além disso:

- **A rota acima** confia em NEAR Intents. A sua assinatura autoriza a transferência, os resolvedores entregam o ZEC no lado Zcash, e NEAR Intents pode reter fundos para análise de conformidade; em 2026, um detentor de Zcash [relatou uma grande troca retida durante semanas](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). Também liga a sua wallet a dois sites, por isso verifique a barra de endereços sempre.
- **Wallets com NEAR Intents integrado** (procure a funcionalidade NEAR Intents no [diretório](/wallets)) usam o mesmo sistema a partir da wallet Zcash. A mesma confiança, menos sites. Não testámos isto com ZEC na Solana.
- **Uma exchange**, apenas se aceitar depósitos deste token na rede Solana, o que a maioria não faz. Entrega a custódia e, habitualmente, a sua identidade, e muitas exchanges apenas enviam ZEC para endereços `t1`. Consulte [exchanges com custódia](/using-zcash/custodial-exchanges).

---

## Blinde-o e confirme

Chegou blindado. O nosso ZEC foi para um endereço `u1` e chegou diretamente à pool blindada Ironwood. Não houve uma etapa transparente nem nada para blindar manualmente. A wallet listou-o como **A receber…** com um ícone de blindagem às 16:07 (UTC+1), enquanto recolhia confirmações.

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/12-zodl-receiving.png)

Para confirmar por si, abra a transação na sua wallet e copie o ID da transação.

![Zcash wallet transaction details with the transaction ID and timestamp](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/13-zodl-tx-details.png)

Cole-o em [o explorador de blocos Zcash](https://mainnet.zcashexplorer.app). Não se deixe confundir pelo resumo. O nosso diz **Entradas / saídas blindadas 0 / 0** e **Transferido da/para pool blindada 0.0 ZEC**, porque o resumo do explorador ainda não conta Ironwood. Os endereços `t1` que vê estão no lado de envio (o ZEC que gastou e o troco que reteve), não no seu.

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/14-explorer-summary.png)

Clique em **TX bruto: JSON** e procure `ironwood`. Um `valueBalance` negativo aí significa que ZEC está a entrar na pool Ironwood. O nosso foi `-0.00241336`, exatamente o que chegou, e nada na transação mostra quem o recebeu.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/15-explorer-raw-ironwood.png)

[O que um explorador de blocos consegue ver](/zcash-tech/what-a-block-explorer-can-see) explica os restantes campos.

### Se colar um endereço `t1`

Não enviámos para um, mas o resultado é previsível. O ZEC chega ao saldo transparente da sua wallet, e o explorador mostra o seu endereço `t1` e o montante a qualquer pessoa, permanentemente. Uma wallet com blindagem automática move-o depois para a pool blindada; caso contrário, toque em **Blindar**, o que custa uma pequena taxa de rede. A transação de blindagem também é pública, pois gasta a partir do seu endereço `t1`. Nada se perde, mas a ligação entre esse depósito e a sua wallet permanece na cadeia. Cole o `u1`.

---

## Mantenha-se seguro

Os novos detentores são visados. Quase todas as burlas que verá são uma destas:

- **Tipo de endereço errado.** Um endereço Zcash começa por `u1`, `t1`, `zs` ou `tex1`. Um endereço Solana não tem nenhum desses prefixos. Nunca envie ZEC nativo para um endereço Solana, nem envie o token Solana para um endereço Zcash.
- **Serviços apenas transparentes.** Algumas bridges, sites de troca e exchanges só podem enviar para endereços `t1`. Isso é viável se blindar o ZEC assim que chegar. Só não o deixe lá.
- **Wallets falsas.** Instale apenas a partir da ligação no cartão do [diretório de wallets](/wallets) ou da listagem oficial na loja de aplicações para a qual este aponta. Aplicações falsas de wallets de criptomoedas chegam a entrar nas lojas de aplicações e parecem exatamente reais.
- **Phishing de frase-semente.** Nenhuma wallet, bridge, site de troca, agente de apoio, moderador ou airdrop precisa alguma vez da sua frase-semente. Assinar uma mensagem nunca envolve escrevê-la. Quem a pedir está a tentar roubá-lo. [Recuperar fundos](/using-zcash/recovering-funds) aborda a versão desta burla de "vamos recuperar a sua wallet".
- **Tokens fraudulentos e sites de "reclamação".** Tokens chamados ZEC, Zcash ou algo semelhante aparecem em wallets Solana sem serem solicitados, muitas vezes com uma ligação para "reclamar" mais. Ligar a sua wallet a essa ligação pode esvaziá-la. Verifique o endereço do contrato no topo desta página e ignore tudo o resto.
- **Pedidos de assinatura maliciosos.** Um pedido de "Assinar mensagem" pode mover o seu saldo NEAR Intents sem qualquer taxa de SOL. Assine apenas em `near.com` ou `solswap.org`, e apenas quando a mensagem indicar `intents.near` (o passo 5 acima mostra o que verificar).
- **Sites imitadores.** Escreva `solswap.org` e `near.com` manualmente ou use marcadores. Não siga ligações de mensagens diretas, respostas ou anúncios.

---

## O que fazer com ZEC blindado

- Mantenha-o privado quando o gastar: [Utilizar ZEC de forma privada](/guides/using-zec-privately)
- Encontre locais que o aceitam: [Locais para gastar ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Envie-o com uma mensagem privada anexada: [Memorandos](/using-zcash/memos)
- Pague a alguém sem associar a sua identidade: [Enviar dinheiro sem associar a identidade](/zcash-use-cases/send-money-without-linking-identity)
