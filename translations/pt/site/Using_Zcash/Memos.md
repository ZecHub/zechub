<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Memorandos

## TL;DR

* Um memorando é uma note curta que você anexa a um pagamento enviado para um endereço blindado. Ele é criptografado, portanto as pessoas que observam a blockchain não conseguem lê-lo.
* O campo de memorando comporta até 512 bytes de texto.
* As pessoas usam memorandos para informar quem enviou um pagamento e para que ele servia ou para enviar uma mensagem privada.
* Os pagamentos para endereços transparentes não podem conter um memorando.
* Um [link de solicitação de pagamento](/using-zcash/payment-request-uris) pode preencher o memorando para você, para que uma loja possa identificar cada pedido.

## Explicação principal

### Envio de memorandos criptografados

Ao enviar uma transação Z2Z (de blindado para blindado), você pode incluir um memorando (mensagem) na transação. Esse memorando pode ser usado para várias finalidades.

### Assinatura de transações

Os memorandos são usados principalmente para assinar pagamentos. Como as transações blindadas criptografam seus dados, você não consegue ver quem enviou ZEC para você nem para que o ZEC poderia servir. Os usuários podem usar o campo de memorando para assinar com seu nome ou pseudônimo, permitindo que sua contraparte saiba de quem veio a transação. Eles também podem descrever para que servia a transação.

### Envio de uma mensagem

Outro caso de uso do memorando criptografado é enviar uma mensagem para alguém com um z-addr. Essas mensagens podem ser sobre qualquer assunto, seja um [lembrete para um amigo](https://twitter.com/iansagstette/status/1542142468505870336) ou uma [mensagem sensível que precisa permanecer o mais privada possível](https://twitter.com/InsideZcash/status/1545800146352578560).

### Cartas de amor na blockchain

Houve uma pessoa que enviou ao seu parceiro uma carta de amor em um dos primeiros blocos da blockchain do Zcash. Alguém descobriu que seu parceiro havia enviado um arquivo por meio de um memorando do Zcash. Esse arquivo era um ingresso para um evento especial no exterior, que ela e seu amante distante haviam conversado sobre participar juntos. O memorando era uma carta de amor.

## Visual / analogia

Pense em um pagamento blindado como um envelope lacrado com dinheiro dentro. O memorando é uma note dobrada junto com o dinheiro.

A blockchain é o correio. Ela transporta o envelope e registra que ele chegou, mas nunca o abre. A pessoa que abre o envelope lê a note. Um pagamento transparente é um cartão-postal, então não há envelope no qual dobrar uma note.

## Análise detalhada

### O que cabe em um memorando

O campo de memorando tem sempre exatamente 512 bytes. Um memorando de texto mais curto é preenchido com bytes zero antes de ser criptografado, portanto todos os memorandos parecem ter o mesmo tamanho on-chain.

A maioria dos memorandos é texto simples em UTF-8. [ZIP 302](https://zips.z.cash/zip-0302) também reserva memorandos que começam com um byte de `0xF5` ou superior para outros tipos de dados, e um memorando de `0xF6` seguido de zeros significa "sem memorando".

Cada saída blindada em uma transação contém seu próprio memorando, portanto uma transação que paga várias pessoas pode incluir uma note diferente para cada uma delas.

### Avançado

> **Histórico. Esta demonstração não funciona mais como está escrita.**
>
> A demonstração abaixo usa zcashd, e seu [script de recebimento](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) lê memorandos por meio de `zcash-cli`. zcashd atingiu sua interrupção automática de fim de suporte em 18 de julho de 2026, portanto esse script não consegue alcançar um nó em execução e não foi portado.
>
> A leitura de memorandos blindados pela linha de comando continua funcionando no Zallet: `zallet rpc z_listunspent` retorna cada note blindada recebida com o mesmo campo `memoStr` que o script lê. Consulte o [Guia de referência rápida do Zallet](/using-zcash/zallet-quick-reference-guide) para ver o comando e o [guia de migração para Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) para migrar um nó do zcashd. O Zallet continua em beta.
>
> Esta seção é mantida como registro histórico da demonstração Magic-Wormhole.

Veja como usar Memorandos Blindados do Zcash com a CLI Magic-Wormhole e zcashd para enviar arquivos com segurança de um computador para outro!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Transferência de Ficheiros Encriptada com Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Páginas relacionadas

- [URIs de solicitação de pagamento](/using-zcash/payment-request-uris): coloque um memorando em um link ou código QR `zcash:`.
- [Transações](/using-zcash/transactions): tipos de transações blindadas e transparentes.
- [Pools blindados](/using-zcash/shielded-pools): onde ficam as notes blindadas que carregam memorandos.
- [Carteiras](/using-zcash/wallets): use o filtro de memorandos blindados para encontrar carteiras que oferecem suporte a memorandos.
- [Guia de referência rápida do Zallet](/using-zcash/zallet-quick-reference-guide): leia memorandos recebidos pela linha de comando.
- [Ferramentas do Zcash para criadores](/using-zcash/creators-and-tips): ferramentas de gorjetas que enviam uma mensagem junto com a gorjeta.

### Recursos

[O campo de memorando criptografado](https://electriccoin.co/blog/encrypted-memo-field/)

**Última atualização:** outubro de 2026
