<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Quem pode ver seu pagamento Zcash?

## TL;DR

- O Zcash oferece **dois tipos de endereço**: transparente (`t`) e blindado (`z` ou `u`).
- O quanto o público vê depende dos tipos de endereço entre os quais o seu pagamento se move.
- Somente um pagamento **de blindado para blindado** oculta o remetente, o destinatário e o valor.
- Um endereço blindado não é uma única chave. É um pequeno conjunto de chaves, e você pode conceder **acesso somente leitura sem entregar a capacidade de gastar**.
- Uma chave de visualização **não pode ser revogada** depois que você a compartilha.

---

## A primeira coisa a entender

Na maioria das blockchains, não há escolha a fazer. Tudo o que você envia é público, para sempre, para qualquer pessoa que olhe.

O Zcash, em vez disso, dá a você uma escolha. Essa escolha é feita duas vezes: **uma quando você escolhe para qual endereço enviar, e outra quando você decide quem recebe uma chave para ler o seu histórico.**

A imagem abaixo cobre as duas.

![Tipos de chave do Zcash e o que um explorador de blocos consegue ver em cada um dos quatro caminhos de transação](/content-images/who-can-see-your-zcash-payment-04d41ac960.webp)

---

## Primeira escolha: qual endereço

Todo pagamento no Zcash se move entre dois endereços, e cada um pode ser transparente ou blindado. Isso resulta em quatro caminhos, e cada um expõe uma quantidade diferente de informação.

O padrão é mais simples do que parece: **tudo o que toca um endereço transparente se torna público.** Um pagamento que permanece dentro do pool blindado durante todo o percurso não revela nada além da taxa.

Isso importa principalmente quando você faz um saque de uma corretora. Muitas corretoras só enviam para endereços transparentes, então o saque é público. Blinde os fundos você mesmo assim que eles chegarem, antes de gastá-los.

Para uma visão mais aprofundada do que exatamente um explorador lê, veja [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see).

---

## Segunda escolha: quem recebe uma chave

Uma privacidade que você nunca pode suspender não é útil. Às vezes você precisa provar algo a um contador, um auditor ou a uma repartição fiscal. O Zcash resolve isso sem exigir que você abra mão do controle.

**Chave de gastos.** Vê tudo e movimenta fundos. Ela é o dinheiro. Fica com você e nunca é compartilhada com ninguém, por nenhum motivo.

**Full Viewing Key.** Somente leitura. Mostra a atividade de entrada e saída e os saldos, mas não pode gastar um único zatoshi. É isso que você entrega a um auditor ou contador.

**Incoming Viewing Key.** Ainda mais restrita: mostra apenas os pagamentos recebidos. Uma corretora ou um comerciante pode usá-la para confirmar que o seu depósito chegou, enquanto a chave de gastos permanece em um hardware que nunca se conecta à internet.

A ordem importa. Entregue a chave mais restrita que cumpra a tarefa, não a mais ampla que você tiver em mãos.

---

## A parte que os iniciantes não percebem

**Uma chave de visualização não pode ser revogada.** Não existe um botão de "desfazer compartilhamento". Depois que alguém a tem, essa pessoa pode ler aquele endereço enquanto ele existir. Se você precisar cortar o acesso, transfira seus fundos para um novo endereço.

**As taxas são públicas mesmo em um pagamento totalmente blindado.** O valor fica oculto; a taxa, não.

**O que é público é permanente.** Tudo o que a chain mostra hoje, ela mostrará daqui a vinte anos. Decidir blindar um pagamento *depois* de enviá-lo não é algo que você possa fazer.

---

## Coloque em prática

- Use uma carteira que blinda por padrão, como [ZODL](https://zodl.com) ou [Zingo!](https://www.zingolabs.org/).
- Blinde os fundos assim que chegarem de uma corretora, antes de gastá-los.
- Pague para endereços blindados sempre que o destinatário tiver um.
- Antes de compartilhar uma chave de visualização, pergunte-se qual é a menor chave que responde à pergunta que está sendo feita.

---

## Recursos

- [Explicando as chaves de visualização (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [Divulgação seletiva e chaves de visualização (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: Chaves de visualização](https://zips.z.cash/zip-0310)
- [Como funciona a tecnologia Zcash](https://z.cash/technology/)

## Páginas relacionadas

- [Noções básicas do Zcash](/start-here/what-is-zec-and-zcash)
- [Guia do novo usuário do Zcash](/start-here/new-user-guide)
- [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see)
- [Chaves de visualização](/zcash-tech/viewing-keys)
- [Transações](/using-zcash/transactions)

---

*Se você quiser adicionar ou sugerir edições a esta página da wiki, acesse o [repositório ZecHub GitHub](https://github.com/ZecHub/zechub) e envie um pull request.*
