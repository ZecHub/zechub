<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Quem Pode Ver o Seu Pagamento Zcash?

## Resumo

- A Zcash dá-lhe **dois tipos de endereço**: transparentes (`t`) e blindados (`z` ou `u`).
- O quanto o público vê depende dos tipos entre os quais o seu pagamento se move.
- Apenas um pagamento **de blindado para blindado** oculta o remetente, o destinatário e o montante.
- Um endereço blindado não é uma única chave. É um pequeno conjunto de chaves, e pode conceder **acesso só de leitura sem ceder a capacidade de gastar**.
- Uma viewing key **não pode ser retirada** depois de a partilhar.

---

## A única coisa que precisa de entender primeiro

Na maioria das blockchains não há escolha a fazer. Tudo o que envia é público, para sempre, para qualquer pessoa que procure.

A Zcash dá-lhe uma escolha. Essa escolha é feita duas vezes: **uma vez quando escolhe para que endereço enviar, e outra quando decide quem recebe uma chave para ler o seu histórico.**

A imagem abaixo cobre ambas.

![Tipos de chaves Zcash e o que um explorador de blocos pode ver em cada um dos quatro percursos de transação](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/who-can-see-your-zcash-payment.png)

---

## Escolha um: que endereço

Cada pagamento Zcash move-se entre dois endereços, e cada um pode ser transparente ou blindado. Isso dá quatro percursos, e cada um expõe uma quantidade diferente de informação.

O padrão é mais simples do que parece: **tudo o que toca num endereço transparente torna-se público.** Um pagamento que permanece dentro do conjunto blindado do início ao fim não revela nada além da taxa.

Isto é especialmente importante quando levanta fundos de uma exchange. Muitas exchanges só enviam para endereços transparentes, por isso o levantamento é público. Blinde os fundos você mesmo assim que chegarem, antes de os gastar.

Para uma análise mais aprofundada do que exatamente um explorador lê, veja [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see).

---

## Escolha dois: quem recebe uma chave

Privacidade que nunca pode ser levantada não é útil. Por vezes precisa de provar algo a um contabilista, a um auditor ou a uma autoridade fiscal. A Zcash trata disto sem lhe pedir que abdique do controlo.

**Spending key.** Vê tudo e move fundos. Este é o dinheiro. Fica consigo e nunca é partilhada com ninguém, por qualquer motivo.

**Full viewing key.** Só de leitura. Mostra atividade de entrada e saída e saldos, mas não pode gastar um único zatoshi. É isto que entrega a um auditor ou contabilista.

**Incoming viewing key.** Ainda mais restrita: mostra apenas os pagamentos que entram. Uma exchange ou um comerciante pode utilizá-la para confirmar que o seu depósito chegou, enquanto a spending key permanece em hardware que nunca toca na internet.

A ordem importa. Dê a chave mais restrita que faça o trabalho, não a mais ampla que por acaso tenha.

---

## A parte que os principiantes não percebem

**Uma viewing key não pode ser revogada.** Não existe nenhum botão de "desfazer partilha". Depois de alguém a ter, pode ler esse endereço durante todo o tempo em que ele existir. Se precisar de cortar o acesso, transfere os seus fundos para um novo endereço.

**As taxas são públicas mesmo num pagamento totalmente blindado.** O montante fica oculto; a taxa não.

**Público é permanente.** Tudo o que a cadeia mostra hoje, mostrará daqui a vinte anos. Decidir blindar um pagamento *depois* de o ter enviado não é algo que possa fazer.

---

## Coloque isto em prática

- Use uma wallet que blinde por defeito, como a [Zodl](https://zodl.com) ou a [Ywallet](https://ywallet.app/).
- Blinde os fundos assim que chegarem de uma exchange, antes de os gastar.
- Pague para endereços blindados sempre que o destinatário suportar um.
- Antes de partilhar uma viewing key, pergunte qual é a menor chave que responde à questão que está a ser colocada.

---

## Recursos

- [Explicação das viewing keys (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [Divulgação seletiva e viewing keys (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: Viewing keys](https://zips.z.cash/zip-0310)
- [Como funciona a tecnologia da Zcash](https://z.cash/technology/)

## Páginas relacionadas

- [Noções básicas sobre Zcash](/start-here/what-is-zec-and-zcash)
- [Guia da Zcash para novos utilizadores](/start-here/new-user-guide)
- [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see)
- [Viewing keys](/zcash-tech/viewing-keys)
- [Transações](/using-zcash/transactions)

---

*Se quiser adicionar ou sugerir alterações a esta página da wiki, vá ao [repositório GitHub da ZecHub](https://github.com/ZecHub/zechub) e envie um pull request.*
