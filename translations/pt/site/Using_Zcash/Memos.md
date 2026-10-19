<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Memorandos

## TL;DR

* Um memorando é uma nota curta que associa a um pagamento enviado para um endereço protegido. É encriptado, pelo que as pessoas que observam a blockchain não o conseguem ler.
* O campo de memorando suporta até 512 bytes de texto.
* As pessoas usam memorandos para indicar quem enviou um pagamento e para que servia, ou para enviar uma mensagem privada.
* Os pagamentos para endereços transparentes não podem conter um memorando.
* Uma [ligação de pedido de pagamento](/using-zcash/payment-request-uris) pode preencher o memorando por si, para que uma loja possa identificar cada encomenda.

## Explicação Fundamental

### Envio de Memorandos Encriptados

Ao enviar uma transação Z2Z (protegida para protegida), pode incluir um memorando (mensagem) na transação. Este memorando pode ser usado para várias finalidades.

### Assinatura de Transações

Os memorandos são usados principalmente para identificar pagamentos. Uma vez que as transações protegidas encriptam os seus dados, não consegue ver quem lhe enviou ZEC nem para que poderia servir o ZEC. Os utilizadores podem usar o campo de memorando para assinar com o seu nome ou pseudónimo, permitindo que a contraparte saiba de quem veio a transação. Também podem descrever para que servia a transação.

### Enviar uma Mensagem

Outro caso de uso do memorando encriptado é enviar uma mensagem a alguém com um z-addr. Estas mensagens podem ser sobre qualquer assunto, seja um [lembrete para um amigo](https://twitter.com/iansagstette/status/1542142468505870336) ou uma [mensagem sensível que tem de permanecer o mais privada possível](https://twitter.com/InsideZcash/status/1545800146352578560).

### Cartas de Amor na Blockchain

Houve uma pessoa que enviou ao seu parceiro uma carta de amor num dos primeiros blocos da blockchain Zcash. Alguém descobriu que o seu parceiro lhe tinha enviado um ficheiro através de um memorando Zcash. Este ficheiro era um bilhete para um evento especial no estrangeiro, ao qual ela e o seu amante distante tinham falado em ir juntos. O memorando era uma carta de amor.

## Visual / Analogia

Pense num pagamento protegido como um envelope selado com dinheiro no interior. O memorando é uma nota dobrada juntamente com o dinheiro.

A blockchain é os correios. Transporta o envelope e regista que chegou, mas nunca o abre. A pessoa que abre o envelope lê a nota. Um pagamento transparente é um postal, pelo que não há envelope onde dobrar uma nota.

## Análise Detalhada

### O que cabe num memorando

O campo de memorando tem sempre exatamente 512 bytes. Um memorando de texto mais curto é preenchido com bytes zero antes de ser encriptado, pelo que todos os memorandos parecem ter o mesmo tamanho on-chain.

A maioria dos memorandos é texto simples em UTF-8. [ZIP 302](https://zips.z.cash/zip-0302) também reserva memorandos que começam com um byte de `0xF5` ou superior para outros tipos de dados, e um memorando de `0xF6` seguido de zeros significa "sem memorando".

Cada saída protegida numa transação contém o seu próprio memorando, pelo que uma transação que paga a várias pessoas pode incluir uma nota diferente para cada uma delas.

### Avançado

> **Histórico. Esta demonstração já não funciona como está escrita.**
>
> A demonstração abaixo usa zcashd, e o seu [script de receção](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) lê memorandos através de `zcash-cli`. zcashd atingiu a sua interrupção automática de fim de suporte em 18 de julho de 2026, pelo que esse script não consegue alcançar um nó em execução e não foi portado.
>
> A leitura de memorandos protegidos a partir da linha de comandos continua a funcionar em Zallet: `zallet rpc z_listunspent` devolve cada nota protegida recebida com o mesmo campo `memoStr` que o script lê. Consulte o [Zallet Guia de Referência Rápida](/using-zcash/zallet-quick-reference-guide) para ver o comando, e o [guia de migração para Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) para mover um nó de zcashd. Zallet continua em beta.
>
> Esta secção é mantida como registo histórico da demonstração Magic-Wormhole.

Eis como usar Zcash Memorandos Protegidos com a CLI Magic-Wormhole e zcashd para enviar ficheiros de forma segura de um computador para outro!

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

## Páginas Relacionadas

- [URIs de Pedido de Pagamento](/using-zcash/payment-request-uris): coloque um memorando numa ligação ou código QR `zcash:`.
- [Transações](/using-zcash/transactions): tipos de transações protegidas e transparentes.
- [Pools Protegidos](/using-zcash/shielded-pools): onde residem as notas protegidas que transportam memorandos.
- [Wallets](/using-zcash/wallets): use o filtro de Memorandos Protegidos para encontrar wallets que suportem memorandos.
- [Zallet Guia de Referência Rápida](/using-zcash/zallet-quick-reference-guide): leia memorandos recebidos a partir da linha de comandos.
- [Zcash Ferramentas para Criadores](/using-zcash/creators-and-tips): ferramentas de gorjetas que enviam uma mensagem juntamente com a gorjeta.

### Recursos

[O Campo de Memorando Encriptado](https://electriccoin.co/blog/encrypted-memo-field/)

**Última atualização:** outubro de 2026
