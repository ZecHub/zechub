<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Memorandos

## Resumo

* Um memorando é um bilhete curto que você anexa a um pagamento enviado para um endereço blindado. Ele é criptografado, então quem observa a blockchain não consegue lê-lo.
* O campo de memorando comporta até 512 bytes de texto.
* As pessoas usam memorandos para dizer quem enviou um pagamento e para que ele serve, ou para enviar uma mensagem privada.
* Pagamentos para endereços transparentes não podem levar um memorando.
* Um [link de solicitação de pagamento](/using-zcash/payment-request-uris) pode preencher o memorando para você, para que uma loja possa identificar cada pedido.

## Explicação principal

### Enviando memorandos criptografados

Ao enviar uma transação Z2Z (de blindado para blindado), você pode incluir um memorando (mensagem) na transação. Esse memorando pode ser usado para várias finalidades diferentes.

### Assinando transações

Os memorandos são usados principalmente para assinar pagamentos. Como as transações blindadas criptografam seus dados, você não consegue ver quem enviou ZEC para você nem para que ZEC pode ter sido. Os usuários podem usar o campo de memorando para assinar seu nome ou pseudônimo, para que a outra parte saiba de quem veio a transação. Eles também podem descrever para que serviu a transação.

### Enviando uma mensagem

Outro caso de uso do memorando criptografado é enviar uma mensagem para alguém com um z-addr. Essas mensagens podem ser sobre qualquer coisa, seja um [lembrete para um amigo](https://twitter.com/iansagstette/status/1542142468505870336) ou uma [mensagem confidencial que precisa permanecer o mais privada possível](https://twitter.com/InsideZcash/status/1545800146352578560).

### Bilhetes de amor na blockchain

Uma pessoa enviou um bilhete de amor para sua parceira em um dos primeiros blocos da blockchain do Zcash. Alguém descobriu que seu parceiro havia enviado um arquivo por meio de um memorando do Zcash. Esse arquivo era um ingresso para um evento especial no exterior que ela e seu amor distante vinham conversando sobre ir juntos. O memorando era um bilhete de amor.

## Visual / analogia

Pense em um pagamento blindado como um envelope lacrado com dinheiro dentro. O memorando é um bilhete dobrado junto com o dinheiro.

A blockchain é a agência dos correios. Ela transporta o envelope e registra que ele chegou, mas nunca o abre. Quem abre o envelope lê o bilhete. Um pagamento transparente é um cartão-postal, então não há envelope onde dobrar um bilhete.

## Aprofundamento

### O que cabe em um memorando

O campo de memorando tem sempre exatamente 512 bytes. Um memorando de texto mais curto é preenchido com bytes zero antes de ser criptografado, então todo memorando aparece com o mesmo tamanho on-chain.

A maioria dos memorandos é texto UTF-8 simples. O [ZIP 302](https://zips.z.cash/zip-0302) também reserva os memorandos que começam com um byte de valor `0xF5` ou maior para outros tipos de dados, e um memorando com `0xF6` seguido de zeros significa "sem memorando".

Cada saída blindada em uma transação leva seu próprio memorando, então uma única transação que paga várias pessoas pode incluir um bilhete diferente para cada uma delas.

### Avançado

> **Histórico. Esta demonstração não funciona mais como está descrita.**
>
> A demonstração abaixo usa zcashd, e seu [script de recebimento](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) lê memorandos por meio de `zcash-cli`. O zcashd atingiu sua parada automática de fim do suporte em 18 de julho de 2026, então esse script não consegue se conectar a um nó em funcionamento, e ele não foi adaptado.
>
> Ler memorandos blindados pela linha de comando ainda funciona na Zallet: `zallet rpc z_listunspent` retorna cada note blindada recebida com o mesmo campo `memoStr` que o script lê. Consulte o [Guia de referência rápida da Zallet](/using-zcash/zallet-quick-reference-guide) para ver o comando, e o [guia de migração para Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) para migrar um nó do zcashd. A Zallet ainda está em beta.
>
> Esta seção é mantida como registro histórico da demonstração do Magic-Wormhole.

Veja como usar os memorandos blindados do Zcash com a CLI do Magic-Wormhole e zcashd para enviar arquivos com segurança de um computador para outro!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Encrypted File Transfer with Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Páginas relacionadas

- [URIs de solicitação de pagamento](/using-zcash/payment-request-uris): coloque um memorando em um link ou QR code do `zcash:`.
- [Transações](/using-zcash/transactions): tipos de transação blindada e transparente.
- [Pools blindados](/using-zcash/shielded-pools): onde ficam as notes blindadas que levam os memorandos.
- [Carteiras](/using-zcash/wallets): use o filtro de memorando blindado para encontrar carteiras que suportam memorandos.
- [Guia de referência rápida da Zallet](/using-zcash/zallet-quick-reference-guide): leia os memorandos recebidos pela linha de comando.
- [Ferramentas do Zcash para criadores](/using-zcash/creators-and-tips): ferramentas de gorjeta que enviam uma mensagem junto com a gorjeta.

### Recursos

[O campo de memorando criptografado](https://electriccoin.co/blog/encrypted-memo-field/)

**Última atualização:** outubro de 2026
