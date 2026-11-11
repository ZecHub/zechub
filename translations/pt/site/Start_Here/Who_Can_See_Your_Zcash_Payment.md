<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Quem pode ver seu pagamento em Zcash?

## Resumo

- O Zcash oferece **dois tipos de endereço**: transparentes (`t`) e blindados (`z` ou `u`).
- O quanto o público vê depende dos tipos entre os quais seu pagamento se move.
- Apenas um pagamento **de um endereço blindado para outro** oculta o remetente, o destinatário e o valor.
- Um endereço blindado não é uma única chave. É um pequeno conjunto de chaves, e você pode fornecer **acesso somente para leitura sem ceder a capacidade de gastar**.
- Uma chave de visualização **não pode ser retirada** depois que você a compartilha.

---

## A única coisa que você precisa entender primeiro

Na maioria das blockchains não há escolha a fazer. Tudo o que você envia é público, para sempre, para qualquer pessoa que procure.

O Zcash oferece uma escolha. Essa escolha é feita duas vezes: **uma vez quando você escolhe para qual endereço enviar, e outra quando decide quem recebe uma chave para ler seu histórico.**

A imagem abaixo aborda ambas.

![Tipos de chaves do Zcash e o que um explorador de blocos pode ver em cada um dos quatro percursos de transação](/content-images/who-can-see-your-zcash-payment-04d41ac960.webp)

---

## Primeira escolha: qual endereço

Cada pagamento do Zcash se move entre dois endereços, e cada um pode ser transparente ou blindado. Isso cria quatro caminhos, e cada um expõe uma quantidade diferente de informação.

O padrão é mais simples do que parece: **tudo o que toca um endereço transparente se torna público.** Um pagamento que permanece dentro do pool blindado do início ao fim não revela nada além da taxa.

Isso é especialmente importante quando você retira fundos de uma corretora. Muitas corretoras só enviam para endereços transparentes, por isso a retirada é pública. Blinde os fundos você mesmo assim que chegarem, antes de gastá-los.

Para uma análise mais aprofundada do que exatamente um explorador de blocos lê, veja [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see).

---

## Segunda escolha: quem recebe uma chave

Privacidade que você nunca pode suspender não é útil. Às vezes você precisa provar algo a um contador, um auditor ou um órgão fiscal. O Zcash lida com isso sem pedir que você abra mão do controle.

**Chave de gastos.** Vê tudo e move fundos. Este é o dinheiro. Ela fica com você e nunca é compartilhada com ninguém, por qualquer motivo.

**Full Viewing Key.** Somente para leitura. Mostra atividade de entrada e saída e saldos, mas não pode gastar um único zatoshi. É isso que você entrega a um auditor ou contador.

**Incoming Viewing Key.** Ainda mais restrita: mostra apenas os pagamentos que chegam. Uma corretora ou um comerciante pode usá-la para confirmar que seu depósito chegou, enquanto a chave de gastos permanece em hardware que nunca toca a internet.

A ordem importa. Dê a chave mais restrita que faça o trabalho, não a mais ampla que você tenha.

---

## A parte que os iniciantes não percebem

**Uma chave de visualização não pode ser revogada.** Não existe nenhum botão de "desfazer compartilhamento". Depois que alguém a tem, pode ler esse endereço durante todo o tempo em que ele existir. Se você precisar cortar o acesso, transfira seus fundos para um novo endereço.

**As taxas são públicas mesmo em um pagamento totalmente blindado.** O valor fica oculto; a taxa não.

**Público é permanente.** Tudo o que a chain mostra hoje, mostrará daqui a vinte anos. Decidir blindar um pagamento *depois* de enviá-lo não é algo que você possa fazer.

---

## Coloque isso em prática

- Use uma carteira que blinde por padrão, como a [ZODL](https://zodl.com) ou a [Zingo!](https://www.zingolabs.org/).
- Blinde os fundos assim que chegarem de uma corretora, antes de gastá-los.
- Pague para endereços blindados sempre que o destinatário aceitar um.
- Antes de compartilhar uma chave de visualização, pergunte qual é a menor chave que responde à pergunta feita.

---

## Recursos

- [Explicação das chaves de visualização (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [Divulgação seletiva e chaves de visualização (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: Chaves de visualização](https://zips.z.cash/zip-0310)
- [Como funciona a tecnologia do Zcash](https://z.cash/technology/)

## Páginas relacionadas

- [Noções básicas sobre o Zcash](/start-here/what-is-zec-and-zcash)
- [Guia do Zcash para novos usuários](/start-here/new-user-guide)
- [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see)
- [Chaves de visualização](/zcash-tech/viewing-keys)
- [Transações](/using-zcash/transactions)

---

*Se quiser adicionar ou sugerir alterações a esta página da wiki, vá ao [repositório GitHub da ZecHub](https://github.com/ZecHub/zechub) e envie um pull request.*
